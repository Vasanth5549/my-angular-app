import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { StringBuilder,ProfileFactoryType,ContextManager,Convert,AppActivity} from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp,Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison,AppDialogEventargs, AppDialogResult, DelegateArgs, DialogComponentArgs, WindowButtonType } from 'epma-platform/models';
import { AppDialog, Grid, UserControl, iButton, iLabel } from 'epma-platform/controls';
import { HelperService} from 'epma-platform/soapclient';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
import { RoutedEventArgs } from 'src/app/shared/epma-platform/controls/Control';
import * as ControlStyles from "../../shared/epma-platform/controls/ControlStyles";
import { Resource } from "../resource";
import { PrescriptionItemDetailsVM } from "../viewmodel/prescriptionitemdetailsvm";
import { PrescriptionTypes } from "../utilities/constants";


@Component({
    selector: 'MedAdditionalDetails',
    templateUrl: './medadditionaldetails.html',
    styleUrls: ['./medadditionaldetails.css']
})

export class MedAdditionalDetails extends UserControl {

private LayoutRoot: Grid;

@ViewChild("LayoutRootTempRef", {read:Grid, static: false }) set _LayoutRoot(c: Grid){
    if(c){ this.LayoutRoot  = c; }
};
private lblFormulary: iLabel;
@ViewChild("lblFormularyTempRef", {read:iLabel, static: false }) set _lblFormulary(c: iLabel){
    if(c){ this.lblFormulary  = c; }
};
private lblFormularyVal: iLabel;
@ViewChild("lblFormularyValTempRef", {read:iLabel, static: false }) set _lblFormularyVal(c: iLabel){
    if(c){ this.lblFormularyVal  = c; }
};
private lblNonFormularyRsnName: iLabel;
@ViewChild("lblNonFormularyRsnNameTempRef", {read:iLabel, static: false }) set _lblNonFormularyRsnName(c: iLabel){
    if(c){ this.lblNonFormularyRsnName  = c; }
};
private lblNonFormularyRsn: iLabel;
@ViewChild("lblNonFormularyRsnTempRef", {read:iLabel, static: false }) set _lblNonFormularyRsn(c: iLabel){
    if(c){ this.lblNonFormularyRsn  = c; }
};
private lblNonFormularyRsnNameMCI: iLabel;
@ViewChild("lblNonFormularyRsnNameMCITempRef", {read:iLabel, static: false }) set _lblNonFormularyRsnNameMCI(c: iLabel){
    if(c){ this.lblNonFormularyRsnNameMCI  = c; }
};
private lblNonFormularyRsnMCI: iLabel;
@ViewChild("lblNonFormularyRsnMCITempRef", {read:iLabel, static: false }) set _lblNonFormularyRsnMCI(c: iLabel){
    if(c){ this.lblNonFormularyRsnMCI  = c; }
};
private lblEndorsement: iLabel;
@ViewChild("lblEndorsementTempRef", {read:iLabel, static: false }) set _lblEndorsement(c: iLabel){
    if(c){ this.lblEndorsement  = c; }
};
private lblEndorsementprop: iLabel;
@ViewChild("lblEndorsementpropTempRef", {read:iLabel, static: false }) set _lblEndorsementprop(c: iLabel){
    if(c){ this.lblEndorsementprop  = c; }
};
private lblConsultantName: iLabel;
@ViewChild("lblConsultantNameTempRef", {read:iLabel, static: false }) set _lblConsultantName(c: iLabel){
    if(c){ this.lblConsultantName  = c; }
};
private lblConsultant: iLabel;
@ViewChild("lblConsultantTempRef", {read:iLabel, static: false }) set _lblConsultant(c: iLabel){
    if(c){ this.lblConsultant  = c; }
};
private lblhealthOrgName: iLabel;
@ViewChild("lblhealthOrgNameTempRef", {read:iLabel, static: false }) set _lblhealthOrgName(c: iLabel){
    if(c){ this.lblhealthOrgName  = c; }
};
private lblhealthOrg: iLabel;
@ViewChild("lblhealthOrgTempRef", {read:iLabel, static: false }) set _lblhealthOrg(c: iLabel){
    if(c){ this.lblhealthOrg  = c; }
};
private lblSpecialtyName: iLabel;
@ViewChild("lblSpecialtyNameTempRef", {read:iLabel, static: false }) set _lblSpecialtyName(c: iLabel){
    if(c){ this.lblSpecialtyName  = c; }
};
private lblSpecialty: iLabel;
@ViewChild("lblSpecialtyTempRef", {read:iLabel, static: false }) set _lblSpecialty(c: iLabel){
    if(c){ this.lblSpecialty  = c; }
};
private lblPrescriptionnumberName: iLabel;
@ViewChild("lblPrescriptionnumberNameTempRef", {read:iLabel, static: false }) set _lblPrescriptionnumberName(c: iLabel){
    if(c){ this.lblPrescriptionnumberName  = c; }
};
private lblPrescriptionnumber: iLabel;
@ViewChild("lblPrescriptionnumberTempRef", {read:iLabel, static: false }) set _lblPrescriptionnumber(c: iLabel){
    if(c){ this.lblPrescriptionnumber  = c; }
};
private lblPrescriptionitemnumberName: iLabel;
@ViewChild("lblPrescriptionitemnumberNameTempRef", {read:iLabel, static: false }) set _lblPrescriptionitemnumberName(c: iLabel){
    if(c){ this.lblPrescriptionitemnumberName  = c; }
};
private lblPrescriptionitemnumber: iLabel;
@ViewChild("lblPrescriptionitemnumberTempRef", {read:iLabel, static: false }) set _lblPrescriptionitemnumber(c: iLabel){
    if(c){ this.lblPrescriptionitemnumber  = c; }
};
private lblClerkSrcRefNumberName: iLabel;
@ViewChild("lblClerkSrcRefNumberNameTempRef", {read:iLabel, static: false }) set _lblClerkSrcRefNumberName(c: iLabel){
    if(c){ this.lblClerkSrcRefNumberName  = c; }
};
private lblClerkSrcRefNumber: iLabel;
@ViewChild("lblClerkSrcRefNumberTempRef", {read:iLabel, static: false }) set _lblClerkSrcRefNumber(c: iLabel){
    if(c){ this.lblClerkSrcRefNumber  = c; }
};
private lblBatchName: iLabel;
@ViewChild("lblBatchNameTempRef", {read:iLabel, static: false }) set _lblBatchName(c: iLabel){
    if(c){ this.lblBatchName  = c; }
};
private lblBatch: iLabel;
@ViewChild("lblBatchTempRef", {read:iLabel, static: false }) set _lblBatch(c: iLabel){
    if(c){ this.lblBatch  = c; }
};
private lblReviewDetails: iLabel;
@ViewChild("lblReviewDetailsTempRef", {read:iLabel, static: false }) set _lblReviewDetails(c: iLabel){
    if(c){ this.lblReviewDetails  = c; }
};
private lblReviewDetailsData: iLabel;
@ViewChild("lblReviewDetailsDataTempRef", {read:iLabel, static: false }) set _lblReviewDetailsData(c: iLabel){
    if(c){ this.lblReviewDetailsData  = c; }
};
private lblNoofName: iLabel;
@ViewChild("lblNoofNameTempRef", {read:iLabel, static: false }) set _lblNoofName(c: iLabel){
    if(c){ this.lblNoofName  = c; }
};
private lblNoInstalments: iLabel;
@ViewChild("lblNoInstalmentsTempRef", {read:iLabel, static: false }) set _lblNoInstalments(c: iLabel){
    if(c){ this.lblNoInstalments  = c; }
};
private lblIntervalName: iLabel;
@ViewChild("lblIntervalNameTempRef", {read:iLabel, static: false }) set _lblIntervalName(c: iLabel){
    if(c){ this.lblIntervalName  = c; }
};
private lblIntervalInstalments: iLabel;
@ViewChild("lblIntervalInstalmentsTempRef", {read:iLabel, static: false }) set _lblIntervalInstalments(c: iLabel){
    if(c){ this.lblIntervalInstalments  = c; }
};
private lblInstalmentinstructions: iLabel;
@ViewChild("lblInstalmentinstructionsTempRef", {read:iLabel, static: false }) set _lblInstalmentinstructions(c: iLabel){
    if(c){ this.lblInstalmentinstructions  = c; }
};
private lblInsinstruction: iLabel;
@ViewChild("lblInsinstructionTempRef", {read:iLabel, static: false }) set _lblInsinstruction(c: iLabel){
    if(c){ this.lblInsinstruction  = c; }
};
private lblDispensing: iLabel;
@ViewChild("lblDispensingTempRef", {read:iLabel, static: false }) set _lblDispensing(c: iLabel){
    if(c){ this.lblDispensing  = c; }
};
private lblDisInstruction: iLabel;
@ViewChild("lblDisInstructionTempRef", {read:iLabel, static: false }) set _lblDisInstruction(c: iLabel){
    if(c){ this.lblDisInstruction  = c; }
};
private lblSupplyIns: iLabel;
@ViewChild("lblSupplyInsTempRef", {read:iLabel, static: false }) set _lblSupplyIns(c: iLabel){
    if(c){ this.lblSupplyIns  = c; }
};
private lblSupplyInstruction: iLabel;
@ViewChild("lblSupplyInstructionTempRef", {read:iLabel, static: false }) set _lblSupplyInstruction(c: iLabel){
    if(c){ this.lblSupplyInstruction  = c; }
};
private lblSupplyCom: iLabel;
@ViewChild("lblSupplyComTempRef", {read:iLabel, static: false }) set _lblSupplyCom(c: iLabel){
    if(c){ this.lblSupplyCom  = c; }
};
private lblSupplyComments: iLabel;
@ViewChild("lblSupplyCommentsTempRef", {read:iLabel, static: false }) set _lblSupplyComments(c: iLabel){
    if(c){ this.lblSupplyComments  = c; }
};
private cmdSupplyDispIns: iLabel;
@ViewChild("cmdSupplyDispInsTempRef", {read:iLabel, static: false }) set _cmdSupplyDispIns(c: iLabel){
    if(c){ this.cmdSupplyDispIns  = c; }
};
private lblStationery: iLabel;
@ViewChild("lblStationeryTempRef", {read:iLabel, static: false }) set _lblStationery(c: iLabel){
    if(c){ this.lblStationery  = c; }
};
private lblStationryType: iLabel;
@ViewChild("lblStationryTypeTempRef", {read:iLabel, static: false }) set _lblStationryType(c: iLabel){
    if(c){ this.lblStationryType  = c; }
};

