import { Component, Input } from "@angular/core";
import { Control } from "./Control";
import { iButton } from "./epma-button/epma-button.component";
import { Subject } from "rxjs";
import { InjectorInstance } from "src/app/app.module";
import { SubjectEventEmitterService } from "../services/subject-eventemitter.service";

@Component({
  template: ''
})

export class UserControl extends Control {
  public Content: any = {};
  @Input() ParentRef: any;
  public subjectEventEmitterService: SubjectEventEmitterService =
    InjectorInstance.get<SubjectEventEmitterService>(SubjectEventEmitterService);
  Loaded: Function;//to call this Loaded, in ngafterviewinit of component super.AfterViewInit();
  override FindName(name: string): any {
    return super.FindName(name);
  };

  GetOkButton(comp?: any): iButton {
    let x: iButton = new iButton();

    if (comp) {
      x.okButtonCompRef = comp.constructor.name;
    }
    //appdialog button
    x.isAppDialogOkButton = true;

    return x;
  }
  AfterViewInit() {
    if (this.Loaded instanceof Function) {
      this.Loaded();
    }
  }
}
//UserControl.prototype.DataContext = new IPPMABaseVM();