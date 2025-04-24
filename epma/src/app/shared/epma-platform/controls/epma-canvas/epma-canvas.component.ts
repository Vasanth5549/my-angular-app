import { Component, HostBinding, Input, OnInit,ElementRef, ViewContainerRef } from '@angular/core';
import { Control, SolidColorBrush } from '../Control';
import { TextBlock } from '../epma-textblock/epma-textblock.component';
import { Panel } from '../Panel';
import { ObservableCollection } from '../../models/observable-collection';
import { Double } from '../../models/eppma-common-types';
// import { Alert } from 'selenium-webdriver';
import { DataTemplate } from '../epma-datatemplate/epma-datatemplate.component';

@Component({
  selector: 'epmaCanvas',
  templateUrl: './epma-canvas.component.html',
  styleUrls: ['./epma-canvas.component.css']
})
export class Canvas extends Control implements OnInit {

  //36576 Stub Created for Bug
  @Input()
  _Children:any=[];
  i:number =0;
  Children={Add:(c)=>{
    if(c.constructor.name == 'Image'){
      c['imageStyle']=this.imageStyles(c);
     }
     if(c.constructor.name == 'Line'){     
      if(c.X1 == undefined){
        setTimeout(()=>{
          c['lineStyle']=this.lineStyles(c) 
          });
      }else{
        c['lineStyle']=this.lineStyles(c)
      }
      
     }
     if(c.constructor.name =='TextBlock'){
      this.i=this.i+1;
      c['testblockStyle']=this.textblockStyle(c,this.i);
     }
  this._Children.push(c);
  }}

__Height:string|number|any;
__Width:string|number|any;
  ref: any;
  getTextblockFirstinstance:number=0;
@Input() override set Height(v: string|number|any){
  this.__Height = v;
}
  override get Height():string|number|any{
  return this.__Height;
}
@Input() override set Width(v: string|number|any){
  this.__Width = v;
}
 override get Width():string|number|any{
  return this.__Width;
}
CanvasService = {images:[]}
public dataTemplate: DataTemplate;
  constructor(private e?:ElementRef) { 
    super()     
    this.ref = this;
  }

  ngOnInit(): void {
   this.ToolTip = " ";
  }

  linestyleObject(lineObj): Object {
    return {'margin-left': lineObj.X1,'margin-top': lineObj.Y1} 
  }
  getStyle(lineObj){
    let res=  {'left':lineObj.X1,'top':lineObj.Y1}
    return res;
  }
  getParentStyles(){
    return {
      width: this.Width,
      height: this.Height
    };
  }
  imageStyles(elem){
    let getMargin = elem.Margin.toString().split(",")
    return{
      top: getMargin[1]+'px',
      left:getMargin[0]+'px',
      width:elem.Width+'px',
      height:elem.Height+'px',
    };
  }
  lineStyles(elem){
    let type = 'solid';
    if(elem.lType == 0){ // this for continuous
      type = 'solid';
     }
     else if(elem.lType == 1){ // this for Dotted
      type = 'dashed';
     }
     else if(elem.lType == 2){ // this for None
      type = 'none';
     }
     let top = parseInt(elem.Y1)-1;
     let width = elem.X2-elem.X1;
    return{
      height: elem.StrokeThickness+'px',
      top: top+'px',
      left:elem.X1+'px',
      width:width+'px',
      border:elem.StrokeThickness+'px '+type+' '+ elem.Stroke.color.color,
    };
  }
  
  textblockStyle(elem,index){
    let getMargin = elem._Margin.toString().split(",");
    if(index>1){
      let indexval = ((parseInt(index)-1)*35);
      getMargin[0] = parseInt(getMargin[0])-indexval+1;
      // update the smae slot previous textblock margin  
      let getPreviousMargin = this._Children[this.getTextblockFirstinstance-1]._Margin;
      let splitMargin = getPreviousMargin.toString().split(",");
      let topMargn = parseInt(splitMargin[1])-10;
      let leftMargin = parseInt(splitMargin[0])-6;
      this._Children[this.getTextblockFirstinstance-1].testblockStyle.margin = topMargn+'px '+splitMargin[2]+'px '+splitMargin[3]+'px '+leftMargin+'px';

    }else{
      this.getTextblockFirstinstance = this._Children.length+1;
      getMargin[0] = parseInt(getMargin[0]);
      
    }
    let top = parseInt(getMargin[1])-10;
    return{
      margin:top+'px '+getMargin[2]+'px '+getMargin[3]+'px '+getMargin[0]+'px',
      font:this.FontSize+" "+this.FontFamily,
      color:this.Foreground
    };
  }


}

// Stub Created for the Bug 36580
// export class Line{

//   Children: any;
//   StrokeDashArray: ObservableCollection<Double>;
//   X1: Double;
//   Y1: Double; 
//   X2: Double;
//   Y2: Double;
//   Stroke: SolidColorBrush; 
//   StrokeThickness: Double;    
//   constructor() { }
  
//   }