    public ddkey = Resource.DrugDetails;
    public Styles = ControlStyles;
    public maxLayoutHeight;
    constructor() {
        super();
    }
    //InitializeComponent();
    ngAfterViewInit(): void {
        this.MedAdditionalDetails_Loaded({},null);
        let elem = (document.querySelectorAll('medddetails')[0])?.querySelectorAll('#medddetailsRx')[0];
        if(window.screen.height < 1000 && window.devicePixelRatio != 1.25){
            this.maxLayoutHeight = window.innerHeight - (elem.children[0].scrollHeight + 150);
          }
        //   else{
        //     this.maxLayoutHeight = 788;
      
        //   }
    
     }
        MedAdditionalDetails_Loaded(sender: Object, e: RoutedEventArgs): void {
            if (this.DataContext != null) {
                let objPrescriptionItemDetailsVM: PrescriptionItemDetailsVM = ObjectHelper.CreateType<PrescriptionItemDetailsVM>(this.DataContext, PrescriptionItemDetailsVM);
                objPrescriptionItemDetailsVM.GetAdditionalDetails(objPrescriptionItemDetailsVM.PrescriptionItemOID);
                if (objPrescriptionItemDetailsVM != null && objPrescriptionItemDetailsVM.DrugDetails != null) {
                    if ((String.Equals(objPrescriptionItemDetailsVM.DrugDetails.PresType, PrescriptionTypes.ForAdministration) && String.Equals(objPrescriptionItemDetailsVM.AdditionalDetails.IsPGD.ToString(), "1")) || String.Equals(objPrescriptionItemDetailsVM.DrugDetails.PresType, PrescriptionTypes.Inpatient) || String.Equals(objPrescriptionItemDetailsVM.DrugDetails.PresType, PrescriptionTypes.Clerking)) {
                        objPrescriptionItemDetailsVM.bAdditionalview = "Collapsed";
                        if (String.Equals(objPrescriptionItemDetailsVM.DrugDetails.PresType, PrescriptionTypes.Inpatient)) {
                            objPrescriptionItemDetailsVM.bsuppydispensingfields = "Visible";
                        }
                        else {
                            objPrescriptionItemDetailsVM.bsuppydispensingfields = "Collapsed";
                        }
                    }
                    else {
                        objPrescriptionItemDetailsVM.bAdditionalview = "Visible";
                        objPrescriptionItemDetailsVM.bsuppydispensingfields = "Visible";
                    }
                    if (objPrescriptionItemDetailsVM != null && objPrescriptionItemDetailsVM.DrugDetails != null) {
                        if ((String.Compare(objPrescriptionItemDetailsVM.DrugDetails.PresType, PrescriptionTypes.ForAdministration) != 0)) {

                        }
                    }
                }
            }
        }

        cmdSupplyDispIns_Click_Func = (s, e) => {
            this.cmdSupplyDispIns_Click(s, e);    
        }
        public cmdSupplyDispIns_Click(sender?: Object, e?: any): void {
            if (this.DataContext && this.DataContext && this.DataContext.AdditionalDetails && this.DataContext.AdditionalDetails.IsSupDispInstforCompo) {
                let objPrescriptionItemDetailsVM: PrescriptionItemDetailsVM = ObjectHelper.CreateType<PrescriptionItemDetailsVM>(this.DataContext, PrescriptionItemDetailsVM);
                objPrescriptionItemDetailsVM.GetSupDispInst(objPrescriptionItemDetailsVM.PrescriptionItemOID);
                //Re-Visit
                objPrescriptionItemDetailsVM.SupplyInstruction_Click();
            }
        }
    }
