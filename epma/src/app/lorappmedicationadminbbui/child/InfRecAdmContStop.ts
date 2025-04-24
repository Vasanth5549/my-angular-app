import { Component, Input, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import {
  StringBuilder,
  ProfileFactoryType,
  ContextManager,
  Convert,
  AppActivity,
} from 'epma-platform/services';
import {
  Level,
  ProfileContext,
  OnProfileResult,
  IProfileProp,
  Byte,
  Decimal,
  decimal,
  Double,
  Float,
  Int64,
  long,
  Long,
  StringComparison,
  AppDialogEventargs,
  AppDialogResult,
  DelegateArgs,
  DialogComponentArgs,
  WindowButtonType,
  SelectionChangedEventArgs,
} from 'epma-platform/models';
import {
  AppDialog,
  Border,
  Grid,
  StackPanel,
  UserControl,
  iButton,
  iComboBox,
  iLabel,
  iTextBox,
  iTimeBox,
} from 'epma-platform/controls';
import { HelperService } from 'epma-platform/soapclient';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import {
  MessageEventArgs,
  MessageBoxResult,
  iMessageBox,
  MessageBoxButton,
  MessageBoxType,
  MessageBoxDelegate,
} from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
import { InfrecordadminVM } from '../viewmodel/InfrecordadminVM';
import { CommonBB } from 'src/app/lorappcommonbb/utilities/common';
import { RoutedEventArgs } from 'src/app/shared/epma-platform/controls/FrameworkElement';
import {
  DateChangedArgs,
  iDateTimePicker,
} from 'src/app/shared/epma-platform/controls/epma-datetimepicker/epma-datetimepicker.component';
import * as ControlStyles from '../../shared/epma-platform/controls/ControlStyles';
import { ConditionalRegime } from '../resource/conditionalregime.designer';
import { MedsAdminOmitSlots } from '../resource/medsadminomitslots.designer';
import { ResourceManagement } from '../utilities/ResourceManagement';
import { Resource } from '../resource';
import { MedicationAdministrator } from '../resource/medicationadministrator.designer';

@Component({
  selector: 'app-InfRecAdmContStop',
  templateUrl: './InfRecAdmContStop.html',
  styleUrls: ['./InfRecAdmContStop.css'],
})
export class InfRecAdmContStop extends UserControl implements OnInit,AfterViewInit {
  recordadminVM: InfrecordadminVM;
  // ovm: InfrecordadminVM;

  public Styles = ControlStyles;

  public CondRes = Resource.ConditionalRegime;
  public objOmitSlots = Resource.MedsAdminOmitSlots;
  public objRecordAdmin = Resource.MedicationAdministrator;

  // override _DataContext: InfrecordadminVM = new InfrecordadminVM();

  override _DataContext: InfrecordadminVM;
  override get DataContext() {
    console.log(this._DataContext);
    return this._DataContext;
  }
  @Input() override set DataContext(value: InfrecordadminVM) {
    this._DataContext = value;
  }

  _ValuesHolder: any;
  @Input() set ValuesHolder(value: any) {
    this.ValuesHolder = value;
  }
  
  CurrentDt: DateTime = CommonBB.GetServerDateTime();

  public LayoutRoot: Grid;
  @ViewChild('LayoutRootTempRef', { read: Grid, static: false })
  set _LayoutRoot(c: Grid) {
    if (c) {
      this.LayoutRoot = c;
    }
  }
  public grdstopcompdet: Grid;
  @ViewChild('grdstopcompdetTempRef', { read: Grid, static: false })
  set _grdstopcompdet(c: Grid) {
    if (c) {
      this.grdstopcompdet = c;
    }
  }
  public bgddoseadmin: Border;
  @ViewChild('bgddoseadminTempRef', { read: Border, static: false })
  set _bgddoseadmin(c: Border) {
    if (c) {
      this.bgddoseadmin = c;
    }
  }
  public bgdwastage: Border;
  @ViewChild('bgdwastageTempRef', { read: Border, static: false })
  set _bgdwastage(c: Border) {
    if (c) {
      this.bgdwastage = c;
    }
  }
  public bgdvoluminfu: Border;
  @ViewChild('bgdvoluminfuTempRef', { read: Border, static: false })
  set _bgdvoluminfu(c: Border) {
    if (c) {
      this.bgdvoluminfu = c;
    }
  }
  public bgdendtime: Border;
  @ViewChild('bgdendtimeTempRef', { read: Border, static: false })
  set _bgdendtime(c: Border) {
    if (c) {
      this.bgdendtime = c;
    }
  }
  public bgdfive: Border;
  @ViewChild('bgdfiveTempRef', { read: Border, static: false }) set _bgdfive(
    c: Border
  ) {
    if (c) {
      this.bgdfive = c;
    }
  }
  public brddoseadmin: Border;
  @ViewChild('brddoseadminTempRef', { read: Border, static: false })
  set _brddoseadmin(c: Border) {
    if (c) {
      this.brddoseadmin = c;
    }
  }
  public brdwastage: Border;
  @ViewChild('brdwastageTempRef', { read: Border, static: false })
  set _brdwastage(c: Border) {
    if (c) {
      this.brdwastage = c;
    }
  }
  public brdvoluminfu: Border;
  @ViewChild('brdvoluminfuTempRef', { read: Border, static: false })
  set _brdvoluminfu(c: Border) {
    if (c) {
      this.brdvoluminfu = c;
    }
  }
  public brdendtime: Border;
  @ViewChild('brdendtimeTempRef', { read: Border, static: false })
  set _brdendtime(c: Border) {
    if (c) {
      this.brdendtime = c;
    }
  }
  public brdfive: Border;
  @ViewChild('brdfiveTempRef', { read: Border, static: false }) set _brdfive(
    c: Border
  ) {
    if (c) {
      this.brdfive = c;
    }
  }
  public lbldoseadmin: iLabel;
  @ViewChild('lbldoseadminTempRef', { read: iLabel, static: false })
  set _lbldoseadmin(c: iLabel) {
    if (c) {
      this.lbldoseadmin = c;
    }
  }
  public stackdoseadmin: StackPanel;
  @ViewChild('stackdoseadminTempRef', { read: StackPanel, static: false })
  set _stackdoseadmin(c: StackPanel) {
    if (c) {
      this.stackdoseadmin = c;
    }
  }
  public txtdoseadmin: iTextBox;
  @ViewChild('txtdoseadminTempRef', { read: iTextBox, static: false })
  set _txtdoseadmin(c: iTextBox) {
    if (c) {
      this.txtdoseadmin = c;
    }
  }
  public lblUOM: iLabel;
  @ViewChild('lblUOMTempRef', { read: iLabel, static: false }) set _lblUOM(
    c: iLabel
  ) {
    if (c) {
      this.lblUOM = c;
    }
  }
  public cboDoseUOM: iComboBox;
  @ViewChild('cboDoseUOMTempRef', { read: iComboBox, static: false })
  set _cboDoseUOM(c: iComboBox) {
    if (c) {
      this.cboDoseUOM = c;
    }
  }
  public lblDoseUOM: iLabel;
  @ViewChild('lblDoseUOMTempRef', { read: iLabel, static: false })
  set _lblDoseUOM(c: iLabel) {
    if (c) {
      this.lblDoseUOM = c;
    }
  }
  public cmdCondDoseImg: iButton;
  @ViewChild('cmdCondDoseImgTempRef', { read: iButton, static: false })
  set _cmdCondDoseImg(c: iButton) {
    if (c) {
      this.cmdCondDoseImg = c;
    }
  }
  public lblwastage: iLabel;
  @ViewChild('lblwastageTempRef', { read: iLabel, static: false })
  set _lblwastage(c: iLabel) {
    if (c) {
      this.lblwastage = c;
    }
  }
  public stackwastage: StackPanel;
  @ViewChild('stackwastageTempRef', { read: StackPanel, static: false })
  set _stackwastage(c: StackPanel) {
    if (c) {
      this.stackwastage = c;
    }
  }
  public txtwastage: iTextBox;
  @ViewChild('txtwastageTempRef', { read: iTextBox, static: false })
  set _txtwastage(c: iTextBox) {
    if (c) {
      this.txtwastage = c;
    }
  }
  public lblwastageUOM: iLabel;
  @ViewChild('lblwastageUOMTempRef', { read: iLabel, static: false })
  set _lblwastageUOM(c: iLabel) {
    if (c) {
      this.lblwastageUOM = c;
    }
  }
  public cbowastageUOM: iComboBox;
  @ViewChild('cbowastageUOMTempRef', { read: iComboBox, static: false })
  set _cbowastageUOM(c: iComboBox) {
    if (c) {
      this.cbowastageUOM = c;
    }
  }
  public lblvolumeinfused1: iLabel;
  @ViewChild('lblvolumeinfused1TempRef', { read: iLabel, static: false })
  set _lblvolumeinfused1(c: iLabel) {
    if (c) {
      this.lblvolumeinfused1 = c;
    }
  }
  public txtvolumeinfused1: iTextBox;
  @ViewChild('txtvolumeinfused1TempRef', { read: iTextBox, static: false })
  set _txtvolumeinfused1(c: iTextBox) {
    if (c) {
      this.txtvolumeinfused1 = c;
    }
  }
  public lbluom2: iLabel;
  @ViewChild('lbluom2TempRef', { read: iLabel, static: false }) set _lbluom2(
    c: iLabel
  ) {
    if (c) {
      this.lbluom2 = c;
    }
  }
  public cbovolUOM: iComboBox;
  @ViewChild('cbovolUOMTempRef', { read: iComboBox, static: false })
  set _cbovolUOM(c: iComboBox) {
    if (c) {
      this.cbovolUOM = c;
    }
  }
  public lblendDateTime: iLabel;
  @ViewChild('lblendDateTimeTempRef', { read: iLabel, static: false })
  set _lblendDateTime(c: iLabel) {
    if (c) {
      this.lblendDateTime = c;
    }
  }
  public dtpendDate: iDateTimePicker;
  @ViewChild('dtpendDateTempRef', { read: iDateTimePicker, static: false })
  set _dtpendDate(c: iDateTimePicker) {
    if (c) {
      this.dtpendDate = c;
    }
  }
  public iTimedendTime: iTimeBox;
  @ViewChild('iTimedendTimeTempRef', { read: iTimeBox, static: false })
  set _iTimedendTime(c: iTimeBox) {
    if (c) {
      this.iTimedendTime = c;
    }
  }
  public bgdrsnstop: Border;
  @ViewChild('bgdrsnstopTempRef', { read: Border, static: false })
  set _bgdrsnstop(c: Border) {
    if (c) {
      this.bgdrsnstop = c;
    }
  }
  public bgdcommmets: Border;
  @ViewChild('bgdcommmetsTempRef', { read: Border, static: false })
  set _bgdcommmets(c: Border) {
    if (c) {
      this.bgdcommmets = c;
    }
  }
  public bgd2: Border;
  @ViewChild('bgd2TempRef', { read: Border, static: false }) set _bgd2(
    c: Border
  ) {
    if (c) {
      this.bgd2 = c;
    }
  }
  public brdcommmets: Border;
  @ViewChild('brdcommmetsTempRef', { read: Border, static: false })
  set _brdcommmets(c: Border) {
    if (c) {
      this.brdcommmets = c;
    }
  }
  public brd2: Border;
  @ViewChild('brd2TempRef', { read: Border, static: false }) set _brd2(
    c: Border
  ) {
    if (c) {
      this.brd2 = c;
    }
  }
  public lblResForstopping: iLabel;
  @ViewChild('lblResForstoppingTempRef', { read: iLabel, static: false })
  set _lblResForstopping(c: iLabel) {
    if (c) {
      this.lblResForstopping = c;
    }
  }
  public cboResForstopping: iComboBox;
  @ViewChild('cboResForstoppingTempRef', { read: iComboBox, static: false })
  set _cboResForstopping(c: iComboBox) {
    if (c) {
      this.cboResForstopping = c;
    }
  }
  public lblComments: iLabel;
  @ViewChild('lblCommentsTempRef', { read: iLabel, static: false })
  set _lblComments(c: iLabel) {
    if (c) {
      this.lblComments = c;
    }
  }
  public txtComments: iTextBox;
  @ViewChild('txtCommentsTempRef', { read: iTextBox, static: false })
  set _txtComments(c: iTextBox) {
    if (c) {
      this.txtComments = c;
    }
  }
  public _contentLoaded: Boolean;

  @ViewChild('_contentLoadedTempRef', { read: Boolean, static: false })
  set __contentLoaded(c: Boolean) {
    if (c) {
      this._contentLoaded = c;
    }
  }


  constructor() {
    super();
    // InitializeComponent();
    // this.dtpendDate.OnDateValueChanged = (s, e) => {
    //   this.dtpendDate_OnDateChange(s, e);
    // };
console.log("mass",this.DataContext);
    this.recordadminVM = this.DataContext;
  }
  ngAfterViewInit(): void {
    this.dtpendDate.OnDateValueChanged = (s, e) => {
      this.dtpendDate_OnDateChange(s, e);
    };
    // this.ChildWindow_Loaded(null,null)
  }
  ngOnInit(): any {
    console.log(
      'Data Context data obtained from InfrecordadminVM',
      this.DataContext
    );

    this.recordadminVM = this.DataContext;

    // this.ChildWindow_Loaded();
    // this.DataContext = this.recordadminVM;
    setTimeout(() => {

      this.ChildWindow_Loaded(null,null)

    }, 0);


  }
  public ChildWindow_Loaded(sender?: Object, e?: RoutedEventArgs): void {
    this.DataContext.InitFormValuesAfterFormLoad();
  }
  public dtpendDate_OnDateChange(sender: Object, e: DateChangedArgs): void {
    if (DateTime.Equals(this.dtpendDate.CurrentDateTime , DateTime.MinValue)) {
      this.dtpendDate.CurrentDateTime = DateTime.Now.Date;
    }
  }
  public cboResNotGiven_SelectionChanged(
    sender: Object,
    // e: Telerik.Windows.Controls.SelectionChangedEventArgs
    e: SelectionChangedEventArgs
  ): void {}

  // GetResourceString(sResource: string, sKey: string) {
  //   if (sResource == 'MedAdmin') {
  //     let oMedicationAdministrator: MedicationAdministrator =
  //       new MedicationAdministrator();
  //     return oMedicationAdministrator.GetResourceString(sKey);
  //   } else if (sResource == 'ObjOmitSlots') {
  //     let oObjOmitSlots: MedsAdminOmitSlots = new MedsAdminOmitSlots();
  //     return oObjOmitSlots.GetResourceString(sKey);
  //   }
  //   return null;
  // }
}
