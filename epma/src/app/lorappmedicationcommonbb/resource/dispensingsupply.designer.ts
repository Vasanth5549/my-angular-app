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
  

    // const resourceCulture = "";
    const Data = [{"key":"Componentname_Header","value":"Component name"},{"key":"Dispensinginstructions_Header","value":"Dispensing instructions"},{"key":"Supplyinstructions_Header","value":"Supply instructions"}];
    class ResourceManager {
            static GetString(key: string, resourceCulture: any): string {
              let r = Data.find((e) => e.key == key);
              return r != undefined ? r.value : "";
            }
          }


    export class dispensingsupply {
        // private static resourceMan: System.Resources.ResourceManager;
        private static resourceCulture = "";
        constructor() {

        }
        public static get Componentname_Header(): string {
            return ResourceManager.GetString("Componentname_Header", dispensingsupply.resourceCulture);
        }
        public static get Dispensinginstructions_Header(): string {
            return ResourceManager.GetString("Dispensinginstructions_Header", dispensingsupply.resourceCulture);
        }
        public static get Supplyinstructions_Header(): string {
            return ResourceManager.GetString("Supplyinstructions_Header", dispensingsupply.resourceCulture);
        }
    }