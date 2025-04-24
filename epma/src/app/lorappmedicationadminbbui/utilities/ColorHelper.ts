import { Component, OnInit } from '@angular/core';
import { StringBuilder,ProfileFactoryType,ContextManager,Convert,AppActivity} from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp,Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison,AppDialogEventargs, AppDialogResult, DelegateArgs, DialogComponentArgs, WindowButtonType, List } from 'epma-platform/models';
import { AppDialog, Color, SolidColorBrush } from 'epma-platform/controls';
import { HelperService} from 'epma-platform/soapclient';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
  
    export class SeriesColor {
        public Code: string;
        public Value: SolidColorBrush;
    }
    export class ColorCodes {
        public static Argb_0xFF: number = 0xFF;
        public static Argb_0x5D: number = 0x5D;
        public static Argb_0x07: number = 0x07;
        public static Argb_0x0A: number = 0x0A;
    }
    export class SeriesColorCollection {
        constructor() {
            SeriesColorCollection.SeriesColors = ObjectHelper.CreateObject(new List<SeriesColor>(), [ObjectHelper.CreateObject(new SeriesColor(), { Code: "S0", Value: new SolidColorBrush(Color.FromArgb(255, 202, 31, 123)) }),
            ObjectHelper.CreateObject(new SeriesColor(), { Code: "S1", Value: new SolidColorBrush(Color.FromArgb(255, 0, 127, 191)) }),
            ObjectHelper.CreateObject(new SeriesColor(), { Code: "S2", Value: new SolidColorBrush(Color.FromArgb(255, 24, 178, 189)) }),
            ObjectHelper.CreateObject(new SeriesColor(), { Code: "S3", Value: new SolidColorBrush(Color.FromArgb(255, 182, 54, 54)) }),
            ObjectHelper.CreateObject(new SeriesColor(), { Code: "S4", Value: new SolidColorBrush(Color.FromArgb(255, 255, 120, 0)) }),
            ObjectHelper.CreateObject(new SeriesColor(), { Code: "S5", Value: new SolidColorBrush(Color.FromArgb(255, 44, 195, 33)) }),
            ObjectHelper.CreateObject(new SeriesColor(), { Code: "S6", Value: new SolidColorBrush(Color.FromArgb(255, 194, 68, 184)) }),
            ObjectHelper.CreateObject(new SeriesColor(), { Code: "S7", Value: new SolidColorBrush(Color.FromArgb(255, 103, 59, 184)) }),
            ObjectHelper.CreateObject(new SeriesColor(), { Code: "S8", Value: new SolidColorBrush(Color.FromArgb(255, 75, 75, 75)) })
            ]);

        }
     public static SeriesColors: List<SeriesColor>  ; 
    }
                                