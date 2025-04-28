import { AfterContentInit, AfterViewInit, ChangeDetectorRef, Component, ContentChild, DoCheck, EventEmitter, Input, Output, QueryList, ViewChildren } from '@angular/core';
import { GridExtension, iGridViewDataColumn } from '../grid-extension';
import { iComboBox, iLabel, iTextBox, iTimeBox } from 'epma-platform/controls';
import * as _ from 'lodash';

@Component({
  selector: 'GridCellTemplate',
  templateUrl: './grid-cell-template.component.html',
  styleUrls: ['./grid-cell-template.component.css'],
})
export class GridCellTemplateComponent implements AfterViewInit, AfterContentInit, DoCheck {
  public cellEditingGrid: GridExtension = new GridExtension();
  @Input() column?: any;
  @Input() cell: string;
  @Input() dataItem: any;
  @Input() isEditable: boolean;
  @Input() columnNumber: number;
  @Input() EditableControlRef?: iTimeBox | iComboBox | iTextBox;
  @Input() IsEnabled?: boolean = true;
  @Input() AutoFocusOnlyControl?: boolean = false;
  @Input() IsInsideDynamicColumn?: boolean = false;
  @Input() GridHelper?: GridExtension;
  @Input() RowIndex?: number;
  @Input() IsTechValidate?: boolean = false;

  @Output() emitEditableClick = new EventEmitter<any>();

  @ContentChild(iLabel) iLabelChild: iLabel;
  @ViewChildren(iLabel) iLabelCollection: QueryList<iLabel>;

  private _IsDisabled: boolean = false;
  get IsDisabled(): boolean {
    return this._IsDisabled;
  }

  @Input() set IsDisabled(value: boolean) {
    this._IsDisabled = value;
    if (this.iLabelChild) this.iLabelChild.IsEnabled = !value;
  }

  public ToolTip ;

  _DataContext: any;
  get DataContext() {
    return this._DataContext;
  }
  @Input() set DataContext(value: any) {
    this._DataContext = value;
  }

  private _Content: any;
  public get Content(): any {
    return this._Content;
  }
  @Input() set Content(val: any) {
    this._Content = val;
  }
  private _title: any;
  public get title(): any {
    return this._title;
  }
  @Input() set title(val: any) {
    this._title = val;
    this.ToolTip = this._title;
  }
  icolumn: iGridViewDataColumn = new iGridViewDataColumn();
  MakeFullHeight: boolean = false;
  MakeFullHeightCollection = [];
  CellHeightCollection = [];

  constructor(private cd: ChangeDetectorRef) {}

  ngDoCheck(): void {
    if (!this.IsInsideDynamicColumn) {
      if (this.iLabelChild && this.iLabelChild.Text) {
        this.MakeFullHeight = false;
      }
      else { if (this.IsTechValidate) this.MakeFullHeight = true; }
    }
  }

  ngAfterViewInit() {
    if (this.IsInsideDynamicColumn && this.Content?.Child?.constructor?.name == 'StackPanel') {
      let labels = this.Content?.Child?.Children;
      let labelCollection = [];
      for (let key in labels) {
        let value = labels[key];
        if (value.constructor.name == 'iLabel') {
          labelCollection.push(value);
        }
      }

      labelCollection.forEach((label) => {
        if (label && label.Text == " ") {
          this.MakeFullHeightCollection.push({isFullHeight: true, col: this.columnNumber});
        }
        if (label && label.Text && label.Text != " ") {
          this.MakeFullHeightCollection.push({isFullHeight: false, col: this.columnNumber});
        }
      });

      let groupedCollection =  _.groupBy(this.MakeFullHeightCollection, 'col');
      if (groupedCollection[this.columnNumber].length == 1) {
        this.CellHeightCollection.push({col: this.columnNumber, height: groupedCollection[this.columnNumber][0].isFullHeight})
      }
      if (groupedCollection[this.columnNumber].length > 1) {
        this.CellHeightCollection.push({col: this.columnNumber, height: this.GetData(groupedCollection[this.columnNumber])});
      }
      this.cd.detectChanges();
    }
  }

  private GetData(collection): boolean {
    return collection.some(item => item.isFullHeight == true);
  }

  ngAfterContentInit(): void {
    if (!this.IsInsideDynamicColumn) {
      if (this.iLabelChild && (!this.iLabelChild.Text || this.iLabelChild.Text == "")) {
        this.MakeFullHeight = true;
      }
      else {
        this.MakeFullHeight = false;
      }
      this.cd.detectChanges();
    }
  }

  /**
   * Method to toggle between editing and non-editing
   * @param dataItem data of the editable row
   * @param status editable status
   * @param colIndex column index
   * @param control control of the editing
   * @param column column of the editable cell
   * @param IsEnabled property to disable/enable the editing
   * @param AutoFocusOnlyControl only to make focus for the control
   * @param GridHelper GridExtension instance 
   * @param RowIndex index of the row in cell editing
   * @returns if the cell is non-editable and disabled
   */
  public toggleEditable(dataItem, status, colIndex, control, column?, IsEnabled?, AutoFocusOnlyControl?, GridHelper?, RowIndex?) {
    if (IsEnabled == false || this.IsDisabled == true) {
      return;
    } 
    else {
      if (column && column.IsReadOnly) return;
      else {
        dataItem[`cell${colIndex}`] = status;
        if (GridHelper && RowIndex >= 0) {
          if (GridHelper.selectedRowsIndex[0] != RowIndex || (GridHelper.selectedRowsIndex.length == 0 && RowIndex != undefined)) {
            let params = {
              trigger: true,
              selectedRowIndex: RowIndex
            }
            this.emitEditableClick.emit(params);
          }
          GridHelper.selectedRowsIndex = [RowIndex];
        }
      }
      if (control instanceof iTimeBox) {
        control.setFocus();
      }
      if (control instanceof iTextBox) {
          control.setFocus();
          control.selectAllText();
      }
      if (control instanceof iComboBox && !AutoFocusOnlyControl) {
        control.setFocus();
        control.setComboBoxDropDownOpen();
      }
      if (control instanceof iComboBox && AutoFocusOnlyControl) {
        control.setFocus();
      }
    }
  }
}
