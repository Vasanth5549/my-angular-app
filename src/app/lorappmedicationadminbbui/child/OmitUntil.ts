import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { OmitSlotsVM } from '../viewmodel/MedsAdminVM';
import { StackPanel, UserControl, iComboBox, iDateTimePicker, iLabel, iTimeBox, iUpDownBox } from 'epma-platform/controls';
import { CommonBB } from 'src/app/lorappcommonbb/utilities/common';
import { CConstants, ValueDomain } from '../utilities/CConstants';
import DateTime, { DateTimeKind } from 'epma-platform/DateTime';
import { RTEEventargs, ObservableCollection, CListItem, List, StringComparison } from 'epma-platform/models';
import { ProcessRTE } from 'epma-platform/services';
import { DateChangedArgs } from 'src/app/shared/epma-platform/controls/Control';
import { RoutedPropertyChangedEventArgs, RoutedEventArgs } from 'src/app/shared/epma-platform/controls/FrameworkElement';
import { Resource } from '../resource';
import * as ControlStyles from "../../shared/epma-platform/controls/ControlStyles";


@Component({
    selector: 'OmitUntil',
    templateUrl: './OmitUntil.html',
    //styleUrls: ['./medsadmin-omitslots.component.css']
  })
export class OmitUntil extends UserControl {
  public Styles = ControlStyles;
  bNotToEmptyDUR: boolean;
  public uOmitSlotsVM: OmitSlotsVM = new OmitSlotsVM();
  public IndexOfUOM: number;
  CurrentDTTM: DateTime = CommonBB.GetServerDateTime();
  public objOmitSlots = Resource.MedsAdminOmitSlots;
  // #region viewChild
  private stpOmitFrom: StackPanel;
@ViewChild("stpOmitFromTempRef", {read:StackPanel, static: false }) set _stpOmitFrom(c: StackPanel){
    if(c){ this.stpOmitFrom  = c; }
};
private lblOmitFrom: iLabel;
@ViewChild("lblOmitFromTempRef", {read:iLabel, static: false }) set _lblOmitFrom(c: iLabel){
    if(c){ this.lblOmitFrom  = c; }
};
dpOmitFrom: iDateTimePicker = new iDateTimePicker();
@ViewChild("dpOmitFromTempRef", {read:iDateTimePicker, static: false }) set _dpOmitFrom(c: iDateTimePicker){
    if(c){ this.dpOmitFrom  = c; }
};
private iOFTime: iTimeBox = new iTimeBox();
@ViewChild("iOFTimeTempRef", {read:iTimeBox, static: false }) set _iOFTime(c: iTimeBox){
    if(c){ this.iOFTime  = c; }
};
private lblDuration: iLabel;
@ViewChild("lblDurationTempRef", {read:iLabel, static: false }) set _lblDuration(c: iLabel){
    if(c){ this.lblDuration  = c; }
};
private lblEndDate: iLabel;
@ViewChild("lblEndDateTempRef", {read:iLabel, static: false }) set _lblEndDate(c: iLabel){
    if(c){ this.lblEndDate  = c; }
};
udDuration: iUpDownBox;
@ViewChild("udDurationTempRef", {read:iUpDownBox, static: false }) set _udDuration(c: iUpDownBox){
    if(c){ this.udDuration  = c; }
};
private lblUOM: iLabel;
@ViewChild("lblUOMTempRef", {read:iLabel, static: false }) set _lblUOM(c: iLabel){
    if(c){ this.lblUOM  = c; }
};
cboDuration: iComboBox;
@ViewChild("cboDurationTempRef", {read:iComboBox, static: false }) set _cboDuration(c: iComboBox){
    if(c){ this.cboDuration  = c; }
};
dpEndDate: iDateTimePicker=new iDateTimePicker();
@ViewChild("dpEndDateTempRef", {read:iDateTimePicker, static: false }) set _dpEndDate(c: iDateTimePicker){
    if(c){ this.dpEndDate  = c; }
};
private tbEndTime: iTimeBox = new iTimeBox();
@ViewChild("tbEndTimeTempRef", {read:iTimeBox, static: false }) set _tbEndTime(c: iTimeBox){
    if(c){ this.tbEndTime  = c; }
};

  //#endregion
  constructor(private cdr?: ChangeDetectorRef) {
    super();
     // this.uOmitSlotsVM = oOmitSlotsVM;//this.DataContext;
  }
  ngAfterViewInit(){
    this.uOmitSlotsVM = this.DataContext;
    this.GetDomainCombo("IPPMEDDOSEDRSN");
    this.dpEndDate.IsConstrainEntry = true;
    this.tbEndTime.ValueChanged = (s,e)=>{ this.tbEndTime_OnChanged(s, e); }
    this.iOFTime.ValueChanged = (s,e)=>{ this.iOFTime_OnChanged(s,e);}
    
    this.dpEndDate.OnDateValueChanged  = (s, e) => { this.dtpEnddate_OnChanged(s, e)}
    this.SetDateTimevalue();
    this.cdr?.detectChanges();
  }
  
