import { Component, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { StringBuilder, ContextManager, Convert, AppActivity } from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp, Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison, AppDialogEventargs, AppDialogResult, DelegateArgs, DialogComponentArgs, WindowButtonType, ContentControl, iAppDialogWindow, ChildWizardCloseEventargs, PatientContext, HtmlPage } from 'epma-platform/models';
import { AppDialog, Border, Control, EventArgs, Grid, KeyEventArgs, StackPanel, Thickness, ToolTipService, UserControl, iButton, iComboBox, iLabel, iRadioButton, iTextBox } from 'epma-platform/controls';
import { HelperService } from 'epma-platform/soapclient';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
import { InfrecordadminVM, PreviousActionValues } from '../viewmodel/InfrecordadminVM';
import { CDrugHdrAddnlInfo, CDrugHeader, DrugHeader } from '../common/drugheader';
import { SlotDetailVM } from '../viewmodel/MedicationChartVM';
import { ObservationChartVM } from '../ca/observationchart/ObservationChartVM';
import { AdministrationDetail } from 'src/app/product/shared/models/medicationadminws';
import { InfRecAdmBase } from '../viewmodel/InfRecAdmBase';
import { MedScanRecAdmVM } from '../viewmodel/MedScanRecAdmVM';
import { AdministrationField, CConstants, DoseTypeCode, InfStrikeOutType, MedicationAction, SlotStatus } from '../utilities/CConstants';
import { InfusionTypesCode } from 'src/app/lorappmanageprescriptionbbui/utilities/constants';
import { ProfileData } from '../utilities/ProfileData';
import { Visibility } from 'src/app/shared/epma-platform/controls-model/Visibility';
import { RoutedEventArgs } from 'src/app/shared/epma-platform/controls/Control';
import { Common } from '../utilities/common';
import { Resource } from '../resource';
import { CALaunch, CPatLatestObsResParams, CReqMsgGetLatestObsOrResultDetails, CResMsgGetLatestObsOrResultDetails, GetLatestObsOrResultDetailsCompletedEventArgs, MedicationAdministrationWSSoapClient, SlotDetail } from 'src/app/shared/epma-platform/soap-client/MedicationAdministrationWS';
import { ManageBarcodeHelper } from '../common/ManageBarcodeHelper';
import { ChartContext, MedChartData } from '../utilities/globalvariable';
import { InfusionRecAdminHelper } from '../utilities/InfusionRecAdminHelper';
import { Busyindicator } from 'src/app/lorappcommonbb/busyindicator';
import { InfusionTypeCode } from 'src/app/lorappmedicationcommonbb/utilities/constants';
import { MedicationAdministrator } from '../resource/medicationadministrator.designer';
import { InfRecAdmBagDetails } from './InfRecAdmBagDetails';
import { InfRecAdmContStop } from './InfRecAdmContStop';
import { InfRecAdmContDefer } from './InfRecAdmContDefer';
import { InfRecAdmContResume } from './InfRecAdmContResume';
import { InfRecAdmCSFStopComplete } from './InfRecAdmCSFStopCompleted';
import { InfRecAdmPCAChangeBag } from './InfRecAdmPCAChangeBag';
import { InfRecAdmCSFChangeBag } from './InfRecAdmCSFChangeBag';
import { InfRecAdmContChangeFlowRate } from './InfRecAdmContChangeFlowRate';
import { InfRecAdmGasBegun } from './InfRecAdmGasBegun';
import { InfRecAdmConditionalDose } from './InfRecAdmConditionalDose';
import { InfRecAdmContSummaryView } from './InfRecAdmContSummaryView';
import * as ControlStyles from "../../shared/epma-platform/controls/ControlStyles";
import { MedsAdminOmitSlots } from '../resource/medsadminomitslots.designer';
import { DisplayPrescriptionLineItem, DoseWrapConverter, HumidificationConverter, InfusionHeaderItem, RouteWrapConverter, TargetsatrangeConverter } from '../converter/medadminconverter';
import { InfRecAdmStrikeThrough } from './InfRecAdmStrikeThrough';
import { ConditionalRegime } from '../resource/conditionalregime.designer';
import { InfRecAdmGasSummaryView } from './InfRecAdmGasSummaryView';
import { InfRecAdmPCASummaryView } from './InfRecAdmPCASummaryView';
import { MedScanRecordAdministration } from './MedScanRecordadministration';
import { InfRecAdmContBegun } from './InfRecAdmContBegun';
import { InfDripRateCalculator } from 'src/app/lorappmedicationcommonbb/child/InfDripRateCalculator';
import { Binding, BindingMode } from 'src/app/shared/epma-platform/controls/FrameworkElement';
import { iRadioButtonService } from 'src/app/shared/epma-platform/controls/iradiobutton';
import { ResourceManager } from '../resource/infrecadministartion.designer';
var that;
@Component({
    selector: 'InfRecAdmMainView',
    templateUrl: './InfRecAdmMainView.html',
    styleUrls: ['./InfRecAdmMainView.css']
})

export class InfRecAdmMainView extends iAppDialogWindow implements AfterViewInit {
    deferChcked: boolean = false;
    notGivenChked: boolean = false;
    pauseChked: boolean = false;
    resumeChcked: boolean = false;
    isResumeVisible = false;
    iRdbresumehidden: boolean = true;
    iRdbpausehidden: boolean = true;
    iRdbNotGivenhidden: boolean = true;
    iRdbdeferedhidden: boolean = true;
    iRdbchangebaghidden: boolean = true;
    iRdbchgflowratehidden: boolean = true;
    stopChcked: boolean = false;
    stopChckedRe: boolean = false;
    completeChckedRe: boolean = false;
    completeChcked: boolean = false;
    RenderedControl: any;
    public maxScrollHeight ;
    public maxtabHeight;
    ngAfterViewInit(): void {
        that = this;
        if (window.screen.height < 1000 && window.devicePixelRatio != 1.25) 
            {
                this.maxtabHeight = 205;
        }
        else{
        this.maxScrollHeight = (window.devicePixelRatio == 1) ? 305 : (305/window.devicePixelRatio)-30;
        this.maxtabHeight = (window.devicePixelRatio == 1) ? 340 : (340/window.devicePixelRatio)-57;
        }
        this.medsInfurecordadminmainview_Loaded();
        if (!String.IsNullOrEmpty(this.recordadminVM.InfSlotStatus) && ((String.Compare(this.recordadminVM.InfSlotStatus, SlotStatus.NOTYETRECORDED) == 0) || (String.Compare(this.recordadminVM.InfSlotStatus, SlotStatus.OVERDUE) == 0) || (String.Compare(this.recordadminVM.InfSlotStatus, SlotStatus.DUENOW) == 0) || (String.Compare(this.recordadminVM.InfSlotStatus, SlotStatus.PLANNED) == 0) || (String.Compare(this.recordadminVM.InfSlotStatus, SlotStatus.NOTKNOWN) == 0) || (String.Equals(this.recordadminVM.InfSlotStatus, SlotStatus.HOMELEAVE, StringComparison.InvariantCultureIgnoreCase)))) {
            this.iRdbBegun.IsChecked = true;
            this.iRdbBegun_Checked();
        }
        if (this.DataContext.IsVisibleRestrostopcomplete == 0) {
            if (!String.Equals(this.recordadminVM.ItemSubType, InfusionTypesCode.SUBTYPE_GAS)) {
                this.iRdbReStop_Checked();
            }
        }
        if (this.DataContext.IsSelectChangeFlowrate == true) {
            this.iRdbChangeflowrateAdmin_Checked();
        }
        this.recordadminVM.IsScanRecMedVisible = ((this.iRdbBegun.IsChecked == true || this.iRdbchangebag.IsChecked == true) && !this.recordadminVM.IsMedScanExcluded) ? Visibility.Visible : Visibility.Collapsed;
        this.recordadminVM.cmdRequestvisible =MedChartData.bRequestMedicationVisible ? Visibility.Visible : Visibility.Collapsed;

    }
    public objRecordAdmin = Resource.MedicationAdministrator;
    public objOmitSlots = Resource.MedsAdminOmitSlots;
    public ResrcKey = Resource.InfusionChart;
    public CondRes = Resource.ConditionalRegime;
    public MedCharOIDBC: number;
    objVm: SlotDetailVM;
    public recordadminVM: InfrecordadminVM;
    lnRouteOID: number = 0;
    sAdminReason: string = String.Empty;
    public objObsResultVM: ObservationChartVM;
    lnPrescriptionOID: number = 0;
    MCVersion: string = String.Empty;
    oParam: string = String.Empty;
    IdentifyingOID: number = 0;
    public strUserName: string = String.Empty;
    sAdminMethod: string = String.Empty;
    sDrugName: string = String.Empty;
    sObsDrugName: string = String.Empty;
    IdentifyingType: string = String.Empty;
    sDoseUOMLzoID: string = String.Empty;
    strDose: string = String.Empty;
    objadmindripratecalc: InfDripRateCalculator;
    objadminbagdetails: InfRecAdmBagDetails;
    objstrikethrough: InfRecAdmStrikeThrough;
    public objAdminDetail: AdministrationDetail;
    //public delegate void OnRecAdminFinishDelegate();
    public CanBeStruckThrough: boolean;
    public ShowLastActionStrikeThrough: boolean;
    public IsAlertShown: boolean;
    EANCode: string;
    ScannedEANCode: string;
    IsExpiredProduct: boolean;
    oInfRecAdmContBegun: InfRecAdmContBegun;
    oInfRecAdmContDefer: InfRecAdmContDefer;
    oInfRecAdmContResume: InfRecAdmContResume;
    oInfRecAdmContStop: InfRecAdmContStop;
    oInfRecAdmCSFStopComplete: InfRecAdmCSFStopComplete = null;
    oInfRecAdmPCAChangeBag: InfRecAdmPCAChangeBag;
    oInfRecAdmCSFChangeBag: InfRecAdmCSFChangeBag;
    oInfRecAdmContChangeFlowRate: InfRecAdmContChangeFlowRate;
    oInfRecAdmGasBegun: InfRecAdmGasBegun;
    oInfRecAdmBase: InfRecAdmBase;
    ConditionalChildView: InfRecAdmConditionalDose;
    sItemType: string = String.Empty;
    oMedScanRecordadministration: MedScanRecordAdministration;
    oMedScanRecAdmVM: MedScanRecAdmVM;
    oMsg: iMessageBox = new iMessageBox();
    public LayoutRoot: Grid;
    public Styles = ControlStyles;
    objSlotDetailVM: any;
    valueForDeferScreen: string;
    oDrugHeaderAddnlInfo: CDrugHdrAddnlInfo;
    completeValuesHolder: {};
    contStopChked: boolean;
    public isDialogOpen: boolean = true;
    @ViewChild("LayoutRootTempRef", { read: Grid, static: false }) set _LayoutRoot(c: Grid) {
        if (c) { this.LayoutRoot = c; }
    };
    public objDrugHeader: any = new DrugHeader();
    // public objDrugHeader: DrugHeader;
    @ViewChild("objDrugHeaderTempRef", { read: DrugHeader, static: false }) set _objDrugHeader(c: DrugHeader) {
        if (c) { this.objDrugHeader = c; }
    };
    public brdpreviousbag: Border;
    @ViewChild("brdpreviousbagTempRef", { read: Border, static: false }) set _brdpreviousbag(c: Border) {
        if (c) { this.brdpreviousbag = c; }
    };
    public lblBorder: iLabel;
    @ViewChild("lblBorderTempRef", { read: iLabel, static: false }) set _lblBorder(c: iLabel) {
        if (c) { this.lblBorder = c; }
    };
    public spInfActions: StackPanel = new StackPanel();
    @ViewChild("spInfActionsTempRef", { read: StackPanel, static: false }) set _spInfActions(c: StackPanel) {
        if (c) { this.spInfActions = c; }
    };
    public iRadioButtonService: iRadioButtonService = new iRadioButtonService;
    public iRdbBegun: iRadioButton = new iRadioButton(this.iRadioButtonService);
    @ViewChild("iRdbBegunTempRef", { read: iRadioButton, static: false }) set _iRdbBegun(c: iRadioButton) {
        if (c) { this.iRdbBegun = c; }
    };
    public iRdbNotGiven: iRadioButton = new iRadioButton();
    @ViewChild("iRdbNotGivenTempRef", { read: iRadioButton, static: false }) set _iRdbNotGiven(c: iRadioButton) {
        if (c) { this.iRdbNotGiven = c; }
    };
    public iRdbdefered: iRadioButton = new iRadioButton();
    @ViewChild("iRdbdeferedTempRef", { read: iRadioButton, static: false }) set _iRdbdefered(c: iRadioButton) {
        if (c) { this.iRdbdefered = c; }
    };
    public iRdbchgflowrate: iRadioButton = new iRadioButton();
    @ViewChild("iRdbchgflowrateTempRef", { read: iRadioButton, static: false }) set _iRdbchgflowrate(c: iRadioButton) {
        if (c) { this.iRdbchgflowrate = c; }
    };
    public iRdbchangebag: iRadioButton = new iRadioButton();
    @ViewChild("iRdbchangebagTempRef", { read: iRadioButton, static: false }) set _iRdbchangebag(c: iRadioButton) {
        if (c) { this.iRdbchangebag = c; }
    };
    public iRdbpause: iRadioButton = new iRadioButton();
    @ViewChild("iRdbpauseTempRef", { read: iRadioButton, static: false }) set _iRdbpause(c: iRadioButton) {
        if (c) { this.iRdbpause = c; }
    };
    public iRdbresume: iRadioButton = new iRadioButton();
    @ViewChild("iRdbresumeTempRef", { read: iRadioButton, static: false }) set _iRdbresume(c: iRadioButton) {
        if (c) { this.iRdbresume = c; }
    };
    public iRdbstop: iRadioButton = new iRadioButton();
    @ViewChild("iRdbstopTempRef", { read: iRadioButton, static: false }) set _iRdbstop(c: iRadioButton) {
        if (c) { this.iRdbstop = c; }
    };
    public iRdbcomplete: iRadioButton = new iRadioButton();
    @ViewChild("iRdbcompleteTempRef", { read: iRadioButton, static: false }) set _iRdbcomplete(c: iRadioButton) {
        if (c) { this.iRdbcomplete = c; }
    };
    public CriticalMedMsg: StackPanel = new StackPanel();
    @ViewChild("CriticalMedMsgTempRef", { read: StackPanel, static: false }) set _CriticalMedMsg(c: StackPanel) {
        if (c) { this.CriticalMedMsg = c; }
    };
    public brdcri: Border;
    @ViewChild("brdcriTempRef", { read: Border, static: false }) set _brdcri(c: Border) {
        if (c) { this.brdcri = c; }
    };
    public critical: iLabel;
    @ViewChild("criticalTempRef", { read: iLabel, static: false }) set _critical(c: iLabel) {
        if (c) { this.critical = c; }
    };
    public CriticalDrugSiteURL: StackPanel;
    @ViewChild("CriticalDrugSiteURLTempRef", { read: StackPanel, static: false }) set _CriticalDrugSiteURL(c: StackPanel) {
        if (c) { this.CriticalDrugSiteURL = c; }
    };
    public Formore: iLabel;
    @ViewChild("FormoreTempRef", { read: iLabel, static: false }) set _Formore(c: iLabel) {
        if (c) { this.Formore = c; }
    };
    public ContentCtrlMeddefaultview: ContentControl = new ContentControl;
    public brdStopcomplete: Border;
    @ViewChild("brdStopcompleteTempRef", { read: Border, static: false }) set _brdStopcomplete(c: Border) {
        if (c) { this.brdStopcomplete = c; }
    };
    public lblRetrospective: iLabel;
    @ViewChild("lblRetrospectiveTempRef", { read: iLabel, static: false }) set _lblRetrospective(c: iLabel) {
        if (c) { this.lblRetrospective = c; }
    };
    public RetrospectiveInfActions: StackPanel;
    @ViewChild("RetrospectiveInfActionsTempRef", { read: StackPanel, static: false }) set _RetrospectiveInfActions(c: StackPanel) {
        if (c) { this.RetrospectiveInfActions = c; }
    };
    public iRdbReStop: iRadioButton = new iRadioButton();
    @ViewChild("iRdbReStopTempRef", { read: iRadioButton, static: false }) set _iRdbReStop(c: iRadioButton) {
        if (c) { this.iRdbReStop = c; }
    };
    public iRdbReComplete: iRadioButton = new iRadioButton();
    @ViewChild("iRdbReCompleteTempRef", { read: iRadioButton, static: false }) set _iRdbReComplete(c: iRadioButton) {
        if (c) { this.iRdbReComplete = c; }
    };
    public ContentCtrlRetrospective: ContentControl = new ContentControl;
    public brdcompletegas: Border;
    @ViewChild("brdcompletegasTempRef", { read: Border, static: false }) set _brdcompletegas(c: Border) {
        if (c) { this.brdcompletegas = c; }
    };
    public lblRetrospectivegas: iLabel;
    @ViewChild("lblRetrospectivegasTempRef", { read: iLabel, static: false }) set _lblRetrospectivegas(c: iLabel) {
        if (c) { this.lblRetrospectivegas = c; }
    };
    public ContentCtrlRetrospectivegas: ContentControl;
    @ViewChild("ContentCtrlRetrospectivegasTempRef", { read: ContentControl, static: false }) set _ContentCtrlRetrospectivegas(c: ContentControl) {
        if (c) { this.ContentCtrlRetrospectivegas = c; }
    };
    public cmdScanRecMedication: iButton;
    @ViewChild("cmdScanRecMedicationTempRef", { read: iButton, static: false }) set _cmdScanRecMedication(c: iButton) {
        if (c) { this.cmdScanRecMedication = c; }
    };
    public cmdRequest: iButton;
    @ViewChild("cmdRequestTempRef", { read: iButton, static: false }) set _cmdRequest(c: iButton) {
        if (c) { this.cmdRequest = c; }
    };
    public cmdObservationsResults: iButton;
    @ViewChild("cmdObservationsResultsTempRef", { read: iButton, static: false }) set _cmdObservationsResults(c: iButton) {
        if (c) { this.cmdObservationsResults = c; }
    };
    public cmdWristbandScan: iButton;
    @ViewChild("cmdWristbandScanTempRef", { read: iButton, static: false }) set _cmdWristbandScan(c: iButton) {
        if (c) { this.cmdWristbandScan = c; }
    };
    public lblEmpty: iLabel;
    @ViewChild("lblEmptyTempRef", { read: iLabel, static: false }) set _lblEmpty(c: iLabel) {
        if (c) { this.lblEmpty = c; }
    };
    // public txtBarcodeInfusion: iTextBox;
    // @ViewChild("txtBarcodeInfusionTempRef", { read: iTextBox, static: false }) set _txtBarcodeInfusion(c: iTextBox) {
    //     if (c) { this.txtBarcodeInfusion = c; }
    // };
    @ViewChild('txtBarcodeInfusionTempRef', { static: false }) txtBarcodeInfusion: ElementRef;
    public cmdbagdetails: iButton;
    @ViewChild("cmdbagdetailsTempRef", { read: iButton, static: false }) set _cmdbagdetails(c: iButton) {
        if (c) { this.cmdbagdetails = c; }
    };
    public cmdStrikethroughadmin: iButton;
    @ViewChild("cmdStrikethroughadminTempRef", { read: iButton, static: false }) set _cmdStrikethroughadmin(c: iButton) {
        if (c) { this.cmdStrikethroughadmin = c; }
    };
    public brdBarcode: Border;
    @ViewChild("brdBarcodeTempRef", { read: Border, static: false }) set _brdBarcode(c: Border) {
        if (c) { this.brdBarcode = c; }
    };

