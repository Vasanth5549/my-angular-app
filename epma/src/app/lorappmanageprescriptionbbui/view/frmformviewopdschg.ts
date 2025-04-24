import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { StringBuilder, ProfileFactoryType, ContextManager, Convert, AppActivity } from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp, Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison, AppDialogEventargs, AppDialogResult, DelegateArgs, DialogComponentArgs, WindowButtonType, PatientContext, ContentControl, Visibility } from 'epma-platform/models';
import {
    ContextInfo,
  } from 'src/app/lorappcommonbb/utilities/globalvariable';
import { AppDialog, Border, Grid, KeyEventArgs, MouseButtonEventArgs, ScrollViewer, ToolTipService, UserControl, iButton, iCheckBox, iComboBox, iDateTimePicker, iHyperlinkButton, iLabel, iTextBox, iTimeBox, iUpDownBox } from 'epma-platform/controls';
import { HelperService } from 'epma-platform/soapclient';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
import { PrescriptionItemVM } from '../viewmodel/PrescriptionItemVM';
import { RoutedEventArgs } from 'src/app/shared/epma-platform/controls/FrameworkElement';
import { ActivityTypes } from '../model/common';
import { CConstants, PrescriptionTypes } from '../utilities/constants';
import { DependencyPropertyChangedEventArgs } from './frmformviewforadminconinfusions';
import { Resource } from '../resource';
import { frmWeekdays } from './frmweekdays';
import * as ControlStyles from "../../shared/epma-platform/controls/ControlStyles";
import { medipresolvestepped } from './medipresolvestepped';
import { medresolvetitrated } from './medresolvetitrated';
import { medConditionalDose } from './medconditionaldose';
import { CommonService } from 'src/app/product/shared/common.service';
var that;

@Component({
    selector: 'app-frmformviewopdschg',
    templateUrl: './frmformviewopdschg.html',
    styleUrls: ['./frmformviewopdschg.css'],})
   
