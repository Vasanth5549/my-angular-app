import { EventEmitter, Component, Renderer2, ElementRef, HostBinding, Input, OnInit, Output, ViewChild, TemplateRef, AfterViewInit, OnDestroy, ViewContainerRef } from '@angular/core';
import { GridLayoutItemComponent } from '@progress/kendo-angular-layout';
import { Binding, HorizontalAlignment, SetBindingObject, Thickness, VerticalAlignment } from '../FrameworkElement'
import { Control, SolidColorBrush } from '../Control';
import { Grid } from '../epma-grid/epma-grid.component';

@Component({
  selector: 'Border',
  templateUrl: './epma-border.component.html',
  styleUrls: ['./epma-border.component.css']
})
export class Border extends GridLayoutItemComponent implements AfterViewInit,OnDestroy  {
//STUB US: 35022
 //DesiredSize: any;
 noDefaultStyle:Boolean = false;
 noflexStyle:Boolean = false;
 @Input() isControlRendered:boolean = true;
 @Input() ChildAsTempRef:TemplateRef<any>;
 Guid=new Date().getTime();
 public grid:Grid;
    private _DataContext : any;
    public get DataContext() : any {
      return this._DataContext;
    }
    @Input() set DataContext(v : any) {
      this._DataContext = v;
    }
    private _ToolTip : string="";
    public get ToolTip() : string {
      return this._ToolTip;
    }
  @Input() set ToolTip(v: string) {
    if (v){
      this._ToolTip = v;
    }
  }
    public static ToolTipProperty ="ToolTip";
    public static VisibilityProperty ='Visibility';
  constructor(renderer?: Renderer2, element?: ElementRef<any>,parent?: ViewContainerRef) {
     super(renderer, element) 
     try {
      if (parent) {
        const _injector = parent.injector;
        const _parent: Grid = _injector.get<Grid>(Grid);
        if (_parent != undefined || _parent != null) {
          _parent.ChildrenRef.push(this);
         // _parent.originalRef.Childrenref.push(this);
        }
      }
    } catch (e) {
    }
    }
  @ViewChild('borderId', {read: ElementRef, static:false}) borderId: ElementRef;

  public SetValue : Function = (controlProperty, binding: Control) => {
      this[controlProperty] = binding;
  }
  public FindName(name: string): any {
    return this[name];
};
public Name: string;
public layoutChange = new EventEmitter();
_text: string = '';
get Text() {
  return this._text;
}
@Input() set Text(value: string) {
  this._text = value;
}
@Input() style: any = {};
  @HostBinding('style') baseStyle: any = '';
  @Input() _Height={};
  @Input() Child: any;
  public static BorderBrushProperty = "BorderBrush";
  public static BackgroundProperty = "Background";
  public static TagProperty = "Tag";
  public static BorderThicknessProperty = "BorderThickness";
// need to revisit since it is throwing error at consumption place
//   public DesiredSize(){
//     Height: () => { document.getElementById('borderId').clientHeight;} 
//     //return Height;
// }
_desired:any={};
public get DesiredSize(){
  //let height = document.getElementById('borderId').clientHeight;
  let height = this.borderId.nativeElement.offsetHeight;
  this._desired.Height = height;
  return this._desired;
}

  @Input() RectOverdueColor: string;
  @Input() bAdditionalview: boolean;
  @Input() BindingObjects: SetBindingObject[] = [];
  //@Input() iStyle:any;
  @Input()
  set iStyle(style: string | object) {
    let mappedStyles = style as string;
    if (typeof style === 'object') {
      mappedStyles = Object.entries(style).reduce(
        (styleString, [propName, propValue]) => {
          propName = propName.replace(
            /([A-Z])/g,
            (matches) => `-${matches[0].toLowerCase()}`
          );
          return `${styleString}${propName}:${propValue};`;
        },
        ''
      );
      this.baseStyle = this.baseStyle + mappedStyles;
    } else if (typeof style === 'string') {
      if(!this.noDefaultStyle){
        this.baseStyle = this.baseStyle + `height: calc(100% - 2px);
        width:calc(100% - 2px);
        margin:1px;
        background:${style};`;
      }
      else{
        this.baseStyle = this.baseStyle + `background:${style};`;
      }
      
    }
  }

