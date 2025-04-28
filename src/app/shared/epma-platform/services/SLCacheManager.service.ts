import { CListItem, List } from "epma-platform/models";
import { Dictionary } from "../index.dictionary";
import { ConceptProperty } from "../models/ConceptProperty";

export class SLCacheManager{
    public static SLCache: any = new Dictionary<string, string>();
    public static SLRTEData: Dictionary<string, string> = new Dictionary<string, string>();
    static Get(sItemKey:string) : string
    {
        if (!String.IsNullOrEmpty(sItemKey) && this.SLCache.Count > 0  && this.SLCache.ContainsKey(sItemKey))
                return this.SLCache[sItemKey];
            else
                return String.Empty;
    }
    static Put(sItemKey:string, sItemValue:string):void
    {
         try{
         if (!String.IsNullOrEmpty(sItemKey) && !this.SLCache.ContainsKey(sItemKey))
         {
           this.SLCache.Add(sItemKey, sItemValue);
         }
         else
         {
            this.SLCache[sItemKey] = sItemValue;
         }
         }
         catch (e:any)
         {         }
    }

    public static ConvertRTETextToObject(strDomainCodeValues: string): List<CListItem> {
        var lstDomainConceptCodes: List<CListItem> = new List<CListItem>();
        var aryDomainValuesDetails: string[] = strDomainCodeValues.Split("#$~$|");
        var aryDomainValues: string[] = aryDomainValuesDetails[0].Split("|$#$~");
        var strDefaultCodeValue: string = aryDomainValuesDetails[1];
        for (var _CCIndex: number = 0; _CCIndex < aryDomainValues.length; _CCIndex++) {
            var strDomainValue: string = aryDomainValues[_CCIndex];
            if (!String.IsNullOrEmpty(strDomainValue)) {
                var aryDomainValue: string[] = strDomainValue.Split("~$|$#");
                if (aryDomainValue != null && aryDomainValue.length == 2) {
                    var IsDefaultCode: boolean = false;
                    IsDefaultCode = (String.Compare(aryDomainValue[1], strDefaultCodeValue) == 0);
                    var objConceptCode: CListItem = new CListItem();
                    objConceptCode.DisplayText = aryDomainValue[0];
                    objConceptCode.Value = aryDomainValue[1];
                    objConceptCode.IsDefault = IsDefaultCode;
                    lstDomainConceptCodes.Add(objConceptCode);
                }
                if (aryDomainValue != null && aryDomainValue.length == 3) {
                    var propDetails: List<ConceptProperty> = new List<ConceptProperty>();
                    if (aryDomainValue[2] != null) {
                        var arrpropertyDetails: string[] = aryDomainValue[2].Split("|*|");
                        if (arrpropertyDetails != null && arrpropertyDetails.length > 0) {
                            for (var index: number = 0; index < arrpropertyDetails.length; index++) {
                                var Properties: string[] = arrpropertyDetails[index].Split("|#|");
                                if (Properties != null && Properties.length == 2) {
                                    var details: ConceptProperty = new ConceptProperty();
                                    details.Name = Properties[0];
                                    details.Value = Properties[1];
                                    propDetails.Add(details);
                                }
                            }
                        }
                    }
                    var IsDefaultCode: boolean = false;
                    IsDefaultCode = (String.Compare(aryDomainValue[1], strDefaultCodeValue) == 0);
                    var objConceptCode: CListItem = new CListItem();
                    objConceptCode.DisplayText = aryDomainValue[0];
                    objConceptCode.Value = aryDomainValue[1];
                    objConceptCode.IsDefault = IsDefaultCode;
                    if (propDetails.Count > 0)
                        objConceptCode.ConceptProperties = propDetails;
                    lstDomainConceptCodes.Add(objConceptCode);
                }
            }
        }
        return lstDomainConceptCodes;
    }

    public static RTEIsExists(sDomainCode: string): boolean {
        sDomainCode = sDomainCode.ToUpper();
        if (!String.IsNullOrEmpty(sDomainCode) && SLCacheManager.SLRTEData.Count() > 0 && SLCacheManager.SLRTEData.ContainsKey(sDomainCode))
            return true;
        else return false;
    }
    public static RTEGet(sDomainCode: string): List<CListItem> {
        sDomainCode = sDomainCode.ToUpper();
        if (SLCacheManager.RTEIsExists(sDomainCode))
            return SLCacheManager.ConvertRTETextToObject(SLCacheManager.SLRTEData[sDomainCode]);
        else return null;
    }
    public static RTEPut(sDomainCode: string, strDomainValues: string): void {
        try {
            sDomainCode = sDomainCode.ToUpper();
            if (!String.IsNullOrEmpty(sDomainCode) && !SLCacheManager.SLRTEData.ContainsKey(sDomainCode)) {
                SLCacheManager.SLRTEData.Add(sDomainCode, strDomainValues);
            }
            else {
                SLCacheManager.SLRTEData[sDomainCode] = strDomainValues;
            }
        }
        catch (e) {

        }

    }
}