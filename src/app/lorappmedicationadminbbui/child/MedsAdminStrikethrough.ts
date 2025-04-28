import { AfterViewInit, Component, EventEmitter, Input, OnInit, ViewChild } from '@angular/core';
import { StringBuilder, ProfileFactoryType, ContextManager, Convert, AppActivity, Regex } from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp, Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison, AppDialogEventargs, AppDialogResult, DelegateArgs, DialogComponentArgs, WindowButtonType, iAppDialogWindow, Visibility, CListItem, ObservableCollection, HtmlPage } from 'epma-platform/models';
import { AppDialog, Border, Cursors, Grid, MouseButtonEventArgs, TextBlock, iCheckBox, iComboBox, iLabel } from 'epma-platform/controls';
import { HelperService } from 'epma-platform/soapclient';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
import { AdministrationDetailVM, SlotDetailVM } from '../viewmodel/MedicationChartVM';
import { DrugItem } from 'src/app/lorarcbluebirdmedicationchart/common/DrugItem';
import { CommonBB } from 'src/app/lorappcommonbb/utilities/common';
import { StackPanel } from 'src/app/shared/epma-platform/controls-model/StackPanel';
import { ChartContext, MedChartData, TagDrugHeaderDetail } from '../utilities/globalvariable';
import { CConstants, DoseTypeCode, MedicationAction, SlotStatus, SlotStatusText, ValueDomain } from '../utilities/CConstants';
import { Busyindicator } from 'src/app/lorappcommonbb/busyindicator';
import { MedsAdminChartToolTip } from '../resource/medsadmincharttooltip.designer';
import { MedicationCommonBB } from 'src/app/lorappmedicationcommonbb/utilities/medicationcommonbb';
import { ProfileData } from '../utilities/ProfileData';
import { Strikethrough } from '../resource/strikethrough.designer';
import { AppContextInfo, ContextInfo, PatientContext } from 'src/app/lorappcommonbb/utilities/globalvariable';
import { InfusionTypeCode } from 'src/app/lorappmedicationcommonbb/utilities/constants';
import { Common } from '../utilities/common';
import * as IPPMAManagePrescSer from '../../shared/epma-platform/soap-client/IPPMAManagePrescriptionWS';
import { Resource } from '../resource';
import { CReqMsgGetRecordAdministionDetails, CReqMsgStrikethroughAdmin, CResMsgGetRecordAdministionDetails, CResMsgStrikethroughAdmin, CStrikethroughAdmin, GetRecordAdministionDetailsCompletedEventArgs, MedicationAdministrationWSSoapClient, StrikethroughAdminCompletedEventArgs } from 'src/app/shared/epma-platform/soap-client/MedicationAdministrationWS';
import { DrugHeader } from '../common/drugheader';
import { RoutedEventArgs } from 'src/app/shared/epma-platform/controls/FrameworkElement';
import * as ControlStyles from "src/app/shared/epma-platform/controls/ControlStyles";

@Component({
    selector: 'MedsAdminStrikethrough',
    templateUrl: './MedsAdminStrikethrough.html',
    styleUrls: ['./MedsAdminStrikethrough.css']

})

export class MedsAdminStrikethrough extends iAppDialogWindow implements AfterViewInit {
    //public delegate void IsSlotUpdatedDelegate();
    public Strikethrough = Resource.Strikethrough;
    public IsSlotUpdatedEvent: Function;
    public oSlotDetailVM: SlotDetailVM;
    public objSlotVM: SlotDetailVM;
    public oSlotVM: SlotDetailVM;
    oDrugDetails: DrugItem;
    lnPresItemScheduleOID: number = 0;
    lnMedAdminOID: number = 0;
    sSlotStatus: string = String.Empty;
    dtRecordedAt: DateTime = DateTime.MinValue;
    sRecordedBy: string = String.Empty;
    lnPresceiptionItemOID: number = 0;
    IsPGDItem: boolean = false;
    strDoseUOM: string = String.Empty;
    strDose: string = String.Empty;
    static sPatinet: string = "Patient";
    dtCurrentTime: DateTime = CommonBB.GetServerDateTime();
    IsUpdatePIStatusToCompleted: boolean = false;
    IsLastSlotCheckRequired: boolean = false;
    public IsReloadChartReq: boolean = false;
    public PrescriptionItemStatus: string = String.Empty;
    cbIsBolus: boolean=false;
    public IsSlotInPastDateAndStatusUnknown: boolean = false;
    IsDST: boolean;
    IsAmbiguous: boolean;
    IsInvalid: boolean;
    public Styles = ControlStyles;
    private LayoutRoot: StackPanel;
    lblCIFValue_MouseLeftButtonUp_Func:Function;
    isBorderOverdueEnabled: boolean = false;
    

