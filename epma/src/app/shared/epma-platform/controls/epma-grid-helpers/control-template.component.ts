import { Component, Input } from "@angular/core";


@Component({
  selector: 'ControlTemplate',
  template: `<ng-content></ng-content>`,
  styleUrls: [],
})
export class ControlTemplate {
  @Input() TargetType: string;
}