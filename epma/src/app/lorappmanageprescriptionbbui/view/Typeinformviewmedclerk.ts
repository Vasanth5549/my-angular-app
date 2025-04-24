import { Component, OnInit, ViewChild } from '@angular/core';
import { StringBuilder, ProfileFactoryType, ContextManager, Convert, AppActivity } from 'epma-platform/services';
import {
    Level, ProfileContext, OnProfileResult, IProfileProp, Byte, Decimal, decimal, Double, Float, Int64, long, Long,
    AppDialogEventargs, AppDialogResult, DelegateArgs, DialogComponentArgs, WindowButtonType,
    ChildWindow, ContentControl, Visibility, StringComparison, SelectionChangedEventArgs
} from 'epma-platform/models';
import {
    AppDialog, UserControl, ScrollViewer, Grid, iLabel, iTextBox, iComboBox, iCheckBox, iButton, iRadioButton, iDateTimePicker,
    iUpDownBox, Border, ToolTipService, MouseButtonEventArgs, KeyEventArgs
}
    from 'epma-platform/controls';
import { HelperService } from 'epma-platform/soapclient';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
//import { PrescriptionItemVM } from '../viewmodel/PrescriptionItemVM';
import { PrescriptionItemVM } from '../../lorappmanageprescriptionbbui/viewmodel/PrescriptionItemVM';
import { MultiSelectListView } from '../../lorappmanageprescriptionbbui/view/MultiSelectListView';
//import { frmWeekdays } from './frmweekdays';
import { DependencyPropertyChangedEventArgs, RoutedEventArgs } from "src/app/shared/epma-platform/controls/Control";
import { ContextInfo } from 'src/app/lorappcommonbb/utilities/globalvariable';
//import { CConstants,ValueDomain } from "../utilities/constants";
import { CConstants, ValueDomain } from "../../lorappmanageprescriptionbbui/utilities/constants";
//import { ActivityTypes } from "../model/common";
//import {MultiSelectListVM} from '../viewmodel/MultiSelectListVM';
import * as ControlStyles from "../../shared/epma-platform/controls/ControlStyles";
import { Resource } from 'src/app/lorappmanageprescriptionbbui/resource';
import { frmWeekdays } from 'src/app/lorappmanageprescriptionbbui/view/frmweekdays';
import { ActivityTypes } from 'src/app/lorappmanageprescriptionbbui/model/common';
import { MultiSelectListVM } from 'src/app/lorappmanageprescriptionbbui/viewmodel/MultiSelectListVM';
import { medipresolvestepped } from './medipresolvestepped';
import { medConditionalDose } from './medconditionaldose';
import { CommonService } from 'src/app/product/shared/common.service';

var that;
@Component({
    selector: 'Typeinformviewmedclerk',
    templateUrl: './Typeinformviewmedclerk.html',
    styleUrls: ['./Typeinformviewmedclerk.css']
})
export class Typeinformviewmedclerk extends UserControl {
    bIsLoaded: boolean = false;
    objfrm: PrescriptionItemVM;
    oMultiSelectListView: MultiSelectListView;
    ochildwindow: ChildWindow;

    public resKey = Resource.MedicationForm;
    public svwFormViewer: ScrollViewer;

