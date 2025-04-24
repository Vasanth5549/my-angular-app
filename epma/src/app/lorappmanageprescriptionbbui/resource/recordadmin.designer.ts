// const resourceCulture = "";
const Data = [{"key":"BatchNumber","value":"Enter batch no"},{"key":"Comments","value":"Enter comments"},{"key":"Dose","value":"Specify dose"},{"key":"DoseUOM","value":"Select dose UOM"},{"key":"ExpiryDate","value":"Enter expiry date"},{"key":"GivenDate","value":"Specify date/time begun"},{"key":"GivenTime","value":"Specify date/time begun"},{"key":"Route","value":"Select route"},{"key":"Site","value":"Select site"},{"key":"chkNoWitness_text","value":"No witness available"},{"key":"chkNoWitness_tooltip","value":"Select to indicate that no witness is available"},{"key":"lblWitnessedby_text","value":"Witnessed by"},{"key":"lblWitnessedby_tooltip","value":"Select care provider who witnessed administration"},{"key":"sfsAdminsteredBy_tooltip","value":"Search for a care provider–opens in a new window"},{"key":"lblcliniIncFrm_text","value":"Clinical incident form"},{"key":"lblCIFValue_Tooltip","value":"Select to launch clinical incident form"},{"key":"lblUser_text","value":"User"},{"key":"lblPassword_text","value":"Password"},{"key":"lblPassword_tooltip","value":"Enter password"},{"key":"Password_Mandatory_Error","value":"The password entered is invalid.Please re-enter password."},{"key":"Witness_message","value":"Selected witness is the same as the administering care provider. Please select a registered care provider, other than the administering user as a witness."},{"key":"txtdeliverydevice_tooltip","value":"Select delivery device"},{"key":"txtRecinfusionrate_Bkinfratetooltip","value":"Enter background infusion rate"},{"key":"txtRecinfusionrate_gastooltip","value":"Enter flow rate"},{"key":"txtRecinfusionrate_tooltip","value":"Specify infusion rate in volume per unit time"},{"key":"btnInfRateCalculator_ToolTip","value":"Select to calculate infusion rate in volume per unit time"},{"key":"btnInfDripRateCalculator_ToolTip","value":"Select to calculate drip rate in drops per minute"},{"key":"txtInfDripRate_ToolTip","value":"Specify drip rate in drops per minute"},{"key":"txtbagvolume_tooltip","value":"Specify bag volume"},{"key":"cbobagvoluom_tooltip","value":"Select bag volume unit of measure"},{"key":"txtLumen_tooltip","value":"Specify lumen"},{"key":"cboFlowratePUOM_Tooltip","value":"Select flow rate per UOM"},{"key":"cboFlowrateUOM_Tooltip","value":"Select flow rate UOM"},{"key":"cboConStrengthUoMValue_tooltip","value":"Select concentration UOM"},{"key":"cboInfusionperiodUoMValue_tooltip","value":"Select infusion period UOM"},{"key":"cboInfusionRatePerUOM_tooltip","value":"Select infusion rate per UOM"},{"key":"cboInfusionRateUOM_tooltip","value":"Select infusion rate UOM"},{"key":"Infusiondosetext_tooltip","value":"Enter infusion dose"},{"key":"Infusionperiodtext_tooltip","value":"Enter infusion period"},{"key":"txtConStrengthValue_tooltip","value":"Enter concentration"}];
class ResourceManager {
        static GetString(key: string, resourceCulture: any): string {
          let r = Data.find((e) => e.key == key);
          return r != undefined ? r.value : "";
        }
      }

    export class RecordAdmin {
        // private static resourceMan: System.Resources.ResourceManager;
        private static resourceCulture = "";
        constructor() {

        }
        public static get BatchNumber(): string {
            return ResourceManager.GetString("BatchNumber", RecordAdmin.resourceCulture);
        }
        public static get btnInfDripRateCalculator_ToolTip(): string {
            return ResourceManager.GetString("btnInfDripRateCalculator_ToolTip", RecordAdmin.resourceCulture);
        }
        public static get btnInfRateCalculator_ToolTip(): string {
            return ResourceManager.GetString("btnInfRateCalculator_ToolTip", RecordAdmin.resourceCulture);
        }
        public static get cbobagvoluom_tooltip(): string {
            return ResourceManager.GetString("cbobagvoluom_tooltip", RecordAdmin.resourceCulture);
        }
        public static get cboConStrengthUoMValue_tooltip(): string {
            return ResourceManager.GetString("cboConStrengthUoMValue_tooltip", RecordAdmin.resourceCulture);
        }
        public static get cboFlowratePUOM_Tooltip(): string {
            return ResourceManager.GetString("cboFlowratePUOM_Tooltip", RecordAdmin.resourceCulture);
        }
        public static get cboFlowrateUOM_Tooltip(): string {
            return ResourceManager.GetString("cboFlowrateUOM_Tooltip", RecordAdmin.resourceCulture);
        }
        public static get cboInfusionperiodUoMValue_tooltip(): string {
            return ResourceManager.GetString("cboInfusionperiodUoMValue_tooltip", RecordAdmin.resourceCulture);
        }
        public static get cboInfusionRatePerUOM_tooltip(): string {
            return ResourceManager.GetString("cboInfusionRatePerUOM_tooltip", RecordAdmin.resourceCulture);
        }
        public static get cboInfusionRateUOM_tooltip(): string {
            return ResourceManager.GetString("cboInfusionRateUOM_tooltip", RecordAdmin.resourceCulture);
        }
        public static get chkNoWitness_text(): string {
            return ResourceManager.GetString("chkNoWitness_text", RecordAdmin.resourceCulture);
        }
        public static get chkNoWitness_tooltip(): string {
            return ResourceManager.GetString("chkNoWitness_tooltip", RecordAdmin.resourceCulture);
        }
        public static get Comments(): string {
            return ResourceManager.GetString("Comments", RecordAdmin.resourceCulture);
        }
        public static get Dose(): string {
            return ResourceManager.GetString("Dose", RecordAdmin.resourceCulture);
        }
        public static get DoseUOM(): string {
            return ResourceManager.GetString("DoseUOM", RecordAdmin.resourceCulture);
        }
        public static get ExpiryDate(): string {
            return ResourceManager.GetString("ExpiryDate", RecordAdmin.resourceCulture);
        }
        public static get GivenDate(): string {
            return ResourceManager.GetString("GivenDate", RecordAdmin.resourceCulture);
        }
        public static get GivenTime(): string {
            return ResourceManager.GetString("GivenTime", RecordAdmin.resourceCulture);
        }
        public static get Infusiondosetext_tooltip(): string {
            return ResourceManager.GetString("Infusiondosetext_tooltip", RecordAdmin.resourceCulture);
        }
        public static get Infusionperiodtext_tooltip(): string {
            return ResourceManager.GetString("Infusionperiodtext_tooltip", RecordAdmin.resourceCulture);
        }
        public static get lblCIFValue_Tooltip(): string {
            return ResourceManager.GetString("lblCIFValue_Tooltip", RecordAdmin.resourceCulture);
        }
        public static get lblcliniIncFrm_text(): string {
            return ResourceManager.GetString("lblcliniIncFrm_text", RecordAdmin.resourceCulture);
        }
        public static get lblPassword_text(): string {
            return ResourceManager.GetString("lblPassword_text", RecordAdmin.resourceCulture);
        }
        public static get lblPassword_tooltip(): string {
            return ResourceManager.GetString("lblPassword_tooltip", RecordAdmin.resourceCulture);
        }
        public static get lblUser_text(): string {
            return ResourceManager.GetString("lblUser_text", RecordAdmin.resourceCulture);
        }
        public static get lblWitnessedby_text(): string {
            return ResourceManager.GetString("lblWitnessedby_text", RecordAdmin.resourceCulture);
        }
        public static get lblWitnessedby_tooltip(): string {
            return ResourceManager.GetString("lblWitnessedby_tooltip", RecordAdmin.resourceCulture);
        }
        public static get Password_Mandatory_Error(): string {
            return ResourceManager.GetString("Password_Mandatory_Error", RecordAdmin.resourceCulture);
        }
        public static get Route(): string {
            return ResourceManager.GetString("Route", RecordAdmin.resourceCulture);
        }
        public static get sfsAdminsteredBy_tooltip(): string {
            return ResourceManager.GetString("sfsAdminsteredBy_tooltip", RecordAdmin.resourceCulture);
        }
        public static get Site(): string {
            return ResourceManager.GetString("Site", RecordAdmin.resourceCulture);
        }
        public static get txtbagvolume_tooltip(): string {
            return ResourceManager.GetString("txtbagvolume_tooltip", RecordAdmin.resourceCulture);
        }
        public static get txtConStrengthValue_tooltip(): string {
            return ResourceManager.GetString("txtConStrengthValue_tooltip", RecordAdmin.resourceCulture);
        }
        public static get txtdeliverydevice_tooltip(): string {
            return ResourceManager.GetString("txtdeliverydevice_tooltip", RecordAdmin.resourceCulture);
        }
        public static get txtInfDripRate_ToolTip(): string {
            return ResourceManager.GetString("txtInfDripRate_ToolTip", RecordAdmin.resourceCulture);
        }
        public static get txtLumen_tooltip(): string {
            return ResourceManager.GetString("txtLumen_tooltip", RecordAdmin.resourceCulture);
        }
        public static get txtRecinfusionrate_Bkinfratetooltip(): string {
            return ResourceManager.GetString("txtRecinfusionrate_Bkinfratetooltip", RecordAdmin.resourceCulture);
        }
        public static get txtRecinfusionrate_gastooltip(): string {
            return ResourceManager.GetString("txtRecinfusionrate_gastooltip", RecordAdmin.resourceCulture);
        }
        public static get txtRecinfusionrate_tooltip(): string {
            return ResourceManager.GetString("txtRecinfusionrate_tooltip", RecordAdmin.resourceCulture);
        }
        public static get Witness_message(): string {
            return ResourceManager.GetString("Witness_message", RecordAdmin.resourceCulture);
        }
    }
