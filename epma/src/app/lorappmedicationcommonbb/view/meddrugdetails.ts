import { Component, OnInit, ViewChild } from '@angular/core';
import { StringBuilder,ProfileFactoryType,ContextManager,Convert,AppActivity, ScriptObject, base, MediatorDataService} from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp,Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison,AppDialogEventargs, AppDialogResult, DelegateArgs, DialogComponentArgs, WindowButtonType, ContentControl, HtmlPage, iAppDialogWindow, ChildWindow } from 'epma-platform/models';
import { AppDialog, Border, FrameworkElement, GridLength, iButton, iLabel, MouseButtonEventArgs, Thickness, UserControl, Grid } from 'epma-platform/controls';
import { HelperService} from 'epma-platform/soapclient';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
import { RowDefinition } from 'src/app/shared/epma-platform/controls/epma-grid/epma-grid.component';
import { PrescriptionItemDetailsVM } from '../viewmodel/prescriptionitemdetailsvm';
import * as ControlStyles from "../../shared/epma-platform/controls/ControlStyles";
import { RoutedEventArgs } from 'src/app/shared/epma-platform/controls/Control';
import { GridUnitType } from 'src/app/shared/epma-platform/controls/GridExt';
import { Resource } from "../resource";
import { medddetails } from './medddetails';
import { medddetailsChild } from '../child/medddetailschild';
import { MedChartData } from 'src/app/lorappmedicationcommonbb/utilities/globalvariable';
import { SVIconLaunchFrom } from 'src/app/lorappmedicationcommonbb/utilities/constants';
import { CConstants } from 'src/app/lorappmanageprescriptionbbui/utilities/constants';
import { Medlistdetails } from 'src/app/lorappmanageprescriptionbbui/resource/medlistdetails.designer';
  
@Component({
	selector: 'MedDrugDetails',
	templateUrl: './meddrugdetails.html',
    	styleUrls: ['./meddrugdetails.css'],
})

