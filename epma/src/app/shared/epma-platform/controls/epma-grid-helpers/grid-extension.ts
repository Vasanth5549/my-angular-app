import { ChangeDetectorRef, Directive, Input, QueryList } from '@angular/core';
import {
  ColumnBase,
  GridComponent,
  ColumnComponent,
  RowClassArgs,
  SelectionEvent,
  CellClickEvent,
  DetailExpandEvent,
  DetailCollapseEvent,
} from '@progress/kendo-angular-grid';
import { GridLayoutComponent } from '@progress/kendo-angular-layout';
import { IEnumerable, List, ObservableCollection, RadRoutedEventArgs } from 'epma-platform/models';
import { Visibility } from '../../controls-model/Visibility';
import { Control } from '../Control';
import { DataTemplate } from '../epma-datatemplate/epma-datatemplate.component';
import { Thickness } from '../FrameworkElement';
import { GridProperties } from './grid.directive';
import { GridColumnProperties } from './grid-column.directive';
import { SortDescriptor as KendoSortDescriptor } from '@progress/kendo-data-query';
import { SolidColorBrush } from '../Control';
import { iCheckBox, iComboBox, iTextBox, iTimeBox } from 'epma-platform/controls';
import { debounce, sortBy } from 'lodash';

export const PRNColorList =[
  { className: "PRNMistyRose", value: "#FFCCCCFF" },
  { className: "PRNIvory", value: "#FFFFCCFF" },
  { className: "PRNSkyBlue", value: "#9DDCFBFF" },
  { className: "PRNMoccasin", value: "#FFCC99FF" },
  { className: "PRNAquaGreen", value: "#2DFCFCFF" },
  { className: "PRNPink", value: "#FFCCFFFF" },
  { className: "PRNYellow", value: "#FFFF99FF" },
  { className: "PRNCyan", value: "#99FFFFFF" },
  { className: "PRNAmber", value: "#FAA856FF" },
  { className: "PRNOliveGreen", value: "#CCFF99FF" }
];
export const ColumnResizeWidths = {
  InitialWidth: 117,
  SmallWidth: 140,
  MediumWidth: 165,
  LargeWidth: 185,
  ExtraLarge: 210,
};
export const ContentLength = {
  Small: 15,
  Regular: 18,
  Medium: 25,
  Large: 30
}
export class iQueryList {
  _results: any[] = [];
  Children: any[] = [];
  constructor(dtCollection: any) {
    this.Add(dtCollection);
  }
  public forEach(callbackfn: () => void) {
    this._results.forEach(callbackfn);
  }
  public get length(): number {
    return this._results.length;
  }
  private Add(obj: any) {
    let itemCollection: any[] = [];
    itemCollection.push(obj);
    this._results = itemCollection[0];
    this._results.forEach((item, index) => {
      this[index] = item;
    })
  }
}

export class GridExtension extends Control {
  public isTabKeyPress:boolean = false;
  public ChildDataTemplateCollection: QueryList<DataTemplate>;
  public GUID;
  public RowCheckBoxCollection: QueryList<iCheckBox>;
  public ExpandAllChidGrids: boolean = true;
  public static expandedDetailKeys: number[] = [];
  public OriginalItemsSource: ObservableCollection<any> = new ObservableCollection<any>();
  public IsCustomCellHeight: boolean = false;
  public IsFullCellHeightDataTemplate: boolean = false;
  public IsRowClickCheckboxSelection: boolean = false;
  public dColumns: GridViewColumnCollection = new GridViewColumnCollection();
  public Columns: GridViewColumnCollection = new GridViewColumnCollection();
  public static ItemsSourceProperty: string;
  public BeginningEdit: Function;
  public selectedRowsIndex: number[] = [];
  public changeDetectionRef: ChangeDetectorRef;
  public selectedRows: any[] = [];
  public GridVisibility: Visibility = Visibility.Visible;
  public NavigatorText: string;
  public PageCount: number;
  private e: any = { Rows: [] };
  public Rows: List<GridViewRow> = new List<GridViewRow>();
  public styles: any[] = [];
  public IsMedtechnicaldetails: boolean = false;
  public Ismedadmindetails: boolean = false;
  VerticalGridLinesBrush: any; //Stub
  ChildGridCollection: GridExtension[] = [];
  public RestrictContentClickUnSelectionColIndex: number;
  constructor() {
    super();
    this.GUID = new Date().getTime();
  }

  private _dataTemplates: any;
  public get dataTemplates(): any {
    return this._dataTemplates;
  }
  set dataTemplates(value: any) {
    this._dataTemplates = value;
    let rowCount: number;
    let DataTemplateList = this._dataTemplates?._results;
    if (this._dataTemplates && DataTemplateList && DataTemplateList.length > 0 && this.columns && this.columns.length > 0) {
      rowCount = DataTemplateList.length / this.columns.length;
      for(let i = 0; i < rowCount; i++) {
        let filteredCells = DataTemplateList.filter(cell => cell.index == i);
        // this.Rows[i].Cells = filteredCells;
        if (filteredCells.length > 0) {
            filteredCells.forEach((item) => { this.Rows[i]?.Cells.Add(item)});
        }
      }
      this._dataTemplates.forEach((item) => {
        // if (this.IsFullCellHeightDataTemplate) {
        //  item.iStyle = { 'height' : document.getElementById(item.GUID).parentElement.parentElement.offsetHeight +'px'}
        // }
        if (this.IsCustomCellHeight) {
          item.iStyle = { 'height': 'inherit' }
        }
      })
    }
  }

  RefreshDataTemplateHeight(value) {
    setTimeout(() => {
      let rowsIndex = value.filter(item => item.BorderThickness).map(item => item.index);
      rowsIndex.forEach((rowIndex) => {
        let Row = value.filter(item => item.index == rowIndex)
        this.setRowStyleData(Row, rowIndex);
      })
      
    }, 1000)
  }
  
  private setRowStyleData(row, rowIndex) {
    let height: number = 0
    let topWidth: number = 0;
    let bottomWidth: number = 0;
    let cell = row.filter(item => item.BorderThickness)[0];
    if (cell && cell.BorderThickness && cell.BorderThickness.Top) {
      topWidth = cell.BorderThickness.Top
    }
    if (cell && cell.BorderThickness && cell.BorderThickness.Bottom) {
      bottomWidth = cell.BorderThickness.Bottom;
    }
    let dtt = row.filter(item => item.index == rowIndex);
    height = document.getElementById(dtt[0].GUID).parentElement.parentElement.offsetHeight + topWidth + bottomWidth;
    dtt.forEach((item) => {
      if (item.BorderThickness) {}
      else {
        if (item.Background) {
          item.BorderBrush = item.Background;
          item.BorderThickness = `${topWidth}px 0px`;
        }
      }
    })
  }

  UpdateDataTemplateHeight(cells: any) {
    setTimeout(() => {
      cells.forEach((item) => {
        if (item.BorderThickness && item.BorderThickness.Top > 0 && item.BorderThickness.Bottom > 0 && item.BorderThickness.Left > 0 && item.BorderThickness.Right > 0) {
          item.iStyle = { height: document.getElementById(cells[0].GUID).parentElement.parentElement.clientHeight - 4 + 'px' };
        } else {
          item.iStyle = { height: document.getElementById(cells[0].GUID).parentElement.parentElement.clientHeight + 'px' };
        }
        // if (this.IsFullCellHeightDataTemplate) {
        //   item.iStyle = {height: document.getElementById(cells[0].GUID).parentElement.parentElement.clientHeight + 'px'};
        // }
      });
    })
  }
  /**
   * Method to update the select/deselect all checkbox in grid header
   * @param checkbox header checkbox's instance
   * @param checkboxCollection row checkbox collection
   * @param isHeaderCheckbox state of header checkbox
   * @param dataSource optional param to get the selected rows
   */
  UpdateCheckBoxSelection(checkbox: iCheckBox, checkboxCollection: QueryList<iCheckBox>, isHeaderCheckbox: boolean, dataSource?: any, extension?: GridExtension) {
    if (isHeaderCheckbox) {
      let selectedIndexArr: number[] = [];
      if (checkbox.IsChecked) {
        checkboxCollection.forEach((item) => {
          item.IsChecked = true;
          selectedIndexArr.push(item.GridRowIndex);
        });
      } else {
        checkboxCollection.forEach(item => item.IsChecked = false);
        selectedIndexArr = [];
        extension.selectedRows = [];
      }
      if (dataSource && extension) {
        extension.selectedRowsIndex = selectedIndexArr;
        extension.selectedRows = [];
        extension.selectedRowsIndex.forEach((item) => {
          extension._selectedItems.Add(dataSource.array[item]);
          extension.selectedRows.push(dataSource.array[item]);
        });
      }
    }
    else {
      checkbox.IsChecked = checkboxCollection.toArray().every(item => item.IsChecked == true);
    }
  }

  expandDetailsBy = (dataItem: any): number => {
    if(this.IsMedtechnicaldetails) return dataItem.UniqueIdentifier;
    else if(this.Ismedadmindetails) return dataItem.MedAdminOID;
    else return dataItem.PrescriptionItemOID;
  };

