interface Boolean {
    Equals(str: boolean): boolean;
    HasValue;
    Value;
    GetValueOrDefault(parameter?);
    ToString();
}
/* Boolean.prototype.Equals = function (value: boolean) {
     var s: boolean = Boolean(this);
     return s == value;
}*/
Object.defineProperty(Boolean.prototype, "Equals", {
    value: function Equals(value: boolean) {
        var s: boolean = Boolean(this);
        return s == value;
    },
    writable: true,
    configurable: true,
});
Boolean.prototype.HasValue = function () {
    var s: boolean = Boolean(this);
    return !!s;  
}
// function getBooleanValue(obj){
//     var s: boolean = Boolean(obj)
//     return s;
// }
// Boolean.prototype.Value =  getBooleanValue(this);
Boolean.prototype['__defineGetter__']("Value", function (this:any) {
    var s: boolean = Boolean(this)
    return s;
});
Boolean.prototype.GetValueOrDefault = function(parameter?){
    var s: boolean = Boolean(this);
    return s ? s :(parameter ? parameter :"");  
}
/* Boolean.prototype.ToString = function(){
    var s: boolean = Boolean(this);
    if(s == true){
     return "True";
    }else if(s == false){
     return "False";
    }else{
     return (s as any as string).toString();
    }
}*/

Object.defineProperty(Boolean.prototype, "ToString", {
    value: function ToString() {
        var s: boolean = Boolean(this);
        if (s == true) {
            return "True";
        } else if (s == false) {
            return "False";
        } else {
            return (s as any as string).toString();
        }
    },
    writable: true,
    configurable: true,
});
interface BooleanConstructor{
    Parse(param:string):boolean;
}
Boolean.Parse = (value:string) =>{
    if(value == null){
        throw new Error('ArgumentNullException');
    }
    if(value == 'true'){
        return true;
    }else if(value == 'false'){
        return false;
    }else{
        throw new Error('InvalidOperationException');
    }
}