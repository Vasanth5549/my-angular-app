import { Component, Input, OnInit } from '@angular/core';
import { DialogContentBase } from '@progress/kendo-angular-dialog';


@Component({
  selector: 'app-imessagebox',
  templateUrl: './imessagebox.component.html',
  styleUrls: ['./imessagebox.component.css']
})

export class IMessageBoxComponent extends DialogContentBase {

  @Input() title = 'title';
  @Input() message = 'message';
  @Input() buttonType = '';
  @Input() iconType = '';
  @Input() displayButton: any;
  @Input() placeIconCenter: boolean;
  

  imageSrc: any;
  image1: any;
  image2: any;
  image3: any;

  ngOnInit(): void {
    this.icons();
    this.buttonIcons();
  }

  public icons() {
    if (this.iconType == '0') {
      this.imageSrc = './assets/Images/iError32.png';
    } else if (this.iconType == '1') {
      this.imageSrc = './assets/Images/ialert32.png';
    } else if (this.iconType == '2') {
      this.imageSrc = './assets/Images/MSG_Info32.png';
    } else if (this.iconType == '3') {
      this.imageSrc = './assets/Images/MSG_Question32.png';
    } 
  }

  public buttonIcons() {

    if (this.displayButton.button1 == 'Abort') {
      this.image1 = './assets/Images/icon_abort.png';
    } else if (this.displayButton.button1 == 'Ok') {
      this.image1 = './assets/Images/inewokhot.png'
    } else if (this.displayButton.button1 == 'Retry') {
      this.image1 = './assets/Images/icon_retry.png';
    } else if (this.displayButton.button1 == 'Yes') {
      this.image1 = './assets/Images/INewYes.png';
    }

    if (this.displayButton.button2 == 'Cancel') {
      this.image2 = './assets/Images/inewcancel.png';
    } else if (this.displayButton.button2 == 'No') {
      this.image2 = './assets/Images/INewNoHot.png';
    } else if (this.displayButton.button2 == 'Retry') {
      this.image2 = './assets/Images/icon_retry.png';
    }

    if (this.displayButton.button3 == 'Help') {
      this.image3 = './assets/Images/help_hot.png';
    } else if (this.displayButton.button3 == 'Cancel') {
      this.image3 = './assets/Images/MPAD_CancelHOT.png';
    } else if (this.displayButton.button3 == 'Ignore') {
      this.image3 = './assets/Images/MPAD_IgnoreHOT.png';
    }
  }

  public showResult(displayButton: any) {
    this.dialog.close(displayButton);
  }

  // public close(): void {
  //   this.opened = false;
  // }
  focusEvent(event: KeyboardEvent,displayButton: any) {
    if(event.key == "Enter") {
      this.dialog.close(displayButton);
    }
  }
}
