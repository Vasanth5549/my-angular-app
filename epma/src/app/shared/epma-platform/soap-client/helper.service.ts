// export type object =  ObjectCResMsg

import { AggregateService } from "../services/aggregate.service";
import { InjectorInstance } from '../../../app.module';
import { DataConversionService } from "../services/data-conversion.service";
import { MediatorDataService } from "../services/mediator-data.service";
import { UtilityService } from "../services/utility.service";
import { ObservableCollection } from "../models/observable-collection";
import { CError } from "../models/eppma-common-types";
/**
* T1 - Request
* T2 - Response
* T3 - EventArgs
*/
export class HelperService {
  public static windowCloseFlag = "";
  public static Invoke<T1, T2, T3>(id: any, requestObject: T1, delegateArgs: Function, parameterName: string, eArgs: T3, resObjectPrototype: any,charPropertyLookup?,configuration?) {
    let aggregateService: AggregateService =
      InjectorInstance.get<AggregateService>(AggregateService);
    if (requestObject) {
      const contextData = aggregateService.fillContextData();
      let contextData2 = requestObject["oContextInformation"];
      requestObject["oContextInformation"] = {...contextData2,...contextData};
    }
    let req = {};
    req[parameterName] = DataConversionService.ConvertRequestData(requestObject);
    aggregateService.postWebServices(id, req, charPropertyLookup,configuration).subscribe({
      next(value) {
        if(value?.includes("xml")){
          if(delegateArgs == undefined){
            if(HelperService.windowCloseFlag == "Finish" || HelperService.windowCloseFlag == 'FinishNow'){
              let _mediatorDataService = InjectorInstance.get<MediatorDataService>(MediatorDataService);
              _mediatorDataService.prepublish({context:{event: HelperService.windowCloseFlag},contextCode:7,name:"close",source:"appWizard"});
              HelperService.windowCloseFlag = "";
            
            }
          }else{
            UtilityService.xmlToJson(value,{trim: true,explicitArray : false}).subscribe({
              next (jsonConvertData:any){
                let idname = id.split(".")[1];
                let jsonresponse = jsonConvertData["soap:Envelope"]["soap:Body"][idname+"Response"][idname+"Result"];
                let stringifyData = JSON.stringify(jsonresponse);
                let parsedData = JSON.parse(stringifyData) as T2;
                parsedData["__proto__"] = resObjectPrototype.constructor.name == 'Object'? resObjectPrototype[id] : resObjectPrototype;
                parsedData = DataConversionService.ConvertResponseData(parsedData, resObjectPrototype,charPropertyLookup);
                if(parsedData["oContextInformation"] && parsedData["oContextInformation"]["Errors"]){
                  // parsedData["oContextInformation"]["Errors"][0].ErrorID = -1;
                  // parsedData["oContextInformation"]["Errors"].arr[0].ErrorID = -1
                  //console.log(JSON.stringify(req));
                  let jsondata = DataConversionService.revertConvertedData(req);
                }
                eArgs['Result'] = parsedData;
                //  delegateArgs.instance[delegateArgs.delegate](null, eArgs);
                delegateArgs(null, eArgs);
              },error(e){
                console.log(e);
              }
            });
          }
        }else{
        let response = JSON.parse(value);
        let data = response.d as T2;
        if (data && data['__type']) {
          delete data['__type'];
        }
        let stringifyData = JSON.stringify(data);
        let parsedData = JSON.parse(stringifyData) as T2;
        parsedData["__proto__"] = resObjectPrototype.constructor.name == 'Object'? resObjectPrototype[id] : resObjectPrototype;
        parsedData = DataConversionService.ConvertResponseData(parsedData, resObjectPrototype,charPropertyLookup);
        eArgs['Result'] = parsedData;
        //  delegateArgs.instance[delegateArgs.delegate](null, eArgs);
        delegateArgs(null, eArgs);
      }
       
      }, error(msg) {
        if(msg?.error?.includes("xml")){
          UtilityService.xmlToJson(msg.error,{trim: true,explicitArray : false}).subscribe({
            next (jsonConvertData:any){
              let parsedData = jsonConvertData['soap:Envelope']['soap:Body']['soap:Fault'];
              eArgs['Error'] = parsedData['faultstring'];
              //  delegateArgs.instance[delegateArgs.delegate](null, eArgs);
              delegateArgs(null, eArgs);
              HelperService.UnknownError();
            },error(e){
              console.log(e);
              HelperService.UnknownError();
            }
          });
      
        }else{
          if(HelperService.windowCloseFlag == "Finish" || HelperService.windowCloseFlag == 'FinishNow'){
            let _mediatorDataService = InjectorInstance.get<MediatorDataService>(MediatorDataService);
            _mediatorDataService.prepublish({context:{event: "UnKnown Error"},contextCode:7,name:"close",source:"appWizard"});
            HelperService.windowCloseFlag = "";
          }
        }
      }
    });
  }
  public static UnknownError(){
    if(HelperService.windowCloseFlag == "Finish" || HelperService.windowCloseFlag == 'FinishNow'){
      let _mediatorDataService = InjectorInstance.get<MediatorDataService>(MediatorDataService);
      _mediatorDataService.prepublish({context:{event: "UnKnown Error"},contextCode:7,name:"close",source:"appWizard"});
      HelperService.windowCloseFlag = "";
    }
  }
}