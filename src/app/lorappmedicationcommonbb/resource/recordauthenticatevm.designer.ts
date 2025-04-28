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
  

// const resourceCulture = "";
const Data = [{"key":"lblPassword_text","value":"Password"},{"key":"lblPassword_tooltip","value":"Enter password"},{"key":"lblUser_text","value":"User"},{"key":"Password_Mandatory_Error","value":"The password entered is invalid.Please re-enter password."},{"key":"lblWitnessedby_text","value":"Witnessed by"},{"key":"WitnessPerformedBy_Message","value":"Selected witness is the same as the performed by user. Please select a user, other than the performed by user as a witness"},{"key":"lblTitle_Message","value":"Lorenzo"},{"key":"UserAuthDialog_Title","value":"User authentication"},{"key":"UserAuth_Title","value":"User authentication-LORENZO--Webpage Dialog"},{"key":"WitnessAdminBy_Message","value":"Selected witness is the same as the administering care provider. Please select a registered care provider, other than the administering user as a witness."},{"key":"WitnessReceivedBy_Message","value":"Selected witness is the same as the received by user. Please select a user, other than the received by user as a witness."},{"key":"WitnessSuppliedBy_Message","value":"Selected witness is the same as the supplied by user. Please select a user, other than the supplied by user as a witness."},{"key":"WitnessVerifiedBy_Message","value":"Selected witness is the same as the verified by user. Please select a user, other than the verified by user as a witness."},{"key":"AdminByWitness_Message","value":"Selected administered by is the same as the witnessing care provider. Please select a registered care provider, other than the witnessing user as a administered by."},{"key":"ReceievedBy_message","value":"Selected received by user is the same as the witness by user. Please select a user, other than the witness by user as a received by user."},{"key":"AdjustedBy_message","value":"Selected adjusted by user is the same as the witness by user. Please select a user, other than the witness by user as a adjusted by user."},{"key":"SuppliedBy_message","value":"Selected supplied by user is the same as the witness by user. Please select a user, other than the witness by user as a supplied by user."},{"key":"PerformedBy_message","value":"Selected performed by user is the same as the witness by user. Please select a user, other than the witness by user as a performed by user."},{"key":"VerifiedBy_message","value":"Selected verified by user is the same as the witness by user. Please select a user, other than the witness by user as a verified by user."},{"key":"WitnessAdjustedBy_Message","value":"Selected witness is the same as the adjusted by user. Please select a user, other than the adjusted by user as a witness."},{"key":"lblPIN_text","value":"PIN"},{"key":"lblPIN_tooltip","value":"Enter PIN"},{"key":"Validate_PIN","value":"The PIN entered is invalid. Please re-enter PIN"},{"key":"PIN_Blank_Msg","value":"Please set the PIN number in Manage my profile using Manage PIN link."},{"key":"PIN_Empty_Msg","value":"PIN should not be empty."}];
class ResourceManager {
        static GetString(key: string, resourceCulture: any): string {
          let r = Data.find((e) => e.key == key);
          return r != undefined ? r.value : "";
        }
      }


    export class RecordAuthenticateVM {
        // private static resourceMan: System.Resources.ResourceManager;
        private static resourceCulture = "";
        constructor() {

        }
        GetResourceString(key: string): string {
            let r = Data.find((e) => e.key == key);
            return r != undefined ? r.value : "";
        }
        public static get lblPassword_text(): string {
            return ResourceManager.GetString("lblPassword_text", RecordAuthenticateVM.resourceCulture);
        }
        public static get lblPassword_tooltip(): string {
            return ResourceManager.GetString("lblPassword_tooltip", RecordAuthenticateVM.resourceCulture);
        }
        public static get lblTitle_Message(): string {
            return ResourceManager.GetString("lblTitle_Message", RecordAuthenticateVM.resourceCulture);
        }
        public static get lblUser_text(): string {
            return ResourceManager.GetString("lblUser_text", RecordAuthenticateVM.resourceCulture);
        }
        public static get lblWitnessedby_text(): string {
            return ResourceManager.GetString("lblWitnessedby_text", RecordAuthenticateVM.resourceCulture);
        }
        public static get Password_Mandatory_Error(): string {
            return ResourceManager.GetString("Password_Mandatory_Error", RecordAuthenticateVM.resourceCulture);
        }
        public static get UserAuth_Title(): string {
            return ResourceManager.GetString("UserAuth_Title", RecordAuthenticateVM.resourceCulture);
        }
        public static get UserAuthDialog_Title(): string {
            return ResourceManager.GetString("UserAuthDialog_Title", RecordAuthenticateVM.resourceCulture);
        }
        public static get WitnessAdminBy_Message(): string {
            return ResourceManager.GetString("WitnessAdminBy_Message", RecordAuthenticateVM.resourceCulture);
        }
        public static get WitnessPerformedBy_Message(): string {
            return ResourceManager.GetString("WitnessPerformedBy_Message", RecordAuthenticateVM.resourceCulture);
        }
        public static get WitnessReceivedBy_Message(): string {
            return ResourceManager.GetString("WitnessReceivedBy_Message", RecordAuthenticateVM.resourceCulture);
        }
        public static get WitnessSuppliedBy_Message(): string {
            return ResourceManager.GetString("WitnessSuppliedBy_Message", RecordAuthenticateVM.resourceCulture);
        }
        public static get WitnessVerifiedBy_Message(): string {
            return ResourceManager.GetString("WitnessVerifiedBy_Message", RecordAuthenticateVM.resourceCulture);
        }
        public static get AdminByWitness_Message(): string {
            return ResourceManager.GetString("AdminByWitness_Message", RecordAuthenticateVM.resourceCulture);
        }
        public static get ReceievedBy_message(): string {
            return ResourceManager.GetString("ReceievedBy_message", RecordAuthenticateVM.resourceCulture);
        }
        public static get AdjustedBy_message(): string {
            return ResourceManager.GetString("AdjustedBy_message", RecordAuthenticateVM.resourceCulture);
        }
        public static get SuppliedBy_message(): string {
            return ResourceManager.GetString("SuppliedBy_message", RecordAuthenticateVM.resourceCulture);
        }
        public static get PerformedBy_message(): string {
            return ResourceManager.GetString("PerformedBy_message", RecordAuthenticateVM.resourceCulture);
        }
        public static get VerifiedBy_message(): string {
            return ResourceManager.GetString("VerifiedBy_message", RecordAuthenticateVM.resourceCulture);
        }
        public static get WitnessAdjustedBy_Message(): string {
            return ResourceManager.GetString("WitnessAdjustedBy_Message", RecordAuthenticateVM.resourceCulture);
        }
        public static get lblPIN_text(): string {
            return ResourceManager.GetString("lblPIN_text", RecordAuthenticateVM.resourceCulture);
        }
        public static get lblPIN_tooltip(): string {
            return ResourceManager.GetString("lblPIN_tooltip", RecordAuthenticateVM.resourceCulture);
        }
        public static get Validate_PIN(): string {
            return ResourceManager.GetString("Validate_PIN", RecordAuthenticateVM.resourceCulture);
        }
        public static get PIN_Blank_Msg(): string {
            return ResourceManager.GetString("PIN_Blank_Msg", RecordAuthenticateVM.resourceCulture);
        }
        public static get PIN_Empty_Msg(): string {
            return ResourceManager.GetString("PIN_Empty_Msg", RecordAuthenticateVM.resourceCulture);
        }
    }