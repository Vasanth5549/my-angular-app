import { Component, Input, OnInit, Output, EventEmitter, ViewChild, ElementRef, OnDestroy, AfterViewInit } from '@angular/core';
import { InjectorInstance } from 'src/app/app.module';
import { AccessKeyService } from '../AccessKey.service';
import { Control } from '../Control';
import { iRadioButtonService } from '../iradiobutton';
import { RoutedEventArgs } from '../FrameworkElement';

@Component({
  selector: 'iRadioButton',
  templateUrl: './epma-radiobutton.component.html',
  styleUrls: ['./epma-radiobutton.component.css']
})
export class iRadioButton extends Control implements OnDestroy, AfterViewInit {
  private accessKeyService: AccessKeyService;
  public static IsCheckedProperty = "IsChecked";
  // @Output() TextChange = new EventEmitter();
  @Output() IsCheckChange = new EventEmitter();
  @Output() IsCheckedChanges = new EventEmitter();
  @Output() Checked_Func = new EventEmitter();
  @Output() Click_Func = new EventEmitter();
  @Input() Click: Function | string;
  @Input() GroupName: string;
  @Input() Checked: Function | string;
  @Input() IsWordWrap: boolean | string;
  // @Input() IsTabStop: boolean | string;
  _IsChkChecked = true;

  @Input() set Value(value: any) {
    this.__Value = value;
  }
  get Value() {
    return this.__Value;
  }



  @Input() set IsChkChecked(value: boolean | string) {
    let v: boolean;
    if (typeof v === 'string') {
      if (v === 'True') {
        value = true;
      } else {
        value = false;
      }
    } else {
      value = v;
    }
    this._IsChecked = value;
    if (this._IsChecked) {
      this.IsCheckedTrue();
    } else {
      this.IsCheckedFalse();
    }
  }

  get IsChkChecked() {
    return this._IsChecked;
  }
  IsCheckedTrue() {

  }

  IsCheckedFalse() {
    //this.renderer.setAttribute(this.elementref.nativeElement, 'IsChecked', 'true');
  }

  @Output() IsReadOnlyChange = new EventEmitter();
  _IsReadOnly = false;
  get IsReadOnly() {
    return this._IsReadOnly
  }

  @Input() set IsReadOnly(v: boolean | string) {
    let value: boolean;
    if (typeof v === "string") {
      if (v === "True" || v === "true") {
        value = true;
      } else {
        value = false;
      }
    } else {
      value = v;
    }

    this._IsReadOnly = value;
  }

  override model: RadioModel;

  constructor(
    public iradiobuttonService?: iRadioButtonService
  ) {
    super();
    super.controlType = 'RadioButton'
    this.model = new RadioModel();
  }
  ngOnInit(): void {
    this.accessKeyService = InjectorInstance.get<AccessKeyService>(AccessKeyService);
  }
  ngAfterViewInit() {
    // this.iradiobuttonService.arriRadioButton.push(this);
    // this.model.radioButtons.push(this);
    this.model = this.iradiobuttonService.register(this);
  }
  onButtonClick(event, value, name) {
    // this.iradiobuttonService.change(value, name);
    let _RoutedEventArgs: RoutedEventArgs = event;
    if (this.Click instanceof Function) this.Click({}, _RoutedEventArgs);

      this.Click_Func.emit(_RoutedEventArgs);
  }
  @ViewChild('radioFocus') searchElement: ElementRef;

  override setFocus() {
    setTimeout(() => {
      this.searchElement.nativeElement.focus();
    }, 0);
  }

  change_event(e, value, name) {
    // this.iradiobuttonService.change(value, name);
    // this.IsCheckedChange.emit(true);
    if (this.Checked instanceof Function) this.Checked({}, e);
      this.Checked_Func.emit(e.target.value);
  }

  public override isCheckedRadioButtonExtention() {
    this.iradiobuttonService.change(this.__Value, this.GroupName);
  }

  ngDoCheck() {
    this.DetectChange();
    // if (this.model.IsChecked == this.__Value && this._IsChecked != true) {
    //   this._IsChecked = true;
    //   this.IsCheckedChange.emit(this._IsChecked);
    //   // this.det
    // } else if (this.IsChecked != false) {
    //   this._IsChecked = false;
    //   this.IsCheckedChange.emit(this._IsChecked);
    // }
  }

  updateChange(e) {
    this.model.IsChecked = e;
  }
  override clearValues(){
    let allFalse : boolean = true;
      this.model.radioButtons.forEach(element => {
        if (element._IsChecked) 
          allFalse = false;
      });

      if (allFalse)
      this.model.IsChecked = { value: null };
  }

  ngOnDestroy() {
    this.iradiobuttonService.remove(this);
    this.accessKeyService.unregister(this.id);
  }
}


export class RadioModel {
  constructor(val?: any) {
  }
  private _IsChecked = '';
  set IsChecked(value: any) {
    let val;
    if (value instanceof Object) {
      val = value.value;
    } else {
      val = value;
    }
    this._IsChecked = val;
    this.radioButtons.forEach(element => {
      if (element.Text == val) {
        element._IsChecked = true;
        if (value instanceof Object) {
          element.IsCheckedChange.emit(true);
          element.assignViewToModel(element._IsChecked, "IsChecked");
        }
        else {
          element.IsCheckedChange.emit(true);
          element.assignViewToModel(element._IsChecked, "IsChecked");
        }
      } else {
        element._IsChecked = false;
        element.IsCheckedChange.emit(false);
        element.assignViewToModel(element._IsChecked, "IsChecked");
      }
    });
  }
  get IsChecked() {
    return this._IsChecked;
  }


  public radioButtons: iRadioButton[] = [];

}
