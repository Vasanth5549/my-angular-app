import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { StringBuilder,ProfileFactoryType,ContextManager,Convert,AppActivity, Regex, ScriptObject} from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp,Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison,AppDialogEventargs, AppDialogResult, DelegateArgs, DialogComponentArgs, WindowButtonType, ObservableCollection, CListItem, HtmlPage, SelectionChangedEventArgs, AppContextInfo, List } from 'epma-platform/models';
import { AppDialog, Border, Grid, iButton, iCheckBox, iComboBox, iLabel, iTextBox, iTimeBox, MouseButtonEventArgs, StackPanel, UserControl } from 'epma-platform/controls';
import { HelperService} from 'epma-platform/soapclient';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
import { InfrecordadminVM } from '../viewmodel/InfrecordadminVM';
import { ObservationChartVM } from '../ca/observationchart/ObservationChartVM';
import { CommonBB } from 'src/app/lorappcommonbb/utilities/common';
import { SelectedUserType, WitnessHelper } from 'src/app/lorappmedicationcommonbb/utilities/witnesshelper';
import { MedAdminViewHelper } from '../utilities/MedAdminViewHelper';
import { MedScanRecAdmVM } from '../viewmodel/MedScanRecAdmVM';
import { Visibility } from 'src/app/shared/epma-platform/controls-model/Visibility';
import { DateChangedArgs, iDateTimePicker } from 'src/app/shared/epma-platform/controls/epma-datetimepicker/epma-datetimepicker.component';
import { RoutedEventArgs } from 'src/app/shared/epma-platform/controls/FrameworkElement';
import { CReqMsgGetUser, CResMsgGetUser, CSecurityManagementServiceWSSoapClient, GetUserCompletedEventArgs } from 'src/app/shared/epma-platform/soap-client/CSecurityManagementServiceWS';
import { AuthResult } from 'src/app/lorappmedicationcommonbb/viewmodel/UserAuthenticateVM';
import { MedChartData } from '../utilities/globalvariable';
import { ProfileData } from '../utilities/ProfileData';
import { CConstants } from '../utilities/CConstants';
import { MedScanRecAdmin } from '../resource/MedScanRecAdmin.Designer';
import { AdministrationDetail } from 'src/app/shared/epma-platform/soap-client/MedicationAdministrationWS';
import { iSFS } from 'src/app/shared/epma-platform/controls/epma-isfs/epma-isfs.component';
import * as ControlStyles from '../../shared/epma-platform/controls/ControlStyles';
import { Resource } from '../resource';
import { InfusionTypeCode } from 'src/app/lorappmedicationcommonbb/utilities/constants';
import { Common } from '../utilities/common';
import { SLSFSItem } from 'src/app/shared/epma-platform/models/model';

