import { Directive, ElementRef, Input } from '@angular/core';
import { Thickness } from '../FrameworkElement';

@Directive({
  selector: '[epmaMargin]'
})
export class epmaMarginDirective {
  @Input() set epmaMargin(value: Thickness) {
    this.el.nativeElement.style.margin = value.Top + 'px' + ' ' + value.Right + 'px' + ' ' + value.Bottom + 'px' + ' ' + value.Left + 'px';
  }
  constructor(public el: ElementRef) { }
  }


