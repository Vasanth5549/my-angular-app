import { formatDate } from '@angular/common';
import { DayOfWeek, SLDateUtility } from './sLDateUtility.service';
import TimeSpan from 'epma-platform/TimeSpan';
import { CultureInfo } from '../models/eppma-common-types';
import { TimeZoneInfo } from '../models/time-zone-info';
import * as _ from 'lodash';

/** 
* DateTime differs from Date in following cases,
* 1. DateTime is immutable, however underlying object is Date
*    but all methods specific to DateTime are immutable
* 2. DateTime has readonly properties for `day, month, year etc`
* 3. DateTime is derived from Date so passing DateTime to existing
*    code will not change anything, however intellisense does not display
*    any methods of Date unless you explicity cast as Date, but instanceof
*    works correctly
* 4. DateTime does not modify underlying Date prototype or add any methods to it
* ``` typescript
* DateTime dt = DateTime.now();
* (dt instanceof Date) // is true
* (dt instanceof DateTime) // is also true
* ```
*/
const timeDifference = 621355968000000000;
export default class DateTime {
  //STUB Code for bug#36081
  // static Compare: any;
  public static From(d: Date | DateTime): DateTime {
    if (!(d instanceof DateTime)) {
      d = new DateTime(d.getTime());
    }
    return d;
  }

 /**
  * Current date without time
  */
 public static get Today(): DateTime {
   const a = new DateTime();
   return a.Date;
 }

 /**
  * Current UTC Date
  */
 public static get UtcNow(): DateTime {
   const now = new Date();
   return new DateTime(now.getTime() + now.getTimezoneOffset());
 }

 /**
  * DateTime at right now
  */
 public static get Now(): DateTime {
   return new DateTime();
 }

 public static Parse(s: string,cultureInfo?:CultureInfo): DateTime {
  let regexHHmm = new RegExp(FormatRegexPattern['HHmm']);
  let regexHmm = new RegExp(FormatRegexPattern['Hmm']);
  if(regexHHmm.test(s) || regexHmm.test(s)){
      let currentDate = new Date();
      let timestring = s.split(":");
      currentDate.setHours(Number(timestring[0]))
      currentDate.setMinutes(Number(timestring[1]))
      currentDate.setSeconds(Number("00"))
      let returnValue = DateTime.From(currentDate);
      return returnValue;
  }else{
  let StringFormat:string = 'yyyy/MM/dd H:mm:ss';
  //culture details are defaulted to cultureinfo.culture
  let timezone = cultureInfo == CultureInfo.InvariantCulture ? CultureInfo.InvariantCulture : CultureInfo.culture;
   return new DateTime(formatDate(s, StringFormat, CultureInfo.culture));
 }
}
public static NotEquals(date1:DateTime | Date, date2:DateTime ){
  return !(this.Equals(date1,date2));
}
public NotEquals(param:DateTime):boolean{
  return !this.Equals(param);
}
public static Equals(date1:DateTime | Date,date2:DateTime | Date){
//revisit required
  // if(date1 && date1 instanceof Date){
  //   return this.IntEquals(date1,date2);
  // }
  if(date1 && date2){
    return date1.Equals(date2 as any as DateTime);
  }else{
    return false;
  }
}

public Equals(param:DateTime):boolean{
  var s: Date =this as any as Date;
  let isSMinvalue:Boolean = ((s).getFullYear().toString() == '1' ||
  (s).getFullYear().toString() == '0');
  let isParamMinvalue:Boolean = ((param as any as Date).getFullYear().toString() == '1' || 
  (param as any as Date).getFullYear().toString() == '0');

  if(isSMinvalue && isParamMinvalue){
    return true;
   }else if(isSMinvalue || isParamMinvalue){
    return s.toDateString() == param.toDateString();
   }
   if(!TimeZoneInfo.Local.IsAmbiguousTime(s as any as DateTime) && !TimeZoneInfo.Local.IsAmbiguousTime(param as any as DateTime) ){
   //for AmbiguousTime, there is a chance that for one second difference the equals method may fail
    s.setMilliseconds(0);
    (param as any as Date).setMilliseconds(0);
   }

  return s.getTime() == (param as any as Date).getTime();
}
public static GreaterThan(date1:DateTime, date2:DateTime ){
  if(date1 && date2){
    return date1.GreaterThan(date2);
  }else{
    return false;
  }
}
public GreaterThan(param:DateTime):boolean{
  var s: Date = this as any as Date;
  if(!TimeZoneInfo.Local.IsAmbiguousTime(s as any as DateTime) && !TimeZoneInfo.Local.IsAmbiguousTime(param as any as DateTime) ){
   //for AmbiguousTime, there is a chance that for one second difference the equals method may fail
  s.setMilliseconds(0);
  (param as any as Date).setMilliseconds(0);
  }
  let parsedDate = s.getTime();
  let parsedParam = (param as any as Date).getTime();
  return parsedDate > parsedParam;
}
public static LessThan(date1:DateTime, date2:DateTime ){
  if(date1 && date2){
    return date1.LessThan(date2);
  }else{
    return false;
  }
}
public LessThan(param:DateTime):boolean{
  var s: Date = this as any as Date;
  if(!TimeZoneInfo.Local.IsAmbiguousTime(s as any as DateTime) && !TimeZoneInfo.Local.IsAmbiguousTime(param as any as DateTime) ){
   //for AmbiguousTime, there is a chance that for one second difference the equals method may fail
  s.setMilliseconds(0);
  (param as any as Date).setMilliseconds(0);
  }
  let parsedDate = s.getTime();
  let parsedParam = (param as any as Date).getTime();
  return parsedDate < parsedParam;
}
public static GreaterThanOrEqualTo(date1:DateTime, date2:DateTime ){
  if(date1 && date2){
    return date1.GreaterThanOrEqualTo(date2);
  }else{
    return false;
  }
}
public GreaterThanOrEqualTo(param:DateTime):boolean{
  var s: Date = (this as any as Date);
  if(!TimeZoneInfo.Local.IsAmbiguousTime(s as any as DateTime) && !TimeZoneInfo.Local.IsAmbiguousTime(param as any as DateTime) ){
   //for AmbiguousTime, there is a chance that for one second difference the equals method may fail
  s.setMilliseconds(0);
  (param as any as Date).setMilliseconds(0);
  }
  let parsedDate = s.getTime();
  let parsedParam = (param as any as Date).getTime();
  return parsedDate >= parsedParam;
}
public static LessThanOrEqualTo(date1:DateTime, date2:DateTime ){
  if(date1 && date2){
    if(typeof date1 == 'number' && typeof date2 == 'number'){
      return date1 === date2;
    }else
    return date1.LessThanOrEqualTo(date2);
  }else{
    return false;
  }
}
public LessThanOrEqualTo(param:DateTime):boolean{
  var s: Date = (this as any as Date);
  if(!TimeZoneInfo.Local.IsAmbiguousTime(s as any as DateTime) && !TimeZoneInfo.Local.IsAmbiguousTime(param as any as DateTime) ){
   //for AmbiguousTime, there is a chance that for one second difference the equals method may fail
  s.setMilliseconds(0);
  (param as any as Date).setMilliseconds(0);
  }
  let parsedDate = s.getTime();
  let parsedParam = (param as any as Date).getTime();
  return parsedDate <= parsedParam;
}
public static getMilliSeconds(date1:DateTime ){
  if(date1 ){
    return date1.getMilliSeconds();
  }else{
    return false;
  }
}
public getMilliSeconds() {
    var s: Date = (this as any as Date);
    return s.getTime();
}
 /** Day of month */
 public get Day(): number {
   return (this as any as Date).getDate();
 }

