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
    const resourceCulture = "";
const Data = [{"key":"CloseButton_Text","value":"Close"},{"key":"CloseButton_Tooltip","value":"Select to close"},{"key":"ComponentCombo_Tooltip","value":"Select item to view the links"},{"key":"description","value":"Description"},{"key":"path","value":"Path"},{"key":"source","value":"Source"}];
class ResourceManager {
        static GetString(key: string, resourceCulture: any): string {
          let r = Data.find((e) => e.key == key);
          return r != undefined ? r.value : "";
        }
      }
    export class ResMedDrugMonograph {
        constructor() {

        }
        public static get CloseButton_Text(): string {
            return ResourceManager.GetString("CloseButton_Text", resourceCulture);
        }
        public static get CloseButton_Tooltip(): string {
            return ResourceManager.GetString("CloseButton_Tooltip", resourceCulture);
        }
        public static get description(): string {
            return ResourceManager.GetString("description", resourceCulture);
        }
        public static get path(): string {
            return ResourceManager.GetString("path", resourceCulture);
        }
        public static get source(): string {
            return ResourceManager.GetString("source", resourceCulture);
        }
        public static get ComponentCombo_Tooltip(): string {
            return ResourceManager.GetString("ComponentCombo_Tooltip", resourceCulture);
        }
    }