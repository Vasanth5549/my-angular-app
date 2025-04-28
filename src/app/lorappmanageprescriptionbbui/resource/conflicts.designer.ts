// const resourceCulture = "";
const Data = [{"key":"AcknowledgeStatus_Header","value":"Acknowledged"},{"key":"AuthoriserReason_Header","value":"Authoriser reason"},{"key":"ClinicalVerfierReason_Header","value":"Clinical verifier reason"},{"key":"iLabel1_Text","value":"Mandatory fields"},{"key":"PrescriberReason_Header","value":"Prescriber acknowledgement reason"},{"key":"WarningBehaviourType_Header","value":"BehaviourType"},{"key":"WarningMessage_Header","value":"Details"},{"key":"WarningType_Header","value":"Type"},{"key":"Acknowledge_Conflict","value":"Select to acknowledge conflict"},{"key":"NoRecordsText","value":"There are no records to show"},{"key":"Acknowledge_reason","value":"Select reason"},{"key":"PrescriptionItem_Header","value":"Prescription item"},{"key":"PrescriptionType_Header","value":"Prescription type"},{"key":"ConflictType_Header","value":"Type"},{"key":"chkYesConflicts_Tooltip","value":"Select to indicate that record PGD will continue as administration has already been done."}];
class ResourceManager {
        static GetString(key: string, resourceCulture: any): string {
          let r = Data.find((e) => e.key == key);
          return r != undefined ? r.value : "";
        }
      }
    export class conflicts {
        // private static resourceMan: System.Resources.ResourceManager;
        private static resourceCulture = "";
        constructor() {

        }
        public static get Acknowledge_Conflict(): string {
            return ResourceManager.GetString("Acknowledge_Conflict", conflicts.resourceCulture);
        }
        public static get Acknowledge_reason(): string {
            return ResourceManager.GetString("Acknowledge_reason", conflicts.resourceCulture);
        }
        public static get AcknowledgeStatus_Header(): string {
            return ResourceManager.GetString("AcknowledgeStatus_Header", conflicts.resourceCulture);
        }
        public static get AuthoriserReason_Header(): string {
            return ResourceManager.GetString("AuthoriserReason_Header", conflicts.resourceCulture);
        }
        public static get chkYesConflicts_Tooltip(): string {
            return ResourceManager.GetString("chkYesConflicts_Tooltip", conflicts.resourceCulture);
        }
        public static get ClinicalVerfierReason_Header(): string {
            return ResourceManager.GetString("ClinicalVerfierReason_Header", conflicts.resourceCulture);
        }
        public static get ConflictType_Header(): string {
            return ResourceManager.GetString("ConflictType_Header", conflicts.resourceCulture);
        }
        public static get iLabel1_Text(): string {
            return ResourceManager.GetString("iLabel1_Text", conflicts.resourceCulture);
        }
        public static get NoRecordsText(): string {
            return ResourceManager.GetString("NoRecordsText", conflicts.resourceCulture);
        }
        public static get PrescriberReason_Header(): string {
            return ResourceManager.GetString("PrescriberReason_Header", conflicts.resourceCulture);
        }
        public static get PrescriptionItem_Header(): string {
            return ResourceManager.GetString("PrescriptionItem_Header", conflicts.resourceCulture);
        }
        public static get PrescriptionType_Header(): string {
            return ResourceManager.GetString("PrescriptionType_Header", conflicts.resourceCulture);
        }
        public static get WarningBehaviourType_Header(): string {
            return ResourceManager.GetString("WarningBehaviourType_Header", conflicts.resourceCulture);
        }
        public static get WarningMessage_Header(): string {
            return ResourceManager.GetString("WarningMessage_Header", conflicts.resourceCulture);
        }
        public static get WarningType_Header(): string {
            return ResourceManager.GetString("WarningType_Header", conflicts.resourceCulture);
        }
    }
