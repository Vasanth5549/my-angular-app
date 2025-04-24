import { Dictionary } from "./eppma-IDictionary.types";

export class IsolatedStorageSettings extends Dictionary<string,any> {
    private static _instance:IsolatedStorageSettings;
  
    constructor(init?: { key: string; value: any }[]) {
      super(init)
    }
    Contains(key: string) {
      if(key == null){
        throw new Error("ArgumentNullException");
      }
      if (typeof this[key] === 'undefined') {
        return false;
      }
      return true;
    }
    public static get ApplicationSettings(){
      if(this._instance == null)
      this._instance = new IsolatedStorageSettings();
      return this._instance;
    }
  }