 /** Day of week */
 public get DayOfWeek() {
  let index = (this as any as Date).getDay();
  return index
 }

 public get Month(): number {
   return (this as any as Date).getMonth()+1;
 }

 public get Year(): number {
   return (this as any as Date).getFullYear();
 }

 public get Hour(): number {
   return (this as any as Date).getHours();
 }

 public get Minute(): number {
   return (this as any as Date).getMinutes();
 }

 public get Second(): number {
   return (this as any as Date).getSeconds();
 }

 public get MilliSecond(): number {
   return (this as any as Date).getMilliseconds();
 }

 /**
  * Timezone offset as TimeSpan
  */
 public get TimeZoneOffset(): TimeSpan {
   return TimeSpan.FromMinutes((this as any as Date).getTimezoneOffset());
 }

 public static get Kind(): Date{
   return new Date();
 }

 /**
  * Milliseconds since EPOCH, ie total number of milliseconds
  * of underlying Date object
  */
 public get MsSinceEpoch(): number {
   return (this as any as Date).getTime();
 }

 public static TryParseExact(sDOB: string, arg1: string, timeZone?: string);
 public static TryParseExact( sDOB:string, arg1:string, timeZone?: string | any, style?:DateTimeStyles, out?: (result:DateTime) => void );
 public static TryParseExact( sDOB:string, arg1:string, timeZone?: string | any, style?:DateTimeStyles, out?: (result:DateTime) => void ) {
  if(sDOB == null && arg1 == null){
    if(typeof out == 'function'){
      out(DateTime.MinValue);
    }
    return false;
  }
  if ( style && !(style in DateTimeStyles)) {
    throw new Error('ArgumentException');
  }
  let stringFormat  = arg1.replaceAll('/','').replaceAll('-','').replaceAll(':','').replaceAll(' ','');
  let regex = new RegExp(FormatRegexPattern[stringFormat]);
  if(!regex.test(sDOB)){
    out(DateTime.MinValue);
    return false;
  }
//let formattedDate = formatDate( DateTime.ToJsDate(sDOB, stringFormat), arg1, CultureInfo.culture)
   let date = DateTime.From( DateTime.ToJsDate(sDOB, stringFormat));
  if(date && date.toLocaleDateString() != 'Invalid'){
    if(typeof out == 'function'){
       out(date) ;
      }
      return true;
  }else{
    if(typeof out == 'function'){
      out(DateTime.MinValue);
    }
    return false;
   }
  //  return {
  //    isParsed: date ? true : false,
  //    value: date
  //  }
 }
 public AddDateAdjustment():DateTime{
  //stub added
  let dtInput = (this as any as DateTime);
  var _t: DateTime = new DateTime(dtInput.Year, dtInput.Month, dtInput.Day, 0, 0, 0, DateTimeKind.Unspecified);
  let isDST=false;
  return _t.ConvertToLocal(isDST);
 }

  /**
  * DateTime as string
  */
   public ToString(StringFormat:string = 'yyyy/MM/dd hh:mm:ss'): string {
     let timeZone: string = 'en_IN'
     const d = new Date(this.MsSinceEpoch);
     let formatedDate = formatDate(d, StringFormat, CultureInfo.culture)
     return formatedDate;
   }
 
   /**
    * DateTime as string
    */
 
