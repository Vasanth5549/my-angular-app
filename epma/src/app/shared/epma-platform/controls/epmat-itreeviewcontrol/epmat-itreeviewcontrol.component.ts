import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NodeClickEvent, SelectableSettings, TreeItem } from '@progress/kendo-angular-treeview';
import { CListItem, List, ObservableCollection, SelectionChangedEventArgs } from 'epma-platform/models';
import { Convert } from 'epma-platform/services';
import { InjectorInstance } from 'src/app/app.module';
import { CTreeListItem, iTreeViewCollection, RadTreeViewItem, RadTreeViewItemEditedEventArgs } from '../../controls-model/treeView.model';
import { ObjectHelper } from '../../services/objecthelper.service';
import { SubjectEventEmitterService } from '../../services/subject-eventemitter.service';
import { Control } from '../Control';
import { Thickness, RoutedEventArgs } from '../FrameworkElement';
import { HorizontalAlignment, VerticalAlignment } from '../iPowerSearch';

@Component({
  selector: 'iTreeView',
  templateUrl: './epmat-itreeviewcontrol.component.html',
  styleUrls: ['./epmat-itreeviewcontrol.component.css']
})
export class iTreeViewControl extends Control implements OnInit {

  _normalNotesToolTip: string | boolean = false;
  get normalNotesToolTip() {
    return this._normalNotesToolTip;
  }
  @Input() set normalNotesToolTip(v: string | boolean) {
    let value: boolean;
    if (typeof v == 'string') {
      if (v == 'True') {
        value = true;
      } else{
        value = false;
      }
    }
    this._normalNotesToolTip = value;
  }

  @Input() IsHyperLink: boolean;
  // @Input() HorizontalAlignment: HorizontalAlignment | string;
  @Input() margin: Thickness;
  // @Input() Name: string;
  @Input() Expanded: Function | string;
  @Input() IsExpandOnSingleClickEnabled: boolean | string;
  @Input() restrictNodeExpand :boolean = false;
  @Input() allowNodeClick :boolean = true;
  // @Input() VerticalAlignment: VerticalAlignment|string;
  Count: any;
  _TreeViewDataContext: iTreeViewCollection;

  public expandedKeys: any[];
  public selectedKeys: any[];
  public selectableSettings: SelectableSettings = { enabled: true }

  _isConditionalDose: boolean = false;
  get IsConditionalDose(): boolean {
    return this._isConditionalDose;
  }
  @Input() set IsConditionalDose(cd: boolean) {
    this._isConditionalDose = cd;
    this.selectableSettings.enabled = cd;
  }
  @Input() set TreeViewDataContext(c: iTreeViewCollection) {
    if (c) {
      this.Count = c.array.length;
      this._TreeViewDataContext = c;
      this.DataContextChange.emit(this._TreeViewDataContext)
      // this.RemoveParentProperty();
    }
    this.cdr?.detectChanges();
  };
  get TreeViewDataContext() {
    return this._TreeViewDataContext;
  }

  @Output() DataContextChange = new EventEmitter();
  @Input() override set DataContext(c: iTreeViewCollection) {
    if (c) {
      this._TreeViewDataContext = c;
      this.DataContextChange.emit(this._TreeViewDataContext)
      // this.RemoveParentProperty();
    }
  };
  override get DataContext() {
    return this._TreeViewDataContext;
  }


  // @Input() MouseLeftButtonUp: Function | string;


  @Output() SelectedItemChange = new EventEmitter();
  _SelectedItem: CTreeListItem;
  @Input() set SelectedItem(value: CTreeListItem) {
    this._SelectedItem = value;
    this.SelectedItemChange.emit(this._SelectedItem);
  }
  get SelectedItem() {
    return this._SelectedItem;
  }

  @Input() public OnHyperLinkClick: Function | string;
  @Output() public OnHyperLinkClick_Func: EventEmitter<any> = new EventEmitter();

