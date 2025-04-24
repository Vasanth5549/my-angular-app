import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { StringBuilder,ProfileFactoryType,ContextManager,Convert,AppActivity} from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp,Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison,AppDialogEventargs, AppDialogResult, DelegateArgs, DialogComponentArgs, WindowButtonType, iAppDialogWindow } from 'epma-platform/models';
import { AppDialog, Grid, iComboBox, iLabel, iRadioButton } from 'epma-platform/controls';
import { HelperService} from 'epma-platform/soapclient';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
import * as ControlStyles from 'src/app/shared/epma-platform/controls/ControlStyles';
import { RoutedEventArgs } from 'src/app/shared/epma-platform/controls/FrameworkElement';
import { Resource } from '../resource';
  
@Component({
    selector: 'app-frminfusionratecalculator',
    templateUrl: './frminfusionratecalculator.html',
    styles: [],
})

    export class frmInfusionratecalculator extends iAppDialogWindow {
        
        public Styles = ControlStyles;
        public resKey = Resource.MedicationForm;
        public resInfKey = Resource.Infusion;

        override _DataContext;
        override get DataContext() {
            return this._DataContext;
        }
        @Input() override set DataContext(value: any) {
            this._DataContext = value;
        }

      private LayoutRoot: Grid;
      @ViewChild("LayoutRootTempRef", {read:Grid, static: false }) set _LayoutRoot(c: Grid){
          if(c){ this.LayoutRoot  = c; }
      };
      private LayoutRoot1: Grid;
      @ViewChild("LayoutRoot1TempRef", {read:Grid, static: false }) set _LayoutRoot1(c: Grid){
          if(c){ this.LayoutRoot1  = c; }
      };
      private lblPrescribedDose: iLabel;
      @ViewChild("lblPrescribedDoseTempRef", {read:iLabel, static: false }) set _lblPrescribedDose(c: iLabel){
          if(c){ this.lblPrescribedDose  = c; }
      };
      private lblPrescribedVolume: iLabel;
      @ViewChild("lblPrescribedVolumeTempRef", {read:iLabel, static: false }) set _lblPrescribedVolume(c: iLabel){
          if(c){ this.lblPrescribedVolume  = c; }
      };
      private lblInfusionPeriod: iLabel;
      @ViewChild("lblInfusionPeriodTempRef", {read:iLabel, static: false }) set _lblInfusionPeriod(c: iLabel){
          if(c){ this.lblInfusionPeriod  = c; }
      };
      private lblInfusionrate: iLabel;
      @ViewChild("lblInfusionrateTempRef", {read:iLabel, static: false }) set _lblInfusionrate(c: iLabel){
          if(c){ this.lblInfusionrate  = c; }
      };
      private lblCalculatedInfusionrate: iLabel;
      @ViewChild("lblCalculatedInfusionrateTempRef", {read:iLabel, static: false }) set _lblCalculatedInfusionrate(c: iLabel){
          if(c){ this.lblCalculatedInfusionrate  = c; }
      };
      private lblRoundedto: iLabel;
      @ViewChild("lblRoundedtoTempRef", {read:iLabel, static: false }) set _lblRoundedto(c: iLabel){
          if(c){ this.lblRoundedto  = c; }
      };
      public lblPrescribedDoseValue: iLabel;
      @ViewChild("lblPrescribedDoseValueTempRef", {read:iLabel, static: false }) set _lblPrescribedDoseValue(c: iLabel){
          if(c){ this.lblPrescribedDoseValue  = c; }
      };
      public lblPrescribedVolumeValue: iLabel;
      @ViewChild("lblPrescribedVolumeValueTempRef", {read:iLabel, static: false }) set _lblPrescribedVolumeValue(c: iLabel){
          if(c){ this.lblPrescribedVolumeValue  = c; }
      };
      public lblInfusionPeriodValue: iLabel;
      @ViewChild("lblInfusionPeriodValueTempRef", {read:iLabel, static: false }) set _lblInfusionPeriodValue(c: iLabel){
          if(c){ this.lblInfusionPeriodValue  = c; }
      };
      private optDoseRate: iRadioButton;
      @ViewChild("optDoseRateTempRef", {read:iRadioButton, static: false }) set _optDoseRate(c: iRadioButton){
          if(c){ this.optDoseRate  = c; }
      };
      private optvolumeRate: iRadioButton;
      @ViewChild("optvolumeRateTempRef", {read:iRadioButton, static: false }) set _optvolumeRate(c: iRadioButton){
          if(c){ this.optvolumeRate  = c; }
      };
      private lblCalculatedInfusionrateValue: iLabel;
      @ViewChild("lblCalculatedInfusionrateValueTempRef", {read:iLabel, static: false }) set _lblCalculatedInfusionrateValue(c: iLabel){
          if(c){ this.lblCalculatedInfusionrateValue  = c; }
      };
      private lblInfusionrateValue: iLabel;
      @ViewChild("lblInfusionrateValueTempRef", {read:iLabel, static: false }) set _lblInfusionrateValue(c: iLabel){
          if(c){ this.lblInfusionrateValue  = c; }
      };
      private lblInfusionrateUOM: iLabel;
      @ViewChild("lblInfusionrateUOMTempRef", {read:iLabel, static: false }) set _lblInfusionrateUOM(c: iLabel){
          if(c){ this.lblInfusionrateUOM  = c; }
      };
      private lblInfusionperiodUOM: iLabel;
      @ViewChild("lblInfusionperiodUOMTempRef", {read:iLabel, static: false }) set _lblInfusionperiodUOM(c: iLabel){
          if(c){ this.lblInfusionperiodUOM  = c; }
      };
      private cboRoundedto: iComboBox;
      @ViewChild("cboRoundedtoTempRef", {read:iComboBox, static: false }) set _cboRoundedto(c: iComboBox){
          if(c){ this.cboRoundedto  = c; }
      };

     

        // constructor() {
        //     super();
        //     // InitializeComponent();
        // }

        ngAfterViewInit() {
            // that = this;
            // this.bIsLoaded = false;
            // this.iAppDialogWindow_Loaded(null, null);
            this.iAppDialogWindow_Loaded({},null);
        
            // dtpStartDate.IsConstrainEntry = true;
        }
        private iAppDialogWindow_Loaded(sender: Object, e: RoutedEventArgs): void {

        }
    }
