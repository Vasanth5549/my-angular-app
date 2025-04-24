import { Component, OnInit } from '@angular/core';
import { StringBuilder,ProfileFactoryType,ContextManager,Convert,AppActivity} from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp,Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison, ObservableCollection, List, IEnumerable, WindowButtonType } from 'epma-platform/models';
import { AppDialog } from 'epma-platform/controls';
import { HelperService} from 'epma-platform/soapclient';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
import { CConstants } from './constants';
import { CommSequentialItem, CommSequentialItemsVM } from '../viewmodel/SequentialItemsVM';
import { CommPrescriptionItemViewVM } from '../viewmodel/prescriptionitemviewvm';
import { ManageSquenceLink } from '../child/medsequentialprescription';
import { PatientContext,ContextInfo,AppContextInfo} from 'src/app/lorappcommonbb/utilities/globalvariable';

export class CCommSequentialHelper {
    //Not Required for LHS. To be Re-Visited.

    public static LaunchItemsInSequenceMezzanine(MedsResolve: ObservableCollection<CommPrescriptionItemViewVM>, InfusionGroupSequenceNo: number, onClosed: Function, infustionIteminSequence: ManageSquenceLink = null): void {
        if (MedsResolve != null && MedsResolve.Count > 0 && InfusionGroupSequenceNo > 0) {
            let partialSequentialData = MedsResolve.Where(x => x.GroupSequenceNo == InfusionGroupSequenceNo).Select(x => ObjectHelper.CreateObject(new CommSequentialItem(), { PrescriptionItem: x, AdminStatus: String.Empty, PrescriptionItemOid: x.PrescriptionItemOID }));
            let v = partialSequentialData.ToArray();
            let __LstItemsInSequence: List<CommSequentialItem> = partialSequentialData.Where(x => x.PrescriptionItem.ItemSequenceNo > 0).OrderBy(x => x.PrescriptionItem.ItemSequenceNo).ToList();
            for (let i: number = __LstItemsInSequence.Count - 1; i >= 0; i--) {
                if (__LstItemsInSequence[i].PrescriptionItemOid == 0 && __LstItemsInSequence[i].PrescriptionItem != null && __LstItemsInSequence[i].PrescriptionItem.SourcePrescriptionOid > 0) {
                    if (!__LstItemsInSequence.Any(x => x.PrescriptionItemOid == __LstItemsInSequence[i].PrescriptionItem.SourcePrescriptionOid)) {
                        let _vm: CommPrescriptionItemViewVM = MedsResolve.Where(x => x.PrescriptionItemOID == __LstItemsInSequence[i].PrescriptionItem.SourcePrescriptionOid).FirstOrDefault();
                        if (_vm != null) {
                            __LstItemsInSequence.Insert(i, ObjectHelper.CreateObject(new CommSequentialItem(), { PrescriptionItem: _vm, AdminStatus: String.Empty, PrescriptionItemOid: __LstItemsInSequence[i].PrescriptionItem.SourcePrescriptionOid }));
                        }
                    }
                }
            }
            let _LstItemsInSequence: List<CommSequentialItem> = __LstItemsInSequence;
            let vm: CommSequentialItemsVM = ObjectHelper.CreateObject(new CommSequentialItemsVM(), { MedsResolve: MedsResolve, MedsAllSequentialResolve: new ObservableCollection<CommSequentialItem>(_LstItemsInSequence), InfusionGroupSequenceNo: InfusionGroupSequenceNo });
            let seqNo: number = -1;
            if (vm.MedsAllSequentialResolve != null) {
                for (let i: number = 0; i < vm.MedsAllSequentialResolve.Count; i++) {
                    if (vm.MedsAllSequentialResolve[i].PrescriptionItemOid == 0 || vm.MedsAllSequentialResolve[i].PrescriptionItem.ParentPrescriptionItemOID == 0) {
                        vm.MedsAllSequentialResolve[i].PrescriptionItemOid = seqNo--;
                    }
                }
                vm.MedsSequentialResolve = new ObservableCollection<CommSequentialItem>(vm.MedsAllSequentialResolve.Where(x => String.IsNullOrEmpty(x.PrescriptionItem.PrescriptionItemStatus) || !x.PrescriptionItem.PrescriptionItemStatus.Equals(CConstants.CANCELLED, StringComparison.OrdinalIgnoreCase) && !x.PrescriptionItem.IsAmendCompletedStatus && !x.PrescriptionItem.PrescriptionItemStatus.Equals(CConstants.DISCONTINUED, StringComparison.OrdinalIgnoreCase)));
            }
            if (infustionIteminSequence == null) {
                infustionIteminSequence = new ManageSquenceLink();
            }
            infustionIteminSequence.DataContext = vm;
            if(PatientContext.IsFromEPR){}
            else{
                // ObjectHelper.stopFinishAndCancelEvent(true);
                AppActivity.OpenWindow("Sequential medications - " + "Sequence " + InfusionGroupSequenceNo + " - LORENZO -- webpage Dialog", infustionIteminSequence, (s, e) => { onClosed(s, e); }, "", false, 350, 860, false, WindowButtonType.Close, null);
            }
            vm.UpdateStatusFromDatabase();
        }
    }
}