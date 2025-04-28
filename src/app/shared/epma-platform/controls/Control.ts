import {
  ChangeDetectorRef,
  Component,
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  PipeTransform,
} from '@angular/core';
import { iLabel, TextBlock } from 'epma-platform/controls';
import DateTime from 'epma-platform/DateTime';
import { CListItem } from '../models/model';
import { InjectorInstance } from 'src/app/app.module';
import { ObservableCollection } from '../models/observable-collection';
import { AccessKeyService } from './AccessKey.service';
import { Image } from './epma-image/epma-image.component';
import { FrameworkElement, HorizontalAlignment, Thickness, VerticalAlignment } from './FrameworkElement';
import { GridViewCell } from './epma-grid-helpers/grid-extension';
import { DependencyObject } from '../models/eppma-common-types';
import { Convert } from '../services/convert.service';
import { RadioModel } from './epma-radiobutton/epma-radiobutton.component';
import { List } from '../models/list';
import { Visibility } from '../controls-model/Visibility';

export interface SetBindingObject {

  ObjectType;
  Property;
  Object: any;
  Source?: any;
  GetValue(o): any;
  SetValue(o, v: any): void;
}

export enum BindingMode {
  OneWay = 'OneWay',
  TwoWay = 'TwoWay',
}
export class Binding {
  constructor();
  constructor(contextObject?: any, path?: string);
  constructor(contextObject?: any, path?: string) {

    if (path) {
      this.Path = path;
    }
    if (contextObject) {
      this.PathObject = contextObject;
    }
  }
  Source = {};
  Path = '';
  PathObject = {};
  Converter: PipeTransform;
  ElementName: '';
  Mode: BindingMode;
}

@Component({
  template: '',
})
export class Control extends FrameworkElement {
  constructor() {
    super();
    this._IsHitTestVisible = true;

  }
  public _IsHitTestVisible : boolean;

  public id: any;
  _accessKey: string;
  get AccessKey() {
    return this._accessKey;
  }
  Dispatcher: any;
  // @Input() AccessKey: string;
  @Input() set AccessKey(value: string) {
    this._accessKey = value;
    this.setAccess();
    //  this.id = this.accessKeyService.register(this);
  }
  setAccess() {
    let accessKeyService: AccessKeyService = InjectorInstance.get<AccessKeyService>(AccessKeyService);
    this.id = accessKeyService.register(this._accessKey, this);
    //  accessKeyService.unregister(this.id);
  }
  setFocus() {
  }
  public layoutChange = new EventEmitter();

  public set col(val: number) {
    let e = { type: 'col', control: this, col: val }
    this.layoutChange.emit(e);
  }

  public set row(val: number) {
    let e = { type: 'row', control: this, row: val }
    this.layoutChange.emit(e);
  }

  // Revisit, added Tooltip
  @Output() TooltipChange = new EventEmitter();
  _Tooltip: string | iLabel | any;

  get Tooltip() {
    if(this.isGlobalEnabled != false){
      if (this._Tooltip && this._Tooltip != '')
        return this._Tooltip;
      else
        return '';
    }else
    return '';
  };
  @Input() set Tooltip(value: string | iLabel | TextBlock | any) {
    this._Tooltip = value;
  };

  public get hasTooltipString() {
    return typeof this.Tooltip == 'string' ? true : false;
  }

  get ToolTip() {
    if(this.isGlobalEnabled != false){
    if (this._Tooltip && this._Tooltip != '')
      return this._Tooltip;
    else
      return '';
    }
    else
    return '';
  };
  @Input() set ToolTip(value: string | iLabel | TextBlock | any) {
    this._Tooltip = value;
  };


  @Input() MouseLeftButtonUp: Function | string;
 // @Input() override MouseLeftButtonDown: Function | string;
  @Output() MouseLeftButtonUp_Func = new EventEmitter();
  @Output() MouseLeftButtonDown_Func = new EventEmitter();

  

  public get IsHitTestVisible() : boolean {
    return this._IsHitTestVisible;
  }
  @Input() set IsHitTestVisible(v : boolean) {
    this._IsHitTestVisible = v;
  }


  MouseLeftButtonUpEvent(e) {    
    if (this.CanEventTrigger()) {
      if (this.MouseLeftButtonUp instanceof Function) {
        if (e.button == 0) this.MouseLeftButtonUp(this, e);
      }
      this.MouseLeftButtonUp_Func.emit(e);
    }
  }
  MouseLeftButtonDownEvent(e) {
    if (this.CanEventTrigger()) {
      let mouseButtonEventArgs : MouseButtonEventArgs = new MouseButtonEventArgs();
      mouseButtonEventArgs.OriginalSource = this;
      mouseButtonEventArgs.mouseEvent = e;
      this.MouseLeftButtonDown_Func.emit(mouseButtonEventArgs);
      if (this.MouseLeftButtonDown instanceof Function) {
        if (e.button == 0) this.MouseLeftButtonDown(this, mouseButtonEventArgs);
      }
    }
  }

