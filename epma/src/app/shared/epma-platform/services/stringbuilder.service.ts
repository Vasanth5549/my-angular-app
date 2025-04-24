import { Injectable } from '@angular/core';
// import { Environment } from 'src/app/product/shared/models/Common';

export class StringBuilder {

  private _t : string = '';
  constructor();
  constructor(value:string);
  constructor(value?:string){
    if(value){
      this.Append(value);
    }
  }
  
  public AppendLine(value:string | number | null | undefined| StringBuilder| string[]) : StringBuilder{
    let NewLine = "\r\n";
    if(value != null && !Array.isArray(value))

      this._t = this._t + NewLine + ( (value instanceof StringBuilder) ? (value as StringBuilder).ToString(): value);
    if(Array.isArray(value))
      this._t = this._t + + NewLine + value.join('');

    return this;

  }
  public Append(value:string | number | null | undefined| StringBuilder| string[]) : StringBuilder{

    if(value != null && !Array.isArray(value))

      this._t = this._t + ( (value instanceof StringBuilder) ? (value as StringBuilder).ToString(): value);
    if(Array.isArray(value))
      this._t = this._t + value.join('');

    return this;

  }
  public Remove( startIndex:number, length:number){
    if(startIndex == 0 || length == 0 || startIndex+length > this._t.length){
    throw new Error("ArgumentNullException:Unable to remove from stringbuilder");
  }else{
    return this._t.substring(0,startIndex)+this._t.substring(startIndex+length,this._t.length);
  }
}
  public Replace(oldValue:string, newValue:string){
    if(!this._t || oldValue === undefined || newValue === undefined){
      throw new Error();
    }else{
      newValue = newValue == null ? "": newValue;
      return this._t.replaceAll(oldValue,newValue);
    }
  }

  public ToString() : string{
        return this._t.toString();
  }
  public get Length():number {
    return this._t.length;
  }
  public Clear(){
    this._t = '';
  }
}
