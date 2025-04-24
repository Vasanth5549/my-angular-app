import { Component, OnInit } from '@angular/core';
import { StringBuilder,ProfileFactoryType,ContextManager,Convert,AppActivity, LzoWizard, SLQueryCollection} from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp,Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison,AppDialogEventargs, AppDialogResult, DelegateArgs, DialogComponentArgs, WindowButtonType } from 'epma-platform/models';
import { AppDialog, Uri, UriKind } from 'epma-platform/controls';
import { HelperService} from 'epma-platform/soapclient';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
import { PGDAdminstrationVM } from '../../viewmodel/pgdvm';
import { MedicationRequestVM } from '../../viewmodel/MedicationRequestVM';
import { CommonBB } from "src/app/lorappcommonbb/utilities/common";
import { ApplicationHelper } from "src/app/shared/epma-platform/services/applicationhelper.service";
import { MedicationCommonBB } from 'src/app/lorappmedicationcommonbb/utilities/medicationcommonbb';
import { ChartContext, MedChartData, WebServiceURL } from '../../utilities/globalvariable';
import { RoutedEventArgs } from 'src/app/shared/epma-platform/controls/Control';
import { LzoWizardVmbaseService as LzoWizardVMBase } from 'src/app/shared/epma-platform/services/lzo-wizard-vmbase.service'
import { WebServiceURLMedicationCommonBB } from 'src/app/lorappmedicationcommonbb/utilities/globalvariable';
import { WebServiceURLBB } from 'src/app/lorappcommonbb/utilities/globalvariable';
import { Common } from '../../utilities/common';
import { PrescriptionChartVM } from '../prescriptionchart/prescriptionchartvm';
import { CConstants } from '../../utilities/CConstants';
import { MedicationAdminVM } from './medicationadminvm';
import { InfrecordadminVM } from '../../viewmodel/InfrecordadminVM';
import { CALaunch } from 'src/app/shared/epma-platform/soap-client/MedicationAdministrationWS';
import { ObservationChartVM } from '../observationchart/ObservationChartVM';
// import { ResourceDictionary } from 'src/app/shared/epma-platform/models/ResourceDictionary';

