import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { iTextBox } from '../epma-itextbox/epma-itextbox.component';
import { iButton } from '../epma-button/epma-button.component';
import { Control } from '../Control';
import { List } from '../../models/list';
import { DataItemDetails, SubsetDetails } from 'src/app/lorappmanageprescriptionbbui/model/conditionaldose';
import * as ControlStyles from "src/app/shared/epma-platform/controls/ControlStyles";
import { CListItem } from '../../models/model';
import { TextBoxComponent } from '@progress/kendo-angular-inputs';
import { AutoCompleteComponent } from '@progress/kendo-angular-dropdowns';
import { PatientContext } from 'src/app/lorappcommonbb/utilities/globalvariable';

declare function snomedValue():any;
@Component({
  selector: 'iTerminologyBrowser',
  templateUrl: './epma-iTerminologyBrowser.component.html',
  styleUrls: ['./epma-iTerminologyBrowser.component.css']
})
export class iTerminologyBrowser extends Control implements  OnInit {
@ViewChild(AutoCompleteComponent) private eltxtBox: AutoCompleteComponent;

 public Styles = ControlStyles;
 oTerminologyUtility:iTerminologyUtility = new iTerminologyUtility();
 oBrowserDetails:BrowserDetails = new BrowserDetails();
 ControlMode: EnumControlMode ;
 isSearchdisabled:boolean=false;
 isTextBoxDisabled:boolean = false;
 QSDelaytimer;
 TermDetail;
 inputSelector;
 snoomedbrowsertext = ""; 
 searchText: string;
  clearBtn: boolean=false;
  constructor(private elementRef?: ElementRef) {    
    super()
   }

  ngOnInit(): void {
    
  }
  private _iTermChecked:string;
  get iTermChecked(){
     return this._iTermChecked;
  }
  @Input()
  set iTermChecked(val:string){
   this._iTermChecked = val;
  } 
 
