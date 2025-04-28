import { find, map } from 'lodash';
import { IEnumerable } from './ienumerable';

interface IDictionary<K,T> {
  Add(key: string, value: T): void;
  Remove(key: string): void;
  ContainsKey(key: string): boolean;
  Keys(): string[];
  Values(): T[];
}

export class Dictionary<K,T> implements IDictionary<K,T> { 
  _keys: string[] = [];
  _values: T[] = [];

  constructor(init?: { key: string; value: T }[]) {
    if (init) {
      for (var x = 0; x < init.length; x++) {
        this[init[x].key] = init[x].value;
        this._keys.push(init[x].key);
        this._values.push(init[x].value);
      }
    }
  }

  Add(key: string, value: T) {
    this[key] = value;
    this._keys.push(key);
    this._values.push(value);
  }

  Remove(key: string) {
    var index = this._keys.indexOf(key, 0);
    this._keys.splice(index, 1);
    this._values.splice(index, 1);

    delete this[key];
  }

  Keys(): string[] {
    return this._keys;
  }

  Values(): T[] {
    return this._values;
  }
  GetKeyValuePair(sKey: string): KeyValuePair<string, T> {
    let kvp: KeyValuePair<string, T> = new KeyValuePair<string, T>();
    kvp.SetKeyValue(sKey, this[sKey]);
    return kvp;
  }
  ContainsKey(key: string) {
    if (typeof this[key] === 'undefined') {
      return false;
    }

    return true;
  }

  toLookup(): IDictionary<K,T> {
    return this;
  }
  ToLookup(): KeyValuePair<string, T>[] {
    let result: KeyValuePair<string, T>[] = [];
    for (let i = 0; i < this._keys.length; i++) {
      let kvp: KeyValuePair<string, T> = new KeyValuePair<string, T>();
      kvp.SetKeyValue(this._keys[i], this._values[i]);
      result.push(kvp);
    }
    return result;
  }
  TryGetValue( key: K | any,out: (o: T) => void):boolean{
    if(key == null){
      throw new Error("ArgumentNullException")
    }else{
      out(this[key]);
      return this[key] ? true :false;
    }
  }
  Count(){
    return this._keys.length;
  }
   forEach(callbackfn: (value: KeyValuePair<K,T>, index?: number, array?: T[]) => void, thisArgs?: any) {
    //need confirmation if the foreach is correct
    let result: any[] = [];
    for (let i = 0; i < this._keys.length; i++){
      result.push({Key:this._keys[i],Value:this._values[i]});
    }
    result.forEach(callbackfn, thisArgs);
  }
  private getKeyValuePairArray(){
    let result: any[] = [];
    for (let i = 0; i < this._keys.length; i++) {
      result.push({ Key: this._keys[i], Value: this._values[i] });
    }
    return result;
  }
public FirstOrDefault<T=unknown>(predicate?:Function) :any{
  let result = this.getKeyValuePairArray();
  if(result.Count() > 0 && predicate && typeof predicate == 'function'){
    let keyValuePair =  find(result, predicate);
    if(keyValuePair){
      return keyValuePair;
    }
    else{
      return undefined;
    }  
  }
  else if (result.Count() > 0) {
      return result[0];
  }else {   
      return 0; 
  }
}
public Any(predicate?: (value: any, index?: number, array?: any[]) => void) :boolean{ 
  let result = this.getKeyValuePairArray();
    if (predicate && typeof predicate == "function" ) {
      return result.some(predicate);
  } else {
      return (result && result.length) ? true : false;
  }
}
  public Select(predicate: Function) {
    let result = this.getKeyValuePairArray();
    let newArray = map(result, predicate);
    let returnValue: IEnumerable<any> = new IEnumerable<any>(newArray);
    return returnValue;
  }

  First(predicate?: (value: KeyValuePair<K, T>, index?: number, array?: T[]) => void): KeyValuePair<K, T> {
    let result = this.getKeyValuePairArray();
    if(predicate && typeof predicate == "function" ){
      return find(result, predicate);
    }
    else if (result.length > 0) {
      return result[0];
    } else {
      throw new Error('SourceNullException');
    }
  }
  public ContainsValue(searchVal: T): boolean {
    let value = find(this._values, x => x == searchVal);
    if (value) {
      return true;
    } else
      return false;
  }
  public Clear() {
    this.forEach(element => {
      delete this[element.Key.toString()];
    });
    this._keys = [];
    this._values = [];
  }
}
export class KeyValuePair<T, U> {
   public Key!: T;
   public Value!: U;
   constructor(key?:T,value?:U){
    this.Key = key;
    this.Value = value;
   }
  SetKeyValue(key: T, val: U): void {
    this.Key = key;
    this.Value = val;
  }
  GetKeyValue() {
    return { key: this.Key, value: this.Value };
  }
  Display(): void {
    console.log(`Key = ${this.Key}, val = ${this.Value}`);
  }
}
