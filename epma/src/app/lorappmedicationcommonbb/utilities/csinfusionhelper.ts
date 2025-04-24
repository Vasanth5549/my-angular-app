import { Component, OnInit } from '@angular/core';
import { StringBuilder,ProfileFactoryType,ContextManager,Convert,AppActivity} from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp,Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison } from 'epma-platform/models';
import { AppDialog } from 'epma-platform/controls';
import { HelperService} from 'epma-platform/soapclient';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
  
    export class CInfusionHelper {
        public static CalculateInfusedVolume(_StartTime: DateTime, _EndTime: DateTime, _InfRate: number, _InfRatePerUOM: string): number {
            let _InfRatePerMinute: number = 0;
            _InfRatePerUOM = "hour";
            if (_InfRatePerUOM == "UOM-46")
                _InfRatePerMinute = _InfRate / 60;
            else if (_InfRatePerUOM == "UOM-43")
                _InfRatePerMinute = _InfRate;
            else if (_InfRatePerUOM == "UOM-42")
                _InfRatePerMinute = _InfRate * 60;
            let ts: TimeSpan = _EndTime.Subtract(_StartTime);
            let _ElapsedTimeInMinutes: number = ts.TotalMinutes;
            return (_InfRatePerMinute * _ElapsedTimeInMinutes);
        }
        public static CalculateInfusionEndTime(_InfVolume: number, _InfVolumeUOM: string, _InfStartTime: DateTime, _InfRate: number, _InfRateUOM: string, _InfRatePerUOM: string): DateTime{
            let _ExpectedInfEndTime: DateTime= DateTime.MinValue;
            if (_InfVolumeUOM != _InfRateUOM) {
                CInfusionHelper.ConvertToLeastUOM(_InfVolume, _InfVolumeUOM, _InfRate, _InfRateUOM);
            }
            let TotalInfusionTime: number = _InfVolume / _InfRate;
            if (_InfRatePerUOM == "UOM-46")
                _ExpectedInfEndTime = _InfStartTime.AddHours(TotalInfusionTime);
            else if (_InfRatePerUOM == "UOM-43")
                _ExpectedInfEndTime = _InfStartTime.AddMinutes(TotalInfusionTime);
            else if (_InfRatePerUOM == "UOM-42")
                _ExpectedInfEndTime = _InfStartTime.AddSeconds(TotalInfusionTime);
            return _ExpectedInfEndTime;
        }
        public static ConvertToLeastUOM(_InfVolume: number, _InfVolumeUOM: string, _InfRate: number, _InfRateUOM: string): void {
            if (String.Compare(_InfVolumeUOM, _InfRateUOM, StringComparison.InvariantCultureIgnoreCase) != 0) {
                if (_InfVolumeUOM == "UOM-7") {
                    if (_InfRateUOM == "UOM-25") {
                        _InfVolume = _InfVolume * 1000;
                        _InfVolumeUOM = "UOM-25";
                    }
                    else if (_InfRateUOM == "UOM-33") {
                        _InfVolume = _InfVolume * 1000000;
                        _InfVolumeUOM = "UOM-33";
                    }
                }
                else if (_InfVolumeUOM == "UOM-25") {
                    if (_InfRateUOM == "UOM-33") {
                        _InfVolume = _InfVolume * 1000;
                        _InfVolumeUOM = "UOM-33";
                    }
                    else if (_InfRateUOM == "UOM-7") {
                        _InfRate = _InfRate * 1000;
                        _InfRateUOM = "UOM-25";
                    }
                }
                else if (_InfVolumeUOM == "UOM-33") {
                    if (_InfRateUOM == "UOM-25") {
                        _InfRate = _InfRate * 1000;
                        _InfRateUOM = "UOM-33";
                    }
                    else if (_InfRateUOM == "UOM-7") {
                        _InfRate = _InfRate * 1000000;
                        _InfRateUOM = "UOM-33";
                    }
                }
            }
        }
        public static Convertml(_InfVolume: number, _InfVolumeUOM: string): number {
            if (_InfVolume != 0 && _InfVolume > 0) {
                if (String.Compare(_InfVolumeUOM, "UOM-25", StringComparison.InvariantCultureIgnoreCase) != 0) {
                    if (_InfVolumeUOM == "UOM-7") {
                        _InfVolume = _InfVolume * 1000;
                        _InfVolumeUOM = "UOM-25";
                    }
                    else if (_InfVolumeUOM == "UOM-33") {
                        if (_InfVolume >= 1000) {
                            _InfVolume = _InfVolume / 1000.0;
                            _InfVolumeUOM = "UOM-25";
                        }
                        else _InfVolume = 0;
                    }
                }
            }
            else {
                _InfVolume = 0;
            }
            return _InfVolume;
        }
    }