import { Pipe, PipeTransform } from '@angular/core';
import { CListItemsDisplay, WrapToolTip, DTTMDisplay, StartDTTMDisplay, InfoIcon, DisplayPrescriptionLineItem, DisplayOtherInformationLineItem, GPConnectLineItemDisplay, ShowStarImages, FormatConflicts, FormViewerImage, GpConnectWarningDisplay, PrescribingNote, GPConnectPresItemDetail, DisplayChangingDose, DisplayChangingDoseMedStp, DisplayInfusionRate, DisplayFrequency, DisplayDuration, DisplayOperationMode, DisplayVariableDoseInst, DisplayVarInstTooltip, DisplayAdminTimes, RemoveDoseUOM, MCItemDisplay, DoseCombination, TechValidateTab, NumberToImageUrl, MedMCIOtherDisplay, SupplyHistory, MCconflicticon, DisplayAcknowledgeStatus } from '../convertor/medicationconverters.service';
import { Type } from '../models/Common';
import { CultureInfo } from '../../../shared/epma-platform/models/eppma-common-types';
import { TestDisplay } from '../convertor/grid-test-display.service';
import { ObjectHelper } from 'epma-platform/helper';
import { SupplyHistoryForMCI, TechnicalDetailsHistory, SetAdministeredIcon, SupplyHistory as medicationconverters, MedScanProdDisplayPrescribedItem, ToolTipDisplayItem , CustomToolTipWidthItem, ToolTipDisplaynew, CustomWordWrapItem } from 'src/app/lorappmedicationcommonbb/converter/medicationconverters';

@Pipe({
  name: 'MedClrkSrc'
})
export class CListItemsDisplayPipe implements PipeTransform {


  transform(value: Object, targetType?: Type, parameter?: Object, culture?: CultureInfo): any {
    let _CListItemsDisplay: CListItemsDisplay = new CListItemsDisplay();

    return _CListItemsDisplay.Convert(value, targetType, parameter, culture);
  }

}

@Pipe({
  name: 'CCWrapToolTip'
})
export class WrapToolTipPipe implements PipeTransform {

  transform(value: Object, targetType?: Type, parameter?: Object, culture?: CultureInfo): any {
    let _WrapToolTip: WrapToolTip = new WrapToolTip();

    let iLabelObj = _WrapToolTip.Convert(value, targetType, parameter, culture);
    return iLabelObj.Text;
  }

}

@Pipe({
  name: 'FormatText'
})
export class FormatTextPipe implements PipeTransform {
  transform(value: string, targetType?: Type, parameter?: Object, culture?: CultureInfo): any {
    const slashIndex = value.indexOf('/');
    console.log(value.slice(0, slashIndex + 1) + '\n', slashIndex, value, value.slice(slashIndex + 1));
    if (slashIndex !== -1 && value.length > 10) {
      // Insert '\n' after the first occurrence of '/'
      const stringWithNewline = value.slice(0, slashIndex + 1) + '\n' + value.slice(slashIndex + 1);
      return stringWithNewline;
    }
    // Return the original string if '/' is not found
    return value;
  }
}

@Pipe({
  name: 'DischargeLeaveDTTMConvertor'
})
export class DTTMDisplayPipe implements PipeTransform {

  transform(value: Object, targetType?: Type, parameter?: Object, culture?: CultureInfo): object {

    let _DTTMDisplay: DTTMDisplay = new DTTMDisplay();

    return _DTTMDisplay.Convert(value, targetType, parameter, culture);
  }

}

@Pipe({
  name: 'StartDTTMConvertor'
})
export class StartDTTMDisplayPipe implements PipeTransform {

  transform(value: Object, targetType?: Type, parameter?: Object, culture?: CultureInfo): object {

    let _StartDTTMDisplay: StartDTTMDisplay = new StartDTTMDisplay();

    return _StartDTTMDisplay.Convert(value, targetType, parameter, culture);
  }

}

@Pipe({
  name: 'MCconflicticon'
})
export class MCconflicticonPipe implements PipeTransform {

