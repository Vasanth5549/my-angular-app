import { Component, Injectable, OnInit } from '@angular/core';
import { StringBuilder, ProfileFactoryType, ContextManager, Convert, AppActivity, ProcessRTE } from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp, Byte, Decimal, decimal, Double, Float, Int64, long, Long, AppDialogEventargs, AppDialogResult, DelegateArgs, DialogComponentArgs, WindowButtonType, StringComparison, CListItem, RTEEventargs, List, ObservableCollection } from 'epma-platform/models';
import { AppDialog } from 'epma-platform/controls';
import { HelperService} from 'epma-platform/soapclient';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
import { Dictionary } from 'src/app/shared/epma-platform/index.dictionary';
import { CConstants, PrescriptionTypes, ValueDomain } from '../utilities/constants';
import { TitratedDoseInstructions } from '../utilities/profiledata';
import { AMSHelper } from 'src/app/lorappcommonbb/amshelper';
import { ViewModelBase } from 'src/app/lorappcommonbb/viewmodelbase';
import { CommonBB } from 'src/app/lorappcommonbb/utilities/common';
import { Busyindicator } from 'src/app/lorappcommonbb/busyindicator';

import * as IPPMAManagePrescSer from '../../shared/epma-platform/soap-client/IPPMAManagePrescriptionWS';
import { CValuesetTerm } from 'src/app/shared/epma-platform/soap-client/CReferenceWS';
import { ContextInfo } from 'src/app/lorappcommonbb/utilities/globalvariable';
@Injectable({ providedIn : 'root'})
    export class TitratedDoseCommonVM extends ViewModelBase {
        //public delegate void LoadedData();
        public LoadGridData: Function;
        public TitratedDoseInstruction: ObservableCollection<CValuesetTerm>;
        private _grdTitrated: ObservableCollection<TitratedScheduleDetailsCommon>;
        public get GrdTitrated(): ObservableCollection<TitratedScheduleDetailsCommon> {
            return this._grdTitrated;
        }
        public set GrdTitrated(value: ObservableCollection<TitratedScheduleDetailsCommon>) {
            this._grdTitrated = value;
           //NotifyPropertyChanged("GrdTitrated");
        }
        private _TitratedAdminInstruction: string;
        public get TitratedAdminInstruction(): string {
            return this._TitratedAdminInstruction;
        }
        public set TitratedAdminInstruction(value: string) {
            this._TitratedAdminInstruction = value;
        }
        private _TitratedComments: string;
        public get TitratedComments(): string {
            return this._TitratedComments;
        }
        public set TitratedComments(value: string) {
            this._TitratedComments = value;
        }
        private _lnPrescriptionItemOID: number = 0;
        public get PrescriptionItemOID(): number {
            return this._lnPrescriptionItemOID;
        }
        public set PrescriptionItemOID(value: number) {
            this._lnPrescriptionItemOID = value;
            this.LoadData();
        }
        private _lnInputPrescriptionItemOID: number = 0;
        public get InputPrescriptionItemOID(): number {
            return this._lnInputPrescriptionItemOID;
        }
        public set InputPrescriptionItemOID(value: number) {
            this._lnInputPrescriptionItemOID = value;
        }
        private _Startdttm: DateTime = DateTime.MinValue;
        public get Startdttm(): DateTime{
            return this._Startdttm;
        }
        public set Startdttm(value: DateTime) {
            this._Startdttm = value;
        }
        private _PresType: string;
        public get PresType(): string {
            return this._PresType;
        }
        public set PresType(value: string) {
            this._PresType = value;
        }
        constructor() {
        super();
            if (TitratedDoseInstructions.ConceptCodes == null) {
                ProcessRTE.GetHierarchicalValuesByDomains(CConstants.CodingSchemeName, CConstants.Version, CConstants.FilterType, ContextInfo.Culture, ValueDomain.TITRADMINSTRUCTION, (s,e) => {this.OnRTEResult(s);});
            }
        }
        OnRTEResult(args: RTEEventargs): void {
            if (String.IsNullOrEmpty(args.Request) || args.Result == null)
                return
            if (args.Result instanceof Dictionary) {
                let objResult: Dictionary<string, List<CListItem>> = <Dictionary<string, List<CListItem>>>args.Result;
                objResult.forEach( (objDomainDetail)=> {
                    switch (objDomainDetail.Key) {
                        case ValueDomain.TITRADMINSTRUCTION:
                            this.TitratedDoseInstruction = new ObservableCollection<CValuesetTerm>();
                            if (objDomainDetail.Value != null && objDomainDetail.Value.Count > 0) {
                                TitratedDoseInstructions.ConceptCodes = new ObservableCollection<CListItem>();
                                objDomainDetail.Value.forEach( (oCListItem)=> {
                                    this.TitratedDoseInstruction.Add(ObjectHelper.CreateObject(new CValuesetTerm(), { csCode: oCListItem.Value, csDescription: oCListItem.DisplayText }));
                                    TitratedDoseInstructions.ConceptCodes.Add(oCListItem);
                                });
                            }
                            break;
                    }
                });
            }
        }
        public LoadData(): void {
            if (this.PrescriptionItemOID > 0) {
                let serviceProxy: IPPMAManagePrescSer.IPPMAManagePrescriptionWSSoapClient = new IPPMAManagePrescSer.IPPMAManagePrescriptionWSSoapClient();
                let oReqTitratedDoseSchedInfo: IPPMAManagePrescSer.CReqMsgGetTitratedDoseScheduleInfo = new IPPMAManagePrescSer.CReqMsgGetTitratedDoseScheduleInfo();
                oReqTitratedDoseSchedInfo.PrescriptionItemOIDBC = this.PrescriptionItemOID;
                oReqTitratedDoseSchedInfo.oContextInformation = CommonBB.FillContext();
                serviceProxy.GetTitratedDoseScheduleInfoCompleted  = (s,e) => { this.serviceProxy_GetTitratedDoseScheduleInfoCompleted(s,e); } ;
                serviceProxy.GetTitratedDoseScheduleInfoAsync(oReqTitratedDoseSchedInfo);
            }
            else {
            this.LoadGridData();
                Busyindicator.SetStatusIdle("Titrateddetails");
            }
        }
        private SortDateTimeByPrescType(sPrescriptionType: string): ObservableCollection<TitratedScheduleDetailsCommon> {
            let oTitratedScheduleDetails: ObservableCollection<TitratedScheduleDetailsCommon> = new ObservableCollection<TitratedScheduleDetailsCommon>();
            switch (sPrescriptionType) {
                case PrescriptionTypes.Clerking:
                case PrescriptionTypes.ForAdministration:
                    oTitratedScheduleDetails = new ObservableCollection<TitratedScheduleDetailsCommon>(this.GrdTitrated.Select(s => s).OrderByDescending(o => o.ScheduledDate));
                    break;
                case PrescriptionTypes.Discharge:
                case PrescriptionTypes.Leave:
                case PrescriptionTypes.Outpatient:
                    oTitratedScheduleDetails = new ObservableCollection<TitratedScheduleDetailsCommon>(this.GrdTitrated.Select(s => s).OrderBy(o => o.ScheduledDate));
                    break;
            }
            return oTitratedScheduleDetails;
        }
    serviceProxy_GetTitratedDoseScheduleInfoCompleted(sender: Object, e: IPPMAManagePrescSer.GetTitratedDoseScheduleInfoCompletedEventArgs): void {
            let _ErrorID: number = 0;
            let sMCItem: string = String.Empty;
            let sVMVPMCIdentifyingName: string = String.Empty;
            let _ErrorSource: string = "LorAppManagePrescriptionBBUi.dll, Class:Multicomponent, Method:serviceProxy_GetMCpresitemCompleted()";
            if (e.Error == null) {
                try {
                    let oRes: IPPMAManagePrescSer.CResMsgGetTitratedDoseScheduleInfo = e.Result;
                    if (oRes != null && oRes.oTitratedDose != null) {
                        this.TitratedAdminInstruction = oRes.oTitratedDose.TitratedAdminInstruction;
                        this.TitratedComments = oRes.oTitratedDose.TitratedComments;
                        let bIsNotHavingAdminTime: boolean = oRes.oTitratedDose.IsHavingAdminTime == CConstants.sIsHavingtimeZero;
                        if (oRes.oTitratedDose.TitratedScheduledDetails != null) {
                            let oDistinctDates: List<DateTime> = new List<DateTime>();
                            let lstTitrateScheduled: List<IPPMAManagePrescSer.TitrateScheduled> = new List<IPPMAManagePrescSer.TitrateScheduled>();
                            if (!String.IsNullOrEmpty(this.PresType) && String.Equals(this.PresType, PrescriptionTypes.ForAdministration, StringComparison.CurrentCultureIgnoreCase)) {
                                let oTitratedDoseOrderByDesc = oRes.oTitratedDose.TitratedScheduledDetails.Where(x => ((x.TitratedDose != null && String.Equals(x.TitratedDose, "Omitted", StringComparison.InvariantCultureIgnoreCase)) || !String.IsNullOrEmpty(x.TitratedDose) && !String.IsNullOrEmpty(x.TitratedDoseUOM))).OrderByDescending(o => o.ScheduleDTTM.Date).Select(s => s.ScheduleDTTM.Date).FirstOrDefault();
                                if (DateTime.NotEquals(oTitratedDoseOrderByDesc, DateTime.MinValue)) {
                                    lstTitrateScheduled = oRes.oTitratedDose.TitratedScheduledDetails.Where(x => x.ScheduleDTTM.Date <= oTitratedDoseOrderByDesc).Select(s => s).ToList();
                                }
                                if (lstTitrateScheduled != null && lstTitrateScheduled.Count > 0) {
                                    oDistinctDates = lstTitrateScheduled.OrderBy(x => x.ScheduleDTTM.Date).GroupBy(date => date.ScheduleDTTM.ToShortDateString()).Select((x,i,g) => x.First().ScheduleDTTM.Date).ToList();
                                }
                            }
                            else {
                                oDistinctDates = oRes.oTitratedDose.TitratedScheduledDetails.OrderBy(x => x.ScheduleDTTM.Date).GroupBy(date => date.ScheduleDTTM.ToShortDateString()).Select((x,i,g) => x.First().ScheduleDTTM.Date).ToList();                                
                            }
                            let oFilterByDateWise: List<DateTime> = new List<DateTime>();
                            if (oDistinctDates != null && oDistinctDates.Count > CConstants.TitratedgridSize) {
                                let indx: number = oDistinctDates.Count - 1;
                                for (let i: number = 0; i < CConstants.TitratedgridSize; i++) {
                                    if (i == 0) {
                                        oFilterByDateWise.Add(oDistinctDates[indx]);
                                    }
                                    else {
                                        oFilterByDateWise.Add(oDistinctDates[indx]);
                                    }
                                    indx--;
                                }
                                let oTempsortDate: List<DateTime> = new List<DateTime>(oFilterByDateWise.OrderBy(o => o).Select(s => s));
                                oDistinctDates = oTempsortDate;
                            }
                            let oDistinctTimes = oRes.oTitratedDose.TitratedScheduledDetails.GroupBy(date => date.ScheduleDTTM.ToShortTimeString()).Select((x,i,g) => x.First().ScheduleDTTM.TimeOfDay).OrderBy(o => o.msSinceEpoch).ToList();
                            this.GrdTitrated = new ObservableCollection<TitratedScheduleDetailsCommon>();
                            let iRecord: number = 0;
                            oDistinctTimes.forEach( (record)=> {
                                let oT: TitratedScheduleDetailsCommon = new TitratedScheduleDetailsCommon();
                                let iDate: number = 0;
                                oT.ScheduledDate = new Array(oDistinctDates.Count);
                                oT.ScheduleDoseValue = new Array(oDistinctDates.Count);
                                oT.TitratedDoseUom = new Array(oDistinctDates.Count);
                                oDistinctDates.forEach( (daterecord)=> {
                                    oT.ScheduledDate[iDate] = daterecord;
                                    oT.ScheduleDTTM = daterecord;
                                oT.ScheduleTime = record.ToString("HH:mm");
                                if (bIsNotHavingAdminTime)
                                    oT.ScheduleTime = CConstants.sDose + (iRecord + 1);
                               
                                let i1 = oRes.oTitratedDose.TitratedScheduledDetails.Where(x => x.ScheduleDTTM.Date.Equals(daterecord) && x.ScheduleDTTM.TimeOfDay.Equals(record)).Select(i => { return  { TitratedDose: i.TitratedDose,TitratedDoseUOM: i.TitratedDoseUOM }}).FirstOrDefault();
                                
                                if (i1 != null) {
                                    oT.ScheduleDoseValue[iDate] = i1.TitratedDose;
                                    oT.TitratedDoseUom[iDate] = " " + i1.TitratedDoseUOM;
                                }
                                oT.ScheduleDoseUOM = " " + oRes.oTitratedDose.ScheduleDoseUOM;
                                iDate++;
                            });
                            this.GrdTitrated.Add(oT);
                            iRecord++;
                        });
                    }
                }
                if (this.LoadGridData != null) {
                    this.LoadGridData();
                }
            }
               catch(ex:any)  {
                let lnReturn: number = AMSHelper.PublicExceptionDetails(_ErrorID, _ErrorSource, ex);
            }

        }
 else {
            let lnReturn: number = AMSHelper.PublicExceptionDetails(_ErrorID, _ErrorSource, e.Error);
    }
    Busyindicator.SetStatusIdle("Titrateddetails");
} 
                }