  expandedDetailKeys: number[] = [];
  OpenAllChildGrids(dataItemCollection: any) {
    if (dataItemCollection && dataItemCollection.Count > 0) {
      dataItemCollection.forEach((item) => {
          if (this.ExpandAllChidGrids && !this.IsMedtechnicaldetails && !this.Ismedadmindetails) GridExtension.expandedDetailKeys.push(item.PrescriptionItemOID);
        if (this.ExpandAllChidGrids && this.IsMedtechnicaldetails) GridExtension.expandedDetailKeys.push(item.UniqueIdentifier);
          if (this.ExpandAllChidGrids && this.Ismedadmindetails) GridExtension.expandedDetailKeys.push(item.MedAdminOID);
        })
      }
      GridExtension.expandedDetailKeys = GridExtension.expandedDetailKeys.map(item => item);
      this.expandedDetailKeys = GridExtension.expandedDetailKeys.map(item => item);
  }

  private _IsReadOnly: boolean;
  public get IsReadOnly(): boolean {
    return this._IsReadOnly;
  }
  public set IsReadOnly(value: boolean) {
    this._IsReadOnly = value;
    this.SetReadOnly(value);
  }

  private SetReadOnly(value: boolean) {
    if (value != null && value != undefined && this.Columns.Count > 0) {
      this.Columns.forEach((item) => {
        item.IsReadOnly = value;
      });
    }
  }

  private _recordsPerPage: number;
  public get RecordsPerPage(): number {
    return this._recordsPerPage;
  }
  public set RecordsPerPage(value: number) {
    this._recordsPerPage = value;
    this.grid.pageSize = value;
  }

  private _grid: GridComponent;
  public get grid(): GridComponent {
    return this._grid;
  }
  public set grid(value: GridComponent) {
    this._grid = value;
  }

  private _columns: any;
  public get columns(): any {
    return this._columns;
  }
  public set columns(value: any) {
    this._columns = value.map((item) => item);
  }

  private _Heights: number | string;
  public override get Height(): number | string {
    return this._Heights;
  }
  public override set Height(value: number | string) {
    this._Heights = value;
  }

  private _RowIndicatorVisibility: Visibility = Visibility.Collapsed;
  public get RowIndicatorVisibility(): Visibility {
    return this._RowIndicatorVisibility;
  }
  public set RowIndicatorVisibility(value: Visibility) {
    this._RowIndicatorVisibility = value;
  }
  public isRebinding = false;
  public override _ItemsSource: ObservableCollection<any> =
    new ObservableCollection<any>();
  public initialRows: number;
  public rowLoadedEventTriggerCount = 0;
  public override set ItemsSource(value: ObservableCollection<any>) {
    this._ItemsSource = value;
    this.Items = this._ItemsSource;
    if(value)
      this.initialRows = value.array.length;
    if (this.ItemsSource && this.ItemsSource.Count > 0) {
      this.ItemsSource.forEach((item) => {
        let row: GridViewRow = new GridViewRow();
        row.Item = item;
        this.Rows.Add(row);
      });
    }
  }
  public override get ItemsSource(): ObservableCollection<any> {
    return this._ItemsSource;
  }

  private _Items: ObservableCollection<any> = new ObservableCollection<any>();
  public set Items(value: ObservableCollection<any>) {
    this._Items = value;
  }
  public get Items(): ObservableCollection<any> {
    return this._Items;
  }

  // Entire grid instance has to be assigned in the consumption place
  private _SelectionMode: SelectionMode;
  public get SelectionMode(): SelectionMode {
    return this._SelectionMode;
  }
  public set SelectionMode(value: SelectionMode) {
    if (value == 0)
      this.grid.selectable = { checkboxOnly: false, mode: 'single' };
    else if (value == 1)
      this.grid.selectable = {
        checkboxOnly: true,
        mode: 'multiple',
        cell: true,
      };
    else {
    }
  }
  // Functionality unknown, sample logic coded below, once the functionality is known modify accordingly
  private _FrozenColumnCount: number | string;
  public get FrozenColumnCount(): number | string {
    return this._FrozenColumnCount;
  }
  public set FrozenColumnCount(value: number | string) {
    if (this.grid && this.grid.columns.length > 0) {
      if (typeof value == 'string') value = Number(value);
      for (let i = 0; i < value; i++) {
        this.grid.columns[i].locked = true;
      }
    }
  }

  private _ShowColumnHeaders: boolean;
  public get ShowColumnHeaders(): boolean {
    return this._ShowColumnHeaders;
  }
  public set ShowColumnHeaders(value: boolean) {
    this._ShowColumnHeaders = value;
    if (!value) {
      this.columns.forEach((column) => {
        let existingClasses = column.headerClass;
        column.headerClass = existingClasses + ' '+ 'HideColumnHeader'
      });
    }
    if (value) {
      this.columns.forEach((column) => {
        let existingClasses = column.headerClass?.replace('HideColumnHeader', '');
        column.headerClass = existingClasses;
      });
    }
  }
  public ChildrenOfType<T>(type?: string, index?: number, IsFullChild: boolean = false): Array<any> {
    if (type == 'GridExtension') {
      if (IsFullChild) {
        let FilteredDTCOllection: any = [];
        let HierarchicalRowIndexes = this.ItemsSource.array.map((item, itemIndex) => {
          return item.ChildGridExtension.grid != undefined ? itemIndex : null
        }).filter(rowindex => rowindex != null);
        HierarchicalRowIndexes.forEach((HRowIndex) => {
          let filteredByParentIndex = this.ChildDataTemplateCollection.filter(item => item.ParentRowIndex == HRowIndex);
          if (filteredByParentIndex.length > 0) FilteredDTCOllection.push(filteredByParentIndex);
        })
        this.ChildGridCollection = sortBy(this.ChildGridCollection, ['GUID']);
        this.ChildGridCollection.forEach((item, childGridIndex) => {
          if (item && item.grid && item.grid.data && Object.keys(item.grid.data).length > 0) {
            item.Rows.Clear();
            Object.keys(item.grid.data).forEach((data, dataIndex) => {
              let rowCells = FilteredDTCOllection[childGridIndex].filter(itm => itm.index == dataIndex);
              let row: GridViewRow = new GridViewRow();
              row.Item = item.grid.data[dataIndex];
              rowCells.forEach(item => row.Cells.Add(item));
              item.Rows.Add(row);
            })
          }
        });
      }
      return this.ChildGridCollection;
    }
    let gridViewCells = [];
    if(this.dataTemplates &&  this.dataTemplates.length > 1){
    this.dataTemplates.forEach((dt: DataTemplate) => {
      if (dt.index == index && dt.Children.length > 0) {
        dt.Children.forEach((child) => {
          gridViewCells.push(child);
        });
      }
    });
    }else{
        if (this.dataTemplates.index == index && this.dataTemplates.Children.length > 0) {
          this.dataTemplates.Children.forEach((child) => {
            gridViewCells.push(child);
          });
        }
    }
    return gridViewCells;
  }

  public ItemContainerGenerator = {
    ContainerFromItem: (dataitem): GridViewRow => {
      let grdrow: GridViewRow = new GridViewRow();
      this.Rows.forEach((row) => {
        if (row.Item == dataitem) {
          grdrow = row;
        }
      });
      return grdrow;
    },
  };

  SelectAll(HeaderCheckBox: iCheckBox, RowCheckBoxList: QueryList<iCheckBox>) {
    RowCheckBoxList.forEach((row) => {
      row.IsChecked = true;
      this.ItemsSource.forEach((data, index) => {
        if (!data.IsGroupHeader)
          this.selectedRowsIndex.push(index);
      });
      HeaderCheckBox.IsChecked = true;
      this.selectedRowsIndex = this.selectedRowsIndex.map(item => item);
    });
  }

  /* Unselects all the grid selections and clear the selected items */
  UnselectAll(checkBoxColumnList?: QueryList<iCheckBox>) {
    this.SelectedItems.Clear();
    if (this.selectedRowsIndex && this.selectedRowsIndex.length > 0) this.selectedRowsIndex = [];
    if (this.SelectedItem) this.SelectedItem = [];
    if (checkBoxColumnList && checkBoxColumnList.length > 0) {
      checkBoxColumnList.forEach(item => item.IsChecked = false)
    }
  }

  /**
   * Generate the column list of type iGridViewDataColumn and add inside Columns collection
   */
  GenerateColumns() {
    this.ColumnCreation(this.columns);
  }

  /**
   * Update the column list of type iGridViewDataColumn and add inside Columns collection
   */
  UpdateColumns() {
    this.columns = this.columns.filter((col) => !col.hidden);
    this.ColumnCreation(this.columns);
  }

  /**
   * Creation of the column list of type iGridViewDataColumn and add inside Columns collection
   * @param columns updated column collection from kendo
   */
  private ColumnCreation(columns) {
    this.Columns.Clear();
    columns.forEach((column: ColumnComponent) => {
      if (column.field != 'rowindicator' && !column['isCheckboxColumn']) {
        let iGridColumn: iGridViewDataColumn = new iGridViewDataColumn();
        iGridColumn.kendoColumn = column;
        iGridColumn.DisplayIndex = column.orderIndex;
        iGridColumn.IsResizable = column.resizable;
        iGridColumn.IsReorderable = column.reorderable;
        iGridColumn.UniqueName = column['UniqueName']?.uniqueName;
        iGridColumn.IsVisible = !column.hidden;
        iGridColumn.Width = column.width;
        iGridColumn.IsReadOnly = this.IsReadOnly ? this.IsReadOnly : !column.editable;
        iGridColumn.leafIndex = column.leafIndex;
        this.Columns.Add(iGridColumn);
      }
    });
  }

