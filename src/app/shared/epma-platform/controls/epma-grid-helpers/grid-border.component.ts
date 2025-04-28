import { Component, Input, OnInit } from '@angular/core';
import { GridLayoutItemComponent } from '@progress/kendo-angular-layout';

@Component({
  selector: 'GridBorder',
  template: '<ng-content></ng-content>',
})
export class GridBorderComponent extends GridLayoutItemComponent {
 
  // @HostBinding('style') baseStyle: any = '';
  @Input() columnName: string;
  
  baseStyle: any = '';

  @Input() RectOverdueColor: string;
  @Input() bAdditionalview: boolean;

  // Style...
  @Input()
  set Style(style: string | object) {
    let mappedStyles = style as string;
    if (typeof style === 'object') {
      mappedStyles = Object.entries(style).reduce(
        (styleString, [propName, propValue]) => {
          propName = propName.replace(
            /([A-Z])/g,
            (matches) => `-${matches[0].toLowerCase()}`
          );
          return `${styleString}${propName}:${propValue};`;
        },
        ''
      );
      this.baseStyle = mappedStyles;
    } else if (typeof style === 'string') {
      this.baseStyle = this.baseStyle + `border: 1px solid ${style};`;
    }
  }

  private _Background;
  // Background...
  @Input()
  set Background(style: string | object) {
    let mappedStyles = style as string;
    if (typeof style === 'object') {
      mappedStyles = Object.entries(style).reduce(
        (styleString, [propName, propValue]) => {
          propName = propName.replace(
            /([A-Z])/g,
            (matches) => `-${matches[0].toLowerCase()}`
          );
          return `${styleString}${propName}:${propValue};`;
        },
        ''
      );
      this.baseStyle = mappedStyles;
    } else if (typeof style === 'string') {
      this.baseStyle = this.baseStyle + `height: calc(100% - 2px);
      width:calc(100% - 2px);
      margin:1px;
      background:${style};`;
      this._Background = style;
    }
  }

  get Background(){
    return this._Background;
  }

 
  private _BorderBrush;
  // BorderBrush...
  @Input()
  set BorderBrush(style: string | object) {
    let mappedStyles = style as string;
    if (typeof style === 'object') {
      mappedStyles = Object.entries(style).reduce(
        (styleString, [propName, propValue]) => {
          propName = propName.replace(
            /([A-Z])/g,
            (matches) => `-${matches[0].toLowerCase()}`
          );
          return `${styleString}${propName}:${propValue};`;
        },
        ''
      );
      this.baseStyle = mappedStyles;
    } else if (typeof style === 'string') {
      this.baseStyle = this.baseStyle + `border-color:${style};
      border-style:solid;`
      this._BorderBrush = style;
    }
  }

  get BorderBrush(){
    return this._BorderBrush;
  }

  private _BorderThickness;
  // BorderThickness...
  @Input()
  set BorderThickness(style: string | object) {
    let mappedStyles = style as string;
    if (typeof style === 'object') {
      mappedStyles = Object.entries(style).reduce(
        (styleString, [propName, propValue]) => {
          propName = propName.replace(
            /([A-Z])/g,
            (matches) => `-${matches[0].toLowerCase()}`
          );
          return `${styleString}${propName}:${propValue};`;
        },
        ''
      );
      this.baseStyle = mappedStyles;
    } else if (typeof style === 'string') {
      this.baseStyle = this.baseStyle + `border-style:solid;
      border-width:${style}px;`
      this._BorderThickness = style;
    }
  }

  get BorderThickness(){
    return this._BorderThickness;
  }

  private _Margin;
  // Margin...
  @Input()
  set Margin(style: string | object) {
    let mappedStyles = style as string;
    if (typeof style === 'object') {
      mappedStyles = Object.entries(style).reduce(
        (styleString, [propName, propValue]) => {
          propName = propName.replace(
            /([A-Z])/g,
            (matches) => `-${matches[0].toLowerCase()}`
          );
          return `${styleString}${propName}:${propValue};`;
        },
        ''
      );
      this.baseStyle = mappedStyles;
    } else if (typeof style === 'string') {
      let margin_in_pixels = style.split(',')
        .map((val) => val + 'px ')
        .join('');
      this.baseStyle = this.baseStyle + `margin:${margin_in_pixels};`
      this._Margin = style;
    }
  }

  get Margin(){
    return this._Margin;
  }

  private _Padding;
  // Padding...
  @Input()
  set Padding(style: string | object) {
    let mappedStyles = style as string;
    if (typeof style === 'object') {
      mappedStyles = Object.entries(style).reduce(
        (styleString, [propName, propValue]) => {
          propName = propName.replace(
            /([A-Z])/g,
            (matches) => `-${matches[0].toLowerCase()}`
          );
          return `${styleString}${propName}:${propValue};`;
        },
        ''
      );
      this.baseStyle = mappedStyles;
    } else if (typeof style === 'string') {
      let padding_in_pixels = style.split(',')
        .map((val) => val + 'px ')
        .join('');
      this.baseStyle = this.baseStyle + `padding:${padding_in_pixels};`;
      this._Padding = style;
    }
  }

  get Padding(){
    return this._Padding;
  }

