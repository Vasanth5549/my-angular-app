import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MultiSelectComponent } from '@progress/kendo-angular-dropdowns';
import { CListItem } from 'epma-platform/models';
import { ObservableCollection } from '../../models/observable-collection';
import { Control } from '../Control';
import { TooltipDirective } from '@progress/kendo-angular-tooltip';

@Component({
  selector: 'iMultiSelectDropDown',
  templateUrl: './epma-imultiselectdropdown.component.html',
  styleUrls: ['./epma-imultiselectdropdown.component.css'],
})
export class iMultiSelectDropdown extends Control implements OnInit {
  public static ItemsSourceProperty = 'ItemsSource';
  public static IsEnabledProperty = 'IsEnabled';
  public static VisibilityProperty = 'Visibility';
  public static SelectionItemProperty = "SelectedItems"

  constructor() {
    super();
  }
  @ViewChild(TooltipDirective) public tooltipDir: TooltipDirective;
  @ViewChild(MultiSelectComponent) public multiSelectComponent: MultiSelectComponent;
  @ViewChild('multiselect', { static: true }) public multiselect: any;
  @Output() SelectedItemsChange = new EventEmitter();
  // @Output() ItemsSourceChange = new EventEmitter();
  // @Input() ItemsSource: ObservableCollection<CListItem> =
  //   new ObservableCollection<CListItem>();

  mouseevent(toolTipTempRef: Element, tooltipShow) {
    if (tooltipShow) {
      this.tooltipDir.show(toolTipTempRef);
    } else {
      this.tooltipDir.hide();
    }
  }

 override Focus(): void {
    this.multiSelectComponent.focus();
  }

  _LinkText = '';
  public get LinkText(): string {
    return this._LinkText;
  }
  @Input() set LinkText(value: string) { }

    public get tooltipText(): string {
    let ttext = '';
    if (this.SelectedItems && this.SelectedItems.Count > 0) {
      this._SelectedItems.forEach((element) => {
        ttext += element.DisplayText + '/' + '\n';
      });
      if (ttext.length > 0) {
        ttext = ttext.substring(0, ttext.length -2);
      }
    }else{
      ttext = this.ToolTip;
    }
    return ttext;
  }


  _SelectedItems = new ObservableCollection<CListItem>();
  public get SelectedItems(): ObservableCollection<CListItem> {
    return this._SelectedItems;
  }
  @Input() set SelectedItems(value: ObservableCollection<CListItem>) {
    if (value && value instanceof ObservableCollection) {
      //      this._SelectedItems = value;
      // this.ItemsSource.forEach(element => {
      //   if (element.IsSelected == null || element.IsSelected) {
      //     if (element.PropertyChanged && element.IsSelected == true) {
      //       element.PropertyChanged(element);
      //     }
      //     element.IsSelected = false;
      //   }
      // });


      // this.ItemsSource.forEach(element => {
      //   element.IsSelected = false;
      // });

      // this.ItemsSource.forEach(element => {
      //   value.forEach(val => {
      //     if (element.Value == val.Value) {
      //       element.IsSelected = true;
      //       val.IsSelected = true;
      //       if (element.PropertyChanged && element.PropertyChanged instanceof Function) {
      //               element.PropertyChanged(element);
      //       }
      //     }
      //   });
      // });     


      // value.forEach((element) => {
      //   var Matched: boolean = false;
      //   let MatchedItem = this._SelectedItems.array.find((val) => {
      //       val.Value == element.Value
      //   });
      //   if (!MatchedItem){
      //     if (element.PropertyChanged && element.PropertyChanged instanceof Function) {
      //         element.IsSelected = true;
      //         element.PropertyChanged(element);
      //     }
      //   }
      // });  

      // this.SelectedItems.forEach((element) => {
      //   var Matched: boolean = false;
      //   let MatchedItem = value.array.find((val) => {
      //       val.Value == element.Value
      //   });
      //   if (!MatchedItem){
      //     if (element.PropertyChanged && element.PropertyChanged instanceof Function) {
      //       element.IsSelected = false;
      //                      element.PropertyChanged(element);
      //     }
      //   }
      // });  

      // value.forEach((element) => {
      //   if (element.PropertyChanged && element.PropertyChanged instanceof Function) {
      //   element.PropertyChanged(element);
      //   }
      // });

      this._SelectedItems = value;

      // this._iSelectedItems = value.array;
    }
    // this.SelectedItemsChange.emit(this._SelectedItems);
  }


