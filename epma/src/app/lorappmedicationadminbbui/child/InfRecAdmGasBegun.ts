import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { StringBuilder, ProfileFactoryType, ContextManager, Convert, AppActivity, CommonBB, ApplicationHelper, ScriptObject } from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp, Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison, AppDialogEventargs, AppDialogResult, DelegateArgs, DialogComponentArgs, WindowButtonType, List, ChildWindow, AppContextInfo, ObservableCollection, HtmlPage, Visibility } from 'epma-platform/models';
import { AppDialog, Border, Grid, MouseButtonEventArgs, UserControl, iCheckBox, iComboBox, iDateTimePicker, iLabel, iTextBox, iTimeBox } from 'epma-platform/controls';
import { HelperService } from 'epma-platform/soapclient';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
import { SlotDetailVM } from '../viewmodel/MedicationChartVM';
import { CListItem, SLSFSItem } from 'src/app/shared/epma-platform/models/model';
import { ObservationChartVM } from '../ca/observationchart/ObservationChartVM';
import { MedsAdminUserAuthenticate } from 'src/app/lorappmedicationcommonbb/view/medsadminuserauthenticate';
import { InfDripRateCalculator } from './InfDripRateCalculator';
import { InfRecAdmBagDetails } from './InfRecAdmBagDetails';
import { InfRecAdmStrikeThrough } from './InfRecAdmStrikeThrough';
import { AdministrationDetail } from 'src/app/product/shared/models/medicationadminws';
import { InfRecAdmConditionalDose } from './InfRecAdmConditionalDose';
import { InfrecordadminVM } from '../viewmodel/InfrecordadminVM';
import { SelectedUserType, WitnessHelper } from 'src/app/lorappmedicationcommonbb/utilities/witnesshelper';
import { MedAdminViewHelper } from '../utilities/MedAdminViewHelper';
import { iSFS } from 'src/app/shared/epma-platform/controls/epma-isfs/epma-isfs.component';
import { RoutedEventArgs } from 'src/app/shared/epma-platform/controls/Control';
import { CReqMsgGetUser, CResMsgGetUser, CSecurityManagementServiceWSSoapClient, GetUserCompletedEventArgs } from 'src/app/shared/epma-platform/soap-client/CSecurityManagementServiceWS';
import { Busyindicator } from 'src/app/lorappcommonbb/busyindicator';
import { AuthResult } from 'src/app/lorappmedicationcommonbb/viewmodel/UserAuthenticateVM';
import { ProfileData } from '../utilities/ProfileData';
import { DateChangeEventArgs } from 'src/app/shared/epma-platform/controls/epma-datetimepicker/epma-datetimepicker.component';
import { Resource } from '../resource';
import * as ControlStyles from '../../shared/epma-platform/controls/ControlStyles';
import { Common } from '../utilities/common';

@Component({
    selector: 'InfRecAdmGasBegun',
    templateUrl: './InfRecAdmGasBegun.html'
})

export class InfRecAdmGasBegun extends UserControl {
    public Styles = ControlStyles;