  /* Returns selected row count from selectedRowsIndex array */
  GetSelectedRowCount(): number {
    return this.selectedRowsIndex.length;
  }

  /**
   * Selected the grid item by passing index
   * @param index will select the index in the grid
   */
  setSelectedItemByIndex(index: number): void {
    this.selectedRowsIndex.push(index);
    this.selectedRowsIndex = this.selectedRowsIndex.map((data) => data);
  }

  /**
   * Get Row Data
   * @param index will decide which row data to fetch
   * @returns the grid row data of the index passed
   */
  GetRowData(index: number): any {
    return this.ItemsSource[index];
  }

  /**
   * Get Cell Value
   * @param rowindex index of the grid row
   * @param columnindex index of the grid column
   * @returns the cell value of row and column index of the grid
   */
  GetCellValue(rowindex: number, columnindex: number): any {
    let rowData = this.ItemsSource[rowindex];
    let columnKey = Object.keys(rowData)[columnindex];
    return rowData[columnKey];
  }

  /**
   * Get column index by name
   * @param name name of the column
   * @returns columnindex of the column name
   */
  GetColumnIndexByName(name: string, isDontIncludeChkboxCol?: boolean): number {
    let columns = this.columns.filter(
      // (item) => item['UniqueName'] && item['UniqueName'].uniqueName == name
      (item) => item['UniqueName'] && (item['UniqueName'] == name || item['UniqueName'].uniqueName == name)
    );
    let columnIndex = columns.length > 0 ? columns[0].leafIndex : 0;
    let columnsToEliminate = this.columns.filter(
      (item) => item['field'] == 'rowindicator' || item['isCheckboxColumn']
    );
    return columnIndex >= 0 ? columnIndex - (isDontIncludeChkboxCol ? 0 : columnsToEliminate.length) : -1;
  }

  /**
   * selected rows index by order
   * @returns sorted selected row indexes
   */
  GetSelectedRowsIndexByOrder(): number[] {
    return this.selectedRowsIndex.sort();
  }
  GetSelectedRowsIndexByOrderNew(): number[] {
    return this.selectedRowsIndex.sort((n1,n2)=>n1-n2);
  }

  /**
   * Selected rows
   * @returns ObservableCollection of selected rows
   */
  GetSelectedRows(): ObservableCollection {
    if(this.selectedRowsIndex && this.selectedRowsIndex.Count() > 0)
    {
      this._selectedItems.Clear();
      this.selectedRowsIndex.forEach((index) => {
        this._selectedItems.Add(this.ItemsSource.array[index]);
      });
    }
    return this._selectedItems;
  }

  /**
   * Selected Row
   * @returns Selected Row Item
   */
  GetSelectedRow(): any {
    return this.ItemsSource[this.selectedRowsIndex[0]];
  }

  /**
   * @returns true if the grid has any items
   */
  HasItems(): boolean {
    return this.ItemsSource && this.ItemsSource.Count > 0 ? true : false;
  }

  /**
   * Binding vaue to the property
   * @param prop property to bind
   * @param data value to bind to the property
   */
  public override SetBinding(prop: string, data: any) {
    this.selectedRowsIndex = [];
    // this._selectedItems.Clear();
    if (prop == 'data') this.ItemsSource = data;
    else this[prop] = data;
  }

  /**
   * Current row data which is the last selected row data from the grid
   * @returns last selected row data
   */
  GetCurrentRowData(): any {
    let currentRowIndex: number;
    let result = {};
    if (this.selectedRowsIndex.length > 0) {
      currentRowIndex =
        this.selectedRowsIndex[this.selectedRowsIndex.length - 1];
      result = this.ItemsSource[currentRowIndex];
    }
    return result;
  }

  private _selectedItems: ObservableCollection<any> =
    new ObservableCollection<any>();
  public get SelectedItems(): ObservableCollection<any> {
    this._selectedItems.Clear();
    this.selectedRowsIndex.forEach((index) => {
      this._selectedItems.Add(this.ItemsSource.array[index]);
    });
    return this._selectedItems;
  }

  private _CanUserSelect: boolean = false;
  public get CanUserSelect(): boolean {
    return this._CanUserSelect;
  }
  public set CanUserSelect(value: boolean) {
    this._CanUserSelect = value;
    this.grid.selectable = true;
  }

  private _IsSynchronizedWithCurrentItem: boolean = false;
  public get IsSynchronizedWithCurrentItem(): boolean {
    return this._IsSynchronizedWithCurrentItem;
  }
  public set IsSynchronizedWithCurrentItem(value: boolean) {
    this._IsSynchronizedWithCurrentItem = value;
    this.selectedRowsIndex = [0];
  }

  /**
   * get and set method of selected item
   */
  private _selectedItem: any;
  public get SelectedItem(): any {
    if (this.ItemsSource && this.selectedRowsIndex && this.selectedRowsIndex.length > 0)
     this._selectedItem = this.ItemsSource.array[this.selectedRowsIndex[0]];
    return this._selectedItem;
  }
  public set SelectedItem(value: any) {
    this._selectedItem = value;
    if (value == null) {
      this.selectedRowsIndex = [];
    } 
    else {
    this.ItemsSource.forEach((item, index) => {
      if (item.Equals(value)) {
        this.selectedRowsIndex.push(index);
        this.selectedRowsIndex = this.selectedRowsIndex.map((data) => data);
      }
    });
    }
  }

  /**
   * total row count
   * @returns the total row count loaded in the grid
   */
  GetRowCount(): number {
    if (this.ItemsSource && this.ItemsSource.Count > 0)
      return this.ItemsSource.array.filter((data) => !data.GroupHeader).length;
    else return 0;
  }

  /**
   * unselect the selected items from grid
   * @param unSelectList list of items to be unselected
   */
  Unselect(unSelectList: ObservableCollection): void {
    let selectedRows = [];
    if (this.selectedRowsIndex && this.selectedRowsIndex.length && this.ItemsSource && this.ItemsSource.Count > 0) {
      this.selectedRowsIndex.forEach((ind) => {
        selectedRows.push(this.ItemsSource.array[ind]);
      })
    }
    let c: any = [];
    unSelectList.array.forEach((x: any) => {
      c.push(
        selectedRows.filter((y: any) => {
          return y.Equals(x);
        })[0]
      );
    });

    let unselectIndex: number;
    this.ItemsSource.array.forEach((item, ind) => {
      if (item.Equals(c[0])) unselectIndex = ind;
    });

    this.selectedRowsIndex = this.selectedRowsIndex.filter((item) => item != unselectIndex);
    // this.selectedRowsIndex = this.selectedRowsIndex.filter((object1) => { return !c.some((object2) => { return object1 == object2[0].index;});});
    this.SelectedItems.Clear();
    this.selectedRowsIndex.forEach((item) => {
      this.SelectedItems.Add(this.ItemsSource[item]);
    });
  }

  /**
   * set border style
   * @param value grid border styles
   * @param columns colums which the styles need to be set
   * @returns object to set the styles
   */
  setBorderStyle(value, columns) {
    let style_obj = {};
    if (value) {
      value['_results'].forEach((border) => {
        columns['_results'].forEach((col) => {
          if (col.field == border.columnName) {
            let obj = this.convertBaseStyle(border.baseStyle);
            style_obj[col.field] = obj;
          }
        });
      });
    }
    return style_obj;
  }

  /**
   * set cell style
   * @param prop property
   * @param columns columns querylist of grid
   * @returns the cell style
   */
  setCellStyle(prop, columns) {
    let style_obj = {};
    if (prop) {
      columns['_results'].forEach((col) => {
        if (col.field == prop.columnName) {
          let obj = {};
          obj[prop['Property']] = prop.Value;
          style_obj[col.field] = obj;
        }
      });
    }
    return style_obj;
  }

  /**
   * Convert silverlight light into object
   * @param value silverlight styles
   * @returns converted style object
   */
  convertBaseStyle(value) {
    let attrArr = value.replace(/[\n\s]+/g, '').split(';');
    let obj = {};
    for (let i = 0; i < attrArr.length; i++) {
      if (attrArr[i] != '') {
        let keyValuePair = attrArr[i].split(':');
        obj[keyValuePair[0]] = keyValuePair[1];
      }
    }
    return obj;
  }

  /**
   * Scroll the grid into the specified row position
   * @param value row index which the grid scroll view to move
   */
  ScrollIntoView(value: any) {
    this.ItemsSource.forEach((item, index) => {
      if (item.Equals(value)) {
        this.grid.scrollTo({ row: index, column: 0 });
      }
    });
  }

  /**
   * Assign changeDetectionRef from consumption place's changeDetectionRef in contructor/ngOninit
   * Ex. -> this.GridIns.changeDetectionRef = this._detectChangeRef;
   */
  Rebind() {
    setTimeout(() => {
        this.dataTemplates?._results.forEach((dt: DataTemplate) => {
            if (dt.RowLoaded) {
                dt.RowLoaded.emit({
                    dataItem: this.ItemsSource.array[dt.index],
                    index: dt.index,
                });
            }
        });
    }, 0);
  }

