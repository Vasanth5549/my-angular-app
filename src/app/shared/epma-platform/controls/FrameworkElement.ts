import { Component, EventEmitter, Input, Output, PipeTransform } from "@angular/core";
import { UIElement } from "./UIElement";
import { Visibility } from "../controls-model/Visibility";
import { GridLength } from "epma-platform/controls";

@Component({
    template: ''
})
export class FrameworkElement extends UIElement {

    public static HeightProperty = 'Height';
    public static WidthProperty = 'Width';

    public static displayVisibilityWidthProperty = 'displayVisibilityWidth';

    // stub US 35022
    @Input() MouseLeftButtonDown: Function | string;
    public static ChildrenOfType<T = unknown>(element: UIElement): any { };

    public ParentOfType<T = unknown>(element?: UIElement): any { };
    @Input() SizeChanged: Function | String;
    @Input() style: any = {};
    Parent: any;

    // Name...
    _name: string;
    get Name() {
        return this._name;
    }
    @Input() set Name(value: string) {
        this._name = value;
    }

    _DataContext: any;
    get DataContext() {
        return this._DataContext;
    }
    @Input() set DataContext(value: any) {
        this._DataContext = value;
    }

    _Cursor = '';

    get Cursor() {
        return this._Cursor
    }
    @Input() set Cursor(value: string) {
        this._Cursor = value;
        this.setCursor();
    }

    @Output() TagChange = new EventEmitter();
    _tag: any;
    get Tag(): any {
        return this._tag;
    }

    @Input() set Tag(value: any) {
        this._tag = value;
    }

    _Height: string | number = '';
    get Height() {
        return this._Height
    }
    @Input() set Height(value: string | number) {
        this._Height = value;
        this.setHeight();
    }
    _Width = '';
    get Width() {
        return this._Width
    }
    @Input() set Width(value: string | number) {
        if (value) {
        this._Width = typeof value == 'string' ? value : value.toString();
        this.setWidth();
        }
    }
    _minWidth = ''
    get MinWidth() {
        return this._minWidth.toLocaleLowerCase()
    }
    @Input() set MinWidth(value: string) {
        this._minWidth = value;
        this.setMinWidth();
    }
    _maxWidth = ''
    get MaxWidth() {
        return this._maxWidth.toLocaleLowerCase()
    }
    @Input() set MaxWidth(value: string | number) {
        if (value) {
            this._maxWidth = value.toString();
            this.setMaxWidth();
        }
    }

    // @Input()
    // private _VerticalAlignment: VerticalAlignment | string;
    // public get VerticalAlignment(): VerticalAlignment | string {
    //   return this._VerticalAlignment;
    // }
    // public set VerticalAlignment(value: VerticalAlignment | string) {
    //   this.style['justify-content'] = value;
    //   this._VerticalAlignment = value;
    // }

    // @Input()
    // private _HorizontalAlignment: HorizontalAlignment | string | number ;

    // public get HorizontalAlignment(): HorizontalAlignment | string | number {
    //   return this._HorizontalAlignment;
    // }
    // public set HorizontalAlignment(value: HorizontalAlignment | string) {
    //   this._HorizontalAlignment = value;
    // }

    _Margin = "0,0,0,0";
    get Margin() {
        return this._Margin
    }
    @Input() set Margin(value: string | Thickness) {
        if (value instanceof Thickness)
            this._Margin = value.margin;
        else
            this._Margin = value;
        this.setMargin();
    }

    _Opacity: any;
    get Opacity() {

        return this._Opacity
    }
    @Input() set Opacity(value: any) {
        this._Opacity = value;
        this.setOpacity();

    }
    @Output() visible = new EventEmitter();
    _visible = true;
    _visibleReturn: string | Visibility | boolean;
    get Visibility() {
        return this._visibleReturn; // Return the actuval values which are coming as input
        //return this._visible;
    }

