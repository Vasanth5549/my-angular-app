import {
  AfterContentInit,
  AfterViewInit, Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  Input, Output, ViewChild
} from '@angular/core';
import { GridExtension } from '../epma-grid-helpers/grid-extension';
import { Image } from '../epma-image/epma-image.component';
import { StackPanel } from '../epma-stackpanel/epma-stackpanel.component';
import { Binding, SetBindingObject, Thickness } from '../FrameworkElement';
import * as ControlStyles from '../../../../shared/epma-platform/controls/ControlStyles';
import { Color, SolidColorBrush } from '../Control';
import { iCheckBox } from '../epma-checkbox/epma-checkbox.component';
import { iLabel } from '../epma-label/epma-label.component';
import { ContentPresenter } from '../epma-contentpresenter/epma-contentpresenter.component';
import { GridCellTemplateComponent } from '../epma-grid-helpers/grid-cell-template/grid-cell-template.component';

@Component({
  selector: 'DataTemplate',
  templateUrl: './epma-dataTemplate.component.html',
  styleUrls: ['./epma-dataTemplate.component.css'],
})
export class DataTemplate implements AfterContentInit, AfterViewInit {
  public Styles = ControlStyles;
//stub US35022
 LoadContent(): any {
      //throw new Error('Method not implemented.');
  }

  @Output() TextChange = new EventEmitter();
  @ContentChild(Image) img: Image;
  @ContentChild(iCheckBox) ichkbox: iCheckBox;
  @ContentChild(StackPanel) stkpnl: StackPanel;
  @ContentChild(iLabel) ilabel: iLabel;
  @ContentChild(ContentPresenter) ctnptr: ContentPresenter;
  @ViewChild('dataTemplateId', {read: ElementRef, static:false}) dataTemplateId: ElementRef;
  @ContentChild(GridCellTemplateComponent) gridCellTemplateComp: GridCellTemplateComponent;

  GUID = `DT${new Date().getTime()+Math.random().toString().slice(2)+new Date().getMilliseconds()+Math.random().toString().slice(2)}`;

  _iStyle: any = {};
  get iStyle(): any {
    return this._iStyle;
  }
  @Input() set iStyle(value: any) {
    if (this.iStyle != null) {
      Object.keys(value).forEach((item) => {
        this.iStyle[item] = value[item];
      })
    }
  }

  @Input() ParentRowIndex: any;
  @Input() ToolTip = '';
  @Input() rowLoaded = 'False';
  @Input() dataItem: any = {};
  @Input() index: any;
  @Input() colindex: any;
  @Input() Children = [];
  @Input() render = true;
  @Output() RowLoaded = new EventEmitter();
  private _gridHelper: GridExtension;
  get gridHelper(): GridExtension {
    return this._gridHelper;
  }
  @Input() set gridHelper(val: GridExtension) {
    this._gridHelper = val;
    setTimeout(() => {
      this._gridHelper.addCell(this);
    }, 0);
  }
  projection = true;
  public Child: any;

  private _Content: any;
  public get Content(): any {
    return this._Content;
  }
  @Input() set Content(val: any) {
    this._Content = val;
    if (val != null || typeof (val) != "undefined") {
      this.projection = false;
    }
    else {
      this.projection = true;
    }
    this.Child = val;
  }
  _desired: any = {};
  public get DesiredSize() {
    let height = this.dataTemplateId.nativeElement.offsetHeight;
    this._desired.Height = height;
    return this._desired;
  }
  ngAfterViewInit(): void {
    var height = this.dataTemplateId.nativeElement.offsetHeight;
    this.DesiredSize['Height'] = height;

  }

  ngAfterContentInit(): void {
    if (this.ichkbox) {
      this.Children.push(this.ichkbox);
    }
    if (this.gridCellTemplateComp) {
      this.Children.push(this.gridCellTemplateComp);
    }
  }

  BindingObjects: SetBindingObject[] = [];

  getBindingPath(obj: any, path: string) {
    let p = path.split('.');
    let r = obj;
    p.forEach((element) => {
      r = r[element];
    });
    return r;
  }

