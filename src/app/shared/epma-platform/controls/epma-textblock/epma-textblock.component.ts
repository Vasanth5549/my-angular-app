import { Component, Input, OnInit, ElementRef, HostBinding, HostListener, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { Control } from '../Control';
import { Style } from '../ResourceStyle';

//import { VerticalAlignment } from '../../models/Alignment';
//import { TextBlockBlock } from 'src/app/shared_old/textblock.directive';

@Component({
  selector: 'TextBlock',
  templateUrl: './epma-textblock.component.html',
  styleUrls: ['./epma-textblock.component.css']
})
export class TextBlock extends Control {
  public static TextProperty = "Text";
  public static ForegroundProperty = "Foreground";
  public static FontWeightProperty ="FontWeight";
  public static FontSizeProperty ="FontSize";
  public static ToolTipProperty = "ToolTip";
  @Input() MouseLeave: Function | string;
  @Input() MouseEnter: Function | string;
  @Input() canvas:any;

  _tooltipPosition: 'top' | 'bottom' | 'left' | 'right' = 'bottom';
  get TooltipPosition() {
    return this._tooltipPosition;
  }
  @Input() set TooltipPosition(value: 'top' | 'bottom' | 'left' | 'right') {
    this._tooltipPosition = value;
  }

  _newLine: boolean =  false;
  get newLine() {
    return this._newLine
  }
  @Input() set newLine(value: boolean) {
    this._newLine = value;
  }
  // Style: Style;

  //@Input() Text: string;
  // @Input() FontFamily : any;
  // @Input() FontStyle : any;
  
  @Input() InlinesElements:any[] = [];
  public SetValue : Function = (controlProperty, binding: Control) => {
    if (controlProperty === 'Tooltip' || controlProperty === 'ToolTip') {
      //this.TooltipObject.Property = binding.Path;
      this[controlProperty] = binding;
    } 
  }
  public Inlines = { Add : (value:any) => {
    this.InlinesElements.push(value);
  },
  Clear: () =>{
    this.InlinesElements = [];
  }};
    ActualHeight: number; // STUB Code for bug #35759

  constructor(public r?: ChangeDetectorRef) { // changes
    super()
  }
  ngOnInit(): void {
    let canvas = this.canvas;
    if (canvas && canvas != undefined) {
      let ctx = canvas.getContext('2d');
      this.RenderCanvasText(ctx);
    }
  }
  RenderCanvasText(ctx){
    let getMargin = this.Margin.toString().split(",")
    let marginLeft = getMargin[0];
    let marginTop =  getMargin[1];
    ctx.font = this.FontSize+" "+this.FontFamily;
    ctx.fillStyle = this.Foreground;
    //ctx.textAlign = "center";
    ctx.fillText(this.Text, marginLeft, marginTop);
  }
  // min Height
  minHeight: string;

  //  Max Height
  maxHeight: string;

  ngDoCheck() {
    this.DetectChange();
  }

  // TextAlignment
  textAlignment: any;
  get TextAlignment() {
    return this.textAlignment
  }
  @Input() set TextAlignment(value: string | number) {
    this.textAlignment = value;
  }

  // SetBinding(controlProperty, binding: Binding) {
  //   if (controlProperty === 'Text') {
  //     let p = this.getBindingPath(binding.PathObject, binding.Path);      
  //     let bObject: SetBindingObject = {
  //       ObjectType: controlProperty,
  //       Property: binding.Path,
  //       Object: binding.PathObject,
  //       SetValue(p) {
  //         this[controlProperty] = p;
  //       },
  //       GetValue() {
  //         return this[controlProperty];
  //       },
  //     };

  //     this.BindingObjects.push(bObject);

  //     if (binding.Source) {

  //       this.TextObject.SetValue(binding.Source);
  //     } else {
  //       this.TextObject.Property = binding.Path;
  //       this.TextObject.Object = binding.PathObject;
  //       this.TextObject.SetValue(this.getBindingPath(binding.PathObject, binding.Path));
  //     }
  //   } else if (controlProperty === 'IsEnabled') {
  //     this.IsEnabledObject.Property = binding.Path;
  //     this.IsEnabledObject.Object = binding.PathObject;
  //     this.IsEnabledObject.SetValue(this.getBindingPath(binding.PathObject, binding.Path));
  //   } else if (controlProperty === 'Foreground') {
  //     if (binding.Source) {
  //       this.ForegroundObject.SetValue(binding.Source);
  //     }

  //   }
  // }

  txtblockMouseLeave() {
    if (this.MouseLeave instanceof Function) {
      this.MouseLeave();
    }

  }
  txtblockMouseEnter(){
    if (this.MouseEnter instanceof Function) {
      this.MouseEnter();
    }
  }
    // TextTrimming

  textTrimming: any;
  get TextTrimming() {
    return this.textTrimming
  }
  @Input() set TextTrimming(value: string | number) {
    this.textTrimming = value;
  if (value==='WordEllipsis') {
    this.style['white-space']="nowrap";
    this.style['overflow']="hidden";
    this.style['text-overflow']="ellipsis";
  }else{
    this.style['overflow']="visible";
  }


  
  }
  




















  // @HostListener('mouseenter') Enter() {
  //   this.hover(true);
  //   this.style['color'] = 'red';
  // }

  // @HostListener('mouseleave') Leave() {
  //   this.hover(false);
  //   this.style.color = 'blue'
  // }

  // hover(shouldUnderline: boolean){
  //   if(shouldUnderline){
  //   // Mouse enter   
  //   this.style['text-decoration'] = 'underline'
  //   } else {
  // // Mouse leave    
  // this.style['text-decoration'] = 'none'       
  //   }
  // }
  @Input() classObj = {};
  _Style: Style;
  get Style() {
    return this._Style;
  }

  @Input() set Style(value: Style) {
    this._Style = value;
    this.classObj = {};
    this.classObj[value.Key] = true;
  }
}
