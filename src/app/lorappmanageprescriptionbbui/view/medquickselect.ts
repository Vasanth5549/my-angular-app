import { Component, OnInit, Type, ViewChild, OnDestroy, ElementRef,ChangeDetectorRef } from '@angular/core';
import { ProfileFactoryType, Convert, iMessageBox, MessageBoxType, MessageBoxButton, ProcessRTE, BusyIndicator as Busyindicator, iBusyIndicator, AppActivity, StringBuilder, base, ContextManager, AppLoadService } from 'epma-platform/services';
import { CommonVariables, CommonBB } from 'src/app/lorappcommonbb/utilities/common';
import {
    AppDialogEventargs, AppDialogResult, WindowButtonType, CContextInformation, CListItem, Int64, Long, ObservableCollection, ProfileContext, List, RTEEventargs, Int32, StringComparison, BitmapImage, Uri, UriKind, AppContextInfo, AppSessionInfo, ClerkFormViewDeftBehaviour, ContextInfo, PatientContext, CValuesetTerm, DelegateArgs, SelectionChangedEventArgs,
    RadRoutedEventArgs,Visibility
} from "epma-platform/models";
import { Resource } from 'src/app/lorappmanageprescriptionbbui/resource';
// import { Medlistdetails } from '../resource/medlistdetails.designer';
import { MedicationSearchConfigData, PrescribingConfigData, MedDrugDisplayConfigData } from 'src/app/lorappslprofiletypes/medication';
import { CTreeListItem, iTreeViewCollection, TreeImageCollection, RadTreeViewItem } from
    'src/app/shared/epma-platform/controls-model/treeView.model';
import { CommonFlags, QueryStringInfo } from '../utilities/globalvariable';
import { AMSHelper } from 'src/app/lorappcommonbb/amshelper';
import { ProfileData, UserPermissions } from '../utilities/profiledata';
import { PrescriptionItemAssociations } from '../viewmodel/ordersetsecmezzanineVM';
import { MedicationCommonProfileData } from 'src/app/lorappmedicationcommonbb/utilities/profiledata';
import {UserControl, MouseButtonEventArgs,Key, KeyEventArgs, Thickness, SolidColorBrush, Colors} from 'epma-platform/controls';
import { ActivityTypes} from '../model/common';
import { GC, prescribedrugs,qlfav} from 'src/app/product/shared/models/Common';
import { Environment } from '../../product/shared/models/Common';//'src/app/shared/epma-platform/controls-model/convert-type';
import { Common, MedsPrescribeUtility} from '../utilities/common';
import { CConstants,MedImage, MedImages, PrescribeSource, PrescriptionItemStatusCodes,PrescriptionTypes, ValueDomain}  from '../utilities/constants';
import { Dictionary } from 'epma-platform/dictionary';
import { MedQuickSelectVM  } from '../viewmodel/medquickselectvm';
import { ReplacementDrugVM } from '../viewmodel/ReplacementDrugVM';
import { IPPMABaseVM  } from '../viewmodel/ippmabasevm';
import { PrescriptionItemVM  } from '../viewmodel/PrescriptionItemVM';
import { MultiSelectListVM  } from '../viewmodel/MultiSelectListVM';
import { OrderSetSecMezzanineVM  } from '../viewmodel/ordersetsecmezzanineVM';
import { ArrayOfString, CReqMsgGetFormularyHierarchy, CReqMsgGetHierarchyFormularyItems, CReqMsgGetSearchDrugs, CResMsgGetFormularyHierarchy, CResMsgGetHierarchyFormularyItems, CResMsgGetSearchDrugs, DrugHierarchyInfo, EnumSearchCriteria, EnumSearchType, FullyResolvedCriteria, GetFormularyHierarchyCompletedEventArgs, GetHierarchyFormularyItemsCompletedEventArgs, GetSearchDrugsCompletedEventArgs, ManagePrescriptionWSSoapClient, PowerSearchCriteria, DrugItemInputData } from 'src/app/shared/epma-platform/soap-client/ManagePrescriptionWS';
import * as ManagePrescSer from 'src/app/shared/epma-platform/soap-client/ManagePrescriptionWS';
import { CReqMsgGetFavouritesChildGroup, CReqMsgGetHierarchy, CResMsgGetFavouritesChildGroup, CResMsgGetHierarchy, GetFavouritesChildGroupCompletedEventArgs, GetHierarchyCompletedEventArgs, MedicationMgmtWSSoapClient } from 
'src/app/shared/epma-platform/soap-client/MedicationMgmtWS';
import { OnSelectArgs, PSLineItem, PSStyleItem,PSImageItem, LineIconAlignment} from 'src/app/shared/epma-platform/controls/iPowerSearch';
import {RoutedEventArgs} from 'src/app/shared/epma-platform/controls/FrameworkElement';
import { CReqMsgGetIPPMAMedicationFavouritesGroupItemsList, CReqMsgGetIPPMAOrderSetItemsList, CReqMsgGetOrderSetStatus, CResMsgGetIPPMAMedicationFavouritesGroupItemsList, CResMsgGetIPPMAOrderSetItemsList, CResMsgGetOrderSetStatus, DrugProperty, GetIPPMAMedicationFavouritesGroupItemsListCompletedEventArgs, GetIPPMAOrderSetItemsListCompletedEventArgs, GetOrderSetStatusCompletedEventArgs, IPPMAManagePrescriptionWSSoapClient } from 'src/app/shared/epma-platform/soap-client/IPPMAManagePrescriptionWS';
import * as IPPMAManagePrescSer from 'src/app/shared/epma-platform/soap-client/IPPMAManagePrescriptionWS'
import DateTime from 'epma-platform/DateTime';
import { iLabel,iComboBox,iCheckBox, StackPanel, iRadioButton, iButton, TextBlock,iTreeViewControl, iPowerSearch, Grid} 
from 'epma-platform/controls';
// import { NumberPipe } from '@progress/kendo-angular-intl';
import { MultiSelectListView } from '../view/MultiSelectListView';
import { AppComponent } from 'src/app/app.component';
import { HttpClient } from '@angular/common/http';
import { debounceTime, distinctUntilChanged, fromEvent, map, of, pipe, Subject } from 'rxjs';
import { iTextBox } from 'src/app/shared/epma-platform/controls/epma-itextbox/epma-itextbox.component';
import { ObjectHelper } from 'epma-platform/helper';
import { OrderSetSecMezzanine } from './OrderSetSecMezzanine';
import { OrderSetChildfooter } from './OrderSetChildfooter';

// class DelayedTextMock {
//     Text: string = "";
//     KeyUp: Function | string;
//     KeyDown: Function | string;
//     DelayTextChanged: Function | string;
//     Focus() { };
//     Visibility: any;
//     IsReadOnly: any;
// }

var that;

@Component({
    selector: 'app-medquickselect',
    templateUrl: './medquickselect.html',
    styleUrls: ['./medquickselect.css']
})

export class medQuickselect extends UserControl implements OnInit {
    public objResMedearch = Resource.ResMedearch;
    private profile: ProfileFactoryType;
    // oTrVwColl: iTreeViewCollection = new iTreeViewCollection();
    oResUtil: ReplacementDrugVM;
    objSearch: MedQuickSelectVM;
   // IsCatalogue: number = 0;
    get isChildWizard(){
    return AppLoadService.isChildWizard;
    }
    _objMedSearch: IPPMABaseVM;
    //Not Required for LHS. To be Re-Visited.
    //public oSecChild: MedSecondaryTabChild;
    public oORSChild: OrderSetSecMezzanine;
    public FormularyOId: number;
    public sMCVersion: string;
    isFirst: boolean = true;
    // need to remove initialization
    oNode: CTreeListItem = new CTreeListItem();//null;
    oSelectedNode: CTreeListItem = null;
    oColl: List<TreeImageCollection>;
    oVM: IPPMABaseVM;
    public oDIDetails: DrugItemDetails;
    oItem: CTreeListItem = null;
    oItemChild: CTreeListItem = null;
    public oDrugItemInputData: DrugItemInputData;
    bIsLoaded: boolean = false;
    public FAVOID: number;
    public USEROID: number;
    public lSelectedCommonMedID: number;
    public FAVFirstLoad: number;
    valueCollection: Dictionary<string, List<string>>;
    itmTypPrmScr: List<string> = new List<string>();
    private oMultiSelectListView: MultiSelectListView;
    BrandFlagForDrug: string = "0";
    FluidForInfusionFlag: string = '0';
    AlwaysDisplayInPrimaryList: string = '0';
    private oAString: ManagePrescSer.ArrayOfString;
    isShiftKeyPressed: boolean = false;
    keypressed: boolean = false;
    keycode: number;
    objCurrentVM: IPPMABaseVM;
    public sIsAccessContraint: string;
    public sIsIndicationRequired: string;
    public IsRecordExist: boolean;


    //private LayoutRoot: Grid;

    private LayoutRoot: { DataContext: {}, Control: Grid, Children: any };
    //  override DataContext = {}







    @ViewChild("LayoutRootTempRef", { read: Grid }) set _LayoutRoot(c: Grid) {
        if (c)
            this.LayoutRoot.Control = c;
    }
    private lblQuickLinks: iLabel;
    @ViewChild("lblQuickLinksTempRef", { read: iLabel }) set _lblQuickLinks(c: iLabel) {
        if (c)
            this.lblQuickLinks = c;
    }
    private cboQuickLinks: iComboBox;
    @ViewChild("cboQuickLinksTempRef", { read: iComboBox }) set _cboQuickLinks(c: iComboBox) {
        if (c)
            this.cboQuickLinks = c;
    }
    private lblSearch: iLabel;
    @ViewChild("lblSearchTempRef", { read: iLabel }) set _lblSearch(c: iLabel) {
        if (c)
            this.lblSearch = c;
    }
    // _elementRef: ElementRef;
    public txtSearch: iTextBox;
    // @ViewChild("txtSearchTempRef", { read: iTextBox }) set _txtSearch(val:{c: iTextBox, el:ElementRef}) {

    //     if (val.c)
    //         this.txtSearch = val.c;
    // }
    @ViewChild("txtSearchTempRef", { read: iTextBox }) set _txtSearch(c: iTextBox) {
        if (c)
            this.txtSearch = c;
    }
    // @ViewChild('txtSearchTempRef') ps_elem : ElementRef;

    // txtSearch = new DelayedTextMock();
    // @ViewChild("txtSearchTempRef", { read: DelayedTextboxControl }) set _txtSearch(c: DelayedTextboxControl) {
    //     if (c)
    //         this.txtSearch = c;
    // }


    private cmdMCI: iButton;
    @ViewChild("cmdMCITempRef", { read: iButton }) set _cmdMCI(c: iButton) {
        if (c)
            this.cmdMCI = c;
    }
    private lblTeamName: TextBlock;
    @ViewChild("lblTeamNameTempRef", { read: TextBlock }) set _lblTeamName(c: TextBlock) {
        if (c)
            this.lblTeamName = c;
    }
    private gSearch: Grid;
    @ViewChild("gSearchTempRef", { read: Grid }) set _gSearch(c: Grid) {
        if (c)
            this.gSearch = c;
    }
    private cmdClear: iButton;
    @ViewChild("cmdClearTempRef", { read: iButton }) set _cmdClear(c: iButton) {
        if (c)
            this.cmdClear = c;
    }
    private cmdSearchCat: iButton;
    @ViewChild("cmdSearchCatTempRef", { read: iButton }) set _cmdSearchCat(c: iButton) {
        if (c)
            this.cmdSearchCat = c;
    }
    private spSearchOption: StackPanel;
    @ViewChild("spSearchOptionTempRef", { read: StackPanel }) set _spSearchOption(c: StackPanel) {
        if (c)
            this.spSearchOption = c;
    }
    private ichkBoxSearchOrderSet: iCheckBox;
    @ViewChild("ichkBoxSearchOrderSetTempRef", { read: iCheckBox }) set _ichkBoxSearchOrderSet(c: iCheckBox) {
        if (c)
            this.ichkBoxSearchOrderSet = c;
    }
    public optBeginsWith: iRadioButton;
    @ViewChild("optBeginsWithTempRef", { read: iRadioButton }) set _optBeginsWith(c: iRadioButton) {
        if (c)
            this.optBeginsWith = c;
    }
    public optAnyWord: iRadioButton;
    @ViewChild("optAnyWordTempRef", { read: iRadioButton }) set _optAnyWord(c: iRadioButton) {
        if (c)
            this.optAnyWord = c;
    }
    private lblQLinkName: iLabel;
    @ViewChild("lblQLinkNameTempRef", { read: iLabel }) set _lblQLinkName(c: iLabel) {
        if (c)
            this.lblQLinkName = c;
    }
    public tvwMedFavourites: iTreeViewControl;
    @ViewChild("tvwMedFavouritesTempRef", { read: iTreeViewControl }) set _tvwMedFavourites(c: iTreeViewControl) {
        if (c)
            this.tvwMedFavourites = c;
    }
    public tvwMedFromulary: iTreeViewControl;
    @ViewChild("tvwMedFromularyTempRef", { read: iTreeViewControl }) set _tvwMedFromulary(c: iTreeViewControl) {
        if (c)
            this.tvwMedFromulary = c;
    }
    public ladSearch: iPowerSearch;
    @ViewChild("ladSearchTempRef", { read: iPowerSearch }) set _ladSearch(c: iPowerSearch) {
        if (c)
            this.ladSearch = c;
    }
    InitializeComponent() {

    }

    // private psKeyup = new Subject<any>();

    ngOnInit(): void {
        // this._objMedSearch = new IPPMABaseVM();
        super.DataContext = Common.oIPPMABaseVM;
        // this.http.get<any>("./assets/Power-search.json").subscribe((data) => {
        //     console.log(data);
        //     data.ListItemCollection.forEach((element: PSLineItem) => {
        //         this.objSearch.LstLineItem.Add(element);
        //         console.log(this.objSearch.LstLineItem.Add(element))
        //     });
        //     data.StyleItemCollection.forEach((element: PSStyleItem) => {
        //         this.objSearch.LstStyleItem.Add(element);
        //         console.log(this.objSearch.LstStyleItem.Add(element))
        //     });

        // });
    }

    private timer: any;
    private delaySearch: boolean = true;

    override KeyUpEvent(e: any) {
        this.txtSearch.Text = this.txtSearch?.Text.replace(/[*%/]/g, '');
        if (this.delaySearch) {
            // if there is already a timer running... then stop it
            if (this.timer) {
                clearTimeout(this.timer);
            }
            // trigger the search action after 400 millis
            this.timer = setTimeout(() => {
                this.DelayedTextbox_DelayTextChanged({}, '');
            }, 500);

        } else this.DelayedTextbox_DelayTextChanged({}, '');
    }

    ngAfterViewInitImpl(){
        this.optBeginsWith.IsChecked = true;




        this.GetContextInfo();
        this.profile = new ProfileFactoryType();
        this.profile.OnProfileListLoaded = (s, R) => { this.profile_OnProfileLoaded(s, R) };
        if (UserPermissions.PrescribeWithRestriction) {
            this.lblSearch.Visibility = Visibility.Collapsed;
            this.txtSearch.Visibility = Visibility.Collapsed;
            if(this.gSearch != null)
               this.gSearch.Visibility = Visibility.Collapsed;
            this.spSearchOption.Visibility = Visibility.Collapsed;
            this.cmdSearchCat.Visibility = Visibility.Collapsed;
            this.cmdClear.Visibility = Visibility.Collapsed;
        }
        else {
            if (this.txtSearch)
                this.txtSearch.KeyUp = (s, e) => { this.txtSearch_KeyUp(s, e) };

            this.ichkBoxSearchOrderSet.Checked = (s, e) => { this.ichkBoxSearchOrderSet_Checked(s, e) };

            this.ichkBoxSearchOrderSet.Unchecked = (s, e) => { this.ichkBoxSearchOrderSet_Unchecked(s, e) };

        }
        this.tvwMedFavourites.Visibility = Visibility.Collapsed;
        this.tvwMedFromulary.Visibility = Visibility.Collapsed;
        this.ladSearch.Visibility = Visibility.Visible;
        this.lblQLinkName.Visibility = Visibility.Collapsed;
        this.ladSearch.ShowTooltip = true;
        this.ladSearch.IsEnabled = true;

        this.ladSearch.OnSecondarySelection = (s, e) => { this.ladSearch_OnSelect(s, e) };
        this.ladSearch.OnSelect = (s, e) => { this.ladSearch_OnSelect(s, e) };
        this.ladSearch.GotFocus = (s, e) => { this.ladSearch_GotFocus(s, e) };
        //cboQuickLinks.SetBinding(iComboBox.ItemsSourceProperty, createObject(new System.Windows.Data.Binding("LstItem"), { Mode: System.Windows.Data.BindingMode.OneWay }));
        // cboQuickLinks.SetBinding(iComboBox.SelectedValueProperty, createObject(new System.Windows.Data.Binding("QLCombo"), { Mode: System.Windows.Data.BindingMode.TwoWay }));
        this.DisableEnableCntrl(false);
        this.UserControl_Loaded(null, null);
        // Need to check
        this.cboQuickLinks.ItemsSource = this.objSearch.LstItem;
        this.objSearch.GetFavouritesInfoCompleted.subscribe(qlCombo=>{
            this.cboQuickLinks.SelectedItem = qlCombo;  
        })
    }
    public maxLayoutHeight;
    public maxGridHeight;
    public searchHeight;
    ngAfterViewInit() {
        if (MedicationCommonProfileData.MedViewConfig != null) {
            this.ngAfterViewInitImpl();
        }
        else{
            let objCurrentVM: IPPMABaseVM = ObjectHelper.__as__<IPPMABaseVM>(this.DataContext, IPPMABaseVM);
            objCurrentVM.MedViewConfigCompleted.subscribe(d => {
                this.ngAfterViewInitImpl();
            });
        }
        if(window.screen.height < 1000 && window.devicePixelRatio != 1.25){
            this.maxLayoutHeight = window.innerHeight - 250;
            this.searchHeight = window.innerHeight - 220;
          }
          else if(!this.isChildWizard && window.screen.height > 1000){
            this.searchHeight = 582;
            this.maxLayoutHeight = 553;
          }
          else if(this.isChildWizard && window.screen.height >1000){
            this.searchHeight = 554;
            this.maxLayoutHeight = 520;
          }
          else{
            this.maxLayoutHeight = window.innerHeight - 250;
            this.searchHeight = window.innerHeight - 220;
          }
    }

    iTextBox_TextChanged_Func = (s, e) => {
        // console.log("iTextBox_TextChanged_Func", this.txtSearch?.Text);
        // this.psKeyup.next(this.txtSearch?.Text);
    }

    public GetContextInfo() {
        //Resetting the flag variable
        PatientContext.IsAgeSexFilledforConflict = false;

        if (base.WizardContext.objWizardContext.ContainsKey("PATIENTOID") && base.WizardContext.objWizardContext["PATIENTOID"] != null) {
            PatientContext.PatientOID = base.WizardContext.objWizardContext["PATIENTOID"];
            ContextManager.Instance["PatientID"] = base.WizardContext.objWizardContext["PATIENTOID"];
        }
        if (base.WizardContext.objWizardContext.ContainsKey("ENCOUNTEROID") && base.WizardContext.objWizardContext["ENCOUNTEROID"] != null) {
            PatientContext.EncounterOid = base.WizardContext.objWizardContext["ENCOUNTEROID"];
            ContextManager.Instance["EncounterOID"] = base.WizardContext.objWizardContext["ENCOUNTEROID"];
        }
        if (base.WizardContext.objWizardContext.ContainsKey("PrescType") && base.WizardContext.objWizardContext["PrescType"] != null)
            PatientContext.PrescriptionType = base.WizardContext.objWizardContext["PrescType"];

        if (ContextManager.Instance["DOB"] != null)
            PatientContext.DOB = ContextManager.Instance["DOB"];
        if (ContextManager.Instance["EncounterType"] != null) {
            PatientContext.EncounterCode = ContextManager.Instance["EncounterType"];
        }
        if (ContextManager.Instance["MergedPatientOID"] != null)
            PatientContext.MergedPatientOID = ContextManager.Instance["MergedPatientOID"];
        //Ramya
        if (ContextManager.Instance["IsMergedPatient"] != null) {
            //String isMergedPatient;
            PatientContext.IsMergedPatient = ContextManager.Instance["IsMergedPatient"].toString();
        }
        if (ContextManager.Instance["IPPMADU_P2"] != null)
            PatientContext.IPPMADU_P2 = ContextManager.Instance["IPPMADU_P2"].toString();
        if (ContextManager.Instance["TTOPBBDU"] != null)
            PatientContext.TTOPBBDU = ContextManager.Instance["TTOPBBDU"].toString();
        //RR DU
        if (ContextManager.Instance["TTOPBBDU_P2"] != null)
            PatientContext.TTOPBBDU_P2 = ContextManager.Instance["TTOPBBDU_P2"].toString();

        //RR DRC
        if (ContextManager.Instance["IsTurnONDRC"] != null) {
            PatientContext.IsTurnONDRC = ContextManager.Instance["IsTurnONDRC"].toString();
        }
        //Revisti required
        if (ContextManager.Instance["PatientID"] != null) {
            PatientContext.PatientOID = ContextManager.Instance["PatientID"].toString();
        }

        AppContextInfo.OrganisationName = ContextManager.Instance["OrganisationName"] ? ContextManager.Instance["OrganisationName"].toString() : '';
        AppContextInfo.JobRoleOID = ContextManager.Instance["JobRoleOID"] ? ContextManager.Instance["JobRoleOID"].toString() : '';
        AppContextInfo.RoleProfileName = ContextManager.Instance["RoleProfileName"] ? ContextManager.Instance["RoleProfileName"].toString() : '';
        AppContextInfo.SpecialtyOID = ContextManager.Instance["SpecialtyOID"] ? ContextManager.Instance["SpecialtyOID"].toString() : '';
        AppSessionInfo.AMCV = ContextManager.Instance["AMCV"] ? ContextManager.Instance["AMCV"].toString() : '';
        if (ContextManager.Instance["TeamNames"] != null)
            AppContextInfo.TeamNames = ContextManager.Instance["TeamNames"].toString();
        if (ContextManager.Instance["TeamOIDs"] != null)
            AppContextInfo.TeamOIDs = ContextManager.Instance["TeamOIDs"].toString();


        ContextInfo.SecurityToken = ContextManager.Instance["SecurityToken"] ? ContextManager.Instance["SecurityToken"].toString() : '';
        AppContextInfo.OrganisationOID = ContextManager.Instance["OrganisationOID"] ? ContextManager.Instance["OrganisationOID"].toString() : '';
        ContextInfo.Culture = ContextManager.Instance["Culture"] ? ContextManager.Instance["Culture"] : '';

        ContextInfo.UserOID = ContextManager.Instance["UserOID"] ? ContextManager.Instance["UserOID"].toString() : '';


        ContextInfo.ReleaseVersion = ContextManager.Instance["ReleaseVersion"] ? ContextManager.Instance["ReleaseVersion"].toString() : '';


        if (ContextManager.Instance["bDateOfBirthEstimated"] != null) {
            PatientContext.IsEstimatedDOB = ContextManager.Instance["bDateOfBirthEstimated"].toString();
        }
        if (ContextManager.Instance["IsPatientTranferAct"] != null) {
            PatientContext.IsPatientTranferAct = ContextManager.Instance["IsPatientTranferAct"].toString();
        }

    }

    constructor(private cdr:ChangeDetectorRef) {
        super();
        that = this;
    }

