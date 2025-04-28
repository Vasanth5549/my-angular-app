import { Pipe, PipeTransform } from '@angular/core';
import { Type } from '../../product/shared/models/Common';
import { CultureInfo } from '../../shared/epma-platform/models/eppma-common-types';
import { ActionByWrapConverter, CommentsWrapConverter, ImageURIBitMapConverter , InfusionDoseWrapConverter, InfusionRouteWrapConverter, LineBreakWrapConverter, OmitWrapConverter, PrescribedByWrapConverter, ReasonWrapConverter, ReviewWrapConverter, StartDTWrapConverter, StopDTWrapConverter, StringTextConverter, TimeConvertor, VisibilityConvertor,RouteWrapConverter as RouteConverter,DoseWrapConverter as DoseConverter } from 'src/app/lorarcbluebirdmedicationchart/common/MedChartConverter';
import { DisplayOtherInformationLineItem, DisplayPrescriptionLineItem, DoseWrapConverter, HumidificationConverter, RouteWrapConverter, TargetsatrangeConverter, DisplayMultiSlotDetail, TypeIcon, StatusIcon, FalseToVisibilityConverter, InfoIcon, FontWeightGridColumn, MCItemDisplay } from 'src/app/lorappmedicationadminbbui/converter/medadminconverter';
import { MedScanProdDisplayPrescribedItem } from 'src/app/lorappmedicationadminbbui/converter/medscanrecordadminconverter';
import { BitmapImage } from 'epma-platform/controls';
import { Visibility } from 'epma-platform/models';

@Pipe({
    name: 'ImageURIBitMap'
})

export class ImageURIBitMapPipe implements PipeTransform {
    transform(value: Object, targetType?: Type, culture?: CultureInfo): BitmapImage|string {
        let imgConvert: ImageURIBitMapConverter = new ImageURIBitMapConverter();
        return imgConvert.Convert(value, targetType, culture);
    }
}

@Pipe({
    name: 'MedAdminLineDisplay'
})
export class DisplayPrescriptionLineMedsItemPipe implements PipeTransform {
        transform(value: Object, targetType?: Type, parameter?: Object, culture?: CultureInfo): object {   
        let _DisplayPrescriptionLineItem: DisplayPrescriptionLineItem = new DisplayPrescriptionLineItem();
        return _DisplayPrescriptionLineItem.Convert(value, targetType, parameter, culture);
    }
}


@Pipe({
    name: 'MedDoseWrap'
})
export class DoseWrapConverterPipe implements PipeTransform {
        transform(value: Object, targetType?: Type, parameter?: Object, culture?: CultureInfo): object {   
        let _DoseWrapConverter: DoseWrapConverter = new DoseWrapConverter();
        return _DoseWrapConverter.Convert(value, targetType, parameter, culture);
    }
}

@Pipe({
  name: 'DoseWrapConverter'
})
export class DoseWrapMedConverterPipe implements PipeTransform {
      transform(value: Object, targetType?: Type, parameter?: Object, culture?: CultureInfo): object {   
      let _DoseWrapConverter: DoseConverter = new DoseConverter();
      return _DoseWrapConverter.Convert(value, targetType, parameter, culture);
  }
}

@Pipe({
    name: 'MedRouteSiteWrap'
})
export class RouteWrapConverterPipe implements PipeTransform {
        transform(value: Object, targetType?: Type, parameter?: Object, culture?: CultureInfo): object {   
        let _RouteWrapConverter: RouteWrapConverter = new RouteWrapConverter();
        return _RouteWrapConverter.Convert(value, targetType, parameter, culture);
    }
}

@Pipe({
  name: 'RouteWrapConvert'
})
export class RouteWrapMedConverterPipe implements PipeTransform {
      transform(value: Object, targetType?: Type, parameter?: Object, culture?: CultureInfo): object {   
      let _RouteWrapConverter: RouteConverter = new RouteConverter();
      return _RouteWrapConverter.Convert(value, targetType, parameter, culture);
  }
}


@Pipe({
    name: 'MedTargetsatrangeWrap'
})
export class TargetsatrangeConverterPipe implements PipeTransform {
        transform(value: Object, targetType?: Type, parameter?: Object, culture?: CultureInfo): object {   
        let _TargetsatrangeConverter: TargetsatrangeConverter = new TargetsatrangeConverter();
        return _TargetsatrangeConverter.Convert(value, targetType, parameter, culture);
    }
}

@Pipe({
    name: 'MedHumidificationWrap'
})
export class HumidificationConverterPipe implements PipeTransform {
        transform(value: Object, targetType?: Type, parameter?: Object, culture?: CultureInfo): object {   
        let _HumidificationConverter: HumidificationConverter = new HumidificationConverter();
        return _HumidificationConverter.Convert(value, targetType, parameter, culture);
    }
}

