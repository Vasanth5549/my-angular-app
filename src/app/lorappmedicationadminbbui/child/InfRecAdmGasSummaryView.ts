import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { StringBuilder,ProfileFactoryType,ContextManager,Convert,AppActivity} from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp,Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison,AppDialogEventargs, AppDialogResult, DelegateArgs, DialogComponentArgs, WindowButtonType, SelectionChangedEventArgs, Visibility } from 'epma-platform/models';
import { AppDialog, Border, Grid, iButton, iComboBox, iLabel, iTextBox, iTimeBox, UserControl } from 'epma-platform/controls';
import { HelperService} from 'epma-platform/soapclient';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
import * as ControlStyles from '../../shared/epma-platform/controls/ControlStyles';
import { Resource } from '../resource';
import { InfrecordadminVM } from '../viewmodel/InfrecordadminVM';
@Component({
  selector: 'InfRecAdmGasSummaryView',
  templateUrl: './InfRecAdmGasSummaryView.html',
  styleUrls: ['./InfRecAdmGasSummaryView.css']
})
export class InfRecAdmGasSummaryView extends UserControl {
  public LayoutRoot: Grid;
  @ViewChild('LayoutRootTempRef', { read: Grid, static: false })
  set _LayoutRoot(c: Grid) {
    if (c) {
      this.LayoutRoot = c;
    }
  }
  public brdcurrentstatus: Border;
  @ViewChild('brdcurrentstatusTempRef', { read: Border, static: false })
  set _brdcurrentstatus(c: Border) {
    if (c) {
      this.brdcurrentstatus = c;
    }
  }
  public lblBordercurrentstatus: iLabel;
  @ViewChild('lblBordercurrentstatusTempRef', { read: iLabel, static: false })
  set _lblBordercurrentstatus(c: iLabel) {
    if (c) {
      this.lblBordercurrentstatus = c;
    }
  }
  public grdcurrentstatus: Grid;
  @ViewChild('grdcurrentstatusTempRef', { read: Grid, static: false })
  set _grdcurrentstatus(c: Grid) {
    if (c) {
      this.grdcurrentstatus = c;
    }
  }
  public lbllastaction: iLabel;
  @ViewChild('lbllastactionTempRef', { read: iLabel, static: false })
  set _lbllastaction(c: iLabel) {
    if (c) {
      this.lbllastaction = c;
    }
  }
  public lbllastactionvalue: iLabel;
  @ViewChild('lbllastactionvalueTempRef', { read: iLabel, static: false })
  set _lbllastactionvalue(c: iLabel) {
    if (c) {
      this.lbllastactionvalue = c;
    }
  }
  public cmdStrikethroadmin: iButton;
  @ViewChild('cmdStrikethroadminTempRef', { read: iButton, static: false })
  set _cmdStrikethroadmin(c: iButton) {
    if (c) {
      this.cmdStrikethroadmin = c;
    }
  }
  public lbldatetime: iLabel;
  @ViewChild('lbldatetimeTempRef', { read: iLabel, static: false })
  set _lbldatetime(c: iLabel) {
    if (c) {
      this.lbldatetime = c;
    }
  }
  public lbldatetimevalue: iLabel;
  @ViewChild('lbldatetimevalueTempRef', { read: iLabel, static: false })
  set _lbldatetimevalue(c: iLabel) {
    if (c) {
      this.lbldatetimevalue = c;
    }
  }
  public lblrecordedat: iLabel;
  @ViewChild('lblrecordedatTempRef', { read: iLabel, static: false })
  set _lblrecordedat(c: iLabel) {
    if (c) {
      this.lblrecordedat = c;
    }
  }
  public lblrecordedatvalue: iLabel;
  @ViewChild('lblrecordedatvalueTempRef', { read: iLabel, static: false })
  set _lblrecordedatvalue(c: iLabel) {
    if (c) {
      this.lblrecordedatvalue = c;
    }
  }
  public lblrecordedby: iLabel;
  @ViewChild('lblrecordedbyTempRef', { read: iLabel, static: false })
  set _lblrecordedby(c: iLabel) {
    if (c) {
      this.lblrecordedby = c;
    }
  }
  public lblrecordedbyvalue: iLabel;
  @ViewChild('lblrecordedbyvalueTempRef', { read: iLabel, static: false })
  set _lblrecordedbyvalue(c: iLabel) {
    if (c) {
      this.lblrecordedbyvalue = c;
    }
  }
  public lblflowrate: iLabel;
  @ViewChild('lblflowrateTempRef', { read: iLabel, static: false })
  set _lblflowrate(c: iLabel) {
    if (c) {
      this.lblflowrate = c;
    }
  }
  public lblflowratevalue: iLabel;
  @ViewChild('lblflowratevalueTempRef', { read: iLabel, static: false })
  set _lblflowratevalue(c: iLabel) {
    if (c) {
      this.lblflowratevalue = c;
    }
  }
  public lblhumidification: iLabel;
  @ViewChild('lblhumidificationTempRef', { read: iLabel, static: false })
  set _lblhumidification(c: iLabel) {
    if (c) {
      this.lblhumidification = c;
    }
  }
  public lblhumidCode: iLabel;
  @ViewChild('lblhumidCodeTempRef', { read: iLabel, static: false })
  set _lblhumidCode(c: iLabel) {
    if (c) {
      this.lblhumidCode = c;
    }
  }
  public lblRoute: iLabel;
  @ViewChild('lblRouteTempRef', { read: iLabel, static: false }) set _lblRoute(
    c: iLabel
  ) {
    if (c) {
      this.lblRoute = c;
    }
  }
  public lblRoutevalue: iLabel;
  @ViewChild('lblRoutevalueTempRef', { read: iLabel, static: false })
  set _lblRoutevalue(c: iLabel) {
    if (c) {
      this.lblRoutevalue = c;
    }
  }
  public lblDeliveryDevice: iLabel;
  @ViewChild('lblDeliveryDeviceTempRef', { read: iLabel, static: false })
  set _lblDeliveryDevice(c: iLabel) {
    if (c) {
      this.lblDeliveryDevice = c;
    }
  }
  public lblDeliveryDeviceVal: iLabel;
  @ViewChild('lblDeliveryDeviceValTempRef', { read: iLabel, static: false })
  set _lblDeliveryDeviceVal(c: iLabel) {
    if (c) {
      this.lblDeliveryDeviceVal = c;
    }
  }
  public lblAdministeredby: iLabel;
  @ViewChild('lblAdministeredbyTempRef', { read: iLabel, static: false })
  set _lblAdministeredby(c: iLabel) {
    if (c) {
      this.lblAdministeredby = c;
    }
  }
  public lblAdministeredbyvalue: iLabel;
  @ViewChild('lblAdministeredbyvalueTempRef', { read: iLabel, static: false })
  set _lblAdministeredbyvalue(c: iLabel) {
    if (c) {
      this.lblAdministeredbyvalue = c;
    }
  }
  public lblwitnesedby: iLabel;
  @ViewChild('lblwitnesedbyTempRef', { read: iLabel, static: false })
  set _lblwitnesedby(c: iLabel) {
    if (c) {
      this.lblwitnesedby = c;
    }
  }
  public lblwitnesedbyvalue: iLabel;
  @ViewChild('lblwitnesedbyvalueTempRef', { read: iLabel, static: false })
  set _lblwitnesedbyvalue(c: iLabel) {
    if (c) {
      this.lblwitnesedbyvalue = c;
    }
  }
  public lblreason: iLabel;
  @ViewChild('lblreasonTempRef', { read: iLabel, static: false })
  set _lblreason(c: iLabel) {
    if (c) {
      this.lblreason = c;
    }
  }
  public lblreasonvalue: iLabel;
  @ViewChild('lblreasonvalueTempRef', { read: iLabel, static: false })
  set _lblreasonvalue(c: iLabel) {
    if (c) {
      this.lblreasonvalue = c;
    }
  }
  public lblcoments: iLabel;
  @ViewChild('lblcomentsTempRef', { read: iLabel, static: false })
  set _lblcoments(c: iLabel) {
    if (c) {
      this.lblcoments = c;
    }
  }
  public lblcomentsvalue: iLabel;
  @ViewChild('lblcomentsvalueTempRef', { read: iLabel, static: false })
  set _lblcomentsvalue(c: iLabel) {
    if (c) {
      this.lblcomentsvalue = c;
    }
  }
  whiteBorder: string | object = ControlStyles.whiteBorder;
  InnerBG: string | object = ControlStyles.InnerBG;
  LzoPageBG: any = ControlStyles.LzoPageBG;

  public objRecordAdmin = Resource.MedicationAdministrator;

  override _DataContext: InfrecordadminVM = new InfrecordadminVM();

  override get DataContext() {
    //console.log(this._DataContext);
    return this._DataContext;
  }
  @Input() override set DataContext(value: InfrecordadminVM) {
    this._DataContext = value;
  }
  constructor() {
    super();
  }
}
