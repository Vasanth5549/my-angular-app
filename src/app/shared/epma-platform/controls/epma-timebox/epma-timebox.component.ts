import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { TimePickerComponent } from '@progress/kendo-angular-dateinputs';

import DateTime from 'epma-platform/DateTime';
import { Enum } from '../../models/eppma-common-types';
import { Control } from '../Control';
import { RoutedPropertyChangedEventArgs } from '../FrameworkElement';
import {
  InputSize
} from "@progress/kendo-angular-inputs";
import { Convert } from 'epma-platform/services';
import { AccessKeyService } from '../AccessKey.service';
import { InjectorInstance } from 'src/app/app.module';
import { GridExtension } from '../epma-grid-helpers/grid-extension';
import { TimeZoneInfo } from '../../models/time-zone-info';

const TWELVEHOURFORMAT = "hh:mm";
const TWENTYFOURHOURFORMAT = "HH:mm";



@Component({
  // changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'iTimeBox',
  templateUrl: './epma-timebox.component.html',
  styleUrls: ['./epma-timebox.component.css']
})


export class iTimeBox extends Control implements OnInit {

  private accessKeyService: AccessKeyService;

  public static ValueProperty = "Value";
  public static IsEnabledProperty = "IsEnabled";
  @Input() ValueChanged: Function | string;
  public size: InputSize = "small";
  public DstStyle : any = {'margin-top' : '5px'};

  constructor() {
    super();
    this.style['width'] = "85px"
  }

  ngOnInit() {
    this.accessKeyService = InjectorInstance.get<AccessKeyService>(AccessKeyService);
  }

  ngAfterViewInit() {
    // setTimeout(() => {
    //   this.DetectChange();
    // }, 0)

    if (this._Value) {
      let routedPropertyChangedEventArgs: RoutedPropertyChangedEventArgs = new RoutedPropertyChangedEventArgs(this.beforeChangeValue, this.afterChangeValue);
      this.ValueChange.emit(this._Value);
      if (this.ValueChanged instanceof Function) {
        this.ValueChanged({}, routedPropertyChangedEventArgs);
      }
    }
  }
 
  IsAmbiguousTime = false;
  IsCheckedDST = false;
  

  iTimeformat: string = TWENTYFOURHOURFORMAT;

  _timeFormat: string = TWELVEHOURFORMAT;
  get TimeFormat() {
    return this._timeFormat;
  }
  @Input() set TimeFormat(value: string | TimeFormat) {
    this._timeFormat = value;
    if (typeof value == 'string') {
      if (value == 'hhMM' || value == 'HHMM') {
        this.iTimeformat = TWENTYFOURHOURFORMAT;
      }
      else {
        //TimeFormat need to verify in product page, update accordingly here
        this.iTimeformat = TWELVEHOURFORMAT;
      }
    }

    if (typeof value == "number") {
      if (value == 0) {
        this.iTimeformat = TWELVEHOURFORMAT;
      } else {
        this.iTimeformat = TWENTYFOURHOURFORMAT;
      }
    }
    //  if(value in TimeFormat){
    //   this.iTimeformat = value.toString();
    //  }

  }

