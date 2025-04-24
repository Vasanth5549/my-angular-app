interface String {
    Equals(str: string, comparisonType?:StringComparison): boolean;
    ToUpper(): string;
    ToLower(): string;
    Count(): number;
    Trim(param?:string,...params:string[]): string;
    Split(pattern: string| string[], param2?:string|StringSplitOptions,param3?:StringSplitOptions): string[];
    Contains(param: string): boolean;
    Replace(replaceText:string, newText:string): string;
    Substring(start:number,end?:number) :string;
    StartsWith(param:string,comparisonType?: StringComparison);
    Remove(startIndex:number,endIndex?:number);
    EndsWith(param:string,comparisonType?: StringComparison);
    IndexOf(param:string):number;
    TrimEnd(params?:string[] | string):string;
    TrimStart(params?:string[] | string):string;
    LastIndexOf(value:string):number;
    ToLowerInvariant():string;
    HasValue;
    Value;
    GetValueOrDefault(parameter?);
    ToCharArray(): string[];
    ToString(): string;    
    Where(callbackfn: (value: string, index: number, array: string[]) => any, thisArg?: any);
    Insert(startIndex:number,value:string):string;
}

String.prototype.ToString = function (): string {
    var s: string = String(this);
    return s.toString();
}

String.prototype.Equals = function (value: string,comparisonType?:StringComparison):boolean{
    var s: string = String(this);
    if(comparisonType){
        return getStringComparison(s, value, comparisonType)
    }
    return s.toString() == value;
}
String.prototype.ToUpper = function ():string{
    var s: string = String(this);
    return s.toString().toUpperCase();
}
String.prototype.ToLower = function ():string{
    var s: string = String(this);
    return s.toString().toLowerCase();
}
String.prototype.Count = function ():number{
    var s: string = String(this);
    return s.toString().length;
}

String.prototype.Trim = function (param?: string, ...params:string[]):string{
    var s: string = String(this);
    if(!param && params.length == 0){
        return s.toString().trim();
    }
    else if(typeof param == 'string' && !params){
       if(param.includes(s.toString().charAt(0))){
        s = s.toString().slice(1);
       }
       if(param.includes(s.charAt(s.length-1))){
        s = s.toString().substring(0,s.length-1);
       }
       return s;
    }
   else{
    
    while([...params,param].includes(s.toString().charAt(0))){
       s = s.toString().slice(1)
    }
    while([...params,param].includes(s.toString().charAt(s.toString().length-1))){
       s = s.toString().substring(0,s.length-1);
     }
    return s;
   }
  
}

    String.prototype.Split = function (pattern: string| string[],param2?:string|StringSplitOptions,param3?:StringSplitOptions){
        let patternString: string =  pattern && Array.isArray(pattern) ?  pattern.toString() : (typeof pattern == 'string' ? pattern : "");
        var s: string = String(this);
        let splitedArray  = s.toString().split(patternString);
        let patternString2 = typeof param2 == 'string' ? param2 :'' ;
        if(patternString2){
                let splittedArray1 = [...splitedArray];
                splitedArray=[];
                splittedArray1.forEach(item => {
                splitedArray = item.split(patternString2)
            })
            return (param3 && param3 == StringSplitOptions.RemoveEmptyEntries) ?
            splitedArray.filter(item => item != null && item != ' ' && item != '' && item != undefined) :
            splitedArray ;
        }else{
            return (param2 && param2 == StringSplitOptions.RemoveEmptyEntries) ?
            splitedArray.filter(item => item != null && item != ' ' && item != '' && item != undefined) :
            splitedArray ;
        }
    }