  @Input() set isContent(value: boolean | string) {
    if (value == true || value == 'true')
      this.baseStyle = this.baseStyle + `display: block`;
  }

  _visible = true;
  get Visibility() {
    return this._visible
  }
  @Output() VisibilityChange = new EventEmitter();
  @Input() set Visibility(value: boolean | string | number) {
    if (value == "Visible" || value === "0" || value === 0 || value == "True" || value === true || typeof (value) == 'undefined') {
      this._visible = true;
      this.setVisible();
    } else {
      this._visible = false;
      this.setVisible();
    }   
  }

  setVisible() {
    if (typeof this.baseStyle === 'object') {
      this.baseStyle['display'] = this._visible ? "" : "none";
    }
    else if (typeof this.baseStyle === 'string') {
      let v = this._visible ? "display: block;" : "display:none;";

      if (this.baseStyle.includes('display:')) {
        let styleArr = this.baseStyle.split(';');

        let styleArrParam = [];

        if(styleArr && styleArr.length > 0){
          for(let i =0;i<styleArr.length;i++){
            if(styleArr[i] != "" && styleArr[i] != null)
            styleArrParam.push(styleArr[i]);
          }
        }

        styleArrParam = styleArrParam.map((item) => { if (item.includes('display:')) { item = v; return item; } else { return item } });
        
        for (let i = 0; i < styleArrParam.length; i++) {
          styleArrParam[i] = styleArrParam[i].replace(/;/, '');
        }
        
        this.baseStyle = styleArrParam.join(';');
      }
      else {
        this.baseStyle += v;
      }

    }
    // this.baseStyle = this._visible ? "display:''" : "display:none";
    // this.baseStyle = this._visible ? this.baseStyle + "display:''" : this.baseStyle + "display:none";
  }

  // Style...
  @Input()
  set Style(style: string | object) {
    let mappedStyles = style as string;
    if (typeof style === 'object') {
      mappedStyles = Object.entries(style).reduce(
        (styleString, [propName, propValue]) => {
          propName = propName.replace(
            /([A-Z])/g,
            (matches) => `-${matches[0].toLowerCase()}`
          );
          return `${styleString}${propName}:${propValue};`;
        },
        ''
      );
      this.baseStyle = mappedStyles;
    } else if (typeof style === 'string') {
      if(!style.includes(":"))
      this.baseStyle = this.baseStyle + `border: 1px solid ${style};`;
      else{
        this.baseStyle = this.baseStyle + mappedStyles;
      }
    }
  }


  // Background...
  @Output() BackgroundChange = new EventEmitter();
  @Input()
  set Background(style: string | object) {
    let mappedStyles = style as string;
    if (style instanceof SolidColorBrush){
      if(this.baseStyle != '' && this.baseStyle.includes('background')){
        let baseStyleArr = this.baseStyle.split(';');
        this.baseStyle = `background:${style.brush};`;
        if(baseStyleArr != null && baseStyleArr.length > 0){
          baseStyleArr.forEach((data,i) => {
            if(!data.includes('background') && data != ""){
              this.baseStyle = this.baseStyle + data + `;`;
            }
          });
        }
      }else
      this.baseStyle = this.baseStyle + `background:${style.brush};`;
    }
    else if (typeof style === 'object') {
      mappedStyles = Object.entries(style).reduce(
        (styleString, [propName, propValue]) => {
          propName = propName.replace(
            /([A-Z])/g,
            (matches) => `-${matches[0].toLowerCase()}`
          );
          return `${styleString}${propName}:${propValue};`;
        },
        ''
      );
      this.baseStyle = mappedStyles;
    } else if (typeof style === 'string') {
      if(!this.noDefaultStyle){
        this.baseStyle = this.baseStyle + `height: calc(100% - 2px);
        width:calc(100% - 2px);
        margin:1px;
        background:${style};`;
      }
      else{
        this.baseStyle = this.baseStyle + `background:${style};`;
      }
    
    }
  }