  @Output() ValueChange = new EventEmitter();
  beforeChangeValue: DateTime;
  afterChangeValue: DateTime;
  _Value: DateTime;
  get Value() {
    return this._Value;
  }
  @Input() set Value(value: DateTime) {
    if (typeof (value) == "string") {
      value = Convert.ToDateTime(value);
    }
    //this.beforeChangeValue = value;
    if (!value || (value as any as Date).getFullYear() == 0 || (value as any as Date).getFullYear() == 1 || (value as any as Date).getFullYear() == 1901) {
      //this._Value = DateTime.MinValue
      this._Value = new DateTime("0001-01-01T00:00:00");
      this.ValueDate = new Date("0001-01-01T00:00:00");
    } else {
      this._Value = value;
      if(TimeZoneInfo.Local.IsAmbiguousTime(value)){
        this._ValueDate = value as any as Date;
      }else
      this.ValueDate = new Date(value.Year, value.Month - 1, value.Day, value.Hour, value.Minute);
    }

    // Bug: 35906 if the entered time value is not in the range of minTime and maxTime then set the entered tme value to minTime.
    if (this.MinTime && this.MaxTime) {
      let valueTime = this.ValueDate.getTime();
      let min = this.MinTime.getTime();
      let max = this.MaxTime.getTime();
      if (valueTime < min || valueTime > max) {
        this.ValueDate = this.MinTime;
      }
    }
    if(this._Value && DateTime.NotEquals(this._Value,DateTime.MinValue)){
  
      this.IsAmbiguousTime = TimeZoneInfo.Local.IsAmbiguousTime(this._Value);
      this.IsCheckedDST =TimeZoneInfo.Local.IsDSTWithInAmbiguousTime(this._Value)
    }else if(this._Value && this.IsAmbiguousTime){
      this.IsAmbiguousTime = TimeZoneInfo.Local.IsAmbiguousTime(this._Value);
    }
  }

  _ValueDate: Date = new Date("0001-01-01T00:00:00");
  get ValueDate() {
    return this._ValueDate;
  }
  set ValueDate(value: Date) {

    if(DateTime.Equals(this._ValueDate,value)){
      return;
    }
      
    this._ValueDate = value;
    if(value.getFullYear() == 1 && (this._Value as any as Date).getFullYear() == 1){
      this._Value = DateTime.MinValue;      
    }
    else if (this._Value.Equals(DateTime.From(value))) {
      this._Value.SetDateValue(value);
    } else {
      this._Value = new DateTime(value.getFullYear(), value.getMonth() + 1, value.getDate(), value.getHours(), value.getMinutes());
    }
    if(this.afterChangeValue != undefined){
      if(this.afterChangeValue == DateTime.MinValue){
       this.beforeChangeValue = this.afterChangeValue; 
      }
      else{
    this.beforeChangeValue= new DateTime(this.afterChangeValue.Year, this.afterChangeValue.Month, this.afterChangeValue.Day, this.afterChangeValue.Hour, this.afterChangeValue.Minute);
      }
    }
    this.afterChangeValue = this._Value;
    let routedPropertyChangedEventArgs: RoutedPropertyChangedEventArgs = new RoutedPropertyChangedEventArgs(this.beforeChangeValue, this.afterChangeValue);
    if (this.ValueChanged instanceof Function) {
      this.ValueChanged({}, routedPropertyChangedEventArgs);
    }
  }

  ngDoCheck() {
    this.DetectChange();
  }

  onChange(e) {
    this.beforeChangeValue = this._Value;
    if(e){
    if(e.getFullYear() == 1 && ((this._Value as any as Date).getFullYear() == 1 || (this._Value as any as Date).getFullYear() == 0)){
      this._Value = DateTime.MinValue;      
    }
    else if (this._Value.Equals(DateTime.From(e))) {
      this._Value.SetDateValue(e);
    } else {
      if(this.EnableDST && TimeZoneInfo.Local.IsAmbiguousTime(e) && !TimeZoneInfo.Local.IsAmbiguousTime(this._Value)){
        this._Value = new DateTime(e.getFullYear(), e.getMonth() + 1, e.getDate(), e.getHours(), e.getMinutes());
      let hrs = ((this.Value as any as Date).getTimezoneOffset()*(-1))/60;
        
        this._Value =new DateTime(((this.Value as any as Date).getTime()) + (3600000 * hrs));
      }else{
      this._Value = new DateTime(e.getFullYear(), e.getMonth() + 1, e.getDate(), e.getHours(), e.getMinutes());
      }
    }
    this.ValueChange.emit(this._Value);
    this.IsAmbiguousTime = TimeZoneInfo.Local.IsAmbiguousTime(this._Value);
   
    this.assignViewToModel(this._Value, iTimeBox.ValueProperty);
  }
  }

  @Input() set SetValue(value: DateTime) {
    this.beforeChangeValue = value;
    this._Value = value;
    this.ValueDate = new Date(value.Year, value.Month - 1, value.Day, value.Hour, value.Minute);
    // this.changeDectRef.detectChanges();
  }


