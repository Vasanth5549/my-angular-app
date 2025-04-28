import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'GridHeight',
    pure: false
  })
  export class GridHeight implements PipeTransform {
    transform(value: object): any {
      let Array = [];
      if(value){
        let ObjectKeys = Object.keys(value);
        ObjectKeys.forEach(element => {
          if(value[element].Height != 'Auto' && typeof value[element].Height == 'string')
          Array.push(Number(value[element].Height));
          else
          Array.push(value[element].Height);
        });
      }
      return Array;
    }
}