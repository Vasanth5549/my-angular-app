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
const Data = [{"key":"DurationUom_Field","value":"Duration & UOM"},{"key":"QuantityUom_Field","value":"Quantity & UOM"},{"key":"StopDatetime_Field","value":"Stop date/time"},{"key":"OnAdmission_Field","value":"On admission"},{"key":"ProblemIndication_Field","value":"Problem/Indication"},{"key":"AdditionalComment_Field","value":"Additional comments"},{"key":"FlowRate_Field","value":"Flow rate"},{"key":"InfusionPeriod_Field","value":"Infusion Period"},{"key":"MaxDose_Field","value":"Maximum dose"},{"key":"DeliveryDevice_Field","value":"Delivery device"},{"key":"TargetSaturationRange_Field","value":"Target saturation range"},{"key":"AdministrationInstruction_Field","value":"Administration Instructions"}];
class ResourceManager {
        static GetString(key: string, resourceCulture: any): string {
          let r = Data.find((e) => e.key == key);
          return r != undefined ? r.value : "";
        }
      }

    export class presItemUpdateHistory {
        // private static resourceMan: System.Resources.ResourceManager;
        private static resourceCulture = "";
        constructor() {

        }
        public static get AdditionalComment_Field(): string {
            return ResourceManager.GetString("AdditionalComment_Field", presItemUpdateHistory.resourceCulture);
        }
        public static get AdministrationInstruction_Field(): string {
            return ResourceManager.GetString("AdministrationInstruction_Field", presItemUpdateHistory.resourceCulture);
        }
        public static get DeliveryDevice_Field(): string {
            return ResourceManager.GetString("DeliveryDevice_Field", presItemUpdateHistory.resourceCulture);
        }
        public static get DurationUom_Field(): string {
            return ResourceManager.GetString("DurationUom_Field", presItemUpdateHistory.resourceCulture);
        }
        public static get FlowRate_Field(): string {
            return ResourceManager.GetString("FlowRate_Field", presItemUpdateHistory.resourceCulture);
        }
        public static get InfusionPeriod_Field(): string {
            return ResourceManager.GetString("InfusionPeriod_Field", presItemUpdateHistory.resourceCulture);
        }
        public static get MaxDose_Field(): string {
            return ResourceManager.GetString("MaxDose_Field", presItemUpdateHistory.resourceCulture);
        }
        public static get OnAdmission_Field(): string {
            return ResourceManager.GetString("OnAdmission_Field", presItemUpdateHistory.resourceCulture);
        }
        public static get ProblemIndication_Field(): string {
            return ResourceManager.GetString("ProblemIndication_Field", presItemUpdateHistory.resourceCulture);
        }
        public static get QuantityUom_Field(): string {
            return ResourceManager.GetString("QuantityUom_Field", presItemUpdateHistory.resourceCulture);
        }
        public static get StopDatetime_Field(): string {
            return ResourceManager.GetString("StopDatetime_Field", presItemUpdateHistory.resourceCulture);
        }
        public static get TargetSaturationRange_Field(): string {
            return ResourceManager.GetString("TargetSaturationRange_Field", presItemUpdateHistory.resourceCulture);
        }
    }