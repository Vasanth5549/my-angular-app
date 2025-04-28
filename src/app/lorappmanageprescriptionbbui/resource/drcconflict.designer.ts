// const resourceCulture = "";
    const Data = [{"key":"DRC_AdminMethod","value":"Dose range check is applicable only if doses are provided. Dose range checks are thus not applicable for admin methods, appliances or form viewers with no dose fields"},{"key":"DRC_CboDoseTypeTooltip","value":"Specify dose range check type"},{"key":"DRC_ConditionalDose","value":"Dose Range Check cannot be performed because the medication prescribed is a conditional dose"},{"key":"DRC_DoseValue","value":"Dose Range Check cannot be performed because dose is not available"},{"key":"DRC_Estimated","value":"(estimated)"},{"key":"DRC_GenericErrMsg","value":"The Dose could not be checked for the {0}."},{"key":"DRC_GenericErrMsg_Extends","value":"The dose was to be given{1}"},{"key":"DRC_HeightRecordedOn","value":"Height recorded on:"},{"key":"DRC_LocalDrug","value":"Dose Range Check cannot be performed because the medication prescribed is a locally configured Trust drug"},{"key":"DRC_MaintenanceDose","value":"Maintenance dose"},{"key":"DRC_MCIDrug","value":"Dose Range Check cannot be performed because the medication prescribed is an MCI"},{"key":"DRC_MCIName","value":"Multiple component item"},{"key":"DRC_MultipleDrug","value":"Dose Range Check cannot be performed because the medication prescribed is a multi-route drug"},{"key":"DRC_PatientAge","value":"Patient age must be populated to perform Dose Range Check."},{"key":"DRC_Route","value":"Route must be populated to perform Dose Range Check."},{"key":"DRC_SingleDose","value":"Single dose"},{"key":"DRC_SystemDefined","value":"System defined"},{"key":"DRC_TitratedDose","value":"Dose Range Check cannot be performed because the medication prescribed is a titrated dose"},{"key":"DRC_TypeINDrug","value":"Dose Range Check cannot be performed because the medication prescribed is a ‘Type-In’ drug"},{"key":"DRC_WeightRecordedOn","value":"recorded on:"},{"key":"lblDRCdosetype","value":"DRC dose type:"},{"key":"DRC_SystemDefinedTooltip","value":"System defined: A single dose check is performed if administration frequency is STAT/Once only; a maintenance dose check if performed for all others"},{"key":"DRC_GeneralDoseTypeError","value":"Dose Range Check data is not available for {0} for the selected DRC dose type or with other details provided"},{"key":"DRC_Title","value":"General"},{"key":"DRC_NoResult","value":"Dose range checking is not supported, dose details must be verified using other information sources"},{"key":"error_code","value":"Error code"},{"key":"error_message","value":"Error message"},{"key":"DRC_ChangeDoseInSteppedDoseType","value":"Dose Range Check cannot be performed for changing dose in Stepped/Variable dose type"}];
    class ResourceManager {
            static GetString(key: string, resourceCulture: any): string {
              let r = Data.find((e) => e.key == key);
              return r != undefined ? r.value : "";
            }
          }

    export class DRCConflict {
        // private static resourceMan: System.Resources.ResourceManager;
        private static resourceCulture = "";
        constructor() {

        }
        public static get error_code(): string {
            return ResourceManager.GetString("error_code", DRCConflict.resourceCulture);
        }
        public static get error_message(): string {
            return ResourceManager.GetString("error_message", DRCConflict.resourceCulture);
        }
        public static get DRC_AdminMethod(): string {
            return ResourceManager.GetString("DRC_AdminMethod", DRCConflict.resourceCulture);
        }
        public static get DRC_CboDoseTypeTooltip(): string {
            return ResourceManager.GetString("DRC_CboDoseTypeTooltip", DRCConflict.resourceCulture);
        }
        public static get DRC_ConditionalDose(): string {
            return ResourceManager.GetString("DRC_ConditionalDose", DRCConflict.resourceCulture);
        }
        public static get DRC_DoseValue(): string {
            return ResourceManager.GetString("DRC_DoseValue", DRCConflict.resourceCulture);
        }
        public static get DRC_Estimated(): string {
            return ResourceManager.GetString("DRC_Estimated", DRCConflict.resourceCulture);
        }
        public static get DRC_GeneralDoseTypeError(): string {
            return ResourceManager.GetString("DRC_GeneralDoseTypeError", DRCConflict.resourceCulture);
        }
        public static get DRC_GenericErrMsg(): string {
            return ResourceManager.GetString("DRC_GenericErrMsg", DRCConflict.resourceCulture);
        }
        public static get DRC_GenericErrMsg_Extends(): string {
            return ResourceManager.GetString("DRC_GenericErrMsg_Extends", DRCConflict.resourceCulture);
        }
        public static get DRC_HeightRecordedOn(): string {
            return ResourceManager.GetString("DRC_HeightRecordedOn", DRCConflict.resourceCulture);
        }
        public static get DRC_LocalDrug(): string {
            return ResourceManager.GetString("DRC_LocalDrug", DRCConflict.resourceCulture);
        }
        public static get DRC_MaintenanceDose(): string {
            return ResourceManager.GetString("DRC_MaintenanceDose", DRCConflict.resourceCulture);
        }
        public static get DRC_MCIDrug(): string {
            return ResourceManager.GetString("DRC_MCIDrug", DRCConflict.resourceCulture);
        }
        public static get DRC_MCIName(): string {
            return ResourceManager.GetString("DRC_MCIName", DRCConflict.resourceCulture);
        }
        public static get DRC_MultipleDrug(): string {
            return ResourceManager.GetString("DRC_MultipleDrug", DRCConflict.resourceCulture);
        }
        public static get DRC_NoResult(): string {
            return ResourceManager.GetString("DRC_NoResult", DRCConflict.resourceCulture);
        }
        public static get DRC_PatientAge(): string {
            return ResourceManager.GetString("DRC_PatientAge", DRCConflict.resourceCulture);
        }
        public static get DRC_Route(): string {
            return ResourceManager.GetString("DRC_Route", DRCConflict.resourceCulture);
        }
        public static get DRC_SingleDose(): string {
            return ResourceManager.GetString("DRC_SingleDose", DRCConflict.resourceCulture);
        }
        public static get DRC_SystemDefined(): string {
            return ResourceManager.GetString("DRC_SystemDefined", DRCConflict.resourceCulture);
        }
        public static get DRC_SystemDefinedTooltip(): string {
            return ResourceManager.GetString("DRC_SystemDefinedTooltip", DRCConflict.resourceCulture);
        }
        public static get DRC_Title(): string {
            return ResourceManager.GetString("DRC_Title", DRCConflict.resourceCulture);
        }
        public static get DRC_TitratedDose(): string {
            return ResourceManager.GetString("DRC_TitratedDose", DRCConflict.resourceCulture);
        }
        public static get DRC_TypeINDrug(): string {
            return ResourceManager.GetString("DRC_TypeINDrug", DRCConflict.resourceCulture);
        }
        public static get DRC_WeightRecordedOn(): string {
            return ResourceManager.GetString("DRC_WeightRecordedOn", DRCConflict.resourceCulture);
        }
        public static get lblDRCdosetype(): string {
            return ResourceManager.GetString("lblDRCdosetype", DRCConflict.resourceCulture);
        }
        public static get DRC_ChangeDoseInSteppedDoseType(): string {
            return ResourceManager.GetString("DRC_ChangeDoseInSteppedDoseType", DRCConflict.resourceCulture);
        }
    }
