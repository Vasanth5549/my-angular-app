import { AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { StringBuilder, ProfileFactoryType, ContextManager, Convert, AppActivity } from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp, Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison, AppDialogEventargs, AppDialogResult, DelegateArgs, DialogComponentArgs, WindowButtonType, iAppDialogWindow, Visibility } from 'epma-platform/models';
import { AppDialog, Border, EventArgs, Grid, iComboBox, iLabel, iTextBox, iUpDownBox } from 'epma-platform/controls';
import { HelperService } from 'epma-platform/soapclient';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
import { ReviewOutcomeVM } from '../viewmodel/reviewoutcomevm';
import { Resource } from '../resource';
import { CConstants, InfusionTypeCode } from '../utilities/constants';
import { RoutedEventArgs } from 'src/app/shared/epma-platform/controls/FrameworkElement';
import * as IPPManagePrescSer from 'src/app/shared/epma-platform/soap-client/IPPMAManagePrescriptionWS';
import * as ControlStyles from '../../shared/epma-platform/controls/ControlStyles';
@Component({
    selector: 'ReviewOutcome',
    templateUrl: './reviewoutcome.html',
    styleUrls: ['./reviewoutcome.css']

})
export class ReviewOutcome extends iAppDialogWindow implements AfterViewInit{
    public Styles = ControlStyles;
    public ResKey = Resource.prescribedrugs;
    private LayoutRoot: Grid;
    @ViewChild("LayoutRootTempRef", { read: Grid, static: false }) set _LayoutRoot(c: Grid) {
        if (c) { this.LayoutRoot = c; }
    };
    private brdCDCForm: Border;
    @ViewChild("brdCDCFormTempRef", { read: Border, static: false }) set _brdCDCForm(c: Border) {
        if (c) { this.brdCDCForm = c; }
    };
    private lblReviewType: iLabel;
    @ViewChild("lblReviewTypeTempRef", { read: iLabel, static: false }) set _lblReviewType(c: iLabel) {
        if (c) { this.lblReviewType = c; }
    };
    private lblReviewRequestComments: iLabel;
    @ViewChild("lblReviewRequestCommentsTempRef", { read: iLabel, static: false }) set _lblReviewRequestComments(c: iLabel) {
        if (c) { this.lblReviewRequestComments = c; }
    };
    private lblReviewRequestedBy: iLabel;
    @ViewChild("lblReviewRequestedByTempRef", { read: iLabel, static: false }) set _lblReviewRequestedBy(c: iLabel) {
        if (c) { this.lblReviewRequestedBy = c; }
    };
    private lblReviewRequestedOn: iLabel;
    @ViewChild("lblReviewRequestedOnTempRef", { read: iLabel, static: false }) set _lblReviewRequestedOn(c: iLabel) {
        if (c) { this.lblReviewRequestedOn = c; }
    };
    private lblReviewdatetime: iLabel;
    @ViewChild("lblReviewdatetimeTempRef", { read: iLabel, static: false }) set _lblReviewdatetime(c: iLabel) {
        if (c) { this.lblReviewdatetime = c; }
    };
    private lblReviewTypeText: iLabel;
    @ViewChild("lblReviewTypeTextTempRef", { read: iLabel, static: false }) set _lblReviewTypeText(c: iLabel) {
        if (c) { this.lblReviewTypeText = c; }
    };
    private lblReviewRequestCommentsText: iLabel;
    @ViewChild("lblReviewRequestCommentsTextTempRef", { read: iLabel, static: false }) set _lblReviewRequestCommentsText(c: iLabel) {
        if (c) { this.lblReviewRequestCommentsText = c; }
    };
    private lblReviewRequestedByText: iLabel;
    @ViewChild("lblReviewRequestedByTextTempRef", { read: iLabel, static: false }) set _lblReviewRequestedByText(c: iLabel) {
        if (c) { this.lblReviewRequestedByText = c; }
    };
    private lblReviewRequestedOnText: iLabel;
    @ViewChild("lblReviewRequestedOnTextTempRef", { read: iLabel, static: false }) set _lblReviewRequestedOnText(c: iLabel) {
        if (c) { this.lblReviewRequestedOnText = c; }
    };
    private lblReviewdatetimetext: iLabel;
    @ViewChild("lblReviewdatetimetextTempRef", { read: iLabel, static: false }) set _lblReviewdatetimetext(c: iLabel) {
        if (c) { this.lblReviewdatetimetext = c; }
    };
    private lblOutcomeComments: iLabel;
    @ViewChild("lblOutcomeCommentsTempRef", { read: iLabel, static: false }) set _lblOutcomeComments(c: iLabel) {
        if (c) { this.lblOutcomeComments = c; }
    };
    private txtOutComeComments: iTextBox;
    @ViewChild("txtOutComeCommentsTempRef", { read: iTextBox, static: false }) set _txtOutComeComments(c: iTextBox) {
        if (c) { this.txtOutComeComments = c; }
    };
    private lblReviewOutcome: iLabel;
    @ViewChild("lblReviewOutcomeTempRef", { read: iLabel, static: false }) set _lblReviewOutcome(c: iLabel) {
        if (c) { this.lblReviewOutcome = c; }
    };
    private cboReviewOutcome: iComboBox;
    @ViewChild("cboReviewOutcomeTempRef", { read: iComboBox, static: false }) set _cboReviewOutcome(c: iComboBox) {
        if (c) { this.cboReviewOutcome = c; }
    };
    private lblReinstate: iLabel;
    @ViewChild("lblReinstateTempRef", { read: iLabel, static: false }) set _lblReinstate(c: iLabel) {
        if (c) { this.lblReinstate = c; }
    };
    private txtReasonforReinstate: iTextBox;
    @ViewChild("txtReasonforReinstateTempRef", { read: iTextBox, static: false }) set _txtReasonforReinstate(c: iTextBox) {
        if (c) { this.txtReasonforReinstate = c; }
    };
    private lblReasonforDiscontinue: iLabel;
    @ViewChild("lblReasonforDiscontinueTempRef", { read: iLabel, static: false }) set _lblReasonforDiscontinue(c: iLabel) {
        if (c) { this.lblReasonforDiscontinue = c; }
    };
    private cboReasonforDiscontinue: iComboBox;
    @ViewChild("cboReasonforDiscontinueTempRef", { read: iComboBox, static: false }) set _cboReasonforDiscontinue(c: iComboBox) {
        if (c) { this.cboReasonforDiscontinue = c; }
    };
    private lblReviewAfter: iLabel;
    @ViewChild("lblReviewAfterTempRef", { read: iLabel, static: false }) set _lblReviewAfter(c: iLabel) {
        if (c) { this.lblReviewAfter = c; }
    };
    private udReviewAfter: iUpDownBox;
    @ViewChild("udReviewAfterTempRef", { read: iUpDownBox, static: false }) set _udReviewAfter(c: iUpDownBox) {
        if (c) { this.udReviewAfter = c; }
    };
    private cboReviewAfter: iComboBox;
    @ViewChild("cboReviewAfterTempRef", { read: iComboBox, static: false }) set _cboReviewAfter(c: iComboBox) {
        if (c) { this.cboReviewAfter = c; }
    };
    private lblReviewDueDate: iLabel;
    @ViewChild("lblReviewDueDateTempRef", { read: iLabel, static: false }) set _lblReviewDueDate(c: iLabel) {
        if (c) { this.lblReviewDueDate = c; }
    };
    private lblReviewRequestCommentsenter: iLabel;
    @ViewChild("lblReviewRequestCommentsenterTempRef", { read: iLabel, static: false }) set _lblReviewRequestCommentsenter(c: iLabel) {
        if (c) { this.lblReviewRequestCommentsenter = c; }
    };
    private txtReviewRequestComments: iTextBox;
    @ViewChild("txtReviewRequestCommentsTempRef", { read: iTextBox, static: false }) set _txtReviewRequestComments(c: iTextBox) {
        if (c) { this.txtReviewRequestComments = c; }
  };
  @Output() manageReviewPeriodChange = new EventEmitter<any>();

