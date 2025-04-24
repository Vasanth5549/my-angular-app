import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { GridExtension } from './grid-extension';
import { Thickness } from '../FrameworkElement';
import { GridComponent } from '@progress/kendo-angular-grid';

@Directive({
  selector: '[GridProperties]',
})
export class GridProperties {
  public grdExt: GridExtension = new GridExtension();
  constructor(private el: ElementRef) { }

  @HostListener('focus') onFocus() {
    this.grdExt.onFocus();
  }

  @Input() set GridProperties(val: any) {
    if (val instanceof GridExtension) {
      val.GridPropertiesDirective = this;
      this.grdExt = val;
      if (val.GridProperties) this.applyGridProperties(val.GridProperties);
      if (this._horizontalAlignment)
        this.SetHorizontalAlignment(this._horizontalAlignment);
      if (this._verticalAlignment)
        this.SetVerticalAlignment(this._verticalAlignment);
    } else {
      for (var property in val) {
        this[property] = val[property];
      }
    }
  }

  private _horizontalAlignment;
  get HorizontalAlignment() {
    return this._horizontalAlignment;
  }
  @Input()
  set HorizontalAlignment(style: string) {
    if (style) this._horizontalAlignment = style;
    else style = this.grdExt.GridProperties['HorizontalAlignment'];
    if (this.grdExt) this.SetHorizontalAlignment(style);
  }

  private SetHorizontalAlignment(val: string) {
    this.grdExt.alignmentClasses['horizontal-align-' + val.toLowerCase()] =
      true;
  }

  private _verticalAlignment;
  get VerticalAlignment() {
    return this._verticalAlignment;
  }
  @Input()
  set VerticalAlignment(style: string) {
    if (style) this._verticalAlignment = style;
    else style = this.grdExt.GridProperties['VerticalAlignment'];
    if (this.grdExt) this.SetVerticalAlignment(style);
  }
  private SetVerticalAlignment(val: string) {
    this.grdExt.alignmentClasses['vertical-align-' + val.toLowerCase()] = true;
  }

  private _visible = true;
  get Visibility() {
    return this._visible;
  }
  @Input() set Visibility(style: any) {
    if (style) {
      this.CheckVisibility(style);
    } else {
      style = this.grdExt.GridProperties['Visibility'];
      this.CheckVisibility(style);
    }
  }

  private CheckVisibility(value) {
    if (
      value == 'Visible' ||
      value == 0 ||
      value == 'True' ||
      value === true ||
      (typeof value === 'string' && value === 'true') ||
      typeof (value) == 'undefined'
    ) {
      this._visible = true;
      this.setVisible();
    } else {
      this._visible = false;
      this.setVisible();
    }
  }

  private setVisible() {
    this.el.nativeElement.style['display'] = this._visible ? '' : 'none';
  }

  public applyGridProperties(GridProperties: any) {
    if (GridProperties) {
      for (var property in GridProperties) {
        this[property] = GridProperties[property];
      }
    }
  }

  private _Width: number | string;
  get Width() {
    return this._Width;
  }
  // TODO: handling of 'fr'
  @Input() set Width(v: number | string) {
    if (v) this._Width = v;
    if (typeof v == 'string') {
      if (v === 'auto' || v === 'Auto') {
        this.el.nativeElement.style.width = v.toLowerCase();
      }
      else {
        this.el.nativeElement.style.width = v + 'px';
      }
      if (v.includes('fr')) this.el.nativeElement.style.width = v;
    } else {
      // v = this.grdExt.GridProperties['Width'];
      this.el.nativeElement.style.width = v + 'px';
    }
  }

  private _minwidth;
  get MinWidth() {
    return this._minwidth;
  }
  @Input() set MinWidth(v: number) {
    if (v) this._minwidth = v;
    else v = this.grdExt.GridProperties['MinWidth'];
    this.el.nativeElement.style['min-width'] = v + 'px';
  }

  private _maxwidth;
  get MaxWidth() {
    return this._maxwidth;
  }
  @Input() set MaxWidth(v: number | string) {
    if (v) this._maxwidth = v;
    else v = this.grdExt.GridProperties['MaxWidth'];
    this.el.nativeElement.style['max-width'] = v + 'px';
  }

  private _minHeight;
  get MinHeight() {
    return this._minHeight;
  }
  @Input() set MinHeight(v: number | string) {
    if (v) this._maxwidth = v;
    else v = this.grdExt.GridProperties['MinHeight'];
    this.el.nativeElement.style['min-height'] = v + 'px';
  }

  private _maxHeight;
  get MaxHeight() {
    return this._maxHeight;
  }
  @Input() set MaxHeight(v: number | string) {
    if (v) this._maxwidth = v;
    else v = this.grdExt.GridProperties['MaxHeight'];
    this.el.nativeElement.style['max-height'] = v + 'px';
  }

  private isEnabled: boolean | string;
  get IsEnabled(): boolean | string {
    return this.isEnabled;
  }
  @Input() set IsEnabled(v: boolean | string) {
    if (!v) {
      this.grdExt.GridProperties['IsEnabled'] = v;
      this.el.nativeElement.classList.add('DisableGrid');
    }
    else
    {
      this.el.nativeElement.classList.remove('DisableGrid');
    }
  }

  private _margin;
  get Margin() {
    return this._margin;
  }
  @Input() set Margin(v: Thickness | number | string) {
    if (v) this._margin = v;
    else v = this.grdExt.GridProperties['Margin'];

    // TODO: handling of different Thickness Length
    if (this.el.nativeElement != undefined) {
      if (v instanceof Thickness) {
        if (v.Bottom && v.Left && v.Right && v.Top) {
          this.el.nativeElement.style.margin =
            this._margin.Top + 'px' + ' ' +
            this._margin.Right + 'px' + ' ' +
            this._margin.Bottom + 'px' + ' ' +
            this._margin.Left + 'px';
        }
      }
      if (typeof v == 'string') {
        let margins = v.split(',');
        switch (margins.length) {
          case 1:
            this.el.nativeElement.style.margin = margins[0] + 'px';
            break;
          case 2:
            break;
          case 4:
            this.el.nativeElement.style.margin =
              margins[1] + 'px' + ' ' +
              margins[0] + 'px' + ' ' +
              margins[3] + 'px' + ' ' +
              margins[2] + 'px';
            break;
        }
      } else {
        this.el.nativeElement.style.margin = v + 'px';
      }
    }
  }

  get ActualWidth(): number {
    return this.el.nativeElement.clientWidth;
  }

  @Input() set IsReadOnly(value: boolean | string) {
    let booleanValue: boolean = false;
    if (typeof(value) == 'string') {
      if (value.toLowerCase() == 'true') booleanValue = true;
      if (value.toLowerCase() == 'false') booleanValue = false;
    } 
    if (typeof(value) == 'boolean') {
      booleanValue = value;
    }
    if (this.grdExt) this.grdExt.IsReadOnly = booleanValue;
  }

  private _ChildCollectionProp: string;
  public get ChildCollectionProp(): string {
    return this._ChildCollectionProp;
  }
  @Input() set ChildCollectionProp(value: string) {
    this._ChildCollectionProp = value;
  }

  public GridExtension: GridExtension;
  private _ParentRow: any;
  get ParentRow() {
    return this._ParentRow;
  }
  @Input() set ParentRow(value: any) {
    if (value) {
      value.ChildGridExtension.grid = this.el as any as GridComponent;
      value[this.ChildCollectionProp].forEach((item) => {
        item['ParentOID'] = value.PrescriptionItemOID;
      })
      this._ParentRow = value;
    }
  }
}
