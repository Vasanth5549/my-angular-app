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
  CListItem,
  ObservableCollection,
  AppDialogEventargs,
  AppDialogResult,
  DelegateArgs,
  DialogComponentArgs,
  WindowButtonType,
  IEnumerable,
  List,
  Visibility,
} from 'epma-platform/models';
import { AppDialog } from 'epma-platform/controls';
import { HelperService } from '../../shared/epma-platform/soap-client/helper.service';
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
import { Resource } from '../resource';
import { CAActivity, CConstants } from './constants';
import {
  CnstSlotStatus,
  InfusionTypeCode,
} from 'src/app/lorappmedicationcommonbb/utilities/constants';
import { Common } from './common';
import { MedicationCommonConceptCodeData } from 'src/app/lorappmedicationcommonbb/utilities/profiledata';
import {
  SequentialItem,
  SequentialItemsVM,
} from '../viewmodel/SequentialItemsVM';
import { BasicDetailsVM, InfusionVM } from '../viewmodel/BasicDetailsVM';
import { ActivityTypes } from '../model/common';
import { CommonBB } from 'src/app/lorappcommonbb/utilities/common';
import { OrderSetHelper } from './prescriptionhelper';
import { CommonSequentialHelper } from './CommonSequentialHelper';
import { IPPMABaseVM } from '../viewmodel/ippmabasevm';
import { PatientContext } from 'src/app/lorappcommonbb/utilities/globalvariable';
import { Dictionary } from 'epma-platform/dictionary';
import { MedSequentialPrescription } from '../view/medsequentialprescription';

export enum eSequenceNoReassignType {
  ReassignWithinGroup="ReassignWithinGroup",

  ReassignAcrossGroups="ReassignAcrossGroups",
}
export class CSequentialHelper {
  public static GetSequenceNameList(
    oMedsResolve: ObservableCollection<PrescriptionItemVM>,
    LastInfusionGroupSequenceNo: number,
    _IsFromLoad: boolean
  ): ObservableCollection<CListItem> {
    let SequenceNamelst: ObservableCollection<CListItem> =
      new ObservableCollection<CListItem>();
    let oSequenceName: CListItem = new CListItem();
    oSequenceName.DisplayText = Resource.Infusion.NewSequence_Text;
    oSequenceName.Value = CConstants.NewSequenceCode;
    SequenceNamelst.Add(oSequenceName);
    if (oMedsResolve != null && oMedsResolve.Count > 0) {
      let _GroupSeqNames = oMedsResolve
        .Where(
          (c) =>
            !c.IsGroupHeader &&
            c.FormViewerDetails != null &&
            c.FormViewerDetails.BasicDetails != null &&
            c.FormViewerDetails.BasicDetails.InfusionDetails != null &&
            c.FormViewerDetails.BasicDetails.InfusionDetails.GroupSequenceNo >
              0 &&
            (c.FormViewerDetails.BasicDetails.Ordersets == null ||
              (c.FormViewerDetails.BasicDetails.Ordersets != null &&
                String.IsNullOrEmpty(
                  c.FormViewerDetails.BasicDetails.Ordersets.Value
                ))) &&
            ((!String.IsNullOrEmpty(c.PrescriptionItemStatus) &&
              !String.Equals(
                c.PrescriptionItemStatus,
                CConstants.COMPLETED,
                StringComparison.InvariantCultureIgnoreCase
              ) &&
              !String.Equals(
                c.PrescriptionItemStatus,
                CConstants.CANCELLED,
                StringComparison.InvariantCultureIgnoreCase
              ) &&
              !String.Equals(
                c.PrescriptionItemStatus,
                CConstants.DISCONTINUED,
                StringComparison.InvariantCultureIgnoreCase
              )) ||
              String.IsNullOrEmpty(c.PrescriptionItemStatus))
        )
        .Select(
          (s) =>
            s.FormViewerDetails.BasicDetails.InfusionDetails.GroupSequenceNo
        )
        .Distinct()
        .OrderBy((o) => o)
        .ToList();
      _GroupSeqNames.forEach((AssignSeqAndID) => {
        let _WithoutInfusionPeriod: boolean =
          oMedsResolve
            .Where(
              (c) =>
                !c.IsGroupHeader &&
                c.FormViewerDetails != null &&
                c.FormViewerDetails.BasicDetails != null &&
                c.FormViewerDetails.BasicDetails.InfusionDetails != null &&
                c.FormViewerDetails.BasicDetails.InfusionDetails
                  .GroupSequenceNo == AssignSeqAndID &&
                c.FormViewerDetails.BasicDetails.InfusionType != null &&
                !String.IsNullOrEmpty(
                  c.FormViewerDetails.BasicDetails.InfusionType.Value
                ) &&
                String.Equals(
                  c.FormViewerDetails.BasicDetails.InfusionType.Value,
                  InfusionTypeCode.CONTINUOUS,
                  StringComparison.InvariantCultureIgnoreCase
                ) &&
                String.IsNullOrEmpty(
                  c.FormViewerDetails.BasicDetails.InfusionDetails
                    .InfusionPeriod
                ) &&
                ((!String.IsNullOrEmpty(c.PrescriptionItemStatus) &&
                  !String.Equals(
                    c.PrescriptionItemStatus,
                    CConstants.COMPLETED,
                    StringComparison.InvariantCultureIgnoreCase
                  ) &&
                  !String.Equals(
                    c.PrescriptionItemStatus,
                    CConstants.CANCELLED,
                    StringComparison.InvariantCultureIgnoreCase
                  ) &&
                  !String.Equals(
                    c.PrescriptionItemStatus,
                    CConstants.DISCONTINUED,
                    StringComparison.InvariantCultureIgnoreCase
                  )) ||
                  String.IsNullOrEmpty(c.PrescriptionItemStatus))
            )
            .Count() > 0;
        if (!_WithoutInfusionPeriod || _IsFromLoad) {
          oSequenceName = new CListItem();
          oSequenceName.DisplayText = String.Format(
            Resource.Infusion.ExsitingSequenceNo,
            AssignSeqAndID
          );
          oSequenceName.Value = AssignSeqAndID.ToString();
          SequenceNamelst.Add(oSequenceName);
        }
      });
    }
    return SequenceNamelst;
  }
  public static GetPrecedingInfusionItemList(
    MedsResolve: ObservableCollection<PrescriptionItemVM>,
    oDisCancelItems: List<PrescriptionItemVM>,
    _InfusionGroupSequenceNo: number,
    _PrescribingItemOID: number,
    _PrescribingUniqueRowID: number,
    AllActiveItems: boolean
  ): ObservableCollection<CListItem> {
    let PrecedingInfusionItemlst: ObservableCollection<CListItem> =
      new ObservableCollection<CListItem>();
    if (_InfusionGroupSequenceNo == 0) {
      let oTempMedReslove = MedsResolve.Where(
        (c) =>
          c.FormViewerDetails.BasicDetails.InfusionType != null &&
          !String.IsNullOrEmpty(
            c.FormViewerDetails.BasicDetails.InfusionType.Value
          ) &&
          c.FormViewerDetails.BasicDetails.InfusionDetails != null &&
          c.FormViewerDetails.BasicDetails.InfusionDetails.GroupSequenceNo ==
            0 &&
          (c.FormViewerDetails.BasicDetails.Ordersets == null ||
            (c.FormViewerDetails.BasicDetails.Ordersets != null &&
              String.IsNullOrEmpty(
                c.FormViewerDetails.BasicDetails.Ordersets.Value
              ))) &&
          ((String.Equals(
            c.FormViewerDetails.BasicDetails.InfusionType.Value,
            InfusionTypeCode.CONTINUOUS,
            StringComparison.InvariantCultureIgnoreCase
          ) &&
            !String.IsNullOrEmpty(
              c.FormViewerDetails.BasicDetails.InfusionDetails.InfusionPeriod
            )) ||
            String.Equals(
              c.FormViewerDetails.BasicDetails.InfusionType.Value,
              InfusionTypeCode.SINGLEDOSEVOLUME,
              StringComparison.InvariantCultureIgnoreCase
            ) ||
            String.Equals(
              c.FormViewerDetails.BasicDetails.InfusionType.Value,
              InfusionTypeCode.FLUID,
              StringComparison.InvariantCultureIgnoreCase
            )) &&
          ((AllActiveItems &&
            !String.IsNullOrEmpty(c.PrescriptionItemStatus) &&
            !String.Equals(
              c.PrescriptionItemStatus,
              CConstants.COMPLETED,
              StringComparison.InvariantCultureIgnoreCase
            ) &&
            !String.Equals(
              c.PrescriptionItemStatus,
              CConstants.CANCELLED,
              StringComparison.InvariantCultureIgnoreCase
            ) &&
            !String.Equals(
              c.PrescriptionItemStatus,
              CConstants.DISCONTINUED,
              StringComparison.InvariantCultureIgnoreCase
            )) ||
            String.IsNullOrEmpty(c.PrescriptionItemStatus))
      );
      let FilterWithoutPrescribingItem: IEnumerable<PrescriptionItemVM> = null;
      if (oTempMedReslove != null && oTempMedReslove.Count() > 0) {
        if (_PrescribingItemOID > 0) {
          FilterWithoutPrescribingItem = oTempMedReslove.Where(
            (c) => c.PrescriptionItemOID != _PrescribingItemOID
          );
        } else {
          FilterWithoutPrescribingItem = oTempMedReslove.Where(
            (c) => c.UniqueRowID != _PrescribingUniqueRowID
          );
        }
      }
      if (
        FilterWithoutPrescribingItem != null &&
        FilterWithoutPrescribingItem.Count() > 0
      ) {
        let oTempDrugName: CListItem;
        let nCount: number = FilterWithoutPrescribingItem.Count();
        FilterWithoutPrescribingItem.forEach((PrescribedItem) => {
          oTempDrugName = new CListItem();
          oTempDrugName.DisplayText = !String.IsNullOrEmpty(
            PrescribedItem.MedLineDisplayText
          )
            ? PrescribedItem.MedLineDisplayText
            : PrescribedItem.FormViewerDetails.BasicDetails.IdentifyingName;
          oTempDrugName.Value =
            PrescribedItem.PrescriptionItemOID > 0
              ? PrescribedItem.PrescriptionItemOID.ToString()
              : PrescribedItem.UniqueRowID.ToString();
          PrecedingInfusionItemlst.Add(oTempDrugName);
        });
      }
    } else {
      let oTempLastseqMedReslove = MedsResolve.Where(
        (c) =>
          c.FormViewerDetails.BasicDetails.InfusionType != null &&
          !String.IsNullOrEmpty(
            c.FormViewerDetails.BasicDetails.InfusionType.Value
          ) &&
          c.FormViewerDetails.BasicDetails.InfusionDetails != null &&
          c.FormViewerDetails.BasicDetails.InfusionDetails.GroupSequenceNo ==
            _InfusionGroupSequenceNo &&
          c.FormViewerDetails.BasicDetails.InfusionDetails.ItemSequenceNo > 0 &&
          ((_PrescribingItemOID > 0 &&
            c.PrescriptionItemOID != _PrescribingItemOID) ||
            (_PrescribingUniqueRowID > 0 &&
              c.UniqueRowID != _PrescribingUniqueRowID)) &&
          !String.Equals(
            c.PrescriptionItemStatus,
            CConstants.CANCELLED,
            StringComparison.InvariantCultureIgnoreCase
          )
      )
        .OrderBy(
          (x) => x.FormViewerDetails.BasicDetails.InfusionDetails.ItemSequenceNo
        )
        .LastOrDefault();
      if (oDisCancelItems && oDisCancelItems != null && oDisCancelItems.Count > 0) {
        let oTempLastseqDisCancel = oDisCancelItems
          .Where(
            (c) =>
              !c.IsGroupHeader &&
              c.FormViewerDetails != null &&
              c.FormViewerDetails.BasicDetails != null &&
              c.FormViewerDetails.BasicDetails.InfusionType != null &&
              !String.IsNullOrEmpty(
                c.FormViewerDetails.BasicDetails.InfusionType.Value
              ) &&
              c.FormViewerDetails.BasicDetails.InfusionDetails != null &&
              c.FormViewerDetails.BasicDetails.InfusionDetails
                .GroupSequenceNo == _InfusionGroupSequenceNo &&
              c.FormViewerDetails.BasicDetails.InfusionDetails.ItemSequenceNo >
                0 &&
              ((_PrescribingItemOID > 0 &&
                c.PrescriptionItemOID != _PrescribingItemOID) ||
                (_PrescribingUniqueRowID > 0 &&
                  c.UniqueRowID != _PrescribingUniqueRowID)) &&
              !String.Equals(
                c.PrescriptionItemStatus,
                CConstants.CANCELLED,
                StringComparison.InvariantCultureIgnoreCase
              )
          )
          .LastOrDefault();
        if (oTempLastseqDisCancel && oTempLastseqDisCancel != null) {
          oTempLastseqMedReslove =
            oTempLastseqDisCancel.FormViewerDetails.BasicDetails.InfusionDetails
              .ItemSequenceNo >
            oTempLastseqMedReslove.FormViewerDetails.BasicDetails
              .InfusionDetails.ItemSequenceNo
              ? oTempLastseqDisCancel
              : oTempLastseqMedReslove;
        }
      }
      if (oTempLastseqMedReslove && oTempLastseqMedReslove != null) {
        let oTempDrugName: CListItem = new CListItem();
        if (
          !String.IsNullOrEmpty(
            oTempLastseqMedReslove.PrescriptionItemStatus
          ) &&
          (oTempLastseqMedReslove.PrescriptionItemStatus.Equals(
            CConstants.COMPLETED,
            StringComparison.InvariantCultureIgnoreCase
          ) ||
            oTempLastseqMedReslove.PrescriptionItemStatus.Equals(
              CConstants.DISCONTINUED,
              StringComparison.InvariantCultureIgnoreCase
            ))
        ) {
          let sMedStatus: string = String.Empty;
          sMedStatus =
            '[' +
            Common.GetText(
              oTempLastseqMedReslove.PrescriptionItemStatus,
              MedicationCommonConceptCodeData.ConceptCodes
            ) +
            '] ';
          oTempDrugName.DisplayText = !String.IsNullOrEmpty(
            oTempLastseqMedReslove.MedLineDisplayText
          )
            ? oTempLastseqMedReslove.MedLineDisplayText
            : oTempLastseqMedReslove.FormViewerDetails.BasicDetails
                .IdentifyingName;
          if (!oTempDrugName.DisplayText.Contains(sMedStatus)) {
            oTempDrugName.DisplayText =
              sMedStatus + ' ' + oTempDrugName.DisplayText;
          }
        } else {
          oTempDrugName.DisplayText = !String.IsNullOrEmpty(
            oTempLastseqMedReslove.MedLineDisplayText
          )
            ? oTempLastseqMedReslove.MedLineDisplayText
            : oTempLastseqMedReslove.FormViewerDetails.BasicDetails
                .IdentifyingName;
        }
        if (
          String.Equals(
            oTempLastseqMedReslove.OperationMode,
            'N',
            StringComparison.InvariantCultureIgnoreCase
          )
        ) {
          oTempDrugName.Value = oTempLastseqMedReslove.UniqueRowID.ToString();
        } else {
          oTempDrugName.Value =
            oTempLastseqMedReslove.PrescriptionItemOID.ToString();
        }
        PrecedingInfusionItemlst.Add(oTempDrugName);
      }
    }
    return PrecedingInfusionItemlst;
  }
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
    _NextItemSequenceNo = CSequentialHelper.GetLastItemSequenceNo(
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
    let _DisCanItemSequenceNo: number = 0;
    if (MedsResolve != null && MedsResolve.Count > 0) {
      let GetItemSequenceNo = MedsResolve.Where(
        (x) =>
          !x.IsGroupHeader &&
          x.FormViewerDetails != null &&
          x.FormViewerDetails.BasicDetails != null &&
          x.FormViewerDetails.BasicDetails.InfusionDetails != null &&
          x.FormViewerDetails.BasicDetails.InfusionDetails.GroupSequenceNo ==
            InfusionGroupSequenceNo
      ).Select(
        (s) => s.FormViewerDetails.BasicDetails.InfusionDetails.ItemSequenceNo
      );
      if (oDisCancelItems != null && oDisCancelItems.Count > 0) {
        let GetDiscCanItemSeqNo = oDisCancelItems
          .Where(
            (x) =>
              !x.IsGroupHeader &&
              x.FormViewerDetails != null &&
              x.FormViewerDetails.BasicDetails != null &&
              x.FormViewerDetails.BasicDetails.InfusionDetails != null &&
              x.FormViewerDetails.BasicDetails.InfusionDetails
                .GroupSequenceNo == InfusionGroupSequenceNo
          )
          .Select(
            (s) =>
              s.FormViewerDetails.BasicDetails.InfusionDetails.ItemSequenceNo
          );
        if (GetDiscCanItemSeqNo != null && GetDiscCanItemSeqNo.Count() > 0) {
          _DisCanItemSequenceNo = GetDiscCanItemSeqNo.Max((o) => o);
        }
      }
      if (GetItemSequenceNo != null && GetItemSequenceNo.Count() > 0) {
        _LastItemSequenceNo = GetItemSequenceNo.Max((o) => o);
      }
      if (_DisCanItemSequenceNo > _LastItemSequenceNo) {
        _LastItemSequenceNo = _DisCanItemSequenceNo;
      }
    }
    return _LastItemSequenceNo;
  }
  //Not Required for LHS. To be Re-Visited.
  
