import { Component, Input } from "@angular/core";


@Component({
  selector: 'CellStyle',
  template: `<ng-content></ng-content>`,
  styleUrls: [],
})
export class CellStyle {
  @Input() Property: string;
  @Input() Value: string;
  @Input() columnName: string;
}