    public contdefer: InfRecAdmContDefer;
    @ViewChild("contdeferTempRef", { read: InfRecAdmContDefer, static: false }) set _InfRecAdmContDefer(c: InfRecAdmContDefer) {
        if (c) {
            this.contdefer = c;
            this.RenderedControl = c;
            console.log('Datas to be had.viewchild', (new Date()).getTime(), c)
                ;
            if (this.deferChcked) {
                this.isRdbDfrAdmin_CheckedExtension(c);
            } else if (this.notGivenChked) {
                this.isRdbNotgiven_CheckedExtension(c)
            } else if (this.pauseChked) {
                this.isRdbpauseAdmin_CheckedExtension(c);
            } else if (this.resumeChcked) {
                this.iRdbResume_CheckedExtension_Gas(c);
            }
        }
    };

    public contChgFlow: InfRecAdmContChangeFlowRate;
    @ViewChild("contChgFlowrateTempRef", { read: InfRecAdmContChangeFlowRate, static: false }) set _InfRecAdmContChangeFlowRate(c: InfRecAdmContChangeFlowRate) {
        if (c) {
            this.contChgFlow = c;
            this.RenderedControl = c;
            this.iRdbChgFlow_CheckExtension(c);

        }
    };

    public contStop: InfRecAdmContStop;
    @ViewChild("contStopTempRef", { read: InfRecAdmContStop, static: false }) set _InfRecAdmContStop(c: InfRecAdmContStop) {

        if (c) {
            this.contStop = c;
            this.RenderedControl = c;
            if (this.stopChcked) {
                this.iRdbStop_CheckExtension(c);
            } else if (this.completeChcked) {
                this.iRdbComplete_CheckExtension(c);
            }

            if (this.stopChckedRe) {
                this.iRdbReStop_CheckExtension(c);
            } else if (this.completeChckedRe) {
                this.iRdbReComplete_CheckExtension(c);
            }
        }
    };
    public CSFStopComplete: InfRecAdmCSFStopComplete;
    @ViewChild("CSFStopTempRef", { read: InfRecAdmCSFStopComplete, static: false }) set _InfRecAdmCSFStopComplete(c: InfRecAdmCSFStopComplete) {

        if (c) {
            this.CSFStopComplete = c;
            this.RenderedControl = c;
            if (this.stopChcked) {
                this.iRDBCSFStop_CheckExtension(c);
            } else if (this.completeChcked) {
                this.iRdbCSFComplete_CheckExtension(c);
            }
        }
    };


    public contResume: InfRecAdmContResume;
    @ViewChild("contResumeTempRef", { read: InfRecAdmContResume, static: false }) set _InfRecAdmContResume(c: InfRecAdmContResume) {
        if (c) {
            this.contResume = c;
            this.RenderedControl = c;
            console.log('Datas to be had.viewchild', (new Date()).getTime(), c);
            console.log('viewchild', this.contResume);
            if (this.contResume) {
                this.iRdbResume_CheckedExtension(c);
            }
        }
    };
    public contBegun: InfRecAdmContBegun;
    @ViewChild("contBegun", { read: InfRecAdmContBegun, static: false }) set _InfRecAdmContBegun(c: InfRecAdmContBegun) {
        if (c) {
            this.contBegun = c;
            this.RenderedControl = c;
        }
    };
    public pcaChangeBag: InfRecAdmPCAChangeBag;
    @ViewChild("pcaChangeBag", { read: InfRecAdmPCAChangeBag, static: false }) set _InfRecAdmPCAChangeBag(c: InfRecAdmPCAChangeBag) {
        if (c) {
            this.pcaChangeBag = c;
            this.RenderedControl = c;
        }
    };
    public CSFChangeBag: InfRecAdmCSFChangeBag;
    @ViewChild("CSFChangeBag", { read: InfRecAdmCSFChangeBag, static: false }) set _InfRecAdmCSFChangeBag(c: InfRecAdmCSFChangeBag) {
        if (c) {
            this.CSFChangeBag = c;
            this.RenderedControl = c;
        }
    };
    public InitilizeView(oInfrecordadminVM: InfrecordadminVM): void {
        this.recordadminVM = oInfrecordadminVM;
        this.recordadminVM.ShowLastActionStrikeThrough = oInfrecordadminVM.ShowLastActionStrikeThrough;

        this.ShowLastActionStrikeThrough = oInfrecordadminVM.ShowLastActionStrikeThrough;
        if (this.recordadminVM) {
            this.recordadminVM.OnInfStrikethruCompleted = (s) => { this.recordadminVM_OnInfStrikethruCompleted(s); };
        }
        let strInfType: string = String.Empty;
        if (this.recordadminVM.InfusionType != null && !String.IsNullOrEmpty(this.recordadminVM.InfusionType.Value)) {
            strInfType = this.recordadminVM.InfusionType.Value;
        }
        else if (!String.IsNullOrEmpty(this.recordadminVM.ItemSubType)) {
            strInfType = this.recordadminVM.ItemSubType;
        }
        this.MCVersion = this.recordadminVM.MCVersionNo;
        this.lnPrescriptionOID = this.recordadminVM.PrescriptionItemOID;
        if (!String.IsNullOrEmpty(this.recordadminVM.InfSlotStatus) && ((String.Compare(this.recordadminVM.InfSlotStatus, SlotStatus.NOTYETRECORDED) == 0) || (String.Compare(this.recordadminVM.InfSlotStatus, SlotStatus.OVERDUE) == 0) || (String.Compare(this.recordadminVM.InfSlotStatus, SlotStatus.DUENOW) == 0) || (String.Compare(this.recordadminVM.InfSlotStatus, SlotStatus.PLANNED) == 0) || (String.Compare(this.recordadminVM.InfSlotStatus, SlotStatus.NOTKNOWN) == 0) || (String.Equals(this.recordadminVM.InfSlotStatus, SlotStatus.HOMELEAVE, StringComparison.InvariantCultureIgnoreCase)))) {
            this.iRdbBegun.IsChecked = true;
        }
        else if (!String.IsNullOrEmpty(this.recordadminVM.InfSlotStatus) &&
            ((String.Compare(this.recordadminVM.InfSlotStatus, SlotStatus.INPROGRESS) == 0) ||
                (String.Compare(this.recordadminVM.InfSlotStatus, SlotStatus.STOPPED) == 0) ||
                (String.Compare(this.recordadminVM.InfSlotStatus, SlotStatus.COMPLETED) == 0) ||
                (String.Compare(this.recordadminVM.InfSlotStatus, SlotStatus.PAUSED) == 0) ||
                (String.Compare(this.recordadminVM.InfSlotStatus, SlotStatus.DEFERADMIN) == 0) ||
                (String.Compare(this.recordadminVM.InfSlotStatus, SlotStatus.DEFERDUENOW) == 0) ||
                (String.Compare(this.recordadminVM.InfSlotStatus, SlotStatus.DEFEROVERDUE) == 0) ||
                (String.Compare(this.recordadminVM.InfSlotStatus, SlotStatus.NOTGIVEN) == 0))) {
            if (!String.IsNullOrEmpty(strInfType) && (String.Compare(strInfType, InfusionTypesCode.CONTINUOUS) == 0 ||
                String.Compare(strInfType, InfusionTypesCode.SINGLEDOSEVOLUME) == 0 ||
                String.Compare(strInfType, InfusionTypesCode.FLUID) == 0 ||
                String.Compare(strInfType, InfusionTypesCode.INTERMITTENT) == 0)) {
                let _oInfRecAdmContSummaryView: InfRecAdmContSummaryView = new InfRecAdmContSummaryView();
                //  _oInfRecAdmContSummaryView.DataContext = this.recordadminVM;
                if (!this.ShowLastActionStrikeThrough)
                    _oInfRecAdmContSummaryView.cmdStrikethroadmin.Visibility = Visibility.Collapsed;
                this.ContentCtrlMeddefaultview.Content = _oInfRecAdmContSummaryView;
            }
            else if (String.Compare(strInfType, InfusionTypesCode.PCA) == 0) {
                if (ProfileData.InfusionPresConfig.IsInfusionRatePCA)
                    this.recordadminVM.BackgrdInfRateVisi = Visibility.Visible;
                else {
                    if (!String.IsNullOrEmpty(this.recordadminVM.InfusionRate) && ProfileData.InfusionPresConfig.IsInfusionRatePCA)
                        this.recordadminVM.BackgrdInfRateVisi = Visibility.Visible;
                    else this.recordadminVM.BackgrdInfRateVisi = Visibility.Collapsed;
                }
                this.ContentCtrlMeddefaultview.Content = new InfRecAdmPCASummaryView();
            }
            else if (String.Compare(strInfType, InfusionTypesCode.SUBTYPE_GAS) == 0) {
                this.ContentCtrlMeddefaultview.Content = new InfRecAdmGasSummaryView();
                if (!this.ShowLastActionStrikeThrough)
                    this.recordadminVM.IsStrikeThruVisible = Visibility.Collapsed;
            }
        }
        this.CanBeStruckThrough = oInfrecordadminVM.CanBeStruckThrough;
    }
    constructor() {
        super();

        //   //InitializeComponent();
    }
    public setStrikethroughLastActionVisibility(strInfType: string, oVisibility: Visibility): void {
        if (String.Compare(strInfType, InfusionTypesCode.CONTINUOUS) == 0) {
            (ObjectHelper.CreateType<InfRecAdmContSummaryView>((this.ContentCtrlMeddefaultview.Content), InfRecAdmContSummaryView)).cmdStrikethroadmin.Visibility = oVisibility;
        }
        else if (String.Compare(strInfType, InfusionTypesCode.PCA) == 0) {
            (ObjectHelper.CreateType<InfRecAdmPCASummaryView>((this.ContentCtrlMeddefaultview.Content), InfRecAdmPCASummaryView)).cmdStrikethroadmin.Visibility = oVisibility;
        }
        else if (String.Compare(strInfType, InfusionTypesCode.SUBTYPE_GAS) == 0) {
            (ObjectHelper.CreateType<InfRecAdmGasSummaryView>((this.ContentCtrlMeddefaultview.Content), InfRecAdmGasSummaryView)).cmdStrikethroadmin.Visibility = oVisibility;
        }
        else if (String.Compare(strInfType, InfusionTypesCode.INTERMITTENT) == 0) {
            (ObjectHelper.CreateType<InfRecAdmContSummaryView>((this.ContentCtrlMeddefaultview.Content), InfRecAdmContSummaryView)).cmdStrikethroadmin.Visibility = oVisibility;
        }
    }
    public cmdRequest_Click(): void {
        // ObjectHelper.stopFinishAndCancelEvent(false);
        let IsLaunched: boolean = Common.LaunchReqMed();
    }
    cmddripratecalc_Click(): void {
        this.objadmindripratecalc = new InfDripRateCalculator();
        this.objadmindripratecalc.DataContext = this.objadmindripratecalc;
        AppActivity.OpenWindow("Infusion rate/Drip rate calculator", this.objadmindripratecalc, this.objadmindripratecalc_Closed, "Asprin", false, 620, 520, true, WindowButtonType.OkCancel, null);
    }
    cmdstrikethrough_Click(): void {
        let dtInfusionRecordDttm: DateTime = DateTime.Now;
        if (!String.IsNullOrEmpty(this.recordadminVM.RecordedAtValue)) {
            dtInfusionRecordDttm = Convert.ToDateTime(this.recordadminVM.RecordedAtValue);
        }
        let DrugName: string = this.recordadminVM.DrugName;
        let _nNumberOfDays: number = 0;
        if (ProfileData.SlotCharacteristicsConfig != null && ProfileData.SlotCharacteristicsConfig.SlotModificationTime != null) {
            _nNumberOfDays = ProfileData.SlotCharacteristicsConfig.SlotModificationTime;
        }
        if (DateTime.LessThan(dtInfusionRecordDttm.AddDays(_nNumberOfDays), DateTime.Now)) {
            let iMsgBox: iMessageBox = ObjectHelper.CreateObject(new iMessageBox(), {
                Title: "LORENZO",
                Message: String.Format("The slot selected for {0} is outside the allowed modification time window.",
                    DrugName),
                MessageButton: MessageBoxButton.OK,
                IconType: MessageBoxType.Information,
                Width: 400
            });
            // iMsgBox.MessageBoxClose = new EventHandler<MessageEventArgs>((sender1: Object, e1: MessageEventArgs) => {
            //   return
            // });
            iMsgBox.Show();
            return
        }
        if (!this.CanBeStruckThrough) {
            let iMsgBox: iMessageBox = ObjectHelper.CreateObject(new iMessageBox(), {
                Title: "LORENZO",
                Message: Resource.Strikethrough.SequentialItems,
                MessageButton: MessageBoxButton.OK,
                IconType: MessageBoxType.Information,
                Width: 400
            });
            iMsgBox.MessageBoxClose = (s, ea) => { return };
            iMsgBox.Show();
            return
        }
        this.recordadminVM.StrikeThruActionCode = InfStrikeOutType.EntireAdmin;
        this.recordadminVM.StrikeThruAction = Resource.InfRecAdministartion.StrikeThruEntireAdmin_Text;
        this.objstrikethrough = new InfRecAdmStrikeThrough(this.recordadminVM);
        this.objstrikethrough.DataContext = this.recordadminVM;
        Common.LaunchStrikeThroughWindow(this.objstrikethrough, this.objstrikethrough_Closed, 210, 450, this.recordadminVM.RecordedAtValue, this.recordadminVM.DrugName);
    }
    objstrikethrough_Closed(args: AppDialogEventargs): void {
        if (args.Result == AppDialogResult.Ok) {
            if (!this.recordadminVM.InfStrikethruValidation()) {
                this.recordadminVM.SubmitInfStrikethruAdmin(null);
                args.AppChildWindow.DialogResult = true;
            }
        }
        else if (args.Result == AppDialogResult.Cancel) {
            args.AppChildWindow.DialogResult = false;
            this.recordadminVM.ReasonforStrikethrough = null;
        }
    }
    objadmindripratecalc_Closed(args: AppDialogEventargs): void {
        if (args.Result == AppDialogResult.Ok) {
            args.AppChildWindow.DialogResult = false;
        }
        else if (args.Result == AppDialogResult.Cancel) {
            args.AppChildWindow.DialogResult = false;
        }
    }
    cmdbagdetails_Click(): void {
        let oHdrAddnlInfo: CDrugHdrAddnlInfo = new CDrugHdrAddnlInfo();
        this.objadminbagdetails = new InfRecAdmBagDetails(this.recordadminVM);
        this.objadminbagdetails.onDialogClose = this.objadminbagdetails_Closed;
        //  this.objadminbagdetails.BagHeaderDisplay =  (new DisplayPrescriptionLineItem()).Convert(this.objDrugHeader.DataContext, null, 200, null).ChildrenElementArray[0]
        this.objadminbagdetails.BagHeaderDisplay = (new InfusionHeaderItem()).Convert(this.recordadminVM, null, 200, null).ChildrenElementArray[0]
        AppActivity.OpenWindow("Bag details", this.objadminbagdetails, this.objadminbagdetails_Closed, "Bag details", false, 300, 805, false, WindowButtonType.Close, null);
    }
    objadminbagdetails_Closed(args: AppDialogEventargs): void {
        if (args.Result == AppDialogResult.Close) {
            args.AppChildWindow.DialogRef.close();
        }
        else if (args.Result == AppDialogResult.Cancel) {
            args.AppChildWindow.DialogRef.close();
        }
    }
    cmdconditionaldose_Click(): void {
        this.ConditionalChildView = new InfRecAdmConditionalDose();
        this.ConditionalChildView.DataContext = this.ConditionalChildView;
        AppActivity.OpenWindow("Select dose", this.ConditionalChildView, this.cmdconditionaldose_Closed, "Asprin", false, 440, 400, true, WindowButtonType.OkCancel, null);
    }
    cmdconditionaldose_Closed(args: AppDialogEventargs): void {
        if (args.Result == AppDialogResult.Ok) {
            args.AppChildWindow.DialogResult = false;
        }
        else if (args.Result == AppDialogResult.Cancel) {
            args.AppChildWindow.DialogResult = false;
        }
    }
    public cmdObservationsResults_Click(): void {
        let bResult: boolean = Common.LaunchObservation(this.recordadminVM.PrescriptionItemOID,
            this.recordadminVM.IdentifyingType,
            this.recordadminVM.IdentifyingOID,
            this.recordadminVM.MCVersionNo, this.recordadminVM.DrugName, this.recordadminVM.ItemSubType, this.recordadminVM.Multicomponentitem, this.recordadminVM.Lorenzoid, this.ObservationFinished);
    }
    public ObservationFinished(args: ChildWizardCloseEventargs): void {
        // let top: any = window.top;
        // if (top.msgAlert == false) {
        //     ObjectHelper.stopFinishAndCancelEvent(true);
        // }
        let sContData: string = String.Empty;
        if (args != null && !String.IsNullOrEmpty(args.ContextData))
            sContData = args.ContextData;
        if (this.recordadminVM.ConditionalVM != null && sContData.Contains("RECORDENTERED=True")) {
            let oReq: CReqMsgGetLatestObsOrResultDetails = new CReqMsgGetLatestObsOrResultDetails();
            oReq.oContextInformation = Common.FillContext();
            let oPatLatObsResParam: CPatLatestObsResParams = new CPatLatestObsResParams();
            oPatLatObsResParam.EncounterOID = PatientContext.EncounterOid;
            oPatLatObsResParam.PatientOID = PatientContext.PatientOID;
            oPatLatObsResParam.EntityType = this.recordadminVM.ConditionalVM.ItmType;
            oPatLatObsResParam.IdValue = this.recordadminVM.ConditionalVM.EntityCode;
            oReq.oPatLatObsResParamsBC = oPatLatObsResParam;
            let serviceProxy: MedicationAdministrationWSSoapClient = new MedicationAdministrationWSSoapClient();
            serviceProxy.GetLatestObsOrResultDetailsCompleted = (s, e) => { this.serviceProxy_GetLatestObsOrResultDetailsCompleted(s, e); };
            serviceProxy.GetLatestObsOrResultDetailsAsync(oReq);
        }
    }
    public serviceProxy_GetLatestObsOrResultDetailsCompleted(sender: Object, e: GetLatestObsOrResultDetailsCompletedEventArgs): void {
        if (e.Error != null)
            return
        let oResGetLatestObsOrResultDetails: CResMsgGetLatestObsOrResultDetails = e.Result;
        if (oResGetLatestObsOrResultDetails != null && oResGetLatestObsOrResultDetails.oPatLatObsResVal != null && oResGetLatestObsOrResultDetails.oPatLatObsResVal.EntityDetails != null) {
            if (!String.IsNullOrEmpty(oResGetLatestObsOrResultDetails.oPatLatObsResVal.EntityDetails) && (DateTime.NotEquals(oResGetLatestObsOrResultDetails.oPatLatObsResVal.RecordedDate, DateTime.MinValue)) && (DateTime.GreaterThanOrEqualTo(oResGetLatestObsOrResultDetails.oPatLatObsResVal.RecordedDate, this.recordadminVM.ConditionalVM.PresItemStartDTTM)))
                this.recordadminVM.ConditionalVM.LatestObservationResultDetails = oResGetLatestObsOrResultDetails.oPatLatObsResVal.EntityDetails + " on " + oResGetLatestObsOrResultDetails.oPatLatObsResVal.RecordedDate.ToString(CConstants.DateTimeFormat);
        }
    }
    public barcodeStyleFocus = false;
    public cmdWristbandScan_Click(): void {
        this.txtBarcodeInfusion.nativeElement.focus();        
    }
    public txtBarcode_LostFocus(e): void {
          e.target.value = String.Empty;
          this.barcodeStyleFocus = false;
    }
    public txtBarcode_GotFocus(e): void {
        e.target.value = String.Empty;
        this.barcodeStyleFocus = true;
    }