export class TitratedScheduleDetailsCommon extends ViewModelBase {
    private _scheduleTime: string;
    public get ScheduleTime(): string {
        return this._scheduleTime;
    }
    public set ScheduleTime(value: string) {
        this._scheduleTime = value;
       //NotifyPropertyChanged("ScheduleTime");
    }
    private _scheduleDoseValue: string[];
    public get ScheduleDoseValue(): string[] {
        return this._scheduleDoseValue;
    }
    public set ScheduleDoseValue(value: string[]) {
        if (!ObjectHelper.ReferenceEquals(this._scheduleDoseValue, value)) {
            this._scheduleDoseValue = value;
           //NotifyPropertyChanged("ScheduleDoseValue");
        }
    }
    private _scheduledDate: DateTime[];
    public get ScheduledDate(): DateTime[] {
        return this._scheduledDate;
    }
    public set ScheduledDate(value: DateTime[]) {
        this._scheduledDate = value;
    }
    private _titratedDoseUom: string[];
    public get TitratedDoseUom(): string[] {
        return this._titratedDoseUom;
    }
    public set TitratedDoseUom(value: string[]) {
        this._titratedDoseUom = value;
       //NotifyPropertyChanged("TitratedDoseUom");
    }
    private _ScheduleDoseUOM: string;
    public get ScheduleDoseUOM(): string {
        return this._ScheduleDoseUOM;
    }
    public set ScheduleDoseUOM(value: string) {
        this._ScheduleDoseUOM = value;
    }
    private _ScheduleDTTM: DateTime = DateTime.MinValue;
    public get ScheduleDTTM(): DateTime{
        return this._ScheduleDTTM;
    }
    public set ScheduleDTTM(value: DateTime) {
        this._ScheduleDTTM = value;
       //NotifyPropertyChanged("ScheduleDTTM");
    }
}