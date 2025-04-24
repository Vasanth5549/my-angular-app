import { Component, OnInit, ViewChild } from '@angular/core';
import { StringBuilder,ProfileFactoryType,ContextManager,Convert,AppActivity} from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp,Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison,AppDialogEventargs, AppDialogResult, DelegateArgs, DialogComponentArgs, WindowButtonType, ContextInfo, PatientContext, Visibility } from 'epma-platform/models';
import { AppDialog, Grid, KeyEventArgs, ToolTipService, UserControl, iCheckBox, iComboBox, iDateTimePicker, iLabel, iTextBox, iTimeBox, iUpDownBox } from 'epma-platform/controls';
import { HelperService} from 'epma-platform/soapclient';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import { CommonBB } from "src/app/lorappcommonbb/utilities/common";
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
import { PrescriptionItemVM } from '../viewmodel/PrescriptionItemVM';
import { DependencyPropertyChangedEventArgs } from 'src/app/shared/epma-platform/controls/Control';
import { RoutedEventArgs } from 'src/app/shared/epma-platform/controls/FrameworkElement';
import { ActivityTypes } from '../model/common';
import { Resource } from '../resource';
import { CConstants, PrescriptionTypes } from '../utilities/constants';
import * as ControlStyles from "../../shared/epma-platform/controls/ControlStyles";
// import { resource } from 'selenium-webdriver/http';
import { frmWeekdays } from './frmweekdays';
var that;

