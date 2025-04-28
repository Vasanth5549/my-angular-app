import DateTime from "epma-platform/DateTime";

export class CLZOObject {
  private OperationModeField = '';
  private LastModifiedAtField = new Date();
  private SealTypeField = '';
  private SealImageField = '';
  private SealRecordListField = '';
  private SealImageListField = '';
  private EPRFilterListField = '';
  private PRBSealRecordListField = '';
  private PRBSealImageListField = '';
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
    if (this.referenceEquals(this.SealImageListField, value) != true) {
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

  get PRBSealRecordList(): string {
    return this.PRBSealRecordListField;
  }
  set PRBSealRecordList(value: string) {
    if (this.referenceEquals(this.PRBSealRecordListField, value)) {
      this.PRBSealRecordListField = value;
      // this.RaisePropertyChanged("PRBSealRecordList");
    }
  }

  get PRBSealImageList(): string {
    return this.PRBSealImageListField;
  }
  set PRBSealImageList(value: string) {
    if (this.referenceEquals(this.PRBSealImageListField, value)) {
      this.PRBSealImageListField = value;
      // this.RaisePropertyChanged("PRBSealImageList");
    }
  }
}

export class DrugDetail extends CLZOObject {
  private DrugHeaderField: DrugHeader = new DrugHeader();
  private SlotDetailsField: SlotDetail[] = [];
  private oSteppedVariableDoseInfoField: SteppedVariableDoseInfo[] = [];
  private oConditionalDoseRegimeInfoField: ConditionalDoseRegime[] = [];
  private DisplayOrderField = 0;
  private IsNextDoseAllowedForPRNField = false;
  private MinimumIntervalForPRNField = 0;
  private LastRecordedAtForPRNField = new Date();
  private oDoseRegimeInfusionInfoField: DoseRegimeInfusionDetail =
    new DoseRegimeInfusionDetail();
  private GroupDisplayNameField = '';
  private CreatedAtDTTMField = new Date();

  get DrugHeader(): DrugHeader {
    return this.DrugHeaderField;
  }
  set DrugHeader(value: DrugHeader) {
    if (this.referenceEquals(this.DrugHeaderField, value)) {
      this.DrugHeaderField = value;
      // this.RaisePropertyChanged("DrugHeader");
    }
  }

  get SlotDetails(): SlotDetail[] {
    return this.SlotDetailsField;
  }
  set SlotDetails(value: SlotDetail[]) {
    if (this.referenceEquals(this.SlotDetailsField, value)) {
      this.SlotDetailsField = value;
      // this.RaisePropertyChanged("SlotDetails");
    }
  }

  get oSteppedVariableDoseInfo(): SteppedVariableDoseInfo[] {
    return this.oSteppedVariableDoseInfoField;
  }
  set oSteppedVariableDoseInfo(value: SteppedVariableDoseInfo[]) {
    if (this.referenceEquals(this.oSteppedVariableDoseInfoField, value)) {
      this.oSteppedVariableDoseInfoField = value;
      // this.RaisePropertyChanged("oSteppedVariableDoseInfo");
    }
  }

