import { Component, ContentChild, EventEmitter, Input, OnInit, TemplateRef } from '@angular/core';
import { List } from '../../models/list';
import { Control } from '../Control';
import { Visibility } from '../../controls-model/Visibility';
import { StackPanel } from '../epma-stackpanel/epma-stackpanel.component';
import { TextBlock } from '../epma-textblock/epma-textblock.component';
import { ObjectHelper } from '../../services/objecthelper.service';
import { Orientation } from '../../controls-model/Orientation';


@Component({
  selector: 'iTabItem',
  templateUrl: './epma-tabitem.component.html',
  styleUrls: ['./epma-tabitem.component.css']
})
export class iTabItem extends Control implements OnInit {
  public HeaderTxt: string;
  public static IsEnabledProperty = "IsEnabled";
  public static TextProperty = "Text";
  public static VisibilityProperty = "Visibility";
  @Input() SelectedItem: Function | string;
  @Input() SelectionChanged: Function | string;
  //@Input() ItemsSource: Function | string;
  @Input() public Key: string;
  // @Input() public ToolTip: string;
  @Input() public Content: any;
  @Input() public isHidden: boolean;
  tabs: any[] = [];
  public _Header: string | any;
  public Replace : boolean = false;
  get Header() {
    return this._Header;
  };
  @Input() set Header(value: string | any) {
    this._Header = value;
    if (typeof value == 'string') {
      this.HeaderTxt = value;
    }
  }
  Loaded = new EventEmitter();


  imageStyle = {};
  _IsSelected = true;
  get IsSelected() {
    return this._IsSelected;
  }
  @Input() set IsSelected(v: string | boolean) {
    let value: boolean;
    if (typeof v === "string") {
      if (v.toLowerCase() === "true") {
        value = true;
      } else {
        value = false;
      }
    } else {
      value = v;
    }
    this._IsSelected = value;
  }

  override _visibleReturn: string | Visibility | boolean;
  override get Visibility() {
    return this._visibleReturn; // Return the actuval values which are coming as input
    //return this._visible;
  }

  @Input() override set Visibility(value: string | Visibility | boolean) {
    this._visibleReturn = value;
    // this.isHidden = true;
    if (typeof value == 'boolean') {
      value = value.toString().toLowerCase();
    }
    if (value == undefined || value == 'null' || value == null) {
      this._visible = true;
      this.isHidden = false;
    }
    else if (value === 0) {
      this._visible = true;
      this.isHidden = false;

    } else if (value == Visibility.Collapsed || value as any as number == 1 || value == "False" || (typeof value === 'string' && value === 'false')) {
      this._visible = false;
      this.isHidden = true;
    }
    else if (value as any as Visibility == Visibility.Visible || value == "True" || value as any as boolean === true || (typeof value === 'string' && value === 'true')) {
      this._visible = true;
      this.isHidden = false;
    } else {
      this._visible = true;
      this.isHidden = false;
    }
  }

  // HeaderImgToolTip
  _HeaderImgToolTip: string;
  get HeaderImgToolTip() {
    return this._HeaderImgToolTip;
  };
  @Input() set HeaderImgToolTip(value: string) {
    this._HeaderImgToolTip = value;
  };


  // HeaderImageList
  _HeaderImageList: List<HeaderImageListItem>;

  //  _HeaderImageList: HeaderImageListItem;
  get HeaderImageList() {
    return this._HeaderImageList;
  };
  @Input() set HeaderImageList(value: List<HeaderImageListItem>) {
    this._HeaderImageList = value;
  };

  // HeaderImage
  _HeaderImage: string;
  get HeaderImage() {
    return this._HeaderImage;
  };
  @Input() set HeaderImage(value: string) {
    this._HeaderImage = value;
  };

  //  HeaderImageAlign
  _HeaderImageAlign: HeaderImageAlignment;
  get HeaderImageAlign() {
    return this._HeaderImageAlign;
  };

  imgStyle = {};
  @Input() set HeaderImageAlign(value: HeaderImageAlignment) {
    this._HeaderImageAlign = value;
    this.ImageAlign()
  };
  ImageAlign() {
    if (this._HeaderImageAlign) {
      this.imgStyle['float'] = "left"
    } else {
      this.imgStyle['float'] = "right"
    }
  }

  @ContentChild('iTabContent')
  public contentTemplate: TemplateRef<any>;

  public ref: any;
  contentTemplateAtRunTime: any;
  constructor() { super() }

  ngOnInit(): void {
  }

  ngDoCheck() {
    this.DetectChange();
  }

