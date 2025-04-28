import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CacheService {

    public static items = new Map();  
    
    constructor(){}

    public static GetItem(key){
        if (CacheService.items.has(key)) {
            return CacheService.items.get(key)
        }else{
           return null;
        }
    }

    public static SetItem(key,value){
        CacheService.items.set(key, value);
    }
    
}