    public objReviewOutcome: ReviewOutcomeVM;
    objManageReviewPeriod: IPPManagePrescSer.ManageReviewPeriod;
    bNotToEmptyDUR: boolean;
    private IsOkClicked: boolean;
    private static CONTS_OUTCOME: string = "ReviewOutcome";
    private static CONTS_REVIEWPERIOD: string = "ReviewPeriod";
    private static CONTS_REVIEWPERIODUOM: string = "ReviewPeriodUOM";
    private static CONTS_DISCONTINUEREASON: string = "DiscontinueReason";
    private static CONTS_REINSTATEREASON: string = "ReinstateReason";
    constructor() {
        super()
    }

    constructorImpl(oManageReviewPeriod: IPPManagePrescSer.ManageReviewPeriod) {
        this.Loaded = (s, e) => { this.ReviewOutcome_Loaded(s, e); };
        this.objManageReviewPeriod = oManageReviewPeriod;
        this.objReviewOutcome = new ReviewOutcomeVM();
        // this.objReviewOutcome.constructorImpl(this.objManageReviewPeriod);
        this.DataContext = this.objReviewOutcome;

    }
    public maxScrollHeight;
    ngAfterViewInit(): void {
        this.maxScrollHeight = (window.devicePixelRatio == 1) ? "auto" :(600/window.devicePixelRatio)-88;
        this.objReviewOutcome.constructorImpl(this.objManageReviewPeriod);
        this.DataContext = this.objReviewOutcome;
        this.ReviewOutcome_Loaded({}, null);
		this.HelpCode = 'MN_PRESCCHART_P2';
    }