  transform(value: Object, targetType?: Type, parameter?: Object, dataItem?:any, culture?: CultureInfo): object {

    let _MCconflicticon: MCconflicticon = new MCconflicticon();

    return _MCconflicticon.Convert(dataItem, targetType, parameter, culture);
  }

}

@Pipe({
  name: 'FrmViewerIcon'
})
export class FormViewerImagePipe implements PipeTransform {

  transform(value: Object, targetType?: Type, parameter?: Object, culture?: CultureInfo): object {

    let _FormViewerImage: FormViewerImage = new FormViewerImage();

    return _FormViewerImage.Convert(value, targetType, parameter, culture);
  }

}

@Pipe({
  name: 'InfoIconKey'
})
export class InfoIconPipe implements PipeTransform {

  transform(value: Object, targetType?: Type, parameter?: Object, culture?: CultureInfo): object {
    let _InfoIcon: InfoIcon = new InfoIcon();

    return _InfoIcon.Convert(value, targetType, parameter, culture);
  }

}

@Pipe({
  name: 'MedLineDisplay'
})
export class DisplayPrescriptionLineItemPipe implements PipeTransform {

  transform(value: Object, targetType?: Type, parameter?: Object, culture?: CultureInfo): object {
    let _DisplayPrescriptionLineItem: DisplayPrescriptionLineItem = new DisplayPrescriptionLineItem();

    return _DisplayPrescriptionLineItem.Convert(value, targetType, parameter, culture);
  }

}

@Pipe({
  name: 'MedLineDisplay1'
})
export class DisplayPrescriptionLineItemPipe1 implements PipeTransform {
  transform(value: Object, targetType?: Type, parameter?: Object, culture?: CultureInfo): object {
    let _DisplayPrescriptionLineItem: DisplayPrescriptionLineItem = new DisplayPrescriptionLineItem();
    return _DisplayPrescriptionLineItem.Convert(value, targetType, parameter, culture);
  }
}
@Pipe({
  name: 'MedOtherDisplay'
})
export class DisplayOtherInformationLineItemPipe implements PipeTransform {
  transform(value: Object, targetType?: Type, parameter?: Object, culture?: CultureInfo): object {
    let _DisplayOtherInformationLineItem: DisplayOtherInformationLineItem = new DisplayOtherInformationLineItem();
    return _DisplayOtherInformationLineItem.Convert(value, targetType, parameter, culture);
  }
}

@Pipe({
  name: 'MedLineDisplayTVCA'
})
export class DisplayPrescriptionLineItemTVCAPipe implements PipeTransform {
  transform(value: Object, targetType?: Type, parameter?: Object, dataItem?: Object, culture?: CultureInfo): object {
    let _DisplayPrescriptionLineItem: DisplayPrescriptionLineItem = new DisplayPrescriptionLineItem();
    return _DisplayPrescriptionLineItem.Convert(dataItem, targetType, parameter, culture);
  }
}
@Pipe({
  name: 'MedOtherDisplayTVCA'
})
export class DisplayOtherInformationLineItemTVCAPipe implements PipeTransform {
  transform(value: Object, targetType?: Type, parameter?: Object, dataItem?: Object, culture?: CultureInfo): object {
    let _DisplayOtherInformationLineItem: DisplayOtherInformationLineItem = new DisplayOtherInformationLineItem();
    return _DisplayOtherInformationLineItem.Convert(dataItem, targetType, parameter, culture);
  }
}
@Pipe({
  name: 'MedOtherDisplay1'
})
export class DisplayOtherInformationLineItemPipe1 implements PipeTransform {

  transform(value: Object, targetType?: Type, parameter?: Object, culture?: CultureInfo): object {
    let _DisplayOtherInformationLineItem: DisplayOtherInformationLineItem = new DisplayOtherInformationLineItem();

    return _DisplayOtherInformationLineItem.Convert(value, targetType, parameter, culture);
  }

}

@Pipe({
  name: 'GPConnectLineDisplay'
})
export class GPConnectLineItemDisplayPipe implements PipeTransform {