    @Output() VisibilityChange = new EventEmitter();
    @Input() set Visibility(value: string | Visibility | boolean) {
        if (typeof value === 'string' && value == "Visible")
            value = Visibility.Visible;
        else if (typeof value === 'string' && value == "Collapsed")
            value = Visibility.Collapsed;

        this._visibleReturn = value;
        if (typeof value == 'boolean') {
            value = value.toString().toLowerCase();
        }
        if (value == undefined || value == 'null' || value == null) {
            this._visible = true;
            this.setVisible();
        }
        else if (value === 0) {
            this._visible = true;
            this.setVisible();

        } else if (value == Visibility.Collapsed || value == "Collapsed" || value as any as number == 1 || value == "False" || (typeof value === 'string' && value === 'false')) {
            this._visible = false;
            this.setVisible();
        }
        else if (value as any as Visibility == Visibility.Visible || value == "Visible" || value == "True" || value as any as boolean === true || (typeof value === 'string' && value === 'true')) {
            this._visible = true;
            this.setVisible();
        } else {
            this._visible = true;
            this.setVisible();
        }
        this.assignViewToModel(value,"Visibility");     
    }

    @Input() KeyUp: Function | string;
    @Input() KeyDown: Function | string;
    @Input() OnClick: Function | string;
    @Output() KeyUp_Func = new EventEmitter();
    @Output() KeyDown_Func = new EventEmitter();
    @Output() OnClick_Func = new EventEmitter();
    public controlType;
    public DynamicControls;
    public FindName(name: string): any {
        if(this[name]){
            return this[name];
        }
        else{
            if(this.DynamicControls && this.DynamicControls[name]){
                return this.DynamicControls[name];
            }
            else{
                return undefined;
            }
        }
    };
    OnClickEvent(e) {
        if (this.OnClick instanceof Function) {
            if (this.controlType === 'TextBox') {
                this.OnClick({}, e);
            }
        }
        this.OnClick_Func.emit(e);
    }
    _IsStopPropagation: boolean = false;
    get IsStopPropagation(){
      return this._IsStopPropagation;
    }
    @Input() set IsStopPropagation(value: boolean) {
      this._IsStopPropagation = value;
    }
    stopEventPropagation(e){
      e.stopPropagation();
    }

    KeyUpEvent(e) {
        if (this.KeyUp instanceof Function) {
            if (this.controlType === 'TextBox') {
                e['PlatformKeyCode'] = e.keyCode;
                this.KeyUp({}, e);
            } else if (this.controlType === 'CheckBox') {
                e['PlatformKeyCode'] = e.keyCode;
                this.KeyUp({}, e);
            } else if (this.controlType === 'RadioButton') {
                e['PlatformKeyCode'] = e.keyCode;
                this.KeyUp({}, e);
            } else if (this.controlType === 'iButton') {
                this.KeyUp({}, e);
            } else if (this.controlType === 'iCheckBox') {
                this.KeyUp({}, e);
            } else if (this.controlType === 'iTab') {
                this.KeyUp({}, e);
            } else if (this.controlType === 'iComboBox') {
                this.KeyUp(this, e);
            }
        }
        this.KeyUp_Func.emit(e);
    }
    KeyDownEvent(e) {
        if (this.KeyDown instanceof Function) {
            if (this.controlType === 'TextBox') {
                e['PlatformKeyCode'] = e.keyCode;
                this.KeyDown({}, e);
            } else if (this.controlType === 'CheckBox') {
                e['PlatformKeyCode'] = e.keyCode;
                this.KeyDown({}, e);
            } else if (this.controlType === 'RadioButton') {
                e['PlatformKeyCode'] = e.keyCode;
                this.KeyDown({}, e);
            } else if (this.controlType === 'iButton') {
                this.KeyDown({}, e);
            } else if (this.controlType === 'iCheckBox') {
                this.KeyDown({}, e);
            } else if (this.controlType === 'iTab') {
                this.KeyDown({}, e);
            } else if (this.controlType === 'iUpDownBox') {
                this.KeyDown({}, e);
            } else if (this.controlType === 'iComboBox') {
                this.KeyDown({}, e);
            }
        }
        this.KeyDown_Func.emit(e);
    }

    public AddHandler(MouseEvent: any, handler: Function, handledEventsToo?: boolean) {
        if (MouseEvent == 'keydown') {
            if (handledEventsToo)
                this.KeyDown = handler;
            else {
                if (!this.KeyDown && !(this.KeyDown instanceof Function))
                    this.KeyDown = handler;

            }
        } else if (MouseEvent == 'MouseLeftButtonDownEvent') {
            if (handledEventsToo)
                this.MouseLeftButtonDown = handler;
            else {
                if (!this.MouseLeftButtonDown && !(this.MouseLeftButtonDown instanceof Function))
                    this.MouseLeftButtonDown = handler;

            }
        }
    }

