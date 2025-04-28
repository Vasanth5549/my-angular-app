import { ApplicationInitStatus, Component, Input, OnInit, ViewChild } from '@angular/core';
import { StringBuilder,ProfileFactoryType,ContextManager,Convert,AppActivity} from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp,Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison,AppDialogEventargs, AppDialogResult, DelegateArgs, DialogComponentArgs, WindowButtonType } from 'epma-platform/models';
import { AppDialog, Border, Grid, StackPanel, UserControl, iButton, iCheckBox, iComboBox, iDateTimePicker, iLabel, iRadioButton, iTextBox, iTimeBox } from 'epma-platform/controls';
import { HelperService} from 'epma-platform/soapclient';
//import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
import { InfrecordadminVM } from '../viewmodel/InfrecordadminVM';
import { CommonBB } from 'src/app/lorappcommonbb/utilities/common';
import { DateChangeEventArgs } from 'src/app/shared/epma-platform/controls/epma-datetimepicker/epma-datetimepicker.component';
import { RoutedEventArgs } from 'src/app/shared/epma-platform/controls/FrameworkElement';
import { InfusionTypesCode } from '../utilities/CConstants';
import { Resource } from '../resource';
import * as ControlStyles from "../../shared/epma-platform/controls/ControlStyles";
import { MedicationAdministrator } from '../resource/medicationadministrator.designer';
//import { Resource } from "../../utilities/ResourceManagement";

@Component({
  selector: 'InfRecAdmContChangeFlowRate',
  templateUrl: './InfRecAdmContChangeFlowRate.html',
 styles: [`
 @media screen and (max-device-width: 1400px) {
    ::ng-deep .k-calendar-view{
        min-height: 100px !important;
        height: 185px !important;;
    }
    ::ng-deep .k-timeselector {
        height: 212px !important;
        overflow-y: auto !important;;
    }
}

 `]
})
  
export class InfRecAdmContChangeFlowRate extends UserControl implements OnInit {
  public Styles = ControlStyles;
        recordadminVM: InfrecordadminVM;
        CurrentDt: DateTime= CommonBB.GetServerDateTime();
        public LayoutRoot: Grid;

        override _DataContext: InfrecordadminVM;
        override get DataContext() {
          console.log(this._DataContext);
          return this._DataContext;
        }
        @Input() override set DataContext(value: InfrecordadminVM) {
          this._DataContext = value;
        }

       // public override _DataContext: any;

