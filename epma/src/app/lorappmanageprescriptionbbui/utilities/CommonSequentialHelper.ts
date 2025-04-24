import { Component, OnInit } from '@angular/core';
import {
  StringBuilder,
  ProfileFactoryType,
  ContextManager,
  Convert,
  AppActivity,
} from 'epma-platform/services';
import {
  Level,
  ProfileContext,
  OnProfileResult,
  IProfileProp,
  Byte,
  Decimal,
  decimal,
  Double,
  Float,
  Int64,
  long,
  Long,
  StringComparison,
  AppDialogEventargs,
  AppDialogResult,
  DelegateArgs,
  DialogComponentArgs,
  WindowButtonType,
  ObservableCollection,
  List,
  IEnumerable,
  CListItem,
  Visibility,
} from 'epma-platform/models';
import { AppDialog } from 'epma-platform/controls';
import { HelperService } from 'epma-platform/soapclient';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import {
  MessageEventArgs,
  MessageBoxResult,
  iMessageBox,
  MessageBoxButton,
  MessageBoxType,
  MessageBoxDelegate,
} from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
import { PrescriptionItemVM } from '../viewmodel/PrescriptionItemVM';
import { CConstants } from './constants';
import { BasicDetailsVM, SequenceDetail } from '../viewmodel/BasicDetailsVM';
import { ActivityTypes } from '../model/common';
import { CAActivity } from './constants';
import { CSequentialHelper } from './CSequentialHelper';
import { IPPMABaseVM } from '../viewmodel/ippmabasevm';
import { Resource } from '../resource';
import { OrderSetHelper, PrescriptionHelper } from './prescriptionhelper';
import {
  SequentialItem,
  SequentialItemsVM,
} from '../viewmodel/SequentialItemsVM';

import { PatientContext } from 'src/app/lorappcommonbb/utilities/globalvariable';
import { Dictionary } from 'src/app/shared/epma-platform/index.dictionary';
import { from } from 'rxjs';
import * as IPPMAManagePrescSer from '../../shared/epma-platform/soap-client/IPPMAManagePrescriptionWS';
import { MedSequentialPrescription } from '../view/medsequentialprescription';

