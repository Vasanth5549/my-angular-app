// const resourceCulture = "";
const Data = [
  { key: 'cmdCancel_Text', value: 'Cancel' },
  { key: 'cmdClose_Text', value: 'Close' },
  { key: 'cmdOk_Text', value: 'Ok' },
  { key: 'EncounterID_Header', value: 'EncounterID' },
  { key: 'EncounterStatus_Header', value: 'EncounterStatus' },
  { key: 'EncounterType_Header', value: 'EncounterType' },
  { key: 'Encounter_Header', value: 'Encounter' },
  { key: 'lblAssocIndications_Text', value: 'Associated indications' },
  { key: 'lblPatientProblems_Text', value: 'Patient problems' },
  { key: 'OtherInformation_Header', value: 'Other information' },
  { key: 'PrescriptionItem_Header', value: 'Prescription item' },
  { key: 'StartDateIco_Header', value: 'Start date' },
  { key: 'cmdClose_Tooltip', value: 'Click to close' },
  { key: 'Norecords_Text', value: 'No records to show' },
  { key: 'Reorder_ImgTooltip', value: 'Select to copy across' },
  { key: 'StatusIcon_ImgTooltip', value: 'Status details' },
  { key: 'ViewDetails_ImgTooltip', value: 'Select to view details' },
  { key: 'DOCKER_Tooltip', value: 'Click to open the panel' },
  { key: 'Multicomponent_Caption', value: 'Multiple component item' },
  { key: 'Type_Header', value: 'Type' },
  { key: 'Quantity_Header', value: 'Quantity' },
  { key: 'Additionaldetails_Header', value: 'Additional details' },
  { key: 'Additionaldetails_Tooltip', value: 'Additional details' },
  { key: 'LastIssued_Header', value: 'Last issued' },
  { key: 'MedicationItem_Header', value: 'Medication item' },
  { key: 'NoRecordsText', value: 'No records to show' },
  { key: 'GpConnectDoseLabel', value: 'DOSE' },
  { key: 'GPConnAddlDtl_Caresetting', value: 'Care setting' },
  { key: 'GPConnAddlDtl_Encounter', value: 'Encounter' },
  { key: 'GPConnAddlDtl_Intent', value: 'Intent' },
  { key: 'GPConnAddlDtl_Quantity', value: 'Quantity' },
  { key: 'GPConnAddlDtl_PlanDetails', value: 'Plan details' },
  { key: 'GPConnAddlDtl_Title', value: 'Additional details - LORENZO' },
  { key: 'GPConnAddlDtl_Dosage', value: 'Dosage' },
  { key: 'GPConnAddlDtl_Instructions', value: 'Instructions' },
  { key: 'GPConnAddlDtl_Noofrepeatsallowed', value: 'No of repeats allowed' },
  { key: 'GPConnAddlDtl_Noofrepeatsissued', value: 'No of repeats issued' },
  { key: 'GPConnAddlDtl_IssueDetails', value: 'Issue details :' },
  { key: 'GPConnAddlDtl_Startdate', value: 'Start date' },
  { key: 'GPConnAddlDtl_Enddate', value: 'End date' },
  { key: 'GPConnAddlDtl_SnomedCode', value: 'SNOMED Code' },
  { key: 'GPConnAddlDtl_Identifier', value: 'Identifier' },
  { key: 'GPConnAddlDtl_IntentVal', value: 'Plan' },
  { key: 'GPConnAddlDtl_RepeatFromAndToDate', value: 'to' },
  {
    key: 'lblGPconnect_disclaimer',
    value:
      'Some data may have been removed due to patient preference, confidentiality or may be incomplete due to other reasons.  Refer to GP connect viewer and other sources to validate.',
  },
  {
    key: 'lblGPCStopComp_Text',
    value:
      'View shows Active GP medications and includes any medications recently completed or stopped',
  },
];
class ResourceManager {
  static GetString(key: string, resourceCulture: any): string {
    let r = Data.find((e) => e.key == key);
    return r != undefined ? r.value : '';
  }
}
export class Medlistdetails {
  // private static resourceMan: System.Resources.ResourceManager;
  private static resourceCulture = '';
  constructor() {}
  public static get Additionaldetails_Header(): string {
    return ResourceManager.GetString(
      'Additionaldetails_Header',
      Medlistdetails.resourceCulture
    );
  }
  public static get Additionaldetails_Tooltip(): string {
    return ResourceManager.GetString(
      'Additionaldetails_Tooltip',
      Medlistdetails.resourceCulture
    );
  }
  public static get cmdCancel_Text(): string {
    return ResourceManager.GetString(
      'cmdCancel_Text',
      Medlistdetails.resourceCulture
    );
  }
  public static get cmdClose_Text(): string {
    return ResourceManager.GetString(
      'cmdClose_Text',
      Medlistdetails.resourceCulture
    );
  }
  public static get cmdClose_Tooltip(): string {
    return ResourceManager.GetString(
      'cmdClose_Tooltip',
      Medlistdetails.resourceCulture
    );
  }
  public static get cmdOk_Text(): string {
    return ResourceManager.GetString(
      'cmdOk_Text',
      Medlistdetails.resourceCulture
    );
  }
  public static get DOCKER_Tooltip(): string {
    return ResourceManager.GetString(
      'DOCKER_Tooltip',
      Medlistdetails.resourceCulture
    );
  }
  public static get Encounter_Header(): string {
    return ResourceManager.GetString(
      'Encounter_Header',
      Medlistdetails.resourceCulture
    );
  }
  public static get EncounterID_Header(): string {
    return ResourceManager.GetString(
      'EncounterID_Header',
      Medlistdetails.resourceCulture
    );
  }
  public static get EncounterStatus_Header(): string {
    return ResourceManager.GetString(
      'EncounterStatus_Header',
      Medlistdetails.resourceCulture
    );
  }
  public static get EncounterType_Header(): string {
    return ResourceManager.GetString(
      'EncounterType_Header',
      Medlistdetails.resourceCulture
    );
  }
  public static get GpConnectDoseLabel(): string {
    return ResourceManager.GetString(
      'GpConnectDoseLabel',
      Medlistdetails.resourceCulture
    );
  }
  public static get GPConnAddlDtl_Caresetting(): string {
    return ResourceManager.GetString(
      'GPConnAddlDtl_Caresetting',
      Medlistdetails.resourceCulture
    );
  }
  public static get GPConnAddlDtl_Dosage(): string {
    return ResourceManager.GetString(
      'GPConnAddlDtl_Dosage',
      Medlistdetails.resourceCulture
    );
  }
  public static get GPConnAddlDtl_Encounter(): string {
    return ResourceManager.GetString(
      'GPConnAddlDtl_Encounter',
      Medlistdetails.resourceCulture
    );
  }
  public static get GPConnAddlDtl_Enddate(): string {
    return ResourceManager.GetString(
      'GPConnAddlDtl_Enddate',
      Medlistdetails.resourceCulture
    );
  }
  public static get GPConnAddlDtl_Identifier(): string {
    return ResourceManager.GetString(
      'GPConnAddlDtl_Identifier',
      Medlistdetails.resourceCulture
    );
  }
  public static get GPConnAddlDtl_Instructions(): string {
    return ResourceManager.GetString(
      'GPConnAddlDtl_Instructions',
      Medlistdetails.resourceCulture
    );
  }
  public static get GPConnAddlDtl_Intent(): string {
    return ResourceManager.GetString(
      'GPConnAddlDtl_Intent',
      Medlistdetails.resourceCulture
    );
  }
  public static get GPConnAddlDtl_IntentVal(): string {
    return ResourceManager.GetString(
      'GPConnAddlDtl_IntentVal',
      Medlistdetails.resourceCulture
    );
  }
  public static get GPConnAddlDtl_IssueDetails(): string {
    return ResourceManager.GetString(
      'GPConnAddlDtl_IssueDetails',
      Medlistdetails.resourceCulture
    );
  }
  public static get GPConnAddlDtl_Noofrepeatsallowed(): string {
    return ResourceManager.GetString(
      'GPConnAddlDtl_Noofrepeatsallowed',
      Medlistdetails.resourceCulture
    );
  }
  public static get GPConnAddlDtl_Noofrepeatsissued(): string {
    return ResourceManager.GetString(
      'GPConnAddlDtl_Noofrepeatsissued',
      Medlistdetails.resourceCulture
    );
  }
  public static get GPConnAddlDtl_PlanDetails(): string {
    return ResourceManager.GetString(
      'GPConnAddlDtl_PlanDetails',
      Medlistdetails.resourceCulture
    );
  }
  public static get GPConnAddlDtl_Quantity(): string {
    return ResourceManager.GetString(
      'GPConnAddlDtl_Quantity',
      Medlistdetails.resourceCulture
    );
  }
  public static get GPConnAddlDtl_RepeatFromAndToDate(): string {
    return ResourceManager.GetString(
      'GPConnAddlDtl_RepeatFromAndToDate',
      Medlistdetails.resourceCulture
    );
  }
  public static get GPConnAddlDtl_SnomedCode(): string {
    return ResourceManager.GetString(
      'GPConnAddlDtl_SnomedCode',
      Medlistdetails.resourceCulture
    );
  }
  public static get GPConnAddlDtl_Startdate(): string {
    return ResourceManager.GetString(
      'GPConnAddlDtl_Startdate',
      Medlistdetails.resourceCulture
    );
  }
  public static get GPConnAddlDtl_Title(): string {
    return ResourceManager.GetString(
      'GPConnAddlDtl_Title',
      Medlistdetails.resourceCulture
    );
  }
  public static get Quantity_Header(): string {
    return ResourceManager.GetString(
      'Quantity_Header',
      Medlistdetails.resourceCulture
    );
  }
  public static get LastIssued_Header(): string {
    return ResourceManager.GetString(
      'LastIssued_Header',
      Medlistdetails.resourceCulture
    );
  }
  public static get lblAssocIndications_Text(): string {
    return ResourceManager.GetString(
      'lblAssocIndications_Text',
      Medlistdetails.resourceCulture
    );
  }
  public static get lblGPCStopComp_Text(): string {
    return ResourceManager.GetString(
      'lblGPCStopComp_Text',
      Medlistdetails.resourceCulture
    );
  }
  public static get lblPatientProblems_Text(): string {
    return ResourceManager.GetString(
      'lblPatientProblems_Text',
      Medlistdetails.resourceCulture
    );
  }
  public static get MedicationItem_Header(): string {
    return ResourceManager.GetString(
      'MedicationItem_Header',
      Medlistdetails.resourceCulture
    );
  }
  public static get Multicomponent_Caption(): string {
    return ResourceManager.GetString(
      'Multicomponent_Caption',
      Medlistdetails.resourceCulture
    );
  }
  public static get Norecords_Text(): string {
    return ResourceManager.GetString(
      'Norecords_Text',
      Medlistdetails.resourceCulture
    );
  }
  public static get MaxPrescriptionAlert_Msg(): string {
    return ResourceManager.GetString(
      'MaxPrescriptionAlert_Msg',
      Medlistdetails.resourceCulture
    );
  }
  public static get MaxAmendPrescription_Msg(): string {
    return ResourceManager.GetString(
      'MaxAmendPrescription_Msg',
      Medlistdetails.resourceCulture
    );
  }
  public static get NoRecordsText(): string {
    return ResourceManager.GetString(
      'NoRecordsText',
      Medlistdetails.resourceCulture
    );
  }
  public static get OtherInformation_Header(): string {
    return ResourceManager.GetString(
      'OtherInformation_Header',
      Medlistdetails.resourceCulture
    );
  }
  public static get PrescriptionItem_Header(): string {
    return ResourceManager.GetString(
      'PrescriptionItem_Header',
      Medlistdetails.resourceCulture
    );
  }
  public static get Reorder_ImgTooltip(): string {
    return ResourceManager.GetString(
      'Reorder_ImgTooltip',
      Medlistdetails.resourceCulture
    );
  }
  public static get StartDateIco_Header(): string {
    return ResourceManager.GetString(
      'StartDateIco_Header',
      Medlistdetails.resourceCulture
    );
  }
  public static get StatusIcon_ImgTooltip(): string {
    return ResourceManager.GetString(
      'StatusIcon_ImgTooltip',
      Medlistdetails.resourceCulture
    );
  }
  public static get Type_Header(): string {
    return ResourceManager.GetString(
      'Type_Header',
      Medlistdetails.resourceCulture
    );
  }
  public static get ViewDetails_ImgTooltip(): string {
    return ResourceManager.GetString(
      'ViewDetails_ImgTooltip',
      Medlistdetails.resourceCulture
    );
  }
  public static get lblGPconnect_disclaimer(): string {
    return ResourceManager.GetString(
      'lblGPconnect_disclaimer',
      Medlistdetails.resourceCulture
    );
  }
}
