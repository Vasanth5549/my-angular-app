import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, HostListener, Input, KeyValueDiffers, OnInit, Output, ViewChild } from '@angular/core';
import { ComboBoxComponent } from '@progress/kendo-angular-dropdowns';
import { Observable, map } from 'rxjs';
import { InjectorInstance } from 'src/app/app.module';
import { SelectionChangedEventArgs } from '../../controls-model/common-models';
import { List } from '../../models/list';
import { CListItem } from '../../models/model';
import { ObservableCollection } from '../../models/observable-collection';
import { AccessKeyService } from '../AccessKey.service';
import { Control, SelectAllTextEvents } from '../Control';
import { RoutedEventArgs } from '../FrameworkElement';
import { GridExtension } from '../epma-grid-helpers/grid-extension';
import { TooltipDirective } from '@progress/kendo-angular-tooltip';
import { Visibility } from '../../controls-model/Visibility';


@Component({
  selector: 'iComboBox',
  templateUrl: './epma-combobox.component.html',
  styleUrls: ['./epma-combobox.component.css']
})
export class iComboBox extends Control implements OnInit, AfterViewInit {

  private accessKeyService: AccessKeyService;

  // Iterable diff...
  ISDifferMap = new Map<string, any>();
  ISMap = new Map<string, CListItem>();
  arrayDiffer: any;
  keyToIterate = [];
  // ends

  @Input() isPopupBorderRequired = false;
  @Input() set BorderBrush(colorObj: any) {
    let colorText: string = null;
    if (colorObj && colorObj.color && colorObj.color.R != undefined && colorObj.color.G != undefined && colorObj.color.B != undefined) {
      if (colorObj.color.A != undefined) {
        let alpha = 1;
        if (colorObj.color.A <= 1)
          alpha = colorObj.color.A;
        else
          alpha = colorObj.color.A / 255;
        colorText = "rgba(" + colorObj.color.R + "," + colorObj.color.G + "," + colorObj.color.B + "," + alpha + ")";
      }
      else
        colorText = "rgb(" + colorObj.color.R + "," + colorObj.color.G + "," + colorObj.color.B + ")";
    }
    if (colorText && colorText.length > 0) {
      this.style['border-color'] = colorText;
      this.style['border-width'] = '2px';
    }
    else {
      if (this.style['border-color'])
        delete this.style['border-color'];
      delete this.style['border-width'];
    }
  }

  public static ItemsSourceProperty = "ItemsSource";
  public static SelectedValueProperty = "SelectedValue";
  public static IsEnabledProperty = "IsEnabled";
  public static TextProperty = "Text";
  public static VisibilityProperty = "Visibility";
  //Stub Created for bug 37217
  //public ClearValue: any;
  private previousValue: CListItem;
  private nextValue: CListItem;
  @ViewChild("kendoComboBoxInstance", { static: true }) public combobox: any;
  @ViewChild(TooltipDirective) public tooltipDir: TooltipDirective;
  // @ViewChild(ComboBoxComponent) private comboBoxComponent: ComboBoxComponent;
  //@Output() ItemsSourceChange = new EventEmitter();
  @Input() SelectedValuePath: string;
  @Input() ItemTemplate: object;
  @Input() SelectAllTextEvent: string | SelectAllTextEvents;
  // @Input() IsEnabledChanged: string;
  //@Input() ItemsSource: ObservableCollection<CListItem>;
  @Input() IsHierarchical: boolean | string;
  @Input() Loaded: Function;
  // ColumnCellIndex is introduced for managing grid cell editing
  @Input() ColumnCellIndex: string;
  @Input() GridColumn?: any;
  @Input() GridHelper?: GridExtension;
  @Input() TextUpdated: Function | string;
  text: string = "";
  // stub - #36427
  private firstTimeUpdate = 0;
  ItemsSourceCopy: List<CListItem> | ObservableCollection<CListItem>;