  public SetDateTimevalue(): void {
     //this.dpEndDate.SetDateValue(DateTime.MinValue);
     this.uOmitSlotsVM.EndDateTime =  new DateTime(DateTime.Today.Year, DateTime.Today.Month, DateTime.Today.Day, 0, 0, DateTimeKind.Local);
      if (DateTime.GreaterThan(this.uOmitSlotsVM.PrescriptionItemStartDate, this.CurrentDTTM)) {
          this.dpEndDate.RangeStartDate = this.uOmitSlotsVM.PrescriptionItemStartDate;
      }
      else {
          this.dpEndDate.RangeStartDate = this.CurrentDTTM;
      }
      if (this.uOmitSlotsVM.PrescriptionItemEndDate != DateTime.MinValue) {
          this.dpEndDate.RangeEndDate = this.uOmitSlotsVM.PrescriptionItemEndDate;
      }
      else {
          this.dpEndDate.RangeEndDate = CommonBB.GetServerDateTime().AddDays(CConstants.OmitEndDateMaxValue).Date;
      }
      if (this.uOmitSlotsVM.OmittedSlots?.OSlotData.Count > 0 && !this.uOmitSlotsVM.MedicationSelected) {
         // var LeastDate = from date in this.uOmitSlotsVM.OmittedSlots.OSlotData orderby date.ScheduleDTTM select date;
         var LeastDate = this.uOmitSlotsVM.OmittedSlots.OSlotData.OrderBy(date=>date.ScheduleDTTM).Select(date => date);
          this.uOmitSlotsVM.OmitFromDate = LeastDate.FirstOrDefault().ScheduleDTTM;
          this.uOmitSlotsVM.OmittedFromDateTime = new DateTime(DateTime.Today.Year, DateTime.Today.Month, DateTime.Today.Day, this.uOmitSlotsVM.OmitFromDate.Hour, this.uOmitSlotsVM.OmitFromDate.Minute, this.uOmitSlotsVM.FromDate == undefined?0:this.uOmitSlotsVM.FromDate?.Second, DateTimeKind.Local);
      }
      else if (this.uOmitSlotsVM.MedicationSelected) {
          if (DateTime.GreaterThan(this.uOmitSlotsVM.PrescriptionItemStartDate , this.CurrentDTTM)) {
              this.uOmitSlotsVM.OmitFromDate = this.uOmitSlotsVM.PrescriptionItemStartDate;
              this.uOmitSlotsVM.OmittedFromDateTime = new DateTime(DateTime.Today.Year, DateTime.Today.Month, DateTime.Today.Day, this.uOmitSlotsVM.OmitFromDate.Hour, this.uOmitSlotsVM.OmitFromDate.Minute, this.uOmitSlotsVM.FromDate == undefined?0:this.uOmitSlotsVM.FromDate?.Second, DateTimeKind.Local);
          }
          else {
              this.uOmitSlotsVM.OmitFromDate = this.CurrentDTTM;
              this.uOmitSlotsVM.OmittedFromDateTime = new DateTime(DateTime.Today.Year, DateTime.Today.Month, DateTime.Today.Day, this.uOmitSlotsVM.OmitFromDate.Hour, this.uOmitSlotsVM.OmitFromDate.Minute, this.uOmitSlotsVM.FromDate == undefined?0:this.uOmitSlotsVM.FromDate?.Second, DateTimeKind.Local);
          }
      }
  }
 
  private dtpEnddate_OnChanged(sender: Object, e: DateChangedArgs): void {
      if (this.uOmitSlotsVM?.EndDateValue.Date != e.ModifiedDate.Date) {
          this.ClearValue();
      }
      this.uOmitSlotsVM.EndDateValue = e.ModifiedDate;
  }
  private tbEndTime_OnChanged(sender: Object, e: RoutedPropertyChangedEventArgs<DateTime>): void {
      if (this.uOmitSlotsVM?.EndDateTime != e.NewValue) {
          this.ClearValue();
      }
      this.uOmitSlotsVM.EndDateTime = e.NewValue.Value;
  }
  private iOFTime_OnChanged(sender: Object, e: RoutedPropertyChangedEventArgs<DateTime>): void {
      if (this.uOmitSlotsVM?.OmittedFromDateTime != e.NewValue) {
          this.uOmitSlotsVM.OmittedFromDateTime = e.NewValue.Value;
      }
  }
  private ClearValue(): void {
      if (this.uOmitSlotsVM?.DurationValue != null && this.uOmitSlotsVM?.DurationValue > 0) {
          this.uOmitSlotsVM.DurationValue = null;
      }
      if (this.uOmitSlotsVM?.DurationUOMValue != null) {
          this.uOmitSlotsVM.DurationUOMValue = null;
      }
  }
  private ChildWindowOmitUntil_Loaded(sender: Object, e: RoutedEventArgs): void {

  }
  public GetDomainCombo(Domain: string): void {
      switch (Domain) {
          case ValueDomain.Duration:
              ProcessRTE.GetValuesByDomainCode(Domain, (s, e) => {
                  this.OnRTEResult(s);
              });
              break;
      }
  }
    OnRTEResult(args: RTEEventargs): void {
        if (String.IsNullOrEmpty(args.Request) || args.Result == null)
            return
        if (String.Compare(args.Request, ValueDomain.Duration, StringComparison.CurrentCultureIgnoreCase) == 0) {
            this.uOmitSlotsVM.DurationUOM = new ObservableCollection<CListItem>();
            <List<CListItem>>args.Result.forEach(element => {
                this.uOmitSlotsVM.DurationUOM.Add(element);
            });
            //   <List<CListItem>>args.Result.forEach(function (oCListItem) {
            //      this.uOmitSlotsVM.DurationUOM.Add(oCListItem);
            //   });
        }
    }
  public SetDurationUOM(): void {
      if (this.uOmitSlotsVM != null && this.uOmitSlotsVM.DurationValue > 0) {
          this.cboDuration.SelectedIndex = this.IndexOfUOM;
         // this.uOmitSlotsVM.DurationUOMValue=
      }
      else {
          this.cboDuration.SelectedIndex = -1;
      }
  }
}