    private UserControl_Loaded(sender: Object, e: RoutedEventArgs): void {
        if (PatientContext.IPPMADU_P2) {
            this.ichkBoxSearchOrderSet.Visibility = Visibility.Visible;
        }
        else {
            // this.ichkBoxSearchOrderSet.Visibility = Visibility.Collapsed;
        }
        this.ladSearch.OnSecondarySelection = undefined;
        this.ladSearch.OnSelect = undefined;
        this.ladSearch.GotFocus = undefined;
        this.ladSearch.OnSecondarySelection = (s, e) => { this.ladSearch_OnSelect(s, e) };
        this.ladSearch.OnSelect = (s, e) => { this.ladSearch_OnSelect(s, e) };
        this.ladSearch.GotFocus = (s, e) => { this.ladSearch_GotFocus(s, e) };
        if (!this.bIsLoaded) {
            var lstProfileReq: ProfileContext[];
            lstProfileReq = new Array();
            // var lstProfileReq: List<ProfileContext> = new List<ProfileContext>();
            var objReq: ProfileContext = new ProfileContext();
            objReq.ContextCode = "VW_MEDICONFIG";
            objReq.ProfileItemKey = "MEDSEARCHCONFIG";
            objReq.ProfileType = typeof MedicationSearchConfigData;
            objReq.ProfileLevel = ProfileFactoryType.Level.User;
            lstProfileReq.push(objReq);
            objReq = new ProfileContext();
            objReq.ContextCode = "VW_MEDICONFIG";
            objReq.ProfileItemKey = "PRESCONFIG";
            objReq.ProfileType = typeof PrescribingConfigData;
            objReq.ProfileLevel = ProfileFactoryType.Level.Organisation;
            lstProfileReq.push(objReq);
            objReq = new ProfileContext();
            objReq.ContextCode = "VW_MEDICONFIG";
            objReq.ProfileItemKey = "DRUGDISPCONFIG";
            objReq.ProfileType = typeof MedDrugDisplayConfigData;
            objReq.ProfileLevel = ProfileFactoryType.Level.User;
            lstProfileReq.push(objReq);
            this.profile.GetProfilesData(lstProfileReq);
            ProcessRTE.GetValuesByDomainCodes(ValueDomain.ProductType + "," + ValueDomain.MedicationOcInPrd, (e) => { this.OnRTEResult(e) });
            let objCurrentVM: IPPMABaseVM = ObjectHelper.__as__<IPPMABaseVM>(this.DataContext, IPPMABaseVM);
            //Revisit required, moved out of if loop
            /*
            if (objCurrentVM != null) {
                // objCurrentVM.TeamBasedSearchDrugCatalogueCompleted =undefined//-= new IPPMABaseVM.TeamBasedSearchDrugCatalogueDelegate(objCurrentVM_TeamBasedSearchDrugCatalogueCompleted);
                objCurrentVM.TeamBasedSearchDrugCatalogueCompleted = (s,e) => {this.objCurrentVM_TeamBasedSearchDrugCatalogueCompleted()};
                if (!String.IsNullOrEmpty(objCurrentVM.sTeamOIDs)) {
                    if (!String.IsNullOrEmpty(objCurrentVM.sTeamNames)) {
                        this.lblTeamName.Visibility = Visibility.Visible;
                        this.lblTeamName.Text = "Team:" + objCurrentVM.sTeamNames;
                        // lblTeamName.SetValue(ToolTipService.ToolTipProperty, objCurrentVM.sTeamNames);
                        this.lblTeamName.Foreground = new SolidColorBrush(Colors.Red);
                    }
                }
                else {
                    this.lblTeamName.Visibility = Visibility.Collapsed;
                    this.lblTeamName.Text = String.Empty;
                }
            }*/
            if (String.Compare(ContextInfo.MenuCode, CConstants.ClinicallyVerifyMenuCode, StringComparison.InvariantCultureIgnoreCase) == 0 && (String.Compare(PatientContext.PrescriptionType, PrescriptionTypes.Clerking, StringComparison.OrdinalIgnoreCase) == 0 || String.Equals(PatientContext.ClerkFormViewDefaultBehavior, ClerkFormViewDeftBehaviour.LaunchFormMandatory))) {
              
                objCurrentVM.CV_SearchTabSelect_Completed.subscribe(d => {
                    if(objCurrentVM !=null && objCurrentVM.MedicationClerkingSource !=null)
                    {
                    //  ObjectHelper.stopFinishAndCancelEvent(true);
                     this.oMultiSelectListView =new MultiSelectListView();
                     this.oMultiSelectListView.constructorImpl (ValueDomain.MedicationClerking, objCurrentVM.MedicationClerkingSource.ToList());
                     AppActivity.OpenWindow("Medication clerking source - LORENZO", this.oMultiSelectListView,(s,e) => {this.oMultiSelectListView_Closed(s);} , "", false, 625, 450, false, WindowButtonType.OkCancel, null);
                    }
                });
                
            }
            if (objCurrentVM != null && objCurrentVM.QuickSelectVM == null) {
                objCurrentVM.QuickSelectVM = new MedQuickSelectVM();
                console.log("UserControl_Loaded", objCurrentVM, new MedQuickSelectVM());

            }
            if (objCurrentVM != null && objCurrentVM.QuickSelectVM != null) {
                if (this.objSearch == null)

                    this.objSearch = objCurrentVM.QuickSelectVM;
            }
            this.objSearch.CAFlag = false;
            this.objSearch.CAFlag = UserPermissions.PrescribeWithRestriction && (String.Compare(PatientContext.PrescriptionType, PrescriptionTypes.Clerking) != 0);
            if (this.objSearch.CAFlag)
                this.txtSearch.IsReadOnly = true;
            else this.txtSearch.IsReadOnly = false;
            this.objSearch.SMCVersion = AppSessionInfo.AMCV;
            if (MedicationCommonProfileData.MedViewConfig != null) {
                this.objSearch.LoadFavourites = MedicationCommonProfileData.MedViewConfig.Favourites;
                this.objSearch.LoadFormularies = MedicationCommonProfileData.MedViewConfig.Formulary;
            }
            this.oVM = ObjectHelper.__as__<IPPMABaseVM>(super.DataContext, IPPMABaseVM);
            if (this.oVM != null)
                this.cmdMCI.IsEnabled = this.oVM.bEnableADHOCMCI;
            this.bIsLoaded = true;
            if (objCurrentVM != null)
                objCurrentVM.PrescriptionItemAddedEvent = (e) => { this.objCurrentVM_PrescriptionItemAddedEvent(e) };
        }
        //Revisit required - brought out side of above if loop
        let objCurrVM: IPPMABaseVM = ObjectHelper.__as__<IPPMABaseVM>(this.DataContext, IPPMABaseVM);
        if (objCurrVM != null) {            
            objCurrVM.TeamBasedSearchDrugCatalogueCompleted = (s,e) => {this.objCurrentVM_TeamBasedSearchDrugCatalogueCompleted()};
            if (!String.IsNullOrEmpty(objCurrVM.sTeamOIDs)) {
                if (!String.IsNullOrEmpty(objCurrVM.sTeamNames)) {
                    this.lblTeamName.Visibility = Visibility.Visible;
                    this.lblTeamName.Text = "Team:" + objCurrVM.sTeamNames;
                    // lblTeamName.SetValue(ToolTipService.ToolTipProperty, objCurrentVM.sTeamNames);
                    this.lblTeamName.Foreground = new SolidColorBrush(Colors.Red);
                }
            }
            else {
                this.lblTeamName.Visibility = Visibility.Collapsed;
                this.lblTeamName.Text = String.Empty;
            }
        }

        this.txtSearch.KeyUp = (s, e) => { this.txtSearch_KeyUp(s, e) };
        this.txtSearch.KeyDown = (s, e) => { this.txtSearch_KeyDown(s, e) };
        this.txtSearch.Focus();
    }
    ladSearch_GotFocus(sender: Object, e: RoutedEventArgs): void {
        this.txtSearch.Focus();
    }
    profile_OnProfileLoaded(sender: Object, Result: List<ProfileContext>): void {
        if (Result == null)
            return
        Result.forEach((oProfileContext) => {
            console.log(oProfileContext, "oprofileContext");
            if (String.Compare(oProfileContext.ContextCode, "VW_MEDICONFIG") == 0 && String.Compare(oProfileContext.ProfileItemKey, "MEDSEARCHCONFIG") == 0) {
                if (oProfileContext.ProfileData instanceof MedicationSearchConfigData) {
                    ProfileData.MedSearchConfig = ObjectHelper.CreateType<MedicationSearchConfigData>(oProfileContext.ProfileData, MedicationSearchConfigData);
                    console.log('inside foreach', ProfileData.MedSearchConfig);
                }
            }
            else if (String.Compare(oProfileContext.ContextCode, "VW_MEDICONFIG") == 0 && String.Compare(oProfileContext.ProfileItemKey, "PRESCONFIG") == 0) {
                if (oProfileContext.ProfileData instanceof PrescribingConfigData) {
                    MedicationCommonProfileData.PrescribeConfig = ObjectHelper.__as__<PrescribingConfigData>(oProfileContext.ProfileData, PrescribingConfigData);
                }
            }
            else if (String.Compare(oProfileContext.ContextCode, "VW_MEDICONFIG") == 0 && String.Compare(oProfileContext.ProfileItemKey, "DRUGDISPCONFIG") == 0) {
                if (oProfileContext.ProfileData instanceof MedDrugDisplayConfigData) {
                    ProfileData.MedDrugDisplayConfig = ObjectHelper.__as__<MedDrugDisplayConfigData>(oProfileContext.ProfileData, MedDrugDisplayConfigData);                    
                    this.InitVM();
                    this.ApplyiPowerSearchStyle();
                    this.DrawArrowImage();
                }
            }
        });

        console.log('after foreach - medsearchconfig', ProfileData.MedSearchConfig);
        console.log('after foreach - prescribeconfig', MedicationCommonProfileData.PrescribeConfig);
        console.log('after foreach - MeddrugDisplayConfig', ProfileData.MedDrugDisplayConfig);





        if (MedicationCommonProfileData.PrescribeConfig != null && ProfileData.MedDrugDisplayConfig != null) {
            if (MedicationCommonProfileData.PrescribeConfig != null) {
                if (this.CanDefaultPaediatricsFolder(MedicationCommonProfileData.PrescribeConfig.PaediatricsAgeRange, MedicationCommonProfileData.PrescribeConfig.PaediatricsAgeRangeTop, MedicationCommonProfileData.PrescribeConfig.PaediatricsAgeUOM)) {
                    this.objSearch.SFolderLorenzoID = MedicationCommonProfileData.PrescribeConfig.FavouriteFolderLorenzoID;
                }
                this.objSearch.SCommonFolderLorenzoID = (!String.IsNullOrEmpty(MedicationCommonProfileData.PrescribeConfig.CommonFavoFolder)) ? MedicationCommonProfileData.PrescribeConfig.CommonFavoLorenzoID : String.Empty;
                ;
                this.objSearch.SCDCFolderLorenzoID = (!String.IsNullOrEmpty(MedicationCommonProfileData.PrescribeConfig.CommonCDCFavFolder)) ? MedicationCommonProfileData.PrescribeConfig.CommonCDCFavLzoID : String.Empty;
                ;
            }
            this.objSearch.LoadUserFavourites = MedicationCommonProfileData.PrescribeConfig.AllowUserFavorites;
            this.objSearch.PopulateQuickLinksCombo();
            if (this.oVM == null)
                this.oVM = ObjectHelper.__as__<IPPMABaseVM>(super.DataContext, IPPMABaseVM);
            this.oVM.QuickSelectVM = this.objSearch;
            this.DataContext = this.objSearch;
        }
    }
    // private ladSearch_SecondarySelection(sender: Object, e: OnSelectArgs): void {
    //     iBusyIndicator.Start("FormViewer", true);
    //     CommonVariables.FormViewerIsInProgress = true;
    //     this.oDrugItemInputData = new DrugItemInputData();
    //     var sData: string[];
    //     sData = e.Value.split('~');
    //     this.oDrugItemInputData.FormularyNote = sData[6];
    //     this.oDrugItemInputData.IdentifyingOID = Convert.ToInt64(sData[0]);
    //     this.oDrugItemInputData.IdentifyingType = sData[1];
    //     this.oDrugItemInputData.MCVersionNo = AppSessionInfo.AMCV;
    //     this.oDrugItemInputData.IsFormulary = (String.Compare(sData[7], "1", StringComparison.OrdinalIgnoreCase) == 0) ? true : false;
    //     this.oDrugItemInputData.FavouritesDetailOID = 0;
    //     this.oDrugItemInputData.IsAccessContraint = sData[2];
    //     this.oDrugItemInputData.IsPrescribeByBrand = sData[3];
    //     this.oDrugItemInputData.ItemType = sData[5];
    //     this.oDrugItemInputData.LorenzoID = sData[8];
    //     this.oDrugItemInputData.ITMSUBTYP = sData[10];
    //     this.oDrugItemInputData.IsIndicationRequired = sData[12];
    //     this.sIsAccessContraint = this.oDrugItemInputData.IsAccessContraint;
    //     this.sIsIndicationRequired = this.oDrugItemInputData.IsIndicationRequired;
    //     this.oDrugItemInputData.SourceDataProviderType = sData[4];
    //     if (String.Compare(sData[1], CConstants.NONCATALOGUEITEM, StringComparison.OrdinalIgnoreCase) == 0) {
    //          this.oDrugItemInputData.IdentifyingName = MedicationForm.TypeInValue;  

    //         this.oDrugItemInputData.IdentifyingName = MedicationForm.TypeInValue;

    //         this.oVM.IsTypeInDrug = true;
    //         if (this.oVM != null && this.oVM.DefaultStationaryType == null)
    //             this.oVM.GetStationaryType();
    //         this.oVM.PrescribeNonCatalogueItem(this.oDrugItemInputData);

    //     }
    //     else if (String.Compare(sData[1], CConstants.Orderset, StringComparison.OrdinalIgnoreCase) == 0) {
    //         var orsname: string = sData.length > 9 ? sData[9] : e.Text;
    //         this.LaunchOrderSetMezzanine(sData[0], orsname); 
    //     }
    //     else {
    //         this.oDrugItemInputData.IdentifyingName = sData.length > 9 ? sData[9] : e.Text;
    //         this.oVM.IsOtherClick = true;
    //         this.oVM.PrescribeNewItem(this.oDrugItemInputData);
    //     }
    // }
    private ladSearch_OnSelect(sender: Object, e: OnSelectArgs): void {
        if (String.IsNullOrEmpty(e.Value))
            return
        var evalue: string = e.Value;
        var etext: string = e.Text;
        this.oVM.LaunchSecondaryScreenForQuickSelectORGPConnect(evalue, etext, this.oVM.IsCatalogue);
    }
    oORSChild_Closed(args: AppDialogEventargs): void {
        //Not Required for LHS. To be Re-Visited.
        if (args.Result == AppDialogResult.Ok) {
            var objmezz: OrderSetSecMezzanine = ObjectHelper.CreateType<OrderSetSecMezzanine>(args.Content.Component, OrderSetSecMezzanine);
            if (!Common.OssOkClick(objmezz)) { // only Stub Method name only here without implementation
                return
            }
            var objItems: ObservableCollection<Object> = new ObservableCollection<Object>();
            objmezz.grdPatientSelect.GetSelectedRowsIndexByOrderNew().forEach((i) => { //grdPatientSelect iGrid Child Window .now any type
                objItems.Add(objmezz.grdPatientSelect.GetRowData(i));
            });
            if (objItems.Count <= 0) { //redirect ORSSecMezzanine.designer.cs
                iMessageBox.Show("Lorenzo", Resource.ORSSecMezzanine.ORSOKClick_Text, MessageBoxType.Information, MessageBoxButton.OK);
            }
            else {

                Busyindicator.SetStatusIdle("Favourites");
                Busyindicator.SetStatusIdle("FormViewer");
                Busyindicator.SetStatusIdle("Orderset");
                Busyindicator.SetStatusBusy("OrderSetPrescribe1");
                var objPresItmCollection: ObservableCollection<PrescriptionItemVM> = new ObservableCollection<PrescriptionItemVM>();
                for (let i = 0; i < objItems.Count; i ++) {
                    let obj : Object = objItems[i];

                    var objassociation: PrescriptionItemAssociations = ObjectHelper.__as__<PrescriptionItemAssociations>(obj, PrescriptionItemAssociations);
                    if (objassociation != null && objassociation.PrescrptionItem != null) {
                        if (objassociation.PrescrptionItem.OsInstance != null && objassociation.PrescrptionItem.OsInstance.OsIsGroupHeader) {
                            break;
                        }
                        objassociation.PrescrptionItem.FormViewerDetails.BasicDetails.IsLoadingDataForOrderSentence = true;
                        if (objassociation.PrescrptionItem.ActionCode == ActivityTypes.Prescribe) {
                            objassociation.PrescrptionItem.ePrescribeSource = PrescribeSource.DOS;
                        }
                        if (PatientContext.PrescriptionType != PrescriptionTypes.Clerking) {
                            if (objassociation.IsPresOpenFVVisiblity == Visibility.Visible)
                                objassociation.PrescrptionItem.formViewerDetails.BasicDetails.IsDoNotOpenFVForOrderSet = !objassociation.IsPresOpenFVChecked;
                            else objassociation.PrescrptionItem.formViewerDetails.BasicDetails.IsDoNotOpenFVForOrderSet = null;
                        }
                        objPresItmCollection.Add(objassociation.PrescrptionItem);
                    }
                }
                objPresItmCollection.Where(x => x.OsInstance != null
                    && x.OsInstance.OsIsSequential && !x.OsInstance.OsIsProtected).GroupBy(x => x.OsInstance.OsSeqGroupNo).ForEach((x) => {
                        x.ForEach(y => {
                            y.OsInstance.OsIsFirstItem = false;
                            y.OsInstance.OsIsLastItem = false;
                        });
                        x.First().OsInstance.OsIsFirstItem = true;
                        x.LastOrDefault().OsInstance.OsIsLastItem = true;
                    });
                this.oVM.orsseqcount = 1;
                this.oVM.CallOrderSetSequence(objPresItmCollection, 0);
                // this.oORSChild.appDialog.DialogResult = false;
                // ObjectHelper.stopFinishAndCancelEvent(false);
                args.AppChildWindow.DialogResult = true;
            }
        }
        else if (args.Result == AppDialogResult.Cancel) {
            // this.oORSChild.appDialog.DialogResult = false;
            // ObjectHelper.stopFinishAndCancelEvent(false);
            args.AppChildWindow.DialogResult = true;
            Busyindicator.SetStatusIdle("Favourites");
            Busyindicator.SetStatusIdle("FormViewer");
            Busyindicator.SetStatusIdle("Orderset");
        }
    }

    
    cboQuickLinks_SelectionChanged_Func = (s, e) => {
        ObjectHelper.CreateObject(this, that);
        this.cboQuickLinks_SelectionChanged(s, e);
        this.tvwMedFromulary.ResetExpansion();
        this.tvwMedFavourites.ResetExpansion();
    }

    private cboQuickLinks_SelectionChanged(sender: Object, e: SelectionChangedEventArgs): void {
        this.lSelectedCommonMedID = 0;
        let oTrVwColl = new iTreeViewCollection();
        var clistItem: CListItem = ObjectHelper.__as__<CListItem>(this.cboQuickLinks.SelectedItem, CListItem);
        if (clistItem != null && clistItem.Level != 0) {
            if (this.cboQuickLinks.GetValue() != null) {
                var aryLst: string[] = this.cboQuickLinks.GetValue().split('^'); //Convert.ToString(e).split('^');
                if (String.Compare(aryLst[0], "F") == 0) {
                    this.FormularyOId = Convert.ToInt64(aryLst[1]);
                    this.sMCVersion = AppSessionInfo.AMCV;
                    this.tvwMedFavourites.Visibility = Visibility.Collapsed;
                    this.tvwMedFromulary.Visibility = Visibility.Visible;
                    this.ladSearch.Visibility = Visibility.Collapsed;
                    this.txtSearch.Text = String.Empty;
                    this.ichkBoxSearchOrderSet.IsChecked = false;
                    this.lblQLinkName.Visibility = Visibility.Visible;
                    this.lblQLinkName.Text = "Formulary";
                    this.isFirst = true;
                    this.PopulateTreeView(this.FormularyOId, 0, "DRUGHIERARCHY");
                }
                else if (String.Compare(aryLst[0], "C") == 0) {
                    this.tvwMedFavourites.Visibility = Visibility.Visible;
                    this.tvwMedFromulary.Visibility = Visibility.Collapsed;
                    this.ladSearch.Visibility = Visibility.Collapsed;
                    this.txtSearch.Text = String.Empty;
                    this.ichkBoxSearchOrderSet.IsChecked = false;
                    this.lblQLinkName.Visibility = Visibility.Visible;
                    this.FAVOID = Convert.ToInt64(aryLst[1]);
                    this.USEROID = Convert.ToInt64(aryLst[2]);
                    if (this.USEROID > 0) {
                        this.lblQLinkName.Text = "My favourites";
                    }
                    else {
                        this.lblQLinkName.Text = "Common medicines ";
						this.lblQLinkName.FontWeight = '600';
                    }
                    this.isFirst = true;
                    oTrVwColl = new iTreeViewCollection();
                    if (this.objCurrentVM != null && this.objSearch != null) {
                        this.objCurrentVM.sTeamOIDs = this.objSearch.TeamOIDs;
                    }
                    this.tvwMedFavourites.TreeViewDataContext = null;
                    this.tvwMedFavourites.TreeViewDataContext = oTrVwColl;
                    this.PopulateFavouritesTree();
                }
                else if (String.Compare(aryLst[0], "O") == 0) {
                    this.tvwMedFavourites.Visibility = Visibility.Visible;
                    this.tvwMedFromulary.Visibility = Visibility.Collapsed;
                    this.ladSearch.Visibility = Visibility.Collapsed;
                    this.txtSearch.Text = String.Empty;
                    this.ichkBoxSearchOrderSet.IsChecked = false;
                    this.lblQLinkName.Visibility = Visibility.Visible;
                    this.isFirst = true;
                    oTrVwColl = new iTreeViewCollection();
                    this.tvwMedFavourites.TreeViewDataContext = null;
                    this.tvwMedFavourites.TreeViewDataContext = oTrVwColl;
                    this.PopulateOrderSetsTree();
                }
                else if (!String.IsNullOrEmpty(aryLst[0])) {
                    this.tvwMedFavourites.Visibility = Visibility.Collapsed;
                    this.tvwMedFromulary.Visibility = Visibility.Collapsed;
                    this.ladSearch.Visibility = Visibility.Visible;
                    this.lblQLinkName.Visibility = Visibility.Collapsed;
                }
            }
        }
        else {
            if (e.RemovedItems != null && e.RemovedItems.Count > 0 && e.RemovedItems[0] != null) {
                clistItem = ObjectHelper.__as__<CListItem>(e.RemovedItems[0], CListItem);
                if (clistItem != null && clistItem.Level != 0)
                    this.cboQuickLinks.SelectedItem = e.RemovedItems[0];
            }
        }
    }
    public PopulateOrderSetsTree(): void {//private
        console.log(oRequest)
        var objservice1: IPPMAManagePrescriptionWSSoapClient = new IPPMAManagePrescriptionWSSoapClient();
        objservice1.GetIPPMAOrderSetItemsListCompleted =  (s,e) => {this.objservice1_GetIPPMAOrderSetItemsListCompleted(s,e)};
        var oRequest: CReqMsgGetIPPMAOrderSetItemsList = new CReqMsgGetIPPMAOrderSetItemsList();
        oRequest.MCVersionBC = AppSessionInfo.AMCV;
	oRequest.sTeamOIDsBC = this.objCurrentVM.sTeamOIDs;
        oRequest.oContextInformation = CommonBB.FillContext();
        objservice1.GetIPPMAOrderSetItemsListAsync(oRequest);
        // objservice1.GetIPPMAOrderSetItemsListAsync(oRequest, (s, e) => { this.objservice1_GetIPPMAOrderSetItemsListCompleted(s, e) });
    }
    objservice1_GetIPPMAOrderSetItemsListCompleted(sender: Object, e: GetIPPMAOrderSetItemsListCompletedEventArgs): void {

        let oTrVwColl = new iTreeViewCollection();
        var _ErrorID: number = 80000060;
        var _ErrorSource: string = "LorAppManagePrescriptionBBUI_P2.dll, Class:Medquickselect, Method:objservice1_GetIPPMAOrderSetItemsListCompleted()";
        if (e.Error == null) {
            try {

                var oResMsgGetIPPMAOrderSetItemsList: CResMsgGetIPPMAOrderSetItemsList = e.Result;
                if (oResMsgGetIPPMAOrderSetItemsList != null && oResMsgGetIPPMAOrderSetItemsList.oFavouriteItem != null && oResMsgGetIPPMAOrderSetItemsList.oFavouriteItem.PrescriptionItem != null && oResMsgGetIPPMAOrderSetItemsList.oFavouriteItem.PrescriptionItem.Count > 0) {
                    var nItemCount: number = 0;
                    nItemCount = oResMsgGetIPPMAOrderSetItemsList.oFavouriteItem.PrescriptionItem.Count;
                    var ArrListItem: CTreeListItem = null;
                    for (var nIndex: number = 0; nIndex < nItemCount; nIndex++) {
                        this.oColl = new List<TreeImageCollection>();
                        var TC: TreeImageCollection = new TreeImageCollection();
                        TC.ImageSource = MedImage.GetPath(MedImages.ImgOrderSet);
                        TC.ToolTip = Resource.Orderset.OrderSetIcon_ToolTip;
                        TC.IconSource = MedImage.GetPath(MedImages.ImgOrderSet);
                        TC.IconToolTip = Resource.Orderset.OrderSetIcon_ToolTip;
                        if (oResMsgGetIPPMAOrderSetItemsList.oFavouriteItem.PrescriptionItem.array[nIndex].IsExcludeGuidanceInSearch != '1') {
                            if (!String.IsNullOrEmpty(oResMsgGetIPPMAOrderSetItemsList.oFavouriteItem.PrescriptionItem.array[nIndex].Guidance)) {
                                TC.NotesData = oResMsgGetIPPMAOrderSetItemsList.oFavouriteItem.PrescriptionItem.array[nIndex].Guidance;
                                TC.NotesIconMargin = new Thickness(5, 0, 0, 0);

                                if (TC.NotesData.length > 200)
                                    TC.NotesToolTip = TC.NotesData.substring(0, 199) + "...";
                                else TC.NotesToolTip = TC.NotesData;
                                TC.NotesIcon = MedImage.GetPath(MedImages.NoteIcon);
                            }
                        }
                        this.oColl.Add(TC);
                        ArrListItem = new CTreeListItem();
                        ArrListItem.IconCollection = this.oColl;
                        ArrListItem.Value = oResMsgGetIPPMAOrderSetItemsList.oFavouriteItem.PrescriptionItem.array[nIndex].Name;
                        ArrListItem.ParentKey = null; //"0";
                        ArrListItem.Key = oResMsgGetIPPMAOrderSetItemsList.oFavouriteItem.PrescriptionItem.array[nIndex].OID.toString();
                        ArrListItem.Tag = oResMsgGetIPPMAOrderSetItemsList.oFavouriteItem.PrescriptionItem[nIndex].OID.toString() + "~" + oResMsgGetIPPMAOrderSetItemsList.oFavouriteItem.PrescriptionItem.array[nIndex].Name + "~" + oResMsgGetIPPMAOrderSetItemsList.oFavouriteItem.PrescriptionItem.array[nIndex].Type + '~' + "" + '~' + "" + '~' + "" + '~' + oResMsgGetIPPMAOrderSetItemsList.oFavouriteItem.PrescriptionItem.array[nIndex].MCVersion + '~' + "" + '~' + "" + '~' + "0" + '~' + "" + '~' + "" + '~' + "" + '~' + "" + '~' + "" + '~' + "";
                        oTrVwColl.Add(ArrListItem);
                    }
                    this.tvwMedFavourites.TreeViewDataContext = null;
                    this.tvwMedFavourites.TreeViewDataContext = oTrVwColl;
                }
                // Busyindicator.SetStatusIdle("SearchItem");
            }
            catch (ex: any) {
                var lnReturn: number = AMSHelper.PublicExceptionDetails(_ErrorID, _ErrorSource, ex);
            }

        }
        else {
            var lnReturn: number = AMSHelper.PublicExceptionDetails(_ErrorID, _ErrorSource, e.Error);
        }
        // Busyindicator.SetStatusIdle("SearchItem");
    }

