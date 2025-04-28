
interface Number{
    Equals(param:number):boolean;
    Contains(param:number):boolean;
    ToString(format?:string):string;
    HasValue;
    Value;
    GetValueOrDefault(parameter?);
}
/*Number.prototype.Equals = function(param:number){
    let param1 = this as Number;
    return param === param1;
}*/
Object.defineProperty(Number.prototype, "Equals", {
    value: function Equals(value: number) {
        let param1 = this as Number;
        return value === param1;
    },
    writable: true,
    configurable: true,
});
Number.prototype.Contains = function(param:number):any{
    let param1 = this as Number;
    if(param1 != 0 && (param1 == undefined || param1 == null)){
        throw new Error('ArgumentNullException');
    }
    return param && param1.toString().includes(param.toString()) ? true :false;
}
/* Number.prototype.ToString = function (format?: string): string {
     //need to check implementation
     let param1 = this as Number;
     return (format && format == '00' && param1.toString().length == 1) ? '0' + param1.toString() : param1.toString();
}*/
Object.defineProperty(Number.prototype, "ToString", {
    value: function ToString(format?: string) {
        let param1 = this as Number;
        return (format && format == '00' && param1.toString().length == 1) ? '0' + param1.toString() : param1.toString();
    },
    writable: true,
    configurable: true,
});
Number.prototype.HasValue = function(){
    var s: number = Number(this);
    return !!s;  
}
Number.prototype['__defineGetter__']("Value", function (this:any) {
    var s: number = Number(this)
    return s;
});
Number.prototype.GetValueOrDefault = function(parameter?){
    var s: number = Number(this);
    return s ? s :(parameter ? parameter :"");  
}
interface NumberConstructor {
    TryParse(arg: string, out: (o: number) => void): boolean ;
    Parse(s: string,param2?:string): number,
    MaxValue,
    MinValue
}
declare var Number :NumberConstructor;

Number.MaxValue = 0
Number.MinValue = 0;
Number.TryParse = function(arg: string, out: (o: number) => void): boolean {
    if (isNaN(Number(arg))) { 
        out(0); return false; 
    } else { 
        out(Number(arg)); return true; 
    }
}
Number.Parse = function(s: string,param2?:string): number {
    let result = Number(s);
    return isNaN(result)? 0 : result ;
}
