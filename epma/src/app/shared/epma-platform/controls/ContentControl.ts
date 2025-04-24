import { Component, Input } from "@angular/core";
import { Control } from "./Control";


@Component({
    selector: 'ContentControl',
    template: `<ng-container *ngIf="Content?.constructor?.name == 'iLabel'">
    <iLabel
      [Text]="Content?.Text"
      [style]="Content?.style"
      [iLabelInLineElements]="Content?.iLabelInLineElements"
      [Tooltip]="Content?.Tooltip"
    ></iLabel>
  </ng-container>  
  <ng-container *ngIf="Content?.constructor?.name == 'StackPanel'">
                <StackPanel
                  [ChildrenElementArray]="Content?.ChildrenElementArray"
                >
                </StackPanel>
              </ng-container>
  <div><ng-content></ng-content></div>`
})

export class ContentControl extends Control {

//bug #36315 created to decorate Content property with input decorator. Platform team to provide implementation 
    @Input() public Content: any;
}