export class MedDrugDetails extends UserControl {
    isEPRview:boolean;

private grdDrugDetCol: RowDefinition;
@ViewChild("grdDrugDetColTempRef", {read:RowDefinition, static: false }) set _grdDrugDetCol(c: RowDefinition){
    if(c){ this.grdDrugDetCol  = c; }
};
private Presdetails: Grid;
@ViewChild("PresdetailsTempRef", {read:Grid, static: false }) set _Presdetails(c: Grid){
    if(c){ this.Presdetails  = c; }
};
private borPresdetails: Border;
@ViewChild("borPresdetailsTempRef", {read:Border, static: false }) set _borPresdetails(c: Border){
    if(c){ this.borPresdetails  = c; }
};
private lblPrescDetails: iLabel;
@ViewChild("lblPrescDetailsTempRef", {read:iLabel, static: false }) set _lblPrescDetails(c: iLabel){
    if(c){ this.lblPrescDetails  = c; }
};
private LayoutRoot: Grid;
@ViewChild("LayoutRootTempRef", {read:Grid, static: false }) set _LayoutRoot(c: Grid){
    if(c){ this.LayoutRoot  = c; }
};
private lblPrescribedBy: iLabel;
@ViewChild("lblPrescribedByTempRef", {read:iLabel, static: false }) set _lblPrescribedBy(c: iLabel){
    if(c){ this.lblPrescribedBy  = c; }
};
private lblPrescribedByTxt: iLabel;
@ViewChild("lblPrescribedByTxtTempRef", {read:iLabel, static: false }) set _lblPrescribedByTxt(c: iLabel){
    if(c){ this.lblPrescribedByTxt  = c; }
};
private lblPrescribedOn: iLabel;
@ViewChild("lblPrescribedOnTempRef", {read:iLabel, static: false }) set _lblPrescribedOn(c: iLabel){
    if(c){ this.lblPrescribedOn  = c; }
};
private lblPrescribedOnTxt: iLabel;
@ViewChild("lblPrescribedOnTxtTempRef", {read:iLabel, static: false }) set _lblPrescribedOnTxt(c: iLabel){
    if(c){ this.lblPrescribedOnTxt  = c; }
};
private lblStartDateName: iLabel;
@ViewChild("lblStartDateNameTempRef", {read:iLabel, static: false }) set _lblStartDateName(c: iLabel){
    if(c){ this.lblStartDateName  = c; }
};
private lblStartDate: iLabel;
@ViewChild("lblStartDateTempRef", {read:iLabel, static: false }) set _lblStartDate(c: iLabel){
    if(c){ this.lblStartDate  = c; }
};
private lblDurations: iLabel;
@ViewChild("lblDurationsTempRef", {read:iLabel, static: false }) set _lblDurations(c: iLabel){
    if(c){ this.lblDurations  = c; }
};
private lblDuration: iLabel;
@ViewChild("lblDurationTempRef", {read:iLabel, static: false }) set _lblDuration(c: iLabel){
    if(c){ this.lblDuration  = c; }
};
private lblStopDateName: iLabel;
@ViewChild("lblStopDateNameTempRef", {read:iLabel, static: false }) set _lblStopDateName(c: iLabel){
    if(c){ this.lblStopDateName  = c; }
};
private lblStopDate: iLabel;
@ViewChild("lblStopDateTempRef", {read:iLabel, static: false }) set _lblStopDate(c: iLabel){
    if(c){ this.lblStopDate  = c; }
};
private lblreviewaft: iLabel;
@ViewChild("lblreviewaftTempRef", {read:iLabel, static: false }) set _lblreviewaft(c: iLabel){
    if(c){ this.lblreviewaft  = c; }
};
private lblreviewafttext: iLabel;
@ViewChild("lblreviewafttextTempRef", {read:iLabel, static: false }) set _lblreviewafttext(c: iLabel){
    if(c){ this.lblreviewafttext  = c; }
};
private lblreviewaftcomments: iLabel;
@ViewChild("lblreviewaftcommentsTempRef", {read:iLabel, static: false }) set _lblreviewaftcomments(c: iLabel){
    if(c){ this.lblreviewaftcomments  = c; }
};
private lblReviewaftcomments: iLabel;
@ViewChild("lblReviewaftcommentsTempRef", {read:iLabel, static: false }) set _lblReviewaftcomments(c: iLabel){
    if(c){ this.lblReviewaftcomments  = c; }
};
private lblStatusName: iLabel;
@ViewChild("lblStatusNameTempRef", {read:iLabel, static: false }) set _lblStatusName(c: iLabel){
    if(c){ this.lblStatusName  = c; }
};
private lblStatus: iLabel;
@ViewChild("lblStatusTempRef", {read:iLabel, static: false }) set _lblStatus(c: iLabel){
    if(c){ this.lblStatus  = c; }
};
private lblAmendmentofName: iLabel;
@ViewChild("lblAmendmentofNameTempRef", {read:iLabel, static: false }) set _lblAmendmentofName(c: iLabel){
    if(c){ this.lblAmendmentofName  = c; }
};
private lblAmendmentof: iLabel;
@ViewChild("lblAmendmentofTempRef", {read:iLabel, static: false }) set _lblAmendmentof(c: iLabel){
    if(c){ this.lblAmendmentof  = c; }
};
private lblseqpres: iLabel;
@ViewChild("lblseqpresTempRef", {read:iLabel, static: false }) set _lblseqpres(c: iLabel){
    if(c){ this.lblseqpres  = c; }
};
private cmdPrevious: iButton;
@ViewChild("cmdPreviousTempRef", {read:iButton, static: false }) set _cmdPrevious(c: iButton){
    if(c){ this.cmdPrevious  = c; }
};
private lblseqprestext: iLabel;
@ViewChild("lblseqprestextTempRef", {read:iLabel, static: false }) set _lblseqprestext(c: iLabel){
    if(c){ this.lblseqprestext  = c; }
};
private cmdNext: iButton;
@ViewChild("cmdNextTempRef", {read:iButton, static: false }) set _cmdNext(c: iButton){
    if(c){ this.cmdNext  = c; }
};
private lblMedClerkSrc: iLabel;
@ViewChild("lblMedClerkSrcTempRef", {read:iLabel, static: false }) set _lblMedClerkSrc(c: iLabel){
    if(c){ this.lblMedClerkSrc  = c; }
};
private lblMedClerkSrcVal: iLabel;
@ViewChild("lblMedClerkSrcValTempRef", {read:iLabel, static: false }) set _lblMedClerkSrcVal(c: iLabel){
    if(c){ this.lblMedClerkSrcVal  = c; }
};
private lbldeliverydeviceName: iLabel;
@ViewChild("lbldeliverydeviceNameTempRef", {read:iLabel, static: false }) set _lbldeliverydeviceName(c: iLabel){
    if(c){ this.lbldeliverydeviceName  = c; }
};
private lbldeliverydevicetext: iLabel;
@ViewChild("lbldeliverydevicetextTempRef", {read:iLabel, static: false }) set _lbldeliverydevicetext(c: iLabel){
    if(c){ this.lbldeliverydevicetext  = c; }
};
private lblSiteName: iLabel;
@ViewChild("lblSiteNameTempRef", {read:iLabel, static: false }) set _lblSiteName(c: iLabel){
    if(c){ this.lblSiteName  = c; }
};
private lblSite: iLabel;
@ViewChild("lblSiteTempRef", {read:iLabel, static: false }) set _lblSite(c: iLabel){
    if(c){ this.lblSite  = c; }
};
private lblStrengthName: iLabel;
@ViewChild("lblStrengthNameTempRef", {read:iLabel, static: false }) set _lblStrengthName(c: iLabel){
    if(c){ this.lblStrengthName  = c; }
};
private lblStrength: iLabel;
@ViewChild("lblStrengthTempRef", {read:iLabel, static: false }) set _lblStrength(c: iLabel){
    if(c){ this.lblStrength  = c; }
};
private lblInfusionRateName: iLabel;
@ViewChild("lblInfusionRateNameTempRef", {read:iLabel, static: false }) set _lblInfusionRateName(c: iLabel){
    if(c){ this.lblInfusionRateName  = c; }
};
private lblInfusionRate: iLabel;
@ViewChild("lblInfusionRateTempRef", {read:iLabel, static: false }) set _lblInfusionRate(c: iLabel){
    if(c){ this.lblInfusionRate  = c; }
};
private lblRoundedOffToName: iLabel;
@ViewChild("lblRoundedOffToNameTempRef", {read:iLabel, static: false }) set _lblRoundedOffToName(c: iLabel){
    if(c){ this.lblRoundedOffToName  = c; }
};
private lblRoundedOffTo: iLabel;
@ViewChild("lblRoundedOffToTempRef", {read:iLabel, static: false }) set _lblRoundedOffTo(c: iLabel){
    if(c){ this.lblRoundedOffTo  = c; }
};
private lblProblemName: iLabel;
@ViewChild("lblProblemNameTempRef", {read:iLabel, static: false }) set _lblProblemName(c: iLabel){
    if(c){ this.lblProblemName  = c; }
};
private lblProblem: iLabel;
@ViewChild("lblProblemTempRef", {read:iLabel, static: false }) set _lblProblem(c: iLabel){
    if(c){ this.lblProblem  = c; }
};
private lblAddComments: iLabel;
@ViewChild("lblAddCommentsTempRef", {read:iLabel, static: false }) set _lblAddComments(c: iLabel){
    if(c){ this.lblAddComments  = c; }
};
private lblAddCommentsVal: iLabel;
@ViewChild("lblAddCommentsValTempRef", {read:iLabel, static: false }) set _lblAddCommentsVal(c: iLabel){
    if(c){ this.lblAddCommentsVal  = c; }
};
private lblPRNInstr: iLabel;
@ViewChild("lblPRNInstrTempRef", {read:iLabel, static: false }) set _lblPRNInstr(c: iLabel){
    if(c){ this.lblPRNInstr  = c; }
};
private lblPRNInstrVal: iLabel;
@ViewChild("lblPRNInstrValTempRef", {read:iLabel, static: false }) set _lblPRNInstrVal(c: iLabel){
    if(c){ this.lblPRNInstrVal  = c; }
};
private lblAdminInst: iLabel;
@ViewChild("lblAdminInstTempRef", {read:iLabel, static: false }) set _lblAdminInst(c: iLabel){
    if(c){ this.lblAdminInst  = c; }
};
private lblAdminInsturction: iLabel;
@ViewChild("lblAdminInsturctionTempRef", {read:iLabel, static: false }) set _lblAdminInsturction(c: iLabel){
    if(c){ this.lblAdminInsturction  = c; }
};
private lblmaxdoseforpca: iLabel;
@ViewChild("lblmaxdoseforpcaTempRef", {read:iLabel, static: false }) set _lblmaxdoseforpca(c: iLabel){
    if(c){ this.lblmaxdoseforpca  = c; }
};
private lblmaxdoseforpcatxt: iLabel;
@ViewChild("lblmaxdoseforpcatxtTempRef", {read:iLabel, static: false }) set _lblmaxdoseforpcatxt(c: iLabel){
    if(c){ this.lblmaxdoseforpcatxt  = c; }
};
private lblPresItemhistory: iLabel;
@ViewChild("lblPresItemhistoryTempRef", {read:iLabel, static: false }) set _lblPresItemhistory(c: iLabel){
    if(c){ this.lblPresItemhistory  = c; }
};
private lblClinicalVer: iLabel;
@ViewChild("lblClinicalVerTempRef", {read:iLabel, static: false }) set _lblClinicalVer(c: iLabel){
    if(c){ this.lblClinicalVer  = c; }
};
private ClinicalVerification: Grid;
@ViewChild("ClinicalVerificationTempRef", {read:Grid, static: false }) set _ClinicalVerification(c: Grid){
    if(c){ this.ClinicalVerification  = c; }
};
private lblVerifiedByName: iLabel;
@ViewChild("lblVerifiedByNameTempRef", {read:iLabel, static: false }) set _lblVerifiedByName(c: iLabel){
    if(c){ this.lblVerifiedByName  = c; }
};
private lblVerifiedBy: iLabel;
@ViewChild("lblVerifiedByTempRef", {read:iLabel, static: false }) set _lblVerifiedBy(c: iLabel){
    if(c){ this.lblVerifiedBy  = c; }
};
private lblClinicVerDttm: iLabel;
@ViewChild("lblClinicVerDttmTempRef", {read:iLabel, static: false }) set _lblClinicVerDttm(c: iLabel){
    if(c){ this.lblClinicVerDttm  = c; }
};
private lblClinicVerDttmTxt: iLabel;
@ViewChild("lblClinicVerDttmTxtTempRef", {read:iLabel, static: false }) set _lblClinicVerDttmTxt(c: iLabel){
    if(c){ this.lblClinicVerDttmTxt  = c; }
};
private lblClinicComments: iLabel;
@ViewChild("lblClinicCommentsTempRef", {read:iLabel, static: false }) set _lblClinicComments(c: iLabel){
    if(c){ this.lblClinicComments  = c; }
};
private lblClinicCommentsVal: iLabel;
@ViewChild("lblClinicCommentsValTempRef", {read:iLabel, static: false }) set _lblClinicCommentsVal(c: iLabel){
    if(c){ this.lblClinicCommentsVal  = c; }
};
private lblclinicalhistory: iLabel;
@ViewChild("lblclinicalhistoryTempRef", {read:iLabel, static: false }) set _lblclinicalhistory(c: iLabel){
    if(c){ this.lblclinicalhistory  = c; }
};
private lblOnbehalfdet: iLabel;
@ViewChild("lblOnbehalfdetTempRef", {read:iLabel, static: false }) set _lblOnbehalfdet(c: iLabel){
    if(c){ this.lblOnbehalfdet  = c; }
};
private lblonbehalf: iLabel;
@ViewChild("lblonbehalfTempRef", {read:iLabel, static: false }) set _lblonbehalf(c: iLabel){
    if(c){ this.lblonbehalf  = c; }
};
private lblOnbehalfoftxt: iLabel;
@ViewChild("lblOnbehalfoftxtTempRef", {read:iLabel, static: false }) set _lblOnbehalfoftxt(c: iLabel){
    if(c){ this.lblOnbehalfoftxt  = c; }
};
private lblonbehalfofreason: iLabel;
@ViewChild("lblonbehalfofreasonTempRef", {read:iLabel, static: false }) set _lblonbehalfofreason(c: iLabel){
    if(c){ this.lblonbehalfofreason  = c; }
};
private lblOnbehalfreasontxt: iLabel;
@ViewChild("lblOnbehalfreasontxtTempRef", {read:iLabel, static: false }) set _lblOnbehalfreasontxt(c: iLabel){
    if(c){ this.lblOnbehalfreasontxt  = c; }
};
private lblcommunication: iLabel;
@ViewChild("lblcommunicationTempRef", {read:iLabel, static: false }) set _lblcommunication(c: iLabel){
    if(c){ this.lblcommunication  = c; }
};
private lblcommnmodetxt: iLabel;
@ViewChild("lblcommnmodetxtTempRef", {read:iLabel, static: false }) set _lblcommnmodetxt(c: iLabel){
    if(c){ this.lblcommnmodetxt  = c; }
};
private lblonbehalfhistory: iLabel;
@ViewChild("lblonbehalfhistoryTempRef", {read:iLabel, static: false }) set _lblonbehalfhistory(c: iLabel){
    if(c){ this.lblonbehalfhistory  = c; }
};
private lblModification: iLabel;
@ViewChild("lblModificationTempRef", {read:iLabel, static: false }) set _lblModification(c: iLabel){
    if(c){ this.lblModification  = c; }
};
private ModificationDetails: Grid;
@ViewChild("ModificationDetailsTempRef", {read:Grid, static: false }) set _ModificationDetails(c: Grid){
    if(c){ this.ModificationDetails  = c; }
};
private lblRsnconcilename: iLabel;
@ViewChild("lblRsnconcilenameTempRef", {read:iLabel, static: false }) set _lblRsnconcilename(c: iLabel){
    if(c){ this.lblRsnconcilename  = c; }
};
private lblMedClerkRsnName: iLabel;
@ViewChild("lblMedClerkRsnNameTempRef", {read:iLabel, static: false }) set _lblMedClerkRsnName(c: iLabel){
    if(c){ this.lblMedClerkRsnName  = c; }
};
private lblRsnconcile: iLabel;
@ViewChild("lblRsnconcileTempRef", {read:iLabel, static: false }) set _lblRsnconcile(c: iLabel){
    if(c){ this.lblRsnconcile  = c; }
};
private lblMedClerkRsn: iLabel;
@ViewChild("lblMedClerkRsnTempRef", {read:iLabel, static: false }) set _lblMedClerkRsn(c: iLabel){
    if(c){ this.lblMedClerkRsn  = c; }
};
private lblMedClerkCommentsName: iLabel;
@ViewChild("lblMedClerkCommentsNameTempRef", {read:iLabel, static: false }) set _lblMedClerkCommentsName(c: iLabel){
    if(c){ this.lblMedClerkCommentsName  = c; }
};
private lblMedClerkComments: iLabel;
@ViewChild("lblMedClerkCommentsTempRef", {read:iLabel, static: false }) set _lblMedClerkComments(c: iLabel){
    if(c){ this.lblMedClerkComments  = c; }
};
private lblCancellation: iLabel;
@ViewChild("lblCancellationTempRef", {read:iLabel, static: false }) set _lblCancellation(c: iLabel){
    if(c){ this.lblCancellation  = c; }
};
private Cancellation: Grid;
@ViewChild("CancellationTempRef", {read:Grid, static: false }) set _Cancellation(c: Grid){
    if(c){ this.Cancellation  = c; }
};
private lblCancelBy: iLabel;
@ViewChild("lblCancelByTempRef", {read:iLabel, static: false }) set _lblCancelBy(c: iLabel){
    if(c){ this.lblCancelBy  = c; }
};
private lblCancelByVal: ContentControl;
@ViewChild("lblCancelByValTempRef", {read:ContentControl, static: false }) set _lblCancelByVal(c: ContentControl){
    if(c){ this.lblCancelByVal  = c; }
};
private lblCancelDttm: iLabel;
@ViewChild("lblCancelDttmTempRef", {read:iLabel, static: false }) set _lblCancelDttm(c: iLabel){
    if(c){ this.lblCancelDttm  = c; }
};
private lblCancelDttmVal: ContentControl;
@ViewChild("lblCancelDttmValTempRef", {read:ContentControl, static: false }) set _lblCancelDttmVal(c: ContentControl){
    if(c){ this.lblCancelDttmVal  = c; }
};
private lblCancelRsn: iLabel;
@ViewChild("lblCancelRsnTempRef", {read:iLabel, static: false }) set _lblCancelRsn(c: iLabel){
    if(c){ this.lblCancelRsn  = c; }
};
private lblCancelRsnVal: iLabel;
@ViewChild("lblCancelRsnValTempRef", {read:iLabel, static: false }) set _lblCancelRsnVal(c: iLabel){
    if(c){ this.lblCancelRsnVal  = c; }
};
private lblAmendment: iLabel;
@ViewChild("lblAmendmentTempRef", {read:iLabel, static: false }) set _lblAmendment(c: iLabel){
    if(c){ this.lblAmendment  = c; }
};
private Amendment: Grid;
@ViewChild("AmendmentTempRef", {read:Grid, static: false }) set _Amendment(c: Grid){
    if(c){ this.Amendment  = c; }
};
private lblAmendmentBy: iLabel;
@ViewChild("lblAmendmentByTempRef", {read:iLabel, static: false }) set _lblAmendmentBy(c: iLabel){
    if(c){ this.lblAmendmentBy  = c; }
};
private lblAmendmentByVal: ContentControl;
@ViewChild("lblAmendmentByValTempRef", {read:ContentControl, static: false }) set _lblAmendmentByVal(c: ContentControl){
    if(c){ this.lblAmendmentByVal  = c; }
};
private lblAmendmentDttm: iLabel;
@ViewChild("lblAmendmentDttmTempRef", {read:iLabel, static: false }) set _lblAmendmentDttm(c: iLabel){
    if(c){ this.lblAmendmentDttm  = c; }
};
private lblAmendmentDttmVal: ContentControl;
@ViewChild("lblAmendmentDttmValTempRef", {read:ContentControl, static: false }) set _lblAmendmentDttmVal(c: ContentControl){
    if(c){ this.lblAmendmentDttmVal  = c; }
};
private lblAmendmentRsn: iLabel;
@ViewChild("lblAmendmentRsnTempRef", {read:iLabel, static: false }) set _lblAmendmentRsn(c: iLabel){
    if(c){ this.lblAmendmentRsn  = c; }
};
private lblAmendmentRsnVal: iLabel;
@ViewChild("lblAmendmentRsnValTempRef", {read:iLabel, static: false }) set _lblAmendmentRsnVal(c: iLabel){
    if(c){ this.lblAmendmentRsnVal  = c; }
};
private lblAmendmentComments: iLabel;
@ViewChild("lblAmendmentCommentsTempRef", {read:iLabel, static: false }) set _lblAmendmentComments(c: iLabel){
    if(c){ this.lblAmendmentComments  = c; }
};
private lblAmendmentCommentsVal: iLabel;
@ViewChild("lblAmendmentCommentsValTempRef", {read:iLabel, static: false }) set _lblAmendmentCommentsVal(c: iLabel){
    if(c){ this.lblAmendmentCommentsVal  = c; }
};

