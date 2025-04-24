import { Component, OnInit, ViewChild } from '@angular/core';
import { StringBuilder, ProfileFactoryType, ContextManager, Convert, AppActivity } from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp, Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison, AppDialogEventargs, AppDialogResult, DelegateArgs, DialogComponentArgs, WindowButtonType, ContentControl, SelectionChangedEventArgs } from 'epma-platform/models';
import { AppDialog, Border, EventArgs, Grid, KeyEventArgs, MouseButtonEventArgs, ToolTipService, UserControl, iButton, iCheckBox, iComboBox, iDateTimePicker, iLabel, iRadioButton, iTextBox, iUpDownBox } from 'epma-platform/controls';
import { HelperService } from 'epma-platform/soapclient';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
import { Visibility } from 'epma-platform/models';
import { PrescriptionItemVM } from '../viewmodel/PrescriptionItemVM';
import { CConstants } from '../utilities/constants';
import { RoutedEventArgs } from 'src/app/shared/epma-platform/controls/FrameworkElement';
import { ContextInfo } from 'src/app/lorappcommonbb/utilities/globalvariable';
import { ActivityTypes } from '../model/common';
import { MultiSelectListView } from './MultiSelectListView';
import { MultiSelectListVM } from '../viewmodel/MultiSelectListVM';
import { DependencyPropertyChangedEventArgs } from 'src/app/shared/epma-platform/controls/Control';
import { Resource } from '../resource';
import * as ControlStyles from "../../shared/epma-platform/controls/ControlStyles";
import { frmWeekdays } from './frmweekdays';

var that;

@Component({
    selector: 'frmformviewmedclrkappliance',
    templateUrl: './frmformviewmedclrkappliance.component.html',
    styleUrls: ['./frmformviewmedclrkappliance.component.css']
})
export class TypeinFormViewAppliance extends UserControl implements OnInit {

    public resKey = Resource.MedicationForm;
    //    TODO: CListItemsDisplay Not Implemented.
    
