import { Component, Input } from "@angular/core";
import { ChildWindow } from "./ChildWindow";
import { UserControl } from "./UserControl";
import { DialogRef } from "@progress/kendo-angular-dialog";


@Component({
    template: ''
})

export class iAppDialogWindow extends UserControl {

    public onAppDialogClose:Function;

    _HelpCode: string = String.Empty;
    public get HelpCode(): string {
        return this._HelpCode;
    }
    public set HelpCode(value: string) {
        this._HelpCode = value;
    }
    
    _appDialog: ChildWindow = new ChildWindow();
    get appDialog() {
      return this._appDialog ;
    }
    set appDialog(value: ChildWindow) {
      this._appDialog = value;
    }
    dupDialogRef:DialogRef;
    TVCAdupDialogRef:DialogRef;
   // override Width:any;
    public override UpdateLayout():void{}
    // Dispatcher:any;
    _onDialogClose: any;
    get onDialogClose() {
      return this._onDialogClose ;
    }
    @Input() set onDialogClose(value: any) {
      this._onDialogClose = value;
    }
    override _DataContext: any;
    override get  DataContext() {
      return this._DataContext;
    }
    @Input() override set DataContext(value: any) {
      this._DataContext = value;
    }

}
