import { Convert } from 'epma-platform/services';
import { StringComparison, ObservableCollection } from 'epma-platform/models';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import { ObjectHelper } from 'epma-platform/helper';
import {
  CConstants,
  CnstSlotStatus,
  InfusionTypeCode,
} from '../utilities/constants';
import {
  AppContextInfo,
  PatientContext,
} from 'src/app/lorappcommonbb/utilities/globalvariable';
import { ViewModelBase } from 'src/app/lorappcommonbb/viewmodelbase';
import { CommPrescriptionItemViewVM } from './prescriptionitemviewvm';
import {
  CReqMsgGetSequencePrescriptionItemStatus,
  GetSequencePrescriptionItemStatusCompletedEventArgs,
  IPPMAManagePrescriptionWSSoapClient,
  PartialSequentialData,
  SequentialItemCriteria,
  SequentialPresriptionItem,
} from 'src/app/shared/epma-platform/soap-client/IPPMAManagePrescriptionWS';
import { CommonBB } from 'src/app/lorappcommonbb/utilities/common';
import { MedicationCommonConceptCodeData } from '../utilities/profiledata';
import 'epma-platform/booleanextension';
import 'epma-platform/numberextension';
import 'epma-platform/stringextension';
import { iMath } from 'epma-platform/mathextension';
import 'epma-platform/arrayextension';