    public objRecordAdmin = Resource.MedicationAdministrator;
    public MedCharOIDBC: number;
    objVm: SlotDetailVM;
    sDoseValUOM: string;
    lnRouteOID: number = 0;
    lstCListItem: List<SLSFSItem> = new List<SLSFSItem>();
    strLorenzoID: string = String.Empty;
    bIsControlledDrug: boolean = false;
    sAdminReason: string = String.Empty;
    public objObsResultVM: ObservationChartVM;
    lnPrescriptionOID: number = 0;
    MCVersion: string = String.Empty;
    oParam: string = String.Empty;
    IdentifyingOID: number = 0;
    public strUserName: string = String.Empty;
    sAdminMethod: string = String.Empty;
    sDrugName: string = String.Empty;
    dtSlotDate: DateTime;
    strComments: string = String.Empty;
    PrescItemStatus: string = String.Empty;
    sObsDrugName: string = String.Empty;
    lnDoseValUOMOID: number = 0;
    IdentifyingType: string = String.Empty;
    objMedsAdminUserAuthenticate: MedsAdminUserAuthenticate;
    sDoseUOMLzoID: string = String.Empty;
    strDose: string = String.Empty;
    public oChildWindow: ChildWindow;
    bIsWitnessReqd: boolean = false;
    objadmindripratecalc: InfDripRateCalculator;
    objadminbagdetails: InfRecAdmBagDetails;
    objstrikethrough: InfRecAdmStrikeThrough;
    public objAdminDetail: AdministrationDetail;
    //public delegate void OnRecAdminFinishDelegate();
    ConditionalChildView: InfRecAdmConditionalDose;
    // CurrentDt: DateTime= CommonBB.GetServerDateTime();
    sItemType: string = String.Empty;
    oInfrecVM: InfrecordadminVM;
    objWitnessHelper: WitnessHelper;
    oMedAdminViewHelper: MedAdminViewHelper;
    public LayoutRoot: Grid;
    @ViewChild("LayoutRootTempRef", { read: Grid, static: false }) set _LayoutRoot(c: Grid) {
        if (c) { this.LayoutRoot = c; }
    };
    public grdGasBsegun: Grid;
    @ViewChild("grdGasBsegunTempRef", { read: Grid, static: false }) set _grdGasBsegun(c: Grid) {
        if (c) { this.grdGasBsegun = c; }
    };
    public bgdroute: Border;
    @ViewChild("bgdrouteTempRef", { read: Border, static: false }) set _bgdroute(c: Border) {
        if (c) { this.bgdroute = c; }
    };
    public bgddatetime: Border;
    @ViewChild("bgddatetimeTempRef", { read: Border, static: false }) set _bgddatetime(c: Border) {
        if (c) { this.bgddatetime = c; }
    };
    public bgdflowrate: Border;
    @ViewChild("bgdflowrateTempRef", { read: Border, static: false }) set _bgdflowrate(c: Border) {
        if (c) { this.bgdflowrate = c; }
    };
    public bgdhumidification: Border;
    @ViewChild("bgdhumidificationTempRef", { read: Border, static: false }) set _bgdhumidification(c: Border) {
        if (c) { this.bgdhumidification = c; }
    };
    public bgdadminsteredby: Border;
    @ViewChild("bgdadminsteredbyTempRef", { read: Border, static: false }) set _bgdadminsteredby(c: Border) {
        if (c) { this.bgdadminsteredby = c; }
    };
    public bgdchkwitnessby: Border;
    @ViewChild("bgdchkwitnessbyTempRef", { read: Border, static: false }) set _bgdchkwitnessby(c: Border) {
        if (c) { this.bgdchkwitnessby = c; }
    };
    public bgdwitnessby: Border;
    @ViewChild("bgdwitnessbyTempRef", { read: Border, static: false }) set _bgdwitnessby(c: Border) {
        if (c) { this.bgdwitnessby = c; }
    };
    public bgdgrid1: Border;
    @ViewChild("bgdgrid1TempRef", { read: Border, static: false }) set _bgdgrid1(c: Border) {
        if (c) { this.bgdgrid1 = c; }
    };
    public brddatetime: Border;
    @ViewChild("brddatetimeTempRef", { read: Border, static: false }) set _brddatetime(c: Border) {
        if (c) { this.brddatetime = c; }
    };
    public brdflowrate: Border;
    @ViewChild("brdflowrateTempRef", { read: Border, static: false }) set _brdflowrate(c: Border) {
        if (c) { this.brdflowrate = c; }
    };
    public brdhumidification: Border;
    @ViewChild("brdhumidificationTempRef", { read: Border, static: false }) set _brdhumidification(c: Border) {
        if (c) { this.brdhumidification = c; }
    };
    public brdadminsteredby: Border;
    @ViewChild("brdadminsteredbyTempRef", { read: Border, static: false }) set _brdadminsteredby(c: Border) {
        if (c) { this.brdadminsteredby = c; }
    };
    public brdchkwitnessby: Border;
    @ViewChild("brdchkwitnessbyTempRef", { read: Border, static: false }) set _brdchkwitnessby(c: Border) {
        if (c) { this.brdchkwitnessby = c; }
    };
    public brdclincalIncident: Border;
    @ViewChild("brdclincalIncidentTempRef", { read: Border, static: false }) set _brdclincalIncident(c: Border) {
        if (c) { this.brdclincalIncident = c; }
    };
    public brdgrid1: Border;
    @ViewChild("brdgrid1TempRef", { read: Border, static: false }) set _brdgrid1(c: Border) {
        if (c) { this.brdgrid1 = c; }
    };
    public lblRoute: iLabel;
    @ViewChild("lblRouteTempRef", { read: iLabel, static: false }) set _lblRoute(c: iLabel) {
        if (c) { this.lblRoute = c; }
    };
    public cboRoute: iComboBox;
    @ViewChild("cboRouteTempRef", { read: iComboBox, static: false }) set _cboRoute(c: iComboBox) {
        if (c) { this.cboRoute = c; }
    };
    public lblDateTimebegun: iLabel;
    @ViewChild("lblDateTimebegunTempRef", { read: iLabel, static: false }) set _lblDateTimebegun(c: iLabel) {
        if (c) { this.lblDateTimebegun = c; }
    };
    public dtpDatebegun: iDateTimePicker;
    @ViewChild("dtpDatebegunTempRef", { read: iDateTimePicker, static: false }) set _dtpDatebegun(c: iDateTimePicker) {
        if (c) { this.dtpDatebegun = c; }
    };
    public timeDateTimeGivenText: iTimeBox;
    @ViewChild("timeDateTimeGivenTextTempRef", { read: iTimeBox, static: false }) set _timeDateTimeGivenText(c: iTimeBox) {
        if (c) { this.timeDateTimeGivenText = c; }
    };
    public lblFlowrate: iLabel;
    @ViewChild("lblFlowrateTempRef", { read: iLabel, static: false }) set _lblFlowrate(c: iLabel) {
        if (c) { this.lblFlowrate = c; }
    };
    public txtFlowrate: iTextBox;
    @ViewChild("txtFlowrateTempRef", { read: iTextBox, static: false }) set _txtFlowrate(c: iTextBox) {
        if (c) { this.txtFlowrate = c; }
    };
    public lblinfuconuom: iLabel;
    @ViewChild("lblinfuconuomTempRef", { read: iLabel, static: false }) set _lblinfuconuom(c: iLabel) {
        if (c) { this.lblinfuconuom = c; }
    };
    public cboinfucon: iComboBox;
    @ViewChild("cboinfuconTempRef", { read: iComboBox, static: false }) set _cboinfucon(c: iComboBox) {
        if (c) { this.cboinfucon = c; }
    };
    public lblInfusionRateHifen1: iLabel;
    @ViewChild("lblInfusionRateHifen1TempRef", { read: iLabel, static: false }) set _lblInfusionRateHifen1(c: iLabel) {
        if (c) { this.lblInfusionRateHifen1 = c; }
    };
    public cboinfuconcent: iComboBox;
    @ViewChild("cboinfuconcentTempRef", { read: iComboBox, static: false }) set _cboinfuconcent(c: iComboBox) {
        if (c) { this.cboinfuconcent = c; }
    };
    public lblHumidification: iLabel;
    @ViewChild("lblHumidificationTempRef", { read: iLabel, static: false }) set _lblHumidification(c: iLabel) {
        if (c) { this.lblHumidification = c; }
    };
    public cboHumidification: iComboBox;
    @ViewChild("cboHumidificationTempRef", { read: iComboBox, static: false }) set _cboHumidification(c: iComboBox) {
        if (c) { this.cboHumidification = c; }
    };
    public lblAdministeredby: iLabel;
    @ViewChild("lblAdministeredbyTempRef", { read: iLabel, static: false }) set _lblAdministeredby(c: iLabel) {
        if (c) { this.lblAdministeredby = c; }
    };
    public sfsAdministeredby: iSFS = new iSFS();
    @ViewChild("sfsAdministeredbyTempRef", { read: iSFS, static: false }) set _sfsAdministeredby(c: iSFS) {
        if (c) { this.sfsAdministeredby = c; }
    };
    public lblNoWitness: iLabel;
    @ViewChild("lblNoWitnessTempRef", { read: iLabel, static: false }) set _lblNoWitness(c: iLabel) {
        if (c) { this.lblNoWitness = c; }
    };
    public chkNoWitness: iCheckBox;
    @ViewChild("chkNoWitnessTempRef", { read: iCheckBox, static: false }) set _chkNoWitness(c: iCheckBox) {
        if (c) { this.chkNoWitness = c; }
    };
    public lblWitnessedBy: iLabel;
    @ViewChild("lblWitnessedByTempRef", { read: iLabel, static: false }) set _lblWitnessedBy(c: iLabel) {
        if (c) { this.lblWitnessedBy = c; }
    };
    public sfsWitnessedby: iSFS = new iSFS();
    @ViewChild("sfsWitnessedbyTempRef", { read: iSFS, static: false }) set _sfsWitnessedby(c: iSFS) {
        if (c) { this.sfsWitnessedby = c; }
    };
    public lblcliniIncFrm: iLabel;
    @ViewChild("lblcliniIncFrmTempRef", { read: iLabel, static: false }) set _lblcliniIncFrm(c: iLabel) {
        if (c) { this.lblcliniIncFrm = c; }
    };
    public lblcliniIncFrmValue: iLabel;
    @ViewChild("lblcliniIncFrmValueTempRef", { read: iLabel, static: false }) set _lblcliniIncFrmValue(c: iLabel) {
        if (c) { this.lblcliniIncFrmValue = c; }
    };
    public bgddeldevice: Border;
    @ViewChild("bgddeldeviceTempRef", { read: Border, static: false }) set _bgddeldevice(c: Border) {
        if (c) { this.bgddeldevice = c; }
    };
    public bgdexpirydate: Border;
    @ViewChild("bgdexpirydateTempRef", { read: Border, static: false }) set _bgdexpirydate(c: Border) {
        if (c) { this.bgdexpirydate = c; }
    };
    public bgdbatno: Border;
    @ViewChild("bgdbatnoTempRef", { read: Border, static: false }) set _bgdbatno(c: Border) {
        if (c) { this.bgdbatno = c; }
    };
    public bgdcomments: Border;
    @ViewChild("bgdcommentsTempRef", { read: Border, static: false }) set _bgdcomments(c: Border) {
        if (c) { this.bgdcomments = c; }
    };
    public bgdgrid2: Border;
    @ViewChild("bgdgrid2TempRef", { read: Border, static: false }) set _bgdgrid2(c: Border) {
        if (c) { this.bgdgrid2 = c; }
    };
    public brdexpdate: Border;
    @ViewChild("brdexpdateTempRef", { read: Border, static: false }) set _brdexpdate(c: Border) {
        if (c) { this.brdexpdate = c; }
    };
    public brdbatchno: Border;
    @ViewChild("brdbatchnoTempRef", { read: Border, static: false }) set _brdbatchno(c: Border) {
        if (c) { this.brdbatchno = c; }
    };
    public brdcomments: Border;
    @ViewChild("brdcommentsTempRef", { read: Border, static: false }) set _brdcomments(c: Border) {
        if (c) { this.brdcomments = c; }
    };
    public brdgrid2: Border;
    @ViewChild("brdgrid2TempRef", { read: Border, static: false }) set _brdgrid2(c: Border) {
        if (c) { this.brdgrid2 = c; }
    };
    public lblDeliveryDevice: iLabel;
    @ViewChild("lblDeliveryDeviceTempRef", { read: iLabel, static: false }) set _lblDeliveryDevice(c: iLabel) {
        if (c) { this.lblDeliveryDevice = c; }
    };
    public cboDeliveryDevice: iComboBox;
    @ViewChild("cboDeliveryDeviceTempRef", { read: iComboBox, static: false }) set _cboDeliveryDevice(c: iComboBox) {
        if (c) { this.cboDeliveryDevice = c; }
    };
    public lblExpiryDate: iLabel;
    @ViewChild("lblExpiryDateTempRef", { read: iLabel, static: false }) set _lblExpiryDate(c: iLabel) {
        if (c) { this.lblExpiryDate = c; }
    };
    public dtpExpiryDate: iDateTimePicker;
    @ViewChild("dtpExpiryDateTempRef", { read: iDateTimePicker, static: false }) set _dtpExpiryDate(c: iDateTimePicker) {
        if (c) { this.dtpExpiryDate = c; }
    };
    public lblBatchNo: iLabel;
    @ViewChild("lblBatchNoTempRef", { read: iLabel, static: false }) set _lblBatchNo(c: iLabel) {
        if (c) { this.lblBatchNo = c; }
    };
    public txtBatchNo: iTextBox;
    @ViewChild("txtBatchNoTempRef", { read: iTextBox, static: false }) set _txtBatchNo(c: iTextBox) {
        if (c) { this.txtBatchNo = c; }
    };
    public lblComments: iLabel;
    @ViewChild("lblCommentsTempRef", { read: iLabel, static: false }) set _lblComments(c: iLabel) {
        if (c) { this.lblComments = c; }
    };
    public txtGasComments: iTextBox;
    @ViewChild("txtGasCommentsTempRef", { read: iTextBox, static: false }) set _txtGasComments(c: iTextBox) {
        if (c) { this.txtGasComments = c; }
    };
    override _DataContext: any;
    override get DataContext() {
        return this._DataContext;
    }
    @Input() override  set DataContext(value: any) {
        this._DataContext = value;
    }
    lblCIFValue_MouseLeftButtonUp_Func: Function;
    ngOnInit() {
        this.oInfrecVM = this.DataContext;
        this.lblCIFValue_MouseLeftButtonUp_Func = (s, e) => { this.lblCIFValue_MouseLeftButtonUp(s) }
        if(this.oInfrecVM.AdministeredDateTime == null)
        this.oInfrecVM.AdministeredDateTime = DateTime.Now;
        if (this.oInfrecVM.WitnessByList == null)
            this.oInfrecVM.WitnessByList = new ObservableCollection<CListItem>();
    }
    constructor(oVM: InfrecordadminVM) {
        super()
        // InitializeComponent();
        this.oInfrecVM = oVM;
        //this.Loaded = () => this.UserControl_Loaded();

    }
    ngAfterViewInit(): void {
        // this.dtpDatebegun.RangeStartDate = this.oInfrecVM.RangeStartDate;
        // this.dtpDatebegun.RangeEndDate = this.DataContext.RangeEndDate;
        // this.dtpExpiryDate.RangeStartDate = DateTime.Today;
        AppContextInfo.UserOID = ContextManager.Instance['UserOID'].toString();
        AppContextInfo.OrganisationName = ContextManager.Instance["OrganisationName"].toString();
        AppContextInfo.JobRoleOID = ContextManager.Instance["JobRoleOID"].toString();
        AppContextInfo.OrganisationOID = ContextManager.Instance["OrganisationOID"].toString();

        this.sfsAdministeredby.OnGetItems = (s, e) => { this.sfsAdministeredby_OnGetItems(s, e); };
        this.sfsWitnessedby.OnGetItems = (s, e) => { this.sfsWitnessedby_OnGetItems(s, e); };
        this.oInfrecVM.OnInfLastCallBackCompleted = (s, e) => { this.oInfrecVM_OnInfLastCallBackCompleted(); };
        this.dtpDatebegun.OnDateValueChanged = (s, e) => { this.dtpDateTimeGivenText_OnDateChange(s, e) };
        this.sfsAdministeredby.GetSFSItems("cp");
        this.sfsWitnessedby.GetSFSItems("cp");
        this.oInfrecVM.OnWitnessUserSelected = (s) => { this.ValidateUser(s); };
        this.oInfrecVM.InitFormValuesAfterFormLoad();
        let objService: CSecurityManagementServiceWSSoapClient = new CSecurityManagementServiceWSSoapClient();
        objService.GetUserCompleted = (s, e) => { this.objService_GetUserCompleted(s, e); };
        let objReq: CReqMsgGetUser = new CReqMsgGetUser();
        objReq.oContextInformation = CommonBB.FillContext();
        objReq.lUserOIDBC = Convert.ToInt64(AppContextInfo.UserOID);
        objService.GetUserAsync(objReq);
        this.oInfrecVM.SetExpiryDate(this.dtpExpiryDate);
        Busyindicator.SetStatusIdle("MedChart");
        setTimeout(() => {
            this.UpdateVisibilityAndEnable();
         }, 0);
     }
     UpdateVisibilityAndEnable()
     {
         this.chkNoWitness.Visibility = this.oInfrecVM.VisichkNoWitness;
         this.chkNoWitness.IsEnabled = this.oInfrecVM.IsEnableChkWitness;
         this.sfsWitnessedby.IsEnabled = this.oInfrecVM.IsEnableWitnessedBy;
 
  
 
     }
    
