import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { NumericTextBoxComponent } from '@progress/kendo-angular-inputs/numerictextbox/numerictextbox.component';
import { Control } from '../Control';
import { InputSize } from '@progress/kendo-angular-inputs';
import { Convert } from '../../services/convert.service';

@Component({
  selector: 'iUpDownBox',
  templateUrl: './epma-updownbox.component.html',
  styleUrls: ['./epma-updownbox.component.css'],
})
export class iUpDownBox extends Control implements OnInit {
  constructor(
    private elementRef?: ElementRef
  ) {
    super();
    super.controlType = 'iUpDownBox';
    this.style['width'] = "170px"
  }
  size: InputSize = 'small'
  ngOnInit(): void {
    this.style['padding'] = "0px 0px";
  }

  ngAfterViewInit(){
    this.enableDisableUpDownButtons(this.Value);
  }
  public static ValueProperty = 'Value';
  public static IsEnabledProperty = 'IsEnabled';
  public static VisibilityProperty = 'Visibility';

  public isInitialValueSet: boolean = false;

  public decimalRegexExp = new RegExp(/^\d*\.?\d*$/);
  _precision: number = 0;
  get Precision() {
    return this._precision;
  }
  @Input() set Precision(value: any) {
    this._precision = value;
      if(value > 0){
      this.decimalRegexExp= new RegExp("^(\\d*)(\\.?)(\\d{1,"+value+"})?$")
    }
  }
  // @Input() IsTabStop: string;
  // @Input() TabIndex: string;
  // @Input() ValueChanged: Function | string;
  @Output() ValueChange = new EventEmitter();
  _IsDecimal: boolean | string;
  get IsDecimal(): string | boolean {
    return this._IsDecimal;
  }
  @Input() set IsDecimal(value: string | boolean) {
    if (value == 'False') {
      this.DecimalPlaces = 'n0';
    }

    this._IsDecimal = value;
  }

  kDecimalPlaces: string = 'n0';

  _DecimalPlaces: string | boolean;
  get DecimalPlaces(): string | boolean {
    return this._DecimalPlaces;
  }

  @Input() set DecimalPlaces(value: string | boolean) {
    if (typeof value == 'string') {
      this._DecimalPlaces = value;
      this.kDecimalPlaces = value;
    }
  }

  _uptext: number;


  kIncrement: number = 1;

  _Increment: number | string;
  get Increment(): number | string {
    if (this._Increment)
      return this._Increment;
    else
      return 1;
  }
  @Input() set Increment(value: number | string) {
    this._Increment = value;
    if (typeof value == 'number')
      this.kIncrement = value;
    else
      this.kIncrement = Convert.ToInt16(value);
  }

  _Value: number;
  get Value(): number {
    return this._Value;
  }
  @Input() set Value(value: number | string) {
    if (typeof value === 'string') {
      value = parseInt(value)
    }
    if(value == 0)
      this._Value = null;
    else    
      this._Value = value;

    if (this.enableDisableUpDownButtons instanceof Function && !this.isInitialValueSet) {
      this.enableDisableUpDownButtons(this.Value)
    }
  }

  kMinimum: number;

  _minimum: number = 0;
  get Minimum(): number {
    return this._minimum;
  }
  @Input() set Minimum(value: number | string) {
    if (typeof value === 'string') {
      value = parseInt(value)
    }
    this._minimum = value;
  }

  _maximum: number = 100;
  get Maximum(): number {
    return this._maximum;
  }
  @Input() set Maximum(value: number | string) {
    if (typeof value === 'string') {
      value = parseInt(value)
    }
    this._maximum = value;
  }

  @Output() ValueChanged_Func = new EventEmitter();
  @Input() ValueChanged: Function | string;

  ValueChangedEvent(e) {
    this.isInitialValueSet = true;
    if(e == 0){
      this.Value = null;
      this.enableDisableUpDownButtons(e);
      if (this.ValueChanged instanceof Function) {
        this.ValueChanged({}, e);
      }
      this.ValueChanged_Func.emit(e);
    }else{
      // this.ValueChange.emit(e);
      this.Value = e;
      this.enableDisableUpDownButtons(e);
      if (this.ValueChanged instanceof Function) {
        this.ValueChanged({}, e);
      }
      this.ValueChanged_Func.emit(e);
    }
  }

  ngModelChangeEvent(e) {
    if(e == 0){
      this._Value = null;
      this.ValueChange.emit(null);
    }else{
      this._Value = e;
      this.ValueChange.emit(e);
      this.assignViewToModel(e,iUpDownBox.ValueProperty);
    }
  }

  GetValue(): string | number {
    return this.Value;
  }
  ngDoCheck() {
    this.DetectChange();
  }
  @ViewChild('iUpDownFocus')
  private numeric_input: NumericTextBoxComponent;

  override Focus() {
    setTimeout(() => {
      this.numeric_input.focus();
    }, 0);
  }

  restrictEvent(e) {
    var inputKeyCode = e.keyCode ? e.keyCode : e.which;
    if(inputKeyCode != null && inputKeyCode != 46){
      let key = Number(e.key);
      if (isNaN(key) || e.key === null || e.key === ' ') {
        e.preventDefault();
      }
    }
  }

  override KeyDownEvent(e) {
    this.isInitialValueSet = true;
    let value = parseInt(e.target.value);
    this.enableDisableUpDownButtons(value);
    super.KeyDownEvent(e);
  }

  enableDisableUpDownButtons(value) {
    // Enable or Disable Down button in the UpdownBox control...
    if(this.elementRef && this.elementRef.nativeElement)
    {
      if (value === this.Minimum || value === null || value === undefined || Number.isNaN(value)) {
        if (this.elementRef.nativeElement.querySelector('span')) {
          this.elementRef.nativeElement.querySelector('span').lastChild.disabled = true;
        }
      } else {
        if (this.elementRef.nativeElement.querySelector('span')) {
          this.elementRef.nativeElement.querySelector('span').lastChild.disabled = false;
        }
      }

      // Enable or Disable Up button in the UpdownBox control...
      if (value === this.Maximum) {
        if (this.elementRef.nativeElement.querySelector('span')) {
          this.elementRef.nativeElement.querySelector('span').firstChild.disabled = true;
        }
      } else {
        if (this.elementRef.nativeElement.querySelector('span')) {
          this.elementRef.nativeElement.querySelector('span').firstChild.disabled = false;
        }
      }
    }
  }
}