String.prototype.Contains = function (param: string):boolean{
    var s: string = String(this);
    return s.toString().includes(param);
}
String.prototype.Replace = function (replaceText: string, newText: string):string{
    var s: string = String(this);
    return s.toString().replaceAll(replaceText, newText);
}
String.prototype.Substring = function(start:number,end:number):string{
    var s: string = String(this);
    return end ? s.toString().substring(start,end) : s.toString().substring(start);
}
String.prototype.StartsWith = function(param:string,comparisonType?: StringComparison):boolean {
    var s: string = String(this);
    if(!comparisonType){
        return  s.toString().startsWith(param);
    }
    switch(comparisonType){
        case 1:
        case 3:
        case 5:{
           return s.toString().toLowerCase().startsWith(param.toLowerCase());
        }
     //   case 0: throws error need to check why
        case 2:
        case 4:{
            return s.toString().startsWith(param);
        }
        default:
            throw new Error();
    }
}
String.prototype.Remove = function(startIndex:number,endIndex?:number) {
    var s: string = String(this);
    return endIndex ? s.toString().substring(0,startIndex)+s.toString().substring(startIndex+endIndex,s.toString().length): s.toString().substring(0,startIndex);
}
String.prototype.EndsWith = function(param:string,comparisonType?: StringComparison):boolean {
    var s: string = String(this);
    return s.toString().endsWith(param);
}
String.prototype.IndexOf = function(str:string):number {
    var s: string = String(this);
    if(str !== null){
        return s.toString().indexOf(str);
    }else{
        throw new Error("ArgumentNullException");
    }
}
String.prototype.TrimEnd = function (params?: string[] | string):string{
    params = typeof params == 'string' ? [params] : params;
    var s: string = String(this);
    if(!params){
        return s.toString().trimEnd();
    }else{
        while(params.includes(s.toString().charAt(s.length-1))){
            s = s.toString().substring(0,s.length-1);
          }
          return s;
    }  
}
String.prototype.TrimStart = function (params?: string[] | string):string{
    params = typeof params == 'string' ? [params] : params;
    var s: string = String(this);
    if(!params){
        return s.toString().trimStart();
    }else{
        while([...params].includes(s.toString().charAt(0))){
            s = s.toString().slice(1)
         }
          return s;
    }  
}
String.prototype.LastIndexOf = function (value:string):number{
    if(!value){
        throw new Error('ArgumentNullException')
    }else{
        var s: string = String(this);
        return s.toString().indexOf(value);
    }
}
String.prototype.ToLowerInvariant = function ():string{
    var s: string = String(this);
    return s.toString().toLowerCase();
}
String.prototype.HasValue = function(){
    var s: string = String(this);
    return !!s;  
}
String.prototype['__defineGetter__']("Value", function (this:any) {
    var s: string = String(this)
    return s;
});
String.prototype.GetValueOrDefault = function(parameter?){
    var s: string = String(this);
    return s ? s :(parameter ? parameter :"");  
}
String.prototype.ToCharArray = function():string[]{
    var s: string = String(this);
    return s ? s.toString().split('') : [];
}
String.prototype.Where= function(callbackfn: (value: any, index: number, array: any[]) => any, thisArg?: any) { 
    //stub enumerable implemented like class
     let s = (this) as String;
     let newArray =  s.toString().split('').filter(callbackfn);
     let enumerable = new TSClasses['IEnumerable'](newArray);
     return enumerable;
 }
 String.prototype.Insert=function(startIndex:number,value:string):string{
    let s = (this) as String;
    if(value == null ){
        throw new Error("ArgumentNullException");
    }
    if(startIndex < 0 || startIndex>(s.length-1)){
        throw new Error("ArgumentOutOfRangeException");
    }
    
    return s.substring(0,startIndex)+value+s.substring(startIndex);
 }
/* Length to be implemented. currently below code returns wrong value*/
//String.prototype.Length = String(this).length;

enum StringComparison {
    CurrentCulture = 0,
    CurrentCultureIgnoreCase = 1,
    InvariantCulture = 2,
    InvariantCultureIgnoreCase = 3,
    Ordinal = 4,
    OrdinalIgnoreCase = 5
}