  /**
   * setting the content presenter into the rows object
   * @param cps collection of content presenters
   * @param orders data
   */
  PrepareRows(cps, orders?) {
    cps.forEach((item) => {
      this.e.Rows.push({ Row: { Cells: [item] } });
    });
  }
  /**
   * Setting the cell values of each row
   */
  private RowCells: any = {};
  PrepareCells(dataTemplates: any, index: number, IsChart: boolean) {
    let rowDt = dataTemplates._results.filter((itm) => {
      return itm.index == index;
    });
    for (let i = 0; i < rowDt.length; i++) {
      let gridViewCell: GridViewCell = new GridViewCell();
      gridViewCell.index = index;
      gridViewCell.dataTemplates = rowDt[i];
      this.RowCells[`${i}`] = gridViewCell;
    }
    if (IsChart) {
      return rowDt;
    }
    else {
      return this.RowCells;
    }

  }

  /**
   * Reorder the column
   * @param column columnbase
   * @param index index which column need to be reorder
   */
  ReOrderColumn(column: ColumnBase, index: number): void {
    this.grid.reorderColumn(column, index);
  }

  /**
   * Gets all the row styles push from the product code
   * @param context data and class name
   * @returns the classes for each row
   */

  getRowStyles(context: any) {
    let rowClasses: any[] = [];
    if (
      context.dataItem['RowStyles'] &&
      context.dataItem['RowStyles'].length > 0
    ) {
      context.dataItem['RowStyles'].forEach((item) => rowClasses.push(item));
    }
    let addedRowClasses = {};
    if (rowClasses && rowClasses.length > 0) {
      rowClasses.forEach((item) => {
        addedRowClasses[item] = true;
      });
    }
    return addedRowClasses;
  }
  /**
   * Gets all the row classes push from the product code
   * @param context data and class name
   * @returns the classes for each row
   */
  getRowClasses(context: any) {
    let rowClasses: any[] = [];
    this.styles.forEach((item) => {
      if (item.index == context.index) {
        rowClasses.push(item.class);
      }
    });
    let addedRowClasses = {};
    if (rowClasses && rowClasses.length > 0) {
      rowClasses.forEach((item) => {
        addedRowClasses[item] = true;
      });
    }
    return addedRowClasses;
  }

  /**
   * Generate and add the cell of each column for rowloaded event
   */
  private dataTemplateCells = {};
  public addCell(dataTemplate: DataTemplate) {
    // this.dataTemplateCells.push(dataTemplate);
    let key =
      'r' +
      dataTemplate.index.toString() +
      'c' +
      dataTemplate.colindex.toString();
    this.dataTemplateCells[key] = dataTemplate;
    let idx = dataTemplate.index;
    let countByIndex = [];
    Object.keys(this.dataTemplateCells).forEach((prop) => {
      let index = prop.indexOf('c');
      let rowindex = prop.substring(1, index);
      if (rowindex == dataTemplate.index) {
        countByIndex.push(this.dataTemplateCells[prop]);
      }
    });
    if (countByIndex.length == this.Columns.Count) {
      this.ClearDataTemplateCells();
      countByIndex.forEach((item) => {
        if (item.RowLoaded) {
          if (
            this.isRebinding &&
            this.initialRows > this.rowLoadedEventTriggerCount
          ) {
            this.rowLoadedEventTriggerCount++;
            item.RowLoaded.emit({ dataItem: item.dataItem, index: item.index });
          } else {
            // this.rowLoadedEventTriggerCount++;
            item.RowLoaded.emit({ dataItem: item.dataItem, index: item.index });
          }
        }
      });
    }
  }

  /**
   * Forming the RowEventArgs object structuring
   * @param dataTemplates list of datatemplate components
   * @param context data
   * @returns the formed structure of type RowEventArgs
   */
  GetRowEventArgs(dataTemplates, context, isHierarchical?, IsChart: boolean = false) {
    // let row: GridViewRowItem = new GridViewRowItem();
    let row: GridViewRow = new GridViewRow()
    row.Cells = this.PrepareCells(dataTemplates, context.index, IsChart);
    row.Item = context.dataItem;
    row.DataItemGridExtension = this;
    let rowEventArgs: RowLoadedEventArgs = new RowLoadedEventArgs();
    rowEventArgs.DataElement = context.dataItem;
    rowEventArgs.dataItem = context.dataItem;
    rowEventArgs.index = context.index;
    rowEventArgs.Row = row;
    rowEventArgs.Row.Index = context.index;
    if (isHierarchical) {
      rowEventArgs.GridViewDataControl = context.dataItem.ChildGridExtension;
      rowEventArgs.IsExpanded = true;
    }
    else 
      rowEventArgs.GridViewDataControl = this;
    rowEventArgs.dataItem['RowStyles'] = [];

    return rowEventArgs;
  }

  public CommitEdit() {}
  public BeginEdit() {}

  /**
   * Get the selected rows index list
   * @returns selected index array
   */
  public GetSelectedRowsIndex(): number[] {
    return this.selectedRowsIndex;
  }

  /**
   * Get the currently selected row's index
   * @returns the row index
   */
  public GetCurrentRowIndex(): number {
    return this.selectedRowsIndex[this.selectedRowsIndex.length - 1];
  }

  private descriptor: SortDescriptor = new SortDescriptor();
  public sortChange(sort: KendoSortDescriptor[]): void {
    this.sort = sort;
    if (sort[0].field && sort[0].dir) {
      this.descriptor.Member = sort[0].field;
      this.descriptor.SortDirection = sort[0].dir == 'asc' ? 0 : 1;
      this.SortDescriptors.Add(this.descriptor);
    }
    if (sort[0].field && !sort[0].dir) {
      let newItemSource = new ObservableCollection();
        if (this.OriginalItemsSource && this.OriginalItemsSource.Count > 0)
        this.OriginalItemsSource.array.forEach(item => newItemSource.Add(item));
      this.ItemsSource = newItemSource;
    }
  }


  /**
   * Cell click event handler
   */
  private debounceClick = debounce(this.cellClick, 500);
  isCellClickable = true;
  onCellClick: Function;
  cellClick(e: CellClickEvent) {
    if (this.onCellClick instanceof Function && e.column && e.column.field != 'rowindicator' && !(e.originalEvent?.srcElement?.className?.Contains('checkbox') && e.columnIndex == 0)) {
      if (this.isCellClickable) {
        this.isCellClickable = false;
        if (e.dataItem.IsGroupHeader) return;
        let columnCell: GridViewCell = new GridViewCell();
        columnCell.Column = e.column;
        columnCell.DataContext = e.dataItem;
        let excludeColCount = this.columns.filter((item) => item['field'] == 'rowindicator' || item['isCheckboxColumn']).length;
        if (excludeColCount > 0 && !e.column['isCheckboxColumn']) {
          columnCell.Column.UniqueName = this.Columns[e.columnIndex - excludeColCount].UniqueName;
        } 
        else {
          if (e.column['isCheckboxColumn']) columnCell.Column.UniqueName = 'isCheckboxColumn';
          else columnCell.Column.UniqueName = this.Columns[e.columnIndex].UniqueName;
        }
        columnCell.Column['isCheckboxColumn'] = e.column.isCheckboxColumn ? true : false;
        let gridViewCellClickEventArgs: GridViewCellClickEventArgs = {
          ColumnCell: columnCell,
          ColumnIndex: this.GetColumnIndexForCellClick(e.columnIndex),
          RowIndex: e.rowIndex,
          MouseEvents: e,
          TriggerSelectionChange: false
        };
        if (this.IsRowClickCheckboxSelection) {
          let target = this.RowCheckBoxCollection?.filter(chkbox => chkbox.GridRowIndex == e.rowIndex)[0];
          if (this.RestrictContentClickUnSelectionColIndex == e.columnIndex && target.IsChecked) {}
          else {
            let flag = this.selectedRowsIndex.some(data => data == e.rowIndex);
            if (flag) {
              this.selectedRowsIndex = this.selectedRowsIndex.filter(data => data != e.rowIndex);
              if (target) target.IsChecked = false;
            } else {
              this.selectedRowsIndex.push(e.rowIndex);
              if (target) target.IsChecked = true;
              gridViewCellClickEventArgs.deselectedRow = false;
              gridViewCellClickEventArgs.selectedRow = true;
            }
          }
          this.selectedRowsIndex = this.selectedRowsIndex.map(data => data);
          gridViewCellClickEventArgs.TriggerSelectionChange = true;
        }
        this.onCellClick({}, gridViewCellClickEventArgs);
        setTimeout(() => {
          this.isCellClickable = true;
      }, 500);
      }
    }
  }

  /**
   * Cell edit start event handler
   */
  EnableCellEditStarted: boolean = false;
  onCellEditStarted: Function;
  CellEditStarted(e: iTextBox) {
    if (this.onCellEditStarted instanceof Function) {
      let cell: GridViewCell = new GridViewCell();
      let columnIndex = e.ColumnCellIndex.Substring(e.ColumnCellIndex.length-1, e.ColumnCellIndex.length)
      e.GridColumn.DisplayIndex = columnIndex;
      cell.Column = e.GridColumn;
      let eventArgs: GridViewCellEditEndedEventArgs = {
        Cell: cell,
        EditAction: GridViewEditAction.Commit,
        EditingElement: e,
        NewData: e,
        OldData: e
      } as GridViewCellEditEndedEventArgs;
      this.onCellEditStarted({}, eventArgs);
    }
  }
  