    private PopulateFavouritesTree(): void {
        this.FAVFirstLoad = 0;
        this.GetFavChldFld(this.FAVOID);
    }
    private GetItemFav(nFAVOID: number): void {
        var objservice1: IPPMAManagePrescriptionWSSoapClient = new IPPMAManagePrescriptionWSSoapClient();
        objservice1.GetIPPMAMedicationFavouritesGroupItemsListCompleted = (s,e) => {this.objservice1_GetIPPMAMedicationFavouritesGroupItemsListCompleted(s,e)};
        var oRequest: CReqMsgGetIPPMAMedicationFavouritesGroupItemsList = new CReqMsgGetIPPMAMedicationFavouritesGroupItemsList();
        oRequest.FavGroupOIdBC = nFAVOID;
        oRequest.sTeamOIDsBC = this.objCurrentVM?.sTeamOIDs;
        oRequest.MCVersionBC = AppSessionInfo.AMCV;
        oRequest.oContextInformation = CommonBB.FillContext();
        this.lSelectedCommonMedID = nFAVOID;
        if (oRequest.oContextInformation != null) {
            oRequest.oContextInformation.PageInfo = Convert.ToString(nFAVOID);
        }
        objservice1.GetIPPMAMedicationFavouritesGroupItemsListAsync(oRequest);
        // objservice1.GetIPPMAMedicationFavouritesGroupItemsListAsync(oRequest, (s, e) => { this.objservice1_GetIPPMAMedicationFavouritesGroupItemsListCompleted(s, e) });
    }
    private GetFavChldFld(nFAVOID: number): void {
        var objService2: MedicationMgmtWSSoapClient = new MedicationMgmtWSSoapClient();
        objService2.GetFavouritesChildGroupCompleted = (s,e) => {this.objService_GetFavouritesChildGroupCompleted(s,e)};
        var oReqMsgGetFavouritesChildGroup: CReqMsgGetFavouritesChildGroup = new CReqMsgGetFavouritesChildGroup();
        oReqMsgGetFavouritesChildGroup.ParentOIdBC = nFAVOID;
        oReqMsgGetFavouritesChildGroup.UserOIdBC = 0;
        oReqMsgGetFavouritesChildGroup.MCVersionBC = AppSessionInfo.AMCV;
        oReqMsgGetFavouritesChildGroup.oContextInformation = CommonBB.FillContext();
        this.lSelectedCommonMedID = nFAVOID;
        if (oReqMsgGetFavouritesChildGroup.oContextInformation != null) {
            oReqMsgGetFavouritesChildGroup.oContextInformation.PageInfo = Convert.ToString(nFAVOID);
        }
        objService2.GetFavouritesChildGroupAsync(oReqMsgGetFavouritesChildGroup);
        // objService2.GetFavouritesChildGroupAsync(oReqMsgGetFavouritesChildGroup, (s, e) => { this.objService_GetFavouritesChildGroupCompleted(s, e) });
    }
    objService_GetFavouritesChildGroupCompleted(sender: Object, e: GetFavouritesChildGroupCompletedEventArgs): void {
        let oTrVwColl = new iTreeViewCollection();
        var _ErrorID: number = 80000061;
        var _ErrorSource: string = "LorAppManagePrescriptionBBUI_P2.dll, Class:MedQuickSelect, Method:objService_GetFavouritesChildGroupCompleted()";
        var objCResMsgGetFrmHIERARCHY: CResMsgGetFavouritesChildGroup = e.Result;
        var lFavOID: number = 0;
        if (objCResMsgGetFrmHIERARCHY != null && objCResMsgGetFrmHIERARCHY.oContextInformation != null && !String.IsNullOrEmpty(objCResMsgGetFrmHIERARCHY.oContextInformation.PageInfo)) {
            //number.TryParse(objCResMsgGetFrmHIERARCHY.oContextInformation.PageInfo, lFavOID);

            Long.TryParse(objCResMsgGetFrmHIERARCHY.oContextInformation.PageInfo, (o1) => {
                lFavOID = o1;
            })
        }
        if (e.Error == null) {
            try {
                if (objCResMsgGetFrmHIERARCHY.oArrFavouriteItem != null && objCResMsgGetFrmHIERARCHY.oContextInformation != null && !String.IsNullOrEmpty(objCResMsgGetFrmHIERARCHY.oContextInformation.PageInfo) && this.lSelectedCommonMedID > 0 &&
                    String.Equals(this.lSelectedCommonMedID.toString(), objCResMsgGetFrmHIERARCHY.oContextInformation.PageInfo)) {
                    var oColl: List<TreeImageCollection> = null;
                    var nFavCnt: number = objCResMsgGetFrmHIERARCHY.oArrFavouriteItem.Count;
                    for (var i: number = 0; i < nFavCnt; i++) {
                        var sFavouriteItemID: string = "";
                        var sName: string = "";
                        var sDFOID: string = "";
                        oColl = new List<TreeImageCollection>();

                        oColl.Add(ObjectHelper.CreateObject(new TreeImageCollection(), {
                            ImageSource: MedImage.GetPath(MedImages.ImgFolderClose),
                            IconSource: MedImage.GetPath(MedImages.ImgFolderClose)
                        }));
                        this.oItem = new CTreeListItem();
                        sFavouriteItemID = Convert.ToString(objCResMsgGetFrmHIERARCHY.oArrFavouriteItem.array[i].FavouriteItemID);
                        sName = Convert.ToString(objCResMsgGetFrmHIERARCHY.oArrFavouriteItem.array[i].Name);
                        sDFOID = Convert.ToString(objCResMsgGetFrmHIERARCHY.oArrFavouriteItem.array[i].DFOID);
                        this.oItem.Key = sFavouriteItemID;
                        this.oItem.Value = sName;
                        this.oItem.Tag = sDFOID;
                        if (this.FAVFirstLoad == 0)
                            this.oItem.ParentKey = null; //"0";
                        else this.oItem.ParentKey = this.oNode.Key;
                        this.oItem.ImageCollection = oColl;
                        if (!oTrVwColl.Any(x => x.Key.Equals(this.oItem.Key, StringComparison.InvariantCultureIgnoreCase))) {
                            oTrVwColl.Add(this.oItem);
                            this.oItemChild = new CTreeListItem();
                            this.oItemChild.Key = "DUMMY_" + sFavouriteItemID;
                            this.oItemChild.Value = "DUMMY_" + sName;
                            this.oItemChild.Tag = "DUMMY_" + sDFOID;
                            this.oItemChild.ParentKey = sFavouriteItemID;
                            oTrVwColl.Add(this.oItemChild);
                        }
                        // Need to check(Additional code)
                        // this.tvwMedFavourites.DataContext = null;
                        // this.tvwMedFavourites.DataContext = this.oTrVwColl;
                        if (oTrVwColl.Length > 0) {
                            // this.tvwMedFavourites.TreeViewDataContext = oTrVwColl; // -- Sai Change --
                            this.tvwMedFavourites.TreeViewDataContext = this.MergeTreeViewDataContextData(this.tvwMedFavourites.TreeViewDataContext, oTrVwColl);
                        }
                    }
                    if (lFavOID > 0) {
                        this.GetItemFav(lFavOID);
                    }
                }
                else {
                    // Need to check(Additional code)
                    // this.tvwMedFavourites.DataContext = null;
                    // this.tvwMedFavourites.DataContext = this.oTrVwColl;
                    if(oTrVwColl.Length > 0)
                        this.tvwMedFavourites.TreeViewDataContext = oTrVwColl;
                    // this.tvwMedFavourites.TreeViewDataContext = this.MergeTreeViewDataContextData(this.tvwMedFavourites.TreeViewDataContext, oTrVwColl);
                    if (lFavOID > 0) {
                        this.GetItemFav(lFavOID);
                    }
                }
            }
            catch (ex: any) {
                var lnReturn: number = AMSHelper.PublicExceptionDetails(_ErrorID, _ErrorSource, ex);
            }

        }
        else {
            if (lFavOID > 0) {
                this.GetItemFav(lFavOID);
            }
            var lnReturn: number = AMSHelper.PublicExceptionDetails(_ErrorID, _ErrorSource, e.Error);
        }
    }
    tvwMedFavourites_Expanded_Func = (s, e) => {
        ObjectHelper.CreateObject(this, that);
        // console.log("tvwMedFavourites_Expanded_Func", this, this.tvwMedFavourites, this._tvwMedFavourites);
        this.tvwMedFavourites_Expanded(s, e);
    }
    private tvwMedFavourites_Expanded(sender: Object, e: RadRoutedEventArgs): void {
        this.oSelectedNode = <CTreeListItem>((<RadTreeViewItem>(e.Source)).Item);
        if (this.oSelectedNode != null) {
            this.oNode = this.oSelectedNode;
            this.oNode.Expanded = true;

            //// Start-- Need to check
            // this.oSelectedNode.Children = new ObservableCollection<CTreeListItem>();
            // let cListItem = new CTreeListItem();
            // cListItem.Key = 'Dummy_';

            // this.oSelectedNode.Children.Add(cListItem);
            // this.oSelectedNode.Children.Add(this.oTrVwColl.Where(i => 
            //     (i.ParentKey == this.oSelectedNode.Key) && (Convert.ToString(i.Key).StartsWith('DUMMY_'))));
            // let children = this.oTrVwColl.Where(i => i.ParentKey == this.oSelectedNode.Key);
            // children.ToList().forEach((child) => {
            //     this.oSelectedNode.Children.Add(child);
            // });
            //// End -- Need to check

            this.tvwMedFavourites.DeleteNode("DUMMY_" + this.oNode.Key);
            if (this.oSelectedNode.Children != null && this.oSelectedNode.Children.Count > 0) {
                if (this.oSelectedNode.ImageCollection != null) {
                    this.oSelectedNode.ImageCollection.Clear();

                    this.oSelectedNode.ImageCollection.Add(ObjectHelper.CreateObject(new TreeImageCollection(), {
                        ImageSource: MedImage.GetPath(MedImages.ImgFolderOpen),
                        IconSource: MedImage.GetPath(MedImages.ImgFolderOpen)
                    }));
                }
                var dummyNode = this.oSelectedNode.Children.Where(x => x.Key == "DUMMY_" + this.oNode.Key).FirstOrDefault();
                if (dummyNode != null) {
                    this.FAVFirstLoad = 1;
                    this.GetFavChldFld(Convert.ToInt64(this.oNode.Key));
                }
            }
        }
    }
    objservice1_GetIPPMAMedicationFavouritesGroupItemsListCompleted(sender: Object, e: GetIPPMAMedicationFavouritesGroupItemsListCompletedEventArgs): void {
        let oTrVwColl = new iTreeViewCollection();
        var _ErrorID: number = 80000060;
        var _ErrorSource: string = "LorAppManagePrescriptionBBUI_P2.dll, Class:Medquickselect, Method:objservice1_GetIPPMAMedicationFavouritesGroupItemsListCompleted()";
        var odictCheck: Dictionary<string, number> = new Dictionary<string, number>();
        if (e.Error == null) {
            try {
                var oResMsgGetFavouritesGroupItems: CResMsgGetIPPMAMedicationFavouritesGroupItemsList = e.Result;
                if (oResMsgGetFavouritesGroupItems != null && oResMsgGetFavouritesGroupItems.oFavouriteItem != null && oResMsgGetFavouritesGroupItems.oFavouriteItem.PrescriptionItem != null && oResMsgGetFavouritesGroupItems.oFavouriteItem.PrescriptionItem.Count > 0 && oResMsgGetFavouritesGroupItems.oContextInformation != null && !String.IsNullOrEmpty(oResMsgGetFavouritesGroupItems.oContextInformation.PageInfo) && this.lSelectedCommonMedID > 0 && String.Equals(this.lSelectedCommonMedID.toString(), oResMsgGetFavouritesGroupItems.oContextInformation.PageInfo)) {
                    var nItemCount: number = 0;
                    var IsExists: boolean = false;
                    nItemCount = oResMsgGetFavouritesGroupItems.oFavouriteItem.PrescriptionItem.Count;
                    var ArrListItem: CTreeListItem = null;
                    var FormNoteTooltip: string = String.Empty;
                    for (var nIndex: number = 0; nIndex < nItemCount; nIndex++) {
                        this.oColl = new List<TreeImageCollection>();
                        if (String.Compare(oResMsgGetFavouritesGroupItems.oFavouriteItem.PrescriptionItem.array[nIndex].MCItmSubtypecode, CConstants.SUBTYPE) == 0) {
                            var oMCINames: string[] = MedsPrescribeUtility.GetMultiComponentItems(oResMsgGetFavouritesGroupItems.oFavouriteItem.PrescriptionItem.array[nIndex].MCItemName);
                            this.oColl.Add(ObjectHelper.CreateObject(new TreeImageCollection(), {
                                ImageSource: MedImage.GetPath(MedImages.ImgMltcmpnt),
                                ToolTip: String.Join("\n", oMCINames),
                                IconSource: MedImage.GetPath(MedImages.ImgMltcmpnt),
                                IconToolTip: String.Join("\n", oMCINames)
                            }));


                        }
                        if (!String.IsNullOrEmpty(oResMsgGetFavouritesGroupItems.oFavouriteItem.PrescriptionItem[nIndex].Type) && String.Compare(oResMsgGetFavouritesGroupItems.oFavouriteItem.PrescriptionItem[nIndex].Type, CConstants.Orderset) == 0) {
                            this.oColl.Add(ObjectHelper.CreateObject(new TreeImageCollection(), {
                                ImageSource: MedImage.GetPath(MedImages.ImgOrderSet),
                                ToolTip: CConstants.Orderset,
                                IconSource: MedImage.GetPath(MedImages.ImgOrderSet),
                                IconToolTip: CConstants.Orderset
                            }));
                        }
                        if (!String.IsNullOrEmpty(oResMsgGetFavouritesGroupItems.oFavouriteItem.PrescriptionItem.array[nIndex].IsFormulary) && oResMsgGetFavouritesGroupItems.oFavouriteItem.PrescriptionItem[nIndex].IsFormulary== "1" && !String.IsNullOrEmpty(oResMsgGetFavouritesGroupItems.oFavouriteItem.PrescriptionItem[nIndex].FormularyNote)) {
                            var FormNote: string[] = oResMsgGetFavouritesGroupItems.oFavouriteItem.PrescriptionItem.array[nIndex].FormularyNote.split(':');
                            if (FormNote.length > 1) {
                                FormNoteTooltip = FormNote[1];
                            }
                            else {
                                FormNoteTooltip = oResMsgGetFavouritesGroupItems.oFavouriteItem.PrescriptionItem.array[nIndex].FormularyNote;
                            }
                            this.oColl.Add(ObjectHelper.CreateObject(new TreeImageCollection(), {
                                ImageSource: MedImage.GetPath(MedImages.WarningIcon),
                                ToolTip: qlfav.Formularynote_Tooltip + FormNoteTooltip,
                                IconSource: MedImage.GetPath(MedImages.WarningIcon),
                                IconToolTip: qlfav.Formularynote_Tooltip + FormNoteTooltip
                            }));
                        }
                        if (!String.IsNullOrEmpty(oResMsgGetFavouritesGroupItems.oFavouriteItem.PrescriptionItem[nIndex].PrescNote)) {
                            this.oColl.Add(ObjectHelper.CreateObject(new TreeImageCollection(), {
                                NotesIcon: MedImage.GetPath(MedImages.NoteIcon),
                                NotesToolTip: oResMsgGetFavouritesGroupItems.oFavouriteItem.PrescriptionItem[nIndex].PrescNote,
                                NotesData: oResMsgGetFavouritesGroupItems.oFavouriteItem.PrescriptionItem[nIndex].PrescNote
                            }));
                        }
                        if (oResMsgGetFavouritesGroupItems.oFavouriteItem.PrescriptionItem[nIndex].IsExcludeGuidanceInSearch != '1') {
                            if (String.Equals(oResMsgGetFavouritesGroupItems.oFavouriteItem.PrescriptionItem[nIndex].Type, CConstants.Orderset, StringComparison.CurrentCultureIgnoreCase) && !String.IsNullOrEmpty(oResMsgGetFavouritesGroupItems.oFavouriteItem.PrescriptionItem[nIndex].Guidance)) {
                                var sToolTipText: string = String.Empty;
                                var sToolTip: string = String.Empty;
                                sToolTipText = oResMsgGetFavouritesGroupItems.oFavouriteItem.PrescriptionItem[nIndex].Guidance;
                                if (!String.IsNullOrEmpty(sToolTipText) && sToolTipText.length > 200) {
                                    sToolTip = sToolTipText.substring(0, 199) + "...";
                                }
                                else {
                                    sToolTip = sToolTipText;
                                }
                                this.oColl.Add(ObjectHelper.CreateObject(new TreeImageCollection(), {
                                    NotesIcon: MedImage.GetPath(MedImages.NoteIcon),
                                    NotesToolTip: sToolTip,
                                    NotesData: oResMsgGetFavouritesGroupItems.oFavouriteItem.PrescriptionItem[nIndex].Guidance
                                }));
                            }
                        }
                        var objDrugProperty: ObservableCollection<ManagePrescSer.DrugProperty> =
                            this.GetTTODrugPropertycollection(oResMsgGetFavouritesGroupItems.oFavouriteItem.PrescriptionItem[nIndex].DrugProperty);
                        ;
                        if (oResMsgGetFavouritesGroupItems.oFavouriteItem.PrescriptionItem[nIndex].DrugProperty != null && !String.IsNullOrEmpty(oResMsgGetFavouritesGroupItems.oFavouriteItem.PrescriptionItem[nIndex].Type))
                            this.GetDrugPropertyIcons(objDrugProperty, oResMsgGetFavouritesGroupItems.oFavouriteItem.PrescriptionItem[nIndex].Type, this.oColl, oResMsgGetFavouritesGroupItems.oFavouriteItem.PrescriptionItem[nIndex].MCItmSubtypecode);
                        ArrListItem = new CTreeListItem();
                        ArrListItem.IconCollection = this.oColl;
                        if (oResMsgGetFavouritesGroupItems.oFavouriteItem.PrescriptionItem[nIndex] != null && (String.Compare(oResMsgGetFavouritesGroupItems.oFavouriteItem.PrescriptionItem[nIndex].IsParallelImport, CConstants.sPimport) != 0) && (String.Compare(oResMsgGetFavouritesGroupItems.oFavouriteItem.PrescriptionItem[nIndex].IsManufacturerGeneric, "1") != 0)) {
                            if (odictCheck.Count() > 0) {
                                var sFavouritescheck: string = oResMsgGetFavouritesGroupItems.oFavouriteItem.PrescriptionItem[nIndex].Name + oResMsgGetFavouritesGroupItems.oFavouriteItem.PrescriptionItem[nIndex].OID;
                                IsExists = (odictCheck.ContainsKey(sFavouritescheck)) ? true : false;
                            }
                            if (!IsExists) {
                                if (oResMsgGetFavouritesGroupItems.oFavouriteItem.PrescriptionItem[nIndex].IsFormulary == "1") {
                                    ArrListItem.Value = oResMsgGetFavouritesGroupItems.oFavouriteItem.PrescriptionItem[nIndex].Name;
                                }
                                else {
                                    ArrListItem.Value = oResMsgGetFavouritesGroupItems.oFavouriteItem.PrescriptionItem[nIndex].Name;
                                }
                                if (this.FAVFirstLoad == 0)
                                    ArrListItem.ParentKey = null; //"0";
                                else ArrListItem.ParentKey = this.oNode.Key;
                                ArrListItem.Key = Convert.ToString(oResMsgGetFavouritesGroupItems.oFavouriteItem.PrescriptionItem[nIndex].OID);
                                ArrListItem.Tag = Convert.ToString(oResMsgGetFavouritesGroupItems.oFavouriteItem.PrescriptionItem[nIndex].PrescribeItemID) + '~' + oResMsgGetFavouritesGroupItems.oFavouriteItem.PrescriptionItem[nIndex].Name + '~' + oResMsgGetFavouritesGroupItems.oFavouriteItem.PrescriptionItem[nIndex].Type + '~' + oResMsgGetFavouritesGroupItems.oFavouriteItem.PrescriptionItem[nIndex].ItemID + '~' + oResMsgGetFavouritesGroupItems.oFavouriteItem.PrescriptionItem[nIndex].IsPrescribeByBrand + '~' + Convert.ToString(oResMsgGetFavouritesGroupItems.oFavouriteItem.PrescriptionItem[nIndex].HasAccessConstraint) + '~' + oResMsgGetFavouritesGroupItems.oFavouriteItem.PrescriptionItem[nIndex].MCVersion + '~' + oResMsgGetFavouritesGroupItems.oFavouriteItem.PrescriptionItem[nIndex].Itemtype + '~' + oResMsgGetFavouritesGroupItems.oFavouriteItem.PrescriptionItem[nIndex].ITEMLORENZOID + '~' + oResMsgGetFavouritesGroupItems.oFavouriteItem.PrescriptionItem[nIndex].IsFormulary + '~' + oResMsgGetFavouritesGroupItems.oFavouriteItem.PrescriptionItem[nIndex].Formularynote + '~' + oResMsgGetFavouritesGroupItems.oFavouriteItem.FavouriteItemID + '~' + oResMsgGetFavouritesGroupItems.oFavouriteItem.PrescriptionItem[nIndex].MCOID + '~' + oResMsgGetFavouritesGroupItems.oFavouriteItem.PrescriptionItem[nIndex].MCItemName + '~' + oResMsgGetFavouritesGroupItems.oFavouriteItem.PrescriptionItem[nIndex].MCItmSubtypecode + '~' + oResMsgGetFavouritesGroupItems.oFavouriteItem.PrescriptionItem[nIndex].MCIDeactitemName + '~' + oResMsgGetFavouritesGroupItems.oFavouriteItem.PrescriptionItem[nIndex].IsIndicationRequired + '~' + oResMsgGetFavouritesGroupItems.oFavouriteItem.PrescriptionItem[nIndex].IsDataProviderType;
                                var sFavorites: string = oResMsgGetFavouritesGroupItems.oFavouriteItem.PrescriptionItem[nIndex].Name + ArrListItem.Key;
                                odictCheck.Add(sFavorites, nIndex);
                                if (!oTrVwColl.Any(x => x.Key.Equals(ArrListItem.Key,
                                    StringComparison.InvariantCultureIgnoreCase))) {
                                    oTrVwColl.Add(ArrListItem);
                                }
                            }
                        }
                    }
                    // this.tvwMedFavourites.TreeViewDataContext = null;
                    // this.tvwMedFavourites.TreeViewDataContext = oTrVwColl;
                    this.tvwMedFavourites.TreeViewDataContext = this.MergeTreeViewDataContextData(this.tvwMedFavourites.TreeViewDataContext, oTrVwColl);
                }
                else {
                    // this.tvwMedFavourites.TreeViewDataContext = null;
                    // this.tvwMedFavourites.TreeViewDataContext = oTrVwColl;
                    this.tvwMedFavourites.TreeViewDataContext = this.MergeTreeViewDataContextData(this.tvwMedFavourites.TreeViewDataContext, oTrVwColl);
                }
                // Busyindicator.SetStatusIdle("SearchItem");
            }
            catch (ex: any) {
                var lnReturn: number = AMSHelper.PublicExceptionDetails(_ErrorID, _ErrorSource, ex);
            }

        }
        else {
            var lnReturn: number = AMSHelper.PublicExceptionDetails(_ErrorID, _ErrorSource, e.Error);
        }
        // Busyindicator.SetStatusIdle("SearchItem");
    }
    private tvwMedFavourites_MouseLeftButtonUp(sender: Object, e: MouseButtonEventArgs): void {

    }

