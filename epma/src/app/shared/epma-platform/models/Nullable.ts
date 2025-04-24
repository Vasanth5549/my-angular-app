
export class Nullable<T> {
    private value:T;
    constructor(value?:T){
        this.value =value;
    }

    public get HasValue() { 
       return this.value ? true:false;
     }
     public get Value(){ 
        return this.value ;
      }
      public GetValueOrDefault(){
        return this.value? this.value : 0;
      }
}