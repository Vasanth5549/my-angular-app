import { Injectable, TemplateRef } from '@angular/core';
import { NotificationService } from '@progress/kendo-angular-notification';
import { Subject } from "rxjs";
import { Inline } from '../controls/Control';
import { List } from 'epma-platform/models';

@Injectable({
  providedIn: 'root'
})
export class ToasterMessageService {

constructor() { }
static templateref: TemplateRef<unknown>;
static templateContent : any;
static notificationserviceref: NotificationService;
static notificationData:Subject<any> = new Subject();
static ShowMessage(src, lines) {    
  let toasterContent : ToasterContent = new ToasterContent() ;
  toasterContent.messageLines = lines;
  toasterContent.imageSource = src;
  ToasterMessageService.templateContent = toasterContent;
  let notificationTemplate = ToasterMessageService.templateref;
  ToasterMessageService.notificationData.next(toasterContent);
  ToasterMessageService.notificationserviceref.show({
    content: notificationTemplate,
    cssClass: "msg-toast",
    position: { horizontal: 'right', vertical: 'bottom' },
    animation: { type: "slide", duration: 400 }    
  });
}
}

export class ToasterContent {
  messageLines : List<Inline>;
  imageSource : string;

}