export enum eCommonSequenceNoReassignType {
  ReassignWithinGroup="ReassignWithinGroup",
  ReassignAcrossGroups="ReassignAcrossGroups",
}
export class CommonSequentialHelper {
  public static GetNextGroupSequenceNo(
    MedsResolve: ObservableCollection<PrescriptionItemVM>,
    LastInfusionGroupSequenceNo: number
  ): number {
    let _NextGroupSequenceNo: number = 0;
    if (LastInfusionGroupSequenceNo > 0) {
      _NextGroupSequenceNo = LastInfusionGroupSequenceNo;
    }
    return ++_NextGroupSequenceNo;
  }
  public static GetNextItemSequenceNo(
    MedsResolve: ObservableCollection<PrescriptionItemVM>,
    oDisCancelItems: List<PrescriptionItemVM>,
    InfusionGroupSequenceNo: number
  ): number {
    let _NextItemSequenceNo: number = 0;
    _NextItemSequenceNo = CommonSequentialHelper.GetLastItemSequenceNo(
      MedsResolve,
      oDisCancelItems,
      InfusionGroupSequenceNo
    );
    return ++_NextItemSequenceNo;
  }
  public static GetLastItemSequenceNo(
    MedsResolve: ObservableCollection<PrescriptionItemVM>,
    oDisCancelItems: List<PrescriptionItemVM>,
    InfusionGroupSequenceNo: number
  ): number {
    let _LastItemSequenceNo: number = 0;
    if (MedsResolve != null && MedsResolve.Count > 0) {
      let GetItemSequenceNo = MedsResolve.Where(
        (x) =>
          !x.IsGroupHeader &&
          x.FormViewerDetails != null &&
          x.FormViewerDetails.BasicDetails != null &&
          x.FormViewerDetails.BasicDetails.SequenceInfo != null &&
          x.FormViewerDetails.BasicDetails.SequenceInfo.GroupSequenceNo ==
            InfusionGroupSequenceNo
      ).Select(
        (s) => s.FormViewerDetails.BasicDetails.SequenceInfo.ItemSequenceNo
      );
      if (GetItemSequenceNo != null && GetItemSequenceNo.Count() > 0) {
        _LastItemSequenceNo = GetItemSequenceNo.Max((o) => o);
      }
    }
    return _LastItemSequenceNo;
  }
  public static GetIndexForNewItem(
    MedsResolve: ObservableCollection<PrescriptionItemVM>,
    InfusionGroupSequenceNo: number
  ): number {
    let _newIndex: number = 0;
    let _AllItemsInSequence = MedsResolve.Where(
      (x) =>
        x.FormViewerDetails != null &&
        x.FormViewerDetails.BasicDetails != null &&
        x.FormViewerDetails.BasicDetails.SequenceInfo != null &&
        x.FormViewerDetails.BasicDetails.SequenceInfo.GroupSequenceNo ==
          InfusionGroupSequenceNo &&
        ((!String.IsNullOrEmpty(x.PrescriptionItemStatus) &&
          !String.Equals(
            x.PrescriptionItemStatus,
            CConstants.COMPLETED,
            StringComparison.InvariantCultureIgnoreCase
          ) &&
          !String.Equals(
            x.PrescriptionItemStatus,
            CConstants.CANCELLED,
            StringComparison.InvariantCultureIgnoreCase
          ) &&
          !String.Equals(
            x.PrescriptionItemStatus,
            CConstants.DISCONTINUED,
            StringComparison.InvariantCultureIgnoreCase
          )) ||
          String.IsNullOrEmpty(x.PrescriptionItemStatus))
    );
    if (_AllItemsInSequence != null && _AllItemsInSequence.Count() > 0) {
      let _LastPrescItem: PrescriptionItemVM =
        _AllItemsInSequence.LastOrDefault();
      if (_LastPrescItem != null) {
        _newIndex = MedsResolve.IndexOf(_LastPrescItem) + 1;
      }
    }
    return _newIndex;
  }
  public static GetIndexOfGivenItemSequenceNo(
    MedsResolve: ObservableCollection<PrescriptionItemVM>,
    InfusionGroupSequenceNo: number,
    InfusionItemSeqno: number,
    out1: (_oSeqItem: PrescriptionItemVM) => void
  ): number {
    let _oSeqItem: PrescriptionItemVM;
    let _newIndex: number = 0;
    _oSeqItem = MedsResolve.Where(
      (x) =>
        x.FormViewerDetails != null &&
        x.FormViewerDetails.BasicDetails != null &&
        x.FormViewerDetails.BasicDetails.SequenceInfo != null &&
        x.FormViewerDetails.BasicDetails.SequenceInfo.GroupSequenceNo ==
          InfusionGroupSequenceNo &&
        x.FormViewerDetails.BasicDetails.SequenceInfo.ItemSequenceNo ==
          InfusionItemSeqno
    ).FirstOrDefault();
    if (_oSeqItem != null) {
      _newIndex = MedsResolve.IndexOf(_oSeqItem);
    }
    out1(_oSeqItem);
    return _newIndex;
  }
  public static GetFirstActiveItemSeqItemVM(
    MedsResolve: ObservableCollection<PrescriptionItemVM>,
    SequenceGroupNo: number
  ): SequenceDetail {
    let oSeqDetail: SequenceDetail = null;
    if (MedsResolve != null && MedsResolve.Count > 0 && SequenceGroupNo > 0) {
      let _tmpPresItemVM: PrescriptionItemVM = MedsResolve.Where(
        (c) =>
          c != null &&
          !c.IsGroupHeader &&
          c.FormViewerDetails != null &&
          c.FormViewerDetails.BasicDetails != null &&
          c.FormViewerDetails.BasicDetails.SequenceInfo != null &&
          c.FormViewerDetails.BasicDetails.SequenceInfo.GroupSequenceNo ==
            SequenceGroupNo &&
          !String.Equals(
            c.PrescriptionItemStatus,
            CConstants.CANCELLED,
            StringComparison.InvariantCultureIgnoreCase
          ) &&
          !String.Equals(
            c.PrescriptionItemStatus,
            CConstants.COMPLETED,
            StringComparison.InvariantCultureIgnoreCase
          ) &&
          !String.Equals(
            c.PrescriptionItemStatus,
            CConstants.DISCONTINUED,
            StringComparison.InvariantCultureIgnoreCase
          ) &&
          c.FormViewerDetails.BasicDetails.StartPrescriptionTime !=
            DateTime.MinValue &&
          c.FormViewerDetails.BasicDetails.SequenceInfo
            .IsAnyItemAdministeredInSeqGroup == 0
      )
        .OrderBy(
          (i) => i.FormViewerDetails.BasicDetails.SequenceInfo.ItemSequenceNo
        )
        .FirstOrDefault();
      if (
        _tmpPresItemVM != null &&
        _tmpPresItemVM.FormViewerDetails != null &&
        _tmpPresItemVM.FormViewerDetails.BasicDetails != null
      ) {
        oSeqDetail = _tmpPresItemVM.FormViewerDetails.BasicDetails.SequenceInfo;
      }
    }
    return oSeqDetail;
  }
  public static GetFirstDiscancelActiveItemSeqItemVM(
    MedsResolve: ObservableCollection<PrescriptionItemVM>,
    SequenceGroupNo: number
  ): SequenceDetail {
    let oSeqDetail: SequenceDetail = null;
    if (MedsResolve != null && MedsResolve.Count > 0 && SequenceGroupNo > 0) {
      let _tmpPresItemVM: PrescriptionItemVM = MedsResolve.Where(
        (c) =>
          c != null &&
          !c.IsGroupHeader &&
          c.FormViewerDetails != null &&
          c.FormViewerDetails.BasicDetails != null &&
          c.FormViewerDetails.BasicDetails.SequenceInfo != null &&
          c.FormViewerDetails.BasicDetails.SequenceInfo.GroupSequenceNo ==
            SequenceGroupNo &&
          !String.Equals(
            c.PrescriptionItemStatus,
            CConstants.CANCELLED,
            StringComparison.InvariantCultureIgnoreCase
          ) &&
          !String.Equals(
            c.PrescriptionItemStatus,
            CConstants.COMPLETED,
            StringComparison.InvariantCultureIgnoreCase
          ) &&
          !String.Equals(
            c.PrescriptionItemStatus,
            CConstants.DISCONTINUED,
            StringComparison.InvariantCultureIgnoreCase
          ) &&
          c.FormViewerDetails.BasicDetails.StartPrescriptionTime !=
            DateTime.MinValue
      )
        .OrderBy(
          (i) => i.FormViewerDetails.BasicDetails.SequenceInfo.ItemSequenceNo
        )
        .FirstOrDefault();
      if (
        _tmpPresItemVM != null &&
        _tmpPresItemVM.FormViewerDetails != null &&
        _tmpPresItemVM.FormViewerDetails.BasicDetails != null
      ) {
        oSeqDetail = _tmpPresItemVM.FormViewerDetails.BasicDetails.SequenceInfo;
      }
    }
    return oSeqDetail;
  }
  public static ReassignItemSequenceOnAmend(
    MedsResolve: ObservableCollection<PrescriptionItemVM>,
    _GroupSequenceNo: number,
    ResetStartItemSeqno: number,
    newStartDTTM: DateTime,
    ActionCode: ActivityTypes,
    TimeMinValueFlag: boolean
  ): void {
    let nResetStartItemSeqNo: number = ResetStartItemSeqno;
    let ItemsRequiredChangeInGroup: IEnumerable<PrescriptionItemVM> =
      MedsResolve.Where(
        (c) =>
          !c.IsGroupHeader &&
          c.FormViewerDetails != null &&
          c.FormViewerDetails.BasicDetails != null &&
          c.FormViewerDetails.BasicDetails.SequenceInfo != null &&
          c.FormViewerDetails.BasicDetails.SequenceInfo.GroupSequenceNo > 0 &&
          c.FormViewerDetails.BasicDetails.SequenceInfo.GroupSequenceNo ==
            _GroupSequenceNo &&
          c.FormViewerDetails.BasicDetails.SequenceInfo.ItemSequenceNo >=
            ResetStartItemSeqno &&
          !String.IsNullOrEmpty(c.PrescriptionItemStatus) &&
          !(
            c.PrescriptionItemStatus.Equals(
              CConstants.COMPLETED,
              StringComparison.InvariantCultureIgnoreCase
            ) ||
            c.PrescriptionItemStatus.Equals(
              CConstants.CANCELLED,
              StringComparison.InvariantCultureIgnoreCase
            ) ||
            c.PrescriptionItemStatus.Equals(
              CConstants.DISCONTINUED,
              StringComparison.InvariantCultureIgnoreCase
            )
          )
      );
    if (
      ItemsRequiredChangeInGroup != null &&
      ItemsRequiredChangeInGroup.Count() > 0
    ) {
      let cnt: number = 1;
      let count: number = ItemsRequiredChangeInGroup.Count();
      ItemsRequiredChangeInGroup.forEach((item) => {
        if (item != null) {
          if (
            item.FormViewerDetails.BasicDetails.SequenceInfo
              .ParentPrescriptionItemOID > 0
          ) {
            item.FormViewerDetails.BasicDetails.SequenceInfo.ItemSequenceNo =
              ++ResetStartItemSeqno;
            if (String.IsNullOrEmpty(item.OperationMode)) {
              item.OperationMode = 'U';
              item.ActionCode = ActivityTypes.Amend;
            }
            item.SequentialActionPerfromCodeAEITS =
              CAActivity.SequentialActionCodeAEITS;
            item.FormViewerDetails.BasicDetails.SequenceInfo.IsSequentialStartDTTMUpdated =
              true;
          }
          if (cnt == count) {
            item.FormViewerDetails.BasicDetails.SequenceInfo.IsLastItem = true;
          } else {
            item.FormViewerDetails.BasicDetails.SequenceInfo.IsLastItem = false;
          }
        }
        cnt++;
      });
    }
  }
  public static ReSetStartEnd_DateTIme_OnAmend(
    MedsResolve: ObservableCollection<PrescriptionItemVM>,
    _GroupSequenceNo: number,
    ResetStartItemSeqno: number,
    ActionCode: ActivityTypes,
    TimeMinValueFlag: boolean
  ): void {
    let ItemsRequiredChangeInGroup: IEnumerable<PrescriptionItemVM> =
      MedsResolve.Where(
        (c) =>
          !c.IsGroupHeader &&
          c.FormViewerDetails != null &&
          c.FormViewerDetails.BasicDetails != null &&
          c.FormViewerDetails.BasicDetails.SequenceInfo != null &&
          c.FormViewerDetails.BasicDetails.SequenceInfo.GroupSequenceNo > 0 &&
          c.FormViewerDetails.BasicDetails.SequenceInfo.GroupSequenceNo ==
            _GroupSequenceNo &&
          c.FormViewerDetails.BasicDetails.SequenceInfo.ItemSequenceNo >=
            ResetStartItemSeqno
      );
    if (
      ItemsRequiredChangeInGroup != null &&
      ItemsRequiredChangeInGroup.Count() > 0
    ) {
      let count: number = ItemsRequiredChangeInGroup.Count();
      ItemsRequiredChangeInGroup.forEach((item) => {
        if (item != null) {
          let curitemGrpSeqno: number = 0,
            curitemSeqno = 0;
          let sOrdSetgrpID: string = item.OrderSetGroupID;
          if (
            item.FormViewerDetails != null &&
            item.FormViewerDetails.BasicDetails != null
          ) {
            if (item.FormViewerDetails.BasicDetails.SequenceInfo != null) {
              curitemGrpSeqno =
                item.FormViewerDetails.BasicDetails.SequenceInfo
                  .GroupSequenceNo;
              curitemSeqno =
                item.FormViewerDetails.BasicDetails.SequenceInfo.ItemSequenceNo;
            }
            if (
              String.IsNullOrEmpty(sOrdSetgrpID) &&
              item.FormViewerDetails.BasicDetails.Ordersets != null &&
              !String.IsNullOrEmpty(
                item.FormViewerDetails.BasicDetails.Ordersets.Value
              )
            ) {
              sOrdSetgrpID =
                item.FormViewerDetails.BasicDetails.Ordersets.Value;
            }
          }
          let nPrevItemSeqNo: number = curitemSeqno - 1;
          nPrevItemSeqNo = CommonSequentialHelper.GetPrevActiveItemInSeq(
            MedsResolve,
            curitemGrpSeqno,
            nPrevItemSeqNo
          );
          let nxtItemStartDttm: DateTime =
            CommonSequentialHelper.GetStartDTTM4OrdersetNextItem(
              MedsResolve,
              sOrdSetgrpID,
              curitemGrpSeqno,
              nPrevItemSeqNo
            );
          if (
            item.FormViewerDetails.BasicDetails.SequenceInfo
              .ParentPrescriptionItemOID > 0 &&
            !String.IsNullOrEmpty(item.PrescriptionItemStatus) &&
            !(
              item.PrescriptionItemStatus.Equals(
                CConstants.COMPLETED,
                StringComparison.InvariantCultureIgnoreCase
              ) ||
              item.PrescriptionItemStatus.Equals(
                CConstants.CANCELLED,
                StringComparison.InvariantCultureIgnoreCase
              ) ||
              item.PrescriptionItemStatus.Equals(
                CConstants.DISCONTINUED,
                StringComparison.InvariantCultureIgnoreCase
              )
            )
          ) {
            if (String.IsNullOrEmpty(item.OperationMode)) {
              item.OperationMode = 'U';
              item.ActionCode = ActivityTypes.Amend;
            }
            item.SequentialActionPerfromCodeAEITS =
              CAActivity.SequentialActionCodeAEITS;
            item.FormViewerDetails.BasicDetails.SequenceInfo.IsSequentialStartDTTMUpdated =
              true;
            CommonSequentialHelper.NonIVResetStartEndDateTime(
              MedsResolve,
              item,
              nxtItemStartDttm,
              TimeMinValueFlag
            );
          } else {
            CommonSequentialHelper.NonIVResetStartEndDateTime(
              MedsResolve,
              item,
              nxtItemStartDttm,
              TimeMinValueFlag
            );
          }
        }
      });
    }
  }
  public static ReassignSequenceNoOnRemove(
    MedsResolve: ObservableCollection<PrescriptionItemVM>,
    InfusionGroupSequenceNo: number,
    SeqNoReassignType: eCommonSequenceNoReassignType,
    oParentBaseVM: IPPMABaseVM
  ): void {
    if (MedsResolve != null && InfusionGroupSequenceNo > 0) {
      if (
        SeqNoReassignType == eCommonSequenceNoReassignType.ReassignWithinGroup
      ) {
        let RemainingItemsInGroup = MedsResolve.Where(
          (c) =>
            !c.IsGroupHeader &&
            c.FormViewerDetails.BasicDetails.SequenceInfo != null &&
            c.FormViewerDetails.BasicDetails.SequenceInfo.GroupSequenceNo > 0 &&
            c.FormViewerDetails.BasicDetails.SequenceInfo.GroupSequenceNo ==
              InfusionGroupSequenceNo &&
            c.FormViewerDetails.BasicDetails.SequenceInfo.ItemSequenceNo > 0
        );
        if (
          RemainingItemsInGroup != null &&
          RemainingItemsInGroup.Count() > 0
        ) {
          CommonSequentialHelper.ReassignItemSequenceOnRemove(
            InfusionGroupSequenceNo,
            RemainingItemsInGroup
          );
        } else {
          CommonSequentialHelper.RemoveSequenceHeader(
            MedsResolve,
            InfusionGroupSequenceNo
          );
          CSequentialHelper.CommonReassignGroupSequenceOnRemove(
            MedsResolve,
            InfusionGroupSequenceNo,
            oParentBaseVM
          );
        }
      } else {
        CSequentialHelper.CommonReassignGroupSequenceOnRemove(
          MedsResolve,
          InfusionGroupSequenceNo,
          oParentBaseVM
        );
      }
    }
  }
  public static ResetItemSequence_StartDTTMOnRemove(
    _UniqueGroupSequenceNo: List<number>,
    MedsResolve: ObservableCollection<PrescriptionItemVM>,
    _ActivityCode: ActivityTypes
  ): void {
    if (
      _UniqueGroupSequenceNo != null &&
      _UniqueGroupSequenceNo.Count > 0 &&
      MedsResolve != null
    ) {
      _UniqueGroupSequenceNo.forEach((itemIndex) => {
        let objFirstActiveItemInGroup: SequenceDetail =
          CommonSequentialHelper.GetFirstActiveItemSeqItemVM(
            MedsResolve,
            itemIndex
          );
        let dtFirstItemStartDTTM: DateTime =
          CommonSequentialHelper.GetFirstActiveItemStartDTTM(
            MedsResolve,
            itemIndex
          );
        if (
          objFirstActiveItemInGroup != null &&
          DateTime.NotEquals(dtFirstItemStartDTTM, DateTime.MinValue)
        ) {
          let ResetItemSeqno: number =
            objFirstActiveItemInGroup.ItemSequenceNo + 1;
          CommonSequentialHelper.ReSetStartEnd_DateTIme_OnAmend(
            MedsResolve,
            objFirstActiveItemInGroup.GroupSequenceNo,
            ResetItemSeqno,
            _ActivityCode,
            true
          );
        }
      });
    }
  }
  private static ReassignGroupSequenceOnRemove(
    MedsResolve: ObservableCollection<PrescriptionItemVM>,
    RemovedGroupSequenceNo: number,
    oParentBaseVM: IPPMABaseVM
  ): void {
    if (MedsResolve != null && RemovedGroupSequenceNo > 0) {
      // let _GroupedSequence = from item in MedsResolve
      // where item.FormViewerDetails.BasicDetails.SequenceInfo != null && item.FormViewerDetails.BasicDetails.SequenceInfo.GroupSequenceNo > 0
      //     && item.FormViewerDetails.BasicDetails.SequenceInfo.GroupSequenceNo >= RemovedGroupSequenceNo
      // group item by item.FormViewerDetails.BasicDetails.SequenceInfo.GroupSequenceNo into g
      // orderby g.Key
      // select g;
      let _GroupedSequence = MedsResolve.Where(
        (item) =>
          item.FormViewerDetails.BasicDetails.SequenceInfo != null &&
          item.FormViewerDetails.BasicDetails.SequenceInfo.GroupSequenceNo >
            0 &&
          item.FormViewerDetails.BasicDetails.SequenceInfo.GroupSequenceNo >=
            RemovedGroupSequenceNo
      )
        .GroupBy(
          (item) =>
            item.FormViewerDetails.BasicDetails.SequenceInfo.GroupSequenceNo
        )
        .OrderBy((g) => g.Key);
      let _IsLastGroupRemoved: boolean = true;
      if (_GroupedSequence != null && _GroupedSequence.Count() > 0) {
        _IsLastGroupRemoved = false;
        _GroupedSequence.forEach((sequence) => {
          if (sequence != null && sequence.Count() == 1) {
            let _TempHeaderRow: PrescriptionItemVM = sequence.ElementAt(0);
            if (_TempHeaderRow != null && _TempHeaderRow.IsGroupHeader) {
              MedsResolve.Remove(_TempHeaderRow);
            }
          } else {
            CommonSequentialHelper.ReassignItemSequenceOnRemove(
              RemovedGroupSequenceNo,
              sequence.OrderBy(
                (i) =>
                  i.FormViewerDetails.BasicDetails.SequenceInfo.ItemSequenceNo
              )
            );
            RemovedGroupSequenceNo++;
          }
        });
      }
      if (_IsLastGroupRemoved) {
        oParentBaseVM.LastInfusionGroupSequenceNo = --RemovedGroupSequenceNo;
      } else {
        let iMaxSeqGroupNo: number = MedsResolve.Where(
          (c) =>
            c.IsGroupHeader &&
            c.FormViewerDetails != null &&
            c.FormViewerDetails.BasicDetails != null &&
            c.FormViewerDetails.BasicDetails.SequenceInfo != null &&
            c.FormViewerDetails.BasicDetails.SequenceInfo.GroupSequenceNo > 0
        ).Max(
          (i) => i.FormViewerDetails.BasicDetails.SequenceInfo.GroupSequenceNo
        );
        if (iMaxSeqGroupNo == 0) {
          oParentBaseVM.LastInfusionGroupSequenceNo =
            oParentBaseVM.OriginalLastInfusionGroupSequence;
        } else {
          oParentBaseVM.LastInfusionGroupSequenceNo = iMaxSeqGroupNo;
        }
      }
    }
  }
  public static ReassignItemSequenceOnRemove(
    _GroupSequenceNo: number,
    ItemsInGroup: IEnumerable<PrescriptionItemVM>
  ): void {
    if (ItemsInGroup != null && ItemsInGroup.Count() > 0) {
      ItemsInGroup = ItemsInGroup.OrderBy(
        (i) => i.FormViewerDetails.BasicDetails.SequenceInfo.ItemSequenceNo
      ).AsEnumerable();
      let nTotalItemCount: number = ItemsInGroup.Where(
        (x) => !x.IsGroupHeader
      ).Max(
        (i) => i.FormViewerDetails.BasicDetails.SequenceInfo.ItemSequenceNo
      );
      let _SequenceNo: number = 1;
      let _PrevItemOID: string, _PrevItemIdentifyingName;
      _PrevItemOID = _PrevItemIdentifyingName = String.Empty;
      let lstAllSequenceName: ObservableCollection<CListItem> = null;
      ItemsInGroup.forEach((item) => {
        let _InfVM: SequenceDetail =
          item.FormViewerDetails.BasicDetails.SequenceInfo;
        _InfVM.GroupSequenceNo = _GroupSequenceNo;
        _InfVM.TotalItemsInGroupSequence = nTotalItemCount;
        if (!item.IsGroupHeader) {
          _InfVM.IsLastItem = false;
          _InfVM.ItemSequenceNo =
            item.FormViewerDetails.BasicDetails.SequenceInfo
              .ParentPrescriptionItemOID > 0
              ? item.FormViewerDetails.BasicDetails.SequenceInfo.ItemSequenceNo
              : _SequenceNo;
          _SequenceNo++;
        } else {
          item.FormViewerDetails.BasicDetails.SequenceInfo.GroupSequenceNo =
            _GroupSequenceNo;
          item.GroupHeaderName = String.Concat(
            String.Format(
              Resource.Infusion.SequenceGroupHeader_Text,
              _GroupSequenceNo
            )
          );
          item.PrescriptionItem = item.GroupHeaderName;
        }
      });
      if (ItemsInGroup != null && ItemsInGroup.LastOrDefault() != null) {
        let oTempItemInGroup = ItemsInGroup.LastOrDefault();
        if (
          oTempItemInGroup != null &&
          oTempItemInGroup.FormViewerDetails != null &&
          oTempItemInGroup.FormViewerDetails.BasicDetails != null &&
          oTempItemInGroup.FormViewerDetails.BasicDetails.SequenceInfo != null
        ) {
          ItemsInGroup.LastOrDefault().FormViewerDetails.BasicDetails.SequenceInfo.IsLastItem =
            true;
        }
      }
    }
  }
  public static RemoveSequenceHeader(
    MedsResolve: ObservableCollection<PrescriptionItemVM>,
    InfusionGroupSequenceNo: number
  ): void {
    if (MedsResolve != null && InfusionGroupSequenceNo > 0) {
      let _SeqHeader: PrescriptionItemVM = MedsResolve.FirstOrDefault(
        (c) =>
          c.IsGroupHeader &&
          c.FormViewerDetails.BasicDetails.SequenceInfo != null &&
          c.FormViewerDetails.BasicDetails.SequenceInfo.GroupSequenceNo > 0 &&
          c.FormViewerDetails.BasicDetails.SequenceInfo.GroupSequenceNo ==
            InfusionGroupSequenceNo &&
          c.FormViewerDetails.BasicDetails.SequenceInfo.ItemSequenceNo == 0
      );
      if (_SeqHeader != null) {
        MedsResolve.Remove(_SeqHeader);
      }
    }
  }
  public static GetSequenceGroupNo4Orderset(
    MedsResolve: ObservableCollection<PrescriptionItemVM>,
    ordersetID: string
  ): number {
    let lnGroupSequenceNo: number = 0;
    if (MedsResolve != null && !String.IsNullOrEmpty(ordersetID)) {
      let _SeqItem: PrescriptionItemVM = null;
      MedsResolve.forEach((c)=>{
        if(c.FormViewerDetails != null &&
          c.FormViewerDetails.BasicDetails != null &&
          c.FormViewerDetails.BasicDetails.Ordersets != null &&
          c.FormViewerDetails.BasicDetails.Ordersets.Value == ordersetID &&
          c.FormViewerDetails.BasicDetails.SequenceInfo != null &&
          c.FormViewerDetails.BasicDetails.SequenceInfo.GroupSequenceNo > 0 &&
          !String.IsNullOrEmpty(c.OperationMode) &&
          c.OperationMode.Equals('N')){
            _SeqItem = c;
          }
      });
      // let _SeqItem: PrescriptionItemVM = MedsResolve.FirstOrDefault(
      //   (c) =>
      //     c.FormViewerDetails != null &&
      //     c.FormViewerDetails.BasicDetails != null &&
      //     c.FormViewerDetails.BasicDetails.Ordersets != null &&
      //     c.FormViewerDetails.BasicDetails.Ordersets.Value == ordersetID &&
      //     c.FormViewerDetails.BasicDetails.SequenceInfo != null &&
      //     c.FormViewerDetails.BasicDetails.SequenceInfo.GroupSequenceNo > 0 &&
      //     !String.IsNullOrEmpty(c.OperationMode) &&
      //     c.OperationMode.Equals('N')
      // );
      if (_SeqItem != null) {
        lnGroupSequenceNo =
          _SeqItem.FormViewerDetails.BasicDetails.SequenceInfo.GroupSequenceNo;
      }
    }
    return lnGroupSequenceNo;
  }
  public static GetStartDTTM4OrdersetNextItem(
    MedsResolve: ObservableCollection<PrescriptionItemVM>,
    ordersetID: string,
    nGropSeqNo: number,
    nItemSeqNo: number
  ): DateTime {
    let dtSeqNextStartDTTM: DateTime = DateTime.MinValue;
    if (MedsResolve != null) {
      let _SeqItem: PrescriptionItemVM = null;
      if (nGropSeqNo > 0 && nItemSeqNo > 0) {
        _SeqItem = MedsResolve.FirstOrDefault(
          (c) =>
            c.FormViewerDetails != null &&
            c.FormViewerDetails.BasicDetails != null &&
            c.FormViewerDetails.BasicDetails.SequenceInfo != null &&
            c.FormViewerDetails.BasicDetails.SequenceInfo.GroupSequenceNo ==
              nGropSeqNo &&
            c.FormViewerDetails.BasicDetails.SequenceInfo.ItemSequenceNo ==
              nItemSeqNo
        );
      } else if (!String.IsNullOrEmpty(ordersetID)) {
        let iTotalItemInSeq: number = MedsResolve.Where(
          (c) =>
            c.FormViewerDetails != null &&
            c.FormViewerDetails.BasicDetails != null &&
            c.FormViewerDetails.BasicDetails.Ordersets != null &&
            c.FormViewerDetails.BasicDetails.Ordersets.Value == ordersetID &&
            c.FormViewerDetails.BasicDetails.SequenceInfo != null &&
            c.FormViewerDetails.BasicDetails.SequenceInfo.GroupSequenceNo > 0 &&
            !String.IsNullOrEmpty(c.OperationMode) &&
            c.OperationMode.Equals('N')
        ).Count();
        _SeqItem = MedsResolve.FirstOrDefault(
          (c) =>
            c.FormViewerDetails != null &&
            c.FormViewerDetails.BasicDetails != null &&
            c.FormViewerDetails.BasicDetails.Ordersets != null &&
            c.FormViewerDetails.BasicDetails.Ordersets.Value == ordersetID &&
            c.FormViewerDetails.BasicDetails.SequenceInfo != null &&
            c.FormViewerDetails.BasicDetails.SequenceInfo.GroupSequenceNo > 0 &&
            c.FormViewerDetails.BasicDetails.SequenceInfo.ItemSequenceNo ==
              iTotalItemInSeq
        );
      }
      if (_SeqItem != null) {
        dtSeqNextStartDTTM =
          PrescriptionHelper.GetStarDTTM4SequenceBasedOnDuration(_SeqItem);
        if (DateTime.NotEquals(dtSeqNextStartDTTM, DateTime.MinValue)) {
          dtSeqNextStartDTTM = dtSeqNextStartDTTM
            .ToUniversalTime()
            .AddMinutes(1)
            .ToLocalTime();
        }
      }
    }
    return dtSeqNextStartDTTM;
  }
  public static GetStopDTTM4OrdersetCurItem(
    MedsResolve: ObservableCollection<PrescriptionItemVM>,
    ordersetID: string,
    nGropSeqNo: number,
    nItemSeqNo: number
  ): DateTime {
    let dtSeqNextStartDTTM: DateTime = DateTime.MinValue;
    if (MedsResolve != null) {
      let _SeqItem: PrescriptionItemVM = null;
      if (nGropSeqNo > 0 && nItemSeqNo > 0) {
        _SeqItem = MedsResolve.FirstOrDefault(
          (c) =>
            c.FormViewerDetails != null &&
            c.FormViewerDetails.BasicDetails != null &&
            c.FormViewerDetails.BasicDetails.SequenceInfo != null &&
            c.FormViewerDetails.BasicDetails.SequenceInfo.GroupSequenceNo ==
              nGropSeqNo &&
            c.FormViewerDetails.BasicDetails.SequenceInfo.ItemSequenceNo ==
              nItemSeqNo
        );
      } else if (!String.IsNullOrEmpty(ordersetID)) {
        let iTotalItemInSeq: number = MedsResolve.Where(
          (c) =>
            c.FormViewerDetails != null &&
            c.FormViewerDetails.BasicDetails != null &&
            c.FormViewerDetails.BasicDetails.Ordersets != null &&
            c.FormViewerDetails.BasicDetails.Ordersets.Value == ordersetID &&
            c.FormViewerDetails.BasicDetails.SequenceInfo != null &&
            c.FormViewerDetails.BasicDetails.SequenceInfo.GroupSequenceNo > 0 &&
            !String.IsNullOrEmpty(c.OperationMode) &&
            c.OperationMode.Equals('N')
        ).Count();
        _SeqItem = MedsResolve.FirstOrDefault(
          (c) =>
            c.FormViewerDetails != null &&
            c.FormViewerDetails.BasicDetails != null &&
            c.FormViewerDetails.BasicDetails.Ordersets != null &&
            c.FormViewerDetails.BasicDetails.Ordersets.Value == ordersetID &&
            c.FormViewerDetails.BasicDetails.SequenceInfo != null &&
            c.FormViewerDetails.BasicDetails.SequenceInfo.GroupSequenceNo > 0 &&
            c.FormViewerDetails.BasicDetails.SequenceInfo.ItemSequenceNo ==
              iTotalItemInSeq
        );
      }
      if (_SeqItem != null) {
        dtSeqNextStartDTTM =
          PrescriptionHelper.GetStarDTTM4SequenceBasedOnDuration(_SeqItem);
      }
    }
    return dtSeqNextStartDTTM;
  }
  public static ClearSeqProperties(oItem: PrescriptionItemVM): void {
    if (
      oItem != null &&
      oItem.FormViewerDetails != null &&
      oItem.FormViewerDetails.BasicDetails != null &&
      oItem.FormViewerDetails.BasicDetails.SequenceInfo != null
    ) {
      let _SeqDetail: SequenceDetail =
        oItem.FormViewerDetails.BasicDetails.SequenceInfo;
      _SeqDetail.GroupSequenceNo = 0;
      _SeqDetail.IsSequentiallinkvisi = Visibility.Collapsed;
      _SeqDetail.ItemSequenceNo = 0;
      _SeqDetail.ParentPrescriptionItemOID = 0;
      _SeqDetail.PrescriptionItemNumber = 0;
      _SeqDetail.TotalItemsInGroupSequence = 0;
      oItem.FormViewerDetails.BasicDetails.IsSequentiallinkvisi =
        Visibility.Collapsed;
    }
  }
  public static CreateInfusionGroupHeader(
    GroupSequenceNo: number,
    MedsResolve: ObservableCollection<PrescriptionItemVM>
  ): void {
    let ors: OrderSetHelper = new OrderSetHelper();
    let _SequenceHeaderIndex: number = 0;
    let oGroupHeader: PrescriptionItemVM = ors.GetSeqGropingHeader(
      String.Format(
        Resource.Infusion.SequenceGroupHeader_Text,
        GroupSequenceNo
      ),
      0,
      PatientContext.PrescriptionType,
      DateTime.MinValue,
      true
    );
    oGroupHeader.FormViewerDetails.BasicDetails.SequenceInfo.GroupSequenceNo =
      GroupSequenceNo;
    MedsResolve.Insert(_SequenceHeaderIndex, oGroupHeader);
  }
  public static SetSeqPropertiesOnFormViewerClose(
    objNewItemVM: PrescriptionItemVM,
    MedsResolve: ObservableCollection<PrescriptionItemVM>,
    oIPPABaseVM: IPPMABaseVM
  ): void {
    if (
      objNewItemVM != null &&
      objNewItemVM.FormViewerDetails != null &&
      objNewItemVM.FormViewerDetails.BasicDetails != null &&
      objNewItemVM.FormViewerDetails.BasicDetails.OrdersetSequence != null
    ) {
      if (
        objNewItemVM.FormViewerDetails.BasicDetails.SequenceInfo
          .ItemSequenceNo == 0
      ) {
        if (
          objNewItemVM.FormViewerDetails.BasicDetails.SequenceInfo
            .GroupSequenceNo > 0
        ) {
          objNewItemVM.FormViewerDetails.BasicDetails.SequenceInfo.ItemSequenceNo =
            CommonSequentialHelper.GetNextItemSequenceNo(
              MedsResolve,
              oIPPABaseVM.oTempPrescDisCancelItemVM,
              objNewItemVM.FormViewerDetails.BasicDetails.SequenceInfo
                .GroupSequenceNo
            );
          CommonSequentialHelper.UpdateTotalItemsInGroupSequence(
            objNewItemVM.FormViewerDetails.BasicDetails.SequenceInfo
              .GroupSequenceNo,
            MedsResolve,
            objNewItemVM
          );
        } else {
          objNewItemVM.FormViewerDetails.BasicDetails.SequenceInfo.GroupSequenceNo =
            CommonSequentialHelper.GetNextGroupSequenceNo(
              MedsResolve,
              oIPPABaseVM.LastInfusionGroupSequenceNo
            );
          oIPPABaseVM.LastInfusionGroupSequenceNo =
            objNewItemVM.FormViewerDetails.BasicDetails.SequenceInfo.GroupSequenceNo;
          CommonSequentialHelper.CreateInfusionGroupHeader(
            objNewItemVM.FormViewerDetails.BasicDetails.SequenceInfo
              .GroupSequenceNo,
            MedsResolve
          );
          objNewItemVM.FormViewerDetails.BasicDetails.SequenceInfo.ItemSequenceNo = 1;
          objNewItemVM.FormViewerDetails.BasicDetails.SequenceInfo.TotalItemsInGroupSequence = 1;
          objNewItemVM.FormViewerDetails.BasicDetails.SequenceInfo.IsLastItem =
            false;
        }
      }
    } else {
      objNewItemVM.FormViewerDetails.BasicDetails.SequenceInfo.GroupSequenceNo = 0;
      objNewItemVM.FormViewerDetails.BasicDetails.SequenceInfo.ItemSequenceNo = 0;
      objNewItemVM.FormViewerDetails.BasicDetails.SequenceInfo.TotalItemsInGroupSequence = 0;
      objNewItemVM.FormViewerDetails.BasicDetails.SequenceInfo.PrescriptionItemNumber = 0;
      objNewItemVM.FormViewerDetails.BasicDetails.SequenceInfo.ParentPrescriptionItemOID = 0;
      objNewItemVM.FormViewerDetails.BasicDetails.IsSequentiallinkvisi =
        Visibility.Collapsed;
      objNewItemVM.FormViewerDetails.BasicDetails.SequenceInfo.IsLastItem =
        false;
    }
  }
  public static GetFirstActiveItemStartDTTM(
    MedsResolve: ObservableCollection<PrescriptionItemVM>,
    SequenceGroupNo: number
  ): DateTime {
    let FirstActiveItemStartDTTM: DateTime = DateTime.MinValue;
    if (MedsResolve != null && MedsResolve.Count > 0 && SequenceGroupNo > 0) {
      FirstActiveItemStartDTTM = MedsResolve.Where(
        (c) =>
          c != null &&
          !c.IsGroupHeader &&
          c.FormViewerDetails != null &&
          c.FormViewerDetails.BasicDetails != null &&
          c.FormViewerDetails.BasicDetails.SequenceInfo != null &&
          c.FormViewerDetails.BasicDetails.SequenceInfo.GroupSequenceNo ==
            SequenceGroupNo &&
          !String.Equals(
            c.PrescriptionItemStatus,
            CConstants.CANCELLED,
            StringComparison.InvariantCultureIgnoreCase
          ) &&
          !String.Equals(
            c.PrescriptionItemStatus,
            CConstants.COMPLETED,
            StringComparison.InvariantCultureIgnoreCase
          ) &&
          !String.Equals(
            c.PrescriptionItemStatus,
            CConstants.DISCONTINUED,
            StringComparison.InvariantCultureIgnoreCase
          ) &&
          c.FormViewerDetails.BasicDetails.StartPrescriptionTime !=
            DateTime.MinValue &&
          c.FormViewerDetails.BasicDetails.SequenceInfo.ItemSequenceNo > 0
      )
        .OrderBy(
          (i) => i.FormViewerDetails.BasicDetails.SequenceInfo.ItemSequenceNo
        )
        .Select((s) => s.FormViewerDetails.BasicDetails.StartPrescriptionTime)
        .FirstOrDefault();
    }
    return FirstActiveItemStartDTTM;
  }
  public static IsFirstSequentialInfusionHeader(
    item: PrescriptionItemVM,
    list: ObservableCollection<PrescriptionItemVM>
  ): boolean {
    if (list == null || item == null) return false;
    if (
      String.Equals(
        item.FormViewerDetails.BasicDetails.GroupHeaderName,
        CConstants.sAUTHORISE,
        StringComparison.InvariantCultureIgnoreCase
      )
    )
      return false;
    return item.Equals(
      list
        .Where(
          (x) =>
            x != null &&
            x.FormViewerDetails != null &&
            x.FormViewerDetails.BasicDetails != null &&
            x.FormViewerDetails.BasicDetails.SequenceInfo != null &&
            x.FormViewerDetails.BasicDetails.SequenceInfo.GroupSequenceNo > 0 &&
            (String.IsNullOrEmpty(x.PrescriptionItemStatus) ||
              (!x.PrescriptionItemStatus.Equals(
                CConstants.CANCELLED,
                StringComparison.OrdinalIgnoreCase
              ) &&
                !x.PrescriptionItemStatus.Equals(
                  CConstants.DISCONTINUED,
                  StringComparison.OrdinalIgnoreCase
                ) &&
                !x.PrescriptionItemStatus.Equals(
                  CConstants.COMPLETED,
                  StringComparison.OrdinalIgnoreCase
                )))
        )
        .FirstOrDefault()
    );
  }
  public static IsLastSequentialInfusionItem(
    item: PrescriptionItemVM,
    list: ObservableCollection<PrescriptionItemVM>
  ): boolean {
    if (list == null) return false;
    if (
      String.Equals(
        item.FormViewerDetails.BasicDetails.GroupHeaderName,
        CConstants.sAUTHORISE,
        StringComparison.InvariantCultureIgnoreCase
      )
    )
      return false;
    let isSequentialInfusionItem: boolean =
      item != null &&
      item.FormViewerDetails != null &&
      item.FormViewerDetails.BasicDetails != null &&
      item.FormViewerDetails.BasicDetails.SequenceInfo != null &&
      item.FormViewerDetails.BasicDetails.SequenceInfo.GroupSequenceNo > 0;
    if (!isSequentialInfusionItem) return false;
    let pos: number = list.IndexOf(item);
    if (pos == list.Count - 1) return true;
    let nextIsSequentialInfusionItem: boolean =
      list[pos + 1] != null &&
      list[pos + 1].FormViewerDetails != null &&
      list[pos + 1].FormViewerDetails.BasicDetails != null &&
      list[pos + 1].FormViewerDetails.BasicDetails.SequenceInfo != null &&
      list[pos + 1].FormViewerDetails.BasicDetails.SequenceInfo
        .GroupSequenceNo > 0;
    if (!nextIsSequentialInfusionItem) return true;
    return (
      item.FormViewerDetails.BasicDetails.SequenceInfo.GroupSequenceNo !=
      list[pos + 1].FormViewerDetails.BasicDetails.SequenceInfo.GroupSequenceNo
    );
  }
  public static UpdateTotalItemsInGroupSequence(
    nGroupSequenceNumber: number,
    MedsResolve: ObservableCollection<PrescriptionItemVM>,
    objNewItem: PrescriptionItemVM = null
  ): void {
    if (MedsResolve != null && MedsResolve.Count > 0) {
      let objSeqItems: IEnumerable<PrescriptionItemVM>;
      if (objNewItem != null) {
        objSeqItems = MedsResolve.Where(
          (x) =>
            x.FormViewerDetails.BasicDetails.SequenceInfo != null &&
            x.FormViewerDetails.BasicDetails.SequenceInfo.GroupSequenceNo ==
              nGroupSequenceNumber &&
            !x.IsGroupHeader &&
            x.FormViewerDetails.BasicDetails.SequenceInfo.ItemSequenceNo !=
              objNewItem.FormViewerDetails.BasicDetails.SequenceInfo
                .ItemSequenceNo
        );
      } else {
        objSeqItems = MedsResolve.Where(
          (x) =>
            x.FormViewerDetails.BasicDetails.SequenceInfo != null &&
            x.FormViewerDetails.BasicDetails.SequenceInfo.GroupSequenceNo ==
              nGroupSequenceNumber &&
            !x.IsGroupHeader
        );
      }
      let nTotSeqCount: number = 0;
      if (objSeqItems != null && objSeqItems.Count() > 0) {
        nTotSeqCount = objSeqItems.Max(
          (x) => x.FormViewerDetails.BasicDetails.SequenceInfo.ItemSequenceNo
        );
        if (
          objNewItem != null &&
          nTotSeqCount <
            objNewItem.FormViewerDetails.BasicDetails.SequenceInfo
              .ItemSequenceNo
        ) {
          nTotSeqCount =
            objNewItem.FormViewerDetails.BasicDetails.SequenceInfo
              .ItemSequenceNo;
        }
        objSeqItems.forEach((objSeqItem) => {
          objSeqItem.FormViewerDetails.BasicDetails.SequenceInfo.TotalItemsInGroupSequence =
            nTotSeqCount;
          objSeqItem.FormViewerDetails.BasicDetails.SequenceInfo.IsLastItem =
            false;
        });
      }
      if (objNewItem != null) {
        objNewItem.FormViewerDetails.BasicDetails.SequenceInfo.TotalItemsInGroupSequence =
          nTotSeqCount;
        objNewItem.FormViewerDetails.BasicDetails.SequenceInfo.IsLastItem =
          true;
      }
    }
  }
  public static GetPrevActiveItemInSeq(
    MedsResolve: ObservableCollection<PrescriptionItemVM>,
    _GroupSequenceNo: number,
    ItemSeqno: number
  ): number {
    let nPrevItemSeqNo: number = ItemSeqno;
    let _SeqItem: PrescriptionItemVM = MedsResolve.Where(
      (c) =>
        c != null &&
        !c.IsGroupHeader &&
        c.FormViewerDetails != null &&
        c.FormViewerDetails.BasicDetails != null &&
        c.FormViewerDetails.BasicDetails.SequenceInfo != null &&
        c.FormViewerDetails.BasicDetails.SequenceInfo.GroupSequenceNo ==
          _GroupSequenceNo &&
        !String.Equals(
          c.PrescriptionItemStatus,
          CConstants.CANCELLED,
          StringComparison.InvariantCultureIgnoreCase
        ) &&
        !String.Equals(
          c.PrescriptionItemStatus,
          CConstants.COMPLETED,
          StringComparison.InvariantCultureIgnoreCase
        ) &&
        !String.Equals(
          c.PrescriptionItemStatus,
          CConstants.DISCONTINUED,
          StringComparison.InvariantCultureIgnoreCase
        ) &&
        c.FormViewerDetails.BasicDetails.SequenceInfo.ItemSequenceNo <=
          ItemSeqno
    )
      .OrderBy(
        (i) => i.FormViewerDetails.BasicDetails.SequenceInfo.ItemSequenceNo
      )
      .LastOrDefault();
    if (
      _SeqItem != null &&
      _SeqItem.FormViewerDetails != null &&
      _SeqItem.FormViewerDetails.BasicDetails != null &&
      _SeqItem.FormViewerDetails.BasicDetails.SequenceInfo != null &&
      _SeqItem.FormViewerDetails.BasicDetails.SequenceInfo.ItemSequenceNo !=
        nPrevItemSeqNo
    ) {
      nPrevItemSeqNo =
        _SeqItem.FormViewerDetails.BasicDetails.SequenceInfo.ItemSequenceNo;
    }
    return nPrevItemSeqNo;
  }
  public static ResetStartDTTM4ActiveFirstItemBasedOnCanDisAction(
    MedsResolve: ObservableCollection<PrescriptionItemVM>,
    dictAmendSeqGrpDetail: Dictionary<number, string>
  ): void {
    if (dictAmendSeqGrpDetail != null && MedsResolve != null) {
      dictAmendSeqGrpDetail.forEach((objSeqDet) => {
        if (objSeqDet.Key > 0 && !String.IsNullOrEmpty(objSeqDet.Value)) {
          let sInfo: string[] = objSeqDet.Value.Split('~');
          if (sInfo != null && sInfo.length > 0) {
            let DtCanDisFirtItemStartDTTM: DateTime = DateTime.MinValue;
            if (sInfo[1] != null && !String.IsNullOrEmpty(sInfo[1])) {
              DtCanDisFirtItemStartDTTM = Convert.ToDateTime(sInfo[1]);
            }
            let objPitem: PrescriptionItemVM = MedsResolve.Where(
              (c) =>
                c != null &&
                !c.IsGroupHeader &&
                c.FormViewerDetails != null &&
                c.FormViewerDetails.BasicDetails != null &&
                c.FormViewerDetails.BasicDetails.SequenceInfo != null &&
                c.FormViewerDetails.BasicDetails.SequenceInfo.GroupSequenceNo ==
                  objSeqDet.Key &&
                !String.Equals(
                  c.PrescriptionItemStatus,
                  CConstants.CANCELLED,
                  StringComparison.InvariantCultureIgnoreCase
                ) &&
                !String.Equals(
                  c.PrescriptionItemStatus,
                  CConstants.COMPLETED,
                  StringComparison.InvariantCultureIgnoreCase
                ) &&
                !String.Equals(
                  c.PrescriptionItemStatus,
                  CConstants.DISCONTINUED,
                  StringComparison.InvariantCultureIgnoreCase
                )
            ).FirstOrDefault();
            if (
              DateTime.NotEquals(DtCanDisFirtItemStartDTTM, DateTime.MinValue) &&
              objPitem != null &&
              objPitem.FormViewerDetails != null &&
              objPitem.FormViewerDetails.BasicDetails != null
            ) {
              let IsStartDTTMUpdated: boolean = false;
              if (
                sInfo[0] != null &&
                !String.IsNullOrEmpty(sInfo[0]) &&
                (sInfo[0].Equals(CConstants.CANCELLED) ||
                  sInfo[0].Equals(CConstants.DISCONTINUED))
              ) {
                CommonSequentialHelper.NonIVResetStartEndDateTime(
                  MedsResolve,
                  objPitem,
                  DtCanDisFirtItemStartDTTM,
                  false
                );
                IsStartDTTMUpdated = true;
              }
              if (
                IsStartDTTMUpdated &&
                String.IsNullOrEmpty(objPitem.OperationMode)
              ) {
                objPitem.OperationMode = 'U';
                objPitem.ActionCode = ActivityTypes.Amend;
              }
              objPitem.SequentialActionPerfromCodeAEITS =
                CAActivity.SequentialActionCodeAEITS;
              objPitem.FormViewerDetails.BasicDetails.SequenceInfo.IsSequentialStartDTTMUpdated =
                true;
            }
          }
        }
      });
    }
  }
  public static ResetItemSequence_StartDTTMOnCanDis(
    MedsResolve: ObservableCollection<PrescriptionItemVM>,
    dictAmendSeqGrpDetail: Dictionary<number, number>,
    _ActivityCode: ActivityTypes
  ): void {
    if (dictAmendSeqGrpDetail != null && MedsResolve != null) {
      dictAmendSeqGrpDetail.forEach((objSeqDet) => {
        if (
          objSeqDet.Key > 0 &&
          objSeqDet.Value != null &&
          objSeqDet.Value > 0
        ) {
          CommonSequentialHelper.ReSetStartEnd_DateTIme_OnCanDis(
            MedsResolve,
            objSeqDet.Key,
            objSeqDet.Value,
            _ActivityCode,
            true
          );
        }
      });
    }
  }
  public static ReSetStartEnd_DateTIme_OnCanDis(
    MedsResolve: ObservableCollection<PrescriptionItemVM>,
    _GroupSequenceNo: number,
    ResetStartItemSeqno: number,
    ActionCode: ActivityTypes,
    TimeMinValueFlag: boolean
  ): void {
    let ItemsRequiredChangeInGroup: IEnumerable<PrescriptionItemVM> =
      MedsResolve.Where(
        (c) =>
          !c.IsGroupHeader &&
          c.FormViewerDetails != null &&
          c.FormViewerDetails.BasicDetails != null &&
          c.FormViewerDetails.BasicDetails.SequenceInfo != null &&
          c.FormViewerDetails.BasicDetails.SequenceInfo.GroupSequenceNo > 0 &&
          c.FormViewerDetails.BasicDetails.SequenceInfo.GroupSequenceNo ==
            _GroupSequenceNo &&
          c.FormViewerDetails.BasicDetails.SequenceInfo.ItemSequenceNo >=
            ResetStartItemSeqno &&
          !(
            c.PrescriptionItemStatus.Equals(
              CConstants.COMPLETED,
              StringComparison.InvariantCultureIgnoreCase
            ) ||
            c.PrescriptionItemStatus.Equals(
              CConstants.CANCELLED,
              StringComparison.InvariantCultureIgnoreCase
            ) ||
            c.PrescriptionItemStatus.Equals(
              CConstants.DISCONTINUED,
              StringComparison.InvariantCultureIgnoreCase
            )
          )
      );
    if (
      ItemsRequiredChangeInGroup != null &&
      ItemsRequiredChangeInGroup.Count() > 0
    ) {
      let count: number = ItemsRequiredChangeInGroup.Count();
      ItemsRequiredChangeInGroup.forEach((item) => {
        if (item != null) {
          let curitemGrpSeqno: number = 0,
            curitemSeqno = 0;
          let sOrdSetgrpID: string = item.OrderSetGroupID;
          if (
            item.FormViewerDetails != null &&
            item.FormViewerDetails.BasicDetails != null
          ) {
            if (item.FormViewerDetails.BasicDetails.SequenceInfo != null) {
              curitemGrpSeqno =
                item.FormViewerDetails.BasicDetails.SequenceInfo
                  .GroupSequenceNo;
              curitemSeqno =
                item.FormViewerDetails.BasicDetails.SequenceInfo.ItemSequenceNo;
            }
            if (
              String.IsNullOrEmpty(sOrdSetgrpID) &&
              item.FormViewerDetails.BasicDetails.Ordersets != null &&
              !String.IsNullOrEmpty(
                item.FormViewerDetails.BasicDetails.Ordersets.Value
              )
            ) {
              sOrdSetgrpID =
                item.FormViewerDetails.BasicDetails.Ordersets.Value;
            }
          }
          let nPrevItemSeqNo: number = curitemSeqno - 1;
          nPrevItemSeqNo = CommonSequentialHelper.GetPrevActiveItemInSeqCanDis(
            MedsResolve,
            curitemGrpSeqno,
            nPrevItemSeqNo
          );
          let nxtItemStartDttm: DateTime =
            CommonSequentialHelper.GetStartDTTM4OrdersetNextItem(
              MedsResolve,
              sOrdSetgrpID,
              curitemGrpSeqno,
              nPrevItemSeqNo
            );
          if (DateTime.NotEquals(nxtItemStartDttm, DateTime.MinValue)) {
            if (
              item.FormViewerDetails.BasicDetails.SequenceInfo
                .ParentPrescriptionItemOID > 0
            ) {
              if (String.IsNullOrEmpty(item.OperationMode)) {
                item.OperationMode = 'U';
                item.ActionCode = ActivityTypes.Amend;
              }
              item.SequentialActionPerfromCodeAEITS =
                CAActivity.SequentialActionCodeAEITS;
              item.FormViewerDetails.BasicDetails.SequenceInfo.IsSequentialStartDTTMUpdated =
                true;
              CommonSequentialHelper.NonIVResetStartEndDateTime(
                MedsResolve,
                item,
                nxtItemStartDttm,
                TimeMinValueFlag
              );
            } else {
              CommonSequentialHelper.NonIVResetStartEndDateTime(
                MedsResolve,
                item,
                nxtItemStartDttm,
                TimeMinValueFlag
              );
            }
          }
        }
      });
    }
  }
  public static GetPrevActiveItemInSeqCanDis(
    MedsResolve: ObservableCollection<PrescriptionItemVM>,
    _GroupSequenceNo: number,
    ItemSeqno: number
  ): number {
    let nPrevItemSeqNo: number = 0;
    let _SeqItem: PrescriptionItemVM = MedsResolve.Where(
      (c) =>
        c != null &&
        !c.IsGroupHeader &&
        c.FormViewerDetails != null &&
        c.FormViewerDetails.BasicDetails != null &&
        c.FormViewerDetails.BasicDetails.SequenceInfo != null &&
        c.FormViewerDetails.BasicDetails.SequenceInfo.GroupSequenceNo ==
          _GroupSequenceNo &&
        !String.Equals(
          c.PrescriptionItemStatus,
          CConstants.CANCELLED,
          StringComparison.InvariantCultureIgnoreCase
        ) &&
        !String.Equals(
          c.PrescriptionItemStatus,
          CConstants.COMPLETED,
          StringComparison.InvariantCultureIgnoreCase
        ) &&
        !String.Equals(
          c.PrescriptionItemStatus,
          CConstants.DISCONTINUED,
          StringComparison.InvariantCultureIgnoreCase
        ) &&
        c.FormViewerDetails.BasicDetails.SequenceInfo.ItemSequenceNo <=
          ItemSeqno
    )
      .OrderBy(
        (i) => i.FormViewerDetails.BasicDetails.SequenceInfo.ItemSequenceNo
      )
      .LastOrDefault();
    if (
      _SeqItem != null &&
      _SeqItem.FormViewerDetails != null &&
      _SeqItem.FormViewerDetails.BasicDetails != null &&
      _SeqItem.FormViewerDetails.BasicDetails.SequenceInfo != null &&
      _SeqItem.FormViewerDetails.BasicDetails.SequenceInfo.ItemSequenceNo !=
        nPrevItemSeqNo
    ) {
      nPrevItemSeqNo =
        _SeqItem.FormViewerDetails.BasicDetails.SequenceInfo.ItemSequenceNo;
    }
    return nPrevItemSeqNo;
  }
  public static GetPrevActiveItemSequenceNo(
    MedsResolve: ObservableCollection<PrescriptionItemVM>,
    _GroupSequenceNo: number,
    ItemSeqno: number
  ): number {
    let nPrevItemSeqNo: number = ItemSeqno;
    let _SeqItem: PrescriptionItemVM = MedsResolve.Where(
      (c) =>
        c != null &&
        !c.IsGroupHeader &&
        c.FormViewerDetails != null &&
        c.FormViewerDetails.BasicDetails != null &&
        c.FormViewerDetails.BasicDetails.SequenceInfo != null &&
        c.FormViewerDetails.BasicDetails.SequenceInfo.GroupSequenceNo ==
          _GroupSequenceNo &&
        !String.Equals(
          c.PrescriptionItemStatus,
          CConstants.CANCELLED,
          StringComparison.InvariantCultureIgnoreCase
        ) &&
        !String.Equals(
          c.PrescriptionItemStatus,
          CConstants.COMPLETED,
          StringComparison.InvariantCultureIgnoreCase
        ) &&
        !String.Equals(
          c.PrescriptionItemStatus,
          CConstants.DISCONTINUED,
          StringComparison.InvariantCultureIgnoreCase
        ) &&
        c.FormViewerDetails.BasicDetails.SequenceInfo.ItemSequenceNo < ItemSeqno
    )
      .OrderBy(
        (i) => i.FormViewerDetails.BasicDetails.SequenceInfo.ItemSequenceNo
      )
      .LastOrDefault();
    if (
      _SeqItem != null &&
      _SeqItem.FormViewerDetails != null &&
      _SeqItem.FormViewerDetails.BasicDetails != null &&
      _SeqItem.FormViewerDetails.BasicDetails.SequenceInfo != null &&
      _SeqItem.FormViewerDetails.BasicDetails.SequenceInfo.ItemSequenceNo !=
        nPrevItemSeqNo
    ) {
      nPrevItemSeqNo =
        _SeqItem.FormViewerDetails.BasicDetails.SequenceInfo.ItemSequenceNo;
    }
    return nPrevItemSeqNo;
  }
  public static EnableDisbaleStartDateTimeForNonIVSeq(
    oResolveItem: PrescriptionItemVM
  ): void {
    let IsEnableStartDTTM: boolean = true,
      IsEnableStopDTTM = true;
    CommonSequentialHelper.ChkStartEndDTTMEnableState(
      oResolveItem,
      (o1) => {
        IsEnableStartDTTM = o1;
      },
      (o2) => {
        IsEnableStopDTTM = o2;
      }
    );
    if (!IsEnableStartDTTM) {
      oResolveItem.FormViewerDetails.BasicDetails.IsenableStartdate = false;
      oResolveItem.FormViewerDetails.BasicDetails.IsEnableStartTime = false;
    }
    if (!IsEnableStopDTTM) {
      oResolveItem.FormViewerDetails.BasicDetails.IsenableStopDate = false;
    } else {
      oResolveItem.FormViewerDetails.BasicDetails.IsenableStopDate = true;
    }
  }
  private static ChkStartEndDTTMEnableState(
    oResolveItem: PrescriptionItemVM,
    out1: (IsEnableStartDTTM: boolean) => void,
    out2: (IsEnableStopDTTM: boolean) => void
  ): void {
    let IsEnableStartDTTM: boolean;
    let IsEnableStopDTTM: boolean;
    IsEnableStartDTTM = true;
    IsEnableStopDTTM = true;
    if (
      oResolveItem.FormViewerDetails.BasicDetails.SequenceInfo != null &&
      oResolveItem.ParentbaseVM != null
    ) {
      let objSeqFirstActItem: SequenceDetail =
        CommonSequentialHelper.GetFirstActiveItemSeqItemVM(
          oResolveItem.ParentbaseVM.MedsResolve,
          oResolveItem.FormViewerDetails.BasicDetails.SequenceInfo
            .GroupSequenceNo
        );
      let IsCurrentItemWithDuration: boolean =
        !String.IsNullOrEmpty(
          oResolveItem.FormViewerDetails.BasicDetails.Duration
        ) &&
        oResolveItem.FormViewerDetails.BasicDetails.DurationUOM != null &&
        !String.IsNullOrEmpty(
          oResolveItem.FormViewerDetails.BasicDetails.DurationUOM.Value
        )
          ? true
          : false;
      if (
        objSeqFirstActItem != null &&
        oResolveItem.FormViewerDetails.BasicDetails.SequenceInfo
          .ItemSequenceNo > 0
      ) {
        if (
          oResolveItem.FormViewerDetails.BasicDetails.SequenceInfo
            .ItemSequenceNo > objSeqFirstActItem.ItemSequenceNo
        ) {
          IsEnableStartDTTM = false;
          if (
            !oResolveItem.FormViewerDetails.BasicDetails.SequenceInfo
              .IsLastItem ||
            (oResolveItem.FormViewerDetails.BasicDetails.SequenceInfo
              .IsLastItem &&
              IsCurrentItemWithDuration)
          ) {
            IsEnableStopDTTM = false;
          } else {
            IsEnableStopDTTM = true;
          }
        } else if (objSeqFirstActItem.ItemSequenceNo > 0) {
          IsEnableStopDTTM = false;
        }
      } else if (
        oResolveItem.FormViewerDetails.BasicDetails.SequenceInfo
          .IsAnyItemAdministeredInSeqGroup == 1
      ) {
        IsEnableStartDTTM = false;
        if (
          !oResolveItem.FormViewerDetails.BasicDetails.SequenceInfo
            .IsLastItem ||
          (oResolveItem.FormViewerDetails.BasicDetails.SequenceInfo
            .IsLastItem &&
            IsCurrentItemWithDuration)
        ) {
          IsEnableStopDTTM = false;
        } else {
          IsEnableStopDTTM = true;
        }
      } else if (
        oResolveItem.FormViewerDetails.BasicDetails.OrdersetSequence != null &&
        oResolveItem.FormViewerDetails.BasicDetails.SequenceInfo
          .GroupSequenceNo > 0 &&
        oResolveItem.FormViewerDetails.BasicDetails.SequenceInfo
          .ItemSequenceNo == 0
      ) {
        IsEnableStartDTTM = false;
        if (
          oResolveItem.OsInstance != null &&
          (!oResolveItem.OsInstance.OsIsLastItem ||
            (oResolveItem.OsInstance.OsIsLastItem && IsCurrentItemWithDuration))
        ) {
          IsEnableStopDTTM = false;
        } else {
          IsEnableStopDTTM = true;
        }
      } else if (
        oResolveItem.OsInstance != null &&
        oResolveItem.OsInstance.OsIsSequential
      ) {
        IsEnableStopDTTM = false;
      }
    } else if (
      oResolveItem.OsInstance != null &&
      oResolveItem.OsInstance.OsIsSequential
    ) {
      IsEnableStopDTTM = false;
    }
    out1(IsEnableStartDTTM);
    out2(IsEnableStopDTTM);
  }
  public static NonIVResetStartEndDateTime(
    MedsResolve: ObservableCollection<PrescriptionItemVM>,
    oResolveItem: PrescriptionItemVM,
    dtNewStartDatime: DateTime,
    TimeMinValueFlag: boolean
  ): void {
    let curitemGrpSeqno: number = 0,
      curitemSeqno = 0;
    let sOrdSetgrpID: string = oResolveItem.OrderSetGroupID;
    if (
      oResolveItem.FormViewerDetails != null &&
      oResolveItem.FormViewerDetails.BasicDetails != null
    ) {
      if (oResolveItem.FormViewerDetails.BasicDetails.SequenceInfo != null) {
        curitemGrpSeqno =
          oResolveItem.FormViewerDetails.BasicDetails.SequenceInfo
            .GroupSequenceNo;
        curitemSeqno =
          oResolveItem.FormViewerDetails.BasicDetails.SequenceInfo
            .ItemSequenceNo;
      }
      if (
        String.IsNullOrEmpty(sOrdSetgrpID) &&
        oResolveItem.FormViewerDetails.BasicDetails.Ordersets != null &&
        !String.IsNullOrEmpty(
          oResolveItem.FormViewerDetails.BasicDetails.Ordersets.Value
        )
      ) {
        sOrdSetgrpID =
          oResolveItem.FormViewerDetails.BasicDetails.Ordersets.Value;
      }
    }
    oResolveItem.FormViewerDetails.BasicDetails.ResetStartDTTM(
      dtNewStartDatime
    );
    oResolveItem.FormViewerDetails.BasicDetails.TimeMinValueFlag =
      TimeMinValueFlag;
    let CurrItemEndDttm: DateTime =
      CommonSequentialHelper.GetStopDTTM4OrdersetCurItem(
        MedsResolve,
        sOrdSetgrpID,
        curitemGrpSeqno,
        curitemSeqno
      );
    oResolveItem.FormViewerDetails.BasicDetails.ResetEndDTTM(CurrItemEndDttm);
  }
  public static IsSequeneSubsequentItem(
    objPresVM: PrescriptionItemVM
  ): boolean {
    let isNonIVSubsequentSequenceItem: boolean = false;
    if (
      objPresVM != null &&
      objPresVM.ParentbaseVM != null &&
      objPresVM.FormViewerDetails != null &&
      objPresVM.FormViewerDetails.BasicDetails != null &&
      objPresVM.FormViewerDetails.BasicDetails.SequenceInfo != null &&
      objPresVM.FormViewerDetails.BasicDetails.SequenceInfo.GroupSequenceNo > 0
    ) {
      let oSeqdetVM: SequenceDetail =
        CommonSequentialHelper.GetFirstActiveItemSeqItemVM(
          objPresVM.ParentbaseVM.MedsResolve,
          objPresVM.FormViewerDetails.BasicDetails.SequenceInfo.GroupSequenceNo
        );
      if (
        (oSeqdetVM != null &&
          oSeqdetVM.GroupSequenceNo > 0 &&
          oSeqdetVM.ItemSequenceNo > 0 &&
          oSeqdetVM.ItemSequenceNo !=
            objPresVM.FormViewerDetails.BasicDetails.SequenceInfo
              .ItemSequenceNo) ||
        objPresVM.FormViewerDetails.BasicDetails.SequenceInfo
          .IsAnyItemAdministeredInSeqGroup == 1
      ) {
        isNonIVSubsequentSequenceItem = true;
      }
    }
    return isNonIVSubsequentSequenceItem;
  }
  public static GetSeqItemCountInGroup(
    MedsResolve: ObservableCollection<PrescriptionItemVM>,
    SequenceGroupNo: number
  ): number {
    let nSeqItemCntInGrp: number = 0;
    if (MedsResolve != null && MedsResolve.Count > 0 && SequenceGroupNo > 0) {
      nSeqItemCntInGrp = MedsResolve.Where(
        (c) =>
          c != null &&
          !c.IsGroupHeader &&
          c.FormViewerDetails != null &&
          c.FormViewerDetails.BasicDetails != null &&
          c.FormViewerDetails.BasicDetails.SequenceInfo != null &&
          c.FormViewerDetails.BasicDetails.SequenceInfo.GroupSequenceNo ==
            SequenceGroupNo &&
          !String.Equals(
            c.PrescriptionItemStatus,
            CConstants.CANCELLED,
            StringComparison.InvariantCultureIgnoreCase
          ) &&
          !String.Equals(
            c.PrescriptionItemStatus,
            CConstants.COMPLETED,
            StringComparison.InvariantCultureIgnoreCase
          ) &&
          !String.Equals(
            c.PrescriptionItemStatus,
            CConstants.DISCONTINUED,
            StringComparison.InvariantCultureIgnoreCase
          ) &&
          c.FormViewerDetails.BasicDetails.StartPrescriptionTime !=
            DateTime.MinValue
      ).Count();
    }
    return nSeqItemCntInGrp;
  }
  public static SetStartDateDTTMOnRouteChange(
    oResolveVM: BasicDetailsVM
  ): void {
    let IsSubSequentSeqItem: boolean = false;
    let oPerviousStartDTTM: DateTime = DateTime.MinValue;
    IsSubSequentSeqItem = CommonSequentialHelper.IsSequeneSubsequentItem(
      oResolveVM.oPrescitemVM
    );
    let nSeqItemCnt: number = 0;
    if (oResolveVM.oPrescitemVM.ParentbaseVM != null) {
      nSeqItemCnt = CommonSequentialHelper.GetSeqItemCountInGroup(
        oResolveVM.oPrescitemVM.ParentbaseVM.MedsResolve,
        oResolveVM.SequenceInfo.GroupSequenceNo
      );
      if (
        oResolveVM.SequenceInfo.IsLastItem &&
        nSeqItemCnt == 1 &&
        DateTime.NotEquals(oResolveVM.OrginalStartDTTM, DateTime.MinValue)
      ) {
        oPerviousStartDTTM = oResolveVM.OrginalStartDTTM;
      }
    }
    if (
      IsSubSequentSeqItem &&
      oResolveVM.SequenceInfo.ItemSequenceNo > 0 &&
      !(oResolveVM.SequenceInfo.IsLastItem && nSeqItemCnt == 1)
    ) {
      let nActivePrevItemSeq: number =
        CommonSequentialHelper.GetPrevActiveItemSequenceNo(
          oResolveVM.oPrescitemVM.ParentbaseVM.MedsResolve,
          oResolveVM.SequenceInfo.GroupSequenceNo,
          oResolveVM.SequenceInfo.ItemSequenceNo
        );
      oPerviousStartDTTM = CommonSequentialHelper.GetStartDTTM4OrdersetNextItem(
        oResolveVM.oPrescitemVM.ParentbaseVM.MedsResolve,
        String.Empty,
        oResolveVM.SequenceInfo.GroupSequenceNo,
        nActivePrevItemSeq
      );
    } else if (
      oResolveVM.SequenceInfo.GroupSequenceNo > 0 &&
      oResolveVM.SequenceInfo.ItemSequenceNo == 0 &&
      oResolveVM.OrdersetSequence != null
    ) {
      IsSubSequentSeqItem = true;
      oPerviousStartDTTM = CommonSequentialHelper.GetStartDTTM4OrdersetNextItem(
        oResolveVM.oPrescitemVM.ParentbaseVM.MedsResolve,
        oResolveVM.OrdersetSequence.OrderSetGropID,
        oResolveVM.SequenceInfo.GroupSequenceNo,
        oResolveVM.SequenceInfo.ItemSequenceNo - 1
      );
    }
    if (IsSubSequentSeqItem) {
      oResolveVM.IsSequenceStartDTTMReset = false;
      oResolveVM.ResetStartDTTM(oPerviousStartDTTM);
      CommonSequentialHelper.EnableDisbaleStartDateTimeForNonIVSeq(
        oResolveVM.oPrescitemVM
      );
    }
    oResolveVM.ReviewAfterVisible = Visibility.Collapsed;
    oResolveVM.ReviewAfterCommentsVisible = Visibility.Collapsed;
  }
  //Not Required for LHS. To be Re-Visited.
  
