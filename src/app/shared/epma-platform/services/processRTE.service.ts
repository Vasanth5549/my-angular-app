import { Injectable } from '@angular/core';
import { CListItem,  List,  RTEEventargs, termModel } from 'epma-platform/models';
import { Dictionary } from 'epma-platform/dictionary';
import { StringBuilder, UtilityService } from 'epma-platform/services';
import { Observable } from 'rxjs';
import { SLCacheManager } from './SLCacheManager.service';

@Injectable({
  providedIn: 'root'
})
export class ProcessRTE {

  private static cListItem : CListItem = {Value : "",DisplayText : "",IsDefault:false,IsSelected:false};
  private static OnRTEResult : RTEEventargs = {Request : "",Result : []};

  constructor() { }

  public static GetValuesByDomainCode(DomainCode:string,OnRTEResult:Function){
      let requestBody = "FunctionName=GetValuesByDomain&DomainCodes=" + DomainCode;
      let objListConceptCodes : CListItem[] = [];
      let flowID = 'GetValuesByDomainCode';
      

      if (DomainCode != null && OnRTEResult != null)
      {
        UtilityService.primaryPostData(flowID,requestBody,requestBody).subscribe({
          next(data) {
              UtilityService.xmlToJson(data).subscribe({
                next (jsonConvertData:any){
                  let Result:List<CListItem> = ProcessRTE.getOnRTEResult(jsonConvertData,objListConceptCodes,'domainCode');//Lidt<CListItem>
                  ProcessRTE.OnRTEResult = { Request : DomainCode, Result };
                  OnRTEResult(ProcessRTE.OnRTEResult);
                },error (msg){
                  OnRTEResult({ Request : DomainCode, Result : null });
                }
              })
          },
          error(msg) {
            OnRTEResult({ Request : DomainCode, Result : null });
          }
        });
    }else
    OnRTEResult({ Request : DomainCode, Result : null });
  }

  public static getOnRTEResult(jsonConvertData,objListConceptCodes,domainCode){
    let objResult = jsonConvertData.ARRAYOFCVALUESETCOLLECTION;
    let oValueSet = objResult?.CVALUESETCOLLECTION;
    if(oValueSet){
      if(domainCode == 'domainCode'){
        let objResult = oValueSet.ARRVALUESETTERM;
        objResult.CVALUESETTERM.forEach((obj:any)  => {
          let IsDefaultCode = obj.CSCODE == oValueSet.SDEFAULTCODE ? true : false;
        ProcessRTE.cListItem = new CListItem();
        ProcessRTE.cListItem.Value = obj.CSCODE;
        ProcessRTE.cListItem.DisplayText = obj.CSDESCRIPTION;
        ProcessRTE.cListItem.IsDefault = IsDefaultCode;
        ProcessRTE.cListItem.IsSelected = false;
          objListConceptCodes.push(ProcessRTE.cListItem);
        })
        objListConceptCodes = new List(objListConceptCodes);
      }else{
        if(oValueSet && !Array.isArray(oValueSet) && typeof oValueSet == "object"){
          //for single domaincode the xml to json convertor converts to object instead of array fix
          oValueSet = [oValueSet];
        }
        oValueSet.forEach((objValueSetCollection:any)  => {
          let objValue : CListItem[] = [];
          let cValuesetTerm = objValueSetCollection.ARRVALUESETTERM.CVALUESETTERM;
          if(cValuesetTerm && !Array.isArray(cValuesetTerm) && typeof cValuesetTerm == "object"){
            //for single domaincode the xml to json convertor converts to object instead of array fix
            cValuesetTerm = [cValuesetTerm];
          }
          cValuesetTerm.forEach((obj:any)  => {
            let IsDefaultCode = obj.CSCODE == objValueSetCollection.SDEFAULTCODE ? true : false;     
         ProcessRTE.cListItem = new CListItem();
         ProcessRTE.cListItem.Value = obj.CSCODE;
         ProcessRTE.cListItem.DisplayText = obj.CSDESCRIPTION;
         ProcessRTE.cListItem.IsDefault = IsDefaultCode;
         ProcessRTE.cListItem.IsSelected = false;
            objValue.push(ProcessRTE.cListItem);
          })
          let list = new List(objValue);
          objListConceptCodes.Add(objValueSetCollection.CSDOMAINSINFO,list);
        });
      }
    }
    return objListConceptCodes;
  }

