import { AddPrescribingConfigData, CChartDisplayConfig, CMedicationLineDisplayData, CSlotCharacteristicsConfig, GPConnectConfiguration, MedDrugDisplayConfigData, MedDrugInfoData, MedicationResultsViewCount, MedicationSearchConfigData, MedicationViewConfigData, PrescribingConfigData, PrescribingMethodConfigData } from 'src/app/lorappslprofiletypes/medication';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, ViewChild } from '@angular/core';
import { StringBuilder,ProfileFactoryType,ContextManager,Convert,AppActivity, MediatorDataService, base} from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp,Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison,AppDialogEventargs, AppDialogResult, DelegateArgs, DialogComponentArgs, WindowButtonType, Visibility, iAppDialogWindow, List,  GridConfig, ClinicalVerificationConfiguration, InfusionPresConfigData } from 'epma-platform/models';
import { AppDialog, ContentPresenter, iTab, iTabItem, TextBlock, UserControl, Image, HeaderImageAlignment, StackPanel, WrapPanel, Grid } from 'epma-platform/controls';
import { HelperService} from 'epma-platform/soapclient';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
import { RowDefinition } from 'src/app/shared/epma-platform/controls/epma-grid/epma-grid.component';
import { RoutedEventArgs } from 'src/app/shared/epma-platform/controls/FrameworkElement';
import { MedicationCommonBB } from '../utilities/medicationcommonbb';
import { MedicationCommonProfileData } from '../utilities/profiledata';
import { PrescriptionItemDetailsVM } from '../viewmodel/prescriptionitemdetailsvm';
import { CConstants, MedImage, MedImages, PrescriptionTypes, SVIconLaunchFrom } from '../utilities/constants';
import { LineDisplayHelper } from '../converter/medicationconverters';
import { Resource } from '../resource';
import { MedDrugDetails } from './meddrugdetails';
import { medvalidations } from './medvalidations';
import { MedAdditionalDetails } from './medadditionaldetails';
import { MedPGDforAdmin } from './medpgdforadmin';
import { medreviewhistorydetails } from './medreviewhistorydetails';
import { Panel } from 'src/app/shared/epma-platform/controls/Panel';
import { meddrc } from './meddrc';
import { MedTechnicalDetails } from './medtechnicaldetails';
import { MedAdminDetails } from './medadmindetails';
import { MedsAdminEventDetails } from './medsadmineventdetails';
import { IPPMABaseVM } from 'src/app/lorappmanageprescriptionbbui/viewmodel/ippmabasevm';
import { ProfileData } from 'src/app/lorappmanageprescriptionbbui/utilities/profiledata';

@Component({
	selector: 'medddetails',
	templateUrl: './medddetails.html',
        styleUrls: ['./medddetails.css']
}) 

export class medddetails extends UserControl {

    private LayoutRoot: Grid;
    @ViewChild("LayoutRootTempRef", {read:Grid, static: false }) set _LayoutRoot(c: Grid){
        if(c){ this.LayoutRoot  = c; }
    };
    private Row1: RowDefinition;
    @ViewChild("Row1TempRef", {read:RowDefinition, static: false }) set _Row1(c: RowDefinition){
        if(c){ this.Row1  = c; }
    };
    private Row2: RowDefinition;
    @ViewChild("Row2TempRef", {read:RowDefinition, static: false }) set _Row2(c: RowDefinition){
        if(c){ this.Row2  = c; }
    };
    private MedLineDisplay: ContentPresenter;
    @ViewChild("MedLineDisplayTempRef", {read:ContentPresenter, static: false }) set _MedLineDisplay(c: ContentPresenter){
        if(c){ this.MedLineDisplay  = c; }
    };
    private OmitTextLabel: ContentPresenter;
    @ViewChild("OmitTextLabelTempRef", {read:ContentPresenter, static: false }) set _OmitTextLabel(c: ContentPresenter){
        if(c){ this.OmitTextLabel  = c; }
    };
    private ScheduleTimes: ContentPresenter;
    @ViewChild("ScheduleTimesTempRef", {read:ContentPresenter, static: false }) set _ScheduleTimes(c: ContentPresenter){
        if(c){ this.ScheduleTimes  = c; }
    };
    private ftbMedDetailsTabs: iTab;
    @ViewChild("ftbMedDetailsTabsTempRef", {read:iTab, static: false }) set _ftbMedDetailsTabs(c: iTab){
        if(c){ this.ftbMedDetailsTabs  = c; }
    };
    
