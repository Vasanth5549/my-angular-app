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
    const Data = [{ "key": "adminCancel_text", "value": "Cancel" }, { "key": "adminCancel_tooltip", "value": "Select to cancel record administration activity" }, { "key": "adminOk_text", "value": "Ok" }, { "key": "adminOk_tooltip", "value": "Select to complete record administration activity" }, { "key": "adminUndodefer_text", "value": "Undo defer" }, { "key": "adminUndodefer_tooltip", "value": "Select to undo defer of slot" }, { "key": "btnDefer_tooltip", "value": "Select to undo defer of slot" }, { "key": "btnok_tooltip", "value": "Select to complete Record Administration activity" }, { "key": "chkNoWitness_text", "value": "No witness available" }, { "key": "chkNoWitness_tooltip", "value": "Select to indicate that no witness is avialable" }, { "key": "cmdCancel_text", "value": "Cancel" }, { "key": "cmdok_text", "value": "OK" }, { "key": "cmdRcdDispCancel_text", "value": "Cancel" }, { "key": "cmdRcdDispCancel_Tooltip", "value": "Select to cancel recording dose discrepancy reason" }, { "key": "cmdRcdDispOk_Text", "value": "OK" }, { "key": "cmdRcdDispOk_Tooltip", "value": "Select to record dose discrepancy reason" }, { "key": "drpRoute_tooltip", "value": "Select administration route" }, { "key": "drpSite_tooltip", "value": "Select administration site" }, { "key": "dtpdateGiven_tooltip", "value": "Select date/Time medication was given" }, { "key": "dtpDateTimegiven_tooltip", "value": "Select date/Time medication was given" }, { "key": "dtpExpiryDate_tooltip", "value": "Select medication expiry date" }, { "key": "hypInitiate", "value": "Initiate" }, { "key": "lblAdministeredby_text", "value": "Administered by" }, { "key": "lblBatch_text", "value": "Batch no" }, { "key": "lblCancel_Text", "value": "Cancel" }, { "key": "lblCancel_toolTip", "value": "Select to cancel user authentication" }, { "key": "lblCIFValue_Tooltip", "value": "Select to launch clinical incident form–opens in new window" }, { "key": "lblcliniIncFrm_text", "value": "Clinical incident form" }, { "key": "lblComments_text", "value": "Comments" }, { "key": "lblDateTimegiven_text", "value": "DateTime.Time given" }, { "key": "lblDose_text", "value": "Dose" }, { "key": "lblExpirydate_text", "value": "Expiry date" }, { "key": "lblMessage_text", "value": "Message" }, { "key": "lblOk_Text", "value": "OK" }, { "key": "lblOk_Tooltip", "value": "Select to authenticate user" }, { "key": "lblPassword_text", "value": "Password" }, { "key": "lblPassword_tooltip", "value": "Enter password" }, { "key": "lblRcdDisp_text", "value": "Record reason for discrepancy" }, { "key": "lblReason_tooltip", "value": "Select reason for dose discrepancy" }, { "key": "lblRecordReasonforDiscrepancy_text", "value": "Record Reason for Discrepancy" }, { "key": "lblResNotGiven_text", "value": "Reason not given" }, { "key": "lblResNotGiven_tooltip", "value": "Select reason medication was not given" }, { "key": "lblRoute_text", "value": "Route" }, { "key": "lblSite_text", "value": "Site" }, { "key": "lblUser_text", "value": "User" }, { "key": "lblWitnessedby_text", "value": "Witnessed by" }, { "key": "lbReason_text", "value": "Reason" }, { "key": "lblTitle_Text", "value": "The administered dose is outside of the prescribed range.You must provide a reason for this discrepancy." }, { "key": "rdbCareProvider_text", "value": "Care provider" }, { "key": "rdbcareprovider_tooltip", "value": "Select to record administration done by care provider" }, { "key": "rdbDeferAdmin_text", "value": "Defer administration" }, { "key": "rdbDeferAdmin_tooltip", "value": "Select medication action as defer administration" }, { "key": "rdbGiven_text", "value": "Given" }, { "key": "rdbGiven_tooltip", "value": "Select medication action as given" }, { "key": "rdbNotGiven_text", "value": "Not given" }, { "key": "rdbNotGiven_tooltip", "value": "Select medication action as not given" }, { "key": "rdbNotKnown_text", "value": "Not known" }, { "key": "rdbNotKnown_tooltip", "value": "Select medication action as not known" }, { "key": "rdbparent_text", "value": "Parent/Carer" }, { "key": "rdbparientCare_tooltip", "value": "Select to record administration done by parent/Carer" }, { "key": "rdbResNoGiven", "value": "Select reason medication was not given" }, { "key": "rdbSelfAdminstered_text", "value": "Self administered" }, { "key": "rdbSelfAdminstered_tooltip", "value": "Select medication action as self administered" }, { "key": "rdnResNotDefer", "value": "Select reason medication is deferred" }, { "key": "RecordAdministration_text", "value": "Record administration" }, { "key": "sfsAdminsteredBy_tooltip", "value": "Search for a care provider–opens in a new window" }, { "key": "ss", "value": "DateTime.Time given" }, { "key": "txtAdminsteredBy_tooltip", "value": "Select care provider who administered medicaton" }, { "key": "txtBatch_tooltip", "value": "Enter medication batch number" }, { "key": "txtComments_tooltip", "value": "Enter comments" }, { "key": "txtDose_tooltip", "value": "Enter administered dose" }, { "key": "txtMediAction_text", "value": "Medication action" }, { "key": "txtNoWitnessAvail_tooltip", "value": "Select to indicate that no witness is avialable" }, { "key": "txtWitnessedBy_tooltip", "value": "Select care provider who witnessed administration" }, { "key": "lblResonForDefer_text", "value": "Reason for defer" }, { "key": "txtReasonFordefer_tooltip", "value": "Select reason medication is deferred" }, { "key": "txtResMedicationNotGiven_tooltip", "value": "Select reason medication was not given" }, { "key": "cboDoseDiscReason_Mandatory_Error", "value": "Enter Reason,this field is mandatory." }, { "key": "Password_Mandatory_Error", "value": "The password entered is invalid.Please re-enter password." }, { "key": "txtmediAction_tooltip", "value": "Select medication action" }, { "key": "lblAdministeredby_tooltip", "value": "Select care provider who administered medicaton" }, { "key": "lblWitnessedby_tooltip", "value": "Select Care provider who witnessed administration" }, { "key": "adminModifyCancel_tooltip", "value": "Select to cancel modify administration activity" }, { "key": "adminModifyOk_tooltip", "value": "Select to complete modify administration activity" }, { "key": "cboAmendReason_tooltip", "value": "Select amend reason" }, { "key": "cmdEnableBarCode_text", "value": "Barcode scanning enabled" }, { "key": "cmdEnableBarCode_tooltip", "value": "Barcode scanning enabled" }, { "key": "rdbbegun_text", "value": "Begun" }, { "key": "rdbbegun_tooltip", "value": "Select medication action as begun" }, { "key": "rdbchangebag_text", "value": "Change bag" }, { "key": "rdbchangebag_tooltip", "value": "Select medication action as change bag" }, { "key": "rdbchangeflowrate_text", "value": "Change flow rate" }, { "key": "rdbchangeflowrate_tooltip", "value": "Select medication action as change flow rate" }, { "key": "rdbcomplete_text", "value": "Complete" }, { "key": "rdbcomplete_tooltip", "value": "Select medication action as  complete" }, { "key": "rdbdefer_text", "value": "Defer" }, { "key": "rdbdefer_tooltip", "value": "Select medication action as defer" }, { "key": "rdbpause_text", "value": "Pause" }, { "key": "rdbpause_tooltip", "value": "Select medication action as pause" }, { "key": "rdbresume_text", "value": "Resume" }, { "key": "rdbresume_tooltip", "value": "Select medication action as resume" }, { "key": "rdbstop_text", "value": "Stop" }, { "key": "rdbstop_tooltip", "value": "Select medication action as stop" }, { "key": "lblbagvolume_text", "value": "Bag volume" }, { "key": "lblbatchno_text", "value": "Batch number" }, { "key": "lbldatetimebegun_text", "value": "DateTime.Time begun" }, { "key": "lbldriprate_text", "value": "Drip rate" }, { "key": "lblinfusrate_text", "value": "Infusion rate" }, { "key": "lblpausedttimebegun_text", "value": "Pause date/time" }, { "key": "lblreasonpause_text", "value": "Reason for pausing" }, { "key": "lblvolumeinfused_text", "value": "Volume infused" }, { "key": "lblCalcdriprate_text", "value": "Calculated drip rate" }, { "key": "lblchngdatetime_text", "value": "Change date/time" }, { "key": "lblchnginfurate_text", "value": "Changed infusion rate" }, { "key": "lbldropfactor_text", "value": "Drop factor" }, { "key": "lblenddatetime_text", "value": "End date/time" }, { "key": "lblreasonstop_text", "value": "Reason for stopping" }, { "key": "lblResumeddttime_text", "value": "Resumed date/time" }, { "key": "lblRoundto_text", "value": "Round to" }, { "key": "lblcurrentbagvol_text", "value": "Current bag volume" }, { "key": "lbldatetime_text", "value": "DateTime.Time" }, { "key": "lbllastaction_text", "value": "Last action" }, { "key": "lblreason_text", "value": "Reason" }, { "key": "lblrecordedat_text", "value": "Recorded at" }, { "key": "lblrecordedby_text", "value": "Recorded by" }, { "key": "lbltotvolinf_text", "value": "Total volume infused" }, { "key": "lblbkinfusrate_text", "value": "Background infusion rate" }, { "key": "lblbolus_text", "value": "Bolus" }, { "key": "lblflowrate_text", "value": "Flow rate" }, { "key": "lblwastage_text", "value": "Wastage" }, { "key": "txtdriprate_tooltip", "value": "Enter drip rate" }, { "key": "txtflowrate_tooltip", "value": "Enter flow rate" }, { "key": "txtbackgroundinfusionrate_tooltip", "value": "Enter infusion rate" }, { "key": "txtbagvolume_tooltip", "value": "Enter bag volume" }, { "key": "txtVolumeinfused_tooltip", "value": "Enter volume infused , this field is mandatory" }, { "key": "txtWastage_tooltip", "value": "Enter wastage" }, { "key": "txtBolus_tooltip", "value": "Enter bolus" }, { "key": "txtchangedinfusionrate_tooltip", "value": "Enter changed infusion rate" }, { "key": "txtReasonForpause_tooltip", "value": "Select reason medication is paused" }, { "key": "txtReasonForstop_tooltip", "value": "Select reason medication is stopped" }, { "key": "txtbackinfusionrate_tooltip", "value": "Enter background infusion rate" }, { "key": "cbo", "value": "Select voulme infused uom" }, { "key": "cbobagvoluom_tooltip", "value": "Select bag volume uom" }, { "key": "cbosite_tooltip", "value": "Select site" }, { "key": "txtdeliverydevice_text", "value": "Delivery device" }, { "key": "txtdeliveryevice_tooltip", "value": "Select delivery device" }, { "key": "txtdoseadmin_tooltip", "value": "Enter dose administered, this field is mandatory" }, { "key": "txtDoseadmin_txt", "value": "Dose administered" }, { "key": "txtlumen_text", "value": "lumen" }, { "key": "txtlumen_tooltip", "value": "Enter lumen" }, { "key": "BagvolumeUOM_tooltip", "value": "Select bag volume UOM" }, { "key": "VolumeinfusedUOM_tooltip", "value": "Select volume infused UOM, this field is mandatory" }, { "key": "lblchgflowrate_txt", "value": "Changed flow rate" }, { "key": "RecordAdminStartDTTM_ErrMsg", "value": "The administered date/time cannot be lesser than the prescription start date/time." }, { "key": "RecordAdminDiscntdDTTM_ErrMsg", "value": "The administered date/time cannot be greater than the discontinued date/time." }, { "key": "RecordAdminEndDTTM_ErrMsg", "value": "The administered date/time cannot be greater than the prescription end date/time." }, { "key": "lblDeliveryDevice_text", "value": "Delivery device" }, { "key": "lbLumen_text", "value": "Lumen" }];
    class ResourceManager {
        static GetString(key: string, resourceCulture: any): string {
            let r = Data.find((e) => e.key == key);
            return r != undefined ? r.value : "";
        }
    }
    export class MedicationAdministrator {
        constructor() {

        }
        public static get adminCancel_text(): string {
            return ResourceManager.GetString("adminCancel_text", resourceCulture);
        }
        public static get adminCancel_tooltip(): string {
            return ResourceManager.GetString("adminCancel_tooltip", resourceCulture);
        }
        public static get adminModifyCancel_tooltip(): string {
            return ResourceManager.GetString("adminModifyCancel_tooltip", resourceCulture);
        }
        public static get adminModifyOk_tooltip(): string {
            return ResourceManager.GetString("adminModifyOk_tooltip", resourceCulture);
        }
        public static get adminOk_text(): string {
            return ResourceManager.GetString("adminOk_text", resourceCulture);
        }
        public static get adminOk_tooltip(): string {
            return ResourceManager.GetString("adminOk_tooltip", resourceCulture);
        }
        public static get adminUndodefer_text(): string {
            return ResourceManager.GetString("adminUndodefer_text", resourceCulture);
        }
        public static get adminUndodefer_tooltip(): string {
            return ResourceManager.GetString("adminUndodefer_tooltip", resourceCulture);
        }
        public static get BagvolumeUOM_tooltip(): string {
            return ResourceManager.GetString("BagvolumeUOM_tooltip", resourceCulture);
        }
        public static get btnDefer_tooltip(): string {
            return ResourceManager.GetString("btnDefer_tooltip", resourceCulture);
        }
        public static get btnok_tooltip(): string {
            return ResourceManager.GetString("btnok_tooltip", resourceCulture);
        }
        public static get cbo(): string {
            return ResourceManager.GetString("cbo", resourceCulture);
        }
        public static get cboAmendReason_tooltip(): string {
            return ResourceManager.GetString("cboAmendReason_tooltip", resourceCulture);
        }
        public static get cbobagvoluom_tooltip(): string {
            return ResourceManager.GetString("cbobagvoluom_tooltip", resourceCulture);
        }
        public static get cboDoseDiscReason_Mandatory_Error(): string {
            return ResourceManager.GetString("cboDoseDiscReason_Mandatory_Error", resourceCulture);
        }
        public static get cbosite_tooltip(): string {
            return ResourceManager.GetString("cbosite_tooltip", resourceCulture);
        }
        public static get chkNoWitness_text(): string {
            return ResourceManager.GetString("chkNoWitness_text", resourceCulture);
        }
        public static get chkNoWitness_tooltip(): string {
            return ResourceManager.GetString("chkNoWitness_tooltip", resourceCulture);
        }
        public static get cmdCancel_text(): string {
            return ResourceManager.GetString("cmdCancel_text", resourceCulture);
        }
        public static get cmdEnableBarCode_text(): string {
            return ResourceManager.GetString("cmdEnableBarCode_text", resourceCulture);
        }
        public static get cmdEnableBarCode_tooltip(): string {
            return ResourceManager.GetString("cmdEnableBarCode_tooltip", resourceCulture);
        }
        public static get cmdok_text(): string {
            return ResourceManager.GetString("cmdok_text", resourceCulture);
        }
        public static get cmdRcdDispCancel_text(): string {
            return ResourceManager.GetString("cmdRcdDispCancel_text", resourceCulture);
        }
        public static get cmdRcdDispCancel_Tooltip(): string {
            return ResourceManager.GetString("cmdRcdDispCancel_Tooltip", resourceCulture);
        }
        public static get cmdRcdDispOk_Text(): string {
            return ResourceManager.GetString("cmdRcdDispOk_Text", resourceCulture);
        }
        public static get cmdRcdDispOk_Tooltip(): string {
            return ResourceManager.GetString("cmdRcdDispOk_Tooltip", resourceCulture);
        }
        public static get drpRoute_tooltip(): string {
            return ResourceManager.GetString("drpRoute_tooltip", resourceCulture);
        }
        public static get drpSite_tooltip(): string {
            return ResourceManager.GetString("drpSite_tooltip", resourceCulture);
        }
        public static get dtpdateGiven_tooltip(): string {
            return ResourceManager.GetString("dtpdateGiven_tooltip", resourceCulture);
        }
        public static get dtpDateTimegiven_tooltip(): string {
            return ResourceManager.GetString("dtpDateTimegiven_tooltip", resourceCulture);
        }
        public static get dtpExpiryDate_tooltip(): string {
            return ResourceManager.GetString("dtpExpiryDate_tooltip", resourceCulture);
        }
        public static get hypInitiate(): string {
            return ResourceManager.GetString("hypInitiate", resourceCulture);
        }
        public static get lblAdministeredby_text(): string {
            return ResourceManager.GetString("lblAdministeredby_text", resourceCulture);
        }
        public static get lblAdministeredby_tooltip(): string {
            return ResourceManager.GetString("lblAdministeredby_tooltip", resourceCulture);
        }
        public static get lblbagvolume_text(): string {
            return ResourceManager.GetString("lblbagvolume_text", resourceCulture);
        }
        public static get lblBatch_text(): string {
            return ResourceManager.GetString("lblBatch_text", resourceCulture);
        }
        public static get lblbatchno_text(): string {
            return ResourceManager.GetString("lblbatchno_text", resourceCulture);
        }
        public static get lblbkinfusrate_text(): string {
            return ResourceManager.GetString("lblbkinfusrate_text", resourceCulture);
        }
        public static get lblbolus_text(): string {
            return ResourceManager.GetString("lblbolus_text", resourceCulture);
        }
        public static get lblCalcdriprate_text(): string {
            return ResourceManager.GetString("lblCalcdriprate_text", resourceCulture);
        }
        public static get lblCancel_Text(): string {
            return ResourceManager.GetString("lblCancel_Text", resourceCulture);
        }
        public static get lblCancel_toolTip(): string {
            return ResourceManager.GetString("lblCancel_toolTip", resourceCulture);
        }
        public static get lblchgflowrate_txt(): string {
            return ResourceManager.GetString("lblchgflowrate_txt", resourceCulture);
        }
        public static get lblchngdatetime_text(): string {
            return ResourceManager.GetString("lblchngdatetime_text", resourceCulture);
        }
        public static get lblchnginfurate_text(): string {
            return ResourceManager.GetString("lblchnginfurate_text", resourceCulture);
        }
        public static get lblCIFValue_Tooltip(): string {
            return ResourceManager.GetString("lblCIFValue_Tooltip", resourceCulture);
        }
        public static get lblcliniIncFrm_text(): string {
            return ResourceManager.GetString("lblcliniIncFrm_text", resourceCulture);
        }
        public static get lblComments_text(): string {
            return ResourceManager.GetString("lblComments_text", resourceCulture);
        }
        public static get lblcurrentbagvol_text(): string {
            return ResourceManager.GetString("lblcurrentbagvol_text", resourceCulture);
        }
        public static get lbldatetime_text(): string {
            return ResourceManager.GetString("lbldatetime_text", resourceCulture);
        }
        public static get lbldatetimebegun_text(): string {
            return ResourceManager.GetString("lbldatetimebegun_text", resourceCulture);
        }
        public static get lblDateTimegiven_text(): string {
            return ResourceManager.GetString("lblDateTimegiven_text", resourceCulture);
        }
        public static get lblDeliveryDevice_text(): string {
            return ResourceManager.GetString("lblDeliveryDevice_text", resourceCulture);
        }
        public static get lblDose_text(): string {
            return ResourceManager.GetString("lblDose_text", resourceCulture);
        }
        public static get lbldriprate_text(): string {
            return ResourceManager.GetString("lbldriprate_text", resourceCulture);
        }
        public static get lbldropfactor_text(): string {
            return ResourceManager.GetString("lbldropfactor_text", resourceCulture);
        }
        public static get lblenddatetime_text(): string {
            return ResourceManager.GetString("lblenddatetime_text", resourceCulture);
        }
        public static get lblExpirydate_text(): string {
            return ResourceManager.GetString("lblExpirydate_text", resourceCulture);
        }
        public static get lblflowrate_text(): string {
            return ResourceManager.GetString("lblflowrate_text", resourceCulture);
        }
        public static get lblinfusrate_text(): string {
            return ResourceManager.GetString("lblinfusrate_text", resourceCulture);
        }
        public static get lbllastaction_text(): string {
            return ResourceManager.GetString("lbllastaction_text", resourceCulture);
        }
        public static get lblMessage_text(): string {
            return ResourceManager.GetString("lblMessage_text", resourceCulture);
        }
        public static get lblOk_Text(): string {
            return ResourceManager.GetString("lblOk_Text", resourceCulture);
        }
        public static get lblOk_Tooltip(): string {
            return ResourceManager.GetString("lblOk_Tooltip", resourceCulture);
        }
        public static get lblPassword_text(): string {
            return ResourceManager.GetString("lblPassword_text", resourceCulture);
        }
        public static get lblPassword_tooltip(): string {
            return ResourceManager.GetString("lblPassword_tooltip", resourceCulture);
        }
        public static get lblpausedttimebegun_text(): string {
            return ResourceManager.GetString("lblpausedttimebegun_text", resourceCulture);
        }
        public static get lblRcdDisp_text(): string {
            return ResourceManager.GetString("lblRcdDisp_text", resourceCulture);
        }
        public static get lblreason_text(): string {
            return ResourceManager.GetString("lblreason_text", resourceCulture);
        }
        public static get lblReason_tooltip(): string {
            return ResourceManager.GetString("lblReason_tooltip", resourceCulture);
        }
        public static get lblreasonpause_text(): string {
            return ResourceManager.GetString("lblreasonpause_text", resourceCulture);
        }
        public static get lblreasonstop_text(): string {
            return ResourceManager.GetString("lblreasonstop_text", resourceCulture);
        }
        public static get lblrecordedat_text(): string {
            return ResourceManager.GetString("lblrecordedat_text", resourceCulture);
        }
        public static get lblrecordedby_text(): string {
            return ResourceManager.GetString("lblrecordedby_text", resourceCulture);
        }
        public static get lblRecordReasonforDiscrepancy_text(): string {
            return ResourceManager.GetString("lblRecordReasonforDiscrepancy_text", resourceCulture);
        }
        public static get lblResNotGiven_text(): string {
            return ResourceManager.GetString("lblResNotGiven_text", resourceCulture);
        }
        public static get lblResNotGiven_tooltip(): string {
            return ResourceManager.GetString("lblResNotGiven_tooltip", resourceCulture);
        }
        public static get lblResonForDefer_text(): string {
            return ResourceManager.GetString("lblResonForDefer_text", resourceCulture);
        }
        public static get lblResumeddttime_text(): string {
            return ResourceManager.GetString("lblResumeddttime_text", resourceCulture);
        }
        public static get lblRoundto_text(): string {
            return ResourceManager.GetString("lblRoundto_text", resourceCulture);
        }
        public static get lblRoute_text(): string {
            return ResourceManager.GetString("lblRoute_text", resourceCulture);
        }
        public static get lblSite_text(): string {
            return ResourceManager.GetString("lblSite_text", resourceCulture);
        }
        public static get lblTitle_Text(): string {
            return ResourceManager.GetString("lblTitle_Text", resourceCulture);
        }
        public static get lbltotvolinf_text(): string {
            return ResourceManager.GetString("lbltotvolinf_text", resourceCulture);
        }
        public static get lbLumen_text(): string {
            return ResourceManager.GetString("lbLumen_text", resourceCulture);
        }
        public static get lblUser_text(): string {
            return ResourceManager.GetString("lblUser_text", resourceCulture);
        }
        public static get lblvolumeinfused_text(): string {
            return ResourceManager.GetString("lblvolumeinfused_text", resourceCulture);
        }
        public static get lblwastage_text(): string {
            return ResourceManager.GetString("lblwastage_text", resourceCulture);
        }
        public static get lblWitnessedby_text(): string {
            return ResourceManager.GetString("lblWitnessedby_text", resourceCulture);
        }
        public static get lblWitnessedby_tooltip(): string {
            return ResourceManager.GetString("lblWitnessedby_tooltip", resourceCulture);
        }
        public static get lbReason_text(): string {
            return ResourceManager.GetString("lbReason_text", resourceCulture);
        }
        public static get Password_Mandatory_Error(): string {
            return ResourceManager.GetString("Password_Mandatory_Error", resourceCulture);
        }
        public static get rdbbegun_text(): string {
            return ResourceManager.GetString("rdbbegun_text", resourceCulture);
        }
        public static get rdbbegun_tooltip(): string {
            return ResourceManager.GetString("rdbbegun_tooltip", resourceCulture);
        }
        public static get rdbCareProvider_text(): string {
            return ResourceManager.GetString("rdbCareProvider_text", resourceCulture);
        }
        public static get rdbcareprovider_tooltip(): string {
            return ResourceManager.GetString("rdbcareprovider_tooltip", resourceCulture);
        }
        public static get rdbchangebag_text(): string {
            return ResourceManager.GetString("rdbchangebag_text", resourceCulture);
        }
        public static get rdbchangebag_tooltip(): string {
            return ResourceManager.GetString("rdbchangebag_tooltip", resourceCulture);
        }
        public static get rdbchangeflowrate_text(): string {
            return ResourceManager.GetString("rdbchangeflowrate_text", resourceCulture);
        }
        public static get rdbchangeflowrate_tooltip(): string {
            return ResourceManager.GetString("rdbchangeflowrate_tooltip", resourceCulture);
        }
        public static get rdbcomplete_text(): string {
            return ResourceManager.GetString("rdbcomplete_text", resourceCulture);
        }
        public static get rdbcomplete_tooltip(): string {
            return ResourceManager.GetString("rdbcomplete_tooltip", resourceCulture);
        }
        public static get rdbdefer_text(): string {
            return ResourceManager.GetString("rdbdefer_text", resourceCulture);
        }
        public static get rdbdefer_tooltip(): string {
            return ResourceManager.GetString("rdbdefer_tooltip", resourceCulture);
        }
        public static get rdbDeferAdmin_text(): string {
            return ResourceManager.GetString("rdbDeferAdmin_text", resourceCulture);
        }
        public static get rdbDeferAdmin_tooltip(): string {
            return ResourceManager.GetString("rdbDeferAdmin_tooltip", resourceCulture);
        }
        public static get rdbGiven_text(): string {
            return ResourceManager.GetString("rdbGiven_text", resourceCulture);
        }
        public static get rdbGiven_tooltip(): string {
            return ResourceManager.GetString("rdbGiven_tooltip", resourceCulture);
        }
        public static get rdbNotGiven_text(): string {
            return ResourceManager.GetString("rdbNotGiven_text", resourceCulture);
        }
        public static get rdbNotGiven_tooltip(): string {
            return ResourceManager.GetString("rdbNotGiven_tooltip", resourceCulture);
        }
        public static get rdbNotKnown_text(): string {
            return ResourceManager.GetString("rdbNotKnown_text", resourceCulture);
        }
        public static get rdbNotKnown_tooltip(): string {
            return ResourceManager.GetString("rdbNotKnown_tooltip", resourceCulture);
        }
        public static get rdbparent_text(): string {
            return ResourceManager.GetString("rdbparent_text", resourceCulture);
        }
        public static get rdbparientCare_tooltip(): string {
            return ResourceManager.GetString("rdbparientCare_tooltip", resourceCulture);
        }
        public static get rdbpause_text(): string {
            return ResourceManager.GetString("rdbpause_text", resourceCulture);
        }
        public static get rdbpause_tooltip(): string {
            return ResourceManager.GetString("rdbpause_tooltip", resourceCulture);
        }
        public static get rdbResNoGiven(): string {
            return ResourceManager.GetString("rdbResNoGiven", resourceCulture);
        }
        public static get rdbresume_text(): string {
            return ResourceManager.GetString("rdbresume_text", resourceCulture);
        }
        public static get rdbresume_tooltip(): string {
            return ResourceManager.GetString("rdbresume_tooltip", resourceCulture);
        }
        public static get rdbSelfAdminstered_text(): string {
            return ResourceManager.GetString("rdbSelfAdminstered_text", resourceCulture);
        }
        public static get rdbSelfAdminstered_tooltip(): string {
            return ResourceManager.GetString("rdbSelfAdminstered_tooltip", resourceCulture);
        }
        public static get rdbstop_text(): string {
            return ResourceManager.GetString("rdbstop_text", resourceCulture);
        }
        public static get rdbstop_tooltip(): string {
            return ResourceManager.GetString("rdbstop_tooltip", resourceCulture);
        }
        public static get rdnResNotDefer(): string {
            return ResourceManager.GetString("rdnResNotDefer", resourceCulture);
        }
        public static get RecordAdminDiscntdDTTM_ErrMsg(): string {
            return ResourceManager.GetString("RecordAdminDiscntdDTTM_ErrMsg", resourceCulture);
        }
        public static get RecordAdminEndDTTM_ErrMsg(): string {
            return ResourceManager.GetString("RecordAdminEndDTTM_ErrMsg", resourceCulture);
        }
        public static get RecordAdministration_text(): string {
            return ResourceManager.GetString("RecordAdministration_text", resourceCulture);
        }
        public static get RecordAdminStartDTTM_ErrMsg(): string {
            return ResourceManager.GetString("RecordAdminStartDTTM_ErrMsg", resourceCulture);
        }
        public static get sfsAdminsteredBy_tooltip(): string {
            return ResourceManager.GetString("sfsAdminsteredBy_tooltip", resourceCulture);
        }
        public static get ss(): string {
            return ResourceManager.GetString("ss", resourceCulture);
        }
        public static get txtAdminsteredBy_tooltip(): string {
            return ResourceManager.GetString("txtAdminsteredBy_tooltip", resourceCulture);
        }
        public static get txtbackgroundinfusionrate_tooltip(): string {
            return ResourceManager.GetString("txtbackgroundinfusionrate_tooltip", resourceCulture);
        }
        public static get txtbackinfusionrate_tooltip(): string {
            return ResourceManager.GetString("txtbackinfusionrate_tooltip", resourceCulture);
        }
        public static get txtbagvolume_tooltip(): string {
            return ResourceManager.GetString("txtbagvolume_tooltip", resourceCulture);
        }
        public static get txtBatch_tooltip(): string {
            return ResourceManager.GetString("txtBatch_tooltip", resourceCulture);
        }
        public static get txtBolus_tooltip(): string {
            return ResourceManager.GetString("txtBolus_tooltip", resourceCulture);
        }
        public static get txtchangedinfusionrate_tooltip(): string {
            return ResourceManager.GetString("txtchangedinfusionrate_tooltip", resourceCulture);
        }
        public static get txtComments_tooltip(): string {
            return ResourceManager.GetString("txtComments_tooltip", resourceCulture);
        }
        public static get txtdeliverydevice_text(): string {
            return ResourceManager.GetString("txtdeliverydevice_text", resourceCulture);
        }
        public static get txtdeliveryevice_tooltip(): string {
            return ResourceManager.GetString("txtdeliveryevice_tooltip", resourceCulture);
        }
        public static get txtDose_tooltip(): string {
            return ResourceManager.GetString("txtDose_tooltip", resourceCulture);
        }
        public static get txtdoseadmin_tooltip(): string {
            return ResourceManager.GetString("txtdoseadmin_tooltip", resourceCulture);
        }
        public static get txtDoseadmin_txt(): string {
            return ResourceManager.GetString("txtDoseadmin_txt", resourceCulture);
        }
        public static get txtdriprate_tooltip(): string {
            return ResourceManager.GetString("txtdriprate_tooltip", resourceCulture);
        }
        public static get txtflowrate_tooltip(): string {
            return ResourceManager.GetString("txtflowrate_tooltip", resourceCulture);
        }
        public static get txtlumen_text(): string {
            return ResourceManager.GetString("txtlumen_text", resourceCulture);
        }
        public static get txtlumen_tooltip(): string {
            return ResourceManager.GetString("txtlumen_tooltip", resourceCulture);
        }
        public static get txtMediAction_text(): string {
            return ResourceManager.GetString("txtMediAction_text", resourceCulture);
        }
        public static get txtmediAction_tooltip(): string {
            return ResourceManager.GetString("txtmediAction_tooltip", resourceCulture);
        }
        public static get txtNoWitnessAvail_tooltip(): string {
            return ResourceManager.GetString("txtNoWitnessAvail_tooltip", resourceCulture);
        }
        public static get txtReasonFordefer_tooltip(): string {
            return ResourceManager.GetString("txtReasonFordefer_tooltip", resourceCulture);
        }
        public static get txtReasonForpause_tooltip(): string {
            return ResourceManager.GetString("txtReasonForpause_tooltip", resourceCulture);
        }
        public static get txtReasonForstop_tooltip(): string {
            return ResourceManager.GetString("txtReasonForstop_tooltip", resourceCulture);
        }
        public static get txtResMedicationNotGiven_tooltip(): string {
            return ResourceManager.GetString("txtResMedicationNotGiven_tooltip", resourceCulture);
        }
        public static get txtVolumeinfused_tooltip(): string {
            return ResourceManager.GetString("txtVolumeinfused_tooltip", resourceCulture);
        }
        public static get txtWastage_tooltip(): string {
            return ResourceManager.GetString("txtWastage_tooltip", resourceCulture);
        }
        public static get txtWitnessedBy_tooltip(): string {
            return ResourceManager.GetString("txtWitnessedBy_tooltip", resourceCulture);
        }
        public static get VolumeinfusedUOM_tooltip(): string {
            return ResourceManager.GetString("VolumeinfusedUOM_tooltip", resourceCulture);
        }
    }