  /**
   * Cell edit ended event handler
   */
  EnableCellEditEnded: boolean = false;
  onCellEditEnded: Function;
  CellEditEnded(e: iTimeBox | iComboBox | iTextBox) {
    if (this.onCellEditEnded instanceof Function) {
      let cell: GridViewCell = new GridViewCell();
      let columnIndex = e.ColumnCellIndex.Substring(e.ColumnCellIndex.length-1, e.ColumnCellIndex.length)
      e.GridColumn.DisplayIndex = columnIndex;
      cell.Column = e.GridColumn;
      let eventArgs: GridViewCellEditEndedEventArgs = {
        Cell: cell,
        EditAction: GridViewEditAction.Commit,
        EditingElement: e,
        NewData: e,
        OldData: e
      } as GridViewCellEditEndedEventArgs;
      this.onCellEditEnded({}, eventArgs);
    }
  }

  /**
   * Cell validating event handler
   */
  EnableCellValidating: boolean = false;
  onCellValidating: Function;
  CellValidating(e: iTimeBox | iComboBox | iTextBox) {
    if (this.onCellValidating instanceof Function) {
      let cell: GridViewCell = new GridViewCell();
      let columnIndex = e.ColumnCellIndex.Substring(e.ColumnCellIndex.length-1, e.ColumnCellIndex.length)
      cell.Column = e.GridColumn;
      e.GridColumn.DisplayIndex = columnIndex;
      let eventArgs: GridViewCellValidatingEventArgs = {
        Cell: cell,
        EditingElement: e,
        ErrorMessage: '',
        IsValid: true,
        Row: e.DataContext,
        NewValue: e,
        OldValue: e,
        Handled: false,
        OriginalSource: '',
        Source: ''
      } as GridViewCellValidatingEventArgs;
      eventArgs.Row.DataContext = e.DataContext;
      this.onCellValidating({}, eventArgs);
    }
  }

  /**
   * Grid mouse button click event handler
   */
  GridMouseButtonClicking: Function;
  gridClick(e: any) {
    if (this.GridMouseButtonClicking instanceof Function) {
      this.GridMouseButtonClicking({}, e);
    }
  }

  /**
   * Grid selection change event and args constructed
   */
  GridSelectionChange: Function;
  selectionChange(e: SelectionEvent) {
    if (this.GridSelectionChange instanceof Function) {
      let selectionChangeEventArgs: SelectionChangeEventArgs = {};
      if (e.selectedRows.length > 0) {
        let selectedRowsList: List = new List();
        selectedRowsList.Add(e.selectedRows[0].dataItem);
        selectionChangeEventArgs['AddedItems'] = selectedRowsList;
      }
      if (e.deselectedRows.length > 0) {
        let deSelectedRowsList: List = new List();
        deSelectedRowsList.Add(e.deselectedRows[0].dataItem);
        selectionChangeEventArgs['RemovedItems'] = deSelectedRowsList;
      }
      this.GridSelectionChange({}, selectionChangeEventArgs);
    }
  }

  /**
   * Grid details row expand
   */
  RowExpandedChanged: Function;
  RowIsExpandedChanged(e: DetailExpandEvent | DetailCollapseEvent) {
    if (this.RowExpandedChanged instanceof Function) {
      let gridViewRowItem: GridViewRow = new GridViewRow();
      gridViewRowItem.grdExtension = this;
      gridViewRowItem.Index = e.index;
      let rowEventArgs: RowEventArgs = {
        Row: gridViewRowItem,
      };
      rowEventArgs.Row.IsExpanded = e['expand'];
      rowEventArgs.Row.DataContext = e.dataItem;
      rowEventArgs.Row = gridViewRowItem;
      if (!this.IsMedtechnicaldetails) {
        this.selectedRowsIndex = [e.index];
        rowEventArgs.Row.IsSelected = e['expand'];
      }
      this.RowExpandedChanged({}, rowEventArgs);
    }
  }

  /**
   * Deletes the selected row
   * @param row to be deleted
   */
  public DeleteRow(row: any) {
    this.ItemsSource.Remove(row);
  }

  /**
   * Moves the selected row to next position in the grid
   */
  public MoveRowDown() {
    let lstSource = this.ItemsSource;
    if (this.SelectedItems.Count > 0) {
      let objSource =
        lstSource[this.ItemsSource.IndexOf(this.SelectedItems[0])];
      let index = this.ItemsSource.IndexOf(this.SelectedItems[0]);
      if (index != this.ItemsSource.IndexOf(this.ItemsSource.Length - 1)) {
        lstSource.Remove(objSource);
        lstSource.Insert(index + 1, objSource);
        let collection = new ObservableCollection();
        lstSource.array.forEach((itm) => collection.Add(itm));
        lstSource = collection;
        this.ItemsSource = lstSource;
        let _selecteItem = lstSource.IndexOf(objSource);
        this.selectedRowsIndex = [];
        this.setSelectedItemByIndex(_selecteItem);
        this.ScrollIntoView(objSource);
      }
    }
  }

  /**
   * Moves the selected row to previous position in the grid
   */
  public MoveRowUp() {
    let lstSource = this.ItemsSource;
    if (this.SelectedItems.Count > 0) {
      let objSource =
        lstSource[this.ItemsSource.IndexOf(this.SelectedItems[0])];
      let index = this.ItemsSource.IndexOf(this.SelectedItems[0]);
      if (index != this.ItemsSource.IndexOf(this.ItemsSource.Length - 1)) {
        lstSource.Remove(objSource);
        lstSource.Insert(index - 1, objSource);
        let collection = new ObservableCollection();
        lstSource.array.forEach((itm) => collection.Add(itm));
        lstSource = collection;
        this.ItemsSource = lstSource;
        let _selecteItem = lstSource.IndexOf(objSource);
        this.selectedRowsIndex = [];
        this.setSelectedItemByIndex(_selecteItem);
        this.ScrollIntoView(objSource);
      }
    }
  }

  /**
   * Finding the control
   * @param val name of the control
   * @returns control
   */
  public override FindName(val) {
    return this.DataTemplatesCollection.find(
      (itm) => itm.ChildControl.Name === val
    ).ChildControl;
  }

  /**
   * Select the Grid Row
   * @param items Items to be selected
   */
  Select(items: IEnumerable) {
    this.ItemsSource.forEach((item1, idx) => {
      items.forEach((item2) => {
        if (item1.Equals(item2)) {
          this.selectedRowsIndex.push(idx);
        }
      });
    });
    this.selectedRowsIndex = this.selectedRowsIndex.map((data) => data);
  }

  /**
   * Grid Focus
   */
  GridFocus: Function;
  onFocus() {
    if (this.GridFocus instanceof Function) {
      this.GridFocus({});
    }
  }

  public SetRowStyle(value: any, styles: any, property: string,isInfusionChart?: boolean) {
    let row: any
    if(isInfusionChart){
       row = document.getElementById(value.Row.Cells[0].GUID).parentElement.parentElement.parentElement;
    }else{
       row = document.getElementById(value.Row.Cells[0].dataTemplates.GUID).parentElement.parentElement.parentElement;
    }
    switch(property.toUpperCase()) {
      case 'PART_ROWBORDETOP':
        row.style.borderTop = `${styles.BorderThickness.Top}px solid`+ `${styles.BorderBrush.brush}`;
        break;
      case 'PART_ROWBORDERBOTTOM':
        row.style.borderBottom = `${styles.BorderThickness.Bottom}px solid` + `${styles.BorderBrush.brush}`;
        break;
      case 'BACKGROUND':
        row.style.background = styles;
        break;
      case 'HORIZONTALGRIDLINESBRUSH':
        row.style.borderBottom = `1.5px solid #11414B`;
        break;
        case 'PART_ROWBORDERTOP_BLUE':
        row.style.borderTop = `${styles.BorderThickness.Top}px solid #000CFE`;
        break;
      case 'PART_ROWBORDERBOTTOM_BLUE':
        row.style.borderBottom = `${styles.BorderThickness.Bottom}px solid #000CFE`;
        break;
        case 'SET_NOBORDER':
          row.style.borderBottom = `${styles.BorderThickness.Bottom}px`;
          row.style.borderTop = `${styles.BorderThickness.Bottom}px`;
          break;
    }
  }

  public GetColumnIndexForCellClick(ColumnIndex: number) {
    let columnsToEliminate = this.columns.filter(
      (item) => item['field'] == 'rowindicator' || item['isCheckboxColumn']
    );
    return ColumnIndex - columnsToEliminate.length;
  }

  public get ActualWidth(): number {
    return this.GridPropertiesDirective.ActualWidth;
  }

  public sort: KendoSortDescriptor[] = [];
  public SortDescriptors = {
    Add: (s: SortDescriptor) => {
      this.sort = [];
      let ks: KendoSortDescriptor = {
        field: s.Member,
        dir: s.SortDirection === 0 ? 'asc' : 'desc',
      };
      this.sort.push(ks);
      this.ItemsSource = this.ItemsSource.ColumnSort([ks], this.ItemsSource);
    },
  };

  GetLastRowIndex(): number {
    return this.ItemsSource && this.ItemsSource.Count > 0
      ? this.ItemsSource.Count - 1
      : -1;
  }

