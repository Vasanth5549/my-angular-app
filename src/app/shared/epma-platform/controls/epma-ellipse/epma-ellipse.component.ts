import { Component, Input, } from '@angular/core';
import { Control, SolidColorBrush } from '../Control';

@Component({
  selector: 'Ellipse',
  templateUrl: './epma-ellipse.component.html',
  styleUrls: ['./epma-ellipse.component.css'],
})
export class Ellipse extends Control {
  constructor() {
    super();
  }
  _Fill;
  get Fill() {
    return this._Fill;
  }
  @Input() set Fill(value: string | SolidColorBrush) {
    if (value && typeof value == "string")
      this.style['background'] = value.toLowerCase();
    if (value && value instanceof SolidColorBrush) {
      this.style['background'] = value.brush;
    }
    this._Fill = value;
  }
  _Stroke;
  get Stroke() {
    return this._Stroke;
  }
  @Input() set Stroke(value: string) {
    this.style['border'] = "1px solid " + value.toLowerCase();
    this._Stroke = value;
  }
}