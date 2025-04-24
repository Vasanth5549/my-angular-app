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
    // const resourceCulture = "";
    const Data = [{ "key": "BagChange_tooltip", "value": "Bag change\\r\\nVolume infused: {0}\\r\\nNew Bag volume: {1}\\r\\nBegun at: {2}\\r\\nAdministered by: {3}\\r\\nRecorded at: {4}\\r\\nRecorded by: {5}" }, { "key": "Begunat_text", "value": "Begun at" }, { "key": "Begun_tooltip", "value": "Status: Begun\\r\\nDue at: {0}\\r\\nBegun at: {1}\\r\\nCurrent Bag volume: {2}\\r\\nInfusion rate: {3}\\r\\nDrip rate: {4}\\r\\nAdministered by: {5}\\r\\nRecorded at: {6}\\r\\nRecorded by: {7}" }, { "key": "Bolusintermittent_tooltip", "value": "Status: Given\\r\\nDose: {0}\\r\\nDue at: {1}\\r\\nAdministered at: {2}\\r\\nAdministered by: {3}\\r\\nRecorded at: {4}\\r\\nRecorded by: {5}" }, { "key": "ChangeFlowrate_tooltip", "value": "Infusion rate changed from {0} to {1}\\r\\nChanged at {2}\\r\\nDrip rate {3}\\r\\nRecorded at: {4}\\r\\nRecorded by: {5}" }, { "key": "Completed_tooltip", "value": "Status: Completed\\r\\nDue at: {0}\\r\\nBegun at: {1}\\r\\nEnded at: {2}\\r\\nDose administered: {3}\\r\\nTotal volume infused: {4}\\r\\nRecorded at: {5}\\r\\nRecorded by: {6}" }, { "key": "Deferred_tooltip", "value": "Deferred at: {0}\\r\\nDeferred by: {1}\\r\\nReason: {2}" }, { "key": "Duenow_tooltip", "value": "Drug due for administration now - {0}" }, { "key": "Estimatedstoptime_tooltip", "value": "Estimated stop time - {0}" }, { "key": "InFluid_text", "value": "in {0}" }, { "key": "Notgiven_tooltip", "value": "Status: Not given\\r\\nReason: {0}\\r\\nDue at: {1}\\r\\nRecorded at: {2}\\r\\nRecorded by: {3}\\r\\n" }, { "key": "Omitted_tooltip", "value": "Omitted\\r\\nReason: {0}\\r\\nDue at: {1}" }, { "key": "Overdue_tooltip", "value": "Administration overdue now - due at {0}" }, { "key": "NotYetRecorded_tooltip", "value": "Administration not yet recorded - due at {0}" }, { "key": "Paused_tooltip", "value": "Status: Paused\\r\\nReason: {0}\\r\\nBegun at: {1}\\r\\nPaused at: {2}\\r\\nRecorded at: {3}\\r\\nRecorded by: {4}" }, { "key": "Planned_tooltip", "value": "Scheduled start at {0}" }, { "key": "Previousslotscheduled", "value": "You are trying to record a new administration event for {0} while the infusion scheduled at {1} is currently in progress for the patient. New infusion can be started only after the current infusion has completed." }, { "key": "Resume_tooltip", "value": "Status: In progress\\r\\nBegun at: {0}\\r\\nPaused at: {1}\\r\\nResumed at: {2}\\r\\nRecorded at: {3}\\r\\nRecorded by: {4}" }, { "key": "Stopped_tooltip", "value": "Status: Stopped\\r\\nReason: {0}\\r\\nDue at: {1}\\r\\nBegun at: {2}\\r\\nEnded at: {3}\\r\\nDose administered: {4}\\r\\nTotal volume infused: {5}\\r\\nRecorded at: {6}\\r\\nRecorded by: {7}" }, { "key": "Dueat_text", "value": "Due at" }, { "key": "Recordat_text", "value": "Recorded at" }, { "key": "cmdcalc_Text", "value": "Calculate" }, { "key": "cmddosecalc_Text", "value": "Dose calculator" }, { "key": "lblcalcdriprate_Text", "value": "Calculated drip rate" }, { "key": "lblDripratecalc_Text", "value": "Drip rate calculator" }, { "key": "lbldropfactor_Text", "value": "Drop factor" }, { "key": "lblInfuconcent_Text", "value": "Infusion concentration" }, { "key": "lblinfuconuom_Text", "value": "UOM" }, { "key": "lblInfusionRateDose_Text", "value": "Infusion rate (dose per unit time)" }, { "key": "lblinfusratevol_Text", "value": "Infusion rate (volume per unit time)" }, { "key": "lblinfustrength_Text", "value": "Infusion strength (dose)" }, { "key": "lblinfuvolume_Text", "value": "Infusion volume" }, { "key": "InfConcentration_Empty_Msg", "value": "Please ensure the infusion concentration is specified to proceed with calculation" }, { "key": "InfRateInDose_Empty_Msg", "value": "Please enter the infusion rate in dose per unit time to proceed with calculation. Dose calculator may be used if necessary" }, { "key": "Lorenzo_Title", "value": "LORENZO" }, { "key": "cmdEnableBarCode1_Text", "value": "Scan enabled" }, { "key": "cmdEnableBarCode_Text", "value": "Enable scan" }, { "key": "ErrorDesc8000001", "value": "The barcode you have scanned is not recognised by the system" }, { "key": "ErrorDesc8000002", "value": "Product selected\\r\\n{0}\\r\\ndoes not match the prescribed item\\r\\nPlease select an appropriate item" }, { "key": "DripRateUOM_Text", "value": "drops/minute" }, { "key": "ConditionalDoseRegime_Text", "value": "Select to view conditional dose regime" }, { "key": "cboinfucon_Tooltip", "value": "Enter infusion concentration unit of measure" }, { "key": "cboInfustionRatevolUOM_Tooltip", "value": "Enter infusion rate in volume per unit time unit of measure" }, { "key": "cboinfustren_Tooltip", "value": "Enter infusion strength unit of measure" }, { "key": "cboinfuvol_Tooltip", "value": "Enter infusion volume unit of measure" }, { "key": "cmdcalc_Tooltip", "value": "Select to calculate infusion rate in volume per unit time" }, { "key": "infustrentext_Tooltip", "value": "Enter infusion strength" }, { "key": "infuvoltxt_Tooltip", "value": "Enter infusion volume" }, { "key": "txtdropfac_Tooltip", "value": "Enter drop factor" }, { "key": "txtinfucon_Tooltip", "value": "Enter infusion concentration" }, { "key": "txtInfusionRatevol_Tooltip", "value": "Enter infusion rate in volume per unit time" }, { "key": "txtInfusionRate_Tooltip", "value": "Enter infusion rate in dose per unit time" }, { "key": "InfRateMan_Msg", "value": "Infusion rate cannot be zero or empty" }, { "key": "InfRateUOMMan_Msg", "value": "Infusion rate UOM cannot be blank" }, { "key": "cmddosecalc_Tooltip", "value": "Click to invoke dose calculator" }, { "key": "cboConcentrationUOM_tooltip", "value": "Select concentration UOM" }, { "key": "lblConcentration_text", "value": "Concentration" }, { "key": "txtConcenStrenght_tooltip", "value": "Specify concentration" }, { "key": "DropFactorZero_Msg", "value": "Please provide a valid numeric value for drop factor" }, { "key": "ReviewDue_text", "value": "Review due" }, { "key": "ReviewGeneralIcon_Tooltip", "value": "Medication review due" }, { "key": "ReviewOmittedIcon_Tooltip", "value": "All doses are currently omitted. Treatment to be reviewed ." }, { "key": "ReviewReqby", "value": "Review requested by" }];
    class ResourceManager {
        static GetString(key: string, resourceCulture: any): string {
            let r = Data.find((e) => e.key == key);
            return r != undefined ? r.value : "";
        }
    }
    export class InfusionChart {
        // private static resourceMan: System.Resources.ResourceManager;
        private static resourceCulture = "";
        constructor() {

        }
        public static get BagChange_tooltip(): string {
            return ResourceManager.GetString("BagChange_tooltip", InfusionChart.resourceCulture);
        }
        public static get Begun_tooltip(): string {
            return ResourceManager.GetString("Begun_tooltip", InfusionChart.resourceCulture);
        }
        public static get Begunat_text(): string {
            return ResourceManager.GetString("Begunat_text", InfusionChart.resourceCulture);
        }
        public static get Bolusintermittent_tooltip(): string {
            return ResourceManager.GetString("Bolusintermittent_tooltip", InfusionChart.resourceCulture);
        }
        public static get cboConcentrationUOM_tooltip(): string {
            return ResourceManager.GetString("cboConcentrationUOM_tooltip", InfusionChart.resourceCulture);
        }
        public static get cboinfucon_Tooltip(): string {
            return ResourceManager.GetString("cboinfucon_Tooltip", InfusionChart.resourceCulture);
        }
        public static get cboInfustionRatevolUOM_Tooltip(): string {
            return ResourceManager.GetString("cboInfustionRatevolUOM_Tooltip", InfusionChart.resourceCulture);
        }
        public static get cboinfustren_Tooltip(): string {
            return ResourceManager.GetString("cboinfustren_Tooltip", InfusionChart.resourceCulture);
        }
        public static get cboinfuvol_Tooltip(): string {
            return ResourceManager.GetString("cboinfuvol_Tooltip", InfusionChart.resourceCulture);
        }
        public static get ChangeFlowrate_tooltip(): string {
            return ResourceManager.GetString("ChangeFlowrate_tooltip", InfusionChart.resourceCulture);
        }
        public static get cmdcalc_Text(): string {
            return ResourceManager.GetString("cmdcalc_Text", InfusionChart.resourceCulture);
        }
        public static get cmdcalc_Tooltip(): string {
            return ResourceManager.GetString("cmdcalc_Tooltip", InfusionChart.resourceCulture);
        }
        public static get cmddosecalc_Text(): string {
            return ResourceManager.GetString("cmddosecalc_Text", InfusionChart.resourceCulture);
        }
        public static get cmddosecalc_Tooltip(): string {
            return ResourceManager.GetString("cmddosecalc_Tooltip", InfusionChart.resourceCulture);
        }
        public static get cmdEnableBarCode_Text(): string {
            return ResourceManager.GetString("cmdEnableBarCode_Text", InfusionChart.resourceCulture);
        }
        public static get cmdEnableBarCode1_Text(): string {
            return ResourceManager.GetString("cmdEnableBarCode1_Text", InfusionChart.resourceCulture);
        }
        public static get Completed_tooltip(): string {
            return ResourceManager.GetString("Completed_tooltip", InfusionChart.resourceCulture);
        }
        public static get ConditionalDoseRegime_Text(): string {
            return ResourceManager.GetString("ConditionalDoseRegime_Text", InfusionChart.resourceCulture);
        }
        public static get Deferred_tooltip(): string {
            return ResourceManager.GetString("Deferred_tooltip", InfusionChart.resourceCulture);
        }
        public static get DripRateUOM_Text(): string {
            return ResourceManager.GetString("DripRateUOM_Text", InfusionChart.resourceCulture);
        }
        public static get DropFactorZero_Msg(): string {
            return ResourceManager.GetString("DropFactorZero_Msg", InfusionChart.resourceCulture);
        }
        public static get Dueat_text(): string {
            return ResourceManager.GetString("Dueat_text", InfusionChart.resourceCulture);
        }
        public static get Duenow_tooltip(): string {
            return ResourceManager.GetString("Duenow_tooltip", InfusionChart.resourceCulture);
        }
        public static get ErrorDesc8000001(): string {
            return ResourceManager.GetString("ErrorDesc8000001", InfusionChart.resourceCulture);
        }
        public static get ErrorDesc8000002(): string {
            return ResourceManager.GetString("ErrorDesc8000002", InfusionChart.resourceCulture);
        }
        public static get Estimatedstoptime_tooltip(): string {
            return ResourceManager.GetString("Estimatedstoptime_tooltip", InfusionChart.resourceCulture);
        }
        public static get InfConcentration_Empty_Msg(): string {
            return ResourceManager.GetString("InfConcentration_Empty_Msg", InfusionChart.resourceCulture);
        }
        public static get InFluid_text(): string {
            return ResourceManager.GetString("InFluid_text", InfusionChart.resourceCulture);
        }
        public static get InfRateInDose_Empty_Msg(): string {
            return ResourceManager.GetString("InfRateInDose_Empty_Msg", InfusionChart.resourceCulture);
        }
        public static get InfRateMan_Msg(): string {
            return ResourceManager.GetString("InfRateMan_Msg", InfusionChart.resourceCulture);
        }
        public static get InfRateUOMMan_Msg(): string {
            return ResourceManager.GetString("InfRateUOMMan_Msg", InfusionChart.resourceCulture);
        }
        public static get infustrentext_Tooltip(): string {
            return ResourceManager.GetString("infustrentext_Tooltip", InfusionChart.resourceCulture);
        }
        public static get infuvoltxt_Tooltip(): string {
            return ResourceManager.GetString("infuvoltxt_Tooltip", InfusionChart.resourceCulture);
        }
        public static get lblcalcdriprate_Text(): string {
            return ResourceManager.GetString("lblcalcdriprate_Text", InfusionChart.resourceCulture);
        }
        public static get lblConcentration_text(): string {
            return ResourceManager.GetString("lblConcentration_text", InfusionChart.resourceCulture);
        }
        public static get lblDripratecalc_Text(): string {
            return ResourceManager.GetString("lblDripratecalc_Text", InfusionChart.resourceCulture);
        }
        public static get lbldropfactor_Text(): string {
            return ResourceManager.GetString("lbldropfactor_Text", InfusionChart.resourceCulture);
        }
        public static get lblInfuconcent_Text(): string {
            return ResourceManager.GetString("lblInfuconcent_Text", InfusionChart.resourceCulture);
        }
        public static get lblinfuconuom_Text(): string {
            return ResourceManager.GetString("lblinfuconuom_Text", InfusionChart.resourceCulture);
        }
        public static get lblInfusionRateDose_Text(): string {
            return ResourceManager.GetString("lblInfusionRateDose_Text", InfusionChart.resourceCulture);
        }
        public static get lblinfusratevol_Text(): string {
            return ResourceManager.GetString("lblinfusratevol_Text", InfusionChart.resourceCulture);
        }
        public static get lblinfustrength_Text(): string {
            return ResourceManager.GetString("lblinfustrength_Text", InfusionChart.resourceCulture);
        }
        public static get lblinfuvolume_Text(): string {
            return ResourceManager.GetString("lblinfuvolume_Text", InfusionChart.resourceCulture);
        }
        public static get Lorenzo_Title(): string {
            return ResourceManager.GetString("Lorenzo_Title", InfusionChart.resourceCulture);
        }
        public static get Notgiven_tooltip(): string {
            return ResourceManager.GetString("Notgiven_tooltip", InfusionChart.resourceCulture);
        }
        public static get NotYetRecorded_tooltip(): string {
            return ResourceManager.GetString("NotYetRecorded_tooltip", InfusionChart.resourceCulture);
        }
        public static get Omitted_tooltip(): string {
            return ResourceManager.GetString("Omitted_tooltip", InfusionChart.resourceCulture);
        }
        public static get Overdue_tooltip(): string {
            return ResourceManager.GetString("Overdue_tooltip", InfusionChart.resourceCulture);
        }
        public static get Paused_tooltip(): string {
            return ResourceManager.GetString("Paused_tooltip", InfusionChart.resourceCulture);
        }
        public static get Planned_tooltip(): string {
            return ResourceManager.GetString("Planned_tooltip", InfusionChart.resourceCulture);
        }
        public static get Previousslotscheduled(): string {
            return ResourceManager.GetString("Previousslotscheduled", InfusionChart.resourceCulture);
        }
        public static get Recordat_text(): string {
            return ResourceManager.GetString("Recordat_text", InfusionChart.resourceCulture);
        }
        public static get Resume_tooltip(): string {
            return ResourceManager.GetString("Resume_tooltip", InfusionChart.resourceCulture);
        }
        public static get ReviewDue_text(): string {
            return ResourceManager.GetString("ReviewDue_text", InfusionChart.resourceCulture);
        }
        public static get Stopped_tooltip(): string {
            return ResourceManager.GetString("Stopped_tooltip", InfusionChart.resourceCulture);
        }
        public static get txtConcenStrenght_tooltip(): string {
            return ResourceManager.GetString("txtConcenStrenght_tooltip", InfusionChart.resourceCulture);
        }
        public static get txtdropfac_Tooltip(): string {
            return ResourceManager.GetString("txtdropfac_Tooltip", InfusionChart.resourceCulture);
        }
        public static get txtinfucon_Tooltip(): string {
            return ResourceManager.GetString("txtinfucon_Tooltip", InfusionChart.resourceCulture);
        }
        public static get txtInfusionRate_Tooltip(): string {
            return ResourceManager.GetString("txtInfusionRate_Tooltip", InfusionChart.resourceCulture);
        }
        public static get txtInfusionRatevol_Tooltip(): string {
            return ResourceManager.GetString("txtInfusionRatevol_Tooltip", InfusionChart.resourceCulture);
        }
        public static get ReviewGeneralIcon_Tooltip(): string {
            return ResourceManager.GetString("ReviewGeneralIcon_Tooltip", InfusionChart.resourceCulture);
        }
        public static get ReviewOmittedIcon_Tooltip(): string {
            return ResourceManager.GetString("ReviewOmittedIcon_Tooltip", InfusionChart.resourceCulture);
        }
        public static get ReviewReqby(): string {
            return ResourceManager.GetString("ReviewReqby", InfusionChart.resourceCulture);
        }
    }