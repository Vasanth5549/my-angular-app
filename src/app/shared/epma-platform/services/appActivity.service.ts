import { TemplateRef } from '@angular/core';
import {
    DialogService,
    DialogRef,
    DialogCloseResult
} from '@progress/kendo-angular-dialog';
import { AppDialogEventargs, AppDialogResult, WindowButtonType } from 'epma-platform/models';
import { InjectorInstance } from "src/app/app.module";
import { AppDialog } from '../controls/app-dialog/app-dialog.component';
import { AppDialogSize } from '../models/appdialog.type';
import { medsupplydispensinginstructionstab } from 'src/app/lorappmanageprescriptionbbui/view/medsupplydispensinginstructionstab';
import { ObjectHelper } from './objecthelper.service';
import { AppLoadService } from '..';

export class AppActivity {
    private static hasCloseButtonChldWndw:boolean = true;

    constructor() {

    }
    
    public static fillButtonCaption(buttonType: WindowButtonType) {
        let buttons = { 'button1': 'none', 'button2': 'none', 'button1Enable': true, 'button2Enable': false };
        switch (buttonType) {
            case WindowButtonType.OkCancel:
                {
                    buttons.button1 = 'Ok';
                    buttons.button2 = 'Cancel';
                    buttons.button1Enable = true;
                    buttons.button2Enable = true;
                    break;
                }
            case WindowButtonType.Ok:
                {
                    buttons.button1 = 'Ok';
                    buttons.button2 = 'none';
                    buttons.button1Enable = true;
                    buttons.button2Enable = false;
                    break;
                }
            case WindowButtonType.Close:
                {
                    buttons.button1 = 'Close';
                    buttons.button2 = 'none';
                    buttons.button1Enable = true;
                    buttons.button2Enable = false;
                    break;
                }
        }
        return buttons;
    }

    public static getPrototype(appDialog) {
        return Object.getPrototypeOf(appDialog);
    }
    
    public static SetSize(Size:AppDialogSize)
    {
        let res = {Width:0,Height:0};
        switch (Size)
        {
            case AppDialogSize.Small:
                res.Width = 370;
                res.Height = 230;
                break;
            case AppDialogSize.Medium:
                res.Width = 800;
                res.Height = 400;
                break;
            case AppDialogSize.Large:
                res.Width = 800;
                res.Height = 500;
                break;
            case AppDialogSize.Auto:
                break;
            default:
                break;
        }
        return res;
    }
    public static OpenWindow(Title: string, PageContent: any, OnbtnClick: Function, DialogTitle: string, IsHelpIconVisible: boolean, Height: number, Width: number, ShowDialogTitle: boolean, ButtonType: WindowButtonType, ExtendedContent:Object,ohasClsBttnfrChldWndw?:boolean,popup?:AppDialog,Callback?:Function, panelCss?: String): any {
        this.hasCloseButtonChldWndw = ohasClsBttnfrChldWndw != null ? ohasClsBttnfrChldWndw : true;
        this.OpenDialogWindow(Title, PageContent, OnbtnClick, null, DialogTitle, AppDialogSize.Small, IsHelpIconVisible, Height, Width, ShowDialogTitle, ButtonType, ExtendedContent,popup,Callback, panelCss);
    }
   