@Pipe({
    name: 'MedScanProdDisplayPrescribedItem'
})
export class MedScanProdDisplayPrescribedItemConverterPipe implements PipeTransform {
        transform(value: Object, targetType?: Type, parameter?: Object, culture?: CultureInfo): object {   
        let _MedScanProdDisplayPrescribedItemConverter: MedScanProdDisplayPrescribedItem = new MedScanProdDisplayPrescribedItem();
        return _MedScanProdDisplayPrescribedItemConverter.Convert(value, targetType, parameter, culture);
    }
}
@Pipe({
    name: 'MedAdminOtherDisplay'
  })
  export class DisplayOtherInformationLineItemMedPipe implements PipeTransform {
  
    transform(value: Object, targetType?: Type, parameter?: Object, culture?: CultureInfo): object {
      let _DisplayOtherInformationLineItem: DisplayOtherInformationLineItem = new DisplayOtherInformationLineItem();
  
      return _DisplayOtherInformationLineItem.Convert(value, targetType, parameter, culture);
    }
  
  }

@Pipe({
    name: 'MultislotDisplay'
})
export class DisplayMultiSlotDetailPipe implements PipeTransform {
        transform(value: Object, targetType?: Type, parameter?: Object, culture?: CultureInfo): object {   
        let _DisplayMultiSlotDetail: DisplayMultiSlotDetail = new DisplayMultiSlotDetail();        
        return _DisplayMultiSlotDetail.Convert(value, targetType, parameter, culture);
    }
}

@Pipe({
  name: 'FontWeightConv'
})
export class FontWeightConvPipe implements PipeTransform {
      transform(value: Object, targetType?: Type, parameter?: Object, culture?: CultureInfo): any {   
      let _DisplayFontWeightConvPipe: FontWeightGridColumn = new FontWeightGridColumn();        
      return _DisplayFontWeightConvPipe.Convert(value, targetType, parameter, culture);
  }
}

 @Pipe({
    name: 'MedAdminLineDisplay'
  })
  export class DisplayPrescriptionLineItemMedPipe implements PipeTransform {
  
    transform(value: Object, targetType?: Type, parameter?: Object, culture?: CultureInfo): object {
      let _DisplayPrescriptionLineItem: DisplayPrescriptionLineItem = new DisplayPrescriptionLineItem();
  
      return _DisplayPrescriptionLineItem.Convert(value, targetType, parameter, culture);
    }
  }
    @Pipe({
        name: 'Visibility'
      })
      export class VisibilityConvertorPipe implements PipeTransform {
      
        transform(value: Object, targetType?: Type, parameter?: Object, culture?: CultureInfo): object {
          let _VisibilityItem: VisibilityConvertor = new VisibilityConvertor();
          return _VisibilityItem.Convert(value, targetType, parameter, culture);
        }
}
@Pipe({
    name: 'StartDTWrap'
  })
  export class StartDTWrapConverterPipe implements PipeTransform {
  
    transform(value: Object, targetType?: Type, parameter?: Object, culture?: CultureInfo): Visibility {
      let _VisibilityItem: StartDTWrapConverter = new StartDTWrapConverter();
     return _VisibilityItem.Convert(value, targetType, parameter, culture);
      
    }
}
@Pipe({
    name: 'StopDTWrap'
  })
  export class StopDTWrapConverterPipe implements PipeTransform {
  
    transform(value: Object, targetType?: Type, parameter?: Object, culture?: CultureInfo): Visibility {
      let _VisibilityItem: StopDTWrapConverter = new StopDTWrapConverter();
     return _VisibilityItem.Convert(value, targetType, parameter, culture);
      
    }
}
@Pipe({
    name: 'PrescribedByWrap'
  })
  export class PrescribedByWrapConverterPipe implements PipeTransform {
    transform(value: Object, targetType?: Type, parameter?: Object, culture?: CultureInfo): Visibility {
      let _VisibilityItem: PrescribedByWrapConverter = new PrescribedByWrapConverter();
     return _VisibilityItem.Convert(value, targetType, parameter, culture);
      
    }
}
@Pipe({
    name: 'ActionByWrap'
  })
  export class ActionByWrapConverterPipe implements PipeTransform {
    transform(value: Object, targetType?: Type, parameter?: Object, culture?: CultureInfo): Visibility {
      let _VisibilityItem: ActionByWrapConverter = new ActionByWrapConverter();
     return _VisibilityItem.Convert(value, targetType, parameter, culture);
      
    }
}

@Pipe({
    name: 'ReasonWrap'
  })
  export class ReasonWrapConverterPipe implements PipeTransform {
    transform(value: Object, targetType?: Type, parameter?: Object, culture?: CultureInfo): Visibility {
      let _VisibilityItem: ReasonWrapConverter = new ReasonWrapConverter();
     return _VisibilityItem.Convert(value, targetType, parameter, culture);
      
    }
}