  CanEventTrigger(){
    let eventeTrigger = true;
    if(this.isGlobalEnabled!=undefined){
      if(this.isGlobalEnabled ==false){
        eventeTrigger = false;
      }
    }
    if (this.controlType == "Image" && !this._IsHitTestVisible ) 
    eventeTrigger = false;
    return eventeTrigger;
  }

  @Output() TextChange = new EventEmitter();
  _text: string = '';

  get TextFirst() {
    if (this.AccessKey && this._text)
      return this._text.split(this.AccessKey)[0];
    else
      return this._text;
  }
  get TextMiddle() {
    if (this.AccessKey && this._text) {
      let sValue = this._text.split(this.AccessKey);
      if (sValue.length > 1)
        return this.AccessKey;
      else
        return '';
    } else {
      return '';
    }
  }
  get TextLast() {
    if (this.AccessKey && this._text) {
      let ind = this._text.indexOf(this.AccessKey);
      if (ind > -1)
        return this._text.substring(ind + 1)
      else
        return '';
    } else {
      return '';
    }

  }
  get Text() {
    return this._text;
  }
  @Input() IsDynamicControlText:boolean=false;
  @Input() set Text(value: string) {
    if(this.IsDynamicControlText == true){
      if(value != null && value != undefined)
      this._text = value;
    }
    else{
      this._text = value;
    }
    // const textObject = this.BindingObjects.find(ele => ele.ObjectType == "Text");
    // if (textObject) {
    //   this.setBindingPath(textObject.Object, textObject.Property, this._text);
    // }

    // if (this.TextObject.Property) {
    //   this.setBindingPath(this.TextObject.Object, this.TextObject.Property, this._text);
    // }
  }

  @Output() ItemsSourceChange = new EventEmitter();
  // stub - #36427
  public _ItemsSource: List<CListItem> | ObservableCollection<CListItem> = new ObservableCollection<CListItem>();
  public get ItemsSource() {
    return this._ItemsSource;
  }
  @Input() set ItemsSource(value: List<CListItem> | ObservableCollection<CListItem>) {
    this._ItemsSource = value;
    this.ItemsSourceSetExtension(value);
  }

  /**
   * ItemsSourceSetExtension
   */
  public ItemsSourceSetExtension(value: List<CListItem> | ObservableCollection<CListItem>) {
  }


  IsEnabledObject = {
    Property: '',
    Object: undefined,
    SetValue: (v) => {
      this.IsEnabled = v;
    },
    GetValue: () => {
      return this.IsEnabled;
    },
  };

  ForegroundObject = {
    Property: '',
    Object: undefined,
    SetValue: (v) => {
      this.Foreground = v;
    },
    GetValue: () => {
      return this.Foreground;
    }
  }

  @Output() MandatoryChange = new EventEmitter();
  _mandatory: boolean | string;
  get Mandatory() {
    return this._mandatory;
  }
  @Input() set Mandatory(v: boolean | string) {
    let value: boolean | string;
    if (typeof v == 'string') {
      if (v == 'True' || v == 'true') {
        value = true;
      } else if (v == 'False' || v == 'false') {
        value = false;
      }
    } else {
      value = v;
    }
    this._mandatory = value;
    if (this.Mandatory == true && this.isGlobalEnabled != false) {
      if(this.IsEnabled == false && this.controlType === 'Label'){
        this.style['font-weight'] = 'bold';
      }else{
        this.style['color'] = '#006aeb';
        this.style['font-weight'] = 'bold';
      }
    } else {
      this.style['color'] = 'black';
      this.style['font-weight'] = 'normal';
    }
  }

  model: RadioModel;
  __Value
  @Output() IsCheckedChange = new EventEmitter();
  _IsChecked: boolean | string;
  @Input() set IsChecked(value: any) {
    if (this.controlType === 'CheckBox') {
      if (typeof value == 'string') {
        if (value.toLowerCase() == 'false')
          this._IsChecked = false;
        else
          this._IsChecked = true;
      } else if (typeof value == 'boolean') {
        this._IsChecked = value;
      }
    } else if (this.controlType === 'RadioButton') {
      if (typeof value == 'string') {
        if (value.toLowerCase() == 'false') {
          this._IsChecked = false;
          // this.model.IsChecked = { value: this.__Value };
        } else {
          this._IsChecked = true;
          // this.model.IsChecked = { value: this.__Value };
        }
      } else if (typeof value == 'boolean') {
        this._IsChecked = value;
        if (value && this.model) {
          this.model.IsChecked = { value: this._text };
          // this.isCheckedRadioButtonExtention();
        }
        else {
          this.clearValues();
        }
      } else if (value instanceof Object) {
        this._IsChecked = value.IsChecked;
      }
    }

    const IsCheckedObject = this.BindingObjects.find(ele => ele.ObjectType == "IsChecked");
    if (IsCheckedObject) {
      this.setBindingPath(IsCheckedObject.Object, IsCheckedObject.Property, this._IsChecked);
    }
  }
  get IsChecked() {
    return this._IsChecked;
  }
  clearValues(){


}
  public isCheckedRadioButtonExtention() {

  }