@Component({
  selector: 'app-InfRecAdmCSFChangeBag',
  templateUrl: './InfRecAdmCSFChangeBag.html',
  styleUrls: ['./InfRecAdmCSFChangeBag.css'],
})
export class InfRecAdmCSFChangeBag extends UserControl implements OnInit {
  public MedCharOIDBC: number;
  objVm: InfrecordadminVM;
  strLorenzoID: string = String.Empty;
  sAdminReason: string = String.Empty;
  public objObsResultVM: ObservationChartVM;
  MCVersion: string = String.Empty;
  oParam: string = String.Empty;
  private strUserName: string = String.Empty;
  sAdminMethod: string = String.Empty;
  sDrugName: string = String.Empty;
  sObsDrugName: string = String.Empty;
  IdentifyingType: string = String.Empty;
  sDoseUOMLzoID: string = String.Empty;
  strDose: string = String.Empty;
  public objAdminDetail: AdministrationDetail;
  //public delegate void OnRecAdminFinishDelegate();
  sItemType: string = String.Empty;
  CurrentDt: DateTime= CommonBB.GetServerDateTime();
  objWitnessHelper: WitnessHelper;
  oMedAdminViewHelper: MedAdminViewHelper;
  public firsttimefocus: boolean = true;
  private CareproviderOID: number;
  private CareproviderName: string;
  oMedScanRecAdmVM: MedScanRecAdmVM;
  IsRouteChngd: boolean = false;
  lnRouteOID: number = 0;
  private LayoutRoot: Grid;
whiteBorder: string|object= ControlStyles.whiteBorder;
InnerBG: string|object= ControlStyles.InnerBG;
LzoPageBG: any= ControlStyles.LzoPageBG;
 @ViewChild("LayoutRootTempRef", {read:Grid, static: false }) set _LayoutRoot(c: Grid){
      if(c){ this.LayoutRoot  = c; }
  };
  private bgdtotvolumetobeinfused: Border;
  @ViewChild("bgdtotvolumetobeinfusedTempRef", {read:Border, static: false }) set _bgdtotvolumetobeinfused(c: Border){
      if(c){ this.bgdtotvolumetobeinfused  = c; }
  };
  private bgdtotvolumetobeinfusedBlw: Border;
  @ViewChild("bgdtotvolumetobeinfusedBlwTempRef", {read:Border, static: false }) set _bgdtotvolumetobeinfusedBlw(c: Border){
      if(c){ this.bgdtotvolumetobeinfusedBlw  = c; }
  };
  public brdtotvolumetobeinfused: Border;
  @ViewChild("brdtotvolumetobeinfusedTempRef", {read:Border, static: false }) set _brdtotvolumetobeinfused(c: Border){
      if(c){ this.brdtotvolumetobeinfused  = c; }
  };
  public brdtotvolumetobeinfusedBlw: Border;
  @ViewChild("brdtotvolumetobeinfusedBlwTempRef", {read:Border, static: false }) set _brdtotvolumetobeinfusedBlw(c: Border){
      if(c){ this.brdtotvolumetobeinfusedBlw  = c; }
  };
  public lbltotvolumetobeinfused: iLabel;
  @ViewChild("lbltotvolumetobeinfusedTempRef", {read:iLabel, static: false }) set _lbltotvolumetobeinfused(c: iLabel){
      if(c){ this.lbltotvolumetobeinfused  = c; }
  };
  public lbltotvolumetobeinfusedValue: iLabel;
  @ViewChild("lbltotvolumetobeinfusedValueTempRef", {read:iLabel, static: false }) set _lbltotvolumetobeinfusedValue(c: iLabel){
      if(c){ this.lbltotvolumetobeinfusedValue  = c; }
  };
  public bgdCummVolInfused: Border;
  @ViewChild("bgdCummVolInfusedTempRef", {read:Border, static: false }) set _bgdCummVolInfused(c: Border){
      if(c){ this.bgdCummVolInfused  = c; }
  };
  public bgdCummVolInfusedBlw: Border;
  @ViewChild("bgdCummVolInfusedBlwTempRef", {read:Border, static: false }) set _bgdCummVolInfusedBlw(c: Border){
      if(c){ this.bgdCummVolInfusedBlw  = c; }
  };
  public brdCummVolInfused: Border;
  @ViewChild("brdCummVolInfusedTempRef", {read:Border, static: false }) set _brdCummVolInfused(c: Border){
      if(c){ this.brdCummVolInfused  = c; }
  };
  public brdCummVolInfusedBlw: Border;
  @ViewChild("brdCummVolInfusedBlwTempRef", {read:Border, static: false }) set _brdCummVolInfusedBlw(c: Border){
      if(c){ this.brdCummVolInfusedBlw  = c; }
  };
  public lblCummVolInfused: iLabel;
  @ViewChild("lblCummVolInfusedTempRef", {read:iLabel, static: false }) set _lblCummVolInfused(c: iLabel){
      if(c){ this.lblCummVolInfused  = c; }
  };
  public lblCummVolInfusedValue: iLabel;
  @ViewChild("lblCummVolInfusedValueTempRef", {read:iLabel, static: false }) set _lblCummVolInfusedValue(c: iLabel){
      if(c){ this.lblCummVolInfusedValue  = c; }
  };
  public brdpreviousbag: Border;
  @ViewChild("brdpreviousbagTempRef", {read:Border, static: false }) set _brdpreviousbag(c: Border){
      if(c){ this.brdpreviousbag  = c; }
  };
  public lblBorderprebag: iLabel;
  @ViewChild("lblBorderprebagTempRef", {read:iLabel, static: false }) set _lblBorderprebag(c: iLabel){
      if(c){ this.lblBorderprebag  = c; }
  };
  public grdpreviousbag: Grid;
  @ViewChild("grdpreviousbagTempRef", {read:Grid, static: false }) set _grdpreviousbag(c: Grid){
      if(c){ this.grdpreviousbag  = c; }
  };
  public bgdvolumeinfus: Border;
  @ViewChild("bgdvolumeinfusTempRef", {read:Border, static: false }) set _bgdvolumeinfus(c: Border){
      if(c){ this.bgdvolumeinfus  = c; }
  };
  public bgdwastage: Border;
  @ViewChild("bgdwastageTempRef", {read:Border, static: false }) set _bgdwastage(c: Border){
      if(c){ this.bgdwastage  = c; }
  };
  public bgdBagVolume: Border;
  @ViewChild("bgdBagVolumeTempRef", {read:Border, static: false }) set _bgdBagVolume(c: Border){
      if(c){ this.bgdBagVolume  = c; }
  };
  public bgd: Border;
  @ViewChild("bgdTempRef", {read:Border, static: false }) set _bgd(c: Border){
      if(c){ this.bgd  = c; }
  };
  public brdwastage: Border;
  @ViewChild("brdwastageTempRef", {read:Border, static: false }) set _brdwastage(c: Border){
      if(c){ this.brdwastage  = c; }
  };
  public brdBagVolume: Border;
  @ViewChild("brdBagVolumeTempRef", {read:Border, static: false }) set _brdBagVolume(c: Border){
      if(c){ this.brdBagVolume  = c; }
  };
  public brdPrev: Border;
  @ViewChild("brdPrevTempRef", {read:Border, static: false }) set _brdPrev(c: Border){
      if(c){ this.brdPrev  = c; }
  };
  public lblvolumeinfused1: iLabel;
  @ViewChild("lblvolumeinfused1TempRef", {read:iLabel, static: false }) set _lblvolumeinfused1(c: iLabel){
      if(c){ this.lblvolumeinfused1  = c; }
  };
  public txtvolumeinfused1: iTextBox;
  @ViewChild("txtvolumeinfused1TempRef", {read:iTextBox, static: false }) set _txtvolumeinfused1(c: iTextBox){
      if(c){ this.txtvolumeinfused1  = c; }
  };
  public lbluom2: iLabel;
  @ViewChild("lbluom2TempRef", {read:iLabel, static: false }) set _lbluom2(c: iLabel){
      if(c){ this.lbluom2  = c; }
  };
  public cboUoM1: iComboBox;
  @ViewChild("cboUoM1TempRef", {read:iComboBox, static: false }) set _cboUoM1(c: iComboBox){
      if(c){ this.cboUoM1  = c; }
  };
  public lblwastage: iLabel;
  @ViewChild("lblwastageTempRef", {read:iLabel, static: false }) set _lblwastage(c: iLabel){
      if(c){ this.lblwastage  = c; }
  };
  public stackwastage: StackPanel;
  @ViewChild("stackwastageTempRef", {read:StackPanel, static: false }) set _stackwastage(c: StackPanel){
      if(c){ this.stackwastage  = c; }
  };
  public txtwastage: iTextBox;
  @ViewChild("txtwastageTempRef", {read:iTextBox, static: false }) set _txtwastage(c: iTextBox){
      if(c){ this.txtwastage  = c; }
  };
  public lblwastageUOM: iLabel;
  @ViewChild("lblwastageUOMTempRef", {read:iLabel, static: false }) set _lblwastageUOM(c: iLabel){
      if(c){ this.lblwastageUOM  = c; }
  };
  public CbowastageUOM: iComboBox;
  @ViewChild("CbowastageUOMTempRef", {read:iComboBox, static: false }) set _CbowastageUOM(c: iComboBox){
      if(c){ this.CbowastageUOM  = c; }
  };
  public lblBagVolume: iLabel;
  @ViewChild("lblBagVolumeTempRef", {read:iLabel, static: false }) set _lblBagVolume(c: iLabel){
      if(c){ this.lblBagVolume  = c; }
  };
  public lblBagVolumeValue: iLabel;
  @ViewChild("lblBagVolumeValueTempRef", {read:iLabel, static: false }) set _lblBagVolumeValue(c: iLabel){
      if(c){ this.lblBagVolumeValue  = c; }
  };
  public bgdenddatetime: Border;
  @ViewChild("bgdenddatetimeTempRef", {read:Border, static: false }) set _bgdenddatetime(c: Border){
      if(c){ this.bgdenddatetime  = c; }
  };
  public bgdEstVolInfusedInProg: Border;
  @ViewChild("bgdEstVolInfusedInProgTempRef", {read:Border, static: false }) set _bgdEstVolInfusedInProg(c: Border){
      if(c){ this.bgdEstVolInfusedInProg  = c; }
  };
  public brdenddatetime: Border;
  @ViewChild("brdenddatetimeTempRef", {read:Border, static: false }) set _brdenddatetime(c: Border){
      if(c){ this.brdenddatetime  = c; }
  };
  public brdEstVolInfusedInProg: Border;
  @ViewChild("brdEstVolInfusedInProgTempRef", {read:Border, static: false }) set _brdEstVolInfusedInProg(c: Border){
      if(c){ this.brdEstVolInfusedInProg  = c; }
  };
  public lblendDateTime1: iLabel;
  @ViewChild("lblendDateTime1TempRef", {read:iLabel, static: false }) set _lblendDateTime1(c: iLabel){
      if(c){ this.lblendDateTime1  = c; }
  };
  public dtpendDateChngBag: iDateTimePicker;
  @ViewChild("dtpendDateChngBagTempRef", {read:iDateTimePicker, static: false }) set _dtpendDateChngBag(c: iDateTimePicker){
      if(c){ this.dtpendDateChngBag  = c; }
  };
  public iTimedendTime: iTimeBox;
  @ViewChild("iTimedendTimeTempRef", {read:iTimeBox, static: false }) set _iTimedendTime(c: iTimeBox){
      if(c){ this.iTimedendTime  = c; }
  };
  public lblEstVolInfusedInProg: iLabel;
  @ViewChild("lblEstVolInfusedInProgTempRef", {read:iLabel, static: false }) set _lblEstVolInfusedInProg(c: iLabel){
      if(c){ this.lblEstVolInfusedInProg  = c; }
  };
  public lblEstVolInfusedInProgValue: iLabel;
  @ViewChild("lblEstVolInfusedInProgValueTempRef", {read:iLabel, static: false }) set _lblEstVolInfusedInProgValue(c: iLabel){
      if(c){ this.lblEstVolInfusedInProgValue  = c; }
  };
  public lblInfusionPeriodReachedAlert: iLabel;
  @ViewChild("lblInfusionPeriodReachedAlertTempRef", {read:iLabel, static: false }) set _lblInfusionPeriodReachedAlert(c: iLabel){
      if(c){ this.lblInfusionPeriodReachedAlert  = c; }
  };
  public lblVolExceedsPresVolAlert: iLabel;
  @ViewChild("lblVolExceedsPresVolAlertTempRef", {read:iLabel, static: false }) set _lblVolExceedsPresVolAlert(c: iLabel){
      if(c){ this.lblVolExceedsPresVolAlert  = c; }
  };
  public brdnextbag: Border;
  @ViewChild("brdnextbagTempRef", {read:Border, static: false }) set _brdnextbag(c: Border){
      if(c){ this.brdnextbag  = c; }
  };
  public nextborder: Border;
  @ViewChild("nextborderTempRef", {read:Border, static: false }) set _nextborder(c: Border){
      if(c){ this.nextborder  = c; }
  };
  public lblBordernextbag: iLabel;
  @ViewChild("lblBordernextbagTempRef", {read:iLabel, static: false }) set _lblBordernextbag(c: iLabel){
      if(c){ this.lblBordernextbag  = c; }
  };
  public grdnotgiven: Grid;
  @ViewChild("grdnotgivenTempRef", {read:Grid, static: false }) set _grdnotgiven(c: Grid){
      if(c){ this.grdnotgiven  = c; }
  };
  public bgddose: Border;
  @ViewChild("bgddoseTempRef", {read:Border, static: false }) set _bgddose(c: Border){
      if(c){ this.bgddose  = c; }
  };
  public bgdroute: Border;
  @ViewChild("bgdrouteTempRef", {read:Border, static: false }) set _bgdroute(c: Border){
      if(c){ this.bgdroute  = c; }
  };
  public bgdconcentration: Border;
  @ViewChild("bgdconcentrationTempRef", {read:Border, static: false }) set _bgdconcentration(c: Border){
      if(c){ this.bgdconcentration  = c; }
  };
  public bgdinfusiondose: Border;
  @ViewChild("bgdinfusiondoseTempRef", {read:Border, static: false }) set _bgdinfusiondose(c: Border){
      if(c){ this.bgdinfusiondose  = c; }
  };
  public bgdinfusionrate: Border;
  @ViewChild("bgdinfusionrateTempRef", {read:Border, static: false }) set _bgdinfusionrate(c: Border){
      if(c){ this.bgdinfusionrate  = c; }
  };
  public bgddripdate: Border;
  @ViewChild("bgddripdateTempRef", {read:Border, static: false }) set _bgddripdate(c: Border){
      if(c){ this.bgddripdate  = c; }
  };
  public bgdbagvoume: Border;
  @ViewChild("bgdbagvoumeTempRef", {read:Border, static: false }) set _bgdbagvoume(c: Border){
      if(c){ this.bgdbagvoume  = c; }
  };
  public bgdVolumePndngToInfuse: Border;
  @ViewChild("bgdVolumePndngToInfuseTempRef", {read:Border, static: false }) set _bgdVolumePndngToInfuse(c: Border){
      if(c){ this.bgdVolumePndngToInfuse  = c; }
  };
  public bgdheightfive: Border;
  @ViewChild("bgdheightfiveTempRef", {read:Border, static: false }) set _bgdheightfive(c: Border){
      if(c){ this.bgdheightfive  = c; }
  };
  public brdroute: Border;
  @ViewChild("brdrouteTempRef", {read:Border, static: false }) set _brdroute(c: Border){
      if(c){ this.brdroute  = c; }
  };
  public brdconcentration: Border;
  @ViewChild("brdconcentrationTempRef", {read:Border, static: false }) set _brdconcentration(c: Border){
      if(c){ this.brdconcentration  = c; }
  };
  public brdinfusiondose: Border;
  @ViewChild("brdinfusiondoseTempRef", {read:Border, static: false }) set _brdinfusiondose(c: Border){
      if(c){ this.brdinfusiondose  = c; }
  };
  public brdinfusion: Border;
  @ViewChild("brdinfusionTempRef", {read:Border, static: false }) set _brdinfusion(c: Border){
      if(c){ this.brdinfusion  = c; }
  };
  public brddripdate: Border;
  @ViewChild("brddripdateTempRef", {read:Border, static: false }) set _brddripdate(c: Border){
      if(c){ this.brddripdate  = c; }
  };
  public brdbagvolume: Border;
  @ViewChild("brdbagvolumeTempRef", {read:Border, static: false }) set _brdbagvolume(c: Border){
      if(c){ this.brdbagvolume  = c; }
  };
  public brdVolumePndngToInfuse: Border;
  @ViewChild("brdVolumePndngToInfuseTempRef", {read:Border, static: false }) set _brdVolumePndngToInfuse(c: Border){
      if(c){ this.brdVolumePndngToInfuse  = c; }
  };
  public brd: Border;
  @ViewChild("brdTempRef", {read:Border, static: false }) set _brd(c: Border){
      if(c){ this.brd  = c; }
  };
  public lblDose: iLabel;
  @ViewChild("lblDoseTempRef", {read:iLabel, static: false }) set _lblDose(c: iLabel){
      if(c){ this.lblDose  = c; }
  };
  public txtDoseValue: iTextBox;
  @ViewChild("txtDoseValueTempRef", {read:iTextBox, static: false }) set _txtDoseValue(c: iTextBox){
      if(c){ this.txtDoseValue  = c; }
  };
  public lblDoseUOM: iLabel;
  @ViewChild("lblDoseUOMTempRef", {read:iLabel, static: false }) set _lblDoseUOM(c: iLabel){
      if(c){ this.lblDoseUOM  = c; }
  };
  public lblRoute: iLabel;
  @ViewChild("lblRouteTempRef", {read:iLabel, static: false }) set _lblRoute(c: iLabel){
      if(c){ this.lblRoute  = c; }
  };
  public cboRoute: iComboBox;
  @ViewChild("cboRouteTempRef", {read:iComboBox, static: false }) set _cboRoute(c: iComboBox){
      if(c){ this.cboRoute  = c; }
  };
  public lblConcentration: iLabel;
  @ViewChild("lblConcentrationTempRef", {read:iLabel, static: false }) set _lblConcentration(c: iLabel){
      if(c){ this.lblConcentration  = c; }
  };
  public lblConcentrationvalue: iLabel;
  @ViewChild("lblConcentrationvalueTempRef", {read:iLabel, static: false }) set _lblConcentrationvalue(c: iLabel){
      if(c){ this.lblConcentrationvalue  = c; }
  };
  public txtConStrengthValue: iTextBox;
  @ViewChild("txtConStrengthValueTempRef", {read:iTextBox, static: false }) set _txtConStrengthValue(c: iTextBox){
      if(c){ this.txtConStrengthValue  = c; }
  };
  public cboConStrengthUoMValue: iComboBox;
  @ViewChild("cboConStrengthUoMValueTempRef", {read:iComboBox, static: false }) set _cboConStrengthUoMValue(c: iComboBox){
      if(c){ this.cboConStrengthUoMValue  = c; }
  };
  public lblConPer: iLabel;
  @ViewChild("lblConPerTempRef", {read:iLabel, static: false }) set _lblConPer(c: iLabel){
      if(c){ this.lblConPer  = c; }
  };
  public txtConVolumeValue: iTextBox;
  @ViewChild("txtConVolumeValueTempRef", {read:iTextBox, static: false }) set _txtConVolumeValue(c: iTextBox){
      if(c){ this.txtConVolumeValue  = c; }
  };
  public cboConVolumeUoMValue: iComboBox;
  @ViewChild("cboConVolumeUoMValueTempRef", {read:iComboBox, static: false }) set _cboConVolumeUoMValue(c: iComboBox){
      if(c){ this.cboConVolumeUoMValue  = c; }
  };
  public lblInfusiondose: iLabel;
  @ViewChild("lblInfusiondoseTempRef", {read:iLabel, static: false }) set _lblInfusiondose(c: iLabel){
      if(c){ this.lblInfusiondose  = c; }
  };
  public Infusiondosetext: iTextBox;
  @ViewChild("InfusiondosetextTempRef", {read:iTextBox, static: false }) set _Infusiondosetext(c: iTextBox){
      if(c){ this.Infusiondosetext  = c; }
  };
  public lblInfusiondoseValue: iLabel;
  @ViewChild("lblInfusiondoseValueTempRef", {read:iLabel, static: false }) set _lblInfusiondoseValue(c: iLabel){
      if(c){ this.lblInfusiondoseValue  = c; }
  };
  public lblinfusiontrate: iLabel;
  @ViewChild("lblinfusiontrateTempRef", {read:iLabel, static: false }) set _lblinfusiontrate(c: iLabel){
      if(c){ this.lblinfusiontrate  = c; }
  };
  public txtinfusionrate: iTextBox;
  @ViewChild("txtinfusionrateTempRef", {read:iTextBox, static: false }) set _txtinfusionrate(c: iTextBox){
      if(c){ this.txtinfusionrate  = c; }
  };
  public lblrateValue: iLabel;
  @ViewChild("lblrateValueTempRef", {read:iLabel, static: false }) set _lblrateValue(c: iLabel){
      if(c){ this.lblrateValue  = c; }
  };
  public lbldriprate: iLabel;
  @ViewChild("lbldriprateTempRef", {read:iLabel, static: false }) set _lbldriprate(c: iLabel){
      if(c){ this.lbldriprate  = c; }
  };
  public cmdDoseCal: iButton;
  @ViewChild("cmdDoseCalTempRef", {read:iButton, static: false }) set _cmdDoseCal(c: iButton){
      if(c){ this.cmdDoseCal  = c; }
  };
  public Driprate: iTextBox;
  @ViewChild("DriprateTempRef", {read:iTextBox, static: false }) set _Driprate(c: iTextBox){
      if(c){ this.Driprate  = c; }
  };
  public lbdriprateValue: iLabel;
  @ViewChild("lbdriprateValueTempRef", {read:iLabel, static: false }) set _lbdriprateValue(c: iLabel){
      if(c){ this.lbdriprateValue  = c; }
  };
  public lblbagvolume: iLabel;
  @ViewChild("lblbagvolumeTempRef", {read:iLabel, static: false }) set _lblbagvolume(c: iLabel){
      if(c){ this.lblbagvolume  = c; }
  };
  public bagvolumetext: iTextBox;
  @ViewChild("bagvolumetextTempRef", {read:iTextBox, static: false }) set _bagvolumetext(c: iTextBox){
      if(c){ this.bagvolumetext  = c; }
  };
  public lbluom: iLabel;
  @ViewChild("lbluomTempRef", {read:iLabel, static: false }) set _lbluom(c: iLabel){
      if(c){ this.lbluom  = c; }
  };
  public cboDoseUoMValue: iComboBox;
  @ViewChild("cboDoseUoMValueTempRef", {read:iComboBox, static: false }) set _cboDoseUoMValue(c: iComboBox){
      if(c){ this.cboDoseUoMValue  = c; }
  };
  public lblVolPndngToInfuse: iLabel;
  @ViewChild("lblVolPndngToInfuseTempRef", {read:iLabel, static: false }) set _lblVolPndngToInfuse(c: iLabel){
      if(c){ this.lblVolPndngToInfuse  = c; }
  };
  public VolumePendingToInfuse: iLabel;
  @ViewChild("VolumePendingToInfuseTempRef", {read:iLabel, static: false }) set _VolumePendingToInfuse(c: iLabel){
      if(c){ this.VolumePendingToInfuse  = c; }
  };
  public bgdexpdate: Border;
  @ViewChild("bgdexpdateTempRef", {read:Border, static: false }) set _bgdexpdate(c: Border){
      if(c){ this.bgdexpdate  = c; }
  };
  public bgdbatchno: Border;
  @ViewChild("bgdbatchnoTempRef", {read:Border, static: false }) set _bgdbatchno(c: Border){
      if(c){ this.bgdbatchno  = c; }
  };
  public bgddatedate: Border;
  @ViewChild("bgddatedateTempRef", {read:Border, static: false }) set _bgddatedate(c: Border){
      if(c){ this.bgddatedate  = c; }
  };
  public bgdadminby: Border;
  @ViewChild("bgdadminbyTempRef", {read:Border, static: false }) set _bgdadminby(c: Border){
      if(c){ this.bgdadminby  = c; }
  };
  public bgdchecknowitby: Border;
  @ViewChild("bgdchecknowitbyTempRef", {read:Border, static: false }) set _bgdchecknowitby(c: Border){
      if(c){ this.bgdchecknowitby  = c; }
  };
  public bgdwitby: Border;
  @ViewChild("bgdwitbyTempRef", {read:Border, static: false }) set _bgdwitby(c: Border){
      if(c){ this.bgdwitby  = c; }
  };
  public bgd1: Border;
  @ViewChild("bgd1TempRef", {read:Border, static: false }) set _bgd1(c: Border){
      if(c){ this.bgd1  = c; }
  };
  public bgdfive: Border;
  @ViewChild("bgdfiveTempRef", {read:Border, static: false }) set _bgdfive(c: Border){
      if(c){ this.bgdfive  = c; }
  };
  public brdbatchnumber: Border;
  @ViewChild("brdbatchnumberTempRef", {read:Border, static: false }) set _brdbatchnumber(c: Border){
      if(c){ this.brdbatchnumber  = c; }
  };
  public brddatedate: Border;
  @ViewChild("brddatedateTempRef", {read:Border, static: false }) set _brddatedate(c: Border){
      if(c){ this.brddatedate  = c; }
  };
  public brdadminby: Border;
  @ViewChild("brdadminbyTempRef", {read:Border, static: false }) set _brdadminby(c: Border){
      if(c){ this.brdadminby  = c; }
  };
  public brdcom: Border;
  @ViewChild("brdcomTempRef", {read:Border, static: false }) set _brdcom(c: Border){
      if(c){ this.brdcom  = c; }
  };
  public brdfive: Border;
  @ViewChild("brdfiveTempRef", {read:Border, static: false }) set _brdfive(c: Border){
      if(c){ this.brdfive  = c; }
  };
  public lblExpiryDate: iLabel;
  @ViewChild("lblExpiryDateTempRef", {read:iLabel, static: false }) set _lblExpiryDate(c: iLabel){
      if(c){ this.lblExpiryDate  = c; }
  };
  public dtpExpiryDate: iDateTimePicker;
  @ViewChild("dtpExpiryDateTempRef", {read:iDateTimePicker, static: false }) set _dtpExpiryDate(c: iDateTimePicker){
      if(c){ this.dtpExpiryDate  = c; }
  };
  public lblBatchNo: iLabel;
  @ViewChild("lblBatchNoTempRef", {read:iLabel, static: false }) set _lblBatchNo(c: iLabel){
      if(c){ this.lblBatchNo  = c; }
  };
  public txtBatchNo: iTextBox;
  @ViewChild("txtBatchNoTempRef", {read:iTextBox, static: false }) set _txtBatchNo(c: iTextBox){
      if(c){ this.txtBatchNo  = c; }
  };
  public lblAdminDateTime: iLabel;
  @ViewChild("lblAdminDateTimeTempRef", {read:iLabel, static: false }) set _lblAdminDateTime(c: iLabel){
      if(c){ this.lblAdminDateTime  = c; }
  };
  public dtpAdminDate: iDateTimePicker;
  @ViewChild("dtpAdminDateTempRef", {read:iDateTimePicker, static: false }) set _dtpAdminDate(c: iDateTimePicker){
      if(c){ this.dtpAdminDate  = c; }
  };
  public iTimedtpAdminTime: iTimeBox;
  @ViewChild("iTimedtpAdminTimeTempRef", {read:iTimeBox, static: false }) set _iTimedtpAdminTime(c: iTimeBox){
      if(c){ this.iTimedtpAdminTime  = c; }
  };
  public lblAdministeredby: iLabel;
  @ViewChild("lblAdministeredbyTempRef", {read:iLabel, static: false }) set _lblAdministeredby(c: iLabel){
      if(c){ this.lblAdministeredby  = c; }
  };
  public sfsAdministeredby: iSFS =new iSFS();
  @ViewChild("sfsAdministeredbyTempRef", {read:iSFS, static: false }) set _sfsAdministeredby(c: iSFS){
      if (c) {
      this.sfsAdministeredby = c;
          this.sfsAdministeredby.ItemsSource = new ObservableCollection<CListItem>();
  
      }
  };
  public lblNoWitness1: iLabel;
  @ViewChild("lblNoWitness1TempRef", {read:iLabel, static: false }) set _lblNoWitness1(c: iLabel){
      if(c){ this.lblNoWitness1  = c; }
  };
  public chkNoWitness: iCheckBox;
  @ViewChild("chkNoWitnessTempRef", {read:iCheckBox, static: false }) set _chkNoWitness(c: iCheckBox){
      if(c){ this.chkNoWitness  = c; }
  };
  public lblWitnessedBy: iLabel;
  @ViewChild("lblWitnessedByTempRef", {read:iLabel, static: false }) set _lblWitnessedBy(c: iLabel){
      if(c){ this.lblWitnessedBy  = c; 
    
    }
  };
  public sfsWitnessedby: iSFS =  new iSFS();
  @ViewChild("sfsWitnessedbyTempRef", {read:iSFS, static: false }) set _sfsWitnessedby(c: iSFS){
      if(c){ this.sfsWitnessedby  = c;
        this.sfsWitnessedby.ItemsSource = new ObservableCollection<CListItem>();

    }
  };
  public lblComments1: iLabel;
  @ViewChild("lblComments1TempRef", {read:iLabel, static: false }) set _lblComments1(c: iLabel){
      if(c){ this.lblComments1  = c; }
  };
  public txtAdminComments: iTextBox;
  @ViewChild("txtAdminCommentsTempRef", {read:iTextBox, static: false }) set _txtAdminComments(c: iTextBox){
      if(c){ this.txtAdminComments  = c; }
  };
  public lblcliniIncFrm: iLabel;
  @ViewChild("lblcliniIncFrmTempRef", {read:iLabel, static: false }) set _lblcliniIncFrm(c: iLabel){
      if(c){ this.lblcliniIncFrm  = c; }
  };
  public lblcliniIncFrmValue: iLabel;
  @ViewChild("lblcliniIncFrmValueTempRef", {read:iLabel, static: false }) set _lblcliniIncFrmValue(c: iLabel){
      if(c){ this.lblcliniIncFrmValue  = c; }
  };