  get oConditionalDoseRegimeInfo(): ConditionalDoseRegime[] {
    return this.oConditionalDoseRegimeInfoField;
  }
  set oConditionalDoseRegimeInfo(value: ConditionalDoseRegime[]) {
    if (this.referenceEquals(this.oConditionalDoseRegimeInfoField, value)) {
      this.oConditionalDoseRegimeInfoField = value;
      // this.RaisePropertyChanged("oConditionalDoseRegimeInfo");
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

  get IsNextDoseAllowedForPRN(): boolean {
    return this.IsNextDoseAllowedForPRNField;
  }
  set IsNextDoseAllowedForPRN(value: boolean) {
    if (this.IsNextDoseAllowedForPRNField != value) {
      this.IsNextDoseAllowedForPRNField = value;
      // this.RaisePropertyChanged("IsNextDoseAllowedForPRN");
    }
  }

  get MinimumIntervalForPRN(): number {
    return this.MinimumIntervalForPRNField;
  }
  set MinimumIntervalForPRN(value: number) {
    if (this.MinimumIntervalForPRNField != value) {
      this.MinimumIntervalForPRNField = value;
      // this.RaisePropertyChanged("MinimumIntervalForPRN");
    }
  }

  get LastRecordedAtForPRN(): Date {
    return this.LastRecordedAtForPRNField;
  }
  set LastRecordedAtForPRN(value: Date) {
    if (this.LastRecordedAtForPRNField != value) {
      this.LastRecordedAtForPRNField = value;
      // this.RaisePropertyChanged("LastRecordedAtForPRN");
    }
  }

  get oDoseRegimeInfusionInfo(): DoseRegimeInfusionDetail {
    return this.oDoseRegimeInfusionInfoField;
  }
  set oDoseRegimeInfusionInfo(value: DoseRegimeInfusionDetail) {
    if (this.referenceEquals(this.oDoseRegimeInfusionInfoField, value)) {
      this.oDoseRegimeInfusionInfoField = value;
      // this.RaisePropertyChanged("oDoseRegimeInfusionInfo");
    }
  }

  get GroupDisplayName(): string {
    return this.GroupDisplayNameField;
  }
  set GroupDisplayName(value: string) {
    this.GroupDisplayNameField = value;
    // this.RaisePropertyChanged("GroupDisplayName");
  }

  get CreatedAtDTTM(): Date {
    return this.CreatedAtDTTMField;
  }
  set CreatedAtDTTM(value: Date) {
    this.CreatedAtDTTMField = value;
    // this.RaisePropertyChanged("CreatedAtDTTM");
  }
}
export class SteppedVariableDoseInfo extends CLZOObject {
  private OIDField = 0;
  private FrequencyField = '';
  private StartDateField = new Date();
  private EndDateField = new Date();
  private ScheduleStartDTTMField = new Date();
  private LowerDoseField = '';
  private UpperDoseField = '';
  private DoseUOMField = '';
  private DoseScheduleTypeField = '';
  private oDoseScheduleField: DoseSchedule[] = [];
  private DurationField = '';
  private DurationUOMField = '';
  private PrescriptionItemOIDField = 0;
  private PrescriptionItemDosageOIDField = 0;
  private PrescriptionItemScheduleOIDField = 0;
  private IsDayWiseField = '';

  get OID(): number {
    return this.OIDField;
  }
  set OID(value: number) {
    if (this.OIDField != value) {
      this.OIDField = value;
      // this.RaisePropertyChanged("OID");
    }
  }

  get Frequency(): string {
    return this.FrequencyField;
  }
  set Frequency(value: string) {
    if (this.referenceEquals(this.FrequencyField, value)) {
      this.FrequencyField = value;
      // this.RaisePropertyChanged("Frequency");
    }
  }

  get StartDate(): Date {
    return this.StartDateField;
  }
  set StartDate(value: Date) {
    if (this.StartDateField != value) {
      this.StartDateField = value;
      // this.RaisePropertyChanged("StartDate");
    }
  }

  get EndDate(): Date {
    return this.EndDateField;
  }
  set EndDate(value: Date) {
    if (this.EndDateField != value) {
      this.EndDateField = value;
      // this.RaisePropertyChanged("EndDate");
    }
  }

  get ScheduleStartDTTM(): Date {
    return this.ScheduleStartDTTMField;
  }
  set ScheduleStartDTTM(value: Date) {
    if (this.ScheduleStartDTTMField != value) {
      this.ScheduleStartDTTMField = value;
      // this.RaisePropertyChanged("ScheduleStartDTTM");
    }
  }

  get LowerDose(): string {
    return this.LowerDoseField;
  }
  set LowerDose(value: string) {
    if (this.referenceEquals(this.LowerDoseField, value)) {
      this.LowerDoseField = value;
      // this.RaisePropertyChanged("LowerDose");
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

  get DoseUOM(): string {
    return this.DoseUOMField;
  }
  set DoseUOM(value: string) {
    if (this.referenceEquals(this.DoseUOMField, value)) {
      this.DoseUOMField = value;
      // this.RaisePropertyChanged("DoseUOM");
    }
  }

  get DoseScheduleType(): string {
    return this.DoseScheduleTypeField;
  }
  set DoseScheduleType(value: string) {
    if (this.referenceEquals(this.DoseScheduleTypeField, value)) {
      this.DoseScheduleTypeField = value;
      // this.RaisePropertyChanged("DoseScheduleType");
    }
  }

  get oDoseSchedule(): DoseSchedule[] {
    return this.oDoseScheduleField;
  }
  set oDoseSchedule(value: DoseSchedule[]) {
    if (this.referenceEquals(this.oDoseScheduleField, value)) {
      this.oDoseScheduleField = value;
      // this.RaisePropertyChanged("oDoseSchedule");
    }
  }

  get Duration(): string {
    return this.DurationField;
  }
  set Duration(value: string) {
    if ((this.DurationField != value) != true) {
      this.DurationField = value;
      // this.RaisePropertyChanged("Duration");
    }
  }

  get DurationUOM(): string {
    return this.DurationUOMField;
  }
  set DurationUOM(value: string) {
    if (this.referenceEquals(this.DurationUOMField, value)) {
      this.DurationUOMField = value;
      // this.RaisePropertyChanged("DurationUOM");
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

  get PrescriptionItemDosageOID(): number {
    return this.PrescriptionItemDosageOIDField;
  }
  set PrescriptionItemDosageOID(value: number) {
    if (this.PrescriptionItemDosageOIDField != value) {
      this.PrescriptionItemDosageOIDField = value;
      // this.RaisePropertyChanged("PrescriptionItemDosageOID");
    }
  }

  get PrescriptionItemScheduleOID(): number {
    return this.PrescriptionItemScheduleOIDField;
  }
  set PrescriptionItemScheduleOID(value: number) {
    if (this.PrescriptionItemScheduleOIDField != value) {
      this.PrescriptionItemScheduleOIDField = value;
      // this.RaisePropertyChanged("PrescriptionItemScheduleOID");
    }
  }

  get IsDayWise(): string {
    return this.IsDayWiseField;
  }
  set IsDayWise(value: string) {
    if (this.referenceEquals(this.IsDayWiseField, value)) {
      this.IsDayWiseField = value;
      // this.RaisePropertyChanged("IsDayWise");
    }
  }
}

export class ConditionalDoseRegime extends CLZOObject {
  private LowerValueField = '';
  private UpperValueField = '';
  private ValueUOMField: UOM = new UOM();
  private AddlItemTypeField = '';
  private AddlItemOIDField = 0;
  private DoseField = '';
  private DoseUOMField: UOM = new UOM();
  private InstructionField = '';
  private AddlItemNameField = '';
  private AddlItemCodeField = '';

  private ParentAddlItemCodeField = '';

  private RateField = '';

  private RateUOMOIDField: UOM = new UOM();

  private RateDenaminatorUOMOIDField: UOM = new UOM();

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

  get ValueUOM(): UOM {
    return this.ValueUOMField;
  }
  set ValueUOM(value: UOM) {
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

  get DoseUOM(): UOM {
    return this.DoseUOMField;
  }
  set DoseUOM(value: UOM) {
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
    if (this.PrescriptionItemDosageOIDField != value) {
      this.PrescriptionItemDosageOIDField = value;
      // this.RaisePropertyChanged("PrescriptionItemDosageOID");
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
    if (this.referenceEquals(this.RateDenominatorField, value)) {
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

export class ArrayOfString { }

export class PrescriptionItemFormViewParameters extends CLZOObject {
  private LineIndicatorField = '';

  private AdminDeviceField = '';

  private AdministeredByCodeField = '';

  private IntravenousInfusionDataField: IntravenousInfusionDetails =
    new IntravenousInfusionDetails();

  private AdminDeviceDataField: AdminDeviceDetails = new AdminDeviceDetails();

  private INFTYCODEField = '';

  private ReviewAfterDTTMField = new Date();

  private ReviewAfterField = '';

  private ReviewAfterUOMField: ObjectInfo = new ObjectInfo();

  private IsReviewafterReqField = false;

  private IsReviewAlertField = false;
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

  get INFTYCODE(): string {
    return this.INFTYCODEField;
  }
  set INFTYCODE(value: string) {
    if (this.referenceEquals(this.INFTYCODEField, value)) {
      this.INFTYCODEField = value;
      // this.RaisePropertyChanged("INFTYCODE");
    }
  }

  get ReviewAfterDTTM(): Date {
    return this.ReviewAfterDTTMField;
  }
  set ReviewAfterDTTM(value: Date) {
    if (this.ReviewAfterDTTMField != value) {
      this.ReviewAfterDTTMField = value;
      // this.RaisePropertyChanged("ReviewAfterDTTM");
    }
  }

  get ReviewAfter(): string {
    return this.ReviewAfterField;
  }
  set ReviewAfter(value: string) {
    if (this.ReviewAfterField != value) {
      this.ReviewAfterField = value;
      // this.RaisePropertyChanged("ReviewAfter");
    }
  }

  get ReviewAfterUOM(): ObjectInfo {
    return this.ReviewAfterUOMField;
  }
  set ReviewAfterUOM(value: ObjectInfo) {
    if (this.ReviewAfterUOMField != value) {
      this.ReviewAfterUOMField = value;
      // this.RaisePropertyChanged("ReviewAfterUOM");
    }
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
}

export class UOMS extends CLZOObject {
  private UOMIdField = 0;
  private UOMNameField = '';

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
}

export class SlotDetail extends CLZOObject {
  private InfRateUOMField: UOM = new UOM();

  private InfRatePerUOMField: UOM = new UOM();

  private LorenzoIDField = '';

  private IsSelfAdministeredField = false;

  private IsInfusionField = false;

  private DoseField = '';

  private UpperDoseField = '';

  private DoseUOMField = '';

  private DoseUOMOIDField = 0;

  private DoseUOMLzoIDField = '';

  private ScheduledDTTMField = new Date();

  private PrescriptionItemDosageOIDField = 0;

  private AdministrationDetailField: AdministrationDetail = new AdministrationDetail();

  private StatusField = '';

  private PrescriptionItemOIDField = 0;

  private OIDField = 0;

  private IsNextDoseAllowedForPRNField = false;

  private MinimumIntervalForPRNField = 0;

  private LastRecordedAtForPRNField = new Date();

  private IsPrepByWardField = false;

  private oDrugPrepDetailField: DrugPrepDetail = new DrugPrepDetail();

  private IsDrugPreStrikeOutField = '';

  private MedDrugPreparationOIDField = 0;

  private IsUpdatePIStatusToCompletedField = false;

  private IsLastSlotCheckRequiredField = false;

  private PresItemStartDTTMField = new Date();

  private PresItemENDTTMField = new Date();

  private IsLastSlotInViewField = false;

  private PatientOIDField = 0;

  private InfusionRecordAdminTypeCodeField = 0;

  private ScheduleGenerationPresItemOIDField = 0;

  private MCVersionField = '';

  private PrescriptionTypeField = '';

  private PreparedAtField = new Date();

  private PreparedByField = '';

  private PrepWitnessField = '';

  private TransactionItemPackDetailField: TransactionItemPackDetail[] = [];

  private WardStockQuantityToAdminField = '';

  private PatientStockQuantityToAdminField = '';

  private InfusionPeriodField = 0;
  private InfusionPeriodLorenzoIDField = '';
  private InfusionRateField = '';
  private PrescriptionItemStatusField = '';
  private PrescribedVolumeField = '';
  private PrescribedVolumeLorenzoIDField = '';
  private InfUpperRateField = '';
  private AdminMethodField = '';
  //14-day admin LZO-160054
  private IsAllowAdvanceAdminSlotField = false;
  private EstVolumeInfusedInProgressField = 0;
  private EstVolumeInfusedInProgressUOMField: UOM = new UOM();
  private EstVolumeInfusedInProgressDurationInMinsField = 0;
  private IsOnceOnlyFrequencyField = false;
  private IsHighlightSlotField = false;
  private IsPatientSelfAdministeredField = false;
  private IsPRNWithScheduleField = false;
  private EncounterOIDField = 0;
  private DirectionField = '';

  //Esakki - 73655
  private _IsNextSlotMultiSlotAdminField = false;

  get InfRateUOM(): UOM {
    return this.InfRateUOMField;
  }
  set InfRateUOM(value: UOM) {
    if (this.referenceEquals(this.InfRateUOMField, value)) {
      this.InfRateUOMField = value;
      // this.RaisePropertyChanged("InfRateUOM");
    }
  }

  get InfRatePerUOM(): UOM {
    return this.InfRatePerUOMField;
  }
  set InfRatePerUOM(value: UOM) {
    if (this.referenceEquals(this.InfRatePerUOMField, value)) {
      this.InfRatePerUOMField = value;
      // this.RaisePropertyChanged("InfRatePerUOM");
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

  get IsSelfAdministered(): boolean {
    return this.IsSelfAdministeredField;
  }
  set IsSelfAdministered(value: boolean) {
    if (this.IsSelfAdministeredField != value) {
      this.IsSelfAdministeredField = value;
      // this.RaisePropertyChanged("IsSelfAdministered");
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

  get Dose(): string {
    return this.DoseField;
  }
  set Dose(value: string) {
    if (this.referenceEquals(this.DoseField, value)) {
      this.DoseField = value;
      // this.RaisePropertyChanged("Dose");
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
  get DoseUOM(): string {
    return this.DoseUOMField;
  }
  set DoseUOM(value: string) {
    if (this.referenceEquals(this.DoseUOMField, value)) {
      this.DoseUOMField = value;
      // this.RaisePropertyChanged("DoseUOM");
    }
  }
  get DoseUOMOID(): number {
    return this.DoseUOMOIDField;
  }
  set DoseUOMOID(value: number) {
    if (this.DoseUOMOIDField != value) {
      this.DoseUOMOIDField = value;
      // this.RaisePropertyChanged("DoseUOMOID");
    }
  }

  get DoseUOMLzoID(): string {
    return this.DoseUOMLzoIDField;
  }
  set DoseUOMLzoID(value: string) {
    if (this.referenceEquals(this.DoseUOMLzoIDField, value)) {
      this.DoseUOMLzoIDField = value;
      // this.RaisePropertyChanged("DoseUOMLzoID");
    }
  }

  get ScheduledDTTM(): Date {
    return this.ScheduledDTTMField;
  }
  set ScheduledDTTM(value: Date) {
    if (this.ScheduledDTTMField != value) {
      this.ScheduledDTTMField = value;
      // this.RaisePropertyChanged("ScheduledDTTM");
    }
  }

  get PrescriptionItemDosageOID(): number {
    return this.PrescriptionItemDosageOIDField;
  }
  set PrescriptionItemDosageOID(value: number) {
    if (this.PrescriptionItemDosageOIDField != value) {
      this.PrescriptionItemDosageOIDField = value;
      // this.RaisePropertyChanged("PrescriptionItemDosageOID");
    }
  }

  get AdministrationDetail(): AdministrationDetail {
    return this.AdministrationDetailField;
  }
  set AdministrationDetail(value: AdministrationDetail) {
    if (this.referenceEquals(this.AdministrationDetailField, value)) {
      this.AdministrationDetailField = value;
      // this.RaisePropertyChanged("AdministrationDetail");
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

  get PrescriptionItemOID(): number {
    return this.PrescriptionItemOIDField;
  }
  set PrescriptionItemOID(value: number) {
    if (this.PrescriptionItemOIDField != value) {
      this.PrescriptionItemOIDField = value;
      // this.RaisePropertyChanged("PrescriptionItemOID");
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

  get IsNextDoseAllowedForPRN(): boolean {
    return this.IsNextDoseAllowedForPRNField;
  }
  set IsNextDoseAllowedForPRN(value: boolean) {
    if (this.IsNextDoseAllowedForPRNField != value) {
      this.IsNextDoseAllowedForPRNField = value;
      // this.RaisePropertyChanged("IsNextDoseAllowedForPRN");
    }
  }
  get MinimumIntervalForPRN(): number {
    return this.MinimumIntervalForPRNField;
  }
  set MinimumIntervalForPRN(value: number) {
    if (this.MinimumIntervalForPRNField != value) {
      this.MinimumIntervalForPRNField = value;
      // this.RaisePropertyChanged("MinimumIntervalForPRN");
    }
  }

  get LastRecordedAtForPRN(): Date {
    return this.LastRecordedAtForPRNField;
  }
  set LastRecordedAtForPRN(value: Date) {
    if (this.LastRecordedAtForPRNField != value) {
      this.LastRecordedAtForPRNField = value;
      // this.RaisePropertyChanged("LastRecordedAtForPRN");
    }
  }

  get IsPrepByWard(): boolean {
    return this.IsPrepByWardField;
  }
  set IsPrepByWard(value: boolean) {
    if (this.IsPrepByWardField != value) {
      this.IsPrepByWardField = value;
      // this.RaisePropertyChanged("IsPrepByWard");
    }
  }

  get oDrugPrepDetail(): DrugPrepDetail {
    return this.oDrugPrepDetailField;
  }
  set oDrugPrepDetail(value: DrugPrepDetail) {
    if (this.referenceEquals(this.oDrugPrepDetailField, value)) {
      this.oDrugPrepDetailField = value;
      // this.RaisePropertyChanged("oDrugPrepDetail");
    }
  }

  get IsDrugPreStrikeOut(): string {
    return this.IsDrugPreStrikeOutField;
  }
  set IsDrugPreStrikeOut(value: string) {
    if (this.referenceEquals(this.IsDrugPreStrikeOutField, value)) {
      this.IsDrugPreStrikeOutField = value;
      // this.RaisePropertyChanged("IsDrugPreStrikeOut");
    }
  }

  get MedDrugPreparationOID(): number {
    return this.MedDrugPreparationOIDField;
  }
  set MedDrugPreparationOID(value: number) {
    if (this.MedDrugPreparationOIDField != value) {
      this.MedDrugPreparationOIDField = value;
      // this.RaisePropertyChanged("MedDrugPreparationOID");
    }
  }

  get IsUpdatePIStatusToCompleted(): boolean {
    return this.IsUpdatePIStatusToCompletedField;
  }
  set IsUpdatePIStatusToCompleted(value: boolean) {
    if (this.IsUpdatePIStatusToCompletedField != value) {
      this.IsUpdatePIStatusToCompletedField = value;
      // this.RaisePropertyChanged("IsUpdatePIStatusToCompleted");
    }
  }

  get IsLastSlotCheckRequired(): boolean {
    return this.IsLastSlotCheckRequiredField;
  }
  set IsLastSlotCheckRequired(value: boolean) {
    if (this.IsLastSlotCheckRequiredField != value) {
      this.IsLastSlotCheckRequiredField = value;
      // this.RaisePropertyChanged("IsLastSlotCheckRequired");
    }
  }

  get PresItemStartDTTM(): Date {
    return this.PresItemStartDTTMField;
  }
  set PresItemStartDTTM(value: Date) {
    if (this.PresItemStartDTTMField != value) {
      this.PresItemStartDTTMField = value;
      // this.RaisePropertyChanged("PresItemStartDTTM");
    }
  }

  get PresItemENDTTM(): Date {
    return this.PresItemENDTTMField;
  }
  set PresItemENDTTM(value: Date) {
    if (this.PresItemENDTTMField != value) {
      this.PresItemENDTTMField = value;
      // this.RaisePropertyChanged("PresItemENDTTM");
    }
  }

  get IsLastSlotInView(): boolean {
    return this.IsLastSlotInViewField;
  }
  set IsLastSlotInView(value: boolean) {
    if (this.IsLastSlotInViewField != value) {
      this.IsLastSlotInViewField = value;
      // this.RaisePropertyChanged("IsLastSlotInView");
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

  get InfusionRecordAdminTypeCode(): number {
    return this.InfusionRecordAdminTypeCodeField;
  }
  set InfusionRecordAdminTypeCode(value: number) {
    if (this.InfusionRecordAdminTypeCodeField != value) {
      this.InfusionRecordAdminTypeCodeField = value;
      // this.RaisePropertyChanged("InfusionRecordAdminTypeCode");
    }
  }

  get ScheduleGenerationPresItemOID(): number {
    return this.ScheduleGenerationPresItemOIDField;
  }
  set ScheduleGenerationPresItemOID(value: number) {
    if (this.ScheduleGenerationPresItemOIDField != value) {
      this.ScheduleGenerationPresItemOIDField = value;
      // this.RaisePropertyChanged("ScheduleGenerationPresItemOID");
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

  get PrescriptionType(): string {
    return this.PrescriptionTypeField;
  }
  set PrescriptionType(value: string) {
    if (this.referenceEquals(this.PrescriptionTypeField, value)) {
      this.PrescriptionTypeField = value;
      // this.RaisePropertyChanged("PrescriptionType");
    }
  }

  get PreparedAt(): Date {
    return this.PreparedAtField;
  }
  set PreparedAt(value: Date) {
    if (this.PreparedAtField != value) {
      this.PreparedAtField = value;
      // this.RaisePropertyChanged("PreparedAt");
    }
  }

  get PreparedBy(): string {
    return this.PreparedByField;
  }
  set PreparedBy(value: string) {
    if (this.referenceEquals(this.PreparedByField, value)) {
      this.PreparedByField = value;
      // this.RaisePropertyChanged("PreparedBy");
    }
  }

  get PrepWitness(): string {
    return this.PrepWitnessField;
  }
  set PrepWitness(value: string) {
    if (this.referenceEquals(this.PrepWitnessField, value)) {
      this.PrepWitnessField = value;
      // this.RaisePropertyChanged("PrepWitness");
    }
  }

  get TransactionItemPackDetail(): TransactionItemPackDetail[] {
    return this.TransactionItemPackDetailField;
  }
  set TransactionItemPackDetail(value: TransactionItemPackDetail[]) {
    if (this.referenceEquals(this.TransactionItemPackDetailField, value)) {
      this.TransactionItemPackDetailField = value;
      // this.RaisePropertyChanged("TransactionItemPackDetail");
    }
  }

  get WardStockQuantityToAdmin(): string {
    return this.WardStockQuantityToAdminField;
  }
  set WardStockQuantityToAdmin(value: string) {
    if (this.referenceEquals(this.WardStockQuantityToAdminField, value)) {
      this.WardStockQuantityToAdminField = value;
      // this.RaisePropertyChanged("WardStockQuantityToAdmin");
    }
  }

  get PatientStockQuantityToAdmin(): string {
    return this.PatientStockQuantityToAdminField;
  }
  set PatientStockQuantityToAdmin(value: string) {
    if (this.referenceEquals(this.PatientStockQuantityToAdminField, value)) {
      this.PatientStockQuantityToAdminField = value;
      // this.RaisePropertyChanged("PatientStockQuantityToAdmin");
    }
  }

  get InfusionPeriod(): number {
    return this.InfusionPeriodField;
  }
  set InfusionPeriod(value: number) {
    if (this.InfusionPeriodField != value) {
      this.InfusionPeriodField = value;
      // this.RaisePropertyChanged("InfusionPeriod");
    }
  }

  get InfusionPeriodLorenzoID(): string {
    return this.InfusionPeriodLorenzoIDField;
  }
  set InfusionPeriodLorenzoID(value: string) {
    if (this.referenceEquals(this.InfusionPeriodLorenzoIDField, value)) {
      this.InfusionPeriodLorenzoIDField = value;
      // this.RaisePropertyChanged("InfusionPeriodLorenzoID");
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

  get PrescriptionItemStatus(): string {
    return this.PrescriptionItemStatusField;
  }
  set PrescriptionItemStatus(value: string) {
    if (this.referenceEquals(this.PrescriptionItemStatusField, value)) {
      this.PrescriptionItemStatusField = value;
      // this.RaisePropertyChanged("PrescriptionItemStatus");
    }
  }

  get PrescribedVolume(): string {
    return this.PrescribedVolumeField;
  }
  set PrescribedVolume(value: string) {
    if (this.referenceEquals(this.PrescribedVolumeField, value)) {
      this.PrescribedVolumeField = value;
      // this.RaisePropertyChanged("PrescribedVolume");
    }
  }
  get PrescribedVolumeLorenzoID(): string {
    return this.PrescribedVolumeLorenzoIDField;
  }
  set PrescribedVolumeLorenzoID(value: string) {
    if (this.referenceEquals(this.PrescribedVolumeLorenzoIDField, value)) {
      this.PrescribedVolumeLorenzoIDField = value;
      // this.RaisePropertyChanged("PrescribedVolumeLorenzoID");
    }
  }

  get InfUpperRate(): string {
    return this.InfUpperRateField;
  }
  set InfUpperRate(value: string) {
    if (this.referenceEquals(this.InfUpperRateField, value)) {
      this.InfUpperRateField = value;
      // this.RaisePropertyChanged("InfUpperRate");
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

  get IsAllowAdvanceAdmin(): boolean {
    return this.IsAllowAdvanceAdminSlotField;
  }
  set IsAllowAdvanceAdmin(value: boolean) {
    if (this.IsAllowAdvanceAdminSlotField != value) {
      this.IsAllowAdvanceAdminSlotField = value;
      // this.RaisePropertyChanged("IsAllowAdvanceAdmin");
    }
  }

  get EstVolumeInfusedInProgress(): number {
    return this.EstVolumeInfusedInProgressField;
  }
  set EstVolumeInfusedInProgress(value: number) {
    if (this.referenceEquals(this.EstVolumeInfusedInProgressField, value)) {
      this.EstVolumeInfusedInProgressField = value;
      // this.RaisePropertyChanged("EstVolumeInfusedInProgress");
    }
  }

  get EstVolumeInfusedInProgressUOM(): UOM {
    return this.EstVolumeInfusedInProgressUOMField;
  }
  set EstVolumeInfusedInProgressUOM(value: UOM) {
    if (this.referenceEquals(this.EstVolumeInfusedInProgressUOMField, value)) {
      this.EstVolumeInfusedInProgressUOMField = value;
      // this.RaisePropertyChanged("EstVolumeInfusedInProgressUOM");
    }
  }

  get EstVolumeInfusedInProgressDurationInMins(): number {
    return this.EstVolumeInfusedInProgressDurationInMinsField;
  }
  set EstVolumeInfusedInProgressDurationInMins(value: number) {
    if (
      this.referenceEquals(
        this.EstVolumeInfusedInProgressDurationInMinsField,
        value
      )
    ) {
      this.EstVolumeInfusedInProgressDurationInMinsField = value;
      // this.RaisePropertyChanged("EstVolumeInfusedInProgressDurationInMins");
    }
  }

  get IsOnceOnlyFrequency(): boolean {
    return this.IsOnceOnlyFrequencyField;
  }
  set IsOnceOnlyFrequency(value: boolean) {
    if (this.IsOnceOnlyFrequencyField != value) {
      this.IsOnceOnlyFrequencyField = value;
      // this.RaisePropertyChanged("IsOnceOnlyFrequency");
    }
  }

  get IsHighlightSlot(): boolean {
    return this.IsHighlightSlotField;
  }
  set IsHighlightSlot(value: boolean) {
    if (this.IsHighlightSlotField != value) {
      this.IsHighlightSlotField = value;
      // this.RaisePropertyChanged("IsHighlightSlot");
    }
  }

  get IsPatientSelfAdministered(): boolean {
    return this.IsPatientSelfAdministeredField;
  }
  set IsPatientSelfAdministered(value: boolean) {
    if (this.IsPatientSelfAdministeredField != value) {
      this.IsPatientSelfAdministeredField = value;
      // this.RaisePropertyChanged("IsPatientSelfAdministered");
    }
  }

  get IsPRNWithSchedule(): boolean {
    return this.IsPRNWithScheduleField;
  }
  set IsPRNWithSchedule(value: boolean) {
    if (this.IsPRNWithScheduleField != value) {
      this.IsPRNWithScheduleField = value;
      // this.RaisePropertyChanged("IsPRNWithSchedule");
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

  get Direction(): string {
    return this.DirectionField;
  }
  set Direction(value: string) {
    if (this.referenceEquals(this.DirectionField, value)) {
      this.DirectionField = value;
      // this.RaisePropertyChanged("Direction");
    }
  }

  get IsNextSlotMultiSlotAdmin(): boolean {
    return this._IsNextSlotMultiSlotAdminField;
  }
  set IsNextSlotMultiSlotAdmin(value: boolean) {
    if (this.referenceEquals(this._IsNextSlotMultiSlotAdminField, value)) {
      this._IsNextSlotMultiSlotAdminField = value;
      // this.RaisePropertyChanged("IsNextSlotMultiSlotAdmin");
    }
  }
}
export class DrugHeader extends CLZOObject {
  private DrugIdentifyingOIDField = 0;
  private DrugIdentifyingTypeField = '';

  private LorenzoIDField = '';

  private MCVersionField = '';

  private PrescriptionDurationField = 0;

  private IsParacetamolIngredientField = false;

  private IngredientWarningField: ArrayOfString = new ArrayOfString();

  private OrderSetNameField = '';

  private PrescriptionItemOIDField = 0;

  private DrugNameField = '';

  private DosageFormField = '';

  private LowEventField = 0;

  private HighEventField = 0;

  private LowPeriodField = '';

  private HighPeriodField = '';

  private PerodCodeField = '';

  private FrequencyTypeField = '';

  private LowerDoseField = '';

  private UpperDoseField = '';

  private DoseUOMField = '';

  private DoseUOMLzoIDField = '';

  private DoseUOMOIDField = 0;

  private DrugFrequencyField = '';

  private DoseTypeField = '';

  private RouteField = '';

  private RouteOIDField = 0;

  private DosageFormOIDField = 0;

  private SiteField = '';

  private AdministrationInstructionsField = '';

  private PRNInstructionsField = '';

  private ItemTypeField = '';

  private PrescriptionItemStatusField = '';

  private StartDateField = new Date();

  private EndDateField = new Date();

  private PrescriberNameField = '';

  private IsControlledDrugField = false;

  private IsPGDField = false;

  private IsConflictExistsField = '';

  private IsClinicallyVerifiedField = false;

  private IsPRNField = false;

  private IsSelfAdministeredField = false;

  private IsWitnessRequiredField = false;

  private MinimumIntervalField = 0;

  private MaxSlotDateField = new Date();

  private AdminMethodField = '';

  private AmendedPrescriptionItemOIDField = 0;

  private IsAmendmentField = false;

  //Ramya -EPIC 3383- Showing the Prescribing note in Prescription chart
  private PrescribingCommentsField = '';
  //
  private SlotsTimeIntervalAvgField = 0;

  private IsAdminIVAlertMsgRequiredField = 0;

  private ItemSubTypeField = '';

  private MultiComponentItemsField: ArrayOfString = new ArrayOfString();

  private PreparationStatusCodeField = '';

  private EncounterOIDField = 0;

  private EncounterTypeField = '';

  private FormViewParametersField: PrescriptionItemFormViewParameters =
    new PrescriptionItemFormViewParameters();

  private IsInfusionField = false;

  private InfusionTypeField = '';

  private InfChartAlertsField: ArrayOfString = new ArrayOfString();

  private IsAlertShownField = 0;

  private PreviousRateField = '';

  private PrescribedAtField = new Date();

  private PrescriptionDurationUOMField = '';

  private AdditionalCommentsField = '';

  private AdministrationTimesField = '';

  private DiscontinuedbyField = '';

  private DiscontinuedDttmField = new Date();

  private ConcentrationStrengthField = '';

  private ConcentrationStrengthUOMField: UOM = new UOM();

  private ConcentrationVolumeField = '';

  private ConcentrationVolumeUOMField: UOM = new UOM();

  private AmendedAsRequiredField = '';

  private PreviousConcentrationField = '';

  private IsPRNWithScheduleField = false;

  private PrintCategoryField = '';
  private IsConditionalExistsField = false;
  private StrengthTextField = '';

  private multiRouteTypeField = 0;

  //clinically verify CR LZO-28089
  private ClinicallyVerifiedCommentsField = '';

  private ClinicallyVerifiedByField = '';

  private ClinicallyVerifiedAtField = new Date();

  private OrderSetGroupIDField = '';

  private DaysOfWeekField = '';
  //
  private IsSupplyRequestedField = '';
  private RequestedDTTMField = new Date();
  private RequestedByField = '';
  private RequestedCommentsField = '';
  private RequestUrgencyField = '';
  private IsBolusField = false;
  private IsInfusionFluidField = false;
  //Mods for 636629
  private InfusionCompletedByField = '';
  private DiscontinuedCommentsField = '';
  private InfusionCompletionCommentsField = '';
  private StopDateField = new Date();
  //14-day admin LZO-160054
  private IsAllowAdvanceAdminField = false;
  private SupplyCommentsField = '';
  private SupplyInstructionsField = '';
  private ProductOptionsField = '';
  private DrugFrequencyOIDField = 0;
  private ExistsOnAdmissionField = '';
  private IsIndefiniteOmitField = false;
  private IndefiniteOmitFromDTTMField = new Date();
  private OmitCommentsField = '';
  private LastOmittedSlotDTTMField = new Date();
  private OmittedbyField = '';
  private ReviewDTTMField = new Date();
  private ReviewRequestedCommentsField = '';
  private ReviewedRequestedbyField = '';
  private ReviewTypeField = '';
  //2.16 Epic 3383 US 14990 Start
  private IsAllowedField = false;
  //2.16 Epic 3383 US 14990 End
  private _SupplyDTTM = new Date();
  private _NextSupplyDTTM = new Date();

  //Esakki - CriticalMeds
  private _IsCriticalMed = false;

  private CriticalMedsRoutesField = '';
  private CriticalMedsMsgField = '';
  private CriticalDrugSiteURLField = '';

  // dosecalci - sravani
  private _IsDoseCalculatedByDCField = false;
  private DCalcDTTMField = new Date();
  private _IsAmendCompletedStatusField = false;
  //SK -- HIMSS - 91670
  private ScheduleDTTMField = new Date();
  private RecordedDTTMField = new Date();

  private IsMedScanExcludedField = false;

  get DrugIdentifyingOID(): number {
    return this.DrugIdentifyingOIDField;
  }
  set DrugIdentifyingOID(value: number) {
    if (this.DrugIdentifyingOIDField != value) {
      this.DrugIdentifyingOIDField = value;
      // this.RaisePropertyChanged("DrugIdentifyingOID");
    }
  }

  get DrugIdentifyingType(): string {
    return this.DrugIdentifyingTypeField;
  }
  set DrugIdentifyingType(value: string) {
    if (this.referenceEquals(this.DrugIdentifyingTypeField, value)) {
      this.DrugIdentifyingTypeField = value;
      // this.RaisePropertyChanged("DrugIdentifyingType");
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

  get MCVersion(): string {
    return this.MCVersionField;
  }
  set MCVersion(value: string) {
    if (this.referenceEquals(this.MCVersionField, value)) {
      this.MCVersionField = value;
      // this.RaisePropertyChanged("MCVersion");
    }
  }

  get PrescriptionDuration(): number {
    return this.PrescriptionDurationField;
  }
  set PrescriptionDuration(value: number) {
    if (this.PrescriptionDurationField != value) {
      this.PrescriptionDurationField = value;
      // this.RaisePropertyChanged("PrescriptionDuration");
    }
  }

  get IsParacetamolIngredient(): boolean {
    return this.IsParacetamolIngredientField;
  }
  set IsParacetamolIngredient(value: boolean) {
    if (this.IsParacetamolIngredientField != value) {
      this.IsParacetamolIngredientField = value;
      // this.RaisePropertyChanged("IsParacetamolIngredient");
    }
  }

  get IngredientWarning(): ArrayOfString {
    return this.IngredientWarningField;
  }
  set IngredientWarning(value: ArrayOfString) {
    if (this.referenceEquals(this.IngredientWarningField, value)) {
      this.IngredientWarningField = value;
      // this.RaisePropertyChanged("IngredientWarning");
    }
  }

  get OrderSetName(): string {
    return this.OrderSetNameField;
  }
  set OrderSetName(value: string) {
    if (this.referenceEquals(this.OrderSetNameField, value)) {
      this.OrderSetNameField = value;
      // this.RaisePropertyChanged("OrderSetName");
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
  get DrugName(): string {
    return this.DrugNameField;
  }
  set DrugName(value: string) {
    if (this.referenceEquals(this.DrugNameField, value)) {
      this.DrugNameField = value;
      // this.RaisePropertyChanged("DrugName");
    }
  }

  get DosageForm(): string {
    return this.DosageFormField;
  }
  set DosageForm(value: string) {
    if (this.referenceEquals(this.DosageFormField, value)) {
      this.DosageFormField = value;
      // this.RaisePropertyChanged("DosageForm");
    }
  }

  get LowEvent(): number {
    return this.LowEventField;
  }
  set LowEvent(value: number) {
    if (this.LowEventField != value) {
      this.LowEventField = value;
      // this.RaisePropertyChanged("LowEvent");
    }
  }

  get HighEvent(): number {
    return this.HighEventField;
  }
  set HighEvent(value: number) {
    if (this.HighEventField != value) {
      this.HighEventField = value;
      // this.RaisePropertyChanged("HighEvent");
    }
  }

  get LowPeriod(): string {
    return this.LowPeriodField;
  }
  set LowPeriod(value: string) {
    if (this.referenceEquals(this.LowPeriodField, value)) {
      this.LowPeriodField = value;
      // this.RaisePropertyChanged("LowPeriod");
    }
  }

  get HighPeriod(): string {
    return this.HighPeriodField;
  }
  set HighPeriod(value: string) {
    if (this.referenceEquals(this.HighPeriodField, value)) {
      this.HighPeriodField = value;
      // this.RaisePropertyChanged("HighPeriod");
    }
  }

  get PerodCode(): string {
    return this.PerodCodeField;
  }
  set PerodCode(value: string) {
    if (this.referenceEquals(this.PerodCodeField, value)) {
      this.PerodCodeField = value;
      // this.RaisePropertyChanged("PerodCode");
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

  get LowerDose(): string {
    return this.LowerDoseField;
  }
  set LowerDose(value: string) {
    if (this.referenceEquals(this.LowerDoseField, value)) {
      this.LowerDoseField = value;
      // this.RaisePropertyChanged("LowerDose");
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

  get DoseUOM(): string {
    return this.DoseUOMField;
  }
  set DoseUOM(value: string) {
    if (this.referenceEquals(this.DoseUOMField, value)) {
      this.DoseUOMField = value;
      // this.RaisePropertyChanged("DoseUOM");
    }
  }

  get DoseUOMLzoID(): string {
    return this.DoseUOMLzoIDField;
  }
  set DoseUOMLzoID(value: string) {
    if (this.referenceEquals(this.DoseUOMLzoIDField, value)) {
      this.DoseUOMLzoIDField = value;
      // this.RaisePropertyChanged("DoseUOMLzoID");
    }
  }

  get DoseUOMOID(): number {
    return this.DoseUOMOIDField;
  }
  set DoseUOMOID(value: number) {
    if (this.DoseUOMOIDField != value) {
      this.DoseUOMOIDField = value;
      // this.RaisePropertyChanged("DoseUOMOID");
    }
  }

  get DrugFrequency(): string {
    return this.DrugFrequencyField;
  }
  set DrugFrequency(value: string) {
    if (this.referenceEquals(this.DrugFrequencyField, value)) {
      this.DrugFrequencyField = value;
      // this.RaisePropertyChanged("DrugFrequency");
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

  get Route(): string {
    return this.RouteField;
  }
  set Route(value: string) {
    if (this.referenceEquals(this.RouteField, value)) {
      this.RouteField = value;
      // this.RaisePropertyChanged("Route");
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

  get DosageFormOID(): number {
    return this.DosageFormOIDField;
  }
  set DosageFormOID(value: number) {
    if (this.DosageFormOIDField != value) {
      this.DosageFormOIDField = value;
      // this.RaisePropertyChanged("DosageFormOID");
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

  get AdministrationInstructions(): string {
    return this.AdministrationInstructionsField;
  }
  set AdministrationInstructions(value: string) {
    if (this.referenceEquals(this.AdministrationInstructionsField, value)) {
      this.AdministrationInstructionsField = value;
      // this.RaisePropertyChanged("AdministrationInstructions");
    }
  }

  get PRNInstructions(): string {
    return this.PRNInstructionsField;
  }
  set PRNInstructions(value: string) {
    if (this.referenceEquals(this.PRNInstructionsField, value)) {
      this.PRNInstructionsField = value;
      // this.RaisePropertyChanged("PRNInstructions");
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

  get PrescriptionItemStatus(): string {
    return this.PrescriptionItemStatusField;
  }
  set PrescriptionItemStatus(value: string) {
    if (this.referenceEquals(this.PrescriptionItemStatusField, value)) {
      this.PrescriptionItemStatusField = value;
      // this.RaisePropertyChanged("PrescriptionItemStatus");
    }
  }

  get StartDate(): Date {
    return this.StartDateField;
  }
  set StartDate(value: Date) {
    if (this.StartDateField != value) {
      this.StartDateField = value;
      // this.RaisePropertyChanged("StartDate");
    }
  }

  get EndDate(): Date {
    return this.EndDateField;
  }
  set EndDate(value: Date) {
    if (this.EndDateField != value) {
      this.EndDateField = value;
      // this.RaisePropertyChanged("EndDate");
    }
  }

  get PrescriberName(): string {
    return this.PrescriberNameField;
  }
  set PrescriberName(value: string) {
    if (this.referenceEquals(this.PrescriberNameField, value)) {
      this.PrescriberNameField = value;
      // this.RaisePropertyChanged("PrescriberName");
    }
  }

  get IsControlledDrug(): boolean {
    return this.IsControlledDrugField;
  }
  set IsControlledDrug(value: boolean) {
    if (this.IsControlledDrugField != value) {
      this.IsControlledDrugField = value;
      // this.RaisePropertyChanged("IsControlledDrug");
    }
  }

  get IsPGD(): boolean {
    return this.IsPGDField;
  }
  set IsPGD(value: boolean) {
    if (this.IsPGDField != value) {
      this.IsPGDField = value;
      // this.RaisePropertyChanged("IsPGD");
    }
  }

  get IsConflictExists(): string {
    return this.IsConflictExistsField;
  }
  set IsConflictExists(value: string) {
    if (this.IsConflictExistsField != value) {
      this.IsConflictExistsField = value;
      // this.RaisePropertyChanged("IsConflictExists");
    }
  }

  get IsClinicallyVerified(): boolean {
    return this.IsClinicallyVerifiedField;
  }
  set IsClinicallyVerified(value: boolean) {
    if (this.IsClinicallyVerifiedField != value) {
      this.IsClinicallyVerifiedField = value;
      // this.RaisePropertyChanged("IsClinicallyVerified");
    }
  }

  get IsPRN(): boolean {
    return this.IsPRNField;
  }
  set IsPRN(value: boolean) {
    if (this.IsPRNField != value) {
      this.IsPRNField = value;
      // this.RaisePropertyChanged("IsPRN");
    }
  }

  get IsSelfAdministered(): boolean {
    return this.IsSelfAdministeredField;
  }
  set IsSelfAdministered(value: boolean) {
    if (this.IsSelfAdministeredField != value) {
      this.IsSelfAdministeredField = value;
      // this.RaisePropertyChanged("IsSelfAdministered");
    }
  }

  get IsWitnessRequired(): boolean {
    return this.IsWitnessRequiredField;
  }
  set IsWitnessRequired(value: boolean) {
    if (this.IsWitnessRequiredField != value) {
      this.IsWitnessRequiredField = value;
      // this.RaisePropertyChanged("IsWitnessRequired");
    }
  }

  get MinimumInterval(): number {
    return this.MinimumIntervalField;
  }
  set MinimumInterval(value: number) {
    if (this.MinimumIntervalField != value) {
      this.MinimumIntervalField = value;
      // this.RaisePropertyChanged("MinimumInterval");
    }
  }

  get MaxSlotDate(): Date {
    return this.MaxSlotDateField;
  }
  set MaxSlotDate(value: Date) {
    if (this.MaxSlotDateField != value) {
      this.MaxSlotDateField = value;
      // this.RaisePropertyChanged("MaxSlotDate");
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

  get AmendedPrescriptionItemOID(): number {
    return this.AmendedPrescriptionItemOIDField;
  }
  set AmendedPrescriptionItemOID(value: number) {
    if (this.AmendedPrescriptionItemOIDField != value) {
      this.AmendedPrescriptionItemOIDField = value;
      // this.RaisePropertyChanged("AmendedPrescriptionItemOID");
    }
  }

  get IsAmendment(): boolean {
    return this.IsAmendmentField;
  }
  set IsAmendment(value: boolean) {
    if (this.IsAmendmentField != value) {
      this.IsAmendmentField = value;
      // this.RaisePropertyChanged("IsAmendment");
    }
  }

  get PrescribingComments(): string {
    return this.PrescribingCommentsField;
  }
  set PrescribingComments(value: string) {
    if (this.referenceEquals(this.PrescribingCommentsField, value)) {
      this.PrescribingCommentsField = value;
      // this.RaisePropertyChanged("PrescribingComments");
    }
  }

  get SlotsTimeIntervalAvg(): number {
    return this.SlotsTimeIntervalAvgField;
  }
  set SlotsTimeIntervalAvg(value: number) {
    if (this.SlotsTimeIntervalAvgField != value) {
      this.SlotsTimeIntervalAvgField = value;
      // this.RaisePropertyChanged("SlotsTimeIntervalAvg");
    }
  }

  get IsAdminIVAlertMsgRequired(): number {
    return this.IsAdminIVAlertMsgRequiredField;
  }
  set IsAdminIVAlertMsgRequired(value: number) {
    if (this.IsAdminIVAlertMsgRequiredField != value) {
      this.IsAdminIVAlertMsgRequiredField = value;
      // this.RaisePropertyChanged("IsAdminIVAlertMsgRequired");
    }
  }
  get ItemSubType(): string {
    return this.ItemSubTypeField;
  }
  set ItemSubType(value: string) {
    if (this.referenceEquals(this.ItemSubTypeField, value)) {
      this.ItemSubTypeField = value;
      // this.RaisePropertyChanged("ItemSubType");
    }
  }

  get MultiComponentItems(): ArrayOfString {
    return this.MultiComponentItemsField;
  }
  set MultiComponentItems(value: ArrayOfString) {
    if (this.referenceEquals(this.MultiComponentItemsField, value)) {
      this.MultiComponentItemsField = value;
      // this.RaisePropertyChanged("MultiComponentItems");
    }
  }

  get PreparationStatusCode(): string {
    return this.PreparationStatusCodeField;
  }
  set PreparationStatusCode(value: string) {
    if (this.referenceEquals(this.PreparationStatusCodeField, value)) {
      this.PreparationStatusCodeField = value;
      // this.RaisePropertyChanged("PreparationStatusCode");
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

  get EncounterType(): string {
    return this.EncounterTypeField;
  }
  set EncounterType(value: string) {
    if (this.referenceEquals(this.EncounterTypeField, value)) {
      this.EncounterTypeField = value;
      // this.RaisePropertyChanged("EncounterType");
    }
  }

  get FormViewParameters(): PrescriptionItemFormViewParameters {
    return this.FormViewParametersField;
  }
  set FormViewParameters(value: PrescriptionItemFormViewParameters) {
    if (this.referenceEquals(this.FormViewParametersField, value)) {
      this.FormViewParametersField = value;
      // this.RaisePropertyChanged("FormViewParameters");
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

  get InfusionType(): string {
    return this.InfusionTypeField;
  }
  set InfusionType(value: string) {
    if (this.referenceEquals(this.InfusionTypeField, value)) {
      this.InfusionTypeField = value;
      // this.RaisePropertyChanged("InfusionType");
    }
  }

  get InfChartAlerts(): ArrayOfString {
    return this.InfChartAlertsField;
  }
  set InfChartAlerts(value: ArrayOfString) {
    if (this.referenceEquals(this.InfChartAlertsField, value)) {
      this.InfChartAlertsField = value;
      // this.RaisePropertyChanged("InfChartAlerts");
    }
  }

  get IsAlertShown(): number {
    return this.IsAlertShownField;
  }
  set IsAlertShown(value: number) {
    if (this.IsAlertShownField != value) {
      this.IsAlertShownField = value;
      // this.RaisePropertyChanged("IsAlertShown");
    }
  }

  get PreviousRate(): string {
    return this.PreviousRateField;
  }
  set PreviousRate(value: string) {
    if (this.referenceEquals(this.PreviousRateField, value)) {
      this.PreviousRateField = value;
      // this.RaisePropertyChanged("PreviousRate");
    }
  }

  get PrescribedAt(): Date {
    return this.PrescribedAtField;
  }
  set PrescribedAt(value: Date) {
    if (this.PrescribedAtField != value) {
      this.PrescribedAtField = value;
      // this.RaisePropertyChanged("PrescribedAt");
    }
  }

  get PrescriptionDurationUOM(): string {
    return this.PrescriptionDurationUOMField;
  }
  set PrescriptionDurationUOM(value: string) {
    if (this.referenceEquals(this.PrescriptionDurationUOMField, value)) {
      this.PrescriptionDurationUOMField = value;
      // this.RaisePropertyChanged("PrescriptionDurationUOM");
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

  get AdministrationTimes(): string {
    return this.AdministrationTimesField;
  }
  set AdministrationTimes(value: string) {
    if (this.referenceEquals(this.AdministrationTimesField, value)) {
      this.AdministrationTimesField = value;
      // this.RaisePropertyChanged("AdministrationTimes");
    }
  }

  get Discontinuedby(): string {
    return this.DiscontinuedbyField;
  }
  set Discontinuedby(value: string) {
    if (this.referenceEquals(this.DiscontinuedbyField, value)) {
      this.DiscontinuedbyField = value;
      // this.RaisePropertyChanged("Discontinuedby");
    }
  }

  get DiscontinuedDttm(): Date {
    return this.DiscontinuedDttmField;
  }
  set DiscontinuedDttm(value: Date) {
    if (this.DiscontinuedDttmField != value) {
      this.DiscontinuedDttmField = value;
      // this.RaisePropertyChanged("DiscontinuedDttm");
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

  get ConcentrationStrengthUOM(): UOM {
    return this.ConcentrationStrengthUOMField;
  }
  set ConcentrationStrengthUOM(value: UOM) {
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

  get ConcentrationVolumeUOM(): UOM {
    return this.ConcentrationVolumeUOMField;
  }
  set ConcentrationVolumeUOM(value: UOM) {
    if (this.referenceEquals(this.ConcentrationVolumeUOMField, value)) {
      this.ConcentrationVolumeUOMField = value;
      // this.RaisePropertyChanged("ConcentrationVolumeUOM");
    }
  }
  get AmendedAsRequired(): string {
    return this.AmendedAsRequiredField;
  }
  set AmendedAsRequired(value: string) {
    if (this.referenceEquals(this.AmendedAsRequiredField, value)) {
      this.AmendedAsRequiredField = value;
      // this.RaisePropertyChanged("AmendedAsRequired");
    }
  }

  get PreviousConcentration(): string {
    return this.PreviousConcentrationField;
  }
  set PreviousConcentration(value: string) {
    if (this.referenceEquals(this.PreviousConcentrationField, value)) {
      this.PreviousConcentrationField = value;
      // this.RaisePropertyChanged("PreviousConcentration");
    }
  }

  get IsPRNWithSchedule(): boolean {
    return this.IsPRNWithScheduleField;
  }
  set IsPRNWithSchedule(value: boolean) {
    if (this.IsPRNWithScheduleField != value) {
      this.IsPRNWithScheduleField = value;
      // this.RaisePropertyChanged("IsPRNWithSchedule");
    }
  }

  get PrintCategory(): string {
    return this.PrintCategoryField;
  }
  set PrintCategory(value: string) {
    if (this.referenceEquals(this.PrintCategoryField, value)) {
      this.PrintCategoryField = value;
      // this.RaisePropertyChanged("PrintCategory");
    }
  }

  get IsConditionalExists(): boolean {
    return this.IsConditionalExistsField;
  }
  set IsConditionalExists(value: boolean) {
    if (this.referenceEquals(this.IsConditionalExistsField, value)) {
      this.IsConditionalExistsField = value;
      // this.RaisePropertyChanged("IsConditionalExists");
    }
  }

  get StrengthText(): string {
    return this.StrengthTextField;
  }
  set StrengthText(value: string) {
    if (this.referenceEquals(this.StrengthTextField, value)) {
      this.StrengthTextField = value;
      // this.RaisePropertyChanged("StrengthText");
    }
  }

  get MultiRouteType(): number {
    return this.multiRouteTypeField;
  }
  set MultiRouteType(value: number) {
    if (this.multiRouteTypeField != value) {
      this.multiRouteTypeField = value;
      // this.RaisePropertyChanged("MultiRouteType");
    }
  }

  get ClinicallyVerifiedComments(): string {
    return this.ClinicallyVerifiedCommentsField;
  }
  set ClinicallyVerifiedComments(value: string) {
    if (this.referenceEquals(this.ClinicallyVerifiedCommentsField, value)) {
      this.ClinicallyVerifiedCommentsField = value;
      // this.RaisePropertyChanged("ClinicallyVerifiedComments");
    }
  }

  get ClinicallyVerifiedBy(): string {
    return this.ClinicallyVerifiedByField;
  }
  set ClinicallyVerifiedBy(value: string) {
    if (this.referenceEquals(this.ClinicallyVerifiedByField, value)) {
      this.ClinicallyVerifiedByField = value;
      // this.RaisePropertyChanged("ClinicallyVerifiedBy");
    }
  }

  get ClinicallyVerifiedAt(): Date {
    return this.ClinicallyVerifiedAtField;
  }
  set ClinicallyVerifiedAt(value: Date) {
    if (this.ClinicallyVerifiedAtField != value) {
      this.ClinicallyVerifiedAtField = value;
      // this.RaisePropertyChanged("ClinicallyVerifiedAt");
    }
  }

  get OrderSetGroupID(): string {
    return this.OrderSetGroupIDField;
  }
  set OrderSetGroupID(value: string) {
    if (this.referenceEquals(this.OrderSetGroupIDField, value)) {
      this.OrderSetGroupIDField = value;
      // this.RaisePropertyChanged("OrderSetGroupID");
    }
  }

  get DaysOfWeek(): string {
    return this.DaysOfWeekField;
  }
  set DaysOfWeek(value: string) {
    if (this.referenceEquals(this.DaysOfWeekField, value)) {
      this.DaysOfWeekField = value;
      // this.RaisePropertyChanged("DaysOfWeekField");
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

  get IsBolus(): boolean {
    return this.IsBolusField;
  }
  set IsBolus(value: boolean) {
    if (this.IsBolusField != value) {
      this.IsBolusField = value;
      // this.RaisePropertyChanged("IsBolus");
    }
  }

  get InfusionCompletedBy(): string {
    return this.InfusionCompletedByField;
  }
  set InfusionCompletedBy(value: string) {
    if (this.referenceEquals(this.InfusionCompletedByField, value)) {
      this.InfusionCompletedByField = value;
      // this.RaisePropertyChanged("InfusionCompletedBy");
    }
  }

  get DiscontinuedComments(): string {
    return this.DiscontinuedCommentsField;
  }
  set DiscontinuedComments(value: string) {
    if (this.referenceEquals(this.DiscontinuedCommentsField, value)) {
      this.DiscontinuedCommentsField = value;
      // this.RaisePropertyChanged("DiscontinuedComments");
    }
  }

  get InfusionCompletionComments(): string {
    return this.InfusionCompletionCommentsField;
  }
  set InfusionCompletionComments(value: string) {
    if (this.referenceEquals(this.InfusionCompletionCommentsField, value)) {
      this.InfusionCompletionCommentsField = value;
      // this.RaisePropertyChanged("InfusionCompletionComments");
    }
  }

  get StopDate(): Date {
    return this.StopDateField;
  }
  set StopDate(value: Date) {
    if (this.StopDateField != value) {
      this.StopDateField = value;
      // this.RaisePropertyChanged("StopDate");
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

  get IsAllowAdvanceAdmin(): boolean {
    return this.IsAllowAdvanceAdminField;
  }
  set IsAllowAdvanceAdmin(value: boolean) {
    if (this.IsAllowAdvanceAdminField != value) {
      this.IsAllowAdvanceAdminField = value;
      // this.RaisePropertyChanged("IsAllowAdvanceAdmin");
    }
  }

  get SupplyComments(): string {
    return this.SupplyCommentsField;
  }
  set SupplyComments(value: string) {
    if (this.referenceEquals(this.SupplyCommentsField, value)) {
      this.SupplyCommentsField = value;
      //    this.RaisePropertyChanged("SupplyComments");
    }
  }

  get SupplyInstructions(): string {
    return this.SupplyInstructionsField;
  }
  set SupplyInstructions(value: string) {
    if (this.referenceEquals(this.SupplyInstructionsField, value)) {
      this.SupplyInstructionsField = value;
      //    this.RaisePropertyChanged("SupplyInstructions");
    }
  }

  get ProductOptions(): string {
    return this.ProductOptionsField;
  }
  set ProductOptions(value: string) {
    if (this.referenceEquals(this.ProductOptionsField, value)) {
      this.ProductOptionsField = value;
      //    this.RaisePropertyChanged("ProductOptions");
    }
  }

  get DrugFrequencyOID(): number {
    return this.DrugFrequencyOIDField;
  }
  set DrugFrequencyOID(value: number) {
    if (this.DrugFrequencyOIDField != value) {
      this.DrugFrequencyOIDField = value;
      //    this.RaisePropertyChanged("DrugFrequencyOID");
    }
  }

  get IsIndefiniteOmit(): boolean {
    return this.IsIndefiniteOmitField;
  }
  set IsIndefiniteOmit(value: boolean) {
    if (this.IsIndefiniteOmitField != value) {
      this.IsIndefiniteOmitField = value;
      //    this.RaisePropertyChanged("IsIndefiniteOmit");
    }
  }

  get IndefiniteOmitFromDTTM(): Date {
    return this.IndefiniteOmitFromDTTMField;
  }
  set IndefiniteOmitFromDTTM(value: Date) {
    if (this.IndefiniteOmitFromDTTMField != value) {
      this.IndefiniteOmitFromDTTMField = value;
      //    this.RaisePropertyChanged("IndefiniteOmitFromDTTM");
    }
  }

  get OmitComments(): string {
    return this.OmitCommentsField;
  }
  set OmitComments(value: string) {
    if (this.referenceEquals(this.OmitCommentsField, value)) {
      this.OmitCommentsField = value;
      //    this.RaisePropertyChanged("OmitComments");
    }
  }

  get LastOmittedSlotDTTM(): Date {
    return this.LastOmittedSlotDTTMField;
  }
  set LastOmittedSlotDTTM(value: Date) {
    if (this.LastOmittedSlotDTTMField != value) {
      this.LastOmittedSlotDTTMField = value;
      //    this.RaisePropertyChanged("LastOmittedSlotDTTM");
    }
  }

  get Omittedby(): string {
    return this.OmittedbyField;
  }
  set Omittedby(value: string) {
    if (this.referenceEquals(this.OmittedbyField, value)) {
      this.OmittedbyField = value;
      //    this.RaisePropertyChanged("Omittedby");
    }
  }

  get ReviewDTTM(): Date {
    return this.ReviewDTTMField;
  }
  set ReviewDTTM(value: Date) {
    if (this.ReviewDTTMField != value) {
      this.ReviewDTTMField = value;
      //    this.RaisePropertyChanged("ReviewDTTM");
    }
  }

  get ReviewRequestedComments(): string {
    return this.ReviewRequestedCommentsField;
  }
  set ReviewRequestedComments(value: string) {
    if (this.referenceEquals(this.ReviewRequestedCommentsField, value)) {
      this.ReviewRequestedCommentsField = value;
      //    this.RaisePropertyChanged("ReviewRequestedComments");
    }
  }

  get ReviewedRequestedby(): string {
    return this.ReviewedRequestedbyField;
  }
  set ReviewedRequestedby(value: string) {
    if (this.referenceEquals(this.ReviewedRequestedbyField, value)) {
      this.ReviewedRequestedbyField = value;
      //    this.RaisePropertyChanged("ReviewedRequestedby");
    }
  }

  get ReviewType(): string {
    return this.ReviewTypeField;
  }
  set ReviewType(value: string) {
    if (this.referenceEquals(this.ReviewTypeField, value)) {
      this.ReviewTypeField = value;
      //    this.RaisePropertyChanged("ReviewType");
    }
  }

  get IsAllowed(): boolean {
    return this.IsAllowedField;
  }
  set IsAllowed(value: boolean) {
    if (this.IsAllowedField != value) {
      this.IsAllowedField = value;
      //    this.RaisePropertyChanged("IsAllowed");
    }
  }

  get ExistsOnAdmission(): string {
    return this.ExistsOnAdmissionField;
  }
  set ExistsOnAdmission(value: string) {
    if (this.referenceEquals(this.ExistsOnAdmissionField, value)) {
      this.ExistsOnAdmissionField = value;
      // this.RaisePropertyChanged("ExistsOnAdmission");
    }
  }

  get SupplyDTTM(): Date {
    return this._SupplyDTTM;
  }
  set SupplyDTTM(value: Date) {
    if (this._SupplyDTTM != value) {
      this._SupplyDTTM = value;
      // this.RaisePropertyChanged("SupplyDTTM");
    }
  }

  get NextSupplyDTTM(): Date {
    return this._NextSupplyDTTM;
  }
  set NextSupplyDTTM(value: Date) {
    if (this._NextSupplyDTTM != value) {
      this._NextSupplyDTTM = value;
      // this.RaisePropertyChanged("NextSupplyDTTM");
    }
  }

  get IsCriticalMed(): boolean {
    return this._IsCriticalMed;
  }
  set IsCriticalMed(value: boolean) {
    if (this._IsCriticalMed != value) {
      this._IsCriticalMed = value;
      // this.RaisePropertyChanged("IsCriticalMed");
    }
  }

  get CriticalMedsRoutes(): string {
    return this.CriticalMedsRoutesField;
  }
  set CriticalMedsRoutes(value: string) {
    if (this.referenceEquals(this.CriticalMedsRoutesField, value)) {
      this.CriticalMedsRoutesField = value;
      // this.RaisePropertyChanged("CriticalMedsRoutes");
    }
  }

  get CriticalMedsMsg(): string {
    return this.CriticalMedsMsgField;
  }
  set CriticalMedsMsg(value: string) {
    if (this.referenceEquals(this.CriticalMedsMsgField, value)) {
      this.CriticalMedsMsgField = value;
      // this.RaisePropertyChanged("CriticalMedsMsg");
    }
  }

  get CriticalDrugSiteURL(): string {
    return this.CriticalDrugSiteURLField;
  }
  set CriticalDrugSiteURL(value: string) {
    if (this.referenceEquals(this.CriticalDrugSiteURLField, value)) {
      this.CriticalDrugSiteURLField = value;
      // this.RaisePropertyChanged("CriticalDrugSiteURL");
    }
  }

  get IsDoseCalculatedByDC(): boolean {
    return this._IsDoseCalculatedByDCField;
  }
  set IsDoseCalculatedByDC(value: boolean) {
    if (this._IsDoseCalculatedByDCField != value) {
      this._IsDoseCalculatedByDCField = value;
      // this.RaisePropertyChanged("IsDoseCalculatedByDC ");
    }
  }

  get DCalcDTTM(): Date {
    return this.DCalcDTTMField;
  }
  set DCalcDTTM(value: Date) {
    if (this.DCalcDTTMField != value) {
      this.DCalcDTTMField = value;
      // this.RaisePropertyChanged("DCalcDTTM");
    }
  }

  get IsAmendCompletedStatus(): boolean {
    return this._IsAmendCompletedStatusField;
  }
  set IsAmendCompletedStatus(value: boolean) {
    if (this._IsAmendCompletedStatusField != value) {
      this._IsAmendCompletedStatusField = value;
      // this.RaisePropertyChanged("IsAmendCompletedStatus");
    }
  }

  get ScheduleDTTM(): Date {
    return this.ScheduleDTTMField;
  }
  set ScheduleDTTM(value: Date) {
    if (this.ScheduleDTTMField != value) {
      this.ScheduleDTTMField = value;
      // this.RaisePropertyChanged("ScheduleDTTM");
    }
  }

  get RecordedDTTM(): Date {
    return this.RecordedDTTMField;
  }
  set RecordedDTTM(value: Date) {
    if (this.RecordedDTTMField != value) {
      this.RecordedDTTMField = value;
      // this.RaisePropertyChanged("RecordedDTTM");
    }
  }

  get IsMedScanExcluded(): boolean {
    return this.IsMedScanExcludedField;
  }
  set IsMedScanExcluded(value: boolean) {
    if (this.IsMedScanExcludedField != value) {
      this.IsMedScanExcludedField = value;
      // this.RaisePropertyChanged("IsMedScanExcluded");
    }
  }
}
export class IntravenousInfusionDetails extends CLZOObject {

  private FluidField: ObjectInfo = new ObjectInfo();
  private VolumeField = '';
  private VolumeUOMField: UOM = new UOM();
  private InfusionPeriodField: string = '';
  private InfusionPeriodUOMField: UOM = new UOM();
  private RateField: string = '';
  private RateUOMField: UOM = new UOM();
  private RateDenominatorUOMField: UOM = new UOM()
  private HumidificationField = '';
  private PreviousRateField = '';
  private PreviousRateDrUOMNameField = '';
  private PreviousRateUOMNameField = '';
  private DeliveryDeviceField = '';
  private LumenField = '';
  private InfusionSeqOrderField = 0;
  private IsOnGoingField = '';
  private ReviewAfterField = new Date();
  private MaxDoseField = '';
  private ConcentrationField = 0;
  private TargetSaturationUpperField = 0;
  private TargetSaturationLowerField = 0;
  private IsOxygenField = '';
  private IsSequentialPrescribingField = false;
  private FirstPrescItemOIDInSeqField = 0;
  private ParentPrescriptionItemOIDField = 0;
  private UparentPresitemOIDSeqField = 0;
  private InfusionSeqCountField = 0;
  private IsAlertShownField = false;
  private IsBolusInfusionField = '';
  private IsReviewAlertField = false;
  private IsInfusionInprogressField = false;
  private IsInfusionStartDTTMReachedField = false;
  private InfScheduleDTTMsField: ArrayOfDateTime = new ArrayOfDateTime();
  private IsInfusionRouteField = '';
  private IsInfAmendStartDTTMBlankField = false;
  private IsEstimatedStopRecalculationRequiredField = false;
  private SequentialPrescriptionItemOIDsField: ArrayOfLong = new ArrayOfLong();
  private HUMIDCodeField = '';
  private LowConcentrationField = '';
  private LowConcentrationUOMOIDField: UOM = new UOM();
  private UpperConcentrationField = '';
  private UpperConcentrationUOMOIDField: UOM = new UOM();
  private UpperRateField = '';
  private PreviousUpperRateField = '';
  private PreviousLowConcentrationField = '';
  private PreviousLowConcentrationUOMField: UOM = new UOM()
  private PreviousUpperConcentrationField = '';
  private PreviousUpperConcentrationUOMField: UOM = new UOM();
  private IsAlertShownValueField = '';

  //TFSID-39667/NS -->
  private InfusionGroupSequenceNoField = 0;
  //TFSID-39667/NS <--	

  //sameer seq fix
  private IsLastItemField = false;
  //
  private SequenceParentPrescItemOIDField = 0;

  private SeqInfOrderForPervImmediateItmField = 0;
  // [System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue=false)]
  public get Fluid(): ObjectInfo {
    return this.FluidField;
  }
  public set Fluid(value: ObjectInfo) {
    if ((this.referenceEquals(this.FluidField, value))) {
      this.FluidField = value;
      // this.RaisePropertyChanged("Fluid");
    }
  }

  // [System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue=false)]
  public get Volume(): string {
    return this.VolumeField;
  }
  public set Volume(value: string) {
    if ((this.referenceEquals(this.VolumeField, value))) {
      this.VolumeField = value;
      // this.RaisePropertyChanged("Volume");
    }
  }
  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue=false)]
  public get VolumeUOM(): UOM {
    return this.VolumeUOMField;
  }
  public set VolumeUOM(value: UOM) {
    if ((this.referenceEquals(this.VolumeUOMField, value))) {
      this.VolumeUOMField = value;
      // this.RaisePropertyChanged("VolumeUOM");
    }
  }
  // [System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue=false, Order=3)]
  public get InfusionPeriod(): string {
    return this.InfusionPeriodField;
  }
  public set InfusionPeriod(value: string) {
    if ((this.referenceEquals(this.InfusionPeriodField, value))) {
      this.InfusionPeriodField = value;
      // this.RaisePropertyChanged("InfusionPeriod");
    }
  }
  // [System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue=false, Order=4)]
  public get InfusionPeriodUOM(): UOM {
    return this.InfusionPeriodUOMField;
  }
  public set InfusionPeriodUOM(value: UOM) {
    if ((this.referenceEquals(this.InfusionPeriodUOMField, value))) {
      this.InfusionPeriodUOMField = value;
      // this.RaisePropertyChanged("InfusionPeriodUOM");
    }
  }
  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue=false, Order=5)]
  public get Rate(): string {
    return this.RateField;
  }
  public set Rate(value: string) {
    if ((this.referenceEquals(this.RateField, value))) {
      this.RateField = value;
      //this.RaisePropertyChanged("Rate");
    }
  }
  // [System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue=false, Order=6)]
  public get RateUOM(): UOM {
    return this.RateUOMField;
  }
  public set RateUOM(value: UOM) {
    if ((this.referenceEquals(this.RateUOMField, value))) {
      this.RateUOMField = value;
      // this.RaisePropertyChanged("RateUOM");
    }
  }
  // [System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue=false, Order=7)]
  public get RateDenominatorUOM(): UOM {
    return this.RateDenominatorUOMField;
  }
  public set RateDenominatorUOM(value: UOM) {
    if ((this.referenceEquals(this.RateDenominatorUOMField, value))) {
      this.RateDenominatorUOMField = value;
      // this.RaisePropertyChanged("RateDenominatorUOM");
    }
  }
  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue=false, Order=8)]
  public get Humidification(): string {
    return this.HumidificationField;
  }
  public set Humidification(value: string) {
    if ((this.referenceEquals(this.HumidificationField, value))) {
      this.HumidificationField = value;
      //this.RaisePropertyChanged("Humidification");
    }
  }
  // [System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue=false, Order=9)]
  public get PreviousRate(): string {
    return this.PreviousRateField;
  }
  public set PreviousRate(value: string) {
    if ((this.referenceEquals(this.PreviousRateField, value))) {
      this.PreviousRateField = value;
      //  this.RaisePropertyChanged("PreviousRate");
    }
  }
  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue=false, Order=10)]
  public get PreviousRateDrUOMName(): string {
    return this.PreviousRateDrUOMNameField;
  }
  public set PreviousRateDrUOMName(value: string) {
    if ((this.referenceEquals(this.PreviousRateDrUOMNameField, value))) {
      this.PreviousRateDrUOMNameField = value;
      // this.RaisePropertyChanged("PreviousRateDrUOMName");
    }
  }
  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue=false, Order=11)]
  public get PreviousRateUOMName(): string {
    return this.PreviousRateUOMNameField;
  }
  public set PreviousRateUOMName(value: string) {
    if ((this.referenceEquals(this.PreviousRateUOMNameField, value))) {
      this.PreviousRateUOMNameField = value;
      // this.RaisePropertyChanged("PreviousRateUOMName");
    }
  }
  //  [System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue=false, Order=12)]
  public get DeliveryDevice(): string {
    return this.DeliveryDeviceField;
  }
  public set DeliveryDevice(value: string) {
    if ((this.referenceEquals(this.DeliveryDeviceField, value))) {
      this.DeliveryDeviceField = value;
      // this.RaisePropertyChanged("DeliveryDevice");
    }
  }
  //  [System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue=false, Order=13)]
  public get Lumen(): string {
    return this.LumenField;
  }
  public set Lumen(value: string) {
    if ((this.referenceEquals(this.LumenField, value))) {
      this.LumenField = value;
      // this.RaisePropertyChanged("Lumen");
    }
  }
  //  [System.Runtime.Serialization.DataMemberAttribute(IsRequired=true, Order=14)]
  public get InfusionSeqOrder(): number {
    return this.InfusionSeqOrderField;
  }
  public set InfusionSeqOrder(value: number) {
    if (!(this.InfusionSeqOrderField === value)) {
      this.InfusionSeqOrderField = value;
      // this.RaisePropertyChanged("InfusionSeqOrder");
    }
  }
  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue=false, Order=15)]
  public get IsOnGoing(): string {
    return this.IsOnGoingField;
  }
  public set IsOnGoing(value: string) {
    if ((this.referenceEquals(this.IsOnGoingField, value))) {
      this.IsOnGoingField = value;
      //  this.RaisePropertyChanged("IsOnGoing");
    }
  }
  // [System.Runtime.Serialization.DataMemberAttribute(IsRequired=true, Order=16)]
  public get ReviewAfter(): Date {
    return this.ReviewAfterField;
  }
  public set ReviewAfter(value: Date) {
    if (!(this.ReviewAfterField === value)) {
      this.ReviewAfterField = value;
      // this.RaisePropertyChanged("ReviewAfter");
    }
  }
  //  [System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue=false, Order=17)]
  public get MaxDose(): string {

    return this.MaxDoseField;
  }
  public set MaxDose(value: string) {
    if ((this.referenceEquals(this.MaxDoseField, value))) {
      this.MaxDoseField = value;
      // this.RaisePropertyChanged("MaxDose");
    }
  }
  // [System.Runtime.Serialization.DataMemberAttribute(IsRequired=true, Order=18)]
  public get Concentration(): number {
    return this.ConcentrationField;
  }
  public set Concentration(value: number) {
    if (!(this.ConcentrationField === value)) {
      this.ConcentrationField = value;
      //  this.RaisePropertyChanged("Concentration");
    }
  }
  //[System.Runtime.Serialization.DataMemberAttribute(IsRequired=true, Order=19)]
  public get TargetSaturationUpper(): number {
    return this.TargetSaturationUpperField;
  }
  public set TargetSaturationUpper(value: number) {
    if (!(this.TargetSaturationUpperField === value)) {
      this.TargetSaturationUpperField = value;
      //  this.RaisePropertyChanged("TargetSaturationUpper");
    }
  }
  // [System.Runtime.Serialization.DataMemberAttribute(IsRequired=true, Order=20)]
  public get TargetSaturationLower(): number {
    return this.TargetSaturationLowerField;
  }
  public set TargetSaturationLower(value: number) {
    if (!(this.TargetSaturationLowerField === value)) {
      this.TargetSaturationLowerField = value;
      //this.RaisePropertyChanged("TargetSaturationLower");
    }
  }
  //[System.Runtime.Serialization.DataMemberAttribute(IsRequired=true, Order=21)]
  public get IsOxygen(): string {
    return this.IsOxygenField;
  }
  public set IsOxygen(value: string) {
    if (!(this.IsOxygenField === value)) {
      this.IsOxygenField = value;
      //  this.RaisePropertyChanged("IsOxygen");
    }
  }
  //  [System.Runtime.Serialization.DataMemberAttribute(IsRequired=true, Order=22)]
  public get IsSequentialPrescribing(): boolean {
    return this.IsSequentialPrescribingField;
  }
  public set IsSequentialPrescribing(value: boolean) {
    if (!(this.IsSequentialPrescribingField === value)) {
      this.IsSequentialPrescribingField = value;
      //this.RaisePropertyChanged("IsSequentialPrescribing");
    }
  }
  // [System.Runtime.Serialization.DataMemberAttribute(IsRequired=true, Order=23)]
  public get FirstPrescItemOIDInSeq(): number {
    return this.FirstPrescItemOIDInSeqField;
  }
  public set FirstPrescItemOIDInSeq(value: number) {
    if (!(this.FirstPrescItemOIDInSeqField === value)) {
      this.FirstPrescItemOIDInSeqField = value;
      //  this.RaisePropertyChanged("FirstPrescItemOIDInSeq");
    }
  }
  //[System.Runtime.Serialization.DataMemberAttribute(IsRequired=true, Order=24)]
  public get ParentPrescriptionItemOID(): number {
    return this.ParentPrescriptionItemOIDField;
  }
  public set ParentPrescriptionItemOID(value: number) {
    if (!(this.ParentPrescriptionItemOIDField === value)) {
      this.ParentPrescriptionItemOIDField = value;
      //  this.RaisePropertyChanged("ParentPrescriptionItemOID");
    }
  }
  // [System.Runtime.Serialization.DataMemberAttribute(IsRequired=true, Order=25)]
  public get UparentPresitemOIDSeq(): number {
    return this.UparentPresitemOIDSeqField;
  }
  public set UparentPresitemOIDSeq(value: number) {
    if (!(this.UparentPresitemOIDSeqField === value)) {
      this.UparentPresitemOIDSeqField = value;
      // this.RaisePropertyChanged("UparentPresitemOIDSeq");
    }
  }
  // [System.Runtime.Serialization.DataMemberAttribute(IsRequired=true, Order=26)]
  public get InfusionSeqCount(): number {
    return this.InfusionSeqCountField;
  }
  public set InfusionSeqCount(value: number) {
    if (!(this.InfusionSeqCountField === value)) {
      this.InfusionSeqCountField = value;
      //  this.RaisePropertyChanged("InfusionSeqCount");
    }
  }
  //[System.Runtime.Serialization.DataMemberAttribute(IsRequired=true, Order=27)]
  public get IsAlertShown(): boolean {
    return this.IsAlertShownField;
  }
  public set IsAlertShown(value: boolean) {
    if (!(this.IsAlertShownField === value)) {
      this.IsAlertShownField = value;
      //this.RaisePropertyChanged("IsAlertShown");
    }
  }
  //   [System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue=false, Order=28)]
  public get IsBolusInfusion(): string {
    return this.IsBolusInfusionField;
  }
  public set IsBolusInfusion(value: string) {
    if ((this.referenceEquals(this.IsBolusInfusionField, value))) {
      this.IsBolusInfusionField = value;
      //this.RaisePropertyChanged("IsBolusInfusion");
    }
  }
  //  [System.Runtime.Serialization.DataMemberAttribute(IsRequired=true, Order=29)]
  public get IsReviewAlert(): boolean {
    return this.IsReviewAlertField;
  }
  public set IsReviewAlert(value: boolean) {
    if (!(this.IsReviewAlertField === value)) {
      this.IsReviewAlertField = value;
      //  this.RaisePropertyChanged("IsReviewAlert");
    }
  }

  // [System.Runtime.Serialization.DataMemberAttribute(IsRequired=true, Order=30)]
  public get IsInfusionInprogress(): boolean {
    return this.IsInfusionInprogressField;
  }
  public set IsInfusionInprogress(value: boolean) {
    if (!(this.IsInfusionInprogressField === value)) {
      this.IsInfusionInprogressField = value;
      //   this.RaisePropertyChanged("IsInfusionInprogress");
    }
  }
  // [System.Runtime.Serialization.DataMemberAttribute(IsRequired=true, Order=31)]
  public get IsInfusionStartDTTMReached(): boolean {
    return this.IsInfusionStartDTTMReachedField;
  }
  public set IsInfusionStartDTTMReached(value: boolean) {
    if (!(this.IsInfusionStartDTTMReachedField === value)) {
      this.IsInfusionStartDTTMReachedField = value;
      //this.RaisePropertyChanged("IsInfusionStartDTTMReached");
    }
  }
  // [System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue=false, Order=32)]
  public get InfScheduleDTTMs(): ArrayOfDateTime {
    return this.InfScheduleDTTMsField;
  }
  public set InfScheduleDTTMs(value: ArrayOfDateTime) {
    if ((this.referenceEquals(this.InfScheduleDTTMsField, value) != true)) {
      this.InfScheduleDTTMsField = value;
      // this.RaisePropertyChanged("InfScheduleDTTMs");
    }
  }
  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 33)]
  public get IsInfusionRoute(): string {
    return this.IsInfusionRouteField;
  }
  public set IsInfusionRoute(value: string) {
    if ((this.referenceEquals(this.IsInfusionRouteField, value))) {
      this.IsInfusionRouteField = value;
      //this.RaisePropertyChanged("IsInfusionRoute");
    }
  }

  //[System.Runtime.Serialization.DataMemberAttribute(IsRequired = true, Order = 34)]
  public get IsInfAmendStartDTTMBlank(): boolean {
    return this.IsInfAmendStartDTTMBlankField;
  }
  public set IsInfAmendStartDTTMBlank(value: boolean) {
    if (!(this.IsInfAmendStartDTTMBlankField === value)) {
      this.IsInfAmendStartDTTMBlankField = value;
      // this.RaisePropertyChanged("IsInfAmendStartDTTMBlank");
    }
  }
  //[System.Runtime.Serialization.DataMemberAttribute(IsRequired = true, Order = 35)]
  public get IsEstimatedStopRecalculationRequired(): boolean {
    return this.IsEstimatedStopRecalculationRequiredField;
  }
  public set IsEstimatedStopRecalculationRequired(value: boolean) {
    if (!(this.IsEstimatedStopRecalculationRequiredField === value)) {
      this.IsEstimatedStopRecalculationRequiredField = value;
      //  this.RaisePropertyChanged("IsEstimatedStopRecalculationRequired");
    }
  }
  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 36)]
  public get SequentialPrescriptionItemOIDs(): ArrayOfLong {
    return this.SequentialPrescriptionItemOIDsField;
  }
  public set SequentialPrescriptionItemOIDs(value: ArrayOfLong) {
    if ((this.referenceEquals(this.SequentialPrescriptionItemOIDsField, value))) {
      this.SequentialPrescriptionItemOIDsField = value;
      // this.RaisePropertyChanged("SequentialPrescriptionItemOIDs");
    }
  }
  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 37)]
  public get HUMIDCode(): string {
    return this.HUMIDCodeField;
  }
  public set HUMIDCode(value: string) {
    if ((this.referenceEquals(this.HUMIDCodeField, value))) {
      this.HUMIDCodeField = value;
      // this.RaisePropertyChanged("HUMIDCode");
    }
  }
  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 38)]
  public get LowConcentration(): string {
    return this.LowConcentrationField;
  }
  public set LowConcentration(value: string) {
    if ((this.referenceEquals(this.LowConcentrationField, value))) {
      this.LowConcentrationField = value;
      // this.RaisePropertyChanged("LowConcentration");
    }
  }
  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 39)]
  public get LowConcentrationUOMOID(): UOM {
    return this.LowConcentrationUOMOIDField;
  }
  public set LowConcentrationUOMOID(value: UOM) {
    if ((this.referenceEquals(this.LowConcentrationUOMOIDField, value))) {
      this.LowConcentrationUOMOIDField = value;
      // this.RaisePropertyChanged("LowConcentrationUOMOID");
    }
  }
  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 40)]
  public get UpperConcentration(): string {
    return this.UpperConcentrationField;
  }
  public set UpperConcentration(value: string) {
    if ((this.referenceEquals(this.UpperConcentrationField, value))) {
      this.UpperConcentrationField = value;
      //  this.RaisePropertyChanged("UpperConcentration");
    }
  }
  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 41)]
  public get UpperConcentrationUOMOID(): UOM {
    return this.UpperConcentrationUOMOIDField;
  }
  public set UpperConcentrationUOMOID(value: UOM) {
    if ((this.referenceEquals(this.UpperConcentrationUOMOIDField, value))) {
      this.UpperConcentrationUOMOIDField = value;
      // this.RaisePropertyChanged("UpperConcentrationUOMOID");
    }
  }
  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 42)]
  public get UpperRate(): string {
    return this.UpperRateField;
  }
  public set UpperRate(value: string) {
    if ((this.referenceEquals(this.UpperRateField, value))) {
      this.UpperRateField = value;
      // this.RaisePropertyChanged("UpperRate");
    }
  }
  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 43)]
  public get PreviousUpperRate(): string {
    return this.PreviousUpperRateField;
  }
  public set PreviousUpperRate(value: string) {
    if ((this.referenceEquals(this.PreviousUpperRateField, value))) {
      this.PreviousUpperRateField = value;
      // this.RaisePropertyChanged("PreviousUpperRate");
    }
  }
  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 44)]
  public get PreviousLowConcentration(): string {
    return this.PreviousLowConcentrationField;
  }
  public set PreviousLowConcentration(value: string) {
    if ((this.referenceEquals(this.PreviousLowConcentrationField, value))) {
      this.PreviousLowConcentrationField = value;
      // this.RaisePropertyChanged("PreviousLowConcentration");
    }
  }
  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 45)]
  public get PreviousLowConcentrationUOM(): UOM {
    return this.PreviousLowConcentrationUOMField;
  }
  public set PreviousLowConcentrationUOM(value: UOM) {
    if ((this.referenceEquals(this.PreviousLowConcentrationUOMField, value))) {
      this.PreviousLowConcentrationUOMField = value;
      //  this.RaisePropertyChanged("PreviousLowConcentrationUOM");
    }
  }
  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 46)]
  public get PreviousUpperConcentration(): string {
    return this.PreviousUpperConcentrationField;
  }
  public set PreviousUpperConcentration(value: string) {
    if ((this.referenceEquals(this.PreviousUpperConcentrationField, value))) {
      this.PreviousUpperConcentrationField = value;
      //this.RaisePropertyChanged("PreviousUpperConcentration");
    }
  }
  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 47)]
  public get PreviousUpperConcentrationUOM(): UOM {
    return this.PreviousUpperConcentrationUOMField;
  }
  public set PreviousUpperConcentrationUOM(value: UOM) {
    if ((this.referenceEquals(this.PreviousUpperConcentrationUOMField, value))) {
      this.PreviousUpperConcentrationUOMField = value;
      // this.RaisePropertyChanged("PreviousUpperConcentrationUOM");
    }
  }
  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 48)]
  public get IsAlertShownValue(): string {
    return this.IsAlertShownValueField;
  }
  public set IsAlertShownValue(value: string) {
    if ((this.referenceEquals(this.IsAlertShownValueField, value))) {
      this.IsAlertShownValueField = value;
      //   this.RaisePropertyChanged("IsAlertShownValue");
    }
  }


  //TFSID-39667/NS -->
  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 49)]
  public get InfusionGroupSequenceNo(): number {
    return this.InfusionGroupSequenceNoField;
  }
  public set InfusionGroupSequenceNo(value: number) {
    if ((this.referenceEquals(this.InfusionGroupSequenceNo, value))) {
      this.InfusionGroupSequenceNoField = value;
      //  this.RaisePropertyChanged("InfusionGroupSequenceNo");
    }
  }


  //TFSID-39667/NS <--
  //sameer seq fix
  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false, Order = 50)]
  public get IsLastItem(): boolean {
    return this.IsLastItemField;
  }
  public set IsLastItem(value: boolean) {
    if ((this.referenceEquals(this.IsLastItemField, value))) {
      this.IsLastItemField = value;
      // this.RaisePropertyChanged("IsLastItem");
    }
  }

  //[System.Runtime.Serialization.DataMemberAttribute(IsRequired = true, Order = 51)]
  public get SequenceParentPrescItemOID(): number {
    return this.SequenceParentPrescItemOIDField;
  }
  public set SequenceParentPrescItemOID(value: number) {
    if (!(this.SequenceParentPrescItemOIDField === value)) {
      this.SequenceParentPrescItemOIDField = value;
      // this.RaisePropertyChanged("SequenceParentPrescItemOID");
    }
  }
  //[System.Runtime.Serialization.DataMemberAttribute(IsRequired = true, Order = 52)]
  public get SeqInfOrderForPervImmediateItm(): number {
    return this.SeqInfOrderForPervImmediateItmField;
  }
  public set SeqInfOrderForPervImmediateItm(value: number) {
    if (!(this.SeqInfOrderForPervImmediateItmField === value)) {
      this.SeqInfOrderForPervImmediateItmField = value;
      // this.RaisePropertyChanged("SeqInfOrderForPervImmediateItm");
    }
  }
}
export class AdminDeviceDetails extends CLZOObject {

  private BackgroundRateField = '';
  private BackgroundRateUOMField: UOM = new UOM();
  private BackgroundRateDenaminatorUOMOIDField = 0;
  private TopUpDoseField = '';
  private TopUpDoseUOMField: UOM = new UOM();
  private LockOutPeriodField = 0;
  private LockOutPeriodUOMField: UOM = new UOM();
  private BackgroundRateDenaminatorUOMField: UOM = new UOM();
  private MonitorPeriodField = '';
  private MonitorPeriodUOMField: UOM = new UOM();
  private MonitoringPeriodAlertDTTMField: Date = new Date();
  private BoosterDoseField = '';
  private BoosterDoseUOMField: UOM = new UOM();
  //  [System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue=false)]
  public get BackgroundRate(): string {
    return this.BackgroundRateField;
  }
  public set BackgroundRate(value: string) {
    if ((this.referenceEquals(this.BackgroundRateField, value))) {
      this.BackgroundRateField = value;
      // this.RaisePropertyChanged("BackgroundRate");
    }
  }
  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue=false)]
  public get BackgroundRateUOM(): UOM {
    return this.BackgroundRateUOMField;
  }
  public set BackgroundRateUOM(value: UOM) {
    if ((this.referenceEquals(this.BackgroundRateUOMField, value))) {
      this.BackgroundRateUOMField = value;
      //this.RaisePropertyChanged("BackgroundRateUOM");
    }
  }
  // [System.Runtime.Serialization.DataMemberAttribute(IsRequired=true, Order=2)]
  public get BackgroundRateDenaminatorUOMOID(): number {
    return this.BackgroundRateDenaminatorUOMOIDField;
  }
  public set BackgroundRateDenaminatorUOMOID(value: number) {
    if (!(this.BackgroundRateDenaminatorUOMOIDField === value)) {
      this.BackgroundRateDenaminatorUOMOIDField = value;
      //  this.RaisePropertyChanged("BackgroundRateDenaminatorUOMOID");
    }
  }
  // [System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue=false, Order=3)]
  public get TopUpDose(): string {
    return this.TopUpDoseField;
  }
  public set TopUpDose(value: string) {
    if ((this.referenceEquals(this.TopUpDoseField, value))) {
      this.TopUpDoseField = value;
      // this.RaisePropertyChanged("TopUpDose");
    }
  }

  //  [System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue=false, Order=4)]
  public get TopUpDoseUOM(): UOM {
    return this.TopUpDoseUOMField;
  }
  public set TopUpDoseUOM(value: UOM) {
    if ((this.referenceEquals(this.TopUpDoseUOMField, value))) {
      this.TopUpDoseUOMField = value;
      // this.RaisePropertyChanged("TopUpDoseUOM");
    }
  }
  //[System.Runtime.Serialization.DataMemberAttribute(IsRequired=true, Order=5)]
  public get LockOutPeriod(): number {
    return this.LockOutPeriodField;
  }
  public set LockOutPeriod(value: number) {
    if (!(this.LockOutPeriodField === value)) {
      this.LockOutPeriodField = value;
      // this.RaisePropertyChanged("LockOutPeriod");
    }
  }
  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue=false, Order=6)]
  public get LockOutPeriodUOM(): UOM {
    return this.LockOutPeriodUOMField;
  }
  public set LockOutPeriodUOM(value: UOM) {
    if ((this.referenceEquals(this.LockOutPeriodUOMField, value))) {
      this.LockOutPeriodUOMField = value;
      // this.RaisePropertyChanged("LockOutPeriodUOM");
    }
  }

  // [System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue=false, Order=7)]
  public get BackgroundRateDenaminatorUOM(): UOM {
    return this.BackgroundRateDenaminatorUOMField;
  }
  public set BackgroundRateDenaminatorUOM(value: UOM) {
    if ((this.referenceEquals(this.BackgroundRateDenaminatorUOMField, value))) {
      this.BackgroundRateDenaminatorUOMField = value;
      //   this.RaisePropertyChanged("BackgroundRateDenaminatorUOM");
    }
  }

  // [System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue=false, Order=8)]
  public get MonitorPeriod(): string {
    return this.MonitorPeriodField;
  }
  public set MonitorPeriod(value: string) {
    if ((this.referenceEquals(this.MonitorPeriodField, value))) {
      this.MonitorPeriodField = value;
      // this.RaisePropertyChanged("MonitorPeriod");
    }
  }
  //  [System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue=false, Order=9)]
  public get MonitorPeriodUOM(): UOM {
    return this.MonitorPeriodUOMField;
  }
  public set MonitorPeriodUOM(value: UOM) {
    if ((this.referenceEquals(this.MonitorPeriodUOMField, value))) {
      this.MonitorPeriodUOMField = value;
      //  this.RaisePropertyChanged("MonitorPeriodUOM");
    }
  }

  // [System.Runtime.Serialization.DataMemberAttribute(IsRequired=true, Order=10)]
  public get MonitoringPeriodAlertDTTM(): Date {
    return this.MonitoringPeriodAlertDTTMField;
  }
  public set MonitoringPeriodAlertDTTM(value: Date) {
    if (!(this.MonitoringPeriodAlertDTTMField === value)) {
      this.MonitoringPeriodAlertDTTMField = value;
      // this.RaisePropertyChanged("MonitoringPeriodAlertDTTM");
    }
  }
  // [System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue=false, Order=11)]
  public get BoosterDose(): string {
    return this.BoosterDoseField;
  }
  public set BoosterDose(value: string) {
    if ((this.referenceEquals(this.BoosterDoseField, value))) {
      this.BoosterDoseField = value;
      // this.RaisePropertyChanged("BoosterDose");
    }
  }
  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue=false, Order=12)]
  public get BoosterDoseUOM(): UOM {
    return this.BoosterDoseUOMField;
  }
  public set BoosterDoseUOM(value: UOM) {
    if ((this.referenceEquals(this.BoosterDoseUOMField, value))) {
      this.BoosterDoseUOMField = value;
      // this.RaisePropertyChanged("BoosterDoseUOM");
    }
  }

}
export class ObjectInfo extends CLZOObject {
  private OIDField = 0;
  private NameField = '';
  private CodeField = '';
  private RoleProfileOIDField = 0;
  //[System.Runtime.Serialization.DataMemberAttribute(IsRequired=true)]
  public get OID(): number {
    return this.OIDField;
  }
  public set OID(value: number) {
    if (!(this.OIDField === value)) {
      this.OIDField = value;
      // this.RaisePropertyChanged("OID");
    }
  }
  // [System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue=false, Order=1)]
  public get Name(): string {
    return this.NameField;
  }
  public set Name(value: string) {
    if ((this.referenceEquals(this.NameField, value))) {
      this.NameField = value;
      //  this.RaisePropertyChanged("Name");
    }
  }

  // [System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue=false, Order=2)]
  public get Code(): string {
    return this.CodeField;
  }
  public set Code(value: string) {
    if ((this.referenceEquals(this.CodeField, value))) {
      this.CodeField = value;
      // this.RaisePropertyChanged("Code");
    }
  }
  // [System.Runtime.Serialization.DataMemberAttribute(IsRequired=true, Order=3)]
  public get RoleProfileOID(): number {
    return this.RoleProfileOIDField;
  }
  public set RoleProfileOID(value: number) {
    if (!(this.RoleProfileOIDField === value)) {
      this.RoleProfileOIDField = value;
      //  this.RaisePropertyChanged("RoleProfileOID");
    }
  }

}
export class DrugPrepDetail extends CLZOObject {

  private oPresctiptionItemField: IPPMCPresctiptionItem[] = [];
  private PreparedbyField = '';
  private PreparedbyOIDField = 0;
  private PrepareddttmField: Date = new Date();
  private ModificationcommentsField = '';
  private WitnessedbyField = '';
  private WitnessedbyOIDField = 0;
  private PrescriptionItemScheduleOIDField = 0;
  private IsStrikeOutField = false;
  private MedDrugPreparationOIDField = 0;
  private MedAdminOIDField = 0;
  private IsHistoryExistsField = false;
  // [System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue=false)]
  public get oPresctiptionItem(): IPPMCPresctiptionItem[] {
    return this.oPresctiptionItemField;
  }
  public set oPresctiptionItem(value: IPPMCPresctiptionItem[]) {
    if ((this.referenceEquals(this.oPresctiptionItemField, value))) {
      this.oPresctiptionItemField = value;
      //this.RaisePropertyChanged("oPresctiptionItem");
    }
  }
  // [System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue=false, Order=1)]
  public get Preparedby(): string {
    return this.PreparedbyField;
  }
  public set Preparedby(value: string) {
    if ((this.referenceEquals(this.PreparedbyField, value))) {
      this.PreparedbyField = value;
      //  this.RaisePropertyChanged("Preparedby");
    }
  }
  // [System.Runtime.Serialization.DataMemberAttribute(IsRequired=true, Order=2)]
  public get PreparedbyOID(): number {
    return this.PreparedbyOIDField;
  }
  public set PreparedbyOID(value: number) {
    if (!(this.PreparedbyOIDField === value)) {
      this.PreparedbyOIDField = value;
      // this.RaisePropertyChanged("PreparedbyOID");
    }
  }
  // [System.Runtime.Serialization.DataMemberAttribute(IsRequired=true, Order=3)]
  public get Prepareddttm(): Date {
    return this.PrepareddttmField;
  }
  public set Prepareddttm(value: Date) {
    if (!(this.PrepareddttmField === value)) {
      this.PrepareddttmField = value;
      // this.RaisePropertyChanged("Prepareddttm");
    }
  }
  // [System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue=false, Order=4)]
  public get Modificationcomments(): string {
    return this.ModificationcommentsField;
  }
  public set Modificationcomments(value: string) {
    if ((this.referenceEquals(this.ModificationcommentsField, value))) {
      this.ModificationcommentsField = value;
      //this.RaisePropertyChanged("Modificationcomments");
    }
  }
  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue=false, Order=5)]
  public get Witnessedby(): string {
    return this.WitnessedbyField;
  }
  public set Witnessedby(value: string) {
    if ((this.referenceEquals(this.WitnessedbyField, value))) {
      this.WitnessedbyField = value;
      // this.RaisePropertyChanged("Witnessedby");
    }
  }

  //  [System.Runtime.Serialization.DataMemberAttribute(IsRequired=true, Order=6)]
  public get WitnessedbyOID(): number {
    return this.WitnessedbyOIDField;
  }
  public set WitnessedbyOID(value: number) {
    if (!(this.WitnessedbyOIDField === value)) {
      this.WitnessedbyOIDField = value;
      //  this.RaisePropertyChanged("WitnessedbyOID");
    }
  }
  //  [System.Runtime.Serialization.DataMemberAttribute(IsRequired=true, Order=7)]
  public get PrescriptionItemScheduleOID(): number {
    return this.PrescriptionItemScheduleOIDField;
  }
  public set PrescriptionItemScheduleOID(value: number) {
    if (!(this.PrescriptionItemScheduleOIDField === value)) {
      this.PrescriptionItemScheduleOIDField = value;
      // this.RaisePropertyChanged("PrescriptionItemScheduleOID");
    }
  }
  // [System.Runtime.Serialization.DataMemberAttribute(IsRequired=true, Order=8)]
  public get IsStrikeOut(): boolean {

    return this.IsStrikeOutField;
  }
  public set IsStrikeOut(value: boolean) {
    if (!(this.IsStrikeOutField === value)) {
      this.IsStrikeOutField = value;
      // this.RaisePropertyChanged("IsStrikeOut");
    }
  }

  //  [System.Runtime.Serialization.DataMemberAttribute(IsRequired=true, Order=9)]
  public get MedDrugPreparationOID(): number {
    return this.MedDrugPreparationOIDField;
  }
  public set MedDrugPreparationOID(value: number) {
    if (!(this.MedDrugPreparationOIDField === value)) {
      this.MedDrugPreparationOIDField = value;
      // this.RaisePropertyChanged("MedDrugPreparationOID");
    }
  }

  //  [System.Runtime.Serialization.DataMemberAttribute(IsRequired=true, Order=10)]
  public get MedAdminOID(): number {
    return this.MedAdminOIDField;
  }
  public set MedAdminOID(value: number) {
    if (!(this.MedAdminOIDField === value)) {
      this.MedAdminOIDField = value;
      //  this.RaisePropertyChanged("MedAdminOID");
    }
  }

  //[System.Runtime.Serialization.DataMemberAttribute(IsRequired=true, Order=11)]
  public get IsHistoryExists(): boolean {

    return this.IsHistoryExistsField;
  }
  public set IsHistoryExists(value: boolean) {
    if (!(this.IsHistoryExistsField === value)) {
      this.IsHistoryExistsField = value;
      //  this.RaisePropertyChanged("IsHistoryExists");
    }
  }

}
export class TransactionItemPackDetail extends CLZOObject {

  private IdentifyingTypeField = '';
  private IdentifyingTypeOIDField = 0;
  private QuantityField = '';
  private BatchNoField = '';
  private ExpiryDateField: Date = new Date();
  private OIDField = 0;
  private SelectedQuantityField = '';
  private UOMField = '';
  // [System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue=false)]
  public get IdentifyingType(): string {
    return this.IdentifyingTypeField;
  }
  public set IdentifyingType(value: string) {
    if ((this.referenceEquals(this.IdentifyingTypeField, value))) {
      this.IdentifyingTypeField = value;
      //this.RaisePropertyChanged("IdentifyingType");
    }
  }
  //[System.Runtime.Serialization.DataMemberAttribute(IsRequired=true)]
  public get IdentifyingTypeOID(): number {
    return this.IdentifyingTypeOIDField;
  }
  public set IdentifyingTypeOID(value: number) {
    if (!(this.IdentifyingTypeOIDField === value)) {
      this.IdentifyingTypeOIDField = value;
      // this.RaisePropertyChanged("IdentifyingTypeOID");
    }
  }

  // [System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue=false)]
  public get Quantity(): string {
    return this.QuantityField;
  }
  public set Quantity(value: string) {
    if ((this.referenceEquals(this.QuantityField, value))) {
      this.QuantityField = value;
      //  this.RaisePropertyChanged("Quantity");
    }
  }

  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue=false, Order=3)]
  public get BatchNo(): string {
    return this.BatchNoField;
  }
  public set BatchNo(value: string) {
    if ((this.referenceEquals(this.BatchNoField, value))) {
      this.BatchNoField = value;
      //this.RaisePropertyChanged("BatchNo");
    }
  }
  // [System.Runtime.Serialization.DataMemberAttribute(IsRequired=true, Order=4)]
  public get ExpiryDate(): Date {
    return this.ExpiryDateField;
  }
  public set ExpiryDate(value: Date) {
    if (!(this.ExpiryDateField === value)) {
      this.ExpiryDateField = value;
      //this.RaisePropertyChanged("ExpiryDate");
    }
  }
  // [System.Runtime.Serialization.DataMemberAttribute(IsRequired=true, Order=5)]
  public get OID(): number {
    return this.OIDField;
  }
  public set OID(value: number) {
    if (!(this.OIDField === value)) {
      this.OIDField = value;
      // this.RaisePropertyChanged("OID");
    }
  }
  // [System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue=false, Order=6)]
  public get SelectedQuantity(): string {
    return this.SelectedQuantityField;
  }
  public set SelectedQuantity(value: string) {
    if ((this.referenceEquals(this.SelectedQuantityField, value))) {
      this.SelectedQuantityField = value;
      // this.RaisePropertyChanged("SelectedQuantity");
    }
  }

  // [System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue=false, Order=7)]
  public get UOM(): string {

    return this.UOMField;
  }
  public set UOM(value: string) {
    if ((this.referenceEquals(this.UOMField, value))) {
      this.UOMField = value;
      // this.RaisePropertyChanged("UOM");
    }
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
  private PrescribableItemListOIDField = 0;
  private UniqueMCRowIDField = 0;
  private ConflictsExistField = '';
  private OIDField = 0;
  private ActionCodeField = '';
  private QuantityUOMsField: ObjectInfo = new ObjectInfo();
  private NonformularyreasonField = '';
  private OtherNonformularyreasonField = '';
  private QuantityUomcolField = '';
  private MCQuantityField: Quantity[] = [];
  private DisplacementVolumeField = '';
  private DisplacementVolumeUOMField = '';
  private DisplacementVolumeUOMOIDField = 0;
  private BatchNumberField = '';
  private ExpiryDttmField: Date = new Date();
  private oDrugPrepHistoryDataField: DrugPrepHistoryData[] = [];
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
  private OtherDispensingInstructionField: string = '';
  private PrepStatusCodeField = '';
  private IsWardStockField = false;
  private IsSupplyRequestedField = '';
  private RequisitionCACodeField = '';
  private TechValidateDetailsField: TechnicalValidationInfo[] = [];
  private IsControlledDrugField = '';
  private DrugPropertiesField = '';
  //[System.Runtime.Serialization.DataMemberAttribute(IsRequired=true)]
  public get PrescriptionItemOID(): number {
    return this.PrescriptionItemOIDField;
  }
  public set PrescriptionItemOID(value: number) {
    if (!(this.PrescriptionItemOIDField === value)) {
      this.PrescriptionItemOIDField = value;
      //  this.RaisePropertyChanged("PrescriptionItemOID");
    }
  }

  // [System.Runtime.Serialization.DataMemberAttribute(IsRequired=true, Order=1)]
  public get IdentifyingOID(): number {
    return this.IdentifyingOIDField;
  }
  public set IdentifyingOID(value: number) {
    if (!(this.IdentifyingOIDField === value)) {
      this.IdentifyingOIDField = value;
      //this.RaisePropertyChanged("IdentifyingOID");
    }
  }
  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue=false, Order=2)]
  public get IdentifyingType(): string {
    return this.IdentifyingTypeField;
  }
  public set IdentifyingType(value: string) {
    if ((this.referenceEquals(this.IdentifyingTypeField, value))) {
      this.IdentifyingTypeField = value;
      //  this.RaisePropertyChanged("IdentifyingType");
    }
  }
  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue=false, Order=3)]
  public get ComponentName(): string {
    return this.ComponentNameField;
  }
  public set ComponentName(value: string) {
    if ((this.referenceEquals(this.ComponentNameField, value))) {
      this.ComponentNameField = value;
      //this.RaisePropertyChanged("ComponentName");
    }
  }

  // [System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue=false, Order=4)]
  public get Quantity(): string {
    return this.QuantityField;
  }
  public set Quantity(value: string) {
    if ((this.referenceEquals(this.QuantityField, value))) {
      this.QuantityField = value;
      //this.RaisePropertyChanged("Quantity");
    }
  }
  // [System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue=false, Order=5)]
  public get QuantityUOM(): string {
    return this.QuantityUOMField;
  }
  public set QuantityUOM(value: string) {
    if ((this.referenceEquals(this.QuantityUOMField, value))) {
      this.QuantityUOMField = value;
      //this.RaisePropertyChanged("QuantityUOM");
    }
  }
  // [System.Runtime.Serialization.DataMemberAttribute(IsRequired=true, Order=6)]
  public get QuantityUOMOID(): number {
    return this.QuantityUOMOIDField;
  }
  public set QuantityUOMOID(value: number) {
    if (!(this.QuantityUOMOIDField === value)) {
      this.QuantityUOMOIDField = value;
      // this.RaisePropertyChanged("QuantityUOMOID");
    }
  }

  //[System.Runtime.Serialization.DataMemberAttribute(IsRequired=true, Order=7)]
  public get IsUpto(): boolean {
    return this.IsUptoField;
  }
  public set IsUpto(value: boolean) {
    if (!(this.IsUptoField === value)) {
      this.IsUptoField = value;
      // this.RaisePropertyChanged("IsUpto");
    }
  }
  // [System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue=false, Order=8)]
  public get LorenzoID(): string {
    return this.LorenzoIDField;
  }
  public set LorenzoID(value: string) {
    if ((this.referenceEquals(this.LorenzoIDField, value))) {
      this.LorenzoIDField = value;
      // this.RaisePropertyChanged("LorenzoID");
    }
  }
  // [System.Runtime.Serialization.DataMemberAttribute(IsRequired=true, Order=9)]
  public get IsNonFormulary(): boolean {
    return this.IsNonFormularyField;
  }
  public set IsNonFormulary(value: boolean) {
    if (!(this.IsNonFormularyField === value)) {
      this.IsNonFormularyField = value;
      // this.RaisePropertyChanged("IsNonFormulary");
    }
  }
  //  [System.Runtime.Serialization.DataMemberAttribute(IsRequired=true, Order=10)]
  public get DisplayOrder(): number {
    return this.DisplayOrderField;
  }
  public set DisplayOrder(value: number) {
    if (!(this.DisplayOrderField === value)) {
      this.DisplayOrderField = value;
      //  this.RaisePropertyChanged("DisplayOrder");
    }
  }
  //  [System.Runtime.Serialization.DataMemberAttribute(IsRequired=true, Order=11)]
  public get isEditable(): boolean {
    return this.isEditableField;
  }
  public set isEditable(value: boolean) {
    if (!(this.isEditableField === value)) {
      this.isEditableField = value;
      // this.RaisePropertyChanged("isEditable");
    }
  }
  // [System.Runtime.Serialization.DataMemberAttribute(IsRequired=true, Order=12)]
  public get PrescribableItemListOID(): number {
    return this.PrescribableItemListOIDField;
  }
  public set PrescribableItemListOID(value: number) {
    if (!(this.PrescribableItemListOIDField === value)) {
      this.PrescribableItemListOIDField = value;
      //  this.RaisePropertyChanged("PrescribableItemListOID");
    }
  }

  // [System.Runtime.Serialization.DataMemberAttribute(IsRequired=true, Order=13)]
  public get UniqueMCRowID(): number {
    return this.UniqueMCRowIDField;
  }
  public set UniqueMCRowID(value: number) {
    if (!(this.UniqueMCRowIDField === value)) {
      this.UniqueMCRowIDField = value;
      //  this.RaisePropertyChanged("UniqueMCRowID");
    }
  }

  // [System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue=false, Order=14)]
  public get ConflictsExist(): string {
    return this.ConflictsExistField;
  }
  public set ConflictsExist(value: string) {
    if ((this.referenceEquals(this.ConflictsExistField, value))) {
      this.ConflictsExistField = value;
      //  this.RaisePropertyChanged("ConflictsExist");
    }
  }

  // [System.Runtime.Serialization.DataMemberAttribute(IsRequired=true, Order=15)]
  public get OID(): number {
    return this.OIDField;
  }
  public set OID(value: number) {
    if (!(this.OIDField === value)) {
      this.OIDField = value;
      // this.RaisePropertyChanged("OID");
    }
  }

  //  [System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue=false, Order=16)]
  public get ActionCode(): string {
    return this.ActionCodeField;
  }
  public set ActionCode(value: string) {
    if ((this.referenceEquals(this.ActionCodeField, value))) {
      this.ActionCodeField = value;
      //this.RaisePropertyChanged("ActionCode");
    }
  }

  // [System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue=false, Order=17)]
  public get QuantityUOMs(): ObjectInfo {

    return this.QuantityUOMsField;
  }
  public set QuantityUOMs(value: ObjectInfo) {
    if ((this.referenceEquals(this.QuantityUOMsField, value))) {
      this.QuantityUOMsField = value;
      //  this.RaisePropertyChanged("QuantityUOMs");
    }
  }
  // [System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue=false, Order=18)]
  public get Nonformularyreason(): string {
    return this.NonformularyreasonField;
  }
  public set Nonformularyreason(value: string) {
    if ((this.referenceEquals(this.NonformularyreasonField, value))) {
      this.NonformularyreasonField = value;
      // this.RaisePropertyChanged("Nonformularyreason");
    }
  }

  // [System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue=false, Order=19)]
  public get OtherNonformularyreason(): string {
    return this.OtherNonformularyreasonField;
  }
  public set OtherNonformularyreason(value: string) {
    if ((this.referenceEquals(this.OtherNonformularyreasonField, value))) {
      this.OtherNonformularyreasonField = value;
      //   this.RaisePropertyChanged("OtherNonformularyreason");
    }
  }
  // [System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue=false, Order=20)]
  public get QuantityUomcol(): string {
    return this.QuantityUomcolField;
  }
  public set QuantityUomcol(value: string) {
    if ((this.referenceEquals(this.QuantityUomcolField, value))) {
      this.QuantityUomcolField = value;
      //this.RaisePropertyChanged("QuantityUomcol");
    }
  }
  //  [System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue=false, Order=21)]
  public get MCQuantity(): Quantity[] {
    return this.MCQuantityField;
  }
  public set MCQuantity(value: Quantity[]) {
    if ((this.referenceEquals(this.MCQuantityField, value))) {
      this.MCQuantityField = value;
      //   this.RaisePropertyChanged("MCQuantity");
    }
  }
  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue=false, Order=22)]
  public get DisplacementVolume(): string {
    return this.DisplacementVolumeField;
  }
  public set DisplacementVolume(value: string) {
    if ((this.referenceEquals(this.DisplacementVolumeField, value))) {
      this.DisplacementVolumeField = value;
      //  this.RaisePropertyChanged("DisplacementVolume");
    }
  }

  // [System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue=false, Order=23)]
  public get DisplacementVolumeUOM(): string {

    return this.DisplacementVolumeUOMField;
  }
  public set DisplacementVolumeUOM(value: string) {
    if ((this.referenceEquals(this.DisplacementVolumeUOMField, value))) {
      this.DisplacementVolumeUOMField = value;
      //   this.RaisePropertyChanged("DisplacementVolumeUOM");
    }
  }
  // [System.Runtime.Serialization.DataMemberAttribute(IsRequired=true, Order=24)]
  public get DisplacementVolumeUOMOID(): number {
    return this.DisplacementVolumeUOMOIDField;
  }
  public set DisplacementVolumeUOMOID(value: number) {
    if ((this.DisplacementVolumeUOMOIDField === value)) {
      this.DisplacementVolumeUOMOIDField = value;
      // this.RaisePropertyChanged("DisplacementVolumeUOMOID");
    }
  }
  //  [System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue=false, Order=25)]
  public get BatchNumber(): string {
    return this.BatchNumberField;
  }
  public set BatchNumber(value: string) {
    if ((this.referenceEquals(this.BatchNumberField, value))) {
      this.BatchNumberField = value;
      //  this.RaisePropertyChanged("BatchNumber");
    }
  }
  // [System.Runtime.Serialization.DataMemberAttribute(IsRequired=true, Order=26)]
  public get ExpiryDttm(): Date {
    return this.ExpiryDttmField;
  }
  public set ExpiryDttm(value: Date) {
    if (!(this.ExpiryDttmField === value)) {
      this.ExpiryDttmField = value;
      //  this.RaisePropertyChanged("ExpiryDttm");
    }
  }
  // [System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue=false, Order=27)]
  public get oDrugPrepHistoryData(): DrugPrepHistoryData[] {
    return this.oDrugPrepHistoryDataField;
  }
  public set oDrugPrepHistoryData(value: DrugPrepHistoryData[]) {
    if ((this.referenceEquals(this.oDrugPrepHistoryDataField, value))) {
      this.oDrugPrepHistoryDataField = value;
      //  this.RaisePropertyChanged("oDrugPrepHistoryData");
    }
  }
  // [System.Runtime.Serialization.DataMemberAttribute(IsRequired=true, Order=28)]
  public get IsInfusionFluid(): boolean {
    return this.IsInfusionFluidField;
  }
  public set IsInfusionFluid(value: boolean) {
    if (!(this.IsInfusionFluidField === value)) {
      this.IsInfusionFluidField = value;
      //  this.RaisePropertyChanged("IsInfusionFluid");
    }
  }
  // [System.Runtime.Serialization.DataMemberAttribute(IsRequired=true, Order=29)]
  public get CompIdentifyingOID(): number {
    return this.CompIdentifyingOIDField;
  }
  public set CompIdentifyingOID(value: number) {
    if (!(this.CompIdentifyingOIDField === value)) {
      this.CompIdentifyingOIDField = value;
      //  this.RaisePropertyChanged("CompIdentifyingOID");
    }
  }
  // [System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue=false, Order=30)]
  public get CompIdentifyingType(): string {
    return this.CompIdentifyingTypeField;
  }
  public set CompIdentifyingType(value: string) {
    if ((this.referenceEquals(this.CompIdentifyingTypeField, value))) {
      this.CompIdentifyingTypeField = value;
      // this.RaisePropertyChanged("CompIdentifyingType");
    }
  }

  //  [System.Runtime.Serialization.DataMemberAttribute(IsRequired=true, Order=31)]
  public get MedDrugPreparationdetailOID(): number {
    return this.MedDrugPreparationdetailOIDField;
  }
  public set MedDrugPreparationdetailOID(value: number) {
    if (!(this.MedDrugPreparationdetailOIDField === value)) {
      this.MedDrugPreparationdetailOIDField = value;
      // this.RaisePropertyChanged("MedDrugPreparationdetailOID");
    }
  }
  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue=false, Order=32)]
  public get QuantityUOMLZID(): string {
    return this.QuantityUOMLZIDField;
  }
  public set QuantityUOMLZID(value: string) {
    if ((this.referenceEquals(this.QuantityUOMLZIDField, value))) {
      this.QuantityUOMLZIDField = value;
      //  this.RaisePropertyChanged("QuantityUOMLZID");
    }
  }
  // [System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue=false, Order=33)]
  public get AdminMethod(): string {
    return this.AdminMethodField;
  }
  public set AdminMethod(value: string) {
    if ((this.referenceEquals(this.AdminMethodField, value))) {
      this.AdminMethodField = value;
      // this.RaisePropertyChanged("AdminMethod");
    }
  }
  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue=false, Order=34)]
  public get MCVersion(): string {
    return this.MCVersionField;
  }
  public set MCVersion(value: string) {
    if ((this.referenceEquals(this.MCVersionField, value))) {
      this.MCVersionField = value;
      //   this.RaisePropertyChanged("MCVersion");
    }
  }

