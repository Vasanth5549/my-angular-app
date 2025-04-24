import { Injectable } from '@angular/core';
import {ObservableCollection, CContextInformation,AppContextInfo, AppSessionInfo, ContextInfo, PatientContext,CValuesetTerm } from 'epma-platform/models';

export class CommonBB{
    
    public static IsConceptCodeExists(sConceptCode:string,objConceptCodes :  ObservableCollection<CValuesetTerm>, out :  (sResultDetails : string) => void) : boolean
        {
            let bResult : boolean = false;
            let sResultDetails = "";
            if (sConceptCode && sConceptCode != null && objConceptCodes != null)
            {
                let cValuesetTerm = objConceptCodes.ContainObj(sConceptCode) as CValuesetTerm;
                let Results = cValuesetTerm?.csDescription;
                if (Results != null && Results.length > 0)
                    sResultDetails = Results;
                out(sResultDetails);
                bResult = (sResultDetails == null && sResultDetails == "") ? false : true;
            }
            return bResult;
    }        

    public static GetText(sCCode:string,oTerm: ObservableCollection<CValuesetTerm>) : string{ 
        let sText : string = "";
        let tmpText : string = "";
        if (CommonBB.IsConceptCodeExists(sCCode, oTerm,(tmpTxt) => {
            tmpText = tmpTxt}) != false)
        sText = tmpText;
        else
        sText = sCCode;
        return sText;
    }
        
        
    public static FillContext() : CContextInformation{
        let obj = new CContextInformation();
        obj.ReleaseVersion = ContextInfo.ReleaseVersion;
        obj.UserID = ContextInfo.UserOID;
        obj.SecurityToken = ContextInfo.SecurityToken;
        obj.PatientID = PatientContext.PatientOID.toString();
        obj.OrganizationID = AppContextInfo.OrganisationOID;
        return obj;
    }
}