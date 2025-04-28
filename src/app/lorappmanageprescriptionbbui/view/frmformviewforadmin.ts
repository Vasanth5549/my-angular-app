import { AfterViewInit, Component, OnDestroy, ViewChild } from "@angular/core";
import { Border, Grid, iButton, iCheckBox, iComboBox, iLabel, iMultiSelectDropdown, iTextBox, iUpDownBox, KeyEventArgs, MouseButtonEventArgs, ScrollViewer, TextBlock, ToolTipService, UserControl } from "epma-platform/controls";
import DateTime from "epma-platform/DateTime";
import { ObjectHelper } from "epma-platform/helper";
import { CListItem, ContentControl, Visibility } from "epma-platform/models";
import { MessageBoxResult, MessageEventArgs } from "epma-platform/services";
import { ClerkFormViewDeftBehaviour, ContextInfo, PatientContext } from "src/app/lorappcommonbb/utilities/globalvariable";
import { CConstants as MedCommonCConstants } from "src/app/lorappmedicationcommonbb/utilities/constants";
import { DependencyPropertyChangedEventArgs, RoutedEventArgs } from "src/app/shared/epma-platform/controls/Control";
import { iDateTimePicker } from "src/app/shared/epma-platform/controls/epma-datetimepicker/epma-datetimepicker.component";
import { iHyperlinkButton } from "src/app/shared/epma-platform/controls/epma-iHyperlinkButton/epma-iHyperlinkButton.component";
import { iTimeBox } from "src/app/shared/epma-platform/controls/epma-timebox/epma-timebox.component";
import { ActivityTypes } from "../model/common";
import { Resource } from "../resource";
import  * as Common  from "../utilities/common";
import { CConstants, DoseTypeCode, PrescriptionTypes } from "../utilities/constants";
import { ProfileData } from "../utilities/profiledata";
import { PrescriptionItemVM } from "../viewmodel/PrescriptionItemVM";
import { frmAdminSlotTimes } from "./frmadminslottimes";
import * as ControlStyles from "../../shared/epma-platform/controls/ControlStyles";
import {StringComparison} from 'epma-platform/models'
import { medipresolvestepped } from "./medipresolvestepped";
import { medConditionalDose } from "./medconditionaldose";
import { CommonService } from "src/app/product/shared/common.service";

var that;
@Component({
    selector: 'FormViewForAdmin',
    templateUrl: './frmformviewforadmin.html',
    styleUrls: ['./frmformviewforadmin.css'],
  })