    tvwMedFromulary_Expanded_Func = (s, e) => {
        ObjectHelper.CreateObject(this, that);
        this.tvwMedFromulary_Expanded(s, e);
    }

    private tvwMedFromulary_Expanded(sender: Object, e: RadRoutedEventArgs): void {
        this.oSelectedNode = <CTreeListItem>((<RadTreeViewItem>(e.Source)).Item);
        if (this.oSelectedNode != null) {
            this.oNode = this.oSelectedNode;
            this.oNode.Expanded = true;
            this.tvwMedFromulary.DeleteNode("DUMMY_" + this.oNode.Key);
            if (this.oNode.Key == CConstants.Formulary_Drug) {
                if (this.oNode.Children.Count == 1)
                    this.GetFormularyHeirarchy(this.FormularyOId, CConstants.Formulary_Drug);
            }
            else if (this.oNode.Key == CConstants.Formulary_Appliance) {
                if (this.oNode.Children.Count == 1)
                    this.GetFormularyHeirarchy(this.FormularyOId, CConstants.Formulary_Appliance);
            }
            else if (this.oNode.Key == CConstants.Formulary_Unknown) {
                if (this.oNode.Children.Count == 1)
                    this.GetFormularyHeirarchy(this.FormularyOId, CConstants.Formulary_Unknown);
            }
            else if (String.Compare(this.oNode.Tag.ToString(), CConstants.Formulary_Drug) == 0) {
                if (this.oNode.Children.Count == 1)
                    this.LoadClientHierarchy(this.oNode);
            }
            else if (String.Compare(this.oNode.Tag.ToString(), CConstants.Formulary_Appliance) == 0) {
                if (this.oNode.Children.Count == 1)
                    this.LoadClientHierarchy(this.oNode);
            }
            else {
                if (this.oNode.Children.Count == 1)
                    this.LoadClientHierarchy(this.oNode);
            }
        }
    }
    private PopulateTreeView(nFormularyOId: number, HOID: number, HType: string): void {
        var objServiceProxy: ManagePrescriptionWSSoapClient = new ManagePrescriptionWSSoapClient();
        if (this.isFirst) {
            objServiceProxy.GetHierarchyFormularyItemsCompleted = (s,e) => {this.objDrugApplianceUnknow_GetHierarchyFormularyItemsCompleted(s,e)};
        }
        else {
            objServiceProxy.GetHierarchyFormularyItemsCompleted = (s,e) => {this.objServiceProxy_GetHierarchyFormularyItemsCompleted(s,e)};
        }
        var objCReqMsgGetFrmHIERARCHY: CReqMsgGetHierarchyFormularyItems = new CReqMsgGetHierarchyFormularyItems();
        objCReqMsgGetFrmHIERARCHY.oDrugHierarchyInputBC = new DrugHierarchyInfo();
        objCReqMsgGetFrmHIERARCHY.oDrugHierarchyInputBC.HierarchyType = HType;
        objCReqMsgGetFrmHIERARCHY.oDrugHierarchyInputBC.FormularyOID = nFormularyOId;
        objCReqMsgGetFrmHIERARCHY.oDrugHierarchyInputBC.HierarchyOID = HOID;
        objCReqMsgGetFrmHIERARCHY.oDrugHierarchyInputBC.MCVersionNo = this.sMCVersion;
        //Revisit required
        objCReqMsgGetFrmHIERARCHY.oDrugHierarchyInputBC.TeamOIDs = !String.IsNullOrEmpty((ObjectHelper.__as__<IPPMABaseVM>(super.DataContext, IPPMABaseVM)).sTeamOIDs) ? (ObjectHelper.__as__<IPPMABaseVM>(super.DataContext, IPPMABaseVM)).sTeamOIDs : String.Empty;
        if(String.IsNullOrEmpty(objCReqMsgGetFrmHIERARCHY.oDrugHierarchyInputBC.TeamOIDs))
            objCReqMsgGetFrmHIERARCHY.oDrugHierarchyInputBC.TeamOIDs = !String.IsNullOrEmpty((ObjectHelper.__as__<MedQuickSelectVM>(super.DataContext, MedQuickSelectVM)).TeamOIDs) ? (ObjectHelper.__as__<MedQuickSelectVM>(super.DataContext, MedQuickSelectVM)).TeamOIDs : String.Empty;
        
        objCReqMsgGetFrmHIERARCHY.oContextInformation = CommonBB.FillContext();
        objServiceProxy.GetHierarchyFormularyItemsAsync(objCReqMsgGetFrmHIERARCHY);
        // objServiceProxy.GetHierarchyFormularyItemsAsync(objCReqMsgGetFrmHIERARCHY, (s, e) => { this.objServiceProxy_GetHierarchyFormularyItemsCompleted(s, e) });
    }
    objDrugApplianceUnknow_GetHierarchyFormularyItemsCompleted(sender: Object, e: GetHierarchyFormularyItemsCompletedEventArgs): void {
        let oTrVwColl = new iTreeViewCollection();
        var _ErrorID: number = 80000059;
        var _ErrorSource: string = "LorAppManagePrescriptionBBUI_P2.dll, Class:MedQuickSelect, Method:objDrugApplianceUnknow_GetHierarchyFormularyItemsCompleted()";
        if (e.Error == null) {
            try {
                var objCResMsgGetFrmHIERARCHY: CResMsgGetHierarchyFormularyItems = e.Result;
                if (objCResMsgGetFrmHIERARCHY != null && objCResMsgGetFrmHIERARCHY.oDrugItemBasicData != null && objCResMsgGetFrmHIERARCHY.oDrugItemBasicData.Count != 0) {
                    var nCount: number = objCResMsgGetFrmHIERARCHY.oDrugItemBasicData.Count;
                    var objIdentifiyingType: List<string> = new List<string>();
                    for (var i: number = 0; i < nCount; i++) {
                        objIdentifiyingType.Add(objCResMsgGetFrmHIERARCHY.oDrugItemBasicData[i].IdentifyingType);
                    }
                    if (objIdentifiyingType.Contains(CConstants.Formulary_Drug)) {
                        this.oItem = ObjectHelper.CreateObject(new CTreeListItem(), {
                            ParentKey: null, //"0",
                            Key: CConstants.Formulary_Drug,
                            Value: "Drugs",
                            Tag: CConstants.Formulary_Drug
                        });
                        oTrVwColl.Add(this.oItem);
                        this.oItem = ObjectHelper.CreateObject(new CTreeListItem(), {
                            ParentKey: CConstants.Formulary_Drug,
                            Key: "DUMMY_" + CConstants.Formulary_Drug,
                            Value: "DUMMY"
                        });
                        oTrVwColl.Add(this.oItem);
                    }
                    if (objIdentifiyingType.Contains(CConstants.Formulary_Appliance)) {
                        this.oItem = ObjectHelper.CreateObject(new CTreeListItem(), {
                            ParentKey: null, //"0",
                            Key: CConstants.Formulary_Appliance,
                            Value: "Appliances",
                            Tag: CConstants.Formulary_Appliance
                        });
                        oTrVwColl.Add(this.oItem);
                        this.oItem = ObjectHelper.CreateObject(new CTreeListItem(), {
                            ParentKey: CConstants.Formulary_Appliance,
                            Key: "DUMMY_" + CConstants.Formulary_Appliance,
                            Value: "DUMMY"
                        });
                        oTrVwColl.Add(this.oItem);
                    }
                    if (objIdentifiyingType.Contains(CConstants.Formulary_Unknown)) {
                        this.oItem = ObjectHelper.CreateObject(new CTreeListItem(), {
                            ParentKey: null, //"0",
                            Key: CConstants.Formulary_Unknown,
                            Value: "Unknown",
                            Tag: CConstants.Formulary_Unknown
                        });
                        oTrVwColl.Add(this.oItem);
                        this.oItem = ObjectHelper.CreateObject(new CTreeListItem(), {
                            ParentKey: CConstants.Formulary_Unknown,
                            Key: "DUMMY_" + CConstants.Formulary_Unknown,
                            Value: "DUMMY"
                        });
                        oTrVwColl.Add(this.oItem);
                    }
                }
                // Need to uncomment
                // this.tvwMedFromulary.DataContext = null;
                // this.tvwMedFromulary.DataContext = this.oTrVwColl;
                this.tvwMedFromulary.TreeViewDataContext = null;
                this.tvwMedFromulary.TreeViewDataContext = oTrVwColl;
            }
            catch (ex: any) {
                var lnReturn: number = AMSHelper.PublicExceptionDetails(_ErrorID, _ErrorSource, ex);
            }

        }
        else {
            var lnReturn: number = AMSHelper.PublicExceptionDetails(_ErrorID, _ErrorSource, e.Error);
        }
    }
    objServiceProxy_GetHierarchyFormularyItemsCompleted(sender: Object, e: GetHierarchyFormularyItemsCompletedEventArgs): void {
        let oTrVwColl = new iTreeViewCollection();
        var _ErrorID: number = 80000058;
        var _ErrorSource: string = "LorAppManagePrescriptionBBUI_P2.dll, Class:MedQuickSelect, Method:objServiceProxy_GetHierarchyFormularyItemsCompleted()";
        var objCResMsgGetFrmHIERARCHY: CResMsgGetHierarchyFormularyItems = e.Result;
        if (e.Error == null) {
            try {
                if (objCResMsgGetFrmHIERARCHY != null && objCResMsgGetFrmHIERARCHY.oDrugItemBasicData != null && objCResMsgGetFrmHIERARCHY.oDrugItemBasicData.Count != 0) {
                    var nCount: number = objCResMsgGetFrmHIERARCHY.oDrugItemBasicData.Count;
                    var sToolTip: string = String.Empty;
                    var sFormularyNote: string = String.Empty;
                    var oItem: CTreeListItem = null;
                    this.oColl = null;
                    var lstTvwIcons: List<TreeImageCollection> = null;
                    for (var i: number = 0; i < nCount; i++) {
                        this.oColl = new List<TreeImageCollection>();
                        lstTvwIcons = new List<TreeImageCollection>();
                        this.oColl.Add(ObjectHelper.CreateObject(new TreeImageCollection(), {
                            ImageSource: MedImage.GetPath(MedImages.SelectionIcon),
                            ToolTip: Resource.Medlistdetails.Reorder_ImgTooltip,
                            IconSource: MedImage.GetPath(MedImages.SelectionIcon),
                            IconToolTip: Resource.Medlistdetails.Reorder_ImgTooltip
                        }));
                        sToolTip = objCResMsgGetFrmHIERARCHY.oDrugItemBasicData[i].IdentifyingName;
                        if (objCResMsgGetFrmHIERARCHY.oDrugItemBasicData[i].ITMSUBTYP == CConstants.SUBTYPE) {
                            var oMCINames: string[] = MedsPrescribeUtility.GetMultiComponentItems(objCResMsgGetFrmHIERARCHY.oDrugItemBasicData[i].MCItemName);
                            lstTvwIcons.Add(ObjectHelper.CreateObject(new TreeImageCollection(), {
                                ImageSource: MedImage.GetPath(MedImages.ImgMltcmpnt),
                                ToolTip: String.Join("\n", oMCINames),
                                IconSource: MedImage.GetPath(MedImages.ImgMltcmpnt),
                                IconToolTip: String.Join("\n", oMCINames)
                            }));
                        }
                        if (!String.IsNullOrEmpty(objCResMsgGetFrmHIERARCHY.oDrugItemBasicData[i].FormularyNote)) {
                            lstTvwIcons.Add(ObjectHelper.CreateObject(new TreeImageCollection(), {
                                ImageSource: MedImage.GetPath(MedImages.WarningIcon),
                                ToolTip: qlfav.Formularynote_Tooltip + objCResMsgGetFrmHIERARCHY.oDrugItemBasicData[i].FormularyNote,
                                IconSource: MedImage.GetPath(MedImages.WarningIcon),
                                IconToolTip: qlfav.Formularynote_Tooltip + objCResMsgGetFrmHIERARCHY.oDrugItemBasicData[i].FormularyNote
                            }));
                            sFormularyNote = objCResMsgGetFrmHIERARCHY.oDrugItemBasicData[i].FormularyNote;
                        }
                        if (!String.IsNullOrEmpty(objCResMsgGetFrmHIERARCHY.oDrugItemBasicData[i].PrescribingNote)) {
                            var TC: TreeImageCollection = new TreeImageCollection();
                            TC.NotesData = objCResMsgGetFrmHIERARCHY.oDrugItemBasicData[i].PrescribingNote;
                            TC.NotesIconMargin = new Thickness(5, 0, 0, 0);
                            if (TC.NotesData.length > 200)
                                TC.NotesToolTip = TC.NotesData.substring(0, 199) + "...";
                            else TC.NotesToolTip = TC.NotesData;
                            TC.NotesIcon = MedImage.GetPath(MedImages.NoteIcon);
                            lstTvwIcons.Add(TC);
                        }
                        if (objCResMsgGetFrmHIERARCHY.oDrugItemBasicData[i].DrugProperties != null && !String.IsNullOrEmpty(objCResMsgGetFrmHIERARCHY.oDrugItemBasicData[i].IdentifyingType))
                            this.GetDrugPropertyIcons(objCResMsgGetFrmHIERARCHY.oDrugItemBasicData[i].DrugProperties, objCResMsgGetFrmHIERARCHY.oDrugItemBasicData[i].IdentifyingType, lstTvwIcons, objCResMsgGetFrmHIERARCHY.oDrugItemBasicData[i].ITMSUBTYP);
                        oItem = new CTreeListItem();
                        oItem.ImageCollection = this.oColl;
                        oItem.IconCollection = lstTvwIcons;
                        oItem.Key = objCResMsgGetFrmHIERARCHY.oDrugItemBasicData[i].IdentifyingOID + "$" + Environment.NewLine + objCResMsgGetFrmHIERARCHY.oDrugItemBasicData[i].IsAccessContraint + "$" + Environment.NewLine + objCResMsgGetFrmHIERARCHY.oDrugItemBasicData[i].IsPrescribeByBrand + "$" + Environment.NewLine + this.oNode.Tag + "$" + Environment.NewLine + objCResMsgGetFrmHIERARCHY.oDrugItemBasicData[i].IdentifyingName + "$" + Environment.NewLine + objCResMsgGetFrmHIERARCHY.oDrugItemBasicData[i].LorenzoID + "$" + Environment.NewLine + sFormularyNote + "$" + objCResMsgGetFrmHIERARCHY.oDrugItemBasicData[i].IdentifyingType + "$" + objCResMsgGetFrmHIERARCHY.oDrugItemBasicData[i].ITMSUBTYP + "$" + objCResMsgGetFrmHIERARCHY.oDrugItemBasicData[i].MCItemName + "$" + objCResMsgGetFrmHIERARCHY.oDrugItemBasicData[i].ItemType + "$" +
                            objCResMsgGetFrmHIERARCHY.oDrugItemBasicData[i].SourceDataProviderType + "$" + objCResMsgGetFrmHIERARCHY.oDrugItemBasicData[i].IsIndicationRequired;
                        oItem.Value = objCResMsgGetFrmHIERARCHY.oDrugItemBasicData[i].IdentifyingName;
                        oItem.ParentKey = this.oNode.Key;
                        oItem.ToolTip = sToolTip;
                        if (!oTrVwColl.Any(x => x.Key == oItem.Key)) {
                            oTrVwColl.Add(oItem);
                        }
                        // Need to uncomment
                        // this.tvwMedFromulary.DataContext = null;
                        // this.tvwMedFromulary.DataContext = this.oTrVwColl;
                        // this.tvwMedFromulary.TreeViewDataContext = null;
                        // this.tvwMedFromulary.TreeViewDataContext = oTrVwColl;
                        this.tvwMedFromulary.TreeViewDataContext = this.MergeTreeViewDataContextData(this.tvwMedFromulary.TreeViewDataContext, oTrVwColl);
                    }
                }
            }
            catch (ex: any) {
                var lnReturn: number = AMSHelper.PublicExceptionDetails(_ErrorID, _ErrorSource, ex);
            }

        }
        else {
            var lnReturn: number = AMSHelper.PublicExceptionDetails(_ErrorID, _ErrorSource, e.Error);
        }
    }
    private GetFormularyHeirarchy(nFormularyOID: number, sKey: string): void {
        var objServiceProxy: ManagePrescriptionWSSoapClient = new ManagePrescriptionWSSoapClient();
        objServiceProxy.GetFormularyHierarchyCompleted = (s, e) => { this.objServiceProxy_GetFormularyHierarchyCompleted(s, e) };
        var objCReqMsgGetFrmHIERARCHY: CReqMsgGetFormularyHierarchy = new CReqMsgGetFormularyHierarchy();
        objCReqMsgGetFrmHIERARCHY.oDrugHierarchyInputBC = new DrugHierarchyInfo();
        objCReqMsgGetFrmHIERARCHY.oDrugHierarchyInputBC.FormularyOID = (nFormularyOID != 0) ? nFormularyOID : 0;
        objCReqMsgGetFrmHIERARCHY.oDrugHierarchyInputBC.HierarchyType = !String.IsNullOrEmpty(sKey) ? sKey : String.Empty;
        objCReqMsgGetFrmHIERARCHY.oDrugHierarchyInputBC.MCVersionNo = (!String.IsNullOrEmpty(this.sMCVersion)) ? this.sMCVersion : String.Empty;
        objCReqMsgGetFrmHIERARCHY.oContextInformation = CommonBB.FillContext();
        objServiceProxy.GetFormularyHierarchyAsync(objCReqMsgGetFrmHIERARCHY);
        // objServiceProxy.GetFormularyHierarchyAsync(objCReqMsgGetFrmHIERARCHY, (s, e) => { this.objServiceProxy_GetFormularyHierarchyCompleted(s, e) });
    }
    objServiceProxy_GetFormularyHierarchyCompleted(sender: Object, e: GetFormularyHierarchyCompletedEventArgs): void {
        let oTrVwColl = new iTreeViewCollection();
        var _ErrorID: number = 80000057;
        var _ErrorSource: string = "LorAppManagePrescriptionBBUI_P2.dll, Class:MedQuickselect, Method:objServiceProxy_GetFormularyHierarchyCompleted()";
        var objCResMsgGetFrmHIERARCHY: CResMsgGetFormularyHierarchy = e.Result;
        if (e.Error == null) {
            try {
                if (objCResMsgGetFrmHIERARCHY.oDrugHierarchyInfo != null) {
                    var nDurgInfo: number = objCResMsgGetFrmHIERARCHY.oDrugHierarchyInfo.Count;
                    for (var i: number = 0; i < nDurgInfo; i++) {
                        this.oItem = new CTreeListItem();
                        this.oItem.Key = objCResMsgGetFrmHIERARCHY.oDrugHierarchyInfo[i].HierarchyOID.ToString();
                        this.oItem.Value = objCResMsgGetFrmHIERARCHY.oDrugHierarchyInfo[i].HierarchyName.ToString();
                        this.oItem.Tag = objCResMsgGetFrmHIERARCHY.oDrugHierarchyInfo[i].HierarchyType.ToString();
                        this.oItem.ParentKey = this.oNode.Key;
                        oTrVwColl.Add(this.oItem);
                        this.oItemChild = new CTreeListItem();
                        this.oItemChild.Key = "DUMMY_" + objCResMsgGetFrmHIERARCHY.oDrugHierarchyInfo[i].HierarchyOID.ToString();
                        this.oItemChild.Value = "DUMMY_" + objCResMsgGetFrmHIERARCHY.oDrugHierarchyInfo[i].HierarchyName.ToString();
                        this.oItemChild.Tag = "DUMMY_" + objCResMsgGetFrmHIERARCHY.oDrugHierarchyInfo[i].HierarchyType.ToString();
                        this.oItemChild.ParentKey = objCResMsgGetFrmHIERARCHY.oDrugHierarchyInfo[i].HierarchyOID.ToString();
                        oTrVwColl.Add(this.oItemChild);
                        // Need to check(Additional code)
                        // this.tvwMedFromulary.DataContext = null;
                        // this.tvwMedFromulary.DataContext = this.oTrVwColl;

                        this.tvwMedFromulary.TreeViewDataContext = this.MergeTreeViewDataContextData(this.tvwMedFromulary.TreeViewDataContext, oTrVwColl);
                    }
                }
            }
            catch (ex: any) {
                var lnReturn: number = AMSHelper.PublicExceptionDetails(_ErrorID, _ErrorSource, ex);
            }

        }
        else {
            var lnReturn: number = AMSHelper.PublicExceptionDetails(_ErrorID, _ErrorSource, e.Error);
        }
    }
    MergeTreeViewDataContextData(TreeViewCollection: iTreeViewCollection, oTrVwCollection: iTreeViewCollection): iTreeViewCollection {
        let temptrvCol = new iTreeViewCollection();
        for (let i = 0; i < TreeViewCollection.Length; i++) {
            temptrvCol.Add(TreeViewCollection[i]);
        }
        for (let i = 0; i < oTrVwCollection.Length; i++) {
            let oTrVw = oTrVwCollection[i];
            let isExist = false;
            for (let j = 0; j < temptrvCol.Length; j++) {
                let medFormulary = temptrvCol[j];
                if (medFormulary.Key == oTrVw.Key) {
                    isExist = true;
                }
            }
            if (!isExist)
                temptrvCol.Add(oTrVw);
        }
        // oTrVwCollection.forEach(oTrVw => {
        //     let isExist = false;
        //     TreeViewCollection.forEach((medFormulary) => {
        //         if (medFormulary.Key == oTrVw.Key) {
        //             isExist = true;
        //         }
        //     })
        //     if (!isExist)
        //         TreeViewCollection.Add(oTrVw);
        // });
        return temptrvCol;
    }
    private LoadClientHierarchy(oItem: CTreeListItem): void {
        var objServiceProxy: MedicationMgmtWSSoapClient = new MedicationMgmtWSSoapClient();
        objServiceProxy.GetHierarchyCompleted = (s, e) => { this.objServiceProxy_GetHierarchyCompleted(s, e) };
        var objRequest: CReqMsgGetHierarchy = new CReqMsgGetHierarchy();
        objRequest.lnCategoryIDBC = Convert.ToInt64(oItem.Key);
        objRequest.sMCVersionBC = (!String.IsNullOrEmpty(this.sMCVersion)) ? this.sMCVersion : String.Empty;
        objRequest.oContextInformation = CommonBB.FillContext();
        objServiceProxy.GetHierarchyAsync(objRequest);
        // objServiceProxy.GetHierarchyAsync(objRequest, (s, e) => { this.objServiceProxy_GetHierarchyCompleted(s, e) });
    }
    objServiceProxy_GetHierarchyCompleted(sender: Object, e: GetHierarchyCompletedEventArgs): void {
        let oTrVwColl = new iTreeViewCollection();
        var _ErrorID: number = 80000056;
        var _ErrorSource: string = "LorAppManagePrescriptionBBUI_P2.dll, Class:MedQuickselect, Method:objServiceProxy_GetHierarchyCompleted()";
        var objResponse: CResMsgGetHierarchy = e.Result;
        if (e.Error == null) {
            try {
                this.isFirst = false;
                if (objResponse.oDrugCategory != null && objResponse.oDrugCategory.Count > 0) {
                    this.oNode.Expanded = true;
                    var oItem: CTreeListItem = null;
                    var oItemChild: CTreeListItem = null;
                    var nCount: number = objResponse.oDrugCategory.Count;

                    for (var i: number = 0; i < nCount; i++) {
                        oItem = new CTreeListItem();
                        oItem.ParentKey = this.oNode.Key;
                        oItem.Key = objResponse.oDrugCategory[i].CategoryID.ToString();
                        oItem.Value = objResponse.oDrugCategory[i].Name;
                        oItem.Tag = this.oNode.Tag;
                        oTrVwColl.Add(oItem);
                        if (objResponse.oDrugCategory[i].FirstSublevel != 0 || objResponse.oDrugCategory[i].IsDrugAssociated != 0) {
                            oItemChild = new CTreeListItem();
                            oItemChild.ParentKey = objResponse.oDrugCategory[i].CategoryID.ToString();
                            oItemChild.Key = "DUMMY_" + objResponse.oDrugCategory[i].CategoryID.ToString();
                            oItemChild.Value = "DUMMY_" + objResponse.oDrugCategory[i].Name.ToString();
                            oItemChild.Tag = "DUMMY_" + this.oNode.Tag;
                            oTrVwColl.Add(oItemChild);
                        }
                        // Need to uncomment(Additional code)
                        // this.tvwMedFromulary.DataContext = null;
                        // this.tvwMedFromulary.DataContext = this.oTrVwColl;

                        this.tvwMedFromulary.TreeViewDataContext = this.MergeTreeViewDataContextData(this.tvwMedFromulary.TreeViewDataContext, oTrVwColl);
                    }
                    if (oItem != null && oItem.Tag != null)
                        this.PopulateTreeView(this.FormularyOId, Convert.ToInt64(oItem.Key), Convert.ToString(oItem.Tag));
                    if (this.oNode != null && this.oNode.Tag != null)
                        this.PopulateTreeView(this.FormularyOId, Convert.ToInt64(this.oNode.Key), Convert.ToString(this.oNode.Tag));
                }
                else {
                    if (this.oNode != null && this.oNode.Tag != null)
                        this.PopulateTreeView(this.FormularyOId, Convert.ToInt64(this.oNode.Key), Convert.ToString(this.oNode.Tag));
                }
            }
            catch (ex:any) {
                var lnReturn: number = AMSHelper.PublicExceptionDetails(_ErrorID, _ErrorSource, ex);
            }

        }
        else {
            var lnReturn: number = AMSHelper.PublicExceptionDetails(_ErrorID, _ErrorSource, e.Error);
        }
    }