  // [System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue=false, Order=35)]
  public get IdentifyingName(): string {
    return this.IdentifyingNameField;
  }
  public set IdentifyingName(value: string) {
    if ((this.referenceEquals(this.IdentifyingNameField, value))) {
      this.IdentifyingNameField = value;
      // this.RaisePropertyChanged("IdentifyingName");
    }
  }

  // [System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue=false, Order=36)]
  public get PresItemLorenzoID(): string {
    return this.PresItemLorenzoIDField;
  }
  public set PresItemLorenzoID(value: string) {
    if ((this.referenceEquals(this.PresItemLorenzoIDField, value))) {
      this.PresItemLorenzoIDField = value;
      // this.RaisePropertyChanged("PresItemLorenzoID");
    }
  }
  //  [System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue=false, Order=37)]
  public get MCDoseUOMDeActivated(): string {
    return this.MCDoseUOMDeActivatedField;
  }
  public set MCDoseUOMDeActivated(value: string) {
    if ((this.referenceEquals(this.MCDoseUOMDeActivatedField, value))) {
      this.MCDoseUOMDeActivatedField = value;
      // this.RaisePropertyChanged("MCDoseUOMDeActivated");
    }
  }
  // [System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue=false, Order=38)]
  public get DispenseInstructionCode(): string {
    return this.DispenseInstructionCodeField;
  }
  public set DispenseInstructionCode(value: string) {
    if ((this.referenceEquals(this.DispenseInstructionCodeField, value))) {
      this.DispenseInstructionCodeField = value;
      //    this.RaisePropertyChanged("DispenseInstructionCode");
    }
  }
  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue=false, Order=39)]
  public get SupplyInstructionCode(): string {
    return this.SupplyInstructionCodeField;
  }
  public set SupplyInstructionCode(value: string) {
    if ((this.referenceEquals(this.SupplyInstructionCodeField, value))) {
      this.SupplyInstructionCodeField = value;
      //this.RaisePropertyChanged("SupplyInstructionCode");
    }
  }
  // [System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue=false, Order=40)]
  public get SupplyInstruction(): ObjectInfo[] {
    return this.SupplyInstructionField;
  }
  public set SupplyInstruction(value: ObjectInfo[]) {
    if ((this.referenceEquals(this.SupplyInstructionField, value))) {
      this.SupplyInstructionField = value;
      // this.RaisePropertyChanged("SupplyInstruction");
    }
  }
  // [System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue=false, Order=41)]
  public get DispensingInstruction(): ObjectInfo[] {
    return this.DispensingInstructionField;
  }
  public set DispensingInstruction(value: ObjectInfo[]) {
    if ((this.referenceEquals(this.DispensingInstructionField, value))) {
      this.DispensingInstructionField = value;
      //   this.RaisePropertyChanged("DispensingInstruction");
    }
  }

  // [System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue=false, Order=42)]
  public get OtherDispensingInstruction(): string {
    return this.OtherDispensingInstructionField;
  }
  public set OtherDispensingInstruction(value: string) {
    if ((this.referenceEquals(this.OtherDispensingInstructionField, value))) {
      this.OtherDispensingInstructionField = value;
      // this.RaisePropertyChanged("OtherDispensingInstruction");
    }
  }
  //  [System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue=false, Order=43)]
  public get PrepStatusCode(): string {
    return this.PrepStatusCodeField;
  }
  public set PrepStatusCode(value: string) {
    if ((this.referenceEquals(this.PrepStatusCodeField, value))) {
      this.PrepStatusCodeField = value;
      // this.RaisePropertyChanged("PrepStatusCode");
    }
  }
  // [System.Runtime.Serialization.DataMemberAttribute(IsRequired=true, Order=44)]
  public get IsWardStock(): boolean {
    return this.IsWardStockField;
  }
  public set IsWardStock(value: boolean) {
    if (!(this.IsWardStockField === value)) {
      this.IsWardStockField = value;
      //this.RaisePropertyChanged("IsWardStock");
    }
  }
  // [System.Runtime.Serialization.DataMemberAttribute(IsRequired=true, Order=45)]
  public get IsSupplyRequested(): string {
    return this.IsSupplyRequestedField;
  }
  public set IsSupplyRequested(value: string) {
    if (!(this.IsSupplyRequestedField === value)) {
      this.IsSupplyRequestedField = value;
      // this.RaisePropertyChanged("IsSupplyRequested");
    }
  }
  //  [System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue=false, Order=46)]
  public get RequisitionCACode(): string {
    return this.RequisitionCACodeField;
  }
  public set RequisitionCACode(value: string) {
    if ((this.referenceEquals(this.RequisitionCACodeField, value))) {
      this.RequisitionCACodeField = value;
      //this.RaisePropertyChanged("RequisitionCACode");
    }
  }

  // [System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue=false, Order=47)]
  public get TechValidateDetails(): TechnicalValidationInfo[] {
    return this.TechValidateDetailsField;
  }
  public set TechValidateDetails(value: TechnicalValidationInfo[]) {
    if ((this.referenceEquals(this.TechValidateDetailsField, value))) {
      this.TechValidateDetailsField = value;
      // this.RaisePropertyChanged("TechValidateDetails");
    }
  }
  // [System.Runtime.Serialization.DataMemberAttribute(IsRequired=true, Order=48)]
  public get IsControlledDrug(): string {
    return this.IsControlledDrugField;
  }
  public set IsControlledDrug(value: string) {
    if (!(this.IsControlledDrugField === value)) {
      this.IsControlledDrugField = value;
      // this.RaisePropertyChanged("IsControlledDrug");
    }
  }
  // [System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue=false, Order=49)]
  public get DrugProperties(): string {
    return this.DrugPropertiesField;
  }
  public set DrugProperties(value: string) {
    if ((this.referenceEquals(this.DrugPropertiesField, value))) {
      this.DrugPropertiesField = value;
      //  this.RaisePropertyChanged("DrugProperties");
    }
  }

}
export class Quantity extends CLZOObject {

