import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Control } from '../Control';
import { iButton } from '../epma-button/epma-button.component';

@Component({
  selector: 'iHyperlinkButton',
  templateUrl: './epma-iHyperlinkButton.component.html',
  styleUrls: ['./epma-iHyperlinkButton.component.css']
})
export class iHyperlinkButton extends iButton implements OnInit {
  constructor() { super() }
  
  _ccontent:string
  override get Content() {
    return this._ccontent;
  }
  @Input() override  set Content(value: any) {
    this._ccontent = value;

  } 

  _TargetName: string ="_blank";;
  get TargetName() {
    return this._TargetName;
  }
  @Input() set TargetName(value: string) {
    this._TargetName = value;
  }
}