 //#region IsReadOnly
  private _isReadOnly:boolean;
  get IsReadOnly(){
     return this._isReadOnly;
  }
  @Input()
  set IsReadOnly(val:boolean){
   this._isReadOnly = val;
  } 
//#endregion

//#region  MaxLength
private _maxLength:number;
get MaxLength(){
  return this._maxLength;
}
@Input()
set MaxLength(length:number){
  this._maxLength = length;
} 
//#endregion
override Focus() { 
  this.eltxtBox?.focus();
}
//#region override Text property
override _text:any;
override get Text(){
  return this._text;
}
@Input()
override set Text(val:any){
  this._text = val;
}
//#endregion

GetValue(val?:string): any {
  if (this._text) {
    return this._text;
  }
}
GetText(val?:string): any {
  if (this._text) {
    return this._text;
  }
}
ngAfterViewInit() {
  //this.inputSelector = this.elementRef.nativeElement.querySelector('input');
}
iTermCheckedValue(e){
  if (e.target.checked===true) 
  {
    this.iTermChecked = "1";
  }
  else
  {
    this.iTermChecked = "0";
  }  
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
    this.Text = e;
    //this.inputSelector.value = '';
    this.SelectedText = '';
    this._SelectedValue = '';
    this.snoomedbrowsertext = e;    
    //this.SelectedValueChange.emit(this._SelectedValue);
  }else{
    //this.SelectedText = element.DisplayText;
    //this.Text = ` [${element.Value}] ${element.DisplayText}`;
    this.Text = `${element.DisplayText}[${element.Value}]`;
    this.isSearchdisabled = true;
    this.snoomedbrowsertext = element.DisplayText;
    let oBrowserDetails: BrowserDetails = new BrowserDetails();
    oBrowserDetails.Description =  this.Text;
    oBrowserDetails.SNOMEDDescriptionID = element.Value;
    oBrowserDetails.SNOMEDConceptID = element.Value;  
    oBrowserDetails.searchText = oBrowserDetails.Description;
    this.oTerminologyUtility.SearchText =oBrowserDetails.Description;
    this.oTerminologyUtility.oTerminologyBrowserEventArgs  =  new TerminologyBrowserEventArgs(oBrowserDetails);
    this.SelectedValueChange.emit(this._SelectedValue);
  }
}
_SelectedText: string;
@Output() SelectedTextChange = new EventEmitter();
@Input() set SelectedText(value: string) 
{
  if(this._SelectedText != value){
    this._SelectedText = value;
    let findItem = this.ItemsSource?.array.filter(x => x.DisplayText === value);
    if (findItem?.length > 0) {
      this._SelectedValue = findItem[0].Value
      this.searchText = findItem[0].DisplayText;
    }
    else if (findItem?.length == 0) 
    {
      this.pushNewItems();
    }
    this.SelectedTextChange.emit(this._SelectedText);
  }
}
get SelectedText() {
  return this._SelectedText;
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

//#region Click search Button
async SearchButton(){
//if(this.oTerminologyUtility.oTerminologyBrowserEventArgs.objBrowserDetails && this.oTerminologyUtility.oTerminologyBrowserEventArgs.objBrowserDetails.searchText)
  //this.Text = this.oTerminologyUtility.oTerminologyBrowserEventArgs.objBrowserDetails.searchText; 
let app = new AppActivity("");
//console.log(PatientContext.EncounterCode);
//const returnvalue = await app.ShowSnomedBrowser("", this.Text, true, "SNOMED", "1", "", "","", "", this.oTerminologyUtility.oSubsetDetails, this.oTerminologyUtility.oDataItemDetails, "", "", "", this.oTerminologyUtility.LaunchFrom, this.oTerminologyUtility.HasAssociationsPasses,this.oTerminologyUtility.HRAText,"","","",false);
//const returnvalue = await app.ShowSnomedBrowser("", this.Text, true, "SNOMED CT", "", "A", "en-us","Normal", "Any order", this.oTerminologyUtility.oSubsetDetails, "1108:CC_PRBDIAG:true", "Problemview.ProblemName", "A", "", this.oTerminologyUtility.LaunchFrom, this.oTerminologyUtility.HasAssociationsPasses,"Problem","CC_PRBDIAG","","",false);
const returnvalue = await app.ShowSnomedBrowser("", this.snoomedbrowsertext, true, this.oTerminologyUtility.CodingSchemeName, this.oTerminologyUtility.CodingSchemeVersion, "A", "en-us","Normal", "Any order", this.oTerminologyUtility.oSubsetDetails, this.oTerminologyUtility.DataItemOIDs, this.oTerminologyUtility.DataItemName, "A", "", this.oTerminologyUtility.LaunchFrom, this.oTerminologyUtility.HasAssociationsPasses,"Problem","CC_PRBDIAG","","",false);
//this.Text = '[' + (returnvalue.TermID) + '] ' + (returnvalue.TermDescription);
this.Text = (returnvalue.TermDescription) + '['+ (returnvalue.SNOMEDConceptID) + ']';
this.snoomedbrowsertext = returnvalue.TermDescription;
if((returnvalue !== null || typeof (returnvalue) != "undefined") && this.Text !== ''){
  this.isSearchdisabled = true;
  this.isTextBoxDisabled = true;
  this.clearBtn=true;
} // get the return object
//console.log("returnvalue", returnvalue);
// this.oTerminologyUtility.oTerminologyBrowserEventArgs.objBrowserDetails.Description = returnvalue.TermDescription;
// this.oTerminologyUtility.oTerminologyBrowserEventArgs.objBrowserDetails.SNOMEDDescriptionID = returnvalue.TermID;
// this.oTerminologyUtility.oTerminologyBrowserEventArgs.objBrowserDetails.SNOMEDConceptID = returnvalue.TermID;  // need to verify whether SNOMEDDescriptionID/SNOMEDConceptID are same or not??
let oBrowserDetails: BrowserDetails = new BrowserDetails();
 oBrowserDetails.Description =  this.Text;//returnvalue.TermDescription;
oBrowserDetails.SNOMEDDescriptionID = returnvalue.TermID;
oBrowserDetails.SNOMEDConceptID = returnvalue.SNOMEDConceptID;  // need to verify whether SNOMEDDescriptionID/SNOMEDConceptID are same or not??
oBrowserDetails.searchText = oBrowserDetails.Description;
this.oTerminologyUtility.SearchText =oBrowserDetails.Description;
this.oTerminologyUtility.oTerminologyBrowserEventArgs  =  new TerminologyBrowserEventArgs(oBrowserDetails);
}
//#endregion

deleteButton() {
  this.Text='';
  this.SelectedText = "";
  this.isSearchdisabled = false;
  this.isTextBoxDisabled = false;
  this.clearBtn=false;  
  this.oTerminologyUtility.oTerminologyBrowserEventArgs=null;
  this.snoomedbrowsertext = '';
  this.ItemsSource.Clear();
}
override KeyUpEvent(e){
  let spaceCount = e.target.value.split(" ").length - 1;
  let serchChar = e.target.value.length - spaceCount;
  if (e!=""&&serchChar!=0) {
    this.clearBtn=true;
  }else{
    this.clearBtn=false;
  }
}
}
//#region terminologyUtility class
export class iTerminologyUtility {
  oLaunchfrmIDs = ''
  LaunchFrom: string = '';
  HasAssociationsPasses: boolean;
  HRAText: string;
  SearchText: string;
  oSubsetDetails : List<SubsetDetails>;
  oDataItemDetails: List<DataItemDetails>
  oTerminologyBrowserEventArgs : TerminologyBrowserEventArgs;
  public CodingSchemeName: string;
  public CodingSchemeVersion: string;
  public ProblemNameECOID: string;
  public ProblemNameOID: string;
  public DataItemOIDs: string;
  public DataItemName: string;
}
//#endregion
//#region enum controlmode
export enum EnumControlMode{
  DropdownList = 0,
  Search = 1,
}
//#endregion

//#region  TerminologyBrowserEventArgs class
export class TerminologyBrowserEventArgs{
 objBrowserDetails:BrowserDetails ;
 constructor(oBrowserDetails:BrowserDetails){
  this.objBrowserDetails = oBrowserDetails;
 }
}
//#endregion

//#region  BrowserDetails class
export class BrowserDetails{
  SNOMEDConceptID: string;
  SNOMEDDescriptionID: string;
  Description:string;
  searchText:string;
  constructor(searchText?:string){
   if(searchText != null){
     this.searchText = searchText;
   }
  }
}
//#endregion



