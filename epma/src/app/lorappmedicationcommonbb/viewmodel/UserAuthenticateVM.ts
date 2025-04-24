import { Component, OnInit } from '@angular/core';
import { StringBuilder, ProfileFactoryType, ContextManager, Convert, AppActivity} from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp, Byte, Decimal, decimal, Double, Float, Int64, long, Long, AppDialogEventargs, AppDialogResult, DelegateArgs, DialogComponentArgs, WindowButtonType, StringComparison, Visibility } from 'epma-platform/models';
import { AppDialog } from 'epma-platform/controls';
import { HelperService} from 'epma-platform/soapclient';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
import { ViewModelBase } from 'src/app/lorappcommonbb/viewmodelbase';
import { Resource as resource } from '../resource';
import { AMSHelper } from 'src/app/lorappcommonbb/amshelper';
import { CommonBB } from 'src/app/lorappcommonbb/utilities/common';
import * as CSecurityAuthenticationService from 'src/app/shared/epma-platform/soap-client/CSecurityAuthenticationServiceWS'
    export enum AuthResult {
        Success="Success",

        Cancelled="Cancelled",

        FailedSinceIncorrectPwd="FailedSinceIncorrectPwd",

        FailedSinceSameUser="FailedSinceSameUser",

        UnableToRetrieveLoginName="UnableToRetrieveLoginName"
    }
    export class UserAuthenticateVM extends ViewModelBase {
        //public delegate void AuthenticateCompleted(AuthResult oAuthResult);
        public OnAuthenticateCompleted: Function;
        private _LoginName: string;
        private _UserOID: number = 0;
        private _UserName: string;
        private _ErrorMessage: string;
        private _PasswordText: string;
        private _PasswordMandShow: Visibility = Visibility.Collapsed;
        private _PasswordSuccess: boolean = false;
        public get PasswordSuccess(): boolean {
            return this._PasswordSuccess;
        }
        public set PasswordSuccess(value: boolean) {
            this._PasswordSuccess = value;
        }
        public get LoginName(): string {
            return this._LoginName;
        }
        public set LoginName(value: string) {
            if (this._LoginName != value) {
                this._LoginName = value;
               //NotifyPropertyChanged("LoginName");
            }
        }
        public get UserOID(): number {
            return this._UserOID;
        }
        public set UserOID(value: number) {
            if (this._UserOID != value) {
                this._UserOID = value;
               //NotifyPropertyChanged("UserOID");
            }
        }
        public get UserName(): string {
            return this._UserName;
        }
        public set UserName(value: string) {
            if (this._UserName != value) {
                this._UserName = value;
               //NotifyPropertyChanged("UserName");
            }
        }
        public get ErrorMessage(): string {
            return this._ErrorMessage;
        }
        public set ErrorMessage(value: string) {
            if (this._ErrorMessage != value) {
                this._ErrorMessage = value;
               //NotifyPropertyChanged("ErrorMessage");
            }
        }
        public get PasswordText(): string {
            return this._PasswordText;
        }
        public set PasswordText(value: string) {
            if (this._PasswordText != value) {
                this._PasswordText = value;
               //NotifyPropertyChanged("PasswordText");
            }
        }
        public get PasswordMandShow(): Visibility {
            return this._PasswordMandShow;
        }
        public set PasswordMandShow(value: Visibility) {
            if (this._PasswordMandShow != value) {
                this._PasswordMandShow = value;
               //NotifyPropertyChanged("PasswordMandShow");
            }
        }
        public SubmitForm(): void {
            let objService: CSecurityAuthenticationService.CSecurityAuthenticationServiceWSSoapClient = new CSecurityAuthenticationService.CSecurityAuthenticationServiceWSSoapClient();
            objService.ValidateUserPINCompleted  = (s,e) => { this.ObjService_ValidateUserPINCompleted(s,e); } ;
            //let objReq: CSecurityAuthenticationService.ValidateUserPINRequest = new CSecurityAuthenticationService.ValidateUserPINRequest();
            let objReq = new CSecurityAuthenticationService.CReqMsgValidateUserPIN();
            objReq.oContextInformation = CommonBB.FillContext();
            objReq.lnUserOIDBC = this.UserOID;
            objReq.sPinBC = this.PasswordText;
            objService.ValidateUserPINAsync(objReq);
        }
        ObjService_ValidateUserPINCompleted(sender: Object, e: CSecurityAuthenticationService.ValidateUserPINCompletedEventArgs): void {
            if (e.Result != null) {
                let objRes: CSecurityAuthenticationService.CResMsgValidateUserPIN = e.Result;
                if (objRes != null) {
                    //let objValidateUserPIN: CSecurityAuthenticationService.CResMsgValidateUserPIN = objRes.ValidateUserPINResult;
                    if (objRes.oContextInformation.Errors.Count > 0) {
                        this.PasswordMandShow = Visibility.Visible;
                        this.PasswordText = "";
                        this.PasswordSuccess = false;
                        if (objRes.oContextInformation.Errors[0].ErrorID == 900410) {
                            this.ErrorMessage = resource.RecordAuthenticateVM.PIN_Empty_Msg;
                        }
                        else if (objRes.oContextInformation.Errors[0].ErrorID == 900409) {
                            this.ErrorMessage = resource.RecordAuthenticateVM.PIN_Blank_Msg;
                        }
                        else if (objRes.oContextInformation.Errors[0].ErrorID == 900411) {
                            this.ErrorMessage = resource.RecordAuthenticateVM.Validate_PIN;
                        }
                    if (this.OnAuthenticateCompleted != null) {
                        this.OnAuthenticateCompleted(AuthResult.FailedSinceIncorrectPwd);
                        }
                    }
                    else {
                        this.PasswordSuccess = true;
                    if (this.OnAuthenticateCompleted != null) {
                        this.OnAuthenticateCompleted(AuthResult.Success);
                        }
                    }
                }
            }
            else {
            let lnReturn: number = AMSHelper.PublicExceptionDetails(80000055, "LorAppMedicationCommonBB.dll, Class:UserAuthenticateVM, Method:ObjService_ValidateUserPINCompleted()", e.Error);
            }
        }
    }