    public Styles = ControlStyles;
    cboDosageForm_SelectionChanged_Func: Function;
    cboFrequency_LostFocus_func: Function;
    cboRsnForMod_IsEnabledChanged_Func: Function;
    Ref: this;
    @ViewChild("svwFormViewerTempRef", { read: ScrollViewer, static: false }) set _svwFormViewer(c: ScrollViewer) {
        if (c) { this.svwFormViewer = c; }
    };
    public LayoutRoot: Grid;
    @ViewChild("LayoutRootTempRef", { read: Grid, static: false }) set _LayoutRoot(c: Grid) {
        if (c) { this.LayoutRoot = c; }
    };
    public lblNonCatName: iLabel;
    @ViewChild("lblNonCatNameTempRef", { read: iLabel, static: false }) set _lblNonCatName(c: iLabel) {
        if (c) { this.lblNonCatName = c; }
    };
    public txtNonCatItem: iTextBox;
    @ViewChild("txtNonCatItemTempRef", { read: iTextBox, static: false }) set _txtNonCatItem(c: iTextBox) {
        if (c) { this.txtNonCatItem = c; }
    };
    public lblNonCatReason: iLabel;
    @ViewChild("lblNonCatReasonTempRef", { read: iLabel, static: false }) set _lblNonCatReason(c: iLabel) {
        if (c) { this.lblNonCatReason = c; }
    };
    public cboNONCATReason: iComboBox;
    @ViewChild("cboNONCATReasonTempRef", { read: iComboBox, static: false }) set _cboNONCATReason(c: iComboBox) {
        if (c) { this.cboNONCATReason = c; }
    };
    public lblSrcOther: iLabel;
    @ViewChild("lblSrcOtherTempRef", { read: iLabel, static: false }) set _lblSrcOther(c: iLabel) {
        if (c) { this.lblSrcOther = c; }
    };
    public txtOtherNonCatReason: iTextBox;
    @ViewChild("txtOtherNonCatReasonTempRef", { read: iTextBox, static: false }) set _txtOtherNonCatReason(c: iTextBox) {
        if (c) { this.txtOtherNonCatReason = c; }
    };
    public lblRoute: iLabel;
    @ViewChild("lblRouteTempRef", { read: iLabel, static: false }) set _lblRoute(c: iLabel) {
        if (c) { this.lblRoute = c; }
    };
    public cboRoute: iComboBox;
    @ViewChild("cboRouteTempRef", { read: iComboBox, static: false }) set _cboRoute(c: iComboBox) {
        if (c) { this.cboRoute = c; }
    };
    public lblDosageForm: iLabel;
    @ViewChild("lblDosageFormTempRef", { read: iLabel, static: false }) set _lblDosageForm(c: iLabel) {
        if (c) { this.lblDosageForm = c; }
    };
    public cboDosageForm: iComboBox;
    @ViewChild("cboDosageFormTempRef", { read: iComboBox, static: false }) set _cboDosageForm(c: iComboBox) {
        if (c) { this.cboDosageForm = c; }
    };
    public lblDoseType: iLabel;
    @ViewChild("lblDoseTypeTempRef", { read: iLabel, static: false }) set _lblDoseType(c: iLabel) {
        if (c) { this.lblDoseType = c; }
    };
    public cboDoseType: iComboBox;
    @ViewChild("cboDoseTypeTempRef", { read: iComboBox, static: false }) set _cboDoseType(c: iComboBox) {
        if (c) { this.cboDoseType = c; }
    };
    public lblDose: iLabel;
    @ViewChild("lblDoseTempRef", { read: iLabel, static: false }) set _lblDose(c: iLabel) {
        if (c) { this.lblDose = c; }
    };
    public DoseLayoutRoot: Grid;
    @ViewChild("DoseLayoutRootTempRef", { read: Grid, static: false }) set _DoseLayoutRoot(c: Grid) {
        if (c) { this.DoseLayoutRoot = c; }
    };
    public txtLowerDose: iTextBox;
    @ViewChild("txtLowerDoseTempRef", { read: iTextBox, static: false }) set _txtLowerDose(c: iTextBox) {
        if (c) { this.txtLowerDose = c; }
    };
    public lblHifen: iLabel;
    @ViewChild("lblHifenTempRef", { read: iLabel, static: false }) set _lblHifen(c: iLabel) {
        if (c) { this.lblHifen = c; }
    };
    public txtUpperDose: iTextBox;
    @ViewChild("txtUpperDoseTempRef", { read: iTextBox, static: false }) set _txtUpperDose(c: iTextBox) {
        if (c) { this.txtUpperDose = c; }
    };
    public lblUOM: iLabel;
    @ViewChild("lblUOMTempRef", { read: iLabel, static: false }) set _lblUOM(c: iLabel) {
        if (c) { this.lblUOM = c; }
    };
    public cboUOM: iComboBox;
    @ViewChild("cboUOMTempRef", { read: iComboBox, static: false }) set _cboUOM(c: iComboBox) {
        if (c) { this.cboUOM = c; }
    };
    public lblStrength: iLabel;
    @ViewChild("lblStrengthTempRef", { read: iLabel, static: false }) set _lblStrength(c: iLabel) {
        if (c) { this.lblStrength = c; }
    };
    public cboStrength: iComboBox;
    @ViewChild("cboStrengthTempRef", { read: iComboBox, static: false }) set _cboStrength(c: iComboBox) {
        if (c) { this.cboStrength = c; }
    };
    public lblSite: iLabel;
    @ViewChild("lblSiteTempRef", { read: iLabel, static: false }) set _lblSite(c: iLabel) {
        if (c) { this.lblSite = c; }
    };
    public cboSite: iComboBox;
    @ViewChild("cboSiteTempRef", { read: iComboBox, static: false }) set _cboSite(c: iComboBox) {
        if (c) { this.cboSite = c; }
    };
    public lblFrequency: iLabel;
    @ViewChild("lblFrequencyTempRef", { read: iLabel, static: false }) set _lblFrequency(c: iLabel) {
        if (c) { this.lblFrequency = c; }
    };
    public cboFrequency: iComboBox;
    @ViewChild("cboFrequencyTempRef", { read: iComboBox, static: false }) set _cboFrequency(c: iComboBox) {
        if (c) { this.cboFrequency = c; }
    };
    public lblIsPRN: iLabel;
    @ViewChild("lblIsPRNTempRef", { read: iLabel, static: false }) set _lblIsPRN(c: iLabel) {
        if (c) { this.lblIsPRN = c; }
    };
    public chkPRN: iCheckBox;
    @ViewChild("chkPRNTempRef", { read: iCheckBox, static: false }) set _chkPRN(c: iCheckBox) {
        if (c) { this.chkPRN = c; }
    };
    public lblPRNInstruction: iLabel;
    @ViewChild("lblPRNInstructionTempRef", { read: iLabel, static: false }) set _lblPRNInstruction(c: iLabel) {
        if (c) { this.lblPRNInstruction = c; }
    };
    public cboPRNInstruction: iComboBox;
    @ViewChild("cboPRNInstructionTempRef", { read: iComboBox, static: false }) set _cboPRNInstruction(c: iComboBox) {
        if (c) { this.cboPRNInstruction = c; }
    };
    public lblBrand: iLabel;
    @ViewChild("lblBrandTempRef", { read: iLabel, static: false }) set _lblBrand(c: iLabel) {
        if (c) { this.lblBrand = c; }
    };
    public BrandLayout: Grid;
    @ViewChild("BrandLayoutTempRef", { read: Grid, static: false }) set _BrandLayout(c: Grid) {
        if (c) { this.BrandLayout = c; }
    };
    public cmdBrand: iLabel;
    @ViewChild("cmdBrandTempRef", { read: iLabel, static: false }) set _cmdBrand(c: iLabel) {
        if (c) { this.cmdBrand = c; }
    };
    public cmdClear: iButton;
    @ViewChild("cmdClearTempRef", { read: iButton, static: false }) set _cmdClear(c: iButton) {
        if (c) { this.cmdClear = c; }
    };
    public lblRsnForMod: iLabel;
    @ViewChild("lblRsnForModTempRef", { read: iLabel, static: false }) set _lblRsnForMod(c: iLabel) {
        if (c) { this.lblRsnForMod = c; }
    };
    public cboRsnForMod: iComboBox;
    @ViewChild("cboRsnForModTempRef", { read: iComboBox, static: false }) set _cboRsnForMod(c: iComboBox) {
        if (c) { this.cboRsnForMod = c; }
    };
    public lblIsClinicallyVerified: iLabel;
    @ViewChild("lblIsClinicallyVerifiedTempRef", { read: iLabel, static: false }) set _lblIsClinicallyVerified(c: iLabel) {
        if (c) { this.lblIsClinicallyVerified = c; }
    };
    public chckClinicalVerify: iCheckBox;
    @ViewChild("chckClinicalVerifyTempRef", { read: iCheckBox, static: false }) set _chckClinicalVerify(c: iCheckBox) {
        if (c) { this.chckClinicalVerify = c; }
    };
    public lblPrescribedby: iLabel;
    @ViewChild("lblPrescribedbyTempRef", { read: iLabel, static: false }) set _lblPrescribedby(c: iLabel) {
        if (c) { this.lblPrescribedby = c; }
    };
    public txtPrescribedby: iLabel;
    @ViewChild("txtPrescribedbyTempRef", { read: iLabel, static: false }) set _txtPrescribedby(c: iLabel) {
        if (c) { this.txtPrescribedby = c; }
    };
    public Weekdays: frmWeekdays;
    @ViewChild("WeekdaysTempRef", { read: frmWeekdays, static: false }) set _Weekdays(c: frmWeekdays) {
        if (c) { this.Weekdays = c; }
    };
    public lblAdditionalComments: iLabel;
    @ViewChild("lblAdditionalCommentsTempRef", { read: iLabel, static: false }) set _lblAdditionalComments(c: iLabel) {
        if (c) { this.lblAdditionalComments = c; }
    };
    public txtAddComments: iTextBox;
    @ViewChild("txtAddCommentsTempRef", { read: iTextBox, static: false }) set _txtAddComments(c: iTextBox) {
        if (c) { this.txtAddComments = c; }
    };
    public lblPblmInd: iLabel;
    @ViewChild("lblPblmIndTempRef", { read: iLabel, static: false }) set _lblPblmInd(c: iLabel) {
        if (c) { this.lblPblmInd = c; }
    };
    public txtProblem: iTextBox;
    @ViewChild("txtProblemTempRef", { read: iTextBox, static: false }) set _txtProblem(c: iTextBox) {
        if (c) { this.txtProblem = c; }
    };
    public lblDateCommenced: iLabel;
    @ViewChild("lblDateCommencedTempRef", { read: iLabel, static: false }) set _lblDateCommenced(c: iLabel) {
        if (c) { this.lblDateCommenced = c; }
    };
    public optCompletedate: iRadioButton;
    @ViewChild("optCompletedateTempRef", { read: iRadioButton, static: false }) set _optCompletedate(c: iRadioButton) {
        if (c) { this.optCompletedate = c; }
    };
    public optPartialdate: iRadioButton;
    @ViewChild("optPartialdateTempRef", { read: iRadioButton, static: false }) set _optPartialdate(c: iRadioButton) {
        if (c) { this.optPartialdate = c; }
    };
    public lblStartDate: iLabel;
    @ViewChild("lblStartDateTempRef", { read: iLabel, static: false }) set _lblStartDate(c: iLabel) {
        if (c) { this.lblStartDate = c; }
    };
    public dtpStartDate: iDateTimePicker;
    @ViewChild("dtpStartDateTempRef", { read: iDateTimePicker, static: false }) set _dtpStartDate(c: iDateTimePicker) {
        if (c) { this.dtpStartDate = c; }
    };
    public lblMonth: iLabel;
    @ViewChild("lblMonthTempRef", { read: iLabel, static: false }) set _lblMonth(c: iLabel) {
        if (c) { this.lblMonth = c; }
    };
    public cboMonth: iComboBox;
    @ViewChild("cboMonthTempRef", { read: iComboBox, static: false }) set _cboMonth(c: iComboBox) {
        if (c) { this.cboMonth = c; }
    };
    public udYear: iUpDownBox;
    @ViewChild("udYearTempRef", { read: iUpDownBox, static: false }) set _udYear(c: iUpDownBox) {
        if (c) { this.udYear = c; }
    };
    public lblQuantity: iLabel;
    @ViewChild("lblQuantityTempRef", { read: iLabel, static: false }) set _lblQuantity(c: iLabel) {
        if (c) { this.lblQuantity = c; }
    };
    public txtQuantity: iTextBox;
    @ViewChild("txtQuantityTempRef", { read: iTextBox, static: false }) set _txtQuantity(c: iTextBox) {
        if (c) { this.txtQuantity = c; }
    };
    public cboQuantity: iComboBox;
    @ViewChild("cboQuantityTempRef", { read: iComboBox, static: false }) set _cboQuantity(c: iComboBox) {
        if (c) { this.cboQuantity = c; }
    };
    public lblDuration: iLabel;
    @ViewChild("lblDurationTempRef", { read: iLabel, static: false }) set _lblDuration(c: iLabel) {
        if (c) { this.lblDuration = c; }
    };
    public udDuration: iUpDownBox;
    @ViewChild("udDurationTempRef", { read: iUpDownBox, static: false }) set _udDuration(c: iUpDownBox) {
        if (c) { this.udDuration = c; }
    };
    public cboDuration: iComboBox;
    @ViewChild("cboDurationTempRef", { read: iComboBox, static: false }) set _cboDuration(c: iComboBox) {
        if (c) { this.cboDuration = c; }
    };
    public lblMedicationClerk: iLabel;
    @ViewChild("lblMedicationClerkTempRef", { read: iLabel, static: false }) set _lblMedicationClerk(c: iLabel) {
        if (c) { this.lblMedicationClerk = c; }
    };
    public lblMedicationClerking: iLabel;
    @ViewChild("lblMedicationClerkingTempRef", { read: iLabel, static: false }) set _lblMedicationClerking(c: iLabel) {
        if (c) { this.lblMedicationClerking = c; }
    };
    public lblModComments: iLabel;
    @ViewChild("lblModCommentsTempRef", { read: iLabel, static: false }) set _lblModComments(c: iLabel) {
        if (c) { this.lblModComments = c; }
    };
    public txtModComments: iTextBox;
    @ViewChild("txtModCommentsTempRef", { read: iTextBox, static: false }) set _txtModComments(c: iTextBox) {
        if (c) { this.txtModComments = c; }
    };
    public lblVerificationComments: iLabel;
    @ViewChild("lblVerificationCommentsTempRef", { read: iLabel, static: false }) set _lblVerificationComments(c: iLabel) {
        if (c) { this.lblVerificationComments = c; }
    };
    public txtVerificationComments: iTextBox;
    @ViewChild("txtVerificationCommentsTempRef", { read: iTextBox, static: false }) set _txtVerificationComments(c: iTextBox) {
        if (c) { this.txtVerificationComments = c; }
    };
    public brdSTA: Border;
    @ViewChild("brdSTATempRef", { read: Border, static: false }) set _brdSTA(c: Border) {
        if (c) { this.brdSTA = c; }
    };
    public lblBorder: iLabel;
    @ViewChild("lblBorderTempRef", { read: iLabel, static: false }) set _lblBorder(c: iLabel) {
        if (c) { this.lblBorder = c; }
    };
    public ContentCtrlMedResolveStepped: ContentControl = new ContentControl();
    public _contentLoaded: Boolean;
    @ViewChild("_contentLoadedTempRef", { read: Boolean, static: false }) set __contentLoaded(c: Boolean) {
        if (c) { this._contentLoaded = c; }
    };

