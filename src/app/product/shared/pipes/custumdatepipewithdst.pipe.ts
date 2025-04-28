import { Pipe, PipeTransform } from '@angular/core';
import DateTime from 'epma-platform/DateTime';
import { TimeZoneInfo } from 'epma-platform/models';

@Pipe({
  name: 'CustomDate',
})
export class CustomDatePipe implements PipeTransform {
  transform(value: string,date:DateTime): string {
    if(TimeZoneInfo.Local.IsAmbiguousTime(date)){
        if(TimeZoneInfo.Local.IsDSTWithInAmbiguousTime(date)){
            value += " DST"; 
        }
    }

    return value; 
  }
}
