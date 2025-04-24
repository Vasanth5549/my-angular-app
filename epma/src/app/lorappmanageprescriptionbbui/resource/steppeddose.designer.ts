const resourceCulture = "";
const Data = [{"key":"cmdClose_Text","value":"Close"},{"key":"Direction_Header","value":"As required (PRN)"},{"key":"Dose_Header","value":"Dose"},{"key":"Duration_Header","value":"Duration"},{"key":"Frequency_Header","value":"Frequency"},{"key":"Variable_Header","value":"Variable dose instruction"},{"key":"ClerkTitrartedDoseMessage","value":"You cannot enter doses earlier than the commencement date"},{"key":"TDClearMessage","value":"Do you want the system to clear the grid and refresh to current start date?"},{"key":"TDDoseStartDTTMmessage","value":"Titrated dose dates are before the item start date.  Details need to be updated."},{"key":"TDDosevalidationMessage","value":"Doses have been entered that are beyond the stop date. Remove the doses to submit the prescription."},{"key":"TitAddnlDoseInsMessage","value":"Please choose a titrated dose instructions or add additional comments."},{"key":"TitratedDosemandatoryMes","value":"Alternatively add at least one titrated dose to the grid"},{"key":"ValidateTitratedDoseWeeklyFrequency_Msg","value":"You have entered doses for too many days. Please review."},{"key":"SwitchingToChangingDoseView","value":"Switching to the changing dose view will clear all the dose values entered. Do you wish to continue?"},{"key":"AdditionalDoseOnceOnly_Msg","value":"To commence this prescription today from the next available administration time: Click No\n\nTo defer this prescription until tomorrow and prescribe a single once only dose for today: Click Yes"},{"key":"AdditionalonceeonlyFutureOrPastDTTM_Msg","value":"Additional ONCE only doses cannot be prescribed for a past time or future date."},{"key":"DoseAlreadyExist_Msg","value":"A dose already exists for the same time. Click Ok to continue and adjust the time."},{"key":"SlotsAssociatedDoseInSteps_Msg","value":"Slots associated with this step of the prescription will result in slots being generated on the same day as the previous step, this may result in too many administrations in a single day. Do you wish to start this step of the prescription tomorrow?"},{"key":"GivenAdministrationTimesNotFitInStep","value":"The given administration times do not fit in the provided duration. Please extend the duration or change the administration times to accommodate in the given time period"},{"key":"DoseValueEmpty","value":"Dose value cannot be zero or empty."},{"key":"ScheduledTimeOverLap","value":"The scheduled time you have prescribed for this step overlaps with the previous step’s scheduled duration. Please select a different scheduled time."},{"key":"DoseUOMForSubsequentSteps","value":"Changing the dose UOM will affect all the subsequent steps. Please correct the dose in other steps if necessary"},{"key":"CC_MINUTES_TermText","value":"Minute(s)"}];
class ResourceManager {
        static GetString(key: string, resourceCulture: any): string {
          let r = Data.find((e) => e.key == key);
          return r != undefined ? r.value : "";
        }
      }

    export class steppeddose {
        constructor() {

        }
        public static get AdditionalDoseOnceOnly_Msg(): string {
            return ResourceManager.GetString("AdditionalDoseOnceOnly_Msg", resourceCulture);
        }
        public static get AdditionalonceeonlyFutureOrPastDTTM_Msg(): string {
            return ResourceManager.GetString("AdditionalonceeonlyFutureOrPastDTTM_Msg", resourceCulture);
        }
        public static get CC_MINUTES_TermText(): string {
            return ResourceManager.GetString("CC_MINUTES_TermText", resourceCulture);
        }
        public static get ClerkTitrartedDoseMessage(): string {
            return ResourceManager.GetString("ClerkTitrartedDoseMessage", resourceCulture);
        }
        public static get cmdClose_Text(): string {
            return ResourceManager.GetString("cmdClose_Text", resourceCulture);
        }
        public static get Direction_Header(): string {
            return ResourceManager.GetString("Direction_Header", resourceCulture);
        }
        public static get Dose_Header(): string {
            return ResourceManager.GetString("Dose_Header", resourceCulture);
        }
        public static get DoseAlreadyExist_Msg(): string {
            return ResourceManager.GetString("DoseAlreadyExist_Msg", resourceCulture);
        }
        public static get DoseUOMForSubsequentSteps(): string {
            return ResourceManager.GetString("DoseUOMForSubsequentSteps", resourceCulture);
        }
        public static get DoseValueEmpty(): string {
            return ResourceManager.GetString("DoseValueEmpty", resourceCulture);
        }
        public static get Duration_Header(): string {
            return ResourceManager.GetString("Duration_Header", resourceCulture);
        }
        public static get Frequency_Header(): string {
            return ResourceManager.GetString("Frequency_Header", resourceCulture);
        }
        public static get GivenAdministrationTimesNotFitInStep(): string {
            return ResourceManager.GetString("GivenAdministrationTimesNotFitInStep", resourceCulture);
        }
        public static get ScheduledTimeOverLap(): string {
            return ResourceManager.GetString("ScheduledTimeOverLap", resourceCulture);
        }
        public static get SlotsAssociatedDoseInSteps_Msg(): string {
            return ResourceManager.GetString("SlotsAssociatedDoseInSteps_Msg", resourceCulture);
        }
        public static get SwitchingToChangingDoseView(): string {
            return ResourceManager.GetString("SwitchingToChangingDoseView", resourceCulture);
        }
        public static get TDClearMessage(): string {
            return ResourceManager.GetString("TDClearMessage", resourceCulture);
        }
        public static get TDDoseStartDTTMmessage(): string {
            return ResourceManager.GetString("TDDoseStartDTTMmessage", resourceCulture);
        }
        public static get TDDosevalidationMessage(): string {
            return ResourceManager.GetString("TDDosevalidationMessage", resourceCulture);
        }
        public static get TitAddnlDoseInsMessage(): string {
            return ResourceManager.GetString("TitAddnlDoseInsMessage", resourceCulture);
        }
        public static get TitratedDosemandatoryMes(): string {
            return ResourceManager.GetString("TitratedDosemandatoryMes", resourceCulture);
        }
        public static get ValidateTitratedDoseWeeklyFrequency_Msg(): string {
            return ResourceManager.GetString("ValidateTitratedDoseWeeklyFrequency_Msg", resourceCulture);
        }
        public static get Variable_Header(): string {
            return ResourceManager.GetString("Variable_Header", resourceCulture);
        }
    }