    public txtBarcode_KeyDowns(event: KeyboardEvent): void {

        // console.log(e.target.value,e.key);
        
          
            
            //   if (e.key == 'Enter') {
            //     console.log('bar001',e.key,new Date());
            //     let oManageBarcodeHelper: ManageBarcodeHelper = new ManageBarcodeHelper();
            //     oManageBarcodeHelper.GetPatientQuickSearchDetails(this.txtBarcodeInfusion.Text, this.recordadminVM != null ? this.recordadminVM.PresScheduleOID : 0);
            //     this.txtBarcodeInfusion.Text = String.Empty;
            //     this.recordadminVM.IsPatWristBandOverridden = false;
            // }
    }
    public txtBarcode_KeyDown(e): void {
                let oManageBarcodeHelper: ManageBarcodeHelper = new ManageBarcodeHelper();
                oManageBarcodeHelper.GetPatientQuickSearchDetails(e.target.value, this.recordadminVM != null ? this.recordadminVM.PresScheduleOID : 0);
                setTimeout(() => {
                    e.target.value = String.Empty;
                }, 400);
                this.recordadminVM.IsPatWristBandOverridden = false;
    }
    oiMessageBox_Closed(sender: Object, e: EventArgs): void {
        let objiMessageBox: iMessageBox = ObjectHelper.CreateType<iMessageBox>(sender, iMessageBox);
    }
    recordadminVM_OnInfStrikethruCompleted(oSlotDetail: SlotDetail): void {
        this.recordadminVM.RaiseInfRecordAdminServiceCompleted(oSlotDetail);
        if (this.appDialog != null) {
            this.appDialog.DialogResult = true;

        }
        if (this.dupDialogRef != null)
            this.dupDialogRef.close();
    }
    public medsInfurecordadminmainview_Loaded(): void {
        if (this.cmdRequest) {
            this.cmdRequest.Visibility = MedChartData.bRequestMedicationVisible ? Visibility.Visible : Visibility.Collapsed;
        }
        if ((ObjectHelper.CreateType<InfrecordadminVM>(this.DataContext, InfrecordadminVM)) != null && String.Compare((ObjectHelper.CreateType<InfrecordadminVM>(this.DataContext, InfrecordadminVM)).CACode, CALaunch.FluidBalnce.ToString()) == 0) {
            let lnPatOID: number, lnMedAdminOID: number;
            let oInfusionRecAdminHelper: InfusionRecAdminHelper = new InfusionRecAdminHelper();
            oInfusionRecAdminHelper.oRecordAdminVM = ObjectHelper.CreateType<InfrecordadminVM>(this.DataContext, InfrecordadminVM);
            oInfusionRecAdminHelper.oRecordAdminMainView = this;
            if (ContextManager.Instance["PATIENTOID"] != null && ContextManager.Instance["MEDADMINOID"] != null) {
                if (Number.TryParse(ContextManager.Instance["PATIENTOID"].ToString(), (o) => { lnPatOID = o; }) && Number.TryParse(ContextManager.Instance["MEDADMINOID"].ToString(), (o) => { lnMedAdminOID = o; }))
                    oInfusionRecAdminHelper.LaunchInfRecordAdminForFB(lnMedAdminOID, lnPatOID);
            }
        }
        else {
            Busyindicator.SetStatusIdle("InfusionChart");
            if (this.recordadminVM) {
                this.recordadminVM.OnInfStrikethruCompleted = (s) => { this.recordadminVM_OnInfStrikethruCompleted(s); };
            }
            if (!String.IsNullOrEmpty(this.recordadminVM.InfusionType.Value) && (String.Compare(this.recordadminVM.InfusionType.Value, InfusionTypesCode.SUBTYPE_GAS) != 0)) {
                if ((!String.IsNullOrEmpty(this.recordadminVM.PrevInfusionActionCode) && (String.Compare(this.recordadminVM.PrevInfusionActionCode, MedicationAction.PAUSE) == 0))) {
                    this.iRdbpausehidden = false;
                    this.iRdbresume.Margin = new Thickness(3, 0, 3, 0);
                    this.iRdbstop.Margin = new Thickness(3, 0, 3, 0);
                    this.iRdbcomplete.Margin = new Thickness(3, 0, 3, 0);
                }
                else {
                    this.iRdbresumehidden = false;
                    this.iRdbstop.Margin = new Thickness(3, 0, 3, 0);
                    this.iRdbcomplete.Margin = new Thickness(3, 0, 3, 0);
                }
            }
            if (!String.IsNullOrEmpty(this.recordadminVM.InfSlotStatus) && !String.IsNullOrEmpty(this.recordadminVM.InfusionType.Value) && (String.Compare(this.recordadminVM.InfusionType.Value, InfusionTypesCode.INTERMITTENT) == 0) && this.recordadminVM.IsPRN) {
                this.iRdbNotGivenhidden = false;
                this.iRdbdeferedhidden = false;
                this.iRdbcomplete.Margin = new Thickness(3, 0, 3, 0);
            }
            else if (!String.IsNullOrEmpty(this.recordadminVM.ItemSubType) && String.Compare(this.recordadminVM.ItemSubType, InfusionTypesCode.SUBTYPE_GAS) == 0) {
                if ((!String.IsNullOrEmpty(this.recordadminVM.PrevInfusionActionCode) && (String.Compare(this.recordadminVM.PrevInfusionActionCode, MedicationAction.PAUSE) == 0))) {
                    this.iRdbchangebaghidden = false;
                    this.iRdbpausehidden = false;
                    this.iRdbresume.Margin = new Thickness(3, 0, 3, 0);
                    this.iRdbstop.Margin = new Thickness(3, 0, 3, 0);
                    this.iRdbcomplete.Margin = new Thickness(3, 0, 3, 0);
                }
                else {
                    this.iRdbchangebaghidden = false;
                    this.iRdbresumehidden = false;
                    this.iRdbpause.Margin = new Thickness(3, 0, 3, 0);
                    this.iRdbstop.Margin = new Thickness(3, 0, 3, 0);
                    this.iRdbcomplete.Margin = new Thickness(3, 0, 3, 0);
                }
            }
            else if (!String.IsNullOrEmpty(this.recordadminVM.InfusionType.Value) && String.Compare(this.recordadminVM.InfusionType.Value, InfusionTypeCode.PCA) == 0 && (this.recordadminVM.BackgrdInfRateVisi == Visibility.Collapsed)) {
                this.iRdbchgflowratehidden = false;
                this.iRdbchangebag.Margin = new Thickness(3, 0, 3, 0);
            }
            this.recordadminVM.FormVM.OnValidationFailed = (s, e) => { this.ShowValidationMessage(s, e); };
            this.recordadminVM.OnCheckWarningMessage = (s, e) => { this.CheckWarningMessages(s, e); };
            this.recordadminVM.SetInfusionActions();
        }
    }

    public MainViewLoad(): void {
        Busyindicator.SetStatusIdle("InfusionChart");
        if (this.recordadminVM != null) {
            this.recordadminVM.OnInfStrikethruCompleted = (s) => { this.recordadminVM_OnInfStrikethruCompleted(s); };
        }
        if (!String.IsNullOrEmpty(this.recordadminVM.InfusionType.Value) && (String.Compare(this.recordadminVM.InfusionType.Value, InfusionTypesCode.SUBTYPE_GAS) != 0) && !this.recordadminVM.IsPRN) {
            if ((!String.IsNullOrEmpty(this.recordadminVM.PrevInfusionActionCode) && (String.Compare(this.recordadminVM.PrevInfusionActionCode, MedicationAction.PAUSE) == 0))) {
                this.iRdbpausehidden = false;
                this.iRdbresume.Margin = new Thickness(3, 0, 3, 0);
                this.iRdbstop.Margin = new Thickness(3, 0, 3, 0);
                this.iRdbcomplete.Margin = new Thickness(3, 0, 3, 0);
            }
            else {
                this.iRdbresumehidden = false;
                this.iRdbstop.Margin = new Thickness(3, 0, 3, 0);
                this.iRdbcomplete.Margin = new Thickness(3, 0, 3, 0);
            }
        }
        else if (!String.IsNullOrEmpty(this.recordadminVM.InfSlotStatus) && !String.IsNullOrEmpty(this.recordadminVM.InfusionType.Value) && (String.Compare(this.recordadminVM.InfusionType.Value, InfusionTypesCode.INTERMITTENT) == 0) && this.recordadminVM.IsPRN) {
            this.iRdbNotGivenhidden = false;
            this.iRdbdeferedhidden = false;
            this.iRdbcomplete.Margin = new Thickness(3, 0, 3, 0);
        }
        else if (!String.IsNullOrEmpty(this.recordadminVM.ItemSubType) && String.Compare(this.recordadminVM.ItemSubType, InfusionTypesCode.SUBTYPE_GAS) == 0) {
            this.iRdbchangebaghidden = false;
            this.iRdbcomplete.Margin = new Thickness(3, 0, 3, 0);
        }
        else if (!String.IsNullOrEmpty(this.recordadminVM.InfusionType.Value) && String.Compare(this.recordadminVM.InfusionType.Value, InfusionTypeCode.PCA) == 0 && (this.recordadminVM.BackgrdInfRateVisi == Visibility.Collapsed)) {
            this.iRdbchgflowratehidden = false;
            this.iRdbchangebag.Margin = new Thickness(3, 0, 3, 0);
        }
        this.recordadminVM.FormVM.OnValidationFailed = (s, e) => { this.ShowValidationMessage(s, e); };
        this.recordadminVM.SetInfusionActions();
    }
    ShowValidationMessage(ResourceKey: string, Fieldname: string, ...ValidationMsgParams: string[]): void {
        let objiMessageBox: iMessageBox = new iMessageBox();
        // objiMessageBox.Closed = (s, e) => { this.OnMessagebox_Closed(s, e); };
        // let sMsgText: any = Resource.InfRecAdministartion; // string replaced by any
        let sMsgText: any = ResourceManager.GetString(ResourceKey, null);
        // if (ValidationMsgParams != null)
        //     sMsgText = String.Format(sMsgText, ValidationMsgParams);
        objiMessageBox.Message = sMsgText;
        objiMessageBox.IconType = MessageBoxType.Information;
        objiMessageBox.Title = "LORENZO";
        objiMessageBox.Tag = Fieldname;
        objiMessageBox.sender = objiMessageBox;
        objiMessageBox.MessageButton = MessageBoxButton.OK;
        objiMessageBox.Closed = (s, e) => { Object.keys(that).forEach((prop) => (this[prop] = that[prop])); this.OnMessagebox_Closed(objiMessageBox, e); };
        objiMessageBox.Show();
    }
    OnMessagebox_Closed(sender: Object, e: EventArgs): void {
        let CtlrName: string = String.Empty;
        if ((<iMessageBox>(sender)).Tag != null) {
            CtlrName = (<iMessageBox>(sender)).Tag.ToString();
            this.InfRecordShowErrorMsgCompleted(CtlrName);
        }
    }
    public medsInfurecordadminmainview_Unloaded(): void {
        if (this.recordadminVM != null) {
            // this.recordadminVM.FormVM.OnValidationFailed -= ShowValidationMessage;
            // this.recordadminVM.OnInfStrikethruCompleted -= recordadminVM_OnInfStrikethruCompleted;
            // this.recordadminVM.OnCheckWarningMessage -= CheckWarningMessages;
        }
        this.oInfRecAdmContBegun = null;
        this.oInfRecAdmContDefer = null;
        this.oInfRecAdmContResume = null;
        this.oInfRecAdmContStop = null;
        this.oInfRecAdmPCAChangeBag = null;
        this.oInfRecAdmCSFChangeBag = null;
        this.oInfRecAdmContChangeFlowRate = null;
        this.oInfRecAdmCSFStopComplete = null;
        ContextManager.Instance["PATIENTOID"] = null;
        ContextManager.Instance["MEDADMINOID"] = null;
    }
   
