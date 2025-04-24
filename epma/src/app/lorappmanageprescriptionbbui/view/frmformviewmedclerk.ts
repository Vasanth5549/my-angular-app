import { Component, OnInit, ViewChild } from '@angular/core';
import { StringBuilder,ProfileFactoryType,ContextManager,Convert,AppActivity} from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp,Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison,AppDialogEventargs, AppDialogResult, DelegateArgs, DialogComponentArgs, WindowButtonType, ContentControl } from 'epma-platform/models';
import { AppDialog, Border, Grid, KeyEventArgs, MouseButtonEventArgs, ScrollViewer, ToolTipService, UserControl, iButton, iCheckBox, iComboBox, iDateTimePicker, iLabel, iRadioButton, iTextBox, iUpDownBox } from 'epma-platform/controls';
import { HelperService} from 'epma-platform/soapclient';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
import { frmWeekdays } from './frmweekdays';
import { PrescriptionItemVM } from '../viewmodel/PrescriptionItemVM';
import { MultiSelectListView } from './MultiSelectListView';
import { ActivityTypes } from '../model/common';
import { CConstants, ValueDomain } from '../utilities/constants';
import { ContextInfo } from 'src/app/lorappcommonbb/utilities/globalvariable';
import { RoutedEventArgs } from 'src/app/shared/epma-platform/controls/FrameworkElement';
import { Resource } from '../resource';
import { MultiSelectListVM } from '../viewmodel/MultiSelectListVM';
import { DependencyPropertyChangedEventArgs } from 'src/app/shared/epma-platform/controls/Control';
import { MedicationForm } from '../resource/medicationform.designer';
import { CListItemsDisplay, WrapToolTip } from 'src/app/product/shared/convertor/medicationconverters.service';
import * as ControlStyles from "../../shared/epma-platform/controls/ControlStyles";
import { Visibility } from 'epma-platform/models';
import { medipresolvestepped } from "./medipresolvestepped";
import { medresolvetitrated } from './medresolvetitrated';
import { medConditionalDose } from './medconditionaldose';
import { CommonService } from 'src/app/product/shared/common.service';

var that;

@Component({ selector: 'FormViewMedClerk',
templateUrl: './frmformviewmedclerk.html',
styleUrls: ['./frmformviewmedclerk.css'],})

