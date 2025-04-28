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
const Data = [{"key":"AdminAmount_Header","value":"Administered amount"},{"key":"AdminAmount_Tooltip","value":"Specify the admin amount value"},{"key":"AdminAmt_Msg","value":"Administered amount cannot be blank."},{"key":"BatchNumber_Header","value":"Batch/Lot number"},{"key":"BatchNumber_Tooltip","value":"Specify batch number"},{"key":"chkNoWitness_text","value":"No witness available"},{"key":"chkNoWitness_tooltip","value":"Select to indicate that no witness is avialable"},{"key":"cmdAdd_Text","value":"Add"},{"key":"cmdAdd_Tooltip","value":"Select to add product details"},{"key":"cmdRemove_Text","value":"Remove"},{"key":"cmdRemove_Tooltip","value":"Select to remove product details"},{"key":"cmdUpdate_Text","value":"Update"},{"key":"cmdUpdate_Tooltip","value":"Select to update product details"},{"key":"DoseMand_Msg","value":"Dose value cannot be zero or empty."},{"key":"ExpiryDate_Header","value":"Expiry date"},{"key":"ExpiryDate_Tooltip","value":"Specify Expiry date"},{"key":"ExpiryDTTM_Msg","value":"The expiry date of the medication scanned has passed. Do you wish to continue with the administration?"},{"key":"HdnColStrength_Header","value":"St."},{"key":"HdnColtotadamt_Header","value":"Cl."},{"key":"lblWitnessedby_text","value":"Witnessed by"},{"key":"lblWitnessedby_tooltip","value":"Select care provider who witnessed administration"},{"key":"ManualAdd_msg","value":"As medication details have previously been manually entered in the grid this medication cannot be scanned and added to the grid."},{"key":"MedExcluded_msg","value":"This medication is excluded from scanning"},{"key":"MultiRoute_Msg","value":"This medication requires route to be provided before scanning can progress."},{"key":"OutstandingDosetoadminister_Text","value":"Outstanding dose to administer :"},{"key":"OutstandingDosetoadminister_Tooltip","value":"Outstanding dose to administered"},{"key":"PresDosehdrdtls","value":"Dose"},{"key":"PresDuehdrName","value":"Due at"},{"key":"PresRoutehdrdtls","value":"Route"},{"key":"ProductCode_Header","value":"Product code"},{"key":"ProductCode_Tooltip","value":"Specify product code"},{"key":"ProductScannedhdr_Text","value":"Product scanned :"},{"key":"ProductsScanned_Header","value":"Products scanned"},{"key":"ProductsScanned_Tooltip","value":"Product scanned"},{"key":"rdbgiven_text","value":"Given"},{"key":"rdbgiven_tooltip","value":"Select given"},{"key":"rdbprepMedication_text","value":"Prepare medication"},{"key":"rdbprepMedication_tooltip","value":"Select prepare medication"},{"key":"SerialNumber_Header","value":"Serial number"},{"key":"SerialNumber_Tooltip","value":"Specify Serial number"},{"key":"sfsAdminsteredBy_tooltip","value":"Search for a care provider–opens in a new window"},{"key":"TotAdminAmt_Msg","value":"The total administered amount does not match the dose field within record administration, please review and update as necessary."},{"key":"TotalDoseAdministered_Text","value":"Total dose to be administered :"},{"key":"TotalDoseAdministered_Tooltip","value":"Total dose to be administered"},{"key":"TotalDoseValueAdmin_Tooltip","value":"Total dose value to be Administered"},{"key":"UOM_Header","value":"Uom"},{"key":"UOM_Tooltip","value":"Select the Uom"},{"key":"WitnessBy_Msg","value":"Enter witnessed by, this field is mandatory."},{"key":"Comments_Header","value":"Comments"},{"key":"Medicationprescribed_text","value":"Medication prescribed :"}];
class ResourceManager {
        static GetString(key: string, resourceCulture: any): string {
          let r = Data.find((e) => e.key == key);
          return r != undefined ? r.value : "";
        }
      }
    export class ScanRecMedicationMezzanine {
        constructor() {

        }
        GetResourceString(key: string): string {
            let r = Data.find((e) => e.key == key);
            return r != undefined ? r.value : "";
        }
        public static get AdminAmount_Header(): string {
            return ResourceManager.GetString("AdminAmount_Header", resourceCulture);
        }
        public static get AdminAmount_Tooltip(): string {
            return ResourceManager.GetString("AdminAmount_Tooltip", resourceCulture);
        }
        public static get AdminAmt_Msg(): string {
            return ResourceManager.GetString("AdminAmt_Msg", resourceCulture);
        }
        public static get BatchNumber_Header(): string {
            return ResourceManager.GetString("BatchNumber_Header", resourceCulture);
        }
        public static get BatchNumber_Tooltip(): string {
            return ResourceManager.GetString("BatchNumber_Tooltip", resourceCulture);
        }
        public static get chkNoWitness_text(): string {
            return ResourceManager.GetString("chkNoWitness_text", resourceCulture);
        }
        public static get chkNoWitness_tooltip(): string {
            return ResourceManager.GetString("chkNoWitness_tooltip", resourceCulture);
        }
        public static get cmdAdd_Text(): string {
            return ResourceManager.GetString("cmdAdd_Text", resourceCulture);
        }
        public static get cmdAdd_Tooltip(): string {
            return ResourceManager.GetString("cmdAdd_Tooltip", resourceCulture);
        }
        public static get cmdRemove_Text(): string {
            return ResourceManager.GetString("cmdRemove_Text", resourceCulture);
        }
        public static get cmdRemove_Tooltip(): string {
            return ResourceManager.GetString("cmdRemove_Tooltip", resourceCulture);
        }
        public static get cmdUpdate_Text(): string {
            return ResourceManager.GetString("cmdUpdate_Text", resourceCulture);
        }
        public static get cmdUpdate_Tooltip(): string {
            return ResourceManager.GetString("cmdUpdate_Tooltip", resourceCulture);
        }
        public static get Comments_Header(): string {
            return ResourceManager.GetString("Comments_Header", resourceCulture);
        }
        public static get DoseMand_Msg(): string {
            return ResourceManager.GetString("DoseMand_Msg", resourceCulture);
        }
        public static get ExpiryDate_Header(): string {
            return ResourceManager.GetString("ExpiryDate_Header", resourceCulture);
        }
        public static get ExpiryDate_Tooltip(): string {
            return ResourceManager.GetString("ExpiryDate_Tooltip", resourceCulture);
        }
        public static get ExpiryDTTM_Msg(): string {
            return ResourceManager.GetString("ExpiryDTTM_Msg", resourceCulture);
        }
        public static get HdnColStrength_Header(): string {
            return ResourceManager.GetString("HdnColStrength_Header", resourceCulture);
        }
        public static get HdnColtotadamt_Header(): string {
            return ResourceManager.GetString("HdnColtotadamt_Header", resourceCulture);
        }
        public static get lblWitnessedby_text(): string {
            return ResourceManager.GetString("lblWitnessedby_text", resourceCulture);
        }
        public static get lblWitnessedby_tooltip(): string {
            return ResourceManager.GetString("lblWitnessedby_tooltip", resourceCulture);
        }
        public static get ManualAdd_msg(): string {
            return ResourceManager.GetString("ManualAdd_msg", resourceCulture);
        }
        public static get MedExcluded_msg(): string {
            return ResourceManager.GetString("MedExcluded_msg", resourceCulture);
        }
        public static get Medicationprescribed_text(): string {
            return ResourceManager.GetString("Medicationprescribed_text", resourceCulture);
        }
        public static get MultiRoute_Msg(): string {
            return ResourceManager.GetString("MultiRoute_Msg", resourceCulture);
        }
        public static get OutstandingDosetoadminister_Text(): string {
            return ResourceManager.GetString("OutstandingDosetoadminister_Text", resourceCulture);
        }
        public static get OutstandingDosetoadminister_Tooltip(): string {
            return ResourceManager.GetString("OutstandingDosetoadminister_Tooltip", resourceCulture);
        }
        public static get PresDosehdrdtls(): string {
            return ResourceManager.GetString("PresDosehdrdtls", resourceCulture);
        }
        public static get PresDuehdrName(): string {
            return ResourceManager.GetString("PresDuehdrName", resourceCulture);
        }
        public static get PresRoutehdrdtls(): string {
            return ResourceManager.GetString("PresRoutehdrdtls", resourceCulture);
        }
        public static get ProductCode_Header(): string {
            return ResourceManager.GetString("ProductCode_Header", resourceCulture);
        }
        public static get ProductCode_Tooltip(): string {
            return ResourceManager.GetString("ProductCode_Tooltip", resourceCulture);
        }
        public static get ProductScannedhdr_Text(): string {
            return ResourceManager.GetString("ProductScannedhdr_Text", resourceCulture);
        }
        public static get ProductsScanned_Header(): string {
            return ResourceManager.GetString("ProductsScanned_Header", resourceCulture);
        }
        public static get ProductsScanned_Tooltip(): string {
            return ResourceManager.GetString("ProductsScanned_Tooltip", resourceCulture);
        }
        public static get rdbgiven_text(): string {
            return ResourceManager.GetString("rdbgiven_text", resourceCulture);
        }
        public static get rdbgiven_tooltip(): string {
            return ResourceManager.GetString("rdbgiven_tooltip", resourceCulture);
        }
        public static get rdbprepMedication_text(): string {
            return ResourceManager.GetString("rdbprepMedication_text", resourceCulture);
        }
        public static get rdbprepMedication_tooltip(): string {
            return ResourceManager.GetString("rdbprepMedication_tooltip", resourceCulture);
        }
        public static get SerialNumber_Header(): string {
            return ResourceManager.GetString("SerialNumber_Header", resourceCulture);
        }
        public static get SerialNumber_Tooltip(): string {
            return ResourceManager.GetString("SerialNumber_Tooltip", resourceCulture);
        }
        public static get sfsAdminsteredBy_tooltip(): string {
            return ResourceManager.GetString("sfsAdminsteredBy_tooltip", resourceCulture);
        }
        public static get TotAdminAmt_Msg(): string {
            return ResourceManager.GetString("TotAdminAmt_Msg", resourceCulture);
        }
        public static get TotalDoseAdministered_Text(): string {
            return ResourceManager.GetString("TotalDoseAdministered_Text", resourceCulture);
        }
        public static get TotalDoseAdministered_Tooltip(): string {
            return ResourceManager.GetString("TotalDoseAdministered_Tooltip", resourceCulture);
        }
        public static get TotalDoseValueAdmin_Tooltip(): string {
            return ResourceManager.GetString("TotalDoseValueAdmin_Tooltip", resourceCulture);
        }
        public static get UOM_Header(): string {
            return ResourceManager.GetString("UOM_Header", resourceCulture);
        }
        public static get UOM_Tooltip(): string {
            return ResourceManager.GetString("UOM_Tooltip", resourceCulture);
        }
        public static get WitnessBy_Msg(): string {
            return ResourceManager.GetString("WitnessBy_Msg", resourceCulture);
        }
    }