import { AfterViewInit, Component, DoCheck, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
// import { Binding } from 'src/app/epma-controls-test/common-attribute-test/isenabled-test/isenabled-test.component';
// import { HorizontalAlignment, VerticalAlignment } from '../../../../product/shared/models/constant';
import { NumericTextBoxComponent, TextAreaComponent, TextBoxComponent } from '@progress/kendo-angular-inputs';
import { InjectorInstance } from 'src/app/app.module';
import { AccessKeyService } from '../AccessKey.service';
import { Control, TextAlignment, TextChangedEventArgs } from '../Control';
import { RoutedEventArgs } from '../FrameworkElement';
import { NumberFormatOptions } from '@progress/kendo-angular-intl';
import { GridExtension } from '../epma-grid-helpers/grid-extension';
import { Convert } from '../../services/convert.service';
import { TooltipDirective } from '@progress/kendo-angular-tooltip';

var that;
@Component({
  selector: 'iTextBox',
  templateUrl: './epma-itextbox.component.html',
  styleUrls: ['./epma-itextbox.component.css']
})
export class iTextBox extends Control implements OnInit, AfterViewInit, DoCheck {
  private accessKeyService: AccessKeyService;
  public static IsEnabledProperty = "IsEnabled";
  public static TextProperty = "Text";
  public static VisibilityProperty = "Visibility";
  public static TagProperty = "Tag";
  public decimalRegexExp = new RegExp(/^\d*\.?\d*$/);
  public autoCorrect = true;
  @Input() AlteredTextArea = false;
  @ViewChild(TooltipDirective) public tooltipDir: TooltipDirective;
  @ViewChild(NumericTextBoxComponent) private numericTxtbox: NumericTextBoxComponent;
  numstep = null;
  textRows: number;

  private _IsDelayBlurForGrid: boolean = false;
  @Input() set IsDelayBlurForGrid(val: any) {
    let value = val.toLowerCase();
    if (value == 'true')
      this._IsDelayBlurForGrid = true;
    else
      this._IsDelayBlurForGrid = false;
  }

  get IsDelayBlurForGrid(): boolean {
    return this._IsDelayBlurForGrid;
  }

  @Input() set TextRows(val: number | string) {
    this.textRows = Number(val);
  }

  get TextRows() {
    return this.textRows;
  }

  mouseevent(toolTipTempRef: Element, tooltipShow) {
    if (tooltipShow) {
      this.tooltipDir.show(toolTipTempRef);
    } else {
      this.tooltipDir.hide();
    }
  }

  @Input() set BorderBrush(colorObj: any) {
    let colorText: string = null;
    if (colorObj && colorObj.color && colorObj.color.R != undefined && colorObj.color.G != undefined && colorObj.color.B != undefined) {
      if (colorObj.color.A != undefined) {
        let alpha = 1;
        if (colorObj.color.A <= 1)
          alpha = colorObj.color.A;
        else
          alpha = colorObj.color.A / 255;
        colorText = "rgba(" + colorObj.color.R + "," + colorObj.color.G + "," + colorObj.color.B + "," + alpha + ")";
      }
      else
        colorText = "rgb(" + colorObj.color.R + "," + colorObj.color.G + "," + colorObj.color.B + ")";
    }
    if (colorText && colorText.length > 0) {
      this.style['border-color'] = colorText;
    }
    else {
      if (this.style['border-color'])
        delete this.style['border-color'];
    }
  }

  // ColumnCellIndex is introduced for managing grid cell editing
  @Input() ColumnCellIndex: string;
  @Input() GridColumn?: any;
  // @Input() GridHelper?: GridExtension;
  @Output() TextOnBlur = new EventEmitter();

  _GridHelper: GridExtension = new GridExtension();
  get GridHelper() {
    return this._GridHelper;
  }
  @Input() set GridHelper(value: GridExtension) {
    this._GridHelper = value;
  }

  _BindingPath: string;
  get BindingPath() {
    return this._BindingPath;
  }
  @Input() set BindingPath(value: any) {
    this._BindingPath = value;
  }

  @Input() RaiseTxtChangeEvent: boolean = false;

  private _text_: string | number = "";
  override get Text() {
    return this._text_ ?? '';
  }
  @Input() override set Text(value: any) {
    if (this.Type === 'Numeric' && value != 'undefined' && value != null && Object.keys(value).length > 0) {
      if (this.Type === 'Numeric' && value != Math.floor(value)) {
        value = parseFloat(value);
      } else {
        value = parseInt(value);
      }
    }
    if (this.Type === 'StringNumeric' && this.isDecimalEndChar && !((this._text_ as string).includes("."))) {
      this._text_ = value + ".";
      return;
    }
    this._text_ = value;
    // to trigger the TextChanged event when the control assigned with default value on initial load
    if (this.RaiseTxtChangeEvent) {
      if (this.TextChanged instanceof Function) {
        this.TextChanged(this, new TextChangedEventArgs());
      }
      this.RaiseTxtChangeEvent = false;
    }
    // const textObject = this.BindingObjects.find(ele => ele.ObjectType == "Text");
    // if (textObject) {
    //   this.setBindingPath(textObject.Object, textObject.Property, this._text);  
    // }  
  }
  isDecimalEndChar: boolean = false;


  ngModelChangeEvent(e) {
    let maximumValidationFailed = false;
    let textUpdated: boolean;
    if (this.Type == "StringNumeric") {
      textUpdated = this.validateNumberText(e);
      if (textUpdated) {
        e = this._text_;
      }

      let k = 0;
      for (let i = 0; i < e.length; i++) {
        if (e[i] == '.') {
          k++;
        }
        if (k > 1) {
          let prev = this._text_;
          setTimeout(() => {
            this._text_ = prev;
            this.TextChange.emit(this._text_);
          });
        }
      }


      if ((this._maximum && (parseFloat(e) > Convert.ToInt64(this._maximum))) || (!this._maximum && this._scale && (parseFloat(e) > Convert.ToInt64(this.getMaximumByScale(this._scale))))) {
        if (this._text_.toString().Contains('.') && !e.toString().Contains('.')) {
          let _index = this._text_.toString().indexOf('.');
          this._text_ = this._text_.toString().toString().slice(0, _index);
        }
        maximumValidationFailed = true;
        let prev = this._text_;
        this._text_ = null;
        setTimeout(() => {
          this._text_ = prev;
          this.TextChange.emit(this._text_);
        });
      }
    }

    if (this.Type == "Numeric") {
      let deletePrecision = true;
      if ((this._maximum && e > this._maximum) || (!this._maximum && this._scale && Math.trunc(e) > parseInt(this.getMaximumByScale(this._scale)))) {
        if (this._text_.toString().Contains('.') && !e.toString().Contains('.')) {
          let _index = this._text_.toString().indexOf('.');
          this._text_ = parseInt(this._text_.toString().toString().slice(0, _index));
          deletePrecision = false;
        }
        maximumValidationFailed = true;
        if (deletePrecision) {
          if (this.DefaultMaximum) {
            this._text_ = e;
            this.TextChange.emit(this._text_);
          } else {
            let prev = this._text_;
            this._text_ = null;
            setTimeout(() => {
              this._text_ = prev;
              this.TextChange.emit(this._text_);
            });
          }
        }
      }
    }

    if (!maximumValidationFailed) {
      if(this._SelectedNumericValue == false){
        this._text_ = e;
        this.TextChange.emit(this._text_);
      }
    }

    const textObject = this.BindingObjects.find(ele => ele.ObjectType == "Text");
    if (textObject) {
      if (textObject.Object)
        this.setBindingPath(textObject.Object, textObject.Property, this._text_);
      else if (this.DataContext) {
        this.setBindingPath(this.DataContext, textObject.Property, this._text_);
      }
    }
  }

  ngAfterViewInit(): void {
    if (this.numericTxtbox?.selectOnFocus)
      this.numericTxtbox.selectOnFocus = false;
  }


  _DefaultMaximum: boolean;
  get DefaultMaximum() {
    return this._DefaultMaximum;
  }
  @Input() set DefaultMaximum(value: any) {
    this._DefaultMaximum = value;
  }


  /**
   * getMaximum
   */
  private getMaximumByScale(scale) {
    let max = '';
    for (let i = 0; i < scale; i++) {
      max = max + '9';
    }
    return max;
  }

  // ngAfterViewInit(): void {
  //   setTimeout(() => {
  //     if (this.DataContext != null && this.BindingPath != null) {
  //       let binding = new Binding();
  //       binding.PathObject = this.DataContext;
  //       binding.Path = this.BindingPath;
  //       this.SetBinding('Text', binding);
  //     }
  //   }, 0);
  // }

  // txtChange(value:any){    
  //   //this._text_ = value;
  //   this.TextChange.emit(value);

  // }

  _textWrapping: string = 'NoWrap';
  override get TextWrapping() {
    return this._textWrapping;
  }
  @Input() override set TextWrapping(value: any) {
    this._textWrapping = value;
  }

  ngDoCheck() {
    super.DetectChange();
  }

  KeyUpEventTextArea(e) {
    //   if(this.IsStopPropagation){
    //   super.stopEventPropagation(e);
    //   if(e.ctrlKey && e.altKey){
    //     let AK = e.key;
    //     let accessKeyService: AccessKeyService = InjectorInstance.get<AccessKeyService>(AccessKeyService);
    //     accessKeyService.keyPress(AK);
    // }
    //   }else{
    super.KeyUpEvent(e);
    // }
  }
  // SetBinding(controlProperty, binding: Binding) {
  //   if (controlProperty === 'Text' || controlProperty === 'Tag') {
  //     let BindingPathValue = this.getBindingPath(binding.PathObject, binding.Path);
  //     let bObject: SetBindingObject = {
  //       ObjectType: controlProperty,
  //       Property: binding.Path,
  //       Object: binding.PathObject,
  //       SetValue(obj, value) {
  //         obj[controlProperty] = value;
  //       },
  //       GetValue(obj) {
  //         return obj[controlProperty];
  //       },
  //     };
  //     bObject.SetValue(this, BindingPathValue);
  //     this.BindingObjects.push(bObject);
  //   }

  //     // if (binding.Source) {

  //     //   this.TextObject.SetValue(binding.Source);
  //     // } else {
  //     //   this.TextObject.Property = binding.Path;
  //     //   this.TextObject.Object = binding.PathObject;
  //     //   this.TextObject.SetValue(this.getBindingPath(binding.PathObject, binding.Path));
  //     // }
  //   // if (controlProperty === 'Text') {
  //   //   this.TextObject.Property = binding.Path;
  //   //   this.TextObject.Object = binding.PathObject;
  //   //   this.TextObject.SetValue(this.getBindingPath(binding.PathObject, binding.Path));
  //   // } 
  //   else if (controlProperty === 'IsEnabled') {
  //     this.IsEnabledObject.Property = binding.Path;
  //     this.IsEnabledObject.Object = binding.PathObject;
  //     this.IsEnabledObject.SetValue(this.getBindingPath(binding.PathObject, binding.Path));
  //   } else if (controlProperty === 'Tag') {
  //     // this.TagObject.Property = binding.Path;
  //     // this.TagObject.Object = binding.PathObject;
  //     // this.TagObject.SetValue(this.getBindingPath(binding.PathObject, binding.Path));
  //   }
  // }

  gotEnabled(v: boolean) {
    if (typeof this._isEnabled === 'string') {
      if (v) {
        this.IsEnabledChange.emit("True");
      } else {
        this.IsEnabledChange.emit("False");
      }
    } else {
      this.IsEnabledChange.emit(v);
    }
    setTimeout(() => {
      this.IsEnabled = !this.IsEnabled;
      this.IsEnabledChange.emit(this.IsEnabled);
    }, 5000);
  }
  @Output() TextChanged_Func: EventEmitter<TextChangedEventArgs> = new EventEmitter<TextChangedEventArgs>();
  @Output() SelectionChanged_Func = new EventEmitter();
  @Output() GotFocus_Func = new EventEmitter();
  @Output() LostFocus_Func = new EventEmitter();
  @Input() TextChanged: Function | string;
  @Input() TextTrimming: string;
  // @Input() Type: string;
  // @Input() IsTabStop: boolean | string;
  // @Input() Nonnegative: boolean | string;
  // @Input() Scale: number | string;
  // @Input() Precision: number | string;
  // @Input() MaxLength: number | string;
  // @Input() TabIndex: number | string;
  @Input() SelectionChanged: Function | string;
  @Input() GotFocus: Function | string;
  @Input() LostFocus: Function | string;
  @Input() RenderTransformOrigin: number | string;

  _IsReadOnly: boolean;
  get IsReadOnly() {
    return this._IsReadOnly
  }
  @Input() set IsReadOnly(v: any) {
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

  _type: string;
  get Type() {
    return this._type;
  }
  @Input() set Type(v: string | number) {
    let value: string;
    if (typeof v == 'number') {
      if (v == 0) {
        value = 'Alpha';
      } else if (v == 1) {
        value = 'Numeric';
      } else if (v == 2) {
        value = 'AlphaNumeric';
      } else {
        value = 'Text';
      }
    } else {
      this._type = v;
    }
  }

  _maxLength: number;
  get MaxLength() {
    return this._maxLength
  }
  @Input() set MaxLength(value: any) {
    this._maxLength = value;
  }

  _acceptsReturn: boolean;
  get AcceptsReturn() {
    return this._acceptsReturn;
  }
  @Input() set AcceptsReturn(value: any) {
    this._acceptsReturn = value;
  }

  _SelectionStart: number;
  get SelectionStart() {
    return this._SelectionStart;
  }
  @Input() set SelectionStart(value: number) {
    this._SelectionStart = value;
  }

  _minimum: number;
  get Minimum() {
    return this._minimum;
  }
  @Input() set Minimum(value: any) {
    this._minimum = value;
  }

  _maximum: number;
  get Maximum() {
    return this._maximum;
  }
  @Input() set Maximum(value: any) {
    this._maximum = value;
  }

  _scale: number;
  get Scale() {
    return this._scale;
  }
  @Input() set Scale(value: any) {
    this._scale = value;
    // if(this._scale && this._scale > 0){
    //   let value  = Math.pow(10,this._scale) -1;
    //   this._maximum = value;
    // }
  }

  _nonnegative: boolean;
  get Nonnegative() {
    return this._nonnegative;
  }
  @Input() set Nonnegative(v: any) {
    let value: boolean;
    if (typeof v === "string") {
      if (v === "True") {
        value = true;
      } else {
        value = false;
      }
    } else {
      value = v;
    }
    this._nonnegative = value;
    if (this._nonnegative == true) {
      this.Minimum = 0;
    }
  }

  _precision: number;
  get Precision() {
    return this._precision;
  }
  @Input() iSpecialCharNotAllowed = false;
  @Input() set Precision(value: any) {
    this._precision = value;
    if (this.Type === "StringNumeric") {
      if (value > 0) {
        this.decimalRegexExp = new RegExp("^(\\d*)(\\.?)(\\d{1," + value + "})?$")
      }
    }
  }

  currentRowIndex;
  override KeyDownEvent(e) {
    if (e.keyCode == 9 && this.GridHelper != null && this.GridHelper.isTabKeyPress) {
      let cellindex = Number(this.ColumnCellIndex.substring(this.ColumnCellIndex.length - 1)) + 1;
      let cellindexString = 'cell' + cellindex;
      this.DataContext[cellindexString] = true;
      if (cellindexString == 'cell8') {
        this.GridHelper.ItemsSource.array.forEach((item, index) => {
          if (item.Equals(this.DataContext)) {
           this.currentRowIndex = index;
          }
        });
        this.DataContext['cell7'] = false;
        if (this.GridHelper.ItemsSource.array.length > this.currentRowIndex + 1) {
          this.DataContext = this.GridHelper.ItemsSource.array[this.currentRowIndex + 1];
          cellindexString  = 'cell1'
          this.DataContext[cellindexString] = true;
        }
      }
    }
    if (e.keyCode == 8 && (this.AcceptsReturn == 'True' && (this.Type != 'Numeric' || this.TextWrapping == 'Wrap'))) {
      e.stopPropagation();
    }
    if (e.ctrlKey && e.keyCode == 65) {
      e.preventDefault();
      const inputElement = e.target;
      inputElement.setSelectionRange(0, inputElement.value.length);
    }
    if (this.KeyDown instanceof Function) {
      this.KeyDown({}, e);
    }
    this.KeyDown_Func.emit(e);
  }
  KeyDownEventStringNumeric(e) {
    let inputKeyCode = e.keyCode ? e.keyCode : e.which;
    let regex = new RegExp(/^(\d*)(\.?)(\d{1})?$/);
    if (this.Type == "StringNumeric") {
      if (inputKeyCode == 8 && e.target.value.includes(".") && regex.test(e.target.value))
        this.isDecimalEndChar = true;
      else
        this.isDecimalEndChar = false;
    }
  }

  @ViewChild('itextbox') private elementRef: ElementRef;
  constructor() {
    super();
    super.controlType = 'TextBox';
    that = this;
    this.style['height'] = "21px"
    this.style['min-width'] = "80px";
  }

  ngOnInit(): void {
    this.accessKeyService = InjectorInstance.get<AccessKeyService>(AccessKeyService);
  }

  @ViewChild(TextAreaComponent) private eltxtArea: TextAreaComponent;
  @ViewChild(TextBoxComponent) private eltxtBox: TextBoxComponent;
  @ViewChild(NumericTextBoxComponent) private elNumerictxtBox: NumericTextBoxComponent;

  isFocus = false;
  onblur() {
    this.isFocus = false;
    if (this.Type == "StringNumeric" && this._text_ && (this._text_ as string)[(this._text_ as string).length - 1] == ".") {
      this._text_ = (this._text_ as string).slice(0, -1);
    }
    // This condition is added for managing grid cell editing
    if (this.ColumnCellIndex && this.DataContext && this.DataContext[this.ColumnCellIndex]) {
      if (this.IsDelayBlurForGrid) {
        setTimeout(() => {
          this.DataContext[this.ColumnCellIndex] = false;
        }, 300)
      }
      else {
        this.DataContext[this.ColumnCellIndex] = false;
      }

      if (this.GridHelper && this.GridHelper.EnableCellEditEnded) this.GridHelper.CellEditEnded(this);
      if (this.GridHelper && this.GridHelper.EnableCellValidating) this.GridHelper.CellValidating(this);
    }
    this.restrictScale();
    this.TextOnBlur.emit(this);
  }
  override Focus() {
    this.isFocus = true;
    this.eltxtArea?.focus();
    this.eltxtBox?.focus();
    this.elNumerictxtBox?.focus();
  }

  override setFocus() {
    setTimeout(() => {
      this.isFocus = true;
      this.eltxtArea?.focus();
      this.eltxtBox?.focus();
      this.elNumerictxtBox?.focus();
      if (this.GridHelper && this.GridHelper.EnableCellEditStarted) this.GridHelper.CellEditStarted(this);
    });
  }

  selectAllText() {
    if (this.Text && this.Text != '') {
      setTimeout(() => {
        (this.elementRef as any).selectAll();
      })
    }
  }


  checkEnum() {
    alert(this.HorizontalAlignment);
  }

  public Numbericformat: NumberFormatOptions = {
    useGrouping: false,
    style: "decimal"
  }

  _OldValue: string;

  _SelectedNumericValue : boolean = false;

  restrictEvent(e) {
    var inputKeyCode = e.keyCode ? e.keyCode : e.which;
    if(this.Type == 'Numeric'){
      if(inputKeyCode != null && inputKeyCode != 46){
        let key = Number(e.key);
        if (isNaN(key) || e.key === null || e.key === ' ') {
          e.preventDefault();
        }
      }
      if(inputKeyCode != null && inputKeyCode == 46){
        if(this._precision != null && this._precision == 0){
          e.preventDefault();
        }else{
          let textNumber = e.target.value;
          if(textNumber != null && textNumber != ''){
            let startIndex = e.target.selectionStart;
            let endIndex = e.target.selectionEnd;
            let selectedText = null;
            if(endIndex - startIndex > 0)
            {
              selectedText = textNumber.substring(startIndex, endIndex);
              if(selectedText != null && (selectedText.length > 0 && selectedText.length == textNumber.length)){
              this._SelectedNumericValue = true;
              }
            }
          }
        }
      }
    }
    if (this.Nonnegative == true) {
      if (inputKeyCode != null) {
        if (inputKeyCode == 45) e.preventDefault(); // Minus
      }
      this._OldValue = this.Text;
      if ((this.Text && this.Text != '') && (inputKeyCode != 110 && inputKeyCode != 46)) {
        let value = e.target.value;
        let txt = Math.round(value).toString();
        let TextNumberSelected = false;
        if(value != null && value != ''){
          let startIndex = e.target.selectionStart;
          let endIndex = e.target.selectionEnd;
          let selectedText = null;
          if(endIndex - startIndex > 0)
          {
            selectedText = value.substring(startIndex, endIndex);
            if(selectedText != null && selectedText.length > 0){
              TextNumberSelected = true;
            }
          }
        }

        if (this.Scale && (txt.length > this.Scale - 1 && !value.includes(".")))
          if(TextNumberSelected == false)
          e.preventDefault();
      }
    }
    if (inputKeyCode != null && this.iSpecialCharNotAllowed) {
      if (inputKeyCode == 37 || inputKeyCode == 47 || inputKeyCode == 42) {
        e.preventDefault();
      }
    }
  }

  restrictScale() {
    let value = this.Text;
    if (this.Nonnegative == true && (this._maxLength && value.length > this._maxLength)) {
      this.Text = this._OldValue;
    }
    else if ((!this.Nonnegative && this.Text) && (this._maxLength && value.length > this._maxLength)) {
      this.Text = this.Text.substr(0, this._maxLength);
      setTimeout(() => {
        this.TextChange.emit(this.Text);
      });
    }
  }

  FocusOutEvent(e) {
    if (this.LostFocus instanceof Function) {
      this.LostFocus({}, e);
    }
    this.LostFocus_Func.emit(e);
  }

  TextChangedEvent(e) {
    if (this.TextChanged instanceof Function) {
      this.TextChanged(this, new TextChangedEventArgs());
    }
    this.TextChanged_Func.emit(new TextChangedEventArgs());
  }

  SelectionChangedEvent(e) {
    if (e === null) {
      if(this._SelectedNumericValue == false){
        this.Text = "";
      }
      else
      	this._SelectedNumericValue = false;
    }
    if (this.SelectionChanged instanceof Function) {
      this.SelectionChanged(this, new RoutedEventArgs());
    }

    this.SelectionChanged_Func.emit(new RoutedEventArgs());
  }

  GotFocusEvent(e) {
    if (this.GotFocus instanceof Function) {
      this.GotFocus({}, e);
    }
    this.GotFocus_Func.emit(e);
  }

  ngOnDestroy() {
    this.accessKeyService.unregister(this.id);
  }
  validateNumber(event) {
    let elem = event.target.value;
    var regex = new RegExp(/^\d*\.?\d*$/);
    //debugger;
    if (elem && regex.test(String(elem))) {
      if (!this.decimalRegexExp.test(elem)) {
        event.target.value = elem.slice(0, -1);
      }
      return true;
    } else {
      for (let i = 0; i < elem.length; i++) {
        if (!regex.test(elem[i])) {
          event.target.value = elem.replace(elem[i], "");
          break;
        }
      }
      return false
    }
  }

  validateNumberText(elem) {
    // let elem = event.target.value;
    let textUpdated = false;
    var regex = new RegExp(/^\d*\.?\d*$/);
    //debugger;
    if (elem && regex.test(String(elem))) {
      if (!this.decimalRegexExp.test(elem)) {
        this._text_ = elem.slice(0, -1);
        textUpdated = true;
      }
      if (elem && elem.charCodeAt(elem.length - 1) == 46) {
        //this.isDecimalEndChar=true;
        this._text_ = elem.slice(0, -1);
        textUpdated = true;
      }
      return textUpdated;
    } else {
      for (let i = 0; i < elem.length; i++) {
        if (!regex.test(elem[i])) {
          this._text_ = elem.replace(elem[i], "");
          textUpdated = true;
          break;
        }
      }
      return textUpdated;
    }
  }



  _textAlignment: string;
  get TextAlignment() {
    return this._textAlignment;
  }
  @Input() set TextAlignment(v: any) {
    let value: string;
    if (v == 'Center' || v == 0) {
      value = 'center';
    } else if (v == 'Left' || v == 1) {
      value = 'left';
    } else if (v == 'Right' || v == 2) {
      value = 'right';
    } else {
      value = 'justify';
    }
    this._textAlignment = value;
  }
  textareaText: string = "";
  ngmodelchangetextarea(e) {
    this._text_ = e;
  }
  onfocustextarea() {
    this.textareaText = this._text_ as string;
  }
  onblurtextarea() {
    //this._text_ = this.textareaText;
    if (this.textareaText != this._text_)
      this.TextChange.emit(this._text_);


    // const textObject = this.BindingObjects.find(ele => ele.ObjectType == "Text");
    // if (textObject) {
    //   if (textObject.Object)
    //     this.setBindingPath(textObject.Object, textObject.Property, this._text_);
    //   else if (this.DataContext) {
    //     this.setBindingPath(this.DataContext, textObject.Property, this._text_);
    //   }
    // }
    this.onblur();

  }
}

export enum DataType {
  Alpha = 0,
  Numeric = 1,
  AlphaNumeric = 2,
  Text = 3
}
