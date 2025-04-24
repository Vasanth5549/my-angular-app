import { Injectable } from '@angular/core';
import { HttpHeaders,HttpClient } from '@angular/common/http';
import * as operations from 'src/assets/environment/operations.json' ;
import { Observable } from "rxjs";
import { ContextManagerService } from 'epma-platform/services';
import {ContextType, List, ObservableCollection} from 'epma-platform/models';
import * as services from 'src/assets/environment/services.json' ;
import * as servicesUrl from 'src/assets/environment/services-url.json' ;
import { CContextInformation } from 'epma-platform/models';
import * as mockservicesUrl from 'src/assets/mock-response/mock-services-url.json'
import * as mockoperations from 'src/assets/mock-response/mock-operations.json'
import { environment } from 'src/environments/environment';
import DateTime from './datetime.service';
import * as xml2js from 'xml2js';
import { DataConversionService } from './data-conversion.service';

@Injectable({
  providedIn: 'root'
})
export class AggregateService {
  retryCount:number=0;

  constructor(private http:HttpClient,private _contextManagerService:ContextManagerService) { }

  public fillContextData():CContextInformation{
    let oContextInformation = {} as CContextInformation;
   
    let oContextDataObj = this._contextManagerService.getContextData(ContextType.user);
    oContextInformation.UserID = JSON.parse(oContextDataObj).UserID;
    oContextDataObj = this._contextManagerService.getContextData(ContextType.patient);
    oContextInformation.PatientID = JSON.parse(oContextDataObj).PatientID;
    oContextDataObj = this._contextManagerService.getContextData(ContextType.security);
    oContextInformation.SecurityToken = JSON.parse(oContextDataObj).SecurityKey;
    oContextDataObj = this._contextManagerService.getContextData(ContextType.organization);
    oContextInformation.OrganizationID = JSON.parse(oContextDataObj).OrganizationID;
    oContextInformation.ReleaseVersion = "2";
    return oContextInformation;
  }
  
  public postAggregateData(id:string, requestBody:any): Observable<any>{
    let operation =environment.mockEnvironment ? this.mockGetOperation(id) : this.getOperation(id);
    let fullUrl=this.resolveURL(operation);
    let headers : any;

    if (operation.contentType == 'XML'){
       headers = this.getFormHeaders()  
    }    
    else if (operation.contentType == 'JSON'){
       headers = this.getJsonHeaders()   
    }   

    return this.http.post(fullUrl, requestBody, { headers, responseType: 'text'});
  }
  private getPostXmlHeaders(methodname){
    let soapActionName = `http://isoftplc.com/${methodname}`
    let commonHeaders: any = {
      'SOAPAction': '"'+soapActionName+'"',
      'Content-Type':'text/xml; charset=utf-8',//<- To SEND XML
      'Accept':'application/xml' //<- To ask for XML
    };
      return new HttpHeaders(commonHeaders);
  }


  public getAggregateData(id:string): Observable<any>{
    let customRequestOptions = this.getCommonHeaders();
    let fullUrl = this.resolveURL(id);
    
    return this.http.get(fullUrl, customRequestOptions);
  }
  
  private getOperation(id:string):any{
    let _operations=operations['default'];
    let operation = _operations.find((data:any)=>data.id == id);
    
    return operation;
  }
  private getAbsoluteOrRelativeURL(operation){
    let url = "";
    if((operation.relativeURL != null && operation.relativeURL) || (operation.relativeURL == null && environment.relativeURL)){
      url = "";
    }else
     url = operation.baseUrl;
    return url;
  }
  private resolveURL(operation:any):string{
    let fullUrl='';
    let baseUrl = this.getAbsoluteOrRelativeURL(operation);
    if (operation)
    fullUrl = baseUrl+operation.extendedUrl+operation.resource;
    return fullUrl;
  }  

