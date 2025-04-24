import { Component, EventEmitter, Input, Output } from '@angular/core';
import { iCheckedListbox } from 'epma-platform/controls';

@Component({
  selector: 'iListBox',
  templateUrl: './epma-ilistbox.component.html',
  styleUrls: ['./epma-ilistbox.component.css']
})
export class iListBox extends iCheckedListbox {

  constructor() {
    super();
  }
  public static ItemsSourceProperty = 'ItemsSource';

  @Output() SelectionChanged = new EventEmitter();
  @Input() SelectionChanged_Func: Function | string;

  SelectionChangedValue(value: any) {
    let index = this.listbox.selectedIndex;
    let idxSelItem = this.ItemsSource.array[index];
    idxSelItem.IsSelected = true;
    this._SelectedItem = idxSelItem;
    this._SelectedIndex = index;
    if (this.SelectionChanged_Func && this.SelectionChanged_Func instanceof Function)
      this.SelectionChanged_Func(this);
    this.SelectionChanged.emit(value)
  }
  ngDoCheck() {
    this.DetectChange();
  }
}