  //public static GetValuesByDomainCodes(DomainCodes:string):Dictionary<string,CListItem>;
  //public static GetValuesByDomainCodes(DomainCodes:string,OnRTEResult?:Function):null;
  public static GetValuesByDomainCodes(DomainCodes:string,OnRTEResult?:Function):Dictionary<string,CListItem> | null|any{
    let requestBody = "FunctionName=GetValuesByDomain&DomainCodes=" + DomainCodes;
    let flowID = 'GetValuesByDomainCodes';
    let objListConceptCodes  : Dictionary<string,List<CListItem>>=new Dictionary<string,List<CListItem>>([]);
    ProcessRTE.OnRTEResult = {Request : "",Result : []};
    if (DomainCodes == null)
    {
        if (OnRTEResult != null && OnRTEResult != undefined)
        OnRTEResult({ Request: DomainCodes, Result : null });
        return;
    }

    if (DomainCodes != null && OnRTEResult != null)
    {
      UtilityService.primaryPostData(flowID,requestBody,DomainCodes).subscribe({
      next(data) {
        UtilityService.xmlToJson(data).subscribe( {
          next(jsonConvertData : any) {
            objListConceptCodes = ProcessRTE.getOnRTEResult(jsonConvertData,objListConceptCodes,'domainCodes');
            ProcessRTE.OnRTEResult = { Request: DomainCodes, Result : objListConceptCodes};
                if(OnRTEResult != undefined){
                OnRTEResult(ProcessRTE.OnRTEResult)
                // observer.next(null);
                // observer.complete();
                } 
                else{
                  // observer.next(objListConceptCodes);
                  // observer.complete();
                }
          },error(msg) {
                if(OnRTEResult != undefined){
            OnRTEResult({ Request: DomainCodes, Result : null });
                  // observer.next(null);
                  // observer.complete();
          }
                  else{
                    // observer.next(objListConceptCodes);
                    // observer.complete();
                  }
              }
        })
      },
      error(msg) {
           // observer.next(objListConceptCodes);
        OnRTEResult({ Request: DomainCodes, Result : null });
      }     
    //    })
    })
   }else
   OnRTEResult({ Request: DomainCodes, Result : null });
  }

  public static GetHierarchicalValuesByDomains(sCodingSchemeName: string, sCodingSchemeVersion: string, sFilterType: string, sLanguageCode: string,
    sDomainCodes: string, OnRTEResult:Function) {
    if ((sDomainCodes === null) || (sDomainCodes === "")) {
      ProcessRTE.OnRTEResult = { Request: sDomainCodes, Result: new Dictionary<string,List<CListItem>>([ ]) };
      return;
    }
    let flowID = 'GetValuesByDomainCodes'
    let reqBody = "FunctionName=GetHierarchicalValuesByDomains&CodingSchemeName=" + sCodingSchemeName
      + "&CodingSchemeVersion=" + sCodingSchemeVersion + "&FilterType=" + sFilterType + "&LanguageCode=" + sLanguageCode
      + "&DomainCodes=" + sDomainCodes;


      let dicDomainConceptCodes: Dictionary < string, List < CListItem > >  = new Dictionary<string, List<CListItem>>();
      let  arrDomainCodes: string[] = sDomainCodes.Split(',');
      let sNewDomainCodes : string  = String.Empty;
      if(arrDomainCodes != null)
        {
            for (let  nDomainCount :number = 0; nDomainCount < arrDomainCodes.Length; nDomainCount++)
            {
                let sDomainCode : string = arrDomainCodes[nDomainCount];
                if (!String.IsNullOrEmpty(sDomainCode)) {
                    if (!SLCacheManager.RTEIsExists(sDomainCode + "_Hierarchical")) {
                        sNewDomainCodes += sDomainCode + ",";
                    }
                    else {
                        if (!dicDomainConceptCodes.ContainsKey(sDomainCode))
                            dicDomainConceptCodes.Add(sDomainCode, SLCacheManager.RTEGet(sDomainCode + "_Hierarchical"));
                        else
                            dicDomainConceptCodes[sDomainCode] = SLCacheManager.RTEGet(sDomainCode + "_Hierarchical");
                    }
                }
            }
        }
        if(dicDomainConceptCodes.Count() > 0 && String.IsNullOrEmpty(sNewDomainCodes))
          {
            ProcessRTE.OnRTEResult = { Request: sDomainCodes, Result: dicDomainConceptCodes };
            OnRTEResult(ProcessRTE.OnRTEResult);
          }
         else
          {
            let reqBody = "FunctionName=GetHierarchicalValuesByDomains&CodingSchemeName=" + sCodingSchemeName
            + "&CodingSchemeVersion=" + sCodingSchemeVersion + "&FilterType=" + sFilterType + "&LanguageCode=" + sLanguageCode
            + "&DomainCodes=" + sNewDomainCodes;

              UtilityService.primaryPostData(flowID, reqBody,sNewDomainCodes).subscribe({
              next: (data) => {
                UtilityService.xmlToJson(data).subscribe({
                  next: (lstValuesetCollection) => {
                    //const dicDomainConceptCodes = ProcessRTE.getDicDomainConceptCodes(lstValuesetCollection);   
                    const dicDomainConceptCodesNew = ProcessRTE.getDicDomainConceptCodes(lstValuesetCollection);   

                   for (let KeyCode in dicDomainConceptCodesNew) {
                    if (!dicDomainConceptCodes.ContainsKey(KeyCode))
                      dicDomainConceptCodes.Add(KeyCode, dicDomainConceptCodesNew[KeyCode])
                      }
                    ProcessRTE.OnRTEResult = { Request: sDomainCodes, Result: dicDomainConceptCodes };
                  },
                  error: () => {
                    ProcessRTE.OnRTEResult = { Request: sDomainCodes, Result:new Dictionary<string,List<CListItem>>([ ]) };
                  }
                })
                 OnRTEResult(ProcessRTE.OnRTEResult);
              }, error: (err) => {
                console.log(err);

              }
            })
          } 
  }

