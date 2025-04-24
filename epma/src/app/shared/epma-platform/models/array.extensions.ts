declare var Array: ArrayConstructor;

interface Array<T>{
    Count();
    Contains(param:string);
    First():any;
    FirstOrDefault():any;
    ToList();
    Length;
    Any(predicate: (value: T, index?: number, array?: T[]) => void);
    Select(callbackfn: (value: T, index: number, array: T[]) => any, thisArg?: any);
    Where(callbackfn: (value: T, index: number, array: T[]) => any, thisArg?: any);
    OrderBy(callbackfn: (value: T, index: number, array: T[]) => any, thisArg?: any);
    All(callbackfn: (value: T, index: number, array: T[]) => any, thisArg?: any);
    Clone();
    SetValue(object: any, index: number): void;
}

Array.prototype.Count = function():any {
    let array = (this) as Array<any>;
    if(array == null){
        throw new Error("ArgumentNullException")
    }
    if(array && array.length > 2147483647 ){
        throw new Error("OverflowException")
    }
    return array.length;
}
Array.prototype.Contains = function(param:string) {
    let array = (this) as Array<any>;
    if(array){
        if(array.length > 0)
        {
            if(typeof array[0] == 'object' && array.find(y => JSON.stringify(y)==JSON.stringify(param))){
                return true;
            }else{
                return array.includes(param);
            }
        }
        else{
            return false;
        }
    }else{
        throw new Error('ArgumentNullException');
    }
}
Array.prototype.First = function():any{
    let array = (this) as Array<any>;
    if(array && array.length > 0){
        return array[0];
    }else{
        return undefined;
    }
}
Array.prototype.FirstOrDefault = function():any{
    let array = (this) as Array<any>;
    if(array && array.length > 0){
        return array[0];
    }else{
        return '';
    }
}
Array.prototype.All = function(predicate: (value: any, index?: number, array?: any[]) => void) :boolean{ 
    let array = (this) as Array<any>;
    return array.some(predicate);
}
Array.prototype.ToList = function():any{
    let array = (this) as Array<any>;
    let list = new TSClasses['List'](array);
    return list;
}

Array.prototype['__defineGetter__']("Length", function (this:any) {
    let array = (this) as Array<any>;
    return array.length;
  });

Array.prototype.Any = function(predicate: (value: any, index?: number, array?: any[]) => void) :boolean{ 
    let array = (this) as Array<any>;
    return array.some(predicate);
}
Array.prototype.Select= function(callbackfn: (value: any, index: number, array: any[]) => any, thisArg?: any) {
      //stub enumerable implemented like class
    let array = (this) as Array<any>;
    let newArray =  array.map(callbackfn);
    let enumerable = new TSClasses['IEnumerable'](newArray);
    return enumerable;
}
Array.prototype.Where= function(callbackfn: (value: any, index: number, array: any[]) => any, thisArg?: any) { 
   //stub enumerable implemented like class
    let array = (this) as Array<any>;
    let newArray =  array.filter(callbackfn);
    let enumerable = new TSClasses['IEnumerable'](newArray);
    return enumerable;
}
Array.prototype.OrderBy = function(callbackfn: (value: any, index: number, array: any[]) => any, thisArg?: any){
      //stub enumerable implemented like class
    let array = (this) as Array<any>;
    let enumerable = new TSClasses['IEnumerable'](array);
    return enumerable.OrderBy(callbackfn);
}
Array.prototype.Clone = function():any {
    //creates a shallow copy of the array
    let array = (this) as Array<any>;
    return [...array];
}
Array.prototype.SetValue = function (object: any, index: number): void {
    let array = (this) as Array<any>;
    if (index > array.length) {
        throw new Error('IndexOutOfRangeException');
    }
    array[0][index] = object;
}
interface ArrayConstructor {
    ToList(arg): any[];
    IndexOf<T = unknown>(array: Array<T>, element?:T);
    Resize<G = unknown>(array: any, length: number);
    CreateInstance(type, newlength: number);
    Clear(array:Array<any>,  index:number,  length:number);
}

Array.ToList = function (arg): any[] {
    let array = arg.map(value => value);
    let list = new TSClasses['List'](array);
    return list;
}
Array.IndexOf = function <T = unknown>(array:Array<T>, element:T): number {
 if(array ==  null){
        throw new Error('ArgumentNullException');
    }
    if (Array.isArray(array) && !(array.every(entry => !Array.isArray(entry)))) {
        throw new Error('RankException')
    } 
    if(element && typeof element == 'object'){
        return array.findIndex((elem: any) => JSON.stringify(elem) == JSON.stringify(element));
    }
    return array.findIndex((elem: any) => elem == element);
}
Array.Resize = function<G = unknown>(array, newlength: number): any[] {
    //resize the array to new size
    let newArray = [];
    if (newlength < 0) {
        throw new Error('ArgumentOutOfRangeException');
    }
    if (array == null) {
        for (let i = 0; i < newlength; i++) {
            newArray.push(0);
        }
        return newArray;
    }
    let existingArrayLength = array.length;
    if (existingArrayLength < newlength) {
        for (let i = 0; i < newlength; i++) {
            newArray.push(array[i]);
        }
        return newArray;
    } else {
        let differenceLength = newlength - array.length;
        for (let i = 0; i < differenceLength; i++) {
            newArray.push(0);
        }
        return newArray;
    }
}
Array.CreateInstance = function (type, length: number): any[] {
   // type G = typeof type;
    let array= [{}];

    for (let i = 0; i < length; i++) {
        array[0][i] = {};
    }
    return array;
}
Array.Clear = function(array:Array<any>,  index:number,  length:number):void{
    if(array == null){
        throw new Error('ArgumentNullException');
    }
    if(index< 0 || index< array.length || index+length > array.length){
        throw new Error('IndexOutOfRangeException');
    }
    if(array && array.length>0){
        let defaultvalue:any = 
        (typeof array[0] == 'number') ? 0 :
        ((typeof array[0] == 'boolean') ? false : '')

        for(let i = index ; i< length ; i++){
            array[i] = defaultvalue;
        }
    }
}
