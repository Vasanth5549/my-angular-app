import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { StringBuilder,ProfileFactoryType,ContextManager,Convert,AppActivity, ScriptObject} from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp,Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison,AppDialogEventargs, AppDialogResult, DelegateArgs, DialogComponentArgs, WindowButtonType, AppContextInfo, CListItem, ChildWindow, HtmlPage, List, ObservableCollection,  Visibility, SelectionChangedEventArgs } from 'epma-platform/models';
import { AppDialog, Border, Grid, MouseButtonEventArgs, StackPanel, UserControl, iButton, iCheckBox, iComboBox, iDateTimePicker, iLabel, iTextBox, iTimeBox } from 'epma-platform/controls';
import { HelperService} from 'epma-platform/soapclient';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
import { iSFS } from 'src/app/shared/epma-platform/controls/epma-isfs/epma-isfs.component';
import { Busyindicator } from 'src/app/lorappcommonbb/busyindicator';
import { WitnessHelper, SelectedUserType } from 'src/app/lorappmedicationcommonbb/utilities/witnesshelper';
import { AuthResult } from 'src/app/lorappmedicationcommonbb/viewmodel/UserAuthenticateVM';
import { DateChangedArgs } from 'src/app/shared/epma-platform/controls/Control';
import { RoutedEventArgs, Thickness } from 'src/app/shared/epma-platform/controls/FrameworkElement';
import { SLSFSItem } from 'src/app/shared/epma-platform/models/model';
import { CSecurityManagementServiceWSSoapClient, CReqMsgGetUser, GetUserCompletedEventArgs, CResMsgGetUser } from 'src/app/shared/epma-platform/soap-client/CSecurityManagementServiceWS';
import { IPPMAPrescribableDefnWSSoapClient, CReqMsgIsWitnessRequired, WitnessCriteria, IsWitnessRequiredCompletedEventArgs, CResMsgIsWitnessRequired } from 'src/app/shared/epma-platform/soap-client/IPPMAPrescribableDefnWS';
import { AdministrationDetail } from 'src/app/shared/epma-platform/soap-client/MedicationAdministrationWS';
import { ObservationChartVM } from '../ca/observationchart/ObservationChartVM';
import { Resource } from '../resource';
import { MedicationAction, InfusionTypesCode, CConstants } from '../utilities/CConstants';
import { MedAdminViewHelper } from '../utilities/MedAdminViewHelper';
import { ProfileData } from '../utilities/ProfileData';
import { Common } from '../utilities/common';
import { MedChartData } from '../utilities/globalvariable';
import { InfrecordadminVM } from '../viewmodel/InfrecordadminVM';
import { MedScanRecAdmVM } from '../viewmodel/MedScanRecAdmVM';
import { SlotDetailVM } from '../viewmodel/MedicationChartVM';
import { CommonBB } from 'src/app/lorappcommonbb/utilities/common';
import * as PrescribableDefnWS from 'src/app/shared/epma-platform/soap-client/IPPMAPrescribableDefnWS';
import * as ControlStyles from "../../shared/epma-platform/controls/ControlStyles";
import { ResourceManagement } from '../utilities/ResourceManagement';
import { InfRecAdmStrikeThrough } from './InfRecAdmStrikeThrough';
import { InfRecAdmConditionalDose } from './InfRecAdmConditionalDose';
import { PatientContext } from 'src/app/lorappcommonbb/utilities/globalvariable';





  @Component({
    selector: 'InfRecAdmContBegun',
    templateUrl: './InfRecAdmContBegun.html',
    styleUrls: ['./InfRecAdmContBegun.css']
  })
  export class InfRecAdmContBegun extends UserControl implements OnInit {
    
  //   Application = {Current:{IsRunningOutOfBrowser :true}}
   public isBrdrBackgroundVisible = false;
   override _DataContext: any;
   override get DataContext() {
        return this._DataContext;
    }
    @Input()  override  set DataContext(value: any) {
     this._DataContext = value;
    }
    //get public override DataContext : any;
      public MedCharOIDBC: number;
      public Styles = ControlStyles;
      objVm: SlotDetailVM;
      sDoseValUOM: string;
      lnRouteOID: number = 0;
      lstCListItem: List<SLSFSItem> = new List<SLSFSItem>();
      sAdminReason: string = String.Empty;
      public objObsResultVM: ObservationChartVM;
      lnPrescriptionOID: number = 0;
      MCVersion: string = String.Empty;
      oParam: string = String.Empty;
      IdentifyingOID: number = 0;
      public strUserName: string = String.Empty;
      sAdminMethod: string = String.Empty;
      sDrugName: string = String.Empty;
      dtSlotDate: DateTime;
      strComments: string = String.Empty;
      PrescItemStatus: string = String.Empty;
      sObsDrugName: string = String.Empty;
      lnDoseValUOMOID: number = 0;
      IdentifyingType: string = String.Empty;
    //  objMedsAdminUserAuthenticate: MedsAdminUserAuthenticate;
      sDoseUOMLzoID: string = String.Empty;
      strDose: string = String.Empty;
      public oChildWindow: ChildWindow;
      objstrikethrough: InfRecAdmStrikeThrough;
      public objAdminDetail: AdministrationDetail;
      ////public delegate void OnRecAdminFinishDelegate();
      ConditionalChildView: InfRecAdmConditionalDose;
      CurrentDt: DateTime= CommonBB.GetServerDateTime();
      sItemType: string = String.Empty;
      public oInfrecVM: InfrecordadminVM;
      objWitnessHelper: WitnessHelper;
      oMedAdminViewHelper: MedAdminViewHelper;
      public CareproviderOID: number;
      public CareproviderName: string;
      Careproviders: ObservableCollection<CListItem>;
      oMedScanRecAdmVM: MedScanRecAdmVM;
      IsRouteChngd: boolean = false;
      public LayoutRoot: Grid;
      public objRecordAdmin = Resource.MedicationAdministrator;
      public objOmitSlots = Resource.MedsAdminOmitSlots;
      public CondRes = Resource.ConditionalRegime;
      public Resrce = Resource.InfusionChart;
    //  public objRecordAdmin = Resource.ResourceManagement;
    public objInfrecordadminVM: InfrecordadminVM
@ViewChild("LayoutRootTempRef", {read:Grid, static: false }) set _LayoutRoot(c: Grid){
    if(c){ this.LayoutRoot  = c; }
};
public grdnotgiven: Grid;
@ViewChild("grdnotgivenTempRef", {read:Grid, static: false }) set _grdnotgiven(c: Grid){
    if(c){ this.grdnotgiven  = c; }
};
public bgdroute: Border;
@ViewChild("bgdrouteTempRef", {read:Border, static: false }) set _bgdroute(c: Border){
    if(c){ this.bgdroute  = c; }
};
public bgddose: Border;
@ViewChild("bgddoseTempRef", {read:Border, static: false }) set _bgddose(c: Border){
    if(c){ this.bgddose  = c; }
};
public bgdconcentration: Border;
@ViewChild("bgdconcentrationTempRef", {read:Border, static: false }) set _bgdconcentration(c: Border){
    if(c){ this.bgdconcentration  = c; }
};
public bgdinfperiod: Border =new Border();
@ViewChild("bgdinfperiodTempRef", {read:Border, static: false }) set _bgdinfperiod(c: Border){
    if(c){ this.bgdinfperiod  = c; }
};
public bgdinfdose: Border;
@ViewChild("bgdinfdoseTempRef", {read:Border, static: false }) set _bgdinfdose(c: Border){
    if(c){ this.bgdinfdose  = c; }
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
public bgdsite: Border;
@ViewChild("bgdsiteTempRef", {read:Border, static: false }) set _bgdsite(c: Border){
    if(c){ this.bgdsite  = c; }
};
public bgdlumen: Border;
@ViewChild("bgdlumenTempRef", {read:Border, static: false }) set _bgdlumen(c: Border){
    if(c){ this.bgdlumen  = c; }
};
public bgdheightfive: Border;
@ViewChild("bgdheightfiveTempRef", {read:Border, static: false }) set _bgdheightfive(c: Border){
    if(c){ this.bgdheightfive  = c; }
};
public brdroute: Border;
@ViewChild("brdrouteTempRef", {read:Border, static: false }) set _brdroute(c: Border){
    if(c){ this.brdroute  = c; }
};
public brdconcentration: Border =new Border();
@ViewChild("brdconcentrationTempRef", {read:Border, static: false }) set _brdconcentration(c: Border){
    if(c){ this.brdconcentration  = c; }
};
public brdinfperiod: Border = new Border();
@ViewChild("brdinfperiodTempRef", {read:Border, static: false }) set _brdinfperiod(c: Border){
    if(c){ this.brdinfperiod  = c; }
};
public brdinfdose: Border;
@ViewChild("brdinfdoseTempRef", {read:Border, static: false }) set _brdinfdose(c: Border){
    if(c){ this.brdinfdose  = c; }
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
public brdsite: Border;
@ViewChild("brdsiteTempRef", {read:Border, static: false }) set _brdsite(c: Border){
    if(c){ this.brdsite  = c; }
};
public brdlumen: Border;
@ViewChild("brdlumenTempRef", {read:Border, static: false }) set _brdlumen(c: Border){
    if(c){ this.brdlumen  = c; }
};
public brd: Border;
@ViewChild("brdTempRef", {read:Border, static: false }) set _brd(c: Border){
    if(c){ this.brd  = c; }
};
public lblRoute: iLabel;
@ViewChild("lblRouteTempRef", {read:iLabel, static: false }) set _lblRoute(c: iLabel){
    if(c){ this.lblRoute  = c; }
};
public cboRoute: iComboBox;
@ViewChild("cboRouteTempRef", {read:iComboBox, static: false }) set _cboRoute(c: iComboBox){
    if(c){ this.cboRoute  = c; }
};
public lblDose: iLabel = new iLabel();
@ViewChild("lblDoseTempRef", {read:iLabel, static: false }) set _lblDose(c: iLabel){
    if(c){ this.lblDose  = c; }
};
public txtDoseValue: iTextBox;
@ViewChild("txtDoseValueTempRef", {read:iTextBox, static: false }) set _txtDoseValue(c: iTextBox){
    if(c){ this.txtDoseValue  = c; }
};
public lblUOM: iLabel;
@ViewChild("lblUOMTempRef", {read:iLabel, static: false }) set _lblUOM(c: iLabel){
    if(c){ this.lblUOM  = c; }
};
public cboDoseUOM: iComboBox;
@ViewChild("cboDoseUOMTempRef", {read:iComboBox, static: false }) set _cboDoseUOM(c: iComboBox){
    if(c){ this.cboDoseUOM  = c; }
};
public lblDoseUOM: iLabel;
@ViewChild("lblDoseUOMTempRef", {read:iLabel, static: false }) set _lblDoseUOM(c: iLabel){
    if(c){ this.lblDoseUOM  = c; }
};
public cmdCondDoseImg: iButton;
@ViewChild("cmdCondDoseImgTempRef", {read:iButton, static: false }) set _cmdCondDoseImg(c: iButton){
    if(c){ this.cmdCondDoseImg  = c; }
};
public lblDoseValue: iLabel;
@ViewChild("lblDoseValueTempRef", {read:iLabel, static: false }) set _lblDoseValue(c: iLabel){
    if(c){ this.lblDoseValue  = c; }
};
public lblConcentration: iLabel;
@ViewChild("lblConcentrationTempRef", {read:iLabel, static: false }) set _lblConcentration(c: iLabel){
    if(c){ this.lblConcentration  = c; }
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
public lblConcentrationValue: iLabel;
@ViewChild("lblConcentrationValueTempRef", {read:iLabel, static: false }) set _lblConcentrationValue(c: iLabel){
    if(c){ this.lblConcentrationValue  = c; }
};
public lblInfusionperiod: iLabel;
@ViewChild("lblInfusionperiodTempRef", {read:iLabel, static: false }) set _lblInfusionperiod(c: iLabel){
    if(c){ this.lblInfusionperiod  = c; }
};
public Infusionperiodtext: iTextBox;
@ViewChild("InfusionperiodtextTempRef", {read:iTextBox, static: false }) set _Infusionperiodtext(c: iTextBox){
    if(c){ this.Infusionperiodtext  = c; }
};
public lblInfperioduom: iLabel;
@ViewChild("lblInfperioduomTempRef", {read:iLabel, static: false }) set _lblInfperioduom(c: iLabel){
    if(c){ this.lblInfperioduom  = c; }
};
public cboInfusionperiodUoMValue: iComboBox;
@ViewChild("cboInfusionperiodUoMValueTempRef", {read:iComboBox, static: false }) set _cboInfusionperiodUoMValue(c: iComboBox){
    if(c){ this.cboInfusionperiodUoMValue  = c; }
};
public lblInfusiondose: iLabel = new iLabel();
@ViewChild("lblInfusiondoseTempRef", {read:iLabel, static: false }) set _lblInfusiondose(c: iLabel){
    if(c){ this.lblInfusiondose  = c; }
};
public stkInfudose: StackPanel =new StackPanel();
@ViewChild("stkInfudoseTempRef", {read:StackPanel, static: false }) set _stkInfudose(c: StackPanel){
    if(c){ this.stkInfudose  = c; }
};
public Infusiondosetext: iTextBox;
@ViewChild("InfusiondosetextTempRef", {read:iTextBox, static: false }) set _Infusiondosetext(c: iTextBox){
    if(c){ this.Infusiondosetext  = c; }
};
public lblInfusiondoseValue: iLabel;
@ViewChild("lblInfusiondoseValueTempRef", {read:iLabel, static: false }) set _lblInfusiondoseValue(c: iLabel){
    if(c){ this.lblInfusiondoseValue  = c; }
};
public lblinfusiontrate: iLabel = new iLabel();
@ViewChild("lblinfusiontrateTempRef", {read:iLabel, static: false }) set _lblinfusiontrate(c: iLabel){
    if(c){ this.lblinfusiontrate  = c; }
};
public cmdDoseCalInf: iButton = new iButton();
@ViewChild("cmdDoseCalInfTempRef", {read:iButton, static: false }) set _cmdDoseCalInf(c: iButton){
    if(c){ this.cmdDoseCalInf  = c; }
};
public txtinfusionrate: iTextBox;
@ViewChild("txtinfusionrateTempRef", {read:iTextBox, static: false }) set _txtinfusionrate(c: iTextBox){
    if(c){ this.txtinfusionrate  = c; }
};
public lblInfrateuom: iLabel;
@ViewChild("lblInfrateuomTempRef", {read:iLabel, static: false }) set _lblInfrateuom(c: iLabel){
    if(c){ this.lblInfrateuom  = c; }
};
public cboInfusionrateUoMNum: iComboBox;
@ViewChild("cboInfusionrateUoMNumTempRef", {read:iComboBox, static: false }) set _cboInfusionrateUoMNum(c: iComboBox){
    if(c){ this.cboInfusionrateUoMNum  = c; }
};
public lblInfrateper: iLabel;
@ViewChild("lblInfrateperTempRef", {read:iLabel, static: false }) set _lblInfrateper(c: iLabel){
    if(c){ this.lblInfrateper  = c; }
};
public cboInfusionrateUoMDenom: iComboBox;
@ViewChild("cboInfusionrateUoMDenomTempRef", {read:iComboBox, static: false }) set _cboInfusionrateUoMDenom(c: iComboBox){
    if(c){ this.cboInfusionrateUoMDenom  = c; }
};
public cmdCondInfRateImg: iButton;
@ViewChild("cmdCondInfRateImgTempRef", {read:iButton, static: false }) set _cmdCondInfRateImg(c: iButton){
    if(c){ this.cmdCondInfRateImg  = c; }
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
public lblSite: iLabel;
@ViewChild("lblSiteTempRef", {read:iLabel, static: false }) set _lblSite(c: iLabel){
    if(c){ this.lblSite  = c; }
};
public cboSite: iComboBox;
@ViewChild("cboSiteTempRef", {read:iComboBox, static: false }) set _cboSite(c: iComboBox){
    if(c){ this.cboSite  = c; }
};
public lbllumen: iLabel;
@ViewChild("lbllumenTempRef", {read:iLabel, static: false }) set _lbllumen(c: iLabel){
    if(c){ this.lbllumen  = c; }
};
public txtlumen: iTextBox;
@ViewChild("txtlumenTempRef", {read:iTextBox, static: false }) set _txtlumen(c: iTextBox){
    if(c){ this.txtlumen  = c; }
};
public bgdexpdate: Border;
@ViewChild("bgdexpdateTempRef", {read:Border, static: false }) set _bgdexpdate(c: Border){
    if(c){ this.bgdexpdate  = c; }
};
public bgdbatchno: Border;
@ViewChild("bgdbatchnoTempRef", {read:Border, static: false }) set _bgdbatchno(c: Border){
    if(c){ this.bgdbatchno  = c; }
};
public bgddeldevice: Border;
@ViewChild("bgddeldeviceTempRef", {read:Border, static: false }) set _bgddeldevice(c: Border){
    if(c){ this.bgddeldevice  = c; }
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
public brdexpdate: Border;
@ViewChild("brdexpdateTempRef", {read:Border, static: false }) set _brdexpdate(c: Border){
    if(c){ this.brdexpdate  = c; }
};
public brdbatchnumber: Border;
@ViewChild("brdbatchnumberTempRef", {read:Border, static: false }) set _brdbatchnumber(c: Border){
    if(c){ this.brdbatchnumber  = c; }
};
public brddeldevice: Border;
@ViewChild("brddeldeviceTempRef", {read:Border, static: false }) set _brddeldevice(c: Border){
    if(c){ this.brddeldevice  = c; }
};
public brddatedate: Border;
@ViewChild("brddatedateTempRef", {read:Border, static: false }) set _brddatedate(c: Border){
    if(c){ this.brddatedate  = c; }
};
public brdadminby: Border;
@ViewChild("brdadminbyTempRef", {read:Border, static: false }) set _brdadminby(c: Border){
    if(c){ this.brdadminby  = c; }
};
public brdwitby: Border;
@ViewChild("brdwitbyTempRef", {read:Border, static: false }) set _brdwitby(c: Border){
    if(c){ this.brdwitby  = c; }
};
public brdchangedate: Border;
@ViewChild("brdchangedateTempRef", {read:Border, static: false }) set _brdchangedate(c: Border){
    if(c){ this.brdchangedate  = c; }
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
public cboExpiryDate: iDateTimePicker;
@ViewChild("cboExpiryDateTempRef", {read:iDateTimePicker, static: false }) set _cboExpiryDate(c: iDateTimePicker){
    if(c){ this.cboExpiryDate  = c; }
};
public lblBatchNo: iLabel;
@ViewChild("lblBatchNoTempRef", {read:iLabel, static: false }) set _lblBatchNo(c: iLabel){
    if(c){ this.lblBatchNo  = c; }
};
public txtBatchNo: iTextBox;
@ViewChild("txtBatchNoTempRef", {read:iTextBox, static: false }) set _txtBatchNo(c: iTextBox){
    if(c){ this.txtBatchNo  = c; }
};
public lblDeliveryDevice: iLabel;
@ViewChild("lblDeliveryDeviceTempRef", {read:iLabel, static: false }) set _lblDeliveryDevice(c: iLabel){
    if(c){ this.lblDeliveryDevice  = c; }
};
public cboDeliveryDevice: iComboBox;
@ViewChild("cboDeliveryDeviceTempRef", {read:iComboBox, static: false }) set _cboDeliveryDevice(c: iComboBox){
    if(c){ this.cboDeliveryDevice  = c; }
};
public lblAdminDateTime: iLabel;
@ViewChild("lblAdminDateTimeTempRef", {read:iLabel, static: false }) set _lblAdminDateTime(c: iLabel){
    if(c){ this.lblAdminDateTime  = c; }
};
public dtpDateTimeGivenText: iDateTimePicker;
@ViewChild("dtpDateTimeGivenTextTempRef", {read:iDateTimePicker, static: false }) set _dtpDateTimeGivenText(c: iDateTimePicker){
    if(c){ this.dtpDateTimeGivenText  = c; }
};
public timeDateTimeGivenText: iTimeBox;
@ViewChild("timeDateTimeGivenTextTempRef", {read:iTimeBox, static: false }) set _timeDateTimeGivenText(c: iTimeBox){
    if(c){ this.timeDateTimeGivenText  = c; }
};
public lblAdministeredby: iLabel;
@ViewChild("lblAdministeredbyTempRef", {read:iLabel, static: false }) set _lblAdministeredby(c: iLabel){
    if(c){ this.lblAdministeredby  = c; }
};
public sfsAdministeredby: iSFS = new iSFS();
@ViewChild("sfsAdministeredbyTempRef", {read:iSFS, static: false }) set _sfsAdministeredby(c: iSFS){

    if(c){

      this.sfsAdministeredby  = c;
      setTimeout(() => {
//        console.log("Administered.by.sfs.setter.setTimeout",c,c.searchText,this.DataContext?.AdministeredBy)
        if(c.searchText != this.DataContext.AdministeredBy){
          c.searchText = this.DataContext.AdministeredBy;
        }
      }, 0);

    }

};
public lblNoWitness: iLabel;
@ViewChild("lblNoWitnessTempRef", {read:iLabel, static: false }) set _lblNoWitness(c: iLabel){
    if(c){ this.lblNoWitness  = c; }
};
public chkNoWitness: iCheckBox;
@ViewChild("chkNoWitnessTempRef", {read:iCheckBox, static: false }) set _chkNoWitness(c: iCheckBox){
    if(c){ this.chkNoWitness  = c; }
};
public lblWitnessedBy: iLabel;
@ViewChild("lblWitnessedByTempRef", {read:iLabel, static: false }) set _lblWitnessedBy(c: iLabel){
    if(c){ this.lblWitnessedBy  = c; }
};
public sfsWitnessedby: iSFS =  new iSFS();
@ViewChild("sfsWitnessedbyTempRef", {read:iSFS, static: false }) set _sfsWitnessedby(c: iSFS){
    if(c){ this.sfsWitnessedby  = c; }
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
public margin = "0, 35, 0, 0";
lblCIFValue_MouseLeftButtonUp_Func: Function;
//public brdinfusionMargin ="0, 35, 0, 0"

      constructor() {
        //objInfrecordadminVM : InfrecordadminVM
      //  constructor(){
          super();
        //  InitializeComponent();
        this.oInfrecVM = this.DataContext;
      }
      ngOnInit(){
        this.oInfrecVM = this.DataContext;
    this.lblCIFValue_MouseLeftButtonUp_Func = (s, e) => { this.lblCIFValue_MouseLeftButtonUp(s) }
    if (this.oInfrecVM.WitnessByList == null)
    this.oInfrecVM.WitnessByList = new ObservableCollection<CListItem>();
    }
      ngAfterViewInit(): void {
      
        this.cboExpiryDate.PromptOutOfRange = false;
        AppContextInfo.UserOID = ContextManager.Instance['UserOID'].toString();
        AppContextInfo.OrganisationName =  ContextManager.Instance["OrganisationName"].toString();
        AppContextInfo.JobRoleOID = ContextManager.Instance["JobRoleOID"].toString();
        this.cboRoute.SelectionChanged = (s,e)=> this.cbo_SelectionChangedInfRoute(s,e);
        this.oInfrecVM = this.DataContext;
        this.sfsAdministeredby.OnGetItems  = (s,e) => { this.sfsAdministeredby_OnGetItems(s,e) } ;
        this.sfsWitnessedby.OnGetItems  = (s,e) => { this.sfsWitnessedby_OnGetItems(s,e); } ;
        this.ChildWindow_Loaded({},null);
         this.SetAdministeredbySFS();
       //  this.sfsAdministeredby.ItemsSource = new ObservableCollection<CListItem>();
        // this.sfsWitnessedby.ItemsSource = new ObservableCollection<CListItem>();
         this.oInfrecVM.OnInfLastCallBackCompleted  = (s,e) => { this.oInfrecVM_OnInfLastCallBackCompleted(); } ;
          this.dtpDateTimeGivenText.OnDateValueChanged  = (s,e) => { this.dtpDateTimeGivenText_OnDateValueChanged(s,e); } ;
          if (String.Compare(this.oInfrecVM.InfusionAction, MedicationAction.BEGUN) == 0) {
              if (this.oInfrecVM != null && this.oInfrecVM.InfusionType != null && !String.IsNullOrEmpty(this.oInfrecVM.InfusionType.Value) && ProfileData.InfusionPresConfig != null && (String.Compare(this.oInfrecVM.InfusionType.Value, InfusionTypesCode.PCA) == 0)) {
           //   this.IsPCAConcentration = true;
              //  this.IsEnableConcentration = true;
            //  this.rowConcentration = '3'
                this.lblDose.Text = Resource.MedicationAdministrator.lblbolus_text;
                this.lblinfusiontrate.Text = Resource.MedicationAdministrator.lblbkinfusrate_text;
                this.lblinfusiontrate.Width = 70;
              //  this.margin ="0,35,0,0"
                // this.oInfRecAdmContBegun.lblinfusiontrate.AllowDrop = true;
                if (ProfileData.InfusionPresConfig.IsInfusionRatePCA)
                      this.oInfrecVM.BackgrdInfRateVisi = Visibility.Visible;
                  else {
                      if (!String.IsNullOrEmpty(this.oInfrecVM.InfusionRate))
                          this.oInfrecVM.BackgrdInfRateVisi = Visibility.Visible;
                      else this.oInfrecVM.BackgrdInfRateVisi = Visibility.Collapsed;
                  }

              }
              else if(this.oInfrecVM != null && this.oInfrecVM.InfusionType != null && !String.IsNullOrEmpty(this.oInfrecVM.InfusionType.Value) && (String.Compare(this.oInfrecVM.InfusionType.Value, InfusionTypesCode.FLUID) == 0)){
                   this.stkInfudose.Visibility = Visibility.Collapsed;
                   this.lblInfusiondose.Visibility = Visibility.Collapsed;
                   this.bgdinfdose.Visibility =Visibility.Visible;
                   this.bgdinfperiod.Visibility =Visibility.Collapsed;
                   this.brdinfperiod.Visibility = Visibility.Collapsed;
                  this.brdconcentration.Visibility = Visibility.Collapsed;
                   this.bgdconcentration.Visibility = Visibility.Visible;
                   this.bgddose.Visibility = Visibility.Visible;
                  // this.bgdlumen.Visibility = Visibility.Collapsed;
                   this.bgdconcentration.Visibility= Visibility.Visible;
                   this.brdinfusion.Visibility = Visibility.Collapsed;
                   this.bgdinfusionrate.Visibility = Visibility.Collapsed;
                  
                  this.cmdDoseCalInf.Visibility = Visibility.Collapsed;
              }
             else if(this.oInfrecVM != null && this.oInfrecVM.InfusionType != null && !String.IsNullOrEmpty(this.oInfrecVM.InfusionType.Value) && (String.Compare(this.oInfrecVM.InfusionType.Value, InfusionTypesCode.CONTINUOUS) == 0)){
             
                this.brdconcentration.Visibility = Visibility.Collapsed;
                if(this.DataContext.IsBackgrdRouteVisible ==1 && this.DataContext.IsBackgrdConcentrationVisible==1 && this.DataContext.IslblConcentrationValueVisi==1 && this.DataContext.lblConcentrationVisi == 1){
                      this.brdinfperiod.Visibility = Visibility.Collapsed;
                }
             }
             else if (this.oInfrecVM != null && this.oInfrecVM.InfusionType != null && !String.IsNullOrEmpty(this.oInfrecVM.InfusionType.Value) && ProfileData.InfusionPresConfig != null && (String.Compare(this.oInfrecVM.InfusionType.Value, InfusionTypesCode.INTERMITTENT) == 0)) {
                if(this.DataContext.CondDose==0 && this.DataContext.IsDose==0){
                    this.DataContext.IsDoseMandatory = false ;
                    this.DataContext.IsEnableDose = false;
                }
             }

                else {
              //  this.margin ="0,35,0,0"
                  this.oInfrecVM.BackgrdInfRateVisi = Visibility.Visible;
              }
             
          }
          if(this.DataContext.IslblConcentrationValueVisi == 0){
            this.bgdinfperiod.Height = 25;
          }
          if(this.brdfive != null)
          {
            this.brdfive.Visibility = Visibility.Collapsed;
            this.bgdfive.Visibility= Visibility.Collapsed;
          } 
          if(this.DataContext.CondDose==0 && this.DataContext.IsDose==0 ){this.bgddose.Height=41}
          else if (this.DataContext.IslblDoseVisible == 0 && this.DataContext.IsDoseValueVisible == 0) { this.bgddose.Height = 31 }
          this.cbo_SelectionChangedInfRoute(null, {})
      }
      SetAdministeredbySFS(): void {
        if(this.oInfrecVM != null && this.oInfrecVM != null) {
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
         this.oInfrecVM.AdministeredByList = oSelectedItems;
        }
    }
      oInfrecVM_OnInfLastCallBackCompleted(): void {
          this.SetControlFocusOnLoad();
      }
      dtpDateTimeGivenText_OnDateValueChanged(sender: Object, e: DateChangedArgs): void {
        //   if (this.dtpDateTimeGivenText.CurrentDateTime == DateTime.MinValue)
        if (DateTime.Equals(this.dtpDateTimeGivenText.CurrentDateTime , DateTime.MinValue)) {
              this.dtpDateTimeGivenText.CurrentDateTime = this.oInfrecVM.SlotDate;
          }
      }
      public ChildWindow_Loaded(sender: Object, e: RoutedEventArgs): void {
          this.sfsAdministeredby.GetSFSItems("cp");
          this.sfsWitnessedby.GetSFSItems("cp");
          let objService: CSecurityManagementServiceWSSoapClient = new CSecurityManagementServiceWSSoapClient();
          objService.GetUserCompleted  = (s,e) => { this.objService_GetUserCompleted(s,e); } ;
          let objReq: CReqMsgGetUser = new CReqMsgGetUser();
          objReq.oContextInformation = CommonBB.FillContext();
          objReq.lUserOIDBC = Convert.ToInt64(AppContextInfo.UserOID);
          objService.GetUserAsync(objReq);
          this.oInfrecVM.OnWitnessUserSelected  = (s,e) => { this.ValidateUser(s); } ;
          this.oInfrecVM.InitFormValuesAfterFormLoad();
          this.oInfrecVM.SetExpiryDate(this.cboExpiryDate);
          Busyindicator.SetStatusIdle("MedChart");
      }
      public ValidateUser(_SelectedUserType: SelectedUserType): void {
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
         this.objWitnessHelper.AuthenticateUser(Convert.ToInt64((String.IsNullOrEmpty(this.oInfrecVM.AdministeredByOID) ? "0" : this.oInfrecVM.AdministeredByOID)), Convert.ToInt64((String.IsNullOrEmpty(this.oInfrecVM.WitnessByOID) ? "0" : this.oInfrecVM.WitnessByOID)), this.oInfrecVM.WitnessBy, _SelectedUserType, _Callfinish, _MsgResxKey);
      }
      public OnUserAuthCompleted(oAuthResult: AuthResult, _SelectedUserType: SelectedUserType): void {
          if (_SelectedUserType == SelectedUserType.WitnessingUser && (oAuthResult == AuthResult.FailedSinceSameUser || oAuthResult == AuthResult.Cancelled)) {
             this.ClearWitnessedBySFS();
          }
          else if (_SelectedUserType == SelectedUserType.AdministeringUser && oAuthResult == AuthResult.FailedSinceSameUser) {
           
            this.ClearAdminBySFS();
          }
      }
      public ClearWitnessedBySFS(): void {
          if (this.oInfrecVM != null && !String.IsNullOrEmpty(this.oInfrecVM.WitnessByOID)) {
              this.sfsWitnessedby.ClearAll();
              this.oInfrecVM.WitnessByOID = "";
              this.oInfrecVM.WitnessBy = "";
              this.sfsWitnessedby.Focus();
              this.CareproviderOID = 0;
              this.CareproviderName = String.Empty;
          }
      }
      public ClearAdminBySFS(): void {
          if (this.oInfrecVM != null && !String.IsNullOrEmpty(this.oInfrecVM.AdministeredByOID)) {
              this.sfsAdministeredby.ClearAll();
              this.oInfrecVM.AdministeredByOID = String.Empty;
              this.oInfrecVM.AdministeredBy = "";
              this.sfsAdministeredby.Focus();
              this.CareproviderOID = 0;
              this.CareproviderName = String.Empty;
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
                  if (this.oInfrecVM != null)
                      this.oInfrecVM.RecordedBy = this.strUserName;
                      
                if (this.oInfrecVM.AdministeredByList == null){
                    this.oInfrecVM.AdministeredByList = new ObservableCollection<CListItem>();
                }
                
                   
                  if (!MedChartData.AllowAnyUserForAdministration) {
                      let _IsExist: boolean = this.oInfrecVM.AdministeredByList.Any(x => x.Value == AppContextInfo.UserOID);
                      if (!_IsExist) {
                          let oItem: CListItem = new CListItem();
                          oItem.DisplayText = this.strUserName != null ? this.strUserName : String.Empty;
                          oItem.Value = AppContextInfo.UserOID;
                          this.oInfrecVM.AdministeredByList.Add(oItem);
                          this.oInfrecVM.AdministeredByList = new ObservableCollection<CListItem>(this.oInfrecVM.AdministeredByList.OrderBy(oItm => oItm.DisplayText));
                      }
                      let sTemp: string = AppContextInfo.UserOID;
                      this.sfsAdministeredby.SelectedValue = String.Empty;
                      this.sfsAdministeredby.SetSelectedItem(ObjectHelper.CreateObject(new CListItem(), { Value: sTemp }));
                      this.sfsAdministeredby.IsEnabled = false;
                  }
                 
                  this.sfsAdministeredby.IsEnabled = MedChartData.AllowAnyUserForAdministration;

              }
              if(this.sfsAdministeredby.SelectedValue == null ||  this.sfsAdministeredby.SelectedValue == "")
              {
                if(this.oInfrecVM.AdministeredByList.Any(x => x.Value == AppContextInfo.UserOID))
                    this.sfsAdministeredby.SetSelectedItem(this.oInfrecVM.AdministeredByList.First());
              }
          }
          this.SetControlFocusOnLoad();
      }
      public SetControlFocusOnLoad(): void {
         // if (!this.Application.Current.IsRunningOutOfBrowser)
              //HtmlPage.Plugin.Focus();
          if (this.oInfrecVM.IsEnableDose) {
              this.txtDoseValue.UpdateLayout();
              this.txtDoseValue.Focus();
               this.txtDoseValue.UpdateLayout();
               this.txtDoseValue.Focus();
          }
          else {
              this.txtinfusionrate.UpdateLayout();
              this.txtinfusionrate.Focus();
               this.txtDoseValue.UpdateLayout();
               this.txtDoseValue.Focus();
          }
      }
      public sfsAdministeredby_OnGetItems(sender: any, Result: ObservableCollection<CListItem>): void {
          if (Result != null) {
              this.oInfrecVM.AdministeredByList = Result;
          }
          if (this.oInfrecVM && !String.IsNullOrEmpty(this.oInfrecVM.AdministeredByOID)) {
              this.oInfrecVM._IsSFSValueSetFromOnGetSFSItems = true;
              if (this.oInfrecVM.AdministeredByList == null)
                  this.oInfrecVM.AdministeredByList = new ObservableCollection<CListItem>();
              if (MedChartData.AllowAnyUserForAdministration) {
                  let _IsExist: boolean = this.oInfrecVM.AdministeredByList.Any(x => x.Value == this.oInfrecVM.AdministeredByOID);
                  if (!_IsExist) {
                      let oItem: CListItem = new CListItem();
                      oItem.DisplayText = this.oInfrecVM.AdministeredBy;
                      oItem.Value = this.oInfrecVM.AdministeredByOID;
                      this.oInfrecVM.AdministeredByList.Add(oItem);
                      this.oInfrecVM.AdministeredByList = new ObservableCollection<CListItem>(this.oInfrecVM.AdministeredByList.OrderBy(oItm => oItm.DisplayText));
                  }
                  let sTemp: string = this.oInfrecVM.AdministeredByOID;
                  this.sfsAdministeredby.SelectedValue = String.Empty;
                  this.sfsAdministeredby.SetSelectedItem(ObjectHelper.CreateObject(new CListItem(), { Value: sTemp }));
              }
              else if (!String.IsNullOrEmpty(this.strUserName)) {
                  let _IsExist: boolean = this.oInfrecVM.AdministeredByList.Any(x => x.Value == AppContextInfo.UserOID);
                  if (!_IsExist) {
                      let oItem: CListItem = new CListItem();
                      oItem.DisplayText = this.strUserName != null ? this.strUserName : String.Empty;
                      oItem.Value = AppContextInfo.UserOID;
                      this.oInfrecVM.AdministeredByList.Add(oItem);
                      this.oInfrecVM.AdministeredByList = new ObservableCollection<CListItem>(this.oInfrecVM.AdministeredByList.OrderBy(oItm => oItm.DisplayText));
                  }
                  this.sfsAdministeredby.SetSelectedItem(ObjectHelper.CreateObject(new CListItem(), { Value: AppContextInfo.UserOID, DisplayText: this.strUserName != null ? this.strUserName : String.Empty }));
                  this.oInfrecVM.AdministeredBy = this.strUserName != null ? this.strUserName : String.Empty;
                  this.oInfrecVM.AdministeredByOID = AppContextInfo.UserOID;                 
              }
              this.sfsAdministeredby.IsEnabled = MedChartData.AllowAnyUserForAdministration;
              this.oInfrecVM._IsSFSValueSetFromOnGetSFSItems = false;
          }
      }
      async sfsAdministeredby_OnSFSOpen(): Promise<void>  {
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
            Common.AddSelItemIntoSFSQuickList(this.oInfrecVM.AdministeredByList, oSelectedItems[0].Value, oSelectedItems[0].DisplayText.Trim(), "cp", this.sfsAdministeredby);
            this.oInfrecVM.AdministeredByList = new ObservableCollection<CListItem>(this.oInfrecVM.AdministeredByList.OrderBy(oItem => oItem.DisplayText));
            this.oInfrecVM.AdministeredBy = oSelectedItems[0].DisplayText.Trim();
            this.oInfrecVM.AdministeredByOID = oSelectedItems[0].Value;
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
        }
  
        if(oSelectedItems != null && oSelectedItems.Count > 0) {
          
            Common.AddSelItemIntoSFSQuickList(this.oInfrecVM.WitnessByList, oSelectedItems[0].Value, oSelectedItems[0].DisplayText.Trim(), "cp", this.sfsWitnessedby);
            this.oInfrecVM.WitnessByList = new ObservableCollection<CListItem>(this.oInfrecVM.WitnessByList.OrderBy(oItem => oItem.DisplayText));
            this.oInfrecVM.WitnessBy = oSelectedItems[0].DisplayText.Trim();
            this.oInfrecVM.WitnessByOID = oSelectedItems[0].Value;
         }
        }
      sfsWitnessedby_OnGetItems(sender: Object, Result: ObservableCollection<CListItem>): void {
          if (Result != null) {
              this.oInfrecVM.WitnessByList = Result;
          }
          if (this.oInfrecVM != null && !String.IsNullOrEmpty(this.oInfrecVM.WitnessByOID)) {
              this.oInfrecVM._IsSFSValueSetFromOnGetSFSItems = true;
              if (this.oInfrecVM.WitnessByList == null)
                  this.oInfrecVM.WitnessByList = new ObservableCollection<CListItem>();
              let _IsExist: boolean = this.oInfrecVM.WitnessByList.Any(x => x.Value == this.oInfrecVM.WitnessByOID);
              if (!_IsExist) {
                  let oItem: CListItem = new CListItem();
                  oItem.DisplayText = this.oInfrecVM.WitnessBy;
                  oItem.Value = this.oInfrecVM.WitnessByOID;
                  this.oInfrecVM.WitnessByList.Add(oItem);
                  this.oInfrecVM.WitnessByList = new ObservableCollection<CListItem>(this.oInfrecVM.WitnessByList.OrderBy(oItm => oItm.DisplayText));
              }
              let sTemp: string = this.oInfrecVM.WitnessByOID;
              this.sfsWitnessedby.SelectedValue = String.Empty;
              this.sfsWitnessedby.SetSelectedItem(ObjectHelper.CreateObject(new CListItem(), { Value: sTemp }));
              this.oInfrecVM._IsSFSValueSetFromOnGetSFSItems = false;
          }
      }
      cbo_SelectionChangedInfRoute(sender,e) {
          if (this.oInfrecVM != null && this.oInfrecVM.SelectedRoute != null && !this.oInfrecVM.IsRouteDefaultValueSetInProgress) {
              if (!this.ValidateRouteforScanMeds()) {
                  this.lnRouteOID = this.oInfrecVM.RouteOID = Convert.ToInt64(this.oInfrecVM.SelectedRoute.Value);
                  this.GetInfWitnessRequired();
              }
              this.IsRouteChngd = false;
          }
          this.oInfrecVM.IsRouteDefaultValueSetInProgress = false;
      }
      public ValidateRouteforScanMeds(): boolean {
          if (!this.IsRouteChngd && this.oInfrecVM.MedScanRecadminDetail != null && this.oInfrecVM.MedScanRecadminDetail.oProductDetailsInfo != null && this.oInfrecVM.MedScanRecadminDetail.oProductDetailsInfo.Count > 0) {
              let iMsgBox: iMessageBox = ObjectHelper.CreateObject(new iMessageBox(), {
                  Title: CConstants.MSGTitleName,
                  Message: Resource.MedScanRecAdmin.RemoveMed_Msg,
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
          if (e.MessageBoxResult == MessageBoxResult.Yes) {
              this.oInfrecVM.MedScanRecadminDetail = null;
              this.oMedScanRecAdmVM = null;
              MedChartData.IsMedScanSuccess = false;
              this.lnRouteOID = this.oInfrecVM.RouteOID = Convert.ToInt64(this.oInfrecVM.SelectedRoute.Value);
              this.GetInfWitnessRequired();
              this.oInfrecVM.IsBatchenabled = true;
              this.oInfrecVM.IsExpiryenabled = true;
          }
          else {
              if (this.oInfrecVM.PrescribedRoutes != null && this.oInfrecVM.PrescribedRoutes.Count > 1) {
                  this.IsRouteChngd = true;
                  let tempRoute: CListItem = this.oInfrecVM.PrescribedRoutes.Where(c => !String.IsNullOrEmpty(c.Value) && String.Equals(c.Value, Convert.ToString(this.lnRouteOID), StringComparison.InvariantCultureIgnoreCase)).FirstOrDefault();
                  this.oInfrecVM.SelectedRoute = tempRoute;
              }
          }
      }
      public GetInfWitnessRequired(): void {
          let objService: IPPMAPrescribableDefnWSSoapClient = new IPPMAPrescribableDefnWSSoapClient();
          objService.IsWitnessRequiredCompleted  = (s,e) => { this.objService_IsInfWitnessReqdCompleted(s,e); } ;
          let objReq: CReqMsgIsWitnessRequired = new CReqMsgIsWitnessRequired();
          objReq.oContextInformation = CommonBB.FillContext();
          objReq.CriteriaBC = new WitnessCriteria();
          objReq.CriteriaBC.ServicePoints = new ObservableCollection<PrescribableDefnWS.ObjectInfo>();
          objReq.CriteriaBC.ServicePoints.Add(ObjectHelper.CreateObject(new PrescribableDefnWS.ObjectInfo(), { OID: MedChartData.ServiceOID }));
          objReq.CriteriaBC.Drugs = new ObservableCollection<PrescribableDefnWS.ObjectInfo>();
          objReq.CriteriaBC.Drugs.Add(ObjectHelper.CreateObject(new PrescribableDefnWS.ObjectInfo(), { Code: this.oInfrecVM.PresLorenzoID }));
          objReq.CriteriaBC.Roles = new ObservableCollection<PrescribableDefnWS.ObjectInfo>();
          objReq.CriteriaBC.Roles.Add(ObjectHelper.CreateObject(new PrescribableDefnWS.ObjectInfo(), { OID: Convert.ToInt64(AppContextInfo.JobRoleOID) }));
          objReq.CriteriaBC.Routes = new ObservableCollection<PrescribableDefnWS.ObjectInfo>();
          objReq.CriteriaBC.Routes.Add(ObjectHelper.CreateObject(new PrescribableDefnWS.ObjectInfo(), { OID: this.lnRouteOID }));
          if (!String.IsNullOrEmpty(PatientContext.DOB) && DateTime.LessThanOrEqualTo(Convert.ToDateTime(PatientContext.DOB) , CommonBB.GetServerDateTime()))
              objReq.CriteriaBC.AgeFrom = Convert.ToInt16(PatientContext.PatientAge);
          else objReq.CriteriaBC.AgeFrom = -1;
          objReq.CriteriaBC.IsControlledDrugIncluded = this.oInfrecVM.IsControlledDrug;
          objService.IsWitnessRequiredAsync(objReq);
      }
      public objService_IsInfWitnessReqdCompleted(sender: Object, e: IsWitnessRequiredCompletedEventArgs): void {
          if (e.Result != null) {
              let objRes: CResMsgIsWitnessRequired = e.Result;
              if (objRes != null && objRes.owitnessCriteriaresult != null) {
                  if (objRes.owitnessCriteriaresult.Flag) {
                      this.oInfrecVM.bIsWitnessReqd = true;
                  }
                  else {
                      this.oInfrecVM.bIsWitnessReqd = false;
                  }
              }
          }
          this.chkNoWitness.IsEnabled = this.oInfrecVM.bIsWitnessReqd;
          if (this.chkNoWitness.IsChecked == true) {
              this.sfsWitnessedby.IsEnabled = false;
              this.lblWitnessedBy.IsEnabled = false;
          }
          else {
              this.sfsWitnessedby.IsEnabled = this.oInfrecVM.bIsWitnessReqd;
              this.lblWitnessedBy.IsEnabled = this.oInfrecVM.bIsWitnessReqd;
              this.oInfrecVM.WitnessMandatory = this.oInfrecVM.bIsWitnessReqd;
          }
      }
    //   public chkNoWitness_Checked(sender: Object, e: RoutedEventArgs): void {
    //       this.oInfrecVM.WitnessMandatory = false;
    //       this.oInfrecVM.IsEnableWitnessedBy = false;
    //       if (!String.IsNullOrEmpty(this.oInfrecVM.ClinicalIncidentForm)) {
    //           this.oInfrecVM.lblcliniIncFrm = Visibility.Visible;
    //       }
    //       if (ProfileData.ClinicalIncidentConfig != null && this.oInfrecVM.ValidateURL(ProfileData.ClinicalIncidentConfig.Address)) {
    //           this.oInfrecVM.IsEnablelblcliniIncFrmValue = true;
    //       }
    //       else {
    //           this.oInfrecVM.IsEnablelblcliniIncFrmValue = false;
    //       }
    //       this.sfsWitnessedby.ClearAll();
    //       this.oInfrecVM.WitnessByOID = String.Empty;
    //       this.oInfrecVM.WitnessBy = String.Empty;
    //   }
    chkNoWitness_Checked(sender): void {
        if(sender.target.checked)
        {
            this.oInfrecVM.WitnessMandatory = false;
            this.oInfrecVM.IsEnableWitnessedBy = false;
          if (!String.IsNullOrEmpty(this.oInfrecVM.ClinicalIncidentForm)) {
              this.oInfrecVM.lblcliniIncFrm = Visibility.Visible;
          
          }
          if (ProfileData.ClinicalIncidentConfig != null && this.oInfrecVM.ValidateURL(ProfileData.ClinicalIncidentConfig.Address)) {
              this.oInfrecVM.IsEnablelblcliniIncFrmValue = true;
            
           
            }
          else {
              this.oInfrecVM.IsEnablelblcliniIncFrmValue = false;
          }
          this.sfsWitnessedby.ClearAll();
          this.oInfrecVM.WitnessByOID = String.Empty;
          this.oInfrecVM.WitnessBy = String.Empty;
          if(this.DataContext.lblcliniIncFrm == 0){
          this.isBrdrBackgroundVisible =true;}
          else{
            this.isBrdrBackgroundVisible = false;
          }
       
        }
        else
        {
           this.chkNoWitness_Unchecked(null,null); 
        }
      }
      public chkNoWitness_Unchecked(sender: Object, e: RoutedEventArgs): void {
          this.oInfrecVM.lblcliniIncFrm = Visibility.Collapsed;
          this.isBrdrBackgroundVisible =false;
       
          //removing if condition as bIsWitnessReqd is set while changing the route combo box value, as of now it is only single value i.e intravenous infusion, hence it is not chenging back to manadatory 
        //  if (this.oInfrecVM.bIsWitnessReqd) {
              this.oInfrecVM.WitnessMandatory = true;
              this.oInfrecVM.IsEnableWitnessedBy = true;
              this.oInfrecVM.IsEnableChkWitness = true;
        //   }
        //   else {
        //       this.oInfrecVM.WitnessMandatory = false;
        //       this.oInfrecVM.IsEnableWitnessedBy = true;
        //   }
      }
      public cmdObservationsResults_Click(sender: Object, e: RoutedEventArgs): void {
          let sItemsubtype: string = String.Empty;
          let sMcdrugname: string = String.Empty;
          let slorenzoid: string = String.Empty;
          let bResult: boolean = Common.LaunchObservation(this.lnPrescriptionOID,
              this.IdentifyingType,
              this.IdentifyingOID,
              this.MCVersion, !String.IsNullOrEmpty(this.sObsDrugName) ? this.sObsDrugName : this.sDrugName, sItemsubtype, sMcdrugname, slorenzoid);
      }
   
      lblCIFValue_MouseLeftButtonUp(e): void {
        if(ProfileData.ClinicalIncidentConfig != null && !String.IsNullOrEmpty(ProfileData.ClinicalIncidentConfig.Address) && Common.ValidateURL(ProfileData.ClinicalIncidentConfig.Address)) {
            HtmlPage.Window.Invoke("LaunchClinicalIncidentForm", ProfileData.ClinicalIncidentConfig.Address);
        }
    }
      public UserControl_Unloaded(sender: Object, e: RoutedEventArgs): void {
          this.oInfrecVM.OnWitnessUserSelected = this.ValidateUser;
      }
      
  }