  transform(value: Object, targetType?: Type, parameter?: Object, culture?: CultureInfo): object {
    let _GPConnectLineItemDisplay: GPConnectLineItemDisplay = new GPConnectLineItemDisplay();

    return _GPConnectLineItemDisplay.Convert(value, targetType, parameter, culture);
  }

}

@Pipe({
  name: 'WarningDisplay'
})
export class GpConnectWarningDisplayPipe implements PipeTransform {

  transform(value: Object, targetType?: Type, parameter?: Object, culture?: CultureInfo): object {

    let _GpConnectWarningDisplay: GpConnectWarningDisplay = new GpConnectWarningDisplay();

    return _GpConnectWarningDisplay.Convert(value, targetType, parameter, culture);
  }

}

@Pipe({
  name: 'ShowStarImages'
})
export class ShowStarImagesPipe implements PipeTransform {

  transform(value: Object, targetType?: Type, parameter?: Object, culture?: CultureInfo): object {
    let _ShowStarImages: ShowStarImages = new ShowStarImages();

    return _ShowStarImages.Convert(value, targetType, parameter, culture);
  }

}

@Pipe({
  name: 'FormatConflicts'
})
export class FormatConflictsDisplayPipe implements PipeTransform {

  transform(value: Object, targetType?: Type, parameter?: Object, culture?: CultureInfo): object {

    let _FormatConflictsmDisplay: FormatConflicts = new FormatConflicts();

    return _FormatConflictsmDisplay.Convert(value, targetType, parameter, culture);
  }

}

@Pipe({
  name: 'DisplayAcknowledgeStatus'
})
export class DisplayAcknowledgeStatusDisplayPipe implements PipeTransform {

  transform(value: Object, targetType?: Type, parameter?: Object, culture?: CultureInfo): object {
    let _DisplayAcknowledgeStatusDisplay: DisplayAcknowledgeStatus = new DisplayAcknowledgeStatus();

    return _DisplayAcknowledgeStatusDisplay.Convert(value, targetType, parameter, culture)

  }

}


@Pipe({
  name: 'GridDisplay'
})
export class GridDisplayPipe implements PipeTransform {

  transform(value: Object, targetType?: Type, parameter?: Object, culture?: CultureInfo): object {

    let _TestDisplay: TestDisplay = new TestDisplay();

    return _TestDisplay.Convert(value, targetType, parameter, culture);
  }

}

@Pipe({
  name: 'PrescribingNote'
})
export class PrescribingNotePipe implements PipeTransform {

  transform(value: Object, targetType?: Type, parameter?: Object, culture?: CultureInfo): object {

    let _PrescribingNote: PrescribingNote = new PrescribingNote();

    return _PrescribingNote.Convert(value, targetType, parameter, culture);
  }

}

@Pipe({
  name: 'GPConnectItemDisplay'
})
export class GPConnectPresItemDetailPipe implements PipeTransform {

  transform(value: Object, targetType?: Type, parameter?: Object, culture?: CultureInfo): object {

    let _GPConnectPresItemDetail: GPConnectPresItemDetail = new GPConnectPresItemDetail();

    return _GPConnectPresItemDetail.Convert(value, targetType, parameter, culture);
  }

}

@Pipe({
  name: 'TechValTab'
})
export class TechValidateTabPipe implements PipeTransform {
  transform(value: Object, targetType?: Type, parameter?: Object, culture?: CultureInfo): object {
    let _TechValidateTab: TechValidateTab = new TechValidateTab();
    return _TechValidateTab.Convert(value, targetType, parameter, culture);
  }
}

@Pipe({
  name: 'DoseComb'
})
export class DoseCombinationPipe implements PipeTransform {
  transform(value: Object, targetType?: Type, parameter?: Object, culture?: CultureInfo): object {
    let _DoseCombination: DoseCombination = new DoseCombination();
    return _DoseCombination.Convert(value, targetType, parameter, culture);
  }
}

@Pipe({
  name: 'MCItemDisplay'
})
export class MCItemDisplayPipe implements PipeTransform {
  transform(value: Object, targetType?: Type, parameter?: Object, culture?: CultureInfo): object {
    let _MCItemDisplay: MCItemDisplay = new MCItemDisplay();
    return _MCItemDisplay.Convert(value, targetType, parameter, culture);
  }
}

