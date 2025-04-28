import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { Control } from './Control';


@Injectable({
  providedIn: 'root'
})
export class AccessKeyService{

private arrAccessKey: any[] = [];

constructor() {
}

register(accesskeyctrl: string, ctrl: Control){
  let guid = uuidv4();
  this.arrAccessKey.push({id: guid, accesskey: accesskeyctrl, controlObj: ctrl});    
  return guid;
  // let AccessKeyList = this.arrAccessKey.filter(val => {
    // return accesskeyctrl.id;    
// });
}

unregister(guid: string){
 let index = this.arrAccessKey.findIndex(x => x.id === guid);
 this.arrAccessKey.splice(index, 1);
}

reset(){
  this.arrAccessKey = [];
}

keyPress(val: string){
  let matchedControl =
  this.arrAccessKey.filter((item) => {
    if (val == item.accesskey) {
      return item;
    }
  })
  if(matchedControl.length > 0){
    matchedControl[0].controlObj.setFocus();
  }
}}

export class controlIDMap{
  id: string;
  accesskey: string;
  controlObj: Control;
}