    public static OpenDialog(Title:string, PageContent:Object, OnbtnClick:Function, DialogTitle:string, IsHelpIconVisible:boolean, Height?:number, Width?:number,popup?): void
    {
        this.OpenDialogWindow(Title, PageContent, OnbtnClick,null,DialogTitle, AppDialogSize.Small, IsHelpIconVisible, Height, Width, true,WindowButtonType.OkCancel, null,popup);
    }  
    public static OpenDialogWindow(Title: string, PageContent: any, OnbtnClick: Function, ButtonCommand: any, DialogTitle: string, Size: AppDialogSize, IsHelpIconVisible: boolean, Height: number, Width: number, ShowDialogTitle: boolean, ButtonType: WindowButtonType, ExtendedContent: Object,popup?,Callback?:Function, panelCss?: String): void{
        let appDialogService: DialogService = InjectorInstance.get<DialogService>(DialogService);
        let displayButton = AppActivity.fillButtonCaption(ButtonType);

        if(Size != null && (Width == null && Height == null)){ // Revisit the size Ref by silverlight
            let widthHeightObj = this.SetSize(Size);
            Width = widthHeightObj.Width;
            Height = widthHeightObj.Height;
        }
        ObjectHelper.OpenWindowInst = true;
        AppLoadService.allOpenWindowList.push(Title + ~ + Math.random());
        if(AppLoadService.allOpenWindowList.length == 1)
        ObjectHelper.stopFinishAndCancelEventCommon(true);
        let dialogRef = appDialogService.open({
            title:Title,
            content: AppDialog,
            width: Width,
            height: Height,
            cssClass: panelCss, 
            preventAction: (ev, dialogRef) => {
                let e = new AppDialogEventargs();
                e.AppChildWindow = dialogRef?.content.instance;
                e.Content = dialogRef?.content.instance;
                e.Result = AppDialogResult.Cancel;
                OnbtnClick(e);
                return ev instanceof DialogCloseResult;
            }
        });

        let dialogWindow: AppDialog = dialogRef.content.instance;
        dialogWindow.displayButton = displayButton;
        dialogWindow.refCallback = Callback;
        dialogWindow['DialogRef'] = dialogRef;
        dialogWindow.IsHelpIconVisible = IsHelpIconVisible;
        dialogWindow.diaglogTitle = DialogTitle;
        dialogWindow.showDialogTitle = ShowDialogTitle;
        dialogWindow.title = Title;
        if (OnbtnClick != null)
        dialogWindow.onDialogClose = OnbtnClick;
        else 
        dialogWindow.onDialogClose = ButtonCommand;
        if(popup != null)
        dialogWindow['_PopupParent'] = popup['_PopupParent'];
        dialogWindow.dupDialogRef = dialogRef;
        for (var property in dialogWindow) {
            if(property == "_appDialog"){     
                dialogWindow.appDialog = AppActivity.getPrototype(dialogWindow.appDialog);
                dialogWindow.appDialog.DialogRef = dialogRef;
            }
        }
        dialogWindow.PageContent = PageContent;
        PageContent.onDialogClose = OnbtnClick; 
        setTimeout(()=>{
            dialogWindow.draggableDialogRef = dialogWindow.dupDialogRef.dialog.instance.dialog;
        })
        if(this.hasCloseButtonChldWndw != null && !this.hasCloseButtonChldWndw)
        {
            setTimeout(() => {
                dialogRef.dialog.instance.dialog.nativeElement.querySelector('.k-window-actions.k-dialog-actions')
               .style.display = 'none'
               }, 0);
        }
        const dialogClose = dialogRef.close;
        let doubleclick = true;
        dialogRef.close = () => {
            if(doubleclick){
                if(AppLoadService.allOpenWindowList.length > 0){
                    AppLoadService.allOpenWindowList.splice(0, 1);
                }
                if(AppLoadService.allMgsBoxList.length == 0 && AppLoadService.allOpenWindowList.length == 0){
                    ObjectHelper.stopFinishAndCancelEventCommon(false);
                }
                console.log("dialogClose.NewEvent");
                doubleclick = false;
            }
            dialogClose();
        }
        if (ExtendedContent != null)
            dialogWindow.extendPageContent = ExtendedContent;
    }

    public static OpenWindowTVCA(Title: string, Comp: any, width: number, height: number, data: any, OnbtnClick: Function, ButtonType: WindowButtonType, temp: any, customDialogRef: DialogRef, Callback: Function) {
        let appDialogService: DialogService = InjectorInstance.get<DialogService>(DialogService);
        
        AppLoadService.allOpenWindowList.push(Title + ~ + Math.random());
        if(AppLoadService.allOpenWindowList.length == 1)
        ObjectHelper.stopFinishAndCancelEventCommon(true);

        let TVCAdialogRef = appDialogService.open({
            title: Title,
            content: Comp,
            width: width,
            height: height,
            actions: temp,
            cssClass: "TVCA", 
            preventAction: (ev, dialogRef) => {
                let e = new AppDialogEventargs();
                e.AppChildWindow = dialogRef?.content.instance;
                e.Content = dialogRef?.content.instance;
                e.Result = AppDialogResult.Cancel;
                OnbtnClick(e);
                return ev instanceof DialogCloseResult;
            }
          });
          ObjectHelper.OpenWindowInst = true;
          let userInfo = TVCAdialogRef.content.instance as medsupplydispensinginstructionstab;
          userInfo.TVCAdupDialogRef = TVCAdialogRef;
          userInfo.PrescriptionItemVM = data;

        const TVCAdialogRefdialogClose = TVCAdialogRef.close;
        setTimeout(()=>{
            userInfo.draggableDialogRef = userInfo.TVCAdupDialogRef.dialog.instance.dialog;
        })
        let doubleclick = true;
        TVCAdialogRef.close = () => {
            if(doubleclick){
                if(AppLoadService.allOpenWindowList.length > 0){
                    AppLoadService.allOpenWindowList.splice(0, 1);
                }
                if(AppLoadService.allMgsBoxList.length == 0 && AppLoadService.allOpenWindowList.length == 0){
                    ObjectHelper.stopFinishAndCancelEventCommon(false);
                }
                console.log("dialogClose.NewEvent");
                doubleclick = false;
            }
            TVCAdialogRefdialogClose();
        }

        //   customDialogRef = dialogRef;
        Callback(TVCAdialogRef, userInfo);
    }
}