  // SetBinding(controlProperty, binding: Binding) {    
  //   if (controlProperty === 'IsEnabled') {
  //     if (binding.Source) {
  //       this.IsEnabledObject.SetValue(binding.Source);
  //     } else {
  //       this.IsEnabledObject.Property = binding.Path;
  //       this.IsEnabledObject.Object = binding.PathObject;
  //       this.IsEnabledObject.SetValue(this.getBindingPath(binding.PathObject, binding.Path));
  //     }
  //   }
  // }
  UpdateHeader(): void {
    /*if(this.HeaderImageList != null)
    {
    this.Header = null;
    var imgHeaderImage: StackPanel = new StackPanel();
    if (imgHeaderImage != null) {
        imgHeaderImage.Orientation = Orientation.Horizontal;
        this.HeaderImageList.forEach( (ImageList)=> {
            if (ImageList.HeaderImageAlignment == HeaderImageAlignment.Left) {
              if(!String.IsNullOrEmpty(ImageList.HeaderImage)){
                var imgPath: Image = ObjectHelper.CreateObject(new Image(), { Source: new BitmapImage(new Uri(ImageList.HeaderImage, UriKind.Relative)) });
                if (!String.IsNullOrEmpty(ImageList.HeaderImgToolTip))
                    ToolTipService.SetToolTip(imgPath, ImageList.HeaderImgToolTip);
                imgHeaderImage.Children.Add(imgPath);
              }
            }
            else {
                if (imgHeaderImage.Children.Count == 0) {
                    var txtHeaderContent: TextBlock = ObjectHelper.CreateObject(new TextBlock(), { Text: this.HeaderTxt });
                    imgHeaderImage.Children.Add(txtHeaderContent);
                }
                // else if (imgHeaderImage.Children.Count > 0 && imgHeaderImage.FindChildByType<TextBlock>() == null) {
                else if (imgHeaderImage.Children.Count > 0 ) {
                    var txtHeaderContent: TextBlock =ObjectHelper.CreateObject(new TextBlock(), { Text: this.HeaderTxt.ToString() });
                    imgHeaderImage.Children.Add(txtHeaderContent);
                }
                if(!String.IsNullOrEmpty(ImageList.HeaderImage)){
                    var imgPath: Image =ObjectHelper.CreateObject(new Image(), { Source: new BitmapImage(new Uri(ImageList.HeaderImage, UriKind.Relative)) });
                    if (!String.IsNullOrEmpty(ImageList.HeaderImgToolTip)){
                      ToolTipService.SetToolTip(imgPath, ImageList.HeaderImgToolTip);
                    imgHeaderImage.Children.Add(imgPath);
                  }
                }
            }
        });
        // // if (imgHeaderImage.Children.Count > 0 && imgHeaderImage.FindChildByType<TextBlock>() == null) {
  
        // if (imgHeaderImage.Children.Count > 0 ) {
        //     var txtHeaderContent: TextBlock =ObjectHelper.CreateObject(new TextBlock(), { Text: this.HeaderTxt.ToString() });
        //     imgHeaderImage.Children.Add(txtHeaderContent);
        // }
        // // else if (imgHeaderImage.Children.Count == 0 && imgHeaderImage.FindChildByType<TextBlock>() == null) {
        //   else if (imgHeaderImage.Children.Count == 0 ) {
        //     var txtHeaderContent: TextBlock =ObjectHelper.CreateObject(new TextBlock(), { Text: this.HeaderTxt.ToString() });
        //     imgHeaderImage.Children.Add(txtHeaderContent);
        // }
        this.Header = imgHeaderImage;
        
    }
  }*/
  }

  UpdateHeaderForChart(): void {
    if (this.HeaderImageList != null) {
      var imgHeaderImage: StackPanel = new StackPanel();
      if (imgHeaderImage.Children.Count == 0) {
        var txtHeaderContent: TextBlock = ObjectHelper.CreateObject(new TextBlock(), { Text: this.HeaderTxt });
        imgHeaderImage.Children.Add(txtHeaderContent);
      }
      this.Header = null;
      if (imgHeaderImage != null) {
        this.HeaderImageList.forEach((ImageList) => {
		  imgHeaderImage.isExtendedWidth = true;
          imgHeaderImage.Children.Add(ImageList);
        });
        this.Header = imgHeaderImage;
        setTimeout(()=>{
          this.Header.Orientation = Orientation.Horizontal;
        },0)
       
      }
    }
  }
}
// export module iTabItem {
export enum HeaderImageAlignment {
  Right = 0,
  Left = 1
}
export class HeaderImageListItem {
  public HeaderImage: string;
  public HeaderImageAlignment: HeaderImageAlignment;
  public HeaderImgToolTip: string;

  constructor() { }
}
// }