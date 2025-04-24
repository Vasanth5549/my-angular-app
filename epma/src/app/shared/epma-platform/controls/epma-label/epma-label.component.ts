import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  Binding,
  HorizontalAlignment,
  VerticalAlignment,
} from '../FrameworkElement';
import { TextBlock } from '../epma-textblock/epma-textblock.component';
import { Control } from '../Control';
import { SLCultureInfo } from '../../services/sLDateUtility.service';
import DateTime from 'epma-platform/DateTime';
import { CultureInfo } from '../../models/eppma-common-types';
import { formatDate } from '@angular/common';
import { TimeZoneInfo } from '../../models/time-zone-info';

@Component({
  selector: 'iLabel',
  templateUrl: './epma-label.component.html',
  styleUrls: ['./epma-label.component.css'],
})
export class iLabel extends Control implements OnInit, AfterViewInit {
  _basicTooltip: string | boolean = false;
  get basicTooltip() {
    return this._basicTooltip;
  }
  @Input() set basicTooltip(v: string | boolean) {
    let value: boolean;
    if (typeof v == 'string') {
      if (v == 'True') {
        value = true;
      } else{
        value = false;
      }
    }
    this._basicTooltip = value;
  }
  _kendoTooltipEnable: string | boolean = false;
  get kendoTooltipEnable() {
    return this._kendoTooltipEnable;
  }
  @Input() set kendoTooltipEnable(v: string | boolean) {
    let value: boolean;
    if (typeof v == 'string') {
      if (v == 'True') {
        value = true;
      } else{
        value = false;
      }
    }
    this._kendoTooltipEnable = value;
  }
  //private accessKeyService: AccessKeyService;
  public static IsEnabledProperty = 'IsEnabled';
  public static MandatoryProperty = 'Mandatory';
  public static VisibilityProperty = 'Visibility';
  public static TextProperty = 'Text';
  public AllowDrop:boolean = false;
  public static ToolTipProperty = 'Tooltip';
  @Input() containerParent: any;
  @Input() index: number;
  @Input() isAfterViewInitRequired : boolean = true;

  @Input() GotFocus: Function | string;
  // @Input() IsFocusable: boolean | string;
  // @Input() IsTabStop: boolean | string;
  @Input() HorizontalContentAlignment: HorizontalAlignment | string;
  @Input() RenderTransformOrigin: number | string;
  // @Input() DateTimeValue: string;
  // @Input() DateTimePattern: string;
  @Input() iLabelInLineElements: iLabelInLineElement[] = [];
  public InLines = {
    Add: (value: iLabelInLineElement) => {
      this.iLabelInLineElements.push(value);
    },
    Count: this.iLabelInLineElements.length,
  };

  // _text: String;
  // get Text() {
  //   return this._text;
  // }
  // @Input() set Text(value: any) {
  //   this._text = value;
  // }

  // _mandatory: boolean | string;
  // get Mandatory() {
  //   return this._mandatory;
  // }
  // @Input() set Mandatory(v: boolean | string) {
  //   let value: boolean | string;
  //   if (typeof v == "string") {
  //     if (v == "True") {
  //       value = true;
  //     } else if (v == "False") {
  //       value = false;
  //     }
  //   }else {
  //     value = v;
  //   }
  //   this._mandatory = value;
  //   if (this.Mandatory == true) {
  //     this.style['color'] = 'blue';
  //   }
  // }

  @Input() DstSubstr : boolean = false;

  _DateTimeValue: Date;
  @Input() set DateTimeValue(value: DateTime) {
    let IsAmbiguousTime = TimeZoneInfo.Local.IsAmbiguousTime(value);
    let isDST = false;
    if(IsAmbiguousTime){
      isDST = TimeZoneInfo.Local.IsDSTWithInAmbiguousTime(value);
    }
    this._DateTimeValue = new Date(
      value.Year,
      value.Month,
      value.Day,
      value.Hour,
      value.Minute,
      value.Second
    );
    if (
      !value ||
      (value as any as Date).getFullYear() == 0 ||
      (value as any as Date).getFullYear() == 1
    ) {
      this._DateTimeValue = new Date('0001-01-01T00:00:00');
      let dtModiValue = formatDate(
        this._DateTimeValue,
        this._slDateTimePattern,
        CultureInfo.culture
      );
      this.Text = dtModiValue;
    } else if (this.DateTimePattern) {
      let dtModiValue = formatDate(
        this._DateTimeValue,
        this._slDateTimePattern,
        CultureInfo.culture
      );
      if(IsAmbiguousTime && isDST && !this.DstSubstr){
        this.Text = dtModiValue + " DST";
      }else
      this.Text = dtModiValue;
    } else {
      let dtModiValue = formatDate(
        this._DateTimeValue,
        'dd/MM/yyyy hh:mm:ss',
        CultureInfo.culture
      );
      this.Text = dtModiValue;
    }
  }