  private static getDicDomainConceptCodes(lstValuesetCollection) {
    const dicDomainConceptCodes: Dictionary<string,List<CListItem>>=new Dictionary<string,List<CListItem>>([]);
    let CVALUESETCOLLECTION = lstValuesetCollection?.ARRAYOFCVALUESETCOLLECTION?.CVALUESETCOLLECTION;
    if(CVALUESETCOLLECTION && !Array.isArray(CVALUESETCOLLECTION) && typeof CVALUESETCOLLECTION == "object"){
      CVALUESETCOLLECTION = [CVALUESETCOLLECTION];
    } 

    CVALUESETCOLLECTION?.forEach((oValueSetCollection: any) => {
      let lstDomainConcepts: any = [];
      let CValuesetTerm = oValueSetCollection?.ARRVALUESETTERM?.CVALUESETTERM;
      if(CValuesetTerm && !Array.isArray(CValuesetTerm) && typeof CValuesetTerm == "object"){
        CValuesetTerm = [CValuesetTerm];
      } 
      CValuesetTerm?.forEach((oValuesetTerm: any) => {

        let IsDefaultCode = false;
        IsDefaultCode = oValuesetTerm && oValuesetTerm.CSCODE?.toLowerCase() == oValueSetCollection.SDEFAULTCODE?.toLowerCase();
        let arrValues: any = [];
        if (oValuesetTerm && oValuesetTerm.ARRPROPERTYDETAILS != null ) {
            let CPROPERTYDETAILS = oValuesetTerm.ARRPROPERTYDETAILS.CPROPERTYDETAILS;
            if(CPROPERTYDETAILS && !Array.isArray(CPROPERTYDETAILS) && typeof CPROPERTYDETAILS == "object"){
              CPROPERTYDETAILS = [CPROPERTYDETAILS];
            }
          let arValues = { Name: '', Value: '' };
          if(CPROPERTYDETAILS?.length > 0){
          for (let arrPropertyDetail of CPROPERTYDETAILS) {
            arValues.Name = arrPropertyDetail.CSNAME;
           arValues.Value = arrPropertyDetail.CSVALUE;
            arrValues.push(arValues);
          }

        }
      }
        lstDomainConcepts.push(
          {
            DisplayText: oValuesetTerm.CSDESCRIPTION,
            Value: oValuesetTerm.CSCODE,
            IsDefault: IsDefaultCode,
            ConceptProperties: arrValues
          });
      })
      SLCacheManager.RTEPut(oValueSetCollection.CSDOMAINSINFO + "_Hierarchical", this.ConvertlistOfCListToString(lstDomainConcepts, oValueSetCollection.CSDOMAINSINFO));
      dicDomainConceptCodes.Add(oValueSetCollection.CSDOMAINSINFO, new List(lstDomainConcepts));
       
    });

    return dicDomainConceptCodes;

  }

