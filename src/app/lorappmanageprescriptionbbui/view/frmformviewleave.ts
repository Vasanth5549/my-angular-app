import { AfterViewInit, Component, OnInit,ViewChild } from '@angular/core';
import { StringBuilder,ProfileFactoryType,ContextManager,Convert,AppActivity} from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp,Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison,AppDialogEventargs, AppDialogResult, DelegateArgs, DialogComponentArgs, WindowButtonType, ContentControl, KeyEventArgs } from 'epma-platform/models';
import { AppDialog, Border, MouseButtonEventArgs, ScrollViewer, ToolTipService, UserControl, iButton, iCheckBox, iComboBox, iDateTimePicker, iHyperlinkButton, iLabel, iTextBox, iTimeBox, iUpDownBox } from 'epma-platform/controls';
import { HelperService} from 'epma-platform/soapclient';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
import { PrescriptionItemVM } from '../viewmodel/PrescriptionItemVM';
import { DependencyPropertyChangedEventArgs, RoutedEventArgs } from 'src/app/shared/epma-platform/controls/Control';
import { ActivityTypes } from '../model/common';
import { Visibility } from 'src/app/shared/epma-platform/controls-model/Visibility';
//import { CConstants as MedCommonCConstants } from "src/app/lorappmedicationcommonbb/utilities/constants";
import { CConstants } from "../utilities/constants";
import { ContextInfo } from 'src/app/lorappcommonbb/utilities/globalvariable';
import { Resource } from '../resource';
import { Grid } from 'src/app/shared/epma-platform/controls/epma-grid-helpers/grid-extension';
import * as ControlStyles from "../../shared/epma-platform/controls/ControlStyles";
import { frmAdminSlotTimes } from './frmadminslottimes';
import { GridLayoutDirective } from 'src/app/shared/epma-platform/controls/Directives/common.directive';
import { frmWeekdays } from './frmweekdays';
import { medipresolvestepped } from './medipresolvestepped';
import { medresolvetitrated } from './medresolvetitrated';
import { medConditionalDose } from './medconditionaldose';
import { CommonService } from 'src/app/product/shared/common.service';

var that;
@Component({
    selector: 'FormViewLeave',
    templateUrl: './frmformviewleave.html',
    styleUrls: ['./frmformviewleave.css'],
  })
