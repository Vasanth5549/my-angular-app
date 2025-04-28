import { Directive, ElementRef, Input } from '@angular/core';
import { GridExtension } from './grid-extension';

@Directive({
  selector: '[GridColumnProperties]',
})
export class GridColumnProperties {
  constructor(private el: ElementRef) {}

  public grdExt: GridExtension;

  public applyGridColumnProperties(GridColumnProperties: any) {
    if (GridColumnProperties) {
      for (var property in GridColumnProperties) {
        this[property] = GridColumnProperties[property];
      }
    }
  }

  @Input() set GridColumnProperties(val: any) {
    if (val instanceof GridExtension) {
      val.GridColumnProperties = this;
      this.grdExt = val;
      if (val.GridColumnProperties)
        this.applyGridColumnProperties(val.GridColumnProperties);
      if (this._horizontalContentAlignment)
        this.SetHorizontalContentAlignment(this._horizontalContentAlignment);
      if (this._verticalContentAlignment)
        this.SetVerticalContentAlignment(this._verticalContentAlignment);
    } else {
      for (var property in val) {
        this[property] = val[property];
      }
    }
  }

  private _horizontalContentAlignment;
  get HorizontalContentAlignment() {
    return this._horizontalContentAlignment;
  }

  @Input()
  set HorizontalContentAlignment(style: string) {
    this._horizontalContentAlignment = style;
    if (style) this._horizontalContentAlignment = style;
    else {
      style = this.grdExt.GridColumnProperties['HorizontalContentAlignment'];
    }
    if (this.grdExt) {
      this.SetHorizontalContentAlignment(style);
    }
  }

  SetHorizontalContentAlignment(val) {
    this.grdExt.columnAlignmentClasses[
      'horizontal-content-align-' + val.toLowerCase()
    ] = true;
  }
  private _verticalContentAlignment;
  get VerticalContentAlignment() {
    return this._verticalContentAlignment;
  }
  @Input()
  set VerticalContentAlignment(style: string) {
    this._verticalContentAlignment = style;
    if (style) this._verticalContentAlignment = style;
    else {
      style = this.grdExt.GridColumnProperties['VerticalContentAlignment'];
    }
    if (this.grdExt) this.SetVerticalContentAlignment(style);
  }
  SetVerticalContentAlignment(val) {
    this.grdExt.columnAlignmentClasses[
      'vertical-content-align-' + val.toLowerCase()
    ] = true;
  }

  @Input()
  set TextWrapping(style: string) {
    if (style) this.textWrapping(style);
    else {
      style = this.grdExt.GridColumnProperties['TextWrapping'];
      this.textWrapping(style);
    }
  }

  textWrapping(style) {
    if (style === 'NoWrap') {
      this.el.nativeElement.style['white-space'] = 'nowrap';
    } else if (style === 'Wrap') {
      this.el.nativeElement.style['white-space'] = 'normal';
    }
  }
}
