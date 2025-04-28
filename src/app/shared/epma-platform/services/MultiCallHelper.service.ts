import { UtilityService } from "epma-platform/services";
import { AMSException } from "../models/AMSException";
import { Constants } from "../models/model";
import { AMSHelper } from "./AMSHelper.service";
import { ObjectHelper } from "./objecthelper.service";
import { SLCacheManager } from "./SLCacheManager.service";

import { OnCheckAccessEventArgs } from "./SLSecurityAccess.service";

export class MultiCallHelper
{
    public ResourceType: string;
    public ResourceNames: string;
    public ArrResourceNames: string[];
    public OnCheckAccess: Function;

    constructor( sResourceType:string,  arrResourceNames:string[],  hSecurtiyAccess:Function)
    {
    if (!String.IsNullOrEmpty(this.ResourceType) && !String.IsNullOrEmpty(this.ResourceNames))
        this.PopulateHandlerData(String.Empty);
    else {
        let sResourceNames: string = String.Empty;
        arrResourceNames.forEach(sResource => {
            sResourceNames += sResource + '|';
        });
        sResourceNames = sResourceNames.Remove(sResourceNames.length - 1);
        this.ResourceType = sResourceType;
        this.ResourceNames = sResourceNames;
        this.ArrResourceNames = arrResourceNames;
        this.OnCheckAccess = hSecurtiyAccess;
        this.InvokeServiceCall();
    }

   }
   InvokeServiceCall()
    {
    try {
        let sCacheData:string = SLCacheManager.Get(this.ResourceNames);
        let PostData = "FunctionName=CheckResourcePermission&ResourceType=" + this.ResourceType + "&arrResourceName=" + this.ResourceNames;
        let flowID = 'CheckResourcePermission';
        let ResourceNames = this.ResourceNames;
        let OnResult = (Result:string) => {this.PopulateHandlerData(Result)};
        if (String.IsNullOrEmpty(sCacheData)) {
            if (PostData != null && this.OnCheckAccess != null)
            {
                UtilityService.primaryPostData(flowID,PostData,PostData).subscribe({
                next(Result:any) {
                    if(typeof Result == 'string'){  
                        SLCacheManager.Put(ResourceNames, Result);                      
                        OnResult(Result);
                    }else{
                        UtilityService.xmlToJson(Result).subscribe({
                            next (jsonConvertData:any){                     
                                OnResult(jsonConvertData);
                            },error (msg){
                              OnResult(msg);
                            }
                        })
                    }
                },
                error(msg) {
                    OnResult(msg);
                }
                });
            }            
        }
        else
            this.PopulateHandlerData(sCacheData);
    }
    catch ( ex:any) {
        let objAMSEx:AMSException = new AMSException();
        objAMSEx.ErrorID = Constants.ERROR_IN_SLMULTICALLHELPER;
        objAMSEx.Source = "SLMultiCallHelper InvokeServiceCall";
        objAMSEx.ErrorMessage = ex.Message;
        objAMSEx.StackTrace = ex.StackTrace;
        AMSHelper.PublishProblemInfo(objAMSEx);
    }
}
PopulateHandlerData(Result:string)
  {
    let objCheckAccess: OnCheckAccessEventArgs =  ObjectHelper.CreateObject(new OnCheckAccessEventArgs(),
     { ResourceNames: this.ArrResourceNames, AccResources: (!String.IsNullOrEmpty(Result)) ? (Result.Split('|')) : null }
    );
    if(this.OnCheckAccess != null)
    this.OnCheckAccess(null, objCheckAccess);
   }
}
