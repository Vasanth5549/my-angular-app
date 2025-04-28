import { Component, Input, OnInit } from '@angular/core';
import { ObservableCollection } from 'epma-platform/models';
import { Observable } from 'rxjs';
import { Control } from '../Control';
// import { Visibility } from '../../../epma-platform/controls-model/Visibility';
import { OnSelectArgs, PSLineItem, PSStyleItem } from '../iPowerSearch';

@Component({
  selector: 'iSOFT:iPowerSearch',
  templateUrl: './epma-ipowersearchcontrol.component.html',
  styleUrls: ['./epma-ipowersearchcontrol.component.css']
})
export class iPowerSearch extends Control implements OnInit {

  @Input() LineItemCollection: ObservableCollection<PSLineItem>;
  @Input() StyleItemCollection: ObservableCollection<PSStyleItem>;
  // @Input() LineItemCollection: PSLineItem[];
  // @Input() StyleItemCollection: PSStyleItem[];

  @Input() clearEvent: Observable<void>;
  // @Input() IsEnabled = false;
  @Input() ShowTooltip: boolean;
  //@Input() Visibility: Visibility;
  // @Input() TabIndex: string;
  _ListSearchStyleObject: ObservableCollection<PSStyleItem>;
  GotFocus: any;
  OnSelect: any;
  OnSecondarySelection: any;

  constructor() {
    super();
  }

  override _visible = true;
  override get Visibility() {
    return this._visible
  }
  override set Visibility(value: any) {
    if (value == "Visible" || value === 0 || value == "True" || value === true || typeof (value) == 'undefined') {
      this._visible = true;
    } else {
      this._visible = false;
    }
  }
  ngOnInit(): void {
    this._ListSearchStyleObject = this.StyleItemCollection;
    // this._ListSearchStyleObject = this.StyleItemCollection;
  }

  ladSearch_OnSelect(e: OnSelectArgs) {
    this.OnSelect({}, e);
  }
  selectedIndex;
  onselcted(index) {
    this.selectedIndex = index;
  }
  isSelected(index){
    if(index == this.selectedIndex){
      return true;
    }else{
      return false;
    }
  }

  //   ladSearch_GotFocus()
  // {
  //     this.GotFocus.instance[this.GotFocus.method]();
  //   }
  public Clear() {
    // alert("Clear from platform")
    // this.clearEvent.subscribe((data) =>
    // this.LineItemCollection.Clear()
    // );
    // this.arr = [];
    this.LineItemCollection.Clear();
    this.selectedIndex = -1;
  }
}



export class delegate {
  instance: any;
  method: string;
}


