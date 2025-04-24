import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { Binding, Border, Grid, iButton, iCheckBox, iComboBox, iDateTimePicker, iHyperlinkButton, iLabel, iMultiSelectDropdown, iTextBox, iUpDownBox, KeyEventArgs, MouseButtonEventArgs, ScrollViewer, TextBlock, ToolTipService, UserControl } from "epma-platform/controls";
import DateTime from "epma-platform/DateTime";
import { ObjectHelper } from "epma-platform/helper";
import { AppDialogEventargs, AppDialogResult, ClerkFormViewDeftBehaviour, CListItem, ContentControl, SelectionChangedEventArgs, StringComparison, Visibility, WindowButtonType } from "epma-platform/models";
import { AppActivity, Convert, MessageBoxResult, MessageEventArgs } from "epma-platform/services";
import { CConstants } from "src/app/product/shared/models/constant";
import { ActivityTypes } from "../model/common";
import { Resource } from "../resource";
import { PrescriptionTypes, ValueDomain } from "../utilities/constants";
import { MultiSelectListVM } from "../viewmodel/MultiSelectListVM";
import { PrescriptionItemVM } from "../viewmodel/PrescriptionItemVM";
import { MultiSelectListView } from "./MultiSelectListView";
import { iTimeBox } from "src/app/shared/epma-platform/controls/epma-timebox/epma-timebox.component";
import { ContextInfo, PatientContext } from "src/app/lorappcommonbb/utilities/globalvariable";
import * as ControlStyles from "../../shared/epma-platform/controls/ControlStyles";
import { RoutedEventArgs } from "src/app/shared/epma-platform/controls/FrameworkElement";

var that;

@Component({
    selector: 'app-frmformviewforadminoxygen',
    templateUrl: './frmformviewforadminoxygen.html',
    styles: [
        `
        .leftAlignment {
            padding-left: 0.4rem;
        }
.SupplyInscroll
{
  overflow: auto; line-height: 1.5;
}
.SupplyVis
{
    display:none;
}
.Prescrib1{
    height:30px;
    align-items: center;
    display: grid;
}
.Prescrib2{
    height:30px;
    align-items: end;
    display: grid;
}
        `
    ]
})
export class FormViewForAdminOxygen extends UserControl {
    public bIsLoaded: boolean = false;
    objfrm: PrescriptionItemVM;
    private oMultiSelectListView: MultiSelectListView;
    sLowerDoseDefaultValue: string = String.Empty;
    sUpperDoseDefaultValue: string = String.Empty;
    isMedicationClerk: boolean = false;

    public resKey = Resource.MedicationForm;
    public resKey1 = Resource.Infusion;
    public resKeyInf = Resource.Infusion;
    ResourceStyles = ControlStyles;
    public FormLoadAFterviewinit : boolean = false;
    BorderFrameForAdditionalOptions = "";

    override _DataContext;
    override get DataContext() {
        return this._DataContext;
    }
    @Input() override set DataContext(value: any) {
        this._DataContext = value;
    }

