import { Input, TemplateRef } from "@angular/core";
import { SelectionChangedEventArgs } from "../controls-model/common-models";
import { List } from "./list";


export interface DialogComponentArgs {
    Component: string | Function | TemplateRef<any>,
    DataContext: object,
    onDialogClose: any
}

export interface DelegateArgs {
    instance: object,
    method: string
}

export enum AppDialogSize {
    Small,
    Medium,
    Large,
    Auto
}

export enum WindowButtonType {
    OkCancel = 0,
    Ok = 1,
    Close = 2,
    None = 3,
}


export class ChildWizardCloseEventargs {
    constructor() { };
    public ContextData: string;
}
export class RadSelectionChangedEventArgs extends SelectionChangedEventArgs{
    constructor(removedItems?:List,addedItems?:List){
        super(removedItems,addedItems);
    }
    public Handled: boolean;
    public OriginalSource: Object;
    public Source: Object;

}