  SelectedObject: CListItem
  @Output() SelectionChangedExtended_Func = new EventEmitter();
  @Output() SelectionChanged_Func = new EventEmitter();
  @Output() LostFocus_Func = new EventEmitter();
  @Output() kendoComboInstance = new EventEmitter();
  @Input() SelectionChanged: Function | string;
  @Input() LostFocus: Function | string;
  constructor(
    private elementRef?: ElementRef,
    private kvDiffers?: KeyValueDiffers,
    private cdr?: ChangeDetectorRef
  ) {
    super();
    super.controlType = "iComboBox"
  }

  mouseevent(toolTipTempRef: Element, tooltipShow) {
    if (tooltipShow) {
      this.tooltipDir.show(toolTipTempRef);
    } else {
      this.tooltipDir.hide();
    }
  }


  ngOnInit(): void {
    this.ItemsSourceCopy = this.ItemsSource;
    this.accessKeyService = InjectorInstance.get<AccessKeyService>(AccessKeyService);
  }

    // FocusToggle...
    _FocusToggle: boolean | string = false;
    get FocusToggle(): boolean | string {
      return this._FocusToggle;
    }
    @Input() set FocusToggle(v: boolean | string) {
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
      this._FocusToggle = value;
    }
  
    // AutoFocus...
    _AutoFocus: boolean | string = false;
    get AutoFocus(): boolean | string {
      return this._AutoFocus;
    }
    @Input() set AutoFocus(v: boolean | string) {
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
      this._AutoFocus = value;
    }
    
    public comboViewChild: ComboBoxComponent;
    @ViewChild('kendoComboBoxInstance') set comboBoxComponent(val: ComboBoxComponent) {
      if (val) {
        this.kendoComboInstance.emit(val);
        this.comboViewChild = val;
  
        if (this.AutoFocus) {
          this.isFocus = true;
          this.comboViewChild.focus();
        }
  
        if (!val.isOpen && this.FocusToggle) {  
          this.isFocus = true;
          this.FocusToggle = false;
          this.comboViewChild.focus();
          this.comboViewChild.toggle(true);
        }
      }
    }

  public override  ItemsSourceSetExtension(value: List<CListItem> | ObservableCollection<CListItem>) {
    if (value && this.kvDiffers) {
      this.arrayDiffer = this.kvDiffers.find(value.array).create();
      value.array.forEach(item => {
        this.ISDifferMap[item.Value] = this.kvDiffers.find(item).create();
        this.ISMap[item.Value] = item;
        this.keyToIterate.push(item.Value);
      });
    }
  }

  // IsSelectedValueDisplayText...
  _IsSelectedValueDisplayText: boolean | string = false;
  get IsSelectedValueDisplayText() {
    return this._IsSelectedValueDisplayText;
  }
  @Input() set IsSelectedValueDisplayText(val: boolean | string) {
    let value: boolean;
    if (typeof val == "string") {
      if (val == "True") {
        value = true;
      } else if (val == "False") {
        value = false;
      }
    } else {
      value = val;
    }
    this._IsSelectedValueDisplayText = value;
  }

  // Selected Index...
  _SelectedIndex: number;
  get SelectedIndex() {
    return this._SelectedIndex;
  }
  @Input() set SelectedIndex(value: number) {
    if (this.ItemsSource?.array.length > value) {
      this._SelectedIndex = value;

      if (value === -1) {
        if (typeof this._SelectedValue == 'string') {
          this._SelectedValue = '';
        } else {
          this._SelectedValue = null;
        }
        this._SelectedItem = null;
        this.text = '';
      } else {
        let idxSellItem = this.ItemsSource.array[value];
        if (idxSellItem) {
          idxSellItem.IsSelected = true;
        }
        this.SelectedItem = idxSellItem;
      }
    }
  }
  // SelectedValue...
  @Output() SelectedValueChange = new EventEmitter();
  _SelectedValue: CListItem | string;
  @Input() isStopSelectionChangeEvent?: boolean = false;
  @Input() set SelectedValue(value: string | CListItem) {
    if (value) {
      let isSelected: boolean = false;
      this.tagData = true;
      if (!this.isStopSelectionChangeEvent || !this._SelectedValue || (this.SelectedValue && !this.SelectedValue.Value)) {
        isSelected = true;
      }
      if (typeof value == 'string') {
        this._SelectedValue = value;
        let item = this.ItemsSource.array.find((element) => element.Value == value);
        if (item) {
          this._SelectedItem = item;
          this.SelectionChangedValue(item);
        }
      } else {
        this._SelectedValue = value;
        this._SelectedItem = value;
        this.nextValue = value;
        /**SelectionChangedValue event called twice ,once setting value and SelectedItemModelChange() method triggered.- Changed to arrest dual call*/
        if (isSelected) {
          this.SelectionChangedValue(value);
        }
      }
      if (!this.previousValue || (this.nextValue && this.previousValue && JSON.stringify(this.previousValue) != JSON.stringify(this.nextValue))) {
        this.previousValue = this.nextValue;
      }
    } else if (value == null) {
      this._SelectedValue = null;
      this._SelectedItem = null;
    }
    this._CheckDropDownOpened = false;
  }
  get SelectedValue(): CListItem | string {
    return this._SelectedValue;
  }