    private LayoutRoot: Grid;
    @ViewChild("LayoutRootTempRef", { read: Grid, static: false }) set _LayoutRoot(c: Grid) {
        if (c) { this.LayoutRoot = c; }
    };
    private lblRoute: iLabel;
    @ViewChild("lblRouteTempRef", { read: iLabel, static: false }) set _lblRoute(c: iLabel) {
        if (c) { this.lblRoute = c; }
    };
    private cboRoute: iComboBox;
    @ViewChild("cboRouteTempRef", { read: iComboBox, static: false }) set _cboRoute(c: iComboBox) {
        if (c) { this.cboRoute = c; }
    };
    private lblDeliverydevice: iLabel;
    @ViewChild("lblDeliverydeviceTempRef", { read: iLabel, static: false }) set _lblDeliverydevice(c: iLabel) {
        if (c) { this.lblDeliverydevice = c; }
    };
    private cboDeliverydevice: iComboBox;
    @ViewChild("cboDeliverydeviceTempRef", { read: iComboBox, static: false }) set _cboDeliverydevice(c: iComboBox) {
        if (c) { this.cboDeliverydevice = c; }
    };
    private lblConcentration: iLabel;
    @ViewChild("lblConcentrationTempRef", { read: iLabel, static: false }) set _lblConcentration(c: iLabel) {
        if (c) { this.lblConcentration = c; }
    };
    private ConcentrationLayoutRoot: Grid;
    @ViewChild("ConcentrationLayoutRootTempRef", { read: Grid, static: false }) set _ConcentrationLayoutRoot(c: Grid) {
        if (c) { this.ConcentrationLayoutRoot = c; }
    };
    private cboConcentration: iComboBox;
    @ViewChild("cboConcentrationTempRef", { read: iComboBox, static: false }) set _cboConcentration(c: iComboBox) {
        if (c) { this.cboConcentration = c; }
    };
    private lblConcentrationp: iLabel;
    @ViewChild("lblConcentrationpTempRef", { read: iLabel, static: false }) set _lblConcentrationp(c: iLabel) {
        if (c) { this.lblConcentrationp = c; }
    };
    private lblFlowrate: iLabel;
    @ViewChild("lblFlowrateTempRef", { read: iLabel, static: false }) set _lblFlowrate(c: iLabel) {
        if (c) { this.lblFlowrate = c; }
    };
    private FlowrateLayoutRoot: Grid;
    @ViewChild("FlowrateLayoutRootTempRef", { read: Grid, static: false }) set _FlowrateLayoutRoot(c: Grid) {
        if (c) { this.FlowrateLayoutRoot = c; }
    };
    private txtFlowRate: iTextBox;
    @ViewChild("txtFlowRateTempRef", { read: iTextBox, static: false }) set _txtFlowRate(c: iTextBox) {
        if (c) { this.txtFlowRate = c; }
    };
    private lblUOMFlowrate: iLabel;
    @ViewChild("lblUOMFlowrateTempRef", { read: iLabel, static: false }) set _lblUOMFlowrate(c: iLabel) {
        if (c) { this.lblUOMFlowrate = c; }
    };
    private cboUOMFlowrate: iComboBox;
    @ViewChild("cboUOMFlowrateTempRef", { read: iComboBox, static: false }) set _cboUOMFlowrate(c: iComboBox) {
        if (c) { this.cboUOMFlowrate = c; }
    };
    private lblUOMFlow1: iLabel;
    @ViewChild("lblUOMFlow1TempRef", { read: iLabel, static: false }) set _lblUOMFlow1(c: iLabel) {
        if (c) { this.lblUOMFlow1 = c; }
    };
    private cboUOMFlowrate1: iComboBox;
    @ViewChild("cboUOMFlowrate1TempRef", { read: iComboBox, static: false }) set _cboUOMFlowrate1(c: iComboBox) {
        if (c) { this.cboUOMFlowrate1 = c; }
    };
    private lblTargetrange: iLabel;
    @ViewChild("lblTargetrangeTempRef", { read: iLabel, static: false }) set _lblTargetrange(c: iLabel) {
        if (c) { this.lblTargetrange = c; }
    };
    private TargetLayoutRoot: Grid;
    @ViewChild("TargetLayoutRootTempRef", { read: Grid, static: false }) set _TargetLayoutRoot(c: Grid) {
        if (c) { this.TargetLayoutRoot = c; }
    };
    private txtTargetLow: iTextBox;
    @ViewChild("txtTargetLowTempRef", { read: iTextBox, static: false }) set _txtTargetLow(c: iTextBox) {
        if (c) { this.txtTargetLow = c; }
    };
    private lblTargetrangeh: iLabel;
    @ViewChild("lblTargetrangehTempRef", { read: iLabel, static: false }) set _lblTargetrangeh(c: iLabel) {
        if (c) { this.lblTargetrangeh = c; }
    };
    private txtTargetHigh: iTextBox;
    @ViewChild("txtTargetHighTempRef", { read: iTextBox, static: false }) set _txtTargetHigh(c: iTextBox) {
        if (c) { this.txtTargetHigh = c; }
    };
    private lblTargetrangep: iLabel;
    @ViewChild("lblTargetrangepTempRef", { read: iLabel, static: false }) set _lblTargetrangep(c: iLabel) {
        if (c) { this.lblTargetrangep = c; }
    };
    private lblHumidification: iLabel;
    @ViewChild("lblHumidificationTempRef", { read: iLabel, static: false }) set _lblHumidification(c: iLabel) {
        if (c) { this.lblHumidification = c; }
    };
    private cboHumidification: iComboBox;
    @ViewChild("cboHumidificationTempRef", { read: iComboBox, static: false }) set _cboHumidification(c: iComboBox) {
        if (c) { this.cboHumidification = c; }
    };
    private lblDosageForm: iLabel;
    @ViewChild("lblDosageFormTempRef", { read: iLabel, static: false }) set _lblDosageForm(c: iLabel) {
        if (c) { this.lblDosageForm = c; }
    };
    private cboDosageForm: iComboBox;
    @ViewChild("cboDosageFormTempRef", { read: iComboBox, static: false }) set _cboDosageForm(c: iComboBox) {
        if (c) { this.cboDosageForm = c; }
    };
    private lblStrength: iLabel;
    @ViewChild("lblStrengthTempRef", { read: iLabel, static: false }) set _lblStrength(c: iLabel) {
        if (c) { this.lblStrength = c; }
    };
    private cboStrength: iComboBox;
    @ViewChild("cboStrengthTempRef", { read: iComboBox, static: false }) set _cboStrength(c: iComboBox) {
        if (c) { this.cboStrength = c; }
    };
    private lblSite: iLabel;
    @ViewChild("lblSiteTempRef", { read: iLabel, static: false }) set _lblSite(c: iLabel) {
        if (c) { this.lblSite = c; }
    };
    private cboSite: iComboBox;
    @ViewChild("cboSiteTempRef", { read: iComboBox, static: false }) set _cboSite(c: iComboBox) {
        if (c) { this.cboSite = c; }
    };
    private lblPRN: iLabel;
    @ViewChild("lblPRNTempRef", { read: iLabel, static: false }) set _lblPRN(c: iLabel) {
        if (c) { this.lblPRN = c; }
    };
    private chkPRN: iCheckBox;
    @ViewChild("chkPRNTempRef", { read: iCheckBox, static: false }) set _chkPRN(c: iCheckBox) {
        if (c) { this.chkPRN = c; }
    };
    private lblPRNInstruction: iLabel;
    @ViewChild("lblPRNInstructionTempRef", { read: iLabel, static: false }) set _lblPRNInstruction(c: iLabel) {
        if (c) { this.lblPRNInstruction = c; }
    };
    private cboPRNInstruction: iComboBox;
    @ViewChild("cboPRNInstructionTempRef", { read: iComboBox, static: false }) set _cboPRNInstruction(c: iComboBox) {
        if (c) { this.cboPRNInstruction = c; }
    };
    private lblStartDate: iLabel;
    @ViewChild("lblStartDateTempRef", { read: iLabel, static: false }) set _lblStartDate(c: iLabel) {
        if (c) { this.lblStartDate = c; }
    };
    private dtpStartDate: iDateTimePicker;
    @ViewChild("dtpStartDateTempRef", { read: iDateTimePicker, static: false }) set _dtpStartDate(c: iDateTimePicker) {
        if (c) { this.dtpStartDate = c; }
    };
    private iTimeStartDateTime: iTimeBox;
    @ViewChild("iTimeStartDateTimeTempRef", { read: iTimeBox, static: false }) set _iTimeStartDateTime(c: iTimeBox) {
        if (c) { this.iTimeStartDateTime = c; }
    };
    private lblReviewafter: iLabel;
    @ViewChild("lblReviewafterTempRef", { read: iLabel, static: false }) set _lblReviewafter(c: iLabel) {
        if (c) { this.lblReviewafter = c; }
    };
    private udReviewafter: iUpDownBox;
    @ViewChild("udReviewafterTempRef", { read: iUpDownBox, static: false }) set _udReviewafter(c: iUpDownBox) {
        if (c) { this.udReviewafter = c; }
    };
    private cboreviewAfterUOM: iComboBox;
    @ViewChild("cboreviewAfterUOMTempRef", { read: iComboBox, static: false }) set _cboreviewAfterUOM(c: iComboBox) {
        if (c) { this.cboreviewAfterUOM = c; }
    };
    private lblReviewAfterDate: iLabel;
    @ViewChild("lblReviewAfterDateTempRef", { read: iLabel, static: false }) set _lblReviewAfterDate(c: iLabel) {
        if (c) { this.lblReviewAfterDate = c; }
    };
    private cmdReviewDetails: iButton;
    @ViewChild("cmdReviewDetailsTempRef", { read: iButton, static: false }) set _cmdReviewDetails(c: iButton) {
        if (c) { this.cmdReviewDetails = c; }
    };
    private lblReviewComments: iLabel;
    @ViewChild("lblReviewCommentsTempRef", { read: iLabel, static: false }) set _lblReviewComments(c: iLabel) {
        if (c) { this.lblReviewComments = c; }
    };
    private txtReviewComments: iTextBox;
    @ViewChild("txtReviewCommentsTempRef", { read: iTextBox, static: false }) set _txtReviewComments(c: iTextBox) {
        if (c) { this.txtReviewComments = c; }
    };
    private lblDuration: iLabel;
    @ViewChild("lblDurationTempRef", { read: iLabel, static: false }) set _lblDuration(c: iLabel) {
        if (c) { this.lblDuration = c; }
    };
    private udDuration: iUpDownBox;
    @ViewChild("udDurationTempRef", { read: iUpDownBox, static: false }) set _udDuration(c: iUpDownBox) {
        if (c) { this.udDuration = c; }
    };
    private cboDuration: iComboBox;
    @ViewChild("cboDurationTempRef", { read: iComboBox, static: false }) set _cboDuration(c: iComboBox) {
        if (c) { this.cboDuration = c; }
    };
    private lblQuantity: iLabel;
    @ViewChild("lblQuantityTempRef", { read: iLabel, static: false }) set _lblQuantity(c: iLabel) {
        if (c) { this.lblQuantity = c; }
    };
    private txtQuantity: iTextBox;
    @ViewChild("txtQuantityTempRef", { read: iTextBox, static: false }) set _txtQuantity(c: iTextBox) {
        if (c) { this.txtQuantity = c; }
    };
    private cboQuantity: iComboBox;
    @ViewChild("cboQuantityTempRef", { read: iComboBox, static: false }) set _cboQuantity(c: iComboBox) {
        if (c) { this.cboQuantity = c; }
    };
    private lblStopDate: iLabel;
    @ViewChild("lblStopDateTempRef", { read: iLabel, static: false }) set _lblStopDate(c: iLabel) {
        if (c) { this.lblStopDate = c; }
    };
    private dtpStopDate: iDateTimePicker;
    @ViewChild("dtpStopDateTempRef", { read: iDateTimePicker, static: false }) set _dtpStopDate(c: iDateTimePicker) {
        if (c) { this.dtpStopDate = c; }
    };
    private iTimeStopDateTime: iTimeBox;
    @ViewChild("iTimeStopDateTimeTempRef", { read: iTimeBox, static: false }) set _iTimeStopDateTime(c: iTimeBox) {
        if (c) { this.iTimeStopDateTime = c; }
    };
    private lblIsOnAdmission: iLabel;
    @ViewChild("lblIsOnAdmissionTempRef", { read: iLabel, static: false }) set _lblIsOnAdmission(c: iLabel) {
        if (c) { this.lblIsOnAdmission = c; }
    };
    private chckIsOnAdmission: iCheckBox;
    @ViewChild("chckIsOnAdmissionTempRef", { read: iCheckBox, static: false }) set _chckIsOnAdmission(c: iCheckBox) {
        if (c) { this.chckIsOnAdmission = c; }
    };
    private lblStatType: iLabel;
    @ViewChild("lblStatTypeTempRef", { read: iLabel, static: false }) set _lblStatType(c: iLabel) {
        if (c) { this.lblStatType = c; }
    };
    private cboStatType: iComboBox;
    @ViewChild("cboStatTypeTempRef", { read: iComboBox, static: false }) set _cboStatType(c: iComboBox) {
        if (c) { this.cboStatType = c; }
    };
    private lblPrescribedby: iLabel;
    @ViewChild("lblPrescribedbyTempRef", { read: iLabel, static: false }) set _lblPrescribedby(c: iLabel) {
        if (c) { this.lblPrescribedby = c; }
    };
    private txtPrescribedby: iLabel;
    @ViewChild("txtPrescribedbyTempRef", { read: iLabel, static: false }) set _txtPrescribedby(c: iLabel) {
        if (c) { this.txtPrescribedby = c; }
    };
    private lblIsClinicallyVerified: iLabel;
    @ViewChild("lblIsClinicallyVerifiedTempRef", { read: iLabel, static: false }) set _lblIsClinicallyVerified(c: iLabel) {
        if (c) { this.lblIsClinicallyVerified = c; }
    };
    private chckClinicalVerify: iCheckBox;
    @ViewChild("chckClinicalVerifyTempRef", { read: iCheckBox, static: false }) set _chckClinicalVerify(c: iCheckBox) {
        if (c) { this.chckClinicalVerify = c; }
    };
    private lblVerificationComments: iLabel;
    @ViewChild("lblVerificationCommentsTempRef", { read: iLabel, static: false }) set _lblVerificationComments(c: iLabel) {
        if (c) { this.lblVerificationComments = c; }
    };
    private txtVerificationComments: iTextBox;
    @ViewChild("txtVerificationCommentsTempRef", { read: iTextBox, static: false }) set _txtVerificationComments(c: iTextBox) {
        if (c) { this.txtVerificationComments = c; }
    };
    private lblModClerkReason: iLabel;
    @ViewChild("lblModClerkReasonTempRef", { read: iLabel, static: false }) set _lblModClerkReason(c: iLabel) {
        if (c) { this.lblModClerkReason = c; }
    };
    private cboModClerkReason: iComboBox;
    @ViewChild("cboModClerkReasonTempRef", { read: iComboBox, static: false }) set _cboModClerkReason(c: iComboBox) {
        if (c) { this.cboModClerkReason = c; }
    };
    private lblRsnForMod: iLabel;
    @ViewChild("lblRsnForModTempRef", { read: iLabel, static: false }) set _lblRsnForMod(c: iLabel) {
        if (c) { this.lblRsnForMod = c; }
    };
    public cboRsnForMod: iComboBox;
    @ViewChild("cboRsnForModTempRef", { read: iComboBox, static: false }) set _cboRsnForMod(c: iComboBox) {
        if (c) { this.cboRsnForMod = c; }
    };
    private lblModComments: iLabel;
    @ViewChild("lblModCommentsTempRef", { read: iLabel, static: false }) set _lblModComments(c: iLabel) {
        if (c) { this.lblModComments = c; }
    };
    private txtModComments: iTextBox;
    @ViewChild("txtModCommentsTempRef", { read: iTextBox, static: false }) set _txtModComments(c: iTextBox) {
        if (c) { this.txtModComments = c; }
    };
    private lblAdmin: iLabel;
    @ViewChild("lblAdminTempRef", { read: iLabel, static: false }) set _lblAdmin(c: iLabel) {
        if (c) { this.lblAdmin = c; }
    };
    private txtAdminInstruction: iTextBox;
    @ViewChild("txtAdminInstructionTempRef", { read: iTextBox, static: false }) set _txtAdminInstruction(c: iTextBox) {
        if (c) { this.txtAdminInstruction = c; }
    };
    private lblPblmInd: iLabel;
    @ViewChild("lblPblmIndTempRef", { read: iLabel, static: false }) set _lblPblmInd(c: iLabel) {
        if (c) { this.lblPblmInd = c; }
    };
    private txtProblem: iTextBox;
    @ViewChild("txtProblemTempRef", { read: iTextBox, static: false }) set _txtProblem(c: iTextBox) {
        if (c) { this.txtProblem = c; }
    };
    private lblAddComments: iLabel;
    @ViewChild("lblAddCommentsTempRef", { read: iLabel, static: false }) set _lblAddComments(c: iLabel) {
        if (c) { this.lblAddComments = c; }
    };
    private txtAddComments: iTextBox;
    @ViewChild("txtAddCommentsTempRef", { read: iTextBox, static: false }) set _txtAddComments(c: iTextBox) {
        if (c) { this.txtAddComments = c; }
    };
    private lblMedicationClerk: iLabel;
    @ViewChild("lblMedicationClerkTempRef", { read: iLabel, static: false }) set _lblMedicationClerk(c: iLabel) {
        if (c) { this.lblMedicationClerk = c; }
    };
    private lblMedicationClerking: iLabel;
    @ViewChild("lblMedicationClerkingTempRef", { read: iLabel, static: false }) set _lblMedicationClerking(c: iLabel) {
        if (c) { this.lblMedicationClerking = c; }
    };
    private lblSupplyInst: iLabel;
    @ViewChild("lblSupplyInstTempRef", { read: iLabel, static: false }) set _lblSupplyInst(c: iLabel) {
        if (c) { this.lblSupplyInst = c; }
    };
    private lblSupplyInstText: iLabel;
    @ViewChild("lblSupplyInstTextTempRef", { read: iLabel, static: false }) set _lblSupplyInstText(c: iLabel) {
        if (c) { this.lblSupplyInstText = c; }
    };
    private lblSupplyInstValue: iLabel;
    @ViewChild("lblSupplyInstValueTempRef", { read: iLabel, static: false }) set _lblSupplyInstValue(c: iLabel) {
        if (c) { this.lblSupplyInstValue = c; }
    };
    private lblTreatToCon: iLabel;
    @ViewChild("lblTreatToConTempRef", { read: iLabel, static: false }) set _lblTreatToCon(c: iLabel) {
        if (c) { this.lblTreatToCon = c; }
    };
    private cboTreatToCon: iComboBox;
    @ViewChild("cboTreatToConTempRef", { read: iComboBox, static: false }) set _cboTreatToCon(c: iComboBox) {
        if (c) { this.cboTreatToCon = c; }
    };
    private lblisnewmeds: iLabel;
    @ViewChild("lblisnewmedsTempRef", { read: iLabel, static: false }) set _lblisnewmeds(c: iLabel) {
        if (c) { this.lblisnewmeds = c; }
    };
    private chcknewmeds: iCheckBox;
    @ViewChild("chcknewmedsTempRef", { read: iCheckBox, static: false }) set _chcknewmeds(c: iCheckBox) {
        if (c) { this.chcknewmeds = c; }
    };
    private brdAdditionalOptions: Border;
    @ViewChild("brdAdditionalOptionsTempRef", { read: Border, static: false }) set _brdAdditionalOptions(c: Border) {
        if (c) { this.brdAdditionalOptions = c; }
    };
    private lblRecordAdminBorder: TextBlock;
    @ViewChild("lblRecordAdminBorderTempRef", { read: TextBlock, static: false }) set _lblRecordAdminBorder(c: TextBlock) {
        if (c) { this.lblRecordAdminBorder = c; }
    };
    private lblForAdminMessage1: iLabel;
    @ViewChild("lblForAdminMessage1TempRef", { read: iLabel, static: false }) set _lblForAdminMessage1(c: iLabel) {
        if (c) { this.lblForAdminMessage1 = c; }
    };
    private chkForAdminOption1: iCheckBox;
    @ViewChild("chkForAdminOption1TempRef", { read: iCheckBox, static: false }) set _chkForAdminOption1(c: iCheckBox) {
        if (c) { this.chkForAdminOption1 = c; }
    };


