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
    const Data = [{ "key": "cmdCancel_Text", "value": "Cancel" }, { "key": "cmdClose_Text", "value": "Close" }, { "key": "cmdOk_Text", "value": "Ok" }, { "key": "EncounterID_Header", "value": "EncounterID" }, { "key": "EncounterStatus_Header", "value": "EncounterStatus" }, { "key": "EncounterType_Header", "value": "EncounterType" }, { "key": "Encounter_Header", "value": "Encounter" }, { "key": "lblAssocIndications_Text", "value": "Associated indications" }, { "key": "lblPatientProblems_Text", "value": "Patient problems" }, { "key": "OtherInformation_Header", "value": "Other information" }, { "key": "PrescriptionItem_Header", "value": "Prescription item" }, { "key": "StartDateIco_Header", "value": "Start date" }, { "key": "cmdClose_Tooltip", "value": "Click to close" }, { "key": "Norecords_Text", "value": "No records to show" }, { "key": "Reorder_ImgTooltip", "value": "Select to copy across" }, { "key": "StatusIcon_ImgTooltip", "value": "Status details" }, { "key": "ViewDetails_ImgTooltip", "value": "Select to view details" }, { "key": "SupplyComments_Tooltip", "value": "Comments:" }, { "key": "Comments", "value": "Comments:" }, { "key": "lblSupplyDetHeading_Header", "value": "Supply details" }, { "key": "Location_Header", "value": "Location" }, { "key": "MediactionName_Header", "value": "Medication item" }, { "key": "Presctype_Header", "value": "Prescription type" }, { "key": "SupplyComments_Header", "value": "Supply comments" }, { "key": "Supplyinstrs_Comnts_Header", "value": "Supply instructions/Comments" }, { "key": "Supplystatus_Header", "value": "Supply status" }, { "key": "Techvalat_Header", "value": "Technically validated at" }, { "key": "Techvalby_Header", "value": "Technically validated by" }, { "key": "Dispensingdet_Header", "value": "Dispensing request details date/time" }, { "key": "Reviewed_by", "value": "Reviewed by" }, { "key": "Reviewed_on", "value": "Reviewed on" }, { "key": "Review_due", "value": "Review due" }, { "key": "Review_historydetails", "value": "Review history details" }, { "key": "Review_outcome", "value": "Review outcome" }, { "key": "Review_outcomecomments", "value": "Review outcome comments" }, { "key": "Review_period", "value": "Review period" }, { "key": "Review_requestcomments", "value": "Review request comments" }, { "key": "Review_requestedby", "value": "Review requested by" }, { "key": "Review_requestedon", "value": "Review requested on" }, { "key": "Review_type", "value": "Review type" }, { "key": "PresGPConnectText", "value": "GP CONNECT" }, { "key": "Next_Header", "value": "Next supply" }];
    class ResourceManager {
        static GetString(key: string, resourceCulture: any): string {
            let r = Data.find((e) => e.key == key);
            return r != undefined ? r.value : "";
        }
    }
    export class medlistdetails {
        // private static resourceMan: System.Resources.ResourceManager;
        private static resourceCulture = "";
        constructor() {

        }
        public static get cmdCancel_Text(): string {
            return ResourceManager.GetString("cmdCancel_Text", medlistdetails.resourceCulture);
        }
        public static get cmdClose_Text(): string {
            return ResourceManager.GetString("cmdClose_Text", medlistdetails.resourceCulture);
        }
        public static get cmdClose_Tooltip(): string {
            return ResourceManager.GetString("cmdClose_Tooltip", medlistdetails.resourceCulture);
        }
        public static get cmdOk_Text(): string {
            return ResourceManager.GetString("cmdOk_Text", medlistdetails.resourceCulture);
        }
        public static get Encounter_Header(): string {
            return ResourceManager.GetString("Encounter_Header", medlistdetails.resourceCulture);
        }
        public static get EncounterID_Header(): string {
            return ResourceManager.GetString("EncounterID_Header", medlistdetails.resourceCulture);
        }
        public static get EncounterStatus_Header(): string {
            return ResourceManager.GetString("EncounterStatus_Header", medlistdetails.resourceCulture);
        }
        public static get EncounterType_Header(): string {
            return ResourceManager.GetString("EncounterType_Header", medlistdetails.resourceCulture);
        }
        public static get lblAssocIndications_Text(): string {
            return ResourceManager.GetString("lblAssocIndications_Text", medlistdetails.resourceCulture);
        }
        public static get lblPatientProblems_Text(): string {
            return ResourceManager.GetString("lblPatientProblems_Text", medlistdetails.resourceCulture);
        }
        public static get Norecords_Text(): string {
            return ResourceManager.GetString("Norecords_Text", medlistdetails.resourceCulture);
        }
        public static get OtherInformation_Header(): string {
            return ResourceManager.GetString("OtherInformation_Header", medlistdetails.resourceCulture);
        }
        public static get PrescriptionItem_Header(): string {
            return ResourceManager.GetString("PrescriptionItem_Header", medlistdetails.resourceCulture);
        }
        public static get Reorder_ImgTooltip(): string {
            return ResourceManager.GetString("Reorder_ImgTooltip", medlistdetails.resourceCulture);
        }
        public static get Review_due(): string {
            return ResourceManager.GetString("Review_due", medlistdetails.resourceCulture);
        }
        public static get Review_historydetails(): string {
            return ResourceManager.GetString("Review_historydetails", medlistdetails.resourceCulture);
        }
        public static get Review_outcome(): string {
            return ResourceManager.GetString("Review_outcome", medlistdetails.resourceCulture);
        }
        public static get Review_outcomecomments(): string {
            return ResourceManager.GetString("Review_outcomecomments", medlistdetails.resourceCulture);
        }
        public static get Review_period(): string {
            return ResourceManager.GetString("Review_period", medlistdetails.resourceCulture);
        }
        public static get Review_requestcomments(): string {
            return ResourceManager.GetString("Review_requestcomments", medlistdetails.resourceCulture);
        }
        public static get Review_requestedby(): string {
            return ResourceManager.GetString("Review_requestedby", medlistdetails.resourceCulture);
        }
        public static get Review_requestedon(): string {
            return ResourceManager.GetString("Review_requestedon", medlistdetails.resourceCulture);
        }
        public static get Review_type(): string {
            return ResourceManager.GetString("Review_type", medlistdetails.resourceCulture);
        }
        public static get Reviewed_by(): string {
            return ResourceManager.GetString("Reviewed_by", medlistdetails.resourceCulture);
        }
        public static get Reviewed_on(): string {
            return ResourceManager.GetString("Reviewed_on", medlistdetails.resourceCulture);
        }
        public static get StartDateIco_Header(): string {
            return ResourceManager.GetString("StartDateIco_Header", medlistdetails.resourceCulture);
        }
        public static get StatusIcon_ImgTooltip(): string {
            return ResourceManager.GetString("StatusIcon_ImgTooltip", medlistdetails.resourceCulture);
        }
        public static get ViewDetails_ImgTooltip(): string {
            return ResourceManager.GetString("ViewDetails_ImgTooltip", medlistdetails.resourceCulture);
        }
        public static get Next_Header(): string {
            return ResourceManager.GetString("Next_Header", medlistdetails.resourceCulture);
        }
        public static get SupplyComments_Tooltip(): string {
            return ResourceManager.GetString("SupplyComments_Tooltip", medlistdetails.resourceCulture);
        }
        public static get lblSupplyDetHeading_Header(): string {
            return ResourceManager.GetString("lblSupplyDetHeading_Header", medlistdetails.resourceCulture);
        }
        public static get MediactionName_Header(): string {
            return ResourceManager.GetString("MediactionName_Header", medlistdetails.resourceCulture);
        }
        public static get Supplystatus_Header(): string {
            return ResourceManager.GetString("Supplystatus_Header", medlistdetails.resourceCulture);
        }
        public static get Supplyinstrs_Comnts_Header(): string {
            return ResourceManager.GetString("Supplyinstrs_Comnts_Header", medlistdetails.resourceCulture);
        }
        public static get Techvalat_Header(): string {
            return ResourceManager.GetString("Techvalat_Header", medlistdetails.resourceCulture);
        }
        public static get Techvalby_Header(): string {
            return ResourceManager.GetString("Techvalby_Header", medlistdetails.resourceCulture);
        }
        public static get Dispensingdet_Header(): string {
            return ResourceManager.GetString("Dispensingdet_Header", medlistdetails.resourceCulture);
        }
        public static get Location_Header(): string {
            return ResourceManager.GetString("Location_Header", medlistdetails.resourceCulture);
        }
        public static get Presctype_Header(): string {
            return ResourceManager.GetString("Presctype_Header", medlistdetails.resourceCulture);
        }
        public static get Comments(): string {
            return ResourceManager.GetString("Comments", medlistdetails.resourceCulture);
        }
        public static get SupplyComments_Header(): string {
            return ResourceManager.GetString("SupplyComments_Header", medlistdetails.resourceCulture);
        }
        public static get PresGPConnectText(): string {
            return ResourceManager.GetString("PresGPConnectText", medlistdetails.resourceCulture);
        }
    }