       public objRecordAdmin = Resource.MedicationAdministrator;
       public objOmitSlots = Resource.MedsAdminOmitSlots;
       public CondRes =Resource.ConditionalRegime;
       public Resrce = Resource.InfusionChart;
       public RecalcEstCompTimeWrap = Resource.RecalcEstCompTimeConverter;
    
@ViewChild("LayoutRootTempRef", {read:Grid, static: false }) set _LayoutRoot(c: Grid){
    if(c){ this.LayoutRoot  = c; }
};
public grdnotgiven: Grid;
@ViewChild("grdnotgivenTempRef", {read:Grid, static: false }) set _grdnotgiven(c: Grid){
    if(c){ this.grdnotgiven  = c; }
};
public bgdconcentrationold: Border;
@ViewChild("bgdconcentrationoldTempRef", {read:Border, static: false }) set _bgdconcentrationold(c: Border){
    if(c){ this.bgdconcentrationold  = c; }
};
public bgdconcentration: Border;
@ViewChild("bgdconcentrationTempRef", {read:Border, static: false }) set _bgdconcentration(c: Border){
    if(c){ this.bgdconcentration  = c; }
};
public bgdinfudose: Border;
@ViewChild("bgdinfudoseTempRef", {read:Border, static: false }) set _bgdinfudose(c: Border){
    if(c){ this.bgdinfudose  = c; }
};
public bgdinfurate: Border;
@ViewChild("bgdinfurateTempRef", {read:Border, static: false }) set _bgdinfurate(c: Border){
    if(c){ this.bgdinfurate  = c; }
};
public bgddontchangeinfrate: Border;
@ViewChild("bgddontchangeinfrateTempRef", {read:Border, static: false }) set _bgddontchangeinfrate(c: Border){
    if(c){ this.bgddontchangeinfrate  = c; }
};
public bgdchginfurate: Border;
@ViewChild("bgdchginfurateTempRef", {read:Border, static: false }) set _bgdchginfurate(c: Border){
    if(c){ this.bgdchginfurate  = c; }
};
public bgddripdate1: Border;
@ViewChild("bgddripdate1TempRef", {read:Border, static: false }) set _bgddripdate1(c: Border){
    if(c){ this.bgddripdate1  = c; }
};
public bgdrecalestcom: Border;
@ViewChild("bgdrecalestcomTempRef", {read:Border, static: false }) set _bgdrecalestcom(c: Border){
    if(c){ this.bgdrecalestcom  = c; }
};
public bgdheightfive: Border;
@ViewChild("bgdheightfiveTempRef", {read:Border, static: false }) set _bgdheightfive(c: Border){
    if(c){ this.bgdheightfive  = c; }
};
public brdconcentration: Border;
@ViewChild("brdconcentrationTempRef", {read:Border, static: false }) set _brdconcentration(c: Border){
    if(c){ this.brdconcentration  = c; }
};
public brdinfudose: Border;
@ViewChild("brdinfudoseTempRef", {read:Border, static: false }) set _brdinfudose(c: Border){
    if(c){ this.brdinfudose  = c; }
};
public brdinfurate: Border;
@ViewChild("brdinfurateTempRef", {read:Border, static: false }) set _brdinfurate(c: Border){
    if(c){ this.brdinfurate  = c; }
};
public brddontchangeinfrate: Border;
@ViewChild("brddontchangeinfrateTempRef", {read:Border, static: false }) set _brddontchangeinfrate(c: Border){
    if(c){ this.brddontchangeinfrate  = c; }
};
public brdchnginfurate: Border;
@ViewChild("brdchnginfurateTempRef", {read:Border, static: false }) set _brdchnginfurate(c: Border){
    if(c){ this.brdchnginfurate  = c; }
};
public brddriprate1: Border;
@ViewChild("brddriprate1TempRef", {read:Border, static: false }) set _brddriprate1(c: Border){
    if(c){ this.brddriprate1  = c; }
};
public brdrecalestcom: Border;
@ViewChild("brdrecalestcomTempRef", {read:Border, static: false }) set _brdrecalestcom(c: Border){
    if(c){ this.brdrecalestcom  = c; }
};
public brd: Border;
@ViewChild("brdTempRef", {read:Border, static: false }) set _brd(c: Border){
    if(c){ this.brd  = c; }
};
public lblPrevConcentration: iLabel;
@ViewChild("lblPrevConcentrationTempRef", {read:iLabel, static: false }) set _lblPrevConcentration(c: iLabel){
    if(c){ this.lblPrevConcentration  = c; }
};
public lblPrevConValue: iLabel;
@ViewChild("lblPrevConValueTempRef", {read:iLabel, static: false }) set _lblPrevConValue(c: iLabel){
    if(c){ this.lblPrevConValue  = c; }
};
public lblConcentration: iLabel;
@ViewChild("lblConcentrationTempRef", {read:iLabel, static: false }) set _lblConcentration(c: iLabel){
    if(c){ this.lblConcentration  = c; }
};
public lblConcentrationValue: iLabel;
@ViewChild("lblConcentrationValueTempRef", {read:iLabel, static: false }) set _lblConcentrationValue(c: iLabel){
    if(c){ this.lblConcentrationValue  = c; }
};
public Concentrationdetails: StackPanel;
@ViewChild("ConcentrationdetailsTempRef", {read:StackPanel, static: false }) set _Concentrationdetails(c: StackPanel){
    if(c){ this.Concentrationdetails  = c; }
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
public Infusiondosedetails: StackPanel;
@ViewChild("InfusiondosedetailsTempRef", {read:StackPanel, static: false }) set _Infusiondosedetails(c: StackPanel){
    if(c){ this.Infusiondosedetails  = c; }
};
public Infusiondosetext: iTextBox;
@ViewChild("InfusiondosetextTempRef", {read:iTextBox, static: false }) set _Infusiondosetext(c: iTextBox){
    if(c){ this.Infusiondosetext  = c; }
};
public lblInfusiondoseValue: iLabel;
@ViewChild("lblInfusiondoseValueTempRef", {read:iLabel, static: false }) set _lblInfusiondoseValue(c: iLabel){
    if(c){ this.lblInfusiondoseValue  = c; }
};
public lblinfusiontrate1: iLabel;
@ViewChild("lblinfusiontrate1TempRef", {read:iLabel, static: false }) set _lblinfusiontrate1(c: iLabel){
    if(c){ this.lblinfusiontrate1  = c; }
};
public lblrateValue: iLabel;
@ViewChild("lblrateValueTempRef", {read:iLabel, static: false }) set _lblrateValue(c: iLabel){
    if(c){ this.lblrateValue  = c; }
};
public lbldontchnginftrate: iLabel;
@ViewChild("lbldontchnginftrateTempRef", {read:iLabel, static: false }) set _lbldontchnginftrate(c: iLabel){
    if(c){ this.lbldontchnginftrate  = c; }
};
public chkDontChngInfRate: iCheckBox;
@ViewChild("chkDontChngInfRateTempRef", {read:iCheckBox, static: false }) set _chkDontChngInfRate(c: iCheckBox){
    if(c){ this.chkDontChngInfRate  = c; }
};
public lblchnginfusiontrate: iLabel;
@ViewChild("lblchnginfusiontrateTempRef", {read:iLabel, static: false }) set _lblchnginfusiontrate(c: iLabel){
    if(c){ this.lblchnginfusiontrate  = c; }
};
public cmdDoseCalInf: iButton;
@ViewChild("cmdDoseCalInfTempRef", {read:iButton, static: false }) set _cmdDoseCalInf(c: iButton){
    if(c){ this.cmdDoseCalInf  = c; }
};
public InfusionrateLayoutRoot1: Grid;
@ViewChild("InfusionrateLayoutRoot1TempRef", {read:Grid, static: false }) set _InfusionrateLayoutRoot1(c: Grid){
    if(c){ this.InfusionrateLayoutRoot1  = c; }
};
public txtinfucon: iTextBox;
@ViewChild("txtinfuconTempRef", {read:iTextBox, static: false }) set _txtinfucon(c: iTextBox){
    if(c){ this.txtinfucon  = c; }
};
public lblinfuconuom: iLabel;
@ViewChild("lblinfuconuomTempRef", {read:iLabel, static: false }) set _lblinfuconuom(c: iLabel){
    if(c){ this.lblinfuconuom  = c; }
};
public cboinfucon: iComboBox;
@ViewChild("cboinfuconTempRef", {read:iComboBox, static: false }) set _cboinfucon(c: iComboBox){
    if(c){ this.cboinfucon  = c; }
};
public lblInfusionRateHifen1: iLabel;
@ViewChild("lblInfusionRateHifen1TempRef", {read:iLabel, static: false }) set _lblInfusionRateHifen1(c: iLabel){
    if(c){ this.lblInfusionRateHifen1  = c; }
};
public cboinfuconcent: iComboBox;
@ViewChild("cboinfuconcentTempRef", {read:iComboBox, static: false }) set _cboinfuconcent(c: iComboBox){
    if(c){ this.cboinfuconcent  = c; }
};
public cmdCondDoseImg: iButton;
@ViewChild("cmdCondDoseImgTempRef", {read:iButton, static: false }) set _cmdCondDoseImg(c: iButton){
    if(c){ this.cmdCondDoseImg  = c; }
};
public lbldriprate: iLabel;
@ViewChild("lbldriprateTempRef", {read:iLabel, static: false }) set _lbldriprate(c: iLabel){
    if(c){ this.lbldriprate  = c; }
};
public cmdDoseCal1: iButton;
@ViewChild("cmdDoseCal1TempRef", {read:iButton, static: false }) set _cmdDoseCal1(c: iButton){
    if(c){ this.cmdDoseCal1  = c; }
};
public Driprate1: iTextBox;
@ViewChild("Driprate1TempRef", {read:iTextBox, static: false }) set _Driprate1(c: iTextBox){
    if(c){ this.Driprate1  = c; }
};
public lbdriprateValue: iLabel;
@ViewChild("lbdriprateValueTempRef", {read:iLabel, static: false }) set _lbdriprateValue(c: iLabel){
    if(c){ this.lbdriprateValue  = c; }
};
public lblrecalcestcom: iLabel;
@ViewChild("lblrecalcestcomTempRef", {read:iLabel, static: false }) set _lblrecalcestcom(c: iLabel){
    if(c){ this.lblrecalcestcom  = c; }
};
public rdbRecalcEstCompYes: iRadioButton;
@ViewChild("rdbRecalcEstCompYesTempRef", {read:iRadioButton, static: false }) set _rdbRecalcEstCompYes(c: iRadioButton){
    if(c){ this.rdbRecalcEstCompYes  = c; }
};
public rdbRecalcEstCompNo: iRadioButton;
@ViewChild("rdbRecalcEstCompNoTempRef", {read:iRadioButton, static: false }) set _rdbRecalcEstCompNo(c: iRadioButton){
    if(c){ this.rdbRecalcEstCompNo  = c; }
};
public bgdchangedate: Border;
@ViewChild("bgdchangedateTempRef", {read:Border, static: false }) set _bgdchangedate(c: Border){
    if(c){ this.bgdchangedate  = c; }
};
public bgdcom: Border;
@ViewChild("bgdcomTempRef", {read:Border, static: false }) set _bgdcom(c: Border){
    if(c){ this.bgdcom  = c; }
};
public bgdfive: Border;
@ViewChild("bgdfiveTempRef", {read:Border, static: false }) set _bgdfive(c: Border){
    if(c){ this.bgdfive  = c; }
};
public brdcom: Border;
@ViewChild("brdcomTempRef", {read:Border, static: false }) set _brdcom(c: Border){
    if(c){ this.brdcom  = c; }
};
public brdfive: Border;
@ViewChild("brdfiveTempRef", {read:Border, static: false }) set _brdfive(c: Border){
    if(c){ this.brdfive  = c; }
};
public lblchangeDateTime: iLabel;
@ViewChild("lblchangeDateTimeTempRef", {read:iLabel, static: false }) set _lblchangeDateTime(c: iLabel){
    if(c){ this.lblchangeDateTime  = c; }
};
public dtpchangeDate: iDateTimePicker;
@ViewChild("dtpchangeDateTempRef", {read:iDateTimePicker, static: false }) set _dtpchangeDate(c: iDateTimePicker){
    if(c){ this.dtpchangeDate  = c; }
};
public iTimedchangeTime: iTimeBox;
@ViewChild("iTimedchangeTimeTempRef", {read:iTimeBox, static: false }) set _iTimedchangeTime(c: iTimeBox){
    if(c){ this.iTimedchangeTime  = c; }
};
public lblComments1: iLabel;
@ViewChild("lblComments1TempRef", {read:iLabel, static: false }) set _lblComments1(c: iLabel){
    if(c){ this.lblComments1  = c; }
};
public txtAdminComments: iTextBox;
@ViewChild("txtAdminCommentsTempRef", {read:iTextBox, static: false }) set _txtAdminComments(c: iTextBox){
    if(c){ this.txtAdminComments  = c; }
};
public lblInfusionPeriodReachedAlert: iLabel;
@ViewChild("lblInfusionPeriodReachedAlertTempRef", {read:iLabel, static: false }) set _lblInfusionPeriodReachedAlert(c: iLabel){
    if(c){ this.lblInfusionPeriodReachedAlert  = c; }
};

        constructor() {
            super();
            //InitializeComponent();
            this.recordadminVM = this.DataContext;
        }
    ngOnInit(): void {
        console.log("changeflowrate", this.DataContext)

        if (this.DataContext.ChangedInfusionRate) {
            this.DataContext.IsClinicalRSNMand = true;
        }

        setTimeout(() => {
            this.ChildWindow_Loaded(null,null)     
        }, 0);
    }
        public ChildWindow_Loaded(sender: Object, e: RoutedEventArgs): void {
            this.DataContext.InitFormValuesAfterFormLoad();
            //error in Application and System so commented and raised bug advice by siva
            /*if (!Application.Current.IsRunningOutOfBrowser) {
                System.Windows.Browser.HtmlPage.Plugin.Focus();
               }*/
            if (this.recordadminVM != null && !String.IsNullOrEmpty(this.recordadminVM.ItemSubType) && String.Equals(this.recordadminVM.ItemSubType, InfusionTypesCode.SUBTYPE_GAS, StringComparison.CurrentCultureIgnoreCase) && this.recordadminVM.IsEnableInfusionrate) {
                this.txtinfucon.UpdateLayout();
                this.txtinfucon.Focus();
            }
        }
        public dtpDateTimeGivenText_OnDateChange(sender: Object, e: DateChangeEventArgs): void {
            if(DateTime.Equals(this.dtpchangeDate.CurrentDateTime, DateTime.MinValue)) {
                this.dtpchangeDate.CurrentDateTime = DateTime.Now.Date;
            }
        }

        GetResourceString(sResource: string, sKey: string) {
            if (sResource == 'MedAdmin') {
                let objRecordAdmin: MedicationAdministrator = new MedicationAdministrator();
                 return objRecordAdmin.GetResourceString(sKey);
              }
              return null;
            }
    }
