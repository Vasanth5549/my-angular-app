import {
    DialogService,
    DialogRef,
    DialogCloseResult
} from '@progress/kendo-angular-dialog';
import { InjectorInstance } from "src/app/app.module";
import { IMessageBoxComponent } from '../controls/iMessageBox/imessagebox.component';
import { AppLoadService } from './appLoad.service';
import { ObjectHelper } from './objecthelper.service';

export class iMessageBox {
    public buttons = { 'button1': 'none', 'button2': 'none', 'button3': 'none' };
    public Title = 'Information - LORENZO';
    public Message = '';
    public PlaceIconCenter: boolean;
    public MessageButton!: MessageBoxButton ;
    public Width;
    public Height;
    public OverlayBrush: any;
    public Tag: any;
    public IconType: MessageBoxType = MessageBoxType.Information;
    public MessageBoxClose: Function;
    public dialogService: DialogService = InjectorInstance.get<DialogService>(DialogService);
    public Closed : Function;
    public Close : Function;
    public HasCloseButton:boolean = true;
    public sender : any;

    constructor();

    // constructor(msgBoxArgs?:any) {
    //   this.Title = msgBoxArgs.Title;
    //   this.Message = msgBoxArgs.Message;
    //   this.Width = msgBoxArgs.Width;
    //   this.Height = msgBoxArgs.Height;
    //   this.OverlayBrush = msgBoxArgs.OverlayBrush;
    //   this.Tag = msgBoxArgs.Tag;
    //   this.MessageButton = msgBoxArgs.MessageButton;
    //   this.IconType = msgBoxArgs.IconType;
    // };


