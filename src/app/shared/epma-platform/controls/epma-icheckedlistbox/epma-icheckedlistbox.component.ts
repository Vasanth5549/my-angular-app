import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ListBoxComponent } from '@progress/kendo-angular-listbox';
import { InjectorInstance } from 'src/app/app.module';
import { List } from '../../models/list';
import { CListItem } from '../../models/model';
import { ObservableCollection } from '../../models/observable-collection';
import { AccessKeyService } from '../AccessKey.service';
import { Control, OnSelectEventArgs, OnUnSelectEventArgs } from '../Control';

@Component({
  selector: 'iCheckedListBox',
  templateUrl: './epma-icheckedlistbox.component.html',
  styleUrls: ['./epma-icheckedlistbox.component.css'],
})
export class iCheckedListbox extends Control implements OnInit {
  public accessKeyService: AccessKeyService;
  constructor() {
    super();
  }

  @ViewChild(ListBoxComponent, { static: false })
  public listbox: ListBoxComponent;

  @ViewChild(ListBoxComponent) public listboxControl: ListBoxComponent;
  _SelectedIndices: List<number>;
  get SelectedIndices() {
    let _indices = new List<number>;
    if (this._iSelectionMode == 'Single') {
      _indices.Add(this.listbox.selectedIndex);
    }
    else {
      for (let i = 0; i < this.ItemsSource.array.length; i++) {
        if (this.ItemsSource.array[i].IsSelected == true) {
          _indices.Add(i);
        }
      }
    }
    return _indices;
  }
  @Output() SelectedIndexChange = new EventEmitter();

  _SelectedIndex: number;
  get SelectedIndex() {
    return this._SelectedIndex;
  }
  @Input() set SelectedIndex(value: number) {
    if (value < this.ItemsSource.array.length) {
      this._SelectedIndex = value;
      let idxSellItem = this.ItemsSource.array[value];
      idxSellItem.IsSelected = true;
      this.SelectedItem = idxSellItem;
      this.listbox.selectItem(value);
      this.SelectedIndexChange.emit(this._SelectedIndex);
    }
  }

  _iSelectionMode: string;
  _SelectionMode: string | SelectionMode;
  get SelectionMode() {
    if (typeof this._SelectionMode == 'string') {
      this._iSelectionMode = this._SelectionMode.toLowerCase();
      return this._SelectionMode.toLowerCase();
    } else {
      if (this._SelectionMode == 'Single') {
        return 'single';
      }
      else {
        return 'multiple';
      }
    }
  }
  @Input() set SelectionMode(value: string | SelectionMode) {
    this._SelectionMode = value;
  }

  @Input() OnUnSelect: Function | string;
  @Input() OnSelect: Function | string;

  _DisplayMemberPath: string;
  get DisplayMemberPath() {
    return this._DisplayMemberPath;
  }
  @Input() set DisplayMemberPath(value: string) {
    this._DisplayMemberPath = value;
  }

  @Output() SelectedItemsChange = new EventEmitter();
  _SelectedItems = new ObservableCollection<CListItem>();
  public get SelectedItems(): ObservableCollection<CListItem> {
    return this._SelectedItems;
  }
  @Input() set SelectedItems(value: ObservableCollection<CListItem>) {
    this._SelectedItems = value;
  }

  _iSelectedItems;
  public get iSelectedItems(): Array<CListItem> {
    return this._iSelectedItems;
  }
  @Input() set iSelectedItems(value) {
    this._iSelectedItems = value;
    this._SelectedItems = new ObservableCollection(value);
  }

  @Output() SelectedItemChange = new EventEmitter();
  _SelectedItem: CListItem;
  _UnSelecteItem: CListItem;

  @Input() set SelectedItem(value: CListItem) {
    //this._SelectedItem = value;
    this._SelectedItem = value;
    this.SelectedItemChange.emit(this._SelectedItem);
  }
  get SelectedItem() {
    return this._SelectedItem;
  }

  ngOnInit(): void {
    this.accessKeyService = InjectorInstance.get<AccessKeyService>(AccessKeyService);
  }

  AddItem(value: CListItem) {
    this.ItemsSource.Add(value);
  }
  GetText(idx: number) {
    if (idx < this.ItemsSource.array.length) {
      return this.ItemsSource.array[idx].DisplayText;
    } else {
      return undefined;
    }
  }

  GetValue(idx: number): string {
    if (idx < this.ItemsSource.array.length) {
      return this.ItemsSource.array[idx].Value;
    } else {
      return undefined;
    }
  }

  handleActionClick(e) {
    let index = e.index;
    this._SelectedItems.Clear();
    this.ItemsSource.array.forEach((x, i) => {
      if (i == index) {
        this._SelectedIndex = index;
        if (x.IsSelected == undefined || x.IsSelected == false) {
          this._SelectedItem = x;
          x.IsSelected = true;
          let _OnSelectEventArgs: OnSelectEventArgs = new OnSelectEventArgs();
          _OnSelectEventArgs.Value = x?.Value;
          _OnSelectEventArgs.Text = x?.DisplayText;
          if (this.OnSelect instanceof Function) this.OnSelect({}, _OnSelectEventArgs);
        } else {
          this._UnSelecteItem = x;
          x.IsSelected = false;
          let _OnUnSelectEventArgss: OnUnSelectEventArgs = new OnUnSelectEventArgs();
          _OnUnSelectEventArgss.Value = x?.Value;
          _OnUnSelectEventArgss.Text = x?.DisplayText;
          if (this.OnUnSelect instanceof Function) this.OnUnSelect({}, _OnUnSelectEventArgss);
        }
      }
      if (x.IsSelected) {
        this._SelectedItems.Add(x);
      }
    });
    this.SelectedItemsChange.emit(this._SelectedItems);
  }
}

export enum SelectionMode {
  Single = 'Single',
  Multiple = 'Multiple',
  Extended = 'Extended',
}