  @Input() EnableTimeConversion: string | boolean;
  @Input() EnableDST: string | boolean;
  @Input() LostFocus: Function | string;
  @Input() Unloaded: Function | string;

  // // ColumnCellIndex is introduced for managing grid cell editing
  @Input() ColumnCellIndex: string;
  @Input() GridColumn?: any;
  @Input() GridHelper?: GridExtension;
  //@Input() IsTabStop: string | boolean;

  // @Input() Focus: Function | string;

  _isEditable: boolean;
  get IsEditable() {
    if (
      typeof this._isEditable === 'undefined' ||
      (typeof this._isEditable === 'string' && this._isEditable === 'True') ||
      (typeof this._isEditable === 'string' && this._isEditable === 'true')
    ) {
      return false;
    } else if (
      (typeof this._isEditable === 'string' && this._isEditable === 'False') ||
      (typeof this._isEditable === 'string' && this._isEditable === 'false')
    ) {
      return true;
    }
    return this._isEditable;
  }
  @Input() set IsEditable(v: any) {
    this._isEditable = v;
  }


  _isAmbiguous: boolean;
  get IsAmbiguous() {
    return this._isAmbiguous;
  }
  @Input() set IsAmbiguous(value: boolean) {
    this._isAmbiguous = value;
  }

  _isDST: boolean;
  get IsDST() {
    return this._isDST;
  }
  @Input() set IsDST(value: boolean) {
    this._isDST = value;
  }

  _isGrid: boolean;
  get IsGrid() {
    return this._isGrid;
  }
  @Input() set IsGrid(value: boolean) {
    this._isGrid = value;
  }

  _isFocus: boolean;
  get IsFocus() {
    return this._isFocus;
  }
  @Input() set IsFocus(value: boolean) {
    this._isFocus = value;
    if (value) {
      this.setFocus();
    }
  }

  FocusOutEvent(e) {
    if (this.LostFocus instanceof Function) {
      this.LostFocus({}, e);
    }
  }


  @ViewChild(TimePickerComponent)
  private el: TimePickerComponent;

  isFocus = false;
  onblur() {
    this.isDSTCheckBoxClicked = false
    this.isFocus = false;
    // This condition is added for managing grid cell editing
    if (this.ColumnCellIndex && this.DataContext && this.DataContext[this.ColumnCellIndex]) {
      setTimeout(()=>{
        if(this.isDSTCheckBoxClicked == false)
        this.DataContext[this.ColumnCellIndex] = false;
      },300)
      if (this.GridHelper && this.GridHelper.EnableCellEditEnded) this.GridHelper.CellEditEnded(this); 
      if (this.GridHelper && this.GridHelper.EnableCellValidating) this.GridHelper.CellValidating(this); 
    }
    if(this.el.value == null){
      this.el.value = this._ValueDate;
      this.ValueChange.emit(this._Value);
    }
  }
  toggleDSTCHeckboxclick(){
    if((this.EnableDST == 'True' || this.EnableDST == 'true' || this.EnableDST == true) && this.IsAmbiguousTime)
    this.isDSTCheckBoxClicked = true;
  }
  override Focus() {
    this.isFocus = true;
    this.el.focus();
  }

  override setFocus() {
    this.isFocus = true;
    setTimeout(() => {
      this.el.focus();
    });
  }


  //#region Minimum amd Maximum time 
  // need to check if we assign some min/max time then it should be in that range only
  // it should have a default date(today's date) if min/max is not provided

  MaxTime: Date;
  _maxTime: DateTime;
  get Maximum() {
    return this._maxTime;
  }
  @Input() set Maximum(value: DateTime) {
    this._maxTime = value;
    let year = new Date().getFullYear();
    let month = new Date().getMonth();
    let day = new Date().getDate();
    this.MaxTime = new Date(year, month, day, value.Hour, value.Minute);
  }

