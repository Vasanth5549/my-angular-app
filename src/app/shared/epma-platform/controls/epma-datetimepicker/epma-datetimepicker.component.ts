import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { DateInputFillMode, DateInputRounded, DateInputSize, DatePickerComponent, DateTimePickerComponent, FormatSettings } from '@progress/kendo-angular-dateinputs';
import { IntlService } from '@progress/kendo-angular-intl';
import DateTime from 'epma-platform/DateTime';
import { Control } from '../Control';
import { MessageBoxButton, MessageBoxType, iMessageBox } from '../../services/iMessageBox.service';
import { AccessKeyService } from '../AccessKey.service';
import { InjectorInstance } from 'src/app/app.module';

export enum DatePickerType {
  DATETIMEPICKER="DATETIMEPICKER",
  DATEPICKER="DATEPICKER",
  TIMEPICKER="TIMEPICKER",
  MONTHPICKER="MONTHPICKER",
}

@Component({
  selector: 'iDateTimePicker',
  templateUrl: './epma-datetimepicker.component.html',
  styleUrls: ['./epma-datetimepicker.component.css']
})
export class iDateTimePicker extends Control implements OnInit {
  private accessKeyService: AccessKeyService;

  public static RangeStartDateProperty = "RangeStartDate";
  public static RangeEndDateProperty = "RangeEndDate";
  public static SelectedDateTimeProperty = "SelectedDateTime";
  public static IsEnabledProperty = "IsEnabled";
  public static VisibilityProperty = "Visibility";
  IsOpenError: boolean;
  @Input() GotFocus: (s: any, e: any) => void;
  @Output() GotFocus_Func = new EventEmitter();
  constructor(private intl?: IntlService) {
    super();
    super.controlType = "iDateTimePicker"
  }

  @ViewChild(DatePickerComponent) private datePickerComponent: DatePickerComponent;
  @ViewChild(DateTimePickerComponent) private dateTimePickerComponent: DateTimePickerComponent;
  @Input() DatePickerMode: string;
  @Input() DateTimeFormat: string;
  // @Input() OnDateChange: Function | string;
  // @Input() OnDateValueChanged: Function | string;
  @Output() SelectedDateTimeChange = new EventEmitter();
  @Output() RangeStartDateChange = new EventEmitter();
  @Output() RangeEndDateChange = new EventEmitter();
  
  @Input() DateChangeEventTrigger : boolean;
  
  _SelectedDateTime: DateTime;
  get SelectedDateTime() {
    return this._SelectedDateTime;
  }
  @Input() set SelectedDateTime(value: DateTime) {
    if (value) {
      this._SelectedDateTime = value;
      if (value.Year == 0 || value.Year == 1 || value.Year == 1901) {
        this._SelectedDateTime = null;
        this._ValueDate = null;
      } else {
        this.ValueDate = new Date(value.Year, value.Month - 1, value.Day, value.Hour, value.Minute);
      }

    }
  }

  _ValueDate: Date;
  get ValueDate() {
    return this._ValueDate;
  }
  set ValueDate(value: Date) {
    if (value) {
      this._ValueDate = value;
      if (this._SelectedDateTime != null && this._SelectedDateTime.Equals(DateTime.From(value))) {
        this._SelectedDateTime.SetDateValue(value);
      } else {
        this._SelectedDateTime = new DateTime(value.getFullYear(), value.getMonth() + 1, value.getDate(), value.getHours(), value.getMinutes());
      }
    }
    // else {
    //   this._ValueDate = null;
    //   this._SelectedDateTime = null;
    //   this.SelectedDateTimeChange.emit(this._SelectedDateTime);
    // }
  }

  _PromptOutOfRange: boolean = true;
  get PromptOutOfRange() {
    return this._PromptOutOfRange;
  }
  @Input() set PromptOutOfRange(value: boolean) {
    this._PromptOutOfRange = value;
  }

