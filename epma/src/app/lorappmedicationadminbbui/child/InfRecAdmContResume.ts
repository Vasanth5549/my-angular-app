import { Component, Input, OnInit, ViewChild } from '@angular/core';
import DateTime from 'epma-platform/DateTime';
import { Border, Grid, StackPanel, UserControl, iButton, iComboBox, iLabel, iTextBox, iTimeBox } from 'epma-platform/controls';
import { CommonBB } from 'src/app/lorappcommonbb/utilities/common';
import { InfrecordadminVM } from 'src/app/lorappmedicationadminbbui/viewmodel/InfrecordadminVM';
import { RoutedEventArgs } from 'src/app/shared/epma-platform/controls/Control';
import { DateChangeEventArgs, iDateTimePicker } from 'src/app/shared/epma-platform/controls/epma-datetimepicker/epma-datetimepicker.component';
import { Resource } from '../resource';
import { GridComponent } from '@progress/kendo-angular-grid';
//import * as ControlStyles from "../../../shared/epma-platform/controls/ControlStyles";
//import { Resource } from '../../resource';

import * as ControlStyles from "../../shared/epma-platform/controls/ControlStyles";
import { MedicationAdministrator } from '../resource/medicationadministrator.designer';
import { InfusionTypeCode } from 'src/app/lorappmedicationcommonbb/utilities/constants';





@Component({
  selector: 'InfRecAdmContResume',
  templateUrl: './InfRecAdmContResume.html',
  styleUrls: ['./InfRecAdmContResume.css']  
})
export class InfRecAdmContResume extends UserControl implements OnInit {
  //public objRecordAdmin = Resource.medsadmindetails;
  public MedCharOIDBC: number;
  recordadminVM: InfrecordadminVM;
  CurrentDt: DateTime = CommonBB.GetServerDateTime();
 public Styles = ControlStyles;

 override _DataContext: InfrecordadminVM = new InfrecordadminVM();

  // override _DataContext: InfrecordadminVM;
  override get DataContext() {
    return this._DataContext;
  }
  @Input() override set DataContext(value: InfrecordadminVM) {
    this._DataContext = value;
  }

  public LayoutRoot: Grid;
  @ViewChild("LayoutRootTempRef", {read:Grid, static: false }) set _LayoutRoot(c: Grid){
      if(c){ this.LayoutRoot  = c; }
  };
   