        @Input() PrescriptionItemOID: number;
        @Input() MCVersion: string;
        @Input() sDefaultTab: string;
        @Input() LorenzoID: string;
        @Input() TechValDef: boolean;
        @Input() ServiceOID: number;
        @Input() LocationOID: number;
        @Input() DoseCalcExist: string;
        @Input() oLaunchFrom: SVIconLaunchFrom;
        @Input() PresType: string = String.Empty;
        bConfDefaultTab: boolean = false;
        bDrugDefaultTab: boolean = false;
        bTVDefaultTab: boolean = false;
        oMedDrugDetails: MedDrugDetails;
        omedvalidations: medvalidations;

        omedDRC: meddrc;
        oMedAdditionalDetails: MedAdditionalDetails;
        oMedTechnicalDetails: MedTechnicalDetails;
        oMedAdminDetails: MedAdminDetails;
        oMedsAdminEventDetails : MedsAdminEventDetails;
        oMedPGDforAdmin: MedPGDforAdmin;
        oMedReviewHistoryDetails: medreviewhistorydetails;
        oMedicationDrugDetailsVM: PrescriptionItemDetailsVM;
        LabelForOmit: string = String.Empty;
        isEPRview:boolean;
        public isWizard = MediatorDataService.isWizard;
        
        constructor(private cdr?: ChangeDetectorRef) {
            super(); 
        }

        ftbMedDetailsTabs_SelectionChanged_Func = (s,e)  => {
            setTimeout(() => {
                this.cdr.detectChanges();
            }, 10);
        };

        ngOnInit(): void {
        let viewcheck : any = base.WizardContext;
        if(viewcheck?.IconClick != undefined){
            this.isEPRview=true;
        }
        else this.isEPRview=false;
        }
        ngAfterViewInit(): void {
            if(!MedicationCommonProfileData.MedLineDisplay)   {
                this.GetProfileData();
            }
            this.medddetails_Loaded({},null);
            // setTimeout(() => {
            //     this.SetDynamicFormviewerHeight();
            // }, 500);   
        }

        public formviewerHeight = "";
        SetDynamicFormviewerHeight(){
            let elem = (document.querySelectorAll('medddetails')[0])?.querySelectorAll('#medddetailsRx')[0];
            if(elem && elem.children.length > 1){
                // (overallHeight - (header + footer + padding)) 650 - (33 + 50 + 32) = 535 //elem.scrollHeight;
                // (document.querySelectorAll('medformviewer')[0].parentElement.clientHeight) - 42;
                let medformviewerHeight
                if(this.isEPRview)
                medformviewerHeight = (650 - 105);
                else
                medformviewerHeight = ((650 - (105 * window.devicePixelRatio)) / window.devicePixelRatio);
                let itemsHeight = 0;
                for (let i = 0; i < elem.children.length -1; i++) {
                    itemsHeight += elem.children[i].scrollHeight;
                }
                this.formviewerHeight = (medformviewerHeight - itemsHeight).toString();
                console.log("SetDynamicFormviewerHeight.medformviewerHeight", medformviewerHeight, itemsHeight, this.formviewerHeight)
            }
        }

