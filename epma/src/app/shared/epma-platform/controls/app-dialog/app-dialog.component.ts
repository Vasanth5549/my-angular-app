import { Component, ComponentRef, ElementRef, Input, OnInit, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { DialogRef } from '@progress/kendo-angular-dialog';
import { FrameworkElement } from 'epma-platform/controls';
import { AppDialogEventargs, AppDialogResult, DialogComponentArgs } from 'epma-platform/models';
import { InjectorInstance } from 'src/app/app.module';
import { SubjectEventEmitterService } from '../../services/subject-eventemitter.service';
import { iAppDialogWindow } from "src/app/shared/epma-platform/controls/iAppDialogWindow";
import { TooltipDirective } from '@progress/kendo-angular-tooltip';

@Component({
  selector: 'app-dialog',
  templateUrl: './app-dialog.component.html',
  styleUrls: ['./app-dialog.component.css']
})
export class AppDialog extends iAppDialogWindow implements OnInit {

  public displayButton: any;
  private DialogRef: DialogRef;
  public Component;
  public extendComponent;
  public image1: any;
  public image1Enabled: any;
  public image1Disabled: any;
  public image2: any;
  public image2Enabled: any;
  public image2Disabled: any;
  public container: ViewContainerRef;
  public extendcontainer: ViewContainerRef;
  public refCallback: Function;
  public IsHelpIconVisible: boolean;
  public diaglogTitle: string;
  public showDialogTitle: boolean;
  public title: string;
  public tooltipHide = false;
  _PopupParent = new FrameworkElement();

  public set DialogResult(value: boolean) {
    if (value != null && value)
      this.DialogRef.close();
  }
  _draggableDialogRef:ElementRef;
  public get draggableDialogRef():ElementRef{
    return this._draggableDialogRef
  }
  public set draggableDialogRef(value:ElementRef){
    if(value != null && value){
    this._draggableDialogRef=value;
    if(this.title && this.title.length > 155){
      value.nativeElement.querySelector('.k-window-title.k-dialog-title').title = this.title;
    }
    value.nativeElement.querySelector('.k-window-title.k-dialog-title').addEventListener("mousedown",(s)=>this.onMouseDown(s))
    }
  }
 
  @ViewChild('child', { read: ViewContainerRef }) set Container(
    c: ViewContainerRef
  ) {
    if (c) {
      this.container = c;
    }
  }

  @ViewChild('extendchild', { read: ViewContainerRef }) set extendContainer(
    ec: ViewContainerRef
  ) {
    if (ec) {
      this.extendcontainer = ec;
    }
  }

  @Input() set PageContent(PageContent: any) {
    setTimeout(() => {
      if (PageContent) {
        this.createChild(PageContent);
      }
    }, 0);
  }

  @Input() set extendPageContent(PageContent: any) {
    setTimeout(() => {
      if (PageContent) {
        this.createExtendChild(PageContent);
      }
    }, 0);
  }

  constructor() { super(); }

  createChild(PageContent: any) {
    type T = typeof PageContent;
    let CompType: Type<T> = (PageContent.__proto__).constructor as Type<T>;
    let container: ViewContainerRef = this.container;
    let Compref: ComponentRef<T> = container.createComponent<T>(CompType);
    for (var property in PageContent) {
      Compref.instance[property] = PageContent[property];
    }
    this.Component = Compref.instance;
    Compref.instance.appDialog = this.appDialog;
    Compref.instance.dupDialogRef = this.dupDialogRef;
    if (this.refCallback instanceof Function) this.refCallback(Compref.instance, null);
  }

  createExtendChild(PageContent: any) {
    type T = typeof PageContent;
    let CompType: Type<T> = (PageContent.__proto__).constructor as Type<T>;
    let container: ViewContainerRef = this.extendcontainer;
    let Compref: ComponentRef<T> = container.createComponent<T>(CompType);
    for (var property in PageContent) {
      Compref.instance[property] = PageContent[property];
    }
    this.extendComponent = Compref.instance;
    Compref.instance.dupDialogRef = this.dupDialogRef;
    if (this.refCallback instanceof Function) this.refCallback(this.Component, Compref.instance);
  }

  ngOnInit(): void {
    this.buttonIcons();
    let subjectEventEmitterService: SubjectEventEmitterService =
      InjectorInstance.get<SubjectEventEmitterService>(SubjectEventEmitterService);
    {
      subjectEventEmitterService.buttonstate.subscribe(
        (data) => {
          if (data.ComponentName && (data.ComponentName == this.Component.constructor.name)) {
            if (data.IsEnabled == true || data.IsEnabled == false) {
              this.displayButton.button1Enable = data.IsEnabled;
              if (data.IsEnabled == true)
                this.displayButton.image1 = this.image1Enabled;
              else
                this.displayButton.image1 = this.image1Disabled;
            }
          }
        }
      );
    }
    document.addEventListener('keydown', (event: KeyboardEvent) => {
      if (event.key === 'F1') {
        this.onHelp();
      }
    });
  }

  public buttonIcons() {
    if (this.displayButton.button1 == 'Ok') {
      this.image1Enabled = './assets/images/MPAD_OkHOT.png';
      this.image1Disabled = "./assets/images/MPAD_OkDIS.gif"
      if (this.displayButton.button1Enable)
        this.image1 = this.image1Enabled;
      else
        this.image1 = this.image1Disabled;

    } else if (this.displayButton.button1 == 'Close') {
      this.image1Enabled = './assets/images/inewcancel.png';
      this.image1Disabled = './assets/images/iNewCancelDis.png';
      if (this.displayButton.button1Enable)
        this.image1 = this.image1Enabled;
      else
        this.image1 = this.image1Disabled;
    }

    if (this.displayButton.button2 == 'Cancel') {
      this.image2Enabled = './assets/images/inewcancel.png';
      this.image2Disabled = './assets/images/inewcanceldis.png';
      if (this.displayButton.button2Enable)
        this.image2 = this.image2Enabled;
      else
        this.image2 = this.image2Disabled;
    }

  }

  mouseDownHandler(event) {
    if (this._PopupParent.KeyDown instanceof Function) {
      this._PopupParent.KeyDown({}, event);
    }
  }
  getButtonState(button: string) {
    if (this.displayButton.button1 == button)
      return this.displayButton.button1Enable;
    else if (this.displayButton.button2 == button)
      return this.displayButton.button2Enable;

  }

  public showResult(displayButton: string) {
    let enablestate = this.getButtonState(displayButton);
    if (!enablestate)
      return;
    let e = new AppDialogEventargs();
    e.AppChildWindow = this.DialogRef.content.instance;
    e.Content = this.DialogRef.content.instance;
    switch (displayButton) {
      case 'Ok': {
        e.Result = AppDialogResult.Ok;
        break;
      }
      case 'Cancel': {
        e.Result = AppDialogResult.Cancel;
        break;
      }
      case 'Close': {
        e.Result = AppDialogResult.Close;
        break;
      }
    }
    this.onDialogClose(e);
  }
  onHelp() {
    let _top: any = window.top;
    if (_top.oScreen != null)
      _top.OnHelp(this.Component.HelpCode);
  }

  @ViewChild(TooltipDirective) public tooltipDir: TooltipDirective;

  toolHide() {
    this.tooltipHide = true;
    this.tooltipDir.hide();
  }

  mouseEnterForTooltip() {
    this.tooltipHide = false;
  }

  private  isDragging = false;
  private  initialX: number = 0;
  private  initialY: number = 0;


   onMouseDown(event) {
      this.isDragging = true;
      this.initialX = event.clientX;
      this.initialY = event.clientY;

    document.addEventListener('mousemove',(s)=>this.onMouseMove(s));
    document.addEventListener('mouseup',(s)=>this.onMouseUp(s));
  }
  onMouseUp( event: any):  any {
    this.isDragging = false;
    document.removeEventListener('mousemove',(s)=> this.onMouseMove(s));
    document.removeEventListener('mouseup',(s)=> this.onMouseUp(s));
  }
   onMouseMove( s: any):any {
    if (this.isDragging) {
      const dx = (s as any).clientX - this.initialX;
      const dy = (s as any).clientY - this.initialY;
      let X = window.screen.width <= 1366 ? 1200 : 1800;
      let Y = window.screen.width <= 1366 ? 450 : 650;
      
      let currentLeft = parseInt(getComputedStyle(this.draggableDialogRef.nativeElement).left, 10) || 0;
      let currentTop = parseInt(getComputedStyle(this.draggableDialogRef.nativeElement).top, 10) || 0;
    
      if((s as any).clientX > 100 && (s as any).clientX < (X/window.devicePixelRatio)){
        this.draggableDialogRef.nativeElement.style.left = currentLeft + dx + 'px';
      }
       
      if((s as any).clientY > 0 && (s as any).clientY < (Y/window.devicePixelRatio)){
        this.draggableDialogRef.nativeElement.style.top = currentTop + dy + 'px';
      } else if ((s as any).clientY <= 0)
        this.draggableDialogRef.nativeElement.style.top = '20px';     
       
      if((s as any).clientX < 100  ){
        this.initialX = 100;
      }
      else if((s as any).clientX > (1800/window.devicePixelRatio)){
        this.initialX = (1800/window.devicePixelRatio);
      }
      else{
        this.initialX = (s as any).clientX;
      }
      if((s as any).clientY < 20  ){
        this.initialY=20;
      }
      else if((s as any).clientY >(650/window.devicePixelRatio)){
        this.initialY=(650/window.devicePixelRatio);
      }
      else{
        this.initialY = (s as any).clientY;
      }
    }
  }

}
