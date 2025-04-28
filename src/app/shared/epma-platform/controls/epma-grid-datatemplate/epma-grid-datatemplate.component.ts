import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'GridDataTemplate',
  templateUrl: './epma-grid-datatemplate.component.html',
  styleUrls: ['./epma-grid-datatemplate.component.css']
})
export class GridDataTemplate implements OnInit {

  public ToolTip = '';

  constructor() {
  }

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

  ngOnInit(): void {
  }

}