    public RemoveHandler(MouseEvent: any, handler: Function) {
        if (MouseEvent == 'keydown') {
            if (this.KeyDown == handler)
                this.KeyDown = null;
        } else if (MouseEvent == 'MouseLeftButtonDownEvent') {
            if (this.MouseLeftButtonDown == handler)
                this.MouseLeftButtonDown = null;
        }
    }
    setVisible() {

        this.style['display'] = this._visible ? "" : "none";
    }

    setOpacity() {
        this.style['opacity'] = this._Opacity;
    }

    setCursor() {
        if (this._Cursor == "Hand") {
            this.style['cursor'] = "pointer";
        } else if (this._Cursor == "SizeWE") {
            this.style['cursor'] = "ew-resize";
        } else if (this._Cursor == "Arrow") {
            this.style['cursor'] = "context-menu";
        }
    }
    setHeight() {
        if (typeof this._Height == 'number') {
            this.style['height'] = this._Height.toString() + 'px';
        } else {
            if (this._Height == "Auto") {
                this.style['height'] = "auto";
            } else {
                let height = this._Height + 'px'
                this.style['height'] = height;
            }
        }
    }

    setWidth() {
        if (this._Width == "Auto") {
            this.style['width'] = "auto";
        } else {
            let width = this._Width + 'px'
            this.style['width'] = width;
        }
    }
    setMinWidth() {
        if (this._minWidth == "Auto") {
            this.style['min-width'] = "auto";
        } else {
            let minWidth = this._minWidth + 'px'
            this.style['min-width'] = minWidth;
        }
    }

    setMaxWidth() {
        if (this._maxWidth == "Auto") {
            this.style['max-width'] = "auto";
        } else {
            let maxWidth = this._maxWidth + 'px'
            this.style['max-width'] = maxWidth;
        }
    }

    marginControlList = ['iComboBox', 'TextBox', 'iUpDownBox', 'iDateTimePicker', 'iTimeBox'];
    setMargin() {
        let myArray = this._Margin.split(",");
        let array: any[] = []
        myArray.forEach(x => {
            array.push(x + 'px')
        })
        if (array.length == 1) {
            this.style['margin-top'] = array[0];
            this.style['margin-right'] = array[0];
            this.style['margin-bottom'] = array[0];
            this.style['margin-left'] = array[0];
            if (this.marginControlList.includes(this.controlType)) {
                this.style['width'] = `calc(100% - ${parseInt(array[0]) * 2}px)`;
            }
        } else if (array.length == 2) {
            this.style['margin-top'] = array[1];
            this.style['margin-right'] = array[0];
            this.style['margin-bottom'] = array[1];
            this.style['margin-left'] = array[0];
            if (this.marginControlList.includes(this.controlType)) {
                this.style['width'] = `calc(100% - ${parseInt(array[0]) * 2}px)`;
            }
        } else {
            this.style['margin-top'] = array[1];
            this.style['margin-right'] = array[2];
            this.style['margin-bottom'] = array[3];
            this.style['margin-left'] = array[0];
            if (this.marginControlList.includes(this.controlType)) {
                this.style['width'] = `calc(100% - ${parseInt(array[0]) + parseInt(array[2])}px)`;
            }

        }

    }
    _displayVisibilityWidth = null;
    get displayVisibilityWidth(){
      return this._displayVisibilityWidth;
    }

    @Input() set displayVisibilityWidth(value: GridLength | any) {
        if(value != null && value != undefined){
            if (value.Value == 0) {
              this._displayVisibilityWidth = true;
            } else {
                this._displayVisibilityWidth = false;
            }
            this.setdisplayVisibilityWidth();
        }
    }

    setdisplayVisibilityWidth(){
        if(this._displayVisibilityWidth){
            this.style['display'] = 'none';
        }else{
            this.style['display'] = '';
        }
    }


    @Input() BindingObjects: SetBindingObject[] = [];

