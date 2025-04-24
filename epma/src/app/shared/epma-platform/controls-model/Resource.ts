export class Resource_medsadmindetails {
  static DuringHomeLeave = '(During home leave)';
}

export class Resource_MedicationAdministrator {
  static rdbparent_text = 'Parent/Carer';
}

export class Resource_DoseCalculator {
  static IsEstimated_Text = '(Estimated)';
  static cmdCalcAJBW_Text = 'Calculated AJBW';
  static cmdCalcIBW_Text = 'Calculated IBW';
  static cmdCalcEBW_Text = 'Recorded/Estimated body weight';
  static lblTotalDailyDose_Text = 'Total daily dose';
  static lblFrequency_Text = 'Frequency';
  static lblCalcAmtPerDose_Text = 'Calculated amount per dose';
  static lblOrderedAmtPerDose_Text = 'Ordered amount per dose';
  static CalculatedBSA_Text = 'Calculated BSA';
  static CalculatedIBW_Text = 'Calculated IBW';
  static CalculatedABW_Text = 'Calculated AjBW';
  static ErrMsg_DecimalRoundingRequired =
    'The calculated dose amount value is decimal. Please consider rounding off the dose value.';
  static OrdAmtZeroErrorMsg =
    'Ordered amount per dose cannot be zero or empty.';
  static PerDayText = 'per day';
  static ErrMsg_ChkQualifiedFrequency =
    'Frequency cannot be used to calculate amount per dose.';
  static PerDoseText = 'per dose';
  static ErrMsg_Height_not_available =
    'Please update height as it’s not available.';
  static HeightOutOfDate = 'Please update height as it’s out of date.';
  static ErrMsg_Weight_not_available =
    'Please update weight as it’s not available.';
  static WeightOutOfDate = 'Please update weight as it’s out of date.';
  static ErrMsg_ValidateBSAHW_NotAvailable =
    'BSA cannot be calculated because the patient’s height/weight is not available.';
  static ErrMsg_ValidateWeight =
    'Cannot calculate BSA. Patient’s weight not available/out of date';
  static ErrMsg_ValidateBSAHW_outdate =
    'BSA cannot be calculated because the patient’s height/weight is out of date.';
  static ErrMsg_ValidateBSAHeight_NotAvailable =
    'BSA cannot be calculated because the patient’s height is not available.';
  static ErrMsg_ValidateBSAHeight_outdate =
    'BSA cannot be calculated because the patient’s height is out of date.';
  static ErrMsg_ValidateBSAWeight_NotAvailable = '';
  static ErrMsg_ValidateBSAWeight_Outdate =
    'BSA cannot be calculated because the patient’s weight is out of date.';
  static DoseCalMaxValueErrorMsg =
    'System cannot calculate the dose for out of range values.';
  static ErrMsg_ABWAdvisablePart1 =
    'Adjusted body weight is recommended for the calculation because the patient’s recorded weight is at least';
  static ErrMsg_ABWAdvisablePart2 = '% more or less than ideal body weight.';
  static ErrMsg_ValidateRBWWeight_NotAvailable =
    'Dose cannot be calculated because the patient weight is not available.';
  static ErrMsg_ValidateHeightIBW_NotAvailable =
    'IBW cannot be calculated because the patient height is not available.';
  static ErrMsg_ValidateHeightIBW_outdate =
    'IBW cannot be calculated because the patient height is out of date.';
  static ErrMsg_ValidateHeightOver60 =
    'IBW cannot be calculated as height needs to be over 152.4cm/1.524m (60 inches).';
  static ErrMsg_GenderNotCompatible =
    'IBW cannot be calculated based on the recorded patient gender. Please use recorded/estimated body weight to calculate dose.';
  static RecalculateErrMsg =
    'The height/weight values have been modified. Please re-calculate the dose.';
  static OptRecordedWeight_Text = 'Recorded/Estimated weight';
  static lblBSAFormula_Tex = 'BSA formula';
  static lblWeightOption_Text = 'Weight option';
  static ErrMsg_ValidateRBWWeight_Outdate =
    'Dose cannot be calculated because the patient weight is out of date.';
  static lblBSAFormula_Text = 'BSA formula';
}

export class Resource_DrugDetails {
  static Discontinuation_Header = 'Discontinuation';
  static Cancellation_Header = 'Cancellation';
  static ClerkedBy_Header = 'Clerked by';
  static RecordedAt_Header = 'Recorded at';
  static lblDateCommenced_Text = 'Date commenced';
  static lblStartDateName_Text = 'Start date';
  static RecordedBy_Header = 'Recorded by';
  static PGDSupply_Header = 'PGD for supply details';
  static PGDAdmin_Header = 'PGD for administration  details';
  static lblPrescribedBy_Text = 'Prescribed by';
  static lblPrescribedOn_Text = 'Prescribed on';
  static Comments = 'Comments=';
}

