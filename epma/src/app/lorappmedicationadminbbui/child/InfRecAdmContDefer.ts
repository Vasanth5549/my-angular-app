import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { StringBuilder,ProfileFactoryType,ContextManager,Convert,AppActivity} from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp,Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison,AppDialogEventargs, AppDialogResult, DelegateArgs, DialogComponentArgs, WindowButtonType, SelectionChangedEventArgs, Visibility } from 'epma-platform/models';
import { AppDialog, Border, Grid, iComboBox, iLabel, iTextBox, iTimeBox, UserControl } from 'epma-platform/controls';
import { HelperService} from 'epma-platform/soapclient';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
import { InfrecordadminVM } from '../viewmodel/InfrecordadminVM';
import { RoutedEventArgs } from 'src/app/shared/epma-platform/controls/FrameworkElement';
import { CommonBB } from 'src/app/lorappcommonbb/utilities/common';
import { DateChangeEventArgs, iDateTimePicker } from 'src/app/shared/epma-platform/controls/epma-datetimepicker/epma-datetimepicker.component';
import { Resource } from '../resource';
import * as ControlStyles from '../../shared/epma-platform/controls/ControlStyles';

@Component({
  selector: 'infrecadm-contdefer',
  templateUrl: './InfRecAdmContDefer.html',
  styleUrls: ['./InfRecAdmContDefer.css']
})
export class InfRecAdmContDefer extends UserControl implements OnInit, AfterViewInit {
  recordadminVM: InfrecordadminVM;
  public Styles = ControlStyles;

  public objOmitSlots = Resource.MedsAdminOmitSlots;
  public CondRes = Resource.ConditionalRegime;
  public oMedAdministrator = Resource.MedicationAdministrator;
   public MedCharOIDBC: number;

  override _DataContext: InfrecordadminVM;
  override get DataContext() {
    console.log(this._DataContext);
    return this._DataContext;
  }
  @Input() override set DataContext(value: InfrecordadminVM) {
    this._DataContext = value;
  }

  CurrentDt: DateTime= CommonBB.GetServerDateTime();

  @Input() valueUsed:any;

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
public bgdcomments: Border;
@ViewChild("bgdcommentsTempRef", {read:Border, static: false }) set _bgdcomments(c: Border){
    if(c){ this.bgdcomments  = c; }
};
public bgdheightfive: Border;
@ViewChild("bgdheightfiveTempRef", {read:Border, static: false }) set _bgdheightfive(c: Border){
    if(c){ this.bgdheightfive  = c; }
};
public brdreason: Border;
@ViewChild("brdreasonTempRef", {read:Border, static: false }) set _brdreason(c: Border){
    if(c){ this.brdreason  = c; }
};
public brdcomments: Border;
@ViewChild("brdcommentsTempRef", {read:Border, static: false }) set _brdcomments(c: Border){
    if(c){ this.brdcomments  = c; }
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
public lblComments: iLabel;
@ViewChild("lblCommentsTempRef", {read:iLabel, static: false }) set _lblComments(c: iLabel){
    if(c){ this.lblComments  = c; }
};
public txtComments: iTextBox;
@ViewChild("txtCommentsTempRef", {read:iTextBox, static: false }) set _txtComments(c: iTextBox){
    if(c){ this.txtComments  = c; }
};

  constructor() {
    super();
     // InitializeComponent();
     // this.recordadminVM = oVM;
     this.recordadminVM = this.DataContext;
  }
  ngOnInit(): void {
    setTimeout(() => {
    this.ChildWindow_Loaded(null,null);
    }, 0);
    this.recordadminVM = this.DataContext;
}

  ngAfterViewInit(): void {

     this.ChildWindow_Loaded(null,null);
}
  private ChildWindow_Loaded(sender: Object, e: RoutedEventArgs): void {
      this.DataContext.InitFormValuesAfterFormLoad();
  }
  private cboResNotGiven_SelectionChanged(sender: Object, e: SelectionChangedEventArgs): void {

  }
  public dtpDateTimeGivenText_OnDateChange(sender: Object, e: DateChangeEventArgs): void {
      if (DateTime.Equals(this.dtpDate.CurrentDateTime , DateTime.MinValue)) {
          this.dtpDate.CurrentDateTime = DateTime.Now.Date;
      }
  }
}