    // public MedClrkSrc = Resource.CListItemsDisplay;  
    private LayoutRoot: Grid;
    @ViewChild("LayoutRootTempRef", { read: Grid, static: false }) set _LayoutRoot(c: Grid) {
        if (c) { this.LayoutRoot = c; }
    };
    private lblDateCommenced: iLabel;
    @ViewChild("lblDateCommencedTempRef", { read: iLabel, static: false }) set _lblDateCommenced(c: iLabel) {
        if (c) { this.lblDateCommenced = c; }
    };
    private optCompletedate: iRadioButton;
    @ViewChild("optCompletedateTempRef", { read: iRadioButton, static: false }) set _optCompletedate(c: iRadioButton) {
        if (c) { this.optCompletedate = c; }
    };
    private optPartialdate: iRadioButton;
    @ViewChild("optPartialdateTempRef", { read: iRadioButton, static: false }) set _optPartialdate(c: iRadioButton) {
        if (c) { this.optPartialdate = c; }
    };
    private lblStartDate: iLabel;
    @ViewChild("lblStartDateTempRef", { read: iLabel, static: false }) set _lblStartDate(c: iLabel) {
        if (c) { this.lblStartDate = c; }
    };
    private dtpStartDate: iDateTimePicker;
    @ViewChild("dtpStartDateTempRef", { read: iDateTimePicker, static: false }) set _dtpStartDate(c: iDateTimePicker) {
        if (c) { this.dtpStartDate = c; }
    };
    private lblMonth: iLabel;
    @ViewChild("lblMonthTempRef", { read: iLabel, static: false }) set _lblMonth(c: iLabel) {
        if (c) { this.lblMonth = c; }
    };
    private cboMonth: iComboBox;
    @ViewChild("cboMonthTempRef", { read: iComboBox, static: false }) set _cboMonth(c: iComboBox) {
        if (c) { this.cboMonth = c; }
    };
    private udYear: iUpDownBox;
    @ViewChild("udYearTempRef", { read: iUpDownBox, static: false }) set _udYear(c: iUpDownBox) {
        if (c) { this.udYear = c; }
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
    private Weekdays: frmWeekdays;
    @ViewChild("WeekdaysTempRef", {read:frmWeekdays, static: false }) set _Weekdays(c: frmWeekdays){
        if(c){ this.Weekdays  = c; }
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
        if (c) {
            this.cboPRNInstruction = c;
            console.log('pnrinst', this.cboPRNInstruction);

        }
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
    private lblVerificationComments: iLabel;
    @ViewChild("lblVerificationCommentsTempRef", { read: iLabel, static: false }) set _lblVerificationComments(c: iLabel) {
        if (c) { this.lblVerificationComments = c; }
    };
    private txtVerificationComments: iTextBox;
    @ViewChild("txtVerificationCommentsTempRef", { read: iTextBox, static: false }) set _txtVerificationComments(c: iTextBox) {
        if (c) { this.txtVerificationComments = c; }
    };
    private lblAdditionalComments: iLabel;
    @ViewChild("lblAdditionalCommentsTempRef", { read: iLabel, static: false }) set _lblAdditionalComments(c: iLabel) {
        if (c) { this.lblAdditionalComments = c; }
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
    private lblRsnForMod: iLabel;
    @ViewChild("lblRsnForModTempRef", { read: iLabel, static: false }) set _lblRsnForMod(c: iLabel) {
        if (c) { this.lblRsnForMod = c; }
    };
    private cboRsnForMod: iComboBox;
    @ViewChild("cboRsnForModTempRef", { read: iComboBox, static: false }) set _cboRsnForMod(c: iComboBox) {
        if (c) { this.cboRsnForMod = c; }
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
    private ContentCtrlMedResolveStepped: ContentControl;
    @ViewChild("ContentCtrlMedResolveSteppedTempRef", { read: ContentControl, static: false }) set _ContentCtrlMedResolveStepped(c: ContentControl) {
        if (c) { this.ContentCtrlMedResolveStepped = c; }
    };

    public Styles = ControlStyles;
    Completedate = false;
    Partialdate = true;
    public bIsLoaded: boolean = false;
    public FormLoadAFterviewinit : boolean = false;
    objfrm: PrescriptionItemVM;
    constructor() {
        super();
        // InitializeComponent();
        // this.dtpStartDate.IsConstrainEntry = true;
    }
    ngOnInit(): void {

    }
    ngAfterViewInit(): void {     
        that = this;
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
    private UserControl_Loaded(sender: Object, e: RoutedEventArgs): void {
        this.objfrm = ObjectHelper.CreateType<PrescriptionItemVM>(this.DataContext, PrescriptionItemVM);
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
            this.objfrm.FormViewerDetails.BasicDetails.RangeStartDTTM = DateTime.MinValue;
            let bIsModificationReasonExists: boolean = this.objfrm.FormViewerDetails.BasicDetails.IsModificationReasonExists;
            this.bIsLoaded = false;
            this.objfrm.IsReasonForModificationVisible = Visibility.Collapsed;
            if (!this.objfrm.IsConflictFaxTabLoaded) {
                this.objfrm.FormViewerDetails.BasicDetails.IsMandatoryRSNFORMOD = false;
            }
            this.objfrm.FormViewerDetails.BasicDetails.IsMandatoryFrequency = false;
            this.objfrm.FormViewerDetails.BasicDetails.IsenableFrequency = true;
            this.objfrm.FormViewerDetails.BasicDetails.lstAmendedFlds.Clear();
            this.objfrm.FormViewerDetails.BasicDetails.lstDRCAmendedFlds.Clear();
            this.objfrm.FormViewerDetails.BasicDetails.IsClearlstAmendList = true;
            this.objfrm.FormViewerDetails.BasicDetails.IsValidateDose = true;
            if (bIsModificationReasonExists)
                this.objfrm.FormViewerDetails.BasicDetails.IsModificationReasonExists = true;
            if (this.objfrm.FormViewerDetails.BasicDetails.StartDTTM.Year != DateTime.MinValue.Year && (String.Compare(this.objfrm.OperationMode, "N") != 0 || this.objfrm.FormViewerDetails.BasicDetails.Completedate)) {
                this.objfrm.FormViewerDetails.BasicDetails.CompleteStartDTTM = this.objfrm.FormViewerDetails.BasicDetails.StartDTTM;
            }
            else this.dtpStartDate.SetDateString(String.Empty);
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
    }
    public chkPRN_KeyDown_Func(sender: Object, e: KeyEventArgs): void {
        if (e.PlatformKeyCode == 13) {
            this.chkPRN.IsChecked = !this.chkPRN.IsChecked;
        }
    }
    oMultiSelectListView_Closed(sender: Object, e: EventArgs): void {
        let oMultiSelectListView: MultiSelectListView = ObjectHelper.CreateType<MultiSelectListView>(sender, MultiSelectListView);
        if (oMultiSelectListView instanceof MultiSelectListView) {
            let oMultiSelectVM: MultiSelectListVM = ObjectHelper.CreateType<MultiSelectListVM>(oMultiSelectListView.DataContext, MultiSelectListVM);
            if (oMultiSelectVM instanceof MultiSelectListVM)
                this.objfrm.FormViewerDetails.BasicDetails.MedicationClerkingSource = oMultiSelectVM.ValueDomainCollection;
        }
    }
    public cmdBrand_MouseLeftButtonDown(sender: Object, e: MouseButtonEventArgs): void {
        this.objfrm.LaunchBrandConstraint();
    }
    chckClinicalVerify_OnChange_Func=(s,e)=>{Object.keys(that).forEach((prop) => (this[prop] = that[prop]));this.chckClinicalVerify_OnChange(s,e)};
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
            if (String.Equals(ContextInfo.MenuCode, CConstants.ClinicallyVerifyMenuCode, StringComparison.InvariantCultureIgnoreCase) && (this.objfrm.ActionCode != ActivityTypes.Amend || this.objfrm.PrescriptionItemStatus != CConstants.CLINICALLYVERIFIED))
                this.objfrm.IsClinicallyVerifyCommentsMandatory = false;
            if (this.objfrm != null && this.objfrm.FormViewerDetails != null && this.objfrm.FormViewerDetails.BasicDetails != null) {
                this.objfrm.FormViewerDetails.BasicDetails.IsClinicallyVerified = false;
            }
        }
    }
    public cboRsnForMod_IsEnabledChanged(sender: Object, e: DependencyPropertyChangedEventArgs): void {
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
        this.txtAddComments.Text = String.Empty;
        this.txtProblem.Text = String.Empty;
        this.cboRsnForMod.Text = String.Empty;
        this.txtModComments.Text = String.Empty;
        this.cboDuration.Text = String.Empty;
    }
    // e: Telerik.Windows.Controls.SelectionChangedEventArgs
    private cboDosageForm_SelectionChanged(sender: Object, e: SelectionChangedEventArgs): void {
        if (this.objfrm != null && this.objfrm.ActionCode == ActivityTypes.Amend) {
            this.ClearAllFields();
        }
    }
    private cboRoute_SelectionChanged(sender: Object, e: SelectionChangedEventArgs): void {
        if (this.objfrm != null && this.objfrm.ActionCode == ActivityTypes.Amend) {
            this.ClearAllFields();
        }
    }
    private txtLowerDose_SelectionChanged(sender: Object, e: RoutedEventArgs): void {
        if (this.objfrm != null && this.objfrm.FormViewerDetails != null && this.objfrm.FormViewerDetails.BasicDetails != null && this.objfrm.FormViewerDetails.BasicDetails.bDoseFromCal)
            this.objfrm.FormViewerDetails.BasicDetails.bDoseChange = true;
    }
}