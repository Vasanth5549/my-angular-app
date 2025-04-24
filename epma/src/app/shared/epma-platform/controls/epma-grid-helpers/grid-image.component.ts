import { Component, Input } from "@angular/core";


@Component({
  selector: 'GridImage',
  template: `<img
    src="{{ Source }}"
    alt="Italian Trulli"
    style="height: 22px"
  />`,

  styleUrls: [],
})
export class iGridImage {
  @Input() Source: string;
  @Input() Width: string;
  @Input() Height: string;
}