    private txtSearch_KeyUp(sender: Object, e: KeyEventArgs): void {
        if (e.Key == Key.Shift) {
            this.isShiftKeyPressed = false;
        }
        this.keycode = e.PlatformKeyCode;
        var sSearchText: string = this.txtSearch.Text;
        if (sSearchText.length <= 2)
            this.oVM.IsCatalogue = 0;
    }

    // txtSearch_KeyUp(event, input) {
    //     const Value = input.value;
    //     // console.log('------------ Length ---------- ', Value.length);
    //     if (+Value.length > 2) {
    //         var objDetails: DrugItemDetails = new DrugItemDetails();
    //         this.LoadLookAhead(objDetails);
    //         console.log(this.txtSearch.Text = event.target.value, "keyup");
    //     }
    // }

    private txtSearch_KeyDown(sender: Object, e: KeyEventArgs): void {
        this.keypressed = true;
        if (this.objCurrentVM != null && this.objCurrentVM.QuickSelectVM != null) {
            this.objCurrentVM.QuickSelectVM.issearchtriggred = true;
        }
        this.cboQuickLinks.Text = String.Empty;
        if (e.Key == Key.Shift) {
            this.isShiftKeyPressed = true;
            return
        }
        if (this.isShiftKeyPressed) {
            if (e.PlatformKeyCode == 53 || e.PlatformKeyCode == 56) {
                e.Handled = true;
            }
        }
        else if ((!this.isShiftKeyPressed || e.Key == Key.Unknown) && e.PlatformKeyCode == 191) {
            e.Handled = true;
        }
    }
    ichkBoxSearchOrderSet_Checked(sender: Object, e: RoutedEventArgs): void {
        this.keypressed=false;
        var rText: string = '';
        var sSearchText: string = this.txtSearch.Text;
        this.cmdSearchCat.IsEnabled = false;
        this.cmdSearchCat.Foreground = new SolidColorBrush(Colors.Black);
        if (this.objSearch.CheckSpecialCharacter(sSearchText, (o) => {
            rText = o;
        })) {
            this.txtSearch.Text = rText;
        }//out
        // if (this.objSearch.CheckSpecialCharacter(sSearchText, (rT) => { rText = rT; })) {
        // this.txtSearch.Text = rText;
        // }
        if (sSearchText.length > 2) {
            var objDetails: DrugItemDetails = new DrugItemDetails();
            objDetails.SearchText = sSearchText;
            objDetails.MedCatVersion = AppSessionInfo.AMCV;
            objDetails.SearchCriteria = "ORDERSET";
            if (this.optBeginsWith.IsChecked == true) {

                objDetails.SearchType = "BEGINS_WITH";
                this.LoadLookAhead(objDetails);
            }
            else if (this.optAnyWord.IsChecked == true) {
                objDetails.SearchType = "LEADING_WORD";
                this.LoadLookAhead(objDetails);
            }
            this.DisableEnableCntrl(true);
        }
    }
    ichkBoxSearchOrderSet_Unchecked(sender: Object, e: RoutedEventArgs): void {
        console.log("ichkBoxSearchOrderSet_Unchecked event");
        this.keypressed=false;
        this.OnTextSearch(0);
    }

    private OnTextSearch(keyCode: number): void {
        var rText: string;
        if (keyCode == 36) {
            this.txtSearch.Text = "";
            console.log("OnTextSearch_Clear", this.txtSearch.Text);
            this.ladSearch.Clear();
        }

        var sSearchText: string = this.txtSearch.Text;
        var sSearchText: string;

        if (this.objSearch.CheckSpecialCharacter(sSearchText, (o) => {
            rText = o;
        })) {
            this.txtSearch.Text = rText;
        }
        if (sSearchText.trim().length > 0) {
            this.cmdClear.IsEnabled = true;
            this.tvwMedFavourites.Visibility = Visibility.Collapsed;
            this.tvwMedFromulary.Visibility = Visibility.Collapsed;
            this.ladSearch.Visibility = Visibility.Visible;
            this.lblQLinkName.Visibility = Visibility.Collapsed;
            this.cboQuickLinks.SelectedIndex = -1;
        }
        else {
            this.cmdClear.IsEnabled = false;
        }
        if (sSearchText.length > 2) {
            var objDetails: DrugItemDetails = new DrugItemDetails();
            objDetails.SearchText = sSearchText;
            objDetails.MedCatVersion = AppSessionInfo.AMCV;
            if (this.oVM.IsCatalogue == 0) {
                objDetails.IsFormulary = 1;
            }
            else {
                objDetails.IsFormulary = 0;
            }
            if (this.ichkBoxSearchOrderSet.IsChecked == true) {
                objDetails.SearchCriteria = "ORDERSET";
            }
            else {
                objDetails.SearchCriteria = "DRUG_NAME";
            }
            if (this.optBeginsWith.IsChecked == true) {
                console.log("radio");
                objDetails.SearchType = "BEGINS_WITH";
                this.LoadLookAhead(objDetails);
            }
            else if (this.optAnyWord.IsChecked == true && (keyCode == 13 || keyCode == 0)) {
                objDetails.SearchType = "LEADING_WORD";
                this.LoadLookAhead(objDetails);
            }
            this.DisableEnableCntrl(true);
            this.cmdSearchCat.Foreground = new SolidColorBrush(Colors.Blue);
        }
        else {
            this.DisableEnableCntrl(false);
            this.cmdSearchCat.Foreground = new SolidColorBrush(Colors.Black);
            this.ClearAll();
        }
    }
    private GetProfileConfigData(SearchCriteria: string): void {
        var criteria: string = String.Empty;
        this.oAString = new ArrayOfString();
        switch (SearchCriteria) {
            case "REQUEST_SET_CARE_SET":
                criteria = "CC_REQCARESET";
                break;
            case "PROBLEM":
                criteria = "CC_MEDPLM";
                break;
            case "HIERARCHY":
                criteria = "CC_SUBDP_HRCY";
                break;
            case "DRUG_NAME":
                criteria = "CC_DRUGNAME";
                break;
        }
        if (ProfileData.MedSearchConfig != null && ProfileData.MedSearchConfig.PowerSearchConfig != null && ProfileData.MedSearchConfig.PowerSearchConfig.Count > 0) {
            console.log('fetch MedSearchConfig.PowerSearchConfig inside ')
            var tstData: StringBuilder = new StringBuilder();
            this.valueCollection = new Dictionary<string, List<string>>();
            var collection: List<string>;
            var sPriResultList: string;
            var sbPriResultList: StringBuilder = new StringBuilder();
            var myData: string[];
            var nCount: number = ProfileData.MedSearchConfig.PowerSearchConfig.Count;
            for (var i: number = 0; i < nCount; i++) {
                tstData.Clear();
                if (String.Compare(ProfileData.MedSearchConfig.PowerSearchConfig[i].SearchOptionValue.ToUpper(), criteria, StringComparison.CurrentCultureIgnoreCase) == 0) {
                    collection = new List<string>();
                    this.itmTypPrmScr.Add(ProfileData.MedSearchConfig.PowerSearchConfig[i].ItemTypeValue.ToUpper());
                    if (String.Compare(ProfileData.MedSearchConfig.PowerSearchConfig[i].ItemTypeValue, "CC_DRUG", StringComparison.CurrentCultureIgnoreCase) == 0) {
                        if (String.Compare(ProfileData.MedSearchConfig.PowerSearchConfig[i].ShowPrescribebybrandoptions, "Yes", StringComparison.CurrentCultureIgnoreCase) == 0)
                            this.BrandFlagForDrug = "1";
                        if (String.Compare(ProfileData.MedSearchConfig.PowerSearchConfig[i].Showfluidforinfusions, "Yes", StringComparison.CurrentCultureIgnoreCase) == 0)
                            this.FluidForInfusionFlag = '1';
                        if (!String.IsNullOrEmpty(ProfileData.MedSearchConfig.PowerSearchConfig[i].AlwaysDisplayInPrimaryList) && String.Equals(ProfileData.MedSearchConfig.PowerSearchConfig[i].AlwaysDisplayInPrimaryList, "Yes", StringComparison.CurrentCultureIgnoreCase)) {
                            this.AlwaysDisplayInPrimaryList = '1';
                        }
                    }
                    sPriResultList = ProfileData.MedSearchConfig.PowerSearchConfig[i].PrimaryResultList.ToUpper();
                    sPriResultList = sPriResultList.replace(/ /gi, String.Empty);
                    sPriResultList = sPriResultList.replace("VIRTUALMOIETY", "CATALOGUEITEM");
                    myData = sPriResultList.split(',');
                    collection.Clear();
                    sbPriResultList.Clear();
                    for (var dnt: number = 0; dnt < myData.length; dnt++) {
                        collection.Add(myData[dnt]);
                        sbPriResultList.Append(myData[dnt]);
                        sbPriResultList.Append("~");
                    }
                    if (!this.valueCollection.ContainsKey(ProfileData.MedSearchConfig.PowerSearchConfig[i].ItemTypeValue.ToUpper())) {
                        this.valueCollection.Add(ProfileData.MedSearchConfig.PowerSearchConfig[i].ItemTypeValue.ToUpper(), collection);
                        tstData.Append(ProfileData.MedSearchConfig.PowerSearchConfig[i].ItemTypeValue.ToUpper());
                        tstData.Append("-");
                        tstData.Append(sbPriResultList);
                        this.oAString.Add(tstData.ToString());
                        console.log(tstData.ToString(), "tstData", "GetProfileConfigData");
                        console.log(this.oAString, "oAString", "GetProfileConfigData");

                    }
                }
            }
        }
    }
    public LoadLookAhead(objDet: DrugItemDetails): void {
        if (this.oAString == null || (this.oAString != null && this.oAString.Count == 0)) {
            this.GetProfileConfigData(objDet.SearchCriteria);
        }
        this.oDIDetails = objDet;
        var objService: ManagePrescriptionWSSoapClient = new ManagePrescriptionWSSoapClient();
        objService.GetSearchDrugsCompleted = (s, e) => { this.objService_GetSearchDrugsCompleted(s, e) };
        var objReqSearch: CReqMsgGetSearchDrugs = new CReqMsgGetSearchDrugs();
        objReqSearch.oContextInformation = CommonBB.FillContext();
        objReqSearch.oContextInformation.PageInfo = this.txtSearch.Text + "~;wja@" + this.oVM.IsCatalogue.toString();
        // objReqSearch.oContextInformation.PageInfo = this.txtSearch.Text + "~;wja@";
        objReqSearch.oPowerSearchCriteriaBC = new PowerSearchCriteria();
        objReqSearch.oPowerSearchCriteriaBC.SearchText = !String.IsNullOrEmpty(objDet.SearchText) ? objDet.SearchText : String.Empty;
        objReqSearch.oPowerSearchCriteriaBC.MCVersionNo = !String.IsNullOrEmpty(objDet.MedCatVersion) ? objDet.MedCatVersion : String.Empty;
        objReqSearch.oPowerSearchCriteriaBC.OrganisationOID = Convert.ToInt64(AppContextInfo.OrganisationOID);
        objReqSearch.oPowerSearchCriteriaBC.SearchCriteria = this.GetSearchCriteria(objDet.SearchCriteria);

        objReqSearch.oPowerSearchCriteriaBC.IdentifyingTypes = this.oAString;//.array;
        objReqSearch.oPowerSearchCriteriaBC.IsFormulary = objDet.IsFormulary == 1 ? '1' : '0';
        objReqSearch.oPowerSearchCriteriaBC.SearchType = this.GetSearchType(objDet.SearchType);
        objReqSearch.oPowerSearchCriteriaBC.ActivityCode = ContextInfo.MenuCode;
        objReqSearch.oPowerSearchCriteriaBC.IsBrandFlagOn = this.BrandFlagForDrug;
        objReqSearch.oPowerSearchCriteriaBC.IsIncludeMultiCompFlagOn = '1';
        objReqSearch.oPowerSearchCriteriaBC.IsMCChildUOMs = '0';
        objReqSearch.oPowerSearchCriteriaBC.IsIncludeInfusionFlagOn = this.FluidForInfusionFlag;
        objReqSearch.oPowerSearchCriteriaBC.AlwaysDisplayInPrimaryList = this.AlwaysDisplayInPrimaryList;
        objReqSearch.oPowerSearchCriteriaBC.IsIPPMA_DU = true;
        //Revisit required        
        objReqSearch.oPowerSearchCriteriaBC.TeamOIDs = !String.IsNullOrEmpty((ObjectHelper.CreateType<IPPMABaseVM>(super.DataContext, IPPMABaseVM)).sTeamOIDs) ? (ObjectHelper.CreateType<IPPMABaseVM>(super.DataContext, IPPMABaseVM)).sTeamOIDs : String.Empty;
        if(String.IsNullOrEmpty(objReqSearch.oPowerSearchCriteriaBC.TeamOIDs))
            objReqSearch.oPowerSearchCriteriaBC.TeamOIDs = !String.IsNullOrEmpty((ObjectHelper.CreateType<MedQuickSelectVM>(this.DataContext, MedQuickSelectVM)).TeamOIDs) ? (ObjectHelper.CreateType<MedQuickSelectVM>(this.DataContext, MedQuickSelectVM)).TeamOIDs : String.Empty;
        
        if (objReqSearch.oPowerSearchCriteriaBC.SearchCriteria == EnumSearchCriteria.FAVOURITES) {
            objReqSearch.oPowerSearchCriteriaBC.FullyResolvedCriteria = new FullyResolvedCriteria();
            objReqSearch.oPowerSearchCriteriaBC.FullyResolvedCriteria.Others = "0";
        }
        objService.GetSearchDrugsAsync(objReqSearch);
        // objService.GetSearchDrugsAsync(objReqSearch, (s, e) => { this.objService_GetSearchDrugsCompleted(s, e) });
    }

