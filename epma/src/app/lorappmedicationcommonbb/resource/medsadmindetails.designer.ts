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
  ﻿
    // const resourceCulture = "";
    const Data = [{ "key": "DoseDiscrepancyIcon", "value": "Administered dose was discrepant from the prescribed dose" }, { "key": "DoseEarly", "value": "early" }, { "key": "DoseIcon", "value": "Administration was" }, { "key": "DoseLate", "value": "late" }, { "key": "DuringHomeLeave", "value": " (During home leave)" }, { "key": "HistoryIcon", "value": "Select to launch the slot modification details screen" }, { "key": "HistoryIconHeaderTooltip", "value": "Modification history" }];
    class ResourceManager {
        static GetString(key: string, resourceCulture: any): string {
            let r = Data.find((e) => e.key == key);
            return r != undefined ? r.value : "";
        }
    }
    export class medsadmindetails {
        // private static resourceMan: System.Resources.ResourceManager;
        private static resourceCulture = "";
        constructor() {

        }
        public static get DoseDiscrepancyIcon(): string {
            return ResourceManager.GetString("DoseDiscrepancyIcon", medsadmindetails.resourceCulture);
        }
        public static get DoseEarly(): string {
            return ResourceManager.GetString("DoseEarly", medsadmindetails.resourceCulture);
        }
        public static get DoseIcon(): string {
            return ResourceManager.GetString("DoseIcon", medsadmindetails.resourceCulture);
        }
        public static get DoseLate(): string {
            return ResourceManager.GetString("DoseLate", medsadmindetails.resourceCulture);
        }
        public static get HistoryIcon(): string {
            return ResourceManager.GetString("HistoryIcon", medsadmindetails.resourceCulture);
        }
        public static get HistoryIconHeaderTooltip(): string {
            return ResourceManager.GetString("HistoryIconHeaderTooltip", medsadmindetails.resourceCulture);
        }
        public static get DuringHomeLeave(): string {
            return ResourceManager.GetString("DuringHomeLeave", medsadmindetails.resourceCulture);
        }
    }