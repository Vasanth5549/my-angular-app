import { Injectable } from "@angular/core";
import { AMSException } from "../models/AMSException";
import { CListItem, RTEEventargs } from "epma-platform/models";
import { CACode } from "../soap-client/IPPMAManagePrescriptionWS";
import { UtilityService } from "epma-platform/services";

@Injectable({
    providedIn: 'root'
})
export class AMSHelper {



    public static PublishProblemInfo(objEvent: AMSException) {
        let requestBody = "FunctionName=LogError&ErrorID=" + objEvent.ErrorID + "&ErrorMsg=" + objEvent.ErrorMessage + "&StackTrace=" + objEvent.StackTrace + "&Source=" + objEvent.Source + "&CACode=" + CACode.Prescribe;
        let flowID = 'PublishProblemInfo';
        /*const encoder = new TextEncoder();
        let byteArray = encoder.encode(requestBody);
        console.log(byteArray); */

        if (objEvent != null) {
            UtilityService.primaryPostData(flowID, requestBody, requestBody).subscribe({
                next(data) {
                    console.log("next", data);
                    return 0;
                },
                error(msg) {
                    console.log("msg", msg);
                    return -1;
                }
            });
        } else {

        }

    }

}