    public InfRecordShowErrorMsgCompleted(CtlrName: string): void {
       

        let oUserControl: UserControl = ObjectHelper.CreateType<UserControl>(this.RenderedControl, UserControl);
        let oCtrl: Control = null;
        if (oUserControl != null) {
            oCtrl = ObjectHelper.CreateType<Control>(oUserControl.FindName(CtlrName), Control);
            
            if (oCtrl == null) {
                oUserControl = ObjectHelper.CreateType<UserControl>(this.ContentCtrlRetrospective.Content, UserControl);
                if (oUserControl != null) {
                    oCtrl = ObjectHelper.CreateType<Control>(oUserControl.FindName(CtlrName), Control);
                }
                else if (oCtrl == null) {
                    oUserControl = ObjectHelper.CreateType<UserControl>(this.ContentCtrlRetrospectivegas.Content, UserControl);
                    if (oUserControl != null) {
                        oCtrl = ObjectHelper.CreateType<Control>(oUserControl.FindName(CtlrName), Control);
                    }
                }
            }
            if (oCtrl != null) {
                // let oCtrlty: oControl  = oCtrl.GetType();
                if (oCtrl instanceof iTextBox) {
                    if ((ObjectHelper.CreateType<iTextBox>(oCtrl, iTextBox)).Text == "0")
                        (ObjectHelper.CreateType<iTextBox>(oCtrl, iTextBox)).Text = "";
                }

                oCtrl.Focus();
            }
        }
    }
    public iRdbBegun_Checked(): void {
        this.LoadInfActionForm(MedicationAction.BEGUN);
        if (this.ContentCtrlMeddefaultview.Content != null && ((this.ContentCtrlMeddefaultview.Content instanceof InfRecAdmContBegun) || (this.ContentCtrlMeddefaultview.Content instanceof InfRecAdmGasBegun)) && ((String.Compare(this.recordadminVM.InfSlotStatus, SlotStatus.NOTYETRECORDED) == 0) || (String.Compare(this.recordadminVM.InfSlotStatus, SlotStatus.NOTKNOWN) == 0) || (String.Equals(this.recordadminVM.InfSlotStatus, SlotStatus.HOMELEAVE, StringComparison.InvariantCultureIgnoreCase)))) {
            if (this.recordadminVM.InfusionType != null && !String.IsNullOrEmpty(this.recordadminVM.InfusionType.Value) && ((String.Compare(this.recordadminVM.InfusionType.Value, InfusionTypesCode.INTERMITTENT) == 0 || ((String.Compare(this.recordadminVM.InfusionType.Value, InfusionTypesCode.CONTINUOUS) == 0 || String.Equals(this.recordadminVM.InfusionType.Value, InfusionTypesCode.SINGLEDOSEVOLUME, StringComparison.InvariantCultureIgnoreCase) || String.Equals(this.recordadminVM.InfusionType.Value, InfusionTypesCode.FLUID, StringComparison.InvariantCultureIgnoreCase)) && String.Equals(this.recordadminVM.PrescriptionItemStatus, CConstants.COMPLETED, StringComparison.CurrentCultureIgnoreCase) && String.Equals(this.recordadminVM.InfSlotStatus, SlotStatus.NOTKNOWN, StringComparison.CurrentCultureIgnoreCase)) || ((String.Compare(this.recordadminVM.InfusionType.Value, InfusionTypesCode.CONTINUOUS) == 0 || String.Equals(this.recordadminVM.InfusionType.Value, InfusionTypesCode.SINGLEDOSEVOLUME, StringComparison.InvariantCultureIgnoreCase) || String.Equals(this.recordadminVM.InfusionType.Value, InfusionTypesCode.FLUID, StringComparison.InvariantCultureIgnoreCase)) && String.Equals(this.recordadminVM.PrescriptionItemStatus, CConstants.DISCONTINUED, StringComparison.CurrentCultureIgnoreCase) && String.Equals(this.recordadminVM.InfSlotStatus, SlotStatus.NOTKNOWN, StringComparison.CurrentCultureIgnoreCase)) || (String.Compare(this.recordadminVM.InfusionType.Value, InfusionTypesCode.PCA) == 0 && String.Equals(this.recordadminVM.PrescriptionItemStatus, CConstants.COMPLETED, StringComparison.CurrentCultureIgnoreCase) && String.Equals(this.recordadminVM.InfSlotStatus, SlotStatus.NOTKNOWN, StringComparison.CurrentCultureIgnoreCase)) || (String.Compare(this.recordadminVM.ItemSubType, InfusionTypesCode.SUBTYPE_GAS) == 0 && String.Equals(this.recordadminVM.PrescriptionItemStatus, CConstants.COMPLETED, StringComparison.CurrentCultureIgnoreCase) && String.Equals(this.recordadminVM.InfSlotStatus, SlotStatus.NOTKNOWN, StringComparison.CurrentCultureIgnoreCase))) && (String.Compare(this.recordadminVM.IsCALaunchCode, CALaunch.InfusionChart.ToString()) == 0)) || ((String.Compare(this.recordadminVM.IsCALaunchCode, CALaunch.OverviewChart.ToString()) == 0) && (String.Compare(this.recordadminVM.InfusionType.Value, InfusionTypesCode.CONTINUOUS) == 0 || String.Compare(this.recordadminVM.InfusionType.Value, InfusionTypesCode.PCA) == 0 || String.Compare(this.recordadminVM.InfusionType.Value, InfusionTypesCode.INTERMITTENT) == 0 || (String.Equals(this.recordadminVM.InfusionType.Value, InfusionTypesCode.FLUID, StringComparison.InvariantCultureIgnoreCase)) || (String.Equals(this.recordadminVM.InfusionType.Value, InfusionTypesCode.SINGLEDOSEVOLUME, StringComparison.InvariantCultureIgnoreCase))))) {
                this.recordadminVM.IsChkReStop = true;
                this.recordadminVM.IsVisibleRestrostopcomplete = Visibility.Visible;
                if (this.appDialog != null && this.appDialog.Height > 0) {
                    if (String.Compare(this.recordadminVM.ItemSubType, InfusionTypesCode.SUBTYPE_GAS) != 0)
                        this.appDialog.Height = 750;
                    else if (String.Equals(this.recordadminVM.ItemSubType, InfusionTypesCode.SUBTYPE_GAS, StringComparison.CurrentCultureIgnoreCase))
                        this.appDialog.Height = 700;
                }
            }
            else if (!String.IsNullOrEmpty(this.recordadminVM.ItemSubType) && String.Compare(this.recordadminVM.ItemSubType, InfusionTypesCode.SUBTYPE_GAS) == 0 && String.Compare(this.recordadminVM.IsCALaunchCode, CALaunch.OverviewChart.ToString()) == 0) {
                this.recordadminVM.IsVisibleRestrostopcomplete = Visibility.Visible;
                if (this.appDialog != null && this.appDialog.Height > 0)
                    this.appDialog.Height = 700;
            }
            else {
                this.recordadminVM.IsVisibleRestrospectivegas = Visibility.Collapsed;
            }
        }
        this.cmdbagdetails.Visibility = Visibility.Collapsed;
        this.cmdStrikethroughadmin.Visibility = Visibility.Collapsed;
        this.CriticalMedMsg.Visibility = Visibility.Collapsed;
        if (!this.recordadminVM.IsMedScanExcluded) {
            this.recordadminVM.IsScanRecMedVisible = Visibility.Visible;
        }
        if (!ProfileData.ChartSettingsConfig.IsChangeFlowRateEnabled && !String.IsNullOrEmpty(this.recordadminVM.DontChangeInfRateDefValue) && !String.Equals(this.recordadminVM.DontChangeInfRateDefValue, "0")) {
            this.recordadminVM.IsEnableInfusionrate = false;
            this.recordadminVM.IsMandatoryInfusionrate = false;
            if (String.Equals(this.recordadminVM.ItemSubType, InfusionTypesCode.SUBTYPE_GAS, StringComparison.CurrentCultureIgnoreCase)) {
                let oGas: InfRecAdmGasBegun = ObjectHelper.CreateType<InfRecAdmGasBegun>(this.ContentCtrlMeddefaultview.Content, InfRecAdmGasBegun);
                oGas.lblinfuconuom.Mandatory = false;
                oGas.lblFlowrate.Mandatory = false;
            }
        }
        if (((String.IsNullOrEmpty(this.recordadminVM.DontChangeInfRateDefValue) && String.IsNullOrEmpty(this.recordadminVM.InfusionRate)) || this.recordadminVM.DontChangeInfRateDefValue == this.recordadminVM.InfusionRate) && ((this.recordadminVM.InfusionRateUOMNumerator == null && this.recordadminVM.DontChangeInfRateDefUOMOID <= 0) || (this.recordadminVM.InfusionRateUOMNumerator != null && this.recordadminVM.DontChangeInfRateDefUOMOID.ToString() == this.recordadminVM.InfusionRateUOMNumerator.Value)) && ((this.recordadminVM.InfusionRateUOMDenominator == null && this.recordadminVM.DontChangeInfRateDefPerUOMOID <= 0) || (this.recordadminVM.InfusionRateUOMDenominator != null && this.recordadminVM.DontChangeInfRateDefPerUOMOID.ToString() == this.recordadminVM.InfusionRateUOMDenominator.Value)) || (String.IsNullOrEmpty(this.recordadminVM.DontChangeInfRateDefValue) || String.Equals(this.recordadminVM.DontChangeInfRateDefValue, "0")))
            this.recordadminVM.IsClinicalRSNMand = false;
        else this.recordadminVM.IsClinicalRSNMand = true;
        if (this.recordadminVM.InfusionType != null && !String.IsNullOrEmpty(this.recordadminVM.InfusionType.Value)) {
            if (String.Equals(this.recordadminVM.InfusionType.Value, InfusionTypeCode.FLUID)) {
                let oFluid: InfRecAdmContBegun = ObjectHelper.CreateType<InfRecAdmContBegun>(this.ContentCtrlMeddefaultview.Content, InfRecAdmContBegun);
                oFluid.lblInfusiondose.Visibility = Visibility.Collapsed;
                oFluid.stkInfudose.Visibility = Visibility.Collapsed;
            }
            if (this.recordadminVM.IsCtrlConcentration == Visibility.Visible && (String.Equals(this.recordadminVM.InfusionType.Value, InfusionTypeCode.CONTINUOUS) || String.Equals(this.recordadminVM.InfusionType.Value, InfusionTypeCode.SINGLEDOSEVOLUME))) {
                if (this.recordadminVM.IsInfRateVolBased) {
                    this.recordadminVM.IsMandatoryForBegunConcentration = false;
                }
                else {
                    this.recordadminVM.IsMandatoryForBegunConcentration = true;
                }
            }
        }
    }
    public iRdbDfrAdmin_Checked(): void {
        this.deferChcked = true;
        this.notGivenChked = false;
        this.pauseChked = false;
        this.resumeChcked = false;
        this.LoadInfActionForm(SlotStatus.DEFERADMIN);
        if (this.contdefer) {
            this.isRdbDfrAdmin_CheckedExtension(this.contdefer)
        }
    }
    private isRdbDfrAdmin_CheckedExtension(e: InfRecAdmContDefer) {
        // let oDfr: InfRecAdmContDefer = ObjectHelper.CreateType<InfRecAdmContDefer>(this.ContentCtrlMeddefaultview.Content, InfRecAdmContDefer);
        let oDfr: InfRecAdmContDefer = e;
        oDfr.brdreason.Visibility = Visibility.Collapsed;
        oDfr.lbldateTime.Visibility = Visibility.Collapsed;
        oDfr.dtpDate.Visibility = Visibility.Collapsed;
        oDfr.idatetime.Visibility = Visibility.Collapsed;

        //revisitmeyasik starts
        // oDfr.cboreason.SelectedValue = null;
        //this.recordadminVM.ReasonForNotDefer = null;

        oDfr.cboreason.ItemsSource = this.recordadminVM.ReasonForNotDefers;

        // oDfr.cboreason.ClearValue();
        // oDfr.cboreason.SetBinding(iComboBox.ItemsSourceProperty, ObjectHelper.CreateObject(new Binding("ReasonForNotDefers"), { Mode: BindingMode.TwoWay }));
        // oDfr.cboreason.SetBinding(iComboBox.SelectedValueProperty, ObjectHelper.CreateObject(new Binding("ReasonForNotDefer"), { Mode: BindingMode.TwoWay }));
        //revisitmeyasik ends

        oDfr.lblReason.Text = Resource.MedicationAdministrator.lblResonForDefer_text;
        oDfr.lblReason.Tooltip = Resource.MedicationAdministrator.lblResonForDefer_text;
        ToolTipService.SetToolTip(oDfr.cboreason, MedicationAdministrator.txtReasonFordefer_tooltip);
        this.cmdbagdetails.Visibility = Visibility.Collapsed;
        this.cmdStrikethroughadmin.Visibility = Visibility.Collapsed;
        this.recordadminVM.ReasonForNotDefer = null;
        this.recordadminVM.IsClinicalRSNMand = false;
        if (this.recordadminVM.IsCriticalMed) {
            if (this.recordadminVM.CriticalMedsRoutes != null) {
                let RT: string[] = this.recordadminVM.CriticalMedsRoutes.Split('/');
                let s: StringBuilder = new StringBuilder();
                s.Append("This medication has been deemed critical by your organisation when being administered via the ");
                for (let i: number = 0; i < RT.Count(); i++) {
                    if (i == 0) {
                        s.Append(RT[i].Trim());
                    }
                    else {
                        s.Append("/ " + RT[i].Trim());
                    }
                }
                if (RT.Count() == 1) {
                    s.Append(" route. " + this.recordadminVM.CriticalMedsMsg);
                }
                else {
                    s.Append(" routes. " + this.recordadminVM.CriticalMedsMsg);
                }
                this.critical.Text = s.ToString();
            }
            else {
                this.critical.Text = this.recordadminVM.CriticalMedsMsg;
            }
            if (String.IsNullOrEmpty(this.recordadminVM.CriticalMedsURL) || String.Equals(this.recordadminVM.CriticalMedsURL, "http://", StringComparison.InvariantCultureIgnoreCase) || String.Equals(this.recordadminVM.CriticalMedsURL, "https://", StringComparison.InvariantCultureIgnoreCase)) {
                this.CriticalDrugSiteURL.Visibility = Visibility.Collapsed;
            }
            this.CriticalMedMsg.Visibility = Visibility.Visible;
        }
        this.recordadminVM.IsScanRecMedVisible = Visibility.Collapsed;
    }
    public iRdbNotgiven_Checked(): void {
        this.deferChcked = false;
        this.notGivenChked = true;
        this.pauseChked = false;
        this.resumeChcked = false;
        this.LoadInfActionForm(SlotStatus.NOTGIVEN);
        if (this.contdefer) {
            this.isRdbNotgiven_CheckedExtension(this.contdefer)
        }
    }
    private isRdbNotgiven_CheckedExtension(e: InfRecAdmContDefer) {
        // let oDfr: InfRecAdmContDefer = ObjectHelper.CreateType<InfRecAdmContDefer>(this.ContentCtrlMeddefaultview.Content, InfRecAdmContDefer);
        let oDfr: InfRecAdmContDefer = e;
        oDfr.brdreason.Visibility = Visibility.Collapsed;
        oDfr.lbldateTime.Visibility = Visibility.Collapsed;
        oDfr.dtpDate.Visibility = Visibility.Collapsed;
        oDfr.idatetime.Visibility = Visibility.Collapsed;

        //revisitmeyasik starts
        // oDfr.cboreason.ClearValue();
        // reasonNotGivens
        //  oDfr.cboreason.SelectedValue = null;

        //this.recordadminVM.ReasonNotGiven = null;
        oDfr.cboreason.ItemsSource = this.recordadminVM.ReasonNotGivens;
        // oDfr.cboreason.SetBinding(iComboBox.ItemsSourceProperty, ObjectHelper.CreateObject(new Binding("ReasonNotGivens"), { Mode: BindingMode.TwoWay }));
        // oDfr.cboreason.SetBinding(iComboBox.SelectedValueProperty, ObjectHelper.CreateObject(new Binding("ReasonNotGiven"), { Mode: BindingMode.TwoWay }));
        //revisitmeyasik ends

        oDfr.lblReason.Text = Resource.MedicationAdministrator.lblResNotGiven_text;
        oDfr.lblReason.Tooltip = Resource.MedicationAdministrator.lblResNotGiven_text;
        ToolTipService.SetToolTip(oDfr.cboreason, MedicationAdministrator.txtResMedicationNotGiven_tooltip);
        this.cmdbagdetails.Visibility = Visibility.Collapsed;
        this.cmdStrikethroughadmin.Visibility = Visibility.Collapsed;
        this.recordadminVM.IsClinicalRSNMand = false;
        this.recordadminVM.IsVisibleRestrostopcomplete = Visibility.Collapsed;
        this.recordadminVM.IsVisibleRestrospectivegas = Visibility.Collapsed;
        if (this.recordadminVM.IsCriticalMed) {
            if (this.recordadminVM.CriticalMedsRoutes != null) {
                let RT: string[] = this.recordadminVM.CriticalMedsRoutes.Split('/');
                let s: StringBuilder = new StringBuilder();
                s.Append("This medication has been deemed critical by your organisation when being administered via the ");
                for (let i: number = 0; i < RT.Count(); i++) {
                    if (i == 0) {
                        s.Append(RT[i].Trim());
                    }
                    else {
                        s.Append("/ " + RT[i].Trim());
                    }
                }
                if (RT.Count() == 1) {
                    s.Append(" route. " + this.recordadminVM.CriticalMedsMsg);
                }
                else {
                    s.Append(" routes. " + this.recordadminVM.CriticalMedsMsg);
                }
                this.critical.Text = s.ToString();
            }
            else {
                this.critical.Text = this.recordadminVM.CriticalMedsMsg;
            }
            if (String.IsNullOrEmpty(this.recordadminVM.CriticalMedsURL) || String.Equals(this.recordadminVM.CriticalMedsURL, "http://", StringComparison.InvariantCultureIgnoreCase) || String.Equals(this.recordadminVM.CriticalMedsURL, "https://", StringComparison.InvariantCultureIgnoreCase)) {
                this.CriticalDrugSiteURL.Visibility = Visibility.Collapsed;
            }
            this.CriticalMedMsg.Visibility = Visibility.Visible;
        }
        this.recordadminVM.IsScanRecMedVisible = Visibility.Collapsed;
    }
    public CriticalURL_Clilck(): void {
        let objCriticalURLContentInfo: Object[] = null;
        objCriticalURLContentInfo = new Array(1);
        objCriticalURLContentInfo[0] = this.recordadminVM.CriticalMedsURL;
        let returnValue: Object = HtmlPage.Window.Invoke("LaunchCriticalURLLink", objCriticalURLContentInfo);
    }
    public iRdbpauseAdmin_Checked(): void {
        this.deferChcked = false;
        this.notGivenChked = false;
        this.pauseChked = true;
        this.resumeChcked = false;
        //  this.isResumeVisible = true;
        this.LoadInfActionForm(MedicationAction.PAUSE);
        if (this.contdefer) {
            this.isRdbpauseAdmin_CheckedExtension(this.contdefer)
        }
    }
    private isRdbpauseAdmin_CheckedExtension(e: InfRecAdmContDefer) {
        if (this.recordadminVM.InfusionType != null && !String.IsNullOrEmpty(this.recordadminVM.InfusionType.Value) && ((String.Compare(this.recordadminVM.InfusionType.Value, InfusionTypeCode.CONTINUOUS) == 0) || (String.Compare(this.recordadminVM.InfusionType.Value, InfusionTypeCode.SINGLEDOSEVOLUME) == 0) || (String.Compare(this.recordadminVM.InfusionType.Value, InfusionTypeCode.FLUID) == 0) || (String.Compare(this.recordadminVM.InfusionType.Value, InfusionTypeCode.PCA) == 0) || (String.Compare(this.recordadminVM.InfusionType.Value, InfusionTypeCode.INTERMITTENT) == 0) || (String.Equals(this.recordadminVM.ItemSubType, InfusionTypesCode.SUBTYPE_GAS)))) {
            // let oDfr: InfRecAdmContDefer = ObjectHelper.CreateType<InfRecAdmContDefer>(this.ContentCtrlMeddefaultview.Content, InfRecAdmContDefer);
            let oDfr: InfRecAdmContDefer = e;

            //revisitmeyasik starts
            //This below lone is typed by me
            oDfr.lbldateTime.Visibility = Visibility.Visible;
            oDfr.dtpDate.Visibility = Visibility.Visible;
            oDfr.idatetime.Visibility = Visibility.Visible;
            //This below line is cut from "LoadInfActionForm" inside pause condition
            // oDfr.cboreason.ItemsSource = this.recordadminVM.ReasonforPauselist;
            //revisitmeyasik ends

            oDfr.lblReason.Text = Resource.MedicationAdministrator.lblreasonpause_text;
            oDfr.lblReason.Tooltip = Resource.MedicationAdministrator.lblreasonpause_text;
            oDfr.lbldateTime.Text = Resource.MedicationAdministrator.lblpausedttimebegun_text;

            //revisitmeyasik starts
            // oDfr.cboreason.ClearValue();
            oDfr.cboreason.ItemsSource = this.recordadminVM.ReasonforPauselist;

            // oDfr.cboreason.SetBinding(iComboBox.ItemsSourceProperty, ObjectHelper.CreateObject(new Binding("ReasonforPauselist"), { Mode: BindingMode.TwoWay }));
            // oDfr.cboreason.SetBinding(iComboBox.SelectedValueProperty, ObjectHelper.CreateObject(new Binding("ReasonforPause"), { Mode: BindingMode.TwoWay }));
            //revisitmeyasik ends

            ToolTipService.SetToolTip(oDfr.dtpDate, MedicationAdministrator.txtPauseDate_tooltip);
            ToolTipService.SetToolTip(oDfr.idatetime, MedicationAdministrator.txtPauseTime_tooltip);
            ToolTipService.SetToolTip(oDfr.cboreason, MedicationAdministrator.txtPauseReason_tooltip);
        }
        if (this.recordadminVM.ReasonforPause != null && !String.IsNullOrEmpty(this.recordadminVM.ReasonforPause.Value) && String.Compare(this.recordadminVM.ReasonforPause.Value, "CC_CLNCLRSN") == 0) {
            this.recordadminVM.IsClinicalRSNMand = true;
        }
        else {
            this.recordadminVM.IsClinicalRSNMand = false;
        }
        this.cmdStrikethroughadmin.Visibility = Visibility.Collapsed;
        this.CriticalMedMsg.Visibility = Visibility.Collapsed;
        this.recordadminVM.IsScanRecMedVisible = Visibility.Collapsed;
    }

