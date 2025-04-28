import { Component, Input, OnInit } from '@angular/core';
import { Control, StackPanel, TextBlock } from 'epma-platform/controls';

@Component({
  selector: 'DC-StackPanel',
  templateUrl: './epma-dc-stackpanel.component.html',
  styleUrls: ['./epma-dc-stackpanel.component.css']
})
export class EpmaDcStackpanelComponent extends StackPanel implements OnInit {

  constructor() { super() }

  override _DataContext: any;
  override get DataContext() {
      return this._DataContext;
  }
  @Input() override set DataContext(value: any) {
      this._DataContext = value;
  }
}
