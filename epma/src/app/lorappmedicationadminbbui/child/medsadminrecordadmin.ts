import { Component, OnInit, ViewChild, Output, Input, AfterViewInit, OnChanges, ElementRef } from '@angular/core';
import { ScriptObject, AppActivity, MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, Convert, ObjectHelper, SLQueryCollection } from "epma-platform/services";
import { CConstants, MedAction, DoseTypeCode, SlotStatus, MultiRouteType, ValueDomain } from '../utilities/CConstants';
import { Common } from '../utilities/common';
import { Resource } from '../resource';
import { Border, iButton, iCheckBox, Grid, iComboBox, iLabel, iRadioButton, iTextBox, iTimeBox, StackPanel, ToolTipService } from 'epma-platform/controls';
import { DateChangeEventArgs, iDateTimePicker } from 'src/app/shared/epma-platform/controls/epma-datetimepicker/epma-datetimepicker.component';
import { MedicationAdministrator } from '../resource/medicationadministrator.designer';
import { ConditionalRegime } from '../resource/conditionalregime.designer';
import { iAppDialogWindow, WindowButtonType, AppDialogResult, AppDialogEventargs, ChildWizardCloseEventargs, ObservableCollection, CListItem, HtmlPage, List, Exception, Int64 } from 'epma-platform/models';
import { RoutedEventArgs } from "src/app/shared/epma-platform/controls/FrameworkElement";
import { MedScanRecordAdministration } from './MedScanRecordadministration';
import DateTime from 'epma-platform/DateTime';
import { AppContextInfo, PatientContext } from 'src/app/lorappcommonbb/utilities/globalvariable';
import { CommonBB } from 'src/app/lorappcommonbb/utilities/common';
import { MedChartData, TagDrugHeaderDetail } from '../utilities/globalvariable'
import { iSFS } from 'src/app/shared/epma-platform/controls/epma-isfs/epma-isfs.component';
import { CDrugHdrAddnlInfo, CDrugHeader, DrugHeader } from '../common/drugheader';
import { AdministrationDetail, CPatLatestObsResParams, MedicationAdministrationWSSoapClient, CReqMsgRecordAdministration, CResMsgRecordAdministration, SlotDetail, UOM, TransactionItemPackDetail, MedsScanProductDetails, CMedBarcodeScanOverrideDetail, CReqMsgGetLatestObsOrResultDetails, GetLatestObsOrResultDetailsCompletedEventArgs, CResMsgGetLatestObsOrResultDetails, CReqMsgStrikethroughAdmin, CResMsgStrikethroughAdmin, CStrikethroughAdmin } from 'src/app/shared/epma-platform/soap-client/MedicationAdministrationWS';
import { AdministrationDetailVM, SlotDetailVM } from '../viewmodel/MedicationChartVM';
import { Visibility } from 'epma-platform/models';
import { SlotAdministrationHelper } from '../common/slotadministrationhelper';
import { Busyindicator } from 'src/app/lorappcommonbb/busyindicator';
import { ProfileData } from "../utilities/ProfileData";
import { ConditionalDoseChildView } from '../child/ConditionalDoseChildView';
import { ConditionalDoseVM, RequestSource } from '../../lorappmedicationcommonbb/viewmodel/ConditionalDoseVM';
import { MedScanRecAdmVM, ProductDetailsGrid } from '../viewmodel/MedScanRecAdmVM';
import { MedAmendMessageVM } from '../viewmodel/MedicationChartVM';
import { MedAmendMessage } from '../view/MedAmendMessage';
import { MedsAdminDoseDiscrepancyReason } from '../child/medsadmindosediscrepancyreason';
import { StringBuilder } from 'src/app/shared/epma-platform/services/stringbuilder.service';
import { ConditionalDoseRegimeView } from '../view/ConditionalDoseRegimeView';
import { SLSFSItem } from 'src/app/shared/epma-platform/models/model';
import { gridIcon } from '@progress/kendo-svg-icons';
import { CSecurityManagementServiceWSSoapClient, CReqMsgGetUser, CResMsgGetUser, GetUserCompletedEventArgs } from 'src/app/shared/epma-platform/soap-client/CSecurityManagementServiceWS';
import { DrugItem } from 'src/app/lorarcbluebirdmedicationchart/common/DrugItem';
import { SelectedUserType, WitnessHelper } from 'src/app/lorappmedicationcommonbb/utilities/witnesshelper';
import { AuthResult } from 'src/app/lorappmedicationcommonbb/viewmodel/UserAuthenticateVM';
import { AdministrableQtyView } from "../resource/administrableqtyview.designer";
import { AdministrableQtyViewVM, TransactionItemPackDetails } from '../viewmodel/AdministrableQtyViewVM';
import { MedicationCommonBB } from '../../lorappmedicationcommonbb/utilities/medicationcommonbb';
import { QueryPatientRecordWSSoapClient, GetPatientPersonalCarerCompletedEventArgs, CReqMsgGetPatientPersonalCarer, CResMsgGetPatientPersonalCarer } from 'src/app/shared/epma-platform/soap-client/QueryPatientRecordWS';
import * as IPPMAManagePrescSer from '../../../app/shared/epma-platform/soap-client/IPPMAManagePrescriptionWS';
import { WebServiceURLMedicationCommonBB } from 'src/app/lorappmedicationcommonbb/utilities/globalvariable';
import { CValuesetTerm } from '../../../app/product/shared/models/Commonbbcreference';
import { MedicationCommonConceptCodeData } from 'src/app/lorappmedicationcommonbb/utilities/profiledata';
import { MCommonBB } from 'src/app/lorappmedicationcommonbb/utilities/common';
import { AMSHelper } from 'src/app/lorappcommonbb/amshelper';
import { GridLayoutComponent } from '@progress/kendo-angular-layout';
import { KendoModule } from 'src/app/modules/kendo.module';
import { OverrideBarcodeScan } from "../child/OverrideBarcodeScan";
import { OverrideBarcodeScanVM } from "../viewmodel/OverrideBarcodeScanVM";
import { DisplayPrescriptionLineItem, DoseWrapConverter, RouteWrapConverter, TargetsatrangeConverter, HumidificationConverter } from '../converter/medadminconverter';
import { ManageBarcodeHelper, MedicationBarcode } from '../common/ManageBarcodeHelper';
import { RequisitionHistoryDetails } from 'src/app/product/shared/models/medicationadminws';
import { ChartContext } from '../utilities/globalvariable';
import { DateTimeKind } from 'epma-platform/DateTime';
import { CReqMsgGetDataItem, CResMsgIsWitnessRequired, CReqMsgIsWitnessRequired, IsWitnessRequiredCompletedEventArgs, IPPMAPrescribableDefnWSSoapClient, IPPPrescribeItemLookUp, ObservationResult } from 'src/app/shared/epma-platform/soap-client/IPPMAPrescribableDefnWS';
import * as PrescribableDefn from 'src/app/shared/epma-platform/soap-client/IPPMAPrescribableDefnWS';
import { TextBoxComponent } from '@progress/kendo-angular-inputs';

@Component({
  selector: 'medsadminrecordadmin',
  templateUrl: './medsadminrecordadmin.html',
  styleUrls: ['./medsadminrecordadmin.css']
})

export class MedsRecordAdminstrator extends iAppDialogWindow implements AfterViewInit, OnInit {

  objDrugHeader: DrugHeader;
  @ViewChild('objDrugHeaderTempRef', { read: DrugHeader, static: false }) set _drugheader(c: DrugHeader) { if (c) { this.objDrugHeader = c; } }
//   txtBarcodeRecAdmin: iTextBox;
//   @ViewChild('txtBarcodeRecAdminTempRef', { read: iTextBox, static: false }) set _textbox1(c: iTextBox) { if (c) { this.txtBarcodeRecAdmin = c; } }
@ViewChild('txtBarcodeRecAdminTempRef', { static: false }) txtBarcodeRecAdmin: ElementRef;
  cmdRequest: iButton;
  @ViewChild('cmdRequestTempRef', { read: iButton, static: false }) set _button1(c: iButton) { if (c) { this.cmdRequest = c; } }
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
  iRdbDfrAdmin: iRadioButton; 
  @ViewChild('iRdbDfrAdminTempRef', { read: iRadioButton, static: false }) set _radiobutton5(c: iRadioButton) { if (c) { this.iRdbDfrAdmin = c; } }
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
  cmdRemove: iButton; 
  @ViewChild('cmdRemoveTempRef', { read: iButton, static: false }) set _button4(c: iButton) { if (c) { this.cmdRemove = c; } }
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
  brdMedicationAction: Border; 
  @ViewChild('brdMedicationActionTempRef', { read: Border, static: false }) set _border3(c: Border) { if (c) { this.brdMedicationAction = c; } }    
  cboSite: iComboBox;
  @ViewChild('cboSiteTempRef', { read: iComboBox, static: false }) set _combobox10(c: iComboBox) { if (c) { this.cboSite = c; } }

  lnPrescriptionOID: number = 0;
  lnPrescriptionSchOID: number = 0;
  lnRouteOID: number = 0;
  dblLDose: number = 0;
  dblUDose: number = 0;
  dateflag: boolean = false;
  sDoseValUOM: string;
  lnDoseValUOMOID: number = 0;
  sDoseUOMLzoID: string = String.Empty;
  sAdminReason: string = String.Empty;
  objVm: SlotDetailVM;
  objslotVM: SlotDetailVM;
  objSlotDetailVM: SlotDetailVM;
  cAdministeredTimeMode: string;
  oParam: string = String.Empty;
  lstCListItem: List<SLSFSItem> = new List<SLSFSItem>();
  
  IdentifyingType: string = String.Empty;
  IdentifyingOID: number = 0;
  AmendedPresOID: number = 0;
  strLorenzoID: string = String.Empty;
  strDoseType: string = String.Empty;
  strDose: string = String.Empty;
  MCVersion: string = String.Empty;
  sAdminMethod: string = String.Empty;
  sDrugName: string = String.Empty;
  sIsPRNWithSchedule: boolean = false;
  sObsDrugName: string = String.Empty;
  sMCitemname: string = String.Empty;
  slorenzoid: string = String.Empty;
  lnMedsAdminOID: number = 0;
  bIsControlledDrug: boolean = false;
  bIsWitnessReqd: boolean = false;
  SlotsTimeIntervalAvg: number = 0;
  sPatinet: string = "Patient";
  sParentCarer: string = "Parent/Carer";
  strSlotStatus: string = String.Empty;
  strComments: string = String.Empty;
  PrescItemStatus: string = String.Empty;
  strAmendedDoseVal: string = String.Empty;
  lnAmendedDoseUOMOID: number = 0;
  dtSlotDate: DateTime;
  IsAdministeredInAdvance: boolean = false;
  PrescriptionItemStartDTTM: DateTime = DateTime.MinValue;
  PrescriptionItemEndDTTM: DateTime = DateTime.MinValue;
  private ConditionalVM: ConditionalDoseVM;
  bIsPRN: boolean = false;
  private strUserName: string = String.Empty;
  ConditionalChildView: ConditionalDoseChildView;
  objMedsAdminDoseDiscrepancyReason: MedsAdminDoseDiscrepancyReason;
  objDoseDis: MedsAdminDoseDiscrepancyReason;
  oOverrideBarcodeScan: OverrideBarcodeScan;
  lstCMedBarcodeScanOverrideDetail: ObservableCollection<CMedBarcodeScanOverrideDetail>;
  objAmendmentmessage: MedAmendMessage;
  oMedAmendMessageVM: MedAmendMessageVM;
  CurrentDt: DateTime = CommonBB.GetServerDateTime();
  public OnRecAdminFinishEvent: Function;
  sDelimiter: string = "~";
  public objAdminDetail: AdministrationDetail;
  bIsAmend: boolean = false;
  bOkClicked: boolean = false;
  public SlotDate: DateTime;
  sItemType: string = String.Empty;
  AlreadyRequestedDetails: string = String.Empty;
  IsWardStock: boolean;
  IsUpdatePIStatusToCompleted: boolean = false;
  IsLastSlotCheckRequired: boolean = false;
  public IsReloadChartReq: boolean = false;
  public PrescriptionItemStatus: string = String.Empty;
  PresItmEndDttm: DateTime = DateTime.MinValue;
  private IsWitnessOverrideAllowed: boolean;
  sItemSubType: string = String.Empty;
  objWitnessHelper: WitnessHelper;
  oAdministrableQtyViewVM: AdministrableQtyViewVM;
  oAdministrableQtyView: AdministrableQtyView;
  IsExpiredProduct: boolean;
  public IsBolus: boolean = false;
  IsConditionalExists: boolean;
  sMultiRoute: string = String.Empty;
  AfterEnd: boolean = true;
  SelfAdminChkDefaultFlag: boolean = false;
  personalCarers: ObservableCollection<CListItem>;
  conceptCodes: StringBuilder = new StringBuilder();
  resolvedConceptCodes: ObservableCollection<CListItem>  ;
  sParacetamolRecentlyAdministered: number = -1;
  oMedScanRecordadministration: MedScanRecordAdministration;
  oMedScanRecAdmVM: MedScanRecAdmVM;
  oMsg: iMessageBox = new iMessageBox();
  IsRouteChngd: boolean = false;
  OldAction: string = String.Empty;
  NewAction: string = String.Empty;
  IsPatWristBandOverridden: boolean = false;
  IsLaunchedFromScanMedlink: boolean = false;
  IsMedExclude: boolean = false;
  bIsCondViewOpen: boolean = false;
  oDrugHeaderAddnlInfo: CDrugHdrAddnlInfo;
  IsInfBolusItemsVisible: boolean = false;

  chkNoWitness_Checked_Func: Function;
  chkNoWitness_Unchecked_Func: Function;
  chkNoParentCarerlisted_Checked_Func: Function;
  chkNoParentCarerlisted_Unchecked_Func: Function;
  lblCIFValue_MouseLeftButtonUp_Func: Function;
  dtpDateTimeGivenText_OnDateChange_Func: Function;

  constructor() {
      super();
  }

  constructorImpl(oSlotDetailVM: SlotDetailVM) {
    this.objSlotDetailVM = oSlotDetailVM;
    this.objslotVM = oSlotDetailVM;
    this.objSlotDetailVM = this.objslotVM;

    this.objVm = new SlotDetailVM();
    this.objVm.AdministrationDetail = new AdministrationDetailVM();
  }