export class Resource_presItemUpdateHistory {
  static AdditionalComment_Field = 'Additional comments';
  static AdministrationInstruction_Field = 'Administration Instructions';
  static DeliveryDevice_Field = 'Delivery device';
  static DurationUom_Field = 'Duration &amp; UOM';
  static FlowRate_Field = 'Flow rate';
  static InfusionPeriod_Field = 'Infusion Period';
  static MaxDose_Field = 'Maximum dose';
  static OnAdmission_Field = 'On admission';
  static ProblemIndication_Field = 'Problem/Indication';
  static QuantityUom_Field = 'Quantity &amp; UOM';
  static StopDatetime_Field = 'Stop date/time';
  static TargetSaturationRange_Field = 'Target saturation range';
}
export class Resource_steppeddose {
  static NotYetRecorded_Text = 'Not yet recorded';
  static Patient = 'Patient';
  static AdditionalonceeonlyFutureOrPastDTTM_Msg =
    'Additional ONCE only doses cannot be prescribed for a past time or future date.';
  static DoseAlreadyExist_Msg =
    'A dose already exists for the same time. Click Ok to continue and adjust the time.';
  static DoseUOMForSubsequentSteps =
    'Changing the dose UOM will affect all the subsequent steps. Please correct the dose in other steps if necessary';
  static AdditionalDoseOnceOnly_Msg =
    'To commence this prescription today from the next available administration time: Click No, To defer this prescription until tomorrow and prescribe a single once only dose for today: Click Yes';
  static ScheduledTimeOverLap =
    'The scheduled time you have prescribed for this step overlaps with the previous step’s scheduled duration. Please select a different scheduled time.';
  static GivenAdministrationTimesNotFitInStep =
    'The given administration times do not fit in the provided duration. Please extend the duration or change the administration times to accommodate in the given time period';
  static SwitchingToChangingDoseView =
    'Switching to the changing dose view will clear all the dose values entered. Do you wish to continue?';
}

export class Resource_InfusionChart {
  static Lorenzo_Title = 'LORENZO';
  static InfRateInDose_Empty_Msg =
    'Please enter the infusion rate in dose per unit time to proceed with calculation. Dose calculator may be used if necessary';
  static InfConcentration_Empty_Msg =
    'Please ensure the infusion concentration is specified to proceed with calculation';
}
export class Resource_MedicationForm {
  static txtVerificationComments_Tooltip_Authorise = "Authoriser's comments";
  static chckClinicalVerify_Tooltip_Athorise = 'Select to Authorise item';
  static LaunchClrkMsg =
    'Do you want to add the GP medications to the clerking list?\r\nClick "Yes" to launch the clerking care activity or\r\nClick "No" to close this activity and finish.';
  static LockMsg =
    'User {0} has commenced prescribing for this patient. You cannot submit this prescription.';
  static ValidateStepAmendmentDuration =
    'Change in duration will affect the stop date/time of the prescription. Click Ok to continue or else click cancel';
  static Stepped_StopDTTMMismatchDurationMessage =
    'Stop date/time mismatches with the duration of the prescription. The stop date should be {0}';
  static Stepped_StopDTTMWithoutDurationMsg =
    'Stop date/time mismatches with the duration of the prescription. The stop date will be removed because the last step has no duration';
  static ManDaysofWeek = 'Enter days of the week, this field is mandatory.';
  static DuplicateChangeDoseTime =
    'Time {0} has already been selected as an administration time. Duplicate administration times cannot be added';
}

export class Resource_Infusion {
  static CombinedDuration_ValMsg =
    'The combined duration of each step in the stepped dosing regimen currently exceeds the infusion period. Please revisit the step duration to proceed.';
  static RecAdminAdministrationTime_Msg =
    'Enter administration times, this field is mandatory.';
  static cbofrequency_Msg =
    'For an intermittent infusion there cannot be more than one administration event in a 2 hour period. Please select a different frequency.';
  static grdAdminTimes_Msg =
    'The selected administration time interval is less than 2 hours. Please ensure that there is no more than one administration event in a 2 hour period for an intermittent infusion.';
  static InfusionPeriod_Msg =
    'The selected administration time interval is less than the specified infusion period of {0}. Please ensure that there is sufficient time between administrations to proceed.';
}

export class Resource_prescribedrugs {
  static Title = 'LORENZO';
  static FrequencyAlert =
    'By selecting ‘more’ you are overriding the suggested frequencies configured by your trust. Do you wish to continue?';
}

export class mldetails {
    static Encounter_Header = 'Encounter';
    static EncounterID_Header = 'EncounterID';
    static EncounterStatus_Header = 'EncounterStatus';
    static EncounterType_Header = 'EncounterType';
    static DOCKER_Tooltip = 'Click to open the panel';
    static NoRecordsText = 'No records to show';
    static LastIssued_Header = 'Last issued';
    static Quantity_Header = 'Quanitity';
    static MedicationItem_Header = 'Medication item';
  }

  export class Resource_medlistdetails {
    static Comments = 'Comments=';
    static Techvalat_Header = 'Technically validated at';
    static SupplyComments_Tooltip = 'Comments: ';
    static GpConnectDoseLabel = 'DOSE';
    static StartDateIco_Header = 'Start date';
    static Otherinformation_Header = 'Other information';
    static PrescriptionItem_Header = 'Prescription item';
  }