export class FormViewMedClerk extends UserControl {
        private svwFormViewer: ScrollViewer;
    Ref: this;
@ViewChild("svwFormViewerTempRef", {read:ScrollViewer, static: false }) set _svwFormViewer(c: ScrollViewer){
    if(c){ this.svwFormViewer  = c; }
};
private LayoutRoot: Grid;
@ViewChild("LayoutRootTempRef", {read:Grid, static: false }) set _LayoutRoot(c: Grid){
    if(c){ this.LayoutRoot  = c; }
};
private lblRoute: iLabel;
@ViewChild("lblRouteTempRef", {read:iLabel, static: false }) set _lblRoute(c: iLabel){
    if(c){ this.lblRoute  = c; }
};
private cboRoute: iComboBox;
@ViewChild("cboRouteTempRef", {read:iComboBox, static: false }) set _cboRoute(c: iComboBox){
    if(c){ this.cboRoute  = c; }
};
private lblDosageForm: iLabel;
@ViewChild("lblDosageFormTempRef", {read:iLabel, static: false }) set _lblDosageForm(c: iLabel){
    if(c){ this.lblDosageForm  = c; }
};
private cboDosageForm: iComboBox;
@ViewChild("cboDosageFormTempRef", {read:iComboBox, static: false }) set _cboDosageForm(c: iComboBox){
    if(c){ this.cboDosageForm  = c; }
};
private lblDoseType: iLabel;
@ViewChild("lblDoseTypeTempRef", {read:iLabel, static: false }) set _lblDoseType(c: iLabel){
    if(c){ this.lblDoseType  = c; }
};
private cboDoseType: iComboBox;
@ViewChild("cboDoseTypeTempRef", {read:iComboBox, static: false }) set _cboDoseType(c: iComboBox){
    if(c){ this.cboDoseType  = c; }
};
private cboAdminMethod: iComboBox;
@ViewChild("cboAdminMethodTempRef", {read:iComboBox, static: false }) set _cboAdminMethod(c: iComboBox){
    if(c){ this.cboAdminMethod  = c; }
};
private lblDose: iLabel;
@ViewChild("lblDoseTempRef", {read:iLabel, static: false }) set _lblDose(c: iLabel){
    if(c){ this.lblDose  = c; }
};
private Dosecal: iButton;
@ViewChild("DosecalTempRef", {read:iButton, static: false }) set _Dosecal(c: iButton){
    if(c){ this.Dosecal  = c; }
};
private DoseLayoutRoot: Grid;
@ViewChild("DoseLayoutRootTempRef", {read:Grid, static: false }) set _DoseLayoutRoot(c: Grid){
    if(c){ this.DoseLayoutRoot  = c; }
};
private txtLowerDose: iTextBox;
@ViewChild("txtLowerDoseTempRef", {read:iTextBox, static: false }) set _txtLowerDose(c: iTextBox){
    if(c){ this.txtLowerDose  = c; }
};
private lblHifen: iLabel;
@ViewChild("lblHifenTempRef", {read:iLabel, static: false }) set _lblHifen(c: iLabel){
    if(c){ this.lblHifen  = c; }
};
private txtUpperDose: iTextBox;
@ViewChild("txtUpperDoseTempRef", {read:iTextBox, static: false }) set _txtUpperDose(c: iTextBox){
    if(c){ this.txtUpperDose  = c; }
};
private lblUOM: iLabel;
@ViewChild("lblUOMTempRef", {read:iLabel, static: false }) set _lblUOM(c: iLabel){
    if(c){ this.lblUOM  = c; }
};
private cboUOM: iComboBox;
@ViewChild("cboUOMTempRef", {read:iComboBox, static: false }) set _cboUOM(c: iComboBox){
    if(c){ this.cboUOM  = c; }
};
private lblStrength: iLabel;
@ViewChild("lblStrengthTempRef", {read:iLabel, static: false }) set _lblStrength(c: iLabel){
    if(c){ this.lblStrength  = c; }
};
private cboStrength: iComboBox;
@ViewChild("cboStrengthTempRef", {read:iComboBox, static: false }) set _cboStrength(c: iComboBox){
    if(c){ this.cboStrength  = c; }
};
private lblSite: iLabel;
@ViewChild("lblSiteTempRef", {read:iLabel, static: false }) set _lblSite(c: iLabel){
    if(c){ this.lblSite  = c; }
};
private cboSite: iComboBox;
@ViewChild("cboSiteTempRef", {read:iComboBox, static: false }) set _cboSite(c: iComboBox){
    if(c){ this.cboSite  = c; }
};
private lblFrequency: iLabel;
@ViewChild("lblFrequencyTempRef", {read:iLabel, static: false }) set _lblFrequency(c: iLabel){
    if(c){ this.lblFrequency  = c; }
};
private cboFrequency: iComboBox;
@ViewChild("cboFrequencyTempRef", {read:iComboBox, static: false }) set _cboFrequency(c: iComboBox){
    if(c){ this.cboFrequency  = c; }
};
private lblIsPRN: iLabel;
@ViewChild("lblIsPRNTempRef", {read:iLabel, static: false }) set _lblIsPRN(c: iLabel){
    if(c){ this.lblIsPRN  = c; }
};
private chkPRN: iCheckBox;
@ViewChild("chkPRNTempRef", {read:iCheckBox, static: false }) set _chkPRN(c: iCheckBox){
    if(c){ this.chkPRN  = c; }
};
private lblPRNInstruction: iLabel;
@ViewChild("lblPRNInstructionTempRef", {read:iLabel, static: false }) set _lblPRNInstruction(c: iLabel){
    if(c){ this.lblPRNInstruction  = c; }
};
private cboPRNInstruction: iComboBox;
@ViewChild("cboPRNInstructionTempRef", {read:iComboBox, static: false }) set _cboPRNInstruction(c: iComboBox){
    if(c){ this.cboPRNInstruction  = c; }
};
private lblBrand: iLabel;
@ViewChild("lblBrandTempRef", {read:iLabel, static: false }) set _lblBrand(c: iLabel){
    if(c){ this.lblBrand  = c; }
};
private BrandLayout: Grid;
@ViewChild("BrandLayoutTempRef", {read:Grid, static: false }) set _BrandLayout(c: Grid){
    if(c){ this.BrandLayout  = c; }
};
private cmdBrand: iLabel;
@ViewChild("cmdBrandTempRef", {read:iLabel, static: false }) set _cmdBrand(c: iLabel){
    if(c){ this.cmdBrand  = c; }
};
private cmdClear: iButton;
@ViewChild("cmdClearTempRef", {read:iButton, static: false }) set _cmdClear(c: iButton){
    if(c){ this.cmdClear  = c; }
};
private Weekdays: frmWeekdays;
@ViewChild("WeekdaysTempRef", {read:frmWeekdays, static: false }) set _Weekdays(c: frmWeekdays){
    if(c){ this.Weekdays  = c; }
};
private lblPblmInd: iLabel;
@ViewChild("lblPblmIndTempRef", {read:iLabel, static: false }) set _lblPblmInd(c: iLabel){
    if(c){ this.lblPblmInd  = c; }
};
private txtProblem: iTextBox;
@ViewChild("txtProblemTempRef", {read:iTextBox, static: false }) set _txtProblem(c: iTextBox){
    if(c){ this.txtProblem  = c; }
};
private lblDateCommenced: iLabel;
@ViewChild("lblDateCommencedTempRef", {read:iLabel, static: false }) set _lblDateCommenced(c: iLabel){
    if(c){ this.lblDateCommenced  = c; }
};
private optCompletedate: iRadioButton;
@ViewChild("optCompletedateTempRef", {read:iRadioButton, static: false }) set _optCompletedate(c: iRadioButton){
    if(c){ this.optCompletedate  = c; }
};
private optPartialdate: iRadioButton;
@ViewChild("optPartialdateTempRef", {read:iRadioButton, static: false }) set _optPartialdate(c: iRadioButton){
    if(c){ this.optPartialdate  = c; }
};
private lblStartDate: iLabel;
@ViewChild("lblStartDateTempRef", {read:iLabel, static: false }) set _lblStartDate(c: iLabel){
    if(c){ this.lblStartDate  = c; }
};
private dtpStartDate: iDateTimePicker;
@ViewChild("dtpStartDateTempRef", {read:iDateTimePicker, static: false }) set _dtpStartDate(c: iDateTimePicker){
    if(c){ this.dtpStartDate  = c; }
};
private lblMonth: iLabel;
@ViewChild("lblMonthTempRef", {read:iLabel, static: false }) set _lblMonth(c: iLabel){
    if(c){ this.lblMonth  = c; }
};
private cboMonth: iComboBox;
@ViewChild("cboMonthTempRef", {read:iComboBox, static: false }) set _cboMonth(c: iComboBox){
    if(c){ this.cboMonth  = c; }
};
private udYear: iUpDownBox;
@ViewChild("udYearTempRef", {read:iUpDownBox, static: false }) set _udYear(c: iUpDownBox){
    if(c){ this.udYear  = c; }
};
private lblQuantity: iLabel;
@ViewChild("lblQuantityTempRef", {read:iLabel, static: false }) set _lblQuantity(c: iLabel){
    if(c){ this.lblQuantity  = c; }
};
private txtQuantity: iTextBox;
@ViewChild("txtQuantityTempRef", {read:iTextBox, static: false }) set _txtQuantity(c: iTextBox){
    if(c){ this.txtQuantity  = c; }
};
private cboQuantity: iComboBox;
@ViewChild("cboQuantityTempRef", {read:iComboBox, static: false }) set _cboQuantity(c: iComboBox){
    if(c){ this.cboQuantity  = c; }
};
private lblDuration: iLabel;
@ViewChild("lblDurationTempRef", {read:iLabel, static: false }) set _lblDuration(c: iLabel){
    if(c){ this.lblDuration  = c; }
};
private udDuration: iUpDownBox;
@ViewChild("udDurationTempRef", {read:iUpDownBox, static: false }) set _udDuration(c: iUpDownBox){
    if(c){ this.udDuration  = c; }
};
private cboDuration: iComboBox;
@ViewChild("cboDurationTempRef", {read:iComboBox, static: false }) set _cboDuration(c: iComboBox){
    if(c){ this.cboDuration  = c; }
};
private lblMedicationClerk: iLabel;
@ViewChild("lblMedicationClerkTempRef", {read:iLabel, static: false }) set _lblMedicationClerk(c: iLabel){
    if(c){ this.lblMedicationClerk  = c; }
};
private lblMedicationClerking: iLabel;
@ViewChild("lblMedicationClerkingTempRef", {read:iLabel, static: false }) set _lblMedicationClerking(c: iLabel){
    if(c){ this.lblMedicationClerking  = c; }
};
private lblModComments: iLabel;
@ViewChild("lblModCommentsTempRef", {read:iLabel, static: false }) set _lblModComments(c: iLabel){
    if(c){ this.lblModComments  = c; }
};
private txtModComments: iTextBox;
@ViewChild("txtModCommentsTempRef", {read:iTextBox, static: false }) set _txtModComments(c: iTextBox){
    if(c){ this.txtModComments  = c; }
};
private lblAddComments: iLabel;
@ViewChild("lblAddCommentsTempRef", {read:iLabel, static: false }) set _lblAddComments(c: iLabel){
    if(c){ this.lblAddComments  = c; }
};
private txtAddComments: iTextBox;
@ViewChild("txtAddCommentsTempRef", {read:iTextBox, static: false }) set _txtAddComments(c: iTextBox){
    if(c){ this.txtAddComments  = c; }
};
private lblVerificationComments: iLabel;
@ViewChild("lblVerificationCommentsTempRef", {read:iLabel, static: false }) set _lblVerificationComments(c: iLabel){
    if(c){ this.lblVerificationComments  = c; }
};
private txtVerificationComments: iTextBox;
@ViewChild("txtVerificationCommentsTempRef", {read:iTextBox, static: false }) set _txtVerificationComments(c: iTextBox){
    if(c){ this.txtVerificationComments  = c; }
};
private lblRsnForMod: iLabel;
@ViewChild("lblRsnForModTempRef", {read:iLabel, static: false }) set _lblRsnForMod(c: iLabel){
    if(c){ this.lblRsnForMod  = c; }
};
private cboRsnForMod: iComboBox;
@ViewChild("cboRsnForModTempRef", {read:iComboBox, static: false }) set _cboRsnForMod(c: iComboBox){
    if(c){ this.cboRsnForMod  = c; }
};
private lblIsClinicallyVerified: iLabel;
@ViewChild("lblIsClinicallyVerifiedTempRef", {read:iLabel, static: false }) set _lblIsClinicallyVerified(c: iLabel){
    if(c){ this.lblIsClinicallyVerified  = c; }
};
private chckClinicalVerify: iCheckBox;
@ViewChild("chckClinicalVerifyTempRef", {read:iCheckBox, static: false }) set _chckClinicalVerify(c: iCheckBox){
    if(c){ this.chckClinicalVerify  = c; }
};
private lblPrescribedby: iLabel;
@ViewChild("lblPrescribedbyTempRef", {read:iLabel, static: false }) set _lblPrescribedby(c: iLabel){
    if(c){ this.lblPrescribedby  = c; }
};
private txtPrescribedby: iLabel;
@ViewChild("txtPrescribedbyTempRef", {read:iLabel, static: false }) set _txtPrescribedby(c: iLabel){
    if(c){ this.txtPrescribedby  = c; }
};
private brdSTA: Border;
@ViewChild("brdSTATempRef", {read:Border, static: false }) set _brdSTA(c: Border){
    if(c){ this.brdSTA  = c; }
};
private lblBorder: iLabel;
@ViewChild("lblBorderTempRef", {read:iLabel, static: false }) set _lblBorder(c: iLabel){
    if(c){ this.lblBorder  = c; }
};
public ContentCtrlMedResolveStepped: ContentControl = new ContentControl();
// @ViewChild("ContentCtrlMedResolveSteppedTempRef", {read:ContentControl, static: false }) set _ContentCtrlMedResolveStepped(c: ContentControl){
//     if(c){ this.ContentCtrlMedResolveStepped  = c; }
// };


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

chkPRN_KeyDown_Func = (s,e) => {this.chkPRN_KeyDown(s,e)};

public resKey = Resource.MedicationForm;
public FormLoadAFterviewinit : boolean = false;

public MedClrkSrc:CListItemsDisplay;
public MedClrkToolTip:WrapToolTip;
public Styles = ControlStyles;
        public bIsLoaded: boolean = false;
        objfrm: PrescriptionItemVM;
        public oMultiSelectListView: MultiSelectListView;
        Completedate = false;
    Partialdate = true;
    constructor() {
        super();
        this.Ref = this;
        that = this;
        //InitializeComponent();
        //this.dtpStartDate.IsConstrainEntry = true;
    }
    public maxScrollContentHeight;
        ngAfterViewInit(): void {  
            if (window.screen.height < 1000 && window.devicePixelRatio != 1.25) {
                this.maxScrollContentHeight = window.innerHeight - 206;
            }
            else {
                this.maxScrollContentHeight = CommonService.setDynamicScrollviewerHeight();
                if (this.maxScrollContentHeight) {
                    this.maxScrollContentHeight = this.maxScrollContentHeight - 33;
                }
            }
            this.dtpStartDate.IsConstrainEntry = true;
            if(this.FormLoadAFterviewinit){
                this.UserControl_Loaded({}, null);
            }
            else{
            this.objfrm = ObjectHelper.CreateType<PrescriptionItemVM>(this.DataContext, PrescriptionItemVM);       
            this.objfrm.FormviewerLoadedEvent.subscribe( data => {
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
    private UserControl_Loaded(sender: Object, e: RoutedEventArgs): void {
        this.objfrm = ObjectHelper.CreateType<PrescriptionItemVM>(this.DataContext, PrescriptionItemVM);
        if (this.objfrm != null) {
            this.objfrm.FormViewerDetails.BasicDetails.bIsForAmendLaunchNewItem = false;
            if (String.Compare(this.objfrm.FormViewerDetails.BasicDetails.BrandName, "Select brand", StringComparison.InvariantCultureIgnoreCase) == 0) {
                this.objfrm.FormViewerDetails.BasicDetails.IsClearEnabled = false;
            }
            else {
                this.objfrm.FormViewerDetails.BasicDetails.IsClearEnabled = true;
            }
            if (!this.bIsLoaded) {
                this.objfrm.FormViewerDetails.BasicDetails.RangeStartDTTM = DateTime.MinValue;
                this.bIsLoaded = true;
                if (this.objfrm.ActionCode == ActivityTypes.Amend && (this.objfrm.FormViewerDetails.BasicDetails.IsMCenableRSNFORMOD || (this.objfrm.FormViewerDetails.BasicDetails.IsClearlstAmendedFlds && this.objfrm.FormViewerDetails.BasicDetails.lstAmendedFlds != null && this.objfrm.FormViewerDetails.BasicDetails.lstAmendedFlds.Count > 0 && (this.objfrm.FormViewerDetails.BasicDetails.lstAmendedFlds.Contains("Route"))))) {
                    this.objfrm.IsReasonForModificationVisible = Visibility.Visible;
                    this.objfrm.FormViewerDetails.BasicDetails.IsMandatoryRSNFORMOD = true;
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
                this.objfrm.FormViewerDetails.BasicDetails.IsClearlstAmendList = true;
                this.objfrm.FormViewerDetails.BasicDetails.IsValidateDose = true;
                this.objfrm.FormViewerDetails.BasicDetails.IsDoseMandatory = false;
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
            }
        }
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
    cmdBrand_MouseLeftButtonDown_Func = (s, e) => {
        Object.keys(that).forEach((prop) => (this[prop] = that[prop]));
        this.cmdBrand_MouseLeftButtonDown(s, e);
    }

    lblMedicationClerk_MouseLeftButtonUp(sender: Object, e: MouseButtonEventArgs): void {
        // Revisit required
        if (!String.IsNullOrEmpty(this.objfrm.FormViewerDetails.BasicDetails.OtherComments)) {
            if (this.objfrm.FormViewerDetails.BasicDetails.MedicationClerkingSource != null) {
                for (let i: number = 0; i < this.objfrm.FormViewerDetails.BasicDetails.MedicationClerkingSource.Count; i++) {
                    if (this.objfrm.FormViewerDetails.BasicDetails.MedicationClerkingSource[i].DisplayText == "Other") {
                        if (this.objfrm.FormViewerDetails.BasicDetails.MedicationClerkingSource[i].Tag != null) {
                            if (this.objfrm.FormViewerDetails.BasicDetails.MedicationClerkingSource[i].Tag.ToString() == this.objfrm.FormViewerDetails.BasicDetails.OtherComments) {
                                this.objfrm.FormViewerDetails.BasicDetails.MedicationClerkingSource[i].Tag = this.objfrm.FormViewerDetails.BasicDetails.OtherComments;
                            }
                            else if (this.objfrm.FormViewerDetails.BasicDetails.MedicationClerkingSource[i].Tag.ToString() != this.objfrm.FormViewerDetails.BasicDetails.OtherComments) {
                                this.objfrm.FormViewerDetails.BasicDetails.MedicationClerkingSource[i].Tag = this.objfrm.FormViewerDetails.BasicDetails.MedicationClerkingSource[i].Tag;
                            }

                        }
                    }
                    //added it to check
                    // else {
                    //     return;

                        // }
                    }
                }
            }
            //expected 0 arg 
            //this.oMultiSelectListView = new MultiSelectListView(ValueDomain.MedicationClerking, this.objfrm.FormViewerDetails.BasicDetails.MedicationClerkingSource);
            let dialogWindowHeight = (640/window.devicePixelRatio);//640
            this.oMultiSelectListView = new MultiSelectListView()
            this.oMultiSelectListView.constructorImpl(ValueDomain.MedicationClerking, this.objfrm.FormViewerDetails.BasicDetails.MedicationClerkingSource.ToList());
            // ObjectHelper.stopFinishAndCancelEvent(true);
            AppActivity.OpenWindow("Medication clerking source - LORENZO", this.oMultiSelectListView, (s, e) => { this.oMultiSelectListView_Closed(s); }, "", false, dialogWindowHeight, 450, false, WindowButtonType.OkCancel, null);
            //AppActivity.OpenWindow("Medication clerking source - LORENZO", this.oMultiSelectListView, this.oMultiSelectListView_Closed, "", false, 625, 450, false, WindowButtonType.OkCancel, null);

        }
       
        
        private cmdBrand_MouseLeftButtonDown(sender: Object, e: MouseButtonEventArgs): void {
            this.objfrm.LaunchBrandConstraint();
        }
        private chkPRN_KeyDown(sender: Object, e: KeyEventArgs): void {
            if (e.PlatformKeyCode == 13) {
                this.chkPRN.IsChecked = !this.chkPRN.IsChecked;
            }
        }
        oMultiSelectListView_Closed(args: AppDialogEventargs): void {
            if (args.Content != null)
                this.oMultiSelectListView = ObjectHelper.CreateType<MultiSelectListView>(args.Content.Component, MultiSelectListView);
                if (args.Result == AppDialogResult.Ok && args.Content != null && args.Content.Component != null) {

            // if (args.Result == AppDialogResult.Ok) {
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
    chckClinicalVerify_OnChange_Func = (s, e) => { Object.keys(that).forEach((prop) => (this[prop] = that[prop])); this.chckClinicalVerify_OnChange(s, e) };
    private chckClinicalVerify_OnChange(sender: Object, e: RoutedEventArgs): void {
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
    public txtLowerDose_SelectionChanged(sender: Object, e: RoutedEventArgs): void {
        if (this.objfrm != null && this.objfrm.FormViewerDetails != null && this.objfrm.FormViewerDetails.BasicDetails != null && this.objfrm.FormViewerDetails.BasicDetails.bDoseFromCal)
            this.objfrm.FormViewerDetails.BasicDetails.bDoseChange = true;
    }
}