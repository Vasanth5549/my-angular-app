import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { HorizontalAlign, VerticalAlign } from '@progress/kendo-angular-layout';
import { List } from '../../models/list';
import { Control } from '../Control';
import { Border } from '../epma-border/epma-border.component';
import { GridExtension } from '../epma-grid-helpers/grid-extension';
import { GridItem, GridLength, iComboBox, iTextBox, iTimeBox } from 'epma-platform/controls';
import { AppLoadService } from '../../services/appLoad.service';
import { Subscription } from 'rxjs';
interface GridItems{
  row:number,
  col:number,
  rowSpan?:number,
  colSpan?:number,
  control:any,
  style?:any
}

@Component({
  selector: 'Grid',
  templateUrl: './epma-grid.component.html',
  styleUrls: ['./epma-grid.component.css']
})
export class Grid extends Control implements OnInit, AfterViewInit,OnDestroy  {
  @Input() cell: string;
  @Input() Loaded: Function | string;

  @Input() GridColumn: any;
  @Input() DynamicControlFocus: iTimeBox | iComboBox | iTextBox;
  public parentObjMouseEnterFlag;
  _GridHelper: GridExtension;
  get GridHelper() {
    return this._GridHelper;
  }
  @Input() set GridHelper(value: GridExtension) {
    this._GridHelper = value;
  }

  private _dynamicControl:any;

  get DynamicControl(){
    return this._dynamicControl;
  }

  @ViewChildren('DynamicControlTempRef') set DynamicControl(value: QueryList<any>){
    this._dynamicControl = value;
    if(this._dynamicControl && (this._dynamicControl._results && this._dynamicControl._results.length > 0)){
      if(this.DynamicControlInit){
        this.DynamicControlInit(this.prepareDynammicControl(value));
      }
    }
    };
  
    private prepareDynammicControl(dynamicControlValue){
      let DynamicControls = {};
      if(dynamicControlValue){
        dynamicControlValue._results.forEach(element => {
          if(element.DynamicRenderConrol){
            if(element.DynamicRenderConrol.constructor.name == 'Grid'){
              if(element.DynamicRenderConrol.Name != null && element.DynamicRenderConrol.Name != ''){
                DynamicControls[element.DynamicRenderConrol.Name] = element.DynamicRenderConrol;  
              }
              element.DynamicRenderConrol?.ChildrenArr.forEach(elem => {
                if(elem?.control.constructor.name == 'ScrollViewer' && elem?.control.Content != null){
                  DynamicControls[elem.control.Content.Name] = elem.control.Content;  
                }
                else
                {
                  DynamicControls[elem.control.Name] = elem.control;
                }
              });
            }else if(element.DynamicRenderConrol.constructor.name == 'StackPanel'){
              if(element.DynamicRenderConrol.Name != null && element.DynamicRenderConrol.Name != ''){
                DynamicControls[element.DynamicRenderConrol.Name] = element.DynamicRenderConrol;  
              }
              element.DynamicRenderConrol?.ChildrenElementArray.forEach(elem => {
                DynamicControls[elem.Name] = elem;
              });
            }
            else{
              DynamicControls[element.Control.Name] = element.DynamicRenderConrol;
            }
          }
        });
      }
      return DynamicControls;
    }

  @Input() DynamicControlInit:Function;

  @ViewChild('DynamicControlTempRef') GridItem: GridItem;
  public static ColumnProperty = 'ColumnDefinitions';
  public static RowProperty = 'RowDefinitions';
  public ChildrenRef = [];
  public static VisibilityProperty: string = "Visibility";
  _ColWidth = [];
  ////STUB Code for bug#36085 fixed
  get ActualWidth(): number {
      return this.el.nativeElement.clientWidth;
  }
   ////STUB Code for bug# 36396
  get ActualHeight(){
    return this.el?.nativeElement?.ActualHeight;
  }
  get ColWidth(){
    return this._ColWidth;
  }
  @Input() set ColWidth(value:any){
    if(value != null){
      let addModeArr = [];
      value.forEach(element => {
        if(element != null && element != undefined)
        addModeArr.push(element);
      });
      this._ColWidth = addModeArr;
    }
  };

