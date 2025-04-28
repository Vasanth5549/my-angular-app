import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { iAppDialogWindow } from "src/app/shared/epma-platform/controls/iAppDialogWindow";
import { AdministrationDetailVM, SlotDetailVM } from "../viewmodel/MedicationChartVM";
import { ConditionalDoseChildView } from "./ConditionalDoseChildView";
import { MedScanRecordAdministration } from "./MedScanRecordadministration";
import { ConditionalDoseVM, RequestSource } from "src/app/lorappmedicationcommonbb/viewmodel/ConditionalDoseVM";
import { MedsAdminDoseDiscrepancyReason } from "./medsadmindosediscrepancyreason";
import { OverrideBarcodeScan } from "./OverrideBarcodeScan";
import { AppDialogEventargs, AppDialogResult, CListItem, CValuesetTerm, ChildWindow, ChildWizardCloseEventargs, HtmlPage, Int64, List, ObservableCollection, Visibility, WindowButtonType } from "epma-platform/models";
import { AppContextInfo, PatientContext } from 'src/app/lorappcommonbb/utilities/globalvariable';
import { AdministrationDetail, CMedBarcodeScanOverrideDetail, CPatLatestObsResParams, CReqMsgGetLatestObsOrResultDetails, CReqMsgGetMedicationScanDetails, CReqMsgGetRecordAdministionDetails, CReqMsgModifyAdministration, CResMsgGetLatestObsOrResultDetails, CResMsgGetMedicationScanDetails, CResMsgGetRecordAdministionDetails, CResMsgModifyAdministration, GetLatestObsOrResultDetailsCompletedEventArgs, GetMedicationScanDetailsCompletedEventArgs, GetRecordAdministionDetailsCompletedEventArgs, MedicationAdministrationWSSoapClient, MedicationScanDetailsRequest, MedsScanProductDetails, ModifyAdministrationCompletedEventArgs, SlotDetail, UOM } from "src/app/shared/epma-platform/soap-client/MedicationAdministrationWS";
import { MedsAdminUserAuthenticate } from "src/app/lorappmedicationcommonbb/view/medsadminuserauthenticate";
import DateTime from "epma-platform/DateTime";
import { SelectedUserType, WitnessHelper } from "src/app/lorappmedicationcommonbb/utilities/witnesshelper";
import { Border, StackPanel, ToolTipService, iButton, iCheckBox, iComboBox, iDateTimePicker, iLabel, iRadioButton, iTextBox, iTimeBox } from "epma-platform/controls";
import { iSFS } from "src/app/shared/epma-platform/controls/epma-isfs/epma-isfs.component";
import { ObservationChartVM } from "../ca/observationchart/ObservationChartVM";
import { CommonBB } from "src/app/lorappcommonbb/utilities/common";
import { Convert, AppActivity, MessageBoxButton, MessageBoxResult, MessageBoxType, MessageEventArgs, ObjectHelper, ScriptObject, StringBuilder, iMessageBox } from "epma-platform/services";
import { CReqMsgGetPatientPersonalCarer, CResMsgGetPatientPersonalCarer, GetPatientPersonalCarerCompletedEventArgs, QueryPatientRecordWSSoapClient } from "src/app/shared/epma-platform/soap-client/QueryPatientRecordWS";
import { MedScanRecAdmVM, ProductDetailsGrid } from "../viewmodel/MedScanRecAdmVM";
import { MedicationAdministrator } from "../resource/medicationadministrator.designer";
import { ConditionalRegime } from "../resource/conditionalregime.designer";
import { ChartContext, MedChartData, TagDrugHeaderDetail } from "../utilities/globalvariable";
import { Resource } from "../resource";
import { SlotAdministrationHelper } from "../common/slotadministrationhelper";
import { TextBoxComponent } from "@progress/kendo-angular-inputs";
import { CConstants, DoseTypeCode, MultiRouteType, SlotStatus, ValueDomain } from "../utilities/CConstants";
import { MedicationCommonBB } from "src/app/lorappmedicationcommonbb/utilities/medicationcommonbb";
import { Common } from "../utilities/common";
import { CReqMsgGetDrugSites, CResMsgGetDrugSites, GetDrugSitesCompletedEventArgs, IPPMAManagePrescriptionWSSoapClient } from "src/app/shared/epma-platform/soap-client/IPPMAManagePrescriptionWS";
import { CReqMsgIsWitnessRequired, CResMsgIsWitnessRequired, IPPMAPrescribableDefnWSSoapClient, IsWitnessRequiredCompletedEventArgs, WitnessCriteria } from "src/app/shared/epma-platform/soap-client/IPPMAPrescribableDefnWS";
import { ProfileData } from "../utilities/ProfileData";
import { SLSFSItem } from "src/app/shared/epma-platform/models/model";
import { ConditionalDoseRegimeView } from "../view/ConditionalDoseRegimeView";
import { Busyindicator } from "src/app/lorappcommonbb/busyindicator";
import { ManageBarcodeHelper } from "../common/ManageBarcodeHelper";
import { CReqMsgGetUser, CResMsgGetUser, CSecurityManagementServiceWSSoapClient, GetUserCompletedEventArgs } from "src/app/shared/epma-platform/soap-client/CSecurityManagementServiceWS";
import { OverrideBarcodeScanVM } from "../viewmodel/OverrideBarcodeScanVM";
import { DateChangedArgs } from "src/app/shared/epma-platform/controls/Control";
import { MedicationCommonConceptCodeData } from "src/app/lorappmedicationcommonbb/utilities/profiledata";
import { AuthResult } from "src/app/lorappmedicationcommonbb/viewmodel/UserAuthenticateVM";
import { CDrugHdrAddnlInfo, CDrugHeader, DrugHeader } from '../common/drugheader';
import * as PrescribableDefn from 'src/app/shared/epma-platform/soap-client/IPPMAPrescribableDefnWS';
import { MCommonBB } from "src/app/lorappmedicationcommonbb/utilities/common";
import { AMSHelper } from "src/app/lorappcommonbb/amshelper";

@Component({
    selector: 'MedsAdminModifyAdministration',
    templateUrl: './MedsAdminModifyAdministration.html',
    styleUrls: ['./MedsAdminModifyAdministration.css']
  })
  
export class MedsAdminModifyAdministration extends iAppDialogWindow implements AfterViewInit, OnInit {

    objDrugHeader: DrugHeader;
    @ViewChild('objDrugHeaderTempRef', { read: DrugHeader, static: false }) set _drugheader(c: DrugHeader) { if (c) { this.objDrugHeader = c; } }
    // txtBarcodeModAdmin: iTextBox;
    // @ViewChild('txtBarcodeModAdminTempRef', { read: iTextBox, static: false }) set _textbox1(c: iTextBox) { if (c) { this.txtBarcodeModAdmin = c; } }
    @ViewChild('txtBarcodeModAdminTempRef', { static: false }) txtBarcodeModAdmin: ElementRef;
    sfsAdministeredby: iSFS; 
    @ViewChild('sfsAdministeredbyTempRef', { read: iSFS, static: false }) set _sfs1(c: iSFS) { if (c) { this.sfsAdministeredby = c; } }
    lblComments: iLabel; 
    @ViewChild('lblCommentsTempRef', { read: iLabel, static: false }) set _label1(c: iLabel) { if (c) { this.lblComments = c; } }
    cboResFordefer: iComboBox; 
    @ViewChild('cboResFordeferTempRef', { read: iComboBox, static: false }) set _combobox1(c: iComboBox) { if (c) { this.cboResFordefer = c; } }
    iRdbGiven: iRadioButton; 
    @ViewChild('iRdbGivenTempRef', { read: iRadioButton, static: false }) set _radiobutton1(c: iRadioButton) { if (c) { this.iRdbGiven = c; } }
    cboRoute: iComboBox; 
    @ViewChild('cboRouteTempRef', { read: iComboBox, static: false }) set _combobox2(c: iComboBox) { if (c) { this.cboRoute = c; } }
    cboResNotGiven: iComboBox; 
    @ViewChild('cboResNotGivenTempRef', { read: iComboBox, static: false }) set _combobox3(c: iComboBox) { if (c) { this.cboResNotGiven = c; } }
    iRdbNotGiven: iRadioButton; 
    @ViewChild('iRdbNotGivenTempRef', { read: iRadioButton, static: false }) set _radiobutton2(c: iRadioButton) { if (c) { this.iRdbNotGiven = c; } }
    cboConVolumeUoMValue: iComboBox; 
    @ViewChild('cboConVolumeUoMValueTempRef', { read: iComboBox, static: false }) set _combobox4(c: iComboBox) { if (c) { this.cboConVolumeUoMValue = c; } }
    txtConVolumeValue: TextBoxComponent; 
    @ViewChild('txtConVolumeValueTempRef', { read: TextBoxComponent, static: false }) set _textbox2(c: TextBoxComponent) { if (c) { this.txtConVolumeValue = c; } }
    cboConStrengthUoMValue: iComboBox; 
    @ViewChild('cboConStrengthUoMValueTempRef', { read: iComboBox, static: false }) set _combobox5(c: iComboBox) { if (c) { this.cboConStrengthUoMValue = c; } }
    chkNoWitness: iCheckBox; 
    @ViewChild('chkNoWitnessTempRef', { read: iCheckBox, static: false }) set _checkbox1(c: iCheckBox) { if (c) { this.chkNoWitness = c; } }
    rdbparent: iRadioButton; 
    @ViewChild('rdbparentTempRef', { read: iRadioButton, static: false }) set _radiobutton3(c: iRadioButton) { if (c) { this.rdbparent = c; } }
    cboParentCarer: iComboBox; 
    @ViewChild('cboParentCarerTempRef', { read: iComboBox, static: false }) set _combobox6(c: iComboBox) { if (c) { this.cboParentCarer = c; } }
    sfsWitnessedby: iSFS; 
    @ViewChild('sfsWitnessedbyTempRef', { read: iSFS, static: false }) set _sfs2(c: iSFS) { if (c) { this.sfsWitnessedby = c; } }
    dtpDateTimeGivenText: iDateTimePicker; 
    @ViewChild('dtpDateTimeGivenTextTempRef', { read: iDateTimePicker, static: false }) set _datetimepicker1(c: iDateTimePicker) { if (c) { this.dtpDateTimeGivenText = c; } }
    cboExpiryDate: iDateTimePicker; 
    @ViewChild('cboExpiryDateTempRef', { read: iDateTimePicker, static: false }) set _datetimepicker2(c: iDateTimePicker) { if (c) { this.cboExpiryDate = c; } }
    iRdbSelfAdmin: iRadioButton; 
    @ViewChild('iRdbSelfAdminTempRef', { read: iRadioButton, static: false }) set _radiobutton4(c: iRadioButton) { if (c) { this.iRdbSelfAdmin = c; } }
    txtConStrengthValue: TextBoxComponent; 
    @ViewChild('txtConStrengthValueTempRef', { read: TextBoxComponent, static: false }) set _textbox3(c: TextBoxComponent) { if (c) { this.txtConStrengthValue = c; } }
    timeDateTimeGivenText: iTimeBox; 
    @ViewChild('timeDateTimeGivenTextTempRef', { read: iTimeBox, static: false }) set _timebox1(c: iTimeBox) { if (c) { this.timeDateTimeGivenText = c; } }
    txtComments: iTextBox; 
    @ViewChild('txtCommentsTempRef', { read: iTextBox, static: false }) set _textbox4(c: iTextBox) { if (c) { this.txtComments = c; } }
    txtDose: iTextBox; 
    @ViewChild('txtDoseTempRef', { read: iTextBox, static: false }) set _textbox5(c: iTextBox) { if (c) { this.txtDose = c; } }
    cboDoseUOM: iComboBox; 
    @ViewChild('cboDoseUOMTempRef', { read: iComboBox, static: false }) set _combobox8(c: iComboBox) { if (c) { this.cboDoseUOM = c; } }
    rdbCareProvider: iRadioButton; 
    @ViewChild('rdbCareProviderTempRef', { read: iRadioButton, static: false }) set _radiobutton6(c: iRadioButton) { if (c) { this.rdbCareProvider = c; } }
    lblWitnessedBy: iLabel; 
    @ViewChild('lblWitnessedByTempRef', { read: iLabel, static: false }) set _label2(c: iLabel) { if (c) { this.lblWitnessedBy = c; } }
    cboInfusionperiodUoMValue: iComboBox; 
    @ViewChild('cboInfusionperiodUoMValueTempRef', { read: iComboBox, static: false }) set _combobox9(c: iComboBox) { if (c) { this.cboInfusionperiodUoMValue = c; } }
    Infusionperiodtext: iTextBox; 
    @ViewChild('InfusionperiodtextTempRef', { read: iTextBox, static: false }) set _textbox6(c: iTextBox) { if (c) { this.Infusionperiodtext = c; } }
    SteppedImg: iButton; 
    @ViewChild('SteppedImgTempRef', { read: iButton, static: false }) set _button2(c: iButton) { if (c) { this.SteppedImg = c; } }
    iRdbNotKnown: iRadioButton; 
    @ViewChild('iRdbNotKnownTempRef', { read: iRadioButton, static: false }) set _radiobutton7(c: iRadioButton) { if (c) { this.iRdbNotKnown = c; } }
    lblDoseUoM: iLabel; 
    @ViewChild('lblDoseUoMTempRef', { read: iLabel, static: false }) set _label3(c: iLabel) { if (c) { this.lblDoseUoM = c; } }
    cmdScanRecMedication: iButton; 
    @ViewChild('cmdScanRecMedicationTempRef', { read: iButton, static: false }) set _button3(c: iButton) { if (c) { this.cmdScanRecMedication = c; } }
    lblAdministeredby: iLabel; 
    @ViewChild('lblAdministeredbyTempRef', { read: iLabel, static: false }) set _label4(c: iLabel) { if (c) { this.lblAdministeredby = c; } }
    lblRoute: iLabel; 
    @ViewChild('lblRouteTempRef', { read: iLabel, static: false }) set _label5(c: iLabel) { if (c) { this.lblRoute = c; } }
    rdbPatient: iRadioButton; 
    @ViewChild('rdbPatientTempRef', { read: iRadioButton, static: false }) set _radiobutton8(c: iRadioButton) { if (c) { this.rdbPatient = c; } }
    stepped: Border; 
    @ViewChild('steppedTempRef', { read: Border, static: false }) set _border1(c: Border) { if (c) { this.stepped = c; } }
    steppedtheme: Border; 
    @ViewChild('steppedthemeTempRef', { read: Border, static: false }) set _border2(c: Border) { if (c) { this.steppedtheme = c; } }
    lblResNotGiven: iLabel; 
    @ViewChild('lblResNotGivenTempRef', { read: iLabel, static: false }) set _label6(c: iLabel) { if (c) { this.lblResNotGiven = c; } }
    brdreasonntgiven: Border; 
    @ViewChild('brdreasonntgivenTempRef', { read: Border, static: false }) set _border4(c: Border) { if (c) { this.brdreasonntgiven = c; } }
    bgreasonntgiven: Border; 
    @ViewChild('bgreasonntgivenTempRef', { read: Border, static: false }) set _border5(c: Border) { if (c) { this.bgreasonntgiven = c; } }
    brdsfswitby: Border; 
    @ViewChild('brdsfswitbyTempRef', { read: Border, static: false }) set _border6(c: Border) { if (c) { this.brdsfswitby = c; } }
    bgsfswitby: Border; 
    @ViewChild('bgsfswitbyTempRef', { read: Border, static: false }) set _border7(c: Border) { if (c) { this.bgsfswitby = c; } }
    brddttimegiven: Border; 
    @ViewChild('brddttimegivenTempRef', { read: Border, static: false }) set _border8(c: Border) { if (c) { this.brddttimegiven = c; } }
    brdsfsadminby: Border; 
    @ViewChild('brdsfsadminbyTempRef', { read: Border, static: false }) set _border10(c: Border) { if (c) { this.brdsfsadminby = c; } }
    bgsfsadminby: Border; 
    @ViewChild('bgsfsadminbyTempRef', { read: Border, static: false }) set _border11(c: Border) { if (c) { this.bgsfsadminby = c; } }
    bgchkwit: Border; 
    @ViewChild('bgchkwitTempRef', { read: Border, static: false }) set _border12(c: Border) { if (c) { this.bgchkwit = c; } }
    brdreasonfordefer: Border; 
    @ViewChild('brdreasonfordeferTempRef', { read: Border, static: false }) set _border13(c: Border) { if (c) { this.brdreasonfordefer = c; } }
    bgreasonfordefer: Border; 
    @ViewChild('bgreasonfordeferTempRef', { read: Border, static: false }) set _border14(c: Border) { if (c) { this.bgreasonfordefer = c; } }
    bgddttimegiven: Border; 
    @ViewChild('bgddttimegivenTempRef', { read: Border, static: false }) set _border15(c: Border) { if (c) { this.bgddttimegiven = c; } }
    bgrdbadminby: Border; 
    @ViewChild('bgrdbadminbyTempRef', { read: Border, static: false }) set _border16(c: Border) { if (c) { this.bgrdbadminby = c; } }
    lblResFordefer: iLabel; 
    @ViewChild('lblResFordeferTempRef', { read: iLabel, static: false }) set _label7(c: iLabel) { if (c) { this.lblResFordefer = c; } }
    critical: iLabel; 
    @ViewChild('criticalTempRef', { read: iLabel, static: false }) set _label8(c: iLabel) { if (c) { this.critical = c; } }
    lblDateTimeGivenText: iLabel; 
    @ViewChild('lblDateTimeGivenTextTempRef', { read: iLabel, static: false }) set _label9(c: iLabel) { if (c) { this.lblDateTimeGivenText = c; } }
    lblNoParentCarerListed: iLabel; 
    @ViewChild('lblNoParentCarerListedTempRef', { read: iLabel, static: false }) set _label10(c: iLabel) { if (c) { this.lblNoParentCarerListed = c; } }
    lblRelation: iLabel; 
    @ViewChild('lblRelationTempRef', { read: iLabel, static: false }) set _label11(c: iLabel) { if (c) { this.lblRelation = c; } }
    lblRelationSelected: iLabel; 
    @ViewChild('lblRelationSelectedTempRef', { read: iLabel, static: false }) set _label12(c: iLabel) { if (c) { this.lblRelationSelected = c; } }
    stpCareProvider: StackPanel; 
    @ViewChild('stpCareProviderTempRef', { read: StackPanel, static: false }) set _stackpanel1(c: StackPanel) { if (c) { this.stpCareProvider = c; } }
    MedDoseinfo: StackPanel; 
    @ViewChild('MedDoseinfoTempRef', { read: StackPanel, static: false }) set _stackpanel2(c: StackPanel) { if (c) { this.MedDoseinfo = c; } }
    CriticalDrugSiteURL: StackPanel; 
    @ViewChild('CriticalDrugSiteURLTempRef', { read: StackPanel, static: false }) set _stackpanel3(c: StackPanel) { if (c) { this.CriticalDrugSiteURL = c; } }
    CriticalMedMsg: StackPanel; 
    @ViewChild('CriticalMedMsgTempRef', { read: StackPanel, static: false }) set _stackpanel4(c: StackPanel) { if (c) { this.CriticalMedMsg = c; } }
    chkNoParentCarerListed: iCheckBox; 
    @ViewChild('chkNoParentCarerListedTempRef', { read: iCheckBox, static: false }) set _checkbox2(c: iCheckBox) { if (c) { this.chkNoParentCarerListed = c; } }
    lblDose: iLabel; 
    @ViewChild('lblDoseTempRef', { read: iLabel, static: false }) set _label13(c: iLabel) { if (c) { this.lblDose = c; } }
    lblcliniIncFrm: iLabel; 
    @ViewChild('lblcliniIncFrmTempRef', { read: iLabel, static: false }) set _label14(c: iLabel) { if (c) { this.lblcliniIncFrm = c; } }
    lblcliniIncFrmValue: iLabel; 
    @ViewChild('lblcliniIncFrmValueTempRef', { read: iLabel, static: false }) set _label15(c: iLabel) { if (c) { this.lblcliniIncFrmValue = c; } }    
    lblNoWitness: iLabel; 
    @ViewChild('lblNoWitnessTempRef', { read: iLabel, static: false }) set _label16(c: iLabel) { if (c) { this.lblNoWitness = c; } }    
    lblAmendReason: iLabel; 
    @ViewChild('lblAmendReasonTempRef', { read: iLabel, static: false }) set _label17(c: iLabel) { if (c) { this.lblAmendReason = c; } }    
    cboAmendReason: iComboBox; 
    @ViewChild('cboAmendReasonTempRef', { read: iComboBox, static: false }) set _combobox10(c: iComboBox) { if (c) { this.cboAmendReason = c; } }
    brdMedicationAction: Border; 
    @ViewChild('brdMedicationActionTempRef', { read: Border, static: false }) set _border3(c: Border) { if (c) { this.brdMedicationAction = c; } }    
    cboSite: iComboBox;
    @ViewChild('cboSiteTempRef', { read: iComboBox, static: false }) set _combobox11(c: iComboBox) { if (c) { this.cboSite = c; } }
  
    oSlotDetailVM: SlotDetailVM;
    public objObsResultVM: ObservationChartVM;
    prescriptionOid: number = 0;
    prescriptionSchOid: number = 0;
    doseValUOM: string;
    doseValUOMLzoID: string;
    lnDosUOMOID: number = 0;
    dblLDose: number = 0;
    dblUDose: number = 0;
    SlotsTimeIntervalAvg: number = 0;
    medAdminOid: number;
    objVm: SlotDetailVM;
    objVmsltDoseDis: SlotDetailVM;
    oParam: string = String.Empty;
    IdentifyingType: string = String.Empty;
    IdentifyingOID: number = 0;
    MCVersion: string = String.Empty;
    cReasonNotGiven: CListItem;
    strDoseType: string = String.Empty;
    strDose: string = String.Empty;
    lnRouteOID: number = 0;
    bIsControlledDrug: boolean = false;
    bIsWitnessReqd: boolean = false;
    sAdminMethod: string = String.Empty;
    strLorenzoID: string = String.Empty;
    cAdministeredTimeMode: string = 'N';
    static sPatinet: string = "Patient";
    static sParentCarer: string = "Parent/Carer";
    sDrugName: string = String.Empty;
    sObsDrugName: string = String.Empty;
    sMCitemname: string = String.Empty;
    slorenzoid: string = String.Empty;
    private ConditionalVM: ConditionalDoseVM;
    bIsPRN: boolean = false;
    private strUserName: string = String.Empty;
    ConditionalChildView: ConditionalDoseChildView;
    objMedsAdminDoseDiscrepancyReason: MedsAdminDoseDiscrepancyReason;
    objDoseDis: MedsAdminDoseDiscrepancyReason;
    oOverrideBarcodeScan: OverrideBarcodeScan;
    lstCMedBarcodeScanOverrideDetail: ObservableCollection<CMedBarcodeScanOverrideDetail>;
    private oChildWindow: ChildWindow;
    objMedsAdminUserAuthenticate: MedsAdminUserAuthenticate;
    public OnSubmitModAdminEvent: Function;
    public OnSubmitModAdminOverviewEvent: Function;
    public OnSubmitModAdminChartviewEvent: Function;
    public date: DateTime;
    public SlotDate: DateTime;
    public dSlotDate: DateTime;
    PrescriptionItemStartDTTM: DateTime = DateTime.MinValue;
    PrescriptionItemEndDTTM: DateTime = DateTime.MinValue;
    PrescItemStatus: string = String.Empty;
    private CurrentDTTM: DateTime = CommonBB.GetServerDateTime();
    sItemType: string = String.Empty;
    sItemSubType: string = String.Empty;
    objWitnessHelper: WitnessHelper;
    private IsWitnessOverrideAllowed: boolean;
    public IsBolus: boolean = false;
    public IsSlotInPastDateAndStatusUnknown: boolean = false;
    IsConditionalExists: boolean;
    IsPRNwithSchedule: boolean;
    IsConstructorExecInProgress: boolean = false;
    IsUpdatePIStatusToCompleted: boolean = false;
    sMultiRoute: string = String.Empty;
    AfterEnd: boolean = true;
    sParacetamolRecentlyAdministered: number = -1;
    personalCarers: ObservableCollection<CListItem>;
    conceptCodes: StringBuilder = new StringBuilder();
    resolvedConceptCodes: ObservableCollection<CListItem>;
    AdminByPersonalCarerRecorded: string = String.Empty;
    AdminByTypeRecorded: string = String.Empty;
    AdminByRelationship: string = String.Empty;
    objResPersonalCarer: CResMsgGetPatientPersonalCarer;
    sAdminByPersonalCarer: CListItem = null;
    oMedScanRecordAdministration: MedScanRecordAdministration;
    oMedScanRecAdmVM: MedScanRecAdmVM;
    oMsg: iMessageBox = new iMessageBox();
    IsRouteChngd: boolean = false;
    OldAction: string = String.Empty;
    NewAction: string = String.Empty;
    IsPatWristBandOverridden: boolean = false;
    IsMedExclude: boolean = false;
    IsLaunchedFromScanMedlink: boolean = false;
    IsInfBolusItemsVisible: boolean = false;
    bGivenParentSelected: boolean = false;
    bSelfAdminParentSelected: boolean = false;
    bDontSetAdministeredbyDefValue: boolean = false;

    chkNoWitness_Checked_Func: Function;
    chkNoWitness_Unchecked_Func: Function;
    chkNoParentCarerlisted_Checked_Func: Function;
    chkNoParentCarerlisted_Unchecked_Func: Function;
    lblCIFValue_MouseLeftButtonUp_Func: Function;
    dtpDateTimeGivenText_OnDateChange_Func: Function;
    txtDose_KeyUp_Func: Function;

    constructor() {
        super();
    }

