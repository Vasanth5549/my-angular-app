import { InjectorInstance } from "src/app/app.module";
import { AggregateService } from "./aggregate.service";
import { UtilityService } from "./utility.service";

export class AppSession {
    private static _instance: AppSession;
    public static OnResult:Function;

    constructor() { }

    public static SetString(key: string, value: string) {
        if (key && !String.IsNullOrEmpty(key)) {
        let requestBody = "FunctionName=SetAppSession&Key="+ key+ "&Value="+ value;
        let flowID = 'SetAppSession';
        let aggregateService: AggregateService = InjectorInstance.get< AggregateService >(AggregateService);
        aggregateService.postAggregateData(flowID,requestBody).subscribe({
            next(data){
            },
            error(err){
                console.log("Something went wrong! Unable set app session.");
            },
          })
        }
    }

    public static GetString(key: string, OnAppSessionEventArgs: Function) {
        // if (key != '' && key != undefined) {
        //     if (AppSession._instance.ContainsKey(key)) {
        //         return this[key];
        //     }
        // }
        let requestBody = "FunctionName=GetAppSession&Key="+ key;
        let flowID = 'GetAppSession';
        let aggregateService: AggregateService = InjectorInstance.get< AggregateService >(AggregateService);
        let OnResult:Function = this.OnResult;
        let sender = {Request:key};
        aggregateService.postAggregateData(flowID,requestBody).subscribe({
            next(data){
                // UtilityService.xmlToJson(data).subscribe({
                //     next: (jsonData: any) => {
                        let Result = data;
                        if(OnResult && OnResult instanceof Function){
                            OnResult(null,Result);
                        }
                        if (Result.IndexOf('&') != -1) {
                            let ResultData: string[] = Result.replace("&&","&").Split('&');
                            if (ResultData.length != 3)
                                return;
                            let objEventArgs: AppSessionEventArgs = new AppSessionEventArgs();
                            objEventArgs.KeyName = ResultData[0];
                            objEventArgs.KeyValue = ResultData[1]
                            objEventArgs.IsExists = ResultData[2] == 'true' ? true : false;
                            OnAppSessionEventArgs(sender, objEventArgs);
                        }
                    // }});
            },
            error(err){
                OnAppSessionEventArgs(sender, null);
                console.log(`Something went wrong! Unable get app session for ${key}`);
            },
          })
    }

    public static IsExists(key: string, OnAppSessionEventArgs: Function) {
        // if (key != '' && key != undefined) {
        //     if (AppSession._instance.ContainsKey(key)) {
        //         return this[key];
        //     }
        // }
        let requestBody = "FunctionName=IsExistsAppSession&Key="+ key;
        let flowID = 'IsExistsAppSession';
        let aggregateService: AggregateService = InjectorInstance.get< AggregateService >(AggregateService);
        let OnResult:Function = this.OnResult;
        let sender = {Request:key};
        aggregateService.postAggregateData(flowID,requestBody).subscribe({
            next(data){
                // UtilityService.xmlToJson(data).subscribe({
                //     next: (jsonData: any) => {
                        let Result = data;
                        if(OnResult && OnResult instanceof Function){
                            OnResult(null,Result);
                        }
                        
                        if (Result.IndexOf('&') != -1) {
                            let ResultData: string[] = Result.replace("&&","&").Split('&');
                            if (ResultData.length != 3)
                                return;
                            let objEventArgs: AppSessionEventArgs = new AppSessionEventArgs();
                            objEventArgs.KeyName = ResultData[0];
                            objEventArgs.KeyValue = ResultData[1]
                            objEventArgs.IsExists = ResultData[2] == 'true' ? true : false;
                            OnAppSessionEventArgs(sender, objEventArgs);
                        }
                    // }});
            },
            error(err){
                OnAppSessionEventArgs(sender, null);
                console.log(`Something went wrong! Unable check isexists app session for ${key}`);
            },
          })
    }

    public static Remove(key: string){
        let requestBody = "FunctionName=RemoveAppSession&Key="+ key;
        let flowID = 'RemoveAppSession';
        let aggregateService: AggregateService = InjectorInstance.get< AggregateService >(AggregateService);
        aggregateService.postAggregateData(flowID,requestBody).subscribe({
            next(data){
            },
            error(err){
                console.log(`Something went wrong! Unable delete app session for ${key}`);
            },
          })
    }

    // public ContainsKey(key: string) {
    //     if (typeof this[key] === 'undefined') {
    //         return false;
    //     }

    //     return true;
    // }
}

export class OnAppSessionResulthandler {
    object: any;
    Result: AppSessionEventArgs;
}

export class AppSessionEventArgs {
    KeyName: string;
    KeyValue: string;
    IsExists: boolean;
}