  public grdnotgiven: Grid;
  @ViewChild("grdnotgivenTempRef", {read:Grid, static: false }) set _grdnotgiven(c: Grid){
      if(c){ this.grdnotgiven  = c; }
  };
  public bgddatetime: Border;
  @ViewChild("bgddatetimeTempRef", {read:Border, static: false }) set _bgddatetime(c: Border){
      if(c){ this.bgddatetime  = c; }
  };
  public bgdreason: Border;
  @ViewChild("bgdreasonTempRef", {read:Border, static: false }) set _bgdreason(c: Border){
      if(c){ this.bgdreason  = c; }
  };
  public bgdconcentration: Border;
  @ViewChild("bgdconcentrationTempRef", {read:Border, static: false }) set _bgdconcentration(c: Border){
      if(c){ this.bgdconcentration  = c; }
  };
  public bgdinfdose: Border;
  @ViewChild("bgdinfdoseTempRef", {read:Border, static: false }) set _bgdinfdose(c: Border){
      if(c){ this.bgdinfdose  = c; }
  };
  public bgdinfrate: Border;
  @ViewChild("bgdinfrateTempRef", {read:Border, static: false }) set _bgdinfrate(c: Border){
      if(c){ this.bgdinfrate  = c; }
  };
  public bgddriprate: Border;
  @ViewChild("bgddriprateTempRef", {read:Border, static: false }) set _bgddriprate(c: Border){
      if(c){ this.bgddriprate  = c; }
  };
  public bgdheightfive: Border;
@ViewChild("bgdheightfiveTempRef", {read:Border, static: false }) set _bgdheightfive(c: Border){
    if(c){ this.bgdheightfive  = c; }
};
public brdreason: Border;
@ViewChild("brdreasonTempRef", {read:Border, static: false }) set _brdreason(c: Border){
    if(c){ this.brdreason  = c; }
};
public brdconcentration: Border;
@ViewChild("brdconcentrationTempRef", {read:Border, static: false }) set _brdconcentration(c: Border){
    if(c){ this.brdconcentration  = c; }
};
public brdinfdose: Border;
@ViewChild("brdinfdoseTempRef", {read:Border, static: false }) set _brdinfdose(c: Border){
    if(c){ this.brdinfdose  = c; }
};
public brdinfrate: Border;
@ViewChild("brdinfrateTempRef", {read:Border, static: false }) set _brdinfrate(c: Border){
    if(c){ this.brdinfrate  = c; }
};
public brddriprate: Border;
@ViewChild("brddriprateTempRef", {read:Border, static: false }) set _brddriprate(c: Border){
    if(c){ this.brddriprate  = c; }
};
public brd: Border;
@ViewChild("brdTempRef", {read:Border, static: false }) set _brd(c: Border){
    if(c){ this.brd  = c; }
};
public lbldateTime: iLabel;
@ViewChild("lbldateTimeTempRef", {read:iLabel, static: false }) set _lbldateTime(c: iLabel){
    if(c){ this.lbldateTime  = c; }
};
public dtpDate: iDateTimePicker;
@ViewChild("dtpDateTempRef", {read:iDateTimePicker, static: false }) set _dtpDate(c: iDateTimePicker){
    if(c){ this.dtpDate  = c; }
};
public idatetime: iTimeBox;
@ViewChild("idatetimeTempRef", {read:iTimeBox, static: false }) set _idatetime(c: iTimeBox){
    if(c){ this.idatetime  = c; }
};
public lblReason: iLabel;
@ViewChild("lblReasonTempRef", {read:iLabel, static: false }) set _lblReason(c: iLabel){
    if(c){ this.lblReason  = c; }
};
public cboreason: iComboBox;
@ViewChild("cboreasonTempRef", {read:iComboBox, static: false }) set _cboreason(c: iComboBox){
    if(c){ this.cboreason  = c; }
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
public stkInfudose: StackPanel;
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
public lblinfusiontrate: iLabel;
@ViewChild("lblinfusiontrateTempRef", {read:iLabel, static: false }) set _lblinfusiontrate(c: iLabel){
    if(c){ this.lblinfusiontrate  = c; }
};
public txtinfusionrate: iTextBox;
@ViewChild("txtinfusionrateTempRef", {read:iTextBox, static: false }) set _txtinfusionrate(c: iTextBox){
    if(c){ this.txtinfusionrate  = c; }
};
public lblInfrateuom: iLabel;
@ViewChild("lblInfrateuomTempRef", {read:iLabel, static: false }) set _lblInfrateuom(c: iLabel){
    if(c){ this.lblInfrateuom  = c; }
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
public bgdcom: Border;
@ViewChild("bgdcomTempRef", {read:Border, static: false }) set _bgdcom(c: Border){
    if(c){ this.bgdcom  = c; }
};
public bgdfive: Border;
@ViewChild("bgdfiveTempRef", {read:Border, static: false }) set _bgdfive(c: Border){
    if(c){ this.bgdfive  = c; }
};
public brdfive: Border;
@ViewChild("brdfiveTempRef", {read:Border, static: false }) set _brdfive(c: Border){
    if(c){ this.brdfive  = c; }
};
public lblComments: iLabel;
@ViewChild("lblCommentsTempRef", {read:iLabel, static: false }) set _lblComments(c: iLabel){
    if(c){ this.lblComments  = c; }
};
public txtComments: iTextBox;
@ViewChild("txtCommentsTempRef", {read:iTextBox, static: false }) set _txtComments(c: iTextBox){
    if(c){ this.txtComments  = c; }
};
public lblInfusionPeriodReachedAlert: iLabel;
@ViewChild("lblInfusionPeriodReachedAlertTempRef", {read:iLabel, static: false }) set _lblInfusionPeriodReachedAlert(c: iLabel){
    if(c){ this.lblInfusionPeriodReachedAlert  = c; }
};
public objRecordAdmin = Resource.MedicationAdministrator;
constructor(objInfRecoVM: InfrecordadminVM) {
  super();
  //InitializeComponent();
  //this.recordadminVM = objInfRecoVM;
}

    ngOnInit(): void {
       setTimeout(() => {
        this.ChildWindow_Loaded(null,null)
       }, 0);
       this.recordadminVM = this.DataContext;

       if (this.recordadminVM.isDriprateChage) {
        this.DataContext.IsClinicalRSNMand = true;
    }
    }
  
    ngAfterViewInit(): void {
        this.dtpDate.OnDateValueChanged = (s, e) => {
          this.dtpDateTimeGivenText_OnDateChange(s, e);
        };
       //   this.ChildWindow_Loaded(null,null)
         if(String.Equals(this.DataContext.InfusionType.Value, InfusionTypeCode.FLUID))
         {
        this.brdinfdose .Visibility=  this.DataContext.BackgrdInfRateVisi;
        this.brdinfrate .Visibility=  this.DataContext.BackgrdInfRateVisi;
        this.bgdinfdose .Visibility=  this.DataContext.BackgrdInfRateVisi;
        this.bgdinfrate .Visibility=  this.DataContext.BackgrdInfRateVisi;
         }
      }

  private ChildWindow_Loaded(sender: Object, e: RoutedEventArgs): void {
      this.DataContext.InitFormValuesAfterFormLoad();
  }

  // private cboResNotGiven_SelectionChanged(sender: Object, e: Telerik.Windows.Controls.SelectionChangedEventArgs): void {

  // }
  private dtpDateTimeGivenText_OnDateChange(sender: Object, e: DateChangeEventArgs): void {
    if (this.dtpDate.CurrentDateTime == DateTime.MinValue) {
        this.dtpDate.CurrentDateTime = DateTime.Now.Date;
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

