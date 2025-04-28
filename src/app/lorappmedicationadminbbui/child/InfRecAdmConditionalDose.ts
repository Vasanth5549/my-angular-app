import { ConditionalDose } from './../../product/shared/models/ConditionalDose';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { StringBuilder,ProfileFactoryType,ContextManager,Convert,AppActivity} from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp,Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison,AppDialogEventargs, AppDialogResult, DelegateArgs, DialogComponentArgs, WindowButtonType, iAppDialogWindow } from 'epma-platform/models';
import { AppDialog, iButton, iLabel } from 'epma-platform/controls';
import { HelperService} from 'epma-platform/soapclient';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
import { Common } from '../utilities/common';
import { RoutedEventArgs } from 'src/app/shared/epma-platform/controls/FrameworkElement';
import { Grid, GridExtension } from 'src/app/shared/epma-platform/controls/epma-grid-helpers/grid-extension';
import { GridComponent } from '@progress/kendo-angular-grid';
import { ConditionalDoseVM } from 'src/app/lorappmedicationcommonbb/viewmodel/ConditionalDoseVM';

@Component({
  selector: 'app-InfRecAdmConditionalDose',
  templateUrl: './InfRecAdmConditionalDose.html',
})

  export class InfRecAdmConditionalDose extends iAppDialogWindow implements AfterViewInit,OnInit{

    ngOnInit(): any {
      // this.grdConditionalDose.SetBinding("data", this.oVM.DefinedConditions);
      // this.grdConditionalDose.ItemsSource = this.oVM.DefinedConditions;

    }

    ngAfterViewInit(): any {
      console.log(this.iPPMABaseVM.SelectedConditionalDose)
      let selectedIdx = this.grdEnc.ItemsSource.array.findIndex(
          (x) => x.ConditionalDoseID === this.iPPMABaseVM.SelectedConditionalDose
        );
        // (x) => x.ConditionalDoseID === this.iPPMABaseVM.SelectedConditionalDose._doseUoMOID
        if (selectedIdx != undefined && selectedIdx >= 0) {
          this.grdEnc.selectedRowsIndex = [selectedIdx];
          // this.grdEnc_SelectionChanged(null);
        }
      // this.grdConditionalDose.SetBinding("data", this.oVM.DefinedConditions);
      // this.grdConditionalDose.ItemsSource = this.oVM.DefinedConditions;
      // setTimeout(() => {
        this.grdConditionalDose.ItemsSource = this.oVM.DefinedConditions;
      // }, 0);

    }

      lnPrescriptionOID: number = 0;
      MCVersion: string = String.Empty;
      sDrugName: string = String.Empty;
      sObsDrugName: string = String.Empty;
      IdentifyingType: string = String.Empty;
      IdentifyingOID: number = 0;
      // public ConditionalDose: Resource.ConditionalDose

      private Conditionaldose: Grid;
@ViewChild("ConditionaldoseTempRef", {read:Grid, static: false }) set _Conditionaldose(c: Grid){
    if(c){ this.Conditionaldose  = c; }
};
private lblConditionalDose: iLabel;
@ViewChild("lblConditionalDoseTempRef", {read:iLabel, static: false }) set _lblConditionalDose(c: iLabel){
    if(c){ this.lblConditionalDose  = c; }
};
// private grdConditionalDose: iGrid;

//SelectedItem="{Binding EncounterGridObj,Mode=TwoWay}"  IMPLEMENTATION TO BE DONE
// public grdEnc: GridExtension = new GridExtension();
// iPPMABaseVM: IPPMABaseVM;

// selectedIdx = this.grdEnc.ItemsSource.array.findIndex(
//           (x) => x.ConditionalDoseID === this.iPPMABaseVM.SelectedConditionalDose.ConditionalDoseID
//         );
//         if (selectedIdx != undefined && selectedIdx >= 0) {
//           this.grdEnc.selectedRowsIndex = [selectedIdx];
//           this.grdEnc_SelectionChanged(null);
//         }


// oVM:ConditionalDoseVM
oVM: ConditionalDoseVM = new ConditionalDoseVM();
iPPMABaseVM: ConditionalDoseVM = new ConditionalDoseVM();
public grdEnc: GridExtension = new GridExtension();
public grdConditionalDose: GridExtension = new GridExtension();
@ViewChild("grdConditionalDoseTempRef", {read:GridComponent, static: false }) set _grdConditionalDose(c: GridComponent){
    if(c){
      // this.grdConditionalDose.ItemsSource = c.data;
        this.grdConditionalDose.grid  = c;
        this.grdConditionalDose.columns  = c.columns;
        // this.grdConditionalDose.SetBinding("data", this.oVM.DefinedConditions);
     }
};

private lblConditionName: iLabel;
@ViewChild("lblConditionNameTempRef", {read:iLabel, static: false }) set _lblConditionName(c: iLabel){
    if(c){ this.lblConditionName  = c; }
};
private cmdObservationsResults: iButton;
@ViewChild("cmdObservationsResultsTempRef", {read:iButton, static: false }) set _cmdObservationsResults(c: iButton){
    if(c){ this.cmdObservationsResults  = c; }
};

      constructor() {
        super();
      }

      public cmdObservationsResults_Click(sender?: Object, e?: RoutedEventArgs): void {
          let sItemsubtype: string = String.Empty;
          let sMCitemname: string = String.Empty;
          let slorenzoid: string = String.Empty;
          let bResult: boolean = Common.LaunchObservation(this.lnPrescriptionOID,
              this.IdentifyingType,
              this.IdentifyingOID,
              this.MCVersion, !String.IsNullOrEmpty(this.sObsDrugName) ? this.sObsDrugName : this.sDrugName, sItemsubtype, sMCitemname, slorenzoid);
      }
  }

