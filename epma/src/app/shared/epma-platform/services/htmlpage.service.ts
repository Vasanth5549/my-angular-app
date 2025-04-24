import { ScriptObject } from "./scriptobject.service";

export const HtmlPage = {
    Window: {
        Invoke: (methodName: string, arg1?,arg2?,arg3?,arg4?,arg5?,arg6?,arg7?,arg8?,arg9?,arg10?,arg11?,arg12?,arg13?,arg14?,arg15?):any => {
            if(methodName){
                switch(methodName){
                    case 'SessionConsolidatePrint':{
                        let data = SessionConsolidatePrint(arg1,arg2,arg3,arg4,arg5,arg6,arg7,arg8,arg9,arg10,arg11,arg12,arg13,arg14,arg15);
                        let returnScriptObject:ScriptObject = new ScriptObject();
                        if(Object.keys(data).length > 0)
                        returnScriptObject.returnData = data;
                        else
                            returnScriptObject = null;
                        return returnScriptObject;
                    }
                    case 'AjaxPrint':{
                        let data = AjaxPrint(arg1,arg2,arg3,arg4,arg5,arg6,arg7,arg8,arg9,arg10,arg11,arg12,arg13,arg14,arg15);
                        let returnScriptObject:ScriptObject = new ScriptObject();
                        returnScriptObject.returnData = data;
                        return returnScriptObject;
                    }
                 
                    case 'ConsolidatedPrint':{
                        let data = ConsolidatedPrint(arg1,arg2,arg3,arg4,arg5,arg6,arg7,arg8,arg9,arg10,arg11,arg12,arg13,arg14,arg15);
                        let returnScriptObject:ScriptObject = new ScriptObject();
                        returnScriptObject.returnData = data;
                        return returnScriptObject;
                    }
                    case 'AjaxClinicallyPrint':{
                        let data = AjaxClinicallyPrint(arg1,arg2,arg3,arg4,arg5,arg6,arg7,arg8,arg9,arg10,arg11,arg12,arg13,arg14,arg15);
                        let returnScriptObject:ScriptObject = new ScriptObject();
                        returnScriptObject.returnData = data;
                        return returnScriptObject;
                    }
                    case 'AjaxTechValidatePrint':{
                        let data = AjaxTechValidatePrint(arg1,arg2,arg3,arg4,arg5,arg6,arg7,arg8,arg9,arg10,arg11,arg12,arg13,arg14,arg15);
                        let returnScriptObject:ScriptObject = new ScriptObject();
                        returnScriptObject.returnData = data;
                        return returnScriptObject;
                    }
                    case 'AjaxCNSPrint':{
                        let data = AjaxCNSPrint(arg1,arg2,arg3,arg4,arg5,arg6,arg7,arg8,arg9,arg10,arg11,arg12,arg13,arg14,arg15);
                        let returnScriptObject:ScriptObject = new ScriptObject();
                        returnScriptObject.returnData = data;
                        return returnScriptObject;
                    }
                    case 'GetAgeGenderForConflicts':{
                        let data = GetAgeGenderForConflicts(arg1,arg2,arg3,arg4,arg5,arg6,arg7,arg8,arg9,arg10,arg11,arg12,arg13,arg14,arg15);
                        let returnScriptObject:ScriptObject = new ScriptObject();
                        if(Object.keys(data).length > 0)
                            returnScriptObject.returnData = data;
                        else
                            returnScriptObject = null;
                        return returnScriptObject;
                    }
                    case 'GetSubsetIDsORDataItemOID':{
                        let data = GetSubsetIDsORDataItemOID(arg1,arg2,arg3,arg4,arg5,arg6,arg7,arg8,arg9,arg10,arg11,arg12,arg13,arg14,arg15);
                        let returnScriptObject:ScriptObject = new ScriptObject();
                        if(Object.keys(data).length > 0)
                        returnScriptObject.returnData = data;
                        else
                            returnScriptObject = null;
                        return returnScriptObject;
                    }
                    case 'SFSCareProvider':{
                        let data = OpenSFS("CP", "S", "", "");
                        let returnScriptObject:ScriptObject = new ScriptObject();
                        returnScriptObject.returnData = data;
                        return returnScriptObject;
                    }
                    
                    case 'GetDataItemRecordedDate':{
                        let data = GetDataItemRecordedDate(arg1,arg2,arg3,arg4,arg5,arg6,arg7,arg8,arg9,arg10,arg11,arg12,arg13,arg14,arg15);                                                
                        return data;
                    }
                    case 'LaunchClinicalIncidentForm':{
                        let data = LaunchClinicalIncidentForm(arg1,arg2,arg3,arg4,arg5,arg6,arg7,arg8,arg9,arg10,arg11,arg12,arg13,arg14,arg15);                        
                        let returnScriptObject:ScriptObject = new ScriptObject();
                        returnScriptObject.returnData = data;
                        return returnScriptObject;
                    }
                    case 'LaunchCriticalURLLink':{
                        let data = LaunchCriticalURLLink(arg1,arg2,arg3,arg4,arg5,arg6,arg7,arg8,arg9,arg10,arg11,arg12,arg13,arg14,arg15);                        
                        let returnScriptObject:ScriptObject = new ScriptObject();
                        returnScriptObject.returnData = data;
                        return returnScriptObject;
                    }
                    case 'LaunchAllergyCheckedforChart':{
                        let data = LaunchAllergyCheckedforChart(arg1,arg2,arg3,arg4,arg5,arg6,arg7,arg8,arg9,arg10,arg11,arg12,arg13,arg14,arg15);                        
                        let returnScriptObject:ScriptObject = new ScriptObject();
                        returnScriptObject.returnData = data;
                        return returnScriptObject;
                    }
                    case 'GetDoseCalcDateTime':{
                        let data = GetDoseCalcDateTime(arg1,arg2,arg3,arg4,arg5,arg6,arg7,arg8,arg9,arg10,arg11,arg12,arg13,arg14,arg15);                                               
                        return data;
                    }
                    case 'GetDataItemRecordedDateAdmin':{
                        let data = GetDataItemRecordedDateAdmin(arg1,arg2,arg3,arg4,arg5,arg6,arg7,arg8,arg9,arg10,arg11,arg12,arg13,arg14,arg15);    
                        let returnScriptObject:ScriptObject = new ScriptObject();
                        returnScriptObject.returnData = data;                                               
                        return data;
                    }
                    case 'CheckPermission':{
                        let data = CheckPermission(arg1,arg2,arg3,arg4,arg5,arg6,arg7,arg8,arg9,arg10,arg11,arg12,arg13,arg14,arg15);    
                        let returnScriptObject:ScriptObject = new ScriptObject();
                        returnScriptObject.returnData = data;                                               
                        return data;
                    }
                    case 'GetResolveTermText':{
                        let data = GetResolveTermText(arg1,arg2,arg3,arg4,arg5,arg6,arg7,arg8,arg9,arg10,arg11,arg12,arg13,arg14,arg15);    
                        let returnScriptObject:ScriptObject = new ScriptObject();
                        returnScriptObject.returnData = data;                                               
                        return data;
                    }
                    case 'OpenFBChartView':{
                        let data = OpenFBChartView(arg1,arg2,arg3,arg4,arg5,arg6,arg7,arg8,arg9,arg10,arg11,arg12,arg13,arg14,arg15);    
                        let returnScriptObject:ScriptObject = new ScriptObject();
                        returnScriptObject.returnData = data;                                               
                        return data;
                    }
                    case 'CreatePessimisticLock':{
                        let data = CreatePessimisticLock(arg1,arg2,arg3,arg4,arg5,arg6,arg7,arg8,arg9,arg10,arg11,arg12,arg13,arg14,arg15);    
                        let returnScriptObject:ScriptObject = new ScriptObject();
                        returnScriptObject.returnData = data;                                               
                        return data;
                    }  
                    case 'DeactivatePessimisticLock':{
                        let data = DeactivatePessimisticLock(arg1,arg2,arg3,arg4,arg5,arg6,arg7,arg8,arg9,arg10,arg11,arg12,arg13,arg14,arg15);    
                        let returnScriptObject:ScriptObject = new ScriptObject();
                        returnScriptObject.returnData = data;                                               
                        return data;
                    }  
                    case 'GetMedclerkPromptValue':{
                        let data = GetMedclerkPromptValue(arg1,arg2,arg3,arg4,arg5,arg6,arg7,arg8,arg9,arg10,arg11,arg12,arg13,arg14,arg15);    
                        let returnScriptObject:ScriptObject = new ScriptObject();
                        returnScriptObject.returnData = data;                                               
                        return data;
                    }  
                    case 'LaunchClerkPrmptFromChart':{
                        let data = CreatePessimisticLock(arg1,arg2,arg3,arg4,arg5,arg6,arg7,arg8,arg9,arg10,arg11,arg12,arg13,arg14,arg15);    
                        let returnScriptObject:ScriptObject = new ScriptObject();
                        returnScriptObject.returnData = data;                                               
                        return data;
                    }  
                    
                    case 'IsOpenSecExist':{
                        let data = IsOpenSecExist(arg1,arg2,arg3,arg4,arg5,arg6,arg7,arg8,arg9,arg10,arg11,arg12,arg13,arg14,arg15);    
                        let returnScriptObject: ScriptObject = new ScriptObject();
                        if (Object.keys(data).length > 0)
                            returnScriptObject.returnData = data;
                        else
                            returnScriptObject = null;
                        return returnScriptObject;
                    }     
                                   
                    case 'IsLockStillValid':{
                        let data = IsLockStillValid(arg1,arg2,arg3,arg4,arg5,arg6,arg7,arg8,arg9,arg10,arg11,arg12,arg13,arg14,arg15);    
                        let returnScriptObject:ScriptObject = new ScriptObject();
                        returnScriptObject.returnData = data;                                               
                        return returnScriptObject;
                    }
                  case 'LaunchLink': {
                    let data = LaunchLink(arg1, arg2, arg3, arg4, arg5);
                    let returnScriptObject: ScriptObject = new ScriptObject();
                    returnScriptObject.returnData = data;
                    return returnScriptObject;
                  }
                    case 'LoadObservationForm':{
                        let data = LoadObservationForm(arg1,arg2,arg3,arg4,arg5,arg6,arg7,arg8);
                        let returnScriptObject:ScriptObject = new ScriptObject();
                        returnScriptObject.returnData = data;
                        return returnScriptObject;
                    }
                    case 'OpenFBChartView':{
                        let data = OpenFBChartView(arg1,arg2,arg3,arg4,arg5,arg6,arg7,arg8,arg9,arg10,arg11,arg12,arg13,arg14,arg15);    
                        let returnScriptObject:ScriptObject = new ScriptObject();
                        returnScriptObject.returnData = data;                                               
                        return data;
                    }
                    case 'LaunchAllergyCheckedforChartMedication':{
                        let data = LaunchAllergyCheckedforChartMedication(arg1,arg2,arg3,arg4,arg5,arg6,arg7,arg8,arg9,arg10,arg11,arg12,arg13,arg14,arg15);    
                        let returnScriptObject:ScriptObject = new ScriptObject();
                        returnScriptObject.returnData = data;                                               
                        return returnScriptObject;
                    }
                    case 'GetLockedUsersDetails':{
                        let data = GetLockedUsersDetails(arg1,arg2,arg3,arg4,arg5,arg6,arg7,arg8,arg9,arg10,arg11,arg12,arg13,arg14,arg15);    
                        let returnScriptObject:ScriptObject = new ScriptObject();
                        returnScriptObject.returnData = data;                                               
                        return returnScriptObject;
                    }
                    case 'LaunchMedClerkSource':{
                        let data = LaunchMedClerkSource(arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11, arg12, arg13, arg14, arg15);
                        let returnScriptObject: ScriptObject = new ScriptObject();
                        returnScriptObject.returnData = data;
                        return returnScriptObject;
                    }
                    case 'GetSealDrugsData':{
                        let data = GetSealDrugsData(arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11, arg12, arg13, arg14, arg15);
                        let returnScriptObject:ScriptObject = new ScriptObject();
                        returnScriptObject.returnData = data;                                               
                        return returnScriptObject;
                    }
                    case 'GetSnomedTerm':{
                        let data = GetSnomedTerm(arg1,arg2,arg3,arg4,arg5,arg6,arg7,arg8,arg9,arg10,arg11,arg12,arg13,arg14,arg15);
                        let returnScriptObject:ScriptObject = new ScriptObject();
                        returnScriptObject.returnData = data;
                        return returnScriptObject;
                    }
                    case 'SetAppsession':{
                        let data = SetAppsession(arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11, arg12, arg13, arg14, arg15);
                        let returnScriptObject: ScriptObject = new ScriptObject();
                        returnScriptObject.returnData = data;
                        return returnScriptObject;
                    }
                    case 'GetHTWTUpdateCompareValue':{
                        let data = GetHTWTUpdateCompareValue(arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11, arg12, arg13, arg14, arg15);
                        let returnScriptObject: ScriptObject = new ScriptObject();
                        returnScriptObject.returnData = data;
                        return returnScriptObject;
                    }
                    case 'isIEAboveSeven': {
                        let data = isIEAboveSeven(arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11, arg12, arg13, arg14, arg15);
                        return data;
                    }
                    case 'LaunchGPCSummaryView':{
                        let data = LaunchGPCSummaryView(arg1,arg2,arg3,arg4,arg5,arg6,arg7,arg8,arg9,arg10,arg11,arg12,arg13,arg14,arg15);
                        let returnScriptObject:ScriptObject = new ScriptObject();
                        if(Object.keys(data).length > 0)
                        returnScriptObject.returnData = data;
                        else
                            returnScriptObject = null;
                        return returnScriptObject;
                    }
                    case 'LaunchOtherLinks': {
                       let data = LaunchOtherLinks(arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11, arg12, arg13, arg14, arg15);
                       let returnScriptObject: ScriptObject = new ScriptObject();
                        if (Object.keys(data).length > 0)
                        returnScriptObject.returnData = data;
                        else
                          returnScriptObject = null;
                       return returnScriptObject;
                     }
                    case 'ChkPatientTransferActivity': {
                        let data = ChkPatientTransferActivity(arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11, arg12, arg13, arg14, arg15);
                        return data;
                    }
                    case 'GetMedScanBatchExpiryDetails':{
                        let data = GetMedScanBatchExpiryDetails(arg1,arg2,arg3,arg4,arg5,arg6,arg7,arg8,arg9,arg10,arg11,arg12,arg13,arg14,arg15);    
                        let returnScriptObject:ScriptObject = new ScriptObject();
                        returnScriptObject.returnData = data;                                               
                        return data;
                    }
                    case 'CallSnomedService':{
                        let data = CallSnomedService(arg1,arg2,arg3,arg4,arg5,arg6,arg7,arg8,arg9,arg10,arg11,arg12,arg13,arg14,arg15);                                                   
                        return data;
                    }
                    case 'CodingSchemeVersion':{
                        let data = CodingSchemeVersion(arg1,arg2,arg3,arg4,arg5,arg6,arg7,arg8,arg9,arg10,arg11,arg12,arg13,arg14,arg15);                                                  
                        return data;
                    }
                    default:{
                        DefaultFunction();
                        let returnScriptObject:ScriptObject = new ScriptObject();
                        return returnScriptObject
                    }
                }
            }else{
                return null;
            }
        },
        InvokeAsync:async (methodName: string, arg1?,arg2?,arg3?,arg4?,arg5?,arg6?,arg7?,arg8?,arg9?,arg10?,arg11?,arg12?,arg13?,arg14?,arg15?):Promise<any> => {
            if(methodName){
                switch(methodName){
                    case 'SFSCareProvider':{
                        let data = await OpenSFS("CP", "S", "", "");
                        let returnScriptObject:ScriptObject = new ScriptObject();
                        returnScriptObject.returnData = data;
                        return returnScriptObject;
                    }
                    case 'AsyncTest':{
                        let data = await AsyncTest();
                        let returnScriptObject:ScriptObject = new ScriptObject();
                        returnScriptObject.returnData = data;
                        return returnScriptObject;
                    }
                    case 'ActivityConsiderationDC':{
                        let data = await ActivityConsiderationDC(arg1,arg2,arg3,arg4,arg5,arg6,arg7,arg8,arg9,arg10,arg11,arg12,arg13,arg14,arg15);                        
                        return data;
                    }
                  case 'ActivityConsideration':{
                    let data = await ActivityConsideration(arg1,arg2,arg3,arg4,arg5,arg6,arg7,arg8,arg9,arg10,arg11,arg12,arg13,arg14,arg15);                        
                    return data;
                    }
                    case 'AjaxDischargeSummary':{
                        let data = await AjaxDischargeSummary(arg1,arg2,arg3,arg4,arg5,arg6,arg7,arg8,arg9,arg10,arg11,arg12,arg13,arg14,arg15);                        
                        return data;
                    }
                    case 'LaunchLink': {
                        let data = await LaunchLink();
                        let returnScriptObject: ScriptObject = new ScriptObject();
                        returnScriptObject.returnData = data;
                        return returnScriptObject;
                    }
                    case 'OpenFBChartView': {
                        let data = await OpenFBChartView(arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11, arg12, arg13, arg14, arg15);
                        let returnScriptObject: ScriptObject = new ScriptObject();
                        returnScriptObject.returnData = data;
                        return data;
                    }
                    case 'LoadObservationForm':{
                        let data = await LoadObservationForm(arg1,arg2,arg3,arg4,arg5,arg6,arg7,arg8);
                        let returnScriptObject:ScriptObject = new ScriptObject();
                        returnScriptObject.returnData = data;
                        return returnScriptObject;
                    }
                    case 'LoadResultDetail': {
                        let data = await LoadResultDetail(arg1,arg2,arg3,arg4,arg5);
                        let returnScriptObject:ScriptObject = new ScriptObject();
                        returnScriptObject.returnData = data;
                        return returnScriptObject;
                    }
                    case 'LaunchAllergyCheckedforChartMedication':{
                        let data = await LaunchAllergyCheckedforChartMedication(arg1,arg2,arg3,arg4,arg5,arg6,arg7,arg8,arg9,arg10,arg11,arg12,arg13,arg14,arg15);    
                        let returnScriptObject:ScriptObject = new ScriptObject();
                        returnScriptObject.returnData = data;                                               
                        return returnScriptObject;
                    }
                    case 'LaunchClerkPrmptFromChartMedication':{
                        let data = await LaunchClerkPrmptFromChartMedication(arg1,arg2,arg3,arg4,arg5,arg6,arg7,arg8,arg9,arg10,arg11,arg12,arg13,arg14,arg15);                                                  
                        return data;
                    }
                    case 'LaunchMedClerkSourceChartMedication':{
                        let data =await LaunchMedClerkSourceChartMedication(arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11, arg12, arg13, arg14, arg15);
                        return data;
                    }
                    case 'PrintPrescription':{
                        let data = await PrintPrescription(arg1,arg2,arg3,arg4,arg5,arg6,arg7,arg8,arg9,arg10,arg11);    
                        return data;
                    }
                    case 'SetPrimaryPatientContext':{
                        let data = await SetPrimaryPatientContext(arg1);    
                        return data;
                    }
                    case 'GetSnomedTerm':{
                        let data = await GetSnomedTerm(arg1,arg2,arg3,arg4,arg5);
                        let returnScriptObject:ScriptObject = new ScriptObject();
                        returnScriptObject.returnData = data;
                        return returnScriptObject;
                    }

                    case 'LaunchDIConsentPromptFromInGPCTAB':{
                        let data = await LaunchDIConsentPromptFromInGPCTAB(arg1,arg2,arg3,arg4,arg5,arg6,arg7,arg8,arg9,arg10,arg11,arg12,arg13,arg14,arg15);
                    let returnScriptObject:ScriptObject = new ScriptObject();
                    if(Object.keys(data).length > 0)
                    returnScriptObject.returnData = data;
                    else
                        returnScriptObject = null;
                    return returnScriptObject;
                }

		     case 'Powersearchsfs':{
                        let data = await Powersearchsfs(arg1,arg2,arg3,arg4,arg5,arg6,arg7,arg8,arg9,arg10,arg11,arg12,arg13,arg14,arg15);
                        let returnScriptObject: ScriptObject = new ScriptObject();
                        returnScriptObject.returnData = data;
                        return returnScriptObject;
                    }
                    default:{
                        DefaultFunction();
                        let returnScriptObject:ScriptObject = new ScriptObject();
                        return returnScriptObject;
                    }
                }
            }
        }
    }
};
function DefaultFunction(){
     console.log('HtmlPage.window.invoke Error: The method is not defined in HtmlPage inside project')
}
async function AsyncTest(){
    return await {};
}