  public isSelctionChangedTriggered: boolean = false;
  public tagData: boolean = false;
  // SelectionChanged...
  SelectionChangedValue(val: any) {
    if (val && val.Value) {
      this.isSelctionChangedTriggered = true;
      this.SetValueIndex(val.Value);
      let selectionChangedEventArgs: SelectionChangedEventArgs;
      let addedItems: List = new List([this.SelectedItem]);
      let removedItems: List = this.previousValue && this.previousValue != val ? new List([this.previousValue]) : new List([]);
      selectionChangedEventArgs = new SelectionChangedEventArgs(removedItems, addedItems)
      if (this.SelectionChanged && this.SelectionChanged instanceof Function) {
        this.SelectionChanged(this, selectionChangedEventArgs);
      }
      this.SelectionChanged_Func.emit(selectionChangedEventArgs);
    }
  }

@Input() isValueChanged:boolean;
  // SelectedItem...
  @Output() SelectedItemChange = new EventEmitter();
  _SelectedItem: CListItem;
  @Input() set SelectedItem(value: CListItem | any) {
    if (value && value.text) {
      this._SelectedValue = null;
      this._SelectedItem = null;
      setTimeout(() => {
        this.text = value.text;
        this.TextChange.emit(this.text);
        this.inputSelector.value = this.text;
      }, 10);
    } else if (value && value != null) {
      if (this._IsSelectedValueDisplayText || this._IsSelectedValueDisplayText == true) {
        this._SelectedValue = value.DisplayText;
        this.text = value.DisplayText;
      } else if (typeof this._SelectedValue === 'string') {
        this._SelectedValue = value.Value;
        this.text = value.Value;
      } else if (!value.Value) {
        this._SelectedValue = value;
        this.text = value;
      } else if (value.DisplayText) {
        this._SelectedValue = value;
        this.text = value.DisplayText;
      } else {
        this._SelectedValue = value;
        this.text = value.Value;
      }
      this._SelectedItem = value;
   
      if(this.isValueChanged == true){
        if(this.isSelctionChangedTriggered == false){
          this.SelectionChangedValue(value);
        }
      }
      else{
        this.SelectionChangedValue(value);

      }
      this.TextChange.emit(this.text);
      if (this.inputSelector)
        this.inputSelector.value = this.text;
    }
    else if (value == null && this.AllowInputText) {
      setTimeout(() => {
        this.text = '';
        this.TextChange.emit(this.text);
        this.inputSelector.value = this.text;
      }, 10);
    }
  }
  get SelectedItem() {
    return this._SelectedItem;
  }


  // IsSelectBySearch...
  _IsSelectBySearch: boolean | string = false;
  get IsSelectBySearch(): boolean | string {
    return this._IsSelectBySearch;
  }
  @Input() set IsSelectBySearch(v: boolean | string) {
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
    this._IsSelectBySearch = value;
  }

