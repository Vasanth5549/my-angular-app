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
import { InfrecordadminVM } from '../viewmodel/InfrecordadminVM';
import { RoutedEventArgs } from 'src/app/shared/epma-platform/controls/FrameworkElement';
import { CommonBB } from 'src/app/lorappcommonbb/utilities/common';
import { DateChangeEventArgs, iDateTimePicker } from 'src/app/shared/epma-platform/controls/epma-datetimepicker/epma-datetimepicker.component';
import { Resource } from '../resource';
import * as ControlStyles from '../../shared/epma-platform/controls/ControlStyles';

@Component({
  selector: 'InfRecAdmContSummaryView',
  templateUrl: './InfRecAdmContSummaryView.html',
  styleUrls: ['./InfRecAdmContSummaryView.css']
})
export class InfRecAdmContSummaryView extends UserControl {

  public objOmitSlots = Resource.MedsAdminOmitSlots;
  public objRecordAdmin = Resource.MedicationAdministrator;

  public Styles = ControlStyles;

  private LayoutRoot: Grid;
@ViewChild("LayoutRootTempRef", {read:Grid, static: false }) set _LayoutRoot(c: Grid){
  if(c){ this.LayoutRoot  = c; }
};
private brdcurrentstatus: Border;
@ViewChild("brdcurrentstatusTempRef", {read:Border, static: false }) set _brdcurrentstatus(c: Border){
  if(c){ this.brdcurrentstatus  = c; }
};
private lblBordercurrentstatus: iLabel;
@ViewChild("lblBordercurrentstatusTempRef", {read:iLabel, static: false }) set _lblBordercurrentstatus(c: iLabel){
  if(c){ this.lblBordercurrentstatus  = c; }
};
private grdcurrentstatus: Grid;
@ViewChild("grdcurrentstatusTempRef", {read:Grid, static: false }) set _grdcurrentstatus(c: Grid){
  if(c){ this.grdcurrentstatus  = c; }
};
private lbllastaction: iLabel;
@ViewChild("lbllastactionTempRef", {read:iLabel, static: false }) set _lbllastaction(c: iLabel){
  if(c){ this.lbllastaction  = c; }
};
private lbllastactionvalue: iLabel;
@ViewChild("lbllastactionvalueTempRef", {read:iLabel, static: false }) set _lbllastactionvalue(c: iLabel){
  if(c){ this.lbllastactionvalue  = c; }
};
public cmdStrikethroadmin: iButton = new iButton();
@ViewChild("cmdStrikethroadminTempRef", {read:iButton, static: false }) set _cmdStrikethroadmin(c: iButton){
  if(c){ this.cmdStrikethroadmin  = c; }
};
private lbldatetime: iLabel;
@ViewChild("lbldatetimeTempRef", {read:iLabel, static: false }) set _lbldatetime(c: iLabel){
  if(c){ this.lbldatetime  = c; }
};
private lbldatetimevalue: iLabel;
@ViewChild("lbldatetimevalueTempRef", {read:iLabel, static: false }) set _lbldatetimevalue(c: iLabel){
  if(c){ this.lbldatetimevalue  = c; }
};
private lblrecordedat: iLabel;
@ViewChild("lblrecordedatTempRef", {read:iLabel, static: false }) set _lblrecordedat(c: iLabel){
  if(c){ this.lblrecordedat  = c; }
};
private lblrecordedatvalue: iLabel;
@ViewChild("lblrecordedatvalueTempRef", {read:iLabel, static: false }) set _lblrecordedatvalue(c: iLabel){
  if(c){ this.lblrecordedatvalue  = c; }
};
private lblrecordedby: iLabel;
@ViewChild("lblrecordedbyTempRef", {read:iLabel, static: false }) set _lblrecordedby(c: iLabel){
  if(c){ this.lblrecordedby  = c; }
};
private lblrecordedbyvalue: iLabel;
@ViewChild("lblrecordedbyvalueTempRef", {read:iLabel, static: false }) set _lblrecordedbyvalue(c: iLabel){
  if(c){ this.lblrecordedbyvalue  = c; }
};
private lbldose: iLabel;
@ViewChild("lbldoseTempRef", {read:iLabel, static: false }) set _lbldose(c: iLabel){
  if(c){ this.lbldose  = c; }
};
private lbldosevalue: iLabel;
@ViewChild("lbldosevalueTempRef", {read:iLabel, static: false }) set _lbldosevalue(c: iLabel){
  if(c){ this.lbldosevalue  = c; }
};
private lblInfusionrate: iLabel;
@ViewChild("lblInfusionrateTempRef", {read:iLabel, static: false }) set _lblInfusionrate(c: iLabel){
  if(c){ this.lblInfusionrate  = c; }
};
private lblInfusionratevalue: iLabel;
@ViewChild("lblInfusionratevalueTempRef", {read:iLabel, static: false }) set _lblInfusionratevalue(c: iLabel){
  if(c){ this.lblInfusionratevalue  = c; }
};
private lbldrprate: iLabel;
@ViewChild("lbldrprateTempRef", {read:iLabel, static: false }) set _lbldrprate(c: iLabel){
  if(c){ this.lbldrprate  = c; }
};
private lbldripratevalue: iLabel;
@ViewChild("lbldripratevalueTempRef", {read:iLabel, static: false }) set _lbldripratevalue(c: iLabel){
  if(c){ this.lbldripratevalue  = c; }
};
private lblConcentration: iLabel;
@ViewChild("lblConcentrationTempRef", {read:iLabel, static: false }) set _lblConcentration(c: iLabel){
  if(c){ this.lblConcentration  = c; }
};
private lblConcentrationvalue: iLabel;
@ViewChild("lblConcentrationvalueTempRef", {read:iLabel, static: false }) set _lblConcentrationvalue(c: iLabel){
  if(c){ this.lblConcentrationvalue  = c; }
};
private lblInfperiod: iLabel;
@ViewChild("lblInfperiodTempRef", {read:iLabel, static: false }) set _lblInfperiod(c: iLabel){
  if(c){ this.lblInfperiod  = c; }
};
private lblInfperiodvalue: iLabel;
@ViewChild("lblInfperiodvalueTempRef", {read:iLabel, static: false }) set _lblInfperiodvalue(c: iLabel){
  if(c){ this.lblInfperiodvalue  = c; }
};
private lblSite: iLabel;
@ViewChild("lblSiteTempRef", {read:iLabel, static: false }) set _lblSite(c: iLabel){
  if(c){ this.lblSite  = c; }
};
private lblSiteVal: iLabel;
@ViewChild("lblSiteValTempRef", {read:iLabel, static: false }) set _lblSiteVal(c: iLabel){
  if(c){ this.lblSiteVal  = c; }
};
private lblRoute: iLabel;
@ViewChild("lblRouteTempRef", {read:iLabel, static: false }) set _lblRoute(c: iLabel){
  if(c){ this.lblRoute  = c; }
};
private lblRoutevalue: iLabel;
@ViewChild("lblRoutevalueTempRef", {read:iLabel, static: false }) set _lblRoutevalue(c: iLabel){
  if(c){ this.lblRoutevalue  = c; }
};
private lbLumen: iLabel;
@ViewChild("lbLumenTempRef", {read:iLabel, static: false }) set _lbLumen(c: iLabel){
  if(c){ this.lbLumen  = c; }
};
private lblLumenVal: iLabel;
@ViewChild("lblLumenValTempRef", {read:iLabel, static: false }) set _lblLumenVal(c: iLabel){
  if(c){ this.lblLumenVal  = c; }
};
private lblDeliveryDevice: iLabel;
@ViewChild("lblDeliveryDeviceTempRef", {read:iLabel, static: false }) set _lblDeliveryDevice(c: iLabel){
  if(c){ this.lblDeliveryDevice  = c; }
};
private lblDeliveryDeviceVal: iLabel;
@ViewChild("lblDeliveryDeviceValTempRef", {read:iLabel, static: false }) set _lblDeliveryDeviceVal(c: iLabel){
  if(c){ this.lblDeliveryDeviceVal  = c; }
};
private lbltotvolinf: iLabel;
@ViewChild("lbltotvolinfTempRef", {read:iLabel, static: false }) set _lbltotvolinf(c: iLabel){
  if(c){ this.lbltotvolinf  = c; }
};
private lbltotvolinfvalue: iLabel;
@ViewChild("lbltotvolinfvalueTempRef", {read:iLabel, static: false }) set _lbltotvolinfvalue(c: iLabel){
  if(c){ this.lbltotvolinfvalue  = c; }
};
private lblcurrentbagvol: iLabel;
@ViewChild("lblcurrentbagvolTempRef", {read:iLabel, static: false }) set _lblcurrentbagvol(c: iLabel){
  if(c){ this.lblcurrentbagvol  = c; }
};
private lblcurrentbagvoltvalue: iLabel;
@ViewChild("lblcurrentbagvoltvalueTempRef", {read:iLabel, static: false }) set _lblcurrentbagvoltvalue(c: iLabel){
  if(c){ this.lblcurrentbagvoltvalue  = c; }
};
private lblAdministeredby: iLabel;
@ViewChild("lblAdministeredbyTempRef", {read:iLabel, static: false }) set _lblAdministeredby(c: iLabel){
  if(c){ this.lblAdministeredby  = c; }
};
private lblAdministeredbyvalue: iLabel;
@ViewChild("lblAdministeredbyvalueTempRef", {read:iLabel, static: false }) set _lblAdministeredbyvalue(c: iLabel){
  if(c){ this.lblAdministeredbyvalue  = c; }
};
private lblwitnesedby: iLabel;
@ViewChild("lblwitnesedbyTempRef", {read:iLabel, static: false }) set _lblwitnesedby(c: iLabel){
  if(c){ this.lblwitnesedby  = c; }
};
private lblwitnesedbyvalue: iLabel;
@ViewChild("lblwitnesedbyvalueTempRef", {read:iLabel, static: false }) set _lblwitnesedbyvalue(c: iLabel){
  if(c){ this.lblwitnesedbyvalue  = c; }
};
private lblreason: iLabel;
@ViewChild("lblreasonTempRef", {read:iLabel, static: false }) set _lblreason(c: iLabel){
  if(c){ this.lblreason  = c; }
};
private lblreasonvalue: iLabel;
@ViewChild("lblreasonvalueTempRef", {read:iLabel, static: false }) set _lblreasonvalue(c: iLabel){
  if(c){ this.lblreasonvalue  = c; }
};
private lblcoments: iLabel;
@ViewChild("lblcomentsTempRef", {read:iLabel, static: false }) set _lblcoments(c: iLabel){
  if(c){ this.lblcoments  = c; }
};
private lblcomentsvalue: iLabel;
@ViewChild("lblcomentsvalueTempRef", {read:iLabel, static: false }) set _lblcomentsvalue(c: iLabel){
  if(c){ this.lblcomentsvalue  = c; }
};
private _contentLoaded: Boolean;
@ViewChild("_contentLoadedTempRef", {read:Boolean, static: false }) set __contentLoaded(c: Boolean){
  if(c){ this._contentLoaded  = c; }
};

override _DataContext: InfrecordadminVM;

  override get DataContext() {
    //console.log(this._DataContext);
    return this._DataContext;
  }
  @Input() override set DataContext(value: InfrecordadminVM) {
    this._DataContext = value;
  }
    constructor() {
      super();
        // InitializeComponent();
        this.Loaded =()=>{console.log(this.DataContext);};
    }
}
