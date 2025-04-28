import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { Thickness } from '../FrameworkElement';
import { GridLength } from '../GridExt';


@Directive({
  selector: '[CommonDirective]'
})
export class CommonDirective {

  constructor(private el: ElementRef) { }


  // _visible = true;
  // get Visibility() {  
  //     return this._visible
  // }
  // @Input() set Visibility(value: any) {
  //     if (value == "Visible" || value == 0 || value == "True" || value === true || (typeof value === 'string' && value === 'true')) {
  //         this._visible = true;
  //         this.setVisible();
  //     } else {
  //         this._visible = false;
  //         this.setVisible();
  //     }
  // }

  // setVisible() {
  //   this.el.nativeElement.style['display'] = this._visible ? "" : "none";
  // }

  // _Margin = "0,0,0,0";
  // get Margin() {
  //   return this._Margin
  // }

  // @Input() set Margin(value: string | Thickness) {
  //   if (value instanceof Thickness)
  //     this._Margin = value.margin;
  //   else
  //     this._Margin = value;
  //   this.setMargin();
  // }

  // setMargin() {
  //   let myArray = this._Margin.split(",");
  //   let array: any[] = []
  //   myArray.forEach(x => {
  //     array.push(x + 'px')
  //   })
  //   if (array.length == 1) {
  //     this.el.nativeElement.style['margin-top'] = array[0];
  //     this.el.nativeElement.style['margin-right'] = array[0];
  //     this.el.nativeElement.style['margin-bottom'] = array[0];
  //     this.el.nativeElement.style['margin-left'] = array[0];
  //     this.el.nativeElement.style['width'] = `calc(100% - ${parseInt(array[0]) * 2}px)`;
  //   } else if (array.length == 2) {
  //     this.el.nativeElement.style['margin-top'] = array[1];
  //     this.el.nativeElement.style['margin-right'] = array[0];
  //     this.el.nativeElement.style['margin-bottom'] = array[1];
  //     this.el.nativeElement.style['margin-left'] = array[0];
  //     this.el.nativeElement.style['width'] = `calc(100% - ${parseInt(array[0]) * 2}px)`;
  //   } else {
  //     this.el.nativeElement.style['margin-top'] = array[1];
  //     this.el.nativeElement.style['margin-right'] = array[2];
  //     this.el.nativeElement.style['margin-bottom'] = array[3];
  //     this.el.nativeElement.style['margin-left'] = array[0];
  //     this.el.nativeElement.style['width'] = `calc(100% - ${parseInt(array[0]) + parseInt(array[2])}px)`;
  //   }
  // }

  // IsEnabled Directive...
  _isEnabled = true;
  get IsEnabled() {
    return this._isEnabled
  }
  @Input() set IsEnabled(v: boolean | string) {
    let value: boolean;
    if (typeof v === "string") {
      if (v === "True") {
        value = true;
      } else {
        value = false;
      }
    } else {
      value = v;
    }
    this._isEnabled = value;
    if (this._isEnabled) {
      this.setIsEnabledTrue();
    } else {
      this.setIsEnabledFalse();
    }
  }

  setIsEnabledTrue() {
    // this.renderer.setAttribute(this.el.nativeElement, 'enabled', 'true');

  }

  setIsEnabledFalse() {
    // this.el.nativeElement.setAttribute(this.el.nativeElement, 'disabled', 'true');
  }



  // Name Directive...
  _name = '';
  get Name() {
    return this._name;
  }
  @Input() set Name(value: string) {
    this._name = value;
    this.setName(value);
  }

  setName(value) {
    // this.el.nativeElement.setAttribute(this.el.nativeElement, 'name', value);
  }


  // Text Directive...
  _text = '';
  get Text() {
    return this._text;
  }
  @Input() set Text(value: string) {
    this._text = value;
    this.setText(value);
  }

  setText(value) {
    this.el.nativeElement.innerHTML = value;
  }


  // Readonly Directive...

  _IsReadOnly = true;
  get IsReadOnly() {
    return this._IsReadOnly
  }
  @Input() set IsReadOnly(v: boolean | string) {
    let value: boolean;
    if (typeof v === "string") {
      if (v === "True" || v === "true") {
        value = true;
      } else {
        value = false;
      }
    } else {
      value = v;
    }

    this._IsReadOnly = value;
    if (this._isEnabled) {
      this.setIsReadOnly(value);
    } else {
      this.setIsReadOnly(value);
    }
  }

  setIsReadOnly(value) {
    if (value) {
      this.el.nativeElement.setAttribute('readonly', true);
    } else {
      this.el.nativeElement.removeAttribute('readonly', true);
    }
  }


  // Tabindex Directive...
  _tabIndex = '';
  get TabIndex() {
    return this._tabIndex;
  }
  @Input() set TabIndex(value: string) {
    this._tabIndex = value;
    this.setTabIndex(value);
  }

  setTabIndex(value) {
    this.el.nativeElement.setAttribute(this.el.nativeElement, 'tabindex', value);
  }
  private _focus: any;

  @Input() set focus(v: boolean) {
    if (v) this.setfocus();
  }