//import { StringComparison} from 'epma-platform/stringextension';
@Component({
    selector: 'FormViewAppliance',
    templateUrl: './frmformviewappliance.html',
   styleUrls: ['./frmformviewappliance.css']
  })
  
    export class FormViewAppliance extends UserControl {

        private LayoutRoot: Grid;
        @ViewChild("LayoutRootTempRef", { read: Grid, static: false }) set _LayoutRoot(c: Grid) {
            if (c) { this.LayoutRoot = c; }
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
        private lblFrequency: iLabel;
        @ViewChild("lblFrequencyTempRef", { read: iLabel, static: false }) set _lblFrequency(c: iLabel) {
            if (c) { this.lblFrequency = c; }
        };
        private cboFrequency: iComboBox;
        @ViewChild("cboFrequencyTempRef", { read: iComboBox, static: false }) set _cboFrequency(c: iComboBox) {
            if (c) { this.cboFrequency = c; }
        };
        private lblIsPRN: iLabel;
        @ViewChild("lblIsPRNTempRef", { read: iLabel, static: false }) set _lblIsPRN(c: iLabel) {
            if (c) { this.lblIsPRN = c; }
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
        private Weekdays: frmWeekdays;
        @ViewChild("WeekdaysTempRef", { read: frmWeekdays, static: false }) set _Weekdays(c: frmWeekdays) {
            if (c) { this.Weekdays = c; }
        };
        private lblStatType: iLabel;
        @ViewChild("lblStatTypeTempRef", { read: iLabel, static: false }) set _lblStatType(c: iLabel) {
            if (c) { this.lblStatType = c; }
        };
        private cboStatType: iComboBox;
        @ViewChild("cboStatTypeTempRef", { read: iComboBox, static: false }) set _cboStatType(c: iComboBox) {
            if (c) { this.cboStatType = c; }
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
        private lblModComments: iLabel;
        @ViewChild("lblModCommentsTempRef", { read: iLabel, static: false }) set _lblModComments(c: iLabel) {
            if (c) { this.lblModComments = c; }
        };
        private txtModComments: iTextBox;
        @ViewChild("txtModCommentsTempRef", { read: iTextBox, static: false }) set _txtModComments(c: iTextBox) {
            if (c) { this.txtModComments = c; }
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
        private cboRsnForMod: iComboBox;
        @ViewChild("cboRsnForModTempRef", { read: iComboBox, static: false }) set _cboRsnForMod(c: iComboBox) {
            if (c) { this.cboRsnForMod = c; }
        };
        private lblVerificationComments: iLabel;
        @ViewChild("lblVerificationCommentsTempRef", { read: iLabel, static: false }) set _lblVerificationComments(c: iLabel) {
            if (c) { this.lblVerificationComments = c; }
        };
        private txtVerificationComments: iTextBox;
        @ViewChild("txtVerificationCommentsTempRef", { read: iTextBox, static: false }) set _txtVerificationComments(c: iTextBox) {
            if (c) { this.txtVerificationComments = c; }
        };
        private lblisnewmeds: iLabel;
        @ViewChild("lblisnewmedsTempRef", { read: iLabel, static: false }) set _lblisnewmeds(c: iLabel) {
            if (c) { this.lblisnewmeds = c; }
        };
        private chcknewmeds: iCheckBox;
        @ViewChild("chcknewmedsTempRef", { read: iCheckBox, static: false }) set _chcknewmeds(c: iCheckBox) {
            if (c) { this.chcknewmeds = c; }
        };
        private lblAddComments: iLabel;
        @ViewChild("lblAddCommentsTempRef", { read: iLabel, static: false }) set _lblAddComments(c: iLabel) {
            if (c) { this.lblAddComments = c; }
        };
        private txtAddComments: iTextBox;
        @ViewChild("txtAddCommentsTempRef", { read: iTextBox, static: false }) set _txtAddComments(c: iTextBox) {
            if (c) { this.txtAddComments = c; }
        };
        private lblPblmInd: iLabel;
        @ViewChild("lblPblmIndTempRef", { read: iLabel, static: false }) set _lblPblmInd(c: iLabel) {
            if (c) { this.lblPblmInd = c; }
        };
        private txtProblem: iTextBox;
        @ViewChild("txtProblemTempRef", { read: iTextBox, static: false }) set _txtProblem(c: iTextBox) {
            if (c) { this.txtProblem = c; }
        };
        private lblIsClinicallyVerified: iLabel;
        @ViewChild("lblIsClinicallyVerifiedTempRef", { read: iLabel, static: false }) set _lblIsClinicallyVerified(c: iLabel) {
            if (c) { this.lblIsClinicallyVerified = c; }
        };
        private chckClinicalVerify: iCheckBox;
        @ViewChild("chckClinicalVerifyTempRef", { read: iCheckBox, static: false }) set _chckClinicalVerify(c: iCheckBox) {
            if (c) { this.chckClinicalVerify = c; }
        };
        private lblPrescribedby: iLabel;
        @ViewChild("lblPrescribedbyTempRef", { read: iLabel, static: false }) set _lblPrescribedby(c: iLabel) {
            if (c) { this.lblPrescribedby = c; }
        };
        private txtPrescribedby: iLabel;
        @ViewChild("txtPrescribedbyTempRef", { read: iLabel, static: false }) set _txtPrescribedby(c: iLabel) {
            if (c) { this.txtPrescribedby = c; }
        };

        public resKey = Resource.MedicationForm;
        public Styles = ControlStyles;

        objfrm: PrescriptionItemVM;
        bIsLoaded: boolean = false;
        constructor() {
            super();
            that = this;
           // InitializeComponent();
        }
        ngAfterViewInit(): void {        
            that=this;     
            this.dtpStartDate.IsConstrainEntry = true;

            this.UserControl_Loaded({},null); 
            super.AfterViewInit();
            this.objfrm.FormViewerDetails.BasicDetails.IsCheckQuantityValidation = true;
            //this.oMedTitratedDoseChild.constructorImpl(this.oTitratedDoseCommonVM); 
            this.objfrm.FormViewerDetails.BasicDetails.PrnInstructionLoaded.subscribe(data => {
                this.cboPRNInstruction.ClearValue();
            });      
        }
        ftbFormViewDetails_SelectionChanged_Func = (s, e) => {
            Object.keys(that).forEach((prop) => (this[prop] = that[prop]));
            this.uomSelChange();  
        };
        uomSelChange(){
            if(this.DataContext.FormViewerDetails.BasicDetails.DurationUOM.Value=="CC_DOSES"){
                  setTimeout(() => {
                    this.iTimeStopDateTime.setZero();}, 10);
            }
        }
        private UserControl_Loaded(sender: Object, e: RoutedEventArgs): void {
            this.objfrm = ObjectHelper.CreateType<PrescriptionItemVM>(this.DataContext, PrescriptionItemVM);
            this.objfrm.FormViewerDetails.BasicDetails.ISvisibletreatmentcontinue = Visibility.Visible;
            this.objfrm.FormViewerDetails.BasicDetails.IsRouteVisible = Visibility.Collapsed;
            this.objfrm.FormViewerDetails.BasicDetails.DosageFormVisibility = Visibility.Collapsed;
            this.objfrm.FormViewerDetails.BasicDetails.SiteVisibility = Visibility.Collapsed;
            this.objfrm.FormViewerDetails.BasicDetails.StrengthVisibility = Visibility.Collapsed;
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
                    if (!this.objfrm.IsConflictFaxTabLoaded && !this.objfrm.IsTechValFauxTabLoaded) {
                        this.objfrm.FormViewerDetails.BasicDetails.IsMandatoryRSNFORMOD = false;
                    }
                    if (bIsModificationReasonExists)
                        this.objfrm.FormViewerDetails.BasicDetails.IsModificationReasonExists = true;
                    this.objfrm.FormViewerDetails.BasicDetails.IsClearlstAmendedFlds = true;
                    if (!this.objfrm.IsTechValFauxTabLoaded) {
                        this.objfrm.FormViewerDetails.BasicDetails.lstAmendedFlds.Clear();
                    }
                    this.objfrm.FormViewerDetails.BasicDetails.IsMandatoryReasonForMedClerkModify = false;
                    this.objfrm.FormViewerDetails.BasicDetails.IsMandatoryFrequency = true;
                    this.objfrm.FormViewerDetails.BasicDetails.IsenableFrequency = true;
                }
                else this.objfrm.FormViewerDetails.BasicDetails.lstAmendedFlds.Clear();
                this.objfrm.FormViewerDetails.BasicDetails.IsValidateDose = true;
                this.objfrm.FormViewerDetails.BasicDetails.IsenableMultiRoute = false;
                this.objfrm.FormViewerDetails.BasicDetails.IsClearlstAmendList = true;
                if (this.objfrm.FormViewerDetails.BasicDetails.StartDTTM != DateTime.MinValue) {
                    this.objfrm.FormViewerDetails.BasicDetails.StartDTTM = this.objfrm.FormViewerDetails.BasicDetails.StartDTTM;
                }
                else {
                    this.objfrm.FormViewerDetails.BasicDetails.StartDTTM = Convert.ToDateTime(CommonBB.GetServerDateTime().ToString(CConstants.LongDateFormat));
                }
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
                        this.chckClinicalVerify.IsEnabled = false;
                    }
                }
            }
            if ((String.Compare(PatientContext.PrescriptionType, PrescriptionTypes.Discharge, StringComparison.OrdinalIgnoreCase) != 0)) {
                this.objfrm.FormViewerDetails.BasicDetails.IsVisiblenewmeds = Visibility.Collapsed;
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
        qtyTextChangeEvent(e){
            this.objfrm.FormViewerDetails.BasicDetails.QuantityMessageBoxValidation();
        }
        public chkPRN_KeyDown_Func(sender: Object, e: KeyEventArgs): void {
            if (e.PlatformKeyCode == 13) {
                this.chkPRN.IsChecked = !this.chkPRN.IsChecked;
            }
        }
        private chckisnewmeds_OnChange(sender: Object, e: RoutedEventArgs): void {
            if (this.objfrm != null && this.objfrm.ParentbaseVM != null)
                this.objfrm.ParentbaseVM.isReconcileserreq = true;
            if (this.objfrm != null)
                this.objfrm.isnewmedschecked = true;
        }
        chckClinicalVerify_OnChange_Func=(s,e)=>{Object.keys(that).forEach((prop) => (this[prop] = that[prop]));this.chckClinicalVerify_OnChange(s,e)};
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
                            this.chckClinicalVerify.IsEnabled = this.objfrm.IsClinicallyVerifyEnable = false;
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
