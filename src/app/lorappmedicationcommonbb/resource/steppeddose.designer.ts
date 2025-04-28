import { Component, OnInit } from '@angular/core';
import { StringBuilder,ProfileFactoryType,ContextManager,Convert,AppActivity} from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp,Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison } from 'epma-platform/models';
import { AppDialog } from 'epma-platform/controls';
import { HelperService} from 'epma-platform/soapclient';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
  ﻿


const resourceCulture = "";
const Data = [{"key":"cmdClose_Text","value":"Close"},{"key":"Direction_Header","value":"As required (PRN)"},{"key":"Dose_Header","value":"Dose"},{"key":"Duration_Header","value":"Duration"},{"key":"Frequency_Header","value":"Frequency"},{"key":"Variable_Header","value":"Variable dose instructions"},{"key":"Admintimes_Header","value":"Administration times"},{"key":"DoseInstruction_Header","value":"Dose details"},{"key":"Observation_Header","value":"Result"},{"key":"ConditionalDose_Text","value":"Conditional dose regime"},{"key":"Date_Header","value":"Date"},{"key":"Times_Header","value":"Time(s)"},{"key":"Infusion_Header","value":"Infusion rate"},{"key":"MonitaringPerid_Text","value":"Monitoring period"},{"key":"NotYetRecorded_Text","value":"Not yet recorded"},{"key":"Patient","value":"Patient"},{"key":"TitratedDoseComments_Text","value":"Additional comments"},{"key":"TitratedDoseInstructions_Text","value":"Titrated dose instructions"},{"key":"TitratedDose_Header_Title","value":"Titrated doses"},{"key":"PageDisplayFormat","value":"Page {0} of {1}"},{"key":"PresFullViewTitle","value":"From: {0}   To: {1}"},{"key":"PresFullViewWarningMessage","value":"*The last step has no duration and this is an ongoing prescription. The view will show up to a maximum of 3 days after {0}"},{"key":"ChangingDoseTitle","value":"Changing dose"},{"key":"FVClerkingSchNotValidMessage","value":"Schedules cannot be generated as one or more of the step(s) does not have complete information"},{"key":"FVScheduleTitle","value":"Scheduled doses chart"},{"key":"FVWarningMessage_1StepWO_Dur","value":"*The last step has no duration and this is an ongoing prescription. The view will show up to a maximum of 3 days"},{"key":"WT_DrugroundTimeWarningMessage","value":"Note: Times displayed are based on latest service point drug rounds only. Times for historical doses may differ from those displayed here if patients have been transferred from service points with differing drug round time profiles. Actual administration details can be viewed in medication charts or from Rx icon as necessary"},{"key":"WT_ScheduleHeaderText","value":"Scheduled dose(s) chart (Based on the drug round times of current service point)"}];
class ResourceManager {
        static GetString(key: string, resourceCulture: any): string {
          let r = Data.find((e) => e.key == key);
          return r != undefined ? r.value : "";
        }
      }


    export class steppeddose {
        constructor() {

        }
        public static get Admintimes_Header(): string {
            return ResourceManager.GetString("Admintimes_Header", resourceCulture);
        }
        public static get cmdClose_Text(): string {
            return ResourceManager.GetString("cmdClose_Text", resourceCulture);
        }
        public static get ConditionalDose_Text(): string {
            return ResourceManager.GetString("ConditionalDose_Text", resourceCulture);
        }
        public static get Date_Header(): string {
            return ResourceManager.GetString("Date_Header", resourceCulture);
        }
        public static get Direction_Header(): string {
            return ResourceManager.GetString("Direction_Header", resourceCulture);
        }
        public static get Dose_Header(): string {
            return ResourceManager.GetString("Dose_Header", resourceCulture);
        }
        public static get DoseInstruction_Header(): string {
            return ResourceManager.GetString("DoseInstruction_Header", resourceCulture);
        }
        public static get Duration_Header(): string {
            return ResourceManager.GetString("Duration_Header", resourceCulture);
        }
        public static get Frequency_Header(): string {
            return ResourceManager.GetString("Frequency_Header", resourceCulture);
        }
        public static get Infusion_Header(): string {
            return ResourceManager.GetString("Infusion_Header", resourceCulture);
        }
        public static get MonitaringPerid_Text(): string {
            return ResourceManager.GetString("MonitaringPerid_Text", resourceCulture);
        }
        public static get NotYetRecorded_Text(): string {
            return ResourceManager.GetString("NotYetRecorded_Text", resourceCulture);
        }
        public static get Observation_Header(): string {
            return ResourceManager.GetString("Observation_Header", resourceCulture);
        }
        public static get Patient(): string {
            return ResourceManager.GetString("Patient", resourceCulture);
        }
        public static get Times_Header(): string {
            return ResourceManager.GetString("Times_Header", resourceCulture);
        }
        public static get Variable_Header(): string {
            return ResourceManager.GetString("Variable_Header", resourceCulture);
        }
        public static get TitratedDoseComments_Text(): string {
            return ResourceManager.GetString("TitratedDoseComments_Text", resourceCulture);
        }
        public static get TitratedDoseInstructions_Text(): string {
            return ResourceManager.GetString("TitratedDoseInstructions_Text", resourceCulture);
        }
        public static get TitratedDose_Header_Title(): string {
            return ResourceManager.GetString("TitratedDose_Header_Title", resourceCulture);
        }
        public static get PageDisplayFormat(): string {
            return ResourceManager.GetString("PageDisplayFormat", resourceCulture);
        }
        public static get PresFullViewTitle(): string {
            return ResourceManager.GetString("PresFullViewTitle", resourceCulture);
        }
        public static get PresFullViewWarningMessage(): string {
            return ResourceManager.GetString("PresFullViewWarningMessage", resourceCulture);
        }
        public static get FVScheduleTitle(): string {
            return ResourceManager.GetString("FVScheduleTitle", resourceCulture);
        }
        public static get FVClerkingSchNotValidMessage(): string {
            return ResourceManager.GetString("FVClerkingSchNotValidMessage", resourceCulture);
        }
        public static get ChangingDoseTitle(): string {
            return ResourceManager.GetString("ChangingDoseTitle", resourceCulture);
        }
        public static get FVWarningMessage_1StepWO_Dur(): string {
            return ResourceManager.GetString("FVWarningMessage_1StepWO_Dur", resourceCulture);
        }
        public static get WT_DrugroundTimeWarningMessage(): string {
            return ResourceManager.GetString("WT_DrugroundTimeWarningMessage", resourceCulture);
        }
        public static get WT_ScheduleHeaderText(): string {
            return ResourceManager.GetString("WT_ScheduleHeaderText", resourceCulture);
        }
    }