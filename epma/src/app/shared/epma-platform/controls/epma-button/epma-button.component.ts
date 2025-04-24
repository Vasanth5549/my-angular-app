import {
  AfterViewInit,
  Component,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';

import { InjectorInstance } from 'src/app/app.module';
import { RelayCommand } from '../../models/relay-command';
import { SubjectEventEmitterService } from '../../services/subject-eventemitter.service';
import { AccessKeyService } from '../AccessKey.service';
import { BitmapImage, Control, DependencyPropertyChangedEventArgs } from '../Control';


@Component({
  selector: 'iButton',
  templateUrl: './epma-button.component.html',
  styleUrls: ['./epma-button.component.css'],
})
export class iButton extends Control {
  private accessKeyService: AccessKeyService;

  public static IsEnabledProperty = 'IsEnabled';
  public static TextProperty = 'Text';
  public static VisibilityProperty = 'Visibility';
  public static ImageSourceProperty = 'ImageSource';
  public static ActiveImageSourceProperty = 'ActiveImageSource';
  public static DisabledImageSourceProperty = 'DisabledImageSource';
  public static CommandProperty = 'Command';
  public isAppDialogOkButton: boolean = false;
  public okButtonCompRef: any;
  public subjectEventEmitterService: SubjectEventEmitterService = InjectorInstance.get<SubjectEventEmitterService>(SubjectEventEmitterService);

  ImageSourceObject = {
    Property: '',
    Object: undefined,
    Converter: undefined,
    SetValue: (v) => {
      this.ImageSource = v;
      // this.setImage();
    },
    GetValue: () => {
      return this.ImageSource;
    },
  };
  _cmdtext: string;
  imageStyle = {};
  constructor() {
    super();
    super.controlType = 'iButton';
  }

  ngOnInit(): void {
    this.accessKeyService = InjectorInstance.get<AccessKeyService>(AccessKeyService);
  }
  // @Output() TextChange = new EventEmitter();
  @ViewChild('btnFocus') searchElement: ElementRef;

  isFocus = false;
  TabFocus = false;

  onblur() {
    this.isFocus = false;
  }
  override Focus() {

    this.isFocus = true;
  }

  override setFocus() {
    this.isFocus = true;
    setTimeout(() => {
      this.searchElement.nativeElement.focus();
    }, 0);
  }

  btnimg = '';
  private btnState = 'normal';
  @Output() Click_Func = new EventEmitter();
  @Input() Click: Function | string;
  @Input() cursor: Function | string;
  private _ImageSource: string | BitmapImage;
  private _ActiveImageSource: string | BitmapImage;
  private _DisabledImageSource: string | BitmapImage;

  get ImageSource() {
    return this._ImageSource;
  }

  @Input() set ImageSource(img: string | BitmapImage) {
    this._ImageSource = img;
    this.setImage();
  }

  get ActiveImageSource() {
    return this._ActiveImageSource;
  }

  @Input() set ActiveImageSource(img: string | BitmapImage) {
    this._ActiveImageSource = img;
    this.setImage();
  }

  get DisabledImageSource() {
    return this._DisabledImageSource;
  }

  @Input() set DisabledImageSource(img: string | BitmapImage) {
    this._DisabledImageSource = img;
    this.setImage();
  }

  ngDoCheck() {
    this.DetectChange();
  }
  ChangeImage(ImageSource: string, ActiveImageSource: string, DisabledImageSource: string) {
    this._ImageSource = ImageSource;
    this._ActiveImageSource = ActiveImageSource;
    this._DisabledImageSource = DisabledImageSource;
  }

  @Output() IsEnabledChanged_Func = new EventEmitter();
  @Input() override IsEnabledChanged: Function | string;
  // IsEnabled...
  @Output() override IsEnabledChange = new EventEmitter();

  override _isEnabled: boolean | string;
  override get IsEnabled() {
    if (this.isGlobalEnabled == undefined || this.isGlobalEnabled == true) {
      if ((typeof this._isEnabled == 'string' && (this._isEnabled == 'True' || this._isEnabled == 'true')) || typeof this._isEnabled == 'undefined') {
        return true;
      } else if (typeof this._isEnabled == 'string') {
        return false;
      }
      return this._isEnabled;
    }
    else {
      return this.isGlobalEnabled;
    }
  }
  // override get IsEnabled() {
  //   if(this.isGlobalEnabled == undefined || this.isGlobalEnabled == true)
  //   {
  //       if (
  //         typeof this._isEnabled === 'undefined' ||
  //         (typeof this._isEnabled === 'string' && this._isEnabled === 'True') ||
  //         (typeof this._isEnabled === 'string' && this._isEnabled === 'true')
  //       ) {
  //         return true;
  //       } else if (
  //         (typeof this._isEnabled === 'string' && this._isEnabled === 'False') ||
  //         (typeof this._isEnabled === 'string' && this._isEnabled === 'false')
  //       ) {
  //         return false;
  //       }
  //       return this._isEnabled;
  //   }else{
  //     if ((typeof this._isEnabled == 'string' && (this._isEnabled == 'True' || this._isEnabled == 'true')) || typeof this._isEnabled == 'undefined') {
  //       return true;
  //     } else if (typeof this._isEnabled == 'string') {
  //       return false;
  //     }
  //     return this._isEnabled;
  //   }
  // }
  @Input() override set IsEnabled(v: boolean | string) {
    let DP : DependencyPropertyChangedEventArgs = new DependencyPropertyChangedEventArgs();
    DP.NewValue = v;
    DP.OldValue = this._isEnabled;
    this._isEnabled = v;
    if (this.isAppDialogOkButton) {
      let emitData = { 'IsEnabled': this._isEnabled, 'ComponentName': this.okButtonCompRef };
      this.subjectEventEmitterService.passButtonIsEnabledValue(emitData);
    }
    if (this.IsEnabledChanged instanceof Function) this.IsEnabledChanged({}, DP);
    this.IsEnabledChanged_Func.emit(DP);
    if (v) this.btnState = 'normal';
    else this.btnState = 'disable';
    this.setImage();
  }


  setImage() {
    if (this.btnState === 'normal') {
      if (typeof this._ImageSource == 'string') {
        this.btnimg = this._ImageSource;
      } else if (this._ImageSource instanceof BitmapImage) {
        this.btnimg = typeof this._ImageSource.BitmapImage == 'string' ? this._ImageSource.BitmapImage : "";
      }
    }
    if (this.btnState === 'active') {
      if (typeof this._ActiveImageSource == 'string') {
        this.btnimg = this._ActiveImageSource;
      } else if (this._ActiveImageSource instanceof BitmapImage) {
        this.btnimg = typeof this._ActiveImageSource.BitmapImage == 'string' ? this._ActiveImageSource.BitmapImage : "";
      }
    }
    if (this.btnState === 'disable') {
      if (typeof this._DisabledImageSource == 'string') {
        this.btnimg = this._DisabledImageSource;
      } else if (this._DisabledImageSource instanceof BitmapImage) {
        this.btnimg = typeof this._DisabledImageSource.BitmapImage == 'string' ? this._DisabledImageSource.BitmapImage : "";
      }
    }
  }
  // @Input() ImageHeight: number | string;
  _ImageHeight = '';
  get ImageHeight() {
    return this._ImageHeight;
  }
  @Input() set ImageHeight(value: string) {
    this._ImageHeight = value;
    this.setImageHeight();
  }
  setImageHeight() {
    if (this._ImageHeight == 'Auto') {
      this.imageStyle['height'] = 'auto';
    } else {
      let Imageheight = this._ImageHeight + 'px';
      this.imageStyle['height'] = Imageheight;
    }
  }

  // @Input() ImageWidth: number | string;
  _ImageWidth = '';
  get ImageWidth() {
    return this._ImageWidth;
  }
  @Input() set ImageWidth(value: string) {
    this._ImageWidth = value;
    this.setImageWidth();
  }
  setImageWidth() {
    if (this._ImageWidth == 'Auto') {
      this.imageStyle['width'] = 'auto';
    } else {
      let ImageWidth = this._ImageWidth + 'px';
      this.imageStyle['width'] = ImageWidth;
    }
  }

  // @Input() IsTabStop: Function | boolean | string;
  @Input() Command: string | RelayCommand;

  _content: string;
  get Content() {
    return this._content;
  }
  @Input() set Content(value: any) {
    this._content = value;

  }
  @Output() CommandParameterChanges = new EventEmitter();
  @Input() CommandParameter: any;
  @Input() SelectedImageSource: string;
  // @Input() ImageMargin: number | string;
  _ImageMargin = '0,0,0,0';
  get ImageMargin() {
    return this._ImageMargin;
  }
  @Input() set ImageMargin(value: string) {
    this._ImageMargin = value;
    this.setImageMargin();
  }

  setImageMargin() {
    let myArray = this._ImageMargin.split(',');
    let array: any[] = [];
    myArray.forEach((x) => {
      array.push(x + 'px');
    });
    if (array.length == 1) {
      this.imageStyle['margin-top'] = array[0];
      this.imageStyle['margin-right'] = array[0];
      this.imageStyle['margin-bottom'] = array[0];
      this.imageStyle['margin-left'] = array[0];
    } else {
      this.imageStyle['margin-top'] = array[0];
      this.imageStyle['margin-right'] = array[1];
      this.imageStyle['margin-bottom'] = array[2];
      this.imageStyle['margin-left'] = array[3];
    }
  }

  // @Input() FontSize: number | string;

  @Input() HoverDelay: boolean | string;
  delay: any;

  @Input() IsBackgroundVisible: boolean | string;
  // @Input() FontStretch: string;
  // @Input() HorizontalContentAlignment: string;
  // @Input() VerticalContentAlignment: string;
  @Input()
  override set VerticalContentAlignment(style: string | number) {
    if ((typeof style === 'string' && style === "Left") || (typeof style === 'number' && style === 0)) {
      this.style = {
        ...this.style,
        "justify-content": "start",
      };
    } else if ((typeof style === 'string' && style === "Center") || (typeof style === 'number' && style === 1)) {
      this.style = {
        ...this.style,
        "justify-content": "center",
      };
    } else if ((typeof style === 'string' && style === "Right") || (typeof style === 'number' && style === 2)) {
      this.style = {
        ...this.style,
        "justify-content": "end",
      };
    } else if ((typeof style === 'string' && style === "Right") || (typeof style === 'number' && style === 3)) {
      this.style = {
        ...this.style,
        "justify-content": "space-around",
      }
    }
  }

  @Input()
  set HorizontalContentAlignment(style: string | number) {
    if ((typeof style === 'string' && style === "Left") || (typeof style === 'number' && style === 0)) {
      this.style = {
        ...this.style,
        "align-items": "start",
      };
    } else if ((typeof style === 'string' && style === "Center") || (typeof style === 'number' && style === 1)) {
      this.style = {
        ...this.style,
        "align-items": "center",
      };
    } else if ((typeof style === 'string' && style === "Right") || (typeof style === 'number' && style === 2)) {
      this.style = {
        ...this.style,
        "align-items": "end",
      };
    } else if ((typeof style === 'string' && style === "Stretch") || (typeof style === 'number' && style === 3)) {
      this.style = {
        ...this.style,
        "align-items": "stretch",
      };
    }
  }
  // @Input() Background: string;
  // @Input() Padding: string;

  @Input() override set Text(value: string) {
    this._cmdtext = value;
    this.TextChange.emit(this._text);
  }
  override get Text() {
    return this._cmdtext;
  }
  @ViewChild('inputElement') el: ElementRef;

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

  onButtonClick(e) {
    if (this._isEnabled || this._isEnabled == undefined || this._isEnabled == null) {
      if (this.Click instanceof Function) this.Click({}, e);
      if (this.Command instanceof RelayCommand) this.Command.Trigger(this.CommandParameter);
      this.Click_Func.emit(e);
      this.setImage();
    }
  }
  // public onFocus(): void {
  //   //this.el.nativeElement.focus();
  // }

  @Input() MouseEnter: Function | string;
  @Input() MouseLeave: Function | string;
  @Output() MouseEnter_Func = new EventEmitter();
  @Output() MouseLeave_Func = new EventEmitter();

  mouseenter(e) {
    this.HoverDelay = true;
    if (this.btnState != 'disable') this.btnState = 'active';
    this.setImage();
    if (this.MouseEnter instanceof Function) this.MouseEnter({}, e);
    this.setImageHeight();
    this.MouseEnter_Func.emit(e);
    this.TabFocus = true;
  }
  mouseleave(e) {
    if (this.btnState != 'disable') this.btnState = 'normal';
    this.setImage();
    if (this.MouseLeave instanceof Function) this.MouseLeave({}, e);
    this.MouseLeave_Func.emit(e);
    this.TabFocus = false;
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
  //   } else if (controlProperty === 'ImageSource') {
  //     if (binding.Converter == undefined) {
  //       this.ImageSourceObject.SetValue(this.getBindingPath(binding.PathObject, binding.Path));
  //     } else {
  //       this.ImageSourceObject.Converter = binding.Converter;
  //       let value = this.getBindingPath(binding.PathObject, binding.Path);
  //       value = binding.Converter.transform(value);
  //       this.ImageSourceObject.SetValue(value);
  //     }
  //   } else if (controlProperty === 'ActiveImageSource') {
  //     if (binding.Converter == undefined) {
  //       this.ImageSourceObject.SetValue(this.getBindingPath(binding.PathObject, binding.Path));
  //     } else {
  //       this.ImageSourceObject.Converter = binding.Converter;
  //       let value = this.getBindingPath(binding.PathObject, binding.Path);
  //       value = binding.Converter.transform(value);
  //       this.ImageSourceObject.SetValue(value);
  //     }
  //   } else if (controlProperty === 'Command') {
  //     this.Command = this.getBindingPath(binding.PathObject, binding.Path);
  //   }
  // }
  ngOnDestroy() {
    this.accessKeyService.unregister(this.id);
  }
}