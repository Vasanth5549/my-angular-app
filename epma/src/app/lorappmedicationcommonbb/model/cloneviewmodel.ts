import { Component, OnInit } from '@angular/core';
import { StringBuilder,ProfileFactoryType,ContextManager,Convert,AppActivity} from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp,Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison, List, IEnumerable } from 'epma-platform/models';
import { AppDialog } from 'epma-platform/controls';
import { HelperService} from 'epma-platform/soapclient';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
import { ViewModelBase } from 'src/app/lorappcommonbb/viewmodelbase';
import { Dictionary } from 'epma-platform/dictionary';
import * as _ from 'lodash';
//To be removed and implement properly - Begin
export enum BindingFlags {
    Default = 0,
    IgnoreCase = 1,
    DeclaredOnly = 2,
    Instance = 4,
    Static = 8,
    Public = 16,
    NonPublic = 32,
    FlattenHierarchy = 64,
    InvokeMethod = 256,
    CreateInstance = 512,
    GetField = 1024,
    SetField = 2048,
    GetProperty = 4096,
    SetProperty = 8192,
    PutDispProperty = 16384,
    PutRefDispProperty = 32768,
    ExactBinding = 65536,
    SuppressChangeType = 131072,
    OptionalParamBinding = 262144,
    IgnoreReturn = 16777216
}
export class PropertyInfo  {    
    public SetValue(): void { throw new Error('not implemented'); }    
}
//To be removed and implement properly - End
export class CloneViewModel {        
    storedProperties: Dictionary<PropertyInfo, Object> = new Dictionary<PropertyInfo, Object>();
    originator: Object;
    constructor(VM: Object) {
        this.originator = VM;

        
        this.storedProperties = ObjectHelper.ShallowCloneObject(this.storedProperties,this.originator);
    }
    public Restore(): void {
       ObjectHelper.CreateObject(this.originator,this.storedProperties);
    }
}
export class ViewModelClone {
    private _memento: List<CloneViewModel>;
    public set Memento(value: List<CloneViewModel>) {
        this._memento = value;
    }
    public get Memento(): List<CloneViewModel> {
        if (this._memento == null) {
            this._memento = new List<CloneViewModel>();
        }
        return this._memento;
    }
}
export class ClonableViewModelBase extends ViewModelBase {        
    private _caretaker: ViewModelClone;
    public get CareTaker(): ViewModelClone {
        if (this._caretaker == null) {
            this._caretaker = new ViewModelClone();
        }
        return this._caretaker;
    }
    public get Clone(): CloneViewModel {
        return new CloneViewModel(this);
    }
    public Restore(memento: CloneViewModel): void {
        memento.Restore();
    }        
}