    public iRdbResume_Checked(): void {
        if (this.recordadminVM != null) {
            this.deferChcked = false;
            this.notGivenChked = false;
            this.pauseChked = false;
            this.resumeChcked = true;
            this.LoadInfActionForm(MedicationAction.RESUME);
            if (this.recordadminVM.ItemSubType != null && !String.Equals(this.recordadminVM.ItemSubType, InfusionTypesCode.SUBTYPE_GAS)) {
                if (String.Equals(this.recordadminVM.InfusionType.Value, InfusionTypeCode.PCA))
                    this.recordadminVM.IsMandatoryInfusionrate = false;
                else this.recordadminVM.IsMandatoryInfusionrate = true;
                this.recordadminVM.IsEnableInfusionrate = true;
            }
            if (this.recordadminVM.InfusionType != null && !String.IsNullOrEmpty(this.recordadminVM.InfusionType.Value) && ((String.Compare(this.recordadminVM.InfusionType.Value, InfusionTypeCode.CONTINUOUS) == 0) || (String.Compare(this.recordadminVM.InfusionType.Value, InfusionTypeCode.SINGLEDOSEVOLUME) == 0) || (String.Compare(this.recordadminVM.InfusionType.Value, InfusionTypeCode.FLUID) == 0) || (String.Compare(this.recordadminVM.InfusionType.Value, InfusionTypeCode.PCA) == 0) || (String.Compare(this.recordadminVM.InfusionType.Value, InfusionTypeCode.INTERMITTENT) == 0))) {
                this.iRdbResume_CheckedExtension(this.contResume);
            }
            else if (String.Equals(this.recordadminVM.ItemSubType, InfusionTypesCode.SUBTYPE_GAS)) {
                if (this.contdefer) {
                    this.iRdbResume_CheckedExtension_Gas(this.contdefer)
                }
                //     let oRsm: InfRecAdmContDefer = ObjectHelper.CreateType<InfRecAdmContDefer>(this.ContentCtrlMeddefaultview.Content, InfRecAdmContDefer);
                //     oRsm.lblReason.Text = Resource.MedicationAdministrator.lblRoute_text;
                //     oRsm.cboreason.ClearValue();
                //     oRsm.cboreason.SetBinding(iComboBox.ItemsSourceProperty, ObjectHelper.CreateObject(new Binding("PrescribedRoutes"), { Mode: BindingMode.OneWay }));
                //     oRsm.cboreason.SetBinding(iComboBox.SelectedValueProperty, ObjectHelper.CreateObject(new Binding("SelectedRoute"), { Mode: BindingMode.TwoWay }));
                //     oRsm.cboreason.SetPropertyValue(ToolTipService.ToolTipProperty, Resource.MedicationAdministrator.drpRoute_tooltip);
                //     oRsm.lbldateTime.Text = Resource.MedicationAdministrator.lblResumeddttime_text;
                //     ToolTipService.SetToolTip(oRsm.dtpDate, MedicationAdministrator.txtResumeDate_tooltip);
                //     ToolTipService.SetToolTip(oRsm.idatetime, MedicationAdministrator.txtResumeTime_tooltip);
                //     this.recordadminVM.IsClinicalRSNMand = false;
            }
            this.cmdStrikethroughadmin.Visibility = Visibility.Collapsed;
            if (!ProfileData.ChartSettingsConfig.IsChangeFlowRateEnabled && !String.IsNullOrEmpty(this.recordadminVM.DontChangeInfRateDefValue) && !String.Equals(this.recordadminVM.DontChangeInfRateDefValue, "0")) {
                this.recordadminVM.IsEnableInfusionrate = false;
                this.recordadminVM.IsMandatoryInfusionrate = false;
            }
            this.CriticalMedMsg.Visibility = Visibility.Collapsed;
            this.recordadminVM.IsScanRecMedVisible = Visibility.Collapsed;
        }
    }
    private iRdbResume_CheckedExtension(e: InfRecAdmContResume) {
        //  let oRsm: InfRecAdmContResume = ObjectHelper.CreateType<InfRecAdmContResume>(this.ContentCtrlMeddefaultview.Content, InfRecAdmContResume);
        let oRsm: InfRecAdmContResume = e;

        // oRsm.lblReason.Text = Resource.MedicationAdministrator.lblRoute_text;
        // oRsm.cboreason.ClearValue();
        // oRsm.cboreason.SetBinding(iComboBox.ItemsSourceProperty, ObjectHelper.CreateObject(new Binding("PrescribedRoutes"), { Mode: BindingMode.OneWay }));
        // oRsm.cboreason.SetBinding(iComboBox.SelectedValueProperty, ObjectHelper.CreateObject(new Binding("SelectedRoute"), { Mode: BindingMode.TwoWay }));
        // oRsm.cboreason.SetPropertyValue(ToolTipService.ToolTipProperty, Resource.MedicationAdministrator.drpRoute_tooltip);
        // oRsm.lbldateTime.Text = Resource.MedicationAdministrator.lblResumeddttime_text;
        //  ToolTipService.SetToolTip(oRsm.dtpDate, MedicationAdministrator.txtResumeDate_tooltip);
        // ToolTipService.SetToolTip(oRsm.idatetime, MedicationAdministrator.txtResumeTime_tooltip);

        if (this.isDialogOpen) {
            let oiMessageBox: iMessageBox = new iMessageBox();
            oiMessageBox.MessageBoxClose = (s, e) => { this.oiMessageBox_YesNo(s, e); };
            oiMessageBox.MessageButton = MessageBoxButton.YesNo;
            oiMessageBox.Title = Resource.InfusionChart.Lorenzo_Title;
            oiMessageBox.IconType = MessageBoxType.Question;
            oiMessageBox.Message = Resource.MedicationAdministrator.ProceedWithChangeBag;
            this.isDialogOpen = false;
            oiMessageBox.Show();
        }
        if (String.Equals(this.recordadminVM.InfusionType.Value, "CC_IPPINFTYPPCA")) {
            oRsm.lblinfusiontrate.Text = Resource.MedicationAdministrator.lblbkinfusrate_text;
            oRsm.lblConcentrationValue.Visibility = Visibility.Collapsed;
        }
        if (String.Equals(this.recordadminVM.InfusionType.Value, "CC_IPPINFTYPINTE")) {

            oRsm.lblConcentrationValue.Visibility = Visibility.Collapsed;
        }
        else if (String.Equals(this.recordadminVM.InfusionType.Value, InfusionTypeCode.CONTINUOUS) || String.Equals(this.recordadminVM.InfusionType.Value, InfusionTypeCode.FLUID) || String.Equals(this.recordadminVM.InfusionType.Value, InfusionTypeCode.SINGLEDOSEVOLUME)) {
            if (this.recordadminVM.PrevConcentrationVisible == Visibility.Collapsed) {
                oRsm.lblConcentrationValue.Visibility = Visibility.Visible;
                oRsm.Concentrationdetails.Visibility = Visibility.Collapsed;
            }
            if (String.Equals(this.recordadminVM.InfusionType.Value, InfusionTypeCode.FLUID)) {
                oRsm.lblInfusiondose.Visibility = Visibility.Collapsed;
                oRsm.stkInfudose.Visibility = Visibility.Collapsed;
                oRsm.lblConcentration.Visibility = Visibility.Collapsed;
                oRsm.lblConcentrationValue.Visibility = Visibility.Collapsed;
                oRsm.brdconcentration.Visibility = Visibility.Collapsed;
                oRsm.brdinfdose.Visibility = Visibility.Collapsed;
                oRsm.bgdconcentration.Visibility = Visibility.Collapsed;
                oRsm.bgdinfdose.Visibility = Visibility.Collapsed;
            }
            else if (String.Equals(this.recordadminVM.InfusionType.Value, InfusionTypeCode.CONTINUOUS) && this.recordadminVM.lblConcentrationVisi == Visibility.Collapsed) {
                oRsm.lblConcentration.Visibility = Visibility.Collapsed;
                oRsm.lblConcentrationValue.Visibility = Visibility.Collapsed;
                oRsm.brdconcentration.Visibility = Visibility.Collapsed;
                oRsm.bgdconcentration.Visibility = Visibility.Collapsed;
            }
        }
    }

    private iRdbResume_CheckedExtension_Gas(e: InfRecAdmContDefer) {
        if (String.Equals(this.recordadminVM.ItemSubType, InfusionTypesCode.SUBTYPE_GAS)) {
            let oRsm: InfRecAdmContDefer = e;

            oRsm.lbldateTime.Visibility = Visibility.Visible;
            oRsm.dtpDate.Visibility = Visibility.Visible;
            oRsm.idatetime.Visibility = Visibility.Visible;

            oRsm.lblReason.Text = Resource.MedicationAdministrator.lblRoute_text;
            oRsm.lblReason.Tooltip = Resource.MedicationAdministrator.lblRoute_text;
            // oRsm.cboreason.ClearValue();
            // oRsm.cboreason.SetBinding(iComboBox.ItemsSourceProperty, ObjectHelper.CreateObject(new Binding("PrescribedRoutes"), { Mode: BindingMode.OneWay }));
            // oRsm.cboreason.SetBinding(iComboBox.SelectedValueProperty, ObjectHelper.CreateObject(new Binding("SelectedRoute"), { Mode: BindingMode.TwoWay }));
            // oRsm.cboreason.SetPropertyValue(ToolTipService.ToolTipProperty, Resource.MedicationAdministrator.drpRoute_tooltip);
            oRsm.lbldateTime.Text = Resource.MedicationAdministrator.lblResumeddttime_text;
            ToolTipService.SetToolTip(oRsm.dtpDate, MedicationAdministrator.txtResumeDate_tooltip);
            ToolTipService.SetToolTip(oRsm.idatetime, MedicationAdministrator.txtResumeTime_tooltip);
            this.recordadminVM.IsClinicalRSNMand = false;
        }
        this.cmdStrikethroughadmin.Visibility = Visibility.Collapsed;
        if (!ProfileData.ChartSettingsConfig.IsChangeFlowRateEnabled && !String.IsNullOrEmpty(this.recordadminVM.DontChangeInfRateDefValue) && !String.Equals(this.recordadminVM.DontChangeInfRateDefValue, "0")) {
            this.recordadminVM.IsEnableInfusionrate = false;
            this.recordadminVM.IsMandatoryInfusionrate = false;
        }
        this.CriticalMedMsg.Visibility = Visibility.Collapsed;
        this.recordadminVM.IsScanRecMedVisible = Visibility.Collapsed;
    }

    oiMessageBox_YesNo(sender: Object, e: MessageEventArgs): void {
        if (e.MessageBoxResult == MessageBoxResult.Yes) {
            this.iRdbchangebag.IsChecked = true;
            this.iRdbChangebag_Checked();
            this.recordadminVM.RecordOneMoreAction = MedicationAction.RESUME;
            this.recordadminVM.RecordOMASequence = "Before";
        }
        else {
            this.recordadminVM.RecordOneMoreAction = String.Empty;
            this.recordadminVM.RecordOMASequence = String.Empty;
        }
        this.isDialogOpen = true;
    }
    public iRdbChangebag_Checked(): void {
        this.LoadInfActionForm(MedicationAction.CHANGEBAG);
        this.isDialogOpen = true;
        if (this.recordadminVM.InfusionType != null && !String.IsNullOrEmpty(this.recordadminVM.InfusionType.Value) && (String.Equals(this.recordadminVM.InfusionType.Value, InfusionTypeCode.CONTINUOUS) || String.Equals(this.recordadminVM.InfusionType.Value, InfusionTypeCode.INTERMITTENT) || String.Equals(this.recordadminVM.InfusionType.Value, InfusionTypeCode.SINGLEDOSEVOLUME, StringComparison.CurrentCultureIgnoreCase) || String.Equals(this.recordadminVM.InfusionType.Value, InfusionTypeCode.FLUID, StringComparison.CurrentCultureIgnoreCase))) {
            this.recordadminVM.IsMandatoryInfusionrate = true;
            this.recordadminVM.IsEnableDose = false;
            if (this.recordadminVM.PrevBagVolumeUom != null && !String.IsNullOrEmpty(this.recordadminVM.PrevBagVolumeUom.Value)) {
                this.recordadminVM.VolumeInfusedUOM = this.recordadminVM.VolumeInfusedUOMList.Where(x => x.Value == this.recordadminVM.PrevBagVolumeUom.Value).FirstOrDefault();
                this.recordadminVM.BagVolumeUOM = this.recordadminVM.VolumeInfusedUOMList.Where(x => x.Value == this.recordadminVM.PrevBagVolumeUom.Value).FirstOrDefault();
            }
        }
        else if (this.recordadminVM.InfusionType != null && !String.IsNullOrEmpty(this.recordadminVM.InfusionType.Value) && String.Compare(this.recordadminVM.InfusionType.Value, "CC_IPPINFTYPPCA") == 0) {
            let oCngBag: InfRecAdmPCAChangeBag = ObjectHelper.CreateType<InfRecAdmPCAChangeBag>(this.ContentCtrlMeddefaultview.Content, InfRecAdmPCAChangeBag);
            oCngBag.lblDose.Text = Resource.MedicationAdministrator.lblbolus_text;
            oCngBag.lblinfusiontrate.Text = Resource.MedicationAdministrator.lblbkinfusrate_text;
            oCngBag.lblwastage.Visibility = Visibility.Visible;
            oCngBag.stackwastage.Visibility = Visibility.Visible;
            oCngBag.bgdwastage.Visibility = Visibility.Visible;
            oCngBag.brdwastage.Visibility = Visibility.Visible;
            oCngBag.lblvolumeinfused1.Mandatory = false;
            oCngBag.lbluom2.Mandatory = false;
            this.recordadminVM.IsMandatoryInfusionrate = false;
            if (this.recordadminVM.PrevBagVolumeUom != null && !String.IsNullOrEmpty(this.recordadminVM.PrevBagVolumeUom.Value)) {
                this.recordadminVM.BagVolumeUOM = this.recordadminVM.VolumeInfusedUOMList.Where(x => x.Value == this.recordadminVM.PrevBagVolumeUom.Value).FirstOrDefault();
            }
            oCngBag.firsttimefocus = true;
            //  oCngBag.dtpAdminDate.Focus();
        }
        this.recordadminVM.WitnessMandatory = false;
        this.cmdStrikethroughadmin.Visibility = Visibility.Collapsed;
        if (!this.recordadminVM.IsMedScanExcluded) {
            this.recordadminVM.IsScanRecMedVisible = Visibility.Visible;
        }
        if (!ProfileData.ChartSettingsConfig.IsChangeFlowRateEnabled && !String.IsNullOrEmpty(this.recordadminVM.DontChangeInfRateDefValue) && !String.Equals(this.recordadminVM.DontChangeInfRateDefValue, "0")) {
            this.recordadminVM.IsEnableInfusionrate = false;
            this.recordadminVM.IsMandatoryInfusionrate = false;
        }
        if (((String.IsNullOrEmpty(this.recordadminVM.DontChangeInfRateDefValue) && String.IsNullOrEmpty(this.recordadminVM.InfusionRate)) || this.recordadminVM.DontChangeInfRateDefValue == this.recordadminVM.InfusionRate) && ((this.recordadminVM.InfusionRateUOMNumerator == null && this.recordadminVM.DontChangeInfRateDefUOMOID <= 0) || (this.recordadminVM.InfusionRateUOMNumerator != null && this.recordadminVM.DontChangeInfRateDefUOMOID.ToString() == this.recordadminVM.InfusionRateUOMNumerator.Value)) && ((this.recordadminVM.InfusionRateUOMDenominator == null && this.recordadminVM.DontChangeInfRateDefPerUOMOID <= 0) || (this.recordadminVM.InfusionRateUOMDenominator != null && this.recordadminVM.DontChangeInfRateDefPerUOMOID.ToString() == this.recordadminVM.InfusionRateUOMDenominator.Value)))
            this.recordadminVM.IsClinicalRSNMand = false;
        else this.recordadminVM.IsClinicalRSNMand = true;
        if (this.recordadminVM.PresScheduleOID > 0 && ChartContext.PatientOID > 0 && !this.recordadminVM.IsMedScanExcluded) {
            let oParams: string[] = new Array(2);
            oParams[0] = ChartContext.PatientOID.ToString();
            oParams[1] = this.recordadminVM.PresScheduleOID.ToString();
            let IsExist: string = HtmlPage.Window.Invoke("GetMedScanBatchExpiryDetails", ChartContext.PatientOID.ToString(), this.recordadminVM.PresScheduleOID.ToString());
            if (!String.IsNullOrEmpty(IsExist))
                this.recordadminVM.IsExists = Convert.ToChar(IsExist);
        }
    }
    public iRdbChangeflowrateAdmin_Checked(): void {
        this.LoadInfActionForm(MedicationAction.CHANGEFLOWRATE);
        this.isDialogOpen = true;
        if (this.contChgFlow) {
            this.iRdbChgFlow_CheckExtension(this.contChgFlow)
        }
    }

