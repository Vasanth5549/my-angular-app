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
import 'epma-platform/stringextension';
import { ObjectHelper } from 'epma-platform/helper';
import {
  CConstants,
  InfusionTypesCode,
  PrescriptionTypes,
  ValueDomain,
} from '../utilities/constants';
import { ContextInfo } from 'src/app/lorappcommonbb/utilities/globalvariable';
import { Resource } from '../resource';
import {
  Grid,
  GridExtension,
  GridViewCell,
  GridViewColumn,
  GridViewLength,
  GridViewLengthUnitType,
  GridViewRow,
  RowLoadedEventArgs,
  SelectionChangeEventArgs,
} from 'src/app/shared/epma-platform/controls/epma-grid-helpers/grid-extension';
import * as ControlStyles from '../../shared/epma-platform/controls/ControlStyles';
import {
  Binding,
  Border,
  CheckBox,
  DataTemplate,
  Thickness,
  UserControl,
  iButton,
  iTab,
  iTabItem,
  Image,
  RadSelectionChangedEventArgs,
  iLabel,
  iCheckBox,
  ContentPresenter,
  FrameworkElement,
  BindingMode,
} from 'epma-platform/controls';
import { GridComponent, RowClassArgs } from '@progress/kendo-angular-grid';
import {
  GrdDiscontinueCancelCols,
  RequestandResultVM,
  ResultInputData,
} from 'src/app/lorappmedicationcommonbb/viewmodel/discontinuecancelvm';
import {
  CommonBB,
  CommonVariables,
} from 'src/app/lorappcommonbb/utilities/common';
import {
  AppActivity,
  AppLoadService,
  ContextManager,
  Convert,
  MessageBoxButton,
  MessageBoxResult,
  MessageBoxType,
  MessageEventArgs,
  SLQueryCollection,
  StringBuilder,
  iMessageBox,
} from 'epma-platform/services';
import { PrescriptionItemVM } from '../viewmodel/PrescriptionItemVM';
import {
  AppContextInfo,
  AppDialogEventargs,
  AppDialogResult,
  ArrayOfLong,
  CListItem,
  ChildWindow,
  IEnumerable,
  List,
  ObservableCollection,
  Visibility,
  WindowButtonType,
  HtmlPage,
  ClerkFormViewDeftBehaviour,
  CValuesetTerm,
  AppSessionInfo,
  KeyEventArgs,
  StringComparison,
} from 'epma-platform/models';

