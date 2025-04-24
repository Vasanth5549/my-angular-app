import { Component, Input, OnInit } from '@angular/core';
import { Control } from '../Control';


@Component({
    selector: 'ContentPresenter',
  templateUrl: './epma-contentpresenter.component.html',
  styleUrls: ['./epma-contentpresenter.component.css']
  })
  export class ContentPresenter extends Control implements OnInit {
   
    //@Input() Name: string;
    @Input() Content: any;
    public get hasString(){
      return typeof this.Content == 'string' ? true : false;
    }
    

    ngOnInit(): void {
      if(this.Content && this.Content.iLabelInLineElements && this.Content.iLabelInLineElements.length > 0){
        this.Content.iLabelInLineElements.forEach(element => {
          if(this.Content.IsStrike){
            element.InLine.style['text-decoration'] = 'line-through';
          }
        });
    }
    }

    SetValue(prop: string, value: any) {
      this[prop] = value;
    }
    override SetBinding(prop: any, value: any) {
      this[prop] = value;
    }

  }