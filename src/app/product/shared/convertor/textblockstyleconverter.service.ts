import { Injectable } from '@angular/core';
import {
  iLabel,
  iLabelInLineElement,
} from 'src/app/shared/epma-platform/controls/epma-label/epma-label.component';
import { TextBlock } from 'src/app/shared/epma-platform/controls/epma-textblock/epma-textblock.component';
import {
  App,
  Style,
} from 'src/app/shared/epma-platform/controls/ResourceStyle';
import { ObjectHelper } from 'src/app/shared/epma-platform/services/objecthelper.service';

@Injectable({
  providedIn: 'root',
})
export class TextBlockStyleTest {
  public Convert(value: Object): Object {
    let paraLineDisplay: iLabel = new iLabel();
    let InLineRun: iLabelInLineElement = new iLabelInLineElement();
    let sRun: TextBlock = new TextBlock();
    console.log(App.Current.Resources);
    sRun.Style = ObjectHelper.CreateType<Style>(
      App.Current.Resources['DrugName'],
      Style
    );
    sRun.Text = 'Test-DrugName';
    InLineRun.InLine = sRun;
    paraLineDisplay.InLines.Add(InLineRun);

    let InLineRun1: iLabelInLineElement = new iLabelInLineElement();
    let sRun1: TextBlock = new TextBlock();
    sRun1.Style = ObjectHelper.CreateType<Style>(
      App.Current.Resources['DrugInfusionType'],
      Style
    );
    sRun1.Text = 'Test-DrugInfusionType ';
    InLineRun1.InLine = sRun1;
    paraLineDisplay.InLines.Add(InLineRun1);

    let InLineRun2: iLabelInLineElement = new iLabelInLineElement();
    let sRun2: TextBlock = new TextBlock();
    sRun2.Style = ObjectHelper.CreateType<Style>(
      App.Current.Resources['DrugFluidName'],
      Style
    );
    sRun2.Text = 'Test-DrugFluidName ';
    InLineRun2.InLine = sRun2;
    paraLineDisplay.InLines.Add(InLineRun2);

    let InLineRun3: iLabelInLineElement = new iLabelInLineElement();
    let sRun3: TextBlock = new TextBlock();
    sRun3.Style = ObjectHelper.CreateType<Style>(
      App.Current.Resources['DrugNonInflbl'],
      Style
    );
    sRun3.Text = 'Test-DrugNonInflbl ';
    InLineRun3.InLine = sRun3;
    paraLineDisplay.InLines.Add(InLineRun3);

    let InLineRun4: iLabelInLineElement = new iLabelInLineElement();
    let sRun4: TextBlock = new TextBlock();
    sRun4.Style = ObjectHelper.CreateType<Style>(
      App.Current.Resources['DrugNonInfValue'],
      Style
    );
    sRun4.Text = 'Test-DrugNonInfValue ';
    InLineRun4.InLine = sRun4;
    paraLineDisplay.InLines.Add(InLineRun4);

    return paraLineDisplay;
  }
  public ConvertBack(value: Object): Object {
    return value;
  }
}