  OnDateChangeEvent(e) {
    let oldDate;
    if(this._ValueDate){
      oldDate = new DateTime(this._ValueDate.getFullYear(), this._ValueDate.getMonth() + 1, this._ValueDate.getDate(),this._ValueDate.getHours(), this._ValueDate.getMinutes());
    }
    if (e) {
      if (this._SelectedDateTime != null && this._SelectedDateTime.Equals(DateTime.From(e))) {
        this._SelectedDateTime.SetDateValue(e);
      } else {
        this._SelectedDateTime = new DateTime(e.getFullYear(), e.getMonth() + 1, e.getDate(), e.getHours(), e.getMinutes());
      }
      this.SelectedDateTimeChange.emit(this._SelectedDateTime);

      let dateChangeEventArgs = new DateChangeEventArgs();
      dateChangeEventArgs.DateValue = new DateTime(e.getFullYear(), e.getMonth() + 1, e.getDate(), e.getHours(), e.getMinutes()).toDateString();
      if (this.OnDateChange && this.OnDateChange instanceof Function) this.OnDateChange(this, dateChangeEventArgs);
      this.OnDateChange_Func.emit(dateChangeEventArgs);

      let dateChangedArgs = new DateChangedArgs();
      dateChangedArgs.ModifiedDate = new DateTime(e.getFullYear(), e.getMonth() + 1, e.getDate(), e.getHours(), e.getMinutes());
      dateChangedArgs.oldValue = oldDate;
      if (this.OnDateValueChanged && this.OnDateValueChanged instanceof Function) this.OnDateValueChanged({}, dateChangedArgs);
      this.OnDateValueChanged_Func.emit(dateChangedArgs);
      this.assignViewToModel(this._SelectedDateTime,iDateTimePicker.SelectedDateTimeProperty)
    }
  }
  GotFocusEvent(e) {
    if (this.GotFocus instanceof Function) {
      this.GotFocus({}, e);
    }
    this.GotFocus_Func.emit(e);
  }
  _RangeStartDate: DateTime;
  get RangeStartDate() {
    return this._RangeStartDate;
  }
  @Input() set RangeStartDate(value: DateTime) {
    if(value){
    this._RangeStartDate = value;
    this._StartDate = new Date(value.Year, value.Month - 1, value.Day, value.Hour, value.Minute);
    }
  }

  _StartDate: Date;
  get StartDate() {
    return this._StartDate;
  }
  set StartDate(value: Date) {
    this._StartDate = value;
  }

  _RangeEndDate: DateTime;
  get RangeEndDate() {
    return this._RangeEndDate;
  }
  @Input() set RangeEndDate(value: DateTime) {
    if(value){
      this._RangeEndDate = value;
      this._EndDate = new Date(value.Year, value.Month - 1, value.Day, value.Hour, value.Minute, value.Second);
    }
  }

  _EndDate: Date;
  get EndDate() {
    return this._EndDate;
  }
  set EndDate(value: Date) {
    this._EndDate = value;
  }

  _CustomFormat: string;
  get CustomFormat() {
    return this._CustomFormat;
  }
  @Input() set CustomFormat(value: string) {
    this._CustomFormat = value;
    this.format.displayFormat = value;
    this.format.inputFormat = value;
  }

  public format: FormatSettings = {
    displayFormat: '',
    inputFormat: ''
  };

  _EnableCultureSupport: boolean | string;
  get EnableCultureSupport() {
    if ((typeof this._EnableCultureSupport === 'string' && this._EnableCultureSupport === 'True') ||
      (typeof this._EnableCultureSupport === 'string' && this._EnableCultureSupport === 'true')
    ) {
      return true;
    } else if (
      (typeof this._EnableCultureSupport === 'string' && this._EnableCultureSupport === 'False') ||
      (typeof this._EnableCultureSupport === 'string' && this._EnableCultureSupport === 'false')
    ) {
      return false;
    }
    return this._EnableCultureSupport;
  }
  @Input() set EnableCultureSupport(value: boolean | string) {
    this._EnableCultureSupport = value;
  }

  _IsConstrainEntry: boolean | string;
  get IsConstrainEntry() {
    if ((typeof this._IsConstrainEntry === 'string' && this._IsConstrainEntry === 'True') ||
      (typeof this._IsConstrainEntry === 'string' && this._IsConstrainEntry === 'true')
    ) {
      return true;
    } else if (
      (typeof this._IsConstrainEntry === 'string' && this._IsConstrainEntry === 'False') ||
      (typeof this._IsConstrainEntry === 'string' && this._IsConstrainEntry === 'false')
    ) {
      return false;
    }
    return this._IsConstrainEntry;
  }
  @Input() set IsConstrainEntry(value: boolean | string) {
    this._IsConstrainEntry = value;
  }

  private dtmCurrentDTTM: DateTime = DateTime.MinValue;
  get CurrentDateTime() {
    return this.dtmCurrentDTTM;
  }
  @Input() set CurrentDateTime(value: DateTime) {
    this.dtmCurrentDTTM = value;
  }

  public size: DateInputSize = "small";
  public rounded: DateInputRounded = "small";
  public fillMode: DateInputFillMode = "outline";

  @Input() IsFocus: boolean;

  ngOnInit() {
    this.accessKeyService = InjectorInstance.get<AccessKeyService>(AccessKeyService);
  }


  public override Focus() {
    this.DatePickerMode === "DATEPICKER" ? this.datePickerComponent.focus() : this.dateTimePickerComponent.focus();
  }
  public SetDateValue(value: DateTime) {
    if (value) {
      this._SelectedDateTime = value;
      this._ValueDate = new Date(value.Year, value.Month + 1, value.Day, value.Hour, value.Minute, value.Second);
    }
  }
  public SetDateString(sDateTime: string): number {
    let lnResult = 0;
    if (sDateTime === '' || sDateTime === null) {
      lnResult = -1;
      this.ValueDate = null;
    }
    return lnResult;
  };