    public UserControl_Unloaded(sender: Object, e: RoutedEventArgs): void {
        this.oInfrecVM.OnWitnessUserSelected = this.ValidateUser;
    }
    objService_GetUserCompleted(sender: Object, e: GetUserCompletedEventArgs): void {
        if (e.Result != null) {
            let objRes: CResMsgGetUser = e.Result;
            if (objRes != null && objRes.objEnterpriseObject != null && !String.IsNullOrEmpty(objRes.objEnterpriseObject.SurName)) {
                this.strUserName = objRes.objEnterpriseObject.SurName;
                if (!String.IsNullOrEmpty(objRes.objEnterpriseObject.ForeName)) {
                    this.strUserName += " ";
                    this.strUserName += objRes.objEnterpriseObject.ForeName;
                }
                if (this.oInfrecVM != null)
                    this.oInfrecVM.RecordedBy = this.strUserName;
                    // if (!MedChartData.AllowAnyUserForAdministration) {
                if (this.oInfrecVM.AdministeredByList == null)
                    this.oInfrecVM.AdministeredByList = new ObservableCollection<CListItem>();
                let _IsExist: boolean = this.oInfrecVM.AdministeredByList.Any(x => x.Value == AppContextInfo.UserOID);
                if (!_IsExist) {
                    let oItem: CListItem = new CListItem();
                    oItem.DisplayText = this.strUserName != null ? this.strUserName : String.Empty;
                    oItem.Value = AppContextInfo.UserOID;
                    this.oInfrecVM.AdministeredByList.Add(oItem);
                    this.oInfrecVM.AdministeredByList = new ObservableCollection<CListItem>(this.oInfrecVM.AdministeredByList.OrderBy(oItm => oItm.DisplayText));
                }
                //this.sfsAdministeredby.SelectedValue = String.Empty;
                this.sfsAdministeredby.SetSelectedItem(ObjectHelper.CreateObject(new CListItem(), { Value: AppContextInfo.UserOID, DisplayText: this.strUserName != null ? this.strUserName : String.Empty }));
                this.oInfrecVM.AdministeredBy = this.strUserName != null ? this.strUserName : String.Empty;
                this.oInfrecVM.AdministeredByOID = AppContextInfo.UserOID;
                // let sTemp: string = AppContextInfo.UserOID;
                // this.sfsAdministeredby.SelectedValue = String.Empty;
                // this.sfsAdministeredby.SetSelectedItem(ObjectHelper.CreateObject(new CListItem(), { Value: sTemp }));
                //this.sfsAdministeredby.IsEnabled = false;
                    // }
            }
        }
        this.SetControlFocusOnLoad();
    }
    async sfsAdministeredby_OnSFSOpen(): Promise<void> {
        this.oParam = AppContextInfo.OrganisationName;
        var oSelectedItems: ObservableCollection<CListItem> = new ObservableCollection<CListItem>();
        var returnValue: ScriptObject = <ScriptObject>(await HtmlPage.Window.InvokeAsync("SFSCareProvider", this.oParam) as ScriptObject);
        if (returnValue != null && returnValue.GetProperty("length") != null) {
            // var nSelectCnt: number = Convert.ToInt32(returnValue.GetProperty("length"));
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

        if (oSelectedItems != null && oSelectedItems.Count > 0) {
            Common.AddSelItemIntoSFSQuickList(this.oInfrecVM.AdministeredByList, oSelectedItems[0].Value, oSelectedItems[0].DisplayText.Trim(), "cp", this.sfsAdministeredby);
            this.oInfrecVM.AdministeredByList = new ObservableCollection<CListItem>(this.oInfrecVM.AdministeredByList.OrderBy(oItem => oItem.DisplayText));
            this.oInfrecVM.AdministeredBy = oSelectedItems[0].DisplayText.Trim();
            this.oInfrecVM.AdministeredByOID = oSelectedItems[0].Value;
        }
    }
    async sfsWitnessedby_OnSFSOpen(): Promise<void> {
        this.oParam = AppContextInfo.OrganisationName;
        var oSelectedItems: ObservableCollection<CListItem> = new ObservableCollection<CListItem>();
        var returnValue: ScriptObject = <ScriptObject>(await HtmlPage.Window.InvokeAsync("SFSCareProvider", this.oParam) as ScriptObject);

        if (returnValue != null && returnValue.GetProperty("length") != null) {
            //  var nSelectCnt: number = Convert.ToInt32(returnValue.GetProperty("length"));
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

        if (oSelectedItems != null && oSelectedItems.Count > 0) {           
            Common.AddSelItemIntoSFSQuickList(this.oInfrecVM.WitnessByList, oSelectedItems[0].Value, oSelectedItems[0].DisplayText.Trim(), "cp", this.sfsWitnessedby);
            this.oInfrecVM.WitnessByList = new ObservableCollection<CListItem>(this.oInfrecVM.WitnessByList.OrderBy(oItem => oItem.DisplayText));
            this.oInfrecVM.WitnessBy = oSelectedItems[0].DisplayText.Trim();
            this.oInfrecVM.WitnessByOID = oSelectedItems[0].Value;
        }
    }
    public sfsWitnessedby_OnGetItems(sender: any, Result: ObservableCollection<CListItem>): void {
        if (Result != null) {
            this.oInfrecVM.WitnessByList = Result;
        }
        if (this.oInfrecVM && !String.IsNullOrEmpty(this.oInfrecVM.WitnessByOID)) {
            this.oInfrecVM._IsSFSValueSetFromOnGetSFSItems = true;
            if (this.oInfrecVM.WitnessByList == null)
                this.oInfrecVM.WitnessByList = new ObservableCollection<CListItem>();
            let _IsExist: boolean = this.oInfrecVM.WitnessByList.Any(x => x.Value == this.oInfrecVM.WitnessByOID);
            if (!_IsExist) {
                let oItem: CListItem = new CListItem();
                oItem.DisplayText = this.oInfrecVM.WitnessBy;
                oItem.Value = this.oInfrecVM.WitnessByOID;
                this.oInfrecVM.WitnessByList.Add(oItem);
                this.oInfrecVM.WitnessByList = new ObservableCollection<CListItem>(this.oInfrecVM.WitnessByList.OrderBy(oItm => oItm.DisplayText));
            }
            let sTemp: string = this.oInfrecVM.WitnessByOID;
            this.sfsWitnessedby.SelectedValue = String.Empty;
            this.sfsWitnessedby.SetSelectedItem(ObjectHelper.CreateObject(new CListItem(), { Value: sTemp }));
            this.oInfrecVM._IsSFSValueSetFromOnGetSFSItems = false;
        }
    }
    public sfsAdministeredby_OnGetItems(sender: Object, Result: ObservableCollection<CListItem>): void {
        if (Result != null) {
            this.oInfrecVM.AdministeredByList = Result;
        }
        if (this.oInfrecVM != null && !String.IsNullOrEmpty(this.oInfrecVM.AdministeredByOID)) {
            this.oInfrecVM._IsSFSValueSetFromOnGetSFSItems = true;
            if (this.oInfrecVM.AdministeredByList == null)
                this.oInfrecVM.AdministeredByList = new ObservableCollection<CListItem>();
            let _IsExist: boolean = this.oInfrecVM.AdministeredByList.Any(x => x.Value == this.oInfrecVM.AdministeredByOID);
            if (!_IsExist) {
                let oItem: CListItem = new CListItem();
                oItem.DisplayText = this.oInfrecVM.AdministeredBy;
                oItem.Value = this.oInfrecVM.AdministeredByOID;
                this.oInfrecVM.AdministeredByList.Add(oItem);
                this.oInfrecVM.AdministeredByList = new ObservableCollection<CListItem>(this.oInfrecVM.AdministeredByList.OrderBy(oItm => oItm.DisplayText));
            }
            let sTemp: string = this.oInfrecVM.AdministeredByOID;
            this.sfsAdministeredby.SelectedValue = String.Empty;
            this.sfsAdministeredby.SetSelectedItem(ObjectHelper.CreateObject(new CListItem(), { Value: sTemp }));
            this.oInfrecVM._IsSFSValueSetFromOnGetSFSItems = false;
        }
    }
    public ValidateUser(_SelectedUserType: SelectedUserType): void {
        let _MsgResxKey: string;
        if (_SelectedUserType == SelectedUserType.WitnessingUser) {
            _MsgResxKey = "WitnessAdminBy_Message";
        }
        else {
            _MsgResxKey = "AdminByWitness_Message";
        }
        if (this.objWitnessHelper == null) {
            this.objWitnessHelper = new WitnessHelper();
        }
        this.objWitnessHelper.AuthenticateUser(Convert.ToInt64((String.IsNullOrEmpty(this.oInfrecVM.AdministeredByOID) ? "0" : this.oInfrecVM.AdministeredByOID)), Convert.ToInt64((String.IsNullOrEmpty(this.oInfrecVM.WitnessByOID) ? "0" : this.oInfrecVM.WitnessByOID)), this.oInfrecVM.WitnessBy, _SelectedUserType, (s, e) => { this.OnUserAuthCompleted(s, e) }, _MsgResxKey);
    }
    public OnUserAuthCompleted(oAuthResult: AuthResult, _SelectedUserType: SelectedUserType): void {
        if (_SelectedUserType == SelectedUserType.WitnessingUser && (oAuthResult == AuthResult.FailedSinceSameUser || oAuthResult == AuthResult.Cancelled)) {
            this.ClearWitnessedBySFS();
        }
        else if (_SelectedUserType == SelectedUserType.AdministeringUser && oAuthResult == AuthResult.FailedSinceSameUser) {
            this.ClearAdminBySFS();
        }
    }
    public ClearWitnessedBySFS(): void {
        if (this.oInfrecVM != null && !String.IsNullOrEmpty(this.oInfrecVM.WitnessByOID)) {
            this.sfsWitnessedby.ClearAll();
            this.oInfrecVM.WitnessByOID = String.Empty;
            this.oInfrecVM.WitnessBy = String.Empty;
            this.sfsWitnessedby.Focus();
            this.oInfrecVM.CareproviderOID = 0;
            this.oInfrecVM.CareproviderName = String.Empty;
        }
    }
    public ClearAdminBySFS(): void {
        if (this.oInfrecVM != null && !String.IsNullOrEmpty(this.oInfrecVM.AdministeredByOID)) {
            this.sfsAdministeredby.ClearAll();
            this.oInfrecVM.AdministeredByOID = String.Empty;
            this.oInfrecVM.AdministeredBy = String.Empty;
            this.sfsAdministeredby.Focus();
            this.oInfrecVM.CareproviderOID = 0;
            this.oInfrecVM.CareproviderName = String.Empty;
        }
    }
    oInfrecVM_OnInfLastCallBackCompleted(): void {
        this.SetControlFocusOnLoad();
    }
    public SetControlFocusOnLoad(): void {
        // if (!ApplicationHelper.Current.IsRunningOutOfBrowser)
        // System.Windows.Browser.HtmlPage.Plugin.Focus();
        if (this.oInfrecVM != null && this.oInfrecVM.IsEnableInfusionrate) {
            this.txtFlowrate.UpdateLayout();
            this.txtFlowrate.Focus();
        }
        else {
            this.cboRoute.UpdateLayout();
            this.cboRoute.Focus();
        }
    }
    public chkNoWitness_Checked(sender): void {
        if (sender.target.checked) {
            this.oInfrecVM.WitnessMandatory = false;
            this.oInfrecVM.IsEnableWitnessedBy = false;
            if (!String.IsNullOrEmpty(this.oInfrecVM.ClinicalIncidentForm)) {
                this.oInfrecVM.lblcliniIncFrm = Visibility.Visible;
            }
            if (ProfileData.ClinicalIncidentConfig != null && this.oInfrecVM.ValidateURL(ProfileData.ClinicalIncidentConfig.Address)) {
                this.oInfrecVM.IsEnablelblcliniIncFrmValue = true;
            }
            else {
                this.oInfrecVM.IsEnablelblcliniIncFrmValue = false;
            }
            this.sfsWitnessedby.ClearAll();
            this.oInfrecVM.WitnessByOID = String.Empty;
            this.oInfrecVM.WitnessBy = String.Empty;
        }
        else {
            this.chkNoWitness_Unchecked(null, null);
        }
    }
    public chkNoWitness_Unchecked(sender: Object, e: RoutedEventArgs): void {
        this.oInfrecVM.lblcliniIncFrm = Visibility.Collapsed;
        this.checkWitnessedBy();
    }
    private checkWitnessedBy() {
        if (this.oInfrecVM.bIsWitnessReqd) {
            this.oInfrecVM.WitnessMandatory = true;
            this.oInfrecVM.IsEnableWitnessedBy = true;
            this.oInfrecVM.IsEnableChkWitness = true;
        }
        else {
            this.oInfrecVM.WitnessMandatory = false;
            this.oInfrecVM.IsEnableWitnessedBy = true;
        }
    }

    public lblCIFValue_MouseLeftButtonUp(e): void {
        if (ProfileData.ClinicalIncidentConfig != null && !String.IsNullOrEmpty(ProfileData.ClinicalIncidentConfig.Address)) {
            HtmlPage.Window.Invoke("LaunchClinicalIncidentForm", ProfileData.ClinicalIncidentConfig.Address);
        }
    }
    public dtpDateTimeGivenText_OnDateChange(sender: Object, e: DateChangeEventArgs): void {
        if (DateTime.Equals(this.dtpDatebegun.CurrentDateTime,DateTime.MinValue)) {
            this.dtpDatebegun.CurrentDateTime = DateTime.Now.Date;
        }
    }
}
