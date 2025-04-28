export class  ScriptObject{
    returnData = {};
    GetProperty(value:string | number):any{
        return this.returnData[value];
    }
    unpack(){
        let i=0;
        let props = Object.keys(this.returnData);
        props.forEach(element => {
         this.returnData[i] = this.returnData[element];
         i++;
       });
    }
}