  // BorderBrush...
  @Input()
  set BorderBrush(style: string | object) {
    let mappedStyles = style as string;
    if (typeof style === 'object') {
      mappedStyles = Object.entries(style).reduce(
        (styleString, [propName, propValue]) => {
          propName = propName.replace(
            /([A-Z])/g,
            (matches) => `-${matches[0].toLowerCase()}`
          );
          return `${styleString}${propName}:${propValue};`;
        },
        ''
      );
      this.baseStyle = mappedStyles;
    } else if (typeof style === 'string') {
      this.baseStyle = this.baseStyle + `border-color:${style};
      border-style:solid;`
    }
  }


  // BorderThickness...
  @Input()
  set BorderThickness(style: string | object | Thickness) {
    let mappedStyles = style as string;
    if (style instanceof Thickness) {
      let myArray = style.margin.split(",");
      let array: any[] = []
      myArray.forEach(x => {
        array.push(x + 'px')
      })
      if (array.length == 1) {
        this.baseStyle = this.baseStyle + `border-style:solid;
        border-width:${array[0]}px;`;
      }
    }
    else if (typeof style === 'object') {
      mappedStyles = Object.entries(style).reduce(
        (styleString, [propName, propValue]) => {
          propName = propName.replace(
            /([A-Z])/g,
            (matches) => `-${matches[0].toLowerCase()}`
          );
          return `${styleString}${propName}:${propValue};`;
        },
        ''
      );
      this.baseStyle = mappedStyles;
    } else if (typeof style === 'string') {
      this.baseStyle = this.baseStyle + `border-style:solid;
      border-width:${style}px;`
    }
  }


  // Margin...
  @Input()
  set Margin(style: string | object) {
    let mappedStyles = style as string;
    if (typeof style === 'object') {
      mappedStyles = Object.entries(style).reduce(
        (styleString, [propName, propValue]) => {
          propName = propName.replace(
            /([A-Z])/g,
            (matches) => `-${matches[0].toLowerCase()}`
          );
          return `${styleString}${propName}:${propValue};`;
        },
        ''
      );
      this.baseStyle = mappedStyles;
    } else if (typeof style === 'string') {
      let margin_in_pixels = style.split(',');
      let margin = '';
      for (let i = 1; i <= margin_in_pixels.length - 1; i++) {
        margin += margin_in_pixels[i] + 'px '
      }
      margin += margin_in_pixels[0] + 'px'
      this.baseStyle = this.baseStyle + `margin:${margin};`
    }
  }


  // Padding...
  @Input()
  set Padding(style: string | object) {
    let mappedStyles = style as string;
    if (typeof style === 'object') {
      mappedStyles = Object.entries(style).reduce(
        (styleString, [propName, propValue]) => {
          propName = propName.replace(
            /([A-Z])/g,
            (matches) => `-${matches[0].toLowerCase()}`
          );
          return `${styleString}${propName}:${propValue};`;
        },
        ''
      );
      this.baseStyle = mappedStyles;
    } else if (typeof style === 'string') {
      let padding_in_pixels = style.split(',')
        .map((val) => val + 'px ')
        .join('');
      this.baseStyle = this.baseStyle + `padding:${padding_in_pixels};`;
    }
  }


  // CornerRadius...
  @Input()
  set CornerRadius(style: string | object) {
    let mappedStyles = style as string;
    if (typeof style === 'object') {
      mappedStyles = Object.entries(style).reduce(
        (styleString, [propName, propValue]) => {
          propName = propName.replace(
            /([A-Z])/g,
            (matches) => `-${matches[0].toLowerCase()}`
          );
          return `${styleString}${propName}:${propValue};`;
        },
        ''
      );
      this.baseStyle = mappedStyles;
    } else if (typeof style === 'string') {
      this.baseStyle = this.baseStyle + `border-radius:${style}px;`;
    }
  }


