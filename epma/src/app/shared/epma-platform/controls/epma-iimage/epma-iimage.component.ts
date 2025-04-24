import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { BitmapImage, Control } from '../Control';
import { Image } from   '../epma-image/epma-image.component'
@Component({
  selector: 'iImage',
  templateUrl: './epma-iimage.component.html',
  styleUrls: ['./epma-iimage.component.css']
})
export class iImage extends Image implements OnInit {
  _isbasicImgTooltip: string | boolean = false;
  get isbasicImgTooltip() {
    return this._isbasicImgTooltip;
  }
  @Input() set isbasicImgTooltip(v: string | boolean) {
    let value: boolean;
    if (typeof v == 'string') {
      if (v == 'True') {
        value = true;
      } else{
        value = false;
      }
    }
    this._isbasicImgTooltip = value;
  }

  constructor() { super(); }
}
