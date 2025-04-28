import { Subject } from 'rxjs';
import { Component, OnInit, EventEmitter } from '@angular/core';
import { StringBuilder,ProfileFactoryType,ContextManager,Convert,AppActivity, SLQueryCollection} from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp,Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison,AppDialogEventargs, AppDialogResult, DelegateArgs, DialogComponentArgs, WindowButtonType, ObservableCollection, IEnumerable, IGrouping, CListItem, List, Enum, TimeZoneInfo } from 'epma-platform/models';
import { AppDialog, BitmapImage, Color, Colors, FontWeights, Grid, HorizontalAlignment, SolidColorBrush,  TextBlock, TextWrapping, Thickness, Uri, UriKind, UserControl, iLabel, iTab, iTabItem } from 'epma-platform/controls';
import { HelperService} from 'epma-platform/soapclient';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
import { CMedicationLineDisplayData } from 'src/app/lorappslprofiletypes/medication';
import { AdministrationDetail, CReqMsgGetMedicationChart, CReqMsgGetMedicationChartOverview, CReqMsgGetPrescriptionChart, CResMsgGetMedicationChart, CResMsgGetMedicationChartOverview, CResMsgGetPrescriptionChart, DrugDetail, DrugHeader, Encounter, GetMedicationChartCompletedEventArgs, GetMedicationChartOverviewCompletedEventArgs, GetPrescriptionChartCompletedEventArgs, InfusionAdminDetail, SlotDetail } from 'src/app/shared/epma-platform/soap-client/MedicationAdministrationWS';
import { CReqMsgGetPatientPersonalCarer, GetPatientPersonalCarerCompletedEventArgs, QueryPatientRecordWSSoapClient } from 'src/app/shared/epma-platform/soap-client/QueryPatientRecordWS';
import { CommonBB } from 'src/app/lorappcommonbb/utilities/common';
import { PatientContext } from 'src/app/lorappcommonbb/utilities/globalvariable';
import { MedicationAdministrationWSSoapClient } from 'src/app/shared/epma-platform/soap-client/MedicationAdministrationWS';
import { MedChartParams } from 'src/app/shared/epma-platform/soap-client/MedicationAdministrationWS';
import { CResMsgGetPatientPersonalCarer } from 'src/app/shared/epma-platform/soap-client/QueryPatientRecordWS';
import { InfusionTypeConceptCodeData, MedicationCommonConceptCodeData, MedicationCommonProfileData, RequestUrgency } from 'src/app/lorappmedicationcommonbb/utilities/profiledata';
import { LineDisplayConfigurations } from 'src/app/lorappslprofiletypes/medication';
import { Busyindicator } from 'src/app/lorappcommonbb/busyindicator';
import { Environment } from 'src/app/product/shared/models/Common';
import * as IPPMA_Common from 'src/app/lorappmedicationcommonbb/utilities/constants'
import { CConstants, ChartType, DoseTypeCode, InfusionTypesCode, MedImage, MedImages, MedicationAction, MultiRouteType, SlotStatus, SlotStatusText } from '../utilities/CConstants';
import { ChartContext, MedChartData, TagDrugHeaderDetail, TagSlotDetail, ValueDomainValues } from '../utilities/globalvariable';
import { Common, EventsWithNotKnownStatus, MedsAdminCommonData } from '../utilities/common';
import { PrescriptionHelper } from '../utilities/PrescriptionHelper';
import { ProfileData } from '../utilities/ProfileData';
import { MCommonBB } from 'src/app/lorappmedicationcommonbb/utilities/common';
import { UpdateRvwAlertShownForItemCompletedEventArgs } from 'src/app/shared/epma-platform/soap-client/IPPMAManagePrescriptionWS';
import { GradientStop } from '@progress/kendo-drawing';
import { DrugItemSubTypeCode, InfusionTypeCode } from 'src/app/lorappmedicationcommonbb/utilities/constants';
import { MedsAdminChartToolTip } from '../resource/medsadmincharttooltip.designer';
import { Resource } from '../resource';
import { MedicationCommonBB } from 'src/app/lorappmedicationcommonbb/utilities/medicationcommonbb';
import { MedicationRequest } from '../resource/medicationrequest.designer';
import { SlotDetailVM } from '../viewmodel/MedicationChartVM';
import { CValuesetTerm } from 'src/app/shared/epma-platform/soap-client/CReferenceWS';
import { AdministratedSlot } from 'src/app/lorarcbluebirdmedicationchart/common/AdministratedSlot';
import { ChartRow } from 'src/app/lorarcbluebirdmedicationchart/common/ChartRow';
import { ChartCell } from 'src/app/lorarcbluebirdmedicationchart/common/ChartCell';
import { TimeSlot } from 'src/app/lorarcbluebirdmedicationchart/common/TimeSlot';
import { DrugItem } from 'src/app/lorarcbluebirdmedicationchart/common/DrugItem';
import { ChartStringIcon } from 'src/app/lorarcbluebirdmedicationchart/common/ChartStringIcon';
import { IChartSlot } from 'src/app/lorarcbluebirdmedicationchart/common/IChartSlot';
import { DefaultSlot } from 'src/app/lorarcbluebirdmedicationchart/common/DefaultSlot';
import { BlankSlot } from 'src/app/lorarcbluebirdmedicationchart/common/BlankSlot';
import { ChartIcon } from 'src/app/lorarcbluebirdmedicationchart/common/ChartIcon';
import { TodayMultiSlot } from 'src/app/lorarcbluebirdmedicationchart/common/TodayMultiSlot';
import { TodayAsRequiredSlot } from 'src/app/lorarcbluebirdmedicationchart/common/TodayAsRequiredSlot';
import { DoseOverviewSlot } from 'src/app/lorarcbluebirdmedicationchart/common/DoseOverViewSlot';
import { StackPanel } from 'src/app/shared/epma-platform/controls-model/StackPanel';
import { MedsAdminMainView } from '../view/MedsAdminMainView';

    export class GetMedsChartData {
        PatientOID: number = 0;
        MedChartOID: number = 0;
        EncounterOID: number = 0;
        public StartDate: DateTime= DateTime.MinValue;
        public EndDate: DateTime= DateTime.MinValue;
        public oChartTypeSelected: ChartType = ChartType.None; //missing in cconstant.cs
        bIsDiscontdChecked: boolean = false;
        bIsCancelledChecked: boolean = false;
        sSortChartOverviewBy: string = String.Empty;
        public cUnackConflict: string = 'N';
        public nMaxSlotCount: number = 0;
        public MinRowHeight: number = 81;
        public MinSlotHeight: number = 38;
        public nMinSlotCount: number = 5;
        public nCount: number = 0;
        nBlankCellCount: number = 0;
        public IsReviewHighlighted: boolean = false;
        public oMLD: CMedicationLineDisplayData = new CMedicationLineDisplayData();
        public oChartRowList: ObservableCollection<ChartRow> = new ObservableCollection<ChartRow>(); //platfrom not yet implemented
        public oEncList: ObservableCollection<Encounter> = new ObservableCollection<Encounter>();
        public nDueCount: number = 0;
        public nOverDueCount: number = 0;
        public nAsRequiredCount: number = 0;
        public IsGreyedOut: boolean = false;
        public IsCompleted: boolean = false;
        public IsAdmDrug: boolean = false;
        public IsNextDoseAllowedForPRN: boolean = false;
        public nMinimumIntervalForPRN: number = 0;
        public nLastRecordedAtForPRN: DateTime= DateTime.MinValue;
        public IsOverviewPRNSlot: boolean = false;
        public dtOverviewPRNStartDate: DateTime;
        public dtOverviewPRNEndDate: DateTime;
        public CurrntDt: DateTime;
        //////public delegate void MedsAdminChartDataDelegate();
        public MedsAdminChartDataCompleted: Function;
        public IsTitrated: boolean = false;
        IsSteppedTitrated: boolean = false;
        UpdPresitemsOids: string = String.Empty;
        oTagDrugHeaderDetail: TagDrugHeaderDetail; //our merge will solve this
        public MaxRowDoseHeightValue: number = 0;
        public parentprsoid: IEnumerable<IGrouping<number, DrugDetail>>;
        public LstDrugDetail: ObservableCollection<DrugDetail>;
        public PreviousGroupID: number = 0;
        personalCarers: ObservableCollection<CListItem>;
        conceptCodes: StringBuilder = new StringBuilder();
        resolvedConceptCodes: ObservableCollection<CListItem>;
        public PreviouseIsGroupSequence: number = 0;
        public CurrentIsGroupSequence: number = 0;
        public IsParentSequenceHeader: boolean = true;
        medChartCallCompleted:EventEmitter<any> = new EventEmitter<any>();

        constructor(PatOID?: number, EncOID?: number, CurrentDateTime?: DateTime, SDate?: DateTime, EDate?: DateTime, oChartType?: ChartType, sSortBy?: string, MedChartOID?: number, isDiscontdChecked?: boolean, isCancelledChecked?: boolean) {
            this.PatientOID = PatOID;
            this.EncounterOID = EncOID;
            this.StartDate = SDate;
            this.EndDate = EDate;
            this.CurrntDt = CurrentDateTime;
            this.oChartTypeSelected = oChartType;
            this.MedChartOID = MedChartOID;
            this.sSortChartOverviewBy = sSortBy;
            this.bIsDiscontdChecked = isDiscontdChecked;
        }
        public GetMedsAdminChartData(): void {
            let objQPService: QueryPatientRecordWSSoapClient = new QueryPatientRecordWSSoapClient();
            objQPService.GetPatientPersonalCarerCompleted  = (s,e) => { this.objService_GetPatientPersonalCarerCompleted(s,e); } ;
            let objQPReq: CReqMsgGetPatientPersonalCarer = new CReqMsgGetPatientPersonalCarer();
            objQPReq.oContextInformation = CommonBB.FillContext();
            objQPReq.PatientIDBC = Convert.ToString(PatientContext.PatientOID); // ASK Thiyagu PatientCOntext
            objQPReq.CurrentBC = "IncludeRemoved";
            objQPService.GetPatientPersonalCarerAsync(objQPReq);
            let objService: MedicationAdministrationWSSoapClient = new MedicationAdministrationWSSoapClient();
            let oParams: MedChartParams = new MedChartParams();
            oParams.PatientOID = this.PatientOID;
            oParams.EncounterOID = this.EncounterOID;
            oParams.StartDate = this.StartDate.AddDateAdjustment();
            oParams.EndDate = this.EndDate.AddDateAdjustment();
            oParams.DuenessWindowTimeMinutes = MedChartData.DuenessThreshold;
            oParams.OverDueTimeHours = CConstants.OverdueToNotknownTime;
            oParams.IsDrugRoundView = PatientContext.bIsDrugRoundvw;
            oParams.RefreshTriggeredCACode = MedChartData.RefreshTriggeredCACode;
            if (this.oChartTypeSelected == ChartType.Medication_Chart) {
                MedChartData.NonInfusionItemCount = 0;
                MedChartData.InfusionItemCount = 0;
                MedChartData.InfusionChartAlertInfo = null;
                objService.GetMedicationChartCompleted  = (s,e) => { this.objService_GetMedicationChart(s,e); } ;
                let objReq: CReqMsgGetMedicationChart = new CReqMsgGetMedicationChart();
                objReq.oContextInformation = CommonBB.FillContext();
                oParams.MedChartOID = MedChartData.MedChartOID;
                oParams.PrescType = "CC_DSCHRG";
                oParams.ProfileDiscontinuedDrugFlag = '\0';
                let sImageList: string;
                oParams.SealRecordList = Common.GetSealDrugs((o) => { sImageList = o; });
                let nDrugsExpDuration: number = 0;
                if (MedicationCommonProfileData.MedViewConfig != null)
                    nDrugsExpDuration = Convert.ToInt32(PrescriptionHelper.GetDuration(MedicationCommonProfileData.MedViewConfig.DrugsExpiryDuration)); //Anitha to change to static
                oParams.ProfileHoldDuration = nDrugsExpDuration;
                objReq.ViewMedChartParamsBC = oParams;
                oParams.IsIncludeInfusions = (ProfileData.InfusionPresConfig != null && ProfileData.InfusionPresConfig.IsEnablePrescInfus) ? true : false;
                objService.GetMedicationChartAsync(objReq);
            }
            else if (this.oChartTypeSelected == ChartType.Medication_Overview_Chart) {
                MedChartData.NonInfusionItemCount = 0;
                MedChartData.InfusionItemCount = 0;
                MedChartData.InfusionChartAlertInfo = null;
                objService.GetMedicationChartOverviewCompleted  = (s,e) => { this.objService_GetMedicationChartOverviewCompleted(s,e); } ;
                let objReq: CReqMsgGetMedicationChartOverview = new CReqMsgGetMedicationChartOverview();
                objReq.oContextInformation = CommonBB.FillContext();
                oParams.MedChartOID = this.MedChartOID;
                oParams.PrescType = String.Empty;
                oParams.ProfileDiscontinuedDrugFlag = '\0';
                oParams.SealRecordList = String.Empty;
                oParams.ProfileHoldDuration = 0;
                oParams.IsIncludeInfusions = (ProfileData.InfusionPresConfig != null && ProfileData.InfusionPresConfig.IsEnablePrescInfus) ? true : false;
                oParams.IsDiscontinuedChecked = this.bIsDiscontdChecked;
                oParams.ChartSortType = this.sSortChartOverviewBy;
                objReq.OverviewMedChartParamsBC = oParams;
                objService.GetMedicationChartOverviewAsync(objReq);
            }
            else if (this.oChartTypeSelected == ChartType.Prescription_Chart) {
                objService.GetPrescriptionChartCompleted  = (s,e) => { this.objService_GetPrescriptionChartCompleted(s,e); } ;
                let objReq: CReqMsgGetPrescriptionChart = new CReqMsgGetPrescriptionChart();
                objReq.oContextInformation = CommonBB.FillContext();
                oParams.MedChartOID = this.MedChartOID;
                oParams.IsDiscontinuedChecked = this.bIsDiscontdChecked;
                oParams.IsIncludeInfusions = (ProfileData.InfusionPresConfig != null && ProfileData.InfusionPresConfig.IsEnablePrescInfus) ? true : false;
                objReq.ViewPrescChartParamsBC = oParams;
                objService.GetPrescriptionChartAsync(objReq);
            }
        }
        objService_GetPatientPersonalCarerCompleted(sender: Object, e: GetPatientPersonalCarerCompletedEventArgs): void {
            if (e.Error != null)
                return
            let objRes: CResMsgGetPatientPersonalCarer = e.Result;
            if (objRes != null && objRes.oPersonalCarer != null && objRes.oPersonalCarer.Count > 0) {
                this.personalCarers = new ObservableCollection<CListItem>();
                objRes.oPersonalCarer.forEach( (carer)=> {
                    let item: CListItem = new CListItem();
                    item.DisplayText = String.Concat(carer.SurName, " ", carer.ForeName);
                    item.Value = carer.PersonalCarerOID;
                    item.Tag = carer.Relationship;
                    this.personalCarers.Add(item);
                    this.conceptCodes.Append(carer.Relationship);
                    this.conceptCodes.Append("~^~");
                });
                if (this.personalCarers.Count > 0) {
                    if (MedicationCommonConceptCodeData.ViewConceptCodes == null)
                        MedicationCommonConceptCodeData.ViewConceptCodes = new ObservableCollection<CValuesetTerm>();// TODO need to confirm CValuesetTerm
                    if (this.conceptCodes != null && this.conceptCodes.Length > 0)
                        this.resolvedConceptCodes = new ObservableCollection<CListItem>(MCommonBB.GetResolvedSupplyInstTermText(this.conceptCodes));
                }
            }
        }
        static InvokeWarning:Subject<any> = new Subject();
        static bInvokeWarningUnsubscribe: boolean = false; 
        objService_GetMedicationChart(sender: Object, e: GetMedicationChartCompletedEventArgs): void {
            if (e.Error != null)
                return
            let objRes: CResMsgGetMedicationChart = e.Result;
            if (objRes != null && objRes.MedicationChatView != null) {
                MedChartData.InfusionChartAlertInfo = objRes.MedicationChatView.InfusionChartAlertInfo;
                MedChartData.NonInfusionItemCount = objRes.MedicationChatView.NonInfusionItemCount;
                MedChartData.InfusionItemCount = objRes.MedicationChatView.InfusionItemCount;
                if (objRes.MedicationChatView.OID > 0) {
                    MedChartData.ChartStatus = objRes.MedicationChatView.ChartStatus;
                    MedChartData.ActiveFrom = objRes.MedicationChatView.ActiveFrom.Date;
                    MedChartData.ActiveTo = objRes.MedicationChatView.ActiveTo.Date;
                    MedChartData.SuspendedOn = objRes.MedicationChatView.ActiveTo;
                }
                MedChartData.IsAuthoriseDrugAval = objRes.MedicationChatView.IsAuthoriseDrugAvailable;
                this.ParacetamolAdminCount = objRes.MedicationChatView.ParacetamolAdministeredCount;
                MedChartData.IsDischargePrescriptionExists = objRes.MedicationChatView.IsDischPresExs;
                MedChartData.MedEncounter = objRes.MedicationChatView.Encounter;
                if (!String.IsNullOrEmpty(MedChartData.RefreshTriggeredCACode) && (String.Equals(MedChartData.RefreshTriggeredCACode, "MN_MEDINPATSL_P2", StringComparison.InvariantCultureIgnoreCase) || String.Equals(MedChartData.RefreshTriggeredCACode, "MN_MED_VALIDATE_S_P2", StringComparison.InvariantCultureIgnoreCase) || String.Equals(MedChartData.RefreshTriggeredCACode, "MN_MED_REQUEST", StringComparison.InvariantCultureIgnoreCase))) {
                    MedChartData.bRequestMedicationEnable = objRes.MedicationChatView.IsReqMedEnable.Equals(CConstants.one);
                    if (String.Equals(MedChartData.RefreshTriggeredCACode, "MN_MEDINPATSL_P2", StringComparison.InvariantCultureIgnoreCase)) {
                        MedsAdminCommonData.FillEventsWithNotKnownStatus(objRes.MedicationChatView.EventsInNotKnownStatus);
                    }
                }
                this.LstDrugDetail = objRes.MedicationChatView.DrugDetail;
                this.GetEncounterDetails(objRes.MedicationChatView.Encounter);
                if (objRes.MedicationChatView.DrugDetail != null && objRes.MedicationChatView.DrugDetail.Count > 0) {
                    this.ConstructChartRows(objRes.MedicationChatView.DrugDetail);
                }
            }
            this.medChartCallCompleted.emit(true);
            // if (this.MedsAdminChartDataCompleted != null)
            //     this.MedsAdminChartDataCompleted();
            Busyindicator.SetStatusIdle("MedChart");
            if( ChartContext.CurrentChartTab != "CC_INFUSIONCHART")
             GetMedsChartData.InvokeWarning.next(true);
        }
        ShowReviewAfter(lstDrugDetail: ObservableCollection<DrugDetail>): void {

        }
        reviewmsgBox_MessageBoxClose(sender: Object, e: MessageEventArgs): void {

        }
        objService_UpdateRvwAlertShownForItemCompleted(sender: Object, e: UpdateRvwAlertShownForItemCompletedEventArgs): void {
            if (e.Error != null)
                return
        }
        objService_GetMedicationChartOverviewCompleted(sender: Object, e: GetMedicationChartOverviewCompletedEventArgs): void {
            if (e.Error != null)
                return
            let objRes: CResMsgGetMedicationChartOverview = e.Result;
            if (objRes != null && objRes.oOverviewMedicationChart != null) {
                MedChartData.InfusionChartAlertInfo = objRes.oOverviewMedicationChart.InfusionChartAlertInfo;
                MedChartData.NonInfusionItemCount = objRes.oOverviewMedicationChart.NonInfusionItemCount;
                MedChartData.InfusionItemCount = objRes.oOverviewMedicationChart.InfusionItemCount;
                if (objRes.oOverviewMedicationChart.OID > 0) {
                    MedChartData.ChartStatus = objRes.oOverviewMedicationChart.ChartStatus;
                    MedChartData.ActiveFrom = objRes.oOverviewMedicationChart.ActiveFrom.Date;
                    MedChartData.ActiveTo = objRes.oOverviewMedicationChart.ActiveTo.Date;
                    MedChartData.SuspendedOn = objRes.oOverviewMedicationChart.ActiveTo;
                }
                this.ParacetamolAdminCount = objRes.oOverviewMedicationChart.ParacetamolAdministeredCount;
                this.GetEncounterDetails(objRes.oOverviewMedicationChart.Encounter);
                if (objRes.oOverviewMedicationChart.DrugDetail != null && objRes.oOverviewMedicationChart.DrugDetail.Count > 0) {
                    this.LstDrugDetail = objRes.oOverviewMedicationChart.DrugDetail;
                    this.ConstructChartRows(objRes.oOverviewMedicationChart.DrugDetail);
                }
            }
            this.medChartCallCompleted.emit(true);
            // if (this.MedsAdminChartDataCompleted != null)
            //     this.MedsAdminChartDataCompleted();
            Busyindicator.SetStatusIdle("MedChart");
        }
        objService_GetPrescriptionChartCompleted(sender: Object, e: GetPrescriptionChartCompletedEventArgs): void {
            if (e.Error != null)
                return
            let objRes: CResMsgGetPrescriptionChart = e.Result;
            if (objRes != null && objRes.oPrescriptionChart != null) {
                if (DateTime.NotEquals(objRes.oPrescriptionChart.LastModifiedAt , DateTime.MinValue))
                    MedChartData.LastUpdateDTTM = objRes.oPrescriptionChart.LastModifiedAt;
                if (objRes.oPrescriptionChart.OID > 0) {
                    MedChartData.ChartStatus = objRes.oPrescriptionChart.ChartStatus;
                    MedChartData.ActiveFrom = objRes.oPrescriptionChart.ActiveFrom.Date;
                    MedChartData.ActiveTo = objRes.oPrescriptionChart.ActiveTo.Date;
                    MedChartData.SuspendedOn = objRes.oPrescriptionChart.ActiveTo;
                }
                MedChartData.IsAuthoriseDrugAval = objRes.oPrescriptionChart.IsAuthoriseDrugAvailable;
                this.ParacetamolAdminCount = objRes.oPrescriptionChart.ParacetamolAdministeredCount;
                this.GetEncounterDetails(objRes.oPrescriptionChart.Encounter);
                if (objRes.oPrescriptionChart.DrugDetail != null && objRes.oPrescriptionChart.DrugDetail.Count > 0) {
                    this.LstDrugDetail = objRes.oPrescriptionChart.DrugDetail;
                    this.ConstructChartRows(objRes.oPrescriptionChart.DrugDetail);
                }
            }
            this.medChartCallCompleted.emit(true);
            // if (this.MedsAdminChartDataCompleted != null)
            //     this.MedsAdminChartDataCompleted();
            Busyindicator.SetStatusIdle("MedChart");
            GetMedsChartData.InvokeWarning.next(true);
        }
        GetEncounterDetails(lstEncounter: ObservableCollection<Encounter>): void {
            this.oEncList = new ObservableCollection<Encounter>();
            if (lstEncounter != null && lstEncounter.Count > 0) {
                lstEncounter.forEach( (oEnc)=> {
                    oEnc.Type = CommonBB.GetText(oEnc.Type, ValueDomainValues.oEncTyp);
                    this.oEncList.Add(oEnc);
                });
            }
        }
        GetSortedDrugDetail(lstSortDrugDetail: ObservableCollection<DrugDetail>): ObservableCollection<DrugDetail> {
            let lstSortedDrugDetail: ObservableCollection<DrugDetail> = null;
            if (lstSortDrugDetail != null && lstSortDrugDetail.Count > 0) {
                if (String.Compare(this.sSortChartOverviewBy, CConstants.SortByChronological, StringComparison.CurrentCultureIgnoreCase) == 0) {
                    let qryDrugDetails = lstSortDrugDetail.OrderBy(DrugDetails => DrugDetails.DrugHeader.StartDate).Select(DrugDetails => DrugDetails);
                    /* let qryDrugDetails = from DrugDetails in lstSortDrugDetail
                    orderby DrugDetails.DrugHeader.StartDate
                    select DrugDetails; */
                    lstSortedDrugDetail = new ObservableCollection<DrugDetail>();
                    qryDrugDetails.forEach( (item)=> { lstSortedDrugDetail.Add(item); });
                }
                else if (String.Compare(this.sSortChartOverviewBy, CConstants.SortByRevChronological, StringComparison.CurrentCultureIgnoreCase) == 0) {
                    let qryDrugDetails = lstSortDrugDetail.OrderBy(DrugDetails => DrugDetails.DrugHeader.StartDate).Select(DrugDetails => DrugDetails);
                    /* let qryDrugDetails = from DrugDetails in lstSortDrugDetail
                    orderby DrugDetails.DrugHeader.StartDate descending
                    select DrugDetails; */
                    lstSortedDrugDetail = new ObservableCollection<DrugDetail>();
                    qryDrugDetails.forEach( (item)=> { lstSortedDrugDetail.Add(item); });
                }
            }
            return lstSortedDrugDetail;
        }
        ConstructChartRows(lstDrugDetail: ObservableCollection<DrugDetail>): void {
            if (lstDrugDetail != null && lstDrugDetail.Count > 0) {
                if (MedicationCommonProfileData.MedLineDisplay != null) {
                    let lnDis: ObservableCollection<LineDisplayConfigurations> = MedicationCommonProfileData.MedLineDisplay.objLineDisConfig;
                    let PRESITEM = lnDis.Where(LineDisplayElement =>LineDisplayElement.IsSelected==1&&String.Compare(LineDisplayElement.ColCode,"CC_MLDPRESITEM",StringComparison.OrdinalIgnoreCase)==0).Select(LineDisplayElement => LineDisplayElement);
                    /* let PRESITEM = from LineDisplayElement in lnDis
                    where LineDisplayElement.IsSelected == 1 && String.Compare(LineDisplayElement.ColCode, "CC_MLDPRESITEM", StringComparison.OrdinalIgnoreCase) == 0
                    select LineDisplayElement; */
                    let lnDisFilter: ObservableCollection<LineDisplayConfigurations> = new ObservableCollection<LineDisplayConfigurations>(PRESITEM);
                    this.oMLD.objLineDisConfig = lnDisFilter;
                }
                let nTotalDrugCount: number = lstDrugDetail.Count;
                let nParentprescriptionOID = lstDrugDetail.GroupBy(x => x.DrugHeader.FormViewParameters.IntravenousInfusionData.ParentPrescriptionItemOID);
                this.parentprsoid = nParentprescriptionOID;

                let nScheduledate = lstDrugDetail.Where(x => x.DrugHeader.FormViewParameters.IntravenousInfusionData.ParentPrescriptionItemOID == x.DrugHeader.PrescriptionItemOID && x.DrugHeader.FormViewParameters.IntravenousInfusionData.InfusionSeqOrder == 1).Select(x => x);
                lstDrugDetail.forEach( (oDrugDetail)=> {
                    if (oDrugDetail.DrugHeader.IsInfusion) {
                        this.parentprsoid.forEach( (oparentprsoid)=> {
                            if (oparentprsoid.key > 0) { //TODO no key in ienumerable, to notify Siva R
                                if (oDrugDetail.DrugHeader.FormViewParameters.IntravenousInfusionData.ParentPrescriptionItemOID == oparentprsoid.key && oDrugDetail.SlotDetails.Count <= 0) {
                                    let oslot: SlotDetail; //TODO THis class needs to be implemented in lorappmedicationcommonbb_p2 - mostly need to uncomment
                                    let tempStartdttm: DateTime= nScheduledate.Where(x => x.DrugHeader.FormViewParameters.IntravenousInfusionData.ParentPrescriptionItemOID == oDrugDetail.DrugHeader.FormViewParameters.IntravenousInfusionData.ParentPrescriptionItemOID && oDrugDetail.SlotDetails != null && oDrugDetail.SlotDetails.Count > 0).Select(x => x.DrugHeader.StartDate.Date).FirstOrDefault();
                                    while (DateTime.NotEquals(tempStartdttm , DateTime.MinValue) && (DateTime.LessThanOrEqualTo(tempStartdttm , this.EndDate))) {
                                        oslot = new SlotDetail();
                                        oslot.ScheduledDTTM = tempStartdttm.ToLocalTime();
                                        oDrugDetail.SlotDetails.Add(oslot);
                                        tempStartdttm = tempStartdttm.AddDays(1);
                                    }
                                }
                            }
                        });
                    }
                });
                this.PreviousGroupID = 0;
                let iCnt: number = 0;
                lstDrugDetail.forEach( (oDrugDetail)=> {
                    this.IsReviewHighlighted = false;
                    if (oDrugDetail != null && oDrugDetail.DrugHeader != null) {
                        let oChartRow: ChartRow = this.CreateRow(this.StartDate, this.EndDate, oDrugDetail); //TODO yet to implement platform team needs to export this class
                        if (oDrugDetail.Equals(lstDrugDetail.LastOrDefault())) {
                            if (!String.IsNullOrEmpty(oDrugDetail.DrugHeader.OrderSetGroupID))
                                oChartRow.OrderSetEnd = true;
                        }
                        if ((this.oChartTypeSelected == ChartType.Medication_Overview_Chart || this.oChartTypeSelected == ChartType.Prescription_Chart) && oDrugDetail.DrugHeader.FormViewParameters != null && oDrugDetail.DrugHeader.FormViewParameters.IntravenousInfusionData != null && oDrugDetail.DrugHeader.FormViewParameters.IntravenousInfusionData.InfusionGroupSequenceNo > 0 && !String.Equals(oDrugDetail.DrugHeader.PrescriptionItemStatus, CConstants.COMPLETED, StringComparison.InvariantCultureIgnoreCase) && !String.Equals(oDrugDetail.DrugHeader.PrescriptionItemStatus, CConstants.DISCONTINUED, StringComparison.InvariantCultureIgnoreCase) && !String.Equals(oDrugDetail.DrugHeader.PrescriptionItemStatus, CConstants.CANCELLED, StringComparison.InvariantCultureIgnoreCase)) {
                            let currItemIndex: number = lstDrugDetail.IndexOf(oDrugDetail);
                            let prevDrugItem: DrugDetail = (currItemIndex > 0) ? lstDrugDetail[currItemIndex - 1] : null;
                            let nextDrugItem: DrugDetail = (lstDrugDetail.Count > (currItemIndex + 1)) ? lstDrugDetail[currItemIndex + 1] : null;
                            let IsPrevItemASequence: boolean = (prevDrugItem != null && prevDrugItem.DrugHeader != null && prevDrugItem.DrugHeader.FormViewParameters != null && prevDrugItem.DrugHeader.FormViewParameters.IntravenousInfusionData != null && prevDrugItem.DrugHeader.FormViewParameters.IntravenousInfusionData.InfusionGroupSequenceNo > 0 && !String.Equals(prevDrugItem.DrugHeader.PrescriptionItemStatus, CConstants.COMPLETED, StringComparison.InvariantCultureIgnoreCase) && !String.Equals(prevDrugItem.DrugHeader.PrescriptionItemStatus, CConstants.DISCONTINUED, StringComparison.InvariantCultureIgnoreCase) && !String.Equals(prevDrugItem.DrugHeader.PrescriptionItemStatus, CConstants.CANCELLED, StringComparison.InvariantCultureIgnoreCase));
                            let IsNextItemSameSequence: boolean = (nextDrugItem != null && nextDrugItem.DrugHeader != null && nextDrugItem.DrugHeader.FormViewParameters != null && nextDrugItem.DrugHeader.FormViewParameters.IntravenousInfusionData != null && nextDrugItem.DrugHeader.FormViewParameters.IntravenousInfusionData.InfusionGroupSequenceNo > 0 && nextDrugItem.DrugHeader.FormViewParameters.IntravenousInfusionData.InfusionGroupSequenceNo == oDrugDetail.DrugHeader.FormViewParameters.IntravenousInfusionData.InfusionGroupSequenceNo && !String.Equals(nextDrugItem.DrugHeader.PrescriptionItemStatus, CConstants.COMPLETED, StringComparison.InvariantCultureIgnoreCase) && !String.Equals(nextDrugItem.DrugHeader.PrescriptionItemStatus, CConstants.DISCONTINUED, StringComparison.InvariantCultureIgnoreCase) && !String.Equals(nextDrugItem.DrugHeader.PrescriptionItemStatus, CConstants.CANCELLED, StringComparison.InvariantCultureIgnoreCase));
                            if (!IsPrevItemASequence) {
                                oChartRow.OrderSetStart = true;
                                oChartRow.OrderSetEnd = false;
                                oChartRow.RowBorderThickness = new Thickness(0, 2, 0, 0); //TODO need to ask siva R for the correct class to be used
                                oChartRow.RowBorderColor = new SolidColorBrush(Color.FromArgb(255, 0, 12, 254));
                            }
                            if (!IsNextItemSameSequence) {
                                oChartRow.OrderSetEnd = true;
                                let brdThickness: Thickness = oChartRow.RowBorderThickness;
                                brdThickness.Bottom = 2; // will be solved if taken latest
                                oChartRow.RowBorderThickness = brdThickness;
                                oChartRow.RowBorderColor = new SolidColorBrush(Color.FromArgb(255, 0, 12, 254));
                            }
                        }
                        this.oChartRowList.Add(oChartRow);
                    }
                    iCnt++;
                });
            }
        }
        public IsPlannedSlotExists(oDrugDetail: DrugDetail, sDate: DateTime): boolean {
            let IsPlannedSlotExists: boolean = false;
            if (oDrugDetail != null && oDrugDetail.SlotDetails != null && oDrugDetail.SlotDetails.Count > 0) {
                let qrySlotDetails = oDrugDetail.SlotDetails.Where(lstSlotDetails =>DateTime.Equals(lstSlotDetails.ScheduledDTTM.Date,sDate.Date)&&lstSlotDetails.Status==SlotStatus.PLANNED&&!String.IsNullOrEmpty(lstSlotDetails.Dose)).Select(lstSlotDetails => lstSlotDetails);
                /* let qrySlotDetails = from lstSlotDetails in oDrugDetail.SlotDetails
                where lstSlotDetails.ScheduledDTTM.Date == sDate.Date && lstSlotDetails.Status == SlotStatus.PLANNED && !String.IsNullOrEmpty(lstSlotDetails.Dose)
                select lstSlotDetails; */
                if (qrySlotDetails.Count() > 0) {
                    IsPlannedSlotExists = true;
                }
            }
            return IsPlannedSlotExists;
        }
        private IsAllMultiSlotForRow(StartDTTM: DateTime, EndDTTM: DateTime, oDrugDetail: DrugDetail): boolean {
            let IsAllMultiSlot: boolean = true;
            if (oDrugDetail != null) {
                while (DateTime.LessThanOrEqualTo(StartDTTM , EndDTTM)) {
                    if (oDrugDetail.SlotDetails != null) {
                        let qrySlotDetails = oDrugDetail.SlotDetails.Where(lstSlotDetails =>DateTime.Equals(lstSlotDetails.ScheduledDTTM.Date,StartDTTM.Date)).Select(lstSlotDetails => lstSlotDetails);
                        /* let qrySlotDetails = from lstSlotDetails in oDrugDetail.SlotDetails
                        where lstSlotDetails.ScheduledDTTM.Date == StartDTTM.Date
                        select lstSlotDetails; */
                        if (qrySlotDetails.Count() <= this.nMinSlotCount) {
                            IsAllMultiSlot = false;
                            break;
                        }
                    }
                    StartDTTM = StartDTTM.AddDays(1);
                }
            }
            return IsAllMultiSlot;
        }
        private IsSteppedDoseAllMultiSlotForRow(StartDTTM: DateTime, EndDTTM: DateTime, oDrugDetail: DrugDetail): boolean {
            let IsAllMultiSlot: boolean = true;
            if (oDrugDetail != null) {
                while (DateTime.LessThanOrEqualTo(StartDTTM , EndDTTM)) {
                    if (oDrugDetail.SlotDetails != null) {
                        let qrySlotDetails = oDrugDetail.SlotDetails.Where(lstSlotDetails =>DateTime.Equals(lstSlotDetails.ScheduledDTTM.Date,StartDTTM.Date)).Select(lstSlotDetails => lstSlotDetails);
                        /* let qrySlotDetails = from lstSlotDetails in oDrugDetail.SlotDetails
                        where lstSlotDetails.ScheduledDTTM.Date == StartDTTM.Date
                        select lstSlotDetails; */
                        if (qrySlotDetails.Count() > this.nMinSlotCount) {
                            IsAllMultiSlot = true;
                            break;
                        }
                        else {
                            IsAllMultiSlot = false;
                        }
                    }
                    StartDTTM = StartDTTM.AddDays(1);
                }
            }
            return IsAllMultiSlot;
        }
        public GetMaximumSlotForRow(StartDTTM: DateTime, EndDTTM: DateTime, oDrugDetail: DrugDetail): number {
            let iMaxSlot: number = 0;
            if (oDrugDetail != null) {
                while (DateTime.LessThanOrEqualTo(StartDTTM , EndDTTM)) {
                    if (oDrugDetail.SlotDetails != null) {
                        let qrySlotDetails = oDrugDetail.SlotDetails.Where(lstSlotDetails =>DateTime.Equals(lstSlotDetails.ScheduledDTTM.Date,StartDTTM.Date)).Select(lstSlotDetails => lstSlotDetails);
                        /* let qrySlotDetails = from lstSlotDetails in oDrugDetail.SlotDetails
                        where lstSlotDetails.ScheduledDTTM.Date == StartDTTM.Date
                        select lstSlotDetails; */
                        if (this.oChartTypeSelected == ChartType.Medication_Chart && qrySlotDetails.Count() > iMaxSlot) {
                            if (qrySlotDetails.Count() == this.nMinSlotCount) {
                                iMaxSlot = this.nMinSlotCount;
                                break;
                            }
                            else if (qrySlotDetails.Count() < this.nMinSlotCount) {
                                iMaxSlot = qrySlotDetails.Count();
                            }
                        }
                        else {
                            if (qrySlotDetails.Count() > iMaxSlot)
                                iMaxSlot = qrySlotDetails.Count();
                        }
                    }
                    StartDTTM = StartDTTM.AddDays(1);
                }
            }
            return iMaxSlot;
        }
        public CalculatenRowHeight(nSlotCount: number): number {
            let nRowHeight: number = 0;
            if (nSlotCount * this.MinSlotHeight > this.MinRowHeight) {
                nRowHeight = nSlotCount * this.MinSlotHeight;
            }
            else {
                nRowHeight = this.MinRowHeight;
            }
            return nRowHeight;
        }
        public GetTextHeight(text: string): number {
            // let txtMeasure: TextBlock = new TextBlock();            
            // txtMeasure.Width = 145;
            // txtMeasure.TextWrapping = TextWrapping.Wrap;
            // txtMeasure.Text = text;
            let virtualSpan =document.getElementById("myspan");
            if (virtualSpan == null) {
                virtualSpan = document.createElement('span');
                virtualSpan.textContent = text;
                virtualSpan.style.fontSize = '11px';
                virtualSpan.style.fontFamily = 'Verdana, Arial, Sans-Serif';
                virtualSpan.style.width = '81px';
                virtualSpan.style.display = 'block';
                virtualSpan.style.height = 'auto';
                virtualSpan.style.overflowWrap = 'anywhere';
                virtualSpan.style.visibility = "hidden";
                virtualSpan.id = 'myspan';
                document.body.appendChild(virtualSpan);
            } else {
                virtualSpan.innerText = text;
            }
            return virtualSpan.getBoundingClientRect().height;
        }
        public IsParaIngDrug: boolean;
        public CreateRow(StartDTTM: DateTime, EndDTTM: DateTime, oDrugDetail: DrugDetail): ChartRow {
            if (this.oChartTypeSelected == ChartType.Prescription_Chart) {
                this.MinSlotHeight = 58;
            }
            else {
                this.MinSlotHeight = 38;
            }
            let nMultiSlotDueCount: number = 0;
            let nMultiSlotOverdueCount: number = 0;
            let oChartRow: ChartRow = new ChartRow();
            let nPrescriptionItemOID: number = oDrugDetail.DrugHeader.PrescriptionItemOID;
            oChartRow.Key = "Row-" + nPrescriptionItemOID;
            oChartRow.DrugItem = this.GetDrugHeader(oDrugDetail.DrugHeader);
            if (this.oChartTypeSelected == ChartType.Prescription_Chart) {
                if (MedChartData.IsPresChartReadOnly) {
                    oChartRow.DrugItem.AllowSelect = false;
                }
                else {

                }
            }
            if (this.oChartTypeSelected == ChartType.Prescription_Chart || this.oChartTypeSelected == ChartType.Medication_Overview_Chart) {
                oChartRow.DrugItem.GroupForecolor = new SolidColorBrush(Colors.Black);
                /* this block is commented because Gradient related code is not used anymore
                let GS1: GradientStopCollection = new GradientStopCollection();
                GS1.Add(ObjectHelper.CreateObject(new GradientStop(), { Color: Color.FromArgb(255, 122, 194, 193), Offset: 0.6 }));
                GS1.Add(ObjectHelper.CreateObject(new GradientStop(), { Color: Color.FromArgb(255, 176, 218, 217), Offset: 0.4 }));
                oChartRow.DrugItem.GroupBackground = new LinearGradientBrush(GS1, 90.0); */
                oChartRow.DrugItem.GroupFontSize = CConstants.GroupNameFontSize;
                if (oDrugDetail.DisplayOrder > 0) {
                    oChartRow.IsGroupItem = true;
                }
                if (!String.Equals(oDrugDetail.GroupDisplayName, "Awaiting authorisation", StringComparison.InvariantCultureIgnoreCase) && oDrugDetail.DrugHeader.FormViewParameters != null && oDrugDetail.DrugHeader.FormViewParameters.IntravenousInfusionData != null && oDrugDetail.DrugHeader.FormViewParameters.IntravenousInfusionData.InfusionGroupSequenceNo > 0 && !String.Equals(oDrugDetail.DrugHeader.PrescriptionItemStatus, CConstants.COMPLETED, StringComparison.InvariantCultureIgnoreCase) && !String.Equals(oDrugDetail.DrugHeader.PrescriptionItemStatus, CConstants.DISCONTINUED, StringComparison.InvariantCultureIgnoreCase) && !String.Equals(oDrugDetail.DrugHeader.PrescriptionItemStatus, CConstants.CANCELLED, StringComparison.InvariantCultureIgnoreCase))
                    this.CurrentIsGroupSequence = oDrugDetail.DrugHeader.FormViewParameters.IntravenousInfusionData.InfusionGroupSequenceNo;
                else this.CurrentIsGroupSequence = 0;
                if (oDrugDetail.DisplayOrder > 0 && (this.PreviousGroupID <= 0 || this.PreviousGroupID != Convert.ToInt32(oDrugDetail.DisplayOrder) || (this.PreviouseIsGroupSequence != this.CurrentIsGroupSequence))) {
                    if (this.CurrentIsGroupSequence > 0) {
                        oChartRow.DrugItem.GroupName = String.Format(Resource.MedicationChart.ExsitingSequenceNo, this.CurrentIsGroupSequence);
                        if (this.IsParentSequenceHeader) {
                            oChartRow.DrugItem.ParentGroupName = oDrugDetail.GroupDisplayName;
                            this.IsParentSequenceHeader = false;
                        }
                    }
                    else oChartRow.DrugItem.GroupName = oDrugDetail.GroupDisplayName;
                }
                this.PreviousGroupID = Convert.ToInt32(oDrugDetail.DisplayOrder);
                this.PreviouseIsGroupSequence = this.CurrentIsGroupSequence;
            }
            let IsPRN: boolean = oDrugDetail.DrugHeader.IsPRN;
            let IsPRNWithSchedule: boolean = oDrugDetail.DrugHeader.IsPRNWithSchedule;
            this.IsNextDoseAllowedForPRN = oDrugDetail.IsNextDoseAllowedForPRN;
            this.nMinimumIntervalForPRN = oDrugDetail.MinimumIntervalForPRN;
            this.nLastRecordedAtForPRN = oDrugDetail.LastRecordedAtForPRN;
            if (!String.IsNullOrEmpty(oDrugDetail.DrugHeader.PrescriptionItemStatus) && (String.Compare(oDrugDetail.DrugHeader.PrescriptionItemStatus, CConstants.DISCONTINUED, StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(oDrugDetail.DrugHeader.PrescriptionItemStatus, CConstants.COMPLETED, StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(oDrugDetail.DrugHeader.PrescriptionItemStatus, CConstants.AWAITINGAUTHORISE, StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(oDrugDetail.DrugHeader.PrescriptionItemStatus, CConstants.CANCELLED, StringComparison.CurrentCultureIgnoreCase) == 0))
                this.cUnackConflict = oDrugDetail.DrugHeader.IsConflictExists = 'N';
            else this.cUnackConflict = oDrugDetail.DrugHeader.IsConflictExists;
            this.IsGreyedOut = false;
            this.IsCompleted = false;
            let PrescriptionStartDTTM: DateTime= DateTime.MinValue;
            let PrescriptionEndDTTM: DateTime= DateTime.MinValue;
            this.IsParaIngDrug = oDrugDetail.DrugHeader.IsParacetamolIngredient;
            if (DateTime.NotEquals(oDrugDetail.DrugHeader.StartDate , DateTime.MinValue)) {
                PrescriptionStartDTTM = oDrugDetail.DrugHeader.StartDate;
            }
            if (DateTime.NotEquals(oDrugDetail.DrugHeader.EndDate , DateTime.MinValue)) {
                PrescriptionEndDTTM = oDrugDetail.DrugHeader.EndDate;
            }
            let itemMRtype: MultiRouteType;
            itemMRtype = oDrugDetail.DrugHeader.MultiRouteType;
            // itemMRtype = Enum.Parse(MultiRouteType,oDrugDetail.DrugHeader.MultiRouteType.ToString(), true);
            if ((oDrugDetail.DrugHeader.IsInfusion) && ((itemMRtype != MultiRouteType.Mixed_Routes) || (itemMRtype == MultiRouteType.Mixed_Routes && this.oChartTypeSelected != ChartType.Medication_Chart))) {
                if (oDrugDetail.DrugHeader.PrescriptionItemStatus == CConstants.DISCONTINUED || oDrugDetail.DrugHeader.PrescriptionItemStatus == CConstants.COMPLETED || oDrugDetail.DrugHeader.PrescriptionItemStatus == CConstants.CANCELLED) {
                    if (oDrugDetail.DrugHeader.FormViewParameters.IntravenousInfusionData.ParentPrescriptionItemOID > 0 && this.LstDrugDetail != null) {
                        let GroupedSequentialDrug = this.LstDrugDetail.Where(c => c.DrugHeader.FormViewParameters.IntravenousInfusionData.ParentPrescriptionItemOID == oDrugDetail.DrugHeader.FormViewParameters.IntravenousInfusionData.ParentPrescriptionItemOID);
                        if (GroupedSequentialDrug != null && GroupedSequentialDrug.Count() > 0) {
                            let TotalCount: number = GroupedSequentialDrug.Max(c => c.DrugHeader.FormViewParameters.IntravenousInfusionData.InfusionSeqOrder);
                            let LastSequentialDrug = GroupedSequentialDrug.Where(c => c.DrugHeader.FormViewParameters.IntravenousInfusionData.InfusionSeqOrder == TotalCount);
                            if (LastSequentialDrug != null && LastSequentialDrug.Count() > 0) {
                                let oLastSeqDrugDetail: DrugDetail = LastSequentialDrug.First();
                                if (oLastSeqDrugDetail.SlotDetails != null && oLastSeqDrugDetail.SlotDetails.Count > 0) {
                                    let oInfActionCompleted = oLastSeqDrugDetail.SlotDetails.Where(oItem => oItem.Status != null && String.Compare(oItem.Status, SlotStatus.STOPPED, StringComparison.CurrentCultureIgnoreCase) != 0 && String.Compare(oItem.Status, SlotStatus.COMPLETED, StringComparison.CurrentCultureIgnoreCase) != 0 && String.Compare(oItem.Status, SlotStatus.OMITTED, StringComparison.CurrentCultureIgnoreCase) != 0 && String.Compare(oItem.Status, SlotStatus.NOTGIVEN, StringComparison.CurrentCultureIgnoreCase) != 0 && String.Compare(oItem.Status, SlotStatus.NOTKNOWN, StringComparison.CurrentCultureIgnoreCase) != 0);
                                    if (oInfActionCompleted != null && oInfActionCompleted.Count() == 0) {
                                        if (oDrugDetail.DrugHeader.PrescriptionItemStatus == CConstants.COMPLETED) {
                                            this.IsCompleted = true;
                                            oChartRow.RowBackground = new SolidColorBrush(Color.FromArgb(255, 185, 251, 114));
                                        }
                                        else {
                                            this.IsGreyedOut = true;
                                            oChartRow.RowBackground = Common.SetSlotColor(String.Empty, this.IsGreyedOut);
                                        }
                                    }
                                    else {
                                        if (oDrugDetail.DrugHeader.PrescriptionItemStatus == CConstants.COMPLETED) {
                                            this.IsCompleted = true;
                                            oChartRow.RowBackground = new SolidColorBrush(Color.FromArgb(255, 185, 251, 114));
                                        }
                                        else if (oDrugDetail.DrugHeader.PrescriptionItemStatus == CConstants.DISCONTINUED) {
                                            if (oDrugDetail.SlotDetails != null && oDrugDetail.SlotDetails.Count > 0) {
                                                let oInfActionCompleted1 = oDrugDetail.SlotDetails.Where(oItem => oItem.Status != null && String.Compare(oItem.Status, SlotStatus.STOPPED, StringComparison.CurrentCultureIgnoreCase) != 0 && String.Compare(oItem.Status, SlotStatus.COMPLETED, StringComparison.CurrentCultureIgnoreCase) != 0 && String.Compare(oItem.Status, SlotStatus.OMITTED, StringComparison.CurrentCultureIgnoreCase) != 0 && String.Compare(oItem.Status, SlotStatus.NOTGIVEN, StringComparison.CurrentCultureIgnoreCase) != 0 && String.Compare(oItem.Status, SlotStatus.NOTKNOWN, StringComparison.CurrentCultureIgnoreCase) != 0);
                                                if (oInfActionCompleted1 != null && oInfActionCompleted1.Count() == 0) {
                                                    this.IsGreyedOut = true;
                                                    oChartRow.RowBackground = Common.SetSlotColor(String.Empty, this.IsGreyedOut);
                                                }
                                            }
                                            else {
                                                this.IsGreyedOut = true;
                                                oChartRow.RowBackground = Common.SetSlotColor(String.Empty, this.IsGreyedOut);
                                            }
                                        }
                                    }
                                }
                                else {
                                    if (oDrugDetail.DrugHeader.PrescriptionItemStatus == CConstants.COMPLETED) {
                                        this.IsCompleted = true;
                                        oChartRow.RowBackground = new SolidColorBrush(Color.FromArgb(255, 185, 251, 114));
                                    }
                                    else if (oDrugDetail.DrugHeader.PrescriptionItemStatus == CConstants.DISCONTINUED) {
                                        this.IsGreyedOut = true;
                                        oChartRow.RowBackground = Common.SetSlotColor(String.Empty, this.IsGreyedOut);
                                    }
                                }
                            }
                        }
                    }
                    else {
                        if (oDrugDetail.SlotDetails != null && oDrugDetail.SlotDetails.Count > 0) {
                            let oInfActionCompleted = oDrugDetail.SlotDetails.Where(oItem => oItem.Status != null && String.Compare(oItem.Status, SlotStatus.STOPPED, StringComparison.CurrentCultureIgnoreCase) != 0 && String.Compare(oItem.Status, SlotStatus.COMPLETED, StringComparison.CurrentCultureIgnoreCase) != 0 && String.Compare(oItem.Status, SlotStatus.OMITTED, StringComparison.CurrentCultureIgnoreCase) != 0 && String.Compare(oItem.Status, SlotStatus.NOTGIVEN, StringComparison.CurrentCultureIgnoreCase) != 0 && String.Compare(oItem.Status, SlotStatus.NOTKNOWN, StringComparison.CurrentCultureIgnoreCase) != 0 && !String.Equals(oItem.Status, SlotStatus.GIVEN, StringComparison.CurrentCultureIgnoreCase) && !String.Equals(oItem.Status, SlotStatus.SELFADMINISTERED, StringComparison.CurrentCultureIgnoreCase));
                            if (oInfActionCompleted != null && oInfActionCompleted.Count() == 0) {
                                if (oDrugDetail.DrugHeader.PrescriptionItemStatus == CConstants.COMPLETED) {
                                    this.IsCompleted = true;
                                    oChartRow.RowBackground = new SolidColorBrush(Color.FromArgb(255, 185, 251, 114));
                                }
                                else {
                                    this.IsGreyedOut = true;
                                    oChartRow.RowBackground = Common.SetSlotColor(String.Empty, this.IsGreyedOut);
                                }
                            }
                            else {
                                if (oDrugDetail.DrugHeader.PrescriptionItemStatus == CConstants.COMPLETED) {
                                    this.IsCompleted = true;
                                    oChartRow.RowBackground = new SolidColorBrush(Color.FromArgb(255, 185, 251, 114));
                                }
                                else if (String.Equals(oDrugDetail.DrugHeader.PrescriptionItemStatus, CConstants.DISCONTINUED, StringComparison.InvariantCultureIgnoreCase)) {
                                    this.IsGreyedOut = true;
                                    oChartRow.RowBackground = Common.SetSlotColor(String.Empty, this.IsGreyedOut);
                                }
                                else if (IsPRN) {
                                    this.nAsRequiredCount++;
                                    oChartRow.RowBackground = new SolidColorBrush(MedChartData.AsRequiredSlotsColor);
                                }
                            }
                        }
                        else {
                            if (oDrugDetail.DrugHeader.PrescriptionItemStatus == CConstants.COMPLETED) {
                                this.IsCompleted = true;
                                oChartRow.RowBackground = new SolidColorBrush(Color.FromArgb(255, 185, 251, 114));
                            }
                            else {
                                this.IsGreyedOut = true;
                                oChartRow.RowBackground = Common.SetSlotColor(String.Empty, this.IsGreyedOut);
                            }
                        }
                    }
                }
                else {
                    if (IsPRN) {
                        this.nAsRequiredCount++;
                        oChartRow.RowBackground = new SolidColorBrush(MedChartData.AsRequiredSlotsColor);
                    }
                }
            }
            else {
                if (oDrugDetail.DrugHeader.PrescriptionItemStatus == CConstants.DISCONTINUED || oDrugDetail.DrugHeader.PrescriptionItemStatus == CConstants.COMPLETED || oDrugDetail.DrugHeader.PrescriptionItemStatus == CConstants.CANCELLED) {
                    if (oDrugDetail.DrugHeader.PrescriptionItemStatus == CConstants.COMPLETED) {
                        this.IsCompleted = true;
                        oChartRow.RowBackground = new SolidColorBrush(Color.FromArgb(255, 185, 251, 114));
                    }
                    else {
                        this.IsGreyedOut = true;
                        oChartRow.RowBackground = Common.SetSlotColor(String.Empty, this.IsGreyedOut);
                    }
                }
                else {
                    if (IsPRN) {
                        this.nAsRequiredCount++;
                        oChartRow.RowBackground = new SolidColorBrush(MedChartData.AsRequiredSlotsColor);
                    }
                }
            }
            if (oDrugDetail.DrugHeader.IngredientWarning != null && oDrugDetail.DrugHeader.IngredientWarning.Count > 0) {
                oChartRow.DrugItem.AdminWarningMessage = String.Join("\n", oDrugDetail.DrugHeader.IngredientWarning.ToArray());
            }
            if (this.oChartTypeSelected == ChartType.Medication_Chart) {

            }
            let ColKey: number = 0;
            if (this.oChartTypeSelected == ChartType.Prescription_Chart) {
                ColKey = 3;
            }
            else {
                ColKey = 2;
            }
            let nTempCnt: number = 0;
            let nSlotCnt: number = 0;
            let oChartCells: ObservableCollection<ChartCell> = new ObservableCollection<ChartCell>(); //TODO needs to be implemented like ChartRow
            this.MaxRowDoseHeightValue = 0;
            let AdSlot = oDrugDetail.SlotDetails.Where(s => !String.IsNullOrEmpty(s.Status) && (String.Equals(s.Status, SlotStatus.GIVEN) || String.Equals(s.Status, SlotStatus.SELFADMINISTERED)));
            let HistoryAvailSlot = oDrugDetail.SlotDetails.Where(s => s.AdministrationDetail != null && !String.IsNullOrEmpty(s.Status) && (String.Equals(s.Status, SlotStatus.GIVEN) || String.Equals(s.Status, SlotStatus.SELFADMINISTERED)) && s.AdministrationDetail.IsHistoryExists);
            let IsHistExist: boolean = false;
            if ((this.oChartTypeSelected == ChartType.Prescription_Chart || this.oChartTypeSelected == ChartType.Medication_Overview_Chart) && MedChartData.Is7DayView) {
                if (AdSlot != null && AdSlot.Count() > 0) {
                    this.IsAdmDrug = true;
                }
                else {
                    this.IsAdmDrug = false;
                }
                if (HistoryAvailSlot != null && HistoryAvailSlot.Count() > 0) {
                    IsHistExist = true;
                }
                else {
                    IsHistExist = false;
                }
            }
            if ((this.oChartTypeSelected == ChartType.Prescription_Chart && (IsPRN && String.Equals(oDrugDetail.DrugHeader.DoseType, DoseTypeCode.CONDITIONAL, StringComparison.CurrentCultureIgnoreCase)) && MedChartData.Is7DayView) || (this.IsAdmDrug && String.Equals(oDrugDetail.DrugHeader.DoseType, DoseTypeCode.CONDITIONAL, StringComparison.CurrentCultureIgnoreCase))) {
                this.MaxRowDoseHeightValue = 80.0;
            }
            else if ((this.oChartTypeSelected == ChartType.Prescription_Chart && (IsPRN || String.Compare(oDrugDetail.DrugHeader.DoseType, DoseTypeCode.STEPPEDVARIABLE, StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(oDrugDetail.DrugHeader.DoseType, DoseTypeCode.TITRATED, StringComparison.CurrentCultureIgnoreCase) == 0) && MedChartData.Is7DayView) || this.IsAdmDrug) {
                this.MinSlotHeight = 65;
                let oSlots = oDrugDetail.SlotDetails.Where(s => s.Dose != null && s.Dose.length > 0 && s.DoseUOM.length > 0 && s.InfusionRate != null && s.InfusionRate.length > 0 && s.InfRateUOM != null && s.InfRatePerUOM != null);
                if (oSlots != null && oSlots.Count() > 0) {
                    let q = oDrugDetail.SlotDetails.Where(s => s.Dose != null && s.Dose.length > 0 && s.DoseUOM.length > 0 && s.InfusionRate != null && s.InfusionRate.length > 0 && s.InfRateUOM != null && s.InfRatePerUOM != null).OrderByDescending(s => (s.Dose + " " + s.DoseUOM + Environment.NewLine + s.InfusionRate + " " + s.InfRateUOM.UOMName + "/" + s.InfRatePerUOM.UOMName).length).FirstOrDefault();
                    if (q != null) {
                        this.MaxRowDoseHeightValue = this.GetTextHeight(q.Dose + "-" + q.UpperDose + " " + q.DoseUOM + Environment.NewLine + q.InfusionRate + "-" + q.InfUpperRate + " " + q.InfRateUOM.UOMName + "/" + q.InfRatePerUOM.UOMName);
                    }
                }
                else {
                    let q = oDrugDetail.SlotDetails.Where(s => s.Dose != null && s.Dose.length > 0 && s.DoseUOM.length > 0).OrderByDescending(s => (s.Dose + " " + s.DoseUOM).length).FirstOrDefault();
                    if (q != null) {
                        this.MaxRowDoseHeightValue = this.GetTextHeight(q.Dose+ "-" + q.UpperDose + " " + q.DoseUOM);
                        if (this.IsAdmDrug && !IsHistExist) {
                            this.MaxRowDoseHeightValue = this.MaxRowDoseHeightValue + 2;
                        }
                        else if (this.IsAdmDrug && IsHistExist) {
                            this.MaxRowDoseHeightValue = this.MaxRowDoseHeightValue + 4;
                        }
                    }
                }
            }
            else if (this.oChartTypeSelected == ChartType.Medication_Chart && (String.Compare(oDrugDetail.DrugHeader.DoseType, DoseTypeCode.STEPPEDVARIABLE, StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(oDrugDetail.DrugHeader.DoseType, DoseTypeCode.TITRATED, StringComparison.CurrentCultureIgnoreCase) == 0)) {
                this.MaxRowDoseHeightValue = 80.0;
            }
            if (this.oChartTypeSelected == ChartType.Medication_Chart && this.IsAllMultiSlotForRow(StartDTTM, EndDTTM, oDrugDetail)) {
                this.nMaxSlotCount = 1;
            }
            else {
                if (this.oChartTypeSelected == ChartType.Prescription_Chart && IsPRN && !IsPRNWithSchedule) {
                    this.nMaxSlotCount = 1;
                }
                else {
                    this.nMaxSlotCount = this.GetMaximumSlotForRow(StartDTTM, EndDTTM, oDrugDetail);
                }
                if (IsPRN && !IsPRNWithSchedule) {
                    this.IsOverviewPRNSlot = true;
                    if (DateTime.LessThanOrEqualTo(oDrugDetail.DrugHeader.StartDate.Date , StartDTTM.Date))
                        this.dtOverviewPRNStartDate = StartDTTM;
                    else this.dtOverviewPRNStartDate = oDrugDetail.DrugHeader.StartDate;
                    if (DateTime.NotEquals(oDrugDetail.DrugHeader.EndDate.Date , DateTime.MinValue) && DateTime.GreaterThanOrEqualTo(EndDTTM.Date , oDrugDetail.DrugHeader.EndDate.Date))
                        this.dtOverviewPRNEndDate = oDrugDetail.DrugHeader.EndDate;
                    else this.dtOverviewPRNEndDate = EndDTTM;
                }
                else {
                    this.IsOverviewPRNSlot = false;
                    this.dtOverviewPRNStartDate = this.dtOverviewPRNEndDate = DateTime.MinValue;
                }
            }
            let lstTimeSpanSortedDetails: List<TimeSlot> = null; // TODO needs to be implemented in platform
            if (this.oChartTypeSelected == ChartType.Prescription_Chart || this.oChartTypeSelected == ChartType.Medication_Overview_Chart || this.oChartTypeSelected == ChartType.Medication_Chart) {
                oChartRow.TimeSlots = this.CreateDrugItemTimeSlots(oDrugDetail, StartDTTM, EndDTTM, IsPRN, nPrescriptionItemOID, (o) => { lstTimeSpanSortedDetails = o; });
            }
            if (oDrugDetail.DrugHeader.IsInfusion) {
                if (String.Compare(oDrugDetail.DrugHeader.InfusionType, InfusionTypeCode.INTERMITTENT, StringComparison.CurrentCultureIgnoreCase) == 0) {
                    oDrugDetail.SlotDetails.forEach( (oSlot)=> {
                        if (oSlot.AdministrationDetail != null && ((oSlot.AdministrationDetail.oInfusionAdminDetail != null && oSlot.AdministrationDetail.oInfusionAdminDetail.Count > 0) || (oSlot.AdministrationDetail.IsAdministeredOnInfusionChart && itemMRtype == MultiRouteType.Mixed_Routes))) {
                            oSlot.AdministrationDetail.InfusionStartDate = oSlot.ScheduledDTTM;
                            oSlot.AdministrationDetail.InfusionEndDate = oSlot.ScheduledDTTM;
                        }
                    });
                }
                else {
                    oDrugDetail.SlotDetails.forEach( (oSlot)=> {
                        if (oSlot.AdministrationDetail != null && oSlot.AdministrationDetail.oInfusionAdminDetail != null && oSlot.AdministrationDetail.oInfusionAdminDetail.Count > 0) {
                            oSlot.AdministrationDetail.InfusionStartDate = oSlot.AdministrationDetail.oInfusionAdminDetail.Min(x => x.ActionStartDate).ActionStartDate; //TODO inform Siva R. Max is there, but min needs to be implemented
                            if (oSlot.Status == SlotStatus.INPROGRESS || oSlot.Status == SlotStatus.PAUSED)
                                oSlot.AdministrationDetail.InfusionEndDate = CommonBB.GetServerDateTime();
                            else oSlot.AdministrationDetail.InfusionEndDate = oSlot.AdministrationDetail.oInfusionAdminDetail.Max(x => x.ActionStartDate);
                        }
                    });
                }
            }
            let isMedChart: boolean = false;
            if (this.oChartTypeSelected == ChartType.Medication_Chart && !String.IsNullOrEmpty(oDrugDetail.DrugHeader.DoseType) && (oDrugDetail.DrugHeader.DoseType == DoseTypeCode.STEPPEDVARIABLE)) {
                if (this.IsSteppedDoseAllMultiSlotForRow(StartDTTM, EndDTTM, oDrugDetail)) {
                    isMedChart = false;
                }
                else {
                    isMedChart = true;
                }
            }
            let isSequentialEmptySlotExists: boolean = false;
            if (oDrugDetail.DrugHeader.IsInfusion && oDrugDetail.DrugHeader.FormViewParameters.IntravenousInfusionData.ParentPrescriptionItemOID != 0 && oDrugDetail.DrugHeader.FormViewParameters.IntravenousInfusionData.InfusionSeqOrder != 0) {
                let oSequentialEmptySlots = oDrugDetail.SlotDetails.Where(s => s.OID == 0).Select(x => x);
                if (oDrugDetail.SlotDetails.Count > 0 && oSequentialEmptySlots != null && oDrugDetail.SlotDetails.Count == oSequentialEmptySlots.Count()) {
                    isSequentialEmptySlotExists = true;
                    if (lstTimeSpanSortedDetails == null)
                        lstTimeSpanSortedDetails = new List<TimeSlot>();
                    lstTimeSpanSortedDetails.Add(ObjectHelper.CreateObject(new TimeSlot(), { Key: "TimeSlot-Temp", SlotTime: "00:00" }));
                }
            }
            while (DateTime.LessThanOrEqualTo(StartDTTM , EndDTTM)) {
                if (oDrugDetail.SlotDetails != null) {
                    if (oDrugDetail.DrugHeader.IsInfusion && oDrugDetail.SlotDetails.Count > 0) {
                        //let tmpSlots1: IEnumerable<SlotDetail> = null, tmpSlots2 = null, InfSlots = null; //TODO already noted, class will be commented
                        
                        let tmpSlots1 = oDrugDetail.SlotDetails.Where(
                                        (oSlot) => 
                                        oSlot.ScheduledDTTM.ToUserDateTime().Date.Equals(StartDTTM.Date)
                                            && oSlot.Status!=SlotStatus.INPROGRESS
                                            && oSlot.Status!=SlotStatus.PAUSED
                                            && oSlot.Status!=SlotStatus.STOPPED
                                            && oSlot.Status!=SlotStatus.COMPLETED
                                        ).Select((lstSlotDetails) => lstSlotDetails);

                        // tmpSlots1 = oDrugDetail.SlotDetails.Where(oSlot =>oSlot.ScheduledDTTM.ToUserDateTime().Date.Equals(StartDTTM.Date)
                        // &&oSlot.Status!=SlotStatus.INPROGRESS&&oSlot.Status!=SlotStatus.PAUSED&&oSlot.Status!=SlotStatus.STOPPED&&oSlot.Status!=SlotStatus.COMPLETED).Select(oSlot => oSlot);
                        
                        let tmpSlots2 = oDrugDetail.SlotDetails.Where(
                                        (x) => 
                                        x.AdministrationDetail != null 
                                            && (x.Status == SlotStatus.INPROGRESS || x.Status == SlotStatus.PAUSED || x.Status == SlotStatus.STOPPED || x.Status == SlotStatus.COMPLETED) 
                                            && DateTime.GreaterThanOrEqualTo(StartDTTM.Date, x.AdministrationDetail.InfusionStartDate.Date)
                                            && DateTime.LessThanOrEqualTo(StartDTTM.Date, x.AdministrationDetail.InfusionEndDate.Date)).Select(x => x);
                        
                        var InfSlots: IEnumerable<SlotDetail>;
                        if (tmpSlots1 != null && tmpSlots2 != null)
                            InfSlots = tmpSlots1.Concat(tmpSlots2).OrderBy(s => s.ScheduledDTTM); //TODO inform Siva R, method need to be implemented
                        else if (tmpSlots1 != null)
                            InfSlots = tmpSlots1;
                        else 
                            InfSlots = tmpSlots2;
                            
                        if (InfSlots != null) {
                            let nTempMultiSlotDueCount: number = 0;
                            let nTempMultiSlotOverdueCount: number = 0;
                            oChartCells.Add(this.CreateSlotForOneDay(nPrescriptionItemOID, ColKey, StartDTTM, InfSlots.ToList(), IsPRN, oDrugDetail.DrugHeader.DoseType, PrescriptionStartDTTM, PrescriptionEndDTTM, lstTimeSpanSortedDetails, oDrugDetail.DrugHeader.IsConflictExists, oDrugDetail.DrugHeader, IsPRNWithSchedule, (o1) => { nTempMultiSlotDueCount = o1; }, (o2) => { nTempMultiSlotOverdueCount = o2; }, isMedChart));                            nMultiSlotDueCount = nMultiSlotDueCount + nTempMultiSlotDueCount;
                            nMultiSlotOverdueCount = nMultiSlotOverdueCount + nTempMultiSlotOverdueCount;
                        }
                    }
                    else {
                        let qrySlotDetails = oDrugDetail.SlotDetails.Where(
                                        (lstSlotDetails) => 
                                        lstSlotDetails.ScheduledDTTM.ToUserDateTime().Date.Equals(StartDTTM.Date)
                                        ).Select((lstSlotDetails) => lstSlotDetails);
                        
                        if (qrySlotDetails != null) {
                            let nTempMultiSlotDueCount: number = 0;
                            let nTempMultiSlotOverdueCount: number = 0;
                            oChartCells.Add(this.CreateSlotForOneDay(nPrescriptionItemOID, ColKey, StartDTTM, qrySlotDetails.ToList(), IsPRN, oDrugDetail.DrugHeader.DoseType, PrescriptionStartDTTM, PrescriptionEndDTTM, lstTimeSpanSortedDetails, oDrugDetail.DrugHeader.IsConflictExists, oDrugDetail.DrugHeader, IsPRNWithSchedule, (o1) => { nTempMultiSlotDueCount = o1; }, (o2) => { nTempMultiSlotOverdueCount = o2; }, isMedChart));
                            nMultiSlotDueCount = nMultiSlotDueCount + nTempMultiSlotDueCount;
                            nMultiSlotOverdueCount = nMultiSlotOverdueCount + nTempMultiSlotOverdueCount;
                            if (this.oChartTypeSelected != ChartType.Medication_Chart) {
                                if (this.oChartTypeSelected == ChartType.Prescription_Chart && IsPRN && !IsPRNWithSchedule) {
                                    nSlotCnt = nTempCnt = 1;
                                }
                                else {
                                    if (nTempCnt == 0)
                                        nSlotCnt = nTempCnt = qrySlotDetails.Count();
                                    else if (qrySlotDetails.Count() > nTempCnt)
                                        nSlotCnt = qrySlotDetails.Count();
                                }
                            }
                        }
                    }
                }
                ColKey++;
                StartDTTM = StartDTTM.AddDays(1);
            }
            if (isSequentialEmptySlotExists) {
                lstTimeSpanSortedDetails.Clear();
                lstTimeSpanSortedDetails = new List<TimeSlot>();
            }
            oChartRow.ChartCells = oChartCells;
            let oTempTagDrugHeaderDetail: TagDrugHeaderDetail = ObjectHelper.CreateType<TagDrugHeaderDetail>(oChartRow.DrugItem.Tag, TagDrugHeaderDetail);
            if (oTempTagDrugHeaderDetail != null) {
                oTempTagDrugHeaderDetail.DueSlotCount = nMultiSlotDueCount;
                oTempTagDrugHeaderDetail.OverdueSlotCount = nMultiSlotOverdueCount;
                if (oDrugDetail.SlotDetails != null && oDrugDetail.SlotDetails.Count > 0 && DateTime.Equals(oTempTagDrugHeaderDetail.InfInProgressSlotDTTM, DateTime.MinValue) && oDrugDetail.DrugHeader.IsInfusion) {
                    let tmpInProgressItem = oDrugDetail.SlotDetails.Where(x => DateTime.LessThan(x.ScheduledDTTM.Date,this.StartDate.Date) && (x.Status == SlotStatus.INPROGRESS || x.Status == SlotStatus.PAUSED));
                    if (tmpInProgressItem != null && tmpInProgressItem.Count() > 0) {
                        oTempTagDrugHeaderDetail.InfInProgressSlotDTTM = tmpInProgressItem.First().ScheduledDTTM;
                    }
                }
            }
            return oChartRow;
        }
        public GetTempSlot(SlotDetails: ObservableCollection<SlotDetail>,  StartDTTM: DateTime,  out1: (tmpSlots1: IEnumerable<SlotDetail>) => void, out2: (tmpSlots2: IEnumerable<SlotDetail>) => void): void {

            let tmpSlots1: IEnumerable<SlotDetail>;
            let tmpSlots2: IEnumerable<SlotDetail>;

                        let slots: ObservableCollection<SlotDetail> = ObjectHelper.CreateType<ObservableCollection<SlotDetail>>(SlotDetails.Where(x => x.Status != "CC_DELETED").Select(x => x), ObservableCollection<SlotDetail> );
                        {
                            tmpSlots1 = SlotDetails.Where(oSlot =>DateTime.Equals(oSlot.ScheduledDTTM.ToUserDateTime().Date,StartDTTM.Date) &&oSlot.Status!=SlotStatus.INPROGRESS&&oSlot.Status!=SlotStatus.PAUSED&&oSlot.Status!=SlotStatus.STOPPED&&oSlot.Status!=SlotStatus.COMPLETED).Select(oSlot => oSlot);
                            /* tmpSlots1 = from oSlot in SlotDetails
                            where oSlot.ScheduledDTTM.ToUserDateTime().Date == StartDTTM.Date &&
                                oSlot.Status != SlotStatus.INPROGRESS && oSlot.Status != SlotStatus.PAUSED && oSlot.Status != SlotStatus.STOPPED && oSlot.Status != SlotStatus.COMPLETED
                            select oSlot; */
                            tmpSlots2 = SlotDetails.Where(x => x.AdministrationDetail != null && (x.Status == SlotStatus.INPROGRESS || x.Status == SlotStatus.PAUSED || x.Status == SlotStatus.STOPPED || x.Status == SlotStatus.COMPLETED) && DateTime.GreaterThanOrEqualTo(StartDTTM.Date, x.AdministrationDetail.InfusionStartDate.Date) && DateTime.LessThanOrEqualTo(StartDTTM.Date, x.AdministrationDetail.InfusionEndDate.Date)).Select(x => x);
                        }

             out1(tmpSlots1);
            out2(tmpSlots2);
        }
        public CreateDrugItemTimeSlots(oDrugDetail: DrugDetail,  dStartDTTM: DateTime,  dEndDTTM: DateTime,  bIsPRN: boolean,  nPrescriptionItemOID: number, out1: (lstTimeSpanSortedDetails: List<TimeSlot>) => void): ObservableCollection<TimeSlot> {
            let lstTimeSpanSortedDetails: List<TimeSlot>;

                        let oTimeSlots: ObservableCollection<TimeSlot> = null;
                        lstTimeSpanSortedDetails = new List<TimeSlot>();
                        let oSlotDetails: ObservableCollection<SlotDetail> = null;
                        let isSteppedVal: boolean = false;
                        if (oDrugDetail != null && oDrugDetail.SlotDetails != null) {
                            oSlotDetails = oDrugDetail.SlotDetails;
                        }
                        if (oDrugDetail != null && oDrugDetail.DrugHeader != null && !String.IsNullOrEmpty(oDrugDetail.DrugHeader.DoseType) && (oDrugDetail.DrugHeader.DoseType == DoseTypeCode.STEPPEDVARIABLE || oDrugDetail.DrugHeader.DoseType == DoseTypeCode.TITRATED)) {
                            isSteppedVal = true;
                        }
                        if (!bIsPRN || (bIsPRN && oDrugDetail.DrugHeader.IsPRNWithSchedule)) {
                            if (oSlotDetails != null && oSlotDetails.Count > 0) {
                                let qrySlotTimingDetails: List<TimeSpan>;
                                if ((oDrugDetail != null && oDrugDetail.DrugHeader != null && oDrugDetail.DrugHeader.IsInfusion) && ((!String.IsNullOrEmpty(oDrugDetail.DrugHeader.InfusionType) && (String.Equals(oDrugDetail.DrugHeader.InfusionType, InfusionTypesCode.CONTINUOUS, StringComparison.CurrentCultureIgnoreCase) || String.Equals(oDrugDetail.DrugHeader.InfusionType, InfusionTypesCode.PCA, StringComparison.CurrentCultureIgnoreCase) || String.Equals(oDrugDetail.DrugHeader.InfusionType, InfusionTypesCode.SINGLEDOSEVOLUME, StringComparison.CurrentCultureIgnoreCase) || String.Equals(oDrugDetail.DrugHeader.InfusionType, InfusionTypesCode.FLUID, StringComparison.CurrentCultureIgnoreCase))) || String.Equals(oDrugDetail.DrugHeader.ItemSubType, InfusionTypesCode.SUBTYPE_GAS, StringComparison.CurrentCultureIgnoreCase))) {
                                    qrySlotTimingDetails = oSlotDetails.Where(s => DateTime.NotEquals(s.ScheduledDTTM,DateTime.MinValue) && s.OID > 0).Select(s => s.ScheduledDTTM.ToUserDateTime().TimeOfDay).ToList();
                                }
                                else {
                                    qrySlotTimingDetails = oSlotDetails.Where(oSlotDetail =>DateTime.GreaterThanOrEqualTo(oSlotDetail.ScheduledDTTM.Date,dStartDTTM.Date)&& DateTime.LessThanOrEqualTo(oSlotDetail.ScheduledDTTM.Date,dEndDTTM.Date)).Select(oSlotDetail => oSlotDetail.ScheduledDTTM.ToUserDateTime().TimeOfDay).ToList();
                                    /* qrySlotTimingDetails = (from oSlotDetail in oSlotDetails
                                    where oSlotDetail.ScheduledDTTM.Date >= dStartDTTM.Date &&
                                        oSlotDetail.ScheduledDTTM.Date <= dEndDTTM.Date
                                    select oSlotDetail.ScheduledDTTM.ToUserDateTime().TimeOfDay).ToList(); */
                                }
                                let _TmpSlotsAt1AM = oSlotDetails.Where(oSlotDetail =>DateTime.GreaterThanOrEqualTo(oSlotDetail.ScheduledDTTM.Date,dStartDTTM.Date)&& DateTime.LessThanOrEqualTo(oSlotDetail.ScheduledDTTM.Date,dEndDTTM.Date)&&oSlotDetail.ScheduledDTTM.TimeOfDay.Hours==1).Select(oSlotDetail => oSlotDetail.ScheduledDTTM);
                                /* let _TmpSlotsAt1AM = from oSlotDetail in oSlotDetails
                                where oSlotDetail.ScheduledDTTM.Date >= dStartDTTM.Date &&
                                    oSlotDetail.ScheduledDTTM.Date <= dEndDTTM.Date
                                    && oSlotDetail.ScheduledDTTM.TimeOfDay.Hours == 1
                                select oSlotDetail.ScheduledDTTM; */
                                let _TmpAmbiguousTimes: List<TimeSpan> = new List<TimeSpan>();
                                _TmpSlotsAt1AM.forEach( (dt)=> {
                                    if (TimeZoneInfo.Local.IsDSTWithInAmbiguousTime(dt) && TimeZoneInfo.Local.IsAmbiguousTime(dt) && !_TmpAmbiguousTimes.Contains(dt.TimeOfDay)) {
                                        _TmpAmbiguousTimes.Add(dt.TimeOfDay);
                                    }
                                });
                                if (qrySlotTimingDetails != null && qrySlotTimingDetails.Count > 0) {
                                    if (oDrugDetail != null && oDrugDetail.DrugHeader != null && !String.IsNullOrEmpty(oDrugDetail.DrugHeader.AdministrationTimes)) {
                                        let _ScheduleTimes: string[] = oDrugDetail.DrugHeader.AdministrationTimes.Split(';');
                                        if (_ScheduleTimes != null && _ScheduleTimes.length > 0) {
                                            let _ScheduleTimeCount: number = _ScheduleTimes.length;
                                            for (let i: number = 0; i < _ScheduleTimeCount; i++) {
                                                let _ScheduleTime: number;
                                                if (!String.IsNullOrEmpty(_ScheduleTimes[i]) && Number.TryParse(_ScheduleTimes[i], (o) => { _ScheduleTime = o; })) {
                                                    if (_ScheduleTime >= 1440) {
                                                        _ScheduleTime = (_ScheduleTime % 1440);
                                                    }
                                                    let _tsScheduleTime: TimeSpan = TimeSpan.FromMinutes(_ScheduleTime);
                                                    if (!qrySlotTimingDetails.Contains(_tsScheduleTime)) {
                                                        qrySlotTimingDetails.Add(_tsScheduleTime);
                                                    }
                                                }
                                            }
                                        }
                                    }
                    let qryTimeSpanSortedDetails_TotalMilliseconds = qrySlotTimingDetails.Distinct_list(x=>x.TotalMilliseconds).OrderBy(dt => dt);
                    let qryTimeSpanSortedDetails = [];
                    qryTimeSpanSortedDetails_TotalMilliseconds.forEach(x=>{
                        let y= new TimeSpan(x);
                        qryTimeSpanSortedDetails.push(y);
                    })
                                    let nCounter: number = 1;
                                    oTimeSlots = new ObservableCollection<TimeSlot>();
                                    if (this.IsSteppedDoseAllMultiSlotForRow(dStartDTTM, dEndDTTM, oDrugDetail) && this.oChartTypeSelected == ChartType.Medication_Chart) {
                                        oTimeSlots = null;
                                    }
                                    else {
                                        if (qryTimeSpanSortedDetails != null && qryTimeSpanSortedDetails.length > this.nMaxSlotCount)
                                            this.nMaxSlotCount = qryTimeSpanSortedDetails.length;
                                        qryTimeSpanSortedDetails.forEach( (slotScheduleTime)=> {
                                            if (_TmpAmbiguousTimes != null && _TmpAmbiguousTimes.Count > 0) {
                                                let _TmpDSTTimesLTStdTime: any = _TmpAmbiguousTimes.Where(oTime => DateTime.LessThanOrEqualTo(oTime.Hours,slotScheduleTime.Hours)).Select(oTime => oTime);
                                                /* let _TmpDSTTimesLTStdTime: IEnumerable<TimeSpan> = from oTime in _TmpAmbiguousTimes
                                                //where oTime.Ticks <= slotScheduleTime.Ticks
                                                where oTime.Hours <= slotScheduleTime.Hours
                                                select oTime; */
                                                //TODO solution provided by Munavar. Technically below code is not required
                                                _TmpDSTTimesLTStdTime = new List<TimeSpan>(_TmpDSTTimesLTStdTime); // Generated code, but gave error and implemented as suggested by Munavar in the next line
                                                //TODO ask Munavar again
                                                //_TmpDSTTimesLTStdTime = new IEnumerable<TimeSpan>((new List<TimeSpan>(_TmpDSTTimesLTStdTime)).array);
                                                if (_TmpDSTTimesLTStdTime != null && _TmpDSTTimesLTStdTime.Count > 0) {
                                                    if ((qryTimeSpanSortedDetails.length + _TmpDSTTimesLTStdTime.Count) > this.nMaxSlotCount)
                                                        this.nMaxSlotCount = (qryTimeSpanSortedDetails.length + _TmpDSTTimesLTStdTime.Count);
                                                    _TmpDSTTimesLTStdTime.forEach( (oTmpTimeSpan)=> {
                                                        oTimeSlots.Add(this.CreateTimeSlot(nPrescriptionItemOID, nCounter, bIsPRN, oTmpTimeSpan, isSteppedVal, true, oDrugDetail.DrugHeader.IsPRNWithSchedule));
                                                        lstTimeSpanSortedDetails.Add(this.CreateTimeSlot(nPrescriptionItemOID, nCounter, bIsPRN, oTmpTimeSpan, isSteppedVal, true, oDrugDetail.DrugHeader.IsPRNWithSchedule));
                                                        nCounter++;
                                                        _TmpAmbiguousTimes.Remove(oTmpTimeSpan);
                                                    });
                                                }
                                            }
                                            oTimeSlots.Add(this.CreateTimeSlot(nPrescriptionItemOID, nCounter, bIsPRN, slotScheduleTime, isSteppedVal, false, oDrugDetail.DrugHeader.IsPRNWithSchedule));
                                            lstTimeSpanSortedDetails.Add(this.CreateTimeSlot(nPrescriptionItemOID, nCounter, bIsPRN, slotScheduleTime, isSteppedVal, false, oDrugDetail.DrugHeader.IsPRNWithSchedule));
                                            nCounter++;
                                        });
                                        if (oSlotDetails.LastOrDefault().ScheduledDTTM.ToUserDateTimeString(CConstants.DateTimeFormat).Contains("DST") && oTimeSlots.Count > 0 && lstTimeSpanSortedDetails.Count > 0) {
                                            oTimeSlots.RemoveAt(oTimeSlots.Count - 1);
                                            lstTimeSpanSortedDetails.RemoveAt(lstTimeSpanSortedDetails.Count - 1); //TODO removeat based on index to be implemented by platform
                                        }
                                    }
                                }
                            }
                        }
                        if (oTimeSlots == null)
                            oTimeSlots = this.CreateEmptyTimeSlots(nPrescriptionItemOID, bIsPRN, isSteppedVal, oDrugDetail.DrugHeader.IsPRNWithSchedule);
                        out1(lstTimeSpanSortedDetails);
                        return oTimeSlots;
            }
        public CreateEmptyTimeSlots(nPrescriptionItemOID: number, isPRN: boolean, isStepTit: boolean, IsPRNWithSchedule: boolean): ObservableCollection<TimeSlot> {
            let oTimeSlots: ObservableCollection<TimeSlot> = new ObservableCollection<TimeSlot>();
            let nTimeSlots: number = (this.oChartTypeSelected == ChartType.Medication_Chart && isPRN && !IsPRNWithSchedule) ? 1 : (this.nMaxSlotCount > 0 ? this.nMaxSlotCount : 1);
            for (let j: number = 0; j < nTimeSlots; j++) {
                oTimeSlots.Add(this.CreateTimeSlot(nPrescriptionItemOID, j, isPRN, TimeSpan.MinValue, isStepTit, false, IsPRNWithSchedule));
            }
            return oTimeSlots;
        }
        public CreateTimeSlot(nPrescriptionItemOID: number, nCounter: number, bIsPRN: boolean, slotScheduleTime: TimeSpan, isStepTit: boolean, isAmbiguous: boolean, IsPRNWithSchedule: boolean): TimeSlot {
            let oTimeSlot: TimeSlot = new TimeSlot();
            oTimeSlot.Key = "TimeSlot-" + nPrescriptionItemOID + "-" + nCounter;
            if ((!bIsPRN || (bIsPRN && IsPRNWithSchedule)) && slotScheduleTime != TimeSpan.MinValue) {
                if (isAmbiguous) {
                    oTimeSlot.SlotTime = slotScheduleTime.ToString("HH:mm") + " DST"; // To Be revisited 12 hrs format - Sangeetha
                    oTimeSlot.Tag = "DST";
                }
                else oTimeSlot.SlotTime = slotScheduleTime.ToString("HH:mm"); // To Be revisited 12 hrs format - Sangeetha
            }
            if (isStepTit && this.oChartTypeSelected == ChartType.Medication_Chart) {
                this.MinSlotHeight = 80;
                oTimeSlot.SlotHeight = this.CalculateSlotHeight(this.MinSlotHeight);
            }
            else {
                if (this.oChartTypeSelected == ChartType.Medication_Chart && bIsPRN && !IsPRNWithSchedule)
                    oTimeSlot.SlotHeight = this.MinRowHeight;
                else oTimeSlot.SlotHeight = this.MaxRowDoseHeightValue > 0 ? this.MinSlotHeight + this.MaxRowDoseHeightValue : this.CalculateSlotHeight(this.nMaxSlotCount);
            }
            oTimeSlot.FontWeightTime = FontWeights.Bold;
            if (this.IsGreyedOut)
                oTimeSlot.BackGroundColor = Common.SetSlotColor(String.Empty, this.IsGreyedOut);
            else if (this.IsCompleted)
                oTimeSlot.BackGroundColor = new SolidColorBrush(Color.FromArgb(255, 185, 251, 114));
            return oTimeSlot;
        }
        public GetDrugHeader(oDrugHeader: DrugHeader): DrugItem { //TODO Thyagu also facing same issue. Needs to discuss and sort
            let sDrugNameCaseCode: string = String.Empty;
            let sDosageFormCaseCode: string = String.Empty;
            this.IsTitrated = false;
            this.IsSteppedTitrated = false;
            let oDrugItem: DrugItem = new DrugItem(); // TODO Sangeetha LorArcBlueBirdMedicationChart
            oDrugItem.Key = oDrugHeader.PrescriptionItemOID.ToString();
            let IsNotMedChartMixedMultiRouteItem: boolean = true;
            let itemMRtype: MultiRouteType ;
            // itemMRtype = Enum.Parse(MultiRouteType,oDrugHeader.MultiRouteType.ToString(), true);
            itemMRtype = oDrugHeader.MultiRouteType;
            //if (Enum.TryParse<MultiRouteType>(oDrugHeader.MultiRouteType.ToString(), out itemMRtype))
            //if (Enum.TryParse<MultiRouteType>(oDrugHeader.MultiRouteType.ToString(), (o) => { itemMRtype = o; })) //TODO inform Siva R, platfrom needs to implement
            if (itemMRtype)
                IsNotMedChartMixedMultiRouteItem = ((MultiRouteType.Mixed_Routes == itemMRtype) && (this.oChartTypeSelected == ChartType.Medication_Chart)) ? false : true;
            if (this.oMLD.objLineDisConfig != null) {
                let iCnt: number = 0, TCnt = this.oMLD.objLineDisConfig.Count;
                let iCounter: number = 0;
                for (iCnt = 0; iCnt < TCnt; iCnt++) {
                    switch (this.oMLD.objLineDisConfig[iCnt].FieldCode) {
                        case "CC_DRUGNAME":
                            if (this.oMLD.objLineDisConfig[iCnt].IsSelected == 1 && !String.IsNullOrEmpty(oDrugHeader.DrugName) && !String.IsNullOrEmpty(this.oMLD.objLineDisConfig[iCnt].CaseCode)) {
                                if (String.Compare(this.oMLD.objLineDisConfig[iCnt].CaseCode, "CC_MLDUPPER") == 0)
                                    sDrugNameCaseCode = "CC_MLDUPPER";
                                else if (String.Compare(this.oMLD.objLineDisConfig[iCnt].CaseCode, "CC_MLDLOWER") == 0)
                                    sDrugNameCaseCode = "CC_MLDLOWER";
                            }
                            iCounter++;
                            break;
                        case "CC_FORM":
                            if (this.oMLD.objLineDisConfig[iCnt].IsSelected == 1 && !String.IsNullOrEmpty(oDrugHeader.DosageForm) && !String.IsNullOrEmpty(this.oMLD.objLineDisConfig[iCnt].CaseCode)) {
                                if (String.Compare(this.oMLD.objLineDisConfig[iCnt].CaseCode, "CC_MLDUPPER") == 0)
                                    sDosageFormCaseCode = "CC_MLDUPPER";
                                else if (String.Compare(this.oMLD.objLineDisConfig[iCnt].CaseCode, "CC_MLDLOWER") == 0)
                                    sDosageFormCaseCode = "CC_MLDLOWER";
                            }
                            iCounter++;
                            break;
                    }
                    if (iCounter == 2)
                        break;
                }
            }
            oDrugItem.IsInfusion = oDrugHeader.IsInfusion;
            let oTagDrugHeaderDetail: TagDrugHeaderDetail = this.CreateTagDrugHeaderObject(oDrugHeader);
            oDrugItem.Tag = oTagDrugHeaderDetail;
            if (String.Compare(oDrugHeader.ItemSubType, CConstants.ItemSubType, StringComparison.CurrentCultureIgnoreCase) == 0 && oDrugHeader.MultiComponentItems != null) {
                if (String.Equals(oDrugHeader.LorenzoID, CConstants.ADHOC_ITEM_LORENZOID, StringComparison.CurrentCultureIgnoreCase)) {
                    if (oDrugHeader.MultiComponentItems.Count > 5) {
                        this.SetChartDrugHeaderName(sDrugNameCaseCode, MedsAdminChartToolTip.AdhocItemCaption, sDosageFormCaseCode, oDrugHeader, oDrugItem);
                    }
                    else {
                        if (oDrugHeader.MultiComponentItems.Count > 0) {
                            for (let iCnt: number = 0; iCnt < oDrugHeader.MultiComponentItems.Count; iCnt++) {
                                this.SetChartDrugHeaderCompName(iCnt, sDrugNameCaseCode, oDrugHeader.MultiComponentItems[iCnt], oDrugHeader, oDrugItem);
                            }
                            let slDosageForm: string = !String.IsNullOrEmpty(oDrugHeader.DosageForm) ? oDrugHeader.DosageForm : String.Empty;
                            if (sDosageFormCaseCode == "CC_MLDUPPER")
                                oDrugHeader.DosageForm = slDosageForm.ToUpper();
                            else if (sDosageFormCaseCode == "CC_MLDLOWER")
                                oDrugHeader.DosageForm = slDosageForm.ToLower();
                            else oDrugHeader.DosageForm = slDosageForm;
                            if (!String.IsNullOrEmpty(oDrugHeader.DosageForm))
                                oDrugItem.Dosageform = oDrugHeader.DosageForm;
                        }
                    }
                }
                else {
                    this.SetChartDrugHeaderName(sDrugNameCaseCode, oDrugHeader.DrugName, sDosageFormCaseCode, oDrugHeader, oDrugItem);
                }
            }
            else {
                this.SetChartDrugHeaderName(sDrugNameCaseCode, oDrugHeader.DrugName, sDosageFormCaseCode, oDrugHeader, oDrugItem);
            }
            if (oDrugHeader.FormViewParameters != null) {
                if (IsNotMedChartMixedMultiRouteItem && !String.IsNullOrEmpty(oDrugHeader.ItemSubType) && String.Compare(oDrugHeader.ItemSubType, DrugItemSubTypeCode.MEDICAL_GAS, StringComparison.CurrentCultureIgnoreCase) == 0 && oDrugHeader.FormViewParameters.IntravenousInfusionData != null && oDrugHeader.FormViewParameters.IntravenousInfusionData.Concentration > 0) {
                    oDrugItem.Concentration = oDrugHeader.FormViewParameters.IntravenousInfusionData.Concentration.ToString() + "%";
                }
                {
                    if (oDrugHeader.FormViewParameters.IntravenousInfusionData != null && oDrugHeader.FormViewParameters.IntravenousInfusionData.Fluid != null && !String.IsNullOrEmpty(oDrugHeader.FormViewParameters.IntravenousInfusionData.Fluid.Name)) {
                        oDrugItem.Fluidname = oDrugHeader.FormViewParameters.IntravenousInfusionData.Fluid.Name;
                    }
                    if (!String.IsNullOrEmpty(oDrugHeader.FormViewParameters.INFTYCODE)) {
                        oDrugItem.Infusiontype = CommonBB.GetText(oDrugHeader.FormViewParameters.INFTYCODE, InfusionTypeConceptCodeData.ConceptCodes);
                    }
                }
            }
            if (!String.IsNullOrEmpty(oDrugHeader.OrderSetName)) {
                oDrugItem.OrderSetIcon = this.LoadImage("Conflict", MedImage.GetPath(MedImages.OrderSetNameIcon));
                oDrugItem.OrderSetIcon.Tooltip = String.Format(MedsAdminChartToolTip.OrderSetName, oDrugHeader.OrderSetName);
            }
            if ((!String.IsNullOrEmpty(oDrugHeader.PrescriptionItemStatus) && String.Compare(oDrugHeader.PrescriptionItemStatus, CConstants.DISCONTINUED, StringComparison.CurrentCultureIgnoreCase) != 0 && String.Compare(oDrugHeader.PrescriptionItemStatus, CConstants.COMPLETED, StringComparison.CurrentCultureIgnoreCase) != 0 && String.Compare(oDrugHeader.PrescriptionItemStatus, CConstants.AWAITINGAUTHORISE, StringComparison.CurrentCultureIgnoreCase) != 0 && String.Compare(oDrugHeader.PrescriptionItemStatus, CConstants.CANCELLED, StringComparison.CurrentCultureIgnoreCase) != 0) || oDrugHeader.IsPGD) {
                if (oDrugHeader.IsConflictExists == 'Y') {
                    oDrugItem.DrugnameIcon1 = this.LoadImage("Conflict", MedImage.GetPath(MedImages.ConflictsBubbleIcon));
                    oDrugItem.DrugnameIcon1.Tooltip = MedsAdminChartToolTip.Conflicts;
                }
                if ((this.oChartTypeSelected == ChartType.Medication_Chart || this.oChartTypeSelected == ChartType.Infusion_Chart || this.oChartTypeSelected == ChartType.Prescription_Chart) && oDrugHeader != null && oDrugHeader.IsConflictExists == 'R') {
                    oDrugItem.DrugnameIcon1 = this.LoadImage("Conflicts", MedImage.GetPath(MedImages.ConflictsMandatoryIcon));
                    oDrugItem.DrugnameIcon1.Tooltip = MedsAdminChartToolTip.ConflictsMand;
                }
            }
            if (oDrugHeader.IsPGD) {
                oDrugItem.DrugnameIcon2 = this.LoadImage("PGD", MedImage.GetPath(MedImages.PGDIcon));
                oDrugItem.DrugnameIcon2.Tooltip = MedsAdminChartToolTip.PrescriptionItem;
            }
            else {
                oDrugItem.DrugnameIcon2 = this.LoadImage("Prescription", MedImage.GetPath(MedImages.RxIcon));
                oDrugItem.DrugnameIcon2.Tooltip = MedsAdminChartToolTip.PrescriptionItem;
            }
            let strDose: string = String.Empty;
            if (!String.IsNullOrEmpty(oDrugHeader.StrengthText)) {
                oDrugItem.StrengthLabel = MedsAdminChartToolTip.StrengthTextLabel;
                oDrugItem.Strength = oDrugHeader.StrengthText;
            }
            if (!String.IsNullOrEmpty(oDrugHeader.DoseType)) {
                if (String.Compare(oDrugHeader.DoseType, DoseTypeCode.STEPPEDVARIABLE, StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(oDrugHeader.DoseType, DoseTypeCode.STEPPED, StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(oDrugHeader.DoseType, DoseTypeCode.VARIABLE, StringComparison.CurrentCultureIgnoreCase) == 0) {
                    if (String.Compare(oDrugHeader.ItemSubType, DrugItemSubTypeCode.MEDICAL_GAS, StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(oDrugHeader.ItemSubType, DrugItemSubTypeCode.BLOOD_PRODUCT, StringComparison.CurrentCultureIgnoreCase) == 0 || (!String.IsNullOrEmpty(oDrugHeader.InfusionType) && String.Compare(oDrugHeader.InfusionType, InfusionTypeCode.INTERMITTENT, StringComparison.CurrentCultureIgnoreCase) != 0 && String.Compare(oDrugHeader.InfusionType, InfusionTypeCode.CONTINUOUS, StringComparison.CurrentCultureIgnoreCase) != 0)) {
                        if (!String.IsNullOrEmpty(oDrugHeader.AdminMethod)) {
                            strDose += oDrugHeader.AdminMethod;
                        }
                        else {
                            strDose += this.getDoseLowerUpperDoseValues(oDrugHeader.LowerDose, oDrugHeader.UpperDose, oDrugHeader.DoseUOM);
                        }
                        if (!String.IsNullOrEmpty(strDose) && String.Compare(oDrugHeader.ItemSubType, DrugItemSubTypeCode.MEDICAL_GAS, StringComparison.CurrentCultureIgnoreCase) != 0 && String.Compare(oDrugHeader.InfusionType, InfusionTypeCode.PCA, StringComparison.CurrentCultureIgnoreCase) != 0) {
                            oDrugItem.DoseLabel = MedsAdminChartToolTip.DoseText;
                            oDrugItem.Dose = strDose;
                        }
                    }
                    else {
                        let sDoseType: string = oDrugHeader.DoseType;
                        if (String.Compare(oDrugHeader.DoseType, DoseTypeCode.STEPPED, StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(oDrugHeader.DoseType, DoseTypeCode.VARIABLE, StringComparison.CurrentCultureIgnoreCase) == 0) {
                            sDoseType = DoseTypeCode.STEPPEDVARIABLE;
                        }
                        oDrugItem.DoseLabel = MedsAdminChartToolTip.DoseText;
                        if (ValueDomainValues.oDoseType != null)
                            oDrugItem.Dose = ValueDomainValues.oDoseType.Count > 0 ? CommonBB.GetText(oDrugHeader.DoseType, ValueDomainValues.oDoseType) : oDrugHeader.DoseType;
                        else oDrugItem.Dose = sDoseType;
                    }
                    if (IsNotMedChartMixedMultiRouteItem)
                        this.FillInfusionDetails(oDrugHeader, oDrugItem);
                    oDrugItem.DoseIcon1 = this.LoadImage("VariableDose", MedImage.GetPath(MedImages.SteppedVariable));
                    oDrugItem.DoseIcon1.Tooltip = MedsAdminChartToolTip.DoseDetails;
                }
                else {
                    if (!String.IsNullOrEmpty(oDrugHeader.AdminMethod)) {
                        strDose += oDrugHeader.AdminMethod;
                    }
                    else {
                        if (String.Compare(oDrugHeader.DoseType, DoseTypeCode.TITRATED, StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(oDrugHeader.DoseType, DoseTypeCode.CONDITIONAL, StringComparison.CurrentCultureIgnoreCase) == 0) {
                            if (String.Compare(oDrugHeader.DoseType, DoseTypeCode.TITRATED, StringComparison.CurrentCultureIgnoreCase) == 0) {
                                this.IsTitrated = true;
                                this.IsSteppedTitrated = true;
                            }
                            if (String.Compare(oDrugHeader.ItemSubType, DrugItemSubTypeCode.MEDICAL_GAS, StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(oDrugHeader.ItemSubType, DrugItemSubTypeCode.BLOOD_PRODUCT, StringComparison.CurrentCultureIgnoreCase) == 0 || (!String.IsNullOrEmpty(oDrugHeader.InfusionType) && String.Compare(oDrugHeader.InfusionType, InfusionTypeCode.INTERMITTENT, StringComparison.CurrentCultureIgnoreCase) != 0)) {
                                strDose += this.getDoseLowerUpperDoseValues(oDrugHeader.LowerDose, oDrugHeader.UpperDose, oDrugHeader.DoseUOM);
                            }
                            else {
                                strDose += ValueDomainValues.oDoseType && ValueDomainValues.oDoseType.Count > 0 ? CommonBB.GetText(oDrugHeader.DoseType, ValueDomainValues.oDoseType) : oDrugHeader.DoseType;
                            }
                            if ((String.Compare(oDrugHeader.DoseType, DoseTypeCode.CONDITIONAL, StringComparison.CurrentCultureIgnoreCase) == 0 && oDrugHeader.IsConditionalExists) || String.Compare(oDrugHeader.DoseType, DoseTypeCode.TITRATED, StringComparison.CurrentCultureIgnoreCase) == 0) {
                                oDrugItem.DoseIcon1 = this.LoadImage("VariableDose", MedImage.GetPath(MedImages.SteppedVariable));
                                oDrugItem.DoseIcon1.Tooltip = MedsAdminChartToolTip.DoseDetails;
                            }
                        }
                        else {
                            strDose += this.getDoseLowerUpperDoseValues(oDrugHeader.LowerDose, oDrugHeader.UpperDose, oDrugHeader.DoseUOM);
                        }
                    }
                    if (!String.IsNullOrEmpty(strDose) && ((String.Compare(oDrugHeader.ItemSubType, DrugItemSubTypeCode.MEDICAL_GAS, StringComparison.CurrentCultureIgnoreCase) == 0 && !oDrugHeader.IsInfusion) || (String.Compare(oDrugHeader.ItemSubType, DrugItemSubTypeCode.MEDICAL_GAS, StringComparison.CurrentCultureIgnoreCase) != 0 && String.Compare(oDrugHeader.InfusionType, InfusionTypeCode.PCA, StringComparison.CurrentCultureIgnoreCase) != 0))) {
                        oDrugItem.DoseLabel = MedsAdminChartToolTip.DoseText;
                        oDrugItem.Dose = strDose;
                    }
                    if (IsNotMedChartMixedMultiRouteItem)
                        this.FillInfusionDetails(oDrugHeader, oDrugItem);
                    if (oDrugHeader.PerodCode == CConstants.sWeeklyFreqUOMCode && !String.IsNullOrEmpty(oDrugHeader.DaysOfWeek)) {
                        oDrugItem.FrequencyWeeklyLabel = MedsAdminChartToolTip.FreqOnText;
                        oDrugItem.FrequencyWeeklyValue = oDrugHeader.DaysOfWeek;
                    }
                    if (!String.IsNullOrEmpty(oDrugHeader.DrugFrequency) && ((String.Compare(oDrugHeader.ItemSubType, DrugItemSubTypeCode.MEDICAL_GAS, StringComparison.CurrentCultureIgnoreCase) == 0 && !oDrugHeader.IsInfusion) || (String.Compare(oDrugHeader.ItemSubType, DrugItemSubTypeCode.MEDICAL_GAS, StringComparison.CurrentCultureIgnoreCase) != 0 && String.Compare(oDrugHeader.InfusionType, InfusionTypeCode.PCA, StringComparison.CurrentCultureIgnoreCase) != 0 && String.Compare(oDrugHeader.InfusionType, InfusionTypeCode.CONTINUOUS, StringComparison.CurrentCultureIgnoreCase) != 0))) {
                        oDrugItem.FrequencyText = oDrugHeader.DrugFrequency;
                    }
                    if (oDrugHeader.IsPRN && String.Compare(oDrugHeader.InfusionType, InfusionTypeCode.PCA, StringComparison.CurrentCultureIgnoreCase) != 0 && String.Compare(oDrugHeader.InfusionType, InfusionTypeCode.CONTINUOUS, StringComparison.CurrentCultureIgnoreCase) != 0) {
                        if (String.Equals(oDrugHeader.ItemSubType, DrugItemSubTypeCode.MEDICAL_GAS) && oDrugItem != null && String.IsNullOrEmpty(oDrugItem.Rate) && String.IsNullOrEmpty(oDrugItem.Duration)) {
                            oDrugItem.AsRequiredText = "as required";
                        }
                        else {
                            oDrugItem.AsRequiredText = "- as required";
                        }
                    }
                    if (oDrugHeader.FormViewParameters != null && (String.Compare(oDrugHeader.FormViewParameters.INFTYCODE, InfusionTypeCode.CONTINUOUS, StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(oDrugHeader.FormViewParameters.INFTYCODE, InfusionTypeCode.PCA, StringComparison.CurrentCultureIgnoreCase) == 0)) {
                        oDrugItem.FrequencyText = String.Empty;
                        oDrugItem.AsRequiredText = String.Empty;
                    }
                }
            }
            if (oDrugHeader.IsClinicallyVerified) {
                oDrugItem.DoseIcon2 = this.LoadImage("ClinicallyVerified", MedImage.GetPath(MedImages.Acknowledged));
                let sToolTip: string = MedsAdminChartToolTip.ClinicallyVerified;
                let IsDST: boolean = false, IsAmbiguous = false, IsInvalid = false;
                if (DateTime.NotEquals(oDrugHeader.ClinicallyVerifiedAt , DateTime.MinValue)) {
                    sToolTip = String.Format(Resource.MedicationChart.InfoiconAcknowledged_Tooltip, oDrugHeader.ClinicallyVerifiedBy, oDrugHeader.ClinicallyVerifiedAt.ConvertToUser((o1) => { IsDST = o1; }, (o2) => { IsAmbiguous = o2; }, (o3) => { IsInvalid = o3; }).ToDateTimeString(IsDST, IsAmbiguous, CConstants.DateTimeFormat));
                    if (!String.IsNullOrEmpty(oDrugHeader.ClinicallyVerifiedComments)) {
                        sToolTip = sToolTip + String.Format(Resource.MedicationChart.InfoiconAcknowledgedComment_Tooltip, oDrugHeader.ClinicallyVerifiedComments);
                    }
                }
                oDrugItem.DoseIcon2.Tooltip = ObjectHelper.CreateObject(new iLabel(), { Text: sToolTip.Replace("\\r\\n", Environment.NewLine), IsWordwrap: true, Width: 200 });
                oDrugItem.DoseIcon2.EnableOnHotSpotClick = false;
            }
            if (oDrugHeader.IsAmendment) {
                oDrugItem.AmendIcon = this.LoadImage("Amend", MedImage.GetPath(MedImages.CommentIcon));
                oDrugItem.AmendIcon.Tooltip = ObjectHelper.CreateObject(new iLabel(), { Text: MedsAdminChartToolTip.AmendIconToolTip, IsWordwrap: true, Width: 200 });
                oDrugItem.AmendIcon.EnableOnHotSpotClick = false;
            }
            if (oDrugHeader != null && oDrugItem != null && this.oChartTypeSelected == ChartType.Prescription_Chart && !String.IsNullOrWhiteSpace(oDrugHeader.PrescribingComments)) {
                oDrugItem.NotesIcon = new BitmapImage(new Uri(MedImage.GetPath(MedImages.PrescnoteIcon), UriKind.Relative));
                oDrugItem.NotesData = oDrugHeader.PrescribingComments;
                let sToolTip: string = String.Empty;
                if (oDrugHeader.PrescribingComments.length > 200) {
                    sToolTip = oDrugHeader.PrescribingComments.Substring(0, 199) + "...";
                    oDrugItem.NotesToolTip = sToolTip;
                }
                else {
                    oDrugItem.NotesToolTip = oDrugHeader.PrescribingComments;
                }
            }
            if (!String.IsNullOrEmpty(oDrugHeader.Route)) {
                oDrugItem.RouteLabel = MedsAdminChartToolTip.ROUTEText;
                oDrugItem.Route = MedicationCommonBB.RouteName(oDrugHeader.Route);
                let sTmpRouteOID: string = MedicationCommonBB.RouteOID(oDrugHeader.Route);
                //if (sTmpRouteOID.Contains(CConstants.MULTIROUTEOIDDILIMITER) == false) { //TODO We need to use two version of CConstants, so we have to see how to use simultaneously.
                if (sTmpRouteOID.Contains(IPPMA_Common.CConstants.MULTIROUTEOIDDILIMITER) == false) { //TODO We need to use two version of CConstants, so we have to see how to use simultaneously.
                    let nTmpRouteOID: number = 0;
                    let bParseOut: boolean = Number.TryParse(sTmpRouteOID, (o) => { nTmpRouteOID = o; })
                    oTagDrugHeaderDetail.RouteOID = bParseOut ? nTmpRouteOID : 0;
                }
            }
            if ((String.Compare(oDrugHeader.ItemSubType, DrugItemSubTypeCode.MEDICAL_GAS, StringComparison.CurrentCultureIgnoreCase) == 0 && !oDrugHeader.IsInfusion) || (String.Compare(oDrugHeader.ItemSubType, DrugItemSubTypeCode.MEDICAL_GAS, StringComparison.CurrentCultureIgnoreCase) != 0)) {
                if (!String.IsNullOrEmpty(oDrugHeader.Site)) {
                    oDrugItem.SiteLabel = MedsAdminChartToolTip.SITEText;
                    oDrugItem.Site = oDrugHeader.Site;
                }
            }
            if (oDrugHeader.FormViewParameters != null) {
                if (IsNotMedChartMixedMultiRouteItem && oDrugHeader.FormViewParameters.IntravenousInfusionData != null && !String.IsNullOrEmpty(oDrugHeader.FormViewParameters.IntravenousInfusionData.Lumen)) {
                    oDrugItem.Lumen = oDrugHeader.FormViewParameters.IntravenousInfusionData.Lumen;
                }
                if (IsNotMedChartMixedMultiRouteItem && !String.IsNullOrEmpty(oDrugHeader.FormViewParameters.AdminDevice)) {
                    oDrugItem.Deliverydevice = oDrugHeader.FormViewParameters.AdminDevice;
                }
            }
            if (!String.IsNullOrEmpty(oDrugHeader.AdministrationInstructions)) {
                oDrugItem.AdministrationInst = oDrugHeader.AdministrationInstructions;
            }
            if (!String.IsNullOrEmpty(oDrugHeader.AdditionalComments) && oDrugHeader.IsInfusion && (String.Equals(oDrugHeader.InfusionType, InfusionTypesCode.CONTINUOUS, StringComparison.CurrentCultureIgnoreCase) || String.Equals(oDrugHeader.InfusionType, InfusionTypesCode.SINGLEDOSEVOLUME, StringComparison.CurrentCultureIgnoreCase) || String.Equals(oDrugHeader.InfusionType, InfusionTypesCode.FLUID, StringComparison.CurrentCultureIgnoreCase))) {
                oDrugItem.AdditionalInst = oDrugHeader.AdditionalComments;
            }
            if (!String.IsNullOrEmpty(oDrugHeader.PRNInstructions)) {
                if (IsNotMedChartMixedMultiRouteItem && oDrugHeader.IsInfusion && (String.Compare(oDrugHeader.InfusionType, InfusionTypesCode.INTERMITTENT, StringComparison.CurrentCultureIgnoreCase) == 0) || (oDrugHeader.IsPRN && String.Equals(oDrugHeader.ItemSubType, InfusionTypesCode.SUBTYPE_GAS, StringComparison.CurrentCultureIgnoreCase))) {
                    oDrugItem.AdditionalInst = oDrugHeader.PRNInstructions;
                }
                else {
                    oDrugItem.PRNInst = oDrugHeader.PRNInstructions;
                }
            }
            else
            {
                oDrugItem.PRNInst = "";
            }
            if (oDrugHeader.IsSelfAdministered) {
                oDrugItem.AdminPRNIcon2 = this.LoadImage("SelfAdministered", MedImage.GetPath(MedImages.PatSelfAdmin));
                oDrugItem.AdminPRNIcon2.Tooltip = MedsAdminChartToolTip.PatientSelfAdministering;
                oDrugItem.AdminPRNIcon2.EnableOnHotSpotClick = false;
            }
            if (!String.IsNullOrEmpty(oDrugHeader.PrescriptionItemStatus)) {
                switch (oDrugHeader.PrescriptionItemStatus) {
                    case CConstants.DISCONTINUED:
                        oDrugItem.PrescriptionStatus = ValueDomainValues.oPrescriptionItemStatus.Count > 0 ? CommonBB.GetText(oDrugHeader.PrescriptionItemStatus, ValueDomainValues.oPrescriptionItemStatus) : oDrugHeader.PrescriptionItemStatus;
                        oDrugItem.PStatusIcon = this.LoadImage("DISCONTINUED", MedImage.GetPath(MedImages.DiscontinuedIcon));
                        oDrugItem.PStatusIcon.Tooltip = MedsAdminChartToolTip.Discontinued;
                        oDrugItem.PStatusIcon.EnableOnHotSpotClick = false;
                        break;
                    case CConstants.COMPLETED:
                        let PrescriptionStatus: string = ValueDomainValues.oPrescriptionItemStatus.Count > 0 ? CommonBB.GetText(oDrugHeader.PrescriptionItemStatus, ValueDomainValues.oPrescriptionItemStatus) : oDrugHeader.PrescriptionItemStatus;
                        oDrugItem.PrescriptionStatus = PrescriptionStatus;
                        oDrugItem.PStatusIcon = this.LoadImage("COMPLETED", MedImage.GetPath(MedImages.CompletedIcon));
                        oDrugItem.PStatusIcon.Tooltip = MedsAdminChartToolTip.Completed;
                        if (oDrugHeader.IsPGD) {
                            oDrugItem.PStatusIcon.Tooltip = oDrugItem.PrescriptionStatus = MedsAdminChartToolTip.PGDCompleted;
                        }
                        oDrugItem.PStatusIcon.EnableOnHotSpotClick = false;
                        break;
                    case CConstants.AWAITINGAUTHORISE:
                        if (this.oChartTypeSelected == ChartType.Prescription_Chart) {
                            oDrugItem.PrescriptionStatus = ValueDomainValues.oPrescriptionItemStatus.Count > 0 ? CommonBB.GetText(oDrugHeader.PrescriptionItemStatus, ValueDomainValues.oPrescriptionItemStatus) : oDrugHeader.PrescriptionItemStatus;
                            oDrugItem.PStatusIcon = this.LoadImage("AWAITING_AUTHORISE", MedImage.GetPath(MedImages.AwaitingAuthoriseIcon));
                            oDrugItem.PStatusIcon.Tooltip = MedsAdminChartToolTip.AwaitingAuthorise;
                            oDrugItem.PStatusIcon.EnableOnHotSpotClick = false;
                        }
                        break;
                    case CConstants.ONHOLD:
                        if (this.oChartTypeSelected == ChartType.Prescription_Chart) {
                            oDrugItem.PrescriptionStatus = ValueDomainValues.oPrescriptionItemStatus.Count > 0 ? CommonBB.GetText(oDrugHeader.PrescriptionItemStatus, ValueDomainValues.oPrescriptionItemStatus) : oDrugHeader.PrescriptionItemStatus;
                            oDrugItem.PStatusIcon = this.LoadImage("ON_HOLD", MedImage.GetPath(MedImages.OnHoldIcon));
                            oDrugItem.PStatusIcon.Tooltip = MedsAdminChartToolTip.OnHold;
                            oDrugItem.PStatusIcon.EnableOnHotSpotClick = false;
                        }
                        break;
                    case CConstants.CANCELLED:
                        if (this.oChartTypeSelected == ChartType.Prescription_Chart) {
                            oDrugItem.PrescriptionStatus = ValueDomainValues.oPrescriptionItemStatus.Count > 0 ? CommonBB.GetText(oDrugHeader.PrescriptionItemStatus, ValueDomainValues.oPrescriptionItemStatus) : oDrugHeader.PrescriptionItemStatus;
                            oDrugItem.PStatusIcon = this.LoadImage("CANCELLED", MedImage.GetPath(MedImages.CancelledIcon));
                            oDrugItem.PStatusIcon.Tooltip = MedsAdminChartToolTip.CancelledStatusToolTip;
                            oDrugItem.PStatusIcon.EnableOnHotSpotClick = false;
                        }
                        break;
                    default:
                        if (!String.IsNullOrEmpty(SLQueryCollection.GetQueryStringValue("MenuCode")) && String.Compare(SLQueryCollection.GetQueryStringValue("MenuCode"), "MN_PRESCCHART_P2", StringComparison.CurrentCultureIgnoreCase) == 0) {
                            if ((String.IsNullOrEmpty(oDrugHeader.EncounterType) || String.Compare(oDrugHeader.EncounterType, CConstants.ENCstatus, StringComparison.CurrentCultureIgnoreCase) == 0)) {
                                oDrugItem.AllowSelect = false;
                            }
                            else {
                                oDrugItem.AllowSelect = true;
                            }
                        }
                        let oTagDrugDetail: TagDrugHeaderDetail = ObjectHelper.CreateType<TagDrugHeaderDetail>(oDrugItem.Tag, TagDrugHeaderDetail);
                        if (oTagDrugDetail != null && oTagDrugDetail.InfusionGroupSequenceNo > 0) {
                            oDrugItem.PStatusIcon = this.LoadImage("SequenceLink", MedImage.GetPath(MedImages.sequentiallink));
                            oDrugItem.PStatusIcon.Tooltip = Resource.MedicationChart.SeqLink_Tooltip;
                        }
                        break;
                }
            }
            if (oDrugHeader.ExistsOnAdmission != null && (String.Equals(oDrugHeader.ExistsOnAdmission, "1") || String.Equals(oDrugHeader.ExistsOnAdmission, "2"))) {
                oDrugItem.OnAdmissionIcon = this.LoadImage("OnAdmission", MedImage.GetPath(MedImages.ExistsOnAdmissionIcon));
                oDrugItem.OnAdmissionIcon.Tooltip = MedsAdminChartToolTip.OnAdmissionIconToolTip;
                oDrugItem.OnAdmissionIcon.EnableOnHotSpotClick = false;
            }
            if (((!String.IsNullOrEmpty(oDrugHeader.SupplyComments)) || (!String.IsNullOrEmpty(oDrugHeader.SupplyInstructions)) || (!String.IsNullOrEmpty(oDrugHeader.ProductOptions))) && (!String.Equals(oDrugHeader.PrescriptionItemStatus, CConstants.COMPLETED) && !String.Equals(oDrugHeader.PrescriptionItemStatus, CConstants.CANCELLED) && !String.Equals(oDrugHeader.PrescriptionItemStatus, CConstants.DISCONTINUED))) {
                let SupplyTooltip: string = String.Empty;
                oDrugItem.SupplyInstIcon = this.LoadImage("SupplyInstructions", MedImage.GetPath(MedImages.SupplyInstructionIcon));
                if (oDrugHeader.SupplyDTTM != null  && DateTime.NotEquals(oDrugHeader.SupplyDTTM , DateTime.MinValue)) {
                    SupplyTooltip = CConstants.techval_tooltip + ":" + oDrugHeader.SupplyDTTM.ToString(CConstants.DateTimeFormat) + Environment.NewLine;
                }
                if (!String.IsNullOrEmpty(oDrugHeader.SupplyInstructions)) {
                    SupplyTooltip = SupplyTooltip + oDrugHeader.SupplyInstructions + Environment.NewLine;
                    if (!String.IsNullOrEmpty(oDrugHeader.SupplyComments)) {
                        SupplyTooltip = SupplyTooltip + CConstants.Comments_tooltip + " : " + oDrugHeader.SupplyComments + Environment.NewLine;
                    }
                }
                else if (!String.IsNullOrEmpty(oDrugHeader.SupplyComments)) {
                    if (!String.IsNullOrEmpty(SupplyTooltip)) {
                        SupplyTooltip = SupplyTooltip + CConstants.Comments_tooltip + " : " + oDrugHeader.SupplyComments + Environment.NewLine;
                    }
                }
                if (oDrugHeader != null && ((oDrugHeader.ItemSubType != null && String.Equals(oDrugHeader.ItemSubType, CConstants.ItemSubType, StringComparison.OrdinalIgnoreCase)) || (oDrugHeader.LorenzoID != null && (String.Equals(oDrugHeader.LorenzoID, CConstants.ADHOC_ITEM_LORENZOID, StringComparison.CurrentCultureIgnoreCase))) || (oDrugHeader.IsInfusion && oDrugHeader.InfusionType != null && (String.Equals(oDrugHeader.InfusionType, InfusionTypeCode.CONTINUOUS, StringComparison.CurrentCultureIgnoreCase) || String.Equals(oDrugHeader.InfusionType, InfusionTypeCode.INTERMITTENT, StringComparison.CurrentCultureIgnoreCase) || String.Equals(oDrugHeader.InfusionType, InfusionTypeCode.PCA, StringComparison.CurrentCultureIgnoreCase) || String.Equals(oDrugHeader.InfusionType, InfusionTypeCode.SINGLEDOSEVOLUME, StringComparison.CurrentCultureIgnoreCase)) && oDrugHeader.FormViewParameters.IntravenousInfusionData != null && oDrugHeader.FormViewParameters.IntravenousInfusionData.Fluid != null && oDrugHeader.FormViewParameters.IntravenousInfusionData.Fluid.OID > 0 && oDrugHeader.FormViewParameters.IntravenousInfusionData.Fluid.Code == "1"))) {
                    SupplyTooltip = CConstants.FullDetails_tooltip;
                }
                else {
                    SupplyTooltip += CConstants.FullDetails_tooltip;
                }
                oDrugItem.SupplyInstIcon.Tooltip = SupplyTooltip;
                oDrugItem.SupplyInstIcon.EnableOnHotSpotClick = true;
            }
            let Omittooltip: string = String.Empty;
            let Reviewtooltip: string = String.Empty;
            if (!String.Equals(oDrugHeader.PrescriptionItemStatus, CConstants.CANCELLED) && !String.Equals(oDrugHeader.PrescriptionItemStatus, CConstants.DISCONTINUED) && !String.Equals(oDrugHeader.PrescriptionItemStatus, CConstants.COMPLETED)) {
                if (DateTime.NotEquals(oDrugHeader.ReviewDTTM , DateTime.MinValue)) {
                    oDrugItem.ReviewLabel = CConstants.ReviewDue;
                    oDrugItem.ReviewVal = oDrugHeader.ReviewDTTM.ToUserDateTimeString(CConstants.DateTimeFormat);
                    if (DateTime.LessThanOrEqualTo(oDrugHeader.ReviewDTTM.Date , this.CurrntDt.Date)) {
                        oDrugItem.ReviewIcon = this.LoadImage(CConstants.ReviewKey, MedImage.GetPath(MedImages.ReviewIcon));
                        if (String.Equals(oDrugHeader.ReviewType, CConstants.GeneralisedReview)) {
                            Reviewtooltip = Resource.MedsAdminPrescChartView.ReviewGeneralIcon_Tooltip;
                        }
                        else {
                            Reviewtooltip = Resource.MedsAdminPrescChartView.ReviewOmittedIcon_Tooltip;
                        }
                        Reviewtooltip += oDrugHeader.ReviewDTTM.ToString(CConstants.DateTimeFormat) + Environment.NewLine;
                        if (!String.IsNullOrEmpty(oDrugHeader.ReviewRequestedComments)) {
                            Reviewtooltip += oDrugHeader.ReviewRequestedComments + Environment.NewLine;
                        }
                        if (!String.IsNullOrEmpty(oDrugHeader.ReviewedRequestedby)) {
                            Reviewtooltip += CConstants.ReviewReqby + ": " + oDrugHeader.ReviewedRequestedby;
                        }
                        if (this.oChartTypeSelected == ChartType.Prescription_Chart) {
                            Reviewtooltip += Environment.NewLine + Resource.MedicationChart.UpdateReview_Tooltip;
                        }
                        oDrugItem.ReviewIcon.Tooltip = Reviewtooltip;
                    }
                    else {
                        oDrugItem.ReviewIcon = null;
                    }
                }
                if (!String.IsNullOrEmpty(oDrugHeader.OmitComments)) {
                    oDrugItem.OmitIcon = this.LoadImage(CConstants.OmitKey, MedImage.GetPath(MedImages.OmittedSlotIcon));
                    if (oDrugHeader.IsIndefiniteOmit) {
                        oDrugItem.OmitLabel = CConstants.OmitIndefinite;
                        Omittooltip = CConstants.OmitIndefinite + Environment.NewLine;
                        if (DateTime.NotEquals(oDrugHeader.IndefiniteOmitFromDTTM, DateTime.MinValue)) {
                            Omittooltip += CConstants.From + ": " + oDrugHeader.IndefiniteOmitFromDTTM.ToString(CConstants.DateTimeFormat) + Environment.NewLine;
                        }
                    }
                    else {
                        oDrugItem.OmitLabel = CConstants.OmitDefinite;
                        Omittooltip = CConstants.OmitDefinite + Environment.NewLine;
                    }
                    if (!String.IsNullOrEmpty(oDrugHeader.Omittedby)) {
                        Omittooltip += CConstants.Comments_tooltip + ": " + oDrugHeader.OmitComments + Environment.NewLine + CConstants.Omittedby_tooltip + ": " + oDrugHeader.Omittedby;
                    }
                    oDrugItem.OmitIcon.Tooltip = Omittooltip;
                }
                else {
                    oDrugItem.OmitIcon = null;
                    oDrugItem.OmitLabel = String.Empty;
                }
            }
            if (itemMRtype == MultiRouteType.Mixed_Routes) {
                oDrugItem.RouteIcon = this.LoadImage("Multi route", MedImage.GetPath(MedImages.MultiRouteIcon));
                oDrugItem.RouteIcon.Tooltip = MedsAdminChartToolTip.MultiRoute;
                oDrugItem.RouteIcon.EnableOnHotSpotClick = false;
            }
            if (String.Equals(oDrugHeader.IsSupplyRequested, '1') && !String.Equals(oDrugHeader.PrescriptionItemStatus, CConstants.COMPLETED) && !String.Equals(oDrugHeader.PrescriptionItemStatus, CConstants.CANCELLED) && !String.Equals(oDrugHeader.PrescriptionItemStatus, CConstants.DISCONTINUED)) {
                oDrugItem.MRequestIcon = this.LoadImage("RequestMedication", MedImage.GetPath(MedImages.SupplyRequesticon));
                let sTip: string = String.Empty;
                let IsFluidOrMCI: boolean = false;
                if (!String.IsNullOrEmpty(oDrugItem.Fluidname) || String.Compare(oDrugHeader.ItemSubType, DrugItemSubTypeCode.MULTI_COMPONENT, StringComparison.CurrentCultureIgnoreCase) == 0) {
                    IsFluidOrMCI = true;
                }
                if (!IsFluidOrMCI) {
                    let lstUrgencyText: string = !String.IsNullOrEmpty(oDrugHeader.RequestUrgency) ? RequestUrgency.ConceptCodes[oDrugHeader.RequestUrgency] : String.Empty;
                    sTip += !String.IsNullOrEmpty(oDrugHeader.RequestedBy) ? (CConstants.RequestedBy + oDrugHeader.RequestedBy) : String.Empty;
                    sTip += DateTime.NotEquals(oDrugHeader.RequestedDTTM , DateTime.MinValue) ? (Environment.NewLine + CConstants.On + oDrugHeader.RequestedDTTM.ToString(CConstants.DateTimeFormat)) : String.Empty;
                    sTip += (lstUrgencyText != null && !String.IsNullOrEmpty(oDrugHeader.RequestUrgency)) ? (Environment.NewLine + CConstants.Urgency + lstUrgencyText) : String.Empty;
                    sTip += !String.IsNullOrEmpty(oDrugHeader.RequestedComments) ? (Environment.NewLine + CConstants.Requestcomments + oDrugHeader.RequestedComments) : String.Empty;
                }
                else {
                    sTip += MedicationRequest.ReqMedIconToolTip;
                }
                oDrugItem.MRequestIcon.Tooltip = ObjectHelper.CreateObject(new iLabel(), { Text: sTip, MaxWidth: 500, IsWordwrap: true });
                oDrugItem.MRequestIcon.EnableOnHotSpotClick = false;
            }
            if (DateTime.NotEquals(oDrugHeader.StartDate , DateTime.MinValue)) {
                oDrugItem.StartDTLbl = MedsAdminChartToolTip.StartDateTimeText;
                oDrugItem.StartDTVal = oDrugHeader.StartDate.ToUserDateTimeString(CConstants.DateTimeFormat);
            }
            if (!String.IsNullOrEmpty(oDrugHeader.PrescriberName)) {
                oDrugItem.PrescribedByLbl = MedsAdminChartToolTip.PrescribedByText;
                oDrugItem.PrescribedByVal = oDrugHeader.PrescriberName;
            }
            if (DateTime.NotEquals(oDrugHeader.StopDate , DateTime.MinValue)) {
                oDrugItem.StopDTLbl = MedsAdminChartToolTip.StopDateTimeText;
                oDrugItem.StopDTVal = oDrugHeader.StopDate.ToUserDateTimeString(CConstants.DateTimeFormat);
            }
            if (!String.IsNullOrEmpty(oDrugHeader.PrescriptionItemStatus) && (String.Equals(oDrugHeader.PrescriptionItemStatus, CConstants.DISCONTINUED, StringComparison.InvariantCultureIgnoreCase))) {
                if (!String.IsNullOrEmpty(oDrugHeader.DiscontinuedComments)) {
                    oDrugItem.ReasonLbl = MedsAdminChartToolTip.ReasonToolTip;
                    oDrugItem.ReasonVal = oDrugHeader.DiscontinuedComments;
                }
                if (!String.IsNullOrEmpty(oDrugHeader.Discontinuedby)) {
                    oDrugItem.ActionByLbl = MedsAdminChartToolTip.DiscontinuedByText;
                    oDrugItem.ActionByVal = oDrugHeader.Discontinuedby;
                }
            }
            if (!String.IsNullOrEmpty(oDrugHeader.PrescriptionItemStatus) && (String.Equals(oDrugHeader.PrescriptionItemStatus, CConstants.COMPLETED, StringComparison.InvariantCultureIgnoreCase)) && (!oDrugHeader.IsBolus && oDrugHeader.IsInfusion)) {
                if (!String.IsNullOrEmpty(oDrugHeader.InfusionCompletedBy)) {
                    oDrugItem.ActionByLbl = MedsAdminChartToolTip.CompletedByText;
                    oDrugItem.ActionByVal = oDrugHeader.InfusionCompletedBy;
                }
                if (!String.IsNullOrEmpty(oDrugHeader.InfusionCompletionComments)) {
                    oDrugItem.CommentsLbl = MedsAdminChartToolTip.CommentsText;
                    oDrugItem.CommentsVal = oDrugHeader.InfusionCompletionComments;
                }
            }
            return oDrugItem;
        }
        private getDoseLowerUpperDoseValues(sLowerDose: string, sUpperDose: string, sDoseUOM: string): string {
            let sReturn: string = String.Empty;
            if (!String.IsNullOrEmpty(sLowerDose)) {
                sReturn += sLowerDose;
            }
            if (!String.IsNullOrEmpty(sUpperDose)) {
                sReturn += !String.IsNullOrEmpty(sReturn) ? "-" + sUpperDose : sUpperDose;
            }
            if (!String.IsNullOrEmpty(sDoseUOM)) {
                sReturn += !String.IsNullOrEmpty(sReturn) ? " " + sDoseUOM : sDoseUOM;
            }
            return sReturn;
        }
        private SetChartDrugHeaderName(sDrugNameCaseCode: string, sDrugName: string, sDosageFormCaseCode: string, oDrugHeader: DrugHeader, oDrugItem: DrugItem): void {
            if (sDrugNameCaseCode == "CC_MLDUPPER")
                oDrugHeader.DrugName = sDrugName.ToUpper();
            else if (sDrugNameCaseCode == "CC_MLDLOWER")
                oDrugHeader.DrugName = sDrugName.ToLower();
            else oDrugHeader.DrugName = sDrugName;
            let slDosageForm: string = !String.IsNullOrEmpty(oDrugHeader.DosageForm) ? oDrugHeader.DosageForm : String.Empty;
            if (sDosageFormCaseCode == "CC_MLDUPPER")
                oDrugHeader.DosageForm = slDosageForm.ToUpper();
            else if (sDosageFormCaseCode == "CC_MLDLOWER")
                oDrugHeader.DosageForm = slDosageForm.ToLower();
            else oDrugHeader.DosageForm = slDosageForm;
            if (!String.IsNullOrEmpty(oDrugHeader.DrugName)) {
                if (String.Compare(oDrugHeader.ItemSubType, DrugItemSubTypeCode.MULTI_COMPONENT, StringComparison.CurrentCultureIgnoreCase) == 0)
                    oDrugItem.Drugname = (!String.IsNullOrEmpty(oDrugHeader.DosageForm)) ? oDrugHeader.DrugName + " - " + oDrugHeader.DosageForm : oDrugHeader.DrugName;
                else if ((oDrugHeader.IsInfusion && String.Compare(oDrugHeader.ItemSubType, InfusionTypesCode.SUBTYPE_GAS, StringComparison.CurrentCultureIgnoreCase) == 0) || !String.IsNullOrEmpty(oDrugHeader.InfusionType))
                    oDrugItem.Drugname = oDrugHeader.DrugName;
                else oDrugItem.Drugname = (!String.IsNullOrEmpty(oDrugHeader.DosageForm)) ? oDrugHeader.DrugName + " - " + oDrugHeader.DosageForm : oDrugHeader.DrugName;
            }
            if (String.Compare(oDrugHeader.ItemSubType, CConstants.ItemSubType, StringComparison.CurrentCultureIgnoreCase) == 0) {
                oDrugItem.MultiComponentIcon = this.LoadImage("MultiComponent Drug", MedImage.GetPath(MedImages.MultiComponentItemIcon));
                oDrugItem.MultiComponentIcon.Tooltip = MedsAdminChartToolTip.SelectMultiCompDetails;
            }
            if (oDrugHeader.IsControlledDrug) {
                oDrugItem.DrugPropertyIcon = this.LoadImage("Controlled Drug", MedImage.GetPath(MedImages.ControlledDrugIcon));
                oDrugItem.DrugPropertyIcon.Tooltip = MedsAdminChartToolTip.ControlledDrug;
                oDrugItem.DrugPropertyIcon.EnableOnHotSpotClick = false;
            }
            if (oDrugHeader.IsCriticalMed) {
                oDrugItem.CriticalIcon = this.LoadImage("CriticalMeds", MedImage.GetPath(MedImages.CriticalMedsIcon));
                oDrugItem.CriticalIcon.Tooltip = MedsAdminChartToolTip.CriticalMedsIconTooltip;
                oDrugItem.CriticalIcon.EnableOnHotSpotClick = false;
            }
            if (oDrugHeader.IsDoseCalculatedByDC && MedicationCommonProfileData.PrescribeConfig.EnableDoseCalc) {
                if (MedChartData.PatinetInfo != null && DateTime.GreaterThan(MedChartData.PatinetInfo.LatHWUpdatedDTTM , DateTime.MinValue) && DateTime.GreaterThan(MedChartData.PatinetInfo.LatHWUpdatedDTTM , oDrugHeader.DCalcDTTM) && !String.Equals(oDrugHeader.PrescriptionItemStatus, CConstants.DISCONTINUED, StringComparison.CurrentCultureIgnoreCase) && !String.Equals(oDrugHeader.PrescriptionItemStatus, CConstants.CANCELLED, StringComparison.CurrentCultureIgnoreCase) && !String.Equals(oDrugHeader.PrescriptionItemStatus, CConstants.COMPLETED, StringComparison.CurrentCultureIgnoreCase) && MedicationCommonProfileData.PrescribeConfig.HeightWeightChangeAlert) {
                    oDrugItem.DoseCalcIcon = this.LoadImage("IsDoseCalculatedByDC", MedImage.GetPath(MedImages.DoseCalculatorWithAlert));
                }
                else {
                    oDrugItem.DoseCalcIcon = this.LoadImage("IsDoseCalculatedByDC", MedImage.GetPath(MedImages.DoseCalculator));
                }
                oDrugItem.DoseCalcIcon.Tooltip = Resource.DoseCalculator.DoseCalci_Tooltip; //TODO inform Pandi reka coz we've added import to index.ts
            }
        }
        private SetChartDrugHeaderCompName(iNameSeq: number, sDrugNameCaseCode: string, sDrugName: string, oDrugHeader: DrugHeader, oDrugItem: DrugItem): void {
            let slDrugName: string = String.Empty;
            let sTmpDrugName: string[] = sDrugName.Split('~');
            if (sDrugNameCaseCode == "CC_MLDUPPER")
                slDrugName = sTmpDrugName[0].ToUpper();
            else if (sDrugNameCaseCode == "CC_MLDLOWER")
                slDrugName = sTmpDrugName[0].ToLower();
            else slDrugName = sTmpDrugName[0];
            if (!String.IsNullOrEmpty(slDrugName)) {
                switch (iNameSeq) {
                    case 0:
                        oDrugItem.Drugname = slDrugName;
                        if (sTmpDrugName.length >= 2 && !String.IsNullOrEmpty(sTmpDrugName[1].Trim()) && String.Compare(sTmpDrugName[1].Trim(), "CC_CNTRLDDRUG", StringComparison.CurrentCultureIgnoreCase) == 0) {
                            oDrugItem.DrugPropertyIcon = this.LoadImage("Controlled Drug", MedImage.GetPath(MedImages.ControlledDrugIcon));
                            oDrugItem.DrugPropertyIcon.Tooltip = MedsAdminChartToolTip.ControlledDrug;
                            oDrugItem.DrugPropertyIcon.EnableOnHotSpotClick = false;
                        }
                        if (iNameSeq == oDrugHeader.MultiComponentItems.Count - 1) {
                            oDrugItem.MultiComponentIcon = this.LoadImage("MultiComponent Drug", MedImage.GetPath(MedImages.MultiComponentItemIcon));
                            oDrugItem.MultiComponentIcon.Tooltip = MedsAdminChartToolTip.SelectMultiCompDetails;
                        }
                        break;
                    case 1:
                        oDrugItem.Componentname1 = slDrugName;
                        if (sTmpDrugName.length >= 2 && !String.IsNullOrEmpty(sTmpDrugName[1].Trim()) && String.Compare(sTmpDrugName[1].Trim(), "CC_CNTRLDDRUG", StringComparison.CurrentCultureIgnoreCase) == 0) {
                            oDrugItem.ComponenetPropertyIcon1 = this.LoadImage("Controlled Drug", MedImage.GetPath(MedImages.ControlledDrugIcon));
                            oDrugItem.ComponenetPropertyIcon1.Tooltip = MedsAdminChartToolTip.ControlledDrug;
                            oDrugItem.ComponenetPropertyIcon1.EnableOnHotSpotClick = false;
                        }
                        if (iNameSeq == oDrugHeader.MultiComponentItems.Count - 1) {
                            oDrugItem.MultiComponentIcon1 = this.LoadImage("MultiComponent Drug", MedImage.GetPath(MedImages.MultiComponentItemIcon));
                            oDrugItem.MultiComponentIcon1.Tooltip = MedsAdminChartToolTip.SelectMultiCompDetails;
                        }
                        break;
                    case 2:
                        oDrugItem.Componentname2 = slDrugName;
                        if (sTmpDrugName.length >= 2 && !String.IsNullOrEmpty(sTmpDrugName[1].Trim()) && String.Compare(sTmpDrugName[1].Trim(), "CC_CNTRLDDRUG", StringComparison.CurrentCultureIgnoreCase) == 0) {
                            oDrugItem.ComponenetPropertyIcon2 = this.LoadImage("Controlled Drug", MedImage.GetPath(MedImages.ControlledDrugIcon));
                            oDrugItem.ComponenetPropertyIcon2.Tooltip = MedsAdminChartToolTip.ControlledDrug;
                            oDrugItem.ComponenetPropertyIcon2.EnableOnHotSpotClick = false;
                        }
                        if (iNameSeq == oDrugHeader.MultiComponentItems.Count - 1) {
                            oDrugItem.MultiComponentIcon2 = this.LoadImage("MultiComponent Drug", MedImage.GetPath(MedImages.MultiComponentItemIcon));
                            oDrugItem.MultiComponentIcon2.Tooltip = MedsAdminChartToolTip.SelectMultiCompDetails;
                        }
                        break;
                    case 3:
                        oDrugItem.Componentname3 = slDrugName;
                        if (sTmpDrugName.length >= 2 && !String.IsNullOrEmpty(sTmpDrugName[1].Trim()) && String.Compare(sTmpDrugName[1].Trim(), "CC_CNTRLDDRUG", StringComparison.CurrentCultureIgnoreCase) == 0) {
                            oDrugItem.ComponenetPropertyIcon3 = this.LoadImage("Controlled Drug", MedImage.GetPath(MedImages.ControlledDrugIcon));
                            oDrugItem.ComponenetPropertyIcon3.Tooltip = MedsAdminChartToolTip.ControlledDrug;
                            oDrugItem.ComponenetPropertyIcon3.EnableOnHotSpotClick = false;
                        }
                        if (iNameSeq == oDrugHeader.MultiComponentItems.Count - 1) {
                            oDrugItem.MultiComponentIcon3 = this.LoadImage("MultiComponent Drug", MedImage.GetPath(MedImages.MultiComponentItemIcon));
                            oDrugItem.MultiComponentIcon3.Tooltip = MedsAdminChartToolTip.SelectMultiCompDetails;
                        }
                        break;
                    case 4:
                        oDrugItem.Componentname4 = slDrugName;
                        if (sTmpDrugName.length >= 2 && !String.IsNullOrEmpty(sTmpDrugName[1].Trim()) && String.Compare(sTmpDrugName[1].Trim(), "CC_CNTRLDDRUG", StringComparison.CurrentCultureIgnoreCase) == 0) {
                            oDrugItem.ComponenetPropertyIcon4 = this.LoadImage("Controlled Drug", MedImage.GetPath(MedImages.ControlledDrugIcon));
                            oDrugItem.ComponenetPropertyIcon4.Tooltip = MedsAdminChartToolTip.ControlledDrug;
                            oDrugItem.ComponenetPropertyIcon4.EnableOnHotSpotClick = false;
                        }
                        if (iNameSeq == oDrugHeader.MultiComponentItems.Count - 1) {
                            oDrugItem.MultiComponentIcon4 = this.LoadImage("MultiComponent Drug", MedImage.GetPath(MedImages.MultiComponentItemIcon));
                            oDrugItem.MultiComponentIcon4.Tooltip = MedsAdminChartToolTip.SelectMultiCompDetails;
                        }
                        break;
                }
            }
        }
        public FillInfusionDetails(oDrugHeader: DrugHeader, oDrugItem: DrugItem): void {
            let isSteppedOrConditionalVariable: boolean = (String.Compare(oDrugHeader.DoseType, DoseTypeCode.STEPPEDVARIABLE, StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(oDrugHeader.DoseType, DoseTypeCode.STEPPED, StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(oDrugHeader.DoseType, DoseTypeCode.VARIABLE, StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(oDrugHeader.DoseType, DoseTypeCode.CONDITIONAL, StringComparison.CurrentCultureIgnoreCase) == 0);
            if (oDrugHeader.FormViewParameters != null) {
                if (String.Compare(oDrugHeader.ItemSubType, DrugItemSubTypeCode.MEDICAL_GAS, StringComparison.CurrentCultureIgnoreCase) == 0) {
                    if (isSteppedOrConditionalVariable) {
                        oDrugItem.RateLabel = Resource.MedsAdminChartToolTip.RateText;
                        oDrugItem.Rate = CommonBB.GetText(oDrugHeader.DoseType, ValueDomainValues.oDoseType);
                    }
                    else {
                        if (oDrugHeader.FormViewParameters.IntravenousInfusionData != null && !String.IsNullOrEmpty(oDrugHeader.FormViewParameters.IntravenousInfusionData.Rate) && oDrugHeader.FormViewParameters.IntravenousInfusionData.RateUOM != null && !String.IsNullOrEmpty(oDrugHeader.FormViewParameters.IntravenousInfusionData.RateUOM.UOMName) && oDrugHeader.FormViewParameters.IntravenousInfusionData.RateDenominatorUOM != null && !String.IsNullOrEmpty(oDrugHeader.FormViewParameters.IntravenousInfusionData.RateDenominatorUOM.UOMName)) {
                            oDrugItem.RateLabel = Resource.MedsAdminChartToolTip.RateText;
                            oDrugItem.Rate = oDrugHeader.FormViewParameters.IntravenousInfusionData.Rate + " " + oDrugHeader.FormViewParameters.IntravenousInfusionData.RateUOM.UOMName + "/" + oDrugHeader.FormViewParameters.IntravenousInfusionData.RateDenominatorUOM.UOMName;
                        }
                    }
                    if (oDrugHeader.FormViewParameters.IntravenousInfusionData.TargetSaturationUpper > 0) {
                        oDrugItem.TargetSaturationlbl = Resource.MedsAdminChartToolTip.TargetSatuRangeText;
                        oDrugItem.TargetSaturation = oDrugHeader.FormViewParameters.IntravenousInfusionData.TargetSaturationLower.ToString() + " - " + oDrugHeader.FormViewParameters.IntravenousInfusionData.TargetSaturationUpper.ToString() + "%";
                    }
                    if (oDrugHeader.PrescriptionDuration > 0)
                        oDrugItem.Duration = PrescriptionHelper.GetDurationValue(oDrugHeader.PrescriptionDuration, oDrugHeader.PrescriptionDurationUOM) + " " + CommonBB.GetText(oDrugHeader.PrescriptionDurationUOM, ValueDomainValues.oDurationUOM).ToLower();
                    if (!String.IsNullOrEmpty(oDrugHeader.FormViewParameters.IntravenousInfusionData.HUMIDCode)) {
                        oDrugItem.Humidificationlbl = Resource.MedsAdminChartToolTip.HumidificationText.ToUpper();
                        oDrugItem.Humidification = CommonBB.GetText(oDrugHeader.FormViewParameters.IntravenousInfusionData.HUMIDCode, ValueDomainValues.oHumidification);
                    }
                }
                else if (String.Compare(oDrugHeader.FormViewParameters.INFTYCODE, InfusionTypeCode.PCA, StringComparison.CurrentCultureIgnoreCase) == 0) {
                    if (oDrugHeader.FormViewParameters.AdminDeviceData != null && !String.IsNullOrEmpty(oDrugHeader.FormViewParameters.AdminDeviceData.BoosterDose) && oDrugHeader.FormViewParameters.AdminDeviceData.BoosterDoseUOM != null && !String.IsNullOrEmpty(oDrugHeader.FormViewParameters.AdminDeviceData.BoosterDoseUOM.UOMName)) {
                        oDrugItem.BoosterDoseLabel = Resource.MedsAdminChartToolTip.BoosterDoseText;
                        oDrugItem.BoosterDose = oDrugHeader.FormViewParameters.AdminDeviceData.BoosterDose + " " + oDrugHeader.FormViewParameters.AdminDeviceData.BoosterDoseUOM.UOMName + " ";
                    }
                    if (oDrugHeader.FormViewParameters.AdminDeviceData != null && !String.IsNullOrEmpty(oDrugHeader.FormViewParameters.AdminDeviceData.TopUpDose) && oDrugHeader.FormViewParameters.AdminDeviceData.TopUpDoseUOM != null && !String.IsNullOrEmpty(oDrugHeader.FormViewParameters.AdminDeviceData.TopUpDoseUOM.UOMName)) {
                        oDrugItem.BolusLabel = Resource.MedsAdminChartToolTip.BolusText;
                        oDrugItem.Bolus = oDrugHeader.FormViewParameters.AdminDeviceData.TopUpDose + " " + oDrugHeader.FormViewParameters.AdminDeviceData.TopUpDoseUOM.UOMName;
                        oDrugItem.Bolus = oDrugItem.Bolus + " ";
                    }
                    if (oDrugHeader.FormViewParameters.AdminDeviceData != null && oDrugHeader.FormViewParameters.AdminDeviceData.LockOutPeriod > 0 && oDrugHeader.FormViewParameters.AdminDeviceData.LockOutPeriodUOM != null && !String.IsNullOrEmpty(oDrugHeader.FormViewParameters.AdminDeviceData.LockOutPeriodUOM.UOMName)) {
                        oDrugItem.LockoutLabel = Resource.MedsAdminChartToolTip.LockOutText;
                        oDrugItem.Lockout = oDrugHeader.FormViewParameters.AdminDeviceData.LockOutPeriod + " " + oDrugHeader.FormViewParameters.AdminDeviceData.LockOutPeriodUOM.UOMName;
                        oDrugItem.Lockout = oDrugItem.Lockout + " ";
                    }
                    if (oDrugHeader.FormViewParameters.IntravenousInfusionData != null && !String.IsNullOrEmpty(oDrugHeader.FormViewParameters.IntravenousInfusionData.MaxDose)) {
                        oDrugItem.MaxdoseLabel = Resource.MedsAdminChartToolTip.MaxDoseText;
                        oDrugItem.Maxdose = oDrugHeader.FormViewParameters.IntravenousInfusionData.MaxDose;
                        oDrugItem.Maxdose = oDrugItem.Maxdose + " ";
                    }
                    if (isSteppedOrConditionalVariable) {
                        oDrugItem.RateLabel = Resource.MedsAdminChartToolTip.RateText;
                        oDrugItem.Rate = CommonBB.GetText(oDrugHeader.DoseType, ValueDomainValues.oDoseType);
                    }
                    else {
                        if (oDrugHeader.FormViewParameters.AdminDeviceData != null && !String.IsNullOrEmpty(oDrugHeader.FormViewParameters.AdminDeviceData.BackgroundRate) && oDrugHeader.FormViewParameters.AdminDeviceData.BackgroundRateUOM != null && !String.IsNullOrEmpty(oDrugHeader.FormViewParameters.AdminDeviceData.BackgroundRateUOM.UOMName) && oDrugHeader.FormViewParameters.AdminDeviceData.BackgroundRateDenaminatorUOM != null && !String.IsNullOrEmpty(oDrugHeader.FormViewParameters.AdminDeviceData.BackgroundRateDenaminatorUOM.UOMName)) {
                            oDrugItem.RateLabel = Resource.MedsAdminChartToolTip.RateText;
                            oDrugItem.Rate = oDrugHeader.FormViewParameters.AdminDeviceData.BackgroundRate + " " + oDrugHeader.FormViewParameters.AdminDeviceData.BackgroundRateUOM.UOMName + "/" + oDrugHeader.FormViewParameters.AdminDeviceData.BackgroundRateDenaminatorUOM.UOMName;
                        }
                        else if (!String.IsNullOrEmpty(oDrugHeader.FormViewParameters.IntravenousInfusionData.Rate) && oDrugHeader.FormViewParameters.IntravenousInfusionData.RateUOM != null && !String.IsNullOrEmpty(oDrugHeader.FormViewParameters.IntravenousInfusionData.RateUOM.UOMName) && oDrugHeader.FormViewParameters.IntravenousInfusionData.RateDenominatorUOM != null && !String.IsNullOrEmpty(oDrugHeader.FormViewParameters.IntravenousInfusionData.RateDenominatorUOM.UOMName)) {
                            oDrugItem.RateLabel = Resource.MedsAdminChartToolTip.RateText;
                            oDrugItem.Rate = oDrugHeader.FormViewParameters.IntravenousInfusionData.Rate;
                            if (!String.IsNullOrEmpty(oDrugHeader.FormViewParameters.IntravenousInfusionData.UpperRate)) {
                                oDrugItem.Rate = oDrugItem.Rate + " - " + oDrugHeader.FormViewParameters.IntravenousInfusionData.UpperRate;
                            }
                            oDrugItem.Rate = oDrugItem.Rate + " " + oDrugHeader.FormViewParameters.IntravenousInfusionData.RateUOM.UOMName + "/" + oDrugHeader.FormViewParameters.IntravenousInfusionData.RateDenominatorUOM.UOMName;
                        }
                    }
                    if (!String.IsNullOrEmpty(oDrugHeader.FormViewParameters.IntravenousInfusionData.IsOnGoing) && oDrugHeader.FormViewParameters.IntravenousInfusionData.IsOnGoing == "Y") {
                        oDrugItem.Ongoing = true;
                    }
                    else if (oDrugHeader.PrescriptionDuration > 0) {
                        oDrugItem.Duration = PrescriptionHelper.GetDurationValue(oDrugHeader.PrescriptionDuration, oDrugHeader.PrescriptionDurationUOM) + " " + CommonBB.GetText(oDrugHeader.PrescriptionDurationUOM, ValueDomainValues.oDurationUOM).ToLower();
                    }
                }
                else {
                    if (!String.IsNullOrEmpty(oDrugItem.Dose))
                        oDrugItem.Dose = oDrugItem.Dose + " ";
                    if (oDrugHeader.FormViewParameters.AdminDeviceData != null) {
                        if (!String.IsNullOrEmpty(oDrugHeader.FormViewParameters.AdminDeviceData.BoosterDose) && oDrugHeader.FormViewParameters.AdminDeviceData.BoosterDoseUOM != null && !String.IsNullOrEmpty(oDrugHeader.FormViewParameters.AdminDeviceData.BoosterDoseUOM.UOMName)) {
                            oDrugItem.BoosterDoseLabel = Resource.MedsAdminChartToolTip.BoosterDoseText;
                            oDrugItem.BoosterDose = oDrugHeader.FormViewParameters.AdminDeviceData.BoosterDose + " " + oDrugHeader.FormViewParameters.AdminDeviceData.BoosterDoseUOM.UOMName + " ";
                        }
                    }
                    if (oDrugHeader.FormViewParameters.IntravenousInfusionData != null) {
                        if (!String.IsNullOrEmpty(oDrugHeader.FormViewParameters.IntravenousInfusionData.Volume) && oDrugHeader.FormViewParameters.IntravenousInfusionData.VolumeUOM != null && !String.IsNullOrEmpty(oDrugHeader.FormViewParameters.IntravenousInfusionData.VolumeUOM.UOMName)) {
                            oDrugItem.VolumeLabel = Resource.MedsAdminChartToolTip.VolumeText;
                            oDrugItem.Volume = oDrugHeader.FormViewParameters.IntravenousInfusionData.Volume + " " + oDrugHeader.FormViewParameters.IntravenousInfusionData.VolumeUOM.UOMName;
                            oDrugItem.Volume = oDrugItem.Volume + " ";
                        }
                        if (!String.IsNullOrEmpty(oDrugHeader.FormViewParameters.IntravenousInfusionData.InfusionPeriod) && oDrugHeader.FormViewParameters.IntravenousInfusionData.InfusionPeriodUOM != null && !String.IsNullOrEmpty(oDrugHeader.FormViewParameters.IntravenousInfusionData.InfusionPeriodUOM.UOMName)) {
                            oDrugItem.InfusionPeriod = oDrugHeader.FormViewParameters.IntravenousInfusionData.InfusionPeriod + " " + oDrugHeader.FormViewParameters.IntravenousInfusionData.InfusionPeriodUOM.UOMName;
                            oDrugItem.InfusionPeriod = oDrugItem.InfusionPeriod + " ";
                        }
                        if (isSteppedOrConditionalVariable) {
                            if (String.Compare(oDrugHeader.InfusionType, InfusionTypeCode.INTERMITTENT, StringComparison.CurrentCultureIgnoreCase) != 0) {
                                oDrugItem.RateLabel = Resource.MedsAdminChartToolTip.RateText;
                                oDrugItem.Rate = CommonBB.GetText(oDrugHeader.DoseType, ValueDomainValues.oDoseType);
                            }
                        }
                        else {
                            if (!String.IsNullOrEmpty(oDrugHeader.FormViewParameters.INFTYCODE) || oDrugHeader.IsPGD) {
                                if (!String.IsNullOrEmpty(oDrugHeader.FormViewParameters.IntravenousInfusionData.Rate) && !String.IsNullOrEmpty(oDrugHeader.FormViewParameters.IntravenousInfusionData.UpperRate) && oDrugHeader.FormViewParameters.IntravenousInfusionData.RateUOM != null && !String.IsNullOrEmpty(oDrugHeader.FormViewParameters.IntravenousInfusionData.RateUOM.UOMName) && oDrugHeader.FormViewParameters.IntravenousInfusionData.RateDenominatorUOM != null && !String.IsNullOrEmpty(oDrugHeader.FormViewParameters.IntravenousInfusionData.RateDenominatorUOM.UOMName)) {
                                    oDrugItem.RateLabel = Resource.MedsAdminChartToolTip.RateText;
                                    oDrugItem.Rate = oDrugHeader.FormViewParameters.IntravenousInfusionData.Rate + " - " + oDrugHeader.FormViewParameters.IntravenousInfusionData.UpperRate + " " + oDrugHeader.FormViewParameters.IntravenousInfusionData.RateUOM.UOMName + "/" + oDrugHeader.FormViewParameters.IntravenousInfusionData.RateDenominatorUOM.UOMName;
                                }
                                else if (!String.IsNullOrEmpty(oDrugHeader.FormViewParameters.IntravenousInfusionData.Rate) && String.IsNullOrEmpty(oDrugHeader.FormViewParameters.IntravenousInfusionData.UpperRate) && oDrugHeader.FormViewParameters.IntravenousInfusionData.RateUOM != null && !String.IsNullOrEmpty(oDrugHeader.FormViewParameters.IntravenousInfusionData.RateUOM.UOMName) && oDrugHeader.FormViewParameters.IntravenousInfusionData.RateDenominatorUOM != null && !String.IsNullOrEmpty(oDrugHeader.FormViewParameters.IntravenousInfusionData.RateDenominatorUOM.UOMName)) {
                                    oDrugItem.RateLabel = Resource.MedsAdminChartToolTip.RateText;
                                    oDrugItem.Rate = oDrugHeader.FormViewParameters.IntravenousInfusionData.Rate + " " + oDrugHeader.FormViewParameters.IntravenousInfusionData.RateUOM.UOMName + "/" + oDrugHeader.FormViewParameters.IntravenousInfusionData.RateDenominatorUOM.UOMName;
                                }
                            }
                        }
                    }
                    if (String.Compare(oDrugHeader.InfusionType, InfusionTypeCode.CONTINUOUS, StringComparison.CurrentCultureIgnoreCase) == 0) {
                        if (!String.IsNullOrEmpty(oDrugHeader.FormViewParameters.IntravenousInfusionData.IsOnGoing) && oDrugHeader.FormViewParameters.IntravenousInfusionData.IsOnGoing == "Y") {
                            oDrugItem.Ongoing = true;
                        }
                        else if (oDrugHeader.PrescriptionDuration > 0) {
                            oDrugItem.Duration = PrescriptionHelper.GetDurationValue(oDrugHeader.PrescriptionDuration, oDrugHeader.PrescriptionDurationUOM) + " " + CommonBB.GetText(oDrugHeader.PrescriptionDurationUOM, ValueDomainValues.oDurationUOM).ToLower();
                        }
                    }
                }
                if (oDrugHeader.FormViewParameters.IntravenousInfusionData != null && oDrugHeader.FormViewParameters.IntravenousInfusionData.InfusionSeqOrder > 0 && oDrugHeader.FormViewParameters.IntravenousInfusionData.InfusionSeqCount > 0 && oDrugHeader.FormViewParameters.IntravenousInfusionData.InfusionSeqOrder < oDrugHeader.FormViewParameters.IntravenousInfusionData.InfusionSeqCount && this.oChartTypeSelected != ChartType.Medication_Chart) {
                    oDrugItem.IsSequentail = true;
                }
                if (oDrugHeader.FormViewParameters.IntravenousInfusionData != null && oDrugHeader.FormViewParameters.IntravenousInfusionData.Fluid != null && oDrugHeader.FormViewParameters.IntravenousInfusionData.Fluid.OID > 0 && oDrugHeader.FormViewParameters.IntravenousInfusionData.Fluid.Code == "1") {
                    oDrugItem.FluidDrugPropertyIcon = this.LoadImage("Controlled Drug", MedImage.GetPath(MedImages.ControlledDrugIcon));
                    oDrugItem.FluidDrugPropertyIcon.Tooltip = MedsAdminChartToolTip.ControlledDrug;
                    oDrugItem.FluidDrugPropertyIcon.EnableOnHotSpotClick = false;
                }
                if (oDrugHeader.FormViewParameters.IntravenousInfusionData != null && !String.IsNullOrEmpty(oDrugHeader.FormViewParameters.IntravenousInfusionData.LowConcentration) && oDrugHeader.FormViewParameters.IntravenousInfusionData.LowConcentrationUOMOID != null && !String.IsNullOrEmpty(oDrugHeader.FormViewParameters.IntravenousInfusionData.LowConcentrationUOMOID.UOMName) && !String.IsNullOrEmpty(oDrugHeader.FormViewParameters.IntravenousInfusionData.UpperConcentration) && oDrugHeader.FormViewParameters.IntravenousInfusionData.UpperConcentrationUOMOID != null && !String.IsNullOrEmpty(oDrugHeader.FormViewParameters.IntravenousInfusionData.UpperConcentrationUOMOID.UOMName)) {
                    oDrugItem.ConcentrationLabel = MedsAdminChartToolTip.ConcentrationText;
                    oDrugItem.DrugConcentration = String.Format("{0} {1}/{2} {3} ",
                        oDrugHeader.FormViewParameters.IntravenousInfusionData.LowConcentration, oDrugHeader.FormViewParameters.IntravenousInfusionData.LowConcentrationUOMOID.UOMName, oDrugHeader.FormViewParameters.IntravenousInfusionData.UpperConcentration, oDrugHeader.FormViewParameters.IntravenousInfusionData.UpperConcentrationUOMOID.UOMName);
                }
            }
        }
        public LoadStringIcon(key: string, Uri: string, StringData: string): ChartStringIcon { //TODO ChartStringIcon needs to be implemented
            let oChartIcon: ChartStringIcon = new ChartStringIcon();
            oChartIcon.Key = key;
            oChartIcon.UriString = Uri;
            oChartIcon.StringData = StringData;
            return oChartIcon;
        }
        //todo saras
        public CreateAdminSummary(RowKey: number,  ColKey: number,  oSlotDetail: List<SlotDetail> | ObservableCollection<SlotDetailVM>,  IsPRN: boolean, out1: (sMultiSlotOverDueStatus: string) => void, out2: (sMultiSlotDueStatus: string) => void, out3: (sMultiSlotNetYetRecStatus: string) => void, out4: (nMultislotDueCount: number) => void, out5: (nMultislotOverdueCount: number) => void): ObservableCollection<ChartStringIcon> {
            if(oSlotDetail instanceof List){
                return this.CreateAdminSummary1(RowKey, ColKey, oSlotDetail, IsPRN, out1, out2, out3, out4, out5);
            }else{
                return this.CreateAdminSummary2(RowKey, ColKey, oSlotDetail, IsPRN, out1, out2, out3, out4, out5);

            }
        }
        public CreateAdminSummary1(RowKey: number,  ColKey: number,  oSlotDetail: List<SlotDetail>,  IsPRN: boolean, out1: (sMultiSlotOverDueStatus: string) => void, out2: (sMultiSlotDueStatus: string) => void, out3: (sMultiSlotNetYetRecStatus: string) => void, out4: (nMultislotDueCount: number) => void, out5: (nMultislotOverdueCount: number) => void): ObservableCollection<ChartStringIcon> {
            let sMultiSlotOverDueStatus: string;
            let sMultiSlotDueStatus: string;
            let sMultiSlotNetYetRecStatus: string;
            let nMultislotDueCount: number;
            let nMultislotOverdueCount: number;

                        sMultiSlotOverDueStatus = String.Empty;
                        sMultiSlotDueStatus = String.Empty;
                        sMultiSlotNetYetRecStatus = String.Empty;
                        nMultislotDueCount = 0;
                        nMultislotOverdueCount = 0;
                        let oAdminSummaryList: ObservableCollection<ChartStringIcon> = new ObservableCollection<ChartStringIcon>();
                        let oChartStringIcon: ChartStringIcon;
                        let nGivenCount: number = 0;
                        let nNotGivenCount: number = 0;
                        let nNotKnownCount: number = 0;
                        let nSelfAdminCount: number = 0;
                        this.nCount = oSlotDetail.Count;
                        for (let i: number = 0; i < this.nCount; i++) {
                            switch (oSlotDetail[i].Status) {
                                case SlotStatus.OVERDUE:
                                case SlotStatus.DEFEROVERDUE:
                                    if (!IsPRN && !String.Equals(MedChartData.ChartStatus, CConstants.sChartSuspendedStatusCode, StringComparison.InvariantCultureIgnoreCase)) {
                                        if (this.cUnackConflict != 'R') {
                                            this.nOverDueCount++;
                                            nMultislotOverdueCount++;
                                        }
                                        sMultiSlotOverDueStatus = SlotStatus.OVERDUE;
                                    }
                                    break;
                                case SlotStatus.DUENOW:
                                    if (!IsPRN && !String.Equals(MedChartData.ChartStatus, CConstants.sChartSuspendedStatusCode, StringComparison.InvariantCultureIgnoreCase)) {
                                        if (this.cUnackConflict != 'R') {
                                            this.nDueCount++;
                                            nMultislotDueCount++;
                                        }
                                        sMultiSlotDueStatus = SlotStatus.DUENOW;
                                    }
                                    break;
                                case SlotStatus.DEFERDUENOW:
                                    if (!IsPRN && !String.Equals(MedChartData.ChartStatus, CConstants.sChartSuspendedStatusCode, StringComparison.InvariantCultureIgnoreCase)) {
                                        if (this.cUnackConflict != 'R') {
                                            this.nDueCount++;
                                            nMultislotDueCount++;
                                        }
                                        sMultiSlotDueStatus = SlotStatus.DEFERDUENOW;
                                    }
                                    break;
                                case SlotStatus.GIVEN:
                                    nGivenCount++;
                                    break;
                                case SlotStatus.NOTGIVEN:
                                    nNotGivenCount++;
                                    break;
                                case SlotStatus.NOTKNOWN:
                                    nNotKnownCount++;
                                    break;
                                case SlotStatus.SELFADMINISTERED:
                                    nSelfAdminCount++;
                                    break;
                                case SlotStatus.NOTYETRECORDED:
                                    sMultiSlotNetYetRecStatus = SlotStatus.NOTYETRECORDED;
                                    break;
                            }
                        }
                        if (nGivenCount > 0) {
                            oChartStringIcon = this.LoadStringIcon("ChartStringIcon-Given" + RowKey + ColKey, MedImage.GetPath(MedImages.GivenSlotIcon), nGivenCount.ToString() + " ");
                            oChartStringIcon.EnableOnHotSpotClick = false;
                            oAdminSummaryList.Add(oChartStringIcon);
                        }
                        if (nSelfAdminCount > 0) {
                            oChartStringIcon = this.LoadStringIcon("ChartStringIcon-SelfAdmin" + RowKey + ColKey, MedImage.GetPath(MedImages.SelfAdministeredIcon), nSelfAdminCount.ToString() + " ");
                            oChartStringIcon.EnableOnHotSpotClick = false;
                            oAdminSummaryList.Add(oChartStringIcon);
                        }
                        if (nNotGivenCount > 0) {
                            oChartStringIcon = this.LoadStringIcon("ChartStringIcon-NotGiven" + RowKey + ColKey, MedImage.GetPath(MedImages.NotGivenSlotIcon), nNotGivenCount.ToString() + " ");
                            oChartStringIcon.EnableOnHotSpotClick = false;
                            oAdminSummaryList.Add(oChartStringIcon);
                        }
                        if (nNotKnownCount > 0) {
                            oChartStringIcon = this.LoadStringIcon("ChartStringIcon-NotKnown" + RowKey + ColKey, MedImage.GetPath(MedImages.NotKnownSlotIcon), nNotKnownCount.ToString() + " ");
                            oChartStringIcon.EnableOnHotSpotClick = false;
                            oAdminSummaryList.Add(oChartStringIcon);
                        }
                        out1(sMultiSlotOverDueStatus);
                        out2(sMultiSlotDueStatus);
                        out3(sMultiSlotNetYetRecStatus);
                        out4(nMultislotDueCount);
                        out5(nMultislotOverdueCount);
                        return oAdminSummaryList;



            }
        public CreateAdminSummary2(RowKey: number, ColKey: number, oSlotDetailVM: ObservableCollection<SlotDetailVM>, IsPRN: boolean, out1: (sMultiSlotOverDueStatus: string) => void, out2: (sMultiSlotDueStatus: string) => void, out3: (sMultiSlotNetYetRecStatus: string) => void, out4: (nMultislotDueCount: number) => void, out5: (nMultislotOverdueCount: number) => void): ObservableCollection<ChartStringIcon> {
            let sMultiSlotOverDueStatus: string;
            let sMultiSlotDueStatus: string;
            let sMultiSlotNetYetRecStatus: string;
            let nMultislotDueCount: number;
            let nMultislotOverdueCount: number;

            let oAdminSummaryList: ObservableCollection<ChartStringIcon> = new ObservableCollection<ChartStringIcon>();
            let qrySlotDetails = oSlotDetailVM.Where(lstSlotDetails =>lstSlotDetails.Status==SlotStatus.OVERDUE||lstSlotDetails.Status==SlotStatus.DEFEROVERDUE||lstSlotDetails.Status==SlotStatus.DUENOW||lstSlotDetails.Status==SlotStatus.DEFERDUENOW||lstSlotDetails.Status==SlotStatus.GIVEN||lstSlotDetails.Status==SlotStatus.NOTGIVEN||lstSlotDetails.Status==SlotStatus.NOTKNOWN||lstSlotDetails.Status==SlotStatus.SELFADMINISTERED||lstSlotDetails.Status==SlotStatus.NOTYETRECORDED).Select(lstSlotDetails => lstSlotDetails);
            /* let qrySlotDetails = from lstSlotDetails in oSlotDetailVM
                            where lstSlotDetails.Status == SlotStatus.OVERDUE || lstSlotDetails.Status == SlotStatus.DEFEROVERDUE || lstSlotDetails.Status == SlotStatus.DUENOW || lstSlotDetails.Status == SlotStatus.DEFERDUENOW || lstSlotDetails.Status == SlotStatus.GIVEN || lstSlotDetails.Status == SlotStatus.NOTGIVEN || lstSlotDetails.Status == SlotStatus.NOTKNOWN || lstSlotDetails.Status == SlotStatus.SELFADMINISTERED || lstSlotDetails.Status == SlotStatus.NOTYETRECORDED
                            select lstSlotDetails; */
            let oSlotDetails: List<SlotDetail> = new List<SlotDetail>();
            qrySlotDetails.forEach((item) => {
                let oSlotDetail: SlotDetail = new SlotDetail();
                oSlotDetail.Status = item.Status;
                oSlotDetails.Add(oSlotDetail);
            });
            oAdminSummaryList = this.CreateAdminSummary1(RowKey, ColKey, oSlotDetails, IsPRN, (o1) => { sMultiSlotOverDueStatus = o1; }, (o2) => { sMultiSlotDueStatus = o2; }, (o3) => { sMultiSlotNetYetRecStatus = o3; }, (o4) => { nMultislotDueCount = o4; }, (o5) => { nMultislotOverdueCount = o5; });
            out1(sMultiSlotOverDueStatus);
            out2(sMultiSlotDueStatus);
            out3(sMultiSlotNetYetRecStatus);
            out4(nMultislotDueCount);
            out5(nMultislotOverdueCount);
            return oAdminSummaryList;



        }
        CreateTagDrugHeaderObject(oDrugHeader: DrugHeader): TagDrugHeaderDetail {
            this.oTagDrugHeaderDetail = new TagDrugHeaderDetail();
            this.oTagDrugHeaderDetail.PrescriptionItemStatus = oDrugHeader.PrescriptionItemStatus;
            this.oTagDrugHeaderDetail.DoseType = oDrugHeader.DoseType;
            this.oTagDrugHeaderDetail.LowerDose = oDrugHeader.LowerDose;
            this.oTagDrugHeaderDetail.UpperDose = oDrugHeader.UpperDose;
            this.oTagDrugHeaderDetail.DoseUOM = oDrugHeader.DoseUOM;
            this.oTagDrugHeaderDetail.StrengthText = oDrugHeader.StrengthText;
            this.oTagDrugHeaderDetail.DoseUOMOID = oDrugHeader.DoseUOMOID;
            this.oTagDrugHeaderDetail.DoseUOMLzoID = oDrugHeader.DoseUOMLzoID;
            this.oTagDrugHeaderDetail.IsPGD = oDrugHeader.IsPGD;
            this.oTagDrugHeaderDetail.DrugIdentifyingOID = oDrugHeader.DrugIdentifyingOID;
            this.oTagDrugHeaderDetail.DrugIdentifyingType = oDrugHeader.DrugIdentifyingType;
            this.oTagDrugHeaderDetail.MCVersionNo = oDrugHeader.MCVersion;
            this.oTagDrugHeaderDetail.AdminMethod = oDrugHeader.AdminMethod;
            this.oTagDrugHeaderDetail.RouteOID = oDrugHeader.RouteOID;
            this.oTagDrugHeaderDetail.DosageFormOID = oDrugHeader.DosageFormOID;
            this.oTagDrugHeaderDetail.StartDate = oDrugHeader.StartDate;
            this.oTagDrugHeaderDetail.EndDate = oDrugHeader.EndDate;
            this.oTagDrugHeaderDetail.LorenzoID = oDrugHeader.LorenzoID;
            this.oTagDrugHeaderDetail.IsParacetamolIngredient = oDrugHeader.IsParacetamolIngredient;
            this.oTagDrugHeaderDetail.DrugName = oDrugHeader.DrugName;
            this.oTagDrugHeaderDetail.SlotsTimeIntervalAvg = oDrugHeader.SlotsTimeIntervalAvg;
            this.oTagDrugHeaderDetail.UnackIsConflictExists = oDrugHeader.IsConflictExists;
            this.oTagDrugHeaderDetail.ProductForm = oDrugHeader.DosageForm;
            this.oTagDrugHeaderDetail.ItemType = oDrugHeader.ItemType;
            this.oTagDrugHeaderDetail.ItemSubType = oDrugHeader.ItemSubType;
            this.oTagDrugHeaderDetail.MultiComponentItems = oDrugHeader.MultiComponentItems;
            this.oTagDrugHeaderDetail.IsAllowedToPerform = oDrugHeader.IsAllowed;
            this.oTagDrugHeaderDetail.FreqPerodcode = oDrugHeader.PerodCode;
            this.oTagDrugHeaderDetail.IsAllowAdvanceAdmin = oDrugHeader.IsAllowAdvanceAdmin;
            this.oTagDrugHeaderDetail.DrugFrequencyOID = oDrugHeader.DrugFrequencyOID;
            if (DateTime.NotEquals(oDrugHeader.FormViewParameters.ReviewAfterDTTM , DateTime.MinValue)) {
                this.oTagDrugHeaderDetail.ReviewDTTM = oDrugHeader.FormViewParameters.ReviewAfterDTTM;
            }
            this.oTagDrugHeaderDetail.Route = oDrugHeader.Route;
            this.oTagDrugHeaderDetail.INFTYCODE = oDrugHeader.InfusionType;
            this.oTagDrugHeaderDetail.SupplyComments = oDrugHeader.SupplyComments;
            this.oTagDrugHeaderDetail.SupplyInstructions = oDrugHeader.SupplyInstructions;
            this.oTagDrugHeaderDetail.ReviewDTTM = oDrugHeader.ReviewDTTM;
            this.oTagDrugHeaderDetail.ReviewRequestedComments = oDrugHeader.ReviewRequestedComments;
            this.oTagDrugHeaderDetail.ReviewRequestedby = oDrugHeader.ReviewedRequestedby;
            this.oTagDrugHeaderDetail.ReviewType = oDrugHeader.ReviewType;
            this.oTagDrugHeaderDetail.IsIndefiniteOmit = oDrugHeader.IsIndefiniteOmit;
            this.oTagDrugHeaderDetail.IndefiniteOmitFromDTTM = oDrugHeader.IndefiniteOmitFromDTTM;
            this.oTagDrugHeaderDetail.OmitComments = oDrugHeader.OmitComments;
            this.oTagDrugHeaderDetail.LastOmittedSlotDTTM = oDrugHeader.LastOmittedSlotDTTM;
            this.oTagDrugHeaderDetail.Omittedby = oDrugHeader.Omittedby;
            this.oTagDrugHeaderDetail.IsPRN = oDrugHeader.IsPRN;
            this.oTagDrugHeaderDetail.IsNextDoseAllowedForPRN = this.IsNextDoseAllowedForPRN;
            this.oTagDrugHeaderDetail.MinimumIntervalForPRN = this.nMinimumIntervalForPRN;
            this.oTagDrugHeaderDetail.LastAdministeredAtForPRN = this.nLastRecordedAtForPRN;
            if (!String.IsNullOrEmpty(SLQueryCollection.GetQueryStringValue("MenuCode")) && String.Compare(SLQueryCollection.GetQueryStringValue("MenuCode"), "MN_PRESCCHART_P2", StringComparison.CurrentCultureIgnoreCase) == 0) {
                this.oTagDrugHeaderDetail.EncounterOID = oDrugHeader.EncounterOID;
                this.oTagDrugHeaderDetail.EncounterType = oDrugHeader.EncounterType;
            }
            if (oDrugHeader.InfChartAlerts != null && oDrugHeader.InfChartAlerts.Count > 0)
                this.oTagDrugHeaderDetail.InfChartAlerts = oDrugHeader.InfChartAlerts;
            this.oTagDrugHeaderDetail.PrescribedBy = oDrugHeader.PrescriberName;
            this.oTagDrugHeaderDetail.PrescribedAt = oDrugHeader.PrescribedAt;
            this.oTagDrugHeaderDetail.CancelDiscontinuedBy = oDrugHeader.Discontinuedby;
            this.oTagDrugHeaderDetail.CancelDiscontinuedDttm = oDrugHeader.DiscontinuedDttm;
            this.oTagDrugHeaderDetail.PrescriptionItemOID = oDrugHeader.PrescriptionItemOID;
            this.oTagDrugHeaderDetail.AmendedPrescriptionItemOID = oDrugHeader.AmendedPrescriptionItemOID;
            this.oTagDrugHeaderDetail.IsInfusion = oDrugHeader.IsInfusion;
            this.oTagDrugHeaderDetail.PreviousRate = oDrugHeader.PreviousRate;
            this.oTagDrugHeaderDetail.PreviousDrugConcentration = oDrugHeader.PreviousConcentration;
            this.oTagDrugHeaderDetail.IsConditionalExists = oDrugHeader.IsConditionalExists;
            let itemMRtype: MultiRouteType = oDrugHeader.MultiRouteType as MultiRouteType;
            this.oTagDrugHeaderDetail.MultiRoute_Type = itemMRtype;
            this.oTagDrugHeaderDetail.IsPatientSelfAdmin = oDrugHeader.IsSelfAdministered;
            if (this.oTagDrugHeaderDetail != null && oDrugHeader != null && !String.IsNullOrEmpty(oDrugHeader.PrescribingComments)) {
                this.oTagDrugHeaderDetail.PrescribingNote = oDrugHeader.PrescribingComments;
            }
            if (oDrugHeader.FormViewParameters != null) {
                this.oTagDrugHeaderDetail.INFTYCODE = oDrugHeader.FormViewParameters.INFTYCODE;
                this.oTagDrugHeaderDetail.Duration = oDrugHeader.PrescriptionDuration;
                this.oTagDrugHeaderDetail.DurationUOM = oDrugHeader.PrescriptionDurationUOM;
                if (oDrugHeader.FormViewParameters.AdminDeviceData != null) {
                    this.oTagDrugHeaderDetail.BoosterDose = oDrugHeader.FormViewParameters.AdminDeviceData.BoosterDose;
                    if (oDrugHeader.FormViewParameters.AdminDeviceData.BoosterDoseUOM != null) {
                        this.oTagDrugHeaderDetail.BoosterDoseUOM = oDrugHeader.FormViewParameters.AdminDeviceData.BoosterDoseUOM.UOMName;
                        this.oTagDrugHeaderDetail.BoosterDoseUOMOID = oDrugHeader.FormViewParameters.AdminDeviceData.BoosterDoseUOM.UOMId;
                    }
                    this.oTagDrugHeaderDetail.BackgroundRate = oDrugHeader.FormViewParameters.AdminDeviceData.BackgroundRate;
                    if (oDrugHeader.FormViewParameters.AdminDeviceData.BackgroundRateUOM != null)
                        this.oTagDrugHeaderDetail.BackgroundRateNumeratorUOM = oDrugHeader.FormViewParameters.AdminDeviceData.BackgroundRateUOM.UOMName;
                    if (oDrugHeader.FormViewParameters.AdminDeviceData.BackgroundRateDenaminatorUOM != null)
                        this.oTagDrugHeaderDetail.BackgroundRateDinominatorUOM = oDrugHeader.FormViewParameters.AdminDeviceData.BackgroundRateDenaminatorUOM.UOMName;
                    if (oDrugHeader.FormViewParameters.AdminDeviceData.LockOutPeriod > 0)
                        this.oTagDrugHeaderDetail.LockOutPeriod = oDrugHeader.FormViewParameters.AdminDeviceData.LockOutPeriod.ToString();
                    if (oDrugHeader.FormViewParameters.AdminDeviceData.LockOutPeriodUOM != null)
                        this.oTagDrugHeaderDetail.LockOutPeriodUOM = oDrugHeader.FormViewParameters.AdminDeviceData.LockOutPeriodUOM.UOMName;
                    this.oTagDrugHeaderDetail.DeliveryDevice = oDrugHeader.FormViewParameters.AdminDevice;
                }
                if (oDrugHeader.FormViewParameters.IntravenousInfusionData != null) {
                    this.oTagDrugHeaderDetail.ParentPrescriptionItemOID = oDrugHeader.FormViewParameters.IntravenousInfusionData.ParentPrescriptionItemOID;
                    this.oTagDrugHeaderDetail.InfusionSeqOrder = oDrugHeader.FormViewParameters.IntravenousInfusionData.InfusionSeqOrder;
                    this.oTagDrugHeaderDetail.SeqInfOrderForPervImmediateItm = oDrugHeader.FormViewParameters.IntravenousInfusionData.SeqInfOrderForPervImmediateItm;
                    this.oTagDrugHeaderDetail.SequenceParentPrescItemOID = oDrugHeader.FormViewParameters.IntravenousInfusionData.SequenceParentPrescItemOID;
                    this.oTagDrugHeaderDetail.InfusionGroupSequenceNo = oDrugHeader.FormViewParameters.IntravenousInfusionData.InfusionGroupSequenceNo;
                    this.oTagDrugHeaderDetail.Fluid = oDrugHeader.FormViewParameters.IntravenousInfusionData.Fluid.Name;
                    this.oTagDrugHeaderDetail.IsFluidControlDrug = oDrugHeader.FormViewParameters.IntravenousInfusionData.Fluid.Code == "1";
                    this.oTagDrugHeaderDetail.IsOnGoing = oDrugHeader.FormViewParameters.IntravenousInfusionData.IsOnGoing;
                    this.oTagDrugHeaderDetail.Concentration = oDrugHeader.FormViewParameters.IntravenousInfusionData.Concentration;
                    this.oTagDrugHeaderDetail.Rate = oDrugHeader.FormViewParameters.IntravenousInfusionData.Rate;
                    this.oTagDrugHeaderDetail.UpperRate = oDrugHeader.FormViewParameters.IntravenousInfusionData.UpperRate;
                    if (oDrugHeader.FormViewParameters.IntravenousInfusionData.RateUOM != null)
                        this.oTagDrugHeaderDetail.RateNumeratorUOM = oDrugHeader.FormViewParameters.IntravenousInfusionData.RateUOM.UOMName;
                    if (oDrugHeader.FormViewParameters.IntravenousInfusionData.RateUOM != null && oDrugHeader.FormViewParameters.IntravenousInfusionData.RateUOM.UOMId > 0) {
                        this.oTagDrugHeaderDetail.RateNumeratorUOMOID = oDrugHeader.FormViewParameters.IntravenousInfusionData.RateUOM.UOMId;
                    }
                    if (oDrugHeader.FormViewParameters.IntravenousInfusionData.RateDenominatorUOM != null)
                        this.oTagDrugHeaderDetail.RateDinominatorUOM = oDrugHeader.FormViewParameters.IntravenousInfusionData.RateDenominatorUOM.UOMName;
                    if (oDrugHeader.FormViewParameters.IntravenousInfusionData.RateDenominatorUOM != null && oDrugHeader.FormViewParameters.IntravenousInfusionData.RateDenominatorUOM.UOMId > 0) {
                        this.oTagDrugHeaderDetail.RateDinominatorUOMOID = oDrugHeader.FormViewParameters.IntravenousInfusionData.RateDenominatorUOM.UOMId;
                    }
                    this.oTagDrugHeaderDetail.Volume = oDrugHeader.FormViewParameters.IntravenousInfusionData.Volume;
                    if (oDrugHeader.FormViewParameters.IntravenousInfusionData.VolumeUOM != null && !String.IsNullOrEmpty(oDrugHeader.FormViewParameters.IntravenousInfusionData.VolumeUOM.UOMName) && oDrugHeader.FormViewParameters.IntravenousInfusionData.VolumeUOM.UOMId > 0) {
                        this.oTagDrugHeaderDetail.VolumeUOM = oDrugHeader.FormViewParameters.IntravenousInfusionData.VolumeUOM.UOMName;
                        this.oTagDrugHeaderDetail.VolumeUOMOID = oDrugHeader.FormViewParameters.IntravenousInfusionData.VolumeUOM.UOMId;
                    }
                    this.oTagDrugHeaderDetail.InfusionPeriod = oDrugHeader.FormViewParameters.IntravenousInfusionData.InfusionPeriod;
                    if (oDrugHeader.FormViewParameters.IntravenousInfusionData.InfusionPeriodUOM != null)
                        this.oTagDrugHeaderDetail.InfusionPeriodUOM = oDrugHeader.FormViewParameters.IntravenousInfusionData.InfusionPeriodUOM.UOMName;
                    if (oDrugHeader.FormViewParameters.IntravenousInfusionData.InfusionPeriodUOM != null && oDrugHeader.FormViewParameters.IntravenousInfusionData.InfusionPeriodUOM.UOMId > 0) {
                        this.oTagDrugHeaderDetail.InfusionPeriodUOMOID = oDrugHeader.FormViewParameters.IntravenousInfusionData.InfusionPeriodUOM.UOMId;
                    }
                    this.oTagDrugHeaderDetail.MaxDose = oDrugHeader.FormViewParameters.IntravenousInfusionData.MaxDose;
                    this.oTagDrugHeaderDetail.Lumen = oDrugHeader.FormViewParameters.IntravenousInfusionData.Lumen;
                    if (oDrugHeader.FormViewParameters.IntravenousInfusionData != null && !String.IsNullOrEmpty(oDrugHeader.FormViewParameters.IntravenousInfusionData.LowConcentration) && oDrugHeader.FormViewParameters.IntravenousInfusionData.LowConcentrationUOMOID != null && !String.IsNullOrEmpty(oDrugHeader.FormViewParameters.IntravenousInfusionData.LowConcentrationUOMOID.UOMName) && !String.IsNullOrEmpty(oDrugHeader.FormViewParameters.IntravenousInfusionData.UpperConcentration) && oDrugHeader.FormViewParameters.IntravenousInfusionData.UpperConcentrationUOMOID != null && !String.IsNullOrEmpty(oDrugHeader.FormViewParameters.IntravenousInfusionData.UpperConcentrationUOMOID.UOMName)) {
                        this.oTagDrugHeaderDetail.DrugConcentration = oDrugHeader.FormViewParameters.IntravenousInfusionData.LowConcentration + " " + oDrugHeader.FormViewParameters.IntravenousInfusionData.LowConcentrationUOMOID.UOMName + "/" + oDrugHeader.FormViewParameters.IntravenousInfusionData.UpperConcentration + " " + oDrugHeader.FormViewParameters.IntravenousInfusionData.UpperConcentrationUOMOID.UOMName;
                    }
                }
                if (String.Compare(oDrugHeader.ItemSubType, CConstants.ItemSubType, StringComparison.CurrentCultureIgnoreCase) == 0) {
                    this.oTagDrugHeaderDetail.IsControlDrug = false;
                    if (oDrugHeader.LorenzoID != CConstants.ADHOC_ITEM_LORENZOID) {
                        this.oTagDrugHeaderDetail.IsControlDrug = oDrugHeader.IsControlledDrug;
                    }
                    if (oDrugHeader.MultiComponentItems != null && oDrugHeader.MultiComponentItems.Count > 5) {
                        for (let iCnt: number = 0; iCnt < oDrugHeader.MultiComponentItems.Count; iCnt++) {
                            let sTmpDrugName: string[] = oDrugHeader.MultiComponentItems[iCnt].Split('~');
                            if (sTmpDrugName.length >= 2 && !String.IsNullOrEmpty(sTmpDrugName[1].Trim()) && String.Compare(sTmpDrugName[1].Trim(), "CC_CNTRLDDRUG", StringComparison.CurrentCultureIgnoreCase) == 0) {
                                oDrugHeader.IsControlledDrug = true;
                                this.oTagDrugHeaderDetail.IsControlDrug = true;
                                break;
                            }
                        }
                    }
                }
                else {
                    this.oTagDrugHeaderDetail.IsControlDrug = oDrugHeader.IsControlledDrug;
                }
                this.oTagDrugHeaderDetail.IsPRNWithSchedule = oDrugHeader.IsPRNWithSchedule;
                if (oDrugHeader.FormViewParameters.IntravenousInfusionData.SequenceParentPrescItemOID > 0 && oDrugHeader.FormViewParameters.IntravenousInfusionData.SeqInfOrderForPervImmediateItm > 0 && (String.Equals(oDrugHeader.PrescriptionItemStatus, CConstants.COMPLETED, StringComparison.InvariantCultureIgnoreCase) || String.Equals(oDrugHeader.PrescriptionItemStatus, CConstants.DISCONTINUED, StringComparison.InvariantCultureIgnoreCase))) {
                    this.oTagDrugHeaderDetail.InfChartAlerts = null;
                }
                this.oTagDrugHeaderDetail.OrderSetName = oDrugHeader.OrderSetName;
                this.oTagDrugHeaderDetail.IsAmendCompletedStatus = oDrugHeader.IsAmendCompletedStatus;
                this.oTagDrugHeaderDetail.IsCustomiseMedScan = oDrugHeader.IsMedScanExcluded;
                if ((!String.IsNullOrEmpty(this.oTagDrugHeaderDetail.ItemSubType) && (String.Equals(this.oTagDrugHeaderDetail.ItemSubType, CConstants.ItemSubType, StringComparison.InvariantCultureIgnoreCase) || String.Equals(this.oTagDrugHeaderDetail.ItemSubType, InfusionTypesCode.BLOOD_PRODUCT, StringComparison.InvariantCultureIgnoreCase)))) {
                    this.oTagDrugHeaderDetail.IsMedScanExcluded = true;
                }
                else if (this.oTagDrugHeaderDetail.IsInfusion && !String.IsNullOrEmpty(this.oTagDrugHeaderDetail.ItemSubType) && String.Equals(this.oTagDrugHeaderDetail.ItemSubType, CConstants.SUBTYPE_GAS, StringComparison.InvariantCultureIgnoreCase)) {
                    this.oTagDrugHeaderDetail.IsMedScanExcluded = true;
                }
                else {
                    this.oTagDrugHeaderDetail.IsMedScanExcluded = false;
                }
            }
            return this.oTagDrugHeaderDetail;
        }
        public CreateTagSlotObject(oSlotDetail: SlotDetail): TagSlotDetail {
            let oTagSlotDetail: TagSlotDetail = new TagSlotDetail();
            oTagSlotDetail.SlotOID = oSlotDetail.OID;
            oTagSlotDetail.SlotStatus = oSlotDetail.Status;
            oTagSlotDetail.SlotDateTime = oSlotDetail.ScheduledDTTM;
            oTagSlotDetail.Dose = oTagSlotDetail.LowerDose = oSlotDetail.Dose;
            oTagSlotDetail.UpperDose = oSlotDetail.UpperDose;
            oTagSlotDetail.DoseUOM = oSlotDetail.DoseUOM;
            if (oSlotDetail != null && oSlotDetail.AdministrationDetail != null && oSlotDetail.AdministrationDetail.RecordedAt != null)
                oTagSlotDetail.LastModifiedAt = oSlotDetail.AdministrationDetail.RecordedAt;
            oTagSlotDetail.DoseUOMOID = oSlotDetail.DoseUOMOID;
            oTagSlotDetail.DoseUOMLzoID = oSlotDetail.DoseUOMLzoID;
            oTagSlotDetail.IsSelfAdministered = oSlotDetail.IsSelfAdministered;
            oTagSlotDetail.InfusionRate = oSlotDetail.InfusionRate;
            oTagSlotDetail.InfusionUpperRate = oSlotDetail.InfUpperRate;
            oTagSlotDetail.InfusionRateUOM = oSlotDetail.InfRateUOM != null ? oSlotDetail.InfRateUOM.UOMName : String.Empty;
            oTagSlotDetail.InfusionRatePerUOM = oSlotDetail.InfRatePerUOM != null ? oSlotDetail.InfRatePerUOM.UOMName : String.Empty;
            oTagSlotDetail.IsAllowAdvanceAdminSlot = oSlotDetail.IsAllowAdvanceAdmin;
            if (oSlotDetail.AdministrationDetail != null) {
                oTagSlotDetail.AdminReasonCode = oSlotDetail.AdministrationDetail.AdminReasonCode;
                oTagSlotDetail.Comments = oSlotDetail.AdministrationDetail.AdminComments;
                if (oSlotDetail.Status == SlotStatus.NOTGIVEN) {
                    oTagSlotDetail.RecordedAt = oSlotDetail.AdministrationDetail.RecordedAt;
                    oTagSlotDetail.RecordedBy = oSlotDetail.AdministrationDetail.RecordedBy;
                }
                if (oSlotDetail.AdministrationDetail.MedAdminOID > 0) {
                    oTagSlotDetail.MedsAdminOID = oSlotDetail.AdministrationDetail.MedAdminOID;
                    oTagSlotDetail.AdministeredAt = oSlotDetail.AdministrationDetail.AdministeredDate;
                }
                oTagSlotDetail.FirstBagBegunAt = oSlotDetail.AdministrationDetail.FirstBagBegunAt;
                oTagSlotDetail.LastBagEndedAt = oSlotDetail.AdministrationDetail.LastBagEndedAt;
                oTagSlotDetail.TotalVolumeInfused = oSlotDetail.AdministrationDetail.TotalVolumeInfused;
                oTagSlotDetail.TotalVolumeInfusedUOMName = oSlotDetail.AdministrationDetail.TotalVolumeInfusedUOMName;
                oTagSlotDetail.CurrentBagVolumeInfused = oSlotDetail.AdministrationDetail.CurrentBagVolumeInfused;
                oTagSlotDetail.CurrentBagVolumeInfusedUOMName = oSlotDetail.AdministrationDetail.CurrentBagVolumeInfusedUOMName;
                oTagSlotDetail.IsAdministeredOnInfusionChart = oSlotDetail.AdministrationDetail.IsAdministeredOnInfusionChart;
                oTagSlotDetail.IsDuringHomeLeave = oSlotDetail.AdministrationDetail.IsDuringHomeLeave;
            }
            oTagSlotDetail.IsHighlightSlot = oSlotDetail.IsHighlightSlot;
            oTagSlotDetail.IsLastSlotInView = oSlotDetail.IsLastSlotInView;
            return oTagSlotDetail;
        }
        public UpdateTagSlotObject(oTagSlotDetail: TagSlotDetail, oSlotDetailVM: SlotDetailVM): void {
            if (!String.IsNullOrEmpty(oSlotDetailVM.Dose)) {
                oTagSlotDetail.Dose = oSlotDetailVM.Dose;
            }
            if (!String.IsNullOrEmpty(oSlotDetailVM.DoseUOM)) {
                oTagSlotDetail.DoseUOM = oSlotDetailVM.DoseUOM;
            }
            if (oSlotDetailVM.AdministrationDetail != null) {
                if (oSlotDetailVM.AdministrationDetail.MedAdminOID > 0) {
                    oTagSlotDetail.MedsAdminOID = oSlotDetailVM.AdministrationDetail.MedAdminOID;
                    oTagSlotDetail.AdministeredAt = oSlotDetailVM.AdministrationDetail.AdministeredDate;
                    oTagSlotDetail.LastModifiedAt = oSlotDetailVM.AdministrationDetail.RecordedAt;
                    oTagSlotDetail.SlotStatus = oSlotDetailVM.Status;
                }
            }
        }

        public GetNextDueAt(oSlotDetail: List<SlotDetail>|ObservableCollection<SlotDetailVM>): DateTime{
            if(oSlotDetail instanceof List){
                return this.GetNextDueAt1(oSlotDetail);
            }else{
                return this.GetNextDueAt2(oSlotDetail);
            }
        }
        public GetNextDueAt1(oSlotDetail: List<SlotDetail>): DateTime{
            let dtNextDue: DateTime= DateTime.MinValue;
            let qryFutureSlotDetails = oSlotDetail.Where(slot =>(slot.Status==SlotStatus.PLANNED||slot.Status==String.Empty)).Select(slot => slot);
            /* let qryFutureSlotDetails = from slot in oSlotDetail
            where(slot.Status == SlotStatus.PLANNED || slot.Status == String.Empty)
            select slot; */
            if (qryFutureSlotDetails.Count() > 0) {
                dtNextDue = qryFutureSlotDetails.Min(x => x.ScheduledDTTM); //TODO inform Platform team, works for max but not min
            }
            return dtNextDue;
        }
        public GetNextDueAt2(oSlotDetail: ObservableCollection<SlotDetailVM>): DateTime{
            let dtNextDue: DateTime= DateTime.MinValue;
            let qryFutureSlotDetails = oSlotDetail.Where(slot =>(slot.Status==SlotStatus.PLANNED||slot.Status==String.Empty)).Select(slot => slot);
            /* let qryFutureSlotDetails = from slot in oSlotDetail
            where(slot.Status == SlotStatus.PLANNED || slot.Status == String.Empty)
            select slot; */
            if (qryFutureSlotDetails.Count() > 0) {
                dtNextDue = qryFutureSlotDetails.Min(x => x.ScheduledDTTM);
            }
            return dtNextDue;
        }
        public GetLastGivenAt(oSlotDetail: List<SlotDetail>|ObservableCollection<SlotDetailVM>): DateTime{
            if(oSlotDetail instanceof List){
                return this.GetLastGivenAt1(oSlotDetail)
            }else{
                return this.GetLastGivenAt2(oSlotDetail)
            }
        }
        public GetLastGivenAt1(oSlotDetail: List<SlotDetail>): DateTime{
            let dtLastGiven: DateTime= DateTime.MinValue;
            //TODO ask thiyagu
            let qrySlotDetails = oSlotDetail.Where(slot =>slot!=null&&slot.AdministrationDetail!=null&&(((slot.Status==SlotStatus.GIVEN||slot.Status==SlotStatus.SELFADMINISTERED)&&!slot.AdministrationDetail.IsAdministeredOnInfusionChart)||(slot.AdministrationDetail.IsAdministeredOnInfusionChart&&(slot.Status==SlotStatus.COMPLETED||slot.Status==SlotStatus.STOPPED||slot.Status==SlotStatus.INPROGRESS||slot.Status==SlotStatus.PAUSED))));//Jira#47300).Select(slot => slot);
            /* let qrySlotDetails = from slot in oSlotDetail
            where slot != null && slot.AdministrationDetail != null && (((slot.Status == SlotStatus.GIVEN || slot.Status == SlotStatus.SELFADMINISTERED) && !slot.AdministrationDetail.IsAdministeredOnInfusionChart)
                || (slot.AdministrationDetail.IsAdministeredOnInfusionChart && (slot.Status == SlotStatus.COMPLETED || slot.Status == SlotStatus.STOPPED || slot.Status == SlotStatus.INPROGRESS || slot.Status == SlotStatus.PAUSED))) // Jira # 47300
            select slot; */
            if(qrySlotDetails.Count() > 0) {
                dtLastGiven = qrySlotDetails.Max(x => x.AdministrationDetail.AdministeredDate);
            }
            return dtLastGiven;
        }
        public GetLastGivenAt2(oSlotDetail: ObservableCollection<SlotDetailVM>): DateTime{
            let dtLastGiven: DateTime= DateTime.MinValue;
            let qrySlotDetails = oSlotDetail.Where(slot =>slot!=null&&slot.AdministrationDetail!=null&&(((slot.Status==SlotStatus.GIVEN||slot.Status==SlotStatus.SELFADMINISTERED)&&!slot.AdministrationDetail.IsAdministeredOnInfusionChart)||(slot.AdministrationDetail.IsAdministeredOnInfusionChart&&(slot.Status==SlotStatus.COMPLETED||slot.Status==SlotStatus.STOPPED||slot.Status==SlotStatus.INPROGRESS||slot.Status==SlotStatus.PAUSED)))).Select(slot => slot);
            /* let qrySlotDetails = from slot in oSlotDetail
            where slot != null && slot.AdministrationDetail != null && (((slot.Status == SlotStatus.GIVEN || slot.Status == SlotStatus.SELFADMINISTERED) && !slot.AdministrationDetail.IsAdministeredOnInfusionChart)
                || (slot.AdministrationDetail.IsAdministeredOnInfusionChart && (slot.Status == SlotStatus.COMPLETED || slot.Status == SlotStatus.STOPPED || slot.Status == SlotStatus.INPROGRESS || slot.Status == SlotStatus.PAUSED))) // Jira # 47300
            select slot; */
            if (qrySlotDetails.Count() > 0) {
                dtLastGiven = qrySlotDetails.Max(x => x.AdministrationDetail.AdministeredDate);
            }
            return dtLastGiven;
        }
        public AddBlankCellToSlots(RowKey: number, ColKey: number, StartDTTM: DateTime, oSlots: ObservableCollection<IChartSlot>, sDoseType: string, IsPRN: boolean, IsPRNWithSchedule: boolean): void {
            this.nBlankCellCount = 0;
            if (this.oChartTypeSelected == ChartType.Medication_Chart && (IsPRN && !IsPRNWithSchedule)) {
                this.nBlankCellCount = 1;
            }
            else {
                this.nBlankCellCount = this.nMaxSlotCount - this.nCount;
            }
            if (this.nBlankCellCount > 0) {
                for (let j: number = 0; j < this.nBlankCellCount; j++) {
                    let sKey: string = RowKey.ToString() + ColKey.ToString() + j;
                    let oIChartSlot: IChartSlot = this.CreateBlankSlotForCell(sKey, StartDTTM, sDoseType, IsPRN, IsPRNWithSchedule);// IChartSlot inform platform team, to be implemented inform Sangeetha LorArcBlueBirdMedicationChart assembly
                    oSlots.Add(oIChartSlot);
                }
            }
        }
        public CreateSlotForOneDay(RowKey: number,  ColKey: number,  StartDTTM: DateTime,  oSlotDetail: List<SlotDetail>,  IsPRN: boolean,  sDoseType: string,  PrescriptionStartDTTM: DateTime,  PrescriptionEndDTTM: DateTime,  oTimeSpanSortedDetails: List<TimeSlot>,  IsUnackConflictExists: string,  oDrugHeader: DrugHeader,  IsPRNWithSchedule: boolean, out1: (MultiSlotDueCount: number) => void, out2: (MultiSlotOverdueCount: number) => void,  isMedChrt: boolean): ChartCell {
            let MultiSlotDueCount: number;
            let MultiSlotOverdueCount: number;

                        MultiSlotDueCount = 0;
                        MultiSlotOverdueCount = 0;
                        let oSlots: ObservableCollection<IChartSlot> = new ObservableCollection<IChartSlot>();
                        let oCell: ChartCell = new ChartCell();//TODO inform sangeetha if LorArcBlueBirdMedicationChart
                        oCell.Key = "ChartCell- " + RowKey + ColKey;
                        oCell.ColIndex = ColKey;
                        let IsBlankSlot: boolean = true;
                        this.nCount = oSlotDetail.Count;
                        if (!isMedChrt && this.oChartTypeSelected == ChartType.Medication_Chart && oTimeSpanSortedDetails != null && oSlotDetail != null && oTimeSpanSortedDetails.Count > 0 && oSlotDetail.Count > 0 && oTimeSpanSortedDetails.Count != oSlotDetail.Count && this.nMaxSlotCount > 1) {
                            isMedChrt = true;
                        }
                        if ((isMedChrt) || this.oChartTypeSelected == ChartType.Prescription_Chart || this.oChartTypeSelected == ChartType.Medication_Overview_Chart) {
                            if ((this.oChartTypeSelected == ChartType.Prescription_Chart || (this.oChartTypeSelected == ChartType.Medication_Chart) || (this.oChartTypeSelected == ChartType.Medication_Overview_Chart)) && (IsPRNWithSchedule || !IsPRN)) {
                                if (oTimeSpanSortedDetails != null && oTimeSpanSortedDetails.Count > 0) {
                                    let isMatchFound: boolean = false;
                                    let j: number = 0;
                                    let scheduleMatchSlots: IEnumerable<SlotDetail>;
                                    oTimeSpanSortedDetails.forEach( (slotScheduleTime)=> {
                                        isMatchFound = false;
                                        if (String.Equals(slotScheduleTime.Tag, "DST")) {
                                            slotScheduleTime.SlotTime = slotScheduleTime.SlotTime.Replace(" DST", "").Trim();
                                            scheduleMatchSlots = oSlotDetail.Where(sd =>slotScheduleTime.SlotTime==sd.ScheduledDTTM.ToUserDateTime().TimeOfDay.ToString("HH:mm")&&sd.ScheduledDTTM.ToUserDateTimeString(CConstants.DateTimeFormat).Contains("DST")&&TimeZoneInfo.Local.IsDSTWithInAmbiguousTime(sd.ScheduledDTTM)).Select(sd => sd);
                                            /* scheduleMatchSlots = from sd in oSlotDetail
                                            where slotScheduleTime.SlotTime == sd.ScheduledDTTM.ToUserDateTime().TimeOfDay.ToString("hh':'mm")
                                                //DST Issue Fixes :: IsAmbiguous() property Doesn't seem to be working properly.
                                                //Until platform fixes the above property, we can use ToUserDateTimeString() Property temporarily.
                                                //&& sd.ScheduledDTTM.IsAmbiguous()
                                                && sd.ScheduledDTTM.ToUserDateTimeString(CConstants.DateTimeFormat).Contains("DST")
                                                && sd.ScheduledDTTM.IsDaylightSavingTime()
                                            select sd; */
                                        }
                                        else {
                                            scheduleMatchSlots = oSlotDetail.Where(sd =>slotScheduleTime.SlotTime==sd.ScheduledDTTM.ToUserDateTime().TimeOfDay.ToString("HH:mm")&&!sd.ScheduledDTTM.ToUserDateTimeString(CConstants.DateTimeFormat).Contains("DST")).Select(sd => sd);
                                            /* scheduleMatchSlots = from sd in oSlotDetail
                                            where slotScheduleTime.SlotTime == sd.ScheduledDTTM.ToUserDateTime().TimeOfDay.ToString("hh':'mm")
                                                //TFS # 68263 :: DST Issue Fix : Starts
                                                //DST Issue Fixes :: IsAmbiguous() property Doesn't seem to be working properly.
                                                //Until platform fixes the above property, we can use ToUserDateTimeString() Property temporarily.
                                                /*&& ((sd.ScheduledDTTM.IsAmbiguous() && !sd.ScheduledDTTM.IsDaylightSavingTime())
                                                || (!sd.ScheduledDTTM.IsAmbiguous()))*/
                                               // && !sd.ScheduledDTTM.ToUserDateTimeString(CConstants.DateTimeFormat).Contains("DST")
                                            //TFS # 68263 :: DST Issue Fix : Stops
                                            //select sd; */
                                        }
                                        if (scheduleMatchSlots != null && scheduleMatchSlots.Count() > 0) {
                                            let scheduleMatchSlot = scheduleMatchSlots.First();
                                            if (scheduleMatchSlot != null) {
                                                isMatchFound = true;
                                                let oIChartSlot: IChartSlot = this.GenerateSlots(RowKey, ColKey, j, StartDTTM, scheduleMatchSlot, sDoseType, (o) => { IsBlankSlot = o; }, IsPRN, IsUnackConflictExists, oDrugHeader);
                                                //let oIChartSlot: IChartSlot = GenerateSlots(RowKey, ColKey, j, StartDTTM, scheduleMatchSlot, sDoseType, IsBlankSlot, IsPRN, IsUnackConflictExists, oDrugHeader);
                                                if (!IsBlankSlot) {
                                                    oSlots.Add(oIChartSlot);
                                                }
                                            }
                                        }
                                        if (!isMatchFound) {
                                            let sKey: string = RowKey.ToString() + ColKey.ToString() + j;
                                            let oIChartSlot: IChartSlot = this.CreateBlankSlotForCell(sKey, StartDTTM, sDoseType, IsPRN, IsPRNWithSchedule);
                                            oSlots.Add(oIChartSlot);
                                        }
                                        j++;
                                    });
                                    IsBlankSlot = false;
                                }
                            }
                            else if ((this.oChartTypeSelected == ChartType.Medication_Overview_Chart) && !IsPRN) {
                                if (DateTime.Equals(PrescriptionStartDTTM.Date , StartDTTM.Date)) {
                                    this.AddBlankCellToSlots(RowKey, ColKey, StartDTTM, oSlots, sDoseType, IsPRN, IsPRNWithSchedule);
                                    for (let k: number = 0; k < this.nCount; k++) {
                                        let oIChartSlot: IChartSlot = this.GenerateSlots(RowKey, ColKey, k, StartDTTM, oSlotDetail[k], sDoseType, (o) => { IsBlankSlot = o; }, IsPRN, IsUnackConflictExists, oDrugHeader);
                                        if (!IsBlankSlot) {
                                            oSlots.Add(oIChartSlot);
                                        }
                                    }
                                }
                                else {
                                    for (let k: number = 0; k < this.nCount; k++) {
                                        let oIChartSlot: IChartSlot = this.GenerateSlots(RowKey, ColKey, k, StartDTTM, oSlotDetail[k], sDoseType, (o) => { IsBlankSlot = o; }, IsPRN, IsUnackConflictExists, oDrugHeader);
                                        //let oIChartSlot: IChartSlot = this.GenerateSlots(RowKey, ColKey, k, StartDTTM, oSlotDetail[k], sDoseType, IsBlankSlot, IsPRN, IsUnackConflictExists, oDrugHeader);
                                        if (!IsBlankSlot) {
                                            oSlots.Add(oIChartSlot);
                                        }
                                    }
                                    this.AddBlankCellToSlots(RowKey, ColKey, StartDTTM, oSlots, sDoseType, IsPRN, IsPRNWithSchedule);
                                }
                                IsBlankSlot = false;
                            }
                            else {
                                if (this.oChartTypeSelected == ChartType.Prescription_Chart && IsPRN && !IsPRNWithSchedule && this.nCount > 0) {
                                    let oIChartSlot: IChartSlot = this.GenerateSlots(RowKey, ColKey, 1, StartDTTM, oSlotDetail[this.nCount-1], sDoseType, (o) => { IsBlankSlot = o; }, IsPRN, IsUnackConflictExists, oDrugHeader);
                                    //let oIChartSlot: IChartSlot = this.GenerateSlots(RowKey, ColKey, 1, StartDTTM, oSlotDetail[this.nCount - 1], sDoseType, IsBlankSlot, IsPRN, IsUnackConflictExists, oDrugHeader);
                                    if (!IsBlankSlot) {
                                        oSlots.Add(oIChartSlot);
                                    }
                                }
                                else {
                                    for (let k: number = 0; k < this.nCount; k++) {
                                        let oIChartSlot: IChartSlot = this.GenerateSlots(RowKey, ColKey, k, StartDTTM, oSlotDetail[k], sDoseType, (o) => { IsBlankSlot = o; }, IsPRN, IsUnackConflictExists, oDrugHeader);
                                        //let oIChartSlot: IChartSlot = this.GenerateSlots(RowKey, ColKey, k, StartDTTM, oSlotDetail[k], sDoseType, IsBlankSlot, IsPRN, IsUnackConflictExists, oDrugHeader);
                                        if (!IsBlankSlot) {
                                            oSlots.Add(oIChartSlot);
                                        }
                                    }
                                }
                                let slotCount: number = oSlots.Count;
                                this.AddBlankCellToSlots(RowKey, ColKey, StartDTTM, oSlots, sDoseType, IsPRN, IsPRNWithSchedule);
                                if (oSlots.Count > slotCount && this.nCount == 0)
                                    IsBlankSlot = false;
                            }
                        }
                        else {
                            let IsCreatePRNSlot: boolean = false;
                            if (IsPRN && !IsPRNWithSchedule) {
                                if (DateTime.NotEquals(PrescriptionStartDTTM , DateTime.MinValue) && DateTime.NotEquals(PrescriptionEndDTTM , DateTime.MinValue)) {
                                    if ((DateTime.GreaterThanOrEqualTo(StartDTTM.Date , PrescriptionStartDTTM.Date) && DateTime.LessThanOrEqualTo(StartDTTM.Date, PrescriptionEndDTTM.Date))) {
                                        IsCreatePRNSlot = true;
                                    }
                                }
                                else if (DateTime.NotEquals(PrescriptionStartDTTM , DateTime.MinValue)) {
                                    if (DateTime.GreaterThanOrEqualTo(StartDTTM.Date , PrescriptionStartDTTM.Date ) && DateTime.LessThanOrEqualTo(StartDTTM.Date , this.CurrntDt.Date)) {
                                        IsCreatePRNSlot = true;
                                    }
                                    else if (DateTime.GreaterThanOrEqualTo(!this.IsGreyedOut && StartDTTM.Date , PrescriptionStartDTTM.Date) && DateTime.GreaterThan(StartDTTM.Date , this.CurrntDt.Date)) {
                                        IsCreatePRNSlot = true;
                                    }
                                }
                            }
                            if (this.nCount == 0 && IsCreatePRNSlot) {
                                oSlots.Add(this.CreateAsRequiredSlot(oCell.Key, String.Empty, IsPRN, IsPRNWithSchedule, null, StartDTTM, IsUnackConflictExists, oSlotDetail));
                                IsBlankSlot = false;
                            }
                            else if (this.nCount > 0) {
                                if (IsPRN && !IsPRNWithSchedule || this.nCount > this.nMinSlotCount) {
                                    let sLastGivenAt: string = String.Empty;
                                    let sOverDueStatus: string = String.Empty;
                                    let sDueStatus: string = String.Empty;
                                    let sMultiSlotNetYetRecStatus: string = String.Empty;
                                    let dtLastGiven: DateTime= this.GetLastGivenAt(oSlotDetail);
                                    if (DateTime.NotEquals(dtLastGiven , DateTime.MinValue)) {
                                        if (IsPRN)
                                            sLastGivenAt = MedsAdminChartToolTip.PRNGivenatToolTip;
                                        else sLastGivenAt = MedsAdminChartToolTip.LastGivenAt;
                                        let sFormattedDateTime: string = dtLastGiven.ToUserDateTimeString(CConstants.Timeformat);
                                        if (((this.nCount > this.nMinSlotCount && IsPRN && IsPRNWithSchedule) || (!IsPRN && this.nCount > this.nMinSlotCount)) && (DateTime.NotEquals(StartDTTM.Date , dtLastGiven.Date)))
                                            sFormattedDateTime = dtLastGiven.ToUserDateTimeString(CConstants.DateTimeFormat);
                                        sLastGivenAt += sFormattedDateTime;
                                    }
                                    let oAdminSummaryList: ObservableCollection<ChartStringIcon> = this.CreateAdminSummary(RowKey, ColKey, oSlotDetail, IsPRN, (o1) => { sOverDueStatus = o1; }, (o2) => { sDueStatus = o2; }, (o3) => { sMultiSlotNetYetRecStatus = o3; }, (o4) => { MultiSlotDueCount = o4; }, (o5) => { MultiSlotOverdueCount = o5; });
                                    //let oAdminSummaryList: ObservableCollection<ChartStringIcon> = this.CreateAdminSummary(RowKey, ColKey, oSlotDetail, IsPRN, sOverDueStatus, sDueStatus, sMultiSlotNetYetRecStatus, MultiSlotDueCount, MultiSlotOverdueCount);
                                    if (IsCreatePRNSlot) {
                                        oSlots.Add(this.CreateAsRequiredSlot(oCell.Key, sLastGivenAt, IsPRN, IsPRNWithSchedule, oAdminSummaryList, StartDTTM, IsUnackConflictExists, oSlotDetail));
                                        IsBlankSlot = false;
                                    }
                                    else if (this.nCount > this.nMinSlotCount) {
                                        let sNextDueAt: string = String.Empty;
                                        let sMultiSlotStatus: string = String.Empty;
                                        if (!String.IsNullOrEmpty(sOverDueStatus) && sOverDueStatus == SlotStatus.OVERDUE) {
                                            sMultiSlotStatus = SlotStatus.OVERDUE;
                                        }
                                        else if (!String.IsNullOrEmpty(sDueStatus) && sDueStatus == SlotStatus.DUENOW) {
                                            sMultiSlotStatus = SlotStatus.DUENOW;
                                        }
                                        else if (!String.IsNullOrEmpty(sDueStatus) && sDueStatus == SlotStatus.DEFERDUENOW) {
                                            sMultiSlotStatus = SlotStatus.DEFERDUENOW;
                                        }
                                        else if (!String.IsNullOrEmpty(sMultiSlotNetYetRecStatus) && sMultiSlotNetYetRecStatus == SlotStatus.NOTYETRECORDED) {
                                            sMultiSlotStatus = SlotStatus.NOTYETRECORDED;
                                        }
                                        else {
                                            let dtNextDue: DateTime= DateTime.MinValue;
                                            if (MedChartData.ChartStatus == CConstants.sChartActiveStatusCode && !IsPRN && !IsPRNWithSchedule) {
                                                dtNextDue = this.GetNextDueAt(oSlotDetail);
                                            }
                                            if (DateTime.NotEquals(dtNextDue , DateTime.MinValue)) {
                                                sNextDueAt = MedsAdminChartToolTip.NextDueAt + " " + dtNextDue.ToUserDateTimeString(CConstants.Timeformat);
                                            }
                                        }
                                        oSlots.Add(this.CreateMutliSlot(oCell.Key, sLastGivenAt, sNextDueAt, sMultiSlotStatus, oAdminSummaryList, this.nCount, IsUnackConflictExists, oSlotDetail));
                                        IsBlankSlot = false;
                                    }
                                }
                                else {
                                    if (!String.IsNullOrEmpty(sDoseType) && (sDoseType == DoseTypeCode.STEPPEDVARIABLE || sDoseType == DoseTypeCode.TITRATED)) {
                                        this.MinSlotHeight = 80;
                                    }
                                    if (DateTime.Equals(PrescriptionStartDTTM.Date , StartDTTM)) {
                                        this.AddBlankCellToSlots(RowKey, ColKey, StartDTTM, oSlots, sDoseType, IsPRN, IsPRNWithSchedule);
                                        for (let i: number = 0; i < this.nCount; i++) {
                                            let oIChartSlot: IChartSlot = this.GenerateSlots(RowKey, ColKey, i, StartDTTM, oSlotDetail[i], sDoseType, (o) => { IsBlankSlot = o; }, IsPRN, IsUnackConflictExists, oDrugHeader);
                                            //let oIChartSlot: IChartSlot = this.GenerateSlots(RowKey, ColKey, i, StartDTTM, oSlotDetail[i], sDoseType, IsBlankSlot, IsPRN, IsUnackConflictExists, oDrugHeader);
                                            if (!IsBlankSlot) {
                                                oSlots.Add(oIChartSlot);
                                            }
                                        }
                                        IsBlankSlot = false;
                                    }
                                    else {
                                        for (let i: number = 0; i < this.nCount; i++) {
                                            let oIChartSlot: IChartSlot = this.GenerateSlots(RowKey, ColKey, i, StartDTTM, oSlotDetail[i], sDoseType, (o) => { IsBlankSlot = o; }, IsPRN, IsUnackConflictExists, oDrugHeader);
                                            //let oIChartSlot: IChartSlot = this.GenerateSlots(RowKey, ColKey, i, StartDTTM, oSlotDetail[i], sDoseType, IsBlankSlot, IsPRN, IsUnackConflictExists, oDrugHeader);
                                            if (!IsBlankSlot) {
                                                oSlots.Add(oIChartSlot);
                                            }
                                        }
                                        this.AddBlankCellToSlots(RowKey, ColKey, StartDTTM, oSlots, sDoseType, IsPRN, IsPRNWithSchedule);
                                        IsBlankSlot = false;
                                    }
                                }
                            }
                            else {
                                if (!String.IsNullOrEmpty(sDoseType) && (sDoseType == DoseTypeCode.STEPPEDVARIABLE || sDoseType == DoseTypeCode.TITRATED)) {
                                    this.MinSlotHeight = 80;
                                }
                                this.AddBlankCellToSlots(RowKey, ColKey, StartDTTM, oSlots, sDoseType, IsPRN, IsPRNWithSchedule);
                                IsBlankSlot = false;
                            }
                        }
                        if (IsBlankSlot) {
                            oSlots.Add(this.CreateBlankSlot(oCell.Key, StartDTTM, sDoseType));
                        }
                        oCell.Slots = oSlots;
                        out1(MultiSlotDueCount);
                        out2(MultiSlotOverdueCount);
                        return oCell;



            }
            public CreateInfusionTooltip(oSlotDetail: SlotDetail,  SlotDateTime: DateTime,  sDose: string, out1: (sHistoryToolTip: string) => void, out2: (sReason: string) => void,  IsPGD: boolean): string {
                let sHistoryToolTip: string;
                let sReason: string;

                            sHistoryToolTip = String.Empty;
                            sReason = String.Empty;
                            let sAdministeredBy: string = String.Empty;
                            let sAdministeredTime: string = String.Empty;
                            let sRecordedTime: string = String.Empty;
                            let sToolTip: string = String.Empty;
                            let sToolTipDose: string = String.Empty;
                            let strAdminAt: string = String.Empty;
                            let strAdminBy: string = String.Empty;
                            let strRecordAt: string = String.Empty;
                            let strRecordBy: string = String.Empty;
                            let strReason: string = String.Empty;
                            let strDoseDiscReason: string = String.Empty;
                            let strDueAt: string = String.Empty;
                            let strOmittedBy: string = String.Empty;
                            let strDose: string = String.Empty;
                            let sDueAT: string = String.Empty;
                            let strRelationshipToPatient: string = String.Empty;
                            if (!String.IsNullOrEmpty(oSlotDetail.AdministrationDetail.Dose) && !String.IsNullOrEmpty(oSlotDetail.DoseUOM)) {
                                strDose = oSlotDetail.AdministrationDetail.Dose + " " + oSlotDetail.DoseUOM;
                                sToolTipDose = "\n" + MedsAdminChartToolTip.DoseTootip + ": " + strDose;
                            }
                            else if (!String.IsNullOrEmpty(sDose))
                                sToolTipDose = "\n" + MedsAdminChartToolTip.DoseTootip + ": " + sDose;
                            else if (!String.IsNullOrEmpty(oSlotDetail.AdministrationDetail.Dose) && !String.IsNullOrEmpty(oSlotDetail.AdministrationDetail.DoseUOM)) {
                                strDose = oSlotDetail.AdministrationDetail.Dose + " " + oSlotDetail.AdministrationDetail.DoseUOM;
                                sToolTipDose = "\n" + MedsAdminChartToolTip.DoseTootip + ": " + strDose;
                            }
                            if (DateTime.NotEquals(oSlotDetail.ScheduledDTTM , DateTime.MinValue) && DateTime.NotEquals(SlotDateTime , DateTime.MinValue))
                                sDueAT = oSlotDetail.ScheduledDTTM.ToUserDateTimeString(CConstants.DateTimeFormat);
                            strDueAt = "\n" + MedsAdminChartToolTip.DueAtTooltip + ": " + sDueAT;
                            if (!String.IsNullOrEmpty(oSlotDetail.AdministrationDetail.AdministeredBy)) {
                                sAdministeredBy = oSlotDetail.AdministrationDetail.AdministeredBy;
                                if (String.Compare(oSlotDetail.Status, SlotStatus.OMITTED, StringComparison.CurrentCultureIgnoreCase) == 0) {
                                    strOmittedBy = "\n" + sAdministeredBy;
                                }
                                sHistoryToolTip += MedsAdminChartToolTip.UpdatedByToolTip + ": " + sAdministeredBy;
                            }
                            if (String.Equals(oSlotDetail.Status, SlotStatus.GIVEN, StringComparison.CurrentCultureIgnoreCase)) {
                                if (oSlotDetail.AdministrationDetail.AdministeredByOID == 0) {
                                    if (oSlotDetail.AdministrationDetail.AdminByPersonalCarerOID > 0) {
                                        if (this.personalCarers != null && this.personalCarers.Count > 0) {
                                            let selectedPersonalCarer: CListItem = this.personalCarers.FirstOrDefault(x => x.Value == oSlotDetail.AdministrationDetail.AdminByPersonalCarerOID.ToString());
                                            if (selectedPersonalCarer != null) {
                                                sAdministeredBy = Resource.MedicationAdministrator.rdbparent_text + " - " + selectedPersonalCarer.DisplayText;
                                                let relationCode: string = selectedPersonalCarer.Tag == null ? String.Empty : selectedPersonalCarer.Tag.ToString();
                                                if (!String.IsNullOrEmpty(relationCode) && this.resolvedConceptCodes != null && this.resolvedConceptCodes.Count > 0) {
                                                    relationCode = this.resolvedConceptCodes.Where(c => c.Value == relationCode).Select(s => s.DisplayText).FirstOrDefault().ToString();
                                                    strRelationshipToPatient = "\n" + MedsAdminChartToolTip.RelationshipToPatientToolTip + ": " + relationCode;
                                                }
                                            }
                                        }
                                    }
                                    else sAdministeredBy = Resource.MedicationAdministrator.rdbparent_text;
                                }
                                strAdminBy = "\n" + MedsAdminChartToolTip.AdministeredByToolTip + ": " + sAdministeredBy;
                            }
                            else if (String.Equals(oSlotDetail.Status, SlotStatus.SELFADMINISTERED, StringComparison.CurrentCultureIgnoreCase)) {
                                if (String.Equals(oSlotDetail.AdministrationDetail.AdministratorType, "PersonalCarer", StringComparison.CurrentCultureIgnoreCase)) {
                                    if (oSlotDetail.AdministrationDetail.AdminByPersonalCarerOID > 0) {
                                        if (this.personalCarers != null && this.personalCarers.Count > 0) {
                                            let selectedPersonalCarer: CListItem = this.personalCarers.FirstOrDefault(x => x.Value == oSlotDetail.AdministrationDetail.AdminByPersonalCarerOID.ToString());
                                            if (selectedPersonalCarer != null) {
                                                sAdministeredBy = Resource.MedicationAdministrator.rdbparent_text + " - " + selectedPersonalCarer.DisplayText;
                                                let relationCode: string = this.personalCarers.Where(c => c.Value == oSlotDetail.AdministrationDetail.AdminByPersonalCarerOID.ToString()).Select(s => s.Tag).FirstOrDefault().ToString();
                                                if (!String.IsNullOrEmpty(relationCode) && this.resolvedConceptCodes != null && this.resolvedConceptCodes.Count > 0) {
                                                    relationCode = this.resolvedConceptCodes.Where(c => c.Value == relationCode).Select(s => s.DisplayText).FirstOrDefault().ToString();
                                                    strRelationshipToPatient = "\n" + MedsAdminChartToolTip.RelationshipToPatientToolTip + ": " + relationCode;
                                                }
                                            }
                                        }
                                    }
                                    else sAdministeredBy = Resource.MedicationAdministrator.rdbparent_text;
                                }
                                else {
                                    sAdministeredBy = Resource.MedicationAdministrator.rdbpatient_text;
                                }
                                strAdminBy = "\n" + MedsAdminChartToolTip.AdministeredByToolTip + ": " + sAdministeredBy;
                            }
                            if (!String.IsNullOrEmpty(oSlotDetail.AdministrationDetail.RecordedBy)) {
                                if (String.Compare(oSlotDetail.AdministrationDetail.RecordedBy, "LORENZO", StringComparison.CurrentCultureIgnoreCase) == 0)
                                    strRecordBy = "\n" + MedsAdminChartToolTip.RecordedByToolTip + ": " + oSlotDetail.AdministrationDetail.RecordedBy;
                                else strRecordBy = "\n" + MedsAdminChartToolTip.RecordedByToolTip + ": " + oSlotDetail.AdministrationDetail.RecordedBy;
                            }
                            if (DateTime.NotEquals(oSlotDetail.AdministrationDetail.AdministeredDate , DateTime.MinValue)) {
                                sAdministeredTime = oSlotDetail.AdministrationDetail.AdministeredDate.ToUserDateTimeString(CConstants.DateTimeFormat);
                                strAdminAt = "\n" + MedsAdminChartToolTip.AdministeredAtToolTip + ": " + sAdministeredTime;
                                if (!String.IsNullOrEmpty(sHistoryToolTip)) {
                                    sHistoryToolTip += "\n";
                                }
                                sHistoryToolTip += MedsAdminChartToolTip.UpdatedOnToolTip + ": " + sAdministeredTime;
                            }
                            if (DateTime.NotEquals(oSlotDetail.AdministrationDetail.RecordedAt , DateTime.MinValue)) {
                                sRecordedTime = oSlotDetail.AdministrationDetail.RecordedAt.ToUserDateTimeString(CConstants.DateTimeFormat);
                                strRecordAt = "\n" + MedsAdminChartToolTip.RecordedAtToolTip + ": " + sRecordedTime;
                            }
                            if (String.Compare(oSlotDetail.Status, SlotStatus.OMITTED, StringComparison.CurrentCultureIgnoreCase) == 0) {
                                if (!String.IsNullOrEmpty(oSlotDetail.AdministrationDetail.AdminComments)) {
                                    sReason = oSlotDetail.AdministrationDetail.AdminComments;
                                }
                            }
                            else {
                                if (!String.IsNullOrEmpty(oSlotDetail.AdministrationDetail.ReasonNotGiven) && String.Compare(oSlotDetail.Status, SlotStatus.NOTGIVEN, StringComparison.CurrentCultureIgnoreCase) == 0 && String.Compare(oSlotDetail.AdministrationDetail.RecordedBy, "LORENZO", StringComparison.CurrentCultureIgnoreCase) != 0) {
                                    sReason = ValueDomainValues.oRecordAdminReasons.Count > 0 ? CommonBB.GetText(oSlotDetail.AdministrationDetail.ReasonNotGiven, ValueDomainValues.oRecordAdminReasons) : oSlotDetail.AdministrationDetail.ReasonNotGiven;
                                }
                                else {
                                    if (!String.IsNullOrEmpty(oSlotDetail.AdministrationDetail.AdminReasonCode) && String.Compare(oSlotDetail.AdministrationDetail.RecordedBy, "LORENZO", StringComparison.CurrentCultureIgnoreCase) != 0) {
                                        sReason = ValueDomainValues.oRecordAdminReasons.Count > 0 ? CommonBB.GetText(oSlotDetail.AdministrationDetail.AdminReasonCode, ValueDomainValues.oRecordAdminReasons) : oSlotDetail.AdministrationDetail.AdminReasonCode;
                                    }
                                    else if (!String.IsNullOrEmpty(oSlotDetail.AdministrationDetail.DoseDiscReasonCode)) {
                                        sReason = ValueDomainValues.oRecordAdminReasons.Count > 0 ? CommonBB.GetText(oSlotDetail.AdministrationDetail.DoseDiscReasonCode, ValueDomainValues.oRecordAdminReasons) : oSlotDetail.AdministrationDetail.DoseDiscReasonCode;
                                    }
                                }
                            }
                            if (!String.IsNullOrEmpty(sReason)) {
                                let isDoseDiscrepancyExists: boolean = false;
                                if (!String.IsNullOrEmpty(oSlotDetail.AdministrationDetail.AdminReasonCode) && ValueDomainValues.oRecordAdminDoseDiscrepancyReasons != null && ValueDomainValues.oRecordAdminDoseDiscrepancyReasons.Count > 0) {
                                    let DoseDiscrepancyValueSet = ValueDomainValues.oRecordAdminDoseDiscrepancyReasons.Where(cValueSet =>String.Compare(oSlotDetail.AdministrationDetail.AdminReasonCode,cValueSet.csCode,StringComparison.CurrentCultureIgnoreCase)==0).Select(cValueSet => cValueSet);
                                    /* let DoseDiscrepancyValueSet = from cValueSet in ValueDomainValues.oRecordAdminDoseDiscrepancyReasons
                                    where String.Compare(oSlotDetail.AdministrationDetail.AdminReasonCode, cValueSet.csCode, StringComparison.CurrentCultureIgnoreCase) == 0
                                    select cValueSet; */
                                    if (DoseDiscrepancyValueSet != null && DoseDiscrepancyValueSet.Count() > 0)
                                        isDoseDiscrepancyExists = true;
                                }
                                if (!isDoseDiscrepancyExists) {
                                    if (!String.IsNullOrEmpty(oSlotDetail.AdministrationDetail.DoseDiscReasonCode) && ValueDomainValues.oRecordAdminDoseDiscrepancyReasons != null && ValueDomainValues.oRecordAdminDoseDiscrepancyReasons.Count > 0) {
                                        let DoseDiscrepancyValueSet = ValueDomainValues.oRecordAdminDoseDiscrepancyReasons.Where(cValueSet =>String.Compare(oSlotDetail.AdministrationDetail.DoseDiscReasonCode,cValueSet.csCode,StringComparison.CurrentCultureIgnoreCase)==0).Select(cValueSet => cValueSet);
                                        /* let DoseDiscrepancyValueSet = from cValueSet in ValueDomainValues.oRecordAdminDoseDiscrepancyReasons
                                        where String.Compare(oSlotDetail.AdministrationDetail.DoseDiscReasonCode, cValueSet.csCode, StringComparison.CurrentCultureIgnoreCase) == 0
                                        select cValueSet; */
                                        if (DoseDiscrepancyValueSet != null && DoseDiscrepancyValueSet.Count() > 0)
                                            isDoseDiscrepancyExists = true;
                                    }
                                }
                                if (isDoseDiscrepancyExists)
                                    strDoseDiscReason = "\n" + MedsAdminChartToolTip.DoseDiscrepancyReasonToolTip + ": " + sReason;
                                strReason = sReason;
                            }
                            switch (oSlotDetail.Status) {
                                case SlotStatus.GIVEN:
                                    let sGivenStatusTooltip: string = this.GetGivenTooltip(IsPGD);
                                    if (oSlotDetail.AdministrationDetail.IsDuringHomeLeave) {
                                        sToolTip = sGivenStatusTooltip + MedsAdminChartToolTip.DuringHomeLeaveTooltip;
                                    }
                                    else {
                                        sToolTip = sGivenStatusTooltip;
                                    }
                                    if (!String.IsNullOrEmpty(sToolTipDose))
                                        sToolTip += sToolTipDose;
                                    if (!String.IsNullOrEmpty(strDoseDiscReason))
                                        sToolTip += strDoseDiscReason;
                                    if (!String.IsNullOrEmpty(strDueAt))
                                        sToolTip += strDueAt;
                                    if (!String.IsNullOrEmpty(strAdminAt))
                                        sToolTip += strAdminAt;
                                    if (!String.IsNullOrEmpty(strAdminBy))
                                        sToolTip += strAdminBy;
                                    if (!String.IsNullOrEmpty(strRelationshipToPatient))
                                        sToolTip += strRelationshipToPatient;
                                    if (!String.IsNullOrEmpty(strRecordAt))
                                        sToolTip += strRecordAt;
                                    if (!String.IsNullOrEmpty(strRecordBy))
                                        sToolTip += strRecordBy;
                                    break;
                                case SlotStatus.NOTGIVEN:
                                    if (oSlotDetail.AdministrationDetail.IsDuringHomeLeave) {
                                        sToolTip = MedsAdminChartToolTip.NotGivenStatusToolTip + MedsAdminChartToolTip.DuringHomeLeaveTooltip + "\n" + MedsAdminChartToolTip.ReasonToolTip + ": " + strReason;
                                    }
                                    else {
                                        sToolTip = MedsAdminChartToolTip.NotGivenStatusToolTip + "\n" + MedsAdminChartToolTip.ReasonToolTip + ": " + strReason;
                                    }
                                    if (!String.IsNullOrEmpty(strDueAt))
                                        sToolTip += strDueAt;
                                    if (!String.IsNullOrEmpty(strRecordAt))
                                        sToolTip += strRecordAt;
                                    if (!String.IsNullOrEmpty(strRecordBy))
                                        sToolTip += strRecordBy;
                                    break;
                                case SlotStatus.NOTKNOWN:
                                    if (oSlotDetail.AdministrationDetail.IsDuringHomeLeave) {
                                        sToolTip = MedsAdminChartToolTip.NotKnownStatusToolTip + MedsAdminChartToolTip.DuringHomeLeaveTooltip;
                                    }
                                    else {
                                        sToolTip = MedsAdminChartToolTip.NotKnownStatusToolTip;
                                    }
                                    if (!String.IsNullOrEmpty(strDueAt))
                                        sToolTip += strDueAt;
                                    if (!String.IsNullOrEmpty(strRecordAt))
                                        sToolTip += strRecordAt;
                                    if (!String.IsNullOrEmpty(strRecordBy))
                                        sToolTip += strRecordBy;
                                    break;
                                case SlotStatus.SELFADMINISTERED:
                                    if (oSlotDetail.AdministrationDetail.IsDuringHomeLeave) {
                                        sToolTip = MedsAdminChartToolTip.SelfAdminStatusToolTip + MedsAdminChartToolTip.DuringHomeLeaveTooltip;
                                    }
                                    else {
                                        sToolTip = MedsAdminChartToolTip.SelfAdminStatusToolTip;
                                    }
                                    if (!String.IsNullOrEmpty(sToolTipDose))
                                        sToolTip += sToolTipDose;
                                    if (!String.IsNullOrEmpty(strDoseDiscReason))
                                        sToolTip += strDoseDiscReason;
                                    if (!String.IsNullOrEmpty(strDueAt))
                                        sToolTip += strDueAt;
                                    if (!String.IsNullOrEmpty(strAdminAt))
                                        sToolTip += strAdminAt;
                                    if (!String.IsNullOrEmpty(strAdminBy))
                                        sToolTip += strAdminBy;
                                    if (!String.IsNullOrEmpty(strRelationshipToPatient))
                                        sToolTip += strRelationshipToPatient;
                                    if (!String.IsNullOrEmpty(strRecordAt))
                                        sToolTip += strRecordAt;
                                    if (!String.IsNullOrEmpty(strRecordBy))
                                        sToolTip += strRecordBy;
                                    break;
                                case SlotStatus.PATIENTSELFADMIN:
                                    sToolTip = MedsAdminChartToolTip.PatientSelfAdministering;
                                    break;
                                case SlotStatus.DEFEROVERDUE:
                                case SlotStatus.DEFERDUENOW:
                                case SlotStatus.DEFERADMIN:
                                    sAdministeredTime = oSlotDetail.AdministrationDetail.AdministeredDate.ToUserDateTimeString(CConstants.DateTimeFormat);
                                    sToolTip = "Deferred at: " + sAdministeredTime;
                                    sToolTip += "\n" + "Deferred by: " + oSlotDetail.AdministrationDetail.RecordedBy;
                                    if (!String.IsNullOrEmpty(sReason))
                                        sToolTip += "\n" + "Reason: " + sReason;
                                    break;
                                case SlotStatus.OMITTED:
                                    sToolTip = MedsAdminChartToolTip.OmittedStatusToolTip;
                                    sToolTip += "\n" + oSlotDetail.AdministrationDetail.RecordedBy;
                                    sToolTip += "\n" + MedsAdminChartToolTip.ReasonToolTip + ": " + strReason;
                                    break;
                            }

                 out1(sHistoryToolTip);
                out2(sReason);
                return sToolTip;

                }
        public GetGivenTooltip(IsPGD: boolean): string {
            let sGivenStatusTooltip: string = String.Empty;
            if (IsPGD) {
                sGivenStatusTooltip = MedsAdminChartToolTip.GrdStatusText + ": " + MedsAdminChartToolTip.PGDGiven;
            }
            else {
                sGivenStatusTooltip = MedsAdminChartToolTip.GivenStatusToolTip;
            }
            return sGivenStatusTooltip;
        }
        public CreateTooltip(oSlotDetail: SlotDetail,  SlotDateTime: DateTime,  sDose: string, out1: (sHistoryToolTip: string) => void, out2: (sReason: string) => void,  IsPRN: boolean,  IsPRNWithSchedule: boolean,  IsPGD: boolean): string {
            let sHistoryToolTip: string;
            let sReason: string;

                        sHistoryToolTip = String.Empty;
                        sReason = String.Empty;
                        let sAdministeredBy: string = String.Empty;
                        let sAdministeredTime: string = String.Empty;
                        let sRecordedTime: string = String.Empty;
                        let sToolTip: string = String.Empty;
                        let sToolTipDose: string = String.Empty;
                        let strAdminAt: string = String.Empty;
                        let strAdminBy: string = String.Empty;
                        let strRelationshipToPatient: string = String.Empty;
                        let strRecordAt: string = String.Empty;
                        let strRecordBy: string = String.Empty;
                        let strReason: string = String.Empty;
                        let strDoseDiscReason: string = String.Empty;
                        let strDueAt: string = String.Empty;
                        let strOmittedBy: string = String.Empty;
                        let strDose: string = String.Empty;
                        let sDueAT: string = String.Empty;
                        if (!String.IsNullOrEmpty(oSlotDetail.AdministrationDetail.Dose) && !String.IsNullOrEmpty(oSlotDetail.DoseUOM)) {
                            strDose = oSlotDetail.AdministrationDetail.Dose + " " + oSlotDetail.DoseUOM;
                            if (this.oChartTypeSelected == ChartType.Prescription_Chart && IsPRN && !IsPRNWithSchedule) {
                                sToolTipDose = "\n" + MedsAdminChartToolTip.LastDoseTootip + ": " + strDose;
                            }
                            else {
                                sToolTipDose = "\n" + MedsAdminChartToolTip.DoseTootip + ": " + strDose;
                            }
                        }
                        else if (!String.IsNullOrEmpty(sDose))
                            sToolTipDose = "\n" + MedsAdminChartToolTip.DoseTootip + ": " + sDose;
                        else if (!String.IsNullOrEmpty(oSlotDetail.AdministrationDetail.Dose) && !String.IsNullOrEmpty(oSlotDetail.AdministrationDetail.DoseUOM)) {
                            strDose = oSlotDetail.AdministrationDetail.Dose + " " + oSlotDetail.AdministrationDetail.DoseUOM;
                            sToolTipDose = "\n" + MedsAdminChartToolTip.DoseTootip + ": " + strDose;
                        }
                        if (DateTime.NotEquals(oSlotDetail.ScheduledDTTM , DateTime.MinValue) && DateTime.NotEquals(SlotDateTime , DateTime.MinValue))
                            sDueAT = oSlotDetail.ScheduledDTTM.ToUserDateTimeString(CConstants.DateTimeFormat);
                        strDueAt = "\n" + MedsAdminChartToolTip.DueAtTooltip + ": " + sDueAT;
                        if (!String.IsNullOrEmpty(oSlotDetail.AdministrationDetail.AdministeredBy)) {
                            sAdministeredBy = oSlotDetail.AdministrationDetail.AdministeredBy;
                            if (String.Compare(oSlotDetail.Status, SlotStatus.OMITTED, StringComparison.CurrentCultureIgnoreCase) == 0) {
                                strOmittedBy = "\n" + sAdministeredBy;
                            }
                            sHistoryToolTip += MedsAdminChartToolTip.UpdatedByToolTip + ": " + sAdministeredBy;
                        }
                        if (String.Equals(oSlotDetail.Status, SlotStatus.GIVEN, StringComparison.CurrentCultureIgnoreCase)) {
                            if (oSlotDetail.AdministrationDetail.AdministeredByOID == 0) {
                                if (oSlotDetail.AdministrationDetail.AdminByPersonalCarerOID > 0) {
                                    if (this.personalCarers != null && this.personalCarers.Count > 0) {
                        let selectedPersonalCarer: CListItem;
                        this.personalCarers.forEach((personalCarers_items) => {
                            if (String.Equals(personalCarers_items.Value, Convert.ToString(oSlotDetail.AdministrationDetail.AdminByPersonalCarerOID))) {
                                selectedPersonalCarer = personalCarers_items;
                            }
                        });
                                        if (selectedPersonalCarer != null) {
                                            sAdministeredBy = Resource.MedicationAdministrator.rdbparent_text + " - " + selectedPersonalCarer.DisplayText;
                                            let relationCode: string = selectedPersonalCarer.Tag == null ? String.Empty : selectedPersonalCarer.Tag.ToString();
                                            if (!String.IsNullOrEmpty(relationCode) && this.resolvedConceptCodes != null && this.resolvedConceptCodes.Count > 0) {
                                                relationCode = this.resolvedConceptCodes.Where(c => c.Value == relationCode).Select(s => s.DisplayText).FirstOrDefault().ToString();
                                                strRelationshipToPatient = "\n" + MedsAdminChartToolTip.RelationshipToPatientToolTip + ": " + relationCode;
                                            }
                                        }
                                    }
                                }
                                else sAdministeredBy = Resource.MedicationAdministrator.rdbparent_text;
                            }
                            strAdminBy = "\n" + MedsAdminChartToolTip.AdministeredByToolTip + ": " + sAdministeredBy;
                        }
                        else if (String.Equals(oSlotDetail.Status, SlotStatus.SELFADMINISTERED, StringComparison.CurrentCultureIgnoreCase)) {
                            if (String.Equals(oSlotDetail.AdministrationDetail.AdministratorType, "PersonalCarer", StringComparison.CurrentCultureIgnoreCase)) {
                                if (oSlotDetail.AdministrationDetail.AdminByPersonalCarerOID > 0) {
                                    if (this.personalCarers != null && this.personalCarers.Count > 0) {
                        let selectedPersonalCarer: CListItem;
                        this.personalCarers.forEach((personalCarers_items) => {
                            if (String.Equals(personalCarers_items.Value, Convert.ToString(oSlotDetail.AdministrationDetail.AdminByPersonalCarerOID))) {
                                selectedPersonalCarer = personalCarers_items;
                            }
                        });
                                        if (selectedPersonalCarer != null) {
                                            sAdministeredBy = Resource.MedicationAdministrator.rdbparent_text + " - " + selectedPersonalCarer.DisplayText;
                                            let relationCode: string = this.personalCarers.Where(c => c.Value == oSlotDetail.AdministrationDetail.AdminByPersonalCarerOID.ToString()).Select(s => s.Tag).FirstOrDefault().ToString();
                                            if (!String.IsNullOrEmpty(relationCode) && this.resolvedConceptCodes != null && this.resolvedConceptCodes.Count > 0) {
                                                relationCode = this.resolvedConceptCodes.Where(c => c.Value == relationCode).Select(s => s.DisplayText).FirstOrDefault().ToString();
                                                strRelationshipToPatient = "\n" + MedsAdminChartToolTip.RelationshipToPatientToolTip + ": " + relationCode;
                                            }
                                        }
                                    }
                                }
                                else sAdministeredBy = Resource.MedicationAdministrator.rdbparent_text;
                            }
                            else {
                                sAdministeredBy = Resource.MedicationAdministrator.rdbpatient_text;
                            }
                            strAdminBy = "\n" + MedsAdminChartToolTip.AdministeredByToolTip + ": " + sAdministeredBy;
                        }
                        if (!String.IsNullOrEmpty(oSlotDetail.AdministrationDetail.RecordedBy)) {
                            if (String.Compare(oSlotDetail.AdministrationDetail.RecordedBy, "LORENZO", StringComparison.CurrentCultureIgnoreCase) == 0)
                                strRecordBy = "\n" + MedsAdminChartToolTip.RecordedByToolTip + ": " + oSlotDetail.AdministrationDetail.RecordedBy;
                            else strRecordBy = "\n" + MedsAdminChartToolTip.RecordedByToolTip + ": " + oSlotDetail.AdministrationDetail.RecordedBy;
                        }
                        if (DateTime.NotEquals(oSlotDetail.AdministrationDetail.AdministeredDate , DateTime.MinValue)) {
                            sAdministeredTime = oSlotDetail.AdministrationDetail.AdministeredDate.ToUserDateTimeString(CConstants.DateTimeFormat);
                            strAdminAt = "\n" + MedsAdminChartToolTip.AdministeredAtToolTip + ": " + sAdministeredTime;
                            if (!String.IsNullOrEmpty(sHistoryToolTip)) {
                                sHistoryToolTip += "\n";
                            }
                            sHistoryToolTip += MedsAdminChartToolTip.UpdatedOnToolTip + ": " + sAdministeredTime;
                        }
                        if (DateTime.NotEquals(oSlotDetail.AdministrationDetail.RecordedAt , DateTime.MinValue)) {
                            sRecordedTime = oSlotDetail.AdministrationDetail.RecordedAt.ToUserDateTimeString(CConstants.DateTimeFormat);
                            strRecordAt = "\n" + MedsAdminChartToolTip.RecordedAtToolTip + ": " + sRecordedTime;
                        }
                        if (String.Compare(oSlotDetail.Status, SlotStatus.OMITTED, StringComparison.CurrentCultureIgnoreCase) == 0) {
                            if (!String.IsNullOrEmpty(oSlotDetail.AdministrationDetail.AdminComments)) {
                                sReason = oSlotDetail.AdministrationDetail.AdminComments;
                            }
                            else if (!String.IsNullOrEmpty(oSlotDetail.AdministrationDetail.AdminReasonCode)) {
                                sReason = oSlotDetail.AdministrationDetail.AdminReasonCode;
                            }
                        }
                        else {
                            if (!String.IsNullOrEmpty(oSlotDetail.AdministrationDetail.ReasonNotGiven) && String.Compare(oSlotDetail.Status, SlotStatus.NOTGIVEN, StringComparison.CurrentCultureIgnoreCase) == 0) {
                                sReason = ValueDomainValues.oRecordAdminReasons.Count > 0 ? CommonBB.GetText(oSlotDetail.AdministrationDetail.ReasonNotGiven, ValueDomainValues.oRecordAdminReasons) : oSlotDetail.AdministrationDetail.ReasonNotGiven;
                            }
                            else {
                                if (!String.IsNullOrEmpty(oSlotDetail.AdministrationDetail.AdminReasonCode) && String.Compare(oSlotDetail.AdministrationDetail.RecordedBy, "LORENZO", StringComparison.CurrentCultureIgnoreCase) != 0) {
                                    sReason = ValueDomainValues.oRecordAdminReasons.Count > 0 ? CommonBB.GetText(oSlotDetail.AdministrationDetail.AdminReasonCode, ValueDomainValues.oRecordAdminReasons) : oSlotDetail.AdministrationDetail.AdminReasonCode;
                                }
                                else if (!String.IsNullOrEmpty(oSlotDetail.AdministrationDetail.DoseDiscReasonCode)) {
                                    sReason = ValueDomainValues.oRecordAdminReasons.Count > 0 ? CommonBB.GetText(oSlotDetail.AdministrationDetail.DoseDiscReasonCode, ValueDomainValues.oRecordAdminReasons) : oSlotDetail.AdministrationDetail.DoseDiscReasonCode;
                                }
                            }
                        }
                        if (!String.IsNullOrEmpty(sReason)) {
                            let isDoseDiscrepancyExists: boolean = false;
                            if (!String.IsNullOrEmpty(oSlotDetail.AdministrationDetail.AdminReasonCode) && ValueDomainValues.oRecordAdminDoseDiscrepancyReasons != null && ValueDomainValues.oRecordAdminDoseDiscrepancyReasons.Count > 0) {
                                let DoseDiscrepancyValueSet = ValueDomainValues.oRecordAdminDoseDiscrepancyReasons.Where(cValueSet =>String.Compare(oSlotDetail.AdministrationDetail.AdminReasonCode,cValueSet.csCode,StringComparison.CurrentCultureIgnoreCase)==0).Select(cValueSet => cValueSet);
                                /* let DoseDiscrepancyValueSet = from cValueSet in ValueDomainValues.oRecordAdminDoseDiscrepancyReasons
                                where String.Compare(oSlotDetail.AdministrationDetail.AdminReasonCode, cValueSet.csCode, StringComparison.CurrentCultureIgnoreCase) == 0
                                select cValueSet; */
                                if (DoseDiscrepancyValueSet != null && DoseDiscrepancyValueSet.Count() > 0)
                                    isDoseDiscrepancyExists = true;
                            }
                            if (!isDoseDiscrepancyExists) {
                                if (!String.IsNullOrEmpty(oSlotDetail.AdministrationDetail.DoseDiscReasonCode) && ValueDomainValues.oRecordAdminDoseDiscrepancyReasons != null && ValueDomainValues.oRecordAdminDoseDiscrepancyReasons.Count > 0) {
                                    let DoseDiscrepancyValueSet = ValueDomainValues.oRecordAdminDoseDiscrepancyReasons.Where(cValueSet =>String.Compare(oSlotDetail.AdministrationDetail.DoseDiscReasonCode,cValueSet.csCode,StringComparison.CurrentCultureIgnoreCase)==0).Select(cValueSet => cValueSet);
                                    /* let DoseDiscrepancyValueSet = from cValueSet in ValueDomainValues.oRecordAdminDoseDiscrepancyReasons
                                    where String.Compare(oSlotDetail.AdministrationDetail.DoseDiscReasonCode, cValueSet.csCode, StringComparison.CurrentCultureIgnoreCase) == 0
                                    select cValueSet; */
                                    if (DoseDiscrepancyValueSet != null && DoseDiscrepancyValueSet.Count() > 0)
                                        isDoseDiscrepancyExists = true;
                                }
                            }
                            if (isDoseDiscrepancyExists)
                                strDoseDiscReason = "\n" + MedsAdminChartToolTip.DoseDiscrepancyReasonToolTip + ": " + sReason;
                            strReason = sReason;
                        }
                        switch (oSlotDetail.Status) {
                            case SlotStatus.GIVEN:
                                let sGivenStatusTooltip: string = this.GetGivenTooltip(IsPGD);
                                if (oSlotDetail.AdministrationDetail.IsDuringHomeLeave) {
                                    sToolTip = sGivenStatusTooltip + MedsAdminChartToolTip.DuringHomeLeaveTooltip;
                                }
                                else {
                                    sToolTip = sGivenStatusTooltip;
                                }
                                if (!String.IsNullOrEmpty(sToolTipDose))
                                    sToolTip += sToolTipDose;
                                if (!String.IsNullOrEmpty(strDoseDiscReason))
                                    sToolTip += strDoseDiscReason;
                                if (!String.IsNullOrEmpty(strDueAt))
                                    sToolTip += strDueAt;
                                if (!String.IsNullOrEmpty(strAdminAt))
                                    sToolTip += strAdminAt;
                                if (!String.IsNullOrEmpty(strAdminBy))
                                    sToolTip += strAdminBy;
                                if (!String.IsNullOrEmpty(strRelationshipToPatient))
                                    sToolTip += strRelationshipToPatient;
                                if (!String.IsNullOrEmpty(strRecordAt))
                                    sToolTip += strRecordAt;
                                if (!String.IsNullOrEmpty(strRecordBy))
                                    sToolTip += strRecordBy;
                                break;
                            case SlotStatus.NOTGIVEN:
                                if (oSlotDetail.AdministrationDetail.IsDuringHomeLeave) {
                                    sToolTip = MedsAdminChartToolTip.NotGivenStatusToolTip + MedsAdminChartToolTip.DuringHomeLeaveTooltip + "\n" + MedsAdminChartToolTip.ReasonToolTip + ": " + strReason;
                                }
                                else {
                                    sToolTip = MedsAdminChartToolTip.NotGivenStatusToolTip + "\n" + MedsAdminChartToolTip.ReasonToolTip + ": " + strReason;
                                }
                                if (!String.IsNullOrEmpty(strDueAt))
                                    sToolTip += strDueAt;
                                if (!String.IsNullOrEmpty(strRecordAt))
                                    sToolTip += strRecordAt;
                                if (!String.IsNullOrEmpty(strRecordBy))
                                    sToolTip += strRecordBy;
                                break;
                            case SlotStatus.NOTKNOWN:
                                if (oSlotDetail.AdministrationDetail.IsDuringHomeLeave) {
                                    sToolTip = MedsAdminChartToolTip.NotKnownStatusToolTip + MedsAdminChartToolTip.DuringHomeLeaveTooltip;
                                }
                                else {
                                    sToolTip = MedsAdminChartToolTip.NotKnownStatusToolTip;
                                }
                                if (!String.IsNullOrEmpty(strDueAt))
                                    sToolTip += strDueAt;
                                if (!String.IsNullOrEmpty(strRecordAt))
                                    sToolTip += strRecordAt;
                                if (!String.IsNullOrEmpty(strRecordBy))
                                    sToolTip += strRecordBy;
                                break;
                            case SlotStatus.SELFADMINISTERED:
                                if (oSlotDetail.AdministrationDetail.IsDuringHomeLeave) {
                                    sToolTip = MedsAdminChartToolTip.SelfAdminStatusToolTip + MedsAdminChartToolTip.DuringHomeLeaveTooltip;
                                }
                                else {
                                    sToolTip = MedsAdminChartToolTip.SelfAdminStatusToolTip;
                                }
                                if (!String.IsNullOrEmpty(sToolTipDose))
                                    sToolTip += sToolTipDose;
                                if (!String.IsNullOrEmpty(strDoseDiscReason))
                                    sToolTip += strDoseDiscReason;
                                if (!String.IsNullOrEmpty(strDueAt))
                                    sToolTip += strDueAt;
                                if (!String.IsNullOrEmpty(strAdminAt))
                                    sToolTip += strAdminAt;
                                if (!String.IsNullOrEmpty(strAdminBy))
                                    sToolTip += strAdminBy;
                                if (!String.IsNullOrEmpty(strRelationshipToPatient))
                                    sToolTip += strRelationshipToPatient;
                                if (!String.IsNullOrEmpty(strRecordAt))
                                    sToolTip += strRecordAt;
                                if (!String.IsNullOrEmpty(strRecordBy))
                                    sToolTip += strRecordBy;
                                break;
                            case SlotStatus.PATIENTSELFADMIN:
                                sToolTip = MedsAdminChartToolTip.PatientSelfAdministering;
                                break;
                            case SlotStatus.DEFEROVERDUE:
                            case SlotStatus.DEFERDUENOW:
                            case SlotStatus.DEFERADMIN:
                                sAdministeredTime = oSlotDetail.AdministrationDetail.AdministeredDate.ToUserDateTimeString(CConstants.DateTimeFormat);
                                sToolTip = "Deferred at: " + sAdministeredTime;
                                sToolTip += "\n" + "Deferred by: " + oSlotDetail.AdministrationDetail.RecordedBy;
                                if (!String.IsNullOrEmpty(sReason))
                                    sToolTip += "\n" + "Reason: " + sReason;
                                break;
                            case SlotStatus.OMITTED:
                                sToolTip = MedsAdminChartToolTip.OmittedStatusToolTip;
                                sToolTip += strOmittedBy + "\n" + MedsAdminChartToolTip.ReasonToolTip + ": " + strReason;
                                break;
                        }

                out1(sHistoryToolTip);
                out2(sReason);
                return sToolTip;
            }
            public CreateTooltipForRecordAdmin(oSlotDetailVM: SlotDetailVM,  SlotDateTime: DateTime,  sDose: string, out1: (sHistoryToolTip: string) => void, out2: (sDiscrepancyReason: string) => void): string {
                let sHistoryToolTip: string;
                let sDiscrepancyReason: string;

                            let sToolTip: string = String.Empty;
                            let oSlotDetails: SlotDetail = new SlotDetail();
                            oSlotDetails.Status = oSlotDetailVM.Status;
                            oSlotDetails.AdministrationDetail = new AdministrationDetail(); //LorAppMedicationCommonBB_P2 mostly would be commented
                            if (!String.IsNullOrEmpty(oSlotDetailVM.AdministrationDetail.AdministeredBy))
                                oSlotDetails.AdministrationDetail.AdministeredBy = oSlotDetailVM.AdministrationDetail.AdministeredBy;
                            if (DateTime.NotEquals(oSlotDetailVM.AdministrationDetail.AdministeredDate , DateTime.MinValue))
                                oSlotDetails.AdministrationDetail.AdministeredDate = oSlotDetailVM.AdministrationDetail.AdministeredDate;
                            if (oSlotDetailVM.AdministrationDetail.SelectedAdminReasonCode != null)
                                oSlotDetails.AdministrationDetail.AdminReasonCode = oSlotDetailVM.AdministrationDetail.SelectedAdminReasonCode.Value;
                            else if (oSlotDetailVM.AdministrationDetail.ReasonForNotDefer != null)
                                oSlotDetails.AdministrationDetail.AdminReasonCode = oSlotDetailVM.AdministrationDetail.ReasonForNotDefer.Value;
                            if (oSlotDetailVM.AdministrationDetail.AmendReasonCode != null)
                                oSlotDetails.AdministrationDetail.AmendReasonCode = oSlotDetailVM.AdministrationDetail.AmendReasonCode.Value;
                            if (oSlotDetailVM.AdministrationDetail.DoseDiscReasonCode != null)
                                oSlotDetails.AdministrationDetail.DoseDiscReasonCode = oSlotDetailVM.AdministrationDetail.DoseDiscReasonCode.Value;
                            if (oSlotDetailVM.AdministrationDetail.ReasonNotGiven != null)
                                oSlotDetails.AdministrationDetail.ReasonNotGiven = oSlotDetailVM.AdministrationDetail.ReasonNotGiven.DisplayText;
                            if (!String.IsNullOrEmpty(oSlotDetailVM.AdministrationDetail.RecordedBy))
                                oSlotDetails.AdministrationDetail.RecordedBy = oSlotDetailVM.AdministrationDetail.RecordedBy;
                            if (!String.IsNullOrEmpty(Convert.ToString(oSlotDetailVM.ScheduledDTTM))) {
                                oSlotDetails.ScheduledDTTM = oSlotDetailVM.ScheduledDTTM;
                            }
                            if (DateTime.NotEquals(oSlotDetailVM.AdministrationDetail.RecordedAt ,DateTime.MinValue))
                                oSlotDetails.AdministrationDetail.RecordedAt = oSlotDetailVM.AdministrationDetail.RecordedAt;
                            oSlotDetails.AdministrationDetail.AdministeredByOID = String.IsNullOrEmpty(oSlotDetailVM.AdministrationDetail.AdministeredByOID) ? 0 : Convert.ToInt64(oSlotDetailVM.AdministrationDetail.AdministeredByOID);
                            oSlotDetails.AdministrationDetail.AdminByPersonalCarerOID = oSlotDetailVM.AdministrationDetail.AdminByPersonalCarerOID;
                            oSlotDetails.AdministrationDetail.AdministratorType = oSlotDetailVM.AdministrationDetail.AdministratorType;
                            oSlotDetails.AdministrationDetail.IsDuringHomeLeave = oSlotDetailVM.AdministrationDetail.IsDuringHomeLeave;
                            sToolTip = this.CreateTooltip(oSlotDetails, SlotDateTime, sDose, (o1) => { sHistoryToolTip = o1; }, (o2) => { sDiscrepancyReason = o2; }, false, false, false);
                            //sToolTip = this.CreateTooltip(oSlotDetails, SlotDateTime, sDose, sHistoryToolTip, sDiscrepancyReason, false, false, false);
                            if (String.IsNullOrEmpty(oSlotDetails.AdministrationDetail.DoseDiscReasonCode))
                                sDiscrepancyReason = String.Empty;

                    out1(sHistoryToolTip);
                    out2(sDiscrepancyReason);
                    return sToolTip;
                }
                public GenerateSlots(RowKey: number,  ColKey: number,  CellKey: number,  StartDTTM: DateTime,  oSlotDetail: SlotDetail,  sDoseType: string, out1: (IsBlankSlot: boolean) => void,  IsPRN: boolean,  IsUnackConflictExists: string,  oDrugHeader: DrugHeader): IChartSlot {
                    let IsBlankSlot: boolean;

                                let oIChartSlot: IChartSlot = null;
                                IsBlankSlot = true;
                                let sSlotKey: string = RowKey.ToString() + ColKey.ToString() + CellKey.ToString();
                                let SlotDateTime: DateTime= DateTime.MinValue;
                                let sDose: string = String.Empty;
                                let sSlotDose: string = String.Empty;
                                let sUpperDose: string = String.Empty;
                                let sHistoryToolTip: string = String.Empty;
                                let sReason: string = String.Empty;
                                let sAdminOnTimeMode: string = '\0';
                                let sAdminOnTimeDiffValue: string = String.Empty;
                                let IsHistoryExists: boolean = false;
                                let sToolTip: string = String.Empty;
                                let sAdminComments: string = oSlotDetail.AdministrationDetail != null ? oSlotDetail.AdministrationDetail.AdminComments : String.Empty;
                                let oTagSlotDetail: TagSlotDetail = null;
                                let sDueAt: string = String.Empty;
                                oTagSlotDetail = this.CreateTagSlotObject(oSlotDetail);
                                oTagSlotDetail.IsInfusion = oDrugHeader.IsInfusion;
                                oTagSlotDetail.INFTYCODE = oDrugHeader.InfusionType;
                                oTagSlotDetail.IsPRN = IsPRN;
                                oTagSlotDetail.IsBolus = oDrugHeader.IsBolus;
                                if (DateTime.NotEquals(oSlotDetail.ScheduledDTTM , DateTime.MinValue)) {
                                    SlotDateTime = oSlotDetail.ScheduledDTTM;
                                }
                                let dblDose: number = 0;
                                Number.TryParse(oSlotDetail.Dose, (o) => { dblDose = o; });
                                //Number.TryParse(oSlotDetail.Dose, dblDose);
                                if (this.IsTitrated && dblDose == 0) {
                                    sDose = sSlotDose = CConstants.DoseTBD;
                                }
                                else if (!String.IsNullOrEmpty(oSlotDetail.Dose) && oSlotDetail.Dose != "0" && !String.IsNullOrEmpty(oSlotDetail.DoseUOM) && oSlotDetail.DoseUOM != "0" && !String.IsNullOrEmpty(oSlotDetail.UpperDose) && oSlotDetail.UpperDose != "0") {
                                    sSlotDose = oSlotDetail.Dose + "-" + oSlotDetail.UpperDose + " " + oSlotDetail.DoseUOM;
                                    sDose = oSlotDetail.Dose + " " + oSlotDetail.DoseUOM;
                                }
                                else if (!String.IsNullOrEmpty(oSlotDetail.Dose) && oSlotDetail.Dose != "0" && !String.IsNullOrEmpty(oSlotDetail.DoseUOM) && oSlotDetail.DoseUOM != "0") {
                                    sDose = sSlotDose = oSlotDetail.Dose + " " + oSlotDetail.DoseUOM;
                                }
                                else if (!String.IsNullOrEmpty(oSlotDetail.Dose) && oSlotDetail.Dose != "0") {
                                    sDose = sSlotDose = oSlotDetail.Dose;
                                }
                                else if (!String.IsNullOrEmpty(oSlotDetail.DoseUOM) && oSlotDetail.DoseUOM != "0") {
                                    sDose = sSlotDose = oSlotDetail.DoseUOM;
                                }
                                if (!String.IsNullOrEmpty(sDose) && !String.IsNullOrEmpty(oSlotDetail.InfusionRate) && oSlotDetail.InfusionRate != "0" && !String.IsNullOrEmpty(oSlotDetail.InfUpperRate) && oSlotDetail.InfUpperRate != "0" && !String.IsNullOrEmpty(oSlotDetail.InfRateUOM.UOMName) && oSlotDetail.InfRateUOM.UOMName != "0" && !String.IsNullOrEmpty(oSlotDetail.InfRatePerUOM.UOMName) && oSlotDetail.InfRatePerUOM.UOMName != "0") {
                                    sDose = sSlotDose = sSlotDose + Environment.NewLine + oSlotDetail.InfusionRate + "-" + oSlotDetail.InfUpperRate + " " + oSlotDetail.InfRateUOM.UOMName + "/" + oSlotDetail.InfRatePerUOM.UOMName;
                                }
                                else if (!String.IsNullOrEmpty(sDose) && !String.IsNullOrEmpty(oSlotDetail.InfusionRate) && oSlotDetail.InfusionRate != "0" && !String.IsNullOrEmpty(oSlotDetail.InfRateUOM.UOMName) && oSlotDetail.InfRateUOM.UOMName != "0" && !String.IsNullOrEmpty(oSlotDetail.InfRatePerUOM.UOMName) && oSlotDetail.InfRatePerUOM.UOMName != "0") {
                                    sDose = sSlotDose = sSlotDose + Environment.NewLine + oSlotDetail.InfusionRate + " " + oSlotDetail.InfRateUOM.UOMName + "/" + oSlotDetail.InfRatePerUOM.UOMName;
                                }
                                else {
                                    if (!String.IsNullOrEmpty(oSlotDetail.UpperDose) && oSlotDetail.UpperDose != "0") {
                                        sUpperDose = oSlotDetail.UpperDose;
                                    }
                                }
                                if (oSlotDetail.AdministrationDetail != null) {
                                    let bIsPGD: boolean = false;
                                    if (this.oTagDrugHeaderDetail != null) {
                                        bIsPGD = this.oTagDrugHeaderDetail.IsPGD;
                                    }
                                    if (oDrugHeader.IsInfusion) {
                                        sToolTip = this.CreateInfusionTooltip(oSlotDetail, SlotDateTime, sDose, (o1) => { sHistoryToolTip = o1; }, (o2) => { sReason = o2; }, bIsPGD);
                                        //sToolTip = this.CreateInfusionTooltip(oSlotDetail, SlotDateTime, sDose, sHistoryToolTip, sReason, bIsPGD);
                                    }
                                    else {
                                        sToolTip = this.CreateTooltip(oSlotDetail, SlotDateTime, sDose, (o1) => { sHistoryToolTip = o1; }, (o2) => { sReason = o2; }, IsPRN, oDrugHeader.IsPRNWithSchedule, bIsPGD);
                                        //sToolTip = CreateTooltip(oSlotDetail, SlotDateTime, sDose, sHistoryToolTip, sReason, IsPRN, oDrugHeader.IsPRNWithSchedule, bIsPGD);
                                    }
                                    if (!String.IsNullOrEmpty(oSlotDetail.AdministrationDetail.Dose) && !String.IsNullOrEmpty(oSlotDetail.Dose) && (String.Compare(oSlotDetail.AdministrationDetail.Dose, oSlotDetail.Dose, StringComparison.CurrentCultureIgnoreCase) == 0)) {
                                        sReason = String.Empty;
                                    }
                                    if (!String.Equals(oSlotDetail.Status, SlotStatus.DEFERADMIN, StringComparison.CurrentCultureIgnoreCase) && !String.Equals(oSlotDetail.Status, SlotStatus.DEFERDUENOW, StringComparison.CurrentCultureIgnoreCase) && !String.Equals(oSlotDetail.Status, SlotStatus.DEFEROVERDUE, StringComparison.CurrentCultureIgnoreCase) && !String.Equals(oSlotDetail.Status, SlotStatus.OMITTED, StringComparison.CurrentCultureIgnoreCase) && DateTime.NotEquals(oSlotDetail.AdministrationDetail.AdministeredDate , DateTime.MinValue)) {
                                        SlotDateTime = oSlotDetail.AdministrationDetail.AdministeredDate;
                                    }
                                    if (oSlotDetail.AdministrationDetail.AdministeredOnTimeMode != '\0') {
                                        sAdminOnTimeMode = oSlotDetail.AdministrationDetail.AdministeredOnTimeMode;
                                        if (DateTime.NotEquals(oSlotDetail.ScheduledDTTM , DateTime.MinValue) && DateTime.NotEquals(oSlotDetail.AdministrationDetail.AdministeredDate , DateTime.MinValue))
                                            sAdminOnTimeDiffValue = Common.AdminDiffValue(oSlotDetail.ScheduledDTTM, oSlotDetail.AdministrationDetail.AdministeredDate, sAdminOnTimeMode);
                                    }
                                    if (oSlotDetail.AdministrationDetail.IsHistoryExists) {
                                        IsHistoryExists = true;
                                    }
                                }
                                if (this.oChartTypeSelected != ChartType.Medication_Chart) {
                                    let itemMRtype: MultiRouteType;
                                    itemMRtype = oDrugHeader.MultiRouteType;
                                    // itemMRtype = Enum.Parse(MultiRouteType,oDrugHeader.MultiRouteType.ToString(), true);
                                    //Enum.TryParse<MultiRouteType>(oDrugHeader.MultiRouteType.ToString(), (o) => { itemMRtype = o; });
                                    let ShowInfusionIcons: boolean;
                                    ShowInfusionIcons = ((itemMRtype != MultiRouteType.Mixed_Routes) || (oSlotDetail == null) || (oSlotDetail.AdministrationDetail == null) || (itemMRtype == MultiRouteType.Mixed_Routes && oSlotDetail.AdministrationDetail.IsAdministeredOnInfusionChart) || (itemMRtype == MultiRouteType.Mixed_Routes && !oSlotDetail.AdministrationDetail.IsAdministeredOnInfusionChart && !String.Equals(oSlotDetail.Status, SlotStatus.GIVEN, StringComparison.InvariantCultureIgnoreCase) && !String.Equals(oSlotDetail.Status, SlotStatus.NOTGIVEN, StringComparison.InvariantCultureIgnoreCase)));
                                    if (oDrugHeader.IsInfusion == true && ShowInfusionIcons && (!oDrugHeader.IsBolus || (oSlotDetail != null && oSlotDetail.AdministrationDetail != null && oSlotDetail.AdministrationDetail.IsAdministeredOnInfusionChart))) {
                                        let sSlotStatus: string;
                                        let oInfAction: InfusionAdminDetail = null; //LorAppMedicationCommonBB_P2 mostly uncomment
                                        if (String.Compare(oDrugHeader.InfusionType, InfusionTypeCode.INTERMITTENT, StringComparison.CurrentCultureIgnoreCase) == 0) {
                                            sSlotStatus = oSlotDetail.Status;
                                            let sReasonCode: string = String.Empty;
                                            if (oSlotDetail.AdministrationDetail != null && oSlotDetail.AdministrationDetail.oInfusionAdminDetail != null) {
                                                oInfAction = oSlotDetail.AdministrationDetail.oInfusionAdminDetail.OrderByDescending(x => x.MedAdminInfusionOID).FirstOrDefault();
                                            }
                                            if (String.Compare(sSlotStatus, SlotStatus.STOPPED, StringComparison.CurrentCultureIgnoreCase) == 0) {
                                                let sRsnCode = oSlotDetail.AdministrationDetail.oInfusionAdminDetail.OrderByDescending(x => x.MedAdminInfusionOID).Where(x => String.Compare(x.ActionCode, MedicationAction.STOP, StringComparison.CurrentCultureIgnoreCase) == 0).Select(x => x.infusionReasonCode).FirstOrDefault();
                                                sReasonCode = sRsnCode;
                                            }
                                            else if (String.Compare(sSlotStatus, SlotStatus.PAUSED, StringComparison.CurrentCultureIgnoreCase) == 0) {
                                                let sRsnCode = (oSlotDetail.AdministrationDetail.oInfusionAdminDetail.OrderByDescending(x => x.MedAdminInfusionOID)).Where(x => String.Compare(x.ActionCode, MedicationAction.PAUSE, StringComparison.CurrentCultureIgnoreCase) == 0).Select(x => x.infusionReasonCode).FirstOrDefault();
                                                sReasonCode = sRsnCode;
                                            }
                                            if (!String.Equals(sSlotStatus, SlotStatus.NOTGIVEN, StringComparison.CurrentCultureIgnoreCase) && !String.Equals(sSlotStatus, SlotStatus.OMITTED, StringComparison.CurrentCultureIgnoreCase)) {
                                                sReason = ValueDomainValues.oRecordAdminReasons.Count > 0 ? CommonBB.GetText(sReasonCode, ValueDomainValues.oRecordAdminReasons) : sReasonCode;
                                            }
                                        }
                                        else {
                                            if (String.Compare(oSlotDetail.Status, SlotStatus.INPROGRESS, StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(oSlotDetail.Status, SlotStatus.PAUSED, StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(oSlotDetail.Status, SlotStatus.STOPPED, StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(oSlotDetail.Status, SlotStatus.COMPLETED, StringComparison.CurrentCultureIgnoreCase) == 0) {
                                                oInfAction = oSlotDetail.AdministrationDetail.oInfusionAdminDetail.Where(x => DateTime.LessThanOrEqualTo(x.ActionStartDate.Date, StartDTTM.Date)).OrderByDescending(x => x.MedAdminInfusionOID).FirstOrDefault();
                                                sSlotStatus = oInfAction.ActionCode;
                                                sReason = ValueDomainValues.oRecordAdminReasons.Count > 0 ? CommonBB.GetText(oInfAction.infusionReasonCode, ValueDomainValues.oRecordAdminReasons) : oInfAction.infusionReasonCode;
                                            }
                                            else {
                                                sSlotStatus = oSlotDetail.Status;
                                                if (oSlotDetail != null && oSlotDetail.AdministrationDetail != null && !String.IsNullOrEmpty(oSlotDetail.AdministrationDetail.AdminReasonCode)) {
                                                    sReason = ValueDomainValues.oRecordAdminReasons.Count > 0 ? CommonBB.GetText(oSlotDetail.AdministrationDetail.AdminReasonCode, ValueDomainValues.oRecordAdminReasons) : oSlotDetail.AdministrationDetail.AdminReasonCode;
                                                }
                                            }
                                        }
                                        if (oSlotDetail != null && oSlotDetail.AdministrationDetail != null && !String.IsNullOrEmpty(oSlotDetail.AdministrationDetail.AdminReasonCode)) {
                                            sReason = ValueDomainValues.oRecordAdminReasons.Count > 0 ? CommonBB.GetText(oSlotDetail.AdministrationDetail.AdminReasonCode, ValueDomainValues.oRecordAdminReasons) : oSlotDetail.AdministrationDetail.AdminReasonCode;
                                        }
                                        oIChartSlot = this.CreateOverviewSlotForInfusion(sSlotKey, StartDTTM, sSlotStatus, sSlotDose, oTagSlotDetail, sToolTip, sReason, sDoseType, oSlotDetail, oDrugHeader.ItemSubType, oInfAction, sAdminOnTimeMode, oDrugHeader.IsPRNWithSchedule, IsHistoryExists, sHistoryToolTip);
                                    }
                                    else {
                                        if (oSlotDetail != null && oSlotDetail.AdministrationDetail != null && !String.IsNullOrEmpty(oSlotDetail.AdministrationDetail.AdminReasonCode)) {
                                            sReason = ValueDomainValues.oRecordAdminReasons.Count > 0 ? CommonBB.GetText(oSlotDetail.AdministrationDetail.AdminReasonCode, ValueDomainValues.oRecordAdminReasons) : oSlotDetail.AdministrationDetail.AdminReasonCode;
                                        }
                                        if (oSlotDetail != null && oSlotDetail.AdministrationDetail != null && !String.IsNullOrEmpty(oSlotDetail.AdministrationDetail.Dose) && !String.IsNullOrEmpty(oSlotDetail.AdministrationDetail.DoseUOM)) {
                                            sSlotDose = oSlotDetail.AdministrationDetail.Dose + " " + oSlotDetail.AdministrationDetail.DoseUOM;
                                        }
                                        oIChartSlot = this.CreateOverviewSlot(sSlotKey, oSlotDetail.Status, sSlotDose, oTagSlotDetail, sToolTip, sAdminOnTimeMode, sReason, sDoseType, oSlotDetail, IsHistoryExists, sHistoryToolTip);
                                    }
                                    IsBlankSlot = false;
                                }
                                else {
                                    if (oSlotDetail != null && oSlotDetail.AdministrationDetail != null && !String.IsNullOrEmpty(oSlotDetail.AdministrationDetail.DoseDiscReasonCode)) {
                                        sReason = ValueDomainValues.oRecordAdminDoseDiscrepancyReasons.Count > 0 ? CommonBB.GetText(oSlotDetail.AdministrationDetail.DoseDiscReasonCode, ValueDomainValues.oRecordAdminDoseDiscrepancyReasons) : oSlotDetail.AdministrationDetail.DoseDiscReasonCode;
                                    }
                                    let sTimeFormatAdminSlot: string = CConstants.Timeformat;
                                    if ((oSlotDetail.AdministrationDetail != null && DateTime.GreaterThan(oSlotDetail.AdministrationDetail.AdministeredDate , DateTime.MinValue) && DateTime.NotEquals(StartDTTM.Date , oSlotDetail.AdministrationDetail.AdministeredDate.Date)) && (String.Equals(oSlotDetail.Status, SlotStatus.GIVEN) || String.Equals(oSlotDetail.Status, SlotStatus.SELFADMINISTERED))) {
                                        sTimeFormatAdminSlot = CConstants.DateTimeFormat;
                                    }
                                    switch (oSlotDetail.Status) {
                                        case SlotStatus.PLANNED:
                                            oIChartSlot = (this.CreateDefaultSlot(sSlotKey, SlotDateTime, String.Empty, sDose, sUpperDose, oTagSlotDetail, sDoseType, false, IsUnackConflictExists));
                                            IsBlankSlot = false;
                                            let sPrescribedDoseToolTip: string = String.Empty;
                                            sPrescribedDoseToolTip = MedsAdminChartToolTip.PlannedToolTip + Environment.NewLine + Resource.MedsAdminChartToolTip.DueAtTooltip + ": " + oSlotDetail.ScheduledDTTM.ToUserDateTimeString(CConstants.DateTimeFormat) + Environment.NewLine;
                                            if (this.oChartTypeSelected == ChartType.Medication_Chart && (String.Compare(sDoseType, DoseTypeCode.TITRATED, StringComparison.CurrentCultureIgnoreCase) == 0)) {
                                                if (!String.IsNullOrEmpty(sDose) && !String.Equals(sDose, CConstants.DoseTBD, StringComparison.CurrentCultureIgnoreCase)) {
                                                    sPrescribedDoseToolTip += MedsAdminChartToolTip.PrescribedDoseToolTip + ": " + sDose;
                                                    if (!String.IsNullOrEmpty(oSlotDetail.PreparedBy)) {
                                                        sPrescribedDoseToolTip += Environment.NewLine + Environment.NewLine + MedsAdminChartToolTip.Enteredby + oSlotDetail.PreparedBy;
                                                    }
                                                }
                                                else {
                                                    sPrescribedDoseToolTip += MedsAdminChartToolTip.DosePrescribedToolTip;
                                                }
                                            }
                                            if (!String.IsNullOrEmpty(sPrescribedDoseToolTip)) {
                                                (ObjectHelper.CreateType<DefaultSlot>(oIChartSlot, DefaultSlot)).StatusToolTip = sPrescribedDoseToolTip;
                                            }
                                            break;
                                        case SlotStatus.OVERDUE:
                                        case SlotStatus.DEFEROVERDUE:
                                            if (IsUnackConflictExists == 'R' && String.Compare(oSlotDetail.Status, SlotStatus.OVERDUE, StringComparison.CurrentCultureIgnoreCase) == 0) {
                                                oIChartSlot = (this.CreateDefaultSlot(sSlotKey, SlotDateTime, oSlotDetail.Status, sDose, sUpperDose, oTagSlotDetail, sDoseType, false, IsUnackConflictExists));
                                                IsBlankSlot = false;
                                            }
                                            else {
                                                if (!String.Equals(MedChartData.ChartStatus, CConstants.sChartSuspendedStatusCode, StringComparison.InvariantCultureIgnoreCase)) {
                                                    this.nOverDueCount++;
                                                }
                                                oIChartSlot = (this.CreateDefaultSlot(sSlotKey, SlotDateTime, oSlotDetail.Status, sDose, sUpperDose, oTagSlotDetail, sDoseType, false, 'N'));
                                                (ObjectHelper.CreateType<DefaultSlot>(oIChartSlot, DefaultSlot)).FontWeightTime = (ObjectHelper.CreateType<DefaultSlot>(oIChartSlot, DefaultSlot)).FontWeightStatus = FontWeights.Bold;
                                                if (String.Compare(oSlotDetail.Status, SlotStatus.DEFEROVERDUE, StringComparison.CurrentCultureIgnoreCase) == 0) {
                                                    if (!String.IsNullOrEmpty(sAdminComments)) {
                                                        (ObjectHelper.CreateType<DefaultSlot>(oIChartSlot, DefaultSlot)).StatusToolTip = Common.GetWrappedToolTipContent(sToolTip, sAdminComments);
                                                        (ObjectHelper.CreateType<DefaultSlot>(oIChartSlot, DefaultSlot)).AdministrationIcon = Common.GetAdminCommentsIcon(MedsAdminChartToolTip.CommentsToolTip + ": " + sAdminComments);
                                                    }
                                                    else (ObjectHelper.CreateType<DefaultSlot>(oIChartSlot, DefaultSlot)).StatusToolTip = sToolTip; //LorArcBlueBirdMedicationChart infrom sangeetha
                                                }
                                                else {
                                                    (ObjectHelper.CreateType<DefaultSlot>(oIChartSlot, DefaultSlot)).StatusToolTip = "Drug overdue now - due at " + oSlotDetail.ScheduledDTTM.ToUserDateTimeString(CConstants.DateTimeFormat) + " hours";
                                                }
                                                this.CheckAndSetCumulativeIcon((ObjectHelper.CreateType<DefaultSlot>(oIChartSlot, DefaultSlot)).CumulativeIcon);
                                                IsBlankSlot = false;
                                            }
                                            break;
                                        case SlotStatus.DUENOW:
                                        case SlotStatus.DEFERDUENOW:
                                            if (IsUnackConflictExists == 'R' && String.Compare(oSlotDetail.Status, SlotStatus.DUENOW, StringComparison.CurrentCultureIgnoreCase) == 0) {
                                                oIChartSlot = (this.CreateDefaultSlot(sSlotKey, SlotDateTime, oSlotDetail.Status, sDose, sUpperDose, oTagSlotDetail, sDoseType, false, IsUnackConflictExists));
                                                IsBlankSlot = false;
                                            }
                                            else {
                                                if (!String.Equals(MedChartData.ChartStatus, CConstants.sChartSuspendedStatusCode, StringComparison.InvariantCultureIgnoreCase)) {
                                                    this.nDueCount++;
                                                }
                                                oIChartSlot = (this.CreateDefaultSlot(sSlotKey, SlotDateTime, oSlotDetail.Status, sDose, sUpperDose, oTagSlotDetail, sDoseType, false, 'N'));
                                                (ObjectHelper.CreateType<DefaultSlot>(oIChartSlot, DefaultSlot)).FontWeightTime = (ObjectHelper.CreateType<DefaultSlot>(oIChartSlot, DefaultSlot)).FontWeightStatus = FontWeights.Bold;
                                                if (String.Compare(oSlotDetail.Status, SlotStatus.DEFERDUENOW, StringComparison.CurrentCultureIgnoreCase) == 0) {
                                                    if (!String.IsNullOrEmpty(sAdminComments)) {
                                                        (ObjectHelper.CreateType<DefaultSlot>(oIChartSlot, DefaultSlot)).StatusToolTip = Common.GetWrappedToolTipContent(sToolTip, sAdminComments);
                                                        (ObjectHelper.CreateType<DefaultSlot>(oIChartSlot, DefaultSlot)).AdministrationIcon = Common.GetAdminCommentsIcon(MedsAdminChartToolTip.CommentsToolTip + ": " + sAdminComments);
                                                    }
                                                    else (ObjectHelper.CreateType<DefaultSlot>(oIChartSlot, DefaultSlot)).StatusToolTip = sToolTip;
                                                }
                                                else {
                                                    (ObjectHelper.CreateType<DefaultSlot>(oIChartSlot, DefaultSlot)).StatusToolTip = MedsAdminChartToolTip.DueNowToolTip;
                                                }
                                                this.CheckAndSetCumulativeIcon((ObjectHelper.CreateType<DefaultSlot>(oIChartSlot, DefaultSlot)).CumulativeIcon);
                                                IsBlankSlot = false;
                                            }
                                            break;
                                        case SlotStatus.GIVEN:
                                            oIChartSlot = (this.CreateAdministratedSlot(sSlotKey, SlotDateTime, sAdminOnTimeMode, sAdminOnTimeDiffValue, IsHistoryExists, oSlotDetail.Status, oTagSlotDetail, sToolTip, sHistoryToolTip, sReason, false, sAdminComments, sTimeFormatAdminSlot));
                                            IsBlankSlot = false;
                                            break;
                                        case SlotStatus.NOTGIVEN:
                                            oIChartSlot = (this.CreateAdministratedSlot(sSlotKey, SlotDateTime, sAdminOnTimeMode, sAdminOnTimeDiffValue, IsHistoryExists, oSlotDetail.Status, oTagSlotDetail, sToolTip, sHistoryToolTip, sReason, false, sAdminComments, sTimeFormatAdminSlot));
                                            IsBlankSlot = false;
                                            break;
                                        case SlotStatus.NOTKNOWN:
                                            oIChartSlot = (this.CreateAdministratedSlot(sSlotKey, SlotDateTime, sAdminOnTimeMode, sAdminOnTimeDiffValue, IsHistoryExists, oSlotDetail.Status, oTagSlotDetail, sToolTip, sHistoryToolTip, sReason, false, sAdminComments, sTimeFormatAdminSlot));
                                            IsBlankSlot = false;
                                            break;
                                        case SlotStatus.SELFADMINISTERED:
                                            oIChartSlot = (this.CreateAdministratedSlot(sSlotKey, SlotDateTime, sAdminOnTimeMode, sAdminOnTimeDiffValue, IsHistoryExists, oSlotDetail.Status, oTagSlotDetail, sToolTip, sHistoryToolTip, sReason, false, sAdminComments, sTimeFormatAdminSlot));
                                            IsBlankSlot = false;
                                            break;
                                        case SlotStatus.PATIENTSELFADMIN:
                                            oIChartSlot = (this.CreateDefaultSlot(sSlotKey, SlotDateTime, oSlotDetail.Status, sDose, sUpperDose, oTagSlotDetail, sDoseType, false, 'N'));
                                            IsBlankSlot = false;
                                            break;
                                        case SlotStatus.OMITTED:
                                        case SlotStatus.OMITTEDInCaps:
                                            oIChartSlot = (this.CreateAdministratedSlot(sSlotKey, SlotDateTime, '\0', String.Empty, false, oSlotDetail.Status, oTagSlotDetail, sToolTip, String.Empty, String.Empty, false, sAdminComments, CConstants.Timeformat));
                                            (ObjectHelper.CreateType<AdministratedSlot>(oIChartSlot, AdministratedSlot)).OmittedMessage = SlotStatusText.OMITTED;
                                            oIChartSlot.EnableSlotClick = false;
                                            IsBlankSlot = false;
                                            break;
                                        case SlotStatus.HOMELEAVE:
                                            oIChartSlot = (this.CreateDefaultSlot(sSlotKey, SlotDateTime, oSlotDetail.Status, String.Empty, String.Empty, oTagSlotDetail, String.Empty, false, 'N'));
                                            IsBlankSlot = false;
                                            break;
                                        case SlotStatus.NOTYETRECORDED:
                                            if (IsUnackConflictExists == 'R') {
                                                oIChartSlot = (this.CreateDefaultSlot(sSlotKey, SlotDateTime, oSlotDetail.Status, sDose, sUpperDose, oTagSlotDetail, sDoseType, false, IsUnackConflictExists));
                                                IsBlankSlot = false;
                                            }
                                            else {
                                                oIChartSlot = (this.CreateDefaultSlot(sSlotKey, SlotDateTime, oSlotDetail.Status, sDose, sUpperDose, oTagSlotDetail, sDoseType, false, 'N'));
                                                (ObjectHelper.CreateType<DefaultSlot>(oIChartSlot, DefaultSlot)).FontWeightTime = (ObjectHelper.CreateType<DefaultSlot>(oIChartSlot, DefaultSlot)).FontWeightStatus = FontWeights.Bold;
                                                (ObjectHelper.CreateType<DefaultSlot>(oIChartSlot, DefaultSlot)).StatusToolTip = MedsAdminChartToolTip.AdminNotyetRecordToolTip + oSlotDetail.ScheduledDTTM.ToUserDateTimeString(CConstants.DateTimeFormat) + " hours";
                                                this.CheckAndSetCumulativeIcon((ObjectHelper.CreateType<DefaultSlot>(oIChartSlot, DefaultSlot)).CumulativeIcon);
                                                IsBlankSlot = false;

                                            }
                                            break;
                                        case SlotStatus.INPROGRESS:
                                        case SlotStatus.STOPPED:
                                        case SlotStatus.PAUSED:
                                        case SlotStatus.COMPLETED:
                                            if (oSlotDetail.AdministrationDetail.IsAdministeredOnInfusionChart && this.oChartTypeSelected == ChartType.Medication_Chart) {
                                                oIChartSlot = (this.CreateBlankSlot(sSlotKey, SlotDateTime, sDoseType));
                                                {
                                                    //TODO Gradient-Revisit
                                                    //Below line commented since it is related to gradient and the method definition is commented. Can revisit if any logic is missed
                                                    //oIChartSlot.BackGroundColor = Common.SetSlotColorWithStripedLines(0.05, 0.01);
                                                    (ObjectHelper.CreateType<BlankSlot>(oIChartSlot, BlankSlot)).StatusToolTip = MedsAdminChartToolTip.AdministeredOnInfusionChartToolTip;
                                                    (ObjectHelper.CreateType<BlankSlot>(oIChartSlot, BlankSlot)).Tag = oTagSlotDetail;
                                                    oIChartSlot.EnableSlotClick = false;
                                                }
                                                IsBlankSlot = false;
                                            }
                                            break;
                                    }
                                }
                        out1(IsBlankSlot);
                        return oIChartSlot;
                    }

        public CheckAndSetCumulativeIcon(iconCumulative: ChartIcon): ChartIcon {
            if (this.IsParaIngDrug && this.ParacetamolAdminCount > 3) {
                iconCumulative.Key = CConstants.CumulativeWarning;
                iconCumulative.UriString = MedImage.GetPath(MedImages.CumulativeWarningIcon);
                iconCumulative.EnableOnHotSpotClick = false;
                iconCumulative.Tooltip = ObjectHelper.CreateObject(new iLabel(), { Text: MedsAdminChartToolTip.CumulativeIcon, MaxWidth: 250, IsWordwrap: true });
            }
            return iconCumulative;
        }
        CalculateSlotHeight(nSlotCount: number): number {
            let nSlotHeight: number = 0;
            if (nSlotCount > 0) {
                if (this.oChartTypeSelected == ChartType.Prescription_Chart) {
                    this.MinSlotHeight = 58;
                }
                if (nSlotCount * this.MinSlotHeight < this.MinRowHeight)
                    nSlotHeight = this.MinRowHeight / nSlotCount;
                else nSlotHeight = this.MinSlotHeight;
            }
            else nSlotHeight = this.MinRowHeight;
            return nSlotHeight;
        }
        public CreateDefaultSlot(sKey: string, SlotDateTime: DateTime, sSlotStatus: string, sDose: string, sUpperDose: string, oTagSlotDetail: TagSlotDetail, sDoseType: string, IsSlotRefresh: boolean, IsUnackConflictExists: string): DefaultSlot {
            let oDefaultSlot: DefaultSlot = new DefaultSlot();
            if (!IsSlotRefresh) {
                oDefaultSlot.Key = "Default Slot-" + sKey;
            }
            else {
                oDefaultSlot.Key = sKey;
            }
            if (DateTime.NotEquals(SlotDateTime , DateTime.MinValue)) {
                oDefaultSlot.Time = SlotDateTime;
            }
            if (oTagSlotDetail != null) {
                oDefaultSlot.HighlightReviewSlot = oTagSlotDetail.IsHighlightSlot;
            }
            if (oTagSlotDetail.IsAdministeredOnInfusionChart && this.oChartTypeSelected == ChartType.Medication_Chart && (String.Equals(sSlotStatus, SlotStatus.COMPLETED, StringComparison.CurrentCultureIgnoreCase) || String.Equals(sSlotStatus, SlotStatus.INPROGRESS, StringComparison.CurrentCultureIgnoreCase) || String.Equals(sSlotStatus, SlotStatus.PAUSED, StringComparison.CurrentCultureIgnoreCase) || String.Equals(sSlotStatus, SlotStatus.STOPPED, StringComparison.CurrentCultureIgnoreCase))) {
                //TODO Gradient-Revisit
                //oDefaultSlot.BackGroundColor = Common.SetSlotColorWithStripedLines(0.05, 0.01);
                oDefaultSlot.StatusToolTip = MedsAdminChartToolTip.AdministeredOnInfusionChartToolTip;
                oDefaultSlot.EnableSlotClick = false;
            }
            else if (!String.IsNullOrEmpty(sSlotStatus) && String.Compare(sSlotStatus, SlotStatus.HOMELEAVE, StringComparison.CurrentCultureIgnoreCase) == 0) {
                oDefaultSlot.CumulativeIcon = this.LoadImage("HomeLeaveIcon", MedImage.GetPath(MedImages.HomeLeaveIcon));
                oDefaultSlot.CumulativeIcon.Tooltip = MedsAdminChartToolTip.HomeLeaveToolTip;
                oDefaultSlot.CumulativeIcon.EnableOnHotSpotClick = false;
            }
            else if (!String.IsNullOrEmpty(sSlotStatus) && String.Compare(sSlotStatus, SlotStatus.PATIENTSELFADMIN, StringComparison.CurrentCultureIgnoreCase) == 0) {
                oDefaultSlot.CumulativeIcon = this.LoadImage(SlotStatus.PATIENTSELFADMIN, MedImage.GetPath(MedImages.PatSelfAdmin));
                oDefaultSlot.CumulativeIcon.Tooltip = MedsAdminChartToolTip.PatientSelfAdministering;
            }
            else {
                if (IsUnackConflictExists == 'R' && (!String.IsNullOrEmpty(sSlotStatus) && (String.Compare(sSlotStatus, SlotStatus.OVERDUE, StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(sSlotStatus, SlotStatus.DUENOW, StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(sSlotStatus, SlotStatus.NOTYETRECORDED, StringComparison.CurrentCultureIgnoreCase) == 0))) {
                    oDefaultSlot.ConflictIcon = this.LoadImage("Conflicts", MedImage.GetPath(MedImages.ConflictsMandatoryIcon));
                    oDefaultSlot.ConflictIcon.Tooltip = MedsAdminChartToolTip.ConflictsMandSlots;
                    oDefaultSlot.ConflictIcon.EnableOnHotSpotClick = false;
                }
                oDefaultSlot.BackGroundColor = Common.SetSlotColor(sSlotStatus, this.IsGreyedOut);
                if (!String.IsNullOrEmpty(sSlotStatus)) {
                    oDefaultSlot.SlotStatus = CommonBB.GetText(sSlotStatus, ValueDomainValues.oSlotStatus);
                }
                if (oTagSlotDetail.IsDuringHomeLeave && DateTime.LessThanOrEqualTo(oTagSlotDetail.SlotDateTime , CommonBB.GetServerDateTime())) {
                    oDefaultSlot.CumulativeIcon = this.LoadImage("HomeLeaveIcon", MedImage.GetPath(MedImages.HomeLeaveIcon));
                    oDefaultSlot.CumulativeIcon.Tooltip = MedsAdminChartToolTip.HomeLeaveToolTip;
                    oDefaultSlot.CumulativeIcon.EnableOnHotSpotClick = false;
                }
                if (!String.IsNullOrEmpty(sDoseType) || !String.IsNullOrEmpty(sSlotStatus) && String.Compare(sSlotStatus, SlotStatus.PLANNED, StringComparison.CurrentCultureIgnoreCase) != 0) {
                    if (!String.IsNullOrEmpty(sDose) && (sDoseType == DoseTypeCode.STEPPEDVARIABLE || sDoseType == DoseTypeCode.TITRATED)) {
                        if ((sDoseType == DoseTypeCode.STEPPEDVARIABLE) && !String.IsNullOrEmpty(sUpperDose)) {
                            let sLDose: string[] = sDose.Split(' ');
                            if (sLDose != null && sLDose.length > 0) {
                                oDefaultSlot.Dose = sLDose[0] + " - " + sUpperDose;
                                if (!String.IsNullOrEmpty(this.oTagDrugHeaderDetail.DoseUOM))
                                    oDefaultSlot.Dose += " " + this.oTagDrugHeaderDetail.DoseUOM;
                                else oDefaultSlot.Dose += " " + oTagSlotDetail.DoseUOM;
                            }
                        }
                        else {
                            oDefaultSlot.Dose = sDose;
                        }
                    }
                }
                if (!String.IsNullOrEmpty(sDoseType) && (sDoseType == DoseTypeCode.STEPPEDVARIABLE || sDoseType == DoseTypeCode.TITRATED)) {
                    this.MinSlotHeight = 80;
                    oDefaultSlot.SlotHeight = this.MaxRowDoseHeightValue > 0 ? this.MaxRowDoseHeightValue : this.CalculateSlotHeight(this.nMaxSlotCount);
                }
            }
            if (!IsSlotRefresh) {
                if (this.IsTitrated)
                    this.MinSlotHeight = 80;
                oDefaultSlot.SlotHeight = this.MaxRowDoseHeightValue > 0 ? this.MaxRowDoseHeightValue : this.CalculateSlotHeight(this.nMaxSlotCount);
            }
            oDefaultSlot.Tag = oTagSlotDetail;
            return oDefaultSlot;
        }
        public CreateAdministratedSlot(sKey: string, SlotDateTime: DateTime, sAdminOnTimeMode: string, sAdminOnTimeDiffValue: string, IsHistoryExists: boolean, sSlotStatus: string, oTagSlotDetail: TagSlotDetail, sToolTip: string, sHistoryToolTip: string, sDiscrepancyReason: string, IsSlotRefresh: boolean, AdminComments: string, sTimeFormatAdminSlot: string): AdministratedSlot {
            let oAdministratedSlot: AdministratedSlot = new AdministratedSlot();
            if (!IsSlotRefresh) {
                oAdministratedSlot.Key = "AdminSlot-" + sKey;
            }
            else {
                oAdministratedSlot.Key = sKey;
            }
            if (oTagSlotDetail != null) {
                oAdministratedSlot.HighlightReviewSlot = oTagSlotDetail.IsHighlightSlot;
            }
            if (this.IsGreyedOut) {
                oAdministratedSlot.BackGroundColor = Common.SetSlotColor(String.Empty, this.IsGreyedOut);
            }
            else if (this.IsCompleted) {
                oAdministratedSlot.BackGroundColor = new SolidColorBrush(Color.FromArgb(255, 185, 251, 114));
            }
            else {
                if (oTagSlotDetail.SlotStatus == SlotStatus.OMITTED) {
                    oAdministratedSlot.BackGroundColor = new SolidColorBrush(MedChartData.OmittedSlotsColor);
                    oAdministratedSlot.EnableSlotClick = false;
                }
            }
            if (String.Equals(oTagSlotDetail.SlotStatus, SlotStatus.NOTGIVEN, StringComparison.InvariantCultureIgnoreCase) && ValueDomainValues.oReasonForNotGiven != null && ValueDomainValues.oReasonForNotGiven.Count() > 0 && oTagSlotDetail != null) { //TODO ask Siva
                oAdministratedSlot.ReasonForNotGiven = !String.IsNullOrEmpty(oTagSlotDetail.AdminReasonCode) && ValueDomainValues.oReasonForNotGiven.FirstOrDefault(a => a.Key == oTagSlotDetail.AdminReasonCode) ? ValueDomainValues.oReasonForNotGiven.FirstOrDefault(a => a.Key == oTagSlotDetail.AdminReasonCode).Value.ToString() : String.Empty; //TODO ask Siva
                oAdministratedSlot.ReasonToolTip = MedsAdminChartToolTip.ReasonToolTip + ": " + CommonBB.GetText(oTagSlotDetail.AdminReasonCode, ValueDomainValues.oRecordAdminReasons);
                oAdministratedSlot.ReasonToolTip += !String.IsNullOrEmpty(oTagSlotDetail.Comments) ? "\n" + MedsAdminChartToolTip.CommentsToolTip + ": " + oTagSlotDetail.Comments : String.Empty;
                oAdministratedSlot.ReasonFontSize = CConstants.Thirteen;
            }
            if (DateTime.NotEquals(SlotDateTime , DateTime.MinValue)) {
                oAdministratedSlot.Time = SlotDateTime;
            }
            this.SetAdministratedSlotIcon(oAdministratedSlot, sAdminOnTimeMode, sAdminOnTimeDiffValue, IsHistoryExists, sSlotStatus, sToolTip, sHistoryToolTip, sDiscrepancyReason, false, AdminComments);
            if (oTagSlotDetail.IsDuringHomeLeave && DateTime.LessThanOrEqualTo(oTagSlotDetail.SlotDateTime , CommonBB.GetServerDateTime())) {
                oAdministratedSlot.HomeLeaveIcon = this.LoadImage(SlotStatus.HOMELEAVE, MedImage.GetPath(MedImages.HomeLeaveIcon));
                oAdministratedSlot.HomeLeaveIcon.Tooltip = MedsAdminChartToolTip.HomeLeaveToolTip;
                oAdministratedSlot.HomeLeaveIcon.EnableOnHotSpotClick = false;
            }
            if (this.IsSteppedTitrated) {
                this.MinSlotHeight = 80;
                oAdministratedSlot.SlotHeight = this.CalculateSlotHeight(this.MinSlotHeight);
            }
            if (!IsSlotRefresh) {
                oAdministratedSlot.SlotHeight = this.CalculateSlotHeight(this.nMaxSlotCount);
            }
            oAdministratedSlot.Tag = oTagSlotDetail;
            oAdministratedSlot.AdministratedTmFrmt = sTimeFormatAdminSlot;
            return oAdministratedSlot;
        }
        public SetAdministratedSlotIcon(oAdministratedSlot: AdministratedSlot, sAdminOnTimeMode: string, sAdminOnTimeDiffValue: string, IsHistoryExists: boolean, sSlotStatus: string, sToolTip: string, sHistoryToolTip: string, sDiscrepancyReason: string, IsDosedis: boolean, AdminComments: string): void {
            let IsAdminModeToolTipSet: boolean = false;
            let sToolTipExtended: string = String.Empty;
            if (IsHistoryExists) {
                oAdministratedSlot.HistoryIcon = this.LoadImage("HistoryIcon", MedImage.GetPath(MedImages.HistoryIcon));
                if (!String.IsNullOrEmpty(sHistoryToolTip)) {
                    oAdministratedSlot.HistoryIcon.Tooltip = sHistoryToolTip;
                }
            }
            if (!String.IsNullOrEmpty(sSlotStatus)) {
                switch (sSlotStatus) {
                    case SlotStatus.GIVEN:
                        oAdministratedSlot.ReasonForNotGiven = String.Empty;
                        oAdministratedSlot.ReasonToolTip = String.Empty;
                        if (!String.IsNullOrEmpty(sDiscrepancyReason) || IsDosedis) {
                            oAdministratedSlot.StatusIcon = this.LoadImage(SlotStatus.GIVEN, MedImage.GetPath(MedImages.DoseDiscrepancy));
                        }
                        else if (sAdminOnTimeMode != '\0' && sAdminOnTimeMode != 'N') {
                            switch (sAdminOnTimeMode) {
                                case 'E':
                                    if (!String.IsNullOrEmpty(sDiscrepancyReason) || IsDosedis) {
                                        oAdministratedSlot.StatusIcon = this.LoadImage(SlotStatus.GIVEN, MedImage.GetPath(MedImages.DoseDiscrepancy));
                                    }
                                    else {
                                        oAdministratedSlot.StatusIcon = this.LoadImage(SlotStatus.GIVEN, MedImage.GetPath(MedImages.EarlyAdminIcon));
                                    }
                                    sToolTipExtended = sToolTip + "\nAdministration was " + sAdminOnTimeDiffValue + " early";
                                    if (!String.IsNullOrEmpty(AdminComments))
                                        oAdministratedSlot.StatusIcon.Tooltip = Common.GetWrappedToolTipContent(sToolTipExtended, AdminComments);
                                    else oAdministratedSlot.StatusIcon.Tooltip = sToolTipExtended;
                                    IsAdminModeToolTipSet = true;
                                    break;
                                case 'L':
                                    if (!String.IsNullOrEmpty(sDiscrepancyReason) || IsDosedis) {
                                        oAdministratedSlot.StatusIcon = this.LoadImage(SlotStatus.GIVEN, MedImage.GetPath(MedImages.DoseDiscrepancy));
                                    }
                                    else {
                                        oAdministratedSlot.StatusIcon = this.LoadImage(SlotStatus.GIVEN, MedImage.GetPath(MedImages.LateAdminIcon));
                                    }
                                    sToolTipExtended = sToolTip + "\nAdministration was " + sAdminOnTimeDiffValue + " late";
                                    if (!String.IsNullOrEmpty(AdminComments))
                                        oAdministratedSlot.StatusIcon.Tooltip = Common.GetWrappedToolTipContent(sToolTipExtended, AdminComments);
                                    else oAdministratedSlot.StatusIcon.Tooltip = sToolTipExtended;
                                    IsAdminModeToolTipSet = true;
                                    break;
                            }
                        }
                        else {
                            oAdministratedSlot.StatusIcon = this.LoadImage(SlotStatus.GIVEN, MedImage.GetPath(MedImages.GivenSlotIcon));
                        }
                        break;
                    case SlotStatus.NOTGIVEN:
                        oAdministratedSlot.StatusIcon = this.LoadImage(SlotStatus.NOTGIVEN, MedImage.GetPath(MedImages.NotGivenSlotIcon));
                        break;
                    case SlotStatus.NOTKNOWN:
                        oAdministratedSlot.ReasonForNotGiven = String.Empty;
                        oAdministratedSlot.ReasonToolTip = String.Empty;
                        oAdministratedSlot.StatusIcon = this.LoadImage(SlotStatus.NOTKNOWN, MedImage.GetPath(MedImages.NotKnownSlotIcon));
                        break;
                    case SlotStatus.SELFADMINISTERED:
                        oAdministratedSlot.ReasonForNotGiven = String.Empty;
                        oAdministratedSlot.ReasonToolTip = String.Empty;
                        if (!String.IsNullOrEmpty(sDiscrepancyReason) || IsDosedis) {
                            oAdministratedSlot.StatusIcon = this.LoadImage(SlotStatus.SELFADMINISTERED, MedImage.GetPath(MedImages.DoseDiscrepancy));
                        }
                        else if (sAdminOnTimeMode != '\0' && sAdminOnTimeMode != 'N') {
                            switch (sAdminOnTimeMode) {
                                case 'E':
                                    if (!String.IsNullOrEmpty(sDiscrepancyReason) || IsDosedis) {
                                        oAdministratedSlot.StatusIcon = this.LoadImage(SlotStatus.SELFADMINISTERED, MedImage.GetPath(MedImages.DoseDiscrepancy));
                                    }
                                    else {
                                        oAdministratedSlot.StatusIcon = this.LoadImage(SlotStatus.SELFADMINISTERED, MedImage.GetPath(MedImages.SelfAdminEarlyIcon));
                                    }
                                    sToolTipExtended = sToolTip + "\nAdministration was " + sAdminOnTimeDiffValue + " early";
                                    if (!String.IsNullOrEmpty(AdminComments))
                                        oAdministratedSlot.StatusIcon.Tooltip = Common.GetWrappedToolTipContent(sToolTipExtended, AdminComments);
                                    else oAdministratedSlot.StatusIcon.Tooltip = sToolTipExtended;
                                    IsAdminModeToolTipSet = true;
                                    break;
                                case 'L':
                                    if (!String.IsNullOrEmpty(sDiscrepancyReason) || IsDosedis) {
                                        oAdministratedSlot.StatusIcon = this.LoadImage(SlotStatus.SELFADMINISTERED, MedImage.GetPath(MedImages.DoseDiscrepancy));
                                    }
                                    else {
                                        oAdministratedSlot.StatusIcon = this.LoadImage(SlotStatus.SELFADMINISTERED, MedImage.GetPath(MedImages.SelfAdminLateIcon));
                                    }
                                    sToolTipExtended = sToolTip + "\nAdministration was " + sAdminOnTimeDiffValue + " late";
                                    if (!String.IsNullOrEmpty(AdminComments))
                                        oAdministratedSlot.StatusIcon.Tooltip = Common.GetWrappedToolTipContent(sToolTipExtended, AdminComments);
                                    else oAdministratedSlot.StatusIcon.Tooltip = sToolTipExtended;
                                    IsAdminModeToolTipSet = true;
                                    break;
                            }
                        }
                        else {
                            oAdministratedSlot.StatusIcon = this.LoadImage(SlotStatus.SELFADMINISTERED, MedImage.GetPath(MedImages.SelfAdministeredIcon));
                        }
                        break;
                    case SlotStatus.PATIENTSELFADMIN:
                        oAdministratedSlot.ReasonForNotGiven = String.Empty;
                        oAdministratedSlot.ReasonToolTip = String.Empty;
                        oAdministratedSlot.StatusIcon = this.LoadImage(SlotStatus.PATIENTSELFADMIN, MedImage.GetPath(MedImages.PatSelfAdmin));
                        this.CheckAndSetCumulativeIcon(oAdministratedSlot.CumulativeIcon);
                        break;
                    case SlotStatus.OMITTED:
                        oAdministratedSlot.ReasonForNotGiven = String.Empty;
                        oAdministratedSlot.ReasonToolTip = String.Empty;
                        oAdministratedSlot.StatusIcon = this.LoadImage(SlotStatus.OMITTED, MedImage.GetPath(MedImages.OmittedSlotIcon));
                        break;
                }
                oAdministratedSlot.StatusIcon.EnableOnHotSpotClick = false;
                if ((!String.IsNullOrEmpty(sToolTip) && oAdministratedSlot.StatusIcon != null && !IsAdminModeToolTipSet) || (String.Compare(sSlotStatus, SlotStatus.OMITTED, StringComparison.CurrentCultureIgnoreCase) == 0)) {
                    if (!String.IsNullOrEmpty(AdminComments) && (String.Compare(sSlotStatus, SlotStatus.OMITTED, StringComparison.CurrentCultureIgnoreCase) != 0))
                        oAdministratedSlot.StatusIcon.Tooltip = Common.GetWrappedToolTipContent(sToolTip, AdminComments);
                    else oAdministratedSlot.StatusIcon.Tooltip = sToolTip;
                }
                if (!String.IsNullOrEmpty(AdminComments) && String.Compare(sSlotStatus, SlotStatus.OMITTED, StringComparison.CurrentCultureIgnoreCase) != 0) {
                    oAdministratedSlot.AdministrationIcon = Common.GetAdminCommentsIcon(MedsAdminChartToolTip.CommentsToolTip + ": " + AdminComments);
                }
                else if (String.IsNullOrEmpty(AdminComments)) {
                    oAdministratedSlot.AdministrationIcon = new ChartIcon();
                }
            }
        }
        public CreateMutliSlot(sKey: string, sLastGiveAt: string, sNextDueAt: string, sSlotStatus: string, oAdminSummaryList: ObservableCollection<ChartStringIcon>, nSlotCount: number, IsConflictsExists: string, oSlotDetail: List<SlotDetail>): TodayMultiSlot {
            let oMultiSlot: TodayMultiSlot = new TodayMultiSlot();
            oMultiSlot.Key = "TodayMultiSlot-" + sKey;
            oMultiSlot.BackGroundColor = Common.SetSlotColor(sSlotStatus, this.IsGreyedOut);
            switch (sSlotStatus) {
                case SlotStatus.OVERDUE:
                case SlotStatus.DEFEROVERDUE:
                case SlotStatus.DUENOW:
                case SlotStatus.DEFERDUENOW:
                case SlotStatus.NOTYETRECORDED:
                    this.CheckAndSetCumulativeIcon(oMultiSlot.CumulativeIcon);
                    break;
                default:
                    break;
            }
            if (IsConflictsExists == 'R') {
                oMultiSlot.ConflictIcon = this.LoadImage("Conflicts", MedImage.GetPath(MedImages.ConflictsMandatoryIcon));
                oMultiSlot.ConflictIcon.Tooltip = MedsAdminChartToolTip.ConflictsMandSlots;
                if (!String.IsNullOrEmpty(sSlotStatus)) {
                    if (String.Equals(sSlotStatus, SlotStatus.DEFERDUENOW))
                        oMultiSlot.SlotStatus = String.Empty;
                    else oMultiSlot.SlotStatus = CommonBB.GetText(sSlotStatus, ValueDomainValues.oSlotStatus);
                    oMultiSlot.FontWeightStatus = FontWeights.Bold;
                }
            }
            if (oAdminSummaryList != null && oAdminSummaryList.Count > 0) {
                oMultiSlot.AdminSummary = oAdminSummaryList;
            }
            oMultiSlot.LastGivenTime = sLastGiveAt;
            oMultiSlot.MultiIcon = this.LoadImage("MultiSlot", MedImage.GetPath(MedImages.MultiSlotIcon));
            oMultiSlot.MultiIcon.Tooltip = nSlotCount.ToString() + " " + MedsAdminChartToolTip.Multislot;
            oMultiSlot.Tag = sSlotStatus;
            if (!String.IsNullOrEmpty(sSlotStatus) && IsConflictsExists != 'R') {
                if (String.Equals(sSlotStatus, SlotStatus.DEFERDUENOW) || (String.Equals(sSlotStatus, SlotStatus.OVERDUE) && oMultiSlot.HomeLeaveIcon != null && !String.IsNullOrEmpty(oMultiSlot.HomeLeaveIcon.UriString)))
                    oMultiSlot.SlotStatus = String.Empty;
                else oMultiSlot.SlotStatus = CommonBB.GetText(sSlotStatus, ValueDomainValues.oSlotStatus);
                oMultiSlot.FontWeightStatus = FontWeights.Bold;
            }
            else {
                if (!String.IsNullOrEmpty(sNextDueAt)) {
                    oMultiSlot.SlotStatus = sNextDueAt;
                }
            }
            oMultiSlot.SlotHeight = this.CalculatenRowHeight(this.nMaxSlotCount);
            return oMultiSlot;
        }
        public CreateAsRequiredSlot(sKey: string, sTime: string, IsPRN: boolean, IsPRNWithSchedule: boolean, oAdminSummaryList: ObservableCollection<ChartStringIcon>, dtStartDTTM: DateTime, IsUnackConflictExists: string, oSlotDetail: List<SlotDetail>): TodayAsRequiredSlot {
            let oTodayAsRequiredSlot: TodayAsRequiredSlot = new TodayAsRequiredSlot();
            oTodayAsRequiredSlot.Key = "AsRequiredSlot-" + sKey;
            let bIsToday: boolean = DateTime.Equals(dtStartDTTM.Date , this.CurrntDt.Date);
            if (bIsToday) {
                this.CheckAndSetCumulativeIcon(oTodayAsRequiredSlot.CumulativeIcon);
            }
            if (oSlotDetail.Count > 0) {
                let homeleaveavail: boolean = oSlotDetail.Any(x => x.AdministrationDetail != null && x.AdministrationDetail.IsDuringHomeLeave);
                if (homeleaveavail) {
                    oTodayAsRequiredSlot.HomeLeaveIcon = this.LoadImage("HomeLeaveIcon", MedImage.GetPath(MedImages.HomeLeaveIcon));
                    oTodayAsRequiredSlot.HomeLeaveIcon.Tooltip = MedsAdminChartToolTip.HomeLeaveToolTip;
                    oTodayAsRequiredSlot.HomeLeaveIcon.EnableOnHotSpotClick = false;
                }
            }
            else if (String.Equals(MedChartData.ChartStatus, CConstants.sChartSuspendedStatusCode, StringComparison.InvariantCultureIgnoreCase) && DateTime.NotEquals(MedChartData.SuspendedOn , DateTime.MinValue) && DateTime.GreaterThanOrEqualTo(CommonBB.GetServerDateTime() , MedChartData.SuspendedOn) && DateTime.GreaterThanOrEqualTo(dtStartDTTM , MedChartData.SuspendedOn.Date) && DateTime.LessThanOrEqualTo(dtStartDTTM , CommonBB.GetServerDateTime())) {
                oTodayAsRequiredSlot.HomeLeaveIcon = this.LoadImage("HomeLeaveIcon", MedImage.GetPath(MedImages.HomeLeaveIcon));
                oTodayAsRequiredSlot.HomeLeaveIcon.Tooltip = MedsAdminChartToolTip.HomeLeaveToolTip;
                oTodayAsRequiredSlot.HomeLeaveIcon.EnableOnHotSpotClick = false;
            }
            if (IsUnackConflictExists == 'R') {
                oTodayAsRequiredSlot.ConflictIcon = this.LoadImage("Conflicts", MedImage.GetPath(MedImages.ConflictsMandatoryIcon));
                oTodayAsRequiredSlot.ConflictIcon.Tooltip = MedsAdminChartToolTip.ConflictsMandSlots;
                oTodayAsRequiredSlot.ConflictIcon.EnableOnHotSpotClick = false;
            }
            if (bIsToday && !this.IsNextDoseAllowedForPRN) {
                oTodayAsRequiredSlot.AsRequired = this.LoadStringIcon("ChartStringIcon-" + oTodayAsRequiredSlot.Key, MedImage.GetPath(MedImages.PRNAdminTimeIcon), MedsAdminChartToolTip.Asrequired);
                oTodayAsRequiredSlot.AsRequired.Tooltip = MedsAdminChartToolTip.PRNToolTip;
            }
            else {
                oTodayAsRequiredSlot.AsRequired = this.LoadStringIcon("ChartStringIcon-" + oTodayAsRequiredSlot.Key, null, MedsAdminChartToolTip.Asrequired);
            }
            if (this.IsGreyedOut) {
                oTodayAsRequiredSlot.BackGroundColor = Common.SetSlotColor(String.Empty, this.IsGreyedOut);
            }
            else if (this.IsCompleted) {
                oTodayAsRequiredSlot.BackGroundColor = new SolidColorBrush(Color.FromArgb(255, 185, 251, 114));
            }
            else {
                oTodayAsRequiredSlot.BackGroundColor = new SolidColorBrush(MedChartData.AsRequiredSlotsColor);
            }
            if (oAdminSummaryList != null && oAdminSummaryList.Count > 0) {
                oTodayAsRequiredSlot.AdminSummary = oAdminSummaryList;
            }
            oTodayAsRequiredSlot.LastGivenTime = sTime;
            if (!IsPRN || (IsPRN && IsPRNWithSchedule))
                oTodayAsRequiredSlot.SlotHeight = this.CalculatenRowHeight(this.nMaxSlotCount);
            else oTodayAsRequiredSlot.SlotHeight = this.MinRowHeight;
            let oTagSlotDetail: TagSlotDetail = new TagSlotDetail();
            oTagSlotDetail.IsNextDoseAllowedForPRN = this.IsNextDoseAllowedForPRN;
            oTagSlotDetail.MinimumIntervalForPRN = this.nMinimumIntervalForPRN;
            oTagSlotDetail.LastAdministeredAtForPRN = this.nLastRecordedAtForPRN;
            oTodayAsRequiredSlot.Tag = oTagSlotDetail;
            return oTodayAsRequiredSlot;
        }
        public CreateBlankSlot(sKey: string, StartDTTM: DateTime, sDoseType: string): BlankSlot {
            let oBlankSlot: BlankSlot = new BlankSlot();
            oBlankSlot.Key = "BlankSlot-" + sKey;
            if (this.IsOverviewPRNSlot) {
                if (this.IsGreyedOut) {
                    oBlankSlot.BackGroundColor = new SolidColorBrush(Colors.Grey);
                }
                else if (this.IsCompleted) {
                    if (DateTime.NotEquals(this.dtOverviewPRNStartDate.Date , DateTime.MinValue.Date) && DateTime.NotEquals(this.dtOverviewPRNEndDate.Date , DateTime.MinValue.Date)) {
                        if (DateTime.GreaterThanOrEqualTo(StartDTTM.Date ,this.dtOverviewPRNStartDate.Date) && DateTime.LessThanOrEqualTo(StartDTTM.Date , this.dtOverviewPRNEndDate.Date)) {
                            oBlankSlot.BackGroundColor = new SolidColorBrush(Color.FromArgb(255, 185, 251, 114));
                        }
                        else {
                            oBlankSlot.BackGroundColor = new SolidColorBrush(Colors.Grey);
                        }
                    }
                }
                else {
                    if (DateTime.GreaterThanOrEqualTo(StartDTTM.Date , this.dtOverviewPRNStartDate.Date) && DateTime.LessThanOrEqualTo(StartDTTM.Date , this.dtOverviewPRNEndDate.Date))
                        oBlankSlot.BackGroundColor = new SolidColorBrush(MedChartData.AsRequiredSlotsColor);
                    else oBlankSlot.BackGroundColor = new SolidColorBrush(Colors.Grey);
                }
            }
            else oBlankSlot.BackGroundColor = new SolidColorBrush(Colors.Grey);
            if (this.oChartTypeSelected == ChartType.Prescription_Chart && (String.Compare(sDoseType, DoseTypeCode.STEPPEDVARIABLE, StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(sDoseType, DoseTypeCode.TITRATED, StringComparison.CurrentCultureIgnoreCase) == 0) && MedChartData.Is7DayView)
                oBlankSlot.SlotHeight = this.MaxRowDoseHeightValue > 0 ? this.MinSlotHeight + this.MaxRowDoseHeightValue : this.CalculateSlotHeight(this.nMaxSlotCount);
            else oBlankSlot.SlotHeight = this.MaxRowDoseHeightValue > 0 ? this.MaxRowDoseHeightValue : this.CalculateSlotHeight(this.nMaxSlotCount);
            oBlankSlot.EnableSlotClick = false;
            return oBlankSlot;
        }
        public CreateBlankSlotForCell(sKey: string, StartDTTM: DateTime, sDoseType: string, IsPRN: boolean, IsPRNWithSchedule: boolean): BlankSlot {
            let oBlankSlot: BlankSlot = new BlankSlot(); // Sangeetha TODO
            oBlankSlot.Key = "BlankSlotCell-" + sKey;
            if (this.IsOverviewPRNSlot) {
                if (this.IsGreyedOut) {
                    oBlankSlot.BackGroundColor = new SolidColorBrush(Colors.Grey);
                }
                else if (this.IsCompleted) {
                    if (DateTime.NotEquals(this.dtOverviewPRNStartDate.Date , DateTime.MinValue.Date) && DateTime.NotEquals(this.dtOverviewPRNEndDate.Date , DateTime.MinValue.Date)) {
                        if (DateTime.GreaterThanOrEqualTo(StartDTTM.Date , this.dtOverviewPRNStartDate.Date) && DateTime.LessThanOrEqualTo(StartDTTM.Date , this.dtOverviewPRNEndDate.Date)) {
                            oBlankSlot.BackGroundColor = new SolidColorBrush(Color.FromArgb(255, 185, 251, 114));
                        }
                        else {
                            oBlankSlot.BackGroundColor = new SolidColorBrush(Colors.Grey);//TODO chek wth Siva R if grey
                        }
                    }
                }
                else {
                    if (DateTime.GreaterThanOrEqualTo(StartDTTM.Date , this.dtOverviewPRNStartDate.Date) && DateTime.LessThanOrEqualTo(StartDTTM.Date , this.dtOverviewPRNEndDate.Date))
                        oBlankSlot.BackGroundColor = new SolidColorBrush(MedChartData.AsRequiredSlotsColor);
                    else oBlankSlot.BackGroundColor = new SolidColorBrush(Colors.Grey);
                }
            }
            else oBlankSlot.BackGroundColor = new SolidColorBrush(Colors.Grey);
            if ((this.oChartTypeSelected == ChartType.Prescription_Chart && (IsPRN || String.Compare(sDoseType, DoseTypeCode.STEPPEDVARIABLE, StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(sDoseType, DoseTypeCode.TITRATED, StringComparison.CurrentCultureIgnoreCase) == 0) && MedChartData.Is7DayView) || this.IsAdmDrug) {
                oBlankSlot.SlotHeight = this.MaxRowDoseHeightValue > 0 ? this.MinSlotHeight + this.MaxRowDoseHeightValue : this.CalculateSlotHeight(this.nMaxSlotCount);
            }
            else {
                if (this.oChartTypeSelected == ChartType.Medication_Chart && (IsPRN && !IsPRNWithSchedule))
                    oBlankSlot.SlotHeight = this.MinRowHeight;
                else oBlankSlot.SlotHeight = this.MaxRowDoseHeightValue > 0 ? this.MaxRowDoseHeightValue : this.CalculateSlotHeight(this.nMaxSlotCount);
            }
            oBlankSlot.EnableSlotClick = false;
            return oBlankSlot;
        }
        //TODO sangeetha DoseOverviewSlot
        public StatusIcon(oOverViewSlot: DoseOverviewSlot, s: StackPanel, isReadOnly: boolean, sDoseType: string, sDose: string, sToolTip: string, sStatus: string, sImagePath: string, sPrescribedDoseToolTip: string): ChartIcon {
            if (isReadOnly && String.Compare(sDoseType, DoseTypeCode.TITRATED, StringComparison.CurrentCultureIgnoreCase) == 0 && String.Compare(sDose, CConstants.DoseTBD, StringComparison.CurrentCultureIgnoreCase) == 0) {
                s.Children.Add(ObjectHelper.CreateObject(new TextBlock(), { Text: MedsAdminChartToolTip.DosePrescribedToolTip }));
                oOverViewSlot.StatusIcon = this.LoadImage(sStatus, MedImage.GetPath(MedImages.DoseTBDIcon), isReadOnly);
            }
            else {
                if (String.Compare(sDoseType, DoseTypeCode.TITRATED, StringComparison.CurrentCultureIgnoreCase) == 0) {
                    s.Children.Add(ObjectHelper.CreateObject(new TextBlock(), { Text: sPrescribedDoseToolTip }));
                }
                else {
                    s.Children.Add(ObjectHelper.CreateObject(new TextBlock(), { Text: sToolTip }));
                }
                oOverViewSlot.StatusIcon = this.LoadImage(sStatus, sImagePath, isReadOnly);
            }
            return oOverViewSlot.StatusIcon;
        }
        public SetDoseOverviewSlotIcon(oDoseOverviewSlot: DoseOverviewSlot, IsHistoryExists: boolean, sHistoryToolTip: string): void {
            if (IsHistoryExists) {
                oDoseOverviewSlot.HistoryIcon = this.LoadImage("HistoryIcon", MedImage.GetPath(MedImages.HistoryIcon));
                if (!String.IsNullOrEmpty(sHistoryToolTip)) {
                    oDoseOverviewSlot.HistoryIcon.Tooltip = sHistoryToolTip;
                }
            }
        }
        public CreateOverviewSlot(sKey: string, sSlotStatus: string, sDose: string, oTagSlotDetail: TagSlotDetail, sTooltip: string, sAdminOnTimeMode: string, sReason: string, sDoseType: string, oSlotDetail: SlotDetail, isHistory: boolean, TooltipHistory: string): DoseOverviewSlot {
            let s: StackPanel = new StackPanel();
            let oOverViewSlot: DoseOverviewSlot = new DoseOverviewSlot();
            let objtooltip: Object = null;
            oOverViewSlot.Key = "Overview-" + sKey;
            let isReadOnly: boolean = false;
            if (this.oChartTypeSelected == ChartType.Prescription_Chart)
                isReadOnly = true;
            let sToolTip: string = String.Empty;
            let sStatus: string = String.Empty;
            let sImagePath: string = String.Empty;
            let sPrescribedDoseToolTip: string = String.Empty;
            let dtSlotDateTime: DateTime= DateTime.MinValue;
            let dtCurrentDateTime: DateTime= CommonBB.GetServerDateTime();
            let sAdminComments: string = oSlotDetail.AdministrationDetail != null ? oSlotDetail.AdministrationDetail.AdminComments : String.Empty;
            let objInfusionAdminDetail: InfusionAdminDetail = null;
            if (oSlotDetail.AdministrationDetail != null && oSlotDetail.AdministrationDetail.oInfusionAdminDetail != null && oSlotDetail.AdministrationDetail.oInfusionAdminDetail.Count > 0) {
                objInfusionAdminDetail = oSlotDetail.AdministrationDetail.oInfusionAdminDetail.LastOrDefault();
            }
            if (this.oChartTypeSelected == ChartType.Prescription_Chart) {
                this.SetDoseOverviewSlotIcon(oOverViewSlot, isHistory, TooltipHistory);
            }
            dtSlotDateTime = oSlotDetail.ScheduledDTTM;
            if (oTagSlotDetail != null) {
                oOverViewSlot.HighlightReviewSlot = oTagSlotDetail.IsHighlightSlot;
            }
            let TimeDifference: number = Convert.ToInt32(dtSlotDateTime.Subtract(dtCurrentDateTime).TotalMinutes);
            let AdvanceDuration: DateTime= dtCurrentDateTime.AddHours(MedChartData.AllowAdvanceDuration);
            switch (sSlotStatus) {
                case SlotStatus.PLANNED:
                    isReadOnly = true;
                    if (this.oTagDrugHeaderDetail.IsAllowAdvanceAdmin || oSlotDetail.IsAllowAdvanceAdmin) {
                        if (DateTime.NotEquals(dtSlotDateTime , DateTime.MinValue) && MedChartData.AdvDurationForRecording > 0 && TimeDifference > 0 && TimeDifference > MedChartData.DuenessThreshold && TimeDifference <= MedChartData.AdvDurationForRecording) {
                            isReadOnly = true;
                        }
                        else {
                            if (DateTime.NotEquals(dtSlotDateTime , DateTime.MinValue) && DateTime.NotEquals(AdvanceDuration , DateTime.MinValue) && DateTime.LessThanOrEqualTo(dtSlotDateTime , AdvanceDuration)) {
                                isReadOnly = false;
                            }
                            else {
                                isReadOnly = true;
                            }
                        }
                    }
                    s.Children.Clear(); // TODO ask SIva R needs to be implemented
                    sImagePath = oTagSlotDetail.IsInfusion && !oTagSlotDetail.IsBolus ? MedImage.GetPath(MedImages.InfPlannedDeferredIcon) : MedImage.GetPath(MedImages.PlannedIcon);
                    s.Children.Add(ObjectHelper.CreateObject(new TextBlock(), { Text: MedsAdminChartToolTip.PlannedToolTip }));
                    if (this.oChartTypeSelected == ChartType.Prescription_Chart && (String.Compare(sDoseType, DoseTypeCode.TITRATED, StringComparison.CurrentCultureIgnoreCase) == 0) && !String.IsNullOrEmpty(sDose) && !String.Equals(sDose, CConstants.DoseTBD, StringComparison.CurrentCultureIgnoreCase)) {
                        if (!String.IsNullOrEmpty(oSlotDetail.PreparedBy)) {
                            sPrescribedDoseToolTip = MedsAdminChartToolTip.PrescribedDoseToolTip + ": " + sDose;
                            sPrescribedDoseToolTip += Environment.NewLine + Environment.NewLine + MedsAdminChartToolTip.Enteredby + oSlotDetail.PreparedBy;
                        }
                    }
                    else {
                        sPrescribedDoseToolTip = MedsAdminChartToolTip.PrescribedDoseToolTip + ": " + sDose;
                    }
                    s.Children.Add(ObjectHelper.CreateObject(new TextBlock(), { Text: MedsAdminChartToolTip.DueAtTooltip + ": " + oTagSlotDetail.SlotDateTime.ToUserDateTimeString(CConstants.DateTimeFormat) }));
                    sStatus = SlotStatus.PLANNED;
                    this.StatusIcon(oOverViewSlot, s, isReadOnly, sDoseType, sDose, sToolTip, sStatus, sImagePath, sPrescribedDoseToolTip);
                    if (this.oChartTypeSelected == ChartType.Prescription_Chart && (String.Compare(sDoseType, DoseTypeCode.TITRATED, StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(sDoseType, DoseTypeCode.STEPPEDVARIABLE, StringComparison.CurrentCultureIgnoreCase) == 0) && MedChartData.Is7DayView) {
                        oOverViewSlot.Dose = sDose;
                    }
                    objtooltip = s;
                    break;
                case SlotStatus.OVERDUE:
                    s.Children.Clear();
                    s.Children.Add(ObjectHelper.CreateObject(new TextBlock(), { Text: MedsAdminChartToolTip.PlannedToolTip }));
                    sImagePath = MedImage.GetPath(MedImages.PlannedIcon);
                    s.Children.Add(ObjectHelper.CreateObject(new TextBlock(), { Text: MedsAdminChartToolTip.DueAtTooltip + ": " + oTagSlotDetail.SlotDateTime.ToUserDateTimeString(CConstants.DateTimeFormat) }));
                    isReadOnly = true;
                    sToolTip = MedsAdminChartToolTip.OverdueToolTip;
                    sStatus = SlotStatus.PLANNED;
                    if (this.oChartTypeSelected == ChartType.Prescription_Chart && (String.Compare(sDoseType, DoseTypeCode.TITRATED, StringComparison.CurrentCultureIgnoreCase) == 0) && !String.IsNullOrEmpty(sDose) && !String.Equals(sDose, CConstants.DoseTBD, StringComparison.CurrentCultureIgnoreCase)) {
                        if (!String.IsNullOrEmpty(oSlotDetail.PreparedBy)) {
                            sPrescribedDoseToolTip = MedsAdminChartToolTip.PrescribedDoseToolTip + ": " + sDose;
                            sPrescribedDoseToolTip += Environment.NewLine + Environment.NewLine + MedsAdminChartToolTip.Enteredby + oSlotDetail.PreparedBy;
                        }
                    }
                    this.StatusIcon(oOverViewSlot, s, isReadOnly, sDoseType, sDose, sToolTip, sStatus, sImagePath, sPrescribedDoseToolTip);
                    if (this.oChartTypeSelected == ChartType.Prescription_Chart && (String.Compare(sDoseType, DoseTypeCode.TITRATED, StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(sDoseType, DoseTypeCode.STEPPEDVARIABLE, StringComparison.CurrentCultureIgnoreCase) == 0) && MedChartData.Is7DayView) {
                        oOverViewSlot.Dose = sDose;
                    }
                    objtooltip = s;
                    break;
                case SlotStatus.DUENOW:
                    s.Children.Clear();
                    s.Children.Add(ObjectHelper.CreateObject(new TextBlock(), { Text: MedsAdminChartToolTip.PlannedToolTip }));
                    sImagePath = MedImage.GetPath(MedImages.PlannedIcon);
                    s.Children.Add(ObjectHelper.CreateObject(new TextBlock(), { Text: MedsAdminChartToolTip.DueAtTooltip + ": " + oTagSlotDetail.SlotDateTime.ToUserDateTimeString(CConstants.DateTimeFormat) }));
                    isReadOnly = true;
                    sToolTip = MedsAdminChartToolTip.DueNowToolTip;
                    if (this.oChartTypeSelected == ChartType.Prescription_Chart && (String.Compare(sDoseType, DoseTypeCode.TITRATED, StringComparison.CurrentCultureIgnoreCase) == 0) && !String.IsNullOrEmpty(sDose) && !String.Equals(sDose, CConstants.DoseTBD, StringComparison.CurrentCultureIgnoreCase)) {
                        if (!String.IsNullOrEmpty(oSlotDetail.PreparedBy)) {
                            sPrescribedDoseToolTip = MedsAdminChartToolTip.PrescribedDoseToolTip + ": " + sDose;
                            sPrescribedDoseToolTip += Environment.NewLine + Environment.NewLine + MedsAdminChartToolTip.Enteredby + oSlotDetail.PreparedBy;
                        }
                    }
                    sStatus = SlotStatus.PLANNED;
                    this.StatusIcon(oOverViewSlot, s, isReadOnly, sDoseType, sDose, sToolTip, sStatus, sImagePath, sPrescribedDoseToolTip);
                    if (this.oChartTypeSelected == ChartType.Prescription_Chart && (String.Compare(sDoseType, DoseTypeCode.TITRATED, StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(sDoseType, DoseTypeCode.STEPPEDVARIABLE, StringComparison.CurrentCultureIgnoreCase) == 0) && MedChartData.Is7DayView) {
                        oOverViewSlot.Dose = sDose;
                    }
                    objtooltip = s;
                    break;
                case SlotStatus.NOTYETRECORDED:
                    s.Children.Clear();
                    s.Children.Add(ObjectHelper.CreateObject(new TextBlock(), { Text: MedsAdminChartToolTip.PlannedToolTip }));
                    s.Children.Add(ObjectHelper.CreateObject(new TextBlock(), { Text: MedsAdminChartToolTip.DueAtTooltip + ": " + oTagSlotDetail.SlotDateTime.ToUserDateTimeString(CConstants.DateTimeFormat) }));
                    isReadOnly = true;
                    sToolTip = MedsAdminChartToolTip.NotyetRecordToolTip;
                    sStatus = SlotStatus.PLANNED;
                    sImagePath = MedImage.GetPath(MedImages.PlannedIcon);
                    if (this.oChartTypeSelected == ChartType.Prescription_Chart && (String.Compare(sDoseType, DoseTypeCode.TITRATED, StringComparison.CurrentCultureIgnoreCase) == 0) && !String.IsNullOrEmpty(sDose) && !String.Equals(sDose, CConstants.DoseTBD, StringComparison.CurrentCultureIgnoreCase)) {
                        if (!String.IsNullOrEmpty(oSlotDetail.PreparedBy)) {
                            sPrescribedDoseToolTip = MedsAdminChartToolTip.PrescribedDoseToolTip + ": " + sDose;
                            sPrescribedDoseToolTip += Environment.NewLine + Environment.NewLine + MedsAdminChartToolTip.Enteredby + oSlotDetail.PreparedBy;
                        }
                    }
                    this.StatusIcon(oOverViewSlot, s, isReadOnly, sDoseType, sDose, sToolTip, sStatus, sImagePath, sPrescribedDoseToolTip);
                    if (this.oChartTypeSelected == ChartType.Prescription_Chart && (String.Compare(sDoseType, DoseTypeCode.TITRATED, StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(sDoseType, DoseTypeCode.STEPPEDVARIABLE, StringComparison.CurrentCultureIgnoreCase) == 0) && MedChartData.Is7DayView) {
                        oOverViewSlot.Dose = sDose;
                    }
                    objtooltip = s;
                    break;
                case SlotStatus.DEFEROVERDUE:
                case SlotStatus.DEFERDUENOW:
                case SlotStatus.DEFERADMIN:
                    s.Children.Clear();
                    s.Children.Add(ObjectHelper.CreateObject(new TextBlock(), { Text: MedsAdminChartToolTip.DeferredAtToolTip + ": " + oSlotDetail.AdministrationDetail.AdministeredDate.ToUserDateTimeString(CConstants.DateTimeFormat) }));
                    s.Children.Add(ObjectHelper.CreateObject(new TextBlock(), { Text: MedsAdminChartToolTip.DeferredByToolTip + ": " + oSlotDetail.AdministrationDetail.RecordedBy }));
                    if (!String.IsNullOrEmpty(sReason))
                        s.Children.Add(ObjectHelper.CreateObject(new TextBlock(), { Text: MedsAdminChartToolTip.ReasonToolTip + ": " + sReason }));
                    if (!String.IsNullOrEmpty(sAdminComments)) {
                        s.Children.Add(ObjectHelper.CreateObject(new iLabel(), { Text: MedsAdminChartToolTip.CommentsToolTip + ": " + sAdminComments, IsWordwrap: true, Width: 200, HorizontalAlignment: HorizontalAlignment.Left }));
                        oOverViewSlot.AdministrationIcon = Common.GetAdminCommentsIcon(MedsAdminChartToolTip.CommentsToolTip + ": " + sAdminComments);
                    }
                    sImagePath = oTagSlotDetail.IsInfusion && !oTagSlotDetail.IsBolus ? MedImage.GetPath(MedImages.InfPlannedDeferredIcon) : MedImage.GetPath(MedImages.PlannedIcon);
                    sTooltip = String.Empty;
                    oOverViewSlot.StatusIcon = this.LoadImage(SlotStatus.PLANNED, sImagePath, isReadOnly);
                    objtooltip = s;
                    break;
                case SlotStatus.GIVEN:
                    s.Children.Clear();
                    s.Children.Add(ObjectHelper.CreateObject(new TextBlock(), { Text: MedsAdminChartToolTip.GivenToolTip }));
                    s.Children.Add(ObjectHelper.CreateObject(new TextBlock(), { Text: MedsAdminChartToolTip.DoseTootip + ": " + sDose }));
                    s.Children.Add(ObjectHelper.CreateObject(new TextBlock(), { Text: MedsAdminChartToolTip.DueAtTooltip + ": " + oTagSlotDetail.SlotDateTime.ToUserDateTimeString(CConstants.DateTimeFormat) }));
                    if (!String.IsNullOrEmpty(sAdminComments)) {
                        s.Children.Add(ObjectHelper.CreateObject(new iLabel(), { Text: MedsAdminChartToolTip.CommentsToolTip + ": " + sAdminComments, IsWordwrap: true, Width: 200, HorizontalAlignment: HorizontalAlignment.Left }));
                        oOverViewSlot.AdministrationIcon = Common.GetAdminCommentsIcon(MedsAdminChartToolTip.CommentsToolTip + ": " + sAdminComments);
                    }
                    objtooltip = s;
                    if (!String.IsNullOrEmpty(sReason) && oSlotDetail != null && oSlotDetail.AdministrationDetail != null && !String.IsNullOrEmpty(oSlotDetail.AdministrationDetail.DoseDiscReasonCode)) {
                        oOverViewSlot.StatusIcon = this.LoadImage(SlotStatus.GIVEN, MedImage.GetPath(MedImages.DoseDiscrepancy), isReadOnly);
                    }
                    else if (sAdminOnTimeMode == 'E') {
                        sTooltip = sTooltip + "\n" + String.Format(CConstants.EARLYADMINISTRATIONTEXT, Common.AdminDiffValue(oTagSlotDetail.SlotDateTime, oTagSlotDetail.AdministeredAt, 'E'));
                        oOverViewSlot.StatusIcon = this.LoadImage(SlotStatus.GIVEN, MedImage.GetPath(MedImages.EarlyAdminIcon), isReadOnly);
                    }
                    else if (sAdminOnTimeMode == 'L') {
                        sTooltip = sTooltip + "\n" + String.Format(CConstants.LATEADMINISTRATIONTEXT, Common.AdminDiffValue(oTagSlotDetail.SlotDateTime, oTagSlotDetail.AdministeredAt, 'L'));
                        oOverViewSlot.StatusIcon = this.LoadImage(SlotStatus.GIVEN, MedImage.GetPath(MedImages.LateAdminIcon), isReadOnly);
                    }
                    else {
                        oOverViewSlot.StatusIcon = this.LoadImage(SlotStatus.GIVEN, MedImage.GetPath(MedImages.AdministeredIcon), isReadOnly);
                    }
                    if (MedChartData.Is7DayView) {
                        oOverViewSlot.Dose = sDose;
                    }
                    if (this.oChartTypeSelected == ChartType.Prescription_Chart && oTagSlotDetail.IsPRN) {
                        this.AssignslotdetailsforPRN(oOverViewSlot, oTagSlotDetail, oSlotDetail);
                    }
                    break;
                case SlotStatus.NOTGIVEN:
                    s.Children.Clear();
                    if (oTagSlotDetail.IsDuringHomeLeave) {
                        s.Children.Add(ObjectHelper.CreateObject(new iLabel(), { Text: MedsAdminChartToolTip.StatusToolTip + ": " + MedsAdminChartToolTip.NotGivenToolTip + MedsAdminChartToolTip.DuringHomeLeaveTooltip }));
                    }
                    else {
                        s.Children.Add(ObjectHelper.CreateObject(new iLabel(), { Text: MedsAdminChartToolTip.StatusToolTip + ": " + MedsAdminChartToolTip.NotGivenToolTip }));
                    }
                    if (oTagSlotDetail.IsInfusion && !oTagSlotDetail.IsBolus && this.oTagDrugHeaderDetail.MultiRoute_Type != MultiRouteType.Mixed_Routes) {
                        sImagePath = MedImage.GetPath(MedImages.InfNotGivenIcon);
                    }
                    else {
                        sImagePath = MedImage.GetPath(MedImages.NotGivenSlotIcon);
                    }
                    s.Children.Add(ObjectHelper.CreateObject(new iLabel(), { Text: MedsAdminChartToolTip.ReasonToolTip + ": " + sReason, IsWordwrap: true, Width: 200, HorizontalAlignment: HorizontalAlignment.Left }));
                    s.Children.Add(ObjectHelper.CreateObject(new iLabel(), { Text: MedsAdminChartToolTip.DueAtTooltip + ": " + oTagSlotDetail.SlotDateTime.ToUserDateTimeString(CConstants.DateTimeFormat) }));
                    s.Children.Add(ObjectHelper.CreateObject(new iLabel(), { Text: MedsAdminChartToolTip.RecordedAtToolTip + ": " + oSlotDetail.AdministrationDetail.RecordedAt.ToUserDateTimeString(CConstants.DateTimeFormat) }));
                    s.Children.Add(ObjectHelper.CreateObject(new iLabel(), { Text: MedsAdminChartToolTip.RecordedByToolTip + ": " + oSlotDetail.AdministrationDetail.RecordedBy }));
                    if (!String.IsNullOrEmpty(sAdminComments)) {
                        s.Children.Add(ObjectHelper.CreateObject(new iLabel(), { Text: MedsAdminChartToolTip.CommentsToolTip + ": " + sAdminComments, IsWordwrap: true, Width: 200, HorizontalAlignment: HorizontalAlignment.Left }));
                        oOverViewSlot.AdministrationIcon = Common.GetAdminCommentsIcon(MedsAdminChartToolTip.CommentsToolTip + ": " + sAdminComments);
                    }
                    sTooltip = String.Empty;
                    objtooltip = s;
                    oOverViewSlot.StatusIcon = this.LoadImage(SlotStatus.NOTGIVEN, sImagePath, isReadOnly);
                    if (MedChartData.Is7DayView && ValueDomainValues.oReasonForNotGiven != null && ValueDomainValues.oReasonForNotGiven.Count() > 0 && oTagSlotDetail != null) {
                        oOverViewSlot.ReasonForNotGiven = !String.IsNullOrEmpty(oTagSlotDetail.AdminReasonCode) ? ValueDomainValues.oReasonForNotGiven.FirstOrDefault(a => a.Key == oTagSlotDetail.AdminReasonCode).Value.ToString() : String.Empty;
                        oOverViewSlot.ReasonToolTip = MedsAdminChartToolTip.ReasonToolTip + ": " + CommonBB.GetText(oTagSlotDetail.AdminReasonCode, ValueDomainValues.oRecordAdminReasons);
                        oOverViewSlot.ReasonToolTip += !String.IsNullOrEmpty(oTagSlotDetail.Comments) ? "\n" + MedsAdminChartToolTip.CommentsToolTip + ": " + oTagSlotDetail.Comments : String.Empty;
                        oOverViewSlot.ReasonFontSize = CConstants.Thirteen;
                    }
                    break;
                case SlotStatus.NOTKNOWN:
                    s.Children.Clear();
                    if (oTagSlotDetail.IsInfusion && !oTagSlotDetail.IsBolus) {
                        s.Children.Add(ObjectHelper.CreateObject(new iLabel(), { Text: MedsAdminChartToolTip.StatusToolTip + ": " + MedsAdminChartToolTip.NotKnownToolTip }));
                        sImagePath = MedImage.GetPath(MedImages.InfNotKnownIcon);
                    }
                    else {
                        if (oTagSlotDetail.IsDuringHomeLeave) {
                            s.Children.Add(ObjectHelper.CreateObject(new TextBlock(), { Text: MedsAdminChartToolTip.NotKnownToolTip + MedsAdminChartToolTip.DuringHomeLeaveTooltip }));
                        }
                        else {
                            s.Children.Add(ObjectHelper.CreateObject(new TextBlock(), { Text: MedsAdminChartToolTip.NotKnownToolTip }));
                        }
                        sImagePath = MedImage.GetPath(MedImages.NotKnownSlotIcon);
                    }
                    s.Children.Add(ObjectHelper.CreateObject(new iLabel(), { Text: MedsAdminChartToolTip.DueAtTooltip + ": " + oTagSlotDetail.SlotDateTime.ToUserDateTimeString(CConstants.DateTimeFormat) }));
                    s.Children.Add(ObjectHelper.CreateObject(new iLabel(), { Text: MedsAdminChartToolTip.RecordedAtToolTip + ": " + oSlotDetail.AdministrationDetail.RecordedAt.ToUserDateTimeString(CConstants.DateTimeFormat) }));
                    s.Children.Add(ObjectHelper.CreateObject(new iLabel(), { Text: MedsAdminChartToolTip.RecordedByToolTip + ": " + oSlotDetail.AdministrationDetail.RecordedBy }));
                    if (!String.IsNullOrEmpty(sAdminComments)) {
                        s.Children.Add(ObjectHelper.CreateObject(new iLabel(), { Text: MedsAdminChartToolTip.CommentsToolTip + ": " + sAdminComments, IsWordwrap: true, Width: 200, HorizontalAlignment: HorizontalAlignment.Left }));
                        oOverViewSlot.AdministrationIcon = Common.GetAdminCommentsIcon(MedsAdminChartToolTip.CommentsToolTip + ": " + sAdminComments);
                    }
                    sTooltip = String.Empty;
                    objtooltip = s;
                    oOverViewSlot.StatusIcon =this.LoadImage(SlotStatus.NOTKNOWN, sImagePath, isReadOnly);
                    break;
                case SlotStatus.SELFADMINISTERED:
                    s.Children.Clear();
                    s.Children.Add(ObjectHelper.CreateObject(new TextBlock(), { Text: MedsAdminChartToolTip.GivenToolTip }));
                    s.Children.Add(ObjectHelper.CreateObject(new TextBlock(), { Text: MedsAdminChartToolTip.DoseTootip + ": " + sDose }));
                    s.Children.Add(ObjectHelper.CreateObject(new TextBlock(), { Text: MedsAdminChartToolTip.DueAtTooltip + ": " + oTagSlotDetail.SlotDateTime.ToUserDateTimeString(CConstants.DateTimeFormat) }));
                    s.Children.Add(ObjectHelper.CreateObject(new TextBlock(), { Text: MedsAdminChartToolTip.SelfAdministeredToolTip }));
                    if (!String.IsNullOrEmpty(sAdminComments)) {
                        s.Children.Add(ObjectHelper.CreateObject(new iLabel(), { Text: MedsAdminChartToolTip.CommentsToolTip + ": " + sAdminComments, IsWordwrap: true, Width: 200, HorizontalAlignment: HorizontalAlignment.Left }));
                        oOverViewSlot.AdministrationIcon = Common.GetAdminCommentsIcon(MedsAdminChartToolTip.CommentsToolTip + ": " + sAdminComments);
                    }
                    objtooltip = s;
                    if (!String.IsNullOrEmpty(sReason) && oSlotDetail != null && oSlotDetail.AdministrationDetail != null && !String.IsNullOrEmpty(oSlotDetail.AdministrationDetail.DoseDiscReasonCode)) {
                        oOverViewSlot.StatusIcon = this.LoadImage(SlotStatus.SELFADMINISTERED, MedImage.GetPath(MedImages.DoseDiscrepancy), isReadOnly);
                    }
                    else if (sAdminOnTimeMode == 'E') {
                        sTooltip = sTooltip + "\n" + String.Format(CConstants.EARLYADMINISTRATIONTEXT, Common.AdminDiffValue(oTagSlotDetail.SlotDateTime, oTagSlotDetail.AdministeredAt, 'E'));
                        oOverViewSlot.StatusIcon = this.LoadImage(SlotStatus.SELFADMINISTERED, MedImage.GetPath(MedImages.SelfAdminEarlyIcon), isReadOnly);
                    }
                    else if (sAdminOnTimeMode == 'L') {
                        sTooltip = sTooltip + "\n" + String.Format(CConstants.LATEADMINISTRATIONTEXT, Common.AdminDiffValue(oTagSlotDetail.SlotDateTime, oTagSlotDetail.AdministeredAt, 'L'));
                        oOverViewSlot.StatusIcon = this.LoadImage(SlotStatus.SELFADMINISTERED, MedImage.GetPath(MedImages.SelfAdminLateIcon), isReadOnly);
                    }
                    else {
                        oOverViewSlot.StatusIcon = this.LoadImage(SlotStatus.SELFADMINISTERED, MedImage.GetPath(MedImages.SelfAdministeredIcon), isReadOnly);
                    }
                    if (MedChartData.Is7DayView) {
                        oOverViewSlot.Dose = sDose;
                    }
                    if (this.oChartTypeSelected == ChartType.Prescription_Chart && oTagSlotDetail.IsPRN) {
                        this.AssignslotdetailsforPRN(oOverViewSlot, oTagSlotDetail, oSlotDetail);
                    }
                    break;
                case SlotStatus.PATIENTSELFADMIN:
                    s.Children.Clear();
                    s.Children.Add(ObjectHelper.CreateObject(new TextBlock(), { Text: MedsAdminChartToolTip.SelfAdministeringToolTip }));
                    objtooltip = s;
                    oOverViewSlot.StatusIcon = this.LoadImage(SlotStatus.PATIENTSELFADMIN, MedImage.GetPath(MedImages.PatSelfAdmin), isReadOnly);
                    break;
                case SlotStatus.OMITTED:
                    s.Children.Clear();
                    s.Children.Add(ObjectHelper.CreateObject(new iLabel(), { Text: MedsAdminChartToolTip.OmittedStatusToolTip }));
                    if (oSlotDetail.AdministrationDetail != null && !String.IsNullOrEmpty(oSlotDetail.AdministrationDetail.RecordedBy)) {
                        s.Children.Add(ObjectHelper.CreateObject(new iLabel(), { Text: oSlotDetail.AdministrationDetail.RecordedBy }));
                    }
                    s.Children.Add(ObjectHelper.CreateObject(new iLabel(), { Text: MedsAdminChartToolTip.ReasonToolTip + ": " + sReason, IsWordwrap: true, Width: 200 }));
                    if (isReadOnly)
                        sTooltip = String.Empty;
                    isReadOnly = true;
                    sImagePath = oTagSlotDetail.IsInfusion && !oTagSlotDetail.IsBolus ? MedImage.GetPath(MedImages.InfOmittedIcon) : MedImage.GetPath(MedImages.OmittedSlotIcon);
                    oOverViewSlot.StatusIcon = this.LoadImage(SlotStatus.OMITTED, sImagePath, isReadOnly);
                    oOverViewSlot.BackGroundColor = new SolidColorBrush(MedChartData.OmittedSlotsColor);
                    if (MedChartData.Is7DayView) {
                        oOverViewSlot.Dose = SlotStatusText.OMITTED;
                    }
                    if (!String.IsNullOrEmpty(sAdminComments) && (String.Compare(sSlotStatus, SlotStatus.OMITTED, StringComparison.CurrentCultureIgnoreCase) != 0)) {
                        s.Children.Add(ObjectHelper.CreateObject(new iLabel(), { Text: MedsAdminChartToolTip.CommentsToolTip + ": " + sAdminComments, IsWordwrap: true, Width: 200, HorizontalAlignment: HorizontalAlignment.Left }));
                        oOverViewSlot.AdministrationIcon = Common.GetAdminCommentsIcon(MedsAdminChartToolTip.CommentsToolTip + ": " + sAdminComments);
                    }
                    else s.Children.Add(ObjectHelper.CreateObject(new iLabel(), { Text: sTooltip.ToString() }));
                    objtooltip = s;
                    break;
                case SlotStatus.HOMELEAVE:
                    s.Children.Clear();
                    if (DateTime.LessThanOrEqualTo(oTagSlotDetail.SlotDateTime, CommonBB.GetServerDateTime().DateTime.AddDays(-2))) {
                        isReadOnly = false;
                    }
                    else {
                        isReadOnly = true;
                    }
                    oOverViewSlot.StatusIcon = this.LoadImage("HomeLeaveIcon", MedImage.GetPath(MedImages.HomeLeaveIcon), isReadOnly);
                    s.Children.Add(ObjectHelper.CreateObject(new TextBlock(), { Text: MedsAdminChartToolTip.HomeLeaveToolTip }));
                    objtooltip = s;
                    break;
            }
            oOverViewSlot.SlotHeight = this.MaxRowDoseHeightValue > 0 ? this.MinSlotHeight + this.MaxRowDoseHeightValue : this.CalculateSlotHeight(this.nMaxSlotCount);
            if (oOverViewSlot.StatusIcon != null) {
                if (!String.IsNullOrEmpty(sTooltip)) {
                    if (!String.IsNullOrEmpty(sAdminComments) && (String.Compare(sSlotStatus, SlotStatus.OMITTED, StringComparison.CurrentCultureIgnoreCase) != 0))
                        oOverViewSlot.StatusIcon.Tooltip = Common.GetWrappedToolTipContent(sTooltip, sAdminComments);
                    else oOverViewSlot.StatusIcon.Tooltip = sTooltip;
                }
                else oOverViewSlot.StatusIcon.Tooltip = objtooltip;
            }
            oOverViewSlot.Tag = oTagSlotDetail;
            if (this.IsGreyedOut)
                oOverViewSlot.BackGroundColor = Common.SetSlotColor(String.Empty, this.IsGreyedOut);
            else if (this.IsCompleted)
                oOverViewSlot.BackGroundColor = new SolidColorBrush(Color.FromArgb(255, 185, 251, 114));
            if (this.oChartTypeSelected == ChartType.Prescription_Chart) {
                if (MedChartData.IsPresChartReadOnly) {
                    oOverViewSlot.EnableSlotClick = false;
                }
                else {

                }
            }
            return oOverViewSlot;
        }
        public AssignslotdetailsforPRN(oOverViewSlot: DoseOverviewSlot, oTagSlotDetail: TagSlotDetail, oSlotDetail: SlotDetail): void {
            let nTotalAdministeredCount: number = 0;
            let nDrugCount: number = 0;
            if (this.LstDrugDetail != null) {
                nDrugCount = this.LstDrugDetail.Count;
            }
            if (nDrugCount > 0) {
                for (let jCnt: number = 0; jCnt < nDrugCount; jCnt++) {
                    if (this.oTagDrugHeaderDetail != null && this.LstDrugDetail[jCnt].DrugHeader != null) {
                        if (this.LstDrugDetail[jCnt].DrugHeader.PrescriptionItemOID == this.oTagDrugHeaderDetail.PrescriptionItemOID) {
                            if (this.LstDrugDetail[jCnt].SlotDetails != null) {
                                nTotalAdministeredCount = this.LstDrugDetail[jCnt].SlotDetails.Where(x => x.AdministrationDetail != null && DateTime.Equals(x.ScheduledDTTM.Date, oSlotDetail.ScheduledDTTM.Date)).Count();
                                break;
                            }
                        }
                    }
                }
            }
            if (MedChartData.Is7DayView) {
                if (this.oTagDrugHeaderDetail != null && !this.oTagDrugHeaderDetail.IsPRNWithSchedule && nTotalAdministeredCount > 0) {
                    oOverViewSlot.AdministerationCount = Convert.ToString(nTotalAdministeredCount);
                    oOverViewSlot.ACToolTip = Resource.MedsAdminPrescChartView.NumberofAdministration_ToolTip;
                }
                if (oSlotDetail.AdministrationDetail != null && !String.IsNullOrEmpty(oSlotDetail.AdministrationDetail.Dose)) {
                    oOverViewSlot.Dose = oSlotDetail.AdministrationDetail.Dose + " " + oSlotDetail.AdministrationDetail.DoseUOM;
                }
            }
            else {
                if (this.oTagDrugHeaderDetail != null && !this.oTagDrugHeaderDetail.IsPRNWithSchedule) {
                    oOverViewSlot.AdministerationCount = Convert.ToString(nTotalAdministeredCount);
                    oOverViewSlot.ACToolTip = Resource.MedsAdminPrescChartView.NumberofAdministration_ToolTip;
                }
            }
        }
        public CreateOverviewSlotForInfusion(sKey: string, SlotDateTime: DateTime, sSlotStatus: string, sDose: string, oTagSlotDetail: TagSlotDetail, sTooltip: string, sReason: string, sDoseType: string, oSlotDetail: SlotDetail, ItemSubtype: string, oInfAction: InfusionAdminDetail, sAdminOnTimeMode: string, IsPRNWithSchedule: boolean, IsHistoryExists: boolean, sHistoryToolTip: string): DoseOverviewSlot {
            let s: StackPanel = new StackPanel();
            let oOverViewSlot: DoseOverviewSlot = new DoseOverviewSlot();
            let objtooltip: Object = null;
            oOverViewSlot.Key = "Overview-" + sKey;
            let isReadOnly: boolean = false;
            let isPRN: boolean = false;
            if (this.oTagDrugHeaderDetail != null && DateTime.NotEquals(this.oTagDrugHeaderDetail.ReviewDTTM , DateTime.MinValue) && !(String.Compare(this.oTagDrugHeaderDetail.INFTYCODE, InfusionTypeCode.INTERMITTENT, StringComparison.CurrentCultureIgnoreCase) == 0) && oTagSlotDetail != null && DateTime.Equals(oTagSlotDetail.SlotDateTime.Date , this.oTagDrugHeaderDetail.ReviewDTTM.Date)) {
                oOverViewSlot.HighlightReviewSlot = true;
            }
            else if (this.oTagDrugHeaderDetail != null && DateTime.NotEquals(this.oTagDrugHeaderDetail.ReviewDTTM , DateTime.MinValue) && oTagSlotDetail != null && (String.Compare(this.oTagDrugHeaderDetail.INFTYCODE, InfusionTypeCode.INTERMITTENT, StringComparison.CurrentCultureIgnoreCase) == 0)) {
                oOverViewSlot.HighlightReviewSlot = oTagSlotDetail.IsHighlightSlot;
            }
            if (this.oChartTypeSelected == ChartType.Prescription_Chart)
                isReadOnly = true;
            let sToolTip: string = String.Empty;
            let sStatus: string = String.Empty;
            let sImagePath: string = String.Empty;
            let sPrescribedDoseToolTip: string = String.Empty;
            let sb: StringBuilder = new StringBuilder();
            let InfVol: number = 0;
            let sAdminComments: string = String.Empty;
            if (oTagSlotDetail != null) {
                if (oTagSlotDetail.IsPRN)
                    isPRN = oTagSlotDetail.IsPRN.GetValueOrDefault();
                else
                    isPRN = false;
            }
            if (oSlotDetail.AdministrationDetail != null) {
                if (oInfAction != null)
                    sAdminComments = oInfAction.infusionComments;
                if (String.IsNullOrEmpty(sAdminComments))
                    sAdminComments = oSlotDetail.AdministrationDetail.AdminComments;
            }
            if (oTagSlotDetail != null && !String.IsNullOrEmpty(oTagSlotDetail.TotalVolumeInfused)) {
                Number.TryParse(oTagSlotDetail.TotalVolumeInfused, (o) => { InfVol = o; });
                //Number.TryParse(oTagSlotDetail.TotalVolumeInfused, InfVol);
            }
            switch (sSlotStatus) {
                case MedicationAction.CHANGEBAG:
                case MedicationAction.CHANGEFLOWRATE:
                case MedicationAction.BEGUN:
                case MedicationAction.RESUME:
                case SlotStatus.INPROGRESS:
                    sb.Clear();
                    if (oTagSlotDetail.IsDuringHomeLeave) {
                        sb.Append(MedsAdminChartToolTip.StatusToolTip + ": " + MedsAdminChartToolTip.InProgressToolTip + MedsAdminChartToolTip.DuringHomeLeaveTooltip + Environment.NewLine);
                    }
                    else {
                        sb.Append(MedsAdminChartToolTip.StatusToolTip + ": " + MedsAdminChartToolTip.InProgressToolTip + Environment.NewLine);
                    }
                    if (!isPRN) {
                        sb.Append(MedsAdminChartToolTip.DueAtTooltip + ": " + oTagSlotDetail.SlotDateTime.ToUserDateTimeString(CConstants.DateTimeFormat) + Environment.NewLine);
                    }
                    sb.Append(MedsAdminChartToolTip.BegunAtToolTip + ": " + oTagSlotDetail.FirstBagBegunAt.ToUserDateTimeString(CConstants.DateTimeFormat) + Environment.NewLine);
                    if (String.Compare(ItemSubtype, InfusionTypesCode.SUBTYPE_GAS, StringComparison.CurrentCultureIgnoreCase) != 0) {
                        if (InfVol > 0 && !String.IsNullOrEmpty(oTagSlotDetail.TotalVolumeInfusedUOMName)) {
                            sb.Append(MedsAdminChartToolTip.TotalVolumeInfusedToolTip + ": " + String.Format("{0}", InfVol) + " " + oTagSlotDetail.TotalVolumeInfusedUOMName + Environment.NewLine);
                        }
                        sb.Append(MedsAdminChartToolTip.CurrentBagVolumeInfusedToolTip + ": " + oTagSlotDetail.CurrentBagVolumeInfused + " " + oTagSlotDetail.CurrentBagVolumeInfusedUOMName + Environment.NewLine);
                    }
                    if (oInfAction != null) {
                        sb.Append(MedsAdminChartToolTip.RecordedAtToolTip + ": " + oInfAction.RecordedAt.ToUserDateTimeString(CConstants.DateTimeFormat) + Environment.NewLine);
                        sb.Append(MedsAdminChartToolTip.RecordedByToolTip + ": " + oInfAction.RecordedBy);
                    }
                    if (!String.IsNullOrEmpty(sAdminComments)) {
                        s = Common.GetWrappedToolTipContent(sb.ToString(), sAdminComments);
                        oOverViewSlot.AdministrationIcon = Common.GetAdminCommentsIcon(MedsAdminChartToolTip.CommentsToolTip + ": " + sAdminComments);
                    }
                    else s.Children.Add(ObjectHelper.CreateObject(new iLabel(), { Text: sb.ToString() }));
                    sTooltip = String.Empty;
                    if (String.Compare(this.oTagDrugHeaderDetail.INFTYCODE, InfusionTypeCode.INTERMITTENT, StringComparison.CurrentCultureIgnoreCase) == 0) {
                        if (DateTime.GreaterThan(SlotDateTime.Date , oSlotDetail.AdministrationDetail.InfusionStartDate.Date)&& String.Compare(oSlotDetail.Status, SlotStatus.INPROGRESS, StringComparison.CurrentCultureIgnoreCase) == 0)
                            sImagePath = MedImage.GetPath(MedImages.InfBegResInProgDiffDateIcon);
                        else sImagePath = MedImage.GetPath(MedImages.InfBegResInProgSameDateIcon);
                    }
                    else {
                        if (DateTime.NotEquals(oSlotDetail.AdministrationDetail.InfusionStartDate.Date, SlotDateTime.Date))
                            sImagePath = MedImage.GetPath(MedImages.InfBegResInProgDiffDateIcon);
                        else sImagePath = MedImage.GetPath(MedImages.InfBegResInProgSameDateIcon);
                    }
                    oOverViewSlot.StatusIcon = this.LoadImage(MedicationAction.INPROGRESS, sImagePath, isReadOnly);
                    objtooltip = s;
                    break;
                case MedicationAction.PAUSE:
                case SlotStatus.PAUSED:
                    sb.Clear();
                    if (oTagSlotDetail.IsDuringHomeLeave) {
                        sb.Append(MedsAdminChartToolTip.StatusToolTip + ": " + MedsAdminChartToolTip.PausedToolTip + MedsAdminChartToolTip.DuringHomeLeaveTooltip + Environment.NewLine);
                    }
                    else {
                        sb.Append(MedsAdminChartToolTip.StatusToolTip + ": " + MedsAdminChartToolTip.PausedToolTip + Environment.NewLine);
                    }
                    sb.Append(MedsAdminChartToolTip.ReasonToolTip + ": " + sReason + Environment.NewLine);
                    sb.Append(MedsAdminChartToolTip.DueAtTooltip + ": " + oTagSlotDetail.SlotDateTime.ToUserDateTimeString(CConstants.DateTimeFormat) + Environment.NewLine);
                    sb.Append(MedsAdminChartToolTip.BegunAtToolTip + ": " + oTagSlotDetail.FirstBagBegunAt.ToUserDateTimeString(CConstants.DateTimeFormat) + Environment.NewLine);
                    if (String.Compare(ItemSubtype, InfusionTypesCode.SUBTYPE_GAS, StringComparison.CurrentCultureIgnoreCase) != 0) {
                        if (InfVol > 0 && !String.IsNullOrEmpty(oTagSlotDetail.TotalVolumeInfusedUOMName)) {
                            sb.Append(MedsAdminChartToolTip.TotalVolumeInfusedToolTip + ": " + String.Format("{0}", InfVol) + " " + oTagSlotDetail.TotalVolumeInfusedUOMName + Environment.NewLine);
                        }
                        sb.Append(MedsAdminChartToolTip.CurrentBagVolumeInfusedToolTip + ": " + oTagSlotDetail.CurrentBagVolumeInfused + " " + oTagSlotDetail.CurrentBagVolumeInfusedUOMName + Environment.NewLine);
                    }
                    if (oInfAction != null) {
                        sb.Append(MedsAdminChartToolTip.RecordedAtToolTip + ": " + oInfAction.RecordedAt.ToUserDateTimeString(CConstants.DateTimeFormat) + Environment.NewLine);
                        sb.Append(MedsAdminChartToolTip.RecordedByToolTip + ": " + oInfAction.RecordedBy);
                    }
                    if (!String.IsNullOrEmpty(sAdminComments)) {
                        s = Common.GetWrappedToolTipContent(sb.ToString(), sAdminComments);
                        oOverViewSlot.AdministrationIcon = Common.GetAdminCommentsIcon(MedsAdminChartToolTip.CommentsToolTip + ": " + sAdminComments);
                    }
                    else s.Children.Add(ObjectHelper.CreateObject(new iLabel(), { Text: sb.ToString() }));
                    sTooltip = String.Empty;
                    oOverViewSlot.StatusIcon = this.LoadImage(MedicationAction.PAUSE, MedImage.GetPath(MedImages.InfPausedIcon), isReadOnly);
                    objtooltip = s;
                    break;
                case MedicationAction.STOP:
                case SlotStatus.STOPPED:
                    sb.Clear();
                    if (oTagSlotDetail.IsDuringHomeLeave) {
                        sb.Append(MedsAdminChartToolTip.StatusToolTip + ": " + MedsAdminChartToolTip.StoppedToolTip + MedsAdminChartToolTip.DuringHomeLeaveTooltip + Environment.NewLine);
                    }
                    else {
                        sb.Append(MedsAdminChartToolTip.StatusToolTip + ": " + MedsAdminChartToolTip.StoppedToolTip + Environment.NewLine);
                    }
                    sb.Append(MedsAdminChartToolTip.ReasonToolTip + ": " + sReason + Environment.NewLine);
                    sb.Append(MedsAdminChartToolTip.DueAtTooltip + ": " + oTagSlotDetail.SlotDateTime.ToUserDateTimeString(CConstants.DateTimeFormat) + Environment.NewLine);
                    sb.Append(MedsAdminChartToolTip.BegunAtToolTip + ": " + oTagSlotDetail.FirstBagBegunAt.ToUserDateTimeString(CConstants.DateTimeFormat) + Environment.NewLine);
                    sb.Append(MedsAdminChartToolTip.EndedAtToolTip + ": " + oTagSlotDetail.LastBagEndedAt.ToUserDateTimeString(CConstants.DateTimeFormat) + Environment.NewLine);
                    if (InfVol > 0 && !String.IsNullOrEmpty(oTagSlotDetail.TotalVolumeInfusedUOMName)) {
                        sb.Append(MedsAdminChartToolTip.TotalVolumeInfusedToolTip + ": " + String.Format("{0}", InfVol) + " " + oTagSlotDetail.TotalVolumeInfusedUOMName + Environment.NewLine);
                    }
                    if (oInfAction != null) {
                        sb.Append(MedsAdminChartToolTip.RecordedAtToolTip + ": " + oInfAction.RecordedAt.ToUserDateTimeString(CConstants.DateTimeFormat) + Environment.NewLine);
                        sb.Append(MedsAdminChartToolTip.RecordedByToolTip + ": " + oInfAction.RecordedBy);
                    }
                    if (!String.IsNullOrEmpty(sAdminComments)) {
                        s = Common.GetWrappedToolTipContent(sb.ToString(), sAdminComments);
                        oOverViewSlot.AdministrationIcon = Common.GetAdminCommentsIcon(MedsAdminChartToolTip.CommentsToolTip + ": " + sAdminComments);
                    }
                    else s.Children.Add(ObjectHelper.CreateObject(new iLabel(), { Text: sb.ToString() }));
                    sTooltip = String.Empty;
                    oOverViewSlot.StatusIcon = this.LoadImage(MedicationAction.STOP, MedImage.GetPath(MedImages.InfStoppedIcon), isReadOnly);
                    objtooltip = s;
                    break;
                case MedicationAction.COMPLETE:
                case SlotStatus.COMPLETED:
                    sb.Clear();
                    if (oTagSlotDetail.IsDuringHomeLeave) {
                        sb.Append(MedsAdminChartToolTip.StatusToolTip + ": " + MedsAdminChartToolTip.Completed + MedsAdminChartToolTip.DuringHomeLeaveTooltip + Environment.NewLine);
                    }
                    else {
                        sb.Append(MedsAdminChartToolTip.StatusToolTip + ": " + MedsAdminChartToolTip.Completed + Environment.NewLine);
                    }
                    sb.Append(MedsAdminChartToolTip.DueAtTooltip + ": " + oTagSlotDetail.SlotDateTime.ToUserDateTimeString(CConstants.DateTimeFormat) + Environment.NewLine);
                    sb.Append(MedsAdminChartToolTip.BegunAtToolTip + ": " + oTagSlotDetail.FirstBagBegunAt.ToUserDateTimeString(CConstants.DateTimeFormat) + Environment.NewLine);
                    sb.Append(MedsAdminChartToolTip.EndedAtToolTip + ": " + oTagSlotDetail.LastBagEndedAt.ToUserDateTimeString(CConstants.DateTimeFormat) + Environment.NewLine);
                    if (String.Compare(ItemSubtype, InfusionTypesCode.SUBTYPE_GAS, StringComparison.CurrentCultureIgnoreCase) != 0 && InfVol > 0 && !String.IsNullOrEmpty(oTagSlotDetail.TotalVolumeInfusedUOMName)) {
                        sb.Append(MedsAdminChartToolTip.TotalVolumeInfusedToolTip + ": " + String.Format("{0}", InfVol) + " " + oTagSlotDetail.TotalVolumeInfusedUOMName + Environment.NewLine);
                    }
                    if (oInfAction != null) {
                        sb.Append(MedsAdminChartToolTip.RecordedAtToolTip + ": " + oInfAction.RecordedAt.ToUserDateTimeString(CConstants.DateTimeFormat) + Environment.NewLine);
                        sb.Append(MedsAdminChartToolTip.RecordedByToolTip + ": " + oInfAction.RecordedBy);
                    }
                    if (!String.IsNullOrEmpty(sAdminComments)) {
                        s = Common.GetWrappedToolTipContent(sb.ToString(), sAdminComments);
                        oOverViewSlot.AdministrationIcon = Common.GetAdminCommentsIcon(MedsAdminChartToolTip.CommentsToolTip + ": " + sAdminComments);
                    }
                    else s.Children.Add(ObjectHelper.CreateObject(new iLabel(), { Text: sb.ToString() }));
                    sTooltip = String.Empty;
                    oOverViewSlot.StatusIcon = this.LoadImage(MedicationAction.COMPLETE, MedImage.GetPath(MedImages.InfCompletedIcon), isReadOnly);
                    objtooltip = s;
                    break;
                case SlotStatus.PLANNED:
                case SlotStatus.OVERDUE:
                case SlotStatus.DUENOW:
                    sb.Clear();
                    isReadOnly = true;
                    sImagePath = MedImage.GetPath(MedImages.InfPlannedDeferredIcon);
                    sb.Append(MedsAdminChartToolTip.PlannedToolTip + Environment.NewLine);
                    ;
                    sPrescribedDoseToolTip = MedsAdminChartToolTip.PrescribedDoseToolTip + ": " + sDose;
                    sb.Append(MedsAdminChartToolTip.DueAtTooltip + ": " + oTagSlotDetail.SlotDateTime.ToUserDateTimeString(CConstants.DateTimeFormat));
                    s.Children.Add(ObjectHelper.CreateObject(new iLabel(), { Text: sb.ToString() }));
                    sStatus = SlotStatus.PLANNED;
                    this.StatusIcon(oOverViewSlot, s, isReadOnly, sDoseType, sDose, sToolTip, sStatus, sImagePath, sPrescribedDoseToolTip);
                    if (this.oChartTypeSelected == ChartType.Prescription_Chart && (String.Compare(sDoseType, DoseTypeCode.TITRATED, StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(sDoseType, DoseTypeCode.STEPPEDVARIABLE, StringComparison.CurrentCultureIgnoreCase) == 0) && MedChartData.Is7DayView) {
                        oOverViewSlot.Dose = sDose;
                    }
                    objtooltip = s;
                    break;
                case SlotStatus.NOTYETRECORDED:
                    sb.Clear();
                    sb.Append(MedsAdminChartToolTip.PlannedToolTip + Environment.NewLine);
                    sb.Append(MedsAdminChartToolTip.DueAtTooltip + ": " + oTagSlotDetail.SlotDateTime.ToUserDateTimeString(CConstants.DateTimeFormat) + Environment.NewLine);
                    sb.Append(MedsAdminChartToolTip.NotyetRecordToolTip);
                    s.Children.Add(ObjectHelper.CreateObject(new iLabel(), { Text: sb.ToString() }));
                    sStatus = SlotStatus.PLANNED;
                    sImagePath = MedImage.GetPath(MedImages.InfPlannedDeferredIcon);
                    if (String.Equals(this.oTagDrugHeaderDetail.INFTYCODE, InfusionTypeCode.INTERMITTENT, StringComparison.CurrentCultureIgnoreCase)) {
                        isReadOnly = true;
                    }
                    oOverViewSlot.StatusIcon = this.LoadImage(SlotStatus.NOTYETRECORDED, sImagePath, isReadOnly);
                    if (this.oChartTypeSelected == ChartType.Prescription_Chart && (String.Compare(sDoseType, DoseTypeCode.TITRATED, StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(sDoseType, DoseTypeCode.STEPPEDVARIABLE, StringComparison.CurrentCultureIgnoreCase) == 0) && MedChartData.Is7DayView) {
                        oOverViewSlot.Dose = sDose;
                    }
                    objtooltip = s;
                    break;
                case SlotStatus.DEFEROVERDUE:
                case SlotStatus.DEFERDUENOW:
                case SlotStatus.DEFERADMIN:
                    sb.Clear();
                    sb.Append(MedsAdminChartToolTip.DeferredAtToolTip + ": " + oSlotDetail.AdministrationDetail.RecordedAt.ToUserDateTimeString(CConstants.DateTimeFormat) + Environment.NewLine);
                    sb.Append(MedsAdminChartToolTip.DeferredByToolTip + ": " + oSlotDetail.AdministrationDetail.RecordedBy + Environment.NewLine);
                    if (!String.IsNullOrEmpty(sReason))
                        sb.Append(MedsAdminChartToolTip.ReasonToolTip + ": " + sReason);
                    if (!String.IsNullOrEmpty(sAdminComments)) {
                        s = Common.GetWrappedToolTipContent(sb.ToString(), sAdminComments);
                        oOverViewSlot.AdministrationIcon = Common.GetAdminCommentsIcon(MedsAdminChartToolTip.CommentsToolTip + ": " + sAdminComments);
                    }
                    else s.Children.Add(ObjectHelper.CreateObject(new iLabel(), { Text: sb.ToString() }));
                    sImagePath = MedImage.GetPath(MedImages.InfPlannedDeferredIcon);
                    sTooltip = String.Empty;
                    oOverViewSlot.StatusIcon = this.LoadImage(SlotStatus.PLANNED, sImagePath, isReadOnly);
                    objtooltip = s;
                    break;
                case SlotStatus.GIVEN:
                case SlotStatus.PATIENTSELFADMIN:
                case SlotStatus.SELFADMINISTERED:
                    sb.Clear();
                    let sTip: string = String.Empty;
                    if (this.oTagDrugHeaderDetail.IsPGD) {
                        sTip = MedsAdminChartToolTip.StatusToolTip + ": " + MedsAdminChartToolTip.PGDGiven;
                        sTip += (oTagSlotDetail.IsDuringHomeLeave) ? MedsAdminChartToolTip.DuringHomeLeaveTooltip : String.Empty;
                    }
                    else {
                        sTip = MedsAdminChartToolTip.StatusToolTip + ": " + MedsAdminChartToolTip.GivenToolTip;
                    }
                    sb.Append(sTip + Environment.NewLine);
                    let strDose: string = String.Empty;
                    if ((this.oChartTypeSelected == ChartType.Prescription_Chart && isPRN) || (this.oTagDrugHeaderDetail.IsPGD && oSlotDetail.AdministrationDetail.IsAdministeredOnInfusionChart) && oSlotDetail.AdministrationDetail != null && !String.IsNullOrEmpty(oSlotDetail.AdministrationDetail.Dose) && !String.IsNullOrEmpty(oSlotDetail.AdministrationDetail.DoseUOM)) {
                        strDose = oSlotDetail.AdministrationDetail.Dose + " " + oSlotDetail.AdministrationDetail.DoseUOM;
                        if (!IsPRNWithSchedule && !this.oTagDrugHeaderDetail.IsPGD) {
                            sb.Append(MedsAdminChartToolTip.LastDoseTootip + ": " + strDose + Environment.NewLine);
                        }
                        else {
                            sb.Append(MedsAdminChartToolTip.DoseTootip + ": " + strDose + Environment.NewLine);
                        }
                    }
                    if (this.oTagDrugHeaderDetail.IsPGD && oSlotDetail.AdministrationDetail.IsAdministeredOnInfusionChart && this.oTagDrugHeaderDetail != null && !String.IsNullOrEmpty(this.oTagDrugHeaderDetail.Rate) && !String.IsNullOrEmpty(this.oTagDrugHeaderDetail.RateNumeratorUOM) && !String.IsNullOrEmpty(this.oTagDrugHeaderDetail.RateDinominatorUOM)) {
                        sb.Append(MedsAdminChartToolTip.RateToolTip + ": " + this.oTagDrugHeaderDetail.Rate + " " + this.oTagDrugHeaderDetail.RateNumeratorUOM + "/" + this.oTagDrugHeaderDetail.RateDinominatorUOM + Environment.NewLine);
                    }
                    sb.Append(MedsAdminChartToolTip.DueAtTooltip + ": " + oTagSlotDetail.SlotDateTime.ToUserDateTimeString(CConstants.DateTimeFormat) + Environment.NewLine);
                    sb.Append(MedsAdminChartToolTip.AdministeredAtToolTip + ": " + oSlotDetail.AdministrationDetail.AdministeredDate.ToUserDateTimeString(CConstants.DateTimeFormat) + Environment.NewLine);
                    if (String.Equals(oSlotDetail.Status, SlotStatus.GIVEN, StringComparison.CurrentCultureIgnoreCase)) {
                        let sAdminBy: string = String.Empty;
                        let sRelationship: string = String.Empty;
                        if (oSlotDetail.AdministrationDetail.AdministeredByOID == 0) {
                            if (oSlotDetail.AdministrationDetail.AdminByPersonalCarerOID > 0) {
                                if (this.personalCarers != null && this.personalCarers.Count > 0) {
                                    let selectedPersonalCarer: CListItem = this.personalCarers.FirstOrDefault(x => x.Value == oSlotDetail.AdministrationDetail.AdminByPersonalCarerOID.ToString());
                                    if (selectedPersonalCarer != null) {
                                        sAdminBy = Resource.MedicationAdministrator.rdbparent_text + " - " + selectedPersonalCarer.DisplayText;
                                        let relationCode: string = selectedPersonalCarer.Tag == null ? String.Empty : selectedPersonalCarer.Tag.ToString();
                                        if (!String.IsNullOrEmpty(relationCode) && this.resolvedConceptCodes != null && this.resolvedConceptCodes.Count > 0) {
                                            relationCode = this.resolvedConceptCodes.Where(c => c.Value == relationCode).Select(r => r.DisplayText).FirstOrDefault().ToString();
                                            sRelationship = "\n" + MedsAdminChartToolTip.RelationshipToPatientToolTip + ": " + relationCode;
                                        }
                                    }
                                }
                            }
                            else sAdminBy = Resource.MedicationAdministrator.rdbparent_text;
                        }
                        else sAdminBy = oSlotDetail.AdministrationDetail.AdministeredBy;
                        if (!String.IsNullOrEmpty(sAdminBy))
                            sb.Append(MedsAdminChartToolTip.AdministeredByToolTip + ": " + sAdminBy + Environment.NewLine);
                        if (!String.IsNullOrEmpty(sRelationship))
                            sb.Append(MedsAdminChartToolTip.RelationshipToPatientToolTip + ": " + sRelationship + Environment.NewLine);
                    }
                    sb.Append(MedsAdminChartToolTip.RecordedAtToolTip + ": " + oSlotDetail.AdministrationDetail.RecordedAt.ToUserDateTimeString(CConstants.DateTimeFormat) + Environment.NewLine);
                    sb.Append(MedsAdminChartToolTip.RecordedByToolTip + ": " + oSlotDetail.AdministrationDetail.RecordedBy);
                    if (!String.IsNullOrEmpty(sAdminComments)) {
                        s = Common.GetWrappedToolTipContent(sb.ToString(), sAdminComments);
                        oOverViewSlot.AdministrationIcon = Common.GetAdminCommentsIcon(MedsAdminChartToolTip.CommentsToolTip + ": " + sAdminComments);
                    }
                    else s.Children.Add(ObjectHelper.CreateObject(new iLabel(), { Text: sb.ToString() }));
                    sTooltip = String.Empty;
                    oOverViewSlot.StatusIcon = this.LoadImage(MedicationAction.COMPLETE, MedImage.GetPath(MedImages.InfCompletedIcon), isReadOnly);
                    objtooltip = s;
                    if (this.oChartTypeSelected == ChartType.Prescription_Chart && oTagSlotDetail.IsPRN && (String.Equals(sSlotStatus, SlotStatus.GIVEN) || String.Equals(sSlotStatus, SlotStatus.SELFADMINISTERED))) {
                        this.SetDoseOverviewSlotIcon(oOverViewSlot, IsHistoryExists, sHistoryToolTip);
                        if (String.Equals(sSlotStatus, SlotStatus.GIVEN)) {
                            if (!String.IsNullOrEmpty(sReason) && oSlotDetail != null && oSlotDetail.AdministrationDetail != null && !String.IsNullOrEmpty(oSlotDetail.AdministrationDetail.DoseDiscReasonCode)) {
                                oOverViewSlot.StatusIcon = this.LoadImage(SlotStatus.GIVEN, MedImage.GetPath(MedImages.DoseDiscrepancy), isReadOnly);
                            }
                            else if (sAdminOnTimeMode == 'E') {
                                sTooltip = sTooltip + "\n" + String.Format(CConstants.EARLYADMINISTRATIONTEXT, Common.AdminDiffValue(oTagSlotDetail.SlotDateTime, oTagSlotDetail.AdministeredAt, 'E'));
                                oOverViewSlot.StatusIcon = this.LoadImage(SlotStatus.GIVEN, MedImage.GetPath(MedImages.EarlyAdminIcon), isReadOnly);
                            }
                            else if (sAdminOnTimeMode == 'L') {
                                sTooltip = sTooltip + "\n" + String.Format(CConstants.LATEADMINISTRATIONTEXT, Common.AdminDiffValue(oTagSlotDetail.SlotDateTime, oTagSlotDetail.AdministeredAt, 'L'));
                                oOverViewSlot.StatusIcon = this.LoadImage(SlotStatus.GIVEN, MedImage.GetPath(MedImages.LateAdminIcon), isReadOnly);
                            }
                            else {
                                oOverViewSlot.StatusIcon = this.LoadImage(SlotStatus.GIVEN, MedImage.GetPath(MedImages.AdministeredIcon), isReadOnly);
                            }
                        }
                        else if (String.Equals(sSlotStatus, SlotStatus.SELFADMINISTERED)) {
                            if (!String.IsNullOrEmpty(sReason) && oSlotDetail != null && oSlotDetail.AdministrationDetail != null && !String.IsNullOrEmpty(oSlotDetail.AdministrationDetail.DoseDiscReasonCode)) {
                                oOverViewSlot.StatusIcon = this.LoadImage(SlotStatus.SELFADMINISTERED, MedImage.GetPath(MedImages.DoseDiscrepancy), isReadOnly);
                            }
                            else if (sAdminOnTimeMode == 'E') {
                                sTooltip = sTooltip + "\n" + String.Format(CConstants.EARLYADMINISTRATIONTEXT, Common.AdminDiffValue(oTagSlotDetail.SlotDateTime, oTagSlotDetail.AdministeredAt, 'E'));
                                oOverViewSlot.StatusIcon =this.LoadImage(SlotStatus.SELFADMINISTERED, MedImage.GetPath(MedImages.SelfAdminEarlyIcon), isReadOnly);
                            }
                            else if (sAdminOnTimeMode == 'L') {
                                sTooltip = sTooltip + "\n" + String.Format(CConstants.LATEADMINISTRATIONTEXT, Common.AdminDiffValue(oTagSlotDetail.SlotDateTime, oTagSlotDetail.AdministeredAt, 'L'));
                                oOverViewSlot.StatusIcon = this.LoadImage(SlotStatus.SELFADMINISTERED, MedImage.GetPath(MedImages.SelfAdminLateIcon), isReadOnly);
                            }
                            else {
                                oOverViewSlot.StatusIcon = this.LoadImage(SlotStatus.SELFADMINISTERED, MedImage.GetPath(MedImages.SelfAdministeredIcon), isReadOnly);
                            }
                        }
                        this.AssignslotdetailsforPRN(oOverViewSlot, oTagSlotDetail, oSlotDetail);
                    }
                    break;
                case SlotStatus.NOTGIVEN:
                    sb.Clear();
                    if (oTagSlotDetail.IsDuringHomeLeave) {
                        sb.Append(MedsAdminChartToolTip.StatusToolTip + ": " + MedsAdminChartToolTip.NotGivenToolTip + MedsAdminChartToolTip.DuringHomeLeaveTooltip + Environment.NewLine);
                    }
                    else {
                        sb.Append(MedsAdminChartToolTip.StatusToolTip + ": " + MedsAdminChartToolTip.NotGivenToolTip + Environment.NewLine);
                    }
                    sImagePath = MedImage.GetPath(MedImages.InfNotGivenIcon);
                    sb.Append(MedsAdminChartToolTip.ReasonToolTip + ": " + sReason + Environment.NewLine);
                    sb.Append(MedsAdminChartToolTip.DueAtTooltip + ": " + oTagSlotDetail.SlotDateTime.ToUserDateTimeString(CConstants.DateTimeFormat) + Environment.NewLine);
                    sb.Append(MedsAdminChartToolTip.RecordedAtToolTip + ": " + oSlotDetail.AdministrationDetail.RecordedAt.ToUserDateTimeString(CConstants.DateTimeFormat) + Environment.NewLine);
                    sb.Append(MedsAdminChartToolTip.RecordedByToolTip + ": " + oSlotDetail.AdministrationDetail.RecordedBy);
                    if (!String.IsNullOrEmpty(sAdminComments)) {
                        s = Common.GetWrappedToolTipContent(sb.ToString(), sAdminComments);
                        oOverViewSlot.AdministrationIcon = Common.GetAdminCommentsIcon(MedsAdminChartToolTip.CommentsToolTip + ": " + sAdminComments);
                    }
                    else s.Children.Add(ObjectHelper.CreateObject(new iLabel(), { Text: sb.ToString() }));
                    sTooltip = String.Empty;
                    objtooltip = s;
                    oOverViewSlot.StatusIcon = this.LoadImage(SlotStatus.NOTGIVEN, sImagePath, isReadOnly);
                    if (this.oChartTypeSelected == ChartType.Prescription_Chart && oTagSlotDetail.IsPRN) {
                        sImagePath = MedImage.GetPath(MedImages.NotGivenSlotIcon);
                        oOverViewSlot.StatusIcon = this.LoadImage(SlotStatus.NOTGIVEN, sImagePath, isReadOnly);
                        this.SetDoseOverviewSlotIcon(oOverViewSlot, IsHistoryExists, sHistoryToolTip);
                    }
                    break;
                case SlotStatus.NOTKNOWN:
                    sb.Clear();
                    sb.Append(MedsAdminChartToolTip.StatusToolTip + ": " + MedsAdminChartToolTip.NotKnownToolTip + Environment.NewLine);
                    sImagePath = MedImage.GetPath(MedImages.InfNotKnownIcon);
                    sb.Append(MedsAdminChartToolTip.DueAtTooltip + ": " + oTagSlotDetail.SlotDateTime.ToUserDateTimeString(CConstants.DateTimeFormat) + Environment.NewLine);
                    sb.Append(MedsAdminChartToolTip.RecordedAtToolTip + ": " + oSlotDetail.AdministrationDetail.RecordedAt.ToUserDateTimeString(CConstants.DateTimeFormat) + Environment.NewLine);
                    sb.Append(MedsAdminChartToolTip.RecordedByToolTip + ": " + oSlotDetail.AdministrationDetail.RecordedBy);
                    if (!String.IsNullOrEmpty(sAdminComments)) {
                        s = Common.GetWrappedToolTipContent(sb.ToString(), sAdminComments);
                        oOverViewSlot.AdministrationIcon = Common.GetAdminCommentsIcon(MedsAdminChartToolTip.CommentsToolTip + ": " + sAdminComments);
                    }
                    else s.Children.Add(ObjectHelper.CreateObject(new iLabel(), { Text: sb.ToString() }));
                    sTooltip = String.Empty;
                    objtooltip = s;
                    oOverViewSlot.StatusIcon = this.LoadImage(SlotStatus.NOTKNOWN, sImagePath, isReadOnly);
                    break;
                case SlotStatus.OMITTED:
                    sb.Clear();
                    sb.Append(MedsAdminChartToolTip.OmittedStatusToolTip + Environment.NewLine);
                    if (oSlotDetail.AdministrationDetail != null && !String.IsNullOrEmpty(oSlotDetail.AdministrationDetail.RecordedBy)) {
                        s.Children.Add(ObjectHelper.CreateObject(new iLabel(), { Text: oSlotDetail.AdministrationDetail.RecordedBy }));
                    }
                    sb.Append(MedsAdminChartToolTip.ReasonToolTip + ": " + sReason + Environment.NewLine);
                    if (isReadOnly)
                        sTooltip = String.Empty;
                    isReadOnly = true;
                    sImagePath = MedImage.GetPath(MedImages.InfOmittedIcon);
                    oOverViewSlot.StatusIcon = this.LoadImage(SlotStatus.OMITTED, sImagePath, isReadOnly);
                    oOverViewSlot.BackGroundColor = new SolidColorBrush(MedChartData.OmittedSlotsColor);
                    if (MedChartData.Is7DayView) {
                        oOverViewSlot.Dose = SlotStatusText.OMITTED;
                    }
                    if (!String.IsNullOrEmpty(sAdminComments) && (String.Compare(sSlotStatus, SlotStatus.OMITTED, StringComparison.CurrentCultureIgnoreCase) != 0)) {
                        s = Common.GetWrappedToolTipContent(sb.ToString(), sAdminComments);
                        oOverViewSlot.AdministrationIcon = Common.GetAdminCommentsIcon(MedsAdminChartToolTip.CommentsToolTip + ": " + sAdminComments);
                    }
                    else s.Children.Add(ObjectHelper.CreateObject(new iLabel(), { Text: sb.ToString() }));
                    objtooltip = s;
                    break;
                case SlotStatus.HOMELEAVE:
                    if (DateTime.LessThanOrEqualTo(oTagSlotDetail.SlotDateTime , CommonBB.GetServerDateTime().DateTime.AddDays(-2))) {
                        isReadOnly = false;
                    }
                    else {
                        isReadOnly = true;
                    }
                    oOverViewSlot.StatusIcon = this.LoadImage("HomeLeaveIcon", MedImage.GetPath(MedImages.HomeLeaveIcon), isReadOnly);
                    s.Children.Add(ObjectHelper.CreateObject(new TextBlock(), { Text: MedsAdminChartToolTip.HomeLeaveToolTip }));
                    objtooltip = s;
                    break;
            }
            oOverViewSlot.SlotHeight = this.MaxRowDoseHeightValue > 0 ? this.MinSlotHeight + this.MaxRowDoseHeightValue : this.CalculateSlotHeight(this.nMaxSlotCount);
            if (oOverViewSlot.StatusIcon != null) {
                if (!String.IsNullOrEmpty(sTooltip))
                    oOverViewSlot.StatusIcon.Tooltip = sTooltip;
                else oOverViewSlot.StatusIcon.Tooltip = objtooltip;
            }
            oOverViewSlot.Tag = oTagSlotDetail;
            if (this.IsGreyedOut)
                oOverViewSlot.BackGroundColor = Common.SetSlotColor(String.Empty, this.IsGreyedOut);
            else if (this.IsCompleted)
                oOverViewSlot.BackGroundColor = new SolidColorBrush(Color.FromArgb(255, 185, 251, 114));
            return oOverViewSlot;
        }
        public LoadImage(key: string, Uri: string, isReadOnly?: boolean): ChartIcon {
            if(isReadOnly == null || isReadOnly == undefined){
                return this.LoadImage2(key, Uri);
            }else{
                return this.LoadImage3(key, Uri, isReadOnly);
            }
        }
        //TODO overload this LoadImage method
        public LoadImage2(key: string, Uri: string): ChartIcon {
            let oChartIcon: ChartIcon = new ChartIcon();
            oChartIcon.Key = key;
            oChartIcon.UriString = Uri;
            return oChartIcon;
        }
        public LoadImage3(key: string, Uri: string, isReadOnly: boolean): ChartIcon {
            let oChartIcon: ChartIcon = new ChartIcon();
            oChartIcon.Key = key;
            oChartIcon.UriString = Uri;
            if (isReadOnly)
                oChartIcon.EnableOnHotSpotClick = false;
            return oChartIcon;
        }
        public ParacetamolAdminCount: number;
        /*
        This clone method is commented since we are going to use
        public static CloneObjects(origin: Object, destination: Object): void {
            //let str = JSON.stringify(origin);
            //destination = JSON.parse(str);  -- this could be also used if the circular references arent there
            if (origin == null || destination == null)
                return
                //TODO need to ask Siva R and see if they have a solution origin.GetType()
            if ((String.Compare(origin.GetType().Name, destination.GetType().Name) == 0 && origin.GetType() == destination.GetType()) && origin instanceof IEnumerable && destination instanceof IEnumerable) {
                if (origin.GetType().GetInterface("IList", false) != null && destination.GetType().GetInterface("IList", false) != null) {
                    let listObject: IList = <IList>destination;
                    if (listObject != null) {
                        <IList>origin.forEach( (item)=> {
                            let o: Object = Activator.CreateInstance(listObject.GetType().GetGenericArguments()[0]);
                            GetMedsChartData.CloneObjects(item, o);
                            listObject.Add(o);
                        });
                    }
                }
            }
            else {
                Object.keys(destination).forEach((_destinationProperty)=> {
                    let destinationProperty = destination[_destinationProperty]
                    //TODO changed by Munavar
                //destination.GetType().GetProperties().forEach( (destinationProperty)=> {
                    if (origin != null && destinationProperty.CanWrite) {
                        Object.keys(origin).forEach( (_originProperty)=> {
                            let originProperty = origin[_originProperty]
                        //origin.GetType().GetProperties().forEach( (originProperty)=> {
                            if (destinationProperty.CanWrite && originProperty.CanRead && (String.Compare(originProperty.Name, destinationProperty.Name) == 0 && originProperty.PropertyType == destinationProperty.PropertyType)) {
                                destinationProperty.SetValue(destination, originProperty.GetValue(origin, null), null);
                            }
                            else if (destinationProperty.CanWrite && originProperty.CanRead && (String.Compare(originProperty.Name, destinationProperty.Name) == 0 && originProperty.PropertyType != destinationProperty.PropertyType)) {
                                let oriTemp: Object = originProperty.GetValue(origin, null);
                                let desTemp: Object = destinationProperty.GetValue(destination, null);
                                if (oriTemp == null)
                                    continue;
                                else if (desTemp == null && oriTemp instanceof IEnumerable) {
                                    if (destinationProperty.PropertyType.GetElementType() != null) {
                                        let arr: Array<any> = [];
                                        ObjectHelper.
                                       // let arr: Array<any> = Array<any>.CreateInstance(destinationProperty.PropertyType.GetElementType(), //TODO ask Siva R Array<any>
                                            //<number>oriTemp.GetType().GetProperty("Count").GetValue(oriTemp, null));
                                        let i: number = 0;
                                        let len_forloop = ObjectHelper.CreateType<IEnumerable>(oriTemp, IEnumerable).Count;
                                        (ObjectHelper.CreateType<IEnumerable>(oriTemp, IEnumerable)).forEach( (o)=> {
                                            let newDes: Object = Activator.CreateInstance(destinationProperty.PropertyType.GetElementType());// TODO infor Siva R platform
                                            GetMedsChartData.CloneObjects(o, newDes);
                                            //arr.SetValue(newDes, i);
                                            arr.push(newDes);
                                            i++;
                                        });
                                        destinationProperty.SetValue(destination, arr, null);
                                        continue;
                                    }
                                }
                                else if (desTemp == null) {
                                    destinationProperty.SetValue(destination, Activator.CreateInstance(destinationProperty.PropertyType), null);
                                    GetMedsChartData.CloneObjects(originProperty.GetValue(origin, null), destinationProperty.GetValue(destination, null));
                                }
                                else if (desTemp.GetType().IsArray && oriTemp instanceof IEnumerable) {
                                    let arr: Array<any> = Array<any>.CreateInstance(destinationProperty.PropertyType.GetElementType(),
                                        <number>oriTemp.GetType().GetProperty("Count").GetValue(oriTemp, null));
                                    let i: number = 0;
                                    let len_forloop = ObjectHelper.CreateType<IEnumerable>(oriTemp, IEnumerable).Count;
                                    (ObjectHelper.CreateType<IEnumerable>(oriTemp, IEnumerable)).forEach( (o)=> {
                                        let newDes: Object = Activator.CreateInstance(destinationProperty.PropertyType.GetElementType());
                                        GetMedsChartData.CloneObjects(o, newDes);
                                        arr.SetValue(newDes, i);
                                        i++;
                                    });
                                    destinationProperty.SetValue(destination, arr, null);
                                    continue;
                                }
                            }
                        });
                    }
                });
            }
        } */
        public static UpdateOverviewIcon(PreviousStatus: string, CurrentStatus: string, PrescriptionItemOID: number, oUserControl: UserControl): void {
            let _IsPreviousStatusNotKnown: boolean = String.Equals(PreviousStatus, "CC_NOTKNOWN", StringComparison.InvariantCultureIgnoreCase);
            let _IsCurrentStatusNotKnown: boolean = String.Equals(CurrentStatus, "CC_NOTKNOWN", StringComparison.InvariantCultureIgnoreCase);
            if (_IsPreviousStatusNotKnown != _IsCurrentStatusNotKnown && (_IsPreviousStatusNotKnown || _IsCurrentStatusNotKnown) && MedChartData.ListOfEventsWithNotKnownStatus != null) {
                let ev: EventsWithNotKnownStatus = MedChartData.ListOfEventsWithNotKnownStatus.Where(x => x.PrescriptionItemOID == PrescriptionItemOID).FirstOrDefault();
                if (ev != null) {
                    if (_IsCurrentStatusNotKnown) {
                        ev.STCode++;
                    }
                    else {
                        if (ev.STCode > 0) {
                            ev.STCode--;
                        }
                    }
                    let oMedsAdminMainView: MedsAdminMainView = GetMedsChartData.GetMedAdminMainViewTab(oUserControl);
                    if (oMedsAdminMainView != null) {
                        oMedsAdminMainView.DrawAlertIconNextToOverviewTab();
                    }
                }
            }
        }
        public static GetMedAdminMainViewTab(oUserControl: UserControl): MedsAdminMainView { // TODO link to xaml page to be done by our team only
            let oMedsAdminMainView: MedsAdminMainView = null;
            if (oUserControl != null && oUserControl.Parent != null) {
                let oiTabItem: iTabItem = ObjectHelper.CreateType<iTabItem>(oUserControl.Parent, iTabItem);
                if (oiTabItem != null && oiTabItem.Parent != null) {
                   // let oiTab: iTab = ObjectHelper.CreateType<iTab>(oiTabItem.Parent, iTab);
                 let  oiTab = ObjectHelper.CreateType<iTab>(ObjectHelper.CreateType<iTabItem>(oiTabItem, iTabItem).Parent, iTab );
                    if (oiTab != null && oiTab.Parent != null) {
                        oMedsAdminMainView =ObjectHelper.CreateType<MedsAdminMainView>(oiTab.Parent, MedsAdminMainView);  ;
                        /*let oGrid: Grid = ObjectHelper.CreateType<Grid>(oiTab.Parent, Grid);
                        if (oGrid != null && oGrid.Parent != null) {
                            oMedsAdminMainView = ObjectHelper.CreateType<MedsAdminMainView>(oGrid.Parent, MedsAdminMainView);
                        }*/
                    }
                }
            }
            return oMedsAdminMainView;
        }
    }