        public static LaunchItemsInSequenceMezzanine(MedsResolve: ObservableCollection<PrescriptionItemVM>, InfusionGroupSequenceNo: number, onClosed: Function): void {
            if (MedsResolve != null && MedsResolve.Count > 0 && InfusionGroupSequenceNo > 0) {
                let partialSequentialData = MedsResolve.Where(x => x.FormViewerDetails != null && x.FormViewerDetails.BasicDetails != null && x.FormViewerDetails.BasicDetails.InfusionDetails != null && x.FormViewerDetails.BasicDetails.InfusionDetails.GroupSequenceNo == InfusionGroupSequenceNo).Select(x => ObjectHelper.CreateObject(new SequentialItem(), { PrescriptionItem: x, AdminStatus: String.Empty, PrescriptionItemOid: x.PrescriptionItemOID }));
                if (!MedsResolve.Any(x => x.ParentbaseVM != null && x.ParentbaseVM.IsDisCompletedChecked)) {
                    let firstItem: PrescriptionItemVM = MedsResolve.Where(x => x.ParentbaseVM != null && x.ParentbaseVM.oTempPrescDisCancelItemVM != null).FirstOrDefault();
                    if (firstItem != null) {
		    //Revisit required TODO
                     //   partialSequentialData = partialSequentialData.Union(firstItem.ParentbaseVM.oTempPrescDisCancelItemVM.Where(x => x.FormViewerDetails != null && x.FormViewerDetails.BasicDetails != null && x.FormViewerDetails.BasicDetails.InfusionDetails != null && x.FormViewerDetails.BasicDetails.InfusionDetails.GroupSequenceNo == InfusionGroupSequenceNo).Select(x => ObjectHelper.CreateObject(new SequentialItem(), { PrescriptionItem: x, AdminStatus: String.Empty, PrescriptionItemOid: x.PrescriptionItemOID })));
                    }
                }
                let v = partialSequentialData.ToArray();
                let __LstItemsInSequence: List<SequentialItem> = partialSequentialData.Where(x => x.PrescriptionItem.FormViewerDetails.BasicDetails.InfusionDetails.ItemSequenceNo > 0).OrderBy(x => x.PrescriptionItem.FormViewerDetails.BasicDetails.InfusionDetails.ItemSequenceNo).ToList();
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
                        if (vm.MedsAllSequentialResolve[i].PrescriptionItemOid == 0 || vm.MedsAllSequentialResolve[i].PrescriptionItem.formViewerDetails.BasicDetails.InfusionDetails.ParentPrescriptionItemOID == 0) {
                            vm.MedsAllSequentialResolve[i].PrescriptionItemOid = seqNo--;
                        }
                    }
                    vm.MedsSequentialResolve = new ObservableCollection<SequentialItem>(vm.MedsAllSequentialResolve.Where(x => String.IsNullOrEmpty(x.PrescriptionItem.PrescriptionItemStatus) || !x.PrescriptionItem.PrescriptionItemStatus.Equals(CConstants.CANCELLED, StringComparison.OrdinalIgnoreCase) && !x.PrescriptionItem.IsAmendCompletedStatus && !x.PrescriptionItem.PrescriptionItemStatus.Equals(CConstants.DISCONTINUED, StringComparison.OrdinalIgnoreCase)));
                }
                let infustionIteminSequence: MedSequentialPrescription = new MedSequentialPrescription();
                infustionIteminSequence.DataContext = vm;
                // ObjectHelper.stopFinishAndCancelEvent(true);
                AppActivity.OpenWindow("Sequential medications - " + String.Format(Resource.Infusion.ExsitingSequenceNo, InfusionGroupSequenceNo) + " - LORENZO -- webpage Dialog", infustionIteminSequence, (s,e) => {onClosed(s,e);}, "", false, 350, 930, false, WindowButtonType.Close, null);
                