export class FormViewForAdmin extends UserControl implements AfterViewInit, OnDestroy {
        public bIsLoaded: boolean = false;
        public objfrm: PrescriptionItemVM;
        sLowerDoseDefaultValue: string = String.Empty;
        sUpperDoseDefaultValue: string = String.Empty;
        objMulti: Common.MultiRouteEvents;
        private sTitle: string;
        public FormLoadAFterviewinit : boolean = false;
        public svwFormViewer: ScrollViewer;
    Ref: this;
@ViewChild("svwFormViewerTempRef", {read:ScrollViewer, static: false }) set _svwFormViewer(c: ScrollViewer){
    if(c){ this.svwFormViewer  = c; }
};
public LayoutRoot: Grid;
@ViewChild("LayoutRootTempRef", {read:Grid, static: false }) set _LayoutRoot(c: Grid){
    if(c){ this.LayoutRoot  = c; }
};
public lblRoute: iLabel;
@ViewChild("lblRouteTempRef", {read:iLabel, static: false }) set _lblRoute(c: iLabel){
    if(c){ this.lblRoute  = c; }
};
public lblMultiRoute: iLabel;
@ViewChild("lblMultiRouteTempRef", {read:iLabel, static: false }) set _lblMultiRoute(c: iLabel){
    if(c){ this.lblMultiRoute  = c; }
};
public Routelayout: Grid;
@ViewChild("RoutelayoutTempRef", {read:Grid, static: false }) set _Routelayout(c: Grid){
    if(c){ this.Routelayout  = c; }
};
public cboRoute: iComboBox;
@ViewChild("cboRouteTempRef", {read:iComboBox, static: false }) set _cboRoute(c: iComboBox){
    if(c){ this.cboRoute  = c; }
};
public MultiRoutelayout: Grid;
@ViewChild("MultiRoutelayoutTempRef", {read:Grid, static: false }) set _MultiRoutelayout(c: Grid){
    if(c){ this.MultiRoutelayout  = c; }
};
public cboMultiRoute: iComboBox;
@ViewChild("cboMultiRouteTempRef", {read:iComboBox, static: false }) set _cboMultiRoute(c: iComboBox){
    if(c){ this.cboMultiRoute  = c; }
};
public iMultiRoute: iMultiSelectDropdown;
@ViewChild("iMultiRouteTempRef", {read:iMultiSelectDropdown, static: false }) set _iMultiRoute(c: iMultiSelectDropdown){
    if(c){ this.iMultiRoute  = c;      
        //Multiroute Dropdown open/close
        if(this.ParentRef.isMultiRouteOpenClose){
            this.ParentRef.isMultiRouteOpenClose = false;
            this.iMultiRoute.multiSelectComponent.toggle(true);
            this.iMultiRoute.isEmailDropDownOpen = true;
            this.iMultiRoute.Focus();
        }
    }
};
public chckIsMultiRoute: iCheckBox;
@ViewChild("chckIsMultiRouteTempRef", {read:iCheckBox, static: false }) set _chckIsMultiRoute(c: iCheckBox){
    if(c){ this.chckIsMultiRoute  = c; }
};
public lblforMultiRoute: iLabel;
@ViewChild("lblforMultiRouteTempRef", {read:iLabel, static: false }) set _lblforMultiRoute(c: iLabel){
    if(c){ this.lblforMultiRoute  = c; }
};
public lblDosageForm: iLabel;
@ViewChild("lblDosageFormTempRef", {read:iLabel, static: false }) set _lblDosageForm(c: iLabel){
    if(c){ this.lblDosageForm  = c; }
};
public cboDosageForm: iComboBox;
@ViewChild("cboDosageFormTempRef", {read:iComboBox, static: false }) set _cboDosageForm(c: iComboBox){
    if(c){ this.cboDosageForm  = c; }
};
public lblDoseType: iLabel;
@ViewChild("lblDoseTypeTempRef", {read:iLabel, static: false }) set _lblDoseType(c: iLabel){
    if(c){ this.lblDoseType  = c; }
};
public cboDoseType: iComboBox;
@ViewChild("cboDoseTypeTempRef", {read:iComboBox, static: false }) set _cboDoseType(c: iComboBox){
    if(c){ this.cboDoseType  = c; }
};
public lblDose: iLabel;
@ViewChild("lblDoseTempRef", {read:iLabel, static: false }) set _lblDose(c: iLabel){
    if(c){ this.lblDose  = c; }
};
public Dosecal: iButton;
@ViewChild("DosecalTempRef", {read:iButton, static: false }) set _Dosecal(c: iButton){
    if(c){ this.Dosecal  = c; }
};
public cboAdminMethod: iComboBox;
@ViewChild("cboAdminMethodTempRef", {read:iComboBox, static: false }) set _cboAdminMethod(c: iComboBox){
    if(c){ this.cboAdminMethod  = c; }
};
public DoseLayoutRoot: Grid;
@ViewChild("DoseLayoutRootTempRef", {read:Grid, static: false }) set _DoseLayoutRoot(c: Grid){
    if(c){ this.DoseLayoutRoot  = c; }
};
public txtLowerDose: iTextBox;
@ViewChild("txtLowerDoseTempRef", {read:iTextBox, static: false }) set _txtLowerDose(c: iTextBox){
    if(c){ this.txtLowerDose  = c; }
};
public lblHifen: iLabel;
@ViewChild("lblHifenTempRef", {read:iLabel, static: false }) set _lblHifen(c: iLabel){
    if(c){ this.lblHifen  = c; }
};
public txtUpperDose: iTextBox;
@ViewChild("txtUpperDoseTempRef", {read:iTextBox, static: false }) set _txtUpperDose(c: iTextBox){
    if(c){ this.txtUpperDose  = c; }
};
public lblUOM: iLabel;
@ViewChild("lblUOMTempRef", {read:iLabel, static: false }) set _lblUOM(c: iLabel){
    if(c){ this.lblUOM  = c; }
};
public cboUOM: iComboBox;
@ViewChild("cboUOMTempRef", {read:iComboBox, static: false }) set _cboUOM(c: iComboBox){
    if(c){ this.cboUOM  = c; }
};
public lblIsPRN: iLabel;
@ViewChild("lblIsPRNTempRef", {read:iLabel, static: false }) set _lblIsPRN(c: iLabel){
    if(c){ this.lblIsPRN  = c; }
};
public chkPRN: iCheckBox;
@ViewChild("chkPRNTempRef", {read:iCheckBox, static: false }) set _chkPRN(c: iCheckBox){
    if(c){ this.chkPRN  = c; }
};
public lblReviewcopieddoses: iLabel;
@ViewChild("lblReviewcopieddosesTempRef", {read:iLabel, static: false }) set _lblReviewcopieddoses(c: iLabel){
    if(c){ this.lblReviewcopieddoses  = c; }
};
public lblStrength: iLabel;
@ViewChild("lblStrengthTempRef", {read:iLabel, static: false }) set _lblStrength(c: iLabel){
    if(c){ this.lblStrength  = c; }
};
public cboStrength: iComboBox;
@ViewChild("cboStrengthTempRef", {read:iComboBox, static: false }) set _cboStrength(c: iComboBox){
    if(c){ this.cboStrength  = c; }
};
public lblSite: iLabel;
@ViewChild("lblSiteTempRef", {read:iLabel, static: false }) set _lblSite(c: iLabel){
    if(c){ this.lblSite  = c; }
};
public cboSite: iComboBox;
@ViewChild("cboSiteTempRef", {read:iComboBox, static: false }) set _cboSite(c: iComboBox){
    if(c){ this.cboSite  = c; }
};
public lblFrequency: iLabel;
@ViewChild("lblFrequencyTempRef", {read:iLabel, static: false }) set _lblFrequency(c: iLabel){
    if(c){ this.lblFrequency  = c; }
};
public cboFrequency: iComboBox;
@ViewChild("cboFrequencyTempRef", {read:iComboBox, static: false }) set _cboFrequency(c: iComboBox){
    if(c){ this.cboFrequency  = c; }
};
public lblBrand: iLabel;
@ViewChild("lblBrandTempRef", {read:iLabel, static: false }) set _lblBrand(c: iLabel){
    if(c){ this.lblBrand  = c; }
};
public BrandLayout: Grid;
@ViewChild("BrandLayoutTempRef", {read:Grid, static: false }) set _BrandLayout(c: Grid){
    if(c){ this.BrandLayout  = c; }
};
public cmdBrand: iLabel;
@ViewChild("cmdBrandTempRef", {read:iLabel, static: false }) set _cmdBrand(c: iLabel){
    if(c){ this.cmdBrand  = c; }
};
public cmdClear: iButton;
@ViewChild("cmdClearTempRef", {read:iButton, static: false }) set _cmdClear(c: iButton){
    if(c){ this.cmdClear  = c; }
};
public lblPRNInstruction: iLabel;
@ViewChild("lblPRNInstructionTempRef", {read:iLabel, static: false }) set _lblPRNInstruction(c: iLabel){
    if(c){ this.lblPRNInstruction  = c; }
};
public cboPRNInstruction: iComboBox;
@ViewChild("cboPRNInstructionTempRef", {read:iComboBox, static: false }) set _cboPRNInstruction(c: iComboBox){
    if(c){ this.cboPRNInstruction  = c; }
};
public brdAdminDetails: Border;
@ViewChild("brdAdminDetailsTempRef", {read:Border, static: false }) set _brdAdminDetails(c: Border){
    if(c){ this.brdAdminDetails  = c; }
};
public lblAdminDetails: TextBlock;
@ViewChild("lblAdminDetailsTempRef", {read:TextBlock, static: false }) set _lblAdminDetails(c: TextBlock){
    if(c){ this.lblAdminDetails  = c; }
};
public adminslotuc: frmAdminSlotTimes;
@ViewChild("adminslotucTempRef", {read:frmAdminSlotTimes, static: false }) set _adminslotuc(c: frmAdminSlotTimes){
    if(c){ this.adminslotuc  = c; }
};
public lblStartDate: iLabel;
@ViewChild("lblStartDateTempRef", {read:iLabel, static: false }) set _lblStartDate(c: iLabel){
    if(c){ this.lblStartDate  = c; }
};
public dtpStartDate: iDateTimePicker;
@ViewChild("dtpStartDateTempRef", {read:iDateTimePicker, static: false }) set _dtpStartDate(c: iDateTimePicker){
    if(c){ this.dtpStartDate  = c; }
};
public iTimeStartDateTime: iTimeBox;
@ViewChild("iTimeStartDateTimeTempRef", {read:iTimeBox, static: false }) set _iTimeStartDateTime(c: iTimeBox){
    if(c){ this.iTimeStartDateTime  = c; }
};
public lblReviewafter: iLabel;
@ViewChild("lblReviewafterTempRef", {read:iLabel, static: false }) set _lblReviewafter(c: iLabel){
    if(c){ this.lblReviewafter  = c; }
};
public udReviewafter: iUpDownBox;
@ViewChild("udReviewafterTempRef", {read:iUpDownBox, static: false }) set _udReviewafter(c: iUpDownBox){
    if(c){ this.udReviewafter  = c; }
};
public cboreviewAfterUOM: iComboBox;
@ViewChild("cboreviewAfterUOMTempRef", {read:iComboBox, static: false }) set _cboreviewAfterUOM(c: iComboBox){
    if(c){ this.cboreviewAfterUOM  = c; }
};
public lblReviewAfterDate: iLabel;
@ViewChild("lblReviewAfterDateTempRef", {read:iLabel, static: false }) set _lblReviewAfterDate(c: iLabel){
    if(c){ this.lblReviewAfterDate  = c; }
};
public cmdReviewDetails: iButton;
@ViewChild("cmdReviewDetailsTempRef", {read:iButton, static: false }) set _cmdReviewDetails(c: iButton){
    if(c){ this.cmdReviewDetails  = c; }
};
public lblReviewComments: iLabel;
@ViewChild("lblReviewCommentsTempRef", {read:iLabel, static: false }) set _lblReviewComments(c: iLabel){
    if(c){ this.lblReviewComments  = c; }
};
public txtReviewComments: iTextBox;
@ViewChild("txtReviewCommentsTempRef", {read:iTextBox, static: false }) set _txtReviewComments(c: iTextBox){
    if(c){ this.txtReviewComments  = c; }
};
public lblQuantity: iLabel;
@ViewChild("lblQuantityTempRef", {read:iLabel, static: false }) set _lblQuantity(c: iLabel){
    if(c){ this.lblQuantity  = c; }
};
public txtQuantity: iTextBox;
@ViewChild("txtQuantityTempRef", {read:iTextBox, static: false }) set _txtQuantity(c: iTextBox){
    if(c){ this.txtQuantity  = c; }
};
public cboQuantity: iComboBox;
@ViewChild("cboQuantityTempRef", {read:iComboBox, static: false }) set _cboQuantity(c: iComboBox){
    if(c){ this.cboQuantity  = c; }
};
public lblDuration: iLabel;
@ViewChild("lblDurationTempRef", {read:iLabel, static: false }) set _lblDuration(c: iLabel){
    if(c){ this.lblDuration  = c; }
};
public udDuration: iUpDownBox;
@ViewChild("udDurationTempRef", {read:iUpDownBox, static: false }) set _udDuration(c: iUpDownBox){
    if(c){ this.udDuration  = c; }
};
public cboDuration: iComboBox;
@ViewChild("cboDurationTempRef", {read:iComboBox, static: false }) set _cboDuration(c: iComboBox){
    if(c){ this.cboDuration  = c; }
};
public lblStopDate: iLabel;
@ViewChild("lblStopDateTempRef", {read:iLabel, static: false }) set _lblStopDate(c: iLabel){
    if(c){ this.lblStopDate  = c; }
};
public dtpStopDate: iDateTimePicker;
@ViewChild("dtpStopDateTempRef", {read:iDateTimePicker, static: false }) set _dtpStopDate(c: iDateTimePicker){
    if(c){ this.dtpStopDate  = c; }
};
public iTimeStopDateTime: iTimeBox;
@ViewChild("iTimeStopDateTimeTempRef", {read:iTimeBox, static: false }) set _iTimeStopDateTime(c: iTimeBox){
    if(c){ this.iTimeStopDateTime  = c; }
};
public lblIsOnAdmission: iLabel;
@ViewChild("lblIsOnAdmissionTempRef", {read:iLabel, static: false }) set _lblIsOnAdmission(c: iLabel){
    if(c){ this.lblIsOnAdmission  = c; }
};
public chckIsOnAdmission: iCheckBox;
@ViewChild("chckIsOnAdmissionTempRef", {read:iCheckBox, static: false }) set _chckIsOnAdmission(c: iCheckBox){
    if(c){ this.chckIsOnAdmission  = c; }
};
public lblStatType: iLabel;
@ViewChild("lblStatTypeTempRef", {read:iLabel, static: false }) set _lblStatType(c: iLabel){
    if(c){ this.lblStatType  = c; }
};
public cboStatType: iComboBox;
@ViewChild("cboStatTypeTempRef", {read:iComboBox, static: false }) set _cboStatType(c: iComboBox){
    if(c){ this.cboStatType  = c; }
};
public lblIsClinicallyVerified: iLabel;
@ViewChild("lblIsClinicallyVerifiedTempRef", {read:iLabel, static: false }) set _lblIsClinicallyVerified(c: iLabel){
    if(c){ this.lblIsClinicallyVerified  = c; }
};
public chckClinicalVerify: iCheckBox;
@ViewChild("chckClinicalVerifyTempRef", {read:iCheckBox, static: false }) set _chckClinicalVerify(c: iCheckBox){
    if(c){ this.chckClinicalVerify  = c; }
};
public lblPrescribedby: iLabel;
@ViewChild("lblPrescribedbyTempRef", {read:iLabel, static: false }) set _lblPrescribedby(c: iLabel){
    if(c){ this.lblPrescribedby  = c; }
};
public txtPrescribedby: iLabel;
@ViewChild("txtPrescribedbyTempRef", {read:iLabel, static: false }) set _txtPrescribedby(c: iLabel){
    if(c){ this.txtPrescribedby  = c; }
};
public lblAddComments: iLabel;
@ViewChild("lblAddCommentsTempRef", {read:iLabel, static: false }) set _lblAddComments(c: iLabel){
    if(c){ this.lblAddComments  = c; }
};
public txtAddComments: iTextBox;
@ViewChild("txtAddCommentsTempRef", {read:iTextBox, static: false }) set _txtAddComments(c: iTextBox){
    if(c){ this.txtAddComments  = c; }
};
public lbtnSequencelinkforN: iHyperlinkButton;
@ViewChild("lbtnSequencelinkforNTempRef", {read:iHyperlinkButton, static: false }) set _lbtnSequencelinkforN(c: iHyperlinkButton){
    if(c){ this.lbtnSequencelinkforN  = c; }
};
public lblModComments: iLabel;
@ViewChild("lblModCommentsTempRef", {read:iLabel, static: false }) set _lblModComments(c: iLabel){
    if(c){ this.lblModComments  = c; }
};
public txtModComments: iTextBox;
@ViewChild("txtModCommentsTempRef", {read:iTextBox, static: false }) set _txtModComments(c: iTextBox){
    if(c){ this.txtModComments  = c; }
};
public lblPblmInd: iLabel;
@ViewChild("lblPblmIndTempRef", {read:iLabel, static: false }) set _lblPblmInd(c: iLabel){
    if(c){ this.lblPblmInd  = c; }
};
public txtProblem: iTextBox;
@ViewChild("txtProblemTempRef", {read:iTextBox, static: false }) set _txtProblem(c: iTextBox){
    if(c){ this.txtProblem  = c; }
};
public lblVerificationComments: iLabel;
@ViewChild("lblVerificationCommentsTempRef", {read:iLabel, static: false }) set _lblVerificationComments(c: iLabel){
    if(c){ this.lblVerificationComments  = c; }
};
public txtVerificationComments: iTextBox;
@ViewChild("txtVerificationCommentsTempRef", {read:iTextBox, static: false }) set _txtVerificationComments(c: iTextBox){
    if(c){ this.txtVerificationComments  = c; }
};
public lblModClerkReason: iLabel;
@ViewChild("lblModClerkReasonTempRef", {read:iLabel, static: false }) set _lblModClerkReason(c: iLabel){
    if(c){ this.lblModClerkReason  = c; }
};
public cboModClerkReason: iComboBox;
@ViewChild("cboModClerkReasonTempRef", {read:iComboBox, static: false }) set _cboModClerkReason(c: iComboBox){
    if(c){ this.cboModClerkReason  = c; }
};
public lblRsnForMod: iLabel;
@ViewChild("lblRsnForModTempRef", {read:iLabel, static: false }) set _lblRsnForMod(c: iLabel){
    if(c){ this.lblRsnForMod  = c; }
};
public cboRsnForMod: iComboBox;
@ViewChild("cboRsnForModTempRef", {read:iComboBox, static: false }) set _cboRsnForMod(c: iComboBox){
    if(c){ this.cboRsnForMod  = c; }
};
public lblAdmin: iLabel;
@ViewChild("lblAdminTempRef", {read:iLabel, static: false }) set _lblAdmin(c: iLabel){
    if(c){ this.lblAdmin  = c; }
};
public txtAdminInstruction: iTextBox;
@ViewChild("txtAdminInstructionTempRef", {read:iTextBox, static: false }) set _txtAdminInstruction(c: iTextBox){
    if(c){ this.txtAdminInstruction  = c; }
};
public brdAdditionalOptions: Border;
@ViewChild("brdAdditionalOptionsTempRef", {read:Border, static: false }) set _brdAdditionalOptions(c: Border){
    if(c){ this.brdAdditionalOptions  = c; }
};
public lblRecordAdminBorder: TextBlock;
@ViewChild("lblRecordAdminBorderTempRef", {read:TextBlock, static: false }) set _lblRecordAdminBorder(c: TextBlock){
    if(c){ this.lblRecordAdminBorder  = c; }
};
public lblForAdminMessage1: iLabel;
@ViewChild("lblForAdminMessage1TempRef", {read:iLabel, static: false }) set _lblForAdminMessage1(c: iLabel){
    if(c){ this.lblForAdminMessage1  = c; }
};
public chkForAdminOption1: iCheckBox;
@ViewChild("chkForAdminOption1TempRef", {read:iCheckBox, static: false }) set _chkForAdminOption1(c: iCheckBox){
    if(c){ this.chkForAdminOption1  = c; }
};
public lblForAdminMessage2: iLabel;
@ViewChild("lblForAdminMessage2TempRef", {read:iLabel, static: false }) set _lblForAdminMessage2(c: iLabel){
    if(c){ this.lblForAdminMessage2  = c; }
};
public chkForAdminOption2: iCheckBox;
@ViewChild("chkForAdminOption2TempRef", {read:iCheckBox, static: false }) set _chkForAdminOption2(c: iCheckBox){
    if(c){ this.chkForAdminOption2  = c; }
};
public brdSTA: Border;
@ViewChild("brdSTATempRef", {read:Border, static: false }) set _brdSTA(c: Border){
    if(c){ this.brdSTA  = c; }
};
public lblBorder: iLabel;
@ViewChild("lblBorderTempRef", {read:iLabel, static: false }) set _lblBorder(c: iLabel){
    if(c){ this.lblBorder  = c; }
};
 public ContentCtrlMedResolveStepped: ContentControl = new ContentControl();
// @ViewChild("ContentCtrlMedResolveSteppedTempRef", {read:ContentControl, static: false }) set _ContentCtrlMedResolveStepped(c: ContentControl){
//     if(c){ this.ContentCtrlMedResolveStepped  = c; }
// };
public _contentLoaded: Boolean;
@ViewChild("_contentLoadedTempRef", {read:Boolean, static: false }) set __contentLoaded(c: Boolean){
    if(c){ this._contentLoaded  = c; }    
};

public MedIPResolveStepped: medipresolvestepped;
@ViewChild("MedIPResolveSteppedTempRef", {read:medipresolvestepped, static: false }) set _MedIPResolveStepped(c: medipresolvestepped){
    if(c)
    { 
        console.log("Medipresolve.ViewChild ",(new Date()).getTime().toString(), c.cboFrequency == undefined);
        this.MedIPResolveStepped  = c; 
        this.MedIPResolveStepped.ParentRef = this;
        if(this.ContentCtrlMedResolveStepped.Content.MedIpResolveSteppedLoadedFunc)
            this.ContentCtrlMedResolveStepped.Content.MedIpResolveSteppedLoadedFunc(c);
        c.SetCombox();
    }
};
public medConditionalDose: medConditionalDose;
@ViewChild("medConditionalDoseTempRef", {read:medConditionalDose, static: false }) set _medConditionalDose(c: medConditionalDose){
 if(c)
 { 
     this.medConditionalDose  = c; 
     this.medConditionalDose.ParentRef = this;
     this.medConditionalDose.omedFormViewer = this.ParentRef;  
     if(this.ContentCtrlMedResolveStepped.Content.medConditionalDoseLoadedFunc)
          this.ContentCtrlMedResolveStepped.Content.medConditionalDoseLoadedFunc(c);
 }
};

