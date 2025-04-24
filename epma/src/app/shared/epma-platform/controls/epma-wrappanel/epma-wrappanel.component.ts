import { Component, Input, OnInit } from '@angular/core';
import { Control } from '../Control';

@Component({
  selector: 'WrapPanel',
  templateUrl: './epma-wrappanel.component.html',
  styleUrls: ['./epma-wrappanel.component.css']
})
export class WrapPanel implements OnInit {

  @Input() baseStyle: any;
  //constructor() { }

  ngOnInit(): void {
  }
  @Input() ChildrenElementArray:any[] = [];


  public Children = { Add : (value:any) => {
    this.ChildrenElementArray.push(value);
  },Count : this.ChildrenElementArray.length};

  @Input()
  set VerticalAlignment(style: string) {
    this.baseStyle = {
      ...this.baseStyle,
      "justify-content": style,
    };
  }

  @Input()
  set HorizontalAlignment(style: string) {
    this.baseStyle = {
      ...this.baseStyle,
      "align-items": style,
    };
  }

  @Input()
  set Orientation(style: string | number) {
    if ((typeof style === 'string' && style === "Vertical") || (typeof style === 'number' && style === 0)) {
      this.baseStyle = {
        ...this.baseStyle,
        "display": "flex",
        "flex-direction": "column",
        "flex-wrap": "wrap",
        "height": "calc(100% - 2px)",
        "width": "max-content"
      };
    } else if ((typeof style === 'string' && style === "Horizontal") || (typeof style === 'number' && style === 1)) {
      this.baseStyle = {
        ...this.baseStyle,
        "display": "flex !important",
        "flex-direction": "row"
      };
    }
  }
}