export class FormViewLeave extends UserControl implements AfterViewInit {
    public resKey = Resource.MedicationForm;
    public resKey1 = Resource.Infusion;
    public Styles = ControlStyles;
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
public cboRoute: iComboBox;
@ViewChild("cboRouteTempRef", {read:iComboBox, static: false }) set _cboRoute(c: iComboBox){
    if(c){ this.cboRoute  = c; }
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
 cboUOM: iComboBox;
@ViewChild("cboUOMTempRef", {read:iComboBox, static: false }) set _cboUOM(c: iComboBox){
    if(c){ this.cboUOM  = c; }
};
public lblStrength: iLabel;
@ViewChild("lblStrengthTempRef", {read:iLabel, static: false }) set _lblStrength(c: iLabel){
    if(c){ this.lblStrength  = c; }
};
public cboStrength: iComboBox;
@ViewChild("cboStrengthTempRef", {read:iComboBox, static: false }) set _cboStrength(c: iComboBox){
    if(c){ this.cboStrength  = c; }
};
 lblSite: iLabel;
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
public lblIsPRN: iLabel;
@ViewChild("lblIsPRNTempRef", {read:iLabel, static: false }) set _lblIsPRN(c: iLabel){
    if(c){ this.lblIsPRN  = c; }
};
public chkPRN: iCheckBox;
@ViewChild("chkPRNTempRef", {read:iCheckBox, static: false }) set _chkPRN(c: iCheckBox){
    if(c){ this.chkPRN  = c; }
};
public lblPRNInstruction: iLabel;
@ViewChild("lblPRNInstructionTempRef", {read:iLabel, static: false }) set _lblPRNInstruction(c: iLabel){
    if(c){ this.lblPRNInstruction  = c; }
};
public cboPRNInstruction: iComboBox;
@ViewChild("cboPRNInstructionTempRef", {read:iComboBox, static: false }) set _cboPRNInstruction(c: iComboBox){
    if(c){ this.cboPRNInstruction  = c; }
};
public Weekdays: frmWeekdays;
@ViewChild("WeekdaysTempRef", {read:frmWeekdays, static: false }) set _Weekdays(c: frmWeekdays){
    if(c){ this.Weekdays  = c; }
};
// need to be checked again 17-04 as recreated
// public Weekdays: frmAdminSlotTimes;
// @ViewChild("WeekdaysTempRef", {read:frmAdminSlotTimes, static: false }) set _Weekdays(c: frmAdminSlotTimes){
//     if(c){ this.Weekdays  = c; }
// };
//till here 17-04 to be checked again
public lblRsnForMod: iLabel;
@ViewChild("lblRsnForModTempRef", {read:iLabel, static: false }) set _lblRsnForMod(c: iLabel){
    if(c){ this.lblRsnForMod  = c; }
};
public cboRsnForMod: iComboBox;
@ViewChild("cboRsnForModTempRef", {read:iComboBox, static: false }) set _cboRsnForMod(c: iComboBox){
    if(c){ this.cboRsnForMod  = c; }
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
public lblPblmInd: iLabel;
@ViewChild("lblPblmIndTempRef", {read:iLabel, static: false }) set _lblPblmInd(c: iLabel){
    if(c){ this.lblPblmInd  = c; }
};
public txtProblem: iTextBox;
@ViewChild("txtProblemTempRef", {read:iTextBox, static: false }) set _txtProblem(c: iTextBox){
    if(c){ this.txtProblem  = c; }
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
public lblStatType: iLabel;
@ViewChild("lblStatTypeTempRef", {read:iLabel, static: false }) set _lblStatType(c: iLabel){
    if(c){ this.lblStatType  = c; }
};
public cboStatType: iComboBox;
@ViewChild("cboStatTypeTempRef", {read:iComboBox, static: false }) set _cboStatType(c: iComboBox){
    if(c){ this.cboStatType  = c; }
};
public lblSupplyInst: iLabel;
@ViewChild("lblSupplyInstTempRef", {read:iLabel, static: false }) set _lblSupplyInst(c: iLabel){
    if(c){ this.lblSupplyInst  = c; }
};
public lblSupplyInstText: iLabel;
@ViewChild("lblSupplyInstTextTempRef", {read:iLabel, static: false }) set _lblSupplyInstText(c: iLabel){
    if(c){ this.lblSupplyInstText  = c; }
};
public lblSupplyInstValue: iLabel;
@ViewChild("lblSupplyInstValueTempRef", {read:iLabel, static: false }) set _lblSupplyInstValue(c: iLabel){
    if(c){ this.lblSupplyInstValue  = c; }
};
public lblModComments: iLabel;
@ViewChild("lblModCommentsTempRef", {read:iLabel, static: false }) set _lblModComments(c: iLabel){
    if(c){ this.lblModComments  = c; }
};
public txtModComments: iTextBox;
@ViewChild("txtModCommentsTempRef", {read:iTextBox, static: false }) set _txtModComments(c: iTextBox){
    if(c){ this.txtModComments  = c; }
};
public lblAddComments: iLabel;
@ViewChild("lblAddCommentsTempRef", {read:iLabel, static: false }) set _lblAddComments(c: iLabel){
    if(c){ this.lblAddComments  = c; }
};
public txtAddComments: iTextBox;
@ViewChild("txtAddCommentsTempRef", {read:iTextBox, static: false }) set _txtAddComments(c: iTextBox){
    if(c){ this.txtAddComments  = c; }
};
public lbtnSequencelinkforNonIv: iHyperlinkButton;
@ViewChild("lbtnSequencelinkforNonIvTempRef", {read:iHyperlinkButton, static: false }) set _lbtnSequencelinkforNonIv(c: iHyperlinkButton){
    if(c){ this.lbtnSequencelinkforNonIv  = c; }
};
public lblVerificationComments: iLabel;
@ViewChild("lblVerificationCommentsTempRef", {read:iLabel, static: false }) set _lblVerificationComments(c: iLabel){
    if(c){ this.lblVerificationComments  = c; }
};
public txtVerificationComments: iTextBox;
@ViewChild("txtVerificationCommentsTempRef", {read:iTextBox, static: false }) set _txtVerificationComments(c: iTextBox){
    if(c){ this.txtVerificationComments  = c; }
};
public lblBrand: iLabel;
@ViewChild("lblBrandTempRef", {read:iLabel, static: false }) set _lblBrand(c: iLabel){
    if(c){ this.lblBrand  = c; }
};
 BrandLayout: Grid;
@ViewChild("BrandLayoutTempRef", {read:Grid, static: false }) set _BrandLayout(c: Grid){
    if(c){ this.BrandLayout  = c; }
};
public cmdBrand: iLabel;
@ViewChild("cmdBrandTempRef", {read:iLabel, static: false }) set _cmdBrand(c: iLabel){
    if(c){ this.cmdBrand  = c; }
};
private cmdClear: iButton;
@ViewChild("cmdClearTempRef", {read:iButton, static: false }) set _cmdClear(c: iButton){
    if(c){ this.cmdClear  = c; }
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

public Medresolvetitrated: medresolvetitrated;
@ViewChild("MedresolvetitratedTempRef", {read:medresolvetitrated, static: false }) set _Medresolvetitrated(c: medresolvetitrated){
 if(c)
 { 
     this.Medresolvetitrated  = c; 
     this.Medresolvetitrated.ParentRef = this;
     this.Medresolvetitrated.omedFormViewer = this.ParentRef;  
     if(this.ContentCtrlMedResolveStepped.Content.MedResolveTitratedLoadedFunc)
          this.ContentCtrlMedResolveStepped.Content.MedResolveTitratedLoadedFunc(c);
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

    chkPRN_KeyDown_Func = (s, e) => { this.chkPRN_KeyDown(s, e) };
    public bIsLoaded: boolean = false;
    public FormLoadAFterviewinit: boolean = false;
    objfrm: PrescriptionItemVM;
    constructor() {
        super();
        this.Ref = this;
        that = this;
        // InitializeComponent();
        // this.dtpStartDate.IsConstrainEntry = true;
    }
    
    public maxScrollContentHeight;
    ngAfterViewInit(): void {
        if (window.screen.height < 1000 && window.devicePixelRatio != 1.25) {
            this.maxScrollContentHeight = window.innerHeight - 218;
        }
        else {
            this.maxScrollContentHeight = CommonService.setDynamicScrollviewerHeight();
            if (this.maxScrollContentHeight) {
                this.maxScrollContentHeight = this.maxScrollContentHeight - 40;
            }
        }
        console.log("DataContextCheck", this.DataContext);
        this.dtpStartDate.IsConstrainEntry = true;
        if (this.FormLoadAFterviewinit) {
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
    cmdBrand_MouseLeftButtonDown_Func = (s, e) => {
        Object.keys(that).forEach((prop) => (this[prop] = that[prop]));
        this.cmdBrand_MouseLeftButtonDown(s, e);
    }
    cmdBrand_MouseLeftButtonDown(sender: Object, e: MouseButtonEventArgs): void {
        this.objfrm.LaunchBrandConstraint();
    }
    UserControl_Loaded(sender: Object, e: RoutedEventArgs): void {
        console.log("DataContextCheck", this.DataContext);
        this.objfrm = ObjectHelper.CreateType<PrescriptionItemVM>(this.DataContext, PrescriptionItemVM);
        this.objfrm.FormViewerDetails.BasicDetails.bIsForAmendLaunchNewItem = false;
        if (String.Compare(this.objfrm.FormViewerDetails.BasicDetails.BrandName, "Select brand", StringComparison.InvariantCultureIgnoreCase) == 0) {
            this.objfrm.FormViewerDetails.BasicDetails.IsClearEnabled = false;
        }
        else {
            this.objfrm.FormViewerDetails.BasicDetails.IsClearEnabled = true;
        }
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
            else if (this.objfrm.ActionCode == ActivityTypes.Amend && (this.objfrm.FormViewerDetails.BasicDetails.IsMCenableRSNFORMOD || (this.objfrm.FormViewerDetails.BasicDetails.IsClearlstAmendedFlds && this.objfrm.FormViewerDetails.BasicDetails.lstAmendedFlds != null && this.objfrm.FormViewerDetails.BasicDetails.lstAmendedFlds.Count > 0 && (this.objfrm.FormViewerDetails.BasicDetails.lstAmendedFlds.Contains("Route"))))) {
                this.objfrm.IsReasonForModificationVisible = Visibility.Visible;
                this.objfrm.FormViewerDetails.BasicDetails.IsMandatoryRSNFORMOD = true;
            }
            else if (this.objfrm.ActionCode == ActivityTypes.Reorder && ((this.objfrm.FormViewerDetails.BasicDetails.IsClearlstAmendList && this.objfrm.FormViewerDetails.BasicDetails.lstAmendedFlds != null && this.objfrm.FormViewerDetails.BasicDetails.lstAmendedFlds.Count > 0 && (this.objfrm.FormViewerDetails.BasicDetails.lstAmendedFlds.Contains("InfusionType") || this.objfrm.FormViewerDetails.BasicDetails.lstAmendedFlds.Contains("Route"))))) {

            }
            else if (String.Compare(this.objfrm.ItemSubType, CConstants.SUBTYPE, StringComparison.OrdinalIgnoreCase) != 0) {
                let bIsModificationReasonExists: boolean = this.objfrm.FormViewerDetails.BasicDetails.IsModificationReasonExists;
                this.objfrm.IsReasonForModificationVisible = Visibility.Collapsed;
                if (!this.objfrm.IsConflictFaxTabLoaded && !this.objfrm.FormViewerDetails.BasicDetails.IsClearlstAmendedFlds) {
                    this.objfrm.FormViewerDetails.BasicDetails.IsMandatoryRSNFORMOD = false;
                }
                this.objfrm.FormViewerDetails.BasicDetails.IsClearlstAmendedFlds = true;
                if (bIsModificationReasonExists)
                    this.objfrm.FormViewerDetails.BasicDetails.IsModificationReasonExists = true;
                this.objfrm.FormViewerDetails.BasicDetails.lstAmendedFlds.Clear();
                this.objfrm.FormViewerDetails.BasicDetails.lstDRCAmendedFlds.Clear();
            }
            else {
                this.objfrm.FormViewerDetails.BasicDetails.lstAmendedFlds.Clear();
                this.objfrm.FormViewerDetails.BasicDetails.lstDRCAmendedFlds.Clear();
            }
            this.objfrm.FormViewerDetails.BasicDetails.IsValidateDose = true;
            this.objfrm.FormViewerDetails.BasicDetails.IsenableMultiRoute = false;
            this.objfrm.FormViewerDetails.BasicDetails.IsClearlstAmendList = true;
            if (!this.objfrm.IsClinicallyVerifyEnable && String.Compare(ContextInfo.MenuCode, CConstants.ClinicallyVerifyMenuCode, StringComparison.InvariantCultureIgnoreCase) != 0 && String.Compare(ContextInfo.MenuCode, CConstants.AuthoriseMenuCode, StringComparison.InvariantCultureIgnoreCase) != 0) {
                this.objfrm.FormViewerDetails.BasicDetails.IsVisibleClinicallyverify = Visibility.Collapsed;
            }
            if (String.Compare(ContextInfo.MenuCode, CConstants.ClinicallyVerifyMenuCode, StringComparison.InvariantCultureIgnoreCase) == 0) {
                if (this.objfrm.ActionCode != ActivityTypes.Amend) {
                    this.objfrm.FormViewerDetails.BasicDetails.IsenableRSNFORMOD = this.objfrm.FormViewerDetails.BasicDetails.IsMandatoryRSNFORMOD = true;
                    this.objfrm.IsClinicallyVerifyCommentsMandatory = false;
                    this.objfrm.FormViewerDetails.BasicDetails.IsClinicallyVerified = false;
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
        }
        if (this.objfrm.FormViewerDetails.BasicDetails.IsenableDosage == true)
            this.objfrm.FormViewerDetails.BasicDetails.IsDosageFormMandatory = true;

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
    chkPRN_KeyDown(sender: Object, e: KeyEventArgs): void {
        if (e.PlatformKeyCode == 13) {
            this.chkPRN.IsChecked = !this.chkPRN.IsChecked;
        }
    }
    chckClinicalVerify_OnChange(sender: any): void {
        if (sender.IsChecked == true) {
            if (this.objfrm != null) {
                this.objfrm.IsClinicallyVerifyCommentsMandatory = false;
                this.objfrm.FormViewerDetails.BasicDetails.IsClinicallyVerified = true;
            }
        }
        else {
            if (String.Equals(ContextInfo.MenuCode, CConstants.ClinicallyVerifyMenuCode, StringComparison.InvariantCultureIgnoreCase) && this.objfrm != null && this.objfrm.PrescriptionItemStatus == CConstants.CLINICALLYVERIFIED) {
                this.objfrm.OperationMode = "M";
            }
            if (String.Equals(ContextInfo.MenuCode, CConstants.ClinicallyVerifyMenuCode, StringComparison.InvariantCultureIgnoreCase) && (this.objfrm.ActionCode != ActivityTypes.Amend || this.objfrm.PrescriptionItemStatus != CConstants.CLINICALLYVERIFIED))
                this.objfrm.IsClinicallyVerifyCommentsMandatory = false;
            if (this.objfrm != null && this.objfrm.FormViewerDetails != null && this.objfrm.FormViewerDetails.BasicDetails != null) {
                this.objfrm.FormViewerDetails.BasicDetails.IsClinicallyVerified = false;
            }
            if (String.Equals(ContextInfo.MenuCode, CConstants.ClinicallyVerifyMenuCode, StringComparison.InvariantCultureIgnoreCase) && this.objfrm != null && this.objfrm.PrescriptionItemStatus == CConstants.CLINICALLYVERIFIED){
                this.objfrm.IsClinicallyVerifyCommentsMandatory = true;
            }
        }
    }
    cboRsnForMod_IsEnabledChanged(sender: Object, e: DependencyPropertyChangedEventArgs): void {
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
    ClearAllFields(): void {
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
    txtLowerDose_SelectionChanged(sender: Object, e: RoutedEventArgs): void {
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
    txtUpperDose_SelectionChanged(sender: Object, e: RoutedEventArgs): void {
        let otxtUpperDose: iTextBox = ObjectHelper.CreateType<iTextBox>(sender, iTextBox);
        if (this.objfrm != null && this.objfrm.FormViewerDetails != null && this.objfrm.FormViewerDetails.BasicDetails != null && !String.IsNullOrEmpty(this.objfrm.formViewerDetails.BasicDetails.UpperDose) && !String.Equals(this.objfrm.formViewerDetails.BasicDetails.UpperDose, otxtUpperDose.Text, StringComparison.CurrentCultureIgnoreCase)) {
            this.objfrm.formViewerDetails.BasicDetails.UpperDose = otxtUpperDose.Text;
        }
        else if (this.objfrm != null && this.objfrm.FormViewerDetails != null && this.objfrm.FormViewerDetails.BasicDetails != null && String.IsNullOrEmpty(this.objfrm.formViewerDetails.BasicDetails.UpperDose) && !String.IsNullOrEmpty(otxtUpperDose.Text)) {
            this.objfrm.formViewerDetails.BasicDetails.UpperDose = otxtUpperDose.Text;
        }
    }
}