   public ToDateTimeString(isDST:boolean,isAmbiguous:boolean,StringFormat:string) : string
   {
      let dtInput = this as any as DateTime;
      if (isDST && isAmbiguous && !String.IsNullOrEmpty(StringFormat) && StringFormat.length > 0 && (StringFormat.IndexOf("hh") >= 0 || StringFormat.IndexOf("HH") >= 0))
      return String.Concat(dtInput.ToString(StringFormat), " DST");
       else
      return dtInput.ToString(StringFormat);
   }

 /**
  * Strips time of the day and returns Date only
  */
 public get Date(): DateTime {
  let date = new Date((this as any as Date).getTime());
  date.setHours(0,0,0,0);
  return DateTime.From(date);
 }
 public get DateTime(): DateTime {
  let date = new Date((this as any as Date).getTime());
  date.setHours(0,0,0,0);
  return DateTime.From(date);
 
}

 /**
  * Just for convenience, avoid using this, instead use methods of DateTime
  * or suggest better method at our github repo
  */
 public get asJSDate(): Date {
   return this as any as Date;
 }

 /**
  * Gets time of the day in TimeSpan format
  */
 public get Time(): TimeSpan {
   return new TimeSpan(
     0,
     (this as any as Date).getHours(),
     (this as any as Date).getMinutes(),
     (this as any as Date).getSeconds(),
     (this as any as Date).getMilliseconds()
   );
 }

 /**
  * Converts a date and time to a string by using the current or specified locale.
  * @param locales A locale string or array of locale strings that contain one or more language
  * or locale tags. If you include more than one locale string, list them in descending order of
  * priority so that the first entry is the preferred locale. If you omit this parameter,
  * the default locale of the JavaScript runtime is used.
  * @param options An object that contains one or more properties that specify comparison options.
  */
 public toLocaleString: ((
   locales?: string | string[],
   options?: Intl.DateTimeFormatOptions
 ) => string) | any;
 public ToLocaleString(
   locales?: string | string[],
   options?: Intl.DateTimeFormatOptions
 ): string {
   return this.toLocaleString(locales, options);
 }

 /**
  * Converts a date to a string by using the current or specified locale.
  * @param locales A locale string or array of locale strings that contain one or more language
  * or locale tags. If you include more than one locale string, list them in descending order
  * of priority so that the first entry is the preferred locale. If you omit this parameter,
  * the default locale of the JavaScript runtime is used.
  * @param options An object that contains one or more properties that specify comparison options.
  */
 public toLocaleDateString: ((
   locales?: string | string[],
   options?: Intl.DateTimeFormatOptions
 ) => string) | any;

 /**
  * Converts a time to a string by using the current or specified locale.
  * @param locales A locale string or array of locale strings that contain one or more language
  * or locale tags. If you include more than one locale string, list them in descending order of
  * priority so that the first entry is the preferred locale. If you omit this parameter,
  * the default locale of the JavaScript runtime is used.
  * @param options An object that contains one or more properties that specify comparison options.
  */
 public toLocaleTimeString: ((
   locales?: string | string[],
   options?: Intl.DateTimeFormatOptions
 ) => string) | any;

 /** Returns a date converted to a string using Universal Coordinated Time (UTC). */
 public toUTCString: (() => string) | any;
 /** Returns a date as a string value in ISO format. */
 public toISOString: (() => string) | any;

 /** Used by the JSON.stringify method to enable the transformation of an object's data for JavaScript Object
  * Notation (JSON) serialization.
  */
 public toJSON: ((key?: any) => string) | any;

 public toTimeString: (() => string) | any;

 public toDateString: (() => string) | any;
   /** above toUTCString,toISOString,toJSON,toTimeString,toDateString function not used */

 public  ToLocalTime():DateTime{
  let date = this as any as DateTime;
   return  date;
 }
 
 public ToUniversalTime():DateTime{
  let date = this as any as DateTime;

  return date;
 }

 public get TimeOfDay():TimeSpan{
  //  return new TimeSpan(
  //    0,
  //    (this as any as Date).getHours(),
  //    (this as any as Date).getMinutes(),
  //    (this as any as Date).getSeconds(),
  //    (this as any as Date).getMilliseconds()
  //  );
  let SelectedDate = (this as any as Date);
  SelectedDate = SelectedDate.getFullYear() == 0 || SelectedDate.getFullYear() == 1 ? (DateTime.MinValue.Date as any as Date) : SelectedDate;
  let date = new Date(
    1970,
    0,
    1,
    (SelectedDate).getHours(),
     (SelectedDate).getMinutes(),
     (SelectedDate).getSeconds(),
     (SelectedDate).getMilliseconds());
  let offsetMs = date.getTimezoneOffset() * 60000;
  return new TimeSpan(date.getTime() - offsetMs);
 }

  /** below ValueOf function not used */
 public ValueOf() {
   return (this as any as Date).getTime();
 }