    @ViewChild("LayoutRootTempRef", { read: StackPanel, static: false }) set _LayoutRoot(c: StackPanel) {
        if (c) { this.LayoutRoot = c; }
    };
    public drgHeader: DrugHeader;
    @ViewChild("drgHeaderTempRef", { read: DrugHeader, static: false }) set _drgHeader(c: DrugHeader) {
        if (c) { this.drgHeader = c; }
    };
    private brdSTA: Border;
    @ViewChild("brdSTATempRef", { read: Border, static: false }) set _brdSTA(c: Border) {
        if (c) { this.brdSTA = c; }
    };
    private lblBorder: TextBlock;
    @ViewChild("lblBorderTempRef", { read: TextBlock, static: false }) set _lblBorder(c: TextBlock) {
        if (c) { this.lblBorder = c; }
    };
    private spGiven1: Grid;
    @ViewChild("spGiven1TempRef", { read: Grid, static: false }) set _spGiven1(c: Grid) {
        if (c) { this.spGiven1 = c; }
    };
    private lblMedAction: iLabel;
    @ViewChild("lblMedActionTempRef", { read: iLabel, static: false }) set _lblMedAction(c: iLabel) {
        if (c) { this.lblMedAction = c; }
    };
    private lblDose: iLabel;
    @ViewChild("lblDoseTempRef", { read: iLabel, static: false }) set _lblDose(c: iLabel) {
        if (c) { this.lblDose = c; }
    };
    private lblRoute: iLabel;
    @ViewChild("lblRouteTempRef", { read: iLabel, static: false }) set _lblRoute(c: iLabel) {
        if (c) { this.lblRoute = c; }
    };
    private lblSite: iLabel;
    @ViewChild("lblSiteTempRef", { read: iLabel, static: false }) set _lblSite(c: iLabel) {
        if (c) { this.lblSite = c; }
    };
    private lblDtTime: iLabel;
    @ViewChild("lblDtTimeTempRef", { read: iLabel, static: false }) set _lblDtTime(c: iLabel) {
        if (c) { this.lblDtTime = c; }
    };
    private lblAdminBy: iLabel;
    @ViewChild("lblAdminByTempRef", { read: iLabel, static: false }) set _lblAdminBy(c: iLabel) {
        if (c) { this.lblAdminBy = c; }
    };
    private lblComments: iLabel;
    @ViewChild("lblCommentsTempRef", { read: iLabel, static: false }) set _lblComments(c: iLabel) {
        if (c) { this.lblComments = c; }
    };
    private lblRecBy: iLabel;
    @ViewChild("lblRecByTempRef", { read: iLabel, static: false }) set _lblRecBy(c: iLabel) {
        if (c) { this.lblRecBy = c; }
    };
    private lblRec2At: iLabel;
    @ViewChild("lblRec2AtTempRef", { read: iLabel, static: false }) set _lblRec2At(c: iLabel) {
        if (c) { this.lblRec2At = c; }
    };
    private lblMedActionValue: iLabel;
    @ViewChild("lblMedActionValueTempRef", { read: iLabel, static: false }) set _lblMedActionValue(c: iLabel) {
        if (c) { this.lblMedActionValue = c; }
    };
    private lblDoseValue: iLabel;
    @ViewChild("lblDoseValueTempRef", { read: iLabel, static: false }) set _lblDoseValue(c: iLabel) {
        if (c) { this.lblDoseValue = c; }
    };
    private lblRouteValue: iLabel;
    @ViewChild("lblRouteValueTempRef", { read: iLabel, static: false }) set _lblRouteValue(c: iLabel) {
        if (c) { this.lblRouteValue = c; }
    };
    private lblSiteValue: iLabel;
    @ViewChild("lblSiteValueTempRef", { read: iLabel, static: false }) set _lblSiteValue(c: iLabel) {
        if (c) { this.lblSiteValue = c; }
    };
    private lblDateValue: iLabel;
    @ViewChild("lblDateValueTempRef", { read: iLabel, static: false }) set _lblDateValue(c: iLabel) {
        if (c) { this.lblDateValue = c; }
    };
    private lblAdminByValue: iLabel;
    @ViewChild("lblAdminByValueTempRef", { read: iLabel, static: false }) set _lblAdminByValue(c: iLabel) {
        if (c) { this.lblAdminByValue = c; }
    };
    private lblCommentsValue: iLabel;
    @ViewChild("lblCommentsValueTempRef", { read: iLabel, static: false }) set _lblCommentsValue(c: iLabel) {
        if (c) { this.lblCommentsValue = c; }
    };
    private lblRecByValue: iLabel;
    @ViewChild("lblRecByValueTempRef", { read: iLabel, static: false }) set _lblRecByValue(c: iLabel) {
        if (c) { this.lblRecByValue = c; }
    };
    private lblRec2AtValue: iLabel;
    @ViewChild("lblRec2AtValueTempRef", { read: iLabel, static: false }) set _lblRec2AtValue(c: iLabel) {
        if (c) { this.lblRec2AtValue = c; }
    };
    private spNotGiven1: Grid;
    @ViewChild("spNotGiven1TempRef", { read: Grid, static: false }) set _spNotGiven1(c: Grid) {
        if (c) { this.spNotGiven1 = c; }
    };
    private lblMedAction1: iLabel;
    @ViewChild("lblMedAction1TempRef", { read: iLabel, static: false }) set _lblMedAction1(c: iLabel) {
        if (c) { this.lblMedAction1 = c; }
    };
    private lblReasonNotGiven: iLabel;
    @ViewChild("lblReasonNotGivenTempRef", { read: iLabel, static: false }) set _lblReasonNotGiven(c: iLabel) {
        if (c) { this.lblReasonNotGiven = c; }
    };
    private lblComments1: iLabel;
    @ViewChild("lblComments1TempRef", { read: iLabel, static: false }) set _lblComments1(c: iLabel) {
        if (c) { this.lblComments1 = c; }
    };
    private lblRecBy1: iLabel;
    @ViewChild("lblRecBy1TempRef", { read: iLabel, static: false }) set _lblRecBy1(c: iLabel) {
        if (c) { this.lblRecBy1 = c; }
    };
    private lblRec2At1: iLabel;
    @ViewChild("lblRec2At1TempRef", { read: iLabel, static: false }) set _lblRec2At1(c: iLabel) {
        if (c) { this.lblRec2At1 = c; }
    };
    private spNotGiven2: Grid;
    @ViewChild("spNotGiven2TempRef", { read: Grid, static: false }) set _spNotGiven2(c: Grid) {
        if (c) { this.spNotGiven2 = c; }
    };
    private lblMedActionValue1: iLabel;
    @ViewChild("lblMedActionValue1TempRef", { read: iLabel, static: false }) set _lblMedActionValue1(c: iLabel) {
        if (c) { this.lblMedActionValue1 = c; }
    };
    private lblReasonNotGivenValue: iLabel;
    @ViewChild("lblReasonNotGivenValueTempRef", { read: iLabel, static: false }) set _lblReasonNotGivenValue(c: iLabel) {
        if (c) { this.lblReasonNotGivenValue = c; }
    };
    private lblCommentsValue1: iLabel;
    @ViewChild("lblCommentsValue1TempRef", { read: iLabel, static: false }) set _lblCommentsValue1(c: iLabel) {
        if (c) { this.lblCommentsValue1 = c; }
    };
    private lblRecByValue1: iLabel;
    @ViewChild("lblRecByValue1TempRef", { read: iLabel, static: false }) set _lblRecByValue1(c: iLabel) {
        if (c) { this.lblRecByValue1 = c; }
    };
    private lblRec2AtValue1: iLabel;
    @ViewChild("lblRec2AtValue1TempRef", { read: iLabel, static: false }) set _lblRec2AtValue1(c: iLabel) {
        if (c) { this.lblRec2AtValue1 = c; }
    };
    private spNotKnown1: Grid;
    @ViewChild("spNotKnown1TempRef", { read: Grid, static: false }) set _spNotKnown1(c: Grid) {
        if (c) { this.spNotKnown1 = c; }
    };
    private lblMedAction2: iLabel;
    @ViewChild("lblMedAction2TempRef", { read: iLabel, static: false }) set _lblMedAction2(c: iLabel) {
        if (c) { this.lblMedAction2 = c; }
    };
    private lblComments2: iLabel;
    @ViewChild("lblComments2TempRef", { read: iLabel, static: false }) set _lblComments2(c: iLabel) {
        if (c) { this.lblComments2 = c; }
    };
    private lblRecBy2: iLabel;
    @ViewChild("lblRecBy2TempRef", { read: iLabel, static: false }) set _lblRecBy2(c: iLabel) {
        if (c) { this.lblRecBy2 = c; }
    };
    private lblRec2At2: iLabel;
    @ViewChild("lblRec2At2TempRef", { read: iLabel, static: false }) set _lblRec2At2(c: iLabel) {
        if (c) { this.lblRec2At2 = c; }
    };
    private spNotKnown2: Grid;
    @ViewChild("spNotKnown2TempRef", { read: Grid, static: false }) set _spNotKnown2(c: Grid) {
        if (c) { this.spNotKnown2 = c; }
    };
    private lblMedActionValue2: iLabel;
    @ViewChild("lblMedActionValue2TempRef", { read: iLabel, static: false }) set _lblMedActionValue2(c: iLabel) {
        if (c) { this.lblMedActionValue2 = c; }
    };
    private lblCommentsValue2: iLabel;
    @ViewChild("lblCommentsValue2TempRef", { read: iLabel, static: false }) set _lblCommentsValue2(c: iLabel) {
        if (c) { this.lblCommentsValue2 = c; }
    };
    private lblRecByValue2: iLabel;
    @ViewChild("lblRecByValue2TempRef", { read: iLabel, static: false }) set _lblRecByValue2(c: iLabel) {
        if (c) { this.lblRecByValue2 = c; }
    };
    private lblRec2AtValue2: iLabel;
    @ViewChild("lblRec2AtValue2TempRef", { read: iLabel, static: false }) set _lblRec2AtValue2(c: iLabel) {
        if (c) { this.lblRec2AtValue2 = c; }
    };
    private lblCIF: iLabel;
    @ViewChild("lblCIFTempRef", { read: iLabel, static: false }) set _lblCIF(c: iLabel) {
        if (c) { this.lblCIF = c; }
    };
    private lblReason: iLabel;
    @ViewChild("lblReasonTempRef", { read: iLabel, static: false }) set _lblReason(c: iLabel) {
        if (c) { this.lblReason = c; }
    };
    lblCIFValue: iLabel;
    @ViewChild("lblCIFValueTempRef", { read: iLabel, static: false }) set _lblCIFValue(c: iLabel) {
        if (c) { this.lblCIFValue = c; }
    };
    private cboStrikethroughReason = new iComboBox();
    @ViewChild("cboStrikethroughReasonTempRef", { read: iComboBox, static: false }) set _cboStrikethroughReason(c: iComboBox) {
        if (c) { this.cboStrikethroughReason = c; }
    };
    public brdOverdue: Border;
    @ViewChild("brdOverdueTempRef", { read: Border, static: false }) set _brdOverdue(c: Border) {
        if (c) { this.brdOverdue = c; }
    };
    public  tbFooter: TextBlock;
    @ViewChild("tbFooterTempRef", { read: TextBlock, static: false }) set _tbFooter(c: TextBlock) {
        if (c) { this.tbFooter = c; }
    };
    public chkOverdue: iCheckBox = new iCheckBox();
    @ViewChild("chkOverdueTempRef", { read: iCheckBox, static: false }) set _chkOverdue(c: iCheckBox) {
        if (c) { this.chkOverdue = c; }
    };
    constructor() {
        super();
        this.oSlotDetailVM = new SlotDetailVM();
        this.oSlotDetailVM.AdministrationDetail = new AdministrationDetailVM();

    }
    constructorImpl(oSlotVM: SlotDetailVM, IsPGD: boolean) {
        this.objSlotVM = oSlotVM;
        this.oDrugDetails = oSlotVM.DrugDetail;
        this.lnPresceiptionItemOID = oSlotVM.PrescriptionItemOID;
        this.lnPresItemScheduleOID = oSlotVM.PresScheduleOID;
        this.IsUpdatePIStatusToCompleted = oSlotVM.IsUpdatePIStatusToCompleted;
        this.IsLastSlotCheckRequired = oSlotVM.IsLastSlotCheckRequired;
        if (oSlotVM.AdministrationDetail != null)
            this.lnMedAdminOID = oSlotVM.AdministrationDetail.MedAdminOID;
        this.sSlotStatus = oSlotVM.Status;
        this.strDoseUOM = oSlotVM.DoseUOM;
        this.strDose = oSlotVM.Dose;
        this.dtRecordedAt = oSlotVM.AdministrationDetail.RecordedAt;
        this.sRecordedBy = oSlotVM.AdministrationDetail.RecordedBy;
        this.IsPGDItem = IsPGD;
        //this.Loaded  = (s,e) => { this.MedsAdminStrikethrough_Loaded(s,e); } ;
        let IsPRNwithSchedule: boolean = false;
        if (oSlotVM != null && oSlotVM.DrugDetail != null && oSlotVM.DrugDetail.Tag != null) {
            let oTagdrugHeaderDetails: TagDrugHeaderDetail = ObjectHelper.CreateType<TagDrugHeaderDetail>(oSlotVM.DrugDetail.Tag, TagDrugHeaderDetail);
            IsPRNwithSchedule = (oTagdrugHeaderDetails != null) ? oTagdrugHeaderDetails.IsPRNWithSchedule : false;
        }
        if ((!IsPRNwithSchedule && !oSlotVM.IsLastPRN && String.Compare(oSlotVM.Status, SlotStatus.NOTKNOWN) != 0 && oSlotVM.ScheduledDTTM != DateTime.MinValue && this.dtCurrentTime >= oSlotVM.ScheduledDTTM.AddMinutes(oSlotVM.SlotsTimeIntervalAvg) && this.dtCurrentTime <= oSlotVM.ScheduledDTTM.DateTime.AddHours(CConstants.OverdueToNotknownTime)) && !IsPGD) {
            this.isBorderOverdueEnabled = true;

            //this.brdOverdue.Opacity = 1;
        }
        else {
            //this.brdOverdue.Opacity = 0;
            this.isBorderOverdueEnabled = false;
            this.chkOverdue.IsEnabled = false;
        }
        if (oSlotVM.IsInfusionItem)
            this.cbIsBolus = true;

        //this.HideDivElement("Overdue");
    }
    public Maxscroll = (window.devicePixelRatio ==1)? false : true;
    public MaximumHeight ; 
    ngAfterViewInit(): void {
        if(window.screen.height < 1000 && window.devicePixelRatio != 1.25){
            this.MaximumHeight = 360;
        }else{
            this.MaximumHeight = (window.devicePixelRatio ==1)? 660 : (660/window.devicePixelRatio)-63;}
        
        this.MedsAdminStrikethrough_Loaded(null, null);
        if (this.isBorderOverdueEnabled) {
            this.ShowDivElement("Overdue");
            this.brdOverdue.Visibility = Visibility.Visible;
        }

        else {
            this.HideDivElement("Overdue");
            this.brdOverdue.Visibility = Visibility.Collapsed;

        }
        this.lblCIFValue_MouseLeftButtonUp_Func = (s, e) => { this.lblCIFValue_MouseLeftButtonUp(s, e) };

        this.HideDivElement("spGiven1");
        this.HideDivElement("spNotGiven1");
        this.HideDivElement("spNotKnown1");
        
    }
       