interface StringConstructor {
    IsNullOrEmpty(str: string | undefined | null): boolean;
    Compare(arg1: string, arg2?: string, param?: StringComparison): number;
    Equals(s1: string|any, s2: string|any, param?: StringComparison): boolean;
    Split(name: string, param: string): string[];
    Format(format: string, ...args: any);
    Empty: string;
    Join(separator: string, params: string[] | number[]): string;
    Concat(...params: string[] |number[] |any[]): string;
    IsNullOrWhiteSpace(str: string | undefined | null): boolean;
    MinValue;
    MaxValue;
    IsLetter(c:string):boolean;
}

declare var String: StringConstructor;


String.IsNullOrEmpty = (str: string) => {
    if(str === null || str === "" || str === undefined)
    return true;
    else
    return false;
}
String.Compare = (argument1: string|number, argument2: string|number, param?: StringComparison) => {
    let arg1 = typeof argument1 == 'number' ? String(argument1) :argument1;
    let arg2 =  typeof argument2 == 'number' ? String(argument2) :argument2;
    if (!arg1 || !arg2) return -1;
    if(param){
         switch(param){
            case 1: {
                arg1 = arg1.toLowerCase();
                arg2 = arg2.toLowerCase();
            break;
            }
            case 3: {
                arg1 = arg1.toLowerCase();
                arg2 = arg2.toLowerCase();
                break
            }
            case 4: {
                break;
            }
            default:
                arg1 = arg1.toLowerCase();
                arg2 = arg2.toLowerCase();
                break
         }
    }
    if (arg1.length < arg2.length) {
        return -1;
    } 
    else if (arg1.length > arg2.length) {
        return -1;
    } 
    else if (arg1 === arg2) {
        return 0;
    } else {
        return -1;
    }
}
String.Equals = function (s1: string|any, s2: string|any, param?: StringComparison): boolean {
    if (s1 == undefined && s2==undefined) return true;
    if (s1 == undefined || s2==undefined) return false;
    let sr = s1.ToString();
    let sv = s2.ToString()
    if(param ){
        return getStringComparison(sr, sv, param)
    }
    return sr.toLowerCase() == sv.toLowerCase();
};
String.Split = function (name: string, param: string): string[] {
    return name.split(param);
}
String.Format = (format: string, ...args: any):any => {
    if(!format || !args){
        throw new Error('ArgumentNullException')
    }
    if(args && args.length > 0){
        let length = args.length;
        for(let i =0;i< length;i++){
            let replaceText = '{'+i+'}';
            if(format.includes(replaceText)){
                format= format.replace(('{'+i+'}'),args[i]);
            }
        }
    }
    return format;
}
String.Empty = "";
String.MinValue = "\0";
String.MaxValue = "";// to be implemented
String.Join = (separator: string, params: string[]) => {
  
    return params.join(separator);
}
String.Concat = (...params: string[] | number[]| any[]):any => {
    if (params && params.length ) {
        return params.join('');
    }else{
        throw new Error();
    }
   
}
String.IsNullOrWhiteSpace = (str: string) => {
    return !str.trim();
}
String.IsLetter = (c:string):boolean => {
    //completed
    let regex = '[A-Za-z]';
    return (c.match(regex) && c.length == 1) ? true : false;
     
};


function getStringComparison(s1:string,s2:string, param:StringComparison){
    switch (param) {
        case 1: {
            return s1.toLowerCase() === s2.toLowerCase();
        }
        case 3: {
            return s1.toLowerCase() === s2.toLowerCase();
        }
        case 4: {
            return s1 === s2;
        }
        default:
            return s1.toLowerCase() == s2.toLowerCase();
    }
}

     enum StringSplitOptions
    {
        //
        // Summary:
        //     The return value includes array elements that contain an empty string
        None = 0,
        //
        // Summary:
        //     The return value does not include array elements that contain an empty string
        RemoveEmptyEntries = 1
    }

