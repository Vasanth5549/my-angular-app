import { Component, OnInit, ViewChild } from '@angular/core';
import { Grid } from 'epma-platform/controls';
import { ContentControl, iAppDialogWindow } from 'epma-platform/models';
import { InfrecordadminVM } from '../viewmodel/InfrecordadminVM';
import { BagDetailsVM } from 'src/app/lorappmedicationcommonbb/viewmodel/BagDetailsVM';
import { RoutedEventArgs } from 'src/app/shared/epma-platform/controls/FrameworkElement';
import { medbagdetails } from 'src/app/lorappmedicationcommonbb/view/medbagdetails/medbagdetails.component';

@Component({
  selector: 'app-infrecadmbagdetails',
  templateUrl: './InfRecAdmBagDetails.html'
})

  export class InfRecAdmBagDetails extends iAppDialogWindow implements OnInit {
      //public grdbagdetails1: iSOFT.LORENZO.BlueBird.Controls.iGrid;
      public oVM: InfrecordadminVM;
      public oBagDetailsView;
      public oBagDetailsVM: BagDetailsVM;
      private LayoutRoot: Grid;
  private _BagHeaderDisplay: any;
  public get BagHeaderDisplay(): any {
    return this._BagHeaderDisplay;
  }
  public set BagHeaderDisplay(value: any) {
    this._BagHeaderDisplay = value;
  }
@ViewChild("LayoutRootTempRef", {read:Grid, static: false }) set _LayoutRoot(c: Grid){
    if(c){ this.LayoutRoot  = c; }
};
private cntBagDetails: ContentControl;
@ViewChild("cntBagDetailsTempRef", {read:ContentControl, static: false }) set _cntBagDetails(c: ContentControl){
    if(c){ this.cntBagDetails  = c; }
};

      constructor(OVM?: InfrecordadminVM) {
         super();
         this.oVM= OVM;
      }

      ngOnInit() {
        this.oBagDetailsView = new medbagdetails();
        this.oBagDetailsVM = new BagDetailsVM();
        //this.cntBagDetails.Content = oBagDetailsView;
       this.oBagDetailsVM.InfustionType = this.oVM.InfusionType.Value;
       this.oBagDetailsVM.GetInfBagDetails(this.oVM.MedAdminOID, this.oVM.MCVersionNo);
      //  this.oBagDetailsVM.InfustionType = "CC_IPPINFTYPSNGDOSE";// this.oVM.InfusionType.Value;
      //this.oBagDetailsVM.GetInfBagDetails(700002336056, "27");
       //  oBagDetailsVM.GetInfBagDetails(this.oVM.MedAdminOID, this.oVM.MCVersionNo);
      this.oBagDetailsView.DataContext = this.oBagDetailsVM;
      }
      private ChildWindow_Loaded(sender: Object, e: RoutedEventArgs): void {
       //   this.DataContext = this.oVM;
      }
  }


