import { Component, Input } from '@angular/core';
import { GridExtension } from '../grid-extension';
import { iComboBox, iTextBox, iTimeBox } from 'epma-platform/controls';

@Component({
  selector: 'GridCellEditTemplate',
  templateUrl: './grid-cell-edit-template.component.html',
  styleUrls: ['./grid-cell-edit-template.component.css'],
})
export class GridCellEditTemplateComponent {
  public cellEditingGrid: GridExtension = new GridExtension();
  @Input() cell: any;
  @Input() dataItem: any;
  @Input() DynamicControlFocus: iTimeBox | iComboBox | iTextBox;

  @Input() GridColumn: any;
  _GridHelper: GridExtension;
  get GridHelper() {
    return this._GridHelper;
  }
  @Input() set GridHelper(value: GridExtension) {
    this._GridHelper = value; 
  }

  public ToolTip = '';

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

  private _BindingPath: any;
  public get BindingPath(): any {
    return this._BindingPath;
  }
  @Input() set BindingPath(val: any) {
    this._BindingPath = val;
  }


  constructor() { }
}
