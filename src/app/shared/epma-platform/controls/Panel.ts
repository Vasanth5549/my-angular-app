import { Component, Input } from "@angular/core";
import { Control } from "./Control";


@Component({
    template: ''
})

export class Panel extends Control{

    @Input() ChildrenElementArray:any[] = [];

    public Children = { Add : (value:any) => {
        this.ChildrenElementArray.push(value);
        this.Children[this.ChildrenElementArray.length - 1] = value;
      },Count : this.ChildrenElementArray.length, Clear:()=>{this.ChildrenElementArray = []},
    
      Remove: (name:string) => {
        let itemIdx = this.ChildrenElementArray.findIndex(ele =>  ele.name = name);

        if(itemIdx > -1)
            this.ChildrenElementArray.splice(itemIdx);
      }
    };

}