  get focus() {
    return this._focus;
  }

  setfocus() {
    this.el.nativeElement.focus();
  }

}

@Directive({
  selector: '[CommonGridLayout]'
})

export class CommonGridLayoutDirective {
  constructor(private el: ElementRef) { }

  ngOnInit() {}

  get Background() {
    return this._Background;
  }

  _Background = "0,0,0,0";
  @Input() set Background(value: any) {
    this._Background = value;
    this.setBackGround();
  }

  setBackGround(){
    if (this._Background) {
      // if (typeof this._Background == 'string') {
      //   this.el.nativeElement.style.background = this._Background.toLowerCase();
      // }
    }
  }

  _visible = true;
  get Visibility() {
    return this._visible
  }

  @Input() set Visibility(value: any) {
    if (value == "Visible" || value == 0 || value == "True" || value === true || typeof (value) == 'undefined') {
      this._visible = true;
      this.setVisible();
    } else {
      this._visible = false;
      this.setVisible();
    }
  }

  setVisible() {
    // this.el.nativeElement.style.display = this._visible ? "" : "none";
  }
}

@Directive({
  selector: '[GridLayout]'
})

export class GridLayoutDirective {
  // _height; _width;
  // @Input() set Height(v: number) {
  //   this._height = v;
  //   if (this.el.nativeElement != undefined)
  //     this.el.nativeElement.style.height = v + 'px';
  // }
  // get Height() {
  //   return this._height;
  // }
  // @Input() set Width(v: number) {
  //   this._width = v;
  //   if (this.el.nativeElement != undefined)
  //     this.el.nativeElement.style.width = v + 'px';
  // }
  // get Width() {
  //   return this._width;
  // }

  // constructor(private el: ElementRef) { }
  // ngOnInit() {
  //   if (this.Height != undefined)
  //     this.el.nativeElement.style.height = this.Height;
  //   if (this.Width != undefined)
  //     this.el.nativeElement.style.width = this.Width;
  // }
  constructor(private el: ElementRef) { }

  ngOnInit() {

    // if (this.Height != undefined)

    //   this.el.nativeElement.style.height = this.Height;

    // if (this.Width != undefined)

    //   this.el.nativeElement.style.width = this.Width;

  }


  _Margin = "0,0,0,0";
  get Margin() {
    return this._Margin
  }


  @Input() set Margin(value: string | Thickness) {
    if (value instanceof Thickness)
      this._Margin = value.margin;
    else
      this._Margin = value;
    this.setMargin();
  }

  setMargin() {
    let myArray = this._Margin.split(",");
    let array: any[] = []
    myArray.forEach(x => {
      array.push(x + 'px')

    })

    if (array.length == 1) {
      this.el.nativeElement.style['margin-top'] = array[0];
      this.el.nativeElement.style['margin-right'] = array[0];
      this.el.nativeElement.style['margin-bottom'] = array[0];
      this.el.nativeElement.style['margin-left'] = array[0];
      this.el.nativeElement.style['width'] = `calc(100% - ${parseInt(array[0]) * 2}px)`;
    } else if (array.length == 2) {
      this.el.nativeElement.style['margin-top'] = array[1];
      this.el.nativeElement.style['margin-right'] = array[0];
      this.el.nativeElement.style['margin-bottom'] = array[1];
      this.el.nativeElement.style['margin-left'] = array[0];
      this.el.nativeElement.style['width'] = `calc(100% - ${parseInt(array[0]) * 2}px)`;
    } else {
      this.el.nativeElement.style['margin-top'] = array[1];
      this.el.nativeElement.style['margin-right'] = array[2];
      this.el.nativeElement.style['margin-bottom'] = array[3];
      this.el.nativeElement.style['margin-left'] = array[0];
      this.el.nativeElement.style['width'] = `calc(100% - ${parseInt(array[0]) + parseInt(array[2])}px)`;
    }

  }
  _Background = "0,0,0,0";
  @Input() set Background(value: any) {
    this._Background = value;
  }
  _visible = true;
  get Visibility() {
    return this._visible
  }

  @Input() set Visibility(value: any) {
    if (value == "Visible" || value == 0 || value == "True" || value === true || typeof (value) == 'undefined') {
      this._visible = true;
      this.setVisible();
    } else {
      this._visible = false;
      this.setVisible();
    }
  }

  setVisible() {
    this.el.nativeElement.style.display = this._visible ? "" : "none";
  }
}

@Directive({
  selector: '[VisibilityWidthDirective]'
})
export class VisibilityWidthDirective {
  constructor(private el: ElementRef) { }
  @Input() set VisibilityWidth(value: GridLength | any) {
    if (value.Value == 0) {
      this.el.nativeElement.style.display = 'none';
    } else {
      this.el.nativeElement.style.display = '';
    }
  }
}

@Directive({
  selector: '[containerStyle]'
})
export class containerStyleDirective {
  constructor(private el: ElementRef) {
    this.el.nativeElement.style['display'] = 'grid';
    this.el.nativeElement.style['height'] = '100%';
    this.el.nativeElement.style['alignItems'] = 'center';
  }

}