    //};
    public MedIPResolveStepped: medipresolvestepped;
    @ViewChild("MedIPResolveSteppedTempRef", {read:medipresolvestepped, static: false }) set _MedIPResolveStepped(c: medipresolvestepped){
        if(c)
        {             
            this.MedIPResolveStepped  = c; 
            this.MedIPResolveStepped.ParentRef = this;
            if(this.ContentCtrlMedResolveStepped.Content.MedIpResolveSteppedLoadedFunc)
                this.ContentCtrlMedResolveStepped.Content.MedIpResolveSteppedLoadedFunc(c);
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
    
    constructor() {
        super();
        this.Ref = this;
    }
    public maxScrollContentHeight;
    ngAfterViewInit(): void {
        if (window.screen.height < 1000 && window.devicePixelRatio != 1.25) {
            this.maxScrollContentHeight = window.innerHeight - 188;
        }
        else {
            this.maxScrollContentHeight = CommonService.setDynamicScrollviewerHeight();
            if (this.maxScrollContentHeight) {
                this.maxScrollContentHeight = this.maxScrollContentHeight - 50;
            }
        }
        that=this;  
        this.dtpStartDate.IsConstrainEntry = true;
        this.UserControl_Loaded({}, null);
        this.cboDosageForm_SelectionChanged_Func = (s, e) => { this.cboDosageForm_SelectionChanged(s, e); };
        this.cboFrequency_LostFocus_func = (s, e) => { this.cboFrequency_LostFocus(s, e); }
        this.cboRsnForMod_IsEnabledChanged_Func = (s,e) => {this.cboRsnForMod_IsEnabledChanged(s,e);};
        this.objfrm.FormViewerDetails.BasicDetails.PrnInstructionLoaded.subscribe(data => {
            this.cboPRNInstruction.ClearValue();
        });
        super.AfterViewInit();
    }

    private UserControl_Loaded(sender: Object, e: RoutedEventArgs): void {
        this.objfrm = ObjectHelper.CreateType<PrescriptionItemVM>(this.DataContext, PrescriptionItemVM);
        if (String.Compare(this.objfrm.FormViewerDetails.BasicDetails.BrandName, "Select brand", StringComparison.InvariantCultureIgnoreCase) == 0) {
            this.objfrm.FormViewerDetails.BasicDetails.IsClearEnabled = false;
        }
        else {
            this.objfrm.FormViewerDetails.BasicDetails.IsClearEnabled = true;
        }
        if (!this.bIsLoaded) {
            let bIsModificationReasonExists: boolean = this.objfrm.FormViewerDetails.BasicDetails.IsModificationReasonExists;
            this.bIsLoaded = true;
            this.objfrm.IsReasonForModificationVisible = Visibility.Collapsed;
            this.objfrm.FormViewerDetails.BasicDetails.RangeStartDTTM = DateTime.MinValue;
            if (!this.objfrm.IsConflictFaxTabLoaded) {
                this.objfrm.FormViewerDetails.BasicDetails.IsMandatoryRSNFORMOD = false;
            }
            this.objfrm.FormViewerDetails.BasicDetails.lstAmendedFlds.Clear();
            this.objfrm.FormViewerDetails.BasicDetails.lstDRCAmendedFlds.Clear();
            this.objfrm.FormViewerDetails.BasicDetails.IsClearlstAmendList = true;
            this.objfrm.FormViewerDetails.BasicDetails.IsValidateDose = true;
            this.objfrm.FormViewerDetails.BasicDetails.IsClearlstAmendedFlds = true;
            if (bIsModificationReasonExists)
                this.objfrm.FormViewerDetails.BasicDetails.IsModificationReasonExists = true;
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
        this.objfrm.FormViewerDetails.BasicDetails.IsSiteEnabled = true;
    }
    lblMedicationClerk_MouseLeftButtonUp(sender: Object, e: MouseButtonEventArgs): void {
        this.oMultiSelectListView = new MultiSelectListView();
        this.oMultiSelectListView.constructorImpl(ValueDomain.MedicationClerking, this.objfrm.FormViewerDetails.BasicDetails.MedicationClerkingSource.ToList());
        AppActivity.OpenWindow("Med Typein Medclerk - LORENZO", this.oMultiSelectListView, (s, e) => { this.oMultiSelectListView_Closed(s); }, "", false, 625, 450, false, WindowButtonType.OkCancel, null);

        
    }
    chkPRN_KeyDown(sender: Object, e: KeyEventArgs): void {
        if (e.PlatformKeyCode == 13) {
            this.chkPRN.IsChecked = !this.chkPRN.IsChecked;
        }
    }
    oMultiSelectListView_Closed(args: AppDialogEventargs): void {
        this.ochildwindow = args.AppChildWindow;
        if (args.Content != null)
            this.oMultiSelectListView = ObjectHelper.CreateType<MultiSelectListView>(args.Content.Component, MultiSelectListView);
        if (args.Result == AppDialogResult.Ok && args.Content != null && args.Content.Component != null) {
            if (this.oMultiSelectListView.okButtonClick() && this.oMultiSelectListView instanceof MultiSelectListView) {
                let oMultiSelectVM: MultiSelectListVM = ObjectHelper.CreateType<MultiSelectListVM>(this.oMultiSelectListView.DataContext, MultiSelectListVM);
                if (oMultiSelectVM instanceof MultiSelectListVM)
                    this.objfrm.FormViewerDetails.BasicDetails.MedicationClerkingSource = oMultiSelectVM.ValueDomainCollection;
            }
        }
        else {
            this.oMultiSelectListView.CancelButtonClick();
            
        }
    }
    
    cmdBrand_MouseLeftButtonDown_Func = (s, e) => { 
        Object.keys(that).forEach((prop) => (this[prop] = that[prop]));
        this.cmdBrand_MouseLeftButtonDown(s, e); }
    
    private cmdBrand_MouseLeftButtonDown(sender: Object, e: MouseButtonEventArgs): void {
        this.objfrm.LaunchBrandConstraint();
    }
    chckClinicalVerify_OnChange_Func=(s,e)=>{   Object.keys(that).forEach((prop) => (this[prop] = that[prop]));this.chckClinicalVerify_OnChange(s,e)}
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
    private ClearAllFields(): void {
        this.cboQuantity.Text = String.Empty;
        this.txtQuantity.Text = String.Empty;
        this.udDuration.Value = 0;
        this.cboFrequency.Text = String.Empty;
        this.chkPRN.IsChecked = false;
        this.txtAddComments.Text = String.Empty;
        this.txtProblem.Text = String.Empty;
        this.cboRsnForMod.Text = String.Empty;
        this.txtModComments.Text = String.Empty;
        this.txtLowerDose.Text = String.Empty;
        this.txtUpperDose.Text = String.Empty;
        this.cboUOM.Text = String.Empty;
        this.cboDuration.Text = String.Empty;
    }
    
    
    
    private cboDosageForm_SelectionChanged(sender: Object, e: SelectionChangedEventArgs): void {
       if (this.objfrm != null && this.objfrm.ActionCode == ActivityTypes.Amend) {
            this.ClearAllFields();
            this.cboRoute.Text = String.Empty;
        }
    }
    private cboFrequency_LostFocus(sender: Object, e: RoutedEventArgs): void {
        let sSelText: string = this.cboFrequency.text;
        if (!String.IsNullOrEmpty(sSelText)) {
            if (this.objfrm.FormViewerDetails.BasicDetails.Frequency == null)
                this.cboFrequency.Text = String.Empty;
            else if (String.Compare(this.objfrm.FormViewerDetails.BasicDetails.Frequency.DisplayText, sSelText) != 0)
                this.cboFrequency.Text = String.Empty;
        }
    }
    txtLowerDose_SelectionChanged_Func= (s, e) => {
        this.txtLowerDose_SelectionChanged(s, e);
    }
    private txtLowerDose_SelectionChanged(sender: Object, e: RoutedEventArgs): void {
        if (this.objfrm != null && this.objfrm.FormViewerDetails != null && this.objfrm.FormViewerDetails.BasicDetails != null && this.objfrm.FormViewerDetails.BasicDetails.bDoseFromCal)
            this.objfrm.FormViewerDetails.BasicDetails.bDoseChange = true;
    }
}