  // @Input() MouseLeftButtonUp: Function | string;
  // @Input() SelectedItem: object;
  @Input() Selected: Function | string;
  // @Input() TabIndex: number | string;
  // @Input() Height: number | string;
  // @Input() Width: number | string;
  // @Input() MaxHeight: number | string;
  @Input() Edited_Func: Function | string;
  @Output() public Edited: EventEmitter<any> = new EventEmitter();
  @Input() EditStarted_Func: Function | string;
  @Output() public EditStarted: EventEmitter<any> = new EventEmitter();
  // @Input() DataContext: object;
  @Input() SelectionMode: string;
  @Input() IsLoadOnDemandEnabled: boolean | string;
  @Input() IsEditable: boolean | string;

  @Input() SelectionChanged_Func: Function | string;
  @Output() SelectionChanged: EventEmitter<any> = new EventEmitter();
  private previousValue: CTreeListItem;
  private nextValue: CListItem;

  previousFilteredValue: string
  filterdarray: any[] = []
  isFocus: boolean = true;
  public subjectEventEmitterService: SubjectEventEmitterService = InjectorInstance.get<SubjectEventEmitterService>(SubjectEventEmitterService);


  // public DataContext : object;
  override _visible = true;
  override get Visibility() {
    return this._visible
  }
  override set Visibility(value: any) {
    if (value == "Visible" || value === 0 || value == "True" || value === true || typeof (value) == 'undefined') {
      this._visible = true;
    } else {
      this._visible = false;
    }
  }

  constructor(private cdr?: ChangeDetectorRef) {
    super();
  }

  public events: string[] = [];
  // public oTrVwColl: ObservableCollection<CTreeListItem[]>;

  ngOnInit(): void {
  }
  onFocus() {
    this.isFocus
  }
  onSelectionChange(e: TreeItem) {
    this.SelectedItem = e.dataItem;
    let selectionChangedEventArgs: SelectionChangedEventArgs;
    let addedItems: List = new List([e]);
    let removedItems: List = this.previousValue ? new List([this.previousValue]) : new List([]);
    selectionChangedEventArgs = new SelectionChangedEventArgs(removedItems, addedItems)
    if (this.SelectionChanged_Func instanceof Function) {
      this.SelectionChanged_Func({}, selectionChangedEventArgs);
    }
    this.SelectionChanged.emit(e);
    //   this.ExpandSingleNodeOnClick(e);
    if(!this.restrictNodeExpand){
        this.ExpandSingleNodeOnClick(e);
    }
    else {
      this.ExpandAllNodeOnClick(e);
    }
  }
  onEdited(e: any) {
    let treeEvent: RadTreeViewItemEditedEventArgs = new RadTreeViewItemEditedEventArgs()
    treeEvent.Source = e
    if (this.Edited_Func instanceof Function) {
      this.Edited_Func({}, treeEvent);
    }
    this.Edited.emit(treeEvent);
  }

  onEditStarted(e: any) {
    let treeEvent: RadTreeViewItemEditedEventArgs = new RadTreeViewItemEditedEventArgs()
    treeEvent.Source = e
    if (this.EditStarted_Func instanceof Function) {
      this.EditStarted_Func({}, treeEvent);
    }
    this.EditStarted.emit(treeEvent);
  }

  hyperLinkClick(e: any) {    
    this.previousValue = this.SelectedItem;
    let hlink: RoutedEventArgs = new RoutedEventArgs()
    hlink.Source = e;
    this._SelectedItem = e;
    if (this.OnHyperLinkClick instanceof Function) {
      this.OnHyperLinkClick({}, hlink);
    }
    this.OnHyperLinkClick_Func.emit(hlink);
  }


  onNodeClick(e) {
    if(this.allowNodeClick){
    this.hyperLinkClick(e.item.dataItem);
    }
  }

  onClick(e) {
    this.hyperLinkClick(e);
  }

  // RemoveParentProperty(){
  //   this._TreeViewDataContext['array'].forEach(trvData => {
  //     if(trvData.ParentKey == '0')
  //       trvData.ParentKey = null;

  //     if(trvData.Key !== 'string')
  //       trvData.Key = trvData.Key.toString();
  //     if(trvData.ParentKey && trvData.ParentKey !== 'string')
  //       trvData.ParentKey = trvData.ParentKey.toString();

  //     //trvData.ImageCollection = null;
  //     //trvData.IconCollection = null;
  //   });
  // }

