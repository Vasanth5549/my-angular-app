import { ObjectHelper } from 'epma-platform/helper';
import {
  AppDialogEventargs,
  AppDialogResult,
  ChildWindow,
  HtmlPage,
  IEnumerable,
  KeyEventArgs,
  List,
  ObservableCollection,
  Visibility,
  WindowButtonType,
  StringComparison,
  StringSplitOptions
} from 'epma-platform/models';
import {
  AppActivity,
  AppLoadService,
  BusyIndicator,
  Convert,
  iMessageBox,
  MessageBox,
  MessageBoxButton,
  MessageBoxResult,
  MessageBoxType,
  MessageEventArgs,
  ProfileFactoryType,
  StringBuilder,
  base
} from 'epma-platform/services';
import {
  CListItem,
  IProfileProp,
  TextWrapping,
} from 'src/app/shared/epma-platform/models/model';
import { ActivityTypes, ConflictIcons } from '../model/common';
import {
  CAActivity,
  InfusionTypesCode,
  PrescriptionItemStatusCodes,
  ValueDomain,
} from '../utilities/constants';
import { ProfileData, UserPermissions } from '../utilities/profiledata';
import { Resource } from '../resource';
import { CConstants, PrescriptionTypes } from '../utilities/constants';
import { CConstants as MedCommonBBConstants } from 'src/app/lorappmedicationcommonbb/utilities/constants';
import * as IPPMAManagePrescSer from '../../shared/epma-platform/soap-client/IPPMAManagePrescriptionWS';
import { PrescriptionItemVM } from '../viewmodel/PrescriptionItemVM';
import {
  AppContextInfo,
  AppSessionInfo,
  ClerkFormViewDeftBehaviour,
  ContextInfo,
  PatientContext,
} from 'src/app/lorappcommonbb/utilities/globalvariable';
import {
  CommonFlags,
  GlobalVariable,
  QueryStringInfo,
} from '../utilities/globalvariable';
import DateTime from 'epma-platform/DateTime';
import { Dictionary } from 'epma-platform/dictionary';
import {
  Binding,
  BindingMode,
  RoutedEventArgs,
} from 'src/app/shared/epma-platform/controls/FrameworkElement';
import { InfusionTypeCode } from 'src/app/lorappmedicationcommonbb/utilities/constants';
import { Common } from '../utilities/common';
import {
  Border,
  ContentPresenter,
  iButton,
  iCheckBox,
  iLabel,
  iTab,
  iTabItem,
  Image,
  CheckBox,
  Thickness,
  DataTemplate,
} from 'epma-platform/controls';
import { AppActivityBB } from 'src/app/lorappcommonbb/appactivitybb';
import { MedicationPrescribeVM } from '../ca/prescribe/medicationprescribevm';
import {
  GrdDiscontinueCancelCols,
  RequestandResultVM,
  ResultInputData,
} from 'src/app/lorappmedicationcommonbb/viewmodel/discontinuecancelvm';
import { MedTabs } from './medtabs';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
  ChangeDetectionStrategy
} from '@angular/core';
import {
  CellComponent,
  ColumnComponent,
  GridComponent,
  PageChangeEvent,
  RowArgs,
  RowClassArgs,
  SelectionEvent,
} from '@progress/kendo-angular-grid';
import { MedicationCommonProfileData } from 'src/app/lorappmedicationcommonbb/utilities/profiledata';
import { PrescriptionLineItemVM } from 'src/app/lorappmedicationcommonbb/utilities/lineitemconstructor';
import {
  CommonSequentialHelper,
  eCommonSequenceNoReassignType,
} from '../utilities/CommonSequentialHelper';
import { InfusionVM, SequenceDetail } from '../viewmodel/BasicDetailsVM';
import {
  CSequentialHelper,
  eSequenceNoReassignType,
} from '../utilities/CSequentialHelper';

import {
  Color,
  Colors,
  EventArgs,
  SolidColorBrush,
} from 'src/app/shared/epma-platform/controls/Control';

import { CommonBB } from 'src/app/lorappcommonbb/utilities/common';
import { MedicationCommonBB } from 'src/app/lorappmedicationcommonbb/utilities/medicationcommonbb';
import { MedChartData } from 'src/app/lorappmedicationcommonbb/utilities/globalvariable';
import { Busyindicator } from 'src/app/lorappcommonbb/busyindicator';
import { AMSHelper } from 'src/app/lorappcommonbb/amshelper';
import { PrescriptionHelper } from '../utilities/prescriptionhelper';
import { MonoGraphVM } from 'src/app/lorappmedicationcommonbb/viewmodel/MonographVM';
import { PrescribingConfigData, PrintConfigurationData } from 'src/app/lorappslprofiletypes/medication';
import { GPConnectItemVM } from '../viewmodel/GPConnectItemVM';
import { Environment } from '../../product/shared/models/Common';
import { RadSelectionChangedEventArgs } from 'src/app/shared/epma-platform/models/appdialog.type';
import {
  CResMsgGetPatientMedicationCount,
  GetPatientMedicationCountCompletedEventArgs,
} from 'src/app/shared/epma-platform/soap-client/ManagePrescriptionWS';
import {
  GridExtension,
  GridViewCell,
  GridViewColumn,
  GridViewRow,
  RowLoadedEventArgs,
  SelectionChangeEventArgs,
} from 'src/app/shared/epma-platform/controls/epma-grid-helpers/grid-extension';
import { ApplicationHelper } from 'src/app/shared/epma-platform/services/applicationhelper.service';
import { GridLayoutDirective } from 'src/app/shared/epma-platform/controls/Directives/common.directive';
import { medQuickselect } from './medquickselect';
import { IPPMABaseVM } from '../viewmodel/ippmabasevm';
import { MedicationPrescriptionCA } from '../ca/prescribe/medicationprescriptionview';
import { MultiSelectListVM } from '../viewmodel/MultiSelectListVM';
import { MultiSelectListView } from './MultiSelectListView';
import { RePresConfirmMezzanine } from '../view/RePresConfirmMezzanine';
import { meddiscontinuecancelChild } from 'src/app/lorappmedicationcommonbb/child/meddiscontinuecancelchild';

