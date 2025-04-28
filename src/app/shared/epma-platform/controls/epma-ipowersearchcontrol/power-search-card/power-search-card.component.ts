import { ChangeDetectorRef, Component, EventEmitter, HostBinding, HostListener, Input, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
// import { BasicserviceService } from '../../../services/basicservice.service';
import { OnSelectArgs, PSLineItem, PSStyleItem } from 'src/app/shared/epma-platform/controls/iPowerSearch';
// import { OnSelectArgs, PSLineItem, PSStyleItem } from 'epma-platform/models';
import { VerticalAlign } from '@progress/kendo-angular-layout';
import { ShowOption } from '@progress/kendo-angular-tooltip';

@Component({
  selector: 'app-power-search-card',
  templateUrl: './power-search-card.component.html',
  styleUrls: ['./power-search-card.component.css'],
  // encapsulation: ViewEncapsulation.None
})
export class PowercardComponent implements OnInit {
  public middleAlign: VerticalAlign = "middle";
  @Input() ListSearchRowObject: PSLineItem;
  @Input() ListSearchStyleObject: PSStyleItem[];
  @Output() notePopupEvent: EventEmitter<any> = new EventEmitter();
  @Output() ladSearch_OnSelect: EventEmitter<any> = new EventEmitter();
  textFlag!: string;

  iconFlag: boolean = false;
  OnSelectArgs: OnSelectArgs;
  constructor(private cdr:ChangeDetectorRef) { }
  public opened = false;
  public dataSaved = false;
  public disabled = true;
  public ShowTooltip: boolean = true;
  _isSelected:boolean=false;
  get isSelected(){
    return this._isSelected;
  }
  @Input() set isSelected(value){
    this._isSelected= value;
  }
  public showPopup: ShowOption = "hover";
  public dontShowPopup: ShowOption = 'none'
  // public RowStyle= {'color': ListSearchRowObject | PSStyle: 'Forecolor':ListSearchStyleObject[ListSearchRowObject.NormalStyle],
  // 'font-weight': ListSearchRowObject | PSStyle: 'Bold':ListSearchStyleObject[ListSearchRowObject.NormalStyle],
  // 'font-style': ListSearchRowObject | PSStyle: 'Italic':ListSearchStyleObject[ListSearchRowObject.NormalStyle],
  // 'text-transform': ListSearchRowObject | PSStyle: 'TextCase':ListSearchStyleObject[ListSearchRowObject.NormalStyle] };


  // public RowStyle= {'color':'blue',
  // 'font-weight':'bold',
  // 'font-style': 'italic'
  // };

  ngAfterViewInit() {
    this.setListSearchRowObject(this.ListSearchRowObject);
    setTimeout(()=>{
      this.cdr.markForCheck();
    })
  }

  RowStyle = {};

  // private _ListSearchRowObject: PSLineItem;
  // get ListSearchRowObject() {
  //   return this._ListSearchRowObject;
  // }
  // @Input() set ListSearchRowObject(item: PSLineItem) {
  //   this._ListSearchRowObject = item;
  //   // 'color': ListSearchRowObject | PSStyle: 'Forecolor':ListSearchStyleObject[ListSearchRowObject.NormalStyle],
  //   if (this.ListSearchStyleObject && this.ListSearchStyleObject[item.NormalStyle].Forecolor) {
  //     this.RowStyle['color'] = this.ListSearchStyleObject[item.NormalStyle].Forecolor;
  //     // this.RowStyle['color'] = this.ListSearchStyleObject[1].Forecolor;
  //   }
  // }

  setListSearchRowObject(item: PSLineItem) {
    if (this.ListSearchStyleObject && this.ListSearchStyleObject[item.NormalStyle]?.Forecolor) {
      this.RowStyle['color'] = this.ListSearchStyleObject[item.NormalStyle].Forecolor;
    }
    if (this.ListSearchStyleObject && this.ListSearchStyleObject[item.NormalStyle]?.Bold) {
      this.RowStyle['font-weight'] = this.ListSearchStyleObject[item.NormalStyle].Bold === true ? 'bold' : '';
    }
    if (this.ListSearchStyleObject && this.ListSearchStyleObject[item.NormalStyle]?.Italic) {
      this.RowStyle['font-style'] = this.ListSearchStyleObject[item.NormalStyle].Italic  === true ? 'italic' : '';
    }
    if (this.ListSearchStyleObject && this.ListSearchStyleObject[item.NormalStyle]?.TextCase) {
      let textCase = this.ListSearchStyleObject[item.NormalStyle].TextCase;
      this.RowStyle['text-transform'] = ((textCase == 'Upper') ? 'uppercase' : ((textCase == 'Lower') ? 'lowercase' : ''));;
    }
  }

  ApplySearchStyleList(type: string) {
    if (this.ListSearchRowObject && this.ListSearchRowObject.NormalStyle > -1 && this.ListSearchStyleObject.length > 0) {
      if (type === 'FColor') {
        return this.ListSearchStyleObject[this.ListSearchRowObject.NormalStyle].Forecolor ? this.ListSearchStyleObject[this.ListSearchRowObject.NormalStyle].Forecolor : '';
      } else if (type === 'FBold') {
        return this.ListSearchStyleObject[this.ListSearchRowObject.NormalStyle].Bold === true ? 'Bold' : '';
      } else if (type === 'FItalic') {
        return this.ListSearchStyleObject[this.ListSearchRowObject.NormalStyle].Italic === true ? 'Italic' : '';
      } else if (type === 'TextCase' && (this.ListSearchStyleObject[this.ListSearchRowObject.NormalStyle].TextCase === 'Lower' ||
        this.ListSearchStyleObject[this.ListSearchRowObject.NormalStyle].TextCase === 'Upper')) {
        this.ListSearchStyleObject[this.ListSearchRowObject.NormalStyle].TextCase === 'Lower' ? this.textFlag = 'Lower' : this.textFlag = 'Upper';
      } else {
        return this.ListSearchRowObject.Text;
      }
    } else {
      return this.ListSearchRowObject.Text;
    }
    return this.ListSearchRowObject.Text;
  }

  ApplyIconCondition(ListSearchRowObject: PSLineItem) {

    if (ListSearchRowObject.Value && ListSearchRowObject.MCIcon === true) {
      let val = ListSearchRowObject.Value.split('~', 6);      
      //Revisit Required , Added appliance in or condition
    if (val.length > 5 && (val[5].ToUpper() === Constants.CC_DRUG.ToUpper() || val[5].ToUpper() === Constants.CC_APPLIANCE.ToUpper())) {            
        this.iconFlag = true;     
        //Revisit Required , Commented out tooltip assignment   
        //ListSearchRowObject.MCIconTooltip = Constants.MCTooltip;
      } else {
        this.iconFlag = false;        
        //ListSearchRowObject.MCIconTooltip = ListSearchRowObject.MCIconTooltip;
      }
    }
  }

  public close(): void {
    this.opened = false;
  }

  public open(): void {
    this.opened = true;
  }

  public toggleDisabled(): void {
    this.disabled = !this.disabled;
  }

  // public Convert(value:Object, targetType:Type, parameter:Object, culture:Globalization.CultureInfo): Object
  // {
  //     var flowDirection: LineIconAlignment = <LineIconAlignment>value;
  //     if (flowDirection == LineIconAlignment.Right)
  //         return FlowDirection.RightToLeft;
  //     else return FlowDirection.LeftToRight;
  // }

  ngOnInit(): void {
    this.ApplyIconCondition(this.ListSearchRowObject);
    this.toggleDisabled();
  }

  TextBlock_MouseEnter(hoverName: HTMLElement) {
    hoverName.style.background = "#F3F5F4";
  }

  TextBlock_MouseLeave(hoverName: HTMLElement) {
    hoverName.style.background = "none";
  }

  TextBlock_MouseLeftButtonDown(e: PSLineItem) {
    let OnSelectArgs: OnSelectArgs = { Tag: '', index: 0, Value: '', Text: '' };
    OnSelectArgs.Text = e.Text;
    OnSelectArgs.Value = e.Value;
    this.ladSearch_OnSelect.emit(OnSelectArgs);
  }
  OnIconClick(e: PSLineItem) {
    let OnSelectArgs: OnSelectArgs = { Tag: '', index: 0, Value: '', Text: '' };
    OnSelectArgs.Tag = e.Tag;
    this.ladSearch_OnSelect.emit(OnSelectArgs);
  }
  OnSecondaryIconClick(e: PSLineItem) {
    let OnSelectArgs: OnSelectArgs = { Tag: '', index: 0, Value: '', Text: '' };
    OnSelectArgs.Tag = e.Tag;
	 OnSelectArgs.Text = e.Text;
    OnSelectArgs.Value=e.Value;
    this.ladSearch_OnSelect.emit(OnSelectArgs);
  }
}

export class Constants {
  public static CC_DRUG = "CC_DRUG";
  public static MCTooltip = 'MC';
  public static CC_APPLIANCE = "CC_APPLIANCE";
}
