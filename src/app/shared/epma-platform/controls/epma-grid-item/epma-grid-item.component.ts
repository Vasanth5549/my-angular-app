import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { GridExtension } from '../epma-grid-helpers/grid-extension';
import { iTextBox } from '../epma-itextbox/epma-itextbox.component';

@Component({
  selector: 'GridItem',
  templateUrl: './epma-grid-item.component.html',
  styleUrls: ['./epma-grid-item.component.css']
})
export class GridItem {

  @Input() cell: string;

  @Input() Control:any;

  @Input() GridColumn: any;
  @ViewChild('DynamicTextBox') DynamicTextBox: iTextBox;

  @ViewChild('DynamicRenderConrol') DynamicRenderConrol: any;

  _GridHelper: GridExtension;
  get GridHelper() {
    return this._GridHelper;
  }
  @Input() set GridHelper(value: GridExtension) {
    this._GridHelper = value;
  }

  _DataContext: any;
  get DataContext() {
      return this._DataContext;
  }
  @Input() set DataContext(value: any) {
      this._DataContext = value;
  }

}