import { PatientContext } from 'src/app/lorappcommonbb/utilities/globalvariable';
import { MultiSelectListView } from './MultiSelectListView';
import { medddetailsChild } from 'src/app/lorappmedicationcommonbb/child/medddetailschild';
import { GridLayoutDirective } from 'src/app/shared/epma-platform/controls/Directives/common.directive';
import * as Application from 'src/app/lorappcommonbb/amshelper';
import {
  Color,
  Colors,
  EventArgs,
  GridViewCellClickEventArgs,
  MouseButtonEventArgs,
  RoutedEventArgs,
  SolidColorBrush,
  TextWrapping,
} from 'src/app/shared/epma-platform/controls/Control';
import { medQuickselect } from './medquickselect';
import { MedTabs } from './medtabs';
import { Common } from '../utilities/common';
import { TechvalidateCAVM } from '../viewmodel/TechvalidateCAVM';
import { DispensingInstructionsVM } from '../viewmodel/dispensinginstructionsvm';
import { ProfileData, UserPermissions } from '../utilities/profiledata';
import { ActivityTypes } from '../model/common';
import {
  CPremission,
  CommonFlags,
  GlobalVariable,
  QueryStringInfo,
} from '../utilities/globalvariable';
import {
  MedChartData,
  WebServiceURLMedicationCommonBB,
} from 'src/app/lorappmedicationcommonbb/utilities/globalvariable';
import {
  CSequentialHelper,
  eSequenceNoReassignType,
} from '../utilities/CSequentialHelper';
import {
  CommonSequentialHelper,
  eCommonSequenceNoReassignType,
} from '../utilities/CommonSequentialHelper';
import * as IPPManagePrescSer from 'src/app/shared/epma-platform/soap-client/IPPMAManagePrescriptionWS';
import { Busyindicator } from 'src/app/lorappcommonbb/busyindicator';
import DateTime from 'epma-platform/DateTime';
import {
  InfusionTypeCode,
  SVIconLaunchFrom,
} from 'src/app/lorappmedicationcommonbb/utilities/constants';
import {
  LockedUsersDetails,
  MedicationCommonBB,
} from 'src/app/lorappmedicationcommonbb/utilities/medicationcommonbb';
import { Environment } from 'src/app/product/shared/models/Common';
import {
  MedicationCommonConceptCodeData,
  MedicationCommonProfileData,
} from 'src/app/lorappmedicationcommonbb/utilities/profiledata';
import * as MedicationCommon from 'src/app/lorappmedicationcommonbb/utilities/globalvariable';
import { Dictionary } from 'epma-platform/dictionary';
import { InfusionVM, SequenceDetail } from '../viewmodel/BasicDetailsVM';
import { SupplyDispensingInstructionsVM } from '../viewmodel/SupplyDispensingInstructionsVM';
import { MultiSelectListVM } from '../viewmodel/MultiSelectListVM';
import { PrescriptionHelper } from '../utilities/prescriptionhelper';
import {
  CResMsgGetPatientMedicationCount,
  GetPatientMedicationCountCompletedEventArgs,
} from 'src/app/shared/epma-platform/soap-client/ManagePrescriptionWS';
import { MonoGraphVM } from 'src/app/lorappmedicationcommonbb/viewmodel/MonographVM';
import * as IPPMAManagePrescSer from '../../shared/epma-platform/soap-client/IPPMAManagePrescriptionWS';
import { PrescriptionLineItemVM } from 'src/app/lorappmedicationcommonbb/utilities/lineitemconstructor';
import { PropertyChangedEventArgs } from 'src/app/shared/epma-platform/controls/epma-tab/epma-tab.component';
import { ClinicallyVerifyVM } from '../viewmodel/clinicallyverifyvm';
import {
  DTTMDisplay,
  DisplayOtherInformationLineItem,
  DisplayPrescriptionLineItem,
  InfoIcon,
} from 'src/app/lorappmedicationadminbbui/converter/medadminconverter';
import {
  CListItemsDisplay,
  WrapToolTip,
} from 'src/app/product/shared/convertor/medicationconverters.service';
import { medauthorise } from '../resource/medauthorise.designer';
import { GPConnectItemVM } from '../viewmodel/GPConnectItemVM';
import { MedicationPrescribeVM } from '../ca/prescribe/medicationprescribevm';
import { IPPMABaseVM } from '../viewmodel/ippmabasevm';
import { AppActivityBB } from 'src/app/lorappcommonbb/appactivitybb';
import { meddiscontinuecancelChild } from 'src/app/lorappmedicationcommonbb/child/meddiscontinuecancelchild';
import { medonbehalfof } from 'src/app/lorappmedicationcommonbb/view/medonbehalfof';
import { meddispensinginstructions } from './dispensinginstruction';
import { medsupplydispensinginstructionstab } from './medsupplydispensinginstructionstab';
import { medsupplydispensinginstructions } from './medsupplydispensinginstructions';
import { DisplayOtherInformationLineItemPipe1, DisplayPrescriptionLineItemPipe1, InfoIconPipe } from 'src/app/product/shared/pipes/medicationconverters.pipe';
var that;
@Component({
  selector: 'MedAuthorise',
  templateUrl: './medauthorise.html',
  styleUrls: ['./medauthorise.css'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class MedAuthorise
  extends AppActivityBB
  implements OnInit, AfterViewInit {
  override _DataContext: ClinicallyVerifyVM;
  override get DataContext() {
    return this._DataContext;
  }
  @Input() override set DataContext(value: ClinicallyVerifyVM) {
    this._DataContext = value;
  }
  public Styles = ControlStyles;
  clinicallyVerifyVM: ClinicallyVerifyVM;
  oItemVM: PrescriptionItemVM;
  oResultVM: RequestandResultVM;
  bIsLoaded: boolean;
  isLoaded: boolean = false;
  isConflictExists: boolean = false;
  isDeactivatedDrugExists: boolean = false;
  isInfusionRateAmended: boolean = false;
  isInfusionConcentrationAmended: boolean = false;
  isCancelDisConExists: boolean = false;
  public bIsInfDiscontinue: boolean = false;
  public bIsOrdDiscontinue: boolean = false;
  deactiveDrug: string = String.Empty;
  InfusionRateAmendedItemDetails: string = String.Empty;
  InfusionConcentrationAmendedItemDetails: string = String.Empty;
  CancelledDiscontinueItemDetails: string = String.Empty;
  private objProcessingItemVM: PrescriptionItemVM;
  private LockedItemOIds: ArrayOfLong = null;
  discanc: meddiscontinuecancelChild;
  // objResults: medrecentresultschild;
  // objmedaddtofavouritesChild: medaddtofavouritesChild;
  objmedonbehalfofChild: medonbehalfof;
  private oMultiSelectListView: MultiSelectListView;
  public sStationeryTypeOID: string = String.Empty;
  public sStationeryTypeName: string = String.Empty;
  public sStationeryTypeCode: string = String.Empty;
  lastCancelDiscontinueOID: number;
  deactiveCompDrug: string = String.Empty;
  oSelectedItem: PrescriptionItemVM = null;
  // objSupplyInstruction: medsupplydispensinginstructionstab;
  // private odisInst: meddispensinginstructions;

  private oChildWindow: ChildWindow;
  msgBoxConflicts: iMessageBox;
  msgBoxCancelledDiscontinue: iMessageBox;
  msgBoxDeactivate: iMessageBox;
  IsEnableCVSupplyInstruction: boolean = true;
  IsMsgSupplyInstruction: boolean = false;
  nGridCurrentRowIndex: number = -1;
  ddetChild: medddetailsChild;
  OSelectedAllowedToDiscontinue: ObservableCollection<Object> = null;
  listDrugNames: StringBuilder = null;
  private supplystatus: string;
  @ViewChild(GridLayoutDirective) LayoutRoot;

  public resKey = Resource.MedicationForm;
  public Infusion = Resource.Infusion;
  public authorise = Resource.medauthorise;
  // public InfoIconKey = InfoIcon;
  // public StartDTTMKey = DTTMDisplay;
  // public MedLineDisplay = DisplayPrescriptionLineItem;
  // public MedLineDisplayOtherInfo = DisplayOtherInformationLineItem;
  // public MedClrkSrc = CListItemsDisplay;
  // public DischargeLeaveDTTMConvertor = DTTMDisplay;
  // public MedClrkToolTip = WrapToolTip;
  public oVM: ClinicallyVerifyVM;
  public grdResolve: GridExtension = new GridExtension();
  public PrescriptionItem_Header = this.authorise.PrescriptionItem_Header;
  public StartDTTM_Header = this.authorise.StartDTTM_Header;

  @ViewChild('grdResolveTempRef', { read: GridComponent }) set _gridTest(
    comp: GridComponent
  ) {
    if (comp) {
      this.grdResolve.grid = comp;
      this.grdResolve.columns = comp.columns;
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
  @ViewChildren(DataTemplate) dataTemplates: QueryList<DataTemplate>;
  @ViewChildren('temp', { read: DataTemplate })
  set _dataTemplates(v: QueryList<DataTemplate>) {
    if (v) {
      this.dataTemplates = v;
      this.grdResolve.dataTemplates = v;
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
  private lblDisplayText: iLabel;
  @ViewChild('lblDisplayTextTempRef', { read: iLabel, static: false })
  set _lblDisplayText(c: iLabel) {
    if (c) {
      this.lblDisplayText = c;
    }
  }
  public cmdReconcile: iButton;
  @ViewChild('cmdReconcileTempRef', { read: iButton, static: false })
  set _cmdReconcile(c: iButton) {
    if (c) {
      this.cmdReconcile = c;
    }
  }
  private cmdMedAdmin: iButton;
  @ViewChild('cmdMedAdminTempRef', { read: iButton, static: false })
  set _cmdMedAdmin(c: iButton) {
    if (c) {
      this.cmdMedAdmin = c;
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
  @ViewChild('iCheckBox1TempRef', { read: iCheckBox, static: false })
  set _iCheckBox2(c: iCheckBox) {
    if (c) {
      this.iCheckBox2 = c;
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
  public cmdDiscontinueCancel: iButton;
  @ViewChild('cmdDiscontinueCancelTempRef', { read: iButton, static: false })
  set _cmdDiscontinueCancel(c: iButton) {
    if (c) {
      this.cmdDiscontinueCancel = c;
    }
  }

  public cmdOtherLinks: iButton;
  @ViewChild('cmdOtherLinksTempRef', { read: iButton, static: false })
  set _cmdOtherLinks(c: iButton) {
    if (c) {
      this.cmdOtherLinks = c;
    }
  }

  public cmdLink: iButton;
  @ViewChild('cmdLinkTempRef', { read: iButton, static: false }) set _cmdLink(
    c: iButton
  ) {
    if (c) {
      this.cmdLink = c;
    }
  }

  public cmdRemove: iButton;
  @ViewChild('cmdRemoveTempRef', { read: iButton, static: false })
  set _cmdRemove(c: iButton) {
    if (c) {
      this.cmdRemove = c;
    }
  }

  public cmdDoseCal: iButton;
  @ViewChild('cmdDoseCalTempRef', { read: iButton, static: false })
  set _cmdDoseCal(c: iButton) {
    if (c) {
      this.cmdDoseCal = c;
    }
  }

  // public cmdFBChart: iButton;
  // @ViewChild('cmdFBChartTempRef', { read: iButton, static: false })
  // set _cmdFBChart(c: iButton) {
  //   if (c) {
  //     this.cmdFBChart = c;
  //   }
  // }

  public cmdReviewDetails: iButton;
  @ViewChild('cmdReviewDetailsTempRef', { read: iButton, static: false })
  set _cmdReviewDetails(c: iButton) {
    if (c) {
      this.cmdReviewDetails = c;
    }
  }

  public cmdObservationResults: iButton;
  @ViewChild('cmdObservationResultsTempRef', { read: iButton, static: false })
  set _cmdObservationResults(c: iButton) {
    if (c) {
      this.cmdObservationResults = c;
    }
  }

  public cmdOnbehalfOf: iButton;
  @ViewChild('cmdOnbehalfOfTempRef', { read: iButton, static: false })
  set _cmdOnbehalfOf(c: iButton) {
    if (c) {
      this.cmdOnbehalfOf = c;
    }
  }

  constructor(private changeDetectionRef?: ChangeDetectorRef) {
    super();
    that = this;
    // InitializeComponent();
    // this.LayoutRoot.Width = Application.Current.Host.Content.ActualWidth - 10;
    // this.LayoutRoot.Height = Application.Current.Host.Content.ActualHeight - 205;
  }
  ngOnInit(): void {
    this.grdResolve.IsRowClickCheckboxSelection = true;
    this.grdResolve.onCellClick = (s, e) => { this.grdResolve_onCellClick(s, e); };
    this.oVM = this.DataContext;
    this.grdResolve.GridSelectionChange = (s, e) => {
      this.grdResolve_SelectionChanged(s, e);
    };
  }
  public maxscroll ;
  public divwidth;
  public maxLayoutHeight;
  public maxGridHeight;
  ngAfterViewInit(): void {
    this.maxscroll = (window.devicePixelRatio == 1) ? true : false;
    this.divwidth = (window.devicePixelRatio ==1) ? 'auto' :799;
    this.grdResolve.GenerateColumns();
    this.grdResolve.changeDetectionRef = this.changeDetectionRef;
    this.UserControl_Loaded(null, null);
    // this.grdResolve.SetBinding('data', this.DataContext.MedsResolve);
    // this.grdResolve_DataLoaded({}, {});
    this.iTab1.AddTabItem(
      'RecordedMedications',
      'Recorded medication',
      new MedTabs(),
      true,
      'Recorded medication'
    );
    if (String.Compare(ContextInfo.MenuCode, 'MED_CA_AUTHORISE_P2') != 0) {
      this.iTab1.AddTabItem(
        'Search',
        'Search',
        new medQuickselect(this.changeDetectionRef),
        false,
        'Search'
      );
    }
    let oBinding: Binding = new Binding('EnableFauxTabs');
    oBinding.Mode = BindingMode.OneWay;
    this.iTab1
      .GetItem('RecordedMedications')
      .SetBinding(iTabItem.IsEnabledProperty, oBinding);
    this.iTab1
      .GetItem('Search')
      .SetBinding(iTabItem.IsEnabledProperty, oBinding);
    // iThemeManager.SetApplicationTheme("/LorArcBlueBirdTheme;component/Themes/Generic.xaml");
    this.bIsLoaded = false;
    this.DefaultEnableDisableSupplyInstruction();
    this.EnableDisableLinks(true, false, false, false, false, false);
    let sPrescType: string = String.Empty;
    let sQueryContext: string =
      SLQueryCollection.GetQueryStringValue('ContextData');
    if (!String.IsNullOrEmpty(sQueryContext)) {
      sQueryContext = sQueryContext.Replace('~|', '&');
      sQueryContext = sQueryContext.Replace('|~', '=');
      let arrsQueryContext: string[] = sQueryContext.Split('&');
      if (arrsQueryContext.Count() > 0) {
        arrsQueryContext.forEach((s) => {
          let sKeyValue: string[] = s.Split('=');
          if (String.Compare(sKeyValue[0], 'PrescType') == 0) {
            sPrescType = sKeyValue[1];
          } else if (String.Compare(sKeyValue[0], 'StationeryTypeOID') == 0) {
            this.sStationeryTypeOID = sKeyValue[1];
          } else if (String.Compare(sKeyValue[0], 'StationeryTypeName') == 0) {
            this.sStationeryTypeName = sKeyValue[1];
          } else if (String.Compare(sKeyValue[0], 'StationeryTypeCode') == 0) {
            this.sStationeryTypeCode = sKeyValue[1];
            // break;
          }
        });
      }
    }
    this.oVM.PropertyChanged = (s, e) => {
      if (e.PropertyName == 'MedsResolve') {
        this.grdResolve_DataLoaded(null, null);
      }
    }
    if(window.screen.height < 1000 && window.devicePixelRatio != 1.25){
    if (
      (QueryStringInfo.IsLaunchformchart == 'True') ||
      (QueryStringInfo.IsLaunchformPreschart == 'True')){
        this.maxLayoutHeight = 435;
        this.maxGridHeight = 224;
      }
    else{
      // alert("false");
      this.maxLayoutHeight = 470;
      this.maxGridHeight = 260;
    }
  }
  else{
    if (
      ((QueryStringInfo.IsLaunchformchart == 'True') ||
      (QueryStringInfo.IsLaunchformPreschart == 'True')) && !this.isChildWizard){
        this.maxLayoutHeight = 720;
        this.maxGridHeight = 548;
      }
      else if(!this.isChildWizard){
        this.maxLayoutHeight = window.innerHeight - 8;
        this.maxGridHeight = window.innerHeight - 227;
      }
    
  }
    this.oVM.ChangeDetection.subscribe(()=>{
      this.changeDetectionRef.markForCheck();
    })

    this.oVM.ActionOn221_ResolveGrid.subscribe(()=>{
      this.SelectRowByIndexOn221Response() ;
    });
  }
  rowLoaded(context: any) {
    let rowEventArgs = this.grdResolve.GetRowEventArgs(
      this.dataTemplates,
      context
    );
    this.grdResolve_RowLoaded({}, rowEventArgs);
    if(rowEventArgs.index == this.grdResolve.ItemsSource?.Count-1){
      this.isLoaded = true;
      this.changeDetectionRef.markForCheck();
    }
  }
  rowCallback = (context: RowClassArgs) => {
    let rowStyles = this.grdResolve.getRowStyles(context);
    return rowStyles;
  };

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
  public DisableLHSTabs(s, e): void {
    this.clinicallyVerifyVM.EnableFauxTabs = false;
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
  }
  cmdLink_Click_Func = (s, e) => {
    Object.keys(that).forEach((prop) => (this[prop] = that[prop]));
    this.cmdLinks_Click(s, e);
  }
  public EnableLHSTabs(): void {
    this.clinicallyVerifyVM.EnableFauxTabs = true;
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
    this.clinicallyVerifyVM.blMaxMsgFlag = false;
  }
  cmdDispensingInstr_Click(sender: Object, e: RoutedEventArgs): void {
    if (this.clinicallyVerifyVM.oDispensingItemVM != null) {
      this.oItemVM = this.clinicallyVerifyVM.oDispensingItemVM;
    } else if (
      this.clinicallyVerifyVM != null &&
      this.clinicallyVerifyVM.MedsResolve != null &&
      this.clinicallyVerifyVM.MedsResolve.Count > 0
    ) {
      this.oItemVM = ObjectHelper.CreateType<PrescriptionItemVM>(
        this.clinicallyVerifyVM.MedsResolve[0],
        PrescriptionItemVM
      );
      if (this.oItemVM != null && this.oItemVM.IsGroupHeader) {
        this.oItemVM = ObjectHelper.CreateType<PrescriptionItemVM>(
          this.clinicallyVerifyVM.MedsResolve[1],
          PrescriptionItemVM
        );
      }
    }
    if (
      this.oItemVM != null &&
      this.oItemVM.formViewerDetails != null &&
      this.oItemVM.formViewerDetails.TechvalidateCADetails == null
    ) {
      this.oItemVM.formViewerDetails.TechvalidateCADetails =
        new TechvalidateCAVM();
    }
    // To Be Revisited
    let odisInst = new meddispensinginstructions();
    odisInst.cosntructorimpl(this.oItemVM);
    // ObjectHelper.stopFinishAndCancelEvent(true);
    let dialogWindowHeight = (700/window.devicePixelRatio);
    AppActivity.OpenWindow(Resource.Dispensinginstruction.sTitle, odisInst, (s, e) => { this.dispensinginstruction_Close(s) }, " ", false, dialogWindowHeight, 750, false, WindowButtonType.OkCancel, null);
  }
  dispensinginstruction_Close(args: AppDialogEventargs): void {
    this.oChildWindow = args.AppChildWindow;
    if (args.Result == AppDialogResult.Cancel) {
      // ObjectHelper.stopFinishAndCancelEvent(false);
      let iMsgBox: iMessageBox = ObjectHelper.CreateObject(new iMessageBox(), {
        Title: Resource.TechValidate.Titles,
        Message: Resource.disconcan1.Cancel_Error_Message,
        MessageButton: MessageBoxButton.YesNo,
        IconType: MessageBoxType.Question,
      });
      iMsgBox.MessageBoxClose = (s, e) => {
        this.iMsgBox_MessageBoxClose_App(s, e);
      };
      iMsgBox.Show();
    } else if (args.Result == AppDialogResult.Ok) {
      let bdialogresult: boolean = false;
      // ObjectHelper.stopFinishAndCancelEvent(false);
      let oContent = ObjectHelper.CreateType<meddispensinginstructions>(args.Content.Component, meddispensinginstructions);
      if (oContent != null) {
        let oDispensingInstructionsVM: DispensingInstructionsVM = ObjectHelper.CreateType<DispensingInstructionsVM>(oContent.DataContext, DispensingInstructionsVM);
        if (oDispensingInstructionsVM != null) {
          bdialogresult = oDispensingInstructionsVM.CheckValidation();
          if (bdialogresult) {
            this.clinicallyVerifyVM.oDispensingItemVM = ObjectHelper.CreateType<PrescriptionItemVM>(this.clinicallyVerifyVM.MedsResolve[0], PrescriptionItemVM);
            if (this.clinicallyVerifyVM.oDispensingItemVM != null && this.clinicallyVerifyVM.oDispensingItemVM.IsGroupHeader) {
              this.clinicallyVerifyVM.oDispensingItemVM = ObjectHelper.CreateType<PrescriptionItemVM>(this.clinicallyVerifyVM.MedsResolve[1], PrescriptionItemVM);
            }
            if (this.clinicallyVerifyVM.oDispensingItemVM != null && this.clinicallyVerifyVM.oDispensingItemVM.FormViewerDetails != null && this.clinicallyVerifyVM.oDispensingItemVM.FormViewerDetails.TechvalidateCADetails == null) {
              this.clinicallyVerifyVM.oDispensingItemVM.FormViewerDetails.TechvalidateCADetails = new TechvalidateCAVM();
            }
            if (this.clinicallyVerifyVM.oDispensingItemVM != null && this.clinicallyVerifyVM.oDispensingItemVM.FormViewerDetails != null && this.clinicallyVerifyVM.oDispensingItemVM.FormViewerDetails.TechvalidateCADetails != null) {
              let oDispensingInstructions: ObservableCollection<CListItem> = oDispensingInstructionsVM.DispensingInstructionsList;
              if (oDispensingInstructions != null && oDispensingInstructions.Count > 0) {
                this.clinicallyVerifyVM.oDispensingItemVM.FormViewerDetails.TechvalidateCADetails.DispensingInstruction = new ObservableCollection<CListItem>();
                oDispensingInstructions.forEach((oSelClistItem) => {
                  if (oSelClistItem.IsSelected) {
                    this.clinicallyVerifyVM.oDispensingItemVM.FormViewerDetails.TechvalidateCADetails.DispensingInstruction.Add(oSelClistItem);
                    if (String.Compare(oSelClistItem.Value, CConstants.Other, StringComparison.CurrentCultureIgnoreCase) == 0) {
                      if (!String.IsNullOrEmpty(oDispensingInstructionsVM.sOtherInstructions)) {
                        this.clinicallyVerifyVM.oDispensingItemVM.FormViewerDetails.TechvalidateCADetails.OtherDispensingInstruction = oDispensingInstructionsVM.sOtherInstructions;
                        oSelClistItem.Tag = oDispensingInstructionsVM.sOtherInstructions;
                      }
                      else {
                        this.clinicallyVerifyVM.oDispensingItemVM.FormViewerDetails.TechvalidateCADetails.OtherDispensingInstruction = String.Empty;
                        oSelClistItem.Tag = String.Empty;
                      }
                    }
                  }
                });
              }
              this.clinicallyVerifyVM.oDispensingItemVM.FormViewerDetails.TechvalidateCADetails.sAdditionalcomments = oDispensingInstructionsVM.sAdditionalcomments;
            }
            this.oChildWindow.DialogResult = true;
          }
        }
      }
    }
  }
  iMsgBox_MessageBoxClose_App(sender: Object, e: MessageEventArgs): void {
    if (e.MessageBoxResult == MessageBoxResult.Yes) {
      this.oChildWindow.DialogResult = true;
    }
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
        oGridColumn.DisplayIndex = oColumn.DisplayOrder + 3;
        /*
              if (
                String.Compare(
                  sColName,
                  'PrescriptionItem',
                  StringComparison.OrdinalIgnoreCase
                ) == 0
              ) {
                let oDrugItemColActualWidth: number = 0;
                Number.TryParse(
                  this.grdResolve.Columns[
                    this.grdResolve.GetColumnIndexByName('ClinicalVerify')
                  ].ActualWidth.ToString(),
                  (o) => {
                    oDrugItemColActualWidth = o;
                  }
                );
                oGridColumn.Width = new GridViewLength(
                  oColumn.Width - oDrugItemColActualWidth,
                  GridViewLengthUnitType.Star
                );
              } else {
                oGridColumn.Width = oColumn.Width;
              }
        */
       if( window.screen.height < 1000 && window.devicePixelRatio != 1.25){
        if(oColumn.Name == 'PrescriptionItem'){
          oGridColumn.Width = 220;
        }
        if(oColumn.Name == 'Otherinformation'){
          oGridColumn.Width = 70;
        }
        if(oColumn.Name == 'StartDTTMVWR'){
          oGridColumn.Width = 65;
        }
       }
       else{
        oGridColumn.Width = oColumn.Width;
       }
        oGridColumn.IsVisible = typeof oColumn.Visible == "string" ? (
          oColumn.Visible == "true" ? true : false
        ) : oColumn.Visible;
        oGridColumn.IsResizable = oColumn.CanResize;
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
            ) == 0
          ) {
            // oGridColumn.Header = 'DateTime.commenced';
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
            ) == 0
          ) {
            //  oGridColumn.Header = 'Clerked item';
            oGridColumn.Header = this.PrescriptionItem_Header = 'Clerked item';
          }
        }
      }
    });
  }
  AutoAdjustGridColumns(): void {
    let iConsolidatedWidth: number = 0;
    let nTotalGridColumns: number = this.grdResolve.Columns.Count;
    for (let nCounter: number = 0; nCounter < nTotalGridColumns; nCounter++) {
      if (this.grdResolve.Columns[nCounter].IsVisible) {
        let oDrugItemColActualWidth: number = 0;
        Number.TryParse(
          this.grdResolve.Columns[nCounter].ActualWidth.ToString(),
          (o) => {
            oDrugItemColActualWidth = o;
          }
        );
        iConsolidatedWidth = iConsolidatedWidth + oDrugItemColActualWidth;
      }
    }
    let iActualWidth: number = 0;
    Number.TryParse(this.grdResolve.ActualWidth.ToString(), (o) => {
      iActualWidth = o;
    });
    if (iConsolidatedWidth > iActualWidth) {
      let oDrugItemColActualWidth: number = 0;
      Number.TryParse(
        this.grdResolve.Columns[
          this.grdResolve.GetColumnIndexByName('ClinicalVerify')
        ].ActualWidth.ToString(),
        (o) => {
          oDrugItemColActualWidth = o;
        }
      );
      let iWidthAdjusted: number =
        iConsolidatedWidth - iActualWidth - oDrugItemColActualWidth;
      let oGridColumn: GridViewColumn =
        this.grdResolve.Columns['PrescriptionItem'];
      if (oGridColumn instanceof GridViewColumn) {
        // Number.TryParse(oGridColumn.ActualWidth.ToString(), (o) => {oDrugItemColActualWidth=o});
        oGridColumn.Width = new GridViewLength(
          Convert.ToDouble(oDrugItemColActualWidth - iWidthAdjusted)
        );
      }
    }
  }
  private grdResolve_SelectionChanged(
    sender: Object,
    e: SelectionChangeEventArgs
  ): void {
    if (this.grdResolve.GetSelectedRowCount() == 0) {
      this.DefaultEnableDisableSupplyInstruction();
      this.EnableDisableLinks(true, false, false, false, false, false);
    } else {
      this.oItemVM = ObjectHelper.CreateType<PrescriptionItemVM>(
        this.grdResolve.SelectedItem,
        PrescriptionItemVM
      );
      if (
        this.oItemVM != null &&
        this.oItemVM.IsGroupHeader &&
        this.grdResolve.GetSelectedRowCount() == 1
      ) {
        this.cmdLinks.IsEnabled = this.cmdObservationResults.IsEnabled = false;
        this.cmdDiscontinueCancel.Visibility = Visibility.Collapsed;
        this.cmdOnbehalfOf.Visibility = Visibility.Collapsed;
        this.cmdRemove.Visibility = Visibility.Collapsed;
        if (this.clinicallyVerifyVM != null)
          this.clinicallyVerifyVM.IsEnableCVSupplyInstruction = false;
        return;
      }
      this.EnableLinks(this.grdResolve.GetSelectedRowCount());
    }
  }
  DefaultEnableDisableSupplyInstruction(s?, e?): void {
    let nTotalRecords: number = this.grdResolve.GetRowCount();
    let nActiveitemCnt: number = 0;
    if (nTotalRecords > 0) {
      for (let nTotItem: number = 0; nTotItem < nTotalRecords; nTotItem++) {
        let oDefSuppItemVM: PrescriptionItemVM =
          ObjectHelper.CreateType<PrescriptionItemVM>(
            this.grdResolve.GetRowData(nTotItem),
            PrescriptionItemVM
          );
        if (oDefSuppItemVM != null) {
          if (
            String.IsNullOrEmpty(oDefSuppItemVM.GroupHeaderName) &&
            !String.Equals(
              oDefSuppItemVM.PrescriptionItemStatus,
              CConstants.DISCONTINUED,
              StringComparison.CurrentCultureIgnoreCase
            ) &&
            !String.Equals(
              oDefSuppItemVM.PrescriptionItemStatus,
              CConstants.CANCELLED,
              StringComparison.CurrentCultureIgnoreCase
            ) &&
            !String.Equals(
              oDefSuppItemVM.PrescriptionItemStatus,
              CConstants.AWAITINGAUTHORISE,
              StringComparison.CurrentCultureIgnoreCase
            ) &&
            !String.Equals(
              oDefSuppItemVM.PrescriptionItemStatus,
              CConstants.ONHOLD,
              StringComparison.CurrentCultureIgnoreCase
            ) &&
            !String.Equals(
              oDefSuppItemVM.PrescriptionItemStatus,
              CConstants.COMPLETED,
              StringComparison.CurrentCultureIgnoreCase
            ) &&
            !oDefSuppItemVM.IsOrderSetHeader &&
            oDefSuppItemVM.FormViewerDetails != null &&
            oDefSuppItemVM.FormViewerDetails.BasicDetails != null &&
            !String.Equals(
              oDefSuppItemVM.FormViewerDetails.BasicDetails.IdentifyingType,
              CConstants.NONCATALOGUEITEM,
              StringComparison.CurrentCultureIgnoreCase
            ) &&
            !String.Equals(
              oDefSuppItemVM.FormViewerDetails.BasicDetails.IdentifyingType,
              CConstants.Precatalog,
              StringComparison.CurrentCultureIgnoreCase
            )
          ) {
            nActiveitemCnt = nActiveitemCnt + 1;
          }
        }
      }
      if (nActiveitemCnt > 0) this.IsEnableCVSupplyInstruction = true;
      else this.IsEnableCVSupplyInstruction = false;
    } else {
      this.IsEnableCVSupplyInstruction = false;
    }
    if (this.clinicallyVerifyVM != null)
      this.clinicallyVerifyVM.IsEnableCVSupplyInstruction =
        this.IsEnableCVSupplyInstruction;
  }
  EnableDisableSupplyInstforSelectedItem(): void {
    let nOtherThanActiveitemCnt: number = 0;
    let ncount: number = 0;
    this.grdResolve.SelectedItems.forEach((objItemVM) => {
      let oSelSupItemVM: PrescriptionItemVM =
        ObjectHelper.CreateType<PrescriptionItemVM>(
          objItemVM,
          PrescriptionItemVM
        );
      if (oSelSupItemVM.IsGroupHeader) {
        ncount++;
      }
      if (oSelSupItemVM != null) {
        if (
          String.Equals(
            oSelSupItemVM.PrescriptionItemStatus,
            CConstants.DISCONTINUED,
            StringComparison.CurrentCultureIgnoreCase
          ) ||
          String.Equals(
            oSelSupItemVM.PrescriptionItemStatus,
            CConstants.CANCELLED,
            StringComparison.CurrentCultureIgnoreCase
          ) ||
          String.Equals(
            oSelSupItemVM.PrescriptionItemStatus,
            CConstants.AWAITINGAUTHORISE,
            StringComparison.CurrentCultureIgnoreCase
          ) ||
          String.Equals(
            oSelSupItemVM.PrescriptionItemStatus,
            CConstants.ONHOLD,
            StringComparison.CurrentCultureIgnoreCase
          ) ||
          String.Equals(
            oSelSupItemVM.PrescriptionItemStatus,
            CConstants.COMPLETED,
            StringComparison.CurrentCultureIgnoreCase
          ) ||
          oSelSupItemVM.IsOrderSetHeader
        ) {
          nOtherThanActiveitemCnt = nOtherThanActiveitemCnt + 1;
        }
      }
    });
    if (nOtherThanActiveitemCnt > 0) this.IsEnableCVSupplyInstruction = false;
    else this.IsEnableCVSupplyInstruction = true;
    if (
      this.grdResolve.SelectedItems != null &&
      ncount == this.grdResolve.SelectedItems.Count
    ) {
      this.IsEnableCVSupplyInstruction = false;
    }
    if (this.clinicallyVerifyVM != null)
      this.clinicallyVerifyVM.IsEnableCVSupplyInstruction =
        this.IsEnableCVSupplyInstruction;
  }
  EnableLinks(nCnt: number): void {
    let ncount: number = 0;
    let IsTechvalidate: boolean = false;
    let DiscontinuedCancelled: boolean = true;
    let bOnbehalfOf: boolean = true;
    let sPrescriptionNumber: string = String.Empty;
    let isNewDrugs: boolean = false;
    let IsOldDrugs: boolean = false;
    let IsDeactiveDrug: boolean = false;
    let sCurUserOID: string = String.IsNullOrEmpty(AppContextInfo.UserOID)
      ? AppContextInfo.UserOID
      : String.Empty;
    let sPrescriberOID: string = String.Empty;
    let bDisableLnk_Rslt: boolean = false;
    let IsDifferentuser: boolean = false;
    this.grdResolve.SelectedItems.forEach((objItemVM) => {
      let oItemVM: PrescriptionItemVM =
        ObjectHelper.CreateType<PrescriptionItemVM>(
          objItemVM,
          PrescriptionItemVM
        );
      sPrescriptionNumber = oItemVM.PrescriptionNumber;
      if (oItemVM.IsGroupHeader) {
        ncount++;
      }
      if (!oItemVM.IsGroupHeader) {
        if (oItemVM != null)
          this.clinicallyVerifyVM.SelectedPrescribeItem = oItemVM;
        if (
          !String.IsNullOrEmpty(oItemVM.OperationMode) &&
          String.Compare(oItemVM.OperationMode, 'N') == 0
        ) {
          isNewDrugs = true;
          DiscontinuedCancelled = false;
          if (
            oItemVM.ActionCode != ActivityTypes.Amend &&
            oItemVM.ActionCode != ActivityTypes.Reorder &&
            oItemVM.ActionCode != ActivityTypes.Prescribe
          )
            bOnbehalfOf = false;
        } else {
          IsOldDrugs = true;
          if (
            String.Compare(
              oItemVM.PrescriptionItemStatus,
              CConstants.DISCONTINUED,
              StringComparison.InvariantCultureIgnoreCase
            ) == 0 ||
            String.Compare(
              oItemVM.PrescriptionItemStatus,
              CConstants.CANCELLED,
              StringComparison.InvariantCultureIgnoreCase
            ) == 0
          ) {
            bDisableLnk_Rslt = true;
            DiscontinuedCancelled = false;
          } else if (
            String.Compare(
              oItemVM.PrescriptionItemStatus,
              CConstants.AWAITINGAUTHORISE
            ) == 0 ||
            String.Compare(oItemVM.PrescriptionItemStatus, CConstants.ONHOLD) ==
            0
          ) {
            DiscontinuedCancelled = false;
          } else if (
            String.Compare(
              oItemVM.PrescriptionItemStatus,
              CConstants.COMPLETED,
              StringComparison.OrdinalIgnoreCase
            ) == 0
          ) {
            DiscontinuedCancelled = false;
          }
          if (
            oItemVM.FormViewerDetails != null &&
            oItemVM.FormViewerDetails.BasicDetails != null &&
            String.Compare(
              oItemVM.FormViewerDetails.BasicDetails.ReplaceDrugActiveStatus.ToString(),
              '0',
              StringComparison.CurrentCultureIgnoreCase
            ) == 0 &&
            String.Compare(
              oItemVM.DrugVersionMatch.ToString(),
              '1',
              StringComparison.CurrentCultureIgnoreCase
            ) == 0
          ) {
            IsDeactiveDrug = true;
          }
          if (
            oItemVM.PrescriberDetails != null &&
            ContextInfo.UserOID != oItemVM.PrescriberDetails.OID
          )
            IsDifferentuser = true;
          if (String.IsNullOrEmpty(oItemVM.DiscontinueCancelAction))
            bOnbehalfOf = false;
        }
        let IsTechvalidateUpdate: boolean = false;
        if (
          oItemVM.FormViewerDetails != null &&
          oItemVM.FormViewerDetails.TechValidateDetails != null &&
          oItemVM.FormViewerDetails.TechValidateDetails
            .Technicalvalidateupdate == true
        )
          IsTechvalidateUpdate = true;
        let SelectedRowItems: IEnumerable<PrescriptionItemVM> =
          this.grdResolve.SelectedItems.Cast<PrescriptionItemVM>();
        let IsenabledOBHInsideFV: boolean = false;
        if (
          oItemVM.FormViewerDetails != null &&
          oItemVM.FormViewerDetails.BasicDetails != null
        ) {
          let selCount: number = SelectedRowItems.Where(
            (x) =>
              x.FormViewerDetails != null &&
              x.FormViewerDetails.BasicDetails != null &&
              x.FormViewerDetails.BasicDetails.IsenableOnbehalfOf
          ).Count();
          if (selCount == SelectedRowItems.Count()) {
            IsenabledOBHInsideFV = true;
          }
        }
        let nSelectedRowCount: number = SelectedRowItems.Where(
          (x) =>
            (String.Compare(x.OperationMode, 'UA') == 0 ||
              String.Compare(x.OperationMode, 'N') == 0) &&
            x.ParentbaseVM != null &&
            (x.ParentbaseVM.IsDurationOnlyChanged ||
              x.ParentbaseVM.IsAmendUpdateOnNonIP ||
              IsTechvalidateUpdate ||
              IsenabledOBHInsideFV)
        ).Count();
        if (nSelectedRowCount == SelectedRowItems.Count()) {
          bOnbehalfOf = true;
        }
      }
    });
    this.EnableDisableSupplyInstforSelectedItem();
    let norgCOUNT: number = 0;
    norgCOUNT = nCnt - ncount;
    if (UserPermissions.PrescribeWithRestriction) {
      DiscontinuedCancelled = IsDifferentuser ? false : DiscontinuedCancelled;
      this.EnableDisableLinks(
        false,
        false,
        norgCOUNT == 1 && !bDisableLnk_Rslt,
        false,
        DiscontinuedCancelled,
        isNewDrugs && !IsOldDrugs
      );
    } else {
      this.EnableDisableLinks(
        IsTechvalidate,
        bOnbehalfOf,
        norgCOUNT == 1 && !bDisableLnk_Rslt,
        norgCOUNT == 1 && !IsOldDrugs && !IsDeactiveDrug,
        DiscontinuedCancelled,
        isNewDrugs && !IsOldDrugs
      );
    }
    if (
      this.grdResolve.SelectedItems != null &&
      ncount == this.grdResolve.SelectedItems.Count
    ) {
      this.cmdLinks.IsEnabled = this.cmdObservationResults.IsEnabled = false;
      this.cmdDiscontinueCancel.Visibility = Visibility.Collapsed;
      this.cmdOnbehalfOf.Visibility = Visibility.Collapsed;
    }
  }
  EnableDisableLinks(
    bTechValidate: boolean,
    bOnbehalfOf: boolean,
    blink_Results: boolean,
    bDoseCalculator: boolean,
    bDiscontinueCancel: boolean,
    bRemove: boolean
  ): void {
    if (bTechValidate) {
      let sPermission: string = String.Empty;
      if (!String.IsNullOrEmpty(CPremission.sPremission)) {
        sPermission = CPremission.sPremission;
      } else if (ContextManager.Instance['PermissionDetails'] != null) {
        sPermission = ContextManager.Instance['PermissionDetails'].ToString();
      }
      if (!String.IsNullOrEmpty(sPermission)) {
        let arrPresmission: string[] = sPermission.Split(',');
        let _TmpPermissionCount: number =
          arrPresmission != null ? arrPresmission.Count() : 0;
        if (_TmpPermissionCount > 14) {
          bTechValidate = String.Equals(arrPresmission[14], '1');
        }
      }
    }
    this.cmdOnbehalfOf.IsEnabled = bOnbehalfOf;
    if (bOnbehalfOf) this.cmdOnbehalfOf.Visibility = Visibility.Visible;
    else this.cmdOnbehalfOf.Visibility = Visibility.Collapsed;
    this.cmdLinks.IsEnabled = this.cmdObservationResults.IsEnabled =
      blink_Results;
    this.cmdDiscontinueCancel.IsEnabled = bDiscontinueCancel;
    if (bDiscontinueCancel)
      this.cmdDiscontinueCancel.Visibility = Visibility.Visible;
    else this.cmdDiscontinueCancel.Visibility = Visibility.Collapsed;
    this.cmdRemove.IsEnabled = bRemove;
    if (bRemove) this.cmdRemove.Visibility = Visibility.Visible;
    else this.cmdRemove.Visibility = Visibility.Collapsed;
  }
  oholdc_Closed(sender: Object, e: EventArgs): void { }
  private grdResolve_onCellKeyPress(
    sender: Object,
    args: GridViewCellClickEventArgs
  ): void { }
  dataGridRow: GridViewRow;

  private isDontIncludeChkboxCol: boolean = true;
  private grdResolve_RowLoaded(sender: Object, e: RowLoadedEventArgs): void {
    let dataGridRow: GridViewRow;
    if (e.Row != null && e.Row.Item != null) {
      let oItemVM: PrescriptionItemVM =
        ObjectHelper.CreateType<PrescriptionItemVM>(
          e.Row.Item,
          PrescriptionItemVM
        );
      if (oItemVM instanceof PrescriptionItemVM) {
        dataGridRow = ObjectHelper.CreateType<GridViewRow>(e.Row, GridViewRow);
        if (
          oItemVM != null &&
          oItemVM.FormViewerDetails != null &&
          oItemVM.FormViewerDetails.BasicDetails != null &&
          (oItemVM.FormViewerDetails.BasicDetails.AsRequired ||
            String.Equals(
              oItemVM.FormViewerDetails.BasicDetails.Direction,
              CConstants.AsNeeded,
              StringComparison.InvariantCultureIgnoreCase
            ))
        ) {
          // Not Needed

          // e.Row.Background = new SolidColorBrush(MedChartData.AsRequiredSlotsColor);
          // e.dataItem['RowStyles'].push('AsRequiredSlotsColor');
          this.grdResolve.SetRowStyle(e, MedChartData.AsRequiredSlotsColor.color, 'Background');
          e.Row.IsAlternating = false;
        }
        else { this.grdResolve.SetRowStyle(e, "", 'Background'); }
        if (oItemVM.IsGroupHeader) {
          if (oItemVM.IsFirstHeader) {
            // Not Needed
            // let rowBorder: Border = e.Row.ChildrenOfType<Border>().Where(c => c.Name == "PART_RowBordeTOP").First();
            // rowBorder.Visibility = Visibility.Visible;
            // rowBorder.BorderThickness = new Thickness(0, 2, 0, 0);
            e.dataItem['RowStyles'].push('PART_RowBordeTOP');
          }
          // let chk: CheckBox = e.Row.ChildrenOfType<CheckBox>()
          //   .Where((c) => c.Name == 'chckClinicalVerify')
          //   .First();
          // //Check
          // chk.Visibility = Visibility.Collapsed;
          // this.dataGridRow = ObjectHelper.CreateType<GridViewRow>(
          //   e.Row,
          //   GridViewRow
          // );
          // let GS1: GradientStopCollection = new GradientStopCollection();
          if (
            oItemVM.FormViewerDetails.BasicDetails.InfusionDetails != null &&
            oItemVM.FormViewerDetails.BasicDetails.InfusionDetails
              .GroupSequenceNo > 0
          ) {
            // Not Needed
            // e.Row.Background = new SolidColorBrush(Color.FromArgb(255, 118, 179, 180));
            e.dataItem['RowStyles'].push('GroupHeader');
            e.dataItem['RowStyles'].push('PART_RowBordeTOP_Blue');
            this.dataGridRow.Cells[1].Content = null;
            this.dataGridRow.Cells[2].Content = null;
            this.dataGridRow.Cells[3].Content = null;
            this.dataGridRow.Cells[5].Content = null;
            this.dataGridRow.Cells[6].Content = null;
            this.dataGridRow.Cells[7].Content = null;
          } else {
            e.dataItem['RowStyles'].push('GroupHeader');
            // GS1.Add(ObjectHelper.CreateObject(new GradientStop(), { Color: Color.FromArgb(255, 122, 194, 193), Offset: 0.6 }));
            // GS1.Add(ObjectHelper.CreateObject(new GradientStop(), { Color: Color.FromArgb(255, 176, 218, 217), Offset: 0.4 }));
            // e.Row.Background = new LinearGradientBrush(GS1, 90.0);
            console.log('e.dataItem', e.dataItem['RowStyles']);
          }
          console.log('e.dataItem', e.dataItem['RowStyles']);
          e.Row.IsHitTestVisible = false;
          e.Row.IsAlternating = false;
        }
        if (
          CSequentialHelper.IsFirstSequentialInfusionHeader(
            oItemVM,
            ObjectHelper.CreateType<ObservableCollection<PrescriptionItemVM>>(
              this.grdResolve.ItemsSource,
              ObservableCollection<PrescriptionItemVM>
            )
          )
        ) {
          // let rowBorder1: Border = e.Row.ChildrenOfType<Border>().Where(c => c.Name == "PART_RowBordeTOP").FirstOrDefault();
          // if (rowBorder1 != null) {
          //     rowBorder1.Visibility = Visibility.Visible;
          //     rowBorder1.BorderBrush = new SolidColorBrush(Color.FromArgb(255, 63, 72, 204));
          //     rowBorder1.BorderThickness = new Thickness(0, 2, 0, 0);
          // }
          e.dataItem['RowStyles'].push('PART_RowBordeTOP_Blue');
        }
        if (
          CSequentialHelper.IsLastSequentialInfusionItem(
            oItemVM,
            ObjectHelper.CreateType<ObservableCollection<PrescriptionItemVM>>(
              this.grdResolve.ItemsSource,
              ObservableCollection<PrescriptionItemVM>
            )
          )
        ) {
          // let rowBorder1: Border = e.Row.ChildrenOfType<Border>().Where(c => c.Name == "PART_RowBorder").FirstOrDefault();
          if (
            // rowBorder1 != null &&
            String.IsNullOrEmpty(oItemVM.PrescriptionItemStatus) ||
            (!oItemVM.PrescriptionItemStatus.Equals(
              CConstants.CANCELLED,
              StringComparison.OrdinalIgnoreCase
            ) &&
              !oItemVM.PrescriptionItemStatus.Equals(
                CConstants.DISCONTINUED,
                StringComparison.OrdinalIgnoreCase
              ) &&
              !oItemVM.PrescriptionItemStatus.Equals(
                CConstants.COMPLETED,
                StringComparison.OrdinalIgnoreCase
              ))
          ) {
            // rowBorder1.Visibility = Visibility.Visible;
            // rowBorder1.BorderBrush = new SolidColorBrush(Color.FromArgb(255, 63, 72, 204));
            // rowBorder1.BorderThickness = new Thickness(0, 0, 0, 2);
            e.dataItem['RowStyles'].push('PART_RowBorderBOTTOM_Blue');
          }
        }
        if (
          CommonSequentialHelper.IsFirstSequentialInfusionHeader(
            oItemVM,
            ObjectHelper.CreateType<ObservableCollection<PrescriptionItemVM>>(
              this.grdResolve.ItemsSource,
              ObservableCollection<PrescriptionItemVM>
            )
          )
        ) {
          // let rowBorder1: Border = e.Row.ChildrenOfType<Border>().Where(c => c.Name == "PART_RowBordeTOP").FirstOrDefault();
          // if (rowBorder1 != null) {
          //     rowBorder1.Visibility = Visibility.Visible;
          //     rowBorder1.BorderBrush = new SolidColorBrush(Color.FromArgb(255, 63, 72, 204));
          //     rowBorder1.BorderThickness = new Thickness(0, 2, 0, 0);
          // }
          e.dataItem['RowStyles'].push('PART_RowBordeTOP_Blue');
        }
        if (
          CommonSequentialHelper.IsLastSequentialInfusionItem(
            oItemVM,
            ObjectHelper.CreateType<ObservableCollection<PrescriptionItemVM>>(
              this.grdResolve.ItemsSource,
              ObservableCollection<PrescriptionItemVM>
            )
          )
        ) {
          let rowBorder1: Border = e.Row.ChildrenOfType<Border>()
            .Where((c) => c.Name == 'PART_RowBorder')
            .FirstOrDefault();
          if (
            rowBorder1 != null &&
            (String.IsNullOrEmpty(oItemVM.PrescriptionItemStatus) ||
              (!oItemVM.PrescriptionItemStatus.Equals(
                CConstants.CANCELLED,
                StringComparison.OrdinalIgnoreCase
              ) &&
                !oItemVM.PrescriptionItemStatus.Equals(
                  CConstants.DISCONTINUED,
                  StringComparison.OrdinalIgnoreCase
                ) &&
                !oItemVM.PrescriptionItemStatus.Equals(
                  CConstants.COMPLETED,
                  StringComparison.OrdinalIgnoreCase
                )))
          ) {
            e.dataItem['RowStyles'].push('PART_RowBorderBOTTOM_Blue');
            //   rowBorder1.Visibility = Visibility.Visible;
            //   rowBorder1.BorderBrush = new SolidColorBrush(
            //     Color.FromArgb(255, 63, 72, 204)
            //   );
            //   rowBorder1.BorderThickness = new Thickness(0, 0, 0, 2);
          }
        }
        // Implemented in HTML
        //   if (!oItemVM.ShowCells) {
        //     let dataGridRow: GridViewRow = ObjectHelper.CreateType<GridViewRow>(
        //       e.Row,
        //       GridViewRow
        //     );
        //     let objChkBox: CheckBox = ObjectHelper.CreateType<CheckBox>(
        //       dataGridRow.Cells[0].Content,
        //       CheckBox
        //     );
        //     objChkBox.Visibility = Visibility.Collapsed;
        //     dataGridRow.Cells[0].IsEnabled = false;
        //     dataGridRow.Cells[1].IsEnabled = false;
        //     dataGridRow.Cells[2].IsEnabled = false;
        //     dataGridRow.Cells[3].IsEnabled = false;
        //   }
        if (oItemVM instanceof PrescriptionItemVM) {
          if (oItemVM.PrescriptionItemStatus == CConstants.DISCONTINUED) {
            dataGridRow = ObjectHelper.CreateType<GridViewRow>(
              e.Row,
              GridViewRow
            );
            this.grdResolve.UnselectAll();
            if (dataGridRow != null) {
              //dataGridRow.Background = new SolidColorBrush(Colors.Grey);
              e.dataItem['RowStyles'].push('Background_DISCONTINUED');
              this.grdResolve.styles.push({ index: e.index, class: 'Background_DISCONTINUED' });
              if (
                oItemVM != null &&
                oItemVM.FormViewerDetails != null &&
                oItemVM.FormViewerDetails.BasicDetails != null &&
                oItemVM.FormViewerDetails.BasicDetails.InfusionDetails !=
                null &&
                oItemVM.FormViewerDetails.BasicDetails.InfusionDetails
                  .IsSequentiallinkvisi == Visibility.Visible
              ) {
                oItemVM.FormViewerDetails.BasicDetails.InfusionDetails.IsSequentiallinkvisi =
                  Visibility.Collapsed;
                oItemVM.FormViewerDetails.BasicDetails.IsSequentiallinkvisi =
                  Visibility.Collapsed;
              }
              if (
                oItemVM != null &&
                oItemVM.FormViewerDetails != null &&
                oItemVM.FormViewerDetails.BasicDetails != null &&
                oItemVM.FormViewerDetails.BasicDetails.SequenceInfo !=
                null &&
                oItemVM.FormViewerDetails.BasicDetails.SequenceInfo
                  .IsSequentiallinkvisi == Visibility.Visible
              ) {
                oItemVM.FormViewerDetails.BasicDetails.SequenceInfo.IsSequentiallinkvisi =
                  Visibility.Collapsed;
                oItemVM.FormViewerDetails.BasicDetails.IsSequentiallinkvisi =
                  Visibility.Collapsed;
              }
            }
          }
          if (
            String.Compare(
              oItemVM.PrescriptionItemStatus,
              CConstants.CANCELLED,
              StringComparison.OrdinalIgnoreCase
            ) == 0
          ) {
            dataGridRow = ObjectHelper.CreateType<GridViewRow>(
              e.Row,
              GridViewRow
            );
            this.grdResolve.UnselectAll();
            if (dataGridRow != null) {
              //dataGridRow.Background = new SolidColorBrush(Colors.Grey);
              //  e.dataItem['RowStyles'].push('Background_DISCONTINUED');
              //  this.grdResolve.styles.push({ index: e.index, class:'Background_DISCONTINUED'});
              if (
                oItemVM != null &&
                oItemVM.FormViewerDetails != null &&
                oItemVM.FormViewerDetails.BasicDetails != null &&
                oItemVM.FormViewerDetails.BasicDetails.InfusionDetails !=
                null &&
                oItemVM.FormViewerDetails.BasicDetails.InfusionDetails
                  .IsSequentiallinkvisi == Visibility.Visible
              ) {
                oItemVM.FormViewerDetails.BasicDetails.InfusionDetails.IsSequentiallinkvisi =
                  Visibility.Collapsed;
                oItemVM.FormViewerDetails.BasicDetails.IsSequentiallinkvisi =
                  Visibility.Collapsed;
              }
              if (
                oItemVM != null &&
                oItemVM.FormViewerDetails != null &&
                oItemVM.FormViewerDetails.BasicDetails != null &&
                oItemVM.FormViewerDetails.BasicDetails.SequenceInfo !=
                null &&
                oItemVM.FormViewerDetails.BasicDetails.SequenceInfo
                  .IsSequentiallinkvisi == Visibility.Visible
              ) {
                oItemVM.FormViewerDetails.BasicDetails.SequenceInfo.IsSequentiallinkvisi =
                  Visibility.Collapsed;
                oItemVM.FormViewerDetails.BasicDetails.IsSequentiallinkvisi =
                  Visibility.Collapsed;
              }
            }
          }
          if (
            String.Compare(
              oItemVM.PrescriptionItemStatus,
              CConstants.COMPLETED,
              StringComparison.OrdinalIgnoreCase
            ) == 0
          ) {
            if (e.Row != null) {
              e.dataItem['RowStyles'].push('Background_COMPLETED');
              // e.Row.Background = new SolidColorBrush(
              //   Color.FromArgb(255, 185, 251, 114)
              // );
              e.Row.IsAlternating = false;
            }
          }
          if (
            oItemVM.FormViewerDetails != null &&
            oItemVM.FormViewerDetails.BasicDetails != null
          ) {
            oItemVM.FormViewerDetails.BasicDetails.StartDTTMText =
              oItemVM.FormViewerDetails.BasicDetails.StartDTTMDisplay();
          }
          oItemVM.CancelDiscontinueRebindDelegateEvent = (s, e) => {
            this.oItemVM_CancelDiscontinueRebindDelegateEvent(s, e);
          };
          if (
            oItemVM.PrescriptionOID == 0 ||
            String.Equals(
              oItemVM.OperationMode,
              'N',
              StringComparison.OrdinalIgnoreCase
            )
          ) {

            document.getElementById("icnRXIMG_" + e.index).setAttribute('disabled', 'true')
            //e.Row.Cells[2].IsEnabled=false;
          }
          let cellFormViewerIcon: GridViewCell =
            ObjectHelper.CreateType<GridViewCell>(
              e.Row.Cells[this.grdResolve.GetColumnIndexByName('FormViewerIcon', this.isDontIncludeChkboxCol)],
              GridViewCell
            );
          if (cellFormViewerIcon != null) {
            let SequenceLinkIcon: Image = cellFormViewerIcon
              .ChildrenOfType<Image>()
              .Where((x) => x.Name == 'SequentialIconlink')
              .FirstOrDefault();
            if (SequenceLinkIcon != null) {
              oItemVM.SequenciatlLinkButtonEvent(SequenceLinkIcon);
            }
          }
        }
        if (
          this.clinicallyVerifyVM != null &&
          this.clinicallyVerifyVM.oDispensingItemVM != null &&
          this.clinicallyVerifyVM.MedsResolve[0].OperationMode == 'N'
        ) {
          if (
            this.clinicallyVerifyVM.MedsResolve[0].formViewerDetails
              .TechvalidateCADetails == null
          ) {
            this.clinicallyVerifyVM.MedsResolve[0].formViewerDetails.TechvalidateCADetails =
              new TechvalidateCAVM();
          }
          if (
            this.clinicallyVerifyVM.oDispensingItemVM.formViewerDetails
              .TechvalidateCADetails != null
          ) {
            this.clinicallyVerifyVM.MedsResolve[0].formViewerDetails.TechvalidateCADetails.OtherDispensingInstruction =
              this.clinicallyVerifyVM.oDispensingItemVM.formViewerDetails.TechvalidateCADetails.OtherDispensingInstruction;
            this.clinicallyVerifyVM.MedsResolve[0].formViewerDetails.TechvalidateCADetails.DispensingInstruction =
              this.clinicallyVerifyVM.oDispensingItemVM.formViewerDetails.TechvalidateCADetails.DispensingInstruction;
            this.clinicallyVerifyVM.MedsResolve[0].formViewerDetails.TechvalidateCADetails.sAdditionalcomments =
              this.clinicallyVerifyVM.oDispensingItemVM.formViewerDetails.TechvalidateCADetails.sAdditionalcomments;
          }
        }
        if (
          this.clinicallyVerifyVM != null &&
          this.clinicallyVerifyVM.oDispensingItemVM == null &&
          this.clinicallyVerifyVM != null &&
          this.clinicallyVerifyVM.MedsResolve != null &&
          this.clinicallyVerifyVM.MedsResolve.Count > 0
        ) {
          this.clinicallyVerifyVM.oDispensingItemVM =
            ObjectHelper.CreateType<PrescriptionItemVM>(
              this.clinicallyVerifyVM.MedsResolve[0],
              PrescriptionItemVM
            );
          if (
            this.clinicallyVerifyVM.oDispensingItemVM != null &&
            this.clinicallyVerifyVM.oDispensingItemVM.IsGroupHeader
          ) {
            this.clinicallyVerifyVM.oDispensingItemVM =
              ObjectHelper.CreateType<PrescriptionItemVM>(
                this.clinicallyVerifyVM.MedsResolve[1],
                PrescriptionItemVM
              );
          }
        }
      }
    }
  }
  oItemVM_CancelDiscontinueRebindDelegateEvent(PrescItemOID: number, e): void {
    if (
      PrescItemOID != 0 &&
      this.lastCancelDiscontinueOID != 0 &&
      PrescItemOID == this.lastCancelDiscontinueOID
    ) {
      this.lastCancelDiscontinueOID = 0;
      this.objProcessingItemVM = ObjectHelper.CreateType<PrescriptionItemVM>(
        this.grdResolve.GetRowData(this.nGridCurrentRowIndex),
        PrescriptionItemVM
      );
      this.grdResolve.Rebind();
      this.DefaultEnableDisableSupplyInstruction();
      this.objProcessingItemVM.bFormViewerLoadOnCVUnCheck = false;
    }
  }
  public CliniclyGetDrugInfusedStatus(PrescriptionItemOID: number): void {
    let objService: IPPManagePrescSer.IPPMAManagePrescriptionWSSoapClient = new IPPMAManagePrescSer.IPPMAManagePrescriptionWSSoapClient();
    // let objService: IPPManagePrescSer.IPPMAManagePrescriptionWSSoapClient = new IPPManagePrescSer.IPPMAManagePrescriptionWSSoapClient( new System.ServiceModel.EndpointAddress(WebServiceURLMedicationCommonBB.IPPMAManagePrescriptionWS));
    objService.IsDrugAdminStartedCompleted = (s, e) => { this.objService_IsDrugAdminStartedCompleted(s, e); };
    let objRequest: IPPManagePrescSer.CReqMsgIsDrugAdminStarted =
      new IPPManagePrescSer.CReqMsgIsDrugAdminStarted();
    objRequest.oContextInformation = CommonBB.FillContext();
    // objRequest.DrugItemOIDsBC = ObjectHelper.CreateObject(
    //   new IPPManagePrescSer.ArrayOfLong(),
    //   { PrescriptionItemOID }
    // );
    objRequest.DrugItemOIDsBC = new IPPManagePrescSer.ArrayOfLong([PrescriptionItemOID]);
    objRequest.DuenessThresholdBC = MedChartData.DuenessThreshold;
    objRequest.ActionCACodeBC = CConstants.ActionCACode;
    objRequest.nPatientOIDBC = PatientContext.PatientOID;
    objService.IsDrugAdminStartedAsync(objRequest);
  }
  public objService_IsDrugAdminStartedCompleted(
    sender: Object,
    e: IPPManagePrescSer.IsDrugAdminStartedCompletedEventArgs
  ): void {
    Busyindicator.SetStatusIdle('FormViewerMsgClick');
    let _ErrorID: number = 80000050;
    let _ErrorSource: string =
      'LorAppManagePrescriptionBBUI_P2.dll, Class:DiscontinuecancelVM, Method:objService_IsDrugAdminStartedCompleted()';
    let lstDrugItemInfusedStatus: ObservableCollection<IPPManagePrescSer.DrugAdminStatus>;
    let objResponse: IPPManagePrescSer.CResMsgIsDrugAdminStarted = e.Result;
    if (objResponse != null && e.Error == null) {
      try {
        if (
          objResponse.oDrugAdminStatusOuputData != null &&
          objResponse.oDrugAdminStatusOuputData.Count > 0
        ) {
          lstDrugItemInfusedStatus = objResponse.oDrugAdminStatusOuputData;
          if (
            this.objProcessingItemVM.FormViewerDetails != null &&
            this.objProcessingItemVM.FormViewerDetails.BasicDetails != null &&
            this.objProcessingItemVM.FormViewerDetails.BasicDetails
              .InfusionType != null &&
            !String.IsNullOrEmpty(
              this.objProcessingItemVM.FormViewerDetails.BasicDetails
                .InfusionType.Value
            ) &&
            String.Compare(
              this.objProcessingItemVM.FormViewerDetails.BasicDetails
                .InfusionType.Value,
              InfusionTypeCode.INTERMITTENT,
              StringComparison.CurrentCultureIgnoreCase
            ) == 0
          ) {
            if (
              (lstDrugItemInfusedStatus != null &&
                lstDrugItemInfusedStatus.Count > 0 &&
                lstDrugItemInfusedStatus.First().IsAdministered) ||
              this.objProcessingItemVM.IsDueNowSlot ||
              this.objProcessingItemVM.SetChartOpen
            ) {
              this.objProcessingItemVM.IsInfInprogress =
                lstDrugItemInfusedStatus != null &&
                lstDrugItemInfusedStatus.Count > 0 &&
                lstDrugItemInfusedStatus.First().IsAdministered;
              let oMessagebox2: iMessageBox = new iMessageBox();
              oMessagebox2.Title = 'Lorenzo';
              oMessagebox2.Message =
                'The infusion is in progress or the nurse might have started the infusion. The changes made will be applicable only from the next schedule';
              oMessagebox2.MessageButton = MessageBoxButton.OK;
              oMessagebox2.MessageBoxClose = (s, e) => {
                this.InfAmendInprogresVal_MessageBoxClose(s, e);
              };
              oMessagebox2.IconType = MessageBoxType.Information;
              oMessagebox2.Height = Number.NaN;
              oMessagebox2.Width = 420;
              oMessagebox2.Show();
            }
          } else {
            let isContinuousSequential: boolean = false;
            if (
              this.objProcessingItemVM.FormViewerDetails != null &&
              this.objProcessingItemVM.FormViewerDetails.BasicDetails != null &&
              this.objProcessingItemVM.FormViewerDetails.BasicDetails
                .InfusionType != null &&
              !String.IsNullOrEmpty(
                this.objProcessingItemVM.FormViewerDetails.BasicDetails
                  .InfusionType.Value
              ) &&
              (String.Equals(
                this.objProcessingItemVM.FormViewerDetails.BasicDetails
                  .InfusionType.Value,
                InfusionTypeCode.CONTINUOUS,
                StringComparison.CurrentCultureIgnoreCase
              ) ||
                String.Equals(
                  this.objProcessingItemVM.FormViewerDetails.BasicDetails
                    .InfusionType.Value,
                  InfusionTypeCode.SINGLEDOSEVOLUME,
                  StringComparison.CurrentCultureIgnoreCase
                ) ||
                String.Equals(
                  this.objProcessingItemVM.FormViewerDetails.BasicDetails
                    .InfusionType.Value,
                  InfusionTypeCode.FLUID,
                  StringComparison.CurrentCultureIgnoreCase
                ))
            )
              isContinuousSequential = true;
            if (
              lstDrugItemInfusedStatus != null &&
              lstDrugItemInfusedStatus.Count > 0 &&
              lstDrugItemInfusedStatus.First().IsAdministered
            ) {
              this.objProcessingItemVM.IsInfInprogress = true;
              let oMessagebox2: iMessageBox = new iMessageBox();
              oMessagebox2.Title = 'Lorenzo';
              oMessagebox2.Message =
                Resource.Infusion.InfAmendInprogressDueNow_Msg;
              oMessagebox2.MessageButton = MessageBoxButton.OK;
              oMessagebox2.MessageBoxClose = (s, e) => {
                this.InfAmendInprogresVal_MessageBoxClose(s, e);
              };
              oMessagebox2.IconType = MessageBoxType.Information;
              oMessagebox2.Height = Number.NaN;
              oMessagebox2.Width = 420;
              oMessagebox2.Show();
            } else if (isContinuousSequential) {
              let dtCurrent: DateTime = CommonBB.GetServerDateTime();
              let dtSlotDTTM: DateTime =
                lstDrugItemInfusedStatus != null &&
                  lstDrugItemInfusedStatus.Count > 0
                  ? lstDrugItemInfusedStatus.First().InProgScheduleDate
                  : DateTime.MinValue;
              let IsSeqDueNowSlot: boolean =
                dtSlotDTTM != DateTime.MinValue &&
                  (dtSlotDTTM.AddMinutes(-MedChartData.DuenessThreshold) <=
                    dtCurrent ||
                    dtCurrent >=
                    dtSlotDTTM.AddMinutes(MedChartData.DuenessThreshold))
                  ? true
                  : false;
              if (
                IsSeqDueNowSlot &&
                ((lstDrugItemInfusedStatus != null &&
                  lstDrugItemInfusedStatus.Count > 0 &&
                  !lstDrugItemInfusedStatus.First().IsAdministered) ||
                  this.objProcessingItemVM.SetChartOpen)
              ) {
                let oMessagebox2: iMessageBox = new iMessageBox();
                oMessagebox2.Title = 'Lorenzo';
                oMessagebox2.Message =
                  Resource.Infusion.InfAmendIDueNowChartOpen_Msg;
                oMessagebox2.MessageButton = MessageBoxButton.OK;
                oMessagebox2.MessageBoxClose = (s, e) => {
                  this.InfAmendInprogresVal_MessageBoxClose(s, e);
                };
                oMessagebox2.IconType = MessageBoxType.Information;
                oMessagebox2.Height = Number.NaN;
                oMessagebox2.Width = 420;
                oMessagebox2.Show();
              } else {
                this.clinicallyVerifyVM.PrescribeExistingItem(
                  this.objProcessingItemVM,
                  ActivityTypes.Amend
                );
              }
            } else if (
              this.objProcessingItemVM.IsDueNowSlot &&
              ((lstDrugItemInfusedStatus != null &&
                lstDrugItemInfusedStatus.Count > 0 &&
                !lstDrugItemInfusedStatus.First().IsAdministered) ||
                this.objProcessingItemVM.SetChartOpen)
            ) {
              let oMessagebox2: iMessageBox = new iMessageBox();
              oMessagebox2.Title = 'Lorenzo';
              oMessagebox2.Message =
                Resource.Infusion.InfAmendIDueNowChartOpen_Msg;
              oMessagebox2.MessageButton = MessageBoxButton.OK;
              oMessagebox2.MessageBoxClose = (s, e) => {
                this.InfAmendInprogresVal_MessageBoxClose(s, e);
              };
              oMessagebox2.IconType = MessageBoxType.Information;
              oMessagebox2.Height = Number.NaN;
              oMessagebox2.Width = 420;
              oMessagebox2.Show();
            }
          }
        } else {
          this.clinicallyVerifyVM.PrescribeExistingItem(
            this.objProcessingItemVM,
            ActivityTypes.Amend
          );
        }
      } catch (ex: any) {
        let lnReturn: number = Application.AMSHelper.PublicExceptionDetails(
          _ErrorID,
          _ErrorSource,
          ex
        );
      }
    } else {
      this.clinicallyVerifyVM.PrescribeExistingItem(
        this.objProcessingItemVM,
        ActivityTypes.Amend
      );
    }
  }
  InfAmendInprogresVal_MessageBoxClose(
    sender: Object,
    e: MessageEventArgs
  ): void {
    this.clinicallyVerifyVM.PrescribeExistingItem(
      this.objProcessingItemVM,
      ActivityTypes.Amend
    );
  }
  private Launchformviewer(objProcessingItemVM: PrescriptionItemVM): void {
    // PatientContext.PrescriptionType = PatientContext.PType;
    PatientContext.PrescriptionType == "" ? PatientContext.PType : PatientContext.PrescriptionType;
    let InfIntermittent: boolean = false;
    let IsInfusionDrug: boolean = false;
    if (objProcessingItemVM != null) {
      objProcessingItemVM.SetChartOpen = false;
      objProcessingItemVM.IsInfInprogress = false;
      objProcessingItemVM.sDueNowDTTM = String.Empty;
      objProcessingItemVM.IsDueNowSlot = false;
    }
    let ActionTypeCode: ActivityTypes;
    if (
      PatientContext.IsINFUSIONON &&
      ((objProcessingItemVM != null &&
        objProcessingItemVM.FormViewerDetails != null &&
        objProcessingItemVM.FormViewerDetails.BasicDetails.InfusionType !=
        null &&
        !String.IsNullOrEmpty(
          objProcessingItemVM.FormViewerDetails.BasicDetails.InfusionType.Value
        )) ||
        (objProcessingItemVM != null &&
          objProcessingItemVM.ItemSubType != null &&
          String.Equals(
            objProcessingItemVM.ItemSubType,
            CConstants.SUBTYPE_GAS,
            StringComparison.CurrentCultureIgnoreCase
          )))
    ) {
      IsInfusionDrug = true;
    }
    if (
      objProcessingItemVM.FormViewerDetails != null &&
      objProcessingItemVM.FormViewerDetails.BasicDetails != null &&
      objProcessingItemVM.FormViewerDetails.BasicDetails.InfusionDetails !=
      null &&
      (objProcessingItemVM.FormViewerDetails.BasicDetails.InfusionType !=
        null ||
        objProcessingItemVM.FormViewerDetails.BasicDetails.InfusionType == null)
    ) {
      objProcessingItemVM.FormViewerDetails.BasicDetails.InfusionDetails.IsFluidConflictGen =
        '1';
    }
    if (
      String.IsNullOrEmpty(objProcessingItemVM.OperationMode) ||
      String.Compare(
        objProcessingItemVM.OperationMode,
        'M',
        StringComparison.OrdinalIgnoreCase
      ) == 0 ||
      String.Compare(
        objProcessingItemVM.OperationMode,
        'U',
        StringComparison.OrdinalIgnoreCase
      ) == 0 ||
      String.Compare(
        objProcessingItemVM.OperationMode,
        'TM',
        StringComparison.OrdinalIgnoreCase
      ) == 0 ||
      String.Compare(
        objProcessingItemVM.OperationMode,
        'UA',
        StringComparison.OrdinalIgnoreCase
      ) == 0
    ) {
      ActionTypeCode = ActivityTypes.Amend;
      if (
        String.Compare(
          objProcessingItemVM.OperationMode,
          'TM',
          StringComparison.OrdinalIgnoreCase
        ) == 0
      )
        objProcessingItemVM.OperationMode = String.Empty;
    } else {
      ActionTypeCode = objProcessingItemVM.ActionCode;
    }
    if (
      objProcessingItemVM.FormViewerDetails != null &&
      objProcessingItemVM.FormViewerDetails.BasicDetails != null &&
      objProcessingItemVM.FormViewerDetails.BasicDetails.InfusionDetails !=
      null &&
      objProcessingItemVM.FormViewerDetails.BasicDetails.InfusionType != null &&
      !String.IsNullOrEmpty(
        objProcessingItemVM.FormViewerDetails.BasicDetails.InfusionType.Value
      ) &&
      String.Compare(
        objProcessingItemVM.FormViewerDetails.BasicDetails.InfusionType.Value,
        InfusionTypeCode.INTERMITTENT,
        StringComparison.CurrentCultureIgnoreCase
      ) == 0
    ) {
      InfIntermittent = true;
    }
    if (
      PatientContext.IsINFUSIONON &&
      !objProcessingItemVM.IsDueNowSlot &&
      String.Compare(
        PatientContext.PrescriptionType == "" ? PatientContext.PType : PatientContext.PrescriptionType,
        PrescriptionTypes.ForAdministration,
        StringComparison.CurrentCultureIgnoreCase
      ) == 0 &&
      !objProcessingItemVM.IsInfInprogress &&
      ActionTypeCode == ActivityTypes.Amend &&
      objProcessingItemVM.FormViewerDetails != null &&
      objProcessingItemVM.FormViewerDetails.BasicDetails != null &&
      String.Compare(
        objProcessingItemVM.PrescriptionItemStatus,
        'MEDStatus3',
        StringComparison.CurrentCultureIgnoreCase
      ) != 0 &&
      String.Compare(
        objProcessingItemVM.PrescriptionItemStatus,
        'MEDStatus14',
        StringComparison.CurrentCultureIgnoreCase
      ) != 0 &&
      String.Compare(
        objProcessingItemVM.PrescriptionItemStatus,
        'MEDStatus2',
        StringComparison.CurrentCultureIgnoreCase
      ) != 0 &&
      !String.IsNullOrEmpty(
        objProcessingItemVM.FormViewerDetails.BasicDetails.Infused
      ) &&
      String.Compare(
        objProcessingItemVM.FormViewerDetails.BasicDetails.Infused,
        '1',
        StringComparison.CurrentCultureIgnoreCase
      ) == 0 &&
      objProcessingItemVM.FormViewerDetails.BasicDetails.StartDTTM !=
      DateTime.MinValue &&
      IsInfusionDrug
    ) {
      let dtStartDTTM: DateTime;
      if (
        objProcessingItemVM.FormViewerDetails.BasicDetails
          .StartPrescriptionTime != DateTime.MinValue
      ) {
        dtStartDTTM =
          objProcessingItemVM.FormViewerDetails.BasicDetails.StartDTTM.DateTime.AddTime(
            objProcessingItemVM.FormViewerDetails.BasicDetails
              .StartPrescriptionTime
          );
      } else {
        dtStartDTTM =
          objProcessingItemVM.FormViewerDetails.BasicDetails.StartDTTM;
      }
      let dtCurrent: DateTime = CommonBB.GetServerDateTime();
      let sKeyCode: string = 'MAMedChart';
      let _LockedUserDetails: LockedUsersDetails;
      let bResult: boolean = MedicationCommonBB.IsLockedByAnotherUser(
        sKeyCode,
        false,
        (o) => {
          _LockedUserDetails = o;
        }
      );
      if (
        _LockedUserDetails != null &&
        !String.IsNullOrEmpty(_LockedUserDetails.ActivityLock) &&
        String.Equals(
          _LockedUserDetails.ActivityLock,
          'MAMedChart',
          StringComparison.InvariantCultureIgnoreCase
        )
      ) {
        objProcessingItemVM.SetChartOpen = true;
      }
      if (
        (dtStartDTTM.AddMinutes(-MedChartData.DuenessThreshold) <= dtCurrent ||
          dtCurrent >= dtStartDTTM.AddMinutes(MedChartData.DuenessThreshold)) &&
        !InfIntermittent
      ) {
        objProcessingItemVM.IsDueNowSlot = true;
      } else if (
        InfIntermittent &&
        objProcessingItemVM.FormViewerDetails.BasicDetails != null &&
        objProcessingItemVM.FormViewerDetails.BasicDetails.InfusionDetails !=
        null &&
        objProcessingItemVM.FormViewerDetails.BasicDetails.InfusionDetails
          .InfInterMitScheduleDTTMs != null &&
        objProcessingItemVM.FormViewerDetails.BasicDetails.InfusionDetails
          .InfInterMitScheduleDTTMs.Count > 0
      ) {
        objProcessingItemVM.IsDueNowSlot =
          objProcessingItemVM.ISDueNowSlotForInfIntermittent(
            objProcessingItemVM.FormViewerDetails.BasicDetails.InfusionDetails
              .InfInterMitScheduleDTTMs,
            (o) => {
              objProcessingItemVM.sDueNowDTTM = o;
            }
          );
      }
      if (
        objProcessingItemVM.IsDueNowSlot &&
        !String.Equals(
          objProcessingItemVM.OperationMode,
          'N',
          StringComparison.OrdinalIgnoreCase
        ) &&
        !String.Equals(
          objProcessingItemVM.PrescriptionItemStatus,
          CConstants.AWAITINGAUTHORISE,
          StringComparison.InvariantCultureIgnoreCase
        ) &&
        (objProcessingItemVM.OperationMode == null ||
          (String.Equals(
            objProcessingItemVM.OperationMode,
            'U',
            StringComparison.OrdinalIgnoreCase
          ) &&
            !objProcessingItemVM.IsUnholddrug))
      ) {
        this.CliniclyGetDrugInfusedStatus(
          objProcessingItemVM.PrescriptionItemOID
        );
      } else {
        Busyindicator.SetStatusIdle('FormViewerMsgClick');
        objProcessingItemVM.IsConflictClick = false;
        this.clinicallyVerifyVM.PrescribeExistingItem(
          objProcessingItemVM,
          ActionTypeCode
        );
      }
    } else {
      Busyindicator.SetStatusIdle('FormViewerMsgClick');
      objProcessingItemVM.IsConflictClick = false;
      if (
        this.clinicallyVerifyVM.MaxNoOfPrescCounter ==
        CConstants.MaxNoOfPrescriptions &&
        objProcessingItemVM.PrescriptionItemOID > 0
      ) {
        let oMsgBox: iMessageBox = new iMessageBox();
        oMsgBox.Title = 'LORENZO';
        oMsgBox.Message = Resource.MedicationForm.MaxAmendPrescription_Msg;
        oMsgBox.MessageButton = MessageBoxButton.OK;
        oMsgBox.IconType = MessageBoxType.Exclamation;
        oMsgBox.Width = 450;
        oMsgBox.Height = 150;
        oMsgBox.Show();
        return;
      }
      this.clinicallyVerifyVM.PrescribeExistingItem(
        objProcessingItemVM,
        ActionTypeCode
      );
    }
  }
  ddetChild_Closed(args: AppDialogEventargs): void {
    // ObjectHelper.stopFinishAndCancelEvent(false);
    args.AppChildWindow.DialogResult = true;
  }
  private grdResolve_DataLoaded(sender: Object, e: EventArgs): void {
    this.grdResolve.UnselectAll();
    if (
      !this.isConflictExists &&
      !this.isDeactivatedDrugExists &&
      !this.isInfusionRateAmended &&
      !this.isCancelDisConExists &&
      String.IsNullOrEmpty(this.deactiveDrug)
    ) {
      this.CheckForConflictsAndDeactivatedItems();
      let sMsg: string = String.Empty;
      if (
        this.isInfusionRateAmended &&
        this.isInfusionConcentrationAmended &&
        this.isCancelDisConExists
      ) {
        sMsg =
          this.InfusionRateAmendedItemDetails +
          Environment.NewLine +
          this.InfusionConcentrationAmendedItemDetails +
          Environment.NewLine +
          this.CancelledDiscontinueItemDetails;
      }
      if (
        this.isInfusionRateAmended &&
        this.isInfusionConcentrationAmended &&
        !this.isCancelDisConExists
      ) {
        sMsg =
          this.InfusionRateAmendedItemDetails +
          Environment.NewLine +
          this.InfusionConcentrationAmendedItemDetails;
      } else if (
        this.isInfusionConcentrationAmended &&
        this.isCancelDisConExists
      ) {
        sMsg =
          this.InfusionConcentrationAmendedItemDetails +
          Environment.NewLine +
          this.CancelledDiscontinueItemDetails;
      } else if (this.isInfusionRateAmended && this.isCancelDisConExists) {
        sMsg =
          this.InfusionRateAmendedItemDetails +
          Environment.NewLine +
          this.CancelledDiscontinueItemDetails;
      } else if (
        this.isInfusionConcentrationAmended &&
        !this.isCancelDisConExists
      ) {
        sMsg = this.InfusionConcentrationAmendedItemDetails;
      } else if (
        !this.isInfusionConcentrationAmended &&
        this.isCancelDisConExists
      ) {
        sMsg = this.CancelledDiscontinueItemDetails;
      } else if (this.isInfusionRateAmended && !this.isCancelDisConExists) {
        sMsg = this.InfusionRateAmendedItemDetails;
      } else if (!this.isInfusionRateAmended && this.isCancelDisConExists) {
        sMsg = this.CancelledDiscontinueItemDetails;
      }
      if (this.isConflictExists) {
        this.msgBoxConflicts = new iMessageBox();
        this.msgBoxConflicts.Height = 170;
        this.msgBoxConflicts.Width = 350;
        this.msgBoxConflicts.Title = 'LORENZO';
        this.msgBoxConflicts.Message = Resource.medauthorise.ConflictsMessage;
        this.msgBoxConflicts.IconType = MessageBoxType.Exclamation;
        this.msgBoxConflicts.MessageButton = MessageBoxButton.OK;
        this.msgBoxConflicts.MessageBoxClose = (s, e) => {
          // ObjectHelper.DoubleMessageMode = false;
          // ObjectHelper.stopFinishAndCancelEvent(false);
          this.ConflictExistsmsgBox_Closed(s, e);
        };
        this.msgBoxConflicts.Show();
        // ObjectHelper.stopFinishAndCancelEvent(true);
        ObjectHelper.DoubleMessageMode = true;
      } else {
        if (!String.IsNullOrEmpty(sMsg)) {
          this.msgBoxCancelledDiscontinue = new iMessageBox();
          this.msgBoxCancelledDiscontinue.Height = 170;
          this.msgBoxCancelledDiscontinue.Width = 350;
          this.msgBoxCancelledDiscontinue.Title = 'LORENZO';
          this.msgBoxCancelledDiscontinue.Message = sMsg;
          this.msgBoxCancelledDiscontinue.IconType = MessageBoxType.Information;
          this.msgBoxCancelledDiscontinue.MessageButton = MessageBoxButton.OK;
          this.msgBoxCancelledDiscontinue.Show();
        }
      }
      if (
        this.isDeactivatedDrugExists &&
        (!String.IsNullOrEmpty(this.deactiveDrug) ||
          !String.IsNullOrEmpty(this.deactiveCompDrug))
      ) {
        this.msgBoxDeactivate = new iMessageBox();
        this.msgBoxDeactivate.Height = 180;
        this.msgBoxDeactivate.Width = 370;
        this.msgBoxDeactivate.Title = 'LORENZO';
        let DeactMsgFor: string = String.Empty;
        if (
          !String.IsNullOrEmpty(this.deactiveDrug) &&
          !String.IsNullOrEmpty(this.deactiveCompDrug)
        )
          DeactMsgFor =
            'The medication item(s) ' +
            this.deactiveDrug +
            ' have been deactivated since they were prescribed. \n The component(s) of ' +
            this.deactiveCompDrug +
            ' have been deactivated since they were prescribed.  \n Please discontinue/cancel accordingly.';
        else if (!String.IsNullOrEmpty(this.deactiveCompDrug))
          DeactMsgFor =
            'The component(s) of ' +
            this.deactiveCompDrug +
            CConstants.MCI_Deactivate;
        else if (!String.IsNullOrEmpty(this.deactiveDrug))
          DeactMsgFor =
            'The medication item(s) ' +
            this.deactiveDrug +
            CConstants.MCI_Deactivate;
        this.msgBoxDeactivate.Message = DeactMsgFor;
        this.msgBoxDeactivate.IconType = MessageBoxType.Information;
        this.msgBoxDeactivate.MessageButton = MessageBoxButton.OK;
        this.msgBoxDeactivate.Show();
      }
    }
    this.cmdObservationResults.IsEnabled = false;
    if (
      !String.IsNullOrEmpty(
        MedicationCommonProfileData.MedViewConfig.OtherLinks
      )
    ) {
      this.cmdOtherLinks.IsEnabled = true;
    } else this.cmdOtherLinks.IsEnabled = false;
    this.DefaultEnableDisableSupplyInstruction();
  }
  ConflictExistsmsgBox_Closed(sender: Object, e: MessageEventArgs): void {
    if (e.MessageBoxResult == MessageBoxResult.OK) {
      let sMsg: string = String.Empty;
      if (
        this.isInfusionRateAmended &&
        this.isInfusionConcentrationAmended &&
        this.isCancelDisConExists
      ) {
        sMsg =
          this.InfusionRateAmendedItemDetails +
          Environment.NewLine +
          this.InfusionConcentrationAmendedItemDetails +
          Environment.NewLine +
          this.CancelledDiscontinueItemDetails;
      }
      if (
        this.isInfusionRateAmended &&
        this.isInfusionConcentrationAmended &&
        !this.isCancelDisConExists
      ) {
        sMsg =
          this.InfusionRateAmendedItemDetails +
          Environment.NewLine +
          this.InfusionConcentrationAmendedItemDetails;
      } else if (
        this.isInfusionConcentrationAmended &&
        this.isCancelDisConExists
      ) {
        sMsg =
          this.InfusionConcentrationAmendedItemDetails +
          Environment.NewLine +
          this.CancelledDiscontinueItemDetails;
      } else if (this.isInfusionRateAmended && this.isCancelDisConExists) {
        sMsg =
          this.InfusionRateAmendedItemDetails +
          Environment.NewLine +
          this.CancelledDiscontinueItemDetails;
      } else if (
        this.isInfusionConcentrationAmended &&
        !this.isCancelDisConExists
      ) {
        sMsg = this.InfusionConcentrationAmendedItemDetails;
      } else if (
        !this.isInfusionConcentrationAmended &&
        this.isCancelDisConExists
      ) {
        sMsg = this.CancelledDiscontinueItemDetails;
      } else if (this.isInfusionRateAmended && !this.isCancelDisConExists) {
        sMsg = this.InfusionRateAmendedItemDetails;
      } else if (!this.isInfusionRateAmended && this.isCancelDisConExists) {
        sMsg = this.CancelledDiscontinueItemDetails;
      }
      if (!String.IsNullOrEmpty(sMsg)) {
        let msgBox: iMessageBox = new iMessageBox();
        msgBox.Height = 170;
        msgBox.Width = 350;
        msgBox.Title = 'LORENZO';
        msgBox.Message = sMsg;
        msgBox.IconType = MessageBoxType.Information;
        msgBox.MessageButton = MessageBoxButton.OK;
        msgBox.Show();
      }
    }
  }
  private CheckForConflictsAndDeactivatedItems(): void {
    if (this.clinicallyVerifyVM != null) {
      let lstPrescribedItems: ObservableCollection<PrescriptionItemVM> = this.clinicallyVerifyVM.MedsResolve;
      if (lstPrescribedItems != null && lstPrescribedItems.Count > 0) {
        lstPrescribedItems.array.forEach((oItemVM) => {
          if (oItemVM.PrescriptionItemStatus &&
            String.Compare(
              oItemVM.PrescriptionItemStatus,
              CConstants.SUBMITTED
            ) == 0 &&
            oItemVM.IsConflictsExists
          ) {
            if (!this.isConflictExists) this.isConflictExists = true;
          }
          if (
            oItemVM.FormViewerDetails != null &&
            oItemVM.FormViewerDetails.BasicDetails != null
          ) {
            if (
              String.Compare(
                oItemVM.FormViewerDetails.BasicDetails.ReplaceDrugActiveStatus,
                '0',
                StringComparison.CurrentCultureIgnoreCase
              ) == 0 &&
              String.Compare(
                oItemVM.DrugVersionMatch,
                '1',
                StringComparison.CurrentCultureIgnoreCase
              ) == 0
            ) {
              let data: string = String.Empty;
              if (!this.isDeactivatedDrugExists)
                this.isDeactivatedDrugExists = true;
              if (
                String.Compare(
                  oItemVM.FormViewerDetails.BasicDetails.itemSubType,
                  CConstants.SUBTYPE,
                  StringComparison.OrdinalIgnoreCase
                ) == 0
              ) {
                if (
                  oItemVM.MCIDEActiveItems != null &&
                  oItemVM.MCIDEActiveItems != '\n'
                )
                  data =
                    oItemVM.FormViewerDetails.BasicDetails.IdentifyingName +
                    ' - ' +
                    oItemVM.MCIDEActiveItems;
                if (!this.deactiveCompDrug.Contains(data))
                  this.deactiveCompDrug += data;
                if (String.IsNullOrEmpty(data)) {
                  data =
                    oItemVM.FormViewerDetails.BasicDetails.IdentifyingName +
                    ', ';
                  if (!this.deactiveDrug.Contains(data))
                    this.deactiveDrug += data;
                }
              } else {
                data =
                  oItemVM.FormViewerDetails.BasicDetails.IdentifyingName + ', ';
                if (!this.deactiveDrug.Contains(data))
                  this.deactiveDrug += data;
              }
            }
          }
          if (
            PatientContext.IsINFUSIONON &&
            oItemVM.FormViewerDetails != null &&
            oItemVM.FormViewerDetails.BasicDetails != null &&
            oItemVM.FormViewerDetails.BasicDetails.InfusionDetails != null &&
            !String.IsNullOrEmpty(
              oItemVM.FormViewerDetails.BasicDetails.InfusionDetails
                .IsInfusionAlertValue
            ) &&
            (oItemVM.FormViewerDetails.BasicDetails.InfusionDetails.IsInfusionAlertValue.Equals(
              '1'
            ) ||
              oItemVM.FormViewerDetails.BasicDetails.InfusionDetails.IsInfusionAlertValue.Equals(
                '5'
              ))
          ) {
            let strFromMessage: string = String.Empty;
            if (
              !String.IsNullOrEmpty(
                oItemVM.FormViewerDetails.BasicDetails.InfusionDetails
                  .PreviousRate
              ) &&
              !String.IsNullOrEmpty(
                oItemVM.FormViewerDetails.BasicDetails.InfusionDetails
                  .PreviousUpperRate
              ) &&
              !String.IsNullOrEmpty(
                oItemVM.FormViewerDetails.BasicDetails.InfusionDetails
                  .PreviousRateUOMName
              ) &&
              !String.IsNullOrEmpty(
                oItemVM.FormViewerDetails.BasicDetails.InfusionDetails
                  .PreviousRateDrUOMName
              )
            ) {
              strFromMessage =
                oItemVM.FormViewerDetails.BasicDetails.InfusionDetails
                  .PreviousRate +
                ' - ' +
                oItemVM.FormViewerDetails.BasicDetails.InfusionDetails
                  .PreviousUpperRate +
                ' ' +
                oItemVM.FormViewerDetails.BasicDetails.InfusionDetails
                  .PreviousRateUOMName +
                '/' +
                oItemVM.FormViewerDetails.BasicDetails.InfusionDetails
                  .PreviousRateDrUOMName;
            } else if (
              !String.IsNullOrEmpty(
                oItemVM.FormViewerDetails.BasicDetails.InfusionDetails
                  .PreviousRate
              ) &&
              !String.IsNullOrEmpty(
                oItemVM.FormViewerDetails.BasicDetails.InfusionDetails
                  .PreviousRateUOMName
              ) &&
              !String.IsNullOrEmpty(
                oItemVM.FormViewerDetails.BasicDetails.InfusionDetails
                  .PreviousRateDrUOMName
              )
            ) {
              strFromMessage =
                oItemVM.FormViewerDetails.BasicDetails.InfusionDetails
                  .PreviousRate +
                ' ' +
                oItemVM.FormViewerDetails.BasicDetails.InfusionDetails
                  .PreviousRateUOMName +
                '/' +
                oItemVM.FormViewerDetails.BasicDetails.InfusionDetails
                  .PreviousRateDrUOMName;
            } else if (
              !String.IsNullOrEmpty(
                oItemVM.FormViewerDetails.BasicDetails.InfusionDetails
                  .PreviousUpperRate
              ) &&
              !String.IsNullOrEmpty(
                oItemVM.FormViewerDetails.BasicDetails.InfusionDetails
                  .PreviousRateUOMName
              ) &&
              !String.IsNullOrEmpty(
                oItemVM.FormViewerDetails.BasicDetails.InfusionDetails
                  .PreviousRateDrUOMName
              )
            ) {
              strFromMessage =
                oItemVM.FormViewerDetails.BasicDetails.InfusionDetails
                  .PreviousUpperRate +
                ' ' +
                oItemVM.FormViewerDetails.BasicDetails.InfusionDetails
                  .PreviousRateUOMName +
                '/' +
                oItemVM.FormViewerDetails.BasicDetails.InfusionDetails
                  .PreviousRateDrUOMName;
            }
            if (!String.IsNullOrEmpty(strFromMessage)) {
              let strToMessage: string = String.Empty;
              if (
                !String.IsNullOrEmpty(
                  oItemVM.FormViewerDetails.BasicDetails.InfusionDetails.Rate
                ) &&
                !String.IsNullOrEmpty(
                  oItemVM.FormViewerDetails.BasicDetails.InfusionDetails
                    .UpperRate
                ) &&
                oItemVM.FormViewerDetails.BasicDetails.InfusionDetails
                  .InfRateNumeratorUom != null &&
                !String.IsNullOrEmpty(
                  oItemVM.FormViewerDetails.BasicDetails.InfusionDetails
                    .InfRateNumeratorUom.DisplayText
                ) &&
                oItemVM.FormViewerDetails.BasicDetails.InfusionDetails
                  .InfRateDinominatorUom != null &&
                !String.IsNullOrEmpty(
                  oItemVM.FormViewerDetails.BasicDetails.InfusionDetails
                    .InfRateDinominatorUom.DisplayText
                )
              ) {
                strToMessage =
                  oItemVM.FormViewerDetails.BasicDetails.InfusionDetails.Rate +
                  ' - ' +
                  oItemVM.FormViewerDetails.BasicDetails.InfusionDetails
                    .UpperRate +
                  ' ' +
                  oItemVM.FormViewerDetails.BasicDetails.InfusionDetails
                    .InfRateNumeratorUom.DisplayText +
                  '/' +
                  oItemVM.FormViewerDetails.BasicDetails.InfusionDetails
                    .InfRateDinominatorUom.DisplayText;
              } else if (
                !String.IsNullOrEmpty(
                  oItemVM.FormViewerDetails.BasicDetails.InfusionDetails.Rate
                ) &&
                oItemVM.FormViewerDetails.BasicDetails.InfusionDetails
                  .InfRateNumeratorUom != null &&
                !String.IsNullOrEmpty(
                  oItemVM.FormViewerDetails.BasicDetails.InfusionDetails
                    .InfRateNumeratorUom.DisplayText
                ) &&
                oItemVM.FormViewerDetails.BasicDetails.InfusionDetails
                  .InfRateDinominatorUom != null &&
                !String.IsNullOrEmpty(
                  oItemVM.FormViewerDetails.BasicDetails.InfusionDetails
                    .InfRateDinominatorUom.DisplayText
                )
              ) {
                strToMessage =
                  oItemVM.FormViewerDetails.BasicDetails.InfusionDetails.Rate +
                  ' ' +
                  oItemVM.FormViewerDetails.BasicDetails.InfusionDetails
                    .InfRateNumeratorUom.DisplayText +
                  '/' +
                  oItemVM.FormViewerDetails.BasicDetails.InfusionDetails
                    .InfRateDinominatorUom.DisplayText;
              }
              if (!this.isInfusionRateAmended) {
                this.isInfusionRateAmended = true;
                this.InfusionRateAmendedItemDetails =
                  Resource.medauthorise.InfRateAmended_ValMsg + '\n';
              }
              this.InfusionRateAmendedItemDetails =
                this.InfusionRateAmendedItemDetails +
                oItemVM.FormViewerDetails.BasicDetails.IdentifyingName +
                ' from ' +
                strFromMessage +
                ' to ' +
                strToMessage +
                '\n';
            }
          }
          if (
            PatientContext.IsINFUSIONON &&
            oItemVM.FormViewerDetails != null &&
            oItemVM.FormViewerDetails.BasicDetails != null &&
            oItemVM.FormViewerDetails.BasicDetails.InfusionDetails != null &&
            !String.IsNullOrEmpty(
              oItemVM.FormViewerDetails.BasicDetails.InfusionDetails
                .IsInfusionAlertValue
            ) &&
            (oItemVM.FormViewerDetails.BasicDetails.InfusionDetails.IsInfusionAlertValue.Equals(
              '4'
            ) ||
              oItemVM.FormViewerDetails.BasicDetails.InfusionDetails.IsInfusionAlertValue.Equals(
                '5'
              ))
          ) {
            let strFromMessage: string = String.Empty;
            if (
              !String.IsNullOrEmpty(
                oItemVM.FormViewerDetails.BasicDetails.InfusionDetails
                  .PrevConcentStrenght
              ) &&
              !String.IsNullOrEmpty(
                oItemVM.FormViewerDetails.BasicDetails.InfusionDetails
                  .PrevConcentStrenghtUOM
              ) &&
              !String.IsNullOrEmpty(
                oItemVM.FormViewerDetails.BasicDetails.InfusionDetails
                  .PrevConcentVolume
              ) &&
              !String.IsNullOrEmpty(
                oItemVM.FormViewerDetails.BasicDetails.InfusionDetails
                  .PrevConcentVolumeUOM
              )
            ) {
              strFromMessage =
                oItemVM.FormViewerDetails.BasicDetails.InfusionDetails
                  .PrevConcentStrenght +
                ' ' +
                oItemVM.FormViewerDetails.BasicDetails.InfusionDetails
                  .PrevConcentStrenghtUOM +
                '/' +
                oItemVM.FormViewerDetails.BasicDetails.InfusionDetails
                  .PrevConcentVolume +
                ' ' +
                oItemVM.FormViewerDetails.BasicDetails.InfusionDetails
                  .PrevConcentVolumeUOM;
            }
            let strToMessage: string = String.Empty;
            if (
              !String.IsNullOrEmpty(
                oItemVM.FormViewerDetails.BasicDetails.InfusionDetails
                  .LowConcentration
              ) &&
              !String.IsNullOrEmpty(
                oItemVM.FormViewerDetails.BasicDetails.InfusionDetails
                  .UpperConcentration
              ) &&
              oItemVM.FormViewerDetails.BasicDetails.InfusionDetails
                .LowConcentrationUOM != null &&
              !String.IsNullOrEmpty(
                oItemVM.FormViewerDetails.BasicDetails.InfusionDetails
                  .LowConcentrationUOM.DisplayText
              ) &&
              oItemVM.FormViewerDetails.BasicDetails.InfusionDetails
                .UpperConcentrationUOM != null &&
              !String.IsNullOrEmpty(
                oItemVM.FormViewerDetails.BasicDetails.InfusionDetails
                  .UpperConcentrationUOM.DisplayText
              )
            ) {
              strToMessage =
                oItemVM.FormViewerDetails.BasicDetails.InfusionDetails
                  .LowConcentration +
                ' ' +
                oItemVM.FormViewerDetails.BasicDetails.InfusionDetails
                  .LowConcentrationUOM.DisplayText +
                '/' +
                oItemVM.FormViewerDetails.BasicDetails.InfusionDetails
                  .UpperConcentration +
                ' ' +
                oItemVM.FormViewerDetails.BasicDetails.InfusionDetails
                  .UpperConcentrationUOM.DisplayText;
            }
            if (!this.isInfusionConcentrationAmended) {
              this.isInfusionConcentrationAmended = true;
              this.InfusionConcentrationAmendedItemDetails =
                Resource.medauthorise.InfConcentrationAmended_ValMsg + '\n';
            }
            if (
              !String.IsNullOrEmpty(strFromMessage) &&
              !String.IsNullOrEmpty(strToMessage)
            ) {
              this.InfusionConcentrationAmendedItemDetails =
                this.InfusionConcentrationAmendedItemDetails +
                oItemVM.FormViewerDetails.BasicDetails.IdentifyingName +
                ' from ' +
                strFromMessage +
                ' to ' +
                strToMessage +
                '\n';
            } else if (
              String.IsNullOrEmpty(strFromMessage) &&
              !String.IsNullOrEmpty(strToMessage)
            ) {
              this.InfusionConcentrationAmendedItemDetails =
                this.InfusionConcentrationAmendedItemDetails +
                oItemVM.FormViewerDetails.BasicDetails.IdentifyingName +
                ' to ' +
                strToMessage +
                '\n';
            } else if (
              !String.IsNullOrEmpty(strFromMessage) &&
              String.IsNullOrEmpty(strToMessage)
            ) {
              this.InfusionConcentrationAmendedItemDetails =
                this.InfusionConcentrationAmendedItemDetails +
                oItemVM.FormViewerDetails.BasicDetails.IdentifyingName +
                ' from ' +
                strFromMessage +
                '\n';
            }
          }
        });
        // this.deactiveDrug = this.deactiveDrug.TrimEnd(',');
        this.deactiveDrug = this.deactiveDrug.replace(/[, ]+$/g, '');
        this.InfusionRateAmendedItemDetails =
          this.InfusionRateAmendedItemDetails.TrimEnd('\n');
        this.InfusionConcentrationAmendedItemDetails =
          this.InfusionConcentrationAmendedItemDetails.TrimEnd('\n');
        this.deactiveCompDrug = this.deactiveCompDrug.TrimEnd(',');
      }
      if (
        !this.isCancelDisConExists &&
        PatientContext.PrescriptionType != null &&
        String.Compare(
          PatientContext.PrescriptionType,
          PrescriptionTypes.ForAdministration,
          StringComparison.CurrentCultureIgnoreCase
        ) != 0
      ) {
        this.CheckForCancelDiscontdItems();
      }
    }
  }
  private CheckForCancelDiscontdItems(): void {
    let lstPrescribedItems: ObservableCollection<PrescriptionItemVM> =
      this.clinicallyVerifyVM.MedsDisCon;
    if (lstPrescribedItems != null && lstPrescribedItems.Count > 0) {
      lstPrescribedItems.forEach((oItemVM) => {
        if (
          PatientContext.IsINFUSIONON &&
          !String.IsNullOrEmpty(oItemVM.PrescriptionItemStatus) &&
          oItemVM.FormViewerDetails != null &&
          oItemVM.FormViewerDetails.BasicDetails != null &&
          oItemVM.FormViewerDetails.BasicDetails.InfusionDetails != null &&
          oItemVM.FormViewerDetails.BasicDetails.InfusionDetails
            .IsInfusionAlertShown
        ) {
          if (!this.isCancelDisConExists) {
            this.isCancelDisConExists = true;
            this.clinicallyVerifyVM.isCancelDisConVerify = true;
            this.CancelledDiscontinueItemDetails =
              Resource.medauthorise.InfCancelledDiscon_ValMsg + '\n';
          }
          this.CancelledDiscontinueItemDetails =
            this.CancelledDiscontinueItemDetails +
            oItemVM.FormViewerDetails.BasicDetails.IdentifyingName +
            ' - ' +
            oItemVM.PrescriptionItemStatus +
            '\n';
        }
      });
      this.CancelledDiscontinueItemDetails =
        this.CancelledDiscontinueItemDetails.TrimEnd('\n');
    }
  }
  lstOrderSet: List<string> = new List<string>();
  cmdDiscontinueCancel_Click_Func = (s, e) => {
    Object.keys(that).forEach((prop) => (this[prop] = that[prop]));
    this.cmdDiscontinueCancel_Click(s, e);
  }
  public cmdDiscontinueCancel_Click(sender: Object, e: RoutedEventArgs): void {
    this.listDrugNames = new StringBuilder();
    this.LockedItemOIds = new ArrayOfLong();
    let sResult: string = String.Empty;
    this.lstOrderSet = new List<string>();
    let bContainInfusionItem: boolean = false;
    this.bIsInfDiscontinue = false;
    this.bIsOrdDiscontinue = false;
    CommonFlags.bDiscontinueCancelClicked = false;
    this.OSelectedAllowedToDiscontinue = new ObservableCollection<Object>();
    this.grdResolve.SelectedItems.forEach((oSelectedItem) => {
      if (!oSelectedItem.IsGroupHeader) {
        // sResult = ObjectHelper.CreateType<string>(HtmlPage.Window.Invoke("CreatePessimisticLock", oSelectedItem.PrescriptionItemOID, "PRESCRIPTIONITEM", CConstants.LockDuration), String);
        if (
          !String.IsNullOrEmpty(sResult) &&
          String.Compare(sResult, 'True') != 0
        ) {
          let oMsgBox: iMessageBox = new iMessageBox();
          oMsgBox.MessageBoxClose = (s, e) => {
            this.oMsgBox_DisCan_MessageBoxClose(s, e);
          };
          oMsgBox.Title = 'Error - Lorenzo';
          oMsgBox.MessageButton = MessageBoxButton.OK;
          oMsgBox.IconType = MessageBoxType.Critical;
          oMsgBox.Message = sResult;
          sResult = 'Lock';
          oMsgBox.Show();
          // break;
        } else {
          this.LockedItemOIds.Add(oSelectedItem.PrescriptionItemOID);
        }
        if (
          oSelectedItem != null &&
          oSelectedItem.FormViewerDetails != null &&
          oSelectedItem.FormViewerDetails.BasicDetails != null
        ) {
          if (!oSelectedItem.IsAllowedToPerform) {
            if (this.listDrugNames.Length > 0) {
              this.listDrugNames.Append('?!+`');
            }
            if (
              String.IsNullOrEmpty(
                oSelectedItem.FormViewerDetails.BasicDetails.MCILorenzoID
              )
            ) {
              if (
                !String.IsNullOrEmpty(
                  oSelectedItem.FormViewerDetails.BasicDetails.IdentifyingName
                )
              ) {
                this.listDrugNames.Append(
                  oSelectedItem.FormViewerDetails.BasicDetails.IdentifyingName
                );
              }
            } else {
              if (
                !String.IsNullOrEmpty(
                  oSelectedItem.FormViewerDetails.BasicDetails.mCIItemDisplay
                )
              ) {
                this.listDrugNames.Append(
                  oSelectedItem.FormViewerDetails.BasicDetails.mCIItemDisplay
                );
              }
            }
            this.OSelectedAllowedToDiscontinue.Add(oSelectedItem);
          } else if (
            PatientContext.IsINFUSIONON &&
            String.Compare(
              PatientContext.PrescriptionType,
              PrescriptionTypes.ForAdministration,
              StringComparison.CurrentCultureIgnoreCase
            ) == 0 &&
            ((oSelectedItem.FormViewerDetails.BasicDetails.InfusionType !=
              null &&
              !String.IsNullOrEmpty(
                oSelectedItem.FormViewerDetails.BasicDetails.InfusionType.Value
              ) &&
              String.Compare(
                oSelectedItem.FormViewerDetails.BasicDetails.InfusionType.Value,
                InfusionTypesCode.INTERMITTENT,
                StringComparison.CurrentCultureIgnoreCase
              ) != 0) ||
              oSelectedItem.FormViewerDetails.BasicDetails.InfusionDetails
                .IsOxygen ||
              oSelectedItem.FormViewerDetails.BasicDetails.itemSubType ==
              CConstants.SUBTYPE_GAS ||
              oSelectedItem.FormViewerDetails.BasicDetails.itemSubType ==
              CConstants.SUBTYPE_BLOOD) &&
            oSelectedItem.FormViewerDetails.BasicDetails.InfusionDetails !=
            null &&
            DateTime.NotEquals(oSelectedItem.FormViewerDetails.BasicDetails.StartDTTM,
              DateTime.MinValue) &&
            DateTime.LessThanOrEqualTo(oSelectedItem.FormViewerDetails.BasicDetails.StartDTTM,
              CommonBB.GetServerDateTime())
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
            oSelectedItem.FormViewerDetails.BasicDetails.InfusionType != null &&
            !String.IsNullOrEmpty(
              oSelectedItem.FormViewerDetails.BasicDetails.InfusionType.Value
            ) &&
            String.Compare(
              oSelectedItem.FormViewerDetails.BasicDetails.InfusionType.Value,
              InfusionTypesCode.INTERMITTENT,
              StringComparison.CurrentCultureIgnoreCase
            ) == 0 &&
            oSelectedItem.FormViewerDetails.BasicDetails.InfusionDetails
              .InfInterMitScheduleDTTMs != null &&
            oSelectedItem.FormViewerDetails.BasicDetails.InfusionDetails
              .InfInterMitScheduleDTTMs.Count > 0
          ) {
            if (
              this.CanDisDueNowSlotForInfIntermittent(
                oSelectedItem.FormViewerDetails.BasicDetails.InfusionDetails
                  .InfInterMitScheduleDTTMs
              )
            ) {
              bContainInfusionItem = true;
              this.bIsInfDiscontinue = true;
            }
          }
          if (
            oSelectedItem.FormViewerDetails.BasicDetails.Ordersets != null &&
            !String.IsNullOrEmpty(
              oSelectedItem.FormViewerDetails.BasicDetails.Ordersets.Value
            ) &&
            !(
              (this.oItemVM.FormViewerDetails.BasicDetails.InfusionDetails !=
                null &&
                this.oItemVM.FormViewerDetails.BasicDetails.InfusionDetails
                  .GroupSequenceNo > 0) ||
              (this.oItemVM.FormViewerDetails.BasicDetails.SequenceInfo !=
                null &&
                this.oItemVM.FormViewerDetails.BasicDetails.SequenceInfo
                  .GroupSequenceNo > 0)
            )
          ) {
            if (
              !this.lstOrderSet.Contains(
                oSelectedItem.FormViewerDetails.BasicDetails.Ordersets
                  .DisplayText
              )
            )
              this.lstOrderSet.Add(
                oSelectedItem.FormViewerDetails.BasicDetails.Ordersets
                  .DisplayText
              );
          }
        }
      }
    });
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
      let iMsgBox: iMessageBox = ObjectHelper.CreateObject(new iMessageBox(), {
        Title: 'LORENZO',
        Message: Resource.Infusion.Infusion_DiscontinueCancel,
        MessageButton: MessageBoxButton.OK,
        IconType: MessageBoxType.Question,
      });
      iMsgBox.Height = 150;
      iMsgBox.Width = 400;
      iMsgBox.MessageBoxClose = (s, e) => {
        this.DiscontinueCancel_MessageBoxClose(s, e);
      };
      iMsgBox.Show();
      return;
    }
    if (String.Compare(sResult, 'Lock') != 0) {
      if (this.lstOrderSet.Count > 0) {
        let iMsgBox: iMessageBox = ObjectHelper.CreateObject(
          new iMessageBox(),
          {
            Title: 'LORENZO',
            Message: String.Format(
              Resource.Orderset.DiscontinueMsg,
              //check
              String.Join(",", this.lstOrderSet.ToArray())
            ),
            MessageButton: MessageBoxButton.OK,
            IconType: MessageBoxType.Question,
          }
        );
        iMsgBox.Height = 150;
        iMsgBox.Width = 450;
        iMsgBox.MessageBoxClose = (s, e) => {
          this.DiscontinueCancel_MessageBoxClose(s, e);
        };
        iMsgBox.Show();
        this.bIsOrdDiscontinue = true;
        return;
      }
      if (!bContainInfusionItem) this.LaunchDiscontinueCancel();
    }
  }
  private oMsgBox_IsAllowDiscontinueCancelMessageBoxClose(
    sender: Object,
    e: MessageEventArgs
  ): void {
    this.cmdDiscontinueCancel_Click(null, null);
  }
  public cmdMedAdmin_Click(sender: Object, e: RoutedEventArgs): void {
    // To Be Re-Visited
    MedicationCommonBB.LaunchMedChart(PatientContext.PatientOID, PatientContext.EncounterOid, PatientContext.EncounterType, "Authorise");
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
      AppActivity.OpenWindow("Discontinue/Cancel", this.discanc, (s, e) => { this.discanc_Closed(s); }, "Discontinue/Cancel", true, 500, 750, true, WindowButtonType.OkCancel, null, null, null, Callback);
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
          //check
          String.Join(",", this.lstOrderSet.ToArray())
        );
        iMsgBox.MessageButton = MessageBoxButton.OK;
        iMsgBox.IconType = MessageBoxType.Question;
        iMsgBox.Height = 150;
        iMsgBox.Width = 450;
        iMsgBox.MessageBoxClose = (s, e) => {
          this.DiscontinueCancelOrderSet_MessageBoxClose(s, e);
        };
        iMsgBox.Show();
      } else {
        this.LaunchDiscontinueCancel();
      }
    } else if (!this.bIsInfDiscontinue && this.bIsOrdDiscontinue) {
      this.LaunchDiscontinueCancel();
    }
  }
  DiscontinueCancelOrderSet_MessageBoxClose(
    sender: Object,
    e: MessageEventArgs
  ): void {
    if (this.bIsInfDiscontinue && this.bIsOrdDiscontinue) {
      this.bIsOrdDiscontinue = false;
    } else if (this.bIsInfDiscontinue && !this.bIsOrdDiscontinue) {
      this.LaunchDiscontinueCancel();
    } else if (!this.bIsInfDiscontinue && this.bIsOrdDiscontinue) {
      this.LaunchDiscontinueCancel();
    }
  }
  discanc_OnAllergyClosedEvent(): void {
    if (this.clinicallyVerifyVM != null) {
      this.clinicallyVerifyVM.isReconcileserreq = true;
    }
    // To be Re-Visited
    let oAllGrdRows: ObservableCollection<GrdDiscontinueCancelCols> = <ObservableCollection<GrdDiscontinueCancelCols>>this.discanc.grdDisCancelData1.ItemsSource;
    this.lastCancelDiscontinueOID = oAllGrdRows.Count > 0 ? (<GrdDiscontinueCancelCols>this.discanc.grdDisCancelData1.GetRowData(oAllGrdRows.Count - 1)).PrescriptionItemOID : 0;
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

      // To be Re-Visited

      for (let index: number = 0; index < oAllGrdRows.Count; index++) {
        oSelRowbyindex = <GrdDiscontinueCancelCols>this.discanc.grdDisCancelData1.GetRowData(index);
        if (oSelectedItem.PrescriptionItemOID == oSelRowbyindex.PrescriptionItemOID) {
          let oItemVM: PrescriptionItemVM = ObjectHelper.CreateType<PrescriptionItemVM>(this.grdResolve.SelectedItem, PrescriptionItemVM);
          if (oSelectedItem != null && (String.Compare(oSelectedItem.ParentSourcePrescriptionType, "Medication clerking", StringComparison.OrdinalIgnoreCase) == 0 || String.Compare(oSelectedItem.ParentSourcePrescriptionType, PrescriptionTypes.Clerking, StringComparison.OrdinalIgnoreCase) == 0 || PatientContext.ClerkFormViewDefaultBehavior == ClerkFormViewDeftBehaviour.LaunchFormMandatory)) {
            if (this.clinicallyVerifyVM != null && this.clinicallyVerifyVM.MedsReconcile != null) {
              let ReconcileItem: IEnumerable<PrescriptionItemVM> = this.clinicallyVerifyVM.MedsReconcile.Where((item) => item.PrescriptionItemOID == oSelectedItem.ReorderItemOID).Select(item => item);
              if (ReconcileItem != null && ReconcileItem.Count() == 0) {
                this.clinicallyVerifyVM.isReconcileserreq = true;
              }
            }
          }
          oSelectedItem.DiscontinueCancelReason = oSelRowbyindex.SelectedReason;
          oSelectedItem.OnBehalfOf = oSelRowbyindex.OnBehalfOf;
          oSelectedItem.CommunicationMode = oSelRowbyindex.CommunicationMode;
          oSelectedItem.OnBehalfOfReason = oSelRowbyindex.OnBehalfOfReason;
          oSelectedItem.DiscontinueCancelAction = oSelRowbyindex.Action;
          oSelectedItem.sPatAllergyOIDs = oSelRowbyindex.sAllergyIDs;
          let sPresItemStatus: string = String.Empty;
          let dtCurrent: DateTime = CommonBB.GetServerDateTime();
          let dtStartDTTM: DateTime = oSelectedItem.FormViewerDetails.BasicDetails.StartPrescriptionTime;
          if (String.Compare(oSelectedItem.DiscontinueCancelAction, "Cancel", StringComparison.CurrentCultureIgnoreCase) == 0) {
            sPresItemStatus = CConstants.CANCELLED;
            if (dtStartDTTM == DateTime.MinValue && oSelectedItem.FormViewerDetails.BasicDetails.InfusionDetails != null && oSelectedItem.FormViewerDetails.BasicDetails.InfusionDetails.SequentialItemOrder > 0 && oSelectedItem.FormViewerDetails.BasicDetails.InfusionDetails.ParentPrescriptionItemOID > 0) {
              sPresItemStatus = CConstants.DISCONTINUED;
            }
          }
          else {
            sPresItemStatus = CConstants.DISCONTINUED;
            oSelectedItem.IsAdministratedDiscontinue = oSelRowbyindex.IsAdminiStrated;
            if (PatientContext.IsINFUSIONON && String.Compare(PatientContext.PrescriptionType, PrescriptionTypes.ForAdministration, StringComparison.CurrentCultureIgnoreCase) == 0 && (oSelectedItem.FormViewerDetails.BasicDetails.InfusionType != null && (!String.IsNullOrEmpty(oSelectedItem.FormViewerDetails.BasicDetails.InfusionType.Value)) || oSelectedItem.FormViewerDetails.BasicDetails.InfusionDetails.IsOxygen || oSelectedItem.FormViewerDetails.BasicDetails.itemSubType == CConstants.SUBTYPE_GAS || oSelectedItem.FormViewerDetails.BasicDetails.itemSubType == CConstants.SUBTYPE_BLOOD) && ((oSelectedItem.FormViewerDetails.BasicDetails.RecordAdmin == null && !oSelRowbyindex.IsAdminiStrated && (dtStartDTTM > dtCurrent && (dtStartDTTM.AddMinutes(-MedicationCommon.MedChartData.DuenessThreshold) >= dtCurrent) && (dtStartDTTM.AddMinutes(MedicationCommon.MedChartData.DuenessThreshold) >= dtCurrent))))) {
              sPresItemStatus = CConstants.CANCELLED;
            }
            oSelectedItem.IsAdministratedDiscontinue = oSelRowbyindex.IsAdminiStrated;
            if (String.Compare(PatientContext.PrescriptionType, PrescriptionTypes.ForAdministration, StringComparison.CurrentCultureIgnoreCase) == 0 && oSelectedItem.FormViewerDetails.BasicDetails.SequenceInfo != null && oSelectedItem.FormViewerDetails.BasicDetails.SequenceInfo.GroupSequenceNo > 0 && ((oSelectedItem.FormViewerDetails.BasicDetails.RecordAdmin == null && !oSelRowbyindex.IsAdminiStrated && (dtStartDTTM > dtCurrent && (dtStartDTTM.AddMinutes(-MedicationCommon.MedChartData.DuenessThreshold) >= dtCurrent) && (dtStartDTTM.AddMinutes(MedicationCommon.MedChartData.DuenessThreshold) >= dtCurrent))))) {
              sPresItemStatus = CConstants.CANCELLED;
            }
          }
          if (oSelectedItem.FormViewerDetails.BasicDetails != null && oSelectedItem.FormViewerDetails.BasicDetails.InfusionDetails != null && oSelectedItem.FormViewerDetails.BasicDetails.InfusionDetails.GroupSequenceNo > 0 && this.clinicallyVerifyVM != null) {
            let objInfVM: InfusionVM = CSequentialHelper.GetFirstDisCancelActiveItemInfusionVM(this.clinicallyVerifyVM.MedsResolve, oSelectedItem.FormViewerDetails.BasicDetails.InfusionDetails.GroupSequenceNo);
            if (objInfVM != null && objInfVM.ItemSequenceNo == oSelectedItem.FormViewerDetails.BasicDetails.InfusionDetails.ItemSequenceNo) {
              if (!dictAmendSeqGrpDetail.ContainsKey(oSelectedItem.FormViewerDetails.BasicDetails.InfusionDetails.GroupSequenceNo)) {
                let sInfo: string = sPresItemStatus + '~' + oSelectedItem.FormViewerDetails.BasicDetails.StartPrescriptionTime;
                dictAmendSeqGrpDetail.Add(oSelectedItem.FormViewerDetails.BasicDetails.InfusionDetails.GroupSequenceNo, sInfo);
              }
            }
            if (!dictCanDisSeqGroupInfo.ContainsKey(oSelectedItem.FormViewerDetails.BasicDetails.InfusionDetails.GroupSequenceNo)) {
              dictCanDisSeqGroupInfo.Add(oSelectedItem.FormViewerDetails.BasicDetails.InfusionDetails.GroupSequenceNo, oSelectedItem.FormViewerDetails.BasicDetails.InfusionDetails.ItemSequenceNo + 1);
            }
          }
          if (oSelectedItem.FormViewerDetails.BasicDetails != null && oSelectedItem.FormViewerDetails.BasicDetails.SequenceInfo != null && oSelectedItem.FormViewerDetails.BasicDetails.SequenceInfo.GroupSequenceNo > 0 && this.clinicallyVerifyVM != null) {
            let objSeqVM: SequenceDetail = CommonSequentialHelper.GetFirstDiscancelActiveItemSeqItemVM(this.clinicallyVerifyVM.MedsResolve, oSelectedItem.FormViewerDetails.BasicDetails.SequenceInfo.GroupSequenceNo);
            if (objSeqVM != null && objSeqVM.ItemSequenceNo == oSelectedItem.FormViewerDetails.BasicDetails.SequenceInfo.ItemSequenceNo) {
              if (!dictAmendSeqGrpDetailNonIV.ContainsKey(oSelectedItem.FormViewerDetails.BasicDetails.SequenceInfo.GroupSequenceNo)) {
                let sInfo: string = sPresItemStatus + '~' + oSelectedItem.FormViewerDetails.BasicDetails.StartPrescriptionTime;
                dictAmendSeqGrpDetailNonIV.Add(oSelectedItem.FormViewerDetails.BasicDetails.SequenceInfo.GroupSequenceNo, sInfo);
              }
            }
            if (!dictCanDisSeqGroupInfoNonIV.ContainsKey(oSelectedItem.FormViewerDetails.BasicDetails.SequenceInfo.GroupSequenceNo)) {
              dictCanDisSeqGroupInfoNonIV.Add(oSelectedItem.FormViewerDetails.BasicDetails.SequenceInfo.GroupSequenceNo, oSelectedItem.FormViewerDetails.BasicDetails.SequenceInfo.ItemSequenceNo + 1);
            }
          }
          if (oSelectedItem.FormViewerDetails.BasicDetails != null && oSelectedItem.FormViewerDetails.BasicDetails.InfusionDetails != null && oSelectedItem.FormViewerDetails.BasicDetails.InfusionType != null && (String.Equals(oSelectedItem.FormViewerDetails.BasicDetails.InfusionType.Value, InfusionTypeCode.CONTINUOUS) || String.Equals(oSelectedItem.FormViewerDetails.BasicDetails.InfusionType.Value, InfusionTypeCode.SINGLEDOSEVOLUME) || String.Equals(oSelectedItem.FormViewerDetails.BasicDetails.InfusionType.Value, InfusionTypeCode.FLUID)) && oSelectedItem.FormViewerDetails.BasicDetails.InfusionDetails.ParentPrescriptionItemOID > 0) {
            oSelectedItem.FormViewerDetails.BasicDetails.InfusionDetails.IsSequentiallinkvisi = Visibility.Collapsed;
            oSelectedItem.FormViewerDetails.BasicDetails.IsSequentiallinkvisi = Visibility.Collapsed;
          }
          if (oSelectedItem.FormViewerDetails.BasicDetails != null && oSelectedItem.FormViewerDetails.BasicDetails.SequenceInfo != null && oSelectedItem.FormViewerDetails.BasicDetails.SequenceInfo.ParentPrescriptionItemOID > 0 && oSelectedItem.FormViewerDetails.BasicDetails.SequenceInfo.GroupSequenceNo > 0) {
            oSelectedItem.FormViewerDetails.BasicDetails.SequenceInfo.IsSequentiallinkvisi = Visibility.Collapsed;
            oSelectedItem.FormViewerDetails.BasicDetails.IsSequentiallinkvisi = Visibility.Collapsed;
          }
          oSelectedItem.PrescriptionItemStatus = sPresItemStatus;
          oSelectedItem.OperationMode = "M";
          if (oSelectedItem.FormViewerDetails.BasicDetails.DCCalDTTM != DateTime.MinValue && (oSelectedItem.IsDoseCalcPerformed || oSelectedItem.FormViewerDetails.BasicDetails.IsDoseCalcExist) && oSelectedItem.FormViewerDetails.BasicDetails.DoseCalcExist.Equals('2')) {
            oSelectedItem.FormViewerDetails.BasicDetails.DoseCalcExist = '1';
          }
          break;
        }
      }
      oSelectedItem.IsItemDisOrCan = true;
      this.DisCanitemRecorderIconenable(oSelectedItem);
      if (this.clinicallyVerifyVM == null) {
        this.clinicallyVerifyVM = new ClinicallyVerifyVM();
      }
      if (
        this.clinicallyVerifyVM != null &&
        !String.IsNullOrEmpty(oSelectedItem.PrescriptionItemStatus) &&
        (oSelectedItem.PrescriptionItemStatus == CConstants.DISCONTINUED ||
          oSelectedItem.PrescriptionItemStatus == CConstants.CANCELLED)
      ) {
        if (this.clinicallyVerifyVM.MedsDisCan == null) {
          this.clinicallyVerifyVM.MedsDisCan =
            new ObservableCollection<PrescriptionItemVM>();
        }
        this.clinicallyVerifyVM.MedsDisCan.Add(oSelectedItem);
        this.ReevaluateRHSPipe(oSelectedItem);
      }
    });
    if (
      dictAmendSeqGrpDetail != null &&
      dictAmendSeqGrpDetail.Count() > 0 &&
      this.clinicallyVerifyVM != null
    ) {
      CSequentialHelper.ResetStartDTTM4ActiveFirstItemBasedOnCanDisAction(
        this.clinicallyVerifyVM.MedsResolve,
        dictAmendSeqGrpDetail
      );
    }
    if (
      dictCanDisSeqGroupInfo != null &&
      dictCanDisSeqGroupInfo.Count() > 0 &&
      this.clinicallyVerifyVM != null
    ) {
      CSequentialHelper.ResetItemSequence_StartDTTMOnCanDis(
        this.clinicallyVerifyVM.MedsResolve,
        dictCanDisSeqGroupInfo,
        ActivityTypes.Amend
      );
    }
    if (
      dictAmendSeqGrpDetailNonIV != null &&
      dictAmendSeqGrpDetailNonIV.Count() > 0 &&
      this.clinicallyVerifyVM != null
    ) {
      CommonSequentialHelper.ResetStartDTTM4ActiveFirstItemBasedOnCanDisAction(
        this.clinicallyVerifyVM.MedsResolve,
        dictAmendSeqGrpDetailNonIV
      );
    }
    if (
      dictCanDisSeqGroupInfoNonIV != null &&
      dictCanDisSeqGroupInfoNonIV.Count() > 0 &&
      this.clinicallyVerifyVM != null
    ) {
      CommonSequentialHelper.ResetItemSequence_StartDTTMOnCanDis(
        this.clinicallyVerifyVM.MedsResolve,
        dictCanDisSeqGroupInfoNonIV,
        ActivityTypes.Amend
      );
    }
    // this.clinicallyVerifyVM.DeactivatePessimisticLock(this.LockedItemOIds, "PRESCRIPTIONITEM", CConstants.LockDuration);
    let SelIndecies: number[] = this.grdResolve.GetSelectedRowsIndexByOrder();
    if (SelIndecies != null) {
      let nLen: number = SelIndecies.length;
      this.clinicallyVerifyVM.UpdateConflicts(SelIndecies[nLen - 1], '');
    }
    if (!isPrescItemDataNotLoadFound) {
      this.grdResolve.Rebind();
    }
    if (
      !Common.IsClosedEncounter() &&
      MedicationCommonProfileData.PrescribeConfig != null &&
      MedicationCommonProfileData.PrescribeConfig.EnableDoseCalc
    ) {
      let oTmp = this.clinicallyVerifyVM.MedsResolve.Where((C) =>
        C.FormViewerDetails.BasicDetails.DoseCalcExist == '2'
      ).ToList();
      if (oTmp != null && oTmp.Count > 0) {
        if (
          this.clinicallyVerifyVM.IsVisibleHWIndicator == Visibility.Collapsed
        ) {
          this.clinicallyVerifyVM.IsVisibleHWIndicator = Visibility.Visible;
        }
      } else {
        if (
          this.clinicallyVerifyVM.IsVisibleHWIndicator == Visibility.Visible
        ) {
          this.clinicallyVerifyVM.IsVisibleHWIndicator = Visibility.Collapsed;
        }
      }
    }
    this.DefaultEnableDisableSupplyInstruction();
    this.EnableDisableLinks(true, false, false, false, false, false);
    this.discanc.dupDialogRef.close();
    this.grdResolve.UnselectAll(this.SelectCheckbox);
  }
  public DisCanitemRecorderIconenable(oItemVM: PrescriptionItemVM): void {
    let sourceItem: IEnumerable<PrescriptionItemVM> = null;
    if (
      (oItemVM.PrescriptionItemStatus == CConstants.DISCONTINUED ||
        oItemVM.PrescriptionItemStatus == CConstants.CANCELLED) &&
      oItemVM.IsItemDisOrCan
    ) {
      switch (oItemVM.ParentSourcePrescriptionType) {
        case PrescriptionTypes.Clerking:
          if (
            this.clinicallyVerifyVM != null &&
            this.clinicallyVerifyVM.MedsClerked != null
          ) {
            sourceItem = this.clinicallyVerifyVM.MedsClerked.Where(
              (item) => item.PrescriptionItemOID == oItemVM.ReorderItemOID
            ).Select((item) => item);
          }
          break;
        case PrescriptionTypes.Outpatient:
          if (
            this.clinicallyVerifyVM != null &&
            this.clinicallyVerifyVM.MedsOutPatient != null
          ) {
            sourceItem = this.clinicallyVerifyVM.MedsOutPatient.Where(
              (item) => item.PrescriptionItemOID == oItemVM.ReorderItemOID
            ).Select((item) => item);
          }
          break;
        case PrescriptionTypes.Leave:
          if (
            this.clinicallyVerifyVM != null &&
            this.clinicallyVerifyVM.MedsLeave != null
          ) {
            sourceItem = this.clinicallyVerifyVM.MedsLeave.Where(
              (item) => item.PrescriptionItemOID == oItemVM.ReorderItemOID
            ).Select((item) => item);
          }
          break;
        case PrescriptionTypes.Discharge:
          if (
            this.clinicallyVerifyVM != null &&
            this.clinicallyVerifyVM.MedsDischarge != null
          ) {
            sourceItem = this.clinicallyVerifyVM.MedsDischarge.Where(
              (item) => item.PrescriptionItemOID == oItemVM.ReorderItemOID
            ).Select((item) => item);
          }
          break;
        case PrescriptionTypes.ForAdministration:
          if (
            this.clinicallyVerifyVM != null &&
            this.clinicallyVerifyVM.MedsInPatient != null
          ) {
            sourceItem = this.clinicallyVerifyVM.MedsInPatient.Where(
              (item) => item.PrescriptionItemOID == oItemVM.ReorderItemOID
            ).Select((item) => item);
          }
          break;
      }
      if (
        (sourceItem == null || sourceItem.Count() == 0) &&
        oItemVM.PrescriptionType == PrescriptionTypes.ForAdministration &&
        this.clinicallyVerifyVM != null &&
        this.clinicallyVerifyVM.MedsClerked != null
      ) {
        sourceItem = this.clinicallyVerifyVM.MedsClerked.Where(
          (item) => item.ReorderItemOID == oItemVM.PrescriptionItemOID
        ).Select((item) => item);
      }
      if (
        (sourceItem == null || sourceItem.Count() == 0) &&
        oItemVM.PrescriptionType == PrescriptionTypes.ForAdministration &&
        this.clinicallyVerifyVM != null &&
        this.clinicallyVerifyVM.MedsClerked != null
      ) {
        sourceItem = this.clinicallyVerifyVM.MedsClerked.Where(
          (item) => item.PrevReorderItemOID == oItemVM.PrescriptionItemOID
        ).Select((item) => item);
      }
    }
    if (sourceItem != null && sourceItem.Count() > 0) {
      sourceItem.First().IsReoderIconEnable = true;
      sourceItem.First().ReorderToolTip = 'Select to copy across';
    }
    oItemVM.IsItemDisOrCan = false;
  }
  oMsgBox_DisCan_MessageBoxClose(sender: Object, e: MessageEventArgs): void {
    // if (this.LockedItemOIds != null)
    // this.clinicallyVerifyVM.DeactivatePessimisticLock(this.LockedItemOIds, "PRESCRIPTIONITEM", CConstants.LockDuration);
  }
  discanc_Closed(args: AppDialogEventargs): void {
    if (args.Result == AppDialogResult.Ok) {
      // ObjectHelper.stopFinishAndCancelEvent(false);
      CommonFlags.bDiscontinueCancelClicked = true;
      this.discanc.OKButtonClick();
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
      // this.clinicallyVerifyVM.DeactivatePessimisticLock(this.LockedItemOIds, "PRESCRIPTIONITEM", CConstants.LockDuration);
      this.discanc.CancelButtonClick();
    }
  }
  ReevaluateRHSPipe(item: any) {
    let medotherdisplaypipe = new DisplayOtherInformationLineItemPipe1();
    item.MedOtherDisplay1 = medotherdisplaypipe.transform(item, '', 0, '');
    let medlinedisplaypipe = new DisplayPrescriptionLineItemPipe1();
    item.MedLineDisplay = medlinedisplaypipe.transform(item, '', 0, '');
    let infoIconKey = new InfoIconPipe();
    item.InfoIconKey = infoIconKey.transform(item, '', 'ClinicalVrfy');
    item.mode = 'update';
  }
  cmdReconcile_Click_Fun = (s, e) => {
    Object.keys(that).forEach((prop) => (this[prop] = that[prop]));
    this.cmdReconcile_Click(s, e);
  }
  public cmdReconcile_Click(sender: Object, e: RoutedEventArgs): void {
    this.clinicallyVerifyVM.IsreconcileClick = true;
    this.clinicallyVerifyVM.GetNonReconciledItems();
  }
  cmdSupplyInstruction_Click_Func = (s, e) => {
    this.cmdSupplyInstruction_Click(s, e)
  }
  public cmdSupplyInstruction_Click(sender: Object, e: RoutedEventArgs): void {
    let SelectedRowItems: IEnumerable<PrescriptionItemVM> =
      this.grdResolve.SelectedItems.Cast<PrescriptionItemVM>();
    let nSelectedRowCount: number = SelectedRowItems.Where(
      (x) =>
        x.PrescriptionItemStatus != CConstants.DISCONTINUED &&
        x.PrescriptionItemStatus != CConstants.CANCELLED &&
        x.PrescriptionItemStatus != CConstants.AWAITINGAUTHORISE &&
        x.PrescriptionItemStatus != CConstants.ONHOLD &&
        x.PrescriptionItemStatus != CConstants.COMPLETED &&
        !x.IsGroupHeader
    ).Count();
    if (nSelectedRowCount == 1) {
      this.oSelectedItem = <PrescriptionItemVM>this.grdResolve.SelectedItems[0];
      if (this.oItemVM != null) {
        this.oItemVM.IsClinicallyVerify = true;
      }
      if (
        this.oSelectedItem != null &&
        this.oSelectedItem.FormViewerDetails != null &&
        this.oSelectedItem.FormViewerDetails.BasicDetails != null
      ) {
        this.oSelectedItem.IsClinicallyVerify = true;
        this.LaunchSupplyInstruction(this.oSelectedItem);
      }
    } else {
      let InstructionsAvailItemCount: number = 0;
      let PrescriptionTotItemCount: number = 0;
      if (this.oItemVM != null) {
        this.oItemVM.IsClinicallyVerify = false;
      }
      if (
        nSelectedRowCount == 0 &&
        this.clinicallyVerifyVM != null &&
        this.clinicallyVerifyVM.MedsResolve != null
      ) {
        InstructionsAvailItemCount = this.clinicallyVerifyVM.MedsResolve.Where(
          (x) =>
            x.FormViewerDetails != null &&
            x.FormViewerDetails.BasicDetails != null &&
            x.PrescriptionItemStatus != CConstants.DISCONTINUED &&
            x.PrescriptionItemStatus != CConstants.CANCELLED &&
            x.PrescriptionItemStatus != CConstants.AWAITINGAUTHORISE &&
            x.PrescriptionItemStatus != CConstants.ONHOLD &&
            x.PrescriptionItemStatus != CConstants.COMPLETED &&
            !x.IsGroupHeader &&
            x.FormViewerDetails != null &&
            x.FormViewerDetails.BasicDetails != null &&
            ((x.FormViewerDetails.BasicDetails.SelectedsupplyInstruction !=
              null &&
              x.FormViewerDetails.BasicDetails.SelectedsupplyInstruction.Count >
              0) ||
              (x.FormViewerDetails.BasicDetails.SupplyInsVal != null &&
                x.FormViewerDetails.BasicDetails.SupplyInsVal.Count > 0) ||
              !String.IsNullOrEmpty(
                x.FormViewerDetails.BasicDetails.TechsupplyInstText
              ) ||
              !String.IsNullOrEmpty(
                x.FormViewerDetails.BasicDetails.Supplycomments
              ) ||
              x.FormViewerDetails.BasicDetails.IsSupplyInstrExistsForFluid)
        ).Count();
        PrescriptionTotItemCount = this.clinicallyVerifyVM.MedsResolve.Where(
          (x) =>
            x.PrescriptionItemStatus != CConstants.DISCONTINUED &&
            x.PrescriptionItemStatus != CConstants.CANCELLED &&
            x.PrescriptionItemStatus != CConstants.AWAITINGAUTHORISE &&
            x.PrescriptionItemStatus != CConstants.ONHOLD &&
            x.PrescriptionItemStatus != CConstants.COMPLETED &&
            !x.IsGroupHeader
        ).Count();
      } else {
        InstructionsAvailItemCount = SelectedRowItems.Where(
          (x) =>
            x.FormViewerDetails != null &&
            x.FormViewerDetails.BasicDetails != null &&
            ((x.FormViewerDetails.BasicDetails.SelectedsupplyInstruction !=
              null &&
              x.FormViewerDetails.BasicDetails.SelectedsupplyInstruction.Count >
              0) ||
              (x.FormViewerDetails.BasicDetails.SupplyInsVal != null &&
                x.FormViewerDetails.BasicDetails.SupplyInsVal.Count() > 0) ||
              !String.IsNullOrEmpty(
                x.FormViewerDetails.BasicDetails.TechsupplyInstText
              ) ||
              !String.IsNullOrEmpty(
                x.FormViewerDetails.BasicDetails.Supplycomments
              ))
        ).Count();
        PrescriptionTotItemCount = nSelectedRowCount;
      }
      if (InstructionsAvailItemCount > 0) {
        if (!this.IsMsgSupplyInstruction) {
          let iMsgBox: iMessageBox = ObjectHelper.CreateObject(
            new iMessageBox(),
            {
              Title: 'LORENZO',
              Height: 150,
              Width: 400,
              Message:
                Resource.medauthorise.ExistingSupplyInst_Validation1 + ' ' +
                InstructionsAvailItemCount +
                ' of ' +
                PrescriptionTotItemCount + ' ' +
                Resource.medauthorise.ExistingSupplyInst_Validation2,
              MessageButton: MessageBoxButton.YesNo,
              IconType: MessageBoxType.Information,
            }
          );
          iMsgBox.MessageBoxClose = (s, e) => {
            this.iMsgBox_MessageBoxClose(s, e);
          };
          this.IsMsgSupplyInstruction = true;
          iMsgBox.Show();
        }
      } else {
        this.LaunchSupplyInstruction(null);
      }
    }
  }
  iMsgBox_MessageBoxClose(sender: Object, e: MessageEventArgs): void {
    if (e.MessageBoxResult == MessageBoxResult.Yes) {
      this.LaunchSupplyInstruction(null);
    }
    this.IsMsgSupplyInstruction = false;
  }
  LaunchSupplyInstruction(oSelectedItem: PrescriptionItemVM): void {
    // To Be Re-Visited
    let objSupplyInstruction = new medsupplydispensinginstructionstab();
    objSupplyInstruction.PrescriptionItemVM = oSelectedItem;
    objSupplyInstruction.IsclinicallyVerifyAddSupplylink = true;
    // ObjectHelper.stopFinishAndCancelEvent(true);
    if (
      oSelectedItem != null &&
      oSelectedItem.FormViewerDetails != null &&
      oSelectedItem.FormViewerDetails.BasicDetails != null
    ) {
      oSelectedItem.FormViewerDetails.BasicDetails.DisplayFlag = true;
    }
    this.supplystatus = String.Empty;
    if (
      oSelectedItem != null &&
      !oSelectedItem.IsCalledFromSI &&
      oSelectedItem.iSSupplyrequest != null
    ) {
      this.supplystatus =
        oSelectedItem.SelectedSupplyreq != null
          ? oSelectedItem.SelectedSupplyreq.Value
          : String.Empty;
      let objselectedval: CListItem = oSelectedItem.iSSupplyrequest
        .Where((x) => String.Equals(x.Value, 'CC_Empty'))
        .FirstOrDefault();
      oSelectedItem.SelectedSupplyreq = objselectedval;
    }
    // To Be Re-Visited
    AppActivity.OpenWindow(Resource.TechValidate.Supply_Title, objSupplyInstruction, (s, e) => { this.cmdSupplyInstruction_Closed(s) }, Resource.TechValidate.SupplyDisp_Update_Text, false, 750, 950, false, WindowButtonType.OkCancel, null);
  }
  cmdSupplyInstruction_Closed(args: AppDialogEventargs): void {
    if (this.oItemVM != null) {
      this.oItemVM.IsClinicallyVerify = false;
      // ObjectHelper.stopFinishAndCancelEvent(false);
    }
    if (args.Content != null) {
      this.oChildWindow = args.AppChildWindow;
      // ObjectHelper.stopFinishAndCancelEvent(false);
      if (args.Result == AppDialogResult.Cancel) {
        let iMsgBox: iMessageBox = ObjectHelper.CreateObject(
          new iMessageBox(),
          {
            Title: Resource.TechValidate.Titles,
            Message: Resource.disconcan1.Cancel_Error_Message,
            MessageButton: MessageBoxButton.YesNo,
            IconType: MessageBoxType.Question,
          }
        );
        iMsgBox.MessageBoxClose = (s, e) => {
          this.iMsgBox_MessageBoxCloseSupply_App(s, e);
        };
        iMsgBox.Show();
      }
      if (args.Result == AppDialogResult.Ok) {
        let oContent: medsupplydispensinginstructionstab = ObjectHelper.CreateType<medsupplydispensinginstructionstab>(args.Content.Component, medsupplydispensinginstructionstab);
        let oSupplyDispensingInstructionsVM: SupplyDispensingInstructionsVM =
          null;
          // ObjectHelper.stopFinishAndCancelEvent(true);
        if (String.Compare(oContent.tab1.SelectedKey, Resource.TechValidate.SupDet) == 0) {
          oSupplyDispensingInstructionsVM = ObjectHelper.CreateType<SupplyDispensingInstructionsVM>((ObjectHelper.CreateType<medsupplydispensinginstructions>(oContent.tab1.SelectedContent, medsupplydispensinginstructions)).DataContext, SupplyDispensingInstructionsVM);
        }
        else {
          oSupplyDispensingInstructionsVM = ObjectHelper.CreateType<SupplyDispensingInstructionsVM>((ObjectHelper.CreateType<medsupplydispensinginstructions>((ObjectHelper.CreateType<iTabItem>(oContent.tab1.Items[0], iTabItem)).Content, medsupplydispensinginstructions)).DataContext, SupplyDispensingInstructionsVM);
        }
        if (oSupplyDispensingInstructionsVM != null) {
          let CntTotalItem: number = this.grdResolve.GetRowCount();
          let oSelectedItems = null;
          if (
            CntTotalItem > 0 &&
            this.grdResolve.GetSelectedRowCount() == 0 &&
            this.clinicallyVerifyVM != null
          ) {
            oSelectedItems = this.clinicallyVerifyVM.MedsResolve.Where(
              (x) =>
                x.PrescriptionItemStatus != CConstants.DISCONTINUED &&
                x.PrescriptionItemStatus != CConstants.CANCELLED &&
                x.PrescriptionItemStatus != CConstants.AWAITINGAUTHORISE &&
                x.PrescriptionItemStatus != CConstants.ONHOLD &&
                x.PrescriptionItemStatus != CConstants.COMPLETED &&
                !x.IsOrderSetHeader
            ).ToList();
          } else {
            oSelectedItems =
              this.grdResolve.SelectedItems.Cast<PrescriptionItemVM>();
          }
          let parameter: number = 0;
          oSelectedItems.forEach((oItem) => {
            if (!oItem.IsGroupHeader) {
              if (
                oItem != null &&
                oItem.FormViewerDetails != null &&
                oItem.FormViewerDetails.BasicDetails != null
              ) {
                oItem.IsCalledFromSI = true;
                oItem.EditedGridID = 1;
                oItem.FormViewerDetails.BasicDetails.Supplycomments =
                  oSupplyDispensingInstructionsVM.Supplycomments;
                oItem.FormViewerDetails.BasicDetails.RHSSupplyInstrIconTooltip =
                  true;
                oItem.SelectedSupplyreq =
                  oSupplyDispensingInstructionsVM.SelectedSupplyrequest;
                oItem.FormViewerDetails.BasicDetails.NextSupplyDate =
                  oSupplyDispensingInstructionsVM.NextSupDTTM;
                oItem.RequisitionCACode = Resource.TechValidate.ReqCACode;
                let oSupplyInstruction: ObservableCollection<CListItem> =
                  oSupplyDispensingInstructionsVM.SupplyInstructionsList;
                if (
                  !String.IsNullOrEmpty(
                    oItem.FormViewerDetails.BasicDetails.Supplycomments
                  ) ||
                  !String.Equals(
                    oItem.SelectedSupplyreq.Value,
                    Resource.TechValidate.Empty,
                    StringComparison.InvariantCultureIgnoreCase
                  )
                ) {
                  oItem.IsSupplyRecordedViaCV = true;
                }
                if (
                  oSupplyDispensingInstructionsVM.SupplyInstructionsList.Where(
                    (a) => a.IsSelected
                  ).Count() == 0
                ) {
                  oItem.FormViewerDetails.BasicDetails.SelectedsupplyInstruction =
                    null;
                  oItem.FormViewerDetails.BasicDetails.SupplyInsVal =
                    String.Empty;
                  oItem.FormViewerDetails.BasicDetails.SupplyInsText =
                    Resource.MedicationForm.lblSupplyInstructionsText_Tooltip;
                  oItem.FormViewerDetails.BasicDetails.TechsupplyInstText =
                    String.Empty;
                  oItem.FormViewerDetails.BasicDetails.TecValOperationMode =
                    'N';
                } else {
                  oItem.FormViewerDetails.BasicDetails.TecValOperationMode =
                    'N';
                  if (
                    oSupplyInstruction != null &&
                    oSupplyInstruction.Count > 0
                  ) {
                    let oSelectedsupplyInstruction =
                      new ObservableCollection<CListItem>(
                        oSupplyInstruction
                          .Where((a) => a.IsSelected)
                          .Select((s) => s)
                      );
                    oItem.FormViewerDetails.BasicDetails.SelectedsupplyInstruction =
                      oSelectedsupplyInstruction;
                    let oSupplyText: StringBuilder = new StringBuilder();
                    let oSupplyValue: StringBuilder = new StringBuilder();
                    oSelectedsupplyInstruction.forEach((ObjSupply) => {
                      if (!String.IsNullOrEmpty(ObjSupply.DisplayText)) {
                        oSupplyText.Append(ObjSupply.DisplayText);
                      } else if (
                        MedicationCommonConceptCodeData.ViewConceptCodes !=
                        null &&
                        MedicationCommonConceptCodeData.ViewConceptCodes.Count >
                        0 &&
                        !String.IsNullOrEmpty(ObjSupply.Value)
                      ) {
                        let lstTermtext: IEnumerable<CValuesetTerm>;
                        lstTermtext =
                          MedicationCommonConceptCodeData.ViewConceptCodes.Where(
                            (x) => x.csCode == ObjSupply.Value
                          );
                        if (
                          lstTermtext != null &&
                          lstTermtext.Count() > 0 &&
                          !String.IsNullOrEmpty(
                            lstTermtext.First().csDescription
                          )
                        ) {
                          oSupplyText.Append(lstTermtext.First().csDescription);
                        }
                      }
                      oSupplyText.Append(';');
                      oSupplyValue.Append(ObjSupply.Value);
                      oSupplyValue.Append(';');
                    });
                    if (
                      oSupplyValue != null &&
                      oSupplyValue.Length > 0 &&
                      oSupplyText != null &&
                      oSupplyText.Length > 0
                    ) {
                      oItem.FormViewerDetails.BasicDetails.SupplyInsVal =
                        oSupplyValue.ToString().TrimEnd(';');
                      oItem.FormViewerDetails.BasicDetails.SupplyInsText =
                        oSupplyText.ToString().TrimEnd(';');
                    }
                    oItem.FormViewerDetails.BasicDetails.TechsupplyInstText =
                      oSupplyValue.ToString() +
                      '~~' +
                      oItem.FormViewerDetails.BasicDetails.Supplycomments;
                  }
                  if (!oItem.IsSupplyRecordedViaCV) {
                    oItem.IsSupplyRecordedViaCV = true;
                  }
                }
                oItem.bIsSupplyDispensingInstructionSet = true;
              }
            }
            let medlinedisplaypipe = new DisplayPrescriptionLineItemPipe1();
            oItem.MedLineDisplay = medlinedisplaypipe.transform(oItem, '', parameter, '');
            let medotherdisplaypipe = new DisplayOtherInformationLineItemPipe1();
            oItem.MedOtherDisplay1 = medotherdisplaypipe.transform(oItem, '', parameter, '');
            oItem.mode = 'update';
            parameter = parameter + 1;
            if (
              !String.IsNullOrEmpty(
                oItem.FormViewerDetails.BasicDetails.ExistingSupplyComments
              ) &&
              String.IsNullOrEmpty(
                oItem.FormViewerDetails.BasicDetails.Supplycomments
              )
            ) {
              oItem.FormViewerDetails.BasicDetails.InAmendSupplyinstrClear =
                true;
            }
            if (
              !oItem.FormViewerDetails.BasicDetails.InAmendSupplyinstrClear &&
              oItem.FormViewerDetails.BasicDetails.ExistingSupplyinstruction !=
              null &&
              oItem.FormViewerDetails.BasicDetails.ExistingSupplyinstruction
                .Count > 0 &&
              (oItem.FormViewerDetails.BasicDetails.SelectedsupplyInstruction ==
                null ||
                oItem.FormViewerDetails.BasicDetails.SelectedsupplyInstruction
                  .Count == 0)
            ) {
              oItem.FormViewerDetails.BasicDetails.InAmendSupplyinstrClear =
                true;
            }
          });
        }
        this.grdResolve.Rebind();
        this.grdResolve.UnselectAll();
        this.ClearCheckboxSelection();
        let lstPresItemsHasSupply: List<number> = new List<number>();
        lstPresItemsHasSupply = this.clinicallyVerifyVM.MedsResolve.Where(
          (x) =>
            x != null &&
            x.SelectedSupplyreq != null &&
            !String.IsNullOrEmpty(x.SelectedSupplyreq.Value) &&
            x.SelectedSupplyreq.Value.Equals(
              CConstants.Supplycode,
              StringComparison.InvariantCultureIgnoreCase
            ) &&
            x.EditedGridID == 1
        )
          .Select((x) => x.PrescriptionItemOID)
          .ToList();
        if (lstPresItemsHasSupply != null) {
          this.GetSupplyDispenseDetail(lstPresItemsHasSupply);
        }
        oContent.appDialog.DialogResult = true;
        // ObjectHelper.stopFinishAndCancelEvent(false);
      }
    }
  }
  iMsgBox_MessageBoxCloseSupply_App(sender: Object, e: MessageEventArgs): void {
    if (e.MessageBoxResult == MessageBoxResult.Yes) {
      this.oChildWindow.DialogResult = true;
      // ObjectHelper.stopFinishAndCancelEvent(false);
      if (
        this.oSelectedItem != null &&
        this.oSelectedItem.iSSupplyrequest != null
      ) {
        this.oSelectedItem.SelectedSupplyreq =
          this.oSelectedItem.iSSupplyrequest
            .Where((x) => String.Equals(x.Value, this.supplystatus))
            .FirstOrDefault();
      }
    }
    // else{
    //   ObjectHelper.stopFinishAndCancelEvent(true);
    // }
    Busyindicator.SetStatusIdle('AddSupplyInstructionClicked');
  }
  public cmdAddFavourites_Click(sender: Object, e: RoutedEventArgs): void {
    if (this.grdResolve.GetSelectedRowCount() > 0) {
      // To Be Re-Visited
      // this.objmedaddtofavouritesChild = new medaddtofavouritesChild(this.grdResolve.SelectedItems);
      // this.objmedaddtofavouritesChild.objAddtoFavoritesBottom = new AddtoFavoritesBottom();
      // this.objmedaddtofavouritesChild.objAddtoFavoritesBottom.DataContext = this.objmedaddtofavouritesChild.DataContext;
      // AppActivity.OpenWindow("Add to favourites", this.objmedaddtofavouritesChild, medaddtofavouritesChild_Closed, "", false, 470, 600, false, WindowButtonType.Close, this.objmedaddtofavouritesChild.objAddtoFavoritesBottom);
    }
  }
  public medaddtofavouritesChild_Closed(args: AppDialogEventargs): void {
    // To Be Re-Visited
    // if (args.Result == AppDialogResult.Close || args.Result == AppDialogResult.Cancel) {
    //     this.objmedaddtofavouritesChild.cmdClose_Click();
    //     this.objmedaddtofavouritesChild.appDialog.DialogResult = true;
    // }
  }
  public cmdOnbehalfOf_Click(sender: Object, e: RoutedEventArgs): void {
    // To Be Re-Visited
    this.objmedonbehalfofChild = new medonbehalfof();
    if (
      this.oItemVM != null &&
      this.oItemVM.OnBehalfOf == null &&
      this.grdResolve.SelectedItems != null &&
      this.grdResolve.SelectedItems.Count == 1
    ) {
      if (
        this.oItemVM.ActionCode == ActivityTypes.Amend ||
        String.Compare(
          this.oItemVM.PrescriptionItemStatus,
          CConstants.DISCONTINUED,
          StringComparison.CurrentCultureIgnoreCase
        ) == 0 ||
        String.Compare(
          this.oItemVM.PrescriptionItemStatus,
          CConstants.CANCELLED,
          StringComparison.CurrentCultureIgnoreCase
        ) == 0 ||
        String.Compare(
          this.oItemVM.PrescriptionItemStatus,
          CConstants.COMPLETED,
          StringComparison.CurrentCultureIgnoreCase
        ) == 0
      ) {
        // To Be Re-Visited
        this.objmedonbehalfofChild.PrescriberName = this.oItemVM.PrescriberOBHName.Trim();
        if (this.oItemVM.PrescriberOBOUserOID != 0) {
          this.objmedonbehalfofChild.PrescriberOID = Convert.ToString(this.oItemVM.PrescriberOBOUserOID);
        }
        else {
          this.objmedonbehalfofChild.PrescriberOID = Convert.ToString(this.oItemVM.PrescriberDetails.OID);
        }
      }
    }
    if (
      this.oItemVM != null &&
      this.oItemVM.OnBehalfOf != null &&
      this.grdResolve.SelectedItems != null &&
      this.grdResolve.SelectedItems.Count == 1
    ) {
      let oSelectedItems: List<CListItem> = new List<CListItem>();
      let oItem: CListItem = new CListItem();
      oItem.DisplayText = this.oItemVM.OnBehalfOf.DisplayText;
      oItem.Value = this.oItemVM.OnBehalfOf.Value;
      oSelectedItems.Add(oItem);
      // To Be Re-Visited

      this.objmedonbehalfofChild.SFSOnBehalfOf.ItemsSource = oSelectedItems;
      if (oSelectedItems != null) {
        // this.objmedonbehalfofChild.SFSOnBehalfOf.SelectedValue = oItem.Value;
        this.objmedonbehalfofChild.PrescriberName = oSelectedItems[0].DisplayText
        this.objmedonbehalfofChild.PrescriberOID = oSelectedItems[0].Value;
      }
      if (this.oItemVM.OnBehalfOfReason != null && !String.IsNullOrEmpty(this.oItemVM.OnBehalfOfReason.Value)) {
        // this.objmedonbehalfofChild.cboReason.Text = this.oItemVM.OnBehalfOfReason.DisplayText;
        // this.objmedonbehalfofChild.cboReason.SelectedValue = this.oItemVM.OnBehalfOfReason.Value;
        this.objmedonbehalfofChild.OnBehalfOfReasonValue = this.oItemVM.OnBehalfOfReason.Value;
      }
      if (this.oItemVM.CommunicationMode != null && !String.IsNullOrEmpty(this.oItemVM.CommunicationMode.Value)) {
        // this.objmedonbehalfofChild.cboCommunicationMode.Text = this.oItemVM.CommunicationMode.DisplayText;
        //  this.objmedonbehalfofChild.cboCommunicationMode.SelectedValue = this.oItemVM.CommunicationMode.Value;
        this.objmedonbehalfofChild.CommunicationModeValue = this.oItemVM.CommunicationMode.Value;
      }
    }
    let Callback = (s, e) => {
      if (s != null && e != null) {
        this.objmedonbehalfofChild = s;
      }
    }
    // ObjectHelper.stopFinishAndCancelEvent(true);
    AppActivity.OpenWindow("On behalf of details", this.objmedonbehalfofChild, (s) => { this.cmdOnbehalfOf_Closed(s) }, String.Empty, false, 200, 425, false, WindowButtonType.OkCancel, null, null, null, Callback);
    // To Be Re-Visited
    // AppActivity.OpenWindow("On behalf of details", this.objmedonbehalfofChild,this.cmdOnbehalfOf_Closed, "", false, 200,425, false, WindowButtonType.OkCancel, null,null);
  }
  cmdOtherLinks_Click_Fun = (s, e) => {
    Object.keys(that).forEach((prop) => (this[prop] = that[prop]));
    this.cmdOtherLinks_Click(s, e)
  }

  private cmdOtherLinks_Click(sender: Object, e: RoutedEventArgs): void {
    HtmlPage.Window.Invoke('LaunchOtherLinks', null);
  }
  cmdRemove_Click_Func = (s, e) => {
    this.cmdRemove_Click(s, e);
  };

  private cmdRemove_Click(sender: Object, e: RoutedEventArgs): void {
    let selectedRemoveItems: IEnumerable<PrescriptionItemVM> =
      this.grdResolve.SelectedItems.Cast<PrescriptionItemVM>();
    let IsIdentifySequentialPrescItem: boolean = false;
    if (selectedRemoveItems != null && selectedRemoveItems.Count() > 0) {
      selectedRemoveItems.forEach((oRemoveItem) => {
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
          // break;
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
          // break;
        }
      });
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
    this.clinicallyVerifyVM.isReconcileserreq = true;
    let oItemVM: PrescriptionItemVM =
      ObjectHelper.CreateType<PrescriptionItemVM>(
        this.grdResolve.SelectedItem,
        PrescriptionItemVM
      );
    if (
      (String.Compare(
        oItemVM.SourcePrescriptionType,
        'Medication clerking',
        StringComparison.OrdinalIgnoreCase
      ) == 0 ||
        String.Compare(
          oItemVM.SourcePrescriptionType,
          PrescriptionTypes.Clerking,
          StringComparison.OrdinalIgnoreCase
        ) == 0) &&
      oItemVM.ActionCode == ActivityTypes.Reorder
    ) {
      if (
        this.clinicallyVerifyVM != null &&
        this.clinicallyVerifyVM.MedsReorder != null
      ) {
        if (this.clinicallyVerifyVM.MedsReorder.Contains(oItemVM))
          this.clinicallyVerifyVM.MedsReorder.Remove(oItemVM);
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
        let _SeqItems = selectedRemoveItems.Where(
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
            i.formViewerDetails.BasicDetails.InfusionDetails.ItemSequenceNo > 0
        );
        if (_SeqItems != null && _SeqItems.Count() > 0) {
          //check
          // _UniqueGroupSequenceNo = _SeqItems.Select(i => i.formViewerDetails.BasicDetails.InfusionDetails.GroupSequenceNo).Distinct().ToList();
          _UniqueGroupSequenceNo = _SeqItems
            .Select(
              (i) =>
                i.formViewerDetails.BasicDetails.InfusionDetails.GroupSequenceNo
            )
            .Distinct();
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
          //check
          // _UniqueGroupSequenceNo4NonIV = _SeqItems.Select(i => i.formViewerDetails.BasicDetails.SequenceInfo.GroupSequenceNo).Distinct().ToList();
          _UniqueGroupSequenceNo4NonIV = _SeqItems
            .Select(
              (i) =>
                i.formViewerDetails.BasicDetails.SequenceInfo.GroupSequenceNo
            )
            .Distinct();
        }
      }
      let IsRebindResolveGrd: boolean = false;
      selectedRemoveItems.forEach((oRemoveItem) => {
        if (oRemoveItem.ActionCode == ActivityTypes.Reorder) {
          let sourceItem: IEnumerable<PrescriptionItemVM> = null;
          switch (oRemoveItem.SourcePrescriptionType) {
            case PrescriptionTypes.Clerking:
              sourceItem = this.clinicallyVerifyVM.MedsClerked.Where(
                (item) =>
                  item.PrescriptionItemOID ==
                  oRemoveItem.SourcePrescriptionOid ||
                  item.PrescriptionItemOID ==
                  oRemoveItem.SourcePrevEncPrescriptionOid
              ).Select((item) => item);
              break;
            case PrescriptionTypes.Outpatient:
              sourceItem = this.clinicallyVerifyVM.MedsOutPatient.Where(
                (item) =>
                  item.PrescriptionItemOID ==
                  oRemoveItem.SourcePrescriptionOid ||
                  item.PrescriptionItemOID ==
                  oRemoveItem.SourcePrevEncPrescriptionOid
              ).Select((item) => item);
              break;
            case PrescriptionTypes.Leave:
              sourceItem = this.clinicallyVerifyVM.MedsLeave.Where(
                (item) =>
                  item.PrescriptionItemOID ==
                  oRemoveItem.SourcePrescriptionOid ||
                  item.PrescriptionItemOID ==
                  oRemoveItem.SourcePrevEncPrescriptionOid
              ).Select((item) => item);
              break;
            case PrescriptionTypes.Discharge:
              sourceItem = this.clinicallyVerifyVM.MedsDischarge.Where(
                (item) =>
                  item.PrescriptionItemOID ==
                  oRemoveItem.SourcePrescriptionOid ||
                  item.PrescriptionItemOID ==
                  oRemoveItem.SourcePrevEncPrescriptionOid
              ).Select((item) => item);
              break;
            case PrescriptionTypes.ForAdministration:
              sourceItem = this.clinicallyVerifyVM.MedsInPatient.Where(
                (item) =>
                  item.PrescriptionItemOID ==
                  oRemoveItem.SourcePrescriptionOid ||
                  item.PrescriptionItemOID ==
                  oRemoveItem.SourcePrevEncPrescriptionOid
              ).Select((item) => item);
              break;
          }
          if (sourceItem != null && sourceItem.Count() > 0) {
            sourceItem.First().IsReoderIconEnable = true;
            sourceItem.First().ReorderToolTip = 'Select to copy across';
          }
          if (
            (String.Compare(
              oRemoveItem.SourcePrescriptionType,
              'Medication clerking',
              StringComparison.OrdinalIgnoreCase
            ) == 0 ||
              String.Compare(
                oRemoveItem.SourcePrescriptionType,
                PrescriptionTypes.Clerking,
                StringComparison.OrdinalIgnoreCase
              ) == 0) &&
            oRemoveItem.ActionCode == ActivityTypes.Reorder
          ) {
            if (
              sourceItem.First().PrescriptionItemOID !=
              oRemoveItem.SourcePrescriptionOid
            ) {
              if (
                this.clinicallyVerifyVM != null &&
                this.clinicallyVerifyVM.MedsReconcile != null
              ) {
                this.clinicallyVerifyVM.MedsReconcile.Add(oRemoveItem);
              }
            }
          }
        } else if (oRemoveItem.ActionCode == ActivityTypes.Amend) {
          let sourceItem: IEnumerable<PrescriptionItemVM> =
            this.clinicallyVerifyVM.MedsResolve.Where(
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
              sourceItem.First().FormViewerDetails.BasicDetails.EndDTTM =
                sourceItem.First().FormViewerDetails.BasicDetails.OrginalEndDTTM;
              sourceItem.First().FormViewerDetails.BasicDetails.StopDate =
                sourceItem.First().FormViewerDetails.BasicDetails.OrginalEndDTTM;
              if (
                !Common.IsClosedEncounter() &&
                sourceItem
                  .First()
                  .FormViewerDetails.BasicDetails.PreviousDoseCalcExist.Equals(
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
          // if ((String.Compare(oRemoveItem.SourcePrescriptionType, "Medication clerking", StringComparison.OrdinalIgnoreCase) == 0 || String.Compare(oRemoveItem.SourcePrescriptionType, PrescriptionTypes.Clerking, StringComparison.OrdinalIgnoreCase) == 0 || PatientContext.ClerkFormViewDefaultBehavior == ClerkFormViewDeftBehaviour.LaunchFormMandatory) && (oRemoveItem.ActionCode === ActivityTypes.Reorder)) {
          //     if (sourceItem.First().PrescriptionItemOID != oRemoveItem.SourcePrescriptionOid) {
          //         if (this.clinicallyVerifyVM != null && this.clinicallyVerifyVM.MedsReconcile != null) {
          //             this.clinicallyVerifyVM.MedsReconcile.Add(oRemoveItem);
          //         }
          //     }
          // }
          if (
            oRemoveItem != null &&
            oRemoveItem.FormViewerDetails != null &&
            oRemoveItem.FormViewerDetails.BasicDetails != null &&
            oRemoveItem.FormViewerDetails.BasicDetails.InfusionDetails !=
            null &&
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
        }
      });
      if (IsRebindResolveGrd) {
        if (
          this.clinicallyVerifyVM.IsVisibleHWIndicator == Visibility.Collapsed
        ) {
          this.clinicallyVerifyVM.IsVisibleHWIndicator = Visibility.Visible;
        }
      }
      let RemoveItem = selectedRemoveItems.Select((s) => s).ToList();
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
          if (!lstOrderSetHeaders.Contains(sKey)) lstOrderSetHeaders.Add(sKey);
        }
      });
      let RemoveIndecies: number[] =
        this.grdResolve.GetSelectedRowsIndexByOrder();
      if (RemoveIndecies != null) {
        let nLen: number = RemoveIndecies.length;
        let UniqueGroupSequenceNo: number = 0;
        let IsSeqInfItem: boolean = false;
        for (let i: number = nLen; i > 0; i--) {
          IsSeqInfItem =
            this.clinicallyVerifyVM.MedsResolve != null &&
            this.clinicallyVerifyVM.MedsResolve.Count > 0 &&
            !this.clinicallyVerifyVM.MedsResolve[RemoveIndecies[i - 1]]
              .IsGroupHeader &&
            this.clinicallyVerifyVM.MedsResolve[RemoveIndecies[i - 1]]
              .FormViewerDetails != null &&
            this.clinicallyVerifyVM.MedsResolve[RemoveIndecies[i - 1]]
              .FormViewerDetails.BasicDetails != null &&
            this.clinicallyVerifyVM.MedsResolve[RemoveIndecies[i - 1]]
              .formViewerDetails.BasicDetails.InfusionType != null &&
            !String.IsNullOrEmpty(
              this.clinicallyVerifyVM.MedsResolve[RemoveIndecies[i - 1]]
                .formViewerDetails.BasicDetails.InfusionType.Value
            ) &&
            this.clinicallyVerifyVM.MedsResolve[RemoveIndecies[i - 1]]
              .formViewerDetails.BasicDetails.InfusionDetails != null &&
            this.clinicallyVerifyVM.MedsResolve[RemoveIndecies[i - 1]]
              .formViewerDetails.BasicDetails.InfusionDetails.GroupSequenceNo >
            0 &&
            this.clinicallyVerifyVM.MedsResolve[RemoveIndecies[i - 1]]
              .formViewerDetails.BasicDetails.InfusionDetails.ItemSequenceNo >
            0;
          if (IsSeqInfItem) {
            UniqueGroupSequenceNo =
              this.clinicallyVerifyVM.MedsResolve[RemoveIndecies[i - 1]]
                .formViewerDetails.BasicDetails.InfusionDetails.GroupSequenceNo;
          }
          if (
            String.Compare(
              this.clinicallyVerifyVM.MedsResolve[RemoveIndecies[i - 1]]
                .OperationMode,
              'U'
            ) == 0
          ) {
            if (this.clinicallyVerifyVM.MedsDeletedItemsResolve == null) {
              this.clinicallyVerifyVM.MedsDeletedItemsResolve =
                new ObservableCollection<number>();
            }
            this.clinicallyVerifyVM.MedsDeletedItemsResolve.Add(
              this.clinicallyVerifyVM.MedsResolve[RemoveIndecies[i - 1]]
                .PrescriptionItemOID
            );
          }
          if (
            !this.clinicallyVerifyVM.MedsResolve[RemoveIndecies[i - 1]]
              .IsGroupHeader
          ) {
            this.clinicallyVerifyVM.MedsResolve.RemoveAt(RemoveIndecies[i - 1]);
          }
          if (UniqueGroupSequenceNo > 0) {
            CSequentialHelper.ReassignSequenceNoOnRemove(
              this.clinicallyVerifyVM.MedsResolve,
              UniqueGroupSequenceNo,
              eSequenceNoReassignType.ReassignWithinGroup,
              this.clinicallyVerifyVM
            );
            UniqueGroupSequenceNo = 0;
            IsSeqInfItem = false;
          }
          if (
            this.clinicallyVerifyVM.MaxNoOfPrescCounter ==
            CConstants.MaxNoOfPrescriptions
          ) {
            this.clinicallyVerifyVM.EnableFauxTabs = false;
          }
          if (this.clinicallyVerifyVM != null) {
            this.clinicallyVerifyVM.MaxNoOfPrescCounter--;
            if (this.clinicallyVerifyVM.EnableFauxTabs == false)
              this.EnableLHSTabs();
          }
        }
        if (this.clinicallyVerifyVM != null) {
          this.clinicallyVerifyVM.UpdateConflicts(RemoveIndecies[nLen - 1], '');
        }
        let lstOrderSetHeaderIndex: List<number> = new List<number>();
        lstOrderSetHeaders.forEach((sKey1) => {
          let sHeader: string[] = sKey1.Split('~');
          let lnPrescriptionOID: number = Number.Parse(sHeader[1]);
          let qry: IEnumerable<PrescriptionItemVM> =
            this.clinicallyVerifyVM.MedsResolve.Select((x) => x).Where(
              (x) =>
                x.FormViewerDetails.BasicDetails.Ordersets != null &&
                x.FormViewerDetails.BasicDetails.Ordersets.DisplayText ==
                sHeader[0] &&
                x.PrescriptionOID == lnPrescriptionOID
            );
          if (qry != null && qry.Count() > 0) {
            let lastitem: PrescriptionItemVM = qry.Last();
            if (lastitem != null && this.clinicallyVerifyVM != null) {
              let lastindex: number =
                this.clinicallyVerifyVM.MedsResolve.IndexOf(lastitem);
              if (
                this.clinicallyVerifyVM.MedsResolve != null &&
                this.clinicallyVerifyVM.MedsResolve.Count > 0 &&
                lastindex == this.clinicallyVerifyVM.MedsResolve.Count - 1
              ) {
                this.clinicallyVerifyVM.MedsResolve.Select((x) => x)
                  .Where(
                    (x) =>
                      x.FormViewerDetails.BasicDetails.Ordersets != null &&
                      x.FormViewerDetails.BasicDetails.Ordersets.DisplayText ==
                      sHeader[0] &&
                      x.PrescriptionOID == lnPrescriptionOID
                  )
                  .Last().IsOrderSetLastItem = true;
              } else {
                if (
                  !this.clinicallyVerifyVM.MedsResolve.ElementAt(lastindex + 1)
                    .IsOrderSetHeader
                ) {
                  this.clinicallyVerifyVM.MedsResolve.Select((x) => x)
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
              this.clinicallyVerifyVM.MedsResolve.Select((x) => x).Where(
                (x) =>
                  x.PrescriptionItem == sHeader[0] &&
                  x.PrescriptionOID == lnPrescriptionOID
              );
            qHeader.forEach((oHeader) => {
              lstOrderSetHeaderIndex.Add(
                this.clinicallyVerifyVM.MedsResolve.IndexOf(oHeader)
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
            this.clinicallyVerifyVM.MedsResolve.RemoveAt(
              lstOrderSetHeaderIndex[iRem]
            );
          }
        }
        let ItemOrder: number = 1;
        let CurrentActiveFirstItem: number = 1;
        RemoveItem.forEach((oReorderSeq) => {
          let GetSequential = this.clinicallyVerifyVM.MedsResolve.Where(
            (c) =>
              c.FormViewerDetails.BasicDetails.InfusionDetails != null &&
              c.FormViewerDetails.BasicDetails.InfusionDetails
                .SequentialItemOrder > 0 &&
              c.FormViewerDetails.BasicDetails.InfusionDetails
                .PrescriptionItemNumber ==
              oReorderSeq.FormViewerDetails.BasicDetails.InfusionDetails
                .PrescriptionItemNumber
          )
            .Select((s) => s)
            .OrderBy(
              (oSelectorder) =>
                oSelectorder.FormViewerDetails.BasicDetails.InfusionDetails
                  .SequentialItemOrder
            );
          if (GetSequential != null && GetSequential.Count() > 0) {
            this.clinicallyVerifyVM.MedsResolve.ForEach((ReInsert) => {
              if (GetSequential.Contains(ReInsert)) {
                ReInsert.FormViewerDetails.BasicDetails.InfusionDetails.SequentialItemOrder =
                  ItemOrder;
                if (
                  ReInsert.FormViewerDetails.BasicDetails.InfusionDetails
                    .SequentialItemOrder == 1 &&
                  oReorderSeq.FormViewerDetails.BasicDetails.InfusionDetails
                    .SequentialItemOrder == 1
                )
                  ReInsert.FormViewerDetails.BasicDetails.StartDTTM =
                    oReorderSeq.FormViewerDetails.BasicDetails.StartDTTM;
                ItemOrder = ItemOrder + 1;
              }
            });
            if (
              this.clinicallyVerifyVM != null &&
              this.clinicallyVerifyVM.InfusionContinousSeq != null &&
              this.clinicallyVerifyVM.InfusionContinousSeq.SequentialItemOrder >
              0
            )
              this.clinicallyVerifyVM.InfusionContinousSeq.SequentialItemOrder -= 1;
          } else this.clinicallyVerifyVM.InfusionContinousSeq = null;
          if (GetSequential != null && GetSequential.Count() > 0) {
            let ocurrent: ObservableCollection<PrescriptionItemVM> =
              new ObservableCollection<PrescriptionItemVM>(
                this.clinicallyVerifyVM.MedsResolve.Where(
                  (c) =>
                    c.FormViewerDetails.BasicDetails.InfusionDetails != null &&
                    c.FormViewerDetails.BasicDetails.InfusionDetails
                      .PrescriptionItemNumber > 0 &&
                    c.FormViewerDetails.BasicDetails.InfusionDetails
                      .PrescriptionItemNumber ==
                    GetSequential.Select(
                      (s) =>
                        s.FormViewerDetails.BasicDetails.InfusionDetails
                          .PrescriptionItemNumber
                    ).FirstOrDefault()
                ).Select((s) => s)
              );
            if (
              ocurrent.Count == 1 &&
              ocurrent
                .Select(
                  (s) =>
                    s.FormViewerDetails.BasicDetails.InfusionDetails
                      .SequentialItemOrder
                )
                .Count() == 1
            ) {
              this.clinicallyVerifyVM.MedsResolve.ForEach((ReCheck) => {
                if (ocurrent.Contains(ReCheck)) {
                  if (!ReCheck.FormViewerDetails.BasicDetails.IsenableRoute)
                    ReCheck.FormViewerDetails.BasicDetails.IsenableRoute = true;
                }
              });
            }
          }
          let objInfusionVM: InfusionVM = null;
          if (
            oReorderSeq != null &&
            oReorderSeq.FormViewerDetails != null &&
            oReorderSeq.FormViewerDetails.BasicDetails != null &&
            oReorderSeq.FormViewerDetails.BasicDetails.InfusionDetails !=
            null &&
            this.clinicallyVerifyVM != null &&
            this.clinicallyVerifyVM.MedsResolve != null &&
            this.clinicallyVerifyVM.MedsResolve.Count > 0
          ) {
            objInfusionVM = CSequentialHelper.GetFirstActiveItemInfusionVM(
              this.clinicallyVerifyVM.MedsResolve,
              oReorderSeq.FormViewerDetails.BasicDetails.InfusionDetails
                .GroupSequenceNo
            );
          }
          if (objInfusionVM != null) {
            CurrentActiveFirstItem = objInfusionVM.ItemSequenceNo;
          }
          if (
            this.clinicallyVerifyVM.MedsResolve.Where(
              (c) =>
                !c.IsGroupHeader &&
                c.FormViewerDetails.BasicDetails.InfusionDetails != null &&
                oReorderSeq.FormViewerDetails.BasicDetails.InfusionDetails !=
                null &&
                c.FormViewerDetails.BasicDetails.InfusionDetails
                  .GroupSequenceNo > 0 &&
                c.FormViewerDetails.BasicDetails.InfusionDetails
                  .PrescriptionItemNumber ==
                oReorderSeq.FormViewerDetails.BasicDetails.InfusionDetails
                  .PrescriptionItemNumber
            )
              .Select((s) => s)
              .Count() > 1
          ) {
            let SeqAmendStartDTTM: DateTime = DateTime.MinValue;
            SeqAmendStartDTTM = this.clinicallyVerifyVM.MedsResolve.Where(
              (c) =>
                c.FormViewerDetails.BasicDetails.InfusionDetails != null &&
                c.FormViewerDetails.BasicDetails.InfusionDetails
                  .PrescriptionItemNumber ==
                oReorderSeq.FormViewerDetails.BasicDetails.InfusionDetails
                  .PrescriptionItemNumber &&
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
            if (SeqAmendStartDTTM != DateTime.MinValue) {
              RemoveItem.ForEach((ReInsertDTTM) => {
                if (
                  !oReorderSeq.IsGroupHeader &&
                  oReorderSeq.FormViewerDetails.BasicDetails.InfusionDetails !=
                  null &&
                  oReorderSeq.FormViewerDetails.BasicDetails.InfusionDetails
                    .GroupSequenceNo > 0 &&
                  oReorderSeq.FormViewerDetails.BasicDetails.InfusionDetails
                    .PrescriptionItemNumber > 0 &&
                  ReInsertDTTM.FormViewerDetails.BasicDetails.InfusionDetails
                    .PrescriptionItemNumber > 0 &&
                  ReInsertDTTM.FormViewerDetails.BasicDetails.InfusionDetails
                    .PrescriptionItemNumber ==
                  oReorderSeq.FormViewerDetails.BasicDetails.InfusionDetails
                    .PrescriptionItemNumber
                ) {
                  ReInsertDTTM.FormViewerDetails.BasicDetails.StartDTTM =
                    SeqAmendStartDTTM;
                  ReInsertDTTM.FormViewerDetails.BasicDetails.StartPrescriptionTime =
                    SeqAmendStartDTTM;
                }
              });
              this.clinicallyVerifyVM.MedsResolve.ForEach((ReInsertDTTM) => {
                if (
                  !oReorderSeq.IsGroupHeader &&
                  oReorderSeq.FormViewerDetails.BasicDetails.InfusionDetails !=
                  null &&
                  ReInsertDTTM.FormViewerDetails.BasicDetails.InfusionDetails !=
                  null &&
                  ReInsertDTTM.FormViewerDetails.BasicDetails.InfusionDetails
                    .GroupSequenceNo ==
                  oReorderSeq.FormViewerDetails.BasicDetails.InfusionDetails
                    .GroupSequenceNo &&
                  oReorderSeq.FormViewerDetails.BasicDetails.InfusionDetails
                    .PrescriptionItemNumber > 0 &&
                  ReInsertDTTM.FormViewerDetails.BasicDetails.InfusionDetails
                    .PrescriptionItemNumber > 0 &&
                  ReInsertDTTM.FormViewerDetails.BasicDetails.InfusionDetails
                    .PrescriptionItemNumber ==
                  oReorderSeq.FormViewerDetails.BasicDetails.InfusionDetails
                    .PrescriptionItemNumber &&
                  ReInsertDTTM.FormViewerDetails.BasicDetails.InfusionDetails
                    .ItemSequenceNo >
                  oReorderSeq.FormViewerDetails.BasicDetails.InfusionDetails
                    .ItemSequenceNo
                ) {
                  ReInsertDTTM.FormViewerDetails.BasicDetails.StartDTTM =
                    SeqAmendStartDTTM;
                  ReInsertDTTM.FormViewerDetails.BasicDetails.StartPrescriptionTime =
                    SeqAmendStartDTTM;
                }
              });
            }
          }
          let objSeqDetailVM: SequenceDetail = null;
          if (
            oReorderSeq != null &&
            oReorderSeq.FormViewerDetails != null &&
            oReorderSeq.FormViewerDetails.BasicDetails != null &&
            oReorderSeq.FormViewerDetails.BasicDetails.SequenceInfo != null &&
            this.clinicallyVerifyVM != null &&
            this.clinicallyVerifyVM.MedsResolve != null &&
            this.clinicallyVerifyVM.MedsResolve.Count > 0
          ) {
            objSeqDetailVM = CommonSequentialHelper.GetFirstActiveItemSeqItemVM(
              this.clinicallyVerifyVM.MedsResolve,
              oReorderSeq.FormViewerDetails.BasicDetails.SequenceInfo
                .GroupSequenceNo
            );
          }
          if (objSeqDetailVM != null) {
            CurrentActiveFirstItem = objSeqDetailVM.ItemSequenceNo;
          }
          if (
            this.clinicallyVerifyVM.MedsResolve.Where(
              (c) =>
                !c.IsGroupHeader &&
                c.FormViewerDetails.BasicDetails.SequenceInfo != null &&
                oReorderSeq.FormViewerDetails.BasicDetails.SequenceInfo !=
                null &&
                c.FormViewerDetails.BasicDetails.SequenceInfo.GroupSequenceNo >
                0 &&
                c.FormViewerDetails.BasicDetails.SequenceInfo
                  .PrescriptionItemNumber ==
                oReorderSeq.FormViewerDetails.BasicDetails.SequenceInfo
                  .PrescriptionItemNumber
            )
              .Select((s) => s)
              .Count() > 1
          ) {
            let SeqAmendStartDTTM: DateTime = DateTime.MinValue;
            SeqAmendStartDTTM = this.clinicallyVerifyVM.MedsResolve.Where(
              (c) =>
                c.FormViewerDetails.BasicDetails.SequenceInfo != null &&
                c.FormViewerDetails.BasicDetails.SequenceInfo
                  .PrescriptionItemNumber ==
                oReorderSeq.FormViewerDetails.BasicDetails.SequenceInfo
                  .PrescriptionItemNumber &&
                c.FormViewerDetails.BasicDetails.SequenceInfo.ItemSequenceNo >
                0 &&
                c.FormViewerDetails.BasicDetails.SequenceInfo.ItemSequenceNo ==
                CurrentActiveFirstItem
            )
              .Select(
                (s) => s.FormViewerDetails.BasicDetails.StartPrescriptionTime
              )
              .FirstOrDefault();
            if (SeqAmendStartDTTM != DateTime.MinValue) {
              RemoveItem.ForEach((ReInsertDTTM) => {
                if (
                  !oReorderSeq.IsGroupHeader &&
                  oReorderSeq.FormViewerDetails.BasicDetails.SequenceInfo !=
                  null &&
                  oReorderSeq.FormViewerDetails.BasicDetails.SequenceInfo
                    .GroupSequenceNo > 0 &&
                  oReorderSeq.FormViewerDetails.BasicDetails.SequenceInfo
                    .PrescriptionItemNumber > 0 &&
                  ReInsertDTTM.FormViewerDetails.BasicDetails.SequenceInfo
                    .PrescriptionItemNumber > 0 &&
                  ReInsertDTTM.FormViewerDetails.BasicDetails.SequenceInfo
                    .PrescriptionItemNumber ==
                  oReorderSeq.FormViewerDetails.BasicDetails.SequenceInfo
                    .PrescriptionItemNumber
                ) {
                  ReInsertDTTM.FormViewerDetails.BasicDetails.StartDTTM =
                    SeqAmendStartDTTM;
                  ReInsertDTTM.FormViewerDetails.BasicDetails.StartPrescriptionTime =
                    SeqAmendStartDTTM;
                }
              });
              this.clinicallyVerifyVM.MedsResolve.ForEach((ReInsertDTTM) => {
                if (
                  !oReorderSeq.IsGroupHeader &&
                  oReorderSeq.FormViewerDetails.BasicDetails.SequenceInfo !=
                  null &&
                  ReInsertDTTM.FormViewerDetails.BasicDetails.SequenceInfo !=
                  null &&
                  ReInsertDTTM.FormViewerDetails.BasicDetails.SequenceInfo
                    .GroupSequenceNo ==
                  oReorderSeq.FormViewerDetails.BasicDetails.SequenceInfo
                    .GroupSequenceNo &&
                  oReorderSeq.FormViewerDetails.BasicDetails.SequenceInfo
                    .PrescriptionItemNumber > 0 &&
                  ReInsertDTTM.FormViewerDetails.BasicDetails.SequenceInfo
                    .PrescriptionItemNumber > 0 &&
                  ReInsertDTTM.FormViewerDetails.BasicDetails.SequenceInfo
                    .PrescriptionItemNumber ==
                  oReorderSeq.FormViewerDetails.BasicDetails.SequenceInfo
                    .PrescriptionItemNumber &&
                  ReInsertDTTM.FormViewerDetails.BasicDetails.SequenceInfo
                    .ItemSequenceNo >
                  oReorderSeq.FormViewerDetails.BasicDetails.SequenceInfo
                    .ItemSequenceNo
                ) {
                  ReInsertDTTM.FormViewerDetails.BasicDetails.StartDTTM =
                    SeqAmendStartDTTM;
                  ReInsertDTTM.FormViewerDetails.BasicDetails.StartPrescriptionTime =
                    SeqAmendStartDTTM;
                }
              });
            }
          }
          if (
            _UniqueGroupSequenceNo != null &&
            _UniqueGroupSequenceNo.Count() > 0 &&
            _UniqueGroupSequenceNo.Min() > 0
          ) {
            CSequentialHelper.ReassignSequenceNoOnRemove(
              this.clinicallyVerifyVM.MedsResolve,
              _UniqueGroupSequenceNo.Min(),
              _UniqueGroupSequenceNo.Count() == 1
                ? eSequenceNoReassignType.ReassignWithinGroup
                : eSequenceNoReassignType.ReassignAcrossGroups,
              this.clinicallyVerifyVM
            );
          }
          if (
            _UniqueGroupSequenceNo4NonIV != null &&
            _UniqueGroupSequenceNo4NonIV.Count() > 0 &&
            _UniqueGroupSequenceNo4NonIV.Min() > 0
          ) {
            CommonSequentialHelper.ReassignSequenceNoOnRemove(
              this.clinicallyVerifyVM.MedsResolve,
              _UniqueGroupSequenceNo4NonIV.Min(),
              _UniqueGroupSequenceNo4NonIV.Count() == 1
                ? eCommonSequenceNoReassignType.ReassignWithinGroup
                : eCommonSequenceNoReassignType.ReassignAcrossGroups,
              this.clinicallyVerifyVM
            );
          }
          this.clinicallyVerifyVM.SetDCIndicator();
          if (
            Common.oIPPMABaseVM != null &&
            Common.oIPPMABaseVM.MedsGPConnect != null &&
            Common.oIPPMABaseVM.MedsGPConnect.Count > 0 &&
            oReorderSeq.GpConnectMedicationItem != null &&
            !String.IsNullOrEmpty(
              oReorderSeq.GpConnectMedicationItem.GPConnectID
            )
          ) {
            let gpvm: GPConnectItemVM = Common.oIPPMABaseVM.MedsGPConnect.Where(
              (x) =>
                x.GPConnectID == oReorderSeq.GpConnectMedicationItem.GPConnectID
            ).FirstOrDefault();
            if (gpvm != null) {
              gpvm.IsClerked = false;
            }
          }
        });
      }
      if (
        _AmendedItemRemovedGroups != null ||
        _OtherItemRemovedGroups != null
      ) {
        if (_AmendedItemRemovedGroups.Count > 0) {
          CSequentialHelper.ResetItemSequence_StartDTTMOnRemove(
            _AmendedItemRemovedGroups,
            this.clinicallyVerifyVM.MedsResolve,
            ActivityTypes.Amend
          );
        }
        if (_OtherItemRemovedGroups.Count > 0) {
          CSequentialHelper.ResetItemSequence_StartDTTMOnRemove(
            _OtherItemRemovedGroups,
            this.clinicallyVerifyVM.MedsResolve,
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
            this.clinicallyVerifyVM.MedsResolve,
            ActivityTypes.Amend
          );
        }
        if (_OtherItemRemovedGroups4NonIV.Count > 0) {
          CommonSequentialHelper.ResetItemSequence_StartDTTMOnRemove(
            _OtherItemRemovedGroups4NonIV,
            this.clinicallyVerifyVM.MedsResolve,
            ActivityTypes.Prescribe
          );
        }
      }
    }
    if (this.grdResolve.selectedRowsIndex.length > 0) {
      this.grdResolve.selectedRowsIndex = [];
      this.grdResolve_SelectionChanged({}, {});
      this.grdResolve.Rebind();
      this.SelectCheckbox.forEach((checkbox: iCheckBox) => {
        checkbox.IsChecked = false;
      });
    }
    this.ReevaluateRHSPipe(this.oItemVM);
  }


  iTab1_SelectionChanged_Func = (s, e) => {
    Object.keys(that).forEach((prop) => (this[prop] = that[prop]));
    this.iTab1_SelectionChanged(s, e);
  };
  public iTab1_SelectionChanged(
    sender: Object,
    e: RadSelectionChangedEventArgs
  ): void {
    if (QueryStringInfo.IsLaunchformchart == 'True') {
      this.iTab1.SelectedKey = 'Search';
      QueryStringInfo.IsLaunchformchart = String.Empty;
    }
    if (QueryStringInfo.IsLaunchformPreschart == 'True') {
      QueryStringInfo.IsLaunchformPreschart = String.Empty;
      QueryStringInfo.IsLaunchformPreschartReview = 'True';
    }
    if (Common.oIPPMABaseVM != null && !Common.oIPPMABaseVM.IsGPConMatchFound) {
      Common.oIPPMABaseVM.GpConnectMedicationItem =
        Common.oIPPMABaseVM.SelectedGPConnectItem = null;
    }
    if (this.iTab1.SelectedKey == "Search" && this.clinicallyVerifyVM.IsQuickSearchTabFirstVisit4CV) {
      this.clinicallyVerifyVM.CV_SearchTabSelect_Completed.emit();
      this.clinicallyVerifyVM.IsQuickSearchTabFirstVisit4CV = false;
    }
  }
  cmdSummary_click_Fun = (s, e) => { this.cmdSummary_Click(s, e) }
  public cmdSummary_Click(sender: Object, e: RoutedEventArgs): void {
    if (!String.IsNullOrEmpty(GlobalVariable.NhsNumber)) {
      let sResult: string = String.Empty;
      sResult = ObjectHelper.CreateType<string>(
        HtmlPage.Window.Invoke('LaunchGPCSummaryView'),
        String
      );
    }
  }

  get isChildWizard() {
    return AppLoadService.isChildWizard;
  }

  cmdMedClkSrc_ClickFunc = (s, e) => { this.cmdMedClkSrc_Click(s, e); };
  cmdMedClkSrc_Click(sender: Object, e: RoutedEventArgs): void {
    this.oMultiSelectListView = new MultiSelectListView();
    // ObjectHelper.stopFinishAndCancelEvent(true);
    this.oMultiSelectListView.constructorImpl(ValueDomain.MedicationClerking, this.clinicallyVerifyVM.MedicationClerkingSource.ToList());
    AppActivity.OpenWindow("Medication clerking source - LORENZO", this.oMultiSelectListView, (s, e) => { this.oMultiSelectListView_Closed(s); }, "", false, 625, 450, false, WindowButtonType.OkCancel, null);
  }
  oMultiSelectListView_Closed(args: AppDialogEventargs): void {
    // ObjectHelper.stopFinishAndCancelEvent(false);
    if (args.Content != null)
      this.oMultiSelectListView = ObjectHelper.CreateType<MultiSelectListView>(args.Content.Component, MultiSelectListView);
    if (args.Result == AppDialogResult.Ok && args.Content != null && args.Content.Component != null) {
      if (this.oMultiSelectListView.okButtonClick()) {
        if (this.oMultiSelectListView instanceof MultiSelectListView) {
          let oMultiSelectVM: MultiSelectListVM = ObjectHelper.CreateType<MultiSelectListVM>(this.oMultiSelectListView.DataContext, MultiSelectListVM);
          if (oMultiSelectVM instanceof MultiSelectListVM)
            this.clinicallyVerifyVM.MedicationClerkingSource =
              oMultiSelectVM.ValueDomainCollection;
        }
      }
    } else {
      this.oMultiSelectListView.CancelButtonClick();
    }
  }
  private UserControl_Loaded(sender: Object, e: RoutedEventArgs): void {
    if (
      !String.IsNullOrEmpty(PatientContext.PrescriptionType == "" ? PatientContext.PType : PatientContext.PrescriptionType) &&
      !String.IsNullOrEmpty(PatientContext.EncounterType)
    ) {
      let prescriptiontype: string = PrescriptionHelper.GetPrescriptionType(
        PatientContext.PrescriptionType == "" ? PatientContext.PType : PatientContext.PrescriptionType
      );
      if (
        PatientContext.EncounterType == 'CC_INPAT' &&
        prescriptiontype == PrescriptionTypes.Foradministration
      )
        prescriptiontype = 'Inpatient';
      else if (
        PatientContext.EncounterType != 'CC_INPAT' &&
        prescriptiontype == 'Inpatient'
      )
        prescriptiontype = PrescriptionTypes.Foradministration;
      this.lblDisplayText.Text =
        prescriptiontype + ' medications - items to be Clinically verified';
    }
    if (
      !(
        String.Compare(
          PatientContext.PrescriptionType,
          PrescriptionTypes.Discharge,
          StringComparison.CurrentCultureIgnoreCase
        ) == 0
      )
    ) {
      this.cmdReconcile.IsEnabled = false;
    }
    if (!this.bIsLoaded) {
      this.bIsLoaded = true;

      // this.clinicallyVerifyVM = (ObjectHelper.CreateType<ClinicallyVerifyVM>(this.DataContext, ClinicallyVerifyVM));
      this.clinicallyVerifyVM = this.DataContext;
      this.grdResolve.SetBinding('data', this.clinicallyVerifyVM.MedsResolve);
      if (this.clinicallyVerifyVM != null) {
        this.clinicallyVerifyVM.GetProfileDataCompeletedEvent = (s, e) => {
          this.clinicallyVerifyVM_GetProfileDataCompeletedEvent();
        };
        this.clinicallyVerifyVM.FillActivityConsideration();
        this.clinicallyVerifyVM.MedsReconcile = null;
        if (
          !String.IsNullOrEmpty(PatientContext.PrescriptionType) &&
          (String.Compare(
            PatientContext.PrescriptionType,
            PrescriptionTypes.Clerking,
            StringComparison.InvariantCultureIgnoreCase
          ) == 0 ||
            PatientContext.ClerkFormViewDefaultBehavior ==
            ClerkFormViewDeftBehaviour.LaunchFormMandatory) &&
          this.clinicallyVerifyVM.CACode == CConstants.ClinicallyVerifyMenuCode
        ) {
          Common.GetConflictConfig();
        }
      }
    }
    if (UserPermissions.CanEnableMedChart) {
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
    if (this.clinicallyVerifyVM != null) {
      this.clinicallyVerifyVM.ReBindResolveGridEvent = (s, e) => { this.ClinicallyVerify_ReBindResolveGridEvent(s, e); };
      this.clinicallyVerifyVM.formViewerCloseEventhandler = (s, e) => { this.ClinicallyVerify_formViewerCloseEventhandler(s, e); };
      this.clinicallyVerifyVM.OnFinishMaxPrescribeDisable = (s, e) => { this.DisableLHSTabs(s, e); };
      this.clinicallyVerifyVM.EnableDisableSupplyInstructionEvent = (s, e) => { this.DefaultEnableDisableSupplyInstruction(s, e); };
      //this.oVM = super.DataContext;
    }
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
  clinicallyVerifyVM_GetProfileDataCompeletedEvent(): void {
    if (
      ProfileData.AdditionalPrescConfig != null &&
      ProfileData.AdditionalPrescConfig.RecManforIP == true &&
      PatientContext.PrescriptionType == PrescriptionTypes.ForAdministration
    ) {
      this.cmdReconcile.IsEnabled = true;
      if (this.cmdReconcile.IsEnabled == true)
        this.clinicallyVerifyVM.ReconcileforIP = true;
    }
    this.SetGridConfig();
  }
  ClinicallyVerify_formViewerCloseEventhandler(
    oAppDialogResult: AppDialogResult,
    e
  ): void {
    this.grdResolve.UnselectAll();
    this.ClearCheckboxSelection();
    this.EnableDisableLinks(true, false, false, false, false, false);
    this.grdResolve.Rebind();
    this.DefaultEnableDisableSupplyInstruction();
    if (this.objProcessingItemVM != null) {
      this.objProcessingItemVM.bFormViewerLoadOnCVUnCheck = false;
    }
    if (
      oAppDialogResult == AppDialogResult.Close ||
      oAppDialogResult == AppDialogResult.Cancel
    ) {
      if (
        this.objProcessingItemVM != null &&
        this.objProcessingItemVM.FormViewerDetails != null &&
        this.objProcessingItemVM.FormViewerDetails.BasicDetails != null &&
        this.objProcessingItemVM.PrescriptionItemStatus ==
        CConstants.CLINICALLYVERIFIED
      )
        this.objProcessingItemVM.FormViewerDetails.BasicDetails.IsClinicallyVerified =
          true;
    }
  }
  ClinicallyVerify_ReBindResolveGridEvent(
    IsRepositionDrug: boolean,
    objNewItem: PrescriptionItemVM,
    _index: number = 0,
    sFrom: string = null
  ): void {
    if (this.clinicallyVerifyVM != null) {
      this.clinicallyVerifyVM.RefreshDCAlertIcon(false);
    }
    this.ReevaluateRHSPipe(objNewItem);
    if (!String.IsNullOrEmpty(sFrom) && String.Equals(sFrom, 'HeaderUpdate')) {
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
      this.grdResolve.Rebind();
      if (
        !IsActionConflictUpdate &&
        this.clinicallyVerifyVM != null &&
        this.clinicallyVerifyVM.MedsResolve != null &&
        this.clinicallyVerifyVM.MedsResolve.Count > 0
      ) {
        if (objNewItem != null) {
          if (IsRepositionDrug) {
            if (_index.HasValue && _index.Value > 0) {
              this.grdResolve.ScrollIntoView(
                this.clinicallyVerifyVM.MedsResolve[_index.Value]
              );
            } else {
              let oIndexOfItemVM = this.clinicallyVerifyVM.MedsResolve.Where(
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
                  this.clinicallyVerifyVM.MedsResolve.IndexOf(oIndexOfItemVM);
                if (index > -1) {
                  this.grdResolve.ScrollIntoView(
                    this.clinicallyVerifyVM.MedsResolve[index]
                  );
                }
              }
            }
          } else {
            this.grdResolve.ScrollIntoView(
              this.clinicallyVerifyVM.MedsResolve[0]
            );
          }
        } else {
          this.grdResolve.ScrollIntoView(
            this.clinicallyVerifyVM.MedsResolve[0]
          );
        }
      }
      this.DefaultEnableDisableSupplyInstruction();
    }
  }
  private cmdOnbehalfOf_Closed(args: AppDialogEventargs): void {
    let bdialogresult: boolean = false;
    this.objmedonbehalfofChild = args.Content.Component;
    // ObjectHelper.stopFinishAndCancelEvent(false);
    if (args.Result == AppDialogResult.Ok) {
      // To Be Re-Visited
      bdialogresult = this.objmedonbehalfofChild.OKButtonClick();
      if (bdialogresult && this.objmedonbehalfofChild != null && this.grdResolve.SelectedItems != null && this.grdResolve.SelectedItems.Count > 0) {
        this.grdResolve.SelectedItems.forEach((oSelectedItem) => {
          if (!oSelectedItem.IsFormViewDataLoaded && oSelectedItem.PrescriptionItemOID == 0) {
            oSelectedItem.GetPresItemDetails();
            oSelectedItem.IsFormViewDataLoaded = true;
          }
          oSelectedItem.OnBehalfOf = ObjectHelper.CreateObject(new CListItem(), {
            DisplayText: this.objmedonbehalfofChild.SFSOnBehalfOf.SelectedText,
            Value: this.objmedonbehalfofChild.SFSOnBehalfOf.SelectedValue
          });
          let oSelectedValue: CListItem = new CListItem();
          if (this.objmedonbehalfofChild.cboReason != null && this.objmedonbehalfofChild.cboReason.SelectedItem != null) {
            oSelectedValue = ObjectHelper.CreateType<CListItem>(this.objmedonbehalfofChild.cboReason.SelectedItem, CListItem);
            oSelectedItem.OnBehalfOfReason = ObjectHelper.CreateObject(new CListItem(), {
              DisplayText: oSelectedValue.DisplayText,
              Value: oSelectedValue.Value
            });
          }
          else {
            oSelectedItem.OnBehalfOfReason = null;
          }
          if (this.objmedonbehalfofChild.cboCommunicationMode != null && this.objmedonbehalfofChild.cboCommunicationMode.SelectedItem != null) {
            oSelectedValue = ObjectHelper.CreateType<CListItem>(this.objmedonbehalfofChild.cboCommunicationMode.SelectedItem, CListItem);
            oSelectedItem.CommunicationMode = ObjectHelper.CreateObject(new CListItem(), {
              DisplayText: oSelectedValue.DisplayText,
              Value: oSelectedValue.Value
            });
          }
          else {
            oSelectedItem.CommunicationMode = null;
          }
        });
        this.objmedonbehalfofChild.appDialog.DialogResult = bdialogresult;
      }
    }
    else if (args.Result == AppDialogResult.Cancel && this.objmedonbehalfofChild != null) {
      this.objmedonbehalfofChild.CancelButtonClick();
    }
  }
  public cmdLinks_Click(sender: Object, e: RoutedEventArgs): void {
    let objProcessingItemVM: PrescriptionItemVM =
      ObjectHelper.CreateType<PrescriptionItemVM>(
        this.grdResolve.SelectedItem,
        PrescriptionItemVM
      );
    if (this.grdResolve.GetSelectedRowCount() > 1) {
      this.grdResolve.SelectedItems.forEach((objItemVM) => {
        let oItmVM: PrescriptionItemVM =
          ObjectHelper.CreateType<PrescriptionItemVM>(
            objItemVM,
            PrescriptionItemVM
          );
        if (oItmVM != null && !oItmVM.IsGroupHeader) {
          objProcessingItemVM = oItmVM;
        }
      });
    }
    if (
      objProcessingItemVM != null &&
      objProcessingItemVM.FormViewerDetails != null &&
      objProcessingItemVM.FormViewerDetails.BasicDetails != null
    ) {
      let objMonoGraphVM: MonoGraphVM = new MonoGraphVM();
      let MCIItemCount: number = 0;
      let MCIIdentifyingOID: number = 0;
      let MCIIdentifyingType: string;
      let MCIIdentifyingName: string;
      let MonographParams: ObservableCollection<CListItem> =
        new ObservableCollection<CListItem>();
      if (
        String.Compare(
          objProcessingItemVM.FormViewerDetails.BasicDetails.itemSubType,
          CConstants.SUBTYPE
        ) == 0
      ) {
        if (
          String.Compare(
            objProcessingItemVM.LorenzoID,
            CommonFlags.MClorenzoid,
            StringComparison.OrdinalIgnoreCase
          ) == 0
        ) {
          MCIIdentifyingOID =
            objProcessingItemVM.FormViewerDetails.BasicDetails.IdentifyingOID;
          MCIIdentifyingType =
            objProcessingItemVM.FormViewerDetails.BasicDetails.IdentifyingType;
          let MonographParamDet: CListItem = new CListItem();
          //Check
          // MonographParamDet.DisplayText = CConstants.NOTANPREDEFMCI;
          MonographParamDet.Value = Convert.ToString(MCIIdentifyingOID);
          MonographParamDet.Tag = MCIIdentifyingType;
          MonographParams.Add(MonographParamDet);
        } else {
          MCIIdentifyingOID =
            objProcessingItemVM.FormViewerDetails.BasicDetails.IdentifyingOID;
          MCIIdentifyingType =
            objProcessingItemVM.FormViewerDetails.BasicDetails.IdentifyingType;
          MCIIdentifyingName =
            objProcessingItemVM.FormViewerDetails.BasicDetails
              .SIdentifyingoriginalname;
          if (
            MCIIdentifyingOID > 0 &&
            !String.IsNullOrEmpty(MCIIdentifyingType) &&
            !String.IsNullOrEmpty(MCIIdentifyingName)
          ) {
            let MonographParamDet: CListItem = new CListItem();
            MonographParamDet.DisplayText = MCIIdentifyingName;
            MonographParamDet.Value = Convert.ToString(MCIIdentifyingOID);
            MonographParamDet.Tag = MCIIdentifyingType;
            MonographParams.Add(MonographParamDet);
          }
        }
        if (
          objProcessingItemVM.FormViewerDetails.MulticomponentDetails != null &&
          objProcessingItemVM.FormViewerDetails.MulticomponentDetails
            .oMCItemBasicInfo != null
        ) {
          MCIItemCount =
            objProcessingItemVM.FormViewerDetails.MulticomponentDetails
              .oMCItemBasicInfo.Count;
          if (MCIItemCount > 0) {
            for (let iCnt: number = 0; iCnt < MCIItemCount; iCnt++) {
              MCIIdentifyingOID =
                objProcessingItemVM.FormViewerDetails.MulticomponentDetails
                  .oMCItemBasicInfo[iCnt].IdentifyingOID;
              MCIIdentifyingType =
                objProcessingItemVM.FormViewerDetails.MulticomponentDetails
                  .oMCItemBasicInfo[iCnt].IdentifyingType;
              MCIIdentifyingName =
                objProcessingItemVM.FormViewerDetails.MulticomponentDetails
                  .oMCItemBasicInfo[iCnt].ComponentName;
              if (
                MCIIdentifyingOID > 0 &&
                !String.IsNullOrEmpty(MCIIdentifyingType) &&
                !String.IsNullOrEmpty(MCIIdentifyingName)
              ) {
                let MonographParamDet: CListItem = new CListItem();
                MonographParamDet.DisplayText = MCIIdentifyingName;
                MonographParamDet.Value = Convert.ToString(MCIIdentifyingOID);
                MonographParamDet.Tag = MCIIdentifyingType;
                MonographParams.Add(MonographParamDet);
              }
            }
          }
        } else if (objProcessingItemVM.MCChilditem != null) {
          let MultiCOmpChilds: string[] = objProcessingItemVM.MCChilditem.Split(
            CConstants.MULTICOMPONENT_SPLIT
          );
          let MultiCompChildsCount: number = 0;
          if (MultiCOmpChilds != null) {
            MultiCompChildsCount = MultiCOmpChilds.length;
            if (MultiCompChildsCount > 0) {
              for (let iCnt: number = 0; iCnt < MultiCompChildsCount; iCnt++) {
                let MultiCOmpChildsDet: string[] = MultiCOmpChilds[iCnt].Split(
                  CConstants.MULTIROUTE_ROUTE
                );
                let MultiCompChildsDetCount: number = 0;
                if (MultiCOmpChildsDet != null) {
                  MultiCompChildsDetCount = MultiCOmpChildsDet.length;
                  if (MultiCompChildsDetCount > 0) {
                    if (
                      !String.IsNullOrEmpty(MultiCOmpChildsDet[0]) &&
                      !String.IsNullOrEmpty(MultiCOmpChildsDet[1]) &&
                      !String.IsNullOrEmpty(MultiCOmpChildsDet[2])
                    ) {
                      MCIIdentifyingOID = Convert.ToInt64(
                        MultiCOmpChildsDet[0]
                      );
                      MCIIdentifyingType = MultiCOmpChildsDet[1];
                      MCIIdentifyingName = MultiCOmpChildsDet[2];
                      if (MCIIdentifyingOID > 0) {
                        let MonographParamDet: CListItem = new CListItem();
                        MonographParamDet.DisplayText = MCIIdentifyingName;
                        MonographParamDet.Value =
                          Convert.ToString(MCIIdentifyingOID);
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
      } else {
        MCIIdentifyingOID =
          objProcessingItemVM.FormViewerDetails.BasicDetails.IdentifyingOID;
        MCIIdentifyingType =
          objProcessingItemVM.FormViewerDetails.BasicDetails.IdentifyingType;
        MCIIdentifyingName =
          objProcessingItemVM.FormViewerDetails.BasicDetails.IdentifyingName;
        if (
          MCIIdentifyingOID > 0 &&
          !String.IsNullOrEmpty(MCIIdentifyingType) &&
          !String.IsNullOrEmpty(MCIIdentifyingName)
        ) {
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
        this.oResultVM = new RequestandResultVM(oResultInput);
        this.oResultVM.CheckResultAssociationCompletedEvent = (s, e) => {
          this.oResultVM_CheckResultAssociationCompletedEvent(s, e);
        };
        this.oResultVM.CheckResultAssociation();
      }
    }
  }
  oResultVM_CheckResultAssociationCompletedEvent(
    sender: Object,
    IsResultAssociated: boolean
  ): void {
    if (IsResultAssociated) {
      // To Be Re-Visited
      // this.objResults = new medrecentresultschild(ObjectHelper.CreateType<RequestandResultVM>(sender, RequestandResultVM));
      // AppActivity.OpenWindow((ObjectHelper.CreateType<RequestandResultVM>(sender, RequestandResultVM)).ResultsTitle, this.objResults, RecentResults_Closed, "See full results for more details", true, 480, 640, true, WindowButtonType.Close, null);
    }
  }
  RecentResults_Closed(args: AppDialogEventargs): void {
    // To Be Re-Visited
    // this.objResults.appDialog.DialogResult = true;
  }
  private cmdDoseCalculator_Click(sender: Object, e: RoutedEventArgs): void {
    let oItem: PrescriptionItemVM = ObjectHelper.CreateType<PrescriptionItemVM>(
      this.grdResolve.SelectedItem,
      PrescriptionItemVM
    );
    if (!oItem.IsFormViewDataLoaded) {
      oItem.GetPresItemDetails();
      oItem.IsFormViewDataLoaded = true;
    }
    this.grdResolve.Rebind();
  }
  public iCheckBox1_KeyDown_Func(sender: Object, e: KeyEventArgs): void {
    if (e.PlatformKeyCode == 13) {
      this.iCheckBox1.IsChecked = !this.iCheckBox1.IsChecked;
    }
  }
  public iCheckBox2_KeyDown_Func(sender: Object, e: KeyEventArgs): void {
    if (e.PlatformKeyCode == 13) {
      this.iCheckBox2.IsChecked = !this.iCheckBox2.IsChecked;
    }
  }
  public chckClinicalVerify_KeyDown_Func(
    sender: Object,
    e: KeyEventArgs
  ): void {
    if (e.PlatformKeyCode == 13) {
      let chckClinicalVerify: iCheckBox = <iCheckBox>(
        this.grdResolve.FindName('chckClinicalVerify')
      );
      chckClinicalVerify.IsChecked = !chckClinicalVerify.IsChecked;
    }
  }
  objServiceProxy_IsDeactivatedAttributeExistsCompleted(
    sender: Object,
    e: IPPMAManagePrescSer.IsDeactivatedAttributeExistsCompletedEventArgs
  ): void {
    let objResponse: IPPMAManagePrescSer.CResMsgIsDeactivatedAttributeExists =
      e.Result;
    if (
      objResponse != null &&
      objResponse.oIPPResDeactAttributes != null &&
      objResponse.oIPPResDeactAttributes.DeactAttributeStatus
    ) {
      this.Launchformviewer(this.objProcessingItemVM);
    }
  }
  private DisposeFormObjects(): void {
    if (
      this.clinicallyVerifyVM != null &&
      this.clinicallyVerifyVM.MedsResolve != null &&
      (this.clinicallyVerifyVM.IsFinish || this.clinicallyVerifyVM.IsFinishNow)
    ) {
      this.clinicallyVerifyVM.MedsResolve.forEach((pVM) => {
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
        }
      });
      Common.LHSiTab = null;
      Common.oIPPMABaseVM = null;
      Common.ConceptCodes = null;
    }
    this.oItemVM = null;
    this.clinicallyVerifyVM = null;
    this.oResultVM = null;
  }
  private DisposeFormEvents(): void {
    // this.clinicallyVerifyVM.GetProfileDataCompeletedEvent -= clinicallyVerifyVM_GetProfileDataCompeletedEvent;
    if (this.oItemVM != null) {
      // this.oItemVM.CancelDiscontinueRebindDelegateEvent -= oItemVM_CancelDiscontinueRebindDelegateEvent;
      // if (this.oItemVM.objItems != null && (this.clinicallyVerifyVM.IsFinish || this.clinicallyVerifyVM.IsFinishNow)) {
      //     this.oItemVM.objItems.forEach((pVM) => {
      //         if (pVM != null) {
      //             pVM.CancelDiscontinueRebindDelegateEvent -= oItemVM_CancelDiscontinueRebindDelegateEvent;
      //             if (pVM._ImageConflicktClicked != null) {
      //                 pVM._ImageConflicktClicked.MouseLeftButtonUp -= pVM.Conflict_MouseLeftButtonUp;
      //             }
      //             if (pVM._ImageReviewIconClicked != null) {
      //                 pVM._ImageReviewIconClicked.MouseLeftButtonUp -= pVM.FormViewer_MouseLeftButtonUp;
      //             }
      //             if (pVM._ImageFormviewerClicked != null) {
      //                 pVM._ImageFormviewerClicked.MouseLeftButtonUp -= pVM.FormViewer_MouseLeftButtonUp;
      //             }
      //             if (pVM._ImageSteppedDoseClicked != null) {
      //                 pVM._ImageSteppedDoseClicked.MouseLeftButtonUp -= pVM.imgSteppedVariable_MouseLeftButtonUp;
      //             }
      //             if (pVM._ImageWithoutNameClicked != null) {
      //                 pVM._ImageWithoutNameClicked.MouseLeftButtonUp -= pVM.FormViewer_MouseLeftButtonUp;
      //             }
      //             if (pVM._ImageConfictIconClickedFromCV != null) {
      //                 pVM._ImageConfictIconClickedFromCV.MouseLeftButtonUp -= pVM.InformationIcon_MouseLeftButtonUp;
      //             }
      //             pVM._ImageConflicktClicked = null;
      //             pVM._ImageReviewIconClicked = null;
      //             pVM._ImageFormviewerClicked = null;
      //             pVM._ImageSteppedDoseClicked = null;
      //             pVM._ImageWithoutNameClicked = null;
      //             pVM._ImageConfictIconClickedFromCV = null;
      //         }
      //     });
      // }
      this.oItemVM.DoCleanUP();
      if (
        this.grdResolve != null &&
        this.grdResolve.Rows != null &&
        this.grdResolve.Rows.Count > 0 &&
        this.clinicallyVerifyVM != null &&
        (this.clinicallyVerifyVM.IsFinish ||
          this.clinicallyVerifyVM.IsFinishNow)
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
    // To be Re-Visited
    // if (this.discanc != null) {
    //     this.discanc.OnAllergyClosedEvent -= discanc_OnAllergyClosedEvent;
    // }
    // this.clinicallyVerifyVM.GetProfileDataCompeletedEvent -= clinicallyVerifyVM_GetProfileDataCompeletedEvent;
    // this.clinicallyVerifyVM.ReBindResolveGridEvent -= ClinicallyVerify_ReBindResolveGridEvent;
    // this.clinicallyVerifyVM.formViewerCloseEventhandler -= ClinicallyVerify_formViewerCloseEventhandler;
    if (this.oResultVM != null) {
      // this.oResultVM.CheckResultAssociationCompletedEvent -= oResultVM_CheckResultAssociationCompletedEvent;
    }
    // this.clinicallyVerifyVM.EnableDisableSupplyInstructionEvent -= DefaultEnableDisableSupplyInstruction;
    // this.clinicallyVerifyVM.PropertyChanged -= obj_PropertyChanged;
    // this.clinicallyVerifyVM.OnFinishMaxPrescribeDisable -= DisableLHSTabs;
    // if (this.clinicallyVerifyVM.MedsResolve != null && (this.clinicallyVerifyVM.IsFinish || this.clinicallyVerifyVM.IsFinishNow)) {
    //     this.clinicallyVerifyVM.MedsResolve.forEach((pVM) => {
    //         if (pVM != null) {
    //             pVM.CancelDiscontinueRebindDelegateEvent -= oItemVM_CancelDiscontinueRebindDelegateEvent;
    //             if (pVM._ImageConflicktClicked != null) {
    //                 pVM._ImageConflicktClicked.MouseLeftButtonUp -= pVM.Conflict_MouseLeftButtonUp;
    //             }
    //             if (pVM._ImageReviewIconClicked != null) {
    //                 pVM._ImageReviewIconClicked.MouseLeftButtonUp -= pVM.FormViewer_MouseLeftButtonUp;
    //             }
    //             if (pVM._ImageFormviewerClicked != null) {
    //                 pVM._ImageFormviewerClicked.MouseLeftButtonUp -= pVM.FormViewer_MouseLeftButtonUp;
    //             }
    //             if (pVM._ImageSteppedDoseClicked != null) {
    //                 pVM._ImageSteppedDoseClicked.MouseLeftButtonUp -= pVM.imgSteppedVariable_MouseLeftButtonUp;
    //             }
    //             if (pVM._ImageWithoutNameClicked != null) {
    //                 pVM._ImageWithoutNameClicked.MouseLeftButtonUp -= pVM.FormViewer_MouseLeftButtonUp;
    //             }
    //             if (pVM._ImageConfictIconClickedFromCV != null) {
    //                 pVM._ImageConfictIconClickedFromCV.MouseLeftButtonUp -= pVM.InformationIcon_MouseLeftButtonUp;
    //             }
    //             pVM._ImageConflicktClicked = null;
    //             pVM._ImageReviewIconClicked = null;
    //             pVM._ImageFormviewerClicked = null;
    //             pVM._ImageSteppedDoseClicked = null;
    //             pVM._ImageWithoutNameClicked = null;
    //             pVM._ImageConfictIconClickedFromCV = null;
    //         }
    //     });
    // }
    // this.clinicallyVerifyVM.DoCleanUP();
  }
  private AppActivityBB_Unloaded(sender: Object, e: RoutedEventArgs): void {
    if (this.clinicallyVerifyVM != null) {
      if (this.msgBoxConflicts != null) {
        this.msgBoxConflicts.Close();
      }
      if (this.msgBoxCancelledDiscontinue != null) {
        this.msgBoxCancelledDiscontinue.Close();
      }
      if (this.msgBoxDeactivate != null) {
        this.msgBoxDeactivate.Close();
      }
      // this.clinicallyVerifyVM.GetProfileDataCompeletedEvent -= clinicallyVerifyVM_GetProfileDataCompeletedEvent;
      this.DisposeFormEvents();
      this.DisposeFormObjects();
      this.iCheckBox1 = null;
      this.iCheckBox2 = null;
      this.dataGridRow = null;
      this.lblDisplayText = null;
      // this.lblDisplayTxt = null;
      // this.lblDisplayValue = null;
      // this.lblMedClkSrc = null;
      // this.lblPrescriptionStatusDisplayText = null;
      // this.cmdSupplyInstruction = null;
      // this.cmdDispensingInstr = null;
      // this.InnerGrid = null;
      // this.checkgrid = null;
      // this.cmdMedClkSrc = null;
      // this.cmdMedClkSrc = null;
      this.iTab1 = null;
      this.msgBoxConflicts = null;
      this.cmdOtherLinks = null;
      this.cmdReconcile = null;
      this.cmdOnbehalfOf = null;
      this.cmdLinks = null;
      this.cmdObservationResults = null;
      this.cmdDiscontinueCancel = null;
      this.cmdRemove = null;
      this.cmdMedAdmin = null;
      if (this.grdResolve != null) {
        if (this.grdResolve.Rows != null) {
          this.grdResolve.Rows.Clear();
        }
        if (this.grdResolve.Columns != null) {
          this.grdResolve.Columns.Clear();
        }
        this.grdResolve = null;
      }
      if (this.LayoutRoot != null && this.LayoutRoot.Children != null) {
        this.LayoutRoot.Children.Clear();
      }
      // GC.Collect();
      // GC.WaitForPendingFinalizers();
    }
  }
  private cmdTechValidate_Click(sender: Object, e: RoutedEventArgs): void {
    this.LaunchTechvalidateCareActivity(
      PatientContext.EncounterOid.ToString(),
      PatientContext.EncounterType
    );
  }
  public LaunchTechvalidateCareActivity(
    EncounterOid: string,
    EncounterType: string
  ): void {
    let sMenuCode: string = String.Empty;
    let CACode: string = String.Empty;
    CACode = 'MN_MED_VERIFY_SL_P2';
    sMenuCode = 'MN_MED_VALIDATE_S_P2';
    let sQuery: string = '&MenuCode=' + sMenuCode;
    sQuery += '&PATIENTOID=' + PatientContext.PatientOID;
    sQuery += '&EncounterOID=' + EncounterOid;
    sQuery += '&ENCTYPE=' + EncounterType;
    sQuery += '&PRESCRIPTIONOID=' + ContextManager.Instance['PRESCRIPTIONOID'];
    sQuery += '&TECHVALID=No';
    sQuery += '&PrescType=' + PatientContext.PrescriptionType;
    sQuery += '&LaunchFrom=' + CACode;
    sQuery += '&PrescriberID=' + ContextManager.Instance['PrescriberID'];
    sQuery +=
      '&PrescriptionNumber=' + ContextManager.Instance['PrescriptionNumber'];
    sQuery += '&CrctPatientOID=' + ContextManager.Instance['CrctPatientOID'];
    sQuery += '&StationeryTypeOID=' + this.sStationeryTypeOID;
    sQuery += '&StationeryTypeName=' + this.sStationeryTypeName;
    sQuery += '&StationeryTypeCode=' + this.sStationeryTypeCode;
    sQuery += '&ChoosePrinter=' + '';
    sQuery += '&PrescItemCDs=' + '';
    this.clinicallyVerifyVM = ObjectHelper.CreateType<ClinicallyVerifyVM>(
      this.DataContext,
      ClinicallyVerifyVM
    );
    let bIsLocked: boolean = false;
    this.CheckPessimisticLock(bIsLocked);
    if (!bIsLocked) {
      let sLockKeyCode: string =
        MedicationCommonBB.FetchKeyCodeForCA(sMenuCode);
      if (!String.IsNullOrEmpty(sLockKeyCode)) {
        //check
        // let sResult: string = ObjectHelper.CreateType<string>(HtmlPage.Window.Invoke("CreatePessimisticLock", EncounterOid, sLockKeyCode, CConstants.LockDuration), String);
      }
      this.clinicallyVerifyVM.sLastCACode = sMenuCode;
      // this.clinicallyVerifyVM.PropertyChanged -= obj_PropertyChanged;
      this.clinicallyVerifyVM.PropertyChanged = (s, e) => {
        this.obj_PropertyChanged(s, e);
      };
      this.clinicallyVerifyVM.LaunchWizard(sMenuCode, sQuery);
    }
  }
  private CheckPessimisticLock(IsLock: boolean): void {
    IsLock = false;
    let sLockingCA: string = String.Empty;
    let sLockedUserName: string = String.Empty;
    let sLockingMessage: string = String.Empty;
    let sEntityName: string = String.Empty;
    sEntityName = 'MN_MED_VALIDATE_S_P2';
    let _LockedUserDetails: LockedUsersDetails;
    let IsLocked: boolean = MedicationCommonBB.IsLockedByAnotherUser(
      sEntityName,
      true,
      (o) => {
        _LockedUserDetails = o;
      }
    );
    if (_LockedUserDetails != null) {
      if (!String.IsNullOrEmpty(_LockedUserDetails.LockedUserName))
        sLockedUserName = _LockedUserDetails.LockedUserName;
      if (!String.IsNullOrEmpty(_LockedUserDetails.ActivityLock))
        sLockingCA = _LockedUserDetails.ActivityLock;
    }
    if (
      !String.IsNullOrEmpty(sLockedUserName) &&
      !String.IsNullOrEmpty(sLockingCA)
    ) {
      if (IsLocked) {
        IsLock = true;
        sLockingMessage =
          Resource.MedicationForm.LockingMessagePartOne +
          sLockedUserName +
          Resource.MedicationForm.LockingMessagePartTwo;
        let msg: iMessageBox = new iMessageBox();
        msg.Title = 'Lorenzo';
        msg.MessageButton = MessageBoxButton.OK;
        msg.Message = sLockingMessage;
        msg.Show();
      }
    }
  }
  obj_PropertyChanged(sender: Object, e: PropertyChangedEventArgs): void {
    let sResult: string = String.Empty;
    if (e.PropertyName == 'CliniverifyClosed') {
      // sResult = ObjectHelper.CreateType<string>(HtmlPage.Window.Invoke("DeactivatePessimisticLock", PatientContext.PrescriptionItemOID, "PRESCRIPTION", CConstants.LockDuration), String);
    } else if (e.PropertyName == 'CliniverifyClosedCancel') {
      // sResult = ObjectHelper.CreateType<string>(HtmlPage.Window.Invoke("DeactivatePessimisticLock", PatientContext.PrescriptionItemOID, "PRESCRIPTION", CConstants.LockDuration), String);
    }
  }
  public FormviewerIcon_MouseLeftButtonUp(
    sender: Object,
    e: MouseButtonEventArgs
  ): void {
    if (CommonVariables.FormViewerIsInProgress) {
      Common.ShowBusyAlert();
      return;
    }
    this.objProcessingItemVM = ObjectHelper.CreateType<PrescriptionItemVM>(
      sender,
      PrescriptionItemVM
    );
    Busyindicator.SetStatusBusy('FormViewer');
    this.objProcessingItemVM.bFormViewerLoadOnCVUnCheck = true;
    this.objProcessingItemVM.IsConflictClick = false;
    this.Launchformviewer(this.objProcessingItemVM);
    if (this.objProcessingItemVM != null){
      ObjectHelper.stopFinishAndCancelEvent(true);
      this.clinicallyVerifyVM.GetDrugBasicSnomedcodeInfo(
        ActivityTypes.Amend,
        this.objProcessingItemVM.PrescriptionItemOID
      );
    }
    else Busyindicator.SetStatusIdle('FormViewerMsgClick');
  }

  Rx_MouseLeftButtonUp_Func = (s, e) => {
    this.Rx_MouseLeftButtonUp(s, e);
  };

  public Rx_MouseLeftButtonUp(sender: Object, e: MouseButtonEventArgs): void {
    this.objProcessingItemVM = ObjectHelper.CreateType<PrescriptionItemVM>(
      (<FrameworkElement>sender).DataContext,
      PrescriptionItemVM
    );
    if (this.objProcessingItemVM instanceof PrescriptionItemVM) {
      // this.ddetChild = new Medication.IPPMA.Common.medddetailsChild();
      this.ddetChild = new medddetailsChild();
      this.ddetChild.MedDetailsUserControl.PrescriptionItemOID =
        this.objProcessingItemVM.PrescriptionItemOID;
      this.ddetChild.MedDetailsUserControl.MCVersion =
        this.objProcessingItemVM.FormViewerDetails.BasicDetails.MCVersion;
      this.ddetChild.MedDetailsUserControl.ServiceOID = MedChartData.ServiceOID;
      this.ddetChild.MedDetailsUserControl.LocationOID =
        MedChartData.LocationOID;
      this.ddetChild.MedDetailsUserControl.oLaunchFrom =
        SVIconLaunchFrom.PrescribeRHS;
      this.ddetChild.MedDetailsUserControl.DoseCalcExist =
        this.objProcessingItemVM.FormViewerDetails.BasicDetails.DoseCalcExist;
      let sDrugTitle: string = String.Empty;
      if (
        this.objProcessingItemVM.FormViewerDetails != null &&
        this.objProcessingItemVM.FormViewerDetails.BasicDetails != null
      )
        sDrugTitle =
          this.objProcessingItemVM.FormViewerDetails.BasicDetails
            .IdentifyingName;
      // ObjectHelper.stopFinishAndCancelEvent(true);
      AppActivity.OpenWindow(
        sDrugTitle,
        this.ddetChild,
        this.ddetChild_Closed,
        '',
        false,
        650,
        930,
        false,
        WindowButtonType.Close,
        null
      );
    }
    if (this.objProcessingItemVM != null)
      this.clinicallyVerifyVM.GetDrugBasicSnomedcodeInfo(
        ActivityTypes.Amend,
        this.objProcessingItemVM.PrescriptionItemOID
      );
    else Busyindicator.SetStatusIdle('FormViewerMsgClick');
  }

  ClinicallyVerifychk_Click(sender: Object, e: RoutedEventArgs): void {
    ObjectHelper.stopFinishAndCancelEvent(true);
    if (
      String.Equals(
        ContextInfo.MenuCode,
        CConstants.ClinicallyVerifyMenuCode,
        StringComparison.InvariantCultureIgnoreCase
      )
    ) {
      this.objProcessingItemVM = ObjectHelper.CreateType<PrescriptionItemVM>(
        sender,
        PrescriptionItemVM
      );
      let IdentifyingOID: number = 0;
      let MCVersion: string = String.Empty;
      if (
        this.objProcessingItemVM != null &&
        this.objProcessingItemVM.FormViewerDetails != null &&
        this.objProcessingItemVM.FormViewerDetails.BasicDetails != null &&
        !this.objProcessingItemVM.FormViewerDetails.BasicDetails
          .IsPromptDeactivatedMsg &&
        !this.objProcessingItemVM.FormViewerDetails.BasicDetails
          .IsClinicallyVerified
      ) {
        if (
          this.objProcessingItemVM != null &&
          this.objProcessingItemVM.FormViewerDetails != null &&
          this.objProcessingItemVM.FormViewerDetails.BasicDetails != null
        ) {
          IdentifyingOID = this.objProcessingItemVM.PrescriptionItemOID;
          MCVersion = String.IsNullOrEmpty(
            this.objProcessingItemVM.FormViewerDetails.BasicDetails.MCVersion
          )
            ? AppSessionInfo.AMCV
            : this.objProcessingItemVM.FormViewerDetails.BasicDetails.MCVersion;
        }
        let objServiceProxy: IPPMAManagePrescSer.IPPMAManagePrescriptionWSSoapClient =
          new IPPMAManagePrescSer.IPPMAManagePrescriptionWSSoapClient();
        objServiceProxy.IsDeactivatedAttributeExistsCompleted = (s, e) => {
          this.objServiceProxy_IsDeactivatedAttributeExistsCompleted(s, e);
        };
        let objReqDeactAttributes: IPPMAManagePrescSer.CReqMsgIsDeactivatedAttributeExists =
          new IPPMAManagePrescSer.CReqMsgIsDeactivatedAttributeExists();
        objReqDeactAttributes.oIPPReqDeactAttributesBC =
          new IPPMAManagePrescSer.IPPReqDeactAttributes();
        objReqDeactAttributes.oIPPReqDeactAttributesBC.PrescriptionItemOID =
          IdentifyingOID;
        objReqDeactAttributes.oIPPReqDeactAttributesBC.PatientOID =
          PatientContext.PatientOID;
        objReqDeactAttributes.oIPPReqDeactAttributesBC.MCVersionNo = MCVersion;
        objReqDeactAttributes.oContextInformation = Common.FillContext();
        objServiceProxy.IsDeactivatedAttributeExistsAsync(
          objReqDeactAttributes
        );
      }
      if (this.objProcessingItemVM != null)
        this.clinicallyVerifyVM.GetDrugBasicSnomedcodeInfo(
          ActivityTypes.Amend,
          this.objProcessingItemVM.PrescriptionItemOID
        );
      else Busyindicator.SetStatusIdle('FormViewerMsgClick');
      setTimeout(() => {
        ObjectHelper.stopFinishAndCancelEvent(false);
      }, 500);
    }
  }
  public GetSupplyDispenseDetail(lstPresItemOIDs: List<number>): void {
    let oReq: IPPMAManagePrescSer.CReqMsgGetSupplyDispenseDetail =
      new IPPMAManagePrescSer.CReqMsgGetSupplyDispenseDetail();
    oReq.oContextInformation = Common.FillContext();
    oReq.lnPatientoidBC = PatientContext.PatientOID;
    oReq.PrescriptionItemOIDsBC = String.Join(',', lstPresItemOIDs.ToArray());
    //check
    let objServiceProxy: IPPMAManagePrescSer.IPPMAManagePrescriptionWSSoapClient = new IPPMAManagePrescSer.IPPMAManagePrescriptionWSSoapClient();//BindingObject.GetBasicHttpBindingObject(), new System.ServiceModel.EndpointAddress(WebServiceURL.IPPMAManagePrescriptionWS
    objServiceProxy.GetSupplyDispenseDetailCompleted = (s, e) => { this.objServiceProxy_GetSupplyDispenseDetailCompleted(s, e); };
    objServiceProxy.GetSupplyDispenseDetailAsync(oReq);
  }
  public objServiceProxy_GetSupplyDispenseDetailCompleted(
    sender: Object,
    e: IPPMAManagePrescSer.GetSupplyDispenseDetailCompletedEventArgs
  ): void {
    if (e.Error == null) {
      let oRes: IPPMAManagePrescSer.CResMsgGetSupplyDispenseDetail = e.Result;
      if (
        oRes != null &&
        oRes.oMedDispensingDetail != null &&
        oRes.oMedDispensingDetail.Length > 0
      ) {
        let lstDispensePendingItems: List<string> = new List<string>();
        let sDrugName: string = String.Empty;
        for (let i: number = 0; i < oRes.oMedDispensingDetail.Length; i++) {
          let objMedDispDet: IPPMAManagePrescSer.MedDispensingDetail =
            oRes.oMedDispensingDetail[i];
          {
            sDrugName = !String.IsNullOrEmpty(objMedDispDet.DrugName)
              ? objMedDispDet.DrugName
              : String.Empty;
            if (
              !String.IsNullOrEmpty(objMedDispDet.LorenzoID) &&
              objMedDispDet.LorenzoID.Equals(
                CConstants.ADHOC_ITEM_LORENZOID,
                StringComparison.InvariantCultureIgnoreCase
              ) &&
              objMedDispDet.PrescribeStartDTTM != DateTime.MinValue
            ) {
              let IsDST: boolean, IsAmbiguous, IsInvalid;
              let sPresStartDTTM: string =
                objMedDispDet.PrescribeStartDTTM.ConvertToUser(
                  (o1) => {
                    IsDST = o1;
                  },
                  (o2) => {
                    IsAmbiguous = o2;
                  },
                  (o3) => {
                    IsInvalid = o3;
                  }
                ).ToDateTimeString(IsDST, IsAmbiguous, CConstants.DateHMFormat);
              sDrugName = sDrugName + '(' + sPresStartDTTM + ')';
            }
            lstDispensePendingItems.Add(sDrugName.Trim('\r', '\n'));
          }
        }
        this.clinicallyVerifyVM.lstDispensePendingItems =
          lstDispensePendingItems;
      }
    }
  }
  iCheckBox1_Checked(e) {
    this.oVM.IsDisCanChecked = e;
    this.UpdateLinksState();
    Busyindicator.SetStatusBusy1("colourchangeCancelled")
    setTimeout(() => {
      this.grdResolve.Rebind();
      Busyindicator.SetStatusIdle("colourchangeCancelled")
      this.changeDetectionRef.markForCheck();
    }, 3000);
  }
  iCheckBox2_Checked(e) {
    this.oVM.IsDisCompletedChecked = e;
    setTimeout(() => {
      this.changeDetectionRef.markForCheck();
    }, 2000);
    this.UpdateLinksState();
  }
  private ClearCheckboxSelection() {
    this.SelectCheckbox.forEach((checkbox: iCheckBox) => {
      checkbox.IsChecked = false;
    });
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
    if (e.TriggerSelectionChange) {
      this.grdResolve_SelectionChanged({}, {});
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