 constructor();
 // tslint:disable-next-line: unified-signatures
 constructor(time?: number | string);
 constructor(ticks?:number, kind?:DateTimeKind);
 constructor(
   year?: number,
   month?: number,
   date?: number,
   hours?: number,
   // tslint:disable-next-line: unified-signatures
   minutes?: number,
   seconds?: number,
   ms?: number
 );
 constructor(
   a?: any,
   b?: any,
   c?: number,
   d?: number,
   e?: number,
   f?: number,
   g?: number
 ) {
   // super();
   // tslint:disable-next-line: no-string-literal
   this['__proto__'] = DateTime.prototype;
   let rd: any;
   switch (arguments.length) {
     case 0:
       rd = new Date() as any;
       break;
     case 1:
       rd = new Date(a) as any;
       break;
     case 2:
      if(a.length<=4){
       rd = new Date(a, b-1) as any;
      }else{
        rd = new Date(((a-timeDifference)/10000)) as any;
      }
       break;
     case 3:
       rd = new Date(a, b-1, c) as any;
       break;
     case 4:
       rd = new Date(a, b-1, c, d) as any;
       break;
     case 5:
       rd = new Date(a, b-1, c, d, e) as any;
       break;
     case 6:
       rd = new Date(a, b-1, c, d, e, f) as any;
       break;
     default:
       rd = new Date(a, b-1, c, d, e, f, g) as any;
   }
   rd.__proto__ = DateTime.prototype;
   return rd as any;
 }

 /**
  * Adds date or TimeSpan to current date and returns a new DateTime
  * @returns DateTime
  * @param d DateTime or TimeSpan
  */
 public Add(d: DateTime | TimeSpan): DateTime;

 /**
  * Adds (or removes -ve values specified) and returns newly created DateTime
  * @returns DateTime
  * @param days number of days
  * @param hours number of hours
  * @param minutes number of minutes
  * @param seconds number of seconds
  * @param milliseconds number of milliseconds
  */
 public Add(
   days: number,
   hours?: number,
   minutes?: number,
   seconds?: number,
   milliseconds?: number
 ): DateTime;
 public Add(
   t: DateTime | TimeSpan | Date | number,
   hours?: number,
   minutes?: number,
   seconds?: number,
   milliseconds?: number
 ): DateTime {
   if (t instanceof Date) {
     return new DateTime((this as any as Date).getTime() + t.getTime());
   }
   let days: number = 0;
   if (t instanceof TimeSpan) {
    // let date = new Date(t.TotalMilliseconds)
     days = t.Days;
     hours = t.Hours;
     minutes = t.Minutes;
     seconds = t.Seconds;
     milliseconds = t.Milliseconds;
   } else {
     days = t as number;
   }
   function hasValue(n: number | undefined | null, name: string): boolean {
     if (n === undefined) {
       return false;
     }
     if (n === null) {
       throw new Error(`${name} cannot be null`);
     }
     return n !== 0;
   }
   const d = new Date((this as any as Date).getTime());
   if (hasValue(days, 'days')) {
     d.setDate(d.getDate() + days);
   }
   if (hasValue(hours, 'hours')) {
     d.setHours(d.getHours() + hours!);
   }
   if (hasValue(minutes, 'minutes')) {
     d.setMinutes(d.getMinutes() + minutes!);
   }
   if (hasValue(seconds, 'seconds')) {
     d.setSeconds(d.getSeconds() + seconds!);
   }
   if (hasValue(milliseconds, 'milliseconds')) {
     d.setMilliseconds(d.getMilliseconds() + milliseconds!);
   }
   Object.setPrototypeOf(d, DateTime.prototype);
   return d as any as DateTime;
 }

 /**
  * Subtracts date or TimeSpan to current date and returns a new DateTime
  * @returns DateTime
  * @param d DateTime or TimeSpan
  */
 public Subtract(d: DateTime | TimeSpan):DateTime |TimeSpan| any ;

 /**
  * Subtracts (or removes -ve values specified) and returns newly created DateTime
  * @returns DateTime
  * @param days number of days
  * @param hours number of hours
  * @param minutes number of minutes
  * @param seconds number of seconds
  * @param milliseconds number of milliseconds
  */
 public Subtract(
   days: number,
   hours?: number,
   minutes?: number,
   seconds?: number,
   milliseconds?: number
 ): DateTime  |TimeSpan| any ;
 public Subtract(
   t: DateTime | TimeSpan | Date | number,
   hours?: number,
   minutes?: number,
   seconds?: number,
   milliseconds?: number
 ):DateTime |TimeSpan| any {
   if (t instanceof Date) {
    let subtractedTotalMilliSeconds = (this as any as Date).getTime() - t.getTime();
      return new TimeSpan(subtractedTotalMilliSeconds);
   }
   let days: number = 0;
   if (t instanceof TimeSpan) {
     days = t.Days;
     hours = t.Hours;
     minutes = t.Minutes;
     seconds = t.Seconds;
     milliseconds = t.Milliseconds;
   } else {
     days = t as number;
   }
   function hasValue(n: number | undefined | null, name: string): boolean {
     if (n === undefined) {
       return false;
     }
     if (n === null) {
       throw new Error(`${name} cannot be null`);
     }
     return n !== 0;
   }
   const d = new Date((this as any as Date).getTime());
   if (hasValue(days, 'days')) {
     d.setDate(d.getDate() - days);
   }
   if (hasValue(hours, 'hours')) {
     d.setHours(d.getHours() - hours!);
   }
   if (hasValue(minutes, 'minutes')) {
     d.setMinutes(d.getMinutes() - minutes!);
   }
   if (hasValue(seconds, 'seconds')) {
     d.setSeconds(d.getSeconds() - seconds!);
   }
   if (hasValue(milliseconds, 'milliseconds')) {
     d.setMilliseconds(d.getMilliseconds() - milliseconds!);
   }
   Object.setPrototypeOf(d, DateTime.prototype);
   return d as any as DateTime;
 }

 public AddMonths(m: number): DateTime {
   const d = new Date(this.MsSinceEpoch);
   d.setMonth(d.getMonth() + m);
   Object.setPrototypeOf(d, DateTime.prototype);
   return d as any;
 }

