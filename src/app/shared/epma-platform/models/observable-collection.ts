import { IEnumerable, IGrouping, IOrderedEnumerable } from "./ienumerable";
import * as _ from 'lodash';
import { List } from "./list";
import { DataConversionService } from "../services/data-conversion.service";
import DateTime from "epma-platform/DateTime";
import { SortDescriptor, orderBy } from "@progress/kendo-data-query";

export class ObservableCollection<T = unknown>{
    // Concat(UpdatedSlotsData: ObservableCollection<import("../soap-client/MedicationAdministrationWS").SlotData>): import("../soap-client/MedicationAdministrationWS").SlotData[] {
    //   throw new Error('Method not implemented.');
    // }

    Concat<G = unknown>(value: any): any {
        if (value.arr) {
            value.arr.forEach(element => {
                this.arr.push(element);
                this[this.arr.length - 1] = element;
            });
            return this.arr;
        }
    }


    private arr: T[] = [];

    constructor();
    constructor(value?: Array<T>);
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
    public get array() {
        return this.arr;
    }
    public ToArray() {
        return this.arr;
    }
    public get Length() {
        return this.arr.length;
    }
    public ContainObj(sConceptCode) {
        return this.arr.find((elem: any) => elem.csCode == sConceptCode);
    }
    public Contains(item) {
        let returnedItem;
        if (item instanceof DateTime) {
            let parsedDate = JSON.stringify(item).split(".")[0];
            returnedItem = this.arr.find((elem: any) => {
                let parsedElement = JSON.stringify(elem).split(".");
                return parsedElement[0] == parsedDate
            });
        }
        else if (typeof (item) == 'object') {
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
    public forEach(callbackfn: (value: T, index?: number, array?: T[]) => void, thisArgs?: any) {
        this.arr.forEach(callbackfn, thisArgs);
    }
    public Where(predicate: Function) {
        let newArray = _.filter(this.arr, predicate);
        let returnValue: IEnumerable<any> = new IEnumerable<any>(newArray);
        return returnValue;
    }
    public Select(predicate: Function) {
        let newArray = _.map(this.arr, predicate);
        let returnValue: IEnumerable<any> = new IEnumerable<any>(newArray);
        return returnValue;
    }
    public ForEach(callbackfn: (value: T, index?: number, array?: T[]) => void, thisArgs?: any) {
        this.arr.forEach(callbackfn, thisArgs);
    }
    public Any(predicate: (value: T, index?: number, array?: T[]) => void): boolean {
        return this.arr.some(predicate);
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

    public GroupBy(predicate: Function): IEnumerable<any> {
        let groupByObject = _.groupBy(this.arr, predicate);
        let array: IGrouping<any, T>[] = [];
        for (let item in groupByObject) {
            if (typeof groupByObject[item] != 'function') {
                let Grouping: IGrouping<any, T> = new IGrouping<any, T>(item, groupByObject[item]);
                array.push(Grouping);
            }
        }
        let returnValue: IEnumerable<any> = new IEnumerable<IGrouping<any, T>>(array);
        return returnValue;
    }
    public OrderBy(predicate: Function): IOrderedEnumerable<T> {
        let newArray = _.orderBy(this.array, predicate, ['asc'])
        let returnValue: IOrderedEnumerable<T> = new IOrderedEnumerable<T>(newArray);
        returnValue.setSortOrder(predicate, ['asc']);
        return returnValue;
    }
    public Insert(index: number, element: T) {
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
    public First(): T {
        if (this.arr.length > 0) {
            return this.arr[0];
        } else {
            throw new Error('SourceNullException');
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
    public FirstOrDefaultCustomPredicate(predicate?: Function): any {
        if (this.arr.length > 0 && typeof predicate == 'function') {
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
    public OrderByDescending(predicate: Function): IOrderedEnumerable<T> {
        let newArray = _.orderBy(this.array, predicate, ['desc'])
        let returnValue: IOrderedEnumerable<T> = new IOrderedEnumerable<T>(newArray);
        returnValue.setSortOrder(predicate, ['desc']);
        return returnValue;
    }
    public All(predicate: (value: T, index: number, array: T[]) => void): boolean {
        return this.array.every(predicate);
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
    //to be verified
    public IndexOf(item: T) {
        if (!item) {
            return -1;
        }
        if (typeof item == 'object') {
            // let parsedItem = DataConversionService.circularObjectStrigify(item);
            // return this.array.findIndex(arrayitem =>
            //     DataConversionService.circularObjectStrigify(arrayitem) == parsedItem
            // );
            return this.array.findIndex((elem: any) => {
                return _.isEqual(item, elem)
            });
        } else {
            return this.array.findIndex(arrayitem => arrayitem == item)
        }

    }
    public Remove(item: T) {
        if (item) {
            if (typeof item == 'object') {
                // let parsedItem = DataConversionService.circularObjectStrigify(item);
                // let index = this.array.findIndex(arrayitem =>
                //     DataConversionService.circularObjectStrigify(arrayitem) == parsedItem
                // );
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
    public Max(selector: (item: T) => any) {
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
    public Min(predicate?: Function) {
        if (predicate) {
            return _.minBy(this.arr, predicate);
        } else {
            return _.min(this.arr);
        }
    }
    public AsEnumerable<G = unknown>(source?: IEnumerable): IEnumerable<any> {
        //implementation
        if (source)
            return source;
        else {
            let returnValue: IEnumerable<T> = new IEnumerable<T>(this.arr);
            return returnValue;
        }
    }
    public ToList<G = unknown>() {
        let list: List<T> = new List<T>(this.arr);
        return list;
    }
    public ElementAt<T = unknown>(index: number): any {
        if (index && index < 0 || index >= this.arr.length) {
            throw new Error('ArgumentOutOfRangeException');
        }
        if (!this.arr || (this.arr && this.arr.length == 0)) {
            throw new Error('ArgumentNullException');
        }
        return this.arr[index];
    }
    public Cast<G = unknown>(): IEnumerable<T> {
        //In c# the code does not work if casted but in typescript it works
        let returnValue: IEnumerable<T> = new IEnumerable<T>(this.arr);
        return returnValue;
    }
    public Sum(predicate: Function): number {
        let newArray = _.map(this.arr, predicate);
        let newArrayLength = newArray.length;
        let sum = 0;

        for (let i = 0; i < newArrayLength; i++) {
            sum += newArray[i];
        }
        return sum;
    }
    //Revisit
    public CopyFrom(dataSource: ObservableCollection<T>): void {
        this.Clear();
        if (dataSource && dataSource.Count > 0) {
            dataSource.forEach((item) => {
                this.Add(item);
            });
        }
    }
    public SelectMany(predicate: Function) {
        let newArray = _.map(this.arr, predicate);
        if (newArray.length > 0 && Array.isArray(newArray[0])) {
            newArray = newArray.join(",").split(",");
        } else {
            newArray = newArray.map(item => {
                if (typeof item == 'string') {
                    return item.split('');
                } else {
                    return item;
                }
            })
            newArray = typeof newArray[0] == 'number' ? newArray : newArray.join(",").split(",");
        }

        let returnValue: IEnumerable<any> = new IEnumerable<any>(newArray);
        return returnValue;
    }

    public ColumnSort(sortDescriptor: SortDescriptor[], collection: ObservableCollection<any>) {
        collection['arr'] = orderBy(collection['arr'], sortDescriptor);
        let newItemSource = new ObservableCollection();
        if (collection && collection.Count > 0)
          collection.array.forEach(item => newItemSource.Add(item));
        return newItemSource;
    }
}
