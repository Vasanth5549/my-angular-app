import { Component, ElementRef, Input, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterEvent } from '@angular/router';
import { OnSelectArgs, PSLineItem, PSStyleItem } from '../shared/epma-platform/controls/iPowerSearch';
import { ObservableCollection } from 'epma-platform/models';

@Component({
  selector: 'app-power-search',
  templateUrl: './power-search.component.html',
  styleUrls: ['./power-search.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PowerSearchComponent implements OnInit {
  @Input() LineItemCollection: ObservableCollection<PSLineItem>;
  @Input() StyleItemCollection: ObservableCollection<PSStyleItem>;
  @Input() isEnabled = false;
  _ListSearchStyleObject: PSStyleItem[];

  GotFocus : delegate;

  OnSelect:delegate;

  constructor() { 
    
  }

  ngOnInit(): void {
   this._ListSearchStyleObject =  this.StyleItemCollection?.array;


  }
   ladSearch_OnSelect(e: OnSelectArgs | any) {
    // const event: CustomEvent = new CustomEvent('ladSearch_OnSelect', {
    //   bubbles: true,
    //   detail: { data: e}
    // });
    // this.elementRef.nativeElement.dispatchEvent(event);
    this.OnSelect.instance[this.OnSelect.method]({}, e);
  }

  GF()
  {
    this.GotFocus.instance[this.GotFocus.method]();
  }
}


export class delegate {
  instance: any;
  method: string;
}