 public AddYears(y: number): DateTime {
   const d = new Date(this.MsSinceEpoch);
   d.setFullYear(d.getFullYear() + y);
   Object.setPrototypeOf(d, DateTime.prototype);
   return d as any;
 }

 public AddDays(day: number): DateTime {
   const d = new Date(this.MsSinceEpoch);
   d.setDate(d.getDate() + day);
   Object.setPrototypeOf(d, DateTime.prototype);
   return d as any;
 }
 /** GetUserTime not used */
 public GetUserTime(): string {
   return this.toLocaleString();
 }
 public AddHours(h: number): DateTime {
   let d = new Date(this.MsSinceEpoch);
   if (TimeZoneInfo.Local.IsAmbiguousTime(d as any as DateTime)) {
     //to be revised
    d = new Date(this.MsSinceEpoch + (h * 3600000));
   }else{
   d.setHours(d.getHours() + h);
   }
   Object.setPrototypeOf(d, DateTime.prototype);
   return d as any;
 }

 public AddMinutes(m: number): DateTime {
   const d = new Date(this.MsSinceEpoch);
   d.setMinutes(d.getMinutes() + m);
   Object.setPrototypeOf(d, DateTime.prototype);
   return d as any;
 }

  public AddSeconds(s: number): DateTime {
    const d = new Date(this.MsSinceEpoch);
    d.setSeconds(d.getSeconds() + s);
    Object.setPrototypeOf(d, DateTime.prototype);
    return d as any;
  }

  public AddMilliseconds(m: number): DateTime {
    //stub
  const d = new Date(this.MsSinceEpoch);  
  d.setMilliseconds(d.getMilliseconds() + m);  
  Object.setPrototypeOf(d, DateTime.prototype); 
   return d as any;
   }

 /**
  * Returns TimeSpan from subtracting rhs from this,
  * `const ts = lhs.diff(rhs); // ts = lhs - rhs`
  * @param rhs Right hand side
  * @returns TimeSpan
  */
  /** below diff function not used */
 public Diff(rhs: Date | DateTime): TimeSpan {
   return new TimeSpan(
     (this as any as Date).getTime() - (rhs as Date).getTime()
   );
 }

  public static IntEquals(d: DateTime | Date, d1: DateTime | Date): boolean {
    if (!d) {
      return false;
    }
    let date1 = d as any as Date;
    let date2 = d1 as any as Date;

    if (date1.getFullYear().toString() == '1' && date2.getFullYear().toString() == '1') {
      return true;
    } else {
      return (d as any as Date).getTime() === (d1 as any as Date).getTime();
    }
  }

 /**
  * Trims time part and compares the given dates
  * @param d date to test
  */
 /** below dateequals function not used */
//  public DateEquals(d: DateTime | Date): boolean {
//    if (!d) {
//      return false;
//    }
//    return this.Date.Equals(DateTime.From(d).Date);
//  }
  /** below Compare function not used */
//  public Compare(d: DateTime | Date): number {
//    return (this as any as Date).getTime() - (d as any as Date).getTime();
//  }
public Compare(d: DateTime | Date): number {
  let date = this as any as Date;
  let date1 = d as any as Date; 
  if(date.getFullYear().toString() == '0001' || date1.getFullYear().toString() == '0001'){
    date = new Date(date.toDateString());
    date1 = new Date(date.toDateString());
   }

  if(date.getTime() < date1.getTime()){
    return -1;
  }else if(date.getTime() > date1.getTime()){
    return 1;
  }else if(date.getTime() == date1.getTime()){
    return 0
  }else{
    return -1;
 }

  }
  public static Compare(d1: DateTime | Date, d2: DateTime | Date): number {
    let date = d1 as any as Date;
    let date1 = d2 as any as Date;
    if (date.getFullYear().toString() == '0001' || date1.getFullYear().toString() == '0001') {
      date = new Date(date.toDateString());
      date1 = new Date(date.toDateString());
    }

    if (date.getTime() < date1.getTime()) {
      return -1;
    } else if (date.getTime() > date1.getTime()) {
      return 1;
    } else if (date.getTime() == date1.getTime()) {
      return 0
    } else {
      return -1;
    }

  }
  public SetDateValue(v: Date) {
    let d: Date = this as any as Date;
    let diffmilli = d.getTime() - v.getTime();
    //this.AddMilliseconds(diffmilli);    
    d.setMilliseconds(d.getMilliseconds() + diffmilli);  
}

  /** below ToRelativeString function not used */
 public ToRelativeString(dt?: DateTime | Date): string {
   if (!dt) {
     dt = DateTime.Now;
   } else {
     if (dt instanceof Date && !(dt instanceof DateTime)) {
       (dt as any).__proto__ = DateTime.prototype;
       dt = dt as any as DateTime;
     }
   }

   const diff = this.Diff(dt);
   if (dt.Year !== this.Year) {
     return this.toLocaleDateString();
   }

   if (Math.abs(diff.TotalDays) > 6) {
     return this.toLocaleDateString(undefined, {
       month: 'short',
       day: 'numeric',
     });
   }

   if (Math.abs(diff.TotalHours) > 23) {
     return this.toLocaleDateString(undefined, { weekday: 'short' });
   }

   if (Math.abs(diff.TotalMinutes) > 59) {
     return `${Math.floor(diff.TotalHours)} hours`;
   }

   return `${Math.floor(diff.TotalMinutes)} mins`;
 }