    ShowDivElement(divName: string) {
        let div = <HTMLElement>document.getElementById(divName);
        div.style.display = 'block';
    }
    HideDivElement(divName: string) {
        let div = <HTMLElement>document.getElementById(divName);
        div.style.display = 'none';
    }
    showdivitems(MedicationAction: string) {
        if (String.Equals(MedicationAction, SlotStatus.GIVEN, StringComparison.CurrentCultureIgnoreCase) ||
            (String.Equals(MedicationAction, SlotStatus.SELFADMINISTERED, StringComparison.CurrentCultureIgnoreCase)) ||
            (String.Equals(MedicationAction, SlotStatus.PATIENTSELFADMIN, StringComparison.CurrentCultureIgnoreCase))) {
            this.ShowDivElement("spGiven1");
            // this.HideDivElement("spNotGiven1");
            // this.HideDivElement("spNotKnown1");
        }

        else if ((String.Equals(MedicationAction, SlotStatus.NOTGIVEN, StringComparison.CurrentCultureIgnoreCase))
            || (String.Equals(MedicationAction, SlotStatus.DEFERADMIN, StringComparison.CurrentCultureIgnoreCase))) 
            {
            this.ShowDivElement("spNotGiven1");
            // this.HideDivElement("spGiven1");
            // this.HideDivElement("spNotKnown1");
        }
        else if (String.Equals(MedicationAction, SlotStatus.NOTKNOWN, StringComparison.CurrentCultureIgnoreCase)) {
            this.ShowDivElement("spNotKnown1");
            // this.HideDivElement("spNotGiven1");
            // this.HideDivElement("spGiven1");
        }
    }

