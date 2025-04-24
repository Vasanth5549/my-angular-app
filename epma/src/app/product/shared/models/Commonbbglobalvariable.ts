export class ContextInfo {
  public static get SecurityToken(): string {
    return this.SecurityToken;
  }
  public static set SecurityToken(value: string) {
    this.SecurityToken = value;
  }
  public static get UserOID(): number {
    return this.UserOID;
  }
  public static set UserOID(value: number) {
    this.UserOID = value;
  }
  public static get MenuCode(): string {
    return this.MenuCode;
  }
  public static set MenuCode(value: string) {
    this.MenuCode = value;
  }
  public static get ReleaseVersion(): number {
    return this.ReleaseVersion;
  }
  public static set ReleaseVersion(value: number) {
    this.ReleaseVersion = value;
  }
  public static get Culture(): string {
    return this.Culture;
  }
  public static set Culture(value: string) {
    this.Culture = value;
  }
}
export enum ClerkFormViewDeftBehaviour {
  LaunchFormNoMandatory,

  LaunchFormMandatory,

  DoNotLaunchForm,

  None,
}
export class PatientContext {
  public static get ClerkFormViewDefaultBehavior(): ClerkFormViewDeftBehaviour {
    return this.ClerkFormViewDefaultBehavior;
  }
  public static set ClerkFormViewDefaultBehavior(
    value: ClerkFormViewDeftBehaviour
  ) {
    this.ClerkFormViewDefaultBehavior = value;
  }
  public static get PatientOID(): number {
    return this.PatientOID;
  }
  public static set PatientOID(value: number) {
    this.PatientOID = value;
  }
  public static get PatientAge(): string {
    return this.PatientAge;
  }
  public static set PatientAge(value: string) {
    this.PatientAge = value;
  }
  public static get EncounterOid(): number {
    return this.EncounterOid;
  }
  public static set EncounterOid(value: number) {
    this.EncounterOid = value;
  }
  public static get EncounterType(): string {
    return this.EncounterType;
  }
  public static set EncounterType(value: string) {
    this.EncounterType = value;
  }
  public static get EncounterCode(): string {
    return this.EncounterCode;
  }
  public static set EncounterCode(value: string) {
    this.EncounterType = value;
  }
  public static get Sex(): string {
    return this.Sex;
  }
  public static set Sex(value: string) {
    this.Sex = value;
  }
  public static get DOB(): string {
    return this.DOB;
  }
  public static set DOB(value: string) {
    this.DOB = value;
  }
  public static get PrescriptionType(): string {
    return this.PrescriptionType;
  }
  public static set PrescriptionType(value: string) {
    this.PrescriptionType = value;
  }
  public static get BSA(): string {
    return this.BSA;
  }
  public static set BSA(value: string) {
    this.BSA = value;
  }

  //RR DRC
  public static get PatientWEIGHT(): string {
    return this.PatientWEIGHT;
  }
  public static set PatientWEIGHT(value: string) {
    this.PatientWEIGHT = value;
  }
  //  [System.ComponentModel.DefaultValue(true)]
  public static get IsTurnONDRC(): boolean {
    return this.IsTurnONDRC;
  }
  public static set IsTurnONDRC(value: boolean) {
    this.IsTurnONDRC = value;
  }
  public static get Age(): number {
    return this.Age;
  }
  public static set Age(value: number) {
    this.Age = value;
  }
  public static get MergedPatientOID(): number {
    return this.MergedPatientOID;
  }
  public static set MergedPatientOID(value: number) {
    this.MergedPatientOID = value;
  }
  //Ramya-cs-646151
  public static get IsMergedPatient(): string {
    return this.IsMergedPatient;
  }
  public static set IsMergedPatient(value: string) {
    this.IsMergedPatient = value;
  }
  //
  public static get PrescriptionMCVersionNo(): string {
    return this.PrescriptionMCVersionNo;
  }
  public static set PrescriptionMCVersionNo(value: string) {
    this.PrescriptionMCVersionNo = value;
  }
  public static get PrescriptionIdentyType(): string {
    return this.PrescriptionIdentyType;
  }
  public static set PrescriptionIdentyType(value: string) {
    this.PrescriptionIdentyType = value;
  }
  public static get PrescriptionIdentifyingOID(): number {
    return this.PrescriptionIdentifyingOID;
  }
  public static set PrescriptionIdentifyingOID(value: number) {
    this.PrescriptionIdentifyingOID = value;
  }
  public static get PrescriptionItemOID(): number {
    return this.PrescriptionItemOID;
  }
  public static set PrescriptionItemOID(value: number) {
    this.PrescriptionItemOID = value;
  }
  public static get EncounterStartDate(): Date {
    return this.EncounterStartDate;
  }
  public static set EncounterStartDate(value: Date) {
    this.EncounterStartDate = value;
  }