 /** below GetNextDSTDate function not used */
 public GetNextDSTDate( dayOfWeek:DayOfWeek, weekNo:number, month:number):DateTime
 {
   let date:DateTime= new DateTime();
     date = date.AddDays((dayOfWeek < date.DayOfWeek ? 7 : 0) + dayOfWeek - date.DayOfWeek).AddDays((weekNo - 1) * 7);

     while (date.Month > month)
     {
         date = date.AddDays(-7);
     }

     return date;
 }

 public ConvertToUser(out: (IsDST:boolean) => void,
 out1: ( IsAmbiguous:boolean) => void,
 out2: (IsInvalid:boolean) => void): DateTime {
  let IsDST = false;
  let IsAmbiguous = false;
  let IsInvalid = false;

  IsDST = TimeZoneInfo.Local.IsDSTWithInAmbiguousTime(this);
  IsAmbiguous = TimeZoneInfo.Local.IsAmbiguousTime(this);
  IsInvalid = TimeZoneInfo.Local.IsInvalidTime(this);


   out(IsDST);
   out1(IsAmbiguous);
   out2(IsInvalid);
   return this;
 }

 public ConvertToLocal(IsDST:boolean): DateTime {
  let givenDate = this as any as DateTime;
  if(TimeZoneInfo.Local.IsAmbiguousTime(givenDate)){
  let date = this.DSTConversion(this as any as DateTime,IsDST);
   return date.ToLocalTime();
  }else{
    return givenDate.ToLocalTime();
  }
 }
 private DSTConversion(data, isDST){
  let janTimeStamp = (new Date(data.getFullYear(), 0, 1)).toString().split("GMT")[1].split(" ")[0];
  let julTimeStamp = (new Date(data.getFullYear(), 6, 1)).toString().split("GMT")[1].split(" ")[0];
  let timestamp = data.toString().split("GMT")[1].split(" ")[0]; //+0100;
  timestamp =(isDST ? julTimeStamp.substring(0, 3) : janTimeStamp.substring(0, 3))+ ":" + timestamp.substring(3);//+01:00
  let datestring = data.ToString("yyyy-MM-dd");
  let timestring = data.ToString("HH:mm:ss");
  return new DateTime(datestring + "T" + timestring + timestamp);
 }
 public ToShortDateString():string{
   //implementation remaining
   return (this as any as Date).toDateString();
 }
 public static ParseExact(s:string, format:string, IFormatProvider?:CultureInfo) {
  let stringFormat  = format.replaceAll('/','').replaceAll('-','').replaceAll(':','').replaceAll(' ','');
  let regex = new RegExp(FormatRegexPattern[stringFormat]);
  if(!regex.test(s)){
    throw new Error("unable to convert " + s +" to "+ format);
  }
   IFormatProvider = IFormatProvider ? IFormatProvider: CultureInfo.culture;
   //let formattedDate = formatDate(DateTime.ToJsDate(s, stringFormat), format, CultureInfo.culture)
   let date =  DateTime.From(DateTime.ToJsDate(s, stringFormat));
   return date;
 }
 public static TryParse(arg:string, out: (o: DateTime) => void):boolean{
   if(isNaN(Date.parse(arg))){
     out(DateTime.MinValue);
     return false;
   }else{
     out(new DateTime(arg));
     return true;
   }
 }
 /*public AddTime( dtInput:DateTime ):DateTime{

  return  new DateTime((this as any as Date).getTime() + (dtInput as any as Date).getTime());
 } */
 public AddTime( dtTime:DateTime):DateTime
 {
  let dtInput:DateTime = (this as any as DateTime);
  let IsDST= false;
  let IsAmbiguous= false;
  let IsValid= false;
  if(dtInput.Year==1 ||dtInput.Year==0 || dtTime.Year == 1 || dtTime.Year==0){
    return dtInput;
  }else{
    let _t2 :DateTime= dtTime.ConvertToUser(_IsDST => {IsDST = _IsDST;},(_IsAmbiguous) => {IsAmbiguous = _IsAmbiguous;},( _IsValid) => {IsValid = _IsValid; });
    let _t:DateTime =new DateTime(dtInput.Year, dtInput.Month, dtInput.Day, _t2.Hour, _t2.Minute, _t2.Second, DateTimeKind.Unspecified);
    return _t.ConvertToLocal(IsDST); 
  }
 }
 public ToUserDateTimeString( StringFormat: string ):string{
  let IsDST:boolean = false;
  let  IsAmbiguous:boolean = false;
  let IsInvalid:boolean = false;
  let dtInput = this as any as DateTime;

  return dtInput.ConvertToUser(_IsDST => {IsDST = _IsDST;},(_IsAmbiguous) => {IsAmbiguous = _IsAmbiguous;},( _IsInvalid) => {IsInvalid = _IsInvalid; }).ToDateTimeString(IsDST, IsAmbiguous, StringFormat);
 }
 public ToUserDateTime(dtInput?:DateTime):DateTime{
  let IsDST:boolean = false;
  let  IsAmbiguous:boolean = false;
  let IsInvalid:boolean = false;
  dtInput = dtInput ? dtInput :(this as any as DateTime);
  return dtInput.ConvertToUser(_IsDST => {IsDST = _IsDST;},(_IsAmbiguous) => {IsAmbiguous = _IsAmbiguous;},( _IsInvalid) => {IsInvalid = _IsInvalid; });
 }
 public static AddDateAdjustment(dtInput:DateTime): DateTime
{//equivalent to non-static AddDateAdjustment
    var _t: DateTime = new DateTime(dtInput.Year, dtInput.Month, dtInput.Day, 0, 0, 0, DateTimeKind.Unspecified);
    let isDST=false;
    return _t.ConvertToLocal(isDST);
}
public static  AddDateTimeAdjustment(dtInput:DateTime , Minutes:number ):DateTime
{//equivalent to non-static AddDateTimeAdjustment
    let _t:DateTime = new DateTime(dtInput.Year, dtInput.Month, dtInput.Day, 0, 0, 0, DateTimeKind.Unspecified).AddMinutes(Minutes);
    let isDST=false;
    return _t.ConvertToLocal(isDST);
}
public  ToLocalDateTime (dtInput?:DateTime):DateTime
{
  let IsDST:boolean = false;
  dtInput = dtInput ? dtInput :(this as any as DateTime);
  return dtInput.ConvertToLocal(IsDST);
}
public IsDaylightSavingTime():boolean{
  //stub implemented method to be matched with kind
  return false;
}
public get Ticks(): number{
  //the implementation is right but the date should be UTC time format ending with Z
  const jsTicks = ((this as any as Date).getTime()) * 10000;
  // add 621355968000000000 to jsTicks
  // netTicks is number of ticks from midnight Jan 1, 01 CE
  let netTicks = jsTicks + timeDifference;
  return netTicks;
}
public AddTicks(ticks:number):DateTime{
  //stub working exactly fine but one second need if changes original tick of date.Datetime.ticks
  let dateTime = this as any as DateTime;
  let totalTicks = dateTime.Ticks+ticks;
  let totalMilliSeconds = (totalTicks - timeDifference)/10000;
  return new DateTime(totalMilliSeconds);
}
public get HasValue():boolean{
    //stub implemented
  let date = (this as any as Date);
  return date.toString() != 'Invalid Date' ? true : false;
 }
 public get Value():DateTime{
    //stub implemented
  let date = this as any as DateTime;
  return date;
 }
 public GetValueOrDefault(parameter?):DateTime{
  //stub implemented
  let date = this as any as DateTime;
  return date.toString() != 'Invalid Date' ? date : (parameter ?parameter : new DateTime());
 }