  public static GetAllReferenceCodesByDomain(domainCode: string, ValueSetName: string,  OnRTEResult:Function) {
    if ((domainCode === null) || (domainCode === "") || (ValueSetName === null) || (ValueSetName === "")) {
      ProcessRTE.OnRTEResult = { Request: domainCode + "," + ValueSetName, Result: new Dictionary<string,CListItem>([]) };

      return;
    }
    let reqBody = "FunctionName=GetAllReferenceCodesByDomain&DomainCode=" + domainCode + "&ValueSetName=" + ValueSetName;
    let flowID = 'GetValuesByDomainCodes';
    UtilityService.primaryPostData(flowID, reqBody,domainCode).subscribe({
      next: (data) => {
        UtilityService.xmlToJson(data).subscribe({
          next: (oValueSet) => {
            const objListConceptCodes = ProcessRTE.getObjListConceptCodes(oValueSet, domainCode)
            ProcessRTE.OnRTEResult = { Request: domainCode + "," + ValueSetName, Result: objListConceptCodes };
          },
          error: (err) => {
            ProcessRTE.OnRTEResult = { Request: domainCode + "," + ValueSetName, Result: new Dictionary<string,CListItem>([]) };

          }
        })
        OnRTEResult(ProcessRTE.OnRTEResult);
      },
      error: (err) => {
        console.log(err);
      }
    })


  }
  private static getObjListConceptCodes(jsonData, domainCode) {
    const oValueSet = jsonData?.CVALUEDOMAINDESCRIPTION;
    const objListConceptCodes: Dictionary<string,CListItem>=new Dictionary<string,CListItem>([]);
    if ((oValueSet)?.ARRREFERENCEVALUEINFO) {
      let nresultDomainValues = (oValueSet)?.ARRREFERENCEVALUEINFO?.CREFERENCEVALUEINFO?.length;
      let domainValues: any = [];
      for (let i = 0; i < nresultDomainValues; i++) {
        let objConceptCodeInfo = (oValueSet).ARRREFERENCEVALUEINFO.CREFERENCEVALUEINFO[i].OBJCONCEPTCODEINFO;
        domainValues.push({ DisplayText: objConceptCodeInfo.CSDISPLAYNAME, Value: objConceptCodeInfo.CSCODE });
      }
      objListConceptCodes.Add(  domainCode, domainValues );
    }
    return objListConceptCodes;
  }


  private static ConvertlistOfCListToString(objListConceptCodes:List < CListItem > ,sDefaultCode:string): string
{
   // var sbr: System.Text.StringBuilder = new System.Text.StringBuilder();
   let sbr: StringBuilder = new StringBuilder();
    for (var nVal: number = 0; nVal < objListConceptCodes.Length  ; nVal++) {
        sbr.Append(objListConceptCodes[nVal].DisplayText);
        sbr.Append("~$|$#");
        sbr.Append(objListConceptCodes[nVal].Value);
        if ((objListConceptCodes[nVal]).ConceptProperties != null && (objListConceptCodes[nVal]).ConceptProperties.Count() > 0) {
            sbr.Append("~$|$#");
            for (var i: number = 0; i < (objListConceptCodes[nVal]).ConceptProperties.Count(); i++) {
                if ((objListConceptCodes[nVal]).ConceptProperties[i] != null) {
                    sbr.Append((objListConceptCodes[nVal]).ConceptProperties[i].Name + "|#|" + (objListConceptCodes[nVal]).ConceptProperties[i].Value);
                    if (i != (objListConceptCodes[nVal]).ConceptProperties.Count - 1)
                        sbr.Append("|*|");
                }
            }
        }
        if (nVal != objListConceptCodes.Count - 1)
            sbr.Append("|$#$~");
    }
    sbr.Append("#$~$|").Append(sDefaultCode);
    return sbr.ToString();
}
}