@Pipe({
  name: 'MedMCIOtherDisplay'
})
export class MedMCIOtherDisplayPipe implements PipeTransform {
  transform(value: Object, targetType?: Type, parameter?: Object, culture?: CultureInfo): object {
    let _MedMCIOtherDisplay: MedMCIOtherDisplay = new MedMCIOtherDisplay();
    return _MedMCIOtherDisplay.Convert(value, targetType, parameter, culture);
  }
}

@Pipe({
  name: 'MedMCIOtherDisplayChildTVCA'
})
export class MedMCIOtherDisplayChildTVCAPipe implements PipeTransform {
  transform(value: Object, targetType?: Type, parameter?: Object, dataItem?: Object, culture?: CultureInfo): object {
    let _MedMCIOtherDisplay: MedMCIOtherDisplay = new MedMCIOtherDisplay();
    return _MedMCIOtherDisplay.Convert(dataItem, targetType, parameter, culture);
  }
}

@Pipe({
  name: 'FrmChangingDose'
})
export class DisplayChangingDosePipe implements PipeTransform {
  transform(value: Object, targetType?: Type, parameter?: Object, culture?: CultureInfo, isUpdated?: any): object {
    let _DisplayChangingDose: DisplayChangingDose = new DisplayChangingDose();

    return isUpdated ? _DisplayChangingDose.Convert(value, targetType, parameter, culture) : _DisplayChangingDose.Convert(value, targetType, parameter, culture);
  }
}

@Pipe({
  name: 'FrmChangingDoseMedStp'
})
export class DisplayChangingDoseMedStpPipe implements PipeTransform {
  transform(value: Object, targetType?: Type, parameter?: Object, culture?: CultureInfo, isUpdated?: any): object {
    let _DisplayChangingDose: DisplayChangingDoseMedStp = new DisplayChangingDoseMedStp();
    return isUpdated ? _DisplayChangingDose.Convert(value, targetType, parameter, culture) : _DisplayChangingDose.Convert(value, targetType, parameter, culture);
  }
}

@Pipe({
  name: 'FrmInfusionRate'
})
export class DisplayInfusionRatePipe implements PipeTransform {
  transform(value: Object, targetType?: Type, parameter?: Object, culture?: CultureInfo, isUpdated?: any): object {
    let _DisplayInfusionRate: DisplayInfusionRate = new DisplayInfusionRate();
    return isUpdated ? _DisplayInfusionRate.Convert(value, targetType, parameter, culture) : _DisplayInfusionRate.Convert(value, targetType, parameter, culture);
  }
}

@Pipe({
  name: 'FrmDisplayFrequency'
})
export class DisplayFrequencyPipe implements PipeTransform {
  transform(value: Object, targetType?: Type, parameter?: Object, culture?: CultureInfo, isUpdated?: any): object {
    let _DisplayFrequency: DisplayFrequency = new DisplayFrequency();
    return isUpdated ? _DisplayFrequency.Convert(value, targetType, parameter, culture) : _DisplayFrequency.Convert(value, targetType, parameter, culture);
  }
}

@Pipe({
  name: 'FrmDisplayDuration'
})
export class DisplayDurationPipe implements PipeTransform {
  transform(value: Object, targetType?: Type, parameter?: Object, culture?: CultureInfo, isUpdated?: any): object {
    let _DisplayDuration: DisplayDuration = new DisplayDuration();
    return isUpdated ? _DisplayDuration.Convert(value, targetType, parameter, culture) : _DisplayDuration.Convert(value, targetType, parameter, culture)
  }
}

@Pipe({
  name: 'FrmOperationMode'
})
export class DisplayOperationModePipe implements PipeTransform {
  transform(value: Object, targetType?: Type, parameter?: Object, culture?: CultureInfo, isUpdated?: any): object {
    let _DisplayOperationMode: DisplayOperationMode = new DisplayOperationMode();
    return isUpdated ? _DisplayOperationMode.Convert(value, targetType, parameter, culture) : _DisplayOperationMode.Convert(value, targetType, parameter, culture);
  }
}