  setBindingPath(obj: any, path: string, value: any) {
    let p = path.split('.');
    let valObj = obj;
    for (let i = 0; i < p.length - 1; i++) {
      valObj = valObj[p[i]];
    }
    valObj[p[p.length - 1]] = value;
  }

  SetBinding(controlProperty, binding: Binding) {
    let BindingPathValue;
    if (Object.keys(binding.Source).length !== 0) {
      BindingPathValue = binding.Source;
    } else {
      BindingPathValue = this.getBindingPath(binding.PathObject, binding.Path);
    }
    let bObject: SetBindingObject = {
      ObjectType: controlProperty,
      Property: binding.Path,
      Object: binding.PathObject,
      Source: binding.Source,
      SetValue(obj, value) {
        obj[controlProperty] = value;
      },
      GetValue(obj) {
        return obj[controlProperty];
      },
    };
    bObject.SetValue(this, BindingPathValue);
    this.BindingObjects.push(bObject);
  }

  ngDoCheck() {
    this.BindingObjects.forEach(obj => {
      if (obj.Object && obj.Property && obj.GetValue(this) !== obj.Object[obj.Property]) {
        obj.SetValue(this, this.getBindingPath(obj.Object, obj.Property));
      }
    });
  }

  SetValue(controlProperty, value: any) {
    if (controlProperty === 'ToolTip') {
      this[controlProperty] = value;
    }
  }

  _Background: any;
  get Background() {
    return this._Background;
  }
  set Background(value: any) {
    if (value instanceof SolidColorBrush) this._Background = value.brush;
    else this._Background = value;
    this.setBackground();
  }

  setBackground() {
    if (this._Background) {
      if (typeof this._Background == 'string') {
        this.iStyle = {'background-color': this._Background.toLowerCase()}
      } else if (this._Background instanceof Color) {
        this.iStyle = {'background-color': this._Background.color}
      }
      else if (this._Background instanceof SolidColorBrush) {
        this.iStyle = {'background-color': this._Background.color.color}
      }
    }
  }

  _BorderThickness: any;
  get BorderThickness() {
    return this._BorderThickness;
  }
  set BorderThickness(value: string | Thickness) {
    this._BorderThickness = value;
    this.setBorderThickness();
  }

  setBorderThickness() {
    if (this._BorderThickness instanceof Thickness) {
      let myArray = this._BorderThickness.margin.split(',');
      let array: any[] = [];
      myArray.forEach((x) => {
        array.push(x + 'px');
      });
      switch(array.length) {
        case 1:
          this.iStyle = {'border-width': array[0], 'border-style': 'solid'}
          break;
        case 2:
          this.iStyle = {'border-width': array[0] + ' ' + array[1], 'border-style': 'solid'}
          break;
        case 4:
          this.iStyle = {'border-width': `${array[0]} ${array[1]}  ${array[2]} ${array[3]}`, 'border-style': 'solid'};
          break;
      }
    }
    if (typeof(this._BorderThickness) == 'string') {
      let arr = this._BorderThickness.split(' ');
      if (arr.length == 2) {
        this.iStyle = {'border-width': arr[0] + ' ' + arr[1], 'border-style': 'solid'}
      }
      else {
        this.iStyle = {'border-width': this._BorderThickness + 'px', 'border-style': 'solid'};
      }
    }
  }

  private _BorderBrush:any;
  public get BorderBrush(){
    return this._BorderBrush;
  }

  public set BorderBrush(value: any){
    this._BorderBrush = value;
    this.setBorderBrush();
  }

  private setBorderBrush() {
    if (this._BorderBrush) {
      if (typeof this._BorderBrush == 'string') {
        this.iStyle = {'border-color': this._BorderBrush.toLowerCase(), 'border-style': 'solid'}
      } else if (this._BorderBrush instanceof Color) {
        this.iStyle = {'border-color': this._BorderBrush.color, 'border-style': 'solid'}
      }
      else if (this._BorderBrush instanceof SolidColorBrush) {
        this.iStyle = {'border-color': this._BorderBrush.color.color, 'border-style': 'solid'}
      }
    }
  }
  getValue(item){
    //console.log("datatemplates",item);
    return item['_Height'] ? item['_Height'] : {height: "120px"}
  }
}