  public objRecordAdmin = Resource.MedicationAdministrator;
  public objOmitSlots = Resource.MedsAdminOmitSlots;
  override _DataContext: InfrecordadminVM ;
  lblCIFValue_MouseLeftButtonUp_Func: Function;
  // override _DataContext: InfrecordadminVM;
  override get DataContext() {
    //console.log(this._DataContext);
    return this._DataContext;
  }
  @Input() override set DataContext(value: InfrecordadminVM) {
    this._DataContext = value;
  }
  constructor(objInfRecoVM?: InfrecordadminVM) {
    super();
    //InitializeComponent();
   // this.objVm = objInfRecoVM;
     
     //  this.objVm = this.DataContext;
  }
  SetAdministeredbySFS(): void {
    if(this.objVm != null && this.objVm != null) {
        var oSelectedItems: ObservableCollection<CListItem> = new ObservableCollection<CListItem>();
        var oItem: CListItem = new CListItem();
        oItem.DisplayText = this.sfsAdministeredby.SelectedText;
        oItem.Value = this.sfsAdministeredby.SelectedValue;
        oSelectedItems.Add(oItem);
        if (this.sfsAdministeredby.ItemsSource == null) 
        this.sfsAdministeredby.ItemsSource = new ObservableCollection<CListItem>();
        var lstItems: List<SLSFSItem> = new List<SLSFSItem>();
        lstItems.Add(ObjectHelper.CreateObject(new SLSFSItem(), { DisplayText: this.sfsAdministeredby.SelectedText, DisplayValue: this.sfsAdministeredby.SelectedValue, Sfskey: this.sfsAdministeredby.SelectedValue, Sfstype: "cp" }));
       
        this.sfsAdministeredby.AddSFSItems(lstItems);
     this.objVm.AdministeredByList = oSelectedItems;
    }
}
  ngAfterViewInit(): void {
      this.dtpExpiryDate.PromptOutOfRange = false;
      this.dtpendDateChngBag.OnDateValueChanged = (s, e) => {
          this.dtpDateTimeGivenText_OnDateChange(s, e);
      };
      this.dtpAdminDate.OnDateValueChanged = (s, e) => {
          this.dtpAdminDate_OnDateChange(s, e);
      };
     
       this.sfsAdministeredby.OnGetItems  = (s,e) => { this.sfsAdministeredby_OnGetItems(s,e); } ;
        this.sfsWitnessedby.OnGetItems  = (s,e) => { this.sfsWitnessedby_OnGetItems(s,e); } ;
       this.SetAdministeredbySFS();
       this.sfsAdministeredby.ItemsSource = new ObservableCollection<CListItem>();
  //     this.sfsWitnessedby.ItemsSource = new ObservableCollection<CListItem>();
       if(!this.objVm.isWitnessBySelected)
       {this.sfsWitnessedby.SelectedText=null;}
      this.ChildWindow_Loaded(null,null)


  }
  ngOnInit(): void {
    this.objVm = this.DataContext;
       this.objVm.BackgrdInfRateVisi = Visibility.Visible;
       this.lblCIFValue_MouseLeftButtonUp_Func = (s, e) => { this.lblCIFValue_MouseLeftButtonUp(s) }
     setTimeout(() => {
         this.objVm.InitFormValuesAfterFormLoad();
    this.objVm.SetExpiryDate(this.dtpExpiryDate);
     this.txtvolumeinfused1.Focus();
      }, 0);
    //this.dtpAdminDate.GotFocus  = (s,e) => { this.DateTimeFocusEvent(s,e); } ;
  }