  private ReviewOutcome_Loaded(sender: Object, e: RoutedEventArgs): void {
    if (this.DataContext != null && this.DataContext instanceof ReviewOutcomeVM) {
      let Obj: ReviewOutcomeVM = ObjectHelper.CreateType<ReviewOutcomeVM>(this.DataContext, ReviewOutcomeVM);
      if (String.Equals(Obj.IdentifyingType, CConstants.NONCATALOGUEITEM, StringComparison.OrdinalIgnoreCase) || String.Equals(Obj.IdentifyingType, CConstants.Precatalog, StringComparison.OrdinalIgnoreCase)) {
        Obj.ReviewAfterMandatory = false;
        Obj.ReviewAfterMandatoryConfig = false;
      }
    }
  }
  public cmdOkClick(out1: (objManageReviewPeriod: IPPManagePrescSer.ManageReviewPeriod) => void): boolean {
    let objManageReviewPeriod: IPPManagePrescSer.ManageReviewPeriod;
    let bRerturn: boolean = false;
    this.bNotToEmptyDUR = true;
    if (!this.IsOkClicked && this.CheckValidations()) {
      objManageReviewPeriod = null;
      objManageReviewPeriod = this.objReviewOutcome.ReviewOutcomeValue();
      bRerturn = true;
    }
    this.manageReviewPeriodChange.emit(objManageReviewPeriod);
    out1(objManageReviewPeriod);
    return bRerturn;
  }
    private CheckValidations(): boolean {
        this.IsOkClicked = true;
        let bResult: boolean = true;
        let oiMessageBox: iMessageBox = new iMessageBox();
        oiMessageBox.Closed = (s, e) => { this.oiMessageBox_Closed(s, e); };
        oiMessageBox.Title = "Lorenzo";
        oiMessageBox.IconType = MessageBoxType.Information;
        let ReviewafterValid: boolean = String.IsNullOrEmpty(this.objReviewOutcome.ReviewPeriod) || String.Equals(this.objReviewOutcome.ReviewPeriod, "-1.79769313486232E+308") || String.Equals(this.objReviewOutcome.ReviewPeriod, "-2147483648.0") || String.Equals(this.objReviewOutcome.ReviewPeriod, "-2147483648");
        if (String.IsNullOrEmpty(this.objReviewOutcome.ReviewOutcome.DisplayText)) {
            oiMessageBox.Message = Resource.prescribedrugs.Errmsg_ReviewOutcome;
            oiMessageBox.Tag = ReviewOutcome.CONTS_OUTCOME;
            oiMessageBox.MessageButton = MessageBoxButton.OK;   
            oiMessageBox.Show();
            return false;
        }
        if (ReviewafterValid && this.objReviewOutcome.lstReviewAfterUOMCombo != null && !String.IsNullOrEmpty(this.objReviewOutcome.lstReviewAfterUOMCombo.DisplayText) && !String.IsNullOrEmpty(this.objReviewOutcome.lstReviewAfterUOMCombo.Value) && String.IsNullOrEmpty(this.objReviewOutcome.ReviewPeriodDTTM)) {
            oiMessageBox.Message = Resource.prescribedrugs.Errmsg_ReviewPeriod;
            oiMessageBox.Tag = ReviewOutcome.CONTS_REVIEWPERIOD;
            oiMessageBox.MessageButton = MessageBoxButton.OK;  
            oiMessageBox.Show();
            return false;
        }
        if (this.objReviewOutcome.ReviewAfterFieldVisibility == Visibility.Visible && !ReviewafterValid && this.objReviewOutcome.lstReviewAfterUOMCombo == null && String.IsNullOrEmpty(this.objReviewOutcome.ReviewPeriodDTTM)) {
            oiMessageBox.Message = Resource.prescribedrugs.Errmsg_ReviewPeriodUOM;
            oiMessageBox.Tag = ReviewOutcome.CONTS_REVIEWPERIODUOM;
            oiMessageBox.MessageButton = MessageBoxButton.OK;  
            oiMessageBox.Show();
            return false;
        }
        if (this.objReviewOutcome.ReviewAfterFieldVisibility == Visibility.Visible && ReviewafterValid && this.objReviewOutcome.lstReviewAfterUOMCombo == null && String.IsNullOrEmpty(this.objReviewOutcome.ReviewPeriodDTTM) && (this.objReviewOutcome.ReviewAfterMandatoryConfig || String.Equals(this.objReviewOutcome.ReviewOutcome.Value, CConstants.Schedulefurtherreview, StringComparison.InvariantCultureIgnoreCase))) {
            oiMessageBox.Message = Resource.prescribedrugs.Errmsg_ReviewPeriod;
            oiMessageBox.Tag = ReviewOutcome.CONTS_REVIEWPERIOD;
            oiMessageBox.MessageButton = MessageBoxButton.OK;  
            oiMessageBox.Show();
            return false;
        }
        if (this.objReviewOutcome.ReasonMandatory == true && this.objReviewOutcome.DiscontinueReason == null && this.objReviewOutcome.DiscontinueReasonFieldVisibility == Visibility.Visible) {
            oiMessageBox.Message = Resource.prescribedrugs.Errmsg_DiscontinueReason;
            oiMessageBox.Tag = ReviewOutcome.CONTS_DISCONTINUEREASON;
            oiMessageBox.MessageButton = MessageBoxButton.OK;  
            oiMessageBox.Show();
            return false;
        }
        if (String.IsNullOrWhiteSpace(this.objReviewOutcome.ReinstateReason) && this.objReviewOutcome.ReinstateReasonFieldVisibility == Visibility.Visible) {
            oiMessageBox.Message = Resource.prescribedrugs.Errmsg_ReinstateReason;
            oiMessageBox.Tag = ReviewOutcome.CONTS_REINSTATEREASON;
            oiMessageBox.MessageButton = MessageBoxButton.OK;  
            oiMessageBox.Show();
            return false;
        }
        if (this.objReviewOutcome.ReviewAfterDTTM && this.objReviewOutcome.ReviewAfterDTTM.NotEquals(DateTime.MinValue) && this.objReviewOutcome.StopDTTM && this.objReviewOutcome.StopDTTM.NotEquals(DateTime.MinValue) && this.objReviewOutcome.ReviewAfterDTTM >= this.objReviewOutcome.StopDTTM) {
            oiMessageBox.Message = Resource.prescribedrugs.Errmsg_ReviewPeriodValueforStopDTTM;
            oiMessageBox.Tag = ReviewOutcome.CONTS_REVIEWPERIOD;
            oiMessageBox.MessageButton = MessageBoxButton.OK;  
            oiMessageBox.Show();
            return false;
        }
        if ( this.objReviewOutcome.ReviewAfterDTTM && this.objReviewOutcome.ReviewAfterDTTM.NotEquals(DateTime.MinValue) && this.objReviewOutcome.localDurationDTTM && this.objReviewOutcome.localDurationDTTM.NotEquals(DateTime.MinValue) && this.objReviewOutcome.ReviewAfterDTTM > this.objReviewOutcome.localDurationDTTM) {
            oiMessageBox.Message = Resource.prescribedrugs.Errmsg_ReviewPeriodValueforDuration;
            oiMessageBox.Tag = ReviewOutcome.CONTS_REVIEWPERIOD;
            oiMessageBox.MessageButton = MessageBoxButton.OK;  
            oiMessageBox.Show();
            return false;
        }
        if (!String.Equals(this.objReviewOutcome.InfusionType, InfusionTypeCode.INTERMITTENT)) {
            if (this.objReviewOutcome.ReviewAfterDTTM && this.objReviewOutcome.ReviewAfterDTTM.NotEquals(DateTime.MinValue) && this.objReviewOutcome.localInfusionPeriodDTTM && this.objReviewOutcome.localInfusionPeriodDTTM.NotEquals(DateTime.MinValue) && this.objReviewOutcome.ReviewAfterDTTM >= this.objReviewOutcome.localInfusionPeriodDTTM) {
                oiMessageBox.Message = Resource.prescribedrugs.Errmsg_ReviewPeriodValueforInfusionPeriod;
                oiMessageBox.Tag = ReviewOutcome.CONTS_REVIEWPERIOD;
                oiMessageBox.MessageButton = MessageBoxButton.OK;  
                oiMessageBox.Show();
                return false;
            }
        }
        let DurationForCal: number = !String.IsNullOrEmpty(this.objReviewOutcome.Duration) ? Convert.ToInt64(this.objReviewOutcome.Duration) : 0;
        let ReviewForCal: number = !String.IsNullOrEmpty(this.objReviewOutcome.ReviewPeriod) ? Convert.ToInt64(this.objReviewOutcome.ReviewPeriod) : 0;
        if (!String.IsNullOrEmpty(this.objReviewOutcome.DurationUOM) && String.Equals(this.objReviewOutcome.DurationUOM, "CC_DOSES") && ReviewForCal != 0 && DurationForCal != 0 && DurationForCal < ReviewForCal) {
            if (oiMessageBox != null) {
                oiMessageBox.Message = Resource.prescribedrugs.Errmsg_ReviewPeriodValueforDuration;
                oiMessageBox.Tag = ReviewOutcome.CONTS_REVIEWPERIOD;
                oiMessageBox.MessageButton = MessageBoxButton.OK;  
                oiMessageBox.Show();
                return false;
            }
        }
        return bResult;
    }
    oiMessageBox_Closed(sender: Object, e: EventArgs): void {
        this.IsOkClicked = false;
        this.bNotToEmptyDUR = false;
        let oiMessageBox: iMessageBox = ObjectHelper.CreateType<iMessageBox>(sender, iMessageBox);
        if (oiMessageBox != null) {
            switch (oiMessageBox.Tag.ToString()) {
                case ReviewOutcome.CONTS_OUTCOME:
                    this.cboReviewOutcome.Focus();
                    break;
                case ReviewOutcome.CONTS_REVIEWPERIOD:
                    this.udReviewAfter.Focus();
                    break;
                case ReviewOutcome.CONTS_REVIEWPERIODUOM:
                    this.cboReviewAfter.Focus();
                    break;
                case ReviewOutcome.CONTS_DISCONTINUEREASON:
                    this.cboReasonforDiscontinue.Focus();
                    break;
                case ReviewOutcome.CONTS_REINSTATEREASON:
                    this.txtReasonforReinstate.Focus();
                    break;
            }
        }
    }
    private ReviewOutcome_UnLoaded(sender: Object, e: RoutedEventArgs): void {

    }
}