@Pipe({
  name: 'FrmDisplayVariableDoseInst'
})
export class DisplayVariableDoseInstPipe implements PipeTransform {
  transform(value: Object, targetType?: Type, parameter?: Object, culture?: CultureInfo, isUpdated?: any): object {
    let _DisplayVariableDoseInst: DisplayVariableDoseInst = new DisplayVariableDoseInst();
    return isUpdated ? _DisplayVariableDoseInst.Convert(value, targetType, parameter, culture) : _DisplayVariableDoseInst.Convert(value, targetType, parameter, culture);
  }
}

@Pipe({
  name: 'DisplayVarInstTooltip'
})
export class DisplayVarInstTooltipPipe implements PipeTransform {
  transform(value: Object, targetType?: Type, parameter?: Object, culture?: CultureInfo, isUpdated?: any): object {
    let _DisplayVarInstTooltip: DisplayVarInstTooltip = new DisplayVarInstTooltip();
    return isUpdated ? _DisplayVarInstTooltip.Convert(value, targetType, parameter, culture) : _DisplayVarInstTooltip.Convert(value, targetType, parameter, culture);
  }
}

@Pipe({
  name: 'FrmAdminTimeDisplay'
})
export class DisplayAdminTimesPipe implements PipeTransform {
  transform(value: Object, targetType?: Type, parameter?: Object, culture?: CultureInfo, isUpdated?: any): object {
    let _DisplayAdminTimes: DisplayAdminTimes = new DisplayAdminTimes();
    return isUpdated ? _DisplayAdminTimes.Convert(value, targetType, parameter, culture) : _DisplayAdminTimes.Convert(value, targetType, parameter, culture);
  }
}

@Pipe({
  name: 'RemoveDoseUOM'
})
export class RemoveDoseUOMPipe implements PipeTransform {
  transform(value: Object, targetType?: Type, parameter?: Object, culture?: CultureInfo): object {
    let _DisplayAdminTimes: RemoveDoseUOM = new RemoveDoseUOM();
    return _DisplayAdminTimes.Convert(value, targetType, parameter, culture);
  }
}

@Pipe({
  name: 'SupplyHistory'
})
export class SupplyHistoryPipe implements PipeTransform {
  transform(value: Object, targetType?: Type, parameter?: Object, culture?: CultureInfo): object {
    let _SupplyHistory: medicationconverters = new medicationconverters();
    let v: any = _SupplyHistory.Convert(value, targetType, parameter, culture);
    let sParameter: string = ObjectHelper.CreateType<string>(parameter, "string");
    if (!String.IsNullOrEmpty(sParameter) && (String.Equals(sParameter, "DispensingDetail") || String.Equals(sParameter, "DispensingDetailTooltip"))) {
      if (v?.iLabelInLineElements[0]?.InLine) {
        v = v?.iLabelInLineElements[0]?.InLine;
      }
    }
    return v;
  }
}
@Pipe({
  name: 'SupplyHistory1'
})
export class SupplyHistoryPipe1 implements PipeTransform {
  transform(value: Object, targetType?: Type, parameter?: Object, culture?: CultureInfo): object {
    let _SupplyHistory: SupplyHistory = new SupplyHistory();
    let v: any = _SupplyHistory.Convert(value, targetType, parameter, culture);
    let sParameter: string = ObjectHelper.CreateType<string>(parameter, "string");
    if (!String.IsNullOrEmpty(sParameter) && (String.Equals(sParameter, "DispensingDetail") || String.Equals(sParameter, "DispensingDetailTooltip"))) {
      if (v?.iLabelInLineElements[0]?.InLine) {
        v = v?.iLabelInLineElements[0]?.InLine;
      }
    }
    return v;
  }
}