  SetChildDataTemplates(dt: QueryList<DataTemplate>, index: number) {
    let dtcollection = [];
    dt.forEach((dtitem) => {
      if (dtitem.ParentRowIndex == index) {
        dtcollection.push(dtitem);
      }
    })
    let queryList: iQueryList = new iQueryList(dtcollection);
    return queryList;
  }

  SetChildGridReference(children, QueryListCollection, IsGridNameDiff?:string) {
    this.ChildGridCollection = [];
    children.forEach((child, index) => {
      let target = this.ItemsSource.array.find((item) => {
          return child.data[0]?.ParentOID == item.PrescriptionItemOID;
      });
      this.ChildGridCollection.push(target.ChildGridExtension);
      target.ChildGridExtension.Name = IsGridNameDiff ? IsGridNameDiff : 'grdTecValItmChld';
      target.ChildGridExtension.grid = child;
      target.ChildGridExtension.columns = child.columns;
      target.ChildGridExtension.dataTemplates = QueryListCollection[index];
      target.ChildGridExtension.GenerateColumns();
      target.ChildGridExtension.UpdateColumns();
    })
  }

  SetSelectedChildItem(selectedIndex: number[]) {
    if (selectedIndex.length > 0) {
      this.selectedRowsIndex = selectedIndex;
    }
    else {
      this.IsSynchronizedWithCurrentItem = this.IsMedtechnicaldetails ? false : true;
    }
  }

  SaveChildGridSelectedIndex(e) {
    if (!e.Row.IsExpanded) e.Row.DataContext.SelectedChildGridIndex = e.Row.DataContext.ChildGridExtension.selectedRowsIndex;
      if (e.Row.IsExpanded) {
        let target = this.ItemsSource.array.find((item, index) => { return index == e.Row.Index});
        target.ChildGridExtension.selectedRowsIndex = e.Row.DataContext.SelectedChildGridIndex;
      }
  }

  GridSelectionKeyUp(event: KeyboardEvent, childItemSource?: any, isChildGrid: boolean = false) {
    if (event.key == 'ArrowDown' && !isChildGrid) {
      this.GridKeyDownEvent();
    }
    if (event.key == 'ArrowUp' && isChildGrid) {
      this.GridKeyUpEvent(isChildGrid, childItemSource);
    }
  }

  private GridKeyDownEvent(isChildGrid?: boolean, childItemSource?: any) {
    let selectedRowIndex = this.selectedRowsIndex[0];
      let IsGroupHeader = isChildGrid ? childItemSource[selectedRowIndex+1].IsGroupHeader : this.ItemsSource[selectedRowIndex+1].IsGroupHeader;
      let recordsCount = isChildGrid ? childItemSource.Count - 1 : this.ItemsSource.Count - 1;
      if (selectedRowIndex+1 <= recordsCount && !IsGroupHeader) {
        selectedRowIndex++;
        this.selectedRowsIndex = [selectedRowIndex];
      }
      if (selectedRowIndex+1 <= recordsCount && IsGroupHeader) {
        selectedRowIndex = selectedRowIndex + 2;
        this.selectedRowsIndex = [selectedRowIndex];
      }
  }
  
  GridSelectionKeyDown(event: KeyboardEvent, childItemSource?: any, isChildGrid: boolean = false) {
    if (event.key == 'ArrowUp' && !isChildGrid) {
      this.GridKeyUpEvent();
    }
    if (event.key == 'ArrowDown' && isChildGrid) {
      this.GridKeyDownEvent(isChildGrid, childItemSource);
    }
  }

  private GridKeyUpEvent(isChildGrid?: boolean, childItemSource?: any) {
    let selectedRowIndex = this.selectedRowsIndex[0];
      let IsGroupHeader = isChildGrid ? childItemSource[selectedRowIndex-1].IsGroupHeader : this.ItemsSource[selectedRowIndex-1].IsGroupHeader;
      if (selectedRowIndex-1 >= 0 && !IsGroupHeader) {
        selectedRowIndex--;
        this.selectedRowsIndex = [selectedRowIndex];
      }
      if (selectedRowIndex-1 == 0 && IsGroupHeader) {
        return;
      }
      if (selectedRowIndex-1 >= 1 && IsGroupHeader) {
        selectedRowIndex = selectedRowIndex - 2;
        this.selectedRowsIndex = [selectedRowIndex];
      }
  }

  public SetNoRecordsTemplateWidth(gridID: string, templateID: string) {
    this.ContentScrollEvent(undefined, gridID, templateID);
  }

  /**
   * To put no records template in a fixed position when scroll left and right
   * @param event scroll event
   * @param gridID ID of the grid
   * @param templateID ID of the no record template
   */
  public ContentScrollEvent(event: any, gridID: string, templateID: string) {
      let target = document.getElementById(templateID);
      let grid = document.getElementById(gridID);
      if (target && grid) {
          target.style.width = grid.getBoundingClientRect().width + 'px';
          if (event) target.style.left = event.scrollLeft + 'px';
      }
  }
  
  /**
   * Auto fit content width
   * @param ContentWidth entire content's width inside a cell
   * @param Mode mode of the operation add/edit
   * @param e when its a edit, event of the editable column
   */
  public EnableScrollBarVisibility: boolean = false;
  public AutoFitColumnWidthForContent(ContentWidth: number, Mode: string,e?: GridViewColumn, defaultWidth?:boolean) {
    if (ContentWidth <= ContentLength.Small) {
        let width = ColumnResizeWidths.InitialWidth;
        if (Mode == 'U') e.Width = width;
        else this.SetColumnWidth(width);
        this.EnableScrollBarVisibility = false;
    }
    else {
      let width = ContentWidth * 7.5;
      if (Mode == 'U') {
        if(!defaultWidth){
          e.MaxWidth =  (!e.MaxWidth) ? width : Math.max(width,e.MaxWidth);
          e.Width = e.MaxWidth;
        }
        if(defaultWidth && e.Width < width){
          e.Width = width;
        } 
      }
      else this.SetColumnWidth(width);
      this.EnableScrollBarVisibility = true;
    }
  }
  
  private SetColumnWidth(width: number) {
    this.dColumns.forEach((column) => {
        if (column['iGridViewDataColumnIndex'] != 0) column.Width = width;
    })
  }

  /**
   * Handling the hover of locked and unlocked columns
   * @param event mouse hover event
   * @param type type which specifies to add/remove hover
   */
  public HoverEventHandler(event, type: string) {
    const tartgetElement = event.target as HTMLElement;
    const row = tartgetElement.closest('tr');
    const grid = tartgetElement.closest('kendo-grid.k-grid');
    if (row && grid) {
      const rowIndex = row.getAttribute("data-kendo-grid-item-index");
      const contentRow = grid.querySelector(`.k-grid-content tr[data-kendo-grid-item-index="${rowIndex}"]`);
      const lockedRow = grid.querySelector(`.k-grid-content-locked tr[data-kendo-grid-item-index="${rowIndex}"]`);
      if (type == 'ADD') {
        contentRow?.classList.add('k-hover');
        lockedRow?.classList.add('k-hover');
      } else {
        contentRow?.classList.remove('k-hover');
        lockedRow?.classList.remove('k-hover');
      }
    }
  }

  public GridProperties = {};
  public GridColumnProperties = {};
  public GridPropertiesDirective: GridProperties;
  public GridColumnPropertiesDirective: GridColumnProperties;
  public DataTemplatesCollection: any = [];
  public alignmentClasses = {
    'horizontal-align-left': false,
    'horizontal-align-right': false,
    'horizontal-align-center': false,
    'horizontal-align-stretch': false,
    'vertical-align-top': false,
    'vertical-align-bottom': false,
    'vertical-align-center': false,
    'vertical-align-stretch': false,
  };
  public columnAlignmentClasses = {
    'horizontal-content-align-right': false,
    'horizontal-content-align-left': false,
    'horizontal-content-align-center': false,
    'horizontal-content-align-stretch': false,
    'vertical-content-align-top': false,
    'vertical-content-align-bottom': false,
    'vertical-content-align-center': false,
    'vertical-content-align-stretch': false,
  };