    constructor() {
        super();
        //     InitializeComponent();
        this.bIsLoaded = false;
        //     this.dtpStartDate.IsConstrainEntry = true;
    }

    SelectedValueChanged_reviewAfterUOM(e: CListItem){
        if (e != this.DataContext.FormViewerDetails.BasicDetails.ReviewafterUOM) {
            this.DataContext.FormViewerDetails.BasicDetails.ReviewafterUOM = e;
        }
    }

    ngAfterViewInit() {
        that = this;
        // this.bIsLoaded = false;
        if(this.FormLoadAFterviewinit){
            this.UserControl_Loaded(null, null);
        }
        else{
        this.objfrm = ObjectHelper.CreateType<PrescriptionItemVM>(this.DataContext, PrescriptionItemVM);       
        this.objfrm.FormviewerLoadedEvent.subscribe( data => {
        Object.keys(that).forEach((prop) => (this[prop] = that[prop]));
        this.UserControl_Loaded(null, null);
        this.FormLoadAFterviewinit = true
    }
    );
    }
        this.dtpStartDate.IsConstrainEntry = true;
        setTimeout(() => {                
            super.AfterViewInit();
             }, 5);
    }

    private UserControl_Loaded(sender: Object, e: RoutedEventArgs): void {
        this.objfrm = ObjectHelper.CreateType<PrescriptionItemVM>(this.DataContext, PrescriptionItemVM);
        if (PatientContext.PrescriptionType == PrescriptionTypes.ForAdministration && this.objfrm != null && this.objfrm.FormViewerDetails != null && this.objfrm.FormViewerDetails.BasicControls != null && this.objfrm.FormViewerDetails.BasicDetails.ManageReviewDetail != null && this.objfrm.FormViewerDetails.BasicDetails.ManageReviewDetail.oReviewAfterDetail != null && this.objfrm.FormViewerDetails.BasicDetails.ManageReviewDetail.oReviewAfterDetail.ReviewType != null && !String.IsNullOrEmpty(this.objfrm.FormViewerDetails.BasicDetails.ManageReviewDetail.oReviewAfterDetail.ReviewType.Code) && this.objfrm.FormViewerDetails.BasicDetails.ManageReviewDetail.oReviewAfterDetail.ReviewType.Code.Equals(CConstants.OmitReview)) {
            this.objfrm.FormViewerDetails.BasicDetails.ReviewAfterMandatory = true;
        }
        this.objfrm.FormViewerDetails.BasicDetails.OtherAdminiInstVisibility = (PatientContext.PrescriptionType == PrescriptionTypes.ForAdministration) ? Visibility.Visible : Visibility.Collapsed;
        this.objfrm.FormViewerDetails.BasicDetails.InfusionDetails.IsDischargeVisible = ((PatientContext.PrescriptionType == PrescriptionTypes.Discharge) || (PatientContext.PrescriptionType == PrescriptionTypes.Leave)) ? Visibility.Visible : Visibility.Collapsed;
        this.objfrm.FormViewerDetails.BasicDetails.IsVisibleSupplyInstr = ((PatientContext.PrescriptionType == PrescriptionTypes.Outpatient) || (PatientContext.PrescriptionType == PrescriptionTypes.Discharge) || (PatientContext.PrescriptionType == PrescriptionTypes.Leave)) ? Visibility.Visible : Visibility.Collapsed;
        this.objfrm.FormViewerDetails.BasicDetails.InfusionDetails.IsTreatMentVisible = ((PatientContext.PrescriptionType == PrescriptionTypes.Discharge) || (PatientContext.PrescriptionType == PrescriptionTypes.Outpatient)) ? Visibility.Visible : Visibility.Collapsed;
        this.objfrm.FormViewerDetails.BasicDetails.InfusionDetails.isStationeryTypeMandatory = ((PatientContext.PrescriptionType == PrescriptionTypes.Discharge) || (PatientContext.PrescriptionType == PrescriptionTypes.Leave) || (PatientContext.PrescriptionType == PrescriptionTypes.Outpatient)) ? true : false;
        this.objfrm.FormViewerDetails.BasicDetails.InfusionDetails.IsAdminInstructionvisible = ((PatientContext.PrescriptionType == PrescriptionTypes.Discharge) || (PatientContext.PrescriptionType == PrescriptionTypes.Leave)) ? Visibility.Collapsed : Visibility.Visible;
        if (String.Compare(this.objfrm.FormViewerDetails.BasicDetails.BrandName, "Select brand", StringComparison.InvariantCultureIgnoreCase) == 0) {
            this.objfrm.FormViewerDetails.BasicDetails.IsClearEnabled = false;
        }
        else {
            this.objfrm.FormViewerDetails.BasicDetails.IsClearEnabled = true;
        }
        if (String.Compare(PatientContext.PrescriptionType, PrescriptionTypes.Discharge) != 0)
            this.objfrm.FormViewerDetails.BasicDetails.IsVisiblenewmeds = Visibility.Collapsed;
        if (!this.bIsLoaded) {
            this.bIsLoaded = true;
            if (this.objfrm.ActionCode == ActivityTypes.Amend && this.objfrm.IsReasonForModificationVisible == Visibility.Visible && (this.objfrm.formViewerDetails.BasicDetails.ReasonforModification != null && !String.IsNullOrEmpty(this.objfrm.formViewerDetails.BasicDetails.ReasonforModification.Value) && (!String.Equals(this.objfrm.FormViewerDetails.BasicDetails.ReasonforModification.DisplayText, "Select reason", StringComparison.InvariantCultureIgnoreCase)))) {
                this.objfrm.FormViewerDetails.BasicDetails.IsenableRSNFORMOD = false;
                this.objfrm.FormViewerDetails.BasicDetails.IsMandatoryRSNFORMOD = false;
                this.objfrm.FormViewerDetails.BasicDetails.IsClearlstAmendedFlds = true;
                this.objfrm.FormViewerDetails.BasicDetails.lstAmendedFlds.Clear();
                this.objfrm.FormViewerDetails.BasicDetails.lstDRCAmendedFlds.Clear();
                this.objfrm.FormViewerDetails.BasicDetails.IsClearlstAmendList = true;
            }
            else if (this.objfrm.ActionCode == ActivityTypes.Amend && !this.objfrm.FormViewerDetails.BasicDetails.isFormViewDataLoaded && this.objfrm.FormViewerDetails.BasicDetails.lstAmendedFlds != null && this.objfrm.FormViewerDetails.BasicDetails.lstAmendedFlds.Count > 0 && this.objfrm.FormViewerDetails.BasicDetails.lstAmendedFlds.Contains("InfusionType")) {
                this.objfrm.IsReasonForModificationVisible = Visibility.Visible;
                this.objfrm.FormViewerDetails.BasicDetails.IsMandatoryRSNFORMOD = true;
            }
            else {
                let bIsModificationReasonExists: boolean = this.objfrm.FormViewerDetails.BasicDetails.IsModificationReasonExists;
                this.objfrm.IsReasonForModificationVisible = Visibility.Collapsed;
                if (!this.objfrm.IsConflictFaxTabLoaded) {
                    this.objfrm.FormViewerDetails.BasicDetails.IsMandatoryRSNFORMOD = false;
                }
                this.objfrm.FormViewerDetails.BasicDetails.lstAmendedFlds.Clear();
                this.objfrm.FormViewerDetails.BasicDetails.IsClearlstAmendList = true;
                this.objfrm.FormViewerDetails.BasicDetails.IsClearlstAmendedFlds = true;
                if (this.objfrm.FormViewerDetails.BasicDetails.IsCancelClick) {
                    this.objfrm.FormViewerDetails.BasicDetails.IsClearOnAdmissionAmended = false;
                    this.objfrm.FormViewerDetails.BasicDetails.IsCancelClick = false;
                }
                this.objfrm.FormViewerDetails.BasicDetails.IsVisibleFrequency = Visibility.Collapsed;
                this.objfrm.FormViewerDetails.BasicDetails.IsenableFrequency = false;
                this.objfrm.FormViewerDetails.BasicDetails.IsMandatoryFrequency = false;
                if (bIsModificationReasonExists)
                    this.objfrm.FormViewerDetails.BasicDetails.IsModificationReasonExists = true;
                this.objfrm.FormViewerDetails.BasicDetails.lstDRCAmendedFlds.Clear();
            }
            this.objfrm.FormViewerDetails.BasicDetails.IsSiteEnabled = true;
            this.objfrm.FormViewerDetails.BasicDetails.IsValidateDose = true;
            if (!this.objfrm.IsClinicallyVerifyEnable && String.Compare(ContextInfo.MenuCode, CConstants.ClinicallyVerifyMenuCode, StringComparison.InvariantCultureIgnoreCase) != 0 && String.Compare(ContextInfo.MenuCode, CConstants.AuthoriseMenuCode, StringComparison.InvariantCultureIgnoreCase) != 0) {
                this.objfrm.FormViewerDetails.BasicDetails.IsVisibleClinicallyverify = Visibility.Collapsed;
            }
            if (String.Compare(ContextInfo.MenuCode, CConstants.ClinicallyVerifyMenuCode, StringComparison.InvariantCultureIgnoreCase) == 0) {
                if (this.objfrm.ActionCode != ActivityTypes.Amend) {
                    this.objfrm.FormViewerDetails.BasicDetails.IsenableRSNFORMOD = this.objfrm.FormViewerDetails.BasicDetails.IsMandatoryRSNFORMOD = true;
                    this.objfrm.IsClinicallyVerifyCommentsMandatory = false;
                    this.chckClinicalVerify.IsEnabled = this.objfrm.IsClinicallyVerifyEnable = this.objfrm.FormViewerDetails.BasicDetails.IsEnableChkClinivallyVerify = true;
                }
                else {
                    if (this.objfrm.FormViewerDetails.BasicDetails.IsClinicallyVerified || this.objfrm.IsClinicallyVerifyEnable)
                        this.chckClinicalVerify.IsEnabled = this.objfrm.FormViewerDetails.BasicDetails.IsEnableChkClinivallyVerify = true;
                    this.objfrm.IsClinicallyVerifyCommentsMandatory = !this.objfrm.FormViewerDetails.BasicDetails.IsClinicallyVerified && this.objfrm.PrescriptionItemStatus == CConstants.CLINICALLYVERIFIED;
                }
            }
            else if (String.Compare(ContextInfo.MenuCode, CConstants.AuthoriseMenuCode, StringComparison.InvariantCultureIgnoreCase) == 0) {
                this.lblIsClinicallyVerified.Text = "Authorised";
                this.lblVerificationComments.Text = "Authoriser’s comments";
                this.lblVerificationComments.Mandatory = false;
                ToolTipService.SetToolTip(this.txtVerificationComments, Resource.MedicationForm.txtVerificationComments_Tooltip_Authorise);
                ToolTipService.SetToolTip(this.chckClinicalVerify, Resource.MedicationForm.chckClinicalVerify_Tooltip_Athorise);
                if (!this.objfrm.IsClinicallyVerifyEnable) {
                    this.chckClinicalVerify.IsEnabled = this.objfrm.FormViewerDetails.BasicDetails.IsEnableChkClinivallyVerify = false;
                }
            }
            if (String.Compare(ContextInfo.MenuCode, CConstants.ClinicallyVerifyMenuCode, StringComparison.InvariantCultureIgnoreCase) == 0) {
                this.EnableClinicallyverifyCheckbox();
            }
            else if (String.Compare(ContextInfo.MenuCode, CConstants.AuthoriseMenuCode, StringComparison.InvariantCultureIgnoreCase) == 0) {
                this.lblIsClinicallyVerified.Text = "Authorised";
                this.lblVerificationComments.Text = "Authoriser’s comments";
                this.lblVerificationComments.Mandatory = false;
                ToolTipService.SetToolTip(this.txtVerificationComments, Resource.MedicationForm.txtVerificationComments_Tooltip_Authorise);
                ToolTipService.SetToolTip(this.chckClinicalVerify, Resource.MedicationForm.chckClinicalVerify_Tooltip_Athorise);
                if (!this.objfrm.IsClinicallyVerifyEnable) {
                    this.chckClinicalVerify.IsEnabled = this.objfrm.FormViewerDetails.BasicDetails.IsEnableChkClinivallyVerify = false;
                }
            }
            if (this.objfrm != null && this.objfrm.FormViewerDetails != null && this.objfrm.FormViewerDetails.BasicDetails != null)
                this.objfrm.FormViewerDetails.BasicDetails.RemoveDoseFromDuration();
        }
        this.cboConcentration.TextUpdated = (s,e) => { this.txtConcentrationHigh_keyUp(s, e);}
        if (this.chckClinicalVerify.IsChecked == true) {
            if (this.objfrm != null) {
                this.objfrm.IsClinicallyVerifyCommentsMandatory = false;
                
            }
        }
        else{
            if (String.Equals(ContextInfo.MenuCode, CConstants.ClinicallyVerifyMenuCode, StringComparison.InvariantCultureIgnoreCase) && this.objfrm != null && this.objfrm.PrescriptionItemStatus == CConstants.CLINICALLYVERIFIED){
                this.objfrm.IsClinicallyVerifyCommentsMandatory = true;
            }
        }
    }
    private EnableClinicallyverifyCheckbox(): void {
        if (this.objfrm != null && (this.objfrm.ActionCode == ActivityTypes.Prescribe || this.objfrm.ActionCode == ActivityTypes.Reorder)) {
            if ((this.objfrm.FormViewerDetails.BasicDetails.IsAuthorise || this.objfrm.FormViewerDetails.BasicDetails.IsFluidAuthorise || this.objfrm.FormViewerDetails.BasicDetails.IsMCIAuthorise) && String.IsNullOrEmpty(this.objfrm.PrescriptionItemStatus) && String.Equals(PatientContext.PrescriptionType, PrescriptionTypes.ForAdministration, StringComparison.OrdinalIgnoreCase) && PatientContext.ClerkFormViewDefaultBehavior != ClerkFormViewDeftBehaviour.LaunchFormMandatory) {
                this.chckClinicalVerify.IsEnabled = this.objfrm.IsClinicallyVerifyEnable = this.objfrm.FormViewerDetails.BasicDetails.IsEnableChkClinivallyVerify = false;
            }
            else {
                this.chckClinicalVerify.IsEnabled = this.objfrm.IsClinicallyVerifyEnable = this.objfrm.FormViewerDetails.BasicDetails.IsEnableChkClinivallyVerify = true;
            }
            this.objfrm.IsClinicallyVerifyCommentsMandatory = false;
        }
        else if (this.objfrm.ActionCode == ActivityTypes.Amend) {
            if (this.objfrm.FormViewerDetails.BasicDetails.IsClinicallyVerified || this.objfrm.IsClinicallyVerifyEnable)
                this.chckClinicalVerify.IsEnabled = this.objfrm.FormViewerDetails.BasicDetails.IsEnableChkClinivallyVerify = true;
            this.objfrm.IsClinicallyVerifyCommentsMandatory = !this.objfrm.FormViewerDetails.BasicDetails.IsClinicallyVerified && this.objfrm.PrescriptionItemStatus == CConstants.CLINICALLYVERIFIED;
        }
    }
    private chckisnewmeds_OnChange(sender: Object, e: RoutedEventArgs): void {
        if (this.objfrm != null && this.objfrm.ParentbaseVM != null)
            this.objfrm.ParentbaseVM.isReconcileserreq = true;
        if (this.objfrm != null)
            this.objfrm.isnewmedschecked = true;
    }
    private lblMedicationClerk_MouseLeftButtonUp(sender: Object, e: MouseButtonEventArgs): void {
        this.oMultiSelectListView = new MultiSelectListView();
        this.oMultiSelectListView.constructorImpl(ValueDomain.MedicationClerking, this.objfrm.FormViewerDetails.BasicDetails.MedicationClerkingSource.ToList());
        // ObjectHelper.stopFinishAndCancelEvent(true);
        AppActivity.OpenWindow("Medication clerking source - LORENZO", this.oMultiSelectListView, this.oMultiSelectListView_Closed, "", false, 480, 450, false, WindowButtonType.OkCancel, null);
    }
    oMultiSelectListView_Closed(args: AppDialogEventargs): void {
        if (args.Content != null)
            this.oMultiSelectListView = ObjectHelper.CreateType<MultiSelectListView>(args.Content, MultiSelectListView);
        if (args.Result == AppDialogResult.Ok) {
            if (this.oMultiSelectListView.okButtonClick()) {
                if (this.oMultiSelectListView instanceof MultiSelectListView) {
                    let oMultiSelectVM: MultiSelectListVM = ObjectHelper.CreateType<MultiSelectListVM>(this.oMultiSelectListView.DataContext, MultiSelectListVM);
                    if (oMultiSelectVM instanceof MultiSelectListVM)
                        this.objfrm.FormViewerDetails.BasicDetails.MedicationClerkingSource = oMultiSelectVM.ValueDomainCollection;
                }
            }
        }
        else {
            this.oMultiSelectListView.CancelButtonClick();
        }
    }
    private cmdBrand_MouseLeftButtonDown(sender: Object, e: MouseButtonEventArgs): void {
        this.objfrm.LaunchBrandConstraint();
    }
    chckClinicalVerify_OnChange_Func=(s,e)=>{   Object.keys(that).forEach((prop) => (this[prop] = that[prop]));this.chckClinicalVerify_OnChange(s,e)}
     chckClinicalVerify_OnChange(sender: Object, e: RoutedEventArgs): void {
        if (this.chckClinicalVerify.IsChecked == true) {
            if (this.objfrm != null) {
                this.objfrm.IsClinicallyVerifyCommentsMandatory = false;
                this.objfrm.FormViewerDetails.BasicDetails.IsClinicallyVerified = true;
            }
        }
        else {
            if (String.Equals(ContextInfo.MenuCode, CConstants.ClinicallyVerifyMenuCode, StringComparison.InvariantCultureIgnoreCase) && this.objfrm != null && this.objfrm.PrescriptionItemStatus == CConstants.CLINICALLYVERIFIED) {
                this.objfrm.OperationMode = "M";
            }
            if (String.Compare(ContextInfo.MenuCode, CConstants.ClinicallyVerifyMenuCode, StringComparison.InvariantCultureIgnoreCase) == 0 && this.objfrm.ActionCode != ActivityTypes.Amend)
                this.objfrm.IsClinicallyVerifyCommentsMandatory = false;
            if (this.objfrm != null && this.objfrm.FormViewerDetails != null && this.objfrm.FormViewerDetails.BasicDetails != null) {
                this.objfrm.FormViewerDetails.BasicDetails.IsClinicallyVerified = false;
            }
            if (String.Equals(ContextInfo.MenuCode, CConstants.ClinicallyVerifyMenuCode, StringComparison.InvariantCultureIgnoreCase) && this.objfrm != null && this.objfrm.PrescriptionItemStatus == CConstants.CLINICALLYVERIFIED){
                this.objfrm.IsClinicallyVerifyCommentsMandatory = true;
            }
        }
    }
    private cboRsnForMod_IsEnabledChanged(sender: Object, e: DependencyPropertyChangedEventArgs): void {
        if (this.cboRsnForMod.IsEnabled) {
            if (this.objfrm.FormViewerDetails.BasicDetails.IsMandatoryRSNFORMOD == true) {
                if (!String.Equals(ContextInfo.MenuCode, CConstants.ClinicallyVerifyMenuCode, StringComparison.InvariantCultureIgnoreCase))
                    this.objfrm.FormViewerDetails.BasicDetails.IsClinicallyVerified = true;
                if (this.objfrm.FormViewerDetails.BasicDetails.IsAddtoResolve && this.objfrm.ActionCode == ActivityTypes.Amend && this.objfrm.FormViewerDetails.BasicDetails.ReasonforModification == null) {
                    this.objfrm.FormViewerDetails.BasicDetails.IsAddtoResolve = false;
                }
                else {
                    if (!String.Equals(ContextInfo.MenuCode, CConstants.ClinicallyVerifyMenuCode, StringComparison.InvariantCultureIgnoreCase))
                        this.chckClinicalVerify.IsEnabled = this.objfrm.FormViewerDetails.BasicDetails.IsEnableChkClinivallyVerify = this.objfrm.IsClinicallyVerifyEnable = false;
                }
                if (!String.Equals(ContextInfo.MenuCode, CConstants.ClinicallyVerifyMenuCode, StringComparison.InvariantCultureIgnoreCase))
                    this.objfrm.IsClinicallyVerifyCommentsMandatory = !this.objfrm.FormViewerDetails.BasicDetails.IsClinicallyVerified;
            }
            else if (this.objfrm.FormViewerDetails.BasicDetails.IsenableRSNFORMOD) {
                if (String.Equals(ContextInfo.MenuCode, CConstants.AuthoriseMenuCode, StringComparison.InvariantCultureIgnoreCase))
                    this.objfrm.FormViewerDetails.BasicDetails.IsRsnForModAuthEnabled = true;
            }
        }
    }
    private txtLowerDose_KeyDown(sender: Object, e: KeyEventArgs): void {
        if (e.PlatformKeyCode == 189) {
            e.Handled = true;
        }
    }
    objDoseMsg_MessageBoxClose(sender: Object, e: MessageEventArgs): void {
        if (e.MessageBoxResult == MessageBoxResult.No) {
            this.objfrm.FormViewerDetails.IsSteppedDoseDetailsModified = false;
        }
    }
    private ClearAllFields(): void {
        this.objfrm.FormViewerDetails.BasicDetails.TreatmentToContinue = null;
        this.objfrm.FormViewerDetails.BasicDetails.MedClerkModifyReason = null;
        this.objfrm.FormViewerDetails.BasicDetails.QuantityUOM = null;
        this.objfrm.FormViewerDetails.BasicDetails.Quantity = null;
        this.objfrm.FormViewerDetails.BasicDetails.Duration = "0";
        this.objfrm.FormViewerDetails.BasicDetails.Frequency = null;
        this.objfrm.FormViewerDetails.BasicDetails.SupplyInsText = String.Empty;
        this.objfrm.FormViewerDetails.BasicDetails.SupplyInsVal = String.Empty;
        this.objfrm.FormViewerDetails.BasicDetails.AsRequired = false;
        this.objfrm.FormViewerDetails.BasicDetails.AdditionalComments = String.Empty;
        this.objfrm.FormViewerDetails.BasicDetails.ProblemIndication = String.Empty;
        this.objfrm.FormViewerDetails.BasicDetails.ReasonforModification = null;
        this.objfrm.FormViewerDetails.BasicDetails.ModificationComments = String.Empty;
        this.objfrm.FormViewerDetails.BasicDetails.Dose = String.Empty;
        this.objfrm.FormViewerDetails.BasicDetails.UpperDose = String.Empty;
        this.objfrm.FormViewerDetails.BasicDetails.DoseUOM = null;
        this.objfrm.FormViewerDetails.BasicDetails.DurationUOM = null;
    }
    private txtLowerDose_SelectionChanged(sender: Object, e: RoutedEventArgs): void {
        if (this.objfrm != null && this.objfrm.FormViewerDetails != null && this.objfrm.FormViewerDetails.BasicDetails != null && this.objfrm.FormViewerDetails.BasicDetails.bDoseFromCal)
            this.objfrm.FormViewerDetails.BasicDetails.bDoseChange = true;
    }

