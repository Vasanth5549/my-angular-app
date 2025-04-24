interface Object {
    ToString();
    Equals(param):boolean;
}

Object.defineProperty(Object.prototype,'ToString',{
    value():string{
        if(this == undefined || this == null) return null;
        if (typeof this === 'string') return this;
        if (typeof this === 'number') return this.toString();
        var s: Object = Object(this);
        return JSON.stringify(s);
    }
})

Object.defineProperty(Object.prototype,'Equals',{
    value(param):boolean{
        if(this == undefined || this == null) return false;
        var s: Object = Object(this);
        //  return JSON.stringify(s) == JSON.stringify(param);
            let e = false;
            try{
                if(s.constructor.name == 'DateTime' && param.constructor.name  == 'DateTime'){
                    let parsedDate = JSON.stringify(s).split(".")[0];
                    let parsedParam = JSON.stringify(param).split(".")[0];
                    e = parsedDate == parsedParam;
                }else{
                    e = JSON.stringify(s) == JSON.stringify(param);
                }
            }
            catch(exp)
            {
                e = (s === param);
            }
            return e;
    }
})