import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { Control } from '../Control';
import { HorizontalAlign } from '@progress/kendo-angular-layout';
import { ObservableCollection } from '../../models/observable-collection';
import { CListItem, SLSFSItem, TextWrapping } from '../../models/model';
import { IEnumerable } from '../../models/ienumerable';
import { InjectorInstance } from 'src/app/app.module';
import { AccessKeyService } from '../AccessKey.service';
import { List } from '../../models/list';
import { UtilityService } from '../../services/utility.service';
import { StringBuilder } from '../../services/stringbuilder.service';
import { Convert } from 'epma-platform/services';
import { AppContextInfo } from 'src/app/lorappcommonbb/utilities/globalvariable';

var Base64=
{
_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
encode:(input) => {
var sSB=new StringBuilder();
if(typeof(input)=='undefined'||input==null)input='null';
var output="";
var chr1,chr2,chr3,enc1,enc2,enc3,enc4;
var i=0;
input=Base64._utf8_encode(input);
while(i<input.length){
chr1=input.charCodeAt(i++);
chr2=input.charCodeAt(i++);
chr3=input.charCodeAt(i++);
enc1=chr1>>2;
enc2=((chr1&3)<<4)|(chr2>>4);
enc3=((chr2&15)<<2)|(chr3>>6);
enc4=chr3&63;
if(isNaN(chr2)){
enc3=enc4=64;
}
else if(isNaN(chr3)){
enc4=64;
}
sSB.Append(Base64._keyStr.charAt(enc1));
sSB.Append(Base64._keyStr.charAt(enc2));
sSB.Append(Base64._keyStr.charAt(enc3));
sSB.Append(Base64._keyStr.charAt(enc4));
}
return sSB.ToString();
}
,
_utf8_encode:(string) => {
var sSB=new StringBuilder();
if(string==null)string='null';
string=""+string;
string=string.replace(/\r\n/g,"\n");
var utftext="";
for(var n=0;n<string.length;n++){
var c=string.charCodeAt(n);
if(c<128){
sSB.Append(String.fromCharCode(c));
}
else if((c>127)&&(c<2048)){
sSB.Append(String.fromCharCode((c>>6)|192));
sSB.Append(String.fromCharCode((c&63)|128));
}
else{
sSB.Append(String.fromCharCode((c>>12)|224));
sSB.Append(String.fromCharCode(((c>>6)&63)|128));
sSB.Append(String.fromCharCode((c&63)|128));
}
}
return sSB.ToString();
}
}