  public disabledDates = (date: Date): boolean => {
    return date.getDate() % 2 === 0;
  };

  @Output() OnDateChange_Func = new EventEmitter();
  @Output() OnDateValueChanged_Func = new EventEmitter();
  @Input() OnDateChange: Function | string;
  @Input() OnBlurChange: Function | string;
  // @Input() OnDateValueChanged: Function | string;
  
private _OnDateValueChanged: Function | string;
get OnDateValueChanged() {
  return this._OnDateValueChanged;
}
@Input() set OnDateValueChanged(value: Function | string) {
  this._OnDateValueChanged = value;
  if (this.DateChangeEventTrigger) {
    let dateChangedArgs = new DateChangedArgs();
    dateChangedArgs.ModifiedDate = this._SelectedDateTime;
    if (this.OnDateValueChanged && this.OnDateValueChanged instanceof Function) this.OnDateValueChanged({}, dateChangedArgs);      
  }
}

  onBlur(event) {
    this.IsOpenError = false;
    let dateChangeEventArgs = new DateChangeEventArgs();
    dateChangeEventArgs.DateValue = ((this._SelectedDateTime != null) ? this._SelectedDateTime : DateTime.MinValue).toDateString();
    if ((this._ValueDate != null && this.datePickerComponent.value == null) || (this._ValueDate == null && this.datePickerComponent.input.inputValue.includes("day") || this.datePickerComponent.input.inputValue.includes("month") || this.datePickerComponent.input.inputValue.includes("year"))) {
      this.ClearDate();
      if(!(this.datePickerComponent.input.inputValue == "" )){
      this.IsOpenError = true;
      this.DisplayErrorMessage("The system cannot recognise the entered date. Please enter the date in a valid format DD-MMM-YYYY");
      }
    }else if(this.IsValidDateRange()){
      this.ClearDate();
      if (this._PromptOutOfRange){
        this.IsOpenError = true;
        this.DisplayErrorMessage("Date out of Range.\nEnter date between " + " " + this.RangeStartDate.ToString("dd-MMM-yyyy") + " " + "and" + " " +  this.RangeEndDate.ToString("dd-MMM-yyyy"));
    }
    }else{
      if(this._SelectedDateTime != null && this._SelectedDateTime != DateTime.MinValue){
        if (this.OnBlurChange && this.OnBlurChange instanceof Function) this.OnBlurChange(this, dateChangeEventArgs);
      }
    }
  }

  override setFocus() {
    this.DatePickerMode === "DATEPICKER" ? this.datePickerComponent.focus() : this.dateTimePickerComponent.focus();
  }

  ngOnDestroy() {
    this.accessKeyService.unregister(this.id);
  }
  ngDoCheck() {
    this.DetectChange();
  }
  private IsValidDateRange():boolean{
    if(!this.RangeStartDate && !this.RangeEndDate){
      return false;
    }
    else if(DateTime.LessThan(this.SelectedDateTime.Date,this.RangeStartDate.Date)|| DateTime.GreaterThan(this.SelectedDateTime.Date,this.RangeEndDate.Date)){
      return true;
    }else{
      return false
    }
  }
  private DisplayErrorMessage(message:string){
    let oMsgBox: iMessageBox = new iMessageBox();
    oMsgBox.Title = 'Error - Lorenzo';
    oMsgBox.MessageBoxClose = (s, e) => {

    };
    oMsgBox.Height = 170;
    oMsgBox.Width = 420;
    oMsgBox.MessageButton = MessageBoxButton.OK;
    oMsgBox.IconType = MessageBoxType.Critical;
    oMsgBox.Message = message;
    oMsgBox.Show();
  }
  private ClearDate(){
    setTimeout(() => {
      this._ValueDate = new Date();
    }, 0)
    setTimeout(() => {
      this._ValueDate = null;
      this._SelectedDateTime = DateTime.MinValue;
      // this.IsOpenError = true;
      this.SelectedDateTimeChange.emit(this._SelectedDateTime);
      this.assignViewToModel(DateTime.MinValue,iDateTimePicker.SelectedDateTimeProperty);

    }, 50)
  }
}

export class DateChangedArgs {
  _modifiedDate: DateTime;
  _oldValue: DateTime;

  constructor();
  constructor(oDateTime?: DateTime) {
    if (oDateTime)
      this._modifiedDate = oDateTime;
  }
  public get ModifiedDate(): DateTime {
    return this._modifiedDate;
  };
  public set ModifiedDate(value: DateTime) {
    this._modifiedDate = value;
  };
  public get oldValue(): DateTime {
    return this._oldValue;
  };
  public set oldValue(value: DateTime) {
    this._oldValue = value;
  };
}
export class DateChangeEventArgs {
  public DateValue: string;
}
