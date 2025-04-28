interface IContextManager {
  Add(key: string, value: any): void;
}

export class ContextManager implements IContextManager {
  private static _instance: ContextManager

  constructor(init?: { key: string; value: string }[]) {
    if (init) {
      for (var x = 0; x < init.length; x++) {
        this[init[x].key] = init[x].value;
      }
    }
  }

  Add(key: string, value: string) {
    this[key] = value;
  }

  public static get Instance() {
    if (ContextManager._instance == null) {
      ContextManager._instance = new ContextManager();
    }
    return ContextManager._instance;
  }

  ContainsKey(key: string) {
    if (typeof this[key] === 'undefined') {
      return false;
    }

    return true;
  }

  public GetContext(key: string): Boolean {
    return ContextManager._instance.ContainsKey(key);
  }

  public Remove(key: string) {
    if (ContextManager._instance.ContainsKey(key)) {
      delete this[key];
    }
  }
  public NameExists(Name: string): boolean{
    return this.ContainsKey(Name);
  }
  public SetContext(contextName:string , contextObject:any):void{
     if(!this.ContainsKey(contextName)){
      this.Add(contextName,contextObject);
     }
  }

}