  // Opacity...
  @Input()
  set Opacity(style: string | object | number) {
    let mappedStyles = style as string;
    if (typeof style === 'object') {
      mappedStyles = Object.entries(style).reduce(
        (styleString, [propName, propValue]) => {
          propName = propName.replace(
            /([A-Z])/g,
            (matches) => `-${matches[0].toLowerCase()}`
          );
          return `${styleString}${propName}:${propValue};`;
        },
        ''
      );
      this.baseStyle = mappedStyles;
    } else if (typeof style === 'string') {
      this.baseStyle = this.baseStyle + `opacity:${style};`;
    } else if (typeof style === 'number') {
      this.baseStyle = this.baseStyle + `opacity:${style.toString()};`;
    }
  }


  // Height...
  @Input()
  set Height(style: string | object | number) {
    let mappedStyles = style as string;
    if (typeof style === 'object') {
      mappedStyles = Object.entries(style).reduce(
        (styleString, [propName, propValue]) => {
          propName = propName.replace(
            /([A-Z])/g,
            (matches) => `-${matches[0].toLowerCase()}`
          );
          return `${styleString}${propName}:${propValue};`;
        },
        ''
      );
      this.baseStyle = mappedStyles;
    } else if (typeof style === 'string') {
      this.baseStyle = this.baseStyle + `height:${style}px;`;
    } else if (typeof style === 'number') {
      this.baseStyle = this.baseStyle + `height:${style.toString()}px;`;
      this._Height['height'] = `${style.toString()}px`;
    }
  }


  // Width...
  @Input()
  set Width(style: string | object | number) {
    let mappedStyles = style as string;
    if (typeof style === 'object') {
      mappedStyles = Object.entries(style).reduce(
        (styleString, [propName, propValue]) => {
          propName = propName.replace(
            /([A-Z])/g,
            (matches) => `-${matches[0].toLowerCase()}`
          );
          return `${styleString}${propName}:${propValue};`;
        },
        ''
      );
      this.baseStyle = mappedStyles;
    } else if (typeof style === 'string') {
      this.baseStyle = this.baseStyle + `width:${style}px;`;
    } else if (typeof style === 'number') {
      this.baseStyle = this.baseStyle + `width:${style.toString()}px;`;
    }
  }


  // MinWidth...
  @Input()
  set MinWidth(style: string | object) {
    let mappedStyles = style as string;
    if (typeof style === 'object') {
      mappedStyles = Object.entries(style).reduce(
        (styleString, [propName, propValue]) => {
          propName = propName.replace(
            /([A-Z])/g,
            (matches) => `-${matches[0].toLowerCase()}`
          );
          return `${styleString}${propName}:${propValue};`;
        },
        ''
      );
      this.baseStyle = mappedStyles;
    } else if (typeof style === 'string') {
      this.baseStyle = this.baseStyle + `min-width:${style}px;`;
    }
  }


  // HorizontalAlignment...
  @Input()
  set HorizontalAlignment(style: string | object | HorizontalAlignment) {
    let mappedStyles = style as string;
    if (typeof style === 'object') {
      mappedStyles = Object.entries(style).reduce(
        (styleString, [propName, propValue]) => {
          propName = propName.replace(
            /([A-Z])/g,
            (matches) => `-${matches[0].toLowerCase()}`
          );
          return `${styleString}${propName}:${propValue};`;
        },
        ''
      );
      this.baseStyle = mappedStyles;
    } else if (typeof style === 'string') {
      this.baseStyle = this.baseStyle + `justify-self:${style};`;
    } else if (typeof style === 'number'){
      switch (style) {
        case 0:
          this.baseStyle = this.baseStyle + `justify-self:start;`;
          break;
          case 1:
          this.baseStyle = this.baseStyle + `justify-self:center;`;
          break;
          case 2:
            this.baseStyle = this.baseStyle + `justify-self:end;`;
            break;
        default:
          this.baseStyle = this.baseStyle + `justify-self:stretch;`;
          break;
      }
  }
  }


