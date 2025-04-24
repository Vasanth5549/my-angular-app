import { AMSException } from "../models/AMSException";
import { Exception } from "../models/Exception";
import { Constants } from "../models/model";
import { AMSHelper } from "./AMSHelper.service";
import { MultiCallHelper } from "./MultiCallHelper.service";

export class OnCheckAccessEventArgs {
    public ResourceNames: string[];
    public AccResources: string[];
}
export class SLSecurityAccess {
    // public delegate OnCheckAccesshandler(sender:object, Result:OnCheckAccessEventArgs):void;
    public static CheckAccess(ResourceType: string, ResourceNames: string[], CheckAccess: Function): void
    {
        try
        {
            let oMultiCallHelper: MultiCallHelper = new MultiCallHelper(ResourceType, ResourceNames, CheckAccess);
        }
        catch(ex:any) {
            let objAMSEx: AMSException = new AMSException();
            objAMSEx.ErrorID = Constants.ERROR_IN_SLSECURITYACCESS;
            objAMSEx.Source = "SLSecurityAccess CheckAccess";
            objAMSEx.ErrorMessage = ex.Message;
            objAMSEx.StackTrace = ex.StackTrace;
            AMSHelper.PublishProblemInfo(objAMSEx);
        }

    } 
}