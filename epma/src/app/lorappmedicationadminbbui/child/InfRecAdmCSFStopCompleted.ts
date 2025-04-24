import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { StringBuilder,ProfileFactoryType,ContextManager,Convert,AppActivity, Regex} from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp,Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison,AppDialogEventargs, AppDialogResult, DelegateArgs, DialogComponentArgs, WindowButtonType, HtmlPage, Visibility, SelectionChangedEventArgs } from 'epma-platform/models';
import { AppDialog, Border, Grid, StackPanel, UserControl, iButton, iComboBox, iDateTimePicker, iLabel, iTextBox, iTimeBox } from 'epma-platform/controls';
import { HelperService} from 'epma-platform/soapclient';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
import { InfrecordadminVM } from '../viewmodel/InfrecordadminVM';
import { DateChangedArgs, MouseButtonEventArgs } from 'src/app/shared/epma-platform/controls/Control';
import { RoutedEventArgs } from 'src/app/shared/epma-platform/controls/FrameworkElement';
import { ProfileData } from '../utilities/ProfileData';
import { CommonBB } from 'src/app/lorappcommonbb/utilities/common';
import { Resource } from 'src/app/lorappmedicationadminbbui/resource';
import * as ControlStyles from "../../shared/epma-platform/controls/ControlStyles";
import { MedicationAction } from '../utilities/CConstants';
import { InfusionTypeCode } from 'src/app/lorappmedicationcommonbb/utilities/constants';
import { Common } from '../utilities/common';

 @Component({
   selector: 'InfRecAdmCSFStopCompleted',
   templateUrl: './InfRecAdmCSFStopCompleted.html',
   styleUrls: ['./InfRecAdmCSFStopCompleted.css'],
 })


  export class InfRecAdmCSFStopComplete extends UserControl {
    override _DataContext: any;
   oInfrecVM: any;
    override get DataContext() {
         return this._DataContext;
     }
     @Input()  override  set DataContext(value: any) {
      this._DataContext = value;
     }
   
    public Styles = ControlStyles;
      recordadminVM: InfrecordadminVM;
      CurrentDt: DateTime= CommonBB.GetServerDateTime();
      public LayoutRoot: Grid;
      public objRecordAdmin = Resource.MedicationAdministrator;
      
      
@ViewChild("LayoutRootTempRef", {read:Grid, static: false }) set _LayoutRoot(c: Grid){
  if(c){ this.LayoutRoot  = c; }
};
public volumeinfo: Grid;
@ViewChild("volumeinfoTempRef", {read:Grid, static: false }) set _volumeinfo(c: Grid){
  if(c){ this.volumeinfo  = c; }
};
public bgdtotvolume: Border;
@ViewChild("bgdtotvolumeTempRef", {read:Border, static: false }) set _bgdtotvolume(c: Border){
  if(c){ this.bgdtotvolume  = c; }
};
public lblTotVolToBeInfused: iLabel;
@ViewChild("lblTotVolToBeInfusedTempRef", {read:iLabel, static: false }) set _lblTotVolToBeInfused(c: iLabel){
  if(c){ this.lblTotVolToBeInfused  = c; }
};
public lblTotVolToBeInfusedValue: iLabel;
@ViewChild("lblTotVolToBeInfusedValueTempRef", {read:iLabel, static: false }) set _lblTotVolToBeInfusedValue(c: iLabel){
  if(c){ this.lblTotVolToBeInfusedValue  = c; }
};
public bgdcumvolinfused: Border;
@ViewChild("bgdcumvolinfusedTempRef", {read:Border, static: false }) set _bgdcumvolinfused(c: Border){
  if(c){ this.bgdcumvolinfused  = c; }
};
public lblcumvolinfused: iLabel;
@ViewChild("lblcumvolinfusedTempRef", {read:iLabel, static: false }) set _lblcumvolinfused(c: iLabel){
  if(c){ this.lblcumvolinfused  = c; }
};
public lblcumvolinfusedval: iLabel;
@ViewChild("lblcumvolinfusedvalTempRef", {read:iLabel, static: false }) set _lblcumvolinfusedval(c: iLabel){
  if(c){ this.lblcumvolinfusedval  = c; }
};
public brdstopcompleteinfo: Border;
@ViewChild("brdstopcompleteinfoTempRef", {read:Border, static: false }) set _brdstopcompleteinfo(c: Border){
  if(c){ this.brdstopcompleteinfo  = c; }
};
public grdstopcompdet: Grid;
@ViewChild("grdstopcompdetTempRef", {read:Grid, static: false }) set _grdstopcompdet(c: Grid){
  if(c){ this.grdstopcompdet  = c; }
};
public bgdbagvolume: Border;
@ViewChild("bgdbagvolumeTempRef", {read:Border, static: false }) set _bgdbagvolume(c: Border){
  if(c){ this.bgdbagvolume  = c; }
};
public bgddoseadmin: Border = new Border();
@ViewChild("bgddoseadminTempRef", {read:Border, static: false }) set _bgddoseadmin(c: Border){
  if(c){ this.bgddoseadmin  = c; }
};
public bgdwastage: Border;
@ViewChild("bgdwastageTempRef", {read:Border, static: false }) set _bgdwastage(c: Border){
  if(c){ this.bgdwastage  = c; }
};
public bgdvoluminfu: Border;
@ViewChild("bgdvoluminfuTempRef", {read:Border, static: false }) set _bgdvoluminfu(c: Border){
  if(c){ this.bgdvoluminfu  = c; }
};
public bgdendtime: Border;
@ViewChild("bgdendtimeTempRef", {read:Border, static: false }) set _bgdendtime(c: Border){
  if(c){ this.bgdendtime  = c; }
};
public bgdconcentration: Border;
@ViewChild("bgdconcentrationTempRef", {read:Border, static: false }) set _bgdconcentration(c: Border){
  if(c){ this.bgdconcentration  = c; }
};
public bgdfive: Border;
@ViewChild("bgdfiveTempRef", {read:Border, static: false }) set _bgdfive(c: Border){
  if(c){ this.bgdfive  = c; }
};
public brdbagvolume: Border;
@ViewChild("brdbagvolumeTempRef", {read:Border, static: false }) set _brdbagvolume(c: Border){
  if(c){ this.brdbagvolume  = c; }
};
public brddoseadmin: Border = new Border();
@ViewChild("brddoseadminTempRef", {read:Border, static: false }) set _brddoseadmin(c: Border){
  if(c){ this.brddoseadmin  = c; }
};
public brdwastage: Border;
@ViewChild("brdwastageTempRef", {read:Border, static: false }) set _brdwastage(c: Border){
  if(c){ this.brdwastage  = c; }
};
public brdvoluminfu: Border =new Border();
@ViewChild("brdvoluminfuTempRef", {read:Border, static: false }) set _brdvoluminfu(c: Border){
  if(c){ this.brdvoluminfu  = c; }
};
public brdendtime: Border;
@ViewChild("brdendtimeTempRef", {read:Border, static: false }) set _brdendtime(c: Border){
  if(c){ this.brdendtime  = c; }
};
public brdconcentration: Border;
@ViewChild("brdconcentrationTempRef", {read:Border, static: false }) set _brdconcentration(c: Border){
  if(c){ this.brdconcentration  = c; }
};
public brdfive: Border;
@ViewChild("brdfiveTempRef", {read:Border, static: false }) set _brdfive(c: Border){
  if(c){ this.brdfive  = c; }
};
public lblbagvolume: iLabel;
@ViewChild("lblbagvolumeTempRef", {read:iLabel, static: false }) set _lblbagvolume(c: iLabel){
  if(c){ this.lblbagvolume  = c; }
};
public stackbagvolume: StackPanel;
@ViewChild("stackbagvolumeTempRef", {read:StackPanel, static: false }) set _stackbagvolume(c: StackPanel){
  if(c){ this.stackbagvolume  = c; }
};
public lblBagVolumevalue: iLabel;
@ViewChild("lblBagVolumevalueTempRef", {read:iLabel, static: false }) set _lblBagVolumevalue(c: iLabel){
  if(c){ this.lblBagVolumevalue  = c; }
};
public lbldoseadmin: iLabel =new iLabel();
@ViewChild("lbldoseadminTempRef", {read:iLabel, static: false }) set _lbldoseadmin(c: iLabel){
  if(c){ this.lbldoseadmin  = c; }
};
public stackdoseadmin: StackPanel;
@ViewChild("stackdoseadminTempRef", {read:StackPanel, static: false }) set _stackdoseadmin(c: StackPanel){
  if(c){ this.stackdoseadmin  = c; }
};
public txtdoseadmin: iTextBox = new iTextBox();
@ViewChild("txtdoseadminTempRef", {read:iTextBox, static: false }) set _txtdoseadmin(c: iTextBox){
  if(c){ this.txtdoseadmin  = c; }
};
public lblUOM: iLabel;
@ViewChild("lblUOMTempRef", {read:iLabel, static: false }) set _lblUOM(c: iLabel){
  if(c){ this.lblUOM  = c; }
};
public cboDoseUOM: iComboBox;
@ViewChild("cboDoseUOMTempRef", {read:iComboBox, static: false }) set _cboDoseUOM(c: iComboBox){
  if(c){ this.cboDoseUOM  = c; }
};
public lblDoseUOM: iLabel = new iLabel();
@ViewChild("lblDoseUOMTempRef", {read:iLabel, static: false }) set _lblDoseUOM(c: iLabel){
  if(c){ this.lblDoseUOM  = c; }
};
public cmdCondDoseImg: iButton;
@ViewChild("cmdCondDoseImgTempRef", {read:iButton, static: false }) set _cmdCondDoseImg(c: iButton){
  if(c){ this.cmdCondDoseImg  = c; }
};
public lblvolumeinfused1: iLabel;
@ViewChild("lblvolumeinfused1TempRef", {read:iLabel, static: false }) set _lblvolumeinfused1(c: iLabel){
  if(c){ this.lblvolumeinfused1  = c; }
};
public txtvolumeinfused1: iTextBox = new iTextBox();
@ViewChild("txtvolumeinfused1TempRef", {read:iTextBox, static: false }) set _txtvolumeinfused1(c: iTextBox){
  if(c){ this.txtvolumeinfused1  = c; }
};
public lbluom2: iLabel;
@ViewChild("lbluom2TempRef", {read:iLabel, static: false }) set _lbluom2(c: iLabel){
  if(c){ this.lbluom2  = c; }
};
public cbovolUOM: iComboBox;
@ViewChild("cbovolUOMTempRef", {read:iComboBox, static: false }) set _cbovolUOM(c: iComboBox){
  if(c){ this.cbovolUOM  = c; }
};
public lblConcentration: iLabel;
@ViewChild("lblConcentrationTempRef", {read:iLabel, static: false }) set _lblConcentration(c: iLabel){
  if(c){ this.lblConcentration  = c; }
};
public lblConcentrationVal: iLabel;
@ViewChild("lblConcentrationValTempRef", {read:iLabel, static: false }) set _lblConcentrationVal(c: iLabel){
  if(c){ this.lblConcentrationVal  = c; }
};
public lblendDateTime: iLabel;
@ViewChild("lblendDateTimeTempRef", {read:iLabel, static: false }) set _lblendDateTime(c: iLabel){
  if(c){ this.lblendDateTime  = c; }
};
public dtpendDate: iDateTimePicker;
@ViewChild("dtpendDateTempRef", {read:iDateTimePicker, static: false }) set _dtpendDate(c: iDateTimePicker){
  if(c){ this.dtpendDate  = c; }
};
public iTimedendTime: iTimeBox;
@ViewChild("iTimedendTimeTempRef", {read:iTimeBox, static: false }) set _iTimedendTime(c: iTimeBox){
  if(c){ this.iTimedendTime  = c; }
};
public bgdcumvolinfinpro: Border;
@ViewChild("bgdcumvolinfinproTempRef", {read:Border, static: false }) set _bgdcumvolinfinpro(c: Border){
  if(c){ this.bgdcumvolinfinpro  = c; }
};
public bgdrsnstop: Border = new Border();
@ViewChild("bgdrsnstopTempRef", {read:Border, static: false }) set _bgdrsnstop(c: Border){
  if(c){ this.bgdrsnstop  = c; }
};
public bgdcommmets: Border;
@ViewChild("bgdcommmetsTempRef", {read:Border, static: false }) set _bgdcommmets(c: Border){
  if(c){ this.bgdcommmets  = c; }
};
public bgdinitform: Border;
@ViewChild("bgdinitformTempRef", {read:Border, static: false }) set _bgdinitform(c: Border){
  if(c){ this.bgdinitform  = c; }
};
public bgd2: Border;
@ViewChild("bgd2TempRef", {read:Border, static: false }) set _bgd2(c: Border){
  if(c){ this.bgd2  = c; }
};
public brdrsnstop: Border;
@ViewChild("brdrsnstopTempRef", {read:Border, static: false }) set _brdrsnstop(c: Border){
  if(c){ this.brdrsnstop  = c; }
};
public brdcommmets: Border = new Border();
@ViewChild("brdcommmetsTempRef", {read:Border, static: false }) set _brdcommmets(c: Border){
  if(c){ this.brdcommmets  = c; }
};
public brdinitform: Border;
@ViewChild("brdinitformTempRef", {read:Border, static: false }) set _brdinitform(c: Border){
  if(c){ this.brdinitform  = c; }
};
public brd2: Border;
@ViewChild("brd2TempRef", {read:Border, static: false }) set _brd2(c: Border){
  if(c){ this.brd2  = c; }
};
public lblestivolinfinpro: iLabel;
@ViewChild("lblestivolinfinproTempRef", {read:iLabel, static: false }) set _lblestivolinfinpro(c: iLabel){
  if(c){ this.lblestivolinfinpro  = c; }
};
public lblestvolinfinproval: iLabel;
@ViewChild("lblestvolinfinprovalTempRef", {read:iLabel, static: false }) set _lblestvolinfinproval(c: iLabel){
  if(c){ this.lblestvolinfinproval  = c; }
};
public lblResForstopping: iLabel = new iLabel();
@ViewChild("lblResForstoppingTempRef", {read:iLabel, static: false }) set _lblResForstopping(c: iLabel){
  if(c){ this.lblResForstopping  = c; }
};
public cboResForstopping: iComboBox = new iComboBox();
@ViewChild("cboResForstoppingTempRef", {read:iComboBox, static: false }) set _cboResForstopping(c: iComboBox){
  if(c){ this.cboResForstopping  = c; }
};
public lblComments: iLabel;
@ViewChild("lblCommentsTempRef", {read:iLabel, static: false }) set _lblComments(c: iLabel){
  if(c){ this.lblComments  = c; }
};
public txtComments: iTextBox;
@ViewChild("txtCommentsTempRef", {read:iTextBox, static: false }) set _txtComments(c: iTextBox){
  if(c){ this.txtComments  = c; }
};
public lblcliniIncFrm: iLabel = new iLabel();
@ViewChild("lblcliniIncFrmTempRef", {read:iLabel, static: false }) set _lblcliniIncFrm(c: iLabel){
  if(c){ this.lblcliniIncFrm  = c; }
};
public lblcliniIncFrmValue: iLabel = new iLabel();
@ViewChild("lblcliniIncFrmValueTempRef", {read:iLabel, static: false }) set _lblcliniIncFrmValue(c: iLabel){
  if(c){ this.lblcliniIncFrmValue  = c; }
};
public spacutal: StackPanel;
@ViewChild("spacutalTempRef", {read:StackPanel, static: false }) set _spacutal(c: StackPanel){
  if(c){ this.spacutal  = c; }
};
public lblCalculatedenddatetime: iLabel;
@ViewChild("lblCalculatedenddatetimeTempRef", {read:iLabel, static: false }) set _lblCalculatedenddatetime(c: iLabel){
  if(c){ this.lblCalculatedenddatetime  = c; }
};
lblCIFValue_MouseLeftButtonUp_Func: Function;
      constructor() {
        super();
         // this.dtpendDate.OnDateValueChanged  = (s,e) => { this.dtpDateTimeGivenText_OnDateChange(s,e); } ;
          this.GetCliniicalIncidentFormConfig();
      }
      ngOnInit(): void {
       // setTimeout(() => {
          this.ChildWindow_Loaded(null,null);
          this.lblCIFValue_MouseLeftButtonUp_Func = (s, e) => { this.lblCIFValue_MouseLeftButtonUp(s) }

       // }, 0);
       
     }
    
      ngAfterViewInit(): void{
           
        }
      public dtpDateTimeGivenText_OnDateChange(sender: Object, e: DateChangedArgs): void {
          if (this.dtpendDate.CurrentDateTime.Equals(DateTime.MinValue)) {
            this.dtpendDate.CurrentDateTime = DateTime.Now.Date;
          }
      }
      public ChildWindow_Loaded(sender: Object, e: RoutedEventArgs): void {
        this.oInfrecVM = this.DataContext;
          this.DataContext.InitFormValuesAfterFormLoad();

          if (this.DataContext != null && this.DataContext.IsEnableStopDose) {
            this.txtdoseadmin.Focus();
          }
          else {
            this.txtvolumeinfused1.Focus();
          }
         

      }
      public cboResNotGiven_SelectionChanged(sender: Object, e: SelectionChangedEventArgs): void {

      }
      GetCliniicalIncidentFormConfig(): void {
          if (ProfileData.ClinicalIncidentConfig != null) {
            this.lblcliniIncFrm.Visibility = Visibility.Visible;
            this.lblcliniIncFrmValue.Visibility = Visibility.Visible;
              if (ProfileData.ClinicalIncidentConfig != null && this.ValidateURL(ProfileData.ClinicalIncidentConfig.Address)) {
                  this.lblcliniIncFrmValue.IsEnabled = true;
              }
              else {
                  this.lblcliniIncFrmValue.IsEnabled = false;
              }
          }
          else {
           //   this.lblcliniIncFrm.VisibilityProperty = Visibility.Collapsed;
            //  this.lblcliniIncFrmValue.Visibility = Visibility.Collapsed;
          }
      }
      public ValidateURL(url: string): boolean {
        let RgxUrl: Regex = new Regex();
        return false;
        //revisit let RgxUrl: Regex = new Regex(@"^(ht|f)tp(s?)\:\/\/[0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*(:(0-9)*)*(\/?)([a-zA-Z0-9\-\.\?\,\'\/\\\+&amp;%\$#_]*)?$");
        // need to confirm with Platform team
        //  return RgxUrl.IsMatch(url);
      }
      
  //     public lblCIFValue_MouseLeftButtonUp(sender: Object, e: MouseButtonEventArgs): void {
  //         if (ProfileData.ClinicalIncidentConfig != null && !String.IsNullOrEmpty(ProfileData.ClinicalIncidentConfig.Address) && this.ValidateURL(ProfileData.ClinicalIncidentConfig.Address))
  //             HtmlPage.Window.Invoke("LaunchClinicalIncidentForm", ProfileData.ClinicalIncidentConfig.Address);
  //     }
  // }
  lblCIFValue_MouseLeftButtonUp(e): void {
    if(ProfileData.ClinicalIncidentConfig != null && !String.IsNullOrEmpty(ProfileData.ClinicalIncidentConfig.Address) && Common.ValidateURL(ProfileData.ClinicalIncidentConfig.Address)) {
        HtmlPage.Window.Invoke("LaunchClinicalIncidentForm", ProfileData.ClinicalIncidentConfig.Address);
    }
}}
function ngOnInit() {
  throw new Error('Function not implemented.');
}

