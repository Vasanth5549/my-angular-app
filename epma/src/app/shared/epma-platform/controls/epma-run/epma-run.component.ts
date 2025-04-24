import { Component, Input, OnInit } from '@angular/core';
import { Control, Inline } from '../Control';
import { Style } from '../ResourceStyle';

@Component({
  selector: 'Run',
  templateUrl: './epma-run.component.html',
  styleUrls: ['./epma-run.component.css']
})
export class Run extends Control {
  @Input() classObj = {};

  constructor() {
    super();
  }
  
  _Style: Style;
  get Style() {
    return this._Style;
  }

  @Input() set Style(value: Style) {
    this._Style = value;
    this.classObj = {};
    this.classObj[value.Key] = true;
  }
  ngOnInit(): void {
  }

}