  // IsEnabled...
  @Output() IsEnabledChange = new EventEmitter();
  _isEnabled: boolean | string;
  get IsEnabled() {
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

  private _isGlobalEnabled:string | boolean = undefined;

  get isGlobalEnabled() {
    return this._isGlobalEnabled;
  }
  @Input() set isGlobalEnabled(v){
    this._isGlobalEnabled = v;
    if(v != undefined && !v){
      if(this.controlType == 'Label'){
        this.style['color'] = 'black';
        this.style['font-weight'] = 'normal';
        this.style['opacity'] = '0.6'; 
        this.style['cursor'] = "context-menu"; 
      }
    }
  }
  @Input() IsEnabledChanged: Function | string;
  @Input() set IsEnabled(v: boolean | string) {
    this._isEnabled = v;
    if (this.IsEnabledObject.Property) {
      // this.TextObject.Object[props[0]][props[1]][props[2]][props[3]] = this._text;
      this.setBindingPath(
        this.IsEnabledObject.Object,
        this.IsEnabledObject.Property,
        this._isEnabled
      );
    }
    if (this.controlType == "RadioButton") {
      if (this._isEnabled == true || this._isEnabled == 'true' || this._isEnabled == "True")
        this.style['opacity'] = '1';
      else
      this.style['opacity'] = '0.5';
    }
    if (this.controlType == "CheckBox") {
      if (this._isEnabled == false || this._isEnabled == 'false' || this._isEnabled == "False")
        this.style['opacity'] = '0.6';
      else
      this.style['opacity'] = '';
    }
    if(this.controlType == "iComboBox"){
      if (this.IsEnabledChanged instanceof Function) 
        this.IsEnabledChanged(this, v);      
    }
    // if (!this._isEnabled) {
    //   this.style['opacity'] = '0.5';
    // }
    // let value: boolean;
    // if (typeof v === "string") {
    //     if (v === "True") {
    //         value = true;
    //     } else {
    //         value = false;
    //     }
    // } else if (typeof v === 'undefined') {
    //     value = true;
    // } else {
    //     value = v;
    // }
  }

  _VerticalContentAlignment: string;
  get VerticalContentAlignment() {
    return this._VerticalContentAlignment;
  }
  @Input() set VerticalContentAlignment(style: string | number) {
    if ((typeof style == 'string' && style == "Center") || (typeof style == 'number' && style == 1)) {
      this._VerticalContentAlignment = 'center';
    }
    this.setVerticalContentAlignment();
  }

  setVerticalContentAlignment() {
    this.style['display'] = 'flex';
    this.style['justifiy-content'] = this._VerticalContentAlignment;
  }

  // TabIndex...
  NumTabIndex: number;
  _tabIndex: number | string;
  get TabIndex() {
    return this._tabIndex;
  }
  @Input() set TabIndex(value: number | string) {
    this._tabIndex = value;
    if (typeof value == 'string')
      this.NumTabIndex = Convert.ToInt16(value);
    else
      this.NumTabIndex = value;
    this.setTabIndex();
  }

  setTabIndex() {
    if (!this._isTabStop) {
      this._tabIndex = -1;
    } else {
      this.style['tabindex'] = this._tabIndex;
    }
  }
  _isTabStop: string | boolean;
  get IsTabStop() {
    return this._isTabStop;
  }
  @Input() set IsTabStop(v: string | boolean) {
    let value: boolean;
    if (typeof v == "string") {
      if (v == "True") {
        value = true;
      } else if (v == "False") {
        value = false;
      }
    } else {
      value = v;
    }
    this._isTabStop = value;
    this.setTabIndex();
  }

  _FontStyle = '0,0,0,0';
  get FontStyle() {
    return this._FontStyle;
  }
  @Input() set FontStyle(value: string) {
    this._FontStyle = value;
    this.setFontStyle();
  }

  setFontStyle() {
    this.style['font-style'] = this._FontStyle;
  }

  _Padding = '0,0,0,0';
  get Padding() {
    return this._Padding;
  }
  @Input() set Padding(value: string) {
    this._Padding = value;
    this.setPadding();
  }

  _minHeight = '';
  get MinHeight() {
    return this._minHeight;
  }
  @Input() set MinHeight(value: string) {
    this._minHeight = value;
    this.setMinHeight();
  }
  _maxHeight = '';
  get MaxHeight() {
    return this._maxHeight;
  }
  @Input() set MaxHeight(value: string) {
    this._maxHeight = value;
    this.setMaxHeight();
  }

  _FontFamily = '';
  get FontFamily() {
    return this._FontFamily;
  }
  @Input() set FontFamily(value: string | FontFamily) {
    if (value instanceof FontFamily) this._FontFamily = value.fontFamily;
    else this._FontFamily = value;
    this.setFontFamily();
  }
  _FontWeight: string;
  get FontWeight() {
    return this._FontWeight;
  }
  @Input() set FontWeight(value: FontWeight | string) {
    if (value) {
      if (typeof value === 'string') {
        this._FontWeight = FontweightConversion.getFontWeightString(value);
      }
      else {
        this._FontWeight = value.ToString().toLocaleLowerCase();
      }
      this.setFontWeight();
    }
  }
  _FontSize = '';
  get FontSize() {
    return this._FontSize;
  }
  @Input() set FontSize(value: string | number) {
    this._FontSize = typeof value == 'string' ? value : value.toString();
    this.setFontSize();
  }
  _BorderThickness: any;
  get BorderThickness() {
    return this._BorderThickness;
  }
  @Input() set BorderThickness(value: string | Thickness) {
    this._BorderThickness = value;
    this.setBorderThickness();
  }
  _CornerRadius = '';
  get CornerRadius() {
    return this._CornerRadius;
  }
  @Input() set CornerRadius(value: string) {
    this._CornerRadius = value;
    this.setCornerRadius();
  }
  _TextDecorations = '';
  get TextDecorations() {
    return this._TextDecorations;
  }
  @Input() set TextDecorations(value: string) {
    this._TextDecorations = value;
    this.setTextDecorations();
  }
  _Background: any;
  get Background() {
    return this._Background;
  }
  @Input() set Background(value: any) {
    if (value instanceof SolidColorBrush) this._Background = value.brush;
    else this._Background = value;
    this.setBackground();
  }
  _Foreground: any;
  get Foreground() {
    return this._Foreground;
  }
  @Input() set Foreground(value: any) {
    if (value instanceof SolidColorBrush) this._Foreground = value.brush;
    else this._Foreground = value;
    this.setForeground();
    if (this.ForegroundObject.Property) {
      this.setBindingPath(this.ForegroundObject.Object, this.ForegroundObject.Property, this._Foreground);
    }
  }

  _FontStretch: any;
  get FontStretch() {
    return this._FontStretch;
  }
  @Input() set FontStretch(value: any) {
    this._FontStretch = value;
    this.setFontStretch();
  }

  _IsWordwrap: any;
  get IsWordwrap() {
    return this._IsWordwrap;
  }
  @Input() set IsWordwrap(value: any) {
    this._IsWordwrap = value;
    this.setIsWordwrap();
  }
  _IsWordwrapbreak: any;
  get IsWordwrapbreak() {
    return this._IsWordwrapbreak;
  }
  @Input() set IsWordwrapbreak(value: any) {
    this._IsWordwrapbreak = value;
    this.setIsWordwrap();
  }
  Focus() { }
  setPadding() {
    let myArray = this._Padding.split(',');
    let array: any[] = [];
    myArray.forEach((x) => {
      array.push(x + 'px');
    });

    if (array.length == 1) {
      this.style['padding-top'] = array[0];
      this.style['padding-right'] = array[0];
      this.style['padding-bottom'] = array[0];
      this.style['padding-left'] = array[0];
    } else {
      this.style['padding-top'] = array[0];
      this.style['padding-right'] = array[1];
      this.style['padding-bottom'] = array[2];
      this.style['padding-left'] = array[3];
    }
  }

  setMinHeight() {
    if (this._minHeight == 'Auto') {
      this.style['min-height'] = 'auto';
    } else {
      let minHeight = this._minHeight + 'px';
      this.style['min-height'] = minHeight;
    }
  }

  setMaxHeight() {
    if (this._maxHeight == 'Auto') {
      this.style['max-height'] = 'auto';
    } else {
      let maxHeight = this._maxHeight + 'px';
      this.style['max-height'] = maxHeight;
    }
  }
  setFontFamily() {
    if (this._FontFamily)
      this.style['font-family'] = this._FontFamily.toLowerCase();
  }
  setFontWeight() {
    if (this._FontWeight)
      //this.style['font-weight'] = (this._FontWeight).toLowerCase();
      this.style['font-weight'] = this._FontWeight;
  }
  setFontSize() {
    let fontSize = this._FontSize + 'px';
    this.style['font-size'] = fontSize;
  }
  setBorderThickness() {
    if (this._BorderThickness instanceof Thickness) {
      let myArray = this._BorderThickness.margin.split(',');
      let array: any[] = [];
      myArray.forEach((x) => {
        array.push(x + 'px');
      });
      this.style['border-width'] = array[0] + ' ' + array[1] + ' ' + array[2] + ' ' + array[3];
    } else {

      this.style['border-width'] = this._BorderThickness + 'px';
    }
    // this.style['border-width'] = borderThickness;
  }
  setCornerRadius() {
    let cornerRadius = this._CornerRadius + 'px';
    this.style['border-radius'] = cornerRadius;
  }

  setTextDecorations() {
    if (this._TextDecorations) {
      if (typeof this._TextDecorations == 'string') {
        this.style['text-decoration'] = this._TextDecorations.toLowerCase();
      }
    }
  }
  setBackground() {
    if (this._Background) {
      if (typeof this._Background == 'string') {
        this.style['background'] = this._Background.toLowerCase();
      } else if (this._Background instanceof Color) {
        this.style['background'] = this._Background.color;
      }
      else if (this._Background instanceof SolidColorBrush) {
        this.style['background'] = this._Background.color.color;
      }

    }
    // this.style['background'] = this._Background;
  }
  setForeground() {
    if (this._Foreground) {
      if (typeof this._Foreground == 'string') {
        this.style['color'] = this._Foreground.toLowerCase();
      } else if (this._Foreground instanceof Color) {
        this.style['color'] = this._Foreground.color;
      }
    }
    // if (this._Foreground) {
    //   if (typeof this._Foreground == 'string') {
    //     this.style['color'] = this._Foreground.toLowerCase() + ' !important';
    //   } else if (this._Foreground instanceof Color) {
    //     this.style['color'] = this._Foreground.color + ' !important';
    //   }
    // }
  }

  setFontStretch() {
    this.style['font-stretch'] = this._FontStretch.toLowerCase();
  }
  setIsWordwrap() {
    if (this._IsWordwrapbreak) {
      this.style['word-break'] = "break-word";
      this.style['display'] = "block";
    } 
   else if ((this._IsWordwrap == 'True' || this._IsWordwrap == true)) {
      this.style['word-break'] = "break-word";
      this.style['display'] = "inline-block";
    } else {
      this.style['display'] = "inline";
    }
    
    if(this.Visibility != undefined && this.Visibility != null && this.Visibility == Visibility.Collapsed)
    {
      this.style['display'] = "none";
    }
  }
  _horizontalAlignment: any;
  get HorizontalAlignment() {

    return this._horizontalAlignment
  }
  @Input() set HorizontalAlignment(value: any) {

    if (value == HorizontalAlignment.Center) {
      this._verticalAlignment = "Center";
    } else if (value == HorizontalAlignment.Left) {
      this._verticalAlignment = "Left";
    } else if (value == HorizontalAlignment.Stretch) {
      this._verticalAlignment = "Stretch";
    } else if (value == HorizontalAlignment.Right) {
      this._verticalAlignment = "Right";
    } else
      this._verticalAlignment = value;


    this._horizontalAlignment = value;
    this.setHorizontalAlignment();

  }
  public controlclass = {
    'horizontal-class-left': false, 'horizontal-class-right': false, 'horizontal-class-center': false, 'horizontal-class-stretch': false,
    'vertical-class-top': false, 'vertical-class-bottom': false, 'vertical-class-center': false, 'vertical-class-stretch': false,
    'orientation-class-horizontal': false, 'orientation-class-vertical': false
  }
  _inlineBlock:boolean = false;
  get InlineBlock() {
    return this._inlineBlock
  }
  @Input() set InlineBlock(value: any){
    if (value) {
      this.style['display'] = "inline-block";
    }
  }
  _verticalAlignment: any;
  get VerticalAlignment() {

    return this._verticalAlignment
  }
  @Input() set VerticalAlignment(value: any) {
    if (value == VerticalAlignment.Center) {
      this._verticalAlignment = "Center";
    } else if (value == VerticalAlignment.Bottom) {
      this._verticalAlignment = "Bottom";
    } else if (value == VerticalAlignment.Stretch) {
      this._verticalAlignment = "Stretch";
    } else if (value == VerticalAlignment.Top) {
      this._verticalAlignment = "Top";
    } else
      this._verticalAlignment = value;
    this.setVerticalAlignment();
  }

  setHorizontalAlignment() {
    if (this._horizontalAlignment && typeof this._horizontalAlignment == 'string') {
      if (this.controlType == "Label")
        this.controlclass['horizontal-class-' + this._horizontalAlignment.toLowerCase() + '-' + this.controlType.toLowerCase()] = true;
      else
        this.controlclass['horizontal-class-' + this._horizontalAlignment.toLowerCase()] = true;
    }
  }
  setVerticalAlignment() {
    if (this.controlType == "Label")
      this.controlclass['vertical-class-' + this._verticalAlignment.toLowerCase() + '-' + this.controlType.toLowerCase()] = true;
    else
      this.controlclass['vertical-class-' + this._verticalAlignment.toLowerCase()] = true;
  }

  _VerticalScrollBarVisibility: ScrollBarVisibility | string;
  get VerticalScrollBarVisibility() {
    return this._VerticalScrollBarVisibility;
  }
  @Input() set VerticalScrollBarVisibility(
    value: ScrollBarVisibility | string
  ) {
    this._VerticalScrollBarVisibility = value;
    let txtTemp = this.verticalScrollBarVisibilityConversion();
    this.style['overflow-y'] = txtTemp;
  }

  verticalScrollBarVisibilityConversion(): string {
    if (typeof this._VerticalScrollBarVisibility == 'string' && this.controlType != "TextBox") {
      if (this._VerticalScrollBarVisibility == 'Auto') {
        return 'auto';
      } else if (this._VerticalScrollBarVisibility == 'Visible') {
        return 'scroll';
      } else if (this._VerticalScrollBarVisibility == 'Hidden') {
        return 'hidden';
      } else if (this._VerticalScrollBarVisibility == 'Disabled') {
        return 'hidden';
      } else {
        return '';
      }
    } else {
      if (this._VerticalScrollBarVisibility == 1) {
        return 'auto';
      } else if (this._VerticalScrollBarVisibility == 3) {
        return 'scroll';
      } else if (this._VerticalScrollBarVisibility == 2) {
        return 'hidden';
      } else if (this._VerticalScrollBarVisibility == 0) {
        return 'hidden';
      } else {
        return '';
      }
    }
  }

  _HorizontalScrollBarVisibility: any = '';
  get HorizontalScrollBarVisibility() {
    return this._HorizontalScrollBarVisibility;
  }
  @Input() set HorizontalScrollBarVisibility(value: string | ScrollBarVisibility) {
    this._HorizontalScrollBarVisibility = value;
    let txtTemp = this.horizontalScrollBarVisibilityConversion(value);
    this.style['overflow-x'] = txtTemp;
  }

  private horizontalScrollBarVisibilityConversion(svalue: string | ScrollBarVisibility): string {
    if (typeof svalue == 'string') {
      if (svalue == 'Auto') {
        return 'auto';
      } else if (svalue == 'Visible') {
        return 'scroll';
      } else if (svalue == 'Hidden') {
        return 'hidden';
      } else if (svalue == 'Disabled') {
        return 'hidden';
      } else {
        return '';
      }
    } else {
      if (svalue == 1) {
        return 'auto';
      } else if (svalue == 3) {
        return 'scroll';
      } else if (svalue == 2) {
        return 'hidden';
      } else if (svalue == 0) {
        return 'hidden';
      } else {
        return '';
      }
    }
  }
  textWrapping: any;
  get TextWrapping() {
    return this.textWrapping;
  }
  @Input() set TextWrapping(value: string | number) {
    this.textWrapping = value;
    this.wordBrk(this.textWrapping);
  }
  wordBrk(v) {
    if (v == 'Wrap' || v == 2) {
      this.style['word-break'] = `break-word`;
    } else {
      this.style['word-break'] = `unset`;
    }
  }
}

export class SolidColorBrush {
  public color: Color;
  public get brush() {
    return this.color.color;
  }
  constructor(value?: Color) {
    if (value) {
      this.color = value;
    }
    else {
      this.color = Colors.Transparent;
    }
  }
}

export class Colors {
  static get Transparent() {
    let color: Color = Color.FromArgb(0.1, 255, 255, 255);
    return color;
  }
  // static get Blue = "blue"
  static get Black() {
    let color: Color = Color.FromArgb(1, 0, 0, 0);
    return color;
  }
  static get Red() {
    let color: Color = Color.FromArgb(1, 255, 0, 0);
    return color;
  }
  static get Blue() {
    let color: Color = Color.FromArgb(1, 0, 0, 255);
    return color;
  }
  static get Grey() {
    // let color: Color = Color.FromArgb(0.5, 50, 50, 50);
    // return color;
    let color: Color = Color.FromArgb(1, 128, 128, 128);
    return color;
  }
  static get Yellow() {
    let color: Color = Color.FromArgb(1, 255, 255, 0);
    return color;
  }
  static get Brown() {
    let color: Color = Color.FromArgb(1, 165, 42, 42);
    return color;
  }
  static get Cyan() {
    let color: Color = Color.FromArgb(1, 0, 255, 255);
    return color;
  }
  static get DarkGray() {
    let color: Color = Color.FromArgb(1, 66, 66, 66);
    return color;
  }
  static get Green() {
   // let color: Color = Color.FromArgb(1, 0, 255, 0);
  
   let color: Color = Color.FromArgb(1, 2, 75, 4);
    return color;
  }
  static get LightGray() {
    let color: Color = Color.FromArgb(1, 217, 217, 214);
    return color;
  }
  static get Magenta() {
    let color: Color = Color.FromArgb(1, 255, 0, 255);
    return color;
  }
  static get Orange() {
    let color: Color = Color.FromArgb(1, 255, 127, 0);
    return color;
  }
  static get Purple() {
    let color: Color = Color.FromArgb(1, 160, 32, 240);
    return color;
  }
  static get White() {
    let color: Color = Color.FromArgb(1, 255, 255, 255);
    return color;
  }
}
export class Color {
  public A: number;
  // Returns:
  //     The sRGB blue channel value, as a value between 0 and 255.
  public B: number;
  // Returns:
  //     The sRGB green channel value, as a value between 0 and 255.
  public G: number;
  // Returns:
  //     The sRGB red channel value, as a value between 0 and 255.
  public R: number;
  public value: string;
  public get color() {
    //hexadecimal color value returned
    function ConvertToHexaDecimalString(param: number): string {
      return Number(param).toString(16).padStart(2, '0').toUpperCase();
    }
    let alpha = typeof this.A == 'number' ? this.A : Number(this.A);
    alpha = isNaN(alpha) ? 1 : alpha;
    let _opacity = Math.round(Math.min(Math.max(alpha, 0), 1) * 255);
    let alphahexadecimal = _opacity.toString(16).toUpperCase();
    return (
      '#' +
      ConvertToHexaDecimalString(this.R) +
      ConvertToHexaDecimalString(this.G) +
      ConvertToHexaDecimalString(this.B) +
      alphahexadecimal
    );
  }
  constructor(value?) {
    this.value = value;
  }