export class FormViewOPDschg extends UserControl {
    public bIsLoaded: boolean = false;
    objfrm: PrescriptionItemVM;
    sLowerDoseDefaultValue: string = String.Empty;
    sUpperDoseDefaultValue: string = String.Empty;
    sUOMDefaultValue: string = String.Empty;
    sDoseTypeDefaultValue: string = String.Empty;
    override _DataContext;
    Ref: this;
    override get DataContext() {
        return this._DataContext;
    }
    @Input() override set DataContext(value: any) {
        this._DataContext = value;
        console.log(value);
    }
    public resKey = Resource.MedicationForm;
    public resKey1 = Resource.Infusion;
    public FormLoadAFterviewinit : boolean = false;
    Styles = ControlStyles;
    constructor() {
        // InitializeComponent();
        super();
        this.Ref = this;
        this.bIsLoaded = false;
        that = this;

    }
    public maxScrollContentHeight;
    ngAfterViewInit(){
        this.maxScrollContentHeight = CommonService.setDynamicScrollviewerHeight();
        if (this.maxScrollContentHeight) {
            this.maxScrollContentHeight = this.maxScrollContentHeight - 40;
        }
        that = this;
        if (this.FormLoadAFterviewinit) {
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
        // this.bIsLoaded = false;
        this.dtpStartDate.IsConstrainEntry = true;
        this.objfrm.FormViewerDetails.BasicDetails.PrnInstructionLoaded.subscribe(data => {
            this.cboPRNInstruction.ClearValue();
        });
        setTimeout(() => {
            super.AfterViewInit();
        }, 5);
    }
    private svwFormViewer: ScrollViewer;
    @ViewChild("svwFormViewerTempRef", { read: ScrollViewer, static: false }) set _svwFormViewer(c: ScrollViewer) {
        if (c) { this.svwFormViewer = c; }
    };
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
    private lblDosageForm: iLabel;
    @ViewChild("lblDosageFormTempRef", { read: iLabel, static: false }) set _lblDosageForm(c: iLabel) {
        if (c) { this.lblDosageForm = c; }
    };
    private cboDosageForm: iComboBox;
    @ViewChild("cboDosageFormTempRef", { read: iComboBox, static: false }) set _cboDosageForm(c: iComboBox) {
        if (c) { this.cboDosageForm = c; }
    };
    private lblDoseType: iLabel;
    @ViewChild("lblDoseTypeTempRef", { read: iLabel, static: false }) set _lblDoseType(c: iLabel) {
        if (c) { this.lblDoseType = c; }
    };
    private cboDoseType: iComboBox;
    @ViewChild("cboDoseTypeTempRef", { read: iComboBox, static: false }) set _cboDoseType(c: iComboBox) {
        if (c) { this.cboDoseType = c; }
    };
    private lblDose: iLabel;
    @ViewChild("lblDoseTempRef", { read: iLabel, static: false }) set _lblDose(c: iLabel) {
        if (c) { this.lblDose = c; }
    };
    private Dosecal: iButton;
    @ViewChild("DosecalTempRef", { read: iButton, static: false }) set _Dosecal(c: iButton) {
        if (c) { this.Dosecal = c; }
    };
    private cboAdminMethod: iComboBox;
    @ViewChild("cboAdminMethodTempRef", { read: iComboBox, static: false }) set _cboAdminMethod(c: iComboBox) {
        if (c) { this.cboAdminMethod = c; }
    };
    private DoseLayoutRoot: Grid;
    @ViewChild("DoseLayoutRootTempRef", { read: Grid, static: false }) set _DoseLayoutRoot(c: Grid) {
        if (c) { this.DoseLayoutRoot = c; }
    };
    private txtLowerDose: iTextBox;
    @ViewChild("txtLowerDoseTempRef", { read: iTextBox, static: false }) set _txtLowerDose(c: iTextBox) {
        if (c) { this.txtLowerDose = c; }
    };
    private lblHifen: iLabel;
    @ViewChild("lblHifenTempRef", { read: iLabel, static: false }) set _lblHifen(c: iLabel) {
        if (c) { this.lblHifen = c; }
    };
    private txtUpperDose: iTextBox;
    @ViewChild("txtUpperDoseTempRef", { read: iTextBox, static: false }) set _txtUpperDose(c: iTextBox) {
        if (c) { this.txtUpperDose = c; }
    };
    private lblUOM: iLabel;
    @ViewChild("lblUOMTempRef", { read: iLabel, static: false }) set _lblUOM(c: iLabel) {
        if (c) { this.lblUOM = c; }
    };
    private cboUOM: iComboBox;
    @ViewChild("cboUOMTempRef", { read: iComboBox, static: false }) set _cboUOM(c: iComboBox) {
        if (c) { this.cboUOM = c; }
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
    private lblBrand: iLabel;
    @ViewChild("lblBrandTempRef", { read: iLabel, static: false }) set _lblBrand(c: iLabel) {
        if (c) { this.lblBrand = c; }
    };
    private BrandLayout: Grid;
    @ViewChild("BrandLayoutTempRef", { read: Grid, static: false }) set _BrandLayout(c: Grid) {
        if (c) { this.BrandLayout = c; }
    };
    private cmdBrand: iLabel;
    @ViewChild("cmdBrandTempRef", { read: iLabel, static: false }) set _cmdBrand(c: iLabel) {
        if (c) { this.cmdBrand = c; }
    };
    private cmdClear: iButton;
    @ViewChild("cmdClearTempRef", { read: iButton, static: false }) set _cmdClear(c: iButton) {
        if (c) { this.cmdClear = c; }
    };
    private Weekdays: frmWeekdays;
    @ViewChild("WeekdaysTempRef", { read: frmWeekdays, static: false }) set _Weekdays(c: frmWeekdays) {
        if (c) { this.Weekdays = c; }
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
    private lblStatType: iLabel;
    @ViewChild("lblStatTypeTempRef", { read: iLabel, static: false }) set _lblStatType(c: iLabel) {
        if (c) { this.lblStatType = c; }
    };
    private cboStatType: iComboBox;
    @ViewChild("cboStatTypeTempRef", { read: iComboBox, static: false }) set _cboStatType(c: iComboBox) {
        if (c) { this.cboStatType = c; }
    };
    public lblSupplyInst: iLabel;
    @ViewChild("lblSupplyInstTempRef", { read: iLabel, static: false }) set _lblSupplyInst(c: iLabel) {
        if (c) { this.lblSupplyInst = c; }
    };
    public lblSupplyInstText: iLabel;
    @ViewChild("lblSupplyInstTextTempRef", { read: iLabel, static: false }) set _lblSupplyInstText(c: iLabel) {
        if (c) { this.lblSupplyInstText = c; }
    };
    public lblSupplyInstValue: iLabel;
    @ViewChild("lblSupplyInstValueTempRef", { read: iLabel, static: false }) set _lblSupplyInstValue(c: iLabel) {
        if (c) { this.lblSupplyInstValue = c; }
    };
    public lblTreatToCon: iLabel;
    @ViewChild("lblTreatToConTempRef", { read: iLabel, static: false }) set _lblTreatToCon(c: iLabel) {
        if (c) { this.lblTreatToCon = c; }
    };
    public cboTreatToCon: iComboBox;
    @ViewChild("cboTreatToConTempRef", { read: iComboBox, static: false }) set _cboTreatToCon(c: iComboBox) {
        if (c) { this.cboTreatToCon = c; }
    };
    private lblAddComments: iLabel;
    @ViewChild("lblAddCommentsTempRef", { read: iLabel, static: false }) set _lblAddComments(c: iLabel) {
        if (c) { this.lblAddComments = c; }
    };
    private txtAddComments: iTextBox;
    @ViewChild("txtAddCommentsTempRef", { read: iTextBox, static: false }) set _txtAddComments(c: iTextBox) {
        if (c) { this.txtAddComments = c; }
    };
    private lbtnSequencelinkforNonIv: iHyperlinkButton;
    @ViewChild("lbtnSequencelinkforNonIvTempRef", { read: iHyperlinkButton, static: false }) set _lbtnSequencelinkforNonIv(c: iHyperlinkButton) {
        if (c) { this.lbtnSequencelinkforNonIv = c; }
    };
    private lblModComments: iLabel;
    @ViewChild("lblModCommentsTempRef", { read: iLabel, static: false }) set _lblModComments(c: iLabel) {
        if (c) { this.lblModComments = c; }
    };
    private txtModComments: iTextBox;
    @ViewChild("txtModCommentsTempRef", { read: iTextBox, static: false }) set _txtModComments(c: iTextBox) {
        if (c) { this.txtModComments = c; }
    };
    private lblPblmInd: iLabel;
    @ViewChild("lblPblmIndTempRef", { read: iLabel, static: false }) set _lblPblmInd(c: iLabel) {
        if (c) { this.lblPblmInd = c; }
    };
    private txtProblem: iTextBox;
    @ViewChild("txtProblemTempRef", { read: iTextBox, static: false }) set _txtProblem(c: iTextBox) {
        if (c) { this.txtProblem = c; }
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
    private lblisnewmeds: iLabel;
    @ViewChild("lblisnewmedsTempRef", { read: iLabel, static: false }) set _lblisnewmeds(c: iLabel) {
        if (c) { this.lblisnewmeds = c; }
    };
    private chcknewmeds: iCheckBox;
    @ViewChild("chcknewmedsTempRef", { read: iCheckBox, static: false }) set _chcknewmeds(c: iCheckBox) {
        if (c) { this.chcknewmeds = c; }
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
    private brdSTA: Border;
    @ViewChild("brdSTATempRef", { read: Border, static: false }) set _brdSTA(c: Border) {
        if (c) { this.brdSTA = c; }
    };
    private lblBorder: iLabel;
    @ViewChild("lblBorderTempRef", { read: iLabel, static: false }) set _lblBorder(c: iLabel) {
        if (c) { this.lblBorder = c; }
    };
    public ContentCtrlMedResolveStepped: ContentControl = new ContentControl();;
    // @ViewChild("ContentCtrlMedResolveSteppedTempRef", { read: ContentControl, static: false }) set _ContentCtrlMedResolveStepped(c: ContentControl) {
    //     if (c) { this.ContentCtrlMedResolveStepped = c; }
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
    private UserControl_Loaded(sender: Object, e: RoutedEventArgs): void {
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
                if (bIsModificationReasonExists)
                    this.objfrm.FormViewerDetails.BasicDetails.IsModificationReasonExists = true;
                this.objfrm.FormViewerDetails.BasicDetails.IsClearlstAmendedFlds = true;
                this.objfrm.FormViewerDetails.BasicDetails.lstAmendedFlds.Clear();
                this.objfrm.FormViewerDetails.BasicDetails.lstDRCAmendedFlds.Clear();
            }
            else {
                this.objfrm.FormViewerDetails.BasicDetails.lstAmendedFlds.Clear();
                this.objfrm.FormViewerDetails.BasicDetails.lstDRCAmendedFlds.Clear();
            }
            this.objfrm.FormViewerDetails.BasicDetails.IsClearlstAmendList = true;
            this.objfrm.FormViewerDetails.BasicDetails.IsValidateDose = true;
            this.objfrm.FormViewerDetails.BasicDetails.IsenableMultiRoute = false;
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
        this.objfrm.FormViewerDetails.BasicDetails.ISvisibletreatmentcontinue = Visibility.Visible;
        if (this.objfrm.FormViewerDetails.BasicDetails.IsenableDosage == true)
            this.objfrm.FormViewerDetails.BasicDetails.IsDosageFormMandatory = true;
        if ((String.Compare(PatientContext.PrescriptionType, PrescriptionTypes.Discharge, StringComparison.OrdinalIgnoreCase) != 0)) {
            this.objfrm.FormViewerDetails.BasicDetails.IsVisiblenewmeds = Visibility.Collapsed;
        }
        if (this.chckClinicalVerify.IsChecked == true ) {
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
    public chkPRN_KeyDown_Func(sender: Object, e: KeyEventArgs) {
        this.chkPRN_KeyDown(sender, e);
    }
    private chkPRN_KeyDown(sender: Object, e: KeyEventArgs): void {
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
    public cmdBrand_MouseLeftButtonDown_Func = (s, e) => {
        Object.keys(that).forEach((prop) => (this[prop] = that[prop]));
        this.cmdBrand_MouseLeftButtonDown(s, e);
    }
    private cmdBrand_MouseLeftButtonDown(sender: Object, e: MouseButtonEventArgs): void {
        this.objfrm.LaunchBrandConstraint();
    }
    public txtUpperDose_SelectionChanged(sender: Object, e: RoutedEventArgs): void {
        let otxtUpperDose: iTextBox = ObjectHelper.CreateType<iTextBox>(sender, iTextBox);
        if (this.objfrm != null && this.objfrm.FormViewerDetails != null && this.objfrm.FormViewerDetails.BasicDetails != null && !String.IsNullOrEmpty(this.objfrm.formViewerDetails.BasicDetails.UpperDose) && !String.Equals(this.objfrm.formViewerDetails.BasicDetails.UpperDose, otxtUpperDose.Text, StringComparison.CurrentCultureIgnoreCase)) {
            this.objfrm.formViewerDetails.BasicDetails.IsNotTriggerAmendUpperDoseClearSupplyQuantity = true;
            this.objfrm.formViewerDetails.BasicDetails.UpperDose = otxtUpperDose.Text;
        }
        else if (this.objfrm != null && this.objfrm.FormViewerDetails != null && this.objfrm.FormViewerDetails.BasicDetails != null && String.IsNullOrEmpty(this.objfrm.formViewerDetails.BasicDetails.UpperDose) && !String.IsNullOrEmpty(otxtUpperDose.Text)) {
            this.objfrm.formViewerDetails.BasicDetails.IsNotTriggerAmendUpperDoseClearSupplyQuantity = true;
            this.objfrm.formViewerDetails.BasicDetails.UpperDose = otxtUpperDose.Text;
        }
    }
}