        public static LaunchItemsInSequenceMezzanine(MedsResolve: ObservableCollection<PrescriptionItemVM>, InfusionGroupSequenceNo: number, onClosed: Function): void {
            if (MedsResolve != null && MedsResolve.Count > 0 && InfusionGroupSequenceNo > 0) {
                let partialSequentialData = MedsResolve.Where(x => x.FormViewerDetails != null && x.FormViewerDetails.BasicDetails != null && x.FormViewerDetails.BasicDetails.SequenceInfo != null && x.FormViewerDetails.BasicDetails.SequenceInfo.GroupSequenceNo == InfusionGroupSequenceNo).Select(x => ObjectHelper.CreateObject(new SequentialItem(), { PrescriptionItem: x, AdminStatus: String.Empty, PrescriptionItemOid: x.PrescriptionItemOID }));
                if (!MedsResolve.Any(x => x.ParentbaseVM != null && x.ParentbaseVM.IsDisCompletedChecked)) {
                    let firstItem: PrescriptionItemVM = MedsResolve.Where(x => x.ParentbaseVM != null && x.ParentbaseVM.oTempPrescDisCancelItemVM != null).FirstOrDefault();
                    if (firstItem != null) {
                      // partialSequentialData = partialSequentialData.Union(firstItem.ParentbaseVM.oTempPrescDisCancelItemVM.Where(x => x.FormViewerDetails != null && x.FormViewerDetails.BasicDetails != null && x.FormViewerDetails.BasicDetails.SequenceInfo != null && x.FormViewerDetails.BasicDetails.SequenceInfo.GroupSequenceNo == InfusionGroupSequenceNo).Select(x => ObjectHelper.CreateObject(new SequentialItem(), { PrescriptionItem: x, AdminStatus: String.Empty, PrescriptionItemOid: x.PrescriptionItemOID })));
                    }
                }
                let v = partialSequentialData.ToArray();
                let __LstItemsInSequence: List<SequentialItem> = partialSequentialData.Where(x => x.PrescriptionItem.FormViewerDetails.BasicDetails.SequenceInfo.ItemSequenceNo > 0).OrderBy(x => x.PrescriptionItem.FormViewerDetails.BasicDetails.SequenceInfo.ItemSequenceNo).ToList();
                for (let i: number = __LstItemsInSequence.Count - 1; i >= 0; i--) {
                    if (__LstItemsInSequence[i].PrescriptionItemOid == 0 && __LstItemsInSequence[i].PrescriptionItem != null && __LstItemsInSequence[i].PrescriptionItem.SourcePrescriptionOid > 0) {
                        if (!__LstItemsInSequence.Any(x => x.PrescriptionItemOid == __LstItemsInSequence[i].PrescriptionItem.SourcePrescriptionOid)) {
                            let _vm: PrescriptionItemVM = MedsResolve.Where(x => x.PrescriptionItemOID == __LstItemsInSequence[i].PrescriptionItem.SourcePrescriptionOid).FirstOrDefault();
                            if (_vm != null) {
                                __LstItemsInSequence.Insert(i, ObjectHelper.CreateObject(new SequentialItem(), { PrescriptionItem: _vm, AdminStatus: String.Empty, PrescriptionItemOid: __LstItemsInSequence[i].PrescriptionItem.SourcePrescriptionOid }));
                            }
                        }
                    }
                }
                let _LstItemsInSequence: IEnumerable<SequentialItem> = __LstItemsInSequence.AsEnumerable();
                let vm: SequentialItemsVM = ObjectHelper.CreateObject(new SequentialItemsVM(), { MedsResolve: MedsResolve, MedsAllSequentialResolve: new ObservableCollection<SequentialItem>(_LstItemsInSequence), InfusionGroupSequenceNo: InfusionGroupSequenceNo });
                let seqNo: number = -1;
                if (vm.MedsAllSequentialResolve != null) {
                    for (let i: number = 0; i < vm.MedsAllSequentialResolve.Count; i++) {
                        if (vm.MedsAllSequentialResolve[i].PrescriptionItemOid == 0 || vm.MedsAllSequentialResolve[i].PrescriptionItem.formViewerDetails.BasicDetails.SequenceInfo.ParentPrescriptionItemOID == 0) {
                            vm.MedsAllSequentialResolve[i].PrescriptionItemOid = seqNo--;
                        }
                    }
                    vm.MedsSequentialResolve = new ObservableCollection<SequentialItem>(vm.MedsAllSequentialResolve.Where(x => String.IsNullOrEmpty(x.PrescriptionItem.PrescriptionItemStatus) || !x.PrescriptionItem.PrescriptionItemStatus.Equals(CConstants.CANCELLED, StringComparison.OrdinalIgnoreCase) && !x.PrescriptionItem.IsAmendCompletedStatus && !x.PrescriptionItem.PrescriptionItemStatus.Equals(CConstants.DISCONTINUED, StringComparison.OrdinalIgnoreCase)));
                }
                let infustionIteminSequence: MedSequentialPrescription = new MedSequentialPrescription();
                infustionIteminSequence.DataContext = vm;
                AppActivity.OpenWindow("Sequential medications - " + String.Format(Resource.Infusion.ExsitingSequenceNo, InfusionGroupSequenceNo) + " - LORENZO -- webpage Dialog", infustionIteminSequence, onClosed, "", false, 350, 950, false, WindowButtonType.Close, null);
                
                vm.UpdateStatusFromDatabase();
            }
        }
        