  public static FromArgb(a: number, r: number, g: number, b: number): Color {

    let color: Color = new Color();
    color.A = a;
    color.B = b;
    color.G = g;
    color.R = r;
    return color;
  }
}

export enum TextDecorations {
  Underline = 'Underline',
  None = 'None',
}
export enum TextAlignment {
  Left = 'Left',
  Right = 'Right',
  Center = 'Center' //STUB Code for bug#36028
}
export enum Cursors {
  Hand = 'Hand',
  Arrow = 'Arrow',
}
export enum Stretch {
  None = 'None',
}

export enum FontStyles {
  Normal = 'Normal',
  Italic = 'Italic',
}
export enum TextWrapping {
  Wrap = 'Wrap',
  NoWrap = 'NoWrap',
}

export class FontFamily {
  public fontFamily = '';
  constructor(value: any) {
    if (value) {
      this.fontFamily = value;
    }
  }
}


export class BitmapImage {
  BitmapImage: BitmapImage | string;
  constructor(arg1: Uri) {
    this.BitmapImage = arg1.Uripath;
  }
}

export class Uri {
  Uripath: string;
  UriKind: UriKind;
  static IsHexDigit(value: any): boolean {
    return false;
  }
  constructor(arg1: string, arg2: UriKind) {
    this.Uripath = arg1;
    this.UriKind = arg2;
  }
  LocalPath: string;
}

export enum UriKind {
  RelativeOrAbsolute = 0,
  Absolute = 1,
  Relative = 2,
}
export class ToolTipService {
  public static SetToolTip(info: Control, val: string | iLabel | object) { /**TEMPORARY FIX - NEED TO DEVELOP/IMPLEMENT BY PLATFORM TEAM (object has been as type) */
    info.Tooltip = val;
  }
  public static ToolTipProperty = 'ToolTip';
}

export class Inline extends Control{
  constructor() { super(); }
}
// export class Run extends Inline {
//   constructor() { super(); }
// }
export class LineBreak extends Inline {
  constructor() { super(); }
}
export type ImageSource = BitmapImage;
export class MouseEventArgs { }

export class MouseButtonEventArgs extends MouseEventArgs {
  public ClickCount: number;
  public Handled: boolean;
  public OriginalSource: any;
  public mouseEvent: any;
}

export class KeyEventArgs {
  public Handled: boolean;
  public Key: Key;
  public PlatformKeyCode: number;
}
export interface RoutedEventArgs {
  OriginalSource: object;
}

export interface TextChangedEventArgs extends RoutedEventArgs {

}

export interface RoutedPropertyChangedEventArgs<T> extends RoutedEventArgs {
  NewValue: any;
  OldValue: any;
}

export interface DateChangedArgs extends EventArgs {
  ModifiedDate: DateTime;
  oldValue:DateTime;
}

export interface GridViewCellClickEventArgs extends EventArgs {
  ColumnIndex: number;
  RowIndex: number;
  ColumnCell: GridViewCell;
  MouseEvents?: any;
}

export class DependencyPropertyChangedEventArgs {
  NewValue: Object;
  OldValue: Object;
  Property: DependencyObject;
}



export enum Key {
  None = 0,
  Back = 1,
  Tab = 2,
  Enter = 3,
  Shift = 4,
  Ctrl = 5,
  Alt = 6,
  CapsLock = 7,
  Escape = 8,
  Space = 9,
  PageUp = 10,
  PageDown = 11,
  End = 12,
  Home = 13,
  Left = 14,
  Up = 15,
  Right = 16,
  Down = 17,
  Insert = 18,
  Delete = 19,
  D0 = 20,
  D1 = 21,
  D2 = 22,
  D3 = 23,
  D4 = 24,
  D5 = 25,
  D6 = 26,
  D7 = 27,
  D8 = 28,
  D9 = 29,
  A = 30,
  B = 31,
  C = 32,
  D = 33,
  E = 34,
  F = 35,
  G = 36,
  H = 37,
  I = 38,
  J = 39,
  K = 40,
  L = 41,
  M = 42,
  N = 43,
  O = 44,
  P = 45,
  Q = 46,
  R = 47,
  S = 48,
  T = 49,
  U = 50,
  V = 51,
  W = 52,
  X = 53,
  Y = 54,
  Z = 55,
  F1 = 56,
  F2 = 57,
  F3 = 58,
  F4 = 59,
  F5 = 60,
  F6 = 61,
  F7 = 62,
  F8 = 63,
  F9 = 64,
  F10 = 65,
  F11 = 66,
  F12 = 67,
  NumPad0 = 68,
  NumPad1 = 69,
  NumPad2 = 70,
  NumPad3 = 71,
  NumPad4 = 72,
  NumPad5 = 73,
  NumPad6 = 74,
  NumPad7 = 75,
  NumPad8 = 76,
  NumPad9 = 77,
  Multiply = 78,
  Add = 79,
  Subtract = 80,
  Decimal = 81,
  Divide = 82,
  Unknown = 255,
}
export class EventArgs {
  public static Empty: EventArgs;
}

export class FontWeights {
  static get Black() {
    let fontweight: FontWeight = new FontWeight('900');
    return fontweight;
  }

