import * as _ from 'lodash';
import { IEnumerable, IGrouping, IOrderedEnumerable } from './ienumerable';
import { ObservableCollection } from './observable-collection';
import { DataConversionService } from '../services/data-conversion.service';
import DateTime from 'epma-platform/DateTime';

export class List<T = unknown | null>{

    private arr: T[] = [];

    constructor();
    constructor(value?: Array<T>)
    constructor(value?: IEnumerable<T>);
    constructor(value?: ObservableCollection<T>);
    constructor(value?: IOrderedEnumerable<T>);
    constructor(value?: List<T>);
    constructor(value?: Array<T> | IEnumerable<T> | ObservableCollection<T> | IOrderedEnumerable<T> | List<T>) {
        if (value == null)
            this.arr = [];
        else {
            if (value instanceof IEnumerable || value instanceof ObservableCollection || value instanceof IOrderedEnumerable) {
                value = value.array
            }
            value?.forEach(element => {
                this.arr.push(element);
                this[this.arr.length - 1] = element;
            });
        }
    }
    public get array() {
        return this.arr;
    }
    public get Length() {
        return this.arr.length;
    }
    public Add(obj: T | any) {
        this.arr.push(obj);
        this[this.arr.length - 1] = obj;
    }
    public Clear() {
        for (let i = 0; i < this.arr.length; i++) {
            let strI = i.toString();
            delete this[strI];
        }
        this.arr = [];
    }
    public get Count(): number {
        return this.arr.length;
    }
    public Contains(element) {
        if (element instanceof DateTime) {
            let parsedDate = JSON.stringify(element).split(".")[0];
            return this.arr.find((elem: any) => {
                let parsedElement = JSON.stringify(elem).split(".");
                return parsedElement[0] == parsedDate
            }) != undefined ? true : false;
        }
        if (typeof (element) == 'object') {
            return this.arr.find((elem: any) => JSON.stringify(elem) == JSON.stringify(element)) != undefined ? true : false;
        }
        return this.arr.find((elem: any) => elem == element) != undefined ? true : false;
    }
    public IndexOf(element) {
        return this.arr.findIndex((elem: any) => elem == element);
    }
    public RemoveAt(eIndex: number): any {
        if (eIndex < 0 || eIndex > this.array.length) {
            throw new Error('ArgumentNullException');
        }
        if (!this.array || (this.array?.length == 0)) {
            throw new Error('SourceEmptyException');
        }
        if (this.Length > eIndex) {
            this.forEach((element, i) => {
                if (i == eIndex) {
                    this[eIndex] = this[eIndex + 1];
                }
                else if (i > eIndex)
                    this[i] = this[i + 1]
            });
            delete this[this.array.length - 1];
        } else {
            delete this[eIndex];
        }
        return this.array.splice(eIndex, 1);
    }
    public List() {

    }
    public Insert(index, element) {
        this.arr.splice(index, 0, element);
        let newLength = this.Length - 1;
        if(index == newLength){
            this[index] = element;
        }else if(index > newLength)
          this[newLength] = element;
        else{
            let prevValue = null;
            this.forEach((element, i) => {
                if (i == index) {
                    prevValue = this[index];
                    this[index] = element;
                }
                else if (i > index){
                 let prevVal = prevValue;
                 prevValue = this[i];
                 this[i] = prevVal ? prevVal : prevValue;
                 prevVal = null;
                }
            });
        }   
    }
    public Except(list: List) {
        let newArray = this.arr;
        list.arr.forEach(value => {
            newArray = newArray.filter(item => {
                return value != item
            })
        });
        return newArray;
    }

    public forEach(callbackfn: (value: T, index?: number, array?: T[]) => void, thisArgs?: any) {
        this.arr.forEach(callbackfn, thisArgs);
    }
    public ForEach(callbackfn: (value: T, index?: number, array?: T[]) => void, thisArgs?: any) {
        this.arr.forEach(callbackfn, thisArgs);
    }
    public Max(callbackfn?: (value: T, index?: number, array?: T[]) => void) {//predicate part remaining
        let max = this.arr[0];
        for (let item of this.arr) {
            if (item > max) {
                max = item;
            }
        }
        return max;
    }
    public Min() {
        let min = this.arr[0];
        for (let item of this.arr) {
            if (item < min) {
                min = item;
            }
        }
        return min;
    }
    public First(predicate?: Function): any {
        if (this.arr.length > 0) {
            return this.arr[0]
        } else if (typeof predicate == 'function') {
            return _.find(this.arr, predicate);
        } else {
            return null; // not correct implementation has to return default
        }
    }
    public FirstOrDefault(predicate?: Function): any {
        if (this.arr.length > 0) {
            return this.arr[0]
        } else if (typeof predicate == 'function') {
            return _.find(this.arr, predicate);
        } else {
            return null; // not correct implementation has to return default
        }
    }
    public LastOrDefault(): any {
        if (this.arr.length > 0) {
            return this.arr[this.arr.length - 1]
        } else {
            return ''; // not correct implementation has to return default
        }
    }