  // ResetMore...
  _ResetMore: boolean | string = false;
  get ResetMore(): boolean | string {
    return this._ResetMore;
  }
  @Input() set ResetMore(v: boolean | string) {
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
    this._ResetMore = value;
  }
  @Input() IsParentEventPrevent: boolean = false;
  KeyUpEventNew(event) {
    super.KeyUpEvent(event);
    let value = this.ItemsSource.array.find(cListItem => {
      return cListItem.DisplayText.toLowerCase() == this.inputSelector.value.toLowerCase();
    });
    if (this.IsSelectBySearch && this.IsSelectBySearch == true) {
      if (value) {
        let selectionChangedEventArgs: SelectionChangedEventArgs;
        let addedItems: List = new List([this.SelectedItem]);
        let removedItems: List = this.previousValue && this.previousValue != value ? new List([this.previousValue]) : new List([]);
        selectionChangedEventArgs = new SelectionChangedEventArgs(removedItems, addedItems, this.inputSelector.value.toLowerCase());
        this.SelectionChangedExtended_Func.emit(selectionChangedEventArgs);
      }
    }
    if (event.keyCode != 8 && event.keyCode != 46) {
      if (!value && !this.AllowInputText && this.inputSelector.value.length > 1) {
        this.inputSelector.value = "";
      }
    }
    if (this.IsParentEventPrevent && (event.code.toLowerCase() == 'arrowup' || event.code.toLowerCase() == 'arrowdown')) {
      event.preventDefault();
      event.stopPropagation();
    }
  }

  KeyDownEventNew(event) {
    super.KeyUpEvent(event);
    if (this.IsParentEventPrevent && (event.code.toLowerCase() == 'arrowup' || event.code.toLowerCase() == 'arrowdown')) {
      event.preventDefault();
      event.stopPropagation();
    }
  }
  @Input() ISDynamicFormPRN : boolean = false;
  SelectedItemModelChange(e) {
    if (e != null && this._SelectedItem != e) {
      if (e && e.text == "") {
        this._SelectedValue = null;
        this.SelectedValueChange.emit(null);
        this._SelectedItem = null;
        this.SelectedItemChange.emit(null);
        this.TextChange.emit(null);
      } else if (e && e.text) {
        this._SelectedValue = null;
        this._SelectedItem = null;
        this.SelectedValueChange.emit(null);
        this.SelectedItemChange.emit(null);
        setTimeout(() => {
          this.text = e.text;
          this.TextChange.emit(this.text);
          this.inputSelector.value = this.text;
          this.assignViewToModel(e.text, iComboBox.TextProperty);
          if (this.TextUpdated instanceof Function) {
            let e = new RoutedEventArgs();
            this.TextUpdated(this, e);
          }
        }, 0);
      } else {
        this.emitSelectedValue(e);
        this._SelectedItem = e;
        this.SelectedItemChange.emit(e);
      }
      // this.emitSelectedItem(e);
      this.tagData = false;
      this.SelectionChangedValue(e);
      if(this.ISDynamicFormPRN && this.firstTimeUpdate == 0){
        this.ISDynamicFormPRN = false;
        if (e && e.text){
          this.text = e.text;
          this.TextChange.emit(this.text);
          this.inputSelector.value = this.text;
          this.assignViewToModel(e.text, iComboBox.TextProperty);
        }
      }
      if (this.firstTimeUpdate == 0) {
        this.cdr.detectChanges();
      }
      this.firstTimeUpdate = this.firstTimeUpdate + 1;
    } else if (e == null && (this._SelectedItem != null && !this.AllowInputText)) {
      this._SelectedValue = null;
      this.SelectedValueChange.emit(null);
      this._SelectedItem = null;
      this.SelectedItemChange.emit(null);
      this.TextChange.emit(null);
      this.tagData = false;
      this.SelectionChangedValue(this._SelectedItem);
      this.assignViewToModel(this._SelectedValue, iComboBox.SelectedValueProperty);
    }
    if (e != null) {
      this.assignViewToModel(e, iComboBox.SelectedValueProperty);
    }
    this._CheckDropDownOpened = true;
  }

