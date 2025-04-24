export class CLZOObject {
    private OperationModeField = '';
    private LastModifiedAtField = new Date();
    private SealTypeField = '';
    private SealImageField = '';
    private SealRecordListField = '';
    private SealImageListField = '';
    private EPRFilterListField = '';

    public get OperationMode(): string {
        return this.OperationModeField;
    }
    public set OperationMode(value: string) {
        if ((Object.is(this.OperationModeField, value) != true)) {
            this.OperationModeField = value;
        }
    }

    public get LastModifiedAt(): Date {
        return this.LastModifiedAtField;
    }
    public set LastModifiedAt(value: Date) {
        if (this.LastModifiedAtField != value) {
            this.LastModifiedAtField = value;
        }
    }

    public get SealType(): string {
        return this.SealTypeField;
    }
    public set SealType(value: string) {
        if ((Object.is(this.SealTypeField, value) != true)) {
            this.SealTypeField = value;
        }
    }

    public get SealImage(): string {
        return this.SealImageField;
    }
    public set SealImage(value: string) {
        if ((Object.is(this.SealImageField, value) != true)) {
            this.SealImageField = value;
        }
    }

    public get SealRecordList(): string {
        return this.SealRecordListField;
    }
    public set SealRecordList(value: string) {
        if ((Object.is(this.SealRecordListField, value) != true)) {
            this.SealRecordListField = value;
        }
    }

    public get SealImageList(): string {
        return this.SealImageListField;
    }
    public set SealImageList(value: string) {
        if ((Object.is(this.SealImageListField, value) != true)) {
            this.SealImageListField = value;
        }
    }

    public get EPRFilterList(): string {
        return this.EPRFilterListField;
    }
    public set EPRFilterList(value: string) {
        if ((Object.is(this.EPRFilterListField, value) != true)) {
            this.EPRFilterListField = value;
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

    public get p(): string {
        return this.pField;
    }
    public set p(value: string) {
        if ((Object.is(this.pField, value) != true)) {
            this.pField = value;
        }
    }

    public get q(): string {
        return this.qField;
    }
    public set q(value: string) {
        if ((Object.is(this.qField, value) != true)) {
            this.qField = value;
        }
    }

    public get r(): string {
        return this.rField;
    }
    public set r(value: string) {
        if ((Object.is(this.rField, value) != true)) {
            this.rField = value;
        }
    }

    public get s(): string {
        return this.sField;
    }
    public set s(value: string) {
        if ((Object.is(this.sField, value) != true)) {
            this.sField = value;
        }
    }

    public get t(): string {
        return this.tField;
    }
    public set t(value: string) {
        if ((Object.is(this.tField, value) != true)) {
            this.tField = value;
        }
    }

    public get y(): string {
        return this.yField;
    }
    public set y(value: string) {
        if ((Object.is(this.yField, value) != true)) {
            this.yField = value;
        }
    }

    public get IdentifyingOID(): number {
        return this.IdentifyingOIDField;
    }
    public set IdentifyingOID(value: number) {
        if ((this.IdentifyingOIDField != value)) {
            this.IdentifyingOIDField = value;
        }
    }

    public get IdentifyingType(): string {
        return this.IdentifyingTypeField;
    }
    public set IdentifyingType(value: string) {
        if ((Object.is(this.IdentifyingTypeField, value) != true)) {
            this.IdentifyingTypeField = value;
        }
    }

    public get IdentifyingName(): string {
        return this.IdentifyingNameField;
    }
    public set IdentifyingName(value: string) {
        if ((Object.is(this.IdentifyingNameField, value) != true)) {
            this.IdentifyingNameField = value;
        }
    }

    public get PrescribableItemListOID(): number {
        return this.PrescribableItemListOIDField;
    }
    public set PrescribableItemListOID(value: number) {
        if ((this.PrescribableItemListOIDField != value)) {
            this.PrescribableItemListOIDField = value;
        }
    }

    public get MCVersionNo(): string {
        return this.MCVersionNoField;
    }
    public set MCVersionNo(value: string) {
        if ((Object.is(this.MCVersionNoField, value) != true)) {
            this.MCVersionNoField = value;
        }
    }

    public get IsAccessContraint(): string {
        return this.IsAccessContraintField;
    }
    public set IsAccessContraint(value: string) {
        if ((Object.is(this.IsAccessContraintField, value) != true)) {
            this.IsAccessContraintField = value;
        }
    }

    public get IsPrescribeByBrand(): string {
        return this.IsPrescribeByBrandField;
    }
    public set IsPrescribeByBrand(value: string) {
        if ((Object.is(this.IsPrescribeByBrandField, value) != true)) {
            this.IsPrescribeByBrandField = value;
        }
    }

    public get FormularyNote(): string {
        return this.FormularyNoteField;
    }
    public set FormularyNote(value: string) {
        if ((Object.is(this.FormularyNoteField, value) != true)) {
            this.FormularyNoteField = value;
        }
    }

    public get ItemType(): string {
        return this.ItemTypeField;
    }
    public set ItemType(value: string) {
        if ((Object.is(this.ItemTypeField, value) != true)) {
            this.ItemTypeField = value;
        }
    }

    public get RouteOID(): number {
        return this.RouteOIDField;
    }
    public set RouteOID(value: number) {
        if ((this.RouteOIDField != value)) {
            this.RouteOIDField = value;
        }
    }

    public get FormOID(): number {
        return this.FormOIDField;
    }
    public set FormOID(value: number) {
        if ((this.FormOIDField != value)) {
            this.FormOIDField = value;
        }
    }

    public get IsTechValidateCA(): string {
        return this.IsTechValidateCAField;
    }
    public set IsTechValidateCA(value: string) {
        if ((this.IsTechValidateCAField != value)) {
            this.IsTechValidateCAField = value;
        }
    }

    public get LorenzoID(): string {
        return this.LorenzoIDField;
    }
    public set LorenzoID(value: string) {
        if ((Object.is(this.LorenzoIDField, value) != true)) {
            this.LorenzoIDField = value;
        }
    }

    public get NonCatItemReason(): string {
        return this.NonCatItemReasonField;
    }
    public set NonCatItemReason(value: string) {
        if ((Object.is(this.NonCatItemReasonField, value) != true)) {
            this.NonCatItemReasonField = value;
        }
    }

    public get TechQtyUomName(): string {
        return this.TechQtyUomNameField;
    }
    public set TechQtyUomName(value: string) {
        if ((Object.is(this.TechQtyUomNameField, value) != true)) {
            this.TechQtyUomNameField = value;
        }
    }

    public get IsControllDrug(): string {
        return this.IsControllDrugField;
    }
    public set IsControllDrug(value: string) {
        if ((Object.is(this.IsControllDrugField, value) != true)) {
            this.IsControllDrugField = value;
        }
    }

    public get ITMSUBTYP(): string {
        return this.ITMSUBTYPField;
    }
    public set ITMSUBTYP(value: string) {
        if ((Object.is(this.ITMSUBTYPField, value) != true)) {
            this.ITMSUBTYPField = value;
        }
    }

    public get SourceDataProviderType(): string {
        return this.SourceDataProviderTypeField;
    }
    public set SourceDataProviderType(value: string) {
        if ((Object.is(this.SourceDataProviderTypeField, value) != true)) {
            this.SourceDataProviderTypeField = value;
        }
    }

    public get AliasName(): string {
        return this.AliasNameField;
    }
    public set AliasName(value: string) {
        if ((Object.is(this.AliasNameField, value) != true)) {
            this.AliasNameField = value;
        }
    }

    public get PrescriptionItemId(): string {
        return this.PrescriptionItemIdField;
    }
    public set PrescriptionItemId(value: string) {
        if ((Object.is(this.PrescriptionItemIdField, value) != true)) {
            this.PrescriptionItemIdField = value;
        }
    }

    public get ConflictUniqueId(): string {
        return this.ConflictUniqueIdField;
    }
    public set ConflictUniqueId(value: string) {
        if ((Object.is(this.ConflictUniqueIdField, value) != true)) {
            this.ConflictUniqueIdField = value;
        }
    }

}

export class AvailabilityStatus extends CLZOObject {
    private CodeField = '';
    private StatusField = '';
    private CountField = 0;

    public get Code(): string {
        return this.CodeField;
    }

    public set Code(value: string) {
        if ((Object.is(this.CodeField, value) != true)) {
            this.CodeField = value;
        }
    }

    public get Status(): string {
        return this.StatusField;
    }
    public set Status(value: string) {
        if ((this.StatusField != value)) {
            this.StatusField = value;
        }
    }

    public get Count(): number {
        return this.CountField;
    }
    public set Count(value: number) {
        if ((this.CountField != value)) {
            this.CountField = value;
        }
    }

}

export class PrescriptionBasicData extends CLZOObject {
    private OIDField = 0;
    private PrescriptionNumberField = '';
    private PrescriptionTypeField = '';
    private PrescriptionDTTMField = new Date();
    private PatientOIDField = 0;
    private EncounterOIDField = 0;
    private SpecialtyField!: ObjectInfo;
    private PrescriberDetailsField!: ObjectInfo;
    private PrescriberRoleField!: ObjectInfo;
    private CareProviderField!: ObjectInfo;
    private PrescriptionStatusField = '';
    private IsMergedPatientField = '';

    public get OID(): number {
        return this.OIDField;
    }
    public set OID(value: number) {
        if ((this.OIDField != value)) {
            this.OIDField = value;
        }
    }

    public get PrescriptionNumber(): string {
        return this.PrescriptionNumberField;
    }

    public set PrescriptionNumber(value: string) {
        if ((Object.is(this.PrescriptionNumberField, value) != true)) {
            this.PrescriptionNumberField = value;
        }
    }

    public get PrescriptionType(): string {
        return this.PrescriptionTypeField;
    }

    public set PrescriptionType(value: string) {
        if ((Object.is(this.PrescriptionTypeField, value) != true)) {
            this.PrescriptionTypeField = value;
        }
    }

    public get PrescriptionDTTM(): Date {
        return this.PrescriptionDTTMField;
    }
    public set PrescriptionDTTM(value: Date) {
        if ((this.PrescriptionDTTMField != value)) {
            this.PrescriptionDTTMField = value;
        }
    }

    public get PatientOID(): number {
        return this.PatientOIDField;
    }
    public set PatientOID(value: number) {
        if ((this.PatientOIDField != value)) {
            this.PatientOIDField = value;
        }
    }

    public get EncounterOID(): number {
        return this.EncounterOIDField;
    }
    public set EncounterOID(value: number) {
        if ((this.EncounterOIDField != value)) {
            this.EncounterOIDField = value;
        }
    }

    public get Specialty(): ObjectInfo {
        return this.SpecialtyField;
    }

    public set Specialty(value: ObjectInfo) {
        if ((Object.is(this.SpecialtyField, value) != true)) {
            this.SpecialtyField = value;
        }
    }

    public get PrescriberDetails(): ObjectInfo {
        return this.PrescriberDetailsField;
    }

    public set PrescriberDetails(value: ObjectInfo) {
        if ((Object.is(this.PrescriberDetailsField, value) != true)) {
            this.PrescriberDetailsField = value;
        }
    }

    public get PrescriberRole(): ObjectInfo {
        return this.PrescriberRoleField;
    }

    public set PrescriberRole(value: ObjectInfo) {
        if ((Object.is(this.PrescriberRoleField, value) != true)) {
            this.PrescriberRoleField = value;
        }
    }

    public get CareProvider(): ObjectInfo {
        return this.CareProviderField;
    }

    public set CareProvider(value: ObjectInfo) {
        if ((Object.is(this.CareProviderField, value) != true)) {
            this.CareProviderField = value;
        }
    }

    public get PrescriptionStatus(): string {
        return this.PrescriptionStatusField;
    }

    public set PrescriptionStatus(value: string) {
        if ((Object.is(this.PrescriptionStatusField, value) != true)) {
            this.PrescriptionStatusField = value;
        }
    }

    public get IsMergedPatient(): string {
        return this.IsMergedPatientField;
    }

    public set IsMergedPatient(value: string) {
        if ((Object.is(this.IsMergedPatientField, value) != true)) {
            this.IsMergedPatientField = value;
        }
    }

}

export class Prescription extends PrescriptionBasicData {
    private PrintStatusField='';
    private StaioneryTypeField!: ObjectInfo;
    private ClerkingSourceField = '';
    private ServicePointField!: ObjectInfo;
    private LocationField!: ObjectInfo;
    private TeamMembersOIDField!: ArrayOfLong;
    private IsPGDField = '';
    private HealthOrganisationField!: ObjectInfo;
    private PrescriptionAvailabilityStatusField!: Array<AvailabilityStatus>;
    private PrescriptionItemsField!: Array<PrescriptionItemDetails>;
    private MCVersionNoField = '';
    private TeamOIDField = 0;
    private IsIntrayField = '';
    private ChoosePrinterField = '';

    public get PrintStatus(): string {
        return this.PrintStatusField;
    }

    public set PrintStatus(value: string) {
        if ((Object.is(this.PrintStatusField, value) != true)) {
            this.PrintStatusField = value;
        }
    }

    public get StaioneryType(): ObjectInfo {
        return this.StaioneryTypeField;
    }

    public set StaioneryType(value: ObjectInfo) {
        if ((Object.is(this.StaioneryTypeField, value) != true)) {
            this.StaioneryTypeField = value;
        }
    }

    public get ClerkingSource(): string {
        return this.ClerkingSourceField;
    }

    public set ClerkingSource(value: string) {
        if ((Object.is(this.ClerkingSourceField, value) != true)) {
            this.ClerkingSourceField = value;
        }
    }

    public get ServicePoint(): ObjectInfo {
        return this.ServicePointField;
    }

    public set ServicePoint(value: ObjectInfo) {
        if ((Object.is(this.ServicePointField, value) != true)) {
            this.ServicePointField = value;
        }
    }

    public get Location(): ObjectInfo {
        return this.LocationField;
    }

    public set Location(value: ObjectInfo) {
        if ((Object.is(this.LocationField, value) != true)) {
            this.LocationField = value;
        }
    }

    public get TeamMembersOID(): ArrayOfLong {
        return this.TeamMembersOIDField;
    }

    public set TeamMembersOID(value: ArrayOfLong) {
        if ((Object.is(this.TeamMembersOIDField, value) != true)) {
            this.TeamMembersOIDField = value;
        }
    }

    public get IsPGD(): string {
        return this.IsPGDField;
    }
    public set IsPGD(value: string) {
        if ((this.IsPGDField != value)) {
            this.IsPGDField = value;
        }
    }

    public get HealthOrganisation(): ObjectInfo {
        return this.HealthOrganisationField;
    }

    public set HealthOrganisation(value: ObjectInfo) {
        if ((Object.is(this.HealthOrganisationField, value) != true)) {
            this.HealthOrganisationField = value;
        }
    }

    public get PrescriptionAvailabilityStatus(): Array<AvailabilityStatus> {
        return this.PrescriptionAvailabilityStatusField;
    }

    public set PrescriptionAvailabilityStatus(value: Array<AvailabilityStatus>) {
        if ((Object.is(this.PrescriptionAvailabilityStatusField, value) != true)) {
            this.PrescriptionAvailabilityStatusField = value;
        }
    }

    public get PrescriptionItems(): Array<PrescriptionItemDetails> {
        return this.PrescriptionItemsField;
    }

    public set PrescriptionItems(value: Array<PrescriptionItemDetails>) {
        if ((Object.is(this.PrescriptionItemsField, value) != true)) {
            this.PrescriptionItemsField = value;
        }
    }

    public get MCVersionNo(): string {
        return this.MCVersionNoField;
    }

    public set MCVersionNo(value: string) {
        if ((Object.is(this.MCVersionNoField, value) != true)) {
            this.MCVersionNoField = value;
        }
    }

    public get TeamOID(): number {
        return this.TeamOIDField;
    }
    public set TeamOID(value: number) {
        if ((this.TeamOIDField != value)) {
            this.TeamOIDField = value;
        }
    }

    public get IsIntray(): string {
        return this.IsIntrayField;
    }

    public set IsIntray(value: string) {
        if ((Object.is(this.IsIntrayField, value) != true)) {
            this.IsIntrayField = value;
        }
    }

    public get ChoosePrinter(): string {
        return this.ChoosePrinterField;
    }

    public set ChoosePrinter(value: string) {
        if ((Object.is(this.ChoosePrinterField, value) != true)) {
            this.ChoosePrinterField = value;
        }
    }

}


export class PrescriptionItemBasicData extends DrugItemBasicData {
    private SNOMEDCodeField = '';
    private OIDField = 0;
    private PrescriptionItemNumberField = '';
    private IsAdministeredField = '';
    private StartDTTMField = new Date()
    private PartialStartDTTMField = '';
    private EndDTTMField = new Date()
    private PrescriptionItemStatusField = '';
    private StatusModifedDTTMField = new Date();
    private HealthOrganisationField!: ObjectInfo;
    private PrescriptionBasicDataField!: Prescription;
    private IsControlledDrugField = '';

    public get SNOMEDCode(): string {
        return this.SNOMEDCodeField;
    }
    public set SNOMEDCode(value: string) {
        if ((Object.is(this.SNOMEDCodeField, value) != true)) {
            this.SNOMEDCodeField = value;
        }
    }

    public get OID(): number {
        return this.OIDField;
    }
    public set OID(value: number) {
        if (this.OIDField != value) {
            this.OIDField = value;
        }
    }

    public get PrescriptionItemNumber(): string {
        return this.PrescriptionItemNumberField;
    }
    public set PrescriptionItemNumber(value: string) {
        if ((Object.is(this.PrescriptionItemNumberField, value) != true)) {
            this.PrescriptionItemNumberField = value;
        }
    }

    public get IsAdministered(): string {
        return this.IsAdministeredField;
    }
    public set IsAdministered(value: string) {
        if (this.IsAdministeredField != value) {
            this.IsAdministeredField = value;
        }
    }

    public get StartDTTM(): Date {
        return this.StartDTTMField;
    }
    public set StartDTTM(value: Date) {
        if (this.StartDTTMField != value) {
            this.StartDTTMField = value;
        }
    }

    public get PartialStartDTTM(): string {
        return this.PartialStartDTTMField;
    }
    public set PartialStartDTTM(value: string) {
        if ((Object.is(this.PartialStartDTTMField, value) != true)) {
            this.PartialStartDTTMField = value;
        }
    }

    public get EndDTTM(): Date {
        return this.EndDTTMField;
    }
    public set EndDTTM(value: Date) {
        if (this.EndDTTMField != value) {
            this.EndDTTMField = value;
        }
    }

    public get PrescriptionItemStatus(): string {
        return this.PrescriptionItemStatusField;
    }
    public set PrescriptionItemStatus(value: string) {
        if ((Object.is(this.PrescriptionItemStatusField, value) != true)) {
            this.PrescriptionItemStatusField = value;
        }
    }

    public get StatusModifedDTTM(): Date {
        return this.StatusModifedDTTMField;
    }
    public set StatusModifedDTTM(value: Date) {
        if (this.StatusModifedDTTMField != value) {
            this.StatusModifedDTTMField = value;
        }
    }

    public get HealthOrganisation(): ObjectInfo {
        return this.HealthOrganisationField;
    }
    public set HealthOrganisation(value: ObjectInfo) {
        if ((Object.is(this.HealthOrganisationField, value) != true)) {
            this.HealthOrganisationField = value;
        }
    }

    public get PrescriptionBasicData(): Prescription {
        return this.PrescriptionBasicDataField;
    }
    public set PrescriptionBasicData(value: Prescription) {
        if ((Object.is(this.PrescriptionBasicDataField, value) != true)) {
            this.PrescriptionBasicDataField = value;
        }
    }

    public get IsControlledDrug(): string {
        return this.IsControlledDrugField;
    }
    public set IsControlledDrug(value: string) {
        if (this.IsControlledDrugField != value) {
            this.IsControlledDrugField = value;
        }
    }

}

export class ObjectInfo extends CLZOObject {
    private OIDField = 0;
    private NameField = '';
    private CodeField = '';
    private RoleProfileOIDField = 0;

    public get OID(): number {
        return this.OIDField;
    }
    public set OID(value: number) {
        if ((this.OIDField != value)) {
            this.OIDField = value;
        }
    }

    public get Name(): string {
        return this.NameField;
    }

    public set Name(value: string) {
        if ((Object.is(this.NameField, value) != true)) {
            this.NameField = value;
        }
    }

    public get Code(): string {
        return this.CodeField;
    }

    public set Code(value: string) {
        if ((Object.is(this.CodeField, value) != true)) {
            this.CodeField = value;
        }
    }

    public get RoleProfileOID(): number {
        return this.RoleProfileOIDField;
    }
    public set RoleProfileOID(value: number) {
        if ((this.RoleProfileOIDField != value)) {
            this.RoleProfileOIDField = value;
        }
    }

}

// ObservableCollection<long> is an extension class for ArrayOfLong. This class is not implemented. 
export class ArrayOfLong {
}

export class PrescriptionItem extends PrescriptionItemBasicData {
    private PrescriptionNumberField = '';
    private PrescriptionOIDField = 0;
    private IsPGDField = '';
    private PrescriberDetailsField!: ObjectInfo;
    private CareProviderField!: ObjectInfo;
    private IsPRNDoseField = '';
    private SpecialtyField = '';
    private IsDrugApprovalRequiredField = '';
    private DrugApproverRoleOIDField!: ArrayOfLong;
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

    public get PrescriptionNumber(): string {
        return this.PrescriptionNumberField;
    }

    public set PrescriptionNumber(value: string) {
        if ((Object.is(this.PrescriptionNumberField, value) != true)) {
            this.PrescriptionNumberField = value;
        }
    }

    public get PrescriptionOID(): number {
        return this.PrescriptionOIDField;
    }

    public set PrescriptionOID(value: number) {
        if (this.PrescriptionOIDField != value) {
            this.PrescriptionOIDField = value;
        }
    }

    public get IsPGD(): string {
        return this.IsPGDField;
    }

    public set IsPGD(value: string) {
        if (this.IsPGDField != value) {
            this.IsPGDField = value;
        }
    }

    public get PrescriberDetails(): ObjectInfo {
        return this.PrescriberDetailsField;
    }

    public set PrescriberDetails(value: ObjectInfo) {
        if ((Object.is(this.PrescriberDetailsField, value) != true)) {
            this.PrescriberDetailsField = value;
        }
    }

    public get CareProvider(): ObjectInfo {
        return this.CareProviderField;
    }

    public set CareProvider(value: ObjectInfo) {
        if ((Object.is(this.CareProviderField, value) != true)) {
            this.CareProviderField = value;
        }
    }

    public get IsPRNDose(): string {
        return this.IsPRNDoseField;
    }

    public set IsPRNDose(value: string) {
        if (this.IsPRNDoseField != value) {
            this.IsPRNDoseField = value;
        }
    }

    public get Specialty(): string {
        return this.SpecialtyField;
    }

    public set Specialty(value: string) {
        if ((Object.is(this.SpecialtyField, value) != true)) {
            this.SpecialtyField = value;
        }
    }

    public get IsDrugApprovalRequired(): string {
        return this.IsDrugApprovalRequiredField;
    }

    public set IsDrugApprovalRequired(value: string) {
        if (this.IsDrugApprovalRequiredField != value) {
            this.IsDrugApprovalRequiredField = value;
        }
    }

    public get DrugApproverRoleOID(): ArrayOfLong {
        return this.DrugApproverRoleOIDField;
    }

    public set DrugApproverRoleOID(value: ArrayOfLong) {
        if ((Object.is(this.DrugApproverRoleOIDField, value) != true)) {
            this.DrugApproverRoleOIDField = value;
        }
    }

    public get UniqueID(): number {
        return this.UniqueIDField;
    }
    public set UniqueID(value: number) {
        if ((this.UniqueIDField != value)) {
            this.UniqueIDField = value;
        }
    }

    public get IsConflictsExists(): string {
        return this.IsConflictsExistsField;
    }
    public set IsConflictsExists(value: string) {
        if ((this.IsConflictsExistsField != value)) {
            this.IsConflictsExistsField = value;
        }
    }

    public get IsAmendment(): string {
        return this.IsAmendmentField;
    }
    public set IsAmendment(value: string) {
        if ((this.IsAmendmentField != value)) {
            this.IsAmendmentField = value;
        }
    }

    public get ReorderItemOID(): number {
        return this.ReorderItemOIDField;
    }
    public set ReorderItemOID(value: number) {
        if ((this.ReorderItemOIDField != value)) {
            this.ReorderItemOIDField = value;
        }
    }

    public get IsNonformulary(): string {
        return this.IsNonformularyField;
    }
    public set IsNonformulary(value: string) {
        if ((this.IsNonformularyField != value)) {
            this.IsNonformularyField = value;
        }
    }

    public get ReplaceDrugActiveStatus(): string {
        return this.ReplaceDrugActiveStatusField;
    }
    public set ReplaceDrugActiveStatus(value: string) {
        if ((this.ReplaceDrugActiveStatusField != value)) {
            this.ReplaceDrugActiveStatusField = value;
        }
    }

    public get DrugVersionMatch(): string {
        return this.DrugVersionMatchField;
    }
    public set DrugVersionMatch(value: string) {
        if ((this.DrugVersionMatchField != value)) {
            this.DrugVersionMatchField = value;
        }
    }

    public get ReprintReason(): string {
        return this.ReprintReasonField;
    }

    public set ReprintReason(value: string) {
        if ((Object.is(this.ReprintReasonField, value) != true)) {
            this.ReprintReasonField = value;
        }
    }

    public get ClinicalNoteOID(): string {
        return this.ClinicalNoteOIDField;
    }

    public set ClinicalNoteOID(value: string) {
        if ((Object.is(this.ClinicalNoteOIDField, value) != true)) {
            this.ClinicalNoteOIDField = value;
        }
    }

    public get PPatientOID(): number {
        return this.PPatientOIDField;
    }
    public set PPatientOID(value: number) {
        if ((this.PPatientOIDField != value)) {
            this.PPatientOIDField = value;
        }
    }

    public get HIIsAckn(): string {
        return this.HIIsAcknField;
    }
    public set HIIsAckn(value: string) {
        if ((this.HIIsAcknField != value)) {
            this.HIIsAcknField = value;
        }
    }

    public get HIWarngBhTyp(): string {
        return this.HIWarngBhTypField;
    }

    public set HIWarngBhTyp(value: string) {
        if ((Object.is(this.HIWarngBhTypField, value) != true)) {
            this.HIWarngBhTypField = value;
        }
    }

}


export class PrescriptionItemDetails extends PrescriptionItem {
    private BasicPropertiesField!: PresItemBasicProperties;
    private AdditionalPropertiesField!: PresItemAdditionalProperties;
    private DrugSpecificPropertiesField!: PresItemDrugProperties;
    private FormViewParametersField!: PrescriptionItemFormViewParameters;
    private MultiComponentDetailsField!: Array<DrugMultiComponent>;
    private LegalCatField!: LegalCategory;
    private TechValidateDetailsField!: Array<TechnicalValidationInfo>;
    private AdminDetailsField!: PrescriptionItemAdminDetails;
    private WarningField!: Array<WarningDetails>;
    private DoseCalculationField!: DoseCalculatorDetails;
    private ActionPerformedCodeField = '';
    private ActionPerformedField!: PrescriptionItemAction;
    private IsMandatoryFilledField = false;
    private PrecriptionItemField = '';
    private OtherInformationField = '';
    private TrafficSymbolField = '';
    private CurrentUniqueIdField = '';
    private SequentialActionPerformCodeField = '';
    private IsSeqGroupHasDifferentStationaryTypeField = false;
    private DoseFormulaDetField!: DoseFormula;

    public get BasicProperties(): PresItemBasicProperties {
        return this.BasicPropertiesField;
    }

    public set BasicProperties(value: PresItemBasicProperties) {
        if ((Object.is(this.BasicPropertiesField, value) != true)) {
            this.BasicPropertiesField = value;
        }
    }

    public get AdditionalProperties(): PresItemAdditionalProperties {
        return this.AdditionalPropertiesField;
    }

    public set AdditionalProperties(value: PresItemAdditionalProperties) {
        if ((Object.is(this.AdditionalPropertiesField, value) != true)) {
            this.AdditionalPropertiesField = value;
        }
    }

    public get DrugSpecificProperties(): PresItemDrugProperties {
        return this.DrugSpecificPropertiesField;
    }

    public set DrugSpecificProperties(value: PresItemDrugProperties) {
        if ((Object.is(this.DrugSpecificPropertiesField, value) != true)) {
            this.DrugSpecificPropertiesField = value;
        }
    }

    public get FormViewParameters(): PrescriptionItemFormViewParameters {
        return this.FormViewParametersField;
    }

    public set FormViewParameters(value: PrescriptionItemFormViewParameters) {
        if ((Object.is(this.FormViewParametersField, value) != true)) {
            this.FormViewParametersField = value;
        }
    }

    public get MultiComponentDetails(): Array<DrugMultiComponent> {
        return this.MultiComponentDetailsField;
    }

    public set MultiComponentDetails(value: Array<DrugMultiComponent>) {
        if ((Object.is(this.MultiComponentDetailsField, value) != true)) {
            this.MultiComponentDetailsField = value;
        }
    }

    public get LegalCat(): LegalCategory {
        return this.LegalCatField;
    }

    public set LegalCat(value: LegalCategory) {
        if ((Object.is(this.LegalCatField, value) != true)) {
            this.LegalCatField = value;
        }
    }

    public get TechValidateDetails(): Array<TechnicalValidationInfo> {
        return this.TechValidateDetailsField;
    }

    public set TechValidateDetails(value: Array<TechnicalValidationInfo>) {
        if ((Object.is(this.TechValidateDetailsField, value) != true)) {
            this.TechValidateDetailsField = value;
        }
    }

    public get AdminDetails(): PrescriptionItemAdminDetails {
        return this.AdminDetailsField;
    }

    public set AdminDetails(value: PrescriptionItemAdminDetails) {
        if ((Object.is(this.AdminDetailsField, value) != true)) {
            this.AdminDetailsField = value;
        }
    }

    public get Warning(): Array<WarningDetails> {
        return this.WarningField;
    }

    public set Warning(value: Array<WarningDetails>) {
        if ((Object.is(this.WarningField, value) != true)) {
            this.WarningField = value;
        }
    }

    public get DoseCalculation(): DoseCalculatorDetails {
        return this.DoseCalculationField;
    }

    public set DoseCalculation(value: DoseCalculatorDetails) {
        if ((Object.is(this.DoseCalculationField, value) != true)) {
            this.DoseCalculationField = value;
        }
    }

    public get ActionPerformedCode(): string {
        return this.ActionPerformedCodeField;
    }

    public set ActionPerformedCode(value: string) {
        if ((Object.is(this.ActionPerformedCodeField, value) != true)) {
            this.ActionPerformedCodeField = value;
        }
    }

    public get ActionPerformed(): PrescriptionItemAction {
        return this.ActionPerformedField;
    }

    public set ActionPerformed(value: PrescriptionItemAction) {
        if ((Object.is(this.ActionPerformedField, value) != true)) {
            this.ActionPerformedField = value;
        }
    }

    public get IsMandatoryFilled(): boolean {
        return this.IsMandatoryFilledField;
    }
    public set IsMandatoryFilled(value: boolean) {
        if ((this.IsMandatoryFilledField != value)) {
            this.IsMandatoryFilledField = value;
        }
    }

    public get PrecriptionItem(): string {
        return this.PrecriptionItemField;
    }

    public set PrecriptionItem(value: string) {
        if ((Object.is(this.PrecriptionItemField, value) != true)) {
            this.PrecriptionItemField = value;
        }
    }

    public get OtherInformation(): string {
        return this.OtherInformationField;
    }

    public set OtherInformation(value: string) {
        if ((Object.is(this.OtherInformationField, value) != true)) {
            this.OtherInformationField = value;
        }
    }

    public get TrafficSymbol(): string {
        return this.TrafficSymbolField;
    }

    public set TrafficSymbol(value: string) {
        if ((Object.is(this.TrafficSymbolField, value) != true)) {
            this.TrafficSymbolField = value;
        }
    }

    public get CurrentUniqueId(): string {
        return this.CurrentUniqueIdField;
    }

    public set CurrentUniqueId(value: string) {
        if ((Object.is(this.CurrentUniqueIdField, value) != true)) {
            this.CurrentUniqueIdField = value;
        }
    }

    public get SequentialActionPerformCode(): string {
        return this.SequentialActionPerformCodeField;
    }

    public set SequentialActionPerformCode(value: string) {
        if ((Object.is(this.SequentialActionPerformCodeField, value) != true)) {
            this.SequentialActionPerformCodeField = value;
        }
    }

    public get IsSeqGroupHasDifferentStationaryType(): boolean {
        return this.IsSeqGroupHasDifferentStationaryTypeField;
    }
    public set IsSeqGroupHasDifferentStationaryType(value: boolean) {
        if ((this.IsSeqGroupHasDifferentStationaryTypeField != value)) {
            this.IsSeqGroupHasDifferentStationaryTypeField = value;
        }
    }

    public get DoseFormulaDet(): DoseFormula {
        return this.DoseFormulaDetField;
    }

    public set DoseFormulaDet(value: DoseFormula) {
        if ((Object.is(this.DoseFormulaDetField, value) != true)) {
            this.DoseFormulaDetField = value;
        }
    }

}

export class StatusFlags {
    private HasWarningsField = '';
    private IsHoldField = '';
    private PrintStatusField = '';
    private HasDoseCalculationField = '';
    private IsTechValidateField = '';

    public get HasWarnings(): string {
        return this.HasWarningsField;
    }
    public set HasWarnings(value: string) {
        if ((this.HasWarningsField != value)) {
            this.HasWarningsField = value;
        }
    }

    public get IsHold(): string {
        return this.IsHoldField;
    }
    public set IsHold(value: string) {
        if ((this.IsHoldField != value)) {
            this.IsHoldField = value;
        }
    }

    public get PrintStatus(): string {
        return this.PrintStatusField;
    }
    public set PrintStatus(value: string) {
        if ((this.PrintStatusField != value)) {
            this.PrintStatusField = value;
        }
    }

    public get HasDoseCalculation(): string {
        return this.HasDoseCalculationField;
    }
    public set HasDoseCalculation(value: string) {
        if ((this.HasDoseCalculationField != value)) {
            this.HasDoseCalculationField = value;
        }
    }

    public get IsTechValidate(): string {
        return this.IsTechValidateField;
    }

    public set IsTechValidate(value: string) {
        if ((Object.is(this.IsTechValidateField, value) != true)) {
            this.IsTechValidateField = value;
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

    public get DrugPropertyCode(): string {
        return this.DrugPropertyCodeField;
    }

    public set DrugPropertyCode(value: string) {
        if ((Object.is(this.DrugPropertyCodeField, value) != true)) {
            this.DrugPropertyCodeField = value;
        }
    }

    public get VMChildCode(): string {
        return this.VMChildCodeField;
    }

    public set VMChildCode(value: string) {
        if ((Object.is(this.VMChildCodeField, value) != true)) {
            this.VMChildCodeField = value;
        }
    }

    public get DrugName(): string {
        return this.DrugNameField;
    }

    public set DrugName(value: string) {
        if ((Object.is(this.DrugNameField, value) != true)) {
            this.DrugNameField = value;
        }
    }

    public get HighRiskMsg(): string {
        return this.HighRiskMsgField;
    }

    public set HighRiskMsg(value: string) {
        if ((Object.is(this.HighRiskMsgField, value) != true)) {
            this.HighRiskMsgField = value;
        }
    }

    public get IdentifyingOID(): number {
        return this.IdentifyingOIDField;
    }
    public set IdentifyingOID(value: number) {
        if ((this.IdentifyingOIDField != value)) {
            this.IdentifyingOIDField = value;
        }
    }

    public get IdentifyingType(): string {
        return this.IdentifyingTypeField;
    }

    public set IdentifyingType(value: string) {
        if ((Object.is(this.IdentifyingTypeField, value) != true)) {
            this.IdentifyingTypeField = value;
        }
    }

    public get OccuranceCode(): string {
        return this.OccuranceCodeField;
    }

    public set OccuranceCode(value: string) {
        if ((Object.is(this.OccuranceCodeField, value) != true)) {
            this.OccuranceCodeField = value;
        }
    }

}


export class PresItemCommonProperties extends CLZOObject {
    private ItemTypeField = '';
    private ItemSubTypeField = '';
    private TreatmentToContField!: ObjectInfo;
    private AdminInstructionField!: ObjectInfo;
    private DispensingInstructionField!: Array<ObjectInfo>;
    private SupplyInstructionField!: Array<ObjectInfo>;
    private SupplementItemsField!: Array<ObjectInfo>;
    private LegalCategoryField!: ObjectInfo;
    private RouteField!: ObjectInfo;
    private FormField!: ObjectInfo;
    private StatusflagsField!: StatusFlags;
    private DrugPropertiesField!: Array<DrugProperty>;
    private IsControlledDrugField = '';
    private OtherDispensingInstructionField = '';
    private OtherAdminInstructionField = '';
    private IdentifyingDomainField = '';
    private AdminIdentifyingDomainField = '';
    private TechSupplyInstructionField = '';

    public get ItemType(): string {
        return this.ItemTypeField;
    }

    public set ItemType(value: string) {
        if ((Object.is(this.ItemTypeField, value) != true)) {
            this.ItemTypeField = value;
        }
    }

    public get ItemSubType(): string {
        return this.ItemSubTypeField;
    }

    public set ItemSubType(value: string) {
        if ((Object.is(this.ItemSubTypeField, value) != true)) {
            this.ItemSubTypeField = value;
        }
    }

    public get TreatmentToCont(): ObjectInfo {
        return this.TreatmentToContField;
    }

    public set TreatmentToCont(value: ObjectInfo) {
        if ((Object.is(this.TreatmentToContField, value) != true)) {
            this.TreatmentToContField = value;
        }
    }

    public get AdminInstruction(): ObjectInfo {
        return this.AdminInstructionField;
    }

    public set AdminInstruction(value: ObjectInfo) {
        if ((Object.is(this.AdminInstructionField, value) != true)) {
            this.AdminInstructionField = value;
        }
    }

    public get DispensingInstruction(): Array<ObjectInfo> {
        return this.DispensingInstructionField;
    }

    public set DispensingInstruction(value: Array<ObjectInfo>) {
        if ((Object.is(this.DispensingInstructionField, value) != true)) {
            this.DispensingInstructionField = value;
        }
    }

    public get SupplyInstruction(): Array<ObjectInfo> {
        return this.SupplyInstructionField;
    }

    public set SupplyInstruction(value: Array<ObjectInfo>) {
        if ((Object.is(this.SupplyInstructionField, value) != true)) {
            this.SupplyInstructionField = value;
        }
    }

    public get SupplementItems(): Array<ObjectInfo> {
        return this.SupplementItemsField;
    }

    public set SupplementItems(value: Array<ObjectInfo>) {
        if ((Object.is(this.SupplementItemsField, value) != true)) {
            this.SupplementItemsField = value;
        }
    }

    public get LegalCategory(): ObjectInfo {
        return this.LegalCategoryField;
    }

    public set LegalCategory(value: ObjectInfo) {
        if ((Object.is(this.LegalCategoryField, value) != true)) {
            this.LegalCategoryField = value;
        }
    }

    public get Route(): ObjectInfo {
        return this.RouteField;
    }

    public set Route(value: ObjectInfo) {
        if ((Object.is(this.RouteField, value) != true)) {
            this.RouteField = value;
        }
    }

    public get Form(): ObjectInfo {
        return this.FormField;
    }

    public set Form(value: ObjectInfo) {
        if ((Object.is(this.FormField, value) != true)) {
            this.FormField = value;
        }
    }

    public get Statusflags(): StatusFlags {
        return this.StatusflagsField;
    }

    public set Statusflags(value: StatusFlags) {
        if ((Object.is(this.StatusflagsField, value) != true)) {
            this.StatusflagsField = value;
        }
    }

    public get DrugProperties(): Array<DrugProperty> {
        return this.DrugPropertiesField;
    }

    public set DrugProperties(value: Array<DrugProperty>) {
        if ((Object.is(this.DrugPropertiesField, value) != true)) {
            this.DrugPropertiesField = value;
        }
    }

    public get IsControlledDrug(): string {
        return this.IsControlledDrugField;
    }

    public set IsControlledDrug(value: string) {
        if ((Object.is(this.IsControlledDrugField, value) != true)) {
            this.IsControlledDrugField = value;
        }
    }

    public get OtherDispensingInstruction(): string {
        return this.OtherDispensingInstructionField;
    }

    public set OtherDispensingInstruction(value: string) {
        if ((Object.is(this.OtherDispensingInstructionField, value) != true)) {
            this.OtherDispensingInstructionField = value;
        }
    }

    public get OtherAdminInstruction(): string {
        return this.OtherAdminInstructionField;
    }

    public set OtherAdminInstruction(value: string) {
        if ((Object.is(this.OtherAdminInstructionField, value) != true)) {
            this.OtherAdminInstructionField = value;
        }
    }

    public get IdentifyingDomain(): string {
        return this.IdentifyingDomainField;
    }

    public set IdentifyingDomain(value: string) {
        if ((Object.is(this.IdentifyingDomainField, value) != true)) {
            this.IdentifyingDomainField = value;
        }
    }

    public get AdminIdentifyingDomain(): string {
        return this.AdminIdentifyingDomainField;
    }

    public set AdminIdentifyingDomain(value: string) {
        if ((Object.is(this.AdminIdentifyingDomainField, value) != true)) {
            this.AdminIdentifyingDomainField = value;
        }
    }

    public get TechSupplyInstruction(): string {
        return this.TechSupplyInstructionField;
    }

    public set TechSupplyInstruction(value: string) {
        if ((Object.is(this.TechSupplyInstructionField, value) != true)) {
            this.TechSupplyInstructionField = value;
        }
    }

}

export class MeasurableObject extends CLZOObject {
    private OIDField = 0;
    private ValueField = 0;
    private UOMOIDField = 0;
    private UOMNameField = '';
    private RecordedDateField = new Date();
    private UOMCodeField = '';

    public get OID(): number {
        return this.OIDField;
    }
    public set OID(value: number) {
        if ((this.OIDField != value)) {
            this.OIDField = value;
        }
    }

    public get Value(): number {
        return this.ValueField;
    }
    public set Value(value: number) {
        if ((this.ValueField != value)) {
            this.ValueField = value;
        }
    }

    public get UOMOID(): number {
        return this.UOMOIDField;
    }
    public set UOMOID(value: number) {
        if ((this.UOMOIDField != value)) {
            this.UOMOIDField = value;
        }
    }

    public get UOMName(): string {
        return this.UOMNameField;
    }

    public set UOMName(value: string) {
        if ((Object.is(this.UOMNameField, value) != true)) {
            this.UOMNameField = value;
        }
    }

    public get RecordedDate(): Date {
        return this.RecordedDateField;
    }
    public set RecordedDate(value: Date) {
        if ((this.RecordedDateField != value)) {
            this.RecordedDateField = value;
        }
    }

    public get UOMCode(): string {
        return this.UOMCodeField;
    }

    public set UOMCode(value: string) {
        if ((Object.is(this.UOMCodeField, value) != true)) {
            this.UOMCodeField = value;
        }
    }

}

export class Quantity extends CLZOObject {
    private QuantityValueField = '';
    private QuantityUOMIdField = 0;
    private QuantityUOMNameField = '';

    public get QuantityValue(): string {
        return this.QuantityValueField;
    }

    public set QuantityValue(value: string) {
        if ((Object.is(this.QuantityValueField, value) != true)) {
            this.QuantityValueField = value;
        }
    }

    public get QuantityUOMId(): number {
        return this.QuantityUOMIdField;
    }
    public set QuantityUOMId(value: number) {
        if ((this.QuantityUOMIdField != value)) {
            this.QuantityUOMIdField = value;
        }
    }

    public get QuantityUOMName(): string {
        return this.QuantityUOMNameField;
    }

    public set QuantityUOMName(value: string) {
        if ((Object.is(this.QuantityUOMNameField, value) != true)) {
            this.QuantityUOMNameField = value;
        }
    }

}

export class UOM extends CLZOObject {
    private UOMIdField = 0;
    private UOMNameField = '';

    public get UOMId(): number {
        return this.UOMIdField;
    }
    public set UOMId(value: number) {
        if ((this.UOMIdField != value)) {
            this.UOMIdField = value;
        }
    }

    public get UOMName(): string {
        return this.UOMNameField;
    }

    public set UOMName(value: string) {
        if ((Object.is(this.UOMNameField, value) != true)) {
            this.UOMNameField = value;
        }
    }

}


export class DoseRegime extends CLZOObject {
    private LowerDoseField = 0;
    private UpperDoseField = 0;
    private DoseUOMField!: UOM;
    private DurationField!: MeasurableObject;
    private QuantityField!: MeasurableObject;
    private DirectionField!: ObjectInfo;
    private PrescibableItemOIDField = 0;
    private StartDTTMField = new Date();
    private EndDTTMField = new Date();
    private LowerObservationRangeField = 0;
    private UpperObservationRangeField = 0;
    private ObservationRangeUOMField!: UOM;
    private DosingInstructionField = '';
    private FrequencyDetailsField!: FrequencyDetails;
    private DurationUOMCodeField = '';

    public get LowerDose(): number {
        return this.LowerDoseField;
    }
    public set LowerDose(value: number) {
        if ((this.LowerDoseField != value)) {
            this.LowerDoseField = value;
        }
    }

    public get UpperDose(): number {
        return this.UpperDoseField;
    }
    public set UpperDose(value: number) {
        if ((this.UpperDoseField != value)) {
            this.UpperDoseField = value;
        }
    }

    public get DoseUOM(): UOM {
        return this.DoseUOMField;
    }

    public set DoseUOM(value: UOM) {
        if ((Object.is(this.DoseUOMField, value) != true)) {
            this.DoseUOMField = value;
        }
    }

    public get Duration(): MeasurableObject {
        return this.DurationField;
    }

    public set Duration(value: MeasurableObject) {
        if ((Object.is(this.DurationField, value) != true)) {
            this.DurationField = value;
        }
    }

    public get Quantity(): MeasurableObject {
        return this.QuantityField;
    }

    public set Quantity(value: MeasurableObject) {
        if ((Object.is(this.QuantityField, value) != true)) {
            this.QuantityField = value;
        }
    }

    public get Direction(): ObjectInfo {
        return this.DirectionField;
    }

    public set Direction(value: ObjectInfo) {
        if ((Object.is(this.DirectionField, value) != true)) {
            this.DirectionField = value;
        }
    }

    public get PrescibableItemOID(): number {
        return this.PrescibableItemOIDField;
    }
    public set PrescibableItemOID(value: number) {
        if ((this.PrescibableItemOIDField != value)) {
            this.PrescibableItemOIDField = value;
        }
    }

    public get StartDTTM(): Date {
        return this.StartDTTMField;
    }
    public set StartDTTM(value: Date) {
        if ((this.StartDTTMField != value)) {
            this.StartDTTMField = value;
        }
    }

    public get EndDTTM(): Date {
        return this.EndDTTMField;
    }
    public set EndDTTM(value: Date) {
        if ((this.EndDTTMField != value)) {
            this.EndDTTMField = value;
        }
    }

    public get LowerObservationRange(): number {
        return this.LowerObservationRangeField;
    }
    public set LowerObservationRange(value: number) {
        if ((this.LowerObservationRangeField != value)) {
            this.LowerObservationRangeField = value;
        }
    }

    public get UpperObservationRange(): number {
        return this.UpperObservationRangeField;
    }
    public set UpperObservationRange(value: number) {
        if ((this.UpperObservationRangeField != value)) {
            this.UpperObservationRangeField = value;
        }
    }

    public get ObservationRangeUOM(): UOM {
        return this.ObservationRangeUOMField;
    }

    public set ObservationRangeUOM(value: UOM) {
        if ((Object.is(this.ObservationRangeUOMField, value) != true)) {
            this.ObservationRangeUOMField = value;
        }
    }

    public get DosingInstruction(): string {
        return this.DosingInstructionField;
    }

    public set DosingInstruction(value: string) {
        if ((Object.is(this.DosingInstructionField, value) != true)) {
            this.DosingInstructionField = value;
        }
    }

    public get FrequencyDetails(): FrequencyDetails {
        return this.FrequencyDetailsField;
    }

    public set FrequencyDetails(value: FrequencyDetails) {
        if ((Object.is(this.FrequencyDetailsField, value) != true)) {
            this.FrequencyDetailsField = value;
        }
    }

    public get DurationUOMCode(): string {
        return this.DurationUOMCodeField;
    }

    public set DurationUOMCode(value: string) {
        if ((Object.is(this.DurationUOMCodeField, value) != true)) {
            this.DurationUOMCodeField = value;
        }
    }

}


export class PrescriptionItemDose extends CLZOObject {
    private DoseTypeField!: ObjectInfo;
    private DoseRegimeField!: Array<DoseRegime>;
    private ObservationResultField!: ObjectInfo;

    public get DoseType(): ObjectInfo {
        return this.DoseTypeField;
    }

    public set DoseType(value: ObjectInfo) {
        if ((Object.is(this.DoseTypeField, value) != true)) {
            this.DoseTypeField = value;
        }
    }

    public get DoseRegime(): Array<DoseRegime> {
        return this.DoseRegimeField;
    }

    public set DoseRegime(value: Array<DoseRegime>) {
        if ((Object.is(this.DoseRegimeField, value) != true)) {
            this.DoseRegimeField = value;
        }
    }

    public get ObservationResult(): ObjectInfo {
        return this.ObservationResultField;
    }

    public set ObservationResult(value: ObjectInfo) {
        if ((Object.is(this.ObservationResultField, value) != true)) {
            this.ObservationResultField = value;
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

    public get ItemFrequencyOID(): number {
        return this.ItemFrequencyOIDField;
    }
    public set ItemFrequencyOID(value: number) {
        if ((this.ItemFrequencyOIDField != value)) {
            this.ItemFrequencyOIDField = value;
        }
    }

    public get ScheduledTimeInMins(): number {
        return this.ScheduledTimeInMinsField;
    }
    public set ScheduledTimeInMins(value: number) {
        if ((this.ScheduledTimeInMinsField != value)) {
            this.ScheduledTimeInMinsField = value;
        }
    }

    public get ScheduledTime(): string {
        return this.ScheduledTimeField;
    }

    public set ScheduledTime(value: string) {
        if ((Object.is(this.ScheduledTimeField, value) != true)) {
            this.ScheduledTimeField = value;
        }
    }

    public get MappedDrugRoundTimeInMins(): number {
        return this.MappedDrugRoundTimeInMinsField;
    }
    public set MappedDrugRoundTimeInMins(value: number) {
        if ((this.MappedDrugRoundTimeInMinsField != value)) {
            this.MappedDrugRoundTimeInMinsField = value;
        }
    }

    public get MappedDrugRoundTime(): string {
        return this.MappedDrugRoundTimeField;
    }

    public set MappedDrugRoundTime(value: string) {
        if ((Object.is(this.MappedDrugRoundTimeField, value) != true)) {
            this.MappedDrugRoundTimeField = value;
        }
    }

    public get ScheduleTime(): number {
        return this.ScheduleTimeField;
    }
    public set ScheduleTime(value: number) {
        if ((this.ScheduleTimeField != value)) {
            this.ScheduleTimeField = value;
        }
    }

    public get EncounterOID(): number {
        return this.EncounterOIDField;
    }
    public set EncounterOID(value: number) {
        if ((this.EncounterOIDField != value)) {
            this.EncounterOIDField = value;
        }
    }

    public get MCVersion(): string {
        return this.MCVersionField;
    }

    public set MCVersion(value: string) {
        if ((Object.is(this.MCVersionField, value) != true)) {
            this.MCVersionField = value;
        }
    }

}


export class FrequencyDetails extends CLZOObject {
    private FrequencyField!: ObjectInfo;
    private IsFixedAdministrationField = '';
    private ScheduledTimesField!: Array<Scheduledetails>;
    private StatIndicatorField = '';
    private StatDoseField!: MeasurableObject;

    public get Frequency(): ObjectInfo {
        return this.FrequencyField;
    }

    public set Frequency(value: ObjectInfo) {
        if ((Object.is(this.FrequencyField, value) != true)) {
            this.FrequencyField = value;
        }
    }

    public get IsFixedAdministration(): string {
        return this.IsFixedAdministrationField;
    }
    public set IsFixedAdministration(value: string) {
        if ((this.IsFixedAdministrationField != value)) {
            this.IsFixedAdministrationField = value;
        }
    }

    public get ScheduledTimes(): Array<Scheduledetails> {
        return this.ScheduledTimesField;
    }

    public set ScheduledTimes(value: Array<Scheduledetails>) {
        if ((Object.is(this.ScheduledTimesField, value) != true)) {
            this.ScheduledTimesField = value;
        }
    }

    public get StatIndicator(): string {
        return this.StatIndicatorField;
    }
    public set StatIndicator(value: string) {
        if ((this.StatIndicatorField != value)) {
            this.StatIndicatorField = value;
        }
    }

    public get StatDose(): MeasurableObject {
        return this.StatDoseField;
    }

    public set StatDose(value: MeasurableObject) {
        if ((Object.is(this.StatDoseField, value) != true)) {
            this.StatDoseField = value;
        }
    }

}

export class Indication extends CLZOObject {
    private CodingschemeCodeField = '';
    private VersionField = '';
    private CodeField = '';
    private TermField = '';
    private TermKeyField = '';
    private TypeField = '';

    public get CodingschemeCode(): string {
        return this.CodingschemeCodeField;
    }

    public set CodingschemeCode(value: string) {
        if ((Object.is(this.CodingschemeCodeField, value) != true)) {
            this.CodingschemeCodeField = value;
        }
    }

    public get Version(): string {
        return this.VersionField;
    }

    public set Version(value: string) {
        if ((Object.is(this.VersionField, value) != true)) {
            this.VersionField = value;
        }
    }

    public get Code(): string {
        return this.CodeField;
    }

    public set Code(value: string) {
        if ((Object.is(this.CodeField, value) != true)) {
            this.CodeField = value;
        }
    }

    public get Term(): string {
        return this.TermField;
    }

    public set Term(value: string) {
        if ((Object.is(this.TermField, value) != true)) {
            this.TermField = value;
        }
    }

    public get TermKey(): string {
        return this.TermKeyField;
    }

    public set TermKey(value: string) {
        if ((Object.is(this.TermKeyField, value) != true)) {
            this.TermKeyField = value;
        }
    }

    public get Type(): string {
        return this.TypeField;
    }

    public set Type(value: string) {
        if ((Object.is(this.TypeField, value) != true)) {
            this.TypeField = value;
        }
    }

}


export class PresItemBasicProperties extends PresItemCommonProperties {

    private defaultchkField = '';
    private DirectionField!: ObjectInfo;
    private DurationField!: MeasurableObject;
    private SiteField!: ObjectInfo;
    private QuantityField!: Quantity;
    private DoseField!: PrescriptionItemDose;
    private FrequencyDetailsField!: FrequencyDetails;
    private PatientProblemField!: Array<Indication>;
    private IsPresItemLevelDispenseField = '';

    public get defaultchk(): string {
        return this.defaultchkField;
    }

    public set defaultchk(value: string) {
        if ((Object.is(this.defaultchkField, value) != true)) {
            this.defaultchkField = value;
        }
    }

    public get Direction(): ObjectInfo {
        return this.DirectionField;
    }

    public set Direction(value: ObjectInfo) {
        if ((Object.is(this.DirectionField, value) != true)) {
            this.DirectionField = value;
        }
    }

    public get Duration(): MeasurableObject {
        return this.DurationField;
    }

    public set Duration(value: MeasurableObject) {
        if ((Object.is(this.DurationField, value) != true)) {
            this.DurationField = value;
        }
    }

    public get Site(): ObjectInfo {
        return this.SiteField;
    }

    public set Site(value: ObjectInfo) {
        if ((Object.is(this.SiteField, value) != true)) {
            this.SiteField = value;
        }
    }

    public get Quantity(): Quantity {
        return this.QuantityField;
    }

    public set Quantity(value: Quantity) {
        if ((Object.is(this.QuantityField, value) != true)) {
            this.QuantityField = value;
        }
    }

    public get Dose(): PrescriptionItemDose {
        return this.DoseField;
    }

    public set Dose(value: PrescriptionItemDose) {
        if ((Object.is(this.DoseField, value) != true)) {
            this.DoseField = value;
        }
    }

    public get FrequencyDetails(): FrequencyDetails {
        return this.FrequencyDetailsField;
    }

    public set FrequencyDetails(value: FrequencyDetails) {
        if ((Object.is(this.FrequencyDetailsField, value) != true)) {
            this.FrequencyDetailsField = value;
        }
    }

    public get PatientProblem(): Array<Indication> {
        return this.PatientProblemField;
    }

    public set PatientProblem(value: Array<Indication>) {
        if ((Object.is(this.PatientProblemField, value) != true)) {
            this.PatientProblemField = value;
        }
    }

    public get IsPresItemLevelDispense(): string {
        return this.IsPresItemLevelDispenseField;
    }
    public set IsPresItemLevelDispense(value: string) {
        if ((this.IsPresItemLevelDispenseField != value)) {
            this.IsPresItemLevelDispenseField = value;
        }
    }

}

export class PresItemAdditionalProperties extends CLZOObject {
    private NoOfInstallmentsField = 0;
    private IntervalBtwnInstallmentField!: MeasurableObject;
    private MedClerkModifyReasonField!: ObjectInfo;
    private InstalmentInstructionsField!: Array<ObjectInfo>;
    private EndorsementPropertiesField!: Array<ObjectInfo>;
    private StationeryTypeField!: ObjectInfo;
    private AdditionalCommentsField = '';
    private BatchNumberField = '';
    private ExpiryDateField = new Date();
    private NonFormularyReasonField = '';
    private NonCatalogueReasonField = '';
    private StatusModifedDTTMField = new Date();
    private AdminMethodField!: ObjectInfo;
    private MedClerkSourceField!: Array<ObjectInfo>;
    private DrugAttributesField = '';
    private PharmacyNotingCommentsField = '';
    private HoldReasonField = '';
    private ReasonOfStoppingField = '';
    private DateCommencedField = '';
    private NonCatalogueOtherReasonField = '';
    private ReconcileCommentsField = '';

    public get NoOfInstallments(): number {
        return this.NoOfInstallmentsField;
    }
    public set NoOfInstallments(value: number) {
        if ((this.NoOfInstallmentsField != value)) {
            this.NoOfInstallmentsField = value;
        }
    }

    public get IntervalBtwnInstallment(): MeasurableObject {
        return this.IntervalBtwnInstallmentField;
    }

    public set IntervalBtwnInstallment(value: MeasurableObject) {
        if ((Object.is(this.IntervalBtwnInstallmentField, value) != true)) {
            this.IntervalBtwnInstallmentField = value;
        }
    }

    public get MedClerkModifyReason(): ObjectInfo {
        return this.MedClerkModifyReasonField;
    }

    public set MedClerkModifyReason(value: ObjectInfo) {
        if ((Object.is(this.MedClerkModifyReasonField, value) != true)) {
            this.MedClerkModifyReasonField = value;
        }
    }

    public get InstalmentInstructions(): Array<ObjectInfo> {
        return this.InstalmentInstructionsField;
    }

    public set InstalmentInstructions(value: Array<ObjectInfo>) {
        if ((Object.is(this.InstalmentInstructionsField, value) != true)) {
            this.InstalmentInstructionsField = value;
        }
    }

    public get EndorsementProperties(): Array<ObjectInfo> {
        return this.EndorsementPropertiesField;
    }

    public set EndorsementProperties(value: Array<ObjectInfo>) {
        if ((Object.is(this.EndorsementPropertiesField, value) != true)) {
            this.EndorsementPropertiesField = value;
        }
    }

    public get StationeryType(): ObjectInfo {
        return this.StationeryTypeField;
    }

    public set StationeryType(value: ObjectInfo) {
        if ((Object.is(this.StationeryTypeField, value) != true)) {
            this.StationeryTypeField = value;
        }
    }

    public get AdditionalComments(): string {
        return this.AdditionalCommentsField;
    }

    public set AdditionalComments(value: string) {
        if ((Object.is(this.AdditionalCommentsField, value) != true)) {
            this.AdditionalCommentsField = value;
        }
    }

    public get BatchNumber(): string {
        return this.BatchNumberField;
    }

    public set BatchNumber(value: string) {
        if ((Object.is(this.BatchNumberField, value) != true)) {
            this.BatchNumberField = value;
        }
    }

    public get ExpiryDate(): Date {
        return this.ExpiryDateField;
    }

    public set ExpiryDate(value: Date) {
        if (this.ExpiryDateField != value) {
            this.ExpiryDateField = value;
        }
    }

    public get NonFormularyReason(): string {
        return this.NonFormularyReasonField;
    }

    public set NonFormularyReason(value: string) {
        if ((Object.is(this.NonFormularyReasonField, value) != true)) {
            this.NonFormularyReasonField = value;
        }
    }

    public get NonCatalogueReason(): string {
        return this.NonCatalogueReasonField;
    }

    public set NonCatalogueReason(value: string) {
        if ((Object.is(this.NonCatalogueReasonField, value) != true)) {
            this.NonCatalogueReasonField = value;
        }
    }

    public get StatusModifedDTTM(): Date {
        return this.StatusModifedDTTMField;
    }

    public set StatusModifedDTTM(value: Date) {
        if (this.StatusModifedDTTMField != value) {
            this.StatusModifedDTTMField = value;
        }
    }

    public get AdminMethod(): ObjectInfo {
        return this.AdminMethodField;
    }

    public set AdminMethod(value: ObjectInfo) {
        if ((Object.is(this.AdminMethodField, value) != true)) {
            this.AdminMethodField = value;
        }
    }

    public get MedClerkSource(): Array<ObjectInfo> {
        return this.MedClerkSourceField;
    }

    public set MedClerkSource(value: Array<ObjectInfo>) {
        if ((Object.is(this.MedClerkSourceField, value) != true)) {
            this.MedClerkSourceField = value;
        }
    }

    public get DrugAttributes(): string {
        return this.DrugAttributesField;
    }

    public set DrugAttributes(value: string) {
        if ((Object.is(this.DrugAttributesField, value) != true)) {
            this.DrugAttributesField = value;
        }
    }

    public get PharmacyNotingComments(): string {
        return this.PharmacyNotingCommentsField;
    }

    public set PharmacyNotingComments(value: string) {
        if ((Object.is(this.PharmacyNotingCommentsField, value) != true)) {
            this.PharmacyNotingCommentsField = value;
        }
    }

    public get HoldReason(): string {
        return this.HoldReasonField;
    }

    public set HoldReason(value: string) {
        if ((Object.is(this.HoldReasonField, value) != true)) {
            this.HoldReasonField = value;
        }
    }

    public get ReasonOfStopping(): string {
        return this.ReasonOfStoppingField;
    }

    public set ReasonOfStopping(value: string) {
        if ((Object.is(this.ReasonOfStoppingField, value) != true)) {
            this.ReasonOfStoppingField = value;
        }
    }

    public get DateCommenced(): string {
        return this.DateCommencedField;
    }

    public set DateCommenced(value: string) {
        if ((Object.is(this.DateCommencedField, value) != true)) {
            this.DateCommencedField = value;
        }
    }

    public get NonCatalogueOtherReason(): string {
        return this.NonCatalogueOtherReasonField;
    }

    public set NonCatalogueOtherReason(value: string) {
        if ((Object.is(this.NonCatalogueOtherReasonField, value) != true)) {
            this.NonCatalogueOtherReasonField = value;
        }
    }

    public get ReconcileComments(): string {
        return this.ReconcileCommentsField;
    }

    public set ReconcileComments(value: string) {
        if ((Object.is(this.ReconcileCommentsField, value) != true)) {
            this.ReconcileCommentsField = value;
        }
    }

}


export class PresItemDrugProperties extends CLZOObject {

    private CanDoseBeChangedField = '';
    private MandatoryCodeField = '';
    private ContraIndicationOIDField = 0;
    private HasProhibitedRouteField = '';
    private StrengthField!: MeasurableObject;

    public get CanDoseBeChanged(): string {
        return this.CanDoseBeChangedField;
    }

    public set CanDoseBeChanged(value: string) {
        if (this.CanDoseBeChangedField != value) {
            this.CanDoseBeChangedField = value;
        }
    }

    public get MandatoryCode(): string {
        return this.MandatoryCodeField;
    }

    public set MandatoryCode(value: string) {
        if ((Object.is(this.MandatoryCodeField, value) != true)) {
            this.MandatoryCodeField = value;
        }
    }

    public get ContraIndicationOID(): number {
        return this.ContraIndicationOIDField;
    }

    public set ContraIndicationOID(value: number) {
        if (this.ContraIndicationOIDField != value) {
            this.ContraIndicationOIDField = value;
        }
    }

    public get HasProhibitedRoute(): string {
        return this.HasProhibitedRouteField;
    }

    public set HasProhibitedRoute(value: string) {
        if (this.HasProhibitedRouteField != value) {
            this.HasProhibitedRouteField = value;
        }
    }

    public get Strength(): MeasurableObject {
        return this.StrengthField;
    }

    public set Strength(value: MeasurableObject) {
        if ((Object.is(this.StrengthField, value) != true)) {
            this.StrengthField = value;
        }
    }

}

export class IntravenousInfusionDetails extends CLZOObject {
    private FluidField = '';
    private VolumeField = '';
    private VolumeUOMField!: UOM;
    private InfusionPeriodField = '';
    private InfusionPeriodUOMField!: UOM;
    private RateField = '';
    private RateUOMField!: UOM;
    private HumidificationField = '';

    public get Fluid(): string {
        return this.FluidField;
    }

    public set Fluid(value: string) {
        if ((Object.is(this.FluidField, value) != true)) {
            this.FluidField = value;
        }
    }

    public get Volume(): string {
        return this.VolumeField;
    }

    public set Volume(value: string) {
        if ((Object.is(this.VolumeField, value) != true)) {
            this.VolumeField = value;
        }
    }

    public get VolumeUOM(): UOM {
        return this.VolumeUOMField;
    }

    public set VolumeUOM(value: UOM) {
        if ((Object.is(this.VolumeUOMField, value) != true)) {
            this.VolumeUOMField = value;
        }
    }

    public get InfusionPeriod(): string {
        return this.InfusionPeriodField;
    }

    public set InfusionPeriod(value: string) {
        if ((Object.is(this.InfusionPeriodField, value) != true)) {
            this.InfusionPeriodField = value;
        }
    }

    public get InfusionPeriodUOM(): UOM {
        return this.InfusionPeriodUOMField;
    }

    public set InfusionPeriodUOM(value: UOM) {
        if ((Object.is(this.InfusionPeriodUOMField, value) != true)) {
            this.InfusionPeriodUOMField = value;
        }
    }

    public get Rate(): string {
        return this.RateField;
    }

    public set Rate(value: string) {
        if ((Object.is(this.RateField, value) != true)) {
            this.RateField = value;
        }
    }

    public get RateUOM(): UOM {
        return this.RateUOMField;
    }

    public set RateUOM(value: UOM) {
        if ((Object.is(this.RateUOMField, value) != true)) {
            this.RateUOMField = value;
        }
    }

    public get Humidification(): string {
        return this.HumidificationField;
    }

    public set Humidification(value: string) {
        if ((Object.is(this.HumidificationField, value) != true)) {
            this.HumidificationField = value;
        }
    }

}

export class AdminDeviceDetails extends CLZOObject {
    private BackgroundRateField = '';
    private BackgroundRateUOMField!: UOM;
    private TopUpDoseField = '';
    private TopUpDoseUOMField!: UOM;
    private LockOutPeriodField = 0;
    private LockOutPeriodUOMField!: UOM;

    public get BackgroundRate(): string {
        return this.BackgroundRateField;
    }

    public set BackgroundRate(value: string) {
        if ((Object.is(this.BackgroundRateField, value) != true)) {
            this.BackgroundRateField = value;
        }
    }

    public get BackgroundRateUOM(): UOM {
        return this.BackgroundRateUOMField;
    }

    public set BackgroundRateUOM(value: UOM) {
        if ((Object.is(this.BackgroundRateUOMField, value) != true)) {
            this.BackgroundRateUOMField = value;
        }
    }

    public get TopUpDose(): string {
        return this.TopUpDoseField;
    }

    public set TopUpDose(value: string) {
        if ((Object.is(this.TopUpDoseField, value) != true)) {
            this.TopUpDoseField = value;
        }
    }

    public get TopUpDoseUOM(): UOM {
        return this.TopUpDoseUOMField;
    }

    public set TopUpDoseUOM(value: UOM) {
        if ((Object.is(this.TopUpDoseUOMField, value) != true)) {
            this.TopUpDoseUOMField = value;
        }
    }

    public get LockOutPeriod(): number {
        return this.LockOutPeriodField;
    }
    public set LockOutPeriod(value: number) {
        if ((this.LockOutPeriodField != value)) {
            this.LockOutPeriodField = value;
        }
    }

    public get LockOutPeriodUOM(): UOM {
        return this.LockOutPeriodUOMField;
    }

    public set LockOutPeriodUOM(value: UOM) {
        if ((Object.is(this.LockOutPeriodUOMField, value) != true)) {
            this.LockOutPeriodUOMField = value;
        }
    }

}


export class PrescriptionItemFormViewParameters extends CLZOObject {
    private LineIndicatorField = '';
    private AdminDeviceField = '';
    private AdministeredByCodeField = '';
    private IntravenousInfusionDataField!: IntravenousInfusionDetails;
    private AdminDeviceDataField!: AdminDeviceDetails;

    public get LineIndicator(): string {
        return this.LineIndicatorField;
    }

    public set LineIndicator(value: string) {
        if (this.LineIndicatorField != value) {
            this.LineIndicatorField = value;
        }
    }

    public get AdminDevice(): string {
        return this.AdminDeviceField;
    }

    public set AdminDevice(value: string) {
        if ((Object.is(this.AdminDeviceField, value) != true)) {
            this.AdminDeviceField = value;
        }
    }

    public get AdministeredByCode(): string {
        return this.AdministeredByCodeField;
    }

    public set AdministeredByCode(value: string) {
        if ((Object.is(this.AdministeredByCodeField, value) != true)) {
            this.AdministeredByCodeField = value;
        }
    }

    public get IntravenousInfusionData(): IntravenousInfusionDetails {
        return this.IntravenousInfusionDataField;
    }

    public set IntravenousInfusionData(value: IntravenousInfusionDetails) {
        if ((Object.is(this.IntravenousInfusionDataField, value) != true)) {
            this.IntravenousInfusionDataField = value;
        }
    }

    public get AdminDeviceData(): AdminDeviceDetails {
        return this.AdminDeviceDataField;
    }

    public set AdminDeviceData(value: AdminDeviceDetails) {
        if ((Object.is(this.AdminDeviceDataField, value) != true)) {
            this.AdminDeviceDataField = value;
        }
    }

}

export class DrugMultiComponent extends CLZOObject {
    private DrugMultiComponentOIDField = 0;
    private ParentIdentifyingOIDField = 0;
    private IdentifyingTypeField = '';
    private IsEditableField = '';
    private PrescribableItemNameField = '';
    private PrescribableItemOIDField = 0;
    private QuantityField = 0;
    private UnitOfMeasureField!: UOM;
    private IsPrimaryField = '';
    private QuantityUOMField!: UOM;

    public get DrugMultiComponentOID(): number {
        return this.DrugMultiComponentOIDField;
    }
    public set DrugMultiComponentOID(value: number) {
        if ((this.DrugMultiComponentOIDField != value)) {
            this.DrugMultiComponentOIDField = value;
        }
    }

    public get ParentIdentifyingOID(): number {
        return this.ParentIdentifyingOIDField;
    }
    public set ParentIdentifyingOID(value: number) {
        if ((this.ParentIdentifyingOIDField != value)) {
            this.ParentIdentifyingOIDField = value;
        }
    }

    public get IdentifyingType(): string {
        return this.IdentifyingTypeField;
    }

    public set IdentifyingType(value: string) {
        if ((Object.is(this.IdentifyingTypeField, value) != true)) {
            this.IdentifyingTypeField = value;
        }
    }

    public get IsEditable(): string {
        return this.IsEditableField;
    }
    public set IsEditable(value: string) {
        if ((this.IsEditableField != value)) {
            this.IsEditableField = value;
        }
    }

    public get PrescribableItemName(): string {
        return this.PrescribableItemNameField;
    }

    public set PrescribableItemName(value: string) {
        if ((Object.is(this.PrescribableItemNameField, value) != true)) {
            this.PrescribableItemNameField = value;
        }
    }

    public get PrescribableItemOID(): number {
        return this.PrescribableItemOIDField;
    }
    public set PrescribableItemOID(value: number) {
        if ((this.PrescribableItemOIDField != value)) {
            this.PrescribableItemOIDField = value;
        }
    }

    public get Quantity(): number {
        return this.QuantityField;
    }
    public set Quantity(value: number) {
        if ((this.QuantityField != value)) {
            this.QuantityField = value;
        }
    }

    public get UnitOfMeasure(): UOM {
        return this.UnitOfMeasureField;
    }

    public set UnitOfMeasure(value: UOM) {
        if ((Object.is(this.UnitOfMeasureField, value) != true)) {
            this.UnitOfMeasureField = value;
        }
    }

    public get IsPrimary(): string {
        return this.IsPrimaryField;
    }
    public set IsPrimary(value: string) {
        if ((this.IsPrimaryField != value)) {
            this.IsPrimaryField = value;
        }
    }

    public get QuantityUOM(): UOM {
        return this.QuantityUOMField;
    }

    public set QuantityUOM(value: UOM) {
        if ((Object.is(this.QuantityUOMField, value) != true)) {
            this.QuantityUOMField = value;
        }
    }

}

export class LegalCategory extends CLZOObject {

    private LCIdField = 0;
    private LegalCategoryNameField = '';

    public get LCId(): number {
        return this.LCIdField;
    }
    public set LCId(value: number) {
        if ((this.LCIdField != value)) {
            this.LCIdField = value;
        }
    }

    public get LegalCategoryName(): string {
        return this.LegalCategoryNameField;
    }

    public set LegalCategoryName(value: string) {
        if ((Object.is(this.LegalCategoryNameField, value) != true)) {
            this.LegalCategoryNameField = value;
        }
    }

}

export class TechValidatedItem extends CLZOObject {
    private DrugItemField!: DrugItemBasicData;
    private QuantityPerDoseField = 0;
    private QuantityPerDoseUOMField!: ObjectInfo;
    private TotalQuantityField = 0;
    private TotalQuantityUOMField!: ObjectInfo;
    private SupplyInstructionField!: Array<ObjectInfo>;
    private DispensingInstructionField!: Array<ObjectInfo>;
    private ClinicalVerifyCommentsField = '';
    private PrescriptionItemTechOIDField = 0;
    private IsTechnicalvalidateField = '';
    private IdentifyingDomainField = '';
    private OtherDispensingInstructionField = '';

    public get DrugItem(): DrugItemBasicData {
        return this.DrugItemField;
    }

    public set DrugItem(value: DrugItemBasicData) {
        if ((Object.is(this.DrugItemField, value) != true)) {
            this.DrugItemField = value;
        }
    }

    public get QuantityPerDose(): number {
        return this.QuantityPerDoseField;
    }
    public set QuantityPerDose(value: number) {
        if ((this.QuantityPerDoseField != value)) {
            this.QuantityPerDoseField = value;
        }
    }

    public get QuantityPerDoseUOM(): ObjectInfo {
        return this.QuantityPerDoseUOMField;
    }

    public set QuantityPerDoseUOM(value: ObjectInfo) {
        if ((Object.is(this.QuantityPerDoseUOMField, value) != true)) {
            this.QuantityPerDoseUOMField = value;
        }
    }

    public get TotalQuantity(): number {
        return this.TotalQuantityField;
    }
    public set TotalQuantity(value: number) {
        if ((this.TotalQuantityField != value)) {
            this.TotalQuantityField = value;
        }
    }

    public get TotalQuantityUOM(): ObjectInfo {
        return this.TotalQuantityUOMField;
    }

    public set TotalQuantityUOM(value: ObjectInfo) {
        if ((Object.is(this.TotalQuantityUOMField, value) != true)) {
            this.TotalQuantityUOMField = value;
        }
    }

    public get SupplyInstruction(): Array<ObjectInfo> {
        return this.SupplyInstructionField;
    }

    public set SupplyInstruction(value: Array<ObjectInfo>) {
        if ((Object.is(this.SupplyInstructionField, value) != true)) {
            this.SupplyInstructionField = value;
        }
    }

    public get DispensingInstruction(): Array<ObjectInfo> {
        return this.DispensingInstructionField;
    }

    public set DispensingInstruction(value: Array<ObjectInfo>) {
        if ((Object.is(this.DispensingInstructionField, value) != true)) {
            this.DispensingInstructionField = value;
        }
    }

    public get ClinicalVerifyComments(): string {
        return this.ClinicalVerifyCommentsField;
    }

    public set ClinicalVerifyComments(value: string) {
        if ((Object.is(this.ClinicalVerifyCommentsField, value) != true)) {
            this.ClinicalVerifyCommentsField = value;
        }
    }

    public get PrescriptionItemTechOID(): number {
        return this.PrescriptionItemTechOIDField;
    }
    public set PrescriptionItemTechOID(value: number) {
        if ((this.PrescriptionItemTechOIDField != value)) {
            this.PrescriptionItemTechOIDField = value;
        }
    }

    public get IsTechnicalvalidate(): string {
        return this.IsTechnicalvalidateField;
    }

    public set IsTechnicalvalidate(value: string) {
        if ((Object.is(this.IsTechnicalvalidateField, value) != true)) {
            this.IsTechnicalvalidateField = value;
        }
    }

    public get IdentifyingDomain(): string {
        return this.IdentifyingDomainField;
    }

    public set IdentifyingDomain(value: string) {
        if ((Object.is(this.IdentifyingDomainField, value) != true)) {
            this.IdentifyingDomainField = value;
        }
    }

    public get OtherDispensingInstruction(): string {
        return this.OtherDispensingInstructionField;
    }

    public set OtherDispensingInstruction(value: string) {
        if ((Object.is(this.OtherDispensingInstructionField, value) != true)) {
            this.OtherDispensingInstructionField = value;
        }
    }

}


export class TechnicalValidationInfo extends CLZOObject {
    private PrescriptionOIDField = 0;
    private PrescriptionItemOIDField = 0;
    private ValidatedDTTMField = new Date();
    private ValidatedByField!: ObjectInfo;
    private TechValidatedItemsField!: Array<TechValidatedItem>;
    private ValidatorRoleNameField = '';
    private IsTechnicalvalidateField = '';
    private TechnicalvalidateupdateField = false;
    private EncounterOIDField = 0;
    private IsMergePatientField = '';

    public get PrescriptionOID(): number {
        return this.PrescriptionOIDField;
    }
    public set PrescriptionOID(value: number) {
        if ((this.PrescriptionOIDField != value)) {
            this.PrescriptionOIDField = value;
        }
    }

    public get PrescriptionItemOID(): number {
        return this.PrescriptionItemOIDField;
    }
    public set PrescriptionItemOID(value: number) {
        if ((this.PrescriptionItemOIDField != value)) {
            this.PrescriptionItemOIDField = value;
        }
    }

    public get ValidatedDTTM(): Date {
        return this.ValidatedDTTMField;
    }
    public set ValidatedDTTM(value: Date) {
        if ((this.ValidatedDTTMField != value)) {
            this.ValidatedDTTMField = value;
        }
    }

    public get ValidatedBy(): ObjectInfo {
        return this.ValidatedByField;
    }

    public set ValidatedBy(value: ObjectInfo) {
        if ((Object.is(this.ValidatedByField, value) != true)) {
            this.ValidatedByField = value;
        }
    }

    public get TechValidatedItems(): Array<TechValidatedItem> {
        return this.TechValidatedItemsField;
    }

    public set TechValidatedItems(value: Array<TechValidatedItem>) {
        if ((Object.is(this.TechValidatedItemsField, value) != true)) {
            this.TechValidatedItemsField = value;
        }
    }

    public get ValidatorRoleName(): string {
        return this.ValidatorRoleNameField;
    }

    public set ValidatorRoleName(value: string) {
        if ((Object.is(this.ValidatorRoleNameField, value) != true)) {
            this.ValidatorRoleNameField = value;
        }
    }

    public get IsTechnicalvalidate(): string {
        return this.IsTechnicalvalidateField;
    }

    public set IsTechnicalvalidate(value: string) {
        if ((Object.is(this.IsTechnicalvalidateField, value) != true)) {
            this.IsTechnicalvalidateField = value;
        }
    }

    public get Technicalvalidateupdate(): boolean {
        return this.TechnicalvalidateupdateField;
    }
    public set Technicalvalidateupdate(value: boolean) {
        if ((this.TechnicalvalidateupdateField != value)) {
            this.TechnicalvalidateupdateField = value;
        }
    }

    public get EncounterOID(): number {
        return this.EncounterOIDField;
    }
    public set EncounterOID(value: number) {
        if ((this.EncounterOIDField != value)) {
            this.EncounterOIDField = value;
        }
    }

    public get IsMergePatient(): string {
        return this.IsMergePatientField;
    }

    public set IsMergePatient(value: string) {
        if ((Object.is(this.IsMergePatientField, value) != true)) {
            this.IsMergePatientField = value;
        }
    }

}

export class PrescriptionItemAdminDetails extends CLZOObject {
    private OIDField = 0;
    private BatchNumberField = '';
    private ExpiryDateField = new Date();
    private WitnessedByField!: ObjectInfo;
    private AdministredDateField = new Date();
    private CommentsField = '';
    private DoseAdministeredField = '';
    private DoseAdministeredUOMField!: UOM;
    private AdministeredByField!: ObjectInfo;
    private AdminInstructionField = '';
    private RouteOIDField = 0;
    private IsPCAField = '';
    private SiteField!: ObjectInfo;

    public get OID(): number {
        return this.OIDField;
    }
    public set OID(value: number) {
        if ((this.OIDField != value)) {
            this.OIDField = value;
        }
    }

    public get BatchNumber(): string {
        return this.BatchNumberField;
    }

    public set BatchNumber(value: string) {
        if ((Object.is(this.BatchNumberField, value) != true)) {
            this.BatchNumberField = value;
        }
    }

    public get ExpiryDate(): Date {
        return this.ExpiryDateField;
    }
    public set ExpiryDate(value: Date) {
        if ((this.ExpiryDateField != value)) {
            this.ExpiryDateField = value;
        }
    }

    public get WitnessedBy(): ObjectInfo {
        return this.WitnessedByField;
    }

    public set WitnessedBy(value: ObjectInfo) {
        if ((Object.is(this.WitnessedByField, value) != true)) {
            this.WitnessedByField = value;
        }
    }

    public get AdministredDate(): Date {
        return this.AdministredDateField;
    }
    public set AdministredDate(value: Date) {
        if ((this.AdministredDateField != value)) {
            this.AdministredDateField = value;
        }
    }

    public get Comments(): string {
        return this.CommentsField;
    }

    public set Comments(value: string) {
        if ((Object.is(this.CommentsField, value) != true)) {
            this.CommentsField = value;
        }
    }

    public get DoseAdministered(): string {
        return this.DoseAdministeredField;
    }

    public set DoseAdministered(value: string) {
        if ((Object.is(this.DoseAdministeredField, value) != true)) {
            this.DoseAdministeredField = value;
        }
    }

    public get DoseAdministeredUOM(): UOM {
        return this.DoseAdministeredUOMField;
    }

    public set DoseAdministeredUOM(value: UOM) {
        if ((Object.is(this.DoseAdministeredUOMField, value) != true)) {
            this.DoseAdministeredUOMField = value;
        }
    }

    public get AdministeredBy(): ObjectInfo {
        return this.AdministeredByField;
    }

    public set AdministeredBy(value: ObjectInfo) {
        if ((Object.is(this.AdministeredByField, value) != true)) {
            this.AdministeredByField = value;
        }
    }

    public get AdminInstruction(): string {
        return this.AdminInstructionField;
    }

    public set AdminInstruction(value: string) {
        if ((Object.is(this.AdminInstructionField, value) != true)) {
            this.AdminInstructionField = value;
        }
    }

    public get RouteOID(): number {
        return this.RouteOIDField;
    }
    public set RouteOID(value: number) {
        if ((this.RouteOIDField != value)) {
            this.RouteOIDField = value;
        }
    }

    public get IsPCA(): string {
        return this.IsPCAField;
    }
    public set IsPCA(value: string) {
        if ((this.IsPCAField != value)) {
            this.IsPCAField = value;
        }
    }

    public get Site(): ObjectInfo {
        return this.SiteField;
    }

    public set Site(value: ObjectInfo) {
        if ((Object.is(this.SiteField, value) != true)) {
            this.SiteField = value;
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

    public get FirstMessage(): string {
        return this.FirstMessageField;
    }

    public set FirstMessage(value: string) {
        if ((Object.is(this.FirstMessageField, value) != true)) {
            this.FirstMessageField = value;
        }
    }

    public get SecondMessage(): string {
        return this.SecondMessageField;
    }

    public set SecondMessage(value: string) {
        if ((Object.is(this.SecondMessageField, value) != true)) {
            this.SecondMessageField = value;
        }
    }

    public get ThirdMessage(): string {
        return this.ThirdMessageField;
    }

    public set ThirdMessage(value: string) {
        if ((Object.is(this.ThirdMessageField, value) != true)) {
            this.ThirdMessageField = value;
        }
    }

    public get FourthMessage(): string {
        return this.FourthMessageField;
    }

    public set FourthMessage(value: string) {
        if ((Object.is(this.FourthMessageField, value) != true)) {
            this.FourthMessageField = value;
        }
    }

    public get FifthMessage(): string {
        return this.FifthMessageField;
    }

    public set FifthMessage(value: string) {
        if ((Object.is(this.FifthMessageField, value) != true)) {
            this.FifthMessageField = value;
        }
    }

    public get SixthMessage(): string {
        return this.SixthMessageField;
    }

    public set SixthMessage(value: string) {
        if ((Object.is(this.SixthMessageField, value) != true)) {
            this.SixthMessageField = value;
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
    private MessageFormatField!: MessageFormat;
    private PrescriptionItemField!: ObjectInfo;
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

    public get WarningOID(): number {
        return this.WarningOIDField;
    }
    public set WarningOID(value: number) {
        if ((this.WarningOIDField != value)) {
            this.WarningOIDField = value;
        }
    }

    public get WarningType(): string {
        return this.WarningTypeField;
    }

    public set WarningType(value: string) {
        if ((Object.is(this.WarningTypeField, value) != true)) {
            this.WarningTypeField = value;
        }
    }

    public get WarningSubType(): string {
        return this.WarningSubTypeField;
    }

    public set WarningSubType(value: string) {
        if ((Object.is(this.WarningSubTypeField, value) != true)) {
            this.WarningSubTypeField = value;
        }
    }

    public get WarningMessage(): string {
        return this.WarningMessageField;
    }

    public set WarningMessage(value: string) {
        if ((Object.is(this.WarningMessageField, value) != true)) {
            this.WarningMessageField = value;
        }
    }

    public get WarningSeverity(): string {
        return this.WarningSeverityField;
    }

    public set WarningSeverity(value: string) {
        if ((Object.is(this.WarningSeverityField, value) != true)) {
            this.WarningSeverityField = value;
        }
    }

    public get WarningBehaviourType(): string {
        return this.WarningBehaviourTypeField;
    }

    public set WarningBehaviourType(value: string) {
        if ((Object.is(this.WarningBehaviourTypeField, value) != true)) {
            this.WarningBehaviourTypeField = value;
        }
    }

    public get AcknowledgeStatus(): string {
        return this.AcknowledgeStatusField;
    }

    public set AcknowledgeStatus(value: string) {
        if ((Object.is(this.AcknowledgeStatusField, value) != true)) {
            this.AcknowledgeStatusField = value;
        }
    }

    public get PrescriberComments(): string {
        return this.PrescriberCommentsField;
    }

    public set PrescriberComments(value: string) {
        if ((Object.is(this.PrescriberCommentsField, value) != true)) {
            this.PrescriberCommentsField = value;
        }
    }

    public get AuthroiserComments(): string {
        return this.AuthroiserCommentsField;
    }

    public set AuthroiserComments(value: string) {
        if ((Object.is(this.AuthroiserCommentsField, value) != true)) {
            this.AuthroiserCommentsField = value;
        }
    }

    public get ClinicallVeriferComments(): string {
        return this.ClinicallVeriferCommentsField;
    }

    public set ClinicallVeriferComments(value: string) {
        if ((Object.is(this.ClinicallVeriferCommentsField, value) != true)) {
            this.ClinicallVeriferCommentsField = value;
        }
    }

    public get ApplicableTo(): string {
        return this.ApplicableToField;
    }

    public set ApplicableTo(value: string) {
        if ((Object.is(this.ApplicableToField, value) != true)) {
            this.ApplicableToField = value;
        }
    }

    public get IsProblem(): boolean {
        return this.IsProblemField;
    }
    public set IsProblem(value: boolean) {
        if ((this.IsProblemField != value)) {
            this.IsProblemField = value;
        }
    }

    public get ProblemText(): string {
        return this.ProblemTextField;
    }

    public set ProblemText(value: string) {
        if ((Object.is(this.ProblemTextField, value) != true)) {
            this.ProblemTextField = value;
        }
    }

    public get PerformedOn(): Date {
        return this.PerformedOnField;
    }
    public set PerformedOn(value: Date) {
        if ((this.PerformedOnField != value)) {
            this.PerformedOnField = value;
        }
    }

    public get MessageFormat(): MessageFormat {
        return this.MessageFormatField;
    }

    public set MessageFormat(value: MessageFormat) {
        if ((Object.is(this.MessageFormatField, value) != true)) {
            this.MessageFormatField = value;
        }
    }

    public get PrescriptionItem(): ObjectInfo {
        return this.PrescriptionItemField;
    }

    public set PrescriptionItem(value: ObjectInfo) {
        if ((Object.is(this.PrescriptionItemField, value) != true)) {
            this.PrescriptionItemField = value;
        }
    }

    public get ConflictMessage(): string {
        return this.ConflictMessageField;
    }

    public set ConflictMessage(value: string) {
        if ((Object.is(this.ConflictMessageField, value) != true)) {
            this.ConflictMessageField = value;
        }
    }

    public get DisplaySequenceNumber(): number {
        return this.DisplaySequenceNumberField;
    }
    public set DisplaySequenceNumber(value: number) {
        if ((this.DisplaySequenceNumberField != value)) {
            this.DisplaySequenceNumberField = value;
        }
    }

    public get MonoGraphcontentOID(): number {
        return this.MonoGraphcontentOIDField;
    }
    public set MonoGraphcontentOID(value: number) {
        if ((this.MonoGraphcontentOIDField != value)) {
            this.MonoGraphcontentOIDField = value;
        }
    }

    public get DrugMonoInfoOID(): number {
        return this.DrugMonoInfoOIDField;
    }
    public set DrugMonoInfoOID(value: number) {
        if ((this.DrugMonoInfoOIDField != value)) {
            this.DrugMonoInfoOIDField = value;
        }
    }

    public get SourceDataProviderType(): string {
        return this.SourceDataProviderTypeField;
    }

    public set SourceDataProviderType(value: string) {
        if ((Object.is(this.SourceDataProviderTypeField, value) != true)) {
            this.SourceDataProviderTypeField = value;
        }
    }

    public get AllergyMsgTrigged(): string {
        return this.AllergyMsgTriggedField;
    }

    public set AllergyMsgTrigged(value: string) {
        if ((Object.is(this.AllergyMsgTriggedField, value) != true)) {
            this.AllergyMsgTriggedField = value;
        }
    }

    public get Code(): string {
        return this.CodeField;
    }

    public set Code(value: string) {
        if ((Object.is(this.CodeField, value) != true)) {
            this.CodeField = value;
        }
    }

    public get ConflictType(): string {
        return this.ConflictTypeField;
    }

    public set ConflictType(value: string) {
        if ((Object.is(this.ConflictTypeField, value) != true)) {
            this.ConflictTypeField = value;
        }
    }

    public get sFrstNotAlrgyCheck(): string {
        return this.sFrstNotAlrgyCheckField;
    }

    public set sFrstNotAlrgyCheck(value: string) {
        if ((Object.is(this.sFrstNotAlrgyCheckField, value) != true)) {
            this.sFrstNotAlrgyCheckField = value;
        }
    }

    public get IsSeal(): string {
        return this.IsSealField;
    }

    public set IsSeal(value: string) {
        if ((Object.is(this.IsSealField, value) != true)) {
            this.IsSealField = value;
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

    public get PatientHeight(): string {
        return this.PatientHeightField;
    }

    public set PatientHeight(value: string) {
        if ((Object.is(this.PatientHeightField, value) != true)) {
            this.PatientHeightField = value;
        }
    }

    public get PatientWeight(): string {
        return this.PatientWeightField;
    }

    public set PatientWeight(value: string) {
        if ((Object.is(this.PatientWeightField, value) != true)) {
            this.PatientWeightField = value;
        }
    }

    public get BSAFormula(): string {
        return this.BSAFormulaField;
    }

    public set BSAFormula(value: string) {
        if ((Object.is(this.BSAFormulaField, value) != true)) {
            this.BSAFormulaField = value;
        }
    }

    public get BSAValue(): string {
        return this.BSAValueField;
    }

    public set BSAValue(value: string) {
        if ((Object.is(this.BSAValueField, value) != true)) {
            this.BSAValueField = value;
        }
    }

    public get UpdatePatientRecord(): string {
        return this.UpdatePatientRecordField;
    }
    public set UpdatePatientRecord(value: string) {
        if ((this.UpdatePatientRecordField != value)) {
            this.UpdatePatientRecordField = value;
        }
    }

    public get IsDailyDose(): string {
        return this.IsDailyDoseField;
    }
    public set IsDailyDose(value: string) {
        if ((this.IsDailyDoseField != value)) {
            this.IsDailyDoseField = value;
        }
    }

    public get RequestDose(): string {
        return this.RequestDoseField;
    }

    public set RequestDose(value: string) {
        if ((Object.is(this.RequestDoseField, value) != true)) {
            this.RequestDoseField = value;
        }
    }

    public get RequestDoseUOMOID(): number {
        return this.RequestDoseUOMOIDField;
    }
    public set RequestDoseUOMOID(value: number) {
        if ((this.RequestDoseUOMOIDField != value)) {
            this.RequestDoseUOMOIDField = value;
        }
    }

    public get RequestDoseUOMName(): string {
        return this.RequestDoseUOMNameField;
    }

    public set RequestDoseUOMName(value: string) {
        if ((Object.is(this.RequestDoseUOMNameField, value) != true)) {
            this.RequestDoseUOMNameField = value;
        }
    }

    public get RequestDosePer(): string {
        return this.RequestDosePerField;
    }

    public set RequestDosePer(value: string) {
        if ((Object.is(this.RequestDosePerField, value) != true)) {
            this.RequestDosePerField = value;
        }
    }

    public get CalculatedDose(): string {
        return this.CalculatedDoseField;
    }

    public set CalculatedDose(value: string) {
        if ((Object.is(this.CalculatedDoseField, value) != true)) {
            this.CalculatedDoseField = value;
        }
    }

    public get OrderedPerDose(): string {
        return this.OrderedPerDoseField;
    }

    public set OrderedPerDose(value: string) {
        if ((Object.is(this.OrderedPerDoseField, value) != true)) {
            this.OrderedPerDoseField = value;
        }
    }

    public get RoundedTo(): string {
        return this.RoundedToField;
    }

    public set RoundedTo(value: string) {
        if ((Object.is(this.RoundedToField, value) != true)) {
            this.RoundedToField = value;
        }
    }

    public get OrderedPerDay(): string {
        return this.OrderedPerDayField;
    }

    public set OrderedPerDay(value: string) {
        if ((Object.is(this.OrderedPerDayField, value) != true)) {
            this.OrderedPerDayField = value;
        }
    }

    public get OverrideReason(): string {
        return this.OverrideReasonField;
    }

    public set OverrideReason(value: string) {
        if ((Object.is(this.OverrideReasonField, value) != true)) {
            this.OverrideReasonField = value;
        }
    }

    public get ISAlwaysuseDosecalc(): string {
        return this.ISAlwaysuseDosecalcField;
    }

    public set ISAlwaysuseDosecalc(value: string) {
        if ((Object.is(this.ISAlwaysuseDosecalcField, value) != true)) {
            this.ISAlwaysuseDosecalcField = value;
        }
    }

}

export class OnBehalfInfo extends CLZOObject {
    private NotifyFlagField = '';
    private OnBehalfOfUserField!: ObjectInfo;
    private OnBehalfOfUserReasonField = '';
    private CommunicationModeField = '';

    public get NotifyFlag(): string {
        return this.NotifyFlagField;
    }
    public set NotifyFlag(value: string) {
        if ((this.NotifyFlagField != value)) {
            this.NotifyFlagField = value;
        }
    }

    public get OnBehalfOfUser(): ObjectInfo {
        return this.OnBehalfOfUserField;
    }

    public set OnBehalfOfUser(value: ObjectInfo) {
        if ((Object.is(this.OnBehalfOfUserField, value) != true)) {
            this.OnBehalfOfUserField = value;
        }
    }

    public get OnBehalfOfUserReason(): string {
        return this.OnBehalfOfUserReasonField;
    }

    public set OnBehalfOfUserReason(value: string) {
        if ((Object.is(this.OnBehalfOfUserReasonField, value) != true)) {
            this.OnBehalfOfUserReasonField = value;
        }
    }

    public get CommunicationMode(): string {
        return this.CommunicationModeField;
    }

    public set CommunicationMode(value: string) {
        if ((Object.is(this.CommunicationModeField, value) != true)) {
            this.CommunicationModeField = value;
        }
    }

}


export class PrescriptionItemAction extends CLZOObject {
    private IsActionPerformedField = '';
    private PerformedDTTMField = new Date();
    private PerformedByField!: ObjectInfo;
    private ReasonForModificationField = '';
    private CommentsField = '';
    private ActionCodeField = '';
    private VerifyOnBehalfField!: OnBehalfInfo;
    private ModifiedItemOIDField = 0;
    private HoldReasonField = '';
    private OnlyUpdatedColumnField = '';
    private UpdateItemStatusField = '';
    private CancelDefaultAllergenField = '';
    private DirectDiscontinueReasonField = '';
    private ModificationCommentsField = '';
    private AmendOfItemNoField = '';
    private ReconcileCommentsField = '';
    private IsClinicalVerHisLinkField = false;
    private CVStatusCodeField = '';

    public get IsActionPerformed(): string {
        return this.IsActionPerformedField;
    }
    public set IsActionPerformed(value: string) {
        if ((this.IsActionPerformedField != value)) {
            this.IsActionPerformedField = value;
        }
    }

    public get PerformedDTTM(): Date {
        return this.PerformedDTTMField;
    }
    public set PerformedDTTM(value: Date) {
        if ((this.PerformedDTTMField != value)) {
            this.PerformedDTTMField = value;
        }
    }

    public get PerformedBy(): ObjectInfo {
        return this.PerformedByField;
    }

    public set PerformedBy(value: ObjectInfo) {
        if ((Object.is(this.PerformedByField, value) != true)) {
            this.PerformedByField = value;
        }
    }

    public get ReasonForModification(): string {
        return this.ReasonForModificationField;
    }

    public set ReasonForModification(value: string) {
        if ((Object.is(this.ReasonForModificationField, value) != true)) {
            this.ReasonForModificationField = value;
        }
    }

    public get Comments(): string {
        return this.CommentsField;
    }

    public set Comments(value: string) {
        if ((Object.is(this.CommentsField, value) != true)) {
            this.CommentsField = value;
        }
    }

    public get ActionCode(): string {
        return this.ActionCodeField;
    }

    public set ActionCode(value: string) {
        if ((Object.is(this.ActionCodeField, value) != true)) {
            this.ActionCodeField = value;
        }
    }

    public get VerifyOnBehalf(): OnBehalfInfo {
        return this.VerifyOnBehalfField;
    }

    public set VerifyOnBehalf(value: OnBehalfInfo) {
        if ((Object.is(this.VerifyOnBehalfField, value) != true)) {
            this.VerifyOnBehalfField = value;
        }
    }

    public get ModifiedItemOID(): number {
        return this.ModifiedItemOIDField;
    }
    public set ModifiedItemOID(value: number) {
        if ((this.ModifiedItemOIDField != value)) {
            this.ModifiedItemOIDField = value;
        }
    }

    public get HoldReason(): string {
        return this.HoldReasonField;
    }

    public set HoldReason(value: string) {
        if ((Object.is(this.HoldReasonField, value) != true)) {
            this.HoldReasonField = value;
        }
    }

    public get OnlyUpdatedColumn(): string {
        return this.OnlyUpdatedColumnField;
    }

    public set OnlyUpdatedColumn(value: string) {
        if ((Object.is(this.OnlyUpdatedColumnField, value) != true)) {
            this.OnlyUpdatedColumnField = value;
        }
    }

    public get UpdateItemStatus(): string {
        return this.UpdateItemStatusField;
    }

    public set UpdateItemStatus(value: string) {
        if ((Object.is(this.UpdateItemStatusField, value) != true)) {
            this.UpdateItemStatusField = value;
        }
    }

    public get CancelDefaultAllergen(): string {
        return this.CancelDefaultAllergenField;
    }

    public set CancelDefaultAllergen(value: string) {
        if ((Object.is(this.CancelDefaultAllergenField, value) != true)) {
            this.CancelDefaultAllergenField = value;
        }
    }

    public get DirectDiscontinueReason(): string {
        return this.DirectDiscontinueReasonField;
    }

    public set DirectDiscontinueReason(value: string) {
        if ((Object.is(this.DirectDiscontinueReasonField, value) != true)) {
            this.DirectDiscontinueReasonField = value;
        }
    }

    public get ModificationComments(): string {
        return this.ModificationCommentsField;
    }

    public set ModificationComments(value: string) {
        if ((Object.is(this.ModificationCommentsField, value) != true)) {
            this.ModificationCommentsField = value;
        }
    }

    public get AmendOfItemNo(): string {
        return this.AmendOfItemNoField;
    }

    public set AmendOfItemNo(value: string) {
        if ((Object.is(this.AmendOfItemNoField, value) != true)) {
            this.AmendOfItemNoField = value;
        }
    }

    public get ReconcileComments(): string {
        return this.ReconcileCommentsField;
    }

    public set ReconcileComments(value: string) {
        if ((Object.is(this.ReconcileCommentsField, value) != true)) {
            this.ReconcileCommentsField = value;
        }
    }

    public get IsClinicalVerHisLink(): boolean {
        return this.IsClinicalVerHisLinkField;
    }
    public set IsClinicalVerHisLink(value: boolean) {
        if ((this.IsClinicalVerHisLinkField != value)) {
            this.IsClinicalVerHisLinkField = value;
        }
    }

    public get CVStatusCode(): string {
        return this.CVStatusCodeField;
    }

    public set CVStatusCode(value: string) {
        if ((Object.is(this.CVStatusCodeField, value) != true)) {
            this.CVStatusCodeField = value;
        }
    }

}

export class DoseFormula extends CLZOObject {
    private BSAFormulaField = '';
    private DoseCalcBasedOnField = '';
    private CalculationForField = '';
    private RequestedDoseField = '';
    private RequestedUOMField!: UOM;
    private RequestDosePerUOMField = '';
    private RoundOffDoseField = '';
    private IsDoseCalcAlwaysUseField = '';
    private RequestedUOMOIDField = 0;
    private RequestedUOMNameField = '';
    private MCVersionField = '';
    private IsCopyFavField = '';

    public get BSAFormula(): string {
        return this.BSAFormulaField;
    }

    public set BSAFormula(value: string) {
        if ((Object.is(this.BSAFormulaField, value) != true)) {
            this.BSAFormulaField = value;
        }
    }

    public get DoseCalcBasedOn(): string {
        return this.DoseCalcBasedOnField;
    }

    public set DoseCalcBasedOn(value: string) {
        if ((Object.is(this.DoseCalcBasedOnField, value) != true)) {
            this.DoseCalcBasedOnField = value;
        }
    }

    public get CalculationFor(): string {
        return this.CalculationForField;
    }

    public set CalculationFor(value: string) {
        if ((Object.is(this.CalculationForField, value) != true)) {
            this.CalculationForField = value;
        }
    }

    public get RequestedDose(): string {
        return this.RequestedDoseField;
    }

    public set RequestedDose(value: string) {
        if ((Object.is(this.RequestedDoseField, value) != true)) {
            this.RequestedDoseField = value;
        }
    }

    public get RequestedUOM(): UOM {
        return this.RequestedUOMField;
    }

    public set RequestedUOM(value: UOM) {
        if ((Object.is(this.RequestedUOMField, value) != true)) {
            this.RequestedUOMField = value;
        }
    }

    public get RequestDosePerUOM(): string {
        return this.RequestDosePerUOMField;
    }

    public set RequestDosePerUOM(value: string) {
        if ((Object.is(this.RequestDosePerUOMField, value) != true)) {
            this.RequestDosePerUOMField = value;
        }
    }

    public get RoundOffDose(): string {
        return this.RoundOffDoseField;
    }

    public set RoundOffDose(value: string) {
        if ((Object.is(this.RoundOffDoseField, value) != true)) {
            this.RoundOffDoseField = value;
        }
    }

    public get IsDoseCalcAlwaysUse(): string {
        return this.IsDoseCalcAlwaysUseField;
    }

    public set IsDoseCalcAlwaysUse(value: string) {
        if ((Object.is(this.IsDoseCalcAlwaysUseField, value) != true)) {
            this.IsDoseCalcAlwaysUseField = value;
        }
    }

    public get RequestedUOMOID(): number {
        return this.RequestedUOMOIDField;
    }
    public set RequestedUOMOID(value: number) {
        if ((this.RequestedUOMOIDField != value)) {
            this.RequestedUOMOIDField = value;
        }
    }

    public get RequestedUOMName(): string {
        return this.RequestedUOMNameField;
    }

    public set RequestedUOMName(value: string) {
        if ((Object.is(this.RequestedUOMNameField, value) != true)) {
            this.RequestedUOMNameField = value;
        }
    }

    public get MCVersion(): string {
        return this.MCVersionField;
    }

    public set MCVersion(value: string) {
        if ((Object.is(this.MCVersionField, value) != true)) {
            this.MCVersionField = value;
        }
    }

    public get IsCopyFav(): string {
        return this.IsCopyFavField;
    }

    public set IsCopyFav(value: string) {
        if ((Object.is(this.IsCopyFavField, value) != true)) {
            this.IsCopyFavField = value;
        }
    }

}
