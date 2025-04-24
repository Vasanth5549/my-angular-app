import { Directive, Input } from '@angular/core';
import { ScrollViewer } from '../epma-scrollviewer/epma-scrollviewer.component';

@Directive({
  selector: '[ScrollBarViewer]',
})
export class ScrollBarViewer {
  constructor(private scroll: ScrollViewer) {}
  _scrollBar: any;
  @Input() set ScrollBarViewer(value: any) {
    this._scrollBar = value;
    if (this._scrollBar.vertical)
      this.scroll.VerticalScrollBarVisibility = this._scrollBar.vertical;
    if (this._scrollBar.horizontal)
      this.scroll.HorizontalScrollBarVisibility = this._scrollBar.horizontal;
  }
}