  // _iSelectedItems;
  // public get iSelectedItems(): Array<CListItem> {
  //   return this._iSelectedItems;
  // }
  // @Input() set iSelectedItems(value) {
  //   this._iSelectedItems = value;
  //   this._SelectedItems = new ObservableCollection(value);

  //   this.ItemsSource.forEach(element => {
  //     if (element.IsSelected == null || element.IsSelected) {
  //       element.IsSelected = false;
  //     }
  //   });

  //   this.ItemsSource.forEach(element => {
  //     value.forEach(val => {
  //       if (element.Value == val.Value) {
  //         element.IsSelected = true;
  //         val.IsSelected = true;
  //       }
  //     });
  //   });
  //   // this.SelectedItemsChange.emit(this._SelectedItems);
  // }


  ngModelChangeEvent(e) {
    // this.ItemsSource.forEach(element => {
    //   if (element.IsSelected == null || element.IsSelected) {
    //     element.IsSelected = false;
    //   }
    // });

    let eCount = e.Count();
    let ItemSourceSelectedCount = this.ItemsSource.Where(s => s.IsSelected).Count();
    if (eCount > ItemSourceSelectedCount) {
      this.ItemsSource.forEach(element => {
        e.forEach(val => {
          if (element.Value == val.Value) {
            if (element.PropertyChanged && (element.IsSelected == undefined || element.IsSelected == false)) {
              element.IsSelected = true;
              val.IsSelected = true;
              element.PropertyChanged(element);
              this._SelectedItems = new ObservableCollection(e);
              this.SelectedItemsChange.emit(this._SelectedItems);
            }
          }
        });
      });
    }
    else if (eCount < ItemSourceSelectedCount) {
      this.ItemsSource.forEach(element => {
        let Matched = false;
        e.forEach(val => {
          if (element.Value == val.Value) {
            Matched = true;
          }
        });
        if (element.IsSelected && Matched == false) {
          element.IsSelected = false;
          element.PropertyChanged(element);
          this._SelectedItems = new ObservableCollection(e);
          this.SelectedItemsChange.emit(this._SelectedItems);
        }
      });
    }
    this.assignViewToModel(this._SelectedItems,iMultiSelectDropdown.SelectionItemProperty);
  }


  public LoadEvents() { }
  public UnLoadEvents() { }

  ngDoCheck() {
    this.DetectChange();
  }

  ngOnInit(): void {
    if (this.ItemsSource && this.ItemsSource.Length > 0) {
      this.ItemsSource.forEach(element => {
        if (element.IsSelected == null) {
          element.IsSelected = false;
        }
      });
    }
  }

  onblur() {
    this.multiSelectComponent.toggle(false);
    this.isEmailDropDownOpen = false;
  }

  public isEmailDropDownOpen: boolean = false;
  public get isDropdown() {
    if (this.isEmailDropDownOpen) {
      return true;
    }
    else {
      return false;
    }
  }


 


  active: boolean = false;
  public onDropDownArrowClick(testSelect: any) {
    if (this.isEmailDropDownOpen) {
      testSelect.toggle(false);
      this.isEmailDropDownOpen = false;
    } else {
      testSelect.toggle(true);
      this.isEmailDropDownOpen = true;
    }
    this.active = !this.active;
  }


  public onOpen(e?): void {
    e.preventDefault();
  }


  public onClose(): void {
    this.isEmailDropDownOpen = false;
  }

  TriggerKeyDownEvent(e) {
    e.keyCode = 0
  }

}