    constructorImpl(objSlotDetailVM: SlotDetailVM) {
        this.oSlotDetailVM = objSlotDetailVM;

        this.objVm = new SlotDetailVM();
        this.objVm.AdministrationDetail = new AdministrationDetailVM();
    }
    ngOnInit(): void {
        this.chkNoWitness_Checked_Func = (s, e) => { this.chkNoWitness_Checked(e); };
        this.chkNoWitness_Unchecked_Func = (s, e) => { this.chkNoWitness_Unchecked(e); };
        this.chkNoParentCarerlisted_Checked_Func = (s, e) => { this.chkNoParentCarerlisted_Checked(); };
        this.chkNoParentCarerlisted_Unchecked_Func = (s, e) => { this.chkNoParentCarerlisted_Unchecked(); }
        this.lblCIFValue_MouseLeftButtonUp_Func = (s, e) => { this.lblCIFValue_MouseLeftButtonUp(s) }
        this.dtpDateTimeGivenText_OnDateChange_Func = (s, e) => { this.dtpDateTimeGivenText_OnDateChange(e) }
        this.txtDose_KeyUp_Func = (s, e) => { this.txtDose_KeyUp(e); };
    }
    GetResourceString(sResource: string, sKey: string) {
        if (sResource == 'MedAdmin') {
            let oMedicationAdministrator: MedicationAdministrator = new MedicationAdministrator();
            return oMedicationAdministrator.GetResourceString(sKey);
        }
        else if (sResource == 'CondRegime') {
            let oConditionalRegime: ConditionalRegime = new ConditionalRegime();
            return oConditionalRegime.GetResourceString(sKey);
        }
        return null;
    }
    public maxScrollHeight;
    ngAfterViewInit(): void {

        if(window.screen.height < 1000 && window.devicePixelRatio != 1.25){
            this.maxScrollHeight = 290;
        }else{
        this.maxScrollHeight =(window.devicePixelRatio == 1) ? 564 :(650/window.devicePixelRatio)-135;}
        this.IsConstructorExecInProgress = true;
        this.objVmsltDoseDis = this.oSlotDetailVM;
        this.IsUpdatePIStatusToCompleted = this.oSlotDetailVM.IsUpdatePIStatusToCompleted;
        if (this.oSlotDetailVM != null)
            this.date = this.oSlotDetailVM.PrescriptionStartDate.Date;
        this.SlotDate = this.oSlotDetailVM.ScheduledDTTM;
        this.dSlotDate = this.oSlotDetailVM.TodaySlotDate;
        this.bIsPRN = this.oSlotDetailVM.IsLastPRN;
        if (this.oSlotDetailVM != null && this.oSlotDetailVM.DrugDetail != null && this.oSlotDetailVM.DrugDetail.Tag != null) {
            var oTagdrugHeaderDetails: TagDrugHeaderDetail = <TagDrugHeaderDetail>(this.oSlotDetailVM.DrugDetail.Tag as TagDrugHeaderDetail);
            this.IsPRNwithSchedule = oTagdrugHeaderDetails.IsPRNWithSchedule;
        }
        if (this.oSlotDetailVM.Status == SlotStatus.NOTGIVEN) {
            this.iRdbNotGiven.IsChecked = true;
            if (this.objVm == null)
                this.objVm = new SlotDetailVM();
            this.objVm.IsLastPRN = this.oSlotDetailVM.IsLastPRN;
            this.objVm.CurrentServerDate = this.CurrentDTTM;
            if (this.objVm.AdministrationDetail == null)
                this.objVm.AdministrationDetail = new AdministrationDetailVM();
        }
        else if (this.oSlotDetailVM.Status == SlotStatus.NOTKNOWN) {
            this.iRdbNotKnown.Visibility = Visibility.Visible;
            this.iRdbNotKnown.IsChecked = true;
        }
        else this.iRdbGiven.IsChecked = true;
        this.rdbCareProvider.IsChecked = true;
        this.lblAdministeredby.Mandatory = true;
        this.chkNoWitness.IsEnabled = false;

        this.HideDivElement("divCriticalMedMsg");
        
        this.prescriptionOid = this.oSlotDetailVM.PrescriptionItemOID;
        this.prescriptionSchOid = this.oSlotDetailVM.PresScheduleOID;
        this.IdentifyingType = this.oSlotDetailVM.IdentifyingType;
        this.IdentifyingOID = this.oSlotDetailVM.IdentifyingOID;
        this.MCVersion = this.oSlotDetailVM.MCVersionNo;
        this.prescriptionOid = this.oSlotDetailVM.PrescriptionItemOID;
        this.strDoseType = this.oSlotDetailVM.DoseType;
        this.strDose = this.oSlotDetailVM.Dose;
        this.SlotsTimeIntervalAvg = this.oSlotDetailVM.SlotsTimeIntervalAvg;
        this.PrescriptionItemStartDTTM = this.oSlotDetailVM.PrescriptionStartDate;
        this.PrescriptionItemEndDTTM = this.oSlotDetailVM.PrescriptionEndDate;
        this.PrescItemStatus = this.oSlotDetailVM.PrescriptionItemStatus;
        this.IsConditionalExists = this.oSlotDetailVM.IsConditionalExists;
        this.sObsDrugName = (<TagDrugHeaderDetail>(this.oSlotDetailVM.DrugDetail.Tag)).DrugName;
        if ((<TagDrugHeaderDetail>(this.oSlotDetailVM.DrugDetail.Tag)).MultiComponentItems != null && (<TagDrugHeaderDetail>(this.oSlotDetailVM.DrugDetail.Tag)).MultiComponentItems.Count > 0)
            //this.sMCitemname = String.Join("^", (<TagDrugHeaderDetail>(this.oSlotDetailVM.DrugDetail.Tag)).MultiComponentItems);
        this.sItemType = (<TagDrugHeaderDetail>(this.oSlotDetailVM.DrugDetail.Tag)).ItemType.ToUpper();
        this.sItemSubType = (<TagDrugHeaderDetail>(this.oSlotDetailVM.DrugDetail.Tag)).ItemSubType;
        this.slorenzoid = (<TagDrugHeaderDetail>(this.oSlotDetailVM.DrugDetail.Tag)).LorenzoID;
        if (String.Compare(this.sItemType, CConstants.Formulary_Drug) == 0)
            this.lblRoute.Mandatory = true;
        else this.lblRoute.Mandatory = false;
        this.SteppedImg.Visibility = (String.Compare(this.strDoseType, DoseTypeCode.CONDITIONAL) == 0 && this.IsConditionalExists) ? Visibility.Visible : Visibility.Collapsed;
        this.stepped.Visibility = this.SteppedImg.Visibility;
        if (String.Compare(this.strDoseType, DoseTypeCode.CONDITIONAL) == 0 && this.IsConditionalExists) {
            ToolTipService.SetToolTip(this.SteppedImg, Resource.ConditionalRegime.DoseDetailsIcon_ToolTip);
        }
        if (this.oSlotDetailVM.DrugDetail != null) {
            this.sDrugName = this.oSlotDetailVM.DrugDetail.Drugname;
            if (!String.IsNullOrEmpty(this.oSlotDetailVM.DrugDetail.Dose) && this.oSlotDetailVM.DrugDetail.Dose.Contains("Titrated") && ((this.oSlotDetailVM.Dose == CConstants.DoseTBD) || (!String.IsNullOrEmpty(this.oSlotDetailVM.Dose) && Convert.ToDouble(this.oSlotDetailVM.Dose) == 0))) {
                this.iRdbNotGiven.IsChecked = true;
                this.iRdbGiven.IsEnabled = false;
                this.iRdbNotGiven.IsEnabled = true;
                this.iRdbNotKnown.IsEnabled = false;
                this.iRdbSelfAdmin.IsEnabled = false;
            }
        }
        if (this.oSlotDetailVM.Status == SlotStatus.SELFADMINISTERED)
            this.iRdbSelfAdmin.IsChecked = true;
        this.lnRouteOID = this.oSlotDetailVM.RouteOID;
        this.strLorenzoID = this.oSlotDetailVM.LorenzoID;
        this.bIsControlledDrug = this.oSlotDetailVM.IsControlledDrug;
        this.sAdminMethod = this.oSlotDetailVM.AdminMethod;
        if (String.IsNullOrEmpty(this.sAdminMethod)) {
            if ((String.Compare(this.oSlotDetailVM.DoseType, DoseTypeCode.DOSAGERANGE) == 0) || (String.Compare(this.oSlotDetailVM.DoseType, DoseTypeCode.CONDITIONAL) == 0) || (String.Compare(this.oSlotDetailVM.DoseType, DoseTypeCode.STEPPED) == 0) || (String.Compare(this.oSlotDetailVM.DoseType, DoseTypeCode.STEPPEDVARIABLE) == 0)) {
                Number.TryParse(this.oSlotDetailVM.LDose, (o) => { this.dblLDose = o });
                Number.TryParse(this.oSlotDetailVM.UDose, (o) => { this.dblUDose = o });
            }
            this.doseValUOM = this.oSlotDetailVM.DoseUOM;
            this.doseValUOMLzoID = this.oSlotDetailVM.DoseUOMLzoID;
            this.lnDosUOMOID = this.oSlotDetailVM.DoseUOMOID;
        }
        if (this.oSlotDetailVM.AdministrationDetail != null)
            this.medAdminOid = this.oSlotDetailVM.AdministrationDetail.MedAdminOID;
        if (this.bIsPRN) {
            this.iRdbNotGiven.Visibility = Visibility.Collapsed;
        }
        this.cboExpiryDate.SelectedDateTime = DateTime.MinValue;
        this.cboExpiryDate.IsConstrainEntry = true;
        this.cboExpiryDate.RangeStartDate = this.CurrentDTTM.Date;
        this.cboExpiryDate.RangeEndDate = DateTime.MaxValue.Date.AddDays(-1);
        this.cboExpiryDate.PromptOutOfRange = false;
        this.sfsAdministeredby.OnGetItems = (s,e) => { this.sfsAdministeredby_OnGetItems(s,e) };
        this.sfsWitnessedby.OnGetItems = (s,e) => { this.sfsWitnessedby_OnGetItems(s,e) };
        this.sfsWitnessedby.ItemsSource = new ObservableCollection<CListItem>();
        this.sfsAdministeredby.ItemsSource = new ObservableCollection<CListItem>();
        this.cboParentCarer.ItemsSource = new ObservableCollection<CListItem>();
        this.cboDoseUOM.ItemsSource = new ObservableCollection<CListItem>();
        if ((this.oSlotDetailVM.IsInfusionItem) || (this.oSlotDetailVM.MultiRoute_Type != MultiRouteType.Single_Route) || (this.oSlotDetailVM.DrugDetail != null && this.oSlotDetailVM.DrugDetail.IsInfusion)) {
            this.IsBolus = true;
            this.sMultiRoute = Convert.ToString(this.oSlotDetailVM.MultiRoute_Type);
            this.iRdbSelfAdmin.Visibility = Visibility.Collapsed;
            if (this.oSlotDetailVM.MultiRoute_Type == MultiRouteType.Non_Infusion_Routes) {
                this.HideInfBolusItems();
            }
            else if (!String.IsNullOrEmpty(this.oSlotDetailVM.Status) && String.Equals(this.oSlotDetailVM.Status, SlotStatus.GIVEN)) {
                this.ShowInfBolusItems();
            }
        }
        else
            this.HideInfBolusItems();

        this.IsConstructorExecInProgress = false;
        if (this.oSlotDetailVM != null && this.oSlotDetailVM.DrugDetail != null && this.oSlotDetailVM.DrugDetail.Tag != null) {
            var oTagDrugHeaderdetail: TagDrugHeaderDetail = <TagDrugHeaderDetail>(this.oSlotDetailVM.DrugDetail.Tag as TagDrugHeaderDetail);
            if (oTagDrugHeaderdetail != null) {
                this.objVmsltDoseDis.IsMedScanExcluded = oTagDrugHeaderdetail.IsMedScanExcluded;
                this.objVmsltDoseDis.ScanRecMedMultiRoute = oTagDrugHeaderdetail.MultiRoute_Type;
            }
        }
        this.cmdScanRecMedication.Visibility = ((this.iRdbGiven.IsChecked == true || this.iRdbSelfAdmin.IsChecked == true) && !this.objVmsltDoseDis.IsMedScanExcluded) ? Visibility.Visible : Visibility.Collapsed;
        this.SetIntialAction();

        this.GetCliniicalIncidentFormConfig();
        
        if (this.iRdbGiven.IsChecked)
            this.iRdbGiven_Checked(null);
        else if (this.iRdbSelfAdmin.IsChecked)
            this.iRdbSelfAdmin_Checked(null);
        else if (this.iRdbNotGiven.IsChecked)
            this.iRdbNotGiven_Checked(null);
        else if (this.iRdbNotKnown.IsChecked) 
            this.iRdbNotKnown_Checked(null);
        this.ChildWindow_Loaded();
    }
    SetIntialAction(): void {
        if (this.iRdbGiven.IsChecked == true)
            this.OldAction = CConstants.ActionGiven;
        else if (this.iRdbNotGiven.IsChecked == true)
            this.OldAction = CConstants.ActionNotGiven;
        else if (this.iRdbSelfAdmin.IsChecked == true)
            this.OldAction = CConstants.ActionSelfAdmin;
        else if (this.iRdbNotKnown.IsChecked == true)
            this.OldAction = CConstants.ActionNotKnown;
    }
    dtpDateTimeGivenText_OnDateChange(e): void {
        if (this.dtpDateTimeGivenText.CurrentDateTime == DateTime.MinValue) {
            this.dtpDateTimeGivenText.CurrentDateTime = this.SlotDate;
        }
        var dt: DateTime = DateTime.MinValue;
        if ((e != null) && (DateTime.TryParse(e.DateValue.toDateString(), (o) => { dt = o; })))
            this.SetTimeBoxValue(dt);
    }
    SetTimeBoxValue(SelectedDate: DateTime): void {
        if (SelectedDate != null) {
            if (SelectedDate.Date < this.CurrentDTTM.Date) {
                this.timeDateTimeGivenText.Minimum = null;
                this.timeDateTimeGivenText.Maximum = null;
            }
            else {
                if (this.objVm != null && this.objVm.AdministrationDetail != null && this.objVm.AdministrationDetail.AdministeredDateTime != null) {
                    this.timeDateTimeGivenText.Minimum = new DateTime(this.CurrentDTTM.Year, this.CurrentDTTM.Month, this.CurrentDTTM.Day, 0, 0, 0);
                }
            }
        }
    }
    private CheckMandatoryFields(): boolean {
        var objiMessageBox: iMessageBox = new iMessageBox();
        objiMessageBox.Closed = (s,e) => { this.objiMessageBox_Closed(objiMessageBox,e) };
        if (this.dtpDateTimeGivenText.IsOpenError) {
            this.dtpDateTimeGivenText.IsOpenError = false;
            return true;
        }
        else if (this.cboExpiryDate.IsOpenError) {
            this.cboExpiryDate.IsOpenError = false;
            return true;
        }
        if (this.iRdbGiven.IsChecked == true || this.iRdbSelfAdmin.IsChecked == true) {
            if (((String.IsNullOrEmpty(this.sAdminMethod) && (String.Compare(this.sItemType, CConstants.Formulary_Drug) == 0 || (String.Compare(this.sItemType, CConstants.Appliance) == 0 && !this.txtDose.IsEnabled && String.Compare(this.strDoseType, DoseTypeCode.CONDITIONAL) == 0) || (String.Compare(this.sItemType, CConstants.Appliance) == 0 && this.txtDose.IsEnabled && (String.Compare(this.strDoseType, DoseTypeCode.DOSAGERANGE) == 0 || String.Compare(this.sItemType, CConstants.Appliance) == 0 && this.txtDose.IsEnabled && String.Compare(this.strDoseType, DoseTypeCode.STEPPEDVARIABLE) == 0)))) || String.Equals(this.IdentifyingType, CConstants.NONCATALOGUEITEM) || String.Equals(this.IdentifyingType, CConstants.Precatalog)) && (String.IsNullOrEmpty(this.txtDose.Text) || Convert.ToDecimal(this.txtDose.Text) == 0)) {
                Busyindicator.SetStatusIdle("Administration");
                objiMessageBox.Message = "Dose value cannot be zero or empty.";
                objiMessageBox.IconType = MessageBoxType.Information;
                objiMessageBox.MessageButton = MessageBoxButton.OK;
                objiMessageBox.Title = "LORENZO";
                objiMessageBox.Tag = "Dose";
                objiMessageBox.Show();
                return true;
            }
            else if (((String.IsNullOrEmpty(this.sAdminMethod) && (String.Compare(this.sItemType, CConstants.Formulary_Drug) == 0 || (String.Compare(this.sItemType, CConstants.Appliance) == 0 && !this.txtDose.IsEnabled && String.Compare(this.strDoseType, DoseTypeCode.CONDITIONAL) == 0) || (String.Compare(this.sItemType, CConstants.Appliance) == 0 && this.txtDose.IsEnabled && (String.Compare(this.strDoseType, DoseTypeCode.DOSAGERANGE) == 0 || String.Compare(this.sItemType, CConstants.Appliance) == 0 && this.txtDose.IsEnabled && String.Compare(this.strDoseType, DoseTypeCode.STEPPEDVARIABLE) == 0)))) || String.Equals(this.IdentifyingType, CConstants.NONCATALOGUEITEM) || String.Equals(this.IdentifyingType, CConstants.Precatalog)) && (this.txtDose.Text.ToString().StartsWith("."))) {
                Busyindicator.SetStatusIdle("Administration");
                objiMessageBox.Message = "Please enter an appropriate dose in its entirety without a leading decimal point.";
                objiMessageBox.IconType = MessageBoxType.Information;
                objiMessageBox.MessageButton = MessageBoxButton.OK;
                objiMessageBox.Title = "LORENZO";
                objiMessageBox.Tag = "Dose";
                objiMessageBox.Show();
                return true;
            }
            else if (((String.IsNullOrEmpty(this.sAdminMethod) && (String.Compare(this.sItemType, CConstants.Formulary_Drug) == 0 || String.Compare(this.sItemType, CConstants.Appliance) == 0)) || String.Equals(this.IdentifyingType, CConstants.NONCATALOGUEITEM) || String.Equals(this.IdentifyingType, CConstants.Precatalog)) && !String.IsNullOrEmpty(this.txtDose.Text) && this.cboDoseUOM.Visibility == Visibility.Visible && this.cboDoseUOM.IsEnabled && (String.IsNullOrEmpty(this.cboDoseUOM.GetValue()) || String.IsNullOrEmpty(this.cboDoseUOM.GetText()))) {
                Busyindicator.SetStatusIdle("Administration");
                objiMessageBox.Message = "Select dose UOM, this field is mandatory.";
                objiMessageBox.IconType = MessageBoxType.Information;
                objiMessageBox.MessageButton = MessageBoxButton.OK;
                objiMessageBox.Title = "LORENZO";
                objiMessageBox.Tag = "Dose";
                objiMessageBox.Show();
                return true;
            }
            else if (String.IsNullOrEmpty(this.cboRoute.GetValue()) && String.Compare(this.sItemType, CConstants.Formulary_Drug) == 0) {
                Busyindicator.SetStatusIdle("Administration");
                objiMessageBox.Message = "Select route, this field is mandatory.";
                objiMessageBox.IconType = MessageBoxType.Information;
                objiMessageBox.MessageButton = MessageBoxButton.OK;
                objiMessageBox.Title = "LORENZO";
                objiMessageBox.Tag = "Route";
                objiMessageBox.Show();
                return true;
            }
            else if (!this.dtpDateTimeGivenText.SelectedDateTime) {
                Busyindicator.SetStatusIdle("Administration");
                objiMessageBox.Message = "Enter Date/Time given, this field is mandatory.";
                objiMessageBox.IconType = MessageBoxType.Information;
                objiMessageBox.MessageButton = MessageBoxButton.OK;
                objiMessageBox.Title = "LORENZO";
                objiMessageBox.Tag = "RecordDate";
                objiMessageBox.Show();
                return true;
            }
            else if ((String.IsNullOrEmpty(this.sfsAdministeredby.searchText) && this.rdbCareProvider.IsChecked && this.rdbCareProvider.IsChecked) || (this.cboParentCarer.IsEnabled && String.IsNullOrEmpty(this.cboParentCarer.SelectedItem.DisplayText) && this.rdbparent.IsChecked && this.rdbparent.IsChecked)) {
                Busyindicator.SetStatusIdle("Administration");
                objiMessageBox.Message = "Enter administered by, this field is mandatory.";
                objiMessageBox.IconType = MessageBoxType.Information;
                objiMessageBox.MessageButton = MessageBoxButton.OK;
                objiMessageBox.Title = "LORENZO";
                objiMessageBox.Tag = "AdminBy";
                objiMessageBox.Show();
                return true;
            }
            else if (this.lblWitnessedBy.Mandatory && (String.IsNullOrEmpty(this.sfsWitnessedby.searchText) && (this.chkNoWitness.IsChecked == false))) {
                Busyindicator.SetStatusIdle("Administration");
                objiMessageBox.Message = "Enter witness by, this field is mandatory.";
                objiMessageBox.IconType = MessageBoxType.Information;
                objiMessageBox.MessageButton = MessageBoxButton.OK;
                objiMessageBox.Title = "LORENZO";
                objiMessageBox.Tag = "WitnessBy";
                objiMessageBox.Show();
                return true;
            }
            if (!String.IsNullOrEmpty(this.Infusionperiodtext.Text) || !String.IsNullOrEmpty(this.cboInfusionperiodUoMValue.GetValue())) {
                Busyindicator.SetStatusIdle("Administration");
                objiMessageBox.Message = "Enter all the infusion period values.";
                objiMessageBox.IconType = MessageBoxType.Information;
                objiMessageBox.MessageButton = MessageBoxButton.OK;
                objiMessageBox.Title = "LORENZO";
                if (String.IsNullOrEmpty(this.Infusionperiodtext.Text) || Convert.ToInt64(this.Infusionperiodtext.Text) <= 0) {
                    objiMessageBox.Tag = "InfusionPeriod";
                    objiMessageBox.Show();
                    return true;
                }
                else if (String.IsNullOrEmpty(this.cboInfusionperiodUoMValue.GetValue())) {
                    objiMessageBox.Tag = "InfusionPeriodUOM";
                    objiMessageBox.Show();
                    return true;
                }
            }
            if (!String.IsNullOrEmpty(this.objVm.AdministrationDetail.ConcentrationStrength) || !String.IsNullOrEmpty(this.cboConStrengthUoMValue.GetValue()) || !String.IsNullOrEmpty(this.objVm.AdministrationDetail.ConcentrationVolume) || !String.IsNullOrEmpty(this.cboConVolumeUoMValue.GetValue())) {
                Busyindicator.SetStatusIdle("Administration");
                objiMessageBox.Message = "Enter all the concentration values.";
                objiMessageBox.IconType = MessageBoxType.Information;
                objiMessageBox.MessageButton = MessageBoxButton.OK;
                objiMessageBox.Title = "LORENZO";
                var nConcentrationStrength: number;
                var nConcentrationVol: number;
                if (String.IsNullOrEmpty(this.objVm.AdministrationDetail.ConcentrationStrength) || (Number.TryParse(this.objVm.AdministrationDetail.ConcentrationStrength, (o) => { nConcentrationStrength = o; })) && nConcentrationStrength <= 0) {
                    objiMessageBox.Tag = "ConStrength";
                    objiMessageBox.Show();
                    return true;
                }
                else if (String.IsNullOrEmpty(this.cboConStrengthUoMValue.GetValue())) {
                    objiMessageBox.Tag = "ConStrengthUOM";
                    objiMessageBox.Show();
                    return true;
                }
                else if (String.IsNullOrEmpty(this.objVm.AdministrationDetail.ConcentrationVolume) || (Number.TryParse(this.objVm.AdministrationDetail.ConcentrationVolume, (o) => { nConcentrationStrength = o; })) && nConcentrationVol <= 0) {
                    objiMessageBox.Tag = "ConVolume";
                    objiMessageBox.Show();
                    return true;
                }
                else if (String.IsNullOrEmpty(this.cboConVolumeUoMValue.GetValue())) {
                    objiMessageBox.Tag = "ConVolumeUOM";
                    objiMessageBox.Show();
                    return true;
                }
            }
        }
        else if (this.iRdbNotGiven.IsChecked == true) {
            if (String.IsNullOrEmpty(this.cboResNotGiven.GetValue())) {
                Busyindicator.SetStatusIdle("Administration");
                objiMessageBox.Message = "Enter reason not given, this field is mandatory.";
                objiMessageBox.IconType = MessageBoxType.Information;
                objiMessageBox.MessageButton = MessageBoxButton.OK;
                objiMessageBox.Title = "LORENZO";
                objiMessageBox.Tag = "Reason";
                objiMessageBox.Show();
                return true;
            }
        }
        if (this.lblComments.Mandatory == true && String.IsNullOrEmpty(this.txtComments.Text)) {
            Busyindicator.SetStatusIdle("Administration");
            objiMessageBox.Message = "Enter comments, this field is mandatory.";
            objiMessageBox.IconType = MessageBoxType.Information;
            objiMessageBox.MessageButton = MessageBoxButton.OK;
            objiMessageBox.Title = "LORENZO";
            objiMessageBox.Tag = "Comments";
            objiMessageBox.Show();
            return true;
        }
        if (String.IsNullOrEmpty(this.cboAmendReason.GetValue().ToString())) {
            Busyindicator.SetStatusIdle("Administration");
            objiMessageBox.Message = "Enter amend reason, this field is mandatory.";
            objiMessageBox.IconType = MessageBoxType.Information;
            objiMessageBox.MessageButton = MessageBoxButton.OK;
            objiMessageBox.Title = "LORENZO";
            objiMessageBox.Tag = "AmendReason";
            objiMessageBox.Show();
            return true;
        }
        if (this.objVm != null && this.objVm.AdministrationDetail != null && this.objVm.AdministrationDetail.AdministeredDate != DateTime.MinValue && this.dtpDateTimeGivenText.Visibility == Visibility.Visible) {
            var dtGivenDateTime: DateTime = this.timeDateTimeGivenText.Value == null ? DateTime.MinValue : this.timeDateTimeGivenText.Value;
            var dtAdministeredDTTM: DateTime = this.objVm.AdministrationDetail.AdministeredDate.Date.AddTime(dtGivenDateTime);
            var threshold: number = (!this.bIsPRN || this.IsPRNwithSchedule) ? MedChartData.DuenessThreshold : 0;
            if (this.PrescriptionItemStartDTTM != DateTime.MinValue && dtAdministeredDTTM.ToUniversalTime() < (this.PrescriptionItemStartDTTM.ToUniversalTime().AddMinutes(-threshold))) {
                var tempDrugName: string = String.Empty;
                if (this.objVm.DrugDetail != null && !String.IsNullOrEmpty(this.objVm.DrugDetail.Drugname)) {
                    tempDrugName = this.objVm.DrugDetail.Drugname;
                }
                else if (!String.IsNullOrEmpty(this.sDrugName) && this.sDrugName.Contains('-')) {
                    var tempArrDrugName: string[] = this.sDrugName.Split('-');
                    tempDrugName = tempArrDrugName[0];
                }
                Busyindicator.SetStatusIdle("Administration");
                objiMessageBox.Message = String.Format(Resource.MedicationAdministrator.RecordAdminBeforeStartDTTM_ErrMsg, tempDrugName);
                objiMessageBox.IconType = MessageBoxType.Information;
                objiMessageBox.MessageButton = MessageBoxButton.OK;
                objiMessageBox.Title = "LORENZO";
                objiMessageBox.Tag = "RecordDate";
                objiMessageBox.Show();
                return true;
            }
            else if (this.PrescriptionItemEndDTTM != DateTime.MinValue && dtAdministeredDTTM.ToUniversalTime() > this.PrescriptionItemEndDTTM.ToUniversalTime() && !String.Equals(this.PrescItemStatus, CConstants.DISCONTINUED) && this.AfterEnd) {
                {
                    var iMsgBox: iMessageBox = ObjectHelper.CreateObject(new iMessageBox(), {
                        Title: "LORENZO",
                        Message: String.Format(Resource.MedicationAdministrator.RecordAdminAfterEndDTTM_ErrMsg, "\n\n"),
                        MessageButton: MessageBoxButton.YesNo,
                        IconType: MessageBoxType.Question
                    });
                    iMsgBox.Show();
                    iMsgBox.MessageBoxClose = (s,e) => { this.RecordAdminAfterEndDTTM_YesNo(s, e); };
                }
                return this.AfterEnd;
            }
            else if (this.objVmsltDoseDis != null && this.objVmsltDoseDis.DrugDetail != null && this.objVmsltDoseDis.DrugDetail.Tag != null && (this.objVmsltDoseDis.DrugDetail.Tag instanceof TagDrugHeaderDetail) && String.Equals(this.PrescItemStatus, CConstants.DISCONTINUED) && (<TagDrugHeaderDetail>(this.objVmsltDoseDis.DrugDetail.Tag as TagDrugHeaderDetail)) != null && (<TagDrugHeaderDetail>(this.objVmsltDoseDis.DrugDetail.Tag as TagDrugHeaderDetail)).CancelDiscontinuedDttm != DateTime.MinValue && (<TagDrugHeaderDetail>(this.objVmsltDoseDis.DrugDetail.Tag as TagDrugHeaderDetail)).CancelDiscontinuedDttm.ToUniversalTime() < dtAdministeredDTTM.ToUniversalTime()) {
                Busyindicator.SetStatusIdle("Administration");
                objiMessageBox.Message = Resource.MedicationAdministrator.RecordAdminDiscntdDTTM_ErrMsg;
                objiMessageBox.IconType = MessageBoxType.Information;
                objiMessageBox.MessageButton = MessageBoxButton.OK;
                objiMessageBox.Title = "LORENZO";
                objiMessageBox.Tag = "RecordDate";
                objiMessageBox.Show();
                return true;
            }
            // SYED - need to review the below validation when Paracetomal drug is selected
            /* else if (this.objVmsltDoseDis.IsParacetamolIngredient && this.sParacetamolRecentlyAdministered <= 0) {
                if (this.sParacetamolRecentlyAdministered == -1) {
                    var oSlotHelper: SlotAdministrationHelper = new SlotAdministrationHelper();
                    oSlotHelper.TriggerParacetamolWarningEvent = (s, e) => { this.oSlotHelper_TriggerParacetamolWarningEvent };
                    oSlotHelper.IsAnyParacetamolAdministered(dtAdministeredDTTM, this.prescriptionSchOid);
                    Busyindicator.SetStatusBusy("CheckParaAdministered");
                    this.sParacetamolRecentlyAdministered = 0;
                }
                return true;
            } */
        }
        return false;
    }
    oSlotHelper_TriggerParacetamolWarningEvent(bParacetamolAdministered: boolean): void {
        Busyindicator.SetStatusIdle("CheckParaAdministered");
        if (bParacetamolAdministered) {
            var iMsgBox: iMessageBox = ObjectHelper.CreateObject(new iMessageBox(), {
                Title: "LORENZO",
                Message: Resource.MedicationAdministrator.ParacetamolAdministration_WarningMsg,
                MessageButton: MessageBoxButton.YesNo,
                Width: 420,
                Height: 180,
                IconType: MessageBoxType.Question
            });
            iMsgBox.Show();
            iMsgBox.MessageBoxClose = (s,e) => { this.ParacetamolWarningMsgClose(s,e); };
        }
        else {
            this.sParacetamolRecentlyAdministered = 1;
            this.cmdOk_Click();
        }
    }
    private ParacetamolWarningMsgClose(sender: Object, e: MessageEventArgs): void {
        Busyindicator.SetStatusIdle("Administration");
        if (e.MessageBoxResult == MessageBoxResult.Yes) {
            this.sParacetamolRecentlyAdministered = 1;
            this.cmdOk_Click();
        }
        else {
            this.sParacetamolRecentlyAdministered = -1;
        }
        this.objVmsltDoseDis.IsSubmitInProgress = false;
    }
    private RecordAdminAfterEndDTTM_YesNo(sender: Object, e: MessageEventArgs): void {
        Busyindicator.SetStatusIdle("Administration");
        if (e.MessageBoxResult == MessageBoxResult.Yes) {
            this.AfterEnd = false;
            this.cmdOk_Click();
        }
        this.objVmsltDoseDis.IsSubmitInProgress = false;
    }
    objiMessageBox_Closed(sender: Object, e: MessageEventArgs): void {
        let top : any  = window.top;
        if(top.msgAlert == false){
            top.msgAlert = true;
        }
        var objiMessageBox: iMessageBox = <iMessageBox>(sender as iMessageBox);
        if (String.Compare(objiMessageBox.Tag.ToString(), "Dose") == 0) {
            if (String.Compare(this.strDoseType, DoseTypeCode.CONDITIONAL) == 0 && !this.bIsCondViewOpen) {
                if (this.SteppedImg.Visibility != Visibility.Collapsed && !this.objVm.IsDoseEnabled)
                    this.SteppedImg.Focus();
                else {
                    if (!String.IsNullOrEmpty(this.txtDose.Text) && !(this.txtDose.Text.ToString().StartsWith("."))) {
                        this.txtDose.Text = String.Empty;
                    }
                    this.txtDose.Focus();
                }
            }
            else {
                if (!String.IsNullOrEmpty(this.txtDose.Text) && !(this.txtDose.Text.ToString().StartsWith("."))) {
                    this.txtDose.Text = String.Empty;
                }
                this.txtDose.Focus();
            }
        }
        else if (String.Compare(objiMessageBox.Tag.ToString(), "Doseuom") == 0)
            this.cboDoseUOM.Focus();
        else if (String.Compare(objiMessageBox.Tag.ToString(), "RecordDate") == 0)
            this.dtpDateTimeGivenText.Focus();
        else if (String.Compare(objiMessageBox.Tag.ToString(), "Reason") == 0)
            this.cboResNotGiven.Focus();
        else if (String.Compare(objiMessageBox.Tag.ToString(), "Comments") == 0)
            this.txtComments.Focus();
        else if (String.Compare(objiMessageBox.Tag.ToString(), "AdminBy") == 0) {
            if (String.IsNullOrEmpty(this.sfsAdministeredby.Text) && this.rdbCareProvider.IsChecked) {
                this.sfsAdministeredby.Focus();
            }
            else if (this.cboParentCarer.IsEnabled && String.IsNullOrEmpty(this.cboParentCarer.SelectedItem.DisplayText) && this.rdbparent.IsChecked) {
                this.cboParentCarer.Focus();
            }
        }
        else if (String.Compare(objiMessageBox.Tag.ToString(), "Route") == 0)
            this.cboRoute.Focus();
        else if (String.Compare(objiMessageBox.Tag.ToString(), "WitnessBy") == 0) {
            this.sfsWitnessedby.ClearAll();
            this.sfsWitnessedby.Focus();
        }
        else if (String.Compare(objiMessageBox.Tag.ToString(), "AmendReason") == 0)
            this.cboAmendReason.Focus();
        else if (String.Equals(objiMessageBox.Tag.ToString(), "InfusionPeriod")) {
            this.Infusionperiodtext.Focus();
        }
        else if (String.Equals(objiMessageBox.Tag.ToString(), "InfusionPeriodUOM")) {
            this.cboInfusionperiodUoMValue.Focus();
        }
        else if (String.Equals(objiMessageBox.Tag.ToString(), "ConStrength")) {
            this.txtConStrengthValue.focus();
        }
        else if (String.Equals(objiMessageBox.Tag.ToString(), "ConStrengthUOM")) {
            this.cboConStrengthUoMValue.Focus();
        }
        else if (String.Equals(objiMessageBox.Tag.ToString(), "ConVolume")) {
            this.txtConVolumeValue.focus();
        }
        else if (String.Equals(objiMessageBox.Tag.ToString(), "ConVolumeUOM")) {
            this.cboConVolumeUoMValue.Focus();
        }
        this.objVmsltDoseDis.IsSubmitInProgress = false;
        Busyindicator.SetStatusIdle("Administration");
    }
    cmdObservationsResults_Click(e): void {
        var bResult: boolean = Common.LaunchObservation(this.prescriptionOid, this.IdentifyingType, this.IdentifyingOID, this.MCVersion, !String.IsNullOrEmpty(this.sObsDrugName) ? this.sObsDrugName : this.sDrugName, this.sItemSubType, this.sMCitemname, this.slorenzoid, this.ObservationFinished);
    }
    public ObservationFinished(args: ChildWizardCloseEventargs): void {
        var sContData: string = String.Empty;
        if (args != null && !String.IsNullOrEmpty(args.ContextData))
            sContData = args.ContextData;
        if (this.ConditionalVM != null && sContData.Contains("RECORDENTERED=True")) {
            var oReq: CReqMsgGetLatestObsOrResultDetails = new CReqMsgGetLatestObsOrResultDetails();
            oReq.oContextInformation = Common.FillContext();
            var oPatLatObsResParam: CPatLatestObsResParams = new CPatLatestObsResParams();
            oPatLatObsResParam.EncounterOID = PatientContext.EncounterOid;
            oPatLatObsResParam.PatientOID = PatientContext.PatientOID;
            oPatLatObsResParam.EntityType = this.ConditionalVM.ItmType;
            oPatLatObsResParam.IdValue = this.ConditionalVM.EntityCode;
            oReq.oPatLatObsResParamsBC = oPatLatObsResParam;
            var serviceProxy: MedicationAdministrationWSSoapClient = new MedicationAdministrationWSSoapClient();
            serviceProxy.GetLatestObsOrResultDetailsCompleted = (S,e) => { this.serviceProxy_GetLatestObsOrResultDetailsCompleted };
            serviceProxy.GetLatestObsOrResultDetailsAsync(oReq);
        }
    }
    private serviceProxy_GetLatestObsOrResultDetailsCompleted(sender: Object, e: GetLatestObsOrResultDetailsCompletedEventArgs): void {
        if (e.Error != null)
            return
        var oResGetLatestObsOrResultDetails: CResMsgGetLatestObsOrResultDetails = e.Result;
        if (oResGetLatestObsOrResultDetails != null && oResGetLatestObsOrResultDetails.oPatLatObsResVal != null && oResGetLatestObsOrResultDetails.oPatLatObsResVal.EntityDetails != null) {
            if (!String.IsNullOrEmpty(oResGetLatestObsOrResultDetails.oPatLatObsResVal.EntityDetails) && oResGetLatestObsOrResultDetails.oPatLatObsResVal.RecordedDate != DateTime.MinValue && oResGetLatestObsOrResultDetails.oPatLatObsResVal.RecordedDate >= this.ConditionalVM.PresItemStartDTTM)
                this.ConditionalVM.LatestObservationResultDetails = oResGetLatestObsOrResultDetails.oPatLatObsResVal.EntityDetails + " on " + oResGetLatestObsOrResultDetails.oPatLatObsResVal.RecordedDate.ToString(CConstants.DateTimeFormat);
        }
    }
    private LaunchOverrideScan(): void {
        Busyindicator.SetStatusBusy("OverrideScanRecordMed");
        this.oOverrideBarcodeScan = new OverrideBarcodeScan();
        this.oOverrideBarcodeScan.DataContext = new OverrideBarcodeScanVM(ValueDomain.SCANPATWBD, Resource.OverrideBarcodeScan.BarcodeMsgTxt, this.prescriptionSchOid);
        this.oOverrideBarcodeScan.onDialogClose = this.oOverrideBarcodeScan_Closed;
        AppActivity.OpenWindow(CConstants.OVERRIDESCANTITLE, this.oOverrideBarcodeScan, (s,e) => { this.oOverrideBarcodeScan_Closed(s) }, String.Empty, false, 300, 420, false, WindowButtonType.OkCancel, null, null);
    }
    private LaunchMedicationOverrideScan(): void {
        this.oOverrideBarcodeScan = new OverrideBarcodeScan();
        this.oOverrideBarcodeScan.DataContext = new OverrideBarcodeScanVM(ValueDomain.SCANMEDS, Resource.OverrideBarcodeScan.BarcodeMedicationMsgTxt, this.prescriptionSchOid);
        this.oOverrideBarcodeScan.onDialogClose = this.oOverrideMedBarcodeScan_Closed;
        AppActivity.OpenWindow(CConstants.OVERRIDESCANTITLE, this.oOverrideBarcodeScan, (s, e) => { this.oOverrideMedBarcodeScan_Closed(s) }, String.Empty, false, 300, 420, false, WindowButtonType.OkCancel, null, null);
    }
    private ValidatePatientWBScanAndSubmitRecordAdministration(): void {
        if (!MedChartData.IsPatWBBarcodeScanOverriden && !MedChartData.IsMedBarcodeScanOverriden && !this.IsPatWristBandOverridden && MedChartData.IsPatWBScanMandatory && !MedChartData.IsPatWBScanSuccess && this.iRdbGiven.IsChecked == true) {
            this.LaunchOverrideScan();
        }
        else if (this.objVmsltDoseDis != null && !this.objVmsltDoseDis.IsCustomiseMedScan && !this.objVmsltDoseDis.IsMedScanExcluded && !MedChartData.IsMedBarcodeScanOverriden && MedChartData.IsMedScanMandatory && !MedChartData.IsMedScanSuccess && this.iRdbGiven.IsChecked == true && this.objVm != null && this.objVm.AdministrationDetail != null && !this.objVm.AdministrationDetail.IsMedScanReadonly) {
            this.AddPatientWBOverrideReasonFromContext();
            this.LaunchMedicationOverrideScan();
        }
        else {
            if (MedChartData.IsMedBarcodeScanOverriden) {
                var oManageBarcodeHelper: ManageBarcodeHelper = new ManageBarcodeHelper();
                if (!this.IsPatWristBandOverridden && MedChartData.IsPatWBScanMandatory && !MedChartData.IsPatWBScanSuccess && this.iRdbGiven.IsChecked == true) {
                    if (this.lstCMedBarcodeScanOverrideDetail == null)
                        this.lstCMedBarcodeScanOverrideDetail = new ObservableCollection<CMedBarcodeScanOverrideDetail>();
                    this.lstCMedBarcodeScanOverrideDetail.Add(oManageBarcodeHelper.SetOverrideReason(ValueDomain.SCANPATWBD, MedChartData.MedScanOverrideReason, MedChartData.MedScanOverrideComments));
                }
                if (this.objVmsltDoseDis != null && !this.objVmsltDoseDis.IsCustomiseMedScan && !this.objVmsltDoseDis.IsMedScanExcluded && MedChartData.IsMedScanMandatory && !MedChartData.IsMedScanSuccess && this.iRdbGiven.IsChecked == true && this.objVm != null && this.objVm.AdministrationDetail != null && !this.objVm.AdministrationDetail.IsMedScanReadonly) {
                    if (this.lstCMedBarcodeScanOverrideDetail == null)
                        this.lstCMedBarcodeScanOverrideDetail = new ObservableCollection<CMedBarcodeScanOverrideDetail>();
                    this.lstCMedBarcodeScanOverrideDetail.Add(oManageBarcodeHelper.SetOverrideReason(ValueDomain.SCANMEDS, MedChartData.MedScanOverrideReason, MedChartData.MedScanOverrideComments));
                }
            }
            else {
                this.AddPatientWBOverrideReasonFromContext();
            }
            this.SubmitModifyAdministration();
        }
    }
    AddPatientWBOverrideReasonFromContext(): void {
        if (MedChartData.IsPatWBBarcodeScanOverriden) {
            var oManageBarcodeHelper: ManageBarcodeHelper = new ManageBarcodeHelper();
            if (!this.IsPatWristBandOverridden && MedChartData.IsPatWBScanMandatory && !MedChartData.IsPatWBScanSuccess && this.iRdbGiven.IsChecked == true) {
                if (this.lstCMedBarcodeScanOverrideDetail == null)
                    this.lstCMedBarcodeScanOverrideDetail = new ObservableCollection<CMedBarcodeScanOverrideDetail>();
                this.lstCMedBarcodeScanOverrideDetail.Add(oManageBarcodeHelper.SetOverrideReason(ValueDomain.SCANPATWBD, MedChartData.PatWBScanOverrideReason, MedChartData.PatWBScanOverrideComments));
            }
        }
    }
    oOverrideBarcodeScan_Closed(args: AppDialogEventargs): void {
        Busyindicator.SetStatusIdle("OverrideScanRecordMed");
        if (args.Result == AppDialogResult.Ok) {
            this.oOverrideBarcodeScan = ObjectHelper.CreateType<OverrideBarcodeScan>(args.Content.Component?args.Content.Component:args.Content, OverrideBarcodeScan);
            var bdialogresult: boolean = this.oOverrideBarcodeScan.cmdOk_Click();
            var bIsOverrideReason: boolean = false;
            var obj: OverrideBarcodeScan = <OverrideBarcodeScan>(args.Content.Component?args.Content.Component:args.Content as OverrideBarcodeScan);
            bIsOverrideReason = (obj != null && obj.oOverrideBarcodeScanVM != null && obj.oOverrideBarcodeScanVM.IsOverrideScan) ? true : false;
            if (bdialogresult && bIsOverrideReason && obj != null && obj.oOverrideBarcodeScanVM != null && obj.oOverrideBarcodeScanVM.OverrideScanSelected != null && !String.IsNullOrEmpty(obj.oOverrideBarcodeScanVM.OverrideScanSelected.Value)) {
                if (this.lstCMedBarcodeScanOverrideDetail == null)
                    this.lstCMedBarcodeScanOverrideDetail = new ObservableCollection<CMedBarcodeScanOverrideDetail>();
                var oManageBarcodeHelper: ManageBarcodeHelper = new ManageBarcodeHelper();
                this.lstCMedBarcodeScanOverrideDetail.Add(oManageBarcodeHelper.SetOverrideReason(ValueDomain.SCANPATWBD, obj.oOverrideBarcodeScanVM.OverrideScanSelected.Value, obj.oOverrideBarcodeScanVM.OverrideComments));
                oManageBarcodeHelper.SetOverrideBarcodeScanReasonContext(ValueDomain.SCANPATWBD, obj.oOverrideBarcodeScanVM.OverrideComments, obj.oOverrideBarcodeScanVM.OverrideScanSelected.Value);
                this.IsPatWristBandOverridden = true;
            }
            if (bdialogresult || MedChartData.IsPatWBScanSuccess) {
                this.oOverrideBarcodeScan.appDialog.DialogResult = true;
                if (this.IsLaunchedFromScanMedlink) {
                    this.IsLaunchedFromScanMedlink = false;
                    this.IsMedExclude = true;
                    this.LaunchScanRecordMedication();
                }
                else if (this.objVmsltDoseDis != null && !this.objVmsltDoseDis.IsCustomiseMedScan && !this.objVmsltDoseDis.IsMedScanExcluded && MedChartData.IsMedScanMandatory && !MedChartData.IsMedScanSuccess && this.objVm != null && this.objVm.AdministrationDetail != null && !this.objVm.AdministrationDetail.IsMedScanReadonly) {
                    if (!MedChartData.IsMedBarcodeScanOverriden) {
                        this.LaunchMedicationOverrideScan();
                    }
                    else if (MedChartData.IsMedBarcodeScanOverriden) {
                        if (this.lstCMedBarcodeScanOverrideDetail == null)
                            this.lstCMedBarcodeScanOverrideDetail = new ObservableCollection<CMedBarcodeScanOverrideDetail>();
                        var oManageBarcodeHelper: ManageBarcodeHelper = new ManageBarcodeHelper();
                        this.lstCMedBarcodeScanOverrideDetail.Add(oManageBarcodeHelper.SetOverrideReason(ValueDomain.SCANMEDS, MedChartData.MedScanOverrideReason, MedChartData.MedScanOverrideComments));
                        this.SubmitModifyAdministration();
                    }
                }
                else {
                    this.SubmitModifyAdministration();
                }
            }
        }
        else if (args.Result == AppDialogResult.Cancel) {
            this.IsLaunchedFromScanMedlink = false;
            if (this.objVm != null && this.objVm.AdministrationDetail != null) {
                this.objVm.AdministrationDetail.DoseDiscReasonCode = null;
                this.objVm.AdministrationDetail.DoseDiscComments = null;
            }
            this.oOverrideBarcodeScan.appDialog.DialogResult = false;
            this.objVmsltDoseDis.IsSubmitInProgress = false;
            Busyindicator.SetStatusIdle("Administration");
        }
    }
    oOverrideMedBarcodeScan_Closed(args: AppDialogEventargs): void {
        if (args.Result == AppDialogResult.Ok) {
            this.oOverrideBarcodeScan = ObjectHelper.CreateType<OverrideBarcodeScan>(args.Content.Component, OverrideBarcodeScan);
            var bdialogresult: boolean = this.oOverrideBarcodeScan.cmdOk_Click();
            var bIsOverrideReason: boolean = false;
            var obj: OverrideBarcodeScan = <OverrideBarcodeScan>(args.Content.Component as OverrideBarcodeScan);
            bIsOverrideReason = (obj != null && obj.oOverrideBarcodeScanVM != null && obj.oOverrideBarcodeScanVM.IsOverrideScan) ? true : false;
            if (bdialogresult && bIsOverrideReason && obj != null && obj.oOverrideBarcodeScanVM != null && obj.oOverrideBarcodeScanVM.OverrideScanSelected != null && !String.IsNullOrEmpty(obj.oOverrideBarcodeScanVM.OverrideScanSelected.Value)) {
                if (this.lstCMedBarcodeScanOverrideDetail == null)
                    this.lstCMedBarcodeScanOverrideDetail = new ObservableCollection<CMedBarcodeScanOverrideDetail>();
                var oManageBarcodeHelper: ManageBarcodeHelper = new ManageBarcodeHelper();
                this.lstCMedBarcodeScanOverrideDetail.Add(oManageBarcodeHelper.SetOverrideReason(ValueDomain.SCANMEDS, obj.oOverrideBarcodeScanVM.OverrideScanSelected.Value, obj.oOverrideBarcodeScanVM.OverrideComments));
                oManageBarcodeHelper.SetOverrideBarcodeScanReasonContext(ValueDomain.SCANMEDS, obj.oOverrideBarcodeScanVM.OverrideComments, obj.oOverrideBarcodeScanVM.OverrideScanSelected.Value);
            }
            if (bdialogresult || MedChartData.IsMedScanSuccess) {
                this.oOverrideBarcodeScan.appDialog.DialogResult = true;
                this.SubmitModifyAdministration();
            }
        }
        else if (args.Result == AppDialogResult.Cancel) {
            this.oOverrideBarcodeScan.appDialog.DialogResult = false;
            this.objVmsltDoseDis.IsSubmitInProgress = false;
            Busyindicator.SetStatusIdle("Administration");
        }
    }
    cmdWristbandScan_Click(e): void {
        this.txtBarcodeModAdmin.nativeElement.focus();
    }
    public barcodeStyleFocus = false;
    txtBarcode_LostFocus(e): void {
        e.target.value = String.Empty;
        this.barcodeStyleFocus = false;
    }
    txtBarcode_GotFocus(e): void {
        e.target.value = String.Empty;
        this.barcodeStyleFocus = true;
    }
    txtBarcode_KeyDown(e): void {
            var oManageBarcodeHelper: ManageBarcodeHelper = new ManageBarcodeHelper();
            oManageBarcodeHelper.GetPatientQuickSearchDetails(e.target.value, this.objVmsltDoseDis != null ? this.objVmsltDoseDis.PresScheduleOID : 0);
            setTimeout(() => {
                e.target.value = String.Empty;
            }, 400);
            this.IsPatWristBandOverridden = false;
    }
    public cmdOk_Click(): void {
        if (!this.CheckMandatoryFields()) {
            var isValidData: boolean = this.ValidateData();
            if (isValidData) {
                this.ValidatePatientWBScanAndSubmitRecordAdministration();
                Busyindicator.SetStatusIdle("Administration");
            }
            else {
                this.objVmsltDoseDis.IsSubmitInProgress = false;
                Busyindicator.SetStatusIdle("Administration");
                this.objDoseDis = new MedsAdminDoseDiscrepancyReason();
                this.objDoseDis.constructorImpl(this.objVm);
                this.objVm.DoseVolumeShow = Visibility.Collapsed;
                this.objVm.DoseVolumeTitle = Resource.MedicationAdministrator.lblTitle_Text;
                // ObjectHelper.stopFinishAndCancelEvent(true);
                AppActivity.OpenWindow("Record reason for discrepancy", this.objDoseDis, (s,e) => { this.objDoseDis_Closed(s) }, "Record reason for discrepancy", true, 266, 355, true, WindowButtonType.OkCancel, null);
            }
        }
    }
    objDoseDis_Closed(args: AppDialogEventargs): void {
        if (args != null && args.Content != null) {
            this.objDoseDis = args.Content.Component;
            this.objVmsltDoseDis  = ObjectHelper.CreateType<SlotDetailVM>(args.Content, SlotDetailVM);
            if (this.objVmsltDoseDis && !this.objVmsltDoseDis.IsSubmitInProgress) {
                if (args.Result == AppDialogResult.Ok) {
                    // ObjectHelper.stopFinishAndCancelEvent(false);
                    var bdialogresult: boolean = this.objDoseDis.cmdOkClick();
                    if (bdialogresult) {
                        this.ValidatePatientWBScanAndSubmitRecordAdministration();
                        this.objVmsltDoseDis.IsSubmitInProgress = true;
                        args.AppChildWindow.DialogRef.close();
                    }
                }
                else if (args.Result == AppDialogResult.Cancel) {
                    if (this.objVm != null && this.objVm.AdministrationDetail != null) {
                        this.objVm.AdministrationDetail.DoseDiscReasonCode = null;
                        this.objVm.AdministrationDetail.DoseDiscComments = null;
                    }
                    this.objVmsltDoseDis.IsSubmitInProgress = false;
                    args.AppChildWindow.DialogRef.close();
                    Busyindicator.SetStatusIdle("Administration");
                }
            }
        }
    }
    private ValidateData(): boolean {
        var IsValidate: boolean = false;
        if (this.iRdbGiven.IsChecked == true || this.iRdbSelfAdmin.IsChecked == true) {
            if (String.IsNullOrEmpty(this.sAdminMethod) && (String.Equals(this.sItemType, CConstants.Formulary_Drug) || String.Equals(this.sItemType, CConstants.Appliance) || String.Equals(this.IdentifyingType, CConstants.NONCATALOGUEITEM) || String.Equals(this.IdentifyingType, CConstants.Precatalog))) {
                if ((String.Compare(this.strDoseType, DoseTypeCode.NORMAL) == 0 || String.Compare(this.strDoseType, DoseTypeCode.TITRATED) == 0) && !String.Equals(this.sItemType, CConstants.Appliance)) {
                    if (!String.IsNullOrEmpty(this.objVm.AdministrationDetail.Dose)) {
                        if (this.objVm.AdministrationDetail.IsAdminDoseChanged && !String.IsNullOrEmpty(this.objVm.AdministrationDetail.Dose) && !String.IsNullOrEmpty(this.objVmsltDoseDis.Dose) && (Number.Parse(this.objVm.AdministrationDetail.Dose) > (Number.Parse(this.objVmsltDoseDis.Dose)) || Number.Parse(this.objVm.AdministrationDetail.Dose) < (Number.Parse(this.objVmsltDoseDis.Dose)))) {
                            IsValidate = false;
                        }
                        else {
                            IsValidate = true;
                        }
                    }
                    else if (String.Compare(this.strDoseType, DoseTypeCode.TITRATED) == 0 && !String.IsNullOrEmpty(this.strDose) && this.strDose == "TBD") {
                        IsValidate = true;
                    }
                }
                else if (String.Compare(this.strDoseType, DoseTypeCode.DOSAGERANGE) == 0 || String.Compare(this.strDoseType, DoseTypeCode.STEPPED) == 0 || String.Compare(this.strDoseType, DoseTypeCode.STEPPEDVARIABLE) == 0) {
                    if (this.iRdbNotGiven.IsChecked == true || this.iRdbNotKnown.IsChecked == true) {
                        IsValidate = true;
                    }
                    else {
                        if (!String.IsNullOrEmpty(this.objVm.AdministrationDetail.Dose)) {
                            if (String.Compare(this.strDoseType, DoseTypeCode.DOSAGERANGE) == 0) {
                                if (String.Equals(this.sItemType, CConstants.Appliance)) {
                                    if (this.dblLDose > 0 && this.dblUDose > 0 && Number.Parse(this.objVm.AdministrationDetail.Dose) >= this.dblLDose && Number.Parse(this.objVm.AdministrationDetail.Dose) <= this.dblUDose) {
                                        IsValidate = true;
                                    }
                                    else if (this.dblLDose > 0 && this.dblUDose == 0 && Number.Parse(this.objVm.AdministrationDetail.Dose) == this.dblLDose) {
                                        IsValidate = true;
                                    }
                                    else if (this.dblLDose == 0 && this.dblUDose > 0 && Number.Parse(this.objVm.AdministrationDetail.Dose) == this.dblUDose) {
                                        IsValidate = true;
                                    }
                                    else {
                                        IsValidate = false;
                                    }
                                }
                                else {
                                    if (Number.Parse(this.objVm.AdministrationDetail.Dose) >= this.dblLDose && Number.Parse(this.objVm.AdministrationDetail.Dose) <= this.dblUDose) {
                                        IsValidate = true;
                                    }
                                    else {
                                        IsValidate = false;
                                    }
                                }
                            }
                            else if (String.Compare(this.strDoseType, DoseTypeCode.STEPPED) == 0 || String.Compare(this.strDoseType, DoseTypeCode.STEPPEDVARIABLE) == 0) {
                                var dblZero: number = Number.Parse("0");
                                if (this.dblLDose == dblZero && this.dblUDose == dblZero) {
                                    if (this.objVm.AdministrationDetail.IsAdminDoseChanged && !String.IsNullOrEmpty(this.objVm.AdministrationDetail.Dose) && !String.IsNullOrEmpty(this.objVmsltDoseDis.Dose) && (Number.Parse(this.objVm.AdministrationDetail.Dose) > (Number.Parse(this.objVmsltDoseDis.Dose)) || Number.Parse(this.objVm.AdministrationDetail.Dose) < (Number.Parse(this.objVmsltDoseDis.Dose)))) {
                                        IsValidate = false;
                                    }
                                    else {
                                        IsValidate = true;
                                    }
                                }
                                else if (this.dblLDose > dblZero && this.dblUDose == dblZero) {
                                    if (Number.Parse(this.objVm.AdministrationDetail.Dose) == this.dblLDose) {
                                        IsValidate = true;
                                    }
                                    else {
                                        IsValidate = false;
                                    }
                                }
                                else if (this.dblLDose > dblZero && this.dblUDose > dblZero) {
                                    if (Number.Parse(this.objVm.AdministrationDetail.Dose) >= this.dblLDose && Number.Parse(this.objVm.AdministrationDetail.Dose) <= this.dblUDose) {
                                        IsValidate = true;
                                    }
                                    else {
                                        IsValidate = false;
                                    }
                                }
                            }
                        }
                    }
                }
                else {
                    IsValidate = true;
                }
            }
            else {
                IsValidate = true;
            }
        }
        else {
            IsValidate = true;
        }
        return IsValidate;
    }
    private SubmitModifyAdministration(): void {
        MedChartData.IsMedScanSuccess = false;
        var objService: MedicationAdministrationWSSoapClient = new MedicationAdministrationWSSoapClient();
        objService.ModifyAdministrationCompleted = (s,e) => { this.objService_ModifyAdministrationCompleted(s,e) };
        var objReq: CReqMsgModifyAdministration = new CReqMsgModifyAdministration();
        objReq.oContextInformation = CommonBB.FillContext();
        objReq.oContextInformation.PageInfo = PatientContext.EncounterOid.ToString();
        objReq.objSlotDetailBC = new SlotDetail();
        objReq.objSlotDetailBC.AdministrationDetail = new AdministrationDetail();
        objReq.objSlotDetailBC.ScheduledDTTM = this.SlotDate;
        objReq.objSlotDetailBC.AdministrationDetail.RecordedAt = this.objVm.AdministrationDetail.RecordedAt = CommonBB.GetServerDateTime();
        objReq.objSlotDetailBC.AdministrationDetail.AdminComments = this.objVm.AdministrationDetail.AdminComments;
        objReq.objSlotDetailBC.AdministrationDetail.PatientOID = ChartContext.PatientOID;
        if (this.iRdbNotGiven.IsChecked == true)
            objReq.objSlotDetailBC.AdministrationDetail.AdministeredDate = CommonBB.GetServerDateTime();
        else objReq.objSlotDetailBC.AdministrationDetail.AdministeredDate = (this.objVm.AdministrationDetail.AdministeredDate <= DateTime.MinValue) ? CommonBB.GetServerDateTime() : this.objVm.AdministrationDetail.AdministeredDate;
        if (this.objVm.AdministrationDetail.AdminByPersonalCarer != null) {
            objReq.objSlotDetailBC.AdministrationDetail.AdminByPersonalCarerOID = !String.IsNullOrEmpty(this.objVm.AdministrationDetail.AdminByPersonalCarer.Value) ? Convert.ToInt64(this.objVm.AdministrationDetail.AdminByPersonalCarer.Value) : 0;
        }
        if (this.rdbparent.IsChecked)
            objReq.objSlotDetailBC.AdministrationDetail.AdministratorType = "PersonalCarer";
        else if (this.rdbCareProvider.IsChecked) {
            objReq.objSlotDetailBC.AdministrationDetail.AdministratorType = "Users";
            objReq.objSlotDetailBC.AdministrationDetail.AdministeredByOID = this.objVm.AdministrationDetail != null && !String.IsNullOrEmpty(this.objVm.AdministrationDetail.AdministeredByOID) ? Convert.ToInt64(this.objVm.AdministrationDetail.AdministeredByOID) : 0;
        }
        else if (this.rdbPatient.IsChecked)
            objReq.objSlotDetailBC.AdministrationDetail.AdministratorType = "Patient";
        this.objVm.AdministrationDetail.AdministratorType = objReq.objSlotDetailBC.AdministrationDetail.AdministratorType;
        this.objVm.AdministrationDetail.AdminByPersonalCarerOID = objReq.objSlotDetailBC.AdministrationDetail.AdminByPersonalCarerOID;
        objReq.objSlotDetailBC.AdministrationDetail.IsPersonalCarerNotListed = this.objVm.AdministrationDetail.IsPersonalCarerNotListed;
        objReq.objSlotDetailBC.AdministrationDetail.IsNoWitnessAvailable = Convert.ToBoolean(this.objVm.AdministrationDetail.IsNoWitnessAvialable);
        if (!String.IsNullOrEmpty(this.objVm.AdministrationDetail.WitnessByOID) && !objReq.objSlotDetailBC.AdministrationDetail.IsNoWitnessAvailable)
            objReq.objSlotDetailBC.AdministrationDetail.WitnessedByOID = Convert.ToInt64(this.objVm.AdministrationDetail.WitnessByOID);
        if (this.objVm.AdministrationDetail.ReasonForNotDefer != null) {
            objReq.objSlotDetailBC.AdministrationDetail.AmendReasonCode = this.objVm.AdministrationDetail.ReasonForNotDefer.Value;
        }
        if (this.objVm.AdministrationDetail.DoseDiscReasonCode != null && !String.IsNullOrEmpty(this.objVm.AdministrationDetail.DoseDiscReasonCode.Value)) {
            objReq.objSlotDetailBC.AdministrationDetail.DoseDiscReasonCode = this.objVm.AdministrationDetail.DoseDiscReasonCode.Value;
        }
        if (this.objVm.AdministrationDetail.DoseDiscComments != null && !String.IsNullOrEmpty(this.objVm.AdministrationDetail.DoseDiscComments)) {
            objReq.objSlotDetailBC.AdministrationDetail.DoseDiscComments = this.objVm.AdministrationDetail.DoseDiscComments;
        }
        if (this.iRdbGiven.IsChecked == true) {
            var dtGivenDateTime: DateTime = this.timeDateTimeGivenText.Value == null ? DateTime.MinValue : Convert.ToDateTime(this.timeDateTimeGivenText.Value);
            if (dtGivenDateTime != DateTime.MinValue && dtGivenDateTime.IsDaylightSavingTime()) {
                objReq.objSlotDetailBC.AdministrationDetail.AdministeredDate = dtGivenDateTime;
            }
            else {
                // SYED - to check
                //objReq.objSlotDetailBC.AdministrationDetail.AdministeredDate = new Date(this.objVm.AdministrationDetail.AdministeredDate.Date.AddMinutes(dtGivenDateTime.TimeOfDay.TotalMinutes).Ticks, DateTimeKind.Local);
                objReq.objSlotDetailBC.AdministrationDetail.AdministeredDate = dtGivenDateTime;
            }
            this.objVm.AdministrationDetail.AdministeredDate = objReq.objSlotDetailBC.AdministrationDetail.AdministeredDate;
            objReq.objSlotDetailBC.Status = SlotStatus.GIVEN;
            this.objVm.Status = objReq.objSlotDetailBC.Status;
            objReq.objSlotDetailBC.AdministrationDetail.AmendReasonCode = this.objVm.AdministrationDetail.AdministeredReason.Value;
        }
        else if (this.iRdbNotGiven.IsChecked == true) {
            objReq.objSlotDetailBC.AdministrationDetail.AdministeredDate = CommonBB.GetServerDateTime();
            this.objVm.AdministrationDetail.AdministeredDate = objReq.objSlotDetailBC.AdministrationDetail.AdministeredDate;
            objReq.objSlotDetailBC.Status = SlotStatus.NOTGIVEN;
            this.objVm.Status = objReq.objSlotDetailBC.Status;
            this.objVm.AdministrationDetail.AdministeredByOID = String.Empty;
            objReq.objSlotDetailBC.AdministrationDetail.AdministeredByOID = 0;
            objReq.objSlotDetailBC.AdministrationDetail.ReasonNotGiven = this.objVm.AdministrationDetail.ReasonNotGiven.Value;
            objReq.objSlotDetailBC.AdministrationDetail.AmendReasonCode = this.objVm.AdministrationDetail.AdministeredReason.Value;
        }
        else if (this.iRdbSelfAdmin.IsChecked == true) {
            objReq.objSlotDetailBC.AdministrationDetail.AdministeredDate = Convert.ToDateTime(this.objVm.AdministrationDetail.AdministeredDate.ToShortDateString() + " " + Convert.ToDateTime(this.timeDateTimeGivenText.Value).ToShortTimeString());
            this.objVm.AdministrationDetail.AdministeredDate = objReq.objSlotDetailBC.AdministrationDetail.AdministeredDate;
            objReq.objSlotDetailBC.Status = SlotStatus.SELFADMINISTERED;
            this.objVm.Status = objReq.objSlotDetailBC.Status;
            objReq.objSlotDetailBC.AdministrationDetail.AmendReasonCode = this.objVm.AdministrationDetail.AdministeredReason.Value;
        }
        else if (this.iRdbNotKnown.IsChecked == true) {
            objReq.objSlotDetailBC.AdministrationDetail.AdministeredDate = CommonBB.GetServerDateTime();
            this.objVm.AdministrationDetail.AdministeredDate = objReq.objSlotDetailBC.AdministrationDetail.AdministeredDate;
            objReq.objSlotDetailBC.Status = SlotStatus.NOTKNOWN;
            this.objVm.Status = objReq.objSlotDetailBC.Status;
            objReq.objSlotDetailBC.AdministrationDetail.AmendReasonCode = this.objVm.AdministrationDetail.AdministeredReason.Value;
        }
        if (this.iRdbGiven.IsChecked == true || this.iRdbSelfAdmin.IsChecked == true) {
            objReq.objSlotDetailBC.AdministrationDetail.Dose = String.IsNullOrEmpty(this.sAdminMethod) ? !String.IsNullOrEmpty(this.objVm.AdministrationDetail.Dose) ? this.objVm.AdministrationDetail.Dose : null : null;
            objReq.objSlotDetailBC.AdministrationDetail.DoseUOM = String.IsNullOrEmpty(this.sAdminMethod) ? this.objVm.AdministrationDetail.lnDoseUOMOID > 0 ? Convert.ToString(this.objVm.AdministrationDetail.lnDoseUOMOID) : null : null;
            objReq.objSlotDetailBC.AdministrationDetail.DoseUOMOID = this.objVm.AdministrationDetail.lnDoseUOMOID;
            objReq.objSlotDetailBC.AdministrationDetail.DoseUomLorenzoID = this.objVm.AdministrationDetail.strDoseUOMLzoID;
            objReq.objSlotDetailBC.AdministrationDetail.SiteOID = this.objVm.AdministrationDetail.Site == null ? null : this.objVm.AdministrationDetail.Site.Value;
            objReq.objSlotDetailBC.AdministrationDetail.ExpiryDate = this.objVm.AdministrationDetail.ExpiryDate;
            objReq.objSlotDetailBC.AdministrationDetail.RouteOID = this.objVm.AdministrationDetail.RouteOID == null ? null : this.objVm.AdministrationDetail.RouteOID.Value;
            objReq.objSlotDetailBC.AdministrationDetail.BatchNumber = this.objVm.AdministrationDetail.BatchNo;
            if (this.objVm.AdministrationDetail.ConcentrationStrengthUOM != null && !String.IsNullOrEmpty(this.objVm.AdministrationDetail.ConcentrationStrengthUOM.Value)) {
                var tempStrengthUOM: UOM = new UOM();
                tempStrengthUOM.UOMId = Convert.ToInt64(this.objVm.AdministrationDetail.ConcentrationStrengthUOM.Value);
                tempStrengthUOM.UOMName = this.objVm.AdministrationDetail.ConcentrationStrengthUOM.DisplayText;
                objReq.objSlotDetailBC.AdministrationDetail.ConcentrationStrengthUOM = tempStrengthUOM;
            }
            objReq.objSlotDetailBC.AdministrationDetail.ConcentrationStrength = !String.IsNullOrEmpty(this.objVm.AdministrationDetail.ConcentrationStrength) ? this.objVm.AdministrationDetail.ConcentrationStrength : String.Empty;
            objReq.objSlotDetailBC.AdministrationDetail.ConcentrationVolume = !String.IsNullOrEmpty(this.objVm.AdministrationDetail.ConcentrationVolume) ? this.objVm.AdministrationDetail.ConcentrationVolume : String.Empty;
            if (this.objVm.AdministrationDetail.ConcentrationVolumeUOM != null && !String.IsNullOrEmpty(this.objVm.AdministrationDetail.ConcentrationVolumeUOM.Value)) {
                var tempVolumeUOM: UOM = new UOM();
                tempVolumeUOM.UOMId = Convert.ToInt64(this.objVm.AdministrationDetail.ConcentrationVolumeUOM.Value);
                tempVolumeUOM.UOMName = this.objVm.AdministrationDetail.ConcentrationVolumeUOM.DisplayText;
                objReq.objSlotDetailBC.AdministrationDetail.ConcentrationVolumeUOM = tempVolumeUOM;
            }
            objReq.objSlotDetailBC.AdministrationDetail.InfusionPeriodforMedAdmin = !String.IsNullOrEmpty(this.objVm.AdministrationDetail.InfusionPeriodforMedAdmin) ? Convert.ToInt32(this.objVm.AdministrationDetail.InfusionPeriodforMedAdmin) : 0;
            if (this.objVm.AdministrationDetail.InfusionPeriodUOMforMedAdmin != null && !String.IsNullOrEmpty(this.objVm.AdministrationDetail.InfusionPeriodUOMforMedAdmin.Value)) {
                var tempPeriodUOM: UOM = new UOM();
                tempPeriodUOM.UOMId = Convert.ToInt64(this.objVm.AdministrationDetail.InfusionPeriodUOMforMedAdmin.Value);
                tempPeriodUOM.UOMName = this.objVm.AdministrationDetail.InfusionPeriodUOMforMedAdmin.DisplayText;
                objReq.objSlotDetailBC.AdministrationDetail.InfusionPeriodUOMforMedAdmin = tempPeriodUOM;
            }
        }
        else if (this.iRdbNotGiven.IsChecked == true || this.iRdbNotKnown.IsChecked == true) {
            objReq.objSlotDetailBC.AdministrationDetail.Dose = null;
            objReq.objSlotDetailBC.AdministrationDetail.DoseUOM = null;
            objReq.objSlotDetailBC.AdministrationDetail.DoseUOMOID = 0;
            objReq.objSlotDetailBC.AdministrationDetail.DoseUomLorenzoID = null;
            objReq.objSlotDetailBC.AdministrationDetail.SiteOID = null;
            objReq.objSlotDetailBC.AdministrationDetail.ExpiryDate = DateTime.MinValue;
            objReq.objSlotDetailBC.AdministrationDetail.RouteOID = null;
            objReq.objSlotDetailBC.AdministrationDetail.BatchNumber = null;
        }
        this.objVm.SlotsTimeIntervalAvg = this.SlotsTimeIntervalAvg;
        if (this.iRdbGiven.IsChecked == true || this.iRdbSelfAdmin.IsChecked == true) {
            this.cAdministeredTimeMode = Common.SetAdminTimeMode(this.objVm.IsLastPRN, this.objVm.SlotsTimeIntervalAvg, objReq.objSlotDetailBC.ScheduledDTTM, this.objVm.AdministrationDetail.AdministeredDate);
        }
        else {
            this.cAdministeredTimeMode = String.MinValue;
        }
        objReq.objSlotDetailBC.AdministrationDetail.AdministeredOnTimeMode = this.cAdministeredTimeMode;
        this.objVm.AdministrationDetail.AdministeredOnTimeMode = this.cAdministeredTimeMode;
        this.objVm.PresScheduleOID = this.prescriptionSchOid;
        objReq.objSlotDetailBC.AdministrationDetail.MedAdminOID = this.medAdminOid;
        objReq.objSlotDetailBC.PrescriptionItemOID = this.prescriptionOid;
        objReq.objSlotDetailBC.OID = this.prescriptionSchOid;
        this.objVm.AdministrationDetail.OnWitnessUserSelected = (s,e) => { this.ValidateUser(s) };
        objReq.objSlotDetailBC.IsInfusion = this.objVm.IsInfusionItem;
        if (ChartContext.PatientOID > 0) {
            objReq.objSlotDetailBC.AdministrationDetail.PatientOID = ChartContext.PatientOID;
            objReq.objSlotDetailBC.PatientOID = ChartContext.PatientOID;
        }
        if (ChartContext.EncounterOID > 0) {
            objReq.objSlotDetailBC.EncounterOID = ChartContext.EncounterOID;
        }
        objReq.objSlotDetailBC.IsUpdatePIStatusToCompleted = this.IsUpdatePIStatusToCompleted;
        if (this.objVmsltDoseDis != null && this.objVmsltDoseDis.IsLastSlotinCurrentView) {
            objReq.objSlotDetailBC.IsLastSlotCheckRequired = this.objVmsltDoseDis.IsLastSlotCheckRequired;
        }
        if (this.objVmsltDoseDis != null && this.objVmsltDoseDis.PrescriptionEndDate != DateTime.MinValue) {
            objReq.objSlotDetailBC.PresItemENDTTM = this.objVmsltDoseDis.PrescriptionEndDate;
        }
        if (objReq != null && objReq.objSlotDetailBC != null && objReq.objSlotDetailBC.AdministrationDetail != null)
            objReq.objSlotDetailBC.AdministrationDetail.MedBarCodeOverrideDetails = this.lstCMedBarcodeScanOverrideDetail;
        var lstMedProddet: ObservableCollection<MedsScanProductDetails> = new ObservableCollection<MedsScanProductDetails>();
        var objManageBarcodeHelper: ManageBarcodeHelper = new ManageBarcodeHelper();
        if ((this.iRdbGiven.IsChecked == true || this.iRdbSelfAdmin.IsChecked == true) && this.oMedScanRecAdmVM != null && this.oMedScanRecAdmVM.oProductDetailsInfo != null && this.oMedScanRecAdmVM.oProductDetailsInfo.Count > 0) {
            this.oMedScanRecAdmVM.TotaldoseadministeredAmt = !String.IsNullOrEmpty(this.objVm.AdministrationDetail.Dose) ? this.objVm.AdministrationDetail.Dose : null;
            this.oMedScanRecAdmVM.TotalDoseAdministeredUOMLZOID = !String.IsNullOrEmpty(this.objVm.AdministrationDetail.strDoseUOMLzoID) ? this.objVm.AdministrationDetail.strDoseUOMLzoID : null;
            lstMedProddet = objManageBarcodeHelper.FillScanedProductDetails(this.oMedScanRecAdmVM);
            objReq.objSlotDetailBC.AdministrationDetail.MedProductDetails = lstMedProddet;
        }
        objService.ModifyAdministrationAsync(objReq);
    }
    objService_ModifyAdministrationCompleted(sender: Object, e: ModifyAdministrationCompletedEventArgs): void {
        if (e.Result != null) {
            var objRes: CResMsgModifyAdministration = e.Result;
            if (objRes.oContextInformation != null && objRes.oContextInformation.Errors.Count <= 0) {
                this.objVmsltDoseDis.IsSubmitInProgress = false;
                this.objVm.IsSubmitInProgress = this.objVmsltDoseDis.IsSubmitInProgress;
                if (objRes.IsPresItemStatusUpdated) {
                    this.PrescItemStatus = CConstants.COMPLETED;
                    this.objVm.CurrentPrescriptionItemStatus = CConstants.COMPLETED;
                }
                this.DataContext = this.objVm;
                if (this.OnSubmitModAdminEvent != null) {
                    this.OnSubmitModAdminEvent();
                    
                }
            }
            else{
                this.objVmsltDoseDis.IsSubmitInProgress = false;
                this.objVm.IsSubmitInProgress = this.objVmsltDoseDis.IsSubmitInProgress;
            }
        }
    }
    cmdCancel_Click(e): void {
    }
    iRdbNotGiven_Checked(e): void {
        this.MedDoseinfo.Visibility = Visibility.Collapsed;
        this.lblResNotGiven.Visibility = Visibility.Visible;
        this.cboResNotGiven.Visibility = Visibility.Visible;
        this.lblDateTimeGivenText.Visibility = Visibility.Collapsed;
        this.dtpDateTimeGivenText.Visibility = Visibility.Collapsed;
        this.timeDateTimeGivenText.Visibility = Visibility.Collapsed;
        this.rdbCareProvider.Visibility = Visibility.Collapsed;
        this.rdbparent.Visibility = Visibility.Collapsed;
        this.stpCareProvider.Visibility = Visibility.Collapsed;
        this.lblAdministeredby.Visibility = Visibility.Collapsed;
        this.sfsAdministeredby.Visibility = Visibility.Collapsed;
        this.chkNoWitness.Visibility = Visibility.Collapsed;
        this.lblWitnessedBy.Visibility = Visibility.Collapsed;
        this.sfsWitnessedby.Visibility = Visibility.Collapsed;
        this.lblResFordefer.Visibility = Visibility.Collapsed;
        this.cboResFordefer.Visibility = Visibility.Collapsed;
        this.SetCriticalMedMessage();
        if (this.cboResNotGiven.SelectedValue != null && (<CListItem>(this.cboResNotGiven.SelectedValue)).Value == "CC_CLNCLRSN")
            this.lblComments.Mandatory = true;
        else this.lblComments.Mandatory = false;
        if (this.cboAmendReason.SelectedValue != null && (<CListItem>(this.cboAmendReason.SelectedValue)).Value == "CC_CLNCLRSN")
            this.lblComments.Mandatory = true;
        else this.lblComments.Mandatory = false;
        this.HideInfBolusItems();
        this.cmdScanRecMedication.Visibility = Visibility.Collapsed;
        this.lblNoWitness.Visibility = Visibility.Collapsed;
        this.ValidateOnActionChange(CConstants.ActionNotGiven);
        this.HidePatientParertCareControls();
        this.RefreshDivElements();
    }
    private SetCriticalMedMessage(): void {
        if (this.objVmsltDoseDis != null && this.objVmsltDoseDis.AdministrationDetail != null && this.objVmsltDoseDis.AdministrationDetail.IsCriticalMed) {
            if (this.objVmsltDoseDis.AdministrationDetail.CriticalMedsRoutes != null) {
                var RT: string[] = this.objVmsltDoseDis.AdministrationDetail.CriticalMedsRoutes.Split('/');
                var s: StringBuilder = new StringBuilder();
                s.Append("This medication has been deemed critical by your organisation when being administered via the ");
                for (var i: number = 0; i < RT.Count(); i++) {
                    if (i == 0) {
                        s.Append(RT[i].Trim());
                    }
                    else {
                        s.Append("/ " + RT[i].Trim());
                    }
                }
                if (RT.Count() == 1) {
                    s.Append(" route. " + this.objVmsltDoseDis.AdministrationDetail.CriticalMedsMsg);
                }
                else {
                    s.Append(" routes. " + this.objVmsltDoseDis.AdministrationDetail.CriticalMedsMsg);
                }
                this.critical.Text = s.ToString();
            }
            else {
                this.critical.Text = this.objVmsltDoseDis.AdministrationDetail.CriticalMedsMsg;
            }
            if (String.IsNullOrEmpty(this.objVmsltDoseDis.AdministrationDetail.CriticalMedsURL) || String.Equals(this.objVmsltDoseDis.AdministrationDetail.CriticalMedsURL, "http://") || String.Equals(this.objVmsltDoseDis.AdministrationDetail.CriticalMedsURL, "https://")) {
                this.HideDivElement("divCriticalDrugSiteURL");
            }
            else {
                this.ShowDivElement("divCriticalDrugSiteURL");
            }
            this.ShowDivElement("divCriticalMedMsg");
        }
    }
    CriticalURL_Clilck(e): void {
        var objCriticalURLContentInfo: Object[] = null;
        objCriticalURLContentInfo = new Array(1);
        objCriticalURLContentInfo[0] = this.objVmsltDoseDis.AdministrationDetail.CriticalMedsURL;
        var returnValue: Object = HtmlPage.Window.Invoke("LaunchCriticalURLLink", objCriticalURLContentInfo);
    }
    iRdbGiven_Checked(e): void {
        this.rdbCareProvider.IsChecked = true;
        this.MedDoseinfo.Visibility = Visibility.Visible;
        this.lblDateTimeGivenText.Visibility = Visibility.Visible;
        this.dtpDateTimeGivenText.Visibility = Visibility.Visible;
        this.timeDateTimeGivenText.Visibility = Visibility.Visible;
        if (this.IsBolus && (String.IsNullOrEmpty(this.sMultiRoute) || this.sMultiRoute != Convert.ToString(MultiRouteType.Non_Infusion_Routes)))
            this.ShowInfBolusItems();
        else 
            this.HideInfBolusItems();
        if (!this.IsConstructorExecInProgress) {
            this.SetAdministeredTimeValidDateRange(SlotStatus.GIVEN);
        }

        //if (this.objVm != null && this.objVm.AdministrationDetail != null && MedChartData.ActiveTo != DateTime.MinValue) {
        if (this.objVm != null && this.objVm.AdministrationDetail != null && DateTime.NotEquals(MedChartData.ActiveTo, DateTime.MinValue)) {
            //this.SlotDate = this.objVm.AdministrationDetail.AdministeredDate.Date;
            this.dtpDateTimeGivenText.SetDateValue(this.SlotDate.Date);
            this.dtpDateTimeGivenText.SelectedDateTime = this.SlotDate.Date;
        }
        else if (this.objVm != null && this.objVm.AdministrationDetail != null) {
            this.dtpDateTimeGivenText.SetDateValue(this.objVm.AdministrationDetail.AdministeredDate.Date);
            this.dtpDateTimeGivenText.SelectedDateTime = this.objVm.AdministrationDetail.AdministeredDate.Date;
        }
        this.timeDateTimeGivenText.Value = CommonBB.GetServerDateTime();
        this.rdbCareProvider.Visibility = Visibility.Visible;
        this.rdbparent.Visibility = Visibility.Visible;
        this.stpCareProvider.Visibility = Visibility.Visible;
        this.lblAdministeredby.Visibility = Visibility.Visible;
        this.sfsAdministeredby.Visibility = Visibility.Visible;
        if (this.IsWitnessOverrideAllowed) {
            this.chkNoWitness.Visibility = Visibility.Visible;
        }
        this.lblResNotGiven.Visibility = Visibility.Collapsed;
        this.cboResNotGiven.Visibility = Visibility.Collapsed;
        this.lblResFordefer.Visibility = Visibility.Collapsed;
        this.cboResFordefer.Visibility = Visibility.Collapsed;
        this.lblWitnessedBy.Visibility = Visibility.Visible;
        this.sfsWitnessedby.Visibility = Visibility.Visible;
        this.chkNoWitness.IsEnabled = this.bIsWitnessReqd;
        this.HideDivElement("divCriticalMedMsg");
        if (this.chkNoWitness.IsChecked == true) {
            this.sfsWitnessedby.IsEnabled = false;
            this.lblWitnessedBy.IsEnabled = false;
            this.lblWitnessedBy.Mandatory = false;
            if (this.objVm != null)
                this.objVm.AdministrationDetail.WitnessMandatory = false;
        }
        else {
            this.sfsWitnessedby.IsEnabled = this.bIsWitnessReqd;
            this.lblWitnessedBy.IsEnabled = this.bIsWitnessReqd;
            this.lblWitnessedBy.Mandatory = this.bIsWitnessReqd;
            if (this.objVm != null)
                this.objVm.AdministrationDetail.WitnessMandatory = this.bIsWitnessReqd;
        }
        this.lblComments.Mandatory = false;
        this.SetAdministeredbyValue();
        if (this.cboAmendReason.SelectedValue != null && (<CListItem>(this.cboAmendReason.SelectedValue)).Value == "CC_CLNCLRSN")
            this.lblComments.Mandatory = true;
        else this.lblComments.Mandatory = false;
        if (this.objVmsltDoseDis != null && !this.objVmsltDoseDis.IsMedScanExcluded) {
            this.cmdScanRecMedication.Visibility = Visibility.Visible;
        }
        this.lblNoWitness.Visibility = Visibility.Visible;
        this.ValidateOnActionChange(CConstants.ActionGiven);
        this.HidePatientParertCareControls();
        this.RefreshDivElements();
    }
    iRdbSelfAdmin_Checked(e): void {
        this.MedDoseinfo.Visibility = Visibility.Visible;
        this.lblDateTimeGivenText.Visibility = Visibility.Visible;
        this.dtpDateTimeGivenText.Visibility = Visibility.Visible;
        this.timeDateTimeGivenText.Visibility = Visibility.Visible;
        this.HideDivElement("divCriticalMedMsg");
        if (!this.IsConstructorExecInProgress) {
            this.SetAdministeredTimeValidDateRange(SlotStatus.SELFADMINISTERED);
        }
        if (this.objVm != null && this.objVm.AdministrationDetail != null && MedChartData.ActiveTo != DateTime.MinValue) {
            //this.SlotDate = this.objVm.AdministrationDetail.AdministeredDate.Date;
            this.dtpDateTimeGivenText.SetDateValue(this.SlotDate.Date);
            this.dtpDateTimeGivenText.SelectedDateTime = this.SlotDate.Date;
        }
        else if (this.objVm != null && this.objVm.AdministrationDetail != null) {
            this.dtpDateTimeGivenText.SetDateValue(this.objVm.AdministrationDetail.AdministeredDate.Date);
            this.dtpDateTimeGivenText.SelectedDateTime = this.objVm.AdministrationDetail.AdministeredDate.Date;
        }
        this.timeDateTimeGivenText.Value = DateTime.Now;
        this.lblAdministeredby.Visibility = Visibility.Visible;
        this.sfsAdministeredby.Visibility = Visibility.Visible;
        if (this.IsWitnessOverrideAllowed) {
            this.chkNoWitness.Visibility = Visibility.Visible;
        }
        this.lblWitnessedBy.Visibility = Visibility.Visible;
        this.sfsWitnessedby.Visibility = Visibility.Visible;
        this.lblResFordefer.Visibility = Visibility.Collapsed;
        this.cboResFordefer.Visibility = Visibility.Collapsed;
        this.lblResNotGiven.Visibility = Visibility.Collapsed;
        this.cboResNotGiven.Visibility = Visibility.Collapsed;
        this.lblComments.Mandatory = false;
        if (this.bIsWitnessReqd) {
            this.chkNoWitness.IsEnabled = true;
            this.sfsWitnessedby.IsEnabled = (this.chkNoWitness.IsChecked == true) ? false : true;
            this.lblWitnessedBy.IsEnabled = (this.chkNoWitness.IsChecked == true) ? false : true;
            if (this.objVm != null)
                this.objVm.AdministrationDetail.WitnessMandatory = false;
        }
        else {
            this.chkNoWitness.IsEnabled = false;
            this.sfsWitnessedby.IsEnabled = false;
            this.lblWitnessedBy.IsEnabled = false;
            if (this.objVm != null)
                this.objVm.AdministrationDetail.WitnessMandatory = false;
        }
        this.SetAdministeredbyValue();
        if (this.cboAmendReason.SelectedValue != null && (<CListItem>(this.cboAmendReason.SelectedValue)).Value == "CC_CLNCLRSN")
            this.lblComments.Mandatory = true;
        else this.lblComments.Mandatory = false;
        if (this.objVmsltDoseDis != null && !this.objVmsltDoseDis.IsMedScanExcluded) {
            this.cmdScanRecMedication.Visibility = Visibility.Visible;
        }
        this.lblNoWitness.Visibility = Visibility.Visible;
        this.ValidateOnActionChange(CConstants.ActionSelfAdmin);
        this.ShowPatientParertCareControls();
        this.RefreshDivElements();
    }
    iRdbNotKnown_Checked(e): void {
        this.MedDoseinfo.Visibility = Visibility.Collapsed;
        this.lblResNotGiven.Visibility = Visibility.Collapsed;
        this.cboResNotGiven.Visibility = Visibility.Collapsed;
        this.lblDateTimeGivenText.Visibility = Visibility.Collapsed;
        this.dtpDateTimeGivenText.Visibility = Visibility.Collapsed;
        this.timeDateTimeGivenText.Visibility = Visibility.Collapsed;
        this.rdbCareProvider.Visibility = Visibility.Collapsed;
        this.rdbparent.Visibility = Visibility.Collapsed;
        this.stpCareProvider.Visibility = Visibility.Collapsed;
        this.lblAdministeredby.Visibility = Visibility.Collapsed;
        this.sfsAdministeredby.Visibility = Visibility.Collapsed;
        this.chkNoWitness.Visibility = Visibility.Collapsed;
        this.lblWitnessedBy.Visibility = Visibility.Collapsed;
        this.sfsWitnessedby.Visibility = Visibility.Collapsed;
        this.lblResFordefer.Visibility = Visibility.Collapsed;
        this.cboResFordefer.Visibility = Visibility.Collapsed;
        this.HideDivElement("divCriticalMedMsg");
        if (this.cboAmendReason.SelectedValue != null && (<CListItem>(this.cboAmendReason.SelectedValue)).Value == "CC_CLNCLRSN")
            this.lblComments.Mandatory = true;
        else 
            this.lblComments.Mandatory = false;
        this.HideInfBolusItems();
        this.cmdScanRecMedication.Visibility = Visibility.Collapsed;
        this.lblNoWitness.Visibility = Visibility.Collapsed;
        this.ValidateOnActionChange(CConstants.ActionNotKnown);
        this.HidePatientParertCareControls();
        this.RefreshDivElements();
    }
    private SetAdministeredTimeValidDateRange(pSlotStatus: string): void {
        if (String.Equals(pSlotStatus, SlotStatus.GIVEN) || String.Equals(pSlotStatus, SlotStatus.SELFADMINISTERED)) {
            if (this.bIsPRN && !this.IsPRNwithSchedule) {
                this.dtpDateTimeGivenText.RangeStartDate = this.dSlotDate.Date;
                this.dtpDateTimeGivenText.RangeEndDate = this.dSlotDate.Date.AddDays(1).AddSeconds(-1);
            }
            else {
                var dEndDate: DateTime = DateTime.MinValue;
                // if (MedChartData.ActiveTo != DateTime.MinValue && !String.Equals(MedChartData.ChartStatus, CConstants.sChartSuspendedStatusCode)) {
                //     dEndDate = MedChartData.ActiveTo.AddHours(23).AddMinutes(59).AddSeconds(59);
                // }
                // else {
                    dEndDate = this.CurrentDTTM;
                // }
                if (this.date >= dEndDate.Date) {
                    this.dtpDateTimeGivenText.RangeStartDate = dEndDate.Date;
                    this.dtpDateTimeGivenText.RangeEndDate = dEndDate;
                }
                else {
                    this.dtpDateTimeGivenText.RangeStartDate = this.date;
                    this.dtpDateTimeGivenText.CurrentDateTime = this.SlotDate;
                    this.dtpDateTimeGivenText.RangeEndDate = dEndDate;
                }
            }
        }
    }
    chkNoWitness_Unchecked(e): void {
        if (ProfileData.ClinicalIncidentConfig != null && !ProfileData.ClinicalIncidentConfig.isModifyAdministration) {
            this.lblcliniIncFrm.Visibility = Visibility.Collapsed;
            this.lblcliniIncFrmValue.Visibility = Visibility.Collapsed;
        }
        if (this.bIsWitnessReqd) {
            this.sfsWitnessedby.IsEnabled = true;
            this.lblWitnessedBy.IsEnabled = true;
            this.chkNoWitness.IsEnabled = true;
            this.objVm.AdministrationDetail.WitnessMandatory = (this.iRdbSelfAdmin.IsChecked == true) ? false : true;
            this.lblWitnessedBy.Mandatory = (this.iRdbSelfAdmin.IsChecked == true || this.rdbparent.IsChecked == true) ? false : true;                       
        }
        else {
            if (!this.rdbparent.IsChecked) {
                this.sfsWitnessedby.IsEnabled = false;
                this.lblWitnessedBy.Mandatory = false;
                this.lblWitnessedBy.IsEnabled = false;
            }
        }
        this.sfsWitnessedby.GetSFSItems("cp");
        this.RefreshDivElements();
    }
    chkNoWitness_Checked(e): void {
        this.sfsWitnessedby.IsEnabled = false;
        this.lblWitnessedBy.IsEnabled = false;
        this.lblWitnessedBy.Mandatory = false;
        if ((this.objVm != null && this.objVm.AdministrationDetail != null && !String.IsNullOrEmpty(this.objVm.AdministrationDetail.ClinicalIncidentForm)) && (this.lblcliniIncFrm.Visibility == Visibility.Collapsed)) {
            this.lblcliniIncFrm.Visibility = Visibility.Visible;
            this.lblcliniIncFrmValue.Visibility = Visibility.Visible;
        }
        if (ProfileData.ClinicalIncidentConfig != null && Common.ValidateURL(ProfileData.ClinicalIncidentConfig.Address)) {
            this.lblcliniIncFrmValue.IsEnabled = true;
        }
        else {
            this.lblcliniIncFrmValue.IsEnabled = false;
        }
        this.sfsWitnessedby.ClearAll();
        this.objVm.AdministrationDetail.WitnessByOID = String.Empty;
        this.objVm.AdministrationDetail.WitnessBy = String.Empty;
        this.RefreshDivElements();
    }
    rdbparent_Checked(e): void {
        this.objVm.AdministrationDetail.AdministeredByOID = String.Empty;
        this.sfsWitnessedby.IsEnabled = true;
        this.lblWitnessedBy.IsEnabled = true;
        this.lblWitnessedBy.Mandatory = false;
        this.chkNoWitness.IsChecked = false;
        this.chkNoWitness_Unchecked(null);
        this.chkNoWitness.IsEnabled = false;
        if (this.objVm != null)
            this.objVm.AdministrationDetail.WitnessMandatory = false;
        this.SetAdministeredbyValue();
        this.ShowParentDropdown();
        this.RefreshDivElements();
    }
    rdbPatient_Checked(e): void {
        this.ShowPatientControls();
        this.RefreshDivElements();
    }
    rdbCareProvider_Checked(e): void {
        this.sfsAdministeredby.Visibility = Visibility.Visible;
        this.sfsAdministeredby.IsEnabled = MedChartData.AllowAnyUserForAdministration;
        this.lblAdministeredby.Mandatory = true;
        this.lblAdministeredby.IsEnabled = true;
        if (this.objVm != null && !this.chkNoWitness.IsChecked) {
            this.objVm.AdministrationDetail.WitnessMandatory = this.bIsWitnessReqd;
            this.sfsWitnessedby.IsEnabled = this.bIsWitnessReqd;
            this.chkNoWitness.IsEnabled = this.bIsWitnessReqd;
            this.lblWitnessedBy.IsEnabled = this.bIsWitnessReqd;
        }
        else {
            this.sfsWitnessedby.IsEnabled = false;
            this.lblWitnessedBy.IsEnabled = false;
            this.chkNoWitness.IsEnabled = true;
        }
        this.SetAdministeredbyValue();
        this.HidePatientParertCareControls();
        this.RefreshDivElements();
    }
    ChildWindow_Loaded(): void {
        var objService: CSecurityManagementServiceWSSoapClient = new CSecurityManagementServiceWSSoapClient();
        objService.GetUserCompleted = (s,e) => { this.objService_GetUserCompleted(s,e) };
        var objReq: CReqMsgGetUser = new CReqMsgGetUser();
        objReq.oContextInformation = CommonBB.FillContext();
        objReq.lUserOIDBC = Convert.ToInt64(AppContextInfo.UserOID);
        objService.GetUserAsync(objReq);
        Busyindicator.SetStatusIdle("MedChart");
    }
    objService_GetUserCompleted(sender: Object, e: GetUserCompletedEventArgs): void {
        if (e.Result != null) {
            var objRes: CResMsgGetUser = e.Result;
            if (objRes != null && objRes.objEnterpriseObject != null && !String.IsNullOrEmpty(objRes.objEnterpriseObject.SurName)) {
                this.strUserName = objRes.objEnterpriseObject.SurName;
                if (!String.IsNullOrEmpty(objRes.objEnterpriseObject.ForeName)) {
                    this.strUserName += " ";
                    this.strUserName += objRes.objEnterpriseObject.ForeName;
                }
            }
        }
        this.getPatientPersonalCarers();
    }
    private getPatientPersonalCarers(): void {
        var objService: QueryPatientRecordWSSoapClient = new QueryPatientRecordWSSoapClient();
        objService.GetPatientPersonalCarerCompleted = (s,e) =>{ this.objService_GetPatientPersonalCarerCompleted(s, e) };
        var objReq: CReqMsgGetPatientPersonalCarer = new CReqMsgGetPatientPersonalCarer();
        objReq.oContextInformation = CommonBB.FillContext();
        objReq.PatientIDBC = Convert.ToString(PatientContext.PatientOID);
        objReq.CurrentBC = "IncludeRemoved";
        objService.GetPatientPersonalCarerAsync(objReq);
    }
    private getRecordAdministrator(): void {
        var objService: MedicationAdministrationWSSoapClient = new MedicationAdministrationWSSoapClient();
        objService.GetRecordAdministionDetailsCompleted = (s, e) => { this.objService_GetRecordAdministionDetailsCompleted(s, e) };
        var objReq: CReqMsgGetRecordAdministionDetails = new CReqMsgGetRecordAdministionDetails();
        objReq.oContextInformation = CommonBB.FillContext();
        objReq.MedsAdminOidBC = this.medAdminOid;
        objReq.PatientOidBC = ChartContext.PatientOID;
        objReq.IsSlotInPastDateAndStatusUnknownBC = this.IsSlotInPastDateAndStatusUnknown;
        objReq.PrescriptionItemScheduleOIDBC = this.prescriptionSchOid;
        objService.GetRecordAdministionDetailsAsync(objReq);
    }
    objService_GetRecordAdministionDetailsCompleted(sender: Object, e: GetRecordAdministionDetailsCompletedEventArgs): void {
        if (this.objVm == null)
            this.objVm = new SlotDetailVM();
        this.objVm.IsInfusionItem = this.IsBolus;
        this.objVm.IsLastPRN = this.objVmsltDoseDis.IsLastPRN;
        this.objVm.CurrentServerDate = this.CurrentDTTM;
        this.objVm.AdminMethod = this.sAdminMethod;
        this.objVm.IdentifyingOID = this.IdentifyingOID;
        this.objVm.IdentifyingType = this.IdentifyingType;
        this.objVm.MCVersionNo = this.MCVersion;
        this.objVm.DoseType = this.strDoseType;
        if (this.objVm.AdministrationDetail == null)
            this.objVm.AdministrationDetail = new AdministrationDetailVM();
        this.objVm.AdministrationDetail._IsSFSValueSetFromOnGetSFSItems = true;
        this.objVm.AdministrationDetail.DoseLblShow = Visibility.Visible;
        this.GetCliniicalIncidentFormConfig();
        this.objVm.AdministrationDetail.OnWitnessUserSelected = (s,e) => { this.ValidateUser(s) };
        if ((String.IsNullOrEmpty(this.objVm.AdminMethod) && (String.Equals(this.sItemType, CConstants.Formulary_Drug) || (String.Equals(this.sItemType, CConstants.Appliance) && String.Compare(this.strDoseType, DoseTypeCode.NORMAL) != 0 && String.Compare(this.strDoseType, DoseTypeCode.TITRATED) != 0))) || String.Equals(this.IdentifyingType, CConstants.NONCATALOGUEITEM) || String.Equals(this.IdentifyingType, CConstants.Precatalog)) {
            this.objVm.AdministrationDetail.DoseMandatory = true;
            this.objVm.AdministrationDetail.DoseUOMShow = Visibility.Collapsed;
            if (String.Compare(this.strDoseType, DoseTypeCode.CONDITIONAL) != 0) {
                this.lblDose.IsEnabled = true;
                this.objVm.IsDoseEnabled = true;
            }
            if (String.Equals(this.strDoseType, DoseTypeCode.CONDITIONAL) && !this.IsConditionalExists) {
                this.objVm.IsDoseEnabled = true;
                this.objVm.AdministrationDetail.DoseUOMShow = Visibility.Visible;
                this.objVm.AdministrationDetail.DoseLblShow = Visibility.Collapsed;
            }
        }
        else {
            this.objVm.AdministrationDetail.DoseMandatory = false;
            this.lblDose.IsEnabled = false;
            this.objVm.IsDoseEnabled = false;
        }
        if (e.Result != null && e.Result.objAdministrationDetail != null) {
            var objRes: CResMsgGetRecordAdministionDetails = e.Result;
            if (this.IsSlotInPastDateAndStatusUnknown) {
                this.medAdminOid = objRes.objAdministrationDetail.MedAdminOID;
            }
            this.objVm.AdministrationDetail.IsDuringHomeLeave = objRes.objAdministrationDetail.IsDuringHomeLeave;
            if (this.objVmsltDoseDis != null && this.objVmsltDoseDis.AdministrationDetail != null) {
                this.objVmsltDoseDis.AdministrationDetail.IsDuringHomeLeave = this.objVm.AdministrationDetail.IsDuringHomeLeave;
            }
            this.objVmsltDoseDis.AdministrationDetail.IsCriticalMed = objRes.objAdministrationDetail.IsCriticalMed;
            this.objVmsltDoseDis.AdministrationDetail.CriticalMedsRoutes = objRes.objAdministrationDetail.CriticalMedsRoutes;
            this.objVmsltDoseDis.AdministrationDetail.CriticalMedsMsg = objRes.objAdministrationDetail.CriticalMedsMsg;
            this.objVmsltDoseDis.AdministrationDetail.CriticalMedsURL = objRes.objAdministrationDetail.CriticalDrugSiteURL;

            if (this.iRdbNotGiven.IsChecked == true) {
                this.SetCriticalMedMessage();
            }
            this.objVm.AdministrationDetail.MedAdminOID = this.medAdminOid;
            if (objRes.objAdministrationDetail.Dose != null)
                this.objVm.AdministrationDetail.OldDose = this.objVm.AdministrationDetail.Dose = objRes.objAdministrationDetail.Dose;
            else if (this.strDose != "0")
                this.objVm.AdministrationDetail.OldDose = this.objVm.AdministrationDetail.Dose = this.strDose;
            if (objRes.objAdministrationDetail.DoseUOM != null) {
                if (objRes.objAdministrationDetail.DoseUOM.Contains('~')) {
                    this.objVm.AdministrationDetail.strDoseUOM = objRes.objAdministrationDetail.DoseUOM.Split('~')[1];
                }
                else {
                    this.objVm.AdministrationDetail.strDoseUOM = objRes.objAdministrationDetail.DoseUOM;
                }
            }
            else this.objVm.AdministrationDetail.strDoseUOM = String.IsNullOrEmpty(this.doseValUOM) ? "" : this.doseValUOM;
            if (objRes.objAdministrationDetail.DoseUOMOID != 0)
                this.objVm.AdministrationDetail.lnDoseUOMOID = objRes.objAdministrationDetail.DoseUOMOID;
            else {
                if (objRes.objAdministrationDetail.DoseUOM != null && objRes.objAdministrationDetail.DoseUOM.Contains('~')) {
                    this.objVm.AdministrationDetail.lnDoseUOMOID = Convert.ToInt64(objRes.objAdministrationDetail.DoseUOM.Split('~')[0]);
                }
                else {
                    this.objVm.AdministrationDetail.lnDoseUOMOID = this.lnDosUOMOID;
                }
            }
            if (objRes.objAdministrationDetail.DoseUomLorenzoID != null)
                this.objVm.AdministrationDetail.strDoseUOMLzoID = objRes.objAdministrationDetail.DoseUomLorenzoID;
            else this.objVm.AdministrationDetail.strDoseUOMLzoID = String.IsNullOrEmpty(this.doseValUOMLzoID) ? "" : this.doseValUOMLzoID;
            this.objVm.AdministrationDetail.AdminComments = objRes.objAdministrationDetail.AdminComments;
            if (this.objVmsltDoseDis != null && !String.IsNullOrEmpty(this.objVmsltDoseDis.Status) && !String.IsNullOrEmpty(objRes.objAdministrationDetail.MedicationAction) && String.Compare(this.objVmsltDoseDis.Status, SlotStatus.NOTKNOWN) == 0 && String.Compare(objRes.objAdministrationDetail.MedicationAction, SlotStatus.PLANNED) == 0) {
                objRes.objAdministrationDetail.MedicationAction = SlotStatus.NOTKNOWN;
            }
            if (String.Compare(objRes.objAdministrationDetail.MedicationAction, SlotStatus.NOTGIVEN) == 0 || String.Compare(objRes.objAdministrationDetail.MedicationAction, SlotStatus.NOTKNOWN) == 0 || String.Compare(objRes.objAdministrationDetail.MedicationAction, SlotStatus.DEFERADMIN) == 0) {
                if (objRes.objAdministrationDetail.AdministeredDate != DateTime.MinValue)
                    this.objVm.AdministrationDetail.AdministeredDate = objRes.objAdministrationDetail.AdministeredDate;
                else if (objRes.objAdministrationDetail.RecordedAt != DateTime.MinValue)
                    this.objVm.AdministrationDetail.AdministeredDate = objRes.objAdministrationDetail.RecordedAt;
            }
            else {
                this.objVm.AdministrationDetail.AdministeredDate = objRes.objAdministrationDetail.AdministeredDate;
                this.objVm.AdministrationDetail.ExpiryDate = objRes.objAdministrationDetail.ExpiryDate;
            }
            if (!String.IsNullOrEmpty(this.strUserName))
                this.objVm.AdministrationDetail.RecordedBy = this.strUserName;
            this.objVm.AdministrationDetail.BatchNo = objRes.objAdministrationDetail.BatchNumber;
            this.objVm.AdministrationDetail.AdministeredTime = objRes.objAdministrationDetail.AdministeredDate.ToString();
            //this.objVm.AdministrationDetail.AdministeredReason = objRes.objAdministrationDetail.AmendReasonCode;
            this.objVm.AdministrationDetail.NotGivenReasonCode = objRes.objAdministrationDetail.ReasonNotGiven;
            this.objVm.AdministrationDetail.AdministeredAction = objRes.objAdministrationDetail.MedicationAction;
            this.objVm.AdministrationDetail.IsNoWitnessAvialable = objRes.objAdministrationDetail.IsNoWitnessAvailable;
            if (this.objVm.AdministrationDetail.DoseDiscReasonCode == null) {
                this.objVm.AdministrationDetail.DoseDiscReasonCode = new CListItem();
                this.objVm.AdministrationDetail.DoseDiscReasonCode.Value = objRes.objAdministrationDetail.DoseDiscReasonCode;
            }
            if (this.objVm.AdministrationDetail.Dose == objRes.objAdministrationDetail.Dose) {
                this.objVm.AdministrationDetail.DoseDiscReasonCode.Value = null;
            }
            this.timeDateTimeGivenText.Value = objRes.objAdministrationDetail.AdministeredDate;
            if (objRes.objAdministrationDetail.AdministeredDate != DateTime.MinValue)
                this.objVm.AdministrationDetail.AdministeredDateTime = objRes.objAdministrationDetail.AdministeredDate;
            if ((this.iRdbNotGiven.IsChecked == true) && (String.Compare(objRes.objAdministrationDetail.MedicationAction, SlotStatus.DEFERADMIN) == 0) && (this.objVmsltDoseDis.Status == SlotStatus.NOTGIVEN)) {
                //this.objVm.AdministrationDetail.AdministeredReason = objRes.objAdministrationDetail.AmendReasonCode;
                this.objVm.GetDomainCombo("DeferReasonAsComment", false);
            }
            if ((this.iRdbNotGiven.IsChecked == true) && (!String.IsNullOrEmpty(objRes.objAdministrationDetail.ReasonNotGiven))) {
                var sSelectedReason: CListItem = null;
                sSelectedReason = this.objVm.AdministrationDetail.ReasonNotGivens.Where(o => o != null && o.Value == objRes.objAdministrationDetail.ReasonNotGiven).First();
                if (sSelectedReason != null) {
                    this.objVm.AdministrationDetail.ReasonNotGiven = sSelectedReason;
                }
            }
            this.objVm.AdministrationDetail.AdministeredBy = objRes.objAdministrationDetail.AdministeredBy;
            this.objVm.AdministrationDetail.AdministeredByOID = objRes.objAdministrationDetail.AdministeredByOID > 0 ? objRes.objAdministrationDetail.AdministeredByOID.ToString() : String.Empty;
            this.bDontSetAdministeredbyDefValue = true;
            this.objVm.AdministrationDetail.AdministratorType = objRes.objAdministrationDetail.AdministratorType;
            this.objVm.AdministrationDetail.AdminByPersonalCarerOID = objRes.objAdministrationDetail.AdminByPersonalCarerOID;
            this.AdminByPersonalCarerRecorded = objRes.objAdministrationDetail.AdminByPersonalCarerOID > 0 ? objRes.objAdministrationDetail.AdminByPersonalCarerOID.ToString() : String.Empty;
            this.AdminByTypeRecorded = objRes.objAdministrationDetail.AdministratorType;
            this.objVm.AdministrationDetail.IsPersonalCarerNotListed = objRes.objAdministrationDetail.IsPersonalCarerNotListed;
            if (this.objResPersonalCarer != null && this.objResPersonalCarer.oPersonalCarer != null && this.objResPersonalCarer.oPersonalCarer.Count > 0) {
                this.objResPersonalCarer.oPersonalCarer.forEach( (carer) => {
                    if (!String.Equals(carer.RPStatus, "D") || (!String.IsNullOrEmpty(this.AdminByPersonalCarerRecorded) && String.Equals(carer.PersonalCarerOID, this.AdminByPersonalCarerRecorded))) {
                        var item: CListItem = new CListItem();
                        item.DisplayText = String.Concat(carer.SurName, " ", carer.ForeName);
                        item.Value = carer.PersonalCarerOID;
                        item.Tag = carer.Relationship;
                        this.personalCarers.Add(item);
                    }
                });
            }
            if (this.personalCarers != null && this.personalCarers.Count > 0) {
                this.objVm.AdministrationDetail.ParentCarerList = this.personalCarers;
                if (!String.IsNullOrEmpty(this.AdminByPersonalCarerRecorded)) {
                    var relationCode: string = String.Empty;
                    this.sAdminByPersonalCarer = this.objVm.AdministrationDetail.ParentCarerList.Where(o => o != null && o.Value == this.AdminByPersonalCarerRecorded).FirstOrDefault();
                    if (this.sAdminByPersonalCarer != null) {
                        if (!this.objVm.AdministrationDetail.IsPersonalCarerNotListed)
                            this.objVm.AdministrationDetail.AdminByPersonalCarer = this.sAdminByPersonalCarer;
                        this.objVm.AdministrationDetail.AdminByPersonalCarerOID = Convert.ToInt64(this.sAdminByPersonalCarer.Value);
                        relationCode = this.sAdminByPersonalCarer.Tag != null ? this.sAdminByPersonalCarer.Tag.ToString() : String.Empty;
                    }
                    else {
                        this.sAdminByPersonalCarer = new CListItem();
                        this.sAdminByPersonalCarer.DisplayText = this.objVm.AdministrationDetail.AdministeredBy;
                        this.sAdminByPersonalCarer.Value = this.AdminByPersonalCarerRecorded;
                        this.sAdminByPersonalCarer.Tag = String.Empty;
                        if (this.objVm.AdministrationDetail.ParentCarerList == null)
                            this.objVm.AdministrationDetail.ParentCarerList = new ObservableCollection<CListItem>();
                        this.objVm.AdministrationDetail.ParentCarerList.Add(this.sAdminByPersonalCarer);
                        if (!this.objVm.AdministrationDetail.IsPersonalCarerNotListed)
                            this.objVm.AdministrationDetail.AdminByPersonalCarer = this.sAdminByPersonalCarer;
                        this.objVm.AdministrationDetail.AdminByPersonalCarerOID = Convert.ToInt64(this.AdminByPersonalCarerRecorded);
                    }
                    if (!String.IsNullOrEmpty(relationCode)) {
                        if (this.resolvedConceptCodes != null && this.resolvedConceptCodes.Count > 0) {
                            this.lblRelationSelected.Visibility = Visibility.Visible;
                            this.AdminByRelationship = this.resolvedConceptCodes.Where(c => c.Value == relationCode).Select(s => s.DisplayText).FirstOrDefault().ToString();
                            this.objVm.AdministrationDetail.PersonalCarerRelationship = this.AdminByRelationship;
                        }
                    }
                    else {
                        this.objVm.AdministrationDetail.PersonalCarerRelationship = String.Empty;
                    }
                }
            }
            else {
                this.SetParentCarerComboText(MedsAdminModifyAdministration.sParentCarer);
                this.cboParentCarer.IsEnabled = false;
                if (this.objVm.AdministrationDetail != null) {
                    this.objVm.AdministrationDetail.ParentCarerList = null;
                    if (!this.objVm.AdministrationDetail.IsPersonalCarerNotListed)
                        this.objVm.AdministrationDetail.AdminByPersonalCarer = null;
                    this.objVm.AdministrationDetail.PersonalCarerRelationship = String.Empty;
                }
            }
            this.DataContext = this.objVm;
            this.objVm.AdministrationDetail.IsNoWitnessAvialable = objRes.objAdministrationDetail.IsNoWitnessAvailable;
            this.objVm.AdministrationDetail.WitnessByOID = objRes.objAdministrationDetail.WitnessedByOID.ToString();
            this.objVm.AdministrationDetail.WitnessBy = objRes.objAdministrationDetail.WitnessedBy;
            if (!String.IsNullOrEmpty(this.objVm.AdministrationDetail.AdministeredByOID) && !String.Equals(this.objVm.AdministrationDetail.AdministeredByOID, "0")) {
                this.sfsAdministeredby.GetSFSItems("cp");
            }
            this.sfsWitnessedby.GetSFSItems("cp");
            if (objRes.objAdministrationDetail.Route != null) {
                if (MedicationCommonBB.Routes(objRes.objAdministrationDetail.Route).Count > 0) {
                    this.objVm.Routes = MedicationCommonBB.Routes(objRes.objAdministrationDetail.Route);
                    if (this.objVm.Routes != null && this.objVm.Routes.Count > 1) {
                        this.objVm.Routes = new ObservableCollection<CListItem>(this.objVm.Routes.OrderBy(c => c.DisplayText));
                    }
                    if (!String.IsNullOrEmpty(objRes.objAdministrationDetail.SelectedRoute)) {
                        var oSelectedRoute: CListItem = ObjectHelper.CreateObject(new CListItem(), { DisplayText: MedicationCommonBB.RouteName(objRes.objAdministrationDetail.SelectedRoute), Value: MedicationCommonBB.RouteOID(objRes.objAdministrationDetail.SelectedRoute) });
                        this.objVm.Routes.forEach( (oRoute) => {
                            if (oRoute.Value == oSelectedRoute.Value){
                                this.objVm.AdministrationDetail.RouteOID = oRoute;
                                this.lnRouteOID = Convert.ToInt64(oRoute.Value);
                            }
                        });
                        if (this.objVm.Routes.Count == 1) {
                            this.lnRouteOID = this.objVm.RouteOID = Convert.ToInt64(this.objVm.Routes[0].Value);
                        }
                    }
                    else {
                        if (this.objVm.Routes != null && this.objVm.Routes.Count == 1)
                            this.objVm.AdministrationDetail.RouteOID = this.objVm.Routes[0];
                        else this.objVm.AdministrationDetail.RouteOID = null;
                    }
                }
            }
            if (objRes.objAdministrationDetail.Site != null) {
                var osite: CListItem = ObjectHelper.CreateObject(new CListItem(), {
                    DisplayText: objRes.objAdministrationDetail.Site,
                    Value: (objRes.objAdministrationDetail.SiteOID != null) ? objRes.objAdministrationDetail.SiteOID.ToString() : String.Empty
                });
                if (this.objVm.AdministrationDetail.Sites == null)
                    this.objVm.AdministrationDetail.Sites = new ObservableCollection<CListItem>();
                var oMoresite: CListItem = ObjectHelper.CreateObject(new CListItem(), {
                    DisplayText: "More",
                    Value: "0"
                });
                this.objVm.AdministrationDetail.Sites.Add(osite);
                this.objVm.AdministrationDetail.Sites.Add(oMoresite);
                this.objVm.AdministrationDetail.Site = osite;
            }
            else {
                this.getAssosiatedDrugSites();
            }
            if (objRes.objAdministrationDetail.ConcentrationDoseUOMs != null && objRes.objAdministrationDetail.ConcentrationDoseUOMs.Count > 0) {
                this.objVm.AdministrationDetail.ConcentrationStrengthUOMs = new ObservableCollection<CListItem>();
                var oStrengthUomItem: CListItem;
                objRes.objAdministrationDetail.ConcentrationDoseUOMs.forEach( (oStrengthItem) => {
                    if (!String.Equals(oStrengthItem.Code, CConstants.CompositeUOM)) {
                        oStrengthUomItem = new CListItem();
                        oStrengthUomItem.DisplayText = oStrengthItem.Name;
                        oStrengthUomItem.Value = oStrengthItem.OID.ToString();
                        this.objVm.AdministrationDetail.ConcentrationStrengthUOMs.Add(oStrengthUomItem);
                    }
                });
            }
            if (this.objVm != null && this.objVm.AdministrationDetail != null && this.objVm.AdministrationDetail.ConcentrationStrengthUOMs != null && this.objVm.AdministrationDetail.ConcentrationStrengthUOMs.Count > 0) {
                let sorteduoms = this.objVm.AdministrationDetail.ConcentrationStrengthUOMs
                  .OrderBy((item) => item.DisplayText)
                  .Select((item) => item);
                  
                if (sorteduoms != null && sorteduoms.Count() > 0) {
                    var sortedUOMList: ObservableCollection<CListItem> = new ObservableCollection<CListItem>();
                    sorteduoms.forEach(function (item) {
                        sortedUOMList.Add(item);
                    });
                    this.objVm.AdministrationDetail.ConcentrationStrengthUOMs = sortedUOMList;
                }
            }
            if (this.objVm.AdministrationDetail.ConcentrationStrengthUOMs == null)
                this.objVm.AdministrationDetail.ConcentrationStrengthUOMs = new ObservableCollection<CListItem>();
            if ((this.objVm.AdministrationDetail.ConcentrationStrengthUOMs.Count > 0 && !this.objVm.AdministrationDetail.ConcentrationStrengthUOMs.Any(x => x.DisplayText.Contains("More"))) || (this.objVm.AdministrationDetail.ConcentrationStrengthUOMs.Count == 0)) {
                this.objVm.AdministrationDetail.ConcentrationStrengthUOMs.Add(ObjectHelper.CreateObject(new CListItem(), { DisplayText: "More", Value: "CC_More" }));
            }
            if (String.Compare(this.strDoseType, DoseTypeCode.CONDITIONAL) == 0 && !this.objVm.IsConditionalExists) {
                if (this.objVm.AdministrationDetail.ConcentrationStrengthUOMs != null && this.objVm.AdministrationDetail.ConcentrationStrengthUOMs.Count > 0) {
                    this.objVm.AdministrationDetail.DoseUOMs = new ObservableCollection<CListItem>(this.objVm.AdministrationDetail.ConcentrationStrengthUOMs);
                }
                if (objRes.objAdministrationDetail.DoseUOM != null && objRes.objAdministrationDetail.DoseUOM.Contains('~')) {
                    var oDoseUOM: CListItem = ObjectHelper.CreateObject(new CListItem(), {
                        DisplayText: objRes.objAdministrationDetail.DoseUOM.Split('~')[1],
                        Value: objRes.objAdministrationDetail.DoseUOM.Split('~')[0]
                    });
                    if (this.objVm.AdministrationDetail.DoseUOMs != null && this.objVm.AdministrationDetail.DoseUOMs.Count > 0) {
                        for (let i: number = 0; i < this.objVm.AdministrationDetail.DoseUOMs.Count; i++) {
                            if (this.objVm.AdministrationDetail.DoseUOMs[i].Value == oDoseUOM.Value) {
                                this.objVm.AdministrationDetail.DoseUOMOID = this.objVm.AdministrationDetail.DoseUOMs[i].Value;
                                break;
                            }
                        };
                        if (this.objVm.AdministrationDetail.DoseUOMOID == null) {
                            var nIndex: number = this.objVm.AdministrationDetail.DoseUOMs.Count - 1;
                            this.objVm.AdministrationDetail.DoseUOMs.Insert(nIndex, oDoseUOM);
                            this.objVm.AdministrationDetail.DoseUOMOID = oDoseUOM;
                        }
                    }
                }
            }
            if (!String.IsNullOrEmpty(objRes.objAdministrationDetail.ConcentrationStrength))
                this.objVm.AdministrationDetail.ConcentrationStrength = Number.Parse(objRes.objAdministrationDetail.ConcentrationStrength);
            if (objRes.objAdministrationDetail.oUomTypeList != null && objRes.objAdministrationDetail.oUomTypeList.Count > 0) {
                let qryUomTypeList = objRes.objAdministrationDetail.oUomTypeList.Where(
                    (oUOMTypeList) =>
                      String.Compare(
                        oUOMTypeList.UOMTYCode,
                        'volume'
                      ) == 0
                  )
                    .OrderBy((oUOMTypeList) => oUOMTypeList.DisplayText)
                    .Select((oUOMTypeList) => oUOMTypeList);

                qryUomTypeList = qryUomTypeList.Where(x => x.LorenzoID == CConstants.ml);
                this.objVm.AdministrationDetail.ConcentrationVolumeUOMs = new ObservableCollection<CListItem>();
                var oVolumeUomItem: CListItem;
                qryUomTypeList.forEach( (oVolumeItem) => {
                    oVolumeUomItem = new CListItem();
                    oVolumeUomItem.DisplayText = oVolumeItem.Name;
                    oVolumeUomItem.Value = oVolumeItem.UoMOID.ToString();
                    this.objVm.AdministrationDetail.ConcentrationVolumeUOMs.Add(oVolumeUomItem);
                });

                let qryPeriodTypeList = objRes.objAdministrationDetail.oUomTypeList.Where(
                    (oUOMTypeList) =>
                      String.Compare(
                        oUOMTypeList.UOMTYCode,
                        'time'
                      ) == 0
                    ).Select((oUOMTypeList) => oUOMTypeList)
                    .OrderBy(oUOMTypeList => oUOMTypeList.LorenzoID);
                
                qryPeriodTypeList = qryPeriodTypeList.OrderBy(x => x.LorenzoID);
                this.objVm.AdministrationDetail.InfusionPeriodUOMs = new ObservableCollection<CListItem>();
                var oPeriodItem: CListItem;
                qryPeriodTypeList.forEach( (oPrdItem) => {
                    if (!String.IsNullOrEmpty(oPrdItem.Name) && !String.Equals(oPrdItem.LorenzoID, CConstants.second) && !String.Equals(oPrdItem.LorenzoID, CConstants.month) && !String.Equals(oPrdItem.LorenzoID, CConstants.year)) {
                        oPeriodItem = new CListItem();
                        oPeriodItem.DisplayText = oPrdItem.Name;
                        oPeriodItem.Value = oPrdItem.UoMOID.ToString();
                        this.objVm.AdministrationDetail.InfusionPeriodUOMs.Add(oPeriodItem);
                    }
                });
            }
            if (objRes.objAdministrationDetail.ConcentrationStrengthUOM != null && objRes.objAdministrationDetail.ConcentrationStrengthUOM.UOMId > 0) {
                var tmpStrength: CListItem = new CListItem();
                tmpStrength.DisplayText = objRes.objAdministrationDetail.ConcentrationStrengthUOM.UOMName;
                tmpStrength.Value = objRes.objAdministrationDetail.ConcentrationStrengthUOM.UOMId.ToString();
                if (Common.GetSelectedItem(tmpStrength.Value, this.objVm.AdministrationDetail.ConcentrationStrengthUOMs) == null) {
                    if (this.objVm.AdministrationDetail.ConcentrationStrengthUOMs != null && this.objVm.AdministrationDetail.ConcentrationStrengthUOMs.Any(x => x.DisplayText.Contains("More")))
                        this.objVm.AdministrationDetail.ConcentrationStrengthUOMs.Insert(this.objVm.AdministrationDetail.ConcentrationStrengthUOMs.Count - 1, tmpStrength);
                }
                this.objVm.AdministrationDetail.ConcentrationStrengthUOM = Common.GetSelectedItem(tmpStrength.Value, this.objVm.AdministrationDetail.ConcentrationStrengthUOMs);
            }
            if (!String.IsNullOrEmpty(objRes.objAdministrationDetail.ConcentrationVolume))
                this.objVm.AdministrationDetail.ConcentrationVolume = Number.Parse(objRes.objAdministrationDetail.ConcentrationVolume);
            if (objRes.objAdministrationDetail.ConcentrationVolumeUOM != null && objRes.objAdministrationDetail.ConcentrationVolumeUOM.UOMId > 0) {
                var tmpVolume: CListItem = new CListItem();
                tmpVolume.DisplayText = objRes.objAdministrationDetail.ConcentrationVolumeUOM.UOMName;
                tmpVolume.Value = objRes.objAdministrationDetail.ConcentrationVolumeUOM.UOMId.ToString();
                this.objVm.AdministrationDetail.ConcentrationVolumeUOM = tmpVolume;
                this.objVm.AdministrationDetail.ConcentrationVolumeUOM = Common.GetSelectedItem(this.objVm.AdministrationDetail.ConcentrationVolumeUOM.Value, this.objVm.AdministrationDetail.ConcentrationVolumeUOMs);
            }
            if (objRes.objAdministrationDetail.InfusionPeriodforMedAdmin > 0) {
                this.objVm.AdministrationDetail.InfusionPeriodforMedAdmin = objRes.objAdministrationDetail.InfusionPeriodforMedAdmin.ToString();
                if (objRes.objAdministrationDetail.InfusionPeriodUOMforMedAdmin != null && objRes.objAdministrationDetail.InfusionPeriodUOMforMedAdmin.UOMId > 0) {
                    var tmpInfPeriod: CListItem = new CListItem();
                    tmpInfPeriod.DisplayText = objRes.objAdministrationDetail.InfusionPeriodUOMforMedAdmin.UOMName;
                    tmpInfPeriod.Value = objRes.objAdministrationDetail.InfusionPeriodUOMforMedAdmin.UOMId.ToString();
                    this.objVm.AdministrationDetail.InfusionPeriodUOMforMedAdmin = tmpInfPeriod;
                    this.objVm.AdministrationDetail.InfusionPeriodUOMforMedAdmin = Common.GetSelectedItem(this.objVm.AdministrationDetail.InfusionPeriodUOMforMedAdmin.Value, this.objVm.AdministrationDetail.InfusionPeriodUOMs);
                }
                this.cboInfusionperiodUoMValue.IsEnabled = this.Infusionperiodtext.IsEnabled = false;
            }
            this.objVm.AdministrationDetail.canLanchUserAuth = true;
            this.objVm.AdministrationDetail.MedScannedHistoryOID = objRes.objAdministrationDetail.MedScannedHistoryOID;
            if (this.objVm.AdministrationDetail.MedScannedHistoryOID > 0 && !String.IsNullOrEmpty(objRes.objAdministrationDetail.MedicationAction) && (String.Equals(objRes.objAdministrationDetail.MedicationAction, SlotStatus.GIVEN) || String.Equals(objRes.objAdministrationDetail.MedicationAction, SlotStatus.SELFADMINISTERED))) {
                this.objVm.AdministrationDetail.IsMedScanReadonly = true;
                this.GetMedicationScannedDetails();
            }
            if (this.objVmsltDoseDis != null) {
                this.objVmsltDoseDis.IsCustomiseMedScan = objRes.objAdministrationDetail.IsMedScanExcluded;
            }
        }
        this.objVm.AdministrationDetail._IsSFSValueSetFromOnGetSFSItems = false;
        
        if (this.objVm != null && this.objVm.AdministrationDetail != null) {
            if ((String.IsNullOrEmpty(this.objVm.AdministrationDetail.AdministeredByOID) || String.Equals(this.objVm.AdministrationDetail.AdministeredByOID, "0")) && (this.objVm.Status == SlotStatus.GIVEN || (this.iRdbGiven.IsChecked))) {
                this.bGivenParentSelected = true;
            }
            else {
                this.rdbCareProvider.IsChecked = true;
                this.rdbparent.IsChecked = false;
            }
            if (this.objVm.Status == SlotStatus.SELFADMINISTERED || (this.iRdbSelfAdmin.IsChecked)) {
                if (String.IsNullOrEmpty(this.objVm.AdministrationDetail.AdministratorType) || String.Equals(this.objVm.AdministrationDetail.AdministratorType, "Patient")) {
                    this.rdbPatient.IsChecked = true;
                    this.rdbPatient_Checked(null);
                    this.rdbparent.IsChecked = false;
                }
                else {
                    this.bSelfAdminParentSelected = true;
                }
                this.rdbPatient.Visibility = Visibility.Visible;
            }
        }
        
        if (this.sAdminByPersonalCarer != null) {
            if (!this.objVm.AdministrationDetail.IsPersonalCarerNotListed)
                this.objVm.AdministrationDetail.AdminByPersonalCarer = this.sAdminByPersonalCarer;
            this.objVm.AdministrationDetail.AdminByPersonalCarerOID = Convert.ToInt64(this.sAdminByPersonalCarer.Value);
            this.objVm.AdministrationDetail.PersonalCarerRelationship = this.AdminByRelationship;
        }
        if (this.iRdbGiven.IsChecked) {
            this.SetAdministeredTimeValidDateRange(SlotStatus.GIVEN);
        }
        else if (this.iRdbSelfAdmin.IsChecked) {
            this.SetAdministeredTimeValidDateRange(SlotStatus.SELFADMINISTERED);
        }

        if (this.iRdbGiven.IsChecked)
            this.iRdbGiven_Checked(null);
        else if (this.iRdbSelfAdmin.IsChecked)
            this.iRdbSelfAdmin_Checked(null);
        else if (this.iRdbNotGiven.IsChecked)
            this.iRdbNotGiven_Checked(null);
        else if (this.iRdbNotKnown.IsChecked)
            this.iRdbNotKnown_Checked(null);  
        
        if (this.bGivenParentSelected) {
            this.objVm.AdministrationDetail.IsNoWitnessAvialable = false;
            this.rdbCareProvider.IsChecked = false;
            this.rdbparent.IsChecked = true;
            this.rdbparent_Checked(null);
        }
        if (this.bSelfAdminParentSelected) {
            this.objVm.AdministrationDetail.IsNoWitnessAvialable = false;
            this.rdbPatient.IsChecked = false;
            this.rdbparent.IsChecked = true;
            this.rdbparent_Checked(null);
        }

        this.bDontSetAdministeredbyDefValue = false;
    }
    private getAssosiatedDrugSites(): void {
        var objService: IPPMAManagePrescriptionWSSoapClient = new IPPMAManagePrescriptionWSSoapClient();
        objService.GetDrugSitesCompleted = (s,e) => { this.objService_GetDrugSitesCompleted(s,e) };
        var objAllRequest: CReqMsgGetDrugSites = new CReqMsgGetDrugSites();
        objAllRequest.IdentifyingOIdBC = this.objVm.IdentifyingOID;
        objAllRequest.IdentifyingTypeBC = this.objVm.IdentifyingType;
        objAllRequest.MCVersionBC = this.objVm.MCVersionNo;
        objAllRequest.oContextInformation = Common.FillContext();
        objService.GetDrugSitesAsync(objAllRequest);
    }
    objService_GetDrugSitesCompleted(sender: Object, e: GetDrugSitesCompletedEventArgs): void {
        var _ErrorID: number = 80000093;
        var _ErrorSource: string = "LorAppMedicationAdminBBUI_P2.dll, Class:MedsAdminmodifyadministration, Method:objService_GetDrugSitesCompleted()";
        if (e.Error == null) {
            try {
                var objResponse: CResMsgGetDrugSites = e.Result;
                if (objResponse != null && objResponse.objSites != null) {
                    this.objVm.AdministrationDetail.Sites = new ObservableCollection<CListItem>();
                    for (var i: number = 0; i < objResponse.objSites.Count; i++) {
                        if (!String.IsNullOrEmpty(objResponse.objSites[i].SiteName)) {
                            this.objVm.AdministrationDetail.Sites.Add(ObjectHelper.CreateObject(new CListItem(), {
                                DisplayText: objResponse.objSites[i].SiteName,
                                Value: objResponse.objSites[i].SiteId.ToString()
                            }));
                        }
                    }
                    var oMoresite: CListItem = ObjectHelper.CreateObject(new CListItem(), {
                        DisplayText: "More",
                        Value: "0"
                    });
                    this.objVm.AdministrationDetail.Sites.Add(oMoresite);
                }
            }
            catch (ex: any) {
                var lnReturn: number = AMSHelper.PublicExceptionDetails(_ErrorID, _ErrorSource, ex);
            }

        }
        else {
            var lnReturn: number = AMSHelper.PublicExceptionDetails(_ErrorID, _ErrorSource, e.Error);
        }
    }
    cboExpiryDate_OnDateValueChanged(sender: Object, e: DateChangedArgs): void {
        if (e.ModifiedDate < DateTime.Now.Date) {
            this.cboExpiryDate.SetDateValue(DateTime.Now.Date);
        }
    }
    objService_GetPatientPersonalCarerCompleted(sender: Object, e: GetPatientPersonalCarerCompletedEventArgs): void {
        if (e.Error == null) {
            this.objResPersonalCarer = e.Result;
            if (this.objResPersonalCarer != null && this.objResPersonalCarer.oPersonalCarer != null && this.objResPersonalCarer.oPersonalCarer.Count > 0) {
                this.personalCarers = new ObservableCollection<CListItem>();
                this.objResPersonalCarer.oPersonalCarer.forEach( (carer) => {
                    this.conceptCodes.Append(carer.Relationship);
                    this.conceptCodes.Append("~^~");
                });
                if (this.conceptCodes.Length > 0) {
                    if (MedicationCommonConceptCodeData.ViewConceptCodes == null)
                        MedicationCommonConceptCodeData.ViewConceptCodes = new ObservableCollection<CValuesetTerm>();
                    if (this.conceptCodes != null && this.conceptCodes.Length > 0)
                        this.resolvedConceptCodes = new ObservableCollection<CListItem>(MCommonBB.GetResolvedSupplyInstTermText(this.conceptCodes));
                }
            }
        }
        this.getRecordAdministrator();
    }
    private GetWitnessRequired(): void {
        var objService: IPPMAPrescribableDefnWSSoapClient = new IPPMAPrescribableDefnWSSoapClient();
        objService.IsWitnessRequiredCompleted = (s,e) => { this.objService_IsWitnessReqdCompleted(s,e) };
        var objReq: CReqMsgIsWitnessRequired = new CReqMsgIsWitnessRequired();
        objReq.oContextInformation = CommonBB.FillContext();
        objReq.CriteriaBC = new WitnessCriteria();
        objReq.CriteriaBC.PrescriptionItemOid = this.prescriptionOid;
        objReq.CriteriaBC.ServicePoints = new ObservableCollection<PrescribableDefn.ObjectInfo>();
        objReq.CriteriaBC.ServicePoints.Add(ObjectHelper.CreateObject(new PrescribableDefn.ObjectInfo(), { OID: MedChartData.ServiceOID }));
        objReq.CriteriaBC.Drugs = new ObservableCollection<PrescribableDefn.ObjectInfo>();
        objReq.CriteriaBC.Drugs.Add(ObjectHelper.CreateObject(new PrescribableDefn.ObjectInfo(), { Code: this.strLorenzoID }));
        objReq.CriteriaBC.Roles = new ObservableCollection<PrescribableDefn.ObjectInfo>();
        objReq.CriteriaBC.Roles.Add(ObjectHelper.CreateObject(new PrescribableDefn.ObjectInfo(), { OID: Convert.ToInt64(AppContextInfo.JobRoleOID) }));
        objReq.CriteriaBC.Routes = new ObservableCollection<PrescribableDefn.ObjectInfo>();
        objReq.CriteriaBC.Routes.Add(ObjectHelper.CreateObject(new PrescribableDefn.ObjectInfo(), { OID: this.lnRouteOID }));
        if (!String.IsNullOrEmpty(PatientContext.DOB) && Convert.ToDateTime(PatientContext.DOB) <= CommonBB.GetServerDateTime())
            objReq.CriteriaBC.AgeFrom = Convert.ToInt16(PatientContext.PatientAge);
        else objReq.CriteriaBC.AgeFrom = -1;
        objReq.CriteriaBC.IsControlledDrugIncluded = this.bIsControlledDrug;
        objService.IsWitnessRequiredAsync(objReq);
    }
    objService_IsWitnessReqdCompleted(sender: Object, e: IsWitnessRequiredCompletedEventArgs): void {
        if (e.Result != null) {
            var objRes: CResMsgIsWitnessRequired = e.Result;
            if (objRes != null && objRes.owitnessCriteriaresult != null) {
                if (objRes.owitnessCriteriaresult.Flag) {
                    this.bIsWitnessReqd = true;
                }
                else {
                    this.bIsWitnessReqd = false;
                }
                if (objRes.owitnessCriteriaresult.Isnowitnessoverride) {
                    this.chkNoWitness.IsChecked = false;
                    this.chkNoWitness_Unchecked(null);
                    this.chkNoWitness.Visibility = Visibility.Collapsed;
                    this.IsWitnessOverrideAllowed = false;
                }
                else {
                    if (this.sfsWitnessedby.Visibility == Visibility.Visible) {
                        this.chkNoWitness.Visibility = Visibility.Visible;
                    }
                    this.IsWitnessOverrideAllowed = true;
                }
            }
        }
        if (this.objVm == null) {
            this.objVm.AdministrationDetail = new AdministrationDetailVM();
        }
        this.chkNoWitness.IsEnabled = this.bIsWitnessReqd;
        if (this.chkNoWitness.IsChecked == true) {
            this.sfsWitnessedby.IsEnabled = false;
            this.lblWitnessedBy.IsEnabled = false;
            this.lblWitnessedBy.Mandatory = false;
        }
        else {
            this.sfsWitnessedby.IsEnabled = this.bIsWitnessReqd;
            this.lblWitnessedBy.IsEnabled = this.bIsWitnessReqd;
            if (this.bGivenParentSelected) {
                this.chkNoWitness.IsEnabled = false;
                this.objVm.AdministrationDetail.WitnessMandatory = false;
            }
            else {
                this.chkNoWitness.IsEnabled = this.bIsWitnessReqd;
                this.objVm.AdministrationDetail.WitnessMandatory = (this.iRdbSelfAdmin.IsChecked == true) ? false : this.bIsWitnessReqd;
            }
        }
        if (this.rdbparent.IsChecked == true && !this.bGivenParentSelected) {
            this.lblWitnessedBy.Mandatory = false;
            this.chkNoWitness.IsChecked = false;
            this.chkNoWitness_Unchecked(null);
            this.chkNoWitness.IsEnabled = false;
        }
    }
    async sfsAdministeredby_OnSFSOpen(e): Promise<void> {
        var objListItem: ObservableCollection<CListItem> = await this.CPSFSOpen();
        if (objListItem != null && (objListItem).Count > 0) {
            Common.AddSelItemIntoSFSQuickList(this.objVm.AdministrationDetail.AdministeredByList, objListItem[0].Value, objListItem[0].DisplayText.Trim(), "cp", this.sfsAdministeredby);
            this.objVm.AdministrationDetail.AdministeredByList = new ObservableCollection<CListItem>(this.objVm.AdministrationDetail.AdministeredByList.OrderBy(oItem => oItem.DisplayText));
            this.objVm.AdministrationDetail.AdministeredBy = objListItem[0].DisplayText.Trim();
            this.objVm.AdministrationDetail.AdministeredByOID = objListItem[0].Value;
        }
    }
    async CPSFSOpen(): Promise<ObservableCollection<CListItem>> {
        this.oParam = AppContextInfo.OrganisationName;
        var oSelectedItems: ObservableCollection<CListItem> = new ObservableCollection<CListItem>();
        
        var returnValue: ScriptObject = <ScriptObject>(await HtmlPage.Window.InvokeAsync("SFSCareProvider", this.oParam) as ScriptObject);
        if (returnValue != null && returnValue.GetProperty("length") != null) {
            var nSelectCnt: number = Convert.ToInt32(returnValue.GetProperty("length"));
            var selectedValue: ScriptObject = <ScriptObject>(returnValue.GetProperty(0) as ScriptObject);
            var oItem: CListItem = new CListItem();
            oItem.DisplayText = <string>(selectedValue["SurName"] as string);
            if (!String.IsNullOrEmpty(<string>(selectedValue["ForeName"] as string))) {
                oItem.DisplayText += " ";
                oItem.DisplayText += selectedValue["ForeName"];
            }
            oItem.Value = <string>(selectedValue["OId"] as string);
            oSelectedItems.Add(oItem);
        }
        return oSelectedItems;
    }
    async sfsWitnessedby_OnSFSOpen(sender: Object): Promise<void> {
        if (this.sfsWitnessedby.SelectedValue) {
            if (this.sfsWitnessedby.SelectedValue != "0") {
                if (this.sfsWitnessedby.searchText.trim() == "") {
                    this.objVm.AdministrationDetail.WitnessBy = String.Empty;
                    this.objVm.AdministrationDetail.WitnessByOID = String.Empty;
                }
            }
        }
        var objListItem: ObservableCollection<CListItem> = await this.CPSFSOpen();
        if (objListItem != null && objListItem.Count > 0) {
            if (this.objVm.AdministrationDetail.WitnessByList == null)
                this.objVm.AdministrationDetail.WitnessByList = new ObservableCollection<CListItem>();
            Common.AddSelItemIntoSFSQuickList(this.objVm.AdministrationDetail.WitnessByList, objListItem[0].Value, objListItem[0].DisplayText, "cp", this.sfsWitnessedby);
            this.objVm.AdministrationDetail.WitnessByList = new ObservableCollection<CListItem>(this.objVm.AdministrationDetail.WitnessByList.OrderBy(oItem => oItem.DisplayText));
            this.objVm.AdministrationDetail.WitnessBy = objListItem[0].DisplayText;
            this.objVm.AdministrationDetail.WitnessByOID = objListItem[0].Value;
        }
    }
    private sfsWitnessedby_OnGetItems(sender: Object, Result: ObservableCollection<CListItem>): void {
        if (this.objVm != null && this.objVm.AdministrationDetail != null) {
            this.objVm.AdministrationDetail.WitnessByList = Result;
        }
        if (this.objVm != null && this.objVm.AdministrationDetail != null && !String.IsNullOrEmpty(this.objVm.AdministrationDetail.WitnessByOID) && String.Compare(this.objVm.AdministrationDetail.WitnessByOID, "0") != 0) {
            this.objVm.AdministrationDetail._IsSFSValueSetFromOnGetSFSItems = true;
            if (this.objVm.AdministrationDetail.WitnessByList == null)
                this.objVm.AdministrationDetail.WitnessByList = new ObservableCollection<CListItem>();
            var sWitnessedOID: string = this.objVm.AdministrationDetail.WitnessByOID.ToString();
            var _IsExist: boolean = this.objVm.AdministrationDetail.WitnessByList.Any(x => x.Value == sWitnessedOID);
            if (!_IsExist) {
                var oItem: CListItem = new CListItem();
                oItem.DisplayText = this.objVm.AdministrationDetail.WitnessBy;
                oItem.Value = this.objVm.AdministrationDetail.WitnessByOID.ToString();
                this.objVm.AdministrationDetail.WitnessByList.Add(oItem);
            }
            var sTemp: string = this.objVm.AdministrationDetail.WitnessByOID.ToString();
            this.sfsWitnessedby.SelectedValue = String.Empty;
            this.sfsWitnessedby.SetSelectedItem(ObjectHelper.CreateObject(new CListItem(), { Value: sTemp }));
            this.objVm.AdministrationDetail._IsSFSValueSetFromOnGetSFSItems = false;
        }
    }
    private sfsAdministeredby_OnGetItems(sender: Object, Result: ObservableCollection<CListItem>): void {
        this.objVm.AdministrationDetail.AdministeredByList = Result;
        if (this.objVm != null && this.objVm.AdministrationDetail != null && !String.IsNullOrEmpty(this.objVm.AdministrationDetail.AdministeredByOID)) {
            this.objVm.AdministrationDetail._IsSFSValueSetFromOnGetSFSItems = true;
            if (this.objVm.AdministrationDetail.AdministeredByList == null)
                this.objVm.AdministrationDetail.AdministeredByList = new ObservableCollection<CListItem>();
            if (MedChartData.AllowAnyUserForAdministration) {
                var _IsExist: boolean = this.objVm.AdministrationDetail.AdministeredByList.Any(x => x.Value == this.objVm.AdministrationDetail.AdministeredByOID);
                if (!_IsExist) {
                    var oItem: CListItem = new CListItem();
                    oItem.DisplayText = this.objVm.AdministrationDetail.AdministeredBy;
                    oItem.Value = this.objVm.AdministrationDetail.AdministeredByOID;
                    this.objVm.AdministrationDetail.AdministeredByList.Add(oItem);
                }
                var sTemp: string = this.objVm.AdministrationDetail.AdministeredByOID;
                this.sfsAdministeredby.SelectedValue = String.Empty;
                this.sfsAdministeredby.SetSelectedItem(ObjectHelper.CreateObject(new CListItem(), { Value: sTemp }));
            }
            else {
                var _IsExist: boolean = this.objVm.AdministrationDetail.AdministeredByList.Any(x => x.Value == AppContextInfo.UserOID);
                if (!_IsExist) {
                    var oItem: CListItem = new CListItem();
                    oItem.DisplayText = this.strUserName != null ? this.strUserName : String.Empty;
                    oItem.Value = AppContextInfo.UserOID;
                    this.objVm.AdministrationDetail.AdministeredByList.Add(oItem);
                }
                var sTemp: string = AppContextInfo.UserOID;
                this.sfsAdministeredby.SelectedValue = String.Empty;
                this.sfsAdministeredby.SetSelectedItem(ObjectHelper.CreateObject(new CListItem(), { Value: sTemp }));
            }
            this.objVm.AdministrationDetail._IsSFSValueSetFromOnGetSFSItems = false;
        }
    }
    private ValidateUser(_SelectedUserType: SelectedUserType): void {
        var _MsgResxKey: string;
        if (_SelectedUserType == SelectedUserType.WitnessingUser) {
            _MsgResxKey = "WitnessAdminBy_Message";
        }
        else {
            _MsgResxKey = "AdminByWitness_Message";
        }
        if (this.objWitnessHelper == null) {
            this.objWitnessHelper = new WitnessHelper();
        }

        if (this.iRdbGiven.IsChecked && this.rdbparent.IsChecked)
            this.objVm.AdministrationDetail.AdministeredByOID = "0";
        else if (this.iRdbSelfAdmin.IsChecked)
            this.objVm.AdministrationDetail.AdministeredByOID = "0";

        this.objWitnessHelper.AuthenticateUser(Convert.ToInt64((String.IsNullOrEmpty(this.objVm.AdministrationDetail.AdministeredByOID) ? "0" : this.objVm.AdministrationDetail.AdministeredByOID)),
            Convert.ToInt64((String.IsNullOrEmpty(this.objVm.AdministrationDetail.WitnessByOID) ? "0" : this.objVm.AdministrationDetail.WitnessByOID)), this.objVm.AdministrationDetail.WitnessBy,
            _SelectedUserType, (s,e) => { this.OnUserAuthCompleted(s,e) }, _MsgResxKey);
    }
    public OnUserAuthCompleted(oAuthResult: AuthResult, _SelectedUserType: SelectedUserType): void {
        if (_SelectedUserType == SelectedUserType.WitnessingUser && (oAuthResult == AuthResult.FailedSinceSameUser || oAuthResult == AuthResult.Cancelled)) {
            this.sfsWitnessedby.ClearAll();
            this.objVm.AdministrationDetail.WitnessByOID = String.Empty;
            this.objVm.AdministrationDetail.WitnessBy = String.Empty;
            this.sfsWitnessedby.SelectedText = String.Empty;
            this.sfsWitnessedby.SelectedValue = String.Empty;
            this.sfsWitnessedby.Focus();
        }
        else if (_SelectedUserType == SelectedUserType.AdministeringUser && oAuthResult == AuthResult.FailedSinceSameUser) {
            this.sfsAdministeredby.ClearAll();
            this.objVm.AdministrationDetail.AdministeredByOID = String.Empty;
            this.objVm.AdministrationDetail.AdministeredBy = String.Empty;
            this.sfsAdministeredby.SelectedText = String.Empty;
            this.sfsAdministeredby.SelectedValue = String.Empty;
            this.sfsAdministeredby.Focus();
        }
    }
    GetCliniicalIncidentFormConfig(): void {
        if (ProfileData.ClinicalIncidentConfig != null && ProfileData.ClinicalIncidentConfig.isModifyAdministration) {
            this.lblcliniIncFrm.Visibility = Visibility.Visible;
            this.lblcliniIncFrmValue.Visibility = Visibility.Visible;
            if (this.objVm.AdministrationDetail == null) {
                this.objVm.AdministrationDetail = new AdministrationDetailVM();
            }
            this.objVm.AdministrationDetail.ClinicalIncidentForm = ProfileData.ClinicalIncidentConfig.LinkTextToDisplay;
        }
        this.objVm.GetDomainCombo();
        this.GetWitnessRequired();
    }
    private lblCIFValue_MouseLeftButtonUp(sender: Object): void {
        if (ProfileData.ClinicalIncidentConfig != null && !String.IsNullOrEmpty(ProfileData.ClinicalIncidentConfig.Address) && Common.ValidateURL(ProfileData.ClinicalIncidentConfig.Address)) {
            HtmlPage.Window.Invoke("LaunchClinicalIncidentForm", ProfileData.ClinicalIncidentConfig.Address);
        }
    }
    cboResNotGiven_SelectionChanged(e): void {
        if (this.cboResNotGiven.GetValue() == "CC_CLNCLRSN")
            this.lblComments.Mandatory = true;
        else this.lblComments.Mandatory = false;
    }
    cboParentCarer_SelectionChanged(e): void {
        if (this.cboParentCarer.SelectedValue == null || String.Equals(this.cboParentCarer.SelectedItem.DisplayText, MedsAdminModifyAdministration.sParentCarer) || String.Equals(this.cboParentCarer.SelectedItem.DisplayText, MedsAdminModifyAdministration.sPatinet))
            this.objVm.AdministrationDetail.PersonalCarerRelationship = String.Empty;
        else {
            var relationCode: string = String.Empty;
            if (this.objVm.AdministrationDetail.AdminByPersonalCarer.Tag != null) {
                relationCode = this.objVm.AdministrationDetail.AdminByPersonalCarer.Tag.ToString();
            }
            if (!String.IsNullOrEmpty(relationCode)) {
                if (this.resolvedConceptCodes != null && this.resolvedConceptCodes.Count > 0) {
                    this.objVm.AdministrationDetail.PersonalCarerRelationship = this.resolvedConceptCodes.Where(c => c.Value == relationCode).Select(s => s.DisplayText).FirstOrDefault().ToString();
                }
            }
            else this.objVm.AdministrationDetail.PersonalCarerRelationship = String.Empty;
        }
    }
    SetAdministeredbySFS(): void {
        if (this.objVm != null && this.objVm.AdministrationDetail != null) {
            var oSelectedItems: ObservableCollection<CListItem> = new ObservableCollection<CListItem>();
            var oItem: CListItem = new CListItem();
            oItem.DisplayText = this.strUserName;
            oItem.Value = AppContextInfo.UserOID;
            oSelectedItems.Add(oItem);
            var lstItems: List<SLSFSItem> = new List<SLSFSItem>();
            lstItems.Add(ObjectHelper.CreateObject(new SLSFSItem(), { DisplayText: this.strUserName, DisplayValue: AppContextInfo.UserOID, Sfskey: AppContextInfo.UserOID, Sfstype: "cp" }));
            if (this.sfsAdministeredby.ItemsSource == null) 
                this.sfsAdministeredby.ItemsSource = new ObservableCollection<CListItem>();
            this.sfsAdministeredby.AddSFSItems(lstItems);
            this.objVm.AdministrationDetail.AdministeredByList = oSelectedItems;
            if (!this.bDontSetAdministeredbyDefValue) {
                this.objVm.AdministrationDetail.AdministeredBy = oSelectedItems[0].DisplayText;
                this.objVm.AdministrationDetail.AdministeredByOID = oSelectedItems[0].Value;
            }
            this.bDontSetAdministeredbyDefValue = false;
            this.sfsAdministeredby.GetSFSItems("cp");
        }
    }
    SetAdministeredbyValue(): void {
        if (this.iRdbGiven.IsChecked) {
            this.sfsAdministeredby.IsEnabled = MedChartData.AllowAnyUserForAdministration;
            if (this.rdbCareProvider.IsChecked) {
                this.SetAdministeredbySFS();
            }
        }
    }
    txtDose_KeyDown(e): void {
    }
    bIsCondViewOpen: boolean = false;
    SteppedImg_Click(e): void {
        if (String.Compare(this.strDoseType, DoseTypeCode.CONDITIONAL) == 0 && !this.bIsCondViewOpen) {
            if (this.ConditionalVM == null) {
                this.ConditionalVM = ObjectHelper.CreateObject(new ConditionalDoseVM(RequestSource.RecordAdmin, this.prescriptionOid, true), { DrugName: this.sDrugName });
                if (this.objVm.AdministrationDetail.DoseDiscReasonCode != null && !String.IsNullOrEmpty(this.objVm.AdministrationDetail.DoseDiscReasonCode.Value)) {
                    this.ConditionalVM.IsOtherDose = true;
                    this.ConditionalVM.OtherDoseUoM = this.objVm.AdministrationDetail.strDoseUOM;
                    this.ConditionalVM.OtherDoseValue = this.objVm.AdministrationDetail.Dose;
                    this.ConditionalVM.OtherDoseUoMOID = this.objVm.AdministrationDetail.lnDoseUOMOID;
                    this.ConditionalVM.SelectedDoseDiscrepancy = new CListItem();
                    this.ConditionalVM.SelectedDoseDiscrepancy.Value = this.objVm.AdministrationDetail.DoseDiscReasonCode.Value;
                }
            }
            else {
                this.ConditionalVM.CloneConditionalDose();
            }
            this.bIsCondViewOpen = true;
            this.ConditionalChildView = new ConditionalDoseChildView();
            this.ConditionalChildView.conditionalDoseRegimeView1.bIsPRN = this.bIsPRN;
            this.ConditionalChildView.conditionalDoseRegimeView1.IdentifyingOID = this.IdentifyingOID;
            this.ConditionalChildView.conditionalDoseRegimeView1.IdentifyingType = this.IdentifyingType;
            this.ConditionalChildView.conditionalDoseRegimeView1.PrescriptionItemOID = this.prescriptionOid;
            this.ConditionalChildView.conditionalDoseRegimeView1.MCVersionNo = this.MCVersion;
            this.ConditionalChildView.conditionalDoseRegimeView1.sObsDrugName = !String.IsNullOrEmpty(this.sObsDrugName) ? this.sObsDrugName : this.sDrugName;
            this.ConditionalChildView.conditionalDoseRegimeView1.sitemsubtype = this.sItemSubType;
            this.ConditionalChildView.conditionalDoseRegimeView1.mcitemname = this.sMCitemname;
            this.ConditionalChildView.conditionalDoseRegimeView1.slorenzoid = this.slorenzoid;
            this.ConditionalChildView.DataContext = this.ConditionalVM;
            this.ConditionalChildView.onDialogClose = this.ConditionalChildView_Closed;
            AppActivity.OpenWindow("Select dose", this.ConditionalChildView, (s,e) => { this.ConditionalChildView_Closed(s) }, this.sDrugName, false, 510, 400, true, WindowButtonType.OkCancel, null);
        }
    }
    ConditionalChildView_Closed(args: AppDialogEventargs): void {
        this.bIsCondViewOpen = false;
        var bdialogResult: boolean = false;
        if (args.Result == AppDialogResult.Ok) {
            if (this.ConditionalChildView != null) {
                bdialogResult = this.ConditionalChildView.OKButtonClick();
                if (bdialogResult) {
                    var ConditionalVM: ConditionalDoseVM = <ConditionalDoseVM>(this.ConditionalChildView.DataContext as ConditionalDoseVM);
                    this.FillSelectedConditionalDose(ConditionalVM);
                    this.ConditionalChildView.appDialog.DialogResult = bdialogResult;
                }
            }
        }
        else if (args.Result == AppDialogResult.Cancel) {
            this.ConditionalChildView.CancelButtonClick();
            this.ConditionalChildView.appDialog.DialogResult = true;
        }
    }
    ConditionalView_Close(args: AppDialogEventargs): void {
        if (args.Result == AppDialogResult.Cancel) {
            args.AppChildWindow.DialogResult = false;
        }
        else if (args.Result == AppDialogResult.Ok) {
            var ConditionalView: ConditionalDoseRegimeView = <ConditionalDoseRegimeView>(args.Content as ConditionalDoseRegimeView);
            var ConditionalVM: ConditionalDoseVM = <ConditionalDoseVM>(ConditionalView.DataContext as ConditionalDoseVM);
            if (ConditionalVM.Validate()) {
                this.FillSelectedConditionalDose(ConditionalVM);
                args.AppChildWindow.DialogResult = true;
            }
        }
    }
    private FillSelectedConditionalDose(ConditionalVM: ConditionalDoseVM): void {
        if (ConditionalVM == null)
            return
        if (ConditionalVM.IsOtherDose) {
            if (!(this.iRdbGiven.IsChecked || this.iRdbSelfAdmin.IsChecked))
                this.iRdbGiven.IsChecked = true;
            this.objVm.AdministrationDetail.Dose = ConditionalVM.OtherDoseValue;
            this.objVm.AdministrationDetail.strDoseUOM = ConditionalVM.OtherDoseUoM;
            this.objVm.AdministrationDetail.DoseDiscReasonCode = ConditionalVM.SelectedDoseDiscrepancy;
            this.objVm.AdministrationDetail.lnDoseUOMOID = ConditionalVM.OtherDoseUoMOID;
        }
        else if (ConditionalVM.SelectedConditionalDose != null) {
            if (!String.IsNullOrEmpty(ConditionalVM.SelectedConditionalDose.Dose)) {
                if (!(this.iRdbGiven.IsChecked || this.iRdbSelfAdmin.IsChecked))
                    this.iRdbGiven.IsChecked = true;
                if (String.IsNullOrEmpty(ConditionalVM.SelectedConditionalDose.UpperDose)) {
                    this.objVm.AdministrationDetail.Dose = ConditionalVM.SelectedConditionalDose.Dose;
                    this.objVm.IsDoseEnabled = false;
                }
                else {
                    this.objVm.AdministrationDetail.Dose = String.Empty;
                    this.objVm.IsDoseEnabled = true;
                }
                this.objVm.AdministrationDetail.strDoseUOM = ConditionalVM.SelectedConditionalDose.DoseUoM;
                this.objVm.AdministrationDetail.lnDoseUOMOID = ConditionalVM.SelectedConditionalDose.DoseUoMOID;
                if (!String.IsNullOrEmpty(ConditionalVM.SelectedConditionalDose.Instruction))
                    this.objVm.AdministrationDetail.AdminComments = ConditionalVM.SelectedConditionalDose.Instruction;
            }
            else {
                this.iRdbNotGiven.IsChecked = true;
                this.objVm.AdministrationDetail.Dose = String.Empty;
                this.objVm.AdministrationDetail.strDoseUOM = String.Empty;
                this.objVm.AdministrationDetail.lnDoseUOMOID = 0;
                this.objVm.AdministrationDetail.AdminComments = ConditionalVM.SelectedConditionalDose.Instruction;
            }
            this.objVm.AdministrationDetail.DoseDiscReasonCode = null;
        }
    }
    txtDose_KeyUp(e): void {
        if (this.objVm != null && this.objVm.AdministrationDetail != null) {
            this.objVm.AdministrationDetail.IsAdminDoseChanged = true;
        }
    }
    sfsWitnessedby_KeyUp(e): void {
        if (this.objVm != null)
            this.objVm.PasswordSuccess = false;
    }
    cboResFordefer_SelectionChanged(e): void {
        if (this.cboResFordefer.GetValue() == "CC_CLNCLRSN")
            this.lblComments.Mandatory = true;
        else this.lblComments.Mandatory = false;
    }
    cboAmendReason_SelectionChanged(e): void {
        if (this.cboAmendReason.GetValue() == "CC_CLNCLRSN")
            this.lblComments.Mandatory = true;
        else this.lblComments.Mandatory = false;
    }
    cmdLinks_Click(e): void {
        var MonographParams: ObservableCollection<CListItem> = new ObservableCollection<CListItem>();
        if (this.IdentifyingOID > 0 && !String.IsNullOrEmpty(this.IdentifyingType) && !String.IsNullOrEmpty(this.sObsDrugName)) {
            var MonographParamDet: CListItem = new CListItem();
            MonographParamDet.DisplayText = this.sObsDrugName;
            MonographParamDet.Value = Convert.ToString(this.IdentifyingOID);
            MonographParamDet.Tag = this.IdentifyingType;
            MonographParamDet.Level = !String.IsNullOrEmpty(this.MCVersion) ? Convert.ToInt32(this.MCVersion) : 0;
            MonographParams.Add(MonographParamDet);
        }
        MedicationCommonBB.OnMonographLinkClick(MonographParams);
    }
    private ShowPatientParertCareControls(): void {
        this.stpCareProvider.Visibility = Visibility.Visible;
        this.rdbCareProvider.Visibility = Visibility.Collapsed;
        this.rdbparent.Visibility = Visibility.Visible;
        this.rdbPatient.Visibility = Visibility.Visible;
        this.rdbPatient.IsChecked = true;
        this.sfsAdministeredby.Visibility = Visibility.Collapsed;
        this.lblAdministeredby.IsEnabled = false;
        this.lblAdministeredby.Mandatory = false;
        this.chkNoParentCarerListed.Visibility = Visibility.Collapsed;
        this.chkNoParentCarerListed.IsChecked = false;
        this.lblNoParentCarerListed.Visibility = Visibility.Collapsed;
        this.cboParentCarer.Visibility = Visibility.Visible;
        this.cboParentCarer.IsEnabled = false;
        this.SetParentCarerComboText(MedsAdminModifyAdministration.sPatinet);
        this.lblRelation.Visibility = Visibility.Collapsed;
        this.lblRelationSelected.Visibility = Visibility.Collapsed;
        this.sfsAdministeredby.SelectedText = String.Empty;
        this.sfsAdministeredby.SelectedValue = String.Empty;
    }
    private HidePatientParertCareControls(): void {
        if(this.iRdbGiven.IsChecked && this.iRdbGiven.IsChecked && this.rdbparent.IsChecked && this.rdbparent.IsChecked) {
            this.ShowParentCarerControls();
        }
        else {
            if (this.iRdbGiven.IsChecked && this.rdbCareProvider.IsChecked) {
                this.lblAdministeredby.IsEnabled = true;  
                this.lblAdministeredby.Mandatory = true;
                this.sfsAdministeredby.IsEnabled = MedChartData.AllowAnyUserForAdministration;
                this.sfsAdministeredby.Visibility = Visibility.Visible;
            }
            else {
                this.lblAdministeredby.Mandatory = false;
                this.sfsAdministeredby.IsEnabled = false;
                this.sfsAdministeredby.Visibility = Visibility.Collapsed;
            }
            this.rdbPatient.Visibility = Visibility.Collapsed;
            this.chkNoParentCarerListed.Visibility = Visibility.Collapsed;
            this.chkNoParentCarerListed.IsChecked = false;
            this.lblNoParentCarerListed.Visibility = Visibility.Collapsed;
            this.cboParentCarer.Visibility = Visibility.Collapsed;
            this.SetParentCarerComboText(String.Empty);
            this.lblRelation.Visibility = Visibility.Collapsed;
            this.lblRelationSelected.Visibility = Visibility.Collapsed;
        }
    }
    private ShowParentCarerControls(): void {
        this.sfsAdministeredby.Visibility = Visibility.Collapsed;
        if (this.personalCarers != null && this.personalCarers.Count > 0) {
            this.lblAdministeredby.IsEnabled = true;
            this.lblAdministeredby.Mandatory = true;
        }
        else {
            this.lblAdministeredby.IsEnabled = false;
            this.lblAdministeredby.Mandatory = false;
        }
        this.rdbCareProvider.Visibility = Visibility.Visible;
        this.rdbPatient.Visibility = Visibility.Collapsed;
        this.stpCareProvider.Visibility = Visibility.Visible;
        this.rdbparent.Visibility = Visibility.Visible;
        this.chkNoParentCarerListed.Visibility = Visibility.Visible;
        this.lblNoParentCarerListed.Visibility = Visibility.Visible;
        this.cboParentCarer.Visibility = Visibility.Visible;
        this.cboParentCarer.IsEnabled = true;
        this.lblRelation.Visibility = Visibility.Visible;
        this.lblRelationSelected.Visibility = Visibility.Visible;
        this.SetParentCarerComboText(String.Empty);
    }
    private ShowParentDropdown(): void {
        this.sfsAdministeredby.Visibility = Visibility.Collapsed;
        this.sfsAdministeredby.SelectedValue = String.Empty;
        this.sfsAdministeredby.SelectedText = String.Empty;
        this.chkNoParentCarerListed.Visibility = Visibility.Visible;
        this.lblNoParentCarerListed.Visibility = Visibility.Visible;
        this.cboParentCarer.Visibility = Visibility.Visible;
        if (this.objVm != null && this.objVm.AdministrationDetail != null) {
            if (this.personalCarers != null && this.personalCarers.Count == 1) {
                if (!this.objVm.AdministrationDetail.IsPersonalCarerNotListed) {
                    this.objVm.AdministrationDetail.AdminByPersonalCarer = this.personalCarers[0];
                    this.objVm.AdministrationDetail.AdminByPersonalCarerOID = !String.IsNullOrEmpty(this.personalCarers[0].Value) ? Convert.ToInt64(this.personalCarers[0].Value) : 0;
                    this.SetParentCarerComboText(this.personalCarers[0].DisplayText);
                }
                else {
                    this.lblAdministeredby.IsEnabled = false;
                    this.lblAdministeredby.Mandatory = false;
                    this.cboParentCarer.IsEnabled = false;
                    this.SetParentCarerComboText(MedsAdminModifyAdministration.sParentCarer);
                    this.objVm.AdministrationDetail.PersonalCarerRelationship = String.Empty;
                }
            }
            else {
                this.SetParentCarerComboText(String.Empty);
                this.objVm.AdministrationDetail.PersonalCarerRelationship = String.Empty;
            }
            if (this.personalCarers != null && this.personalCarers.Count > 0 && !String.IsNullOrEmpty(this.AdminByTypeRecorded) && String.Equals(this.AdminByTypeRecorded, "PersonalCarer") && String.IsNullOrEmpty(this.AdminByPersonalCarerRecorded)) {
                this.objVm.AdministrationDetail.AdminByPersonalCarer = null;
                this.AdminByTypeRecorded = String.Empty;
                this.SetParentCarerComboText(MedsAdminModifyAdministration.sParentCarer);
                this.objVm.AdministrationDetail.PersonalCarerRelationship = String.Empty;
            }
        }
        else {
            this.SetParentCarerComboText(String.Empty);
            this.lblRelationSelected.Text = String.Empty;
        }
        this.cboParentCarer.IsEnabled = true;
        this.lblRelation.Visibility = Visibility.Visible;
        this.lblRelationSelected.Visibility = Visibility.Visible;
        if (this.personalCarers != null && this.personalCarers.Count > 0) {
            this.chkNoParentCarerListed.IsEnabled = true;
            if (this.objVm != null && this.objVm.AdministrationDetail != null && !this.objVm.AdministrationDetail.IsPersonalCarerNotListed) {
                this.lblAdministeredby.IsEnabled = true;
                this.lblAdministeredby.Mandatory = true;
                this.cboParentCarer.IsEnabled = true;
            }
            else {
                this.lblAdministeredby.IsEnabled = false;
                this.lblAdministeredby.Mandatory = false;
                this.cboParentCarer.IsEnabled = false;
                this.SetParentCarerComboText(MedsAdminModifyAdministration.sParentCarer);
                if (this.objVm != null && this.objVm.AdministrationDetail != null) {
                    this.objVm.AdministrationDetail.PersonalCarerRelationship = String.Empty;
                }
            }
        }
        else {
            this.SetParentCarerComboText(MedsAdminModifyAdministration.sParentCarer);
            this.cboParentCarer.IsEnabled = false;
            this.sfsAdministeredby.IsEnabled = false;
            this.lblAdministeredby.IsEnabled = false;
            this.lblAdministeredby.Mandatory = false;
            this.chkNoParentCarerListed.IsEnabled = false;
        }
    }
    private ShowPatientControls(): void {
        this.stpCareProvider.Visibility = Visibility.Visible;
        this.rdbCareProvider.Visibility = Visibility.Collapsed;
        this.rdbparent.Visibility = Visibility.Visible;
        this.rdbPatient.Visibility = Visibility.Visible;
        this.cboParentCarer.Visibility = Visibility.Visible;
        this.cboParentCarer.IsEnabled = false;
        this.sfsAdministeredby.Visibility = Visibility.Collapsed;
        this.sfsAdministeredby.SelectedValue = String.Empty;
        this.sfsAdministeredby.SelectedText = String.Empty;
        this.lblAdministeredby.Mandatory = false;
        this.SetParentCarerComboText(MedsAdminModifyAdministration.sPatinet);
        this.cboParentCarer.IsEnabled = false;
        this.chkNoParentCarerListed.Visibility = Visibility.Collapsed;
        this.chkNoParentCarerListed.IsChecked = false;
        this.lblNoParentCarerListed.Visibility = Visibility.Collapsed;
        this.lblRelation.Visibility = Visibility.Collapsed;
        this.lblRelationSelected.Visibility = Visibility.Collapsed;
    }
    private chkNoParentCarerlisted_Checked(): void {
        this.SetParentCarerComboText(MedsAdminModifyAdministration.sParentCarer);
        this.cboParentCarer.IsEnabled = false;
        this.sfsAdministeredby.IsEnabled = false;
        this.lblAdministeredby.IsEnabled = false;
        this.lblAdministeredby.Mandatory = false;
        if (this.objVm != null && this.objVm.AdministrationDetail != null) {
            this.objVm.AdministrationDetail.PersonalCarerRelationship = String.Empty;
        }
        this.RefreshDivElements();
    }
    private chkNoParentCarerlisted_Unchecked(): void {
        this.sfsAdministeredby.IsEnabled = MedChartData.AllowAnyUserForAdministration;
        this.cboParentCarer.IsEnabled = true;
        this.lblAdministeredby.IsEnabled = true;
        this.lblAdministeredby.Mandatory = true;
        if (this.objVm != null && this.objVm.AdministrationDetail != null) {
            if (this.personalCarers != null && this.personalCarers.Count == 1) {
                this.objVm.AdministrationDetail.AdminByPersonalCarer = this.personalCarers[0];
                this.objVm.AdministrationDetail.AdminByPersonalCarerOID = !String.IsNullOrEmpty(this.personalCarers[0].Value) ? Convert.ToInt64(this.personalCarers[0].Value) : 0;
                this.SetParentCarerComboText(this.personalCarers[0].DisplayText);
                this.cboParentCarer_SelectionChanged(null);
            }
            else {
                this.objVm.AdministrationDetail.PersonalCarerRelationship = String.Empty;
                this.SetParentCarerComboText(String.Empty);
            }
        }
        else {
            this.SetParentCarerComboText(String.Empty);
            this.lblRelationSelected.Text = String.Empty;
        }
        this.RefreshDivElements();
    }
    cmdScanRecMedication_Click(e): void {
        this.LaunchScanRecordMedication();
    }
    public LaunchScanRecordMedication(): void {
        if (!this.CheckMandatoryBeforeScan()) {
            Busyindicator.SetStatusBusy("ScanRecordMed");
            if (this.oMedScanRecAdmVM == null) {
                this.oMedScanRecAdmVM = new MedScanRecAdmVM();
            }
            this.oMedScanRecordAdministration = new MedScanRecordAdministration();
            this.oMedScanRecordAdministration.OnCloseMedScanMezEvent = (s,e) => { this.oMedScanRecordAdministration_OnCloseMedScanMezEvent() };
            this.SetVMProperties(this.objVm);
            //this.oMedScanRecAdmVM.OldProductDetailsInfo = ManageBarcodeHelper.DeepCopy<ObservableCollection<ProductDetailsGrid>>(this.oMedScanRecAdmVM.oProductDetailsInfo);
            this.oMedScanRecAdmVM.OldProductDetailsInfo = this.CopyProductDetailsInfo(this.oMedScanRecAdmVM.oProductDetailsInfo);
            this.oMedScanRecordAdministration.oMedScanRecAdmVM = this.oMedScanRecAdmVM;
            if (this.objVm != null && this.objVm.AdministrationDetail != null && this.objVm.AdministrationDetail.IsMedScanReadonly) {
                AppActivity.OpenWindow(Resource.MedScanRecAdmin.Mez_Title, this.oMedScanRecordAdministration, (s,e) => { this.oMedScannedadministration_Closed(s) }, Resource.MedScanRecAdmin.Mez_Title, false, 470, 1100, false, WindowButtonType.Ok, null);
            }
            else {
                AppActivity.OpenWindow(Resource.MedScanRecAdmin.Mez_Title, this.oMedScanRecordAdministration, (s,e) => { this.oMedScanRecordAdministration_Closed(s) }, Resource.MedScanRecAdmin.Mez_Title, false, 470, 1100, false, WindowButtonType.OkCancel, null);
            }
        }
    }
    public GetMedicationScannedDetails(): void {
        var oServiceProxy: MedicationAdministrationWSSoapClient = new MedicationAdministrationWSSoapClient();
        oServiceProxy.GetMedicationScanDetailsCompleted = (s,e) => { this.objMedicationAdministrationProxy_GetMedicationScanDetailsCompleted(s,e) };
        var oReq: CReqMsgGetMedicationScanDetails = new CReqMsgGetMedicationScanDetails();
        oReq.oContextInformation = CommonBB.FillContext();
        oReq.oMedicationScanDetailsRequestBC = new MedicationScanDetailsRequest();
        oReq.oMedicationScanDetailsRequestBC.MedAdminOID = this.objVm.AdministrationDetail.MedAdminOID;
        oReq.oMedicationScanDetailsRequestBC.MedAdminHistoryOID = this.objVm.AdministrationDetail.MedScannedHistoryOID;
        oReq.oMedicationScanDetailsRequestBC.MCVersion = this.objVm.MCVersionNo;
        oReq.oMedicationScanDetailsRequestBC.MedAdminInfusionOID = 0;
        oServiceProxy.GetMedicationScanDetailsAsync(oReq);
    }
    public objMedicationAdministrationProxy_GetMedicationScanDetailsCompleted(sender: Object, e: GetMedicationScanDetailsCompletedEventArgs): void {
        if (e.Error == null) {
            var oRes: CResMsgGetMedicationScanDetails = e.Result;
            if (oRes != null && oRes.oMedicationScanDetailsResponse != null && oRes.oMedicationScanDetailsResponse.Count > 0) {
                this.oMedScanRecAdmVM = new MedScanRecAdmVM();
                this.oMedScanRecAdmVM.oProductDetailsInfo = new ObservableCollection<ProductDetailsGrid>();
                oRes.oMedicationScanDetailsResponse.forEach( (objRes) => {
                    var objgrddata: ProductDetailsGrid = new ProductDetailsGrid();
                    objgrddata.Productscanned = !String.IsNullOrEmpty(objRes.ScanProductName) ? objRes.ScanProductName : String.Empty;
                    objgrddata.Productcode = !String.IsNullOrEmpty(objRes.ProductCode) ? objRes.ProductCode : String.Empty;
                    objgrddata.Expirydate = (objRes.ExpiryDTTM != null) ? objRes.ExpiryDTTM : DateTime.MinValue;
                    objgrddata.Batchnumber = !String.IsNullOrEmpty(objRes.BatchNumber) ? objRes.BatchNumber : String.Empty;
                    objgrddata.Serialnumber = !String.IsNullOrEmpty(objRes.Serialnumber) ? objRes.Serialnumber : String.Empty;
                    objgrddata.ScanProductLZOID = !String.IsNullOrEmpty(objRes.ScanProductLZOID) ? objRes.ScanProductLZOID : String.Empty;
                    objgrddata.Comments = !String.IsNullOrEmpty(objRes.Comments) ? objRes.Comments : String.Empty;
                    this.oMedScanRecAdmVM.oProductDetailsInfo.Add(objgrddata);
                    this.oMedScanRecAdmVM.IsProductScanned = objRes.IsProductScanned;
                });
                if (this.oMedScanRecAdmVM.oProductDetailsInfo.Count > 0) {
                    this.oMedScanRecAdmVM.IsMedicationReadOnly = true;
                    this.objVm.AdministrationDetail.IsBatchenabled = false;
                    this.objVm.AdministrationDetail.IsExpiryenabled = false;
                }
            }
        }
    }
    oMedScannedadministration_Closed(args: AppDialogEventargs): void {
        Busyindicator.SetStatusIdle("ScanRecordMed");
        if (args.Result == AppDialogResult.Ok || args.Result == AppDialogResult.Cancel) {
            this.oMedScanRecordAdministration.appDialog.DialogResult = false;
        }
    }
    private SetVMProperties(objslotVM: SlotDetailVM): void {
        this.oMedScanRecAdmVM.oDrugHeader = (this.objDrugHeader != null && this.objDrugHeader.DataContext != null) ? <CDrugHeader>((this.objDrugHeader.DataContext) as CDrugHeader) : null;
        this.oMedScanRecAdmVM.MCVersion = objslotVM.MCVersionNo;
        this.oMedScanRecAdmVM.lnPrescriptionOID = this.prescriptionOid;
        this.oMedScanRecAdmVM.SlotDose = !String.IsNullOrEmpty(objslotVM.AdministrationDetail.Dose) ? Convert.ToDouble(objslotVM.AdministrationDetail.Dose) : 0;
        this.oMedScanRecAdmVM.sDoseValUOM = this.doseValUOM;
        this.oMedScanRecAdmVM.sDoseUOMLzoID = this.doseValUOMLzoID;
        this.oMedScanRecAdmVM.TotaldoseUOM = !String.IsNullOrEmpty(objslotVM.AdministrationDetail.strDoseUOM) ? objslotVM.AdministrationDetail.strDoseUOM : String.Empty;
        this.oMedScanRecAdmVM.PresScheduleOID = this.prescriptionSchOid;
        this.oMedScanRecAdmVM.TotaldoseadministeredAmt = !String.IsNullOrEmpty(objslotVM.AdministrationDetail.Dose) ? objslotVM.AdministrationDetail.Dose : String.Empty;
        this.oMedScanRecAdmVM.IsEnableTotalDoseValueAdmin = objslotVM.IsDoseEnabled;
        if (!String.IsNullOrEmpty(objslotVM.AdminMethod) || (String.Equals(this.sItemType, CConstants.Appliance) && objslotVM.AdministrationDetail != null && String.IsNullOrEmpty(objslotVM.AdministrationDetail.Dose) && String.IsNullOrEmpty(objslotVM.AdministrationDetail.strDoseUOM))) {
            this.oMedScanRecAdmVM.IsVisibleTotalDoseValueAdmin = Visibility.Collapsed;
        }
        if (objslotVM != null && objslotVM.AdministrationDetail != null && objslotVM.AdministrationDetail.RouteOID != null && !String.IsNullOrEmpty(objslotVM.AdministrationDetail.RouteOID.Value)) {
            this.oMedScanRecAdmVM.RecMedRouteOID = Convert.ToInt64(objslotVM.AdministrationDetail.RouteOID.Value);
        }
        if (this.oMedScanRecAdmVM.oProductDetailsInfo == null) {
            this.oMedScanRecAdmVM.oProductDetailsInfo = new ObservableCollection<ProductDetailsGrid>();
        }
    }
    oMedScanRecordAdministration_Closed(args: AppDialogEventargs): void {
        Busyindicator.SetStatusIdle("ScanRecordMed");
        this.oMedScanRecordAdministration = <MedScanRecordAdministration>(args.Content.Component as MedScanRecordAdministration);
        this.oMedScanRecAdmVM = <MedScanRecAdmVM>(args.Content.Component.DataContext as MedScanRecAdmVM);
        if (args.Result == AppDialogResult.Ok) {
            if (this.oMedScanRecAdmVM != null) {
                if (this.oMedScanRecAdmVM.IsProductScanned.Equals('M')) {
                    var lstProductDetailInfo: ObservableCollection<ProductDetailsGrid> = new ObservableCollection<ProductDetailsGrid>(this.oMedScanRecAdmVM.oProductDetailsInfo.Where(c => ((!String.IsNullOrEmpty(c.Productcode) && !String.IsNullOrWhiteSpace(c.Productcode)) || !(c.Expirydate == DateTime.MinValue || c.Expirydate == null) || (!String.IsNullOrEmpty(c.Batchnumber) && !String.IsNullOrWhiteSpace(c.Batchnumber)) || (!String.IsNullOrEmpty(c.Serialnumber) && !String.IsNullOrWhiteSpace(c.Serialnumber)) || (!String.IsNullOrEmpty(c.Comments) && !String.IsNullOrWhiteSpace(c.Comments)))).Select(s => s));
                    this.oMedScanRecAdmVM.oProductDetailsInfo = lstProductDetailInfo;
                }
                if (this.objVm != null && this.objVm.AdministrationDetail != null && !String.IsNullOrEmpty(this.objVm.AdministrationDetail.Dose) && !String.IsNullOrEmpty(this.oMedScanRecAdmVM.TotaldoseadministeredAmt) && !String.Equals(this.objVm.AdministrationDetail.Dose, this.oMedScanRecAdmVM.TotaldoseadministeredAmt)) {
                    this.objVm.AdministrationDetail.IsAdminDoseChanged = true;
                }
                this.objVm.AdministrationDetail.Dose = !String.IsNullOrEmpty(this.oMedScanRecAdmVM.TotaldoseadministeredAmt) ? this.oMedScanRecAdmVM.TotaldoseadministeredAmt : String.Empty;
                if (this.oMedScanRecAdmVM != null && this.oMedScanRecAdmVM.IsProductScanned == 'S' && this.oMedScanRecAdmVM.oProductDetailsInfo != null && this.oMedScanRecAdmVM.oProductDetailsInfo.Count > 0)
                    MedChartData.IsMedScanSuccess = true;
                if (this.oMedScanRecAdmVM != null && this.oMedScanRecAdmVM.oProductDetailsInfo != null && this.oMedScanRecAdmVM.oProductDetailsInfo.Count > 0) {
                    this.objVm.AdministrationDetail.IsBatchenabled = false;
                    this.objVm.AdministrationDetail.IsExpiryenabled = false;
                }
                else {
                    this.objVm.AdministrationDetail.IsBatchenabled = true;
                    this.objVm.AdministrationDetail.IsExpiryenabled = true;
                }
                this.oMedScanRecordAdministration.dupDialogRef.close();
            }
        }
        else if (args.Result == AppDialogResult.Cancel) {
            this.CancelButtonClick();
        }
    }
    oMedScanRecordAdministration_OnCloseMedScanMezEvent(): void {
        Busyindicator.SetStatusIdle("ScanRecordMed");
        if (this.lstCMedBarcodeScanOverrideDetail == null)
            this.lstCMedBarcodeScanOverrideDetail = new ObservableCollection<CMedBarcodeScanOverrideDetail>();
        if (this.oMedScanRecAdmVM != null && this.oMedScanRecAdmVM.oMedBarScanOverideForInvalidORNotMatchProd != null) {
            this.lstCMedBarcodeScanOverrideDetail.Add(this.oMedScanRecAdmVM.oMedBarScanOverideForInvalidORNotMatchProd);
            this.oMedScanRecAdmVM = null;
        }
    }
    public CancelButtonClick(): void {
        if (!this.oMedScanRecAdmVM.IsExpiryDTMsgShown) {
            var iMsgBox: iMessageBox = ObjectHelper.CreateObject(new iMessageBox(), {
                Title: CConstants.MSGTitleName,
                Message: Resource.MedScanRecAdmin.Cancel_Msg,
                MessageButton: MessageBoxButton.YesNo,
                IconType: MessageBoxType.Question
            });
            iMsgBox.MessageBoxClose = (s,e) => { this.iCancelMsgBox_MessageBoxClose(s,e) };
            iMsgBox.Show();
        }
    }
    iCancelMsgBox_MessageBoxClose(sender: Object, e: MessageEventArgs): void {
        var IsProdScanned: boolean;
        if (e.MessageBoxResult == MessageBoxResult.Yes) {
            this.oMedScanRecAdmVM.oProductDetailsInfo = this.CopyProductDetailsInfo(this.oMedScanRecAdmVM.OldProductDetailsInfo);
            if (this.oMedScanRecAdmVM.oProductDetailsInfo != null && this.oMedScanRecAdmVM.oProductDetailsInfo.Count == 0) {
                this.oMedScanRecAdmVM.IsProductScanned = 'N';
            }
            else if (this.oMedScanRecAdmVM.oProductDetailsInfo != null && this.oMedScanRecAdmVM.oProductDetailsInfo.Count > 0) {
                IsProdScanned = this.oMedScanRecAdmVM.oProductDetailsInfo.Any(x => !String.IsNullOrEmpty(x.Productscanned));
                if (IsProdScanned)
                    this.oMedScanRecAdmVM.IsProductScanned = 'S';
                else this.oMedScanRecAdmVM.IsProductScanned = 'M';
            }
            this.objVm.MedScanRecadminDetail = this.oMedScanRecAdmVM;
            this.oMedScanRecordAdministration.dupDialogRef.close();
        }
        else {
            if (this.oMedScanRecordAdministration != null) {
                this.oMedScanRecordAdministration.txtMedBarcode.Focus();
            }
        }
    }
    public CheckMandatoryBeforeScan(): boolean {
        if (this.objVm != null && this.objVm.AdministrationDetail != null && !this.objVm.AdministrationDetail.IsMedScanReadonly) {
            if (this.objVmsltDoseDis.ScanRecMedMultiRoute != MultiRouteType.Single_Route && this.objVm.AdministrationDetail != null && (this.objVm.AdministrationDetail.RouteOID == null || (this.objVm.AdministrationDetail.RouteOID != null && String.IsNullOrEmpty(this.objVm.AdministrationDetail.RouteOID.Value)))) {
                this.oMsg.Message = Resource.MedScanRecAdmin.MultiRoute_Msg;
                this.oMsg.IconType = MessageBoxType.Information;
                this.oMsg.Title = CConstants.MSGTitleName;
                this.oMsg.MessageButton = MessageBoxButton.OK;
                this.oMsg.Tag = "route";
                this.oMsg.MessageBoxClose = (s,e) => { this.oMsg_RouteORDoseMessageBoxClosed() };
                this.oMsg.Show();
                return true;
            }
            else if ((this.objVm.IsDoseEnabled || (!String.IsNullOrEmpty(this.strDoseType) && String.Equals(this.strDoseType, DoseTypeCode.CONDITIONAL))) && (this.objVm.AdministrationDetail != null && String.IsNullOrEmpty(this.objVm.AdministrationDetail.Dose) || Convert.ToDouble(this.objVm.AdministrationDetail.Dose) == 0)) {
                this.oMsg.Message = Resource.MedScanRecAdmin.DoseMand_Msg;
                this.oMsg.IconType = MessageBoxType.Information;
                this.oMsg.Title = CConstants.MSGTitleName;
                this.oMsg.MessageButton = MessageBoxButton.OK;
                this.oMsg.Tag = "dose";
                this.oMsg.MessageBoxClose = (s,e) => { this.oMsg_RouteORDoseMessageBoxClosed() };
                this.oMsg.Show();
                return true;
            }
            else if (!this.IsMedExclude && this.objVmsltDoseDis.IsCustomiseMedScan) {
                this.oMsg.Message = Resource.MedScanRecAdmin.ExcludedMed_Msg;
                this.oMsg.IconType = MessageBoxType.Information;
                this.oMsg.Title = CConstants.MSGTitleName;
                this.oMsg.Tag = "exclude";
                this.oMsg.MessageButton = MessageBoxButton.YesNo;
                this.oMsg.MessageBoxClose = (s,e) => { this.iExcludedMedMsgBox_MessageBoxClose(s,e) };
                this.oMsg.Show();
                this.IsMedExclude = true;
                return true;
            }
            else if (!MedChartData.IsPatWBBarcodeScanOverriden && !MedChartData.IsMedBarcodeScanOverriden && !this.IsPatWristBandOverridden && MedChartData.IsPatWBScanMandatory && !MedChartData.IsPatWBScanSuccess && this.iRdbGiven.IsChecked == true) {
                this.IsLaunchedFromScanMedlink = true;
                this.LaunchOverrideScan();
                return true;
            }
        }
        return false;
    }
    oMsg_RouteORDoseMessageBoxClosed(): void {
        if (String.Compare(this.oMsg.Tag.ToString(), "route") == 0)
            this.cboRoute.Focus();
        else if (String.Compare(this.oMsg.Tag.ToString(), "dose") == 0)
            this.txtDose.Focus();
    }
    cboRoute_SelectionChanged(e): void {
        if (this.objVm != null && this.objVm.Routes != null && this.objVm.Routes.Count > 1 && this.objVm.AdministrationDetail != null && this.objVm.AdministrationDetail.RouteOID != null) {
            if (!this.ValidateRouteforScanMeds()) {
                Int64.TryParse(this.objVm.AdministrationDetail.RouteOID.Value, (o) => { this.lnRouteOID = o });
                this.GetWitnessRequired(); 
            }
            this.IsRouteChngd = false;
        }
    }
    private ValidateRouteforScanMeds(): boolean {
        var iMsgBox: iMessageBox = new iMessageBox();
        iMsgBox.Title = CConstants.MSGTitleName;
        iMsgBox.MessageBoxClose = (s,e) => { this.RouteChangeMsgBox_YesNo(s,e) };
        if((this.lnRouteOID.Value == Convert.ToInt64(this.objVm.AdministrationDetail.RouteOID.Value))){
            this.IsRouteChngd = true;
        }
        if (!this.IsRouteChngd && this.objVm.AdministrationDetail.IsMedScanReadonly && (this.iRdbGiven.IsChecked == true || this.iRdbSelfAdmin.IsChecked == true)) {
            iMsgBox.MessageButton = MessageBoxButton.OK;
            iMsgBox.IconType = MessageBoxType.Information;
            iMsgBox.Message = Resource.MedScanRecAdmin.ReadonlyRoute_Msg;
            iMsgBox.Height = 160;
            iMsgBox.Show();
            return true;
        }
        else if ((this.iRdbGiven.IsChecked == true || this.iRdbSelfAdmin.IsChecked == true) && !this.objVm.AdministrationDetail.IsMedScanReadonly && this.oMedScanRecAdmVM != null && !this.IsRouteChngd && this.oMedScanRecAdmVM.oProductDetailsInfo.Count > 0) {
            iMsgBox.MessageButton = MessageBoxButton.YesNo;
            iMsgBox.IconType = MessageBoxType.Question;
            iMsgBox.Message = Resource.MedScanRecAdmin.RemoveMed_Msg;
            iMsgBox.Show();
            return true;
        }
        return false;
    }
    RouteChangeMsgBox_YesNo(sender: Object, e: MessageEventArgs): void {
        if (e.MessageBoxResult == MessageBoxResult.Yes) {
            this.oMedScanRecAdmVM = null;
            MedChartData.IsMedScanSuccess = false;
            this.lnRouteOID = Convert.ToInt64(this.objVm.AdministrationDetail.RouteOID.Value);
            this.objVm.AdministrationDetail.IsBatchenabled = true;
            this.objVm.AdministrationDetail.IsExpiryenabled = true;
        }
        else {
            this.IsRouteChngd = false;
            var tempRoute: CListItem = this.objVm.Routes.Where(c => !String.IsNullOrEmpty(c.Value) && String.Equals(c.Value, Convert.ToString(this.lnRouteOID))).FirstOrDefault();
            this.objVm.AdministrationDetail.RouteOID = tempRoute;
        }
    }
    ValidateOnActionChange(Value: string): void {
        this.NewAction = Value;
        if (this.oMedScanRecAdmVM != null && this.oMedScanRecAdmVM.oProductDetailsInfo != null && this.oMedScanRecAdmVM.oProductDetailsInfo.Count > 0 && !String.Equals(this.NewAction, CConstants.ActionSelfAdmin) && !String.Equals(this.NewAction, CConstants.ActionGiven)) {
            var iMsgBox: iMessageBox = ObjectHelper.CreateObject(new iMessageBox(), {
                Title: CConstants.MSGTitleName,
                Message: Resource.MedScanRecAdmin.RemoveMed_Msg,
                MessageButton: MessageBoxButton.YesNo,
                IconType: MessageBoxType.Question
            });
            iMsgBox.MessageBoxClose = (s,e) => { this.ValMsgBox_MessageBoxClose(s,e) };
            iMsgBox.Show();
        }
        else if (String.Equals(this.NewAction, CConstants.ActionSelfAdmin) || String.Equals(this.NewAction, CConstants.ActionGiven)) {
            this.OldAction = this.NewAction;
        }
    }
    ValMsgBox_MessageBoxClose(sender: Object, e: MessageEventArgs): void {
        if (e.MessageBoxResult == MessageBoxResult.Yes) {
            this.oMedScanRecAdmVM = null;
            if (this.objVm != null && this.objVm.AdministrationDetail != null) {
                this.objVm.AdministrationDetail.IsMedScanReadonly = false;
            }
            MedChartData.IsMedScanSuccess = false;
            this.OldAction = this.NewAction;
            this.objVm.AdministrationDetail.IsBatchenabled = true;
            this.objVm.AdministrationDetail.IsExpiryenabled = true;
        }
        else {
            if (String.Equals(this.OldAction, CConstants.ActionGiven)) {
                this.iRdbGiven.IsChecked = true;
                this.iRdbGiven_Checked(null);
            }
            else if (String.Equals(this.OldAction, CConstants.ActionNotGiven)) {
                this.iRdbNotGiven.IsChecked = true;
                this.iRdbNotGiven_Checked(null);
            }
            else if (String.Equals(this.OldAction, CConstants.ActionNotKnown)) {
                this.iRdbNotKnown.IsChecked = true;
                this.iRdbNotKnown_Checked(null);
            }
            else if (String.Equals(this.OldAction, CConstants.ActionSelfAdmin)) {
                this.iRdbSelfAdmin.IsChecked = true;
                this.iRdbSelfAdmin_Checked(null);
            }
        }
    }
    iExcludedMedMsgBox_MessageBoxClose(sender: Object, e: MessageEventArgs): void {
        if (e.MessageBoxResult == MessageBoxResult.Yes) {
            this.LaunchScanRecordMedication();
        }
        this.IsMedExclude = false;
    }
    /* An additional Logic to show/hide the parent Div elements when their inner 
    elements are visible/invisible */
    ShowDivElement(divName: string) {
        let div = <HTMLElement>document.getElementById(divName);

        if (divName == "divlblWitnessedBy")
            div.style.display = 'grid';
        else
            div.style.display = 'block';

        if (divName == "divlblResNotGiven" || divName == "divlblResFordefer")
            div.style.paddingTop = '8px';
        
        if (divName == "divCriticalMedMsg")
            this.ShowDivElement("divCriticalMedMsgBlankLine");
    }
    HideDivElement(divName: string) {
        let div = <HTMLElement>document.getElementById(divName);
        div.style.display = 'none';

        if (divName == "divCriticalMedMsg")
            this.HideDivElement("divCriticalMedMsgBlankLine");
    }
    RefreshDivElements() {
        if (this.lblNoParentCarerListed.Visibility == Visibility.Visible) 
            this.ShowDivElement("divlblNoParentCarerListed"); 
        else 
            this.HideDivElement("divlblNoParentCarerListed");
        
        if (this.chkNoParentCarerListed.Visibility == Visibility.Visible) 
            this.ShowDivElement("divchkNoParentCarerListed"); 
        else 
            this.HideDivElement("divchkNoParentCarerListed");
        
        if (this.lblRelation.Visibility == Visibility.Visible) 
            this.ShowDivElement("divlblRelation"); 
        else 
            this.HideDivElement("divlblRelation");
        
        if (this.lblRelationSelected.Visibility == Visibility.Visible) 
            this.ShowDivElement("divlblRelationSelected"); 
        else 
            this.HideDivElement("divlblRelationSelected");

        if (this.lblResNotGiven.Visibility == Visibility.Visible) 
            this.ShowDivElement("divlblResNotGiven"); 
        else 
            this.HideDivElement("divlblResNotGiven");

        if (this.cboResNotGiven.Visibility == Visibility.Visible) 
            this.ShowDivElement("divcboResNotGiven"); 
        else 
            this.HideDivElement("divcboResNotGiven");

        if (this.lblResFordefer.Visibility == Visibility.Visible) 
            this.ShowDivElement("divlblResFordefer"); 
        else 
            this.HideDivElement("divlblResFordefer");

        if (this.cboResFordefer.Visibility == Visibility.Visible) 
            this.ShowDivElement("divcboResFordefer"); 
        else 
            this.HideDivElement("divcboResFordefer");
        
        if (this.lblcliniIncFrm.Visibility == Visibility.Visible) 
            this.ShowDivElement("divlblcliniIncFrm"); 
        else 
            this.HideDivElement("divlblcliniIncFrm");

        if (this.lblcliniIncFrmValue.Visibility == Visibility.Visible) 
            this.ShowDivElement("divlblcliniIncFrmValue"); 
        else 
            this.HideDivElement("divlblcliniIncFrmValue");
        
        if (this.lblNoWitness.Visibility == Visibility.Visible) 
            this.ShowDivElement("divlblNoWitness"); 
        else 
            this.HideDivElement("divlblNoWitness");

        if (this.chkNoWitness.Visibility == Visibility.Visible) 
            this.ShowDivElement("divchkNoWitness"); 
        else 
            this.HideDivElement("divchkNoWitness");

        /* if (this.lblDateTimeGivenText.Visibility == Visibility.Visible) 
            this.ShowDivElement("divlblDateTimeGivenText"); 
        else 
            this.HideDivElement("divlblDateTimeGivenText"); */

        if (this.dtpDateTimeGivenText.Visibility == Visibility.Visible) 
            this.ShowDivElement("divdtpDateTimeGivenText"); 
        else 
            this.HideDivElement("divdtpDateTimeGivenText");

        /* if (this.CriticalMedMsg.Visibility == Visibility.Visible) 
            this.ShowDivElement("divCriticalMedMsg"); 
        else 
            this.HideDivElement("divCriticalMedMsg"); */
        
        if (this.stpCareProvider.Visibility == Visibility.Visible) {
            this.ShowDivElement("divlblCareProvider");
            this.ShowDivElement("divstpCareProvider"); 
        }
        else {
            this.HideDivElement("divlblCareProvider");
            this.HideDivElement("divstpCareProvider");
        }
        
        if (this.lblAdministeredby.Visibility == Visibility.Visible) 
            this.ShowDivElement("divlblAdministeredby"); 
        else 
            this.HideDivElement("divlblAdministeredby");

        if (this.sfsAdministeredby.Visibility == Visibility.Visible || this.cboParentCarer.Visibility == Visibility.Visible) 
            this.ShowDivElement("divsfsAdministeredby"); 
        else 
            this.HideDivElement("divsfsAdministeredby");
        
        if (this.lblWitnessedBy.Visibility == Visibility.Visible) 
            this.ShowDivElement("divlblWitnessedBy"); 
        else 
            this.HideDivElement("divlblWitnessedBy");

        if (this.sfsWitnessedby.Visibility == Visibility.Visible) 
            this.ShowDivElement("divsfsWitnessedby"); 
        else 
            this.HideDivElement("divsfsWitnessedby");
        
        if (this.SteppedImg.Visibility == Visibility.Visible) {
            this.ShowDivElement("divStepped"); 
            this.ShowDivElement("divSteppedImg"); 
        }
        else {
            this.HideDivElement("divStepped");
            this.HideDivElement("divSteppedImg");
        }

        if (this.lblAmendReason.Visibility == Visibility.Visible) 
            this.ShowDivElement("divlblAmendReason"); 
        else 
            this.HideDivElement("divlblAmendReason");

        if (this.cboAmendReason.Visibility == Visibility.Visible) 
            this.ShowDivElement("divcboAmendReason"); 
        else 
            this.HideDivElement("divcboAmendReason");

        let nHeight: number = 20;
        if (this.iRdbGiven.Visibility == null || this.iRdbGiven.Visibility == Visibility.Visible) {
            nHeight = nHeight + 20;
            this.ShowDivElement("diviRdbGiven"); 
        }
        else
            this.HideDivElement("diviRdbGiven");

        if (this.iRdbNotGiven.Visibility == null || this.iRdbNotGiven.Visibility == Visibility.Visible) {
            nHeight = nHeight + 20;
            this.ShowDivElement("diviRdbNotGiven"); 
        }
        else
            this.HideDivElement("diviRdbNotGiven");

        if (this.iRdbSelfAdmin.Visibility == null || this.iRdbSelfAdmin.Visibility == Visibility.Visible) {
            nHeight = nHeight + 20;
            this.ShowDivElement("diviRdbSelfAdmin"); 
        }
        else
            this.HideDivElement("diviRdbSelfAdmin");

        if (this.iRdbNotKnown.Visibility == null || this.iRdbNotKnown.Visibility == Visibility.Visible) {
            nHeight = nHeight + 20;
            this.ShowDivElement("diviRdbNotKnown"); 
        }
        else
            this.HideDivElement("diviRdbNotKnown");

        if (this.iRdbGiven.IsChecked || this.iRdbSelfAdmin.IsChecked) {
            if (this.rdbparent.IsChecked || this.IsInfBolusItemsVisible || this.SteppedImg.Visibility == Visibility.Visible)
                nHeight = nHeight + 20;
        }

        this.brdMedicationAction.Height = nHeight;

        let div = <HTMLElement>document.getElementById("divTopPanel");
        if (this.iRdbNotGiven.IsChecked || this.iRdbNotKnown.IsChecked)
            div.style.height = (nHeight + 20).ToString() + "px";
        else {
            if (this.SteppedImg.Visibility == Visibility.Visible)
                div.style.height = "200px";
            else
                div.style.height = "145px";
        }

        let div1 = <HTMLElement>document.getElementById("divlblcliniIncFrmValue");
        if (this.IsInfBolusItemsVisible)
            div1.style.height = "39px";
        else 
            div1.style.height = "31px";
    }
    CopyProductDetailsInfo(source: ObservableCollection<ProductDetailsGrid>): ObservableCollection<ProductDetailsGrid>{
        let target = new ObservableCollection<ProductDetailsGrid>();
        for(let i = 0; i < source.Count; i++) {
            var objProductdetailgrd: ProductDetailsGrid = new ProductDetailsGrid();
            objProductdetailgrd.Productscanned = source[i].Productscanned;
            objProductdetailgrd.Productcode = source[i].Productcode;
            objProductdetailgrd.Expirydate = source[i].Expirydate;
            objProductdetailgrd.Batchnumber = source[i].Batchnumber;
            objProductdetailgrd.Serialnumber = source[i].Serialnumber;
            objProductdetailgrd.Comments = source[i].Comments;
            objProductdetailgrd.IsPresFluidProduct = source[i].IsPresFluidProduct;
            objProductdetailgrd.IsExpiryDateEnabled = source[i].IsExpiryDateEnabled;
            objProductdetailgrd.IsBatchNumberEnabled = source[i].IsBatchNumberEnabled;
            objProductdetailgrd.IsSerialNumberEnabled = source[i].IsSerialNumberEnabled;
            objProductdetailgrd.PackageUOM = source[i].PackageUOM;
            objProductdetailgrd.PacKageUOMLZOID = source[i].PacKageUOMLZOID;
            objProductdetailgrd.PresItemStrengthUOM = source[i].PresItemStrengthUOM;
            objProductdetailgrd.PresItemStrengthValue = source[i].PresItemStrengthValue;
            objProductdetailgrd.PresItemDoseMultiplier = source[i].PresItemDoseMultiplier;
            objProductdetailgrd.PresItemDoseDivider = source[i].PresItemDoseDivider;
            objProductdetailgrd.IsProductEnabled = source[i].IsProductEnabled;
            objProductdetailgrd.ScanProductLZOID = source[i].ScanProductLZOID;
            objProductdetailgrd.UniqueID = source[i].UniqueID;
            target.Add(objProductdetailgrd);
        }
        return target;
    }
    SetParentCarerComboText(value: string) {
        if (this.cboParentCarer.ItemsSource) {
            let oItem = this.cboParentCarer.ItemsSource?.array.find(
                (element) => element.DisplayText == value
            );
            if (oItem) {
                this.cboParentCarer.SelectedValue = oItem;
            }
            else {
                let oItem: CListItem = new CListItem();
                oItem.DisplayText = value;
                this.cboParentCarer.Items.Add(oItem);
                this.cboParentCarer.SelectedValue = oItem;
                this.cboParentCarer.ItemsSource.Remove(oItem);
            }
        }
    }
    ShowInfBolusItems() {
        this.ShowDivElement("divlblConcentration");
        this.ShowDivElement("divtxtConStrengthValue");
        this.ShowDivElement("divlblInfusionperiod");
        this.ShowDivElement("divInfusionperiodtext");
        this.IsInfBolusItemsVisible = true;
    }
    HideInfBolusItems() {
        this.HideDivElement("divlblConcentration");
        this.HideDivElement("divtxtConStrengthValue");
        this.HideDivElement("divlblInfusionperiod");
        this.HideDivElement("divInfusionperiodtext");
        this.IsInfBolusItemsVisible = false;
    }
    sfsAdministeredby_LostFocus(e): void {
        this.sfsAdministeredby.searchText = "";
    }
    cboSite_SelectionChanged(e) {
        if (this.cboSite.SelectedItem.DisplayText == "More") {
            var oBlankValue: CListItem = ObjectHelper.CreateObject(new CListItem(), {
                DisplayText: String.Empty,
                Value: "1"
            });
            this.objVm.AdministrationDetail.Sites.Add(oBlankValue);
            this.objVm.AdministrationDetail.Site = oBlankValue;
        }
    }
}