    getBindingPath(obj: any, path: string) {
        if (path.Contains('['))
            path = path.replace('[', '.').replace(']', '');
        let p = path.split('.');
        let r = obj;
        p.forEach((element) => {
            if (r) {
                r = r[element];
            }
        });
        return r;
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

    SetBinding(controlProperty, binding: Binding,bindingObjectsOnPush?:any[]) {
        let BindingPathValue;
        if (Object.keys(binding.Source).length !== 0) {
            BindingPathValue = binding.Source;
        } else {
            if (binding.PathObject) {
                BindingPathValue = this.getBindingPath(binding.PathObject, binding.Path);
            }
        }
        if (binding.Mode == BindingMode.OneTime){

            if (binding.Converter) {
                this[controlProperty] = binding.Converter.transform(this.getBindingPath(binding.PathObject, binding.Path),null,binding.ConverterParameter);
            } else {
                this[controlProperty] =this.getBindingPath(binding.PathObject, binding.Path);
            }            

        }else  if (binding.Mode == BindingMode.OnPush && bindingObjectsOnPush != undefined){

            let tempSource = this.Name;    
            let bObject: SetBindingObject = {

                ObjectType: controlProperty,
                Property: binding.Path,
                Object: binding.PathObject,
                Source: tempSource,
                Mode:binding.Mode,
                Converter: binding.Converter,
                ConverterParameter: binding.ConverterParameter,
    
                SetValue(obj, value) {
    
                    if (this.Converter) {
                        obj[this.ObjectType] = this.Converter.transform(value,null,this.ConverterParameter);
                    } else {
                        obj[this.ObjectType] = value;
                    }
                },
                GetValue(obj) {
                    return obj[this.ObjectType];
                },
            };
           // bObject.SetValue(this, BindingPathValue);
            bindingObjectsOnPush.push(bObject);       

        }
        else
        {
        let bObject: SetBindingObject = {

            ObjectType: controlProperty,
            Property: binding.Path,
            Object: binding.PathObject,
            Source: binding.Source,
            Mode:binding.Mode,
            Converter: binding.Converter,
            ConverterParameter: binding.ConverterParameter,

            SetValue(obj, value) {

                if (this.Converter) {
                    obj[this.ObjectType] = this.Converter.transform(value,null,this.ConverterParameter);
                } else {
                    obj[this.ObjectType] = value;
                }
            },
            GetValue(obj) {
                return obj[this.ObjectType];
            },
        };
        bObject.SetValue(this, BindingPathValue);
        this.BindingObjects.push(bObject);
    }

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
            //   if (obj.Object == undefined && this.DataContext) {
            //     obj.Object = this.DataContext;
            //   }
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
export interface SetBindingObject {

    ObjectType;
    Property;
    Object: any;
    Source?: any;
    Mode?:any;
    Converter?: PipeTransform;
    ConverterParameter?: any;
    GetValue(o): any;
    SetValue(o, v: any): void;
}

export enum BindingMode {
    OneTime = "OneTime",
    OneWay = 'OneWay',
    OnPush = "OnPush",
    TwoWay = 'TwoWay',
    TwoWayExtended = "TwoWayExtended"

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
    ConverterParameter: any;
    ElementName: '';
    Mode: BindingMode;
}

export enum VerticalAlignment {
    Top = 0,
    Center = 1,
    Bottom = 2,
    Stretch = 3
}

export enum HorizontalAlignment {
    Left = 0,
    Center = 1,
    Right = 2,
    Stretch = 3
}

export class Thickness {
    public margin: string = "";
    public Left: number;
    public Right: number;
    public Bottom: number;
    public Top: number;
    constructor(uniformLength?: number)
    constructor(left?: number, top?: number, right?: number, bottom?: number);
    constructor(left?: number, top?: number, right?: number, bottom?: number) {

        if (left != undefined && top == undefined) {
            this.margin = left + ',' + left + ',' + left + ',' + left;
            this.Top = left!;
            this.Bottom = left!;
            this.Right = left!;
            this.Left = left!;
        } else {
            this.margin = left + ',' + top + ',' + right + ',' + bottom;
            this.Top = left!;
            this.Bottom = top!;
            this.Right = right!;
            this.Left = bottom!;
        }
    }

}
export class RoutedEventArgs {
    constructor() { }
    OriginalSource?: any = {}; // stub created BUG#36424
    Source?: any;
}
export class RoutedPropertyChangedEventArgs<T = any> extends RoutedEventArgs {
    constructor(oldValue: T, newValue: T) {
        super();
        this.NewValue = newValue;
        this.OldValue = oldValue;
    }
    public NewValue: T;
    public OldValue: T;
}

export class SizeChangedEventArgs<T = any> extends RoutedEventArgs {
    public NewSize: T;
    public PreviousSize: T;
    constructor(previousSize?: T, newSize?: T) {
        super();
        this.NewSize = newSize;
        this.PreviousSize = previousSize;
    }
}
