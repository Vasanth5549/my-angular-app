import { DialogRef } from "@progress/kendo-angular-dialog";

export class ChildWindow{
  set Width(value: number) {

    this._DialogRef.dialog.instance.width = value + 'px';

  }
    //STUB code for bug #36098		 
    //Stub Code for Bug 36575
  //  Height: number; 
    _isEnabled:boolean

    get IsEnabled(){
      return this._isEnabled;
    }

    set IsEnabled(val:boolean) {      
      this._isEnabled = val;
    }

    CenterInScreen() {
        throw new Error("Method not implemented.");
    }
    _DialogRef: DialogRef;
    get DialogRef() {
      return this._DialogRef ;
    }
    set DialogRef(value: DialogRef) {
      this._DialogRef = value;
    }

    public set DialogResult(value:boolean | null){
        if(value != null )
        this.DialogRef.close();
    }

  set Height(value: number) {

    this._DialogRef.dialog.instance.height = value + 'px';

  }
}