  //Quantity value will store decimal values
  private QuantityValueField = '';
  private QuantityUOMIdField = 0;
  private QuantityUOMNameField = '';
  //[System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue = false)]
  public get QuantityValue(): string {
    return this.QuantityValueField;
  }
  public set QuantityValue(value: string) {
    if ((this.referenceEquals(this.QuantityValueField, value))) {
      this.QuantityValueField = value;
      //  this.RaisePropertyChanged("QuantityValue");
    }

  }

  //  [System.Runtime.Serialization.DataMemberAttribute(IsRequired=true, Order=1)]
  public get QuantityUOMId(): number {
    return this.QuantityUOMIdField;
  }
  public set QuantityUOMId(value: number) {
    if (!(this.QuantityUOMIdField === value)) {
      this.QuantityUOMIdField = value;
      // this.RaisePropertyChanged("QuantityUOMId");
    }
  }

  // [System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue=false, Order=2)]
  public get QuantityUOMName(): string {
    return this.QuantityUOMNameField;
  }
  public set QuantityUOMName(value: string) {
    if ((this.referenceEquals(this.QuantityUOMNameField, value))) {
      this.QuantityUOMNameField = value;
      // this.RaisePropertyChanged("QuantityUOMName");
    }
  }

}
export class DoseSchedule extends CLZOObject {