export class CommSequentialItemsVM extends ViewModelBase {
  public MedsResolve: ObservableCollection<CommPrescriptionItemViewVM>;
  private _MedsAllSequentialResolve: ObservableCollection<CommSequentialItem>;
  public get MedsAllSequentialResolve(): ObservableCollection<CommSequentialItem> {
    return this._MedsAllSequentialResolve;
  }
  public set MedsAllSequentialResolve(
    value: ObservableCollection<CommSequentialItem>
  ) {
    this._MedsAllSequentialResolve = value;
    //NotifyPropertyChanged("MedsAllSequentialResolve");
  }
  private _MedsSequentialResolve: ObservableCollection<CommSequentialItem>;
  public get MedsSequentialResolve(): ObservableCollection<CommSequentialItem> {
    return this._MedsSequentialResolve;
  }
  public set MedsSequentialResolve(
    value: ObservableCollection<CommSequentialItem>
  ) {
    this._MedsSequentialResolve = value;
    //NotifyPropertyChanged("MedsSequentialResolve");
  }
  public InfusionGroupSequenceNo: number = 0;
  public UpdateStatusFromDatabase(): void {
    if (this.MedsAllSequentialResolve.Count > 0) {
      let liPartialSequentialData = this.MedsAllSequentialResolve.Select(x => ObjectHelper.CreateObject(new PartialSequentialData(), {
        PrescriptionItemOid: x.PrescriptionItemOid,
        PresItemStartDTTM: x.PrescriptionItem.PrescriptionStartDTTM,
        PresItemENDTTM: x.PrescriptionItem.EndDTTM,
        InfusionPeriod: x.PrescriptionItem.InfusionDetails.InfusionPeriod,
        InfusionPeriodLorenzoID:
          x.PrescriptionItem.InfusionDetails.InfusionPeriodUom != null &&
            x.PrescriptionItem.InfusionDetails.InfusionPeriodUom.Tag != null
            ? x.PrescriptionItem.InfusionDetails.InfusionPeriodUom.Tag.ToString()
            : null,
        PlannedInfusionVolume: x.PrescriptionItem.InfusionDetails.FluidVolume,
        PlannedInfusionVolumeOID:
          x.PrescriptionItem.InfusionDetails.VolumeUOM != null &&
            !String.IsNullOrEmpty(
              x.PrescriptionItem.InfusionDetails.VolumeUOM.Value
            )
            ? Number.Parse(x.PrescriptionItem.InfusionDetails.VolumeUOM.Value)
            : 0,
        PrescribedVolumeLorenzoID:
          x.PrescriptionItem.InfusionDetails.VolumeUOM != null &&
            x.PrescriptionItem.InfusionDetails.VolumeUOM.Tag != null
            ? x.PrescriptionItem.InfusionDetails.VolumeUOM.Tag.ToString()
            : null,
        InfusionRate:
          x.PrescriptionItem.InfusionDetails != null
            ? x.PrescriptionItem.InfusionDetails.Rate
            : null,
        InfusionRateLorenzoId:
          x.PrescriptionItem.InfusionDetails.InfRateNumeratorUom != null &&
            x.PrescriptionItem.InfusionDetails.InfRateNumeratorUom.Tag != null
            ? x.PrescriptionItem.InfusionDetails.InfRateNumeratorUom.Tag.ToString()
            : null,
        InfusionRatePerLorenzoId:
          x.PrescriptionItem.InfusionDetails.InfRateDinominatorUom != null &&
            x.PrescriptionItem.InfusionDetails.InfRateDinominatorUom.Tag != null
            ? x.PrescriptionItem.InfusionDetails.InfRateDinominatorUom.Tag.ToString()
            : null,
        StatusCode: x.PrescriptionItem.PrescriptionItemStatus,
        SlotStatusCode: CnstSlotStatus.PLANNED,
      }));
      let objService: IPPMAManagePrescriptionWSSoapClient = new IPPMAManagePrescriptionWSSoapClient();
      objService.GetSequencePrescriptionItemStatusCompleted = (s,e) => { this.objService_GetSequencePrescriptionItemStatusCompleted(s,e) };
      let obj: CReqMsgGetSequencePrescriptionItemStatus = ObjectHelper.CreateObject(new CReqMsgGetSequencePrescriptionItemStatus(), {
        oMedicationListCriteriaBC: ObjectHelper.CreateObject(new SequentialItemCriteria(), {
          OrganizationOid: !String.IsNullOrEmpty(AppContextInfo.OrganisationOID) ? Convert.ToInt64(AppContextInfo.OrganisationOID) : 0,
          PatientOid: PatientContext.PatientOID,
          SequentialInfusionData: liPartialSequentialData.ToArray()
        }),
        oContextInformation: CommonBB.FillContext()
      });
      objService.GetSequencePrescriptionItemStatusAsync(obj);
    }
  }
  objService_GetSequencePrescriptionItemStatusCompleted(sender: Object, e: GetSequencePrescriptionItemStatusCompletedEventArgs): void {
    if (e.Result != null && e.Result.oPrescriptionItemView != null) {
      let result: SequentialPresriptionItem[] = e.Result.oPrescriptionItemView;
      let bIsInfusion: boolean = false;
      for (let i: number = 0; i < result.Length; i++) {
        let item: CommSequentialItem = this.MedsSequentialResolve.Where(x => x.PrescriptionItemOid == result[i].PresriptionItemOid).FirstOrDefault();
        if (item != null) {
          if (!bIsInfusion && item.PrescriptionItem != null && item.PrescriptionItem.InfusionDetails != null && item.PrescriptionItem.InfusionDetails.InfusionType != null && !String.IsNullOrEmpty(item.PrescriptionItem.InfusionDetails.InfusionType.Value) && !String.Equals(item.PrescriptionItem.InfusionDetails.InfusionType.Value, InfusionTypeCode.INTERMITTENT)) {
            bIsInfusion = true;
          }
          if (!bIsInfusion && item.PrescriptionItem != null) {
            if (String.Equals(item.PrescriptionItem.PrescriptionItemStatus, CConstants.COMPLETED, StringComparison.InvariantCultureIgnoreCase)) {
              item.AdminStartDTTM = result[i].StartDateTime;
              result[i].Status = CnstSlotStatus.COMPLETED;
              item.IsEstimated = false;
            } 
            else {
              item.AdminStartDTTM = DateTime.GreaterThan(item.PrescriptionItem.PrescriptionStartDTTM, DateTime.MinValue) ? item.PrescriptionItem.PrescriptionStartDTTM : result[i].StartDateTime;
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
export class CommSequentialItem extends ViewModelBase {
  private _PrescriptionItem: CommPrescriptionItemViewVM;
  public get PrescriptionItem(): CommPrescriptionItemViewVM {
    return this._PrescriptionItem;
  }
  public set PrescriptionItem(value: CommPrescriptionItemViewVM) {
    this._PrescriptionItem = value;
    //NotifyPropertyChanged("PrescriptionItem");
  }
  private _AdminStartDTTM: DateTime = DateTime.MinValue;
  public get AdminStartDTTM(): DateTime {
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