  emitSelectedValue(selectedItem: CListItem) {
    if ((this._IsSelectedValueDisplayText || this._IsSelectedValueDisplayText == true)) {
      this._SelectedValue = selectedItem.DisplayText;
      this.text = selectedItem.DisplayText;
    } else if (typeof this._SelectedValue == 'string') {
      this._SelectedValue = selectedItem.Value;
      this.text = selectedItem.Value;
    } else if ((selectedItem.DisplayText || selectedItem.DisplayText == '') && selectedItem.Value) {
      this._SelectedValue = selectedItem;
      this.text = selectedItem.DisplayText;
    } else {
      this._SelectedValue = selectedItem;
      this.text = selectedItem.Value;
    }
    this.TextChange.emit(this.text);
    if (this.inputSelector)
      this.inputSelector.value = this.text;
    this.SelectedValueChange.emit(this._SelectedValue);
  }


  public valueNormalizer = (text: Observable<string>) =>
    text.pipe(
      map((content: string) => {
        return {
          text: content
        };
      })
    );


  // IsTypeAHead...
  _IsTypeAHead: boolean | string;
  get IsTypeAHead(): boolean | string {
    return this._IsTypeAHead;
  }
  @Input() set IsTypeAHead(val: boolean | string) {
    let value: boolean | string;
    if (typeof val == 'string') {
      if (val == 'True' || val == 'true') {
        value = true;
      } else if (val == 'False') {
        value = false;
      }
    } else {
      value = val;
    }
    this._IsTypeAHead = value;
    setTimeout(() => {
      if (this.inputSelector && !this._IsTypeAHead) {
        this._IsEditable = value;
        this.SetIsEditable(this.inputSelector, value);
      }
    }, 0);
  }


  // IsDropDownOpen...
  _IsDropDownOpen: boolean | string = false;
  get IsDropDownOpen(): boolean | string {
    return this._IsDropDownOpen;
  }
  @Input() set IsDropDownOpen(v: boolean | string) {
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
    this._IsDropDownOpen = value;
  }


  // CheckDropDownOpened...
  _CheckDropDownOpened: boolean | string = false;
  get CheckDropDownOpened(): boolean | string {
    return this._CheckDropDownOpened;
  }
  @Input() set CheckDropDownOpened(v: boolean | string) {
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
    this._CheckDropDownOpened = value;
  }


  // IsEditable...
  _IsEditable: boolean | string = true;
  @Input() set IsEditable(val: boolean | string) {
    let value: boolean | string;
    if (typeof val == 'string') {
      if (val == 'True' || val == 'true') {
        value = true;
      } else if (val == 'False') {
        value = false;
      }
    } else {
      value = val;
    }
    if (this.inputSelector && this._IsEditable !== value) {
      this.SetIsEditable(this.inputSelector, value);
    }
    this._IsEditable = value;
  }
  get IsEditable() {
    return this._IsEditable;
  }


  // MaxTextLenght...
  _MaxTextLength: number | string = 524288;
  @Input() set MaxTextLength(val: number | string) {
    this._MaxTextLength = val;
  }
  get MaxTextLength() {
    return this._MaxTextLength;
  }



  // IsDropDownStretch...
  get popUpPropertyObj() {
    if (this._IsDropDownStretch === "True" || this._IsDropDownStretch === true) {
      return { width: 'auto' };

    } else if (this.isPopupBorderRequired) {
      return {
        popupClass: 'noWrapCSSClassForComboDropdownWithBorder'
      };
    } else {
      return {
        popupClass: 'noWrapCSSClassForComboDropdown'
      };
    }

  }
  _IsDropDownStretch: boolean | string = false;
  get IsDropDownStretch() {
    return this._IsDropDownStretch;
  }
  @Input() set IsDropDownStretch(value: boolean | string) {
    this._IsDropDownStretch = value;
  }