  private ScheduledDTTMField: Date = new Date();
  private DoseField = '';
  private DoseUOMField = '';
  private PrescriptionItemScheduleOIDField = 0;
  private DoseUOMOIDField = 0;
  private PrescriptionItemOIDField = 0;
  private PatientOIDField = 0;
  private MedChartOIDField = 0;
  // [System.Runtime.Serialization.DataMemberAttribute(IsRequired=true)]
  public get ScheduledDTTM(): Date {
    return this.ScheduledDTTMField;
  }
  public set ScheduledDTTM(value: Date) {
    if (!(this.ScheduledDTTMField === value)) {
      this.ScheduledDTTMField = value;
      //this.RaisePropertyChanged("ScheduledDTTM");
    }
  }
  //  [System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue=false, Order=1)]
  public get Dose(): string {
    return this.DoseField;
  }
  public set Dose(value: string) {
    if ((this.referenceEquals(this.DoseField, value))) {
      this.DoseField = value;
      // this.RaisePropertyChanged("Dose");
    }
  }
  // [System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue=false, Order=2)]
  public get DoseUOM(): string {
    return this.DoseUOMField;
  }
  public set DoseUOM(value: string) {
    if ((this.referenceEquals(this.DoseUOMField, value))) {
      this.DoseUOMField = value;
      //  this.RaisePropertyChanged("DoseUOM");
    }
  }
  // [System.Runtime.Serialization.DataMemberAttribute(IsRequired=true, Order=3)]
  public get PrescriptionItemScheduleOID(): number {
    return this.PrescriptionItemScheduleOIDField;
  }
  public set PrescriptionItemScheduleOID(value: number) {
    if (!(this.PrescriptionItemScheduleOIDField === value)) {
      this.PrescriptionItemScheduleOIDField = value;
      //  this.RaisePropertyChanged("PrescriptionItemScheduleOID");
    }
  }
  // [System.Runtime.Serialization.DataMemberAttribute(IsRequired=true, Order=4)]
  public get DoseUOMOID(): number {
    return this.DoseUOMOIDField;
  }
  public set DoseUOMOID(value: number) {
    if (!(this.DoseUOMOIDField === value)) {
      this.DoseUOMOIDField = value;
      // this.RaisePropertyChanged("DoseUOMOID");
    }
  }
  // [System.Runtime.Serialization.DataMemberAttribute(IsRequired=true, Order=5)]
  public get PrescriptionItemOID(): number {
    return this.PrescriptionItemOIDField;
  }
  public set PrescriptionItemOID(value: number) {
    if (!(this.PrescriptionItemOIDField === value)) {
      this.PrescriptionItemOIDField = value;
      // this.RaisePropertyChanged("PrescriptionItemOID");
    }
  }
  //  [System.Runtime.Serialization.DataMemberAttribute(IsRequired=true, Order=6)]
  public get PatientOID(): number {
    return this.PatientOIDField;
  }
  public set PatientOID(value: number) {
    if (!(this.PatientOIDField === value)) {
      this.PatientOIDField = value;
      // this.RaisePropertyChanged("PatientOID");
    }
  }
  // [System.Runtime.Serialization.DataMemberAttribute(IsRequired=true, Order=7)]
  public get MedChartOID(): number {
    return this.MedChartOIDField;
  }
  public set MedChartOID(value: number) {
    if (!(this.MedChartOIDField === value)) {
      this.MedChartOIDField = value;
      //this.RaisePropertyChanged("MedChartOID");
    }
  }

}
export class MeasurableObject extends CLZOObject {
  private OIDField = 0;
  private ValueField = 0;
  private UOMOIDField = 0;
  private UOMNameField = '';
  private RecordedDateField: Date = new Date();
  private UOMCodeField = '';
  //[System.Runtime.Serialization.DataMemberAttribute(IsRequired=true)]
  public get OID(): number {
    return this.OIDField;
  }
  public set OID(value: number) {
    if (!(this.OIDField === value)) {
      this.OIDField = value;
      // this.RaisePropertyChanged("OID");
    }
  }
  // [System.Runtime.Serialization.DataMemberAttribute(IsRequired=true)]
  public get Value(): number {
    return this.ValueField;
  }
  public set Value(value: number) {
    if (!(this.ValueField === value)) {
      this.ValueField = value;
      //this.RaisePropertyChanged("Value");
    }
  }

  // [System.Runtime.Serialization.DataMemberAttribute(IsRequired=true, Order=2)]
  public get UOMOID(): number {

    return this.UOMOIDField;
  }
  public set UOMOID(value: number) {
    if (!(this.UOMOIDField === value)) {
      this.UOMOIDField = value;
      // this.RaisePropertyChanged("UOMOID");
    }
  }
  //  [System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue=false, Order=3)]
  public get UOMName(): string {
    return this.UOMNameField;
  }
  public set UOMName(value: string) {
    if ((this.referenceEquals(this.UOMNameField, value))) {
      this.UOMNameField = value;
      //   this.RaisePropertyChanged("UOMName");
    }
  }

  // [System.Runtime.Serialization.DataMemberAttribute(IsRequired=true, Order=4)]
  public get RecordedDate(): Date {

    return this.RecordedDateField;
  }
  public set RecordedDate(value: Date) {
    if (!(this.RecordedDateField === value)) {
      this.RecordedDateField = value;
      //this.RaisePropertyChanged("RecordedDate");
    }
  }
  // [System.Runtime.Serialization.DataMemberAttribute(EmitDefaultValue=false, Order=5)]
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

export class AdministrationDetail extends CLZOObject {

  private MedAdminOIDField = 0;

  private LumenField = '';

  private DeliveryDeviceField = '';

  private bIsWitnessRequiredField = false;

  private AdministeredByOIDField = 0;

  private AdministeredByField = '';

  private AdministeredOnTimeModeField = '';

  private DoseDiscrepancyExistsField = 0;

  private DoseField = '';

  private DoseUOMField = '';

  private DoseUOMOIDField = 0;

  private AmendDoseUOMOIDField = '';

  private RouteField = '';

  private SelectedRouteField = '';

  private RouteOIDField = '';

  private SiteField = '';

  private SiteOIDField = '';

  private ExpiryDateField = new Date();

  private AdministeredDateField = new DateTime();

  private IsNoWitnessAvailableField = false;

  private WitnessedByOIDField = 0;

  private WitnessedByField = '';

  private AdminCommentsField = '';

  private AdminReasonCodeField = '';

  private DoseDiscReasonCodeField = '';

  private AmendReasonCodeField = '';

  private IsHistoryExistsField = false;

  private BatchNumberField = '';

  private ReasonNotGivenField = '';

  private MedicationActionField = '';

  private RecordedByField = '';

  private RecordedAtField = new Date();

  private AmendedPresOIDField = 0;

  private PresStatusCodeField = '';

  private AlreadyRequestedDetsField = '';

  private IsInsertCommentsField = 0;

  private IsInsertHistoryField = 0;

  private InfusionEndDateField = new Date();

  private IsWardStockField = false;

  private IsSupplyRequestedField = '';

  private RequisitionCACodeField = '';

  private oRequisitionHistoryDetailsField: RequisitionHistoryDetails = new RequisitionHistoryDetails();

  private oInfusionAdminDetailField: InfusionAdminDetail = new InfusionAdminDetail();

  private oUomTypeListField: UomTypeList[] = [];

  private oSiteListField: SiteList[] = [];

  private FirstBagBegunAtField = new Date();

  private LastBagEndedAtField = new Date();

  private TotalVolumeInfusedField = '';

  private TotalVolumeInfusedUOMNameField = '';

  private TotalVolumeInfusedUOMLzoIDField = '';

  private CurrentBagVolumeInfusedField = '';

  private CurrentBagVolumeInfusedUOMNameField = '';

  private PatientOIDField = 0;

  private ScheduleOIDField = 0;

  private PrescriptionItemScheduleOIDField = 0;

  private DoseUomLorenzoIDField = '';

  private StrikeoutActionField = '';

  private CDWardRegItemOIDField = 0;

  private CDPatientRegItemOIDField = 0;

  private WardCurrentStockField = '';

  private PatientCurrentStockField = '';

  private AdministeredQtyField = '';

  private WastageField = '';

  private InfusionStartDateField = new Date();

  private oAlertsInfoDetailsField: AlertsInfo = new AlertsInfo();

  private IsAlertRequiredField = false;

  private IsCanCompleteField = false;

  private INFTYCodeField = '';

  private FluidNameField = '';

  private IsInfusionField = '';

  private IsBolusField = '';

  private MedicationPastActionField = '';

  private WardStockUOMField = '';

  private PatientStockUOMField = '';

  private DoseDiscCommentsField = '';

  private PrescribedRoutesField: ObjectInfo[] = [];

  private ConcentrationStrengthField = '';

  private ConcentrationStrengthUOMField: UOM = new UOM();

  private ConcentrationVolumeField = '';

  private ConcentrationVolumeUOMField: UOM = new UOM();

  private InfusionPeriodforMedAdminField = 0;

  private InfusionPeriodUOMforMedAdminField: UOM = new UOM();

  private ConcentrationDoseUOMsField: ObjectInfo[] = [];

  private RecordOneMoreActionField = '';

  private RecordOMASequenceField = '';

  private IsConditionalExistsField = false;

  private AdminMethodField = '';

  private DosageFormOIDField = 0;

  private isAdministeredOnInfusionChartField = false;

  private LastAdministeredByField = '';

  private LastAdministeredAtField = new Date();

  private PlannedInfusionVolumeField = '';

  private PlannedInfusionVolumeUOMOIDField = 0;

  private PlannedInfusionVolumeUOMNameField = '';

  //14-day admin chart LZO-160054
  private IsAdministeredInAdvanceField = false;
  private PlannedInfusionVolumeUOMLzoIDField = '';
  //US ID 61059  - Parent/Carer not listed
  private IsPersonalCarerNotListedField = false;
  private AdminByPersonalCarerOIDField = 0;

  private AdministratorTypeField = '';
  //QC # 210406
  private _PresItemStatusModifiedAt = new Date();
  private _PresItemStatusModifiedBy = '';

  //TFS # 33886 Paracetamol warning
  private isAnyParacetamolAdministeredInGivenPeriodField = false;

  private _IsDuringHomeLeaveField = false;

  private _IsCriticalMedField = false;

  private CriticalMedsRoutesField = '';

  private CriticalMedsMsgField = '';

  private CriticalDrugSiteURLField = '';
  private IsStruckoutField = '';

  private IsMedScannedProductField = '';
  private medBarCodeOverrideDetailsField: CMedBarcodeScanOverrideDetail[] = [];
  private medProductDetailsField: MedsScanProductDetails[] = [];
  private MedAdminHistoryOIDField = 0;

  private MedScannedHistoryOIDField = 0;
  private IsMedScanExcludedField = false;
  private pGDLorenzoIDField = '';

  get MedAdminOID(): number {
    return this.MedAdminOIDField;
  }
  set MedAdminOID(value: number) {
    if ((this.MedAdminOIDField != (value))) {
      this.MedAdminOIDField = value;
      // this.RaisePropertyChanged("MedAdminOID");
    }
  }

  get Lumen(): string {
    return this.LumenField;
  }
  set Lumen(value: string) {
    if ((this.referenceEquals(this.LumenField, value))) {
      this.LumenField = value;
      // this.RaisePropertyChanged("Lumen");
    }
  }
  get DeliveryDevice(): string {
    return this.DeliveryDeviceField;
  }
  set DeliveryDevice(value: string) {
    if ((this.referenceEquals(this.DeliveryDeviceField, value))) {
      this.DeliveryDeviceField = value;
      // this.RaisePropertyChanged("DeliveryDevice");
    }
  }

  get bIsWitnessRequired(): boolean {
    return this.bIsWitnessRequiredField;
  }
  set bIsWitnessRequired(value: boolean) {
    if ((this.bIsWitnessRequiredField != (value))) {
      this.bIsWitnessRequiredField = value;
      // this.RaisePropertyChanged("bIsWitnessRequired");
    }
  }

  get PresItemStatusModifiedAt(): Date {
    return this._PresItemStatusModifiedAt;
  }
  set PresItemStatusModifiedAt(value: Date) {
    this._PresItemStatusModifiedAt = value;
    // this.RaisePropertyChanged("PresItemStatusModifiedAt");
  }

  get PresItemStatusModifiedBy(): string {
    return this._PresItemStatusModifiedBy;
  }
  set PresItemStatusModifiedBy(value: string) {
    this._PresItemStatusModifiedBy = value;
    // this.RaisePropertyChanged("PresItemStatusModifiedBy");
  }

  get IsAnyParacetamolAdministeredInGivenPeriod(): boolean {
    return this.isAnyParacetamolAdministeredInGivenPeriodField;
  }
  set IsAnyParacetamolAdministeredInGivenPeriod(value: boolean) {
    this.isAnyParacetamolAdministeredInGivenPeriodField = value;
    // this.RaisePropertyChanged("IsAnyParacetamolAdministeredInGivenPeriod");
  }

  get AdministeredByOID(): number {
    return this.AdministeredByOIDField;
  }
  set AdministeredByOID(value: number) {
    if ((this.AdministeredByOIDField != (value))) {
      this.AdministeredByOIDField = value;
      // this.RaisePropertyChanged("AdministeredByOID");
    }
  }

  get AdministeredBy(): string {
    return this.AdministeredByField;
  }
  set AdministeredBy(value: string) {
    if ((this.referenceEquals(this.AdministeredByField, value))) {
      this.AdministeredByField = value;
      // this.RaisePropertyChanged("AdministeredBy");
    }
  }

  get AdminByPersonalCarerOID(): number {
    return this.AdminByPersonalCarerOIDField;
  }
  set AdminByPersonalCarerOID(value: number) {
    if ((this.AdminByPersonalCarerOIDField != (value))) {
      this.AdminByPersonalCarerOIDField = value;
      // this.RaisePropertyChanged("AdminByPersonalCarerOID");
    }
  }

  get AdministratorType(): string {
    return this.AdministratorTypeField;
  }
  set AdministratorType(value: string) {
    this.AdministratorTypeField = value;
    // this.RaisePropertyChanged("AdministratorType");
  }

  get AdministeredOnTimeMode(): string {
    return this.AdministeredOnTimeModeField;
  }
  set AdministeredOnTimeMode(value: string) {
    if ((this.AdministeredOnTimeModeField != (value))) {
      this.AdministeredOnTimeModeField = value;
      // this.RaisePropertyChanged("AdministeredOnTimeMode");
    }
  }

  get DoseDiscrepancyExists(): number {
    return this.DoseDiscrepancyExistsField;
  }
  set DoseDiscrepancyExists(value: number) {
    if ((this.DoseDiscrepancyExistsField != (value))) {
      this.DoseDiscrepancyExistsField = value;
      // this.RaisePropertyChanged("DoseDiscrepancyExists");
    }
  }

  get Dose(): string {
    return this.DoseField;
  }
  set Dose(value: string) {
    if ((this.referenceEquals(this.DoseField, value))) {
      this.DoseField = value;
      // this.RaisePropertyChanged("Dose");
    }
  }

  get DoseUOM(): string {
    return this.DoseUOMField;
  }
  set DoseUOM(value: string) {
    if ((this.referenceEquals(this.DoseUOMField, value))) {
      this.DoseUOMField = value;
      // this.RaisePropertyChanged("DoseUOM");
    }
  }

  get DoseUOMOID(): number {
    return this.DoseUOMOIDField;
  }
  set DoseUOMOID(value: number) {
    if ((this.DoseUOMOIDField != (value))) {
      this.DoseUOMOIDField = value;
      // this.RaisePropertyChanged("DoseUOMOID");
    }
  }

  get AmendDoseUOMOID(): string {
    return this.AmendDoseUOMOIDField;
  }
  set AmendDoseUOMOID(value: string) {
    if ((this.referenceEquals(this.AmendDoseUOMOIDField, value))) {
      this.AmendDoseUOMOIDField = value;
      // this.RaisePropertyChanged("AmendDoseUOMOID");
    }
  }

  get Route(): string {
    return this.RouteField;
  }
  set Route(value: string) {
    if ((this.referenceEquals(this.RouteField, value))) {
      this.RouteField = value;
      // this.RaisePropertyChanged("Route");
    }
  }

  get SelectedRoute(): string {
    return this.SelectedRouteField;
  }
  set SelectedRoute(value: string) {
    if ((this.referenceEquals(this.SelectedRouteField, value))) {
      this.SelectedRouteField = value;
      // this.RaisePropertyChanged("SelectedRoute");
    }
  }
  get RouteOID(): string {
    return this.RouteOIDField;
  }
  set RouteOID(value: string) {
    if ((this.referenceEquals(this.RouteOIDField, value))) {
      this.RouteOIDField = value;
      // this.RaisePropertyChanged("RouteOID");
    }
  }

  get Site(): string {
    return this.SiteField;
  }
  set Site(value: string) {
    if ((this.referenceEquals(this.SiteField, value))) {
      this.SiteField = value;
      // this.RaisePropertyChanged("Site");
    }
  }

  get SiteOID(): string {
    return this.SiteOIDField;
  }
  set SiteOID(value: string) {
    if ((this.referenceEquals(this.SiteOIDField, value))) {
      this.SiteOIDField = value;
      // this.RaisePropertyChanged("SiteOID");
    }
  }

  get ExpiryDate(): Date {
    return this.ExpiryDateField;
  }
  set ExpiryDate(value: Date) {
    if ((this.ExpiryDateField != (value))) {
      this.ExpiryDateField = value;
      // this.RaisePropertyChanged("ExpiryDate");
    }
  }

  get AdministeredDate(): DateTime {
    return this.AdministeredDateField;
  }
  set AdministeredDate(value: DateTime) {
    if ((this.AdministeredDateField != (value))) {
      this.AdministeredDateField = value;
      // this.RaisePropertyChanged("AdministeredDate");
    }
  }

  get IsNoWitnessAvailable(): boolean {
    return this.IsNoWitnessAvailableField;
  }
  set IsNoWitnessAvailable(value: boolean) {
    if ((this.IsNoWitnessAvailableField != (value))) {
      this.IsNoWitnessAvailableField = value;
      // this.RaisePropertyChanged("IsNoWitnessAvailable");
    }
  }

  get WitnessedByOID(): number {
    return this.WitnessedByOIDField;
  }
  set WitnessedByOID(value: number) {
    if ((this.WitnessedByOIDField != (value))) {
      this.WitnessedByOIDField = value;
      // this.RaisePropertyChanged("WitnessedByOID");
    }
  }

  get WitnessedBy(): string {
    return this.WitnessedByField;
  }
  set WitnessedBy(value: string) {
    if ((this.referenceEquals(this.WitnessedByField, value))) {
      this.WitnessedByField = value;
      // this.RaisePropertyChanged("WitnessedBy");
    }
  }

  get AdminComments(): string {
    return this.AdminCommentsField;
  }
  set AdminComments(value: string) {
    if ((this.referenceEquals(this.AdminCommentsField, value))) {
      this.AdminCommentsField = value;
      // this.RaisePropertyChanged("AdminComments");
    }
  }

  get AdminReasonCode(): string {
    return this.AdminReasonCodeField;
  }
  set AdminReasonCode(value: string) {
    if ((this.referenceEquals(this.AdminReasonCodeField, value))) {
      this.AdminReasonCodeField = value;
      // this.RaisePropertyChanged("AdminReasonCode");
    }
  }

  get DoseDiscReasonCode(): string {
    return this.DoseDiscReasonCodeField;
  }
  set DoseDiscReasonCode(value: string) {
    if ((this.referenceEquals(this.DoseDiscReasonCodeField, value))) {
      this.DoseDiscReasonCodeField = value;
      // this.RaisePropertyChanged("DoseDiscReasonCode");
    }
  }

  get AmendReasonCode(): string {
    return this.AmendReasonCodeField;
  }
  set AmendReasonCode(value: string) {
    if ((this.referenceEquals(this.AmendReasonCodeField, value))) {
      this.AmendReasonCodeField = value;
      // this.RaisePropertyChanged("AmendReasonCode");
    }
  }

  get IsHistoryExists(): boolean {
    return this.IsHistoryExistsField;
  }
  set IsHistoryExists(value: boolean) {
    if ((this.IsHistoryExistsField != (value))) {
      this.IsHistoryExistsField = value;
      // this.RaisePropertyChanged("IsHistoryExists");
    }
  }

  get BatchNumber(): string {
    return this.BatchNumberField;
  }
  set BatchNumber(value: string) {
    if ((this.referenceEquals(this.BatchNumberField, value))) {
      this.BatchNumberField = value;
      // this.RaisePropertyChanged("BatchNumber");
    }
  }

  get ReasonNotGiven(): string {
    return this.ReasonNotGivenField;
  }
  set ReasonNotGiven(value: string) {
    if ((this.referenceEquals(this.ReasonNotGivenField, value))) {
      this.ReasonNotGivenField = value;
      // this.RaisePropertyChanged("ReasonNotGiven");
    }
  }

  get MedicationAction(): string {
    return this.MedicationActionField;
  }
  set MedicationAction(value: string) {
    if ((this.referenceEquals(this.MedicationActionField, value))) {
      this.MedicationActionField = value;
      // this.RaisePropertyChanged("MedicationAction");
    }
  }

  get RecordedBy(): string {
    return this.RecordedByField;
  }
  set RecordedBy(value: string) {
    if ((this.referenceEquals(this.RecordedByField, value))) {
      this.RecordedByField = value;
      // this.RaisePropertyChanged("RecordedBy");
    }
  }

  get RecordedAt(): Date {
    return this.RecordedAtField;
  }
  set RecordedAt(value: Date) {
    if ((this.RecordedAtField != (value))) {
      this.RecordedAtField = value;
      // this.RaisePropertyChanged("RecordedAt");
    }
  }

  get AmendedPresOID(): number {
    return this.AmendedPresOIDField;
  }
  set AmendedPresOID(value: number) {
    if ((this.AmendedPresOIDField != (value))) {
      this.AmendedPresOIDField = value;
      // this.RaisePropertyChanged("AmendedPresOID");
    }
  }

  get PresStatusCode(): string {
    return this.PresStatusCodeField;
  }
  set PresStatusCode(value: string) {
    if ((this.referenceEquals(this.PresStatusCodeField, value))) {
      this.PresStatusCodeField = value;
      // this.RaisePropertyChanged("PresStatusCode");
    }
  }

  get AlreadyRequestedDets(): string {
    return this.AlreadyRequestedDetsField;
  }
  set AlreadyRequestedDets(value: string) {
    if ((this.referenceEquals(this.AlreadyRequestedDetsField, value))) {
      this.AlreadyRequestedDetsField = value;
      // this.RaisePropertyChanged("AlreadyRequestedDets");
    }
  }

  get IsInsertComments(): number {
    return this.IsInsertCommentsField;
  }
  set IsInsertComments(value: number) {
    if ((this.IsInsertCommentsField != (value))) {
      this.IsInsertCommentsField = value;
      // this.RaisePropertyChanged("IsInsertComments");
    }
  }

  get IsInsertHistory(): number {
    return this.IsInsertHistoryField;
  }
  set IsInsertHistory(value: number) {
    if ((this.IsInsertHistoryField != (value))) {
      this.IsInsertHistoryField = value;
      // this.RaisePropertyChanged("IsInsertHistory");
    }
  }

  get InfusionEndDate(): Date {
    return this.InfusionEndDateField;
  }
  set InfusionEndDate(value: Date) {
    if ((this.InfusionEndDateField != (value))) {
      this.InfusionEndDateField = value;
      // this.RaisePropertyChanged("InfusionEndDate");
    }
  }

  get IsWardStock(): boolean {
    return this.IsWardStockField;
  }
  set IsWardStock(value: boolean) {
    if ((this.IsWardStockField != (value))) {
      this.IsWardStockField = value;
      // this.RaisePropertyChanged("IsWardStock");
    }
  }

  get IsSupplyRequested(): string {
    return this.IsSupplyRequestedField;
  }
  set IsSupplyRequested(value: string) {
    if ((this.IsSupplyRequestedField != (value))) {
      this.IsSupplyRequestedField = value;
      // this.RaisePropertyChanged("IsSupplyRequested");
    }
  }

  get RequisitionCACode(): string {
    return this.RequisitionCACodeField;
  }
  set RequisitionCACode(value: string) {
    if ((this.referenceEquals(this.RequisitionCACodeField, value))) {
      this.RequisitionCACodeField = value;
      // this.RaisePropertyChanged("RequisitionCACode");
    }
  }

  get oRequisitionHistoryDetails(): RequisitionHistoryDetails {
    return this.oRequisitionHistoryDetailsField;
  }
  set oRequisitionHistoryDetails(value: RequisitionHistoryDetails) {
    if ((this.referenceEquals(this.oRequisitionHistoryDetailsField, value))) {
      this.oRequisitionHistoryDetailsField = value;
      // this.RaisePropertyChanged("oRequisitionHistoryDetails");
    }
  }

  get oInfusionAdminDetail(): InfusionAdminDetail {
    return this.oInfusionAdminDetailField;
  }
  set oInfusionAdminDetail(value: InfusionAdminDetail) {
    if ((this.referenceEquals(this.oInfusionAdminDetailField, value))) {
      this.oInfusionAdminDetailField = value;
      // this.RaisePropertyChanged("oInfusionAdminDetail");
    }
  }

  get oUomTypeList(): UomTypeList[] {
    return this.oUomTypeListField;
  }
  set oUomTypeList(value: UomTypeList[]) {
    if ((this.referenceEquals(this.oUomTypeListField, value))) {
      this.oUomTypeListField = value;
      // this.RaisePropertyChanged("oUomTypeList");
    }
  }


  get oSiteList(): SiteList[] {
    return this.oSiteListField;
  }
  set oSiteList(value: SiteList[]) {
    if ((this.referenceEquals(this.oSiteListField, value))) {
      this.oSiteListField = value;
      // this.RaisePropertyChanged("oSiteList");
    }
  }

  get FirstBagBegunAt(): Date {
    return this.FirstBagBegunAtField;
  }
  set FirstBagBegunAt(value: Date) {
    if ((this.FirstBagBegunAtField != (value))) {
      this.FirstBagBegunAtField = value;
      // this.RaisePropertyChanged("FirstBagBegunAt");
    }
  }

  get LastBagEndedAt(): Date {
    return this.LastBagEndedAtField;
  }
  set LastBagEndedAt(value: Date) {
    if ((this.LastBagEndedAtField != (value))) {
      this.LastBagEndedAtField = value;
      // this.RaisePropertyChanged("LastBagEndedAt");
    }
  }

  get TotalVolumeInfused(): string {
    return this.TotalVolumeInfusedField;
  }
  set TotalVolumeInfused(value: string) {
    if ((this.referenceEquals(this.TotalVolumeInfusedField, value))) {
      this.TotalVolumeInfusedField = value;
      // this.RaisePropertyChanged("TotalVolumeInfused");
    }
  }

