import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewContainerRef,
} from '@angular/core';
import { BitmapImage } from '../Control';
import { Control } from '../Control';
import { DataTemplate } from '../epma-datatemplate/epma-datatemplate.component';
import { AppLoadService } from '../../services/appLoad.service';

@Component({
  selector: 'Image',
  templateUrl: './epma-image.component.html',
  styleUrls: ['./epma-image.component.css'],
})
export class Image extends Control implements OnInit, AfterViewInit, OnDestroy {
  @Input() containerParent: any; //added for rowloaded
  @Input() index: number; //added for rowloaded
  _tooltipPosition: 'top' | 'bottom' | 'left' | 'right' = 'bottom';
  @Input() ImgWithoutTooltip : boolean = false;
 
  constructor(parent?: ViewContainerRef) {
    super();
    super.controlType = 'Image';
    try {
      if (parent) {
        const _injector = parent.injector;
        const _parent: DataTemplate = _injector.get<DataTemplate>(DataTemplate);
        _parent.Children.push(this);
        this.dataTemplate = _parent;
      }
    } catch (e) {
      console.log(e);
    }
  }

  ngAfterViewInit(): void {
    if (this.containerParent) {
      this.containerParent.Children[`${this.index}`] = this;
    }
  }

  ngOnInit(): void { }
  ngDoCheck() {
    this.DetectChange();
  }
  public dataTemplate: DataTemplate;
  private _Source: string | BitmapImage;

  get Source(): string | BitmapImage {
    return this._Source;
  }
  _top: number;
  get Top() {
    return this._top;
  }
  @Input() set Top(value: number) {
    this._top = value;
    this.setTop();
  }
  setTop() {
    let top = this._top + 'px';
    this.style['top'] = top;
  }
  get TooltipPosition() {
    return this._tooltipPosition;
  }
  @Input() set TooltipPosition(value: 'top' | 'bottom' | 'left' | 'right') {
    this._tooltipPosition = value;
  }
  private _AltImageTooltip : string = undefined;
  get AltImageTooltip() {
    return this._AltImageTooltip;
  }
  @Input() set AltImageTooltip(value: any) {
    this._AltImageTooltip = value;
  }
  // @Input() IsHitTestVisible: boolean = true; // By default be HitTested by angular

 mouseEnter(e){
if (e) {
  AppLoadService.parentObjMouseEnterFlag.next('false'); 
}
 }
 mouseLeave(e){
    if (e) {
      AppLoadService.parentObjMouseEnterFlag.next('true'); 
    }
  }
  public static IsHitTestVisibleProperty: boolean; // By default be HitTested by angular
  public static SourceProperty = 'Source';
  public static TagProperty = 'Tag';
  public static IsHitProperty = 'IsHitTestVisible';
  public static ToolTipProperty = 'ToolTip';
  @Input() set Source(path: string | BitmapImage) {
    if (path) {
      if (path instanceof BitmapImage) this._Source = path.BitmapImage;
      else this._Source = path;
    }
  }
  // @Input () ToolTip: string;
  @Input() isToolTip: boolean | string;
  @Input() TextData: string;
  @Input()
  override set MaxWidth(mstyle: string) {
    this.style['max-width'] = mstyle + 'px';
  }

  @Input() Stretch: string;

  @Input()
  override set VerticalAlignment(style: string | number) {
    if (
      (typeof style === 'string' && style === 'Left') ||
      (typeof style === 'number' && style === 0)
    ) {
      this.style = {
        ...this.style,
        'justify-content': 'start',
      };
    } else if (
      (typeof style === 'string' && style === 'Center') ||
      (typeof style === 'number' && style === 1)
    ) {
      this.style = {
        ...this.style,
        'justify-content': 'center',
      };
    } else if (
      (typeof style === 'string' && style === 'Right') ||
      (typeof style === 'number' && style === 2)
    ) {
      this.style = {
        ...this.style,
        'justify-content': 'end',
      };
    } else if (
      (typeof style === 'string' && style === 'Middle')
    ) {
      this.style = {
        'vertical-align': 'middle',
      };
    }
  }

  @Input()
  override set HorizontalAlignment(style: string | number) {
    if (
      (typeof style === 'string' && style === 'Left') ||
      (typeof style === 'number' && style === 0)
    ) {
      this.style = {
        ...this.style,
        'align-items': 'start',
      };
    } else if (
      (typeof style === 'string' && style === 'Center') ||
      (typeof style === 'number' && style === 1)
    ) {
      this.style = {
        ...this.style,
        'align-items': 'center',
      };
    } else if (
      (typeof style === 'string' && style === 'Right') ||
      (typeof style === 'number' && style === 2)
    ) {
      this.style = {
        ...this.style,
        'align-items': 'end',
      };
    } else if (
      (typeof style === 'string' && style === 'Stretch') ||
      (typeof style === 'number' && style === 3)
    ) {
      this.style = {
        ...this.style,
        'align-items': 'stretch',
      };
    }
  }

  // CustomWrapToolTip...
  _CustomWrapToolTip: boolean | string = false;
  get CustomWrapToolTip(): boolean | string {
    return this._CustomWrapToolTip;
  }
  @Input() set CustomWrapToolTip(v: boolean | string) {
    let value: boolean | string;
    if (typeof v == 'string') {
      if (v === 'True' || v === 'true') {
        value = true;
      } else if (v == 'False') {
        value = false;
      }
    } else {
      value = v;
    }
    this._CustomWrapToolTip = value;
  }

  ngOnDestroy(): void {
    if (this.dataTemplate && this.dataTemplate.Children && this.dataTemplate.Children.length > 0) {
      for (let i = 0; i < this.dataTemplate.Children.length; i++) {
        if (this.dataTemplate.Children[i].Name == this.Name) {
          this.dataTemplate.Children.splice(i, 1);
          break;
        }
      }
    }
  }
}