  // IsReadOnly...
  @Output() IsReadOnlyChange = new EventEmitter();
  _IsReadOnly: boolean;
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
  }


  // AllowInputText...
  _AllowInputText = false;
  get AllowInputText() {
    return this._AllowInputText
  }
  @Input() set AllowInputText(v: boolean | string) {
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
    this._AllowInputText = value;
  }


  // IsTextSearchEnabled...
  _IsTextSearchEnabled = true;
  get IsTextSearchEnabled() {
    return this._IsTextSearchEnabled
  }
  @Input() set IsTextSearchEnabled(v: boolean | string) {
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
    this._IsTextSearchEnabled = value;
  }

  public override _ItemsSource: List<CListItem> | ObservableCollection<CListItem> = new ObservableCollection<CListItem>();
  public override get ItemsSource() {
    return this._ItemsSource;
  }
  @Input() override set ItemsSource(value: List<CListItem> | ObservableCollection<CListItem>) {
    let updateNull = false;
    if (this._ItemsSource && this._ItemsSource.Count > 0 && value && value.Count > 0) {
      if (this.ResetMore && this.ResetMore == true && this.Visibility != Visibility.Collapsed) {
        let isExists = value.array.find((ele) => ele?.DisplayText == this.SelectedItem.DisplayText);
        if (!isExists) updateNull = true;
      }
      if (this.IsSelectBySearch && this.IsSelectBySearch == true) {
        updateNull = true;
      }
    }
    this._ItemsSource = value;
    this.ItemsSourceSetExtension(value);
    if (updateNull && updateNull == true) {
      setTimeout(() => {
        this._SelectedValue = null;
        this.SelectedValueChange.emit(null);
        this._SelectedItem = null;
        this.SelectedItemChange.emit(null);
      }, 0);
    }
  }


  // Text...
  @Input() override set Text(value: string) {
    if (this._AllowInputText == true) {
      this.text = value ?? '';
    }
    let settextitem = this.ItemsSource?.array.find(
      (element) => element.DisplayText == value
    );
    if (settextitem) {
      this.SelectedValue = settextitem;
    }
  }


  // CanDropDown...
  _CanDropDown: boolean = true;
  get CanDropDown() {
    return this._CanDropDown;
  }
  @Input() set CanDropDown(v: boolean | string) {
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
    if (this.buttonSelector && this._CanDropDown !== value) {
      this.LockDropDown(this.buttonSelector, value);
    }
    this._CanDropDown = value;
  }


  // IsFocused...
  get IsFocused() {
    return this.isFocus
  }


  // CanAutoCompleteSelectItems...
  _CanAutocompleteSelectItems: boolean | string;
  @Input() set CanAutocompleteSelectItems(value: boolean | string) {
    this._CanAutocompleteSelectItems = value;
  }
  get CanAutocompleteSelectItems() {
    return this._CanAutocompleteSelectItems;
  }

  @Input() TextTrimming: boolean = false;


  // OptionCount...
  get OptionCount(): number {
    return this.ItemsSource.Count;
  }


  // AddOption...
  AddOption(
    argument?: CListItem | string,
    sValue?: string,
    bIsSelected?: boolean,
    nLevel?: number,
    sImageSource?: string,
    oTag?: any
  ) {
    if (argument instanceof CListItem) {
      let oOptionItem = argument;
      if (oOptionItem.DisplayText && oOptionItem.Value) {
        if (!this.ItemsSource)
          this.ItemsSource = new ObservableCollection<CListItem>();
        this.ItemsSource.Add(oOptionItem);
        if (oOptionItem.IsSelected === true) {
          this.SelectedIndex = this.ItemsSource.array.length - 1;
        }
      }
    } else {
      let sDisplayText = argument;
      if (sDisplayText && sValue) {
        let cListItem = new CListItem();
        cListItem.DisplayText = sDisplayText;
        cListItem.Value = sValue;
        cListItem.IsSelected = bIsSelected;
        cListItem.Level = nLevel;
        cListItem.Tag = oTag;
        this.ItemsSource.Add(cListItem);
        if (bIsSelected === true) {
          this.SelectedIndex = this.ItemsSource.array.length - 1;
        }
      }
    }
  }


  // GetText...
  GetText(): string {
    if (this._SelectedItem) {
      return this.SelectedItem.DisplayText;
    } else {
      return undefined;
    }
  }


  // GetValue...
  GetValue(): string {
    if (this._SelectedValue) {
      return this._SelectedValue.Value;
    } else {
      return String.Empty;
    }
  }
  //Stub Created for bug 37217
  SetPropertyValue(controlProperty, binding: any) {
    if (controlProperty == "Tooltip" && typeof binding == "string")
      this[controlProperty] = binding;
  }

  // SetValue...
  SetValue(value: string) {
    if (this.ItemsSource != null && this.ItemsSource.array) {
      this.ItemsSource.array.find(
        (element, index) => {
          if (element.Value == value) {
            this.SelectedIndex = index;
          }
        }
      );
    }
  }

  SetValueIndex(value: string) {
    if (this.ItemsSource != null && this.ItemsSource.array) {
      this.ItemsSource.array.find(
        (element, index) => {
          if (element.Value == value) {
            this._SelectedIndex = index;
          }
        }
      );
    }
  }


  // ClearText...
  ClearText() {
    if (this.IsEditable) {
      this._SelectedValue = null;
      this.Focus();
    }
  }


  ngDoCheck() {
    this.DetectChange();
    // this.ItemsSource.forEach(ele => {
    //   if (ele.IsSelected && this._SelectedItem['Value'] != ele.Value) {
    //     this._SelectedItem = ele;
    //   }
    // });


    //Detect changes in array when item added or removed
    // let arrayChanges = this.arrayDiffer.diff(this.ItemsSource);
    // if (arrayChanges) {
    //   arrayChanges.forEachAddedItem((record) => {
    //     let item = record.currentValue;
    //     this.ISDifferMap.set(item.name, this.kvDiffers.find(item).create());
    //     this.ISMap.set(item.name, item);
    //   });
    //   arrayChanges.forEachRemovedItem((record) => {
    //     let item = record.previousValue;
    //     this.ISDifferMap.delete(item.name);
    //     this.ISMap.delete(item.name);
    //   });
    // }

    // let c = this.ISDifferMap['Medications'].diff(this.ISMap['Medications']);
    // if (c) {
    //   c.forEachChangedItem(record => {
    //   });
    // }

    // for (let entry of Array.from(this.ISDifferMap.keys())) {
    //   let key = entry[0];
    //   let value = entry[1];
    // }


    //Detect changes in object inside array

    this.keyToIterate.forEach(element => {
      let key = element;
      let ISDiffer = this.ISDifferMap[key];
      let changes = ISDiffer.diff(this.ISMap[key]);
      if (changes) {
        changes.forEachChangedItem(record => {
          if (record.currentValue) {
            this._SelectedItem = this.ISMap[key];
          }

        });
      }
    });

    // for (let [key, ISDiffer] of this.ISDifferMap) {

    //   let changes = ISDiffer.diff(this.ISMap.get(key));
    //   if (changes) {
    //     changes.forEachChangedItem(record => {
    //     });
    //   }
    // }

  }


  onChange(e: string) {
    this.text = e;
    this.TextChange.emit(e);
  }


  isFocus = false;
  onblur() {
    this.isFocus = false;
    if (!this.IsTypeAHead) {
      this.inputSelector.style.background = '';
    }
    if (this.LostFocus instanceof Function) {
      let e = new RoutedEventArgs();
      this.LostFocus(this, e);
    }
    this.LostFocus_Func.emit(this);
    // This condition is added for managing grid cell editing
    if (this.ColumnCellIndex && this.DataContext && this.DataContext[this.ColumnCellIndex]) {
      this.DataContext[this.ColumnCellIndex] = false;
      if (this.GridHelper && this.GridHelper.EnableCellEditEnded) this.GridHelper.CellEditEnded(this);
      if (this.GridHelper && this.GridHelper.EnableCellValidating) this.GridHelper.CellValidating(this);
    }
    if (this.AllowInputText && this.inputSelector.value == '') {
      this._SelectedValue = null;
      this.SelectedValueChange.emit(null);
      this._SelectedItem = null;
      this.SelectedItemChange.emit(null);
      this.Text="";
      this.TextChange.emit("");
      this.assignViewToModel(this._SelectedValue, iComboBox.SelectedValueProperty);
      this.assignViewToModel("", iComboBox.TextProperty);
    }
  }

  override Focus() {
    this.isFocus = true;
    if (!this.IsTypeAHead && this.SelectedItem == null && String.IsNullOrEmpty(this.inputSelector.style.background)) {
      this.inputSelector.style.background = "#C2E7FF";
    }
    // if (this.comboBoxComponent)
    //   this.comboBoxComponent.focus();
    if(this.comboViewChild){
      this.comboViewChild.focus();
    }
  }

  override setFocus() {
    this.isFocus = true;
    // setTimeout(() => {
    //   if (this.comboBoxComponent)
    //     this.comboBoxComponent.focus();
    // });
  }


  ngOnDestroy() {
    this.accessKeyService.unregister(this.id);
    this.isSelctionChangedTriggered = false;
  }

  inputSelector;
  buttonSelector;
  ngAfterViewInit(): void {
    this.inputSelector = this.elementRef.nativeElement.querySelector('input');
    this.buttonSelector = this.elementRef.nativeElement.querySelector('button');
    this.inputSelector.maxLength = this._MaxTextLength;
    this.inputSelector.value = this.text;

    this.SetIsEditable(this.inputSelector, this._IsEditable);
    this.LockDropDown(this.buttonSelector, this._CanDropDown);

    if (this.ItemsSource && (this.ItemsSource.Count > 0 && this.SelectedItem)) {
      this.SelectionChangedValue(this.SelectedItem);
    }
  }


  SetIsEditable(inputSelector, isEditable) {
    inputSelector.readOnly = !isEditable;
  }


  LockDropDown(buttonSelector, CanDropDown) {
    buttonSelector.disabled = !CanDropDown;
  }


  handleFilter(e: any) {
    this.text = e;
    this.TextChange.emit(e);
    if (this._CanDropDown && this._CanDropDown != true) {
      this.combobox.toggle(false);
    }
    // if (event['inputType'].indexOf('delete') > -1) {
    //   this.ItemsSource = this.ItemsSourceCopy;
    // }
    // let data = this.ItemsSource.array.filter(
    //   (s) => s.DisplayText.toLowerCase().indexOf(e.toLowerCase()) !== -1
    // ) as any as ObservableCollection<CListItem>;
    // this.ItemsSource = new ObservableCollection<CListItem>();
    // for (let i = 0; i < data['length']; i++) {
    //   this.ItemsSource.Add(data[i]);
    // }
  }

  setComboBoxDropDownOpen() {
    // setTimeout(() => {
    //   this.comboBoxComponent.toggle(true);
    // });
    this._IsDropDownOpen = true;
  }

  isOpened() {
    // this.inputSelector.select();
    if (!this.IsTypeAHead)
      this.inputSelector.style.background = '';
    this._IsDropDownOpen = true;
  }

  isClosed() {
    this._IsDropDownOpen = false;
  }

  // Items...
  public Items = {
    Add: (cListItem: CListItem) => {
      this.ItemsSource.Add(cListItem);
    },
    Count: () => {
      return this.ItemsSource.array.length;
    }
  }
  public itemDisabled(itemArgs: { dataItem: CListItem; index: number }) {
    //return itemArgs.index === 0;
    let value = false;
    if (itemArgs.dataItem.Level == 0) {
      //return !itemArgs.dataItem.Level;
      value = true;
    }
    return value;
  }
  public ClearValue(isTextChangeEmit?:boolean): void {
    // if (IsCListItem())
    //   return
    if (this.IsEditable) {
      this.Text = String.Empty;
      this.SelectedItem = null;
   
      if(isTextChangeEmit){
        this.inputSelector.value = this.text;
      }
      this.Focus();
    }
    else {
      this.SelectedItem = String.Empty;
      //  cntCombo.Content = String.Empty;
    }
  }
  @Input() ToolTipClass: string = "";
  @Input() ControlTooltipClass: string = "";

  @HostListener('window:mouseup', ['$event'])
  onMouseUp(event) {
    event.preventDefault();
  }

}