  get TotalVolumeInfusedUOMName(): string {
    return this.TotalVolumeInfusedUOMNameField;
  }
  set TotalVolumeInfusedUOMName(value: string) {
    if ((this.referenceEquals(this.TotalVolumeInfusedUOMNameField, value))) {
      this.TotalVolumeInfusedUOMNameField = value;
      // this.RaisePropertyChanged("TotalVolumeInfusedUOMName");
    }
  }

  get TotalVolumeInfusedUOMLzoID(): string {
    return this.TotalVolumeInfusedUOMLzoIDField;
  }
  set TotalVolumeInfusedUOMLzoID(value: string) {
    if ((this.referenceEquals(this.TotalVolumeInfusedUOMLzoIDField, value))) {
      this.TotalVolumeInfusedUOMLzoIDField = value;
      // this.RaisePropertyChanged("TotalVolumeInfusedUOMLzoID");
    }
  }

  get CurrentBagVolumeInfused(): string {
    return this.CurrentBagVolumeInfusedField;
  }
  set CurrentBagVolumeInfused(value: string) {
    if ((this.referenceEquals(this.CurrentBagVolumeInfusedField, value))) {
      this.CurrentBagVolumeInfusedField = value;
      // this.RaisePropertyChanged("CurrentBagVolumeInfused");
    }
  }

  get CurrentBagVolumeInfusedUOMName(): string {
    return this.CurrentBagVolumeInfusedUOMNameField;
  }
  set CurrentBagVolumeInfusedUOMName(value: string) {
    if ((this.referenceEquals(this.CurrentBagVolumeInfusedUOMNameField, value))) {
      this.CurrentBagVolumeInfusedUOMNameField = value;
      // this.RaisePropertyChanged("CurrentBagVolumeInfusedUOMName");
    }
  }

  get PatientOID(): number {
    return this.PatientOIDField;
  }
  set PatientOID(value: number) {
    if ((this.PatientOIDField != (value))) {
      this.PatientOIDField = value;
      // this.RaisePropertyChanged("PatientOID");
    }
  }

  get ScheduleOID(): number {
    return this.ScheduleOIDField;
  }
  set ScheduleOID(value: number) {
    if ((this.ScheduleOIDField != (value))) {
      this.ScheduleOIDField = value;
      // this.RaisePropertyChanged("ScheduleOID");
    }
  }
  get PrescriptionItemScheduleOID(): number {
    return this.PrescriptionItemScheduleOIDField;
  }
  set PrescriptionItemScheduleOID(value: number) {
    if ((this.PrescriptionItemScheduleOIDField != (value))) {
      this.PrescriptionItemScheduleOIDField = value;
      // this.RaisePropertyChanged("PrescriptionItemScheduleOID");
    }
  }

  get DoseUomLorenzoID(): string {
    return this.DoseUomLorenzoIDField;
  }
  set DoseUomLorenzoID(value: string) {
    if ((this.referenceEquals(this.DoseUomLorenzoIDField, value))) {
      this.DoseUomLorenzoIDField = value;
      // this.RaisePropertyChanged("DoseUomLorenzoID");
    }
  }

  get StrikeoutAction(): string {
    return this.StrikeoutActionField;
  }
  set StrikeoutAction(value: string) {
    if ((this.referenceEquals(this.StrikeoutActionField, value))) {
      this.StrikeoutActionField = value;
      // this.RaisePropertyChanged("StrikeoutAction");
    }
  }

  get CDWardRegItemOID(): number {
    return this.CDWardRegItemOIDField;
  }
  set CDWardRegItemOID(value: number) {
    if ((this.CDWardRegItemOIDField != (value))) {
      this.CDWardRegItemOIDField = value;
      // this.RaisePropertyChanged("CDWardRegItemOID");
    }
  }

  get CDPatientRegItemOID(): number {
    return this.CDPatientRegItemOIDField;
  }
  set CDPatientRegItemOID(value: number) {
    if ((this.CDPatientRegItemOIDField != (value))) {
      this.CDPatientRegItemOIDField = value;
      // this.RaisePropertyChanged("CDPatientRegItemOID");
    }
  }

  get WardCurrentStock(): string {
    return this.WardCurrentStockField;
  }
  set WardCurrentStock(value: string) {
    if ((this.referenceEquals(this.WardCurrentStockField, value))) {
      this.WardCurrentStockField = value;
      // this.RaisePropertyChanged("WardCurrentStock");
    }
  }

  get PatientCurrentStock(): string {
    return this.PatientCurrentStockField;
  }
  set PatientCurrentStock(value: string) {
    if ((this.referenceEquals(this.PatientCurrentStockField, value))) {
      this.PatientCurrentStockField = value;
      // this.RaisePropertyChanged("PatientCurrentStock");
    }
  }

  get AdministeredQty(): string {
    return this.AdministeredQtyField;
  }
  set AdministeredQty(value: string) {
    if ((this.referenceEquals(this.AdministeredQtyField, value))) {
      this.AdministeredQtyField = value;
      // this.RaisePropertyChanged("AdministeredQty");
    }
  }
  get Wastage(): string {
    return this.WastageField;
  }
  set Wastage(value: string) {
    if ((this.referenceEquals(this.WastageField, value))) {
      this.WastageField = value;
      // this.RaisePropertyChanged("Wastage");
    }
  }

  get InfusionStartDate(): Date {
    return this.InfusionStartDateField;
  }
  set InfusionStartDate(value: Date) {
    if ((this.InfusionStartDateField != (value))) {
      this.InfusionStartDateField = value;
      // this.RaisePropertyChanged("InfusionStartDate");
    }
  }

  get oAlertsInfoDetails(): AlertsInfo {
    return this.oAlertsInfoDetailsField;
  }
  set oAlertsInfoDetails(value: AlertsInfo) {
    if ((this.referenceEquals(this.oAlertsInfoDetailsField, value))) {
      this.oAlertsInfoDetailsField = value;
      // this.RaisePropertyChanged("oAlertsInfoDetails");
    }
  }

  get IsAlertRequired(): boolean {
    return this.IsAlertRequiredField;
  }
  set IsAlertRequired(value: boolean) {
    if ((this.IsAlertRequiredField != (value))) {
      this.IsAlertRequiredField = value;
      // this.RaisePropertyChanged("IsAlertRequired");
    }
  }

  get IsCanComplete(): boolean {
    return this.IsCanCompleteField;
  }
  set IsCanComplete(value: boolean) {
    if ((this.IsCanCompleteField != (value))) {
      this.IsCanCompleteField = value;
      // this.RaisePropertyChanged("IsCanComplete");
    }
  }

  get INFTYCode(): string {
    return this.INFTYCodeField;
  }
  set INFTYCode(value: string) {
    if ((this.referenceEquals(this.INFTYCodeField, value))) {
      this.INFTYCodeField = value;
      // this.RaisePropertyChanged("INFTYCode");
    }
  }

  get FluidName(): string {
    return this.FluidNameField;
  }
  set FluidName(value: string) {
    if ((this.referenceEquals(this.FluidNameField, value))) {
      this.FluidNameField = value;
      // this.RaisePropertyChanged("FluidName");
    }
  }
  get IsInfusion(): string {
    return this.IsInfusionField;
  }
  set IsInfusion(value: string) {
    if ((this.IsInfusionField != (value))) {
      this.IsInfusionField = value;
      // this.RaisePropertyChanged("IsInfusion");
    }
  }

  get IsBolus(): string {
    return this.IsBolusField;
  }
  set IsBolus(value: string) {
    if ((this.IsBolusField != (value))) {
      this.IsBolusField = value;
      // this.RaisePropertyChanged("IsBolus");
    }
  }

  get MedicationPastAction(): string {
    return this.MedicationPastActionField;
  }
  set MedicationPastAction(value: string) {
    if ((this.referenceEquals(this.MedicationPastActionField, value))) {
      this.MedicationPastActionField = value;
      // this.RaisePropertyChanged("MedicationPastAction");
    }
  }

  get WardStockUOM(): string {
    return this.WardStockUOMField;
  }
  set WardStockUOM(value: string) {
    if ((this.referenceEquals(this.WardStockUOMField, value))) {
      this.WardStockUOMField = value;
      // this.RaisePropertyChanged("WardStockUOM");
    }
  }

  get PatientStockUOM(): string {
    return this.PatientStockUOMField;
  }
  set PatientStockUOM(value: string) {
    if ((this.referenceEquals(this.PatientStockUOMField, value))) {
      this.PatientStockUOMField = value;
      // this.RaisePropertyChanged("PatientStockUOM");
    }
  }

  get DoseDiscComments(): string {
    return this.DoseDiscCommentsField;
  }
  set DoseDiscComments(value: string) {
    if ((this.referenceEquals(this.DoseDiscCommentsField, value))) {
      this.DoseDiscCommentsField = value;
      // this.RaisePropertyChanged("DoseDiscComments");
    }
  }

  get PrescribedRoutes(): ObjectInfo[] {
    return this.PrescribedRoutesField;
  }
  set PrescribedRoutes(value: ObjectInfo[]) {
    if ((this.referenceEquals(this.PrescribedRoutesField, value))) {
      this.PrescribedRoutesField = value;
      // this.RaisePropertyChanged("PrescribedRoutes");
    }
  }

  get ConcentrationStrength(): string {
    return this.ConcentrationStrengthField;
  }
  set ConcentrationStrength(value: string) {
    if ((this.referenceEquals(this.ConcentrationStrengthField, value))) {
      this.ConcentrationStrengthField = value;
      // this.RaisePropertyChanged("ConcentrationStrength");
    }
  }

  get ConcentrationStrengthUOM(): UOM {
    return this.ConcentrationStrengthUOMField;
  }
  set ConcentrationStrengthUOM(value: UOM) {
    if ((this.referenceEquals(this.ConcentrationStrengthUOMField, value))) {
      this.ConcentrationStrengthUOMField = value;
      // this.RaisePropertyChanged("ConcentrationStrengthUOM");
    }
  }

  get ConcentrationVolume(): string {
    return this.ConcentrationVolumeField;
  }
  set ConcentrationVolume(value: string) {
    if ((this.referenceEquals(this.ConcentrationVolumeField, value))) {
      this.ConcentrationVolumeField = value;
      // this.RaisePropertyChanged("ConcentrationVolume");
    }
  }

  get ConcentrationVolumeUOM(): UOM {
    return this.ConcentrationVolumeUOMField;
  }
  set ConcentrationVolumeUOM(value: UOM) {
    if ((this.referenceEquals(this.ConcentrationVolumeUOMField, value))) {
      this.ConcentrationVolumeUOMField = value;
      // this.RaisePropertyChanged("ConcentrationVolumeUOM");
    }
  }

  get InfusionPeriodforMedAdmin(): number {
    return this.InfusionPeriodforMedAdminField;
  }
  set InfusionPeriodforMedAdmin(value: number) {
    if ((this.InfusionPeriodforMedAdminField != (value))) {
      this.InfusionPeriodforMedAdminField = value;
      // this.RaisePropertyChanged("InfusionPeriodforMedAdmin");
    }
  }

  get InfusionPeriodUOMforMedAdmin(): UOM {
    return this.InfusionPeriodUOMforMedAdminField;
  }
  set InfusionPeriodUOMforMedAdmin(value: UOM) {
    if ((this.referenceEquals(this.InfusionPeriodUOMforMedAdminField, value))) {
      this.InfusionPeriodUOMforMedAdminField = value;
      // this.RaisePropertyChanged("InfusionPeriodUOMforMedAdmin");
    }
  }

  get ConcentrationDoseUOMs(): ObjectInfo[] {
    return this.ConcentrationDoseUOMsField;
  }
  set ConcentrationDoseUOMs(value: ObjectInfo[]) {
    if ((this.referenceEquals(this.ConcentrationDoseUOMsField, value))) {
      this.ConcentrationDoseUOMsField = value;
      // this.RaisePropertyChanged("ConcentrationDoseUOMs");
    }
  }

  get RecordOneMoreAction(): string {
    return this.RecordOneMoreActionField;
  }
  set RecordOneMoreAction(value: string) {
    if ((this.referenceEquals(this.RecordOneMoreActionField, value))) {
      this.RecordOneMoreActionField = value;
      // this.RaisePropertyChanged("RecordOneMoreAction");
    }
  }

  get RecordOMASequence(): string {
    return this.RecordOMASequenceField;
  }
  set RecordOMASequence(value: string) {
    if ((this.referenceEquals(this.RecordOMASequenceField, value))) {
      this.RecordOMASequenceField = value;
      // this.RaisePropertyChanged("RecordOMASequence");
    }
  }

  get IsConditionalExists(): boolean {
    return this.IsConditionalExistsField;
  }
  set IsConditionalExists(value: boolean) {
    if ((this.referenceEquals(this.IsConditionalExistsField, value))) {
      this.IsConditionalExistsField = value;
      // this.RaisePropertyChanged("IsConditionalExists");
    }
  }
  get AdminMethod(): string {
    return this.AdminMethodField;
  }
  set AdminMethod(value: string) {
    if ((this.referenceEquals(this.AdminMethodField, value))) {
      this.AdminMethodField = value;
      // this.RaisePropertyChanged("AdminMethod");
    }
  }

  get DosageFormOID(): number {
    return this.DosageFormOIDField;
  }
  set DosageFormOID(value: number) {
    if ((this.DosageFormOIDField != (value))) {
      this.DosageFormOIDField = value;
      // this.RaisePropertyChanged("DosageFormOID");
    }
  }

  get IsAdministeredOnInfusionChart(): boolean {
    return this.isAdministeredOnInfusionChartField;
  }
  set IsAdministeredOnInfusionChart(value: boolean) {
    if (this.isAdministeredOnInfusionChartField != (value)) {
      this.isAdministeredOnInfusionChartField = value;
      // this.RaisePropertyChanged("IsAdministeredOnInfusionChart");
    }
  }

  get LastAdministeredBy(): string {
    return this.LastAdministeredByField;
  }
  set LastAdministeredBy(value: string) {
    if ((this.referenceEquals(this.LastAdministeredByField, value))) {
      this.LastAdministeredByField = value;
      // this.RaisePropertyChanged("LastAdministeredBy");
    }
  }

  get LastAdministeredAt(): Date {
    return this.LastAdministeredAtField;
  }
  set LastAdministeredAt(value: Date) {
    if ((this.LastAdministeredAtField != (value))) {
      this.LastAdministeredAtField = value;
      // this.RaisePropertyChanged("LastAdministeredAt");
    }
  }

  get PlannedInfusionVolume(): string {
    return this.PlannedInfusionVolumeField;
  }
  set PlannedInfusionVolume(value: string) {
    this.PlannedInfusionVolumeField = value;
    // this.RaisePropertyChanged("PlannedInfusionVolume");
  }

  get PlannedInfusionVolumeUOMOID(): number {
    return this.PlannedInfusionVolumeUOMOIDField;
  }
  set PlannedInfusionVolumeUOMOID(value: number) {
    this.PlannedInfusionVolumeUOMOIDField = value;
    // this.RaisePropertyChanged("PlannedInfusionVolumeUOMOID");
  }

  get PlannedInfusionVolumeUOMName(): string {
    return this.PlannedInfusionVolumeUOMNameField;
  }
  set PlannedInfusionVolumeUOMName(value: string) {
    this.PlannedInfusionVolumeUOMNameField = value;
    // this.RaisePropertyChanged("PlannedInfusionVolumeUOMName");
  }

  get IsAdministeredInAdvance(): boolean {
    return this.IsAdministeredInAdvanceField;
  }
  set IsAdministeredInAdvance(value: boolean) {
    if ((this.referenceEquals(this.IsAdministeredInAdvanceField, value))) {
      this.IsAdministeredInAdvanceField = value;
      // this.RaisePropertyChanged("IsAdministeredInAdvance");
    }
  }

  get PlannedInfusionVolumeUOMLzoID(): string {
    return this.PlannedInfusionVolumeUOMLzoIDField;
  }
  set PlannedInfusionVolumeUOMLzoID(value: string) {
    this.PlannedInfusionVolumeUOMLzoIDField = value;
    // this.RaisePropertyChanged("PlannedInfusionVolumeUOMLzoID");
  }

  get IsPersonalCarerNotListed(): boolean {
    return this.IsPersonalCarerNotListedField;
  }
  set IsPersonalCarerNotListed(value: boolean) {
    this.IsPersonalCarerNotListedField = value;
    // this.RaisePropertyChanged("IsPersonalCarerNotListed");
  }

  get IsDuringHomeLeave(): boolean {
    return this._IsDuringHomeLeaveField;
  }
  set IsDuringHomeLeave(value: boolean) {
    this._IsDuringHomeLeaveField = value;
    // this.RaisePropertyChanged("IsDuringHomeLeave");
  }

  get IsCriticalMed(): boolean {
    return this._IsCriticalMedField;
  }
  set IsCriticalMed(value: boolean) {
    this._IsCriticalMedField = value;
    // this.RaisePropertyChanged("IsCriticalMed");
  }

  get CriticalMedsRoutes(): string {
    return this.CriticalMedsRoutesField;
  }
  set CriticalMedsRoutes(value: string) {
    this.CriticalMedsRoutesField = value;
    // this.RaisePropertyChanged("CriticalMedsRoutes");
  }

  get CriticalMedsMsg(): string {
    return this.CriticalMedsMsgField;
  }
  set CriticalMedsMsg(value: string) {
    this.CriticalMedsMsgField = value;
    // this.RaisePropertyChanged("CriticalMedsRoutes");
  }

  get CriticalDrugSiteURL(): string {
    return this.CriticalDrugSiteURLField;
  }
  set CriticalDrugSiteURL(value: string) {
    this.CriticalDrugSiteURLField = value;
    // this.RaisePropertyChanged("CriticalDrugSiteURL");
  }

  get IsStruckout(): string {
    return this.IsStruckoutField;
  }
  set IsStruckout(value: string) {
    this.IsStruckoutField = value;
    // this.RaisePropertyChanged("IsStruckout");
  }

  get IsMedScannedProduct(): string {
    return this.IsMedScannedProductField;
  }
  set IsMedScannedProduct(value: string) {
    this.IsMedScannedProductField = value;
    // this.RaisePropertyChanged("IsMedScannedProduct");
  }

  get MedProductDetails(): MedsScanProductDetails[] {
    return this.medProductDetailsField;
  }
  set MedProductDetails(value: MedsScanProductDetails[]) {
    this.medProductDetailsField = value;
    // this.RaisePropertyChanged("MedProductDetails");
  }

  get MedBarCodeOverrideDetails(): CMedBarcodeScanOverrideDetail[] {
    return this.medBarCodeOverrideDetailsField;
  }
  set MedBarCodeOverrideDetails(value: CMedBarcodeScanOverrideDetail[]) {
    this.medBarCodeOverrideDetailsField = value;
    // this.RaisePropertyChanged("MedBarCodeOverrideDetails");
  }


  get MedAdminHistoryOID(): number {
    return this.MedAdminHistoryOIDField;
  }
  set MedAdminHistoryOID(value: number) {
    if ((this.MedAdminHistoryOIDField != (value))) {
      this.MedAdminHistoryOIDField = value;
      // this.RaisePropertyChanged("MedAdminHistoryOID");
    }
  }

  get MedScannedHistoryOID(): number {
    return this.MedScannedHistoryOIDField;
  }
  set MedScannedHistoryOID(value: number) {
    if ((this.MedScannedHistoryOIDField != (value))) {
      this.MedScannedHistoryOIDField = value;
      // this.RaisePropertyChanged("MedScannedHistoryOID");
    }
  }

  get IsMedScanExcluded(): boolean {
    return this.IsMedScanExcludedField;
  }
  set IsMedScanExcluded(value: boolean) {
    if ((this.IsMedScanExcludedField != (value))) {
      this.IsMedScanExcludedField = value;
      // this.RaisePropertyChanged("IsMedScanExcluded");
    }
  }

  get PGDLorenzoID(): string {
    return this.pGDLorenzoIDField;
  }
  set PGDLorenzoID(value: string) {
    this.pGDLorenzoIDField = value;
    // this.RaisePropertyChanged("PGDLorenzoID");
  }

  private serviceOIDField = 0;

  get ServiceOID(): number {
    return this.serviceOIDField;
  }
  set ServiceOID(value: number) {
    this.serviceOIDField = value;
    // this.RaisePropertyChanged("ServiceOID");
  }

  private encounterOIDField = 0;
  get EncounterOID(): number {
    return this.encounterOIDField;
  }
  set EncounterOID(value: number) {
    this.encounterOIDField = value;
    // this.RaisePropertyChanged("EncounterOID");
  }
}
export class ArrayOfDateTime { };
export class ArrayOfLong { };
export class DrugPrepHistoryData extends CLZOObject {

  private AttributeNameField = '';

  private FromValueField = '';

  private ToValueField = '';

  private ModifiedbyField = '';

  private ModifieddttmField: Date = new Date();

  private ComponentNameField = '';


  public get AttributeName(): string {

    return this.AttributeNameField;
  }
  public set AttributeName(value: string) {
    if ((this.referenceEquals(this.AttributeNameField, value))) {
      this.AttributeNameField = value;
      // this.RaisePropertyChanged("AttributeName");
    }
  }
  public get FromValue(): string {

    return this.FromValueField;
  }
  public set FromValue(value: string) {
    if ((this.referenceEquals(this.FromValueField, value))) {
      this.FromValueField = value;
      // this.RaisePropertyChanged("FromValue");
    }
  }

  public get ToValue(): string {
    return this.ToValueField;
  }
  public set ToValue(value: string) {
    if ((this.referenceEquals(this.ToValueField, value))) {
      this.ToValueField = value;
      // this.RaisePropertyChanged("ToValue");
    }
  }

  public get Modifiedby(): string {

    return this.ModifiedbyField;
  }
  public set Modifiedby(value: string) {
    if ((this.referenceEquals(this.ModifiedbyField, value))) {
      this.ModifiedbyField = value;
      // this.RaisePropertyChanged("Modifiedby");
    }
  }

  public get Modifieddttm(): Date {
    return this.ModifieddttmField;
  }
  public set Modifieddttm(value: Date) {
    if (!(this.ModifieddttmField === value)) {
      this.ModifieddttmField = value;
      // this.RaisePropertyChanged("Modifieddttm");
    }
  }



  public get ComponentName(): string {

    return this.ComponentNameField;
  }
  public set ComponentName(value: string) {
    if ((this.referenceEquals(this.ComponentNameField, value))) {
      this.ComponentNameField = value;
      //  this.RaisePropertyChanged("ComponentName");
    }
  }
}
export class TechnicalValidationInfo extends CLZOObject {
  private PrescriptionOIDField = 0;
  private PrescriptionItemOIDField = 0;
  private ValidatedDTTMField: Date = new Date();
  private ValidatedByField: ObjectInfo = new ObjectInfo();
  private TechValidatedItemsField: TechValidatedItem[] = [];
  private ValidatorRoleNameField = '';
  private IsTechnicalvalidateField = '';
  private TechnicalvalidateupdateField: boolean = false;
  private EncounterOIDField = 0;
  private IsMergePatientField = '';
  private SupplyInstructionField: ObjectInfo[] = []
  private DispensingInstructionField: ObjectInfo[] = [];
  private OtherDispensingInstructionField = '';
  private PrepStatusCodeField = '';
  private IsWardStockField: boolean = false;
  private IsSupplyRequestedField = '';
  private RequisitionCACodeField = '';
  private LorenzoIDField = '';
  private ServiceOIDField = 0;
  private LocationOIDField = 0;
  private UsersOIDField = 0;
  private RoleOIDField = 0;
  private PresMutliCompOidField = 0;
  private UniqueMCRowIDField = 0;
  public get PrescriptionOID(): number {
    return this.PrescriptionOIDField;
  }
  public set PrescriptionOID(value: number) {
    if (!(this.PrescriptionOIDField === value)) {
      this.PrescriptionOIDField = value;
      // this.RaisePropertyChanged("PrescriptionOID");
    }
  }

  public get PrescriptionItemOID(): number {
    return this.PrescriptionItemOIDField;
  }
  public set PrescriptionItemOID(value: number) {
    if (!(this.PrescriptionItemOIDField === value)) {
      this.PrescriptionItemOIDField = value;
      // this.RaisePropertyChanged("PrescriptionItemOID");
    }
  }
  public get ValidatedDTTM(): Date {
    return this.ValidatedDTTMField;
  }
  public set ValidatedDTTM(value: Date) {
    if (!(this.ValidatedDTTMField === value)) {
      this.ValidatedDTTMField = value;
      // this.RaisePropertyChanged("ValidatedDTTM");
    }
  }

  public get ValidatedBy(): ObjectInfo {
    return this.ValidatedByField;
  }
  public set ValidatedBy(value: ObjectInfo) {
    if ((this.referenceEquals(this.ValidatedByField, value))) {
      this.ValidatedByField = value;
      // this.RaisePropertyChanged("ValidatedBy");
    }
  }

  public get TechValidatedItems(): TechValidatedItem[] {
    return this.TechValidatedItemsField;
  }
  public set TechValidatedItems(value: TechValidatedItem[]) {
    if ((this.referenceEquals(this.TechValidatedItemsField, value))) {
      this.TechValidatedItemsField = value;
      //this.RaisePropertyChanged("TechValidatedItems");
    }
  }

  public get ValidatorRoleName(): string {
    return this.ValidatorRoleNameField;
  }
  public set ValidatorRoleName(value: string) {
    if ((this.referenceEquals(this.ValidatorRoleNameField, value))) {
      this.ValidatorRoleNameField = value;
      // this.RaisePropertyChanged("ValidatorRoleName");
    }
  }

  public get IsTechnicalvalidate(): string {
    return this.IsTechnicalvalidateField;
  }
  public set IsTechnicalvalidate(value: string) {
    if ((this.referenceEquals(this.IsTechnicalvalidateField, value))) {
      this.IsTechnicalvalidateField = value;
      //  this.RaisePropertyChanged("IsTechnicalvalidate");
    }
  }

  public get Technicalvalidateupdate(): boolean {
    return this.TechnicalvalidateupdateField;
  }
  public set Technicalvalidateupdate(value: boolean) {
    if (!(this.TechnicalvalidateupdateField === value)) {
      this.TechnicalvalidateupdateField = value;
      // this.RaisePropertyChanged("Technicalvalidateupdate");
    }
  }
  public get EncounterOID(): number {
    return this.EncounterOIDField;
  }
  public set EncounterOID(value: number) {
    if (!(this.EncounterOIDField === value)) {
      this.EncounterOIDField = value;
      // this.RaisePropertyChanged("EncounterOID");
    }
  }
  public get IsMergePatient(): string {
    return this.IsMergePatientField;
  }
  public set IsMergePatient(value: string) {
    if ((this.referenceEquals(this.IsMergePatientField, value))) {
      this.IsMergePatientField = value;
      //  this.RaisePropertyChanged("IsMergePatient");
    }
  }
  public get SupplyInstruction(): ObjectInfo[] {
    return this.SupplyInstructionField;
  }
  public set SupplyInstruction(value: ObjectInfo[]) {
    if ((this.referenceEquals(this.SupplyInstructionField, value))) {
      this.SupplyInstructionField = value;
      //  this.RaisePropertyChanged("SupplyInstruction");
    }
  }
  public get DispensingInstruction(): ObjectInfo[] {
    return this.DispensingInstructionField;
  }
  public set DispensingInstruction(value: ObjectInfo[]) {
    if ((this.referenceEquals(this.DispensingInstructionField, value))) {
      this.DispensingInstructionField = value;
      //  this.RaisePropertyChanged("DispensingInstruction");
    }
  }
  public get OtherDispensingInstruction(): string {
    return this.OtherDispensingInstructionField;
  }
  public set OtherDispensingInstruction(value: string) {
    if ((this.referenceEquals(this.OtherDispensingInstructionField, value))) {
      this.OtherDispensingInstructionField = value;
      // this.RaisePropertyChanged("OtherDispensingInstruction");
    }
  }

  public get PrepStatusCode(): string {
    return this.PrepStatusCodeField;
  }
  public set PrepStatusCode(value: string) {
    if ((this.referenceEquals(this.PrepStatusCodeField, value))) {
      this.PrepStatusCodeField = value;
      //  this.RaisePropertyChanged("PrepStatusCode");
    }
  }

  public get IsWardStock(): boolean {
    return this.IsWardStockField;
  }
  public set IsWardStock(value: boolean) {
    if (!(this.IsWardStockField === value)) {
      this.IsWardStockField = value;
      // this.RaisePropertyChanged("IsWardStock");
    }
  }

  public get IsSupplyRequested(): string {
    return this.IsSupplyRequestedField;
  }
  public set IsSupplyRequested(value: string) {
    if (!(this.IsSupplyRequestedField === value)) {
      this.IsSupplyRequestedField = value;
      // this.RaisePropertyChanged("IsSupplyRequested");
    }
  }

  public get RequisitionCACode(): string {
    return this.RequisitionCACodeField;
  }
  public set RequisitionCACode(value: string) {
    if ((this.referenceEquals(this.RequisitionCACodeField, value))) {
      this.RequisitionCACodeField = value;
      // this.RaisePropertyChanged("RequisitionCACode");
    }
  }
  public get LorenzoID(): string {
    return this.LorenzoIDField;
  }
  public set LorenzoID(value: string) {
    if ((this.referenceEquals(this.LorenzoIDField, value))) {
      this.LorenzoIDField = value;
      // this.RaisePropertyChanged("LorenzoID");
    }
  }
  public get ServiceOID(): number {
    return this.ServiceOIDField;
  }
  public set ServiceOID(value: number) {
    if (!(this.ServiceOIDField === value)) {
      this.ServiceOIDField = value;
      //  this.RaisePropertyChanged("ServiceOID");
    }
  }
  public get LocationOID(): number {

    return this.LocationOIDField;
  }
  public set LocationOID(value: number) {
    if (!(this.LocationOIDField === value)) {
      this.LocationOIDField = value;
      // this.RaisePropertyChanged("LocationOID");
    }
  }
  //  [System.Runtime.Serialization.DataMemberAttribute(IsRequired=true, Order=20)]
  public get UsersOID(): number {
    return this.UsersOIDField;
  }
  public set UsersOID(value: number) {
    if (!(this.UsersOIDField === value)) {
      this.UsersOIDField = value;
      // this.RaisePropertyChanged("UsersOID");
    }
  }

  public get RoleOID(): number {
    return this.RoleOIDField;
  }
  public set RoleOID(value: number) {
    if (!(this.RoleOIDField === value)) {
      this.RoleOIDField = value;
      // this.RaisePropertyChanged("RoleOID");
    }
  }
  public get PresMutliCompOid(): number {
    return this.PresMutliCompOidField;
  }
  public set PresMutliCompOid(value: number) {
    if (!(this.PresMutliCompOidField === value)) {
      this.PresMutliCompOidField = value;
      // this.RaisePropertyChanged("PresMutliCompOid");
    }
  }

  public get UniqueMCRowID(): number {
    return this.UniqueMCRowIDField;
  }
  public set UniqueMCRowID(value: number) {
    if (!(this.UniqueMCRowIDField === value)) {
      this.UniqueMCRowIDField = value;
      //this.RaisePropertyChanged("UniqueMCRowID");
    }
  }

}
export class UOM extends CLZOObject {

