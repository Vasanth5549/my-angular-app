import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { StringBuilder,ProfileFactoryType,ContextManager,Convert,AppActivity} from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp,Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison,AppDialogEventargs, AppDialogResult, DelegateArgs, DialogComponentArgs, WindowButtonType, HtmlPage } from 'epma-platform/models';
import { AppDialog, Border, Cursors, Grid, MouseButtonEventArgs, UserControl, iButton, iComboBox, iLabel } from 'epma-platform/controls';
import { HelperService} from 'epma-platform/soapclient';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
import { InfrecordadminVM } from '../viewmodel/InfrecordadminVM';
import { Resource } from '../resource';
import * as ControlStyles from "../../shared/epma-platform/controls/ControlStyles";
import { CListItem, iAppDialogWindow, List, ObservableCollection } from 'epma-platform/models';
import { ProfileData } from '../utilities/ProfileData';
import { RoutedEventArgs } from 'src/app/shared/epma-platform/controls/Control';
import { Common } from '../utilities/common';
// import { resource } from 'selenium-webdriver/http';

@Component({
  selector: 'InfRecAdmStrikeThrough',
  templateUrl: './InfRecAdmStrikeThrough.html'
})
export class InfRecAdmStrikeThrough extends iAppDialogWindow implements OnInit {
  IsEnablePRNInst:boolean = true;
  public objInfRecAdmin: InfrecordadminVM;
  whiteBorder: string | object = ControlStyles.whiteBorder;
  InnerBG: string | object = ControlStyles.InnerBG;
  LzoPageBG: any = ControlStyles.LzoPageBG;
  public objRecordAdmin = Resource.MedicationAdministrator;
  public Strikethrough = Resource.Strikethrough;
  override _DataContext: InfrecordadminVM = new InfrecordadminVM();
  override get DataContext() {
    console.log(this._DataContext);
    return this._DataContext;
  }
  @Input() override set DataContext(value: InfrecordadminVM) {
    this._DataContext = value;
  }
  constructor(OVMRecAdmin: InfrecordadminVM) {
    super();
    this.DataContext = OVMRecAdmin;
    this.objInfRecAdmin = OVMRecAdmin;
    
  }
  ngOnInit(){
    this.GetCliniicalIncidentFormConfig();
  }
  ngAfterViewInit(): void {
    this.GetCliniicalIncidentFormConfig();
    this.objInfRecAdmin.OnInfStrikethruValidationErrorMsgCompleted =(s,e)=>{ this.OnInfStrikethruValidationErrorMsgCompleted()};
    this.cboStrikethroughReason.Focus();
  }
  
  private LayoutRoot: Grid;
@ViewChild("LayoutRootTempRef", {read:Grid, static: false }) set _LayoutRoot(c: Grid){
    if(c){ this.LayoutRoot  = c; }
};
private lblstrikethrough: iLabel;
@ViewChild("lblstrikethroughTempRef", {read:iLabel, static: false }) set _lblstrikethrough(c: iLabel){
    if(c){ this.lblstrikethrough  = c; }
};
private lblStrikethroughdata: iLabel;
@ViewChild("lblStrikethroughdataTempRef", {read:iLabel, static: false }) set _lblStrikethroughdata(c: iLabel){
    if(c){ this.lblStrikethroughdata  = c; }
};
private lblReason: iLabel;
@ViewChild("lblReasonTempRef", {read:iLabel, static: false }) set _lblReason(c: iLabel){
    if(c){ this.lblReason  = c; }
};
private cboStrikethroughReason: iComboBox;
@ViewChild("cboStrikethroughReasonTempRef", {read:iComboBox, static: false }) set _cboStrikethroughReason(c: iComboBox){
    if(c){ this.cboStrikethroughReason  = c; }
};
private lblcliniIncFrm: iLabel;
@ViewChild("lblcliniIncFrmTempRef", {read:iLabel, static: false }) set _lblcliniIncFrm(c: iLabel){
    if(c){ this.lblcliniIncFrm  = c; }
};
private lblcliniIncFrmValue: iLabel;
@ViewChild("lblcliniIncFrmValueTempRef", {read:iLabel, static: false }) set _lblcliniIncFrmValue(c: iLabel){
    if(c){ this.lblcliniIncFrmValue  = c; }
};
  private _CaptionToDisplay: string = String.Empty;
  public get CaptionToDisplay(): string {
    return this._CaptionToDisplay;
  }
  private lblcliniIncFrmValueEnable: boolean = false;
  public get LblcliniIncFrmValueEnable(): boolean {
    return this.lblcliniIncFrmValueEnable;
  }

  GetCliniicalIncidentFormConfig(): void {
    var _CheckClinicalIncidentFormConfig: boolean = false;
    
   if (ProfileData.ClinicalIncidentConfig != null && ProfileData.ClinicalIncidentConfig.isStrikeThroughAdministration && !String.IsNullOrEmpty(ProfileData.ClinicalIncidentConfig.Address) && Common.ValidateURL(ProfileData.ClinicalIncidentConfig.Address)) {
      _CheckClinicalIncidentFormConfig = true;
    }
    //this.lblcliniIncFrm.Text = "Clinical incident form";
    if (_CheckClinicalIncidentFormConfig) {
      //this.lblcliniIncFrm.Cursor = Cursors.Hand;
      //this.lblcliniIncFrm.IsEnabled = true;
      this._CaptionToDisplay = (ProfileData.ClinicalIncidentConfig != null && !String.IsNullOrEmpty(ProfileData.ClinicalIncidentConfig.LinkTextToDisplay)) ? ProfileData.ClinicalIncidentConfig.LinkTextToDisplay : String.Empty;
      ;
      this.lblcliniIncFrmValueEnable = true;
    }
    else {
      this._CaptionToDisplay = String.Empty;
      this.lblcliniIncFrmValueEnable = false;
    }
  }
  public lblCIFValue_MouseLeftButtonUp(): void {
    HtmlPage.Window.Invoke("LaunchClinicalIncidentForm", ProfileData.ClinicalIncidentConfig.Address);
  }
  // private iAppDialogWindow_Loaded(sender: Object, e: RoutedEventArgs): void {
  //   this.objInfRecAdmin.OnInfStrikethruValidationErrorMsgCompleted =(s,e)=>{ this.OnInfStrikethruValidationErrorMsgCompleted()};
  // }
  OnInfStrikethruValidationErrorMsgCompleted(): void {
    this.cboStrikethroughReason.Focus();
  }
}