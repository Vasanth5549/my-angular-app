
import { StringBuilder,ProfileFactoryType,ContextManager,Convert,AppActivity} from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp,Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison,AppDialogEventargs, AppDialogResult, DelegateArgs, DialogComponentArgs, WindowButtonType, Random, ObservableCollection, ArrayOfString, List } from 'epma-platform/models';
import { AppDialog, Color, Colors, iLabel, SolidColorBrush } from 'epma-platform/controls';
import { HelperService} from 'epma-platform/soapclient';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
import { CConstants, ChartType, InfChartAlert, InfusionTypesCode, MedImage, MedImages, MedicationAction, SlotStatus } from './CConstants';
import { Busyindicator } from 'src/app/lorappcommonbb/busyindicator';
import { Common } from './common';
import { MedsAdminChartToolTip } from '../resource/medsadmincharttooltip.designer';
import { MedicationCommonBB } from 'src/app/lorappmedicationcommonbb/utilities/medicationcommonbb';
import { MedChartData, TagDrugHeaderDetail, ValueDomainValues } from './globalvariable';
import { Resource } from '../resource';
import { InfusionTypeConceptCodeData, MedicationCommonProfileData } from 'src/app/lorappmedicationcommonbb/utilities/profiledata';
import { InfusionChart } from '../resource/infusionchart.designer';
import { ProfileData } from './ProfileData';
import { LineDisplayConfigurations } from 'src/app/lorappslprofiletypes/medication';
import { AdministrationDetail, CResMsgGetInfusionChart, DrugDetail, DrugHeader, InfusionAdminDetail, SlotDetail } from 'src/app/shared/epma-platform/soap-client/MedicationAdministrationWS';
import { InfusionChartVM } from '../viewmodel/InfusionChartVM';
import { InfusionChartColumn } from 'src/app/lorarcbluebirdmedicationchart/common/InfusionChartColumn';
import { InfusionChartRow } from 'src/app/lorarcbluebirdmedicationchart/common/InfusionChartRow';
import { GetMedsChartData } from '../common/getmedschartdata';
import { ChartIcon } from 'src/app/lorarcbluebirdmedicationchart/common/ChartIcon';
import { InfusionChartCell } from 'src/app/lorarcbluebirdmedicationchart/common/InfusionChartCell';
import { SLDateUtility } from 'src/app/shared/epma-platform/services/sLDateUtility.service';
import { CLine } from 'src/app/lorarcbluebirdmedicationchart/common/CLine';
import { ImageAlignment } from 'src/app/shared/epma-platform/models/eppma-common-types';
import { InfusionProcessIcon } from 'src/app/lorarcbluebirdmedicationchart/common/InfusionProcessIcon';
import { CIcon } from 'src/app/lorarcbluebirdmedicationchart/common/CIcon';
import { Environment } from 'src/app/product/shared/models/Common';
import { CommonBB } from 'src/app/lorappcommonbb/utilities/common';
import { iInfusionChart } from 'src/app/lorarcbluebirdmedicationchart/iInfusionChart/iInfusionChart';
    export class InfusionChartHelper {
        //public delegate void dlgOnInfusionChartLoadCompleted(bool IsInfusionAlertExists);
        public OnInfusionChartLoadCompleted: Function;
        private oiInfusionChart: iInfusionChart;
        private oResponse: CResMsgGetInfusionChart;
        private static CellFirstIndex: number = 0;
        private static CellLastIndex: number = 11;
        oRand: Random;
        iChartRow: InfusionChartRow;
        lstInfusionAdminDetail: ObservableCollection<InfusionAdminDetail> = new ObservableCollection<InfusionAdminDetail>();
        private oInfusionChartVM: InfusionChartVM;
        public oGetMedsChartData: GetMedsChartData = null;
        oSlotColor: SolidColorBrush = new SolidColorBrush(Colors.Transparent);
        oINFRecordAdminParams: INFRecordAdminParams = null;
        lastseqindx: number = -1;
        constructor(oInfChartVM: InfusionChartVM) {
            this.oGetMedsChartData = new GetMedsChartData();
            this.oGetMedsChartData.oChartTypeSelected = ChartType.Infusion_Chart;
            this.oInfusionChartVM = oInfChartVM;
        }
        public LoadInfusionChart(Control: iInfusionChart, oResult: CResMsgGetInfusionChart): void {
            this.oiInfusionChart = Control;
            this.oResponse = oResult;
            this.oRand = new Random();
            if (this.oResponse != null && this.oResponse.InfusionChatView != null && this.oResponse.InfusionChatView.DrugDetail != null && this.oResponse.InfusionChatView.DrugDetail.Count > 0) {
             
                this.oInfusionChartVM.ParacetamolAdminCount = this.oResponse.InfusionChatView.ParacetamolAdministeredCount;
                this.ConstructChartRows(this.oResponse.InfusionChatView.DrugDetail, this.oInfusionChartVM.StartDTTM, this.oInfusionChartVM.EndDTTM, this.oInfusionChartVM.CurrentDTTM);
                if (this.oInfusionChartVM.MedicationAdminBaseVM != null && this.oResponse.InfusionChatView.ParacetamolAdministeredCount > 0) {
                    this.oInfusionChartVM.MedicationAdminBaseVM.CumulativeParacetamol.ParacetamolAdministeredCount = this.oResponse.InfusionChatView.ParacetamolAdministeredCount;
                }
            }
            else {
                if (this.OnInfusionChartLoadCompleted != null)
                    this.OnInfusionChartLoadCompleted(false, this.oiInfusionChart);
            }
            // Busyindicator.SetStatusIdle("InfusionChart");
        }
        public FindCellIndexByTime(oDatetime: DateTime): number {
            let iIndex: number = -1;
            if (oDatetime) {
                if (this.oiInfusionChart.ChartColumns != null && this.oiInfusionChart.ChartColumns.Count > 0) {
                    //TFS # 68320 DST Fix - Review border to be plotted on correct slot during DST.
                    let oInfusionChartColumn: InfusionChartColumn = this.oiInfusionChart.ChartColumns.
                        Where((oCell: InfusionChartColumn) => oDatetime.ToUniversalTime() >= oCell?.StartDateTime?.ToUniversalTime() && oDatetime.ToUniversalTime() <= oCell?.EndDateTime?.ToUniversalTime()).Select(oCell => oCell).FirstOrDefault();
                    if (oInfusionChartColumn != null) {
                        iIndex = oInfusionChartColumn.Index - 1;
                    }
                }
            }
            return iIndex;
        }
        // revisit lstDrugDetail: ObservableCollection<DrugDetail>, 
        public ConstructChartRows(lstDrugDetail: ObservableCollection<DrugDetail>, StartDate: DateTime, EndDate: DateTime, CurrentDTTM: DateTime): void {
            // revisit , added below line
           // let lstDrugDetail = lstDrugDetail1.DrugDetail;
            let _IsAlertExists: boolean = false;
             //revisit need to comment below 2 lines
            let abc = this.oResponse.InfusionChatView.Encounter.Count;
            let lstChartRows: ObservableCollection<InfusionChartRow> = new ObservableCollection<InfusionChartRow>();
            this.oGetMedsChartData.CurrntDt = CurrentDTTM;
            let oInfusionChartRowList: ObservableCollection<InfusionChartRow> = new ObservableCollection<InfusionChartRow>();
            if (lstDrugDetail != null && lstDrugDetail.Count > 0) {
                if (MedicationCommonProfileData.MedLineDisplay != null) {
                    let lnDis: ObservableCollection<LineDisplayConfigurations> = MedicationCommonProfileData.MedLineDisplay.objLineDisConfig;
                    let PRESITEM = lnDis.Where(LineDisplayElement =>LineDisplayElement.IsSelected==1&&String.Compare(LineDisplayElement.ColCode,"CC_MLDPRESITEM",StringComparison.OrdinalIgnoreCase)==0).Select(LineDisplayElement => LineDisplayElement);
                    let lnDisFilter: ObservableCollection<LineDisplayConfigurations> = new ObservableCollection<LineDisplayConfigurations>(PRESITEM);
                    this.oGetMedsChartData.oMLD.objLineDisConfig = lnDisFilter;
                }
                let GetParentPrescriptionOID = lstDrugDetail.GroupBy(g => g.DrugHeader.FormViewParameters.IntravenousInfusionData.ParentPrescriptionItemOID);
                let nTotalDrugCount: number = lstDrugDetail.Count;
                for (let iCnt: number = 0; iCnt < nTotalDrugCount; iCnt++) {
                    if (lstDrugDetail[iCnt] != null && lstDrugDetail[iCnt].DrugHeader != null) {
                        let isAsRequiredLockIconExists: boolean = false;
                        let isInfusionChartAlertExists: boolean = false;
                        let isCumulativeParacetomalExists: boolean = false;
                        let isConflictAlertIconExists: boolean = false;
                        this.iChartRow = this.CreateInfusionChartRow(iCnt, StartDate, EndDate, lstDrugDetail[iCnt]);
                        if (this.oResponse.InfusionChatView.DrugDetail[iCnt].SlotDetails != undefined && this.oResponse.InfusionChatView.DrugDetail[iCnt].SlotDetails.Count > 0) {
                            let oInprogressItem: SlotDetail = null;
                            let IsInprogressOrPausedExists: boolean = false;
                            if (String.Compare(this.oResponse.InfusionChatView.DrugDetail[iCnt].DrugHeader.InfusionType, InfusionTypesCode.INTERMITTENT, StringComparison.CurrentCultureIgnoreCase) == 0 && this.oResponse.InfusionChatView.DrugDetail[iCnt].SlotDetails.Count > 1) {
                                let objInprogressItem = this.oResponse.InfusionChatView.DrugDetail[iCnt].SlotDetails.Where(r => String.Compare(r.Status, SlotStatus.PAUSED, StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(r.Status, SlotStatus.INPROGRESS, StringComparison.CurrentCultureIgnoreCase) == 0);
                                if (objInprogressItem != null && objInprogressItem.Count() > 0) {
                                    IsInprogressOrPausedExists = true;
                                    oInprogressItem = objInprogressItem.First();
                                    this.oResponse.InfusionChatView.DrugDetail[iCnt].SlotDetails = new ObservableCollection<SlotDetail>(this.oResponse.InfusionChatView.DrugDetail[iCnt].SlotDetails.OrderBy(x => (x.AdministrationDetail != null && DateTime.NotEquals(x.AdministrationDetail.AdministeredDate , DateTime.MinValue)) ? x.AdministrationDetail.AdministeredDate : x.ScheduledDTTM));
                                }
                            }
                            if (lstDrugDetail[iCnt].DrugHeader.IsPRN) {
                                if (IsInprogressOrPausedExists) {
                                    isConflictAlertIconExists = true;
                                }
                            }
                            else if (this.oResponse.InfusionChatView.DrugDetail[iCnt].SlotDetails != null && this.oResponse.InfusionChatView.DrugDetail[iCnt].SlotDetails.Count > 0) {
                                let oInprogressItemSlots = this.oResponse.InfusionChatView.DrugDetail[iCnt].SlotDetails.Where(c => (String.Equals(c.Status, SlotStatus.DUENOW, StringComparison.CurrentCultureIgnoreCase) || String.Equals(c.Status, SlotStatus.OVERDUE, StringComparison.CurrentCultureIgnoreCase) || String.Equals(c.Status, SlotStatus.NOTYETRECORDED, StringComparison.CurrentCultureIgnoreCase)));
                                if (!(oInprogressItemSlots != null && oInprogressItemSlots.Count() > 0)) {
                                    isConflictAlertIconExists = true;
                                }
                            }
                            this.oResponse.InfusionChatView.DrugDetail[iCnt].SlotDetails.forEach( (oSlotDetail)=> {
                                this.oInfusionChartVM.UpdateSummaryBar(oSlotDetail, false);
                                if (!isInfusionChartAlertExists && lstDrugDetail[iCnt].DrugHeader.InfChartAlerts != null && lstDrugDetail[iCnt].DrugHeader.InfChartAlerts.Count > 0) {
                                    isInfusionChartAlertExists = true;
                                    _IsAlertExists = true;
                                    if (oInprogressItem != null)
                                        this.PlotAlertIcon(lstDrugDetail[iCnt].DrugHeader.InfChartAlerts, this.iChartRow, CurrentDTTM, oInprogressItem);
                                    else this.PlotAlertIcon(lstDrugDetail[iCnt].DrugHeader.InfChartAlerts, this.iChartRow, CurrentDTTM, oSlotDetail);
                                }
                                if (!isAsRequiredLockIconExists && lstDrugDetail[iCnt].DrugHeader.IsPRN && !lstDrugDetail[iCnt].IsNextDoseAllowedForPRN) {
                                    isAsRequiredLockIconExists = true;
                                    this.PlotAsRequiredLockIcon(this.iChartRow, CurrentDTTM);
                                }
                                let oCell: InfusionChartCell = new InfusionChartCell();
                                let oCellIndex: number = this.FindCellIndexByTime(CurrentDTTM);
                                if (lstDrugDetail[iCnt].DrugHeader.IsPRN) {
                                    if (this.oInfusionChartVM.IsParaIngDrug && this.oInfusionChartVM.ParacetamolAdminCount > 3 && !isCumulativeParacetomalExists) {
                                        isCumulativeParacetomalExists = true;
                                        if (oCellIndex > -1 && this.iChartRow.InfusionChartCells != null) {
                                            oCell = this.iChartRow.InfusionChartCells[oCellIndex];
                                            oCell.AlertIcons.Add(this.CheckAndSetCumulativeIcon());
                                        }
                                    }
                                }
                                if (!isConflictAlertIconExists && oCellIndex > -1 && this.iChartRow.InfusionChartCells != null && lstDrugDetail[iCnt].DrugHeader.IsConflictExists == 'R') {
                                    oCell = this.iChartRow.InfusionChartCells[oCellIndex];
                                    oCell.AlertIcons.Add(this.UnacknowledgedConflictIcon());
                                    isConflictAlertIconExists = true;
                                }
                                if (DateTime.NotEquals(lstDrugDetail[iCnt].DrugHeader.ReviewDTTM, DateTime.MinValue) && !(lstDrugDetail[iCnt].DrugHeader.IsPRN && !lstDrugDetail[iCnt].DrugHeader.IsPRNWithSchedule)) {
                                    let ReviewCellIndex: number = this.FindCellIndexByTime(lstDrugDetail[iCnt].DrugHeader.ReviewDTTM);
                                    if (this.iChartRow.InfusionChartCells != null && ReviewCellIndex > -1) {
                                        oCell = this.iChartRow.InfusionChartCells[ReviewCellIndex];
                                        oCell.HighlightReviewSlot = true;
                                    }
                                }
                                this.CreateChartRows(this.iChartRow, oSlotDetail, CurrentDTTM, lstDrugDetail[iCnt].DrugHeader.PrescriptionItemStatus);
                            });
                        }
                        else {
                            if (lstDrugDetail[iCnt].DrugHeader.IsPRN) {
                                let oCell: InfusionChartCell;
                                let oCellIndex: number = this.FindCellIndexByTime(CurrentDTTM);
                                if (this.oInfusionChartVM.IsParaIngDrug && this.oInfusionChartVM.ParacetamolAdminCount > 3 && !isCumulativeParacetomalExists) {
                                    isCumulativeParacetomalExists = true;
                                    if (oCellIndex > -1 && this.iChartRow.InfusionChartCells != null) {
                                        oCell = this.iChartRow.InfusionChartCells[oCellIndex];
                                        oCell.AlertIcons.Add(this.CheckAndSetCumulativeIcon());
                                    }
                                }
                                if (!isConflictAlertIconExists && oCellIndex > -1 && this.iChartRow.InfusionChartCells != null && lstDrugDetail[iCnt].DrugHeader.IsConflictExists == 'R') {
                                    oCell = this.iChartRow.InfusionChartCells[oCellIndex];
                                    oCell.AlertIcons.Add(this.UnacknowledgedConflictIcon());
                                    isConflictAlertIconExists = true;
                                }
                            }
                            if (lstDrugDetail[iCnt].DrugHeader.ReviewDTTM != DateTime.MinValue && !(lstDrugDetail[iCnt].DrugHeader.IsPRN && !lstDrugDetail[iCnt].DrugHeader.IsPRNWithSchedule)) {
                                let oCell: InfusionChartCell;
                                let ReviewCellIndex: number = this.FindCellIndexByTime(lstDrugDetail[iCnt].DrugHeader.ReviewDTTM);
                                if (this.iChartRow.InfusionChartCells != null && ReviewCellIndex > -1) {
                                    oCell = this.iChartRow.InfusionChartCells[ReviewCellIndex];
                                    oCell.HighlightReviewSlot = true;
                                }
                            }
                            this.CreateChartRows(this.iChartRow, null, CurrentDTTM, lstDrugDetail[iCnt].DrugHeader.PrescriptionItemStatus);
                        }
                        if (lstDrugDetail[iCnt] != null && lstDrugDetail[iCnt].DrugHeader != null && lstDrugDetail[iCnt].DrugHeader.FormViewParameters != null && lstDrugDetail[iCnt].DrugHeader.FormViewParameters.IntravenousInfusionData != null && lstDrugDetail[iCnt].DrugHeader.FormViewParameters.IntravenousInfusionData.ParentPrescriptionItemOID > 0) {
                            if (iCnt == 0 || lstDrugDetail[iCnt - 1] != null && lstDrugDetail[iCnt - 1].DrugHeader != null && lstDrugDetail[iCnt - 1].DrugHeader.FormViewParameters != null && lstDrugDetail[iCnt - 1].DrugHeader.FormViewParameters.IntravenousInfusionData != null && lstDrugDetail[iCnt - 1].DrugHeader.FormViewParameters.IntravenousInfusionData.ParentPrescriptionItemOID != lstDrugDetail[iCnt].DrugHeader.FormViewParameters.IntravenousInfusionData.ParentPrescriptionItemOID) {
                                if (!(lstChartRows.Count > 0 && lstChartRows[lstChartRows.Count - 1].SequentialEnd)) {
                                    this.iChartRow.SequentialStart = true;
                                }
                            }
                            if (iCnt == lstDrugDetail.Count - 1 || lstDrugDetail[iCnt + 1] != null && lstDrugDetail[iCnt + 1].DrugHeader != null && lstDrugDetail[iCnt + 1].DrugHeader.FormViewParameters != null && lstDrugDetail[iCnt + 1].DrugHeader.FormViewParameters.IntravenousInfusionData != null && lstDrugDetail[iCnt + 1].DrugHeader.FormViewParameters.IntravenousInfusionData.ParentPrescriptionItemOID != lstDrugDetail[iCnt].DrugHeader.FormViewParameters.IntravenousInfusionData.ParentPrescriptionItemOID) {
                                this.iChartRow.SequentialEnd = true;
                            }
                        }
                        lstChartRows.Add(this.iChartRow);
                    }
                }
            }
            this.oiInfusionChart.ChartRows = lstChartRows;
            if (this.OnInfusionChartLoadCompleted != null)
            this.OnInfusionChartLoadCompleted(_IsAlertExists);
                this.OnInfusionChartLoadCompleted(_IsAlertExists,lstChartRows);
        }
       


        CreateInfusionChartRow(iRowIndex: number, StartDTTM: DateTime, EndDTTM: DateTime, oDrugDetail: DrugDetail): InfusionChartRow {
            let oInfusionChartRow: InfusionChartRow = new InfusionChartRow();
            let IsAlertExists: boolean = false;
            let nPrescriptionItemOID: number = oDrugDetail.DrugHeader.PrescriptionItemOID;
            oInfusionChartRow.RowHeight = 50;//88; // revisit
            oInfusionChartRow.RowIndex = iRowIndex;
            oInfusionChartRow.Key = "Row-" + nPrescriptionItemOID;
            let IsPRN: boolean = oDrugDetail.DrugHeader.IsPRN;
            this.oGetMedsChartData.IsNextDoseAllowedForPRN = oDrugDetail.IsNextDoseAllowedForPRN;
            this.oGetMedsChartData.nMinimumIntervalForPRN = oDrugDetail.MinimumIntervalForPRN;
            this.oGetMedsChartData.nLastRecordedAtForPRN = oDrugDetail.LastRecordedAtForPRN;
            oInfusionChartRow.DrugItem = this.oGetMedsChartData.GetDrugHeader(oDrugDetail.DrugHeader);
            if (!String.IsNullOrEmpty(oDrugDetail.DrugHeader.PrescriptionItemStatus) && (String.Compare(oDrugDetail.DrugHeader.PrescriptionItemStatus, CConstants.DISCONTINUED, StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(oDrugDetail.DrugHeader.PrescriptionItemStatus, CConstants.COMPLETED, StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(oDrugDetail.DrugHeader.PrescriptionItemStatus, CConstants.AWAITINGAUTHORISE, StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(oDrugDetail.DrugHeader.PrescriptionItemStatus, CConstants.CANCELLED, StringComparison.CurrentCultureIgnoreCase) == 0))
                this.oGetMedsChartData.cUnackConflict = oDrugDetail.DrugHeader.IsConflictExists = 'N';
            else this.oGetMedsChartData.cUnackConflict = oDrugDetail.DrugHeader.IsConflictExists;
            if (oDrugDetail.DrugHeader != null && oDrugDetail.DrugHeader.InfChartAlerts != null && oDrugDetail.DrugHeader.InfChartAlerts.Count > 0)
                IsAlertExists = true;
            this.oGetMedsChartData.IsGreyedOut = false;
            let PrescriptionStartDTTM: DateTime= DateTime.MinValue;
            let PrescriptionEndDTTM: DateTime= DateTime.MinValue;
            this.oInfusionChartVM.IsParaIngDrug = oDrugDetail.DrugHeader.IsParacetamolIngredient;
            if (DateTime.NotEquals(oDrugDetail.DrugHeader.StartDate, DateTime.MinValue)) {
                PrescriptionStartDTTM = oDrugDetail.DrugHeader.StartDate;
            }
            if (DateTime.NotEquals(oDrugDetail.DrugHeader.EndDate, DateTime.MinValue)) {
                PrescriptionEndDTTM = oDrugDetail.DrugHeader.EndDate;
            }
            if (oDrugDetail.DrugHeader.PrescriptionItemStatus == CConstants.DISCONTINUED || oDrugDetail.DrugHeader.PrescriptionItemStatus == CConstants.COMPLETED) {
                if (oDrugDetail.DrugHeader.FormViewParameters.IntravenousInfusionData.ParentPrescriptionItemOID > 0) {
                    //revisit
                    let InfusionChatViewDrugDetail = this.oResponse.InfusionChatView.DrugDetail;
                    let GroupedSequentialDrug = InfusionChatViewDrugDetail.Where(c => c.DrugHeader.FormViewParameters.IntravenousInfusionData.ParentPrescriptionItemOID == oDrugDetail.DrugHeader.FormViewParameters.IntravenousInfusionData.ParentPrescriptionItemOID);
                    if (GroupedSequentialDrug != null && GroupedSequentialDrug.Count() > 0) {
                        let TotalCount: number = GroupedSequentialDrug.Max(c => c.DrugHeader.FormViewParameters.IntravenousInfusionData.InfusionSeqOrder);
                        let LastSequentialDrug = GroupedSequentialDrug.Where(c => c.DrugHeader.FormViewParameters.IntravenousInfusionData.InfusionSeqOrder == TotalCount);
                        if (LastSequentialDrug != null && LastSequentialDrug.Count() > 0) {
                            let oLastSeqDrugDetail: DrugDetail = LastSequentialDrug.First();
                            if (oLastSeqDrugDetail.SlotDetails != null && oLastSeqDrugDetail.SlotDetails.Count > 0) {
                                let oInfActionCompleted = oLastSeqDrugDetail.SlotDetails.Where(oItem => String.Compare(oItem.Status, SlotStatus.STOPPED, StringComparison.CurrentCultureIgnoreCase) != 0 && String.Compare(oItem.Status, SlotStatus.COMPLETED, StringComparison.CurrentCultureIgnoreCase) != 0 && String.Compare(oItem.Status, SlotStatus.OMITTED, StringComparison.CurrentCultureIgnoreCase) != 0 && String.Compare(oItem.Status, SlotStatus.NOTGIVEN, StringComparison.CurrentCultureIgnoreCase) != 0 && String.Compare(oItem.Status, SlotStatus.NOTKNOWN, StringComparison.CurrentCultureIgnoreCase) != 0);
                                if (oInfActionCompleted != null && oInfActionCompleted.Count() == 0) {
                                    if (oDrugDetail.DrugHeader.PrescriptionItemStatus == CConstants.COMPLETED && !IsAlertExists)
                                        oInfusionChartRow.RowBackground = new SolidColorBrush(Color.FromArgb(255, 185, 251, 114));
                                    else {
                                        this.oGetMedsChartData.IsGreyedOut = true;
                                        oInfusionChartRow.RowBackground = Common.SetSlotColor(String.Empty, this.oGetMedsChartData.IsGreyedOut);
                                    }
                                }
                                else {
                                    if (oDrugDetail.DrugHeader.PrescriptionItemStatus == CConstants.COMPLETED && !IsAlertExists) {
                                        oInfusionChartRow.RowBackground = new SolidColorBrush(Color.FromArgb(255, 185, 251, 114));
                                    }
                                    else if (oDrugDetail.DrugHeader.PrescriptionItemStatus == CConstants.DISCONTINUED && !IsAlertExists) {
                                        if (oDrugDetail.SlotDetails != null && oDrugDetail.SlotDetails.Count > 0) {
                                            let oInfActionCompleted1 = oDrugDetail.SlotDetails.Where(oItem => String.Compare(oItem.Status, SlotStatus.STOPPED, StringComparison.CurrentCultureIgnoreCase) != 0 && String.Compare(oItem.Status, SlotStatus.COMPLETED, StringComparison.CurrentCultureIgnoreCase) != 0 && String.Compare(oItem.Status, SlotStatus.OMITTED, StringComparison.CurrentCultureIgnoreCase) != 0 && String.Compare(oItem.Status, SlotStatus.NOTGIVEN, StringComparison.CurrentCultureIgnoreCase) != 0 && String.Compare(oItem.Status, SlotStatus.NOTKNOWN, StringComparison.CurrentCultureIgnoreCase) != 0);
                                            if (oInfActionCompleted1 != null && oInfActionCompleted1.Count() == 0) {
                                                this.oGetMedsChartData.IsGreyedOut = true;
                                                oInfusionChartRow.RowBackground = Common.SetSlotColor(String.Empty, this.oGetMedsChartData.IsGreyedOut);
                                            }
                                        }
                                        else {
                                            this.oGetMedsChartData.IsGreyedOut = true;
                                            oInfusionChartRow.RowBackground = Common.SetSlotColor(String.Empty, this.oGetMedsChartData.IsGreyedOut);
                                        }
                                    }
                                }
                            }
                            else {
                                if (oDrugDetail.DrugHeader.PrescriptionItemStatus == CConstants.COMPLETED && !IsAlertExists) {
                                    oInfusionChartRow.RowBackground = new SolidColorBrush(Color.FromArgb(255, 185, 251, 114));
                                }
                                else if (oDrugDetail.DrugHeader.PrescriptionItemStatus == CConstants.DISCONTINUED && !IsAlertExists) {
                                    this.oGetMedsChartData.IsGreyedOut = true;
                                    oInfusionChartRow.RowBackground = Common.SetSlotColor(String.Empty, this.oGetMedsChartData.IsGreyedOut);
                                }
                            }
                        }
                    }
                }
                else {
                    if (oDrugDetail.SlotDetails != null && oDrugDetail.SlotDetails.Count > 0) {
                        let oInfActionCompleted = oDrugDetail.SlotDetails.Where(oItem => String.Compare(oItem.Status, SlotStatus.STOPPED, StringComparison.CurrentCultureIgnoreCase) != 0 && String.Compare(oItem.Status, SlotStatus.COMPLETED, StringComparison.CurrentCultureIgnoreCase) != 0 && String.Compare(oItem.Status, SlotStatus.OMITTED, StringComparison.CurrentCultureIgnoreCase) != 0 && String.Compare(oItem.Status, SlotStatus.NOTGIVEN, StringComparison.CurrentCultureIgnoreCase) != 0 && String.Compare(oItem.Status, SlotStatus.NOTKNOWN, StringComparison.CurrentCultureIgnoreCase) != 0 && String.Compare(oItem.Status, SlotStatus.DELETED, StringComparison.CurrentCultureIgnoreCase) != 0 && !String.Equals(oItem.Status, SlotStatus.GIVEN, StringComparison.CurrentCultureIgnoreCase) && !String.Equals(oItem.Status, SlotStatus.SELFADMINISTERED, StringComparison.CurrentCultureIgnoreCase));
                        if (oInfActionCompleted != null && oInfActionCompleted.Count() == 0) {
                            if (oDrugDetail.DrugHeader.PrescriptionItemStatus == CConstants.COMPLETED && !IsAlertExists) {
                                oInfusionChartRow.RowBackground = new SolidColorBrush(Color.FromArgb(255, 185, 251, 114));
                            }
                            else {
                                this.oGetMedsChartData.IsGreyedOut = true;
                                oInfusionChartRow.RowBackground = Common.SetSlotColor(String.Empty, this.oGetMedsChartData.IsGreyedOut);
                            }
                        }
                        else {
                            if (IsAlertExists && oDrugDetail.DrugHeader.FormViewParameters.IntravenousInfusionData.SeqInfOrderForPervImmediateItm > 0 && oDrugDetail.DrugHeader.FormViewParameters.IntravenousInfusionData.SequenceParentPrescItemOID > 0) {
                                if (oDrugDetail.DrugHeader.PrescriptionItemStatus == CConstants.COMPLETED) {
                                    oInfusionChartRow.RowBackground = new SolidColorBrush(Color.FromArgb(255, 185, 251, 114));
                                }
                                else if (oDrugDetail.DrugHeader.PrescriptionItemStatus == CConstants.DISCONTINUED) {
                                    this.oGetMedsChartData.IsGreyedOut = true;
                                    oInfusionChartRow.RowBackground = Common.SetSlotColor(String.Empty, this.oGetMedsChartData.IsGreyedOut);
                                }
                            }
                            if (oDrugDetail.DrugHeader.PrescriptionItemStatus == CConstants.COMPLETED && !IsAlertExists) {
                                oInfusionChartRow.RowBackground = new SolidColorBrush(Color.FromArgb(255, 185, 251, 114));
                            }
                            else if (oDrugDetail.DrugHeader.PrescriptionItemStatus == CConstants.DISCONTINUED) {
                                this.oGetMedsChartData.IsGreyedOut = true;
                                oInfusionChartRow.RowBackground = Common.SetSlotColor(String.Empty, this.oGetMedsChartData.IsGreyedOut);
                            }
                            else if (IsPRN) {
                                this.oInfusionChartVM.AsrequiredCount++;
                                oInfusionChartRow.RowBackground = new SolidColorBrush(MedChartData.AsRequiredSlotsColor);
                            }
                        }
                    }
                    else {
                        if (oDrugDetail.DrugHeader.PrescriptionItemStatus == CConstants.COMPLETED && !IsAlertExists)
                            oInfusionChartRow.RowBackground = new SolidColorBrush(Color.FromArgb(255, 185, 251, 114));
                        else {
                            this.oGetMedsChartData.IsGreyedOut = true;
                            oInfusionChartRow.RowBackground = Common.SetSlotColor(String.Empty, this.oGetMedsChartData.IsGreyedOut);
                        }
                    }
                }
            }
            else {
                if (IsPRN) {
                    this.oInfusionChartVM.AsrequiredCount++;
                    oInfusionChartRow.RowBackground = new SolidColorBrush(MedChartData.AsRequiredSlotsColor);
                }
            }
            if (oDrugDetail.DrugHeader.IngredientWarning != null && oDrugDetail.DrugHeader.IngredientWarning.Count > 0) {
                oInfusionChartRow.DrugItem.AdminWarningMessage = String.Join("\n", oDrugDetail.DrugHeader.IngredientWarning.ToArray());
            }
            if (!String.IsNullOrEmpty(oDrugDetail.DrugHeader.OrderSetName)) {
                oInfusionChartRow.DrugItem.OrderSetIcon.UriString = MedImage.GetPath(MedImages.OrderSetNameIcon);
                oInfusionChartRow.DrugItem.OrderSetIcon.Tooltip = String.Format(MedsAdminChartToolTip.OrderSetName, oDrugDetail.DrugHeader.OrderSetName);
            }
            else {
                if (oInfusionChartRow.DrugItem.OrderSetIcon != null)
                    oInfusionChartRow.DrugItem.OrderSetIcon.UriString = String.Empty;
            }
            this.CreateEmptyCells(oInfusionChartRow, oDrugDetail);
            return oInfusionChartRow;
        }

        
        public CreateChartRows(oChartRow: InfusionChartRow, oSlotDetail: SlotDetail, CurrentDTTM: DateTime, PrescriptionItemStatus: string): void {
            if (oChartRow != null && oSlotDetail != null && !String.IsNullOrEmpty(oSlotDetail.Status)) {
                switch (oSlotDetail.Status) {
                    case SlotStatus.PLANNED:
                    case SlotStatus.DEFERADMIN:
                    case SlotStatus.DEFERDUENOW:
                    case SlotStatus.DEFEROVERDUE:
                    case SlotStatus.NOTGIVEN:
                    case SlotStatus.GIVEN:
                    case SlotStatus.DUENOW:
                    case SlotStatus.OVERDUE:
                    case SlotStatus.NOTKNOWN:
                    case SlotStatus.HOMELEAVE:
                    case SlotStatus.NOTYETRECORDED:
                    case SlotStatus.OMITTED:
                        this.PlotSingleIcon(oChartRow, oSlotDetail, CurrentDTTM);
                        break;
                    case SlotStatus.INPROGRESS:
                    case SlotStatus.PAUSED:
                    case SlotStatus.STOPPED:
                    case SlotStatus.COMPLETED:
                        this.ProcessInfusionActions(oChartRow, oSlotDetail, PrescriptionItemStatus);
                        break;
                }
            }
        }
        public PlotAsRequiredLockIcon(oRow: InfusionChartRow, dtCurrentDTTM: DateTime): void {
            let oCell: InfusionChartCell;
            let oCellIndex: number = this.FindCellIndexByTime(dtCurrentDTTM);
            if (oCellIndex > -1) {
                oCell = oRow.InfusionChartCells[oCellIndex];
                oCell.ToolTip = String.Empty;
                let oChartIcon: ChartIcon = new ChartIcon();
                oChartIcon.EnableOnHotSpotClick = true;
                oChartIcon.Key = "icoPRNLockIcon";
                oChartIcon.Tooltip = MedsAdminChartToolTip.PRNToolTip;
                oChartIcon.UriString = MedImage.GetPath(MedImages.PRNAdminTimeIcon);
                oCell.AlertIcons.Add(oChartIcon);
            }
        }
        public PlotAlertIcon(oInfChartAlerts: ArrayOfString, oRow: InfusionChartRow, dtCurrentDTTM: DateTime, oSlotDetail: SlotDetail): void {
            let oCell: InfusionChartCell;
            let oCellIndex: number = this.FindCellIndexByTime(dtCurrentDTTM);
            if (oCellIndex > -1) {
                oCell = oRow.InfusionChartCells[oCellIndex];
                oCell.ToolTip = String.Empty;
                let oChartIcon: ChartIcon = new ChartIcon();
                oChartIcon.EnableOnHotSpotClick = true;
                switch (oInfChartAlerts[0]) {
                    case InfChartAlert.STEP_DOSE_FLOW_RATE_ALERT:
                        oChartIcon.Key = "icoStepDoseFlowRateChange";
                        oChartIcon.Tooltip = MedsAdminChartToolTip.InfChartRateChngAlert_ToolTip;
                        break;
                    case InfChartAlert.FLOW_RATE_CHANGE_ALERT:
                        oChartIcon.Key = "icoFlowRateChange";
                        oChartIcon.Tooltip = MedsAdminChartToolTip.InfChartRateChngAlert_ToolTip;
                        break;
                    case InfChartAlert.CONCENTRATION_CHANGE_ALERT:
                        oChartIcon.Key = "icoFlowRateChange";
                        oChartIcon.Tooltip = MedsAdminChartToolTip.InfChartConcentrationChngAlert_ToolTip;
                        break;
                    case InfChartAlert.RATE_N_CONCENTRATION_CHANGE_ALERT:
                        oChartIcon.Key = "icoFlowRateChange";
                        oChartIcon.Tooltip = String.Format("{0} \n{1}", MedsAdminChartToolTip.InfChartRateChngAlert_ToolTip, MedsAdminChartToolTip.InfChartConcentrationChngAlert_ToolTip);
                        break;
                    case InfChartAlert.AMENDMENT_ALERT:
                        oChartIcon.Key = "icoAmendment";
                        oChartIcon.Tooltip = MedsAdminChartToolTip.InfChartAmendDisCntdAlert_ToolTip;
                        break;
                    case InfChartAlert.DISCONTINUATION_ALERT:
                        oChartIcon.Key = "icoDiscontinuation";
                        oChartIcon.Tooltip = MedsAdminChartToolTip.InfChartAmendDisCntdAlert_ToolTip;
                        break;
                    case InfChartAlert.COND_DOSE_MONITORING_PER_ALERT:
                        oChartIcon.Key = "icoDoseMonitorPeriod";
                        oChartIcon.Tooltip = MedsAdminChartToolTip.InfChartRateChngAlert_ToolTip;
                        break;
                    case InfChartAlert.DUE_ALERT:
                        oChartIcon.Key = "icoDuenow";
                        oChartIcon.Tooltip = String.Empty;
                        break;
                    case InfChartAlert.OVERDUE_ALERT:
                        oChartIcon.Key = "icoOverdue";
                        oChartIcon.Tooltip = String.Empty;
                        break;
                    case InfChartAlert.INFUSION_PERIOD_COMPLETED_ALERT:
                        oChartIcon.Key = "icoInfPeriodCompleted";
                        oChartIcon.Tooltip = MedsAdminChartToolTip.InfChartInfusionPeriodCompletedAlert_ToolTip;
                        break;
                }
                oChartIcon.UriString = MedImage.GetPath(MedImages.InfChartAlertIcon);
                oCell.AlertIcons.Add(oChartIcon);
                oCell.EnableCellClick = true;
                if (oCell.Tag == null || oCell.Tag == undefined || (String.Compare((<INFRecordAdminParams>oCell.Tag).SlotStatus, SlotStatus.INPROGRESS, StringComparison.CurrentCultureIgnoreCase) != 0 && String.Compare((<INFRecordAdminParams>oCell.Tag).SlotStatus, SlotStatus.PAUSED, StringComparison.CurrentCultureIgnoreCase) != 0)) {
                    oCell.Tag = this.FillTagObject(oSlotDetail);
                }
            }
        }
        public GetAmendmentAlertMessage(PrescriptionItemOID: number, AmendedPrescriptionItemOID: number): string {
            let sMessage: string = String.Empty;
            if (PrescriptionItemOID > 0 && AmendedPrescriptionItemOID > 0 && this.oResponse != null && this.oResponse.InfusionChatView != null && this.oResponse.InfusionChatView.DrugDetail != null && this.oResponse.InfusionChatView.DrugDetail.Count > 0) {
                let oAmendedOldItem = this.oResponse.InfusionChatView.DrugDetail.Where(oItem => oItem.DrugHeader.PrescriptionItemOID == AmendedPrescriptionItemOID);
                let oAmendedNewItem = this.oResponse.InfusionChatView.DrugDetail.Where(oItem => oItem.DrugHeader.PrescriptionItemOID == PrescriptionItemOID);
                if (oAmendedOldItem != null && oAmendedNewItem != null) {
                    let oOldDrugHeader: DrugHeader = oAmendedOldItem.FirstOrDefault().DrugHeader;
                    let oNewDrugHeader: DrugHeader = oAmendedNewItem.FirstOrDefault().DrugHeader;
                    sMessage = this.CompareAmendedFieldValues(oOldDrugHeader, oNewDrugHeader);
                }
            }
            if (!String.IsNullOrEmpty(sMessage))
                sMessage = "\r\n" + sMessage;
            return sMessage;
        }
        private CompareAmendedFieldValues(oOldDrugHeader: DrugHeader, oNewDrugHeader: DrugHeader): string {
            let oStringBuilder: StringBuilder = new StringBuilder();
            let sOldValue: string = String.Empty, sNewValue = String.Empty;
            if (oOldDrugHeader != null && oNewDrugHeader != null) {
                sOldValue = MedicationCommonBB.RouteName(oOldDrugHeader.Route);
                sNewValue = MedicationCommonBB.RouteName(oNewDrugHeader.Route);
                if (!String.IsNullOrEmpty(sNewValue) && String.Compare(sOldValue, sNewValue, StringComparison.CurrentCultureIgnoreCase) != 0) {
                    oStringBuilder.AppendLine("Route - " + sNewValue);
                }
                sOldValue = String.Empty;
                sNewValue = String.Empty;
                if (!String.IsNullOrEmpty(oOldDrugHeader.AdminMethod) && !String.IsNullOrEmpty(oNewDrugHeader.AdminMethod)) {
                    sOldValue = oOldDrugHeader.AdminMethod;
                    sNewValue = oNewDrugHeader.AdminMethod;
                }
                else if (!String.IsNullOrEmpty(oOldDrugHeader.UpperDose) && !String.IsNullOrEmpty(oNewDrugHeader.UpperDose)) {
                    sOldValue = oOldDrugHeader.LowerDose + "-" + oOldDrugHeader.UpperDose + " " + oOldDrugHeader.DoseUOM;
                    sNewValue = oNewDrugHeader.LowerDose + "-" + oNewDrugHeader.UpperDose + " " + oNewDrugHeader.DoseUOM;
                }
                else {
                    sOldValue = oOldDrugHeader.LowerDose + " " + oOldDrugHeader.DoseUOM;
                    sNewValue = oNewDrugHeader.LowerDose + " " + oNewDrugHeader.DoseUOM;
                }
                if (!String.IsNullOrEmpty(sNewValue) && String.Compare(sOldValue, sNewValue, StringComparison.CurrentCultureIgnoreCase) != 0) {
                    oStringBuilder.AppendLine("Dose - " + sNewValue);
                }
                if (!String.IsNullOrEmpty(oNewDrugHeader.FormViewParameters.IntravenousInfusionData.Lumen) && String.Compare(oOldDrugHeader.FormViewParameters.IntravenousInfusionData.Lumen, oNewDrugHeader.FormViewParameters.IntravenousInfusionData.Lumen, StringComparison.CurrentCultureIgnoreCase) != 0) {
                    oStringBuilder.AppendLine("Lumen - " + oNewDrugHeader.FormViewParameters.IntravenousInfusionData.Lumen);
                }
                if (DateTime.NotEquals(oOldDrugHeader.StartDate, DateTime.MinValue) && DateTime.NotEquals(oNewDrugHeader.StartDate, DateTime.MinValue)) {
                    sOldValue = oOldDrugHeader.StartDate.ToString();
                    sNewValue = oNewDrugHeader.StartDate.ToString();
                    if (String.Compare(sOldValue, sNewValue, StringComparison.CurrentCultureIgnoreCase) != 0) {
                        oStringBuilder.AppendLine("Start date and time - " + oNewDrugHeader.StartDate.ToUserDateTimeString(CConstants.DateTimeFormat));
                    }
                }
                if (!String.IsNullOrEmpty(oNewDrugHeader.DosageForm) && !String.Equals(oOldDrugHeader.DosageForm, oNewDrugHeader.DosageForm, StringComparison.CurrentCultureIgnoreCase)) {
                    oStringBuilder.AppendLine("Dosage form - " + oNewDrugHeader.DosageForm);
                }
                if (!String.IsNullOrEmpty(oNewDrugHeader.StrengthText) && !String.Equals(oOldDrugHeader.StrengthText, oNewDrugHeader.StrengthText, StringComparison.CurrentCultureIgnoreCase)) {
                    oStringBuilder.AppendLine("Strength - " + oNewDrugHeader.StrengthText);
                }
                if (!String.IsNullOrEmpty(oNewDrugHeader.Site) && String.Compare(oOldDrugHeader.Site, oNewDrugHeader.Site, StringComparison.CurrentCultureIgnoreCase) != 0) {
                    oStringBuilder.AppendLine("Site - " + oNewDrugHeader.Site);
                }
                if (!String.IsNullOrEmpty(oNewDrugHeader.FormViewParameters.AdminDevice) && String.Compare(oOldDrugHeader.FormViewParameters.AdminDevice, oNewDrugHeader.FormViewParameters.AdminDevice, StringComparison.CurrentCultureIgnoreCase) != 0) {
                    oStringBuilder.AppendLine("Delivery device - " + oNewDrugHeader.FormViewParameters.AdminDevice);
                }
                sOldValue = String.Empty;
                sNewValue = String.Empty;
                if (oOldDrugHeader.FormViewParameters.AdminDeviceData != null && !String.IsNullOrEmpty(oOldDrugHeader.FormViewParameters.AdminDeviceData.BackgroundRate) && oOldDrugHeader.FormViewParameters.AdminDeviceData.BackgroundRateUOM != null && !String.IsNullOrEmpty(oOldDrugHeader.FormViewParameters.AdminDeviceData.BackgroundRateUOM.UOMName) && oOldDrugHeader.FormViewParameters.AdminDeviceData.BackgroundRateDenaminatorUOM != null && !String.IsNullOrEmpty(oOldDrugHeader.FormViewParameters.AdminDeviceData.BackgroundRateDenaminatorUOM.UOMName)) {
                    sOldValue = oOldDrugHeader.FormViewParameters.AdminDeviceData.BackgroundRate + " " + oOldDrugHeader.FormViewParameters.AdminDeviceData.BackgroundRateUOM.UOMName + "/" + oOldDrugHeader.FormViewParameters.AdminDeviceData.BackgroundRateDenaminatorUOM.UOMName;
                }
                else if (!String.IsNullOrEmpty(oOldDrugHeader.FormViewParameters.IntravenousInfusionData.Rate) && oOldDrugHeader.FormViewParameters.IntravenousInfusionData.RateUOM != null && !String.IsNullOrEmpty(oOldDrugHeader.FormViewParameters.IntravenousInfusionData.RateUOM.UOMName) && oOldDrugHeader.FormViewParameters.IntravenousInfusionData.RateDenominatorUOM != null && !String.IsNullOrEmpty(oOldDrugHeader.FormViewParameters.IntravenousInfusionData.RateDenominatorUOM.UOMName)) {
                    sOldValue = oOldDrugHeader.FormViewParameters.IntravenousInfusionData.Rate + " " + oOldDrugHeader.FormViewParameters.IntravenousInfusionData.RateUOM.UOMName + "/" + oOldDrugHeader.FormViewParameters.IntravenousInfusionData.RateDenominatorUOM.UOMName;
                }
                if (oNewDrugHeader.FormViewParameters.AdminDeviceData != null && !String.IsNullOrEmpty(oNewDrugHeader.FormViewParameters.AdminDeviceData.BackgroundRate) && oNewDrugHeader.FormViewParameters.AdminDeviceData.BackgroundRateUOM != null && !String.IsNullOrEmpty(oNewDrugHeader.FormViewParameters.AdminDeviceData.BackgroundRateUOM.UOMName) && oNewDrugHeader.FormViewParameters.AdminDeviceData.BackgroundRateDenaminatorUOM != null && !String.IsNullOrEmpty(oNewDrugHeader.FormViewParameters.AdminDeviceData.BackgroundRateDenaminatorUOM.UOMName)) {
                    sNewValue = oNewDrugHeader.FormViewParameters.AdminDeviceData.BackgroundRate + " " + oNewDrugHeader.FormViewParameters.AdminDeviceData.BackgroundRateUOM.UOMName + "/" + oNewDrugHeader.FormViewParameters.AdminDeviceData.BackgroundRateDenaminatorUOM.UOMName;
                }
                else if (!String.IsNullOrEmpty(oNewDrugHeader.FormViewParameters.IntravenousInfusionData.Rate) && oNewDrugHeader.FormViewParameters.IntravenousInfusionData.RateUOM != null && !String.IsNullOrEmpty(oNewDrugHeader.FormViewParameters.IntravenousInfusionData.RateUOM.UOMName) && oNewDrugHeader.FormViewParameters.IntravenousInfusionData.RateDenominatorUOM != null && !String.IsNullOrEmpty(oNewDrugHeader.FormViewParameters.IntravenousInfusionData.RateDenominatorUOM.UOMName)) {
                    sNewValue = oNewDrugHeader.FormViewParameters.IntravenousInfusionData.Rate + " " + oNewDrugHeader.FormViewParameters.IntravenousInfusionData.RateUOM.UOMName + "/" + oNewDrugHeader.FormViewParameters.IntravenousInfusionData.RateDenominatorUOM.UOMName;
                }
                if (!String.IsNullOrEmpty(sNewValue) && String.Compare(sOldValue, sNewValue, StringComparison.CurrentCultureIgnoreCase) != 0) {
                    oStringBuilder.AppendLine("Rate - " + sNewValue);
                }
                sOldValue = String.Empty;
                sNewValue = String.Empty;
                if (!String.IsNullOrEmpty(oOldDrugHeader.InfusionType))
                    sOldValue = CommonBB.GetText(oOldDrugHeader.InfusionType, InfusionTypeConceptCodeData.ConceptCodes);
                if (!String.IsNullOrEmpty(oOldDrugHeader.InfusionType))
                    sNewValue = CommonBB.GetText(oNewDrugHeader.InfusionType, InfusionTypeConceptCodeData.ConceptCodes);
                if (!String.IsNullOrEmpty(sNewValue) && String.Compare(sOldValue, sNewValue, StringComparison.CurrentCultureIgnoreCase) != 0) {
                    oStringBuilder.AppendLine("Infusion type - " + sNewValue);
                }
                sOldValue = String.Empty;
                sNewValue = String.Empty;
                if (oOldDrugHeader.FormViewParameters.IntravenousInfusionData.Fluid != null)
                    sOldValue = oOldDrugHeader.FormViewParameters.IntravenousInfusionData.Fluid.Name;
                if (oNewDrugHeader.FormViewParameters.IntravenousInfusionData.Fluid != null)
                    sNewValue = oNewDrugHeader.FormViewParameters.IntravenousInfusionData.Fluid.Name;
                if (!String.IsNullOrEmpty(sNewValue) && String.Compare(sOldValue, sNewValue, StringComparison.CurrentCultureIgnoreCase) != 0) {
                    oStringBuilder.AppendLine("Fluid - " + sNewValue);
                }
                sOldValue = String.Empty;
                sNewValue = String.Empty;
                if (!String.IsNullOrEmpty(oOldDrugHeader.FormViewParameters.IntravenousInfusionData.Volume) && oOldDrugHeader.FormViewParameters.IntravenousInfusionData.VolumeUOM != null && !String.IsNullOrEmpty(oOldDrugHeader.FormViewParameters.IntravenousInfusionData.VolumeUOM.UOMName)) {
                    sOldValue = oOldDrugHeader.FormViewParameters.IntravenousInfusionData.Volume + " " + oOldDrugHeader.FormViewParameters.IntravenousInfusionData.VolumeUOM.UOMName;
                }
                if (!String.IsNullOrEmpty(oNewDrugHeader.FormViewParameters.IntravenousInfusionData.Volume) && oNewDrugHeader.FormViewParameters.IntravenousInfusionData.VolumeUOM != null && !String.IsNullOrEmpty(oNewDrugHeader.FormViewParameters.IntravenousInfusionData.VolumeUOM.UOMName)) {
                    sNewValue = oNewDrugHeader.FormViewParameters.IntravenousInfusionData.Volume + " " + oNewDrugHeader.FormViewParameters.IntravenousInfusionData.VolumeUOM.UOMName;
                }
                if (!String.IsNullOrEmpty(sNewValue) && String.Compare(sOldValue, sNewValue, StringComparison.CurrentCultureIgnoreCase) != 0) {
                    oStringBuilder.AppendLine("Volume - " + sNewValue);
                }
                sOldValue = String.Empty;
                sNewValue = String.Empty;
                if (oOldDrugHeader.FormViewParameters.IntravenousInfusionData.Concentration > 0)
                    sOldValue = oOldDrugHeader.FormViewParameters.IntravenousInfusionData.Concentration.ToString() + "%";
                if (oNewDrugHeader.FormViewParameters.IntravenousInfusionData.Concentration > 0)
                    sNewValue = oNewDrugHeader.FormViewParameters.IntravenousInfusionData.Concentration.ToString() + "%";
                if (!String.IsNullOrEmpty(sNewValue) && String.Compare(sOldValue, sNewValue, StringComparison.CurrentCultureIgnoreCase) != 0) {
                    oStringBuilder.AppendLine("Concentration - " + sNewValue);
                }
                if (!String.IsNullOrEmpty(oNewDrugHeader.DrugFrequency) && String.Compare(oOldDrugHeader.DrugFrequency, oNewDrugHeader.DrugFrequency, StringComparison.CurrentCultureIgnoreCase) != 0) {
                    oStringBuilder.AppendLine("Frequency - " + oNewDrugHeader.DrugFrequency);
                }
                sOldValue = String.Empty;
                sNewValue = String.Empty;
                if (oOldDrugHeader.FormViewParameters.AdminDeviceData != null && !String.IsNullOrEmpty(oOldDrugHeader.FormViewParameters.AdminDeviceData.TopUpDose) && oOldDrugHeader.FormViewParameters.AdminDeviceData.TopUpDoseUOM != null && !String.IsNullOrEmpty(oOldDrugHeader.FormViewParameters.AdminDeviceData.TopUpDoseUOM.UOMName)) {
                    sOldValue = oOldDrugHeader.FormViewParameters.AdminDeviceData.TopUpDose + " " + oOldDrugHeader.FormViewParameters.AdminDeviceData.TopUpDoseUOM.UOMName;
                }
                if (oNewDrugHeader.FormViewParameters.AdminDeviceData != null && !String.IsNullOrEmpty(oNewDrugHeader.FormViewParameters.AdminDeviceData.TopUpDose) && oNewDrugHeader.FormViewParameters.AdminDeviceData.TopUpDoseUOM != null && !String.IsNullOrEmpty(oNewDrugHeader.FormViewParameters.AdminDeviceData.TopUpDoseUOM.UOMName)) {
                    sNewValue = oNewDrugHeader.FormViewParameters.AdminDeviceData.TopUpDose + " " + oNewDrugHeader.FormViewParameters.AdminDeviceData.TopUpDoseUOM.UOMName;
                }
                if (!String.IsNullOrEmpty(sNewValue) && String.Compare(sOldValue, sNewValue, StringComparison.CurrentCultureIgnoreCase) != 0) {
                    oStringBuilder.AppendLine("Bolus - " + sNewValue);
                }
                sOldValue = String.Empty;
                sNewValue = String.Empty;
                if (oOldDrugHeader.FormViewParameters.AdminDeviceData != null && oOldDrugHeader.FormViewParameters.AdminDeviceData.LockOutPeriod > 0 && oOldDrugHeader.FormViewParameters.AdminDeviceData.LockOutPeriodUOM != null && !String.IsNullOrEmpty(oOldDrugHeader.FormViewParameters.AdminDeviceData.LockOutPeriodUOM.UOMName)) {
                    sOldValue = oOldDrugHeader.FormViewParameters.AdminDeviceData.LockOutPeriod + " " + oOldDrugHeader.FormViewParameters.AdminDeviceData.LockOutPeriodUOM.UOMName;
                }
                if (oNewDrugHeader.FormViewParameters.AdminDeviceData != null && oNewDrugHeader.FormViewParameters.AdminDeviceData.LockOutPeriod > 0 && oNewDrugHeader.FormViewParameters.AdminDeviceData.LockOutPeriodUOM != null && !String.IsNullOrEmpty(oNewDrugHeader.FormViewParameters.AdminDeviceData.LockOutPeriodUOM.UOMName)) {
                    sNewValue = oNewDrugHeader.FormViewParameters.AdminDeviceData.LockOutPeriod + " " + oNewDrugHeader.FormViewParameters.AdminDeviceData.LockOutPeriodUOM.UOMName;
                }
                if (!String.IsNullOrEmpty(sNewValue) && String.Compare(sOldValue, sNewValue, StringComparison.CurrentCultureIgnoreCase) != 0) {
                    oStringBuilder.AppendLine("Lockout period - " + sNewValue);
                }
                sOldValue = String.Empty;
                sNewValue = String.Empty;
                if (!String.IsNullOrEmpty(oOldDrugHeader.AdministrationTimes) && !String.IsNullOrEmpty(oNewDrugHeader.AdministrationTimes)) {
                    sOldValue = this.GetScheduleTimes(oOldDrugHeader.AdministrationTimes);
                    sNewValue = this.GetScheduleTimes(oNewDrugHeader.AdministrationTimes);
                    if (!String.IsNullOrEmpty(sNewValue) && String.Compare(sOldValue, sNewValue, StringComparison.CurrentCultureIgnoreCase) != 0) {
                        oStringBuilder.AppendLine("Schedule time - " + sNewValue);
                    }
                }
                sOldValue = String.Empty;
                sNewValue = String.Empty;
                if (oOldDrugHeader.FormViewParameters.IntravenousInfusionData != null && !String.IsNullOrEmpty(oOldDrugHeader.FormViewParameters.IntravenousInfusionData.InfusionPeriod) && oOldDrugHeader.FormViewParameters.IntravenousInfusionData.InfusionPeriodUOM != null && !String.IsNullOrEmpty(oOldDrugHeader.FormViewParameters.IntravenousInfusionData.InfusionPeriodUOM.UOMName)) {
                    sOldValue = oOldDrugHeader.FormViewParameters.IntravenousInfusionData.InfusionPeriod + " " + oOldDrugHeader.FormViewParameters.IntravenousInfusionData.InfusionPeriodUOM.UOMName;
                }
                if (oNewDrugHeader.FormViewParameters.IntravenousInfusionData != null && !String.IsNullOrEmpty(oNewDrugHeader.FormViewParameters.IntravenousInfusionData.InfusionPeriod) && oNewDrugHeader.FormViewParameters.IntravenousInfusionData.InfusionPeriodUOM != null && !String.IsNullOrEmpty(oNewDrugHeader.FormViewParameters.IntravenousInfusionData.InfusionPeriodUOM.UOMName)) {
                    sNewValue = oNewDrugHeader.FormViewParameters.IntravenousInfusionData.InfusionPeriod + " " + oNewDrugHeader.FormViewParameters.IntravenousInfusionData.InfusionPeriodUOM.UOMName;
                }
                if (!String.IsNullOrEmpty(sNewValue) && String.Compare(sOldValue, sNewValue, StringComparison.CurrentCultureIgnoreCase) != 0) {
                    oStringBuilder.AppendLine("Infusion period - " + sNewValue);
                }
                sOldValue = String.Empty;
                sNewValue = String.Empty;
                if (oOldDrugHeader.FormViewParameters.AdminDeviceData != null && !String.IsNullOrEmpty(oOldDrugHeader.FormViewParameters.AdminDeviceData.BoosterDose) && oOldDrugHeader.FormViewParameters.AdminDeviceData.BoosterDoseUOM != null && !String.IsNullOrEmpty(oOldDrugHeader.FormViewParameters.AdminDeviceData.BoosterDoseUOM.UOMName)) {
                    sOldValue = oOldDrugHeader.FormViewParameters.AdminDeviceData.BoosterDose + " " + oOldDrugHeader.FormViewParameters.AdminDeviceData.BoosterDoseUOM.UOMName;
                }
                if (oNewDrugHeader.FormViewParameters.AdminDeviceData != null && !String.IsNullOrEmpty(oNewDrugHeader.FormViewParameters.AdminDeviceData.BoosterDose) && oNewDrugHeader.FormViewParameters.AdminDeviceData.BoosterDoseUOM != null && !String.IsNullOrEmpty(oNewDrugHeader.FormViewParameters.AdminDeviceData.BoosterDoseUOM.UOMName)) {
                    sNewValue = oNewDrugHeader.FormViewParameters.AdminDeviceData.BoosterDose + " " + oNewDrugHeader.FormViewParameters.AdminDeviceData.BoosterDoseUOM.UOMName;
                }
                if (!String.IsNullOrEmpty(sNewValue) && String.Compare(sOldValue, sNewValue, StringComparison.CurrentCultureIgnoreCase) != 0) {
                    oStringBuilder.AppendLine("Booster dose - " + sNewValue);
                }
                sOldValue = String.Empty;
                sNewValue = String.Empty;
                if (oOldDrugHeader.FormViewParameters.IntravenousInfusionData != null && !String.IsNullOrEmpty(oOldDrugHeader.FormViewParameters.IntravenousInfusionData.HUMIDCode)) {
                    sOldValue = oOldDrugHeader.FormViewParameters.IntravenousInfusionData.HUMIDCode;
                }
                if (oNewDrugHeader.FormViewParameters.IntravenousInfusionData != null && !String.IsNullOrEmpty(oNewDrugHeader.FormViewParameters.IntravenousInfusionData.HUMIDCode)) {
                    sNewValue = oNewDrugHeader.FormViewParameters.IntravenousInfusionData.HUMIDCode;
                }
                if (!String.IsNullOrEmpty(sNewValue) && !String.Equals(sOldValue, sNewValue, StringComparison.CurrentCultureIgnoreCase)) {
                    oStringBuilder.AppendLine(Resource.MedsAdminChartToolTip.HumidificationText.ToString() + " - " + CommonBB.GetText(sNewValue, ValueDomainValues.oHumidification));
                }
                sOldValue = String.Empty;
                sNewValue = String.Empty;
                if (oOldDrugHeader != null && oNewDrugHeader != null && String.Equals(oOldDrugHeader.ItemSubType, CConstants.SUBTYPE_GAS, StringComparison.CurrentCultureIgnoreCase) && String.Equals(oNewDrugHeader.ItemSubType, CConstants.SUBTYPE_GAS, StringComparison.CurrentCultureIgnoreCase)) {
                    if (!oOldDrugHeader.IsPRN && oNewDrugHeader.IsPRN) {
                        oStringBuilder.AppendLine("'as required’ - checked");
                    }
                    if (oOldDrugHeader.IsPRN && !oNewDrugHeader.IsPRN) {
                        oStringBuilder.AppendLine("'as required’ - unchecked");
                    }
                }
                sOldValue = String.Empty;
                sNewValue = String.Empty;
                if (oOldDrugHeader.FormViewParameters.IntravenousInfusionData != null && oOldDrugHeader.FormViewParameters.IntravenousInfusionData.LowConcentrationUOMOID != null && !String.IsNullOrEmpty(oOldDrugHeader.FormViewParameters.IntravenousInfusionData.LowConcentrationUOMOID.UOMName) && oOldDrugHeader.FormViewParameters.IntravenousInfusionData.UpperConcentrationUOMOID != null && !String.IsNullOrEmpty(oOldDrugHeader.FormViewParameters.IntravenousInfusionData.UpperConcentrationUOMOID.UOMName)) {
                    sOldValue = oOldDrugHeader.FormViewParameters.IntravenousInfusionData.LowConcentration.ToString() + " " + oOldDrugHeader.FormViewParameters.IntravenousInfusionData.LowConcentrationUOMOID.UOMName + " / " + oOldDrugHeader.FormViewParameters.IntravenousInfusionData.UpperConcentration.ToString() + " " + oOldDrugHeader.FormViewParameters.IntravenousInfusionData.UpperConcentrationUOMOID.UOMName;
                }
                if (oNewDrugHeader.FormViewParameters.IntravenousInfusionData != null && oNewDrugHeader.FormViewParameters.IntravenousInfusionData.LowConcentrationUOMOID != null && !String.IsNullOrEmpty(oNewDrugHeader.FormViewParameters.IntravenousInfusionData.LowConcentrationUOMOID.UOMName) && oNewDrugHeader.FormViewParameters.IntravenousInfusionData.UpperConcentrationUOMOID != null && !String.IsNullOrEmpty(oNewDrugHeader.FormViewParameters.IntravenousInfusionData.UpperConcentrationUOMOID.UOMName)) {
                    sNewValue = oNewDrugHeader.FormViewParameters.IntravenousInfusionData.LowConcentration.ToString() + " " + oNewDrugHeader.FormViewParameters.IntravenousInfusionData.LowConcentrationUOMOID.UOMName + " / " + oNewDrugHeader.FormViewParameters.IntravenousInfusionData.UpperConcentration.ToString() + " " + oNewDrugHeader.FormViewParameters.IntravenousInfusionData.UpperConcentrationUOMOID.UOMName;
                }
                if (!String.IsNullOrEmpty(sNewValue) && String.Compare(sOldValue, sNewValue, StringComparison.CurrentCultureIgnoreCase) != 0) {
                    oStringBuilder.AppendLine("Concentration details - " + sNewValue);
                }
            }
            return oStringBuilder.ToString();
        }
        private GetScheduleTimes(sScheduleTimes: string): string {
            let sResult: string = String.Empty;
            if (!String.IsNullOrEmpty(sScheduleTimes)) {
                let strbldTime: StringBuilder = new StringBuilder();
                let arrStrTime: string[] = null;
                let Min: number;
                let time: TimeSpan;
                let strTime: string = String.Empty;
                arrStrTime = sScheduleTimes.Split(';');
                strbldTime.Append("Scheduled administration times - ");
                for (let iCnt: number = 0; iCnt < arrStrTime.length; iCnt++) {
                    if (!String.IsNullOrEmpty(arrStrTime[iCnt])) {
                        Min = Convert.ToDouble(arrStrTime[iCnt]);
                        time = TimeSpan.FromMinutes(Min);
                        strTime = SLDateUtility.GetServerDateTime().DateTime.Add(time).ToString("HH:mm");
                        strbldTime.Append(strTime);
                        strbldTime.Append(',');
                    }
                }
                sResult = strbldTime.Remove(strbldTime.Length - 1, 1).ToString();
            }
            return sResult;
        }
        public PlotSingleIcon(oRow: InfusionChartRow, oSlotDetail: SlotDetail, CurrentDTTM: DateTime): void {
            let oCell: InfusionChartCell;
            let oCurrentTimeLineCell: InfusionChartCell = null;
            let oInfAdminAction: InfusionAdminDetail = null;
            let eIcon: enmInfusionIcon;
            let cl1: CLine;
            let oActionTime: DateTime= oSlotDetail.ScheduledDTTM;
            switch (oSlotDetail.Status) {
                case SlotStatus.DEFERADMIN:
                case SlotStatus.DEFERDUENOW:
                case SlotStatus.DEFEROVERDUE:
                    if (oSlotDetail.AdministrationDetail != null && DateTime.NotEquals(oSlotDetail.AdministrationDetail.AdministeredDate , DateTime.MinValue)) {
                        oActionTime = oSlotDetail.AdministrationDetail.AdministeredDate;
                    }
                    break;
                case SlotStatus.NOTGIVEN:
                    if (oSlotDetail.AdministrationDetail != null && DateTime.NotEquals(oSlotDetail.AdministrationDetail.RecordedAt , DateTime.MinValue)) {
                        oActionTime = oSlotDetail.AdministrationDetail.RecordedAt;
                    }
                    break;
            }
            let oCellIndex: number = this.FindCellIndexByTime(oActionTime);
            let oCurrentTimeLineCellIndex: number = this.FindCellIndexByTime(CurrentDTTM);
            if (oCellIndex > -1) {
                oCell = oRow.InfusionChartCells[oCellIndex];
                if (oCurrentTimeLineCellIndex == oCellIndex)
                    oCurrentTimeLineCell = oCell;
                else if (oCurrentTimeLineCellIndex > -1)
                    oCurrentTimeLineCell = oRow.InfusionChartCells[oCurrentTimeLineCellIndex];
                if (oSlotDetail.AdministrationDetail != null && oSlotDetail.AdministrationDetail.IsAdministeredOnInfusionChart == false && (oSlotDetail.Status == SlotStatus.GIVEN || oSlotDetail.Status == SlotStatus.PATIENTSELFADMIN || oSlotDetail.Status == SlotStatus.SELFADMINISTERED)) {
                    if (oCell.CLines == null || (oCell.CLines != null && oCell.CLines.Count == 0)) {
                        oCell.EnableCellClick = false;
                        oCell.ToolTip = InfusionChart.AdministeredOnAdminChartToolTip;
                        //TODO Gradient - Revisit
                        //oCell.ChartBackground = Common.SetSlotColorWithStripedLines(0.05, 0.03);
                    }
                }
                else {
                    oCell.ToolTip = String.Empty;
                    cl1 = new CLine();
                    cl1.StartDTTM = oActionTime;
                    
                    if(cl1.EndDTTDM === undefined){
                        cl1.EndDTTDM = oActionTime;
                    }
                    eIcon = enmInfusionIcon.Planned;
                    let oTDrugHeaderDetail: TagDrugHeaderDetail = (oRow != null && oRow.DrugItem != null && oRow.DrugItem.Tag != null) ? ObjectHelper.CreateType<TagDrugHeaderDetail>(oRow.DrugItem.Tag, TagDrugHeaderDetail) : null;
                    if (oTDrugHeaderDetail != null && oTDrugHeaderDetail.IsPGD) {
                        oInfAdminAction = oSlotDetail.AdministrationDetail != null && oSlotDetail.AdministrationDetail.oInfusionAdminDetail != null && oSlotDetail.AdministrationDetail.oInfusionAdminDetail.Count > 0 ? oSlotDetail.AdministrationDetail.oInfusionAdminDetail[0] : null;
                        eIcon = enmInfusionIcon.Complete;
                    }
                    else {
                        switch (oSlotDetail.Status) {
                            case SlotStatus.PLANNED:
                                eIcon = enmInfusionIcon.Planned;
                                break;
                            case SlotStatus.DEFERADMIN:
                            case SlotStatus.DEFERDUENOW:
                            case SlotStatus.DEFEROVERDUE:
                                eIcon = enmInfusionIcon.Deferred;
                                break;
                            case SlotStatus.NOTGIVEN:
                                eIcon = enmInfusionIcon.NotGiven;
                                break;
                            case SlotStatus.DUENOW:
                                eIcon = enmInfusionIcon.DueNow;
                                break;
                            case SlotStatus.OVERDUE:
                                eIcon = enmInfusionIcon.OverDue;
                                break;
                            case SlotStatus.HOMELEAVE:
                                eIcon = enmInfusionIcon.Homeleave;
                                break;
                            case SlotStatus.NOTYETRECORDED:
                                eIcon = enmInfusionIcon.NotYetRecorded;
                                break;
                            case SlotStatus.OMITTED:
                                eIcon = enmInfusionIcon.Omitted;
                                break;
                            case SlotStatus.NOTKNOWN:
                                eIcon = enmInfusionIcon.NotKnown;
                                break;
                        }
                    }
                    cl1.StartIcon = this.GetIconForChartLine(oCell, eIcon, oSlotDetail, oInfAdminAction, oRow);
                    cl1.StopAtTimeline = false;
                    cl1.OrderIndex = 0;
                    cl1.Key = "Line1";
                    oCell.CLines.Add(cl1);
                    oCell.InfusionAlignment = ImageAlignment.Center;
                    if (oSlotDetail.Status == SlotStatus.DUENOW) {
                        oCell.ChartBackground = this.oGetMedsChartData.cUnackConflict != 'R' ? this.oInfusionChartVM.DueSlotsColor : this.oSlotColor;
                        if (this.oInfusionChartVM.IsParaIngDrug && this.oInfusionChartVM.ParacetamolAdminCount > 3) {
                            oCell.AlertIcons.Add(this.CheckAndSetCumulativeIcon());
                        }
                    }
                    else if (oSlotDetail.Status == SlotStatus.OVERDUE) {
                        oCell.ChartBackground = this.oGetMedsChartData.cUnackConflict != 'R' ? this.oInfusionChartVM.OverDueSlotsColor : this.oSlotColor;
                        if (this.oInfusionChartVM.IsParaIngDrug && this.oInfusionChartVM.ParacetamolAdminCount > 3) {
                            oCell.AlertIcons.Add(this.CheckAndSetCumulativeIcon());
                        }
                    }
                    else if (oSlotDetail.Status == SlotStatus.NOTYETRECORDED) {
                        oCell.ChartBackground = this.oGetMedsChartData.cUnackConflict != 'R' ? this.oInfusionChartVM.OverDueSlotsColor : this.oSlotColor;
                    }
                    else if (oSlotDetail.Status == SlotStatus.DEFERADMIN) {
                        if (this.oInfusionChartVM.IsParaIngDrug && this.oInfusionChartVM.ParacetamolAdminCount > 3) {
                            oCell.AlertIcons.Add(this.CheckAndSetCumulativeIcon());
                        }
                    }
                    else if (oSlotDetail.Status == SlotStatus.DEFERDUENOW) {
                        oCell.ChartBackground = this.oGetMedsChartData.cUnackConflict != 'R' ? this.oInfusionChartVM.DueSlotsColor : this.oSlotColor;
                        if (this.oInfusionChartVM.IsParaIngDrug && this.oInfusionChartVM.ParacetamolAdminCount > 3) {
                            oCell.AlertIcons.Add(this.CheckAndSetCumulativeIcon());
                        }
                    }
                    else if (oSlotDetail.Status == SlotStatus.DEFEROVERDUE) {
                        oCell.ChartBackground = this.oGetMedsChartData.cUnackConflict != 'R' ? this.oInfusionChartVM.OverDueSlotsColor : this.oSlotColor;
                        if (this.oInfusionChartVM.IsParaIngDrug && this.oInfusionChartVM.ParacetamolAdminCount > 3) {
                            oCell.AlertIcons.Add(this.CheckAndSetCumulativeIcon());
                        }
                    }
                    else if (oSlotDetail.Status == SlotStatus.HOMELEAVE) {
                        oCell.ChartBackground = this.oGetMedsChartData.cUnackConflict != 'R' ? this.oInfusionChartVM.OverDueSlotsColor : this.oSlotColor;
                        if (this.oInfusionChartVM.IsParaIngDrug && this.oInfusionChartVM.ParacetamolAdminCount > 3) {
                            oCell.AlertIcons.Add(this.CheckAndSetCumulativeIcon());
                        }
                    }
                    else if (oSlotDetail.Status == SlotStatus.OMITTED) {
                        oCell.ChartBackground = new SolidColorBrush(MedChartData.OmittedSlotsColor);
                        oCell.EnableCellClick = false;
                    }
                    else {
                        oCell.ChartBackground = new SolidColorBrush(Colors.Transparent);
                    }
                    if (oSlotDetail.Status != SlotStatus.OMITTED)
                        oCell.EnableCellClick = true;
                    if (oCell.Tag == null || oCell.Tag == undefined || (String.Compare((<INFRecordAdminParams>oCell.Tag).SlotStatus, SlotStatus.INPROGRESS, StringComparison.CurrentCultureIgnoreCase) != 0 && String.Compare((<INFRecordAdminParams>oCell.Tag).SlotStatus, SlotStatus.PAUSED, StringComparison.CurrentCultureIgnoreCase) != 0)) {
                        oCell.Tag = this.FillTagObject(oSlotDetail);
                    }
                }
                if (!String.Equals(oSlotDetail.Status, SlotStatus.HOMELEAVE, StringComparison.CurrentCultureIgnoreCase) && !String.Equals(oSlotDetail.Status, SlotStatus.DEFERADMIN, StringComparison.CurrentCultureIgnoreCase) && !String.Equals(oSlotDetail.Status, SlotStatus.DEFERDUENOW, StringComparison.CurrentCultureIgnoreCase) && !String.Equals(oSlotDetail.Status, SlotStatus.DEFEROVERDUE, StringComparison.CurrentCultureIgnoreCase) && DateTime.LessThanOrEqualTo(oSlotDetail.ScheduledDTTM , CommonBB.GetServerDateTime()) && oSlotDetail.AdministrationDetail != null && oSlotDetail.AdministrationDetail.IsDuringHomeLeave) {
                    let oChartIcon: ChartIcon = new ChartIcon();
                    oChartIcon.EnableOnHotSpotClick = false;
                    oChartIcon.Key = "HomeLeaveIcon";
                    oChartIcon.UriString = MedImage.GetPath(MedImages.HomeLeaveIcon);
                    oChartIcon.Tooltip = ObjectHelper.CreateObject(new iLabel(), { Text: MedsAdminChartToolTip.HomeLeaveToolTip });
                    oCell.HomeLeaveIcon = oChartIcon;
                }
                else {
                    if (oCell.HomeLeaveIcon != null) {
                        oCell.HomeLeaveIcon.UriString = String.Empty;
                    }
                }
            }
            else {
                if (oCurrentTimeLineCellIndex > -1)
                    oCurrentTimeLineCell = oRow.InfusionChartCells[oCurrentTimeLineCellIndex];
                if (oSlotDetail.Status == SlotStatus.DUENOW || oSlotDetail.Status == SlotStatus.OVERDUE || oSlotDetail.Status == SlotStatus.NOTYETRECORDED || oSlotDetail.Status == SlotStatus.DEFERDUENOW || oSlotDetail.Status == SlotStatus.DEFEROVERDUE || oSlotDetail.Status == SlotStatus.HOMELEAVE) {
                    if (oCurrentTimeLineCell != null && oCurrentTimeLineCell.HomeLeaveIcon != null) {
                        oCurrentTimeLineCell.HomeLeaveIcon.UriString = String.Empty;
                    }
                }
            }
        }
        public ProcessInfusionActions(oRow: InfusionChartRow, oSlotDetail: SlotDetail, PrescriptionItemStatus: string): void {
            if (oSlotDetail != null && oSlotDetail.AdministrationDetail != null && oSlotDetail.AdministrationDetail.oInfusionAdminDetail != null) {
                let isEstimatedIconAlreadyPlotted: boolean = false;
                let nActionsCount: number = oSlotDetail.AdministrationDetail.oInfusionAdminDetail.Count;
                let oAction: InfusionAction = new InfusionAction();
                let oInfAdminAction: InfusionAdminDetail = null;
                let sLastAction: string = String.Empty;
                let PlotChangeBagOrChangeFlowIconWithoutLine: boolean = false;
                let ChangeBagChangeFlowActionMinStartDTTM: DateTime= DateTime.MinValue;
                let ChangeBagChangeFlowActionMaxStartDTTM: DateTime= DateTime.MinValue;
                let IsDiscontinuePrescItemStatus: boolean = false;
                if (!String.IsNullOrEmpty(PrescriptionItemStatus) && String.Equals(PrescriptionItemStatus, CConstants.DISCONTINUED, StringComparison.InvariantCultureIgnoreCase)) {
                    IsDiscontinuePrescItemStatus = true;
                }
                if (nActionsCount > 0) {
                    let nCellFirstStartIdx: number = DateTime.NotEquals(oSlotDetail.AdministrationDetail.InfusionStartDate, DateTime.MinValue) ? this.FindCellIndexByTime(oSlotDetail.AdministrationDetail.InfusionStartDate) : this.FindCellIndexByTime(oSlotDetail.AdministrationDetail.oInfusionAdminDetail[0].ActionStartDate);
                    let nCellLastEndIdx: number = DateTime.NotEquals(oSlotDetail.AdministrationDetail.InfusionEndDate, DateTime.MinValue) ? this.FindCellIndexByTime(oSlotDetail.AdministrationDetail.InfusionEndDate) : this.FindCellIndexByTime(oSlotDetail.AdministrationDetail.oInfusionAdminDetail[nActionsCount - 1].ActionEndDate);
                    if (nCellFirstStartIdx >= 0 && nCellLastEndIdx >= 0 && nCellFirstStartIdx == nCellLastEndIdx) {
                        PlotChangeBagOrChangeFlowIconWithoutLine = true;
                    }
                    else {
                        let oChangeBagChangeFlowItems = oSlotDetail.AdministrationDetail.oInfusionAdminDetail.Where(oItem => oItem.ActionCode == MedicationAction.CHANGEBAG || oItem.ActionCode == MedicationAction.CHANGEFLOWRATE);
                        if (oChangeBagChangeFlowItems != null && oChangeBagChangeFlowItems.Count() > 0) {
                            ChangeBagChangeFlowActionMinStartDTTM = oChangeBagChangeFlowItems.Min(oItem => oItem.ActionStartDate);
                            ChangeBagChangeFlowActionMaxStartDTTM = oChangeBagChangeFlowItems.Max(oItem => oItem.ActionStartDate);
                            let oActionEixtsAfterChangeBagChangeFlowItems = oSlotDetail.AdministrationDetail.oInfusionAdminDetail.Where(oItem => DateTime.GreaterThanOrEqualTo(oItem.ActionStartDate, ChangeBagChangeFlowActionMaxStartDTTM) && oItem.ActionCode != MedicationAction.CHANGEBAG && oItem.ActionCode != MedicationAction.CHANGEFLOWRATE);
                            if (oActionEixtsAfterChangeBagChangeFlowItems != null && oActionEixtsAfterChangeBagChangeFlowItems.Count() > 0)
                                PlotChangeBagOrChangeFlowIconWithoutLine = true;
                        }
                    }
                }
                for (let i: number = 0; i < nActionsCount; i++) {
                    oInfAdminAction = oSlotDetail.AdministrationDetail.oInfusionAdminDetail[i];
                    if (DateTime.GreaterThan(oInfAdminAction.ActionStartDate, oSlotDetail.AdministrationDetail.InfusionEndDate) && i > 0 && DateTime.LessThanOrEqualTo(oSlotDetail.AdministrationDetail.oInfusionAdminDetail[i - 1].ActionStartDate, oSlotDetail.AdministrationDetail.InfusionEndDate)) {
                        isEstimatedIconAlreadyPlotted = true;
                        oAction.EndTime = oSlotDetail.AdministrationDetail.InfusionEndDate;
                        oAction.EndIcon = enmInfusionIcon.EstimatedStop;
                        oAction.LineType = InfusionProcessIcon.LineTypes.Continuous;
                        oAction.LineColor = new SolidColorBrush(Colors.Green);
                        this.PlotLineForInfusionAction(oRow, oSlotDetail, oInfAdminAction, oAction);
                        oAction = new InfusionAction();
                        oAction.StartTime = oSlotDetail.AdministrationDetail.InfusionEndDate;
                    }
                    switch (oInfAdminAction.ActionCode) {
                        case MedicationAction.BEGUN:
                            oAction.StartTime = oInfAdminAction.ActionStartDate;
                            oAction.StartIcon = enmInfusionIcon.Begun;
                            sLastAction = MedicationAction.BEGUN;
                            break;
                        case MedicationAction.CHANGEBAG:
                            if (sLastAction == MedicationAction.PAUSE) {
                                oAction.EndTime = oInfAdminAction.ActionStartDate;
                                oAction.EndIcon = enmInfusionIcon.Resume;
                                oAction.LineType = InfusionProcessIcon.LineTypes.Dotted;
                                oAction.LineColor = !IsDiscontinuePrescItemStatus ? new SolidColorBrush(Colors.Grey) : new SolidColorBrush(Colors.Green);
                                this.PlotLineForInfusionAction(oRow, oSlotDetail, oInfAdminAction, oAction);
                                oAction = new InfusionAction();
                                oAction.StartTime = oInfAdminAction.ActionStartDate;
                                sLastAction = MedicationAction.RESUME;
                            }
                            if (PlotChangeBagOrChangeFlowIconWithoutLine || (DateTime.NotEquals(ChangeBagChangeFlowActionMinStartDTTM, DateTime.MinValue) && DateTime.NotEquals(ChangeBagChangeFlowActionMaxStartDTTM , DateTime.MinValue))) {
                                if (PlotChangeBagOrChangeFlowIconWithoutLine || (DateTime.NotEquals(ChangeBagChangeFlowActionMinStartDTTM, ChangeBagChangeFlowActionMaxStartDTTM) && DateTime.LessThan(oInfAdminAction.ActionStartDate, ChangeBagChangeFlowActionMaxStartDTTM))) {
                                    this.PlotLineForChangeBagAndFlowRate(oRow, oSlotDetail, oInfAdminAction, ObjectHelper.CreateObject(new InfusionAction(), { StartTime: oAction.StartTime, EndTime: oInfAdminAction.ActionStartDate, EndIcon: enmInfusionIcon.ChangeBag }));
                                }
                                else {
                                    
                                    if ((i + 1 < nActionsCount) && oInfAdminAction.ActionCode == oSlotDetail.AdministrationDetail.oInfusionAdminDetail[i+1].ActionCode) {
                                        this.PlotLineForChangeBagAndFlowRate(oRow, oSlotDetail, oInfAdminAction, ObjectHelper.CreateObject(new InfusionAction(), { StartTime: oAction.StartTime, EndTime: oInfAdminAction.ActionStartDate, EndIcon: enmInfusionIcon.ChangeBag }));
                                    }
                                    else {
                                        oAction.EndTime = oInfAdminAction.ActionStartDate;
                                        oAction.EndIcon = enmInfusionIcon.ChangeBag;
                                        if (sLastAction == MedicationAction.PAUSE) {
                                            oAction.LineType = InfusionProcessIcon.LineTypes.Dotted;
                                            oAction.LineColor = !IsDiscontinuePrescItemStatus ? new SolidColorBrush(Colors.Grey) : new SolidColorBrush(Colors.Green);
                                        }
                                        else {
                                            oAction.LineType = InfusionProcessIcon.LineTypes.Continuous;
                                            oAction.LineColor = new SolidColorBrush(Colors.Green);
                                        }
                                        this.PlotLineForInfusionAction(oRow, oSlotDetail, oInfAdminAction, oAction);
                                        oAction = new InfusionAction();
                                        oAction.StartTime = oInfAdminAction.ActionStartDate;
                                        sLastAction = MedicationAction.CHANGEBAG;
                                    }
                                }
                            }
                            break;
                        case MedicationAction.CHANGEFLOWRATE:
                            if (sLastAction == MedicationAction.PAUSE) {
                                oAction.EndTime = oInfAdminAction.ActionStartDate;
                                oAction.EndIcon = enmInfusionIcon.Resume;
                                oAction.LineType = InfusionProcessIcon.LineTypes.Dotted;
                                oAction.LineColor = !IsDiscontinuePrescItemStatus ? new SolidColorBrush(Colors.Grey) : new SolidColorBrush(Colors.Green);
                                this.PlotLineForInfusionAction(oRow, oSlotDetail, oInfAdminAction, oAction);
                                oAction = new InfusionAction();
                                oAction.StartTime = oInfAdminAction.ActionStartDate;
                                sLastAction = MedicationAction.RESUME;
                            }
                            if (PlotChangeBagOrChangeFlowIconWithoutLine || (DateTime.NotEquals(ChangeBagChangeFlowActionMinStartDTTM, DateTime.MinValue) && DateTime.NotEquals(ChangeBagChangeFlowActionMaxStartDTTM, DateTime.MinValue))) {
                                if (PlotChangeBagOrChangeFlowIconWithoutLine || (DateTime.NotEquals(ChangeBagChangeFlowActionMinStartDTTM , ChangeBagChangeFlowActionMaxStartDTTM) && DateTime.LessThan(oInfAdminAction.ActionStartDate, ChangeBagChangeFlowActionMaxStartDTTM))) {
                                    this.PlotLineForChangeBagAndFlowRate(oRow, oSlotDetail, oInfAdminAction, ObjectHelper.CreateObject(new InfusionAction(), { StartTime: oAction.StartTime, EndTime: oInfAdminAction.ActionStartDate, EndIcon: enmInfusionIcon.ChangeFlowRate }));
                                }
                                else {
                                   
                                    if ((i + 1 < nActionsCount) && oInfAdminAction.ActionCode == oSlotDetail.AdministrationDetail.oInfusionAdminDetail[i+1].ActionCode) {
                                        this.PlotLineForChangeBagAndFlowRate(oRow, oSlotDetail, oInfAdminAction, ObjectHelper.CreateObject(new InfusionAction(), { StartTime: oAction.StartTime, EndTime: oInfAdminAction.ActionStartDate, EndIcon: enmInfusionIcon.ChangeFlowRate }));
                                    }
                                    else {
                                        oAction.EndTime = oInfAdminAction.ActionStartDate;
                                        oAction.EndIcon = enmInfusionIcon.ChangeFlowRate;
                                        if (sLastAction == MedicationAction.PAUSE) {
                                            oAction.LineType = InfusionProcessIcon.LineTypes.Dotted;
                                            oAction.LineColor = !IsDiscontinuePrescItemStatus ? new SolidColorBrush(Colors.Grey) : new SolidColorBrush(Colors.Green);
                                        }
                                        else {
                                            oAction.LineType = InfusionProcessIcon.LineTypes.Continuous;
                                            oAction.LineColor = new SolidColorBrush(Colors.Green);
                                        }
                                        this.PlotLineForInfusionAction(oRow, oSlotDetail, oInfAdminAction, oAction);
                                        oAction = new InfusionAction();
                                        oAction.StartTime = oInfAdminAction.ActionStartDate;
                                        sLastAction = MedicationAction.CHANGEFLOWRATE;
                                    }
                                }
                            }
                            break;
                        case MedicationAction.PAUSE:
                            oAction.EndTime = oInfAdminAction.ActionStartDate;
                            oAction.EndIcon = enmInfusionIcon.Pause;
                            oAction.LineType = InfusionProcessIcon.LineTypes.Continuous;
                            oAction.LineColor = new SolidColorBrush(Colors.Green);
                            this.PlotLineForInfusionAction(oRow, oSlotDetail, oInfAdminAction, oAction);
                            oAction = new InfusionAction();
                            oAction.StartTime = oInfAdminAction.ActionStartDate;
                            sLastAction = MedicationAction.PAUSE;
                            break;
                        case MedicationAction.RESUME:
                            oAction.EndTime = oInfAdminAction.ActionStartDate;
                            oAction.EndIcon = enmInfusionIcon.Resume;
                            oAction.LineType = InfusionProcessIcon.LineTypes.Dotted;
                            oAction.LineColor = !IsDiscontinuePrescItemStatus ? new SolidColorBrush(Colors.Grey) : new SolidColorBrush(Colors.Green);
                            this.PlotLineForInfusionAction(oRow, oSlotDetail, oInfAdminAction, oAction);
                            oAction = new InfusionAction();
                            oAction.StartTime = oInfAdminAction.ActionStartDate;
                            sLastAction = MedicationAction.RESUME;
                            break;
                        case MedicationAction.STOP:
                            oAction.EndTime = oInfAdminAction.ActionStartDate;
                            oAction.EndIcon = enmInfusionIcon.Stopped;
                            oAction.LineType = InfusionProcessIcon.LineTypes.Continuous;
                            oAction.LineColor = new SolidColorBrush(Colors.Green);
                            this.PlotLineForInfusionAction(oRow, oSlotDetail, oInfAdminAction, oAction);
                            break;
                        case MedicationAction.COMPLETE:
                            oAction.EndTime = oInfAdminAction.ActionStartDate;
                            oAction.EndIcon = enmInfusionIcon.Complete;
                            oAction.LineType = InfusionProcessIcon.LineTypes.Continuous;
                            oAction.LineColor = new SolidColorBrush(Colors.Green);
                            this.PlotLineForInfusionAction(oRow, oSlotDetail, oInfAdminAction, oAction);
                            break;
                    }
                }
                if (DateTime.NotEquals(oAction.StartTime, DateTime.MinValue) && (oSlotDetail.Status == SlotStatus.INPROGRESS || oSlotDetail.Status == SlotStatus.PAUSED)) {
                    if (DateTime.Equals(oSlotDetail.AdministrationDetail.InfusionEndDate, DateTime.MinValue)) {
                        let isStopAtTimeLine: boolean = true;
                        let oTagDrugHeaderDetail: TagDrugHeaderDetail = ObjectHelper.CreateType<TagDrugHeaderDetail>(oRow.DrugItem.Tag, TagDrugHeaderDetail);
                        if (oTagDrugHeaderDetail != null && String.Compare(oSlotDetail.Status, SlotStatus.PAUSED, StringComparison.CurrentCultureIgnoreCase) == 0 && String.Compare(oTagDrugHeaderDetail.INFTYCODE, InfusionTypesCode.PCA, StringComparison.CurrentCultureIgnoreCase) == 0) {
                            isStopAtTimeLine = false;
                        }
                        if (isStopAtTimeLine) {
                            if (DateTime.NotEquals(this.oInfusionChartVM.CurrentDTTM, DateTime.MinValue)) {
                                oAction.EndTime = this.oInfusionChartVM.CurrentDTTM;
                            }
                            else if (this.oInfusionChartVM.CurrentPageView == 1) {
                                oAction.EndTime = new DateTime(this.oInfusionChartVM.EndDTTM.Year, this.oInfusionChartVM.EndDTTM.Month, this.oInfusionChartVM.EndDTTM.Day, this.oInfusionChartVM.EndDTTM.Hour, this.oInfusionChartVM.EndDTTM.Minute, 0);
                            }
                            else if (this.oInfusionChartVM.CurrentPageView == 3) {
                                oAction.EndTime = DateTime.MinValue;
                            }
                            oAction.LineType = InfusionProcessIcon.LineTypes.Continuous;
                            oAction.LineColor = !IsDiscontinuePrescItemStatus ? new SolidColorBrush(Colors.Grey) : new SolidColorBrush(Colors.Green);
                            this.PlotLineForInfusionAction(oRow, oSlotDetail, oInfAdminAction, oAction);
                        }
                    }
                    else if (this.oInfusionChartVM.CurrentPageView == 2 && DateTime.LessThan(oSlotDetail.AdministrationDetail.InfusionEndDate, this.oInfusionChartVM.CurrentDTTM)) {
                        if (DateTime.GreaterThanOrEqualTo(oSlotDetail.AdministrationDetail.InfusionEndDate, oAction.StartTime)) {
                            if (!isEstimatedIconAlreadyPlotted) {
                                oAction.EndTime = oSlotDetail.AdministrationDetail.InfusionEndDate;
                                oAction.LineType = InfusionProcessIcon.LineTypes.Continuous;
                                oAction.EndIcon = enmInfusionIcon.EstimatedStop;
                                oAction.LineColor = !IsDiscontinuePrescItemStatus ? new SolidColorBrush(Colors.Grey) : new SolidColorBrush(Colors.Green);
                            }
                            this.PlotLineForInfusionAction(oRow, oSlotDetail, oInfAdminAction, oAction);
                        }
                        if (oSlotDetail.Status == SlotStatus.INPROGRESS || oSlotDetail.Status == SlotStatus.PAUSED) {
                            if (DateTime.GreaterThanOrEqualTo(oSlotDetail.AdministrationDetail.InfusionEndDate, oAction.StartTime)) {
                                oAction = new InfusionAction();
                                oAction.StartTime = oSlotDetail.AdministrationDetail.InfusionEndDate;
                            }
                            oAction.EndTime = this.oInfusionChartVM.CurrentDTTM;
                            oAction.LineType = InfusionProcessIcon.LineTypes.Continuous;
                            oAction.LineColor = !IsDiscontinuePrescItemStatus ? new SolidColorBrush(Colors.Grey) : new SolidColorBrush(Colors.Green);
                            this.PlotLineForInfusionAction(oRow, oSlotDetail, oInfAdminAction, oAction);
                        }
                    }
                    else {
                        if (this.oInfusionChartVM.CurrentPageView == 1 && (oSlotDetail.Status == SlotStatus.INPROGRESS || oSlotDetail.Status == SlotStatus.PAUSED)) {
                            if (DateTime.GreaterThanOrEqualTo(oSlotDetail.AdministrationDetail.InfusionEndDate, oAction.StartTime)) {
                                if (!isEstimatedIconAlreadyPlotted) {
                                    oAction.EndTime = oSlotDetail.AdministrationDetail.InfusionEndDate;
                                    oAction.LineType = InfusionProcessIcon.LineTypes.Continuous;
                                    oAction.EndIcon = enmInfusionIcon.EstimatedStop;
                                    oAction.LineColor = !IsDiscontinuePrescItemStatus ? new SolidColorBrush(Colors.Grey) : new SolidColorBrush(Colors.Green);
                                }
                                this.PlotLineForInfusionAction(oRow, oSlotDetail, oInfAdminAction, oAction);
                                oAction.StartTime = oSlotDetail.AdministrationDetail.InfusionEndDate;
                            }
                            oAction.EndTime = new DateTime(this.oInfusionChartVM.EndDTTM.Year, this.oInfusionChartVM.EndDTTM.Month, this.oInfusionChartVM.EndDTTM.Day, this.oInfusionChartVM.EndDTTM.Hour, this.oInfusionChartVM.EndDTTM.Minute, 0);
                            oAction.StartIcon = enmInfusionIcon.NoIcon;
                            oAction.EndIcon = enmInfusionIcon.NoIcon;
                            oAction.LineType = InfusionProcessIcon.LineTypes.Continuous;
                            oAction.LineColor = !IsDiscontinuePrescItemStatus ? new SolidColorBrush(Colors.Grey) : new SolidColorBrush(Colors.Green);
                        }
                        else if (this.oInfusionChartVM.CurrentPageView == 1 && DateTime.LessThan(oSlotDetail.AdministrationDetail.InfusionEndDate, this.oInfusionChartVM.EndDTTM)) {
                            oAction.EndTime = new DateTime(this.oInfusionChartVM.EndDTTM.Year, this.oInfusionChartVM.EndDTTM.Month, this.oInfusionChartVM.EndDTTM.Day, this.oInfusionChartVM.EndDTTM.Hour, this.oInfusionChartVM.EndDTTM.Minute, 0);
                            oAction.EndIcon = enmInfusionIcon.NoIcon;
                            oAction.LineType = InfusionProcessIcon.LineTypes.Continuous;
                            oAction.LineColor = !IsDiscontinuePrescItemStatus ? new SolidColorBrush(Colors.Grey) : new SolidColorBrush(Colors.Green);
                        }
                        else {
                            if (!isEstimatedIconAlreadyPlotted) {
                                oAction.EndTime = oSlotDetail.AdministrationDetail.InfusionEndDate;
                                oAction.EndIcon = enmInfusionIcon.EstimatedStop;
                                oAction.LineType = InfusionProcessIcon.LineTypes.Continuous;
                                oAction.LineColor = !IsDiscontinuePrescItemStatus ? new SolidColorBrush(Colors.Grey) : new SolidColorBrush(Colors.Green);
                            }
                        }
                        this.PlotLineForInfusionAction(oRow, oSlotDetail, oInfAdminAction, oAction);
                    }
                }
                if (oRow != null && oRow.InfusionChartCells != null && oRow.InfusionChartCells.Count > 0) {
                    let strTemp: string = String.Empty;
                    let strArray: string[] = null;
                    let oMultiIconCell = oRow.InfusionChartCells.Where(oItem =>oItem.MultiActuionIcon!=null).Select(oItem => oItem);
                    if (oMultiIconCell != null && oMultiIconCell.Count() > 0) {
                        oMultiIconCell.ForEach(oItem => {
                            strTemp = oItem.MultiActuionIcon.Tooltip.ToString();
                            if (strTemp.Contains('~')) {
                                strArray = strTemp.Split('~');
                                if (strArray != null && strArray.length > 1) {
                                    let n = strTemp.lastIndexOf('~');
                                    let strTempTooltip = strTemp.substring(0,n-1);
                                    strTempTooltip = (strTempTooltip).Replace("~", Environment.NewLine + Environment.NewLine);
                                    oItem.MultiActuionIcon.Tooltip = strTempTooltip;
                                }
                            }
                        });
                    }
                }
            }
        }
        private PlotChangeBagIcon(oCell: InfusionChartCell, oInfSlotDetail: SlotDetail, oCurrentInfAdminAction: InfusionAdminDetail): void {
            if (oCell != null && oInfSlotDetail != null && oInfSlotDetail.AdministrationDetail != null && oInfSlotDetail.AdministrationDetail.oInfusionAdminDetail != null && oInfSlotDetail.AdministrationDetail.oInfusionAdminDetail.Count > 0) {
                let PerviousBagInfusedVolume: string = String.Empty;
                let PreviousBagInfusedVolumeUOM: string = String.Empty;
                let sIconTooltip: string = String.Empty;
                let InfusionAdminDetails = oInfSlotDetail.AdministrationDetail.oInfusionAdminDetail.Select(s => s).OrderBy(o => o.ActionStartDate).ToList();
                if (InfusionAdminDetails != null) {
                    PerviousBagInfusedVolume = InfusionAdminDetails.Where(perviousBag => perviousBag.oInfusionBagDetail.BagSequence == (oCurrentInfAdminAction.oInfusionBagDetail.BagSequence - 1)).Select(s => s.oInfusionBagDetail.InfusedVolume).FirstOrDefault();
                    PreviousBagInfusedVolumeUOM = InfusionAdminDetails.Where(perviousBag => perviousBag.oInfusionBagDetail.InfusedVolumeUOM != null && perviousBag.oInfusionBagDetail.BagSequence == (oCurrentInfAdminAction.oInfusionBagDetail.BagSequence - 1)).Select(s => s.oInfusionBagDetail.InfusedVolumeUOM.UOMName).FirstOrDefault();
                    if (oInfSlotDetail.AdministrationDetail.IsDuringHomeLeave) {
                        sIconTooltip = String.Format(Resource.InfusionChart.BagChange_tooltip, this.SetToolTip(Resource.MedsAdminChartToolTip.DuringHomeLeaveTooltip), this.SetToolTip(PerviousBagInfusedVolume + " " + PreviousBagInfusedVolumeUOM), this.SetToolTip(oCurrentInfAdminAction.oInfusionBagDetail.BagVolume + " " + oCurrentInfAdminAction.oInfusionBagDetail.BagVolumeUOM.UOMName),
                        this.SetToolTip(InfusionAdminDetails.Where(c => c.ActionCode == MedicationAction.BEGUN).Select(s => s.ActionStartDate).FirstOrDefault()),
                        this.SetToolTip((oCurrentInfAdminAction.oInfusionBagDetail.AdministeredBy != null && !String.IsNullOrEmpty(oCurrentInfAdminAction.oInfusionBagDetail.AdministeredBy.Name)) ? oCurrentInfAdminAction.oInfusionBagDetail.AdministeredBy.Name : oInfSlotDetail.AdministrationDetail.AdministeredBy),
                        this.SetToolTip(oCurrentInfAdminAction.RecordedAt),
                        this.SetToolTip(oCurrentInfAdminAction.RecordedBy)).Replace("\\r\\n", Environment.NewLine);
                    }
                    else {
                        sIconTooltip = String.Format(Resource.InfusionChart.BagChange_tooltip, this.SetToolTip(String.Empty), this.SetToolTip(PerviousBagInfusedVolume + " " + PreviousBagInfusedVolumeUOM), this.SetToolTip(oCurrentInfAdminAction.oInfusionBagDetail.BagVolume + " " + oCurrentInfAdminAction.oInfusionBagDetail.BagVolumeUOM.UOMName),
                        this.SetToolTip(InfusionAdminDetails.Where(c => c.ActionCode == MedicationAction.BEGUN).Select(s => s.ActionStartDate).FirstOrDefault()),
                        this.SetToolTip((oCurrentInfAdminAction.oInfusionBagDetail.AdministeredBy != null && !String.IsNullOrEmpty(oCurrentInfAdminAction.oInfusionBagDetail.AdministeredBy.Name)) ? oCurrentInfAdminAction.oInfusionBagDetail.AdministeredBy.Name : oInfSlotDetail.AdministrationDetail.AdministeredBy),
                        this.SetToolTip(oCurrentInfAdminAction.RecordedAt),
                            this.SetToolTip(oCurrentInfAdminAction.RecordedBy)).Replace("\\r\\n", Environment.NewLine);
                    }
                }
                if (!String.IsNullOrEmpty(oCurrentInfAdminAction.infusionComments)) {
                    sIconTooltip = sIconTooltip + Environment.NewLine + MedsAdminChartToolTip.CommentsToolTip + ": " + oCurrentInfAdminAction.infusionComments;
                    this.PlotAdminCommentsIcon(oCell, oCurrentInfAdminAction.infusionComments, Resource.InfusionChart.ChangeBagActionText_tooltip);
                }
                let oTemp: ChartIcon = oCell.InfusionIcons.Where(x => x.Key == "icoChangeBag").FirstOrDefault();
                if (oTemp != null) {
                    if (oTemp.Tooltip instanceof iLabel) {
                        let objLabel: iLabel = ObjectHelper.CreateType<iLabel>(oTemp.Tooltip, iLabel);
                        if (objLabel != null)
                            oTemp.Tooltip = ObjectHelper.CreateObject(new iLabel(), { Text: objLabel.Text + Environment.NewLine + Environment.NewLine + sIconTooltip, IsWordwrap: true, Width: 200 });
                    }
                }
                else {
                    let oChartIcon: ChartIcon = new ChartIcon();
                    oChartIcon.EnableOnHotSpotClick = false;
                    oChartIcon.Key = "icoChangeBag";
                    oChartIcon.UriString = MedImage.GetPath(MedImages.ChangeBagInfusionIcon);
                    oChartIcon.Tooltip = ObjectHelper.CreateObject(new iLabel(), { Text: sIconTooltip, IsWordwrap: true, Width: 200 });
                    oCell.InfusionIcons.Add(oChartIcon);
                }
            }
        }
        private PlotChangeFlowRateIcon(oCell: InfusionChartCell, oInfSlotDetail: SlotDetail, oCurrentInfAdminAction: InfusionAdminDetail, oRow: InfusionChartRow): void {
            if (oCell != null && oInfSlotDetail != null && oInfSlotDetail.AdministrationDetail != null && oInfSlotDetail.AdministrationDetail.oInfusionAdminDetail != null && oInfSlotDetail.AdministrationDetail.oInfusionAdminDetail.Count > 0) {
                let sIconTooltip: string = String.Empty;
                let InfusionAdminDetail = oInfSlotDetail.AdministrationDetail.oInfusionAdminDetail.Where(c => c.ActionStartDate <= oCurrentInfAdminAction.ActionStartDate && c.MedAdminInfusionOID != oCurrentInfAdminAction.MedAdminInfusionOID && (c.ActionCode == MedicationAction.BEGUN || c.ActionCode == MedicationAction.CHANGEBAG || c.ActionCode == MedicationAction.CHANGEFLOWRATE)).Select(s => s).OrderByDescending(o => o.ActionStartDate).FirstOrDefault();
                if (InfusionAdminDetail != null && InfusionAdminDetail.DripRateUOM != null && InfusionAdminDetail.DripRatePerUOM != null && oCurrentInfAdminAction.DripRateUOM != null && oCurrentInfAdminAction.DripRatePerUOM != null) {
                    let oDrugDet: TagDrugHeaderDetail = ObjectHelper.CreateType<TagDrugHeaderDetail>(oRow.DrugItem.Tag, TagDrugHeaderDetail);
                    if (oDrugDet != null && !String.IsNullOrEmpty(oDrugDet.ItemSubType) && String.Compare(oDrugDet.ItemSubType, InfusionTypesCode.SUBTYPE_GAS) == 0) {
                        if (oInfSlotDetail.AdministrationDetail.IsDuringHomeLeave) {
                            sIconTooltip = String.Format(Resource.InfusionChart.GasChangeFlowRate_ToolTip, this.SetToolTip(InfusionAdminDetail.InfusionRate) + " " + this.SetToolTip(InfusionAdminDetail.InfusionRateUOM.UOMName) + "/" + this.SetToolTip(InfusionAdminDetail.InfusionRatePerUOM.UOMName),
                            this.SetToolTip(oCurrentInfAdminAction.InfusionRate) + " " + this.SetToolTip(oCurrentInfAdminAction.InfusionRateUOM.UOMName) + "/" + this.SetToolTip(oCurrentInfAdminAction.InfusionRatePerUOM.UOMName), this.SetToolTip(Resource.MedsAdminChartToolTip.DuringHomeLeaveTooltip), this.SetToolTip(oCurrentInfAdminAction.ActionStartDate),
                            this.SetToolTip(oCurrentInfAdminAction.RecordedAt),
                            this.SetToolTip(oCurrentInfAdminAction.RecordedBy)).Replace("\\r\\n", Environment.NewLine);
                        }
                        else {
                            sIconTooltip = String.Format(Resource.InfusionChart.GasChangeFlowRate_ToolTip, this.SetToolTip(InfusionAdminDetail.InfusionRate) + " " + this.SetToolTip(InfusionAdminDetail.InfusionRateUOM.UOMName) + "/" + this.SetToolTip(InfusionAdminDetail.InfusionRatePerUOM.UOMName),
                            this.SetToolTip(oCurrentInfAdminAction.InfusionRate) + " " + this.SetToolTip(oCurrentInfAdminAction.InfusionRateUOM.UOMName) + "/" + this.SetToolTip(oCurrentInfAdminAction.InfusionRatePerUOM.UOMName), this.SetToolTip(String.Empty), this.SetToolTip(oCurrentInfAdminAction.ActionStartDate),
                            this.SetToolTip(oCurrentInfAdminAction.RecordedAt),
                            this.SetToolTip(oCurrentInfAdminAction.RecordedBy)).Replace("\\r\\n", Environment.NewLine);
                        }
                    }
                    else {
                        let OldConcentrationValue: string = String.Empty, NewConcentrationValue = String.Empty, OldInfusionRateValue = String.Empty, NewInfusionRateValue = String.Empty;
                        if (InfusionAdminDetail.ConcentrationStrengthUOM != null && InfusionAdminDetail.ConcentrationVolumeUOM != null) {
                            OldConcentrationValue = InfusionAdminDetail.ConcentrationStrength + " " + InfusionAdminDetail.ConcentrationStrengthUOM.UOMName + " / " + InfusionAdminDetail.ConcentrationVolume + " " + InfusionAdminDetail.ConcentrationVolumeUOM.UOMName;
                        }
                        if (oCurrentInfAdminAction.ConcentrationStrengthUOM != null && oCurrentInfAdminAction.ConcentrationVolumeUOM != null) {
                            NewConcentrationValue = oCurrentInfAdminAction.ConcentrationStrength + " " + oCurrentInfAdminAction.ConcentrationStrengthUOM.UOMName + " / " + oCurrentInfAdminAction.ConcentrationVolume + " " + oCurrentInfAdminAction.ConcentrationVolumeUOM.UOMName;
                        }
                        if (InfusionAdminDetail.InfusionRateUOM != null && InfusionAdminDetail.InfusionRatePerUOM != null) {
                            OldInfusionRateValue = InfusionAdminDetail.InfusionRate + " " + InfusionAdminDetail.InfusionRateUOM.UOMName + "/" + InfusionAdminDetail.InfusionRatePerUOM.UOMName;
                        }
                        if (oCurrentInfAdminAction.InfusionRateUOM != null && oCurrentInfAdminAction.InfusionRatePerUOM != null) {
                            NewInfusionRateValue = oCurrentInfAdminAction.InfusionRate + " " + oCurrentInfAdminAction.InfusionRateUOM.UOMName + "/" + oCurrentInfAdminAction.InfusionRatePerUOM.UOMName;
                        }
                        let DripRate: string = String.Empty;
                        if (!String.IsNullOrEmpty(oCurrentInfAdminAction.DripRate) && oCurrentInfAdminAction.DripRateUOM != null && !String.IsNullOrEmpty(oCurrentInfAdminAction.DripRateUOM.UOMName) && oCurrentInfAdminAction.DripRatePerUOM != null && !String.IsNullOrEmpty(oCurrentInfAdminAction.DripRatePerUOM.UOMName)) {
                            DripRate = oCurrentInfAdminAction.DripRate + " " + oCurrentInfAdminAction.DripRateUOM.UOMName + "/" + oCurrentInfAdminAction.DripRatePerUOM.UOMName;
                        }
                        if (!String.IsNullOrEmpty(OldConcentrationValue) && !String.IsNullOrEmpty(NewConcentrationValue) &&!String.Equals(OldConcentrationValue, NewConcentrationValue) && !String.Equals(OldInfusionRateValue, NewInfusionRateValue)) {
                            sIconTooltip = String.Format(Resource.InfusionChart.ChangeConcentrationAndRate_tooltip, OldInfusionRateValue, NewInfusionRateValue, OldConcentrationValue, NewConcentrationValue,
                                this.SetToolTip(oCurrentInfAdminAction.ActionStartDate),
                                this.SetToolTip(DripRate), this.SetToolTip(oCurrentInfAdminAction.RecordedAt),
                                this.SetToolTip(oCurrentInfAdminAction.RecordedBy)).Replace("\\r\\n", Environment.NewLine);
                        }
                        else if (!String.IsNullOrEmpty(OldConcentrationValue) && !String.IsNullOrEmpty(NewConcentrationValue) &&
                            !String.Equals(OldConcentrationValue, NewConcentrationValue) &&
                            String.Equals(OldInfusionRateValue, NewInfusionRateValue)) {
                            if (oInfSlotDetail.AdministrationDetail.IsDuringHomeLeave) {
                                sIconTooltip = String.Format(Resource.InfusionChart.ChangeConcentration_tooltip, OldConcentrationValue, NewConcentrationValue,
                                    this.SetToolTip(Resource.MedsAdminChartToolTip.DuringHomeLeaveTooltip),
                                    this.SetToolTip(oCurrentInfAdminAction.ActionStartDate),
                                    this.SetToolTip(DripRate), this.SetToolTip(oCurrentInfAdminAction.RecordedAt),
                                    this.SetToolTip(oCurrentInfAdminAction.RecordedBy)).Replace("\\r\\n", Environment.NewLine);
                            }
                            else {
                                sIconTooltip = String.Format(Resource.InfusionChart.ChangeConcentration_tooltip, OldConcentrationValue, NewConcentrationValue,
                                    this.SetToolTip(String.Empty),
                                    this.SetToolTip(oCurrentInfAdminAction.ActionStartDate),
                                    this.SetToolTip(DripRate), this.SetToolTip(oCurrentInfAdminAction.RecordedAt),
                                    this.SetToolTip(oCurrentInfAdminAction.RecordedBy)).Replace("\\r\\n", Environment.NewLine);
                            }
                        }
                        else {
                            if (oInfSlotDetail.AdministrationDetail.IsDuringHomeLeave) {
                                sIconTooltip = String.Format(Resource.InfusionChart.ChangeFlowrate_tooltip, OldInfusionRateValue, NewInfusionRateValue, this.SetToolTip(Resource.MedsAdminChartToolTip.DuringHomeLeaveTooltip),
                                this.SetToolTip(oCurrentInfAdminAction.ActionStartDate),
                                    this.SetToolTip(DripRate), this.SetToolTip(oCurrentInfAdminAction.RecordedAt),
                                    this.SetToolTip(oCurrentInfAdminAction.RecordedBy)).Replace("\\r\\n", Environment.NewLine);
                            }
                            else {
                                sIconTooltip = String.Format(Resource.InfusionChart.ChangeFlowrate_tooltip, OldInfusionRateValue, NewInfusionRateValue, this.SetToolTip(String.Empty),
                                this.SetToolTip(oCurrentInfAdminAction.ActionStartDate),
                                    this.SetToolTip(DripRate), this.SetToolTip(oCurrentInfAdminAction.RecordedAt),
                                    this.SetToolTip(oCurrentInfAdminAction.RecordedBy)).Replace("\\r\\n", Environment.NewLine);
                            }
                        }
                    }
                }
                if (!String.IsNullOrEmpty(oCurrentInfAdminAction.infusionComments)) {
                    sIconTooltip = sIconTooltip + Environment.NewLine + MedsAdminChartToolTip.CommentsToolTip + ": " + oCurrentInfAdminAction.infusionComments;
                    this.PlotAdminCommentsIcon(oCell, oCurrentInfAdminAction.infusionComments, Resource.InfusionChart.ChangeFlowRateActionText_tooltip);
                }
                let oTemp: ChartIcon = oCell.InfusionIcons.Where(x => x.Key == "icoChangeFlowRate").FirstOrDefault();
                if (oTemp != null) {
                    if (oTemp.Tooltip instanceof iLabel) {
                        let objLabel: iLabel = ObjectHelper.CreateType<iLabel>(oTemp.Tooltip, iLabel);
                        if (objLabel != null)
                            oTemp.Tooltip = ObjectHelper.CreateObject(new iLabel(), { Text: objLabel.Text + Environment.NewLine + Environment.NewLine + sIconTooltip, IsWordwrap: true, Width: 200 });
                    }
                }
                else {
                    let oChartIcon: ChartIcon = new ChartIcon();
                    oChartIcon.EnableOnHotSpotClick = false;
                    oChartIcon.Key = "icoChangeFlowRate";
                    oChartIcon.UriString = MedImage.GetPath(MedImages.ChangeFlowRateInfusionIcon);
                    oChartIcon.Tooltip = ObjectHelper.CreateObject(new iLabel(), { Text: sIconTooltip, IsWordwrap: true, Width: 200 });
                    oCell.InfusionIcons.Add(oChartIcon);
                }
            }
        }
        private PlotLineForChangeBagAndFlowRate(oRow: InfusionChartRow, oSlotDetail: SlotDetail, oCurrentInfAdminAction: InfusionAdminDetail, oAction: InfusionAction): void {
            let oCell: InfusionChartCell;
            let nCellStartIdx: number = this.FindCellIndexByTime(oAction.StartTime);
            let oCellEndIdx: number = this.FindCellIndexByTime(oAction.EndTime);
            let nStartIdx: number = -1;
            if (nCellStartIdx > -1) {
                nStartIdx = nCellStartIdx;
            }
            else {
                if (DateTime.LessThan(oAction.StartTime, this.oInfusionChartVM.StartDTTM) && DateTime.GreaterThanOrEqualTo(oAction.EndTime, this.oInfusionChartVM.StartDTTM)) {
                    nStartIdx = InfusionChartHelper.CellFirstIndex;
                    oAction.StartIcon = enmInfusionIcon.NoIcon;
                }
            }
            let nEndIdx: number = -1;
            if (oCellEndIdx > -1)
                nEndIdx = oCellEndIdx;
            else {
                if (nStartIdx > -1 && DateTime.GreaterThan(oAction.EndTime, this.oInfusionChartVM.EndDTTM)) {
                    nEndIdx = InfusionChartHelper.CellLastIndex;
                    oAction.EndIcon = enmInfusionIcon.NoIcon;
                }
            }
            if (nStartIdx > -1 && nEndIdx > -1) {
                for (let i: number = nStartIdx; i <= nEndIdx; i++) {
                    oCell = oRow.InfusionChartCells[i];
                    oCell.ToolTip = String.Empty;
                    if (i == oCellEndIdx && oAction.EndIcon != enmInfusionIcon.NoIcon) {
                        switch (oAction.EndIcon) {
                            case enmInfusionIcon.ChangeBag:
                                this.PlotChangeBagIcon(oCell, oSlotDetail, oCurrentInfAdminAction);
                                break;
                            case enmInfusionIcon.ChangeFlowRate:
                                this.PlotChangeFlowRateIcon(oCell, oSlotDetail, oCurrentInfAdminAction, oRow);
                                break;
                        }
                    }
                    oCell.EnableCellClick = true;
                    if (oCell.Tag == null || oCell.Tag == undefined || (String.Compare((<INFRecordAdminParams>oCell.Tag).SlotStatus, SlotStatus.INPROGRESS, StringComparison.CurrentCultureIgnoreCase) != 0 && String.Compare((<INFRecordAdminParams>oCell.Tag).SlotStatus, SlotStatus.PAUSED, StringComparison.CurrentCultureIgnoreCase) != 0)) {
                        oCell.Tag = this.FillTagObject(oSlotDetail);
                    }
                }
            }
        }
        private PlotLineForInfusionAction(oRow: InfusionChartRow, oSlotDetail: SlotDetail, oCurrentInfAdminAction: InfusionAdminDetail, oAction: InfusionAction): void {
            let oCell: InfusionChartCell = new InfusionChartCell();
            let oLine: CLine;
            let nCellStartIdx: number = this.FindCellIndexByTime(oAction.StartTime);
            let oCellEndIdx: number = this.FindCellIndexByTime(oAction.EndTime);
            let nStartIdx: number = -1;
            if (nCellStartIdx > -1) {
                nStartIdx = nCellStartIdx;
            }
            else {
                if (DateTime.LessThan(oAction.StartTime , this.oInfusionChartVM.StartDTTM) && DateTime.GreaterThanOrEqualTo(oAction.EndTime , this.oInfusionChartVM.StartDTTM)) {
                    nStartIdx = InfusionChartHelper.CellFirstIndex;
                    oAction.StartIcon = enmInfusionIcon.NoIcon;
                }
            }
            let nEndIdx: number = -1;
            if (oCellEndIdx > -1)
                nEndIdx = oCellEndIdx;
            else {
                if (nStartIdx > -1 && DateTime.GreaterThan(oAction.EndTime , this.oInfusionChartVM.EndDTTM)) {
                    nEndIdx = InfusionChartHelper.CellLastIndex;
                    oAction.EndIcon = enmInfusionIcon.NoIcon;
                }
            }
            if (nStartIdx > -1 && nEndIdx > -1) {
                for (let i: number = nStartIdx; i <= nEndIdx; i++) {
                    oCell = oRow.InfusionChartCells[i];
                    oCell.ToolTip = String.Empty;
                    oLine = new CLine();
                    oLine.StartDTTM = oAction.StartTime;
                    if (i == nCellStartIdx && oAction.StartIcon != enmInfusionIcon.NoIcon) {
                        oLine.StartIcon = this.GetIconForChartLine(oCell, oAction.StartIcon, oSlotDetail, oCurrentInfAdminAction, oRow);
                    }
                    oLine.LineColour = oAction.LineColor;
                    oLine.LineType = oAction.LineType;
                    oLine.OrderIndex = 0;
                    oLine.Key = "Line-" + this.oRand.Next().ToString();
                    oLine.EndDTTDM = oAction.EndTime;
                    if (i == oCellEndIdx && oAction.EndIcon != enmInfusionIcon.NoIcon) {
                        switch (oAction.EndIcon) {
                            case enmInfusionIcon.ChangeBag:
                                this.PlotChangeBagIcon(oCell, oSlotDetail, oCurrentInfAdminAction);
                                oLine.EndIcon = this.GetIconForChartLine(oCell, oAction.EndIcon, oSlotDetail, oCurrentInfAdminAction, oRow);
                                break;
                            case enmInfusionIcon.ChangeFlowRate:
                                this.PlotChangeFlowRateIcon(oCell, oSlotDetail, oCurrentInfAdminAction, oRow);
                                oLine.EndIcon = this.GetIconForChartLine(oCell, oAction.EndIcon, oSlotDetail, oCurrentInfAdminAction, oRow);
                                break;
                            default:
                                oLine.EndIcon = this.GetIconForChartLine(oCell, oAction.EndIcon, oSlotDetail, oCurrentInfAdminAction, oRow);
                                break;
                        }
                        //oLine.EndDTTDM = oAction.EndTime;
                    }
                    else if (i == oCellEndIdx && oAction.EndIcon == enmInfusionIcon.NoIcon) {
                        //oLine.EndDTTDM = oAction.EndTime;
                        if (DateTime.NotEquals(this.oInfusionChartVM.CurrentDTTM , DateTime.MinValue))
                            oLine.StopAtTimeline = true;
                    }
                    if (!String.Equals(oSlotDetail.Status, SlotStatus.HOMELEAVE, StringComparison.CurrentCultureIgnoreCase) && oSlotDetail.AdministrationDetail.IsDuringHomeLeave) {
                        if ((oLine.StartIcon != null && oLine.StartIcon.UriString != null) || (oLine.EndIcon != null && oLine.EndIcon.UriString != null)) {
                            let oChartIcon: ChartIcon = new ChartIcon();
                            oChartIcon.EnableOnHotSpotClick = false;
                            oChartIcon.Key = "HomeLeaveIcon";
                            oChartIcon.UriString = MedImage.GetPath(MedImages.HomeLeaveIcon);
                            oChartIcon.Tooltip = ObjectHelper.CreateObject(new iLabel(), { Text: MedsAdminChartToolTip.HomeLeaveToolTip });
                            oCell.HomeLeaveIcon = oChartIcon;
                        }
                    }
                    oCell.CLines.Add(oLine);
                    oCell.EnableCellClick = true;
                    oCell.InfusionAlignment = ImageAlignment.Center;
                    oCell.ChartBackground = new SolidColorBrush(Colors.Transparent);
                    if (oCell.Tag == null || oCell.Tag == undefined ||  (String.Compare((<INFRecordAdminParams>oCell.Tag).SlotStatus, SlotStatus.INPROGRESS, StringComparison.CurrentCultureIgnoreCase) != 0 && String.Compare((<INFRecordAdminParams>oCell.Tag).SlotStatus, SlotStatus.PAUSED, StringComparison.CurrentCultureIgnoreCase) != 0)) {
                        oCell.Tag = this.FillTagObject(oSlotDetail);
                    }
                }
            }
        }
        private PlotMultiActionIcon(oCell: InfusionChartCell, sIconTooltip: string): void {
            if (oCell != null) {
                if (oCell.MultiActuionIcon == null) {
                    oCell.MultiActuionIcon = new ChartIcon();
                    oCell.MultiActuionIcon.EnableOnHotSpotClick = false;
                    oCell.MultiActuionIcon.Key = "icoMultiProcessIcon" + oCell.ColIndex;
                    oCell.MultiActuionIcon.UriString = MedImage.GetPath(MedImages.InfMultiActionInfusionIcon);
                }
                if (oCell.MultiActuionIcon.Tooltip == null) {
                    oCell.MultiActuionIcon.Tooltip = "~";
                }
                else {
                    oCell.MultiActuionIcon.Tooltip = String.Equals(oCell.MultiActuionIcon.Tooltip.ToString(), "~") ? sIconTooltip : (oCell.MultiActuionIcon.Tooltip.ToString() + "~" + sIconTooltip);
                }
            }
        }
        private PlotAdminCommentsIcon(oCell: InfusionChartCell, sAdminComments: string, sEventName: string): void {
            if (oCell != null && !String.IsNullOrEmpty(sAdminComments) && !String.IsNullOrEmpty(sEventName)) {
                if (oCell.AdministrationIcon == null) {
                    oCell.AdministrationIcon = Common.GetAdminCommentsIcon(sEventName + " - " + sAdminComments);
                }
                else {
                    let sToolTip: string = String.Empty;
                    if (typeof oCell.AdministrationIcon.Tooltip === "string") {
                        sToolTip = ObjectHelper.CreateType<string>(oCell.AdministrationIcon.Tooltip, String);
                    }
                    else if (oCell.AdministrationIcon.Tooltip instanceof iLabel) {
                        let objLabel: iLabel = ObjectHelper.CreateType<iLabel>(oCell.AdministrationIcon.Tooltip, iLabel);
                        sToolTip = objLabel.Text;
                    }
                    if (!String.IsNullOrEmpty(sToolTip)) {
                        if (String.Equals(sEventName, Resource.InfusionChart.BegunActionText_tooltip)) {
                            oCell.AdministrationIcon.Tooltip = ObjectHelper.CreateObject(new iLabel(), { Text: sToolTip + Environment.NewLine + sEventName + " - " + sAdminComments, IsWordwrap: true, Width: 200 });
                        }
                        else {
                            oCell.AdministrationIcon.Tooltip = ObjectHelper.CreateObject(new iLabel(), { Text: sEventName + " - " + sAdminComments + Environment.NewLine + sToolTip, IsWordwrap: true, Width: 200 });
                        }
                    }
                }
            }
        }
        private GetIconForChartLine(oCell: InfusionChartCell, oInfIconType: enmInfusionIcon, oSlotDetail: SlotDetail, oCurrentInfAdminDetail: InfusionAdminDetail, oRow: InfusionChartRow): CIcon {
            let isAutoWidthRequired: boolean = false;
            let isAdminCommentExist: boolean = false;
            if (oSlotDetail.AdministrationDetail != null) {
                if (oSlotDetail.AdministrationDetail.oInfusionAdminDetail != null && oSlotDetail.AdministrationDetail.oInfusionAdminDetail.Count > 0) {
                    let oInfusionAdminDetailFiltered = oSlotDetail.AdministrationDetail.oInfusionAdminDetail.Where(oItem => !String.IsNullOrEmpty(oItem.infusionComments));
                    if (oInfusionAdminDetailFiltered != null && oInfusionAdminDetailFiltered.Count() > 0)
                        isAdminCommentExist = true;
                }
                if (!isAdminCommentExist && !String.IsNullOrEmpty(oSlotDetail.AdministrationDetail.AdminComments))
                    isAdminCommentExist = true;
            }
            let sEventAction: string = String.Empty;
            let oIcon: CIcon = new CIcon();
            switch (oInfIconType) {
                case enmInfusionIcon.Planned:
                    oIcon.UriString = MedImage.GetPath(MedImages.PlannedInfusionIcon);
                    isAutoWidthRequired = true;
                    break;
                case enmInfusionIcon.NotKnown:
                    oIcon.UriString = MedImage.GetPath(MedImages.InfNotKnownIcon);
                    sEventAction = Resource.MedsAdminChartToolTip.NotKnownToolTip;
                    break;
                case enmInfusionIcon.Deferred:
                    oIcon.UriString = MedImage.GetPath(MedImages.DeferredInfusionIcon);
                    sEventAction = Resource.InfusionChart.DeferActionText_tooltip;
                    break;
                case enmInfusionIcon.NotGiven:
                    oIcon.UriString = MedImage.GetPath(MedImages.NotGivenInfusionIcon);
                    sEventAction = Resource.InfusionChart.NotgivenActionText_tooltip;
                    break;
                case enmInfusionIcon.Given:
                    oIcon.UriString = MedImage.GetPath(MedImages.CompletedInfusionIcon);
                    sEventAction = Resource.InfusionChart.CompleteActionText_tooltip;
                    break;
                case enmInfusionIcon.NotYetRecorded:
                case enmInfusionIcon.OverDue:
                case enmInfusionIcon.DueNow:
                    oIcon.UriString = MedImage.GetPath(MedImages.PlannedInfusionIcon);
                    isAutoWidthRequired = true;
                    break;
                case enmInfusionIcon.Begun:
                    oIcon.UriString = MedImage.GetPath(MedImages.BegunInfusionIcon);
                    sEventAction = Resource.InfusionChart.BegunActionText_tooltip;
                    break;
                case enmInfusionIcon.Pause:
                    oIcon.UriString = MedImage.GetPath(MedImages.PauseInfusionIcon);
                    sEventAction = Resource.InfusionChart.PauseActionText_tooltip;
                    break;
                case enmInfusionIcon.Resume:
                    oIcon.UriString = MedImage.GetPath(MedImages.ResumeInfusionIcon);
                    sEventAction = Resource.InfusionChart.ResumeActionText_tooltip;
                    break;
                case enmInfusionIcon.Complete:
                    oIcon.UriString = MedImage.GetPath(MedImages.CompletedInfusionIcon);
                    sEventAction = Resource.InfusionChart.CompleteActionText_tooltip;
                    break;
                case enmInfusionIcon.ChangeBag:
                    oIcon.UriString = MedImage.GetPath(MedImages.ChangeBagInfusionIcon);
                    sEventAction = Resource.InfusionChart.ChangeBagActionText_tooltip;
                    oIcon.IsImageInvisible = true;
                    break;
                case enmInfusionIcon.ChangeFlowRate:
                    oIcon.UriString = MedImage.GetPath(MedImages.ChangeFlowRateInfusionIcon);
                    sEventAction = Resource.InfusionChart.ChangeFlowRateActionText_tooltip;
                    oIcon.IsImageInvisible = true;
                    break;
                case enmInfusionIcon.Stopped:
                    oIcon.UriString = MedImage.GetPath(MedImages.StopInfusionIcon);
                    sEventAction = Resource.InfusionChart.StopActionText_tooltip;
                    break;
                case enmInfusionIcon.EstimatedStop:
                    oIcon.UriString = MedImage.GetPath(MedImages.EstimatedStopInfusionIcon);
                    isAutoWidthRequired = true;
                    break;
                case enmInfusionIcon.Homeleave:
                    oIcon.UriString = MedImage.GetPath(MedImages.HomeLeaveIcon);
                    isAutoWidthRequired = true;
                    break;
                case enmInfusionIcon.Omitted:
                    oIcon.UriString = MedImage.GetPath(MedImages.InfChartOmittedIcon);
                    sEventAction = Resource.InfusionChart.OmitActionText_tooltip;
                    break;
            }
            let sLastAdminComment: string = String.Empty;
            let sIconToolTip: string = this.GetTooltipForAdminAction(oInfIconType, oSlotDetail, oCurrentInfAdminDetail, oRow, (o) => { sLastAdminComment = o; });
            if (isAutoWidthRequired)
                oIcon.IconToolTip = ObjectHelper.CreateObject(new iLabel(), { Text: sIconToolTip });
            else oIcon.IconToolTip = ObjectHelper.CreateObject(new iLabel(), { Text: sIconToolTip, IsWordwrap: true, Width: 200 });
            if (!String.IsNullOrEmpty(sEventAction) && isAdminCommentExist && !String.IsNullOrEmpty(sLastAdminComment))
                this.PlotAdminCommentsIcon(oCell, sLastAdminComment, sEventAction);
            this.PlotMultiActionIcon(oCell, sIconToolTip);
            return oIcon;
        }
        private GetTooltipForAdminAction(oInfIconType: enmInfusionIcon,  oSlotDetail: SlotDetail,  oCurrentInfAdminDetail: InfusionAdminDetail,  oRow: InfusionChartRow, out1: (sLastAdminComment: string) => void): string {
            let sLastAdminComment: string;

                        sLastAdminComment = String.Empty;
                        let sToolTip: string = String.Empty;
                        let BegunInfusionAction = new InfusionAdminDetail();
                        let IsGas: boolean = false;
                        let InfVol: number = 0;
                        let IsPRN: boolean = false;
                        let oDrugDet: TagDrugHeaderDetail = ObjectHelper.CreateType<TagDrugHeaderDetail>(oRow.DrugItem.Tag, TagDrugHeaderDetail);
                        if (oDrugDet != null && !String.IsNullOrEmpty(oDrugDet.ItemSubType) && String.Compare(oDrugDet.ItemSubType, InfusionTypesCode.SUBTYPE_GAS) == 0)
                            IsGas = true;
                        if (oDrugDet != null && oDrugDet.IsPRN)
                            IsPRN = true;
                        if (oSlotDetail.AdministrationDetail != null && oSlotDetail.AdministrationDetail.oInfusionAdminDetail != null && oSlotDetail.AdministrationDetail.oInfusionAdminDetail.Count > 0) {
                            if (IsGas) {
                                BegunInfusionAction = oSlotDetail.AdministrationDetail.oInfusionAdminDetail.Where(c => c.ActionCode == MedicationAction.BEGUN).Select(s => s).FirstOrDefault();
                                if (BegunInfusionAction != null)
                                    oSlotDetail.AdministrationDetail.FirstBagBegunAt = BegunInfusionAction.ActionStartDate;
                                oSlotDetail.AdministrationDetail.LastBagEndedAt = oSlotDetail.AdministrationDetail.oInfusionAdminDetail.Where(c => c.ActionCode == MedicationAction.STOP || c.ActionCode == MedicationAction.COMPLETE).Select(m => m.ActionStartDate).FirstOrDefault();
                            }
                            else {
                                BegunInfusionAction = oSlotDetail.AdministrationDetail.oInfusionAdminDetail.Where(c => c.ActionCode == MedicationAction.BEGUN && c.oInfusionBagDetail != null && c.oInfusionBagDetail.BagSequence == 1).Select(s => s).FirstOrDefault();
                                if (BegunInfusionAction != null)
                                    oSlotDetail.AdministrationDetail.FirstBagBegunAt = BegunInfusionAction.ActionStartDate;
                                oSlotDetail.AdministrationDetail.LastBagEndedAt = oSlotDetail.AdministrationDetail.oInfusionAdminDetail.Where(c => c.ActionCode == MedicationAction.STOP || c.ActionCode == MedicationAction.COMPLETE).Select(m => m.ActionStartDate).FirstOrDefault();
                            }
                        }
                        if (BegunInfusionAction != null) {
                          let parValue: number = 0;
                          let bparValue: number = 0;
                          // Divya.
                          if (!String.IsNullOrEmpty(BegunInfusionAction.InfusionRate) && BegunInfusionAction.InfusionRate.toString().IndexOf(".") != -1) {
                              if (Double.TryParse(BegunInfusionAction.InfusionRate, (o) => (parValue = o)) && parValue != 0 && (parValue % 1) == 0) {
                                  BegunInfusionAction.InfusionRate = Convert.ToString(parValue);
                              }
                          }
                          // Divya.
                          if (BegunInfusionAction.oInfusionBagDetail != null && !String.IsNullOrEmpty(BegunInfusionAction.oInfusionBagDetail.BagVolume) && BegunInfusionAction.oInfusionBagDetail.BagVolume.toString().IndexOf(".") != -1) {
                              if (Double.TryParse(BegunInfusionAction.oInfusionBagDetail.BagVolume, (o) => (bparValue = o)) && bparValue != 0 && (bparValue % 1) == 0) {
                                  BegunInfusionAction.oInfusionBagDetail.BagVolume = Convert.ToString(bparValue);
                              }
                          }
                      }
                      if (oSlotDetail.AdministrationDetail != null && !String.IsNullOrEmpty(oSlotDetail.AdministrationDetail.TotalVolumeInfused)) {
                          Number.TryParse(oSlotDetail.AdministrationDetail.TotalVolumeInfused, (o) => (InfVol = o));
                      }
                        switch (oInfIconType) {
                            case enmInfusionIcon.Planned:
                                sToolTip = String.Format(Resource.InfusionChart.Planned_tooltip, this.SetToolTip(oSlotDetail.ScheduledDTTM));
                                break;
                            case enmInfusionIcon.Deferred:
                                sToolTip = String.Format(Resource.InfusionChart.Deferred_tooltip, this.SetToolTip(oSlotDetail.AdministrationDetail.AdministeredDate), this.SetToolTip(oSlotDetail.AdministrationDetail.RecordedBy),
                                    this.SetToolTip(this.GetReasonTextByAction(oSlotDetail.AdministrationDetail.AdminReasonCode, oSlotDetail.AdministrationDetail))).Replace("\\r\\n", Environment.NewLine);
                                if (oSlotDetail.AdministrationDetail != null && !String.IsNullOrEmpty(oSlotDetail.AdministrationDetail.AdminComments)) {
                                    sToolTip = sToolTip + Environment.NewLine + MedsAdminChartToolTip.CommentsToolTip + ": " + oSlotDetail.AdministrationDetail.AdminComments;
                                    sLastAdminComment = oSlotDetail.AdministrationDetail.AdminComments;
                                }
                                break;
                            case enmInfusionIcon.NotGiven:
                                if (oSlotDetail.AdministrationDetail.IsDuringHomeLeave) {
                                    sToolTip = String.Format(Resource.InfusionChart.Notgiven_tooltip, this.SetToolTip(Resource.MedsAdminChartToolTip.DuringHomeLeaveTooltip), this.SetToolTip(this.GetReasonTextByAction(oSlotDetail.AdministrationDetail.AdminReasonCode, oSlotDetail.AdministrationDetail)),
                                    this.SetToolTip(oSlotDetail.ScheduledDTTM), this.SetToolTip(oSlotDetail.AdministrationDetail.RecordedAt), this.SetToolTip(oSlotDetail.AdministrationDetail.RecordedBy)).Replace("\\r\\n", Environment.NewLine);
                                }
                                else {
                                    sToolTip = String.Format(Resource.InfusionChart.Notgiven_tooltip, this.SetToolTip(String.Empty), this.SetToolTip(this.GetReasonTextByAction(oSlotDetail.AdministrationDetail.AdminReasonCode, oSlotDetail.AdministrationDetail)),
                                        this.SetToolTip(oSlotDetail.ScheduledDTTM), this.SetToolTip(oSlotDetail.AdministrationDetail.RecordedAt), this.SetToolTip(oSlotDetail.AdministrationDetail.RecordedBy)).Replace("\\r\\n", Environment.NewLine);
                                }
                                if (oSlotDetail.AdministrationDetail != null && !String.IsNullOrEmpty(oSlotDetail.AdministrationDetail.AdminComments)) {
                                    sToolTip = sToolTip + Environment.NewLine + MedsAdminChartToolTip.CommentsToolTip + ": " + oSlotDetail.AdministrationDetail.AdminComments;
                                    sLastAdminComment = oSlotDetail.AdministrationDetail.AdminComments;
                                }
                                break;
                            case enmInfusionIcon.DueNow:
                                sToolTip = String.Format(Resource.InfusionChart.Duenow_tooltip, this.SetToolTip(oSlotDetail.ScheduledDTTM));
                                break;
                            case enmInfusionIcon.OverDue:
                                sToolTip = String.Format(Resource.InfusionChart.Overdue_tooltip, this.SetToolTip(oSlotDetail.ScheduledDTTM));
                                break;
                            case enmInfusionIcon.NotYetRecorded:
                                sToolTip = String.Format(Resource.InfusionChart.NotYetRecorded_tooltip, this.SetToolTip(oSlotDetail.ScheduledDTTM));
                                break;
                            case enmInfusionIcon.NotKnown:
                                sToolTip = String.Format(Resource.InfusionChart.NotKnownToolTip, this.SetToolTip(oSlotDetail.ScheduledDTTM), this.SetToolTip(oSlotDetail.AdministrationDetail.RecordedAt), this.SetToolTip(oSlotDetail.AdministrationDetail.RecordedBy)).Replace("\\r\\n", Environment.NewLine);
                                if (oSlotDetail.AdministrationDetail != null && !String.IsNullOrEmpty(oSlotDetail.AdministrationDetail.AdminComments)) {
                                    sToolTip = sToolTip + Environment.NewLine + MedsAdminChartToolTip.CommentsToolTip + ": " + oSlotDetail.AdministrationDetail.AdminComments;
                                    sLastAdminComment = oSlotDetail.AdministrationDetail.AdminComments;
                                }
                                break;
                            case enmInfusionIcon.EstimatedStop:
                                sToolTip = String.Format(Resource.InfusionChart.Estimatedstoptime_tooltip, this.SetToolTip(oSlotDetail.AdministrationDetail.InfusionEndDate));
                                break;
                            case enmInfusionIcon.Homeleave:
                                sToolTip = Resource.MedsAdminChartToolTip.HomeLeaveToolTip;
                                break;
                            case enmInfusionIcon.Begun:
                                if (BegunInfusionAction != null) {
                                    if (IsGas) {
                                        if (IsPRN) {
                                            if (oSlotDetail.AdministrationDetail.IsDuringHomeLeave) {
                                                sToolTip = String.Format(Resource.InfusionChart.MedGasBegunPRN_tooltip, this.SetToolTip(Resource.MedsAdminChartToolTip.DuringHomeLeaveTooltip), this.SetToolTip(BegunInfusionAction.ActionStartDate),
                                                    ((!String.IsNullOrEmpty(BegunInfusionAction.InfusionRate) && BegunInfusionAction.InfusionRateUOM != null && !String.IsNullOrEmpty(BegunInfusionAction.InfusionRateUOM.UOMName) && BegunInfusionAction.InfusionRatePerUOM != null && !String.IsNullOrEmpty(BegunInfusionAction.InfusionRatePerUOM.UOMName)) ? this.SetToolTip(BegunInfusionAction.InfusionRate) + " " + this.SetToolTip(BegunInfusionAction.InfusionRateUOM.UOMName) + "/" + this.SetToolTip(BegunInfusionAction.InfusionRatePerUOM.UOMName) : String.Empty),
                                                    this.SetToolTip(oSlotDetail.AdministrationDetail.AdministeredBy), this.SetToolTip(BegunInfusionAction.RecordedAt), this.SetToolTip(BegunInfusionAction.RecordedBy)).Replace("\\r\\n", Environment.NewLine);
                                            }
                                            else {
                                                sToolTip = String.Format(Resource.InfusionChart.MedGasBegunPRN_tooltip, this.SetToolTip(String.Empty), this.SetToolTip(BegunInfusionAction.ActionStartDate),
                                                    ((!String.IsNullOrEmpty(BegunInfusionAction.InfusionRate) && BegunInfusionAction.InfusionRateUOM != null && !String.IsNullOrEmpty(BegunInfusionAction.InfusionRateUOM.UOMName) && BegunInfusionAction.InfusionRatePerUOM != null && !String.IsNullOrEmpty(BegunInfusionAction.InfusionRatePerUOM.UOMName)) ? this.SetToolTip(BegunInfusionAction.InfusionRate) + " " + this.SetToolTip(BegunInfusionAction.InfusionRateUOM.UOMName) + "/" + this.SetToolTip(BegunInfusionAction.InfusionRatePerUOM.UOMName) : String.Empty),
                                                    this.SetToolTip(oSlotDetail.AdministrationDetail.AdministeredBy), this.SetToolTip(BegunInfusionAction.RecordedAt), this.SetToolTip(BegunInfusionAction.RecordedBy)).Replace("\\r\\n", Environment.NewLine);
                                            }
                                        }
                                        else {
                                            if (oSlotDetail.AdministrationDetail.IsDuringHomeLeave) {
                                                sToolTip = String.Format(Resource.InfusionChart.MedGasBegun_tooltip, this.SetToolTip(Resource.MedsAdminChartToolTip.DuringHomeLeaveTooltip), this.SetToolTip(oSlotDetail.ScheduledDTTM), this.SetToolTip(BegunInfusionAction.ActionStartDate),
                                                    ((!String.IsNullOrEmpty(BegunInfusionAction.InfusionRate) && BegunInfusionAction.InfusionRateUOM != null && !String.IsNullOrEmpty(BegunInfusionAction.InfusionRateUOM.UOMName) && BegunInfusionAction.InfusionRatePerUOM != null && !String.IsNullOrEmpty(BegunInfusionAction.InfusionRatePerUOM.UOMName)) ? this.SetToolTip(BegunInfusionAction.InfusionRate) + " " + this.SetToolTip(BegunInfusionAction.InfusionRateUOM.UOMName) + "/" + this.SetToolTip(BegunInfusionAction.InfusionRatePerUOM.UOMName) : String.Empty),
                                                    this.SetToolTip(oSlotDetail.AdministrationDetail.AdministeredBy), this.SetToolTip(BegunInfusionAction.RecordedAt), this.SetToolTip(BegunInfusionAction.RecordedBy)).Replace("\\r\\n", Environment.NewLine);
                                            }
                                            else {
                                                sToolTip = String.Format(Resource.InfusionChart.MedGasBegun_tooltip, this.SetToolTip(String.Empty), this.SetToolTip(oSlotDetail.ScheduledDTTM), this.SetToolTip(BegunInfusionAction.ActionStartDate),
                                                    ((!String.IsNullOrEmpty(BegunInfusionAction.InfusionRate) && BegunInfusionAction.InfusionRateUOM != null && !String.IsNullOrEmpty(BegunInfusionAction.InfusionRateUOM.UOMName) && BegunInfusionAction.InfusionRatePerUOM != null && !String.IsNullOrEmpty(BegunInfusionAction.InfusionRatePerUOM.UOMName)) ? this.SetToolTip(BegunInfusionAction.InfusionRate) + " " + this.SetToolTip(BegunInfusionAction.InfusionRateUOM.UOMName) + "/" + this.SetToolTip(BegunInfusionAction.InfusionRatePerUOM.UOMName) : String.Empty),
                                                    this.SetToolTip(oSlotDetail.AdministrationDetail.AdministeredBy), this.SetToolTip(BegunInfusionAction.RecordedAt), this.SetToolTip(BegunInfusionAction.RecordedBy)).Replace("\\r\\n", Environment.NewLine);
                                            }
                                        }
                                    }
                                    else if (oDrugDet != null && String.Equals(oDrugDet.INFTYCODE, InfusionTypesCode.PCA) && ProfileData.InfusionPresConfig != null && !ProfileData.InfusionPresConfig.IsInfusionRatePCA) {
                                        if (oSlotDetail.AdministrationDetail.IsDuringHomeLeave) {
                                            sToolTip = String.Format(Resource.InfusionChart.InfRateSwitchOffPCABegun_tooltip, this.SetToolTip(Resource.MedsAdminChartToolTip.DuringHomeLeaveTooltip), this.SetToolTip(oSlotDetail.ScheduledDTTM), this.SetToolTip(BegunInfusionAction.ActionStartDate),
                                                ((BegunInfusionAction.oInfusionBagDetail != null && !String.IsNullOrEmpty(BegunInfusionAction.oInfusionBagDetail.BagVolume) && BegunInfusionAction.oInfusionBagDetail.BagVolumeUOM != null && !String.IsNullOrEmpty(BegunInfusionAction.oInfusionBagDetail.BagVolumeUOM.UOMName)) ? (this.SetToolTip(BegunInfusionAction.oInfusionBagDetail.BagVolume) + " " + this.SetToolTip(BegunInfusionAction.oInfusionBagDetail.BagVolumeUOM.UOMName)) : String.Empty),
                                                ((!String.IsNullOrEmpty(BegunInfusionAction.DripRate) && BegunInfusionAction.DripRateUOM != null && !String.IsNullOrEmpty(BegunInfusionAction.DripRateUOM.UOMName) && BegunInfusionAction.DripRatePerUOM != null && !String.IsNullOrEmpty(BegunInfusionAction.DripRatePerUOM.UOMName)) ? this.SetToolTip(BegunInfusionAction.DripRate) + " " + this.SetToolTip(BegunInfusionAction.DripRateUOM.UOMName) + "/" + this.SetToolTip(BegunInfusionAction.DripRatePerUOM.UOMName) : String.Empty),
                                                this.SetToolTip(oSlotDetail.AdministrationDetail.AdministeredBy), this.SetToolTip(BegunInfusionAction.RecordedAt), this.SetToolTip(BegunInfusionAction.RecordedBy)).Replace("\\r\\n", Environment.NewLine);
                                        }
                                        else {
                                            sToolTip = String.Format(Resource.InfusionChart.InfRateSwitchOffPCABegun_tooltip, this.SetToolTip(String.Empty), this.SetToolTip(oSlotDetail.ScheduledDTTM), this.SetToolTip(BegunInfusionAction.ActionStartDate),
                                                ((BegunInfusionAction.oInfusionBagDetail != null && !String.IsNullOrEmpty(BegunInfusionAction.oInfusionBagDetail.BagVolume) && BegunInfusionAction.oInfusionBagDetail.BagVolumeUOM != null && !String.IsNullOrEmpty(BegunInfusionAction.oInfusionBagDetail.BagVolumeUOM.UOMName)) ? (this.SetToolTip(BegunInfusionAction.oInfusionBagDetail.BagVolume) + " " + this.SetToolTip(BegunInfusionAction.oInfusionBagDetail.BagVolumeUOM.UOMName)) : String.Empty),
                                                ((!String.IsNullOrEmpty(BegunInfusionAction.DripRate) && BegunInfusionAction.DripRateUOM != null && !String.IsNullOrEmpty(BegunInfusionAction.DripRateUOM.UOMName) && BegunInfusionAction.DripRatePerUOM != null && !String.IsNullOrEmpty(BegunInfusionAction.DripRatePerUOM.UOMName)) ? this.SetToolTip(BegunInfusionAction.DripRate) + " " + this.SetToolTip(BegunInfusionAction.DripRateUOM.UOMName) + "/" + this.SetToolTip(BegunInfusionAction.DripRatePerUOM.UOMName) : String.Empty),
                                                this.SetToolTip(oSlotDetail.AdministrationDetail.AdministeredBy), this.SetToolTip(BegunInfusionAction.RecordedAt), this.SetToolTip(BegunInfusionAction.RecordedBy)).Replace("\\r\\n", Environment.NewLine);
                                        }
                                    }
                                    else {
                                        if (oSlotDetail.AdministrationDetail.IsDuringHomeLeave) {
                                            sToolTip = String.Format(Resource.InfusionChart.Begun_tooltip, this.SetToolTip(Resource.MedsAdminChartToolTip.DuringHomeLeaveTooltip), this.SetToolTip(oSlotDetail.ScheduledDTTM), this.SetToolTip(BegunInfusionAction.ActionStartDate),
                                                ((BegunInfusionAction.oInfusionBagDetail != null && !String.IsNullOrEmpty(BegunInfusionAction.oInfusionBagDetail.BagVolume) && BegunInfusionAction.oInfusionBagDetail.BagVolumeUOM != null && !String.IsNullOrEmpty(BegunInfusionAction.oInfusionBagDetail.BagVolumeUOM.UOMName)) ? (this.SetToolTip(BegunInfusionAction.oInfusionBagDetail.BagVolume) + " " + this.SetToolTip(BegunInfusionAction.oInfusionBagDetail.BagVolumeUOM.UOMName)) : String.Empty),
                                                ((!String.IsNullOrEmpty(BegunInfusionAction.InfusionRate) && BegunInfusionAction.InfusionRateUOM != null && !String.IsNullOrEmpty(BegunInfusionAction.InfusionRateUOM.UOMName) && BegunInfusionAction.InfusionRatePerUOM != null && !String.IsNullOrEmpty(BegunInfusionAction.InfusionRatePerUOM.UOMName)) ? this.SetToolTip(BegunInfusionAction.InfusionRate) + " " + this.SetToolTip(BegunInfusionAction.InfusionRateUOM.UOMName) + "/" + this.SetToolTip(BegunInfusionAction.InfusionRatePerUOM.UOMName) : String.Empty),
                                                ((!String.IsNullOrEmpty(BegunInfusionAction.DripRate) && BegunInfusionAction.DripRateUOM != null && !String.IsNullOrEmpty(BegunInfusionAction.DripRateUOM.UOMName) && BegunInfusionAction.DripRatePerUOM != null && !String.IsNullOrEmpty(BegunInfusionAction.DripRatePerUOM.UOMName)) ? this.SetToolTip(BegunInfusionAction.DripRate) + " " + this.SetToolTip(BegunInfusionAction.DripRateUOM.UOMName) + "/" + this.SetToolTip(BegunInfusionAction.DripRatePerUOM.UOMName) : String.Empty),
                                                this.SetToolTip(oSlotDetail.AdministrationDetail.AdministeredBy), this.SetToolTip(BegunInfusionAction.RecordedAt), this.SetToolTip(BegunInfusionAction.RecordedBy)).Replace("\\r\\n", Environment.NewLine);
                                        }
                                        else {
                                            sToolTip = String.Format(Resource.InfusionChart.Begun_tooltip, this.SetToolTip(String.Empty), this.SetToolTip(oSlotDetail.ScheduledDTTM), this.SetToolTip(BegunInfusionAction.ActionStartDate),
                                                ((BegunInfusionAction.oInfusionBagDetail != null && !String.IsNullOrEmpty(BegunInfusionAction.oInfusionBagDetail.BagVolume) && BegunInfusionAction.oInfusionBagDetail.BagVolumeUOM != null && !String.IsNullOrEmpty(BegunInfusionAction.oInfusionBagDetail.BagVolumeUOM.UOMName)) ? (this.SetToolTip(BegunInfusionAction.oInfusionBagDetail.BagVolume) + " " + this.SetToolTip(BegunInfusionAction.oInfusionBagDetail.BagVolumeUOM.UOMName)) : String.Empty),
                                                ((!String.IsNullOrEmpty(BegunInfusionAction.InfusionRate) && BegunInfusionAction.InfusionRateUOM != null && !String.IsNullOrEmpty(BegunInfusionAction.InfusionRateUOM.UOMName) && BegunInfusionAction.InfusionRatePerUOM != null && !String.IsNullOrEmpty(BegunInfusionAction.InfusionRatePerUOM.UOMName)) ? this.SetToolTip(BegunInfusionAction.InfusionRate) + " " + this.SetToolTip(BegunInfusionAction.InfusionRateUOM.UOMName) + "/" + this.SetToolTip(BegunInfusionAction.InfusionRatePerUOM.UOMName) : String.Empty),
                                                ((!String.IsNullOrEmpty(BegunInfusionAction.DripRate) && BegunInfusionAction.DripRateUOM != null && !String.IsNullOrEmpty(BegunInfusionAction.DripRateUOM.UOMName) && BegunInfusionAction.DripRatePerUOM != null && !String.IsNullOrEmpty(BegunInfusionAction.DripRatePerUOM.UOMName)) ? this.SetToolTip(BegunInfusionAction.DripRate) + " " + this.SetToolTip(BegunInfusionAction.DripRateUOM.UOMName) + "/" + this.SetToolTip(BegunInfusionAction.DripRatePerUOM.UOMName) : String.Empty),
                                                this.SetToolTip(oSlotDetail.AdministrationDetail.AdministeredBy), this.SetToolTip(BegunInfusionAction.RecordedAt), this.SetToolTip(BegunInfusionAction.RecordedBy)).Replace("\\r\\n", Environment.NewLine);
                                        }
                                    }
                                    if (!String.IsNullOrEmpty(BegunInfusionAction.infusionComments)) {
                                        sToolTip = sToolTip + Environment.NewLine + MedsAdminChartToolTip.CommentsToolTip + ": " + BegunInfusionAction.infusionComments;
                                        sLastAdminComment = BegunInfusionAction.infusionComments;
                                    }
                                }
                                break;
                            case enmInfusionIcon.Resume:
                                if (oSlotDetail.AdministrationDetail.IsDuringHomeLeave) {
                                    sToolTip = String.Format(Resource.InfusionChart.Resume_tooltip, this.SetToolTip(Resource.MedsAdminChartToolTip.DuringHomeLeaveTooltip), this.SetToolTip(oSlotDetail.AdministrationDetail.FirstBagBegunAt),
                                        this.SetToolTip(oSlotDetail.AdministrationDetail.oInfusionAdminDetail.Where(c => c.ActionStartDate <= oCurrentInfAdminDetail.ActionStartDate && c.ActionCode == MedicationAction.PAUSE).Select(s => s.ActionStartDate).LastOrDefault()),
                                        this.SetToolTip(oCurrentInfAdminDetail.ActionStartDate), this.SetToolTip(oCurrentInfAdminDetail.RecordedAt),
                                        this.SetToolTip(oCurrentInfAdminDetail.RecordedBy)).Replace("\\r\\n", Environment.NewLine);
                                }
                                else {
                                    sToolTip = String.Format(Resource.InfusionChart.Resume_tooltip, this.SetToolTip(String.Empty), this.SetToolTip(oSlotDetail.AdministrationDetail.FirstBagBegunAt),
                                        this.SetToolTip(oSlotDetail.AdministrationDetail.oInfusionAdminDetail.Where(c => c.ActionStartDate <= oCurrentInfAdminDetail.ActionStartDate && c.ActionCode == MedicationAction.PAUSE).Select(s => s.ActionStartDate).LastOrDefault()),
                                        this.SetToolTip(oCurrentInfAdminDetail.ActionStartDate), this.SetToolTip(oCurrentInfAdminDetail.RecordedAt),
                                        this.SetToolTip(oCurrentInfAdminDetail.RecordedBy)).Replace("\\r\\n", Environment.NewLine);
                                }
                                if (!String.IsNullOrEmpty(oCurrentInfAdminDetail.infusionComments)) {
                                    sToolTip = sToolTip + Environment.NewLine + MedsAdminChartToolTip.CommentsToolTip + ": " + oCurrentInfAdminDetail.infusionComments;
                                    sLastAdminComment = oCurrentInfAdminDetail.infusionComments;
                                }
                                break;
                            case enmInfusionIcon.Pause:
                                if (oSlotDetail.AdministrationDetail.IsDuringHomeLeave) {
                                    sToolTip = String.Format(Resource.InfusionChart.Paused_tooltip, this.SetToolTip(Resource.MedsAdminChartToolTip.DuringHomeLeaveTooltip), this.SetToolTip(CommonBB.GetText(this.GetReasonCodeByAction(oSlotDetail.AdministrationDetail, MedicationAction.PAUSE, oCurrentInfAdminDetail), ValueDomainValues.oRecordAdminReasons)),
                                        this.SetToolTip(oSlotDetail.AdministrationDetail.FirstBagBegunAt), this.SetToolTip(oCurrentInfAdminDetail.ActionStartDate),
                                        this.SetToolTip(oCurrentInfAdminDetail.RecordedAt), this.SetToolTip(oCurrentInfAdminDetail.RecordedBy)).Replace("\\r\\n", Environment.NewLine);
                                }
                                else {
                                    sToolTip = String.Format(Resource.InfusionChart.Paused_tooltip, this.SetToolTip(String.Empty), this.SetToolTip(CommonBB.GetText(this.GetReasonCodeByAction(oSlotDetail.AdministrationDetail, MedicationAction.PAUSE, oCurrentInfAdminDetail), ValueDomainValues.oRecordAdminReasons)),
                                        this.SetToolTip(oSlotDetail.AdministrationDetail.FirstBagBegunAt), this.SetToolTip(oCurrentInfAdminDetail.ActionStartDate),
                                        this.SetToolTip(oCurrentInfAdminDetail.RecordedAt), this.SetToolTip(oCurrentInfAdminDetail.RecordedBy)).Replace("\\r\\n", Environment.NewLine);
                                }
                                if (!String.IsNullOrEmpty(oCurrentInfAdminDetail.infusionComments)) {
                                    sToolTip = sToolTip + Environment.NewLine + MedsAdminChartToolTip.CommentsToolTip + ": " + oCurrentInfAdminDetail.infusionComments;
                                    sLastAdminComment = oCurrentInfAdminDetail.infusionComments;
                                }
                                break;
                            case enmInfusionIcon.Stopped:
                                if (IsGas) {
                                    if (oSlotDetail.AdministrationDetail.IsDuringHomeLeave) {
                                        sToolTip = String.Format(Resource.InfusionChart.Stopped_tooltip_gas, this.SetToolTip(Resource.MedsAdminChartToolTip.DuringHomeLeaveTooltip), this.SetToolTip(CommonBB.GetText(this.GetReasonCodeByAction(oSlotDetail.AdministrationDetail, MedicationAction.STOP, oCurrentInfAdminDetail), ValueDomainValues.oRecordAdminReasons)),
                                            this.SetToolTip(oSlotDetail.ScheduledDTTM), this.SetToolTip(oSlotDetail.AdministrationDetail.FirstBagBegunAt),
                                            this.SetToolTip(oSlotDetail.AdministrationDetail.LastBagEndedAt),
                                            this.SetToolTip(oCurrentInfAdminDetail.RecordedAt), this.SetToolTip(oCurrentInfAdminDetail.RecordedBy)).Replace("\\r\\n", Environment.NewLine);
                                    }
                                    else {
                                        sToolTip = String.Format(Resource.InfusionChart.Stopped_tooltip_gas, this.SetToolTip(String.Empty), this.SetToolTip(CommonBB.GetText(this.GetReasonCodeByAction(oSlotDetail.AdministrationDetail, MedicationAction.STOP, oCurrentInfAdminDetail), ValueDomainValues.oRecordAdminReasons)),
                                            this.SetToolTip(oSlotDetail.ScheduledDTTM), this.SetToolTip(oSlotDetail.AdministrationDetail.FirstBagBegunAt),
                                            this.SetToolTip(oSlotDetail.AdministrationDetail.LastBagEndedAt),
                                            this.SetToolTip(oCurrentInfAdminDetail.RecordedAt), this.SetToolTip(oCurrentInfAdminDetail.RecordedBy)).Replace("\\r\\n", Environment.NewLine);
                                    }
                                }
                                else {
                                    if (InfVol > 0) {
                                        if (oSlotDetail.AdministrationDetail.IsDuringHomeLeave) {
                                            sToolTip = String.Format(Resource.InfusionChart.Stopped_Total_Vol_tooltip, this.SetToolTip(Resource.MedsAdminChartToolTip.DuringHomeLeaveTooltip), this.SetToolTip(CommonBB.GetText(this.GetReasonCodeByAction(oSlotDetail.AdministrationDetail, MedicationAction.STOP, oCurrentInfAdminDetail), ValueDomainValues.oRecordAdminReasons)),
                                                this.SetToolTip(oSlotDetail.ScheduledDTTM), this.SetToolTip(oSlotDetail.AdministrationDetail.FirstBagBegunAt),
                                                this.SetToolTip(oSlotDetail.AdministrationDetail.LastBagEndedAt),
                                                this.SetToolTip(String.Format("{0}", InfVol)) + " " + this.SetToolTip(oSlotDetail.AdministrationDetail.TotalVolumeInfusedUOMName),
                                                this.SetToolTip(oCurrentInfAdminDetail.RecordedAt), this.SetToolTip(oCurrentInfAdminDetail.RecordedBy)).Replace("\\r\\n", Environment.NewLine);
                                        }
                                        else {
                                            sToolTip = String.Format(Resource.InfusionChart.Stopped_Total_Vol_tooltip, this.SetToolTip(String.Empty), this.SetToolTip(CommonBB.GetText(this.GetReasonCodeByAction(oSlotDetail.AdministrationDetail, MedicationAction.STOP, oCurrentInfAdminDetail), ValueDomainValues.oRecordAdminReasons)),
                                                this.SetToolTip(oSlotDetail.ScheduledDTTM), this.SetToolTip(oSlotDetail.AdministrationDetail.FirstBagBegunAt),
                                                this.SetToolTip(oSlotDetail.AdministrationDetail.LastBagEndedAt),
                                                this.SetToolTip(String.Format("{0}", InfVol)) + " " + this.SetToolTip(oSlotDetail.AdministrationDetail.TotalVolumeInfusedUOMName),
                                                this.SetToolTip(oCurrentInfAdminDetail.RecordedAt), this.SetToolTip(oCurrentInfAdminDetail.RecordedBy)).Replace("\\r\\n", Environment.NewLine);
                                        }
                                    }
                                    else {
                                        if (oSlotDetail.AdministrationDetail.IsDuringHomeLeave) {
                                            sToolTip = String.Format(Resource.InfusionChart.Stopped_tooltip, this.SetToolTip(Resource.MedsAdminChartToolTip.DuringHomeLeaveTooltip), this.SetToolTip(CommonBB.GetText(this.GetReasonCodeByAction(oSlotDetail.AdministrationDetail, MedicationAction.STOP, oCurrentInfAdminDetail), ValueDomainValues.oRecordAdminReasons)),
                                                this.SetToolTip(oSlotDetail.ScheduledDTTM), this.SetToolTip(oSlotDetail.AdministrationDetail.FirstBagBegunAt),
                                                this.SetToolTip(oSlotDetail.AdministrationDetail.LastBagEndedAt),
                                                this.SetToolTip(oCurrentInfAdminDetail.RecordedAt), this.SetToolTip(oCurrentInfAdminDetail.RecordedBy)).Replace("\\r\\n", Environment.NewLine);
                                        }
                                        else {
                                            sToolTip = String.Format(Resource.InfusionChart.Stopped_tooltip, this.SetToolTip(String.Empty), this.SetToolTip(CommonBB.GetText(this.GetReasonCodeByAction(oSlotDetail.AdministrationDetail, MedicationAction.STOP, oCurrentInfAdminDetail), ValueDomainValues.oRecordAdminReasons)),
                                                this.SetToolTip(oSlotDetail.ScheduledDTTM), this.SetToolTip(oSlotDetail.AdministrationDetail.FirstBagBegunAt),
                                                this.SetToolTip(oSlotDetail.AdministrationDetail.LastBagEndedAt),
                                                this.SetToolTip(oCurrentInfAdminDetail.RecordedAt), this.SetToolTip(oCurrentInfAdminDetail.RecordedBy)).Replace("\\r\\n", Environment.NewLine);
                                        }
                                    }
                                }
                                if (!String.IsNullOrEmpty(oCurrentInfAdminDetail.infusionComments)) {
                                    sToolTip = sToolTip + Environment.NewLine + MedsAdminChartToolTip.CommentsToolTip + ": " + oCurrentInfAdminDetail.infusionComments;
                                    sLastAdminComment = oCurrentInfAdminDetail.infusionComments;
                                }
                                break;
                            case enmInfusionIcon.Complete:
                                if (BegunInfusionAction != null && BegunInfusionAction.oInfusionBagDetail != null && BegunInfusionAction.oInfusionBagDetail.BagVolumeUOM != null && BegunInfusionAction.InfusionRateUOM != null && BegunInfusionAction.DripRateUOM != null) {
                                    if (IsGas) {
                                        if (oSlotDetail.AdministrationDetail.IsDuringHomeLeave) {
                                            sToolTip = String.Format(Resource.InfusionChart.GasCompleted_ToolTip, this.SetToolTip(Resource.MedsAdminChartToolTip.DuringHomeLeaveTooltip), this.SetToolTip(oSlotDetail.ScheduledDTTM), this.SetToolTip(oSlotDetail.AdministrationDetail.FirstBagBegunAt),
                                                this.SetToolTip(oSlotDetail.AdministrationDetail.LastBagEndedAt),
                                                this.SetToolTip(oCurrentInfAdminDetail.RecordedAt), this.SetToolTip(oCurrentInfAdminDetail.RecordedBy)).Replace("\\r\\n", Environment.NewLine);
                                        }
                                        else {
                                            sToolTip = String.Format(Resource.InfusionChart.GasCompleted_ToolTip, this.SetToolTip(String.Empty), this.SetToolTip(oSlotDetail.ScheduledDTTM), this.SetToolTip(oSlotDetail.AdministrationDetail.FirstBagBegunAt),
                                                this.SetToolTip(oSlotDetail.AdministrationDetail.LastBagEndedAt),
                                                this.SetToolTip(oCurrentInfAdminDetail.RecordedAt), this.SetToolTip(oCurrentInfAdminDetail.RecordedBy)).Replace("\\r\\n", Environment.NewLine);
                                        }
                                    }
                                    else {
                                        if (InfVol > 0) {
                                            if (oSlotDetail.AdministrationDetail.IsDuringHomeLeave) {
                                                sToolTip = String.Format(Resource.InfusionChart.Completed_Total_Vol_tooltip, this.SetToolTip(Resource.MedsAdminChartToolTip.DuringHomeLeaveTooltip), this.SetToolTip(oSlotDetail.ScheduledDTTM), this.SetToolTip(oSlotDetail.AdministrationDetail.FirstBagBegunAt),
                                                    this.SetToolTip(oSlotDetail.AdministrationDetail.LastBagEndedAt),
                                                    (!String.IsNullOrEmpty(oSlotDetail.AdministrationDetail.Dose) ? this.SetToolTip(oSlotDetail.AdministrationDetail.Dose) + " " + this.SetToolTip(oSlotDetail.AdministrationDetail.DoseUOM) : String.Empty),
                                                    this.SetToolTip(String.Format("{0}", InfVol)) + " " + this.SetToolTip(oSlotDetail.AdministrationDetail.TotalVolumeInfusedUOMName),
                                                    this.SetToolTip(oCurrentInfAdminDetail.RecordedAt), this.SetToolTip(oCurrentInfAdminDetail.RecordedBy)).Replace("\\r\\n", Environment.NewLine);
                                            }
                                            else {
                                                sToolTip = String.Format(Resource.InfusionChart.Completed_Total_Vol_tooltip, this.SetToolTip(String.Empty), this.SetToolTip(oSlotDetail.ScheduledDTTM), this.SetToolTip(oSlotDetail.AdministrationDetail.FirstBagBegunAt),
                                                    this.SetToolTip(oSlotDetail.AdministrationDetail.LastBagEndedAt),
                                                    (!String.IsNullOrEmpty(oSlotDetail.AdministrationDetail.Dose) ? this.SetToolTip(oSlotDetail.AdministrationDetail.Dose) + " " + this.SetToolTip(oSlotDetail.AdministrationDetail.DoseUOM) : String.Empty),
                                                    this.SetToolTip(String.Format("{0}", InfVol)) + " " + this.SetToolTip(oSlotDetail.AdministrationDetail.TotalVolumeInfusedUOMName),
                                                    this.SetToolTip(oCurrentInfAdminDetail.RecordedAt), this.SetToolTip(oCurrentInfAdminDetail.RecordedBy)).Replace("\\r\\n", Environment.NewLine);
                                            }
                                        }
                                        else {
                                            if (oSlotDetail.AdministrationDetail.IsDuringHomeLeave) {
                                                sToolTip = String.Format(Resource.InfusionChart.Completed_tooltip, this.SetToolTip(Resource.MedsAdminChartToolTip.DuringHomeLeaveTooltip), this.SetToolTip(oSlotDetail.ScheduledDTTM), this.SetToolTip(oSlotDetail.AdministrationDetail.FirstBagBegunAt),
                                                    this.SetToolTip(oSlotDetail.AdministrationDetail.LastBagEndedAt),
                                                    (!String.IsNullOrEmpty(oSlotDetail.AdministrationDetail.Dose) ? this.SetToolTip(oSlotDetail.AdministrationDetail.Dose) + " " + this.SetToolTip(oSlotDetail.AdministrationDetail.DoseUOM) : String.Empty),
                                                    this.SetToolTip(oCurrentInfAdminDetail.RecordedAt), this.SetToolTip(oCurrentInfAdminDetail.RecordedBy)).Replace("\\r\\n", Environment.NewLine);
                                            }
                                            else {
                                                sToolTip = String.Format(Resource.InfusionChart.Completed_tooltip, this.SetToolTip(String.Empty), this.SetToolTip(oSlotDetail.ScheduledDTTM), this.SetToolTip(oSlotDetail.AdministrationDetail.FirstBagBegunAt),
                                                    this.SetToolTip(oSlotDetail.AdministrationDetail.LastBagEndedAt),
                                                    (!String.IsNullOrEmpty(oSlotDetail.AdministrationDetail.Dose) ? this.SetToolTip(oSlotDetail.AdministrationDetail.Dose) + " " + this.SetToolTip(oSlotDetail.AdministrationDetail.DoseUOM) : String.Empty),
                                                    this.SetToolTip(oCurrentInfAdminDetail.RecordedAt), this.SetToolTip(oCurrentInfAdminDetail.RecordedBy)).Replace("\\r\\n", Environment.NewLine);
                                            }
                                        }
                                        if ((String.IsNullOrEmpty(oSlotDetail.AdministrationDetail.Dose) || String.IsNullOrEmpty(oSlotDetail.AdministrationDetail.DoseUOM)) && sToolTip.IndexOf("Dose administered: \r\n") != -1) {
                                            sToolTip = sToolTip.Replace("Dose administered: \r\n", String.Empty);
                                        }
                                    }
                                    if (!String.IsNullOrEmpty(oCurrentInfAdminDetail.infusionComments)) {
                                        sToolTip = sToolTip + Environment.NewLine + MedsAdminChartToolTip.CommentsToolTip + ": " + oCurrentInfAdminDetail.infusionComments;
                                        sLastAdminComment = oCurrentInfAdminDetail.infusionComments;
                                    }
                                }
                                if (oDrugDet.IsPGD && oCurrentInfAdminDetail != null && oSlotDetail != null && oSlotDetail.AdministrationDetail != null) {
                                    let sDuringHomeLeave: string = (oSlotDetail.AdministrationDetail.IsDuringHomeLeave) ? Resource.MedsAdminChartToolTip.DuringHomeLeaveTooltip : String.Empty;
                                    sToolTip = String.Format(Resource.InfusionChart.CompletedPGD_Tooltip, sDuringHomeLeave,
                                        (!String.IsNullOrEmpty(oSlotDetail.AdministrationDetail.Dose) ? this.SetToolTip(oSlotDetail.AdministrationDetail.Dose) + " " + this.SetToolTip(oSlotDetail.AdministrationDetail.DoseUOM) : String.Empty),
                                        this.SetToolTip(!String.IsNullOrEmpty(oCurrentInfAdminDetail.InfusionRate) ? oCurrentInfAdminDetail.InfusionRate + " " + oCurrentInfAdminDetail.InfusionRateUOM.UOMName + "/" + oCurrentInfAdminDetail.InfusionRatePerUOM.UOMName : String.Empty),
                                        this.SetToolTip(oSlotDetail.ScheduledDTTM),
                                        this.SetToolTip(oSlotDetail.AdministrationDetail.AdministeredDate),
                                        this.SetToolTip(oSlotDetail.AdministrationDetail.AdministeredBy),
                                        this.SetToolTip(oCurrentInfAdminDetail.RecordedAt), this.SetToolTip(oCurrentInfAdminDetail.RecordedBy)).Replace("\\r\\n", Environment.NewLine);
                                }
                                break;
                            case enmInfusionIcon.Omitted:
                                sToolTip = String.Format(Resource.InfusionChart.Omitted_tooltip, this.SetToolTip(oSlotDetail.AdministrationDetail.AdminComments),
                                    this.SetToolTip(oSlotDetail.ScheduledDTTM)).Replace("\\r\\n", Environment.NewLine);
                                break;
                        }


             out1(sLastAdminComment);
             return sToolTip;

            }
        private GetReasonCodeByAction(oAdministrationDetail: AdministrationDetail, sMedicationAction: string, oCurrentInfAdminDetail: InfusionAdminDetail): string {
            let sReasonCode: string = String.Empty;
            if (oAdministrationDetail != null && oAdministrationDetail.oInfusionAdminDetail != null && oAdministrationDetail.oInfusionAdminDetail.Count > 0) {
                let oSelectedRsnCode = oAdministrationDetail.oInfusionAdminDetail.Where(oItem =>oItem.ActionStartDate<=oCurrentInfAdminDetail.ActionStartDate&&String.Compare(oItem.ActionCode,sMedicationAction,StringComparison.CurrentCultureIgnoreCase)==0).Select(oItem => oItem);
                if (oSelectedRsnCode != null && oSelectedRsnCode.Count() > 0) {
                    sReasonCode = oSelectedRsnCode.LastOrDefault().infusionReasonCode;
                }
            }
            return sReasonCode;
        }
        private GetReasonTextByAction(sAdminReasonCode: string, oAdministrationDetail: AdministrationDetail): string {
            let sReasonText: string = String.Empty;
            if (!String.IsNullOrEmpty(sAdminReasonCode)) {
                sReasonText = CommonBB.GetText(sAdminReasonCode, ValueDomainValues.oRecordAdminReasons);
            }
            return sReasonText;
        }
        private SetToolTip(sAdminAction: string | DateTime): string {
            let tooltip: string = String.Empty;
            if (typeof (sAdminAction) == "string") {
                if (!String.IsNullOrEmpty(sAdminAction) && sAdminAction.length > 0) {
                    tooltip = sAdminAction;
                }
            }
            else {
                if (DateTime.NotEquals(sAdminAction, DateTime.MinValue)) {
                    tooltip = sAdminAction.ToUserDateTimeString(CConstants.DateTimeFormat);
                }
            }
            return tooltip;
        }
        
        public CreateEmptyCells(oRow: InfusionChartRow, oDrugDetail: DrugDetail): void {
            let iCell1: InfusionChartCell;
            for (let j: number = 1; j <= 12; j++) {
                iCell1 = new InfusionChartCell();
                iCell1.ColIndex = j;
                if (oDrugDetail.DrugHeader.IsPRN && !oDrugDetail.DrugHeader.IsPRNWithSchedule) {
                    iCell1.EnableCellClick = true;
                }
                else {
                    iCell1.EnableCellClick = false;
                }
                iCell1.Key = "iChartCell-" + j;
                if (j == 1) {
                    oRow.InfusionChartCells = new ObservableCollection<InfusionChartCell>();
                }
                oRow.InfusionChartCells.Add(iCell1);
            }
        }
        public CheckAndSetCumulativeIcon(): ChartIcon {
            let iconCumulative: ChartIcon = new ChartIcon();
            iconCumulative.Key = CConstants.CumulativeWarning;
            iconCumulative.UriString = MedImage.GetPath(MedImages.CumulativeWarningIcon);
            iconCumulative.EnableOnHotSpotClick = false;
            iconCumulative.Tooltip = ObjectHelper.CreateObject(new iLabel(), { Text: MedsAdminChartToolTip.CumulativeIcon, MaxWidth: 250, IsWordwrap: true });
            return iconCumulative;
        }
        public UnacknowledgedConflictIcon(): ChartIcon {
            let iconUnackConflict: ChartIcon = new ChartIcon();
            iconUnackConflict.EnableOnHotSpotClick = false;
            iconUnackConflict.UriString = MedImage.GetPath(MedImages.ConflictsMandatoryIcon);
            iconUnackConflict.Tooltip = MedsAdminChartToolTip.ConflictsMandSlots;
            return iconUnackConflict;
        }
        private FillTagObject(oSlotDetail: SlotDetail): INFRecordAdminParams {
            this.oINFRecordAdminParams = new INFRecordAdminParams();
            if (oSlotDetail != null) {
                this.oINFRecordAdminParams.SlotOID = oSlotDetail.OID > 0 ? oSlotDetail.OID : 0;
                this.oINFRecordAdminParams.SlotStatus = !String.IsNullOrEmpty(oSlotDetail.Status) ? oSlotDetail.Status : String.Empty;
                this.oINFRecordAdminParams.ScheduledDTTM = DateTime.NotEquals(oSlotDetail.ScheduledDTTM , DateTime.MinValue) ? oSlotDetail.ScheduledDTTM : DateTime.MinValue;
            }
            return this.oINFRecordAdminParams;
        }
    }
    export class INFRecordAdminParams {
        public SlotOID: number;
        public SlotStatus: string;
        public ScheduledDTTM: DateTime;
        public IsAnyParacetamolAdministeredInGivenPeriod: boolean;
    }
    //export module InfusionChartHelper {
        export enum enmInfusionIcon {
            NoIcon,

            Planned,

            Deferred,

            NotGiven,

            Begun,

            Pause,

            Resume,

            EstimatedStop,

            Stopped,

            Complete,

            ChangeBag,

            ChangeFlowRate,

            OverDue,

            DueNow,

            Given,

            Homeleave,

            NotYetRecorded,

            Omitted,

            NotKnown
        }
   // }
    //export module InfusionChartHelper {
        export class InfusionAction {
            public StartTime: DateTime;
            public EndTime: DateTime;
            public StartIcon: enmInfusionIcon = enmInfusionIcon.NoIcon;
            public EndIcon: enmInfusionIcon = enmInfusionIcon.NoIcon;
            public LineType: InfusionProcessIcon.LineTypes;
            public LineColor: SolidColorBrush;
        }
   // }
