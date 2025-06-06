import { Component, OnInit, ViewChild } from '@angular/core';
import { StringBuilder,ProfileFactoryType,ContextManager,Convert,AppActivity} from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp,Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison,AppDialogEventargs, AppDialogResult, DelegateArgs, DialogComponentArgs, WindowButtonType, ContentControl, PatientContext, Visibility, CListItem } from 'epma-platform/models';
import { AppDialog, Border, Grid, KeyEventArgs, MouseButtonEventArgs, TextBlock, ToolTipService, UserControl, iButton, iCheckBox, iComboBox, iDateTimePicker, iLabel, iTextBox, iTimeBox, iUpDownBox } from 'epma-platform/controls';
import { HelperService} from 'epma-platform/soapclient';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
import { frmAdminSlotTimes } from './frmadminslottimes';
import { PrescriptionItemVM } from '../viewmodel/PrescriptionItemVM';
import { RoutedEventArgs } from 'src/app/shared/epma-platform/controls/FrameworkElement';
import { CConstants, PrescriptionTypes } from '../utilities/constants';
import { ActivityTypes } from '../model/common';
import { DependencyPropertyChangedEventArgs } from 'src/app/shared/epma-platform/controls/Control';
import { ClerkFormViewDeftBehaviour, ContextInfo } from 'src/app/lorappcommonbb/utilities/globalvariable';
import { Resource } from '../resource';
import { MedicationForm } from '../resource/medicationform.designer';
import { Infusion } from '../resource/infusion.designer';
import { CListItemsDisplay, WrapToolTip } from 'src/app/product/shared/convertor/medicationconverters.service';
import * as ControlStyles from "../../shared/epma-platform/controls/ControlStyles";
import { medipresolvestepped } from './medipresolvestepped';
import { CommonService } from 'src/app/product/shared/common.service';
var that;
@Component({
  selector: 'frmformviewforadminappliance',
  templateUrl: './frmformviewforadminappliance.html',
  styleUrls: ['./frmformviewforadminappliance.css']
})


export class FormViewForAdminAppliance extends UserControl {
    