@Component({
    selector: 'MedicationAdminView',
    templateUrl: './medicationadminview.html',
})
    export class MedicationAdminView extends LzoWizard  {
        // TH
        oPrescriptionChartVM: PrescriptionChartVM;
        oObservationChartVM: ObservationChartVM;
        oPGDAdminstrationVM: PGDAdminstrationVM;
         oInfrecordadminVM: InfrecordadminVM;
        oMedicationRequestVM: MedicationRequestVM;
        page: string = "MN_MEDCHART_P2";
        constructor() {
            super();
            // InitializeComponent();
            if (ContextManager.Instance["WebServiceServer"] != null) {
                this.SetWebserviceURL(CommonBB.GetURLString(ContextManager.Instance["WebServiceServer"].ToString(), ApplicationHelper.AbsoluteUri));
            }
            this.InvokeForm();
            MedicationCommonBB.GetWarningCategories();
        }
        InvokeForm(): void {
            this.page = SLQueryCollection.GetQueryStringValue("MenuCode");
            ChartContext.ChartLaunchDTTM = DateTime.Now;
            if (!String.IsNullOrEmpty(SLQueryCollection.GetQueryStringValue("MenuCode")) && String.Compare(SLQueryCollection.GetQueryStringValue("MenuCode"), "MN_PRESCCHART_P2", StringComparison.CurrentCultureIgnoreCase) == 0) {
                // TH
                this.oPrescriptionChartVM = Common.GBLoPrescriptionChartVM = new PrescriptionChartVM();
               //this.oPrescriptionChartVM.OnTaskCompleted  = (s,e) => { this.PrescriptionChartVM_OnTaskCompleted(s,e); } ;
                if (this.oPrescriptionChartVM.SuspendBuffer == null) {
                    this.DataContext = this.oPrescriptionChartVM;
                }
                this.page = "MN_PRESCCHART_P2";
                
            }
            else if (!String.IsNullOrEmpty(SLQueryCollection.GetQueryStringValue("MenuCode")) && String.Compare(SLQueryCollection.GetQueryStringValue("MenuCode"), "MN_OBSERESULTCHAR_P2", StringComparison.CurrentCultureIgnoreCase) == 0) {
                // TODO uncommenting this since it is related to observation
                this.oObservationChartVM = new ObservationChartVM();
                //TODO OnTaskCompleted should be implemented in the base but as per this framework it is never getting executed. We'll have to find a way to run it 
                //this.oObservationChartVM.OnTaskCompleted  = (s,e) => { this.ObservationChartVM_OnTaskCompleted(s,e); } ;
                if (this.oObservationChartVM.SuspendBuffer == null) {
                    this.DataContext = this.oObservationChartVM;
                }
                this.page = "MN_OBSERESULTCHAR_P2";
            }
            else if (!String.IsNullOrEmpty(SLQueryCollection.GetQueryStringValue("MenuCode")) && String.Compare(SLQueryCollection.GetQueryStringValue("MenuCode"), "MN_RECORDPGD_P2", StringComparison.CurrentCultureIgnoreCase) == 0) {
                //TH
                this.oPGDAdminstrationVM = new PGDAdminstrationVM();
                // this.oPGDAdminstrationVM.OnTaskCompleted  = (s,e) => { oPGDAdminstrationVM_OnTaskCompleted(s,e); } ;
                if (this.oPGDAdminstrationVM.SuspendBuffer == null) {
                    this.DataContext = this.oPGDAdminstrationVM;
                }
                this.page = "MN_RECORDPGD_P2";
            }
            else if (!String.IsNullOrEmpty(SLQueryCollection.GetQueryStringValue("MenuCode")) && String.Compare(SLQueryCollection.GetQueryStringValue("MenuCode"), "MN_INF_RECADMIN", StringComparison.CurrentCultureIgnoreCase) == 0) {
                //TH
                this.oInfrecordadminVM = new InfrecordadminVM();
                this.oInfrecordadminVM.CACode = CALaunch.FluidBalnce.ToString();
               // this.oInfrecordadminVM.OnTaskCompleted  = (s,e) => { oInfrecordadminVM_OnTaskCompleted(e); } ;
                if (this.oInfrecordadminVM.SuspendBuffer == null) {
                    this.DataContext = this.oInfrecordadminVM;
                }
            }
            else if (!String.IsNullOrEmpty(SLQueryCollection.GetQueryStringValue("MenuCode")) && String.Compare(SLQueryCollection.GetQueryStringValue("MenuCode"), CConstants.RequestMedication, StringComparison.CurrentCultureIgnoreCase) == 0) {
                this.oMedicationRequestVM = new MedicationRequestVM();
                
                // this.oMedicationRequestVM.OnTaskCompleted  = (s,e) => { oMedicationRequestVM_OnTaskCompleted(s,e); } ;
                if (this.oMedicationRequestVM.SuspendBuffer == null) {
                    this.DataContext = this.oMedicationRequestVM;
                }
		 this.page = "MN_MED_REQUEST";
            }
            else {
                MedChartData.oMedAdminVM = Common.GBLoMedicationAdminVM = new MedicationAdminVM();
                // MedChartData.oMedAdminVM.OnTaskCompleted  = (s) => { this.MedAdminVM_OnTaskCompleted(s); } ;
                if (MedChartData.oMedAdminVM.SuspendBuffer == null) {
                    this.DataContext = MedChartData.oMedAdminVM;
                }
            }
        }
        private LzoWizard_UnLoaded(sender: Object, e: RoutedEventArgs): void {
            if (MedChartData.oMedAdminVM != null) {
                // MedChartData.oMedAdminVM.OnTaskCompleted -= MedAdminVM_OnTaskCompleted;
                MedChartData.oMedAdminVM.DoCleanUP();
                MedChartData.oMedAdminVM = null;
                this.DataContext = null;
            }
        }
        oInfrecordadminVM_OnTaskCompleted(obj: LzoWizardVMBase): void {
            if (obj.SuspendBuffer != null) {
                this.DataContext = obj.SuspendBuffer;
            }
            else {
                this.DataContext = new InfrecordadminVM();
            }
        }
        oPGDAdminstrationVM_OnTaskCompleted(obj: LzoWizardVMBase): void {
            if (obj.SuspendBuffer != null) {
                this.DataContext = obj.SuspendBuffer;
            }
            else {
                this.DataContext = new PGDAdminstrationVM();
            }
        }
        MedAdminVM_OnTaskCompleted(obj: LzoWizardVMBase): void {
            if (obj.SuspendBuffer != null) {
                this.DataContext = obj.SuspendBuffer;
            }
            else {
                this.DataContext = new MedicationAdminVM();
            }
        }
        ObservationChartVM_OnTaskCompleted(obj: LzoWizardVMBase): void {
            if (obj.SuspendBuffer != null) {
                this.DataContext = obj.SuspendBuffer;
            }
            else {

            }
        }
        PrescriptionChartVM_OnTaskCompleted(obj: LzoWizardVMBase): void {
            if (obj.SuspendBuffer != null) {
                this.DataContext = obj.SuspendBuffer;
            }
            else {
                this.DataContext = new PrescriptionChartVM();
            }
        }
        oMedicationRequestVM_OnTaskCompleted(obj: LzoWizardVMBase): void {
            if (obj.SuspendBuffer != null) {
                this.DataContext = obj.SuspendBuffer;
            }
            else {
                this.DataContext = new MedicationRequestVM();
            }
        }
        private SetWebserviceURL(sAppSvrPath: string): void {
            WebServiceURLMedicationCommonBB.ManagePrescriptionWS = sAppSvrPath + "/ManagePrescription_P2.asmx";
            WebServiceURLMedicationCommonBB.MedicationMgmtWS = sAppSvrPath + "/MedicationMgmt_P2.asmx";
            WebServiceURLBB.CReferenceWSWS = sAppSvrPath + "/CReferenceWS.asmx";
            WebServiceURLMedicationCommonBB.IPPMAManagePrescriptionWS = sAppSvrPath + "/IPPMAManagePrescription_P2.asmx";
            WebServiceURLMedicationCommonBB.MedicationAdministrationWS = sAppSvrPath + "/MedicationAdministration_P2.asmx";
            WebServiceURLMedicationCommonBB.ManageSecurityWS = sAppSvrPath + "/CSecurityManagementService.asmx";
            WebServiceURLMedicationCommonBB.SecurityAuthenticationWS = sAppSvrPath + "/CSecurityAuthenticationService.asmx";
            WebServiceURLBB.QueryPatientRecordWS = sAppSvrPath + "/QueryPatientRecord.asmx";
            WebServiceURL.PrescribableDefnnWS = sAppSvrPath + "/IPPMAPrescribableDefn_P2.asmx";
            WebServiceURL.QueryCareEventsWS = sAppSvrPath + "/QueryCareEvents.asmx";
            WebServiceURL.ManageCBCFormsWS = sAppSvrPath + "/CBCForms.asmx";
            WebServiceURL.ResultManagementWS = sAppSvrPath + "/ResultManagement.asmx";
            WebServiceURLMedicationCommonBB.ManageProblemWS = sAppSvrPath + "/ManageProblem.asmx";
            WebServiceURLMedicationCommonBB.ManageAllergyWS = sAppSvrPath + "/ManageAllergy.asmx";
            WebServiceURLMedicationCommonBB.QueryInpatientWS = sAppSvrPath + "/QueryInpatient.asmx";
        }
        public Maximized(): void {

        }
        public Minimized(): void {

        }
        public Restored(): void {

        }
        public get Title(): string {
            return "Medication Chart View";
        }
        public override LzoWizard_Loaded(sender: Object, e: RoutedEventArgs): void {
            // let dict: ResourceDictionary = new ResourceDictionary();
            // let _uri: Uri = new Uri("/LorAppMedicationAdminBBUI_P2;Component/Themes/DrugHeaderStyle.xaml", UriKind.Relative);
            // dict.Source = _uri;
            // App.Current.Resources.MergedDictionaries.Add(dict);
            ChartContext.ChartLaunchDTTM = DateTime.Now;
        }
    }
