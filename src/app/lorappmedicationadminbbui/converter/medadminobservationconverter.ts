import { Component, OnInit } from '@angular/core';
import { StringBuilder,ProfileFactoryType,ContextManager,Convert,AppActivity} from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp,Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison,AppDialogEventargs, AppDialogResult, DelegateArgs, DialogComponentArgs, WindowButtonType, CultureInfo, Visibility } from 'epma-platform/models';
import { AppDialog } from 'epma-platform/controls';
import { HelperService} from 'epma-platform/soapclient';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
import { Type } from 'src/app/product/shared/models/Common';
  
    export class MedAdminObservationConverter {

    }
    export class BoolVisibilityConverter  {
        public Convert(value: any, targetType: Type, parameter: any, culture: CultureInfo): any {
            if (value != null) {
                if (<boolean>value)
                    return Visibility.Visible;
            }
            return Visibility.Collapsed;
        }
        public ConvertBack(value: any, targetType: Type, parameter: any, culture: CultureInfo): any {
            return null;
        }
    }