    public resKey = Resource.MedicationForm;
    public resKey1 = Resource.Infusion;
    public Styles = ControlStyles;
    constructor() {
        super();
        this.Ref = this;
        that = this;
        this.bIsLoaded = false;
        //Moved the below line to ngAfterViewInit
        //this.dtpStartDate.IsConstrainEntry = true;
        this.objMulti = new Common.MultiRouteEvents();
    }
    ngOnDestroy(): void {
        this.UserControl_UnLoaded({}, null);
    }
    public maxScrollContentHeight;
    ngAfterViewInit(): void {   
        this.maxScrollContentHeight = CommonService.setDynamicScrollviewerHeight();
        if (window.screen.height > 1000) {
            if (this.maxScrollContentHeight) {
                this.maxScrollContentHeight = this.maxScrollContentHeight - 33;
            }
        }
        else {
            this.maxScrollContentHeight = this.maxScrollContentHeight - 35;
        }
        that=this;  
        if(this.dtpStartDate)     
        this.dtpStartDate.IsConstrainEntry = true;
        if(this.FormLoadAFterviewinit){
            this.UserControl_Loaded({}, null);
        }
        else {
            this.objfrm = ObjectHelper.CreateType<PrescriptionItemVM>(this.DataContext, PrescriptionItemVM);
            this.objfrm.FormviewerLoadedEvent.subscribe(data => {
                Object.keys(that).forEach((prop) => (this[prop] = that[prop]));
                this.UserControl_Loaded({}, null);
                this.FormLoadAFterviewinit = true
            }
            );
        }
        this.objfrm.FormViewerDetails.BasicDetails.PrnInstructionLoaded.subscribe(data => {
            this.cboPRNInstruction.ClearValue();
        });
        super.AfterViewInit();
    }
 