import { medreprint } from './medreprint';
import { DisplayOtherInformationLineItemPipe1, DisplayPrescriptionLineItemPipe1, InfoIconPipe } from 'src/app/product/shared/pipes/medicationconverters.pipe';
import { HelperService } from 'epma-platform/soapclient';
var that;
@Component({
  selector: 'medprescribedrugs',
  templateUrl: './medprescribedrugs.html',
  styleUrls: ['./medprescribedrugs.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
  

})
export class medprescribedrugs
  extends AppActivityBB
  implements OnInit, AfterViewInit
{
  override _DataContext: MedicationPrescribeVM;
  objmedreprintView: medreprint;
  override get DataContext() {
    return this._DataContext;
  }
  @Input() override set DataContext(value: MedicationPrescribeVM) {
    this._DataContext = value;
  }
  public presdrugs = Resource.prescribedrugs;
  public resKey = Resource.MedicationForm;
  public Infusion = Resource.Infusion;
  public PrescriptionItem_Header = this.presdrugs.PrescriptionItem_Header;
  public StartDTTM_Header = this.presdrugs.StartDTTM_Header;
  public grdResolve: GridExtension = new GridExtension();
  get isChildWizard(){
    return AppLoadService.isChildWizard;
  }
  oVM: MedicationPrescribeVM;
  oItemVM: PrescriptionItemVM;
  bIsLoaded: boolean;
  isLoaded: boolean = false;
  IsAllSelItemsHold: boolean = false;
  IsAllSelItemsUnHold: boolean = false;
  bIsAmedItemUnHold: boolean = false;
  public bIsInfDiscontinue: boolean = false;
  public bIsOrdDiscontinue: boolean = false;
  public bChkIPFromClerk: boolean = false;
  nTotalDrugsUnHolded: number = 0;
  discanc: meddiscontinuecancelChild;
  private oAppDialogWindow: ChildWindow;
  // omeddrugholdChild: meddrugholdChild; //Not Required for LHS. To be Re-Visited.
  // objResults: medrecentresultschild; //Not Required for LHS. To be Re-Visited.
  // objmedaddtofavouritesChild: medaddtofavouritesChild; //Not Required for LHS. To be Re-Visited.
   private oMultiSelectListView:  MultiSelectListView; //Not Required for LHS. To be Re-Visited.
  public lstShowItems: List<string> = new List<string>();
  lastCancelDiscontinueOID: number;
  profile: ProfileFactoryType;
  oResultVM: RequestandResultVM;
  PItem: PrescriptionItemVM;
  oSelectedHoldItem: IEnumerable<PrescriptionItemVM>;
  oSelectedReprscItem: IEnumerable<PrescriptionItemVM>;
  objPresItmCollection: ObservableCollection<PrescriptionItemVM>;
  bUnHoldInfusion: boolean = false;
   oRePresConfirm: RePresConfirmMezzanine; //Not Required for LHS. To be Re-Visited.
  ISAllow: boolean = false;
  OSelectedAllowedToDiscontinue: ObservableCollection<Object> = null;
  listDrugNames: StringBuilder = null;
  private medPresDrug: AppActivityBB;
  @ViewChild(GridLayoutDirective) LayoutRoot;
  @ViewChild('grdResolveTempRef', { read: GridComponent }) set _gridTest(
    comp: GridComponent
  ) {
    if (comp) {
      // this.grdResolve.ItemsSourceData = comp.data;
      this.grdResolve.grid = comp;
      this.grdResolve.columns = comp.columns;
    }
  }
  @ViewChild('medPresDrugTempRef', { read: AppActivityBB, static: false })
  set _medPresDrug(c: AppActivityBB) {
    if (c) {
      this.medPresDrug = c;
    }
  }
  private iTab1: iTab;
  @ViewChild('iTab1TempRef', { read: iTab, static: false }) set _iTab1(
    c: iTab
  ) {
    if (c) {
      this.iTab1 = c;
    }
  }
  private chaupdte: iCheckBox;
  @ViewChild('chaupdteTempRef', { read: iCheckBox, static: false })
  set _chaupdte(c: iCheckBox) {
    if (c) {
      this.chaupdte = c;
    }
  }
  private lblDisplayText: iLabel;
  @ViewChild('lblDisplayTextTempRef', { read: iLabel, static: false })
  set _lblDisplayText(c: iLabel) {
    if (c) {
      this.lblDisplayText = c;
    }
  }
  private lblDisplayValue: iLabel;
  @ViewChild('lblDisplayValueTempRef', { read: iLabel, static: false })
  set _lblDisplayValue(c: iLabel) {
    if (c) {
      this.lblDisplayValue = c;
    }
  }
  private cmdMedClkSrc: iButton;
  @ViewChild('cmdMedClkSrcTempRef', { read: iButton, static: false })
  set _cmdMedClkSrc(c: iButton) {
    if (c) {
      this.cmdMedClkSrc = c;
    }
  }

  public cmdPrint: iButton;
  @ViewChild('cmdPrintTempRef', { read: iButton, static: false })
  set _cmdPrint(c: iButton) {
    if (c) {
      this.cmdPrint = c;
    }
  }

  lblMedClkSrc: iLabel;
  @ViewChild('lblMedClkSrcTempRef', { read: iLabel, static: false })
  set _lblMedClkSrc(c: iLabel) {
    if (c) {
      this.lblMedClkSrc = c;
    }
  }
  private lblEncounter: iLabel;
  @ViewChild('lblEncounterTempRef', { read: iLabel, static: false })
  set _lblEncounter(c: iLabel) {
    if (c) {
      this.lblEncounter = c;
    }
  }
  private iChkCompletedByPrescriber: iCheckBox;
  @ViewChild('iChkCompletedByPrescriberTempRef', {
    read: iCheckBox,
    static: false,
  })
  set _iChkCompletedByPrescriber(c: iCheckBox) {
    if (c) {
      this.iChkCompletedByPrescriber = c;
    }
  }
  private iCheckBox1: iCheckBox;
  @ViewChild('iCheckBox1TempRef', { read: iCheckBox, static: false })
  set _iCheckBox1(c: iCheckBox) {
    if (c) {
      this.iCheckBox1 = c;
    }
  }
  private iCheckBox2: iCheckBox;
  @ViewChild('iCheckBox2TempRef', { read: iCheckBox, static: false })
  set _iCheckBox2(c: iCheckBox) {
    if (c) {
      this.iCheckBox2 = c;
    }
  }
  private ChkIPFromClerk: iCheckBox;
  @ViewChild('ChkIPFromClerkTempRef', { read: iCheckBox, static: false })
  set _ChkIPFromClerk(c: iCheckBox) {
    if (c) {
      this.ChkIPFromClerk = c;
    }
  }
  private lblDisComp: iLabel;
  @ViewChild('lblDisCompTempRef', { read: iLabel, static: false })
  set _lblDisComp(c: iLabel) {
    if (c) {
      this.lblDisComp = c;
    }
  }
  private iTab2: iTab;
  @ViewChild('iTab2TempRef', { read: iTab, static: false }) set _iTab2(
    c: iTab
  ) {
    if (c) {
      this.iTab2 = c;
    }
  }
  private tbResolve: iTabItem;
  @ViewChild('tbResolveTempRef', { read: iTabItem, static: false })
  set _tbResolve(c: iTabItem) {
    if (c) {
      this.tbResolve = c;
    }
  }
  public cmdOtherLinks: iButton;
  @ViewChild('cmdOtherLinksTempRef', { read: iButton, static: false })
  set _cmdOtherLinks(c: iButton) {
    if (c) {
      this.cmdOtherLinks = c;
    }
  }
  public cmdLinks: iButton;
  @ViewChild('cmdLinksTempRef', { read: iButton, static: false }) set _cmdLinks(
    c: iButton
  ) {
    if (c) {
      this.cmdLinks = c;
    }
  }
  private cmdObservationResults: iButton;
  @ViewChild('cmdObservationResultsTempRef', { read: iButton, static: false })
  set _cmdObservationResults(c: iButton) {
    if (c) {
      this.cmdObservationResults = c;
    }
  }
  public cmdReconcile: iButton;
  @ViewChild('cmdReconcileTempRef', { read: iButton, static: false })
  set _cmdReconcile(c: iButton) {
    if (c) {
      this.cmdReconcile = c;
    }
  }
  private cmdSummary: iButton;
  @ViewChild('cmdSummaryTempRef', { read: iButton, static: false })
  set _cmdSummary(c: iButton) {
    if (c) {
      this.cmdSummary = c;
    }
  }
  // private cmdAddFavourites: iButton;
  // @ViewChild('cmdAddFavouritesTempRef', { read: iButton, static: false })
  // set _cmdAddFavourites(c: iButton) {
  //   if (c) {
  //     this.cmdAddFavourites = c;
  //   }
  // }
  private cmdDiscontinueCancel: iButton;
  @ViewChild('cmdDiscontinueCancelTempRef', { read: iButton, static: false })
  set _cmdDiscontinueCancel(c: iButton) {
    if (c) {
      this.cmdDiscontinueCancel = c;
    }
  }
  private cmdRemove: iButton;
  @ViewChild('cmdRemoveTempRef', { read: iButton, static: false })
  set _cmdRemove(c: iButton) {
    if (c) {
      this.cmdRemove = c;
    }
  }
  private cmdMedAdmin: iButton;
  @ViewChild('cmdMedAdminTempRef', { read: iButton, static: false })
  set _cmdMedAdmin(c: iButton) {
    if (c) {
      this.cmdMedAdmin = c;
    }
  }
  private cmdReprescribe: iButton;
  @ViewChild('cmdReprescribeTempRef', { read: iButton, static: false })
  set _cmdReprescribe(c: iButton) {
    if (c) {
      this.cmdReprescribe = c;
    }
  }
  private ChkTmpSave: iCheckBox;
  @ViewChild('ChkTmpSaveTempRef', { read: iCheckBox, static: false })
  set _ChkTmpSave(c: iCheckBox) {
    if (c) {
      this.ChkTmpSave = c;
    }
  }
  private SelectCheckbox: QueryList<iCheckBox>;
  @ViewChildren('SelectCheckboxTempRef', { read: iCheckBox })
  set _SelectCheckbox(c: QueryList<iCheckBox>) {
    if (c) {
      this.grdResolve.RowCheckBoxCollection = c;
      this.SelectCheckbox = c;
    }
  }
  //@ViewChild('grdResolve') grdResolve: GridComponent;
  dataTemplates: QueryList<DataTemplate>;
  @ViewChildren('temp', { read: DataTemplate })
  set _dataTemplates(v: QueryList<DataTemplate>) {
    if (v) {
      this.dataTemplates = v;
      this.grdResolve.dataTemplates = v;
    }
  }
  constructor(private changeDetectionRef?: ChangeDetectorRef) {
    super();
    that = this;
    // this.iTab1.AddTabItem(
    //   'RecordedMedications',
    //   'Recorded medication',
    //   new MedTabs(),
    //   true,
    //   'Recorded medication'
    // );
    // this.iTab1.AddTabItem(
    //   'Search',
    //   'Search',
    //   new medQuickselect(),
    //   false,
    //   'Search'
    // );
    // let oBinding: Binding = new Binding('EnableFauxTabs');
    // oBinding.Mode = BindingMode.OneWay;
    // this.iTab1
    //   .GetItem('RecordedMedications')
    //   .SetBinding(iTabItem.IsEnabledProperty, oBinding);
    // this.iTab1
    //   .GetItem('Search')
    //   .SetBinding(iTabItem.IsEnabledProperty, oBinding);
    //Theme manager. revisit required
    // iThemeManager.SetApplicationTheme(
    //   '/LorArcBlueBirdTheme;component/Themes/Generic.xaml'
    // );
    // this.bIsLoaded = false;
    // this.cmdReconcile.IsEnabled = false;

    /** Revisit Required */
    //this.temp_assigningDataContext();
  }
  public maxGridHeight;
  public maxLayoutHeight;
  public medpresdrug;
  isEPRview:boolean;

  ngOnInit(): void {
    let viewcheck : any = base.WizardContext;
    
        if(viewcheck?.IconClick != undefined){
        

            this.isEPRview=true;
        }
        else{
          this.isEPRview=false;
          console.log("base +", this.isEPRview);
        } 
        console.log("base +", viewcheck);
    this.grdResolve.IsRowClickCheckboxSelection = true;
    this.grdResolve.onCellClick = (s, e) => { this.grdResolve_onCellClick(s, e); };
    this.oVM = this.DataContext;
    if(this.cmdReconcile)
    this.cmdReconcile.IsEnabled = false;
    if(window.screen.height < 1000 && window.devicePixelRatio != 1.25){
      if (
        UserPermissions.CanEnableMedChart &&
        (String.IsNullOrEmpty(QueryStringInfo.IsLaunchformchart) ||
          (!String.IsNullOrEmpty(QueryStringInfo.IsLaunchformchart) &&
            !Convert.ToBoolean(QueryStringInfo.IsLaunchformchart)) ||
          (!String.IsNullOrEmpty(QueryStringInfo.IsLaunchformchart) &&
            Convert.ToBoolean(QueryStringInfo.IsLaunchformchart) &&
            !String.IsNullOrEmpty(QueryStringInfo.IsLaunchformPreschart) &&
            Convert.ToBoolean(QueryStringInfo.IsLaunchformPreschart))) &&
        (String.IsNullOrEmpty(QueryStringInfo.IsLaunchformInfchart) ||
          (!String.IsNullOrEmpty(QueryStringInfo.IsLaunchformInfchart) &&
            !Convert.ToBoolean(QueryStringInfo.IsLaunchformInfchart)) ||
          (!String.IsNullOrEmpty(QueryStringInfo.IsLaunchformInfchart) &&
            Convert.ToBoolean(QueryStringInfo.IsLaunchformInfchart) &&
            !String.IsNullOrEmpty(QueryStringInfo.IsLaunchformPreschart) &&
            Convert.ToBoolean(QueryStringInfo.IsLaunchformPreschart)))
      ){
        // alert("true");
        this.maxLayoutHeight = window.innerHeight;
      // this.maxGridHeight = this.maxLayoutHeight - 250;
      }
      else{
        // alert("false");
        this.maxLayoutHeight = 450;
      }
    }
    else if(window.screen.height > 800 && window.screen.height < 1000 && window.devicePixelRatio == 1.25 ){
      this.maxLayoutHeight = window.innerHeight - 5;
      this.maxGridHeight = this.maxLayoutHeight - 224;
      
    }
    else{
      this.maxLayoutHeight = 720;
      // this.maxGridHeight = 576;

    }
  }
  ngAfterViewInit(): void {
    this.grdResolve.GenerateColumns();
    this.cmdReprescribe.IsEnabled = false;
    this.grdResolve.changeDetectionRef = this.changeDetectionRef;
    this.UserControl_Loaded(null, null);
    this.bIsLoaded = false;

    
    this.iTab1.AddTabItem(
      'RecordedMedications',
      'Recorded medication',
      new MedTabs(),
      true,
      'Recorded medication'
    );
    this.iTab1.AddTabItem(
      'Search',
      'Search',
      new medQuickselect(this.changeDetectionRef),
      false,
      'Search'
    );
    let oBinding: Binding = new Binding('EnableFauxTabs');
    oBinding.Mode = BindingMode.OneWay;
    this.iTab1
      .GetItem('RecordedMedications')
      .SetBinding(iTabItem.IsEnabledProperty, oBinding);
    this.iTab1
      .GetItem('Search')
      .SetBinding(iTabItem.IsEnabledProperty, oBinding);
    //this.grdResolve.ItemsSource = this.oVM.MedsResolve;
    this.oVM.MedsResolvedLoaded = (count) => {
      this.grdResolve.initialRows = count;
      if (count != 0)
      {
      BusyIndicator.SetStatusBusy("MedPrescribeDrugsRHS");
      }
    };
    this.grdResolve.isRebinding = true;
    this.grdResolve.SetBinding('data', this.oVM.MedsResolve);
    this.SetEnablePrint();
    // if (this.grdResolve.GetRowCount() != 0)
    // {
    // BusyIndicator.SetStatusBusy("MedPrescribeDrugsRHS");
    // }
    this.oVM.ChangeDetection.subscribe(()=>{
      this.changeDetectionRef.markForCheck();
    })
    this.oVM.ActionOn221_ResolveGrid.subscribe(()=>{
      this.SelectRowByIndexOn221Response() ;
    });
  }
  public DisableLHSTabs(): void {
    this.oVM.EnableFauxTabs = false;
    let Rec: MedTabs = ObjectHelper.CreateType<MedTabs>(
      this.iTab1.GetItem('RecordedMedications').Content,
      MedTabs
    );
    if (Rec != null) Rec.IsEnabled = false;
    let Rec1: medQuickselect = ObjectHelper.CreateType<medQuickselect>(
      this.iTab1.GetItem('Search').Content,
      medQuickselect
    );
    if (Rec1 != null) Rec1.IsEnabled = false;
    this.UserControl_Loaded({}, null);
  }
  public EnableLHSTabs(): void {
    this.oVM.EnableFauxTabs = true;
    let Rec: MedTabs = ObjectHelper.CreateType<MedTabs>(
      this.iTab1.GetItem('RecordedMedications').Content,
      MedTabs
    );
    if (Rec != null) Rec.IsEnabled = true;
    let Rec1: medQuickselect = ObjectHelper.CreateType<medQuickselect>(
      this.iTab1.GetItem('Search').Content,
      medQuickselect
    );
    if (Rec1 != null) Rec1.IsEnabled = true;
    this.oVM.blMaxMsgFlag = false;
  }
  SetGridConfig(): void {
    if (ProfileData.ResolveGridConfig == null) return;
    ProfileData.ResolveGridConfig.Columns.forEach((oColumn) => {
      let sColName: string = oColumn.Name;
      if (sColName == 'StartDateIco') {
        sColName = 'StartDTTMVWR';
      }
      let oGridColumn: GridViewColumn = this.grdResolve.Columns[sColName];
      if (oGridColumn instanceof GridViewColumn) {
        oGridColumn.DisplayIndex = oColumn.DisplayOrder + 2;
        oGridColumn.Width = oColumn.Width;
        oGridColumn.IsVisible = typeof oColumn.Visible == "string" ? (
          oColumn.Visible == "true"? true : false
        ): oColumn.Visible;
        oGridColumn.IsResizable = oColumn.CanResize;
        // to be revisited
        // oGridColumn.TextWrapping = oColumn.CellWrap ? TextWrapping.Wrap : TextWrapping.NoWrap;
        if (
          String.Compare(
            sColName,
            'StartDTTMVWR',
            StringComparison.OrdinalIgnoreCase
          ) == 0
        ) {
          if (
            String.Compare(
              PatientContext.PrescriptionType,
              PrescriptionTypes.Clerking,
              StringComparison.OrdinalIgnoreCase
            ) == 0 ||
            PatientContext.ClerkFormViewDefaultBehavior ==
              ClerkFormViewDeftBehaviour.LaunchFormMandatory
          ) {
            // oGridColumn.Header = "DateTime.commenced";
            oGridColumn.Header = this.StartDTTM_Header = 'Date commenced';
          }
        } else if (
          String.Compare(
            sColName,
            'PrescriptionItem',
            StringComparison.OrdinalIgnoreCase
          ) == 0
        ) {
          if (
            String.Compare(
              PatientContext.PrescriptionType,
              PrescriptionTypes.Clerking,
              StringComparison.OrdinalIgnoreCase
            ) == 0 ||
            PatientContext.ClerkFormViewDefaultBehavior ==
              ClerkFormViewDeftBehaviour.LaunchFormMandatory
          ) {
            // oGridColumn.Header = "Clerked item";
            oGridColumn.Header = this.PrescriptionItem_Header = 'Clerked item';
          }
        } else if (
          String.Compare(
            sColName,
            'OtherInformation',
            StringComparison.OrdinalIgnoreCase
          ) == 0
        ) {
        }
      }
    });
    this.grdResolve.UpdateColumns();
  }
  SetEnableAddFavourites(): void {
    if (MedicationCommonProfileData.PrescribeConfig == null) {
      let profile: ProfileFactoryType = new ProfileFactoryType();
      profile.OnProfileLoaded = (s, e) => {
        this.PrescribeConfig_OnProfileLoaded(s, e);
      };
      profile.GetProfile<PrescribingConfigData>('VW_MEDICONFIG', 'PRESCONFIG');
    } else {
      this.SetPrescribeConfigData();
    }
  }
  SetEnablePrint(): void {
    this.cmdPrint.IsEnabled = false;
    if (MedicationCommonProfileData.PrintConfig == null) {
      let profile: ProfileFactoryType = new ProfileFactoryType();
      profile.OnProfileLoaded = (s, e) => {
        this.PrescribeConfigprint_OnProfileLoaded(s, e);
      };
      profile.GetProfile<PrintConfigurationData>('VW_MEDICONFIG', 'PRINTCFG');
    }
  }

  PrescribeConfigprint_OnProfileLoaded(sender: Object, Result: IProfileProp): void {
    if (Result != null) {
      if (Result.Profile instanceof PrintConfigurationData) {
        ProfileData.PrintConfig = ObjectHelper.CreateType<PrintConfigurationData>(
          Result.Profile,
          PrintConfigurationData
        );
        let ActivityName: string = this.GetActivityName(this.DataContext.CACode);
        if (ProfileData.PrintConfig != null) {
          for (
            let i: number = 0;
            i < ProfileData.PrintConfig.ActivityConfigData.Count;
            i++
          ) {
            if (
              String.Compare(
                ProfileData.PrintConfig.ActivityConfigData[i]
                  .PrescriptiontypeValue,
                ActivityName
              ) == 0 &&
              String.Compare(
                ProfileData.PrintConfig.ActivityConfigData[i]
                  .ActivityToPrintAfter,
                "Submit"
              ) == 0) {
              this.cmdPrint.IsEnabled = true;
            }
          }
        }
      }
    }
  }
  private initialWidth = 915; // grid's width

 

  private totalWidth = 115; // is width of non-resizeable column from html

  public enableScrollBar: boolean = false;

  public columnResize(event) {

    this.grdResolve.columns.forEach((item) => {

      if (item.field == "ConflictIcon" || item.field == "PrescriptionItem" || item.field == "Otherinformation") {

        this.totalWidth += item.width;

      }

    });

    this.enableScrollBar = this.totalWidth > this.initialWidth ? true : false;

  }

 

  private GetActivityName(CACode: string): string {
    switch (CACode) {
      case 'MN_MEDDISCHARGE_P2':
      case 'MN_MEDDISCHRGESL_P2':
        return "CC_DSCHRG";
      case 'MN_MEDCLR':
      case 'MN_MEDCLERKSL_P2':
        return "CC_MEDCLERK1";
      case 'MN_MEDLEAVE_P2':
      case 'MN_MEDLEAVESL_P2':
        return "CC_Patientleave";
      case 'MN_MEDINPAT':
      case 'MN_MEDINPATSL_P2':
      case'MN_MEDADMINISTRAT_P2':
        return "CC_FOR_ADMIN";
      case 'MN_MEDOUTPAT_P2':
      case 'MN_MEDOUTPATSL_P2':
        return 'CC_MED_TYP_OP';
    }
    return '';
  }

  private grdResolve_DataLoaded(sender: Object, e: EventArgs): void { }
  PrescribeConfig_OnProfileLoaded(sender: Object, Result: IProfileProp): void {
    if (Result != null) {
      if (Result.Profile instanceof PrescribingConfigData) {
        MedicationCommonProfileData.PrescribeConfig =
          ObjectHelper.CreateType<PrescribingConfigData>(
            Result.Profile,
            PrescribingConfigData
          );
        if (MedicationCommonProfileData.PrescribeConfig != null)
          this.SetPrescribeConfigData();
      }
    }
  }
  SetPrescribeConfigData(): void {
    // if (
    //   !UserPermissions.PrescribeWithRestriction &&
    //   MedicationCommonProfileData.PrescribeConfig.AllowUserFavorites
    // ) {
    //   this.cmdAddFavourites.IsEnabled = true;
    // }
  }

  item: any;
  isSelectionChangeAlreadyTriggered: boolean = false;
  grdResolve_SelectionChanged(
    sender: Object,
    e: SelectionChangeEventArgs
  ): void {
    this.SetSelectDeSelectItems(e);
    let nDiscCnt: number = 0;
    let nnewCnt: number = 0;
    let noldcnt: number = 0;
    let nholdcnt: number = 0;
    let nunholdcnt: number = 0;
    let IsHoldUnhold: boolean = false;
    let IsDisCCancel: boolean = true;
    this.IsAllSelItemsHold = false;
    this.IsAllSelItemsUnHold = false;
    this.cmdObservationResults.IsEnabled = false;
    let nauthcount: number = 0;
    if (this.grdResolve.GetSelectedRowCount() == 0) {
      this.cmdDiscontinueCancel.IsEnabled = false;
      this.cmdDiscontinueCancel.Visibility = Visibility.Collapsed;
      this.DisableLinks();
      this.cmdReprescribe.IsEnabled = false;
      this.oVM.SelectedPrescribeItem = null;
    } else if (this.grdResolve.GetSelectedRowCount() == 1) {
      this.oItemVM = ObjectHelper.CreateType<PrescriptionItemVM>(
        this.grdResolve.SelectedItem,
        PrescriptionItemVM
      );
      if (this.oItemVM != null && this.oItemVM.IsGroupHeader) {
        this.cmdRemove.IsEnabled = false;
        this.cmdRemove.Visibility = Visibility.Collapsed;
        this.DisableLinks();
        this.cmdDiscontinueCancel.IsEnabled = false;
        this.cmdReprescribe.IsEnabled = false;
        return;
      }
      this.cmdObservationResults.IsEnabled = true;
      this.oVM.SelectedPrescribeItem = this.oItemVM;
      if (this.oItemVM != null) {
        let IsNewItem: boolean = false;
        if (
          this.oItemVM.PrescriptionItemOID == 0 ||
          (!String.IsNullOrEmpty(this.oItemVM.OperationMode) &&
            String.Compare(
              this.oItemVM.OperationMode,
              'N',
              StringComparison.CurrentCultureIgnoreCase
            ) == 0)
        ) {
          IsNewItem = true;
        }
        if (
          !String.IsNullOrEmpty(this.oItemVM.PrescriptionItemStatus) &&
          (String.Compare(
            this.oItemVM.PrescriptionItemStatus,
            CConstants.DISCONTINUED,
            StringComparison.OrdinalIgnoreCase
          ) == 0 ||
            String.Compare(
              this.oItemVM.PrescriptionItemStatus,
              CConstants.CANCELLED,
              StringComparison.OrdinalIgnoreCase
            ) == 0 ||
            this.oItemVM.ActionCode == ActivityTypes.Amend)
        ) {
          if (
            String.Compare(
              this.oItemVM.ActionCode.ToString(),
              ActivityTypes.Amend.ToString(),
              StringComparison.OrdinalIgnoreCase
            ) == 0 &&
            this.oItemVM.IsHold
          ) {
            this.bIsAmedItemUnHold = true;
          }
          if (
            String.Equals(
              this.oItemVM.OperationMode,
              'UA',
              StringComparison.OrdinalIgnoreCase
            ) ||
            String.Equals(
              this.oItemVM.OperationMode,
              'U',
              StringComparison.OrdinalIgnoreCase
            ) ||
            String.Equals(
              this.oItemVM.OperationMode,
              'CU',
              StringComparison.OrdinalIgnoreCase
            )
          ) {
            this.cmdDiscontinueCancel.IsEnabled = true;
            this.cmdDiscontinueCancel.Visibility = Visibility.Visible;
          } else {
            this.cmdDiscontinueCancel.IsEnabled = false;
            this.cmdDiscontinueCancel.Visibility = Visibility.Collapsed;
          }
          this.DisableLinks();
        } else {
          this.cmdLinks.IsEnabled = true;
          this.SetEnableAddFavourites();
          if (
            !String.IsNullOrEmpty(
              MedicationCommonProfileData.MedViewConfig.OtherLinks
            )
          ) {
            this.cmdOtherLinks.IsEnabled = true;
          }
          if (
            this.oItemVM.PrescriptionItemOID == 0 ||
            (!String.IsNullOrEmpty(this.oItemVM.OperationMode) &&
              String.Compare(
                this.oItemVM.OperationMode,
                'N',
                StringComparison.CurrentCultureIgnoreCase
              ) == 0) ||
            String.Compare(
              this.oItemVM.PrescriptionItemStatus,
              CConstants.ONHOLD,
              StringComparison.OrdinalIgnoreCase
            ) == 0
          ) {
            this.cmdDiscontinueCancel.IsEnabled = false;
            this.cmdDiscontinueCancel.Visibility = Visibility.Collapsed;
          } else {
            if (
              !UserPermissions.PrescribeWithRestriction &&
              String.Compare(
                this.oItemVM.PrescriptionItemStatus,
                'MEDStatus14',
                StringComparison.OrdinalIgnoreCase
              ) != 0
            ) {
              this.cmdDiscontinueCancel.IsEnabled = true;
              if (!this.oItemVM.IsGroupHeader) {
                IsDisCCancel = this.PermissionCheckDiscCancel(
                  this.oItemVM.PrescriberDetails.OID
                );
              }
              this.cmdDiscontinueCancel.IsEnabled = IsDisCCancel;
              if (IsDisCCancel)
                this.cmdDiscontinueCancel.Visibility = Visibility.Visible;
              else this.cmdDiscontinueCancel.Visibility = Visibility.Collapsed;
            }
          }
          if (
            String.Compare(
              this.oItemVM.PrescriptionItemStatus,
              CConstants.ONHOLD,
              StringComparison.OrdinalIgnoreCase
            ) == 0 &&
            this.oItemVM.PrescriptionItemOID > 0
          ) {
            this.cmdDiscontinueCancel.IsEnabled = true;
            this.cmdDiscontinueCancel.Visibility = Visibility.Visible;
          }
          if (
            String.Compare(
              this.oItemVM.PrescriptionItemStatus,
              CConstants.AWAITINGAUTHORISE,
              StringComparison.OrdinalIgnoreCase
            ) == 0 &&
            this.oItemVM.PrescriberDetails != null &&
            AppContextInfo.UserOID !=
              Convert.ToString(this.oItemVM.PrescriberDetails.OID)
          ) {
            this.cmdDiscontinueCancel.IsEnabled = false;
          }
          if (
            this.oItemVM.ReasonForHold == null &&
            !this.oItemVM.IsHold &&
            this.oItemVM.PrescriptionOID == 0
          ) {
            if (!IsHoldUnhold) {
              this.IsAllSelItemsHold = true;
              this.IsAllSelItemsUnHold = false;
            }
          } else if (this.IsAllSelItemsHold) {
            this.IsAllSelItemsUnHold = false;
          } else if (
            this.oItemVM.IsHold &&
            String.Compare(
              this.oItemVM.PrescriptionItemStatus,
              CConstants.ONHOLD,
              StringComparison.OrdinalIgnoreCase
            ) == 0
          ) {
            if (!IsHoldUnhold) {
              this.IsAllSelItemsUnHold = true;
              this.IsAllSelItemsHold = false;
            }
          } else if (
            String.Compare(
              this.oItemVM.ActionCode.ToString(),
              CAActivity.CA_UNHOLD,
              StringComparison.InvariantCultureIgnoreCase
            ) == 0 ||
            this.oItemVM.IsUnholddrug
          ) {
            this.IsAllSelItemsHold = true;
            this.cmdDiscontinueCancel.IsEnabled = false;
            this.cmdDiscontinueCancel.Visibility = Visibility.Collapsed;
          } else if (
            String.IsNullOrEmpty(this.oItemVM.PrescriptionItemStatus) &&
            String.Compare(
              this.oItemVM.PrescriptionItemStatus,
              CConstants.ONHOLD,
              StringComparison.OrdinalIgnoreCase
            ) != 0
          ) {
            this.IsAllSelItemsHold = true;
          } else {
            this.IsAllSelItemsHold = false;
            this.IsAllSelItemsUnHold = false;
          }
          if (this.IsAllSelItemsHold && !this.IsAllSelItemsUnHold) {
            this.cmdRemove.IsEnabled = true;
            this.cmdRemove.Visibility = Visibility.Visible;
          } else if (this.IsAllSelItemsUnHold && IsNewItem) {
            this.cmdRemove.IsEnabled = true;
            this.cmdRemove.Visibility = Visibility.Visible;
          } else if (this.IsAllSelItemsUnHold && !IsNewItem) {
            this.cmdRemove.IsEnabled = false;
            this.cmdRemove.Visibility = Visibility.Collapsed;
          } else if (IsHoldUnhold) {
            this.cmdRemove.IsEnabled = false;
            this.cmdRemove.Visibility = Visibility.Collapsed;
          }
        }
      }
    } else {
      this.SetEnableAddFavourites();
      if (
        !String.IsNullOrEmpty(
          MedicationCommonProfileData.MedViewConfig.OtherLinks
        )
      ) {
        this.cmdOtherLinks.IsEnabled = true;
      } else this.cmdOtherLinks.IsEnabled = false;
      this.cmdLinks.IsEnabled = false;
      let nHeadercount: number = 0;
      let IsAllNewItem: boolean = false;
      let IsAlloldItem: boolean = false;
      let _nNumberOfCompletedItems: number = 0;
      this.grdResolve.SelectedItems.forEach((objItemVM) => {
        let oItemVM: PrescriptionItemVM =
          ObjectHelper.CreateType<PrescriptionItemVM>(
            objItemVM,
            PrescriptionItemVM
          );
        if (oItemVM instanceof PrescriptionItemVM) {
          if (
            !String.IsNullOrEmpty(oItemVM.PrescriptionItemStatus) &&
            (String.Compare(
              oItemVM.PrescriptionItemStatus,
              CConstants.DISCONTINUED,
              StringComparison.OrdinalIgnoreCase
            ) == 0 ||
              String.Compare(
                oItemVM.PrescriptionItemStatus,
                CConstants.CANCELLED,
                StringComparison.OrdinalIgnoreCase
              ) == 0 ||
              oItemVM.ActionCode == ActivityTypes.Amend)
          ) {
            if (
              String.IsNullOrEmpty(oItemVM.OperationMode) ||
              !(
                String.Equals(
                  oItemVM.OperationMode,
                  'UA',
                  StringComparison.OrdinalIgnoreCase
                ) ||
                String.Equals(
                  oItemVM.OperationMode,
                  'U',
                  StringComparison.OrdinalIgnoreCase
                )
              )
            ) {
              nDiscCnt++;
            }
          }
          if (
            oItemVM.PrescriptionItemOID == 0 ||
            (!String.IsNullOrEmpty(oItemVM.OperationMode) &&
              String.Compare(
                oItemVM.OperationMode,
                'N',
                StringComparison.CurrentCultureIgnoreCase
              ) == 0)
          ) {
            IsAllNewItem = true;
            nnewCnt++;
          } else if (
            oItemVM.PrescriptionItemOID != 0 &&
            !String.IsNullOrEmpty(oItemVM.OperationMode) &&
            String.Compare(
              oItemVM.OperationMode,
              'U',
              StringComparison.CurrentCultureIgnoreCase
            ) == 0 &&
            String.IsNullOrEmpty(oItemVM.PrescriptionItemStatus)
          ) {
            IsAllNewItem = true;
            nnewCnt++;
          }
          if (
            oItemVM.PrescriptionItemOID == 0 ||
            (!String.IsNullOrEmpty(oItemVM.OperationMode) &&
              String.Compare(
                oItemVM.OperationMode,
                'N',
                StringComparison.CurrentCultureIgnoreCase
              ) == 0) ||
            String.Compare(
              oItemVM.PrescriptionItemStatus,
              CConstants.ONHOLD,
              StringComparison.OrdinalIgnoreCase
            ) == 0
          ) {
            if (!oItemVM.IsGroupHeader) {
              IsDisCCancel = false;
              this.cmdDiscontinueCancel.IsEnabled = false;
              this.cmdDiscontinueCancel.Visibility = Visibility.Collapsed;
            }
          }
          if (!UserPermissions.PrescribeWithRestriction && IsDisCCancel) {
            if (
              oItemVM.PrescriberDetails != null &&
              String.Compare(
                oItemVM.PrescriptionItemStatus,
                'MEDStatus14',
                StringComparison.CurrentCultureIgnoreCase
              ) != 0
            ) {
              if (!oItemVM.IsGroupHeader) {
                IsDisCCancel = this.PermissionCheckDiscCancel(
                  oItemVM.PrescriberDetails.OID
                );
              }
              this.cmdDiscontinueCancel.IsEnabled = IsDisCCancel;
              if (IsDisCCancel)
                this.cmdDiscontinueCancel.Visibility = Visibility.Visible;
              else this.cmdDiscontinueCancel.Visibility = Visibility.Collapsed;
            }
          }
          if (
            (String.Compare(
              oItemVM.PrescriptionItemStatus,
              CConstants.ONHOLD,
              StringComparison.OrdinalIgnoreCase
            ) == 0 &&
              oItemVM.PrescriptionItemOID > 0) ||
            oItemVM.IsGroupHeader
          ) {
            noldcnt++;
            if (oItemVM.IsGroupHeader) {
              nHeadercount++;
            }
          } else if (
            !String.IsNullOrEmpty(oItemVM.PrescriptionItemStatus) &&
            String.Compare(
              oItemVM.PrescriptionItemStatus,
              'MEDStatus14',
              StringComparison.CurrentCultureIgnoreCase
            ) != 0 &&
            oItemVM.PrescriptionItemOID > 0
          ) {
            noldcnt++;
            if (oItemVM.IsGroupHeader) {
              nHeadercount++;
            }
          }
          if (
            oItemVM.ReasonForHold == null &&
            !oItemVM.IsHold &&
            oItemVM.PrescriptionOID == 0
          ) {
            if (!IsHoldUnhold) {
              nholdcnt++;
              this.IsAllSelItemsUnHold = false;
            }
          } else if (oItemVM.IsHold) {
            if (!IsHoldUnhold) {
              nunholdcnt++;
              this.IsAllSelItemsHold = false;
            }
          } else {
            this.IsAllSelItemsHold = false;
            this.IsAllSelItemsUnHold = false;
            if (!IsHoldUnhold) IsHoldUnhold = true;
          }
          if (
            String.Equals(oItemVM.PrescriptionItemStatus, CConstants.COMPLETED)
          ) {
            _nNumberOfCompletedItems++;
          }
          if (
            String.Compare(
              oItemVM.PrescriptionItemStatus,
              CConstants.AWAITINGAUTHORISE,
              StringComparison.OrdinalIgnoreCase
            ) == 0 &&
            oItemVM.PrescriberDetails != null &&
            AppContextInfo.UserOID !=
              Convert.ToString(oItemVM.PrescriberDetails.OID)
          ) {
            nauthcount++;
          }
        }
      });
      if (nnewCnt == this.grdResolve.SelectedItems.Count) {
        IsAllNewItem = true;
      } else IsAllNewItem = false;
      if (noldcnt == this.grdResolve.SelectedItems.Count) {
        IsAlloldItem = true;
        this.cmdDiscontinueCancel.IsEnabled = true;
        this.cmdDiscontinueCancel.Visibility = Visibility.Visible;
        this.cmdRemove.IsEnabled = false;
        this.cmdRemove.Visibility = Visibility.Collapsed;
      }
      if (nunholdcnt == this.grdResolve.SelectedItems.Count) {
        this.IsAllSelItemsUnHold = true;
      }
      if (nholdcnt == this.grdResolve.SelectedItems.Count) {
        this.IsAllSelItemsHold = true;
      }
      if (nDiscCnt > 0) {
        this.DisableLinks();
        this.cmdDiscontinueCancel.IsEnabled = false;
        this.cmdDiscontinueCancel.Visibility = Visibility.Collapsed;
      } else {
        if (this.IsAllSelItemsHold && !this.IsAllSelItemsUnHold) {
          this.cmdRemove.IsEnabled = true;
          this.cmdRemove.Visibility = Visibility.Visible;
        } else if (this.IsAllSelItemsUnHold && !IsAllNewItem) {
          this.cmdRemove.IsEnabled = false;
          this.cmdRemove.Visibility = Visibility.Collapsed;
        } else if (this.IsAllSelItemsUnHold && IsAllNewItem) {
          this.cmdRemove.IsEnabled = true;
          this.cmdRemove.Visibility = Visibility.Visible;
        } else if (IsAllNewItem && IsHoldUnhold) {
          this.IsAllSelItemsHold = true;
          this.cmdRemove.IsEnabled = true;
          this.cmdRemove.Visibility = Visibility.Visible;
        } else if (IsHoldUnhold) {
          this.cmdRemove.IsEnabled = false;
          this.cmdRemove.Visibility = Visibility.Collapsed;
        } else if (
          IsAllNewItem &&
          ((!this.IsAllSelItemsHold && this.IsAllSelItemsUnHold) ||
            (this.IsAllSelItemsHold && !this.IsAllSelItemsUnHold))
        ) {
          this.cmdRemove.IsEnabled = false;
          this.cmdRemove.Visibility = Visibility.Collapsed;
        }
        if (IsAllNewItem) {
          this.cmdDiscontinueCancel.IsEnabled = false;
          this.cmdDiscontinueCancel.Visibility = Visibility.Collapsed;
        } else {
          if (!UserPermissions.PrescribeWithRestriction && IsDisCCancel) {
            this.cmdDiscontinueCancel.IsEnabled = true;
            this.cmdDiscontinueCancel.IsEnabled = IsDisCCancel;
            if (IsDisCCancel)
              this.cmdDiscontinueCancel.Visibility = Visibility.Visible;
            else this.cmdDiscontinueCancel.Visibility = Visibility.Collapsed;
            if (_nNumberOfCompletedItems >= 1) {
              this.cmdDiscontinueCancel.IsEnabled = false;
              this.cmdDiscontinueCancel.Visibility = Visibility.Collapsed;
            }
          }
        }
        if (!IsAllNewItem && !IsAlloldItem && IsHoldUnhold) {
          this.cmdRemove.IsEnabled = false;
          this.cmdRemove.Visibility = Visibility.Collapsed;
          this.cmdDiscontinueCancel.IsEnabled = false;
          this.cmdDiscontinueCancel.Visibility = Visibility.Collapsed;
        } else if (
          (!IsAllNewItem &&
            !IsAlloldItem &&
            !IsHoldUnhold &&
            !this.IsAllSelItemsUnHold) ||
          (noldcnt > 0 &&
            nnewCnt > 0 &&
            !IsAllNewItem &&
            !IsAlloldItem &&
            !this.IsAllSelItemsUnHold)
        ) {
          this.cmdRemove.IsEnabled = false;
          this.cmdRemove.Visibility = Visibility.Collapsed;
          this.cmdDiscontinueCancel.IsEnabled = false;
          this.cmdDiscontinueCancel.Visibility = Visibility.Collapsed;
        }
      }
      if (this.grdResolve.SelectedItems != null) {
        let orgcount: number = this.grdResolve.SelectedItems.Count;
        if (nHeadercount == orgcount) {
          this.cmdRemove.Visibility = Visibility.Collapsed;
          this.cmdDiscontinueCancel.Visibility = Visibility.Collapsed;
          //this.cmdAddFavourites.IsEnabled = false;
        } else if (orgcount - nHeadercount == 1) {
          if (nDiscCnt > 0) {
            this.DisableLinks();
            this.cmdDiscontinueCancel.IsEnabled = false;
            this.cmdDiscontinueCancel.Visibility = Visibility.Collapsed;
          } else {
            this.cmdLinks.IsEnabled = true;
            this.cmdObservationResults.IsEnabled = true;
            this.grdResolve.SelectedItems.forEach((objItemVM) => {
              let oItmVM: PrescriptionItemVM =
                ObjectHelper.CreateType<PrescriptionItemVM>(
                  objItemVM,
                  PrescriptionItemVM
                );
              if (oItmVM != null && !oItmVM.IsGroupHeader) {
                this.oVM.SelectedPrescribeItem = oItmVM;
              }
            });
          }
        }
      }
      if (nauthcount > 0) {
        this.cmdDiscontinueCancel.IsEnabled = false;
      }
    }
    if (
      String.Equals(
        this.oVM.CACode,
        CConstants.InpatientPrescribeMenuCode,
        StringComparison.InvariantCultureIgnoreCase
      ) ||
      String.Equals(
        this.oVM.CACode,
        CConstants.ForadminPrescribeMenuCode,
        StringComparison.InvariantCultureIgnoreCase
      )
    ) {
      
      for (let i:number=0; i<this.grdResolve.SelectedItems.Count;i++){
        let oItemVM: PrescriptionItemVM = this.grdResolve.SelectedItems[i];
        if (oItemVM != null && !oItemVM.IsGroupHeader) {
          if (
            String.IsNullOrEmpty(oItemVM.OrderSetLoreznoID) &&
            (String.Equals(
              oItemVM.PrescriptionItemStatus,
              CConstants.COMPLETED,
              StringComparison.OrdinalIgnoreCase
            ) ||
              String.Equals(
                oItemVM.PrescriptionItemStatus,
                CConstants.DISCONTINUED,
                StringComparison.OrdinalIgnoreCase
              ))
          ) {
            this.cmdReprescribe.IsEnabled = true;
          } else {
            this.cmdReprescribe.IsEnabled = false;
            break;
          }
        }
      }      
    }
  }
  private PermissionCheckDiscCancel(PrescriberOID: number): boolean {
    if (
      !UserPermissions.Cancanceldiscontinuedrugs &&
      !UserPermissions.CancanceldiscontinuedOwnrugs
    ) {
      MessageBox.Show('You do not have rights to Discontinue/Cancel any drugs');
      return false;
    } else if (
      !UserPermissions.Cancanceldiscontinuedrugs &&
      UserPermissions.CancanceldiscontinuedOwnrugs &&
      PrescriberOID != ContextInfo.UserOID
    ) {
      return false;
    }
    return true;
  }
  PatientCount_Completed(
    sender: Object,
    e: GetPatientMedicationCountCompletedEventArgs
  ): void {
    if (e.Error != null) return;
    let objResult: CResMsgGetPatientMedicationCount = e.Result;
    if (!(objResult instanceof CResMsgGetPatientMedicationCount)) return;
    if (objResult != null) {
      if (Convert.ToBoolean(objResult.bIsExist))
        this.cmdMedAdmin.IsEnabled = true;
      else this.cmdMedAdmin.IsEnabled = false;
    }
  }
  PatientMedicationCount_Completed(
    sender: Object,
    e: IPPMAManagePrescSer.GetIPPPatientMedicationCountCompletedEventArgs
  ): void {
    if (e.Error != null) return;
    let objResult: IPPMAManagePrescSer.CResMsgGetIPPPatientMedicationCount =
      e.Result;
    if (
      !(
        objResult instanceof
        IPPMAManagePrescSer.CResMsgGetIPPPatientMedicationCount
      )
    )
      return;
    if (objResult != null) {
      this.oVM.PromptIsEnabled = objResult.bIsExist;
    }
  }
  private UnHoldOldDrugs(): void {
    let nCounter: number = 0;
    this.oSelectedHoldItem =
      this.grdResolve.SelectedItems.Cast<PrescriptionItemVM>();
      for (let i = 0; i < this.grdResolve.SelectedItems.Count; i ++){
        let oPresItmVM : PrescriptionItemVM = this.grdResolve.SelectedItems[i];     
      if (
        String.Compare(
          oPresItmVM.OperationMode,
          'N',
          StringComparison.OrdinalIgnoreCase
        ) != 0 &&
        !this.bUnHoldInfusion
      ) {
        if (nCounter == this.nTotalDrugsUnHolded) {
          let nSelIndex: number = -1;
          let SelIndecies: number[] =
            this.grdResolve.GetSelectedRowsIndexByOrder();
          if (SelIndecies != null) {
            nSelIndex = SelIndecies[this.nTotalDrugsUnHolded];
          }
          if (ProfileData.MedConflictConfig == null) Common.GetConflictConfig();
          oPresItmVM.GetReplacementDrugs(this.oVM, nSelIndex);
          oPresItmVM.RePresBindResolveGridEvent = (s, e) => {
            this.oVM_ReBindResolveGridEvent(s, e);
          };
          oPresItmVM.ActionCode = ActivityTypes.UnHold;
          oPresItmVM.ReasonForHold = null;
          oPresItmVM.IsHold = false;
          oPresItmVM.HoldReason = String.Empty;
          oPresItmVM.PrescriptionItemStatus = String.Empty;
          oPresItmVM.IsFormViewerDisable = false;
          oPresItmVM.AllergenCheck = false;
          this.IsAllSelItemsHold = true;
          this.IsAllSelItemsUnHold = false;
          this.cmdRemove.IsEnabled = true;
          this.cmdRemove.Visibility = Visibility.Visible;
          oPresItmVM.IsUnholddrug = true;
          oPresItmVM.IsUnHoldAction = true;
          break;
        }
        nCounter++;
      }
    }
  }
  private UnHoldNewDrugs(): void {
    let SelIndecies: number[] = this.grdResolve.GetSelectedRowsIndexByOrder();
    this.oSelectedHoldItem =
      this.grdResolve.SelectedItems.Cast<PrescriptionItemVM>();
    if (SelIndecies != null && !this.InfusionUnHold()) {
      let nLen: number = SelIndecies.length;
      for (let i: number = nLen; i > 0; i--) {
        let oPresItmVM: PrescriptionItemVM =
          this.oVM.MedsResolve[SelIndecies[i - 1]];
        if (String.Compare(oPresItmVM.OperationMode, 'N') == 0) {
          oPresItmVM.ActionCode = ActivityTypes.UnHold;
          oPresItmVM.ReasonForHold = null;
          oPresItmVM.IsHold = false;
          oPresItmVM.PrescriptionItemStatus = String.Empty;
          oPresItmVM.IsFormViewerDisable = false;
          oPresItmVM.AllergenCheck = false;
          this.IsAllSelItemsHold = true;
          this.IsAllSelItemsUnHold = false;
          this.cmdRemove.IsEnabled = true;
          this.cmdRemove.Visibility = Visibility.Visible;
          this.oVM.UpdateConflicts(SelIndecies[i - 1], 'UNHOLD');
        }
      }
    }
  }
  private InfusionUnHold(): boolean {
    let IsSequentialDrugHold: boolean = false;
    let GrdSelectionItem: IEnumerable<PrescriptionItemVM> =
      this.grdResolve.SelectedItems.Cast<PrescriptionItemVM>();
    let SeqAuthoriseItemgrps = GrdSelectionItem.GroupBy(
      (g) =>
        g.FormViewerDetails.BasicDetails.InfusionDetails.PrescriptionItemNumber
    )
      .Select((s) => s)
      .ToList();
    if (SeqAuthoriseItemgrps != null && SeqAuthoriseItemgrps.Count > 0) {
      SeqAuthoriseItemgrps.forEach((oItemVM) => {
        let gpySeqCount = this.oVM.MedsResolve.Where(
          (c) =>
            c.FormViewerDetails.BasicDetails.InfusionDetails != null &&
            c.FormViewerDetails.BasicDetails.InfusionDetails
              .PrescriptionItemNumber == oItemVM.Key &&
            c.FormViewerDetails.BasicDetails.InfusionDetails
              .SequentialItemOrder > 0 &&
            oItemVM.Key > 0
        )
          .Select((s) => s)
          .Count();
        let gpySelItemSeqCount = GrdSelectionItem.Where(
          (c) =>
            c.FormViewerDetails.BasicDetails.InfusionDetails != null &&
            c.FormViewerDetails.BasicDetails.InfusionDetails
              .PrescriptionItemNumber == oItemVM.Key &&
            c.FormViewerDetails.BasicDetails.InfusionDetails
              .SequentialItemOrder > 0 &&
            oItemVM.Key > 0
        )
          .Select((s) => s)
          .Count();
        if (gpySeqCount != gpySelItemSeqCount) {
          IsSequentialDrugHold = true;
        }
      });
      if (IsSequentialDrugHold) {
        let iMsgBox: iMessageBox = ObjectHelper.CreateObject(
          new iMessageBox(),
          {
            Title: 'LORENZO',
            Message: Resource.Infusion.UnHoldSequencial_Msg,
            MessageButton: MessageBoxButton.YesNo,
            IconType: MessageBoxType.Question,
          }
        );
        iMsgBox.Height = 180;
        iMsgBox.Width = 400;
        iMsgBox.MessageBoxClose = (s, e) => {
          this.iMsgBox_MessageBoxClose_UnHold(s, e);
        };
        iMsgBox.Show();
        this.bUnHoldInfusion = true;
        return true;
      }
    }
    this.bUnHoldInfusion = false;
    return false;
  }
  iMsgBox_MessageBoxClose_UnHold(sender: Object, e: MessageEventArgs): void {
    if (this.oSelectedHoldItem != null && this.oSelectedHoldItem.Count() > 0) {
      let oSelectedHoldItems: ObservableCollection<PrescriptionItemVM> =
        new ObservableCollection<PrescriptionItemVM>();
      this.oSelectedHoldItem.forEach((oSelectedItem) => {
        if (
          oSelectedItem != null &&
          oSelectedItem.FormViewerDetails != null &&
          oSelectedItem.FormViewerDetails.BasicDetails != null &&
          oSelectedItem.FormViewerDetails.BasicDetails.InfusionDetails !=
            null &&
          oSelectedItem.FormViewerDetails.BasicDetails.InfusionDetails
            .PrescriptionItemNumber > 0
        ) {
          oSelectedHoldItems.Add(
            this.oVM.MedsResolve.Where(
              (c) =>
                c.FormViewerDetails.BasicDetails.InfusionDetails
                  .PrescriptionItemNumber ==
                oSelectedItem.FormViewerDetails.BasicDetails.InfusionDetails
                  .PrescriptionItemNumber
            )
              .Select((s) => s)
              .FirstOrDefault()
          );
        } else {
          oSelectedHoldItems.Add(oSelectedItem);
        }
      });
      oSelectedHoldItems.forEach((oSelectedItem) => {
        if (
          e.MessageBoxResult == MessageBoxResult.Yes &&
          oSelectedItem != null &&
          oSelectedItem.FormViewerDetails != null &&
          oSelectedItem.FormViewerDetails.BasicDetails != null &&
          oSelectedItem.FormViewerDetails.BasicDetails.InfusionDetails !=
            null &&
          oSelectedItem.FormViewerDetails.BasicDetails.InfusionDetails
            .PrescriptionItemNumber > 0
        ) {
          if (
            oSelectedItem != null &&
            oSelectedItem.FormViewerDetails.BasicDetails.InfusionDetails !=
              null &&
            oSelectedItem.FormViewerDetails.BasicDetails.InfusionType != null &&
            !String.IsNullOrEmpty(
              oSelectedItem.FormViewerDetails.BasicDetails.InfusionType.Value
            ) &&
            (String.Compare(
              oSelectedItem.FormViewerDetails.BasicDetails.InfusionType.Value,
              InfusionTypeCode.CONTINUOUS
            ) == 0 ||
              String.Compare(
                oSelectedItem.FormViewerDetails.BasicDetails.InfusionType.Value,
                InfusionTypeCode.SINGLEDOSEVOLUME
              ) == 0 ||
              String.Compare(
                oSelectedItem.FormViewerDetails.BasicDetails.InfusionType.Value,
                InfusionTypeCode.FLUID
              ) == 0)
          ) {
            let GetSequentialOrder: ObservableCollection<PrescriptionItemVM> =
              new ObservableCollection<PrescriptionItemVM>();
            let DisparentPresSeq: number = 0;
            if (
              oSelectedItem.FormViewerDetails.BasicDetails.InfusionDetails
                .PrescriptionItemNumber > 0
            ) {
              DisparentPresSeq =
                oSelectedItem.FormViewerDetails.BasicDetails.InfusionDetails
                  .PrescriptionItemNumber;
            }
            GetSequentialOrder = new ObservableCollection<PrescriptionItemVM>(
              this.oVM.MedsResolve.Where(
                (c) =>
                  c.FormViewerDetails.BasicDetails.InfusionDetails
                    .PrescriptionItemNumber == DisparentPresSeq
              )
                .Select((s) => s)
                .OrderBy(
                  (oSelectorder) =>
                    oSelectorder.FormViewerDetails.BasicDetails.InfusionDetails
                      .SequentialItemOrder
                )
            );
            if (
              GetSequentialOrder != null &&
              !String.IsNullOrEmpty(oSelectedItem.OperationMode) &&
              GetSequentialOrder.Count > 0 &&
              String.Equals(
                oSelectedItem.OperationMode,
                'N',
                StringComparison.CurrentCultureIgnoreCase
              )
            ) {
              this.oVM.MedsResolve.ForEach((ReInsert) => {
                if (GetSequentialOrder.Contains(ReInsert)) {
                  let Index: number = this.oVM.MedsResolve.IndexOf(ReInsert);
                  ReInsert.ActionCode = ActivityTypes.UnHold;
                  ReInsert.ReasonForHold = null;
                  ReInsert.IsHold = false;
                  ReInsert.PrescriptionItemStatus = String.Empty;
                  ReInsert.IsFormViewerDisable = false;
                  ReInsert.AllergenCheck = false;
                  this.oVM.UpdateConflicts(Index, 'UNHOLD');
                }
              });
            } else {
              if (GetSequentialOrder != null && GetSequentialOrder.Count > 0) {
                this.oVM.HoldSeqItemsCount = GetSequentialOrder.Count;
                this.oVM.HoldSeqItemLists =
                  new ObservableCollection<PrescriptionItemVM>();
                this.oVM.HoldSeqItemLists = GetSequentialOrder;
                let GetCurrentHoldSeqitem: ObservableCollection<PrescriptionItemVM> =
                  new ObservableCollection<PrescriptionItemVM>();
                GetCurrentHoldSeqitem.Add(GetSequentialOrder.FirstOrDefault());
                if (
                  GetCurrentHoldSeqitem != null &&
                  GetCurrentHoldSeqitem.Count > 0
                ) {
                  let Index: number = -1;
                  this.oVM.MedsResolve.ForEach((ReInsert) => {
                    if (GetCurrentHoldSeqitem.Contains(ReInsert)) {
                      Index = this.oVM.MedsResolve.IndexOf(ReInsert);
                      ReInsert.ActionCode = ActivityTypes.UnHold;
                      ReInsert.ReasonForHold = null;
                      ReInsert.IsHold = false;
                      ReInsert.PrescriptionItemStatus = String.Empty;
                      ReInsert.IsFormViewerDisable = false;
                      ReInsert.AllergenCheck = false;
                      ReInsert.IsUnHoldAction = true;
                      if (ReInsert.PrescriptionItemOID > 0) {
                        ReInsert.OperationMode = 'U';
                        ReInsert.IsUnholddrug = true;
                        this.oVM.PreviousSeqPrescItemOID =
                          ReInsert.PrescriptionItemOID;
                      }
                    }
                  });
                  if (Index != -1) {
                    this.oVM.UnHoldSeqInprogress = true;
                    this.oVM.HoldSeqItemIndex = 1;
                    Busyindicator.SetStatusBusy('UNHOLDSEQINPROGESS');
                    this.oVM.UpdateConflicts(Index, 'UNHOLD');
                  }
                }
              }
            }
          } else {
            let Index: number = this.oVM.MedsResolve.IndexOf(oSelectedItem);
            this.oVM.UpdateConflicts(Index, 'UNHOLD');
            oSelectedItem.ActionCode = ActivityTypes.UnHold;
            oSelectedItem.ReasonForHold = null;
            oSelectedItem.IsHold = false;
            oSelectedItem.HoldReason = String.Empty;
            oSelectedItem.PrescriptionItemStatus = String.Empty;
            oSelectedItem.IsFormViewerDisable = false;
            oSelectedItem.AllergenCheck = false;
            if (oSelectedItem.PrescriptionItemOID > 0) {
              oSelectedItem.OperationMode = 'U';
              oSelectedItem.IsUnholddrug = true;
            }
          }
          this.IsAllSelItemsHold = true;
          this.IsAllSelItemsUnHold = false;
        } else {
          if (
            oSelectedItem != null &&
            ((oSelectedItem.FormViewerDetails.BasicDetails.InfusionDetails !=
              null &&
              oSelectedItem.FormViewerDetails.BasicDetails.InfusionType !=
                null &&
              !String.IsNullOrEmpty(
                oSelectedItem.FormViewerDetails.BasicDetails.InfusionType.Value
              ) &&
              (String.Compare(
                oSelectedItem.FormViewerDetails.BasicDetails.InfusionType.Value,
                InfusionTypeCode.CONTINUOUS
              ) == 0 ||
                String.Compare(
                  oSelectedItem.FormViewerDetails.BasicDetails.InfusionType
                    .Value,
                  InfusionTypeCode.SINGLEDOSEVOLUME
                ) == 0 ||
                String.Compare(
                  oSelectedItem.FormViewerDetails.BasicDetails.InfusionType
                    .Value,
                  InfusionTypeCode.FLUID
                ) == 0) &&
              oSelectedItem.FormViewerDetails.BasicDetails.InfusionDetails
                .PrescriptionItemNumber <= 0 &&
              oSelectedItem.FormViewerDetails.BasicDetails.InfusionDetails
                .SequentialItemOrder <= 0) ||
              oSelectedItem.FormViewerDetails.BasicDetails.InfusionType ==
                null ||
              (oSelectedItem.FormViewerDetails.BasicDetails.InfusionType !=
                null &&
                String.IsNullOrEmpty(
                  oSelectedItem.FormViewerDetails.BasicDetails.InfusionType
                    .Value
                )))
          ) {
            let Index: number = this.oVM.MedsResolve.IndexOf(oSelectedItem);
            this.oVM.UpdateConflicts(Index, 'UNHOLD');
            oSelectedItem.ActionCode = ActivityTypes.UnHold;
            oSelectedItem.ReasonForHold = null;
            oSelectedItem.IsHold = false;
            oSelectedItem.HoldReason = String.Empty;
            oSelectedItem.PrescriptionItemStatus = String.Empty;
            oSelectedItem.IsFormViewerDisable = false;
            oSelectedItem.AllergenCheck = false;
            if (oSelectedItem.PrescriptionItemOID > 0) {
              oSelectedItem.OperationMode = 'U';
              oSelectedItem.IsUnholddrug = true;
            }
          }
        }
      });
    }
  }
  //Not Required for LHS. To be Re-Visited. Unused code
  /*
        oholdc_Closed(args: AppDialogEventargs): void {
            let bDialogResult: boolean = false;
            let bHoldInfusion: boolean = false;
            this.oAppDialogWindow = args.AppChildWindow;
            this.oSelectedHoldItem = this.grdResolve.SelectedItems.Cast<PrescriptionItemVM>();
            let _bIsInfusion: boolean = false;
            if (args.Result == AppDialogResult.Ok) {
                if (this.grdResolve.GetSelectedRowCount() > 0) {
                    bDialogResult = this.omeddrugholdChild.OKButtonClick();
                    if (bDialogResult) {
                        let IsSequentialDrugHold: boolean = false;
                        let GrdSelectionItem: IEnumerable<PrescriptionItemVM> = this.grdResolve.SelectedItems.Cast<PrescriptionItemVM>();
                        let SeqAuthoriseItemgrps = GrdSelectionItem.GroupBy(g => g.FormViewerDetails.BasicDetails.InfusionDetails.PrescriptionItemNumber).Select(s => s).ToList();
                        if (SeqAuthoriseItemgrps != null && SeqAuthoriseItemgrps.Count > 0) {
                            SeqAuthoriseItemgrps.forEach( (oItemVM)=> {
                                let gpySeqCount = this.oVM.MedsResolve.Where(c => c.FormViewerDetails.BasicDetails.InfusionDetails != null && c.FormViewerDetails.BasicDetails.InfusionType != null && (String.Compare(c.FormViewerDetails.BasicDetails.InfusionType.Value, InfusionTypeCode.CONTINUOUS) == 0 || String.Compare(c.FormViewerDetails.BasicDetails.InfusionType.Value, InfusionTypeCode.SINGLEDOSEVOLUME) == 0 || String.Compare(c.FormViewerDetails.BasicDetails.InfusionType.Value, InfusionTypeCode.FLUID) == 0) && c.FormViewerDetails.BasicDetails.InfusionDetails.PrescriptionItemNumber == oItemVM.Key && c.FormViewerDetails.BasicDetails.InfusionDetails.SequentialItemOrder > 0 && oItemVM.Key > 0).Select(s => s).Count();
                                let gpySelItemSeqCount = GrdSelectionItem.Where(c => c.FormViewerDetails.BasicDetails.InfusionDetails != null && c.FormViewerDetails.BasicDetails.InfusionType != null && (String.Compare(c.FormViewerDetails.BasicDetails.InfusionType.Value, InfusionTypeCode.CONTINUOUS) == 0 || String.Compare(c.FormViewerDetails.BasicDetails.InfusionType.Value, InfusionTypeCode.SINGLEDOSEVOLUME) == 0 || String.Compare(c.FormViewerDetails.BasicDetails.InfusionType.Value, InfusionTypeCode.FLUID) == 0) && c.FormViewerDetails.BasicDetails.InfusionDetails.PrescriptionItemNumber == oItemVM.Key && c.FormViewerDetails.BasicDetails.InfusionDetails.SequentialItemOrder > 0 && oItemVM.Key > 0).Select(s => s).Count();
                                if (gpySeqCount != gpySelItemSeqCount) {
                                    IsSequentialDrugHold = true;
                                }
                            });
                            if (IsSequentialDrugHold) {
                                let iMsgBox: iMessageBox = ObjectHelper.CreateObject(new iMessageBox(), {
                                    Title: "LORENZO",
                                    Message: Resource.Infusion.HoldSequencial_Msg,
                                    MessageButton: MessageBoxButton.YesNo,
                                    IconType: MessageBoxType.Question
                                });
                                iMsgBox.Height = 180;
                                iMsgBox.Width = 400;
                                iMsgBox.MessageBoxClose  = (s,e) => { this.iMsgBox_MessageBoxClose_Hold(s,e); } ;
                                iMsgBox.Show();
                                bHoldInfusion = true;
                                _bIsInfusion = true;
                            }
                        }
                        this.grdResolve.SelectedItems.forEach( (oPresItmVM)=> {
                            if (!bHoldInfusion) {
                                oPresItmVM.ReasonForHold = this.omeddrugholdChild.HoldReason;
                                if (this.omeddrugholdChild.HoldReason == null) {
                                    oPresItmVM.IsHold = false;
                                    oPresItmVM.PrescriptionItemStatus = String.Empty;
                                    oPresItmVM.IsFormViewerDisable = false;
                                }
                                else {
                                    oPresItmVM.IsHold = true;
                                    oPresItmVM.PrescriptionItemStatus = CConstants.ONHOLD;
                                    oPresItmVM.IsFormViewerDisable = true;
                                    this.cmdRemove.IsEnabled = false;
                                    this.cmdRemove.Visibility = Visibility.Collapsed;
                                }
                            }
                        });
                        if (this.omeddrugholdChild.HoldReason == null) {
                            if (!_bIsInfusion)
                                this.IsAllSelItemsHold = true;
                            this.IsAllSelItemsUnHold = false;
                        }
                        else {
                            if (!_bIsInfusion)
                                this.IsAllSelItemsUnHold = true;
                            this.IsAllSelItemsHold = false;
                        }
                        if (!bHoldInfusion)
                            this.oVM.UpdateConflicts(0, "HOLD");
                        this.oAppDialogWindow.DialogResult = bDialogResult;
                    }
                }
            }
            else if (args.Result == AppDialogResult.Cancel) {
                this.omeddrugholdChild.CancelButtonClick();
                this.grdResolve.UnselectAll();
            }
        }
        
        iMsgBox_MessageBoxClose_Hold(sender: Object, e: MessageEventArgs): void {
            if (this.oSelectedHoldItem == null || this.oSelectedHoldItem.Count() == 0)
                return
            this.oSelectedHoldItem.forEach( (oSelectedItem)=> {
                if (e.MessageBoxResult == MessageBoxResult.Yes) {
                    if (oSelectedItem != null && oSelectedItem.FormViewerDetails.BasicDetails.InfusionDetails != null && oSelectedItem.FormViewerDetails.BasicDetails.InfusionType != null && !String.IsNullOrEmpty(oSelectedItem.FormViewerDetails.BasicDetails.InfusionType.Value) && (String.Compare(oSelectedItem.FormViewerDetails.BasicDetails.InfusionType.Value, InfusionTypeCode.CONTINUOUS) == 0 || String.Compare(oSelectedItem.FormViewerDetails.BasicDetails.InfusionType.Value, InfusionTypeCode.SINGLEDOSEVOLUME) == 0 || String.Compare(oSelectedItem.FormViewerDetails.BasicDetails.InfusionType.Value, InfusionTypeCode.FLUID) == 0)) {
                        let GetSequentialOrder: ObservableCollection<PrescriptionItemVM> = new ObservableCollection<PrescriptionItemVM>();
                        let DisparentPresSeq: number = 0;
                        if (oSelectedItem.FormViewerDetails.BasicDetails.InfusionDetails.PrescriptionItemNumber > 0) {
                            DisparentPresSeq = oSelectedItem.FormViewerDetails.BasicDetails.InfusionDetails.PrescriptionItemNumber;
                        }
                        GetSequentialOrder = new ObservableCollection<PrescriptionItemVM>(this.oVM.MedsResolve.Where(c => c.FormViewerDetails.BasicDetails.InfusionDetails.PrescriptionItemNumber == DisparentPresSeq).Select(s => s).OrderBy(oSelectorder => oSelectorder.FormViewerDetails.BasicDetails.InfusionDetails.SequentialItemOrder));
                        if (GetSequentialOrder != null && GetSequentialOrder.Count > 0) {
                            this.oVM.MedsResolve.ForEach(ReInsert => {
                                if (GetSequentialOrder.Contains(ReInsert)) {
                                    ReInsert.IsHold = true;
                                    ReInsert.PrescriptionItemStatus = CConstants.ONHOLD;
                                    ReInsert.IsFormViewerDisable = true;
                                    ReInsert.ReasonForHold = this.omeddrugholdChild.HoldReason;
                                }
                            });
                            this.oVM.UpdateConflicts(0, "HOLD");
                        }
                    }
                    else {
                        oSelectedItem.IsHold = true;
                        oSelectedItem.PrescriptionItemStatus = CConstants.ONHOLD;
                        oSelectedItem.IsFormViewerDisable = true;
                        oSelectedItem.ReasonForHold = this.omeddrugholdChild.HoldReason;
                        this.oVM.UpdateConflicts(0, "HOLD");
                    }
                }
                else {
                    if (!(oSelectedItem.FormViewerDetails.BasicDetails.InfusionDetails != null && oSelectedItem.FormViewerDetails.BasicDetails.InfusionType != null && (String.Compare(oSelectedItem.FormViewerDetails.BasicDetails.InfusionType.Value, InfusionTypeCode.CONTINUOUS, StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(oSelectedItem.FormViewerDetails.BasicDetails.InfusionType.Value, InfusionTypeCode.SINGLEDOSEVOLUME, StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(oSelectedItem.FormViewerDetails.BasicDetails.InfusionType.Value, InfusionTypeCode.FLUID, StringComparison.CurrentCultureIgnoreCase) == 0) && oSelectedItem.FormViewerDetails.BasicDetails.InfusionDetails.SequentialItemOrder > 0 && oSelectedItem.FormViewerDetails.BasicDetails.InfusionDetails.PrescriptionItemNumber > 0)) {
                        oSelectedItem.IsHold = true;
                        oSelectedItem.PrescriptionItemStatus = CConstants.ONHOLD;
                        oSelectedItem.IsFormViewerDisable = true;
                        oSelectedItem.ReasonForHold = this.omeddrugholdChild.HoldReason;
                        this.oVM.UpdateConflicts(0, "HOLD");
                    }
                }
            });
            this.grdResolve.UnselectAll();
        }
        */
  lstOrderSet: List<string> = new List<string>();
  public cmdDiscontinueCancel_Click(sender: Object, e: RoutedEventArgs): void {
    this.lstOrderSet = new List<string>();
    this.listDrugNames = new StringBuilder();
    let bContainInfusionItem: boolean = false;
    this.bIsInfDiscontinue = false;
    this.bIsOrdDiscontinue = false;
    CommonFlags.bDiscontinueCancelClicked = false;
    this.OSelectedAllowedToDiscontinue = new ObservableCollection<Object>();
    this.grdResolve.SelectedItems.forEach((oItemVM) => {
      if (
        oItemVM != null &&
        oItemVM.FormViewerDetails != null &&
        oItemVM.FormViewerDetails.BasicDetails != null
      ) {
        if (!oItemVM.IsAllowedToPerform) {
          if (this.listDrugNames.Length > 0) {
            this.listDrugNames.Append('?!+`');
          }
          if (
            String.IsNullOrEmpty(
              oItemVM.FormViewerDetails.BasicDetails.MCILorenzoID
            )
          ) {
            if (
              !String.IsNullOrEmpty(
                oItemVM.FormViewerDetails.BasicDetails.IdentifyingName
              )
            ) {
              this.listDrugNames.Append(
                oItemVM.FormViewerDetails.BasicDetails.IdentifyingName
              );
            }
          } else {
            if (
              !String.IsNullOrEmpty(
                oItemVM.FormViewerDetails.BasicDetails.mCIItemDisplay
              )
            ) {
              this.listDrugNames.Append(
                oItemVM.FormViewerDetails.BasicDetails.mCIItemDisplay
              );
            }
          }
          this.OSelectedAllowedToDiscontinue.Add(oItemVM);
        } else {
          if (
            PatientContext.IsINFUSIONON &&
            String.Compare(
              PatientContext.PrescriptionType,
              PrescriptionTypes.ForAdministration,
              StringComparison.CurrentCultureIgnoreCase
            ) == 0 &&
            ((oItemVM.FormViewerDetails.BasicDetails.InfusionType != null &&
              !String.IsNullOrEmpty(
                oItemVM.FormViewerDetails.BasicDetails.InfusionType.Value
              ) &&
              String.Compare(
                oItemVM.FormViewerDetails.BasicDetails.InfusionType.Value,
                InfusionTypesCode.INTERMITTENT,
                StringComparison.CurrentCultureIgnoreCase
              ) != 0) ||
              oItemVM.FormViewerDetails.BasicDetails.InfusionDetails.IsOxygen ||
              oItemVM.FormViewerDetails.BasicDetails.itemSubType ==
                CConstants.SUBTYPE_GAS ||
              oItemVM.FormViewerDetails.BasicDetails.itemSubType ==
                CConstants.SUBTYPE_BLOOD) &&
            oItemVM.FormViewerDetails.BasicDetails.InfusionDetails != null &&
            !String.Equals(
              oItemVM.PrescriptionItemStatus,
              CConstants.AWAITINGAUTHORISE,
              StringComparison.InvariantCultureIgnoreCase
            ) &&
            DateTime.NotEquals(oItemVM.FormViewerDetails.BasicDetails.StartPrescriptionTime,
              DateTime.MinValue) &&
            (DateTime.LessThanOrEqualTo(oItemVM.FormViewerDetails.BasicDetails.StartPrescriptionTime,
              CommonBB.GetServerDateTime()) ||
              oItemVM.FormViewerDetails.BasicDetails.StartPrescriptionTime.AddMinutes(
                -MedChartData.DuenessThreshold
              ) <= CommonBB.GetServerDateTime() ||
              DateTime.GreaterThanOrEqualTo(CommonBB.GetServerDateTime(),
                oItemVM.FormViewerDetails.BasicDetails.StartDTTM.AddMinutes(
                  MedChartData.DuenessThreshold
                )))
          ) {
            bContainInfusionItem = true;
            this.bIsInfDiscontinue = true;
          } else if (
            PatientContext.IsINFUSIONON &&
            String.Compare(
              PatientContext.PrescriptionType,
              PrescriptionTypes.ForAdministration,
              StringComparison.CurrentCultureIgnoreCase
            ) == 0 &&
            oItemVM.FormViewerDetails.BasicDetails.InfusionType != null &&
            !String.IsNullOrEmpty(
              oItemVM.FormViewerDetails.BasicDetails.InfusionType.Value
            ) &&
            String.Compare(
              oItemVM.FormViewerDetails.BasicDetails.InfusionType.Value,
              InfusionTypesCode.INTERMITTENT,
              StringComparison.CurrentCultureIgnoreCase
            ) == 0 &&
            oItemVM.FormViewerDetails.BasicDetails.InfusionDetails
              .InfInterMitScheduleDTTMs != null &&
            oItemVM.FormViewerDetails.BasicDetails.InfusionDetails
              .InfInterMitScheduleDTTMs.Count > 0
          ) {
            if (
              DateTime.LessThanOrEqualTo(oItemVM.FormViewerDetails.BasicDetails.StartDTTM,
                CommonBB.GetServerDateTime()) ||
              this.CanDisDueNowSlotForInfIntermittent(
                oItemVM.FormViewerDetails.BasicDetails.InfusionDetails
                  .InfInterMitScheduleDTTMs
              )
            ) {
              bContainInfusionItem = true;
              this.bIsInfDiscontinue = true;
            }
          }
          if (
            oItemVM.FormViewerDetails.BasicDetails.Ordersets != null &&
            !String.IsNullOrEmpty(
              oItemVM.FormViewerDetails.BasicDetails.Ordersets.Value
            ) &&
            !(
              (oItemVM.FormViewerDetails.BasicDetails.InfusionDetails != null &&
                oItemVM.FormViewerDetails.BasicDetails.InfusionDetails
                  .GroupSequenceNo > 0) ||
              (oItemVM.FormViewerDetails.BasicDetails.SequenceInfo != null &&
                oItemVM.FormViewerDetails.BasicDetails.SequenceInfo
                  .GroupSequenceNo > 0)
            )
          ) {
            if (
              !this.lstOrderSet.Contains(
                oItemVM.FormViewerDetails.BasicDetails.Ordersets.DisplayText
              )
            )
              this.lstOrderSet.Add(
                oItemVM.FormViewerDetails.BasicDetails.Ordersets.DisplayText
              );
          }
        }
      }
    });
    let iMsgBox: iMessageBox = new iMessageBox();
    if (this.listDrugNames.Length > 0) {
      let Msg: string = String.Empty;
      let lDrugNames: string = String.Empty;
      lDrugNames = this.listDrugNames.ToString();
      if (!this.listDrugNames.ToString().Contains('?!+`')) {
        lDrugNames = '\n\n- ' + lDrugNames;
        Msg = String.Format(
          Resource.prescribedrugs.IsDiscontinueCancelAllowed,
          lDrugNames
        );
      } else {
        lDrugNames = String.Join(
          '\n- ',
          lDrugNames.Split('?!+`', StringSplitOptions.None).ToList()
        );
        lDrugNames = '\n\n- ' + lDrugNames;
        Msg = String.Format(
          Resource.prescribedrugs.AreDiscontinueCancelAllowed,
          lDrugNames
        );
      }
      this.grdResolve.Unselect(this.OSelectedAllowedToDiscontinue);
      let oMsgBox: iMessageBox = new iMessageBox();
      oMsgBox.MessageBoxClose = (s, e) => {
        this.oMsgBox_IsAllowDiscontinueCancelMessageBoxClose(s, e);
      };
      oMsgBox.Title = 'Information - Lorenzo';
      oMsgBox.Height = 160;
      oMsgBox.Width = 600;
      oMsgBox.MessageButton = MessageBoxButton.OK;
      oMsgBox.IconType = MessageBoxType.Information;
      oMsgBox.Message = Msg;
      oMsgBox.Show();
      return;
    }
    if (this.bIsInfDiscontinue && bContainInfusionItem) {
      iMsgBox.Title = 'LORENZO';
      iMsgBox.Message = Resource.Infusion.Infusion_DiscontinueCancel;
      iMsgBox.MessageButton = MessageBoxButton.OK;
      iMsgBox.IconType = MessageBoxType.Question;
      iMsgBox.Height = 150;
      iMsgBox.Width = 400;
      iMsgBox.MessageBoxClose = (s, e) => {
        // ObjectHelper.stopFinishAndCancelEvent(false);
        this.DiscontinueCancel_MessageBoxClose(s, e);
      };
      iMsgBox.Show();
      // ObjectHelper.stopFinishAndCancelEvent(true);
      return;
    }
    if (this.lstOrderSet.Count > 0) {
      iMsgBox.Title = 'LORENZO';
      iMsgBox.Message = String.Format(
        Resource.Orderset.DiscontinueMsg,
        String.Join(',', this.lstOrderSet.array)
      );
      iMsgBox.MessageButton = MessageBoxButton.OK;
      iMsgBox.IconType = MessageBoxType.Question;
      iMsgBox.Height = 150;
      iMsgBox.Width = 450;
      iMsgBox.MessageBoxClose = (s, e) => {
        this.DiscontinueCancelOrderSet_MessageBoxClose(s, e);
      };
      iMsgBox.Show();
      this.bIsOrdDiscontinue = true;
      return;
    }
    // Not Required for LHS. To be Re-Visited.
    if (!bContainInfusionItem) {
      this.LaunchDiscontinueCancel();
    }
  }
  private oMsgBox_IsAllowDiscontinueCancelMessageBoxClose(
    sender: Object,
    e: MessageEventArgs
  ): void {
    this.cmdDiscontinueCancel_Click(null, null);
  }

  LaunchDiscontinueCancel(): void {
    if (this.grdResolve.SelectedItems.Count > 0) {
      this.discanc = new meddiscontinuecancelChild();
      this.discanc.objSelectedData = Common.ConvertToSelectedPrescriptionItemVM(this.grdResolve.SelectedItems);
      this.discanc.OnAllergyClosedEvent = (s, e) => { this.discanc_OnAllergyClosedEvent(); };
      this.discanc.HelpCode = "DiscontinueCancel";
      this.discanc.CALanchFrom = PatientContext.PrescriptionType;
      let Callback = (s, e) => {
        if (s != null) {
          this.discanc = s;
        }
      }
      // ObjectHelper.stopFinishAndCancelEvent(true);
      AppActivity.OpenWindow("Discontinue/Cancel", this.discanc, (s, e) => { this.discanc_Closed(s); }, "Discontinue/Cancel", false, 500, 750, true, WindowButtonType.OkCancel, null, null, null, Callback);
    }
  }

  DiscontinueCancel_MessageBoxClose(sender: Object, e: MessageEventArgs): void {
    if (this.bIsInfDiscontinue && this.bIsOrdDiscontinue) {
      this.bIsOrdDiscontinue = false;
    } else if (this.bIsInfDiscontinue && !this.bIsOrdDiscontinue) {
      if (this.lstOrderSet != null && this.lstOrderSet.Count > 0) {
        let iMsgBox: iMessageBox = new iMessageBox();
        iMsgBox.Title = 'LORENZO';
        iMsgBox.Message = String.Format(
          Resource.Orderset.DiscontinueMsg,
          String.Join(',', this.lstOrderSet.array)
        );
        iMsgBox.MessageButton = MessageBoxButton.OK;
        iMsgBox.IconType = MessageBoxType.Question;
        iMsgBox.Height = 150;
        iMsgBox.Width = 450;
        iMsgBox.MessageBoxClose = (s, e) => {
          this.DiscontinueCancelOrderSet_MessageBoxClose(s, e);
        };
        iMsgBox.Show();
      }
      else {
        this.LaunchDiscontinueCancel();
      }
    }
    else if (!this.bIsInfDiscontinue && this.bIsOrdDiscontinue) {
      this.LaunchDiscontinueCancel();
    }
  }
  DiscontinueCancelOrderSet_MessageBoxClose(
    sender: Object,
    e: MessageEventArgs
  ): void {
    if (this.bIsInfDiscontinue && this.bIsOrdDiscontinue) {
      this.bIsOrdDiscontinue = false;
    }
    else if (this.bIsInfDiscontinue && !this.bIsOrdDiscontinue) {
      this.LaunchDiscontinueCancel();
    }
    else if (!this.bIsInfDiscontinue && this.bIsOrdDiscontinue) {
      this.LaunchDiscontinueCancel();
    }
  }

  discanc_OnAllergyClosedEvent(): void {
    if (this.oVM != null) {
      this.oVM.isReconcileserreq = true;
    }
    let oAllGrdRows: ObservableCollection<GrdDiscontinueCancelCols> = <
      ObservableCollection<GrdDiscontinueCancelCols>
      >this.discanc.grdDisCancelData1.ItemsSource;
    this.lastCancelDiscontinueOID =
      oAllGrdRows.Count > 0
        ? (<GrdDiscontinueCancelCols>(
          this.discanc.grdDisCancelData1.GetRowData(oAllGrdRows.Count - 1)
        )).PrescriptionItemOID
        : 0;
    let isPrescItemDataNotLoadFound: boolean = false;
    let dictCanDisSeqGroupInfo: Dictionary<number, number> = new Dictionary<
      number,
      number
    >();
    let dictAmendSeqGrpDetail: Dictionary<number, string> = new Dictionary<
      number,
      string
    >();
    let dictCanDisSeqGroupInfoNonIV: Dictionary<number, number> =
      new Dictionary<number, number>();
    let dictAmendSeqGrpDetailNonIV: Dictionary<number, string> = new Dictionary<
      number,
      string
    >();
    this.grdResolve.SelectedItems.forEach((oSelectedItem) => {
      let oSelRowbyindex: GrdDiscontinueCancelCols;
      for (let index: number = 0; index < oAllGrdRows.Count; index++) {
        oSelRowbyindex = <GrdDiscontinueCancelCols>(
          this.discanc.grdDisCancelData1.GetRowData(index)
        );
        if (
          oSelectedItem.PrescriptionItemOID ==
          oSelRowbyindex.PrescriptionItemOID
        ) {
          this.oItemVM = ObjectHelper.CreateType<PrescriptionItemVM>(
            this.grdResolve.SelectedItem,
            PrescriptionItemVM
          );
          if (
            oSelectedItem != null &&
            (String.Compare(
              oSelectedItem.ParentSourcePrescriptionType,
              'Medication clerking',
              StringComparison.OrdinalIgnoreCase
            ) == 0 ||
              String.Compare(
                oSelectedItem.ParentSourcePrescriptionType,
                PrescriptionTypes.Clerking,
                StringComparison.OrdinalIgnoreCase
              ) == 0)
          ) {
            if (this.oVM != null && this.oVM.MedsReconcile != null) {
              let ReconcileItem: IEnumerable<PrescriptionItemVM> =
                this.oVM.MedsReconcile.Where(
                  (item) =>
                    item.PrescriptionItemOID == oSelectedItem.ReorderItemOID
                ).Select((item) => item);
              if (ReconcileItem != null && ReconcileItem.Count() == 0) {
                this.oVM.isReconcileserreq = true;
              }
            }
          }
          oSelectedItem.DiscontinueCancelReason = oSelRowbyindex.SelectedReason;
          if (
            oSelectedItem.DiscontinueCancelReason != null &&
            !String.IsNullOrEmpty(
              oSelectedItem.DiscontinueCancelReason.DisplayText
            )
          ) {
            oSelectedItem.FormViewerDetails.BasicDetails.DiscontinueReason =
              oSelectedItem.DiscontinueCancelReason.DisplayText;
          }
          oSelectedItem.DiscontinueCancelAction = oSelRowbyindex.Action;
          oSelectedItem.sPatAllergyOIDs = oSelRowbyindex.sAllergyIDs;
          let sPresItemStatus: string = String.Empty;
          let dtCurrent: DateTime = CommonBB.GetServerDateTime();
          let dtStartDTTM: DateTime =
            oSelectedItem.FormViewerDetails.BasicDetails.StartPrescriptionTime;
          if (
            String.Equals(
              oSelectedItem.DiscontinueCancelAction,
              'Cancel',
              StringComparison.CurrentCultureIgnoreCase
            ) &&
            !String.Equals(
              oSelectedItem.FormViewerDetails.BasicDetails.InfusionType.Value,
              InfusionTypeCode.SINGLEDOSEVOLUME,
              StringComparison.InvariantCultureIgnoreCase
            )
          ) {
            sPresItemStatus = CConstants.CANCELLED;
            if (
              DateTime.Equals(dtStartDTTM, DateTime.MinValue) &&
              oSelectedItem.FormViewerDetails.BasicDetails.InfusionDetails !=
              null &&
              oSelectedItem.FormViewerDetails.BasicDetails.InfusionDetails
                .SequentialItemOrder > 0 &&
              oSelectedItem.FormViewerDetails.BasicDetails.InfusionDetails
                .ParentPrescriptionItemOID > 0
            ) {
              sPresItemStatus = CConstants.DISCONTINUED;
            }
          } else {
            sPresItemStatus = CConstants.DISCONTINUED;
            oSelectedItem.IsAdministratedDiscontinue =
              oSelRowbyindex.IsAdminiStrated;
            if (
              PatientContext.IsINFUSIONON &&
              String.Compare(
                PatientContext.PrescriptionType,
                PrescriptionTypes.ForAdministration,
                StringComparison.CurrentCultureIgnoreCase
              ) == 0 &&
              ((oSelectedItem.FormViewerDetails.BasicDetails.InfusionType !=
                null &&
                !String.IsNullOrEmpty(
                  oSelectedItem.FormViewerDetails.BasicDetails.InfusionType
                    .Value
                )) ||
                oSelectedItem.FormViewerDetails.BasicDetails.InfusionDetails
                  .IsOxygen ||
                oSelectedItem.FormViewerDetails.BasicDetails.itemSubType ==
                CConstants.SUBTYPE_GAS ||
                oSelectedItem.FormViewerDetails.BasicDetails.itemSubType ==
                CConstants.SUBTYPE_BLOOD) &&
              oSelectedItem.FormViewerDetails.BasicDetails.RecordAdmin ==
              null &&
              !oSelRowbyindex.IsAdminiStrated &&
              DateTime.GreaterThan(dtStartDTTM, dtCurrent) &&
              DateTime.GreaterThanOrEqualTo(dtStartDTTM.AddMinutes(-MedChartData.DuenessThreshold),
                dtCurrent) &&
              DateTime.GreaterThanOrEqualTo(dtStartDTTM.AddMinutes(MedChartData.DuenessThreshold), dtCurrent)
            ) {
              sPresItemStatus = CConstants.CANCELLED;
            }
            oSelectedItem.IsAdministratedDiscontinue =
              oSelRowbyindex.IsAdminiStrated;
            if (
              String.Compare(
                PatientContext.PrescriptionType,
                PrescriptionTypes.ForAdministration,
                StringComparison.CurrentCultureIgnoreCase
              ) == 0 &&
              oSelectedItem.FormViewerDetails.BasicDetails.SequenceInfo !=
              null &&
              oSelectedItem.FormViewerDetails.BasicDetails.SequenceInfo
                .GroupSequenceNo > 0 &&
              oSelectedItem.FormViewerDetails.BasicDetails.RecordAdmin ==
              null &&
              !oSelRowbyindex.IsAdminiStrated &&
              DateTime.GreaterThan(dtStartDTTM, dtCurrent) &&
              DateTime.GreaterThanOrEqualTo(dtStartDTTM.AddMinutes(-MedChartData.DuenessThreshold),
                dtCurrent) &&
              DateTime.GreaterThanOrEqualTo(dtStartDTTM.AddMinutes(MedChartData.DuenessThreshold), dtCurrent)
            ) {
              sPresItemStatus = CConstants.CANCELLED;
            }
          }
          if (
            oSelectedItem.FormViewerDetails.BasicDetails != null &&
            oSelectedItem.FormViewerDetails.BasicDetails.InfusionDetails !=
            null &&
            oSelectedItem.FormViewerDetails.BasicDetails.InfusionDetails
              .GroupSequenceNo > 0 &&
            this.oVM != null
          ) {
            let objInfVM: InfusionVM =
              CSequentialHelper.GetFirstDisCancelActiveItemInfusionVM(
                this.oVM.MedsResolve,
                oSelectedItem.FormViewerDetails.BasicDetails.InfusionDetails
                  .GroupSequenceNo
              );
            if (
              objInfVM != null &&
              objInfVM.ItemSequenceNo ==
              oSelectedItem.FormViewerDetails.BasicDetails.InfusionDetails
                .ItemSequenceNo
            ) {
              if (
                !dictAmendSeqGrpDetail.ContainsKey(
                  oSelectedItem.FormViewerDetails.BasicDetails.InfusionDetails
                    .GroupSequenceNo
                )
              ) {
                let sInfo: string =
                  sPresItemStatus +
                  '~' +
                  oSelectedItem.FormViewerDetails.BasicDetails
                    .StartPrescriptionTime;
                dictAmendSeqGrpDetail.Add(
                  oSelectedItem.FormViewerDetails.BasicDetails.InfusionDetails
                    .GroupSequenceNo,
                  sInfo
                );
              }
            }
            if (
              !dictCanDisSeqGroupInfo.ContainsKey(
                oSelectedItem.FormViewerDetails.BasicDetails.InfusionDetails
                  .GroupSequenceNo
              )
            ) {
              dictCanDisSeqGroupInfo.Add(
                oSelectedItem.FormViewerDetails.BasicDetails.InfusionDetails
                  .GroupSequenceNo,
                oSelectedItem.FormViewerDetails.BasicDetails.InfusionDetails
                  .ItemSequenceNo + 1
              );
            }
          }
          if (
            oSelectedItem.FormViewerDetails.BasicDetails != null &&
            oSelectedItem.FormViewerDetails.BasicDetails.SequenceInfo != null &&
            oSelectedItem.FormViewerDetails.BasicDetails.SequenceInfo
              .GroupSequenceNo > 0 &&
            this.oVM != null
          ) {
            let objSeqVM: SequenceDetail =
              CommonSequentialHelper.GetFirstDiscancelActiveItemSeqItemVM(
                this.oVM.MedsResolve,
                oSelectedItem.FormViewerDetails.BasicDetails.SequenceInfo
                  .GroupSequenceNo
              );
            if (
              objSeqVM != null &&
              objSeqVM.ItemSequenceNo ==
              oSelectedItem.FormViewerDetails.BasicDetails.SequenceInfo
                .ItemSequenceNo
            ) {
              if (
                !dictAmendSeqGrpDetailNonIV.ContainsKey(
                  oSelectedItem.FormViewerDetails.BasicDetails.SequenceInfo
                    .GroupSequenceNo
                )
              ) {
                let sInfo: string =
                  sPresItemStatus +
                  '~' +
                  oSelectedItem.FormViewerDetails.BasicDetails
                    .StartPrescriptionTime;
                dictAmendSeqGrpDetailNonIV.Add(
                  oSelectedItem.FormViewerDetails.BasicDetails.SequenceInfo
                    .GroupSequenceNo,
                  sInfo
                );
              }
            }
            if (
              !dictCanDisSeqGroupInfoNonIV.ContainsKey(
                oSelectedItem.FormViewerDetails.BasicDetails.SequenceInfo
                  .GroupSequenceNo
              )
            ) {
              dictCanDisSeqGroupInfoNonIV.Add(
                oSelectedItem.FormViewerDetails.BasicDetails.SequenceInfo
                  .GroupSequenceNo,
                oSelectedItem.FormViewerDetails.BasicDetails.SequenceInfo
                  .ItemSequenceNo + 1
              );
            }
          }
          if (
            oSelectedItem.FormViewerDetails.BasicDetails != null &&
            oSelectedItem.FormViewerDetails.BasicDetails.InfusionDetails !=
            null &&
            oSelectedItem.FormViewerDetails.BasicDetails.InfusionType != null &&
            (oSelectedItem.FormViewerDetails.BasicDetails.InfusionType.Value ==
              InfusionTypeCode.CONTINUOUS ||
              oSelectedItem.FormViewerDetails.BasicDetails.InfusionType.Value ==
              InfusionTypeCode.SINGLEDOSEVOLUME ||
              oSelectedItem.FormViewerDetails.BasicDetails.InfusionType.Value ==
              InfusionTypeCode.FLUID) &&
            oSelectedItem.FormViewerDetails.BasicDetails.InfusionDetails
              .ParentPrescriptionItemOID > 0
          ) {
            oSelectedItem.FormViewerDetails.BasicDetails.InfusionDetails.IsSequentiallinkvisi =
              Visibility.Collapsed;
            oSelectedItem.FormViewerDetails.BasicDetails.IsSequentiallinkvisi =
              Visibility.Collapsed;
          }
          if (
            oSelectedItem.FormViewerDetails.BasicDetails != null &&
            oSelectedItem.FormViewerDetails.BasicDetails.SequenceInfo != null &&
            oSelectedItem.FormViewerDetails.BasicDetails.SequenceInfo
              .ParentPrescriptionItemOID > 0 &&
            oSelectedItem.FormViewerDetails.BasicDetails.SequenceInfo
              .GroupSequenceNo > 0
          ) {
            oSelectedItem.FormViewerDetails.BasicDetails.SequenceInfo.IsSequentiallinkvisi =
              Visibility.Collapsed;
            oSelectedItem.FormViewerDetails.BasicDetails.IsSequentiallinkvisi =
              Visibility.Collapsed;
          }
          oSelectedItem.PrescriptionItemStatus = sPresItemStatus;
          oSelectedItem.OperationMode = 'M';
          if (
            DateTime.NotEquals(oSelectedItem.FormViewerDetails.BasicDetails.DCCalDTTM,
              DateTime.MinValue) &&
            (oSelectedItem.IsDoseCalcPerformed ||
              oSelectedItem.FormViewerDetails.BasicDetails.IsDoseCalcExist) &&
            oSelectedItem.FormViewerDetails.BasicDetails.DoseCalcExist.Equals(
              '2'
            )
          ) {
            oSelectedItem.FormViewerDetails.BasicDetails.DoseCalcExist = '1';
          }
          break;
        }
      }
      oSelectedItem.IsItemDisOrCan = true;
      oSelectedItem.DisCanitemRecorderIconenable(oSelectedItem);
      if (this.oVM == null) {
        this.oVM = new MedicationPrescribeVM();
      }
      if (
        this.oVM != null &&
        !String.IsNullOrEmpty(oSelectedItem.PrescriptionItemStatus) &&
        (oSelectedItem.PrescriptionItemStatus == CConstants.DISCONTINUED ||
          oSelectedItem.PrescriptionItemStatus == CConstants.CANCELLED)
      ) {
        if (this.oVM.MedsDisCan == null) {
          this.oVM.MedsDisCan = new ObservableCollection<PrescriptionItemVM>();
        }
        this.oVM.MedsDisCan.Add(oSelectedItem);
        this.ReevaluateRHSPipe(oSelectedItem);
      }
    });
    if (
      dictAmendSeqGrpDetail != null &&
      dictAmendSeqGrpDetail.Count() > 0 &&
      this.oVM != null
    ) {
      CSequentialHelper.ResetStartDTTM4ActiveFirstItemBasedOnCanDisAction(
        this.oVM.MedsResolve,
        dictAmendSeqGrpDetail
      );
    }
    if (
      dictCanDisSeqGroupInfo != null &&
      dictCanDisSeqGroupInfo.Count() > 0 &&
      this.oVM != null
    ) {
      CSequentialHelper.ResetItemSequence_StartDTTMOnCanDis(
        this.oVM.MedsResolve,
        dictCanDisSeqGroupInfo,
        ActivityTypes.Amend
      );
    }
    if (
      dictAmendSeqGrpDetailNonIV != null &&
      dictAmendSeqGrpDetailNonIV.Count() > 0 &&
      this.oVM != null
    ) {
      CommonSequentialHelper.ResetStartDTTM4ActiveFirstItemBasedOnCanDisAction(
        this.oVM.MedsResolve,
        dictAmendSeqGrpDetailNonIV
      );
    }
    if (
      dictCanDisSeqGroupInfoNonIV != null &&
      dictCanDisSeqGroupInfoNonIV.Count() > 0 &&
      this.oVM != null
    ) {
      CommonSequentialHelper.ResetItemSequence_StartDTTMOnCanDis(
        this.oVM.MedsResolve,
        dictCanDisSeqGroupInfoNonIV,
        ActivityTypes.Amend
      );
    }
    let SelIndecies: number[] = this.grdResolve.GetSelectedRowsIndexByOrder();
    if (SelIndecies != null) {
      let nLen: number = SelIndecies.length;
      this.oVM.UpdateConflicts(SelIndecies[nLen - 1], '');
    }
    if (!isPrescItemDataNotLoadFound) {
      this.grdResolve.Rebind();
    }
    if (
      !Common.IsClosedEncounter() &&
      MedicationCommonProfileData.PrescribeConfig != null &&
      MedicationCommonProfileData.PrescribeConfig.EnableDoseCalc
    ) {
      let oTmp = this.oVM.MedsResolve.Where((C) =>
       C.FormViewerDetails.BasicDetails.DoseCalcExist == "2"
      ).ToList();
      if (oTmp != null && oTmp.Count > 0) {
        if (this.oVM.IsVisibleHWIndicator == Visibility.Collapsed) {
          this.oVM.IsVisibleHWIndicator = Visibility.Visible;
        }
      } else {
        if (this.oVM.IsVisibleHWIndicator == Visibility.Visible) {
          this.oVM.IsVisibleHWIndicator = Visibility.Collapsed;
        }
      }
    }
    this.cmdDiscontinueCancel.IsEnabled = false;
    this.cmdDiscontinueCancel.Visibility = Visibility.Collapsed;
    this.DisableLinks();
    this.discanc.appDialog.DialogResult = true;
    this.grdResolve.UnselectAll(this.SelectCheckbox);
  }
  CanDisDueNowSlotForInfIntermittent(
    oAdminScheduleTime: ObservableCollection<DateTime>
  ): boolean {
    let dtCurrent: DateTime = CommonBB.GetServerDateTime();
    if (oAdminScheduleTime != null && oAdminScheduleTime.Count > 0) {
      let DataDueNowSlot = oAdminScheduleTime
        .Where(
          (oSlotDateTime) =>
            oSlotDateTime.AddMinutes(-MedChartData.DuenessThreshold) <=
              dtCurrent ||
            dtCurrent >= oSlotDateTime.AddMinutes(MedChartData.DuenessThreshold)
        )
        .Select((oSlotDateTime) => oSlotDateTime);

      if (DataDueNowSlot != null && DataDueNowSlot.Count() > 0) {
        return true;
      }
    }
    return false;
  }

  discanc_Closed(args: AppDialogEventargs): void {
    if (args.Result == AppDialogResult.Ok) {
      // ObjectHelper.stopFinishAndCancelEvent(false);
      CommonFlags.bDiscontinueCancelClicked = true;
      this.discanc.OKButtonClick();
      if (this.discanc.isValid)
       // this.ClearCheckboxSelection();

      if (
        GlobalVariable.IsGPConnectEnabled &&
        this.oItemVM != null &&
        (String.Equals(
          PatientContext.PrescriptionType,
          PrescriptionTypes.Clerking,
          StringComparison.InvariantCultureIgnoreCase
        ) ||
          (String.Equals(
            PatientContext.PrescriptionType,
            PrescriptionTypes.ForAdministration,
            StringComparison.InvariantCultureIgnoreCase
          ) &&
            PatientContext.ClerkFormViewDefaultBehavior ==
            ClerkFormViewDeftBehaviour.LaunchFormMandatory))
      ) {
        Common.EnableGPCConnectLHSArrows(args);
      }
    } else if (args.Result == AppDialogResult.Cancel) {
      CommonFlags.bDiscontinueCancelClicked = false;
      this.discanc.CancelButtonClick();
    }
  }
  ReevaluateRHSPipe(item: any){
    let medotherdisplaypipe = new DisplayOtherInformationLineItemPipe1();
    item.MedOtherDisplay1 = medotherdisplaypipe.transform(item, '', 0,'');
    let medlinedisplaypipe = new DisplayPrescriptionLineItemPipe1();
    item.MedLineDisplay = medlinedisplaypipe.transform(item, '', 0, '');
    let infoIconKey = new InfoIconPipe();
    item.InfoIconKey = infoIconKey.transform(item, '', 0, '');
    item.mode = 'update';
  }
  private DisableLinks(): void {
    if (
      MedicationCommonProfileData.MedViewConfig != null &&
      !String.IsNullOrEmpty(
        MedicationCommonProfileData.MedViewConfig.OtherLinks
      )
    ) {
      this.cmdOtherLinks.IsEnabled = true;
    } else {
      this.cmdOtherLinks.IsEnabled = false;
    }
    if (this.bIsAmedItemUnHold) {
      this.bIsAmedItemUnHold = false;
    } else {
    }
    this.IsAllSelItemsHold = false;
    this.IsAllSelItemsUnHold = false;
    this.cmdLinks.IsEnabled = false;
    //this.cmdAddFavourites.IsEnabled = false;
    this.cmdRemove.IsEnabled = false;
    this.cmdRemove.Visibility = Visibility.Collapsed;
    this.cmdObservationResults.IsEnabled = false;
  }
  
  cmdReconcile_Click_Fun = (s, e) => { 
    Object.keys(that).forEach((prop) => (this[prop] = that[prop]));
    this.cmdReconcile_Click(s, e); }
private cmdReconcile_Click(sender: Object, e: any): void {
  this.oVM.IsreconcileClick = true;
  this.oVM.GetNonReconciledItems();
}
 
cmdSummary_click_Fun = (s, e) =>{ this.cmdSummary_Click(s,e)}
public cmdSummary_Click(sender: Object, e: RoutedEventArgs): void {
  if (!String.IsNullOrEmpty(GlobalVariable.NhsNumber)) {
    let sResult: string = String.Empty;
    sResult = ObjectHelper.CreateType<string>(
      HtmlPage.Window.Invoke('LaunchGPCSummaryView'),
      'string'
    );
  }
}

  cmdprint_Click_Func = (s, e) => {
    Object.keys(that).forEach((prop) => (this[prop] = that[prop]));
    this.cmdprintprescri(s, e);
  }
  cmdLink_Click_Func = (s, e) => {
    Object.keys(that).forEach((prop) => (this[prop] = that[prop]));
    this.cmdLinks_Click(s, e);
  }

  private cmdprintprescri(sender: Object, e: RoutedEventArgs): void {
    let itemsMandatory: IEnumerable<string> = this.DataContext.MedsResolve.Where(
      (oItems) =>
        (String.Compare(
          oItems.OperationMode,
          'N',
          StringComparison.OrdinalIgnoreCase
        ) == 0 ||
          oItems.OperationMode == null) &&
        (oItems.TrafficSymbol == ConflictIcons.Red ||
          oItems.TrafficIconResolve == ConflictIcons.Red) &&
        !String.Equals(
          oItems.PrescriptionItemStatus,
          PrescriptionItemStatusCodes.COMPLETED,
          StringComparison.InvariantCultureIgnoreCase
        ) &&
        !String.Equals(
          oItems.PrescriptionItemStatus,
          PrescriptionItemStatusCodes.DISCONTINUED,
          StringComparison.InvariantCultureIgnoreCase
        ) &&
        !String.Equals(
          oItems.PrescriptionItemStatus,
          PrescriptionItemStatusCodes.CANCELLED,
          StringComparison.InvariantCultureIgnoreCase
        )
    ).Select(
      (oItems) => oItems.FormViewerDetails.BasicDetails.IdentifyingName
    );

      let oSMedp: medreprint = new medreprint();
      oSMedp.DataContext = this.DataContext;
      let oSMedpCallBack = (s, e) => { oSMedp = s; };
      // ObjectHelper.stopFinishAndCancelEvent(true);
      AppActivity.OpenWindow("Print", oSMedp, (s, e) => { this.objmedreprintView_Closed(s); }, "", false, 460, 900, false, WindowButtonType.OkCancel, null, null, null, oSMedpCallBack);
  }
  objmedreprintView_Closed(args: AppDialogEventargs): void {
    // ObjectHelper.stopFinishAndCancelEvent(false);
    if (args.Result == AppDialogResult.Cancel || args.Result == AppDialogResult.Close) {
      this.DataContext.MedsPrint.forEach((oPresItemVM) => {
        oPresItemVM.FormViewerDetails.BasicDetails.PrintStationaryType = null;
      });
    }
    // ObjectHelper.stopFinishAndCancelEvent(false);
    args.AppChildWindow.DialogResult = true;
  }

  cmdOtherLinks_Click_Fun = (s, e) => {
    Object.keys(that).forEach((prop) => (this[prop] = that[prop]));
    this.cmdOtherLinks_Click(s, e)
  }

  async cmdOtherLinks_Click(sender: Object, e: RoutedEventArgs): Promise<void> {
    await HtmlPage.Window.Invoke('LaunchOtherLinks', null);
  }

  //Not Required for LHS. To be Re-Visited.
  /*
        private cmdAddFavourites_Click(sender: Object, e: RoutedEventArgs): void {
            if (this.grdResolve.GetSelectedRowCount() > 0) {
                this.objmedaddtofavouritesChild = new medaddtofavouritesChild(this.grdResolve.SelectedItems, this.oVM);
                this.objmedaddtofavouritesChild.objAddtoFavoritesBottom = new AddtoFavoritesBottom();
                this.objmedaddtofavouritesChild.objAddtoFavoritesBottom.DataContext = this.objmedaddtofavouritesChild.DataContext;
                AppActivity.OpenWindow("Add to favourites", this.objmedaddtofavouritesChild, (s,e)=>{this.medaddtofavouritesChild_Closed(s);}, "", false, 470, 615, false, WindowButtonType.Close, this.objmedaddtofavouritesChild.objAddtoFavoritesBottom);
            }
        }
    */
        public cmdMedAdmin_Click(sender: Object, e: RoutedEventArgs): void {
            MedicationCommonBB.LaunchMedChart(PatientContext.PatientOID, PatientContext.EncounterOid, PatientContext.EncounterType, "Prescribe");
        }
    /*
        private medaddtofavouritesChild_Closed(args: AppDialogEventargs): void {
            if (args.Result == AppDialogResult.Close || args.Result == AppDialogResult.Cancel) {
                this.objmedaddtofavouritesChild.cmdClose_Click();
                this.objmedaddtofavouritesChild.appDialog.DialogResult = true;
            }
        }
    */
          
        public cmdLinks_Click(sender: Object, e: RoutedEventArgs): void {
            let objProcessingItemVM: PrescriptionItemVM = ObjectHelper.CreateType<PrescriptionItemVM>(this.grdResolve.SelectedItem, PrescriptionItemVM);
            if (this.grdResolve.GetSelectedRowCount() > 1) {
                this.grdResolve.SelectedItems.forEach( (objItemVM)=> {
                    let oItmVM: PrescriptionItemVM = ObjectHelper.CreateType<PrescriptionItemVM>(objItemVM, PrescriptionItemVM);
                    if (oItmVM != null && !oItmVM.IsGroupHeader) {
                        objProcessingItemVM = oItmVM;
                    }
                });
            }
            if (objProcessingItemVM != null && objProcessingItemVM.FormViewerDetails != null && objProcessingItemVM.FormViewerDetails.BasicDetails != null) {
                let objMonoGraphVM: MonoGraphVM = new MonoGraphVM();
                let MCIItemCount: number = 0;
                let MCIIdentifyingOID: number = 0;
                let MCIIdentifyingType: string;
                let MCIIdentifyingName: string;
                let MonographParams: ObservableCollection<CListItem> = new ObservableCollection<CListItem>();
                if (String.Compare(objProcessingItemVM.FormViewerDetails.BasicDetails.itemSubType, CConstants.SUBTYPE) == 0) {
                    if (String.Compare(objProcessingItemVM.LorenzoID, CommonFlags.MClorenzoid, StringComparison.OrdinalIgnoreCase) == 0) {
                        MCIIdentifyingOID = objProcessingItemVM.FormViewerDetails.BasicDetails.IdentifyingOID;
                        MCIIdentifyingType = objProcessingItemVM.FormViewerDetails.BasicDetails.IdentifyingType;
                        let MonographParamDet: CListItem = new CListItem();
                        MonographParamDet.DisplayText = MedCommonBBConstants.NOTANPREDEFMCI;
                        MonographParamDet.Value = Convert.ToString(MCIIdentifyingOID);
                        MonographParamDet.Tag = MCIIdentifyingType;
                        MonographParams.Add(MonographParamDet);
                    }
                    else {
                        MCIIdentifyingOID = objProcessingItemVM.FormViewerDetails.BasicDetails.IdentifyingOID;
                        MCIIdentifyingType = objProcessingItemVM.FormViewerDetails.BasicDetails.IdentifyingType;
                        MCIIdentifyingName = objProcessingItemVM.FormViewerDetails.BasicDetails.SIdentifyingoriginalname;
                        if (MCIIdentifyingOID > 0 && !String.IsNullOrEmpty(MCIIdentifyingType) && !String.IsNullOrEmpty(MCIIdentifyingName)) {
                            let MonographParamDet: CListItem = new CListItem();
                            MonographParamDet.DisplayText = MCIIdentifyingName;
                            MonographParamDet.Value = Convert.ToString(MCIIdentifyingOID);
                            MonographParamDet.Tag = MCIIdentifyingType;
                            MonographParams.Add(MonographParamDet);
                        }
                    }
                    if (objProcessingItemVM.FormViewerDetails.MulticomponentDetails != null && objProcessingItemVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo != null) {
                        MCIItemCount = objProcessingItemVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo.Count;
                        if (MCIItemCount > 0) {
                            for (let iCnt: number = 0; iCnt < MCIItemCount; iCnt++) {
                                MCIIdentifyingOID = objProcessingItemVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo[iCnt].IdentifyingOID;
                                MCIIdentifyingType = objProcessingItemVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo[iCnt].IdentifyingType;
                                MCIIdentifyingName = objProcessingItemVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo[iCnt].ComponentName;
                                if (MCIIdentifyingOID > 0 && !String.IsNullOrEmpty(MCIIdentifyingType) && !String.IsNullOrEmpty(MCIIdentifyingName)) {
                                    let MonographParamDet: CListItem = new CListItem();
                                    MonographParamDet.DisplayText = MCIIdentifyingName;
                                    MonographParamDet.Value = Convert.ToString(MCIIdentifyingOID);
                                    MonographParamDet.Tag = MCIIdentifyingType;
                                    MonographParams.Add(MonographParamDet);
                                }
                            }
                        }
                    }
                    else if (objProcessingItemVM.MCChilditem != null) {
                        let MultiCOmpChilds: string[] = objProcessingItemVM.MCChilditem.Split(CConstants.MULTICOMPONENT_SPLIT);
                        let MultiCompChildsCount: number = 0;
                        if (MultiCOmpChilds != null) {
                            MultiCompChildsCount = MultiCOmpChilds.length;
                            if (MultiCompChildsCount > 0) {
                                for (let iCnt: number = 0; iCnt < MultiCompChildsCount; iCnt++) {
                                    let MultiCOmpChildsDet: string[] = MultiCOmpChilds[iCnt].Split(CConstants.MULTIROUTE_ROUTE);
                                    let MultiCompChildsDetCount: number = 0;
                                    if (MultiCOmpChildsDet != null) {
                                        MultiCompChildsDetCount = MultiCOmpChildsDet.length;
                                        if (MultiCompChildsDetCount > 0) {
                                            if (!String.IsNullOrEmpty(MultiCOmpChildsDet[0]) && !String.IsNullOrEmpty(MultiCOmpChildsDet[1]) && !String.IsNullOrEmpty(MultiCOmpChildsDet[2])) {
                                                MCIIdentifyingOID = Convert.ToInt64(MultiCOmpChildsDet[0]);
                                                MCIIdentifyingType = MultiCOmpChildsDet[1];
                                                MCIIdentifyingName = MultiCOmpChildsDet[2];
                                                if (MCIIdentifyingOID > 0) {
                                                    let MonographParamDet: CListItem = new CListItem();
                                                    MonographParamDet.DisplayText = MCIIdentifyingName;
                                                    MonographParamDet.Value = Convert.ToString(MCIIdentifyingOID);
                                                    MonographParamDet.Tag = MCIIdentifyingType;
                                                    MonographParams.Add(MonographParamDet);
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                else {
                    MCIIdentifyingOID = objProcessingItemVM.FormViewerDetails.BasicDetails.IdentifyingOID;
                    MCIIdentifyingType = objProcessingItemVM.FormViewerDetails.BasicDetails.IdentifyingType;
                    MCIIdentifyingName = objProcessingItemVM.FormViewerDetails.BasicDetails.IdentifyingName;
                    if (MCIIdentifyingOID > 0 && !String.IsNullOrEmpty(MCIIdentifyingType) && !String.IsNullOrEmpty(MCIIdentifyingName)) {
                        let MonographParamDet: CListItem = new CListItem();
                        MonographParamDet.DisplayText = MCIIdentifyingName;
                        MonographParamDet.Value = Convert.ToString(MCIIdentifyingOID);
                        MonographParamDet.Tag = MCIIdentifyingType;
                        MonographParams.Add(MonographParamDet);
                    }
                }
                MedicationCommonBB.OnMonographLinkClick(MonographParams);
            }
        }








  cmdRemove_Click_Func = (s, e) => {
    this.cmdRemove_Click(s, e);
    let index = this.oVM.MedsResolve.ToArray().findIndex(t => !t.IsGroupHeader && t.PrescriptionItemOID == 0)
    if(index == -1)
    this.oAppDialogResult = undefined;
  };
  private cmdRemove_Click(sender: Object, e: RoutedEventArgs): void {
    let selectedRemoveItems: IEnumerable<PrescriptionItemVM> =
      this.grdResolve.SelectedItems.Cast<PrescriptionItemVM>();
    if (selectedRemoveItems != null && selectedRemoveItems.Count() > 0) {
      let IsIdentifySequentialPrescItem: boolean = false;
      for (let i = 0 ; i< selectedRemoveItems.Count(); i++) {
        let oRemoveItem: PrescriptionItemVM = selectedRemoveItems[i];      
        if (
          oRemoveItem.formViewerDetails != null &&
          oRemoveItem.formViewerDetails.BasicDetails != null &&
          oRemoveItem.formViewerDetails.BasicDetails.InfusionDetails != null &&
          oRemoveItem.formViewerDetails.BasicDetails.InfusionDetails
            .GroupSequenceNo > 0 &&
          oRemoveItem.formViewerDetails.BasicDetails.InfusionDetails
            .ItemSequenceNo > 0
        ) {
          IsIdentifySequentialPrescItem = true;
          break;
        }
        if (
          oRemoveItem.formViewerDetails != null &&
          oRemoveItem.formViewerDetails.BasicDetails != null &&
          oRemoveItem.formViewerDetails.BasicDetails.SequenceInfo != null &&
          oRemoveItem.formViewerDetails.BasicDetails.SequenceInfo
            .GroupSequenceNo > 0 &&
          oRemoveItem.formViewerDetails.BasicDetails.SequenceInfo
            .ItemSequenceNo > 0
        ) {
          IsIdentifySequentialPrescItem = true;
          break;
        }
      }
      if (IsIdentifySequentialPrescItem) {
        let oMsgBox: iMessageBox = ObjectHelper.CreateObject(
          new iMessageBox(),
          {
            Title: 'LORENZO',
            Message: Resource.Infusion.SequentialRemoveAlert_Message,
            MessageButton: MessageBoxButton.YesNo,
            IconType: MessageBoxType.Question,
          }
        );
        oMsgBox.MessageBoxClose = (s, e) => {
          this.SequentialRemove_MessageBoxClose(s, e);
        };
        oMsgBox.Show();
      } else {
        this.RemovePrescribeItems();
      }
    }
  }
  SequentialRemove_MessageBoxClose(sender: Object, e: MessageEventArgs): void {
    if (e.MessageBoxResult == MessageBoxResult.Yes) {
      this.RemovePrescribeItems();
    }
  }
  private RemovePrescribeItems(): void {
    this.oVM.isReconcileserreq = true;
    this.oItemVM = ObjectHelper.CreateType<PrescriptionItemVM>(
      this.grdResolve.SelectedItem,
      PrescriptionItemVM
    );
    if (
      this.oItemVM != null &&
      (String.Compare(
        this.oItemVM.SourcePrescriptionType,
        'Medication clerking',
        StringComparison.OrdinalIgnoreCase
      ) == 0 ||
        String.Compare(
          this.oItemVM.SourcePrescriptionType,
          PrescriptionTypes.Clerking,
          StringComparison.OrdinalIgnoreCase
        ) == 0 ||
        PatientContext.ClerkFormViewDefaultBehavior ==
          ClerkFormViewDeftBehaviour.LaunchFormMandatory) &&
      this.oItemVM.ActionCode == ActivityTypes.Reorder
    ) {
      if (this.oVM != null && this.oVM.MedsReorder != null) {
        if (this.oVM.MedsReorder.Contains(this.oItemVM)) {
          this.oItemVM.PrescriptionOID = this.oItemVM.SourcePresOid;
          this.oItemVM.PrescriptionItemOID = this.oItemVM.SourcePrescriptionOid;
          this.oVM.MedsReorder.Remove(this.oItemVM);
        }
      }
      if (this.oVM != null && this.oVM.MedsReconcile != null) {
        let ReconcileItem: IEnumerable<PrescriptionItemVM> =
          this.oVM.MedsReconcile.Where(
            (item) => item.LorenzoID == this.oItemVM.LorenzoID
          ).Select((item) => item);

        if (ReconcileItem != null && ReconcileItem.Count() == 0) {
          this.oItemVM.ReconcileReason = this.oVM.oLstItemReconcileCombo;
          this.oVM.MedsReconcile.Add(this.oItemVM);
        }
      }
    }
    let _UniqueGroupSequenceNo: IEnumerable<number> = null;
    let _UniqueGroupSequenceNo4NonIV: IEnumerable<number> = null;
    let _AmendedItemRemovedGroups: List<number> = null;
    let _OtherItemRemovedGroups: List<number> = null;
    let _AmendedItemRemovedGroups4NonIV: List<number> = null;
    let _OtherItemRemovedGroups4NonIV: List<number> = null;
    if (this.grdResolve.SelectedItems != null) {
      _AmendedItemRemovedGroups = new List<number>();
      _OtherItemRemovedGroups = new List<number>();
      _AmendedItemRemovedGroups4NonIV = new List<number>();
      _OtherItemRemovedGroups4NonIV = new List<number>();
      let selectedRemoveItems: IEnumerable<PrescriptionItemVM> =
        this.grdResolve.SelectedItems.Cast<PrescriptionItemVM>();
      if (selectedRemoveItems != null && selectedRemoveItems.Count() > 0) {
        let _SeqItems: IEnumerable<PrescriptionItemVM> =
          selectedRemoveItems.Where(
            (i) =>
              !i.IsGroupHeader &&
              i.FormViewerDetails != null &&
              i.FormViewerDetails.BasicDetails != null &&
              i.formViewerDetails.BasicDetails.InfusionType != null &&
              !String.IsNullOrEmpty(
                i.formViewerDetails.BasicDetails.InfusionType.Value
              ) &&
              i.formViewerDetails.BasicDetails.InfusionDetails != null &&
              i.formViewerDetails.BasicDetails.InfusionDetails.GroupSequenceNo >
                0 &&
              i.formViewerDetails.BasicDetails.InfusionDetails.ItemSequenceNo >
                0
          );
        if (_SeqItems != null && _SeqItems.Count() > 0) {
          _UniqueGroupSequenceNo = _SeqItems
            .Select(
              (i) =>
                i.formViewerDetails.BasicDetails.InfusionDetails.GroupSequenceNo
            )
            .Distinct()
            .ToList()
            .AsEnumerable();
        }
        _SeqItems = selectedRemoveItems.Where(
          (i) =>
            !i.IsGroupHeader &&
            i.FormViewerDetails != null &&
            i.FormViewerDetails.BasicDetails != null &&
            i.formViewerDetails.BasicDetails.SequenceInfo != null &&
            i.formViewerDetails.BasicDetails.SequenceInfo.GroupSequenceNo > 0 &&
            i.formViewerDetails.BasicDetails.SequenceInfo.ItemSequenceNo > 0
        );
        if (_SeqItems != null && _SeqItems.Count() > 0) {
          _UniqueGroupSequenceNo4NonIV = _SeqItems
            .Select(
              (i) =>
                i.formViewerDetails.BasicDetails.SequenceInfo.GroupSequenceNo
            )
            .Distinct()
            .ToList()
            .AsEnumerable();
        }
      }
      let IsRebindResolveGrd: boolean = false;
      selectedRemoveItems.forEach((oRemoveItem) => {
        if (oRemoveItem.ActionCode == ActivityTypes.Reorder) {
          this.oVM.EnableReorderedItemAfterRemove(oRemoveItem);
        } else if (
          oRemoveItem.ActionCode == ActivityTypes.Amend ||
          oRemoveItem.ActionCode == ActivityTypes.UnHold
        ) {
          let sourceItem: IEnumerable<PrescriptionItemVM> =
            this.oVM.MedsResolve.Where(
              (item) =>
                item.PrescriptionItemOID == oRemoveItem.SourcePrescriptionOid
            ).Select((item) => item);

          if (sourceItem != null && sourceItem.Count() > 0) {
            sourceItem.First().PrescriptionItemStatus =
              sourceItem.First().PrescriptionItemStatusCode;
            sourceItem.First().IsAmendCompletedStatus = false;
            if (
              sourceItem.First().FormViewerDetails != null &&
              sourceItem.First().FormViewerDetails.BasicDetails != null
            ) {
              sourceItem.First().FormViewerDetails.BasicDetails.ReasonforModification =
                null;
              sourceItem.First().FormViewerDetails.BasicDetails.EndDTTM =
                sourceItem.First().FormViewerDetails.BasicDetails.OrginalEndDTTM;
              sourceItem.First().FormViewerDetails.BasicDetails.StopDate =
                sourceItem.First().FormViewerDetails.BasicDetails.OrginalEndDTTM;
              if (
                !Common.IsClosedEncounter() &&
                sourceItem
                  .First()
                  .FormViewerDetails.BasicDetails.PreviousDoseCalcExist?.Equals(
                    '2'
                  )
              ) {
                sourceItem.First().FormViewerDetails.BasicDetails.DoseCalcExist =
                  '2';
                IsRebindResolveGrd = true;
              }
            }
            if (
              sourceItem.First().FormViewerDetails != null &&
              sourceItem.First().FormViewerDetails.BasicDetails != null &&
              sourceItem.First().FormViewerDetails.BasicDetails
                .InfusionDetails != null &&
              sourceItem.First().FormViewerDetails.BasicDetails.InfusionDetails
                .GroupSequenceNo > 0 &&
              sourceItem.First().FormViewerDetails.BasicDetails.InfusionDetails
                .ItemSequenceNo > 0 &&
              sourceItem.First().FormViewerDetails.BasicDetails.InfusionDetails
                .PrescriptionItemNumber > 0
            ) {
              sourceItem.First().FormViewerDetails.BasicDetails.InfusionDetails.IsSequentiallinkvisi =
                Visibility.Visible;
              sourceItem.First().FormViewerDetails.BasicDetails.IsSequentiallinkvisi =
                Visibility.Visible;
              if (
                !String.IsNullOrEmpty(sourceItem.First().PreviousOperationMode)
              ) {
                sourceItem.First().OperationMode =
                  sourceItem.First().PreviousOperationMode;
              }
            } else if (
              sourceItem.First().FormViewerDetails != null &&
              sourceItem.First().FormViewerDetails.BasicDetails != null &&
              sourceItem.First().FormViewerDetails.BasicDetails.SequenceInfo !=
                null &&
              sourceItem.First().FormViewerDetails.BasicDetails.SequenceInfo
                .GroupSequenceNo > 0 &&
              sourceItem.First().FormViewerDetails.BasicDetails.SequenceInfo
                .ItemSequenceNo > 0 &&
              sourceItem.First().FormViewerDetails.BasicDetails.SequenceInfo
                .PrescriptionItemNumber > 0
            ) {
              sourceItem.First().FormViewerDetails.BasicDetails.SequenceInfo.IsSequentiallinkvisi =
                Visibility.Visible;
              sourceItem.First().FormViewerDetails.BasicDetails.IsSequentiallinkvisi =
                Visibility.Visible;
              if (
                !String.IsNullOrEmpty(sourceItem.First().PreviousOperationMode)
              ) {
                sourceItem.First().OperationMode =
                  sourceItem.First().PreviousOperationMode;
              }
            } else {
              sourceItem.First().OperationMode = null;
            }
            if (
              sourceItem.First().FormViewerDetails.BasicDetails
                .oOriginalValues != null
            ) {
              sourceItem.First().FormViewerDetails.BasicDetails.StopPrescriptionTime =
                sourceItem.First().FormViewerDetails.BasicDetails.OrginalEndDTTM;
              sourceItem.First().FormViewerDetails.BasicDetails.StopDate =
                sourceItem.First().FormViewerDetails.BasicDetails.OrginalEndDTTM;
            }
          }
          if (oRemoveItem.ActionCode == ActivityTypes.UnHold) {
            let sourceItem1: IEnumerable<PrescriptionItemVM> = null;
            let sourcetype: string = String.Empty;
            if (!String.IsNullOrEmpty(oRemoveItem.ParentSourcePrescriptionType))
              sourcetype = oRemoveItem.ParentSourcePrescriptionType;
            else sourcetype = oRemoveItem.SourcePrescriptionType;
            switch (sourcetype) {
              case PrescriptionTypes.Clerking:
                if (this.oVM.MedsClerked != null)
                  sourceItem1 = this.oVM.MedsClerked.Where(
                    (item) =>
                      item.PrescriptionItemOID ==
                        oRemoveItem.SourcePrescriptionOid ||
                      item.PrescriptionItemOID ==
                        oRemoveItem.SourcePrevEncPrescriptionOid ||
                      item.PrescriptionItemOID == oRemoveItem.ReorderItemOID
                  ).Select((item) => item);

                break;
              case PrescriptionTypes.Outpatient:
                if (this.oVM.MedsOutPatient != null)
                  sourceItem1 = this.oVM.MedsOutPatient.Where(
                    (item) =>
                      item.PrescriptionItemOID ==
                        oRemoveItem.SourcePrescriptionOid ||
                      item.PrescriptionItemOID ==
                        oRemoveItem.SourcePrevEncPrescriptionOid ||
                      item.PrescriptionItemOID == oRemoveItem.ReorderItemOID
                  ).Select((item) => item);

                break;
              case PrescriptionTypes.Leave:
                if (this.oVM.MedsLeave != null)
                  sourceItem1 = this.oVM.MedsLeave.Where(
                    (item) =>
                      item.PrescriptionItemOID ==
                        oRemoveItem.SourcePrescriptionOid ||
                      item.PrescriptionItemOID ==
                        oRemoveItem.SourcePrevEncPrescriptionOid ||
                      item.PrescriptionItemOID == oRemoveItem.ReorderItemOID
                  ).Select((item) => item);

                break;
              case PrescriptionTypes.Discharge:
                if (this.oVM.MedsDischarge != null)
                  sourceItem1 = this.oVM.MedsDischarge.Where(
                    (item) =>
                      item.PrescriptionItemOID ==
                        oRemoveItem.SourcePrescriptionOid ||
                      item.PrescriptionItemOID ==
                        oRemoveItem.SourcePrevEncPrescriptionOid ||
                      item.PrescriptionItemOID == oRemoveItem.ReorderItemOID
                  ).Select((item) => item);

                break;
              case PrescriptionTypes.ForAdministration:
                if (this.oVM.MedsInPatient != null)
                  sourceItem1 = this.oVM.MedsInPatient.Where(
                    (item) =>
                      item.PrescriptionItemOID ==
                        oRemoveItem.SourcePrescriptionOid ||
                      item.PrescriptionItemOID ==
                        oRemoveItem.SourcePrevEncPrescriptionOid ||
                      item.PrescriptionItemOID == oRemoveItem.ReorderItemOID
                  ).Select((item) => item);

                break;
            }
            if (
              !String.IsNullOrEmpty(oRemoveItem.SourcePrescriptionType) &&
              String.Equals(
                oRemoveItem.SourcePrescriptionType,
                PrescriptionTypes.ForAdministration
              )
            ) {
              if (this.oVM.MedsInPatient != null) {
                let sourceItem1 = this.oVM.MedsInPatient.Where(
                  (item) =>
                    item.PrescriptionItemOID ==
                      oRemoveItem.SourcePrescriptionOid ||
                    item.PrescriptionItemOID ==
                      oRemoveItem.SourcePrevEncPrescriptionOid ||
                    item.PrescriptionItemOID == oRemoveItem.ReorderItemOID
                ).Select((item) => item);
              }
            }
            if (sourceItem1 != null && sourceItem1.Count() > 0) {
              sourceItem1.First().IsReoderIconEnable = true;
              sourceItem1.First().ReorderToolTip = 'Select to copy across';
            }
          }
        }
        if (
          oRemoveItem != null &&
          oRemoveItem.FormViewerDetails != null &&
          oRemoveItem.FormViewerDetails.BasicDetails != null &&
          oRemoveItem.FormViewerDetails.BasicDetails.InfusionDetails != null &&
          oRemoveItem.FormViewerDetails.BasicDetails.InfusionDetails
            .GroupSequenceNo > 0
        ) {
          if (oRemoveItem.ActionCode == ActivityTypes.Amend) {
            if (
              !_AmendedItemRemovedGroups.Contains(
                oRemoveItem.FormViewerDetails.BasicDetails.InfusionDetails
                  .GroupSequenceNo
              )
            ) {
              _AmendedItemRemovedGroups.Add(
                oRemoveItem.FormViewerDetails.BasicDetails.InfusionDetails
                  .GroupSequenceNo
              );
            }
          } else {
            if (
              !_OtherItemRemovedGroups.Contains(
                oRemoveItem.FormViewerDetails.BasicDetails.InfusionDetails
                  .GroupSequenceNo
              )
            ) {
              _OtherItemRemovedGroups.Add(
                oRemoveItem.FormViewerDetails.BasicDetails.InfusionDetails
                  .GroupSequenceNo
              );
            }
          }
        }
        if (
          oRemoveItem != null &&
          oRemoveItem.FormViewerDetails != null &&
          oRemoveItem.FormViewerDetails.BasicDetails != null &&
          oRemoveItem.FormViewerDetails.BasicDetails.SequenceInfo != null &&
          oRemoveItem.FormViewerDetails.BasicDetails.SequenceInfo
            .GroupSequenceNo > 0
        ) {
          if (oRemoveItem.ActionCode == ActivityTypes.Amend) {
            if (
              !_AmendedItemRemovedGroups4NonIV.Contains(
                oRemoveItem.FormViewerDetails.BasicDetails.SequenceInfo
                  .GroupSequenceNo
              )
            ) {
              _AmendedItemRemovedGroups4NonIV.Add(
                oRemoveItem.FormViewerDetails.BasicDetails.SequenceInfo
                  .GroupSequenceNo
              );
            }
          } else {
            if (
              !_AmendedItemRemovedGroups4NonIV.Contains(
                oRemoveItem.FormViewerDetails.BasicDetails.SequenceInfo
                  .GroupSequenceNo
              )
            ) {
              _AmendedItemRemovedGroups4NonIV.Add(
                oRemoveItem.FormViewerDetails.BasicDetails.SequenceInfo
                  .GroupSequenceNo
              );
            }
          }
        }
      });
      if (IsRebindResolveGrd) {
        if (this.oVM.IsVisibleHWIndicator == Visibility.Collapsed) {
          this.oVM.IsVisibleHWIndicator = Visibility.Visible;
        }
      }
      let RemoveItem = selectedRemoveItems.Select((s) => s).ToList();
      if (RemoveItem != null && RemoveItem.Count > 0) {
        let CurrentActiveFirstItem: number = 1;
        let IsExist: boolean = false;
        selectedRemoveItems.forEach((oprescRemoveItem) => {
          let objInfusionVM: InfusionVM = null;
          if (
            oprescRemoveItem != null &&
            oprescRemoveItem.FormViewerDetails != null &&
            oprescRemoveItem.FormViewerDetails.BasicDetails != null &&
            oprescRemoveItem.FormViewerDetails.BasicDetails.InfusionDetails !=
              null &&
            this.oVM != null &&
            this.oVM.MedsResolve != null &&
            this.oVM.MedsResolve.Count > 0
          ) {
            objInfusionVM = CSequentialHelper.GetFirstActiveItemInfusionVM(
              this.oVM.MedsResolve,
              oprescRemoveItem.FormViewerDetails.BasicDetails.InfusionDetails
                .GroupSequenceNo
            );
          }
          if (objInfusionVM != null) {
            CurrentActiveFirstItem = objInfusionVM.ItemSequenceNo;
          }
          if (
            this.oVM.MedsResolve.Where(
              (c) =>
                !c.IsGroupHeader &&
                c.FormViewerDetails.BasicDetails.InfusionDetails
                  .GroupSequenceNo > 0 &&
                c.FormViewerDetails.BasicDetails.InfusionDetails
                  .PrescriptionItemNumber ==
                  oprescRemoveItem.FormViewerDetails.BasicDetails
                    .InfusionDetails.PrescriptionItemNumber
            )
              .Select((s) => s)
              .Count() > 1
          ) {
            let SeqAmendStartDTTM: DateTime = DateTime.MinValue;
            SeqAmendStartDTTM = this.oVM.MedsResolve.Where(
              (c) =>
                c.FormViewerDetails.BasicDetails.InfusionDetails != null &&
                c.FormViewerDetails.BasicDetails.InfusionDetails
                  .PrescriptionItemNumber ==
                  oprescRemoveItem.FormViewerDetails.BasicDetails
                    .InfusionDetails.PrescriptionItemNumber &&
                !c.FormViewerDetails.BasicDetails.InfusionDetails
                  .IsSequentialPrescribing &&
                c.FormViewerDetails.BasicDetails.InfusionDetails
                  .ItemSequenceNo > 0 &&
                c.FormViewerDetails.BasicDetails.InfusionDetails
                  .ItemSequenceNo == CurrentActiveFirstItem
            )
              .Select(
                (s) => s.FormViewerDetails.BasicDetails.StartPrescriptionTime
              )
              .FirstOrDefault();
            if (DateTime.NotEquals(SeqAmendStartDTTM, DateTime.MinValue)) {
              RemoveItem.ForEach((ReInsertDTTM) => {
                if (
                  !oprescRemoveItem.IsGroupHeader &&
                  oprescRemoveItem.FormViewerDetails.BasicDetails
                    .InfusionDetails != null &&
                  oprescRemoveItem.FormViewerDetails.BasicDetails
                    .InfusionDetails.GroupSequenceNo > 0 &&
                  oprescRemoveItem.FormViewerDetails.BasicDetails
                    .InfusionDetails.PrescriptionItemNumber > 0 &&
                  ReInsertDTTM.FormViewerDetails.BasicDetails.InfusionDetails
                    .PrescriptionItemNumber > 0 &&
                  ReInsertDTTM.FormViewerDetails.BasicDetails.InfusionDetails
                    .PrescriptionItemNumber ==
                    oprescRemoveItem.FormViewerDetails.BasicDetails
                      .InfusionDetails.PrescriptionItemNumber
                ) {
                  ReInsertDTTM.FormViewerDetails.BasicDetails.StartDTTM =
                    SeqAmendStartDTTM;
                  ReInsertDTTM.FormViewerDetails.BasicDetails.StartPrescriptionTime =
                    SeqAmendStartDTTM;
                }
              });
              this.oVM.MedsResolve.ForEach((ReInsertDTTM) => {
                if (
                  !oprescRemoveItem.IsGroupHeader &&
                  oprescRemoveItem.FormViewerDetails.BasicDetails
                    .InfusionDetails != null &&
                  ReInsertDTTM.FormViewerDetails.BasicDetails.InfusionDetails !=
                    null &&
                  ReInsertDTTM.FormViewerDetails.BasicDetails.InfusionDetails
                    .GroupSequenceNo ==
                    oprescRemoveItem.FormViewerDetails.BasicDetails
                      .InfusionDetails.GroupSequenceNo &&
                  oprescRemoveItem.FormViewerDetails.BasicDetails
                    .InfusionDetails.PrescriptionItemNumber > 0 &&
                  ReInsertDTTM.FormViewerDetails.BasicDetails.InfusionDetails
                    .PrescriptionItemNumber > 0 &&
                  ReInsertDTTM.FormViewerDetails.BasicDetails.InfusionDetails
                    .PrescriptionItemNumber ==
                    oprescRemoveItem.FormViewerDetails.BasicDetails
                      .InfusionDetails.PrescriptionItemNumber &&
                  !String.Equals(
                    ReInsertDTTM.PrescriptionItemStatus,
                    CConstants.CANCELLED,
                    StringComparison.InvariantCultureIgnoreCase
                  ) &&
                  !String.Equals(
                    ReInsertDTTM.PrescriptionItemStatus,
                    CConstants.COMPLETED,
                    StringComparison.InvariantCultureIgnoreCase
                  ) &&
                  !String.Equals(
                    ReInsertDTTM.PrescriptionItemStatus,
                    CConstants.DISCONTINUED,
                    StringComparison.InvariantCultureIgnoreCase
                  ) &&
                  ReInsertDTTM.FormViewerDetails.BasicDetails.InfusionDetails
                    .ItemSequenceNo >
                    oprescRemoveItem.FormViewerDetails.BasicDetails
                      .InfusionDetails.ItemSequenceNo
                ) {
                  ReInsertDTTM.FormViewerDetails.BasicDetails.StartDTTM =
                    SeqAmendStartDTTM;
                  ReInsertDTTM.FormViewerDetails.BasicDetails.StartPrescriptionTime =
                    SeqAmendStartDTTM;
                }
              });
            }
          }
          let objSequenceDetail: SequenceDetail = null;
          if (
            oprescRemoveItem != null &&
            oprescRemoveItem.FormViewerDetails != null &&
            oprescRemoveItem.FormViewerDetails.BasicDetails != null &&
            oprescRemoveItem.FormViewerDetails.BasicDetails.SequenceInfo !=
              null &&
            this.oVM != null &&
            this.oVM.MedsResolve != null &&
            this.oVM.MedsResolve.Count > 0
          ) {
            objSequenceDetail =
              CommonSequentialHelper.GetFirstActiveItemSeqItemVM(
                this.oVM.MedsResolve,
                oprescRemoveItem.FormViewerDetails.BasicDetails.SequenceInfo
                  .GroupSequenceNo
              );
          }
          if (objSequenceDetail != null) {
            CurrentActiveFirstItem = objSequenceDetail.ItemSequenceNo;
          }
          if (
            this.oVM.MedsResolve.Where(
              (c) =>
                !c.IsGroupHeader &&
                c.FormViewerDetails.BasicDetails.SequenceInfo != null &&
                c.FormViewerDetails.BasicDetails.SequenceInfo.GroupSequenceNo >
                  0 &&
                oprescRemoveItem.FormViewerDetails.BasicDetails.SequenceInfo !=
                  null &&
                c.FormViewerDetails.BasicDetails.SequenceInfo
                  .PrescriptionItemNumber ==
                  oprescRemoveItem.FormViewerDetails.BasicDetails.SequenceInfo
                    .PrescriptionItemNumber
            )
              .Select((s) => s)
              .Count() > 1
          ) {
            let SeqAmendStartDTTM: DateTime = DateTime.MinValue;
            SeqAmendStartDTTM = this.oVM.MedsResolve.Where(
              (c) =>
                c.FormViewerDetails.BasicDetails.SequenceInfo != null &&
                oprescRemoveItem.FormViewerDetails.BasicDetails.SequenceInfo !=
                  null &&
                c.FormViewerDetails.BasicDetails.SequenceInfo
                  .PrescriptionItemNumber ==
                  oprescRemoveItem.FormViewerDetails.BasicDetails.SequenceInfo
                    .PrescriptionItemNumber &&
                c.FormViewerDetails.BasicDetails.SequenceInfo.ItemSequenceNo >
                  0 &&
                c.FormViewerDetails.BasicDetails.SequenceInfo.ItemSequenceNo ==
                  CurrentActiveFirstItem
            )
              .Select((s) => s.FormViewerDetails.BasicDetails.StartDTTM)
              .FirstOrDefault();
            if (DateTime.NotEquals(SeqAmendStartDTTM, DateTime.MinValue)) {
              RemoveItem.ForEach((ReInsertDTTM) => {
                if (
                  !oprescRemoveItem.IsGroupHeader &&
                  oprescRemoveItem.FormViewerDetails.BasicDetails
                    .SequenceInfo != null &&
                  ReInsertDTTM.FormViewerDetails.BasicDetails.SequenceInfo !=
                    null &&
                  oprescRemoveItem.FormViewerDetails.BasicDetails.SequenceInfo
                    .GroupSequenceNo > 0 &&
                  oprescRemoveItem.FormViewerDetails.BasicDetails.SequenceInfo
                    .PrescriptionItemNumber > 0 &&
                  ReInsertDTTM.FormViewerDetails.BasicDetails.SequenceInfo
                    .PrescriptionItemNumber > 0 &&
                  ReInsertDTTM.FormViewerDetails.BasicDetails.SequenceInfo
                    .PrescriptionItemNumber ==
                    oprescRemoveItem.FormViewerDetails.BasicDetails.SequenceInfo
                      .PrescriptionItemNumber
                ) {
                  ReInsertDTTM.FormViewerDetails.BasicDetails.StartDTTM =
                    SeqAmendStartDTTM;
                  ReInsertDTTM.FormViewerDetails.BasicDetails.StartPrescriptionTime =
                    SeqAmendStartDTTM;
                }
              });
              this.oVM.MedsResolve.ForEach((ReInsertDTTM) => {
                if (
                  !oprescRemoveItem.IsGroupHeader &&
                  oprescRemoveItem.FormViewerDetails.BasicDetails
                    .SequenceInfo != null &&
                  ReInsertDTTM.FormViewerDetails.BasicDetails.SequenceInfo !=
                    null &&
                  ReInsertDTTM.FormViewerDetails.BasicDetails.SequenceInfo
                    .GroupSequenceNo ==
                    oprescRemoveItem.FormViewerDetails.BasicDetails.SequenceInfo
                      .GroupSequenceNo &&
                  oprescRemoveItem.FormViewerDetails.BasicDetails.SequenceInfo
                    .PrescriptionItemNumber > 0 &&
                  ReInsertDTTM.FormViewerDetails.BasicDetails.SequenceInfo
                    .PrescriptionItemNumber > 0 &&
                  ReInsertDTTM.FormViewerDetails.BasicDetails.SequenceInfo
                    .PrescriptionItemNumber ==
                    oprescRemoveItem.FormViewerDetails.BasicDetails.SequenceInfo
                      .PrescriptionItemNumber &&
                  !String.Equals(
                    ReInsertDTTM.PrescriptionItemStatus,
                    CConstants.CANCELLED,
                    StringComparison.InvariantCultureIgnoreCase
                  ) &&
                  !String.Equals(
                    ReInsertDTTM.PrescriptionItemStatus,
                    CConstants.COMPLETED,
                    StringComparison.InvariantCultureIgnoreCase
                  ) &&
                  !String.Equals(
                    ReInsertDTTM.PrescriptionItemStatus,
                    CConstants.DISCONTINUED,
                    StringComparison.InvariantCultureIgnoreCase
                  ) &&
                  ReInsertDTTM.FormViewerDetails.BasicDetails.SequenceInfo
                    .ItemSequenceNo >
                    oprescRemoveItem.FormViewerDetails.BasicDetails.SequenceInfo
                      .ItemSequenceNo
                ) {
                  ReInsertDTTM.FormViewerDetails.BasicDetails.StartDTTM =
                    SeqAmendStartDTTM;
                  ReInsertDTTM.FormViewerDetails.BasicDetails.StartPrescriptionTime =
                    SeqAmendStartDTTM;
                }
              });
            }
            if (
              this.oVM.MedsGPConnect != null &&
              this.oVM.MedsGPConnect.Count > 0 &&
              oprescRemoveItem.GpConnectMedicationItem != null &&
              !String.IsNullOrEmpty(
                oprescRemoveItem.GpConnectMedicationItem.GPConnectID
              )
            ) {
              let gpvm: GPConnectItemVM = this.oVM.MedsGPConnect.Where(
                (x) =>
                  x.GPConnectID ==
                  oprescRemoveItem.GpConnectMedicationItem.GPConnectID
              ).FirstOrDefault();
              if (gpvm != null) {
                gpvm.IsClerked = false;
              }
            }
          }
        });
        let lstOrderSetHeaders: List<string> = new List<string>();
        let sKey: string = String.Empty;
        this.grdResolve.SelectedItems.forEach((objPreVM) => {
          if (
            objPreVM.FormViewerDetails.BasicDetails.Ordersets != null &&
            !String.IsNullOrEmpty(
              objPreVM.FormViewerDetails.BasicDetails.Ordersets.Value
            )
          ) {
            sKey = String.Concat(
              objPreVM.FormViewerDetails.BasicDetails.Ordersets.DisplayText,
              '~',
              objPreVM.PrescriptionOID
            );
            if (!lstOrderSetHeaders.Contains(sKey))
              lstOrderSetHeaders.Add(sKey);
          }
        });
        let RemoveIndecies: number[] =
          this.grdResolve.GetSelectedRowsIndexByOrder();
        if (RemoveIndecies != null) {
          let nLen: number = RemoveIndecies.length;
          for (let i: number = nLen; i > 0; i--) {
            if (
              String.Compare(
                this.oVM.MedsResolve[RemoveIndecies[i - 1]].OperationMode,
                'U'
              ) == 0 ||
              (this.oVM.MedsResolve[RemoveIndecies[i - 1]].OperationMode ==
                null &&
                this.oVM.MedsResolve[RemoveIndecies[i - 1]]
                  .PrescriptionItemOID > 0)
            ) {
              if (this.oVM.MedsDeletedItemsResolve == null) {
                this.oVM.MedsDeletedItemsResolve =
                  new ObservableCollection<number>();
              }
              this.oVM.MedsDeletedItemsResolve.Add(
                this.oVM.MedsResolve[RemoveIndecies[i - 1]].PrescriptionItemOID
              );
            }
            if (!this.oVM.MedsResolve[RemoveIndecies[i - 1]].IsGroupHeader) {
              this.oVM.MedsResolve.RemoveAt(RemoveIndecies[i - 1]);
            }
            if (
              this.oVM.MaxNoOfPrescCounter == CConstants.MaxNoOfPrescriptions
            ) {
              this.oVM.EnableFauxTabs = false;
            }
            if (this.oVM != null) {
              this.oVM.MaxNoOfPrescCounter--;
              if (this.oVM.EnableFauxTabs == false) this.EnableLHSTabs();
            }
          }
          if (this.oVM != null) {
            this.oVM.UpdateConflicts(RemoveIndecies[nLen - 1], '');
          }
          let lstOrderSetHeaderIndex: List<number> = new List<number>();
          lstOrderSetHeaders.forEach((sKey1) => {
            let sHeader: string[] = sKey1.Split('~');
            let lnPrescriptionOID: number = Number.Parse(sHeader[1]);
            let qry: IEnumerable<PrescriptionItemVM> =
              this.oVM.MedsResolve.Select((x) => x).Where(
                (x) =>
                  x.FormViewerDetails.BasicDetails.Ordersets != null &&
                  x.FormViewerDetails.BasicDetails.Ordersets.DisplayText ==
                    sHeader[0] &&
                  x.PrescriptionOID == lnPrescriptionOID
              );
            if (qry != null && qry.Count() > 0) {
              let lastitem: PrescriptionItemVM = qry.Last();
              if (lastitem != null) {
                let lastindex: number = this.oVM.MedsResolve.IndexOf(lastitem);
                if (
                  this.oVM.MedsResolve != null &&
                  this.oVM.MedsResolve.Count > 0 &&
                  lastindex == this.oVM.MedsResolve.Count - 1
                ) {
                  this.oVM.MedsResolve.Select((x) => x)
                    .Where(
                      (x) =>
                        x.FormViewerDetails.BasicDetails.Ordersets != null &&
                        x.FormViewerDetails.BasicDetails.Ordersets
                          .DisplayText == sHeader[0] &&
                        x.PrescriptionOID == lnPrescriptionOID
                    )
                    .Last().IsOrderSetLastItem = true;
                } else {
                  if (
                    !this.oVM.MedsResolve.ElementAt(lastindex + 1)
                      .IsOrderSetHeader
                  ) {
                    this.oVM.MedsResolve.Select((x) => x)
                      .Where(
                        (x) =>
                          x.FormViewerDetails.BasicDetails.Ordersets != null &&
                          x.FormViewerDetails.BasicDetails.Ordersets
                            .DisplayText == sHeader[0] &&
                          x.PrescriptionOID == lnPrescriptionOID
                      )
                      .Last().IsOrderSetLastItem = true;
                  }
                }
              }
            }
            if (qry != null && qry.Count() == 0) {
              let qHeader: IEnumerable<PrescriptionItemVM> =
                this.oVM.MedsResolve.Select((x) => x).Where(
                  (x) =>
                    x.PrescriptionItem == sHeader[0] &&
                    x.PrescriptionOID == lnPrescriptionOID
                );
              qHeader.forEach((oHeader) => {
                lstOrderSetHeaderIndex.Add(
                  this.oVM.MedsResolve.IndexOf(oHeader)
                );
              });
            }
          });
          if (lstOrderSetHeaderIndex.Count > 0) {
            lstOrderSetHeaderIndex.Sort();
            for (
              let iRem: number = lstOrderSetHeaderIndex.Count - 1;
              iRem >= 0;
              iRem--
            ) {
              this.oVM.MedsResolve.RemoveAt(lstOrderSetHeaderIndex[iRem]);
            }
          }
          if (
            _UniqueGroupSequenceNo != null &&
            _UniqueGroupSequenceNo.Count() > 0 &&
            _UniqueGroupSequenceNo.Min() > 0
          ) {
            CSequentialHelper.ReassignSequenceNoOnRemove(
              this.oVM.MedsResolve,
              _UniqueGroupSequenceNo.Min(),
              _UniqueGroupSequenceNo.Count() == 1
                ? eSequenceNoReassignType.ReassignWithinGroup
                : eSequenceNoReassignType.ReassignAcrossGroups,
              this.oVM
            );
          }
          if (
            _UniqueGroupSequenceNo4NonIV != null &&
            _UniqueGroupSequenceNo4NonIV.Count() > 0 &&
            _UniqueGroupSequenceNo4NonIV.Min() > 0
          ) {
            CommonSequentialHelper.ReassignSequenceNoOnRemove(
              this.oVM.MedsResolve,
              _UniqueGroupSequenceNo4NonIV.Min(),
              _UniqueGroupSequenceNo4NonIV.Count() == 1
                ? eCommonSequenceNoReassignType.ReassignWithinGroup
                : eCommonSequenceNoReassignType.ReassignAcrossGroups,
              this.oVM
            );
          }
        }
      }
      this.oVM.SetDCIndicator();
      if (
        _AmendedItemRemovedGroups != null ||
        _OtherItemRemovedGroups != null
      ) {
        if (_AmendedItemRemovedGroups.Count > 0) {
          CSequentialHelper.ResetItemSequence_StartDTTMOnRemove(
            _AmendedItemRemovedGroups,
            this.oVM.MedsResolve,
            ActivityTypes.Amend
          );
        }
        if (_OtherItemRemovedGroups.Count > 0) {
          CSequentialHelper.ResetItemSequence_StartDTTMOnRemove(
            _OtherItemRemovedGroups,
            this.oVM.MedsResolve,
            ActivityTypes.Prescribe
          );
        }
      }
      if (
        _AmendedItemRemovedGroups4NonIV != null ||
        _OtherItemRemovedGroups4NonIV != null
      ) {
        if (_AmendedItemRemovedGroups4NonIV.Count > 0) {
          CommonSequentialHelper.ResetItemSequence_StartDTTMOnRemove(
            _AmendedItemRemovedGroups4NonIV,
            this.oVM.MedsResolve,
            ActivityTypes.Amend
          );
        }
        if (_OtherItemRemovedGroups4NonIV.Count > 0) {
          CommonSequentialHelper.ResetItemSequence_StartDTTMOnRemove(
            _OtherItemRemovedGroups4NonIV,
            this.oVM.MedsResolve,
            ActivityTypes.Prescribe
          );
        }
      }
    }
    if (this.grdResolve.selectedRowsIndex.length > 0) {
      this.UpdateLinksState();
    }
    let medotherdisplaypipe = new DisplayOtherInformationLineItemPipe1();
    this.oItemVM.MedOtherDisplay1 = medotherdisplaypipe.transform(this.oItemVM, '', 0,'');
    let medlinedisplaypipe = new DisplayPrescriptionLineItemPipe1();
    this.oItemVM.MedLineDisplay = medlinedisplaypipe.transform(this.oItemVM, '', 0, '');
    let infoIconKey = new InfoIconPipe();
    this.oItemVM.InfoIconKey = infoIconKey.transform(this.oItemVM, '', 0, '');
    this.oItemVM.mode = 'update';
  }
  private UserControl_Loaded(sender: Object, e: RoutedEventArgs): void {
    if (Common.LHSiTab == null) {
      Common.LHSiTab = this.iTab1;
    }
    if (!this.bIsLoaded) {
      this.bIsLoaded = true;
      // this.oVM = ObjectHelper.CreateType<MedicationPrescribeVM>(
      //   this.DataContext,
      //   MedicationPrescribeVM
      // );
      this.oVM = this.DataContext;
      if (this.oVM != null) {
        this.oVM.FillActivityConsideration();
        this.cmdReconcile.IsEnabled =
          String.Compare(
            this.oVM.CACode,
            'MN_MEDDISCHRGESL_P2',
            StringComparison.OrdinalIgnoreCase
          ) == 0;
        if (
          String.Equals(
            this.oVM.CACode,
            CConstants.InpatientPrescribeMenuCode,
            StringComparison.InvariantCultureIgnoreCase
          ) ||
          String.Equals(
            this.oVM.CACode,
            CConstants.ForadminPrescribeMenuCode,
            StringComparison.InvariantCultureIgnoreCase
          )
        ) {
          this.cmdReprescribe.Visibility = Visibility.Visible;
        } else {
          this.cmdReprescribe.Visibility = Visibility.Collapsed;
        }
      }
      // this.cmdAddFavourites.Visibility = UserPermissions.CanAddFavourites
      //   ? Visibility.Visible
      //   : Visibility.Collapsed;
      if (!String.IsNullOrEmpty(QueryStringInfo.CDCFormCode)) {
        this.ChkIPFromClerk.Text =
          'Launch Inpatient/For administration ' +
          Environment.NewLine +
          'medications';
      }
      try {
        this.LayoutRoot.Width = ApplicationHelper.ActualWidth - 10;
        this.LayoutRoot.Height = ApplicationHelper.ActualHeight - 205;
      } catch (ex: any) {
        let _ErrorSource: string =
          'LorAppManagePrescriptionBBUI_P2.dll, Class:medprescribedrugs, Method:UserControl_Loaded()';
        let lnReturn: number = AMSHelper.PublicExceptionDetails(
          80000024,
          _ErrorSource,
          ex
        );
      }
    }
    if (this.oVM != null) {
      this.oVM.GetProfileDataCompeletedEvent = (s, e) => {
        this.oVM_GetProfileDataCompeletedEvent();
      };
      this.oVM.ReBindResolveGridEvent = (s, e) => {
        this.oVM_ReBindResolveGridEvent(s, e);
      };
      this.oVM.formViewerCloseEventhandler = (s, e) => {
        this.oVM_formViewerCloseEventhandler(s);
      };
      this.oVM.OnFinishMaxPrescribeDisable = (s, e) => {
        this.DisableLHSTabs();
      };
    }
    if (
      this.oVM != null &&
      this.oVM.ActivityConsideration != null &&
      this.oVM.ActivityConsideration.Visibility == Visibility.Collapsed
    ) {
      this.oVM.ActivityConsideration.Visibility = Visibility.Visible;
    }
    if (
      UserPermissions.CanEnableMedChart &&
      (String.IsNullOrEmpty(QueryStringInfo.IsLaunchformchart) ||
        (!String.IsNullOrEmpty(QueryStringInfo.IsLaunchformchart) &&
          !Convert.ToBoolean(QueryStringInfo.IsLaunchformchart)) ||
        (!String.IsNullOrEmpty(QueryStringInfo.IsLaunchformchart) &&
          Convert.ToBoolean(QueryStringInfo.IsLaunchformchart) &&
          !String.IsNullOrEmpty(QueryStringInfo.IsLaunchformPreschart) &&
          Convert.ToBoolean(QueryStringInfo.IsLaunchformPreschart))) &&
      (String.IsNullOrEmpty(QueryStringInfo.IsLaunchformInfchart) ||
        (!String.IsNullOrEmpty(QueryStringInfo.IsLaunchformInfchart) &&
          !Convert.ToBoolean(QueryStringInfo.IsLaunchformInfchart)) ||
        (!String.IsNullOrEmpty(QueryStringInfo.IsLaunchformInfchart) &&
          Convert.ToBoolean(QueryStringInfo.IsLaunchformInfchart) &&
          !String.IsNullOrEmpty(QueryStringInfo.IsLaunchformPreschart) &&
          Convert.ToBoolean(QueryStringInfo.IsLaunchformPreschart)))
    ) {
      if (!(!PatientContext.IPPMADU_P2 && PatientContext.TTOPBBDU_P2)) {
        this.cmdMedAdmin.Visibility = Visibility.Visible;
        this.cmdObservationResults.Visibility = Visibility.Visible;
        PrescriptionHelper.GetMedicationCount(
          Convert.ToInt64(PatientContext.EncounterOid),
          PrescriptionTypes.ForAdministration,
          (s, e) => {
            this.PatientCount_Completed(s, e);
          }
        );
      } else {
        this.cmdMedAdmin.IsEnabled = false;
        this.cmdMedAdmin.Visibility = Visibility.Collapsed;
        this.cmdObservationResults.Visibility = Visibility.Collapsed;
      }
    } else {
      this.cmdMedAdmin.IsEnabled = false;
      this.cmdMedAdmin.Visibility = Visibility.Collapsed;
    }
    // this.grdResolve.Rebind();
    if (this.grdResolve.GetRowCount() == 0 && this.oVM != null) {
      this.oVM.ResolveGridNoRecordsText = 'No records to show';
    }
    if (this.grdResolve.GetSelectedRowCount() > 0){
      this.cmdDiscontinueCancel.IsEnabled = true;
      this.cmdDiscontinueCancel.Visibility = Visibility.Collapsed;
    }
    else{
      this.cmdDiscontinueCancel.IsEnabled = false;
      this.cmdDiscontinueCancel.Visibility = Visibility.Collapsed;
    }
  }
  iTab1_Loaded(sender: Object, e: RoutedEventArgs): void {
    if (sender instanceof iTab) {
        Common.LHSiTab = ObjectHelper.CreateType<iTab>(sender, iTab);
        if (sender.SelectedContent instanceof medQuickselect) {
            setTimeout(() => {
                sender.SelectedContent.ladSearch_GotFocus({}, {});
            }, 0)
        }
    }
  }
  oVM_GetProfileDataCompeletedEvent(): void {
    if (
      ProfileData.AdditionalPrescConfig != null &&
      ProfileData.AdditionalPrescConfig.RecManforIP == true &&
      PatientContext.PrescriptionType == PrescriptionTypes.ForAdministration
    ) {
      this.cmdReconcile.IsEnabled = true;
      if (this.cmdReconcile.IsEnabled == true) this.oVM.ReconcileforIP = true;
    }
    this.SetGridConfig();
    this.cmdDiscontinueCancel.IsEnabled = false;
    this.cmdDiscontinueCancel.Visibility = Visibility.Collapsed;
    this.DisableLinks();
  }
  oAppDialogResult: AppDialogResult;
  oVM_formViewerCloseEventhandler(
    oAppDialogResultValue: AppDialogResult
  ): void {
    this.grdResolve.UnselectAll();
    this.ClearCheckboxSelection();
    this.cmdReprescribe.IsEnabled = false;
    this.cmdDiscontinueCancel.IsEnabled = false;
    this.cmdDiscontinueCancel.Visibility = Visibility.Collapsed;
    this.DisableLinks();
    // let itemCount = this.grdResolve.ItemsSource.Count;
    // let targetItem = Math.floor(itemCount/2);
    // this.grdResolve.ScrollIntoView(this.grdResolve.ItemsSource[targetItem]);
    this.oAppDialogResult = oAppDialogResultValue;
    if (QueryStringInfo.SelPrescItemOID > 0 && !this.oVM.IsInprogressDRC && !this.oVM.IsAmendFromPresChartAllergyPop) {
      if (this.oAppDialogResult == AppDialogResult.Ok) {
        if (this.oVM.IsDurationOnlyChanged) {
          HelperService.windowCloseFlag = "Finish";
          this.oVM.OnFinish();
        } else if (!this.oVM.IsReasonforModficationChanged) {
          HelperService.windowCloseFlag = "Finish";
          this.oVM.OnFinish();
        }
      }
    }
     this.grdResolve.Rebind();
  }
  oVM_ReBindResolveGridEvent(
    _RepositionDrug: boolean,
    objNewItem: PrescriptionItemVM,
    _index: number = 0,
    sFrom: string = null
  ): void {
    this.oVM.RefreshDCAlertIcon(false);
    if(objNewItem == null && this.oItemVM != null) this.ReevaluateRHSPipe(this.oItemVM)
    else { this.ReevaluateRHSPipe(objNewItem); }
    if (!String.IsNullOrEmpty(sFrom) && String.Equals(sFrom, 'HeaderUpdate')) {
      // this.grdResolve.Rebind();
      this.grdResolve.Rebind();
    } else {
      let IsActionConflictUpdate: boolean = false;
      if (this.grdResolve.GetSelectedRowCount() > 0) {
        let _SelCurentData: PrescriptionItemVM =
          ObjectHelper.CreateType<PrescriptionItemVM>(
            this.grdResolve.GetCurrentRowData(),
            PrescriptionItemVM
          );
        if (
          _SelCurentData != null &&
          !String.IsNullOrEmpty(_SelCurentData.OperationMode) &&
          String.Equals(
            _SelCurentData.OperationMode,
            'CU',
            StringComparison.InvariantCultureIgnoreCase
          )
        ) {
          IsActionConflictUpdate = true;
        }
      }
      //if(this.oAppDialogResult != AppDialogResult.Close)
      this.grdResolve.Rebind();
      this.UpdateLinksState();
      this.oVM.IsInprogressDRC = false;
      if (
        (this.oAppDialogResult == AppDialogResult.Ok ||
          this.oAppDialogResult == AppDialogResult.Close) &&
        !IsActionConflictUpdate &&
        this.oVM != null &&
        this.oVM.MedsResolve != null &&
        this.oVM.MedsResolve.Count > 0
      ) {
        if (objNewItem != null) {
          if (_RepositionDrug) {
            if (ObjectHelper.HasValue(_index) && _index.Value > 0) {
              this.grdResolve.ScrollIntoView(
                this.oVM.MedsResolve[_index.Value]
              );
            } else {
              let oIndexOfItemVM = this.oVM.MedsResolve.Where(
                (x) =>
                  x.PrescriptionItemOID == objNewItem.PrescriptionItemOID &&
                  x.PrescribableItemDetailOID ==
                    objNewItem.PrescribableItemDetailOID &&
                  !String.IsNullOrEmpty(
                    x.FormViewerDetails.BasicDetails.IdentifyingName
                  ) &&
                  String.Equals(
                    x.FormViewerDetails.BasicDetails.IdentifyingName,
                    objNewItem.FormViewerDetails.BasicDetails.IdentifyingName,
                    StringComparison.InvariantCultureIgnoreCase
                  )
              ).FirstOrDefault();
              if (oIndexOfItemVM != null) {
                let index: number =
                  this.oVM.MedsResolve.IndexOf(oIndexOfItemVM);
                if (index >= 0) {
                  this.grdResolve.ScrollIntoView(this.oVM.MedsResolve[index]);
                }
              }
            }
          } else {
            if (this.oVM.MedsResolve.Count > 0)
              this.grdResolve.ScrollIntoView(this.oVM.MedsResolve[0]);
          }
        } else {
          if (this.oVM.MedsResolve.Count > 0)
            this.grdResolve.ScrollIntoView(this.oVM.MedsResolve[0]);
        }
      }
      //RR Amend link PresChart
      if (
        !this.oVM.IsRebindResolveGrdForDC &&
        QueryStringInfo.SelPrescItemOID > 0 &&
        !this.oVM.IsAmendFromPresChartAllergyPop
      ) {
        if(this.oAppDialogResult == null && (this.oVM.oAppDialogResultClick != null && this.oVM.oAppDialogResultClick == AppDialogResult.Ok)) {
          this.oAppDialogResult = this.oVM.oAppDialogResultClick;
        }
        if (this.oAppDialogResult == AppDialogResult.Ok) {
          this.oVM.oAppDialogResultClick = null;
          this.oVM.MedsResolve[0].GetConflictImageStatus();
          this.oVM.MedsResolve[0].GetMCConflictImageStatus();
          if (this.oVM.MedsResolve[0].TrafficIcon != ConflictIcons.Red){
            HelperService.windowCloseFlag = "Finish";
            this.oVM.OnFinish();
          }
        } else {
          this.oVM.OnCancel();
        }
      }
      this.oVM.IsRebindResolveGrdForDC = false;
    }
  }
  private counter = 0;
  rowLoaded(context: any) {
    let rowEventArgs = this.grdResolve.GetRowEventArgs(
      this.dataTemplates,
      context
    );
    this.grdResolve_RowLoaded({}, rowEventArgs);
    if(rowEventArgs.index == this.grdResolve.ItemsSource?.Count-1){
      this.isLoaded = true;
      BusyIndicator.SetStatusIdle("MedPrescribeDrugsRHS");
      this.changeDetectionRef.markForCheck();
    }
    if(this.oVM.IsDisCompletedChecked){
      this.counter++;
      let lengthDisComp: any[] = []
      try {
        lengthDisComp = this.grdResolve.ItemsSource.array.filter(x => x.PrescriptionItemStatus == "MEDStatus3" || x.PrescriptionItemStatus == "MEDStatus14")
      } catch (e) {
        console.log("colourchange.error", e);
      }
      console.log("colourchange.counter", this.counter, "this.grdResolve.ItemsSource.array.length", this.grdResolve.ItemsSource.array.length, "lengthDisComp", lengthDisComp.length);
      let rowCount = this.oVM.IsDisCompletedChecked ? lengthDisComp.length : this.grdResolve.ItemsSource.array.length
      if (this.counter >= rowCount) {
        this.asigncolor();
        Busyindicator.SetStatusIdle("colourchange")
      }
    }
  }
  iCheckBox1_Checked(e) {
    this.oVM.IsDisCanChecked = e;
    this.counter = 0;
    this.UpdateLinksState();
    Busyindicator.SetStatusBusy1("colourchangeCancelled")
    setTimeout(() => {
    this.grdResolve.Rebind();
    Busyindicator.SetStatusIdle("colourchangeCancelled");
    this.changeDetectionRef.markForCheck();
  }, 3000);
  }
  iCheckBox2_Checked(e) {
    this.oVM.IsDisCompletedChecked = e;
   
    this.counter = 0;
    if(this.oVM.IsDisCompletedChecked){
      Busyindicator.SetStatusBusy1("colourchange")
    }
    setTimeout(() => {
      if(this.counter == 0){
        Busyindicator.SetStatusIdle("colourchange")
      }
      this.changeDetectionRef.markForCheck();
    }, 2000);
    this.UpdateLinksState();
    if (this.grdResolve.selectedRowsIndex.length > 0 && !e) {
      this.cmdLinks.IsEnabled = true;
      this.cmdObservationResults.IsEnabled = true;
      this.cmdDiscontinueCancel.IsEnabled = true;
      this.cmdDiscontinueCancel.Visibility = Visibility.Visible;
    }
    else{
      this.cmdLinks.IsEnabled = false;
      this.cmdObservationResults.IsEnabled = false;
      this.cmdDiscontinueCancel.IsEnabled = false;
      this.cmdDiscontinueCancel.Visibility = Visibility.Collapsed;
    }
  }
  asigncolor() {
    this.grdResolve.ItemsSource.array.forEach(x => {
      this.disCompleted(x);
    })
  }
  disCompleted(x) {
    console.log("colourchange.disCompleted", x);
    if(x){
      if (
        String.Compare(
          x.PrescriptionItemStatus,
          CConstants.DISCONTINUED,
          StringComparison.OrdinalIgnoreCase
        ) == 0
      ) {
        if(x.RowStyles !=undefined){
          x['RowStyles'].push('Background_DISCONTINUED');
        }else{
          x['RowStyles'] = [];
          x['RowStyles'].push('Background_DISCONTINUED');
        }
      } else if (
        String.Compare(
          x.PrescriptionItemStatus,
          CConstants.COMPLETED,
          StringComparison.OrdinalIgnoreCase
        ) == 0
      ) {
        if(x.RowStyles !=undefined){
          x['RowStyles'].push('Background_COMPLETED');
        }else{
          x['RowStyles'] = [];
          x['RowStyles'].push('Background_COMPLETED');
        }
      }
    }
  }
  rowCallback = (context: RowClassArgs) => {
    let rowStyles = this.grdResolve.getRowStyles(context);
    return rowStyles;
  };

  private isDontIncludeChkboxCol: boolean = true;
  private grdResolve_RowLoaded(sender: Object, e: RowLoadedEventArgs): void {
    let dataGridRow: GridViewRow;
    if (e.Row != null && e.Row.Item != null) {
      this.oItemVM = ObjectHelper.CreateType<PrescriptionItemVM>(
        e.Row.Item,
        PrescriptionItemVM
      );
      if (this.oItemVM instanceof PrescriptionItemVM) {
        dataGridRow = ObjectHelper.CreateType<GridViewRow>(e.Row, GridViewRow);
        if (
          this.oItemVM != null &&
          this.oItemVM.FormViewerDetails != null &&
          this.oItemVM.FormViewerDetails.BasicDetails != null &&
          (this.oItemVM.FormViewerDetails.BasicDetails.AsRequired ||
            String.Equals(
              this.oItemVM.FormViewerDetails.BasicDetails.Direction,
              CConstants.AsNeeded,
              StringComparison.InvariantCultureIgnoreCase
            ))
        ) {
          // e.Row.Background = new SolidColorBrush(
          //   MedChartData.AsRequiredSlotsColor
          this.grdResolve.SetRowStyle( e, MedChartData.AsRequiredSlotsColor.color,'Background')
          this.ReevaluateRHSPipe(this.oItemVM);
         // e.dataItem['RowStyles'].push('AsRequiredSlotsColor');
          // this.grdResolve.styles.push({ index: e.index, class: 'AsRequiredSlotsColor'});
          //);
          e.Row.IsAlternating = false;
        }
        else
        {
          this.grdResolve.SetRowStyle( e, "",'Background');
          this.ReevaluateRHSPipe(this.oItemVM);
        }
        if (this.oItemVM.IsGroupHeader) {
          if (this.oItemVM.IsFirstHeader) {
            // to be revisited
            // let rowBorder: Border = e.Row.ChildrenOfType<Border>()
            //   .Where((c) => c.Name == 'PART_RowBordeTOP')
            //   .First();
            // rowBorder.Visibility = Visibility.Visible;
            // rowBorder.BorderThickness = new Thickness(0, 2, 0, 0);
            e.dataItem['RowStyles'].push('PART_RowBordeTOP');
            // this.grdResolve.styles.push({ index: e.index, class:'PART_RowBordeTOP'});
          }
          //let GS1: GradientStopCollection = new GradientStopCollection();
          if (
            this.oItemVM != null &&
            this.oItemVM.FormViewerDetails != null &&
            this.oItemVM.FormViewerDetails.BasicDetails != null &&
            this.oItemVM.FormViewerDetails.BasicDetails.InfusionDetails !=
              null &&
            this.oItemVM.FormViewerDetails.BasicDetails.InfusionDetails
              .GroupSequenceNo > 0
          ) {
            // e.Row.Background = new SolidColorBrush(
            //   Color.FromArgb(255, 118, 179, 180)
            // );
            e.dataItem['RowStyles'].push('GroupHeader');
            e.dataItem['RowStyles'].push('PART_RowBordeTOP_Blue');
            // e.dataItem['RowStyles'].push('Background_Blue');
            // this.grdResolve.styles.push({ index: e.index, class:'Background_Blue'});
            dataGridRow.Cells[1].Content = null;
            dataGridRow.Cells[2].Content = null;
            dataGridRow.Cells[4].Content = null;
            dataGridRow.Cells[5].Content = null;
          } else {
            /*
            Gradient color replaced with solidcolor based on PO advice.
            
            GS1.Add(
              ObjectHelper.CreateObject(new GradientStop(), {
                Color: Color.FromArgb(255, 122, 194, 193),
                Offset: 0.6,
              })
            );
            GS1.Add(
              ObjectHelper.CreateObject(new GradientStop(), {
                Color: Color.FromArgb(255, 176, 218, 217),
                Offset: 0.4,
              })
            );            
            e.Row.Background = new LinearGradientBrush(GS1, 90.0);
            */
            // e.Row.Background = new SolidColorBrush(
            //   Color.FromArgb(1, 116, 185, 195)
            // ); // #74b9c3
            e.dataItem['RowStyles'].push('GroupHeader');
            // this.grdResolve.styles.push({ index: e.index,class:'GroupHeader'});
          }
          e.Row.IsHitTestVisible = false;
          e.Row.IsAlternating = false;
        }
        if (
          CSequentialHelper.IsFirstSequentialInfusionHeader(
            this.oItemVM,
            ObjectHelper.CreateType<ObservableCollection<PrescriptionItemVM>>(
              this.grdResolve.ItemsSource,
              ObservableCollection<PrescriptionItemVM>
            )
          )
        ) {
          //   let rowBorder1: Border = e.Row.ChildrenOfType<Border>()
          //     .Where((c) => c.Name == 'PART_RowBordeTOP')
          //     .FirstOrDefault();
          //   if (rowBorder1 != null) {
          //     rowBorder1.Visibility = Visibility.Visible;
          //     rowBorder1.BorderBrush = new SolidColorBrush(
          //       Color.FromArgb(255, 63, 72, 204)
          //     );
          //     rowBorder1.BorderThickness = new Thickness(0, 2, 0, 0);
          //   }
          e.dataItem['RowStyles'].push('PART_RowBordeTOP_Blue');
          // this.grdResolve.styles.push({ index: e.index,class:'PART_RowBordeTOP_Blue'});
        }
        if (
          CSequentialHelper.IsLastSequentialInfusionItem(
            this.oItemVM,
            ObjectHelper.CreateType<ObservableCollection<PrescriptionItemVM>>(
              this.grdResolve.ItemsSource,
              ObservableCollection<PrescriptionItemVM>
            )
          )
        ) {
          //   let rowBorder1: Border = e.Row.ChildrenOfType<Border>()
          //     .Where((c) => c.Name == 'PART_RowBorder')
          //     .FirstOrDefault();
          if (
            //     rowBorder1 != null &&
            String.IsNullOrEmpty(this.oItemVM.PrescriptionItemStatus) ||
            (!this.oItemVM.PrescriptionItemStatus.Equals(
              CConstants.CANCELLED,
              StringComparison.OrdinalIgnoreCase
            ) &&
              !this.oItemVM.PrescriptionItemStatus.Equals(
                CConstants.DISCONTINUED,
                StringComparison.OrdinalIgnoreCase
              ) &&
              !this.oItemVM.PrescriptionItemStatus.Equals(
                CConstants.COMPLETED,
                StringComparison.OrdinalIgnoreCase
              ))
          ) {
            //     rowBorder1.Visibility = Visibility.Visible;
            //     rowBorder1.BorderBrush = new SolidColorBrush(
            //       Color.FromArgb(255, 63, 72, 204)
            //     );
            //     rowBorder1.BorderThickness = new Thickness(0, 0, 0, 2);
            e.dataItem['RowStyles'].push('PART_RowBorderBOTTOM_Blue');
            // this.grdResolve.styles.push({ index: e.index, class:'PART_RowBorderBOTTOM_Blue'});
          }
        }
        if (
          CommonSequentialHelper.IsFirstSequentialInfusionHeader(
            this.oItemVM,
            ObjectHelper.CreateType<ObservableCollection<PrescriptionItemVM>>(
              this.grdResolve.ItemsSource,
              ObservableCollection<PrescriptionItemVM>
            )
          )
        ) {
          //   let rowBorder1: Border = e.Row.ChildrenOfType<Border>()
          //     .Where((c) => c.Name == 'PART_RowBordeTOP')
          //     .FirstOrDefault();
          //   if (rowBorder1 != null) {
          //     rowBorder1.Visibility = Visibility.Visible;
          //     rowBorder1.BorderBrush = new SolidColorBrush(
          //       Color.FromArgb(255, 63, 72, 204)
          //     );
          //     rowBorder1.BorderThickness = new Thickness(0, 2, 0, 0);
          //   }
          e.dataItem['RowStyles'].push('PART_RowBordeTOP_Blue');
          // this.grdResolve.styles.push({ index: e.index, class:'PART_RowBordeTOP_Blue'});
        }
        if (
          CommonSequentialHelper.IsLastSequentialInfusionItem(
            this.oItemVM,
            ObjectHelper.CreateType<ObservableCollection<PrescriptionItemVM>>(
              this.grdResolve.ItemsSource,
              ObservableCollection<PrescriptionItemVM>
            )
          )
        ) {
          //   let rowBorder1: Border = e.Row.ChildrenOfType<Border>()
          //     .Where((c) => c.Name == 'PART_RowBorder')
          //     .FirstOrDefault();
          if (
            //     rowBorder1 != null &&
            String.IsNullOrEmpty(this.oItemVM.PrescriptionItemStatus) ||
            (!this.oItemVM.PrescriptionItemStatus.Equals(
              CConstants.CANCELLED,
              StringComparison.OrdinalIgnoreCase
            ) &&
              !this.oItemVM.PrescriptionItemStatus.Equals(
                CConstants.DISCONTINUED,
                StringComparison.OrdinalIgnoreCase
              ) &&
              !this.oItemVM.PrescriptionItemStatus.Equals(
                CConstants.COMPLETED,
                StringComparison.OrdinalIgnoreCase
              ))
          ) {
            //     rowBorder1.Visibility = Visibility.Visible;
            //     rowBorder1.BorderBrush = new SolidColorBrush(
            //       Color.FromArgb(255, 63, 72, 204)
            //     );
            //     rowBorder1.BorderThickness = new Thickness(0, 0, 0, 2);
            e.dataItem['RowStyles'].push('PART_RowBorderBOTTOM_Blue');
            // this.grdResolve.styles.push({ index: e.index,class:'PART_RowBorderBOTTOM_Blue'});
          }
        }
        // Implemented in HTML
        // if (!this.oItemVM.ShowCells) {
        //   let objChkBox: CheckBox = ObjectHelper.CreateType<CheckBox>(
        //     dataGridRow.Cells[0].Content,
        //     CheckBox
        //   );
        //   objChkBox.Visibility = Visibility.Collapsed;
        //   dataGridRow.Cells[0].IsEnabled = false;
        //   dataGridRow.Cells[1].IsEnabled = false;
        //   dataGridRow.Cells[2].IsEnabled = false;
        // }
        if (
          String.Compare(
            this.oItemVM.PrescriptionItemStatus,
            CConstants.DISCONTINUED,
            StringComparison.OrdinalIgnoreCase
          ) == 0
        ) {
          dataGridRow = ObjectHelper.CreateType<GridViewRow>(
            e.Row,
            GridViewRow
          );
          // this.grdResolve.UnselectAll();
          if (dataGridRow != null) {
            //dataGridRow.Background = new SolidColorBrush(Colors.Grey);
            e.dataItem['RowStyles'].push('Background_DISCONTINUED');
            this.grdResolve.styles.push({ index: e.index, class:'Background_DISCONTINUED'});
            this.ReevaluateRHSPipe(this.oItemVM);
            if (
              this.oItemVM != null &&
              this.oItemVM.FormViewerDetails != null &&
              this.oItemVM.FormViewerDetails.BasicDetails != null &&
              this.oItemVM.FormViewerDetails.BasicDetails.InfusionDetails !=
                null &&
              this.oItemVM.FormViewerDetails.BasicDetails.InfusionDetails
                .IsSequentiallinkvisi == Visibility.Visible
            ) {
              this.oItemVM.FormViewerDetails.BasicDetails.InfusionDetails.IsSequentiallinkvisi =
                Visibility.Collapsed;
              this.oItemVM.FormViewerDetails.BasicDetails.IsSequentiallinkvisi =
                Visibility.Collapsed;
            }
            if (
              this.oItemVM != null &&
              this.oItemVM.FormViewerDetails != null &&
              this.oItemVM.FormViewerDetails.BasicDetails != null &&
              this.oItemVM.FormViewerDetails.BasicDetails.SequenceInfo !=
                null &&
              this.oItemVM.FormViewerDetails.BasicDetails.SequenceInfo
                .IsSequentiallinkvisi == Visibility.Visible
            ) {
              this.oItemVM.FormViewerDetails.BasicDetails.SequenceInfo.IsSequentiallinkvisi =
                Visibility.Collapsed;
              this.oItemVM.FormViewerDetails.BasicDetails.IsSequentiallinkvisi =
                Visibility.Collapsed;
            }
          }
        }
        if (
          String.Compare(
            this.oItemVM.PrescriptionItemStatus,
            CConstants.CANCELLED,
            StringComparison.OrdinalIgnoreCase
          ) == 0
        ) {
          dataGridRow = ObjectHelper.CreateType<GridViewRow>(
            e.Row,
            GridViewRow
          );
          // this.grdResolve.UnselectAll();
          if (dataGridRow != null) {
            //dataGridRow.Background = new SolidColorBrush(Colors.Grey);
          //  e.dataItem['RowStyles'].push('Background_DISCONTINUED');
          //  this.grdResolve.styles.push({ index: e.index, class:'Background_DISCONTINUED'});
            if (
              this.oItemVM != null &&
              this.oItemVM.FormViewerDetails != null &&
              this.oItemVM.FormViewerDetails.BasicDetails != null &&
              this.oItemVM.FormViewerDetails.BasicDetails.InfusionDetails !=
                null &&
              this.oItemVM.FormViewerDetails.BasicDetails.InfusionDetails
                .IsSequentiallinkvisi == Visibility.Visible
            ) {
              this.oItemVM.FormViewerDetails.BasicDetails.InfusionDetails.IsSequentiallinkvisi =
                Visibility.Collapsed;
              this.oItemVM.FormViewerDetails.BasicDetails.IsSequentiallinkvisi =
                Visibility.Collapsed;
            }
            if (
              this.oItemVM != null &&
              this.oItemVM.FormViewerDetails != null &&
              this.oItemVM.FormViewerDetails.BasicDetails != null &&
              this.oItemVM.FormViewerDetails.BasicDetails.SequenceInfo !=
                null &&
              this.oItemVM.FormViewerDetails.BasicDetails.SequenceInfo
                .IsSequentiallinkvisi == Visibility.Visible
            ) {
              this.oItemVM.FormViewerDetails.BasicDetails.SequenceInfo.IsSequentiallinkvisi =
                Visibility.Collapsed;
              this.oItemVM.FormViewerDetails.BasicDetails.IsSequentiallinkvisi =
                Visibility.Collapsed;
            }
          }
        }
        if (
          String.Compare(
            this.oItemVM.PrescriptionItemStatus,
            CConstants.COMPLETED,
            StringComparison.OrdinalIgnoreCase
          ) == 0
        ) {
          dataGridRow = ObjectHelper.CreateType<GridViewRow>(
            e.Row,
            GridViewRow
          );
          if (dataGridRow != null) {
            // dataGridRow.Background = new SolidColorBrush(
            //   Color.FromArgb(255, 185, 251, 114)
            // );
            e.dataItem['RowStyles'].push('Background_COMPLETED');
            this.grdResolve.styles.push({ index: e.index, class:'Background_COMPLETED'});
            this.ReevaluateRHSPipe(this.oItemVM);
            if (
              this.oItemVM != null &&
              this.oItemVM.FormViewerDetails != null &&
              this.oItemVM.FormViewerDetails.BasicDetails != null &&
              this.oItemVM.FormViewerDetails.BasicDetails.InfusionDetails !=
                null &&
              this.oItemVM.FormViewerDetails.BasicDetails.InfusionDetails
                .IsSequentiallinkvisi == Visibility.Visible
            ) {
              this.oItemVM.FormViewerDetails.BasicDetails.InfusionDetails.IsSequentiallinkvisi =
                Visibility.Collapsed;
              this.oItemVM.FormViewerDetails.BasicDetails.IsSequentiallinkvisi =
                Visibility.Collapsed;
            }
            if (
              this.oItemVM != null &&
              this.oItemVM.FormViewerDetails != null &&
              this.oItemVM.FormViewerDetails.BasicDetails != null &&
              this.oItemVM.FormViewerDetails.BasicDetails.SequenceInfo !=
                null &&
              this.oItemVM.FormViewerDetails.BasicDetails.SequenceInfo
                .IsSequentiallinkvisi == Visibility.Visible
            ) {
              this.oItemVM.FormViewerDetails.BasicDetails.SequenceInfo.IsSequentiallinkvisi =
                Visibility.Collapsed;
              this.oItemVM.FormViewerDetails.BasicDetails.IsSequentiallinkvisi =
                Visibility.Collapsed;
            }
          }
        }else if(String.Compare(
          this.oItemVM.PrescriptionItemStatus,
          CConstants.CANCELLED,
          StringComparison.OrdinalIgnoreCase
         ) == 0){
          this.ReevaluateRHSPipe(this.oItemVM);
        } 
        //not in current scope to be revisited
        // this.oItemVM.UnHoldEvent = (s, e) => {
        //   this.oItemVM_UnHoldEvent();
        // };
        // this.oItemVM.HoldEvent = (s, e) => {
        //   this.oItemVM_HoldEvent();
        // };
        // this.oItemVM.UnHoldCompletedEvent = (s, e) => {
        //   this.oItemVM_UnHoldCompletedEvent();
        // };
        // this.oItemVM.SteppedCloseEvent = (s, e) => {
        //   this.oItemVM_SteppedCloseEvent();
        // };
        // this.oItemVM.CancelDiscontinueRebindDelegateEvent = (s, e) => {
        //   this.oItemVM_CancelDiscontinueRebindDelegateEvent(s);
        // };
        let cellFormViewerIcon: GridViewCell =
          ObjectHelper.CreateType<GridViewCell>(
            e.Row.Cells[this.grdResolve.GetColumnIndexByName('FormViewerIcon', this.isDontIncludeChkboxCol)],
            GridViewCell
          );
        if (cellFormViewerIcon != null) {
          let FormViewerIcon: Image = cellFormViewerIcon
            .ChildrenOfType<Image>()
            .Where((x) => x.Name == 'FormViewerIconImage')
            .FirstOrDefault();
          if (FormViewerIcon != null) {
            // this.grdResolve.selectedRowsIndex = [];
            // this.ClearCheckboxSelection();
            // this.UpdateLinksState()
            this.oItemVM.SubscribeFormViewerIconClickEvent(FormViewerIcon, this.cmdRemove);
          }
          let SequenceLinkIcon: Image = cellFormViewerIcon
            .ChildrenOfType<Image>()
            .Where((x) => x.Name == 'SequentialIconlink')
            .FirstOrDefault();
          if (SequenceLinkIcon != null) {
            this.oItemVM.SequenciatlLinkButtonEvent(SequenceLinkIcon);
          }
          let FormViewerReviewIcon: Image = cellFormViewerIcon
            .ChildrenOfType<Image>()
            .Where((x) => x.Name == 'FormViewerReviewIconImage')
            .FirstOrDefault();
          if (FormViewerReviewIcon != null) {
            this.oItemVM.SubscribeFormViewerIconClickEvent(
              FormViewerReviewIcon
            );
          }
        }
        if (
          this.oItemVM.OperationMode != null &&
          String.Compare(this.oItemVM.OperationMode, 'N') == 0
        ) {
          if (
            this.oItemVM.FormViewerDetails != null &&
            this.oItemVM.FormViewerDetails.BasicDetails != null
          ) {
            this.oItemVM.FormViewerDetails.BasicDetails.StartDTTMText =
              this.oItemVM.FormViewerDetails.BasicDetails.StartDTTMDisplay();
          }
        } else if (
          this.oItemVM.OperationMode != null &&
          (String.Equals(
            this.oItemVM.OperationMode,
            'U',
            StringComparison.CurrentCultureIgnoreCase
          ) ||
            String.Equals(
              this.oItemVM.OperationMode,
              'UA',
              StringComparison.CurrentCultureIgnoreCase
            ))
        ) {
          if (
            String.IsNullOrEmpty(
              this.oItemVM.FormViewerDetails.BasicDetails.StartDTTMText
            ) &&
            DateTime.NotEquals(this.oItemVM.FormViewerDetails.BasicDetails.StartDTTM,
              DateTime.MinValue)
          ) {
            this.oItemVM.FormViewerDetails.BasicDetails.StartDTTM =
              this.oItemVM.FormViewerDetails.BasicDetails.StartDTTM;
            this.oItemVM.FormViewerDetails.BasicDetails.StartDTTMText =
              this.oItemVM.FormViewerDetails.BasicDetails.StartDTTMDisplay();
          }
        }
      }
    }
  }
  oItemVM_CancelDiscontinueRebindDelegateEvent(PrescItemOID: number): void {
    if (
      PrescItemOID != 0 &&
      this.lastCancelDiscontinueOID != 0 &&
      PrescItemOID == this.lastCancelDiscontinueOID
    ) {
      this.lastCancelDiscontinueOID = 0;
      // this.grdResolve.Rebind();
    }
  }
  oItemVM_SteppedCloseEvent(): void {
    let omedQuickselect: medQuickselect =
      ObjectHelper.CreateType<medQuickselect>(
        this.iTab1.SelectedContent,
        medQuickselect
      );
    if (omedQuickselect != null) {
      omedQuickselect.txtSearch.Focus();
    }
  }
  oItemVM_UnHoldCompletedEvent(): void {
    this.nTotalDrugsUnHolded += 1;
    this.UnHoldOldDrugs();
  }
  oItemVM_HoldEvent(): void {}
  oItemVM_UnHoldEvent(): void {}
  private cmdDoseCalculator_Click(sender: Object, e: RoutedEventArgs): void {
    let oSelectedItem: PrescriptionItemVM =
      ObjectHelper.CreateType<PrescriptionItemVM>(
        this.grdResolve.SelectedItem,
        PrescriptionItemVM
      );
    if (!oSelectedItem.IsFormViewDataLoaded) {
      oSelectedItem.GetPresItemDetails();
      oSelectedItem.IsFormViewDataLoaded = true;
    }
    let oReturnValue: Object =
      PrescriptionHelper.GetDoseCalulatorDetails(oSelectedItem);
    this.oVM.UpdateActivityConsideration(true, oReturnValue);
    // this.grdResolve.Rebind();
  }
  private cmdResults_Click(sender: Object, e: RoutedEventArgs): void {
    if (this.grdResolve.GetSelectedRowCount() > 0) {
      let PItem: PrescriptionItemVM =
        ObjectHelper.CreateType<PrescriptionItemVM>(
          this.grdResolve.SelectedItem,
          PrescriptionItemVM
        );
      if (
        PItem != null &&
        PItem.FormViewerDetails != null &&
        PItem.FormViewerDetails.BasicDetails != null
      ) {
        let oResultInput: ResultInputData = ObjectHelper.CreateObject(
          new ResultInputData(),
          {
            IdentifyingOID: PItem.FormViewerDetails.BasicDetails.IdentifyingOID,
            IdentifyingType:
              PItem.FormViewerDetails.BasicDetails.IdentifyingType,
            IdentifyingName:
              PItem.FormViewerDetails.BasicDetails.IdentifyingName,
            MCVersion: String.IsNullOrEmpty(
              PItem.FormViewerDetails.BasicDetails.MCVersion
            )
              ? AppSessionInfo.AMCV
              : PItem.FormViewerDetails.BasicDetails.MCVersion,
          }
        );
        let oResultVM: RequestandResultVM = new RequestandResultVM(
          oResultInput
        );
        //Not Required for LHS. To be Re-Visited.
        /*
        oResultVM.CheckResultAssociationCompletedEvent = (s, e) => {
          this.oResultVM_CheckResultAssociationCompletedEvent(s, e);
        };
        */
        oResultVM.CheckResultAssociation();
      }
    }
  }
  //Not Required for LHS. To be Re-Visited.
  /*
        oResultVM_CheckResultAssociationCompletedEvent(sender: Object, IsResultAssociated: boolean): void {
            if (IsResultAssociated) {
                this.objResults = new medrecentresultschild(ObjectHelper.CreateType<RequestandResultVM>(sender, RequestandResultVM));
                AppActivity.OpenWindow((ObjectHelper.CreateType<RequestandResultVM>(sender, RequestandResultVM)).ResultsTitle, this.objResults, (s,e)=>{this.RecentResults_Closed(s);}, "See full results for more details", true, 480, 640, true, WindowButtonType.Close, null);
            }
        }
        RecentResults_Closed(args: AppDialogEventargs): void {
            this.objResults.appDialog.DialogResult = true;
        } */
        //uncommented 
        cmdMedClkSrc_ClickFunc = (s, e) => { this.cmdMedClkSrc_Click(s, e); };
        cmdMedClkSrc_Click(sender: Object, e: RoutedEventArgs): void {
         this.oMultiSelectListView =new MultiSelectListView();
            this.oMultiSelectListView.constructorImpl(ValueDomain.MedicationClerking, this.oVM.MedicationClerkingSource.ToList());
            // ObjectHelper.stopFinishAndCancelEvent(true);
            AppActivity.OpenWindow("Medication clerking source - LORENZO", this.oMultiSelectListView, (s,e)=>{this.oMultiSelectListView_Closed(s);}, "", false, 640, 450, false, WindowButtonType.OkCancel, null);
        }
        oMultiSelectListView_Closed(args: AppDialogEventargs): void {
            if (args.Content != null)
                this.oMultiSelectListView = ObjectHelper.CreateType<MultiSelectListView>(args.Content.Component, MultiSelectListView);
            if (args.Result == AppDialogResult.Ok && args.Content != null && args.Content.Component != null) {
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
       //uncommented till here
  iCheckBox1_KeyDown(sender: Object, e: KeyEventArgs): void {
    if (e.PlatformKeyCode == 13) {
      this.iCheckBox1.IsChecked = <boolean>!this.iCheckBox1.IsChecked;
    }
    this.oVM.IsDisCanChecked = <boolean>this.iCheckBox1.IsChecked;
  }
  iChkCompletedByPrescriber_KeyDown(sender: Object, e: KeyEventArgs): void {
    if (e.PlatformKeyCode == 13) {
      this.iChkCompletedByPrescriber.IsChecked =
        !this.iChkCompletedByPrescriber.IsChecked;
    }
  }
  iCheckBox2_KeyDown(sender: Object, e: KeyEventArgs): void {
    if (e.PlatformKeyCode == 13) {
      this.iCheckBox2.IsChecked = !this.iCheckBox2.IsChecked;
    }
  }
  medPresDrug_Unloaded(sender: Object, e: RoutedEventArgs): void {
    if (this.oVM.IsFinish || this.oVM.IsFinishNow) {
      this.cmdMedClkSrc = null;
      this.cmdOtherLinks = null;
      this.cmdLinks = null;
      this.cmdObservationResults = null;
      this.cmdReconcile = null;
      //this.cmdAddFavourites = null;
      this.cmdDiscontinueCancel = null;
      this.cmdRemove = null;
      this.cmdMedAdmin = null;
      this.cmdReprescribe = null;
      this.iCheckBox1 = null;
      this.iCheckBox2 = null;
      this.iChkCompletedByPrescriber = null;
      this.ChkIPFromClerk = null;
      this.lblDisplayText = null;
      this.lblDisplayValue = null;
      this.lblMedClkSrc = null;
      this.lblEncounter = null;
      // this.checkgrid = null;
    }
    this.DisposeFormEvents();
    this.DisposeFormObjects();
    if (this.oVM.IsFinish || this.oVM.IsFinishNow) {
      if (this.grdResolve != null) {
        if (this.grdResolve.Rows != null) {
          this.grdResolve.Rows.Clear();
        }
        if (this.grdResolve.Columns != null) {
          this.grdResolve.Columns.Clear();
        }
        this.grdResolve.ItemsSource = null;
        this.grdResolve = null;
      }
      if (this.LayoutRoot != null && this.LayoutRoot.Children != null) {
        this.LayoutRoot.Children.Clear();
      }
      // GC.Collect();
      // GC.WaitForPendingFinalizers();
    }
  }
  iTab1_SelectionChanged(
    sender: Object,
    e: RadSelectionChangedEventArgs
  ): void {
    if (this.oVM != null && !this.oVM.IsGPConMatchFound) {
      this.oVM.GpConnectMedicationItem = this.oVM.SelectedGPConnectItem = null;
    }
    
    if (QueryStringInfo.IsLaunchformchart == 'True') {
      let itab = sender as iTab;
      itab.SelectedKey = 'Search';
      QueryStringInfo.IsLaunchformchart = String.Empty;
    }
    if (QueryStringInfo.IsLaunchformPreschart == 'True') {
      QueryStringInfo.IsLaunchformPreschart = String.Empty;
      QueryStringInfo.IsLaunchformPreschartReview = 'True';
    }
  }
  public DisposeFormEvents(): void {
    if (this.oItemVM != null) {
      // this.oItemVM.UnHoldEvent -= oItemVM_UnHoldEvent;
      // this.oItemVM.HoldEvent -= oItemVM_HoldEvent;
      // this.oItemVM.UnHoldCompletedEvent -= oItemVM_UnHoldCompletedEvent;
      // this.oItemVM.SteppedCloseEvent -= oItemVM_SteppedCloseEvent;
      // this.oItemVM.CancelDiscontinueRebindDelegateEvent -= oItemVM_CancelDiscontinueRebindDelegateEvent;
      // this.oItemVM.RePresBindResolveGridEvent -= oVM_ReBindResolveGridEvent;
      if (this.oItemVM.objItems != null) {
        this.oItemVM.objItems.forEach((pVM) => {
          if (pVM != null) {
            // pVM.UnHoldEvent -= oItemVM_UnHoldEvent;
            // pVM.HoldEvent -= oItemVM_HoldEvent;
            // pVM.UnHoldCompletedEvent -= oItemVM_UnHoldCompletedEvent;
            // pVM.SteppedCloseEvent -= oItemVM_SteppedCloseEvent;
            // pVM.CancelDiscontinueRebindDelegateEvent -= oItemVM_CancelDiscontinueRebindDelegateEvent;
            // pVM.RePresBindResolveGridEvent -= oVM_ReBindResolveGridEvent;
            if (this.oVM.IsFinish || this.oVM.IsFinishNow) {
              // if (pVM._ImageConflicktClicked != null) {
              //     pVM._ImageConflicktClicked.MouseLeftButtonUp -= pVM.Conflict_MouseLeftButtonUp;
              // }
              // if (pVM._ImageReviewIconClicked != null) {
              //     pVM._ImageReviewIconClicked.MouseLeftButtonUp -= pVM.FormViewer_MouseLeftButtonUp;
              // }
              // if (pVM._ImageFormviewerClicked != null) {
              //     pVM._ImageFormviewerClicked.MouseLeftButtonUp -= pVM.FormViewer_MouseLeftButtonUp;
              // }
              // if (pVM._ImageSteppedDoseClicked != null) {
              //     pVM._ImageSteppedDoseClicked.MouseLeftButtonUp -= pVM.imgSteppedVariable_MouseLeftButtonUp;
              // }
              // if (pVM._ImageWithoutNameClicked != null) {
              //     pVM._ImageWithoutNameClicked.MouseLeftButtonUp -= pVM.FormViewer_MouseLeftButtonUp;
              // }
              // if (pVM._ImageConfictIconClickedFromCV != null) {
              //     pVM._ImageConfictIconClickedFromCV.MouseLeftButtonUp -= pVM.InformationIcon_MouseLeftButtonUp;
              // }
              pVM._ImageConflicktClicked = null;
              pVM._ImageReviewIconClicked = null;
              pVM._ImageFormviewerClicked = null;
              pVM._ImageSteppedDoseClicked = null;
              pVM._ImageConfictIconClickedFromCV = null;
            }
          }
        });
        if (
          this.oVM != null &&
          String.IsNullOrEmpty(this.oVM.ActionValue) &&
          this.oItemVM != null &&
          (this.oVM.IsFinish || this.oVM.IsFinishNow)
        ) {
          this.oItemVM.objItems.Clear();
          this.oItemVM.objItems = null;
        }
      }
    }
    // if (this.profile != null)
    //     this.profile.OnProfileLoaded -= PrescribeConfig_OnProfileLoaded;
    // if (this.discanc != null)
    //     this.discanc.OnAllergyClosedEvent -= discanc_OnAllergyClosedEvent;
    // if (this.oResultVM != null)
    //     this.oResultVM.CheckResultAssociationCompletedEvent -= oResultVM_CheckResultAssociationCompletedEvent;
    if (this.oVM != null) {
      // this.oVM.GetProfileDataCompeletedEvent -= oVM_GetProfileDataCompeletedEvent;
      // this.oVM.formViewerCloseEventhandler -= oVM_formViewerCloseEventhandler;
      // this.oVM.ReBindResolveGridEvent -= oVM_ReBindResolveGridEvent;
      // this.oVM.OnFinishMaxPrescribeDisable -= DisableLHSTabs;
      if (this.oVM.MedsResolve != null) {
        this.oVM.MedsResolve.forEach((pVM) => {
          if (pVM != null) {
            // pVM.UnHoldEvent -= oItemVM_UnHoldEvent;
            // pVM.HoldEvent -= oItemVM_HoldEvent;
            // pVM.UnHoldCompletedEvent -= oItemVM_UnHoldCompletedEvent;
            // pVM.SteppedCloseEvent -= oItemVM_SteppedCloseEvent;
            // pVM.CancelDiscontinueRebindDelegateEvent -= oItemVM_CancelDiscontinueRebindDelegateEvent;
            if (this.oVM.IsFinish || this.oVM.IsFinishNow) {
              // if (pVM._ImageConflicktClicked != null) {
              //     pVM._ImageConflicktClicked.MouseLeftButtonUp -= pVM.Conflict_MouseLeftButtonUp;
              // }
              // if (pVM._ImageReviewIconClicked != null) {
              //     pVM._ImageReviewIconClicked.MouseLeftButtonUp -= pVM.FormViewer_MouseLeftButtonUp;
              // }
              // if (pVM._ImageFormviewerClicked != null) {
              //     pVM._ImageFormviewerClicked.MouseLeftButtonUp -= pVM.FormViewer_MouseLeftButtonUp;
              // }
              // if (pVM._ImageSteppedDoseClicked != null) {
              //     pVM._ImageSteppedDoseClicked.MouseLeftButtonUp -= pVM.imgSteppedVariable_MouseLeftButtonUp;
              // }
              // if (pVM._ImageWithoutNameClicked != null) {
              //     pVM._ImageWithoutNameClicked.MouseLeftButtonUp -= pVM.FormViewer_MouseLeftButtonUp;
              // }
              // if (pVM._ImageConfictIconClickedFromCV != null) {
              //     pVM._ImageConfictIconClickedFromCV.MouseLeftButtonUp -= pVM.InformationIcon_MouseLeftButtonUp;
              // }
              pVM._ImageConflicktClicked = null;
              pVM._ImageReviewIconClicked = null;
              pVM._ImageFormviewerClicked = null;
              pVM._ImageSteppedDoseClicked = null;
              pVM._ImageWithoutNameClicked = null;
              pVM._ImageConfictIconClickedFromCV = null;
            }
          }
        });
      }
      this.oVM.DoCleanUP();
      if (
        this.grdResolve != null &&
        this.grdResolve.Rows != null &&
        this.grdResolve.Rows.Count > 0 &&
        (this.oVM.IsFinish || this.oVM.IsFinishNow)
      ) {
        let _gridRowsCount: number = this.grdResolve.Rows.Count;
        for (let i: number = 0; i < _gridRowsCount; i++) {
          if (
            this.grdResolve.Rows[i].Cells != null &&
            this.grdResolve.Rows[i].Cells.Count > 4
          ) {
            let _cell: GridViewCell = ObjectHelper.CreateType<GridViewCell>(
              this.grdResolve.Rows[i].Cells[4],
              GridViewCell
            );
            if (_cell != null) {
              let _cp: ContentPresenter =
                ObjectHelper.CreateType<ContentPresenter>(
                  _cell.Content,
                  ContentPresenter
                );
              if (_cp != null) {
                let il: iLabel = ObjectHelper.CreateType<iLabel>(
                  _cp.Content,
                  iLabel
                );
                if (il != null && il.InLines != null && il.InLines.Count > 0) {
                  let _ImgSupplyInst: Image;
                  for (let j: number = 0; j < il.InLines.Count; j++) {
                    if (
                      il.InLines[j] != null &&
                      il.InLines[j].InLine != null &&
                      il.InLines[j].InLine instanceof Image
                    ) {
                      _ImgSupplyInst = ObjectHelper.CreateType<Image>(
                        il.InLines[j].InLine,
                        Image
                      );
                      if (_ImgSupplyInst != null) {
                        if (
                          _ImgSupplyInst.Tag != null &&
                          _ImgSupplyInst.Tag instanceof PrescriptionLineItemVM
                        ) {
                          let _PliVm: PrescriptionLineItemVM =
                            ObjectHelper.CreateType<PrescriptionLineItemVM>(
                              _ImgSupplyInst.Tag,
                              PrescriptionLineItemVM
                            );
                          if (_PliVm != null) {
                            _PliVm.UnSubscribeClickEvent(_ImgSupplyInst);
                            _ImgSupplyInst.Tag = null;
                          }
                        } else {
                          if (
                            _ImgSupplyInst.DataContext instanceof
                            PrescriptionItemVM
                          ) {
                            let _oPIVm: PrescriptionItemVM =
                              ObjectHelper.CreateType<PrescriptionItemVM>(
                                _ImgSupplyInst.DataContext,
                                PrescriptionItemVM
                              );
                            if (
                              _oPIVm != null &&
                              _oPIVm.oPrescriptionLineItemVM != null
                            ) {
                              _oPIVm.oPrescriptionLineItemVM.UnSubscribeClickEvent(
                                _ImgSupplyInst
                              );
                              _oPIVm.oPrescriptionLineItemVM = null;
                            }
                          }
                          _ImgSupplyInst.Tag = null;
                          _ImgSupplyInst.DataContext = null;
                        }
                      }
                    }
                  }
                }
              }
              _cp = null;
            }
          }
        }
      }
    }
  }
  public DisposeFormObjects(): void {
    if (
      this.oVM.MedsResolve != null &&
      (this.oVM.IsFinish || this.oVM.IsFinishNow)
    ) {
      this.oVM.MedsResolve.forEach((pVM) => {
        if (pVM != null && pVM.formViewerDetails != null) {
          if (pVM.formViewerDetails.BasicDetails != null) {
            if (pVM.formViewerDetails.BasicDetails.InfusionDetails != null) {
              pVM.formViewerDetails.BasicDetails.InfusionDetails = null;
            }
            pVM.formViewerDetails.BasicDetails.DefaultDetails = null;
            pVM.formViewerDetails.BasicDetails = null;
          }
          pVM.formViewerDetails = null;
          pVM.ParentbaseVM = null;
          pVM.oPrescriptionLineItemVM = null;
          pVM.oDefaultRoute = null;
        }
      });
      Common.LHSiTab = null;
      Common.oIPPMABaseVM = null;
      Common.ConceptCodes = null;
    }
    this.profile = null;
    //this.discanc = null; //Not Required for LHS. To be Re-Visited.
    this.oAppDialogWindow = null;
    //Not Required for LHS. To be Re-Visited.
    /*
            this.omeddrugholdChild = null;
            this.objResults = null;
            this.objmedaddtofavouritesChild = null;
            this.oMultiSelectListView = null;
            */
    this.iTab1 = null;
  }
  cmdReprescribe_Click_Func = (s, e) => {
    this.cmdReprescribe_Click(s, e);
  };

  cmdReprescribe_Click(sender: Object, e: RoutedEventArgs): void {
    let sDrugNames: StringBuilder = new StringBuilder();
    this.objPresItmCollection = new ObservableCollection<PrescriptionItemVM>();
    if (this.oVM != null) {
      this.oVM.RepresResolve = new ObservableCollection<PrescriptionItemVM>();
    }
    let SelIndecies: number[] = this.grdResolve.GetSelectedRowsIndexByOrder();
    let nLen: number = SelIndecies.length;
    for (let i: number = 0; i < nLen; i++) {
      let objItm: PrescriptionItemVM =
        ObjectHelper.CreateType<PrescriptionItemVM>(
          this.oVM.MedsResolve[SelIndecies[i]],
          PrescriptionItemVM
        );
      if (objItm != null && !objItm.IsGroupHeader) {
        objItm.bIsReprescribe = true;
        if (objItm.IsAllowedToPerform) {
          this.objPresItmCollection.Add(objItm);
        } else {
          if (
            !String.IsNullOrEmpty(objItm.PrescriptionItemStatus) &&
            String.Equals(
              objItm.PrescriptionItemStatus,
              CConstants.COMPLETED,
              StringComparison.OrdinalIgnoreCase
            )
          ) {
            if (sDrugNames.Length > 0) {
              sDrugNames.Append('?!+`');
            }
            if (
              objItm.FormViewerDetails != null &&
              objItm.FormViewerDetails.BasicDetails != null
            ) {
              if (
                String.IsNullOrEmpty(
                  objItm.FormViewerDetails.BasicDetails.MCILorenzoID
                )
              ) {
                if (
                  !String.IsNullOrEmpty(
                    objItm.FormViewerDetails.BasicDetails.IdentifyingName
                  )
                ) {
                  sDrugNames.Append(
                    objItm.FormViewerDetails.BasicDetails.IdentifyingName
                  );
                }
              } else {
                if (
                  !String.IsNullOrEmpty(
                    objItm.FormViewerDetails.BasicDetails.mCIItemDisplay
                  )
                ) {
                  sDrugNames.Append(
                    objItm.FormViewerDetails.BasicDetails.mCIItemDisplay
                  );
                }
              }
            }
          }
        }
        if (
          !String.IsNullOrEmpty(objItm.PrescriptionItemStatus) &&
          String.Equals(
            objItm.PrescriptionItemStatus,
            CConstants.DISCONTINUED,
            StringComparison.OrdinalIgnoreCase
          )
        ) {
          if (objItm.IsAllowedToPerform) {
            this.oVM.RepresResolve.Add(objItm);
          } else {
            if (sDrugNames.Length > 0) {
              sDrugNames.Append('?!+`');
            }
            if (
              objItm.FormViewerDetails != null &&
              objItm.FormViewerDetails.BasicDetails != null
            ) {
              if (
                String.IsNullOrEmpty(
                  objItm.FormViewerDetails.BasicDetails.MCILorenzoID
                )
              ) {
                if (
                  !String.IsNullOrEmpty(
                    objItm.FormViewerDetails.BasicDetails.IdentifyingName
                  )
                ) {
                  sDrugNames.Append(
                    objItm.FormViewerDetails.BasicDetails.IdentifyingName
                  );
                }
              } else {
                if (
                  !String.IsNullOrEmpty(
                    objItm.FormViewerDetails.BasicDetails.mCIItemDisplay
                  )
                ) {
                  sDrugNames.Append(
                    objItm.FormViewerDetails.BasicDetails.mCIItemDisplay
                  );
                }
              }
            }
          }
        }
      }
    }
    if (sDrugNames.Length > 0) {
      let Msg: string = String.Empty;
      let lDrugNames: string = String.Empty;
      lDrugNames = sDrugNames.ToString();
      if (!sDrugNames.ToString().Contains('?!+`')) {
        lDrugNames = '\n\n- ' + lDrugNames;
        Msg = String.Format(
          Resource.prescribedrugs.IsReprescribeAllowed,
          lDrugNames
        );
      } else {
        lDrugNames = String.Join(
          '\n- ',
          lDrugNames.Split('?!+`', StringSplitOptions.None).ToList()
        );
        lDrugNames = '\n\n- ' + lDrugNames;
        Msg = String.Format(
          Resource.prescribedrugs.AreReprescribeAllowed,
          lDrugNames
        );
      }
      let oMsgBox: iMessageBox = new iMessageBox();
      oMsgBox.MessageBoxClose = (s, e) => {
        this.oMsgBox_ReprescribeMessageBoxClose(s, e);
      };
      oMsgBox.Title = 'Information - Lorenzo';
      oMsgBox.Height = 160;
      oMsgBox.Width = 600;
      oMsgBox.MessageButton = MessageBoxButton.OK;
      oMsgBox.IconType = MessageBoxType.Information;
      oMsgBox.Message = Msg;
      oMsgBox.Show();
    } else {
      if (
        this.oVM.RepresResolve.Count > 0 ||
        this.objPresItmCollection.Count > 0
      ) {
        this.ReprescribeWindowLaunch();
      }
    }
  }

  private oMsgBox_ReprescribeMessageBoxClose(
    sender: Object,
    e: MessageEventArgs
  ): void {
    if (
      this.oVM.RepresResolve.Count > 0 ||
      this.objPresItmCollection.Count > 0
    ) {
      this.ReprescribeWindowLaunch();
    }
  }

  ReprescribeWindowLaunch(): void {
    //setTimeout(() => { this.UpdateLinksState(); }, 2000);
    if (this.oVM.RepresResolve != null && this.oVM.RepresResolve.Count > 0) {
       this.oRePresConfirm = new RePresConfirmMezzanine();
       this.oRePresConfirm.DataContext = this.oVM;
       let sWindowTitle: string = Resource.prescribedrugs.Represcribe_Header;
      //  ObjectHelper.stopFinishAndCancelEvent(true);
       AppActivity.OpenWindow(sWindowTitle, this.oRePresConfirm, (s,e)=>{this.oRePresConfirm_Closed(s);}, "", false, 450, 600, false, WindowButtonType.OkCancel, null);
    } else {
      if (
        this.objPresItmCollection != null &&
        this.objPresItmCollection.Count > 0
      ) {
        Busyindicator.SetStatusBusy('Represribce');
        this.oVM.represcseqcount = 1;
        this.oVM.CallRePresSequence(this.objPresItmCollection, 0);
      }
    }
  }
  oRePresConfirm_Closed(args: AppDialogEventargs): void {
      let objmezz = ObjectHelper.CreateType<RePresConfirmMezzanine>(args.Content.Component, RePresConfirmMezzanine);
      let objItems: ObservableCollection<Object> = objmezz.grdPresSelect.GetSelectedRows();
      if (args.Result == AppDialogResult.Ok) {
          let allDiscCnt: number = this.oVM.RepresResolve.Count;
          let selDiscCnt: number = objItems.Count;
          if (allDiscCnt != selDiscCnt) {
              for (let i: number = 0; i < allDiscCnt; i++) {
                  if (!objItems.Contains(this.oVM.RepresResolve[i])) {
                    let itemIndex =   this.objPresItmCollection.IndexOf(this.oVM.RepresResolve[i]);
                    if(itemIndex >= 0)
                    {
                      this.objPresItmCollection.RemoveAt(itemIndex);
                    }
                    //  this.objPresItmCollection.Remove(this.oVM.RepresResolve[i]);
                  }
              }
          }
      }
      else if (args.Result == AppDialogResult.Cancel) {
          let DiscCnt: number = this.oVM.RepresResolve.Count;
          for (let i: number = 0; i < DiscCnt; i++) {
              this.objPresItmCollection.Remove(this.oVM.RepresResolve[i]);
          }
          this.grdResolve.UnselectAll();
          this.ClearCheckboxSelection();
          this.cmdReprescribe.IsEnabled = false;
          this.grdResolve.Rebind();
      }
      //this.oRePresConfirm.appDialog.DialogResult = false;
      // ObjectHelper.stopFinishAndCancelEvent(false);
      args.AppChildWindow.DialogResult=true;
      if (this.objPresItmCollection != null && this.objPresItmCollection.Count > 0) {
          Busyindicator.SetStatusBusy("Represribce");
          this.oVM.represcseqcount = 1;
          this.oVM.CallRePresSequence(this.objPresItmCollection, 0); 
          this.grdResolve.Rebind();
      }
     
  }

  private temp_assigningDataContext() {
    let parent = new MedicationPrescriptionCA();
    // parent.InvokeForm();
    this.DataContext = parent.DataContext;
    // this.oVM = ObjectHelper.CreateType<MedicationPrescribeVM>(
    //   this.DataContext,
    //   MedicationPrescribeVM
    // );
    this.oVM = this.DataContext;
  }
  override OnCancel() {
    console.log('override onfinishnow working');
  }
  override OnFinish() {
    console.log('override onfinishnow working');
    this.oVM.OnFinish();
  }
  override OnFinishNow() {
    console.log('override onfinishnow working');
    this.oVM.OnFinishNow();
  }
  private ClearCheckboxSelection() {
    this.SelectCheckbox.forEach((checkbox: iCheckBox) => {
      checkbox.IsChecked = false;
    });
  }

  ChkIPFromClerk_IsChecked(e) {
    if (this.bChkIPFromClerk) {
      this.SetEnablePrint();
      this.bChkIPFromClerk = false;
    }
    else {
      this.cmdPrint.IsEnabled = false;
      this.bChkIPFromClerk = true;
    }
  }

  private UpdateLinksState() {
    if (this.grdResolve.selectedRowsIndex.length > 0) {
      this.grdResolve.selectedRowsIndex = [];
      this.grdResolve_SelectionChanged({}, {});
      this.grdResolve.Rebind();
      this.ClearCheckboxSelection();
    }
  }
  grdResolve_onCellClick(s, e) {
    if(e.TriggerSelectionChange) {
      let selectionEvtArgs = { selectedRows: [], deselectedRows: [] };
      if (e.selectedRow) {
        selectionEvtArgs.selectedRows = [];
        selectionEvtArgs['selectedRows'].push(e.ColumnCell.DataContext);
      }
      if (e.deselectedRow) {
        selectionEvtArgs.deselectedRows = [];
        selectionEvtArgs['deselectedRows'].push(e.ColumnCell.DataContext);
      }
      this.grdResolve_SelectionChanged({}, selectionEvtArgs);
    }
  }

  keyboardEvent(event: KeyboardEvent) {
    if (event.code.toLowerCase() == 'enter') {
      if (this.isSelectionChangeAlreadyTriggered) {
        if (this.item['type'] == 'deselected') {
          this.grdResolve.selectedRowsIndex.push(this.item['data'].index);
          this.grdResolve.selectedRowsIndex = this.grdResolve.selectedRowsIndex.map(item => item);
          this.grdResolve_SelectionChanged({},{});
        }
        if (this.item['type'] == 'selected') {
          this.grdResolve.selectedRowsIndex = this.grdResolve.selectedRowsIndex.filter(item => item != this.item['data'].index);
          this.grdResolve_SelectionChanged({},{});
        }
        this.isSelectionChangeAlreadyTriggered = false;
      }
    }
    if (event.code.toLowerCase() == 'space') {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
  }

  private SetSelectDeSelectItems(e) {
    this.isSelectionChangeAlreadyTriggered = true;
    this.item = {};
    if (e && e.selectedRows && e.selectedRows.length > 0) {
      this.item = {
        type: 'selected',
        data: e.selectedRows[0]
      }
    }
    if (e && e.deselectedRows && e.deselectedRows.length > 0) {
      this.item = {
        type: 'deselected',
        data: e.deselectedRows[0]
      }
    }
  }

  SelectRowByIndexOn221Response() {
    this.grdResolve.setSelectedItemByIndex (this.oVM.RowAfftedon221) ;
    this.grdResolve.RowCheckBoxCollection.forEach((item,idx)=>{
      if(idx==this.oVM.RowAfftedon221) item.IsChecked = true;
    } ) 
    this.grdResolve.Rebind();
    this.grdResolve_SelectionChanged({},{});
  }
}
