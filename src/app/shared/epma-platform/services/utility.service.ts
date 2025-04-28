import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InjectorInstance } from '../../../app.module';
import { AggregateService } from 'epma-platform/services';
import { CacheService } from './cache.service';
import * as converter from 'xml2js';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor(public _http:HttpClient) { }

  public static primaryPostData(domainCodeOperationId,requestBody,key){
    let aggregateService: AggregateService = InjectorInstance.get< AggregateService >(AggregateService);
    return new Observable((observer)=>{
    if(CacheService.items.has(key)){
        let result = CacheService.GetItem(key)
        observer.next(result);
        observer.complete();
    }else{
      aggregateService.postAggregateData(domainCodeOperationId,requestBody).subscribe({
        next(data){
          CacheService.SetItem(key,data);
          observer.next(data);
          observer.complete();
        }
      })
    }
    })
  }

  public static primaryPostDataNoCache(domainCodeOperationId,requestBody,key){
    let aggregateService: AggregateService = InjectorInstance.get< AggregateService >(AggregateService);
    return new Observable((observer)=>{
      aggregateService.postAggregateData(domainCodeOperationId,requestBody).subscribe({
        next(data){
          observer.next(data);
          observer.complete();
        }
      })
    })
  }

  public static xmlToJson(xmlData,options?)
  {
    if(!options){
      options = { strict: false, trim: true,explicitArray : false  };
    }
    return new Observable((observer)=>{
    const parser = new converter.Parser(options);
    parser.parseString(xmlData, (error, result) => {
      if(error) observer.error();
      else{
        observer.next(result);
        observer.complete();
      }
    });
    })
  }
}
