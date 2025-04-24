import DateTime from "epma-platform/DateTime";
import { DataConversionService } from "../services/data-conversion.service";
import { List } from "./list";
import * as _ from 'lodash';

export class IOrderedEnumerable<T = unknown>{

    private array1: T[] = [];
    private sortOrder: Function;
    private order: string[] = ['asc'];
    constructor();
    constructor(value?: Array<T>)
    constructor(value?: Array<T>) {
        if (value == null)
            this.array1 = [];
        else {
            this.array1 = value;
            for (let i = 0; i < value.length; i++) {
                this[i] = value[i];
            }
        }
    }
    First(){
        if (this.array1.length > 0) {
            return this.array1[0]
        } else {
            return null; // not correct implementation has to return default
        }        
    }
    public Select(callbackfn: (value: T, index: number, array: IEnumerable<any>) => void): IEnumerable<any> {
        //Implementation pending (y => y.First().datetime) or (y => y.FirstOrDefault())

        let newArray = _.map(this.array1, callbackfn);
        let returnValue: IEnumerable<any> = new IEnumerable<any>(newArray);
        return returnValue;
    }
    /* order ienumerable*/
    public OrderBy(predicate: Function) {
        let newArray = _.orderBy(this.array1, predicate, ['asc'])
        let returnValue: IOrderedEnumerable<T> = new IOrderedEnumerable<T>(newArray);
        returnValue.setSortOrder(predicate, ['asc']);
        return returnValue;
    }
    // public ThenBy(predicate: Function) {
    //     return  (this.sortOrder) ?
    //     _.orderBy(this.array1, [this.sortOrder,predicate], [this.order[0],'asc']) : 
    //     _.orderBy(this.array1, predicate, ['asc']);
    //    // return this.array;
    // }
    public ThenBy(predicate: Function) {
        let newArray = this.sortOrder
            ? _.orderBy(
                this.array1,
                [this.sortOrder, predicate],
                [this.order[0], 'asc']
            )
            : _.orderBy(this.array1, predicate, ['asc']);

        let returnValue: IOrderedEnumerable<T> = new IOrderedEnumerable<T>(
            newArray
        );
        return returnValue;
    }
    public ThenByDescending(predicate: Function) {
        let newArray = this.sortOrder
            ? _.orderBy(
                this.array1,
                [this.sortOrder, predicate],
                [this.order[0], 'desc']
            )
            : _.orderBy(this.array1, predicate, ['desc']);

        let returnValue: IOrderedEnumerable<T> = new IOrderedEnumerable<T>(
            newArray
        );
        return returnValue;
    }
    public setSortOrder(predicate: Function, order) {
        this.sortOrder = predicate;
        this.order = order;
    }
    public Count() {
        return this.array1.length;
    }
    public ToList<G = unknown>() {
        let list: List<T> = new List<T>(this.array1);
        return list;
    }
    public FirstOrDefault<G = unknown>(predicate?: Function): any {
        if (this.array1.length > 0) {
            return this.array1[0]
        } else if (typeof predicate == 'function') {
            return _.find(this.array1, predicate);
        } else {
            return null; // not correct implementation has to return default
        }
    }
    public get array() {
        return this.array1;
    }
    public ToArray() {
        return this.array1;
    }
    public ForEach(callbackfn: (value: T, index?: number, array?: T[]) => void, thisArgs?: any) {
        this.array1.forEach(callbackfn, thisArgs);
    }
    public forEach(callbackfn: (value: T, index?: number, array?: T[]) => void, thisArgs?: any) {
        this.array1.forEach(callbackfn, thisArgs);
    }
    public GroupBy(predicate: Function): IEnumerable<any> {
        let groupByObject = _.groupBy(this.array1, predicate);
        let array: IGrouping<any, T>[] = [];
        //{ 10: [value], 20:[value]}
        // [{key:'10',value:[value]}]
        for (let item in groupByObject) {
            if (typeof groupByObject[item] != 'function') {
                let Grouping: IGrouping<any, T> = new IGrouping<any, T>(item, groupByObject[item]);
                array.push(Grouping);
            }
        }
        let returnValue: IEnumerable<any> = new IEnumerable<IGrouping<any, T>>(array);
        return returnValue;
    }
    public LastOrDefault(): any {
        if (this.array1.length > 0) {
            return this.array1[this.array1.length - 1]
        } else {
            return ''; // not correct implementation has to return default
        }
    }
    //STUB code create to support Min with predicate as in Max. Platform will implement in the right way Bug #35770
    public Min1() {
        let min = this.array1[0];
        for (let item of this.array1) {
            if (item < min) {
                min = item;
            }
        }
        return min;
    }
    public Min<T=unknown>(predicate?: Function){
        if(predicate && predicate instanceof Function){
            let min = _.minBy(this.array1, predicate);
            return min;
        }
        else
            return this.Min1();
    }
    public Max(selector: (item: T) => any) {
        if (this.array1.length === 0) {
            throw new Error('SourceNullException');
        }
    
        let max = selector(this.array1[0]);
    
        for (let i = 1; i < this.array1.length; i++) {
          const value = selector(this.array1[i]);
          if (value > max) {
            max = value;
          }
        }
    
        return max;
      }
    public Contains(item) {
        let returnedItem;
        if (item instanceof DateTime) {
            let parsedDate = JSON.stringify(item).split(".")[0];
            returnedItem = this.array1.find((elem: any) => {
                let parsedElement = JSON.stringify(elem).split(".");
                return parsedElement[0] == parsedDate
            });
        }
        else if (typeof (item) == 'object') {
            // let parsedItem = DataConversionService.circularObjectStrigify(item);
            // returnedItem = this.array1.find((elem: any) => (               
            //     DataConversionService.circularObjectStrigify(elem) == parsedItem
            // ));
            returnedItem = this.array1.find((elem: any) => {
                return _.isEqual(item, elem)
            });
        }
        else {
            returnedItem = this.array1.find((elem: any) => elem == item);
        }
        return (returnedItem) ? true : false;
    }
    public Last() {
        if (this.array1.length > 0) {
            return this.array1[length - 1];
        } else {
            throw new Error('SourceNullException');
        }
    }
    public AsEnumerable(source?: IEnumerable): IEnumerable<any> {
        if (source)
            return source;
        else {
            let returnValue: IEnumerable<T> = new IEnumerable<T>(this.array1);
            return returnValue;
        }
    }
    public Union(param: IEnumerable<T>): IEnumerable<T> {
        if (this.array1 == null || param == null || param.ToArray() == null) {
            throw new Error('ArgumentNullException');
        }
        let first = this.array1;
        let second = param.ToArray();
        let firstType = first && first.length > 0 ? typeof first[0] : '';
        let secondType = second && second.length > 0 ? typeof second[0] : '';

        if (firstType == 'object') {
            let array1 = first.filter((value, index) => {
                const _value = JSON.stringify(value);
                return index === second.findIndex(obj => {
                    return JSON.stringify(obj) === _value;
                });
            });
            let array2 = param.ToArray().filter((value, index) => {
                const _value = JSON.stringify(value);
                return index === param.ToArray().findIndex(obj => {
                    return JSON.stringify(obj) === _value;
                });
            });
            // let array2 = param.ToArray().filter((value, index) => param.ToArray().indexOf(value) === index);
            array1 = array1.concat(array2);
            let uniqueArr = array1.filter((value, index) => {
                const _value = JSON.stringify(value);
                return index === array1.findIndex(obj => {
                    return JSON.stringify(obj) === _value;
                });
            });
            let returnValue: IEnumerable<T> = new IEnumerable<T>(uniqueArr);
            return returnValue;
        } else {
            let array1 = first.filter((value, index) => first.indexOf(value) === index);
            let array2 = second.filter((value, index) => second.indexOf(value) === index);
            array1 = array1.concat(array2);
            let uniqueArr = array1.filter((value, index) => array1.indexOf(value) === index);
            let returnValue: IEnumerable<T> = new IEnumerable<T>(uniqueArr);
            return returnValue;
        }


        // Or
        // let array11 = [...new Set(this.arr)];
        // let array22 = [...new Set(param.ToArray())];
        // array11 = [...array11, ...array22]
        // let uniqueArr1 = [...new Set(array11)];
    }
    public Where(predicate: Function) {
        let newArray = _.filter(this.array1, predicate);
        let returnValue: IEnumerable<any> = new IEnumerable<any>(newArray);
        return returnValue;
    }
}
export class IEnumerable<T = unknown> extends IOrderedEnumerable<T>{
    private arr: T[] = [];
    constructor();
    constructor(value?: Array<T>)
    constructor(value?: Array<T>) {
        super(value);
        if (value == null)
            this.arr = [];
        else
            this.arr = value;
    }
    public override forEach(callbackfn: (value: T, index?: number, array?: T[]) => void, thisArgs?: any) {
        this.arr.forEach(callbackfn, thisArgs);
    }
    public override ForEach(callbackfn: (value: T, index?: number, array?: T[]) => void, thisArgs?: any) {
        this.arr.forEach(callbackfn, thisArgs);
    }
    public override FirstOrDefault<G = unknown>(predicate?: Function): any {
        if (this.arr.length > 0) {
            return this.arr[0]
        } else if (typeof predicate == 'function') {
            return _.find(this.arr, predicate);
        } else {
            return null; // not correct implementation has to return default
        }
    }
    public override ToList<G = unknown>() {
        let list: List<T> = new List<T>(this.arr);
        return list;
    }
    public Except(list: IEnumerable<any>) {
        let newArray = _.difference(this.arr, list.arr);
        let returnValue: IEnumerable<any> = new IEnumerable<any>(newArray);
        return returnValue;
    }
    public override Count() {
        return this.arr.length;
    }
    // public forEach(callbackfn: (value: T, index?: number, array?: T[]) => void, thisArgs?: any) {
    //     this.arr.forEach(callbackfn, thisArgs);
    // }
    public override Max(selector: (item: T) => any) {
        if (this.arr.length === 0) {
            throw new Error('SourceNullException');
        }
    
        let max = selector(this.arr[0]);
    
        for (let i = 1; i < this.arr.length; i++) {
          const value = selector(this.arr[i]);
          if (value > max) {
            max = value;
          }
        }
    
        return max;
      }
    public override GroupBy(predicate: Function): IEnumerable<any> {
        let groupByObject = _.groupBy(this.arr, predicate);
        let array: IGrouping<any, T>[] = [];
        //{ 10: [value], 20:[value]}
        // [{key:'10',value:[value]}]

        for (let item in groupByObject) {
            if (typeof groupByObject[item] != 'function') {
                let Grouping: IGrouping<any, T> = new IGrouping<any, T>(item, groupByObject[item]);
                array.push(Grouping);
            }
        }
        let returnValue: IEnumerable<any> = new IEnumerable<IGrouping<any, T>>(array);
        return returnValue;
    }
    public All(predicate: (value: T, index: number, array: T[]) => void): boolean {
        return this.array.every(predicate);
    }
    public override Where(predicate: Function) {
        let newArray = _.filter(this.arr, predicate);
        let returnValue: IEnumerable<any> = new IEnumerable<any>(newArray);
        return returnValue;
    }
    public override First(){
        if (this.arr.length > 0) {
            return this.arr[0];
        } else {
            throw new Error('SourceNullException');
        }
    }
    public ElementAt(index: number): any {
        if (index && index < 0 || index >= this.arr.length) {
            throw new Error('ArgumentOutOfRangeException');
        }
        if (!this.arr || (this.arr && this.arr.length == 0)) {
            throw new Error('ArgumentNullException');
        }
        return this.arr[index];
    }
    public override get array() {
        return this.arr;
    }
    public Any(predicate?: (value: T, index?: number, array?: T[]) => void): boolean {
        if (predicate) {
            return this.arr.some(predicate);
        } else {
            return (this.arr && this.arr.length) ? true : false;
        }
    }
    public Distinct() {
        let uniqueArray = [...new Set(this.arr)];
        let returnValue: IEnumerable<any> = new IEnumerable<any>(uniqueArray);
        return returnValue;
    }
    public override LastOrDefault(): any {
        if (this.arr.length > 0) {
            return this.arr[this.arr.length - 1]
        } else {
            return ''; // not correct implementation has to return default
        }
    }
    public override ToArray() {
        return this.arr;
    }
    public SingleOrDefault<G = unknown>(): any {
        if (!this.arr) {
            throw new Error('ArgumentNullException')
        }
        else if (this.arr?.length > 0 && this.arr.length != 1) {
            throw new Error('InvalidOperationException')
        }
        else if (this.arr.length == 1) {
            return this.arr[0];
        } else {
            return ''; // not correct implementation has to return default
        }
    }
    public override Contains(item) {
        let returnedItem;
        if (typeof (item) == 'object') {
            // let parsedItem = DataConversionService.circularObjectStrigify(item);
            // returnedItem = this.arr.find((elem: any) => (
            //     DataConversionService.circularObjectStrigify(elem) == parsedItem
            // ));
            returnedItem = this.arr.find((elem: any) => {
                return _.isEqual(item, elem)
            });
        } else {
            returnedItem = this.arr.find((elem: any) => elem == item);
        }
        return (returnedItem) ? true : false;
    }
    public override AsEnumerable(source?: IEnumerable): IEnumerable<any> {
        if (source)
            return source;
        else {
            let returnValue: IEnumerable<T> = new IEnumerable<T>(this.arr);
            return returnValue;
        }
    }
    public OrderByDescending(predicate: Function): IOrderedEnumerable<T> {
        let newArray = _.orderBy(this.arr, predicate, ['desc'])
        let returnValue: IOrderedEnumerable<T> = new IOrderedEnumerable<T>(newArray);
        returnValue.setSortOrder(predicate, ['desc']);
        return returnValue;
    }
    public override Last() {
        if (this.arr.length > 0) {
            return this.arr[length - 1];
        } else {
            throw new Error('SourceNullException');
        }
    }
    //STUB code created to support Min with predicate as in Max.  Platform will implement in the right way Bug #35770
    public override Min1() {
        let min = this.arr[0];
        for (let item of this.arr) {
            if (item < min) {
                min = item;
            }
        }
        return min;
    }

