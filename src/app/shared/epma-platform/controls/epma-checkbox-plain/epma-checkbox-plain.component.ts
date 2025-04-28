import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Control} from '../Control';

@Component({
  selector: 'CheckBox',
  templateUrl: './epma-checkbox-plain.component.html',
  styleUrls: ['./epma-checkbox-plain.component.css']
})
export class CheckBox extends Control implements OnInit {
  public static IsEnabledProperty = "IsEnabled";
  public static TextProperty = "Text";
  public static VisibilityProperty = "Visibility";
  public static IsCheckedProperty = "IsChecked";
  ngOnInit(): void {
  }

  // @Output() TextChange = new EventEmitter();
  // @Output() IsCheckedChange = new EventEmitter();
  // @Input() Text: string;
  @Input() Unchecked: Function | string;
  @Input() Checked: Function | string;
  @Output()  IsReadOnlyChange = new EventEmitter();
  _IsReadOnly = true;
  get IsReadOnly() {
    return this._IsReadOnly
  }

  @Input() set IsReadOnly(v: boolean | string) {
    let value: boolean;
    if (typeof v === "string") {
      if (v === "True"||v === "true") {
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
  @Input() Click: Function | string;
  // @Input() IsEnabled: boolean | string;
  @Input() BorderBrush: string;
  // @Input() Visibility: string;
  @Input() Content: string;

  // @Input() KeyUp: Function | string;
  // @Input() IsTabStop: string;
  @Input() Command: object;
  // @Input() Tag: any[];
  @Input() Align: string;
    @Input() IsWordWrap: string;

  ngDoCheck() {
    this.DetectChange();
  }


  // _IsChecked: boolean;
  // @Input() set IsChecked(value: boolean) {
  //   this._IsChecked = value;
  //   this.IsCheckedChange.emit(this._IsChecked);
  // }
  // get IsChecked() {
  //   return this._IsChecked;
  // }

  ckdwn(e) {
    if (this.KeyDown instanceof Function) {
      e['PlatformKeyCode'] = e.keyCode;
      this.KeyDown({}, e);
    }
    // this.KeyDown1.emit(e);
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
  //   }
  // }


  constructor() {
    super();
  }

}