  // constructor(objInfRecoVM: InfrecordadminVM) {
  //   super();
  //     //InitializeComponent();
  //     this.dtpAdminDate.OnDateValueChanged  = (s,e) => { this.dtpAdminDate_OnDateChange(s,e); } ;
  //     this.dtpendDateChngBag.OnDateValueChanged  = (s,e) => { this.dtpDateTimeGivenText_OnDateChange(s,e); } ;
  //     this.objVm = objInfRecoVM;
  //     this.sfsAdministeredby.OnGetItems  = (s,e) => { this.sfsAdministeredby_OnGetItems(s,e); } ;
  //     this.sfsWitnessedby.OnGetItems  = (s,e) => { this.sfsWitnessedby_OnGetItems(s,e); } ;
  //     this.objVm.BackgrdInfRateVisi = Visibility.Visible;
  //     this.dtpAdminDate.GotFocus  = (s,e) => { this.DateTimeFocusEvent(s,e); } ;
  // }
   dtpDateTimeGivenText_OnDateChange(sender: Object, e: DateChangedArgs): void {
      if (this.dtpendDateChngBag.CurrentDateTime.Equals(DateTime.MinValue)) {
          this.dtpendDateChngBag.CurrentDateTime = DateTime.Now.Date;
      }
      if (this.dtpAdminDate.CurrentDateTime.Equals(DateTime.MinValue)) {
          this.dtpAdminDate.CurrentDateTime = DateTime.Now.Date;
      }
  }
   dtpAdminDate_OnDateChange(sender: Object, e: DateChangedArgs): void {
      if (this.dtpendDateChngBag.CurrentDateTime.Equals(DateTime.MinValue)) {
          this.dtpendDateChngBag.CurrentDateTime = DateTime.Now.Date;
      }
      if (this.dtpAdminDate.CurrentDateTime.Equals(DateTime.MinValue)) {
        this.dtpAdminDate.CurrentDateTime = DateTime.Now.Date;
      }
  }
  DateTimeFocusEvent(sender: Object, e: RoutedEventArgs): void {
      if (sender == this.dtpAdminDate && this.firsttimefocus) {
          this.firsttimefocus = false;
          this.txtvolumeinfused1.Focus();
         // UpdateLayout();
      }
  }
   ChildWindow_Loaded(sender: Object, e: RoutedEventArgs): void {
    this.sfsAdministeredby.GetSFSItems("cp");
     this.sfsWitnessedby.GetSFSItems("cp");
       let objService: CSecurityManagementServiceWSSoapClient = new CSecurityManagementServiceWSSoapClient();
       objService.GetUserCompleted  = (s,e) => { this.objService_GetUserCompleted(s,e); } ;
       let objReq: CReqMsgGetUser = new CReqMsgGetUser();
       objReq.oContextInformation = CommonBB.FillContext();
       objReq.lUserOIDBC = Convert.ToInt64(AppContextInfo.UserOID);
       objService.GetUserAsync(objReq);
      this.objVm.OnWitnessUserSelected  = (s) => { this.ValidateUser(s); } ;
   // this.objVm.InitFormValuesAfterFormLoad();
    // this.objVm.SetExpiryDate(this.dtpExpiryDate);
    // this.txtvolumeinfused1.Focus();
  }
  private ValidateUser(_SelectedUserType: SelectedUserType): void {
      let _MsgResxKey: string;
      if (_SelectedUserType == SelectedUserType.WitnessingUser) {
          _MsgResxKey = "WitnessAdminBy_Message";
      }
      else {
          _MsgResxKey = "AdminByWitness_Message";
      }
      if (this.objWitnessHelper == null) {
          this.objWitnessHelper = new WitnessHelper();
      }
    let _Callfinish = (s,e) => { this.OnUserAuthCompleted(s,e) };
      this.objWitnessHelper.AuthenticateUser(Convert.ToInt64((String.IsNullOrEmpty(this.objVm.AdministeredByOID) ? "0" : this.objVm.AdministeredByOID)), Convert.ToInt64((String.IsNullOrEmpty(this.objVm.WitnessByOID) ? "0" : this.objVm.WitnessByOID)), this.objVm.WitnessBy, _SelectedUserType, _Callfinish, _MsgResxKey);
  }
  public OnUserAuthCompleted(oAuthResult: AuthResult, _SelectedUserType: SelectedUserType): void {
      if (_SelectedUserType == SelectedUserType.WitnessingUser && (oAuthResult == AuthResult.FailedSinceSameUser || oAuthResult == AuthResult.Cancelled)) {
          this.ClearWitnessedBySFS();
      }
      else if (_SelectedUserType == SelectedUserType.AdministeringUser && oAuthResult == AuthResult.FailedSinceSameUser) {
          this.ClearAdminBySFS();
      }
  }
  private ClearWitnessedBySFS(): void {
      if (this.objVm != null && !String.IsNullOrEmpty(this.objVm.WitnessByOID)) {
          this.sfsWitnessedby.ClearAll();
          this.objVm.WitnessByOID = String.Empty;
          this.objVm.WitnessBy = String.Empty;
          this.sfsWitnessedby.Focus();
          this.CareproviderOID = 0;
          this.CareproviderName = String.Empty;
      }
  }
  private ClearAdminBySFS(): void {
      if (this.objVm != null && !String.IsNullOrEmpty(this.objVm.AdministeredByOID)) {
          this.sfsAdministeredby.ClearAll();
          this.objVm.AdministeredByOID = String.Empty;
          this.objVm.AdministeredBy = "";
          this.sfsAdministeredby.Focus();
          this.CareproviderOID = 0;
          this.CareproviderName = String.Empty;
      }
  }
   async sfsAdministeredby_OnSFSOpen(): Promise<void> {
    this.oParam = AppContextInfo.OrganisationName;
    var oSelectedItems: ObservableCollection<CListItem>  = new ObservableCollection<CListItem>();
    var returnValue: ScriptObject = <ScriptObject>(await HtmlPage.Window.InvokeAsync("SFSCareProvider", this.oParam) as ScriptObject);
    if(returnValue != null && returnValue.GetProperty("length") != null) {
       // var nSelectCnt: number = Convert.ToInt32(returnValue.GetProperty("length"));
        var selectedValue: ScriptObject = <ScriptObject>(returnValue.GetProperty("0") as ScriptObject);
        var oItem: CListItem = new CListItem();
        oItem.DisplayText = <string>(selectedValue["SurName"] as string);
        if (!String.IsNullOrEmpty(<string>(selectedValue["ForeName"] as string))) {
            oItem.DisplayText += " ";
            oItem.DisplayText += selectedValue["ForeName"];
        }
        oItem.Value = <string>(selectedValue["OId"] as string);
        oSelectedItems.Add(oItem);
    }

    if(oSelectedItems != null && oSelectedItems.Count > 0) {
        // if (this.objVm.AdministeredByList == null)
        // this.objVm.AdministeredByList = new ObservableCollection<CListItem>();
        Common.AddSelItemIntoSFSQuickList(this.objVm.AdministeredByList, oSelectedItems[0].Value, oSelectedItems[0].DisplayText.Trim(), "cp", this.sfsAdministeredby);
        this.objVm.AdministeredByList = new ObservableCollection<CListItem>(this.objVm.AdministeredByList.OrderBy(oItem => oItem.DisplayText));
        this.objVm.AdministeredBy = oSelectedItems[0].DisplayText.Trim();
        this.objVm.AdministeredByOID = oSelectedItems[0].Value;
        
    }
    
       this.sfsAdministeredby.GetSFSItems("cp");
  }
   sfsAdministeredby_OnGetItems(sender: Object, Result: ObservableCollection<CListItem>): void {
      if (Result != null && Result.Count > 0) {
          if (Result.Where(o => o != null && String.Compare(o.Value, this.objVm.AdministeredByOID) == 0).Count() == 0)
              Result.Add(ObjectHelper.CreateObject(new CListItem(), { DisplayText: this.objVm.AdministeredBy, Value: this.objVm.AdministeredByOID }));
          this.objVm.AdministeredByList = Result;
      }
      if (this.objVm != null && !String.IsNullOrEmpty(this.objVm.AdministeredByOID)) {
          this.objVm._IsSFSValueSetFromOnGetSFSItems = true;
          if (this.objVm.AdministeredByList == null)
              this.objVm.AdministeredByList = new ObservableCollection<CListItem>();
          if (MedChartData.AllowAnyUserForAdministration) {
              let _IsExist: boolean = this.objVm.AdministeredByList.Any(x => x.Value == this.objVm.AdministeredByOID);
              if (!_IsExist) {
                  let oItem: CListItem = new CListItem();
                  oItem.DisplayText = this.objVm.AdministeredBy;
                  oItem.Value = this.objVm.AdministeredByOID;
                  this.objVm.AdministeredByList.Add(oItem);
                 // this.objVm.AdministeredByList = new ObservableCollection<CListItem>(this.objVm.AdministeredByList.OrderBy(oItm => oItm.DisplayText));
           
        
        }
              let sTemp: string = this.objVm.AdministeredByOID;
              this.sfsAdministeredby.SelectedValue = String.Empty;
              this.sfsAdministeredby.SetSelectedItem(ObjectHelper.CreateObject(new CListItem(), { Value: sTemp }));
          }
          else if (!String.IsNullOrEmpty(this.strUserName)) {
              let _IsExist: boolean = this.objVm.AdministeredByList.Any(x => x.Value == AppContextInfo.UserOID);
              if (!_IsExist) {
                  let oItem: CListItem = new CListItem();
                  oItem.DisplayText = this.strUserName;
                  oItem.Value = AppContextInfo.UserOID;
                  this.objVm.AdministeredByList.Add(oItem);
                  this.objVm.AdministeredByList = new ObservableCollection<CListItem>(this.objVm.AdministeredByList.OrderBy(oItm => oItm.DisplayText));
              }
              let sTemp: string = AppContextInfo.UserOID;
              this.sfsAdministeredby.SelectedValue = String.Empty;
              this.sfsAdministeredby.SetSelectedItem(ObjectHelper.CreateObject(new CListItem(), { Value: sTemp }));
          }
          this.sfsAdministeredby.IsEnabled = MedChartData.AllowAnyUserForAdministration;
          this.objVm._IsSFSValueSetFromOnGetSFSItems = false;
      }
  }
  objService_GetUserCompleted(sender: Object, e: GetUserCompletedEventArgs): void {
      if (e.Result != null) {
          let objRes: CResMsgGetUser = e.Result;
          if (objRes != null && objRes.objEnterpriseObject != null && !String.IsNullOrEmpty(objRes.objEnterpriseObject.SurName)) {
              this.strUserName = objRes.objEnterpriseObject.SurName;
              if (!String.IsNullOrEmpty(objRes.objEnterpriseObject.ForeName)) {
                  this.strUserName += " ";
                  this.strUserName += objRes.objEnterpriseObject.ForeName;
              }
              if (this.objVm != null)
                  this.objVm.RecordedBy = this.strUserName;
              if (!MedChartData.AllowAnyUserForAdministration) {
                  let _IsExist: boolean = this.objVm.AdministeredByList.Any(x => x.Value == AppContextInfo.UserOID);
                  if (!_IsExist) {
                      let oItem: CListItem = new CListItem();
                      oItem.DisplayText = this.strUserName != null ? this.strUserName : String.Empty;
                      oItem.Value = AppContextInfo.UserOID;
                      this.objVm.AdministeredByList.Add(oItem);
                      this.objVm.AdministeredByList = new ObservableCollection<CListItem>(this.objVm.AdministeredByList.OrderBy(oItm => oItm.DisplayText));
                  }
                  let sTemp: string = AppContextInfo.UserOID;
                  this.sfsAdministeredby.SelectedValue = String.Empty;
                  this.sfsAdministeredby.SetSelectedItem(ObjectHelper.CreateObject(new CListItem(), { Value: sTemp }));
                  this.sfsAdministeredby.IsEnabled = false;
              }
              this.sfsAdministeredby.IsEnabled = MedChartData.AllowAnyUserForAdministration;
          }
      }
  }
   chkNoWitness_Checked(sender): void {
    if(sender.target.checked)
    {
      this.objVm.IsEnableChngBagWitnessedBy = false;
      this.objVm.WitnessMandatory = false;
      if (!String.IsNullOrEmpty(this.objVm.ClinicalIncidentForm)) {
          this.objVm.lblcliniIncFrm = Visibility.Visible;
      }
      if (ProfileData.ClinicalIncidentConfig != null && this.ValidateURL(ProfileData.ClinicalIncidentConfig.Address)) {
          this.objVm.IsEnablelblcliniIncFrmValue = true;
      }
      else {
          this.objVm.IsEnablelblcliniIncFrmValue = false;
      }
      this.sfsWitnessedby.ClearAll();
      this.objVm.WitnessByOID = String.Empty;
      this.objVm.WitnessBy = String.Empty;
    }
    else
    {
       this.chkNoWitness_Unchecked(null,null); 
    }
  }
   chkNoWitness_Unchecked(sender: Object, e: RoutedEventArgs): void {
      this.objVm.lblcliniIncFrm = Visibility.Collapsed;
      this.objVm.IsEnableChngBagWitnessedBy = true;
      this.objVm.WitnessMandatory = false;
  }
   sfsWitnessedby_OnGetItems(sender: Object, Result: ObservableCollection<CListItem>): void {
      if (this.objVm != null && this.objVm.InfusionAdministrationDetail != null) {
        if (Result.Where(o => o != null && String.Compare(o.Value, this.objVm.WitnessByOID) == 0).Count() == 0){
            if(this.objVm.WitnessBy != null && this.objVm.WitnessByOID != null)
            Result.Add(ObjectHelper.CreateObject(new CListItem(), { DisplayText: this.objVm.WitnessBy, Value: this.objVm.WitnessByOID }));
        }
        this.objVm.WitnessByList = Result;
        if(this.sfsWitnessedby.ItemsSource != null && this.sfsWitnessedby.ItemsSource.Count == 0){
            this.sfsWitnessedby.ItemsSource = this.objVm.WitnessByList;
        }
      }
      if (this.objVm != null && !String.IsNullOrEmpty(this.objVm.WitnessByOID)) {
          this.objVm._IsSFSValueSetFromOnGetSFSItems = true;
          if (this.objVm.WitnessByList == null)
              this.objVm.WitnessByList = new ObservableCollection<CListItem>();
          let _IsExist: boolean = this.objVm.WitnessByList.Any(x => x.Value == this.objVm.WitnessByOID);
          if (!_IsExist) {
              let oItem: CListItem = new CListItem();
              oItem.DisplayText = this.objVm.WitnessBy;
              oItem.Value = this.objVm.WitnessByOID;
              this.objVm.WitnessByList.Add(oItem);
              this.objVm.WitnessByList = new ObservableCollection<CListItem>(this.objVm.WitnessByList.OrderBy(oItm => oItm.DisplayText));
          }
          let sTemp: string = this.objVm.WitnessByOID;
          this.sfsWitnessedby.SelectedValue = String.Empty;
          this.sfsWitnessedby.SetSelectedItem(ObjectHelper.CreateObject(new CListItem(), { Value: sTemp }));
          this.objVm._IsSFSValueSetFromOnGetSFSItems = false;
      }
  }
  async sfsWitnessedby_OnSFSOpen(): Promise<void> {
    this.oParam = AppContextInfo.OrganisationName;
    var oSelectedItems: ObservableCollection<CListItem>  = new ObservableCollection<CListItem>();
    var returnValue: ScriptObject = <ScriptObject>(await HtmlPage.Window.InvokeAsync("SFSCareProvider", this.oParam) as ScriptObject);
    
    if(returnValue != null && returnValue.GetProperty("length") != null) {
      //  var nSelectCnt: number = Convert.ToInt32(returnValue.GetProperty("length"));
        var selectedValue: ScriptObject = <ScriptObject>(returnValue.GetProperty("0") as ScriptObject);
        var oItem: CListItem = new CListItem();
        oItem.DisplayText = <string>(selectedValue["SurName"] as string);
        if (!String.IsNullOrEmpty(<string>(selectedValue["ForeName"] as string))) {
            oItem.DisplayText += " ";
            oItem.DisplayText += selectedValue["ForeName"];
        }
        oItem.Value = <string>(selectedValue["OId"] as string);
        oSelectedItems.Add(oItem);
      //  this.sfsWitnessedby.GetSFSItems("cp");
  }
  if(oSelectedItems != null && oSelectedItems.Count > 0) {
    if (this.objVm.WitnessByList == null)
              this.objVm.WitnessByList = new ObservableCollection<CListItem>();
            Common.AddSelItemIntoSFSQuickList(this.objVm.WitnessByList, oSelectedItems[0].Value, oSelectedItems[0].DisplayText.Trim(), "cp", this.sfsWitnessedby);
            this.objVm.WitnessByList = new ObservableCollection<CListItem>(this.objVm.WitnessByList.OrderBy(oItem => oItem.DisplayText));
            this.objVm.WitnessBy = oSelectedItems[0].DisplayText.Trim();
            this.objVm.WitnessByOID = oSelectedItems[0].Value;
            this.objVm.isWitnessBySelected = true;
           
 }
this.sfsWitnessedby.GetSFSItems("cp");
}
 