    constructor(
        Title?: string,
        Message?: string,
        MessageButton?: MessageBoxButton,
        Width?: number,
        Height?: number,
        OverlayBrush?: any,
        Tag?: any,
        IconType?: MessageBoxType
    );
    constructor(
        Title?: string,
        Message?: string,
        MessageButton?: MessageBoxButton,
        Width?: number,
        Height?: number,
        OverlayBrush?: any,
        Tag?: any,
        IconType?: MessageBoxType,
        sender?:any
    ) {
        if (Title != undefined) {
            this.Title = Title!;
        }
        this.Message = Message!;
        this.MessageButton = MessageButton!;
        this.Width = Width!;
        this.Height = Height!;
        this.OverlayBrush = OverlayBrush!;
        this.Tag = Tag!;
        // this.IconType = IconType!;
        this.sender = sender!;
    }

    
    public Show(traceUniqueMsgBox?: boolean): void {
       if(traceUniqueMsgBox == true){
        let UniqueID = this.Tag + ~ + this.Message;
        let uniqueList = AppLoadService.uniqueMgsBoxList.filter(ele => ele == UniqueID);
        if(uniqueList && uniqueList.length > 0){
            return;
        }else{
            AppLoadService.uniqueMgsBoxList.push(UniqueID)
        }
        }
        AppLoadService.allMgsBoxList.push(this.Title + ~ + Math.random());
        if(AppLoadService.allMgsBoxList.length == 1)
        ObjectHelper.stopFinishAndCancelEventCommon(true);

        const dialogRef : DialogRef = this.dialogService.open({
            content: IMessageBoxComponent,
            width: this.Width == undefined ? 350 : this.Width,
            height: this.Height,
        });
        if(!this.HasCloseButton)
        setTimeout(() => {
         dialogRef.dialog.instance.dialog.nativeElement.querySelector('.k-window-actions.k-dialog-actions')
        .style.display = 'none'
        }, 0);

        const msgInfo = dialogRef.content.instance as IMessageBoxComponent;
        msgInfo.title = this.Title;
        msgInfo.message = this.Message;
        msgInfo.placeIconCenter = this.PlaceIconCenter;
        if (this.IconType !== undefined) {
            msgInfo.iconType = this.IconType.toString();
        } else {
            msgInfo.iconType = '';
        }
        if (this.MessageButton !== undefined) {
            msgInfo.buttonType = this.MessageButton.toString();
        } else {
            msgInfo.buttonType = '';
        }
      
        this.fillButtonCaption(this.MessageButton);
        msgInfo.displayButton = this.buttons;

        dialogRef.result.subscribe((result) => {
            //  let obj: object = {};
            let e = new MessageEventArgs();
            if(result != null && result instanceof DialogCloseResult){
                let buttonType = this.MessageButton;
                switch (buttonType) {
                    case MessageBoxButton.OK: {
                        e.MessageBoxResult = MessageBoxResult.OK;
                        break;
                    }
                    case MessageBoxButton.OKCancel: {
                        e.MessageBoxResult = MessageBoxResult.Cancel;
                        break;
                    }
                    case MessageBoxButton.YesNo: {
                        e.MessageBoxResult = MessageBoxResult.No;
                        break;
                    }
                    case MessageBoxButton.YesNoCancel: {
                        e.MessageBoxResult = MessageBoxResult.Cancel;
                        break;
                    }
                }
            }else{
                switch (result) {
                    case 'Abort': {
                        e.MessageBoxResult = MessageBoxResult.Abort;
                        break;
                    }
                    case 'Cancel': {
                        e.MessageBoxResult = MessageBoxResult.Cancel;
                        break;
                    }
                    case 'Ignore': {
                        e.MessageBoxResult = MessageBoxResult.Ignore;
                        break;
                    }
                    case 'No': {
                        e.MessageBoxResult = MessageBoxResult.No;
                        break;
                    }
                    case 'Ok': {
                        e.MessageBoxResult = MessageBoxResult.OK;
                        break;
                    }
                    case 'Retry': {
                        e.MessageBoxResult = MessageBoxResult.Retry;
                        break;
                    }
                    case 'Help': {
                        e.MessageBoxResult = MessageBoxResult.Help;
                        break;
                    }
                    case 'Yes': {
                        e.MessageBoxResult = MessageBoxResult.Yes;
                        break;
                    }
                    case 'None': {
                        e.MessageBoxResult = MessageBoxResult.None;
                        break;
                    }
    
    
                }
            }
            if(AppLoadService.allMgsBoxList.length > 0){
                AppLoadService.allMgsBoxList.splice(0, 1);
            }
            if(AppLoadService.allMgsBoxList.length == 0 && AppLoadService.allOpenWindowList.length == 0){
                ObjectHelper.stopFinishAndCancelEventCommon(false);
            }
            if (this.MessageBoxClose != undefined) {
                let UniqueID = this.Tag + ~ + this.Message;
                let indexToRemove = AppLoadService.uniqueMgsBoxList.indexOf(UniqueID);
                if (indexToRemove > -1) {
                        AppLoadService.uniqueMgsBoxList.splice(indexToRemove, 1);
                }

                this.MessageBoxClose(this.sender,e);
            }
            if (this.Closed != undefined && this.Closed instanceof Function) {
                if(this.sender){
                    this.Closed(this.sender,e);
                }else
                this.Closed({},e);
            }
            if (this.Close != undefined && this.Close instanceof Function) {
                this.Close({},e);
            }

        }
        );


    }
    public static Show(
        Title: string,
        Message: string,
        IconType: MessageBoxType,
        ButtonType: MessageBoxButton
    ): void {
        let msgBox = new iMessageBox(
            Title,
            Message,
            ButtonType,
            undefined,
            undefined,
            undefined,
            undefined,           
            IconType
        );
        msgBox.Show();
    }
    private fillButtonCaption(messageButton: MessageBoxButton) {

        switch (messageButton) {
            case MessageBoxButton.OK:
                {
                    this.buttons.button1 = 'Ok';
                    this.buttons.button2 = 'none';
                    this.buttons.button3 = 'none';

                    break;
                }
            case MessageBoxButton.OKCancel:
                {
                    this.buttons.button1 = 'Ok';
                    this.buttons.button2 = 'Cancel';
                    this.buttons.button3 = 'none';

                    break;
                }
            case MessageBoxButton.OKCancelHelp:
                {
                    this.buttons.button1 = 'Ok';
                    this.buttons.button2 = 'Cancel';
                    this.buttons.button3 = 'Help';

                    break;
                }
            case MessageBoxButton.YesNo:
                {
                    this.buttons.button1 = 'Yes';
                    this.buttons.button2 = 'No';
                    this.buttons.button3 = 'none';

                    break;
                }
            case MessageBoxButton.RetryCancel:
                {
                    this.buttons.button1 = 'Retry';
                    this.buttons.button2 = 'Cancel';
                    this.buttons.button3 = 'none';

                    break;
                }
            case MessageBoxButton.YesNoCancel:
                {
                    this.buttons.button1 = 'Yes';
                    this.buttons.button2 = 'No';
                    this.buttons.button3 = 'Cancel';

                    break;
                }
            case MessageBoxButton.AbortRetryIgnore:
                {
                    this.buttons.button1 = 'Abort';
                    this.buttons.button2 = 'Retry';
                    this.buttons.button3 = 'Ignore';

                    break;
                }


        }
        return this.buttons;

    }
}
export class MessageBoxDelegate {
    instance: any;
    method: string | any;
}
export class MessageEventArgs {
    constructor(oMessageBoxResult?: MessageBoxResult|any) { this.MessageBoxResult = oMessageBoxResult; }
    MessageBoxResult: MessageBoxResult | any;
}
export enum MessageBoxType {
    Critical = 0,
    Exclamation = 1,
    Information = 2,
    Question = 3,
}
export enum MessageBoxResult {
    Abort = 0,
    Cancel = 1,
    Ignore = 2,
    No = 3,
    OK = 4,
    Retry = 5,
    Help = 6,
    Yes = 7,
    None = 8,
}

export enum MessageBoxButton {
    AbortRetryIgnore = 0,
    OK = 1,
    OKCancel = 2,
    RetryCancel = 3,
    YesNo = 4,
    YesNoCancel = 5,
    OKCancelHelp = 6,
}

export class MessageBox {
    public static Show(
        Message: string
    ): void {
        /*let msgBox = new iMessageBox(
            undefined,
            Message,
            undefined,
            undefined,
            undefined,
            undefined,
            MessageBoxButton.OK,
            MessageBoxType.Critical
        );
        msgBox.Show();*/
        iMessageBox.Show(undefined, Message, MessageBoxType.Critical, MessageBoxButton.OK);
    }    
}