  _RowHeight = [];
  get RowHeight(){
    return this._RowHeight;
  }
  @Input() set RowHeight(value:any){
    if(value != null){
      let addModeArr = [];
      value.forEach(element => {
        if(element != null && (element != undefined && element.constructor.name == 'GridLength')){
          addModeArr.push(String(element.Value));
        }
        else if(element != null && element != undefined)
        addModeArr.push(element);
      });
      this._RowHeight = addModeArr;
    }
  };

  @Input() ChildrenArr : GridItems[] = [];

  public Children = {Add : (control:Control|Border) => {
    control.layoutChange.subscribe((e) => {
      if(e.type == 'col')
      this.SetGridColumn(e.control,e.col);
      if(e.type == 'row')
      this.SetGridRow(e.control,e.row);
    })
    this.ChildrenArr.push({row:1,col:1,control:control});
  },      //Stub for Defect #36617
Contains: (control:Control) =>{ 
  if(this.ChildrenArr && this.ChildrenArr.length > 0){
    let findObj = this.ChildrenArr.find((elem) => elem.control == control);
    if(findObj)
    return true;
    else
    return false;
  }else
  return false;
},
Remove: (control:Control) =>{
  if(this.ChildrenArr && (this.ChildrenArr.length > 0 && this.Children.Contains(control))){
   this.ChildrenArr.forEach((element,index) => {
    if(element.control == control){
     this.ChildrenArr.splice(index,1);
    }
   });
  }
},
Clear: () =>{
  this.ChildrenArr = [];
},
Count: () =>{
  return this.ChildrenArr.length;
},
RemoveAt: (pIndex:number) =>{
  if(this.ChildrenArr && (this.ChildrenArr.length > 0)){
   this.ChildrenArr.forEach((element,index) => {
    if(index == pIndex){
     this.ChildrenArr.splice(index,1);
    }
   });
  }
},
};

  public static SetColumn(control:Control | Border,nCol:number){
    control.col = nCol;
  }

  public static SetRow(control:Control | Border,nRow:number){
    control.row = nRow;
  }



  public SetGridColumn(control:Control|Border,nCol:number){
    let controlObj = this.ChildrenArr.find((item) => {
      if(control.Name)
      return item.control.Name == control.Name;
      else
         return item.control == control;
    });
    controlObj.col = nCol;
  }

  public SetGridRow(control:Control|Border,nRow:number){
    let controlObj = this.ChildrenArr.find((item) => {
      if(control.Name)
      return item.control.Name == control.Name;
      else
           return item.control == control;
    });
    controlObj.row = nRow;
  }

  public SetColumnSpan(control:Control,nColSpan:number){
    let controlObj = this.ChildrenArr.find((item) => {
      if (control.Name)
      return item.control.Name == control.Name;
      else
        return item.control == control;
    });
    controlObj.colSpan = nColSpan;
  }

  public SetColumnRowStyle(style: any, row: number, col: number) {
    let controlObj = this.ChildrenArr.find((item) => {
      if (item.row == row && item.col == col)
        return item.control;
    });
    controlObj.style = style;
  }
  public override SetBinding(controlProperty,binding){ // frmbasicformviewer.xaml.cs
    this[controlProperty] = binding;
  }

