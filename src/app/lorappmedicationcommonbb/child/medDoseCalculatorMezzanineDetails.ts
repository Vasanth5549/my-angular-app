import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { StringBuilder,ProfileFactoryType,ContextManager,Convert,AppActivity} from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp,Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison,AppDialogEventargs, AppDialogResult, DelegateArgs, DialogComponentArgs, WindowButtonType, iAppDialogWindow } from 'epma-platform/models';
import { AppDialog, Border, iCheckBox, iLabel } from 'epma-platform/controls';
import { HelperService} from 'epma-platform/soapclient';
import '../../shared/epma-platform/models/string.extensions';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
import {Grid } from "src/app/shared/epma-platform/controls/epma-grid-helpers/grid-extension";
import * as ControlStyles from "../../shared/epma-platform/controls/ControlStyles";
import { MedDoseDetails } from '../view/meddosedetails';
import { PrescriptionItemDetailsVM } from '../viewmodel/prescriptionitemdetailsvm';
import { DoseCalculator } from '../resource/dosecalculator.designer';
import { Resource } from '../resource';

@Component({
    selector: 'medDoseCalculatorMezzanineDetails',
    templateUrl: './meddoseCalculatormezzaninedetails.html'
})

    export class medDoseCalculatorMezzanineDetails extends iAppDialogWindow {
    public Styles = ControlStyles;
    public LayoutRoot: Grid;
    //override _DataContext:PrescriptionItemDetailsVM;
    override _DataContext;
    override get DataContext() {
        return this._DataContext;
    }
    @Input() override set DataContext(value: any) {
        this._DataContext = value;
    }
      @ViewChild("LayoutRootTempRef", {read:Grid, static: false }) set _LayoutRoot(c: Grid){
          if(c){ this.LayoutRoot  = c; }
      };
    public brdcalcdose: Border;
      @ViewChild("brdcalcdoseTempRef", {read:Border, static: false }) set _brdcalcdose(c: Border){
          if(c){ this.brdcalcdose  = c; }
      };
    public lblAlwsUseDoseCal: iLabel = new iLabel();
      @ViewChild("lblAlwsUseDoseCalTempRef", {read:iLabel, static: false }) set _lblAlwsUseDoseCal(c: iLabel){
          if(c){ this.lblAlwsUseDoseCal  = c; }
      };
    public lblDoseCalfr: iLabel = new iLabel();
      @ViewChild("lblDoseCalfrTempRef", {read:iLabel, static: false }) set _lblDoseCalfr(c: iLabel){
          if(c){ this.lblDoseCalfr  = c; }
      };
    public lblfrqnc: iLabel = new iLabel();
      @ViewChild("lblfrqncTempRef", {read:iLabel, static: false }) set _lblfrqnc(c: iLabel){
          if(c){ this.lblfrqnc  = c; }
      };
    public lblDosecalBsedon: iLabel = new iLabel();
      @ViewChild("lblDosecalBsedonTempRef", {read:iLabel, static: false }) set _lblDosecalBsedon(c: iLabel){
          if(c){ this.lblDosecalBsedon  = c; }
      };
    public lblBsaformula: iLabel = new iLabel();
      @ViewChild("lblBsaformulaTempRef", {read:iLabel, static: false }) set _lblBsaformula(c: iLabel){
          if(c){ this.lblBsaformula  = c; }
      };
    public lblDfltwttype: iLabel = new iLabel();
      @ViewChild("lblDfltwttypeTempRef", {read:iLabel, static: false }) set _lblDfltwttype(c: iLabel){
          if(c){ this.lblDfltwttype  = c; }
      };
    public lblReqdos: iLabel = new iLabel();
      @ViewChild("lblReqdosTempRef", {read:iLabel, static: false }) set _lblReqdos(c: iLabel){
          if(c){ this.lblReqdos  = c; }
      };
    public meddosedbrdcalcdose1: Border;
      @ViewChild("meddosedbrdcalcdose1TempRef", {read:Border, static: false }) set _meddosedbrdcalcdose1(c: Border){
          if(c){ this.meddosedbrdcalcdose1  = c; }
      };
    public meddosedbrdcalcdose12: Border;
      @ViewChild("meddosedbrdcalcdose12TempRef", {read:Border, static: false }) set _meddosedbrdcalcdose12(c: Border){
          if(c){ this.meddosedbrdcalcdose12  = c; }
      };
    public meddosedbrdcalcdose13: Border;
      @ViewChild("meddosedbrdcalcdose13TempRef", {read:Border, static: false }) set _meddosedbrdcalcdose13(c: Border){
          if(c){ this.meddosedbrdcalcdose13  = c; }
      };
    public meddosedbrdcalcdose14: Border;
      @ViewChild("meddosedbrdcalcdose14TempRef", {read:Border, static: false }) set _meddosedbrdcalcdose14(c: Border){
          if(c){ this.meddosedbrdcalcdose14  = c; }
      };
    public meddosedbrdcalcdose15: Border;
      @ViewChild("meddosedbrdcalcdose15TempRef", {read:Border, static: false }) set _meddosedbrdcalcdose15(c: Border){
          if(c){ this.meddosedbrdcalcdose15  = c; }
      };
    public meddosedbrdcalcdose16: Border;
      @ViewChild("meddosedbrdcalcdose16TempRef", {read:Border, static: false }) set _meddosedbrdcalcdose16(c: Border){
          if(c){ this.meddosedbrdcalcdose16  = c; }
      };
    public meddosedbrdcalcdose17: Border;
      @ViewChild("meddosedbrdcalcdose17TempRef", {read:Border, static: false }) set _meddosedbrdcalcdose17(c: Border){
          if(c){ this.meddosedbrdcalcdose17  = c; }
      };
    public chkAlwsUseDoseCal: iCheckBox = new iCheckBox();
    @ViewChild("chkAlwsUseDoseCalTempRef", { read: iCheckBox, static: true }) set _chkAlwsUseDoseCal(c: iCheckBox) {
          if(c){ this.chkAlwsUseDoseCal  = c; }
      };
    public lblDoseCalfrvalue: iLabel = new iLabel();
      @ViewChild("lblDoseCalfrvalueTempRef", {read:iLabel, static: false }) set _lblDoseCalfrvalue(c: iLabel){
          if(c){ this.lblDoseCalfrvalue  = c; }
      };
    public lblfrqncvl: iLabel = new iLabel();
      @ViewChild("lblfrqncvlTempRef", {read:iLabel, static: false }) set _lblfrqncvl(c: iLabel){
          if(c){ this.lblfrqncvl  = c; }
      };
    public lblwtvl: iLabel = new iLabel();
      @ViewChild("lblwtvlTempRef", {read:iLabel, static: false }) set _lblwtvl(c: iLabel){
          if(c){ this.lblwtvl  = c; }
      };
    public lblbsafrmlvl: iLabel = new iLabel();
      @ViewChild("lblbsafrmlvlTempRef", {read:iLabel, static: false }) set _lblbsafrmlvl(c: iLabel){
          if(c){ this.lblbsafrmlvl  = c; }
      };
    public lbldfltwttypevl: iLabel = new iLabel();
      @ViewChild("lbldfltwttypevlTempRef", {read:iLabel, static: false }) set _lbldfltwttypevl(c: iLabel){
          if(c){ this.lbldfltwttypevl  = c; }
      };
    public lblreqdsvl: iLabel = new iLabel();
      @ViewChild("lblreqdsvlTempRef", {read:iLabel, static: false }) set _lblreqdsvl(c: iLabel){
          if(c){ this.lblreqdsvl  = c; }
      };
    DosecalcMazznine = Resource.DoseCalculator;
        constructor() {
          super();
            //InitializeComponent();
        }
    }