 public static readonly MinValue:DateTime = new DateTime("0001-01-01T00:00:00Z")
 public static readonly MaxValue:DateTime = new DateTime('9999-12-31T23:59:59');

 public static ToJsDate(date:string,dateFormat:string):Date{
  if(date && dateFormat){
    switch(dateFormat){
      case 'ddMMyyyy':{
       let dateArray = date.split('/');
    //   let jsDateString=dateArray[1]+dateArray[0]+dateArray[2];
       let jsDateString=dateArray[1]+'/'+dateArray[0]+'/'+dateArray[2];
       return new Date(jsDateString);
      }
      case 'ddMMyyyyHHmmss':{
        let dateArrayWithTime = date.split(' ');
        let dateWithoutTime = date[0];
        let dateArray = dateWithoutTime.split('/');
        let jsDateString=dateArray[1]+'/'+dateArray[0]+'/'+dateArray[2]+' '+dateArrayWithTime[1];
        return new Date(jsDateString);
       }
       case 'ddMMyyyyHHmmsswithhypen':{
        let dateArrayWithTime = date.split(' ');
        let dateWithoutTime = dateArrayWithTime[0];
        let dateArray = dateWithoutTime.split('-');
        let jsDateString=dateArray[1]+'-'+dateArray[0]+'-'+dateArray[2]+' '+dateArrayWithTime[1];
        return new Date(jsDateString);
       }
       case 'ddMMMyyyy':{
        return new Date(date);
       }
       default:{
        return new Date(date); //d
       }
    }
  }else{
    return new Date('0001-01-01T00:00:00Z');// datetime minvalue if date is null
  }
 }
  public ToShortTimeString(): string {
    let date = (this as any as Date);
    if (date.toString().Contains("Invalid")) {
      console.log("Error in DateTime.ToShortTimeString: Date is Invalid So returning empty string");
      return '';
    } else {
      let timeArray = (this as any as Date).toTimeString().split(":");
      return timeArray[0] + ":" + timeArray[1];
    }
  }
  public static FormatPattern={
    ShortDate:"dd/MM/yyyy",
ShortDateTime:"dd/MM/yyyy hh:mm tt",
ShortTime24hour:"HH:mm",
ShortTime24Hour:"HH:mm:ss",
ShortTime12hour:"hh:mm tt",
ShortTime12Hour:"hh:mm:ss tt",
LongDate:"dddd, MMMM dd, yyyy"
  }
  public static ParseDateTime=function(value,format)
  {
    if (typeof (value) == 'undefined' || typeof (format) == 'undefined') 
      return DateTime.MinValue;
    if (value.constructor.name =='Date') 
      return new DateTime(value);
    var dt = DateTime.MinValue;
    if (typeof (format) == 'undefined') format = "dd/MM/yyyy hh:mm tt";
    dt.Parse(value, format);
    if (dt.DateValue == null) return null;
    else{
    let datevalue = dt.DateValue;
    dt = new DateTime(dt.DateValue.getTime());
    dt.DateValue = datevalue;
    }
    return dt;
  }
  public DateValue = null;
  public Parse(value,format){    
    this.DateValue=null;
    if(typeof(value)=='string'&&typeof(format)=='string')
    this.DateValue=__dateHelper.StringToDate(value,format);
    return this.DateValue!=null;
  }
  public ToOADate(): number {
    let myDate = this as any as Date;
    var automationDate = (myDate.getTime() / 86400000) + 25569;
    var roundedAutomationDate = Math.round(automationDate * 100000) / 100000;
    return roundedAutomationDate;
  }
}

