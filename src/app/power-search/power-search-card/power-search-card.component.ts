import { Component, EventEmitter, HostBinding, HostListener, Input, OnInit, Output, ViewChild, ViewEncapsulation} from '@angular/core';
import { BasicserviceService } from 'src/app/basicservice.service';
import { OnSelectArgs, PSLineItem, PSStyleItem } from 'src/app/shared/epma-platform/controls/iPowerSearch';

@Component({
  selector: 'app-power-search-card',
  templateUrl: './power-search-card.component.html',
  styleUrls: ['./power-search-card.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PowercardComponent implements OnInit {
  
  @Input() ListSearchRowObject: PSLineItem;
  @Input()  ListSearchStyleObject: PSStyleItem[];
  
  @Output() notePopupEvent: EventEmitter<any> = new EventEmitter();
  @Output() ladSearch_OnSelect: EventEmitter<any> = new EventEmitter();
  textFlag!: string;
  iconFlag: boolean = false;
  OnSelectArgs: OnSelectArgs;
  constructor(public basic: BasicserviceService) { }
  public opened = false;
  public dataSaved = false;
  public disabled = false;

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
  ApplyIconCondition() {
    if (this.ListSearchRowObject.Value && this.ListSearchRowObject.MCIcon === true) {
      let val = this.ListSearchRowObject.Value.split('~', 6);
      if (val.length > 5 && val[5].includes(this.basic.CC_DRUG) && val[5] === this.basic.CC_DRUG) {
        this.iconFlag = true;
        this.ListSearchRowObject.MCIconTooltip = this.basic.MCTooltip;
      } else {
        this.iconFlag = false;
        this.ListSearchRowObject.MCIconTooltip = this.ListSearchRowObject.MCIconTooltip;
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

  ngOnInit(): void {
    this.ApplyIconCondition();
    console.log (this.ListSearchRowObject)
  }

  MouseEnter(hoverName: HTMLElement) {
    hoverName.style.background = "#F3F5F4";
    
  }

  MouseLeave(hoverName: HTMLElement) {
    hoverName.style.background = "none";
  }
  
  TextBlock_MouseLeftButtonDown(e: PSLineItem) {
    let OnSelectArgs: OnSelectArgs = {Tag : '',index: 0, Value: '',Text:''};
    OnSelectArgs.Text = e.Text;
    OnSelectArgs.Value = e.Value;
    this.ladSearch_OnSelect.emit(OnSelectArgs);
  }
 

}

/* To be removed and consumed from Platform common service*/

export class ObservableCollection<T=unknown>{

  private arr: T[] = [];

  public Add(obj: T|any) {
    this.arr.push(obj);
  }

  public get Count(): number {
    return this.arr.length;
  }

  public get array() {
    return this.arr;
  }

}