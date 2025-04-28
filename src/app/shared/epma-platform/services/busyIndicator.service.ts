import '../models/string.extensions';
import { StringComparison } from './stringcomparison';
import { DialogRef, DialogService } from '@progress/kendo-angular-dialog';
import { InjectorInstance } from 'src/app/app.module';
import { iBusyIndicatorDialog } from '../controls/iBusyIndicator-dialog/iBusyIndicator-dialog.component';
import { ObjectHelper } from './objecthelper.service';
export class BusyIndicator {

    constructor() { }

    public static SetStatusIdle(sKey: string): void {
        iBusyIndicator.Stop(sKey);
        if (String.Equals("FormViewer", sKey, StringComparison.OrdinalIgnoreCase) || String.Equals("FormViewerClick", sKey, StringComparison.OrdinalIgnoreCase) || String.Equals("PresChartAmend", sKey, StringComparison.OrdinalIgnoreCase)) {
            CommonVariables.FormViewerIsInProgress = false;
        }
    }

    public static SetStatusBusy(sKey: string, HideCancelButton?: boolean): void {
        iBusyIndicator.Start(sKey, HideCancelButton);
        if (String.Equals("FormViewer", sKey, StringComparison.OrdinalIgnoreCase) || String.Equals("FormViewerClick", sKey, StringComparison.OrdinalIgnoreCase) || String.Equals("PresChartAmend", sKey, StringComparison.OrdinalIgnoreCase)) {
            CommonVariables.FormViewerIsInProgress = true;
        }
    }

}

export class CommonVariables {
    public static FormViewerIsInProgress: boolean;
}

export interface iBusyIndicatorRequest {
    Key: string,
    Status: string
}

export class iBusyIndicatorEventArgs {
    public static ForceStop: boolean
}

// export function  BusyIndicatorEventHandler( e:iBusyIndicatorEventArgs);

export class iBusyIndicator{    
    static _Requests : iBusyIndicatorRequest;
    static _ActiveRequestCount:number = 0;
    static _ActiveRequestDisableCount:number = 0;
    public static  OnStop:Function ;
    static objEventArgs:iBusyIndicatorEventArgs = new iBusyIndicatorEventArgs();
    public static dialogRef: DialogRef;
    public static arrDialogRef = [];

    constructor() { }

    public static  Start(Key:string, DisableForceClose?:boolean):void{
        let findobj = null;
        if(this.arrDialogRef.length > 0){
            findobj = this.arrDialogRef.find((data) => data.Key == Key);
        }
        if(findobj == null){
            ObjectHelper.stopScreenFreezeEvent(true);
            let appDialogService: DialogService = InjectorInstance.get<DialogService>(DialogService);
    
             this.dialogRef = appDialogService.open({
                content: iBusyIndicatorDialog,
                width: 215,
                height: 105,
                cssClass: "busyPanel"
            });
            this.arrDialogRef.push({Key:Key,dialogRef:this.dialogRef});
            const dialogInfo = this.dialogRef.content.instance as iBusyIndicatorDialog;
            this.dialogRef.result.subscribe((result) => {            
            })
        }

    }

    public static Stop(Key: string): void {
        let keyFound = false;
        let findobj = null;
        if(this.arrDialogRef.length > 0){
            findobj = this.arrDialogRef.find((data) => data.Key == Key);
        }
        if(findobj != null){
        this.arrDialogRef.forEach((val, index) => {
            if (val.Key == Key && !keyFound) {
                val.dialogRef.close();
                this.arrDialogRef.splice(index, 1);
                keyFound = true;
            }
        })
        }
    }
    public static GetStatus(Key:string):string{
        return '';
    }
    public static  DoCleanup():void
    {
        
    }

    static iPBar_StopProgress(sender:object, e):void{
        try
        {
            if (e.IsForceStop == true)
            {
                this.Abort();
            }
        }
        catch (ex)
        {
        }
    }

    public static  Abort():void{
        if (!this._Requests)
        return;
    }

    public static  ForceStop():void
    {
        
    }


}