  public override set HorizontalAlignment(val: string) {
    this.GridProperties['HorizontalAlignment'] = val;
    if (this.GridPropertiesDirective) {
      this.GridPropertiesDirective.applyGridProperties(this.GridProperties);
    }
  }
  public override set VerticalAlignment(val: string) {
    this.GridProperties['VerticalAlignment'] = val;
    if (this.GridPropertiesDirective) {
      this.GridPropertiesDirective.applyGridProperties(this.GridProperties);
    }
  }
  public override set Visibility(val: any) {
    this.GridProperties['Visibility'] = val;
    if (this.GridPropertiesDirective) {
      this.GridPropertiesDirective.applyGridProperties(this.GridProperties);
    }
  }
  public set HorizontalContentAlignment(val: string) {
    this.GridColumnProperties['HorizontalContentAlignment'] = val;
    if (this.GridColumnPropertiesDirective) {
      this.GridColumnPropertiesDirective.applyGridColumnProperties(
        this.GridColumnProperties
      );
    }
  }
  public override set VerticalContentAlignment(val: string) {
    this.GridColumnProperties['VerticalContentAlignment'] = val;
    if (this.GridColumnPropertiesDirective) {
      this.GridColumnPropertiesDirective.applyGridColumnProperties(
        this.GridColumnProperties
      );
    }
  }
  public override set TextWrapping(val: string) {
    this.GridColumnProperties['TextWrapping'] = val;
    if (this.GridColumnPropertiesDirective) {
      this.GridColumnPropertiesDirective.applyGridColumnProperties(
        this.GridColumnProperties
      );
    }
  }
  public override set Width(val: string | number) {
    this.GridProperties['Width'] = val;
    if (this.GridPropertiesDirective) {
      this.GridPropertiesDirective.applyGridProperties(this.GridProperties);
    }
  }
  public override set MinWidth(val: string) {
    this.GridProperties['MinWidth'] = val;
    if (this.GridPropertiesDirective) {
      this.GridPropertiesDirective.applyGridProperties(this.GridProperties);
    }
  }
  public override set MaxWidth(val: string | number) {
    this.GridProperties['MaxWidth'] = val;
    if (this.GridPropertiesDirective) {
      this.GridPropertiesDirective.applyGridProperties(this.GridProperties);
    }
  }
  public override set MinHeight(val: string) {
    this.GridProperties['MinHeight'] = val;
    if (this.GridPropertiesDirective) {
      this.GridPropertiesDirective.applyGridProperties(this.GridProperties);
    }
  }
  public override set MaxHeight(val: string) {
    this.GridProperties['MaxHeight'] = val;
    if (this.GridPropertiesDirective) {
      this.GridPropertiesDirective.applyGridProperties(this.GridProperties);
    }
  }
  public override set IsEnabled(val: boolean) {
    this.GridProperties['IsEnabled'] = val;
    if (this.GridPropertiesDirective) {
      this.GridPropertiesDirective.applyGridProperties(this.GridProperties);
    }
  }
  public override set Margin(val: string | Thickness) {
    this.GridProperties['Margin'] = val;
    if (this.GridColumnPropertiesDirective) {
      this.GridColumnPropertiesDirective.applyGridColumnProperties(
        this.GridColumnProperties
      );
    }
  }

  ClearDataTemplateCells(){
    this.dataTemplateCells = {};
  }
}

export class GridViewColumn extends ColumnComponent {
  constructor() {
    super();
  }
  public CellTemplate: DataTemplate;
  public CellEditTemplate: DataTemplate;
  public DataControl: any;
  public MinWidth: number;
  public MaxWidth: number;
  public UniqueName: string;

  public get DisplayIndex() {
    return this.orderIndex;
  }
  public set DisplayIndex(value: number) {
    this.orderIndex = value;
  }

  private _Width: any;
  public get Width() {
    this._Width = this['kendoColumn'].width;
    return this._Width;
  }
  public set Width(value: any) {
    if (value instanceof GridViewLength) this._Width = value.Width;
    if (value instanceof GridLength) this._Width = value.Value;
    else this._Width = value;
    this['kendoColumn'].width = this._Width;
  }

  private _IsVisible: boolean;
  public get IsVisible(): boolean {
    this._IsVisible = !this['kendoColumn'].hidden;
    return this._IsVisible;
  }
  public set IsVisible(value: boolean) {
    this._IsVisible = !value;
    this['kendoColumn'].hidden = this._IsVisible;
  }
  private _IsResizable: boolean;
  public get IsResizable(): boolean {
    this._IsResizable = this['kendoColumn'].resizable;
    return this._IsResizable;
  }
  public set IsResizable(value: boolean) {
    this._IsResizable = value;
    this['kendoColumn'].resizable = this._IsResizable;
  }
  private _IsFilterable: boolean;
  public get IsFilterable(): boolean {
    this._IsFilterable = this['kendoColumn'].filterable;
    return this._IsFilterable;
  }
  public set IsFilterable(value: boolean) {
    this._IsFilterable = value;
    this['kendoColumn'].filterable = this._IsFilterable;
  }
  private _IsReadOnly: boolean;
  public get IsReadOnly(): boolean {
    this._IsReadOnly = !this['kendoColumn'].editable;
    return this._IsReadOnly;
  }
  public set IsReadOnly(value: boolean) {
    this._IsReadOnly = !value;
    this['kendoColumn'].editable = this._IsReadOnly;
  }

  public _Header: string;
  public get Header(): string {
    this._Header = this['kendoColumn'].title;
    return this._Header;
  }
  public set Header(value: string) {
    this._Header = value;
    this['kendoColumn'].title = this._Header;
  }
  private _IsReorderable: boolean;
  public get IsReorderable(): boolean {
    this._IsReorderable = this['kendoColumn'].reorderable;
    return this._IsReorderable;
  }
  public set IsReorderable(value: boolean) {
    this._IsReorderable = value;
    this['kendoColumn'].reorderable = this._IsReorderable;
  }

  private _HeaderCellStyle: any;
  public get HeaderCellStyle(): any {
    this._HeaderCellStyle = this['kendoColumn'].headerClass;
    return this._HeaderCellStyle;
  }
  public set HeaderCellStyle(value: string) {
    this._HeaderCellStyle = value;
    let existingClasses = this['kendoColumn'].headerClass;
    if (value && existingClasses) {
      this['kendoColumn'].headerClass = existingClasses + value;
    }
    else {
      this['kendoColumn'].headerClass = value;
    }
  }

  private _CellStyle: any;
  public get CellStyle(): any {
    this._CellStyle = this['kendoColumn'].class;
    return this._CellStyle;
  }
  public set CellStyle(value: any) {
    this._CellStyle = value;
    this['kendoColumn'].class = this._CellStyle;
  }

  private _HeaderTextAlignment: TextAlignment = TextAlignment.Left;
  public get HeaderTextAlignment(): TextAlignment {
    return this._HeaderTextAlignment;
  }
  public set HeaderTextAlignment(value: TextAlignment) {
    switch (value) {
      case 0:
        //this['kendoColumn'].headerStyle = {'justify-content': 'center', display: 'flex', 'align-items': 'center'};
        this['kendoColumn'].headerStyle = { 'text-align': 'center' };
        break;
      case 1:
        this['kendoColumn'].headerStyle = {'justify-content': 'left', display: 'flex', 'align-items': 'center'};
        break;
      case 2:
        this['kendoColumn'].headerStyle = {'justify-content': 'right', display: 'flex', 'align-items': 'center'};
        break;
      case 3:
        this['kendoColumn'].headerStyle = {'justify-content': 'stretch', display: 'flex', 'align-items': 'center'};
        break;
    }
  }
}

export class GridLength {
  constructor(pixels?: number);
  constructor(value: number, type: GridUnitType);
  constructor(value?: number | GridUnitType,type?: GridUnitType) {
    this.Value = value;

    if(type)
    {
      switch (type)
      {
        case GridUnitType.Star:
            this.IsStar = true;
            this.IsAbsolute = false;
            this.IsAuto = false;
            break;
        case GridUnitType.Pixel:
            this.IsAbsolute = true;
            this.IsAuto = false;
            this.IsStar = false;
            break;
        default:
          this.IsAuto = true;
          this.IsAbsolute = false;
          this.IsStar = false;
          break;
      }
    }
  }
  static Auto = 'auto';
  GridUnitType: GridUnitType;
  IsAbsolute: boolean;
  IsAuto: boolean;
  IsStar: boolean;
  Value: number;
}

export enum GridUnitType {
  Auto = 0,
  Pixel = 1,
  Star = 2,
}

export enum SelectionMode {
  Single = 0,
  Multiple = 1,
  Extended = 2,
}

export enum TextAlignment {
  Center = 0,
  Left = 1,
  Right = 2,
  Justify = 3,
}

export class GridViewDataColumn extends GridViewColumn {}
export class iGridViewDataColumn extends GridViewDataColumn {
  static BackgroundProperty: any = 'Background';
  Background:SolidColorBrush;
  constructor() {
    super();
  }
  public kendoColumn: ColumnComponent = new ColumnComponent();
  public ColumnToolTip: string;
  public EnableToolTip: boolean;
  public HeaderTooltip: string;
  public IsWordWrap: boolean;
  public Style = {};

  private _isHeaderWordWrap: boolean;
  public get IsHeaderWordWrap(): boolean {
    return this._isHeaderWordWrap;
  }
  public set IsHeaderWordWrap(value: boolean) {
    let existingClasses = this['kendoColumn'].headerClass + ' ';
    if (value) {
      this['kendoColumn'].headerClass = existingClasses + 'HeaderWordWrap';
    }
    else {
      this['kendoColumn'].headerClass = 'HeaderWordNoWrap';
    }
  }

  public SetValue(property: string, value: any) {
    switch(property) {
      case 'BackgroundProperty':
        this.Style['background-color'] = value.brush;
        break;
    }
  }
}
export class GridViewRowItem extends Control {
  public Cells: List<GridViewCellBase> = new List<GridViewCellBase>();
  public IsAlternating: boolean;
  public IsCurrent: boolean;
  public grdExtension: GridExtension;
  public Index: number;

  private _IsSelected: boolean;
  public get IsSelected(): boolean {
    return this._IsSelected;
  }
  public set IsSelected(value: boolean) {
    this._IsSelected = value;
    if (value) {
      this.grdExtension.selectedRowsIndex = [];
      this.grdExtension.selectedRowsIndex.push(this.Index);
    } else {
      // if val is false remove index from selectedrowsindex
    }
  }