// hack !! for ES5
(DateTime.prototype as any).__proto__ = Date.prototype;

if (typeof window !== 'undefined') {
 (window as any).DateTime = DateTime;
}

export class DateTimeKind{
   // Summary:
       //     The time represented is not specified as either local time or Coordinated Universal
       //     Time (UTC).
       public static Unspecified = 0;
       //
       // Summary:
       //     The time represented is UTC.
       public static Utc = 1;
       //
       // Summary:
       //     The time represented is local time.
       public static Local = 2
}
export class DateFlag{
 constructor(){}
}

export enum DateTimeStyles
{
    //
    // Summary:
    //     Default formatting options must be used. This value represents the default style
    //     for System.DateTime.Parse(System.String), System.DateTime.ParseExact(System.String,System.String,System.IFormatProvider),
    //     and System.DateTime.TryParse(System.String,System.DateTime@).
    None = 0,
    //
    // Summary:
    //     Leading white-space characters must be ignored during parsing, except if they
    //     occur in the System.Globalization.DateTimeFormatInfo format patterns.
    AllowLeadingWhite = 1,
    //
    // Summary:
    //     Trailing white-space characters must be ignored during parsing, except if they
    //     occur in the System.Globalization.DateTimeFormatInfo format patterns.
    AllowTrailingWhite = 2,
    //
    // Summary:
    //     Extra white-space characters in the middle of the string must be ignored during
    //     parsing, except if they occur in the System.Globalization.DateTimeFormatInfo
    //     format patterns.
    AllowInnerWhite = 4,
    //
    // Summary:
    //     Extra white-space characters anywhere in the string must be ignored during parsing,
    //     except if they occur in the System.Globalization.DateTimeFormatInfo format patterns.
    //     This value is a combination of the System.Globalization.DateTimeStyles.AllowLeadingWhite,
    //     System.Globalization.DateTimeStyles.AllowTrailingWhite, and System.Globalization.DateTimeStyles.AllowInnerWhite
    //     values.
    AllowWhiteSpaces = 7,
    //
    // Summary:
    //     If the parsed string contains only the time and not the date, the parsing methods
    //     assume the Gregorian date with year = 1, month = 1, and day = 1. If this value
    //     is not used, the current date is assumed.
    NoCurrentDateDefault = 8,
    //
    // Summary:
    //     Date and time are returned as a Coordinated Universal Time (UTC). If the input
    //     string denotes a local time, through a time zone specifier or System.Globalization.DateTimeStyles.AssumeLocal,
    //     the date and time are converted from the local time to UTC. If the input string
    //     denotes a UTC time, through a time zone specifier or System.Globalization.DateTimeStyles.AssumeUniversal,
    //     no conversion occurs. If the input string does not denote a local or UTC time,
    //     no conversion occurs and the resulting System.DateTime.Kind property is System.DateTimeKind.Unspecified.
    AdjustToUniversal = 16,
    //
    // Summary:
    //     If no time zone is specified in the parsed string, the string is assumed to denote
    //     a local time.
    AssumeLocal = 32,
    //
    // Summary:
    //     If no time zone is specified in the parsed string, the string is assumed to denote
    //     a UTC.
    AssumeUniversal = 64,
    //
    // Summary:
    //     For parsing operations using System.DateTime methods on strings that contain
    //     time zone information, tries to prevent the conversion to a local System.DateTime
    //     value with its System.DateTime.Kind property set to System.DateTimeKind.Local.
    //     For System.DateTimeOffset values, this flag has no effect.
    RoundtripKind = 128
}
export enum FormatRegexPattern{
  ddMMyyyy = "^(3[01]|0[1-9]|[12][0-9])\/(1[0-2]|0[1-9])\/(-?(?:[1-9][0-9]*)?[0-9]{4})",//22/07/2023
  ddMMyyyyHHmmss = "^(3[01]|0[1-9]|[12][0-9])\/(1[0-2]|0[1-9])\/(-?(?:[1-9][0-9]*)?[0-9]{4}) (2[0-3]|[01][0-9]):([0-5][0-9]):([0-5][0-9])(.[0-9]+)?(Z)?$",
  ddMMMyyyy= "^(3[01]|0[1-9]|[12][0-9])-(?:Jan|Feb|...|Dec)-(-?(?:[1-9][0-9]*)?[0-9]{4})",//22-Dec-2023
  HHmm="^(2[0-3]|[01][0-9]):([0-5][0-9])?$",//09:23
  Hmm="^([0-9]):([0-5][0-9])?$",//9:23
  MMMddyyyyHHmma = "^((Jan|Feb|...|Dec) (3[01]|0[1-9]|[12][0-9]) (-?(?:[1-9][0-9]*)?[0-9]{4}) (2[0-3]|[01][0-9]):([0-5][0-9])(AM|PM))", //Jan 04 2023 04:05AM
  MMMddyyyyHHmmaWithSpace = "^((Jan|Feb|...|Dec) (3[01]|( )[1-9]|[12][0-9]) (-?(?:[1-9][0-9]*)?[0-9]{4}) (2[0-3]|[1| ][0-9]):([0-5][0-9])(AM|PM))", //Jan  4 2023  4:05AM
  ddMMyyyyHHmmsswithhypen = "^(3[01]|0[1-9]|[12][0-9])-(1[0-2]|0[1-9])-(-?(?:[1-9][0-9]*)?[0-9]{4}) (2[0-3]|[01][0-9]):([0-5][0-9]):([0-5][0-9])(.[0-9]+)?(Z)?$",
}