    /* Below functions need to be implemented*/
    public Sort() {
        if (this.arr.length > 0 && typeof (this.arr[0]) == 'number') {
            return this.arr.sort((a: any, b: any) => { return a - b });
        }
        else if (this.arr.length > 0 && typeof (this.arr[0]) == 'string') {
            return this.arr.sort();
        }
        else {
            return this.arr;
        }
    }
    public ToArray() {
        return this.arr;
    }

    public Where(predicate: Function) {
        let newArray = _.filter(this.arr, predicate);
        let returnValue: IEnumerable<any> = new IEnumerable<any>(newArray);
        return returnValue;
    }
    public Select(callbackfn: (value: T, index: number, array: IEnumerable<any>) => void): IEnumerable<any> {
        //Implementation pending (y => y.First().datetime) or (y => y.FirstOrDefault())

        let newArray = _.map(this.arr, callbackfn);
        let returnValue: IEnumerable<any> = new IEnumerable<any>(newArray);
        return returnValue;
    }
    public Any(predicate: (value: T, index?: number, array?: T[]) => void): boolean {
        return this.arr.some(predicate);
    }
    public OrderBy(predicate: Function): IOrderedEnumerable<T> {
        let newArray = _.orderBy(this.arr, predicate, ['asc'])
        let returnValue: IOrderedEnumerable<T> = new IOrderedEnumerable<T>(newArray);
        returnValue.setSortOrder(predicate, ['asc']);
        return returnValue;
    }
    public Last() {
        if (this.arr.length > 0) {
            return this.arr[length - 1];
        } else {
            throw new Error('SourceNullException');
        }
    }
    public ToList() {
        return new List(this.arr);
    }
    public AddRange(collection: IEnumerable<any> | List<T> | ObservableCollection<T> | Array<T>) {
        //indexer needs to be added
        if (collection && collection !== null) {
            if (Array.isArray(collection)) {
                this.arr = [...this.arr, ...collection]
            } else {
                this.arr = [...this.arr, ...collection.array]
            };
        } else {
            throw new Error('ArgumentNullException')
        }
    }
    public OrderByDescending(predicate: Function): IOrderedEnumerable<T> {
        let newArray = _.orderBy(this.arr, predicate, ['desc'])
        let returnValue: IOrderedEnumerable<T> = new IOrderedEnumerable<T>(newArray);
        returnValue.setSortOrder(predicate, ['desc']);
        return returnValue;
    }
    public Remove(item: T) {
        if (item) {
            if (typeof item == 'object') {
                // let parsedItem = DataConversionService.circularObjectStrigify(item);
                // let index = this.array.findIndex((elem: any) => (               
                //     DataConversionService.circularObjectStrigify(elem) == parsedItem
                // ));
                let index = this.array.findIndex((elem: any) => {
                    return _.isEqual(item, elem)
                });
                if (index > -1) {
                   this.RemoveAt(index);
                    return true;
                } else {
                    return false;
                }
            } else {
                let index = this.array.findIndex(arrayitem => arrayitem == item);
                if (index > -1) {
                    this.RemoveAt(index);
                    return true;
                } else {
                    return false;
                }
            }
        } else {
            return false;
        }
    }
    public Distinct() {
        let uniqueArray = [...new Set(this.arr)];
        let returnValue: IEnumerable<any> = new IEnumerable<any>(uniqueArray);
        return returnValue;
    }
    public Distinct_list(callbackfn: (value: T, index: number, array: IEnumerable<any>) => void): IEnumerable<any> {
        let newArray = _.map(this.arr, callbackfn);
        let uniqueArray = [...new Set(newArray)];
        let returnValue: IEnumerable<any> = new IEnumerable<any>(uniqueArray);
        return returnValue;
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
    public Aggregate(predicate: Function) {
        //stub implemented
        let array = _.filter(this.arr, predicate);
        let returnValue: IEnumerable<any> = new IEnumerable<any>(array);
        return returnValue;
    }
    public GroupBy(predicate: Function): IEnumerable<any> {
        let groupByObject = _.groupBy(this.arr, predicate);
        let array: IGrouping<any, T>[] = [];
        for (let item in groupByObject) {
            let Grouping: IGrouping<any, T> = new IGrouping<any, T>(item, groupByObject[item]);
            array.push(Grouping);
        }
        let returnValue: IEnumerable<any> = new IEnumerable<IGrouping<any, T>>(array);
        return returnValue;
    }
    public AsEnumerable(source?: IEnumerable): IEnumerable<any> {
        if (source)
            return source;
        else {
            let returnValue: IEnumerable<T> = new IEnumerable<T>(this.arr);
            return returnValue;
        }
    }
    public Sum(callbackfn: (value: any, index: number, array: IEnumerable<any>) => void): number {
        let newArray = _.map(this.arr, callbackfn);
        const total = newArray.reduce((acc, curr) => acc + curr, 0);
            return total;
    }
}