  @Input() ColumnDefinitionsArr = [];
  public ColumnDefinitions = {Add : (ColumnDefinition:ColumnDefinition) => {
    this.ColumnDefinitionsArr.push(ColumnDefinition);
    if(typeof ColumnDefinition.Width == "object" && ColumnDefinition.Width.constructor.name == "GridLength")
    {
        let width = ColumnDefinition.Width.Value.toString();
        if(ColumnDefinition.Width.IsStar)
        {
          width = width + "fr";
        }
        else if(ColumnDefinition.Width.IsAuto)
        {
          width = "auto";
        }
        this._ColWidth.push(width);
    }
    else if(ColumnDefinition.Width)
    {
      let pintWidth = parseInt(ColumnDefinition.Width);
      if(!Number.isNaN(pintWidth)){
        //var width = typeof(ColumnDefinition.Width)=="string"?parseInt(ColumnDefinition.Width): ColumnDefinition.Width;
        if(ColumnDefinition.Width.Contains('fr')){
          this._ColWidth.push(pintWidth+'fr');
        }
        else{
          this._ColWidth.push(pintWidth);
        }
      }
      else{
        let width = ColumnDefinition.Width;
        this._ColWidth.push(width);
      }
    }
    if(ColumnDefinition.MinWidth){
      var minWidth = typeof(ColumnDefinition.MinWidth)=="string"?parseInt(ColumnDefinition.MinWidth): ColumnDefinition.MinWidth;
      this._ColWidth.push(minWidth);
    }
    
  }};
  @Input() RowDefinitionsArr = [];
  public RowDefinitions = {Add : (RowDefinitions:RowDefinition) => {
    this.RowDefinitionsArr.push(RowDefinitions);
    if(RowDefinitions.Height){
      let pintHeight = parseInt(RowDefinitions.Height);
      if(!Number.isNaN(pintHeight)){
      // var height = typeof(RowDefinitions.Height)=="string"?parseInt(RowDefinitions.Height): RowDefinitions.Height;
      if (RowDefinitions.Height.Contains('fr')) {
        this._RowHeight.push(pintHeight + 'fr')
      }
      else {
        this._RowHeight.push(pintHeight)
      }
    } else{
      let height = RowDefinitions.Height;
      this._RowHeight.push(height);
    }

    }
  },HeightVisibility:(rowIndex,Height) => {
    if(this.ChildrenArr && this.ChildrenArr.length > 0){
      let controlObj = this.ChildrenArr.filter((item) => {
        if (item.row == rowIndex )
          return item.control;
      });
      if(typeof Height == 'number' && Height == 0){
        controlObj.forEach(element => {
          element.style = {'display': "none"}      
        });
      }else if(typeof Height == 'string' && Height == GridLength.Auto){
        controlObj.forEach(element => {
          element.style = {'display': ''}     
        });
      }
    }
  }};

  SetValue(controlProperty, binding: Control) {
    if (controlProperty === 'Tooltip') {
      this[controlProperty] = binding;
    }
  }
    subscription: Subscription;
  constructor(private el?: ElementRef) { super(); }

  ngOnInit(): void {
    this.subscription = AppLoadService.parentObjMouseEnterFlag.subscribe(val=>{
      if (val) {
          this.parentObjMouseEnterFlag = val;
      }
    });
  }

  ngAfterViewInit(): void {
    if (this.DynamicControlFocus?.constructor?.name == 'iTextBox') {
      this.GridItem.DynamicRenderConrol?.setFocus();
    }
  }
  public horizontalAlign: HorizontalAlign = "stretch";
  public verticalAlign: VerticalAlign = "stretch";

  @Input() override set HorizontalAlignment(val) {
    if(val == 'Left'){
      this.horizontalAlign = 'start';
    }else if(val == 'Stretch' || val == 'stretch')
    this.horizontalAlign = 'stretch';
    else{
      this.horizontalAlign = "stretch";
    }
  }

  @Input() override set VerticalAlignment(val){
    if(val == 'Top'){
      this.verticalAlign = 'top';
    }else if(val == 'Stretch' || val == 'stretch')
    this.verticalAlign = 'stretch';
    else if(val == 'Bottom' || val == 'bottom')
    this.verticalAlign = 'bottom';
    else if(val == 'Center' || val == 'center')
    this.verticalAlign = 'middle';
    else{
      this.verticalAlign = "stretch";
    }
  }
  ChildrenOfType<T =unknown>(ctor: { name:string }):List<T>{    
    let lst = new List<T>();
    this.ChildrenRef.forEach((element) => {      
     if(element.constructor.name == ctor.name){
        lst.Add(element);
      }
    })
    return lst;
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

export class ColumnDefinition{
  public Width;
  //STUB Code bug #36011 Fixed
  private minwidth;
  get MinWidth() {
      return this.minwidth
  }

  set MinWidth(value: string | number) {
      this.minwidth = typeof value == 'string' ? value : value.toString();
      this.Width = typeof value == 'string' ? value : value.toString();
  }
}

export class RowDefinition{
  public Height;
  ActualHeight: number;//STUB Code bug #36011
}