  public static get EncounterStartDateTime(): Date {
    return this.EncounterStartDateTime;
  }
  public static set EncounterStartDateTime(value: Date) {
    this.EncounterStartDateTime = value;
  }
  public static get IsAgeSexFilledforConflict(): boolean {
    return this.IsAgeSexFilledforConflict;
  }
  public static set IsAgeSexFilledforConflict(value: boolean) {
    this.IsAgeSexFilledforConflict = value;
  }
  //Epic - 8063,8083

  public static get bIsDrugRoundvw(): boolean {
    return this.bIsDrugRoundvw;
  }
  public static set bIsDrugRoundvw(value: boolean) {
    this.bIsDrugRoundvw = value;
  }
  public static get RoleProfileOID(): string {
    return this.RoleProfileOID;
  }
  public static set RoleProfileOID(value: string) {
    this.RoleProfileOID = value;
  }
  public static get PrescriptionOID(): string {
    return this.PrescriptionOID;
  }
  public static set PrescriptionOID(value: string) {
    this.PrescriptionOID = value;
  }
  //  [System.ComponentModel.DefaultValue(true)]
  public static get IPPMADU(): boolean {
    return this.IPPMADU;
  }
  public static set IPPMADU(value: boolean) {
    this.IPPMADU = value;
  }
  public static get TTOPBBDU(): boolean {
    return this.TTOPBBDU;
  }
  public static set TTOPBBDU(value: boolean) {
    this.TTOPBBDU = value;
  }
  //  [System.ComponentModel.DefaultValue(true)]
  public static get IsINFUSIONON(): boolean {
    return this.IsINFUSIONON;
  }
  public static set IsINFUSIONON(value: boolean) {
    this.IsINFUSIONON = value;
  }
  // [System.ComponentModel.DefaultValue(true)]

  public static get PrescriptionMCitemlist(): string {
    return this.PrescriptionMCitemlist;
  }
  public static set PrescriptionMCitemlist(value: string) {
    this.PrescriptionMCitemlist = value;
  }
  public static get PatientSealBreakExists(): boolean {
    return this.PatientSealBreakExists;
  }
  public static set PatientSealBreakExists(value: boolean) {
    this.PatientSealBreakExists = value;
  }
  //RR DU
  public static get TTOPBBDU_P2(): boolean {
    return this.TTOPBBDU_P2;
  }
  public static set TTOPBBDU_P2(value: boolean) {
    this.TTOPBBDU_P2 = value;
  }

  public static get IPPMADU_P2(): boolean {
    return this.IPPMADU_P2;
  }
  public static set IPPMADU_P2(value: boolean) {
    this.IPPMADU_P2 = value;
  }

  //To display "(estimated)" text in the DRC header message
  public static get IsEstimatedDOB(): boolean {
    return this.IsEstimatedDOB;
  }
  public static set IsEstimatedDOB(value: boolean) {
    this.IsEstimatedDOB = value;
  }

  //To display "weight & height recorded on" text in the DRC header message
  public static get PatientWeightRecordedOn(): string {
    return this.PatientWeightRecordedOn;
  }
  public static set PatientWeightRecordedOn(value: string) {
    this.PatientWeightRecordedOn = value;
  }
  public static get PatientHightRecordedOn(): string {
    return this.PatientHeightRecordedOn;
  }
  public static set PatientHeightRecordedOn(value: string) {
    this.PatientHeightRecordedOn = value;
  }

  public static get BSAFormula(): string {
    return this.BSAFormula;
  }
  public static set BSAFormula(value: string) {
    this.BSAFormula = value;
  }

  //LZO - 49454
  public static get BSAFormulaCode(): string {
    return this.BSAFormulaCode;
  }
  public static set BSAFormulaCode(value: string) {
    this.BSAFormulaCode = value;
  }
  public static get CalculatedBSA(): number {
    return this.CalculatedBSA;
  }
  public static set CalculatedBSA(value: number) {
    this.CalculatedBSA = value;
  }
  //RR Clerk
  //public static get(): ClerkFormViewDefaultBehavior:ClerkFormViewDeftBehaviour {return this.ClerkFormViewDefaultBehavior};
  //  public static set(value: ClerkFormViewDefaultBehavior:ClerkFormViewDeftBehaviour) { this.ClerkFormViewDefaultBehavior= value};
  public static get IdentifyingOids(): string {
    return this.IdentifyingOids;
  }
  public static set IdentifyingOids(value: string) {
    this.IdentifyingOids = value;
  }
  public static get IdentifyingTypes(): string {
    return this.IdentifyingTypes;
  }
  public static set IdentifyingTypes(value: string) {
    this.IdentifyingTypes = value;
  }
  //Phani -- 66893 -- DRC to Estimated prescribing considerations
  public static get isEstimatedWeight(): boolean {
    return this.isEstimatedWeight;
  }
  public static set isEstimatedWeight(value: boolean) {
    this.isEstimatedWeight = value;
  }
  public static get isEstimatedHeight(): boolean {
    return this.isEstimatedHeight;
  }
  public static set isEstimatedHeight(value: boolean) {
    this.isEstimatedHeight = value;
  }

