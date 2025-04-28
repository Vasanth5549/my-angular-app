import { ContextManager, LzoWizard, SLQueryCollection } from "epma-platform/services";
import { CConstants } from "../../utilities/constants";
import { Common } from "../../utilities/common";
//import *as Application from 'src/app/lorappcommonbb/amshelper';
import { MedicationPrescribeVM } from "./medicationprescribevm";
import { WebServiceURLMedicationCommonBB } from "src/app/lorappmedicationcommonbb/utilities/globalvariable";
import { WebServiceURL } from "../../utilities/globalvariable";
import { CommonBB } from "src/app/lorappcommonbb/utilities/common";
import { MedicationCommonBB } from "src/app/lorappmedicationcommonbb/utilities/medicationcommonbb";
import { LockingWarningTimer } from "src/app/lorappmedicationcommonbb/utilities/common";
import { WebServiceURLBB } from "src/app/lorappcommonbb/utilities/globalvariable";
import { ApplicationHelper } from "src/app/shared/epma-platform/services/applicationhelper.service";
import { LzoWizardVmbaseService } from "src/app/shared/epma-platform/services/lzo-wizard-vmbase.service";
import { Component } from "@angular/core";
import {StringComparison} from 'epma-platform/models'
import {RoutedEventArgs} from 'src/app/shared/epma-platform/controls/FrameworkElement'
import { ClinicallyVerifyVM } from "../../viewmodel/clinicallyverifyvm";
import { TechnicallyValidateCAVM } from "../technicallyvalidate/technicallyvalidatecavm";
import { ResolveConflictVM } from "../conflicts/ResolveConflictsVM";
import { SupplyInstructionVM } from "../supply instruction/SupplyInstructionVM";

@Component({
    selector: 'MedicationPrescriptionCA',
    templateUrl: './medicationprescriptionview.html',
    styleUrls: ['./medicationprescriptionview.css']
})