  static get Bold() {
    let fontweight: FontWeight = new FontWeight('700');
    return fontweight;
  }

  static get ExtraBlack() {
    let fontweight: FontWeight = new FontWeight('950');
    return fontweight;
  }

  static get ExtraBold() {
    let fontweight: FontWeight = new FontWeight('800');
    return fontweight;
  }

  static get ExtraLight() {
    let fontweight: FontWeight = new FontWeight('200');
    return fontweight;
  }

  static get Light() {
    let fontweight: FontWeight = new FontWeight('300');
    return fontweight;
  }
  static get Medium() {
    let fontweight: FontWeight = new FontWeight('500');
    return fontweight;
  }
  static get Normal() {
    let fontweight: FontWeight = new FontWeight('400');
    return fontweight;
  }
  static get SemiBold() {
    let fontweight: FontWeight = new FontWeight('600');
    return fontweight;
  }
  static get Thin() {
    let fontweight: FontWeight = new FontWeight('100');
    return fontweight;
  }
}

export class FontWeight {
  value: string;
  constructor(value?) {
    this.value = value;
  }

  ToString(): string {
    return this.value;
  }
}

export class FontweightConversion {
  static getFontWeightString(value: string): string {
    let _value;
    switch (true) {
      case (value == 'Black'):
        _value = '900';
        break;
      case (value == 'Bold'):
        _value = "700";
        break;
      case (value == 'ExtraBlack'):
        _value = "950";
        break;
      case (value == 'ExtraBold'):
        _value = "800";
        break;
      case (value == 'ExtraLight'):
        _value = "200";
        break;
      case (value == 'Light'):
        _value = "300";
        break;
      case (value == 'Medium'):
        _value = "500";
        break;
      case (value == 'Normal'):
        _value = "400";
        break;
      case (value == 'SemiBold'):
        _value = "600";
        break;
      case (value == 'Thin'):
        _value = "100";
        break;
      default:
        _value = value
    }
    return _value;
  }
}
export enum ScrollBarVisibility {
  Disabled = 0,
  Auto = 1,
  Hidden = 2,
  Visible = 3,
}
export class TextChangedEventArgs {
  constructor() {

  }
}
export class OnSelectEventArgs {
  Text: string;
  Value: string;
}
export class OnUnSelectEventArgs {
  Text: string;
  Value: string;
}
export enum SelectAllTextEvents
{
    None = 0,
    GotFocus = 1,
    DropDownOpen = 2,
    SelectionChanged = 4,
    All = 7
}
export enum SelectionMode {
  Single = 'Single',
  Multiple = 'Multiple',
  Extended = 'Extended',
}
