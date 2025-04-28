import {  Type } from '@angular/core';
import {isEqual} from 'lodash';
import * as _ from 'lodash';
import { ObservableCollection } from '../models/observable-collection';
import { List } from '../models/list';

export class ObjectHelper {
public static CreateObject(dest: any, src: any) {
    for (var property in src) {
      if(!(src[property] instanceof Function))
      dest[property] = src[property];
    }
    return dest;
  }
  public static __as__<T>(obj: any, type: Type<T>|any): T {

    return obj as T;

  }
  public static CreateType<T>(obj: any, type: Type<T> | string | any ): T {
    
    return obj as T;
  }
  public static ReferenceEquals( objA:Object,  objB:Object){
   return (objA ==  null && objB == null)|| (isEqual(objA, objB));
  }
  public static ObjReferenceEquals( objA:Object,  objB:Object){
    return (objA ==  null && objB == null)|| (objA == objB);
   }
  public static isElementInstanceOfArray(array:any, type:string){
    if (Array.isArray(array)) {
      let isDifferentType = false;
      array.forEach(function(item){
         if( item.constructor.name != type ){
          isDifferentType = true;
         }
      })
     return (!isDifferentType && array.length > 0) ? true: false;  
   }else{
    return false;
   }
  }

  public static isElementTypeOfArray(array:any[], type:string){
    if (Array.isArray(array)) {
      let isDifferentType = false;
      array.forEach(function(item){
         if(typeof item !== type){
          isDifferentType = true;
         }
      })
     return (!isDifferentType && array.length > 0) ? true: false;  
   }else{
    return false;
   }
  }
  public static HasValue(val: any): boolean {
    if (val == undefined || val == null) return false;
    else return true;
  }
  public static GetType(param:any):string{
    let paramname = '';
    if(Array.isArray(param) && param.length){
      paramname = param[0].constructor.name
    }
    return paramname ? param.constructor.name+`<${paramname}>` :param.constructor.name;
  }
  public static ResolvingMetaData(componentRef, Meta:Object){
    for (const key in Meta) {
      if (Object.prototype.hasOwnProperty.call(Meta, key) && typeof Meta[key] != 'string' && !componentRef[key]) {
        const element = Meta[key];
        componentRef[key] = element;
      }
    }
}
// String Extension
  public static ToString(thisValue):string{
      if(thisValue == undefined || thisValue == null) return null;
      if (typeof thisValue === 'string') return thisValue;
      if (typeof thisValue === 'number') return thisValue.toString();
      var s: Object = Object(thisValue);
      return JSON.stringify(s);
  }
  public static Equals(thisValue,param):boolean{
    if(thisValue == undefined || thisValue == null) return false;
      var s: Object = Object(thisValue);
  //  return JSON.stringify(s) == JSON.stringify(param);
      let e = false;
      try{
          if(s.constructor.name == 'DateTime' && param.constructor.name  == 'DateTime'){
              let parsedDate = JSON.stringify(s).split(".")[0];
              let parsedParam = JSON.stringify(param).split(".")[0];
              e = parsedDate == parsedParam;
          }else{
              e = JSON.stringify(s) == JSON.stringify(param);
          }
      }
      catch(exp)
      {
          e = (s === param);
      }
      return e;
  }
//Below methods added to address Bug 35796 35799
  public static GetValue(obj: any, prop: string) {
    return obj[prop];
  }
  public static SetValue(obj: any, prop: string, value: any) {
    prop = "_" + prop;
    obj[prop] = value;
  }

  public static Clone<T>(Original:Type<T>|any){
   return  _.cloneDeep(Original)
  }
  public static SetNullforArray(obj:any){
    if(obj){
      if((obj instanceof ObservableCollection || obj instanceof List ) && obj.Count == 0){
        obj.Add(null);
      } else if(obj.length == 0){
        obj.push(null);
      }
    }
    
  }
  public static DoubleMessageMode = false;
  public static DoubleOpenWindowMode = false;
  public static OpenWindowInst = false;
  public static stopFinishAndCancelEvent(value){
    let top:any = window.top;
    if(value)
        top.msgAlert = true;
    else
        top.msgAlert = false;
  }
  public static stopFinishAndCancelEventCommon(value){
    let top:any = window.top;
    if(value)
        top.msgAlert = true;
    else
        top.msgAlert = false;
  }
  public static stopScreenFreezeEvent(value){
    let top:any = window.top;
    if(value && (typeof(top.oScreen)!="undefined" && top.oScreen!=null)   ){
      top.oScreen.UnFreeze();
      if(typeof(top.oScreen)!="undefined"&&top.oScreen!=null&&top.oScreen.IsFreezeEnabled=='1'&&typeof(top.oScreen.UnFreezeScreen)!="undefined"){
        top.oScreen.UnFreezeScreen();
      }
    }
    let topscreen = ObjectHelper.FindTopWindowScreen();
    if ((typeof (topscreen) != "undefined" && topscreen != null) && (typeof (topscreen.oScreen) != "undefined" && topscreen.oScreen != null))
      topscreen.oScreen.UnFreeze();

  }

  public static FindTopWindowScreen() {
    try {
      if (typeof (window.location.href) != 'undefined' && window.location.href.toLowerCase().indexOf('appdialog.aspx') > -1 && window.frameElement != null && window.frameElement.parentElement != null && window.frameElement.parentElement.querySelector('[id=DlgTitle]')) {
        (window as any).oScreen.IsFreezeDialog = true;
        return window;
      }
      else if (window.parent != undefined) {
        let indx = 5;
        let oWindow: any = window.parent;
        for (let i = 0; i < indx; i++) {
          if (typeof (oWindow) != 'undefined' && typeof (oWindow.location.href) != 'undefined' && oWindow.location.href.toLowerCase().indexOf('appdialog.aspx') > -1 && oWindow.frameElement != null && oWindow.frameElement.parentElement != null && oWindow.frameElement.parentElement.querySelector('[id=DlgTitle]')) {
            oWindow.oScreen.IsFreezeDialog = true;
            return oWindow;
          }
          oWindow = oWindow.parent;
        }
        if (window.top != null)
          return window.top;
      }
      else if (window.top != null)
        return window.top;
      else
        return window;
    }
    catch (e) { console.log(e); }
  }
  public static ShallowCloneObject(dest: any, src: any) {
    dest = _.clone(src);
    for (var property in src) {
      if((src[property] instanceof ObservableCollection)){
      dest[property] = _.clone(src[property]);
      }
    }
    return dest;
  }
}