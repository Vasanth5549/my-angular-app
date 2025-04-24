import { Injectable } from "@angular/core";
import { DialogRef, DialogService } from "@progress/kendo-angular-dialog";
import { InjectorInstance } from "src/app/app.module";
import { DispatcherTimer } from "./DispatcherTimer.service";
import TimeSpan from "./timespan.service";
import { ObjectHelper } from "./objecthelper.service";

@Injectable({
    providedIn: 'root'
})
export class BusyMessageWindow {
    public dialogRef: DialogRef
    public timer: DispatcherTimer = new DispatcherTimer();
    public Text: string = "Previous activity is in progress.\r\nPlease wait!";
    set DialogResult(value: any) {
        this.dialogRef.close();
    }

    constructor() { }

    // public  BusyMessageWindow_Unloaded()
    // {
    //     this.timer.Tick -= this.timer_Tick();
    // }

    public Show() {
        this.timer.Tick = (s, e) => { this.timer_Tick(s, e); }
        let timespan:TimeSpan = new TimeSpan(0,0,0,2);
        this.timer.Interval = timespan;
        this.timer.Start();
        this.openDialog();
        ObjectHelper.stopFinishAndCancelEvent(true);
    }

    public timer_Tick(s: any, e: any) {
        this.timer.Stop();
        ObjectHelper.stopFinishAndCancelEvent(false);
        this.dialogRef.close();
    }

    public openDialog() {
        let appDialogService: DialogService = InjectorInstance.get<DialogService>(DialogService);

        this.dialogRef = appDialogService.open({
            // title: 'Busy Indicator',
            content: this.Text,
            width: '15%',
            height: '13%',
            cssClass: "busyPanelInfo"
        });
    }

}

export class GlobalVariable {
    public static MessageWin: BusyMessageWindow;
}