    public ddkey = Resource.DrugDetails;
    ddetChild: medddetailsChild;
    objPrescriptionItemDetailsVM: PrescriptionItemDetailsVM;
    public Styles = ControlStyles;
    public isWizard = MediatorDataService.isWizard;

        constructor() {
            super();
        }

        ngOnInit(): void {
            let viewcheck : any = base.WizardContext;
            if(viewcheck?.IconClick){
                this.isEPRview=true;
            }
            else this.isEPRview=false;
        }
        public maxLayoutHeight;
        ngAfterViewInit(): void {        
            this.MedDrugDetails_Loaded({},null);
            let elem = (document.querySelectorAll('medddetails')[0])?.querySelectorAll('#medddetailsRx')[0];
            if(window.screen.height < 1000 && window.devicePixelRatio != 1.25){
                this.maxLayoutHeight = window.innerHeight -(elem.children[0].scrollHeight + 120);
              }
              else{
                this.maxLayoutHeight = 788;
          
              }
        }

        lblclinicalhistory_MouseLeftButtonUp_Func = (s, e) => {this.lblclinicalhistory_MouseLeftButtonUp(s, e)}
        private lblclinicalhistory_MouseLeftButtonUp(sender: Object, e:MouseButtonEventArgs): void {
            let currentDataContext: PrescriptionItemDetailsVM = ObjectHelper.CreateType<PrescriptionItemDetailsVM>(this.DataContext, PrescriptionItemDetailsVM);
            currentDataContext.ClinicalVerHistLink_Click();
        }
        lblPresItemhistory_MouseLeftButtonUp_Func = (s, e) => {this.lblPresItemhistory_MouseLeftButtonUp(s, e)}
        private lblPresItemhistory_MouseLeftButtonUp(sender: Object, e: MouseButtonEventArgs): void {
            let presItemVm: PrescriptionItemDetailsVM = ObjectHelper.CreateType<PrescriptionItemDetailsVM>(this.DataContext, PrescriptionItemDetailsVM);
            presItemVm.PresModifyHistoryLink_Click();
        }
        lblAmendmentOf_MouseLeftButtonUp_Func = (s, e) => {this.lblAmendmentOf_MouseLeftButtonUp(s, e)}
        private lblAmendmentOf_MouseLeftButtonUp(sender: Object, e: MouseButtonEventArgs): void {
            if (this.DataContext != null) {
                this.objPrescriptionItemDetailsVM = ObjectHelper.CreateType<PrescriptionItemDetailsVM>(this.DataContext, PrescriptionItemDetailsVM);
                let oParam: string[] = new Array(4);
                if (this.objPrescriptionItemDetailsVM != null) {
                    if (this.objPrescriptionItemDetailsVM.DrugDetails != null) {
                        oParam[0] = this.objPrescriptionItemDetailsVM.DrugDetails.IdentifyingName;
                        oParam[3] = this.objPrescriptionItemDetailsVM.DrugDetails.PresType;
                    }
                    if (this.objPrescriptionItemDetailsVM.AdditionalDetails != null) {
                        oParam[1] = this.objPrescriptionItemDetailsVM.AdditionalDetails.ModifiedItemOID.ToString();
                    }
                    oParam[2] = this.objPrescriptionItemDetailsVM.MCVersion;
                }
                if (!String.IsNullOrEmpty(oParam[0]) && !String.IsNullOrEmpty(oParam[1]) && !String.IsNullOrEmpty(oParam[3])) {
                    // ObjectHelper.CreateType<ScriptObject>(HtmlPage.Window.InvokeAsync("OpenDrugDetailsMezzanine", oParam[0],oParam[1],oParam[2],oParam[3]),'ScriptObject');
                    //ObjectHelper.CreateType<ScriptObject>(HtmlPage.Window.InvokeAsync("OpenDrugDetailsMezzanine", oParam),'ScriptObject');
                    if (this.objPrescriptionItemDetailsVM instanceof PrescriptionItemDetailsVM) {
                        this.ddetChild = new medddetailsChild();
                        this.ddetChild.MedDetailsUserControl.PrescriptionItemOID = this.objPrescriptionItemDetailsVM.AdditionalDetails.ModifiedItemOID;
                        this.ddetChild.MedDetailsUserControl.MCVersion = this.objPrescriptionItemDetailsVM.MCVersion;
                        this.ddetChild.MedDetailsUserControl.LorenzoID = this.objPrescriptionItemDetailsVM.sLorenzoID;
                        this.ddetChild.MedDetailsUserControl.ServiceOID = MedChartData.ServiceOID;
                        this.ddetChild.MedDetailsUserControl.LocationOID = MedChartData.LocationOID;
                        this.ddetChild.MedDetailsUserControl.DoseCalcExist = this.objPrescriptionItemDetailsVM.IsDoseCalcExist;
                        this.ddetChild.MedDetailsUserControl.oLaunchFrom = SVIconLaunchFrom.PrescribeLHS;
                        this.ddetChild.MedDetailsUserControl.PresType = this.objPrescriptionItemDetailsVM.PrescriptionType;
                        let sDrugTitle: string = String.Empty;
                        if (
                            String.Compare(
                                this.objPrescriptionItemDetailsVM.itemsubtype,
                                CConstants.SUBTYPE,
                                StringComparison.InvariantCultureIgnoreCase
                            ) == 0
                        )
                            sDrugTitle = Medlistdetails.Multicomponent_Caption;
                        else sDrugTitle = this.objPrescriptionItemDetailsVM.DrugDetails.IdentifyingName;
                        let sWidth = 930;
                        AppActivity.OpenWindow(
                            sDrugTitle,
                            this.ddetChild,
                            (s, e) => {
                                this.ddetChild_Closed(s);
                            },
                            '',
                            false,
                            650,
                            sWidth,
                            false,
                            WindowButtonType.Close,
                            null
                        );
                    }
                }
            }
        }
        ddetChild_Closed(args: AppDialogEventargs): void {
            let oAppDialogWindow = args.AppChildWindow as ChildWindow;
            oAppDialogWindow.DialogResult = true;
        }
        private cmdNext_Click(sender: Object, e: RoutedEventArgs): void {
            if (this.DataContext != null) {
                this.objPrescriptionItemDetailsVM = ObjectHelper.CreateType<PrescriptionItemDetailsVM>(this.DataContext, PrescriptionItemDetailsVM);
                if (this.objPrescriptionItemDetailsVM.objDrugDetailsData != null && this.objPrescriptionItemDetailsVM.objDrugDetailsData.SeqPItemOIDs.Count > 0) {
                    let iIndex: number = this.objPrescriptionItemDetailsVM.objDrugDetailsData.SeqPItemOIDs.IndexOf(this.objPrescriptionItemDetailsVM.lPrescriptionItemOID);
                    let iNextSeqIndex: number = (iIndex >= 0) ? (iIndex + 1) : iIndex;
                    if (iNextSeqIndex >= 0 && (iNextSeqIndex < this.objPrescriptionItemDetailsVM.objDrugDetailsData.SeqPItemOIDs.Count)) {
                        this.objPrescriptionItemDetailsVM.GetDrugDetails(this.objPrescriptionItemDetailsVM.objDrugDetailsData.SeqPItemOIDs[iNextSeqIndex], this.objPrescriptionItemDetailsVM.MCLorenzoID);
                        this.objPrescriptionItemDetailsVM.AdminList = null;
                    }
                }
            }
        }
        private cmdPrevious_Click(sender: Object, e: RoutedEventArgs): void {
            if (this.DataContext != null) {
                this.objPrescriptionItemDetailsVM = ObjectHelper.CreateType<PrescriptionItemDetailsVM>(this.DataContext, PrescriptionItemDetailsVM);
                if (this.objPrescriptionItemDetailsVM.objDrugDetailsData != null && this.objPrescriptionItemDetailsVM.objDrugDetailsData.SeqPItemOIDs.Count > 0) {
                    let iIndex: number = this.objPrescriptionItemDetailsVM.objDrugDetailsData.SeqPItemOIDs.IndexOf(this.objPrescriptionItemDetailsVM.lPrescriptionItemOID);
                    let iPreviousSeqIndex: number = (iIndex >= 0) ? (iIndex - 1) : iIndex;
                    if (iPreviousSeqIndex >= 0 && (iPreviousSeqIndex < this.objPrescriptionItemDetailsVM.objDrugDetailsData.SeqPItemOIDs.Count)) {
                        this.objPrescriptionItemDetailsVM.GetDrugDetails(this.objPrescriptionItemDetailsVM.objDrugDetailsData.SeqPItemOIDs[iPreviousSeqIndex], this.objPrescriptionItemDetailsVM.MCLorenzoID);
                        this.objPrescriptionItemDetailsVM.AdminList = null;
                    }
                }
            }
        }
        private MedDrugDetails_Loaded(sender: Object, e: RoutedEventArgs): void {
            if (this.DataContext != null) {
                this.objPrescriptionItemDetailsVM = ObjectHelper.CreateType<PrescriptionItemDetailsVM>(this.DataContext, PrescriptionItemDetailsVM);
            }
            //Re-visist
            //let l1: number = 837 - (<FrameworkElement>sender).ActualHeight;

            let omedddetails: medddetails = new medddetails();
            //Re-visist
            //omedddetails.Row2.Height = new GridLength(l1);
            if (String.Compare(this.objPrescriptionItemDetailsVM.MedClrSrcView, "Collapsed") == 0 || String.Compare(this.objPrescriptionItemDetailsVM.AuthoriseView, "Collapsed") == 0) {
                //Re-visit
                //this.grdDrugDetCol.Height = new GridLength(391, GridUnitType.Pixel);
            // this.borPresdetails.Margin = new Thickness(2, 10, 2, 10);
            }
            else {
                //Re-Visit
                //this.grdDrugDetCol.Height = new GridLength(411, GridUnitType.Pixel);
            //this.borPresdetails.Margin = new Thickness(2, 10, 2, -10);
            }
        }
        lblonbehalfhistory_MouseLeftButtonUp_Func = (s, e) => {this.lblonbehalfhistory_MouseLeftButtonUp(s, e)}
        private lblonbehalfhistory_MouseLeftButtonUp(sender: Object, e: MouseButtonEventArgs): void {
            if (this.DataContext != null) {
                let oonbehalf: PrescriptionItemDetailsVM = ObjectHelper.CreateType<PrescriptionItemDetailsVM>(this.DataContext, PrescriptionItemDetailsVM);
                oonbehalf.OnBehalfOfLink_Click();
            }
        }
    }
