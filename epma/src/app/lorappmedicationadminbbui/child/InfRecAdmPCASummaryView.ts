import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { StringBuilder,ProfileFactoryType,ContextManager,Convert,AppActivity} from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp,Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison,AppDialogEventargs, AppDialogResult, DelegateArgs, DialogComponentArgs, WindowButtonType } from 'epma-platform/models';
import { AppDialog, Border, Grid, UserControl, iButton, iLabel } from 'epma-platform/controls';
import { HelperService} from 'epma-platform/soapclient';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
import { InfrecordadminVM } from '../viewmodel/InfrecordadminVM';
import { Resource } from '../resource';
import * as ControlStyles from "../../shared/epma-platform/controls/ControlStyles";

@Component({
  selector: 'InfRecAdmPCASummaryView',
  templateUrl: './InfRecAdmPCASummaryView.html',
  styleUrls:['./InfRecAdmPCASummaryView.css']
})

  export class InfRecAdmPCASummaryView extends UserControl {
    
public LayoutRoot: Grid = new Grid();
@ViewChild("LayoutRootTempRef", {read:Grid, static: false }) set _LayoutRoot(c: Grid){
    if(c){ this.LayoutRoot  = c; }
};
public brdcurrentstatus: Border = new Border();
@ViewChild("brdcurrentstatusTempRef", {read:Border, static: false }) set _brdcurrentstatus(c: Border){
    if(c){ this.brdcurrentstatus  = c; }
};
public lblBordercurrentstatus: iLabel= new iLabel();
@ViewChild("lblBordercurrentstatusTempRef", {read:iLabel, static: false }) set _lblBordercurrentstatus(c: iLabel){
    if(c){ this.lblBordercurrentstatus  = c; }
};
public grdcurrentstatus: Grid = new Grid();
@ViewChild("grdcurrentstatusTempRef", {read:Grid, static: false }) set _grdcurrentstatus(c: Grid){
    if(c){ this.grdcurrentstatus  = c; }
};
public lbllastaction: iLabel= new iLabel();
@ViewChild("lbllastactionTempRef", {read:iLabel, static: false }) set _lbllastaction(c: iLabel){
    if(c){ this.lbllastaction  = c; }
};
public lbllastactionvalue: iLabel= new iLabel();
@ViewChild("lbllastactionvalueTempRef", {read:iLabel, static: false }) set _lbllastactionvalue(c: iLabel){
    if(c){ this.lbllastactionvalue  = c; }
};
public cmdStrikethroadmin: iButton = new iButton();
@ViewChild("cmdStrikethroadminTempRef", {read:iButton, static: false }) set _cmdStrikethroadmin(c: iButton){
    if(c){ this.cmdStrikethroadmin  = c; }
};
public lbldatetime: iLabel= new iLabel();
@ViewChild("lbldatetimeTempRef", {read:iLabel, static: false }) set _lbldatetime(c: iLabel){
    if(c){ this.lbldatetime  = c; }
};
public lbldatetimevalue: iLabel= new iLabel();
@ViewChild("lbldatetimevalueTempRef", {read:iLabel, static: false }) set _lbldatetimevalue(c: iLabel){
    if(c){ this.lbldatetimevalue  = c; }
};
public lblrecordedat: iLabel= new iLabel();
@ViewChild("lblrecordedatTempRef", {read:iLabel, static: false }) set _lblrecordedat(c: iLabel){
    if(c){ this.lblrecordedat  = c; }
};
public lblrecordedatvalue: iLabel= new iLabel();
@ViewChild("lblrecordedatvalueTempRef", {read:iLabel, static: false }) set _lblrecordedatvalue(c: iLabel){
    if(c){ this.lblrecordedatvalue  = c; }
};
public lblrecordedby: iLabel= new iLabel();
@ViewChild("lblrecordedbyTempRef", {read:iLabel, static: false }) set _lblrecordedby(c: iLabel){
    if(c){ this.lblrecordedby  = c; }
};
public lblrecordedbyvalue: iLabel= new iLabel();
@ViewChild("lblrecordedbyvalueTempRef", {read:iLabel, static: false }) set _lblrecordedbyvalue(c: iLabel){
    if(c){ this.lblrecordedbyvalue  = c; }
};
public lblbolus1: iLabel= new iLabel();
@ViewChild("lblbolus1TempRef", {read:iLabel, static: false }) set _lblbolus1(c: iLabel){
    if(c){ this.lblbolus1  = c; }
};
public lblbolus1value: iLabel= new iLabel();
@ViewChild("lblbolus1valueTempRef", {read:iLabel, static: false }) set _lblbolus1value(c: iLabel){
    if(c){ this.lblbolus1value  = c; }
};
public lblbkinfusionrate: iLabel= new iLabel();
@ViewChild("lblbkinfusionrateTempRef", {read:iLabel, static: false }) set _lblbkinfusionrate(c: iLabel){
    if(c){ this.lblbkinfusionrate  = c; }
};
public lblbkinfusionratevalue: iLabel= new iLabel();
@ViewChild("lblbkinfusionratevalueTempRef", {read:iLabel, static: false }) set _lblbkinfusionratevalue(c: iLabel){
    if(c){ this.lblbkinfusionratevalue  = c; }
};
public lblConcentration: iLabel= new iLabel();
@ViewChild("lblConcentrationTempRef", {read:iLabel, static: false }) set _lblConcentration(c: iLabel){
    if(c){ this.lblConcentration  = c; }
};
public lblConcentrationvalue: iLabel= new iLabel();
@ViewChild("lblConcentrationvalueTempRef", {read:iLabel, static: false }) set _lblConcentrationvalue(c: iLabel){
    if(c){ this.lblConcentrationvalue  = c; }
};
public lblInfperiod: iLabel= new iLabel();
@ViewChild("lblInfperiodTempRef", {read:iLabel, static: false }) set _lblInfperiod(c: iLabel){
    if(c){ this.lblInfperiod  = c; }
};
public lblInfperiodvalue: iLabel= new iLabel();
@ViewChild("lblInfperiodvalueTempRef", {read:iLabel, static: false }) set _lblInfperiodvalue(c: iLabel){
    if(c){ this.lblInfperiodvalue  = c; }
};
public lblSite: iLabel= new iLabel();
@ViewChild("lblSiteTempRef", {read:iLabel, static: false }) set _lblSite(c: iLabel){
    if(c){ this.lblSite  = c; }
};
public lblSiteVal: iLabel= new iLabel();
@ViewChild("lblSiteValTempRef", {read:iLabel, static: false }) set _lblSiteVal(c: iLabel){
    if(c){ this.lblSiteVal  = c; }
};
public lblRoute: iLabel= new iLabel();
@ViewChild("lblRouteTempRef", {read:iLabel, static: false }) set _lblRoute(c: iLabel){
    if(c){ this.lblRoute  = c; }
};
public lblRoutevalue: iLabel= new iLabel();
@ViewChild("lblRoutevalueTempRef", {read:iLabel, static: false }) set _lblRoutevalue(c: iLabel){
    if(c){ this.lblRoutevalue  = c; }
};
public lbLumen: iLabel= new iLabel();
@ViewChild("lbLumenTempRef", {read:iLabel, static: false }) set _lbLumen(c: iLabel){
    if(c){ this.lbLumen  = c; }
};
public lblLumenVal: iLabel= new iLabel();
@ViewChild("lblLumenValTempRef", {read:iLabel, static: false }) set _lblLumenVal(c: iLabel){
    if(c){ this.lblLumenVal  = c; }
};
public lblDeliveryDevice: iLabel= new iLabel();
@ViewChild("lblDeliveryDeviceTempRef", {read:iLabel, static: false }) set _lblDeliveryDevice(c: iLabel){
    if(c){ this.lblDeliveryDevice  = c; }
};
public lblDeliveryDeviceVal: iLabel= new iLabel();
@ViewChild("lblDeliveryDeviceValTempRef", {read:iLabel, static: false }) set _lblDeliveryDeviceVal(c: iLabel){
    if(c){ this.lblDeliveryDeviceVal  = c; }
};
public lblbagvol: iLabel= new iLabel();
@ViewChild("lblbagvolTempRef", {read:iLabel, static: false }) set _lblbagvol(c: iLabel){
    if(c){ this.lblbagvol  = c; }
};
public lblbagvoltvalue: iLabel= new iLabel();
@ViewChild("lblbagvoltvalueTempRef", {read:iLabel, static: false }) set _lblbagvoltvalue(c: iLabel){
    if(c){ this.lblbagvoltvalue  = c; }
};
public lblAdministeredby: iLabel= new iLabel();
@ViewChild("lblAdministeredbyTempRef", {read:iLabel, static: false }) set _lblAdministeredby(c: iLabel){
    if(c){ this.lblAdministeredby  = c; }
};
public lblAdministeredbyvalue: iLabel= new iLabel();
@ViewChild("lblAdministeredbyvalueTempRef", {read:iLabel, static: false }) set _lblAdministeredbyvalue(c: iLabel){
    if(c){ this.lblAdministeredbyvalue  = c; }
};
public lblwitnesedby: iLabel= new iLabel();
@ViewChild("lblwitnesedbyTempRef", {read:iLabel, static: false }) set _lblwitnesedby(c: iLabel){
    if(c){ this.lblwitnesedby  = c; }
};
public lblwitnesedbyvalue: iLabel= new iLabel();
@ViewChild("lblwitnesedbyvalueTempRef", {read:iLabel, static: false }) set _lblwitnesedbyvalue(c: iLabel){
    if(c){ this.lblwitnesedbyvalue  = c; }
};
public lblreason: iLabel= new iLabel();
@ViewChild("lblreasonTempRef", {read:iLabel, static: false }) set _lblreason(c: iLabel){
    if(c){ this.lblreason  = c; }
};
public lblreasonvalue: iLabel= new iLabel();
@ViewChild("lblreasonvalueTempRef", {read:iLabel, static: false }) set _lblreasonvalue(c: iLabel){
    if(c){ this.lblreasonvalue  = c; }
};
public lblcoments: iLabel= new iLabel();
@ViewChild("lblcomentsTempRef", {read:iLabel, static: false }) set _lblcoments(c: iLabel){
    if(c){ this.lblcoments  = c; }
};
public lblcomentsvalue: iLabel= new iLabel();
@ViewChild("lblcomentsvalueTempRef", {read:iLabel, static: false }) set _lblcomentsvalue(c: iLabel){
    if(c){ this.lblcomentsvalue  = c; }
};

  whiteBorder: string | object = ControlStyles.whiteBorder;
  InnerBG: string | object = ControlStyles.InnerBG;
  LzoPageBG: any = ControlStyles.LzoPageBG;
  public objRecordAdmin = Resource.MedicationAdministrator;
  override _DataContext: InfrecordadminVM = new InfrecordadminVM();
  override get DataContext() {
    console.log(this._DataContext);
    return this._DataContext;
  }
  @Input() override set DataContext(value: InfrecordadminVM) {
    this._DataContext = value;
  }

      constructor() {
        super();
        this.DataContext = new InfrecordadminVM();
         
      }
      ngOnInit(): void {
      }
  }