@Component({
  selector: 'iSFS',
  templateUrl: './epma-isfs.component.html',
  styleUrls: ['./epma-isfs.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class iSFS extends Control implements OnInit {
  imageSrc:string="assets/Images/isfsnor16.png";
  // Bug-36097
  ClearAll() {
    // this.ItemsSource.Clear();
    this.searchText = '';
    this.SelectedValue = '';
  }
  SetSelectedItem(value: any) {
    if (value instanceof  CListItem){
      this.searchText = value.DisplayText;
      this.SelectedValue = value.Value;

    }

  }
  private accessKeyService: AccessKeyService;
  baseStyle: any;
 //@Input() override ItemsSource: SLSFSItem[] = [];
  @Input() OnGetItems: Function;
  searchText: string;
  inputSelector;
  
  constructor(private elementRef?: ElementRef) {
    super();
    super.controlType = "iSFS"
  }

  ngOnInit(): void {
    this.accessKeyService = InjectorInstance.get<AccessKeyService>(AccessKeyService);
    //this.ItemsSources.length=this.MaxSize;
  }
  ngAfterViewInit() {
    this.inputSelector = this.elementRef.nativeElement.querySelector('input');
  }
  getEnteredText(e) {
    let element = this.ItemsSource?.array.find((item) => {
      if (typeof item === 'string') {
        return item === e;
      }else {
        return item.DisplayText === e;
      }
    });
    if(!element){
      this.searchText = '';
      this.inputSelector.value = '';
      this.SelectedText = "";
      this._SelectedValue = "";
      this.SelectedValueChange.emit(this._SelectedValue);
    }else{
      this.SelectedText = element.DisplayText;
      this.SelectedValueChange.emit(this._SelectedValue);
    }
  }

  _maxSize: number = 7;
  get MaxSize() {
    return this._maxSize
  }
  @Input() set MaxSize(value: any) {

    this._maxSize = value;
    this.ItemsSource.array.splice(0, value)

  }


  //  On SFSOpen....

  @Output() OnSFSOpen = new EventEmitter();
  @Input() OnSFSOpen_Func: Function | string;
  isfs_OnSFSOpen(event) {
    if (this.OnSFSOpen_Func instanceof Function)
      this.OnSFSOpen_Func({}, event);

    this.OnSFSOpen.emit(event);
  }


  // SelectedValue...

  @Output() SelectedValueChange: EventEmitter<any> = new EventEmitter();
  _SelectedValue: string;
  @Input() set SelectedValue(value: string) {
    if(this._SelectedValue != value){
      this._SelectedValue = value;
      let findItem = this.ItemsSource?.array.filter(x => x.Value === value);
      if (findItem?.length > 0) {
        this._SelectedText = findItem[0].DisplayText;
        this.searchText = findItem[0].DisplayText;
      }
      else if (findItem?.length == 0) {
        this.pushNewItems();
      }
      this.SelectedValueChange.emit(this._SelectedValue);
    }
  }

  get SelectedValue(): string {
    return this._SelectedValue;
  }

  pushNewItems() {
    if ((this._SelectedValue && this._SelectedValue != "0") && this._SelectedText) {
      const isDuplicate = this.ItemsSource.array.some(item => {
        return item.Value === this._SelectedValue;
      });
    
      if (!isDuplicate) {
       let clistitem = new CListItem();
       clistitem.DisplayText = this._SelectedText;
       clistitem.Value = this._SelectedValue;
        this.ItemsSource.array.push(clistitem);
        this.searchText = this._SelectedText;
      }
    } else {
      this.searchText = this._SelectedText;
    }
  }

  // SelectedText...


  _SelectedText: string;
  @Output() SelectedTextChange = new EventEmitter();
  @Input() set SelectedText(value: string) {
    if(this._SelectedText != value){
      this._SelectedText = value;
      let findItem = this.ItemsSource?.array.filter(x => x.DisplayText === value);
      if (findItem?.length > 0) {
        this._SelectedValue = findItem[0].Value
        this.searchText = findItem[0].DisplayText;
      }
      else if (findItem?.length == 0) {
        this.pushNewItems();
  
      }
      this.SelectedTextChange.emit(this._SelectedText);
    }
  }

  get SelectedText() {
    return this._SelectedText;
  }

  public EncodeEntity(sText:string) : string
  {
      if (String.IsNullOrEmpty(sText))
          return String.Empty;
      sText = this.DecodeEntity(sText);
      sText = sText.Replace("&", "amp;");
      
      return sText;
  }
  public DecodeEntity(sText:string) : string
  {
      if (String.IsNullOrEmpty(sText))
          return String.Empty;

      sText = sText.Replace("lt;", "<");
      sText = sText.Replace("gt;", ">");
      sText = sText.Replace("apos;", "\'");
      sText = sText.Replace("quot;", "\"");
      sText = sText.Replace("amp;", "&");
      sText = sText.Replace("&&", String.Empty);
      sText = sText.Replace("\\", String.Empty);
      return sText;
  }

  AddSFSItems(objSLSFSItems: List<SLSFSItem>) {
    if (objSLSFSItems) {
      let sSFSItems = String.Empty;
      let sSFSTypeTemp = String.Empty;
    
      objSLSFSItems.forEach(objSLSFSItem => {
        let encodeSfskey = Convert.ToString(Base64.encode(objSLSFSItem.Sfskey));        
        let encodeDisplayText = Convert.ToString(Base64.encode(objSLSFSItem.DisplayText));
        let encodeDisplayValue = Convert.ToString(Base64.encode(objSLSFSItem.DisplayValue));
        sSFSItems = String.Concat(sSFSItems, objSLSFSItem.Sfstype, "&", encodeSfskey, "&", encodeDisplayText, "&", encodeDisplayValue, "~");
        sSFSTypeTemp = objSLSFSItem.Sfstype;
      });

      sSFSItems = this.EncodeEntity(sSFSItems);
      
      this.searchText = objSLSFSItems[0].DisplayText;
      let clistitem: CListItem = new CListItem();
      clistitem.DisplayText = objSLSFSItems[0].DisplayText;
      clistitem.Value =objSLSFSItems[0].Value;;
      this.ItemsSource.array.push(clistitem);

      this.CallAddSFSItems(sSFSItems);
    }
  }
  public CallAddSFSItems(slsfsItems: string) {
    let requestBody = "FunctionName=AddSFSItems&__SFS_Items=" + slsfsItems;
    let objListConceptCodes: CListItem[] = [];
    let flowID = 'AddSFSItems';


    if (slsfsItems != null ) {
    UtilityService.primaryPostDataNoCache(flowID, requestBody, requestBody).subscribe({
      next(data) {
       // OnAddSFSItems(data);
      },
      error(msg) {
        console.log('error-CallAddSFSItems',msg);
        //OnGetSFSItems({ Request: requestBody, Result: null });
      }
    });
    }
    else{
      console.log('error-CallAddSFSItems no data');
    }
  }
  public GetSFSItems(sSFStype: string) {
    this.CallGetSFSItems(sSFStype, this.OnGetItems,this.addToItemSource)
  }

  private addToItemSource(slist)
  {
    this.ItemsSource.array.push(...slist);
  }

  public CallGetSFSItems(sSFStype: string, OnGetSFSItems: Function,addToItemSource) {
    let requestBody = "FunctionName=GetSFSItems&SFStype=" + sSFStype;
    let objListConceptCodes: CListItem[] = [];
    let flowID = 'GetSFSItems';
    let MaxSize = Number(this.MaxSize);


    if (sSFStype != null && OnGetSFSItems != null) {
    UtilityService.primaryPostDataNoCache(flowID, requestBody,sSFStype ).subscribe({
      next(data) {
        UtilityService.xmlToJson(data).subscribe({
          next(jsonConvertData: any) {
            let objslClistItem: ObservableCollection<CListItem> = new ObservableCollection<CListItem>();
            let slsfsItem = jsonConvertData.ARRAYOFSLSFSITEM.SLSFSITEM;
            let UserOID = AppContextInfo.UserOID;
            if(slsfsItem && !Array.isArray(slsfsItem) && typeof slsfsItem == "object"){
              //for single domaincode the xml to json convertor converts to object instead of array fix
              slsfsItem = [slsfsItem];
            }
            if(UserOID != null && slsfsItem != null && slsfsItem.Count() > 0){
              let oCListItem = slsfsItem.find(e => e.DISPLAYVALUE == UserOID);
              if(oCListItem != null){
                objslClistItem.Add({ DisplayText: oCListItem.DISPLAYTEXT, Value: oCListItem.SFSKEY });
              }
            }
            let nSFSCount = slsfsItem.Count();            
            for (let index = nSFSCount - 1; index >= 0; index--){
              let oCListItem = slsfsItem[index];

              let DISPLAYTEXT : string = oCListItem.DISPLAYTEXT;
              //objslClistItem.Add({ DisplayText: oCListItem.DISPLAYTEXT, Value: oCListItem.DISPLAYVALUE })
              if(DISPLAYTEXT != null && DISPLAYTEXT.toLowerCase() != 'null' && UserOID != null){
                if (oCListItem.DISPLAYVALUE != UserOID && objslClistItem.Count < MaxSize)
                objslClistItem.Add({ DisplayText: oCListItem.DISPLAYTEXT, Value: oCListItem.SFSKEY });
              }
            }
          // addToItemSource(objslClistItem.array);
            OnGetSFSItems(this, objslClistItem);
          }, error(msg) {
            OnGetSFSItems({ Request: requestBody, Result: null });
          }
        })
      },
      error(msg) {
        OnGetSFSItems({ Request: requestBody, Result: null });
      }
    });

    }
    else
    OnGetSFSItems({ Request: requestBody, Result: null });
  }
  
  mouseEnter(event:any){
    if(event.type==='mouseenter'){
    this.imageSrc="assets/Images/isfshot16.png";
    }
  }
  mouseLeave(event:any){
   if(event.type==='mouseleave'){
    this.imageSrc="assets/Images/isfsnor16.png";
   }
  }

  ngOnDestroy() {
    this.accessKeyService.unregister(this.id);
  }
}