  _slDateTimePattern;
  _DateTimePattern: string | DateTimeFormat;
  get DateTimePattern() {
    return this._DateTimePattern;
  }
  @Input() set DateTimePattern(value: string | DateTimeFormat) {
    if (typeof value == 'string') {
      this._slDateTimePattern = this.stringtoSldatetimeformat(value);
    } else {
      this._slDateTimePattern = this.enumtoSldatetimeformat(value);
    }
    this._DateTimePattern = value;
    if (this.DateTimeValue) {
      let dtModiValue = formatDate(
        this._DateTimeValue,
        this._slDateTimePattern,
        CultureInfo.culture
      );
      this.Text = dtModiValue;
    }
  }

  enumtoSldatetimeformat(evalDate: DateTimeFormat) {
    let sdFormat = '';
    switch (evalDate) {
      case DateTimeFormat.ShortDatePattern:
        return SLCultureInfo.ShortDatePattern;

      case DateTimeFormat.LongTimePattern:
        return SLCultureInfo.LongTimePattern;

      case DateTimeFormat.ShortTimePattern:
        return SLCultureInfo.ShortTimePattern;

      default:
        return (
          SLCultureInfo.ShortDatePattern + ' ' + SLCultureInfo.LongTimePattern
        );
    }
  }
  stringtoSldatetimeformat(str: string) {
    str = str.toLowerCase();
    switch (str) {
      case 'shortdatepattern':
        return SLCultureInfo.ShortDatePattern;

      case 'longtimepattern':
        return SLCultureInfo.LongTimePattern;

      case 'shorttimepattern':
        return SLCultureInfo.ShortTimePattern;

      default:
        return (
          SLCultureInfo.ShortDatePattern + ' ' + SLCultureInfo.LongTimePattern
        );
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
    setTimeout(() => {
      this.style['text-align'] = this._textAlignment;
    }, 10);
  }

  _enableDST: string | boolean;
  get EnableDST() {
    return this._enableDST;
  }
  @Input() set EnableDST(value: string | boolean) {
    this._enableDST = value;
  }

  _isFocusable: string | boolean;
  get IsFocusable() {
    return this._isFocusable;
  }
  @Input() set IsFocusable(v: string | boolean) {
    let value: boolean;
    if (typeof v == 'string') {
      if (v == 'True') {
        value = true;
      } else if (v == 'False') {
        value = false;
      }
    } else {
      value = v;
    }
    this._isFocusable = value;
    if (this.IsFocusable) {
      this.style['border'] = 'dotted 1px';
    } else {
      this.style['border'] = '';
    }
  }

  override _isEnabled: string | boolean;
  override get IsEnabled() {
    return this._isEnabled;
  }
  @Input() override set IsEnabled(v: string | boolean) {
    let value: boolean;
    if (typeof v == 'string') {
      if (v == 'True') {
        value = true;
      } else if (v == 'False') {
        value = false;
      }
    } else {
      value = v;
    }
    this._isEnabled = value;
    if (value == false) {
      this.style['color'] = 'black';
      this.style['font-weight'] = 'normal';
      this.style['opacity'] = '0.6';
    } else {
      if(this.Mandatory && this.isGlobalEnabled != false){
        this.style['color'] = '#006aeb';
        this.style['font-weight'] = 'bold';
      }
      if(this.isGlobalEnabled != false)
      this.style['opacity'] = '';
    }
  }

  _isStrike: boolean;
  get IsStrike() {
    return this._isStrike;
  }
  @Input() set IsStrike(v: boolean | string) {
    let value: boolean;
    if (typeof v == 'string') {
      if (v == 'True') {
        value = true;
      } else if (v == 'False') {
        value = false;
      }
    } else {
      value = v;
    }
    this._isStrike = value;
    if (this.IsStrike) {
      this.style['text-decoration'] = 'line-through';
    } else {
      this.style['text-decoration'] = '';
    }
  }
  _bold: boolean;
  get bold() {
    return this._bold;
  }
  @Input() set bold(v: boolean | string) {
    let value: boolean;
    if (typeof v == 'string') {
      if (v == 'True') {
        value = true;
      } else if (v == 'False') {
        value = false;
      }
    } else {
      value = v;
    }
    this._bold = value;
    if (this.bold) {
      this.style['font-weight'] = 'bold';
    } else {
      this.style['font-weight'] = '';
    }
  }
  constructor() {
    super();
    super.controlType = 'Label';
  }

  _BindingPath: string;
  get BindingPath() {
    return this._BindingPath;
  }
  @Input() set BindingPath(value: any) {
    this._BindingPath = value;
  }

  override _DataContext: any;
  override get DataContext() {
    return this._DataContext;
  }
  @Input() override set DataContext(value: any) {
    this._DataContext = value;
  }

  ngOnInit(): void {
    //this.accessKeyService = InjectorInstance.get<AccessKeyService>(AccessKeyService);
  }
  ngDoCheck() {
    this.BindingObjects.forEach(obj => {
      // if (obj.Object == undefined && this.DataContext) {
      //   obj.Object = this.DataContext;
      // }
      //   GetValue(obj) {
      //     return obj[this.ObjectType];
      // },
      if (obj.Object && obj.Property && obj.GetValue(this) !== obj.Object[obj.Property]) {
        obj.SetValue(this, this.getBindingPath(obj.Object, obj.Property));
      }
      else if(obj.Object == undefined && this.DataContext && obj.Property && obj.GetValue(this) != this.DataContext[obj.Property]){
        obj.SetValue(this, this.getBindingPath(this.DataContext, obj.Property));
      }
    });
  }

  ngAfterViewInit(): void {
    if(this.isAfterViewInitRequired){
      setTimeout(() => {
        if (this.DataContext != null && this.BindingPath != null) {
          let binding = new Binding();
          binding.PathObject = this.DataContext;
          binding.Path = this.BindingPath;
          this.SetBinding('Text', binding);
        }
      }, 0);
    }
    //added for rowloaded to be effective
    if (this.containerParent) {
      this.containerParent.Children[`${this.index}`] = this;
    }
  }

  GotFocusEvent(e) {
    if (this.GotFocus instanceof Function) {
      this.GotFocus({}, e);
    }
  }

  SetValue(controlProperty, binding: Control) {
    if (controlProperty === 'Tooltip' || controlProperty === 'ToolTip') {
      this[controlProperty] = binding;
    }
  }

  IsParagraph: boolean;

  override setFocus() {
    this.style['border'] = 'dotted 1px';
  }
  detectChangeOnPush(obj){
        obj.SetValue(this, this.getBindingPath(obj.Object, obj.Property));
  }

  // SetBinding(controlProperty, binding: Binding) {
  //   if (controlProperty === 'Text') {
  //     this.TextObject.Property = binding.Path;
  //     this.TextObject.Object = binding.PathObject;
  //     this.TextObject.SetValue(this.getBindingPath(binding.PathObject, binding.Path));
  //   } else if (controlProperty === 'IsEnabled') {
  //     this.IsEnabledObject.Property = binding.Path;
  //     this.IsEnabledObject.Object = binding.PathObject;
  //     this.IsEnabledObject.SetValue(this.getBindingPath(binding.PathObject, binding.Path));
  //   } else if (controlProperty === 'Visibility') {
  //     this.VisibilityObject.Property = binding.Path;
  //     this.VisibilityObject.Object = binding.PathObject;
  //     this.VisibilityObject.SetValue(this.getBindingPath(binding.PathObject, binding.Path));
  //   } else if (controlProperty === 'Mandatory') {
  //     this.MandatoryObject.Property = binding.Path;
  //     this.MandatoryObject.Object = binding.PathObject;
  //     this.MandatoryObject.SetValue(this.getBindingPath(binding.PathObject, binding.Path));
  //   }
  // }
}
export class iLabelInLineElement {
  InLine: any;
  IsWordwrap: boolean;
  IsLineBreak:boolean=false;
}

export enum DateTimeFormat {
  ShortDatePattern="ShortDatePattern",
  ShortGeneralPattern="ShortGeneralPattern",
  LongGeneralPattern="LongGeneralPattern",
  ShortTimePattern="ShortTimePattern",
  LongTimePattern="LongTimePattern",
  YearMonthPattern="YearMonthPattern",
  Custom="Custom",
}