  public static SetSequenceActionCode4AmentUpdate(
    oItemVM: PrescriptionItemVM,
    oItemDetails: IPPMAManagePrescSer.PrescriptionItemDetails,
    IsVerified: boolean
  ): void {
    if (
      oItemVM != null &&
      oItemVM.FormViewerDetails != null &&
      oItemVM.FormViewerDetails.BasicDetails != null &&
      oItemVM.FormViewerDetails.BasicDetails.InfusionDetails != null &&
      oItemVM.FormViewerDetails.BasicDetails.InfusionDetails.GroupSequenceNo >
        0 &&
      oItemVM.FormViewerDetails.BasicDetails.InfusionDetails
        .IsSequentialStartDTTMUpdated
    ) {
      oItemDetails.SequentialActionPerformCode =
        CAActivity.SequentialActionCodeAEITS;
      oItemDetails.IsSequencePerformedInAmend = IsVerified;
    }
    if (
      oItemVM != null &&
      oItemVM.FormViewerDetails != null &&
      oItemVM.FormViewerDetails.BasicDetails != null &&
      oItemVM.FormViewerDetails.BasicDetails.SequenceInfo != null &&
      oItemVM.FormViewerDetails.BasicDetails.SequenceInfo.GroupSequenceNo > 0
    ) {
      oItemDetails.IsSequencePerformedInAmend = IsVerified;
      if (
        oItemVM.FormViewerDetails.BasicDetails.SequenceInfo
          .IsSequentialStartDTTMUpdated
      ) {
        oItemDetails.SequentialActionPerformCode =
          CAActivity.NonIVSeqUpdForSubsequentItems;
      }
    }
    if (
      oItemVM != null &&
      oItemVM.FormViewerDetails != null &&
      oItemVM.FormViewerDetails.BasicDetails != null &&
      oItemVM.FormViewerDetails.BasicDetails.SequenceInfo != null &&
      oItemVM.FormViewerDetails.BasicDetails.SequenceInfo.GroupSequenceNo > 0 &&
      oItemVM.FormViewerDetails.BasicDetails.SequenceInfo
        .IsSequentialStartDTTMUpdated
    ) {
      oItemDetails.SequentialActionPerformCode =
        CAActivity.SequentialActionCodeAEITS;
      oItemDetails.IsSequencePerformedInAmend = IsVerified;
    }
  }
}