  onSingleNodeExpand(e) {
    let _rad = new RadTreeViewItem();

    e.dataItem.Children = new ObservableCollection<CTreeListItem>();

    // Add children node(Dummy) in selectedNode
    let _cTreeListItem: CTreeListItem;
    if (!this.IsConditionalDose) {
      _cTreeListItem = (this._TreeViewDataContext.Where(i =>
        (i.ParentKey == e.dataItem.Key) && (Convert.ToString(i.Key).StartsWith('DUMMY_')))?.First());
    }

    if (_cTreeListItem) {
      e.dataItem.Children.Add(_cTreeListItem);
    }

    _rad.Item = e.dataItem;
    let _RoutedEventArgs: RoutedEventArgs = { Source: _rad };
    if (this.Expanded instanceof Function) this.Expanded({}, _RoutedEventArgs);
  }

  AddNode(value: CTreeListItem) {
    // let list = new ObservableCollection<CTreeListItem>();
    let list: iTreeViewCollection = new iTreeViewCollection();
    list.Add(value);
    this.DataContext = list;
    value.Path = this.FindPathForItem(value);
  }

  private FindPathForItem(item: CTreeListItem): string {
    if (item.ParentKey != "0" && item.ParentKey != null) {
      item.Path = this.GetParentText(item.ParentKey) + item.Value;
    }
    return item.Path;
  }

  private GetParentText(ParentKey: string): string {
    let collection: iTreeViewCollection = this.DataContext as iTreeViewCollection;
    let Path: string = "";
    for (let count = 0; count < collection.Count; count++) {
      if (collection[count].Key == ParentKey) {
        if (collection[count].ParentKey != "0" && collection[count].ParentKey != null) {
          Path += this.GetParentText(collection[count].ParentKey);
        }
        Path += collection[count].Value + "|";
        break;
      }
    }
    return Path;
  }

  DeleteNode(sKey: string) {
    this._TreeViewDataContext.forEach((tvdc, index) => {
      if (tvdc.Key == sKey) {
        this._TreeViewDataContext.RemoveAt(index);
      }
    });
  }

  public onNodeDblClick(event: NodeClickEvent): void {
    // this.isSingleClicked = false;
    if (this.IsEditable == 'true' || this.IsEditable == true || this.IsEditable == 'True') {
      this.filterdarray = []
      this.filterdarray = this._TreeViewDataContext.array.filter(x => x.Key == event.item.dataItem.Key);
      this.filterdarray[0].IsInEditMode = true;
      this.previousFilteredValue = this.filterdarray[0].Value
      this.onEditStarted(this.filterdarray[0])
    }
  }

  changingDataItem(e: any) {
    if (this.filterdarray.length > 0) {
      let value: string = e.target.value;
      this.filterdarray[0].Value = e.target.value != "" ? e.target.value : this.previousFilteredValue;
      this.filterdarray[0].IsInEditMode = false;
      this.onEdited(this.filterdarray[0]);
    }
  }

  public ResetExpansion() {
    this.expandedKeys = [];
  }
  public onExpand(key, event) {
    if (key == "single-expand") {
      this.onSingleNodeExpand(event);
    }
    if (key == "all") {
      if (this.expandedKeys == undefined) {
        this.expandedKeys = [];
      }
      this.expandedKeys = this.expandedKeys.concat(event.index);
    }
  }
  public ExpandAll() {
    let length = this.TreeViewDataContext?.array.length;
    for (let i = 0; i < length; i++) {
      this.onExpand('all', { index: i.toString(), dataItem: this.TreeViewDataContext?.array[i] });
    }
    this.cdr?.detectChanges();
  }
  ExpandSingleNodeOnClick(e:TreeItem){
    if(!e.index.toString().includes("_")){
        let index = this.expandedKeys.indexOf(e.index)
       
        if(index > -1){
            this.expandedKeys =this.expandedKeys.filter(s => s != e.index)
        }else{
        this.expandedKeys = this.expandedKeys.concat(e.index)
        }
    };
  }
  ExpandAllNodeOnClick(e) {
    
      let index = this.expandedKeys.indexOf(e.index)
      if (index > -1) {
        this.expandedKeys = this.expandedKeys.filter(s => s != e.index) //collapse
      } else {
        this.expandedKeys = this.expandedKeys.concat(e.index) // expand
        this.onSingleNodeExpand(e);
      }
    }

}
