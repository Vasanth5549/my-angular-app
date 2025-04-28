import { Component, OnInit } from '@angular/core';
import { StringBuilder,ProfileFactoryType,ContextManager,Convert,AppActivity} from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp,Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison, AppDialogResult, AppDialogEventargs, ChildWindow, WindowButtonType } from 'epma-platform/models';
import { AppDialog } from 'epma-platform/controls';
import { HelperService} from 'epma-platform/soapclient';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
import {Resource as resource } from '../resource';
import { AuthResult, UserAuthenticateVM } from '../viewmodel/UserAuthenticateVM';
import { MedsAdminUserAuthenticate } from '../view/medsadminuserauthenticate';

    export enum SelectedUserType {
        AdministeringUser="AdministeringUser",

        WitnessingUser="WitnessingUser",

        ReceivingUser="ReceivingUser",

        VerifyingUser="VerifyingUser",

        PerformingUser="PerformingUser",

        AdjustingUser="AdjustingUser",

        SupplyingUser="SupplyingUser"
    }
    export class WitnessHelper {
        private _Callback: (_: AuthResult, __: SelectedUserType) => void;
        private oChildWindow: ChildWindow;
        private _eSelectedUserType: SelectedUserType;
        objMedsAdminUserAuthenticate: MedsAdminUserAuthenticate;
        public AuthenticateUser(AdministeringUserOID: number, WitnessingUserOID: number, UserName: string, _SelectedUserType: SelectedUserType, oCallback: (_: AuthResult, __: SelectedUserType) => void, MsgResxKey: string): void {
            this._Callback = oCallback;
            this._eSelectedUserType = _SelectedUserType;
            let IsSameUsers: boolean = false;
            if (AdministeringUserOID > 0 && WitnessingUserOID > 0) {
                if (AdministeringUserOID == WitnessingUserOID) {
                    IsSameUsers = true;
                    let iMsgBox: iMessageBox = ObjectHelper.CreateObject(new iMessageBox(), {
                        Title: resource.RecordAuthenticateVM.lblTitle_Message,
                        Message: resource.RecordAuthenticateVM[MsgResxKey],                        
                        MessageButton: MessageBoxButton.OK,
                        IconType: MessageBoxType.Information,
                        Width: 400
                    });
                    iMsgBox.MessageBoxClose  = (s,e) => { this.iMsgBoxChild_MessageBoxClose(s,e); } ;
                    iMsgBox.Show();
                }
            }
            if (!IsSameUsers && WitnessingUserOID > 0) {
                if (_SelectedUserType == SelectedUserType.WitnessingUser) {
                    let objMedsAdminUserAuthenticate: MedsAdminUserAuthenticate = new MedsAdminUserAuthenticate();
                    objMedsAdminUserAuthenticate.oCallback = this._Callback;
                    objMedsAdminUserAuthenticate._eSelectedUserType = this._eSelectedUserType;
                    objMedsAdminUserAuthenticate.lUserOID = WitnessingUserOID;
                    objMedsAdminUserAuthenticate.sUserName = UserName;
                    AppActivity.OpenWindow(resource.RecordAuthenticateVM.UserAuth_Title, objMedsAdminUserAuthenticate,(s,e)=>{ this.objMedsAdminUserAuthenticate_Closed(s);}, resource.RecordAuthenticateVM.UserAuthDialog_Title, false, 240, 332, false, WindowButtonType.OkCancel, null);
                }
            }
        }
        objMedsAdminUserAuthenticate_Closed(args: AppDialogEventargs): void {

            this.objMedsAdminUserAuthenticate = ObjectHelper.CreateType<MedsAdminUserAuthenticate>(args.Content.Component, MedsAdminUserAuthenticate);
            let oUserAuthenticateVM: UserAuthenticateVM = ObjectHelper.CreateType<UserAuthenticateVM>(this.objMedsAdminUserAuthenticate.DataContext, UserAuthenticateVM);
            if (args.Result == AppDialogResult.Ok) {                
                if (this.objMedsAdminUserAuthenticate != null) {
                    //let oUserAuthenticateVM: UserAuthenticateVM = ObjectHelper.CreateType<UserAuthenticateVM>(this.objMedsAdminUserAuthenticate.DataContext, UserAuthenticateVM);
                    if (oUserAuthenticateVM != null) {
                        oUserAuthenticateVM.SubmitForm();
                    }
                }
            }
            else if (args.Result == AppDialogResult.Cancel) {
                this.oChildWindow = args.AppChildWindow;                
                args.AppChildWindow.DialogRef.close();
                //this._Callback(AuthResult.Cancelled, this._eSelectedUserType);
                this.objMedsAdminUserAuthenticate.oCallback(AuthResult.Cancelled, this._eSelectedUserType)
            }
        }
        iMsgBoxChild_MessageBoxClose(sender: Object, e: MessageEventArgs): void {
            if (this._Callback != null)
                this._Callback(AuthResult.FailedSinceSameUser, this._eSelectedUserType);
        }
    }