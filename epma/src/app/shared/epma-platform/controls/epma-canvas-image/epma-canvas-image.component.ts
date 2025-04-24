import { Component, HostBinding, Input, OnInit,ElementRef,Renderer2, AfterViewInit,ViewChild } from '@angular/core';
import { BitmapImage, Control, SolidColorBrush, Uri, UriKind } from '../Control';
import { Double } from '../../models/eppma-common-types';
import { ObservableCollection } from '../../models/observable-collection';
import { Canvas } from '../epma-canvas/epma-canvas.component';
import { Thickness } from '../FrameworkElement';
import { iLabel } from '../epma-label/epma-label.component';

@Component({
    selector: 'CanvasImage',
    templateUrl: './empa-canvas-image.component.html',
    styleUrls: ['./empa-canvas-image.component.css']
  })

  
  export class CanvasImage extends Control implements OnInit,AfterViewInit {
    @Input() canvas:any;
    @ViewChild("img") imgRef:ElementRef;
    __Height:string|number;
    __Width:string|number;
    __Source:BitmapImage;
    __Margin:string|Thickness;
    @Input() set Source(s: BitmapImage){
        this.__Source = s;
    }
    get Source():BitmapImage{
        return this.__Source;
    }
    @Input() override set Height(v: string|number){
      this.__Height = v;
    }
      override get Height():string|number{
      return this.__Height;
    }
    @Input() override set Width(v: string|number){
      this.__Width = v;
    }
     override get Width():string|number{
      return this.__Width;
    }
    @Input() override set Margin(v: string|Thickness){
      this.__Margin = v;
    }
      override get Margin():string|Thickness{
      return this.__Margin;
    }
    __ToolTip
    @Input() override set ToolTip(v: string){
      this.__ToolTip = v;
    }
      override get ToolTip():string{
      return this.__ToolTip;
    }
    __canvasimages=[]
    @Input() set canvasimages(v: any[]){
      this.__canvasimages = v;
    }
    get canvasimages(){
      return this.__canvasimages;
    }
    get sSource(){
      return this.Source.toString();
    }
    @Input() Guid="img"+(new Date()).getTime();
    @Input() canvasTooltip;
    
    ngOnInit(): void {
        this.drawImage();
    }
    ngAfterViewInit(): void {
      this.drawImageByTag();
    }
    constructor(private e?:ElementRef,private renderer?:Renderer2) { super(); }
    @Input() canvasRef:Canvas;
    drawImage(){//medthod not used to be removed
        let canvas1 = this.canvas;
        let ctx = canvas1.getContext('2d');
        const tooltip = document.getElementById('tooltip');

    
        let image = new Image();
        let getMargin = this.Margin.toString().split(",")
        image.height = parseInt(this.Height.toString());
        image.width = parseInt(this.Width.toString());
   
        canvas1.addEventListener('mousemove',(e)=> this.handleMouseMove( e,tooltip));
        canvas1.addEventListener('mouseout', ()=>this.hideTooltip(tooltip ));
        image.onload = () => {
            createImageBitmap(image).then((img)=>{
                setTimeout(() => {
                        ctx.drawImage(img,getMargin[0],getMargin[1],this.Width,this.Height);
                        const imageInfo = {
                          image: image,
                          x: getMargin[0],
                          y: getMargin[1],
                          id: (new Date()).getTime(),
                          tooltip:this.ToolTip
                        
                      };
                      
                      this.canvasimages.push(imageInfo);
                   
                        }, 0);
            })
        };
        image.src = this.Source.toString();
    }
    drawImageByTag(){
      let canvas1 = this.canvas;
      let ctx = canvas1.getContext('2d');
      const tooltip = document.getElementById('tooltip');

      let image = new Image();
      image.height = parseInt(this.Height.toString());
      image.width = parseInt(this.Width.toString());
      // let image = {height:0,width:0};
      let getMargin = this.Margin.toString().split(",")
  
      // image.height = parseInt(this.Height.toString());
      // image.width = parseInt(this.Width.toString());
      
 
      canvas1.addEventListener('mousemove',(e)=> this.handleMouseMove( e,tooltip));
      canvas1.addEventListener('mouseout', ()=>this.hideTooltip(tooltip ));
     
      //let img = document.getElementById(this.Guid);
    //  let img = document.getElementsByTagName("img")[8];
   
      
      setTimeout(() => {
        let img = this.imgRef.nativeElement;
        ctx.drawImage(img,getMargin[0],getMargin[1],this.Width,this.Height);
       },50);
              
                      // this.canvasRef.drawLine();
                      // ctx.drawImage(img,getMargin[0],getMargin[1],this.Width,this.Height);
                      const imageInfo = {
                        image: image,
                        x: getMargin[0],
                        y: getMargin[1],
                        id: (new Date()).getTime(),
                        tooltip:this.ToolTip
                      
                    };
                    
                    this.canvasimages.push(imageInfo);
      // image.src = this.Source.toString();
  }
   displayTooltip(x, y, text) {
    // Create a tooltip element
    var bool = document.getElementsByClassName("tooltip");
    if(bool){}
    var tooltip:any = bool && bool.length > 0 ? bool[0] :document.createElement("div");
    tooltip.className = "tooltip";
    tooltip.textContent = text;

    // Set the tooltip position
    tooltip.style.left = x + "px";
    tooltip.style.top = y + "px";

    // Append the tooltip to the document body
    document.body.appendChild(tooltip);
  }
  public handleMouseMove(event,tooltip) {
    const canvasRect = this.canvas.getBoundingClientRect();
    const x = event.clientX - canvasRect.left;
    const y = event.clientY - canvasRect.top;
  
    // Check if the mouse position is inside an image area
    const hoveredImage = this.getHoveredImage(x, y);
    this.canvasRef.ToolTip = "";
    if (hoveredImage) {
        // Position the tooltip next to the image
        // tooltip.style.display = 'block';
        // tooltip.style.left = event.clientX + 'px';
        // tooltip.style.top = (y+20) + 'px';
        //  tooltip.textContent =  hoveredImage.tooltip
        this.canvasRef.ToolTip = hoveredImage.tooltip;
        this.canvasTooltip.show(this.canvas)
    } else {
   
        this.hideTooltip(tooltip);
    }
}
 hideTooltip(tooltip) {
  this.canvasRef.ToolTip = "";
  this.canvasTooltip.hide()
}

 getHoveredImage(x, y) {
    // Iterate over your array of images and check if the mouse position is within an image's boundaries
    let hoveredImage;
   for(let img of this.canvasimages){
      let imageX = parseInt(img.x);
      let imageY = parseInt(img.y);
      let image = img.image

        // Replace this condition with your own logic for checking if the mouse is inside the image area
        if (x >= imageX && x <= imageX + image.width && y >= imageY && y <= imageY + image.height) {
          hoveredImage = img;
        }
    
 
      }
      return hoveredImage;
}
  }


   // Promise.all([
        //     createImageBitmap(image, 0, 0, 32, 32),
        // ]).then((sprites) => {
        //     setTimeout(() => {
        //     ctx.drawImage(sprites[0],0,0, this.Width, this.Height);
        //     }, 100);
        // });
        // };