    objService_GetSearchDrugsCompleted(sender: Object, e: GetSearchDrugsCompletedEventArgs): void {
        var _ErrorID: number = 80000055;
        var _ErrorSource: string = "LorAppManagePrescriptionBBUI_P2.dll, Class:Medquickselect, Method:objService_GetSearchDrugsCompleted()";
        var objResSearch: CResMsgGetSearchDrugs = e.Result;
        if (objResSearch.oContextInformation != null && !String.IsNullOrEmpty(objResSearch.oContextInformation.PageInfo)) {
            // var spageinfo: string[] = System.Text.RegularExpressions.Regex.Split(objResSearch.oContextInformation.PageInfo, "~;wja@");
            var spageinfo: string[] = RegularExpressions.Split(objResSearch.oContextInformation.PageInfo, "~;wja@");
            if (objResSearch.oContextInformation != null && String.Compare(spageinfo[0], this.txtSearch.Text, StringComparison.OrdinalIgnoreCase) != 0)
                return
            if (objResSearch.oContextInformation != null && String.Compare(this.oVM.IsCatalogue.toString(), spageinfo[1], StringComparison.OrdinalIgnoreCase) != 0)
                return
        }
        this.IsRecordExist = objResSearch.RecordExist;
        var objLineItem: PSLineItem;
        var oLstLineItem: ObservableCollection<PSLineItem> = new ObservableCollection<PSLineItem>();
        this.ladSearch.Clear();
        if (!this.keypressed) {
            if (e.Error == null) {
                try {
                    if (objResSearch != null && objResSearch.PowerSearchDrugs != null && objResSearch.PowerSearchDrugs.Count > 0) {
                        var sFNoteDrugProps: string, sFormularyNotes, ocproduct, desc, sDrugName, sPrescribingNote;
                        var ValueExist: boolean, TypeIn;
                        var resultCollec: List<string>;
                        var builder: StringBuilder = new StringBuilder();
                        var nLen: number, nSearchResultCount = objResSearch.PowerSearchDrugs.Count;
                        var oDrugItem: ManagePrescSer.DrugItemBasicInfo;
                        var oDrugProperty: ManagePrescSer.DrugProperty;
                        for (var nCnt: number = 0; nCnt < nSearchResultCount; nCnt++) {
                            sFNoteDrugProps = sFormularyNotes = sPrescribingNote = String.Empty;
                            ValueExist = true;
                            TypeIn = true;
                            resultCollec = null;
                            oDrugItem = objResSearch.PowerSearchDrugs.array[nCnt];
                            if (String.Compare(oDrugItem.ItemType, "CC_DRUG", StringComparison.OrdinalIgnoreCase) == 0 || String.Compare(oDrugItem.IdentifyingType, CConstants.NONCATALOGUEITEM, StringComparison.OrdinalIgnoreCase) == 0) {
                                ValueExist = true;
                                TypeIn = true;
                            }
                            else {
                                if (this.valueCollection.ContainsKey(oDrugItem.ItemType.ToUpper())) {
                                     this.valueCollection.TryGetValue(oDrugItem.ItemType.ToUpper(), (rC) => { resultCollec = rC; });
                                    ValueExist = resultCollec.Contains(oDrugItem.IdentifyingType.ToUpper());
                                }
                                TypeIn = this.itmTypPrmScr.Contains(oDrugItem.ItemType.ToUpper());
                                if (!ValueExist && !TypeIn && String.Compare(oDrugItem.IdentifyingType, "CATALOGUEITEM") != 0 && String.Compare(oDrugItem.IsPrescribeByBrand, "1") == 0) {
                                    var nCount: number = ProfileData.MedSearchConfig.PowerSearchConfig.Count;
                                    for (var k: number = 0; k < nCount; k++) {
                                        if (String.Compare(oDrugItem.ItemType, ProfileData.MedSearchConfig.PowerSearchConfig.array[k].ItemTypeValue) == 0) {
                                            if ((String.Compare(oDrugItem.IsPrescribeByBrand, "1") == 0) && String.Compare(ProfileData.MedSearchConfig.PowerSearchConfig.array[k].ShowPrescribebybrandoptions, "YES") == 0) {
                                                ValueExist = true;
                                                TypeIn = true;
                                                break;
                                            }
                                        }
                                    }
                                }
                            }
                            if (ValueExist && TypeIn) {
                                builder.Clear();
                                ocproduct = String.Empty;
                                desc = String.Empty;
                                if (oDrugItem.DrugProperties != null) {
                                    nLen = oDrugItem.DrugProperties.Count;
                                    for (var fkey: number = 0; fkey < nLen; fkey++) {
                                        if (oDrugItem.DrugProperties.array[fkey] != null) {
                                            oDrugProperty = oDrugItem.DrugProperties.array[fkey];
                                            if ((String.Equals(oDrugProperty.DrugName, CConstants.CATALOGUEITEM) || String.Equals(oDrugProperty.DrugName, CConstants.ACTUALMOIETY)) && !String.Equals(oDrugItem.ITMSUBTYP, CConstants.SUBTYPE) && !String.IsNullOrEmpty(oDrugProperty.DrugPropertyCode) && String.Equals(oDrugProperty.DrugPropertyCode, CConstants.HighRisk_CC)) {
                                                if (builder.Length > 0) {
                                                    builder.Append("^ ");
                                                    CommonBB.IsConceptCodeExists(oDrugProperty.DrugPropertyCode, Common.ConceptCodes, (de) => { desc = de });
                                                    builder.Append(desc);
                                                }
                                                else {
                                                    builder.Append(" ");
                                                    CommonBB.IsConceptCodeExists(oDrugProperty.DrugPropertyCode, Common.ConceptCodes, (de) => { desc = de });
                                                    builder.Append(desc);
                                                }
                                            }
                                            else if ((String.Compare(oDrugProperty.DrugName, CConstants.CATALOGUEITEM) == 0 || String.Compare(oDrugProperty.DrugName, CConstants.ACTUALMOIETY) == 0) && String.Compare(oDrugItem.ITMSUBTYP, CConstants.SUBTYPE, StringComparison.CurrentCultureIgnoreCase) != 0 && !String.IsNullOrEmpty(oDrugProperty.DrugPropertyCode) && !String.IsNullOrEmpty(oDrugProperty.VMChildCode) && oDrugProperty.VMChildCode.toString() == CConstants.AllChild_CC) {
                                                if (builder.Length > 0) {
                                                    builder.Append("^ ");
                                                    CommonBB.IsConceptCodeExists(oDrugProperty.DrugPropertyCode, Common.ConceptCodes, (de) => { desc = de });
                                                    builder.Append(desc);
                                                }
                                                else {
                                                    builder.Append(" ");
                                                    CommonBB.IsConceptCodeExists(oDrugProperty.DrugPropertyCode, Common.ConceptCodes, (de) => { desc = de });
                                                    builder.Append(desc);
                                                }
                                            }
                                            else if ((String.Compare(oDrugProperty.DrugName, CConstants.CATALOGUEITEM) == 0 || String.Compare(oDrugProperty.DrugName, CConstants.ACTUALMOIETY) == 0) && String.Compare(oDrugItem.ITMSUBTYP, CConstants.SUBTYPE, StringComparison.CurrentCultureIgnoreCase) == 0 && !String.IsNullOrEmpty(oDrugProperty.DrugPropertyCode)) {
                                                if (builder.Length > 0) {
                                                    builder.Append("^ ");
                                                    CommonBB.IsConceptCodeExists(oDrugProperty.DrugPropertyCode, Common.ConceptCodes, (de) => { desc = de });
                                                    builder.Append(desc);
                                                }
                                                else {
                                                    builder.Append(" ");
                                                    CommonBB.IsConceptCodeExists(oDrugProperty.DrugPropertyCode, Common.ConceptCodes, (de) => { desc = de });
                                                    builder.Append(desc);
                                                }
                                            }
                                            else if (String.Compare(oDrugProperty.DrugName, CConstants.CATALOGUEITEM) != 0 && String.Compare(oDrugProperty.DrugName, CConstants.ACTUALMOIETY) != 0 && !String.IsNullOrEmpty(oDrugProperty.DrugPropertyCode)) {
                                                if (builder.Length > 0) {
                                                    builder.Append("^ ");
                                                    CommonBB.IsConceptCodeExists(oDrugProperty.DrugPropertyCode, Common.ConceptCodes, (de) => { desc = de });
                                                    builder.Append(desc);
                                                }
                                                else {
                                                    builder.Append(" ");
                                                    CommonBB.IsConceptCodeExists(oDrugProperty.DrugPropertyCode, Common.ConceptCodes, (de) => { desc = de });
                                                    builder.Append(desc);
                                                }
                                                if (!oDrugProperty.DrugPropertyCode.startsWith("###") && String.Compare(oDrugProperty.DrugPropertyCode, CConstants.HighRisk_CC) == 0 && !String.IsNullOrEmpty(oDrugProperty.HighRiskMsg)) {
                                                    builder.Append(" - ");
                                                    builder.Append(oDrugProperty.HighRiskMsg);
                                                }
                                            }
                                            if (!String.Equals(oDrugItem.ITMSUBTYP, CConstants.SUBTYPE)) {
                                                if (!oDrugProperty.DrugPropertyCode.startsWith("###") && String.Compare(oDrugProperty.DrugPropertyCode, CConstants.HighRisk_CC) == 0 && !String.IsNullOrEmpty(oDrugProperty.HighRiskMsg) && !String.IsNullOrEmpty(oDrugProperty.VMChildCode) && (oDrugProperty.VMChildCode.toString() == CConstants.AllChild_CC || String.Equals(oDrugProperty.VMChildCode, CConstants.SomeChild_CC, StringComparison.CurrentCultureIgnoreCase))) {
                                                    builder.Append(" - ");
                                                    builder.Append(oDrugProperty.HighRiskMsg);
                                                }
                                                if (!oDrugProperty.DrugPropertyCode.startsWith("###") && !String.IsNullOrEmpty(oDrugProperty.VMChildCode) && oDrugProperty.VMChildCode.toString() == CConstants.AllChild_CC && !String.IsNullOrEmpty(oDrugProperty.DrugName) && (oDrugProperty.DrugName.toString() == CConstants.CATALOGUEITEM || oDrugProperty.DrugName.toString() == CConstants.ACTUALMOIETY) && (String.Compare(oDrugItem.ITMSUBTYP, CConstants.SUBTYPE, StringComparison.OrdinalIgnoreCase) != 0)) {
                                                    builder.Append(" - ");
                                                    ocproduct = CConstants.AllProducts;
                                                    builder.Append(ocproduct);
                                                }
                                                else if (!oDrugProperty.DrugPropertyCode.startsWith("###") && !String.IsNullOrEmpty(oDrugProperty.VMChildCode) && String.Equals(oDrugProperty.VMChildCode, CConstants.SomeChild_CC) && !String.IsNullOrEmpty(oDrugProperty.DrugName) && (String.Equals(oDrugProperty.DrugName, CConstants.CATALOGUEITEM) || String.Equals(oDrugProperty.DrugName, CConstants.ACTUALMOIETY)) && !String.Equals(oDrugItem.ITMSUBTYP, CConstants.SUBTYPE)) {
                                                    builder.Append(" - ");
                                                    ocproduct = CConstants.SomeProducts;
                                                    builder.Append(ocproduct);
                                                }
                                            }
                                        }
                                    }
                                }
                                if (String.Compare(oDrugItem.IdentifyingType, CConstants.CATALOGUEITEM) == 0 && !String.IsNullOrEmpty(oDrugItem.ITMSUBTYP) && String.Compare(oDrugItem.ITMSUBTYP, CConstants.SUBTYPE) == 0) {
                                    if (builder.Length > 0) {
                                        builder.Append("^ ");
                                        builder.Append(oDrugItem.ITMSUBTYP);
                                    }
                                    else {
                                        builder.Append(" ");
                                        builder.Append(oDrugItem.ITMSUBTYP);
                                    }
                                }
                                if (!String.IsNullOrEmpty(oDrugItem.FormularyNote)) {
                                    sFormularyNotes = "Formulary note - " + oDrugItem.FormularyNote;
                                }
                                if (!String.IsNullOrEmpty(oDrugItem.PrescribingNote)) {
                                    sPrescribingNote = oDrugItem.PrescribingNote;
                                }
                                if (!String.IsNullOrEmpty(builder.ToString())) {
                                    sFNoteDrugProps = sFormularyNotes + '*' + "Properties - " + builder.ToString();
                                }
                                if (!String.IsNullOrEmpty(oDrugItem.AliasName)) {
                                    sDrugName = oDrugItem.IdentifyingName.replace(oDrugItem.AliasName, String.Empty);
                                    sDrugName = sDrugName.trimStart(' ');
                                }
                                else {
                                    sDrugName = oDrugItem.IdentifyingName;
                                }
                                // var itemValue = oDrugItem.IdentifyingOID + "~" + oDrugItem.IdentifyingType + "~" + (!String.IsNullOrWhiteSpace(oDrugItem.IsAccessContraint) ? Int32.Parse(oDrugItem.IsAccessContraint) : 0) + "~" + (!String.IsNullOrWhiteSpace(oDrugItem.IsPrescribeByBrand) ? Int32.Parse(oDrugItem.IsPrescribeByBrand) : 0) + "~" + oDrugItem.SourceDataProviderType + "~" + oDrugItem.ItemType + "~" + sFNoteDrugProps + "~" + oDrugItem.IsFormulary + "~" + oDrugItem.LorenzoID + "~" + sDrugName + "~" + oDrugItem.ITMSUBTYP + "~" + oDrugItem.MultiComponentItems + "~" + oDrugItem.IsIndicationRequired + "~" + oDrugItem.SourceDataProviderType + "~" + oDrugItem.FormularyOID + "~" + sPrescribingNote;
                                var itemValue = oDrugItem.IdentifyingOID + "~" + oDrugItem.IdentifyingType + "~" + (!String.IsNullOrEmpty(oDrugItem.IsAccessContraint) ? Int32.Parse(oDrugItem.IsAccessContraint) : 0) + "~" + (!String.IsNullOrEmpty(oDrugItem.IsPrescribeByBrand) ? Int32.Parse(oDrugItem.IsPrescribeByBrand) : 0) + "~" + oDrugItem.SourceDataProviderType + "~" + oDrugItem.ItemType + "~" + sFNoteDrugProps + "~" + oDrugItem.IsFormulary + "~" + oDrugItem.LorenzoID + "~" + sDrugName + "~" + oDrugItem.ITMSUBTYP + "~" + oDrugItem.MultiComponentItems + "~" + oDrugItem.IsIndicationRequired + "~" + oDrugItem.SourceDataProviderType + "~" + oDrugItem.FormularyOID + "~" + sPrescribingNote;
                                objLineItem = new PSLineItem();
                                objLineItem.Text = oDrugItem.IdentifyingName;
                                objLineItem.Value = itemValue;
                                objLineItem.Tag = "TAG";
                                objLineItem.AlignRight = LineIconAlignment.Left;
                                objLineItem.ShowLinkIcon = true;
                                objLineItem.LinkIconTooltip = "Select item";
                                objLineItem.FNoteIconMargin = new Thickness(2, 0, 2, 0);
                                objLineItem.NotesIconMargin = new Thickness(2, 0, 2, 0);
                                objLineItem.MCIconMargin = new Thickness(2, 0, 2, 0);
                                objLineItem.HighRiskIconMargin = new Thickness(2, 0, 2, 0);
                                objLineItem.UnlicensedIconMargin = new Thickness(2, 0, 2, 0);
                                objLineItem.NamedPatientIconMargin = new Thickness(2, 0, 2, 0);
                                objLineItem.ControlledDrugIconMargin = new Thickness(2, 0, 2, 0);
                                objLineItem.NewlyMarketedIconMargin = new Thickness(2, 0, 2, 0);
                                if (oDrugItem.IdentifyingOID == -1 && String.Compare(oDrugItem.IdentifyingType, "NONCATALOGUEITEM", StringComparison.OrdinalIgnoreCase) == 0) {
                                    objLineItem.NormalStyle = 2;
                                    objLineItem.SelectedStyle = 2;
                                    objLineItem.ActiveStyle = 2;
                                }
                                else if (String.Compare(oDrugItem.IsFormulary, "0", StringComparison.OrdinalIgnoreCase) == 0) {
                                    objLineItem.NormalStyle = 1;
                                    objLineItem.SelectedStyle = 1;
                                    objLineItem.ActiveStyle = 1;
                                }
                                else {
                                    objLineItem.NormalStyle = 0;
                                    objLineItem.SelectedStyle = 0;
                                    objLineItem.ActiveStyle = 0;
                                }
                                if (String.Compare(oDrugItem.IdentifyingType, CConstants.NONCATALOGUEITEM, StringComparison.CurrentCulture) != 0) {
                                    objLineItem.LinkIcon = 0;
                                    if (!String.IsNullOrEmpty(sFormularyNotes)) {
                                        objLineItem.LineIcon = 0;
                                        objLineItem.FNoteIcon = true;//new BitmapImage(new Uri(MedImage.GetPath(MedImages.WarningIcon), UriKind.Relative));
                                        objLineItem.LineIconTooltip = sFormularyNotes;
                                        objLineItem.SecondaryTooltip = sFormularyNotes;
                                        objLineItem.FNoteIconTooltip = sFormularyNotes;
                                    }
                                }
                                if (String.Compare(oDrugItem.IdentifyingType, CConstants.NONCATALOGUEITEM, StringComparison.CurrentCulture) != 0 && !String.IsNullOrEmpty(builder.ToString())) {
                                    objLineItem.SecondaryIcon = 0;
                                    var sDrugProperty: string[] = builder.ToString().split('^');
                                    var nDrugProp: number = sDrugProperty.length;
                                    for (var i: number = 0; i < nDrugProp; i++) {
                                        if (sDrugProperty[i].Contains(CConstants.SUBTYPE)) {
                                            var oMCINames: string[] = MedsPrescribeUtility.GetMultiComponentItems(oDrugItem.MultiComponentItems);
                                            objLineItem.MCIcon = true;//new BitmapImage(new Uri(MedImage.GetPath(MedImages.ImgMltcmpnt), UriKind.Relative));
                                            objLineItem.SecondaryTooltip = String.Join("\n", oMCINames);
                                            objLineItem.MCIconTooltip = String.Join("\n", oMCINames);
                                        }
                                        else if (sDrugProperty[i].startsWith(" Controlled drug")) {
                                            objLineItem.ControlledDrugIcon = true;//new BitmapImage(new Uri(MedImage.GetPath(MedImages.CC_CNTRLDDRUG), UriKind.Relative));
                                            objLineItem.SecondaryTooltip = sDrugProperty[i];
                                            objLineItem.ControlledDrugIconTooltip = sDrugProperty[i];
                                        }
                                        else if (sDrugProperty[i].startsWith(" Unlicensed")) {
                                            objLineItem.UnlicensedIcon = true;//new BitmapImage(new Uri(MedImage.GetPath(MedImages.CC_UNLICENSED), UriKind.Relative));
                                            objLineItem.SecondaryTooltip = sDrugProperty[i];
                                            objLineItem.UnlicensedIconTooltip = sDrugProperty[i];
                                        }
                                        else if (sDrugProperty[i].startsWith(" Newly Marketed Drug")) {
                                            objLineItem.NewlyMarketedIcon = true;//new BitmapImage(new Uri(MedImage.GetPath(MedImages.CC_NEWLY), UriKind.Relative));
                                            objLineItem.SecondaryTooltip = sDrugProperty[i];
                                            objLineItem.NewlyMarketedIconTooltip = sDrugProperty[i];
                                        }
                                        else if (sDrugProperty[i].startsWith(" Named Patient Drug")) {
                                            objLineItem.NamedPatientIcon = true;//new BitmapImage(new Uri(MedImage.GetPath(MedImages.CC_NAMEDRUG), UriKind.Relative));
                                            objLineItem.SecondaryTooltip = sDrugProperty[i];
                                            objLineItem.NamedPatientIconTooltip = sDrugProperty[i];
                                        }
                                        else if (sDrugProperty[i].startsWith(" High risk")) {
                                            objLineItem.HighRiskIcon = true;//new BitmapImage(new Uri(MedImage.GetPath(MedImages.CC_HIGHRISK), UriKind.Relative));
                                            objLineItem.SecondaryTooltip = sDrugProperty[i];
                                            objLineItem.HighRiskIconTooltip = sDrugProperty[i];
                                        }
                                    }
                                }
                                if (!String.IsNullOrEmpty(sPrescribingNote)) {
                                    objLineItem.NotesIcon = true;//new BitmapImage(new Uri(MedImage.GetPath(MedImages.NoteIcon), UriKind.Relative));
                                    objLineItem.NotesData = sPrescribingNote;
                                    var sToolTip: string = String.Empty;
                                    if (sPrescribingNote.length > 200) {
                                        // sToolTip = sPrescribingNote.Substring(0, 199) + "...";
                                        objLineItem.NotesToolTip = sToolTip;
                                    }
                                    else {
                                        objLineItem.NotesToolTip = sPrescribingNote;
                                    }
                                }
                                oLstLineItem.Add(objLineItem);
                            }
                            else if (oDrugItem.ItemType == CConstants.Orderset && PatientContext.IPPMADU_P2) {
                                if (!String.IsNullOrEmpty(oDrugItem.AliasName)) {
                                    sDrugName = oDrugItem.IdentifyingName.replace(oDrugItem.AliasName, String.Empty);
                                    sDrugName = sDrugName.trimStart(' ');
                                }
                                else {
                                    sDrugName = oDrugItem.IdentifyingName;
                                }
                                if (oDrugItem.IsExcludeGuidanceInSearch != '1') {
                                    if (!String.IsNullOrEmpty(oDrugItem.Guidance)) {
                                        sPrescribingNote = oDrugItem.Guidance;
                                    }
                                }
                                var itemValue = oDrugItem.IdentifyingOID + "~" + oDrugItem.IdentifyingType + "~" + "" + "~" + "" + "~" + "" + "~" + oDrugItem.ItemType + "~" + "" + "~" + "0" + "~" + oDrugItem.LorenzoID + "~" + sDrugName + "~" + "" + "~" + "" + "~" + "" + "~" + "" + "~" + "" + "~" + oDrugItem.Guidance;
                                objLineItem = new PSLineItem();
                                objLineItem.Text = oDrugItem.IdentifyingName;
                                objLineItem.Value = itemValue;
                                objLineItem.Tag = "TAG";
                                objLineItem.AlignRight = LineIconAlignment.Left;
                                objLineItem.ShowLinkIcon = true;
                                objLineItem.LinkIconTooltip = "Select item";
                                objLineItem.FNoteIconMargin = new Thickness(0, 0, 0, 0);
                                objLineItem.NotesIconMargin = new Thickness(2, 0, 2, 0);
                                objLineItem.MCIconMargin = new Thickness(2, 0, 2, 0);
                                objLineItem.HighRiskIconMargin = new Thickness(0, 0, 0, 0);
                                objLineItem.UnlicensedIconMargin = new Thickness(0, 0, 0, 0);
                                objLineItem.NamedPatientIconMargin = new Thickness(0, 0, 0, 0);
                                objLineItem.ControlledDrugIconMargin = new Thickness(0, 0, 0, 0);
                                objLineItem.NewlyMarketedIconMargin = new Thickness(0, 0, 0, 0);
                                objLineItem.LinkIcon = 0;
                                objLineItem.LineIcon = 0;
                                objLineItem.MCIcon = true;//new BitmapImage(new Uri(MedImage.GetPath(MedImages.ImgOrderSet), UriKind.Relative));
                                objLineItem.SecondaryTooltip = CConstants.Orderset;
                                objLineItem.MCIconTooltip = CConstants.Orderset;
                                if (!String.IsNullOrEmpty(sPrescribingNote)) {
                                    objLineItem.NotesIcon = true;//new BitmapImage(new Uri(MedImage.GetPath(MedImages.NoteIcon), UriKind.Relative));
                                    objLineItem.NotesData = sPrescribingNote;
                                    var sToolTip: string = String.Empty;
                                    if (sPrescribingNote.length > 200) {
                                        sToolTip = sPrescribingNote.Substring(0, 199) + "...";
                                        objLineItem.NotesToolTip = sToolTip;
                                    }
                                    else {
                                        objLineItem.NotesToolTip = sPrescribingNote;
                                    }
                                }
                                oLstLineItem.Add(objLineItem);
                            }
                        }
                    }
                    else {
                        objLineItem = new PSLineItem();
                        if (this.oDIDetails.SearchCriteria == "ORDERSET") {
                            if (this.IsRecordExist) {
                                objLineItem.Text = prescribedrugs.IsOrderSetExistsTeamBased;
                                objLineItem.Value = prescribedrugs.IsOrderSetExistsTeamBased;
                            }
                            else {
                                objLineItem.Text = "No results found in the order sets";
                                objLineItem.Value = "No results found in the order sets";
                            }
                            objLineItem.Tag = "TAG";
                            objLineItem.NormalStyle = 3;
                            oLstLineItem.Add(objLineItem);
                        }
                        else if (this.oDIDetails.IsFormulary == 1) {
                            if (this.IsRecordExist) {
                                objLineItem.Text = prescribedrugs.IsFormularyOrDrugCatalogueExistsTeamBased;
                                objLineItem.Value = prescribedrugs.IsFormularyOrDrugCatalogueExistsTeamBased;
                                objLineItem.NormalStyle = 3;
                            }
                            else {
                                objLineItem.Text = "No results found in the formulary";
                                objLineItem.Value = "No results found in the formulary";
                                objLineItem.NormalStyle = 0;
                            }
                            objLineItem.Tag = "TAG";
                            oLstLineItem.Add(objLineItem);
                        }
                        else {
                            if (this.IsRecordExist) {
                                objLineItem.Text = prescribedrugs.IsFormularyOrDrugCatalogueExistsTeamBased;
                                objLineItem.Value = prescribedrugs.IsFormularyOrDrugCatalogueExistsTeamBased;
                                objLineItem.NormalStyle = 3;
                            }
                            else {
                                objLineItem.Text = "No results found in the drug catalogue";
                                objLineItem.Value = "No results found in the drug catalogue";
                                objLineItem.NormalStyle = 1;
                            }
                            objLineItem.Tag = "TAG";
                            oLstLineItem.Add(objLineItem);
                        }
                    }
                }
                catch (ex:any) {
                    var lnReturn: number = AMSHelper.PublicExceptionDetails(_ErrorID, _ErrorSource, ex);
                }

            }
            else {
                var lnReturn: number = AMSHelper.PublicExceptionDetails(_ErrorID, _ErrorSource, e.Error);
            }
            if (!this.keypressed) {
                this.objSearch.LstLineItem = oLstLineItem;
                console.log(oLstLineItem,'oLstLineItem')
                console.log(this.objSearch.LstLineItem,'this.objSearch.LstLineItem')
            }
        }
                   this.cdr.markForCheck();
    }
    private GetSearchType(sSearchType: string): EnumSearchType {
        var ReturnValue: EnumSearchType = EnumSearchType.NONE;
        switch (sSearchType) {
            case "CONTAINS":
                ReturnValue = EnumSearchType.CONTAINS;
                break;
            case "LEADING_WORD":
                ReturnValue = EnumSearchType.LEADING_WORD;
                break;
            case "FULLY_RESOLVED":
                ReturnValue = EnumSearchType.FULLY_RESOLVED;
                break;
        }
        return ReturnValue;
    }
    private GetSearchCriteria(sSearchType: string): EnumSearchCriteria {
        var ReturnValue: EnumSearchCriteria = EnumSearchCriteria.DRUG;
        switch (sSearchType) {
            case "DRUG_NAME":
                ReturnValue = EnumSearchCriteria.DRUG;
                break;
            case "HIERARCHY":
                ReturnValue = EnumSearchCriteria.HIERARCHY;
                break;
            case "PROBLEM":
                ReturnValue = EnumSearchCriteria.PROBLEM;
                break;
            case "REQUEST_SET_CARE_SET":
                ReturnValue = EnumSearchCriteria.REQUESTSET_CARESET;
                break;
            case "FAVOURITES":
                ReturnValue = EnumSearchCriteria.FAVOURITES;
                break;
            case "ORDERSET":
                ReturnValue = EnumSearchCriteria.ORDERSET;
                break;
        }
        return ReturnValue;
    }
    private ClearAll(): void {
        this.ladSearch.Clear();
        this.oVM.IsCatalogue = 0;
        this.cdr.markForCheck();

    }
    private DisableEnableCntrl(bFlag: boolean): void {
        this.cmdClear.IsEnabled = bFlag;
        if (this.ichkBoxSearchOrderSet.IsChecked == undefined || this.ichkBoxSearchOrderSet.IsChecked == false)
            this.cmdSearchCat.IsEnabled = bFlag;
    }

    cmdClear_Click_Func = (s, e) => {
        ObjectHelper.CreateObject(this, that);
        this.cmdClear_Click(s, e);
    }

