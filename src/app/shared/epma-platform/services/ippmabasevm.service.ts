import { Injectable } from "@angular/core";

export interface BBWizardVMBase{
    OnCancel() : void,
    OnFinish() : void,
    OnFinishNow() : void,
    OnBeforeCancel() : boolean,
    OnValidate(action) : boolean
}

@Injectable({
    providedIn: 'root'
})

export class IPPMABaseVM implements BBWizardVMBase {

    OnCancel() : void{

    }
    OnFinish() : void{

    }
    OnFinishNow() : void{

    }
    OnBeforeCancel() : boolean{

        return false;

    }
    OnValidate(action) : boolean{

        return false;
    }
    
}