export class MedicationPrescriptionCA extends LzoWizard {
        oVM: MedicationPrescribeVM;
        clinicallyVerifyVM: ClinicallyVerifyVM;
        //Not Required for LHS. To be Re-Visited.
        /*
        authoriseVM: AuthoriseVM;
        clinicallyVerifyVM: ClinicallyVerifyVM;
        
        resolveConflictsCAVM: ResolveConflictVM;
        supplyinstructionVM: SupplyInstructionVM;
        */
        technicallyValidateVM: TechnicallyValidateCAVM;
        page;
        Lockingwarningtimer: LockingWarningTimer = null;
        resolveConflictsCAVM: ResolveConflictVM;
	supplyinstructionVM: SupplyInstructionVM; 
        constructor() {
            super();
            if (ContextManager.Instance["WebServiceServer"] != null) {
                this.SetWebserviceURL(CommonBB.GetURLString(ContextManager.Instance["WebServiceServer"].ToString(), ApplicationHelper.AbsoluteUri));
            }
            this.InvokeForm();
          MedicationCommonBB.GetWarningCategories();
        }
        InvokeForm(): void {
            //Not Required for LHS. To be Re-Visited.
            /*
            if (!String.IsNullOrEmpty(SLQueryCollection.GetQueryStringValue("MenuCode")) && String.Compare(SLQueryCollection.GetQueryStringValue("MenuCode"), "MN_MED_VERIFY_SL_P2", StringComparison.CurrentCultureIgnoreCase) == 0) {
                this.clinicallyVerifyVM = new ClinicallyVerifyVM();
                this.clinicallyVerifyVM.OnTaskCompleted  = (s) => { this.clinicallyVerifyVM_OnTaskCompleted(s); } ;
                this.DataContext = this.clinicallyVerifyVM;
                Common.oIPPMABaseVM = this.clinicallyVerifyVM;
            }
            else if (!String.IsNullOrEmpty(SLQueryCollection.GetQueryStringValue("MenuCode")) && String.Compare(SLQueryCollection.GetQueryStringValue("MenuCode"), "MN_MED_VALIDATE_S_P2", StringComparison.CurrentCultureIgnoreCase) == 0) {
                this.technicallyValidateVM = new TechnicallyValidateCAVM();
                this.technicallyValidateVM.OnTaskCompleted  = (s) => { this.technicallyValidateVM_OnTaskCompleted(s); } ;
                this.DataContext = this.technicallyValidateVM;
            }
            else if (!String.IsNullOrEmpty(SLQueryCollection.GetQueryStringValue("MenuCode")) && String.Compare(SLQueryCollection.GetQueryStringValue("MenuCode"), "MN_MED_AUTHORI_SL_P2", StringComparison.CurrentCultureIgnoreCase) == 0) {
                this.authoriseVM = new AuthoriseVM();
                this.authoriseVM.OnTaskCompleted  = (s) => { this.authoriseVM_OnTaskCompleted(s); } ;
                if (this.authoriseVM.SuspendBuffer == null) {
                    this.DataContext = this.authoriseVM;
                }
            }
            else if (!String.IsNullOrEmpty(SLQueryCollection.GetQueryStringValue("MenuCode")) && String.Equals(SLQueryCollection.GetQueryStringValue("MenuCode"), "MN_RSLV_CONFLICTS")) {
                this.resolveConflictsCAVM = new ResolveConflictVM();
                this.resolveConflictsCAVM.OnTaskCompleted  = (s) => { this.resolveConflictsCAVM_OnTaskCompleted(s); } ;
                this.DataContext = this.resolveConflictsCAVM;
            }
            else if (!String.IsNullOrEmpty(SLQueryCollection.GetQueryStringValue("MenuCode")) && String.Compare(SLQueryCollection.GetQueryStringValue("MenuCode"), "MN_SUPINSTR_P2", StringComparison.CurrentCultureIgnoreCase) == 0) {
                this.supplyinstructionVM = new SupplyInstructionVM();
                this.supplyinstructionVM.OnTaskCompleted  = (s) => { this.supplyinstructionVM_OnTaskCompleted(s); } ;
                this.DataContext = this.supplyinstructionVM;
            }
            else */
            console.log(SLQueryCollection.GetQueryStringValue("MenuCode"));
            
            //   if (!String.IsNullOrEmpty(SLQueryCollection.GetQueryStringValue("MenuCode")) && String.Compare(SLQueryCollection.GetQueryStringValue("MenuCode"), "MN_MED_VALIDATE_S_P2", StringComparison.CurrentCultureIgnoreCase) == 0) {
            //     this.technicallyValidateVM = new TechnicallyValidateCAVM();
            //     this.page = "medTechvalidateCA"
            //     this.DataContext = this.technicallyValidateVM ;
            // } else if (!String.IsNullOrEmpty(SLQueryCollection.GetQueryStringValue("MenuCode")) && String.Equals(SLQueryCollection.GetQueryStringValue("MenuCode"), "MN_RSLV_CONFLICTS")) {
            //     this.resolveConflictsCAVM = new ResolveConflictVM();
            //     this.page = "medfrmconflictsCA"
            //     this.DataContext = this.resolveConflictsCAVM;
            // } else if (!String.IsNullOrEmpty(SLQueryCollection.GetQueryStringValue("MenuCode")) && String.Compare(SLQueryCollection.GetQueryStringValue("MenuCode"), "MN_SUPINSTR_P2", StringComparison.CurrentCultureIgnoreCase) == 0) {
            //     this.supplyinstructionVM = new SupplyInstructionVM();
            //     this.page = "medsupplydispensinginstructionstab"
            //     this.DataContext = this.supplyinstructionVM;
            //}else

            if (!String.IsNullOrEmpty(SLQueryCollection.GetQueryStringValue("MenuCode")) && String.Compare(SLQueryCollection.GetQueryStringValue("MenuCode"), "MN_MED_VERIFY_SL_P2", StringComparison.CurrentCultureIgnoreCase) == 0) {
                
                this.clinicallyVerifyVM = new ClinicallyVerifyVM();
                this.DataContext = this.clinicallyVerifyVM;
                Common.oIPPMABaseVM = this.clinicallyVerifyVM;
                this.page = SLQueryCollection.GetQueryStringValue("MenuCode");
            }
            else if (!String.IsNullOrEmpty(SLQueryCollection.GetQueryStringValue("MenuCode")) && String.Compare(SLQueryCollection.GetQueryStringValue("MenuCode"), "MN_MED_VALIDATE_S_P2", StringComparison.CurrentCultureIgnoreCase) == 0) {
                this.technicallyValidateVM = new TechnicallyValidateCAVM();
                this.DataContext = this.technicallyValidateVM;
                // Common.oLzoWizardVMBase = this.technicallyValidateVM;
                this.page = SLQueryCollection.GetQueryStringValue("MenuCode");
            }
            else if (!String.IsNullOrEmpty(SLQueryCollection.GetQueryStringValue("MenuCode")) && String.Compare(SLQueryCollection.GetQueryStringValue("MenuCode"), "MN_MED_AUTHORI_SL_P2", StringComparison.CurrentCultureIgnoreCase) == 0) {
            }
            else if (!String.IsNullOrEmpty(SLQueryCollection.GetQueryStringValue("MenuCode")) && String.Compare(SLQueryCollection.GetQueryStringValue("MenuCode"), "MN_RSLV_CONFLICTS", StringComparison.CurrentCultureIgnoreCase) == 0) {
                this.resolveConflictsCAVM = new ResolveConflictVM();
                this.page = "MN_RSLV_CONFLICTS"
                this.DataContext = this.resolveConflictsCAVM;
            }
            else if (!String.IsNullOrEmpty(SLQueryCollection.GetQueryStringValue("MenuCode")) && String.Compare(SLQueryCollection.GetQueryStringValue("MenuCode"), "MN_SUPINSTR_P2", StringComparison.CurrentCultureIgnoreCase) == 0) {
                this.supplyinstructionVM = new SupplyInstructionVM();                
                this.DataContext = this.supplyinstructionVM;
                this.page = SLQueryCollection.GetQueryStringValue("MenuCode");
            }
            else{
                this.oVM = new MedicationPrescribeVM();
                this.DataContext = this.oVM;
                Common.oIPPMABaseVM = this.oVM;
                this.page = SLQueryCollection.GetQueryStringValue("MenuCode");
            }

            //  if (!String.IsNullOrEmpty(SLQueryCollection.GetQueryStringValue("MenuCode")) && String.Compare(SLQueryCollection.GetQueryStringValue("MenuCode"), "MN_MEDINPATSL_P2", StringComparison.CurrentCultureIgnoreCase) == 0) {
            //   //  this.supplyinstructionVM = new SupplyInstructionVM();
            //     this.oVM = new MedicationPrescribeVM();
            //     this.DataContext = this.oVM;
            //     Common.oIPPMABaseVM = this.oVM;
            //     this.page = "MN_MEDINPATSL_P2";
              
            // }else{
            //     this.oVM = new MedicationPrescribeVM();
            //     //Revisit required
            //     //this.oVM.OnTaskCompleted  = (s,e) => { this.iPPMABaseVM_OnTaskCompleted(s); } ;
            //     console.log('InvokeForm... ViewDiscontinuedDrugText... before...', this.oVM['ViewDiscontinuedDrugText'], this.DataContext?.ViewDiscontinuedDrugText);
            //     this.DataContext = this.oVM;
            //     Common.oIPPMABaseVM = this.oVM;
            //     console.log('InvokeForm... ViewDiscontinuedDrugText... after...', this.oVM['ViewDiscontinuedDrugText'], this.DataContext['ViewDiscontinuedDrugText']);
            // }
        }
        //Not Required for LHS. To be Re-Visited.
        /*
        technicallyValidateVM_OnTaskCompleted(obj: LzoWizardVMBase): void {
            if (obj.SuspendBuffer != null) {
                this.DataContext = obj.SuspendBuffer;
            }
            else {
                this.DataContext = new TechnicallyValidateCAVM();
            }
        }
        */
        iPPMABaseVM_OnTaskCompleted(obj: LzoWizardVmbaseService): void {
            if (obj.SuspendBuffer != null) {
                this.DataContext = obj.SuspendBuffer;
            }
            else {
                this.DataContext = new MedicationPrescribeVM();
            }
        }
        clinicallyVerifyVM_OnTaskCompleted(obj: LzoWizardVmbaseService): void {
            if (obj.SuspendBuffer != null) {
                this.DataContext = obj.SuspendBuffer;
            }
            else {
                this.DataContext = new ClinicallyVerifyVM();
            }
        }
        //Not Required for LHS. To be Re-Visited.
        /*
        authoriseVM_OnTaskCompleted(obj: LzoWizardVMBase): void {
            if (obj.SuspendBuffer != null) {
                this.DataContext = obj.SuspendBuffer;
            }
            else {
                this.DataContext = new AuthoriseVM();
            }
        }
        resolveConflictsCAVM_OnTaskCompleted(obj: LzoWizardVMBase): void {
            if (obj.SuspendBuffer != null) {
                this.DataContext = obj.SuspendBuffer;
            }
            else {
                this.DataContext = new ResolveConflictVM();
            }
        }
      
        supplyinstructionVM_OnTaskCompleted(obj: LzoWizardVMBase): void {
            if (obj.SuspendBuffer != null) {
                this.DataContext = obj.SuspendBuffer;
            }
            else {
                this.DataContext = new SupplyInstructionVM();
            }
        }
        */
        public Maximized(): void {

        }
        public Minimized(): void {

        }
        public Restored(): void {

        }
        public get Title(): string {
            return "Medication prescription";
        }
        public override LzoWizard_Loaded(sender: Object, e: RoutedEventArgs): void {
            if (!String.IsNullOrEmpty(SLQueryCollection.GetQueryStringValue("MenuCode"))) {
                let CAMenuCode: string = SLQueryCollection.GetQueryStringValue("MenuCode");
                if (String.Equals(CAMenuCode, CConstants.InpatientPrescribeMenuCode, StringComparison.InvariantCultureIgnoreCase) || String.Equals(CAMenuCode, CConstants.ClerkingPrescribeMenuCode, StringComparison.InvariantCultureIgnoreCase) || String.Equals(CAMenuCode, CConstants.LeavePrescribeMenuCode, StringComparison.InvariantCultureIgnoreCase) || String.Equals(CAMenuCode, CConstants.DischargePrescribeMenuCode, StringComparison.InvariantCultureIgnoreCase) || String.Equals(CAMenuCode, CConstants.ForadminPrescribeMenuCode, StringComparison.InvariantCultureIgnoreCase) || String.Equals(CAMenuCode, CConstants.OutPatientPrescribeMenuCode, StringComparison.InvariantCultureIgnoreCase) || String.Equals(CAMenuCode, CConstants.ClinicallyVerifyMenuSL, StringComparison.InvariantCultureIgnoreCase) || String.Equals(CAMenuCode, CConstants.AuthoriseMenuCode, StringComparison.InvariantCultureIgnoreCase)) {
                    this.Lockingwarningtimer = new LockingWarningTimer();
                    this.Lockingwarningtimer.StartWizardTimer();
                }
            }
        }
        private LzoWizard_UnLoaded(sender: Object, e: RoutedEventArgs): void {
            if (this.oVM != null && (this.oVM.IsFinish || this.oVM.IsFinishNow)) {
                this.oVM = null;
                //Not Required for LHS. To be Re-Visited.
                //this.clinicallyVerifyVM = null;
            }
            if (this.Lockingwarningtimer != null) {
                this.Lockingwarningtimer.StopWizardTimer();
            }
        }
        private SetWebserviceURL(sAppSvrPath: string): void {
            WebServiceURLMedicationCommonBB.ManagePrescriptionWS = WebServiceURL.ManagePrescriptionWS = sAppSvrPath + "/ManagePrescription_P2.asmx";
            WebServiceURLMedicationCommonBB.MedicationMgmtWS = WebServiceURL.MedicationMgmtWS = sAppSvrPath + "/MedicationMgmt_P2.asmx";
            WebServiceURL.QueryCareEventsWS = sAppSvrPath + "/QueryCareEvents.asmx";
            WebServiceURL.CTerminologyWSWS = sAppSvrPath + "/CTerminologyWS.asmx";
            WebServiceURL.CBCFormsWS = sAppSvrPath + "/CBCForms.asmx";
            WebServiceURLMedicationCommonBB.ManageProblemWS = sAppSvrPath + "/ManageProblem.asmx";
            WebServiceURLMedicationCommonBB.ManageAllergyWS = sAppSvrPath + "/ManageAllergy.asmx";
            WebServiceURL.CTeamManagementWS = sAppSvrPath + "/CTeamManagement.asmx";
            WebServiceURLBB.CReferenceWSWS = WebServiceURL.CReferenceWSWS = sAppSvrPath + "/CReferenceWS.asmx";
            WebServiceURLBB.QueryPatientRecordWS = sAppSvrPath + "/QueryPatientRecord.asmx";
            WebServiceURLMedicationCommonBB.QueryInpatientWS = sAppSvrPath + "/QueryInpatient.asmx";
            WebServiceURLMedicationCommonBB.MedicationAdministrationWS = WebServiceURL.MedicationAdminWS = sAppSvrPath + "/MedicationAdministration_P2.asmx";
            WebServiceURLMedicationCommonBB.IPPMAManagePrescriptionWS = WebServiceURL.IPPMAManagePrescriptionWS = sAppSvrPath + "/IPPMAManagePrescription_P2.asmx";
            WebServiceURLMedicationCommonBB.ManageSecurityWS = sAppSvrPath + "/CSecurityManagementService.asmx";
            WebServiceURLMedicationCommonBB.SecurityAuthenticationWS = sAppSvrPath + "/CSecurityAuthenticationService.asmx";
            WebServiceURL.IPPMAPrescribableDefnWS = sAppSvrPath + "/IPPMAPrescribableDefn_P2.asmx";
            WebServiceURL.ResultManagementWS = sAppSvrPath + "/ResultManagement.asmx";
            WebServiceURL.CBCDataitemsWS = sAppSvrPath + "/CBCDataitems.asmx";
            WebServiceURL.ClinicalNotingWS = sAppSvrPath + "/QueryClinicalnoting.asmx";
        }
    }
