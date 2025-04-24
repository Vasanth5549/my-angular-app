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
const Data = [{"key":"lblQuickLinks_Text","value":"Quick links"},{"key":"lblSearch_Text","value":"Search"},{"key":"cmdClear_ToolTip","value":"Select to clear the details recorded"},{"key":"cmdSearchCat_Text","value":"Search drug catalogue"},{"key":"optBeginsWith_Text","value":"Begins with"},{"key":"optAnyWord_Text","value":"Any word"},{"key":"ladSearch_Text","value":"Search results"},{"key":"cboQuickLinks_Tooltip","value":"Select a quick link"},{"key":"txtSearch_Tooltip","value":"Please select and enter search criteria"},{"key":"chkOrderSet_Text","value":"Search order sets"},{"key":"chkOrderSet_ToolTip","value":"Select to search for order sets"}];
class ResourceManager {
        static GetString(key: string, resourceCulture: any): string {
          let r = Data.find((e) => e.key == key);
          return r != undefined ? r.value : "";
        }
      }
    export class ResMedearch {
        constructor() {

        }
        public static get cboQuickLinks_Tooltip(): string {
            return ResourceManager.GetString("cboQuickLinks_Tooltip", resourceCulture);
        }
        public static get cmdClear_ToolTip(): string {
            return ResourceManager.GetString("cmdClear_ToolTip", resourceCulture);
        }
        public static get cmdSearchCat_Text(): string {
            return ResourceManager.GetString("cmdSearchCat_Text", resourceCulture);
        }
        public static get ladSearch_Text(): string {
            return ResourceManager.GetString("ladSearch_Text", resourceCulture);
        }
        public static get lblQuickLinks_Text(): string {
            return ResourceManager.GetString("lblQuickLinks_Text", resourceCulture);
        }
        public static get lblSearch_Text(): string {
            return ResourceManager.GetString("lblSearch_Text", resourceCulture);
        }
        public static get optAnyWord_Text(): string {
            return ResourceManager.GetString("optAnyWord_Text", resourceCulture);
        }
        public static get optBeginsWith_Text(): string {
            return ResourceManager.GetString("optBeginsWith_Text", resourceCulture);
        }
        public static get txtSearch_Tooltip(): string {
            return ResourceManager.GetString("txtSearch_Tooltip", resourceCulture);
        }
        public static get chkOrderSet_Text(): string {
            return ResourceManager.GetString("chkOrderSet_Text", resourceCulture);
        }
        public static get chkOrderSet_ToolTip(): string {
            return ResourceManager.GetString("chkOrderSet_ToolTip", resourceCulture);
        }
    }