    //Multiroute Dropdown open/close
    onMultiRouteSelectedItemChanged(s:iMultiSelectDropdown,e){
        this.DataContext.FormViewerDetails.BasicDetails.DefaultDetails.MultiRoute2 = e;
            this.ParentRef.isMultiRouteOpenClose = true;
    }
    //Multiroute SelectionChanged
    onMultiRouteIsChecked(e){
        this.DataContext.FormViewerDetails.BasicDetails.IsMultiRouteChecked = e;
        if(e){
            setTimeout(() => {        
                this.ParentRef.multiSelectCboDoseTypePropertyChange()
            }, 0);
        }
    }
        private UserControl_Loaded(sender: Object, e: RoutedEventArgs): void {
            this.objfrm = ObjectHelper.CreateType<PrescriptionItemVM>(this.DataContext, PrescriptionItemVM);
            this.objfrm.FormViewerDetails.BasicDetails.bIsForAmendLaunchNewItem = false;
            if (PatientContext.PrescriptionType == PrescriptionTypes.ForAdministration && this.objfrm != null && this.objfrm.FormViewerDetails != null && this.objfrm.FormViewerDetails.BasicControls != null && this.objfrm.FormViewerDetails.BasicDetails.ManageReviewDetail != null && this.objfrm.FormViewerDetails.BasicDetails.ManageReviewDetail.oReviewAfterDetail != null && this.objfrm.FormViewerDetails.BasicDetails.ManageReviewDetail.oReviewAfterDetail.ReviewType != null && !String.IsNullOrEmpty(this.objfrm.FormViewerDetails.BasicDetails.ManageReviewDetail.oReviewAfterDetail.ReviewType.Code) && this.objfrm.FormViewerDetails.BasicDetails.ManageReviewDetail.oReviewAfterDetail.ReviewType.Code.Equals(MedCommonCConstants.OmitReview)) {
                this.objfrm.FormViewerDetails.BasicDetails.ReviewAfterMandatory = true;
            }
            if (String.Compare(this.objfrm.FormViewerDetails.BasicDetails.BrandName, "Select brand", StringComparison.InvariantCultureIgnoreCase) == 0) {
                this.objfrm.FormViewerDetails.BasicDetails.IsClearEnabled = false;
            }
            else {
                this.objfrm.FormViewerDetails.BasicDetails.IsClearEnabled = true;
            }
            if (!this.bIsLoaded) {
                this.bIsLoaded = true;
                if (String.Equals(PatientContext.ClerkFormViewDefaultBehavior, ClerkFormViewDeftBehaviour.LaunchFormMandatory)) {
                    this.objfrm.FormViewerDetails.BasicDetails.RangeStartDTTM = DateTime.MinValue;
                }
                if (PatientContext.PrescriptionType == PrescriptionTypes.ForAdministration && (this.objfrm.FormViewerDetails.BasicDetails.DoseType != null && String.Compare(this.objfrm.FormViewerDetails.BasicDetails.DoseType.Value, DoseTypeCode.STEPPEDVARIABLE, StringComparison.OrdinalIgnoreCase) != 0 && String.Compare(this.objfrm.FormViewerDetails.BasicDetails.DoseType.Value, DoseTypeCode.CONDITIONAL, StringComparison.OrdinalIgnoreCase) != 0)) {
                    this.objfrm.FormViewerDetails.BasicDetails.IscontentAdminTimesVisible = Visibility.Visible;
                }
                else {
                    this.objfrm.FormViewerDetails.BasicDetails.IscontentAdminTimesVisible = Visibility.Collapsed;
                }
                if (this.objfrm.ActionCode == ActivityTypes.Amend && this.objfrm.IsReasonForModificationVisible == Visibility.Visible && (this.objfrm.formViewerDetails.BasicDetails.ReasonforModification != null && !String.IsNullOrEmpty(this.objfrm.formViewerDetails.BasicDetails.ReasonforModification.Value) && (!String.Equals(this.objfrm.FormViewerDetails.BasicDetails.ReasonforModification.DisplayText, "Select reason", StringComparison.InvariantCultureIgnoreCase)))) {
                    this.objfrm.FormViewerDetails.BasicDetails.IsenableRSNFORMOD = false;
                    this.objfrm.FormViewerDetails.BasicDetails.IsMandatoryRSNFORMOD = false;
                    this.objfrm.FormViewerDetails.BasicDetails.IsClearlstAmendedFlds = true;
                    this.objfrm.FormViewerDetails.BasicDetails.lstAmendedFlds.Clear();
                    this.objfrm.FormViewerDetails.BasicDetails.lstDRCAmendedFlds.Clear();
                    this.objfrm.FormViewerDetails.BasicDetails.IsClearlstAmendList = true;
                }
                else if (this.objfrm.ActionCode == ActivityTypes.Amend && (this.objfrm.FormViewerDetails.BasicDetails.IsMCenableRSNFORMOD || (this.objfrm.FormViewerDetails.BasicDetails.IsClearlstAmendedFlds && this.objfrm.FormViewerDetails.BasicDetails.lstAmendedFlds != null && this.objfrm.FormViewerDetails.BasicDetails.lstAmendedFlds.Count > 0 && (this.objfrm.FormViewerDetails.BasicDetails.lstAmendedFlds.Contains("Route"))))) {
                    this.objfrm.IsReasonForModificationVisible = Visibility.Visible;
                    this.objfrm.FormViewerDetails.BasicDetails.IsMandatoryRSNFORMOD = true;
                }
                else if (this.objfrm.ActionCode == ActivityTypes.Reorder && ((this.objfrm.FormViewerDetails.BasicDetails.IsClearlstAmendList && this.objfrm.FormViewerDetails.BasicDetails.lstAmendedFlds != null && this.objfrm.FormViewerDetails.BasicDetails.lstAmendedFlds.Count > 0 && (this.objfrm.FormViewerDetails.BasicDetails.lstAmendedFlds.Contains("InfusionType") || this.objfrm.FormViewerDetails.BasicDetails.lstAmendedFlds.Contains("Route"))))) {
                    this.objfrm.FormViewerDetails.BasicDetails.IsClearOnAdmissionAmended = true;
                }
                else if (String.Compare(this.objfrm.ItemSubType, CConstants.SUBTYPE, StringComparison.OrdinalIgnoreCase) != 0) {
                    let bIsModificationReasonExists: boolean = this.objfrm.FormViewerDetails.BasicDetails.IsModificationReasonExists;
                    this.objfrm.IsReasonForModificationVisible = Visibility.Collapsed;
                    // if (!this.objfrm.IsConflictFaxTabLoaded && !this.objfrm.FormViewerDetails.BasicDetails.IsClearlstAmendedFlds) {
                    //     this.objfrm.FormViewerDetails.BasicDetails.IsMandatoryRSNFORMOD = false;
                    // }
                    // this.objfrm.FormViewerDetails.BasicDetails.IsClearlstAmendedFlds = true;
                    if (bIsModificationReasonExists)
                        this.objfrm.FormViewerDetails.BasicDetails.IsModificationReasonExists = true;
                    this.objfrm.FormViewerDetails.BasicDetails.lstAmendedFlds.Clear();
                    if (!this.objfrm.FormViewerDetails.BasicDetails.IsReloadedBasicTabContent) {
                        this.objfrm.FormViewerDetails.BasicDetails.lstDRCAmendedFlds.Clear();
                    }
                    if (this.objfrm.ActionCode == ActivityTypes.Amend && !String.IsNullOrEmpty(this.objfrm.FormViewerDetails.BasicDetails.IsAdminTypeFlag) && this.objfrm.FormViewerDetails.BasicDetails.IsAdminTypeFlag.Equals("F") && this.objfrm.FormViewerDetails.BasicDetails.AdminTimes != null) {
                        this.objfrm.FormViewerDetails.BasicDetails.AdminTimes.IsFixedTime = true;
                        if(this.adminslotuc != null && this.adminslotuc.grdAdminTimes != null && this.adminslotuc.grdAdminTimes.Columns["ScheduledDTTM"] != null){                           
                        this.adminslotuc.grdAdminTimes.Columns["ScheduledDTTM"].IsReadOnly = false;
                        }
                        this.objfrm.FormViewerDetails.BasicDetails.IsAdminTypeFlag = String.Empty;
                    }
                    else if (this.objfrm.ActionCode == ActivityTypes.Amend && !String.IsNullOrEmpty(this.objfrm.FormViewerDetails.BasicDetails.IsAdminTypeFlag) && this.objfrm.FormViewerDetails.BasicDetails.IsAdminTypeFlag.Equals("F") && this.objfrm.FormViewerDetails.BasicDetails.AdminTimes != null) {
                        this.objfrm.FormViewerDetails.BasicDetails.AdminTimes.IsDrugroundTime = true;
                        if(this.adminslotuc != null && this.adminslotuc.grdAdminTimes != null && this.adminslotuc.grdAdminTimes.Columns["ScheduledDTTM"] != null){                           
                            this.adminslotuc.grdAdminTimes.Columns["ScheduledDTTM"].IsReadOnly = true;
                        }                        
                        this.objfrm.FormViewerDetails.BasicDetails.IsAdminTypeFlag = String.Empty;
                    }
                    if (!this.objfrm.IsConflictFaxTabLoaded && !this.objfrm.FormViewerDetails.BasicDetails.IsClearlstAmendedFlds) {
                        this.objfrm.FormViewerDetails.BasicDetails.IsMandatoryRSNFORMOD = false;
                    }
                    this.objfrm.FormViewerDetails.BasicDetails.IsClearlstAmendedFlds = true;
                }
                else {
                    if (!this.objfrm.IsTechValFauxTabLoaded) {
                        this.objfrm.FormViewerDetails.BasicDetails.lstAmendedFlds.Clear();
                    }
                    this.objfrm.FormViewerDetails.BasicDetails.lstDRCAmendedFlds.Clear();
			//88429                    
                    if (this.objfrm.ActionCode == ActivityTypes.Amend && !String.IsNullOrEmpty(this.objfrm.FormViewerDetails.BasicDetails.IsAdminTypeFlag) && this.objfrm.FormViewerDetails.BasicDetails.IsAdminTypeFlag.Equals("F") && this.objfrm.FormViewerDetails.BasicDetails.AdminTimes != null) {
                        this.objfrm.FormViewerDetails.BasicDetails.IsClearlstAmendedFlds = false;
                        this.objfrm.FormViewerDetails.BasicDetails.AdminTimes.IsFixedTime = true;
                        if(this.adminslotuc != null && this.adminslotuc.grdAdminTimes != null && this.adminslotuc.grdAdminTimes.Columns["ScheduledDTTM"] != null){                           
                            this.adminslotuc.grdAdminTimes.Columns["ScheduledDTTM"].IsReadOnly = false;
                        }                        
                        this.objfrm.FormViewerDetails.BasicDetails.IsAdminTypeFlag = String.Empty;
                        this.objfrm.FormViewerDetails.BasicDetails.IsClearlstAmendedFlds = true;
                    }
                }
                this.objfrm.FormViewerDetails.BasicDetails.IsClearlstAmendList = true;
                this.objfrm.FormViewerDetails.BasicDetails.IsValidateDose = true;
                if (PatientContext.PrescriptionType == PrescriptionTypes.ForAdministration && this.objfrm != null && this.objfrm.FormViewerDetails != null && this.objfrm.FormViewerDetails.BasicDetails != null && this.objfrm.FormViewerDetails.BasicDetails != null && !String.IsNullOrEmpty(this.objfrm.FormViewerDetails.BasicDetails.DrugFreqUOMCode) && String.Equals(this.objfrm.FormViewerDetails.BasicDetails.DrugFreqUOMCode, "CC_MEDDRSN2", StringComparison.CurrentCultureIgnoreCase) && this.objfrm.ActionCode == ActivityTypes.Reorder && this.objfrm.FormViewerDetails.BasicDetails.AdminTimes != null) {
                    if (ProfileData.ScheduleConfig != null && ProfileData.ScheduleConfig.AdminTimeReqforPRN) {
                        this.objfrm.FormViewerDetails.BasicDetails.AdminTimes.IsSun = this.objfrm.FormViewerDetails.BasicDetails.IsSun;
                        this.objfrm.FormViewerDetails.BasicDetails.AdminTimes.IsMon = this.objfrm.FormViewerDetails.BasicDetails.IsMon;
                        this.objfrm.FormViewerDetails.BasicDetails.AdminTimes.IsTue = this.objfrm.FormViewerDetails.BasicDetails.IsTue;
                        this.objfrm.FormViewerDetails.BasicDetails.AdminTimes.IsWed = this.objfrm.FormViewerDetails.BasicDetails.IsWed;
                        this.objfrm.FormViewerDetails.BasicDetails.AdminTimes.IsThu = this.objfrm.FormViewerDetails.BasicDetails.IsThu;
                        this.objfrm.FormViewerDetails.BasicDetails.AdminTimes.IsFri = this.objfrm.FormViewerDetails.BasicDetails.IsFri;
                        this.objfrm.FormViewerDetails.BasicDetails.AdminTimes.IsSat = this.objfrm.FormViewerDetails.BasicDetails.IsSat;
                        this.objfrm.FormViewerDetails.BasicDetails.DrugFreqUOMCode = String.Empty;
                    }
                }
                if (!this.objfrm.IsClinicallyVerifyEnable && String.Compare(ContextInfo.MenuCode, CConstants.ClinicallyVerifyMenuCode, StringComparison.InvariantCultureIgnoreCase) != 0 && String.Compare(ContextInfo.MenuCode, CConstants.AuthoriseMenuCode, StringComparison.InvariantCultureIgnoreCase) != 0) {
                    this.objfrm.FormViewerDetails.BasicDetails.IsVisibleClinicallyverify = Visibility.Collapsed;
                }
                if (String.Compare(ContextInfo.MenuCode, CConstants.ClinicallyVerifyMenuCode, StringComparison.InvariantCultureIgnoreCase) == 0) {
                    if (this.objfrm.ActionCode != ActivityTypes.Amend) {
                        this.objfrm.FormViewerDetails.BasicDetails.IsenableRSNFORMOD = this.objfrm.FormViewerDetails.BasicDetails.IsMandatoryRSNFORMOD = true;
                        this.objfrm.IsClinicallyVerifyCommentsMandatory = false;
                        if ((this.objfrm.FormViewerDetails.BasicDetails.IsAuthorise || this.objfrm.FormViewerDetails.BasicDetails.IsFluidAuthorise || this.objfrm.FormViewerDetails.BasicDetails.IsMCIAuthorise) && String.IsNullOrEmpty(this.objfrm.PrescriptionItemStatus) && String.Equals(PatientContext.PrescriptionType, PrescriptionTypes.ForAdministration, StringComparison.OrdinalIgnoreCase) && PatientContext.ClerkFormViewDefaultBehavior != ClerkFormViewDeftBehaviour.LaunchFormMandatory) {
                            this.chckClinicalVerify.IsEnabled = this.objfrm.IsClinicallyVerifyEnable = this.objfrm.FormViewerDetails.BasicDetails.IsEnableChkClinivallyVerify = false;
                        }
                        else {
                            this.chckClinicalVerify.IsEnabled = this.objfrm.IsClinicallyVerifyEnable = this.objfrm.FormViewerDetails.BasicDetails.IsEnableChkClinivallyVerify = true;
                        }
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
                if ((this.objfrm.FormViewerDetails.BasicDetails.SelectedFrequencyDetails != null) && String.Equals(this.objfrm.FormViewerDetails.BasicDetails.SelectedFrequencyDetails.UOM, "CC_IPONCENLY", StringComparison.OrdinalIgnoreCase))
                    this.objfrm.FormViewerDetails.BasicDetails.IsenableStopDate = false;
                if (this.objfrm.FormViewerDetails.BasicDetails.FollowUpStatLaunch != '\0' && this.objfrm.FormViewerDetails.BasicDetails.FollowUpStatLaunch.Equals('S') && this.objfrm.FormViewerDetails.BasicDetails.Route != null && this.objfrm.FormViewerDetails.BasicDetails.Route.Tag != null && !this.objfrm.FormViewerDetails.BasicDetails.IsMultiRouteChecked && String.Compare(this.objfrm.FormViewerDetails.BasicDetails.Route.Tag.ToString(), "1") != 0 && !String.IsNullOrEmpty(this.objfrm.FormViewerDetails.BasicDetails.IdentifyingType) && (String.Equals(this.objfrm.FormViewerDetails.BasicDetails.IdentifyingType, "CATALOGUEITEM", StringComparison.InvariantCultureIgnoreCase) || String.Equals(this.objfrm.FormViewerDetails.BasicDetails.IdentifyingType, CConstants.ACTUALMOIETY, StringComparison.InvariantCultureIgnoreCase) || String.Equals(this.objfrm.FormViewerDetails.BasicDetails.IdentifyingType, CConstants.NONCATALOGUEITEM, StringComparison.InvariantCultureIgnoreCase) || String.Equals(this.objfrm.FormViewerDetails.BasicDetails.IdentifyingType, CConstants.Precatalog, StringComparison.InvariantCultureIgnoreCase))) {
                    this.objfrm.FormViewerDetails.BasicDetails.IsenableDosage = true;
                }
            }
            if (this.objfrm.FormViewerDetails.BasicDetails.IsenableDosage == true)
                this.objfrm.FormViewerDetails.BasicDetails.IsDosageFormMandatory = true;
            this.objfrm.FormViewerDetails.BasicDetails.IsOldDosageFormMandatory = true;
            this.objfrm.FormViewerDetails.BasicDetails.OtherAdminiInstVisibility = Visibility.Visible;
            this.objfrm.FormViewerDetails.BasicDetails.IsMultiRouteUnChecked = false;

            if (this.DataContext.FormViewerDetails.BasicDetails.IsClinicallyVerified == true) {
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
		
        private DisposeFormObjects(): void {
            this.objfrm = null;
        }
        private DisposeFormEvents(): void {

        }
        private UserControl_UnLoaded(sender: Object, e: RoutedEventArgs): void {

        }
        cmdBrand_MouseLeftButtonDown_Func = (s, e) => { 
            Object.keys(that).forEach((prop) => (this[prop] = that[prop]));
            this.cmdBrand_MouseLeftButtonDown(s, e); }
        private cmdBrand_MouseLeftButtonDown(sender: Object, e: MouseButtonEventArgs): void {
            this.objfrm.LaunchBrandConstraint();
        }
        public chkPRN_KeyDown(sender: Object, e: KeyEventArgs): void {
            if (e.PlatformKeyCode == 13) {
                this.chkPRN.IsChecked = !this.chkPRN.IsChecked;
            }
        }
        chckClinicalVerify_OnChange_Func=(s,e)=>{   Object.keys(that).forEach((prop) => (this[prop] = that[prop]));this.chckClinicalVerify_OnChange(s,e)}
        public chckClinicalVerify_OnChange(sender: Object, e: RoutedEventArgs): void {
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
                if (String.Equals(ContextInfo.MenuCode, CConstants.ClinicallyVerifyMenuCode, StringComparison.InvariantCultureIgnoreCase) && (this.objfrm.ActionCode != ActivityTypes.Amend || this.objfrm.PrescriptionItemStatus != CConstants.CLINICALLYVERIFIED)) {
                    this.objfrm.IsClinicallyVerifyCommentsMandatory = false;
                }
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
                if (this.objfrm != null && this.objfrm.FormViewerDetails != null && this.objfrm.FormViewerDetails.BasicDetails != null) {
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

      

    public txtLowerDose_SelectionChanged(sender: Object, e: RoutedEventArgs): void {
        if (this.objfrm != null && this.objfrm.FormViewerDetails != null && this.objfrm.FormViewerDetails.BasicDetails != null && this.objfrm.FormViewerDetails.BasicDetails.bDoseFromCal)
            this.objfrm.FormViewerDetails.BasicDetails.bDoseChange = true;
        let otxtLowerDose: iTextBox = ObjectHelper.CreateType<iTextBox>(sender, iTextBox);
        if (this.objfrm != null && this.objfrm.FormViewerDetails != null && this.objfrm.FormViewerDetails.BasicDetails != null && !String.IsNullOrEmpty(this.objfrm.formViewerDetails.BasicDetails.Dose) && !String.Equals(this.objfrm.formViewerDetails.BasicDetails.Dose, otxtLowerDose.Text, StringComparison.CurrentCultureIgnoreCase)) {
            this.objfrm.formViewerDetails.BasicDetails.Dose = otxtLowerDose.Text;
        }
        else if (this.objfrm != null && this.objfrm.FormViewerDetails != null && this.objfrm.FormViewerDetails.BasicDetails != null && String.IsNullOrEmpty(this.objfrm.formViewerDetails.BasicDetails.Dose) && !String.IsNullOrEmpty(otxtLowerDose.Text)) {
            this.objfrm.formViewerDetails.BasicDetails.Dose = otxtLowerDose.Text;
        }
    }
    public txtUpperDose_SelectionChanged(sender: Object, e: RoutedEventArgs): void {
        let otxtUpperDose: iTextBox = ObjectHelper.CreateType<iTextBox>(sender, iTextBox);
        if (this.objfrm != null && this.objfrm.FormViewerDetails != null && this.objfrm.FormViewerDetails.BasicDetails != null && !String.IsNullOrEmpty(this.objfrm.formViewerDetails.BasicDetails.UpperDose) && !String.Equals(this.objfrm.formViewerDetails.BasicDetails.UpperDose, otxtUpperDose.Text, StringComparison.CurrentCultureIgnoreCase)) {
            this.objfrm.formViewerDetails.BasicDetails.UpperDose = otxtUpperDose.Text;
        }
        else if (this.objfrm != null && this.objfrm.FormViewerDetails != null && this.objfrm.FormViewerDetails.BasicDetails != null && String.IsNullOrEmpty(this.objfrm.formViewerDetails.BasicDetails.UpperDose) && !String.IsNullOrEmpty(otxtUpperDose.Text)) {
            this.objfrm.formViewerDetails.BasicDetails.UpperDose = otxtUpperDose.Text;
        }
    }
    onSelectedValueChanged(e: CListItem) {
        //revisit required temp fix
        if (this.DataContext.FormViewerDetails.BasicDetails.ReviewafterUOM != e) {
            this.DataContext.FormViewerDetails.BasicDetails.ReviewafterUOM = e;
        }
    }
}
