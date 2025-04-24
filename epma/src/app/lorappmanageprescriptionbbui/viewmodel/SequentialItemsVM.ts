
import 'epma-platform/stringextension';
  import { Component, OnInit } from '@angular/core';
import {CommonBB, Convert  } from 'epma-platform/services';
import { StringComparison,ObservableCollection } from 'epma-platform/models';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import { ObjectHelper } from 'epma-platform/helper';
import { ViewModelBase } from 'src/app/lorappcommonbb/viewmodelbase';
import { PrescriptionItemVM } from './PrescriptionItemVM';
import { CReqMsgGetSequencePrescriptionItemStatus, GetSequencePrescriptionItemStatusCompletedEventArgs, IPPMAManagePrescriptionWSSoapClient, PartialSequentialData, SequentialItemCriteria, SequentialPresriptionItem } from 'src/app/shared/epma-platform/soap-client/IPPMAManagePrescriptionWS';
import { MedicationCommonConceptCodeData } from 'src/app/lorappmedicationcommonbb/utilities/profiledata';
import { CnstSlotStatus, InfusionTypeCode } from 'src/app/lorappmedicationcommonbb/utilities/constants';
import { Common } from '../utilities/common';
import { CConstants } from '../utilities/constants';
import { AppContextInfo, PatientContext } from 'src/app/lorappcommonbb/utilities/globalvariable';
  ﻿
    export class SequentialItemsVM extends ViewModelBase {
        public MedsResolve: ObservableCollection<PrescriptionItemVM>;
        private _MedsAllSequentialResolve: ObservableCollection<SequentialItem> = new ObservableCollection<SequentialItem>();
        public get MedsAllSequentialResolve(): ObservableCollection<SequentialItem> {
            return this._MedsAllSequentialResolve;
        }
        public set MedsAllSequentialResolve(value: ObservableCollection<SequentialItem>) {
            this._MedsAllSequentialResolve = value;
           //NotifyPropertyChanged("MedsAllSequentialResolve");
        }
        private _MedsSequentialResolve: ObservableCollection<SequentialItem> = new ObservableCollection<SequentialItem>();
        public get MedsSequentialResolve(): ObservableCollection<SequentialItem> {
            return this._MedsSequentialResolve;
        }
        public set MedsSequentialResolve(value: ObservableCollection<SequentialItem>) {
            if(this._MedsSequentialResolve != null)
            {
                this._MedsSequentialResolve.CopyFrom(value)  ;
            }
       
           //NotifyPropertyChanged("MedsSequentialResolve");
        }
        public InfusionGroupSequenceNo: number = 0;
        public UpdateStatusFromDatabase(): void {
            if (this.MedsAllSequentialResolve.Count > 0) {
                let liPartialSequentialData = this.MedsAllSequentialResolve.Select(x => ObjectHelper.CreateObject(new PartialSequentialData(), {
                    PrescriptionItemOid: x.PrescriptionItemOid,
                    PresItemStartDTTM: x.PrescriptionItem.FormViewerDetails.BasicDetails.StartDTTM != DateTime.MinValue ? (x.PrescriptionItem.FormViewerDetails.BasicDetails.StartDTTM.DateTime.AddTime(x.PrescriptionItem.FormViewerDetails.BasicDetails.StartPrescriptionTime)) : DateTime.MinValue,
                    PresItemENDTTM: x.PrescriptionItem.FormViewerDetails.BasicDetails.EndDTTM,
                    InfusionPeriod: !String.IsNullOrEmpty(x.PrescriptionItem.FormViewerDetails.BasicDetails.InfusionDetails.InfusionPeriod) ? Number.Parse(x.PrescriptionItem.FormViewerDetails.BasicDetails.InfusionDetails.InfusionPeriod) : 0,
                    InfusionPeriodLorenzoID: x.PrescriptionItem.FormViewerDetails.BasicDetails.InfusionDetails.InfusionPeriodUom != null && x.PrescriptionItem.FormViewerDetails.BasicDetails.InfusionDetails.InfusionPeriodUom.Tag != null ? x.PrescriptionItem.FormViewerDetails.BasicDetails.InfusionDetails.InfusionPeriodUom.Tag.ToString() : null,
                    PlannedInfusionVolume: x.PrescriptionItem.FormViewerDetails.BasicDetails.InfusionDetails.FluidVolume,
                    PlannedInfusionVolumeOID: x.PrescriptionItem.FormViewerDetails.BasicDetails.InfusionDetails.VolumeUOM != null && !String.IsNullOrEmpty(x.PrescriptionItem.FormViewerDetails.BasicDetails.InfusionDetails.VolumeUOM.Value) ? Number.Parse(x.PrescriptionItem.FormViewerDetails.BasicDetails.InfusionDetails.VolumeUOM.Value) : 0,
                    PrescribedVolumeLorenzoID: x.PrescriptionItem.FormViewerDetails.BasicDetails.InfusionDetails.VolumeUOM != null && x.PrescriptionItem.FormViewerDetails.BasicDetails.InfusionDetails.VolumeUOM.Tag != null ? x.PrescriptionItem.FormViewerDetails.BasicDetails.InfusionDetails.VolumeUOM.Tag.ToString() : null,
                    InfusionRate: x.PrescriptionItem.FormViewerDetails.BasicDetails.InfusionDetails != null ? x.PrescriptionItem.FormViewerDetails.BasicDetails.InfusionDetails.Rate : null,
                    InfusionRateLorenzoId: x.PrescriptionItem.FormViewerDetails.BasicDetails.InfusionDetails.InfRateNumeratorUom != null && x.PrescriptionItem.FormViewerDetails.BasicDetails.InfusionDetails.InfRateNumeratorUom.Tag != null ? x.PrescriptionItem.FormViewerDetails.BasicDetails.InfusionDetails.InfRateNumeratorUom.Tag.ToString() : null,
                    InfusionRatePerLorenzoId: x.PrescriptionItem.FormViewerDetails.BasicDetails.InfusionDetails.InfRateDinominatorUom != null && x.PrescriptionItem.FormViewerDetails.BasicDetails.InfusionDetails.InfRateDinominatorUom.Tag != null ? x.PrescriptionItem.FormViewerDetails.BasicDetails.InfusionDetails.InfRateDinominatorUom.Tag.ToString() : null,
                    StatusCode: x.PrescriptionItem.PrescriptionItemStatus,
                    SlotStatusCode: CnstSlotStatus.PLANNED
                }));
                let objService: IPPMAManagePrescriptionWSSoapClient = new IPPMAManagePrescriptionWSSoapClient();
                objService.GetSequencePrescriptionItemStatusCompleted = (s, e) => {  this.objService_GetSequencePrescriptionItemStatusCompleted(s,e)};
                let obj: CReqMsgGetSequencePrescriptionItemStatus = ObjectHelper.CreateObject(new CReqMsgGetSequencePrescriptionItemStatus(), {
                    oMedicationListCriteriaBC: ObjectHelper.CreateObject(new SequentialItemCriteria(), {
                        OrganizationOid: !String.IsNullOrEmpty(AppContextInfo.OrganisationOID) ? Convert.ToInt64(AppContextInfo.OrganisationOID) : 0,
                        PatientOid: PatientContext.PatientOID,
                        SequentialInfusionData: liPartialSequentialData.ToArray()
                    }),
                    oContextInformation: Common.FillContext()
                });
                objService.GetSequencePrescriptionItemStatusAsync(obj);
            }
        }
        objService_GetSequencePrescriptionItemStatusCompleted(sender: Object, e: GetSequencePrescriptionItemStatusCompletedEventArgs): void {
            if (e.Result != null && e.Result.oPrescriptionItemView != null) {
                let result: SequentialPresriptionItem[] = e.Result.oPrescriptionItemView;
                let bIsInfusion: boolean = false;
                for (let i: number = 0; i < result.Length; i++) {
                    let item: SequentialItem = this.MedsSequentialResolve.Where(x => x.PrescriptionItemOid == result[i].PresriptionItemOid).FirstOrDefault();
                    if (item != null) {
                        if (!bIsInfusion && item.PrescriptionItem != null && item.PrescriptionItem.FormViewerDetails != null && item.PrescriptionItem.FormViewerDetails.BasicDetails != null && item.PrescriptionItem.FormViewerDetails.BasicDetails.InfusionType != null && !String.IsNullOrEmpty(item.PrescriptionItem.FormViewerDetails.BasicDetails.InfusionType.Value) && !String.Equals(item.PrescriptionItem.FormViewerDetails.BasicDetails.InfusionType.Value, InfusionTypeCode.INTERMITTENT)) {
                            bIsInfusion = true;
                        }
                        if (!bIsInfusion && item.PrescriptionItem != null) {
                            if (String.Equals(item.PrescriptionItem.PrescriptionItemStatus, CConstants.COMPLETED, StringComparison.InvariantCultureIgnoreCase)) {
                                item.AdminStartDTTM = result[i].StartDateTime;
                                result[i].Status = CnstSlotStatus.COMPLETED;
                                item.IsEstimated = false;
                            }
                            else {
                                item.AdminStartDTTM = item.PrescriptionItem.FormViewerDetails != null && item.PrescriptionItem.FormViewerDetails.BasicDetails != null && DateTime.GreaterThan(item.PrescriptionItem.FormViewerDetails.BasicDetails.StartDTTM, DateTime.MinValue) ? item.PrescriptionItem.FormViewerDetails.BasicDetails.StartDTTM.DateTime.AddTime(item.PrescriptionItem.FormViewerDetails.BasicDetails.StartPrescriptionTime) : result[i].StartDateTime;
                                result[i].Status = CnstSlotStatus.PLANNED;
                                item.IsEstimated = true;
                            }
                        }
                        else {
                            item.AdminStartDTTM = result[i].StartDateTime;
                            item.IsEstimated = result[i].IsEstimated;
                        }
                        if (MedicationCommonConceptCodeData.MedAdminSlotStatus != null) {
                            if (!String.IsNullOrEmpty(result[i].Status))
                                item.AdminStatus = CommonBB.GetText(result[i].Status, MedicationCommonConceptCodeData.MedAdminSlotStatus);
                            else if (!String.IsNullOrEmpty(item.AdminStatus))
                                item.AdminStatus = CommonBB.GetText(item.AdminStatus, MedicationCommonConceptCodeData.MedAdminSlotStatus);
                        }
                    }
                }
            }
        }
    }
    export class SequentialItem extends ViewModelBase {
        private _PrescriptionItem: PrescriptionItemVM;
        public get PrescriptionItem(): PrescriptionItemVM {
            return this._PrescriptionItem;
        }
        public set PrescriptionItem(value: PrescriptionItemVM) {
            this._PrescriptionItem = value;
           //NotifyPropertyChanged("PrescriptionItem");
        }
        private _AdminStartDTTM: DateTime = DateTime.MinValue;
        public get AdminStartDTTM(): DateTime{
            return this._AdminStartDTTM;
        }
        public set AdminStartDTTM(value: DateTime) {
            this._AdminStartDTTM = value;
           //NotifyPropertyChanged("AdminStartDTTM");
        }
        private _AdminStatus: string;
        public get AdminStatus(): string {
            return this._AdminStatus;
        }
        public set AdminStatus(value: string) {
            this._AdminStatus = value;
           //NotifyPropertyChanged("AdminStatus");
        }
        private _IsEstimated: boolean = false;
        public get IsEstimated(): boolean {
            return this._IsEstimated;
        }
        public set IsEstimated(value: boolean) {
            this._IsEstimated = value;
           //NotifyPropertyChanged("IsEstimated");
        }
        private _PrescriptionItemOid: number = 0;
        public get PrescriptionItemOid(): number {
            return this._PrescriptionItemOid;
        }
        public set PrescriptionItemOid(value: number) {
            this._PrescriptionItemOid = value;
           //NotifyPropertyChanged("PrescriptionItemOid");
        }
    }