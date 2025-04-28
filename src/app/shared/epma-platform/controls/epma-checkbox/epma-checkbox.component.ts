import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { InjectorInstance } from 'src/app/app.module';
import { AccessKeyService } from '../AccessKey.service';
import { Control } from '../Control';
import { RelayCommand } from '../../models/relay-command';
import { RoutedEventArgs } from '../FrameworkElement';



@Component({
  selector: 'iCheckBox',
  templateUrl: './epma-checkbox.component.html',
  styleUrls: ['./epma-checkbox.component.css']
})
export class iCheckBox extends Control implements OnInit, AfterViewInit {
  private accessKeyService: AccessKeyService;
  public static IsEnabledProperty = "IsEnabled";
  public static TextProperty = "Text";
  public static VisibilityProperty = "Visibility";
  public static IsCheckedProperty = "IsChecked";
  public static BackgroundProperty = "Background";

  @Input() GridRowIndex: number;
  @Input() GridParentRowIndex: number;

  constructor() {
    super();
    super.controlType = 'CheckBox';
  }

  ngOnInit(): void {
    this.accessKeyService = InjectorInstance.get<AccessKeyService>(AccessKeyService);
  }
  ngAfterViewInit(): void {
    if (typeof this._IsChecked == 'boolean' && this._IsChecked) {

      this.Checked_Func.emit(null);
      if (this.Checked instanceof Function) {
        this.Checked(null, null);
      }
    }

  }
  // @ViewChild('myCheckbox') myCheckbox:any;

  // EllipsisStyle...
  _EllipsisStyle = false;
  get EllipsisStyle(): boolean | string {
    return this._EllipsisStyle;
  }
  @Input() set EllipsisStyle(v: boolean | string) {
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
    this._EllipsisStyle = value;
  }

  isFocus = false;
  onblur() {
    this.isFocus = false;
    // alert('hi')
  }
  override Focus() {
    this.isFocus = true;
  }

  @ViewChild('checkBox') searchElement: ElementRef;

  override setFocus() {
    this.isFocus = true;
    setTimeout(() => {
      this.searchElement.nativeElement.focus();
    }, 0);
  }
  // override setFocus(){
  //   this.ref.nativeElement.focus();
  //   // setTimeout(()=>{
  //   //   this.searchElement.nativeElement.focus();
  //   // },200);
  // }
  // @Output() TextChange = new EventEmitter();
  // @Output() IsCheckedChange = new EventEmitter();
  // @Input() Text: string;

  @Output() CommandParameterChanges = new EventEmitter();
  @Input() CommandParameter: any;
  @Input() Command: string | RelayCommand;

  @Input() Unchecked: Function | string;
  @Input() Checked: Function | string;
  @Output() Checked_Func = new EventEmitter<any>;
  @Output() IsReadOnlyChange = new EventEmitter();
  _IsReadOnly = true;
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
  // @Input() FontWeight: string;
  // @Input() FontStretch: string;
  // @Input() Foreground: string;
  @Input() OnChange: Function | string;
  @Output() OnChange_Func = new EventEmitter();
  @Input() Click: Function | string;
  @Output() Click_Func = new EventEmitter();
  // @Input() IsEnabled: boolean | string;
  @Input() BorderBrush: string;
  // @Input() Visibility: string;

  _Content = '';
  get Content() {
    return this._Content;
  }
  @Input() set Content(value: string) {
    this._Content = value;
  }

  @Input() IsWordWrap: string;
  ngDoCheck() {
    this.DetectChange();
  }



  _Align: string;
  get Align() {
    return this._Align;
  }
  @Input() set Align(v: any) {
    let value: string;
    if (v == 'Center') {
      value = 'center';
    } else if (v == 'Left') {
      value = 'left';
    } else if (v == 'Right') {
      value = 'right';
    } else {
      value = 'justify';
    }
    this._Align = value;
    this.style['text-align'] = this._Align;
    // setTimeout(() => {
    //   this.labelstyle['text-align'] = this._Align;
    // }, 10);
  }


  OnChangeEvent(e) {
    this.get_checkbox_change_event(e);
    if (this.OnChange && this.OnChange instanceof Function) {
      let rargs: RoutedEventArgs = new RoutedEventArgs()
      rargs.OriginalSource.IsChecked = e.IsChecked;
      this.OnChange(this, rargs);
    }
    this.OnChange_Func.emit(this);
  }
  get_checkbox_change_event(e) {
    this._IsChecked = e.target.checked; //this.elementref.nativeElement.checked;
    if (e.target.checked == true) {
      e['Checked'] = e.target;
      // if( e.target.checked == true){
      if (this.Checked instanceof Function) {
        this.Checked({}, e);
      }
    } else if (!e.target.checked) {
      e['Unchecked'] = e.target;
      // if( e.target.checked == true){
      if (this.Unchecked instanceof Function) {
        this.Unchecked({}, e);
      }
    }
    this.assignViewToModel(this._IsChecked, iCheckBox.IsCheckedProperty);
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
  //   } else if (controlProperty === 'IsChecked') {
  //     this.IsCheckedObject.Property = binding.Path;
  //     this.IsCheckedObject.Object = binding.PathObject;
  //     this.IsCheckedObject.SetValue(this.getBindingPath(binding.PathObject, binding.Path));
  //   } else if (controlProperty === 'Visibility') {
  //     this.VisibilityObject.Property = binding.Path;
  //     this.VisibilityObject.Object = binding.PathObject;
  //     this.VisibilityObject.SetValue(this.getBindingPath(binding.PathObject, binding.Path));
  //   }
  // }
  checkBoxClick(event) {
    let _RoutedEventArgs: RoutedEventArgs = event;
    if (this.Click instanceof Function) this.Click({}, _RoutedEventArgs);
    this.Click_Func.emit(_RoutedEventArgs);
  }
  ngOnDestroy() {
    this.accessKeyService.unregister(this.id);
  }

  ngModelChangeEvent(e) {
    this._IsChecked = e;
    this.IsCheckedChange.emit(e);
  }
}
