import { Injectable } from '@angular/core';
import { Dictionary } from 'epma-platform/dictionary';

@Injectable({
    providedIn: 'root'
})

export class SLQueryCollection {
   
    public static dicQueryStringContext: Dictionary<string, string> = new Dictionary<string, string>([]);
    constructor() { }

    public static GetQueryStringValue(skey: string) {

        try {
            if (SLQueryCollection.dicQueryStringContext.ContainsKey(skey))
                return SLQueryCollection.dicQueryStringContext[skey];
            else
                return null;
        }
        catch (Exception) {
            return null;
        }
    }
}