        medddetails_Loaded(sender: Object, e: RoutedEventArgs): void {
            this.oMedicationDrugDetailsVM = new PrescriptionItemDetailsVM();
            this.oMedicationDrugDetailsVM.PrescriptionItemOID = this.PrescriptionItemOID;
            this.oMedicationDrugDetailsVM.MCVersion = this.MCVersion;
            this.oMedicationDrugDetailsVM.MCLorenzoID = this.LorenzoID;
            this.oMedicationDrugDetailsVM.oLaunchFrom = this.oLaunchFrom;
            this.oMedicationDrugDetailsVM.PrescriptionType = this.PresType;
            if (this.ServiceOID > 0) {
                this.oMedicationDrugDetailsVM.ServiceOID = this.ServiceOID;
            }
            if (this.LocationOID > 0) {
                this.oMedicationDrugDetailsVM.LocationOID = this.LocationOID;
            }
            this.oMedicationDrugDetailsVM.IsDoseCalcExist = this.DoseCalcExist;
            if (!String.IsNullOrEmpty(this.sDefaultTab))
                this.oMedicationDrugDetailsVM.sDefaultTab = this.sDefaultTab;
            this.DataContext = this.oMedicationDrugDetailsVM;
            this.oMedicationDrugDetailsVM.MedLineItemEvent  = (s,e) => { this.oMedicationDrugDetailsVM_MedLineItemEvent(s); } ;
            this.oMedicationDrugDetailsVM.GetDrugDetailsWithDomainCodeValues();
            if (MedicationCommonProfileData.MedConflictConfig == null && !MedicationCommonBB.IsCalledFromWeb)
                this.oMedicationDrugDetailsVM.GetConflictConfig();
        }
        private DisposeFormEvents(): void {
            if (this.oMedicationDrugDetailsVM != null) {
                this.oMedicationDrugDetailsVM.DoCleanUP();
            }
        }
        medddetails_UnLoaded(sender: Object, e: RoutedEventArgs): void {
            this.DisposeFormEvents();
            this.ScheduleTimes.Content = null;
        }
        oMedicationDrugDetailsVM_MedLineItemEvent(PresItemDetails: PrescriptionItemDetailsVM): void {

            this.oMedDrugDetails = new MedDrugDetails();
            this.oMedDrugDetails.DataContext=this.DataContext;
            this.omedvalidations = new medvalidations();
            this.omedDRC = new meddrc();
            this.oMedAdditionalDetails = new MedAdditionalDetails();
            
            this.oMedTechnicalDetails = new MedTechnicalDetails();
            this.oMedTechnicalDetails.DataContext=this.DataContext;
            // Re-visit
            this.oMedAdminDetails = new MedAdminDetails();
            this.oMedAdminDetails.DataContext = this.DataContext;
            this.oMedReviewHistoryDetails = new medreviewhistorydetails();
            this.oMedPGDforAdmin = new MedPGDforAdmin();
            
            this.ftbMedDetailsTabs.Items.Clear();
            if (PresItemDetails != null) {
                this.oMedAdminDetails.MCVersion = PresItemDetails.MCVersion;
                this.oMedAdminDetails.PrescriptionItemOID = PresItemDetails.PrescriptionItemOID;
                if (this.oMedicationDrugDetailsVM != null && !String.IsNullOrEmpty(this.oMedicationDrugDetailsVM.sDefaultTab)) {
                    if (String.Compare(this.oMedicationDrugDetailsVM.sDefaultTab, "Conflicts", StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(this.oMedicationDrugDetailsVM.sDefaultTab, "Conflict", StringComparison.CurrentCultureIgnoreCase) == 0) {
                        this.bConfDefaultTab = true;
                    }
                    else if (String.Equals(this.oMedicationDrugDetailsVM.sDefaultTab, "Technical", StringComparison.CurrentCultureIgnoreCase)) {
                        this.bTVDefaultTab = true;
                    }
                    else {
                        this.bDrugDefaultTab = true;
                    }
                }
                else this.bDrugDefaultTab = true;


                if (PresItemDetails.AdditionalDetails != null && PresItemDetails.DrugDetails != null && PresItemDetails.AdditionalDetails.IsPGD == '1' && (String.Compare(PresItemDetails.DrugDetails.PresType, PrescriptionTypes.ForAdministration) == 0 || String.Compare(PresItemDetails.DrugDetails.PresType, PrescriptionTypes.Inpatient) == 0)) {
                    this.oMedPGDforAdmin.DataContext = this.oMedicationDrugDetailsVM;
                    this.ftbMedDetailsTabs.AddTabItem("Drug", "Drug details", this.oMedPGDforAdmin, this.bDrugDefaultTab, "Drug details");
                }
                else {
                    this.oMedDrugDetails = (this.ftbMedDetailsTabs.AddTabItem("Drug", "Drug details", this.oMedDrugDetails, this.bDrugDefaultTab, "Drug details")) as any;
                }
                this.ftbMedDetailsTabs.AddTabItem("Conflicts", "Conflicts", this.omedvalidations, this.bConfDefaultTab, "Conflicts");
                if (PresItemDetails.DrugDetails != null && String.Compare(PresItemDetails.DrugDetails.ConflictsExist, "Yes", StringComparison.OrdinalIgnoreCase) == 0) {
                    let tabItem = (ObjectHelper.CreateType<iTabItem>(this.ftbMedDetailsTabs.Items[this.ftbMedDetailsTabs.Items.Count - 1], iTabItem));
                    tabItem.HeaderImage = MedImage.GetPath(MedImages.ConflictsIcon);
                    tabItem.HeaderImageAlign = HeaderImageAlignment.Right;
                    tabItem.HeaderImgToolTip = "Conflicts";
                }
                this.ftbMedDetailsTabs.AddTabItem("Additional", "Additional details", this.oMedAdditionalDetails, false, "Additional details");
                if (this.TechValDef) {
                    this.ftbMedDetailsTabs.AddTabItem("Technical", "Technical validation details", this.oMedTechnicalDetails, true, "Technical validation details");
                }
                else {
                    this.ftbMedDetailsTabs.AddTabItem("Technical", "Technical validation details", this.oMedTechnicalDetails, this.bTVDefaultTab, "Technical validation details");
                }
                if (MedicationCommonProfileData.AddPrescribingConfig != null && MedicationCommonProfileData.AddPrescribingConfig.EnableWardStockConfig && PresItemDetails.DrugDetails != null && (String.Equals(PresItemDetails.DrugDetails.PresType, PrescriptionTypes.ForAdministration) || String.Equals(PresItemDetails.DrugDetails.PresType, PrescriptionTypes.Inpatient)) && PresItemDetails.DrugDetails.IsWardStock && !String.Equals(PresItemDetails.DrugDetails.Status, CConstants.CompletedStatusTermText) && !String.Equals(PresItemDetails.DrugDetails.Status, CConstants.DiscontinueStatusTermText) && !String.Equals(PresItemDetails.DrugDetails.Status, CConstants.CancelledStatusTermText)) {
                    (ObjectHelper.CreateType<iTabItem>(this.ftbMedDetailsTabs.Items[this.ftbMedDetailsTabs.Items.Count - 1], iTabItem)).HeaderImage = MedImage.GetPath(MedImages.WardStockIcon);
                    (ObjectHelper.CreateType<iTabItem>(this.ftbMedDetailsTabs.Items[this.ftbMedDetailsTabs.Items.Count - 1], iTabItem)).HeaderImageAlign = HeaderImageAlignment.Right;
                    (ObjectHelper.CreateType<iTabItem>(this.ftbMedDetailsTabs.Items[this.ftbMedDetailsTabs.Items.Count - 1], iTabItem)).HeaderImgToolTip = "Item is stocked at this location";
                }
                if (PresItemDetails.AdditionalDetails != null && PresItemDetails.AdditionalDetails.IsPGD == '1') {
                    //Re-visit
                    this.ftbMedDetailsTabs.AddTabItem("Administration", "PGD administration history", this.oMedAdminDetails, false, "PGD administration history");
                }
                else {
                    //Re-visit
                    this.ftbMedDetailsTabs.AddTabItem("Administration", "Administration details", this.oMedAdminDetails, false, "Administration details");
                }
                this.ftbMedDetailsTabs.AddTabItem("ReviewHistory", "Review history", this.oMedReviewHistoryDetails, false, "Review history");
                //if (PresItemDetails.AdditionalDetails != null && PresItemDetails.DrugDetails != null && String.Compare(PresItemDetails.DrugDetails.PresType, PrescriptionTypes.Clerking) != 0 && MedicationCommonProfileData.MedConflictConfig != null && MedicationCommonProfileData.MedConflictConfig.TurnOnDRC == '1') {
                //   this.ftbMedDetailsTabs.AddTabItem("DRCConflicts", "Dose range check", this.omedDRC, false, "DRCConflicts");
                //}
                (ObjectHelper.CreateType<iTabItem>(this.ftbMedDetailsTabs.Items[this.ftbMedDetailsTabs.Items.Count - 1], iTabItem)).Visibility = Visibility.Collapsed;
                (ObjectHelper.CreateType<iTabItem>(this.ftbMedDetailsTabs.Items[this.ftbMedDetailsTabs.Items.Count - 2], iTabItem)).Visibility = Visibility.Collapsed;
                if (PresItemDetails.DrugDetails != null && (String.Compare(PresItemDetails.DrugDetails.PresType, PrescriptionTypes.ForAdministration) == 0 || String.Compare(PresItemDetails.DrugDetails.PresType, PrescriptionTypes.Inpatient) == 0) && PresItemDetails.DrugDetails.IsReviewExists) {
                    (ObjectHelper.CreateType<iTabItem>(this.ftbMedDetailsTabs.Items[this.ftbMedDetailsTabs.Items.Count - 1], iTabItem)).Visibility = Visibility.Visible;
                }
                if (PresItemDetails.DrugDetails != null && (String.Compare(PresItemDetails.DrugDetails.PresType, PrescriptionTypes.ForAdministration) == 0 || String.Compare(PresItemDetails.DrugDetails.PresType, PrescriptionTypes.Inpatient) == 0)) {
                    (ObjectHelper.CreateType<iTabItem>(this.ftbMedDetailsTabs.Items[this.ftbMedDetailsTabs.Items.Count - 2], iTabItem)).Visibility = Visibility.Visible;
                    if (PresItemDetails.AdditionalDetails.IsPGD == '1')
                        (ObjectHelper.CreateType<iTabItem>(this.ftbMedDetailsTabs.Items[this.ftbMedDetailsTabs.Items.Count - 3], iTabItem)).Visibility = Visibility.Collapsed;
                }
                if (PresItemDetails.AdditionalDetails != null && PresItemDetails.DrugDetails != null && (String.Compare(PresItemDetails.DrugDetails.PresType, PrescriptionTypes.ForAdministration) != 0 && PresItemDetails.AdditionalDetails.IsPGD == '1')) {
                    (ObjectHelper.CreateType<iTabItem>(this.ftbMedDetailsTabs.Items[this.ftbMedDetailsTabs.Items.Count - 5], iTabItem)).Visibility = Visibility.Collapsed;
                }
                if (PresItemDetails.AdditionalDetails != null && PresItemDetails.DrugDetails != null && String.Compare(PresItemDetails.DrugDetails.PresType, PrescriptionTypes.Clerking) != 0 && MedicationCommonProfileData.MedConflictConfig != null && MedicationCommonProfileData.MedConflictConfig.TurnOnDRC == '1') {
                    this.ftbMedDetailsTabs.AddTabItem("DRCConflicts", "Dose range check", this.omedDRC, false, "DRC Conflicts");
                }
                if (PresItemDetails.AdditionalDetails != null && PresItemDetails.DrugDetails != null && (String.Compare(PresItemDetails.DrugDetails.PresType, PrescriptionTypes.ForAdministration) != 0 && PresItemDetails.AdditionalDetails.IsPGD == '1')) {
                    (ObjectHelper.CreateType<iTabItem>(this.ftbMedDetailsTabs.Items[this.ftbMedDetailsTabs.Items.Count - 2], iTabItem)).Visibility = Visibility.Collapsed;
                }
                
                let oImg: Image = ObjectHelper.CreateType<Image>(this.FindName("MultiComponent"), Image);
                if (oImg != null) {
                    let oPanel: Panel = ObjectHelper.CreateType<Panel>(oImg.Parent, Panel);
                    if (oPanel != null) {
                        //Re-visit
                        //oPanel.Children.Remove(oImg);
                        oPanel.Children.Remove("MultiComponent");
                    }
                }
                let tbToolTip: TextBlock = null;
                setTimeout(() => {
                    this.MedLineDisplay.Content = LineDisplayHelper.GetPrescriptionItem(MedicationCommonBB.GetPrescriptionLineItemVM(PresItemDetails), 200, String.Empty, (o) => { tbToolTip = o; });                    
                    //Re-Visit
                }, 0);
                this.ScheduleTimes.Content = LineDisplayHelper.GetScheduleTimes(PresItemDetails);
                if (PresItemDetails != null && PresItemDetails.DrugDetails != null) {
                    if (!String.IsNullOrEmpty(PresItemDetails.DrugDetails.Status) && ((!String.Equals(PresItemDetails.DrugDetails.Status, CConstants.COMPLETED) && !String.Equals(PresItemDetails.DrugDetails.Status, CConstants.CANCELLED) && !String.Equals(PresItemDetails.DrugDetails.Status, CConstants.DISCONTINUED)) && (String.Compare(CConstants.CancelledStatusTermText, PresItemDetails.DrugDetails.Status, StringComparison.CurrentCultureIgnoreCase) != 0 && String.Compare(CConstants.CompletedStatusTermText, PresItemDetails.DrugDetails.Status, StringComparison.CurrentCultureIgnoreCase) != 0 && String.Compare(CConstants.DiscontinueStatusTermText, PresItemDetails.DrugDetails.Status, StringComparison.CurrentCultureIgnoreCase) != 0)) && (!String.Equals(PresItemDetails.DrugDetails.Status, CConstants.Precatalog) || !String.Equals(PresItemDetails.DrugDetails.Status, CConstants.NONCATALOGUEITEM))) {
                        if (!String.IsNullOrEmpty(PresItemDetails.DrugDetails.OmitComments) && !String.IsNullOrEmpty(PresItemDetails.DrugDetails.PresType) && (String.Equals(PresItemDetails.DrugDetails.PresType, PrescriptionTypes.Inpatient) || String.Equals(PresItemDetails.DrugDetails.PresType, PrescriptionTypes.Foradministration))) {
                            if (PresItemDetails.DrugDetails.IsinDefiniteOmit && DateTime.NotEquals(PresItemDetails.DrugDetails.IsinDefiniteOmitDTTM, DateTime.MinValue)) {
                                this.LabelForOmit = Resource.DrugDetails.IsOmitIndefinite_Tooltip;
                            }
                            else {
                                this.LabelForOmit = Resource.DrugDetails.FutureOmitSlots_Tooltip;
                            }
                            this.OmitTextLabel.Content = this.LabelForOmit;
                        }
                    }
                }
                this.oMedDrugDetails.DataContext = PresItemDetails;
                this.oMedAdditionalDetails.DataContext = PresItemDetails;
                this.oMedReviewHistoryDetails.DataContext = PresItemDetails;
                this.omedDRC.DataContext = PresItemDetails;
		        this.omedvalidations.DataContext = PresItemDetails;
                this.oMedAdminDetails.DataContext = PresItemDetails;
            }
            setTimeout(() => {
                this.SetDynamicFormviewerHeight();
            }, 50);
        }
        public GetProfileData(): void {
            let profile: ProfileFactoryType = new ProfileFactoryType();
            profile.OnProfileListLoaded = (s, e) => {
              console.log(
                'GetProfileData.profile_OnProfileLoaded.. ViewDiscontinuedDrugText before...',
                this['ViewDiscontinuedDrugText']
              );
              this.profile_OnProfileLoaded(s, e);
              console.log(
                'GetProfileData.profile_OnProfileLoaded.. ViewDiscontinuedDrugText after...',
                this['ViewDiscontinuedDrugText']
              );
            };
            let lstProfileReq: List<ProfileContext> = new List<ProfileContext>();
            let objReq: ProfileContext = new ProfileContext();
            objReq.ContextCode = 'VW_MEDICONFIG';
            objReq.ProfileItemKey = 'MEDLINEDISPLAY';
            objReq.ProfileType = typeof CMedicationLineDisplayData;
            objReq.ProfileLevel = ProfileFactoryType.Level.User;
            lstProfileReq.Add(objReq);
            objReq = new ProfileContext();
            objReq.ContextCode = 'VW_MEDICONFIG';
            objReq.ProfileItemKey = 'MEDVIEWCONFIG';
            objReq.ProfileType = typeof MedicationViewConfigData;
            objReq.ProfileLevel = ProfileFactoryType.Level.User;
            lstProfileReq.Add(objReq);
            objReq = new ProfileContext();
            objReq.ContextCode = 'VW_MEDICONFIG';
            objReq.ProfileItemKey = 'PRESMETHODCONFIG';
            objReq.ProfileLevel = ProfileFactoryType.Level.User;
            objReq.ProfileType = typeof PrescribingMethodConfigData;
            lstProfileReq.Add(objReq);
            objReq = new ProfileContext();
            objReq.ContextCode = 'VW_MEDRESCONFIG';
            objReq.ProfileItemKey = 'MEDRESOGRID';
            objReq.ProfileType = typeof GridConfig;
            objReq.ProfileLevel = ProfileFactoryType.Level.User;
            lstProfileReq.Add(objReq);
            objReq = new ProfileContext();
            objReq.ContextCode = 'VW_MEDILISTCONFIG';
            objReq.ProfileItemKey = 'MEDLISTVIEW';
            objReq.ProfileType = typeof GridConfig;
            objReq.ProfileLevel = ProfileFactoryType.Level.User;
            lstProfileReq.Add(objReq);
            objReq = new ProfileContext();
            objReq.ContextCode = 'VW_MEDICONFIG';
            objReq.ProfileItemKey = 'CLINVERICFG';
            objReq.ProfileType = typeof ClinicalVerificationConfiguration;
            objReq.ProfileLevel = ProfileFactoryType.Level.User;
            lstProfileReq.Add(objReq);
            objReq = new ProfileContext();
            objReq.ContextCode = 'VW_MEDICONFIG';
            objReq.ProfileItemKey = 'INFUSIONPRESCONFIG';
            objReq.ProfileType = typeof InfusionPresConfigData;
            objReq.ProfileLevel = ProfileFactoryType.Level.User;
            lstProfileReq.Add(objReq);
            objReq = new ProfileContext();
            objReq.ContextCode = 'VW_MEDICONFIG';
            objReq.ProfileItemKey = 'ADDPRESCRIBINGCONFIG';
            objReq.ProfileType = typeof AddPrescribingConfigData;
            objReq.ProfileLevel = ProfileFactoryType.Level.Organisation;
            lstProfileReq.Add(objReq);
            objReq = new ProfileContext();
            objReq.ContextCode = 'MA_ADMINSETTING';
            objReq.ProfileItemKey = 'MASLOTCHARCONFIG';
            objReq.ProfileType = typeof CSlotCharacteristicsConfig;
            objReq.ProfileLevel = ProfileFactoryType.Level.Organisation;
            lstProfileReq.Add(objReq);
            objReq = new ProfileContext();
            objReq.ContextCode = 'MA_ADMINSETTING';
            objReq.ProfileItemKey = 'MACHARTDISPLAYCONFIG';
            objReq.ProfileType = typeof CChartDisplayConfig;
            objReq.ProfileLevel = ProfileFactoryType.Level.Organisation;
            lstProfileReq.Add(objReq);
            objReq = new ProfileContext();
            objReq.ContextCode = 'VW_MEDICONFIG';
            objReq.ProfileItemKey = 'PRESCONFIG';
            objReq.ProfileType = typeof PrescribingConfigData;
            objReq.ProfileLevel = ProfileFactoryType.Level.Organisation;
            lstProfileReq.Add(objReq);
            objReq = new ProfileContext();
            objReq.ContextCode = 'VW_GPCONNECTMED';
            objReq.ProfileItemKey = 'GPCONNECTMEDCA';
            objReq.ProfileType = typeof GPConnectConfiguration;
            objReq.ProfileLevel = ProfileFactoryType.Level.Organisation;
            lstProfileReq.Add(objReq);
            profile.GetProfilesData(lstProfileReq);
          }
          public MedViewConfigCompleted = new EventEmitter();
          profile_OnProfileLoaded(sender: Object, Result: List<ProfileContext>): void {
            if (Result != null && Result.Count > 0) {
              let oProfileGPConfig = Result.Where(
                (c) =>
                  String.Equals(
                    c.ContextCode,
                    'VW_GPCONNECTMED',
                    StringComparison.CurrentCultureIgnoreCase
                  ) &&
                  String.Equals(
                    c.ProfileItemKey,
                    'GPCONNECTMEDCA',
                    StringComparison.CurrentCultureIgnoreCase
                  )
              )
                .Select((s) => s.ProfileData)
                .FirstOrDefault();
              if (oProfileGPConfig != null) {
                ProfileData.GPConnectConfig =
                  ObjectHelper.CreateType<GPConnectConfiguration>(
                    oProfileGPConfig,
                    GPConnectConfiguration
                  );
              }
            }
            Result.forEach((oProfileContext) => {
              if (
                String.Compare(oProfileContext.ContextCode, 'VW_MEDICONFIG') == 0 &&
                String.Compare(oProfileContext.ProfileItemKey, 'MEDLINEDISPLAY') == 0
              ) {
                if (oProfileContext.ProfileData instanceof CMedicationLineDisplayData) {
                  MedicationCommonProfileData.MedLineDisplay =
                    ObjectHelper.CreateType<CMedicationLineDisplayData>(
                      oProfileContext.ProfileData,
                      CMedicationLineDisplayData
                    );
                }
              } 
            });
          
       }
    }