    iRdbChgFlow_CheckExtension(e: InfRecAdmContChangeFlowRate) {
        // let oCngFlwRat: InfRecAdmContChangeFlowRate = ObjectHelper.CreateType<InfRecAdmContChangeFlowRate>(this.ContentCtrlMeddefaultview.Content, InfRecAdmContChangeFlowRate);
        let oCngFlwRat: InfRecAdmContChangeFlowRate = e;

        this.recordadminVM.IsRecalculateEstCompletionTime = true;
        if (this.recordadminVM.InfusionType != null && !String.IsNullOrEmpty(this.recordadminVM.InfusionType.Value) && (String.Equals(this.recordadminVM.InfusionType.Value, "CC_IPPINFTYPCON") || String.Equals(this.recordadminVM.InfusionType.Value, "CC_IPPINFTYPINTE") || String.Equals(this.recordadminVM.InfusionType.Value, "CC_IPPINFTYPPCA") || String.Equals(this.recordadminVM.InfusionType.Value, InfusionTypeCode.FLUID) || String.Equals(this.recordadminVM.InfusionType.Value, InfusionTypeCode.SINGLEDOSEVOLUME))) {
            //revisitmeyasik this.recordadminVM.IsMandatoryInfusionrate is hardcoded below
            // this.recordadminVM.IsMandatoryInfusionrate = (this.recordadminVM.CondDoseMonitoringPeriodAlert || this.recordadminVM.ChangeFlowRateAlert || this.recordadminVM.ChangeRateAndConcentrationAlert) ? true : false;
            this.recordadminVM.IsMandatoryInfusionrate = true;
            this.recordadminVM.DontChangeInfRateVisi = (this.recordadminVM.CondDoseMonitoringPeriodAlert) ? Visibility.Visible : Visibility.Collapsed;

            if (String.Equals(this.recordadminVM.InfusionType.Value, "CC_IPPINFTYPINTE")) {
                oCngFlwRat.lblConcentrationValue.Visibility = Visibility.Collapsed;
            }
            if (String.Equals(this.recordadminVM.InfusionType.Value, "CC_IPPINFTYPPCA")) {
                oCngFlwRat.brdrecalestcom.Visibility = Visibility.Collapsed;
                oCngFlwRat.bgdrecalestcom.Visibility = Visibility.Collapsed;
                oCngFlwRat.rdbRecalcEstCompYes.Visibility = Visibility.Collapsed;
                oCngFlwRat.rdbRecalcEstCompNo.Visibility = Visibility.Collapsed;
                oCngFlwRat.lblrecalcestcom.Visibility = Visibility.Collapsed;
                oCngFlwRat.lblchnginfusiontrate.Text = Resource.MedicationAdministrator.lblchngbckgrndinfurate_text;
                oCngFlwRat.lblinfusiontrate1.Text = Resource.MedicationAdministrator.lblbkinfusrate_text;
            }
            else if (String.Equals(this.recordadminVM.InfusionType.Value, InfusionTypeCode.CONTINUOUS) || String.Equals(this.recordadminVM.InfusionType.Value, InfusionTypeCode.FLUID) || String.Equals(this.recordadminVM.InfusionType.Value, InfusionTypeCode.SINGLEDOSEVOLUME)) {
                if (this.recordadminVM.PrevConcentrationVisible == Visibility.Collapsed) {
                    oCngFlwRat.lblConcentrationValue.Visibility = Visibility.Visible;
                    oCngFlwRat.Concentrationdetails.Visibility = Visibility.Collapsed;
                    this.recordadminVM.IsMandatoryConcentration = false;
                }
                if (String.Equals(this.recordadminVM.InfusionType.Value, InfusionTypeCode.CONTINUOUS)) {
                    if (!String.IsNullOrEmpty(this.recordadminVM.InfusionPeriod) && !String.Equals(this.recordadminVM.InfusionPeriod, "0")) {
                        this.recordadminVM.IsRecalculateEstCompletionTime = false;
                        oCngFlwRat.lblrecalcestcom.IsEnabled = false;
                        this.recordadminVM.IsEnableReCalcEstComp = false;
                        oCngFlwRat.rdbRecalcEstCompYes.ToolTip = null;
                        oCngFlwRat.rdbRecalcEstCompNo.ToolTip = null;
                    }
                    else {
                        this.recordadminVM.IsRecalculateEstCompletionTime = true;
                        oCngFlwRat.lblrecalcestcom.IsEnabled = true;
                        this.recordadminVM.IsEnableReCalcEstComp = true;
                    }
                    if (this.recordadminVM.lblConcentrationVisi == Visibility.Collapsed) {
                        oCngFlwRat.lblConcentration.Visibility = Visibility.Collapsed;
                        oCngFlwRat.lblConcentrationValue.Visibility = Visibility.Collapsed;
                        oCngFlwRat.bgdconcentration.Visibility = Visibility.Collapsed;
                        oCngFlwRat.brdconcentration.Visibility = Visibility.Collapsed;
                    }
                }
                else if (String.Equals(this.recordadminVM.InfusionType.Value, InfusionTypeCode.FLUID) || String.Equals(this.recordadminVM.InfusionType.Value, InfusionTypeCode.SINGLEDOSEVOLUME)) {
                    this.recordadminVM.IsRecalculateEstCompletionTime = true;
                    oCngFlwRat.lblrecalcestcom.IsEnabled = false;
                    this.recordadminVM.IsEnableReCalcEstComp = false;
                    oCngFlwRat.rdbRecalcEstCompYes.ToolTip = null;
                    oCngFlwRat.rdbRecalcEstCompNo.ToolTip = null;
                }
            }
            if (String.Equals(this.recordadminVM.InfusionType.Value, InfusionTypeCode.FLUID)) {
                oCngFlwRat.lblConcentration.Visibility = Visibility.Collapsed;
                oCngFlwRat.lblConcentrationValue.Visibility = Visibility.Collapsed;
                oCngFlwRat.lblInfusiondose.Visibility = Visibility.Collapsed;
                oCngFlwRat.Infusiondosedetails.Visibility = Visibility.Collapsed;
                oCngFlwRat.bgdconcentration.Visibility = Visibility.Collapsed;
                oCngFlwRat.bgdinfudose.Visibility = Visibility.Collapsed;
                oCngFlwRat.brdconcentration.Visibility = Visibility.Collapsed;
                oCngFlwRat.brdinfudose.Visibility = Visibility.Collapsed;
            }
        }
        else if (!String.IsNullOrEmpty(this.recordadminVM.ItemSubType) && String.Compare(this.recordadminVM.ItemSubType, "CC_MEDGAS") == 0) {
            this.recordadminVM.IsMandatoryInfusionrate = true;
            oCngFlwRat.lbldriprate.Visibility = Visibility.Collapsed;
            oCngFlwRat.cmdDoseCal1.Visibility = Visibility.Collapsed;
            oCngFlwRat.bgddripdate1.Visibility = Visibility.Collapsed;
            oCngFlwRat.brddriprate1.Visibility = Visibility.Collapsed;
            oCngFlwRat.Driprate1.Visibility = Visibility.Collapsed;
            oCngFlwRat.lbdriprateValue.Visibility = Visibility.Collapsed;
            oCngFlwRat.lblinfusiontrate1.Text = Resource.MedicationAdministrator.lblflowrate_text;
            oCngFlwRat.lblchnginfusiontrate.Text = Resource.MedicationAdministrator.lblchgflowrate_txt;
            oCngFlwRat.lblPrevConcentration.Visibility = Visibility.Collapsed;
            oCngFlwRat.lblPrevConValue.Visibility = Visibility.Collapsed;
            oCngFlwRat.lblConcentration.Visibility = Visibility.Collapsed;
            oCngFlwRat.Concentrationdetails.Visibility = Visibility.Collapsed;
            oCngFlwRat.brdconcentration.Visibility = Visibility.Collapsed;
            oCngFlwRat.brdinfudose.Visibility = Visibility.Collapsed;
            oCngFlwRat.bgdconcentrationold.Visibility = Visibility.Collapsed;
            oCngFlwRat.bgdconcentration.Visibility = Visibility.Collapsed;
            oCngFlwRat.bgdinfudose.Visibility = Visibility.Collapsed;
            oCngFlwRat.Infusiondosedetails.Visibility = Visibility.Collapsed;
            oCngFlwRat.lblInfusiondose.Visibility = Visibility.Collapsed;
            oCngFlwRat.brdinfurate.Visibility = Visibility.Collapsed;
            oCngFlwRat.brdrecalestcom.Visibility = Visibility.Collapsed;
            oCngFlwRat.bgdrecalestcom.Visibility = Visibility.Collapsed;
            oCngFlwRat.rdbRecalcEstCompYes.Visibility = Visibility.Collapsed;
            oCngFlwRat.rdbRecalcEstCompNo.Visibility = Visibility.Collapsed;
            oCngFlwRat.lblrecalcestcom.Visibility = Visibility.Collapsed;
            oCngFlwRat.lblConcentrationValue.Visibility = Visibility.Collapsed;
        }
        this.cmdStrikethroughadmin.Visibility = Visibility.Collapsed;
        if (this.recordadminVM.ChangedInfusionRate || this.recordadminVM.ChangedInfRateNumUOM || this.recordadminVM.ChangedInfRateDinUOM) {
            this.recordadminVM.IsClinicalRSNMand = true;
        }
        else {
            this.recordadminVM.IsClinicalRSNMand = false;
        }
        //this.recordadminVM.IsClinicalRSNMand = false;
        this.recordadminVM.IsDontChangeInfusionRate = false;
        this.CriticalMedMsg.Visibility = Visibility.Collapsed;
        this.recordadminVM.IsScanRecMedVisible = Visibility.Collapsed;
    }
    public iRdbstopAdmin_Checked(): void {
        this.stopChcked = true;
        this.stopChckedRe = false;
        this.completeChcked = false;
        this.completeChckedRe = false;
        this.isDialogOpen = true;
        this.LoadInfActionForm(MedicationAction.STOP);

        if (this.recordadminVM.InfusionType != null && !String.IsNullOrEmpty(this.recordadminVM.InfusionType.Value) && String.Equals(this.recordadminVM.InfusionType.Value, InfusionTypeCode.INTERMITTENT)) {
            if (this.contStop) {
                this.iRdbStop_CheckExtension(this.contStop)
            }
        }
        else if (this.recordadminVM.InfusionType != null && !String.IsNullOrEmpty(this.recordadminVM.InfusionType.Value) && String.Compare(this.recordadminVM.InfusionType.Value, InfusionTypeCode.PCA) == 0) {
            if (this.contStop) {
                this.iRdbStop_CheckExtension(this.contStop)
            }
        }
        else if (this.recordadminVM != null && !String.IsNullOrEmpty(this.recordadminVM.ItemSubType) && String.Equals(this.recordadminVM.ItemSubType, InfusionTypesCode.SUBTYPE_GAS)) {
            if (this.contStop) {
                this.iRdbStop_CheckExtension(this.contStop)
            }
        }

        else if (this.recordadminVM.InfusionType != null && !String.IsNullOrEmpty(this.recordadminVM.InfusionType.Value) && (String.Equals(this.recordadminVM.InfusionType.Value, InfusionTypeCode.CONTINUOUS) || String.Equals(this.recordadminVM.InfusionType.Value, InfusionTypeCode.SINGLEDOSEVOLUME) || String.Equals(this.recordadminVM.InfusionType.Value, InfusionTypeCode.FLUID))) {
            if (this.CSFStopComplete) {
                this.iRDBCSFStop_CheckExtension(this.CSFStopComplete)
            }
        }
    }

    iRDBCSFStop_CheckExtension(e: InfRecAdmCSFStopComplete) {
        let oStp: InfRecAdmCSFStopComplete = e;
        if (oStp != null) {
            oStp.brdvoluminfu.Visibility = Visibility.Collapsed;
            oStp.cboResForstopping.Visibility = Visibility.Visible;
            oStp.lblResForstopping.Visibility = Visibility.Visible;
            oStp.bgdrsnstop.Visibility = Visibility.Visible;
            oStp.brdcommmets.Visibility = Visibility.Visible;
            if (String.Equals(this.recordadminVM.InfusionType.Value, InfusionTypeCode.SINGLEDOSEVOLUME)) {
                oStp.lbldoseadmin.Visibility = Visibility.Visible;
                oStp.txtdoseadmin.Visibility = Visibility.Visible;
                oStp.lblDoseUOM.Visibility = Visibility.Visible;
                oStp.bgddoseadmin.Visibility = Visibility.Visible;
                oStp.brddoseadmin.Visibility = Visibility.Visible;
            }
            else {
                oStp.lbldoseadmin.Visibility = Visibility.Collapsed;
                oStp.txtdoseadmin.Visibility = Visibility.Collapsed;
                oStp.lblDoseUOM.Visibility = Visibility.Collapsed;
                oStp.bgddoseadmin.Visibility = Visibility.Collapsed;
                oStp.brddoseadmin.Visibility = Visibility.Collapsed;
                oStp.brdwastage.Visibility = Visibility.Collapsed;
            }
        }
        if (String.Equals(this.recordadminVM.InfusionType.Value, InfusionTypeCode.CONTINUOUS) && !String.IsNullOrEmpty(this.recordadminVM.InfusionPeriodMedAdmin) && this.recordadminVM.InfusionPeriodMedAdminUOM != null && !String.IsNullOrEmpty(this.recordadminVM.InfusionPeriodMedAdminUOM.Value)) {
            if (this.recordadminVM.InfAdministeredTimes != null && this.recordadminVM.InfAdministeredTimes.Count > 0 && this.recordadminVM.InfAdministeredTimes[0] != null && (DateTime.NotEquals(this.recordadminVM.InfAdministeredTimes[0].InfusionOriginalEndDTTM, DateTime.MinValue))) {
                this.recordadminVM.EstimatedEndTime = String.Format(MedicationAdministrator.Calculatedenddatetime, this.recordadminVM.InfAdministeredTimes[0].InfusionOriginalEndDTTM.ToString(CConstants.DateTimeFormat));
                this.recordadminVM.IsEstiEndDateMsg = Visibility.Visible;
            }
        }
        else {
            this.recordadminVM.IsEstiEndDateMsg = Visibility.Collapsed;
        }
        if (this.recordadminVM.ReasonforStop != null && !String.IsNullOrEmpty(this.recordadminVM.ReasonforStop.Value) && String.Compare(this.recordadminVM.ReasonforStop.Value, "CC_CLNCLRSN") == 0) {
            this.recordadminVM.IsStopClinicalRSNMand = true;
        }
        else {
            this.recordadminVM.IsStopClinicalRSNMand = false;
        }
        this.recordadminVM.IsVolumeMadatory = true;
        this.recordadminVM.Isdoseadministered = false;
        this.MakeConditionalIconVisible();
        if (this.recordadminVM.PrevBagVolumeUom != null && !String.IsNullOrEmpty(this.recordadminVM.PrevBagVolumeUom.Value)) {
            this.recordadminVM.VolumeInfusedUOM = this.recordadminVM.VolumeInfusedUOMList.Where(x => x.Value == this.recordadminVM.PrevBagVolumeUom.Value).FirstOrDefault();
        }
        if (String.Equals(this.recordadminVM.InfusionType.Value, InfusionTypeCode.FLUID) || (String.Equals(this.recordadminVM.InfusionType.Value, InfusionTypeCode.CONTINUOUS) && this.recordadminVM.lblConcentrationVisi == Visibility.Collapsed)) {
            oStp.lblConcentration.Visibility = Visibility.Collapsed;
            oStp.lblConcentrationVal.Visibility = Visibility.Collapsed;
            oStp.brdconcentration.Visibility = Visibility.Collapsed;
            oStp.bgdconcentration.Visibility = Visibility.Collapsed;
        }


        if (this.recordadminVM.InfusionType != null && !String.IsNullOrEmpty(this.recordadminVM.InfusionType.Value) && (String.Equals(this.recordadminVM.InfusionType.Value, InfusionTypeCode.CONTINUOUS) || String.Equals(this.recordadminVM.InfusionType.Value, InfusionTypeCode.SINGLEDOSEVOLUME) || String.Equals(this.recordadminVM.InfusionType.Value, InfusionTypeCode.FLUID))) {
            this.cmdStrikethroughadmin.Visibility = Visibility.Collapsed;
            this.CriticalMedMsg.Visibility = Visibility.Collapsed;
            this.recordadminVM.IsScanRecMedVisible = Visibility.Collapsed;
        }
    }

    iRdbStop_CheckExtension(e: InfRecAdmContStop) {

        if (this.recordadminVM.InfusionType != null && !String.IsNullOrEmpty(this.recordadminVM.InfusionType.Value) && String.Equals(this.recordadminVM.InfusionType.Value, InfusionTypeCode.INTERMITTENT)) {
            let oStp: InfRecAdmContStop = e;
            //revisitmeyasik starts
            // oStp.lblwastage.Visibility = Visibility.Collapsed;
            // oStp.stackwastage.Visibility = Visibility.Collapsed;
            // oStp.bgdwastage.Visibility = Visibility.Collapsed;
            oStp.lblwastage.Visibility = Visibility.Collapsed;
            oStp.lblwastageUOM.Visibility = Visibility.Collapsed;
            oStp.txtwastage.Visibility = Visibility.Collapsed;
            oStp.cbowastageUOM.Visibility = Visibility.Collapsed;
            //revisitmeyasik ends
            oStp.brdvoluminfu.Visibility = Visibility.Collapsed;
            oStp.cboResForstopping.Visibility = Visibility.Visible;
            oStp.lblResForstopping.Visibility = Visibility.Visible;
            oStp.lbldoseadmin.Visibility = Visibility.Visible;
            oStp.txtdoseadmin.Visibility = Visibility.Visible;
            oStp.lblDoseUOM.Visibility = Visibility.Visible;
            if (this.recordadminVM.ReasonforStop != null && !String.IsNullOrEmpty(this.recordadminVM.ReasonforStop.Value) && String.Compare(this.recordadminVM.ReasonforStop.Value, "CC_CLNCLRSN") == 0) {
                this.recordadminVM.IsStopClinicalRSNMand = true;
            }
            else {
                this.recordadminVM.IsStopClinicalRSNMand = false;
            }
            oStp.lblvolumeinfused1.Mandatory = false;
            oStp.lbluom2.Mandatory = false;
            this.recordadminVM.Isdoseadministered = false;
            this.MakeConditionalIconVisible();
            if (this.recordadminVM != null && !String.IsNullOrEmpty(this.recordadminVM.DoseType) && String.Equals(this.recordadminVM.DoseType, DoseTypeCode.CONDITIONAL)) {
                if (!this.recordadminVM.IsConditionalExists) {
                    this.recordadminVM.IsVisibleDoseUOM = Visibility.Visible;
                    this.recordadminVM.DoseLblShow = Visibility.Collapsed;
                    this.recordadminVM.IsEnableStopDose = true;
                }
                else {
                    this.recordadminVM.IsVisibleDoseUOM = Visibility.Collapsed;
                    this.recordadminVM.DoseLblShow = Visibility.Visible;
                    this.recordadminVM.IsEnableStopDose = false;
                }
            }
            if (this.recordadminVM.VolumeInfusedUOM != null && !String.IsNullOrEmpty(this.recordadminVM.VolumeInfusedUOM.Value)) {
                this.recordadminVM.VolumeInfusedUOM = null;
            }
        }
        else if (this.recordadminVM.InfusionType != null && !String.IsNullOrEmpty(this.recordadminVM.InfusionType.Value) && String.Compare(this.recordadminVM.InfusionType.Value, InfusionTypeCode.PCA) == 0) {
            let oStp: InfRecAdmContStop = e;
            oStp.lblwastage.Visibility = Visibility.Visible;
            oStp.stackwastage.Visibility = Visibility.Visible;
            oStp.bgdwastage.Visibility = Visibility.Visible;
            oStp.brdwastage.Visibility = Visibility.Collapsed;
            oStp.lbldoseadmin.Visibility = Visibility.Collapsed;
            oStp.txtdoseadmin.Visibility = Visibility.Collapsed;
            oStp.lblDoseUOM.Visibility = Visibility.Collapsed;
            oStp.bgddoseadmin.Visibility = Visibility.Collapsed;
            oStp.brdvoluminfu.Visibility = Visibility.Collapsed;
            oStp.cboResForstopping.Visibility = Visibility.Visible;
            oStp.lblResForstopping.Visibility = Visibility.Visible;
            oStp.lblvolumeinfused1.Mandatory = false;
            oStp.lbluom2.Mandatory = false;
            this.recordadminVM.Isdoseadministered = false;
        }
        else if (this.recordadminVM != null && !String.IsNullOrEmpty(this.recordadminVM.ItemSubType) && String.Equals(this.recordadminVM.ItemSubType, InfusionTypesCode.SUBTYPE_GAS)) {
            let oStp: InfRecAdmContStop = e;
            this.VisicollapseComplete(oStp, true);
            if (this.recordadminVM.ReasonforStop != null && !String.IsNullOrEmpty(this.recordadminVM.ReasonforStop.Value) && String.Compare(this.recordadminVM.ReasonforStop.Value, "CC_CLNCLRSN") == 0) {
                this.recordadminVM.IsStopClinicalRSNMand = true;
            }
            else {
                this.recordadminVM.IsStopClinicalRSNMand = false;
            }
        }

        this.cmdStrikethroughadmin.Visibility = Visibility.Collapsed;
        this.CriticalMedMsg.Visibility = Visibility.Collapsed;
        this.recordadminVM.IsScanRecMedVisible = Visibility.Collapsed;
    }