  public ValidateURL(url: string): boolean {
      let RgxUrl: RegExp = new RegExp("^(ht|f)tp(s?)\:\/\/[0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*(:(0-9)*)*(\/?)([a-zA-Z0-9\-\.\?\,\'\/\\\+&amp;%\$#_]*)?$");
      return RgxUrl.test(url);
  }
 lblCIFValue_MouseLeftButtonUp(e): void {
    if(ProfileData.ClinicalIncidentConfig != null && !String.IsNullOrEmpty(ProfileData.ClinicalIncidentConfig.Address) && Common.ValidateURL(ProfileData.ClinicalIncidentConfig.Address)) {
        HtmlPage.Window.Invoke("LaunchClinicalIncidentForm", ProfileData.ClinicalIncidentConfig.Address);
    }
}
  private ChildWindow_Unloaded(sender: Object, e: RoutedEventArgs): void {
      this.objVm.OnWitnessUserSelected = null;
  }
  cboRoute_SelectionChanged(): void {
      if (this.objVm != null && this.objVm.SelectedRoute != null && this.objVm.PrescribedRoutes != null && this.objVm.PrescribedRoutes.Count > 1) {
          if (!this.ValidateRouteforScanMeds()) {
              this.lnRouteOID = Convert.ToInt64(this.objVm.SelectedRoute.Value);
          }
          this.IsRouteChngd = false;
      }
  }
  private ValidateRouteforScanMeds(): boolean {
      if (!this.IsRouteChngd && this.objVm.MedScanRecadminDetail != null && this.objVm.MedScanRecadminDetail.oProductDetailsInfo != null && this.objVm.MedScanRecadminDetail.oProductDetailsInfo.Count > 0) {
          let iMsgBox: iMessageBox = ObjectHelper.CreateObject(new iMessageBox(), {
              Title: CConstants.MSGTitleName,
              Message: MedScanRecAdmin.RemoveMed_Msg,
              MessageButton: MessageBoxButton.YesNo,
              IconType: MessageBoxType.Question
          });
          iMsgBox.MessageBoxClose  = (s,e) => { this.RouteChangeMsgBox_YesNo(s,e); } ;
          iMsgBox.Show();
          return true;
      }
      return false;
  }
  RouteChangeMsgBox_YesNo(sender: Object, e: MessageEventArgs): void {
      if (e.MessageBoxResult ==MessageBoxResult.Yes) {
          this.objVm.MedScanRecadminDetail = null;
          this.oMedScanRecAdmVM = null;
          MedChartData.IsMedScanSuccess = false;
          this.lnRouteOID = Convert.ToInt64(this.objVm.SelectedRoute.Value);
          this.objVm.IsBatchenabled = true;
          this.objVm.IsExpiryenabled = true;
      }
      else {
          this.IsRouteChngd = true;
          let tempRoute: CListItem = this.objVm.PrescribedRoutes.Where(c => !String.IsNullOrEmpty(c.Value) && String.Equals(c.Value, Convert.ToString(this.lnRouteOID), StringComparison.InvariantCultureIgnoreCase)).FirstOrDefault();
          this.objVm.SelectedRoute = tempRoute;
      }
  }
}
