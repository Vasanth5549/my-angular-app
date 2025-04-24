import { Component, Input, OnInit } from '@angular/core';
import { Control } from '../Control';

@Component({
  selector: 'ScrollViewer',
  templateUrl: './epma-scrollviewer.component.html',
  styleUrls: ['./epma-scrollviewer.component.css'],
})
export class ScrollViewer extends Control {
  @Input() Content: any;
  public override id="sv"+(new Date()).getTime().toString();
  constructor() {
    super();
  }
  ScrollToVerticalOffset(offset: number) { 
    const element = document.getElementById(this.id);//42
    // const bodyRect = element.getBoundingClientRect();//44
    // let res = offset -bodyRect.top//46.2
    element.scrollTop += offset//47
  }
  ScrollToHorizontalOffset(offset: number) { 
    const element = document.getElementById(this.id);
    const bodyRect = element.getBoundingClientRect();//44
    let res = offset -bodyRect.left//46.2
    element.scrollLeft += res
  }

  _ScrollableHeight: number;
  get ScrollableHeight() {
    return this._ScrollableHeight;
  }
  @Input() set ScrollableHeight(value: number) {
    this._ScrollableHeight = value;
  }

  _ScrollableWidth: number;
  get ScrollableWidth() {
    return this._ScrollableWidth;
  }
  @Input() set ScrollableWidth(value: number) {
    this._ScrollableWidth = value;
  }

  _VerticalOffset: number;
  get VerticalOffset() {
    return this._VerticalOffset;
  }
  @Input() set VerticalOffset(value: number) {
    this._VerticalOffset = value;
  }
}
