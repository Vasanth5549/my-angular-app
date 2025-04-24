import { Component, OnInit } from '@angular/core';
import { StackPanel } from '../epma-stackpanel/epma-stackpanel.component';
import { TextBlock } from '../epma-textblock/epma-textblock.component';
import { Image } from '../epma-image/epma-image.component';

@Component({
  selector: 'InlineUIContainer',
  templateUrl: './epma-inline-uicontainer.component.html',
  styleUrls: ['./epma-inline-uicontainer.component.css']
})
export class InlineUIContainer implements OnInit {
  
  constructor() { }

  ngOnInit(): void {
  }
   //_child: TextBlock | Image;
   _child:TextBlock | Image | StackPanel;
  
   public get Child() {
     return this._child;
   }
   // public set Child(value: TextBlock | Image) {
   //   this._child = value;
   // }
   public set Child(value: TextBlock | Image |StackPanel) {
     this._child = value;
   }

}