  private _IsEnabled: boolean = false;
  public override get IsEnabled(): boolean {
    return this._IsEnabled;
  }
  public override set IsEnabled(value: boolean | string) {
    let isEnabledTrue: boolean = false;
    if (typeof(value) == 'string') {
      if (value.toLowerCase() == 'true') {
        this._IsEnabled = true;
        isEnabledTrue = this._IsEnabled;
      }
    }
    if (typeof(value) == 'boolean') {
      this._IsEnabled = value as boolean;
      isEnabledTrue = this._IsEnabled;
    }
    if (isEnabledTrue) this.SetIsEnabled(true);
    else this.SetIsEnabled(false);

  }

  private SetIsEnabled(value: boolean) {
    if (value) {
      document.getElementById(this.Cells[0].dataTemplates.GUID).parentElement.parentElement.parentElement.setAttribute(
        "style", "opacity: 1; pointer-events: inherit; user-select: inherit;"
      )
    } else {
      document.getElementById(this.Cells[0].dataTemplates.GUID).parentElement.parentElement.parentElement.setAttribute(
        "style", "opacity: 0.5; pointer-events: none; user-select: none;"
      )
    }
  }

  //public IsHitTestVisible: boolean; // its has to come from UIElement
  public Item: any;
  constructor() {
    super();
  }
  ChildrenOfType?<T = unknown>() {
    return null;
  }

  private _ActualHeight: number = 0;
  get ActualHeight(): number {
    if (this.Cells && Object.keys(this.Cells).length > 1) {
      this._ActualHeight = document.getElementById(this.Cells[0].dataTemplates.GUID).parentElement.parentElement.parentElement.getBoundingClientRect().height;
    }
    return this._ActualHeight;
  }

  set ActualHeight(value: number) {
    this._ActualHeight = value;
  }
}

export class GridViewSelectColumn extends GridViewColumn {
  public override _Header: string;
  public override get Header(): string {
    this._Header = this['kendoColumn'].title;
    return this._Header;
  }
  public override set Header(value: string) {
    this._Header = value;
    this['kendoColumn'].title = this._Header;
  }
  CanFilter(): boolean {
    return this['kendoColumn'].filterable;
  }
  CanGroup() {}
  CanSort(): boolean {
    return this['kendoColumn'].sortable;
  }
}
export class iGridViewSelectColumn extends GridViewSelectColumn {
  ToolTipTemplateSelector: any; //Stub
  public override _Header: string;
  public override get Header(): string {
    this._Header = this['kendoColumn'].title;
    return this._Header;
  }
  public override set Header(value: string) {
    this._Header = value;
    this['kendoColumn'].title = this._Header;
  }

  private _isHeaderCheckBoxVisible: boolean;
  public get isHeaderCheckBoxVisible(): boolean {
    this._isHeaderCheckBoxVisible = this['kendoColumn'].showSelectAll;
    return this._isHeaderCheckBoxVisible;
  }
  public set isHeaderCheckBoxVisible(value: boolean) {
    this._isHeaderCheckBoxVisible = value;
    this['kendoColumn'].showSelectAll = this._isHeaderCheckBoxVisible;
  }
}
export class GridViewHeaderRow extends GridViewRowItem {
  constructor() {
    super();
  }
}
export class iGridViewHeaderRow extends GridViewHeaderRow {
  public ExpButton;
  constructor() {
    super();
  }
  public OnApplyTemplate() {}
}
export class GridViewDataControl {}

export interface SelectionChangeEventArgs extends SelectionEvent {
  AddedItems?: List;
  RemovedItems?: List;
}

export interface SelectionChangingEventArgs extends SelectionChangeEventArgs {
  IsCancelable?: boolean;
  Cancel?: boolean;
}
export interface RowEventArgs {
  Row: GridViewRow;
}

export class GridViewCellBase {
  public Column: GridViewColumn;
  public Content: any; // it has to be from ContentControl
  constructor() {}
}

export class GridViewCell extends GridViewCellBase {
  public IsCurrent: boolean;
  public IsSelected: boolean;
  public DataContext: any;
  public Tag: string;
  public dataTemplates: any;
  public index: number;
  constructor() {
    super();
  }
  public ChildrenOfType<T = unknown>() {
    let gridViewCells = [];
    // this.dataTemplates.forEach((dt: DataTemplate) => {
    //   if (dt.index == this.index && dt.Children.length > 0) {
    //     dt.Children.forEach((child) => {
    //       gridViewCells.push(child);
    //     });
    //   }
    // });
    if(this.dataTemplates &&  this.dataTemplates.length > 1){
    this.dataTemplates.forEach((dt: DataTemplate) => {
      if (dt.index == this.index && dt.Children.length > 0) {
        dt.Children.forEach((child) => {
          gridViewCells.push(child);
        });
      }
    });
    }else{
        if (this.dataTemplates.index == this.index && this.dataTemplates.Children.length > 0) {
          this.dataTemplates.Children.forEach((child) => {
            gridViewCells.push(child);
          });
        }
    }
    return gridViewCells;
  }
  SetBinding(property: any, data: any) {}
}

export class GridViewRow extends GridViewRowItem {
  DataItemGridExtension?: GridExtension;
  public IsExpandable: boolean;

  private _IsExpanded: boolean;
  public get IsExpanded(): boolean {
    return this._IsExpanded;
  }
  public set IsExpanded(value: boolean) {
    this._IsExpanded = value;
    if (value && value == true) {}
    if (value == false) {
      if (this.DataItemGridExtension) {
        let targetIndex = this.DataItemGridExtension.IsMedtechnicaldetails ? this.DataItemGridExtension.expandedDetailKeys.indexOf(this.Item.UniqueIdentifier): this.DataItemGridExtension.expandedDetailKeys.indexOf(this.Item.PrescriptionItemOID);
        this.DataItemGridExtension.expandedDetailKeys.splice(targetIndex, 1);
        this.DataItemGridExtension.expandedDetailKeys = this.DataItemGridExtension.expandedDetailKeys.map(item => item);
      }
    }
  }
  constructor() {
    super();
  }
}

export class RowLoadedEventArgs extends GridViewRow implements RowClassArgs {
  dataItem: any;
  DataElement?: any;
  index: number;
  Row: GridViewRowItem;
  GridViewDataControl?: GridExtension;
}

export class Grid extends GridLayoutComponent {
  public Children: any;
}
export interface GridViewCellClickEventArgs {
  ColumnCell: GridViewCell;
  ColumnIndex: number;
  RowIndex: number;
  MouseEvents?: any;
  TriggerSelectionChange?: boolean;
  selectedRow?: boolean;
  deselectedRow?: boolean;
}
export enum GridViewEditAction {
  Cancel = 0,
  Commit = 1,
}

export enum GridViewLengthUnitType {
  Auto = 0,
  Pixel = 1,
  SizeToCells = 2,
  SizeToHeader = 3,
  Star = 4,
}

export interface GridViewCellEditEndedEventArgs {
  Cell: GridViewCell;
  EditAction: GridViewEditAction;
  EditingElement: any;
  NewData: any;
  OldData: any;
}

export class CellRoutedEventArgs {
  NewValue: any;
  OldValue: any;
}

export interface GridViewCellValidatingEventArgs extends CellRoutedEventArgs, RadRoutedEventArgs {
  Cell: GridViewCell;
  EditingElement: any;
  ErrorMessage: string;
  IsValid: boolean;
  Row: GridViewRowItem;
}

export interface CancelRoutedEventArgs extends RadRoutedEventArgs {
  Cancel: boolean;
}

export interface GridViewBeginningEditRoutedEventArgs
  extends CancelRoutedEventArgs {
  Cell: GridViewCell;
  Row: GridViewRowItem;
}

export class GridViewColumnCollection extends ObservableCollection<GridViewColumn> {
  public columnUniqueName: string;
  public AddRange(items: IEnumerable<GridViewColumn>): void {}
  public RemoveItems(items: IEnumerable<GridViewColumn>): void {}
  public override Add(column: iGridViewDataColumn | iGridViewSelectColumn) {
    super.Add(column);
    this[`${column.UniqueName}`] = column;
  }
}

export enum ListSortDirection {
  Ascending = 0,
  Descending = 1,
}

export interface ISortDescriptor {
  SortDirection: ListSortDirection;
}

export class SortDescriptorCollection extends ObservableCollection<ISortDescriptor> {
  constructor() {
    super();
  }
}

export class SortDescriptor {
  public Member: string;
  public Equals(other: SortDescriptor) {}
  public SortDirection: ListSortDirection;
}

export class GridViewLength {
  Width: number;
  constructor(value?: number);
  constructor(value?: number, type?: GridViewLengthUnitType);
  constructor(value?: number, type?: GridViewLengthUnitType) {
    this.Width = value;
  }
}

@Directive({
  selector: '[UniqueName]',
})
export class UniqueNameDirective {
  uniqueName: string;
  @Input() set UniqueName(v: string) {
    this.uniqueName = v;
  }
  constructor(private el: ColumnComponent) {
    el['UniqueName'] = this;
  }
}

export class RowUnloadedEventArgs extends GridViewRowItem implements RowClassArgs {
  dataItem: any;
  index: number;
  Row: GridViewRowItem;
}
