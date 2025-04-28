
export class RelayCommand<T=unknown>{
    private _function:Function;
    constructor(...execute:Function[] ){
        this._function = execute[0];
    }

    /**
     * Trigger
     */
    public Trigger(param?:any) {      
        if (param)  
        this._function(param);
        else
        this._function();
    }
}
