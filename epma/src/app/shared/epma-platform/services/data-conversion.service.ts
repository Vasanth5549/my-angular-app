import { Injectable } from '@angular/core';
import { ArrayOfString, List, ObservableCollection } from 'epma-platform/models';
import DateTime from 'epma-platform/DateTime';

@Injectable({
  providedIn: 'root',
})
export class DataConversionService {
  public static ConvertResponseData(data: any ,getproptotype?:object,charPropertyLookup?) {
    for (var property in data) {
      let instanceName = data.constructor.name;
      let extendedInstanceName = data["__proto__"].constructor["__proto__"].name;
      if (data.hasOwnProperty(property) && data[property] != null) {
        if (data[property].constructor == Object) {
          let protoname = this.getInstanceName(
            instanceName,
            extendedInstanceName,
            getproptotype,
            property
          );
          if (protoname &&
            this.isArrayObject(
              data,
              property,
              getproptotype[protoname][property].constructor.name
            )
          ) {
            let value =data[property][
              getproptotype[protoname][property].constructor.name
              ]
              if(typeof(value) == "object" && !Array.isArray(value) ){
                value = [value];
              }
            data[property] = new ObservableCollection(value);
            for (let i = 0; i < data[property].arr.length; i++) {
              data[property].arr[i]['__proto__'] = getproptotype[instanceName][property]
              this.ConvertResponseData(
                data[property].arr[i],
                getproptotype,
                charPropertyLookup
              );
            }
          } else {
            if (getproptotype[instanceName] && getproptotype[instanceName][property]) {
              data[property]['__proto__'] = getproptotype[instanceName][property]
             
            }
           else if(getproptotype[extendedInstanceName] && getproptotype[extendedInstanceName][property]){
            data[property]['__proto__'] = getproptotype[extendedInstanceName][property];
           }

              this.ConvertResponseData(data[property],getproptotype,charPropertyLookup);
          }
          } else if (data[property].constructor == Array) {
            data[property] = new ObservableCollection(data[property]);
            for (let i = 0; i < data[property].arr.length; i++) {
              if (data[property].arr[i] != null && data[property].arr[i] != undefined) {
                if (getproptotype[instanceName] && getproptotype[instanceName][property]) {
                  data[property].arr[i]['__proto__'] = getproptotype[instanceName][property]

                }
                else if (getproptotype[extendedInstanceName] && getproptotype[extendedInstanceName][property]) {
                  data[property].arr[i]['__proto__'] = getproptotype[extendedInstanceName][property];
                }
                if (typeof (data[property].arr[i]) == "string" && this.isDate(data[property].arr[i])) {
                  data[property].arr[i] = new Date(data[property].arr[i]).getFullYear() == 1 || new Date(data[property].arr[i]).getFullYear() == 0 ? DateTime.MinValue : new DateTime(data[property].arr[i]);
                  data[property][i] = new Date(data[property].arr[i]).getFullYear() == 1 || new Date(data[property].arr[i]).getFullYear() == 0 ? DateTime.MinValue : new DateTime(data[property].arr[i]);
                }
                this.ConvertResponseData(data[property].arr[i], getproptotype, charPropertyLookup);
              }
            }
          } else {
            if (this.isDate(data[property]))
              data[property] = new Date(data[property]).getFullYear() == 1 || new Date(data[property]).getFullYear() == 0 ? DateTime.MinValue: new DateTime(data[property]);
              //console.log("this.gp",property, data[property]);
          }
      }else{
     
        if(charPropertyLookup && data[property]==null){
          if (this.isChar(charPropertyLookup, property)) {
            data[property] = "\0";
          }

         // let charPropertyLookupItem = charPropertyLookup.find(item => item.type == data.constructor.name || item.type == data.constructor['__proto__']['__proto__'].name || item.type == data.constructor['__proto__'].name);
          
        }
     
      }
  }
    return data;
  }
  public static getInstanceName(
    instanceName,
    extendedInstanceName,
    getproptotype,
    property
  ) {
    if (getproptotype[instanceName] && getproptotype[instanceName][property]) {
      return instanceName;
    }
    if (
      getproptotype[extendedInstanceName] &&
      getproptotype[extendedInstanceName][property]
    ) {
      return extendedInstanceName;
    }
  }
  public static isArrayObject(data, property, instanceName) {
    return data[property][instanceName] != undefined;
  }
  public static ConvertRequestData(data: any){
    for (var property in data) {
      if (property != "_attrKey" && data.hasOwnProperty(property) && data[property] != null) {
        // if (data[property].constructor == ObservableCollection) {
        if (data[property] instanceof ObservableCollection) {
          data[property] = data[property].array;
          for (let i = 0; i < data[property].length; i++) {
            this.ConvertRequestData(data[property][i]);
          }
        } else  if (typeof(data[property]) == 'object'  ) {
            if(data[property] instanceof DateTime && ( data[property].getFullYear() == 1 || data[property].getFullYear() == 0 || data[property].getFullYear() == 1901)){
            data[property] = "0001-01-01T00:00:00" ;
            } else if (data[property] instanceof DateTime) {
              data[property] = data[property] as any as Date;
            } else{
              this.ConvertRequestData(data[property]);
           }
          } else {
           //exit 
          }
      }
  }
    return data;
  }
  public static ConverttoJson(data: any){
    if (data instanceof ObservableCollection ){
        data = data.array;
    }
    for (var property in data) {
      if (data.hasOwnProperty(property) && data[property] != null) {
        // if (data[property].constructor == ObservableCollection) {
        if (data[property] instanceof ObservableCollection) {
          data[property] = data[property].array;
          for (let i = 0; i < data[property].length; i++) {
            this.ConvertRequestData(data[property][i]);
          }
        } else  if (typeof(data[property]) == 'object'  ) {
            if(data[property] instanceof DateTime && ( data[property].getFullYear() == 1 || data[property].getFullYear() == 1901)){
            data[property] = "0001-01-01T00:00:00" ;
            } else if (data[property] instanceof DateTime) {
              data[property] = data[property] as any as Date;
            } else{
              this.ConvertRequestData(data[property]);
           }
          } else {
           //exit 
          }
      }
  }
    return data;
  }
  private static isDate(dateString) {
    let _regExp = new RegExp('^(-?(?:[1-9][0-9]*)?[0-9]{4})-(1[0-2]|0[1-9])-(3[01]|0[1-9]|[12][0-9])T(2[0-3]|[01][0-9]):([0-5][0-9]):([0-5][0-9])(.[0-9]+)?(Z)?$');
    return _regExp.test(dateString);
    // return typeof (dateString) == 'string'&& isNaN(Number(dateString)) && !isNaN(Date.parse(dateString)) && new DateTime(dateString).ToString() !== "Invalid Date";
  }
  public static circularObjectStrigify(circ){
    var cache = [];
    let str = 
    JSON.stringify(circ, (key, value) => {
        if (typeof value === 'object' && value !== null) {
            // Duplicate reference found, discard key
            if (cache.includes(value)) return;

            // Store value in our collection
            cache.push(value);
        }
        return value;
    });
    cache = null;
    return str;
}
  public static ConvertObjectXMLData(data, charPropertyLookup,iTypeArrayExceptionList?:[],CharExceptionList?,dateConfiguration?) {
   try{
    for (var property in data) {
      if (data.hasOwnProperty(property) && data[property] != null && !(data[property]?.constructor == Function)) {
        if (data[property] instanceof List) {
          data[property] = data[property].ToArray();
          this.ConvertObjectXMLData(data[property], charPropertyLookup,iTypeArrayExceptionList,CharExceptionList,dateConfiguration);
        }
        else if (data[property].constructor == Array) {
          if (data[property]?.length > 0 && data[property][0] != null) {
            /* #region Helptext inputexample= let array = [{test = "1"}] as ArrayDetail */

           //getting element proto from the prototypelist
       
          //  let individualElement= this.getInstanceName(data.constructor,prototypeList,property);
          let instanceName = data[property][0].constructor.name;
            //assigning attribute key
          
            let propertyArray= [...data[property]];
            data[property] = Object.create(null);
            let attrObj = Object.create(null);
            attrObj['i:type'] = instanceName;
            if(iTypeArrayExceptionList && iTypeArrayExceptionList[property]){
              instanceName = iTypeArrayExceptionList[property].constructor.name;
            }
            let propertyArrayLength = propertyArray.length;
            if(typeof propertyArray[0] === "object"){
              for (let i = 0; i < propertyArrayLength; i++) {
                propertyArray[i]['_attrKey'] = attrObj;
              }
            }
            //assigning value like array:{array:[{test = "1",abc:"1", _attrKey:{i:type:'ArrayDetail'}}]}
            data[property][instanceName] = propertyArray;
            for (let item of data[property][instanceName]) {
              this.ConvertObjectXMLData(item, charPropertyLookup, iTypeArrayExceptionList,CharExceptionList,dateConfiguration);
            }
            /*endregion*/
          }
        }
        else if (typeof data[property] == 'object' && property != '_attrKey'
          && !(data[property] instanceof DateTime)) {
          if ((data[property].constructor.name.toLowerCase() != "object")) {
            let attrObj = Object.create(null);
            attrObj['i:type'] = data[property].constructor.name;
            data[property]['_attrKey'] = attrObj;
          }
          this.ConvertObjectXMLData(data[property], charPropertyLookup,iTypeArrayExceptionList,CharExceptionList,dateConfiguration);
        }
        else if (data[property].constructor == DateTime) {
          // just stringifying datetime
          data[property] = this.getLocalDateTime(data, property, dateConfiguration);
        }

        else if (charPropertyLookup && typeof data[property] == 'string' && (data[property].length <= 2 || data[property] == null)) {
          /* convert string to char*/
          let exceptionList = CharExceptionList;
       
          if(exceptionList && exceptionList[property]  && Array.isArray(exceptionList[property])){
            let index = exceptionList[property].findIndex(item => ( item.constructor.name == data.constructor.name || item.constructor.name == data.constructor['__proto__']['__proto__'].name || item.constructor.name == data.constructor['__proto__'].name))
            if(index == -1){
              this.getChar(charPropertyLookup,data,property)
            }
          }else if(exceptionList && exceptionList[property] && !( exceptionList[property].constructor.name == data.constructor.name || exceptionList[property].constructor.name == data.constructor['__proto__']['__proto__'].name || exceptionList[property].constructor.name == data.constructor['__proto__'].name)){
            this.getChar(charPropertyLookup,data,property)
          }else{
            this.getChar(charPropertyLookup,data,property)
          }
 
        }
      }
      if (data[property] == undefined || (typeof data[property] == 'string' && String.IsNullOrEmpty(data[property]))) {
        
        delete data[property];
      }
    }
    }
  
    catch(e){
      console.log(e);
    }
    return data;
  }
  static getChar(charPropertyLookup,data,property){
    if (this.isChar(charPropertyLookup, property)) {
      if (data[property] == '\0' || data[property] == null) {
        data[property] = 0;
        // delete data[property];
      } else {
        data[property] = data[property].charCodeAt(0);
      }
    }
  }
  private static isZuluTimeNotNeeded(utcDateTimeExceptionList,property,data):boolean{
    let isZuluTimeNotNeeded:boolean = false;
    if(utcDateTimeExceptionList && utcDateTimeExceptionList[property] && Array.isArray(utcDateTimeExceptionList[property])){
      //removing the Z in date and adding the difference hrs based on utcDateTimeExceptionList
      let index = utcDateTimeExceptionList[property].findIndex(item => ( item.constructor.name == data.constructor.name || item.constructor.name == data.constructor['__proto__']['__proto__'].name || item.constructor.name == data.constructor['__proto__'].name))
      if(index != -1){
        isZuluTimeNotNeeded = true;
      }else{
        isZuluTimeNotNeeded = false;
      }
    }else if(utcDateTimeExceptionList && utcDateTimeExceptionList[property] && (utcDateTimeExceptionList[property].constructor.name == data.constructor.name || utcDateTimeExceptionList[property].constructor.name == data.constructor['__proto__']['__proto__'].name || utcDateTimeExceptionList[property].constructor.name == data.constructor['__proto__'].name)){
      isZuluTimeNotNeeded = true;
    }

    return isZuluTimeNotNeeded;
     
  }
  public static getLocalDateTime(data, property: string, dateConfiguration): string {
    try {
      if (data[property].getFullYear() == 1 || data[property].getFullYear() == 0)
        return JSON.stringify(data[property]).split(".")[0].replace('"', '') + "Z";
      else {
        if (dateConfiguration && (dateConfiguration.isZuluFormat == false || DataConversionService.isZuluTimeNotNeeded(dateConfiguration.exception, property, data))) {
          //removing the Z in date and adding the difference hrs based on utcDateTimeExceptionList
          // data[property] = this.getLocalDateTime(data[property]);
          let timestamp = data[property].toString().split("GMT")[1].split(" ")[0]; //+0100
          timestamp = timestamp.substring(0, 3) + ":" + timestamp.substring(3);//+01:00
          let datestring = data[property].ToString("yyyy-MM-dd");
          let timestring = data[property].ToString("HH:mm:ss");
          return datestring + "T" + timestring + timestamp;
        } else {
          // just stringifying datetime
          return JSON.stringify(data[property]).replaceAll('"', '');
        }
      }
    } catch (e) {
      console.log("Error occurred at conversion to local time", e);
      return JSON.stringify(data[property]).replaceAll('"', '');
    }

  }
  public static revertConvertedData(data) {
    for (var property in data) {
      if (
        data[property] != null &&
        !(data[property]?.constructor == Function)
      ) {
        if (typeof data[property] == 'object' && property != '_attrKey') {
          let isArray = false;
          let keys = Object.keys(data[property]);
          if (keys.length == 1) {
            keys.forEach((key) => {
              if (
                typeof data[property][key] == 'object' &&
                Array.isArray(data[property][key])
              ) {
                isArray = true;
                data[property] = new ObservableCollection(data[property][key]);
                for (let item of data[property].arr) {
                  if (typeof data[property] == 'object') {
                    this.revertConvertedData(item);
                  }
                }
              }
            });
          }
          if (!isArray) {
            this.revertConvertedData(data[property]);
          }
        }
      }
    }
    return data;
  }

  
static isChar(charPropertyLookup, property){
  try{
    if(charPropertyLookup.includes(property)){
      return true;
    }else{
      return false;
    }
   // let charPropertyLookupItem = charPropertyLookup.find(item => item.type == data.constructor.name || item.type == data.constructor['__proto__']['__proto__'].name || item.type == data.constructor['__proto__'].name);
 
    
  }catch(e){
    console.log("Error occured in ConvertObjectXMLData",e);
    return false
  }
}
}
 /* private static loopObject(
    data,
    item,
    typename,
    response,
    isFromArray: boolean
  ) {
    console.log(data);

    if (Array.isArray(data)) {
      this.storeObservableCollection(typename);

      if (this.isBaseType(data[0])) {
        if (isFromArray) {
          response[item] = new ObservableCollection<any>();
          response[item].AddAll(data);
        } else {
          response[typename][item] = new ObservableCollection<any>();
          response[typename][item].AddAll(data);
        }
      } else {
        if (isFromArray) {
          response[item] = new ObservableCollection<any>();
        } else {
          response[typename][item] = new ObservableCollection<any>();
        }
        data.forEach((eachitems) => {
          const object1 = {};
          for (let eachitem in eachitems) {
            //  let property = this.findProperty(eachitem, typename);
            this.loopObject(eachitems[eachitem], eachitem, item, object1, true);
          }
          isFromArray
            ? response[item].Add(object1)
            : response[typename][item].Add(object1);
        });
      }
    } else if (typeof data == 'object') {
      let property = this.findProperty(item, typename);
      this.storeObservableCollection(typename);
      if(property){
        response[typename][property.type] = {};
        for (let eachitem in data) {
          this.loopObject(
            data[eachitem],
            eachitem,
            property.type,
            response[typename],
            false
          );
        }
      }
  
    } else if (isFromArray) {
      response[item] =
        typeof data == 'string' && !isNaN(Date.parse(data))
          ? new DateTime(data)
          : data;
    } else {
      console.log(new DateTime(data));
      response[typename][item] =
        typeof data == 'string' && !isNaN(Date.parse(data))
          ? new DateTime(data)
          : data;
    }
  }
  private static findCResMsgObject(typename) {
    let _IPPMAManagePrescriptionWS = this.jsonData();
    return _IPPMAManagePrescriptionWS.find(
      (type) => type.typename === typename
    ); // return CResMsgObject
  }
  private static jsonData() {
    return jsondata.types;
  }
  private static findProperty(item, typename) {
    const properties = this.findCResMsgObject(typename)?.properties;
    const property = properties?.find((property) => property.name === item);
    return property;
  }
  private static isBaseType(item) {
    if (
      typeof item == 'string' ||
      typeof item == 'boolean' ||
      typeof item == 'number'
    )
      return true;
    else return false;
  }
  private static storeObservableCollection(typename) {
    typename = typename.replace('[]', '');

    typename = this.ObservableCollectionList[typename]
      ? this.ObservableCollectionList[typename]
      : typename;

    const properties = this.findCResMsgObject(typename)?.properties;
    if (!properties) {
      console.log('hi');
    }
    properties?.forEach((property) => {
      if (property.type.includes('[]'))
        this.ObservableCollectionList[property.name] = property.type.replace(
          '[]',
          ''
        );
    });
  }
}*/
