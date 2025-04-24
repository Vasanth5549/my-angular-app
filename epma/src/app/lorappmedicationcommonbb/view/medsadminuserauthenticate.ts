import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { AuthResult, UserAuthenticateVM } from '../viewmodel/UserAuthenticateVM';
import { iAppDialogWindow } from 'epma-platform/models';
import { Visibility } from 'epma-platform/models';
import { SelectedUserType } from 'src/app/lorappmedicationcommonbb/utilities/witnesshelper';
import { iTextBox } from 'epma-platform/controls';
import { RecordAuthenticateVM } from '../resource/recordauthenticatevm.designer';
import { TextBoxComponent } from '@progress/kendo-angular-inputs';

@Component({
  selector: 'MedsAdminUserAuthenticate',
  templateUrl: './medsadminuserauthenticate.html',
  styleUrls: ['./medsadminuserauthenticate.css']
})

export class MedsAdminUserAuthenticate extends iAppDialogWindow implements AfterViewInit {
  oUserAuthenticateVM: UserAuthenticateVM;
  public oCallback: (_: AuthResult, __: SelectedUserType) => void;
  public _eSelectedUserType: SelectedUserType;
  public lUserOID: number;
  public sUserName: string;

  constructor() {
      super();
      this.oUserAuthenticateVM = new UserAuthenticateVM();
      this.oUserAuthenticateVM.PasswordText = "";
      this.DataContext = this.oUserAuthenticateVM;
  }
  GetResourceString(sKey: string) {
    let oRecordAuthenticateVM: RecordAuthenticateVM = new RecordAuthenticateVM();
    return oRecordAuthenticateVM.GetResourceString(sKey);
  }

  ngAfterViewInit(): void {
    this.oUserAuthenticateVM.UserOID = this.lUserOID;
    this.oUserAuthenticateVM.UserName = this.sUserName;
    this.oUserAuthenticateVM.OnAuthenticateCompleted = (s,e) => { this.Form_OnAuthenticateCompleted(s) };
    this.ChildWindow_Loaded();
    this.DataContext = this.oUserAuthenticateVM;
  }

  private ChildWindow_Loaded(): void {
      this.oUserAuthenticateVM.PasswordMandShow = Visibility.Collapsed;
      this.oUserAuthenticateVM.PasswordText = "";
      this.pbxPassword_Focus();
  }
  public Form_OnAuthenticateCompleted(oAuthResult: AuthResult): void {
      if (oAuthResult == AuthResult.Success) {
          this.appDialog.DialogResult = true;
          if (this.oCallback != null) {
              this.oCallback(AuthResult.Success, this._eSelectedUserType);
          }
          this.ChildWindow_UnLoaded();
      }
      else if (oAuthResult == AuthResult.FailedSinceIncorrectPwd) {
          this.pbxPassword_Focus();
      }
  }
  private DisposeFormEvents(): void {
      if (this.oUserAuthenticateVM != null)
          this.oUserAuthenticateVM.OnAuthenticateCompleted = (s,e) => { this.Form_OnAuthenticateCompleted(s) };
  }
  private DisposeFormObjects(): void {
      this.oUserAuthenticateVM = null;
      this.oCallback = null;
  }
  private ChildWindow_UnLoaded(): void {
      this.DisposeFormEvents();
      this.DisposeFormObjects();
  }
  pbxPassword_onFocusOut(): void {
    let pbxPassword = (document.getElementById("pbxPassword") as HTMLInputElement);
    this.oUserAuthenticateVM.PasswordText = pbxPassword.value;
  }
  pbxPassword_Focus() {
    let pbxPassword = (document.getElementById("pbxPassword") as HTMLInputElement);
    pbxPassword.focus();
  }

}