  public static get PatientHEIGHT(): string {
    return this.PatientHEIGHT;
  }
  public static set PatientHEIGHT(value: string) {
    this.PatientHEIGHT = value;
  }
  //TFSID-85176 QCID-220744
  public static get IsPDSTraced(): boolean {
    return this.IsPDSTraced;
  }
  public static set IsPDSTraced(value: boolean) {
    this.IsPDSTraced = value;
  }

  //DC - Bala
  public static get PatientHeightDTTM(): Date {
    return this.PatientHeightDTTM;
  }
  public static set PatientWeightDTTM(value: Date) {
    this.PatientWeightDTTM = value;
  }
  public static get PatLatHWDTTM(): Date {
    return this.PatLatHWDTTM;
  }
  public static set PatLatHWDTTM(value: Date) {
    this.PatLatHWDTTM = value;
  }
  //RR DC
  public static get EncounterStatusCode(): string {
    return this.EncounterStatusCode;
  }
  public static set EncounterStatusCode(value: string) {
    this.EncounterStatusCode = value;
  }
  //NPK - 91670 - HIMSS - CLMA - MainApp - Start
  public static get PatientPASID(): string {
    return this.PatientPASID;
  }
  public static set PatientPASID(value: string) {
    this.PatientPASID = value;
  }
  //NPK - 91670 - HIMSS - CLMA - MainApp - End

  public static get IsFromEPR(): boolean {
    return this.IsFromEPR;
  }
  public static set IsFromEPR(value: boolean) {
    this.IsFromEPR = value;
  }
  //RR SV P2
  //QC 228060 TFS 116242
  public static get IsPatientTranferAct(): string {
    return this.IsPatientTranferAct;
  }
  public static set IsPatientTranferAct(value: string) {
    this.IsPatientTranferAct = value;
  }
}
export class AppContextInfo {
  public static get OrganisationName(): string {
    return this.OrganisationName;
  }
  public static set OrganisationName(value: string) {
    this.OrganisationName = value;
  }
  public static get OrganisationOID(): string {
    return this.OrganisationOID;
  }
  public static set OrganisationOID(value: string) {
    this.OrganisationOID = value;
  }
  public static get JobRoleOID(): string {
    return this.JobRoleOID;
  }
  public static set JobRoleOID(value: string) {
    this.JobRoleOID = value;
  }
  public static get JobRoleName(): string {
    return this.JobRoleName;
  }
  public static set JobRoleName(value: string) {
    this.JobRoleName = value;
  }
  public static get RoleProfileName(): string {
    return this.RoleProfileName;
  }
  public static set RoleProfileName(value: string) {
    this.RoleProfileName = value;
  }
  public static get SpecialtyOID(): string {
    return this.SpecialtyOID;
  }
  public static set SpecialtyOID(value: string) {
    this.SpecialtyOID = value;
  }
  public static get TeamNames(): string {
    return this.TeamNames;
  }
  public static set TeamNames(value: string) {
    this.TeamNames = value;
  }
  public static get TeamOIDs(): string {
    return this.TeamOIDs;
  }
  public static set TeamOIDs(value: string) {
    this.TeamOIDs = value;
  }

  public static get UserOID(): string {
    return this.UserOID;
  }
  public static set UserOID(value: string) {
    this.UserOID = value;
  }
  public static get UserName(): string {
    return this.UserName;
  }
  public static set UserName(value: string) {
    this.UserName = value;
  }
}
// export class BindingObject {
//   static bhttpbind: BasicHttpBinding;
//   static BindingObject() {
//     if (!ObjectHelper.HasValue(CommonBB.IsHTTPS)) {
//       //  todoangular  -->    //  CommonBB.IsHTTPS = System.Windows.Browser.HtmlPage.Document.DocumentUri.AbsoluteUri.StartsWith("https".toUpperCase());
//     }

//     this.bhttpbind = CommonBB.IsHTTPS.value
//       ? new BasicHttpBinding(BasicHttpSecurityMode.Transport)
//       : new BasicHttpBinding();
//     this.bhttpbind.MaxReceivedMessageSize = 2147483647;
//   }

//   public static GetBasicHttpBindingObject(): BasicHttpBinding {
//     return this.bhttpbind;
//   }
// }
export class WebServiceURLBB {
  public static get QueryPatientRecordWS(): string {
    return this.QueryPatientRecordWS;
  }

  public static set QueryPatientRecordWS(value: string) {
    value = this.QueryPatientRecordWS;
  }
  public static get CReferenceWSWS(): string {
    return this.CReferenceWSWS;
  }
  public static set CReferenceWSWS(value: string) {
    this.CReferenceWSWS = value;
  }
}

export class AppSessionInfo {
  public static get AMCV(): string {
    return this.AMCV;
  }
  public static set AMCV(value: string) {
    value = this.AMCV;
  }
}