    public MakeConditionalIconVisible(): void {
        if (String.Equals(this.recordadminVM.DoseType, DoseTypeCode.CONDITIONAL)) {
            if (this.recordadminVM.IsConditionalExists) {
                if (this.recordadminVM.IsRetrospective || !String.IsNullOrEmpty(this.recordadminVM.Dose)) {
                    this.recordadminVM.CondDoseStopComplete = Visibility.Visible;
                    this.recordadminVM.IsEnableStopDose = true;
                }
            }
            else {
                this.recordadminVM.CondDoseStopComplete = Visibility.Collapsed;
                this.recordadminVM.IsEnableStopDose = true;
            }
        }
    }
    public iRdbcompleteAdmin_Checked(): void {
        this.completeChcked = true;
        this.completeChckedRe = false;
        this.stopChcked = false;
        this.stopChckedRe = false;
        this.isDialogOpen = true;
        this.LoadInfActionForm(MedicationAction.COMPLETE);

        if (this.recordadminVM.InfusionType != null && !String.IsNullOrEmpty(this.recordadminVM.InfusionType.Value) && String.Equals(this.recordadminVM.InfusionType.Value, InfusionTypeCode.INTERMITTENT)) {
            if (this.contStop) {
                this.iRdbComplete_CheckExtension(this.contStop)
            }
        }
        else if (this.recordadminVM.InfusionType != null && !String.IsNullOrEmpty(this.recordadminVM.InfusionType.Value) && String.Compare(this.recordadminVM.InfusionType.Value, InfusionTypeCode.PCA) == 0) {
            if (this.contStop) {
                this.iRdbComplete_CheckExtension(this.contStop)
            }
        }
        else if (this.recordadminVM != null && !String.IsNullOrEmpty(this.recordadminVM.ItemSubType) && String.Equals(this.recordadminVM.ItemSubType, InfusionTypesCode.SUBTYPE_GAS)) {
            if (this.contStop) {
                this.iRdbComplete_CheckExtension(this.contStop)
            }
        }
        else if (this.recordadminVM.InfusionType != null && !String.IsNullOrEmpty(this.recordadminVM.InfusionType.Value) && (String.Equals(this.recordadminVM.InfusionType.Value, InfusionTypeCode.CONTINUOUS) || String.Equals(this.recordadminVM.InfusionType.Value, InfusionTypeCode.SINGLEDOSEVOLUME) || String.Equals(this.recordadminVM.InfusionType.Value, InfusionTypeCode.FLUID))) {
            if (this.CSFStopComplete) {
                this.iRdbCSFComplete_CheckExtension(this.CSFStopComplete)
            }
        }
    }
    iRdbCSFComplete_CheckExtension(e: InfRecAdmCSFStopComplete) {
        if (this.recordadminVM.InfusionType != null && !String.IsNullOrEmpty(this.recordadminVM.InfusionType.Value) && (String.Equals(this.recordadminVM.InfusionType.Value, InfusionTypeCode.CONTINUOUS) || String.Equals(this.recordadminVM.InfusionType.Value, InfusionTypeCode.SINGLEDOSEVOLUME) || String.Equals(this.recordadminVM.InfusionType.Value, InfusionTypeCode.FLUID))) {
            let oStp: InfRecAdmCSFStopComplete = e;
            if (oStp != null) {
                oStp.cboResForstopping.Visibility = Visibility.Collapsed;
                oStp.lblResForstopping.Visibility = Visibility.Collapsed;
                // oStp.brdcommmets.Visibility = Visibility.Collapsed;
                oStp.bgdrsnstop.Visibility = Visibility.Collapsed;
                oStp.brdvoluminfu.Visibility = Visibility.Collapsed;
                oStp.brdrsnstop.Visibility = Visibility.Collapsed;
                if (String.Equals(this.recordadminVM.InfusionType.Value, InfusionTypeCode.SINGLEDOSEVOLUME)) {
                    oStp.lbldoseadmin.Visibility = Visibility.Visible;
                    oStp.txtdoseadmin.Visibility = Visibility.Visible;
                    oStp.lblDoseUOM.Visibility = Visibility.Visible;
                    oStp.bgddoseadmin.Visibility = Visibility.Visible;
                    oStp.brddoseadmin.Visibility = Visibility.Visible;
                }
                else {
                    oStp.lbldoseadmin.Visibility = Visibility.Collapsed;
                    oStp.txtdoseadmin.Visibility = Visibility.Collapsed;
                    oStp.lblDoseUOM.Visibility = Visibility.Collapsed;
                    oStp.bgddoseadmin.Visibility = Visibility.Collapsed;
                    oStp.brddoseadmin.Visibility = Visibility.Collapsed;
                    oStp.brdwastage.Visibility = Visibility.Collapsed;
                }
            }
            if (String.Equals(this.recordadminVM.InfusionType.Value, InfusionTypeCode.CONTINUOUS) && !String.IsNullOrEmpty(this.recordadminVM.InfusionPeriodMedAdmin) && this.recordadminVM.InfusionPeriodMedAdminUOM != null && !String.IsNullOrEmpty(this.recordadminVM.InfusionPeriodMedAdminUOM.Value)) {
                if (this.recordadminVM.InfAdministeredTimes != null && this.recordadminVM.InfAdministeredTimes.Count > 0 && this.recordadminVM.InfAdministeredTimes[0] != null && (DateTime.NotEquals(this.recordadminVM.InfAdministeredTimes[0].InfusionOriginalEndDTTM, DateTime.MinValue))) {
                    this.recordadminVM.EstimatedEndTime = String.Format(MedicationAdministrator.Calculatedenddatetime, this.recordadminVM.InfAdministeredTimes[0].InfusionOriginalEndDTTM.ToString(CConstants.DateTimeFormat));
                    this.recordadminVM.IsEstiEndDateMsg = Visibility.Visible;
                }
            }
            else {
                this.recordadminVM.IsEstiEndDateMsg = Visibility.Collapsed;
            }
            if (this.recordadminVM.IsStopClinicalRSNMand)
                this.recordadminVM.IsStopClinicalRSNMand = false;
            this.recordadminVM.IsVolumeMadatory = true;
            this.recordadminVM.Isdoseadministered = false;
            this.MakeConditionalIconVisible();
            if (this.recordadminVM.PrevBagVolumeUom != null && !String.IsNullOrEmpty(this.recordadminVM.PrevBagVolumeUom.Value)) {
                this.recordadminVM.VolumeInfusedUOM = this.recordadminVM.VolumeInfusedUOMList.Where(x => x.Value == this.recordadminVM.PrevBagVolumeUom.Value).FirstOrDefault();
            }
            if (String.Equals(this.recordadminVM.InfusionType.Value, InfusionTypeCode.FLUID) || (String.Equals(this.recordadminVM.InfusionType.Value, InfusionTypeCode.CONTINUOUS) && this.recordadminVM.lblConcentrationVisi == Visibility.Collapsed)) {
                oStp.lblConcentration.Visibility = Visibility.Collapsed;
                oStp.lblConcentrationVal.Visibility = Visibility.Collapsed;
                oStp.brdconcentration.Visibility = Visibility.Collapsed;
                oStp.bgdconcentration.Visibility = Visibility.Collapsed;
            }
        }

        if (this.recordadminVM.InfusionType != null && !String.IsNullOrEmpty(this.recordadminVM.InfusionType.Value) && (String.Equals(this.recordadminVM.InfusionType.Value, InfusionTypeCode.CONTINUOUS) || String.Equals(this.recordadminVM.InfusionType.Value, InfusionTypeCode.SINGLEDOSEVOLUME) || String.Equals(this.recordadminVM.InfusionType.Value, InfusionTypeCode.FLUID))) {
            this.cmdStrikethroughadmin.Visibility = Visibility.Collapsed;
            this.CriticalMedMsg.Visibility = Visibility.Collapsed;
            this.recordadminVM.IsScanRecMedVisible = Visibility.Collapsed;
        }


    }

    iRdbComplete_CheckExtension(e: InfRecAdmContStop) {

        if (this.recordadminVM.InfusionType != null && !String.IsNullOrEmpty(this.recordadminVM.InfusionType.Value) && String.Equals(this.recordadminVM.InfusionType.Value, InfusionTypeCode.INTERMITTENT)) {
            let oStp: InfRecAdmContStop = e;
            oStp.cboResForstopping.Visibility = Visibility.Collapsed;
            oStp.lblResForstopping.Visibility = Visibility.Collapsed;
            oStp.brdcommmets.Visibility = Visibility.Collapsed;
            oStp.bgdrsnstop.Visibility = Visibility.Collapsed;
            oStp.brdvoluminfu.Visibility = Visibility.Collapsed;

            //revisitmeyasik starts
            oStp.lblwastage.Visibility = Visibility.Collapsed;
            oStp.lblwastageUOM.Visibility = Visibility.Collapsed;
            oStp.txtwastage.Visibility = Visibility.Collapsed;
            oStp.cbowastageUOM.Visibility = Visibility.Collapsed;
            //revisitmeyasik ends

            if (this.recordadminVM.IsStopClinicalRSNMand)
                this.recordadminVM.IsStopClinicalRSNMand = false;
            oStp.lblvolumeinfused1.Mandatory = false;
            oStp.lbluom2.Mandatory = false;
            this.recordadminVM.Isdoseadministered = false;
            this.MakeConditionalIconVisible();
            if (this.recordadminVM != null && !String.IsNullOrEmpty(this.recordadminVM.DoseType) && String.Equals(this.recordadminVM.DoseType, DoseTypeCode.CONDITIONAL)) {
                if (!this.recordadminVM.IsConditionalExists) {
                    this.recordadminVM.IsVisibleDoseUOM = Visibility.Visible;
                    this.recordadminVM.DoseLblShow = Visibility.Collapsed;
                    this.recordadminVM.IsEnableStopDose = true;
                }
                else {
                    this.recordadminVM.IsVisibleDoseUOM = Visibility.Collapsed;
                    this.recordadminVM.DoseLblShow = Visibility.Visible;
                    this.recordadminVM.IsEnableStopDose = false;
                }
            }
            if (this.recordadminVM.VolumeInfusedUOM != null && !String.IsNullOrEmpty(this.recordadminVM.VolumeInfusedUOM.Value)) {
                this.recordadminVM.VolumeInfusedUOM = null;
            }
        }

        else if (this.recordadminVM.InfusionType != null && !String.IsNullOrEmpty(this.recordadminVM.InfusionType.Value) && String.Compare(this.recordadminVM.InfusionType.Value, InfusionTypeCode.PCA) == 0) {
            let oStp: InfRecAdmContStop = e;
            oStp.cboResForstopping.Visibility = Visibility.Collapsed;
            oStp.lblResForstopping.Visibility = Visibility.Collapsed;
            oStp.brdcommmets.Visibility = Visibility.Collapsed;
            oStp.bgdrsnstop.Visibility = Visibility.Collapsed;
            oStp.lblwastage.Visibility = Visibility.Visible;
            oStp.stackwastage.Visibility = Visibility.Visible;
            oStp.bgdwastage.Visibility = Visibility.Visible;
            oStp.brdwastage.Visibility = Visibility.Collapsed;
            oStp.lbldoseadmin.Visibility = Visibility.Collapsed;
            oStp.txtdoseadmin.Visibility = Visibility.Collapsed;
            oStp.lblDoseUOM.Visibility = Visibility.Collapsed;
            oStp.bgddoseadmin.Visibility = Visibility.Collapsed;
            oStp.brdvoluminfu.Visibility = Visibility.Collapsed;
            oStp.lblvolumeinfused1.Mandatory = false;
            oStp.lbluom2.Mandatory = false;
            this.recordadminVM.Isdoseadministered = false;
            this.cmdStrikethroughadmin.Visibility = Visibility.Collapsed;
        }
        else if (!String.IsNullOrEmpty(this.recordadminVM.ItemSubType) && String.Equals(this.recordadminVM.ItemSubType, InfusionTypesCode.SUBTYPE_GAS)) {
            let oStp: InfRecAdmContStop = e;
            this.VisicollapseComplete(oStp, false);
            this.recordadminVM.IsStopClinicalRSNMand = false;
        }
        this.cmdStrikethroughadmin.Visibility = Visibility.Collapsed;
        this.CriticalMedMsg.Visibility = Visibility.Collapsed;
        this.recordadminVM.IsScanRecMedVisible = Visibility.Collapsed;
    }
    public VisicollapseComplete(oStp: InfRecAdmContStop, IsChkStop: boolean): void {
        if (IsChkStop) {
            oStp.cboResForstopping.Visibility = Visibility.Visible;
            oStp.lblResForstopping.Visibility = Visibility.Visible;
            oStp.brdcommmets.Visibility = Visibility.Visible;
            oStp.bgdrsnstop.Visibility = Visibility.Visible;
        }
        else {
            oStp.cboResForstopping.Visibility = Visibility.Collapsed;
            oStp.lblResForstopping.Visibility = Visibility.Collapsed;
            oStp.brdcommmets.Visibility = Visibility.Collapsed;
            oStp.bgdrsnstop.Visibility = Visibility.Collapsed;
        }
        oStp.lblwastage.Visibility = Visibility.Collapsed;
        oStp.lblwastageUOM.Visibility = Visibility.Collapsed;
        oStp.txtwastage.Visibility = Visibility.Collapsed;
        oStp.cbowastageUOM.Visibility = Visibility.Collapsed;
        oStp.lblvolumeinfused1.Visibility = Visibility.Collapsed;
        oStp.lbluom2.Visibility = Visibility.Collapsed;
        oStp.txtvolumeinfused1.Visibility = Visibility.Collapsed;
        oStp.cbovolUOM.Visibility = Visibility.Collapsed;
        oStp.lbldoseadmin.Visibility = Visibility.Collapsed;
        oStp.lblDoseUOM.Visibility = Visibility.Collapsed;
        oStp.txtdoseadmin.Visibility = Visibility.Collapsed;
        oStp.bgdwastage.Visibility = Visibility.Collapsed;
        oStp.bgdvoluminfu.Visibility = Visibility.Collapsed;
        oStp.bgddoseadmin.Visibility = Visibility.Collapsed;
        oStp.brdvoluminfu.Visibility = Visibility.Collapsed;
        oStp.brdwastage.Visibility = Visibility.Collapsed;
        oStp.brdendtime.Visibility = Visibility.Collapsed;
        oStp.brdvoluminfu.Visibility = Visibility.Collapsed;
    }
    public iRdbReStop_Checked(): void {
        this.recordadminVM.IsChkReStop = true;
        // if (this.oInfRecAdmContStop == null) {
        this.oInfRecAdmContStop = new InfRecAdmContStop();
        this.oInfRecAdmContStop.DataContext = this.recordadminVM;
        // }
        if (this.recordadminVM.IsRetrospective) {
            this.recordadminVM.InfusionPastAction = MedicationAction.STOP;
        }
        this.ContentCtrlRetrospective.Content = this.oInfRecAdmContStop;

        this.stopChcked = false;
        this.stopChckedRe = true;
        this.completeChcked = false;
        this.completeChckedRe = false;
        if (this.contStop) {
            this.iRdbReStop_CheckExtension(this.contStop)
        }
    }
    iRdbReStop_CheckExtension(e: InfRecAdmContStop) {

        if (this.recordadminVM.InfusionType != null && !String.IsNullOrEmpty(this.recordadminVM.InfusionType.Value) && (String.Compare(this.recordadminVM.InfusionType.Value, InfusionTypeCode.INTERMITTENT) == 0 || (String.Compare(this.recordadminVM.InfusionType.Value, InfusionTypeCode.CONTINUOUS) == 0) || String.Equals(this.recordadminVM.InfusionType.Value, InfusionTypesCode.SINGLEDOSEVOLUME, StringComparison.InvariantCultureIgnoreCase) || String.Equals(this.recordadminVM.InfusionType.Value, InfusionTypesCode.FLUID, StringComparison.InvariantCultureIgnoreCase))) {
            // let oStp: InfRecAdmContStop = ObjectHelper.CreateType<InfRecAdmContStop>(this.ContentCtrlRetrospective.Content, InfRecAdmContStop);
            let oStp = e;
            oStp.brdvoluminfu.Visibility = Visibility.Collapsed;
            oStp.cboResForstopping.Visibility = Visibility.Visible;
            oStp.lblResForstopping.Visibility = Visibility.Visible;
            oStp.lbldoseadmin.Visibility = Visibility.Visible;
            oStp.txtdoseadmin.Visibility = Visibility.Visible;
            oStp.lblDoseUOM.Visibility = Visibility.Visible;

            //revisitmeyasik starts
            oStp.lblwastage.Visibility = Visibility.Collapsed;
            oStp.lblwastageUOM.Visibility = Visibility.Collapsed;
            oStp.txtwastage.Visibility = Visibility.Collapsed;
            oStp.cbowastageUOM.Visibility = Visibility.Collapsed;
            //revisitmeyasik ends
            if (this.recordadminVM.ReasonforStop != null && !String.IsNullOrEmpty(this.recordadminVM.ReasonforStop.Value) && String.Compare(this.recordadminVM.ReasonforStop.Value, "CC_CLNCLRSN") == 0) {
                this.recordadminVM.IsStopClinicalRSNMand = true;
            }
            else {
                this.recordadminVM.IsStopClinicalRSNMand = false;
            }
            oStp.lblvolumeinfused1.Mandatory = false;
            oStp.lbluom2.Mandatory = false;
            this.recordadminVM.Isdoseadministered = false;
            this.MakeConditionalIconVisible();
        }
        if (this.recordadminVM.InfusionType != null && !String.IsNullOrEmpty(this.recordadminVM.InfusionType.Value) && String.Compare(this.recordadminVM.InfusionType.Value, InfusionTypeCode.PCA) == 0) {
            // let oStp: InfRecAdmContStop = ObjectHelper.CreateType<InfRecAdmContStop>(this.ContentCtrlRetrospective.Content, InfRecAdmContStop);
            let oStp = e;
            oStp.lblwastage.Visibility = Visibility.Visible;
            oStp.stackwastage.Visibility = Visibility.Visible;
            oStp.bgdwastage.Visibility = Visibility.Visible;
            oStp.brdwastage.Visibility = Visibility.Collapsed;
            oStp.lbldoseadmin.Visibility = Visibility.Collapsed;
            oStp.txtdoseadmin.Visibility = Visibility.Collapsed;
            oStp.lblDoseUOM.Visibility = Visibility.Collapsed;
            oStp.bgddoseadmin.Visibility = Visibility.Collapsed;
            oStp.brdvoluminfu.Visibility = Visibility.Collapsed;
            oStp.cboResForstopping.Visibility = Visibility.Visible;
            oStp.lblResForstopping.Visibility = Visibility.Visible;
            oStp.lblvolumeinfused1.Mandatory = false;
            oStp.lbluom2.Mandatory = false;
            this.recordadminVM.Isdoseadministered = false;
        }
        else if (!String.IsNullOrEmpty(this.recordadminVM.ItemSubType) && String.Equals(this.recordadminVM.ItemSubType, InfusionTypesCode.SUBTYPE_GAS)) {
            // let oStp: InfRecAdmContStop = ObjectHelper.CreateType<InfRecAdmContStop>(this.ContentCtrlRetrospective.Content, InfRecAdmContStop);
            let oStp = e;
            this.VisicollapseComplete(oStp, true);
            if (this.recordadminVM.ReasonforStop != null && !String.IsNullOrEmpty(this.recordadminVM.ReasonforStop.Value) && String.Compare(this.recordadminVM.ReasonforStop.Value, "CC_CLNCLRSN") == 0) {
                this.recordadminVM.IsStopClinicalRSNMand = true;
            }
            else {
                this.recordadminVM.IsStopClinicalRSNMand = false;
            }
        }
        this.cmdStrikethroughadmin.Visibility = Visibility.Collapsed;
        this.CriticalMedMsg.Visibility = Visibility.Collapsed;
    }
    public iRdbReComplete_Checked(): void {
        this.recordadminVM.IsChkReStop = false;
        // if (this.oInfRecAdmContStop == null) {
        this.oInfRecAdmContStop = new InfRecAdmContStop();
        this.oInfRecAdmContStop.DataContext = this.recordadminVM;
        // }
        this.recordadminVM.InfusionPastAction = MedicationAction.COMPLETE;
        this.ContentCtrlRetrospective.Content = this.oInfRecAdmContStop;
        this.stopChcked = false;
        this.stopChckedRe = false;
        this.completeChcked = false;
        this.completeChckedRe = true;
        if (this.contStop) {
            this.iRdbReComplete_CheckExtension(this.contStop)
        }
    }