  // VerticalAlignment...
  @Input()
  set VerticalAlignment(style: string | object | VerticalAlignment) {
    let mappedStyles = style as string;

    if (typeof style === 'object') {
      mappedStyles = Object.entries(style).reduce(
        (styleString, [propName, propValue]) => {
          propName = propName.replace(
            /([A-Z])/g,
            (matches) => `-${matches[0].toLowerCase()}`
          );
          return `${styleString}${propName}:${propValue};`;
        },
        ''
      );
      this.baseStyle = mappedStyles;
    } else if (typeof style === 'string') {
      if (!this.noflexStyle) {
        this.baseStyle = this.baseStyle + `align-self:${style};`;
      }
      else {
        this.baseStyle = this.baseStyle + `align-self:${style};` + `display:flex;`;
      }
    }
    else if (typeof style === 'number'){
        switch (style) {
          case 0:
            this.baseStyle = this.baseStyle + `align-self:start;`;
            break;
            case 1:
            this.baseStyle = this.baseStyle + `align-self:center;`;
            break;
            case 2:
              this.baseStyle = this.baseStyle + `align-self:end;`;
              break;
          default:
            this.baseStyle = this.baseStyle + `align-self:stretch;`;
            break;
        }
    }
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
      Mode:binding.Mode,
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
  getBindingPath(obj: any, path: string) {
    if (path.Contains('['))
      path = path.replace('[', '.').replace(']', '');
    let p = path.split('.');
    let r = obj;
    p.forEach((element) => {
      if(r){
        r = r[element];
      }
    });
    return r;
  }

  //Tag
  @Output() TagChange = new EventEmitter();
  _tag: any;
  get Tag(): any {
      return this._tag;
  }

  @Input() set Tag(value: any) {
      this._tag = value;
  }

  //MouseLeftButtonDown
  @Input() MouseLeftButtonDown: Function | string;
  @Output() MouseLeftButtonDown_Func = new EventEmitter();

  MouseLeftButtonDownEvent(e) {
      if (this.MouseLeftButtonDown instanceof Function) {
        if (e.button == 0) this.MouseLeftButtonDown(this, e);
      }
      this.MouseLeftButtonDown_Func.emit(e);
  }
  ngAfterViewInit() {
    //var width = this.borderId.nativeElement.offsetWidth;
    var height = this.borderId.nativeElement.offsetHeight;
    // this.DesiredSize['Height']=height;
    this.DesiredSize['Height']=height;
  }
  ngOnDestroy() {
    if (this.grid?.ChildrenRef.length > 0) {
      this.grid.ChildrenRef.forEach((element, index, obj) => {
        if (element.Guid == this.Guid) {
          obj.splice(index, 1);
          return;
        }
      });
    }
 }
 ngDoCheck() {
  this.DetectChange();
 }
 setBindingPath(obj: any, path: string, value: any) {
  if (path.Contains('['))
      path = path.replace('[', '.').replace(']', '');
  let p = path.split('.');
  let valObj = obj;
  for (let i = 0; i < p.length - 1; i++) {
      valObj = valObj[p[i]];
  }
  valObj[p[p.length - 1]] = value;
}
assignViewToModel(SelectedValue,val){
  if(this.BindingObjects && this.BindingObjects.length){
      const controlObject = this.BindingObjects.find(ele => ele.ObjectType == val);
      if (controlObject && controlObject.Mode == "TwoWayExtended") {
        if(controlObject.Object)
        this.setBindingPath(controlObject.Object, controlObject.Property, SelectedValue);
        else if(this.DataContext){
        this.setBindingPath(this.DataContext, controlObject.Property, SelectedValue);
      }
      }
  }
}
DetectChange() {
  this.BindingObjects.forEach((obj) => {
      if (
          obj.Object &&
          obj.Property &&
          obj.GetValue(this) !== this.getBindingPath(obj.Object,obj.Property)
      ) {
          obj.SetValue(this, this.getBindingPath(obj.Object, obj.Property)); 
      } else if (
          obj.Object == undefined &&
          this.DataContext &&
          obj.Property &&
          obj.GetValue(this) != this.DataContext[obj.Property]
      ) {
          obj.SetValue(this, this.getBindingPath(this.DataContext, obj.Property));
      }
  });
}
}
