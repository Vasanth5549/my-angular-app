import { Pipe, PipeTransform } from '@angular/core';
import { TextBlockStyleTest } from '../convertor/textblockstyleconverter.service';

@Pipe({
  name: 'TextBlockStyle',
})
export class TextBlockStyleConverterPipe implements PipeTransform {
  transform(value: Object): object {
    let _TextBlockStyleTest: TextBlockStyleTest = new TextBlockStyleTest();

    return _TextBlockStyleTest.Convert(value);
  }
}
