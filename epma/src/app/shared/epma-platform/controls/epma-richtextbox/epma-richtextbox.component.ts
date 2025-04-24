import { Component, Input, OnInit } from '@angular/core';
import { Control } from '../Control';
import { TextBlock } from '../epma-textblock/epma-textblock.component';
import { Image } from '../epma-image/epma-image.component';
import { Run } from '../epma-run/epma-run.component';
import { InlineUIContainer } from '../epma-inline-uicontainer/epma-inline-uicontainer.component';

@Component({
  selector: 'RichTextBox',
  templateUrl: './epma-richtextbox.component.html',
  styleUrls: ['./epma-richtextbox.component.css']
})
export class RichTextBox extends Control implements OnInit {

  public hasString(Content){
    return typeof Content == 'string' ? true : false;
  }

  @Input() paraArr : Paragraph[] = [];
  Selection = {Insert:(para:Paragraph) => {
    this.paraArr.push(para);
  }};

  public _BorderBrush:any;
  public get BorderBrush(){
    return this._BorderBrush;
  }

  @Input() public set BorderBrush(val){
    this._BorderBrush = val;
    this.style['border-color'] = val;
  }
@Input() IsReadOnly:any;
  constructor() { super(); }

  ngOnInit(): void {
  }

}

export class Paragraph {
  public Inlines = new InlineCollection();
}

export class InlineCollection{
  public _InlinesArr = []
  public get InlinesArr(){
      return this._InlinesArr;
  }
  public Add(value: string |  InlineUIContainer| Run): void{
     this._InlinesArr.push(value);
  };
}

// export class InlineUIContainer{
//   _child: TextBlock | Image;
//   public get Child() {
//     return this._child;
//   }
//   public set Child(value: TextBlock | Image) {
//     this._child = value;
//   }
// }