    MedsAdminStrikethrough_Loaded(sender: Object, e: RoutedEventArgs): void {
        this.GetStrikethruData(this.oSlotDetailVM);
        Busyindicator.SetStatusIdle("MedChart");
        if (String.Equals(MedChartData.ChartStatus, CConstants.sChartSuspendedStatusCode, StringComparison.InvariantCultureIgnoreCase)) {
            // this.brdOverdue.Visibility = Visibility.Collapsed;
            this.isBorderOverdueEnabled = false;
        }
    }
    public SetTabOrder(): void {
        let nIndex: number = 0;
        this.lblCIFValue.TabIndex = nIndex++;
        this.cboStrikethroughReason.TabIndex = nIndex++;
        if (this.isBorderOverdueEnabled == true)
            this.chkOverdue.TabIndex = nIndex++;
    }
    GetStrikethruData(oSlotDetailVM: SlotDetailVM): void {
        let objService: MedicationAdministrationWSSoapClient = new MedicationAdministrationWSSoapClient();
        objService.GetRecordAdministionDetailsCompleted = (s, e) => { this.objService_GetRecordAdministionDetailsCompleted(s, e); };
        let objReq: CReqMsgGetRecordAdministionDetails = new CReqMsgGetRecordAdministionDetails();
        objReq.oContextInformation = CommonBB.FillContext();
        objReq.MedsAdminOidBC = this.lnMedAdminOID;
        objReq.PatientOidBC = ChartContext.PatientOID;
        objReq.IsSlotInPastDateAndStatusUnknownBC = this.IsSlotInPastDateAndStatusUnknown;
        objReq.PrescriptionItemScheduleOIDBC = this.objSlotVM.PresScheduleOID;
        objService.GetRecordAdministionDetailsAsync(objReq);
        Busyindicator.SetStatusBusy('MedStrikethr');
	
    }
    objService_GetRecordAdministionDetailsCompleted(sender: Object, e: GetRecordAdministionDetailsCompletedEventArgs): void {
    
        Busyindicator.SetStatusIdle('MedStrikethr');
        if (e.Result != null) {
            let objRes: CResMsgGetRecordAdministionDetails = e.Result;
            this.oSlotDetailVM = new SlotDetailVM();
            if (this.objSlotVM != null) {
                this.oSlotDetailVM.ScheduledDTTM = this.objSlotVM.ScheduledDTTM;
                this.oSlotDetailVM.PrescriptionEndDate = this.objSlotVM.PrescriptionEndDate;
                this.oSlotDetailVM.FreqPerodCode = this.objSlotVM.FreqPerodCode;
            }
            this.oSlotDetailVM.CurrentServerDate = this.dtCurrentTime;
            if (this.oSlotDetailVM.AdministrationDetail == null)
                this.oSlotDetailVM.AdministrationDetail = new AdministrationDetailVM();
            if (objRes != null && objRes.objAdministrationDetail != null) {
                if (this.IsSlotInPastDateAndStatusUnknown) {
                    this.lnMedAdminOID = objRes.objAdministrationDetail.MedAdminOID;
                    this.oSlotDetailVM.AdministrationDetail.MedAdminOID = this.lnMedAdminOID;
                    if (this.objSlotVM != null && this.objSlotVM.AdministrationDetail != null)
                        this.objSlotVM.AdministrationDetail.MedAdminOID = this.lnMedAdminOID;
                }
                this.oSlotDetailVM.PGDLorenzoID = objRes.objAdministrationDetail.PGDLorenzoID;
                this.oSlotDetailVM.ServiceOID = objRes.objAdministrationDetail.ServiceOID;
                this.oSlotDetailVM.EncounterOID = objRes.objAdministrationDetail.EncounterOID;
                this.oSlotDetailVM.AdministrationDetail.IsDuringHomeLeave = objRes.objAdministrationDetail.IsDuringHomeLeave;
                if (this.objSlotVM != null && this.objSlotVM.AdministrationDetail != null) {
                    this.objSlotVM.AdministrationDetail.IsDuringHomeLeave = this.oSlotDetailVM.AdministrationDetail.IsDuringHomeLeave;
                }
                if (String.Compare(objRes.objAdministrationDetail.MedicationAction, SlotStatus.DEFERADMIN, StringComparison.CurrentCultureIgnoreCase) == 0 && String.Compare(this.sSlotStatus, SlotStatus.NOTGIVEN, StringComparison.CurrentCultureIgnoreCase) == 0) {
                    //this.spNotGiven1.Visibility = this.spNotGiven2.Visibility = Visibility.Visible;
                    this.showdivitems(objRes.objAdministrationDetail.MedicationAction);
                    this.brdSTA.Height = 220;
                    this.oSlotDetailVM.Status = SlotStatusText.NOTGIVEN;
                    //this.oSlotDetailVM.AdministrationDetail.RecordedBy = objRes.objAdministrationDetail.RecordedBy;
                    this.oSlotDetailVM.AdministrationDetail.RecordedBy = this.sRecordedBy;
                    this.oSlotDetailVM.AdministrationDetail.RecordedAtText = this.dtRecordedAt.ConvertToUser((o1) => { this.IsDST = o1; }, (o2) => { this.IsAmbiguous = o2; }, (o3) => { this.IsInvalid = o3; }).ToDateTimeString(this.IsDST, this.IsAmbiguous, CConstants.DateTimeFormat);
                    if (!String.IsNullOrEmpty(objRes.objAdministrationDetail.AdminComments))
                        this.oSlotDetailVM.AdministrationDetail.AdminComments = objRes.objAdministrationDetail.AdminComments;
                    if (!String.IsNullOrEmpty(objRes.objAdministrationDetail.AmendReasonCode)) {
                        this.oSlotDetailVM.AdministrationDetail.AdministeredReason = objRes.objAdministrationDetail.AmendReasonCode;
                        this.oSlotDetailVM.GetDomainCombo("DeferReasonAsComment", false);
                    }
                }
                else {
                    if (String.Compare(objRes.objAdministrationDetail.MedicationAction, SlotStatus.GIVEN, StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(objRes.objAdministrationDetail.MedicationAction, SlotStatus.SELFADMINISTERED, StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(objRes.objAdministrationDetail.MedicationAction, SlotStatus.PATIENTSELFADMIN, StringComparison.CurrentCultureIgnoreCase) == 0) {
                        //this.spGiven1.Visibility = Visibility.Visible;
                        this.showdivitems(objRes.objAdministrationDetail.MedicationAction);
                        this.brdSTA.Height = 367;
                    }
                    else if (String.Compare(objRes.objAdministrationDetail.MedicationAction, SlotStatus.NOTGIVEN, StringComparison.CurrentCultureIgnoreCase) == 0) {
                        //this.spNotGiven1.Visibility = this.spNotGiven2.Visibility = Visibility.Visible;
                        this.showdivitems(objRes.objAdministrationDetail.MedicationAction);
                        this.brdSTA.Height = 220;
                    }
                    else if (String.Compare(objRes.objAdministrationDetail.MedicationAction, SlotStatus.NOTKNOWN, StringComparison.CurrentCultureIgnoreCase) == 0) {
                        //this.spNotKnown1.Visibility = this.spNotKnown2.Visibility = Visibility.Visible;
                        this.showdivitems(objRes.objAdministrationDetail.MedicationAction);
                        this.brdSTA.Height = 189;
                    }
                    if (!String.IsNullOrEmpty(objRes.objAdministrationDetail.MedicationAction)) {
                        switch (objRes.objAdministrationDetail.MedicationAction) {
                            case SlotStatus.GIVEN:
                                this.oSlotDetailVM.Status = (this.IsPGDItem) ? MedsAdminChartToolTip.PGDGiven : SlotStatusText.GIVEN;
                                break;
                            case SlotStatus.NOTGIVEN:
                                this.oSlotDetailVM.Status = SlotStatusText.NOTGIVEN;
                                break;
                            case SlotStatus.NOTKNOWN:
                                this.oSlotDetailVM.Status = SlotStatusText.NOTKNOWN;
                                break;
                            case SlotStatus.SELFADMINISTERED:
                                this.oSlotDetailVM.Status = SlotStatusText.SELFADMINISTERED;
                                this.oSlotDetailVM.AdministrationDetail.AdministeredBy = MedsAdminStrikethrough.sPatinet;
                                break;
                            case SlotStatus.PATIENTSELFADMIN:
                                this.oSlotDetailVM.Status = SlotStatusText.PATIENTSELFADMIN;
                                break;
                        }
                    }
                    this.oSlotDetailVM.AdministrationDetail.DoseValidationNotRequired = true;
                    if (!String.IsNullOrEmpty(objRes.objAdministrationDetail.AdminMethod)) {
                        this.oSlotDetailVM.AdministrationDetail.Dose = objRes.objAdministrationDetail.AdminMethod;
                    }
                    else {
                        this.oSlotDetailVM.AdministrationDetail.Dose=String.Empty;
                        if (!String.IsNullOrEmpty(objRes.objAdministrationDetail.Dose))
                            this.oSlotDetailVM.AdministrationDetail.Dose = objRes.objAdministrationDetail.Dose;
                        if (!String.IsNullOrEmpty(objRes.objAdministrationDetail.DoseUOM)) {
                            if (objRes.objAdministrationDetail.DoseUOM.Contains("~")) {
                                this.oSlotDetailVM.AdministrationDetail.Dose = this.oSlotDetailVM.AdministrationDetail.Dose + " " + objRes.objAdministrationDetail.DoseUOM.Split('~')[1];
                            }
                            else {
                                this.oSlotDetailVM.AdministrationDetail.Dose = this.oSlotDetailVM.AdministrationDetail.Dose + " " + objRes.objAdministrationDetail.DoseUOM;
                            }
                        }
                        else {
                            this.oSlotDetailVM.AdministrationDetail.Dose = this.oSlotDetailVM.AdministrationDetail.Dose + " " + this.strDoseUOM;
                        }
                    }
                    this.oSlotDetailVM.AdministrationDetail.DoseValidationNotRequired = false;
                    if (objRes.objAdministrationDetail != null && !String.IsNullOrEmpty(objRes.objAdministrationDetail.Route))
                        this.oSlotDetailVM.AdministrationDetail.Route = ObjectHelper.CreateObject(new CListItem(), { DisplayText: MedicationCommonBB.RouteName(objRes.objAdministrationDetail.Route), Value: MedicationCommonBB.RouteOID(objRes.objAdministrationDetail.Route) });
                    this.oSlotDetailVM.AdministrationDetail.Site = ObjectHelper.CreateObject(new CListItem(), {
                        DisplayText: objRes.objAdministrationDetail.Site,
                        Value: (objRes.objAdministrationDetail.SiteOID != null) ? objRes.objAdministrationDetail.SiteOID.ToString() : String.Empty
                    });
                    if (objRes.objAdministrationDetail.AdministeredDate != null && (DateTime.NotEquals(objRes.objAdministrationDetail.AdministeredDate, DateTime.MinValue)))
                        this.oSlotDetailVM.AdministrationDetail.AdministeredDateText = objRes.objAdministrationDetail.AdministeredDate.ToUserDateTimeString(CConstants.DateTimeFormat);
                    if (!String.IsNullOrEmpty(objRes.objAdministrationDetail.AdministeredBy))
                        this.oSlotDetailVM.AdministrationDetail.AdministeredBy = objRes.objAdministrationDetail.AdministeredBy;
                    if (!String.IsNullOrEmpty(objRes.objAdministrationDetail.AdminComments))
                        this.oSlotDetailVM.AdministrationDetail.AdminComments = objRes.objAdministrationDetail.AdminComments;
                    if (!String.IsNullOrEmpty(objRes.objAdministrationDetail.RecordedBy))
                        this.oSlotDetailVM.AdministrationDetail.RecordedBy = objRes.objAdministrationDetail.RecordedBy;
                    this.oSlotDetailVM.AdministrationDetail.RecordedAtText = objRes.objAdministrationDetail.RecordedAt.ToUserDateTimeString(CConstants.DateTimeFormat);
                    let sNotGivenReason: string = objRes.objAdministrationDetail.ReasonNotGiven;
                    if (!String.IsNullOrEmpty(sNotGivenReason)) {
                     this.oSlotDetailVM.AdministrationDetail.NotGivenReasonCode = sNotGivenReason;
                     this.oSlotDetailVM.GetDomainCombo1(ValueDomain.ReasonforRecord, this.IsPGDItem);
                        // if (!String.IsNullOrEmpty(sNotGivenReason)) {
                        //     this.oSlotDetailVM.AdministrationDetail.NotGivenReasonCode = sNotGivenReason;
                        //     this.oSlotDetailVM.GetDomainCombo(ValueDomain.ReasonforRecord, this.IsPGDItem);
                        //     let nCount: number = this.oSlotDetailVM.AdministrationDetail.ReasonNotGivens.Count;
                        //     for (let i: number = 0; i < nCount; i++) {
                        //         if (String.Equals(this.oSlotDetailVM.AdministrationDetail.ReasonNotGivens[i].Value, sNotGivenReason, StringComparison.CurrentCultureIgnoreCase)) {
                        //             this.oSlotDetailVM.AdministrationDetail.NotGivenReasonText = this.oSlotDetailVM.AdministrationDetail.ReasonNotGivens[i].DisplayText;
                        //             break;
                        //         }
                        //     }
                        // }
                    }
                }
            }
            else if (String.Compare(this.sSlotStatus, SlotStatus.NOTKNOWN, StringComparison.CurrentCultureIgnoreCase) == 0 && !String.IsNullOrEmpty(this.strDose)) {
                //this.spNotKnown1.Visibility = this.spNotKnown2.Visibility = Visibility.Visible;
                this.showdivitems(this.sSlotStatus);
                this.brdSTA.Height = 189;
                this.oSlotDetailVM.Status = SlotStatusText.NOTKNOWN;
            }
        }
        this.DataContext = this.oSlotDetailVM;
        this.oSlotVM = new SlotDetailVM();
        this.oSlotVM = ObjectHelper.CreateType<SlotDetailVM>(this.oSlotDetailVM, SlotDetailVM);
        this.DataContext = ObjectHelper.CreateType<SlotDetailVM>(this.oSlotDetailVM, SlotDetailVM);
        this.GetCliniicalIncidentFormConfig();
        if (this.cboStrikethroughReason.ItemsSource == null)
            this.oSlotDetailVM.GetDomainCombo1(ValueDomain.StrikethruReason, this.IsPGDItem);
        this.SetTabOrder();
        this.lblCIFValue.Focus();

    }
    GetCliniicalIncidentFormConfig(): void {
        if (ProfileData.ClinicalIncidentConfig != null && ProfileData.ClinicalIncidentConfig.isStrikeThroughAdministration) {
            if (!String.IsNullOrEmpty(ProfileData.ClinicalIncidentConfig.Address)) {
                this.lblCIFValue.Cursor = Cursors.Hand;
                this.lblCIFValue.Text = ProfileData.ClinicalIncidentConfig.LinkTextToDisplay;
            }
            else {
                this.lblCIFValue.Text = String.Empty;
                this.lblCIFValue.Cursor = Cursors.Arrow;
            }
        }
        else {
            this.lblCIFValue.Cursor = Cursors.Hand;
            this.lblCIFValue.Text = String.Empty;
            this.lblCIFValue.Visibility = Visibility.Collapsed
        }
    }
    public cmdOkClick(): boolean {
        //if (this.cboStrikethroughReason.GetText().length == 0)
        if(this.cboStrikethroughReason.SelectedValue==null)
         {
            let iMsgBox: iMessageBox = ObjectHelper.CreateObject(new iMessageBox(), {
                Title: "LORENZO",
                Message: Strikethrough.ReasonforStrikethruValidation,
                MessageButton: MessageBoxButton.OK,
                IconType: MessageBoxType.Information
            });
            iMsgBox.MessageBoxClose = (s, e) => { this.iMsgBox_MessageBoxClose(s, e); };
            iMsgBox.Show();
            return false;
        }
        else {
            let oService: MedicationAdministrationWSSoapClient = new MedicationAdministrationWSSoapClient();
            oService.StrikethroughAdminCompleted = (s, e) => { this.oService_StrikethroughAdminCompleted(s, e); };
            let oReqStrikethroughAdmin: CReqMsgStrikethroughAdmin = new CReqMsgStrikethroughAdmin();
            oReqStrikethroughAdmin.oStrikethroughAdminBC = new CStrikethroughAdmin();
            oReqStrikethroughAdmin.oStrikethroughAdminBC.MedAdminOID = this.lnMedAdminOID;
            oReqStrikethroughAdmin.oStrikethroughAdminBC.PrescriptionItemScheduleOID = this.lnPresItemScheduleOID;
            oReqStrikethroughAdmin.oStrikethroughAdminBC.ReasonCode = (ObjectHelper.CreateType<CListItem>(this.cboStrikethroughReason.SelectedItem, CListItem)).Value;
            if (this.chkOverdue.IsChecked == true) {
                oReqStrikethroughAdmin.oStrikethroughAdminBC.ActionCode = SlotStatus.NOTKNOWN;
                oReqStrikethroughAdmin.oStrikethroughAdminBC.IsUpdatePIStatusToCompleted = false;
            }
            else if (this.oSlotDetailVM != null && this.oSlotDetailVM.AdministrationDetail != null && this.oSlotDetailVM.AdministrationDetail.IsDuringHomeLeave && DateTime.GreaterThanOrEqualTo(CommonBB.GetServerDateTime(), this.oSlotDetailVM.ScheduledDTTM)) {
                oReqStrikethroughAdmin.oStrikethroughAdminBC.ActionCode = SlotStatus.HOMELEAVE;
                oReqStrikethroughAdmin.oStrikethroughAdminBC.IsUpdatePIStatusToCompleted = this.IsUpdatePIStatusToCompleted;
            }
            else {
                oReqStrikethroughAdmin.oStrikethroughAdminBC.ActionCode = null;
                oReqStrikethroughAdmin.oStrikethroughAdminBC.IsUpdatePIStatusToCompleted = this.IsUpdatePIStatusToCompleted;
            }
            if (!String.IsNullOrEmpty(this.oSlotDetailVM.FreqPerodCode) && String.Equals(this.oSlotDetailVM.FreqPerodCode, CConstants.OnceOnlyPerodCode, StringComparison.CurrentCultureIgnoreCase) && this.objSlotVM != null && !String.IsNullOrEmpty(this.objSlotVM.DoseType) && !String.Equals(this.objSlotVM.DoseType, DoseTypeCode.STEPPED, StringComparison.InvariantCultureIgnoreCase) && !String.Equals(this.objSlotVM.DoseType, DoseTypeCode.STEPPEDVARIABLE) && !String.Equals(this.objSlotVM.DoseType, DoseTypeCode.VARIABLE, StringComparison.InvariantCultureIgnoreCase)) {
                oReqStrikethroughAdmin.oStrikethroughAdminBC.IsOnceOnlySlot = true;
            }
            oReqStrikethroughAdmin.oStrikethroughAdminBC.IsLastSlotCheckRequired = this.IsLastSlotCheckRequired;
            oReqStrikethroughAdmin.oStrikethroughAdminBC.PrescriptionItemOID = this.lnPresceiptionItemOID;
            oReqStrikethroughAdmin.oStrikethroughAdminBC.ScheduledDTTM = this.oSlotDetailVM.ScheduledDTTM;
            oReqStrikethroughAdmin.oStrikethroughAdminBC.PresItemENDTTM = this.oSlotDetailVM.PrescriptionEndDate;
            oReqStrikethroughAdmin.oStrikethroughAdminBC.PatientOID = PatientContext.PatientOID;
            if (this.IsPGDItem && this.oSlotDetailVM.EncounterOID > 0) {
                oReqStrikethroughAdmin.oStrikethroughAdminBC.EncounterOID = this.oSlotDetailVM.EncounterOID;
            }
            else {
                oReqStrikethroughAdmin.oStrikethroughAdminBC.EncounterOID = ChartContext.EncounterOID;
            }
            if (this.cbIsBolus)
                oReqStrikethroughAdmin.oStrikethroughAdminBC.InfusionType = InfusionTypeCode.INTERMITTENT;
            oReqStrikethroughAdmin.oStrikethroughAdminBC.PGDLorenzoID = this.oSlotDetailVM.PGDLorenzoID;
            oReqStrikethroughAdmin.oStrikethroughAdminBC.ServiceOID = this.oSlotDetailVM.ServiceOID;
            oReqStrikethroughAdmin.oContextInformation = CommonBB.FillContext();
            oReqStrikethroughAdmin.oContextInformation.PageInfo = PatientContext.EncounterOid.ToString();
            oService.StrikethroughAdminAsync(oReqStrikethroughAdmin);
            return true;
        }
    }
    oService_StrikethroughAdminCompleted(sender: Object, e: StrikethroughAdminCompletedEventArgs): void {
        if (e.Result != null) {
            let oResStrikethroughAdmin: CResMsgStrikethroughAdmin = e.Result;
            let isNotKnownSlot: boolean = false;
            if (this.objSlotVM != null && this.objSlotVM.DrugDetail != null && this.objSlotVM.DrugDetail.Tag != null) {
                let oTagdrugHeaderDetails: TagDrugHeaderDetail = ObjectHelper.CreateType<TagDrugHeaderDetail>(this.objSlotVM.DrugDetail.Tag, TagDrugHeaderDetail);
                if (oTagdrugHeaderDetails != null && (DateTime.NotEquals(this.objSlotVM.ScheduledDTTM, DateTime.MinValue))) {
                    let dtNotKnownFrom: DateTime = this.dtCurrentTime.DateTime.AddDays(1).AddHours(-CConstants.OverdueToNotknownTime);
                    isNotKnownSlot = (DateTime.LessThan(this.objSlotVM.ScheduledDTTM, dtNotKnownFrom));
                    if (this.chkOverdue.IsChecked.HasValue && this.chkOverdue.IsChecked == true) {
                        this.oSlotDetailVM.AdministrationDetail.RecordedAt = CommonBB.GetServerDateTime();
                    }
                    else {
                        this.oSlotDetailVM.AdministrationDetail.RecordedAt = this.objSlotVM.ScheduledDTTM.DateTime.AddHours(CConstants.OverdueToNotknownTime);
                    }
                }
            }
            let sStatus: string = String.Empty;
            if (this.chkOverdue.IsChecked == true &&  this.isBorderOverdueEnabled == true)
                sStatus = SlotStatus.NOTKNOWN;
            else if (this.oSlotDetailVM != null && this.oSlotDetailVM.AdministrationDetail != null && this.oSlotDetailVM.AdministrationDetail.IsDuringHomeLeave && (DateTime.GreaterThanOrEqualTo(CommonBB.GetServerDateTime(), this.oSlotDetailVM.ScheduledDTTM))) {
                sStatus = SlotStatus.HOMELEAVE;
            }
            else if (isNotKnownSlot)
                sStatus = SlotStatus.NOTKNOWN;
            else sStatus = SlotStatus.PLANNED;
            this.oSlotDetailVM.Status = sStatus;
            this.oSlotDetailVM.AdministrationDetail.IsHistoryExists = true;
            this.oSlotDetailVM.PresScheduleOID = this.lnPresItemScheduleOID;
            this.oSlotDetailVM.PrescriptionItemOID = this.lnPresceiptionItemOID;
            this.oSlotDetailVM.IsReloadChartRequired = this.IsReloadChartReq = e.Result.IsPresItemStatusUpdated;
            if (this.oSlotDetailVM.IsReloadChartRequired && !String.IsNullOrEmpty(e.Result.OriginalStatus)) {
                this.PrescriptionItemStatus = e.Result.OriginalStatus;
                this.oSlotDetailVM.CurrentPrescriptionItemStatus = this.PrescriptionItemStatus;
            }
            this.oSlotDetailVM.IsSubmitInProgress = this.objSlotVM.IsSubmitInProgress;
            if (DateTime.Equals(this.oSlotDetailVM.ScheduledDTTM, DateTime.MinValue))
                this.oSlotDetailVM.ScheduledDTTM = this.objSlotVM.ScheduledDTTM;
            this.DataContext = this.oSlotDetailVM;
        }
        if (this.IsPGDItem) {
            this.deletePGDDrug();
        }
        else {
            if (e.Error == null)
                this.appDialog.DialogResult = true;
            if (this.IsSlotUpdatedEvent != null)
                this.IsSlotUpdatedEvent();
        }
    }

    private deletePGDDrug(): void {
        let objReqFill: IPPMAManagePrescSer.CReqMsgCancelDrugs = new IPPMAManagePrescSer.CReqMsgCancelDrugs();
        objReqFill.oContextInformation = Common.FillContext();
        objReqFill.oMedicationBC = new IPPMAManagePrescSer.Medication();
        this.FillPatientPrescription(objReqFill.oMedicationBC);
        objReqFill.oMedicationBC.PatientPrescription.PrescriptionItems = new ObservableCollection<IPPMAManagePrescSer.PrescriptionItemDetails>();
        let info: IPPMAManagePrescSer.DeletedItemsInfo = new IPPMAManagePrescSer.DeletedItemsInfo();
        info.PrescriptionItemData = new IPPMAManagePrescSer.PrescriptionItemInputData();
        info.PrescriptionItemData.OID = this.lnPresceiptionItemOID;
        info.PrescriptionItemData.PrescriptionItemStatus = CConstants.CANCELLED;
        info.PrescriptionItemData.PrescriptionType = PatientContext.PrescriptionType;
        info.DeletedInfo = new IPPMAManagePrescSer.PrescriptionItemAction();
        info.DeletedInfo.ActionCode = CConstants.CANCELLED;
        info.DeletedInfo.DirectDiscontinueReason = (ObjectHelper.CreateType<CListItem>(this.cboStrikethroughReason.SelectedItem, CListItem)).DisplayText;
        info.IsPatMerged = (PatientContext.PatientOID > 0 && PatientContext.MergedPatientOID > 0 && PatientContext.PatientOID != PatientContext.MergedPatientOID) ? "1" : "0";
        if (objReqFill.oMedicationBC.CancelledDrugs == null)
            objReqFill.oMedicationBC.CancelledDrugs = new ObservableCollection<IPPMAManagePrescSer.DeletedItemsInfo>();
        objReqFill.oMedicationBC.CancelledDrugs.Add(info);
        let objServiceProxy: IPPMAManagePrescSer.IPPMAManagePrescriptionWSSoapClient = new IPPMAManagePrescSer.IPPMAManagePrescriptionWSSoapClient();
        objServiceProxy.CancelDrugsCompleted = (s, e) => { this.objServiceProxy_CancelDrugsCompleted(s, e); };
        objServiceProxy.CancelDrugsAsync(objReqFill);
    }
    public FillPatientPrescription(SubmitDrug: IPPMAManagePrescSer.Medication): void {
        SubmitDrug.PatientPrescription = new IPPMAManagePrescSer.Prescription();
        SubmitDrug.PatientPrescription.PatientOID = Convert.ToInt64(PatientContext.PatientOID);
        SubmitDrug.PatientPrescription.EncounterOID = Convert.ToInt64(ChartContext.EncounterOID);
        SubmitDrug.PatientPrescription.HealthOrganisation = ObjectHelper.CreateObject(new IPPMAManagePrescSer.ObjectInfo(), {
            Name: AppContextInfo.OrganisationName,
            OID: Convert.ToInt64(AppContextInfo.OrganisationOID)
        });
        SubmitDrug.PatientPrescription.PrescriberRole = ObjectHelper.CreateObject(new IPPMAManagePrescSer.ObjectInfo(), {
            OID: Convert.ToInt64(AppContextInfo.JobRoleOID),
            Name: AppContextInfo.RoleProfileName
        });
        SubmitDrug.PatientPrescription.Specialty = ObjectHelper.CreateObject(new IPPMAManagePrescSer.ObjectInfo(), { OID: Convert.ToInt64(AppContextInfo.SpecialtyOID) });
        SubmitDrug.PatientPrescription.PrescriptionType = PatientContext.PrescriptionType;
        SubmitDrug.PatientPrescription.PrintStatus = "N";
        SubmitDrug.PatientPrescription.PrescriberDetails = ObjectHelper.CreateObject(new IPPMAManagePrescSer.ObjectInfo(), { OID: ContextInfo.UserOID });
        SubmitDrug.PatientPrescription.IsMergedPatient = (PatientContext.PatientOID > 0 && PatientContext.MergedPatientOID > 0 && PatientContext.PatientOID != PatientContext.MergedPatientOID) ? "1" : "0";
    }
    public objServiceProxy_CancelDrugsCompleted(sender: Object, e: IPPMAManagePrescSer.CancelDrugsCompletedEventArgs): void {
        if (e.Error == null) {
            this.appDialog.DialogResult = true;
        }
        if (this.IsPGDItem) {
            if (this.IsSlotUpdatedEvent != null)
                this.IsSlotUpdatedEvent();
        }
    }
    iMsgBox_MessageBoxClose(sender: Object, e: MessageEventArgs): void {
        if (e.MessageBoxResult == MessageBoxResult.OK) {
            this.objSlotVM.IsSubmitInProgress = false;
            Busyindicator.SetStatusIdle("Administration");
            this.cboStrikethroughReason.Focus();
        }
    }
    public cmdCancel_Click(): boolean {
        return false;
    }
    public ValidateURL(url: string): boolean {
        let RgxUrl: RegExp = new RegExp("^(ht|f)tp(s?)\:\/\/[0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*(:(0-9)*)*(\/?)([a-zA-Z0-9\-\.\?\,\'\/\\\+&amp;%\$#_]*)?$");
        return RgxUrl.test(url);
    }
    lblCIFValue_MouseLeftButtonUp(sender: Object, e: MouseButtonEventArgs): void {
        let sAddress: string = ProfileData.ClinicalIncidentConfig.Address;
        if (!String.IsNullOrEmpty(sAddress) && this.ValidateURL(ProfileData.ClinicalIncidentConfig.Address)) {
            if (!sAddress.StartsWith("http://")) {
                sAddress = "http://" + sAddress;
                HtmlPage.Window.Invoke("LaunchClinicalIncidentForm", sAddress);
            }
            else HtmlPage.Window.Invoke("LaunchClinicalIncidentForm", ProfileData.ClinicalIncidentConfig.Address);
        }
    }
}
