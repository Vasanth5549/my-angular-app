import { Component, OnInit, ViewChild } from '@angular/core';
import { OmitSlotsVM } from '../viewmodel/MedsAdminVM';
import { StackPanel, UserControl, iTreeViewControl } from 'epma-platform/controls';
import { OmitSlotsParams } from 'src/app/shared/epma-platform/soap-client/MedicationAdministrationWS';
import { RoutedEventArgs } from 'src/app/shared/epma-platform/controls/FrameworkElement';
import { CTreeListItem, iTreeViewCollection } from 'src/app/shared/epma-platform/controls-model/treeView.model';
import { group } from '@angular/animations';
import { from } from 'rxjs';
import { CConstants, MedImage, MedImages } from '../utilities/CConstants';
import DateTime from 'epma-platform/DateTime';
import { Convert } from 'epma-platform/services';
import { Resource } from '../resource';


@Component({
  selector: 'OmitSelectedSlots',
  templateUrl: './OmitSelectedSlots.html',
  //styleUrls: ['./medsadmin-omitslots.component.css']
})
export class OmitSelectedSlots extends UserControl {
  private stpTV: StackPanel= new StackPanel();
  @ViewChild("stpTVTempRef", {read:StackPanel, static: false }) set _stpTV(c: StackPanel){
      if(c){ this.stpTV  = c; }
  };
  private tvwOmitSlots: iTreeViewControl = new iTreeViewControl();
  @ViewChild("tvwOmitSlotsTempRef", {read:iTreeViewControl, static: false }) set _tvwOmitSlots(c: iTreeViewControl){
      if(c){ this.tvwOmitSlots  = c; }
  };
  dOmitSlotsVM: OmitSlotsVM;
  oOmitSlotsParams: OmitSlotsParams;
  oLocalOmitSlotsParams: OmitSlotsParams;
  public objSelectedSlots = Resource.MedsAdminOmitSlots;
  constructor(dOmitSlotsVM: OmitSlotsVM) {
    super();
    this.dOmitSlotsVM =  dOmitSlotsVM;
   // this.DataContext =  dOmitSlotsVM;
   }
   ngAfterViewInit(){
    this.dOmitSlotsVM =  this.DataContext;
    this.ChildWindowOmit_Loaded({},null);
   }
  private ChildWindowOmit_Loaded(sender: Object, e: RoutedEventArgs): void {
    this.oOmitSlotsParams = this.dOmitSlotsVM.OmittedSlots;
    this.PopulateTreeData(this.oOmitSlotsParams);
  }
  public PopulateTreeData(dOmitSlotsParams: OmitSlotsParams): void {
    this.oLocalOmitSlotsParams = dOmitSlotsParams;
    var iTVCol: iTreeViewCollection = null;
    var oCParentTV: CTreeListItem = new CTreeListItem();
    var oCChildTV: CTreeListItem = new CTreeListItem();
    var odrDateTime = dOmitSlotsParams.OSlotData.OrderBy(o=>o.ScheduleDTTM).Select(o => o);
    var grpDateTime =  odrDateTime.GroupBy(g => g.ScheduleDTTM.Date).Select(s => s);
    var FromDateTime = this.dOmitSlotsVM.OmittedSlots.OSlotData.Min(mn => mn.ScheduleDTTM);
    this.oLocalOmitSlotsParams.FromDTTM = FromDateTime;
    iTVCol = new iTreeViewCollection();
    grpDateTime.forEach((gdt:any)=>{
    //  let td =  Convert.ToDateTime(gdt.key)
      oCParentTV = new CTreeListItem();
      oCParentTV.Key = (Convert.ToDateTime(gdt.key)).ToString(CConstants.ShortDateFormat);
      // oCParentTV.ParentKey = "0";
      oCParentTV.ParentKey = null;
      oCParentTV.Value = (Convert.ToDateTime(gdt.key)).ToString(CConstants.ShortDateFormat);
      oCParentTV.NormalImagePath = MedImage.GetPath(MedImages.CalenderIcon);
      oCParentTV.ToolTip = this.objSelectedSlots.tvwOmitSlots_ToolTip;
      oCParentTV.Expanded = true;
      iTVCol.Add(oCParentTV);
      gdt.forEach((dt:any)=>{
        oCChildTV = new CTreeListItem();
        oCChildTV.Key = dt.ScheduleDTTM.ToUserDateTimeString(CConstants.Timeformat);
        oCChildTV.ParentKey = (Convert.ToDateTime(gdt.key)).ToString(CConstants.ShortDateFormat);
        oCChildTV.Value = dt.ScheduleDTTM.ToUserDateTimeString(CConstants.Timeformat);
        oCChildTV.ToolTip = this.objSelectedSlots.tvwOmitSlots_ToolTip;
        if (this.dOmitSlotsVM.IsInfusion && !this.dOmitSlotsVM.IsBolus)
          oCChildTV.NormalImagePath = MedImage.GetPath(MedImages.InfPlannedDeferredIcon);
        else oCChildTV.NormalImagePath = MedImage.GetPath(MedImages.PlannedIcon);
        iTVCol.Add(oCChildTV);
      });
    });
    this.dOmitSlotsVM.TreeVwCol = iTVCol;
    this.tvwOmitSlots.TreeViewDataContext = this.dOmitSlotsVM.TreeVwCol;
    this.tvwOmitSlots.ExpandAll();
    this.tvwOmitSlots.IsEditable = false;
  }
}