  ngOnInit(): void {
    this.chkNoWitness_Checked_Func = (s, e) => { this.chkNoWitness_Checked(s); };
    this.chkNoWitness_Unchecked_Func = (s, e) => { this.chkNoWitness_Unchecked(s); };
    this.chkNoParentCarerlisted_Checked_Func = (s, e) => { this.chkNoParentCarerlisted_Checked(s); };
    this.chkNoParentCarerlisted_Unchecked_Func = (s, e) => { this.chkNoParentCarerlisted_Unchecked(s); }
    this.lblCIFValue_MouseLeftButtonUp_Func = (s, e) => { this.lblCIFValue_MouseLeftButtonUp(s) }
    this.dtpDateTimeGivenText_OnDateChange_Func = (s, e) => { this.dtpDateTimeGivenText_OnDateChange(s, e) }
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
  public maxScrollHeight ;
  public windowresultion;
  ngAfterViewInit(): void {
   this.windowresultion = (window.devicePixelRatio == 1) ? true : false;
   if(window.screen.height < 1000 && window.devicePixelRatio != 1.25){
    this.maxScrollHeight = 300;
   }
   else if(window.screen.height < 1000 && window.devicePixelRatio === 1.25){
    this.maxScrollHeight = 376;
   }
   else{
   this.maxScrollHeight = (window.devicePixelRatio == 1) ? 548 : (650 /window.devicePixelRatio) - 60;
   }   
   this.HelpCode = MedAction.RecordAdministration;
      this.cmdRequest.Visibility = MedChartData.bRequestMedicationVisible ? Visibility.Visible : Visibility.Collapsed;
      if ((MedChartData.IsMedChartReadOnly) || (String.IsNullOrEmpty(MedChartData.ChartStatus) || String.Equals(MedChartData.ChartStatus, CConstants.sChartSuspendedStatusCode))) {
          this.cmdRequest.IsEnabled = false;
      }
      else {
          this.cmdRequest.IsEnabled = true;
      }
      this.AlreadyRequestedDetails = String.IsNullOrEmpty(this.objSlotDetailVM.AlreadyRequestedDetails) ? String.Empty : this.objSlotDetailVM.AlreadyRequestedDetails;
  
      this.iRdbGiven.IsChecked = true;
      this.iRdbNotGiven.IsChecked = false;
      this.chkNoWitness.IsChecked = false;
      this.rdbCareProvider.IsChecked = true;
      this.rdbparent.IsChecked = false;
      this.sfsAdministeredby.IsEnabled = MedChartData.AllowAnyUserForAdministration;
      this.lblAdministeredby.Mandatory = true;
      this.IdentifyingType = this.objSlotDetailVM.IdentifyingType;
      this.IdentifyingOID = this.objSlotDetailVM.IdentifyingOID;
      this.MCVersion = this.objSlotDetailVM.MCVersionNo;
      this.lnPrescriptionOID = this.objSlotDetailVM.PrescriptionItemOID;
      this.lnPrescriptionSchOID = this.objSlotDetailVM.PresScheduleOID;
      this.lnRouteOID = this.objSlotDetailVM.RouteOID;
      this.strDoseType = this.objSlotDetailVM.DoseType;
      this.SlotsTimeIntervalAvg = this.objSlotDetailVM.SlotsTimeIntervalAvg;
      this.PrescItemStatus = this.objSlotDetailVM.PrescriptionItemStatus;
      this.AmendedPresOID = this.objSlotDetailVM.AmendedPresOID;
      this.SlotDate = this.objSlotDetailVM.TodaySlotDate;
      this.IsConditionalExists = this.objSlotDetailVM.IsConditionalExists;
      this.PrescriptionItemStartDTTM = this.objSlotDetailVM.PrescriptionStartDate;
      this.PrescriptionItemEndDTTM = this.objSlotDetailVM.PrescriptionEndDate;
      this.IsWardStock = this.objSlotDetailVM.IsWardStock;
      this.IsUpdatePIStatusToCompleted = this.objSlotDetailVM.IsUpdatePIStatusToCompleted;
      this.IsLastSlotCheckRequired = this.objSlotDetailVM.IsLastSlotCheckRequired;
      this.strAmendedDoseVal = this.objSlotDetailVM.AmendedDoseVal;
      this.lnAmendedDoseUOMOID = this.objSlotDetailVM.AmendedDoseUOMOID;
      this.sObsDrugName = (<TagDrugHeaderDetail>(this.objSlotDetailVM.DrugDetail.Tag)).DrugName;
      if ((<TagDrugHeaderDetail>(this.objSlotDetailVM.DrugDetail.Tag)).MultiComponentItems != null && (<TagDrugHeaderDetail>(this.objSlotDetailVM.DrugDetail.Tag)).MultiComponentItems.Count > 0)
        //this.sMCitemname = String.Join("^", (<TagDrugHeaderDetail>(this.objSlotDetailVM.DrugDetail.Tag)).MultiComponentItems);
      this.sItemType = (<TagDrugHeaderDetail>(this.objSlotDetailVM.DrugDetail.Tag)).ItemType.ToUpper();;
      this.sItemSubType = (<TagDrugHeaderDetail>(this.objSlotDetailVM.DrugDetail.Tag)).ItemSubType;
      this.slorenzoid = (<TagDrugHeaderDetail>(this.objSlotDetailVM.DrugDetail.Tag)).LorenzoID;
      if (String.Compare(this.sItemType, CConstants.Formulary_Drug) == 0)
          this.lblRoute.Mandatory = true;
      else 
          this.lblRoute.Mandatory = false;
      this.SteppedImg.Visibility = (String.Compare(this.strDoseType, DoseTypeCode.CONDITIONAL) == 0 && this.IsConditionalExists) ? Visibility.Visible : Visibility.Collapsed;
      this.stepped.Visibility = this.SteppedImg.Visibility;
      
      this.HideDivElement("divCriticalMedMsg");
      
      if (String.Compare(this.strDoseType, DoseTypeCode.CONDITIONAL) == 0 && this.IsConditionalExists) {
          ToolTipService.SetToolTip(this.SteppedImg, ConditionalRegime.DoseDetailsIcon_ToolTip);
      }
      this.sAdminMethod = this.objSlotDetailVM.AdminMethod;
      this.strSlotStatus = this.objSlotDetailVM.Status;
      this.dtSlotDate = this.objSlotDetailVM.ScheduledDTTM;
      this.bIsAmend = this.objSlotDetailVM.IsAmend;
      if (String.IsNullOrEmpty(this.sAdminMethod)) {
          if (((String.Compare(this.objSlotDetailVM.DoseType, DoseTypeCode.STEPPEDVARIABLE) == 0 && !String.IsNullOrEmpty(this.objSlotDetailVM.LDose) && !String.Equals(this.objSlotDetailVM.LDose, "0") && !String.IsNullOrEmpty(this.objSlotDetailVM.UDose) && !String.Equals(this.objSlotDetailVM.UDose, "0")) || String.Compare(this.objSlotDetailVM.DoseType, DoseTypeCode.DOSAGERANGE) == 0) || (String.Compare(this.objSlotDetailVM.DoseType, DoseTypeCode.CONDITIONAL) == 0)) {
              this.objSlotDetailVM.Dose = String.Empty;
          }
          this.strDose = !String.IsNullOrEmpty(this.objSlotDetailVM.Dose) && String.Compare(this.objSlotDetailVM.Dose, "0") != 0 ? this.objSlotDetailVM.Dose : String.Empty;
          if ((String.Compare(this.objSlotDetailVM.DoseType, DoseTypeCode.DOSAGERANGE) == 0) || (String.Compare(this.objSlotDetailVM.DoseType, DoseTypeCode.CONDITIONAL) == 0) || (String.Compare(this.objSlotDetailVM.DoseType, DoseTypeCode.STEPPED) == 0) || (String.Compare(this.objSlotDetailVM.DoseType, DoseTypeCode.STEPPEDVARIABLE) == 0)) {
              Number.TryParse(this.objSlotDetailVM.LDose, (o) => { this.dblLDose = o; });
              Number.TryParse(this.objSlotDetailVM.UDose, (o) => { this.dblUDose = o; });
          }
          this.sDoseValUOM = this.objSlotDetailVM.DoseUOM;
          this.lnDoseValUOMOID = this.objSlotDetailVM.DoseUOMOID;
          this.sDoseUOMLzoID = this.objSlotDetailVM.DoseUOMLzoID;
      }
      if (this.objSlotDetailVM.DrugDetail != null) {
          this.sDrugName = (<TagDrugHeaderDetail>(this.objSlotDetailVM.DrugDetail.Tag)).DrugName;
          this.sIsPRNWithSchedule = (<TagDrugHeaderDetail>(this.objSlotDetailVM.DrugDetail.Tag)).IsPRNWithSchedule;
          if (!String.IsNullOrEmpty(this.objSlotDetailVM.DrugDetail.Dose) && this.objSlotDetailVM.DrugDetail.Dose.Contains("Titrated") && ((this.objSlotDetailVM.Dose == CConstants.DoseTBD) || ((!String.IsNullOrEmpty(this.objSlotDetailVM.Dose) && (Convert.ToDouble(this.objSlotDetailVM.Dose) == 0))))) {
              this.iRdbNotGiven.IsChecked = true;
              this.iRdbGiven.IsEnabled = false;
              this.iRdbNotGiven.IsEnabled = true;
              this.iRdbNotKnown.IsEnabled = false;
              this.iRdbSelfAdmin.IsEnabled = false;
              this.iRdbDfrAdmin.IsEnabled = true;
          }
          else if (!String.IsNullOrEmpty(this.objSlotDetailVM.DrugDetail.Dose) && this.objSlotDetailVM.DrugDetail.Dose.Contains("Titrated") && !String.IsNullOrEmpty(this.objSlotDetailVM.Dose)) {
              this.iRdbGiven.IsChecked = true;
          }
      }
      this.strLorenzoID = this.objSlotDetailVM.LorenzoID;
      this.bIsControlledDrug = this.objSlotDetailVM.IsControlledDrug;
      this.sfsAdministeredby.OnGetItems = (s,e) => { this.sfsAdministeredby_OnGetItems(s,e); };
      this.sfsWitnessedby.OnGetItems = (s,e) => { this.sfsWitnessedby_OnGetItems(s,e); }; 
      this.sfsWitnessedby.ItemsSource = new ObservableCollection<CListItem>();
      this.sfsAdministeredby.ItemsSource = new ObservableCollection<CListItem>();
      this.cboParentCarer.ItemsSource = new ObservableCollection<CListItem>();
      this.cboDoseUOM.ItemsSource = new ObservableCollection<CListItem>();
      
      if (this.objSlotDetailVM.AdministrationDetail != null) {
          this.lnMedsAdminOID = this.objSlotDetailVM.AdministrationDetail.MedAdminOID;
          this.strComments = this.objSlotDetailVM.AdministrationDetail.AdminComments;
          this.IsAdministeredInAdvance = this.objSlotDetailVM.AdministrationDetail.IsAdministeredInAdvance;
      }
      else {
          this.cAdministeredTimeMode = 'N';
          this.lnMedsAdminOID = 0;
      }
      this.bIsPRN = this.objSlotDetailVM.IsLastPRN;
      if (this.bIsPRN) {
          this.iRdbNotKnown.Visibility = Visibility.Collapsed;
          this.iRdbDfrAdmin.Visibility = Visibility.Collapsed;
          this.iRdbNotGiven.Visibility = Visibility.Collapsed;
      }
      else if (!this.objSlotDetailVM.IsNextDueSlotExists && !this.objSlotDetailVM.IsNextAdminSlotExists) {
          if (this.objSlotDetailVM.Status == SlotStatus.OVERDUE || this.objSlotDetailVM.Status == SlotStatus.DUENOW || this.objSlotDetailVM.Status == SlotStatus.DEFERDUENOW || this.objSlotDetailVM.Status == SlotStatus.DEFEROVERDUE) {
              this.iRdbDfrAdmin.Visibility = Visibility.Visible;
          }
      }
      if (!String.IsNullOrEmpty(this.objSlotDetailVM.Status)) {
          if (this.objSlotDetailVM.Status == SlotStatus.DEFERDUENOW || this.objSlotDetailVM.Status == SlotStatus.DEFEROVERDUE) {
              this.cmdRemove.Visibility = Visibility.Visible;
              this.iRdbNotKnown.Visibility = Visibility.Visible;
              this.iRdbDfrAdmin.IsChecked = true;
              this.iRdbDfrAdmin_Checked(null);
              this.sAdminReason = this.objSlotDetailVM.AdminReason;
              if (this.objSlotDetailVM.Status == SlotStatus.DEFERDUENOW) {
                  this.iRdbNotKnown.IsEnabled = false;
              }
              else if (this.objSlotDetailVM.Status == SlotStatus.DEFEROVERDUE) {
                  this.iRdbNotKnown.IsEnabled = true;
              }
          }
          else if (this.objSlotDetailVM.Status == SlotStatus.PATIENTSELFADMIN) {
              this.iRdbNotKnown.Visibility = Visibility.Collapsed;
              this.iRdbDfrAdmin.Visibility = Visibility.Collapsed;
              this.iRdbSelfAdmin.IsChecked = true;
              this.SelfAdminChkDefaultFlag = true;
          }
          else if (this.objSlotDetailVM.Status == SlotStatus.OVERDUE || this.objSlotDetailVM.Status == SlotStatus.DEFEROVERDUE || this.objSlotDetailVM.Status == SlotStatus.HOMELEAVE || this.objSlotDetailVM.Status == SlotStatus.NOTYETRECORDED) {
              this.iRdbNotKnown.Visibility = Visibility.Visible;
              if (String.Equals(this.objSlotDetailVM.Status, SlotStatus.HOMELEAVE) && !this.objSlotDetailVM.IsNextHomeLeaveSlotExists) {
                  this.iRdbDfrAdmin.Visibility = Visibility.Visible;
              }
          }
          else if (this.objSlotDetailVM.Status == SlotStatus.PLANNED || this.objSlotDetailVM.Status == SlotStatus.DUENOW) {
              this.iRdbNotKnown.Visibility = Visibility.Visible;
              this.iRdbNotKnown.IsEnabled = false;
          }
      }
      if (String.Compare(this.strDoseType, DoseTypeCode.CONDITIONAL) == 0 && !this.IsConditionalExists) {
          this.cboDoseUOM.Visibility = Visibility.Visible;
          this.lblDoseUoM.Visibility = Visibility.Collapsed;
      }
      else {
          this.cboDoseUOM.Visibility = Visibility.Collapsed;
          this.lblDoseUoM.Visibility = Visibility.Visible;
      }
      this.cboExpiryDate.SelectedDateTime = DateTime.MinValue;
      this.cboExpiryDate.IsConstrainEntry = true;
      this.cboExpiryDate.RangeStartDate = this.CurrentDt.Date;
      this.cboExpiryDate.RangeEndDate = DateTime.MaxValue.Date.AddDays(-1);
      this.cboExpiryDate.PromptOutOfRange = false;
      if (this.bIsPRN) {

      }
      else if (this.objSlotDetailVM.PrescriptionStartDate.Date >= this.CurrentDt.Date) {
          this.dtpDateTimeGivenText.RangeStartDate = this.CurrentDt.Date;
          this.dtpDateTimeGivenText.RangeEndDate = this.CurrentDt;
      }
      else if (this.objSlotDetailVM.PrescriptionStartDate.Date < this.CurrentDt.Date) {
          this.dtpDateTimeGivenText.RangeStartDate = this.objSlotDetailVM.PrescriptionStartDate.Date;
          this.dtpDateTimeGivenText.CurrentDateTime = this.objSlotDetailVM.ScheduledDTTM;
          this.dtpDateTimeGivenText.RangeEndDate = this.CurrentDt;
      }
      if ((this.objSlotDetailVM.IsInfusionItem) || (this.objSlotDetailVM.MultiRoute_Type != MultiRouteType.Single_Route) || (this.objSlotDetailVM.DrugDetail != null && this.objSlotDetailVM.DrugDetail.IsInfusion)) {
          this.IsBolus = true;
          this.sMultiRoute = Convert.ToString(this.objSlotDetailVM.MultiRoute_Type);
          this.iRdbSelfAdmin.Visibility = Visibility.Collapsed;
          if (this.objSlotDetailVM.MultiRoute_Type == MultiRouteType.Non_Infusion_Routes) {
              this.HideInfBolusItems();
          }
          else if (String.IsNullOrEmpty(this.objSlotDetailVM.Status) || (!String.IsNullOrEmpty(this.objSlotDetailVM.Status) && (String.Equals(this.objSlotDetailVM.Status, SlotStatus.DUENOW) || String.Equals(this.objSlotDetailVM.Status, SlotStatus.OVERDUE) || String.Equals(this.objSlotDetailVM.Status, SlotStatus.PLANNED) || String.Equals(this.objSlotDetailVM.Status, SlotStatus.NOTYETRECORDED)))) {
              this.ShowInfBolusItems();
          }
      }
      else
        this.HideInfBolusItems();
        
      if (this.objSlotDetailVM != null && this.objSlotDetailVM.DrugDetail != null && this.objSlotDetailVM.DrugDetail.Tag != null) {
          var oTagDrugHeaderdetail: TagDrugHeaderDetail = <TagDrugHeaderDetail>(this.objSlotDetailVM.DrugDetail.Tag as TagDrugHeaderDetail);
          if (oTagDrugHeaderdetail != null) {
              this.objslotVM.IsMedScanExcluded = oTagDrugHeaderdetail.IsMedScanExcluded;
              this.objslotVM.ScanRecMedMultiRoute = oTagDrugHeaderdetail.MultiRoute_Type;
          }
      }
      this.cmdScanRecMedication.Visibility = ((this.iRdbGiven.IsChecked == true || this.iRdbSelfAdmin.IsChecked == true) && !this.objslotVM.IsMedScanExcluded) ? Visibility.Visible : Visibility.Collapsed;
      this.SetIntialAction();

      if (this.iRdbGiven.IsChecked)
        this.iRdbGiven_Checked(null);
      else if (this.iRdbSelfAdmin.IsChecked)
        this.iRdbSelfAdmin_Checked(null);
      else if (this.iRdbNotGiven.IsChecked)
        this.iRdbNotGiven_Checked(null);
    
      this.ChildWindow_Loaded();
  }
  SetIntialAction(): void {
      if(this.iRdbGiven.IsChecked == true)
          this.OldAction = CConstants.ActionGiven;
      else if (this.iRdbNotGiven.IsChecked == true)
          this.OldAction = CConstants.ActionNotGiven;
      else if (this.iRdbSelfAdmin.IsChecked == true)
          this.OldAction = CConstants.ActionSelfAdmin;
      else if (this.iRdbNotKnown.IsChecked == true)
          this.OldAction = CConstants.ActionNotKnown;
      else if (this.iRdbDfrAdmin.IsChecked == true)
          this.OldAction = CConstants.ActionDfrAdmin;
  }
  objService_GetPatientPersonalCarerCompleted(e: GetPatientPersonalCarerCompletedEventArgs): void {
      if(e.Error != null)
          return;
      var objRes: CResMsgGetPatientPersonalCarer = e.Result;
      if (objRes != null && objRes.oPersonalCarer != null && objRes.oPersonalCarer.Count > 0) {
          this.personalCarers = new ObservableCollection<CListItem>();

          for (let i: number = 0; i < objRes.oPersonalCarer.Count; i++) {
              if (String.Equals(objRes.oPersonalCarer[i].RPStatus, "D"))
                  continue;
              var item: CListItem = new CListItem();
              item.DisplayText = String.Concat(objRes.oPersonalCarer[i].SurName, " ", objRes.oPersonalCarer[i].ForeName);
              item.Value = objRes.oPersonalCarer[i].PersonalCarerOID;
              item.Tag = objRes.oPersonalCarer[i].Relationship;
              this.personalCarers.Add(item);
              this.conceptCodes.Append(objRes.oPersonalCarer[i].Relationship);
              this.conceptCodes.Append("~^~");
          }
          if (this.personalCarers != null && this.personalCarers.Count > 0) {
              if (MedicationCommonConceptCodeData.ViewConceptCodes == null)
                  MedicationCommonConceptCodeData.ViewConceptCodes = new ObservableCollection();
              if (this.conceptCodes != null && this.conceptCodes.Length > 0)
                  this.resolvedConceptCodes = new ObservableCollection<CListItem>(MCommonBB.GetResolvedSupplyInstTermText(this.conceptCodes));
              if (this.objVm != null && this.objVm.AdministrationDetail == null)
                  this.objVm.AdministrationDetail = new AdministrationDetailVM();
              this.objVm.AdministrationDetail.ParentCarerList = this.personalCarers;
              if (this.personalCarers.Count == 1) {
                  this.objVm.AdministrationDetail.AdminByPersonalCarer = this.personalCarers[0];
                  this.objVm.AdministrationDetail.AdminByPersonalCarerOID = !String.IsNullOrEmpty(this.personalCarers[0].Value) ? Convert.ToInt64(this.personalCarers[0].Value) : 0;
                  this.SetParentCarerComboText(this.personalCarers[0].DisplayText);
              }
              else {
                  this.objVm.AdministrationDetail.AdminByPersonalCarerOID = 0;
                  this.SetParentCarerComboText(String.Empty);
              }
          }
      }
      else {
          this.objVm.AdministrationDetail.AdminByPersonalCarerOID = 0;
          this.cboParentCarer.IsEnabled = false;
          if(this.rdbparent.IsChecked)
            this.SetParentCarerComboText(this.sParentCarer);
      }

      this.cboRoute.SelectedIndex = (this.cboRoute.Items != null && this.cboRoute.Items.Count() == 1) ? 0 : -1;
  }
  dtpDateTimeGivenText_OnDateChange(sender: Object, e: DateChangeEventArgs): void {
      var dt: DateTime = DateTime.MinValue;
      if((e != null) && (DateTime.TryParse(e.DateValue, (o) => { dt = o; })))
      this.SetTimeBoxValue(dt);
  }
  SetTimeBoxValue(SelectedDate: DateTime): void {
      if(SelectedDate != null) {
          if (SelectedDate < this.CurrentDt.Date) {
              this.timeDateTimeGivenText.Minimum = null;
              this.timeDateTimeGivenText.Maximum = null;
          }
          else {
              if (this.objVm != null && this.objVm.AdministrationDetail != null && this.objVm.AdministrationDetail.AdministeredDateTime != null) {
                  this.timeDateTimeGivenText.Minimum = new DateTime(this.CurrentDt.Year, this.CurrentDt.Month, this.CurrentDt.Day, 0, 0, 0);
              }
          }
      }
  }
  timeMessageBox_YesNo(sender: Object, e: MessageEventArgs): void {
      Busyindicator.SetStatusIdle("Administration");
      if(e.MessageBoxResult == MessageBoxResult.Yes) {
          this.objslotVM.IsSubmitInProgress = true;
          Busyindicator.SetStatusBusy("Administration", true);
          this.dateflag = true;
          this.cmdOk_Click();
      }
      else {
          this.timeDateTimeGivenText.Focus();
          this.objslotVM.IsSubmitInProgress = false;
      }
  }
  private CheckMandatoryFields(): boolean {
      var objiMessageBox: iMessageBox = new iMessageBox();
      objiMessageBox.Closed = (s,e) => { this.objiMessageBox_Closed(objiMessageBox,e); } ;

      if (this.dtpDateTimeGivenText.IsOpenError) {
          this.dtpDateTimeGivenText.IsOpenError = false;
          return true;
      }
      else if (this.cboExpiryDate.IsOpenError) {
          this.cboExpiryDate.IsOpenError = false;
          return true;
      }
      if (this.iRdbGiven.IsChecked == true || this.iRdbSelfAdmin.IsChecked == true) {
          if (((String.IsNullOrEmpty(this.sAdminMethod) && (String.Compare(this.sItemType, CConstants.Formulary_Drug) == 0 || (String.Compare(this.sItemType, CConstants.Appliance) == 0 && !this.txtDose.IsEnabled && String.Compare(this.strDoseType, DoseTypeCode.CONDITIONAL) == 0) || (String.Compare(this.sItemType, CConstants.Appliance) == 0 && this.txtDose.IsEnabled && (String.Compare(this.strDoseType, DoseTypeCode.DOSAGERANGE) == 0 || String.Compare(this.strDoseType, DoseTypeCode.STEPPEDVARIABLE) == 0)))) || String.Equals(this.IdentifyingType, CConstants.NONCATALOGUEITEM) || String.Equals(this.IdentifyingType, CConstants.Precatalog)) && (String.IsNullOrEmpty(this.txtDose.Text) || Convert.ToDecimal(this.txtDose.Text) == 0)) {
              Busyindicator.SetStatusIdle("Administration");
              objiMessageBox.Message = "Dose value cannot be zero or empty.";
              objiMessageBox.IconType = MessageBoxType.Information;
              objiMessageBox.MessageButton = MessageBoxButton.OK;
              objiMessageBox.Title = "LORENZO";
              objiMessageBox.Tag = "Dose";
              objiMessageBox.Show();
              return true;
          }
          else if (((String.IsNullOrEmpty(this.sAdminMethod) && (String.Compare(this.sItemType, CConstants.Formulary_Drug) == 0 || (String.Compare(this.sItemType, CConstants.Appliance) == 0 && !this.txtDose.IsEnabled && String.Compare(this.strDoseType, DoseTypeCode.CONDITIONAL) == 0) || (String.Compare(this.sItemType, CConstants.Appliance) == 0 && this.txtDose.IsEnabled && (String.Compare(this.strDoseType, DoseTypeCode.DOSAGERANGE) == 0 || String.Compare(this.strDoseType, DoseTypeCode.STEPPEDVARIABLE) == 0)))) || String.Equals(this.IdentifyingType, CConstants.NONCATALOGUEITEM) || String.Equals(this.IdentifyingType, CConstants.Precatalog)) && (this.txtDose.Text.ToString().StartsWith("."))) {
              Busyindicator.SetStatusIdle("Administration");
              objiMessageBox.Message = "Please enter an appropriate dose in its entirety without a leading decimal point.";
              objiMessageBox.IconType = MessageBoxType.Information;
              objiMessageBox.MessageButton = MessageBoxButton.OK;
              objiMessageBox.Title = "LORENZO";
              objiMessageBox.Tag = "Dose";
              objiMessageBox.Show();
              return true;
          }
          else if (((String.IsNullOrEmpty(this.sAdminMethod) && (String.Compare(this.sItemType, CConstants.Formulary_Drug) == 0 || String.Compare(this.sItemType, CConstants.Appliance) == 0)) || String.Equals(this.IdentifyingType, CConstants.NONCATALOGUEITEM) || String.Equals(this.IdentifyingType, CConstants.Precatalog)) && !String.IsNullOrEmpty(this.txtDose.Text) && this.cboDoseUOM.Visibility == Visibility.Visible && this.cboDoseUOM.IsEnabled && String.IsNullOrEmpty(this.cboDoseUOM.GetValue())) {
              Busyindicator.SetStatusIdle("Administration");            
              objiMessageBox.Message = "Select dose UOM, this field is mandatory.";
              objiMessageBox.IconType = MessageBoxType.Information;
              objiMessageBox.MessageButton = MessageBoxButton.OK;
              objiMessageBox.Title = "LORENZO";
              objiMessageBox.Tag = "Doseuom";
              objiMessageBox.Show();
              return true;
          }
          else if (String.IsNullOrEmpty(this.cboRoute.GetValue()) && String.Compare(this.sItemType, CConstants.Formulary_Drug) == 0) {
              Busyindicator.SetStatusIdle("Administration");
              objiMessageBox.Message = "Select route, this field is mandatory.";
              objiMessageBox.IconType = MessageBoxType.Information;
              objiMessageBox.MessageButton = MessageBoxButton.OK;
              objiMessageBox.Title = "LORENZO";
              objiMessageBox.Tag = "route";
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
          else if ((String.IsNullOrEmpty(this.sfsAdministeredby.searchText) && this.rdbCareProvider.IsChecked && this.rdbCareProvider.IsChecked) || (this.cboParentCarer.IsEnabled && this.cboParentCarer.SelectedItem !=null && this.cboParentCarer.SelectedItem != undefined && String.IsNullOrEmpty(this.cboParentCarer.SelectedItem.DisplayText) && this.rdbparent.IsChecked && this.rdbparent.IsChecked)) {
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
              objiMessageBox.Message = "Enter witnessed by, this field is mandatory.";
              objiMessageBox.IconType = MessageBoxType.Information;
              objiMessageBox.MessageButton = MessageBoxButton.OK;
              objiMessageBox.Title = "LORENZO";
              objiMessageBox.Tag = "witnessBy";
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
              else if (this.objVm != null && this.objVm.AdministrationDetail !=null && String.IsNullOrEmpty(this.objVm.AdministrationDetail.ConcentrationVolume) || (Number.TryParse(this.objVm.AdministrationDetail.ConcentrationVolume, (o) => { nConcentrationStrength = o; })) && nConcentrationVol <= 0) {
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
      else if (this.iRdbDfrAdmin.IsChecked == true) {
          if (String.IsNullOrEmpty(this.cboResFordefer.GetValue())) {
              Busyindicator.SetStatusIdle("Administration");
              objiMessageBox.Message = "Enter reason for defer, this field is mandatory.";
              objiMessageBox.IconType = MessageBoxType.Information;
              objiMessageBox.MessageButton = MessageBoxButton.OK;
              objiMessageBox.Title = "LORENZO";
              objiMessageBox.Tag = "ReasonDefer";
              objiMessageBox.Show();
              return true;
          }
      }
      if (this.lblComments.Mandatory == true && String.IsNullOrEmpty(this.txtComments.Text)) {
          Busyindicator.SetStatusIdle("Administration");
          objiMessageBox.Message = "Enter comments, this field is mandatory.";
          objiMessageBox.Title = "LORENZO";
          objiMessageBox.IconType = MessageBoxType.Information;
          objiMessageBox.MessageButton = MessageBoxButton.OK;
          objiMessageBox.Tag = "Comments";
          objiMessageBox.Show();
          return true;
      }
      if (this.objVm != null && this.objVm.AdministrationDetail != null && this.objVm.AdministrationDetail.AdministeredDate != DateTime.MinValue && this.dtpDateTimeGivenText.Visibility == Visibility.Visible) {
          var dtGivenDateTime: DateTime = this.timeDateTimeGivenText.Value == null ? DateTime.MinValue : this.timeDateTimeGivenText.Value;
          var dtAdministeredDTTM: DateTime = this.objVm.AdministrationDetail.AdministeredDate.Date.AddTime(dtGivenDateTime);
          var threshold: number = (!this.bIsPRN || this.sIsPRNWithSchedule) ? MedChartData.DuenessThreshold : 0;
          if (this.PrescriptionItemStartDTTM != DateTime.MinValue && ((dtAdministeredDTTM.ToUniversalTime() < this.PrescriptionItemStartDTTM.ToUniversalTime() && String.Equals(this.strSlotStatus, SlotStatus.PLANNED)) || (!String.Equals(this.strSlotStatus, SlotStatus.PLANNED) && dtAdministeredDTTM.ToUniversalTime() < (this.PrescriptionItemStartDTTM.ToUniversalTime().AddMinutes(-threshold))))) {
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
          else if (this.PrescriptionItemEndDTTM != DateTime.MinValue && dtAdministeredDTTM.ToUniversalTime() > this.PrescriptionItemEndDTTM.ToUniversalTime() && !String.Equals(this.PrescItemStatus, CConstants.DISCONTINUED)) {
              if (this.AfterEnd) {
                  Busyindicator.SetStatusIdle("Administration");
                  var iMsgBox: iMessageBox = ObjectHelper.CreateObject(new iMessageBox(), {
                      Title: "LORENZO",
                      Message: String.Format(Resource.MedicationAdministrator.RecordAdminAfterEndDTTM_ErrMsg, "\n\n"),
                      MessageButton: MessageBoxButton.YesNo,
                      IconType: MessageBoxType.Question
                  });
                  iMsgBox.Show();
                  iMsgBox.MessageBoxClose  = (s,e) => { this.RecordAdminAfterEndDTTM_YesNo(s,e); } ;
              }
              return this.AfterEnd;
          }
          else if (this.objslotVM != null && this.objslotVM.DrugDetail != null && this.objslotVM.DrugDetail.Tag != null && (this.objslotVM.DrugDetail.Tag instanceof TagDrugHeaderDetail) && String.Equals(this.PrescItemStatus, CConstants.DISCONTINUED) && (<TagDrugHeaderDetail>(this.objslotVM.DrugDetail.Tag as TagDrugHeaderDetail)) != null && (<TagDrugHeaderDetail>(this.objslotVM.DrugDetail.Tag as TagDrugHeaderDetail)).CancelDiscontinuedDttm != DateTime.MinValue && (<TagDrugHeaderDetail>(this.objslotVM.DrugDetail.Tag as TagDrugHeaderDetail)).CancelDiscontinuedDttm.ToUniversalTime() < dtAdministeredDTTM.ToUniversalTime()) {
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
          /* else if (this.objslotVM.IsParacetamolIngredient && !this.objslotVM.IsAnyParacetamolAdministeredInGivenPeriod && this.sParacetamolRecentlyAdministered <= 0) {
              if (this.sParacetamolRecentlyAdministered == -1) {
                  var oSlotHelper: SlotAdministrationHelper = new SlotAdministrationHelper();
                  oSlotHelper.TriggerParacetamolWarningEvent = (s,e) => { this.oSlotHelper_TriggerParacetamolWarningEvent(e) };
                  oSlotHelper.IsAnyParacetamolAdministered(dtAdministeredDTTM, this.lnPrescriptionSchOID);
                  Busyindicator.SetStatusBusy("CheckParaAdministered");
                  this.sParacetamolRecentlyAdministered = 0;
              }
              return true;
          } */
      }
      if (this.iRdbGiven.IsChecked == true || this.iRdbSelfAdmin.IsChecked == true) {
          var dt: DateTime = this.timeDateTimeGivenText.Value;
          if (dt.Value.ToString("HH:mm") == "00:00") {
              Busyindicator.SetStatusIdle("Administration");
              var iMsgBox: iMessageBox = ObjectHelper.CreateObject(new iMessageBox(), {
                  Title: "LORENZO",
                  Message: Resource.MedicationChart.Recordtimemandatory,
                  MessageButton: MessageBoxButton.YesNo,
                  IconType: MessageBoxType.Question
              });
              iMsgBox.MessageBoxClose  = (s,e) => { this.timeMessageBox_YesNo(s,e); } ;
              iMsgBox.Show();
              return (true);
          }
      }
      return false;
  }
  oSlotHelper_TriggerParacetamolWarningEvent(bParacetamolAdministered: boolean): void {
      Busyindicator.SetStatusIdle("CheckParaAdministered");
      if(bParacetamolAdministered) {
          var iMsgBox: iMessageBox = ObjectHelper.CreateObject(new iMessageBox(), {
              Title: "LORENZO",
              Message: Resource.MedicationAdministrator.ParacetamolAdministration_WarningMsg,
              MessageButton: MessageBoxButton.YesNo,
              Width: 420,
              Height: 180,
              IconType: MessageBoxType.Question
          });
          iMsgBox.Show();
          iMsgBox.MessageBoxClose = (s, e) => { this.ParacetamolWarningMsgClose(s, e); };
      }
      else {
          this.sParacetamolRecentlyAdministered = 1;
          this.cmdOk_Click();
      }
  }
  private ParacetamolWarningMsgClose(sender: Object, e: MessageEventArgs): void {
      Busyindicator.SetStatusIdle("Administration");
      if(e.MessageBoxResult == MessageBoxResult.Yes) {
          this.sParacetamolRecentlyAdministered = 1;
          this.cmdOk_Click();
      }
      else {
          this.sParacetamolRecentlyAdministered = -1;
      }
      this.objslotVM.IsSubmitInProgress = false;
  }
  private RecordAdminAfterEndDTTM_YesNo(sender: Object, e: MessageEventArgs): void {
      Busyindicator.SetStatusIdle("Administration");
      if(e.MessageBoxResult == MessageBoxResult.Yes) {
          this.AfterEnd = false;
          this.cmdOk_Click();
      }
      this.objslotVM.IsSubmitInProgress = false;
  }
  objiMessageBox_Closed(sender: Object, e: MessageEventArgs): void {
      Busyindicator.SetStatusIdle("Administration");
      var objiMessageBox: iMessageBox = <iMessageBox>(sender as iMessageBox);
      if(String.Compare(objiMessageBox.Tag.ToString(), "Dose") == 0) {
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
      else if (String.Compare(objiMessageBox.Tag.ToString(), "ReasonDefer") == 0)
          this.cboResFordefer.Focus();
      else if (String.Compare(objiMessageBox.Tag.ToString(), "Comments") == 0)
          this.txtComments.Focus();
      else if (String.Compare(objiMessageBox.Tag.ToString(), "AdminBy") == 0) {
          if (String.IsNullOrEmpty(this.sfsAdministeredby.Text) && this.rdbCareProvider.IsChecked) {
              this.sfsAdministeredby.Focus();
          }
          else if (this.cboParentCarer.IsEnabled && this.cboParentCarer.SelectedItem !=null && String.IsNullOrEmpty(this.cboParentCarer.SelectedItem.DisplayText) && this.rdbparent.IsChecked) {
              this.cboParentCarer.Focus();
          }
      }
      else if (String.Compare(objiMessageBox.Tag.ToString(), "route") == 0)
          this.cboRoute.Focus();
      else if (String.Compare(objiMessageBox.Tag.ToString(), "WitnessBy") == 0) {
          this.sfsWitnessedby.ClearAll();
          this.sfsWitnessedby.Focus();
      }
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
      this.objslotVM.IsSubmitInProgress = false;
  }
  private ValidateData(): boolean
  {
      var IsValidate: boolean = false;
      if (this.iRdbGiven.IsChecked == true || this.iRdbSelfAdmin.IsChecked == true) {
          if (String.IsNullOrEmpty(this.sAdminMethod) && (String.Equals(this.sItemType, CConstants.Formulary_Drug) || String.Equals(this.sItemType, CConstants.Appliance) || String.Equals(this.IdentifyingType, CConstants.NONCATALOGUEITEM) || String.Equals(this.IdentifyingType, CConstants.Precatalog))) {
              if ((String.Compare(this.strDoseType, DoseTypeCode.NORMAL) == 0 || String.Compare(this.strDoseType, DoseTypeCode.TITRATED) == 0) && !String.Equals(this.sItemType, CConstants.Appliance)) {
                  if (String.IsNullOrEmpty(this.strDose)) {
                      IsValidate = true;
                  }
                  else if (!String.IsNullOrEmpty(this.objVm.AdministrationDetail.Dose) && !String.IsNullOrEmpty(this.strDose)) {
                      if (Number.Parse(this.objVm.AdministrationDetail.Dose) > (Number.Parse(this.strDose)) || Number.Parse(this.objVm.AdministrationDetail.Dose) < (Number.Parse(this.strDose)) || ((this.objVm.AdministrationDetail.DoseUOMOID != null) && String.Compare(this.objVm.AdministrationDetail.DoseUOMOID.Value, Convert.ToString(this.lnDoseValUOMOID)) != 0)) {
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
                  if (this.iRdbNotGiven.IsChecked == true || this.iRdbNotKnown.IsChecked == true || this.iRdbDfrAdmin.IsChecked == true) {
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
                                  if (Number.Parse(this.objVm.AdministrationDetail.Dose) > (Number.Parse(this.strDose)) || Number.Parse(this.objVm.AdministrationDetail.Dose) < (Number.Parse(this.strDose)) || ((this.objVm.AdministrationDetail.DoseUOMOID != null) && String.Compare(this.objVm.AdministrationDetail.DoseUOMOID.Value, Convert.ToString(this.lnDoseValUOMOID)) != 0)) {
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
  public cmdOk_Click(RecAdminDateFlag?:boolean): void {
      var validate_status: boolean = true;
      if (RecAdminDateFlag) {
        this.dtpDateTimeGivenText.IsOpenError = false;
        Busyindicator.SetStatusIdle("Administration");
      }
      if(!this.dateflag) {
          validate_status = this.CheckMandatoryFields();
        }
      if((!validate_status) || (this.dateflag)) {
        //   ObjectHelper.stopFinishAndCancelEvent(false);
        Busyindicator.SetStatusIdle("Administration");
          var oSlotHelper: SlotAdministrationHelper = new SlotAdministrationHelper();
          this.objVm.PrescriptionItemOID = this.objSlotDetailVM.PrescriptionItemOID;
          this.objVm.PresScheduleOID = this.objSlotDetailVM.PresScheduleOID;
          this.objVm.AmendedDoseUOMOID = this.objSlotDetailVM.AmendedDoseUOMOID;
          this.objVm.AmendedDoseVal = this.objSlotDetailVM.AmendedDoseVal;
          this.objVm.IsRecordAdmin = true;
          this.objVm.LorenzoID = this.objSlotDetailVM.LorenzoID;
          this.objVm.Status = this.objSlotDetailVM.Status;
          this.objVm.IsParacetamolIngredient = this.objslotVM.IsParacetamolIngredient;
          this.objVm.IsAnyParacetamolAdministeredInGivenPeriod = this.objslotVM.IsAnyParacetamolAdministeredInGivenPeriod;

          if (this.rdbparent.IsChecked == true) {
              if (this.chkNoParentCarerListed.IsChecked || this.personalCarers == null)
                  this.objVm.AdministrationDetail.AdministeredBy = this.sParentCarer;
              else if (this.objVm.AdministrationDetail.AdminByPersonalCarer.DisplayText)
                  this.objVm.AdministrationDetail.AdministeredBy = this.sParentCarer + " - " + this.objVm.AdministrationDetail.AdminByPersonalCarer.DisplayText;
          }
          if (!this.bOkClicked) {
              this.objVm.AmendedPresOID = this.objSlotDetailVM.AmendedPresOID;
              this.objVm.PrescriptionItemStatus = this.objSlotDetailVM.PrescriptionItemStatus;
              this.bOkClicked = true;
          }
          oSlotHelper.RefreshRecordAdminEvent = (s,e) => { this.oSlotHelper_RefreshRecordAdminEvent(s, e) };
          oSlotHelper.GetSlotDetails(this.objVm);
      }
  }
  private LaunchOverrideScan(): void {
    //   ObjectHelper.stopFinishAndCancelEvent(true);
      Busyindicator.SetStatusBusy("OverrideScanRecordMed");
      this.oOverrideBarcodeScan = new OverrideBarcodeScan();
      this.oOverrideBarcodeScan.DataContext = new OverrideBarcodeScanVM(ValueDomain.SCANPATWBD, Resource.OverrideBarcodeScan.BarcodeMsgTxt, this.lnPrescriptionSchOID);
      this.oOverrideBarcodeScan.onDialogClose = this.oOverrideBarcodeScan_Closed;
      AppActivity.OpenWindow(CConstants.OVERRIDESCANTITLE, this.oOverrideBarcodeScan, (s, e) => { this.oOverrideBarcodeScan_Closed(s); }, String.Empty, false, 300, 420, false, WindowButtonType.OkCancel, null, null);
  }
  private LaunchMedicationOverrideScan(): void {
    // ObjectHelper.stopFinishAndCancelEvent(true);
      this.oOverrideBarcodeScan = new OverrideBarcodeScan();
      this.oOverrideBarcodeScan.DataContext = new OverrideBarcodeScanVM(ValueDomain.SCANMEDS, Resource.OverrideBarcodeScan.BarcodeMedicationMsgTxt, this.lnPrescriptionSchOID);
      this.oOverrideBarcodeScan.onDialogClose = this.oOverrideMedBarcodeScan_Closed;
      AppActivity.OpenWindow(CConstants.OVERRIDESCANTITLE, this.oOverrideBarcodeScan, (s, e) => { this.oOverrideMedBarcodeScan_Closed(s); }, String.Empty, false, 300, 420, false, WindowButtonType.OkCancel, null, null);
  }
  private ValidatePatientWBScanAndSubmitRecordAdministration(): void {
      if(!MedChartData.IsPatWBBarcodeScanOverriden && !MedChartData.IsMedBarcodeScanOverriden && !this.IsPatWristBandOverridden && MedChartData.IsPatWBScanMandatory && !MedChartData.IsPatWBScanSuccess && this.iRdbGiven.IsChecked == true) {
          this.LaunchOverrideScan();
      }
      else if (this.objslotVM != null && !this.objslotVM.IsCustomiseMedScan && !this.objslotVM.IsMedScanExcluded && !MedChartData.IsMedBarcodeScanOverriden && MedChartData.IsMedScanMandatory && !MedChartData.IsMedScanSuccess && this.iRdbGiven.IsChecked == true) {
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
              if (this.objslotVM != null && !this.objslotVM.IsCustomiseMedScan && !this.objslotVM.IsMedScanExcluded && MedChartData.IsMedScanMandatory && !MedChartData.IsMedScanSuccess && this.iRdbGiven.IsChecked == true) {
                  if (this.lstCMedBarcodeScanOverrideDetail == null)
                      this.lstCMedBarcodeScanOverrideDetail = new ObservableCollection<CMedBarcodeScanOverrideDetail>();
                  this.lstCMedBarcodeScanOverrideDetail.Add(oManageBarcodeHelper.SetOverrideReason(ValueDomain.SCANMEDS, MedChartData.MedScanOverrideReason, MedChartData.MedScanOverrideComments));
              }
          }
          else {
              this.AddPatientWBOverrideReasonFromContext();
          }
          this.SubmitrecordAdministration();
      }
  }
  AddPatientWBOverrideReasonFromContext(): void {
      if(MedChartData.IsPatWBBarcodeScanOverriden) {
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
      if(args.Result == AppDialogResult.Ok) {
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
              else if (this.objslotVM != null && !this.objslotVM.IsCustomiseMedScan && !this.objslotVM.IsMedScanExcluded && MedChartData.IsMedScanMandatory && !MedChartData.IsMedScanSuccess) {
                  if (!MedChartData.IsMedBarcodeScanOverriden) {
                      this.LaunchMedicationOverrideScan();
                  }
                  else if (MedChartData.IsMedBarcodeScanOverriden) {
                      if (this.lstCMedBarcodeScanOverrideDetail == null)
                          this.lstCMedBarcodeScanOverrideDetail = new ObservableCollection<CMedBarcodeScanOverrideDetail>();
                      var oManageBarcodeHelper: ManageBarcodeHelper = new ManageBarcodeHelper();
                      this.lstCMedBarcodeScanOverrideDetail.Add(oManageBarcodeHelper.SetOverrideReason(ValueDomain.SCANMEDS, MedChartData.MedScanOverrideReason, MedChartData.MedScanOverrideComments));
                      this.SubmitrecordAdministration();
                  }
              }
              else {
                  this.SubmitrecordAdministration();
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
          this.objslotVM.IsSubmitInProgress = false;
          Busyindicator.SetStatusIdle("Administration");
      }
  }
  oOverrideMedBarcodeScan_Closed(args: AppDialogEventargs): void {
      if(args.Result == AppDialogResult.Ok) {
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
              this.SubmitrecordAdministration();
          }
      }
      else if (args.Result == AppDialogResult.Cancel) {
          this.oOverrideBarcodeScan.appDialog.DialogResult = false;
          this.objslotVM.IsSubmitInProgress = false;
          Busyindicator.SetStatusIdle("Administration");
      }
  }
  private SubmitrecordAdministration(): void {
      MedChartData.IsMedScanSuccess = false;
      var nUserOID: number ;
      var objSlotDetailVm: SlotDetailVM = new SlotDetailVM();
      var objService: MedicationAdministrationWSSoapClient = new MedicationAdministrationWSSoapClient();
      objService.RecordAdministrationCompleted = (s, ea) => {
          if (ea.Result != null) {
              var objRes: CResMsgRecordAdministration = ea.Result;
              if (objRes.oContextInformation != null && objRes.oContextInformation.Errors.Count <= 0)
                  objSlotDetailVm = this.objVm;
              objSlotDetailVm.CurrentServerDate = this.CurrentDt;
              if (objRes.MedAdminOid > 0) {
                  objSlotDetailVm.AdministrationDetail.MedAdminOID = objRes.MedAdminOid;
              }
              objSlotDetailVm.IsReloadChartRequired = this.IsReloadChartReq = objRes.IsPresItemStatusUpdated;
              if (objRes.IsPresItemStatusUpdated) {
                  this.PrescriptionItemStatus = CConstants.COMPLETED;
                  objSlotDetailVm.CurrentPrescriptionItemStatus = CConstants.COMPLETED;
              }
              objSlotDetailVm.CDWardRegItemOID = objRes.CDRegItemOID;
              objSlotDetailVm.PatientName = objRes.PatName;
              objSlotDetailVm.PatientPASID = objRes.PatientPASID;
          }
          if (this.bIsPRN && String.Equals(MedChartData.ChartStatus, CConstants.sChartSuspendedStatusCode) && MedChartData.SuspendedOn != DateTime.MinValue && this.SlotDate.Date >= MedChartData.SuspendedOn.Date) {
              objSlotDetailVm.AdministrationDetail.IsDuringHomeLeave = true;
          }
          else {
              objSlotDetailVm.AdministrationDetail.IsDuringHomeLeave = String.Equals(MedChartData.ChartStatus, CConstants.sChartSuspendedStatusCode) && !Common.IsRetrospectiveSlot(this.objslotVM.ScheduledDTTM, this.objslotVM.Status) ? true : false;
          }
          this.objslotVM.IsSubmitInProgress = false;
          objSlotDetailVm.IsSubmitInProgress = this.objslotVM.IsSubmitInProgress;
          this.DataContext = objSlotDetailVm;
          if (ea.Error == null)
              if (this.OnRecAdminFinishEvent != null)
                  this.OnRecAdminFinishEvent(this);
      };
      var objReq: CReqMsgRecordAdministration = new CReqMsgRecordAdministration();
      objReq.oContextInformation = CommonBB.FillContext();
      objReq.oContextInformation.PageInfo = PatientContext.EncounterOid.ToString();
      objReq.objSlotDetailBC = new SlotDetail();
      objReq.objSlotDetailBC.AdministrationDetail = new AdministrationDetail();
      if(this.iRdbDfrAdmin.IsChecked == true && this.objSlotDetailVM.IsUpdatePIStatusToCompleted == true) {
          objReq.objSlotDetailBC.IsUpdatePIStatusToCompleted = objReq.objSlotDetailBC.IsLastSlotCheckRequired = false;
      }
      else {
          objReq.objSlotDetailBC.IsLastSlotCheckRequired = this.IsLastSlotCheckRequired;
          objReq.objSlotDetailBC.IsUpdatePIStatusToCompleted = this.IsUpdatePIStatusToCompleted;
      }
      if (this.objslotVM != null && !String.IsNullOrEmpty(this.objslotVM.FreqPerodCode) && String.Equals(this.objslotVM.FreqPerodCode, CConstants.OnceOnlyPerodCode) && !String.IsNullOrEmpty(this.objslotVM.DoseType) && !String.Equals(this.objslotVM.DoseType, DoseTypeCode.STEPPED) && !String.Equals(this.objslotVM.DoseType, DoseTypeCode.STEPPEDVARIABLE) && !String.Equals(this.objslotVM.DoseType, DoseTypeCode.VARIABLE)) {
          objReq.objSlotDetailBC.IsOnceOnlyFrequency = true;
      }
      if (this.bIsPRN && String.Equals(MedChartData.ChartStatus, CConstants.sChartSuspendedStatusCode) && MedChartData.SuspendedOn != DateTime.MinValue && this.SlotDate.Date >= MedChartData.SuspendedOn.Date) {
          objReq.objSlotDetailBC.AdministrationDetail.IsDuringHomeLeave = true;
      }
      else {
          objReq.objSlotDetailBC.AdministrationDetail.IsDuringHomeLeave = String.Equals(MedChartData.ChartStatus, CConstants.sChartSuspendedStatusCode) && !Common.IsRetrospectiveSlot(this.objslotVM.ScheduledDTTM, this.objslotVM.Status) ? true : false;
      }
  objReq.objSlotDetailBC.PresItemENDTTM = this.PrescriptionItemEndDTTM;
  var JobRoleOID: number = 0;
  Number.TryParse(AppContextInfo.JobRoleOID, (o) => { JobRoleOID = o });
  if (this.objVm.AdministrationDetail.IsSupplyRequested == '1' || this.objVm.AdministrationDetail.IsSupplyRequested == '2') {
      objReq.objSlotDetailBC.LorenzoID = this.strLorenzoID;
      objReq.objSlotDetailBC.AdministrationDetail.IsWardStock = this.objVm.AdministrationDetail.IsWardStock;
      objReq.objSlotDetailBC.AdministrationDetail.IsSupplyRequested = this.objVm.AdministrationDetail.IsSupplyRequested;
      objReq.objSlotDetailBC.AdministrationDetail.RequisitionCACode = SLQueryCollection.GetQueryStringValue("MenuCode");
      objReq.objSlotDetailBC.AdministrationDetail.oRequisitionHistoryDetails = ObjectHelper.CreateObject(new RequisitionHistoryDetails(), {
          ServiceOID: MedChartData.ServiceOID,
          LocationOID: MedChartData.LocationOID,
          RoleOID: JobRoleOID
      });
  }
  if (this.IsAdministeredInAdvance) {
      objReq.objSlotDetailBC.AdministrationDetail.IsAdministeredInAdvance = true;
  }
  objReq.objSlotDetailBC.ScheduledDTTM = this.objVm.ScheduledDTTM;
  objReq.objSlotDetailBC.AdministrationDetail.RecordedAt = this.objVm.AdministrationDetail.RecordedAt = CommonBB.GetServerDateTime();
  objReq.objSlotDetailBC.AdministrationDetail.AdminComments = this.objVm.AdministrationDetail.AdminComments;
  if (this.rdbparent.IsChecked) {
      objReq.objSlotDetailBC.AdministrationDetail.AdministratorType = "PersonalCarer";
      if (this.objVm.AdministrationDetail.AdminByPersonalCarer != null) {
          objReq.objSlotDetailBC.AdministrationDetail.AdminByPersonalCarerOID = !String.IsNullOrEmpty(this.objVm.AdministrationDetail.AdminByPersonalCarer.Value) ? Convert.ToInt64(this.objVm.AdministrationDetail.AdminByPersonalCarer.Value) : 0;
      }
  }
  else if (this.rdbCareProvider.IsChecked) {
      objReq.objSlotDetailBC.AdministrationDetail.AdministeredByOID = !String.IsNullOrEmpty(this.objVm.AdministrationDetail.AdministeredByOID) ? Convert.ToInt64(this.objVm.AdministrationDetail.AdministeredByOID) : 0;
      objReq.objSlotDetailBC.AdministrationDetail.AdministratorType = "Users";
  }
  else if (this.rdbPatient.IsChecked) {
      objReq.objSlotDetailBC.AdministrationDetail.AdministratorType = "Patient";
  }
  this.objVm.AdministrationDetail.AdministratorType = objReq.objSlotDetailBC.AdministrationDetail.AdministratorType;
  this.objVm.AdministrationDetail.AdminByPersonalCarerOID = objReq.objSlotDetailBC.AdministrationDetail.AdminByPersonalCarerOID;
  objReq.objSlotDetailBC.AdministrationDetail.IsPersonalCarerNotListed = this.objVm.AdministrationDetail.IsPersonalCarerNotListed;
  objReq.objSlotDetailBC.AdministrationDetail.IsNoWitnessAvailable = Convert.ToBoolean(this.objVm.AdministrationDetail.IsNoWitnessAvialable);
  if (!String.IsNullOrEmpty(this.objVm.AdministrationDetail.WitnessByOID) && !objReq.objSlotDetailBC.AdministrationDetail.IsNoWitnessAvailable)
      objReq.objSlotDetailBC.AdministrationDetail.WitnessedByOID = Convert.ToInt64(this.objVm.AdministrationDetail.WitnessByOID);
  if (this.iRdbNotGiven.IsChecked != true && this.objVm.AdministrationDetail.ReasonNotGiven != null) {
      this.objVm.AdministrationDetail.ReasonNotGiven = null;
  }
  if (this.objVm.AdministrationDetail.ReasonNotGiven != null) {
      objReq.objSlotDetailBC.AdministrationDetail.AmendReasonCode = this.objVm.AdministrationDetail.ReasonNotGiven.Value;
  }
  else if (this.objVm.AdministrationDetail.ReasonForNotDefer != null) {
      objReq.objSlotDetailBC.AdministrationDetail.AmendReasonCode = this.objVm.AdministrationDetail.ReasonForNotDefer.Value;
  }
  if (this.objVm.AdministrationDetail.DoseDiscReasonCode != null && !String.IsNullOrEmpty(this.objVm.AdministrationDetail.DoseDiscReasonCode.Value)) {
      objReq.objSlotDetailBC.AdministrationDetail.DoseDiscReasonCode = this.objVm.AdministrationDetail.DoseDiscReasonCode.Value;
  }
  if (this.objVm.AdministrationDetail.DoseDiscComments != null && !String.IsNullOrEmpty(this.objVm.AdministrationDetail.DoseDiscComments)) {
      objReq.objSlotDetailBC.AdministrationDetail.DoseDiscComments = this.objVm.AdministrationDetail.DoseDiscComments;
  }
  if (!String.IsNullOrEmpty(this.strUserName))
      objReq.objSlotDetailBC.AdministrationDetail.RecordedBy = this.objVm.AdministrationDetail.RecordedBy = this.strUserName;
  if (this.iRdbGiven.IsChecked == true) {
      var dtGivenDateTime: DateTime = this.timeDateTimeGivenText.Value == null ? DateTime.MinValue : Convert.ToDateTime(this.timeDateTimeGivenText.Value);
      if (dtGivenDateTime != DateTime.MinValue && dtGivenDateTime.IsDaylightSavingTime()) {
          objReq.objSlotDetailBC.AdministrationDetail.AdministeredDate = dtGivenDateTime;
      }
      else {
          // SYED - to check
          //objReq.objSlotDetailBC.AdministrationDetail.AdministeredDate = new DateTime(this.objVm.AdministrationDetail.AdministeredDate.Date.AddMinutes(dtGivenDateTime.TimeOfDay.TotalMinutes).Ticks, DateTimeKind.Local);
          objReq.objSlotDetailBC.AdministrationDetail.AdministeredDate = dtGivenDateTime;
      }
      this.objVm.AdministrationDetail.AdministeredDate = objReq.objSlotDetailBC.AdministrationDetail.AdministeredDate;
      objReq.objSlotDetailBC.Status = SlotStatus.GIVEN;
      this.objVm.Status = objReq.objSlotDetailBC.Status;
      objReq.objSlotDetailBC.IsInfusion = this.objVm.IsInfusionItem;
  }
  else if (this.iRdbNotGiven.IsChecked == true) {
      objReq.objSlotDetailBC.AdministrationDetail.AdministeredDate = CommonBB.GetServerDateTime();
      this.objVm.AdministrationDetail.AdministeredDate = objReq.objSlotDetailBC.AdministrationDetail.AdministeredDate;
      objReq.objSlotDetailBC.Status = SlotStatus.NOTGIVEN;
      this.objVm.Status = objReq.objSlotDetailBC.Status;
      this.objVm.AdministrationDetail.AdministeredByOID = String.Empty;
      objReq.objSlotDetailBC.AdministrationDetail.AdministeredByOID = 0;
  }
  else if (this.iRdbSelfAdmin.IsChecked == true) {
      var dtSelfAdminDateTime: DateTime = this.timeDateTimeGivenText.Value == null ? DateTime.MinValue : Convert.ToDateTime(this.timeDateTimeGivenText.Value);
      if (dtSelfAdminDateTime != DateTime.MinValue && dtSelfAdminDateTime.IsDaylightSavingTime()) {
          objReq.objSlotDetailBC.AdministrationDetail.AdministeredDate = dtSelfAdminDateTime;
      }
      else {
          // SYED - to check
          // objReq.objSlotDetailBC.AdministrationDetail.AdministeredDate = new DateTime(this.objVm.AdministrationDetail.AdministeredDate.Date.AddMinutes(dtSelfAdminDateTime.TimeOfDay.TotalMinutes).Ticks, DateTimeKind.Local);
          objReq.objSlotDetailBC.AdministrationDetail.AdministeredDate = dtSelfAdminDateTime;
      }
      this.objVm.AdministrationDetail.AdministeredDate = objReq.objSlotDetailBC.AdministrationDetail.AdministeredDate;
      objReq.objSlotDetailBC.Status = SlotStatus.SELFADMINISTERED;
      this.objVm.Status = objReq.objSlotDetailBC.Status;
      if (!String.IsNullOrEmpty(AppContextInfo.UserOID)) {
          Number.TryParse(AppContextInfo.UserOID, (o) => { nUserOID = o });
      }
  }
  else if (this.iRdbNotKnown.IsChecked == true) {
      objReq.objSlotDetailBC.AdministrationDetail.AdministeredDate = CommonBB.GetServerDateTime();
      this.objVm.AdministrationDetail.AdministeredDate = objReq.objSlotDetailBC.AdministrationDetail.AdministeredDate;
      objReq.objSlotDetailBC.Status = SlotStatus.NOTKNOWN;
      this.objVm.Status = objReq.objSlotDetailBC.Status;
      this.objVm.AdministrationDetail.AdministeredByOID = String.Empty;
      objReq.objSlotDetailBC.AdministrationDetail.AdministeredByOID = 0;
  }
  else if (this.iRdbDfrAdmin.IsChecked == true) {
      objReq.objSlotDetailBC.AdministrationDetail.AdministeredDate = CommonBB.GetServerDateTime();
      this.objVm.AdministrationDetail.AdministeredDate = objReq.objSlotDetailBC.AdministrationDetail.AdministeredDate;
      objReq.objSlotDetailBC.Status = SlotStatus.DEFERADMIN;
      if (String.Compare(this.strSlotStatus, SlotStatus.DUENOW) == 0)
          this.objVm.Status = SlotStatus.DEFERDUENOW;
      else if (String.Compare(this.strSlotStatus, SlotStatus.OVERDUE) == 0 || String.Equals(this.strSlotStatus, SlotStatus.HOMELEAVE))
          this.objVm.Status = SlotStatus.DEFEROVERDUE;
      else if (String.Compare(this.strSlotStatus, SlotStatus.DEFEROVERDUE) == 0)
          this.objVm.Status = SlotStatus.DEFEROVERDUE;
      else if (String.Compare(this.strSlotStatus, SlotStatus.DEFERDUENOW) == 0)
          this.objVm.Status = SlotStatus.DEFERDUENOW;
      this.objVm.AdministrationDetail.AdministeredByOID = String.Empty;
      objReq.objSlotDetailBC.AdministrationDetail.AdministeredByOID = 0;
  }
  if (this.iRdbGiven.IsChecked == true || this.iRdbSelfAdmin.IsChecked == true) {
      objReq.objSlotDetailBC.AdministrationDetail.Dose = String.IsNullOrEmpty(this.sAdminMethod) ? !String.IsNullOrEmpty(this.objVm.AdministrationDetail.Dose) ? this.objVm.AdministrationDetail.Dose : null : null;
      objReq.objSlotDetailBC.AdministrationDetail.DoseUOM = String.IsNullOrEmpty(this.sAdminMethod) ? this.objVm.AdministrationDetail.lnDoseUOMOID > 0 ? Convert.ToString(this.objVm.AdministrationDetail.lnDoseUOMOID) : null : null;
      objReq.objSlotDetailBC.AdministrationDetail.DoseUOMOID = this.objVm.AdministrationDetail.lnDoseUOMOID;
      objReq.objSlotDetailBC.AdministrationDetail.DoseUomLorenzoID = String.IsNullOrEmpty(this.sAdminMethod) ? !String.IsNullOrEmpty(this.objVm.AdministrationDetail.strDoseUOMLzoID) ? this.objVm.AdministrationDetail.strDoseUOMLzoID : null : null;
      objReq.objSlotDetailBC.AdministrationDetail.SiteOID = this.objVm.AdministrationDetail.Site == null ? null : this.objVm.AdministrationDetail.Site.Value;
      objReq.objSlotDetailBC.AdministrationDetail.Site = this.objVm.AdministrationDetail.Site == null ? null : this.objVm.AdministrationDetail.Site.DisplayText;
      objReq.objSlotDetailBC.AdministrationDetail.ExpiryDate = this.objVm.AdministrationDetail.ExpiryDate;
      objReq.objSlotDetailBC.AdministrationDetail.RouteOID = this.objVm.AdministrationDetail.RouteOID == null ? null : this.objVm.AdministrationDetail.RouteOID.Value;
      objReq.objSlotDetailBC.AdministrationDetail.BatchNumber = this.objVm.AdministrationDetail.BatchNo;
      objReq.objSlotDetailBC.AdministrationDetail.ConcentrationStrength = !String.IsNullOrEmpty(this.objVm.AdministrationDetail.ConcentrationStrength) ? this.objVm.AdministrationDetail.ConcentrationStrength : String.Empty;
      if (this.objVm.AdministrationDetail.ConcentrationStrengthUOM != null && !String.IsNullOrEmpty(this.objVm.AdministrationDetail.ConcentrationStrengthUOM.Value)) {
          var tempStrengthUOM: UOM = new UOM();
          tempStrengthUOM.UOMId = Convert.ToInt64(this.objVm.AdministrationDetail.ConcentrationStrengthUOM.Value);
          tempStrengthUOM.UOMName = this.objVm.AdministrationDetail.ConcentrationStrengthUOM.DisplayText;
          objReq.objSlotDetailBC.AdministrationDetail.ConcentrationStrengthUOM = tempStrengthUOM;
      }
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
  else if (this.iRdbNotGiven.IsChecked == true || this.iRdbNotKnown.IsChecked == true || this.iRdbDfrAdmin.IsChecked == true) {
      objReq.objSlotDetailBC.AdministrationDetail.Dose = null;
      objReq.objSlotDetailBC.AdministrationDetail.DoseUOM = null;
      objReq.objSlotDetailBC.AdministrationDetail.DoseUOMOID = 0;
      objReq.objSlotDetailBC.AdministrationDetail.SiteOID = null;
      objReq.objSlotDetailBC.AdministrationDetail.ExpiryDate = DateTime.MinValue;
      objReq.objSlotDetailBC.AdministrationDetail.RouteOID = null;
      objReq.objSlotDetailBC.AdministrationDetail.BatchNumber = null;
      objReq.objSlotDetailBC.AdministrationDetail.AdministeredByOID = 0;
      objReq.objSlotDetailBC.AdministrationDetail.AdministratorType = String.Empty;
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
  if (this.lnMedsAdminOID > 0 && !String.IsNullOrEmpty(this.strSlotStatus) && String.Compare(this.strSlotStatus, SlotStatus.DEFERDUENOW) == 0 || String.Compare(this.strSlotStatus, SlotStatus.DEFEROVERDUE) == 0) {
      if (!String.IsNullOrEmpty(this.objVm.Status) && String.Compare(this.objVm.Status, SlotStatus.NOTGIVEN) == 0) {
          this.objVm.AdministrationDetail.IsHistoryExists = true;
          objReq.objSlotDetailBC.AdministrationDetail.IsHistoryExists = true;
      }
  }
  if (PatientContext.PatientOID > 0) {
      this.objVm.PatientOID = PatientContext.PatientOID;
  }
  if (ChartContext.PatientOID > 0) {
      objReq.nPatientOIDBC = ChartContext.PatientOID;
      objReq.objSlotDetailBC.AdministrationDetail.PatientOID = ChartContext.PatientOID;
  }
  if (this.lnPrescriptionSchOID > 0) {
      this.objVm.PresScheduleOID = this.lnPrescriptionSchOID;
      objReq.objSlotDetailBC.OID = this.lnPrescriptionSchOID;
  }
  if (this.lnPrescriptionOID > 0) {
      objReq.objSlotDetailBC.PrescriptionItemOID = this.lnPrescriptionOID;
  }
  objReq.bIsPRNBC = this.bIsPRN;
  this.objVm.AdministrationDetail.OnWitnessUserSelected = (s,e) => { this.ValidateUser(s) };
  objReq.objSlotDetailBC.LorenzoID = this.strLorenzoID;
  objReq.objSlotDetailBC.AdministrationDetail.oRequisitionHistoryDetails = ObjectHelper.CreateObject(new RequisitionHistoryDetails(), {
      ServiceOID: MedChartData.ServiceOID,
      LocationOID: MedChartData.LocationOID,
      RoleOID: JobRoleOID
  });
  if (ChartContext.PatientOID > 0)
      objReq.objSlotDetailBC.PatientOID = ChartContext.PatientOID;
  if (ChartContext.EncounterOID > 0) {
      objReq.objSlotDetailBC.EncounterOID = ChartContext.EncounterOID;
  }
  if (this.oAdministrableQtyViewVM != null && this.oAdministrableQtyViewVM.WardStockQuantityToAdmin > 0 && this.oAdministrableQtyViewVM.IsUpdateStockRegister) {
      objReq.objSlotDetailBC.WardStockQuantityToAdmin = this.oAdministrableQtyViewVM.WardStockQuantityToAdmin.ToString();
      objReq.objSlotDetailBC.AdministrationDetail.Wastage = this.oAdministrableQtyViewVM.Wastage.ToString();
      objReq.objSlotDetailBC.AdministrationDetail.CDWardRegItemOID = this.oAdministrableQtyViewVM.CDWardOID;
      objReq.objSlotDetailBC.TransactionItemPackDetail = new ObservableCollection<TransactionItemPackDetail>();
      if (this.oAdministrableQtyViewVM.TransactionItemPackDetails.Count > 0) {
          var nCount: number = this.oAdministrableQtyViewVM.TransactionItemPackDetails.Count;
          for (var i: number = 0; i < nCount; i++) {
              var oPackDetails: TransactionItemPackDetail = new TransactionItemPackDetail();
              oPackDetails.BatchNo = this.oAdministrableQtyViewVM.TransactionItemPackDetails[i].BatchNumber;
              oPackDetails.ExpiryDate = this.oAdministrableQtyViewVM.TransactionItemPackDetails[i].ExpiryDate;
              oPackDetails.Quantity = this.oAdministrableQtyViewVM.WardStockQuantityToAdmin.ToString();
              objReq.objSlotDetailBC.TransactionItemPackDetail.Add(oPackDetails);
          }
      }
  }
  if (this.oAdministrableQtyViewVM != null && this.oAdministrableQtyViewVM.PatientStockQuantityToAdmin > 0 && this.oAdministrableQtyViewVM.IsUpdateStockRegister) {
      objReq.objSlotDetailBC.PatientStockQuantityToAdmin = this.oAdministrableQtyViewVM.PatientStockQuantityToAdmin.ToString();
      objReq.objSlotDetailBC.AdministrationDetail.Wastage = this.oAdministrableQtyViewVM.Wastage.ToString();
      objReq.objSlotDetailBC.AdministrationDetail.CDPatientRegItemOID = this.oAdministrableQtyViewVM.CDPatientOID;
      if (objReq.objSlotDetailBC.TransactionItemPackDetail == null)
          objReq.objSlotDetailBC.TransactionItemPackDetail = new ObservableCollection<TransactionItemPackDetail>();
      if (this.oAdministrableQtyViewVM.TransactionItemPackDetails.Count > 0) {
          var nCount: number = this.oAdministrableQtyViewVM.TransactionItemPackDetails.Count;
          for (var i: number = 0; i < nCount; i++) {
              var oPackDetails: TransactionItemPackDetail = new TransactionItemPackDetail();
              oPackDetails.BatchNo = this.oAdministrableQtyViewVM.TransactionItemPackDetails[i].BatchNumber;
              oPackDetails.ExpiryDate = this.oAdministrableQtyViewVM.TransactionItemPackDetails[i].ExpiryDate;
              oPackDetails.Quantity = this.oAdministrableQtyViewVM.PatientStockQuantityToAdmin.ToString();
              objReq.objSlotDetailBC.TransactionItemPackDetail.Add(oPackDetails);
          }
      }
  }
  if (objReq != null && objReq.objSlotDetailBC != null && objReq.objSlotDetailBC.AdministrationDetail != null)
      objReq.objSlotDetailBC.AdministrationDetail.MedBarCodeOverrideDetails = this.lstCMedBarcodeScanOverrideDetail;
  var lstMedProddet: ObservableCollection<MedsScanProductDetails> = new ObservableCollection<MedsScanProductDetails>();
  var objManageBarcodeHelper: ManageBarcodeHelper = new ManageBarcodeHelper();
  if (this.oMedScanRecAdmVM != null && this.oMedScanRecAdmVM.oProductDetailsInfo != null && this.oMedScanRecAdmVM.oProductDetailsInfo.Count > 0) {
      this.oMedScanRecAdmVM.TotaldoseadministeredAmt = !String.IsNullOrEmpty(this.objVm.AdministrationDetail.Dose) ? this.objVm.AdministrationDetail.Dose : null;
      this.oMedScanRecAdmVM.TotalDoseAdministeredUOMLZOID = !String.IsNullOrEmpty(this.objVm.AdministrationDetail.strDoseUOMLzoID) ? this.objVm.AdministrationDetail.strDoseUOMLzoID : null;
      lstMedProddet = objManageBarcodeHelper.FillScanedProductDetails(this.oMedScanRecAdmVM);
      objReq.objSlotDetailBC.AdministrationDetail.MedProductDetails = lstMedProddet;
  }
  objService.RecordAdministrationAsync(objReq);
  }
  objDoseDis_Closed(args: AppDialogEventargs): void {
    if (args != null && args.Content != null) {
        this.objDoseDis = args.Content.Component;
        this.objslotVM  = ObjectHelper.CreateType<SlotDetailVM>(args.Content, SlotDetailVM);
      if(this.objslotVM && !this.objslotVM.IsSubmitInProgress) {
          if (args.Result == AppDialogResult.Ok) {
              this.objslotVM.IsSubmitInProgress = true;
              Busyindicator.SetStatusBusy("Administration", true);
              var bdialogresult: boolean = this.objDoseDis.cmdOkClick();
            //   ObjectHelper.stopFinishAndCancelEvent(false);
              if (bdialogresult) {  
                Busyindicator.SetStatusIdle("Administration");
                  args.AppChildWindow.DialogRef.close();
                  this.ValidatePatientWBScanAndSubmitRecordAdministration();
              }
              else this.objslotVM.IsSubmitInProgress = false;
          }
          else if (args.Result == AppDialogResult.Cancel) {
              if (this.objVm != null && this.objVm.AdministrationDetail != null) {
                  this.objVm.AdministrationDetail.DoseDiscReasonCode = null;
                  this.objVm.AdministrationDetail.DoseDiscComments = null;
              }
              this.objslotVM.IsSubmitInProgress = false;
              Busyindicator.SetStatusIdle("Administration");
              args.AppChildWindow.DialogRef.close();
          }
      }
    }
  }
  cmdCancel_Click(e): void {

  }
  iRdbNotGiven_Checked(e): void {
      this.MedDoseinfo.Visibility = Visibility.Collapsed;
      this.lblResNotGiven.Visibility = Visibility.Visible;
      this.cboResNotGiven.Visibility = Visibility.Visible;
      this.lblWitnessedBy.Visibility = Visibility.Collapsed;
      this.sfsWitnessedby.Visibility = Visibility.Collapsed;
      this.lblDateTimeGivenText.Visibility = Visibility.Collapsed;
      this.dtpDateTimeGivenText.Visibility = Visibility.Collapsed;
      this.timeDateTimeGivenText.Visibility = Visibility.Collapsed;
      this.rdbCareProvider.Visibility = Visibility.Collapsed;
      this.rdbparent.Visibility = Visibility.Collapsed;
      this.stpCareProvider.Visibility = Visibility.Collapsed;
      this.lblAdministeredby.Visibility = Visibility.Collapsed;
      this.sfsAdministeredby.Visibility = Visibility.Collapsed;
      this.chkNoWitness.IsChecked = false;
      this.chkNoWitness_Unchecked(null);
      this.chkNoWitness.Visibility = Visibility.Collapsed;
      this.lblResFordefer.Visibility = Visibility.Collapsed;
      this.cboResFordefer.Visibility = Visibility.Collapsed;
      this.HideDivElement("divCriticalMedMsg");

      if(this.objslotVM != null && this.objslotVM.AdministrationDetail != null && this.objslotVM.AdministrationDetail.IsCriticalMed) {
          if (this.objslotVM.AdministrationDetail.CriticalMedsRoutes != null) {
              var RT: string[] = this.objslotVM.AdministrationDetail.CriticalMedsRoutes.Split('/');
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
                  s.Append(" route. " + this.objslotVM.AdministrationDetail.CriticalMedsMsg);
              }
              else {
                  s.Append(" routes. " + this.objslotVM.AdministrationDetail.CriticalMedsMsg);
              }
              this.critical.Text = s.ToString();
          }
          else {
              this.critical.Text = this.objslotVM.AdministrationDetail.CriticalMedsMsg;
          }
          if (String.IsNullOrEmpty(this.objslotVM.AdministrationDetail.CriticalMedsURL) || String.Equals(this.objslotVM.AdministrationDetail.CriticalMedsURL, "http://") || String.Equals(this.objslotVM.AdministrationDetail.CriticalMedsURL, "https://")) {
              this.HideDivElement("divCriticalDrugSiteURL");
          }
          this.ShowDivElement("divCriticalMedMsg");
      }
      if (this.cboResNotGiven.SelectedValue != null && (<CListItem>(this.cboResNotGiven.SelectedValue)).Value == "CC_CLNCLRSN")
          this.lblComments.Mandatory = true;
      else 
          this.lblComments.Mandatory = false;
      
      this.HideInfBolusItems();
      this.cmdScanRecMedication.Visibility = Visibility.Collapsed;
      this.lblNoWitness.Visibility = Visibility.Collapsed;
      this.ValidateOnActionChange(CConstants.ActionNotGiven);
      this.HidePatientParertCareControls();
      this.RefreshDivElements();
  }
  CriticalURL_Clilck(e): void {
      var objCriticalURLContentInfo: Object[] = null;
      objCriticalURLContentInfo = new Array(1);
      objCriticalURLContentInfo[0] = this.objslotVM.AdministrationDetail.CriticalMedsURL;
      var returnValue: Object = HtmlPage.Window.Invoke("LaunchCriticalURLLink", objCriticalURLContentInfo);
  }
  iRdbGiven_Checked(e): void {
      this.MedDoseinfo.Visibility = Visibility.Visible;
      this.lblDateTimeGivenText.Visibility = Visibility.Visible;
      this.dtpDateTimeGivenText.Visibility = Visibility.Visible;
      this.timeDateTimeGivenText.Visibility = Visibility.Visible;
      this.rdbCareProvider.Visibility = Visibility.Visible;
      this.rdbparent.Visibility = Visibility.Visible;
      this.stpCareProvider.Visibility = Visibility.Visible;
      this.lblAdministeredby.Visibility = Visibility.Visible;
      this.sfsAdministeredby.Visibility = Visibility.Visible;
      //this.chkNoWitness.Visibility = Visibility.Visible;
      this.lblResNotGiven.Visibility = Visibility.Collapsed;
      this.cboResNotGiven.Visibility = Visibility.Collapsed;
      this.lblWitnessedBy.Visibility = Visibility.Visible;
      this.sfsWitnessedby.Visibility = Visibility.Visible;
      this.lblResFordefer.Visibility = Visibility.Collapsed;
      this.cboResFordefer.Visibility = Visibility.Collapsed;
      this.HideDivElement("divCriticalMedMsg");
      if(this.IsBolus && (String.IsNullOrEmpty(this.sMultiRoute) || this.sMultiRoute != Convert.ToString(MultiRouteType.Non_Infusion_Routes)))
          this.ShowInfBolusItems();
      else 
          this.HideInfBolusItems();
      
      this.chkNoWitness.IsChecked = false;
      this.chkNoWitness_Unchecked(null);
      if (this.IsWitnessOverrideAllowed) {
          this.chkNoWitness.Visibility = Visibility.Visible;
          this.chkNoWitness.IsEnabled = this.bIsWitnessReqd;
      }
      this.sfsWitnessedby.IsEnabled = this.bIsWitnessReqd;
      this.lblWitnessedBy.IsEnabled = this.bIsWitnessReqd;
      this.lblWitnessedBy.Mandatory = this.bIsWitnessReqd;
      this.rdbCareProvider.IsChecked = true;
      this.lblComments.Mandatory = false;
      if (this.objVm != null)
          this.objVm.AdministrationDetail.WitnessMandatory = this.bIsWitnessReqd;
      if (this.objslotVM != null && !this.objslotVM.IsMedScanExcluded) {
          this.cmdScanRecMedication.Visibility = Visibility.Visible;
      }
      this.lblNoWitness.Visibility = Visibility.Visible;
      this.ValidateOnActionChange(CConstants.ActionGiven);
      this.SetAdministeredbyValue();
      this.HidePatientParertCareControls();
      this.RefreshDivElements();
  }
  iRdbSelfAdmin_Checked(e): void {
      this.SelfadminValidation();
      this.RefreshDivElements();
  }
  public SelfadminValidation(): void {
      this.MedDoseinfo.Visibility = Visibility.Visible;
      this.lblDateTimeGivenText.Visibility = Visibility.Visible;
      this.dtpDateTimeGivenText.Visibility = Visibility.Visible;
      this.timeDateTimeGivenText.Visibility = Visibility.Visible;
      this.lblAdministeredby.Visibility = Visibility.Visible;
      this.sfsAdministeredby.Visibility = Visibility.Visible;
      this.HideDivElement("divCriticalMedMsg");

      if(this.IsWitnessOverrideAllowed) {
          this.chkNoWitness.IsChecked = false;
          this.chkNoWitness_Unchecked(null);
          this.chkNoWitness.Visibility = Visibility.Visible;
          this.chkNoWitness.IsEnabled = this.bIsWitnessReqd;
      }
      
      this.lblWitnessedBy.Visibility = Visibility.Visible;
      this.sfsWitnessedby.Visibility = Visibility.Visible;
      this.lblResNotGiven.Visibility = Visibility.Collapsed;
      this.cboResNotGiven.Visibility = Visibility.Collapsed;
      this.lblResFordefer.Visibility = Visibility.Collapsed;
      this.cboResFordefer.Visibility = Visibility.Collapsed;
      this.lblComments.Mandatory = false;
      if(this.bIsWitnessReqd) {
          this.sfsWitnessedby.IsEnabled = true;
          this.lblWitnessedBy.IsEnabled = true;
          if (this.objVm != null)
              this.objVm.AdministrationDetail.WitnessMandatory = false;
      }
      else {
          this.sfsWitnessedby.IsEnabled = false;
          this.lblWitnessedBy.IsEnabled = false;
          if(this.objVm != null)
              this.objVm.AdministrationDetail.WitnessMandatory = false;
      }
      if (this.objslotVM != null && !this.objslotVM.IsMedScanExcluded) {
          this.cmdScanRecMedication.Visibility = Visibility.Visible;
      }
      this.lblNoWitness.Visibility = Visibility.Visible;
      this.ValidateOnActionChange(CConstants.ActionSelfAdmin);
      this.SetAdministeredbyValue();
      this.ShowPatientParertCareControls();
  }

  SetAdministeredbySFS(): void {
      if(this.objVm != null && this.objVm.AdministrationDetail != null) {
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
          this.objVm.AdministrationDetail.AdministeredBy = this.strUserName;
          this.objVm.AdministrationDetail.AdministeredByOID = AppContextInfo.UserOID;
          this.sfsAdministeredby.GetSFSItems("cp");
      }
  }
  private sfsAdministeredby_OnGetItems(sender: Object, Result: ObservableCollection<CListItem> ): void {
    if(Result != null && this.objVm != null && this.objVm.AdministrationDetail != null) {
        this.objVm.AdministrationDetail.AdministeredByList = Result;
    }
    if (this.objVm != null && this.objVm.AdministrationDetail != null && !String.IsNullOrEmpty(this.objVm.AdministrationDetail.AdministeredByOID)) {
        this.objVm.AdministrationDetail._IsSFSValueSetFromOnGetSFSItems = true;
        if (this.objVm.AdministrationDetail.AdministeredByList == null)
            this.objVm.AdministrationDetail.AdministeredByList = new ObservableCollection<CListItem>();
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
        this.objVm.AdministrationDetail._IsSFSValueSetFromOnGetSFSItems = false;
    }
  }
  SetAdministeredbyValue(): void {
      if(this.iRdbGiven.IsChecked) {
          this.sfsAdministeredby.IsEnabled = MedChartData.AllowAnyUserForAdministration;
          if (this.rdbCareProvider.IsChecked) {
              this.SetAdministeredbySFS();
          }
      }
  }
  iRdbNotKnown_Checked(e): void {
      this.MedDoseinfo.Visibility = Visibility.Collapsed;
      this.lblDateTimeGivenText.Visibility = Visibility.Collapsed;
      this.dtpDateTimeGivenText.Visibility = Visibility.Collapsed;
      this.timeDateTimeGivenText.Visibility = Visibility.Collapsed;
      this.rdbCareProvider.Visibility = Visibility.Collapsed;
      this.rdbparent.Visibility = Visibility.Collapsed;
      this.stpCareProvider.Visibility = Visibility.Collapsed;
      this.lblAdministeredby.Visibility = Visibility.Collapsed;
      this.sfsAdministeredby.Visibility = Visibility.Collapsed;
      this.chkNoWitness.IsChecked = false;
      this.chkNoWitness_Unchecked(null);
      this.chkNoWitness.Visibility = Visibility.Collapsed;
      this.lblResNotGiven.Visibility = Visibility.Collapsed;
      this.cboResNotGiven.Visibility = Visibility.Collapsed;
      this.lblWitnessedBy.Visibility = Visibility.Collapsed;
      this.sfsWitnessedby.Visibility = Visibility.Collapsed;
      this.lblResFordefer.Visibility = Visibility.Collapsed;
      this.cboResFordefer.Visibility = Visibility.Collapsed;
      this.HideInfBolusItems();
      this.HideDivElement("divCriticalMedMsg");
      this.cmdScanRecMedication.Visibility = Visibility.Collapsed;
      this.lblNoWitness.Visibility = Visibility.Collapsed;
      this.ValidateOnActionChange(CConstants.ActionNotKnown);
      this.HidePatientParertCareControls();
      this.RefreshDivElements();
  }
  iRdbDfrAdmin_Checked(e): void {
      this.MedDoseinfo.Visibility = Visibility.Collapsed;
      this.lblDateTimeGivenText.Visibility = Visibility.Collapsed;
      this.dtpDateTimeGivenText.Visibility = Visibility.Collapsed;
      this.timeDateTimeGivenText.Visibility = Visibility.Collapsed;
      this.rdbCareProvider.Visibility = Visibility.Collapsed;
      this.rdbparent.Visibility = Visibility.Collapsed;
      this.stpCareProvider.Visibility = Visibility.Collapsed;
      this.lblAdministeredby.Visibility = Visibility.Collapsed;
      this.sfsAdministeredby.Visibility = Visibility.Collapsed;
      this.chkNoWitness.IsChecked = false;
      this.chkNoWitness_Unchecked(null);
      this.chkNoWitness.Visibility = Visibility.Collapsed;
      this.lblResNotGiven.Visibility = Visibility.Collapsed;
      this.cboResNotGiven.Visibility = Visibility.Collapsed;
      this.lblWitnessedBy.Visibility = Visibility.Collapsed;
      this.sfsWitnessedby.Visibility = Visibility.Collapsed;
      this.lblResFordefer.Visibility = Visibility.Visible;
      this.cboResFordefer.Visibility = Visibility.Visible;
      this.HideDivElement("divCriticalMedMsg");
      
      if(this.objslotVM != null && this.objslotVM.AdministrationDetail != null && this.objslotVM.AdministrationDetail.IsCriticalMed) {
          if (this.objslotVM.AdministrationDetail.CriticalMedsRoutes != null) {
              var RT: string[] = this.objslotVM.AdministrationDetail.CriticalMedsRoutes.Split('/');
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
                  s.Append(" route. " + this.objslotVM.AdministrationDetail.CriticalMedsMsg);
              }
              else {
                  s.Append(" routes. " + this.objslotVM.AdministrationDetail.CriticalMedsMsg);
              }
              this.critical.Text = s.ToString();
          }
          else {
              this.critical.Text = this.objslotVM.AdministrationDetail.CriticalMedsMsg;
          }
          if (String.IsNullOrEmpty(this.objslotVM.AdministrationDetail.CriticalMedsURL) || String.Equals(this.objslotVM.AdministrationDetail.CriticalMedsURL, "http://") || String.Equals(this.objslotVM.AdministrationDetail.CriticalMedsURL, "https://")) {
              this.HideDivElement("divCriticalDrugSiteURL");
          }
          this.ShowDivElement("divCriticalMedMsg");
      }
      if (this.cboResFordefer.SelectedValue != null && (<CListItem>(this.cboResFordefer.SelectedValue)).Value == "CC_CLNCLRSN")
          this.lblComments.Mandatory = true;
      else this.lblComments.Mandatory = false;
          this.HideInfBolusItems();
      this.lblNoWitness.Visibility = Visibility.Collapsed;  
      this.cmdScanRecMedication.Visibility = Visibility.Collapsed;
      this.ValidateOnActionChange(CConstants.ActionDfrAdmin);
      this.HidePatientParertCareControls();
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
      if(this.objVm != null)
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
      if(this.objVm != null && !this.chkNoWitness.IsChecked) {
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
      this.objslotVM.IsSubmitInProgress = false;
      this.bIsPRN = this.objslotVM.IsLastPRN;
      if(this.bIsPRN) {
          this.dtpDateTimeGivenText.SelectedDateTime = this.objslotVM.TodaySlotDate;
          this.dtpDateTimeGivenText.RangeStartDate = this.objslotVM.TodaySlotDate;
          this.dtpDateTimeGivenText.RangeEndDate = this.objslotVM.TodaySlotDate.AddDays(1).AddSeconds(-1);
      }
      Busyindicator.SetStatusIdle("MedChart");
      this.sfsAdministeredby.GetSFSItems("cp");
      this.sfsWitnessedby.GetSFSItems("cp");
      let objService: CSecurityManagementServiceWSSoapClient = new CSecurityManagementServiceWSSoapClient();
      objService.GetUserCompleted = (s,e) => { this.objService_GetUserCompleted(e) };
      var objReq: CReqMsgGetUser = new CReqMsgGetUser();
      objReq.oContextInformation = CommonBB.FillContext();
      objReq.lUserOIDBC = Convert.ToInt64(AppContextInfo.UserOID);
      objService.GetUserAsync(objReq);
      Busyindicator.SetStatusIdle("MedChart");
  }
  objService_GetUserCompleted(e: GetUserCompletedEventArgs): void {
      if(e.Result != null) {
          var objRes: CResMsgGetUser = e.Result;
          if (objRes != null && objRes.objEnterpriseObject != null && !String.IsNullOrEmpty(objRes.objEnterpriseObject.SurName)) {
              this.strUserName = objRes.objEnterpriseObject.SurName;
              if (!String.IsNullOrEmpty(objRes.objEnterpriseObject.ForeName)) {
                  this.strUserName += " ";
                  this.strUserName += objRes.objEnterpriseObject.ForeName;
              }
          }
      }
      this.GetSlotInfo();
  }
  GetSlotInfo(): void {
      if(this.objVm == null)
          this.objVm = new SlotDetailVM();
      this.objVm.IsInfusionItem = this.IsBolus;
      this.objVm.AlreadyRequestedDetails = this.AlreadyRequestedDetails;
      this.objVm.IdentifyingOID = this.IdentifyingOID;
      this.objVm.IdentifyingType = this.IdentifyingType;
      this.objVm.MCVersionNo = this.MCVersion;
      this.objVm.AdminMethod = this.sAdminMethod;
      this.objVm.DoseType = this.strDoseType;
      this.objVm.ScheduledDTTM = this.dtSlotDate;
      this.objVm.IsLastPRN = this.bIsPRN;
      this.objVm.CurrentServerDate = this.CurrentDt;
      this.objVm.DrugDetail = new DrugItem();
      this.objVm.DrugDetail.Drugname = this.sDrugName;
      this.objVm.IsWardStock = this.IsWardStock;
      this.objVm.IsConditionalExists = this.IsConditionalExists;
      if (this.bIsAmend) {
          this.objVm.IsAmend = this.bIsAmend;
          this.bIsAmend = false;
      }
      this.objVm.AdministrationDetail = new AdministrationDetailVM();
      this.objVm.AdministrationDetail.OnWitnessUserSelected = (s,e) => { this.ValidateUser(s) };
      if (this.bIsPRN) {
          if (this.sIsPRNWithSchedule) {
              if (this.objVm.ScheduledDTTM.Date < this.objVm.CurrentServerDate.Date) {
                  if (this.objVm.AdministrationDetail.AdministeredDate != DateTime.MinValue) {
                      this.objVm.AdministrationDetail.AdministeredDate = DateTime.MinValue;
                  }
                  if (this.objVm.AdministrationDetail.AdministeredDateTime != DateTime.MinValue) {
                      this.objVm.AdministrationDetail.AdministeredDateTime = DateTime.MinValue;
                  }
              }
              else {
                  this.objVm.AdministrationDetail.AdministeredDate = this.SlotDate;
              }
          }
          else {
              if (this.SlotDate < this.objVm.CurrentServerDate.Date && this.objVm.AdministrationDetail.AdministeredDateTime != DateTime.MinValue) {
                  this.objVm.AdministrationDetail.AdministeredDateTime = DateTime.MinValue;
              }
              this.objVm.AdministrationDetail.AdministeredDate = this.SlotDate;
          }
      }
      else {
          if (this.objVm.ScheduledDTTM.Date < this.objVm.CurrentServerDate.Date) {
              if (this.objVm.AdministrationDetail.AdministeredDate != DateTime.MinValue) {
                  this.objVm.AdministrationDetail.AdministeredDate = DateTime.MinValue;
              }
              if (this.objVm.AdministrationDetail.AdministeredDateTime != DateTime.MinValue) {
                  this.objVm.AdministrationDetail.AdministeredDateTime = DateTime.MinValue;
              }
          }
      }
      if ((String.IsNullOrEmpty(this.objVm.AdminMethod) && String.Equals(this.sItemType, CConstants.Formulary_Drug)) || String.Equals(this.IdentifyingType, CConstants.NONCATALOGUEITEM) || String.Equals(this.IdentifyingType, CConstants.Precatalog)) {
          this.objVm.AdministrationDetail.DoseMandatory = true;
          if (String.Compare(this.strDoseType, DoseTypeCode.CONDITIONAL) != 0 || !this.objVm.IsConditionalExists) {
              this.lblDose.IsEnabled = true;
              this.objVm.IsDoseEnabled = true;
          }
      }
      else {
          if (String.IsNullOrEmpty(this.objVm.AdminMethod) && String.Equals(this.sItemType, CConstants.Appliance)) {
              if ((String.Compare(this.strDoseType, DoseTypeCode.STEPPEDVARIABLE) == 0) || (String.Compare(this.strDoseType, DoseTypeCode.DOSAGERANGE) == 0)) {
                  if (this.dblLDose == 0 && this.dblUDose == 0 && String.IsNullOrEmpty(this.sDoseValUOM) && this.lnDoseValUOMOID == 0) {
                      this.objVm.AdministrationDetail.DoseMandatory = false;
                      this.lblDose.IsEnabled = false;
                      this.objVm.IsDoseEnabled = false;
                  }
                  else {
                      this.objVm.AdministrationDetail.DoseMandatory = true;
                      this.lblDose.IsEnabled = true;
                      this.objVm.IsDoseEnabled = true;
                      if (this.dblLDose > 0 && this.dblUDose == 0) {
                          this.objVm.AdministrationDetail.Dose = Convert.ToString(this.dblLDose);
                          this.objVm.AdministrationDetail.strDoseUOM = this.sDoseValUOM;
                          this.objVm.AdministrationDetail.lnDoseUOMOID = this.lnDoseValUOMOID;
                          this.objVm.AdministrationDetail.strDoseUOMLzoID = this.sDoseUOMLzoID;
                      }
                      else if (this.dblLDose == 0 && this.dblUDose > 0) {
                          this.objVm.AdministrationDetail.Dose = Convert.ToString(this.dblUDose);
                          this.objVm.AdministrationDetail.strDoseUOM = this.sDoseValUOM;
                          this.objVm.AdministrationDetail.lnDoseUOMOID = this.lnDoseValUOMOID;
                          this.objVm.AdministrationDetail.strDoseUOMLzoID = this.sDoseUOMLzoID;
                      }
                      else if (this.dblLDose > 0 && this.dblUDose > 0) {
                          this.objVm.AdministrationDetail.strDoseUOM = this.sDoseValUOM;
                          this.objVm.AdministrationDetail.lnDoseUOMOID = this.lnDoseValUOMOID;
                          this.objVm.AdministrationDetail.strDoseUOMLzoID = this.sDoseUOMLzoID;
                      }
                  }
              }
              if (String.Compare(this.strDoseType, DoseTypeCode.CONDITIONAL) == 0) {
                  this.objVm.AdministrationDetail.DoseMandatory = true;
                  if (!this.objVm.IsConditionalExists) {
                      this.lblDose.IsEnabled = true;
                      this.objVm.IsDoseEnabled = true;
                  }
              }
              if (String.Compare(this.strDoseType, DoseTypeCode.NORMAL) == 0 || String.Compare(this.strDoseType, DoseTypeCode.TITRATED) == 0) {
                  this.objVm.AdministrationDetail.DoseMandatory = false;
                  this.objVm.AdministrationDetail.Dose = this.strDose;
                  this.objVm.AdministrationDetail.strDoseUOM = this.sDoseValUOM;
                  this.objVm.AdministrationDetail.lnDoseUOMOID = this.lnDoseValUOMOID;
                  this.objVm.AdministrationDetail.strDoseUOMLzoID = this.sDoseUOMLzoID;
                  this.lblDose.IsEnabled = false;
                  this.objVm.IsDoseEnabled = false;
              }
          }
          else {
              this.objVm.AdministrationDetail.DoseMandatory = false;
              this.lblDose.IsEnabled = false;
              this.objVm.IsDoseEnabled = false;
          }
      }
      this.objVm.Routes = new ObservableCollection<CListItem>();
      this.objVm.AdministrationDetail.Sites = new ObservableCollection<CListItem>();
      this.objVm.AdministrationDetail.DoseUOMs = new ObservableCollection<CListItem>();
      if (this.objAdminDetail != null) {
          if (MedicationCommonBB.Routes(this.objAdminDetail.Route).Count > 0) {
              this.objVm.Routes = MedicationCommonBB.Routes(this.objAdminDetail.Route);
              if (this.objVm.Routes != null && this.objVm.Routes.Count > 1) {
                  this.objVm.Routes = new ObservableCollection<CListItem>(this.objVm.Routes.OrderBy(c => c.DisplayText));
              }
              if (this.objVm.Routes.Count == 1) {
                    this.lnRouteOID = Convert.ToInt64(this.objVm.Routes[0].Value);
                    this.objVm.RouteOID = Convert.ToInt64(this.objVm.Routes[0].Value);
                    if (this.objVm.AdministrationDetail != null && this.objVm.AdministrationDetail.RouteOID == null)
                        this.objVm.AdministrationDetail.RouteOID = this.objVm.Routes[0].Value;
              }
          }
          if (this.objAdminDetail.DoseUOM != null) {
              if (!String.IsNullOrEmpty(this.sDoseValUOM) && this.lnDoseValUOMOID > 0) {
                  var oDoseUOM: CListItem = ObjectHelper.CreateObject(new CListItem(), {
                      DisplayText: this.sDoseValUOM,
                      Value: this.lnDoseValUOMOID.ToString()
                  });
                  this.objVm.AdministrationDetail.DoseUOMs.Add(oDoseUOM);
              }
              if (this.objAdminDetail.AmendedPresOID > 0) {
                  var sDoseUOMOID: string[] = this.objAdminDetail.AmendDoseUOMOID.Split('|');
                  var sDoseUOMName: string[] = this.objAdminDetail.DoseUOM.Split('|');
                  for (var nCnt: number = 0; nCnt < sDoseUOMOID.length; nCnt++) {
                      var oDose: CListItem = ObjectHelper.CreateObject(new CListItem(), {
                          DisplayText: sDoseUOMName[nCnt],
                          Value: sDoseUOMOID[nCnt]
                      });
                      if (this.objVm != null && this.objVm.AdministrationDetail != null && this.objVm.AdministrationDetail.DoseUOMs != null) {
                          if (this.objVm.AdministrationDetail.DoseUOMs.Count > 0) {
                              var bResult: boolean = false;
                              for (let i: number = 0; i < this.objVm.AdministrationDetail.DoseUOMs.Count; i++) {
                                  if (this.objVm.AdministrationDetail.DoseUOMs[i].Value == oDose.Value) {
                                      bResult = true;
                                      break;
                                  }
                              };
                              if (!bResult)
                                  this.objVm.AdministrationDetail.DoseUOMs.Add(oDose);
                          }
                          else this.objVm.AdministrationDetail.DoseUOMs.Add(oDose);
                      }
                  }
                  this.objVm.IsDoseEnabled = true;
                  if (this.objVm.AdministrationDetail.DoseUOMs.Count > 1) {
                      this.cboDoseUOM.Visibility = Visibility.Visible;
                      this.lblDoseUoM.Visibility = Visibility.Collapsed;
                  }
                  else {
                      if (String.Compare(this.strDoseType, DoseTypeCode.CONDITIONAL) == 0 && this.objVm != null && this.objVm.AdministrationDetail != null && this.objVm.AdministrationDetail.DoseUOMs != null && this.objVm.AdministrationDetail.DoseUOMs.Count > 0) {
                          this.sDoseValUOM = this.objVm.AdministrationDetail.DoseUOMs[0].DisplayText;
                          this.lnDoseValUOMOID = Convert.ToInt64(this.objVm.AdministrationDetail.DoseUOMs[0].Value);
                      }
                  }
              }
          }
          if (this.objAdminDetail.ConcentrationDoseUOMs != null && this.objAdminDetail.ConcentrationDoseUOMs.Count > 0) {
              this.objVm.AdministrationDetail.ConcentrationStrengthUOMs = new ObservableCollection<CListItem>();
              var oStrengthUomItem: CListItem;
              this.objAdminDetail.ConcentrationDoseUOMs.forEach( (oStrengthItem) => {
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
              if (this.objAdminDetail != null && this.objAdminDetail.ConcentrationDoseUOMs != null && this.objAdminDetail.ConcentrationDoseUOMs.Count > 0)
                  this.objVm.AdministrationDetail.DoseUOMs = new ObservableCollection<CListItem>(this.objAdminDetail.ConcentrationDoseUOMs.Select(x => ObjectHelper.CreateObject(new CListItem(), { DisplayText: x.Name, Value: x.OID.ToString() })).OrderBy(x => x.DisplayText));
              else this.objVm.AdministrationDetail.DoseUOMs = new ObservableCollection<CListItem>();
              this.objVm.AdministrationDetail.DoseUOMs.Add(ObjectHelper.CreateObject(new CListItem(), { DisplayText: "More", Value: "CC_More" }));
          }
          if (!String.IsNullOrEmpty(this.objAdminDetail.ConcentrationStrength))
              this.objVm.AdministrationDetail.ConcentrationStrength = this.objAdminDetail.ConcentrationStrength;
          if (this.objAdminDetail.oUomTypeList != null && this.objAdminDetail.oUomTypeList.Count > 0) {
              let qryUomTypeList = this.objAdminDetail.oUomTypeList.Where(
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
              
              let qryPeriodTypeList = this.objAdminDetail.oUomTypeList.Where(
                  (oUOMTypeList) =>
                    String.Compare(
                      oUOMTypeList.UOMTYCode,
                      'time'
                    ) == 0
                  ).Select((oUOMTypeList) => oUOMTypeList)
                  .OrderBy(oUOMTypeList => oUOMTypeList.LorenzoID);

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
          if (this.objAdminDetail.ConcentrationStrengthUOM != null && this.objAdminDetail.ConcentrationStrengthUOM.UOMId > 0) {
              var tmpStrength: CListItem = new CListItem();
              tmpStrength.DisplayText = this.objAdminDetail.ConcentrationStrengthUOM.UOMName;
              tmpStrength.Value = this.objAdminDetail.ConcentrationStrengthUOM.UOMId.ToString();
              if (Common.GetSelectedItem(tmpStrength.Value, this.objVm.AdministrationDetail.ConcentrationStrengthUOMs) == null) {
                  if (this.objVm.AdministrationDetail.ConcentrationStrengthUOMs != null && this.objVm.AdministrationDetail.ConcentrationStrengthUOMs.Any(x => x.DisplayText.Contains("More")))
                      this.objVm.AdministrationDetail.ConcentrationStrengthUOMs.Insert(this.objVm.AdministrationDetail.ConcentrationStrengthUOMs.Count - 1, tmpStrength);
              }
              this.objVm.AdministrationDetail.ConcentrationStrengthUOM = Common.GetSelectedItem(tmpStrength.Value, this.objVm.AdministrationDetail.ConcentrationStrengthUOMs);
          }
          if (!String.IsNullOrEmpty(this.objAdminDetail.ConcentrationVolume))
              this.objVm.AdministrationDetail.ConcentrationVolume = this.objAdminDetail.ConcentrationVolume;
          if (this.objAdminDetail.ConcentrationVolumeUOM != null && this.objAdminDetail.ConcentrationVolumeUOM.UOMId > 0) {
              var tmpVolume: CListItem = new CListItem();
              tmpVolume.DisplayText = this.objAdminDetail.ConcentrationVolumeUOM.UOMName;
              tmpVolume.Value = this.objAdminDetail.ConcentrationVolumeUOM.UOMId.ToString();
              this.objVm.AdministrationDetail.ConcentrationVolumeUOM = tmpVolume;
              this.objVm.AdministrationDetail.ConcentrationVolumeUOM = Common.GetSelectedItem(this.objVm.AdministrationDetail.ConcentrationVolumeUOM.Value, this.objVm.AdministrationDetail.ConcentrationVolumeUOMs);
          }
          if (this.objAdminDetail.InfusionPeriodforMedAdmin > 0) {
              this.objVm.AdministrationDetail.InfusionPeriodforMedAdmin = this.objAdminDetail.InfusionPeriodforMedAdmin.ToString();
              if (this.objAdminDetail.InfusionPeriodUOMforMedAdmin != null && this.objAdminDetail.InfusionPeriodUOMforMedAdmin.UOMId > 0) {
                  var tmpInfPeriod: CListItem = new CListItem();
                  tmpInfPeriod.DisplayText = this.objAdminDetail.InfusionPeriodUOMforMedAdmin.UOMName;
                  tmpInfPeriod.Value = this.objAdminDetail.InfusionPeriodUOMforMedAdmin.UOMId.ToString();
                  this.objVm.AdministrationDetail.InfusionPeriodUOMforMedAdmin = tmpInfPeriod;
                  this.objVm.AdministrationDetail.InfusionPeriodUOMforMedAdmin = Common.GetSelectedItem(this.objVm.AdministrationDetail.InfusionPeriodUOMforMedAdmin.Value, this.objVm.AdministrationDetail.InfusionPeriodUOMs);
              }
              this.cboInfusionperiodUoMValue.IsEnabled = this.Infusionperiodtext.IsEnabled = false;
          }
          if (this.objAdminDetail.Site != null) {
              if (this.objAdminDetail.SiteOID != null) {
                  var sSiteOID: string[] = this.objAdminDetail.SiteOID.Split('|');
                  var sSiteName: string[] = this.objAdminDetail.Site.Split('|');
                  for (var nCnt: number = 0; nCnt < sSiteOID.length; nCnt++) {
                      var osite: CListItem = ObjectHelper.CreateObject(new CListItem(), {
                          DisplayText: sSiteName[nCnt],
                          Value: sSiteOID[nCnt]
                      });
                      if (this.objAdminDetail != null && this.objAdminDetail.AmendedPresOID > 0 && this.objVm != null && this.objVm.AdministrationDetail != null && this.objVm.AdministrationDetail.Sites != null && this.objVm.AdministrationDetail.Sites.Count > 0) {
                          var bResult: boolean = false;
                          for (let i: number = 0; i < this.objVm.AdministrationDetail.Sites.Count; i++) {
                              if (this.objVm.AdministrationDetail.Sites[i].Value == osite.Value) {
                                  bResult = true;
                                  break;
                              }
                          }
                          if (!bResult)
                              this.objVm.AdministrationDetail.Sites.Add(osite);
                      }
                      else {
                          this.objVm.AdministrationDetail.Sites.Add(osite);
                          this.objVm.AdministrationDetail.Site = osite;
                      }
                  }
              }
              else {
                  let sSiteName: string = this.objAdminDetail.Site;
                  let osite: CListItem = ObjectHelper.CreateObject(new CListItem(), { DisplayText: sSiteName });
                  if (this.objAdminDetail != null && this.objAdminDetail.AmendedPresOID > 0 && this.objVm != null && this.objVm.AdministrationDetail != null && this.objVm.AdministrationDetail.Sites != null && this.objVm.AdministrationDetail.Sites.Count > 0) {
                      var bResult: boolean = false;
                      
                      for (let i: number = 0; i < this.objVm.AdministrationDetail.Sites.Count; i++) {
                          if (this.objVm.AdministrationDetail.Sites[i].DisplayText == osite.DisplayText) {
                              bResult = true;
                              break;
                          }
                      }
                      if (!bResult)
                          this.objVm.AdministrationDetail.Sites.Add(osite);
                  }
                  else {
                      this.objVm.AdministrationDetail.Sites.Add(osite);
                      this.objVm.AdministrationDetail.Site = osite;
                  }
              }
              var oMoresite: CListItem = ObjectHelper.CreateObject(new CListItem(), {
                  DisplayText: "More",
                  Value: "0"
              });
              this.objVm.AdministrationDetail.Sites.Add(oMoresite);
          }
          else {
              this.getAssosiatedDrugSites();
          }
      }
      if (!String.Equals(this.sItemType, CConstants.Appliance)) {
          this.objVm.AdministrationDetail.Dose = this.strDose;
          this.objVm.AdministrationDetail.strDoseUOM = this.sDoseValUOM;
          this.objVm.AdministrationDetail.lnDoseUOMOID = this.lnDoseValUOMOID;
          this.objVm.AdministrationDetail.strDoseUOMLzoID = this.sDoseUOMLzoID;
      }
      this.DataContext = this.objVm;
      var oSelectedItems: ObservableCollection<CListItem> = new ObservableCollection<CListItem>();
      var oItem: CListItem = new CListItem();
      oItem.DisplayText = this.strUserName;
      oItem.Value = AppContextInfo.UserOID;
      oSelectedItems.Add(oItem);
      var lstItems: List<SLSFSItem> = new List<SLSFSItem>();
      lstItems.Add(ObjectHelper.CreateObject(new SLSFSItem(), { DisplayText: this.strUserName, DisplayValue: AppContextInfo.UserOID, Sfskey: AppContextInfo.UserOID, Sfstype: "cp" }));
      this.sfsAdministeredby.AddSFSItems(lstItems);
      this.objVm.AdministrationDetail.AdministeredByList = oSelectedItems;
      this.objVm.AdministrationDetail.AdministeredBy = oSelectedItems[0].DisplayText;
      this.objVm.AdministrationDetail.AdministeredByOID = oSelectedItems[0].Value;
      this.sfsAdministeredby.GetSFSItems("cp");
      this.sfsWitnessedby.GetSFSItems("cp");
      if (this.objslotVM.Status != SlotStatus.PLANNED && this.objslotVM.Status != SlotStatus.DUENOW && this.objslotVM.Status != SlotStatus.OVERDUE && this.objslotVM.Status != SlotStatus.NOTYETRECORDED) {
          this.objVm.AdministrationDetail.AdminComments = this.strComments;
      }
      if (this.objslotVM != null && this.objslotVM.AdministrationDetail != null) {
          this.objVm.AdministrationDetail.IsDuringHomeLeave = this.objslotVM.AdministrationDetail.IsDuringHomeLeave;
      }

      this.GetCliniicalIncidentFormConfig();
      
      if (this.iRdbNotGiven.IsChecked == true) {
          var sDisplayText: string = String.Empty;
          for (let i: number = 0; i < this.cboResNotGiven.Items.Count(); i++) {
              if (String.Compare(this.cboResNotGiven.Items[i].Value, this.objAdminDetail.AmendReasonCode) == 0) {
                  sDisplayText = this.cboResNotGiven.Items[i].DisplayText;
                  break;
              }
          };
          if (!String.IsNullOrEmpty(sDisplayText)) {
              var oReasonNotGiven: CListItem = ObjectHelper.CreateObject(new CListItem(), {
                  DisplayText: this.objAdminDetail.Site,
                  Value: this.objAdminDetail.AmendReasonCode
              });
              this.objVm.AdministrationDetail.ReasonNotGiven = oReasonNotGiven;
          }
      }

      if (this.objAdminDetail.CDWardRegItemOID > 0 || this.objAdminDetail.CDPatientRegItemOID > 0) {
          this.oAdministrableQtyView = new AdministrableQtyView();
          if (this.oAdministrableQtyViewVM == null)
              this.oAdministrableQtyViewVM = new AdministrableQtyViewVM();
          this.oAdministrableQtyViewVM.TransactionItemPackDetails = new ObservableCollection<TransactionItemPackDetails>();
      }
      var objService: QueryPatientRecordWSSoapClient = new QueryPatientRecordWSSoapClient();
      objService.GetPatientPersonalCarerCompleted = (s,e) => (this.objService_GetPatientPersonalCarerCompleted(e));
      var objReq: CReqMsgGetPatientPersonalCarer = new CReqMsgGetPatientPersonalCarer();
      objReq.oContextInformation = CommonBB.FillContext();
      objReq.PatientIDBC = Convert.ToString(PatientContext.PatientOID);
      objReq.CurrentBC = "IncludeRemoved";
      objService.GetPatientPersonalCarerAsync(objReq);
  }

  oSlotHelper_RefreshRecordAdminEvent(oAdminDetail: AdministrationDetail, oAmendMsg: MedAmendMessageVM): void {
      this.oMedAmendMessageVM = oAmendMsg;
      if(this.objVm != null && this.objVm.IsPICompOrDiscAndScheduleDTTMBeyondPIStopDTTM) {
          this.objslotVM.IsPICompOrDiscAndScheduleDTTMBeyondPIStopDTTM = this.objVm.IsPICompOrDiscAndScheduleDTTMBeyondPIStopDTTM;
          this.dupDialogRef.close();
          this.objslotVM.IsSubmitInProgress = false;
          Busyindicator.SetStatusIdle("Administration");
          if (this.OnRecAdminFinishEvent != null)
              this.OnRecAdminFinishEvent(this);
      }
      else if (this.oMedAmendMessageVM != null && !String.IsNullOrEmpty(this.oMedAmendMessageVM.AmendMsg)) {
          this.objslotVM.IsSubmitInProgress = false;
          Busyindicator.SetStatusIdle("Administration");
          var bMsgType: boolean = false;
          if (this.objVm != null && String.Compare(this.objVm.DoseType, DoseTypeCode.TITRATED) == 0 && (this.objVm.Dose == null || this.objVm.LDose == null) && this.objVm.AdministrationDetail != null && String.IsNullOrEmpty(this.objVm.AdministrationDetail.Dose)) {
              bMsgType = true;
              this.oMedAmendMessageVM.AmendMsgOkCancel = Resource.MedAmendMessage.lblAmendOk_Text;
          }
          this.objAmendmentmessage = new MedAmendMessage(this.oMedAmendMessageVM);
          this.objAdminDetail = oAdminDetail;
          if (bMsgType) {
              AppActivity.OpenWindow("Amend", this.objAmendmentmessage, (s,e) => { this.objAmendmentmessage_Closed(s) }, "", false, 300, 400, false, WindowButtonType.Ok, null);
          }
          else 
              AppActivity.OpenWindow("Amend", this.objAmendmentmessage, (s,e) => { this.objAmendmentmessage_Closed(s) }, "", false, 300, 400, false, WindowButtonType.OkCancel, null);
          }
      else {
          this.FinishAdmin();
      }
  }
  objAmendmentmessage_Closed(args: AppDialogEventargs): void {
      if(!this.objslotVM.IsSubmitInProgress) {
          if (args.Result == AppDialogResult.Cancel) {
              this.objslotVM.IsSubmitInProgress = false;
              Busyindicator.SetStatusIdle("Administration");
              this.objAmendmentmessage.appDialog.DialogResult = false;
              if (this.objVm == null)
                  this.objVm = new SlotDetailVM();
              this.objVm.IsAmend = true;
              this.GetSlotInfo();
              this.cboRoute.SelectedIndex = (this.cboRoute.Items != null && this.cboRoute.Items.Count() == 1) ? 0 : -1;
          }
          else {
              this.objslotVM.IsSubmitInProgress = true;
              Busyindicator.SetStatusBusy("Administration", true);
              this.objAmendmentmessage.appDialog.DialogResult = true;
              this.FinishAdmin();
          }
      }
  }
  private FinishAdmin(): void {
      var isValidData: boolean = this.ValidateData();
      if(isValidData) {
          this.ValidatePatientWBScanAndSubmitRecordAdministration();
      }
      else {
          this.objslotVM.IsSubmitInProgress = false;
          Busyindicator.SetStatusIdle("Administration");
          this.objDoseDis = new MedsAdminDoseDiscrepancyReason();
          this.objDoseDis.constructorImpl(this.objVm);
          this.objVm.DoseVolumeShow = Visibility.Collapsed;
          this.objVm.DoseVolumeTitle = Resource.MedicationAdministrator.lblTitle_Text;
          this.DataContext = this.objVm;
        //   ObjectHelper.stopFinishAndCancelEvent(true);
          if(ProfileData.ClinicalIncidentConfig != null && ProfileData.ClinicalIncidentConfig.isRecordAdminDoseDiscrepancy) {
            AppActivity.OpenWindow("Dose discrepancy reason", this.objDoseDis,
                  (s, e) => { this.objDoseDis_Closed(s); },
                  "Record reason for discrepancy",
                  true, 266, 355, true,
                  WindowButtonType.OkCancel, null);
          }
          else {
              AppActivity.OpenWindow("Dose discrepancy reason", this.objDoseDis, (s, e) => { this.objDoseDis_Closed(s);}, "Record reason for discrepancy", true, 266, 355, true, WindowButtonType.OkCancel, null);
          }
      }
  }
  getAssosiatedDrugSites(): void
  {
      var objService: IPPMAManagePrescSer.IPPMAManagePrescriptionWSSoapClient = new IPPMAManagePrescSer.IPPMAManagePrescriptionWSSoapClient();
      objService.GetDrugSitesCompleted = (s,e) => { this.objService_GetDrugSitesCompleted(s, e) };
      var objAllRequest: IPPMAManagePrescSer.CReqMsgGetDrugSites = new IPPMAManagePrescSer.CReqMsgGetDrugSites();
      objAllRequest.IdentifyingOIdBC = this.objVm.IdentifyingOID;
      objAllRequest.IdentifyingTypeBC = this.objVm.IdentifyingType;
      objAllRequest.MCVersionBC = this.objVm.MCVersionNo;
      objAllRequest.oContextInformation = Common.FillContext();
      objService.GetDrugSitesAsync(objAllRequest);
  }
  objService_GetDrugSitesCompleted(sender: Object, e: IPPMAManagePrescSer.GetDrugSitesCompletedEventArgs): void {
      var _ErrorID: number = 80000091;
      var _ErrorSource: string = "LorAppMedicationAdminBBUI_P2.dll, Class:Medsadminrecordadmin, Method:objService_GetDrugSitesCompleted()";
      if(e.Error == null) {
          try {
              var objResponse: IPPMAManagePrescSer.CResMsgGetDrugSites = e.Result;
              if (objResponse != null && objResponse.objSites != null) {
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
          catch (ex:any) {
              var lnReturn: number = AMSHelper.PublicExceptionDetails(_ErrorID, _ErrorSource, ex);
          }

      }
      else {
          var lnReturn: number = AMSHelper.PublicExceptionDetails(_ErrorID, _ErrorSource, e.Error);
      }
  }
  GetWitnessRequired(): void {
      var objService: IPPMAPrescribableDefnWSSoapClient = new IPPMAPrescribableDefnWSSoapClient();
      objService.IsWitnessRequiredCompleted = (s, e) => { this.objService_IsWitnessReqdCompleted(s, e) };
      var objReq: CReqMsgIsWitnessRequired = new CReqMsgIsWitnessRequired();
      objReq.oContextInformation = CommonBB.FillContext();
      objReq.CriteriaBC = new PrescribableDefn.WitnessCriteria();
      objReq.CriteriaBC.PrescriptionItemOid = this.lnPrescriptionOID;
      objReq.CriteriaBC.ServicePoints = new ObservableCollection<PrescribableDefn.ObjectInfo>();
      objReq.CriteriaBC.ServicePoints.Add(ObjectHelper.CreateObject(new PrescribableDefn.ObjectInfo(), { OID: MedChartData.ServiceOID }));
      objReq.CriteriaBC.Drugs = new ObservableCollection<PrescribableDefn.ObjectInfo>();
      objReq.CriteriaBC.Drugs.Add(ObjectHelper.CreateObject(new PrescribableDefn.ObjectInfo(), { Code: this.strLorenzoID }));
      objReq.CriteriaBC.Roles = new ObservableCollection<PrescribableDefn.ObjectInfo>();
      objReq.CriteriaBC.Roles.Add(ObjectHelper.CreateObject(new PrescribableDefn.ObjectInfo(), { OID: Convert.ToInt64(AppContextInfo.JobRoleOID) }));
      objReq.CriteriaBC.Routes = new ObservableCollection<PrescribableDefn.ObjectInfo>();
      objReq.CriteriaBC.Routes.Add(ObjectHelper.CreateObject(new PrescribableDefn.ObjectInfo(), { OID: this.lnRouteOID }));
      var patientAge: number = -1;
      if(!String.IsNullOrEmpty(PatientContext.DOB) && Convert.ToDateTime(PatientContext.DOB) <= CommonBB.GetServerDateTime() && Number.TryParse(PatientContext.PatientAge, (o) => { patientAge = o})) {
          objReq.CriteriaBC.AgeFrom = patientAge;
      }
      else {
          objReq.CriteriaBC.AgeFrom = -1;
      }
      objReq.CriteriaBC.IsControlledDrugIncluded = this.bIsControlledDrug;
      objService.IsWitnessRequiredAsync(objReq);
}
objService_IsWitnessReqdCompleted(sender: Object, e: IsWitnessRequiredCompletedEventArgs): void {
    if(e.Result != null) {
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
                this.RefreshDivElements();
                this.IsWitnessOverrideAllowed = false;
            }
            else {
                if (this.sfsWitnessedby.Visibility == Visibility.Visible) {
                    this.chkNoWitness.Visibility = Visibility.Visible;
                    this.ShowDivElement("divchkNoWitness");
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
    }
    else {
        this.sfsWitnessedby.IsEnabled = this.bIsWitnessReqd;
        this.lblWitnessedBy.IsEnabled = this.bIsWitnessReqd;
        this.objVm.AdministrationDetail.WitnessMandatory = this.bIsWitnessReqd;
    }
    var selectedVal: CListItem = null;
    if (!String.IsNullOrEmpty(this.sAdminReason) && this.objVm.AdministrationDetail.ReasonForNotDefers != null) {
        for(let i = 0; i < this.objVm.AdministrationDetail.ReasonForNotDefers.Count; i++) {
            if (this.objVm.AdministrationDetail.ReasonForNotDefers[i].Value == this.sAdminReason) {
                selectedVal = this.objVm.AdministrationDetail.ReasonForNotDefers[i];
                break;
            }
        };
    }
    this.objVm.AdministrationDetail.ReasonForNotDefer = selectedVal;
    if (this.iRdbSelfAdmin.IsChecked && this.SelfAdminChkDefaultFlag) {
        this.SelfadminValidation();
        this.SelfAdminChkDefaultFlag = false;
    }
  }
  async sfsAdministeredby_OnSFSOpen(e): Promise<void> {
      this.oParam = AppContextInfo.OrganisationName;
      var oSelectedItems: ObservableCollection<CListItem>  = new ObservableCollection<CListItem>();
      var returnValue: ScriptObject = <ScriptObject>(await HtmlPage.Window.InvokeAsync("SFSCareProvider", this.oParam) as ScriptObject);
      
      if(returnValue != null && returnValue.GetProperty("length") != null) {
          var nSelectCnt: number = Convert.ToInt32(returnValue.GetProperty("length"));
          var selectedValue: ScriptObject = <ScriptObject>(returnValue.GetProperty("0") as ScriptObject);
          var oItem: CListItem = new CListItem();
          oItem.DisplayText = <string>(selectedValue["SurName"] as string);
          if (!String.IsNullOrEmpty(<string>(selectedValue["ForeName"] as string))) {
              oItem.DisplayText += " ";
              oItem.DisplayText += selectedValue["ForeName"];
          }
          oItem.Value = <string>(selectedValue["OId"] as string);
          oSelectedItems.Add(oItem);
      }

      if(oSelectedItems != null && oSelectedItems.Count > 0) {
          Common.AddSelItemIntoSFSQuickList(this.objVm.AdministrationDetail.AdministeredByList, oSelectedItems[0].Value, oSelectedItems[0].DisplayText.Trim(), "cp", this.sfsAdministeredby);
          this.objVm.AdministrationDetail.AdministeredByList = new ObservableCollection<CListItem>(this.objVm.AdministrationDetail.AdministeredByList.OrderBy(oItem => oItem.DisplayText));
          this.objVm.AdministrationDetail.AdministeredBy = oSelectedItems[0].DisplayText.Trim();
          this.objVm.AdministrationDetail.AdministeredByOID = oSelectedItems[0].Value;
      }
  }
  async sfsWitnessedby_OnSFSOpen(e): Promise<void> {
      if (this.sfsWitnessedby.SelectedValue) {
        if (this.sfsWitnessedby.searchText.trim() == "") {
            this.objVm.AdministrationDetail.WitnessBy = String.Empty;
            this.objVm.AdministrationDetail.WitnessByOID = String.Empty;
        }
      }

      this.oParam = AppContextInfo.OrganisationName;
      var oSelectedItems: ObservableCollection<CListItem>  = new ObservableCollection<CListItem>();
      var returnValue: ScriptObject = <ScriptObject>(await HtmlPage.Window.InvokeAsync("SFSCareProvider", this.oParam) as ScriptObject);
      
      if(returnValue != null && returnValue.GetProperty("length") != null) {
          var nSelectCnt: number = Convert.ToInt32(returnValue.GetProperty("length"));
          var selectedValue: ScriptObject = <ScriptObject>(returnValue.GetProperty("0") as ScriptObject);
          var oItem: CListItem = new CListItem();
          oItem.DisplayText = <string>(selectedValue["SurName"] as string);
          if (!String.IsNullOrEmpty(<string>(selectedValue["ForeName"] as string))) {
              oItem.DisplayText += " ";
              oItem.DisplayText += selectedValue["ForeName"];
          }
          oItem.Value = <string>(selectedValue["OId"] as string);
          oSelectedItems.Add(oItem);
      }
      if(oSelectedItems != null && oSelectedItems.Count > 0) {
          if (this.objVm.AdministrationDetail.WitnessByList == null)
            this.objVm.AdministrationDetail.WitnessByList = new ObservableCollection<CListItem>();
          Common.AddSelItemIntoSFSQuickList(this.objVm.AdministrationDetail.WitnessByList, oSelectedItems[0].Value, oSelectedItems[0].DisplayText.Trim(), "cp", this.sfsWitnessedby);
          this.objVm.AdministrationDetail.WitnessByList = new ObservableCollection<CListItem>(this.objVm.AdministrationDetail.WitnessByList.OrderBy(oItem => oItem.DisplayText));
          this.objVm.AdministrationDetail.WitnessBy = oSelectedItems[0].DisplayText.Trim();
          this.objVm.AdministrationDetail.WitnessByOID = oSelectedItems[0].Value;
      }
  } 
  sfsWitnessedby_OnGetItems(sender: Object, Result: ObservableCollection<CListItem> ): void {
      if(this.objVm != null && this.objVm.AdministrationDetail != null) {
          this.objVm.AdministrationDetail.WitnessByList = Result;
          if (this.objVm != null && this.objVm.AdministrationDetail != null && !String.IsNullOrEmpty(this.objVm.AdministrationDetail.WitnessByOID)) {
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
  }
  ValidateUser(_SelectedUserType: SelectedUserType): void {
      var _MsgResxKey: string ;
      if(_SelectedUserType == SelectedUserType.WitnessingUser) {
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
  OnUserAuthCompleted(oAuthResult: AuthResult, _SelectedUserType: SelectedUserType): void {
      if(_SelectedUserType == SelectedUserType.WitnessingUser && (oAuthResult == AuthResult.FailedSinceSameUser || oAuthResult == AuthResult.Cancelled)) {
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
  chkNoWitness_Checked(e): void {
      this.sfsWitnessedby.IsEnabled = false;
      this.lblWitnessedBy.Mandatory = false;
      this.lblWitnessedBy.IsEnabled = false;
      if(!String.IsNullOrEmpty(this.lblcliniIncFrmValue.Text)) {
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
  chkNoWitness_Unchecked(e): void {
      this.lblcliniIncFrm.Visibility = Visibility.Collapsed;
      this.lblcliniIncFrmValue.Visibility = Visibility.Collapsed;
      if(this.bIsWitnessReqd) {
          if (this.iRdbGiven.IsChecked)
                this.lblWitnessedBy.Mandatory = true;
          this.sfsWitnessedby.IsEnabled = true;
          this.lblWitnessedBy.IsEnabled = true;
          this.chkNoWitness.IsEnabled = true;
      }
      else {
          if (!this.rdbparent.IsChecked) {
            this.sfsWitnessedby.IsEnabled = false;
            this.lblWitnessedBy.Mandatory = false;
            this.lblWitnessedBy.IsEnabled = false;
          }
      }
      this.RefreshDivElements();
  }
  GetCliniicalIncidentFormConfig(): void {
      if(ProfileData.ClinicalIncidentConfig != null && ProfileData.ClinicalIncidentConfig.isRecordAdminWitnessOverride) {
          this.objVm.AdministrationDetail.ClinicalIncidentForm = ProfileData.ClinicalIncidentConfig.LinkTextToDisplay;
      }
      this.objVm.GetDomainCombo();
      this.GetWitnessRequired();
  }
  lblCIFValue_MouseLeftButtonUp(e): void {
      if(ProfileData.ClinicalIncidentConfig != null && !String.IsNullOrEmpty(ProfileData.ClinicalIncidentConfig.Address) && Common.ValidateURL(ProfileData.ClinicalIncidentConfig.Address)) {
          HtmlPage.Window.Invoke("LaunchClinicalIncidentForm", ProfileData.ClinicalIncidentConfig.Address);
      }
  }
  cboResNotGiven_SelectionChanged(e): void {
      if(this.cboResNotGiven.GetValue() == "CC_CLNCLRSN")
          this.lblComments.Mandatory = true;
      else this.lblComments.Mandatory = false;
  }
  cboParentCarer_SelectionChanged(e): void
  {
      if(this.cboParentCarer.SelectedValue == null || String.Equals(this.cboParentCarer.SelectedItem.DisplayText, this.sParentCarer) || String.Equals(this.cboParentCarer.SelectedItem.DisplayText, this.sPatinet))
          this.objVm.AdministrationDetail.PersonalCarerRelationship = String.Empty;
      else {
          var relationCode: string = String.Empty;
          if (this.objVm.AdministrationDetail.ParentCarerList != null && this.objVm.AdministrationDetail.ParentCarerList.Count > 0) {
              relationCode = this.objVm.AdministrationDetail.ParentCarerList.Where(c => c.Value == this.cboParentCarer.GetValue().ToString()).Select(s => s.Tag).FirstOrDefault().ToString();
          }
          if (!String.IsNullOrEmpty(relationCode)) {
              if (this.resolvedConceptCodes != null && this.resolvedConceptCodes.Count > 0) {
                  this.objVm.AdministrationDetail.PersonalCarerRelationship = this.resolvedConceptCodes.Where(c => c.Value == relationCode).Select(s => s.DisplayText).FirstOrDefault().ToString();
              }
          }
          else this.objVm.AdministrationDetail.PersonalCarerRelationship = String.Empty;
      }
  }
  cmdObservationsResults_Click(e): void {
      var bResult: boolean = Common.LaunchObservation(this.lnPrescriptionOID,
                  this.IdentifyingType,
                  this.IdentifyingOID,
                  this.MCVersion, !String.IsNullOrEmpty(this.sObsDrugName) ? this.sObsDrugName : this.sDrugName, this.sItemSubType, this.sMCitemname, this.slorenzoid, this.ObservationFinished);
  }
  ObservationFinished(args: ChildWizardCloseEventargs): void {
        var sContData: string = String.Empty;
        if(args != null && !String.IsNullOrEmpty(args.ContextData))
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
            serviceProxy.GetLatestObsOrResultDetailsCompleted = (s, e) => { this.serviceProxy_GetLatestObsOrResultDetailsCompleted(s, e) };
            serviceProxy.GetLatestObsOrResultDetailsAsync(oReq);
        }
    }
    private serviceProxy_GetLatestObsOrResultDetailsCompleted(sender: Object, e: GetLatestObsOrResultDetailsCompletedEventArgs): void {
        if(e.Error != null)
            return;
        var oResGetLatestObsOrResultDetails: CResMsgGetLatestObsOrResultDetails = e.Result;
        if (oResGetLatestObsOrResultDetails != null && oResGetLatestObsOrResultDetails.oPatLatObsResVal != null && oResGetLatestObsOrResultDetails.oPatLatObsResVal.EntityDetails != null) {
            if (!String.IsNullOrEmpty(oResGetLatestObsOrResultDetails.oPatLatObsResVal.EntityDetails) && oResGetLatestObsOrResultDetails.oPatLatObsResVal.RecordedDate != DateTime.MinValue && oResGetLatestObsOrResultDetails.oPatLatObsResVal.RecordedDate >= this.ConditionalVM.PresItemStartDTTM)
                this.ConditionalVM.LatestObservationResultDetails = oResGetLatestObsOrResultDetails.oPatLatObsResVal.EntityDetails + " on " + oResGetLatestObsOrResultDetails.oPatLatObsResVal.RecordedDate.ToString(CConstants.DateTimeFormat);
        }
    }
    cmdRemove_Click(e): void {
        var oService: MedicationAdministrationWSSoapClient = new MedicationAdministrationWSSoapClient();
        oService.StrikethroughAdminCompleted = (s, ea) => {
            if (ea.Result != null) {
                var oResStrikethroughAdmin: CResMsgStrikethroughAdmin = ea.Result;
                if (this.objVm.AdministrationDetail.IsDuringHomeLeave) {
                    this.objVm.Status = SlotStatus.HOMELEAVE;
                }
                else {
                    this.objVm.Status = this.SlotCurrentStatus(MedChartData.DuenessThreshold, CConstants.OverdueToNotknownTime, this.dtSlotDate);
                }
                this.objVm.AdministrationDetail.IsHistoryExists = false;
                this.objVm.PresScheduleOID = this.lnPrescriptionSchOID;
                this.objVm.PrescriptionItemOID = this.lnPrescriptionOID;
                this.DataContext = this.objVm;
            }
            if (ea.Error == null) {
                 this.appDialog.DialogResult = true;
                if (this.OnRecAdminFinishEvent != null)
                    this.OnRecAdminFinishEvent(this);
            }
        };
        var oReqStrikethroughAdmin: CReqMsgStrikethroughAdmin = new CReqMsgStrikethroughAdmin();
        oReqStrikethroughAdmin.oStrikethroughAdminBC = new CStrikethroughAdmin();
        oReqStrikethroughAdmin.oStrikethroughAdminBC.MedAdminOID = this.lnMedsAdminOID;
        oReqStrikethroughAdmin.oStrikethroughAdminBC.PrescriptionItemScheduleOID = this.lnPrescriptionSchOID;
        oReqStrikethroughAdmin.oStrikethroughAdminBC.ReasonCode = "CC_DEFER";
        if(this.objVm.AdministrationDetail.IsDuringHomeLeave) {
            oReqStrikethroughAdmin.oStrikethroughAdminBC.ActionCode = SlotStatus.HOMELEAVE;
        }
        else {
            oReqStrikethroughAdmin.oStrikethroughAdminBC.ActionCode = "";
        }
        oReqStrikethroughAdmin.oContextInformation = CommonBB.FillContext();
        oReqStrikethroughAdmin.oStrikethroughAdminBC.PatientOID = ChartContext.PatientOID;
        oReqStrikethroughAdmin.oStrikethroughAdminBC.EncounterOID = ChartContext.EncounterOID;
        oService.StrikethroughAdminAsync(oReqStrikethroughAdmin);
    }
    private SlotCurrentStatus(DuenessWindowTime: number, OverdueThresholdTime: number, SlotScheduleDTTM: DateTime): string {
        var dtCurrentDate: DateTime = CommonBB.GetServerDateTime();
        if (dtCurrentDate >= SlotScheduleDTTM.AddMinutes(-DuenessWindowTime) && dtCurrentDate <= SlotScheduleDTTM.AddMinutes(DuenessWindowTime))
            return SlotStatus.DUENOW;
        else if (dtCurrentDate > SlotScheduleDTTM.AddMinutes(DuenessWindowTime) && dtCurrentDate < SlotScheduleDTTM.Date.AddHours(OverdueThresholdTime))
            return SlotStatus.OVERDUE;
        else return SlotStatus.NOTKNOWN;
    }
  txtDose_KeyDown(e): void { 
  }
    SteppedImg_Click(e): void {
        if (String.Compare(this.strDoseType, DoseTypeCode.CONDITIONAL) == 0 && !this.bIsCondViewOpen) {
            if (this.ConditionalVM == null) {
                this.ConditionalVM = ObjectHelper.CreateObject(new ConditionalDoseVM(RequestSource.RecordAdmin, this.lnPrescriptionOID, this.bIsAmend, true), { DrugName: this.sDrugName });
                this.ConditionalVM.GetConditionalDoseRegimeCompleted.subscribe(data => {
                    this.bIsCondViewOpen = true;
                    this.ConditionalChildView = new ConditionalDoseChildView();
                    this.ConditionalChildView.conditionalDoseRegimeView1.bIsPRN = this.bIsPRN;
                    this.ConditionalChildView.conditionalDoseRegimeView1.IdentifyingOID = this.IdentifyingOID;
                    this.ConditionalChildView.conditionalDoseRegimeView1.IdentifyingType = this.IdentifyingType;
                    this.ConditionalChildView.conditionalDoseRegimeView1.PrescriptionItemOID = this.lnPrescriptionOID;
                    this.ConditionalChildView.conditionalDoseRegimeView1.MCVersionNo = this.MCVersion;
                    this.ConditionalChildView.conditionalDoseRegimeView1.sObsDrugName = !String.IsNullOrEmpty(this.sObsDrugName) ? this.sObsDrugName : this.sDrugName;
                    this.ConditionalChildView.DataContext = this.ConditionalVM;
                    this.ConditionalChildView.onDialogClose = this.ConditionalChildView_Closed;

                    AppActivity.OpenWindow("Select dose", this.ConditionalChildView, (s, e) => {
                        this.ConditionalChildView_Closed(s);
                    }, this.sObsDrugName, false, 510, 400, true, WindowButtonType.OkCancel, null);
                })
            }
            else {
                this.ConditionalVM.CloneConditionalDose();

                this.bIsCondViewOpen = true;
                this.ConditionalChildView = new ConditionalDoseChildView();
                this.ConditionalChildView.conditionalDoseRegimeView1.bIsPRN = this.bIsPRN;
                this.ConditionalChildView.conditionalDoseRegimeView1.IdentifyingOID = this.IdentifyingOID;
                this.ConditionalChildView.conditionalDoseRegimeView1.IdentifyingType = this.IdentifyingType;
                this.ConditionalChildView.conditionalDoseRegimeView1.PrescriptionItemOID = this.lnPrescriptionOID;
                this.ConditionalChildView.conditionalDoseRegimeView1.MCVersionNo = this.MCVersion;
                this.ConditionalChildView.conditionalDoseRegimeView1.sObsDrugName = !String.IsNullOrEmpty(this.sObsDrugName) ? this.sObsDrugName : this.sDrugName;
                this.ConditionalChildView.DataContext = this.ConditionalVM;
                this.ConditionalChildView.onDialogClose = this.ConditionalChildView_Closed;

                AppActivity.OpenWindow("Select dose", this.ConditionalChildView, (s, e) => {
                    this.ConditionalChildView_Closed(s);
                }, this.sObsDrugName, false, 510, 400, true, WindowButtonType.OkCancel, null);
            }
            
        }
    }
  ConditionalChildView_Closed(args: AppDialogEventargs): void {
      this.bIsCondViewOpen = false;
      var bdialogresult: boolean = false;
      if(args.Result == AppDialogResult.Ok) {
          if (this.ConditionalChildView != null) {
              bdialogresult = this.ConditionalChildView.OKButtonClick();
              if (bdialogresult) {
                  var ConditionalVM: ConditionalDoseVM = <ConditionalDoseVM>(this.ConditionalChildView.DataContext as ConditionalDoseVM);
                  this.FillSelectedConditionalDose(ConditionalVM);
                  this.ConditionalChildView.appDialog.DialogResult = bdialogresult;
              }
          }
      }
      else if (args.Result == AppDialogResult.Cancel) {
          this.ConditionalChildView.CancelButtonClick();
          this.ConditionalChildView.appDialog.DialogResult = true;
      }
  }
  ConditionalView_Close(args: AppDialogEventargs): void {
      if(args.Result == AppDialogResult.Cancel) {
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
      if(ConditionalVM == null)
          return;
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
              this.cboDoseUOM.Visibility = Visibility.Collapsed;
              this.lblDoseUoM.Visibility = Visibility.Visible;
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
  public barcodeStyleFocus = false;
  txtBarcode_KeyDown(e): void {
        var oManageBarcodeHelper: ManageBarcodeHelper = new ManageBarcodeHelper();
        oManageBarcodeHelper.GetPatientQuickSearchDetails(e.target.value, this.objslotVM != null ? this.objslotVM.PresScheduleOID : 0);
        setTimeout(() => {
            e.target.value = String.Empty;
        }, 400);
        this.IsPatWristBandOverridden = false;
  }
  cmdWristbandScan_Click(e): void {
      this.txtBarcodeRecAdmin.nativeElement.focus();
  }
  txtBarcode_LostFocus(e): void {
    e.target.value = String.Empty;
    this.barcodeStyleFocus = false;
  }
  txtBarcode_GotFocus(e): void {
    e.target.value = String.Empty;
    this.barcodeStyleFocus = true;
  }
  sfsWitnessedby_KeyUp(e): void {
      if(this.objVm != null)
          this.objVm.PasswordSuccess = false;
  }
  cboRoute_SelectionChanged(e): void {
      if(this.objVm != null && this.objVm.Routes != null && this.objVm.Routes.Count > 1 && this.objVm.AdministrationDetail != null && this.objVm.AdministrationDetail.RouteOID != null) {
          if (!this.ValidateRouteforScanMeds()) {
            Int64.TryParse(this.objVm.AdministrationDetail.RouteOID.Value, (o) => { this.lnRouteOID = o });
              this.GetWitnessRequired(); 
          }
          this.IsRouteChngd = false;
      }
  }
  ValidateRouteforScanMeds(): boolean {
    if (this.objVm.MedScanRecadminDetail != null) {
        if ((this.objVm.MedScanRecadminDetail.RecMedRouteOID == Convert.ToInt64(this.objVm.AdministrationDetail.RouteOID.Value))) {
            this.IsRouteChngd = true;
        }

        if (!this.IsRouteChngd && this.objVm.MedScanRecadminDetail != null && this.objVm.MedScanRecadminDetail.oProductDetailsInfo.Count > 0 && (this.iRdbGiven.IsChecked == true || this.iRdbSelfAdmin.IsChecked == true)) {
            let iMsgBox: iMessageBox = ObjectHelper.CreateObject(new iMessageBox(), {
                Title: CConstants.MSGTitleName,
                Message: Resource.MedScanRecAdmin.RemoveMed_Msg,
                MessageButton: MessageBoxButton.YesNo,
                IconType: MessageBoxType.Question
            });
            iMsgBox.MessageBoxClose = (s, e) => { this.RouteChangeMsgBox_YesNo(s, e); };
            iMsgBox.Show();
            return true;
        }
    }
    return false;
  }
  RouteChangeMsgBox_YesNo(sender: Object, e: MessageEventArgs): void {
      if(e.MessageBoxResult == MessageBoxResult.Yes) {
          this.objVm.MedScanRecadminDetail = null;
          this.oMedScanRecAdmVM = null;
          MedChartData.IsMedScanSuccess = false;
          this.lnRouteOID = this.objVm.RouteOID = Convert.ToInt64(this.objVm.AdministrationDetail.RouteOID.Value);
          this.GetWitnessRequired();
          this.objVm.AdministrationDetail.IsBatchenabled = true;
          this.objVm.AdministrationDetail.IsExpiryenabled = true;
      }
      else {
          this.IsRouteChngd = false;
          // var tempRoute: CListItem = this.objVm.Routes.Where(c => !String.IsNullOrEmpty(c.Value) && String.Equals(c.Value, Convert.ToString(this.lnRouteOID), StringComparison.InvariantCultureIgnoreCase)).FirstOrDefault();
          // this.objVm.AdministrationDetail.RouteOID = tempRoute;
          this.lnRouteOID = this.objVm.MedScanRecadminDetail.RecMedRouteOID;
          this.objVm.Routes.forEach((tempRoute) => {
              if (String.Equals(tempRoute.Value, Convert.ToString(this.lnRouteOID))) {
                  this.objVm.AdministrationDetail.RouteOID = tempRoute;
              }
          });
       
      }
  }
  cmdRequest_Click(e): void {
    // ObjectHelper.stopFinishAndCancelEvent(false);
      var IsLaunched: boolean = Common.LaunchReqMed();
  }
  cboResFordefer_SelectionChanged(e): void {
      if(this.cboResFordefer.GetValue() == "CC_CLNCLRSN")
          this.lblComments.Mandatory = true;
      else 
          this.lblComments.Mandatory = false;
  }

  cmdLinks_Click(e): void {
      var MonographParams: ObservableCollection<CListItem>  = new ObservableCollection<CListItem>();
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
  chkNoParentCarerlisted_Checked(e): void {
      this.SetParentCarerComboText(this.sParentCarer);
      this.cboParentCarer.IsEnabled = false;
      this.sfsAdministeredby.IsEnabled = false;
      this.lblAdministeredby.IsEnabled = false;
      this.lblAdministeredby.Mandatory = false;
      if(this.objVm != null && this.objVm.AdministrationDetail != null) {
          this.objVm.AdministrationDetail.PersonalCarerRelationship = String.Empty;
      }
      this.RefreshDivElements();
  }
  chkNoParentCarerlisted_Unchecked(e): void
  {
      this.sfsAdministeredby.IsEnabled = MedChartData.AllowAnyUserForAdministration;
      this.cboParentCarer.IsEnabled = true;
      this.lblAdministeredby.IsEnabled = true;
      this.lblAdministeredby.Mandatory = true;
      if(this.objVm != null && this.objVm.AdministrationDetail != null) {
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
      if(!this.objVm.AdministrationDetail.IsPersonalCarerNotListed)
      this.chkNoParentCarerListed.IsChecked = false;
      this.lblNoParentCarerListed.Visibility = Visibility.Collapsed;
      this.cboParentCarer.Visibility = Visibility.Visible;
      this.cboParentCarer.IsEnabled = false;
      if(this.objVm != null && this.objVm.AdministrationDetail != null) {
          this.objVm.AdministrationDetail.AdminByPersonalCarer = null;
          this.objVm.AdministrationDetail.AdminByPersonalCarerOID = 0;
          this.objVm.AdministrationDetail.PersonalCarerRelationship = String.Empty;
          this.SetParentCarerComboText(this.sPatinet);
      }
      this.lblRelation.Visibility = Visibility.Collapsed;
      this.lblRelationSelected.Visibility = Visibility.Collapsed;
      this.sfsAdministeredby.SelectedText = String.Empty;
      this.sfsAdministeredby.SelectedValue = String.Empty;
  }
  private HidePatientParertCareControls(): void {
      if(this.iRdbGiven.IsChecked && this.iRdbGiven.IsChecked && this.rdbparent.IsChecked && this.rdbparent.IsChecked)
      {
          this.ShowParentCarerControls();
      }
      else {
          if (this.iRdbGiven.IsChecked && this.iRdbGiven.IsChecked && this.rdbCareProvider.IsChecked && this.rdbCareProvider.IsChecked) {
              this.lblAdministeredby.IsEnabled = true;  
              this.lblAdministeredby.Mandatory = true;
              this.sfsAdministeredby.IsEnabled = MedChartData.AllowAnyUserForAdministration;
              this.sfsAdministeredby.Visibility = Visibility.Visible;
          }
          this.rdbPatient.Visibility = Visibility.Collapsed;
          this.chkNoParentCarerListed.Visibility = Visibility.Collapsed;
          if(!this.objVm.AdministrationDetail.IsPersonalCarerNotListed)
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
      if(this.personalCarers != null && this.personalCarers.Count > 0) {
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
      if(this.objVm != null && this.objVm.AdministrationDetail != null) {
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
                  this.SetParentCarerComboText(this.sParentCarer);
                  this.objVm.AdministrationDetail.PersonalCarerRelationship = String.Empty;
              }
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
              this.SetParentCarerComboText(this.sParentCarer);
              if (this.objVm != null && this.objVm.AdministrationDetail != null) {
                  this.objVm.AdministrationDetail.PersonalCarerRelationship = String.Empty;
              }
          }
      }
      else {
          this.SetParentCarerComboText(this.sParentCarer);
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
      this.SetParentCarerComboText(this.sPatinet);
      this.cboParentCarer.IsEnabled = false;
      this.chkNoParentCarerListed.Visibility = Visibility.Collapsed;
      if(!this.objVm.AdministrationDetail.IsPersonalCarerNotListed)
      this.chkNoParentCarerListed.IsChecked = false;
      this.lblNoParentCarerListed.Visibility = Visibility.Collapsed;
      this.lblRelation.Visibility = Visibility.Collapsed;
      this.lblRelationSelected.Visibility = Visibility.Collapsed;
  }
  cmdScanRecMedication_Click(e): void {
      this.LaunchScanRecordMedication();
  }
  public LaunchScanRecordMedication(): void
  {
      if(!this.CheckMandatoryBeforeScan())
      {
          Busyindicator.SetStatusBusy("ScanRecordMed");
          this.oMedScanRecAdmVM = new MedScanRecAdmVM();
          this.oMedScanRecordadministration = new MedScanRecordAdministration();

          this.oMedScanRecordadministration.OnCloseMedScanMezEvent = (s) => {
              this.oMedScanRecordadministration_OnCloseMedScanMezEvent();
          };
          this.SetVMProperties(this.objVm);
          //this.oMedScanRecAdmVM.OldProductDetailsInfo = ManageBarcodeHelper.DeepCopy<ObservableCollection<ProductDetailsGrid>>(this.oMedScanRecAdmVM.oProductDetailsInfo);
          this.oMedScanRecAdmVM.OldProductDetailsInfo = this.CopyProductDetailsInfo(this.oMedScanRecAdmVM.oProductDetailsInfo);
          this.oMedScanRecordadministration.oMedScanRecAdmVM = this.oMedScanRecAdmVM;
        //   ObjectHelper.stopFinishAndCancelEvent(true);
          AppActivity.OpenWindow(Resource.MedScanRecAdmin.Mez_Title, 
              this.oMedScanRecordadministration, (s, e) => { this.oMedScanRecordadministration_Closed(s); }, 
              Resource.MedScanRecAdmin.Mez_Title, false, 470, 1100, false, WindowButtonType.OkCancel, null);
      }
  }
  oMedScanRecordadministration_OnCloseMedScanMezEvent(): void {
      Busyindicator.SetStatusIdle("ScanRecordMed");
      if(this.lstCMedBarcodeScanOverrideDetail == null)
          this.lstCMedBarcodeScanOverrideDetail = new ObservableCollection<CMedBarcodeScanOverrideDetail>();
      if (this.oMedScanRecAdmVM != null && this.oMedScanRecAdmVM.oMedBarScanOverideForInvalidORNotMatchProd != null) {
          this.lstCMedBarcodeScanOverrideDetail.Add(this.oMedScanRecAdmVM.oMedBarScanOverideForInvalidORNotMatchProd);
          this.oMedScanRecAdmVM = null;
          this.objVm.MedScanRecadminDetail = null;
      }
  }
  private SetVMProperties(objVm: SlotDetailVM): void {
      this.oMedScanRecAdmVM.oDrugHeader = (this.objDrugHeader != null && this.objDrugHeader.DataContext != null) ? <CDrugHeader>((this.objDrugHeader.DataContext) as CDrugHeader) : null;
      this.oMedScanRecAdmVM.MCVersion = objVm.MCVersionNo;
      this.oMedScanRecAdmVM.lnPrescriptionOID = this.lnPrescriptionOID;
      this.oMedScanRecAdmVM.SlotDose = !String.IsNullOrEmpty(objVm.AdministrationDetail.Dose) ? Convert.ToDouble(objVm.AdministrationDetail.Dose) : 0;
      this.oMedScanRecAdmVM.sDoseValUOM = this.sDoseValUOM;
      this.oMedScanRecAdmVM.sDoseUOMLzoID = this.sDoseUOMLzoID;
      this.oMedScanRecAdmVM.TotaldoseUOM = !String.IsNullOrEmpty(objVm.AdministrationDetail.strDoseUOM) ? objVm.AdministrationDetail.strDoseUOM : String.Empty;
      if(this.objslotVM.DrugDetail != null && !String.IsNullOrEmpty(this.objslotVM.DrugDetail.Fluidname)) {
          this.oMedScanRecAdmVM.IsInfPrescribeWithFluid = true;
      }
      this.oMedScanRecAdmVM.PresScheduleOID = this.lnPrescriptionSchOID;
      this.oMedScanRecAdmVM.TotaldoseadministeredAmt = !String.IsNullOrEmpty(objVm.AdministrationDetail.Dose) ? objVm.AdministrationDetail.Dose : String.Empty;
      this.oMedScanRecAdmVM.IsEnableTotalDoseValueAdmin = objVm.IsDoseEnabled;
      if (!String.IsNullOrEmpty(objVm.AdminMethod) || (String.Equals(this.sItemType, CConstants.Appliance) && objVm.AdministrationDetail != null && String.IsNullOrEmpty(objVm.AdministrationDetail.Dose) && String.IsNullOrEmpty(objVm.AdministrationDetail.strDoseUOM))) {
          this.oMedScanRecAdmVM.IsVisibleTotalDoseValueAdmin = Visibility.Collapsed;
      }
      if (objVm != null && objVm.AdministrationDetail != null && objVm.AdministrationDetail.RouteOID != null && !String.IsNullOrEmpty(objVm.AdministrationDetail.RouteOID.Value)) {
          this.oMedScanRecAdmVM.RecMedRouteOID = Convert.ToInt64(objVm.AdministrationDetail.RouteOID.Value);
      }
      if (this.oMedScanRecAdmVM.oProductDetailsInfo == null) {
          this.oMedScanRecAdmVM.oProductDetailsInfo = new ObservableCollection<ProductDetailsGrid>();
      }
      if (objVm.MedScanRecadminDetail != null && objVm.MedScanRecadminDetail.oProductDetailsInfo != null) {
          this.oMedScanRecAdmVM.oProductDetailsInfo = objVm.MedScanRecadminDetail.oProductDetailsInfo;
          this.oMedScanRecAdmVM.IsProductScanned = objVm.MedScanRecadminDetail.IsProductScanned;
      }
  }
  oMedScanRecordadministration_Closed(args: AppDialogEventargs): void {
      Busyindicator.SetStatusIdle("ScanRecordMed");
      this.oMedScanRecordadministration = <MedScanRecordAdministration>(args.Content.Component as MedScanRecordAdministration);
      if(args.Result == AppDialogResult.Ok) {
          this.oMedScanRecAdmVM = <MedScanRecAdmVM>(args.Content.Component.DataContext as MedScanRecAdmVM);
          if (this.oMedScanRecAdmVM != null) {
              if (this.oMedScanRecAdmVM.IsProductScanned.Equals('M')) {
                  var lstProductDetailInfo: ObservableCollection<ProductDetailsGrid> = new ObservableCollection<ProductDetailsGrid>(this.oMedScanRecAdmVM.oProductDetailsInfo.Where(c => ((!String.IsNullOrEmpty(c.Productcode) && !String.IsNullOrWhiteSpace(c.Productcode)) || !(c.Expirydate == DateTime.MinValue || c.Expirydate == null) || (!String.IsNullOrEmpty(c.Batchnumber) && !String.IsNullOrWhiteSpace(c.Batchnumber)) || (!String.IsNullOrEmpty(c.Serialnumber) && !String.IsNullOrWhiteSpace(c.Serialnumber)) || (!String.IsNullOrEmpty(c.Comments) && !String.IsNullOrWhiteSpace(c.Comments)))).Select(s => s));
                  this.oMedScanRecAdmVM.oProductDetailsInfo = lstProductDetailInfo;
              }
              this.objVm.MedScanRecadminDetail = this.oMedScanRecAdmVM;
              this.objVm.AdministrationDetail.Dose = !String.IsNullOrEmpty(this.objVm.MedScanRecadminDetail.TotaldoseadministeredAmt) ? this.objVm.MedScanRecadminDetail.TotaldoseadministeredAmt : String.Empty;
              if (this.objVm.MedScanRecadminDetail != null && this.objVm.MedScanRecadminDetail.IsProductScanned == 'S' && this.objVm.MedScanRecadminDetail.oProductDetailsInfo != null && this.objVm.MedScanRecadminDetail.oProductDetailsInfo.Count > 0)
                  MedChartData.IsMedScanSuccess = true;
              if (this.objVm.MedScanRecadminDetail != null && this.objVm.MedScanRecadminDetail.oProductDetailsInfo != null && this.objVm.MedScanRecadminDetail.oProductDetailsInfo.Count > 0) {
                  this.objVm.AdministrationDetail.IsBatchenabled = false;
                  this.objVm.AdministrationDetail.IsExpiryenabled = false;
              }
              else {
                  this.objVm.AdministrationDetail.IsBatchenabled = true;
                  this.objVm.AdministrationDetail.IsExpiryenabled = true;
              }
              this.oMedScanRecordadministration.dupDialogRef.close();
          } 
      }
      else if (args.Result == AppDialogResult.Cancel) {
          this.CancelButtonClick();
      }
  }
  private CancelButtonClick(): void {
      if (!this.oMedScanRecAdmVM.IsExpiryDTMsgShown) {
          var iMsgBox: iMessageBox = new iMessageBox();
          iMsgBox.Title = CConstants.MSGTitleName;
          iMsgBox.Message = Resource.MedScanRecAdmin.Cancel_Msg;
          iMsgBox.MessageButton = MessageBoxButton.YesNo;
          iMsgBox.IconType = MessageBoxType.Question;
          iMsgBox.MessageBoxClose = (s, e) => { this.iCancelMsgBox_MessageBoxClose(s, e); };
          iMsgBox.Show();
      }
  }
  iCancelMsgBox_MessageBoxClose(sender: Object, e: MessageEventArgs): void {
      var IsProdScanned: boolean ;
      if (e.MessageBoxResult == MessageBoxResult.Yes)
      {
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
          this.oMedScanRecordadministration.dupDialogRef.close();
      }
      else {
          if (this.oMedScanRecordadministration != null) {
              this.oMedScanRecordadministration.txtMedBarcode.Focus();
          }
      }
  }
  public CheckMandatoryBeforeScan(): boolean {
      if (this.objslotVM.ScanRecMedMultiRoute != MultiRouteType.Single_Route && this.objVm.AdministrationDetail != null && (this.objVm.AdministrationDetail.RouteOID == null || (this.objVm.AdministrationDetail.RouteOID != null && String.IsNullOrEmpty(this.objVm.AdministrationDetail.RouteOID.Value)))) {
          this.oMsg.Message = Resource.MedScanRecAdmin.MultiRoute_Msg;
          this.oMsg.IconType = MessageBoxType.Information;
          this.oMsg.Title = CConstants.MSGTitleName;
          this.oMsg.MessageButton = MessageBoxButton.OK;
          this.oMsg.Tag = "route";
          this.oMsg.MessageBoxClose  = (s,e) => { this.oMsg_RouteORDoseMessageBoxClosed(s,e); } ;
          this.oMsg.Show();
          return true;
      }
      else if ((this.objVm.IsDoseEnabled || (!String.IsNullOrEmpty(this.strDoseType) && String.Equals(this.strDoseType, DoseTypeCode.CONDITIONAL))) && (this.objVm.AdministrationDetail != null && String.IsNullOrEmpty(this.objVm.AdministrationDetail.Dose) || Convert.ToDouble(this.objVm.AdministrationDetail.Dose) == 0)) {
          this.oMsg.Message = Resource.MedScanRecAdmin.DoseMand_Msg;
          this.oMsg.IconType = MessageBoxType.Information;
          this.oMsg.Title = CConstants.MSGTitleName;
          this.oMsg.MessageButton = MessageBoxButton.OK;
          this.oMsg.Tag = "dose";
          this.oMsg.MessageBoxClose  = (s,e) => { this.oMsg_RouteORDoseMessageBoxClosed(s,e); } ;
          this.oMsg.Show();
          return true;
      }
      else if (!this.IsMedExclude && this.objslotVM.IsCustomiseMedScan) {
          this.oMsg.Message = Resource.MedScanRecAdmin.ExcludedMed_Msg;
          this.oMsg.IconType = MessageBoxType.Information;
          this.oMsg.MessageButton = MessageBoxButton.OK;
          this.oMsg.Title = CConstants.MSGTitleName;
          this.oMsg.Tag = "exclude";
          this.oMsg.MessageButton = MessageBoxButton.YesNo;
          this.oMsg.MessageBoxClose  = (s,e) => { this.iExcludedMedMsgBox_MessageBoxClose(s,e); } ;
          this.oMsg.Show();
          this.IsMedExclude = true;
          return true;
      }
      else if (!MedChartData.IsPatWBBarcodeScanOverriden && !MedChartData.IsMedBarcodeScanOverriden && !this.IsPatWristBandOverridden && MedChartData.IsPatWBScanMandatory && !MedChartData.IsPatWBScanSuccess && this.iRdbGiven.IsChecked == true) {
          this.IsLaunchedFromScanMedlink = true;
          this.LaunchOverrideScan();
          return true;
      }
      return false;
  }
  oMsg_RouteORDoseMessageBoxClosed(sender: Object, e: MessageEventArgs): void {
      if(String.Equals(this.oMsg.Tag.ToString(), "route"))
          this.cboRoute.Focus();
      else if (String.Equals(this.oMsg.Tag.ToString(), "dose"))
          this.txtDose.Focus();
  }
  ValidateOnActionChange(Value: string): void {
      this.NewAction = Value;
      if(this.objVm != null && this.objVm.MedScanRecadminDetail != null && this.objVm.MedScanRecadminDetail.oProductDetailsInfo != null && this.objVm.MedScanRecadminDetail.oProductDetailsInfo.Count > 0 && !String.Equals(this.NewAction, CConstants.ActionSelfAdmin) && !String.Equals(this.NewAction, CConstants.ActionGiven)) {
          var iMsgBox: iMessageBox = ObjectHelper.CreateObject(new iMessageBox(), {
          Title: CConstants.MSGTitleName,
          Message: Resource.MedScanRecAdmin.RemoveMed_Msg,
          MessageButton: MessageBoxButton.YesNo,
          IconType: MessageBoxType.Question
          });
          iMsgBox.MessageBoxClose  = (s,e) => { this.ValMsgBox_MessageBoxClose(s,e); } ;
          iMsgBox.Show();
      }
      else if (String.Equals(this.NewAction, CConstants.ActionSelfAdmin) || String.Equals(this.NewAction, CConstants.ActionGiven)) {
          this.OldAction = this.NewAction;
      }
  }
  ValMsgBox_MessageBoxClose(sender: Object, e: MessageEventArgs): void {
      if(e.MessageBoxResult == MessageBoxResult.Yes) {
          this.objVm.MedScanRecadminDetail = null;
          this.oMedScanRecAdmVM = null;
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
          else if (String.Equals(this.OldAction, CConstants.ActionDfrAdmin)) {
              this.iRdbDfrAdmin.IsChecked = true;
              this.iRdbDfrAdmin_Checked(null);
          }
          else if (String.Equals(this.OldAction, CConstants.ActionSelfAdmin)) {
              this.iRdbSelfAdmin.IsChecked = true;
              this.iRdbSelfAdmin_Checked(null);
          }
      }
  }
  iExcludedMedMsgBox_MessageBoxClose(sender: Object, e: MessageEventArgs): void {
      if(e.MessageBoxResult == MessageBoxResult.Yes) {
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

    if (this.iRdbDfrAdmin.Visibility == null || this.iRdbDfrAdmin.Visibility == Visibility.Visible) {
        nHeight = nHeight + 20;
        this.ShowDivElement("diviRdbDfrAdmin"); 
    }
    else
        this.HideDivElement("diviRdbDfrAdmin");

    if (this.iRdbGiven.IsChecked || this.iRdbSelfAdmin.IsChecked) {
        if (this.IsInfBolusItemsVisible)
            nHeight = nHeight + 20;
    }

    this.brdMedicationAction.Height = nHeight;
    
    let div = <HTMLElement>document.getElementById("divTopPanel");
    if (this.iRdbNotGiven.IsChecked || this.iRdbNotKnown.IsChecked || this.iRdbDfrAdmin.IsChecked)
        div.style.height = (nHeight + 20).ToString() + "px";
    else {
        if (this.SteppedImg.Visibility == Visibility.Visible)
            div.style.height = "200px";
        else
            div.style.height = "145px";
    }
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
            this.objVm.AdministrationDetail.AdminByPersonalCarer = oItem;
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