    public override Min(predicate?: Function) {
        if (predicate) {
            if (this.arr.length === 0) {
                throw new Error('SourceNullException');
            }
        
            let min = predicate(this.arr[0]);
        
            for (let i = 1; i < this.arr.length; i++) {
              const value = predicate(this.arr[i]);
              if (value < min) {
                min = value;
              }
            }
            return min;
        }
        else
            return this.Min1();
    }
    public Aggregate(predicate: Function): string {
        //stub implemented
        let array = _.map(this.arr, predicate);
        return array.join('');
    }
    public override Union(param: IEnumerable<T>): IEnumerable<T> {
        if (this.arr == null || param == null || param.ToArray() == null) {
            throw new Error('ArgumentNullException');
        }
        let first = this.arr;
        let second = param.ToArray();
        if (!first || (first?.length == 0) || !second || (second?.length == 0)) {
            throw new Error('SourceEmptyException');
        }
        let firstType = first && first.length > 0 ? typeof first : '';
        let secondType = second && second.length > 0 ? typeof second : '';

        if (firstType == 'object' || secondType == 'object') {
            let array1 = first.filter((value, index) => {
                const _value = JSON.stringify(value);
                return index === second.findIndex(obj => {
                    return JSON.stringify(obj) === _value;
                });
            });
            let array2 = param.ToArray().filter((value, index) => {
                const _value = JSON.stringify(value);
                return index === param.ToArray().findIndex(obj => {
                    return JSON.stringify(obj) === _value;
                });
            });
            // let array2 = param.ToArray().filter((value, index) => param.ToArray().indexOf(value) === index);
            array1 = array1.concat(array2);
            let uniqueArr = array1.filter((value, index) => {
                const _value = JSON.stringify(value);
                return index === array1.findIndex(obj => {
                    return JSON.stringify(obj) === _value;
                });
            });
            let returnValue: IEnumerable<T> = new IEnumerable<T>(uniqueArr);
            return returnValue;
        } else {
            let array1 = first.filter((value, index) => first.indexOf(value) === index);
            let array2 = second.filter((value, index) => second.indexOf(value) === index);
            array1 = array1.concat(array2);
            let uniqueArr = array1.filter((value, index) => array1.indexOf(value) === index);
            let returnValue: IEnumerable<T> = new IEnumerable<T>(uniqueArr);
            return returnValue;
        }


        // Or
        // let array11 = [...new Set(this.arr)];
        // let array22 = [...new Set(param.ToArray())];
        // array11 = [...array11, ...array22]
        // let uniqueArr1 = [...new Set(array11)];
    }
    // Concat method
    Concat<G = unknown>(value: any): any {
        if (value.arr) {
            let concatedArray = this.arr.concat(value.arr);
            let returnValue: IEnumerable<T> = new IEnumerable<T>(concatedArray);
            return returnValue;
        } else {
            return this.arr.concat(value);
        }
    }
    Single<T=unknown>(predicate?:Function){
        if(predicate && predicate instanceof Function){
            if(this.arr == null){
                throw new Error("ArgumentNullException");
            }
            let result = _.filter(this.arr, predicate);
            if(!result || result.length == 0 || result.length > 1){
                return result[0];
            }
        }else{
            if(this.arr == null){
                throw new Error("ArgumentNullException");
            }
            if(this.arr && this.arr.length == 0 && this.arr.length > 1){
                throw new Error("InvalidOperationException");
            }
            if(this.arr.length == 1){
                return this.arr[0];
            }
        }
    }
}

export class IGrouping<T, U> extends IEnumerable {
    public key!: T;
    private val!: U;
    constructor(key, value) {
        super(value);
        this.key = key;
        this.val = value;
    }
    //    SetKeyValue(key: T, val: U): void {
    //      this.key = key;
    //      this.val = val;
    //    }
    GetKeyValue() {
        return { key: this.key, value: this.val };
    }
    Display(): void {
        console.log(`Key = ${this.key}, val = ${this.val}`);
    }
}