  private UOMIdField = 0;
  private UOMNameField = '';
  private SourceDataProviderTypeField = '';
  private UOMCodeField = '';
  private MCIPrescribableItemListOIDField = 0;
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
      //  this.RaisePropertyChanged("UOMName");
    }
  }
  public get SourceDataProviderType(): string {
    return this.SourceDataProviderTypeField;
  }
  public set SourceDataProviderType(value: string) {
    if ((this.referenceEquals(this.SourceDataProviderTypeField, value))) {
      this.SourceDataProviderTypeField = value;
      // this.RaisePropertyChanged("SourceDataProviderType");
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
  public get MCIPrescribableItemListOID(): number {
    return this.MCIPrescribableItemListOIDField;
  }
  public set MCIPrescribableItemListOID(value: number) {
    if ((this.MCIPrescribableItemListOIDField === value)) {
      this.MCIPrescribableItemListOIDField = value;
      // this.RaisePropertyChanged("MCIPrescribableItemListOID");
    }
  }

}

export class InfusionBagDetail extends CLZOObject {

  private DoseField = '';
  private DoseUOMField: UOM = new UOM();
  private BagVolumeField = '';
  private BagVolumeUOMField: UOM = new UOM();
  private BagSequenceField = 0;
  private PrevBagSequenceField = 0;
  private ExpiryDateField: Date = new Date();
  private BatchNumberField = '';
  private AdminStartTimeField: Date = new Date();
  private AdminEndTimeField: Date = new Date();
  private InfusedVolumeField = '';
  private InfusedVolumeUOMField: UOM = new UOM();
  private AdministeredByField: ObjectInfo = new ObjectInfo();
  private WitnessedByField: ObjectInfo = new ObjectInfo();
  private IsWitnessNotAvailableField: boolean = false;
  private WastageField = '';
  private WastageUOMField: UOM = new UOM();
  private IsCurrentField = '';

  public get Dose(): string {
    return this.DoseField;
  }
  public set Dose(value: string) {
    if ((this.referenceEquals(this.DoseField, value))) {
      this.DoseField = value;
      // this.RaisePropertyChanged("Dose");
    }
  }


  public get DoseUOM(): UOM {
    return this.DoseUOMField;
  }
  public set DoseUOM(value: UOM) {
    if ((this.referenceEquals(this.DoseUOMField, value))) {
      this.DoseUOMField = value;
      //this.RaisePropertyChanged("DoseUOM");
    }
  }

  public get BagVolume(): string {
    return this.BagVolumeField;
  }
  public set BagVolume(value: string) {
    if ((this.referenceEquals(this.BagVolumeField, value))) {
      this.BagVolumeField = value;
      // this.RaisePropertyChanged("BagVolume");
    }
  }

  public get BagVolumeUOM(): UOM {
    return this.BagVolumeUOMField;
  }
  public set BagVolumeUOM(value: UOM) {
    if ((this.referenceEquals(this.BagVolumeUOMField, value))) {
      this.BagVolumeUOMField = value;
      //  this.RaisePropertyChanged("BagVolumeUOM");
    }
  }

  public get BagSequence(): number {
    return this.BagSequenceField;
  }
  public set BagSequence(value: number) {
    if (!(this.BagSequenceField === value)) {
      this.BagSequenceField = value;
      // this.RaisePropertyChanged("BagSequence");
    }
  }

  public get PrevBagSequence(): number {
    return this.PrevBagSequenceField;
  }
  public set PrevBagSequence(value: number) {
    if (!(this.PrevBagSequenceField === value)) {
      this.PrevBagSequenceField = value;
      //  this.RaisePropertyChanged("PrevBagSequence");
    }
  }


  public get ExpiryDate(): Date {
    return this.ExpiryDateField;
  }
  public set ExpiryDate(value: Date) {
    if (!(this.ExpiryDateField === value)) {
      this.ExpiryDateField = value;
      //  this.RaisePropertyChanged("ExpiryDate");
    }
  }

  public get BatchNumber(): string {
    return this.BatchNumberField;
  }
  public set BatchNumber(value: string) {
    if ((this.referenceEquals(this.BatchNumberField, value))) {
      this.BatchNumberField = value;
      //   this.RaisePropertyChanged("BatchNumber");
    }
  }

  public get AdminStartTime(): Date {
    return this.AdminStartTimeField;
  }
  public set AdminStartTime(value: Date) {
    if (!(this.AdminStartTimeField === value)) {
      this.AdminStartTimeField = value;
      //  this.RaisePropertyChanged("AdminStartTime");
    }
  }

  public get AdminEndTime(): Date {
    return this.AdminEndTimeField;
  }
  public set AdminEndTime(value: Date) {
    if (!(this.AdminEndTimeField === value)) {
      this.AdminEndTimeField = value;
      // this.RaisePropertyChanged("AdminEndTime");
    }
  }


  public get InfusedVolume(): string {
    return this.InfusedVolumeField;
  }
  public set InfusedVolume(value: string) {
    if ((this.referenceEquals(this.InfusedVolumeField, value))) {
      this.InfusedVolumeField = value;
      //  this.RaisePropertyChanged("InfusedVolume");
    }
  }


  public get InfusedVolumeUOM(): UOM {
    return this.InfusedVolumeUOMField;
  }
  public set InfusedVolumeUOM(value: UOM) {
    if ((this.referenceEquals(this.InfusedVolumeUOMField, value))) {
      this.InfusedVolumeUOMField = value;
      //  this.RaisePropertyChanged("InfusedVolumeUOM");
    }
  }


  public get AdministeredBy(): ObjectInfo {

    return this.AdministeredByField;
  }
  public set AdministeredBy(value: ObjectInfo) {
    if ((this.referenceEquals(this.AdministeredByField, value))) {
      this.AdministeredByField = value;
      //  this.RaisePropertyChanged("AdministeredBy");
    }
  }


  public get WitnessedBy(): ObjectInfo {
    return this.WitnessedByField;
  }
  public set WitnessedBy(value: ObjectInfo) {
    if ((this.referenceEquals(this.WitnessedByField, value))) {
      this.WitnessedByField = value;
      //  this.RaisePropertyChanged("WitnessedBy");
    }
  }

  public get IsWitnessNotAvailable(): boolean {
    return this.IsWitnessNotAvailableField;
  }
  public set IsWitnessNotAvailable(value: boolean) {
    if ((this.IsWitnessNotAvailableField === value)) {
      this.IsWitnessNotAvailableField = value;
      //  this.RaisePropertyChanged("IsWitnessNotAvailable");
    }
  }


  public get Wastage(): string {
    return this.WastageField;
  }
  public set Wastage(value: string) {
    if ((this.referenceEquals(this.WastageField, value))) {
      this.WastageField = value;
      //  this.RaisePropertyChanged("Wastage");
    }
  }


  public get WastageUOM(): UOM {
    return this.WastageUOMField;
  }
  public set WastageUOM(value: UOM) {
    if ((this.referenceEquals(this.WastageUOMField, value))) {
      this.WastageUOMField = value;
      //  this.RaisePropertyChanged("WastageUOM");
    }
  }


  public get IsCurrent(): string {

    return this.IsCurrentField;
  }
  public set IsCurrent(value: string) {
    if ((this.referenceEquals(this.IsCurrentField, value))) {
      this.IsCurrentField = value;
      // this.RaisePropertyChanged("IsCurrent");
    }
  }

}

export class TechValidatedItem extends CLZOObject {

  private DrugItemField: DrugItemBasicData = new DrugItemBasicData();
  private QuantityPerDoseField = '';
  private QuantityPerDoseUOMField: ObjectInfo = new ObjectInfo();
  private TotalQuantityField = '';
  private TotalQuantityUOMField: ObjectInfo = new ObjectInfo();
  private SupplyInstructionField: ObjectInfo[] = [];
  private DispensingInstructionField: ObjectInfo[] = [];
  private ClinicalVerifyCommentsField = '';
  private PrescriptionItemTechOIDField = 0;
  private IsTechnicalvalidateField = '';
  private IdentifyingDomainField = '';
  private OtherDispensingInstructionField = '';
  private IsDoseCombinationsDefinedField = '';

  public get DrugItem(): DrugItemBasicData {
    return this.DrugItemField;
  }
  public set DrugItem(value: DrugItemBasicData) {
    if ((this.referenceEquals(this.DrugItemField, value))) {
      this.DrugItemField = value;
      //  this.RaisePropertyChanged("DrugItem");
    }
  }


  public get QuantityPerDose(): string {

    return this.QuantityPerDoseField;
  }
  public set QuantityPerDose(value: string) {
    if ((this.referenceEquals(this.QuantityPerDoseField, value))) {
      this.QuantityPerDoseField = value;
      //  this.RaisePropertyChanged("QuantityPerDose");
    }
  }


  public get QuantityPerDoseUOM(): ObjectInfo {

    return this.QuantityPerDoseUOMField;
  }
  public set QuantityPerDoseUOM(value: ObjectInfo) {
    if ((this.referenceEquals(this.QuantityPerDoseUOMField, value))) {
      this.QuantityPerDoseUOMField = value;
      //this.RaisePropertyChanged("QuantityPerDoseUOM");
    }
  }


  public get TotalQuantity(): string {
    return this.TotalQuantityField;
  }
  public set TotalQuantity(value: string) {
    if ((this.referenceEquals(this.TotalQuantityField, value))) {
      this.TotalQuantityField = value;
      //  this.RaisePropertyChanged("TotalQuantity");
    }
  }


  public get TotalQuantityUOM(): ObjectInfo {

    return this.TotalQuantityUOMField;
  }
  public set TotalQuantityUOM(value: ObjectInfo) {
    if ((this.referenceEquals(this.TotalQuantityUOMField, value))) {
      this.TotalQuantityUOMField = value;
      //  this.RaisePropertyChanged("TotalQuantityUOM");
    }
  }

  public get SupplyInstruction(): ObjectInfo[] {
    return this.SupplyInstructionField;
  }
  public set SupplyInstruction(value: ObjectInfo[]) {
    if ((this.referenceEquals(this.SupplyInstructionField, value))) {
      this.SupplyInstructionField = value;
      //  this.RaisePropertyChanged("SupplyInstruction");
    }
  }


  public get DispensingInstruction(): ObjectInfo[] {

    return this.DispensingInstructionField;
  }
  public set DispensingInstruction(value: ObjectInfo[]) {
    if ((this.referenceEquals(this.DispensingInstructionField, value))) {
      this.DispensingInstructionField = value;
      //  this.RaisePropertyChanged("DispensingInstruction");
    }
  }


  public get ClinicalVerifyComments(): string {
    return this.ClinicalVerifyCommentsField;
  }
  public set ClinicalVerifyComments(value: string) {
    if ((this.referenceEquals(this.ClinicalVerifyCommentsField, value))) {
      this.ClinicalVerifyCommentsField = value;
      //  this.RaisePropertyChanged("ClinicalVerifyComments");
    }
  }


  public get PrescriptionItemTechOID(): number {

    return this.PrescriptionItemTechOIDField;
  }
  public set PrescriptionItemTechOID(value: number) {
    if (!(this.PrescriptionItemTechOIDField === value)) {
      this.PrescriptionItemTechOIDField = value;
      //  this.RaisePropertyChanged("PrescriptionItemTechOID");
    }
  }

  public get IsTechnicalvalidate(): string {
    return this.IsTechnicalvalidateField;
  }
  public set IsTechnicalvalidate(value: string) {
    if ((this.referenceEquals(this.IsTechnicalvalidateField, value))) {
      this.IsTechnicalvalidateField = value;
      // this.RaisePropertyChanged("IsTechnicalvalidate");
    }
  }

  public get IdentifyingDomain(): string {
    return this.IdentifyingDomainField;
  }
  public set IdentifyingDomain(value: string) {
    if ((this.referenceEquals(this.IdentifyingDomainField, value))) {
      this.IdentifyingDomainField = value;
      //   this.RaisePropertyChanged("IdentifyingDomain");
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

  public get IsDoseCombinationsDefined(): string {

    return this.IsDoseCombinationsDefinedField;
  }
  public set IsDoseCombinationsDefined(value: string) {
    if (!(this.IsDoseCombinationsDefinedField === value)) {
      this.IsDoseCombinationsDefinedField = value;
      //  this.RaisePropertyChanged("IsDoseCombinationsDefined");
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

  private zField: boolean = false;

  private aaField = '';

  private bbField = '';

  private ccField = 0;

  private ddField = 0;

  private eeField = '';

  private ffField = '';

  private mcField = '';

  private psField = '';

  private fgField = 0;

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

  private IsTechValidateCAField = '';

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

  private MCIDEActiveItemsField: ArrayOfString = new ArrayOfString();

  private MCIVersionMatchItemsField: ArrayOfString = new ArrayOfString();

  private ItemSubTypeField = '';

  private IsInfusionField = '';

  private DisplaySequenceField = 0;

  private ReorderedFromclerkItemOIDField = 0;

  private MonPeriodMandField = '';

  public get p(): string {

    return this.pField;
  }
  public set p(value: string) {
    if ((this.referenceEquals(this.pField, value))) {
      this.pField = value;
      //this.RaisePropertyChanged("p");
    }
  }

  public get q(): string {

    return this.qField;
  }
  public set q(value: string) {
    if ((this.referenceEquals(this.qField, value))) {
      this.qField = value;
      //  this.RaisePropertyChanged("q");
    }
  }

  public get r(): string {

    return this.rField;
  }
  public set r(value: string) {
    if ((this.referenceEquals(this.rField, value))) {
      this.rField = value;
      //  this.RaisePropertyChanged("r");
    }
  }


  public get s(): string {
    return this.sField;
  }
  public set s(value: string) {
    if ((this.referenceEquals(this.sField, value))) {
      this.sField = value;
      //   this.RaisePropertyChanged("s");
    }
  }

  public get t(): string {
    return this.tField;
  }
  public set t(value: string) {
    if ((this.referenceEquals(this.tField, value))) {
      this.tField = value;
      // this.RaisePropertyChanged("t");
    }
  }


  public get y(): string {

    return this.yField;
  }
  public set y(value: string) {
    if ((this.referenceEquals(this.yField, value))) {
      this.yField = value;
      //  this.RaisePropertyChanged("y");
    }
  }


  public get z(): boolean {
    return this.zField;
  }
  public set z(value: boolean) {
    if (!(this.zField === value)) {
      this.zField = value;
      //this.RaisePropertyChanged("z");
    }
  }

  public get aa(): string {
    return this.aaField;
  }
  public set aa(value: string) {
    if ((this.referenceEquals(this.aaField, value))) {
      this.aaField = value;
      //this.RaisePropertyChanged("aa");
    }
  }


  public get bb(): string {
    return this.bbField;
  }
  public set bb(value: string) {
    if ((this.referenceEquals(this.bbField, value))) {
      this.bbField = value;
      //   this.RaisePropertyChanged("bb");
    }
  }

  public get cc(): number {

    return this.ccField;
  }
  public set cc(value: number) {
    if (!(this.ccField === value)) {
      this.ccField = value;
      //  this.RaisePropertyChanged("cc");
    }
  }


  public get dd(): number {
    return this.ddField;
  }
  public set dd(value: number) {
    if (!(this.ddField === value)) {
      this.ddField = value;
      // this.RaisePropertyChanged("dd");
    }
  }

  public get ee(): string {
    return this.eeField;
  }
  public set ee(value: string) {
    if ((this.referenceEquals(this.eeField, value))) {
      this.eeField = value;
      //  this.RaisePropertyChanged("ee");
    }
  }

  public get ff(): string {
    return this.ffField;
  }
  public set ff(value: string) {
    if ((this.referenceEquals(this.ffField, value))) {
      this.ffField = value;
      //  this.RaisePropertyChanged("ff");
    }
  }

  public get mc(): string {
    return this.mcField;
  }
  public set mc(value: string) {
    if ((this.referenceEquals(this.mcField, value))) {
      this.mcField = value;
      //  this.RaisePropertyChanged("mc");
    }
  }


  public get ps(): string {
    return this.psField;
  }
  public set ps(value: string) {
    if ((this.referenceEquals(this.psField, value))) {
      this.psField = value;
      // this.RaisePropertyChanged("ps");
    }
  }


  public get fg(): number {

    return this.fgField;
  }
  public set fg(value: number) {
    if (!(this.fgField === value)) {
      this.fgField = value;
      //  this.RaisePropertyChanged("fg");
    }
  }

  public get IdentifyingOID(): number {
    return this.IdentifyingOIDField;
  }
  public set IdentifyingOID(value: number) {
    if (!(this.IdentifyingOIDField === value)) {
      this.IdentifyingOIDField = value;
      // this.RaisePropertyChanged("IdentifyingOID");
    }
  }


  public get IdentifyingType(): string {
    return this.IdentifyingTypeField;
  }
  public set IdentifyingType(value: string) {
    if ((this.referenceEquals(this.IdentifyingTypeField, value))) {
      this.IdentifyingTypeField = value;
      //    this.RaisePropertyChanged("IdentifyingType");
    }
  }
  public get IdentifyingName(): string {
    return this.IdentifyingNameField;
  }
  public set IdentifyingName(value: string) {
    if ((this.referenceEquals(this.IdentifyingNameField, value))) {
      this.IdentifyingNameField = value;
      // this.RaisePropertyChanged("IdentifyingName");
    }
  }

  public get PrescribableItemListOID(): number {

    return this.PrescribableItemListOIDField;
  }
  public set PrescribableItemListOID(value: number) {
    if (!(this.PrescribableItemListOIDField === value)) {
      this.PrescribableItemListOIDField = value;
      //  this.RaisePropertyChanged("PrescribableItemListOID");
    }
  }


  public get MCVersionNo(): string {
    return this.MCVersionNoField;
  }
  public set MCVersionNo(value: string) {
    if ((this.referenceEquals(this.MCVersionNoField, value))) {
      this.MCVersionNoField = value;
      //  this.RaisePropertyChanged("MCVersionNo");
    }
  }


  public get IsAccessContraint(): string {
    return this.IsAccessContraintField;
  }
  public set IsAccessContraint(value: string) {
    if ((this.referenceEquals(this.IsAccessContraintField, value))) {
      this.IsAccessContraintField = value;
      //   this.RaisePropertyChanged("IsAccessContraint");
    }
  }


  public get IsPrescribeByBrand(): string {

    return this.IsPrescribeByBrandField;
  }
  public set IsPrescribeByBrand(value: string) {
    if ((this.referenceEquals(this.IsPrescribeByBrandField, value))) {
      this.IsPrescribeByBrandField = value;
      //this.RaisePropertyChanged("IsPrescribeByBrand");
    }
  }


  public get FormularyNote(): string {
    return this.FormularyNoteField;
  }
  public set FormularyNote(value: string) {
    if ((this.referenceEquals(this.FormularyNoteField, value))) {
      this.FormularyNoteField = value;
      //  this.RaisePropertyChanged("FormularyNote");
    }
  }


  public get ItemType(): string {

    return this.ItemTypeField;
  }
  public set ItemType(value: string) {
    if ((this.referenceEquals(this.ItemTypeField, value))) {
      this.ItemTypeField = value;
      //this.RaisePropertyChanged("ItemType");
    }
  }

  public get RouteOID(): number {
    return this.RouteOIDField;
  }
  public set RouteOID(value: number) {
    if (!(this.RouteOIDField === value)) {
      this.RouteOIDField = value;
      // this.RaisePropertyChanged("RouteOID");
    }
  }


  public get FormOID(): number {
    return this.FormOIDField;
  }
  public set FormOID(value: number) {
    if (!(this.FormOIDField === value)) {
      this.FormOIDField = value;
      //  this.RaisePropertyChanged("FormOID");
    }
  }

  public get IsTechValidateCA(): string {

    return this.IsTechValidateCAField;
  }
  public set IsTechValidateCA(value: string) {
    if (!(this.IsTechValidateCAField === value)) {
      this.IsTechValidateCAField = value;
      // this.RaisePropertyChanged("IsTechValidateCA");
    }
  }

  public get LorenzoID(): string {
    return this.LorenzoIDField;
  }
  public set LorenzoID(value: string) {
    if ((this.referenceEquals(this.LorenzoIDField, value))) {
      this.LorenzoIDField = value;
      //  this.RaisePropertyChanged("LorenzoID");
    }
  }


  public get NonCatItemReason(): string {

    return this.NonCatItemReasonField;
  }
  public set NonCatItemReason(value: string) {
    if ((this.referenceEquals(this.NonCatItemReasonField, value))) {
      this.NonCatItemReasonField = value;
      //  this.RaisePropertyChanged("NonCatItemReason");
    }
  }

  public get TechQtyUomName(): string {
    return this.TechQtyUomNameField;
  }
  public set TechQtyUomName(value: string) {
    if ((this.referenceEquals(this.TechQtyUomNameField, value))) {
      this.TechQtyUomNameField = value;
      //this.RaisePropertyChanged("TechQtyUomName");
    }
  }


  public get IsControllDrug(): string {

    return this.IsControllDrugField;
  }
  public set IsControllDrug(value: string) {
    if ((this.referenceEquals(this.IsControllDrugField, value))) {
      this.IsControllDrugField = value;
      //  this.RaisePropertyChanged("IsControllDrug");
    }
  }


  public get ITMSUBTYP(): string {

    return this.ITMSUBTYPField;
  }
  public set ITMSUBTYP(value: string) {
    if ((this.referenceEquals(this.ITMSUBTYPField, value))) {
      this.ITMSUBTYPField = value;
      //   this.RaisePropertyChanged("ITMSUBTYP");
    }
  }


  public get SourceDataProviderType(): string {
    return this.SourceDataProviderTypeField;
  }
  public set SourceDataProviderType(value: string) {
    if ((this.referenceEquals(this.SourceDataProviderTypeField, value))) {
      this.SourceDataProviderTypeField = value;
      // this.RaisePropertyChanged("SourceDataProviderType");
    }
  }
  public get AliasName(): string {
    return this.AliasNameField;
  }
  public set AliasName(value: string) {
    if ((this.referenceEquals(this.AliasNameField, value))) {
      this.AliasNameField = value;
      // this.RaisePropertyChanged("AliasName");
    }
  }

  public get PrescriptionItemId(): string {
    return this.PrescriptionItemIdField;
  }
  public set PrescriptionItemId(value: string) {
    if ((this.referenceEquals(this.PrescriptionItemIdField, value))) {
      this.PrescriptionItemIdField = value;
      // this.RaisePropertyChanged("PrescriptionItemId");
    }
  }

  public get ConflictUniqueId(): string {

    return this.ConflictUniqueIdField;
  }
  public set ConflictUniqueId(value: string) {
    if ((this.referenceEquals(this.ConflictUniqueIdField, value))) {
      this.ConflictUniqueIdField = value;
      //  this.RaisePropertyChanged("ConflictUniqueId");
    }
  }

  public get bIsReplacement(): boolean {
    return this.bIsReplacementField;
  }
  public set bIsReplacement(value: boolean) {
    if ((this.bIsReplacementField === value)) {
      this.bIsReplacementField = value;
      // this.RaisePropertyChanged("bIsReplacement");
    }
  }
  public get sDosageForm(): string {
    return this.sDosageFormField;
  }
  public set sDosageForm(value: string) {
    if ((this.referenceEquals(this.sDosageFormField, value))) {
      this.sDosageFormField = value;
      //  this.RaisePropertyChanged("sDosageForm");
    }
  }

  public get sStrength(): string {
    return this.sStrengthField;
  }
  public set sStrength(value: string) {
    if ((this.referenceEquals(this.sStrengthField, value))) {
      this.sStrengthField = value;
      //  this.RaisePropertyChanged("sStrength");
    }
  }

  public get DosageFormID(): number {
    return this.DosageFormIDField;
  }
  public set DosageFormID(value: number) {
    if (!(this.DosageFormIDField === value)) {
      this.DosageFormIDField = value;
      // this.RaisePropertyChanged("DosageFormID");
    }
  }

  public get MCOID(): number {
    return this.MCOIDField;
  }
  public set MCOID(value: number) {
    if (!(this.MCOIDField === value)) {
      this.MCOIDField = value;
      // this.RaisePropertyChanged("MCOID");
    }
  }

  public get MCPrepStatusCode(): string {
    return this.MCPrepStatusCodeField;
  }
  public set MCPrepStatusCode(value: string) {
    if ((this.referenceEquals(this.MCPrepStatusCodeField, value))) {
      this.MCPrepStatusCodeField = value;
      //  this.RaisePropertyChanged("MCPrepStatusCode");
    }
  }

  public get MCItemName(): string {
    return this.MCItemNameField;
  }
  public set MCItemName(value: string) {
    if ((this.referenceEquals(this.MCItemNameField, value))) {
      this.MCItemNameField = value;
      //   this.RaisePropertyChanged("MCItemName");
    }
  }
  public get MCIItemDisplay(): string {
    return this.MCIItemDisplayField;
  }
  public set MCIItemDisplay(value: string) {
    if ((this.referenceEquals(this.MCIItemDisplayField, value))) {
      this.MCIItemDisplayField = value;
      //  this.RaisePropertyChanged("MCIItemDisplay");
    }
  }

  public get PreparationStatus(): string {
    return this.PreparationStatusField;
  }
  public set PreparationStatus(value: string) {
    if ((this.referenceEquals(this.PreparationStatusField, value))) {
      this.PreparationStatusField = value;
      // this.RaisePropertyChanged("PreparationStatus");
    }
  }

  public get MCIDEActiveItems(): ArrayOfString {
    return this.MCIDEActiveItemsField;
  }
  public set MCIDEActiveItems(value: ArrayOfString) {
    if ((this.referenceEquals(this.MCIDEActiveItemsField, value))) {
      this.MCIDEActiveItemsField = value;
      //  this.RaisePropertyChanged("MCIDEActiveItems");
    }
  }
  public get MCIVersionMatchItems(): ArrayOfString {
    return this.MCIVersionMatchItemsField;
  }
  public set MCIVersionMatchItems(value: ArrayOfString) {
    if ((this.referenceEquals(this.MCIVersionMatchItemsField, value))) {
      this.MCIVersionMatchItemsField = value;
      //   this.RaisePropertyChanged("MCIVersionMatchItems");
    }
  }


  public get ItemSubType(): string {
    return this.ItemSubTypeField;
  }
  public set ItemSubType(value: string) {
    if ((this.referenceEquals(this.ItemSubTypeField, value))) {
      this.ItemSubTypeField = value;
      //  this.RaisePropertyChanged("ItemSubType");
    }
  }
  public get IsInfusion(): string {
    return this.IsInfusionField;
  }
  public set IsInfusion(value: string) {
    if ((this.referenceEquals(this.IsInfusionField, value))) {
      this.IsInfusionField = value;
      //this.RaisePropertyChanged("IsInfusion");
    }
  }

  public get DisplaySequence(): number {
    return this.DisplaySequenceField;
  }
  public set DisplaySequence(value: number) {
    if (!(this.DisplaySequenceField === value)) {
      this.DisplaySequenceField = value;
      //  this.RaisePropertyChanged("DisplaySequence");
    }
  }

  public get ReorderedFromclerkItemOID(): number {
    return this.ReorderedFromclerkItemOIDField;
  }
  public set ReorderedFromclerkItemOID(value: number) {
    if (!(this.ReorderedFromclerkItemOIDField === value)) {
      this.ReorderedFromclerkItemOIDField = value;
      //  this.RaisePropertyChanged("ReorderedFromclerkItemOID");
    }
  }
  public get MonPeriodMand(): string {
    return this.MonPeriodMandField;
  }
  public set MonPeriodMand(value: string) {
    if (!(this.MonPeriodMandField === value)) {
      this.MonPeriodMandField = value;
      // this.RaisePropertyChanged("MonPeriodMand");
    }
  }

}

export class AlertsInfo extends CLZOObject {

  private AlertField = '';

  private PreInfRateField = '';

  private ModifiedByField = '';

  private ModifiedAtField = new Date();

  private InfRateField = '';

  private ConcentrationField = '';

  private PreConcentrationField = '';

  get Alert(): string {
    return this.AlertField;
  }
  set Alert(value: string) {
    if ((this.referenceEquals(this.AlertField, value))) {
      this.AlertField = value;
      // this.RaisePropertyChanged("Alert");
    }
  }

  get PreInfRate(): string {
    return this.PreInfRateField;
  }
  set PreInfRate(value: string) {
    if ((this.referenceEquals(this.PreInfRateField, value))) {
      this.PreInfRateField = value;
      // this.RaisePropertyChanged("PreInfRate");
    }
  }

  get ModifiedBy(): string {
    return this.ModifiedByField;
  }
  set ModifiedBy(value: string) {
    if ((this.referenceEquals(this.ModifiedByField, value))) {
      this.ModifiedByField = value;
      // this.RaisePropertyChanged("ModifiedBy");
    }
  }

  get ModifiedAt(): Date {
    return this.ModifiedAtField;
  }
  set ModifiedAt(value: Date) {
    if ((this.ModifiedAtField != (value))) {
      this.ModifiedAtField = value;
      // this.RaisePropertyChanged("ModifiedAt");
    }
  }

  get InfRate(): string {
    return this.InfRateField;
  }
  set InfRate(value: string) {
    if ((this.referenceEquals(this.InfRateField, value))) {
      this.InfRateField = value;
      // this.RaisePropertyChanged("InfRate");
    }
  }

  get Concentration() {
    return this.ConcentrationField;
  }
  set Concentration(value: string) {
    if ((this.referenceEquals(this.ConcentrationField, value) != true)) {
      this.ConcentrationField = value;
      // this.RaisePropertyChanged("Concentration");
    }
  }

  get PreConcentration(): string {
    return this.PreConcentrationField;
  }
  set PreConcentration(value: string) {
    if ((this.referenceEquals(this.PreConcentrationField, value))) {
      this.PreConcentrationField = value;
      // this.RaisePropertyChanged("PreConcentration");
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

  private RequisitionDTTMField = new Date();

  private LocationNameField = '';

  private IsCurrentField = '';

  private URGNCCodeField = '';

  private CommentsField = '';

  //Issue fix -17085 Medication Request
  private EncounterOIDField = 0;

  private PresItemOIDField = 0;

  private LorenzoIDField = '';
  //EPIC-7732 - venkat RM         
  private FluidOIDField = 0;
  //EPIC-7732 - Poorni RM  
  private PrescriptionMultiComponentOIDField = 0;

  get ServiceOID(): number {
    return this.ServiceOIDField;
  }
  set ServiceOID(value: number) {
    if ((this.ServiceOIDField != (value))) {
      this.ServiceOIDField = value;
      // this.RaisePropertyChanged("ServiceOID");
    }
  }

  get ServicePointName(): string {
    return this.ServicePointNameField;
  }
  set ServicePointName(value: string) {
    if ((this.referenceEquals(this.ServicePointNameField, value))) {
      this.ServicePointNameField = value;
      // this.RaisePropertyChanged("ServicePointName");
    }
  }

  get LocationOID(): number {
    return this.LocationOIDField;
  }
  set LocationOID(value: number) {
    if ((this.LocationOIDField != (value))) {
      this.LocationOIDField = value;
      // this.RaisePropertyChanged("LocationOID");
    }
  }

  get UsersOID() {
    return this.UsersOIDField;
  }
  set UsersOID(value: number) {
    if ((this.UsersOIDField != (value))) {
      this.UsersOIDField = value;
      // this.RaisePropertyChanged("UsersOID");
    }
  }

  get RequisitionedBy(): string {
    return this.RequisitionedByField;
  }
  set RequisitionedBy(value: string) {
    if ((this.referenceEquals(this.RequisitionedByField, value))) {
      this.RequisitionedByField = value;
      // this.RaisePropertyChanged("RequisitionedBy");
    }
  }

  get RoleOID(): number {
    return this.RoleOIDField;
  }
  set RoleOID(value: number) {
    if ((this.RoleOIDField != (value))) {
      this.RoleOIDField = value;
      // this.RaisePropertyChanged("RoleOID");
    }
  }

  get RoleName(): string {
    return this.RoleNameField;
  }
  set RoleName(value: string) {
    if ((this.referenceEquals(this.RoleNameField, value))) {
      this.RoleNameField = value;
      // this.RaisePropertyChanged("RoleName");
    }
  }

  get RequisitionDTTM(): Date {
    return this.RequisitionDTTMField;
  }
  set RequisitionDTTM(value: Date) {
    if ((this.RequisitionDTTMField != (value))) {
      this.RequisitionDTTMField = value;
      // this.RaisePropertyChanged("RequisitionDTTM");
    }
  }

  get LocationName(): string {
    return this.LocationNameField;
  }
  set LocationName(value: string) {
    if ((this.referenceEquals(this.LocationNameField, value))) {
      this.LocationNameField = value;
      // this.RaisePropertyChanged("LocationName");
    }
  }

  get IsCurrent(): string {
    return this.IsCurrentField;
  }
  set IsCurrent(value: string) {
    if ((this.IsCurrentField != (value))) {
      this.IsCurrentField = value;
      // this.RaisePropertyChanged("IsCurrent");
    }
  }

  get URGNCCode(): string {
    return this.URGNCCodeField;
  }
  set URGNCCode(value: string) {
    if ((this.referenceEquals(this.URGNCCodeField, value))) {
      this.URGNCCodeField = value;
      // this.RaisePropertyChanged("URGNCCode");
    }
  }

  get Comments(): string {
    return this.CommentsField;
  }
  set Comments(value: string) {
    if ((this.referenceEquals(this.CommentsField, value))) {
      this.CommentsField = value;
      // this.RaisePropertyChanged("Comments");
    }
  }

  get PresItemOID(): number {
    return this.PresItemOIDField;
  }
  set PresItemOID(value: number) {
    if ((this.PresItemOIDField != (value))) {
      this.PresItemOIDField = value;
      // this.RaisePropertyChanged("PresItemOID");
    }
  }

  get EncounterOID(): number {
    return this.EncounterOIDField;
  }
  set EncounterOID(value: number) {
    if ((this.EncounterOIDField != (value))) {
      this.EncounterOIDField = value;
      // this.RaisePropertyChanged("EncounterOID");
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


  get FluidPrescribableItemListOID(): number { return this.FluidOIDField; }
  set FluidPrescribableItemListOID(value: number) {
    this.FluidOIDField = value;
    // this.RaisePropertyChanged("FluidPrescribableItemListOID");
  }

  get PrescriptionMultiComponentOID(): number {
    return this.PrescriptionMultiComponentOIDField;
  }
  set PrescriptionMultiComponentOID(value: number) {
    if ((this.referenceEquals(this.PrescriptionMultiComponentOIDField, value))) {
      this.PrescriptionMultiComponentOIDField = value;
      // this.RaisePropertyChanged("PrescriptionMultiComponentOID");
    }
  }
}
export class UomTypeList extends CLZOObject {

  private UoMOIDField = 0;

  private NameField = '';

  private LorenzoIDField = '';

  private UOMTYCodeField = '';

  get UoMOID(): number {
    return this.UoMOIDField;
  }
  set UoMOID(value: number) {
    if ((this.UoMOIDField != (value))) {
      this.UoMOIDField = value;
      // this.RaisePropertyChanged("UoMOID");
    }
  }

  get Name(): string {
    return this.NameField;
  }
  set Name(value: string) {
    if ((this.referenceEquals(this.NameField, value))) {
      this.NameField = value;
      // this.RaisePropertyChanged("Name");
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

  get UOMTYCode(): string {
    return this.UOMTYCodeField;
  }
  set UOMTYCode(value: string) {
    if ((this.referenceEquals(this.UOMTYCodeField, value))) {
      this.UOMTYCodeField = value;
      // this.RaisePropertyChanged("UOMTYCode");
    }
  }
}

export class SiteList extends CLZOObject {

  private SiteOIDField = 0;

  private SiteNameField = '';

  get SiteOID(): number {
    return this.SiteOIDField;
  }
  set SiteOID(value: number) {
    if ((this.SiteOIDField != (value))) {
      this.SiteOIDField = value;
      // this.RaisePropertyChanged("SiteOID");
    }
  }

  get SiteName(): string {
    return this.SiteNameField;
  }
  set SiteName(value: string) {
    if ((this.referenceEquals(this.SiteNameField, value))) {
      this.SiteNameField = value;
      // this.RaisePropertyChanged("SiteName");
    }
  }
}

export class InfusionAdminDetail extends CLZOObject {

  private ActionCodeField = '';

  private ActionStartDateField = new Date();

  private ActionEndDateField = new Date();

  private RecordedAtField = new Date();

  private RecordedByField = '';

  private SiteField = '';

  private LumenField = '';

  private DeliverydeviceField = '';

  private infusionCommentsField = '';

  private infusionReasonCodeField = '';

  private InfusionRateField = '';

  private InfusionRateUOMField: UOM = new UOM();

  private InfusionRatePerUOMField: UOM = new UOM();

  private DripRateField = '';

  private DripRateUOMField: UOM = new UOM();

  private DripRatePerUOMField: UOM = new UOM();

  private TopUpDoseField = '';

  private TopUpDoseUOMField: UOM = new UOM();

  private INFTYCodeField = '';

  private PrescriptionItemOIDField = 0;

  private DoseDiscReasonCodeField = '';

  private oInfusionBagDetailField: InfusionBagDetail = new InfusionBagDetail();

  private WitnessedByField = '';

  private IsWitnessField = false;

  private MedAdminOIDField = 0;

  private InfusionAdministeredAtField = new DateTime();

  private InfusionAdministeredByField = '';

  private AdministeredByCPOIDField = 0;

  private RecordedByUserOIDField = 0;

  private ActionTermTextField = '';

  private DoseField = '';

  private DoseUOMOIDField = 0;

  private AdminCommentsField = '';

  private MedAdminInfusionOIDField = 0;

  private HumidificationField = '';

  private RouteField: ObjectInfo = new ObjectInfo();

  private ConcentrationStrengthField = '';

  private ConcentrationStrengthUOMField: UOM = new UOM();

  private ConcentrationVolumeField = '';

  private ConcentrationVolumeUOMField: UOM = new UOM();

  private PreviousConcentrationField = '';

  private IsInfusionRateRangeProvidedField = false;

  private InfusionDoseField = '';

  private InfusionDoseUOMField = '';

  private InfusionDoseUOMNumeratorField: UOM = new UOM();

  private InfusionDoseUOMDenominatorField: UOM = new UOM();

  private DoseDiscCommentsField = '';

  private IsEndTimeRecalculatedField = false;

  private MedAdminHistoryOIDField = 0;
  private IsStruckoutField = '';
  private IsMedScannedProductField = '';

  get ActionCode(): string {
    return this.ActionCodeField;
  }
  set ActionCode(value: string) {
    if ((this.referenceEquals(this.ActionCodeField, value))) {
      this.ActionCodeField = value;
      // this.RaisePropertyChanged("ActionCode");
    }
  }

  get ActionStartDate(): Date {
    return this.ActionStartDateField;
  }
  set ActionStartDate(value: Date) {
    if ((this.ActionStartDateField != (value))) {
      this.ActionStartDateField = value;
      // this.RaisePropertyChanged("ActionStartDate");
    }
  }

  get ActionEndDate(): Date {
    return this.ActionEndDateField;
  }
  set ActionEndDate(value: Date) {
    if ((this.ActionEndDateField != (value))) {
      this.ActionEndDateField = value;
      // this.RaisePropertyChanged("ActionEndDate");
    }
  }

  get RecordedAt(): Date {
    return this.RecordedAtField;
  }
  set RecordedAt(value: Date) {
    if ((this.RecordedAtField != (value))) {
      this.RecordedAtField = value;
      // this.RaisePropertyChanged("RecordedAt");
    }
  }

  get RecordedBy(): string {
    return this.RecordedByField;
  }
  set RecordedBy(value: string) {
    if ((this.referenceEquals(this.RecordedByField, value))) {
      this.RecordedByField = value;
      // this.RaisePropertyChanged("RecordedBy");
    }
  }

  get Site(): string {
    return this.SiteField;
  }
  set Site(value: string) {
    if ((this.referenceEquals(this.SiteField, value))) {
      this.SiteField = value;
      // this.RaisePropertyChanged("Site");
    }
  }

  get Lumen(): string {
    return this.LumenField;
  }
  set Lumen(value: string) {
    if ((this.referenceEquals(this.LumenField, value))) {
      this.LumenField = value;
      // this.RaisePropertyChanged("Lumen");
    }
  }

  get Deliverydevice(): string {
    return this.DeliverydeviceField;
  }
  set Deliverydevice(value: string) {
    if ((this.referenceEquals(this.DeliverydeviceField, value))) {
      this.DeliverydeviceField = value;
      // this.RaisePropertyChanged("Deliverydevice");
    }
  }

  get infusionComments(): string {
    return this.infusionCommentsField;
  }
  set infusionComments(value: string) {
    if ((this.referenceEquals(this.infusionCommentsField, value))) {
      this.infusionCommentsField = value;
      // this.RaisePropertyChanged("infusionComments");
    }
  }

  get infusionReasonCode(): string {
    return this.infusionReasonCodeField;
  }
  set infusionReasonCode(value: string) {
    if ((this.referenceEquals(this.infusionReasonCodeField, value))) {
      this.infusionReasonCodeField = value;
      // this.RaisePropertyChanged("infusionReasonCode");
    }
  }

  get InfusionRate(): string {
    return this.InfusionRateField;
  }
  set InfusionRate(value: string) {
    if ((this.referenceEquals(this.InfusionRateField, value))) {
      this.InfusionRateField = value;
      // this.RaisePropertyChanged("InfusionRate");
    }
  }

  get InfusionRateUOM(): UOM {
    return this.InfusionRateUOMField;
  }
  set InfusionRateUOM(value: UOM) {
    if ((this.referenceEquals(this.InfusionRateUOMField, value))) {
      this.InfusionRateUOMField = value;
      // this.RaisePropertyChanged("InfusionRateUOM");
    }
  }

  get InfusionRatePerUOM(): UOM {
    return this.InfusionRatePerUOMField;
  }
  set InfusionRatePerUOM(value: UOM) {
    if ((this.referenceEquals(this.InfusionRatePerUOMField, value))) {
      this.InfusionRatePerUOMField = value;
      // this.RaisePropertyChanged("InfusionRatePerUOM");
    }
  }

  get DripRate(): string {
    return this.DripRateField;
  }
  set DripRate(value: string) {
    if ((this.referenceEquals(this.DripRateField, value))) {
      this.DripRateField = value;
      // this.RaisePropertyChanged("DripRate");
    }
  }

  get DripRateUOM(): UOM {
    return this.DripRateUOMField;
  }
  set DripRateUOM(value: UOM) {
    if ((this.referenceEquals(this.DripRateUOMField, value))) {
      this.DripRateUOMField = value;
      // this.RaisePropertyChanged("DripRateUOM");
    }
  }

  get DripRatePerUOM(): UOM {
    return this.DripRatePerUOMField;
  }
  set DripRatePerUOM(value: UOM) {
    if ((this.referenceEquals(this.DripRatePerUOMField, value))) {
      this.DripRatePerUOMField = value;
      // this.RaisePropertyChanged("DripRatePerUOM");
    }
  }

  get TopUpDose(): string {
    return this.TopUpDoseField;
  }
  set TopUpDose(value: string) {
    if ((this.referenceEquals(this.TopUpDoseField, value))) {
      this.TopUpDoseField = value;
      // this.RaisePropertyChanged("TopUpDose");
    }
  }

  get TopUpDoseUOM(): UOM {
    return this.TopUpDoseUOMField;
  }
  set TopUpDoseUOM(value: UOM) {
    if ((this.referenceEquals(this.TopUpDoseUOMField, value))) {
      this.TopUpDoseUOMField = value;
      // this.RaisePropertyChanged("TopUpDoseUOM");
    }
  }

  get INFTYCode(): string {
    return this.INFTYCodeField;
  }
  set INFTYCode(value: string) {
    if ((this.referenceEquals(this.INFTYCodeField, value))) {
      this.INFTYCodeField = value;
      // this.RaisePropertyChanged("INFTYCode");
    }
  }

  get PrescriptionItemOID(): number {
    return this.PrescriptionItemOIDField;
  }
  set PrescriptionItemOID(value: number) {
    if ((this.PrescriptionItemOIDField != (value))) {
      this.PrescriptionItemOIDField = value;
      // this.RaisePropertyChanged("PrescriptionItemOID");
    }
  }

  get DoseDiscReasonCode(): string {
    return this.DoseDiscReasonCodeField;
  }
  set DoseDiscReasonCode(value: string) {
    if ((this.referenceEquals(this.DoseDiscReasonCodeField, value))) {
      this.DoseDiscReasonCodeField = value;
      // this.RaisePropertyChanged("DoseDiscReasonCode");
    }
  }

  get oInfusionBagDetail(): InfusionBagDetail {
    return this.oInfusionBagDetailField;
  }
  set oInfusionBagDetail(value: InfusionBagDetail) {
    if ((this.referenceEquals(this.oInfusionBagDetailField, value))) {
      this.oInfusionBagDetailField = value;
      // this.RaisePropertyChanged("oInfusionBagDetail");
    }
  }

  get WitnessedBy(): string {
    return this.WitnessedByField;
  }
  set WitnessedBy(value: string) {
    if ((this.referenceEquals(this.WitnessedByField, value))) {
      this.WitnessedByField = value;
      // this.RaisePropertyChanged("WitnessedBy");
    }
  }

  get IsWitness(): boolean {
    return this.IsWitnessField;
  }
  set IsWitness(value: boolean) {
    if ((this.IsWitnessField != (value))) {
      this.IsWitnessField = value;
      // this.RaisePropertyChanged("IsWitness");
    }
  }

  get MedAdminOID(): number {
    return this.MedAdminOIDField;
  }
  set MedAdminOID(value: number) {
    if ((this.MedAdminOIDField != (value))) {
      this.MedAdminOIDField = value;
      // this.RaisePropertyChanged("MedAdminOID");
    }
  }

  get InfusionAdministeredAt(): DateTime {
    return this.InfusionAdministeredAtField;
  }
  set InfusionAdministeredAt(value: DateTime) {
    if ((this.InfusionAdministeredAtField != (value))) {
      this.InfusionAdministeredAtField = value;
      // this.RaisePropertyChanged("InfusionAdministeredAt");
    }
  }

  get InfusionAdministeredBy(): string {
    return this.InfusionAdministeredByField;
  }
  set InfusionAdministeredBy(value: string) {
    if ((this.referenceEquals(this.InfusionAdministeredByField, value))) {
      this.InfusionAdministeredByField = value;
      // this.RaisePropertyChanged("InfusionAdministeredBy");
    }
  }

  get AdministeredByCPOID(): number {
    return this.AdministeredByCPOIDField;
  }
  set AdministeredByCPOID(value: number) {
    if ((this.AdministeredByCPOIDField != (value))) {
      this.AdministeredByCPOIDField = value;
      // this.RaisePropertyChanged("AdministeredByCPOID");
    }
  }

  get RecordedByUserOID(): number {
    return this.RecordedByUserOIDField;
  }
  set RecordedByUserOID(value: number) {
    if ((this.RecordedByUserOIDField != (value))) {
      this.RecordedByUserOIDField = value;
      // this.RaisePropertyChanged("RecordedByUserOID");
    }
  }

  get ActionTermText(): string {
    return this.ActionTermTextField;
  }
  set ActionTermText(value: string) {
    if ((this.referenceEquals(this.ActionTermTextField, value))) {
      this.ActionTermTextField = value;
      // this.RaisePropertyChanged("ActionTermText");
    }
  }

  get Dose(): string {
    return this.DoseField;
  }
  set Dose(value: string) {
    if ((this.referenceEquals(this.DoseField, value))) {
      this.DoseField = value;
      // this.RaisePropertyChanged("Dose");
    }
  }

  get DoseUOMOID(): number {
    return this.DoseUOMOIDField;
  }
  set DoseUOMOID(value: number) {
    if ((this.DoseUOMOIDField != (value))) {
      this.DoseUOMOIDField = value;
      // this.RaisePropertyChanged("DoseUOMOID");
    }
  }

  get AdminComments(): string {
    return this.AdminCommentsField;
  }
  set AdminComments(value: string) {
    if ((this.referenceEquals(this.AdminCommentsField, value))) {
      this.AdminCommentsField = value;
      // this.RaisePropertyChanged("AdminComments");
    }
  }

  get MedAdminInfusionOID(): number {
    return this.MedAdminInfusionOIDField;
  }
  set MedAdminInfusionOID(value: number) {
    if ((this.MedAdminInfusionOIDField != (value))) {
      this.MedAdminInfusionOIDField = value;
      // this.RaisePropertyChanged("MedAdminInfusionOID");
    }
  }

  get Humidification(): string {
    return this.HumidificationField;
  }
  set Humidification(value: string) {
    if ((this.referenceEquals(this.HumidificationField, value))) {
      this.HumidificationField = value;
      // this.RaisePropertyChanged("Humidification");
    }
  }

  get Route(): ObjectInfo {
    return this.RouteField;
  }
  set Route(value: ObjectInfo) {
    if ((this.referenceEquals(this.RouteField, value))) {
      this.RouteField = value;
      // this.RaisePropertyChanged("Route");
    }
  }

  get ConcentrationStrength(): string {
    return this.ConcentrationStrengthField;
  }
  set ConcentrationStrength(value: string) {
    if ((this.referenceEquals(this.ConcentrationStrengthField, value))) {
      this.ConcentrationStrengthField = value;
      // this.RaisePropertyChanged("ConcentrationStrength");
    }
  }

  get ConcentrationStrengthUOM(): UOM {
    return this.ConcentrationStrengthUOMField;
  }
  set ConcentrationStrengthUOM(value: UOM) {
    if ((this.referenceEquals(this.ConcentrationStrengthUOMField, value))) {
      this.ConcentrationStrengthUOMField = value;
      // this.RaisePropertyChanged("ConcentrationStrengthUOM");
    }
  }

  get ConcentrationVolume(): string {
    return this.ConcentrationVolumeField;
  }
  set ConcentrationVolume(value: string) {
    if ((this.referenceEquals(this.ConcentrationVolumeField, value))) {
      this.ConcentrationVolumeField = value;
      // this.RaisePropertyChanged("ConcentrationVolume");
    }
  }

  get ConcentrationVolumeUOM(): UOM {
    return this.ConcentrationVolumeUOMField;
  }
  set ConcentrationVolumeUOM(value: UOM) {
    if ((this.referenceEquals(this.ConcentrationVolumeUOMField, value))) {
      this.ConcentrationVolumeUOMField = value;
      // this.RaisePropertyChanged("ConcentrationVolumeUOM");
    }
  }

  get PreviousConcentration(): string {
    return this.PreviousConcentrationField;
  }
  set PreviousConcentration(value: string) {
    if ((this.referenceEquals(this.PreviousConcentrationField, value))) {
      this.PreviousConcentrationField = value;
      // this.RaisePropertyChanged("PreviousConcentration");
    }
  }

  get IsInfusionRateRangeProvided(): boolean {
    return this.IsInfusionRateRangeProvidedField;
  }
  set IsInfusionRateRangeProvided(value: boolean) {
    if ((this.IsInfusionRateRangeProvidedField != (value))) {
      this.IsInfusionRateRangeProvidedField = value;
      // this.RaisePropertyChanged("IsInfusionRateRangeProvided");
    }
  }

  get InfusionDose(): string {
    return this.InfusionDoseField;
  }
  set InfusionDose(value: string) {
    if ((this.referenceEquals(this.InfusionDoseField, value))) {
      this.InfusionDoseField = value;
      // this.RaisePropertyChanged("InfusionDose");
    }
  }


  get InfusionDoseUOM(): string {
    return this.InfusionDoseUOMField;
  }
  set InfusionDoseUOM(value: string) {
    if ((this.referenceEquals(this.InfusionDoseUOMField, value))) {
      this.InfusionDoseUOMField = value;
      // this.RaisePropertyChanged("InfusionDoseUOM");
    }
  }

  get InfusionDoseUOMNumerator(): UOM {
    return this.InfusionDoseUOMNumeratorField;
  }
  set InfusionDoseUOMNumerator(value: UOM) {
    if ((this.referenceEquals(this.InfusionDoseUOMNumeratorField, value))) {
      this.InfusionDoseUOMNumeratorField = value;
      // this.RaisePropertyChanged("InfusionDoseUOMNumerator");
    }
  }

  get InfusionDoseUOMDenominator(): UOM {
    return this.InfusionDoseUOMDenominatorField;
  }
  set InfusionDoseUOMDenominator(value: UOM) {
    if ((this.referenceEquals(this.InfusionDoseUOMDenominatorField, value))) {
      this.InfusionDoseUOMDenominatorField = value;
      // this.RaisePropertyChanged("InfusionDoseUOMDenominator");
    }
  }

  get DoseDiscComments(): string {
    return this.DoseDiscCommentsField;
  }
  set DoseDiscComments(value: string) {
    if ((this.referenceEquals(this.DoseDiscCommentsField, value))) {
      this.DoseDiscCommentsField = value;
      // this.RaisePropertyChanged("DoseDiscComments");
    }
  }

  get IsEndTimeRecalculated(): boolean {
    return this.IsEndTimeRecalculatedField;
  }
  set IsEndTimeRecalculated(value: boolean) {
    if ((this.IsEndTimeRecalculatedField != (value))) {
      this.IsEndTimeRecalculatedField = value;
      // this.RaisePropertyChanged("IsEndTimeRecalculated");
    }
  }

  get MedAdminHistoryOID(): number {
    return this.MedAdminHistoryOIDField;
  }
  set MedAdminHistoryOID(value: number) {
    if ((this.MedAdminHistoryOIDField != (value))) {
      this.MedAdminHistoryOIDField = value;
      // this.RaisePropertyChanged("MedAdminHistoryOID");
    }
  }

  get IsStruckout(): string {
    return this.IsStruckoutField;
  }
  set IsStruckout(value: string) {
    this.IsStruckoutField = value;
    // this.RaisePropertyChanged("IsStruckout");
  }

  get IsMedScannedProduct(): string {
    return this.IsMedScannedProductField;
  }
  set IsMedScannedProduct(value: string) {
    this.IsMedScannedProductField = value;
    // this.RaisePropertyChanged("IsMedScannedProduct");
  }
}
export class MedsScanProductDetails extends CLZOObject {
  private scanProductDoseField = '';
  private scanProductDoseUomLZOIDField = '';
  private medAdminOIDField = 0;
  private prescriptionitemOIDField = 0;
  private scanProductLZOIDField = '';
  private productCodeField = '';
  private expiryDTTMField: Date = new Date();
  private batchNumberField = '';
  private serialNumberField = '';
  private isProductScannedField = '';
  private medAdminHistoryOIDField = 0;
  private isStruckoutField = '';
  private partKeyField = 0;
  private createdByField = 0;
  private modifiedByField = 0;
  private sourceOIDField = '';
  private sourceTypeField = '';
  private ownerOrganisationOIDField = 0;
  //BNS HIMS OVERRIDE
  private medBarCodeOverrideDetailsField: CMedBarcodeScanOverrideDetail[] = []
  private MedAdminInfusionDetailOIDField = 0;
  private CommentsField = '';
  private TotalDoseAdministeredField = '';
  private TotalDoseAdministeredUOMLZOIDField = '';
  /// <remarks/>
  public get ScanProductDose(): string {
    return this.scanProductDoseField;
  }
  public set ScanProductDose(value: string) {
    this.scanProductDoseField = value;
    // this.RaisePropertyChanged("ScanProductDose");
  }
  public get ScanProductDoseUomLZOID(): string {
    return this.scanProductDoseUomLZOIDField;
  }
  public set ScanProductDoseUomLZOID(value: string) {
    this.scanProductDoseUomLZOIDField = value;
    // this.RaisePropertyChanged("ScanProductDoseUomLZOID");
  }
  /// <remarks/>

  public get MedAdminOID(): number {
    return this.medAdminOIDField;
  }
  public set MedAdminOID(value: number) {
    this.medAdminOIDField = value;
    //  this.RaisePropertyChanged("MedAdminOID");
  }
  /// <remarks/>
  public get PrescriptionitemOID(): number {
    return this.prescriptionitemOIDField;
  }
  public set PrescriptionitemOID(value: number) {
    this.prescriptionitemOIDField = value;
    // this.RaisePropertyChanged("PrescriptionitemOID");
  }

  public get ScanProductLZOID(): string {
    return this.scanProductLZOIDField;
  }
  public set ScanProductLZOID(value: string) {
    this.scanProductLZOIDField = value;
    //this.RaisePropertyChanged("ScanProductLZOID");
  }

  public get ProductCode(): string {
    return this.productCodeField;
  }
  public set ProductCode(value: string) {
    this.productCodeField = value;
    //  this.RaisePropertyChanged("ProductCode");
  }

  public get ExpiryDTTM(): Date {
    return this.expiryDTTMField;
  }
  public set ExpiryDTTM(value: Date) {
    this.expiryDTTMField = value;
    //   this.RaisePropertyChanged("ExpiryDTTM");
  }

  public get BatchNumber(): string {
    return this.batchNumberField;
  }
  public set BatchNumber(value: string) {
    this.batchNumberField = value;
    // this.RaisePropertyChanged("BatchNumber");
  }

  public get SerialNumber(): string {
    return this.serialNumberField;
  }
  public set SerialNumber(value: string) {
    this.serialNumberField = value;
    //  this.RaisePropertyChanged("SerialNumber");
  }

  public get IsProductScanned(): string {
    return this.isProductScannedField;
  }
  public set IsProductScanned(value: string) {
    this.isProductScannedField = value;
    //  this.RaisePropertyChanged("IsProductScanned");
  }

  public get MedAdminHistoryOID(): number {
    return this.medAdminHistoryOIDField;
  }
  public set MedAdminHistoryOID(value: number) {
    this.medAdminHistoryOIDField = value;
    // this.RaisePropertyChanged("MedAdminHistoryOID");
  }

  public get IsStruckout(): string {
    return this.isStruckoutField;
  }
  public set IsStruckout(value: string) {
    this.isStruckoutField = value;
    //  this.RaisePropertyChanged("IsStruckout");
  }

  public get OwnerOrganisationOID(): number {
    return this.ownerOrganisationOIDField;
  }
  public set OwnerOrganisationOID(value: number) {
    this.ownerOrganisationOIDField = value;
    //this.RaisePropertyChanged("OwnerOrganisationOID");
  }
  public get MedBarCodeOverrideDetails(): CMedBarcodeScanOverrideDetail[] {
    return this.medBarCodeOverrideDetailsField;
  }
  public set MedBarCodeOverrideDetails(value: CMedBarcodeScanOverrideDetail[]) {
    this.medBarCodeOverrideDetailsField = value;
    //   this.RaisePropertyChanged("MedBarCodeOverrideDetails");
  }



  public get MedAdminInfusionDetailOID(): number {
    return this.MedAdminInfusionDetailOIDField;
  }
  public set MedAdminInfusionDetailOID(value: number) {
    this.MedAdminInfusionDetailOIDField = value;
    // this.RaisePropertyChanged("MedAdminInfusionDetailOID");
  }
  public get Comments(): string {
    return this.CommentsField;
  }

  public set Comments(value: string) {
    this.CommentsField = value;
    //this.RaisePropertyChanged("Comments");
  }

  public get TotalDoseAdministered(): string {
    return this.TotalDoseAdministeredField;
  }
  public set TotalDoseAdministered(value: string) {
    this.TotalDoseAdministeredField = value;
    //  this.RaisePropertyChanged("TotalDoseAdministered");
  }

  public get TotalDoseAdministeredUOMLZOID(): string {
    return this.TotalDoseAdministeredUOMLZOIDField;
  }
  public set TotalDoseAdministeredUOMLZOID(value: string) {
    this.TotalDoseAdministeredUOMLZOIDField = value;
    // this.RaisePropertyChanged("TotalDoseAdministeredUOMLZOID");
  }

}
export class CMedBarcodeScanOverrideDetail extends CLZOObject {
  private identifyingOIDField = 0;
  private identifyingTypeField = '';
  private encounterOIDField = 0;
  private serviceOIDField = 0;
  private overrideReasonTypeField = '';
  private overrideByUserOIDField = 0;
  private overrideDTTMField: Date = new Date();
  private overrideScanReasonField = '';
  private commentsField = '';
  public get IdentifyingOID(): number {
    return this.identifyingOIDField;
  }
  public set IdentifyingOID(value: number) {
    this.identifyingOIDField = value;
    // this.RaisePropertyChanged("IdentifyingOID");
  }
  public get IdentifyingType(): string {
    return this.identifyingTypeField;
  }
  public set IdentifyingType(value: string) {
    this.identifyingTypeField = value;
    // this.RaisePropertyChanged("identifyingType");
  }
  public get EncounterOID(): number {
    return this.encounterOIDField;
  }
  public set EncounterOID(value: number) {
    this.encounterOIDField = value;
    // this.RaisePropertyChanged("EncounterOID");
  }

  public get ServiceOID(): number {
    return this.serviceOIDField;
  }
  public set ServiceOID(value: number) {
    this.serviceOIDField = value;
    // this.RaisePropertyChanged("ServiceOID");
  }
  public get OverrideReasonType(): string {
    return this.overrideReasonTypeField;
  }
  public set OverrideReasonType(value: string) {
    this.overrideReasonTypeField = value;
    //  this.RaisePropertyChanged("OverrideReasonType");
  }
  public get OverrideByUserOID(): number {
    return this.overrideByUserOIDField;
  }
  public set OverrideByUserOID(value: number) {
    this.overrideByUserOIDField = value;
    // this.RaisePropertyChanged("OverrideByUserOID");
  }

  public get OverrideDTTM(): Date {
    return this.overrideDTTMField;
  }
  public set OverrideDTTM(value: Date) {
    this.overrideDTTMField = value;
    //  this.RaisePropertyChanged("OverrideDTTM");
  }


  public get OverrideScanReason(): string {
    return this.overrideScanReasonField;
  }
  public set OverrideScanReason(value: string) {
    this.overrideScanReasonField = value;
    // this.RaisePropertyChanged("OverrideScanReason");
  }

  public get Comments(): string {
    return this.commentsField;
  }
  public set Comments(value: string) {
    this.commentsField = value;
    //this.RaisePropertyChanged("Comments");
  }
}