@Pipe({
  name: 'NumberToImageUrl'
})
export class NumberToImageUrlPipe implements PipeTransform {
  transform(value: Object, targetType?: Type, parameter?: Object, culture?: CultureInfo): object {
    let _NumberToImageUrl: NumberToImageUrl = new NumberToImageUrl();
    return _NumberToImageUrl.Convert(value, targetType, parameter, culture);
  }
}
@Pipe({
  name: 'SupplyHistoryForMCI'
})
export class SupplyHistoryForMCIPipe implements PipeTransform {
  transform(value: Object, targetType?: Type, parameter?: Object, culture?: CultureInfo): object {
    let _SupplyHistoryForMCI: SupplyHistoryForMCI = new SupplyHistoryForMCI();
    let v: any = _SupplyHistoryForMCI.Convert(value, targetType, parameter, culture);
    let sParameter: string = ObjectHelper.CreateType<string>(parameter, "string");
    if (!String.IsNullOrEmpty(sParameter) && (String.Equals(sParameter, "DispensingDetail") || String.Equals(sParameter, "DispensingDetailTooltip"))) {
      if (v?.iLabelInLineElements[0]?.InLine) {
        v = v?.iLabelInLineElements[0]?.InLine;
      }
    }
    return v;
  }
}

@Pipe({
  name: 'TechnicalDetailsHistory'
})
export class TechnicalDetailsHistoryPipe implements PipeTransform {
  transform(value: Object, targetType?: Type, parameter?: Object, culture?: CultureInfo): object {
    let _TechnicalDetailsHistory: TechnicalDetailsHistory = new TechnicalDetailsHistory()
    let v: any = _TechnicalDetailsHistory.Convert(value, targetType, parameter, culture);
    let sParameter: string = ObjectHelper.CreateType<string>(parameter, "string");
    if (!String.IsNullOrEmpty(sParameter) && (String.Equals(sParameter, "DispensingDetail") || String.Equals(sParameter, "DispensingDetailTooltip"))) {
      if (v?.iLabelInLineElements[0]?.InLine) {
        v = v?.iLabelInLineElements[0]?.InLine;
      }
    }
    return v;
  }
}
@Pipe({
  name: 'SetAdministeredIcon'
})
export class SetAdministeredIconPipe implements PipeTransform {
  transform(value: Object, targetType?: Type, parameter?: Object, culture?: CultureInfo): object {
    let _SetAdministeredIcon: SetAdministeredIcon = new SetAdministeredIcon();
    return _SetAdministeredIcon.Convert(value, targetType, parameter, culture);
  }
}

@Pipe({
  name: 'MedScanProdDisplay'
})
export class MedScanProdDisplayIconPipe implements PipeTransform {
  transform(value: Object, targetType?: Type, parameter?: Object, culture?: CultureInfo): object {
    let _MedScanProdDisplayIcon: MedScanProdDisplayPrescribedItem = new MedScanProdDisplayPrescribedItem();
    return _MedScanProdDisplayIcon.Convert(value, targetType, parameter, culture);
  }
}

@Pipe({
  name: 'ToolTipDisplay'
})
export class ToolTipDisplayPipe implements PipeTransform {
  transform(value: any) {
    let _ToolTipDisplayPipe: ToolTipDisplayItem = new ToolTipDisplayItem();
    return _ToolTipDisplayPipe.Convert(value);
  }
}
@Pipe({
  name: 'ToolTipDisplayNew'
})
export class ToolTipDisplayPipe2 implements PipeTransform {
  transform(value: any) {
    let _ToolTipDisplayPipe: ToolTipDisplaynew = new ToolTipDisplaynew();
    return _ToolTipDisplayPipe.Convert(value);
  }
}

@Pipe({
  name: 'CustomToolTipWidth'
})
export class CustomToolTipWidthPipe implements PipeTransform {
  transform(value: any) {
    let _ToolTipDisplayPipe: CustomToolTipWidthItem = new CustomToolTipWidthItem();
    return _ToolTipDisplayPipe.Convert(value);
  }
}

@Pipe({
  name: 'CustomWordWrap'
})
export class CustomWordWrapPipe implements PipeTransform {
  transform(value: any, characterCount: number) {
    let _ToolTipDisplayPipe: CustomWordWrapItem = new CustomWordWrapItem();
    return _ToolTipDisplayPipe.Convert(value, characterCount);
  }
}