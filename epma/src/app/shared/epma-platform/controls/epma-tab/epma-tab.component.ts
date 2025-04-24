import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ComponentRef,
  ContentChildren,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  TemplateRef,
  Type,
  ViewChild,
  ViewChildren,
  ViewContainerRef,
} from '@angular/core';
import { TabStripComponent } from '@progress/kendo-angular-layout';
import { List, ObservableCollection } from 'epma-platform/models';
import * as _ from 'lodash';
import { RadSelectionChangedEventArgs } from '../../models/appdialog.type';
import { Control } from '../Control';
import { RoutedEventArgs } from '../FrameworkElement';
import { iTabItem } from '../epma-tabitem/epma-tabitem.component';

@Component({
  selector: 'iTab',
  templateUrl: './epma-tab.component.html',
  styleUrls: ['./epma-tab.component.css'],
})
export class iTab
  extends Control
  implements OnInit, AfterViewInit, AfterContentInit {
  @ViewChild('tabItemHost', { read: ViewContainerRef })
  container: ViewContainerRef;
  @ViewChild('tabstrip') public tabstrip: TabStripComponent;
  @ViewChildren('tabHosts', { read: ViewContainerRef })
  hosts!: QueryList<ViewContainerRef>;
  @Input() PreviewSelectionChanged: Function | string;
  SelectedItem: any;
  @Input() TabselectbasedonText : boolean = false;
  @Input() SelectionChanged: Function | string;
  @Input() Loaded: Function | string;
  // @Input() ItemsSource: any
  public CallbackFunc: Function | string

  @Input() defaultOnTabselect: boolean = false;
  private RemoveOnTabSelect:boolean = false;
  @Input() public SelectionChangedOnTabClick : boolean = false;

  override _ItemsSource: ObservableCollection<iTabItem> | any = new ObservableCollection<iTabItem>();
  public override get ItemsSource(): any {
    return this._ItemsSource;
  }
  @Input() override set ItemsSource(val: any) {
    this._ItemsSource = val;
  }
  public sIndex = -1;
  itabs: iTabItem[] = [];
  @ContentChildren(iTabItem) iTabItems: QueryList<iTabItem>;

  @Output() PreviewSelectionChanged_Func = new EventEmitter();
  @Output() SelectionChanged_Func = new EventEmitter();
  @Output() Loaded_Func = new EventEmitter();

  @Input() ScrollContentEnabled: boolean = false;
  _MaxScrollHeight;
  @Input() set MaxScrollHeight(value: any){
    if(this.ScrollContentEnabled && !String.IsNullOrEmpty(value)){
      // this.style.MaxHeight = value + "px";
      this._MaxScrollHeight = value;
    }
  }
  constructor(private ref: ChangeDetectorRef) {
    super();
    super.controlType = 'iTab';
  }

  get AllItems(): iTabItem[] {
    if (this.iTabItems?.length > 0) {
      if (this.ItemsSource.array?.length > 0) {
        return [...this.iTabItems, ...this.itabs, ...this.ItemsSource.array];
      } else {
        return [...this.iTabItems, ...this.itabs];
      }
    } else {
      if (this.ItemsSource.array?.length > 0) {
        return [...this.itabs, ...this.ItemsSource.array]
      } else {
        return this.itabs;
      }
    }
  }

  _Selectedkey: string;
  get SelectedKey() {
    let selectedItem: iTabItem = this.AllItems[this.sIndex];
    if (selectedItem) {
      return selectedItem.Key;
    } else {
      return '';
    }
  }

  get SelectedIndex() {
    return this.sIndex;
  }

  _SelectedContent: any;
  get SelectedContent() {
    let selectedItem: iTabItem = this.AllItems[this.sIndex];
    if (selectedItem) {
      return selectedItem.Content;
    } else {
      return '';
    }
  }

  @Input() set SelectedKey(value: string) {
    this.AllItems.forEach((tabItem, index) => {
      if (tabItem.Key === value) {
        this.sIndex = index;
        tabItem.IsSelected = true;
      } else {
        tabItem.IsSelected = false;
      }
    });
  }

  _SelectedIndex: number;
  @Input() set SelectedIndex(value: number) {
    this.sIndex = value;
    this.AllItems.forEach((tabItem, index) => {
      if (index === value) {
        tabItem.IsSelected = true;
      } else {
        tabItem.IsSelected = false;
      }
    });
  }

  @Input() set SelectedContent(value: any) {
    this._SelectedContent = value;
  }

  _KeepTabContent: boolean = false;
  get KeepTabContent(): boolean {
    return this._KeepTabContent;
  }

  @Input() set KeepTabContent(value: boolean) {
    this._KeepTabContent = value;
  }

  ngOnInit(): void {
    this.checkItemSource();
  }

  checkItemSource() {
    if (this.ItemsSource && this.ItemsSource.length > 0) {
      let item = new iTabItem();
      item.Header = this.ItemsSource[0].Header;
      item.IsSelected = this.ItemsSource[0].isSelect;
      item.contentTemplateAtRunTime = this.ItemsSource[0].content;
      this.itabs.push(item);
      return item;
    } else {
      return 0;
    }
  }

  public Items = {
    Add: (i: iTabItem) => {
      let tabIndexFound = -1;
      this.findHostsObj.find((element, index) => {
        if (element.Key === i.Key) {
          element.Replace = true;
        }
      });
      this.itabs.find((element, index) => {
        if (element.Key === i.Key) {
          tabIndexFound = index;
        }
      });
      if (tabIndexFound > -1) {
        this.itabs.splice(tabIndexFound, 1, i);
      } else {
        let previousSelectedTab;
        let tabLength = 0;
        if (i.IsSelected) {
          if (this.iTabItems && this.iTabItems.length > 0) {
            tabLength = this.iTabItems.toArray().length + this.itabs.length;
            previousSelectedTab = (
              this.iTabItems?.length > 0
                ? [...this.iTabItems, ...this.itabs]
                : this.itabs
            ).find((element) => element.IsSelected === true);
          } else {
            tabLength = this.itabs.length;
            previousSelectedTab = this.itabs.find(
              (element) => element.IsSelected === true
            );
          }
          if (previousSelectedTab) {
            previousSelectedTab.IsSelected = false;
          }
          this.sIndex = tabLength;
        } else {
          if (this.iTabItems && this.iTabItems.length > 0) {
            tabLength = this.iTabItems.toArray().length + this.itabs.length;
          } else {
            tabLength = this.itabs.length;
          }
          this.sIndex = tabLength;
        }
        this.itabs.push(i);
        this.Items.Count = tabLength + 1;
        this.Items[tabLength] = this.itabs[this.itabs.length - 1];
      }
    },
    Count: 0,
    IndexOf: (value) => {
      return this.AllItems.indexOf(value);
    },
    Clear: () => {
      for (let i = 0; i < this.Items.Count; i++) {
        this.Items[i] = null;
      }
      this.itabs = [];
      this.iTabItems = null;
      this.Items.Count = 0;
    },
    RemoveAt: (indexAt) => {
      if (indexAt < this.Items.Count && indexAt >= 0) {
        let array = [];
        if (this.iTabItems && this.iTabItems.length > 0) {
          this.iTabItems.forEach((tabItem, index) => {
            if (index !== indexAt) {
              array.push(tabItem);
            }
          });

          this.iTabItems = array as any as QueryList<iTabItem>;
          [this.iTabItems].slice(indexAt, 1);
        }

        if (this.itabs.length > 0 && this.itabs[0].HeaderTxt == this.Items[indexAt].HeaderTxt)
          this.itabs = [];
        if (indexAt < this.Items.Count - 1) {
          for (let i = 0; i < this.Items.Count - 1; i++) {
            if (i == indexAt) {
              this.Items[indexAt] = this.Items[indexAt + 1];
            }
            else if (indexAt < i) {
              this.Items[i] = this.Items[i + 1];
            }
          }
          delete this.Items[this.Items.Count - 1];
        } else if (indexAt == this.Items.Count - 1) {
          delete this.Items[indexAt];
        }
        this.Items.Count = this.Items.Count - 1;
      }
      else {
        return;
      }
    },
    RemoveTab: (indexAt) => {
      if (indexAt < this.Items.Count && indexAt >= 0) {
        let array = [];
        if (this.iTabItems && this.iTabItems.length > 0) {

          this.iTabItems = array as any as QueryList<iTabItem>;
          [this.iTabItems].slice(indexAt, 1);
        }
        if (this.itabs && (this.itabs.length > 0 || this.itabs.length <= indexAt)) {
          this.itabs.splice(indexAt, 1);
        }
        if (indexAt < this.Items.Count - 1) {
          for (let i = 0; i < this.Items.Count - 1; i++) {
            if (i == indexAt) {
              this.Items[indexAt] = this.Items[indexAt + 1];
            }
            else if (indexAt < i) {
              this.Items[i] = this.Items[i + 1];
            }
          }
          delete this.Items[this.Items.Count - 1];
        } else if (indexAt == this.Items.Count - 1) {
          delete this.Items[indexAt];
        }
        this.Items.Count = this.Items.Count - 1;
      }
      else {
        return;
      }
      this.RemoveOnTabSelect = true;
    },
    findByKey: (predicate) => {
      let itemIndex;
      this.AllItems.find((element, index) => {
        if (element.Key === predicate) {
          this.SelectedIndex = index;
          this.SelectedKey = element.Key;
          this.SelectedContent = element.ref;
          itemIndex = index;
        }
      });
      return itemIndex;
    },
    findByHeader: (predicate) => {
      let itemIndex;
      this.AllItems.find((element, index) => {
        if (element.Header === predicate) {
          this.SelectedIndex = index;
          this.SelectedKey = element.Key;
          this.SelectedContent = element.ref;
          itemIndex = index;
        }
      });
      return itemIndex;
    },
  };

  public async AddTabItem(
    key: string,
    name: string,
    control: any,
    bSelected: boolean,
    tooltip: string,
    AccessKey?: string,
    CallbackFunction?: Function | string
  ): Promise<any> {
    let item = new iTabItem();
    item.Parent = this;
    item.Key = key;
    item.Header = name;
    item.IsSelected = bSelected;
    item.contentTemplateAtRunTime = control;
    item.ToolTip = tooltip;
    this.CallbackFunc = CallbackFunction;
    this.Items.Add(item);
    return new Promise<string>(resolve => {
      //revist required for unsubscription
      item.Loaded.subscribe((ret) => {
        resolve(ret);
      })
      /* setinterval needs to be revisited */
      // let settingInterval = setInterval(() => {
      //   if (item.ref) {
      //     clearInterval(settingInterval);
      //     resolve(item.ref);
      //   }
      // }, 100);
    });
  }
  public prevEvent;
  @Output() public referenceChanged = new EventEmitter();
  onTabSelect(e: any) {
    let tab;
    try {
      // if (this.SelectedIndex &&  e.index && this.SelectedIndex == e.index ) return;
      if (this.prevEvent) {
        if(this.prevEvent.index && this.RemoveOnTabSelect){
          this.AllItems.forEach((tabItem, inx) => {
            if (tabItem.HeaderTxt == this.prevEvent.title) {
              if(inx != this.prevEvent.index){
                this.prevEvent.index = inx;
              }
            } 
          });
        }
        tab = this.itabs[this.prevEvent.index];
        if (tab && tab.ref && tab.contentTemplateAtRunTime != tab.ref)
          tab.contentTemplateAtRunTime = tab.ref;
      }
      
      if(this.TabselectbasedonText){
        this.AllItems.forEach((tabItem, inx) => {
          if (tabItem.HeaderTxt == e.title) {
            e.index = inx ;
          } 
        });
      }
      let addedItems: List = new List([this.AllItems[e.index]]);
      let removedItems: List = new List([]);
      if (this.prevEvent) {
        let prevTab = this.AllItems[this.prevEvent.index];
        removedItems = new List([prevTab])
      }
      // let removedItems: List = this.prevEvent && this.prepareRemovedItems ? new List([prevTab]) : new List([]);
      let RadSelectionChangedEventArg: RadSelectionChangedEventArgs = new RadSelectionChangedEventArgs(removedItems, addedItems);
      if (this.prevEvent?.index != e.index) {
        this.prevEvent = e;
      }
      this.SelectedIndex = e.index;
      
      if(this.KeepTabContent != true)
      {
        if (this.PreviewSelectionChanged instanceof Function) this.PreviewSelectionChanged(this, RadSelectionChangedEventArg);
        this.PreviewSelectionChanged_Func.emit(this);
        this.InvokeSelectionChanged(RadSelectionChangedEventArg);
        if (this.Loaded instanceof Function) this.Loaded(this, RadSelectionChangedEventArg);
        this.Loaded_Func.emit(this);
      }
      else
      {
        this.InvokeSelectionChanged(RadSelectionChangedEventArg);
        if (this.Loaded instanceof Function) this.Loaded(this, RadSelectionChangedEventArg);
        this.Loaded_Func.emit(this);
        if (this.PreviewSelectionChanged instanceof Function) this.PreviewSelectionChanged(this, RadSelectionChangedEventArg);
        this.PreviewSelectionChanged_Func.emit(this);
      }
      // e.prevented = true;
      // e.stopPropagation();
      
    } catch (e) {
      console.log("Error in ontabselect", e, (new Date()).getTime())

    }
    if (tab && this.referenceChanged) {
      this.referenceChanged.emit(tab);
    }
  }

  private InvokeSelectionChanged(RadSelectionChangedEventArg: any) {
    if (this.SelectionChanged instanceof Function) this.SelectionChanged(this, RadSelectionChangedEventArg);
    let _RoutedEventArgs: RoutedEventArgs = { Source: RadSelectionChangedEventArg };

    this.SelectionChanged_Func.emit(_RoutedEventArgs);
  }

  HasItems(): boolean {
    return this.Items && this.Items.Count > 0 ? true : false;
  }

  GetItem(tabkey: string): iTabItem {
    let item = this.AllItems.find((element) => element.Key === tabkey);
    return item;
  }

  public Click(sKey: string, bRef: boolean): void {
    this.tabstrip.selectTab(this.Items.findByKey(sKey));
    if(this.SelectionChangedOnTabClick){
      let item= this.GetItem(sKey);
      if(item){
        let e = {index:this.Items.findByKey(sKey),prevented:false,title:item.HeaderTxt}
        this.ClickInvokeSelectionChanged(e);
      }
    }
  }

  public ClickInvokeSelectionChanged(e){
    let addedItems: List = new List([this.AllItems[e.index]]);
    let removedItems: List = new List([]);
    if (this.prevEvent) {
      let prevTab = this.AllItems[this.prevEvent.index];
      removedItems = new List([prevTab])
    }
    
    let RadSelectionChangedEventArg: RadSelectionChangedEventArgs = new RadSelectionChangedEventArgs(removedItems, addedItems);
    if (this.prevEvent?.index != e.index) {
      this.prevEvent = e;
    }
    this.InvokeSelectionChanged(RadSelectionChangedEventArg);
  }

  public ClickTab(TabItem: string, bRef: boolean): void {
    this.tabstrip.selectTab(this.Items.findByHeader(TabItem));
  }

  ngAfterContentInit() {
    for (var i = 0; i < this.iTabItems.toArray().length; i++) {
      let iTbItms = this.iTabItems.toArray()[i];
      iTbItms.Key = 'Unknown';
      iTbItms.ref = '';
      iTbItms.ToolTip = iTbItms.Header;
      if (iTbItms.IsSelected) {
        this.sIndex = i;
      }
      let s = `${i}`;
      this.Items[s] = iTbItms;
    }
    this.Items.Count = this.iTabItems.length + this.itabs.length;
  }

  private findHostsObj = [];
  ngAfterViewInit() {
    let e: any = {};
    // this.InvokeSelectionChanged(e);
    this.hosts.changes.subscribe((r) => {
      let i = 0;
      let compRefs: ComponentRef<any>[] = [];


      this.hosts.map((p) => {
        // debugger;
        if (this._KeepTabContent) {
          let findObj = this.findHostsObj.find(
            (e) => e.Header == p.element.nativeElement.id
          );
          if (findObj) {
            if (findObj.Replace) {
              findObj.Replace = false;
              i = this.createComponentForTabItem(p, i);
            } else {
              if (this.CallbackFunc instanceof Function) {
                this.CallbackFunc(findObj.Content);
              }
              if (findObj.Loaded) {
                findObj.Loaded.emit(findObj.ref);
              }
            }
          } else {
            i = this.createComponentForTabItem(p, i);
          }
        } else {
          i = this.createComponentForTabItem(p, i);
        }
      });
    });
  }
  tabContentRefreenceCallBack: Function;
  private createComponentForTabItem(p: ViewContainerRef, i) {
    let tab2: any;
    let tab: iTabItem = this.itabs.find(
      (e) => p.element.nativeElement.id == e.Header,
    );
    if (tab) {
      p['tabKey'] = tab.Header;
    }
    if (this.ItemsSource.array) {
      tab2 = this.ItemsSource?.array.find(
        (e) => p.element.nativeElement.id == e.Header
      );
    }
    if (tab == undefined) {
      tab2['contentTemplateAtRunTime'] = tab2['Content'];
      tab = tab2;
    }
    _.remove(this.findHostsObj, (findHost) => findHost.Header == p.element.nativeElement.id);
    // debugger;
    let content = tab.contentTemplateAtRunTime;
    if (content) {
      type T = typeof content;
      let componentType: Type<T> = content.__proto__.constructor as Type<T>;
      let compref: ComponentRef<T> = p.createComponent<T>(componentType);
      tab.ref = compref.instance;
      tab.ref.Parent = tab;
      tab.Content = compref.instance;
      for (var property in content) {
        if(property != "changeDetectorRef")
        tab.ref[property] = content[property];
      }
      if (this.CallbackFunc instanceof Function) {
        this.CallbackFunc(tab.Content);
      }
    }
    i++;
	    this.ref?.detectChanges();
    if (this.tabContentRefreenceCallBack && this.tabContentRefreenceCallBack instanceof Function) {
      this.tabContentRefreenceCallBack(tab.Key, tab.Content);
    }
    if (tab.Loaded) {
      tab.Loaded.emit(tab.ref);
    }
    this.findHostsObj.push(tab);
    if (tab.IsSelected) {
      let eventObj = { index: 0, prevented: false, title: "" };

      // Discharge Medication Page - Below snippet of code is to Load the content for the selected tab... Esakki/Khizar/Munavar fix.
      if (this.Items.Count == 0 && this.ItemsSource?.array.length > 0) {
        for (let i = 0; i < this.ItemsSource.array.length; i++) {
          if (this.ItemsSource.array[i].Key == tab.Key) {
            eventObj.index = i;
            eventObj.title = this.ItemsSource.array[i].HeaderTxt;
            if (this.defaultOnTabselect)
              this.onTabSelect(eventObj);
          }
        }
      }
      for (let i = 0; i < this.Items.Count; i++) {
        if (this.Items[i].Key == tab.Key) {
          eventObj.index = i;
          eventObj.title = this.Items[i].HeaderTxt;
          if (this.defaultOnTabselect)
            this.onTabSelect(eventObj);
        }
      }
    }
    return i;
  }


  NullifyiTabItemContentReference(TabItemKey: string) {
    this.hosts.map((p) => {
      if (p['tabKey'] == TabItemKey) {
        p.clear();
      }
      // let tab: iTabItem = this.itabs.find(
      //   (e) => p.element.nativeElement.id == e.Header
      // );
    })

  }
}

export interface iTabComponentArgs {
  content: string | Function | TemplateRef<any>;
  Header: string;
  isSelect: boolean;
}

// export class List<T = unknown> {
//   public Add(item: T): void {}
// }
export class Collection<T = unknown> {
  public Add(item: T): void { }
}
export interface INotifyPropertyChanged {
  PropertyChanged: PropertyChangedEventHandler;
}

export interface PropertyChangedEventHandler {
  sender: object;
  e: PropertyChangedEventArgs;
}
export interface PropertyChangedEventArgs {
  PropertyChangedEventArgs?: string;
  PropertyName: string;
}

export interface INotifyCollectionChanged {
  CollectionChanged: NotifyCollectionChangedEventHandler;
}

export interface NotifyCollectionChangedEventHandler {
  sender: string;
  e: NotifyCollectionChangedEventArgs;
}
export interface NotifyCollectionChangedEventArgs {
  NotifyCollectionChangedEventArgs: string;
}