  private _CornerRadius;
  // CornerRadius...
  @Input()
  set CornerRadius(style: string | object) {
    let mappedStyles = style as string;
    if (typeof style === 'object') {
      mappedStyles = Object.entries(style).reduce(
        (styleString, [propName, propValue]) => {
          propName = propName.replace(
            /([A-Z])/g,
            (matches) => `-${matches[0].toLowerCase()}`
          );
          return `${styleString}${propName}:${propValue};`;
        },
        ''
      );
      this.baseStyle = mappedStyles;
    } else if (typeof style === 'string') {
      this.baseStyle = this.baseStyle + `border-radius:${style}px;`;
      this._CornerRadius = style;
    }
  }

  get CornerRadius(){
    return this._CornerRadius;
  }


  private _Opacity;
  // Opacity...
  @Input()
  set Opacity(style: string | object) {
    let mappedStyles = style as string;
    if (typeof style === 'object') {
      mappedStyles = Object.entries(style).reduce(
        (styleString, [propName, propValue]) => {
          propName = propName.replace(
            /([A-Z])/g,
            (matches) => `-${matches[0].toLowerCase()}`
          );
          return `${styleString}${propName}:${propValue};`;
        },
        ''
      );
      this.baseStyle = mappedStyles;
    } else if (typeof style === 'string') {
      this.baseStyle = this.baseStyle + `opacity:${style};`;
      this._Opacity = style;
    }
  }

  get Opacity(){
    return this._Opacity;
  }

  private _Height;
  // Height...
  @Input()
  set Height(style: string | object) {
    let mappedStyles = style as string;
    if (typeof style === 'object') {
      mappedStyles = Object.entries(style).reduce(
        (styleString, [propName, propValue]) => {
          propName = propName.replace(
            /([A-Z])/g,
            (matches) => `-${matches[0].toLowerCase()}`
          );
          return `${styleString}${propName}:${propValue};`;
        },
        ''
      );
      this.baseStyle = mappedStyles;
    } else if (typeof style === 'string') {
      this.baseStyle = this.baseStyle + `height:${style}px;`;
      this._Height = style;
    }
  }

  get Height(){
    return this._Height;
  }

  private _Width;
  // Width...
  @Input()
  set Width(style: string | object) {
    let mappedStyles = style as string;
    if (typeof style === 'object') {
      mappedStyles = Object.entries(style).reduce(
        (styleString, [propName, propValue]) => {
          propName = propName.replace(
            /([A-Z])/g,
            (matches) => `-${matches[0].toLowerCase()}`
          );
          return `${styleString}${propName}:${propValue};`;
        },
        ''
      );
      this.baseStyle = mappedStyles;
    } else if (typeof style === 'string') {
      this.baseStyle = this.baseStyle + `width:${style}px;`;
      this._Width = style;
    }
  }

  get Width(){
    return this._Width;
  }

  private _MinWidth;
  // MinWidth...
  @Input()
  set MinWidth(style: string | object) {
    let mappedStyles = style as string;
    if (typeof style === 'object') {
      mappedStyles = Object.entries(style).reduce(
        (styleString, [propName, propValue]) => {
          propName = propName.replace(
            /([A-Z])/g,
            (matches) => `-${matches[0].toLowerCase()}`
          );
          return `${styleString}${propName}:${propValue};`;
        },
        ''
      );
      this.baseStyle = mappedStyles;
    } else if (typeof style === 'string') {
      this.baseStyle = this.baseStyle + `min-width:${style}px;`;
      this._MinWidth = style;
    }
  }

  get MinWidth(){
    return this._MinWidth;
  }

  private _HorizontalAlignment;
  // HorizontalAlignment...
  @Input()
  set HorizontalAlignment(style: string | object) {
    let mappedStyles = style as string;
    if (typeof style === 'object') {
      mappedStyles = Object.entries(style).reduce(
        (styleString, [propName, propValue]) => {
          propName = propName.replace(
            /([A-Z])/g,
            (matches) => `-${matches[0].toLowerCase()}`
          );
          return `${styleString}${propName}:${propValue};`;
        },
        ''
      );
      this.baseStyle = mappedStyles;
    } else if (typeof style === 'string') {
      this.baseStyle = this.baseStyle + `justify-self:${style};`;
      this._HorizontalAlignment = style;
    }
  }

  get HorizontalAlignment(){
    return this._HorizontalAlignment;
  }

  private _VerticalAlignment;
  // VerticalAlignment...
  @Input()
  set VerticalAlignment(style: string | object) {
    let mappedStyles = style as string;
    if (typeof style === 'object') {
      mappedStyles = Object.entries(style).reduce(
        (styleString, [propName, propValue]) => {
          propName = propName.replace(
            /([A-Z])/g,
            (matches) => `-${matches[0].toLowerCase()}`
          );
          return `${styleString}${propName}:${propValue};`;
        },
        ''
      );
      this.baseStyle = mappedStyles;
    } else if (typeof style === 'string') {
      this.baseStyle = this.baseStyle + `align-self:${style};`;
      this._VerticalAlignment = style;
    }
  }

  get VerticalAlignment(){
    return this._VerticalAlignment;
  }

}