                vm.UpdateStatusFromDatabase();
            }
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
        x.FormViewerDetails.BasicDetails.InfusionDetails != null &&
        x.FormViewerDetails.BasicDetails.InfusionDetails.GroupSequenceNo ==
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
        x.FormViewerDetails.BasicDetails.InfusionDetails != null &&
        x.FormViewerDetails.BasicDetails.InfusionDetails.GroupSequenceNo ==
          InfusionGroupSequenceNo &&
        x.FormViewerDetails.BasicDetails.InfusionDetails.ItemSequenceNo ==
          InfusionItemSeqno
    ).FirstOrDefault();
    if (_oSeqItem != null) {
      _newIndex = MedsResolve.IndexOf(_oSeqItem);
    }
    out1(_oSeqItem);
    return _newIndex;
  }
  public static GetFirstActiveItemInfusionVM(
    MedsResolve: ObservableCollection<PrescriptionItemVM>,
    SequenceGroupNo: number
  ): InfusionVM {
    let _InfusionVM: InfusionVM = null;
    if (MedsResolve != null && MedsResolve.Count > 0 && SequenceGroupNo > 0) {
      let _tmpPresItemVM: PrescriptionItemVM = MedsResolve.Where(
        (c) =>
          c != null &&
          !c.IsGroupHeader &&
          c.FormViewerDetails != null &&
          c.FormViewerDetails.BasicDetails != null &&
          c.FormViewerDetails.BasicDetails.InfusionDetails != null &&
          c.FormViewerDetails.BasicDetails.InfusionDetails.GroupSequenceNo ==
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
          c.FormViewerDetails.BasicDetails.InfusionDetails
            .IsAnyItemAdministeredInSeqGroup == 0
      )
        .OrderBy(
          (i) => i.FormViewerDetails.BasicDetails.InfusionDetails.ItemSequenceNo
        )
        .FirstOrDefault();
      if (
        _tmpPresItemVM != null &&
        _tmpPresItemVM.FormViewerDetails != null &&
        _tmpPresItemVM.FormViewerDetails.BasicDetails != null
      ) {
        _InfusionVM =
          _tmpPresItemVM.FormViewerDetails.BasicDetails.InfusionDetails;
      }
    }
    return _InfusionVM;
  }
  public static GetFirstDisCancelActiveItemInfusionVM(
    MedsResolve: ObservableCollection<PrescriptionItemVM>,
    SequenceGroupNo: number
  ): InfusionVM {
    let _InfusionVM: InfusionVM = null;
    if (MedsResolve != null && MedsResolve.Count > 0 && SequenceGroupNo > 0) {
      let _tmpPresItemVM: PrescriptionItemVM = MedsResolve.Where(
        (c) =>
          c != null &&
          !c.IsGroupHeader &&
          c.FormViewerDetails != null &&
          c.FormViewerDetails.BasicDetails != null &&
          c.FormViewerDetails.BasicDetails.InfusionDetails != null &&
          c.FormViewerDetails.BasicDetails.InfusionDetails.GroupSequenceNo ==
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
          (i) => i.FormViewerDetails.BasicDetails.InfusionDetails.ItemSequenceNo
        )
        .FirstOrDefault();
      if (
        _tmpPresItemVM != null &&
        _tmpPresItemVM.FormViewerDetails != null &&
        _tmpPresItemVM.FormViewerDetails.BasicDetails != null
      ) {
        _InfusionVM =
          _tmpPresItemVM.FormViewerDetails.BasicDetails.InfusionDetails;
      }
    }
    return _InfusionVM;
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
          c.FormViewerDetails.BasicDetails.InfusionType != null &&
          !String.IsNullOrEmpty(
            c.FormViewerDetails.BasicDetails.InfusionType.Value
          ) &&
          c.FormViewerDetails.BasicDetails.InfusionDetails != null &&
          c.FormViewerDetails.BasicDetails.InfusionDetails.GroupSequenceNo >
            0 &&
          c.FormViewerDetails.BasicDetails.InfusionDetails.GroupSequenceNo ==
            _GroupSequenceNo &&
          c.FormViewerDetails.BasicDetails.InfusionDetails.ItemSequenceNo >=
            ResetStartItemSeqno
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
            item.FormViewerDetails.BasicDetails.InfusionDetails
              .ParentPrescriptionItemOID > 0
          ) {
            item.FormViewerDetails.BasicDetails.InfusionDetails.ItemSequenceNo =
              ++ResetStartItemSeqno;
            if (
              item != null &&
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
              ) &&
              String.IsNullOrEmpty(item.OperationMode)
            ) {
              item.OperationMode = 'U';
              item.ActionCode = ActivityTypes.Amend;
            }
            item.SequentialActionPerfromCodeAEITS =
              CAActivity.SequentialActionCodeAEITS;
            item.FormViewerDetails.BasicDetails.InfusionDetails.IsSequentialStartDTTMUpdated =
              true;
          }
          if (cnt == count) {
            item.FormViewerDetails.BasicDetails.InfusionDetails.IsLastItem =
              true;
          } else {
            item.FormViewerDetails.BasicDetails.InfusionDetails.IsLastItem =
              false;
          }
        }
        cnt++;
      });
    }
  }
  public static ReassignSequenceNoOnRemove(
    MedsResolve: ObservableCollection<PrescriptionItemVM>,
    InfusionGroupSequenceNo: number,
    SeqNoReassignType: eSequenceNoReassignType,
    oParentBaseVM: IPPMABaseVM
  ): void {
    if (MedsResolve != null && InfusionGroupSequenceNo > 0) {
      if (SeqNoReassignType == eSequenceNoReassignType.ReassignWithinGroup) {
        let RemainingItemsInGroup = MedsResolve.Where(
          (c) =>
            !c.IsGroupHeader &&
            c.FormViewerDetails.BasicDetails.InfusionType != null &&
            !String.IsNullOrEmpty(
              c.FormViewerDetails.BasicDetails.InfusionType.Value
            ) &&
            c.FormViewerDetails.BasicDetails.InfusionDetails != null &&
            c.FormViewerDetails.BasicDetails.InfusionDetails.GroupSequenceNo >
              0 &&
            c.FormViewerDetails.BasicDetails.InfusionDetails.GroupSequenceNo ==
              InfusionGroupSequenceNo &&
            c.FormViewerDetails.BasicDetails.InfusionDetails.ItemSequenceNo > 0
        );
        if (
          RemainingItemsInGroup != null &&
          RemainingItemsInGroup.Count() > 0
        ) {
          CSequentialHelper.ReassignItemSequenceOnRemove(
            InfusionGroupSequenceNo,
            RemainingItemsInGroup
          );
        } else {
          CSequentialHelper.RemoveSequenceHeader(
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
        let objFirstActiveItemInGroup: InfusionVM =
          CSequentialHelper.GetFirstActiveItemInfusionVM(
            MedsResolve,
            itemIndex
          );
        let dtFirstItemStartDTTM: DateTime =
          CSequentialHelper.GetFirstActiveItemStartDTTM(MedsResolve, itemIndex);
        if (
          objFirstActiveItemInGroup != null &&
          DateTime.NotEquals(dtFirstItemStartDTTM, DateTime.MinValue)
        ) {
          let ResetItemSeqno: number =
            objFirstActiveItemInGroup.ItemSequenceNo + 1;
          CSequentialHelper.ReSetStartEnd_DateTIme_OnAmend(
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
      // where item.FormViewerDetails.BasicDetails.InfusionDetails != null && item.FormViewerDetails.BasicDetails.InfusionDetails.GroupSequenceNo > 0
      //     && item.FormViewerDetails.BasicDetails.InfusionDetails.GroupSequenceNo >= RemovedGroupSequenceNo
      // group item by item.FormViewerDetails.BasicDetails.InfusionDetails.GroupSequenceNo into g
      // orderby g.Key
      // select g;
      let _GroupedSequence = MedsResolve.Where(
        (item) =>
          item.FormViewerDetails.BasicDetails.InfusionDetails != null &&
          item.FormViewerDetails.BasicDetails.InfusionDetails.GroupSequenceNo >
            0 &&
          item.FormViewerDetails.BasicDetails.InfusionDetails.GroupSequenceNo >=
            RemovedGroupSequenceNo
      )
        .GroupBy(
          (item) =>
            item.FormViewerDetails.BasicDetails.InfusionDetails.GroupSequenceNo
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
            CSequentialHelper.ReassignItemSequenceOnRemove(
              RemovedGroupSequenceNo,
              sequence.OrderBy(
                (i) =>
                  i.FormViewerDetails.BasicDetails.InfusionDetails
                    .ItemSequenceNo
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
            c.FormViewerDetails.BasicDetails.InfusionDetails != null &&
            c.FormViewerDetails.BasicDetails.InfusionDetails.GroupSequenceNo > 0
        ).Max(
          (i) =>
            i.FormViewerDetails.BasicDetails.InfusionDetails.GroupSequenceNo
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
  public static CommonReassignGroupSequenceOnRemove(
    MedsResolve: ObservableCollection<PrescriptionItemVM>,
    RemovedGroupSequenceNo: number,
    oParentBaseVM: IPPMABaseVM
  ): void {
    if (MedsResolve != null && RemovedGroupSequenceNo > 0) {
      // let _GroupedSequence = from item in MedsResolve
      // where item.FormViewerDetails.BasicDetails.InfusionDetails != null && item.FormViewerDetails.BasicDetails.InfusionDetails.GroupSequenceNo > 0
      //     && item.FormViewerDetails.BasicDetails.InfusionDetails.GroupSequenceNo >= RemovedGroupSequenceNo
      // group item by item.FormViewerDetails.BasicDetails.InfusionDetails.GroupSequenceNo into g
      // orderby g.Key
      // select g;
      let _GroupedSequence = MedsResolve.Where(
        (item) =>
          item.FormViewerDetails.BasicDetails.InfusionDetails != null &&
          item.FormViewerDetails.BasicDetails.InfusionDetails.GroupSequenceNo >
            0 &&
          item.FormViewerDetails.BasicDetails.InfusionDetails.GroupSequenceNo >=
            RemovedGroupSequenceNo
      )
        .GroupBy(
          (item) =>
            item.FormViewerDetails.BasicDetails.InfusionDetails.GroupSequenceNo
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
          }
        });
      }
      // _GroupedSequence = from item in MedsResolve
      // where item.FormViewerDetails.BasicDetails.SequenceInfo != null && item.FormViewerDetails.BasicDetails.SequenceInfo.GroupSequenceNo > 0
      //     && item.FormViewerDetails.BasicDetails.SequenceInfo.GroupSequenceNo >= RemovedGroupSequenceNo
      // group item by item.FormViewerDetails.BasicDetails.SequenceInfo.GroupSequenceNo into g
      // orderby g.Key
      // select g;
      _GroupedSequence = MedsResolve.Where(
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
      if (_GroupedSequence != null && _GroupedSequence.Count() > 0) {
        _IsLastGroupRemoved = false;
        _GroupedSequence.forEach((sequence) => {
          if (sequence != null && sequence.Count() == 1) {
            let _TempHeaderRow: PrescriptionItemVM = sequence.ElementAt(0);
            if (_TempHeaderRow != null && _TempHeaderRow.IsGroupHeader) {
              MedsResolve.Remove(_TempHeaderRow);
            }
          }
        });
      }
      if (_IsLastGroupRemoved) {
        oParentBaseVM.LastInfusionGroupSequenceNo = --RemovedGroupSequenceNo;
      } else {
        CSequentialHelper.CommonReAssignGroupSequenceNo(
          MedsResolve,
          --RemovedGroupSequenceNo
        );
        let iMaxSeqGroupNo: number = 0;
        let sequenceIV = MedsResolve.Where(
          (c) =>
            c.IsGroupHeader &&
            c.FormViewerDetails != null &&
            c.FormViewerDetails.BasicDetails != null &&
            c.FormViewerDetails.BasicDetails.InfusionDetails != null &&
            c.FormViewerDetails.BasicDetails.InfusionDetails.GroupSequenceNo > 0
        ).ToList();
        if (sequenceIV != null && sequenceIV.Count > 0) {
          iMaxSeqGroupNo = MedsResolve.Where(
            (c) =>
              c.IsGroupHeader &&
              c.FormViewerDetails != null &&
              c.FormViewerDetails.BasicDetails != null &&
              c.FormViewerDetails.BasicDetails.InfusionDetails != null &&
              c.FormViewerDetails.BasicDetails.InfusionDetails.GroupSequenceNo >
                0
          ).Max(
            (i) =>
              i.FormViewerDetails.BasicDetails.InfusionDetails.GroupSequenceNo
          );
        } else {
          let sequenceNonIV = MedsResolve.Where(
            (c) =>
              c.IsGroupHeader &&
              c.FormViewerDetails != null &&
              c.FormViewerDetails.BasicDetails != null &&
              c.FormViewerDetails.BasicDetails.SequenceInfo != null &&
              c.FormViewerDetails.BasicDetails.SequenceInfo.GroupSequenceNo > 0
          ).ToList();
          if (sequenceNonIV != null && sequenceNonIV.Count > 0) {
            let iMaxNonIVSeqGroupNo: number = MedsResolve.Where(
              (c) =>
                c.IsGroupHeader &&
                c.FormViewerDetails != null &&
                c.FormViewerDetails.BasicDetails != null &&
                c.FormViewerDetails.BasicDetails.SequenceInfo != null &&
                c.FormViewerDetails.BasicDetails.SequenceInfo.GroupSequenceNo >
                  0
            ).Max(
              (i) =>
                i.FormViewerDetails.BasicDetails.SequenceInfo.GroupSequenceNo
            );
            if (iMaxNonIVSeqGroupNo > iMaxSeqGroupNo) {
              iMaxSeqGroupNo = iMaxNonIVSeqGroupNo;
            }
          }
        }
        if (iMaxSeqGroupNo == 0) {
          oParentBaseVM.LastInfusionGroupSequenceNo =
            oParentBaseVM.OriginalLastInfusionGroupSequence;
        } else {
          oParentBaseVM.LastInfusionGroupSequenceNo = iMaxSeqGroupNo;
        }
      }
    }
  }
  private static ReassignItemSequenceOnRemove(
    _GroupSequenceNo: number,
    ItemsInGroup: IEnumerable<PrescriptionItemVM>
  ): void {
    if (ItemsInGroup != null && ItemsInGroup.Count() > 0) {
      ItemsInGroup = ItemsInGroup.OrderBy(
        (i) => i.FormViewerDetails.BasicDetails.InfusionDetails.ItemSequenceNo
      ).AsEnumerable();
      let nTotalItemCount: number = ItemsInGroup.Where(
        (x) => !x.IsGroupHeader
      ).Max(
        (i) => i.FormViewerDetails.BasicDetails.InfusionDetails.ItemSequenceNo
      );
      let _SequenceNo: number = 1;
      let _PrevItemOID: string, _PrevItemIdentifyingName;
      _PrevItemOID = _PrevItemIdentifyingName = String.Empty;
      let lstAllSequenceName: ObservableCollection<CListItem> = null;
      ItemsInGroup.forEach((item) => {
        let _InfVM: InfusionVM =
          item.FormViewerDetails.BasicDetails.InfusionDetails;
        _InfVM.GroupSequenceNo = _GroupSequenceNo;
        _InfVM.TotalItemsInGroupSequence = nTotalItemCount;
        if (!item.IsGroupHeader) {
          _InfVM.IsLastItem = false;
          _InfVM.ItemSequenceNo =
            item.FormViewerDetails.BasicDetails.InfusionDetails
              .ParentPrescriptionItemOID > 0
              ? item.FormViewerDetails.BasicDetails.InfusionDetails
                  .ItemSequenceNo
              : _SequenceNo;
          if (_SequenceNo == 1) {
            if (_InfVM.PrecedingInfusionItemlst != null) {
              _InfVM.PrecedingInfusionItemlst.Clear();
            }
            _InfVM.SelectedPrecedingInfusionItem = null;
          } else {
            if (_InfVM.PrecedingInfusionItemlst != null) {
              _InfVM.PrecedingInfusionItemlst.Clear();
            } else {
              _InfVM.PrecedingInfusionItemlst =
                new ObservableCollection<CListItem>();
            }
            _InfVM.PrecedingInfusionItemlst.Add(
              ObjectHelper.CreateObject(new CListItem(), {
                Value: _PrevItemOID,
                DisplayText: _PrevItemIdentifyingName,
              })
            );
            _InfVM.SelectedPrecedingInfusionItem =
              _InfVM.PrecedingInfusionItemlst.FirstOrDefault();
          }
          if (
            item != null &&
            item.FormViewerDetails != null &&
            item.FormViewerDetails.BasicDetails != null &&
            item.FormViewerDetails.BasicDetails.InfusionDetails != null &&
            item.FormViewerDetails.BasicDetails.InfusionDetails
              .SequenceNamelst != null
          ) {
            _InfVM.SelectedSequenceName =
              item.FormViewerDetails.BasicDetails.InfusionDetails.SequenceNamelst.Where(
                (s) => s.Value == _InfVM.GroupSequenceNo.ToString()
              ).FirstOrDefault();
            if (
              _InfVM.SelectedSequenceName == null ||
              (_InfVM.SelectedSequenceName != null &&
                String.IsNullOrEmpty(_InfVM.SelectedSequenceName.Value))
            ) {
              if (
                lstAllSequenceName == null ||
                (lstAllSequenceName != null && lstAllSequenceName.Count == 0)
              ) {
                lstAllSequenceName = CSequentialHelper.GetSequenceNameList(
                  item.FormViewerDetails.BasicDetails.oPrescitemVM.ParentbaseVM
                    .MedsResolve,
                  item.FormViewerDetails.BasicDetails.oPrescitemVM.ParentbaseVM
                    .LastInfusionGroupSequenceNo,
                  true
                );
              }
              if (lstAllSequenceName != null && lstAllSequenceName.Count > 0) {
                _InfVM.SelectedSequenceName = lstAllSequenceName
                  .Where((s) => s.Value == _InfVM.GroupSequenceNo.ToString())
                  .FirstOrDefault();
              }
            }
          }
          _PrevItemOID =
            item.PrescriptionItemOID > 0
              ? item.PrescriptionItemOID.ToString()
              : item.UniqueRowID.ToString();
          _PrevItemIdentifyingName = !String.IsNullOrEmpty(
            item.MedLineDisplayText
          )
            ? item.MedLineDisplayText
            : item.FormViewerDetails.BasicDetails.IdentifyingName;
          _SequenceNo++;
        } else {
          item.FormViewerDetails.BasicDetails.InfusionDetails.GroupSequenceNo =
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
          oTempItemInGroup.FormViewerDetails.BasicDetails.InfusionDetails !=
            null
        ) {
          ItemsInGroup.LastOrDefault().FormViewerDetails.BasicDetails.InfusionDetails.IsLastItem =
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
      let _SeqHeader: PrescriptionItemVM ;
      MedsResolve.forEach((c) => {
        if(  c.IsGroupHeader &&
          c.FormViewerDetails.BasicDetails.InfusionDetails != null &&
          c.FormViewerDetails.BasicDetails.InfusionDetails.GroupSequenceNo >
            0 &&
          c.FormViewerDetails.BasicDetails.InfusionDetails.GroupSequenceNo ==
            InfusionGroupSequenceNo &&
          c.FormViewerDetails.BasicDetails.InfusionDetails.ItemSequenceNo == 0
        )
        {
          _SeqHeader =c;
        }
      });
      
      if (_SeqHeader != null) {
        MedsResolve.Remove(_SeqHeader);
      }
  }
}
  public static CommonValidateSequence(
    MedsResolve: ObservableCollection<PrescriptionItemVM>,
    OriginalLastGrpSeqNo: number
  ): void {
    if (MedsResolve != null) {
      let IsSequentialSingleItemGrpCleared: boolean = false;
      IsSequentialSingleItemGrpCleared =
        CSequentialHelper.IVSequenceExcludeSingleItemGroups(MedsResolve);
      let NonIVIsSequentialSingleItemGrpCleared: boolean =
        CSequentialHelper.NonIVSequenceExcludeSingleItemGroups(MedsResolve);
      if (
        NonIVIsSequentialSingleItemGrpCleared &&
        !IsSequentialSingleItemGrpCleared
      ) {
        IsSequentialSingleItemGrpCleared =
          NonIVIsSequentialSingleItemGrpCleared;
      }
      if (IsSequentialSingleItemGrpCleared) {
        CSequentialHelper.CommonReAssignGroupSequenceNo(
          MedsResolve,
          OriginalLastGrpSeqNo
        );
      }
      CSequentialHelper.CommonValidateSequenceOperationMode(MedsResolve);
    }
  }
  public static ClearSeqProperties(oItem: PrescriptionItemVM): void {
    if (
      oItem != null &&
      oItem.FormViewerDetails != null &&
      oItem.FormViewerDetails.BasicDetails != null &&
      oItem.FormViewerDetails.BasicDetails.InfusionDetails != null
    ) {
      let _InfVM: InfusionVM =
        oItem.FormViewerDetails.BasicDetails.InfusionDetails;
      _InfVM.GroupSequenceNo = 0;
      _InfVM.IsDisplayOrderSeqPresc = String.Empty;
      _InfVM.IsSequentiallinkvisi = Visibility.Collapsed;
      _InfVM.ItemSequenceNo = 0;
      _InfVM.ParentPrescriptionItemOID = 0;
      _InfVM.PrescriptionItemNumber = 0;
      _InfVM.SequentialItemOrder = 0;
      _InfVM.TotalCountSeq = 0;
      _InfVM.TotalItemsInGroupSequence = 0;
    }
  }
  public static ClearSequence(oItem: PrescriptionItemVM): void {
    if (
      oItem != null &&
      oItem.FormViewerDetails != null &&
      oItem.FormViewerDetails.BasicDetails != null
    ) {
      if (oItem.FormViewerDetails.BasicDetails.InfusionDetails != null) {
        let objInfusionVM: InfusionVM =
          oItem.FormViewerDetails.BasicDetails.InfusionDetails;
        objInfusionVM.IsEnablePrecedingInfusionItem = true;
        objInfusionVM.IsEnableManageSequence = true;
        objInfusionVM.CboSequenceNamelstVisible = Visibility.Visible;
        objInfusionVM.CboSelectedPrecInfItemlstVisible = Visibility.Visible;
        objInfusionVM.SelectedPrecedingInfusionItem = null;
        objInfusionVM.SelectedSequenceName = null;
        objInfusionVM.OrginalSelectedSequenceName = null;
        objInfusionVM.OrginalSelectedPrecedingInfItem = null;
        objInfusionVM.lblSelectedSequenceNameValue = String.Empty;
        objInfusionVM.lblSelectedPrecInfItemValue = String.Empty;
        objInfusionVM.InfusionItemsIn_Text = String.Empty;
        objInfusionVM.lblSelectedSequenceNameVisible = Visibility.Collapsed;
        objInfusionVM.lblSelectedPrecInfItemVisible = Visibility.Collapsed;
        objInfusionVM.SequenceNameText = String.Empty;
        objInfusionVM.PrecedingInfusionItemText = String.Empty;
        objInfusionVM.SequenceNamelst = null;
        CSequentialHelper.LoadSequenceNameCombo(
          oItem.FormViewerDetails.BasicDetails,
          false
        );
        objInfusionVM.ClearGroupSequenceNo = objInfusionVM.GroupSequenceNo;
        objInfusionVM.ClearItemSequenceNo = objInfusionVM.ItemSequenceNo;
        objInfusionVM.ItemSequenceNo = 0;
        let currDateTime: DateTime = CommonBB.GetServerDateTime();
        oItem.FormViewerDetails.BasicDetails.StartDTTM = currDateTime;
        oItem.FormViewerDetails.BasicDetails.StartPrescriptionTime =
          currDateTime;
        oItem.FormViewerDetails.BasicDetails.IsEnableStartdtSeq = true;
        oItem.FormViewerDetails.BasicDetails.ReviewAfterVisible =
          Visibility.Visible;
        if (
          String.IsNullOrEmpty(
            oItem.FormViewerDetails.BasicDetails.ReviewAfterDateTime
          )
        ) {
          oItem.FormViewerDetails.BasicDetails.ReviewAfterCommentsVisible =
            Visibility.Collapsed;
        } else {
          oItem.FormViewerDetails.BasicDetails.ReviewAfterCommentsVisible =
            Visibility.Visible;
        }
      }
    }
  }
  public static CreateInfusionGroupHeader(
    GroupSequenceNo: number,
    MedsResolve: ObservableCollection<PrescriptionItemVM>
  ): void {
    let ors: OrderSetHelper = new OrderSetHelper();
    let _SequenceHeaderIndex: number = 0;
    let oGroupHeader: PrescriptionItemVM = ors.GetGropingHeader(
      String.Format(
        Resource.Infusion.SequenceGroupHeader_Text,
        GroupSequenceNo
      ),
      0,
      PatientContext.PrescriptionType,
      DateTime.MinValue,
      true
    );
    oGroupHeader.FormViewerDetails.BasicDetails.InfusionDetails.GroupSequenceNo =
      GroupSequenceNo;
    MedsResolve.Insert(_SequenceHeaderIndex, oGroupHeader);
  }
  public static LoadSequenceNameCombo(
    oBasicDetailsVM: BasicDetailsVM,
    _IsFromLoad: boolean
  ): void {
    if (
      oBasicDetailsVM != null &&
      oBasicDetailsVM.InfusionType != null &&
      oBasicDetailsVM.InfusionDetails != null &&
      oBasicDetailsVM.oPrescitemVM != null &&
      oBasicDetailsVM.oPrescitemVM.ParentbaseVM != null &&
      (String.Equals(
        oBasicDetailsVM.InfusionType.Value,
        InfusionTypeCode.CONTINUOUS,
        StringComparison.InvariantCultureIgnoreCase
      ) ||
        String.Equals(
          oBasicDetailsVM.InfusionType.Value,
          InfusionTypeCode.SINGLEDOSEVOLUME,
          StringComparison.InvariantCultureIgnoreCase
        ) ||
        String.Equals(
          oBasicDetailsVM.InfusionType.Value,
          InfusionTypeCode.FLUID,
          StringComparison.InvariantCultureIgnoreCase
        ))
    ) {
      oBasicDetailsVM.InfusionDetails.SequenceNamelst =
        CSequentialHelper.GetSequenceNameList(
          oBasicDetailsVM.oPrescitemVM.ParentbaseVM.MedsResolve,
          oBasicDetailsVM.oPrescitemVM.ParentbaseVM.LastInfusionGroupSequenceNo,
          _IsFromLoad
        );
      oBasicDetailsVM.InfusionDetails.IsManageSequenceVisible =
        Visibility.Visible;
      oBasicDetailsVM.InfusionDetails.CboSequenceNamelstVisible =
        Visibility.Visible;
    }
  }
  public static LoadValuesOnFormLoad(oResolveItem: PrescriptionItemVM): void {
    if (
      oResolveItem.FormViewerDetails.BasicDetails.InfusionType != null &&
      oResolveItem.FormViewerDetails.BasicDetails.InfusionDetails != null
    ) {
      let oTempseqName: CListItem = null;
      let oTempPreceInfItem: CListItem = null;
      if (
        oResolveItem.FormViewerDetails.BasicDetails.InfusionDetails
          .SelectedSequenceName != null &&
        !String.IsNullOrEmpty(
          oResolveItem.FormViewerDetails.BasicDetails.InfusionDetails
            .SelectedSequenceName.Value
        )
      ) {
        oTempseqName =
          oResolveItem.FormViewerDetails.BasicDetails.InfusionDetails
            .SelectedSequenceName;
        oResolveItem.FormViewerDetails.BasicDetails.InfusionDetails.OrginalSelectedSequenceName =
          oTempseqName;
      }
      let canSelectPrecedingItem: boolean = false;
      if (
        !String.Equals(
          oResolveItem.PrescriptionItemStatus,
          CConstants.CANCELLED,
          StringComparison.InvariantCultureIgnoreCase
        )
      ) {
        if (
          oResolveItem != null &&
          oResolveItem.ActionCode == ActivityTypes.Amend
        ) {
          oResolveItem.FormViewerDetails.BasicDetails.InfusionDetails.IsClearSequenceVisible =
            Visibility.Collapsed;
        }
        let oTempPrescItemVM = CSequentialHelper.GetPrecedingInfusionItem(
          oResolveItem.ParentbaseVM.MedsResolve,
          oResolveItem.ParentbaseVM.oTempPrescDisCancelItemVM,
          oResolveItem.FormViewerDetails.BasicDetails.InfusionDetails
            .GroupSequenceNo,
          oResolveItem.FormViewerDetails.BasicDetails.InfusionDetails
            .ItemSequenceNo
        );
        if (
          oResolveItem.FormViewerDetails.BasicDetails.InfusionDetails
            .SelectedPrecedingInfusionItem != null &&
          !String.IsNullOrEmpty(
            oResolveItem.FormViewerDetails.BasicDetails.InfusionDetails
              .SelectedPrecedingInfusionItem.Value
          )
        ) {
          oTempPreceInfItem =
            oResolveItem.FormViewerDetails.BasicDetails.InfusionDetails
              .SelectedPrecedingInfusionItem;
          if (oTempPrescItemVM == null) {
            let PrecedingPresItem = oResolveItem.ParentbaseVM.MedsResolve.Where(
              (p) =>
                p.PrescriptionItemOID ==
                  Convert.ToInt64(
                    oResolveItem.FormViewerDetails.BasicDetails.InfusionDetails
                      .SelectedPrecedingInfusionItem.Value
                  ) && !String.IsNullOrEmpty(p.PrescriptionItemStatus)
            ).FirstOrDefault();
            if (
              PrecedingPresItem != null &&
              !String.IsNullOrEmpty(PrecedingPresItem.PrescriptionItemStatus) &&
              String.Equals(
                PrecedingPresItem.PrescriptionItemStatus,
                CConstants.CANCELLED,
                StringComparison.InvariantCultureIgnoreCase
              )
            ) {
              oTempPreceInfItem = null;
            }
          }
          if (
            oTempPrescItemVM != null &&
            !String.IsNullOrEmpty(oTempPrescItemVM.MedLineDisplayText)
          ) {
            oResolveItem.FormViewerDetails.BasicDetails.InfusionDetails.SelectedPrecedingInfusionItem.DisplayText =
              oTempPrescItemVM.MedLineDisplayText;
          }
        } else {
          if (
            oResolveItem != null &&
            oResolveItem.ActionCode == ActivityTypes.Amend &&
            oResolveItem.ParentbaseVM != null &&
            oResolveItem.ParentbaseVM.MedsResolve != null &&
            oResolveItem.FormViewerDetails != null &&
            oResolveItem.FormViewerDetails.BasicDetails != null &&
            oResolveItem.FormViewerDetails.BasicDetails.InfusionDetails !=
              null &&
            oResolveItem.FormViewerDetails.BasicDetails.InfusionDetails
              .GroupSequenceNo > 0 &&
            oResolveItem.FormViewerDetails.BasicDetails.InfusionDetails
              .ItemSequenceNo > 1
          ) {
            if (
              oTempPrescItemVM != null &&
              oTempPrescItemVM.FormViewerDetails != null &&
              oTempPrescItemVM.FormViewerDetails.BasicDetails != null
            ) {
              oTempPreceInfItem = ObjectHelper.CreateObject(new CListItem(), {
                DisplayText: !String.IsNullOrEmpty(
                  oTempPrescItemVM.MedLineDisplayText
                )
                  ? oTempPrescItemVM.MedLineDisplayText
                  : oTempPrescItemVM.FormViewerDetails.BasicDetails
                      .IdentifyingName,
                Value: oTempPrescItemVM.PrescriptionItemOID.ToString(),
              });
            }
          }
        }
        if (
          oTempPrescItemVM != null &&
          oTempPrescItemVM.FormViewerDetails != null &&
          oTempPrescItemVM.FormViewerDetails.BasicDetails != null
        ) {
          oResolveItem.FormViewerDetails.BasicDetails.InfusionDetails.OrginalSelectedPrecedingInfItem =
            oTempPreceInfItem;
        }
        let _IsFromLoad: boolean = false;
        if (
          oResolveItem.FormViewerDetails.BasicDetails != null &&
          oResolveItem.FormViewerDetails.BasicDetails.InfusionDetails != null &&
          oResolveItem.FormViewerDetails.BasicDetails.InfusionDetails
            .GroupSequenceNo > 0 &&
          oResolveItem.FormViewerDetails.BasicDetails.InfusionDetails
            .ItemSequenceNo > 0
        ) {
          _IsFromLoad = true;
        }
        CSequentialHelper.LoadSequenceNameCombo(
          oResolveItem.FormViewerDetails.BasicDetails,
          _IsFromLoad
        );
        if (
          oResolveItem.FormViewerDetails.BasicDetails != null &&
          oResolveItem.FormViewerDetails.BasicDetails.InfusionDetails != null &&
          oResolveItem.FormViewerDetails.BasicDetails.InfusionDetails
            .IsDisplayItemSequenceNumberVisi == Visibility.Collapsed &&
          oResolveItem.FormViewerDetails.BasicDetails.InfusionDetails
            .GroupSequenceNo > 0 &&
          CSequentialHelper.GetLastItemSequenceNo(
            oResolveItem.ParentbaseVM.MedsResolve,
            oResolveItem.ParentbaseVM.oTempPrescDisCancelItemVM,
            oResolveItem.FormViewerDetails.BasicDetails.InfusionDetails
              .GroupSequenceNo
          ) > 0
        ) {
          oResolveItem.FormViewerDetails.BasicDetails.InfusionDetails.IsDisplayItemSequenceNumberVisi =
            Visibility.Visible;
          oResolveItem.FormViewerDetails.BasicDetails.InfusionDetails.InfusionItemsIn_Text =
            String.Format(
              Resource.Infusion.lblInfusionItemsIn_Text,
              oResolveItem.FormViewerDetails.BasicDetails.InfusionDetails
                .GroupSequenceNo
            );
        }
        canSelectPrecedingItem = true;
        if (
          oResolveItem.FormViewerDetails.BasicDetails.InfusionDetails
            .GroupSequenceNo > 0
        ) {
          oResolveItem.FormViewerDetails.BasicDetails.InfusionDetails.SelectedPrecedingInfusionItemStatusText =
            String.Empty;
          if (
            oTempseqName != null &&
            !String.IsNullOrEmpty(oTempseqName.Value)
          ) {
            let objSelectedSeqGrp: CListItem =
              oResolveItem.FormViewerDetails.BasicDetails.InfusionDetails.SequenceNamelst.Where(
                (c) =>
                  String.Equals(
                    c.Value,
                    oTempseqName.Value,
                    StringComparison.InvariantCultureIgnoreCase
                  )
              ).FirstOrDefault();
            if (objSelectedSeqGrp != null) {
              oResolveItem.FormViewerDetails.BasicDetails.InfusionDetails.SelectedSequenceName =
                objSelectedSeqGrp;
            }
          }
          if (
            oTempPreceInfItem != null &&
            !String.IsNullOrEmpty(oTempPreceInfItem.Value) &&
            oResolveItem.ParentbaseVM.MedsResolve != null &&
            oResolveItem.ParentbaseVM.MedsResolve.Count > 0 &&
            oResolveItem.FormViewerDetails.BasicDetails.InfusionDetails
              .GroupSequenceNo > 0
          ) {
            oResolveItem.FormViewerDetails.BasicDetails.InfusionDetails.PrecedingInfusionItemlst =
              new ObservableCollection<CListItem>();
            let oTempPreceInfusionlst: CListItem = ObjectHelper.CreateObject(
              new CListItem(),
              {
                DisplayText: oTempPreceInfItem.DisplayText,
                Value: oTempPreceInfItem.Value,
              }
            );
            oResolveItem.FormViewerDetails.BasicDetails.InfusionDetails.PrecedingInfusionItemlst.Add(
              oTempPreceInfusionlst
            );
            oResolveItem.FormViewerDetails.BasicDetails.InfusionDetails.SelectedPrecedingInfusionItem =
              oTempPreceInfusionlst;
          }
          if (
            oResolveItem.FormViewerDetails.BasicDetails.InfusionDetails
              .ParentPrescriptionItemOID > 0 ||
            (oResolveItem.ParentbaseVM.MedsResolve != null &&
              oResolveItem.ParentbaseVM.MedsResolve.Count > 0 &&
              oResolveItem.FormViewerDetails.BasicDetails.InfusionDetails
                .ItemSequenceNo > 0 &&
              oResolveItem.FormViewerDetails.BasicDetails.InfusionDetails
                .GroupSequenceNo > 0)
          ) {
            if (
              oTempseqName != null &&
              !String.IsNullOrEmpty(oTempseqName.DisplayText)
            ) {
              canSelectPrecedingItem = false;
              oResolveItem.FormViewerDetails.BasicDetails.InfusionDetails.CboSequenceNamelstVisible =
                Visibility.Collapsed;
              oResolveItem.FormViewerDetails.BasicDetails.InfusionDetails.CboSelectedPrecInfItemlstVisible =
                Visibility.Collapsed;
              oResolveItem.FormViewerDetails.BasicDetails.InfusionDetails.lblSelectedSequenceNameVisible =
                Visibility.Visible;
              oResolveItem.FormViewerDetails.BasicDetails.InfusionDetails.lblSelectedSequenceNameValue =
                oTempseqName.DisplayText;
              oResolveItem.FormViewerDetails.BasicDetails.InfusionDetails.lblSelectedPrecInfItemVisible =
                Visibility.Visible;
              oResolveItem.FormViewerDetails.BasicDetails.ReviewAfterVisible =
                Visibility.Collapsed;
              oResolveItem.FormViewerDetails.BasicDetails.ReviewAfterCommentsVisible =
                Visibility.Collapsed;
              oResolveItem.FormViewerDetails.BasicDetails.InfusionDetails.lblSelectedPrecInfItemValue =
                oTempPreceInfItem != null &&
                !String.IsNullOrEmpty(oTempPreceInfItem.DisplayText) &&
                oResolveItem.FormViewerDetails.BasicDetails.InfusionDetails
                  .ItemSequenceNo > 1
                  ? oTempPreceInfItem.DisplayText
                  : String.Empty;
              if (oTempPrescItemVM != null) {
                if (
                  String.Equals(
                    oTempPrescItemVM.PrescriptionItemStatus,
                    CConstants.DISCONTINUED,
                    StringComparison.OrdinalIgnoreCase
                  ) ||
                  String.Equals(
                    oTempPrescItemVM.PrescriptionItemStatus,
                    CConstants.COMPLETED,
                    StringComparison.OrdinalIgnoreCase
                  )
                ) {
                  let sPresItemStatus: string = String.Empty;
                  if (MedicationCommonConceptCodeData.ConceptCodes != null) {
                    sPresItemStatus =
                      '[' +
                      Common.GetText(
                        oTempPrescItemVM.PrescriptionItemStatus,
                        MedicationCommonConceptCodeData.ConceptCodes
                      ) +
                      '] ';
                  } else {
                    sPresItemStatus =
                      '[' + oTempPrescItemVM.PrescriptionItemStatus + '] ';
                  }
                  if (
                    !oResolveItem.FormViewerDetails.BasicDetails.InfusionDetails.lblSelectedPrecInfItemValue.Contains(
                      sPresItemStatus
                    )
                  ) {
                    oResolveItem.FormViewerDetails.BasicDetails.InfusionDetails.SelectedPrecedingInfusionItemStatusText =
                      sPresItemStatus;
                  }
                }
              }
            }
          }
        } else {
          oResolveItem.FormViewerDetails.BasicDetails.InfusionDetails.IsClearSequenceEnabled =
            false;
        }
      } else {
        oResolveItem.FormViewerDetails.BasicDetails.InfusionDetails.IsDisplayItemSequenceNumberVisi =
          Visibility.Collapsed;
      }
      if (
        canSelectPrecedingItem &&
        !String.IsNullOrEmpty(
          oResolveItem.FormViewerDetails.BasicDetails.SeqInfusionStatus
        ) &&
        (oResolveItem.FormViewerDetails.BasicDetails.SeqInfusionStatus.Equals(
          CnstSlotStatus.INPROGRESS,
          StringComparison.OrdinalIgnoreCase
        ) ||
          oResolveItem.FormViewerDetails.BasicDetails.SeqInfusionStatus.Equals(
            CnstSlotStatus.PAUSED,
            StringComparison.OrdinalIgnoreCase
          ))
      ) {
        oResolveItem.FormViewerDetails.BasicDetails.InfusionDetails.IsManageSequenceVisible =
          Visibility.Collapsed;
        oResolveItem.FormViewerDetails.BasicDetails.InfusionDetails.CboSequenceNamelstVisible =
          Visibility.Collapsed;
      }
    }
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
      (objNewItemVM.FormViewerDetails.BasicDetails.InfusionDetails
        .SelectedSequenceName != null ||
        objNewItemVM.FormViewerDetails.BasicDetails.Ordersets != null) &&
      objNewItemVM.FormViewerDetails.BasicDetails.InfusionType != null &&
      !String.IsNullOrEmpty(
        objNewItemVM.FormViewerDetails.BasicDetails.InfusionType.Value
      ) &&
      (String.Equals(
        objNewItemVM.FormViewerDetails.BasicDetails.InfusionType.Value,
        InfusionTypeCode.CONTINUOUS,
        StringComparison.InvariantCultureIgnoreCase
      ) ||
        String.Equals(
          objNewItemVM.FormViewerDetails.BasicDetails.InfusionType.Value,
          InfusionTypeCode.SINGLEDOSEVOLUME,
          StringComparison.InvariantCultureIgnoreCase
        ) ||
        String.Equals(
          objNewItemVM.FormViewerDetails.BasicDetails.InfusionType.Value,
          InfusionTypeCode.FLUID,
          StringComparison.InvariantCultureIgnoreCase
        ))
    ) {
      if (
        objNewItemVM.FormViewerDetails.BasicDetails.InfusionDetails
          .ItemSequenceNo == 0
      ) {
        if (
          objNewItemVM.FormViewerDetails.BasicDetails.InfusionDetails
            .GroupSequenceNo > 0
        ) {
          objNewItemVM.FormViewerDetails.BasicDetails.InfusionDetails.ItemSequenceNo =
            CSequentialHelper.GetNextItemSequenceNo(
              MedsResolve,
              oIPPABaseVM.oTempPrescDisCancelItemVM,
              objNewItemVM.FormViewerDetails.BasicDetails.InfusionDetails
                .GroupSequenceNo
            );
          CSequentialHelper.UpdateTotalItemsInGroupSequence(
            objNewItemVM.FormViewerDetails.BasicDetails.InfusionDetails
              .GroupSequenceNo,
            MedsResolve,
            objNewItemVM
          );
          if (
            objNewItemVM.FormViewerDetails.BasicDetails.InfusionDetails
              .ClearGroupSequenceNo > 0
          ) {
            let anyitemInAmend = objNewItemVM.ParentbaseVM.MedsResolve.Where(
              (p) =>
                p.FormViewerDetails != null &&
                p.FormViewerDetails.BasicDetails != null &&
                p.FormViewerDetails.BasicDetails.InfusionDetails != null &&
                p.FormViewerDetails.BasicDetails.InfusionDetails
                  .GroupSequenceNo ==
                  objNewItemVM.FormViewerDetails.BasicDetails.InfusionDetails
                    .ClearGroupSequenceNo &&
                p.ActionCode == ActivityTypes.Amend
            ).ToList();
            if (
              anyitemInAmend == null ||
              (anyitemInAmend != null && anyitemInAmend.Count == 0)
            ) {
              CSequentialHelper.ReassignSequenceNoOnRemove(
                objNewItemVM.ParentbaseVM.MedsResolve,
                objNewItemVM.FormViewerDetails.BasicDetails.InfusionDetails
                  .ClearGroupSequenceNo,
                eSequenceNoReassignType.ReassignWithinGroup,
                objNewItemVM.ParentbaseVM
              );
            }
            objNewItemVM.FormViewerDetails.BasicDetails.InfusionDetails.ClearGroupSequenceNo = 0;
            objNewItemVM.FormViewerDetails.BasicDetails.InfusionDetails.ClearItemSequenceNo = 0;
          }
        } else {
          objNewItemVM.FormViewerDetails.BasicDetails.InfusionDetails.GroupSequenceNo =
            CSequentialHelper.GetNextGroupSequenceNo(
              MedsResolve,
              oIPPABaseVM.LastInfusionGroupSequenceNo
            );
          oIPPABaseVM.LastInfusionGroupSequenceNo =
            objNewItemVM.FormViewerDetails.BasicDetails.InfusionDetails.GroupSequenceNo;
          CSequentialHelper.CreateInfusionGroupHeader(
            objNewItemVM.FormViewerDetails.BasicDetails.InfusionDetails
              .GroupSequenceNo,
            MedsResolve
          );
          if (
            objNewItemVM.FormViewerDetails.BasicDetails.InfusionDetails
              .SelectedPrecedingInfusionItem != null &&
            !String.IsNullOrEmpty(
              objNewItemVM.FormViewerDetails.BasicDetails.InfusionDetails
                .SelectedPrecedingInfusionItem.Value
            ) &&
            objNewItemVM.FormViewerDetails.BasicDetails.InfusionDetails
              .SelectedSequenceName != null &&
            !String.IsNullOrEmpty(
              objNewItemVM.FormViewerDetails.BasicDetails.InfusionDetails
                .SelectedSequenceName.Value
            ) &&
            String.Equals(
              objNewItemVM.FormViewerDetails.BasicDetails.InfusionDetails
                .SelectedSequenceName.Value,
              CConstants.NewSequenceCode,
              StringComparison.InvariantCultureIgnoreCase
            )
          ) {
            let _PrecedingPrescItemOID: number = 0;
            let _SameSessionPrescItem: boolean = false;
            let bPrescItemoid: boolean = Int64.TryParse(
              objNewItemVM.FormViewerDetails.BasicDetails.InfusionDetails
                .SelectedPrecedingInfusionItem.Value,
              (o) => {
                _PrecedingPrescItemOID = o;
              }
            );
            if (bPrescItemoid) {
              let _ExistingPrescrItem: PrescriptionItemVM = MedsResolve.Where(
                (c) =>
                  c != null &&
                  (c.PrescriptionItemOID == _PrecedingPrescItemOID ||
                    c.UniqueRowID == _PrecedingPrescItemOID)
              ).FirstOrDefault();
              let oAmendPrecedingInfusionItem: boolean =
                MedsResolve.Where(
                  (c) =>
                    c != null && c.PrescriptionItemOID == _PrecedingPrescItemOID
                ).Count() > 0;
              if (!oAmendPrecedingInfusionItem) {
                _SameSessionPrescItem = true;
              }
              if (_ExistingPrescrItem != null) {
                _ExistingPrescrItem.FormViewerDetails.BasicDetails.InfusionDetails.GroupSequenceNo =
                  objNewItemVM.FormViewerDetails.BasicDetails.InfusionDetails.GroupSequenceNo;
                _ExistingPrescrItem.FormViewerDetails.BasicDetails.InfusionDetails.ItemSequenceNo = 1;
                _ExistingPrescrItem.FormViewerDetails.BasicDetails.InfusionDetails.TotalItemsInGroupSequence = 2;
                _ExistingPrescrItem.FormViewerDetails.BasicDetails.InfusionDetails.IsLastItem =
                  false;
                _ExistingPrescrItem.FormViewerDetails.BasicDetails.InfusionDetails.PrescriptionItemNumber =
                  _PrecedingPrescItemOID;
                if (
                 DateTime.NotEquals(_ExistingPrescrItem.FormViewerDetails.BasicDetails
                    .ReviewAfterDTTM, DateTime.MinValue)
                ) {
                  CSequentialHelper.ClearReviewDetails(
                    _ExistingPrescrItem,
                    false
                  );
                }
                objNewItemVM.FormViewerDetails.BasicDetails.InfusionDetails.SequenceNamelst.Add(
                  ObjectHelper.CreateObject(new CListItem(), {
                    DisplayText: String.Format(
                      Resource.Infusion.ExsitingSequenceNo,
                      _ExistingPrescrItem.FormViewerDetails.BasicDetails
                        .InfusionDetails.GroupSequenceNo
                    ),
                    Value:
                      _ExistingPrescrItem.FormViewerDetails.BasicDetails.InfusionDetails.GroupSequenceNo.ToString(),
                  })
                );
                _ExistingPrescrItem.FormViewerDetails.BasicDetails.InfusionDetails.SequenceNamelst =
                  objNewItemVM.FormViewerDetails.BasicDetails.InfusionDetails.SequenceNamelst;
                let oTempSequenceName =
                  objNewItemVM.FormViewerDetails.BasicDetails.InfusionDetails.SequenceNamelst.Where(
                    (s) =>
                      s.Value ==
                      _ExistingPrescrItem.FormViewerDetails.BasicDetails.InfusionDetails.GroupSequenceNo.ToString()
                  ).FirstOrDefault();
                if (oTempSequenceName != null) {
                  _ExistingPrescrItem.FormViewerDetails.BasicDetails.InfusionDetails.SelectedSequenceName =
                    oTempSequenceName;
                }
                MedsResolve.Remove(_ExistingPrescrItem);
                _ExistingPrescrItem.FormViewerDetails.BasicDetails.InfusionDetails.IsSequentiallinkvisi =
                  Visibility.Visible;
                if (!_SameSessionPrescItem) {
                  if (String.IsNullOrEmpty(_ExistingPrescrItem.OperationMode)) {
                    _ExistingPrescrItem.OperationMode = 'U';
                    _ExistingPrescrItem.SequentialActionPerfromCodeAEITS =
                      CAActivity.SequentialActionCodeAEITS;
                  }
                  _ExistingPrescrItem.FormViewerDetails.BasicDetails.InfusionDetails.ParentPrescriptionItemOID =
                    _PrecedingPrescItemOID;
                } else {
                  _ExistingPrescrItem.OperationMode = 'N';
                  objNewItemVM.FormViewerDetails.BasicDetails.InfusionDetails.PrescriptionItemNumber =
                    _PrecedingPrescItemOID;
                }
                MedsResolve.Insert(1, _ExistingPrescrItem);
              }
              objNewItemVM.FormViewerDetails.BasicDetails.InfusionDetails.ItemSequenceNo =
                _ExistingPrescrItem != null ? 2 : 1;
              objNewItemVM.FormViewerDetails.BasicDetails.InfusionDetails.TotalItemsInGroupSequence =
                _ExistingPrescrItem != null ? 2 : 1;
              objNewItemVM.FormViewerDetails.BasicDetails.InfusionDetails.IsLastItem =
                true;
              objNewItemVM.FormViewerDetails.BasicDetails.InfusionDetails.SelectedSequenceName =
                objNewItemVM.FormViewerDetails.BasicDetails.InfusionDetails.SequenceNamelst.Where(
                  (s) =>
                    s.Value ==
                    objNewItemVM.FormViewerDetails.BasicDetails.InfusionDetails.GroupSequenceNo.ToString()
                ).FirstOrDefault();
            }
          } else {
            objNewItemVM.FormViewerDetails.BasicDetails.InfusionDetails.ItemSequenceNo = 1;
            objNewItemVM.FormViewerDetails.BasicDetails.InfusionDetails.TotalItemsInGroupSequence = 1;
            objNewItemVM.FormViewerDetails.BasicDetails.InfusionDetails.IsLastItem =
              true;
            if (objNewItemVM.FormViewerDetails.BasicDetails.Ordersets == null) {
              objNewItemVM.FormViewerDetails.BasicDetails.InfusionDetails.SequenceNamelst.Add(
                ObjectHelper.CreateObject(new CListItem(), {
                  DisplayText: String.Format(
                    Resource.Infusion.ExsitingSequenceNo,
                    objNewItemVM.FormViewerDetails.BasicDetails.InfusionDetails
                      .GroupSequenceNo
                  ),
                  Value:
                    objNewItemVM.FormViewerDetails.BasicDetails.InfusionDetails.GroupSequenceNo.ToString(),
                })
              );
              objNewItemVM.FormViewerDetails.BasicDetails.InfusionDetails.SelectedSequenceName =
                objNewItemVM.FormViewerDetails.BasicDetails.InfusionDetails.SequenceNamelst.Where(
                  (s) =>
                    s.Value ==
                    objNewItemVM.FormViewerDetails.BasicDetails.InfusionDetails.GroupSequenceNo.ToString()
                ).FirstOrDefault();
            }
          }
          if (
            objNewItemVM.FormViewerDetails.BasicDetails.InfusionDetails
              .ClearGroupSequenceNo > 0
          ) {
            let anyitemInAmend = objNewItemVM.ParentbaseVM.MedsResolve.Where(
              (p) =>
                p.FormViewerDetails != null &&
                p.FormViewerDetails.BasicDetails != null &&
                p.FormViewerDetails.BasicDetails.InfusionDetails != null &&
                p.FormViewerDetails.BasicDetails.InfusionDetails
                  .GroupSequenceNo ==
                  objNewItemVM.FormViewerDetails.BasicDetails.InfusionDetails
                    .ClearGroupSequenceNo &&
                p.ActionCode == ActivityTypes.Amend
            ).ToList();
            if (
              anyitemInAmend == null ||
              (anyitemInAmend != null && anyitemInAmend.Count == 0)
            ) {
              CSequentialHelper.ReassignSequenceNoOnRemove(
                objNewItemVM.ParentbaseVM.MedsResolve,
                objNewItemVM.FormViewerDetails.BasicDetails.InfusionDetails
                  .ClearGroupSequenceNo,
                eSequenceNoReassignType.ReassignWithinGroup,
                objNewItemVM.ParentbaseVM
              );
            }
            objNewItemVM.FormViewerDetails.BasicDetails.InfusionDetails.ClearGroupSequenceNo = 0;
            objNewItemVM.FormViewerDetails.BasicDetails.InfusionDetails.ClearItemSequenceNo = 0;
          }
        }
      }
    } else {
      objNewItemVM.FormViewerDetails.BasicDetails.InfusionDetails.GroupSequenceNo = 0;
      objNewItemVM.FormViewerDetails.BasicDetails.InfusionDetails.ItemSequenceNo = 0;
      objNewItemVM.FormViewerDetails.BasicDetails.InfusionDetails.TotalItemsInGroupSequence = 0;
      objNewItemVM.FormViewerDetails.BasicDetails.InfusionDetails.PrescriptionItemNumber = 0;
      objNewItemVM.FormViewerDetails.BasicDetails.InfusionDetails.ParentPrescriptionItemOID = 0;
      objNewItemVM.FormViewerDetails.BasicDetails.InfusionDetails.IsSequentiallinkvisi =
        Visibility.Collapsed;
      objNewItemVM.FormViewerDetails.BasicDetails.InfusionDetails.IsLastItem =
        false;
    }
  }
  public static ClearReviewDetails(
    _ExistingPrescrItem: PrescriptionItemVM,
    IsFromBrandorProduct: boolean
  ): void {
    _ExistingPrescrItem.FormViewerDetails.BasicDetails.IsReviewAvailableBeforeSequence =
      !IsFromBrandorProduct;
    _ExistingPrescrItem.FormViewerDetails.BasicDetails.ReviewAfter =
      String.Empty;
    _ExistingPrescrItem.FormViewerDetails.BasicDetails.ReviewafterUOM = null;
    _ExistingPrescrItem.FormViewerDetails.BasicDetails.currentItemReviewafter =
      String.Empty;
    _ExistingPrescrItem.FormViewerDetails.BasicDetails.currentItemReviewafterUOM =
      null;
    _ExistingPrescrItem.FormViewerDetails.BasicDetails.ReviewAfterDTTM =
      DateTime.MinValue;
    _ExistingPrescrItem.FormViewerDetails.BasicDetails.ReviewRequestComments =
      String.Empty;
    _ExistingPrescrItem.FormViewerDetails.BasicDetails.ReviewAfterDateTime =
      String.Empty;
    _ExistingPrescrItem.FormViewerDetails.BasicDetails.ReviewAfterVisible =
      Visibility.Collapsed;
    _ExistingPrescrItem.FormViewerDetails.BasicDetails.ReviewAfterCommentsVisible =
      Visibility.Collapsed;
    _ExistingPrescrItem.FormViewerDetails.BasicDetails.ReviewAfterIconVisible =
      Visibility.Collapsed;
    if (
      _ExistingPrescrItem.FormViewerDetails.BasicDetails.ManageReviewDetail !=
      null
    ) {
      _ExistingPrescrItem.FormViewerDetails.BasicDetails.ManageReviewDetail =
        null;
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
          c.FormViewerDetails.BasicDetails.InfusionDetails != null &&
          c.FormViewerDetails.BasicDetails.InfusionDetails.GroupSequenceNo ==
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
          c.FormViewerDetails.BasicDetails.InfusionDetails.ItemSequenceNo > 0
      )
        .OrderBy(
          (i) => i.FormViewerDetails.BasicDetails.InfusionDetails.ItemSequenceNo
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
    if (list == null || typeof(list) == "undefined" || item == null || typeof(item) == "undefined") return false;
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
            x.FormViewerDetails.BasicDetails.InfusionDetails != null &&
            x.FormViewerDetails.BasicDetails.InfusionDetails.GroupSequenceNo >
              0 &&
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
    if (list == null || typeof(list) == "undefined" || item == null || typeof(item) == "undefined") return false;
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
      item.FormViewerDetails.BasicDetails.InfusionDetails != null &&
      item.FormViewerDetails.BasicDetails.InfusionDetails.GroupSequenceNo > 0;
    if (!isSequentialInfusionItem) return false;
    let pos: number = list.IndexOf(item);
    if (pos == list.Count - 1) return true;
    let nextIsSequentialInfusionItem: boolean =
      list[pos + 1] != null &&
      list[pos + 1].FormViewerDetails != null &&
      list[pos + 1].FormViewerDetails.BasicDetails != null &&
      list[pos + 1].FormViewerDetails.BasicDetails.InfusionDetails != null &&
      list[pos + 1].FormViewerDetails.BasicDetails.InfusionDetails
        .GroupSequenceNo > 0;
    if (!nextIsSequentialInfusionItem) return true;
    return (
      item.FormViewerDetails.BasicDetails.InfusionDetails.GroupSequenceNo !=
      list[pos + 1].FormViewerDetails.BasicDetails.InfusionDetails
        .GroupSequenceNo
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
            x != null &&
            x.FormViewerDetails != null &&
            x.FormViewerDetails.BasicDetails != null &&
            x.FormViewerDetails.BasicDetails.InfusionDetails != null &&
            x.FormViewerDetails.BasicDetails.InfusionDetails.GroupSequenceNo ==
              nGroupSequenceNumber &&
            !x.IsGroupHeader &&
            x.FormViewerDetails.BasicDetails.InfusionDetails.ItemSequenceNo !=
              objNewItem.FormViewerDetails.BasicDetails.InfusionDetails
                .ItemSequenceNo
        );
      } else {
        objSeqItems = MedsResolve.Where(
          (x) =>
            x.FormViewerDetails != null &&
            x.FormViewerDetails.BasicDetails != null &&
            x.FormViewerDetails.BasicDetails.InfusionDetails != null &&
            x.FormViewerDetails.BasicDetails.InfusionDetails.GroupSequenceNo ==
              nGroupSequenceNumber &&
            !x.IsGroupHeader
        );
      }
      let nTotSeqCount: number = 0;
      if (objSeqItems != null && objSeqItems.Count() > 0) {
        nTotSeqCount = objSeqItems.Max(
          (x) => x.FormViewerDetails.BasicDetails.InfusionDetails.ItemSequenceNo
        );
        if (
          objNewItem != null &&
          nTotSeqCount <
            objNewItem.FormViewerDetails.BasicDetails.InfusionDetails
              .ItemSequenceNo
        ) {
          nTotSeqCount =
            objNewItem.FormViewerDetails.BasicDetails.InfusionDetails
              .ItemSequenceNo;
        }
        objSeqItems.forEach((objSeqItem) => {
          objSeqItem.FormViewerDetails.BasicDetails.InfusionDetails.TotalItemsInGroupSequence =
            nTotSeqCount;
          objSeqItem.FormViewerDetails.BasicDetails.InfusionDetails.IsLastItem =
            false;
        });
      }
      if (objNewItem != null) {
        objNewItem.FormViewerDetails.BasicDetails.InfusionDetails.TotalItemsInGroupSequence =
          nTotSeqCount;
        objNewItem.FormViewerDetails.BasicDetails.InfusionDetails.IsLastItem =
          true;
      }
    }
  }
  public static GetPrecedingInfusionItem(
    MedsResolve: ObservableCollection<PrescriptionItemVM>,
    oDisCancelItems: List<PrescriptionItemVM>,
    GroupSequenceNo: number,
    ItemSequenceNo: number
  ): PrescriptionItemVM {
    let oPrescInfusionItem: PrescriptionItemVM = null;
    let oTempPrescInfnItem: IEnumerable<PrescriptionItemVM> = null;
    if (MedsResolve != null && GroupSequenceNo > 0 && ItemSequenceNo > 0) {
      oTempPrescInfnItem = MedsResolve.Where(
        (c) =>
          c.FormViewerDetails != null &&
          c.FormViewerDetails.BasicDetails != null &&
          c.FormViewerDetails.BasicDetails.InfusionDetails != null &&
          c.FormViewerDetails.BasicDetails.InfusionDetails.GroupSequenceNo ==
            GroupSequenceNo &&
          c.FormViewerDetails.BasicDetails.InfusionDetails.ItemSequenceNo > 0 &&
          c.FormViewerDetails.BasicDetails.InfusionDetails.ItemSequenceNo <=
            ItemSequenceNo - 1 &&
          (String.IsNullOrEmpty(c.PrescriptionItemStatus) ||
            (!String.IsNullOrEmpty(c.PrescriptionItemStatus) &&
              !c.PrescriptionItemStatus.Equals(
                CConstants.CANCELLED,
                StringComparison.InvariantCultureIgnoreCase
              )))
      )
        .OrderBy(
          (x) => x.FormViewerDetails.BasicDetails.InfusionDetails.ItemSequenceNo
        )
        .AsEnumerable();
      if (
        oTempPrescInfnItem.FirstOrDefault() == null &&
        oDisCancelItems != null
      ) {
        oTempPrescInfnItem = oDisCancelItems
          .Where(
            (c) =>
              c.FormViewerDetails != null &&
              c.FormViewerDetails.BasicDetails != null &&
              c.FormViewerDetails.BasicDetails.InfusionDetails != null &&
              c.FormViewerDetails.BasicDetails.InfusionDetails
                .GroupSequenceNo == GroupSequenceNo &&
              c.FormViewerDetails.BasicDetails.InfusionDetails.ItemSequenceNo >
                0 &&
              c.FormViewerDetails.BasicDetails.InfusionDetails.ItemSequenceNo ==
                ItemSequenceNo - 1 &&
              (String.IsNullOrEmpty(c.PrescriptionItemStatus) ||
                (!String.IsNullOrEmpty(c.PrescriptionItemStatus) &&
                  !c.PrescriptionItemStatus.Equals(
                    CConstants.CANCELLED,
                    StringComparison.InvariantCultureIgnoreCase
                  )))
          )
          .OrderBy(
            (x) =>
              x.FormViewerDetails.BasicDetails.InfusionDetails.ItemSequenceNo
          )
          .AsEnumerable();
      }
      if (oTempPrescInfnItem != null && oTempPrescInfnItem.Count() > 0) {
        oPrescInfusionItem = oTempPrescInfnItem.LastOrDefault();
      }
    }
    return oPrescInfusionItem;
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
      //     c.FormViewerDetails.BasicDetails.InfusionDetails != null &&
      //     c.FormViewerDetails.BasicDetails.InfusionDetails.GroupSequenceNo >
      //       0 &&
      //     !String.IsNullOrEmpty(c.OperationMode) &&
      //     c.OperationMode.Equals('N')
      // );
      if (_SeqItem != null) {
        lnGroupSequenceNo =
          _SeqItem.FormViewerDetails.BasicDetails.InfusionDetails
            .GroupSequenceNo;
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
    {
      let _SeqItem: PrescriptionItemVM = null;
      if (nGropSeqNo > 0 && nItemSeqNo > 0) {
        // _SeqItem = MedsResolve.FirstOrDefault(
        //   (c) =>
        //     c.FormViewerDetails != null &&
        //     c.FormViewerDetails.BasicDetails != null &&
        //     c.FormViewerDetails.BasicDetails.InfusionDetails != null &&
        //     c.FormViewerDetails.BasicDetails.InfusionDetails.GroupSequenceNo ==
        //       nGropSeqNo &&
        //     c.FormViewerDetails.BasicDetails.InfusionDetails.ItemSequenceNo ==
        //       nItemSeqNo
        // );
        MedsResolve.forEach((c)=>{
          if(c.FormViewerDetails != null &&
            c.FormViewerDetails.BasicDetails != null &&
            c.FormViewerDetails.BasicDetails.InfusionDetails != null &&
            c.FormViewerDetails.BasicDetails.InfusionDetails.GroupSequenceNo ==
              nGropSeqNo &&
            c.FormViewerDetails.BasicDetails.InfusionDetails.ItemSequenceNo ==
              nItemSeqNo){
              _SeqItem = c;
              }
        });
      } else {
        let iTotalItemInSeq: number = MedsResolve.Where(
          (c) =>
            !c.IsGroupHeader &&
            c.FormViewerDetails != null &&
            c.FormViewerDetails.BasicDetails != null &&
            c.FormViewerDetails.BasicDetails.Ordersets != null &&
            c.FormViewerDetails.BasicDetails.Ordersets.Value == ordersetID &&
            c.FormViewerDetails.BasicDetails.InfusionDetails != null &&
            c.FormViewerDetails.BasicDetails.InfusionDetails.GroupSequenceNo >
              0 &&
            !String.IsNullOrEmpty(c.OperationMode) &&
            c.OperationMode.Equals('N')
        ).Count();
        _SeqItem = MedsResolve.FirstOrDefault(
          (c) =>
            c.FormViewerDetails != null &&
            c.FormViewerDetails.BasicDetails != null &&
            c.FormViewerDetails.BasicDetails.Ordersets != null &&
            c.FormViewerDetails.BasicDetails.Ordersets.Value == ordersetID &&
            c.FormViewerDetails.BasicDetails.InfusionDetails != null &&
            c.FormViewerDetails.BasicDetails.InfusionDetails.GroupSequenceNo >
              0 &&
            c.FormViewerDetails.BasicDetails.InfusionDetails.ItemSequenceNo ==
              iTotalItemInSeq
        );
      }
      if (_SeqItem != null) {
        let _dt: DateTime = DateTime.MinValue;
        let infPeriod: number = 0;
        let infUomLorenzoID: string = String.Empty;
        if (
          _SeqItem.FormViewerDetails != null &&
          _SeqItem.FormViewerDetails.BasicDetails != null &&
          _SeqItem.FormViewerDetails.BasicDetails.InfusionDetails != null
        ) {
          if (
            !String.IsNullOrEmpty(
              _SeqItem.FormViewerDetails.BasicDetails.InfusionDetails
                .InfusionPeriod
            )
          ) {
            infPeriod = Convert.ToDouble(
              _SeqItem.FormViewerDetails.BasicDetails.InfusionDetails
                .InfusionPeriod
            );
          }
          if (
            _SeqItem.FormViewerDetails.BasicDetails.InfusionDetails
              .InfusionPeriodUom != null &&
            _SeqItem.FormViewerDetails.BasicDetails.InfusionDetails
              .InfusionPeriodUom.Tag != null
          ) {
            infUomLorenzoID =
              _SeqItem.FormViewerDetails.BasicDetails.InfusionDetails.InfusionPeriodUom.Tag.ToString();
          }
        }
        CSequentialHelper.CalInfPeriodBaseEndDTTM(
          infPeriod,
          infUomLorenzoID,
          _SeqItem.FormViewerDetails.BasicDetails.StartPrescriptionTime,
          (o) => {
            _dt = o;
          }
        );
        if (DateTime.NotEquals(_dt, DateTime.MinValue)) {
          dtSeqNextStartDTTM = _dt;
        }
      }
    }
    return dtSeqNextStartDTTM;
  }
  public static CalInfPeriodBaseEndDTTM(
    _InfPeriod: number,
    _InfPeriodLorenzoID: string,
    AdminStartDTTM: DateTime,
    out1: (_EndDTTM: DateTime) => void
  ): void {
    let _EndDTTM: DateTime;
    _EndDTTM = DateTime.MinValue;
    if (
      !String.IsNullOrEmpty(_InfPeriodLorenzoID) &&
      DateTime.NotEquals(AdminStartDTTM, DateTime.MinValue) &&
      _InfPeriod > 0
    ) {
      if (_InfPeriodLorenzoID == 'UOM-46')
        _EndDTTM = AdminStartDTTM.AddHours(_InfPeriod);
      else if (_InfPeriodLorenzoID == 'UOM-43')
        _EndDTTM = AdminStartDTTM.AddMinutes(_InfPeriod);
      else if (_InfPeriodLorenzoID == 'UOM-42')
        _EndDTTM = AdminStartDTTM.AddSeconds(_InfPeriod);
      else if (_InfPeriodLorenzoID == 'UOM-47')
        _EndDTTM = AdminStartDTTM.AddDays(_InfPeriod);
      else if (_InfPeriodLorenzoID == 'UOM-48')
        _EndDTTM = AdminStartDTTM.AddDays(_InfPeriod * 7);
      else if (_InfPeriodLorenzoID == 'UOM-49')
        _EndDTTM = AdminStartDTTM.AddMonths(Convert.ToInt32(_InfPeriod));
      else if (_InfPeriodLorenzoID == 'UOM-50')
        _EndDTTM = AdminStartDTTM.AddYears(Convert.ToInt32(_InfPeriod));
    }

    out1(_EndDTTM);
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
          c.FormViewerDetails.BasicDetails.InfusionDetails != null &&
          c.FormViewerDetails.BasicDetails.InfusionDetails.GroupSequenceNo >
            0 &&
          c.FormViewerDetails.BasicDetails.InfusionDetails.GroupSequenceNo ==
            _GroupSequenceNo &&
          c.FormViewerDetails.BasicDetails.InfusionDetails.ItemSequenceNo >=
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
            if (item.FormViewerDetails.BasicDetails.InfusionDetails != null) {
              curitemGrpSeqno =
                item.FormViewerDetails.BasicDetails.InfusionDetails
                  .GroupSequenceNo;
              curitemSeqno =
                item.FormViewerDetails.BasicDetails.InfusionDetails
                  .ItemSequenceNo;
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
          nPrevItemSeqNo = CSequentialHelper.GetPrevActiveItemInSeq(
            MedsResolve,
            curitemGrpSeqno,
            nPrevItemSeqNo
          );
          let nxtItemStartDttm: DateTime =
            CSequentialHelper.GetStartDTTM4OrdersetNextItem(
              MedsResolve,
              sOrdSetgrpID,
              curitemGrpSeqno,
              nPrevItemSeqNo
            );
          {
            if (
              item.FormViewerDetails.BasicDetails.InfusionDetails
                .ParentPrescriptionItemOID > 0
            ) {
              if (
                item != null &&
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
                ) &&
                String.IsNullOrEmpty(item.OperationMode)
              ) {
                item.OperationMode = 'U';
                item.ActionCode = ActivityTypes.Amend;
              }
              item.SequentialActionPerfromCodeAEITS =
                CAActivity.SequentialActionCodeAEITS;
              item.FormViewerDetails.BasicDetails.InfusionDetails.IsSequentialStartDTTMUpdated =
                true;
              if (
                (item != null &&
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
                  )) ||
                (!String.IsNullOrEmpty(item.OperationMode) &&
                  item.OperationMode.Equals(
                    'N',
                    StringComparison.InvariantCultureIgnoreCase
                  ) &&
                  String.IsNullOrEmpty(item.PrescriptionItemStatus))
              ) {
                item.FormViewerDetails.BasicDetails.ResetStartDTTM(
                  nxtItemStartDttm
                );
                item.FormViewerDetails.BasicDetails.TimeMinValueFlag =
                  TimeMinValueFlag;
              }
            } else {
              item.FormViewerDetails.BasicDetails.ResetStartDTTM(
                nxtItemStartDttm
              );
              item.FormViewerDetails.BasicDetails.TimeMinValueFlag =
                TimeMinValueFlag;
            }
          }
        }
      });
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
        c.FormViewerDetails.BasicDetails.InfusionDetails != null &&
        c.FormViewerDetails.BasicDetails.InfusionDetails.GroupSequenceNo ==
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
        c.FormViewerDetails.BasicDetails.InfusionDetails.ItemSequenceNo <=
          ItemSeqno
    )
      .OrderBy(
        (i) => i.FormViewerDetails.BasicDetails.InfusionDetails.ItemSequenceNo
      )
      .LastOrDefault();
    if (
      _SeqItem != null &&
      _SeqItem.FormViewerDetails != null &&
      _SeqItem.FormViewerDetails.BasicDetails != null &&
      _SeqItem.FormViewerDetails.BasicDetails.InfusionDetails != null &&
      _SeqItem.FormViewerDetails.BasicDetails.InfusionDetails.ItemSequenceNo !=
        nPrevItemSeqNo
    ) {
      nPrevItemSeqNo =
        _SeqItem.FormViewerDetails.BasicDetails.InfusionDetails.ItemSequenceNo;
    }
    return nPrevItemSeqNo;
  }
  public static GetActiveLastItemEndDTTM(
    MedsResolve: ObservableCollection<PrescriptionItemVM>,
    SequenceGroupNo: number
  ): DateTime {
    let _SeqItem: PrescriptionItemVM = null;
    let LastActiveItemEndDTTM: DateTime = DateTime.MinValue;
    if (MedsResolve != null && MedsResolve.Count > 0 && SequenceGroupNo > 0) {
      _SeqItem = MedsResolve.Where(
        (c) =>
          c != null &&
          !c.IsGroupHeader &&
          c.FormViewerDetails != null &&
          c.FormViewerDetails.BasicDetails != null &&
          c.FormViewerDetails.BasicDetails.InfusionDetails != null &&
          c.FormViewerDetails.BasicDetails.InfusionDetails.GroupSequenceNo ==
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
          DateTime.NotEquals(c.FormViewerDetails.BasicDetails.StartPrescriptionTime,
            DateTime.MinValue) &&
          c.FormViewerDetails.BasicDetails.InfusionDetails.ItemSequenceNo > 0
      )
        .OrderBy(
          (i) => i.FormViewerDetails.BasicDetails.InfusionDetails.ItemSequenceNo
        )
        .LastOrDefault();
    }
    if (_SeqItem != null) {
      let _dt: DateTime = DateTime.MinValue;
      let infPeriod: number = 0;
      let infUomLorenzoID: string = String.Empty;
      if (
        _SeqItem.FormViewerDetails != null &&
        _SeqItem.FormViewerDetails.BasicDetails != null &&
        _SeqItem.FormViewerDetails.BasicDetails.InfusionDetails != null
      ) {
        if (
          !String.IsNullOrEmpty(
            _SeqItem.FormViewerDetails.BasicDetails.InfusionDetails
              .InfusionPeriod
          )
        ) {
          infPeriod = Convert.ToDouble(
            _SeqItem.FormViewerDetails.BasicDetails.InfusionDetails
              .InfusionPeriod
          );
        }
        if (
          _SeqItem.FormViewerDetails.BasicDetails.InfusionDetails
            .InfusionPeriodUom != null &&
          _SeqItem.FormViewerDetails.BasicDetails.InfusionDetails
            .InfusionPeriodUom.Tag != null
        ) {
          infUomLorenzoID =
            _SeqItem.FormViewerDetails.BasicDetails.InfusionDetails.InfusionPeriodUom.Tag.ToString();
        }
      }
      CSequentialHelper.CalInfPeriodBaseEndDTTM(
        infPeriod,
        infUomLorenzoID,
        _SeqItem.FormViewerDetails.BasicDetails.StartPrescriptionTime,
        (o1) => {
          _dt = o1;
        }
      );
      if (_dt != DateTime.MinValue) {
        LastActiveItemEndDTTM = _dt;
      }
    }
    return LastActiveItemEndDTTM;
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
                c.FormViewerDetails.BasicDetails.InfusionDetails != null &&
                c.FormViewerDetails.BasicDetails.InfusionDetails
                  .GroupSequenceNo == objSeqDet.Key &&
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
                objPitem.FormViewerDetails.BasicDetails.StartDTTM =
                  DtCanDisFirtItemStartDTTM;
                objPitem.FormViewerDetails.BasicDetails.StartPrescriptionTime =
                  DtCanDisFirtItemStartDTTM;
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
              objPitem.FormViewerDetails.BasicDetails.InfusionDetails.IsSequentialStartDTTMUpdated =
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
          CSequentialHelper.ReSetStartEnd_DateTIme_OnCanDis(
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
          c.FormViewerDetails.BasicDetails.InfusionDetails != null &&
          c.FormViewerDetails.BasicDetails.InfusionDetails.GroupSequenceNo >
            0 &&
          c.FormViewerDetails.BasicDetails.InfusionDetails.GroupSequenceNo ==
            _GroupSequenceNo &&
          c.FormViewerDetails.BasicDetails.InfusionDetails.ItemSequenceNo >=
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
            if (item.FormViewerDetails.BasicDetails.InfusionDetails != null) {
              curitemGrpSeqno =
                item.FormViewerDetails.BasicDetails.InfusionDetails
                  .GroupSequenceNo;
              curitemSeqno =
                item.FormViewerDetails.BasicDetails.InfusionDetails
                  .ItemSequenceNo;
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
          nPrevItemSeqNo = CSequentialHelper.GetPrevActiveItemInSeqCanDis(
            MedsResolve,
            curitemGrpSeqno,
            nPrevItemSeqNo
          );
          let nxtItemStartDttm: DateTime =
            CSequentialHelper.GetStartDTTM4OrdersetNextItem(
              MedsResolve,
              sOrdSetgrpID,
              curitemGrpSeqno,
              nPrevItemSeqNo
            );
          if (DateTime.NotEquals(nxtItemStartDttm, DateTime.MinValue)) {
            if (
              item.FormViewerDetails.BasicDetails.InfusionDetails
                .ParentPrescriptionItemOID > 0
            ) {
              if (
                item != null &&
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
                ) &&
                String.IsNullOrEmpty(item.OperationMode)
              ) {
                item.OperationMode = 'U';
                item.ActionCode = ActivityTypes.Amend;
              }
              item.SequentialActionPerfromCodeAEITS =
                CAActivity.SequentialActionCodeAEITS;
              item.FormViewerDetails.BasicDetails.InfusionDetails.IsSequentialStartDTTMUpdated =
                true;
              if (
                (item != null &&
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
                  )) ||
                (!String.IsNullOrEmpty(item.OperationMode) &&
                  item.OperationMode.Equals(
                    'N',
                    StringComparison.InvariantCultureIgnoreCase
                  ) &&
                  String.IsNullOrEmpty(item.PrescriptionItemStatus))
              ) {
                item.FormViewerDetails.BasicDetails.ResetStartDTTM(
                  nxtItemStartDttm
                );
                item.FormViewerDetails.BasicDetails.TimeMinValueFlag =
                  TimeMinValueFlag;
              }
            } else {
              item.FormViewerDetails.BasicDetails.ResetStartDTTM(
                nxtItemStartDttm
              );
              item.FormViewerDetails.BasicDetails.TimeMinValueFlag =
                TimeMinValueFlag;
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
        c.FormViewerDetails.BasicDetails.InfusionDetails != null &&
        c.FormViewerDetails.BasicDetails.InfusionDetails.GroupSequenceNo ==
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
        c.FormViewerDetails.BasicDetails.InfusionDetails.ItemSequenceNo <=
          ItemSeqno
    )
      .OrderBy(
        (i) => i.FormViewerDetails.BasicDetails.InfusionDetails.ItemSequenceNo
      )
      .LastOrDefault();
    if (
      _SeqItem != null &&
      _SeqItem.FormViewerDetails != null &&
      _SeqItem.FormViewerDetails.BasicDetails != null &&
      _SeqItem.FormViewerDetails.BasicDetails.InfusionDetails != null &&
      _SeqItem.FormViewerDetails.BasicDetails.InfusionDetails.ItemSequenceNo !=
        nPrevItemSeqNo
    ) {
      nPrevItemSeqNo =
        _SeqItem.FormViewerDetails.BasicDetails.InfusionDetails.ItemSequenceNo;
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
        c.FormViewerDetails.BasicDetails.InfusionDetails != null &&
        c.FormViewerDetails.BasicDetails.InfusionDetails.GroupSequenceNo ==
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
        c.FormViewerDetails.BasicDetails.InfusionDetails.ItemSequenceNo <
          ItemSeqno
    )
      .OrderBy(
        (i) => i.FormViewerDetails.BasicDetails.InfusionDetails.ItemSequenceNo
      )
      .LastOrDefault();
    if (
      _SeqItem != null &&
      _SeqItem.FormViewerDetails != null &&
      _SeqItem.FormViewerDetails.BasicDetails != null &&
      _SeqItem.FormViewerDetails.BasicDetails.InfusionDetails != null &&
      _SeqItem.FormViewerDetails.BasicDetails.InfusionDetails.ItemSequenceNo !=
        nPrevItemSeqNo
    ) {
      nPrevItemSeqNo =
        _SeqItem.FormViewerDetails.BasicDetails.InfusionDetails.ItemSequenceNo;
    }
    return nPrevItemSeqNo;
  }
  private static IVSequenceExcludeSingleItemGroups(
    MedsResolve: ObservableCollection<PrescriptionItemVM>
  ): boolean {
    let IsSequentialSingleItemGrpCleared: boolean = false;
    let RemoveSinglesequentialgroup = MedsResolve.Where((i) => !i.IsGroupHeader)
      .GroupBy(
        (g) => g.FormViewerDetails.BasicDetails.InfusionDetails.GroupSequenceNo
      )
      .ToList();
    RemoveSinglesequentialgroup.forEach((grp) => {
      if (grp.Count() == 1) {
        IsSequentialSingleItemGrpCleared = true;
        grp.forEach((item) => {
          let _IsExistsInDisCancelGroup: boolean = false;
          let _InfusionGroupNo: number =
            item != null &&
            item.FormViewerDetails != null &&
            item.FormViewerDetails.BasicDetails != null &&
            item.FormViewerDetails.BasicDetails.InfusionDetails != null &&
            item.FormViewerDetails.BasicDetails.InfusionDetails
              .GroupSequenceNo > 0
              ? item.FormViewerDetails.BasicDetails.InfusionDetails
                  .GroupSequenceNo
              : 0;
          if (
            _InfusionGroupNo > 0 &&
            item.ParentbaseVM.oTempPrescDisCancelItemVM != null &&
            item.ParentbaseVM.oTempPrescDisCancelItemVM.Count > 0
          ) {
            _IsExistsInDisCancelGroup =
              item.ParentbaseVM.oTempPrescDisCancelItemVM.Any(
                (i) =>
                  i.FormViewerDetails != null &&
                  i.FormViewerDetails.BasicDetails != null &&
                  i.FormViewerDetails.BasicDetails.InfusionDetails != null &&
                  i.FormViewerDetails.BasicDetails.InfusionDetails
                    .GroupSequenceNo == _InfusionGroupNo
              );
          }
          if (!_IsExistsInDisCancelGroup) {
            IsSequentialSingleItemGrpCleared = true;
            CSequentialHelper.ClearSeqProperties(item);
          }
        });
      }
    });
    return IsSequentialSingleItemGrpCleared;
  }
  private static NonIVSequenceExcludeSingleItemGroups(
    MedsResolve: ObservableCollection<PrescriptionItemVM>
  ): boolean {
    let IsSequentialSingleItemGrpCleared: boolean = false;
    let RemoveSinglesequentialgroup = MedsResolve.Where(
      (i) =>
        !i.IsGroupHeader &&
        i.FormViewerDetails.BasicDetails.SequenceInfo != null
    )
      .GroupBy(
        (g) => g.FormViewerDetails.BasicDetails.SequenceInfo.GroupSequenceNo
      )
      .ToList();
    RemoveSinglesequentialgroup.forEach((grp) => {
      if (grp.Count() == 1) {
        IsSequentialSingleItemGrpCleared = true;
        grp.forEach((item) => {
          let _IsExistsInDisCancelGroup: boolean = false;
          let _SeqGroupNo: number =
            item != null &&
            item.FormViewerDetails != null &&
            item.FormViewerDetails.BasicDetails != null &&
            item.FormViewerDetails.BasicDetails.SequenceInfo != null &&
            item.FormViewerDetails.BasicDetails.SequenceInfo.GroupSequenceNo > 0
              ? item.FormViewerDetails.BasicDetails.SequenceInfo.GroupSequenceNo
              : 0;
          if (
            _SeqGroupNo > 0 &&
            item.ParentbaseVM.oTempPrescDisCancelItemVM != null &&
            item.ParentbaseVM.oTempPrescDisCancelItemVM.Count > 0
          ) {
            _IsExistsInDisCancelGroup =
              item.ParentbaseVM.oTempPrescDisCancelItemVM.Any(
                (i) =>
                  i.FormViewerDetails != null &&
                  i.FormViewerDetails.BasicDetails != null &&
                  i.FormViewerDetails.BasicDetails.SequenceInfo != null &&
                  i.FormViewerDetails.BasicDetails.SequenceInfo
                    .GroupSequenceNo == _SeqGroupNo
              );
          }
          if (!_IsExistsInDisCancelGroup) {
            IsSequentialSingleItemGrpCleared = true;
            CommonSequentialHelper.ClearSeqProperties(item);
          }
        });
      }
    });
    return IsSequentialSingleItemGrpCleared;
  }
  public static CommonReAssignGroupSequenceNo(
    MedsResolve: ObservableCollection<PrescriptionItemVM>,
    OriginalLastGrpSeqNo: number
  ): void {
    let SequenceGroupNos: List<number> = new List<number>();
    let sequentialgroup1 = MedsResolve.Where(
      (c) =>
        !String.IsNullOrEmpty(c.OperationMode) &&
        c.OperationMode.Equals('N') &&
        c.FormViewerDetails != null &&
        c.FormViewerDetails.BasicDetails != null &&
        c.FormViewerDetails.BasicDetails.InfusionDetails != null &&
        c.FormViewerDetails.BasicDetails.InfusionDetails.GroupSequenceNo > 0
    ).Select(
      (s) => s.FormViewerDetails.BasicDetails.InfusionDetails.GroupSequenceNo
    );
    if (sequentialgroup1 != null && sequentialgroup1.Count() > 0) {
      SequenceGroupNos = sequentialgroup1
        .Distinct()
        .OrderBy((o) => o)
        .ToList();
    }
    sequentialgroup1 = MedsResolve.Where(
      (c) =>
        !String.IsNullOrEmpty(c.OperationMode) &&
        c.OperationMode.Equals('N') &&
        c.FormViewerDetails != null &&
        c.FormViewerDetails.BasicDetails != null &&
        c.FormViewerDetails.BasicDetails.SequenceInfo != null &&
        c.FormViewerDetails.BasicDetails.SequenceInfo.GroupSequenceNo > 0
    ).Select(
      (s) => s.FormViewerDetails.BasicDetails.SequenceInfo.GroupSequenceNo
    );
    if (sequentialgroup1 != null && sequentialgroup1.Count() > 0) {
      SequenceGroupNos.AddRange(
        sequentialgroup1
          .Distinct()
          .OrderBy((o) => o)
          .ToList()
      );
    }
    SequenceGroupNos = SequenceGroupNos.OrderBy((o) => o).ToList();
    if (SequenceGroupNos != null && SequenceGroupNos.Count > 0) {
      let sequentialgroupCnt: number = OriginalLastGrpSeqNo + 1;
      for (
        let seqGrpNo: number = 0;
        seqGrpNo < SequenceGroupNos.Count;
        seqGrpNo++
      ) {
        if (SequenceGroupNos[seqGrpNo] > OriginalLastGrpSeqNo) {
          CSequentialHelper.CommonUpdateGroupSequenceNo(
            MedsResolve,
            SequenceGroupNos[seqGrpNo],
            sequentialgroupCnt
          );
          ++sequentialgroupCnt;
        }
      }
    }
  }
  private static CommonUpdateGroupSequenceNo(
    MedsResolve: ObservableCollection<PrescriptionItemVM>,
    iCurrentGrpSequenceNo: number,
    iNewGroupSequenceNo: number
  ): void {
    let RemainingItemsInInfusionGroup = MedsResolve.Where(
      (c) =>
        c.FormViewerDetails.BasicDetails.InfusionDetails != null &&
        c.FormViewerDetails.BasicDetails.InfusionDetails.GroupSequenceNo > 0 &&
        c.FormViewerDetails.BasicDetails.InfusionDetails.GroupSequenceNo ==
          iCurrentGrpSequenceNo
    );
    if (
      RemainingItemsInInfusionGroup != null &&
      RemainingItemsInInfusionGroup.Count() > 0
    ) {
      CSequentialHelper.ReassignItemSequenceOnRemove(
        iNewGroupSequenceNo,
        RemainingItemsInInfusionGroup
      );
    } else {
      let RemainingItemsInGroup = MedsResolve.Where(
        (c) =>
          c.FormViewerDetails.BasicDetails.SequenceInfo != null &&
          c.FormViewerDetails.BasicDetails.SequenceInfo.GroupSequenceNo > 0 &&
          c.FormViewerDetails.BasicDetails.SequenceInfo.GroupSequenceNo ==
            iCurrentGrpSequenceNo
      );
      if (RemainingItemsInGroup != null && RemainingItemsInGroup.Count() > 0) {
        CommonSequentialHelper.ReassignItemSequenceOnRemove(
          iNewGroupSequenceNo,
          RemainingItemsInGroup
        );
      }
    }
  }
  public static CommonValidateSequenceOperationMode(
    MedsResolve: ObservableCollection<PrescriptionItemVM>
  ): void {
    let UpdateSubsequentSequentialGroup = MedsResolve.Where(
      (g) =>
        g != null &&
        g.FormViewerDetails != null &&
        g.FormViewerDetails.BasicDetails != null &&
        g.FormViewerDetails.BasicDetails.InfusionDetails != null
    )
      .GroupBy(
        (g) =>
          g.FormViewerDetails.BasicDetails.InfusionDetails
            .ParentPrescriptionItemOID
      )
      .ToList();
    if (
      UpdateSubsequentSequentialGroup != null &&
      UpdateSubsequentSequentialGroup.Count > 0
    ) {
      for (let i: number = 0; i < UpdateSubsequentSequentialGroup.Count; i++) {
        if (UpdateSubsequentSequentialGroup[i].Key > 0) {
          let GetSubSequential = MedsResolve.Where(
            (c) =>
              c != null &&
              c.FormViewerDetails != null &&
              c.FormViewerDetails.BasicDetails != null &&
              c.FormViewerDetails.BasicDetails.InfusionDetails != null &&
              c.FormViewerDetails.BasicDetails.InfusionDetails
                .ParentPrescriptionItemOID ==
                UpdateSubsequentSequentialGroup[i].Key &&
              ((c.ActionCode == ActivityTypes.Amend &&
                (c.OperationMode == 'N' || c.OperationMode == 'UA')) ||
                (c.ActionCode == ActivityTypes.Prescribe &&
                  c.OperationMode == 'UA'))
          );
          if (GetSubSequential != null && GetSubSequential.Count() > 0) {
            let CountSequential = MedsResolve.Where(
              (c) =>
                c != null &&
                c.FormViewerDetails != null &&
                c.FormViewerDetails.BasicDetails != null &&
                c.FormViewerDetails.BasicDetails.InfusionDetails != null &&
                c.FormViewerDetails.BasicDetails.InfusionDetails
                  .ParentPrescriptionItemOID ==
                  UpdateSubsequentSequentialGroup[i].Key &&
                c.FormViewerDetails.BasicDetails.InfusionDetails
                  .ItemSequenceNo >
                  GetSubSequential.FirstOrDefault().FormViewerDetails
                    .BasicDetails.InfusionDetails.ItemSequenceNo
            );
            if (CountSequential != null) {
              MedsResolve.ForEach((UpdateOperationMode) => {
                if (CountSequential.Contains(UpdateOperationMode)) {
                  if (
                    String.IsNullOrEmpty(UpdateOperationMode.OperationMode) &&
                    !String.Equals(
                      UpdateOperationMode.PrescriptionItemStatus,
                      CConstants.COMPLETED,
                      StringComparison.InvariantCultureIgnoreCase
                    ) &&
                    !String.Equals(
                      UpdateOperationMode.PrescriptionItemStatus,
                      CConstants.CANCELLED,
                      StringComparison.InvariantCultureIgnoreCase
                    ) &&
                    !String.Equals(
                      UpdateOperationMode.PrescriptionItemStatus,
                      CConstants.DISCONTINUED,
                      StringComparison.InvariantCultureIgnoreCase
                    )
                  )
                    UpdateOperationMode.OperationMode = 'UI';
                }
              });
            }
          }
        }
      }
    }
    let UpdateNonIVSubsequentSequentialGroup = MedsResolve.Where(
      (g) =>
        g != null &&
        g.FormViewerDetails != null &&
        g.FormViewerDetails.BasicDetails != null &&
        g.FormViewerDetails.BasicDetails.SequenceInfo != null
    )
      .GroupBy(
        (g) =>
          g.FormViewerDetails.BasicDetails.SequenceInfo
            .ParentPrescriptionItemOID
      )
      .ToList();
    if (
      UpdateNonIVSubsequentSequentialGroup != null &&
      UpdateNonIVSubsequentSequentialGroup.Count > 0
    ) {
      for (
        let i: number = 0;
        i < UpdateNonIVSubsequentSequentialGroup.Count;
        i++
      ) {
        if (UpdateNonIVSubsequentSequentialGroup[i].Key > 0) {
          let GetNonIVSubSequential = MedsResolve.Where(
            (c) =>
              c != null &&
              c.FormViewerDetails != null &&
              c.FormViewerDetails.BasicDetails != null &&
              c.FormViewerDetails.BasicDetails.SequenceInfo != null &&
              c.FormViewerDetails.BasicDetails.SequenceInfo
                .ParentPrescriptionItemOID ==
                UpdateNonIVSubsequentSequentialGroup[i].Key &&
              ((c.ActionCode == ActivityTypes.Amend &&
                (c.OperationMode == 'N' || c.OperationMode == 'UA')) ||
                (c.ActionCode == ActivityTypes.Prescribe &&
                  c.OperationMode == 'UA'))
          );
          if (
            GetNonIVSubSequential != null &&
            GetNonIVSubSequential.Count() > 0
          ) {
            let CountSequential = MedsResolve.Where(
              (c) =>
                c != null &&
                c.FormViewerDetails != null &&
                c.FormViewerDetails.BasicDetails != null &&
                c.FormViewerDetails.BasicDetails.SequenceInfo != null &&
                c.FormViewerDetails.BasicDetails.SequenceInfo
                  .ParentPrescriptionItemOID ==
                  UpdateNonIVSubsequentSequentialGroup[i].Key &&
                c.FormViewerDetails.BasicDetails.SequenceInfo.ItemSequenceNo >
                  GetNonIVSubSequential.FirstOrDefault().FormViewerDetails
                    .BasicDetails.SequenceInfo.ItemSequenceNo
            );
            if (CountSequential != null) {
              MedsResolve.ForEach((UpdateOperationMode) => {
                if (CountSequential.Contains(UpdateOperationMode)) {
                  if (
                    String.IsNullOrEmpty(UpdateOperationMode.OperationMode) &&
                    !String.Equals(
                      UpdateOperationMode.PrescriptionItemStatus,
                      CConstants.COMPLETED,
                      StringComparison.InvariantCultureIgnoreCase
                    ) &&
                    !String.Equals(
                      UpdateOperationMode.PrescriptionItemStatus,
                      CConstants.CANCELLED,
                      StringComparison.InvariantCultureIgnoreCase
                    ) &&
                    !String.Equals(
                      UpdateOperationMode.PrescriptionItemStatus,
                      CConstants.DISCONTINUED,
                      StringComparison.InvariantCultureIgnoreCase
                    )
                  )
                    UpdateOperationMode.OperationMode = 'UI';
                }
              });
            }
          }
        }
      }
    }
  }
  public static SetStartDTTMWhenRouteOrInfTypeChange(
    oResolveVM: BasicDetailsVM
  ): void {
    let objSeqFirstItem: InfusionVM =
      CSequentialHelper.GetFirstActiveItemInfusionVM(
        oResolveVM.oPrescitemVM.ParentbaseVM.MedsResolve,
        oResolveVM.InfusionDetails.GroupSequenceNo
      );
    if (objSeqFirstItem != null && objSeqFirstItem.ItemSequenceNo > 0) {
      let IsCurrentSeqitemIsFirstItem: boolean = true;
      let oPerviousStartDTTM: DateTime = DateTime.MinValue;
      if (
        oResolveVM.InfusionDetails.ItemSequenceNo > 0 &&
        objSeqFirstItem.ItemSequenceNo !=
          oResolveVM.InfusionDetails.ItemSequenceNo
      ) {
        IsCurrentSeqitemIsFirstItem = false;
        let nActivePrevItemSeq: number =
          CSequentialHelper.GetPrevActiveItemSequenceNo(
            oResolveVM.oPrescitemVM.ParentbaseVM.MedsResolve,
            oResolveVM.InfusionDetails.GroupSequenceNo,
            oResolveVM.InfusionDetails.ItemSequenceNo
          );
        oPerviousStartDTTM = CSequentialHelper.GetStartDTTM4OrdersetNextItem(
          oResolveVM.oPrescitemVM.ParentbaseVM.MedsResolve,
          String.Empty,
          oResolveVM.InfusionDetails.GroupSequenceNo,
          nActivePrevItemSeq
        );
      } else if (
        oResolveVM.InfusionDetails.GroupSequenceNo > 0 &&
        oResolveVM.InfusionDetails.ItemSequenceNo == 0 &&
        oResolveVM.OrdersetSequence != null
      ) {
        IsCurrentSeqitemIsFirstItem = false;
        oPerviousStartDTTM = CSequentialHelper.GetStartDTTM4OrdersetNextItem(
          oResolveVM.oPrescitemVM.ParentbaseVM.MedsResolve,
          oResolveVM.OrdersetSequence.OrderSetGropID,
          oResolveVM.InfusionDetails.GroupSequenceNo,
          oResolveVM.InfusionDetails.ItemSequenceNo - 1
        );
      }
      if (!IsCurrentSeqitemIsFirstItem) {
        oResolveVM.IsSequenceStartDTTMReset = false;
        oResolveVM.ResetStartDTTM(oPerviousStartDTTM);
        oResolveVM.IsEnableStartdtSeq = false;
      }
    }
    oResolveVM.ReviewAfterVisible = Visibility.Collapsed;
    oResolveVM.ReviewAfterCommentsVisible = Visibility.Collapsed;
  }
}
