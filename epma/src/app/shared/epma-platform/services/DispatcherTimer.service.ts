import { EventArgs } from "../controls/Control";
import TimeSpan from "./timespan.service";

export class DispatcherTimer {
    autoSaveInterval: any;
    constructor(){

    }
    private _intervalsecs : number = 0;
    private _intervalTimespan : TimeSpan;

    set Interval( val : TimeSpan | number) {
        if (typeof val == "number") 
            this._intervalsecs =  val;
        else
            this._intervalTimespan =  val;        
    };
    get Interval(){
        if (this._intervalsecs > 0)
            return this._intervalsecs
        else
            return this._intervalTimespan
    }
    public IsEnabled: boolean;
    public Tick:Function;
    public Start(): void{        
        this.autoSaveInterval = setInterval(() => {
            this.Tick({},{})
          }, this._intervalTimespan.TotalMilliseconds)        
    }
    
    public Stop(): void{
        clearInterval(this.autoSaveInterval)
    }
}