import {
  AfterViewInit,
  Component,
  ElementRef,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
  ViewContainerRef,
} from '@angular/core';
import { Control } from '../Control';
import { TextBlock } from '../epma-textblock/epma-textblock.component';
import { Panel } from '../Panel';
import { HorizontalAlignment, VerticalAlignment } from '../FrameworkElement';
import { DataTemplate } from '../epma-datatemplate/epma-datatemplate.component';
import { Grid } from '../epma-grid/epma-grid.component';

@Component({
  selector: 'StackPanel',
  templateUrl: './epma-stackpanel.component.html',
  styleUrls: ['./epma-stackpanel.component.css'],
})
export class StackPanel extends Panel implements OnInit, AfterViewInit, OnDestroy {
  //added  for row loaded
  @Input() containerParent: any;
  @Input() heightchanged:Function;
  public grid:Grid;
  Guid=new Date().getTime();
  public dataTemplate: DataTemplate;
  constructor(parent?: ViewContainerRef,private el?: ElementRef) {
    super();
    try {
      if (parent) {
        const _injector = parent.injector;
        const _parent: Grid = _injector.get<Grid>(Grid);
        if (_parent != undefined || _parent != null) {
          _parent.ChildrenRef.push(this);
         // _parent.originalRef.Childrenref.push(this);
        }
      }
    } catch (e) {
    }
  }
  //added for rowloaded event
  ngAfterViewInit(): void {
    this.containerParent = this;
    if(this.heightchanged instanceof Function){
      this.heightchanged(this.el)
    }
  }

  ngOnInit(): void {}

  ngDoCheck() {
    this.DetectChange();
  }

  public static BackgroundProperty = "Background";

  //Stub as been created for the bug 35815 need fix grid column and row
  // SetValue(controlProperty, binding: number) {
  //   if (
  //     controlProperty === 'ColumnDefinitions' ||
  //     controlProperty === 'RowDefinitions'
  //   ) {
  //     this[controlProperty] = binding;
  //   }
  // }
  public SetValue(Property,value : number) {
    if(Property == 'ColumnDefinitions'){
      this.col=value;
    }
    if(Property == 'RowumnDefinitions'){
      this.row=value;
    }    
  }  
  
  FindChildByType<G = unknown>() {
    let retvalue: any = null;
    this.ChildrenElementArray.forEach((val) => {
      if (val instanceof TextBlock) {
        retvalue = val;
      }
    });
    return retvalue;
  }
  MouseLeftButtonUp_Func_Test = (sender, e) => {
    alert('MouseLeftButtonUp triggered');
  };

  @Input()
  override set VerticalAlignment(style: string | number | VerticalAlignment) {
    if (
      (typeof style == 'string' && style == 'Top') ||
      (typeof style == 'number' && style == 0)
    ) {
      this.style['display'] = 'flex';
      this.style['align-items'] = 'start';
      // this.style = {
      //   "display": "flex",
      //   "align-items": "start"
      // };
    } else if (
      (typeof style == 'string' && style == 'Center') ||
      (typeof style == 'number' && style == 1)
    ) {
      this.style['display'] = 'flex';
      this.style['align-items'] = 'center';
      // this.style = {
      //   "display": "flex",
      //   "align-items": "center"
      // };
    } else if (
      (typeof style == 'string' && style == 'Bottom') ||
      (typeof style == 'number' && style == 2)
    ) {
      this.style['display'] = 'flex';
      this.style['align-items'] = 'end';
      // this.style = {
      //   "display": "flex",
      //   "align-items": "end"
      // };
    } else if (
      (typeof style == 'string' && style == 'Stretch') ||
      (typeof style == 'number' && style == 3)
    ) {
      this.style['display'] = 'flex';
      this.style['align-items'] = 'stretch';
      // this.style = {
      //   "display": "flex",
      //   "align-items": "stretch"
      // };
    }
  }
  
  @Input() isExtendedWidth = false;
 
  @Input()
  override set HorizontalAlignment(
    style: string | number | HorizontalAlignment
  ) {
    if (
      (typeof style === 'string' && style === 'Left') ||
      (typeof style === 'number' && style === 0)
    ) {
      this.style = {
        ...this.style,
        'align-items': 'start',
        'justify-content': 'start',
      };
    } else if (
      (typeof style === 'string' && style === 'Center') ||
      (typeof style === 'number' && style === 1)
    ) {
      this.style = {
        ...this.style,
        'align-items': 'center',
        'justify-content': 'center',
      };
    } else if (
      (typeof style === 'string' && style === 'Right') ||
      (typeof style === 'number' && style === 2)
    ) {
      this.style = {
        ...this.style,
        'align-items': 'end',
        'justify-content': 'end',
      };
    } else if (
      (typeof style === 'string' && style === 'RightMiddle') ||
      (typeof style === 'number' && style === 2)
    ) {
      this.style = {
        ...this.style,
        // 'align-items': 'end',
        'justify-content': 'end',
      };
    }
     else if (
      (typeof style === 'string' && style === 'Stretch') ||
      (typeof style === 'number' && style === 3)
    ) {
      this.style = {
        ...this.style,
        'align-items': 'stretch',
        'justify-content': 'space-evenly',
      };
    }
  }

  @Input()
  set Orientation(style: string | number) {
    if (
      (typeof style === 'string' && style === 'Vertical') ||
      (typeof style === 'number' && style === 0)
    ) {
      this.style = {
        ...this.style,
        display: 'flex',
        'flex-direction': 'column',
      };
    } else {
      this.style = {
        ...this.style,
        display: 'flex',
        'flex-direction': 'row',
      };
    }
  }
  ngOnDestroy() {
    if (this.grid?.ChildrenRef.length > 0) {
      this.grid.ChildrenRef.forEach((element, index, obj) => {
        if (element.Guid == this.Guid) {
          obj.splice(index, 1);
          return;
        }
      });
    }
 }
}
