import { Component, OnInit } from '@angular/core';
import { StringBuilder,ProfileFactoryType,ContextManager,Convert,AppActivity, ScriptObject} from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp,Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison,AppDialogEventargs, AppDialogResult, DelegateArgs, DialogComponentArgs, WindowButtonType, HtmlPage } from 'epma-platform/models';
import { AppDialog } from 'epma-platform/controls';
import { HelperService} from 'epma-platform/soapclient';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
import { CommonBB } from 'src/app/lorappcommonbb/utilities/common';
    export class PrescriptionHelper {
        public static CheckPermission(ResourceType?:string ,ResourceCode?: string, ActivityCode?: string){
            if(ResourceType && ResourceCode && ActivityCode){
                return this.CheckPermission2(ResourceType, ResourceCode, ActivityCode)
            }
            else{
                return this.CheckPermission1(ResourceType, ResourceCode)
            }
           
        }
        public static CheckPermission1(PermissionCode: string, PermissionDescription: string): boolean {
            let sHasRights: string = ObjectHelper.CreateType<string>(HtmlPage.Window.Invoke("CheckPermission", PermissionCode, PermissionDescription), 'string');
            return (!String.IsNullOrEmpty(sHasRights) && String.Compare(sHasRights, "1") == 0);
        }
        public static CheckPermission2(ResourceType: string, ResourceCode: string, ActivityCode: string): boolean {
            let sHasRights: string = ObjectHelper.CreateType<string>(HtmlPage.Window.Invoke("CheckAccessRights", ResourceType, ResourceCode, ActivityCode), 'string');
            return (!String.IsNullOrEmpty(sHasRights) && String.Compare(sHasRights, "1") == 0);
        }
        // public static GetSealDrugs(PatConfdltyTypeCode: string, sSealImageList: string): string {
        //     let sSealRecordList: string = String.Empty;
        //     sSealImageList = String.Empty;
        //     let sDrugs: ScriptObject = ObjectHelper.CreateType<ScriptObject>(HtmlPage.Window.Invoke("GetSealDrugsData", PatConfdltyTypeCode), ScriptObject);
        //     if (sDrugs != null) {
        //         sSealRecordList = (sDrugs.GetProperty("SealRecordList") != null) ? sDrugs.GetProperty("SealRecordList").ToString() : String.Empty;
        //         sSealImageList = (sDrugs.GetProperty("SealImageList") != null) ? sDrugs.GetProperty("SealImageList").ToString() : String.Empty;
        //     }
        //     return sSealRecordList;
        // }
        public static GetSealDrugs(PatConfdltyTypeCode: string, out1: (sSealImageList: string) => void): string {
            let sSealImageList: string;
            let sSealRecordList: string = String.Empty;
            sSealImageList = String.Empty;
            let sDrugs: ScriptObject = ObjectHelper.CreateType<ScriptObject>(HtmlPage.Window.Invoke("GetSealDrugsData", PatConfdltyTypeCode), ScriptObject);
            if (sDrugs != null) {
                sSealRecordList = (sDrugs.GetProperty("SealRecordList") != null) ? sDrugs.GetProperty("SealRecordList").ToString() : String.Empty;
                sSealImageList = (sDrugs.GetProperty("SealImageList") != null) ? sDrugs.GetProperty("SealImageList").ToString() : String.Empty;
            }
            out1(sSealImageList);
            return sSealRecordList;
        }

        public static GetDuration(period: string, periodValue?: number) : number {
            if(period && periodValue){
               return this.GetDuration1(period,periodValue);
            }
            else{
                return this.GetDuration0(period);
            }
            
        }
        
        private static GetDuration1(period: string, periodValue: number): number {
            let curDate: DateTime= DateTime.MinValue;
            let newDate: DateTime= DateTime.MinValue;
            curDate = newDate = CommonBB.GetServerDateTime().Date;
            let days: number = 0;
            switch (period) {
                case "CC_MEDDRSN1":
                    days = periodValue;
                    break;
                case "CC_MEDDRSN2":
                    days = periodValue * 7;
                    break;
                case "CC_MEDRSN3":
                    newDate = curDate.AddMonths(periodValue * -1);
                    days = (<TimeSpan>curDate.Subtract(newDate)).Days;
                    break;
                case "CC_MEDRSN4":
                    newDate = curDate.AddYears(periodValue * -1);
                    days = (<TimeSpan>curDate.Subtract(newDate)).Days;
                    break;
            }
            return days;
        }

        public static GetDuration0(period: string): number {
            let duration: number = 0;
            if (period != null) {
                let sSplit: string[] = period.Split('~');
                if (sSplit.length == 2) {
                    let sPeriod: string = sSplit[1];
                    if (Number.TryParse(sSplit[0], (o) => { duration = o; })) {
                        return this.GetDuration(sPeriod, duration);
                    }
                }
            }
            return 100;
        }
        public static GetDurationValue(durationValueInMinutes: number, durationUOMCode: string): number {
            let duration: number = 0;
            if (durationValueInMinutes > 0 && !String.IsNullOrEmpty(durationUOMCode)) {
                switch (durationUOMCode) {
                    case "CC_HOURS":
                        duration = (durationValueInMinutes / 60);
                        break;
                    case "CC_MEDDRSN1":
                        duration = (durationValueInMinutes / (24 * 60));
                        break;
                    case "CC_MEDDRSN2":
                        duration = (durationValueInMinutes / (24 * 60 * 7));
                        break;
                    case "CC_MEDRSN3":
                        duration = (durationValueInMinutes / (24 * 60 * 28));
                        break;
                    case "CC_MEDRSN4":
                        duration = (durationValueInMinutes / (24 * 60 * 365));
                        break;
                    case "CC_MINUTES":
                        duration = durationValueInMinutes;
                        break;
                }
            }
            return duration;
        }
    }