    private cmdClear_Click(sender: Object, e: RoutedEventArgs): void {
        this.txtSearch.Text = String.Empty;
        console.log("cmdClear_Click", this.txtSearch.Text);
        this.cmdClear.IsEnabled = false;
        this.cmdSearchCat.IsEnabled = false;
        this.cmdSearchCat.Foreground = new SolidColorBrush(Colors.Black);
        this.optBeginsWith.IsChecked = true;
        this.optAnyWord.IsChecked = false;
        this.cboQuickLinks.SelectedIndex = -1;
        this.cboQuickLinks.ClearText();
        this.cboQuickLinks.Focus();
        this.ichkBoxSearchOrderSet.IsChecked = false;
        this.oVM.IsCatalogue = 0;
        this.ladSearch.Clear();
    }
    private ApplyiPowerSearchStyle(): void {
        this.objCurrentVM = ObjectHelper.__as__<IPPMABaseVM>(this.DataContext, IPPMABaseVM);
        if (this.objCurrentVM.QuickSelectVM == null)
            this.objCurrentVM.QuickSelectVM = new MedQuickSelectVM();
        this.objCurrentVM.QuickSelectVM.LstStyleItem = new ObservableCollection<PSStyleItem>();
        this.objCurrentVM.QuickSelectVM.LstImageItem = new ObservableCollection<PSImageItem>();
        Common.SetColorConfigCSS();
        var StyleItem0: PSStyleItem = new PSStyleItem();
        var StyleItem2: PSStyleItem = new PSStyleItem();
        var StyleItem3: PSStyleItem = new PSStyleItem();
        var data: string[];
        data = Common.sFormStyle.split('~');
        StyleItem0.Forecolor = data[0];
        StyleItem2.Forecolor = data[0];
        StyleItem3.Forecolor = data[0];
        if (data[3] == "bold")
            StyleItem0.Bold = true;
        else StyleItem0.Bold = false;
        if (data[2] == "italic")
            StyleItem0.Italic = true;
        else StyleItem0.Italic = false;
        if (data[1] == "uppercase")
            StyleItem0.TextCase = "Upper";
        else if (data[1] == "lowercase")
            StyleItem0.TextCase = "Lower";
        var StyleItem1: PSStyleItem = new PSStyleItem();
        data = Common.sNonFormStyle.split('~');
        StyleItem1.Forecolor = data[0];
        if (data[3] == "bold")
            StyleItem1.Bold = true;
        else StyleItem1.Bold = false;
        if (data[2] == "italic")
            StyleItem1.Italic = true;
        else StyleItem1.Italic = false;
        if (data[1] == "uppercase")
            StyleItem1.TextCase = "Upper";
        else if (data[1] == "lowercase")
            StyleItem1.TextCase = "Lower";
        StyleItem2.Bold = false;
        StyleItem2.Italic = false;
        StyleItem2.TextCase = "Upper";
        StyleItem3.Bold = false;
        StyleItem3.Italic = false;
        StyleItem3.TextCase = "Normal";
        this.objSearch.LstStyleItem.Add(StyleItem0);
        this.objSearch.LstStyleItem.Add(StyleItem1);
        this.objSearch.LstStyleItem.Add(StyleItem2);
        this.objSearch.LstStyleItem.Add(StyleItem3);
        var ImageItem0: PSImageItem = new PSImageItem();
        ImageItem0.ImageLink = true;//new BitmapImage(new Uri(MedImage.GetPath(MedImages.PowerArrow), UriKind.Relative));
        this.objSearch.LstImageItem.Add(ImageItem0);
    }
    private InitVM(): void {
        this.objCurrentVM = ObjectHelper.__as__<IPPMABaseVM>(this.DataContext, IPPMABaseVM);
        console.log("InitVM_1", this.objCurrentVM, this.objCurrentVM.QuickSelectVM);
        if (this.objCurrentVM.QuickSelectVM == null) {
            this.objCurrentVM.QuickSelectVM = new MedQuickSelectVM();
            console.log("InitVM_2", this.objCurrentVM, new MedQuickSelectVM());
        }
        this.objCurrentVM.QuickSelectVM.LstStyleItem = new ObservableCollection<PSStyleItem>();
        this.objCurrentVM.QuickSelectVM.LstImageItem = new ObservableCollection<PSImageItem>();
        if (this.objSearch == null) {
            this.objSearch = this.objCurrentVM.QuickSelectVM;
            this.objSearch.SMCVersion = AppSessionInfo.AMCV;
            if (MedicationCommonProfileData.MedViewConfig != null) {
                this.objSearch.LoadFavourites = MedicationCommonProfileData.MedViewConfig.Favourites;
                this.objSearch.LoadFormularies = MedicationCommonProfileData.MedViewConfig.Formulary;
            }
        }
    }
    private DrawArrowImage(): void {
        var ImageItem0: PSImageItem = new PSImageItem();
        ImageItem0.ImageLink = true;//new BitmapImage(new Uri(MedImage.GetPath(MedImages.PowerArrow), UriKind.Relative));
        if (this.objSearch != null && this.objSearch.LstImageItem == null) {
            this.objCurrentVM.QuickSelectVM.LstImageItem = new ObservableCollection<PSImageItem>();
        }
        this.objSearch.LstImageItem.Add(ImageItem0);
    }
    oMultiSelectListView_Closed(args: AppDialogEventargs): void {
        if (args.Content != null)
            this.oMultiSelectListView = ObjectHelper.CreateType<MultiSelectListView>(args.Content.Component, MultiSelectListView);
        // ObjectHelper.stopFinishAndCancelEvent(false);
        if (args.Result == AppDialogResult.Ok) {
            if (this.oMultiSelectListView.okButtonClick()) {
                if (this.oMultiSelectListView instanceof MultiSelectListView) {
                    let oMultiSelectVM: MultiSelectListVM = ObjectHelper.CreateType<MultiSelectListVM>(this.oMultiSelectListView.DataContext, MultiSelectListVM);
                    if (oMultiSelectVM instanceof MultiSelectListVM)
                        this.oVM.MedicationClerkingSource = oMultiSelectVM.ValueDomainCollection;
                }
            }
        }
        else {
            this.oMultiSelectListView.CancelButtonClick();
        }
    }
    OnRTEResult(args: RTEEventargs): void {
        if (String.IsNullOrEmpty(args.Request) || args.Result == null)
            return
        if (String.Compare(args.Request, ValueDomain.ProductType + "," + ValueDomain.MedicationOcInPrd) == 0) {
            if (args.Result instanceof Dictionary) {
                var objResult: Dictionary<string, List<CListItem>> = <Dictionary<string, List<CListItem>>>args.Result;
                Common.ConceptCodes = new ObservableCollection<CValuesetTerm>();
                objResult.forEach((objDomainDetail) => {
                    switch (objDomainDetail.Key) {
                        case ValueDomain.ProductType:
                        case ValueDomain.MedicationOcInPrd:
                            objDomainDetail.Value.forEach((oCListItem) => {
                                Common.ConceptCodes.Add(ObjectHelper.CreateObject(new CValuesetTerm(), { csCode: oCListItem.Value, csDescription: oCListItem.DisplayText }));
                            });
                            break;
                    }
                });
            }
        }
    }


    private UserControl_UnLoaded(sender: Object, e: RoutedEventArgs): void {
        this.DisposeFormEvents();
        this.DisposeFormObjects();
        if (this.oVM.IsFinish || this.oVM.IsFinishNow) {
            this.cmdClear = null;
            this.cmdMCI = null;
            this.cmdSearchCat = null;
            this.lblQuickLinks = null;
            this.lblSearch = null;
            this.lblQLinkName = null;
            if (this.objSearch != null) {
                this.objSearch = null;
            }
            this.ladSearch = null;
            if (this.LayoutRoot != null && this.LayoutRoot.Children != null && this.LayoutRoot.Children.Count > 0) {
                this.LayoutRoot.Children.Clear();
            }
            this.oVM = null;
            GC.Collect();
            GC.WaitForPendingFinalizers();
        }
    }
    objCurrentVM_PrescriptionItemAddedEvent(IsItemAdded: boolean): void {
        if (IsItemAdded) {
            this.txtSearch.Text = String.Empty;
            console.log("objCurrentVM_PrescriptionItemAddedEvent_Clear", this.txtSearch.Text);
            this.oVM.IsCatalogue = 0;
            this.ladSearch.Clear();
            this.ladSearch.OnSelect = undefined;
            this.ladSearch.OnSelect = (s, e) => { this.ladSearch_OnSelect(s, e) };
            this.cmdSearchCat.IsEnabled = false;
            this.cmdSearchCat.Foreground = new SolidColorBrush(Colors.Black);
            this.cmdClear.IsEnabled = false;
        }
    }
    private CanDefaultPaediatricsFolder(PaediatricsAgeLower: number, PaediatricsAgeUpper: number, PaediatricsAgeUOM: string): boolean {
        var bReturn: boolean = false;
        var dtPatDOB: DateTime;
        if (!String.IsNullOrEmpty(PaediatricsAgeUOM) && DateTime.TryParse(PatientContext.DOB, (dt) => { dtPatDOB = dt; })) {
            var dtCurrentDate: DateTime = CommonBB.GetServerDateTime();
            if (String.Compare(PaediatricsAgeUOM, "CC_MEDDRSN1", StringComparison.CurrentCultureIgnoreCase) == 0) {
                bReturn = (DateTime.LessThanOrEqualTo(dtPatDOB.AddDays(PaediatricsAgeLower).Date, dtCurrentDate) && DateTime.LessThanOrEqualTo(dtCurrentDate, dtPatDOB.AddDays(PaediatricsAgeUpper).Date.AddMinutes(1439)));
            }
            else if (String.Compare(PaediatricsAgeUOM, "CC_MEDDRSN2", StringComparison.CurrentCultureIgnoreCase) == 0) {
                bReturn = (DateTime.LessThanOrEqualTo(dtPatDOB.AddDays(PaediatricsAgeLower * 7).Date, dtCurrentDate) && DateTime.LessThanOrEqualTo(dtCurrentDate, dtPatDOB.AddDays(PaediatricsAgeUpper * 7).Date.AddMinutes(1439)));
            }
            else if (String.Compare(PaediatricsAgeUOM, "CC_MEDRSN3", StringComparison.CurrentCultureIgnoreCase) == 0) {
                bReturn = (DateTime.LessThanOrEqualTo(dtPatDOB.AddMonths(PaediatricsAgeLower).Date, dtCurrentDate) && DateTime.LessThanOrEqualTo(dtCurrentDate, dtPatDOB.AddMonths(PaediatricsAgeUpper + 1).Date.AddMinutes(1439)));
            }
            else if (String.Compare(PaediatricsAgeUOM, "CC_MEDRSN4", StringComparison.CurrentCultureIgnoreCase) == 0) {
                bReturn = (DateTime.LessThanOrEqualTo(dtPatDOB.AddYears(PaediatricsAgeLower).Date, dtCurrentDate) && DateTime.LessThan(dtCurrentDate, dtPatDOB.AddYears(PaediatricsAgeUpper + 1).Date));
            }
        }
        return bReturn;
    }

    cmdSearchCat_Click_Func = (s, e) => {
        ObjectHelper.CreateObject(this, that);
        this.cmdSearchCat_Click(s, e);
    }

    private cmdSearchCat_Click(sender: Object, e: RoutedEventArgs): void {
        var SearchText = this.txtSearch.Text;

        if (SearchText.trim().length > 0) {
            //Need to Changes as Focus()
            this.cmdSearchCat.setFocus();
            this.oVM.IsCatalogue = 1;
            this.OnTextSearch(0);
        }
    }

    optBeginsWith_Click_Func = (s, e) => {
        ObjectHelper.CreateObject(this, that);
        this.optBeginsWith.IsChecked = true;
        this.optAnyWord.IsChecked = false;
        this.optBeginsWith_Click(s, e);
    }

    optAnyWord_Click_Func = (s, e) => {
        ObjectHelper.CreateObject(this, that);
        this.optAnyWord.IsChecked = true;
        this.optBeginsWith.IsChecked = false;
        this.optAnyWord_Click(s, e);
    }

    private optBeginsWith_Click(sender: Object, e: RoutedEventArgs): void {
        this.ladSearch.Clear();
        this.keypressed=false;
        this.OnTextSearch(0);
    }
    private optAnyWord_Click(sender: Object, e: RoutedEventArgs): void {
        this.ladSearch.Clear();
        this.keypressed=false;
        this.OnTextSearch(0);
        setTimeout(()=>{
            this.cdr.markForCheck();
        },300)
    }

    tvwMedFromulary_MouseLeftButtonUp_Func = (s, e) => {
        this.tvwMedFromulary_MouseLeftButtonUp(s, e);
    }
    
    private tvwMedFromulary_MouseLeftButtonUp(sender: Object, e: MouseButtonEventArgs): void {    
        var oselNode: CTreeListItem = <CTreeListItem>this.tvwMedFromulary.SelectedItem;
        if (oselNode == null || String.IsNullOrEmpty(oselNode.Key))
            return
       // var objMPVM: IPPMABaseVM = ObjectHelper.__as__<IPPMABaseVM>(super.DataContext, IPPMABaseVM);
       var objMPVM = Common.oIPPMABaseVM;
        var arrSelNode: string[] = oselNode.Key.split('$');
        if (arrSelNode != null) {
            objMPVM.DrugItem = new DrugItemInputData();
            if ((arrSelNode[0] != CConstants.Formulary_Drug) && (arrSelNode[0] != CConstants.Formulary_Appliance) && (arrSelNode[0] != CConstants.Formulary_Unknown) && Convert.ToInt64(arrSelNode[0]) > 0)
                objMPVM.DrugItem.IdentifyingOID = Convert.ToInt64(arrSelNode[0]);
            if (arrSelNode.length > 1) {
                iBusyIndicator.Start("FormViewer", true);
                CommonVariables.FormViewerIsInProgress = true;
            }
            if (arrSelNode.length > 1 && !this.checkNull(arrSelNode[1]))
                objMPVM.DrugItem.IsAccessContraint = arrSelNode[1].toString().replace("\r\n", "");
            if (arrSelNode.length >= 2 && !this.checkNull(arrSelNode[2]))
                objMPVM.DrugItem.IsPrescribeByBrand = arrSelNode[2].toString().replace("\r\n", "");
            if (arrSelNode.length >= 3 && !this.checkNull(arrSelNode[3]))
                objMPVM.DrugItem.ItemType = arrSelNode[3].toString().replace("\r\n", "");
            if (arrSelNode.length >= 4 &&  !this.checkNull(arrSelNode[4]))
                objMPVM.DrugItem.IdentifyingName = arrSelNode[4].toString().replace("\r\n", "");
            if (arrSelNode.length >= 5 && !this.checkNull(arrSelNode[5]))
                objMPVM.DrugItem.LorenzoID = arrSelNode[5].toString().replace("\r\n", "");
            if (arrSelNode.length >= 6 && !this.checkNull(arrSelNode[6]))
                objMPVM.DrugItem.FormularyNote = arrSelNode[6].toString().replace("\r\n", "");
            if (arrSelNode.length >= 7 && !this.checkNull(arrSelNode[7]))
                objMPVM.DrugItem.IdentifyingType = arrSelNode[7].toString();
            if (arrSelNode.length >= 8 && !this.checkNull(arrSelNode[8]))
                objMPVM.DrugItem.ITMSUBTYP = arrSelNode[8].toString();
            if (arrSelNode.length >= 9 && !this.checkNull(arrSelNode[9]))
                objMPVM.DrugItem.MCItemName = arrSelNode[9].toString();
            if (arrSelNode.length >= 10 && !this.checkNull(arrSelNode[10]))
                objMPVM.DrugItem.ItemType = arrSelNode[10].toString();
            if (arrSelNode.length >= 11 && !this.checkNull(arrSelNode[11]))
                objMPVM.DrugItem.SourceDataProviderType = arrSelNode[11].toString();
            if (arrSelNode.length >= 12 && !this.checkNull(arrSelNode[12]))
                objMPVM.DrugItem.IsIndicationRequired = arrSelNode[12].toString();
            objMPVM.DrugItem.IsFormulary = true;
            objMPVM.DrugItem.MCVersionNo = AppSessionInfo.AMCV;
            objMPVM.DrugItem.FavouritesDetailOID = 0;
            var objFormulary: ManagePrescSer.ConstituentItem = new ManagePrescSer.ConstituentItem();
            if (objMPVM.DrugItem != null) {
                objFormulary.PresItemType = objMPVM.DrugItem.ItemType;
                objFormulary.Itemtype = objMPVM.DrugItem.ItemType;
                objFormulary.PrescriptionItemID = objMPVM.DrugItem.IdentifyingOID.toString();
                objFormulary.Name = objMPVM.DrugItem.IdentifyingName;
                objFormulary.Type = objMPVM.DrugItem.IdentifyingType;
                objFormulary.LorenzoID = objMPVM.DrugItem.LorenzoID;
                objFormulary.IsPrescribeByBrand = objMPVM.DrugItem.IsPrescribeByBrand;
                objFormulary.ItemSubType = objMPVM.DrugItem.ITMSUBTYP;
                objFormulary.IsFormulary = "1";
            }
            objFormulary.OperationMode = "N";
            this.oResUtil = new ReplacementDrugVM();
            this.oResUtil.GetReplacementDrugs(objFormulary, objMPVM);//ObjectHelper.__as__<IPPMABaseVM>(super.DataContext, IPPMABaseVM)
        }
    }
    private GetTTODrugPropertycollection(ocollection: ObservableCollection<IPPMAManagePrescSer.DrugProperty>): ObservableCollection<ManagePrescSer.DrugProperty> {
        var oTTOcollection: ObservableCollection<ManagePrescSer.DrugProperty> = null;
        if (ocollection != null) {
            oTTOcollection = new ObservableCollection<ManagePrescSer.DrugProperty>();
            ocollection.forEach((odrug) => {
                var objproperty: ManagePrescSer.DrugProperty = new ManagePrescSer.DrugProperty();
                objproperty.DrugName = odrug.DrugName;
                objproperty.DrugPropertyCode = odrug.DrugPropertyCode;
                objproperty.HighRiskMsg = odrug.HighRiskMsg;
                objproperty.IdentifyingOID = odrug.IdentifyingOID;
                objproperty.IdentifyingType = odrug.IdentifyingType;
                objproperty.OccuranceCode = odrug.OccuranceCode;
                objproperty.VMChildCode = odrug.VMChildCode;
                oTTOcollection.Add(objproperty);
            });
        }
        return oTTOcollection;
    }
    private GetDrugPropertyIcons(colDrugProperty: ObservableCollection<ManagePrescSer.DrugProperty>, IdentType: string, lstTvwProIco: List<TreeImageCollection>, ItemSubType: string): void {
        if (lstTvwProIco == null)
            lstTvwProIco = new List<TreeImageCollection>();
        var DistinctDrugprop = colDrugProperty.GroupBy(x => x.DrugPropertyCode).Select((y) => y.First());
        DistinctDrugprop.forEach((oDrugProp) => {
            switch (oDrugProp.DrugPropertyCode) {
                case "CC_CNTRLDDRUG":
                    {
                        if (String.Compare(IdentType, "CATALOGUEITEM", StringComparison.OrdinalIgnoreCase) == 0 || String.Equals(IdentType, CConstants.ACTUALMOIETY, StringComparison.InvariantCultureIgnoreCase)) {
                            if (String.Compare(oDrugProp.VMChildCode, "CC_OCCRALLCHILD", StringComparison.OrdinalIgnoreCase) == 0) {
                                lstTvwProIco.Add(ObjectHelper.CreateObject(new TreeImageCollection(), {
                                    IconMargin: new Thickness(2, 0, 2, 0),
                                    ImageSource: MedImage.GetPath(MedImages.CC_CNTRLDDRUG),
                                    ToolTip: prescribedrugs.CC_CNTRLDDRUGif_Tooltip,
                                    IconSource: MedImage.GetPath(MedImages.CC_CNTRLDDRUG),
                                    IconToolTip: prescribedrugs.CC_CNTRLDDRUGif_Tooltip
                                }));
                            }
                        }
                        else {
                            lstTvwProIco.Add(ObjectHelper.CreateObject(new TreeImageCollection(), {
                                IconMargin: new Thickness(2, 0, 2, 0),
                                ImageSource: MedImage.GetPath(MedImages.CC_CNTRLDDRUG),
                                ToolTip: prescribedrugs.CC_CNTRLDDRUGelse_Tooltip,
                                IconSource: MedImage.GetPath(MedImages.CC_CNTRLDDRUG),
                                IconToolTip: prescribedrugs.CC_CNTRLDDRUGelse_Tooltip
                            }));
                        }
                    }
                    break;
                case "CC_UNLICENSED":
                    {
                        if (String.Compare(IdentType, "CATALOGUEITEM", StringComparison.OrdinalIgnoreCase) == 0 || String.Equals(IdentType, CConstants.ACTUALMOIETY, StringComparison.InvariantCultureIgnoreCase)) {
                            if (String.Compare(oDrugProp.VMChildCode, "CC_OCCRALLCHILD", StringComparison.OrdinalIgnoreCase) == 0) {
                                lstTvwProIco.Add(ObjectHelper.CreateObject(new TreeImageCollection(), {
                                    IconMargin: new Thickness(2, 0, 2, 0),
                                    ImageSource: MedImage.GetPath(MedImages.CC_UNLICENSED),
                                    ToolTip: prescribedrugs.CC_UNLICENSEDif_Tooltip,
                                    IconSource: MedImage.GetPath(MedImages.CC_UNLICENSED),
                                    IconToolTip: prescribedrugs.CC_UNLICENSEDif_Tooltip
                                }));
                            }
                        }
                        else {
                            lstTvwProIco.Add(ObjectHelper.CreateObject(new TreeImageCollection(), {
                                IconMargin: new Thickness(2, 0, 2, 0),
                                ImageSource: MedImage.GetPath(MedImages.CC_UNLICENSED),
                                ToolTip: prescribedrugs.CC_UNLICENSEDelse_Tooltip,
                                IconSource: MedImage.GetPath(MedImages.CC_UNLICENSED),
                                IconToolTip: prescribedrugs.CC_UNLICENSEDelse_Tooltip
                            }));
                        }
                    }
                    break;
                case "CC_HIGHRISK":
                    {
                        if (!String.IsNullOrEmpty(ItemSubType) && String.Equals(ItemSubType, CConstants.SUBTYPE)) {
                            lstTvwProIco.Add(ObjectHelper.CreateObject(new TreeImageCollection(), {
                                IconMargin: new Thickness(2, 0, 2, 0),
                                ImageSource: MedImage.GetPath(MedImages.CC_HIGHRISK),
                                ToolTip: prescribedrugs.CC_HIGHRISKif_Tooltip,
                                IconSource: MedImage.GetPath(MedImages.CC_HIGHRISK),
                                IconToolTip: prescribedrugs.CC_HIGHRISKif_Tooltip
                            }));
                        }
                        else {
                            var sHighRiskMsg: string = oDrugProp.HighRiskMsg;
                            if (String.Compare(IdentType, "CATALOGUEITEM", StringComparison.OrdinalIgnoreCase) == 0 || String.Equals(IdentType, CConstants.ACTUALMOIETY, StringComparison.InvariantCultureIgnoreCase)) {
                                sHighRiskMsg = !String.IsNullOrEmpty(sHighRiskMsg) ? (" - " + sHighRiskMsg + " - ") : " - ";
                                if (String.Compare(oDrugProp.VMChildCode, "CC_OCCRALLCHILD", StringComparison.OrdinalIgnoreCase) == 0) {
                                    lstTvwProIco.Add(ObjectHelper.CreateObject(new TreeImageCollection(), {
                                        IconMargin: new Thickness(2, 0, 2, 0),
                                        ImageSource: MedImage.GetPath(MedImages.CC_HIGHRISK),
                                        ToolTip: prescribedrugs.CC_HIGHRISKif_Tooltip + sHighRiskMsg + prescribedrugs.CC_HIGHRISKelse_Tooltip,
                                        IconSource: MedImage.GetPath(MedImages.CC_HIGHRISK),
                                        IconToolTip: prescribedrugs.CC_HIGHRISKif_Tooltip + sHighRiskMsg + prescribedrugs.CC_HIGHRISKelse_Tooltip
                                    }));
                                }
                                else if (String.Equals(oDrugProp.VMChildCode, CConstants.SomeChild_CC, StringComparison.CurrentCultureIgnoreCase)) {
                                    lstTvwProIco.Add(ObjectHelper.CreateObject(new TreeImageCollection(), {
                                        IconMargin: new Thickness(2, 0, 2, 0),
                                        ImageSource: MedImage.GetPath(MedImages.CC_HIGHRISK),
                                        ToolTip: prescribedrugs.CC_HIGHRISKif_Tooltip + sHighRiskMsg + prescribedrugs.CC_HIGHRISKSomePrd_Tooltip,
                                        IconSource: MedImage.GetPath(MedImages.CC_HIGHRISK),
                                        IconToolTip: prescribedrugs.CC_HIGHRISKif_Tooltip + sHighRiskMsg + prescribedrugs.CC_HIGHRISKSomePrd_Tooltip
                                    }));
                                }
                            }
                            else {
                                lstTvwProIco.Add(ObjectHelper.CreateObject(new TreeImageCollection(), {
                                    IconMargin: new Thickness(2, 0, 2, 0),
                                    ImageSource: MedImage.GetPath(MedImages.CC_HIGHRISK),
                                    ToolTip: prescribedrugs.CC_HIGHRISKif_Tooltip + " - " + sHighRiskMsg,
                                    IconSource: MedImage.GetPath(MedImages.CC_HIGHRISK),
                                    IconToolTip: prescribedrugs.CC_HIGHRISKif_Tooltip + " - " + sHighRiskMsg
                                }));
                            }
                        }
                    }
                    break;
                case "CC_NEWLY":
                    {
                        if (String.Compare(IdentType, "CATALOGUEITEM", StringComparison.OrdinalIgnoreCase) == 0 || String.Equals(IdentType, CConstants.ACTUALMOIETY, StringComparison.InvariantCultureIgnoreCase)) {
                            if (String.Compare(oDrugProp.VMChildCode, "CC_OCCRALLCHILD", StringComparison.OrdinalIgnoreCase) == 0) {
                                lstTvwProIco.Add(ObjectHelper.CreateObject(new TreeImageCollection(), {
                                    IconMargin: new Thickness(2, 0, 2, 0),
                                    ImageSource: MedImage.GetPath(MedImages.CC_NEWLY),
                                    ToolTip: prescribedrugs.CC_NEWLYif_Tooltip,
                                    IconSource: MedImage.GetPath(MedImages.CC_NEWLY),
                                    IconToolTip: prescribedrugs.CC_NEWLYif_Tooltip
                                }));
                            }
                        }
                        else {
                            lstTvwProIco.Add(ObjectHelper.CreateObject(new TreeImageCollection(), {
                                IconMargin: new Thickness(2, 0, 2, 0),
                                ImageSource: MedImage.GetPath(MedImages.CC_NEWLY),
                                ToolTip: prescribedrugs.CC_NEWLYelse_Tooltip,
                                IconSource: MedImage.GetPath(MedImages.CC_NEWLY),
                                IconToolTip: prescribedrugs.CC_NEWLYelse_Tooltip
                            }));
                        }
                    }
                    break;
                case "CC_NAMEDRUG":
                    {
                        if (String.Compare(IdentType, "CATALOGUEITEM", StringComparison.OrdinalIgnoreCase) == 0 || String.Equals(IdentType, CConstants.ACTUALMOIETY, StringComparison.InvariantCultureIgnoreCase)) {
                            if (String.Compare(oDrugProp.VMChildCode, "CC_OCCRALLCHILD", StringComparison.OrdinalIgnoreCase) == 0) {
                                lstTvwProIco.Add(ObjectHelper.CreateObject(new TreeImageCollection(), {
                                    IconMargin: new Thickness(2, 0, 2, 0),
                                    ImageSource: MedImage.GetPath(MedImages.CC_NAMEDRUG),
                                    ToolTip: prescribedrugs.CC_NAMEDRUGif_Tooltip,
                                    IconSource: MedImage.GetPath(MedImages.CC_NAMEDRUG),
                                    IconToolTip: prescribedrugs.CC_NAMEDRUGif_Tooltip
                                }));
                            }
                        }
                        else {
                            lstTvwProIco.Add(ObjectHelper.CreateObject(new TreeImageCollection(), {
                                IconMargin: new Thickness(2, 0, 2, 0),
                                ImageSource: MedImage.GetPath(MedImages.CC_NAMEDRUG),
                                ToolTip: prescribedrugs.CC_NAMEDRUGelse_Tooltip,
                                IconSource: MedImage.GetPath(MedImages.CC_NAMEDRUG),
                                IconToolTip: prescribedrugs.CC_NAMEDRUGelse_Tooltip
                            }));
                        }
                    }
                    break;
            }
        });
    }