@Pipe({
    name: 'CommentsWrap'
  })
  export class CommentsWrapConverterPipe implements PipeTransform {
    transform(value: Object, targetType?: Type, parameter?: Object, culture?: CultureInfo): Visibility {
      let _VisibilityItem: CommentsWrapConverter = new CommentsWrapConverter();
     return _VisibilityItem.Convert(value, targetType, parameter, culture);
      
    }
}
@Pipe({
    name: 'ReviewWrap'
  })
  export class ReviewWrapConverterPipe implements PipeTransform {
    transform(value: Object, targetType?: Type, parameter?: Object, culture?: CultureInfo): Visibility {
      let _VisibilityItem: ReviewWrapConverter = new ReviewWrapConverter();
     return _VisibilityItem.Convert(value, targetType, parameter, culture);
      
    }
}
@Pipe({
    name: 'InfusionRouteWrap'
  })
  export class InfusionRouteWrapConverterPipe implements PipeTransform {
    transform(value: Object, targetType?: Type, parameter?: Object, culture?: CultureInfo): Object {
      let _RouteWrapItem: InfusionRouteWrapConverter = new InfusionRouteWrapConverter();
     return _RouteWrapItem.Convert(value, targetType, parameter, culture);
      
    }
}
@Pipe({
    name: 'OmitWrap',
    pure: false,
  })
  export class OmitWrapConverterPipe implements PipeTransform {
    transform(value: Object, targetType?: Type, parameter?: Object, culture?: CultureInfo): Visibility {
      let _OmitItem: OmitWrapConverter = new OmitWrapConverter();
     return _OmitItem.Convert(value, targetType, parameter, culture);
      
    }
}
@Pipe({
    name: 'LineBreakWrap'
  })
  export class LineBreakWrapConverterPipe implements PipeTransform {
    transform(value: Object, targetType?: Type, parameter?: Object, culture?: CultureInfo): Visibility {
      let _OmitItem: LineBreakWrapConverter = new LineBreakWrapConverter();
     return _OmitItem.Convert(value, targetType, parameter, culture);
      
    }
}
@Pipe({
    name: 'InfusionDoseWrap'
  })
  export class InfusionDoseWrapConverterPipe implements PipeTransform {
    transform(value: Object, targetType?: Type, parameter?: Object, culture?: CultureInfo): Object {
      let _infusionDose: InfusionDoseWrapConverter = new InfusionDoseWrapConverter();
     return _infusionDose.Convert(value, targetType, parameter, culture);
      
    }
}

@Pipe({
  name: 'StringText'
})

export class StringTextPipe implements PipeTransform{
  transform(value: Object, targetType?: Type, parameter?:Object, culture?: CultureInfo): object {
      let stringConvert: StringTextConverter = new StringTextConverter();
      return stringConvert.Convert(value, targetType, parameter, culture);
  }
}

@Pipe({
  name: 'Time'
})
export class TimeConvertorPipe implements PipeTransform {
  transform(value: Object,  targetType?: Type, parameter?: Object, culture?: CultureInfo): Object {
    let _time: TimeConvertor = new TimeConvertor();
   return _time.Convert(value,targetType, parameter);
    
  }
}

@Pipe({
  name: 'TypeIconKey'
})
export class TypeIconPipe implements PipeTransform {
  transform(value: Object, targetType?: Type, parameter?: Object, culture?: CultureInfo): object {
    let _TypeIcon: TypeIcon = new TypeIcon();
    return _TypeIcon.Convert(value, targetType, parameter, culture);
  }
}

@Pipe({
  name: 'StatusIconKey'
})
export class StatusIconPipe implements PipeTransform {
  transform(value: Object, targetType?: Type, parameter?: Object, culture?: CultureInfo): object {
    let _TypeIcon: StatusIcon = new StatusIcon();
    return _TypeIcon.Convert(value, targetType, parameter, culture);
  }
}

@Pipe({
  name: 'FalseToVisibleConvert'
})
export class FalseToVisibilityConverterPipe implements PipeTransform {
  transform(value: Object, targetType?: Type, parameter?: Object, culture?: CultureInfo): object {
    let _TypeIcon: FalseToVisibilityConverter = new FalseToVisibilityConverter();
    return _TypeIcon.Convert(value, targetType, parameter, culture);
  }
}

@Pipe({
  name: 'InfoMedIconKey'
})
export class InfoMedIconPipe implements PipeTransform {
  transform(value: Object, targetType?: Type, parameter?: Object, culture?: CultureInfo): object {
    let _InfoIcon: InfoIcon = new InfoIcon();
    return _InfoIcon.Convert(value, targetType, parameter, culture);
  }
}
@Pipe({
  name: 'MedMCItemDisplay'
})
export class MCItemDisplayMedsItemPipe implements PipeTransform {
      transform(value: Object, targetType?: Type, parameter?: Object, culture?: CultureInfo): object {   
      let _MCItemDisplay: MCItemDisplay = new MCItemDisplay();
      return _MCItemDisplay.Convert(value, targetType, parameter, culture);
  }
}