    txtTargetLow_KeyUp_Func = (s, e) => {
        ObjectHelper.CreateObject(this, that);
        this.txtTargetLow_KeyUp(s, e)
    }
    private txtTargetLow_KeyUp(sender: Object, e: KeyEventArgs): void {
        if (!String.IsNullOrEmpty(this.txtTargetLow.Text) && Convert.ToInt32(this.txtTargetLow.Text) > 100) {
            this.txtTargetLow.Text = String.Empty;
            this.txtTargetLow.Focus();
        }
    }

    txtTargetHigh_KeyUp_Func = (s, e) => {
        ObjectHelper.CreateObject(this, that);
        this.txtTargetHigh_KeyUp(s, e)
    }
    private txtTargetHigh_KeyUp(sender: Object, e: KeyEventArgs): void {
        if (!String.IsNullOrEmpty(this.txtTargetHigh.Text) && Convert.ToInt32(this.txtTargetHigh.Text) > 100) {
            this.txtTargetHigh.Text = String.Empty;
            this.txtTargetHigh.Focus();
        }
    }
    private txtFlowRate_TextChanged(sender: Object, e: TextChangedEventArgs): void {
        this.isMedicationClerk = (this.objfrm != null && (String.Compare(this.objfrm.SourcePrescriptionType, PrescriptionTypes.Clerking, StringComparison.CurrentCultureIgnoreCase) == 0) || PatientContext.ClerkFormViewDefaultBehavior == ClerkFormViewDeftBehaviour.LaunchFormMandatory) ? true : false;
        if (this.isMedicationClerk) {
            this.objfrm.FormViewerDetails.BasicDetails.IsMandatoryReasonForMedClerkModify = true;
        }
    }

    txtConcentrationHigh_keyUp_Func = (s, e) => {
        this.txtConcentrationHigh_keyUp(s, e)
    }

    private txtConcentrationHigh_keyUp(sender: Object, e: KeyEventArgs): void {
        if (this.objfrm != null && this.objfrm.FormViewerDetails != null && this.objfrm.FormViewerDetails.BasicDetails != null && this.objfrm.FormViewerDetails.BasicDetails.InfusionDetails != null && !String.IsNullOrEmpty(this.objfrm.FormViewerDetails.BasicDetails.InfusionDetails.ConcentrationFreeText) && Convert.ToInt32(this.objfrm.FormViewerDetails.BasicDetails.InfusionDetails.ConcentrationFreeText) > 100) {
            this.objfrm.FormViewerDetails.BasicDetails.InfusionDetails.ConcentrationFreeText = String.Empty;
            this.cboConcentration.ClearValue();
            this.cboConcentration.Focus();
        }
    }
}


export class DependencyPropertyChangedEventArgs {
    public NewValue: any;
    public OldValue: any;
}

export class TextChangedEventArgs {

}