    tvwMedFavourites_OnHyperLinkClick_Func = (s, e) => {
        this.tvwMedFavourites_OnHyperLinkClick(s, e);
    }
    private checkNull(strval:string)
    {
        let val = false;
        if(strval && strval.includes("null"))
        {
            val=true;
        }
        else if (!strval)
        {
            val=true;
        }
       return(val) 
    }

    private tvwMedFavourites_OnHyperLinkClick(s: Object, e: RoutedEventArgs): void {
        var oselNode: CTreeListItem = <CTreeListItem>this.tvwMedFavourites.SelectedItem;
       // var objMPVM: IPPMABaseVM = ObjectHelper.__as__<IPPMABaseVM>(super.DataContext, IPPMABaseVM);
       var objMPVM = Common.oIPPMABaseVM;
        var arrSelNode: string[] = oselNode.Tag.ToString().Split('~');
        var detailOID: string = this.cboQuickLinks.GetValue();
        if (!String.IsNullOrEmpty(detailOID)) {
            var favGroupId: string[] = detailOID.split('^');
            if (arrSelNode != null && favGroupId != null) {
                if (favGroupId[0] == "O") {
                    if (arrSelNode.length > 2) {
                        iBusyIndicator.Start("Favourites", true);
                        this.LaunchOrderSetMezzanine(arrSelNode[0], arrSelNode[1]);
                    }
                }
                else {
                    if ((arrSelNode.length > 2) && (arrSelNode[2] == CConstants.Orderset)) {
                        iBusyIndicator.Start("Favourites", true);
                        this.ProcessOrderSet(arrSelNode);
                    }
                    else {
                        objMPVM.DrugItem = new DrugItemInputData();
                        objMPVM.DrugItem.IdentifyingName = oselNode.Value.toString();
                        if (arrSelNode[0] != null && arrSelNode[0].length > 0)
                            objMPVM.DrugItem.IdentifyingOID = Convert.ToInt64(arrSelNode[0]);
                        if (arrSelNode.length >= 2 && arrSelNode[2] != null) {
                            iBusyIndicator.Start("Favourites", true);
                            objMPVM.DrugItem.IdentifyingType = arrSelNode[2].toString();
                        }
                        if (arrSelNode.length >= 6  && !this.checkNull(arrSelNode[6]) )
                            objMPVM.DrugItem.MCVersionNo = arrSelNode[6].toString();
                        if ((arrSelNode.length >= 9  && !this.checkNull(arrSelNode[9])) || (arrSelNode.length >= 9 && arrSelNode[9].toString() == "null"))
                            objMPVM.DrugItem.IsFormulary = (arrSelNode[9].toString() == "0" || arrSelNode[9].toString() == "" || arrSelNode[9].toString() == "null") ? false : true;
                        if (arrSelNode.length >= 3 &&  !this.checkNull(arrSelNode[3]) && arrSelNode[3].length > 0)
                            objMPVM.DrugItem.FavouritesDetailOID = Convert.ToInt64(arrSelNode[3]);
                        if (arrSelNode.length >= 5  && !this.checkNull(arrSelNode[5]) )
                            objMPVM.DrugItem.IsAccessContraint = arrSelNode[5].toString();
                        if (arrSelNode.length >= 4 && !this.checkNull(arrSelNode[4]) )
                            objMPVM.DrugItem.IsPrescribeByBrand = arrSelNode[4].toString();
                        if (arrSelNode.length >= 7  && !this.checkNull(arrSelNode[7]))
                            objMPVM.DrugItem.ItemType = arrSelNode[7].toString();
                        if (arrSelNode.length >= 8  && !this.checkNull(arrSelNode[8]))
                            objMPVM.DrugItem.LorenzoID = arrSelNode[8].toString();
                        if (arrSelNode.length >= 10  && !this.checkNull(arrSelNode[10]))
                            objMPVM.DrugItem.FormularyNote = arrSelNode[10].toString();
                        if (arrSelNode.length >= 14  && !this.checkNull(arrSelNode[14]))
                            objMPVM.DrugItem.ITMSUBTYP = arrSelNode[14].toString();
                        if (arrSelNode.length >= 13  && !this.checkNull(arrSelNode[13]))
                            objMPVM.DrugItem.MCItemName = arrSelNode[13].toString();
                        if (arrSelNode.length >= 15  && !this.checkNull(arrSelNode[15]))
                            objMPVM.DrugItem.MCIDeactItems = arrSelNode[15].toString();
                        if (arrSelNode.length >= 16  && !this.checkNull(arrSelNode[16]))
                            objMPVM.DrugItem.IsIndicationRequired = arrSelNode[16].toString();
                        if (arrSelNode.length >= 17  && !this.checkNull(arrSelNode[17]))
                            objMPVM.DrugItem.SourceDataProviderType = arrSelNode[17].toString();
                        var objFavItem: ManagePrescSer.ConstituentItem = new ManagePrescSer.ConstituentItem();
                        if (objMPVM.DrugItem != null) {
                            objFavItem.Itemtype = objFavItem.PresItemType = objMPVM.DrugItem.ItemType;
                            objFavItem.ItemSubType = objFavItem.ItemSubType = objMPVM.DrugItem.ITMSUBTYP;
                            objFavItem.PrescriptionItemID = objMPVM.DrugItem.IdentifyingOID.toString();
                            objFavItem.Name = objMPVM.DrugItem.IdentifyingName;
                            objFavItem.Type = objMPVM.DrugItem.IdentifyingType;
                            objFavItem.LorenzoID = objMPVM.DrugItem.LorenzoID;
                            objFavItem.IsPrescribeByBrand = objMPVM.DrugItem.IsPrescribeByBrand;
                            objFavItem.HasAccessConstraint = Convert.ToInt16(objMPVM.DrugItem.IsAccessContraint);
                            objFavItem.IsFormulary = "Fav" + "^" + objMPVM.DrugItem.IsFormulary;
                            objFavItem.MCIDeactitemName = objMPVM.DrugItem.MCIDeactItems;
                            objFavItem.IsIndicationRequired = objMPVM.DrugItem.IsIndicationRequired;
                            objFavItem.SourceDataProviderType = objMPVM.DrugItem.SourceDataProviderType;
                        }
                        if (arrSelNode[11] != null) {
                            objFavItem.OID = Convert.ToInt64(arrSelNode[11].toString());
                        }
                        objFavItem.OperationMode = "N";
                        this.oResUtil = new ReplacementDrugVM();
                        this.oResUtil.GetReplacementDrugs(objFavItem,objMPVM);// ObjectHelper.__as__<IPPMABaseVM>(this.DataContext, IPPMABaseVM)
                    }
                }
            }
        }
    }
    cmdMCI_Click_Func = (s, e) => {
        this.cmdMCI_Click(s, e);
    }
    private cmdMCI_Click(sender: Object, e: RoutedEventArgs): void {
        iBusyIndicator.Start("CreateMCILink", true);
    //    var objMPVM: IPPMABaseVM = ObjectHelper.__as__<IPPMABaseVM>(super.DataContext, IPPMABaseVM);
        var objMPVM = Common.oIPPMABaseVM;
        objMPVM.DrugItem = new DrugItemInputData();
        objMPVM.DrugItem.IdentifyingOID = CommonFlags.MCidentifyingOID;
        objMPVM.DrugItem.IdentifyingType = CommonFlags.MCidentifyingType;
        objMPVM.DrugItem.IdentifyingName = CommonFlags.MCidentifyingName;
        objMPVM.DrugItem.MCVersionNo = AppSessionInfo.AMCV;
        objMPVM.DrugItem.ITMSUBTYP = CommonFlags.MCsubtype;
        objMPVM.DrugItem.ItemType = "CC_DRUG";
        objMPVM.DrugItem.LorenzoID = CommonFlags.MClorenzoid;
        objMPVM.IsAdhocMCIClicked = true;
        objMPVM.MCINewItem(objMPVM.DrugItem);
    }
    private ProcessOrderSet(arrTag: string[]): void {
        var IdentifyingOID: number = 0;
        var objservice1: IPPMAManagePrescriptionWSSoapClient = new IPPMAManagePrescriptionWSSoapClient();
        objservice1.GetOrderSetStatusCompleted = (s, e) => { this.objservice1_GetOrderSetStatusCompleted(s, e) };
        var oRequest: CReqMsgGetOrderSetStatus = new CReqMsgGetOrderSetStatus();
        Int64.TryParse(arrTag[0], (Id) => {
            IdentifyingOID = Id;
        })
        oRequest.OrderSetOIDBC = IdentifyingOID;
        oRequest.MCVersionBC = AppSessionInfo.AMCV;
        oRequest.oContextInformation = CommonBB.FillContext();
        objservice1.GetOrderSetStatusAsync(oRequest);
        // objservice1.GetOrderSetStatusAsync(oRequest, (s, e) => { this.objservice1_GetOrderSetStatusCompleted(s, e) });
    }
    private LaunchOrderSetMezzanine(ORSOID: string, ORSname: string): void {
        if (this.oVM.MedsResolve != null) {
            if (this.oVM.SelectedGPConnectItem != null) {
                this.oVM.SelectedGPConnectItem = null;
            }

            let NewItems = [];
            this.oVM.MedsResolve.forEach((Items) => {
                if (Items.PrescriptionItemStatus != PrescriptionItemStatusCodes.CANCELLED && Items.PrescriptionItemStatus != PrescriptionItemStatusCodes.DISCONTINUED &&
                    Items.PrescriptionItemStatus != PrescriptionItemStatusCodes.ONHOLD //&& Items.PrescriptionItemStatus != PrescriptionItemStatusCodes.AWAITINGAUTHORISE
                    && Items.PrescriptionItemStatus != PrescriptionItemStatusCodes.COMPLETED && Items.FormViewerDetails != null && Items.FormViewerDetails.BasicDetails != null &&
                    //(String.Compare(Items.OperationMode, "N") == 0 ) &&
                    Items.FormViewerDetails.BasicDetails.Ordersets != null && (!(String.IsNullOrEmpty(Items.FormViewerDetails.BasicDetails.Ordersets.Value))) && Items.FormViewerDetails.BasicDetails.Ordersets.Value == ORSOID) {
                        NewItems.push(Items)
                    }
            })

            var associationOids: string[] = NewItems.Where(x => x.FormViewerDetails.BasicDetails.Ordersets.Tag != null && !String.IsNullOrEmpty(x.FormViewerDetails.BasicDetails.Ordersets.Tag.ToString()) && Long.Parse(x.FormViewerDetails.BasicDetails.Ordersets.Tag.ToString()) > 0).Select(x => x.FormViewerDetails.BasicDetails.Ordersets.Tag.ToString()).ToArray();
            {
                //Not Required for LHS. To be Re-Visited.
                this.oORSChild = new OrderSetSecMezzanine();
                var ordersetOID: number;
                // number.TryParse(ORSOID, ordersetOID);
                Long.TryParse(ORSOID, (o1) => {
                    ordersetOID = o1;
                })
                var orsname: string = ORSname;
                var objVM: OrderSetSecMezzanineVM = new OrderSetSecMezzanineVM(ordersetOID, orsname);
                objVM.IgnoreOrdetAssociations = associationOids;
                objVM.IsPartialPrescribe = NewItems != null && NewItems.Count() > 0;
                this.oORSChild.objsecondary = new OrderSetChildfooter();
                this.oORSChild.objsecondary.DataContext = objVM;
                this.oORSChild.DataContext = objVM;
                var sWindowTitle: string = objVM.OrderSetName + " - contents";
                // var _height: number = Application.Current.Host.Content.ActualHeight - 150;
                let _height: number = 700;
                let Callback = (s, e) => {
                    if (s != null && e != null) {
                        this.oORSChild = s;
                        this.oORSChild.objsecondary = e;
                    }
                }
                let dialogWindowHeight;
                if(window.screen.height < 1000 && window.devicePixelRatio != 1.25){
                    dialogWindowHeight = 490;
                }else{
                    dialogWindowHeight = (_height/window.devicePixelRatio);
                    if (((!String.IsNullOrEmpty(QueryStringInfo.IsLaunchformMedchart) &&
                        String.Equals(
                        QueryStringInfo.IsLaunchformMedchart,
                        'True',
                        StringComparison.InvariantCultureIgnoreCase
                        )) || (!String.IsNullOrEmpty(QueryStringInfo.IsClinicalNote) &&
                        String.Equals(
                            QueryStringInfo.IsClinicalNote,
                            'Yes',
                            StringComparison.InvariantCultureIgnoreCase
                        )) || (!String.IsNullOrEmpty(QueryStringInfo.FromPreschart) &&
                            String.Equals(
                            QueryStringInfo.FromPreschart,
                            'True',
                            StringComparison.InvariantCultureIgnoreCase
                            )) || (!String.IsNullOrEmpty(QueryStringInfo.IsLaunchformPreschartReview) &&
                            String.Equals(
                            QueryStringInfo.IsLaunchformPreschartReview,
                            'True',
                            StringComparison.InvariantCultureIgnoreCase
                            )) || (!String.IsNullOrEmpty(QueryStringInfo.FromClinicalNote) &&
                            String.Equals(
                            QueryStringInfo.FromClinicalNote,
                            'True',
                            StringComparison.InvariantCultureIgnoreCase
                            ))) && window.devicePixelRatio == 1.25) {
                                    dialogWindowHeight = dialogWindowHeight -50;
                                }
                }
                // ObjectHelper.stopFinishAndCancelEvent(true);
                AppActivity.OpenWindow(sWindowTitle, this.oORSChild, (s, e) => {this.oORSChild_Closed(s)}, "", false, dialogWindowHeight, 1055, false, WindowButtonType.OkCancel, this.oORSChild.objsecondary, null, null, Callback);
            }
        }
    }
    objservice1_GetOrderSetStatusCompleted(sender: Object, e: GetOrderSetStatusCompletedEventArgs): void {
        var _ErrorID: number = 80000060;
        var _ErrorSource: string = "LorAppManagePrescriptionBBUI_P2.dll, Class:Medquickselect, Method:objservice1_GetOrderSetStatusCompleted()";
        if (e.Error == null) {
            try {
                var oResMsgGetOrderSetStatus: CResMsgGetOrderSetStatus = e.Result;
                if (oResMsgGetOrderSetStatus != null) {
                    if (oResMsgGetOrderSetStatus.Status == "A") {
                        var oselNode: CTreeListItem = <CTreeListItem>this.tvwMedFavourites.SelectedItem;
                        if (oselNode.Tag != null) {
                            var arrSelNode: string[] = oselNode.Tag.ToString().Split('~');
                            if (arrSelNode != null && arrSelNode.length > 2) {
                                this.LaunchOrderSetMezzanine(arrSelNode[0], arrSelNode[1]);
                            }
                        }
                    }
                    else {
                        iMessageBox.Show("Lorenzo", Resource.ORSSecMezzanine.ORSDeactivated_Text, MessageBoxType.Information, MessageBoxButton.OK);
                        Busyindicator.SetStatusIdle("Favourites");
                        Busyindicator.SetStatusIdle("FormViewer");
                        Busyindicator.SetStatusIdle("Orderset");
                    }
                }
            }
            catch (ex:any) {
                let lnReturn: number = AMSHelper.PublicExceptionDetails(_ErrorID, _ErrorSource, ex);
            }

        }
    }
    public DisposeFormEvents(): void {
        if (this.profile != null)
            this.profile.OnProfileListLoaded = undefined;//-= profile_OnProfileLoaded;
        if (this.txtSearch != null)
            this.txtSearch.KeyUp = undefined;//-= txtSearch_KeyUp;
        if (this.ladSearch != null) {
            this.ladSearch.OnSecondarySelection = undefined;//-= ladSearch_SecondarySelection;
            this.ladSearch.OnSelect = undefined;//-= ladSearch_OnSelect;
            this.ladSearch.GotFocus = undefined; //-= ladSearch_GotFocus;
        }
        if (this.objCurrentVM != null) {
            this.objCurrentVM.PrescriptionItemAddedEvent = undefined //-= objCurrentVM_PrescriptionItemAddedEvent;
        }
    }
    public DisposeFormObjects(): void {
        //Not Required for LHS. To be Re-Visited.
        // if (this.oSecChild != null) {
        //     this.oSecChild.DataContext = null;
        //     this.oSecChild.iSecondaryTab = null;
        //     this.oSecChild = null;
        // }
        //this.oORSChild = null;
        this.oDIDetails = null;
        this.oDrugItemInputData = null;
        this.oMultiSelectListView = null;
        
        if (this.oVM.IsFinish || this.oVM.IsFinishNow) {
            if (this.ichkBoxSearchOrderSet != null) {
                this.ichkBoxSearchOrderSet.Checked = undefined;//-= ichkBoxSearchOrderSet_Checked;
                this.ichkBoxSearchOrderSet.Unchecked = undefined; //-= ichkBoxSearchOrderSet_Unchecked;
            }
            if (this.objCurrentVM != null) {
                //this.objCurrentVM.TeamBasedSearchDrugCatalogueCompleted = undefined ; //-= objCurrentVM_TeamBasedSearchDrugCatalogueCompleted;
            }
            this.objCurrentVM = null;
            // this.oTrVwColl = null;
        }
    }

    custom_keyup(event) {
        // let txtValue = event.target.value;
        // this.psKeyup.next(txtValue);

        // this.txtSearch.Text = event.target.value;

        // fromEvent(event.currentTarget, 'keyup').pipe(
        //     debounceTime(500),
        //     distinctUntilChanged())
        //     .subscribe(() => {
        //         console.log("---Date----", new Date().getMinutes() + "-" + new Date().getSeconds() + "-" + new Date().getMilliseconds())
        //         this.DelayedTextbox_DelayTextChanged({}, event.target.value);
        //         // _lookAhead.unsubscribe();
        //     });
        // this.DelayedTextbox_DelayTextChanged({}, event.target.value);
    }

    DelayedTextbox_DelayTextChanged(Sender: any, Content: string): void {
        var rText: string = String.Empty;
        var sSearchText: string = this.txtSearch.Text;
        console.log(this.oResUtil, 'resutil')
        console.log(this.objSearch, 'objsearch')
        if (this.objSearch.CheckSpecialCharacter(sSearchText, (rT) => {
            rText = rT;
        })) {
            this.txtSearch.Text = rText;
        }
        if (sSearchText.trim().length > 0) {
            this.cmdClear.IsEnabled = true;
            this.tvwMedFavourites.Visibility = Visibility.Collapsed;
            this.tvwMedFromulary.Visibility = Visibility.Collapsed;
            this.ladSearch.Visibility = Visibility.Visible;
            this.lblQLinkName.Visibility = Visibility.Collapsed;
            this.cboQuickLinks.SelectedIndex = -1;
        }
        else {
            this.cmdClear.IsEnabled = false;
        }
        if (sSearchText.length > 2) {
            this.keypressed = false;
            var objDetails: DrugItemDetails = new DrugItemDetails();
            objDetails.SearchText = sSearchText;
            objDetails.MedCatVersion = AppSessionInfo.AMCV;
            if (this.oVM.IsCatalogue == 0) {
                objDetails.IsFormulary = 1;
            }
            else {
                objDetails.IsFormulary = 0;
            }
            if (this.ichkBoxSearchOrderSet.IsChecked == true) {
                objDetails.SearchCriteria = "ORDERSET";
                this.cmdSearchCat.Foreground = new SolidColorBrush(Colors.Black);
            }
            else {
                objDetails.SearchCriteria = "DRUG_NAME";
                this.cmdSearchCat.Foreground = new SolidColorBrush(Colors.Blue);
            }
            if (this.optBeginsWith.IsChecked == true) {
                objDetails.SearchType = "BEGINS_WITH";
                this.LoadLookAhead(objDetails);

            }
            else if (this.optAnyWord.IsChecked == true && (this.keycode == 13 || this.keycode == 0)) {
                objDetails.SearchType = "LEADING_WORD";
                this.LoadLookAhead(objDetails);
            }
            this.DisableEnableCntrl(true);
            this.cmdSearchCat.Tooltip = this.objResMedearch.cmdSearchCat_Text;
        }
        else {
            this.DisableEnableCntrl(false);
            this.cmdSearchCat.Foreground = new SolidColorBrush(Colors.Black);
            this.cmdSearchCat.Tooltip = '';
            this.ClearAll();
        }
        this.cdr.markForCheck();

    }
    public objCurrentVM_TeamBasedSearchDrugCatalogueCompleted(): void {
        if (this.cmdSearchCat != null && this.lblTeamName != null) {
            var oIPPMABaseVM: IPPMABaseVM = null;
            if (this.objCurrentVM != null) {
                oIPPMABaseVM = this.objCurrentVM;
            }
            else if (this.oVM != null) {
                oIPPMABaseVM = this.oVM;
            }
            if (oIPPMABaseVM != null) {
                if (!String.IsNullOrEmpty(oIPPMABaseVM.sTeamOIDs)) {
                    if (!String.IsNullOrEmpty(oIPPMABaseVM.sTeamNames)) {
                        this.lblTeamName.Visibility = Visibility.Visible;
                        this.lblTeamName.Text = "Team:" + oIPPMABaseVM.sTeamNames;
                        //lblTeamName.SetValue(ToolTipService.ToolTipProperty, oIPPMABaseVM.sTeamNames);
                        this.lblTeamName.Foreground = new SolidColorBrush(Colors.Red);
                    }
                }
                else {
                    this.lblTeamName.Visibility = Visibility.Collapsed;
                    this.lblTeamName.Text = String.Empty;
                }
            }
        }
    }

}
export class DrugItemDetails {
    public SearchText: string;
    public SearchType: string;
    public MedCatVersion: string;
    public IsFormulary: number;
    public SearchCriteria: string;
}

export class DelayedTextbox {
    public Delay: number;
    // constructor();
    // public  _dlgtDelayTextChanged DelayTextChanged;
    // public DelayTimer_Elapsed(state: Object): void;
    // public Dispose(): void;
    // public DoCleanup(): void;
    // public RaiseDelayTextChanged(): void;
    // protected OnKeyDown(e: KeyEventArgs): void;
    // public delegate void _dlgtDelayTextChanged(DelayedTextbox Sender, string Content);
}

class RegularExpressions {
    static Split(s1: string, s2: string): string[] {
        return s1.split(s2);
    }
}
