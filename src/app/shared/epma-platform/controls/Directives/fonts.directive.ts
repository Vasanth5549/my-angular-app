import { Directive, ElementRef, Input } from '@angular/core';


@Directive({
  selector: '[FontWeight]',
})
export class FontWeightDirective {
  _FontWeight: string | boolean = false;
  get FontWeight() {
    return this._FontWeight
  }
  @Input() 
  set FontWeight(value: boolean | string) {
    this._FontWeight = value;
    this.ngOnInit();
  }
  constructor(private el: ElementRef) { }

  ngOnInit() {
    this.el.nativeElement.style["font-weight"] = this._FontWeight ? "bold" : "";
  }
}


@Directive({
  selector: '[FontSize]',
})
export class FontSizeDirective {
  _FontSize: string | boolean = false;
  get FontSize() {
    return this._FontSize
  }
  @Input() 
  set FontWeight(value: boolean | string) {
    this._FontSize = value;
    this.ngOnInit();
  }
  constructor(private el: ElementRef) { }

  ngOnInit() {
    this.el.nativeElement.style["font-size"] = this._FontSize ? "bold" : "";
  }
}