  private LayoutRoot: Grid;
    Ref: this;
@ViewChild("LayoutRootTempRef", {read:Grid, static: false }) set _LayoutRoot(c: Grid){
if(c){ this.LayoutRoot  = c; }
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
private brdAdminDetails: Border;
@ViewChild("brdAdminDetailsTempRef", {read:Border, static: false }) set _brdAdminDetails(c: Border){
if(c){ this.brdAdminDetails  = c; }
};
private lblAdminDetails: TextBlock;
@ViewChild("lblAdminDetailsTempRef", {read:TextBlock, static: false }) set _lblAdminDetails(c: TextBlock){
if(c){ this.lblAdminDetails  = c; }
};
private adminslotuc: frmAdminSlotTimes;
@ViewChild("adminslotucTempRef", {read:frmAdminSlotTimes, static: false }) set _adminslotuc(c: frmAdminSlotTimes){
if(c){ this.adminslotuc  = c; }
};
private lblStartDate: iLabel;
@ViewChild("lblStartDateTempRef", {read:iLabel, static: false }) set _lblStartDate(c: iLabel){
if(c){ this.lblStartDate  = c; }
};
private dtpStartDate: iDateTimePicker;
@ViewChild("dtpStartDateTempRef", {read:iDateTimePicker, static: false }) set _dtpStartDate(c: iDateTimePicker){
if(c){ this.dtpStartDate  = c; }
};
private iTimeStartDateTime: iTimeBox;
@ViewChild("iTimeStartDateTimeTempRef", {read:iTimeBox, static: false }) set _iTimeStartDateTime(c: iTimeBox){
if(c){ this.iTimeStartDateTime  = c; }
};
private lblReviewafter: iLabel;
@ViewChild("lblReviewafterTempRef", {read:iLabel, static: false }) set _lblReviewafter(c: iLabel){
if(c){ this.lblReviewafter  = c; }
};
private udReviewafter: iUpDownBox;
@ViewChild("udReviewafterTempRef", {read:iUpDownBox, static: false }) set _udReviewafter(c: iUpDownBox){
if(c){ this.udReviewafter  = c; }
};
private cboreviewAfterUOM: iComboBox;
@ViewChild("cboreviewAfterUOMTempRef", {read:iComboBox, static: false }) set _cboreviewAfterUOM(c: iComboBox){
if(c){ this.cboreviewAfterUOM  = c; }
};
private lblReviewAfterDate: iLabel;
@ViewChild("lblReviewAfterDateTempRef", {read:iLabel, static: false }) set _lblReviewAfterDate(c: iLabel){
if(c){ this.lblReviewAfterDate  = c; }
};
private cmdReviewDetails: iButton;
@ViewChild("cmdReviewDetailsTempRef", {read:iButton, static: false }) set _cmdReviewDetails(c: iButton){
if(c){ this.cmdReviewDetails  = c; }
};
private lblReviewComments: iLabel;
@ViewChild("lblReviewCommentsTempRef", {read:iLabel, static: false }) set _lblReviewComments(c: iLabel){
if(c){ this.lblReviewComments  = c; }
};
private txtReviewComments: iTextBox;
@ViewChild("txtReviewCommentsTempRef", {read:iTextBox, static: false }) set _txtReviewComments(c: iTextBox){
if(c){ this.txtReviewComments  = c; }
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
private lblStopDate: iLabel;
@ViewChild("lblStopDateTempRef", {read:iLabel, static: false }) set _lblStopDate(c: iLabel){
if(c){ this.lblStopDate  = c; }
};
private dtpStopDate: iDateTimePicker;
@ViewChild("dtpStopDateTempRef", {read:iDateTimePicker, static: false }) set _dtpStopDate(c: iDateTimePicker){
if(c){ this.dtpStopDate  = c; }
};
private iTimeStopDateTime: iTimeBox;
@ViewChild("iTimeStopDateTimeTempRef", {read:iTimeBox, static: false }) set _iTimeStopDateTime(c: iTimeBox){
if(c){ this.iTimeStopDateTime  = c; }
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
private lblIsOnAdmission: iLabel;
@ViewChild("lblIsOnAdmissionTempRef", {read:iLabel, static: false }) set _lblIsOnAdmission(c: iLabel){
if(c){ this.lblIsOnAdmission  = c; }
};
private chckIsOnAdmission: iCheckBox;
@ViewChild("chckIsOnAdmissionTempRef", {read:iCheckBox, static: false }) set _chckIsOnAdmission(c: iCheckBox){
if(c){ this.chckIsOnAdmission  = c; }
};
private lblStatType: iLabel;
@ViewChild("lblStatTypeTempRef", {read:iLabel, static: false }) set _lblStatType(c: iLabel){
if(c){ this.lblStatType  = c; }
};
private cboStatType: iComboBox;
@ViewChild("cboStatTypeTempRef", {read:iComboBox, static: false }) set _cboStatType(c: iComboBox){
if(c){ this.cboStatType  = c; }
};
private lblPrescribedby: iLabel;
@ViewChild("lblPrescribedbyTempRef", {read:iLabel, static: false }) set _lblPrescribedby(c: iLabel){
if(c){ this.lblPrescribedby  = c; }
};
private txtPrescribedby: iLabel;
@ViewChild("txtPrescribedbyTempRef", {read:iLabel, static: false }) set _txtPrescribedby(c: iLabel){
if(c){ this.txtPrescribedby  = c; }
};
private lblIsClinicallyVerified: iLabel;
@ViewChild("lblIsClinicallyVerifiedTempRef", {read:iLabel, static: false }) set _lblIsClinicallyVerified(c: iLabel){
if(c){ this.lblIsClinicallyVerified  = c; }
};
private chckClinicalVerify: iCheckBox;
@ViewChild("chckClinicalVerifyTempRef", {read:iCheckBox, static: false }) set _chckClinicalVerify(c: iCheckBox){
if(c){ this.chckClinicalVerify  = c; }
};
private lblVerificationComments: iLabel;
@ViewChild("lblVerificationCommentsTempRef", {read:iLabel, static: false }) set _lblVerificationComments(c: iLabel){
if(c){ this.lblVerificationComments  = c; }
};
private txtVerificationComments: iTextBox;
@ViewChild("txtVerificationCommentsTempRef", {read:iTextBox, static: false }) set _txtVerificationComments(c: iTextBox){
if(c){ this.txtVerificationComments  = c; }
};
private lblModClerkReason: iLabel;
@ViewChild("lblModClerkReasonTempRef", {read:iLabel, static: false }) set _lblModClerkReason(c: iLabel){
if(c){ this.lblModClerkReason  = c; }
};
private cboModClerkReason: iComboBox;
@ViewChild("cboModClerkReasonTempRef", {read:iComboBox, static: false }) set _cboModClerkReason(c: iComboBox){
if(c){ this.cboModClerkReason  = c; }
};
private lblRsnForMod: iLabel;
@ViewChild("lblRsnForModTempRef", {read:iLabel, static: false }) set _lblRsnForMod(c: iLabel){
if(c){ this.lblRsnForMod  = c; }
};
private cboRsnForMod: iComboBox;
@ViewChild("cboRsnForModTempRef", {read:iComboBox, static: false }) set _cboRsnForMod(c: iComboBox){
if(c){ this.cboRsnForMod  = c; }
};
private lblModComments: iLabel;
@ViewChild("lblModCommentsTempRef", {read:iLabel, static: false }) set _lblModComments(c: iLabel){
if(c){ this.lblModComments  = c; }
};
private txtModComments: iTextBox;
@ViewChild("txtModCommentsTempRef", {read:iTextBox, static: false }) set _txtModComments(c: iTextBox){
if(c){ this.txtModComments  = c; }
};
private lblAdmin: iLabel;
@ViewChild("lblAdminTempRef", {read:iLabel, static: false }) set _lblAdmin(c: iLabel){
if(c){ this.lblAdmin  = c; }
};
private txtAdminInstruction: iTextBox;
@ViewChild("txtAdminInstructionTempRef", {read:iTextBox, static: false }) set _txtAdminInstruction(c: iTextBox){
if(c){ this.txtAdminInstruction  = c; }
};
private lblPblmInd: iLabel;
@ViewChild("lblPblmIndTempRef", {read:iLabel, static: false }) set _lblPblmInd(c: iLabel){
if(c){ this.lblPblmInd  = c; }
};
private txtProblem: iTextBox;
@ViewChild("txtProblemTempRef", {read:iTextBox, static: false }) set _txtProblem(c: iTextBox){
if(c){ this.txtProblem  = c; }
};
private lblAddComments: iLabel;
@ViewChild("lblAddCommentsTempRef", {read:iLabel, static: false }) set _lblAddComments(c: iLabel){
if(c){ this.lblAddComments  = c; }
};
private txtAddComments: iTextBox;
@ViewChild("txtAddCommentsTempRef", {read:iTextBox, static: false }) set _txtAddComments(c: iTextBox){
if(c){ this.txtAddComments  = c; }
};
private brdAdditionalOptions: Border;
@ViewChild("brdAdditionalOptionsTempRef", {read:Border, static: false }) set _brdAdditionalOptions(c: Border){
if(c){ this.brdAdditionalOptions  = c; }
};
private lblRecordAdminBorder: TextBlock;
@ViewChild("lblRecordAdminBorderTempRef", {read:TextBlock, static: false }) set _lblRecordAdminBorder(c: TextBlock){
if(c){ this.lblRecordAdminBorder  = c; }
};
private lblForAdminMessage1: iLabel;
@ViewChild("lblForAdminMessage1TempRef", {read:iLabel, static: false }) set _lblForAdminMessage1(c: iLabel){
if(c){ this.lblForAdminMessage1  = c; }
};
private chkForAdminOption1: iCheckBox;
@ViewChild("chkForAdminOption1TempRef", {read:iCheckBox, static: false }) set _chkForAdminOption1(c: iCheckBox){
if(c){ this.chkForAdminOption1  = c; }
};
private lblForAdminMessage2: iLabel;
@ViewChild("lblForAdminMessage2TempRef", {read:iLabel, static: false }) set _lblForAdminMessage2(c: iLabel){
if(c){ this.lblForAdminMessage2  = c; }
};
private chkForAdminOption2: iCheckBox;
@ViewChild("chkForAdminOption2TempRef", {read:iCheckBox, static: false }) set _chkForAdminOption2(c: iCheckBox){
if(c){ this.chkForAdminOption2  = c; }
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
    }
};

    resKey = Resource.MedicationForm;
    resKey1 = Resource.Infusion;
    DispInst: CListItemsDisplay;
    CCWrapToolTip: WrapToolTip;
    public bIsLoaded: boolean = false;
    objfrm: PrescriptionItemVM;
    public Styles = ControlStyles;
    public FormLoadAFterviewinit: boolean = false;
    constructor() {
        super();
        that = this;
        this.Ref = this;
        // InitializeComponent();
        this.bIsLoaded = false;

    }
    public maxScrollContentHeight;
    ngAfterViewInit() {
        if (window.screen.height < 1000 && window.devicePixelRatio != 1.25) {
            this.maxScrollContentHeight = window.innerHeight - 185;
        }
        else {
            this.maxScrollContentHeight = CommonService.setDynamicScrollviewerHeight();
            if (this.maxScrollContentHeight) {
                this.maxScrollContentHeight = this.maxScrollContentHeight - 40;
            }
        }
        that = this;
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

    private UserControl_Loaded(sender: Object, e: RoutedEventArgs): void {
        this.objfrm = ObjectHelper.CreateType<PrescriptionItemVM>(this.DataContext, PrescriptionItemVM);
        // if (PatientContext.PrescriptionType == PrescriptionTypes.ForAdministration && this.objfrm != null && this.objfrm.FormViewerDetails != null && this.objfrm.FormViewerDetails.BasicControls != null && this.objfrm.FormViewerDetails.BasicDetails.ManageReviewDetail != null && this.objfrm.FormViewerDetails.BasicDetails.ManageReviewDetail.oReviewAfterDetail != null && this.objfrm.FormViewerDetails.BasicDetails.ManageReviewDetail.oReviewAfterDetail.ReviewType != null && !String.IsNullOrEmpty(this.objfrm.FormViewerDetails.BasicDetails.ManageReviewDetail.oReviewAfterDetail.ReviewType.Code) && this.objfrm.FormViewerDetails.BasicDetails.ManageReviewDetail.oReviewAfterDetail.ReviewType.Code.Equals(CConstants.OmitReview)) {
        if (PatientContext.PrescriptionType == PrescriptionTypes.ForAdministration && this.objfrm != null && this.objfrm.FormViewerDetails != null && this.objfrm.FormViewerDetails.BasicControls != null && this.objfrm.FormViewerDetails.BasicDetails.ManageReviewDetail != null && this.objfrm.FormViewerDetails.BasicDetails.ManageReviewDetail.oReviewAfterDetail != null && this.objfrm.FormViewerDetails.BasicDetails.ManageReviewDetail.oReviewAfterDetail.ReviewType != null && !String.IsNullOrEmpty(this.objfrm.FormViewerDetails.BasicDetails.ManageReviewDetail.oReviewAfterDetail.ReviewType.Code)) {

      this.objfrm.FormViewerDetails.BasicDetails.ReviewAfterMandatory = true;
      }
      if (String.Compare(this.objfrm.FormViewerDetails.BasicDetails.BrandName, "Select brand", StringComparison.InvariantCultureIgnoreCase) == 0) {
          this.objfrm.FormViewerDetails.BasicDetails.IsClearEnabled = false;
      }
      else {
          this.objfrm.FormViewerDetails.BasicDetails.IsClearEnabled = true;
      }
      this.objfrm.FormViewerDetails.BasicDetails.IsRouteVisible = Visibility.Collapsed;
      this.objfrm.FormViewerDetails.BasicDetails.DosageFormVisibility = Visibility.Collapsed;
      this.objfrm.FormViewerDetails.BasicDetails.SiteVisibility = Visibility.Collapsed;
      this.objfrm.FormViewerDetails.BasicDetails.StrengthVisibility = Visibility.Collapsed;
      if (!this.bIsLoaded) {
          this.bIsLoaded = true;
          if (String.Equals(PatientContext.ClerkFormViewDefaultBehavior, ClerkFormViewDeftBehaviour.LaunchFormMandatory)) {
              this.objfrm.FormViewerDetails.BasicDetails.RangeStartDTTM = DateTime.MinValue;
          }
          if (String.Compare(this.objfrm.ItemSubType, CConstants.SUBTYPE, StringComparison.OrdinalIgnoreCase) != 0) {
              let bIsModificationReasonExists: boolean = this.objfrm.FormViewerDetails.BasicDetails.IsModificationReasonExists;
              this.objfrm.IsReasonForModificationVisible = Visibility.Collapsed;
              if (!this.objfrm.IsConflictFaxTabLoaded && !this.objfrm.IsTechValFauxTabLoaded) {
                  this.objfrm.FormViewerDetails.BasicDetails.IsMandatoryRSNFORMOD = false;
              }
              if (bIsModificationReasonExists)
                  this.objfrm.FormViewerDetails.BasicDetails.IsModificationReasonExists = true;
          }
          if (!this.objfrm.IsTechValFauxTabLoaded) {
              this.objfrm.FormViewerDetails.BasicDetails.lstDRCAmendedFlds.Clear();
          }
          this.objfrm.FormViewerDetails.BasicDetails.lstAmendedFlds.Clear();
          this.objfrm.FormViewerDetails.BasicDetails.IsClearlstAmendList = true;
         // this.objfrm.FormViewerDetails.BasicDetails.IsClearlstAmendedFlds = true;

           //88429
           if (this.objfrm.ActionCode == ActivityTypes.Amend && !String.IsNullOrEmpty(this.objfrm.FormViewerDetails.BasicDetails.IsAdminTypeFlag) && this.objfrm.FormViewerDetails.BasicDetails.IsAdminTypeFlag.Equals("F") && this.objfrm.FormViewerDetails.BasicDetails.AdminTimes != null) {
            this.objfrm.FormViewerDetails.BasicDetails.AdminTimes.IsFixedTime = true;
            this.objfrm.FormViewerDetails.BasicDetails.IsAdminTypeFlag = String.Empty;
        }

        this.objfrm.FormViewerDetails.BasicDetails.IsClearlstAmendedFlds = true;
          this.objfrm.FormViewerDetails.BasicDetails.IsValidateDose = true;
          this.objfrm.IsStationoryVisible = Visibility.Collapsed;
          this.objfrm.FormViewerDetails.BasicDetails.OtherAdminiInstVisibility = Visibility.Visible;
          if (String.Compare(ContextInfo.MenuCode, CConstants.ClinicallyVerifyMenuCode, StringComparison.InvariantCultureIgnoreCase) == 0) {
              if (this.objfrm.ActionCode != ActivityTypes.Amend) {
                  this.objfrm.FormViewerDetails.BasicDetails.IsenableRSNFORMOD = this.objfrm.FormViewerDetails.BasicDetails.IsMandatoryRSNFORMOD = true;
                  this.objfrm.IsClinicallyVerifyCommentsMandatory = false;
                  if ((this.objfrm.FormViewerDetails.BasicDetails.IsAuthorise || this.objfrm.FormViewerDetails.BasicDetails.IsFluidAuthorise || this.objfrm.FormViewerDetails.BasicDetails.IsMCIAuthorise) && String.IsNullOrEmpty(this.objfrm.PrescriptionItemStatus) && String.Equals(PatientContext.PrescriptionType, PrescriptionTypes.ForAdministration, StringComparison.OrdinalIgnoreCase) && (PatientContext.ClerkFormViewDefaultBehavior != ClerkFormViewDeftBehaviour.LaunchFormMandatory)) {
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
      }
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
  public chkPRN_KeyDown(sender: Object, e: KeyEventArgs): void {
      if (e.PlatformKeyCode == 13) {
          this.chkPRN.IsChecked = !this.chkPRN.IsChecked;
      }
  }
  private cmdBrand_MouseLeftButtonDown(sender: Object, e: MouseButtonEventArgs): void {
      this.objfrm.LaunchBrandConstraint();
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

    onSelectedValueChanged(e: CListItem) {
        //revisit required temp fix
        if (this.DataContext.FormViewerDetails.BasicDetails.ReviewafterUOM != e) {
            this.DataContext.FormViewerDetails.BasicDetails.ReviewafterUOM = e;
        }
    }
}
