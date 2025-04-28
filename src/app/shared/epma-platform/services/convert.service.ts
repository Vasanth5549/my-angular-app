import { Injectable,ErrorHandler } from '@angular/core';
import { Char, decimal, double, int, Int32, Int64, long } from 'epma-platform/models';
import DateTime, { FormatRegexPattern } from 'epma-platform/DateTime';
import { Int16 } from '../models/eppma-common-types';
import { StringBuilder } from './stringbuilder.service';

@Injectable({
    providedIn: 'root'
})

export class Convert  {

    constructor() { 
    }

    public static ToBoolean(value:(string | boolean | any)):any {
        if(value == null){
            return false;
        }
        if(value && typeof(value) == 'string'){
            if(value.toLowerCase().includes("true"))
            return true 
            else if(value.toLowerCase().includes("false"))
            return false
            else
            return Error('unable to convert '+value+' to boolean');
        }
        return value && value !== 0 ? true :false;
    }
    public static ToString(value: (int | long | double | string | StringBuilder | any)): string {
        if (value == undefined){
            return "";
        }
        if (value instanceof StringBuilder) return value.ToString();
        // adding value == 0 condition in case if value is integer and 0, it always returns false, as 0 is a falsy value
        else return (value == 0) ||  (value && !(typeof(value) == 'string')) ? value.toString() : value;
    }
    public static ToDecimal(arg:string|number):any{
        let parseString:decimal = Number(arg);
        return isNaN(Number(arg)) ? null: Number(parseString);
    }
    //----Sai code change---BugId : 39275 ----
    public static ToDecimalwithThreeprecision(arg:string|number):any{
        let parseString:decimal = Number(arg);
        return isNaN(Number(arg)) ? null: Number(parseString.toFixed(3));
    }
    public static ToInt64(value:string| number):any{
        var regExp = /^[a-z]+$/i ;
        let _value = typeof(value) == 'string' ? Number(value) : value;
        if(_value < Int64.MinValue || _value > Int64.MaxValue){
            throw new Error();
        }if(typeof(value) == 'string' && (value.includes('.') || regExp.test(value))){
            throw new Error();
        }if(typeof(value) == 'object'){
            throw new Error();
        }
        let number1 = Number(value);
        return isNaN(number1) ? 0 : number1;
    }
    public static ToInt32(value: string | number):any{
        var regExp = /^[a-z]+$/i ;
        let _value = typeof(value) == 'string' ? Number(value) : value;
        if(_value < Int32.MinValue || _value > Int32.MaxValue){
            throw new Error();
        }if(typeof(value) == 'string' && (value.includes('.') || regExp.test(value))){
            throw new Error();
        }if(typeof(value) == 'object'){
            throw new Error();
        }
        let number = Number(value);
        return isNaN(number) ? 0 : number;
    }
    public static ToInt16(value:string| number):any{
        var regExp = /^[a-z]+$/i ; 
        let _value = typeof(value) == 'string' ? Number(value) : value;
        if(_value < Int16.MinValue || _value > Int16.MaxValue){
            throw new Error();
        }if(typeof(value) == 'string' && (value.includes('.') || regExp.test(value))){
            throw new Error();
        }if(typeof(value) == 'object'){
            throw new Error();
        }
        let number1 = Number(value);
        return isNaN(number1) ? 0 : number1;
    }
   private static getDecimalPoints(str:string){
        let points = 2;
        if(str.includes('.')){
            points = str.split('.')[1].length;
        }
        return points;
    }
    public static ToDouble(arg: double | string | int, deciPoints?: int): any {
        let points = 2;
        if( typeof arg== "string"){
            points =this.getDecimalPoints(arg);
        } 
        if(typeof arg == 'number' && !deciPoints && arg%1 > 0){
            return arg;
        }
        if (deciPoints) {
            points = deciPoints;
        }
        if (arg) {
            let convertedArg = Number(arg);
            if (convertedArg < Int32.MinValue && convertedArg > Int32.MaxValue) {
                throw new Error('Out of range Double');
            }
            // throw new Error();
            return (typeof arg == 'string' && !isNaN(Number(arg))) ||
                typeof arg == 'number'
                //sai
                ? Number(Number(arg).toFixed(points))
                : new Error('unable to convert ' + arg + ' to double');
        }
        else return 0;
    }
    public static ToChar(arg: number | string): any {
        if (typeof arg == 'number') {
            if (arg < Char.MinValue || arg > Char.MaxValue) {
                throw new Error();
            }
            return arg ? String.fromCharCode(arg) : 0;
        }
        else if(typeof arg == 'string'){
            if(arg == null ){
                throw new Error('ArgumentNullException')
            }
            else if(arg.length != 1){
                throw new Error('FormatException')
            }else{
                if(!isNaN(Number(arg)) && arg.length != 1){
                    return String.fromCharCode(Number(arg))
                }else{
                    return arg;
                }
            }
        }else{
            throw new Error('argument Format not supported yet');
        }
      
    }
    public static ToDateTime(arg:string| any):DateTime{
        if(arg == null || !arg){
            return DateTime.MinValue;
        }else if(typeof arg =='string'){
            if(arg == String.Empty){
            throw new Error();
        }else{
                let regexHHmm = new RegExp(FormatRegexPattern['HHmm']);
                let regexHmm = new RegExp(FormatRegexPattern['Hmm']);
                let regexDateTimeWithTimeOfDay = new RegExp(FormatRegexPattern['MMMddyyyyHHmma']);
                let regexDateTimeWithTimeOfDayWithSpace = new RegExp(FormatRegexPattern['MMMddyyyyHHmmaWithSpace'])               
                let regexDateFormat = new RegExp(FormatRegexPattern['ddMMyyyyHHmmsswithhypen']);
                if(regexHHmm.test(arg) || regexHmm.test(arg)){
                    let currentDate = new Date();
                    let timestring = arg.split(":");
                    currentDate.setHours(Number(timestring[0]))
                    currentDate.setMinutes(Number(timestring[1]))
                    currentDate.setSeconds(Number("00"))
                    let returnValue = DateTime.From(currentDate);
                    return returnValue;
                }
                if(regexDateTimeWithTimeOfDay.test(arg) || regexDateTimeWithTimeOfDayWithSpace.test(arg)){
                    let datetime =  arg.split(" ");
                    datetime = datetime.filter(item => item != "")
                    let time = datetime[3].split(":");
                    let hr = this.ConvertNumberToString(time[0],"00");
                    if(arg.includes("PM") && Number(hr) != 12){
                        hr = String(Number(hr)+12);
                    }
                    if(arg.includes("AM") && Number(hr) == 12){
                        hr = "00";
                    }
                    arg = datetime[0]+" "+this.ConvertNumberToString(datetime[1],"00")+" "+datetime[2]+" "+hr+":"+(time[1].replace("AM","").replace("PM",""));
                    let datetimevalue = DateTime.Parse(arg) ;
                     if((datetimevalue as any as Date).getTimezoneOffset() == -60){
                         return datetimevalue.AddHours(1);
                     }else{
                        return datetimevalue;
                     }

                }
                if(regexDateFormat.test(arg)){
                    try{
                    let date = DateTime.ToJsDate(arg,"ddMMyyyyHHmmsswithhypen");
                    return new DateTime(date.getTime());
                    }catch(e){
                        throw new Error("Unable to Convert to todatetime: DateTime parsed string is in invalid format");
                    }
                }
            let dateTimeValue = DateTime.Parse(arg);
                if(dateTimeValue.toLocaleString().includes("Invalid")){
                    throw new Error("Unable to Convert to todatetime: DateTime parsed string is in invalid format");
                }else{
                    return dateTimeValue;
                }
        }
        } else if(arg instanceof DateTime){
            return arg;
        }
        else if(arg instanceof Date){
            return new DateTime(arg.getTime() + arg.getTimezoneOffset())
        }
        else if(typeof arg == 'number'){
            throw new Error('Invalid Type Cast from number to DateTime');
        }
        else{   
            let dateTimeValue = new DateTime(arg);
            if(dateTimeValue.toLocaleString().includes("Invalid")){
                throw new Error();
            }else{
                return dateTimeValue;
            }
        }
    }
  public static hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      red: parseInt(result[1], 16),
      green: parseInt(result[2], 16),
      blue: parseInt(result[3], 16)
    } : null;
  }
  public static ToByte(value: string | number | any, frombase?: number): any {
    const baselist = [2, 8, 10, 16];
    frombase = frombase ? frombase : 10; //this is right or not sure
    if (baselist.findIndex((item) => item == frombase) == -1) {
      throw new Error();
    }else if(value===0){
        return value;
    } 
    else if (!value) {
      throw new Error();
    } else if (
      value &&
      (typeof value == 'string' || typeof value == 'number') &&
      ((typeof value == 'string' && value.includes('-')) ||
        Number(value) < 0 ||
        Number(value) > 255)
    ) {
      throw new Error();
    } else if (value && typeof value == 'number') {
      return value;
    } else {
      value = typeof value == 'string' ? value.toString() : value;
      const result = parseInt(value, frombase);
      return result && !isNaN(result) ? result : new Error();
    }
  }
  public static ToUInt16(arg: double): any {
    if (arg && arg > 0 && arg < 65535) {
      const splitArray = arg.toString().split('.');
      if (splitArray && splitArray.length == 2 && splitArray[1] == '5') {
        arg = arg % 2 == 0 ? arg : arg + 0.1;
      }
      return Math.round(arg);
    } else {
      return new Error('overflow exception');
    }
  }
  private static ConvertNumberToString(arg,format){
    return (format && format == '00' && arg.toString().length == 1) ? '0'+arg.toString() : arg.toString();
  }
}