  private getFormHeaders(){
    return new HttpHeaders().set("Content-Type" , "application/x-www-form-urlencoded")
  }
  private getCommonHeaders() {
    let commonHeaders: any = {
      "Content-Type": "application/x-www-form-urlencoded",
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST'
    };
    const customRequestOptions = {
      headers: new HttpHeaders(commonHeaders)
    }
    return customRequestOptions;
    
  }
  private getJsonHeaders() {
    return new HttpHeaders().set("Content-Type" , "application/json")    
  }  
  public postWebServices(id:string, requestBody:any, charPropertyLookup?: any[],configuration?): Observable<any>{
    let servicename = id.split(".")[0];
    let methodname = id.split(".")[1];

    let oServices =  this.getServices(servicename,methodname);
    let fullUrl = this.resolveServiceURL(oServices);
    let headers : any;
    headers = this.getJsonHeaders();

    if(oServices.contentType == "XML"){
      let iTypeArrayExceptionList;
      let CharExceptionList;
      let dateConfiguration;
      if(configuration && configuration?.exceptionList){
        iTypeArrayExceptionList = configuration.exceptionList.iTypeArrayExceptionList;
        CharExceptionList = configuration.exceptionList.CharExceptionList;
        dateConfiguration = {exception:configuration.exceptionList.utcDateTimeExceptionList,isZuluFormat: configuration.isZuluFormat}
      }

      requestBody = this.getObjectXMLData(methodname, requestBody, charPropertyLookup,iTypeArrayExceptionList,CharExceptionList,dateConfiguration); 
      headers =this.getPostXmlHeaders(methodname);
      fullUrl = fullUrl.replace(`/${methodname}`,'');
    }
          
    return this.http.post(fullUrl, requestBody, { headers, responseType: 'text'});
  }
  private getServices(servicename:string, methodname:string):any{
    let _services = services['default'];
    let oServices = _services.find((data:any)=>data.Service == servicename && data.id == methodname);
    
    return oServices;
  }
  
  public resolveServiceURL(oServices):string{
    let fullUrl='';
    if(oServices){
      let _servicesUrlList = environment.mockEnvironment ? mockservicesUrl['default'] : servicesUrl['default'];
      let oServicesUrlItem = _servicesUrlList.find((data:any)=>data.service == oServices.Service);
      let baseUrl = this.getAbsoluteOrRelativeURL(oServicesUrlItem);

      fullUrl = oServicesUrlItem ? baseUrl + oServicesUrlItem.extendedUrl+oServices.id : "";
    }
    
    return fullUrl;
  } 
  private mockGetOperation(id:string){
   
    let _operations= mockoperations['default'] ;
    let operation = _operations.find((data:any)=>data.id == id);
    
    return operation;
  }
  private getXMLData(requestBody):string{
    const options = {explicitArray:false,headless: true,attrkey: '_attrKey'};  
    const builderXml = new xml2js.Builder(options).buildObject(requestBody);
    //requestBody = this.getData();
    return '<?xml version="1.0" encoding="utf-8"?><s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body>' + builderXml + '</s:Body></s:Envelope>';
  }
  private getObjectXMLData(methodname: string, requestBody: any, charPropertyLookup: any,iTypeArrayExceptionList?,CharExceptionList?,dateConfiguration?) {
    requestBody["_attrKey"] = this.getAttrKeyForMethod();
    let fullreqbody = {};
    // fullreqbody[methodname] = {};
    fullreqbody[methodname] = Object.assign({}, requestBody);
    requestBody = {
      ...fullreqbody
    };
    requestBody = DataConversionService.ConvertObjectXMLData(requestBody, charPropertyLookup,iTypeArrayExceptionList,CharExceptionList,dateConfiguration);
    requestBody = this.getXMLData(requestBody).replaceAll("String", "string");
    return requestBody;
  }
  private getAttrKeyForMethod() {
    let _attrKeyObject = Object.create(null);
    _attrKeyObject["xmlns:i"] = "http://www.w3.org/2001/XMLSchema-instance";
    _attrKeyObject["xmlns"] = "http://isoftplc.com/";
    return _attrKeyObject;
  }

}