    iRdbReComplete_CheckExtension(e: InfRecAdmContStop) {

        if (this.recordadminVM.InfusionType != null && !String.IsNullOrEmpty(this.recordadminVM.InfusionType.Value) && (String.Compare(this.recordadminVM.InfusionType.Value, InfusionTypeCode.INTERMITTENT) == 0 || (String.Compare(this.recordadminVM.InfusionType.Value, InfusionTypeCode.CONTINUOUS) == 0) || (String.Equals(this.recordadminVM.InfusionType.Value, InfusionTypesCode.FLUID, StringComparison.InvariantCultureIgnoreCase)) || (String.Equals(this.recordadminVM.InfusionType.Value, InfusionTypesCode.SINGLEDOSEVOLUME, StringComparison.InvariantCultureIgnoreCase)))) {
            // let oStp: InfRecAdmContStop = ObjectHelper.CreateType<InfRecAdmContStop>(this.ContentCtrlRetrospective.Content, InfRecAdmContStop);
            let oStp = e;
            oStp.cboResForstopping.Visibility = Visibility.Collapsed;
            oStp.lblResForstopping.Visibility = Visibility.Collapsed;
            oStp.brdcommmets.Visibility = Visibility.Collapsed;
            oStp.bgdrsnstop.Visibility = Visibility.Collapsed;
            oStp.brdvoluminfu.Visibility = Visibility.Collapsed;

            //revisitmeyasik starts
            oStp.lblwastage.Visibility = Visibility.Collapsed;
            oStp.lblwastageUOM.Visibility = Visibility.Collapsed;
            oStp.txtwastage.Visibility = Visibility.Collapsed;
            oStp.cbowastageUOM.Visibility = Visibility.Collapsed;
            //revisitmeyasik ends
            if (this.recordadminVM.IsStopClinicalRSNMand)
                this.recordadminVM.IsStopClinicalRSNMand = false;
            oStp.lblvolumeinfused1.Mandatory = false;
            oStp.lbluom2.Mandatory = false;
            this.recordadminVM.Isdoseadministered = false;
            this.MakeConditionalIconVisible();
        }
        else if (this.recordadminVM.InfusionType != null && !String.IsNullOrEmpty(this.recordadminVM.InfusionType.Value) && String.Compare(this.recordadminVM.InfusionType.Value, InfusionTypeCode.PCA) == 0) {
            // let oStp: InfRecAdmContStop = ObjectHelper.CreateType<InfRecAdmContStop>(this.ContentCtrlRetrospective.Content, InfRecAdmContStop);
            let oStp = e;
            oStp.cboResForstopping.Visibility = Visibility.Collapsed;
            oStp.lblResForstopping.Visibility = Visibility.Collapsed;
            oStp.brdcommmets.Visibility = Visibility.Collapsed;
            oStp.bgdrsnstop.Visibility = Visibility.Collapsed;
            oStp.lblwastage.Visibility = Visibility.Visible;
            oStp.stackwastage.Visibility = Visibility.Visible;
            oStp.bgdwastage.Visibility = Visibility.Visible;
            oStp.brdwastage.Visibility = Visibility.Collapsed;
            oStp.lbldoseadmin.Visibility = Visibility.Collapsed;
            oStp.txtdoseadmin.Visibility = Visibility.Collapsed;
            oStp.lblDoseUOM.Visibility = Visibility.Collapsed;
            oStp.bgddoseadmin.Visibility = Visibility.Collapsed;
            oStp.brdvoluminfu.Visibility = Visibility.Collapsed;
            oStp.lblvolumeinfused1.Mandatory = false;
            oStp.lbluom2.Mandatory = false;
            this.recordadminVM.Isdoseadministered = false;
            this.cmdStrikethroughadmin.Visibility = Visibility.Collapsed;
        }
        else if (!String.IsNullOrEmpty(this.recordadminVM.ItemSubType) && String.Equals(this.recordadminVM.ItemSubType, InfusionTypesCode.SUBTYPE_GAS)) {
            // let oStp: InfRecAdmContStop = ObjectHelper.CreateType<InfRecAdmContStop>(this.ContentCtrlRetrospective.Content, InfRecAdmContStop);
            let oStp = e;
            this.VisicollapseComplete(oStp, false);
            this.recordadminVM.IsStopClinicalRSNMand = false;
        }
        this.CriticalMedMsg.Visibility = Visibility.Collapsed;
    }
    public LoadInfActionForm(_InfusionAction: string): void {
        if (this.recordadminVM != null && !String.IsNullOrEmpty(this.recordadminVM.InfusionAction)) {
            if (this.recordadminVM.lstPrevAction.ContainsKey(this.recordadminVM.InfusionAction)) {
                this.recordadminVM.lstPrevAction.Remove(this.recordadminVM.InfusionAction);
            }
            this.recordadminVM.lstPrevAction.Add(this.recordadminVM.InfusionAction, ObjectHelper.CreateObject(new PreviousActionValues(), { IsClinicalRSNMand: this.recordadminVM.IsClinicalRSNMand, IsStopClinicalRSNMand: this.recordadminVM.IsStopClinicalRSNMand }));
        }
        if (this.recordadminVM != null && (this.recordadminVM.lstPrevAction == null || (this.recordadminVM.lstPrevAction != null && !this.recordadminVM.lstPrevAction.ContainsKey(_InfusionAction)))) {
            this.recordadminVM.IsClinicalRSNMand = false;
            this.recordadminVM.IsStopClinicalRSNMand = false;
        }
        if (this.recordadminVM != null && this.recordadminVM.lstPrevAction != null && this.recordadminVM.lstPrevAction.ContainsKey(MedicationAction.STOP) && !String.Equals(_InfusionAction, MedicationAction.STOP) && this.recordadminVM.ReasonforStop != null) {
            this.recordadminVM.ReasonforStop = null;
        }
        switch (_InfusionAction) {
            case MedicationAction.BEGUN:
                if (!String.IsNullOrEmpty(this.recordadminVM.ItemSubType) && String.Compare(this.recordadminVM.ItemSubType, InfusionTypesCode.SUBTYPE_GAS) == 0) {
                    if (this.oInfRecAdmGasBegun == null) {
                        this.oInfRecAdmGasBegun = new InfRecAdmGasBegun(this.recordadminVM);
                        this.oInfRecAdmGasBegun.DataContext = this.recordadminVM;
                    }
                    this.ContentCtrlMeddefaultview.Content = this.oInfRecAdmGasBegun;
                }
                else {
                    if (this.oInfRecAdmContBegun == null) {
                        this.recordadminVM.InfusionAction = MedicationAction.BEGUN;
                        this.oInfRecAdmContBegun = new InfRecAdmContBegun();
                        this.oInfRecAdmContBegun.DataContext = this.recordadminVM;
                        //this.recordadminVM
                        if (this.recordadminVM.InfusionType != null && !String.IsNullOrEmpty(this.recordadminVM.InfusionType.Value) && String.Compare(this.recordadminVM.InfusionType.Value, InfusionTypesCode.PCA) == 0) {
                            this.recordadminVM.IsEnableConcentration = true;
                            this.oInfRecAdmContBegun.lblDose.Text = Resource.MedicationAdministrator.lblbolus_text;
                            this.oInfRecAdmContBegun.lblinfusiontrate.Text = Resource.MedicationAdministrator.lblbkinfusrate_text;
                            this.oInfRecAdmContBegun.lblinfusiontrate.Width = 70;
                            // this.oInfRecAdmContBegun.cmdDoseCalInf.Visibility = Visibility.Visible;
                            // this.oInfRecAdmContBegun.lblinfusiontrate.AllowDrop = true;
                        }
                    }
                    if (this.oInfRecAdmContBegun != null && !String.IsNullOrEmpty(this.recordadminVM.InfusionType.Value) && String.Equals(this.recordadminVM.InfusionType.Value, InfusionTypesCode.CONTINUOUS, StringComparison.InvariantCultureIgnoreCase)) {
                        this.recordadminVM.IslblDoseVisible = Visibility.Collapsed;
                        this.recordadminVM.IsDose = Visibility.Collapsed;
                        this.recordadminVM.IsBackgrdRouteVisible = Visibility.Collapsed;
                        this.recordadminVM.IsBackgrdRouteVisible = Visibility.Collapsed;
                        this.recordadminVM.IsBackgrdConcentrationVisible = Visibility.Collapsed;
                        this.oInfRecAdmContBegun.bgdinfperiod.Visibility = Visibility.Collapsed;

                    }
                    else if (this.oInfRecAdmContBegun != null && !String.IsNullOrEmpty(this.recordadminVM.InfusionType.Value) && String.Equals(this.recordadminVM.InfusionType.Value, InfusionTypesCode.SINGLEDOSEVOLUME, StringComparison.InvariantCultureIgnoreCase) && !String.IsNullOrEmpty(this.recordadminVM.DoseType)) {
                        this.recordadminVM.IslblDoseVisible = Visibility.Visible;
                        this.recordadminVM.IsBackgrdRouteVisible = Visibility.Visible;
                        this.recordadminVM.IsMandatoryForBegunConcentration = true;
                        if (String.Equals(this.recordadminVM.DoseType, DoseTypeCode.NORMAL, StringComparison.InvariantCultureIgnoreCase)) {
                            this.recordadminVM.IsDose = Visibility.Collapsed;
                            this.recordadminVM.IsDoseValueVisible = Visibility.Visible;
                        }
                        else {
                            this.recordadminVM.IsDose = Visibility.Visible;
                        }
                    }
                    else if (this.oInfRecAdmContBegun != null && !String.IsNullOrEmpty(this.recordadminVM.InfusionType.Value) && String.Equals(this.recordadminVM.InfusionType.Value, InfusionTypesCode.FLUID, StringComparison.InvariantCultureIgnoreCase)) {
                        this.recordadminVM.IslblDoseVisible = Visibility.Collapsed;
                        this.recordadminVM.IsDose = Visibility.Collapsed;
                        this.recordadminVM.IsBackgrdRouteVisible = Visibility.Collapsed;
                        this.recordadminVM.lblConcentrationVisi = Visibility.Collapsed;
                        this.recordadminVM.IsCtrlConcentration = Visibility.Collapsed;
                        this.recordadminVM.IslblConcentrationValueVisi = Visibility.Collapsed;
                        this.recordadminVM.IsBackgrdConcentrationVisible = Visibility.Collapsed;
                        this.recordadminVM.IsMandatoryForBegunConcentration = false;
                        this.oInfRecAdmContBegun.stkInfudose.Visibility = Visibility.Collapsed;
                        this.oInfRecAdmContBegun.lblInfusiondose.Visibility = Visibility.Collapsed;
                        // this.oInfRecAdmContBegun.cmdDoseCalInf.Visibility = Visibility.Collapsed;

                        // this.recordadminVM.BackgrdInfRateVisi = Visibility.Collapsed;

                    }
                    this.ContentCtrlMeddefaultview.Content = this.oInfRecAdmContBegun;
                }
                break;
            case SlotStatus.DEFERADMIN:
                // if (this.oInfRecAdmContDefer == null) {
                this.oInfRecAdmContDefer = new InfRecAdmContDefer();
                this.valueForDeferScreen = 'defer';
                this.oInfRecAdmContDefer.valueUsed = this.valueForDeferScreen;
                this.oInfRecAdmContDefer.DataContext = this.recordadminVM;
                // }
                this.ContentCtrlMeddefaultview.Content = this.oInfRecAdmContDefer;
                break;
            case SlotStatus.NOTGIVEN:
                // if (this.oInfRecAdmContDefer == null) {
                this.oInfRecAdmContDefer = new InfRecAdmContDefer();
                this.valueForDeferScreen = 'notgiven';
                this.oInfRecAdmContDefer.valueUsed = this.valueForDeferScreen;
                this.oInfRecAdmContDefer.DataContext = this.recordadminVM;
                // }
                this.ContentCtrlMeddefaultview.Content = this.oInfRecAdmContDefer;
                break;
            case MedicationAction.PAUSE:
                // if (this.oInfRecAdmContDefer == null) {
                this.oInfRecAdmContDefer = new InfRecAdmContDefer();
                this.oInfRecAdmContDefer.DataContext = this.recordadminVM;
                //revisitmeyasik
                // this.oInfRecAdmContDefer.cboreason.ItemsSource = this.recordadminVM.ReasonforPauselist;
                // }
                this.valueForDeferScreen = 'pause';
                this.oInfRecAdmContDefer.valueUsed = this.valueForDeferScreen;
                this.ContentCtrlMeddefaultview.Content = this.oInfRecAdmContDefer;
                break;
            case MedicationAction.RESUME:
                // if (this.oInfRecAdmContDefer == null) {
                if (String.Equals(this.recordadminVM.ItemSubType, InfusionTypesCode.SUBTYPE_GAS)) {
                    this.oInfRecAdmContDefer = new InfRecAdmContDefer();
                    this.oInfRecAdmContDefer.DataContext = this.recordadminVM;
                    this.valueForDeferScreen = 'resume';
                    this.oInfRecAdmContDefer.valueUsed = this.valueForDeferScreen;
                }
                else this.oInfRecAdmContResume = new InfRecAdmContResume(this.recordadminVM);
                // }
                if (String.Equals(this.recordadminVM.ItemSubType, InfusionTypesCode.SUBTYPE_GAS))
                    this.ContentCtrlMeddefaultview.Content = this.oInfRecAdmContDefer;
                else this.ContentCtrlMeddefaultview.Content = this.oInfRecAdmContResume;
                break;
            case MedicationAction.STOP:
            case MedicationAction.COMPLETE:
                if (this.recordadminVM.InfusionType != null && !String.IsNullOrEmpty(this.recordadminVM.InfusionType.Value) && (String.Compare(this.recordadminVM.InfusionType.Value, InfusionTypesCode.CONTINUOUS) == 0) || String.Compare(this.recordadminVM.InfusionType.Value, InfusionTypesCode.FLUID) == 0 || String.Compare(this.recordadminVM.InfusionType.Value, InfusionTypesCode.SINGLEDOSEVOLUME) == 0) {
                    if (this.oInfRecAdmCSFStopComplete == null) {
                        this.oInfRecAdmCSFStopComplete = new InfRecAdmCSFStopComplete();
                        this.oInfRecAdmCSFStopComplete.DataContext = this.recordadminVM;
                    }
                    this.ContentCtrlMeddefaultview.Content = this.oInfRecAdmCSFStopComplete;
                }
                else {
                    // if (this.oInfRecAdmContStop == null) {
                    this.oInfRecAdmContStop = new InfRecAdmContStop();
                    this.oInfRecAdmContStop.DataContext = this.recordadminVM;
                    //}
                    this.ContentCtrlMeddefaultview.Content = this.oInfRecAdmContStop;
                }
                break;
            case MedicationAction.CHANGEBAG:
                if (this.oInfRecAdmPCAChangeBag == null && this.recordadminVM.InfusionType != null && (String.Equals(this.recordadminVM.InfusionType.Value, InfusionTypesCode.PCA, StringComparison.CurrentCultureIgnoreCase) || String.Equals(this.recordadminVM.InfusionType.Value, InfusionTypesCode.INTERMITTENT, StringComparison.CurrentCultureIgnoreCase))) {
                    this.oInfRecAdmPCAChangeBag = new InfRecAdmPCAChangeBag();
                }
                else if (this.oInfRecAdmCSFChangeBag == null) {
                    this.oInfRecAdmCSFChangeBag = new InfRecAdmCSFChangeBag(this.recordadminVM);
                }
                if (this.recordadminVM.InfusionType != null && (String.Equals(this.recordadminVM.InfusionType.Value, InfusionTypesCode.PCA, StringComparison.CurrentCultureIgnoreCase) || String.Equals(this.recordadminVM.InfusionType.Value, InfusionTypesCode.INTERMITTENT, StringComparison.CurrentCultureIgnoreCase))) {
                    this.ContentCtrlMeddefaultview.Content = this.oInfRecAdmPCAChangeBag;
                }
                else {
                    this.ContentCtrlMeddefaultview.Content = this.oInfRecAdmCSFChangeBag;
                    // this.oInfRecAdmCSFChangeBag = new InfRecAdmCSFChangeBag();
                    // this.oInfRecAdmCSFChangeBag.DataContext = this.recordadminVM;
                    // this.ContentCtrlMeddefaultview.Content = this.oInfRecAdmCSFChangeBag;
                }
                break;
            case MedicationAction.CHANGEFLOWRATE:
                if (this.oInfRecAdmContChangeFlowRate == null) {
                    this.oInfRecAdmContChangeFlowRate = new InfRecAdmContChangeFlowRate();
                    this.oInfRecAdmContChangeFlowRate.DataContext = this.recordadminVM;
                }
                this.ContentCtrlMeddefaultview.Content = this.oInfRecAdmContChangeFlowRate;
                break;
        }
        this.recordadminVM.InfusionAction = _InfusionAction;
    }
    recordadminVM_OnInfMovetoNotGiven(): void {
        this.iRdbBegun.IsChecked = false;
        this.iRdbNotGiven.IsChecked = true;
        this.LoadInfActionForm(SlotStatus.NOTGIVEN);
        let objDefer: InfRecAdmContDefer = ObjectHelper.CreateType<InfRecAdmContDefer>(this.ContentCtrlMeddefaultview.Content, InfRecAdmContDefer);
        objDefer.brdreason.Visibility = Visibility.Collapsed;
        objDefer.lbldateTime.Visibility = Visibility.Collapsed;
        objDefer.dtpDate.Visibility = Visibility.Collapsed;
        objDefer.idatetime.Visibility = Visibility.Collapsed;
        objDefer.cboreason.ClearValue();
        objDefer.cboreason.SetBinding(iComboBox.ItemsSourceProperty, ObjectHelper.CreateObject(new Binding("ReasonNotGivens"), { Mode: BindingMode.TwoWay }));
        objDefer.cboreason.SetBinding(iComboBox.SelectedValueProperty, ObjectHelper.CreateObject(new Binding("ReasonNotGiven"), { Mode: BindingMode.TwoWay }));
        objDefer.lblReason.Text = Resource.MedicationAdministrator.lblResNotGiven_text;
        this.cmdbagdetails.Visibility = Visibility.Collapsed;
        this.cmdStrikethroughadmin.Visibility = Visibility.Collapsed;
        this.recordadminVM.IsClinicalRSNMand = false;
        this.recordadminVM.IsStopClinicalRSNMand = false;
    }
    public CheckWarningMessages(ResourceKey: string, sFieldname: string): void {
        let oiMessageBox: iMessageBox = new iMessageBox();
        oiMessageBox.MessageButton = MessageBoxButton.YesNo;
        oiMessageBox.Title = "LORENZO";
        oiMessageBox.IconType = MessageBoxType.Question;
        oiMessageBox.Tag = sFieldname;
        if (sFieldname.Equals(CConstants.ParacetamolRecentlyAdministered, StringComparison.InvariantCultureIgnoreCase)) {
            oiMessageBox.Width = 420;
            oiMessageBox.Height = 180;
        }
        oiMessageBox.MessageBoxClose = (s, e) => { this.oiMessageBox_YesNoAdminTime(oiMessageBox, e); };
        oiMessageBox.Message = ResourceKey;
        oiMessageBox.Show();
    }
    oiMessageBox_YesNoAdminTime(sender: Object, e: MessageEventArgs): void {
        let oMsgBox: iMessageBox = ObjectHelper.CreateType<iMessageBox>(sender, iMessageBox);
        if (oMsgBox != null && oMsgBox.Tag != null) {
            let sField: string = oMsgBox.Tag.ToString();
            if (e.MessageBoxResult == MessageBoxResult.Yes) {
                if (sField == CConstants.ParacetamolRecentlyAdministered) {
                    this.recordadminVM.sParacetamolRecentlyAdministered = 1;
                    sField = AdministrationField.BeginTime;
                }
                this.recordadminVM.CheckWarningMessages(sField, MessageBoxResult.Yes);
            }
            else if (e.MessageBoxResult == MessageBoxResult.No) {
                if (this.recordadminVM != null) {
                    this.recordadminVM.IsSubmitInProgress = false;
                }
                Busyindicator.SetStatusIdle("InfRecAdminSubmit");
                if (sField == CConstants.ParacetamolRecentlyAdministered) {
                    this.recordadminVM.sParacetamolRecentlyAdministered = -1;
                    sField = AdministrationField.BeginTime;
                }
                this.recordadminVM.CheckWarningMessages(sField, MessageBoxResult.No);
                this.InfRecordShowErrorMsgCompleted(sField);
            }
        }
    }
    public cmdScanRecMedication_Click(): void {
        this.recordadminVM.oDrugHeader = (this.objDrugHeader != null && this.objDrugHeader.DataContext != null) ? ObjectHelper.CreateType<CDrugHeader>((this.objDrugHeader.DataContext), CDrugHeader) : null;
        this.recordadminVM.LaunchScanRecordMedication();
    }

}