  MinTime: Date;
  _minTime: DateTime;
  get Minimum() {
    return this._minTime;
  }
  @Input() set Minimum(value: DateTime) {
    this._minTime = value;
    let year = new Date().getFullYear();
    let month = new Date().getMonth();
    let day = new Date().getDate();
    this.MinTime = new Date(year, month, day, value.Hour, value.Minute);
  }

  //#endregion 
  ngOnDestroy() {
    this.accessKeyService.unregister(this.id);
  }
  override _isEnabled: boolean | string;
  override get IsEnabled() {
    if(this.isGlobalEnabled == undefined || this.isGlobalEnabled == true)
    {
        if (
          typeof this._isEnabled === 'undefined' ||
          (typeof this._isEnabled === 'string' && this._isEnabled === 'True') ||
          (typeof this._isEnabled === 'string' && this._isEnabled === 'true')
        ) {
          return true;
        } else if (
          (typeof this._isEnabled === 'string' && this._isEnabled === 'False') ||
          (typeof this._isEnabled === 'string' && this._isEnabled === 'false')
        ) {
          return false;
        }
        return this._isEnabled;
    }
    else{
      return this.isGlobalEnabled;
    }
    
  }
  @Input() override set IsEnabled(v: boolean | string) {
    this._isEnabled = v;
    if (this.IsEnabledObject.Property) {
      // this.TextObject.Object[props[0]][props[1]][props[2]][props[3]] = this._text;
      this.setBindingPath(
        this.IsEnabledObject.Object,
        this.IsEnabledObject.Property,
        this._isEnabled
      );
    }
    if(!this._isEnabled && DateTime.Equals(this._Value,DateTime.MinValue)){
      this._Value = null;
      this._ValueDate = null;
    }
  }
  setZerotime()
  {
    this._Value = null;
    this._ValueDate = null;
  }
  setZero()
  {
    this._Value = DateTime.MinValue;
    this._ValueDate = new Date("0001-01-01T00:00:00");
  }
  isDSTCheckBoxClicked = false;
  DstCheckBox_Click(e){
    this.isDSTCheckBoxClicked = true

   // this._Value.isAmbiguousDSTTime = !this._Value.isAmbiguousDSTTime;
    if(TimeZoneInfo.Local.IsDSTWithInAmbiguousTime(this.Value)){
      //converting dst time to non-dst
      let hrs = ((this.Value as any as Date).getTimezoneOffset()*(-1))/60;
      (this._Value) =new DateTime(((this.Value as any as Date).getTime()) + (3600000 * hrs));
      //(this._ValueDate)= new Date(((this.Value as any as Date).getTime()) + (3600000 * hrs));
      this._ValueDate = this._Value as any as Date;

      this.IsCheckedDST = false;
    }else{
      //converting non-dst time to dst
      let hrs = new Date((this.Value as any as Date).getFullYear(), 6, 1).getTimezoneOffset()/60;
      (this._Value) =new DateTime(((this.Value as any as Date).getTime()) + (3600000 * hrs));
    //  (this._ValueDate) =new Date(((this.Value as any as Date).getTime()) + (3600000 * hrs));
    this._ValueDate = this._Value as any as Date;

      this.IsCheckedDST = true;
    }
    if(this.afterChangeValue != undefined){
      this.beforeChangeValue= new DateTime(this.afterChangeValue.Year, this.afterChangeValue.Month, this.afterChangeValue.Day, this.afterChangeValue.Hour, this.afterChangeValue.Minute);
      }
      this.afterChangeValue = this._Value;
    let routedPropertyChangedEventArgs: RoutedPropertyChangedEventArgs = new RoutedPropertyChangedEventArgs(this.beforeChangeValue, this.afterChangeValue);
    this.ValueChange.emit(this._Value);
    if (this.ValueChanged instanceof Function) {
      this.ValueChanged({}, routedPropertyChangedEventArgs);
    }
    this.assignViewToModel(this._Value, iTimeBox.ValueProperty);
  }

  UpdateAfterChangeValue(afterChangeValue:DateTime){
    this.afterChangeValue = afterChangeValue;        
  }

}

export enum TimeFormat {
  HHMMPP = 'hhMM',
  HHMM = "HHMM",
}
