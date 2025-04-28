import { Component, HostBinding, Input, OnInit,ElementRef,Renderer2 } from '@angular/core';
import { BitmapImage, Control, SolidColorBrush, Uri, UriKind } from '../Control';
import { Double } from '../../models/eppma-common-types';
import { ObservableCollection } from '../../models/observable-collection';
import { Canvas } from '../epma-canvas/epma-canvas.component';
@Component({
    selector: 'Line',
    templateUrl: './line.component.html',
    styleUrls: ['./line.component.css']
  })

  export class Line extends Control implements OnInit {
@Input()
  Children: any;
  StrokeDashArray: ObservableCollection<Double>;
  @Input() X1: Double;
  @Input() Y1: Double; 
  @Input() X2: Double;
  @Input() Y2: Double;
 // Stroke: SolidColorBrush;
 //@Input() Stroke:string; 
 @Input() Stroke: SolidColorBrush; 
 @Input() StrokeThickness: Double;  
 @Input() lType:any;
 @Input() StopAtTimeLine:string;

 
  //cline: import("c:/Users/smani60/source/repos/project/LBM_UKI-STD/Product/IPPMA_P2/Angular/ePMA_LC_Test/src/app/shared/epma-platform/controls/Control").Color;
  @Input() canvas:any;
  constructor(private e?:ElementRef,private renderer?:Renderer2) { super(); }
  ngOnInit(): void {
    this.lineDrawing();
  }
  lineDrawing(){
    //this.arr[index] = 'update'
    let canvas1 = this.canvas;
    let ctx = canvas1.getContext('2d');
     setTimeout(()=>{
      this.drawLine(ctx, this.X1, this.Y1, this.X2, this.Y2, this.Stroke,this.lType, this.StopAtTimeLine);

    },50)
  }

  drawLine(ctx, x1, y1, x2,y2, stroke,lType, StopAtTimeLine) {
  
    ctx.beginPath();
    if(lType == 0){ // this for continuous
      ctx.setLineDash([0,0]);
     }
     else if(lType == 1){ // this for Dotted
      ctx.setLineDash([5,3]);
     }
     else if(lType == 2){ // this for None
      ctx.setLineDash();
     }
    // place the cursor from the point the line should be started 
    ctx.moveTo(x1, y1);
    // draw a line from current cursor position to the provided x,y coordinate
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = stroke.color.color;
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  

drawImg(imgContext,ctx){
    setTimeout(() => {
      ctx.drawImage(imgContext,0,0, 50, 50);
    }, 1000);

  }

  }