import { iComboBox, iHyperlinkButton } from 'epma-platform/controls';
import { CellStyle } from 'src/app/shared/epma-platform/controls/epma-grid-helpers/cell-style.component';
import { ObjectHelper } from 'epma-platform/helper';
import {
  ChildWindow,
  HtmlPage,
  List,
  ObservableCollection,
  Visibility,
  StringComparison,
  StringSplitOptions,
  AppDialogEventargs,
  AppDialogResult,
} from 'epma-platform/models';
import * as ManagePrescSer from '../../shared/epma-platform/soap-client/ManagePrescriptionWS';
import * as IPPManagePrescSer from '../../shared/epma-platform/soap-client/IPPMAManagePrescriptionWS';
import {
  Convert,
  iMessageBox,
  MessageBoxButton,
  MessageBoxResult,
  MessageBoxType,
  MessageEventArgs,
  ProcessRTE,
  ScriptObject,
  StringBuilder,
} from 'epma-platform/services';
import { CListItem, RTEEventargs } from 'src/app/shared/epma-platform/models/model';
import { ActivityTypes } from '../model/common';
import { ProfileData } from '../utilities/profiledata';
import { Resource } from '../resource';
import { PrescriptionItemVM } from '../viewmodel/PrescriptionItemVM';
import { DomainValuesForTechValidate, FormviewerComboValues } from '../utilities/globalvariable';
import DateTime from 'epma-platform/DateTime';
import { Dictionary } from 'epma-platform/dictionary';
import { RoutedEventArgs } from 'src/app/shared/epma-platform/controls/FrameworkElement';
import { Common } from '../utilities/common';
import {
  Border,
  iButton,
  iCheckBox,
  iLabel,
  iTab,
  iTabItem,
  DataTemplate,
  FrameworkElement,
  UserControl,
  TextBlock,
  ToolTipService,
  iTextBox,
  MouseButtonEventArgs,
  FontStyles,
  FontWeights,
} from 'epma-platform/controls';
import {
  AfterViewInit,
  Component,
  DoCheck,
  Input,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { GridComponent } from '@progress/kendo-angular-grid';
import { SolidColorBrush } from 'src/app/shared/epma-platform/controls/Control';
import { Busyindicator } from 'src/app/lorappcommonbb/busyindicator';
import { Environment } from '../../product/shared/models/Common';
import { ChildWizardCloseEventargs } from 'src/app/shared/epma-platform/models/appdialog.type';
import { GridExtension as GridViewDataControl} from 'src/app/shared/epma-platform/controls/epma-grid-helpers/grid-extension';
import {
  GridExtension,
  GridViewCellClickEventArgs,
  GridViewCellEditEndedEventArgs,
  GridViewColumn,
  GridViewColumnCollection,
  GridViewRow,
  RowLoadedEventArgs,
  SelectionChangeEventArgs,
  GridViewLength, RowEventArgs
} from 'src/app/shared/epma-platform/controls/epma-grid-helpers/grid-extension';
import { ContextInfo, PatientContext } from 'src/app/lorappcommonbb/utilities/globalvariable';
import { CConstants, DoseTypeCode, MedImage, PrescriptionTypes, ValueDomain } from '../utilities/constants';
import { CommonBB } from 'src/app/lorappcommonbb/utilities/common';
import { MedicationCommonBB } from 'src/app/lorappmedicationcommonbb/utilities/medicationcommonbb';
import { TechValidateVM } from '../viewmodel/TechValidateVM';
import { SupplyDispensingInstructionsVM } from '../viewmodel/SupplyDispensingInstructionsVM';
import { CustomTechValidatedItem } from '../viewmodel/customtechvalidateditem';
import { DateChangedArgs, DateChangeEventArgs, iDateTimePicker } from 'src/app/shared/epma-platform/controls/epma-datetimepicker/epma-datetimepicker.component';
import { MedicationCommonProfileData } from 'src/app/lorappmedicationcommonbb/utilities/profiledata';
import { DisplayPrescriptionLineItem } from 'src/app/product/shared/convertor/medicationconverters.service';
import { FormViewerVM } from '../viewmodel/formviewervm';
import { BasicDetailsVM, InfusionVM } from '../viewmodel/BasicDetailsVM';
import { DrugItemBasicInfo, ObjectInfo } from '../../shared/epma-platform/soap-client/IPPMAManagePrescriptionWS';
import { MCommonBB } from 'src/app/lorappmedicationcommonbb/utilities/common';
import { LaunchWizard } from 'src/app/shared/epma-platform/models/launchwizard';
import * as _Styles from '../../shared/epma-platform/controls/ControlStyles';
import { medsupplydispensinginstructionstab } from './medsupplydispensinginstructionstab';
import { MultiSelectListWindow } from './multiSelectListWindow';
import { medsupplydispensinginstructions } from './medsupplydispensinginstructions';
import { medFormViewer } from './medformviewer';
import { CommonService } from 'src/app/product/shared/common.service';
//import { medFormViewer } from './medformviewer';

var that;

@Component({
  selector: 'medFrmviewtechvalidate',
  templateUrl: './medFrmviewtechvalidate.html',
  styleUrls: ['./medFrmviewtechvalidate.css'],
})
export class medFrmviewtechvalidate extends UserControl implements OnInit, AfterViewInit, OnDestroy {
  public TechValidate = Resource.TechValidate;
  //private omedformview:medFormViewer;
  private brcd1: Border;
  public Styles = _Styles;
  override _DataContext: PrescriptionItemVM;
  override get DataContext() {
    return this._DataContext;
  }
  @Input() override set DataContext(value: PrescriptionItemVM) {
    this._DataContext = value;
  }
  public BorderFrame: {
    'border-radius': '6px';
    padding: '4px';
    'border-color': '#77b3b4';
    width: '370px';
    'border-width': '1px';
  };

  grdprescribeRowloaded: boolean;
  @ViewChild('brcd1TempRef', { read: Border, static: false }) set _brcd1(c: Border) {
    if (c) {
      this.brcd1 = c;
    }
  }
  private lblQuantityPerDoseUOM: iLabel;
  @ViewChild('lblQuantityPerDoseUOMTempRef', { read: iLabel, static: false }) set _lblQuantityPerDoseUOM(c: iLabel) {
    if (c) {
      this.lblQuantityPerDoseUOM = c;
    }
  }
  private AllProd: iCheckBox;
  @ViewChild('AllProdTempRef', { read: iCheckBox, static: false }) set _AllProd(c: iCheckBox) {
    if (c) {
      this.AllProd = c;
    }
  }
  private cmdCatalogueOptions: iButton;
  @ViewChild('cmdCatalogueOptionsTempRef', { read: iButton, static: false }) set _cmdCatalogueOptions(c: iButton) {
    if (c) {
      this.cmdCatalogueOptions = c;
    }
  }
  private cmdFormularyOptions: iButton;
  @ViewChild('cmdFormularyOptionsTempRef', { read: iButton, static: false }) set _cmdFormularyOptions(c: iButton) {
    if (c) {
      this.cmdFormularyOptions = c;
    }
  }
  private lblTotalQuantity: iLabel;
  @ViewChild('lblTotalQuantityTempRef', { read: iLabel, static: false }) set _lblTotalQuantity(c: iLabel) {
    if (c) {
      this.lblTotalQuantity = c;
    }
  }
  private txtTotalQuantity: iTextBox;
  @ViewChild('txtTotalQuantityTempRef', { read: iTextBox, static: false }) set _txtTotalQuantity(c: iTextBox) {
    if (c) {
      this.txtTotalQuantity = c;
    }
  }
  private lblTotalQuantityUOM: iLabel;
  @ViewChild('lblTotalQuantityUOMTempRef', { read: iLabel, static: false }) set _lblTotalQuantityUOM(c: iLabel) {
    if (c) {
      this.lblTotalQuantityUOM = c;
    }
  }
  private cboTotalQuantityUOM: iComboBox;
  @ViewChild('cboTotalQuantityUOMTempRef', { read: iComboBox, static: false }) set _cboTotalQuantityUOM(c: iComboBox) {
    if (c) {
      this.cboTotalQuantityUOM = c;
    }
  }
  private btnAddInfo: iButton;
  @ViewChild('btnAddInfoTempRef', { read: iButton, static: false }) set _btnAddInfo(c: iButton) {
    if (c) {
      this.btnAddInfo = c;
    }
  }
  private lblQuantityPerDose: iLabel;
  @ViewChild('lblQuantityPerDoseTempRef', { read: iLabel, static: false }) set _lblQuantityPerDose(c: iLabel) {
    if (c) {
      this.lblQuantityPerDose = c;
    }
  }
  public txtQuantity: iTextBox;
  @ViewChild('txtQuantityTempRef', { read: iTextBox, static: false }) set _txtQuantity(c: iTextBox) {
    if (c) {
      this.txtQuantity = c;
    }
  }
  private cboQuantityPerDoseUOM: iComboBox;
  @ViewChild('cboQuantityPerDoseUOMTempRef', { read: iComboBox, static: false }) set _cboQuantityPerDoseUOM(c: iComboBox) {
    if (c) {
      this.cboQuantityPerDoseUOM = c;
    }
  }
  private lblSupplyInst: iLabel;
  @ViewChild('lblSupplyInstTempRef', { read: iLabel, static: false }) set _lblSupplyInst(c: iLabel) {
    if (c) {
      this.lblSupplyInst = c;
    }
  }
  private lblSupplyInstText: iLabel;
  @ViewChild('lblSupplyInstTextTempRef', { read: iLabel, static: false }) set _lblSupplyInstText(c: iLabel) {
    if (c) {
      this.lblSupplyInstText = c;
    }
  }
  private lblSupplyInstValue: iLabel;
  @ViewChild('lblSupplyInstValueTempRef', { read: iLabel, static: false }) set _lblSupplyInstValue(c: iLabel) {
    if (c) {
      this.lblSupplyInstValue = c;
    }
  }
  private lblBorder1: iLabel;
  @ViewChild('lblBorder1TempRef', { read: iLabel, static: false }) set _lblBorder1(c: iLabel) {
    if (c) {
      this.lblBorder1 = c;
    }
  }
  public cmdAdd: iButton  = new iButton();
  @ViewChild('cmdAddTempRef', { read: iButton, static: false }) set _cmdAdd(c: iButton) {
    if (c) {
      this.cmdAdd = c;
    }
  }
  public cmdUpdate: iButton;
  @ViewChild('cmdUpdateTempRef', { read: iButton, static: false }) set _cmdUpdate(c: iButton) {
    if (c) {
      this.cmdUpdate = c;
    }
  }
  private cmdRemove: iButton;
  @ViewChild('cmdRemoveTempRef', { read: iButton, static: false }) set _cmdRemove(c: iButton) {
    if (c) {
      this.cmdRemove = c;
    }
  }

  grdPrescribe: GridExtension = new GridExtension();
  grdDosecombinations: GridExtension = new GridExtension();
  grdTechValItem: GridExtension = new GridExtension();
  grdTecValItmChld: GridExtension = new GridExtension();

  @ViewChild('grdDosecombinationsTempRef', { read: GridComponent, static: false }) set _grdDosecombinations(c: GridComponent) {
    if (c) {
      this.grdDosecombinations.grid = c;
      this.grdDosecombinations.columns = c.columns;
    }
  }

  @ViewChild('grdPrescribeTempRef', { read: GridComponent, static: false }) set _grdPrescribe(c: GridComponent) {
    if (c) {
      this.grdPrescribe.grid = c;
      this.grdPrescribe.columns = c.columns;
    }
  }

  @ViewChild('grdTechValItemTempRef', { read: GridComponent, static: false }) set _grdTechValItem(c: GridComponent) {
    if (c) {
      this.grdTechValItem.grid = c;
      this.grdTechValItem.columns = c.columns;
    }
  }

  grdTechValItemDataTemplates: QueryList<DataTemplate>;
  @ViewChildren('grdTechValItemDataTemplateRef', { read: DataTemplate }) set _grdTechValItemDataTemplates(v: QueryList<DataTemplate>) {
    if (v) {
      this.grdTechValItemDataTemplates = v;
    }
  }

  grdTecValItmChldDataTemplates: QueryList<DataTemplate>;
  @ViewChildren('grdTecValItmChldDataTemplateRef', { read: DataTemplate }) set _grdTecValItmChldDataTemplates(v: QueryList<DataTemplate>) {
    if (v) {
      this.grdTecValItmChldDataTemplates = v;
    }
  }

  grdPrescribeDataTemplates: QueryList<DataTemplate>;
  @ViewChildren('grdPrescribeDataTemplateRef', { read: DataTemplate }) set _grdPrescribeDataTemplates(v: QueryList<DataTemplate>) {
    if (v) {
      this.grdPrescribeDataTemplates = v;
    }
  }

  grdDoseCombinationsDataTemplates: QueryList<DataTemplate>;
  @ViewChildren('grdDoseCombinationsDataTemplateRef', { read: DataTemplate }) set _grdDoseCombinationsDataTemplates(v: QueryList<DataTemplate>) {
    if (v) {
      this.grdDoseCombinationsDataTemplates = v;
    }
  }

  childGridRefCollection: QueryList<GridComponent>;
  @ViewChildren('grdTecValItmChldTempRef', { read: GridComponent }) set _grdTecValItmChldTempRef(v: QueryList<GridComponent>) {
    if (v) {
      this.childGridRefCollection = v;
    }
  }

  oIPVM: PrescriptionItemVM;
  PageDataContext: PrescriptionItemVM;
  oPreObj: PrescriptionItemVM;
  oPrsItmVM: PrescriptionItemVM;
  oPrescItemVM: PrescriptionItemVM;
  public oMultiSelect: MultiSelectListWindow;
  public oMultiSelectList: MultiSelectListWindow;
  private oChildWindow: ChildWindow;
  private bRemoveSelection: boolean = false;
  GrdProduct = { Visibility: Visibility.Visible };
  private oSupInst: medsupplydispensinginstructionstab;
  oItem: PrescriptionItemVM;
  private _MsgBoxTitle: string;
  private _IsDeactivatedPerscItem: boolean = false;
  private bMultiDispSup: boolean = false;
  private bMultiCompChild: boolean = false;
  deletedItems: List<ManagePrescSer.TechValidatedItem> = new List<ManagePrescSer.TechValidatedItem>();
  lnRouteOID: number = 0;
  lnDosageFormOID: number = 0;
  private bParentItm: boolean = false;
  private iFirstHit: boolean = false;
  private bCDItemEnable: boolean = false;
  msgBoxDeactivatedDrug: iMessageBox;
  public bChildSupplyDispClick: boolean = true;
  public bChildSupplyDispFirstLoad: boolean = true;
  public sMandMsgChck: string = String.Empty;
  sFormStyle: string[];
  sNonFormStyle: string[];
  private isChilMCIEnabled: boolean;
  public maxLayoutHeight = 300;
  constructor() {
    super();
    that = this;
  }

  ngOnInit(): void {
    this.grdTechValItem.RowIndicatorVisibility = Visibility.Visible;
    this.grdPrescribe.RowIndicatorVisibility = Visibility.Visible;
    this.grdTechValItem.EnableCellEditEnded = true;
    this.grdPrescribe.GridSelectionChange = (s, e) => { this.grdPrescribe_SelectionChanged(s, e) };
    this.grdDosecombinations.GridSelectionChange = (s, e) => { this.grdDosecombinations_SelectionChanged(s, e)};
    this.grdTechValItem.onCellClick = (s, e) => { this.grdTechValItem_onCellClick(s, e)};
    // this.grdTecValItmChld.onCellClick = (s, e) => { this.grdTecValItmChld_onCellClick(s, e)};
    this.grdTechValItem.RowExpandedChanged = (s, e) => { this.grdTechValItem_RowIsExpandedChanged(s, e)};
    this.grdTechValItem.onCellEditEnded = (s, e) => { this.grdTechValItem_CellEditEnded(s, e)};
    // this.grdTecValItmChld.GridSelectionChange = (s, e) => { this.grdTecValItmChld_SelectionChanged(s, e)};

    if (this.DataContext.FormViewerDetails.TechValidateDetails == null) {
      this.DataContext.FormViewerDetails.TechValidateDetails =
        ObjectHelper.CreateObject(new TechValidateVM(), {
          Quantity: String.Empty,
          TotalQuantity: String.Empty,
        });
    }
  }

  QueryListCollection: any [] = [];
  ngAfterViewInit(): void {
    // this.omedformview=new medFormViewer();
    // this.omedformview.RefreshWardStockIcon= (s, e) => { this.grdTecValItmChld_Loaded({}, {}); };
    // this.omedformview.bIsTypeIn= true;
    medFormViewer.RefreshWardStockIcon = (s, e) => { this.grdTecValItmChld_Loaded({}, {}); };
    this.grdTechValItem.GenerateColumns();
    this.grdPrescribe.GenerateColumns();
    this.grdDosecombinations.GenerateColumns();
    this.medFrmviewtechvalidate_Loaded(null, null);
    this.LayoutRoot_Loaded(null, null);
    // this.grdTecValItmChld_Loaded({}, {}); // need to be addressed
    this.grdTechValItem.SetBinding('data', this.DataContext.FormViewerDetails.TechValidateDetails.PresTechValidatedItems);
    // added to trigger selection of first item as fast as it is loaded 16-10 by Sak 
     this.DataContext.FormViewerDetails.TechValidateDetails.PropertyChanged = (s, e) => {
       if (e.PropertyName == 'oDrugItemBasicInfo') {
    this.grdPrescribe.SetBinding('data', this.oIPVM.FormViewerDetails.TechValidateDetails.oDrugItemBasicInfo);
     this.grdPrescribe.SelectedItem = this.oIPVM.FormViewerDetails.TechValidateDetails.oDrugItemBasicInfo[0];
     let selectionChangeEventArgs: SelectionChangeEventArgs = {};
     let addedItemsList: List = new List();
     addedItemsList.Add(this.grdPrescribe.SelectedItem);
     selectionChangeEventArgs.AddedItems = addedItemsList;
     this.grdPrescribe_SelectionChanged({}, selectionChangeEventArgs);
   }
      }
   // this.grdPrescribe.SetBinding('data', this.oIPVM.FormViewerDetails.TechValidateDetails.oDrugItemBasicInfo);//moved from here to above
    this.grdDosecombinations.SetBinding('data', this.oIPVM.FormViewerDetails.TechValidateDetails.TechValidatedItems);
    this.grdTechValItem.SelectedItem = this.DataContext.FormViewerDetails.TechValidateDetails.SelectedPrescItem;
     if(this.DataContext.IsFormViewerDisable){
      this.grdTechValItem.IsEnabled = false;
      this.grdPrescribe.IsEnabled = false;
      this.grdDosecombinations.IsEnabled = false;
      this.cmdCatalogueOptions.IsEnabled = false;
    } else this.grdPrescribeSelectedItemUpdate();
    this.SetChildGridData();
    this.maxLayoutHeight = CommonService.setDynamicScrollviewerHeight();
    // if(window.screen.height < 1000 && window.devicePixelRatio != 1.25){
      this.maxLayoutHeight = this.maxLayoutHeight - 35;
    // }
  }
  private SetChildGridData() {
    this.grdTechValItem.OpenAllChildGrids(this.DataContext.FormViewerDetails.TechValidateDetails.PresTechValidatedItems);
    this.grdTecValItmChldDataTemplates.changes.subscribe((dt) => {
      this.DataContext.FormViewerDetails.TechValidateDetails.PresTechValidatedItems.forEach((item, index) => {
        if (item.PresTechValidatedItemsChild.Count > 0) {
          item.ChildGridExtension.IsSynchronizedWithCurrentItem = true;
          item.ChildGridExtension.SetSelectedChildItem(item.SelectedChildGridIndex);
          item.ChildGridExtension.onCellClick = (s, e) => { this.grdTecValItmChld_onCellClick(s, e)};
          item.ChildGridExtension.GridSelectionChange = (s, e) => {this.grdTecValItmChld_SelectionChanged(s, e);}
          this.QueryListCollection.push(item.ChildGridExtension.SetChildDataTemplates(dt, index));
        }
      });
    });
    this.childGridRefCollection.changes.subscribe((children) => {
        this.grdTechValItem.SetChildGridReference(children, this.QueryListCollection);
    });
  }

  public displayHierarchicalBtn(dataItem: any): boolean {
    return dataItem.PresTechValidatedItemsChild && dataItem.PresTechValidatedItemsChild.Count > 0;
  }

  private grdTechValItem_CellEditEnded(sender: Object, e: GridViewCellEditEndedEventArgs): void {
    let columnname: string =  e.Cell.Column.UniqueName;
    if (String.Equals(columnname, 'SupplyComments', StringComparison.CurrentCultureIgnoreCase)) {
      if (
        this.oIPVM != null &&
        this.oIPVM.FormViewerDetails != null &&
        this.oIPVM.FormViewerDetails.BasicDetails != null &&
        this.oIPVM.FormViewerDetails.TechValidateDetails != null
      ) {
        this.oIPVM.FormViewerDetails.TechValidateDetails.SupplyComments = this.oIPVM.FormViewerDetails.BasicDetails.Supplycomments;
      }
    }
  }
  cmdMedAdmin_Click(sender: Object, e: RoutedEventArgs): void {
     MedicationCommonBB.LaunchMedChart(PatientContext.PatientOID, PatientContext.EncounterOid, PatientContext.EncounterType, "TechnicallyValidate");
  }

  iMsgBox_MessageBoxClose(sender: Object, e: MessageEventArgs): void {
    if (e.MessageBoxResult == MessageBoxResult.Yes) {
      this.bMultiDispSup = true;
      let sCurcount: number = this.grdTechValItem.GetRowCount();
      if (sCurcount > 0) {
        let lstPrescriptionItemVM: ObservableCollection<Object> =
          new ObservableCollection<Object>();
        for (let i: number = 0; i < sCurcount; i++) {
          this.oItem = ObjectHelper.CreateType<PrescriptionItemVM>(
            this.grdTechValItem.GetRowData(i),
            PrescriptionItemVM
          );
          this.oItem.IsTechValidate = true;
          lstPrescriptionItemVM.Add(this.oItem);
        }
        
        this.oSupInst = new medsupplydispensinginstructionstab();
        this.oSupInst.PrescriptionItemVM = this.oItem;
        this.oItem.FormViewerDetails.BasicDetails.oPrescitemVM = this.oItem;
        if (this.oItem.FormViewerDetails.TechValidateDetails != null) {
          this.oItem.FormViewerDetails.TechValidateDetails.FetchfrombasicDetails = true;
        } else {
          this.oItem.FormViewerDetails.TechValidateDetails = new TechValidateVM();
          this.oItem.FormViewerDetails.TechValidateDetails.FetchfrombasicDetails = true;
        }
        this.oItem.FormViewerDetails.BasicDetails.LaunchedFromTechValidate = true;
        this.oItem.FormViewerDetails.TechValidateDetails.IslaunchedFromProductOptions = false;
        this.oItem.FormViewerDetails.BasicDetails.launchsupplyinstrmezzanine();
      }
    }
  }

  private grdTechValItem_onCellClick(sender: Object, args: GridViewCellClickEventArgs): void {
    let sCurrCol: string = args.ColumnCell.Column.UniqueName;
    if (this.oIPVM != null) {
      this.oIPVM.bAvoidNextSupplyFirsttime = true;
    }
    if (this.grdDosecombinations.GetSelectedRowCount() > 0) {
      this.grdDosecombinations.UnselectAll();
    }
    if (String.Compare(sCurrCol, 'Comments', StringComparison.CurrentCultureIgnoreCase) == 0) {
      let lstPrescriptionItemVM: ObservableCollection<Object> = new ObservableCollection<Object>();
      if (args.RowIndex != -1) {
        this.oItem = ObjectHelper.CreateType<PrescriptionItemVM>(
          this.grdTechValItem.GetRowData(args.RowIndex),
          PrescriptionItemVM
        );
        if (
          this.oItem != null &&
          this.oItem.FormViewerDetails != null &&
          this.oItem.FormViewerDetails.BasicDetails != null
        ) {
          this.oItem.FormViewerDetails.BasicDetails.TechCASupplyInstrClick = (s, e) => {
            this.TechCASupplyInstrClickEve(s);
          };
        }
        if (this.oItem != null) {
          this.oItem.IsTechValidate = true;
        }
        if (this.oItem != null && this.oItem.EnableParentMCIItem) {
          if ((this.oItem.IsSupplyRequested == false && this.oItem.IsReSupplyRequested == false &&
            String.Compare(sCurrCol, 'colInitiateSupplyRequest', StringComparison.CurrentCultureIgnoreCase) == 0) ||
            String.Compare(sCurrCol, 'Comments', StringComparison.CurrentCultureIgnoreCase) == 0
          ) {
            if (
              String.Compare(
                sCurrCol,
                'colInitiateSupplyRequest',
                StringComparison.CurrentCultureIgnoreCase
              ) == 0
            ) {
              this.oItem.IsSupplyRequested = true;
            }
            this.bChildSupplyDispClick = false;
            if (
              this.oItem.FormViewerDetails != null &&
              this.oItem.FormViewerDetails.TechValidateDetails != null
            )
              this.oItem.FormViewerDetails.TechValidateDetails.IsMciChildSelected = false;
            this.grdTechValItem.CommitEdit();
            lstPrescriptionItemVM.Add(this.oItem);
            if (
              this.oItem != null &&
              this.oItem.FormViewerDetails != null &&
              this.oItem.FormViewerDetails.BasicDetails != null
            ) {
              this.oItem.FormViewerDetails.BasicDetails.oPrescitemVM =
                this.oItem;
              if (this.oItem.FormViewerDetails.TechValidateDetails != null) {
                this.oItem.FormViewerDetails.TechValidateDetails.FetchfrombasicDetails =
                  true;
              } else {
                this.oItem.FormViewerDetails.TechValidateDetails =
                  new TechValidateVM();
                this.oItem.FormViewerDetails.TechValidateDetails.FetchfrombasicDetails =
                  true;
              }
              this.oItem.FormViewerDetails.TechValidateDetails.IslaunchedFromProductOptions =
                false;
              this.oItem.FormViewerDetails.BasicDetails.LaunchedFromTechValidate =
                false;
              this.oItem.FormViewerDetails.BasicDetails.launchsupplyinstrmezzanine();
            }
          }
        }
      }
    }
  }

  private TechCASupplyInstrClickEve(PItemVM: PrescriptionItemVM): void {
    if (
      PItemVM != null &&
      PItemVM.FormViewerDetails != null &&
      PItemVM.FormViewerDetails.BasicDetails != null
    ) {
      PItemVM.FormViewerDetails.BasicDetails.RHSSupplyInstrIconTooltip = true;
      PItemVM.FormViewerDetails.BasicDetails.TechsupplyInstText = null;
      if (
        PItemVM.TechValidatedItems != null &&
        PItemVM.TechValidatedItems.Count > 0
      ) {
        let prodcount: number = PItemVM.TechValidatedItems.Count;
        for (let i: number = 0; i < prodcount; i++) {
          if (
            !String.IsNullOrEmpty(
              PItemVM.TechValidatedItems[i].ProdSupplyInsWithComments
            )
          ) {
            PItemVM.FormViewerDetails.BasicDetails.TechsupplyInstText =
              PItemVM.TechValidatedItems[i].ProdSupplyInsWithComments;
            break;
          }
        }
      }
      // this.grdTechValItem.Rebind();
    }
  }
  
  supplydispensinginstruction_Close(args: AppDialogEventargs): void {
      this.oChildWindow = args.AppChildWindow;
      if (args.Result == AppDialogResult.Cancel) {
          let iMsgBox: iMessageBox = ObjectHelper.CreateObject(new iMessageBox(), {
              Title: "LORENZO",
              Message: Resource.disconcan1.Cancel_Error_Message,
              MessageButton: MessageBoxButton.YesNo,
              IconType: MessageBoxType.Question
          });
          iMsgBox.MessageBoxClose  = (s,e) => { this.iMsgBox_MessageBoxClose_App(s,e); } ;
          iMsgBox.Show();
      }
      else if (args.Result == AppDialogResult.Ok) {
          let bdialogresult: boolean = false;
          let oContent = ObjectHelper.CreateType<medsupplydispensinginstructionstab>(args.Content, medsupplydispensinginstructionstab);
          let oSupplyDispensingInstructionsVM: SupplyDispensingInstructionsVM = null;
          if (String.Compare(oContent.tab1.SelectedKey, "SupplyDetails") == 0)
              oSupplyDispensingInstructionsVM = ObjectHelper.CreateType<SupplyDispensingInstructionsVM>((ObjectHelper.CreateType<medsupplydispensinginstructions>(oContent.tab1.SelectedContent, medsupplydispensinginstructions)).DataContext, SupplyDispensingInstructionsVM);
          else oSupplyDispensingInstructionsVM = ObjectHelper.CreateType<SupplyDispensingInstructionsVM>((ObjectHelper.CreateType<medsupplydispensinginstructions>((ObjectHelper.CreateType<iTabItem>(oContent.tab1.Items[0], iTabItem)).Content, medsupplydispensinginstructions)).DataContext, SupplyDispensingInstructionsVM);
          if (oSupplyDispensingInstructionsVM != null) {
              this.oPrescItemVM = ObjectHelper.CreateType<PrescriptionItemVM>(this.DataContext, PrescriptionItemVM);
              if (this.bMultiDispSup && this.oPrescItemVM != null && this.oPrescItemVM.FormViewerDetails != null && this.oPrescItemVM.FormViewerDetails.TechValidateDetails != null && this.oPrescItemVM.FormViewerDetails.TechValidateDetails.PresTechValidatedItems != null) {
                  let nPrescItemsCount: number = this.oPrescItemVM.FormViewerDetails.TechValidateDetails.PresTechValidatedItems.Count;
                  for (let i: number = 0; i < nPrescItemsCount; i++) {
                      if (this.oPrescItemVM.FormViewerDetails.TechValidateDetails.PresTechValidatedItems[i].IsSupDispEnable)
                          this.oPrescItemVM.FormViewerDetails.TechValidateDetails.PresTechValidatedItems[i] = this.SetSupplyDispensingInstructions(this.oPrescItemVM.FormViewerDetails.TechValidateDetails.PresTechValidatedItems[i], oSupplyDispensingInstructionsVM);
                  }
              }
              else {
                  this.oItem = this.SetSupplyDispensingInstructions(this.oItem, oSupplyDispensingInstructionsVM);
              }
              if (this.oItem != null && this.oItem.FormViewerDetails != null && this.oItem.FormViewerDetails.TechValidateDetails != null && !this.oItem.FormViewerDetails.TechValidateDetails.IsMciChildSelected)
                  this.grdTechValItem.Rebind();
              if (this.oIPVM != null && this.oIPVM.FormViewerDetails != null && this.oIPVM.FormViewerDetails.BasicDetails != null) {
                  this.oIPVM.FormViewerDetails.BasicDetails.DoClinicallyVerify();
                  this.oIPVM.bIsSupplyDispensingInstructionSet = false;
              }
              this.oChildWindow.DialogResult = true;
          }
          else if (String.Compare(oContent.tab1.SelectedKey, "RequisitionHistory", StringComparison.OrdinalIgnoreCase) == 0) {
              oContent.tab1.Click("SupplyDetails", true);
          }
          Busyindicator.SetStatusIdle("AddSupplyInstructionClicked");
      }
      this.bMultiDispSup = false;
  }
  
  SetSupplyDispensingInstructions(oSelectedItem: PrescriptionItemVM, oSupplyDispensingInstructionsVM: SupplyDispensingInstructionsVM): PrescriptionItemVM {
    let bSupDisp: boolean = false;
    let sSuppToolTipText: string = String.Empty;
    let sSuppToolTipValue: string = String.Empty;
    oSelectedItem.FormViewerDetails.BasicDetails.Supplycomments =
      oSupplyDispensingInstructionsVM.Supplycomments;
    let oSupplyInstrItems: ObservableCollection<CListItem> =
      oSupplyDispensingInstructionsVM.SupplyInstructionsList;
    if (oSupplyInstrItems != null && oSupplyInstrItems.Count > 0) {
      let oSelectedsupplyInstruction = new ObservableCollection<CListItem>(
        oSupplyInstrItems.Where((a) => a.IsSelected).Select((s) => s)
      );
      oSelectedItem.FormViewerDetails.BasicDetails.SelectedsupplyInstruction =
        oSelectedsupplyInstruction;
      if (
        oSelectedItem != null &&
        oSelectedItem.FormViewerDetails != null &&
        oSelectedItem.FormViewerDetails.BasicDetails != null &&
        oSelectedItem.FormViewerDetails.BasicDetails
          .SelectedsupplyInstruction != null &&
        oSelectedItem.FormViewerDetails.BasicDetails.SelectedsupplyInstruction
          .Count > 0
      ) {
        bSupDisp = true;
        this.oIPVM.FormViewerDetails.BasicDetails.TechValiadteSupplyInstWithConactSemiColon(
          this.oIPVM.FormViewerDetails.BasicDetails.SelectedsupplyInstruction,
          (o1) => {
            sSuppToolTipText = o1;
          },
          (o2) => {
            sSuppToolTipValue = o2;
          }
        );
        this.oIPVM.FormViewerDetails.BasicDetails.SupplyInsVal =
          sSuppToolTipValue;
        this.oIPVM.FormViewerDetails.BasicDetails.SupplyInsText =
          sSuppToolTipText;
      }
      this.oIPVM.FormViewerDetails.BasicDetails.SupplyInsVal =
        sSuppToolTipValue;
      this.oIPVM.FormViewerDetails.BasicDetails.SupplyInsText =
        sSuppToolTipText;
      if (
        !String.IsNullOrEmpty(sSuppToolTipText) &&
        !String.IsNullOrEmpty(
          this.oIPVM.FormViewerDetails.BasicDetails.Supplycomments
        )
      ) {
        this.oIPVM.FormViewerDetails.BasicDetails.SupplyInsTextWithComments =
          sSuppToolTipText +
          Environment.NewLine +
          'Comments:' +
          this.oIPVM.FormViewerDetails.BasicDetails.Supplycomments;
      } else if (
        !String.IsNullOrEmpty(
          this.oIPVM.FormViewerDetails.BasicDetails.Supplycomments
        )
      ) {
        this.oIPVM.FormViewerDetails.BasicDetails.SupplyInsTextWithComments =
          'Comments:' +
          this.oIPVM.FormViewerDetails.BasicDetails.Supplycomments;
      } else if (
        !String.IsNullOrEmpty(sSuppToolTipText) &&
        String.IsNullOrEmpty(
          this.oIPVM.FormViewerDetails.BasicDetails.Supplycomments
        )
      ) {
        this.oIPVM.FormViewerDetails.BasicDetails.SupplyInsTextWithComments =
          sSuppToolTipText;
      } else {
        this.oIPVM.FormViewerDetails.BasicDetails.SupplyInsTextWithComments =
          Resource.TechValProdOpt.SelectSupInstrution;
      }
    }
    if (this.bMultiDispSup != true) {
    }
    if (sSuppToolTipValue != null) {
      oSelectedItem.formViewerDetails.BasicDetails.TechsupplyInstText =
        sSuppToolTipValue;
    }
    if (
      oSelectedItem.FormViewerDetails.BasicDetails.SelectedsupplyInstruction !=
        null &&
      oSelectedItem.FormViewerDetails.BasicDetails.SelectedsupplyInstruction
        .Count > 0
    ) {
      if (oSelectedItem.FormViewerDetails.BasicDetails.TechPresItemTechOID > 0)
        oSelectedItem.FormViewerDetails.BasicDetails.TecValOperationMode = 'M';
      else
        oSelectedItem.FormViewerDetails.BasicDetails.TecValOperationMode = 'N';
    } else {
      if (oSelectedItem.FormViewerDetails.BasicDetails.TechPresItemTechOID > 0)
        oSelectedItem.FormViewerDetails.BasicDetails.TecValOperationMode = 'D';
    }
    if (oSelectedItem.FormViewerDetails.TechValidateDetails != null)
      oSelectedItem.FormViewerDetails.TechValidateDetails.Technicalvalidateupdate =
        true;
    oSelectedItem.RequisitionCACode = 'MN_MED_VALIDATE_S_P2';
    oSelectedItem.FormViewerDetails.BasicDetails.IsDoseCombDefTech = '0';
    if (bSupDisp && oSelectedItem != null) {
      oSelectedItem.SupDisText = Resource.TechValidate.SupplyDisp_Update_Text;
      if (
        oSelectedItem.FormViewerDetails != null &&
        oSelectedItem.FormViewerDetails.BasicDetails != null &&
        oSelectedItem.FormViewerDetails.BasicDetails.InfusionDetails != null &&
        oSelectedItem.FormViewerDetails.BasicDetails.InfusionDetails
          .FluidPrescribableItemListOID <= 0 &&
        !String.Equals(
          oSelectedItem.FormViewerDetails.BasicDetails.itemSubType,
          CConstants.SUBTYPE,
          StringComparison.InvariantCultureIgnoreCase
        )
      ) {
        oSelectedItem.supToolTipDisText =
          'Supply instructions - ' + sSuppToolTipText;
      } else {
        oSelectedItem.supToolTipDisText =
          Resource.TechValidate.SupplyIns_ToolTip;
      }
    }
    if (
      oSelectedItem.FormViewerDetails.BasicDetails.SelectedsupplyInstruction !=
        null &&
      oSelectedItem.FormViewerDetails.BasicDetails.SelectedsupplyInstruction
        .Count > 0
    ) {
      oSelectedItem.FormViewerDetails.TechValidateDetails.supplyinstrvalue =
        sSuppToolTipValue;
      oSelectedItem.FormViewerDetails.TechValidateDetails.supplyinstrtext =
        sSuppToolTipText;
      oSelectedItem.FormViewerDetails.BasicDetails.sDefaultTechValSuppInstTxt =
        String.Empty;
    } else {
      oSelectedItem.FormViewerDetails.TechValidateDetails.supplyinstrvalue =
        String.Empty;
      oSelectedItem.FormViewerDetails.TechValidateDetails.supplyinstrtext =
        'Select supply instructions to enter value(s)';
      oSelectedItem.FormViewerDetails.BasicDetails.sDefaultTechValSuppInstTxt =
        String.Empty;
    }
    if (
      oSelectedItem.FormViewerDetails.BasicDetails.SelectedsupplyInstruction !=
        null &&
      oSelectedItem.FormViewerDetails.BasicDetails.SelectedsupplyInstruction
        .Count == 0
    ) {
      oSelectedItem.SupDisText = Resource.TechValidate.SupplyDisp_Add_Text;
      oSelectedItem.supToolTipDisText = Resource.TechValidate.Addsupinst;
    } else if (
      oSelectedItem.FormViewerDetails.BasicDetails.SelectedsupplyInstruction !=
        null &&
      oSelectedItem.FormViewerDetails.BasicDetails.SelectedsupplyInstruction
        .Count > 0
    ) {
      oSelectedItem.SupDisText = Resource.TechValidate.SupplyDisp_Update_Text;
    }
    return oSelectedItem;
  }
  iMsgBox_MessageBoxClose_App(sender: Object, e: MessageEventArgs): void {
    if (e.MessageBoxResult == MessageBoxResult.Yes) {
      this.oChildWindow.DialogResult = false;
    }
    Busyindicator.SetStatusIdle('AddSupplyInstructionClicked');
  }

  dtpDate_OnDateValueChgChild_Func = (s, e) => { this.dtpDate_OnDateValueChgChild(s, e); }
  private dtpDate_OnDateValueChgChild(sender: Object, e: DateChangedArgs): void {
    if (this.oIPVM != null && this.oIPVM.bAvoidNextSupplyFirsttime == true) {
      if (DateTime.NotEquals((<iDateTimePicker>sender).SelectedDateTime, DateTime.MinValue)) {
        let oPrescItemVM: PrescriptionItemVM =
          ObjectHelper.CreateType<PrescriptionItemVM>(
            (<FrameworkElement>sender).DataContext,
            PrescriptionItemVM
          );
        if (
          oPrescItemVM != null &&
          oPrescItemVM.FormViewerDetails != null &&
          oPrescItemVM.FormViewerDetails.BasicDetails != null &&
          oPrescItemVM.FormViewerDetails.BasicDetails.ParentMCIItem != null
        ) {
          oPrescItemVM.FormViewerDetails.BasicDetails.ParentMCIItem.EnableParentMCIItem =
            false;
        }
      } else {
        let oPrescItemVM: PrescriptionItemVM =
          ObjectHelper.CreateType<PrescriptionItemVM>(
            (<FrameworkElement>sender).DataContext,
            PrescriptionItemVM
          );
        if (
          oPrescItemVM != null &&
          oPrescItemVM.FormViewerDetails != null &&
          oPrescItemVM.FormViewerDetails.BasicDetails != null &&
          oPrescItemVM.FormViewerDetails.BasicDetails.ParentMCIItem != null &&
          oPrescItemVM.FormViewerDetails.BasicDetails.ParentMCIItem
            .PresTechValidatedItemsChild != null
        ) {
          let cPTICint: number =
            oPrescItemVM.FormViewerDetails.BasicDetails.ParentMCIItem.PresTechValidatedItemsChild.IndexOf(
              this.oItem
            );
          let cint: number = 0;
          for (
            let iCnt: number = 0;
            iCnt <
            oPrescItemVM.FormViewerDetails.BasicDetails.ParentMCIItem
              .PresTechValidatedItemsChild.Count;
            iCnt++
          ) {
            if (iCnt != cPTICint) {
              if (
                DateTime.NotEquals(oPrescItemVM.FormViewerDetails.BasicDetails.ParentMCIItem
                  .PresTechValidatedItemsChild[iCnt].FormViewerDetails
                  .BasicDetails.NextSupplyDate, DateTime.MinValue)
              ) {
                cint = cint + 1;
              }
            }
          }
          if (cint >= 1) {
            oPrescItemVM.FormViewerDetails.BasicDetails.ParentMCIItem.EnableParentMCIItem =
              false;
          } else {
            if (
              oPrescItemVM.FormViewerDetails.BasicDetails.ParentMCIItem !=
                null &&
              !String.IsNullOrEmpty(
                oPrescItemVM.FormViewerDetails.BasicDetails.ParentMCIItem
                  .ItemSubType
              ) &&
              String.Equals(
                oPrescItemVM.FormViewerDetails.BasicDetails.ParentMCIItem
                  .ItemSubType,
                'CC_MULCMPNTITM',
                StringComparison.InvariantCultureIgnoreCase
              ) &&
              oPrescItemVM.FormViewerDetails.BasicDetails.ParentMCIItem
                .PresTechValidatedItemsChild != null &&
              oPrescItemVM.FormViewerDetails.BasicDetails.ParentMCIItem
                .PresTechValidatedItemsChild.Count > 0 &&
              ((oPrescItemVM.FormViewerDetails.BasicDetails.ParentMCIItem
                .FormViewerDetails.MulticomponentDetails != null &&
                oPrescItemVM.FormViewerDetails.BasicDetails.ParentMCIItem
                  .FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo !=
                  null &&
                oPrescItemVM.FormViewerDetails.BasicDetails.ParentMCIItem
                  .FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo
                  .Count > 0 &&
                oPrescItemVM.FormViewerDetails.BasicDetails.ParentMCIItem
                  .FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo
                  .Count ==
                  oPrescItemVM.FormViewerDetails.BasicDetails.ParentMCIItem
                    .PresTechValidatedItemsChild.Count) ||
                (!String.IsNullOrEmpty(ContextInfo.MenuCode) &&
                  String.Equals(
                    ContextInfo.MenuCode,
                    CConstants.TechnicallyValidateMenuCode,
                    StringComparison.InvariantCultureIgnoreCase
                  ))) &&
              oPrescItemVM.FormViewerDetails.BasicDetails.ParentMCIItem.PresTechValidatedItemsChild.All(
                (x) =>
                  x.FormViewerDetails != null &&
                  x.FormViewerDetails.BasicDetails != null &&
                  String.IsNullOrEmpty(
                    x.FormViewerDetails.BasicDetails.Supplycomments
                  )
              ) &&
              oPrescItemVM.FormViewerDetails.BasicDetails.ParentMCIItem.PresTechValidatedItemsChild.All(
                (x) =>
                  x.SelectedSupplyreq != null &&
                  x.SelectedSupplyreq.Value.Equals(Resource.TechValidate.Empty)
              ) &&
              oPrescItemVM.FormViewerDetails.BasicDetails.ParentMCIItem.PresTechValidatedItemsChild.All(
                (x) =>
                  (x.FormViewerDetails != null &&
                    x.FormViewerDetails.BasicDetails != null &&
                    x.FormViewerDetails.BasicDetails
                      .SelectedsupplyInstruction == null) ||
                  x.FormViewerDetails.BasicDetails.SelectedsupplyInstruction
                    .Count == 0
              )
            ) {
              oPrescItemVM.FormViewerDetails.BasicDetails.ParentMCIItem.EnableParentMCIItem =
                true;
            }
          }
        }
      }
    }
  }
  dtpDate_OnDateValueChgParent_Func = (s, e) => { this.dtpDate_OnDateValueChgParent(s, e); }
  private dtpDate_OnDateValueChgParent(sender: Object, e: DateChangedArgs): void {
    if (this.oIPVM != null && this.oIPVM.bAvoidNextSupplyFirsttime == true) {
      let oDTPicker: FrameworkElement =
        ObjectHelper.CreateType<FrameworkElement>(sender, FrameworkElement);
      if (oDTPicker != null) {
        let item: PrescriptionItemVM =
          ObjectHelper.CreateType<PrescriptionItemVM>(
            oDTPicker.DataContext,
            PrescriptionItemVM
          );
        if (item != null) {
          if (DateTime.NotEquals((<iDateTimePicker>sender).SelectedDateTime, DateTime.MinValue)) {
            if (
              item.PresTechValidatedItemsChild != null &&
              item.PresTechValidatedItemsChild.Count > 0 &&
              item.PresTechValidatedItemsChild.All(
                (x) => x.FluidPrescribableItemListOID == 0
              )
            ) {
              item.PresTechValidatedItemsChild.forEach((child) => {
                child.EnableChildMCIComp = false;
              });
            }
          } else {
            if (
              item.FormViewerDetails != null &&
              item.FormViewerDetails.BasicDetails != null &&
              item.FormViewerDetails.BasicDetails.ParentMCIItem == null &&
              String.Equals(
                item.FormViewerDetails.BasicDetails.SupplyInsTextWithComments,
                Resource.MedicationForm.lblSupplyInstructionsText_Tooltip,
                StringComparison.InvariantCultureIgnoreCase
              ) &&
              (item.FormViewerDetails.BasicDetails.SelectedsupplyInstruction ==
                null ||
                (item.FormViewerDetails.BasicDetails
                  .SelectedsupplyInstruction != null &&
                  item.FormViewerDetails.BasicDetails.SelectedsupplyInstruction
                    .Count == 0))
            ) {
              if (
                item.PresTechValidatedItemsChild != null &&
                item.PresTechValidatedItemsChild.Count > 0 &&
                item.SelectedSupplyreq != null &&
                String.Equals(
                  item.SelectedSupplyreq.Value,
                  Resource.TechValidate.Empty
                )
              ) {
                item.PresTechValidatedItemsChild.forEach((child) => {
                  child.EnableChildMCIComp = true;
                });
              }
            }
          }
        }
      }
    }
  }
  private medFrmviewtechvalidate_Loaded(
    sender: Object,
    e: RoutedEventArgs
  ): void {
    console.log('before', this.grdTechValItem.columns);
    this._MsgBoxTitle = 'Lorenzo - Manage prescription';
    Common.SetColorConfigCSS();
    if (Common.sFormStyle != null) {
      this.sFormStyle = Common.sFormStyle.Split('~');
    }
    if (Common.sNonFormStyle != null) {
      this.sNonFormStyle = Common.sNonFormStyle.Split('~');
    }
    this.oPrsItmVM = ObjectHelper.CreateType<PrescriptionItemVM>(
      this.DataContext,
      PrescriptionItemVM
    );
    if (this.oPrsItmVM != null) {
      this.oPrsItmVM.IsTechValFauxTabLoaded = true;
      if (
        this.oPrsItmVM.FormViewerDetails != null &&
        this.oPrsItmVM.FormViewerDetails.BasicDetails != null
      ) {
        if (!this.oPrsItmVM.IsLoadBasicFaxTab) {
          let bIsModificationReasonExists: boolean =
            this.oPrsItmVM.FormViewerDetails.BasicDetails
              .IsModificationReasonExists;
          this.oPrsItmVM.IsReasonForModificationVisible = Visibility.Collapsed;
          this.oPrsItmVM.FormViewerDetails.BasicDetails.IsMandatoryRSNFORMOD =
            false;
          this.oPrsItmVM.FormViewerDetails.BasicDetails.IsMCenableRSNFORMOD =
            false;
          this.oPrsItmVM.FormViewerDetails.BasicDetails.IsMandatoryReasonForMedClerkModify =
            false;
          this.oPrsItmVM.FormViewerDetails.BasicDetails.lstDRCAmendedFlds.Clear();
          this.oPrsItmVM.FormViewerDetails.BasicDetails.lstAmendedFlds.Clear();
          this.oPrsItmVM.FormViewerDetails.BasicDetails.IsValidateDose = true;
          this.oPrsItmVM.FormViewerDetails.BasicDetails.IsClearlstAmendList =
            true;
          this.oPrsItmVM.FormViewerDetails.BasicDetails.IsClearlstAmendedFlds =
            true;
          if (bIsModificationReasonExists)
            this.oPrsItmVM.FormViewerDetails.BasicDetails.IsModificationReasonExists =
              true;
        }
      }
      if (
        this.oPrsItmVM.FormViewerDetails != null &&
        this.oPrsItmVM.FormViewerDetails.TechValidateDetails != null
      ) {
        this.oPrsItmVM.FormViewerDetails.TechValidateDetails.OnLoadMCIQuantityFound =
          (s, e) => {
            this.TechValidateDetails_OnLoadMCIQuantityFound(s);
          };
      }
    }
    this.grdTechValItem.Focus();
    if (this.oPrsItmVM.iSSupplyrequest == null) {
      let sDomainCodes: string = String.Empty;
      sDomainCodes = ValueDomain.Supplystatus;
      ProcessRTE.GetHierarchicalValuesByDomains(
        CConstants.CodingSchemeName,
        CConstants.Version,
        CConstants.FilterType,
        ContextInfo.Culture,
        sDomainCodes,
        this.OnRTEResult
      );
      if (this.oPrsItmVM != null && this.oPrsItmVM.iSSupplyrequest != null) {
        if (
          this.oPrsItmVM.SelectedSupplyreq != null &&
          !String.IsNullOrEmpty(this.oPrsItmVM.SelectedSupplyreq.Value)
        ) {
          let objselectedval: CListItem = this.oPrsItmVM.iSSupplyrequest
            .Where(
              (x) =>
                !String.IsNullOrEmpty(x.Value) &&
                String.Equals(x.Value, this.oPrsItmVM.SelectedSupplyreq.Value)
            )
            .FirstOrDefault();
          this.oPrsItmVM.SelectedSupplyreq = objselectedval;
        } else {
          let objselectedval: CListItem = this.oPrsItmVM.iSSupplyrequest
            .Where(
              (x) =>
                !String.IsNullOrEmpty(x.Value) &&
                String.Equals(x.Value, Resource.TechValidate.Empty)
            )
            .FirstOrDefault();
          this.oPrsItmVM.SelectedSupplyreq = objselectedval;
        }
      }
    }
  
    if (
      PatientContext.PrescriptionType == PrescriptionTypes.ForAdministration ||
      PatientContext.PrescriptionType == PrescriptionTypes.Inpatient
    ) {
      if (
        this.grdTechValItem != null &&
        this.grdTechValItem.Columns != null &&
        this.grdTechValItem.Columns.Count > 0
      ) {
        if (
          MedicationCommonProfileData.AddPrescribingConfig != null &&
          MedicationCommonProfileData.AddPrescribingConfig.EnableWardStockConfig
        ) {
          this.grdTechValItem.Columns['Nextsupplys'].IsVisible = true;
        } else {
          this.grdTechValItem.Columns['Nextsupplys'].IsVisible = false;
        }
      }
    }
    console.log('after', this.grdTechValItem.columns);
  }
  OnRTEResult(args: RTEEventargs): void {
    if (String.IsNullOrEmpty(args.Request) || args.Result == null) return;
    if (
      String.Equals(
        args.Request,
        ValueDomain.Supplystatus,
        StringComparison.InvariantCultureIgnoreCase
      )
    ) {
      if (args.Result instanceof Dictionary) {
        let objResult: Dictionary<string, List<CListItem>> = <
          Dictionary<string, List<CListItem>>
        >args.Result;
        objResult.forEach((objDomainDetail) => {
          switch (objDomainDetail.Key.ToUpper()) {
            case ValueDomain.Supplystatus: {
              if (this.oPrsItmVM.iSSupplyrequest == null)
                this.oPrsItmVM.iSSupplyrequest =
                  new ObservableCollection<CListItem>();
              this.oPrsItmVM.iSSupplyrequest.Clear();
              this.oPrsItmVM.iSSupplyrequest.Add(
                ObjectHelper.CreateObject(new CListItem(), {
                  DisplayText: '<Select>',
                  Value: Resource.TechValidate.Empty,
                })
              );
              (<List<CListItem>>objDomainDetail.Value).forEach((oCListItem) => {
                if (
                  !String.Equals(
                    oCListItem.Value,
                    CConstants.CancelSupplycode,
                    StringComparison.InvariantCultureIgnoreCase
                  )
                ) {
                  this.oPrsItmVM.iSSupplyrequest.Add(
                    ObjectHelper.CreateObject(new CListItem(), {
                      DisplayText: oCListItem.DisplayText,
                      Value: oCListItem.Value,
                    })
                  );
                }
              });
              break;
            }
          }
        });
      }
    }
  }
  PatientCount_Completed(
    sender: Object,
    e: ManagePrescSer.GetPatientMedicationCountCompletedEventArgs
  ): void {
    if (e.Error != null) return;
    let objResult: ManagePrescSer.CResMsgGetPatientMedicationCount = e.Result;
    if (!(objResult instanceof ManagePrescSer.CResMsgGetPatientMedicationCount))
      return;
    if (objResult != null) {
    }
  }
  TechValidateDetails_OnDeactivatedPrescItemsFound(
    sPrescItems: string,
    sCompItems: string
  ): void {
    let DeactMsgFor: string = String.Empty;
    if (
      !String.IsNullOrEmpty(sPrescItems) &&
      !String.IsNullOrEmpty(sCompItems)
    ) {
      DeactMsgFor =
        Resource.TechValidate.DeactPresItem +
        sPrescItems +
        Resource.TechValidate.DeactPresItem_Mid_Msg +
        sCompItems +
        Resource.TechValidate.DeactPresItem_Last_Msg;
    } else if (!String.IsNullOrEmpty(sPrescItems)) {
      DeactMsgFor =
        Resource.TechValidate.DeactPresItem +
        sPrescItems +
        Resource.TechValidate.DeactPresItem_Lastdiff_Msg;
    } else if (!String.IsNullOrEmpty(sCompItems)) {
      DeactMsgFor =
        Resource.TechValidate.DeactCompItem +
        sCompItems +
        Resource.TechValidate.DeactCompItem_Last_Msg;
    }
    if (
      !String.IsNullOrEmpty(sPrescItems) ||
      !String.IsNullOrEmpty(sCompItems)
    ) {
      this.msgBoxDeactivatedDrug = new iMessageBox();
      this.msgBoxDeactivatedDrug.Height = 200;
      this.msgBoxDeactivatedDrug.Width = 480;
      this.msgBoxDeactivatedDrug.Title = this._MsgBoxTitle;
      this.msgBoxDeactivatedDrug.Message = DeactMsgFor;
      this.msgBoxDeactivatedDrug.IconType = MessageBoxType.Information;
      this.msgBoxDeactivatedDrug.MessageButton = MessageBoxButton.OK;
      this.msgBoxDeactivatedDrug.Show();
    }
  }
  private DeleteItmDoseCombinations(): void {
    if (this.oIPVM != null && this.deletedItems.Count > 0) {
      let oPrescItem: PrescriptionItemVM = null;
      let currentItem: CustomTechValidatedItem = null;
      let iTechValItemsCnt: number = 0;
      let iTecValTotCnt: number = 0;
      let iTecValDelCnt: number = 0;
      let iTechValNewDel: number = 0;
      if (this.oIPVM != null && this.oIPVM.ActionCode == ActivityTypes.Amend) {
        if (
          this.oIPVM != null &&
          this.oIPVM.FormViewerDetails != null &&
          this.oIPVM.FormViewerDetails.BasicDetails != null &&
          String.Compare(
            this.oIPVM.FormViewerDetails.BasicDetails.itemSubType,
            'CC_MULCMPNTITM',
            StringComparison.InvariantCultureIgnoreCase
          ) != 0
        ) {
          this.oIPVM.IsReasonForModificationVisible = Visibility.Visible;
          this.oIPVM.FormViewerDetails.BasicDetails.IsenableRSNFORMOD = true;
          this.oIPVM.FormViewerDetails.BasicDetails.IsRsnEnabForTechval = true;
        }
      }
      if (iTechValItemsCnt == 0) {
        if (
          this.oIPVM.FormViewerDetails.TechValidateDetails.TechValidatedItems !=
          null
        ) {
          iTechValItemsCnt =
            this.oIPVM.FormViewerDetails.TechValidateDetails.TechValidatedItems
              .Count;
        }
      }
      this.deletedItems.forEach((DelItem) => {
        currentItem =
          this.oIPVM.FormViewerDetails.TechValidateDetails.TechValidatedItems.Where(
            (s) =>
              s.DrugItem.IdentifyingOID == DelItem.DrugItem.IdentifyingOID &&
              s.DrugItem.IdentifyingType == DelItem.DrugItem.IdentifyingType
          ).FirstOrDefault();
        if (currentItem != null) {
          if (
            currentItem.OperationMode == 'UM' ||
            currentItem.OperationMode == 'M'
          ) {
            currentItem.OperationMode = 'D';
            if (currentItem.DrugItem != null)
              currentItem.DrugItem.OperationMode = 'D';
            if (this.oIPVM.PresMultiCompitemOID > 0) {
              currentItem.DrugItem.PrescribableItemListOID =
                this.oIPVM.PresMultiCompitemOID;
              currentItem.bMultiCompChilds = true;
            } else {
              currentItem.DrugItem.PrescribableItemListOID =
                this.oIPVM.PrescriptionItemOID;
            }
          } else if (currentItem.OperationMode == 'N') {
            this.oIPVM.FormViewerDetails.TechValidateDetails.TechValidatedItems.Remove(
              currentItem
            );
            iTechValNewDel = iTechValNewDel + 1;
          }
          currentItem.IsDoseCombinationsDefined = '1';
          if (currentItem.OperationMode == 'D') {
            iTecValDelCnt = iTecValDelCnt + 1;
            this.oIPVM.FormViewerDetails.TechValidateDetails.TechValidatedItems.Remove(
              currentItem
            );
          }
        }
      });
      this.deletedItems.Clear();
      iTecValTotCnt =
        this.oIPVM.FormViewerDetails.TechValidateDetails.TechValidatedItems
          .Count;
    }
  }
  private grdDosecombinations_RowLoaded(
    sender: Object,
    e: RowLoadedEventArgs
  ): void {
    let oTech: CustomTechValidatedItem =
      ObjectHelper.CreateType<CustomTechValidatedItem>(
        e.DataElement,
        CustomTechValidatedItem
      );
    if (oTech != null) {
      let sText: string = String.Empty;
      let sValue: string = String.Empty;
      if (
        String.Compare(
          oTech.OperationMode,
          'D',
          StringComparison.InvariantCultureIgnoreCase
        ) == 0
      ) {
        e.Row.Visibility = Visibility.Collapsed;
      } else {
        if (!String.IsNullOrEmpty(oTech.ProdSupplyInsWithComments)) {
          sText = oTech.ProdSupplyInsWithComments;
        }
        let SupTxt: TextBlock = ObjectHelper.CreateType<TextBlock>(
          e.Row.Cells[
            this.grdDosecombinations.GetColumnIndexByName('SupplyInstruction')
          ].Content,
          TextBlock
        );
        SupTxt.SetValue(TextBlock.TextProperty, sText);
        let SuplTooltip: iLabel = new iLabel();
        SuplTooltip.Width = 250;
        SuplTooltip.Text = sText;
        SuplTooltip.IsWordwrap = true;
        SupTxt.SetValue(ToolTipService.ToolTipProperty, SuplTooltip);
        e.Row.Cells[
          this.grdDosecombinations.GetColumnIndexByName('SupplyInstruction')
        ].SetValue(ToolTipService.ToolTipProperty, SuplTooltip);
      }
    }
    if (this.grdPrescribe.GetRowCount() <= 0) {
      this.txtQuantity.Text = String.Empty;
      this.txtTotalQuantity.Text = String.Empty;
      this.cboQuantityPerDoseUOM.ItemsSource = null;
      this.cboTotalQuantityUOM.ItemsSource = null;
    }
  }
  private LayoutRoot_Loaded(sender: Object, e: RoutedEventArgs): void {
    this.ClearControls();
    this.cmdCatalogueOptions.Visibility = Visibility.Visible;
    this.cmdFormularyOptions.Visibility = Visibility.Collapsed;
    if (
      PatientContext.PrescriptionType == PrescriptionTypes.ForAdministration ||
      PatientContext.PrescriptionType == PrescriptionTypes.Inpatient
    ) {
      let SupplyRequest: GridViewColumn =
        this.grdTechValItem.Columns['colInitiateSupplyRequest'];
      if (SupplyRequest instanceof GridViewColumn) {
        SupplyRequest.IsVisible = true;
      }
      let Nextsupply: GridViewColumn =
        this.grdTechValItem.Columns['Nextsupplys'];
      if (
        ProfileData.AdditionalPrescConfig != null &&
        ProfileData.AdditionalPrescConfig.EnableWardStockConfig &&
        Nextsupply instanceof GridViewColumn
      ) {
        Nextsupply.IsVisible = true;
      }
    }
    let sIDType: string = String.Empty;
    let oGridColumnFormViewer: GridViewColumn =
      this.grdTechValItem.Columns['FormViewerIcon'];
    if (oGridColumnFormViewer instanceof GridViewColumn) {
      oGridColumnFormViewer.IsVisible = false;
    }
    let oGridColumnStatus: GridViewColumn =
      this.grdTechValItem.Columns['ConflictIcon'];
    if (oGridColumnStatus instanceof GridViewColumn) {
      oGridColumnStatus.IsVisible = false;
    }
    let oGridColumnOtherinf: GridViewColumn =
      this.grdTechValItem.Columns['Otherinformation'];
    if (oGridColumnOtherinf instanceof GridViewColumn) {
      oGridColumnOtherinf.IsVisible = false;
    }
    let StartDTStartDTTMVWR: GridViewColumn =
      this.grdTechValItem.Columns['StartDTTMVWR'];
    if (StartDTStartDTTMVWR instanceof GridViewColumn) {
      StartDTStartDTTMVWR.IsVisible = false;
    }
    let oColPrescriptionItem: GridViewColumn =
      this.grdTechValItem.Columns['PrescriptionItem'];
    if (oColPrescriptionItem != null) {
      oColPrescriptionItem.Width = new GridViewLength(520);
    }
    let oColComments: GridViewColumn = this.grdTechValItem.Columns['Comments'];
    if (oColComments != null) {
      oColComments.Width = new GridViewLength(320);
    }
    this.oIPVM = ObjectHelper.CreateType<PrescriptionItemVM>(
      this.DataContext,
      PrescriptionItemVM
    );
    if (this.oIPVM != null) {
      this.oIPVM.bAvoidNextSupplyFirsttime = false;
      this.oIPVM.IsSupplyRequestedEnable = true;
      this.oIPVM.isShowallVisible = Visibility.Collapsed;
      //  if (this.oIPVM.isShowallVisible == Visibility.Visible)
      //    this.AllProd.IsChecked = false;
      this.oIPVM.IsFRMTecVal = false;
      if (
        this.oIPVM.FormViewerDetails != null &&
        this.oIPVM.FormViewerDetails.BasicDetails != null
      ) {
        if (
          String.Equals(
            this.oIPVM.ItemSubType,
            CConstants.SUBTYPE,
            StringComparison.InvariantCultureIgnoreCase
          ) ||
          (this.oIPVM.FormViewerDetails.BasicDetails.InfusionDetails != null &&
            this.oIPVM.FormViewerDetails.BasicDetails.InfusionDetails
              .FluidPrescribableItemListOID > 0)
        ) {
          this.oIPVM.TechValSplitter = Visibility.Collapsed;
        } else {
          this.oIPVM.TechValSplitter = Visibility.Visible;
        }
        this.oIPVM.FormViewerDetails.BasicDetails.StartDTTMText =
          this.oIPVM.FormViewerDetails.BasicDetails.StartDTTMDisplay();
        if (
          this.oIPVM.FormViewerDetails.BasicDetails.SelectedsupplyInstruction !=
            null &&
          this.oIPVM.FormViewerDetails.BasicDetails.SelectedsupplyInstruction
            .Count > 0
        ) {
          if (
            this.oIPVM.FormViewerDetails.BasicDetails.SelectedsupplyInstruction.Where(
              (x) => String.IsNullOrEmpty(x.DisplayText) || x.DisplayText == ''
            ).Count() > 0
          ) {
            let UnresolvedSupInst: StringBuilder = new StringBuilder();
            UnresolvedSupInst.Append(
              String.Join(
                '~^~',
                this.oIPVM.FormViewerDetails.BasicDetails.SelectedsupplyInstruction.Where(
                  (x) =>
                    String.IsNullOrEmpty(x.DisplayText) || x.DisplayText == ''
                )
                  .Select((x) => x.Value)
                  .ToArray()
              )
            );
            if (UnresolvedSupInst != null && UnresolvedSupInst.Length > 0) {
              let ResolvedSupplyInstFromTV: ObservableCollection<CListItem> =
                new ObservableCollection<CListItem>(
                  MCommonBB.GetResolvedSupplyInstTermText(UnresolvedSupInst)
                );
              if (ResolvedSupplyInstFromTV.Count > 0) {
                this.oIPVM.FormViewerDetails.BasicDetails.SelectedsupplyInstruction.forEach(
                  (i) => {
                    if (
                      ResolvedSupplyInstFromTV.Where((x) =>
                        String.Equals(
                          x.Value,
                          i.Value,
                          StringComparison.CurrentCultureIgnoreCase
                        )
                      ).Count() > 0
                    ) {
                      i.DisplayText = ResolvedSupplyInstFromTV.Where((x) =>
                        String.Equals(
                          x.Value,
                          i.Value,
                          StringComparison.CurrentCultureIgnoreCase
                        )
                      )
                        .Select((x) => x.DisplayText)
                        .FirstOrDefault();
                    }
                  }
                );
              }
            }
          }
          this.oIPVM.FormViewerDetails.BasicDetails.SelectedsupplyInstruction =
            new ObservableCollection<CListItem>(
              this.oIPVM.FormViewerDetails.BasicDetails.SelectedsupplyInstruction
            );
          this.oIPVM.SupDisText = Resource.TechValidate.SupplyDisp_Update_Text;
          this.SetSupDisToolTipValues(this.oIPVM);
        } else {
          this.oIPVM.SupDisText = Resource.TechValidate.SupplyDisp_Add_Text;
          this.oIPVM.supToolTipDisText = Resource.TechValidate.Addsupinst;
        }
        if (
          String.Compare(
            this.oIPVM.FormViewerDetails.BasicDetails.itemSubType,
            'CC_MULCMPNTITM',
            StringComparison.InvariantCultureIgnoreCase
          ) == 0
        ) {
          this.cmdCatalogueOptions.IsEnabled = false;
        } else if (
          String.Equals(
            this.oIPVM.FormViewerDetails.BasicDetails.IdentifyingType,
            CConstants.NONCATALOGUEITEM,
            StringComparison.InvariantCultureIgnoreCase
          ) ||
          String.Equals(
            this.oIPVM.FormViewerDetails.BasicDetails.IdentifyingType,
            CConstants.Precatalog,
            StringComparison.InvariantCultureIgnoreCase
          )
        ) {
          this.cmdCatalogueOptions.IsEnabled = false;
          if (!this.oIPVM.canLuanchProdOpt) {
            this.cboTotalQuantityUOM.IsEnabled = false;
            this.cboQuantityPerDoseUOM.IsEnabled = false;
            this.txtQuantity.IsEnabled = false;
            this.txtTotalQuantity.IsEnabled = false;
            this.lblSupplyInst.IsEnabled = false;
            this.btnAddInfo.IsEnabled = false;
          }
        } else this.cmdCatalogueOptions.IsEnabled = true;
      }
      if (this.oIPVM.FormViewerDetails.TechValidateDetails == null) {
        this.oIPVM.FormViewerDetails.TechValidateDetails =
          ObjectHelper.CreateObject(new TechValidateVM(), {
            Quantity: String.Empty,
            TotalQuantity: String.Empty,
          });
      }
      if (this.oIPVM.FormViewerDetails.TechValidateDetails != null) {
        if (
          this.oIPVM.FormViewerDetails.TechValidateDetails.TechValidatedItems !=
            null &&
          this.oIPVM.FormViewerDetails.TechValidateDetails.TechValidatedItems
            .Count > 0
        ) {
          let TechValpresItems =
            this.oIPVM.FormViewerDetails.TechValidateDetails.TechValidatedItems.Where(
              (TechValPresItm) =>
                TechValPresItm.IsDoseCombinationsDefined == '0'
            ).Select((TechValPresItm) => TechValPresItm);
          if (TechValpresItems != null && TechValpresItems.Count() > 0) {
            if (
              TechValpresItems.First().SupplyInstruction != null &&
              TechValpresItems.First().SupplyInstruction.Count > 0
            ) {
              if (
                this.oIPVM.FormViewerDetails.BasicDetails
                  .SelectedsupplyInstruction != null &&
                this.oIPVM.FormViewerDetails.BasicDetails
                  .SelectedsupplyInstruction.Count > 0
              ) {
                let supplyTextChk = new Object();
                this.oIPVM.FormViewerDetails.BasicDetails.SelectedsupplyInstruction.forEach(
                  (item) => {
                    //revisited
                    //  supplyTextChk = DomainValuesForTechValidate.SupplyInstructions.ForEach(Reinsert => Reinsert.csCode = item.Value).Select(s => s.csCode);
                    supplyTextChk =
                      DomainValuesForTechValidate.SupplyInstructions.Select(
                        (s) => s.csCode
                      );
                  }
                );
                if (supplyTextChk != null) {
                  this.oIPVM.SupDisText =
                    Resource.TechValidate.SupplyDisp_Update_Text;
                } else {
                  this.oIPVM.FormViewerDetails.BasicDetails.SelectedsupplyInstruction =
                    null;
                }
              }
            }
            this.oIPVM.FormViewerDetails.BasicDetails.TechValOtherInst =
              TechValpresItems.First().OtherDispensingInstruction;
            this.oIPVM.FormViewerDetails.BasicDetails.TechPresItemTechOID =
              TechValpresItems.First().PrescriptionItemTechOID;
            this.oIPVM.FormViewerDetails.BasicDetails.IsDoseCombDefTech =
              TechValpresItems.First().IsDoseCombinationsDefined;
          }
          let TechValidatItems =
            this.oIPVM.FormViewerDetails.TechValidateDetails.TechValidatedItems.Where(
              (TechValItems) => TechValItems.IsDoseCombinationsDefined == '1'
            ).Select((TechValItems) => TechValItems);
          this.oIPVM.FormViewerDetails.TechValidateDetails.TechValidatedItems =
            new ObservableCollection<CustomTechValidatedItem>(TechValidatItems);
          for (
            let i: number = 0;
            i <
            this.oIPVM.FormViewerDetails.TechValidateDetails.TechValidatedItems
              .Count;
            i++
          ) {
            this.oIPVM.FormViewerDetails.TechValidateDetails.SetTechDetails(
              this.oIPVM.FormViewerDetails.TechValidateDetails
                .TechValidatedItems[i],
              'LOAD'
            );
          }
        }
        if (
          !this.oIPVM.bIsSupplyDispensingInstructionSet &&
          this.oIPVM.FormViewerDetails.TechValidateDetails
            .PresTechValidatedItems != null &&
          this.oIPVM.FormViewerDetails.TechValidateDetails
            .PresTechValidatedItems.Count > 0
        ) {
          if (
            this.oIPVM.FormViewerDetails.TechValidateDetails
              .PresTechValidatedItems[0].FormViewerDetails != null &&
            this.oIPVM.FormViewerDetails.TechValidateDetails
              .PresTechValidatedItems[0].FormViewerDetails.BasicDetails != null
          ) {
            let lTechPresItemTechOID: number =
              this.oIPVM.FormViewerDetails.TechValidateDetails
                .PresTechValidatedItems[0].FormViewerDetails.BasicDetails
                .TechPresItemTechOID;
            let cIsDoseCombDefTech: string =
              this.oIPVM.FormViewerDetails.TechValidateDetails
                .PresTechValidatedItems[0].FormViewerDetails.BasicDetails
                .IsDoseCombDefTech;
            let sTecValOperationMode: string =
              this.oIPVM.FormViewerDetails.TechValidateDetails
                .PresTechValidatedItems[0].FormViewerDetails.BasicDetails
                .TecValOperationMode;
            let TechValSupInst: ObservableCollection<CListItem> =
              new ObservableCollection<CListItem>();
            TechValSupInst =
              this.oIPVM.FormViewerDetails.TechValidateDetails
                .PresTechValidatedItems[0].FormViewerDetails.BasicDetails
                .SelectedsupplyInstruction;
            let oPrescriptionItemVM: ObservableCollection<PrescriptionItemVM> =
              null;
            if (
              this.oIPVM.FormViewerDetails.TechValidateDetails
                .PresTechValidatedItems[0].PresTechValidatedItemsChild !=
                null &&
              this.oIPVM.FormViewerDetails.TechValidateDetails
                .PresTechValidatedItems[0].PresTechValidatedItemsChild.Count > 0
            )
              oPrescriptionItemVM =
                new ObservableCollection<PrescriptionItemVM>(
                  this.oIPVM.FormViewerDetails.TechValidateDetails.PresTechValidatedItems[0].PresTechValidatedItemsChild
                );
            this.oIPVM.FormViewerDetails.TechValidateDetails.PresTechValidatedItems =
              new ObservableCollection<PrescriptionItemVM>();
            this.oIPVM.FormViewerDetails.BasicDetails.SelectedsupplyInstruction =
              TechValSupInst;
            this.oIPVM.FormViewerDetails.BasicDetails.TechPresItemTechOID =
              lTechPresItemTechOID;
            this.oIPVM.FormViewerDetails.BasicDetails.IsDoseCombDefTech =
              cIsDoseCombDefTech;
            this.oIPVM.FormViewerDetails.BasicDetails.TecValOperationMode =
              sTecValOperationMode;
            if (
              this.oIPVM.FormViewerDetails.BasicDetails
                .SelectedsupplyInstruction != null &&
              this.oIPVM.FormViewerDetails.BasicDetails
                .SelectedsupplyInstruction.Count > 0
            ) {
              this.oIPVM.SupDisText =
                Resource.TechValidate.SupplyDisp_Update_Text;
              this.SetSupDisToolTipValues(this.oIPVM);
            } else {
              if (
                this.oIPVM.FormViewerDetails != null &&
                this.oIPVM.FormViewerDetails.BasicDetails != null &&
                this.oIPVM.FormViewerDetails.BasicDetails.InfusionDetails !=
                  null &&
                this.oIPVM.FormViewerDetails.BasicDetails.InfusionDetails
                  .FluidPrescribableItemListOID <= 0 &&
                !String.Equals(
                  this.oIPVM.FormViewerDetails.BasicDetails.itemSubType,
                  CConstants.SUBTYPE,
                  StringComparison.InvariantCultureIgnoreCase
                )
              ) {
                this.oIPVM.SupDisText =
                  Resource.TechValidate.SupplyDisp_Add_Text;
                this.oIPVM.supToolTipDisText = Resource.TechValidate.Addsupinst;
              } else {
                this.oIPVM.supToolTipDisText =
                  Resource.TechValidate.AddsupinstChild;
              }
            }
            this.oIPVM.FormViewerDetails.TechValidateDetails.PresTechValidatedItems.Add(
              this.oIPVM
            );
            if (oPrescriptionItemVM != null) {
              if (
                this.oIPVM.FormViewerDetails.TechValidateDetails
                  .PresTechValidatedItems[0] != null
              )
                this.oIPVM.FormViewerDetails.TechValidateDetails.PresTechValidatedItems[0].PresTechValidatedItemsChild =
                  new ObservableCollection<PrescriptionItemVM>();
              this.oIPVM.FormViewerDetails.TechValidateDetails.PresTechValidatedItems[0].PresTechValidatedItemsChild =
                oPrescriptionItemVM;
            }
            this.oIPVM.FormViewerDetails.TechValidateDetails.SelectedPrescItem =
              this.oIPVM;
          }
        } else {
          this.oIPVM.FormViewerDetails.TechValidateDetails.PresTechValidatedItems =
            new ObservableCollection<PrescriptionItemVM>();
          this.oIPVM.FormViewerDetails.TechValidateDetails.PresTechValidatedItems.Add(
            this.oIPVM
          );
          this.oIPVM.FormViewerDetails.TechValidateDetails.SelectedPrescItem =
            this.oIPVM;
        }
        if (
          this.oIPVM.ActionCode != ActivityTypes.Amend &&
          this.oIPVM != null &&
          this.oIPVM.FormViewerDetails != null &&
          this.oIPVM.FormViewerDetails.TechValidateDetails != null &&
          this.oIPVM.FormViewerDetails.TechValidateDetails.SelectedPrescItem !=
            null
        ) {
          if (
            this.oIPVM.FormViewerDetails.MulticomponentDetails != null &&
            this.oIPVM.FormViewerDetails.MulticomponentDetails
              .oMCItemBasicInfo != null &&
            this.oIPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo
              .Count > 0
          ) {
            let nCount: number =
              this.oIPVM.FormViewerDetails.MulticomponentDetails
                .oMCItemBasicInfo.Count;
            let oTmpConstPrescItemVM: PrescriptionItemVM;
            if (
              this.oIPVM.FormViewerDetails.TechValidateDetails.SelectedPrescItem
                .PresTechValidatedItemsChild != null &&
              this.oIPVM.FormViewerDetails.TechValidateDetails.SelectedPrescItem
                .PresTechValidatedItemsChild.Count > 0
            ) {
              let mccount: number =
                this.oIPVM.FormViewerDetails.TechValidateDetails
                  .SelectedPrescItem.PresTechValidatedItemsChild.Count;
              for (let j: number = 0; j < mccount; j++) {
                for (let i: number = 0; i < nCount; i++) {
                  if (
                    this.oIPVM.FormViewerDetails.TechValidateDetails
                      .SelectedPrescItem.PresTechValidatedItemsChild[j]
                      .MCIUniqueRowID ==
                    this.oIPVM.FormViewerDetails.MulticomponentDetails
                      .oMCItemBasicInfo[i].UniqueMCRowID
                  ) {
                    if (
                      this.oIPVM.FormViewerDetails.MulticomponentDetails
                        .oMCItemBasicInfo[i].SupplyInstruction == null
                    )
                      this.oIPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo[
                        i
                      ].SupplyInstruction =
                        new ObservableCollection<ObjectInfo>();
                    if (
                      this.oIPVM.FormViewerDetails.TechValidateDetails
                        .SelectedPrescItem.PresTechValidatedItemsChild[j]
                        .FormViewerDetails.BasicDetails
                        .SelectedsupplyInstruction != null &&
                      this.oIPVM.FormViewerDetails.TechValidateDetails
                        .SelectedPrescItem.PresTechValidatedItemsChild[j]
                        .FormViewerDetails.BasicDetails
                        .SelectedsupplyInstruction.Count > 0
                    ) {
                      this.oIPVM.FormViewerDetails.TechValidateDetails.SelectedPrescItem.PresTechValidatedItemsChild[
                        j
                      ].FormViewerDetails.BasicDetails.SelectedsupplyInstruction.forEach(
                        (item) => {
                          if (item.IsSelected) {
                            this.oIPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo[
                              i
                            ].SupplyInstruction.Add(
                              ObjectHelper.CreateObject(new ObjectInfo(), {
                                Code: item.Value,
                                Name: item.DisplayText,
                              })
                            );
                          }
                        }
                      );
                    }
                  }
                }
              }
              if (
                this.oIPVM.FormViewerDetails.TechValidateDetails
                  .SelectedPrescItem.PresTechValidatedItemsChild != null
              ) {
                this.oIPVM.SupplyDetails =
                  this.oIPVM.FormViewerDetails.TechValidateDetails.SelectedPrescItem.PresTechValidatedItemsChild;
              }
              this.oIPVM.FormViewerDetails.TechValidateDetails.SelectedPrescItem.PresTechValidatedItemsChild =
                new ObservableCollection<PrescriptionItemVM>();
              for (let i: number = 0; i < nCount; i++) {
                oTmpConstPrescItemVM = new PrescriptionItemVM();
                this.oPrescItemVM = ObjectHelper.CreateType<PrescriptionItemVM>(
                  this.DataContext,
                  PrescriptionItemVM
                );
                let oTempPresTmVM: PrescriptionItemVM =
                  new PrescriptionItemVM();
                if (
                  this.oIPVM != null &&
                  this.oIPVM.SupplyDetails != null &&
                  this.oIPVM.SupplyDetails.Count > 0
                ) {
                  for (
                    let sCount: number = 0;
                    sCount < this.oIPVM.SupplyDetails.Count;
                    sCount++
                  ) {
                    if (
                      this.oIPVM.FormViewerDetails.MulticomponentDetails
                        .oMCItemBasicInfo[i].IdentifyingOID ==
                      this.oIPVM.SupplyDetails[sCount].FormViewerDetails
                        .BasicDetails.IdentifyingOID
                    ) {
                      oTempPresTmVM = this.oIPVM.SupplyDetails[sCount];
                    }
                  }
                }
                if (
                  this.oPrescItemVM != null &&
                  this.oPrescItemVM.FormViewerDetails != null &&
                  this.oPrescItemVM.FormViewerDetails.MulticomponentDetails !=
                    null &&
                  this.oPrescItemVM.FormViewerDetails.MulticomponentDetails
                    .oMCItemBasicInfo[i] != null &&
                  !String.IsNullOrEmpty(
                    this.oPrescItemVM.FormViewerDetails.MulticomponentDetails
                      .oMCItemBasicInfo[i].Compoentsdrugprop
                  )
                ) {
                  this.oPrescItemVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo[
                    i
                  ].DrugProperties =
                    this.oPrescItemVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo[
                      i
                    ].Compoentsdrugprop;
                }
                oTmpConstPrescItemVM =
                  this.oIPVM.FormViewerDetails.TechValidateDetails.ConstructChildItemVM(
                    this.oPrescItemVM.FormViewerDetails.MulticomponentDetails
                      .oMCItemBasicInfo[i],
                    this.oPrescItemVM.FormViewerDetails.MulticomponentDetails
                      .oMCItemBasicInfo[i].PresItemTechOID,
                    this.oPrescItemVM,
                    oTempPresTmVM
                  );
                this.oIPVM.FormViewerDetails.TechValidateDetails.SelectedPrescItem.PresTechValidatedItemsChild.Add(
                  oTmpConstPrescItemVM
                );
              }
            }
          }
        }
        if (
          this.oIPVM.ActionCode == ActivityTypes.Amend &&
          this.oIPVM.FormViewerDetails.TechValidateDetails.SelectedPrescItem !=
            null &&
          this.oIPVM.FormViewerDetails.TechValidateDetails
            .PresTechValidatedItems != null
        ) {
          if (
            String.Compare(
              this.oIPVM.FormViewerDetails.TechValidateDetails.SelectedPrescItem
                .LorenzoID,
              'PI-001',
              StringComparison.CurrentCultureIgnoreCase
            ) != 0 &&
            !String.IsNullOrEmpty(
              this.oIPVM.FormViewerDetails.BasicDetails.IdentifyingType
            ) &&
            !(
              String.Equals(
                this.oIPVM.FormViewerDetails.BasicDetails.IdentifyingType,
                CConstants.NONCATALOGUEITEM,
                StringComparison.InvariantCultureIgnoreCase
              ) ||
              String.Equals(
                this.oIPVM.FormViewerDetails.BasicDetails.IdentifyingType,
                CConstants.Precatalog,
                StringComparison.InvariantCultureIgnoreCase
              )
            )
          ) {
            let sIdentifyingName: string = String.Empty;
            let lIdentifyingOid: number = 0;
            let sIdentifyingType: string = String.Empty;
            let sMciItem: string = String.Empty;
            let itemSubType: string = String.Empty;
            itemSubType =
              this.oIPVM.FormViewerDetails.TechValidateDetails.SelectedPrescItem
                .FormViewerDetails.BasicDetails.itemSubType;
            sMciItem =
              this.oIPVM.FormViewerDetails.TechValidateDetails.SelectedPrescItem
                .FormViewerDetails.BasicDetails.mCIItemDisplay;
            sIDType =
              this.oIPVM.FormViewerDetails.TechValidateDetails.SelectedPrescItem
                .Itemlist;
            sIdentifyingName =
              this.oIPVM.FormViewerDetails.TechValidateDetails.SelectedPrescItem
                .FormViewerDetails.BasicDetails.IdentifyingName;
            lIdentifyingOid =
              this.oIPVM.FormViewerDetails.TechValidateDetails.SelectedPrescItem
                .FormViewerDetails.BasicDetails.IdentifyingOID;
            sIdentifyingType =
              this.oIPVM.FormViewerDetails.TechValidateDetails.SelectedPrescItem
                .FormViewerDetails.BasicDetails.IdentifyingType;
            if (
              !String.IsNullOrEmpty(itemSubType) &&
              !String.IsNullOrEmpty(sMciItem)
            ) {
              let cMcicount: number = sMciItem.Split('^').length - 1;
              if (cMcicount < 5) sIdentifyingName = sMciItem.Replace('^', ' ');
            }
            let oDrugItemInfo: ObservableCollection<DrugItemBasicInfo> =
              new ObservableCollection<DrugItemBasicInfo>();
            oDrugItemInfo.Add(
              ObjectHelper.CreateObject(new DrugItemBasicInfo(), {
                IdentifyingOID: lIdentifyingOid,
                IdentifyingType: sIdentifyingType,
                IdentifyingName: sIdentifyingName,
                TechQtyUomName: '',
              })
            );
            this.oIPVM.FormViewerDetails.TechValidateDetails.oDrugItemBasicInfo =
              oDrugItemInfo;
            if (
              this.oIPVM.FormViewerDetails.MulticomponentDetails != null &&
              this.oIPVM.FormViewerDetails.MulticomponentDetails
                .oMCItemBasicInfo != null &&
              this.oIPVM.FormViewerDetails.MulticomponentDetails
                .oMCItemBasicInfo.Count > 0
            ) {
              let nCount: number =
                this.oIPVM.FormViewerDetails.MulticomponentDetails
                  .oMCItemBasicInfo.Count;
              let oTmpConstPrescItemVM: PrescriptionItemVM;
              if (
                this.oIPVM.FormViewerDetails.TechValidateDetails
                  .SelectedPrescItem.PresTechValidatedItemsChild != null
              ) {
                this.oIPVM.SupplyDetails =
                  this.oIPVM.FormViewerDetails.TechValidateDetails.SelectedPrescItem.PresTechValidatedItemsChild;
              }
              this.oIPVM.FormViewerDetails.TechValidateDetails.SelectedPrescItem.PresTechValidatedItemsChild =
                new ObservableCollection<PrescriptionItemVM>();
              for (let i: number = 0; i < nCount; i++) {
                let oTempPresTmVM: PrescriptionItemVM =
                  new PrescriptionItemVM();
                if (
                  this.oIPVM != null &&
                  this.oIPVM.SupplyDetails != null &&
                  this.oIPVM.SupplyDetails.Count > 0
                ) {
                  for (
                    let sCount: number = 0;
                    sCount < this.oIPVM.SupplyDetails.Count;
                    sCount++
                  ) {
                    if (
                      this.oIPVM.FormViewerDetails.MulticomponentDetails
                        .oMCItemBasicInfo[i].IdentifyingOID ==
                      this.oIPVM.SupplyDetails[sCount].FormViewerDetails
                        .BasicDetails.IdentifyingOID
                    ) {
                      oTempPresTmVM = this.oIPVM.SupplyDetails[sCount];
                    }
                  }
                }
                if (
                  this.oIPVM.FormViewerDetails.MulticomponentDetails
                    .oMCItemBasicInfo[i] != null
                ) {
                  oTmpConstPrescItemVM = new PrescriptionItemVM();
                  oTmpConstPrescItemVM =
                    this.oIPVM.FormViewerDetails.TechValidateDetails.ConstructChildItemVM(
                      this.oIPVM.FormViewerDetails.MulticomponentDetails
                        .oMCItemBasicInfo[i],
                      this.oIPVM.FormViewerDetails.MulticomponentDetails
                        .oMCItemBasicInfo[i].PresItemTechOID,
                      this.oIPVM,
                      oTempPresTmVM
                    );
                  if (oTmpConstPrescItemVM.iSSupplyrequest == null)
                    oTmpConstPrescItemVM.iSSupplyrequest =
                      new ObservableCollection<CListItem>();
                  if (
                    DomainValuesForTechValidate.SupplyRequest != null &&
                    oTmpConstPrescItemVM.iSSupplyrequest.Count == 0
                  ) {
                    DomainValuesForTechValidate.SupplyRequest.forEach(
                      (objSupInfo) => {
                        oTmpConstPrescItemVM.iSSupplyrequest.Add(
                          ObjectHelper.CreateObject(new CListItem(), {
                            DisplayText: objSupInfo.DisplayText,
                            Value: objSupInfo.Value,
                          })
                        );
                      }
                    );
                  }
                  if (oTmpConstPrescItemVM.iSSupplyrequest == null)
                    oTmpConstPrescItemVM.iSSupplyrequest =
                      new ObservableCollection<CListItem>();
                  if (oTmpConstPrescItemVM.iSSupplyrequest != null) {
                    if (
                      this.oPrescItemVM != null &&
                      this.oPrescItemVM.iSSupplyrequest != null
                    )
                      oTmpConstPrescItemVM.iSSupplyrequest =
                        this.oPrescItemVM.iSSupplyrequest;
                  }
                  if (
                    oTmpConstPrescItemVM.iSSupplyrequest != null &&
                    oTmpConstPrescItemVM.SelectedSupplyreq == null
                  ) {
                    let objselectedval: CListItem =
                      oTmpConstPrescItemVM.iSSupplyrequest
                        .Where(
                          (x) =>
                            !String.IsNullOrEmpty(x.Value) &&
                            String.Equals(x.Value, Resource.TechValidate.Empty)
                        )
                        .FirstOrDefault();
                    oTmpConstPrescItemVM.SelectedSupplyreq = objselectedval;
                  }
                  this.oIPVM.FormViewerDetails.TechValidateDetails.SelectedPrescItem.PresTechValidatedItemsChild.Add(
                    oTmpConstPrescItemVM
                  );
                }
              }
            }
          }
        }
      }
      if (
        this.oIPVM.IsTechValidateMandatory &&
        this.oIPVM.IsFormviewTechValtabMandatory
      ) {
        if (
          this.oIPVM.FormViewerDetails != null &&
          this.oIPVM.FormViewerDetails.TechValidateDetails != null
        ) {
          if (
            String.Compare(
              PatientContext.PrescriptionType,
              PrescriptionTypes.Outpatient,
              StringComparison.CurrentCultureIgnoreCase
            ) == 0 ||
            String.Compare(
              PatientContext.PrescriptionType,
              PrescriptionTypes.Leave,
              StringComparison.CurrentCultureIgnoreCase
            ) == 0 ||
            String.Compare(
              PatientContext.PrescriptionType,
              PrescriptionTypes.Discharge,
              StringComparison.CurrentCultureIgnoreCase
            ) == 0
          ) {
            if (
              this.oIPVM.FormViewerDetails.BasicDetails != null &&
              this.oIPVM.FormViewerDetails.BasicDetails.DoseType != null &&
              this.oIPVM.FormViewerDetails.BasicDetails.DoseType.Value !=
                null &&
              this.oIPVM.FormViewerDetails.BasicDetails.DoseType.Value ==
                DoseTypeCode.NORMAL
            ) {
              this.oIPVM.FormViewerDetails.TechValidateDetails.IsQuantityPerDoseMandatory =
                true;
            }
          }
          this.oIPVM.FormViewerDetails.TechValidateDetails.IsMandatoryQntyUOM =
            this.oIPVM.FormViewerDetails.TechValidateDetails.IsQuantityPerDoseMandatory;
          this.oIPVM.FormViewerDetails.TechValidateDetails.QuantityMand =
            this.oIPVM.FormViewerDetails.TechValidateDetails.IsQuantityPerDoseMandatory;
        }
        this.lblTotalQuantity.Mandatory = true;
        this.lblTotalQuantityUOM.Mandatory = true;
        this.oIPVM.FormViewerDetails.TechValidateDetails.TotalQuantityMand =
          true;
      } else {
        this.oIPVM.FormViewerDetails.TechValidateDetails.IsQuantityPerDoseMandatory =
          false;
        this.lblQuantityPerDose.Mandatory = false;
        this.lblTotalQuantity.Mandatory = false;
        this.oIPVM.FormViewerDetails.TechValidateDetails.IsMandatoryQuantityUOM =
          false;
        this.oIPVM.FormViewerDetails.TechValidateDetails.IsMandatoryQntyUOM =
          false;
      }
      let obj: DisplayPrescriptionLineItem = new DisplayPrescriptionLineItem();
      if (
        this.oIPVM.FormViewerDetails.BasicDetails != null &&
        this.oIPVM.FormViewerDetails.BasicDetails.DefaultDetails != null &&
        this.oIPVM.FormViewerDetails.BasicDetails.DefaultDetails.Routes != null
      ) {
        let selectedClistitem: CListItem[] =
          this.oIPVM.FormViewerDetails.BasicDetails.DefaultDetails.Routes.Where(
            (cl) => cl.IsSelected == true
          ).ToArray();
        if (selectedClistitem.Count() > 0) {
          if (this.oIPVM.FormViewerDetails.BasicDetails.Route == null)
            this.oIPVM.FormViewerDetails.BasicDetails.Route =
              ObjectHelper.CreateObject(new CListItem(), {
                DisplayText: MedicationCommonBB.RouteName(selectedClistitem),
                Value: MedicationCommonBB.RouteOID(selectedClistitem),
              });
        }
      }
      this.SetDefaultValues();
      if (
        String.IsNullOrEmpty(
          this.oIPVM.FormViewerDetails.TechValidateDetails.SelectedPrescItem
            .FormViewerDetails.BasicDetails.itemSubType
        ) &&
        !String.IsNullOrEmpty(
          this.oIPVM.FormViewerDetails.BasicDetails.IdentifyingType
        ) &&
        !(
          String.Equals(
            this.oIPVM.FormViewerDetails.BasicDetails.IdentifyingType,
            CConstants.NONCATALOGUEITEM,
            StringComparison.InvariantCultureIgnoreCase
          ) ||
          String.Equals(
            this.oIPVM.FormViewerDetails.BasicDetails.IdentifyingType,
            CConstants.Precatalog,
            StringComparison.InvariantCultureIgnoreCase
          )
        )
      ) {
        // To be revisited
        // if (
        //   this.oIPVM.FormViewerDetails != null &&
        //   this.oIPVM.FormViewerDetails.TechValidateDetails != null &&
        //   this.oIPVM.FormViewerDetails.TechValidateDetails.oDrugItemBasicInfo !=
        //     null
        // )
        if (
          this.oIPVM.FormViewerDetails != null &&
          this.oIPVM.FormViewerDetails.TechValidateDetails != null &&
          this.oIPVM.FormViewerDetails.TechValidateDetails.oDrugItemBasicInfo
            .Length > 0
        ) {
          this.oIPVM.FormViewerDetails.TechValidateDetails.oDrugItemBasicInfo =
            null;

          this.EnableDisableButtonControls(false);
        }
      }
    }
    if (
      this.oIPVM != null &&
      this.oIPVM.FormViewerDetails != null &&
      this.oIPVM.FormViewerDetails.TechValidateDetails != null
    ) {
      this.oIPVM.FormViewerDetails.TechValidateDetails.OngrdPrescribeRowUnSelected =
        (s, e) => {
          this.OngrdPrescribeRowUnSelected();
        };
    }
    if (
      this.oIPVM != null &&
      this.oIPVM.FormViewerDetails != null &&
      this.oIPVM.FormViewerDetails.BasicDetails != null &&
      !String.IsNullOrEmpty(
        this.oIPVM.FormViewerDetails.BasicDetails.IdentifyingType
      ) &&
      (String.Equals(
        this.oIPVM.FormViewerDetails.BasicDetails.IdentifyingType,
        CConstants.Precatalog,
        StringComparison.InvariantCultureIgnoreCase
      ) ||
        String.Equals(
          this.oIPVM.FormViewerDetails.BasicDetails.IdentifyingType,
          CConstants.NONCATALOGUEITEM,
          StringComparison.InvariantCultureIgnoreCase
        ))
    ) {
      if (this.grdPrescribe != null) {
        this.grdprescribeRowloaded = true;
        // this.grdPrescribe.RowLoaded -= grdPrescribe_RowLoaded;
        // this.grdPrescribe.RowLoaded  = (s,e) => { this.grdPrescribe_RowLoaded(s,e); } ;
      }
      this.cmdCatalogueOptions.Visibility = Visibility.Collapsed;
      this.grdDosecombinations.Visibility = Visibility.Collapsed;
      this.GrdProduct.Visibility = Visibility.Collapsed;
      if (this.oIPVM!=null)
      this.oIPVM.TechValSplitter = Visibility.Collapsed;
    }
    // To be revisited
    this.grdTechValItem.UpdateColumns();
    
  }

  rowLoadedprescribe(context: any) {
    if (this.grdprescribeRowloaded) {
      let rowEventArgs = this.grdPrescribe.GetRowEventArgs(this.grdPrescribeDataTemplates, context);
      this.grdPrescribe_RowLoaded({}, rowEventArgs);
    }
  }

  rowLoadedTechValItem(context: any) {
    let rowEventArgs = this.grdTechValItem.GetRowEventArgs(this.grdTechValItemDataTemplates, context);
    this.grdTechValItem_RowLoaded({}, rowEventArgs);
  }

  rowLoadedTecValItmChld(context: any, dataItemChild: any) {
    let newContext = {
      index: context['index'],
      dataItem: dataItemChild
  }
  this.QueryListCollection.forEach((item) => {
      let rowEventArgs = dataItemChild.ChildGridExtension.GetRowEventArgs(item, newContext, true);
      this.grdTecValItmChld_RowLoaded({}, rowEventArgs);
  });
    // let rowEventArgs = this.grdTecValItmChld.GetRowEventArgs(this.grdTecValItmChldDataTemplates, context, true);
    // this.grdTecValItmChld_RowLoaded({}, rowEventArgs);
  }

  rowLoadedDoseCombinations(context: any) {
    let rowEventArgs = this.grdDosecombinations.GetRowEventArgs(this.grdDoseCombinationsDataTemplates, context);
    this.grdDosecombinations_RowLoaded({}, rowEventArgs);
  }

  btnAddInfo_Click_Func = (s, e) => { 
    Object.keys(that).forEach((prop) => (this[prop] = that[prop]));
    this.btnAddInfo_Click(s, e); 
    if(!this.oIPVM.FormViewerDetails.TechValidateDetails.SupplyInsTextWithComments)
    this.oIPVM.FormViewerDetails.TechValidateDetails.SupplyInsTextWithComments='Select supply instructions to enter value(s)';
  }
  
  private btnAddInfo_Click(sender: Object, e: RoutedEventArgs): void {
    this.VisibilityQntyPerDoseDetails(false);
  }
  private VisibilityQntyPerDoseDetails(IsVisible: boolean): void {
    if (
      this.oIPVM.FormViewerDetails.TechValidateDetails.TechQntyPerDosVisible == Visibility.Collapsed
    ) {
      let strImagesource: string = MedImage.GetPath('icon_upsmall.png');
      let strDisImagesource: string = MedImage.GetPath('icon_downsmalldis.png');
      this.btnAddInfo.ChangeImage(
        strImagesource,
        strImagesource,
        strDisImagesource
      );
      this.oIPVM.FormViewerDetails.TechValidateDetails.TechQntyPerDosVisible = Visibility.Visible;
    } else if (!IsVisible) {
      let strImagesource: string = MedImage.GetPath('icon_downsmallhot.png');
      let strDisImagesource: string = MedImage.GetPath('icon_downsmalldis.png');
      this.btnAddInfo.ChangeImage(
        strImagesource,
        strImagesource,
        strDisImagesource
      );
      this.oIPVM.FormViewerDetails.TechValidateDetails.TechQntyPerDosVisible = Visibility.Collapsed;
    }
  }
  txtTotalQuantity_LostFocus_Func = (s, e) => { this.txtTotalQuantity_LostFocus(s, e); }
  private txtTotalQuantity_LostFocus(sender: Object, e: RoutedEventArgs): void {
    if (
      sender instanceof iTextBox &&
      ObjectHelper.CreateType<iTextBox>(sender, iTextBox) != null &&
      !String.IsNullOrEmpty(ObjectHelper.CreateType<iTextBox>(sender, iTextBox).Text) &&
      String.Equals(ObjectHelper.CreateType<iTextBox>(sender, iTextBox).Text, '0')
    ) {
      this.VisibilityQntyPerDoseDetails(true);
    }
  }
  public SetSupDisToolTipValues(oVM: PrescriptionItemVM): void {
    let sSupText: string = String.Empty;
    let sSupValue: string = String.Empty;
    if (
      this.oIPVM.FormViewerDetails.BasicDetails.SelectedsupplyInstruction != null &&
      this.oIPVM.FormViewerDetails.BasicDetails.SelectedsupplyInstruction.Count > 0
    ) {
      this.oIPVM.FormViewerDetails.BasicDetails.TechValiadteSupplyInstWithConactSemiColon(
        this.oIPVM.FormViewerDetails.BasicDetails.SelectedsupplyInstruction,
        (o1) => { sSupText = o1; },
        (o2) => { sSupValue = o2; }
      );
    }
    if (!String.IsNullOrEmpty(sSupText)) {
      if (
        this.oIPVM.FormViewerDetails != null &&
        this.oIPVM.FormViewerDetails.BasicDetails != null &&
        this.oIPVM.FormViewerDetails.BasicDetails.InfusionDetails != null &&
        this.oIPVM.FormViewerDetails.BasicDetails.InfusionDetails
          .FluidPrescribableItemListOID <= 0 &&
        !String.Equals(
          this.oIPVM.FormViewerDetails.BasicDetails.itemSubType,
          CConstants.SUBTYPE,
          StringComparison.InvariantCultureIgnoreCase
        )
      ) {
        this.oIPVM.SupDisText = Resource.TechValidate.SupplyDisp_Update_Text;
        oVM.supToolTipDisText = 'Supply instructions - ' + sSupText;
      } else {
        oVM.supToolTipDisText = Resource.TechValidate.SupplyIns_ToolTip;
      }
    } else {
      if (
        this.oIPVM.FormViewerDetails != null &&
        this.oIPVM.FormViewerDetails.BasicDetails != null &&
        this.oIPVM.FormViewerDetails.BasicDetails.InfusionDetails != null &&
        this.oIPVM.FormViewerDetails.BasicDetails.InfusionDetails
          .FluidPrescribableItemListOID <= 0 &&
        !String.Equals(
          this.oIPVM.FormViewerDetails.BasicDetails.itemSubType,
          CConstants.SUBTYPE,
          StringComparison.InvariantCultureIgnoreCase
        )
      ) {
        this.oIPVM.SupDisText = Resource.TechValidate.SupplyDisp_Add_Text;
        this.oIPVM.supToolTipDisText = Resource.TechValidate.Addsupinst;
      } else {
        this.oIPVM.supToolTipDisText = Resource.TechValidate.AddsupinstChild;
      }
    }
    if (!String.IsNullOrEmpty(sSupValue)) {
      this.oIPVM.FormViewerDetails.BasicDetails.TechsupplyInstText = sSupValue;
    }
    if (this.oIPVM.FormViewerDetails.TechValidateDetails != null) {
      this.oIPVM.FormViewerDetails.TechValidateDetails.supplyinstrtext =
        sSupText;
      this.oIPVM.FormViewerDetails.TechValidateDetails.supplyinstrvalue =
        sSupValue;
    }
  }
  public SetDefaultValues(): void {
    let sSupplyInstTooltip: string = String.Empty;
    if (
      this.oIPVM != null &&
      this.oIPVM.FormViewerDetails != null &&
      this.oIPVM.FormViewerDetails.BasicDetails != null
    ) {
      if (
        this.oIPVM.FormViewerDetails.BasicDetails.SelectedsupplyInstruction !=
          null &&
        this.oIPVM.FormViewerDetails.BasicDetails.SelectedsupplyInstruction
          .Count > 0
      ) {
        let sText: string = String.Empty;
        let sValue: string = String.Empty;
        this.oIPVM.FormViewerDetails.BasicDetails.TechValiadteSupplyInstWithConactSemiColon(
          this.oIPVM.FormViewerDetails.BasicDetails.SelectedsupplyInstruction,
          (o1) => {
            sText = o1;
          },
          (o2) => {
            sValue = o2;
          }
        );
        if (this.oIPVM.FormViewerDetails.TechValidateDetails != null) {
          this.oIPVM.FormViewerDetails.TechValidateDetails.supplyinstrtext =
            !String.IsNullOrEmpty(sText) ? sText : String.Empty;
          this.oIPVM.FormViewerDetails.TechValidateDetails.supplyinstrvalue =
            !String.IsNullOrEmpty(sValue) ? sValue : String.Empty;
          this.oIPVM.FormViewerDetails.TechValidateDetails.SupplyComments =
            String.Empty;
          if (
            !String.IsNullOrEmpty(
              this.oIPVM.FormViewerDetails.BasicDetails.Supplycomments
            )
          ) {
            this.oIPVM.FormViewerDetails.TechValidateDetails.SupplyComments =
              String.Empty;
            this.oIPVM.FormViewerDetails.TechValidateDetails.SupplyComments =
              this.oIPVM.FormViewerDetails.BasicDetails.Supplycomments;
          }
        }
        this.oIPVM.FormViewerDetails.TechValidateDetails.ProductSelectedsupplyInstruction =
          null;
      } else if (
        !String.IsNullOrEmpty(
          this.oIPVM.FormViewerDetails.BasicDetails.SupplyInsText
        ) &&
        !this.oIPVM.FormViewerDetails.BasicDetails.FollowUpStatLaunch.Equals(
          'S'
        ) &&
        this.oIPVM.FormViewerDetails.TechValidateDetails != null
      ) {
        this.oIPVM.FormViewerDetails.TechValidateDetails.supplyinstrtext =
          this.oIPVM.FormViewerDetails.BasicDetails.SupplyInsText;
        this.oIPVM.FormViewerDetails.TechValidateDetails.supplyinstrvalue =
          this.oIPVM.FormViewerDetails.BasicDetails.SupplyInsVal;
        this.oIPVM.FormViewerDetails.TechValidateDetails.SupplyComments =
          String.Empty;
        if (
          !String.IsNullOrEmpty(
            this.oIPVM.FormViewerDetails.BasicDetails.Supplycomments
          )
        ) {
          this.oIPVM.FormViewerDetails.TechValidateDetails.SupplyComments =
            String.Empty;
          this.oIPVM.FormViewerDetails.TechValidateDetails.SupplyComments =
            this.oIPVM.FormViewerDetails.BasicDetails.Supplycomments;
        } else {
          this.oIPVM.FormViewerDetails.TechValidateDetails.SupplyComments =
            String.Empty;
          this.oIPVM.FormViewerDetails.TechValidateDetails.SupplyInsTextWithComments =
            Resource.TechValProdOpt.SelectSupInstrution;
        }
      } else {
        if (this.oIPVM.FormViewerDetails.TechValidateDetails != null) {
          this.oIPVM.FormViewerDetails.TechValidateDetails.supplyinstrtext =
            'Select supply instructions to enter value(s)';
          this.oIPVM.FormViewerDetails.TechValidateDetails.supplyinstrvalue =
            String.Empty;
          this.oIPVM.FormViewerDetails.TechValidateDetails.SupplyComments =
            String.Empty;
          this.oIPVM.FormViewerDetails.TechValidateDetails.SupplyInsTextWithComments =
            Resource.TechValProdOpt.SelectSupInstrution;
        }
      }
      if (
        !String.IsNullOrEmpty(sSupplyInstTooltip) &&
        this.oIPVM.ActionCode == ActivityTypes.Amend
      ) {
        if (
          this.oIPVM.FormViewerDetails != null &&
          this.oIPVM.FormViewerDetails.BasicDetails != null &&
          this.oIPVM.FormViewerDetails.BasicDetails.InfusionDetails != null &&
          this.oIPVM.FormViewerDetails.BasicDetails.InfusionDetails
            .FluidPrescribableItemListOID <= 0 &&
          !String.Equals(
            this.oIPVM.FormViewerDetails.BasicDetails.itemSubType,
            CConstants.SUBTYPE,
            StringComparison.InvariantCultureIgnoreCase
          )
        ) {
          this.oIPVM.supToolTipDisText =
            Resource.TechValidate.Supplyinst + sSupplyInstTooltip;
        } else {
          this.oIPVM.supToolTipDisText =
            Resource.TechValidate.SupplyIns_ToolTip;
        }
      }
      let lblSupTooltip: iLabel = new iLabel();
      if (this.oIPVM.FormViewerDetails.TechValidateDetails != null) {
        lblSupTooltip.Text =
          this.oIPVM.FormViewerDetails.TechValidateDetails.supplyinstrtext;
      }
      lblSupTooltip.IsWordwrap = true;
      lblSupTooltip.Width = 250;
      if (this.oIPVM != null && this.oIPVM.iSSupplyrequest != null) {
        if (
          this.oIPVM.SelectedSupplyreq != null &&
          !String.IsNullOrEmpty(this.oIPVM.SelectedSupplyreq.Value)
        ) {
          let objselectedval: CListItem = this.oIPVM.iSSupplyrequest
            .Where(
              (x) =>
                !String.IsNullOrEmpty(x.Value) &&
                String.Equals(x.Value, this.oIPVM.SelectedSupplyreq.Value)
            )
            .FirstOrDefault();
          this.oIPVM.SelectedSupplyreq = objselectedval;
        } else {
          let objselectedval: CListItem = this.oIPVM.iSSupplyrequest
            .Where(
              (x) =>
                !String.IsNullOrEmpty(x.Value) &&
                String.Equals(x.Value, Resource.TechValidate.Empty)
            )
            .FirstOrDefault();
          this.oIPVM.SelectedSupplyreq = objselectedval;
        }
      }
    }
  }
  public AddClick(): boolean {
    if(!this.oIPVM){
      Object.keys(that).forEach((prop) => (this[prop] = that[prop]));
    }
    if (this.grdPrescribe.GetRowCount() <= 0) return false;
    if (
      this.oIPVM.FormViewerDetails.TechValidateDetails.TechValidatedItems ==
      null
    ) {
      this.oIPVM.FormViewerDetails.TechValidateDetails.TechValidatedItems =
        new ObservableCollection<CustomTechValidatedItem>();
    }
    if (
      this.oPrescItemVM != null &&
      this.oPrescItemVM.FormViewerDetails != null &&
      this.oPrescItemVM.FormViewerDetails.TechValidateDetails != null
    )
      this.oIPVM.FormViewerDetails.TechValidateDetails =
        this.oPrescItemVM.FormViewerDetails.TechValidateDetails;
    let oNewItem: CustomTechValidatedItem = new CustomTechValidatedItem();
    let oTech: DrugItemBasicInfo = new DrugItemBasicInfo();
    try {
      oTech = ObjectHelper.CreateType<DrugItemBasicInfo>(
        this.grdPrescribe.GetCurrentRowData(),
        DrugItemBasicInfo
      );
    } catch (err) {
      oTech = null;
    }

    if (oTech == null) {
      iMessageBox.Show(
        this._MsgBoxTitle,
        'Please select the product option',
        MessageBoxType.Critical,
        MessageBoxButton.OK
      );
      return false;
    }
    if (!this.TechValidateFn()) return false;
    if (this.duplicatecheck(oTech.IdentifyingOID, 'N')) {
      if (this.oIPVM != null) {
        if (this.oIPVM.ActionCode == ActivityTypes.Amend) {
          if (
            String.Compare(
              this.oIPVM.FormViewerDetails.BasicDetails.itemSubType,
              'CC_MULCMPNTITM',
              StringComparison.InvariantCultureIgnoreCase
            ) != 0
          ) {
            this.oIPVM.IsReasonForModificationVisible = Visibility.Visible;
            this.oIPVM.FormViewerDetails.BasicDetails.IsenableRSNFORMOD = true;
            this.oIPVM.FormViewerDetails.BasicDetails.IsRsnEnabForTechval =
              true;
          }
        }
      }
      if (this.bMultiCompChild) {
        oNewItem.bMultiCompChilds = true;
      }
      oNewItem.DrugItem = new ManagePrescSer.DrugItemBasicData();
      oNewItem.DrugItem.IdentifyingName = oTech.IdentifyingName;
      oNewItem.DrugItem.IdentifyingOID = oTech.IdentifyingOID;
      oNewItem.IsWardStock = oTech.IsWardStock;
      oNewItem.DrugItem.IdentifyingType = oTech.IdentifyingType;
      if (this.oIPVM.PresMultiCompitemOID > 0)
        oNewItem.DrugItem.PrescribableItemListOID =
          this.oIPVM.PresMultiCompitemOID;
      else
        oNewItem.DrugItem.PrescribableItemListOID =
          this.oIPVM.PrescriptionItemOID;
      oNewItem.DrugItem.MCVersionNo = oTech.MCVersionNo;
      this.oIPVM.FormViewerDetails.TechValidateDetails.SetTechDetails(
        oNewItem,
        'ADD'
      );
      oNewItem.OperationMode = 'N';
      oNewItem.IsDoseCombinationsDefined = '1';
      this.oIPVM.EditedGridID = 1;
      this.oIPVM.IsProdOptChange = 1;
      this.oIPVM.FormViewerDetails.TechValidateDetails.Technicalvalidateupdate =
        true;
      oNewItem.MCIdentifyingOID =
        this.oIPVM.FormViewerDetails.BasicDetails.IdentifyingOID;
      this.oIPVM.FormViewerDetails.TechValidateDetails.TechValidatedItems.Add(
        oNewItem
      );
      this.grdDosecombinations.SetBinding('data', this.oIPVM.FormViewerDetails.TechValidateDetails.TechValidatedItems);
      if (this.oIPVM.IsTechValidateMandatory)
        this.oIPVM.SetTechvalImageStatus();
      if (
        ProfileData.AdditionalPrescConfig != null &&
        ProfileData.AdditionalPrescConfig.EnableWardStockConfig &&
        !String.IsNullOrEmpty(oNewItem.TotalQuantity) &&
        !oNewItem.TotalQuantity.Equals('0') &&
        Convert.ToDouble(oNewItem.TotalQuantity) > 0 &&
        String.Equals(
          this.oIPVM.SelectedSupplyreq.Value,
          'CC_Empty',
          StringComparison.InvariantCultureIgnoreCase
        )
      ) {
        let cnt: number = oNewItem.selectedSupplyInstruction.Count;
        let IsDNDinList: boolean = false;
        for (let i: number = 0; i < cnt; i++) {
          IsDNDinList =
            FormviewerComboValues.SupplyInstr.Where(
              (x) =>
                x.Value.Equals(oNewItem.selectedSupplyInstruction[i].Value) &&
                x.ConceptProperties != null &&
                x.ConceptProperties.Where((y) =>
                  y.Name.Equals('DONOTDSPMED')
                ).Count() > 0
            ).Count() > 0;
          if (IsDNDinList) break;
        }
        if (!IsDNDinList) {
          let supply: CListItem = this.oIPVM.iSSupplyrequest
            .Where(
              (x) =>
                !String.IsNullOrEmpty(x.Value) &&
                String.Equals(
                  x.Value,
                  CConstants.Supplycode,
                  StringComparison.InvariantCultureIgnoreCase
                )
            )
            .FirstOrDefault();
          this.oIPVM.SelectedSupplyreq = supply;
        }
      }
      if (
        String.IsNullOrEmpty(
          this.oIPVM.FormViewerDetails.BasicDetails.TecValOperationMode
        ) &&
        String.Equals(
          ContextInfo.MenuCode,
          CConstants.ClinicallyVerifyMenuCode,
          StringComparison.InvariantCultureIgnoreCase
        )
      ) {
        this.oIPVM.FormViewerDetails.BasicDetails.TecValOperationMode = 'N';
      }
      if (!this.bMultiCompChild) {
        if (
          this.oIPVM.FormViewerDetails.TechValidateDetails.SelectedPrescItem
            .FormViewerDetails != null &&
          this.oIPVM.FormViewerDetails.TechValidateDetails.SelectedPrescItem
            .FormViewerDetails.TechValidateDetails != null &&
          this.oIPVM.FormViewerDetails.TechValidateDetails.SelectedPrescItem
            .FormViewerDetails.TechValidateDetails.TechValidatedItems != null
        ) {
          if (
            this.oIPVM.FormViewerDetails.TechValidateDetails.SelectedPrescItem
              .FormViewerDetails.TechValidateDetails.TechValidatedItems.Count >
            0
          ) {
            if (this.oPreObj == null) {
              this.oPreObj = new PrescriptionItemVM();
              if (this.oPreObj.FormViewerDetails == null)
                this.oPreObj.FormViewerDetails = new FormViewerVM();
              for (
                let i: number = 0;
                i <
                this.oIPVM.FormViewerDetails.TechValidateDetails
                  .PresTechValidatedItems[0].FormViewerDetails
                  .TechValidateDetails.TechValidatedItems.Count;
                i++
              ) {
                this.oPreObj.FormViewerDetails.TechValidatedFVMItems =
                  new ObservableCollection<CustomTechValidatedItem>();
                this.oPreObj.FormViewerDetails.TechValidatedFVMItems.Add(
                  this.oIPVM.FormViewerDetails.TechValidateDetails
                    .PresTechValidatedItems[0].FormViewerDetails
                    .TechValidateDetails.TechValidatedItems[i]
                );
                this.bParentItm = true;
              }
            }
          }
        }
      }
      this.ClearControls();
      if (
        this.oIPVM != null &&
        this.oIPVM.FormViewerDetails != null &&
        this.oIPVM.FormViewerDetails.BasicDetails != null
      ) {
        this.oIPVM.FormViewerDetails.BasicDetails.DoClinicallyVerify();
        this.oIPVM.bIsSupplyDispensingInstructionSet = false;
      }
      return true;
    } else {
      this.ClearControls();
      return false;
    }
  }

  cmdAdd_Click_Func = (s, e) => { 
    Object.keys(that).forEach((prop) => (this[prop] = that[prop]));
    this.cmdAdd_Click(s, e);
  }
  private cmdAdd_Click(sender: Object, e: RoutedEventArgs): void {
    this.AddClick();
  }
  public TechValidateFn(): boolean {
    if (
      this.oIPVM != null &&
      this.oIPVM.FormViewerDetails != null &&
      this.oIPVM.FormViewerDetails.TechValidateDetails != null &&
      this.oIPVM.FormViewerDetails.TechValidateDetails
        .launchTechvalsupplyinstrmezzanineCheck
    ) {
      return false;
    }
    let sQtyMsg: string = String.Empty;
    if (this.oIPVM != null) {
      if (
        this.oIPVM.IsTechValidateMandatory &&
        this.oIPVM.IsFormviewTechValtabMandatory
      ) {
        if (
          String.IsNullOrEmpty(
            this.oIPVM.FormViewerDetails.TechValidateDetails.TotalQuantity
          )
        ) {
          sQtyMsg = Resource.TechValProdOpt.Totquantity;
          this.sMandMsgChck = 'TotQtyVal';
          this.QuntityMandatoryMSG(sQtyMsg);
          return false;
        }
      }
      if (
        ((String.Equals(
          PatientContext.PrescriptionType,
          PrescriptionTypes.Discharge,
          StringComparison.InvariantCultureIgnoreCase
        ) ||
          String.Equals(
            PatientContext.PrescriptionType,
            PrescriptionTypes.Outpatient,
            StringComparison.InvariantCultureIgnoreCase
          ) ||
          String.Equals(
            PatientContext.PrescriptionType,
            PrescriptionTypes.Leave,
            StringComparison.InvariantCultureIgnoreCase
          )) &&
          !String.IsNullOrEmpty(
            this.oIPVM.FormViewerDetails.TechValidateDetails.TotalQuantity
          ) &&
          Convert.ToDouble(
            this.oIPVM.FormViewerDetails.TechValidateDetails.TotalQuantity
          ) > 0 &&
          String.IsNullOrEmpty(this.cboTotalQuantityUOM.GetText()) &&
          String.IsNullOrEmpty(this.cboTotalQuantityUOM.GetValue())) ||
        ((String.Equals(
          PatientContext.PrescriptionType,
          PrescriptionTypes.Clerking,
          StringComparison.InvariantCultureIgnoreCase
        ) ||
          String.Equals(
            PatientContext.PrescriptionType,
            PrescriptionTypes.ForAdministration,
            StringComparison.InvariantCultureIgnoreCase
          ) ||
          String.Equals(
            PatientContext.PrescriptionType,
            PrescriptionTypes.Inpatient,
            StringComparison.InvariantCultureIgnoreCase
          )) &&
          String.IsNullOrEmpty(this.cboTotalQuantityUOM.GetText()) &&
          String.IsNullOrEmpty(this.cboTotalQuantityUOM.GetValue()) &&
          !String.IsNullOrEmpty(
            this.oIPVM.FormViewerDetails.TechValidateDetails.TotalQuantity
          ))
      ) {
        sQtyMsg = Resource.TechValProdOpt.TotalUOM;
        this.sMandMsgChck = 'TotQtyUom';
        this.QuntityMandatoryMSG(sQtyMsg);
        return false;
      } else if (
        ((String.Equals(
          PatientContext.PrescriptionType,
          PrescriptionTypes.Discharge,
          StringComparison.InvariantCultureIgnoreCase
        ) ||
          String.Equals(
            PatientContext.PrescriptionType,
            PrescriptionTypes.Outpatient,
            StringComparison.InvariantCultureIgnoreCase
          ) ||
          String.Equals(
            PatientContext.PrescriptionType,
            PrescriptionTypes.Leave,
            StringComparison.InvariantCultureIgnoreCase
          )) &&
          !String.IsNullOrEmpty(this.cboTotalQuantityUOM.GetText()) &&
          !String.IsNullOrEmpty(this.cboTotalQuantityUOM.GetValue()) &&
          String.IsNullOrEmpty(
            this.oIPVM.FormViewerDetails.TechValidateDetails.TotalQuantity
          )) ||
        ((String.Equals(
          PatientContext.PrescriptionType,
          PrescriptionTypes.Clerking,
          StringComparison.InvariantCultureIgnoreCase
        ) ||
          String.Equals(
            PatientContext.PrescriptionType,
            PrescriptionTypes.ForAdministration,
            StringComparison.InvariantCultureIgnoreCase
          ) ||
          String.Equals(
            PatientContext.PrescriptionType,
            PrescriptionTypes.Inpatient,
            StringComparison.InvariantCultureIgnoreCase
          )) &&
          !String.IsNullOrEmpty(this.cboTotalQuantityUOM.GetText()) &&
          !String.IsNullOrEmpty(this.cboTotalQuantityUOM.GetValue()) &&
          String.IsNullOrEmpty(
            this.oIPVM.FormViewerDetails.TechValidateDetails.TotalQuantity
          ))
      ) {
        sQtyMsg = Resource.TechValProdOpt.Totquantity;
        this.sMandMsgChck = 'TotQtyVal';
        this.QuntityMandatoryMSG(sQtyMsg);
        return false;
      }
      if (
        ((String.Equals(
          PatientContext.PrescriptionType,
          PrescriptionTypes.Discharge,
          StringComparison.InvariantCultureIgnoreCase
        ) ||
          String.Equals(
            PatientContext.PrescriptionType,
            PrescriptionTypes.Outpatient,
            StringComparison.InvariantCultureIgnoreCase
          ) ||
          String.Equals(
            PatientContext.PrescriptionType,
            PrescriptionTypes.Leave,
            StringComparison.InvariantCultureIgnoreCase
          )) &&
          !String.IsNullOrEmpty(
            this.oIPVM.FormViewerDetails.TechValidateDetails.Quantity
          ) &&
          Convert.ToDouble(
            this.oIPVM.FormViewerDetails.TechValidateDetails.Quantity
          ) > 0 &&
          String.IsNullOrEmpty(this.cboQuantityPerDoseUOM.GetText()) &&
          String.IsNullOrEmpty(this.cboQuantityPerDoseUOM.GetValue())) ||
        ((String.Equals(
          PatientContext.PrescriptionType,
          PrescriptionTypes.Clerking,
          StringComparison.InvariantCultureIgnoreCase
        ) ||
          String.Equals(
            PatientContext.PrescriptionType,
            PrescriptionTypes.ForAdministration,
            StringComparison.InvariantCultureIgnoreCase
          ) ||
          String.Equals(
            PatientContext.PrescriptionType,
            PrescriptionTypes.Inpatient,
            StringComparison.InvariantCultureIgnoreCase
          )) &&
          String.IsNullOrEmpty(this.cboQuantityPerDoseUOM.GetText()) &&
          String.IsNullOrEmpty(this.cboQuantityPerDoseUOM.GetValue()) &&
          !String.IsNullOrEmpty(
            this.oIPVM.FormViewerDetails.TechValidateDetails.Quantity
          ))
      ) {
        sQtyMsg = Resource.TechValProdOpt.QuantityUOM;
        this.sMandMsgChck = 'QtyUom';
        this.QuntityMandatoryMSG(sQtyMsg);
        return false;
      } else if (
        ((String.Equals(
          PatientContext.PrescriptionType,
          PrescriptionTypes.Discharge,
          StringComparison.InvariantCultureIgnoreCase
        ) ||
          String.Equals(
            PatientContext.PrescriptionType,
            PrescriptionTypes.Outpatient,
            StringComparison.InvariantCultureIgnoreCase
          ) ||
          String.Equals(
            PatientContext.PrescriptionType,
            PrescriptionTypes.Leave,
            StringComparison.InvariantCultureIgnoreCase
          )) &&
          !String.IsNullOrEmpty(this.cboQuantityPerDoseUOM.GetText()) &&
          !String.IsNullOrEmpty(this.cboQuantityPerDoseUOM.GetValue()) &&
          String.IsNullOrEmpty(
            this.oIPVM.FormViewerDetails.TechValidateDetails.Quantity
          )) ||
        ((String.Equals(
          PatientContext.PrescriptionType,
          PrescriptionTypes.Clerking,
          StringComparison.InvariantCultureIgnoreCase
        ) ||
          String.Equals(
            PatientContext.PrescriptionType,
            PrescriptionTypes.ForAdministration,
            StringComparison.InvariantCultureIgnoreCase
          ) ||
          String.Equals(
            PatientContext.PrescriptionType,
            PrescriptionTypes.Inpatient,
            StringComparison.InvariantCultureIgnoreCase
          )) &&
          !String.IsNullOrEmpty(this.cboQuantityPerDoseUOM.GetText()) &&
          !String.IsNullOrEmpty(this.cboQuantityPerDoseUOM.GetValue()) &&
          String.IsNullOrEmpty(
            this.oIPVM.FormViewerDetails.TechValidateDetails.Quantity
          ))
      ) {
        sQtyMsg = Resource.TechValProdOpt.Quantityperdose;
        this.sMandMsgChck = 'QtyVal';
        this.QuntityMandatoryMSG(sQtyMsg);
        return false;
      }
      if (
        this.oIPVM.FormViewerDetails.TechValidateDetails
          .IsMandatoryTechValSupplyInstr &&
        (String.IsNullOrEmpty(
          this.oIPVM.FormViewerDetails.TechValidateDetails.supplyinstrvalue
        ) ||
          this.oIPVM.FormViewerDetails.TechValidateDetails.supplyinstrvalue ==
            '' ||
          String.Equals(
            this.oIPVM.FormViewerDetails.TechValidateDetails
              .SupplyInsTextWithComments,
            'Select supply instructions to enter value(s)',
            StringComparison.InvariantCultureIgnoreCase
          ))
      ) {
        sQtyMsg = Resource.TechValProdOpt.SupplyInstMand;
        this.lblSupplyInst.Focus();
        this.sMandMsgChck = 'Supplyinstr';
        this.QuntityMandatoryMSG(sQtyMsg);
        return false;
      }
    }
    if (
      String.Equals(
        PatientContext.PrescriptionType,
        PrescriptionTypes.Discharge,
        StringComparison.InvariantCultureIgnoreCase
      ) ||
      String.Equals(
        PatientContext.PrescriptionType,
        PrescriptionTypes.Outpatient,
        StringComparison.InvariantCultureIgnoreCase
      ) ||
      String.Equals(
        PatientContext.PrescriptionType,
        PrescriptionTypes.Leave,
        StringComparison.InvariantCultureIgnoreCase
      )
    ) {
      if (
        String.IsNullOrEmpty(
          this.oIPVM.FormViewerDetails.TechValidateDetails.TotalQuantity
        ) &&
        !String.IsNullOrEmpty(
          this.oIPVM.FormViewerDetails.TechValidateDetails.Quantity
        ) &&
        Convert.ToDouble(
          this.oIPVM.FormViewerDetails.TechValidateDetails.Quantity
        ) == 0
      ) {
        this.oIPVM.FormViewerDetails.TechValidateDetails.TotalQuantity = '0';
      }
      if (
        String.IsNullOrEmpty(
          this.oIPVM.FormViewerDetails.TechValidateDetails.Quantity
        ) &&
        !String.IsNullOrEmpty(
          this.oIPVM.FormViewerDetails.TechValidateDetails.TotalQuantity
        ) &&
        Convert.ToDouble(
          this.oIPVM.FormViewerDetails.TechValidateDetails.TotalQuantity
        ) == 0
      ) {
        this.oIPVM.FormViewerDetails.TechValidateDetails.Quantity = '0';
      }
    }
    return true;
  }
  private QuntityMandatoryMSG(sQtyMsg: string): void {
    if (!String.IsNullOrEmpty(sQtyMsg)) {
      let objMsgQty: iMessageBox = new iMessageBox();
      objMsgQty.Message = sQtyMsg;
      objMsgQty.MessageButton = MessageBoxButton.OK;
      objMsgQty.Title = this._MsgBoxTitle;
      objMsgQty.MessageBoxClose = (s, e) => {
        this.objMsg2_MessageBoxClose(s, e);
      };
      objMsgQty.IconType = MessageBoxType.Critical;
      objMsgQty.Show();
    }
  }
  objMsg2_MessageBoxClose(sender: Object, e: MessageEventArgs): void {
    if (String.Equals(this.sMandMsgChck, 'TotQtyVal'))
      this.txtTotalQuantity.Focus();
    else if (String.Equals(this.sMandMsgChck, 'TotQtyUom'))
      this.cboTotalQuantityUOM.Focus();
    else if (String.Equals(this.sMandMsgChck, 'QtyVal'))
      this.txtQuantity.Focus();
    else if (String.Equals(this.sMandMsgChck, 'QtyUom'))
      this.cboQuantityPerDoseUOM.Focus();
    else if (String.Equals(this.sMandMsgChck, 'Supplyinstr')) {
      this.lblSupplyInstValue_MouseLeftButtonUp(null, null);
      if (
        this.oIPVM.FormViewerDetails.TechValidateDetails
          .TechQntyPerDosVisible == Visibility.Collapsed
      ) {
        let strImagesource: string = MedImage.GetPath('icon_upsmall.png');
        let strDisImagesource: string = MedImage.GetPath(
          'icon_downsmalldis.png'
        );
        this.btnAddInfo.ChangeImage(
          strImagesource,
          strImagesource,
          strDisImagesource
        );
        this.oIPVM.FormViewerDetails.TechValidateDetails.TechQntyPerDosVisible = Visibility.Visible;
      }
    }
  }
  cmdCatalogueOptions_Click_Func = (s, e) => { 
    Object.keys(that).forEach((prop) => (this[prop] = that[prop]));
    this.cmdCatalogueOptions_Click(s, e); 
  }
  private cmdCatalogueOptions_Click(sender: Object, e: RoutedEventArgs): void {
    this.oPrescItemVM = ObjectHelper.CreateType<PrescriptionItemVM>(
      this.DataContext,
      PrescriptionItemVM
    );
    if (
      this.oPrescItemVM != null &&
      this.oPrescItemVM.FormViewerDetails != null &&
      this.oPrescItemVM.FormViewerDetails.TechValidateDetails != null
    ) {
      if (
        this.oPrescItemVM.FormViewerDetails.TechValidateDetails
          .SelectedPrescItem != null
      )
        this.oPrescItemVM.FormViewerDetails.TechValidateDetails.SelectedPrescItem.IsNonformulary =
          '0';
      if (
        this.oPrescItemVM.FormViewerDetails.TechValidateDetails
          .SelectedChildPresItem != null
      ) {
        this.oPrescItemVM.FormViewerDetails.TechValidateDetails.SelectedChildPresItem.IsNonformulary =
          '0';
      }
      if (
        this.oPrescItemVM.FormViewerDetails.TechValidateDetails
          .SelectedPrescItem != null &&
        this.oPrescItemVM.FormViewerDetails.TechValidateDetails
          .SelectedPrescItem.FormViewerDetails != null &&
        this.oPrescItemVM.FormViewerDetails.TechValidateDetails
          .SelectedPrescItem.FormViewerDetails.BasicDetails != null
      ) {
        if (this.oPrescItemVM.TechValSplitter == Visibility.Visible)
          this.oPrescItemVM.FormViewerDetails.TechValidateDetails.GetProductOptions();
      }
    }
    this.cmdCatalogueOptions.Visibility = Visibility.Collapsed;
    this.cmdFormularyOptions.Visibility = Visibility.Visible;
    //this.grdPrescribeSelectedItemUpdate(); //commented as suggested by Vishnu 16-10
  }

  cmdFormularyOptions_Click_Func = (s, e) => { 
    Object.keys(that).forEach((prop) => (this[prop] = that[prop])); 
    this.cmdFormularyOptions_Click(s, e); 
  }
  private cmdFormularyOptions_Click(sender: Object, e: RoutedEventArgs): void {
    this.oPrescItemVM = ObjectHelper.CreateType<PrescriptionItemVM>(
      this.DataContext,
      PrescriptionItemVM
    );
    if (
      this.oPrescItemVM != null &&
      this.oPrescItemVM.FormViewerDetails != null &&
      this.oPrescItemVM.FormViewerDetails.TechValidateDetails != null
    ) {
      if (
        this.oPrescItemVM.FormViewerDetails.TechValidateDetails
          .SelectedPrescItem != null
      )
        this.oPrescItemVM.FormViewerDetails.TechValidateDetails.SelectedPrescItem.IsNonformulary =
          '1';
      if (
        this.oPrescItemVM.FormViewerDetails.TechValidateDetails
          .SelectedChildPresItem != null
      ) {
        this.oPrescItemVM.FormViewerDetails.TechValidateDetails.SelectedChildPresItem.IsNonformulary =
          '1';
      }
      if (
        this.oPrescItemVM.FormViewerDetails.TechValidateDetails
          .SelectedPrescItem != null &&
        this.oPrescItemVM.FormViewerDetails.TechValidateDetails
          .SelectedPrescItem.FormViewerDetails != null &&
        this.oPrescItemVM.FormViewerDetails.TechValidateDetails
          .SelectedPrescItem.FormViewerDetails.BasicDetails != null
      ) {
        if (this.oPrescItemVM.TechValSplitter == Visibility.Visible)
          this.oPrescItemVM.FormViewerDetails.TechValidateDetails.GetProductOptions();
      }
    }
    this.cmdCatalogueOptions.Visibility = Visibility.Visible;
    this.cmdFormularyOptions.Visibility = Visibility.Collapsed;
    //commented as suggested by Vishnu 16-10
    //this.grdPrescribeSelectedItemUpdate(); 
  }

  lblSupplyInstValue_MouseLeftButtonUp_Func = (s, e) => { this.lblSupplyInstValue_MouseLeftButtonUp(s, e); }
  private lblSupplyInstValue_MouseLeftButtonUp(
    sender: Object,
    e: MouseButtonEventArgs
  ): void {
    Object.keys(that).forEach((prop) => (this[prop] = that[prop]));
    if (!this.lblSupplyInst.IsEnabled) {
      return;
    } else {
      this.SupplyinstrDataAssign();
      this.oPrescItemVM.formViewerDetails.TechValidateDetails.ShowMultiSelectListWindow(
        ValueDomain.SupplyInstruction,
        this.lblSupplyInstValue.Text,
        this.lblSupplyInstText.Text
      );
    }
  }
  private SupplyinstrDataAssign(): void {
    if (this.oPrescItemVM == null) {
      this.oPrescItemVM = ObjectHelper.CreateType<PrescriptionItemVM>(
        this.DataContext,
        PrescriptionItemVM
      );
    }
    let Istypeindrug: boolean = false;
    if (
      this.oPrescItemVM != null &&
      this.oPrescItemVM.FormViewerDetails != null &&
      this.oPrescItemVM.FormViewerDetails.BasicDetails != null &&
      !String.IsNullOrEmpty(
        this.oPrescItemVM.FormViewerDetails.BasicDetails.IdentifyingName
      )
    ) {
      Istypeindrug =
        String.Equals(
          this.oPrescItemVM.FormViewerDetails.BasicDetails.IdentifyingType,
          CConstants.NONCATALOGUEITEM,
          StringComparison.InvariantCultureIgnoreCase
        ) ||
        String.Equals(
          this.oPrescItemVM.FormViewerDetails.BasicDetails.IdentifyingType,
          CConstants.Precatalog,
          StringComparison.InvariantCultureIgnoreCase
        )
          ? true
          : false;
    }
    if (this.oIPVM != null && this.oPrescItemVM != null) {
      this.oPrescItemVM.IsTechValidate = true;
      let SupplyInstruction: string = String.Empty;
      let SupplyInstructionSelected: string = String.Empty;
      let SupplyCommentsBasic: string = String.Empty;
      let SupplyCommentsSelected: string = String.Empty;
      let SupplyCommentsdisplayed: string = String.Empty;
      if (
        this.grdPrescribe != null &&
        this.grdPrescribe.Rows != null &&
        this.grdPrescribe.Rows.Count > 0 &&
        this.grdPrescribe.GetSelectedRowCount() > 0
      ) {
        let oTech: IPPManagePrescSer.DrugItemBasicInfo =
          ObjectHelper.CreateType<DrugItemBasicInfo>(
            this.grdPrescribe.GetCurrentRowData(),
            DrugItemBasicInfo
          );
        if (oTech != null && this.oIPVM != null) {
          this.oPrescItemVM.drugProductDetails = oTech;
        }
        if (
          this.oPrescItemVM.FormViewerDetails != null &&
          this.oIPVM.FormViewerDetails.TechValidateDetails != null
        ) {
          this.oPrescItemVM.FormViewerDetails.TechValidateDetails.FetchfrombasicDetails =
            true;
          if (
            !String.IsNullOrEmpty(
              this.oPrescItemVM.FormViewerDetails.TechValidateDetails
                .supplyinstrvalue
            ) &&
            this.oPrescItemVM.FormViewerDetails.TechValidateDetails.supplyinstrvalue.IndexOf(
              '~~'
            ) > 0
          ) {
            SupplyInstructionSelected =
              this.oPrescItemVM.FormViewerDetails.TechValidateDetails.supplyinstrvalue
                .Split('~~', StringSplitOptions.None)
                .FirstOrDefault();
          } else {
            SupplyInstructionSelected =
              this.oPrescItemVM.FormViewerDetails.TechValidateDetails
                .supplyinstrvalue;
          }
          if (this.oPrescItemVM.FormViewerDetails.TechValidateDetails != null) {
            if (
              String.Equals(
                this.oPrescItemVM.FormViewerDetails.BasicDetails.SupplyInsVal,
                SupplyInstructionSelected,
                StringComparison.InvariantCultureIgnoreCase
              ) ||
              (String.IsNullOrEmpty(
                this.oPrescItemVM.FormViewerDetails.BasicDetails.SupplyInsVal
              ) &&
                String.IsNullOrEmpty(SupplyInstructionSelected))
            ) {
              this.oPrescItemVM.FormViewerDetails.TechValidateDetails.ProductSelectedsupplyInstruction =
                null;
            }
          }
        }
      } else {
        if (this.grdPrescribe.Rows.Count == 1) {
          if (this.oPrescItemVM.FormViewerDetails.TechValidateDetails != null) {
            this.oPrescItemVM.FormViewerDetails.TechValidateDetails.FetchfrombasicDetails =
              true;
          }
        } else {
          if (this.oPrescItemVM.FormViewerDetails.TechValidateDetails != null) {
            this.oPrescItemVM.FormViewerDetails.TechValidateDetails.FetchfrombasicDetails =
              false;
          }
        }
      }
      if (
        this.grdDosecombinations != null &&
        this.grdDosecombinations.Rows != null &&
        this.grdDosecombinations.Rows.Count > 1 &&
        this.grdDosecombinations.GetSelectedRowCount() > 0
      ) {
        SupplyInstruction = String.Empty;
        SupplyInstructionSelected = String.Empty;
        SupplyCommentsBasic = String.Empty;
        SupplyCommentsSelected = String.Empty;
        SupplyCommentsdisplayed = String.Empty;
        if (
          this.oPrescItemVM.FormViewerDetails != null &&
          this.oPrescItemVM.FormViewerDetails.TechValidateDetails != null
        ) {
          this.oPrescItemVM.FormViewerDetails.TechValidateDetails.FetchfrombasicDetails =
            false;
        }
        let oUpdateItem: CustomTechValidatedItem =
          ObjectHelper.CreateType<CustomTechValidatedItem>(
            this.grdDosecombinations.GetCurrentRowData(),
            CustomTechValidatedItem
          );
        if (
          this.grdPrescribe.Rows.Count == 1 &&
          this.oPrescItemVM != null &&
          this.oPrescItemVM.drugProductDetails != null &&
          !String.IsNullOrEmpty(
            this.oPrescItemVM.drugProductDetails.IdentifyingName
          )
        ) {
          this.oPrescItemVM.drugProductDetails.IdentifyingName =
            oUpdateItem.DrugItem.IdentifyingName;
        }
        if (
          this.oPrescItemVM.FormViewerDetails != null &&
          this.oPrescItemVM.FormViewerDetails.BasicDetails != null
        ) {
          this.oPrescItemVM.FormViewerDetails.BasicDetails.CustomTechValidatedItem =
            oUpdateItem;
        }
        if (
          oUpdateItem != null &&
          oUpdateItem.selectedSupplyInstruction != null &&
          oUpdateItem.selectedSupplyInstruction.Count > 0
        ) {
          SupplyInstruction = String.Join(
            ';',
            oUpdateItem.selectedSupplyInstruction
              .Select((x) => x.Value)
              .ToArray()
          );
        }
        if (
          this.oPrescItemVM != null &&
          this.oPrescItemVM.FormViewerDetails != null &&
          this.oPrescItemVM.FormViewerDetails.TechValidateDetails != null
        ) {
          if (!String.IsNullOrEmpty(oUpdateItem.SupComments)) {
            SupplyCommentsBasic = oUpdateItem.SupComments;
          }
          if (
            !String.IsNullOrEmpty(
              this.oPrescItemVM.FormViewerDetails.TechValidateDetails
                .SupplyComments
            )
          ) {
            SupplyCommentsSelected =
              this.oPrescItemVM.FormViewerDetails.TechValidateDetails
                .SupplyComments;
          }
        }
        if (
          !String.IsNullOrEmpty(
            this.oPrescItemVM.FormViewerDetails.TechValidateDetails
              .supplyinstrvalue
          ) &&
          this.oPrescItemVM.FormViewerDetails.TechValidateDetails.supplyinstrvalue.IndexOf(
            '~~'
          ) > 0
        ) {
          SupplyInstructionSelected =
            this.oPrescItemVM.FormViewerDetails.TechValidateDetails.supplyinstrvalue
              .Split('~~', StringSplitOptions.None)
              .FirstOrDefault();
        } else {
          SupplyInstructionSelected =
            this.oPrescItemVM.FormViewerDetails.TechValidateDetails
              .supplyinstrvalue;
          if (String.IsNullOrEmpty(SupplyInstructionSelected)) {
            this.oPrescItemVM.FormViewerDetails.TechValidateDetails.IsNoInstructionsSelected =
              true;
          }
        }
        if (this.oPrescItemVM.FormViewerDetails.TechValidateDetails != null) {
          if (
            String.Equals(
              SupplyInstruction,
              SupplyInstructionSelected,
              StringComparison.InvariantCultureIgnoreCase
            ) &&
            !String.Equals(
              this.oPrescItemVM.FormViewerDetails.TechValidateDetails
                .SupplyInsTextWithComments,
              Resource.TechValProdOpt.SelectSupInstrution
            )
          ) {
            this.oPrescItemVM.FormViewerDetails.TechValidateDetails.ProductSelectedsupplyInstruction =
              null;
          }
          if (
            String.Equals(
              SupplyCommentsBasic,
              SupplyCommentsSelected,
              StringComparison.InvariantCultureIgnoreCase
            ) &&
            !String.Equals(
              this.oPrescItemVM.FormViewerDetails.TechValidateDetails
                .SupplyInsTextWithComments,
              Resource.TechValProdOpt.SelectSupInstrution
            )
          ) {
            SupplyCommentsdisplayed =
              this.oPrescItemVM.FormViewerDetails.TechValidateDetails
                .SupplyInsTextWithComments;
            this.oPrescItemVM.FormViewerDetails.TechValidateDetails.SupplyInsTextWithComments =
              SupplyCommentsdisplayed;
          }
        }
      }
    }
  }
  private SetSupplyDispIns(sSuppDispInst: string): void {
    if (
      String.Compare(
        sSuppDispInst,
        'Supply',
        StringComparison.OrdinalIgnoreCase
      ) == 0
    ) {
      let sSupplyVal: string = String.Empty;
      let sSupplyText: string = String.Empty;
      if (
        this.oIPVM != null &&
        this.oIPVM.FormViewerDetails != null &&
        this.oIPVM.FormViewerDetails.BasicDetails != null &&
        !String.IsNullOrEmpty(
          this.oIPVM.FormViewerDetails.BasicDetails.SupplyInsVal
        )
      ) {
        sSupplyVal = this.oIPVM.FormViewerDetails.BasicDetails.SupplyInsVal;
        sSupplyText = this.oIPVM.FormViewerDetails.BasicDetails.SupplyInsText;
      }
      this.oIPVM.FormViewerDetails.TechValidateDetails.ShowMultiSelectListWindow(
        ValueDomain.SupplyInstruction,
        sSupplyVal,
        sSupplyText
      );
    }
  }
  private duplicatecheck(OID: number, OpertionMode: string): boolean {
    let index: number = 0;
    let itemOid: number = 0;
    let rowVal: number = 0;
    let OPRMode: string = String.Empty;
    let itemName: string = String.Empty;
    if (this.grdDosecombinations.GetRowCount() > 0) {
      if (OpertionMode == 'M')
        index = this.grdDosecombinations.GetCurrentRowIndex();
      let sCurcount: number = this.grdDosecombinations.GetRowCount();
      for (let rcount: number = 1; rcount <= sCurcount; rcount++) {
        if (index == rcount) continue;
        let oUpdateItem: ManagePrescSer.TechValidatedItem =
          ObjectHelper.CreateType<ManagePrescSer.TechValidatedItem>(
            this.grdDosecombinations.GetRowData(rowVal),
            ManagePrescSer.TechValidatedItem
          );
        itemOid = oUpdateItem.DrugItem.IdentifyingOID;
        OPRMode = oUpdateItem.DrugItem.OperationMode;
        itemName = oUpdateItem.DrugItem.IdentifyingName;
        if (
          OID == itemOid &&
          String.Compare(OPRMode, 'ND', StringComparison.OrdinalIgnoreCase) !=
            0 &&
          String.Compare(OPRMode, 'D', StringComparison.OrdinalIgnoreCase) != 0
        ) {
          let oMsgBox: iMessageBox = new iMessageBox();
          oMsgBox.Title = this._MsgBoxTitle;
          oMsgBox.MessageButton = MessageBoxButton.OK;
          oMsgBox.IconType = MessageBoxType.Critical;
          oMsgBox.Message =  'This item is already added - ' + itemName + '' ;
          oMsgBox.Show();
          // iMessageBox.Show(
          //   this._MsgBoxTitle,
          //   'This item is already added - ' + itemName + '',
          //   MessageBoxType.Critical,
          //   MessageBoxButton.OK
          // );
          return false;
        }
        rowVal = rowVal + 1;
      }
      return true;
    }
    return true;
  }
  private GetStringValue(
    ObjectInfoCollection: ObservableCollection<ManagePrescSer.ObjectInfo>,
    OtherInstructions: string,
    sValueDomainCode: string,
    DisplayText: string,
    Value: string
  ): void {
    let strBuildText: StringBuilder = new StringBuilder();
    let strBuildValue: StringBuilder = new StringBuilder();
    if (ObjectInfoCollection != null && ObjectInfoCollection.Count > 0) {
      let nLen: number = ObjectInfoCollection.Count;
      let resultValue: string = String.Empty;
      for (let i: number = 0; i < nLen; i++) {
        let oListItems: ManagePrescSer.ObjectInfo =
          ObjectHelper.CreateType<ManagePrescSer.ObjectInfo>(
            ObjectInfoCollection[i],
            ManagePrescSer.ObjectInfo
          );
        if (
          String.Compare(sValueDomainCode, ValueDomain.SupplyInstruction) == 0
        )
          resultValue = Common.GetText(
            oListItems.Code,
            DomainValuesForTechValidate.SupplyInstructions
          );
        strBuildText.Append(resultValue);
        strBuildValue.Append(oListItems.Code);
        if (i < nLen - 1) {
          strBuildText.Append(';');
          strBuildValue.Append(';');
        }
      }
    }
    DisplayText = strBuildText.ToString();
    Value = strBuildValue.ToString();
  }
  grdDosecombinations_SelectionChanged(
    sender: Object,
    e: SelectionChangeEventArgs
  ): void {
    if (this._IsDeactivatedPerscItem) return;
    let oTech: CustomTechValidatedItem =
      ObjectHelper.CreateType<CustomTechValidatedItem>(
        this.grdDosecombinations.SelectedItem,
        CustomTechValidatedItem
      );
    let PrscCnt: number = 0;
    let IsMatchedTech: boolean = false;
    if (oTech == null) {
      this.ClearInputControls();
      this.cboQuantityPerDoseUOM.ItemsSource = null;
      this.cboTotalQuantityUOM.ItemsSource = null;
    } else {
      let rowcountpres: number = this.grdPrescribe.GetRowCount();
      if (rowcountpres > 0) {
        for (let count: number = 1; count <= rowcountpres; count++) {
          let objDrug: DrugItemBasicInfo =
            ObjectHelper.CreateType<DrugItemBasicInfo>(
              this.grdPrescribe.GetRowData(PrscCnt),
              DrugItemBasicInfo
            );
          if (
            objDrug.IdentifyingOID.ToString() ==
            oTech.DrugItem.IdentifyingOID.ToString()
          ) {
            this.txtQuantity.Text = String.Empty;
            this.txtTotalQuantity.Text = String.Empty;
            this.cboQuantityPerDoseUOM.SetValue('');
            this.cboTotalQuantityUOM.SetValue('');
            this.cboQuantityPerDoseUOM.ItemsSource = null;
            this.cboTotalQuantityUOM.ItemsSource = null;
            if (this.grdPrescribe.GetSelectedRowCount() > 0) {
              this.bRemoveSelection = true;
              this.grdPrescribe.UnselectAll();
            }
            this.PopulateUOMs(objDrug);
            IsMatchedTech = true;
          }
          PrscCnt = PrscCnt + 1;
        }
        if (!IsMatchedTech) {
          this.txtQuantity.Text = String.Empty;
          this.txtTotalQuantity.Text = String.Empty;
          this.cboQuantityPerDoseUOM.SetValue('');
          this.cboTotalQuantityUOM.SetValue('');
          this.cboQuantityPerDoseUOM.ItemsSource = null;
          this.cboTotalQuantityUOM.ItemsSource = null;
          this.oIPVM.FormViewerDetails.TechValidateDetails.QuantityUOMList =
            new ObservableCollection<CListItem>();
          this.oIPVM.FormViewerDetails.TechValidateDetails.TotalQuantityUOMList =
            new ObservableCollection<CListItem>();
          this.PopulateSpecificUOMs(oTech);
        }
      } else {
        this.txtQuantity.Text = String.Empty;
        this.txtTotalQuantity.Text = String.Empty;
        this.PopulateSpecificUOMs(oTech);
      }
      if (
        String.IsNullOrEmpty(oTech.DoseComQuantityPerDoseUom) &&
        String.IsNullOrEmpty(oTech.ProdSupplyInsWithComments)
      ) {
        let strImagesource: string = MedImage.GetPath('icon_downsmallhot.png');
        let strDisImagesource: string = MedImage.GetPath(
          'icon_downsmalldis.png'
        );
        this.btnAddInfo.ChangeImage(
          strImagesource,
          strImagesource,
          strDisImagesource
        );
        this.oIPVM.FormViewerDetails.TechValidateDetails.TechQntyPerDosVisible =
          Visibility.Collapsed;
      } else {
        if (
          this.oIPVM.FormViewerDetails.TechValidateDetails
            .TechQntyPerDosVisible == Visibility.Collapsed
        ) {
          let strImagesource: string = MedImage.GetPath('icon_upsmall.png');
          let strDisImagesource: string = MedImage.GetPath(
            'icon_downsmalldis.png'
          );
          this.btnAddInfo.ChangeImage(
            strImagesource,
            strImagesource,
            strDisImagesource
          );
          this.oIPVM.FormViewerDetails.TechValidateDetails.TechQntyPerDosVisible =
            Visibility.Visible;
        }
      }
      if (!String.IsNullOrEmpty(oTech.QuantityPerDose)){
        this.txtQuantity.Text = oTech.QuantityPerDose;
        this.oIPVM.FormViewerDetails.TechValidateDetails.Quantity = oTech.QuantityPerDose;
      }
      if (!String.IsNullOrEmpty(oTech.TotalQuantity)){
        this.txtTotalQuantity.Text = oTech.TotalQuantity;
        this.oIPVM.FormViewerDetails.TechValidateDetails.TotalQuantity = oTech.TotalQuantity
        }
      if (oTech.QuantityPerDoseUOM != null && oTech.QuantityPerDoseUOM.OID) {
        if (oTech.QuantityPerDoseUOM.OID.ToString() != '0') {
          this.cboQuantityPerDoseUOM.SetValue(
            oTech.QuantityPerDoseUOM.OID.ToString()
          );
        }
      }
      if (oTech.TotalQuantityUOM != null && oTech.TotalQuantityUOM.OID) {
        if (oTech.TotalQuantityUOM.OID.ToString() != '0') {
          this.cboTotalQuantityUOM.SetValue(
            oTech.TotalQuantityUOM.OID.ToString()
          );
        }
      }
      if (
        oTech.SupplyInstruction != null &&
        oTech.SupplyInstruction.Count > 0
      ) {
        let lblSupplyInst: string = String.Empty;
        let lblSupplyValue: string = String.Empty;
        oTech.SupplyInstruction.ForEach((a) => {
          if (!String.IsNullOrEmpty(a.Name)) {
            lblSupplyInst += a.Name + ';';
            lblSupplyValue += a.Code + ';';
          }
        });
        this.oIPVM.FormViewerDetails.TechValidateDetails.supplyinstrtext =
          lblSupplyInst.Trim(';');
        this.lblSupplyInstValue.Text = lblSupplyValue.Trim(';');
      } else {
        this.oIPVM.FormViewerDetails.TechValidateDetails.supplyinstrtext =
          'Select supply instructions to enter value(s)';
        this.oIPVM.FormViewerDetails.TechValidateDetails.supplyinstrvalue =
          String.Empty;
      }
      if (!String.IsNullOrEmpty(oTech.ProdSupplyInsWithComments)) {
        this.lblSupplyInstText.Text = oTech.ProdSupplyInsWithComments;
      } else {
        this.oIPVM.FormViewerDetails.TechValidateDetails.SupplyInsTextWithComments =
          'Select supply instructions to enter value(s)';
      }
      if (
        this.oIPVM != null &&
        this.oIPVM.FormViewerDetails != null &&
        this.oIPVM.FormViewerDetails.TechValidateDetails != null
      ) {
        if (oTech != null) {
          this.oIPVM.FormViewerDetails.TechValidateDetails.SupplyComments =
            oTech.SupComments;
	    this.oIPVM.FormViewerDetails.TechValidateDetails.ProductSelectedsupplyInstruction =
            oTech.selectedSupplyInstruction;
        }
      }
      this.EnableDisableInputControls(true);
      this.cmdRemove.IsEnabled = true;
      this.cmdUpdate.IsEnabled = true;
      this.cmdAdd.IsEnabled = false;
      if (this.oIPVM != null && this.oIPVM.FormViewerDetails != null)
      {
      this.oIPVM.FormViewerDetails.frmViewTechValidatecmdUpdateThat = this.cmdUpdate;
      }
    }
    this.SupplyinstrDataAssign();
  }
  public ClearControlsInit = () => {
    Object.keys(that).forEach((prop) => (this[prop] = that[prop]));
    this.ClearControls();
  }
  public ClearControls(): void {
    this.txtQuantity.Text = String.Empty;
    this.txtTotalQuantity.Text = String.Empty;
    this.cboQuantityPerDoseUOM.SelectedIndex = -1;
    this.cboTotalQuantityUOM.SelectedIndex = -1;
    if (
      this.oIPVM != null &&
      this.oIPVM.FormViewerDetails != null &&
      this.oIPVM.FormViewerDetails.TechValidateDetails != null
    ) {
      this.oIPVM.FormViewerDetails.TechValidateDetails.Quantity = String.Empty;
      this.oIPVM.FormViewerDetails.TechValidateDetails.TotalQuantity =
        String.Empty;
      this.oIPVM.FormViewerDetails.TechValidateDetails.QuantityUOM = String.Empty; // TODO: Need to be changed to null
      this.oIPVM.FormViewerDetails.TechValidateDetails.TotalQuantityUOM = String.Empty; // TODO: Need to be changed to null
      this.oIPVM.FormViewerDetails.TechValidateDetails.TechQntyPerDosVisible =
        Visibility.Collapsed;
    }
    this.grdDosecombinations.UnselectAll();
    this.grdPrescribe.UnselectAll();
    this.SetDefaultValues();
    this.EnableDisableInputControls(false);
    this.EnableDisableButtonControls(false);
    let strImagesource: string = MedImage.GetPath('icon_downsmallhot.png');
    let strDisImagesource: string = MedImage.GetPath('icon_downsmalldis.png');
    this.btnAddInfo.ChangeImage(
      strImagesource,
      strImagesource,
      strDisImagesource
    );
  }
  public ClearInputControls(): void {
    this.txtQuantity.Text = String.Empty;
    this.txtTotalQuantity.Text = String.Empty;
    this.cboQuantityPerDoseUOM.SelectedIndex = -1;
    this.cboTotalQuantityUOM.SelectedIndex = -1;
    this.SetDefaultValues();
    if (this.grdPrescribe.GetSelectedRowCount() <= 0) {
      this.EnableDisableInputControls(false);
      this.EnableDisableButtonControls(false);
    }
  }
  private EnableDisableInputControls(IsEnabledFlag: boolean): void {
    this.lblQuantityPerDose.IsEnabled = IsEnabledFlag;
    this.txtQuantity.IsEnabled = IsEnabledFlag;
    this.lblQuantityPerDoseUOM.IsEnabled = IsEnabledFlag;
    this.cboQuantityPerDoseUOM.IsEnabled = IsEnabledFlag;
    this.lblSupplyInst.IsEnabled = IsEnabledFlag;
    this.lblSupplyInstText.IsEnabled = IsEnabledFlag;
    this.lblTotalQuantity.IsEnabled = IsEnabledFlag;
    this.txtTotalQuantity.IsEnabled = IsEnabledFlag;
    this.lblTotalQuantityUOM.IsEnabled = IsEnabledFlag;
    this.cboTotalQuantityUOM.IsEnabled = IsEnabledFlag;
    this.btnAddInfo.IsEnabled = IsEnabledFlag;
    if (IsEnabledFlag) {
      let strImagesource: string = MedImage.GetPath('icon_downsmallhot.png');
      let strDisImagesource: string = MedImage.GetPath('icon_downsmalldis.png');
      // this.btnAddInfo.ChangeImage(
      //   strImagesource,
      //   strImagesource,
      //   strDisImagesource
      // );
    } else {
      let strImagesource: string = MedImage.GetPath('icon_downsmallhot.png');
      let strDisImagesource: string = MedImage.GetPath('icon_downsmalldis.png');
      this.btnAddInfo.ChangeImage(
        strImagesource,
        strImagesource,
        strDisImagesource
      );
    }
  }

  private EnableDisableButtonControls(IsEnabledFlag: boolean): void {
    this.cmdAdd.IsEnabled = IsEnabledFlag;
    this.cmdUpdate.IsEnabled = IsEnabledFlag;
    this.cmdRemove.IsEnabled = IsEnabledFlag;
  }

  private PopulateUOMs(objDrugAll: DrugItemBasicInfo): void {
    let objDrug: DrugItemBasicInfo = null;
    if (
      this.oIPVM != null &&
      this.oIPVM.FormViewerDetails != null &&
      this.oIPVM.FormViewerDetails.TechValidateDetails != null
    ) {
      this.oIPVM.FormViewerDetails.TechValidateDetails.QuantityUOMList =
        new ObservableCollection<CListItem>();
      this.oIPVM.FormViewerDetails.TechValidateDetails.TotalQuantityUOMList =
        new ObservableCollection<CListItem>();
    }
    if (objDrugAll == null) {
      objDrug = ObjectHelper.CreateType<DrugItemBasicInfo>(
        this.grdPrescribe.SelectedItem,
        DrugItemBasicInfo
      );
    } else {
      objDrug = objDrugAll;
    }
    if (objDrug != null && !String.IsNullOrEmpty(objDrug.TechQtyUomName)) {
      let sTechUOM: string[] = objDrug.TechQtyUomName.Split('$');
      for (let i: number = 0; i < sTechUOM.length; i++) {
        if (!String.IsNullOrEmpty(sTechUOM[i])) {
          let sUOM: string[] = sTechUOM[i].Split('*');
          if (sUOM.length < 2) continue;
          this.cboQuantityPerDoseUOM.AddOption(
            ObjectHelper.CreateObject(new CListItem(), {
              DisplayText: sUOM[1],
              Value: sUOM[0],
            })
          );
          this.cboTotalQuantityUOM.AddOption(
            ObjectHelper.CreateObject(new CListItem(), {
              DisplayText: sUOM[1],
              Value: sUOM[0],
            })
          );
          if (
            this.oIPVM != null &&
            this.oIPVM.FormViewerDetails != null &&
            this.oIPVM.FormViewerDetails.TechValidateDetails != null
          ) {
            if (
              this.oIPVM != null &&
              this.oIPVM.FormViewerDetails != null &&
              this.oIPVM.FormViewerDetails.TechValidateDetails != null
            ) {
              this.oIPVM.FormViewerDetails.TechValidateDetails.QuantityUOMList.Add(
                ObjectHelper.CreateObject(new CListItem(), {
                  Value: sUOM[0],
                  DisplayText: sUOM[1],
                })
              );
              this.oIPVM.FormViewerDetails.TechValidateDetails.TotalQuantityUOMList.Add(
                ObjectHelper.CreateObject(new CListItem(), {
                  Value: sUOM[0],
                  DisplayText: sUOM[1],
                })
              );
            }
          }
        }
      }
    }
  }
  private PopulateSpecificUOMs(
    objDrug: ManagePrescSer.TechValidatedItem
  ): void {
    if (objDrug != null) {
      this.cboQuantityPerDoseUOM.ItemsSource = null;
      this.cboTotalQuantityUOM.ItemsSource = null;
      let QuantityUOM: CListItem = new CListItem();
      let TotQuantityUOM: CListItem = new CListItem();
      if (
        this.oIPVM != null &&
        this.oIPVM.FormViewerDetails != null &&
        this.oIPVM.FormViewerDetails.TechValidateDetails != null
      ) {
        if (
          objDrug.QuantityPerDoseUOM != null &&
          !String.IsNullOrEmpty(objDrug.QuantityPerDoseUOM.Name)
        ) {
          if (
            this.oIPVM.FormViewerDetails.TechValidateDetails.QuantityUOMList !=
            null
          ) {
            let oQtyUOM =
              this.oIPVM.FormViewerDetails.TechValidateDetails.QuantityUOMList.Where(
                (oitem) =>
                  oitem.Value == objDrug.QuantityPerDoseUOM.OID.ToString()
              ).Select((oitem) => oitem);
            if (oQtyUOM != null && oQtyUOM.Count() > 0) {
              QuantityUOM = oQtyUOM.FirstOrDefault();
              this.cboQuantityPerDoseUOM.AddOption(
                ObjectHelper.CreateObject(new CListItem(), {
                  DisplayText: QuantityUOM.DisplayText,
                  Value: QuantityUOM.Value,
                })
              );
            } else {
              this.cboQuantityPerDoseUOM.AddOption(
                ObjectHelper.CreateObject(new CListItem(), {
                  DisplayText: objDrug.QuantityPerDoseUOM.Name,
                  Value: objDrug.QuantityPerDoseUOM.OID.ToString(),
                })
              );
            }
          } else {
            this.cboQuantityPerDoseUOM.AddOption(
              ObjectHelper.CreateObject(new CListItem(), {
                DisplayText: objDrug.QuantityPerDoseUOM.Name,
                Value: objDrug.QuantityPerDoseUOM.OID.ToString(),
              })
            );
          }
        }
        if (
          objDrug.TotalQuantityUOM != null &&
          !String.IsNullOrEmpty(objDrug.TotalQuantityUOM.Name)
        ) {
          if (
            this.oIPVM.FormViewerDetails.TechValidateDetails
              .TotalQuantityUOMList != null
          ) {
            let oTotQtyUOM =
              this.oIPVM.FormViewerDetails.TechValidateDetails.TotalQuantityUOMList.Where(
                (oitem) =>
                  oitem.Value == objDrug.TotalQuantityUOM.OID.ToString()
              ).Select((oitem) => oitem);
            if (oTotQtyUOM != null && oTotQtyUOM.Count() > 0) {
              TotQuantityUOM = oTotQtyUOM.FirstOrDefault();
              this.cboTotalQuantityUOM.AddOption(
                ObjectHelper.CreateObject(new CListItem(), {
                  DisplayText: TotQuantityUOM.DisplayText,
                  Value: TotQuantityUOM.Value,
                })
              );
            } else {
              this.cboTotalQuantityUOM.AddOption(
                ObjectHelper.CreateObject(new CListItem(), {
                  DisplayText: objDrug.TotalQuantityUOM.Name,
                  Value: objDrug.TotalQuantityUOM.OID.ToString(),
                })
              );
            }
          } else {
            this.cboTotalQuantityUOM.AddOption(
              ObjectHelper.CreateObject(new CListItem(), {
                DisplayText: objDrug.TotalQuantityUOM.Name,
                Value: objDrug.TotalQuantityUOM.OID.ToString(),
              })
            );
          }
        }
      }
    }
  }
  public UpdateClick(): boolean {
    if(!this.oIPVM){
      Object.keys(that).forEach((prop) => (this[prop] = that[prop]));
    }
    if (!this.TechValidateFn()) return false;
    this.oIPVM.FormViewerDetails.TechValidateDetails.Technicalvalidateupdate =
      true;
    let oUpdateItem: CustomTechValidatedItem =
      ObjectHelper.CreateType<CustomTechValidatedItem>(
        this.grdDosecombinations.GetCurrentRowData(),
        CustomTechValidatedItem
      );
    if (this.oIPVM.PresMultiCompitemOID > 0)
      oUpdateItem.DrugItem.PrescribableItemListOID =
        this.oIPVM.PresMultiCompitemOID;
    else
      oUpdateItem.DrugItem.PrescribableItemListOID =
        this.oIPVM.PrescriptionItemOID;
    if (this.oIPVM != null && this.oIPVM.ActionCode == ActivityTypes.Amend) {
      if (
        this.oIPVM.FormViewerDetails != null &&
        this.oIPVM.FormViewerDetails.BasicDetails != null &&
        String.Compare(
          this.oIPVM.FormViewerDetails.BasicDetails.itemSubType,
          'CC_MULCMPNTITM',
          StringComparison.InvariantCultureIgnoreCase
        ) != 0
      ) {
        this.oIPVM.IsReasonForModificationVisible = Visibility.Visible;
        this.oIPVM.FormViewerDetails.BasicDetails.IsenableRSNFORMOD = true;
        this.oIPVM.FormViewerDetails.BasicDetails.IsRsnEnabForTechval = true;
      }
    }
    if (
      this.oPrescItemVM != null &&
      this.oPrescItemVM.FormViewerDetails != null &&
      this.oPrescItemVM.FormViewerDetails.TechValidateDetails != null
    )
      this.oIPVM.FormViewerDetails.TechValidateDetails =
        this.oPrescItemVM.FormViewerDetails.TechValidateDetails;
    if (!this.bMultiCompChild) {
      if (
        this.oIPVM.FormViewerDetails.TechValidateDetails.SelectedPrescItem
          .FormViewerDetails != null &&
        this.oIPVM.FormViewerDetails.TechValidateDetails.SelectedPrescItem
          .FormViewerDetails.TechValidateDetails != null &&
        this.oIPVM.FormViewerDetails.TechValidateDetails.SelectedPrescItem
          .FormViewerDetails.TechValidateDetails.TechValidatedItems != null
      ) {
        if (
          this.oIPVM.FormViewerDetails.TechValidateDetails.SelectedPrescItem
            .FormViewerDetails.TechValidateDetails.TechValidatedItems.Count > 0
        ) {
          if (this.oPreObj == null) {
            this.oPreObj = new PrescriptionItemVM();
            if (this.oPreObj.FormViewerDetails == null)
              this.oPreObj.FormViewerDetails = new FormViewerVM();
            for (
              let i: number = 0;
              i <
              this.oIPVM.FormViewerDetails.TechValidateDetails
                .PresTechValidatedItems[0].FormViewerDetails.TechValidateDetails
                .TechValidatedItems.Count;
              i++
            ) {
              this.oPreObj.FormViewerDetails.TechValidatedFVMItems =
                new ObservableCollection<CustomTechValidatedItem>();
              this.oPreObj.FormViewerDetails.TechValidatedFVMItems.Add(
                this.oIPVM.FormViewerDetails.TechValidateDetails
                  .PresTechValidatedItems[0].FormViewerDetails
                  .TechValidateDetails.TechValidatedItems[i]
              );
              this.bParentItm = true;
            }
          }
        }
      }
    }
    this.oIPVM.FormViewerDetails.TechValidateDetails.SetTechDetails(
      oUpdateItem,
      'UPDATE'
    );
    let prevqty: string =
      oUpdateItem.prevQuantity + ' ' + oUpdateItem.prevQuantityUOM;
    let prevTotqty: string =
      oUpdateItem.prevTotQuantity + ' ' + oUpdateItem.prevTotQuantityUOM;
    if (
      !String.Equals(
        prevqty,
        oUpdateItem.DoseComQuantityPerDoseUom,
        StringComparison.InvariantCultureIgnoreCase
      ) ||
      !String.Equals(
        prevTotqty,
        oUpdateItem.DoseComTotalPerQuantityUom,
        StringComparison.InvariantCultureIgnoreCase
      )
    ) {
      this.oIPVM.EditedGridID = 1;
      this.oIPVM.IsProdOptChange = 1;
    } else if (
      !String.Equals(
        oUpdateItem.prevsuppcomments,
        oUpdateItem.SupComments,
        StringComparison.InvariantCultureIgnoreCase
      )
    ) {
      this.oIPVM.EditedGridID = 1;
      this.oIPVM.IsProdOptChange = 1;
    } else if (
      (oUpdateItem.prevselectedSupplyInstruction == null &&
        oUpdateItem.selectedSupplyInstruction != null) ||
      (oUpdateItem.prevselectedSupplyInstruction != null &&
        oUpdateItem.selectedSupplyInstruction == null) ||
      (oUpdateItem.prevselectedSupplyInstruction != null &&
        oUpdateItem.selectedSupplyInstruction != null &&
        oUpdateItem.prevselectedSupplyInstruction.Count !=
          oUpdateItem.selectedSupplyInstruction.Count)
    ) {
      this.oIPVM.EditedGridID = 1;
      this.oIPVM.IsProdOptChange = 1;
    } else {
      if (
        oUpdateItem.prevselectedSupplyInstruction != null &&
        oUpdateItem.selectedSupplyInstruction != null &&
        oUpdateItem.prevselectedSupplyInstruction.Count ==
          oUpdateItem.selectedSupplyInstruction.Count
      ) {
        let existsupplyinstcount: number =
          oUpdateItem.prevselectedSupplyInstruction.Count;
        let existsupplyvalue: string = String.Empty;
        for (let j: number = 0; j < existsupplyinstcount; j++) {
          existsupplyvalue = oUpdateItem.prevselectedSupplyInstruction[j].Value;
          if (
            oUpdateItem.selectedSupplyInstruction
              .Where((c) => c.Value == existsupplyvalue)
              .Count() > 0
          ) {
          } else {
            this.oIPVM.EditedGridID = 1;
            this.oIPVM.IsProdOptChange = 1;
            break;
          }
        }
      }
    }
    if (
      String.IsNullOrEmpty(oUpdateItem.OperationMode) ||
      String.Compare(oUpdateItem.OperationMode, 'N') != 0 ||
      String.Compare(oUpdateItem.OperationMode, 'UM') == 0
    ) {
      oUpdateItem.OperationMode = 'M';
      if (this.bMultiCompChild) {
        oUpdateItem.bMultiCompChilds = true;
      }
    }
    if (
      this.oIPVM != null &&
      this.oIPVM.FormViewerDetails != null &&
      this.oIPVM.FormViewerDetails.BasicDetails != null &&
      this.oIPVM.FormViewerDetails.BasicDetails.IdentifyingOID > 0
    ) {
      oUpdateItem.MCIdentifyingOID =
        this.oIPVM.FormViewerDetails.BasicDetails.IdentifyingOID;
    }
    oUpdateItem.IsDoseCombinationsDefined = '1';
    let grdRow: GridViewRow = <GridViewRow>(
      this.grdDosecombinations.ItemContainerGenerator.ContainerFromItem(
        oUpdateItem
      )
    );
    grdRow.IsSelected = false;
    this.grdDosecombinations.UnselectAll();
    // this.grdDosecombinations.Rebind();
    this.ClearControls();
    if (
      this.oIPVM != null &&
      this.oIPVM.FormViewerDetails != null &&
      this.oIPVM.FormViewerDetails.BasicDetails != null
    ) {
      this.oIPVM.FormViewerDetails.BasicDetails.DoClinicallyVerify();
      this.oIPVM.bIsSupplyDispensingInstructionSet = false;
    }
    return true;
  }
  cmdUpdate_Click_Func = (s, e) => { 
    Object.keys(that).forEach((prop) => (this[prop] = that[prop]));
    this.cmdUpdate_Click(s, e); 
  }
  private cmdUpdate_Click(sender: Object, e: RoutedEventArgs): void {
    this.UpdateClick();
  }

  ccmdRemove_Click_Func = (s, e) => { 
    Object.keys(that).forEach((prop) => (this[prop] = that[prop]));
    this.cmdRemove_Click(s, e); 
  }
  private cmdRemove_Click(sender: Object, e: RoutedEventArgs): void {
    this.deleteSeletedrow();
  }
  private deleteSeletedrow(): void {
    if (!this.bMultiCompChild) {
      this.oPreObj = new PrescriptionItemVM();
      if (this.oPreObj.FormViewerDetails == null)
        this.oPreObj.FormViewerDetails = new FormViewerVM();
      if (
        this.oIPVM.FormViewerDetails.TechValidateDetails
          .PresTechValidatedItems[0] != null &&
        this.oIPVM.FormViewerDetails.TechValidateDetails
          .PresTechValidatedItems[0].FormViewerDetails.TechValidateDetails !=
          null &&
        this.oIPVM.FormViewerDetails.TechValidateDetails
          .PresTechValidatedItems[0].FormViewerDetails.TechValidateDetails
          .TechValidatedItems != null
      )
        this.oPreObj.FormViewerDetails.TechValidatedFVMItems = null;
    }
    this.oIPVM.FormViewerDetails.TechValidateDetails.Technicalvalidateupdate =
      true;
    let oUpdateItem: ManagePrescSer.TechValidatedItem =
      ObjectHelper.CreateType<ManagePrescSer.TechValidatedItem>(
        this.grdDosecombinations.GetCurrentRowData(),
        ManagePrescSer.TechValidatedItem
      );
    this.deletedItems.Add(oUpdateItem);
    oUpdateItem.OperationMode = 'D';
    if (oUpdateItem.DrugItem != null) oUpdateItem.DrugItem.OperationMode = 'D';
    //TODO: Revisited
    // this.grdDosecombinations.Rows[this.grdDosecombinations.GetCurrentRowIndex() + 1].Visibility = Visibility.Collapsed;
    this.grdDosecombinations.Rows[this.grdDosecombinations.GetCurrentRowIndex()].Visibility = Visibility.Collapsed;
    this.DeleteItmDoseCombinations();
    this.ClearControls();
    if (
      this.oIPVM != null &&
      this.oIPVM.FormViewerDetails != null &&
      this.oIPVM.FormViewerDetails.BasicDetails != null
    ) {
      this.oIPVM.FormViewerDetails.BasicDetails.DoClinicallyVerify();
      this.oIPVM.bIsSupplyDispensingInstructionSet = false;
    }
    if (this.oIPVM.IsTechValidateMandatory) this.oIPVM.SetTechvalImageStatus();
    this.oIPVM.EditedGridID = 1;
    this.oIPVM.IsProdOptChange = 1;
  }
  grdPrescribe_RowLoaded(sender: Object, e: RowLoadedEventArgs): void {
    if (e.Row != null && e.DataElement != null) {
      let data: string[];
      let oTech: DrugItemBasicInfo = ObjectHelper.CreateType<DrugItemBasicInfo>(
        e.DataElement,
        DrugItemBasicInfo
      );
      if (oTech != null && String.Equals(oTech.IsFormulary, '1')) {
        data = this.sFormStyle;
      } else {
        data = this.sNonFormStyle;
      }
      if (data != null) {
        if (e.Row.Cells != null && data.length > 0) {
          if (!String.IsNullOrEmpty(data[0])) {
            e.Row.Cells[0].Foreground = new SolidColorBrush(
              CommonBB.ToColor(data[0])
            );
          }
        }
        if (data.length > 3 && String.Equals(data[3], 'bold')) {
          e.Row.FontWeight = FontWeights.Bold;
        } else {
          e.Row.FontWeight = FontWeights.Normal;
        }
        if (data.length > 2 && String.Equals(data[2], 'italic')) {
          e.Row.FontStyle = FontStyles.Italic;
        } else {
          e.Row.FontStyle = FontStyles.Normal;
        }
        if (
          this.oIPVM != null &&
          !String.IsNullOrEmpty(this.oIPVM.MedLineDisplayText) &&
          this.oIPVM.FormViewerDetails != null &&
          this.oIPVM.FormViewerDetails.BasicDetails != null &&
          !String.IsNullOrEmpty(
            this.oIPVM.FormViewerDetails.BasicDetails.IdentifyingType
          ) &&
          (String.Equals(
            this.oIPVM.FormViewerDetails.BasicDetails.IdentifyingType,
            CConstants.Precatalog,
            StringComparison.InvariantCultureIgnoreCase
          ) ||
            String.Equals(
              this.oIPVM.FormViewerDetails.BasicDetails.IdentifyingType,
              CConstants.NONCATALOGUEITEM,
              StringComparison.InvariantCultureIgnoreCase
            ))
        ) {
          oTech.IdentifyingName = this.oIPVM.MedLineDisplayText;
        } else {
        }
        if (data.length > 1 && String.Equals(data[1], 'uppercase')) {
          if (oTech != null && !String.IsNullOrEmpty(oTech.IdentifyingName)) {
            oTech.IdentifyingName = oTech.IdentifyingName.ToUpper();
          }
        } else if (data.length > 1 && String.Equals(data[1], 'lowercase')) {
          if (oTech != null && !String.IsNullOrEmpty(oTech.IdentifyingName)) {
            oTech.IdentifyingName = oTech.IdentifyingName.ToLower();
          }
        }
      }
    }
  }
  TechValidateDetails_OnLoadMCIQuantityFound(
    Quantitys: ObservableCollection<CListItem>
  ): void {
    if (Quantitys != null) {
      this.cboQuantityPerDoseUOM.ItemsSource = null;
      this.cboTotalQuantityUOM.ItemsSource = null;
      for (let i: number = 0; i < Quantitys.Count; i++) {
        this.cboQuantityPerDoseUOM.AddOption(
          ObjectHelper.CreateObject(new CListItem(), {
            DisplayText: Quantitys[i].DisplayText,
            Value: Quantitys[i].Value.ToString(),
          })
        );
        this.cboTotalQuantityUOM.AddOption(
          ObjectHelper.CreateObject(new CListItem(), {
            DisplayText: Quantitys[i].DisplayText,
            Value: Quantitys[i].Value.ToString(),
          })
        );
      }
    }
  }
  grdPrescribe_SelectionChanged(
    sender: Object,
    e: SelectionChangeEventArgs
  ): void {
    if (this._IsDeactivatedPerscItem) return;
    this.txtQuantity.Text = String.Empty;
    this.txtTotalQuantity.Text = String.Empty;
    if (this.oIPVM != null && this.oIPVM.FormViewerDetails != null && this.oIPVM.FormViewerDetails.TechValidateDetails != null) {      
        this.oIPVM.FormViewerDetails.TechValidateDetails.TotalQuantity = String.Empty;
        this.oIPVM.FormViewerDetails.TechValidateDetails.Quantity = String.Empty;
        this.oIPVM.FormViewerDetails.frmViewTechValidatecmdUpdateThat = null;
    }   
    this.cboQuantityPerDoseUOM.SelectedIndex = -1;
    this.cboTotalQuantityUOM.SelectedIndex = -1;
    this.SetDefaultValues();
    this.cboQuantityPerDoseUOM.ItemsSource = null;
    this.cboTotalQuantityUOM.ItemsSource = null;
    if (e.AddedItems != null && e.AddedItems.Count > 0) {
      this.EnableDisableInputControls(true);
      this.cmdUpdate.IsEnabled = false;
      this.cmdRemove.IsEnabled = false;
      this.cmdAdd.IsEnabled = true;
    } else if (!this.bRemoveSelection) {
      this.EnableDisableInputControls(false);
      this.EnableDisableButtonControls(false);
      let strImagesource: string = MedImage.GetPath('icon_downsmallhot.png');
      let strDisImagesource: string = MedImage.GetPath('icon_downsmalldis.png');
      this.btnAddInfo.ChangeImage(
        strImagesource,
        strImagesource,
        strDisImagesource
      );
      if (
        this.oIPVM != null &&
        this.oIPVM.FormViewerDetails != null &&
        this.oIPVM.FormViewerDetails.TechValidateDetails != null
      ) {
        this.oIPVM.FormViewerDetails.TechValidateDetails.TechQntyPerDosVisible =
          Visibility.Collapsed;
      }
    }
    if (this.grdDosecombinations.GetSelectedRowCount()) this.grdDosecombinations.UnselectAll();
    if (
      this.grdDosecombinations.GetSelectedRowCount() > 0 &&
      !this.bRemoveSelection
    ) {
      this.grdDosecombinations.UnselectAll();
      let strImagesource: string = MedImage.GetPath('icon_downsmallhot.png');
      let strDisImagesource: string = MedImage.GetPath('icon_downsmalldis.png');
      this.btnAddInfo.ChangeImage(
        strImagesource,
        strImagesource,
        strDisImagesource
      );
      if (
        this.oIPVM != null &&
        this.oIPVM.FormViewerDetails != null &&
        this.oIPVM.FormViewerDetails.TechValidateDetails != null
      ) {
        this.oIPVM.FormViewerDetails.TechValidateDetails.TechQntyPerDosVisible =
          Visibility.Collapsed;
      }
    }
    this.PopulateUOMs(null);
    this.bRemoveSelection = false;
    if (this.cmdAdd.IsEnabled == true) {
      if (
        this.oIPVM != null &&
        this.oIPVM.FormViewerDetails != null &&
        this.oIPVM.FormViewerDetails.BasicDetails != null
      ) {
        if (this.oIPVM.FormViewerDetails.TechValidateDetails != null) {
          if (
            !String.IsNullOrEmpty(
              this.oIPVM.FormViewerDetails.TechValidateDetails
                .SupplyInsTextWithComments
            )
          ) {
            this.lblSupplyInstText.Text =
              this.oIPVM.FormViewerDetails.TechValidateDetails.SupplyInsTextWithComments;
          }
        }
        if (
          this.oIPVM.FormViewerDetails.BasicDetails.SelectedsupplyInstruction !=
            null &&
          this.oIPVM.FormViewerDetails.BasicDetails.SelectedsupplyInstruction
            .Count > 0
        ) {
          let sText: string = String.Empty;
          let sValue: string = String.Empty;
          this.oIPVM.FormViewerDetails.BasicDetails.TechValiadteSupplyInstWithConactSemiColon(
            this.oIPVM.FormViewerDetails.BasicDetails.SelectedsupplyInstruction,
            (o1) => {
              sText = o1;
            },
            (o2) => {
              sValue = o2;
            }
          );
          if (this.oIPVM.FormViewerDetails.TechValidateDetails != null) {
            this.oIPVM.FormViewerDetails.TechValidateDetails.supplyinstrtext =
              !String.IsNullOrEmpty(sText) ? sText : String.Empty;
          }
          this.lblSupplyInstValue.Text = !String.IsNullOrEmpty(sValue)
            ? sValue
            : String.Empty;
        } else if (
          !String.IsNullOrEmpty(
            this.oIPVM.FormViewerDetails.BasicDetails.SupplyInsTextWithComments
          ) &&
          !this.oIPVM.FormViewerDetails.BasicDetails.FollowUpStatLaunch.Equals(
            'S'
          )
        ) {
          this.lblSupplyInstValue.Text =
            this.oIPVM.FormViewerDetails.BasicDetails.SupplyInsVal;
          this.lblSupplyInstText.Text =
            this.oIPVM.FormViewerDetails.BasicDetails.SupplyInsTextWithComments;
        } else {
          this.lblSupplyInstValue.Text = String.Empty;
          this.lblSupplyInstText.Text =
            'Select supply instructions to enter value(s)';
        }
      }
    }
    this.SupplyinstrDataAssign();
    if(this.DataContext.IsFormViewerDisable){
      this.cmdAdd.IsEnabled= false;
    }
  }
  OngrdPrescribeRowUnSelected(): void {
    this.EnableDisableButtonControls(false);
    this.EnableDisableInputControls(false);
  }
  grdTechValItem_SelectionChanged(
    sender: Object,
    e: SelectionChangeEventArgs
  ): void {
    let oSelectPrescItem: PrescriptionItemVM =
      ObjectHelper.CreateType<PrescriptionItemVM>(
        this.grdTechValItem.SelectedItem,
        PrescriptionItemVM
      );
    let Istypeindrug: boolean = false;
    if (
      oSelectPrescItem != null &&
      oSelectPrescItem.FormViewerDetails != null &&
      oSelectPrescItem.FormViewerDetails.BasicDetails != null &&
      !String.IsNullOrEmpty(
        oSelectPrescItem.FormViewerDetails.BasicDetails.IdentifyingName
      )
    ) {
      Istypeindrug =
        String.Equals(
          oSelectPrescItem.FormViewerDetails.BasicDetails.IdentifyingType,
          CConstants.NONCATALOGUEITEM,
          StringComparison.InvariantCultureIgnoreCase
        ) ||
        String.Equals(
          oSelectPrescItem.FormViewerDetails.BasicDetails.IdentifyingType,
          CConstants.Precatalog,
          StringComparison.InvariantCultureIgnoreCase
        )
          ? true
          : false;
    }
    if (oSelectPrescItem != null) {
      let _IsEnabled: boolean = true;
      this._IsDeactivatedPerscItem = false;
      if (
        String.Compare(
          oSelectPrescItem.IsDeactivate,
          'Y',
          StringComparison.InvariantCultureIgnoreCase
        ) == 0
      ) {
        _IsEnabled = false;
        this._IsDeactivatedPerscItem = true;
        oSelectPrescItem.isShowallVisible = Visibility.Collapsed;
      }
      if (!this.bCDItemEnable && !Istypeindrug) {
        this.EnableDisableInputControls(_IsEnabled);
        this.EnableDisableButtonControls(_IsEnabled);
        this.grdPrescribe.IsEnabled = _IsEnabled;
        this.grdDosecombinations.IsEnabled = _IsEnabled;
        if (this.grdPrescribe.GetRowCount() <= 0) {
          this.EnableDisableInputControls(false);
          this.cmdUpdate.IsEnabled = false;
          this.cmdRemove.IsEnabled = false;
          this.cmdAdd.IsEnabled = false;
        }
      }
      if (
        oSelectPrescItem.FormViewerDetails != null &&
        oSelectPrescItem.FormViewerDetails.TechValidateDetails != null &&
        oSelectPrescItem.FormViewerDetails.TechValidateDetails
          .TechValidatedItems != null &&
        oSelectPrescItem.FormViewerDetails.TechValidateDetails
          .TechValidatedItems.Count > 0
      ) {
        let iTecCnto: number =
          oSelectPrescItem.FormViewerDetails.TechValidateDetails
            .TechValidatedItems.Count;
        let iTecValTot: number = 0;
        for (let iTec: number = 0; iTec < iTecCnto; iTec++) {
          if (
            oSelectPrescItem.FormViewerDetails.TechValidateDetails
              .TechValidatedItems[iTec].OperationMode == 'D'
          )
            iTecValTot = iTecValTot + 1;
        }
      }
    }
    this.oPrescItemVM = ObjectHelper.CreateType<PrescriptionItemVM>(
      this.DataContext,
      PrescriptionItemVM
    );
    let Typeindrug: boolean = false;
    if (
      this.oPrescItemVM != null &&
      this.oPrescItemVM.FormViewerDetails != null &&
      this.oPrescItemVM.FormViewerDetails.BasicDetails != null &&
      !String.IsNullOrEmpty(
        this.oPrescItemVM.FormViewerDetails.BasicDetails.IdentifyingName
      )
    ) {
      Typeindrug =
        String.Equals(
          this.oPrescItemVM.FormViewerDetails.BasicDetails.IdentifyingType,
          CConstants.NONCATALOGUEITEM,
          StringComparison.InvariantCultureIgnoreCase
        ) ||
        String.Equals(
          this.oPrescItemVM.FormViewerDetails.BasicDetails.IdentifyingType,
          CConstants.Precatalog,
          StringComparison.InvariantCultureIgnoreCase
        )
          ? true
          : false;
    }
    if (
      this.oPrescItemVM != null &&
      this.oPrescItemVM.FormViewerDetails != null &&
      this.oPrescItemVM.formViewerDetails.TechValidateDetails != null
    ) {
      if (
        !this.oPrescItemVM.FormViewerDetails.TechValidateDetails
          .IsMciChildSelected
      ) {
        this.oPrescItemVM.GetMcchilditem();
      }
      if (
        !this.oPrescItemVM.FormViewerDetails.TechValidateDetails
          .IsMciChildSelected &&
        this.isChilMCIEnabled &&
        !Typeindrug
      ) {
        let button = this.grdTechValItem
          .ChildrenOfType<GridExtension>('GridExtension')
          .Where((b) => b.Name == 'grdTecValItmChld')
          .FirstOrDefault();
        if (button != null) {
          button.UnselectAll();
        }
      }
      if (
        !this.oPrescItemVM.FormViewerDetails.TechValidateDetails
          .IsMciChildSelected &&
        this.oPrescItemVM.FormViewerDetails.BasicDetails != null &&
        String.Compare(
          this.oPrescItemVM.FormViewerDetails.BasicDetails.itemSubType,
          'CC_MULCMPNTITM',
          StringComparison.InvariantCultureIgnoreCase
        ) == 0
      ) {
        this.cmdCatalogueOptions.IsEnabled = false;
      } else if (
        String.Equals(
          this.oPrescItemVM.FormViewerDetails.BasicDetails.IdentifyingType,
          CConstants.NONCATALOGUEITEM,
          StringComparison.InvariantCultureIgnoreCase
        ) ||
        String.Equals(
          this.oPrescItemVM.FormViewerDetails.BasicDetails.IdentifyingType,
          CConstants.Precatalog,
          StringComparison.InvariantCultureIgnoreCase
        )
      ) {
        this.cmdCatalogueOptions.IsEnabled = false;
      } else this.cmdCatalogueOptions.IsEnabled = true;
    }
  }
  TechValidateDetails_OnSelectedPrescItemChanged(
    oPrescItemVM: PrescriptionItemVM
  ): void {
    if (
      oPrescItemVM != null &&
      String.Compare(
        oPrescItemVM.LorenzoID,
        'PI-001',
        StringComparison.CurrentCultureIgnoreCase
      ) != 0
    )
      Busyindicator.SetStatusBusy('TechValidate_PrescItemSelected');
    this.oIPVM = ObjectHelper.CreateType<PrescriptionItemVM>(
      this.DataContext,
      PrescriptionItemVM
    );
  }
  private grdTecValItmChld_Loaded(sender: Object, e: RoutedEventArgs): void {
    if (
      PatientContext.PrescriptionType == PrescriptionTypes.ForAdministration ||
      PatientContext.PrescriptionType == PrescriptionTypes.Inpatient
    ) {
      if (sender != null) {
        let objGridColmns: GridViewColumnCollection = (<GridViewDataControl>(
          sender
        )).Columns;
        if (objGridColmns != null && objGridColmns.Count > 0) {
          for(let i = 0 ; i < objGridColmns.Count; i++){
            let col: GridViewColumn = objGridColmns[i];

            if (col.UniqueName == 'Nextsupply') {
              if (
                MedicationCommonProfileData.AddPrescribingConfig != null &&
                MedicationCommonProfileData.AddPrescribingConfig
                  .EnableWardStockConfig
              ) {
                col.IsVisible = true;
              } else {
                col.IsVisible = false;
              }
              break;
            }
          }
        }
      }
    }
    if (
      this.oIPVM != null &&
      this.oIPVM.FormViewerDetails != null &&
      this.oIPVM.FormViewerDetails.TechValidateDetails != null &&
      this.oIPVM.FormViewerDetails.TechValidateDetails.SelectedPrescItem != null
    ) {
      if (
        this.oIPVM.FormViewerDetails.MulticomponentDetails != null &&
        this.oIPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo !=
          null &&
        this.oIPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo
          .Count > 0
      ) {
        let nCount: number =
          this.oIPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo
            .Count;
        let oTmpConstPrescItemVM: PrescriptionItemVM;
        this.oIPVM.SupplyDetails =
          this.oIPVM.FormViewerDetails.TechValidateDetails.SelectedPrescItem.PresTechValidatedItemsChild;
        this.oIPVM.FormViewerDetails.TechValidateDetails.SelectedPrescItem.PresTechValidatedItemsChild =
          new ObservableCollection<PrescriptionItemVM>();
        for (let i: number = 0; i < nCount; i++) {
          oTmpConstPrescItemVM = new PrescriptionItemVM();
          this.oPrescItemVM = ObjectHelper.CreateType<PrescriptionItemVM>(
            this.DataContext,
            PrescriptionItemVM
          );
          let oTempPresTmVM: PrescriptionItemVM = null;
          if (
            this.oIPVM != null &&
            this.oIPVM.SupplyDetails != null &&
            this.oIPVM.SupplyDetails.Count > 0
          ) {
            for (
              let sCount: number = 0;
              sCount < this.oIPVM.SupplyDetails.Count;
              sCount++
            ) {
              if (
                this.oIPVM.FormViewerDetails.MulticomponentDetails
                  .oMCItemBasicInfo[i].IdentifyingOID ==
                this.oIPVM.SupplyDetails[sCount].FormViewerDetails.BasicDetails
                  .IdentifyingOID
              ) {
                oTempPresTmVM = this.oIPVM.SupplyDetails[sCount];
              }
            }
          }
          if (
            this.oPrescItemVM != null &&
            this.oPrescItemVM.FormViewerDetails != null &&
            this.oPrescItemVM.FormViewerDetails.MulticomponentDetails != null &&
            this.oPrescItemVM.FormViewerDetails.MulticomponentDetails
              .oMCItemBasicInfo[i] != null &&
            !String.IsNullOrEmpty(
              this.oPrescItemVM.FormViewerDetails.MulticomponentDetails
                .oMCItemBasicInfo[i].Compoentsdrugprop
            )
          ) {
            this.oPrescItemVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo[
              i
            ].DrugProperties =
              this.oPrescItemVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo[
                i
              ].Compoentsdrugprop;
          }
          oTmpConstPrescItemVM =
            this.oIPVM.FormViewerDetails.TechValidateDetails.ConstructChildItemVM(
              this.oPrescItemVM.FormViewerDetails.MulticomponentDetails
                .oMCItemBasicInfo[i],
              this.oPrescItemVM.FormViewerDetails.MulticomponentDetails
                .oMCItemBasicInfo[i].PresItemTechOID,
              this.oPrescItemVM,
              oTempPresTmVM
            );
          if (oTmpConstPrescItemVM.iSSupplyrequest == null)
            oTmpConstPrescItemVM.iSSupplyrequest =
              new ObservableCollection<CListItem>();
          if (this.oPrescItemVM.iSSupplyrequest != null) {
            oTmpConstPrescItemVM.iSSupplyrequest =
              this.oPrescItemVM.iSSupplyrequest;
          }
          if (oTmpConstPrescItemVM.iSSupplyrequest != null) {
            let objselectedval: CListItem = oTmpConstPrescItemVM.iSSupplyrequest
              .Where(
                (x) =>
                  !String.IsNullOrEmpty(x.Value) &&
                  String.Equals(x.Value, Resource.TechValidate.Empty)
              )
              .FirstOrDefault();
            if (
              oTmpConstPrescItemVM != null &&
              oTmpConstPrescItemVM.SelectedSupplyreq != null &&
              !String.Equals(
                oTmpConstPrescItemVM.SelectedSupplyreq.Value,
                Resource.TechValidate.Empty
              )
            ) {
              oTmpConstPrescItemVM.SelectedSupplyreq =
                oTmpConstPrescItemVM.SelectedSupplyreq;
            } else {
              oTmpConstPrescItemVM.SelectedSupplyreq = objselectedval;
            }
          }
          this.oIPVM.FormViewerDetails.TechValidateDetails.SelectedPrescItem.PresTechValidatedItemsChild.Add(
            oTmpConstPrescItemVM
          );
        }
        if (
          this.oPrescItemVM != null &&
          this.oPrescItemVM.PresTechValidatedItemsChild != null &&
          this.oPrescItemVM.PresTechValidatedItemsChild.Count > 0 &&
          this.oPrescItemVM.IsAmendMCISupplyClear &&
          this.oPrescItemVM.PresTechValidatedItemsChild.All(
            (x) =>
              x.FormViewerDetails != null &&
              x.FormViewerDetails.BasicDetails != null &&
              x.FormViewerDetails.BasicDetails.SupplyInstResetAmend
          )
        ) {
          this.oPrescItemVM.IsAmendMCISupplyClear = false;
        }
      }
      if (
        this.oIPVM.FormViewerDetails.TechValidateDetails.SelectedPrescItem
          .FormViewerDetails != null &&
        this.oIPVM.FormViewerDetails.TechValidateDetails.SelectedPrescItem
          .FormViewerDetails.TechValidateDetails != null &&
        this.oIPVM.FormViewerDetails.TechValidateDetails.SelectedPrescItem
          .FormViewerDetails.TechValidateDetails.TechValidatedItems != null
      ) {
        if (
          this.oIPVM.FormViewerDetails.TechValidateDetails.SelectedPrescItem
            .FormViewerDetails.TechValidateDetails.TechValidatedItems.Count > 0
        ) {
          if (this.oPreObj == null) {
            this.oPreObj = new PrescriptionItemVM();
            if (this.oPreObj.FormViewerDetails == null)
              this.oPreObj.FormViewerDetails = new FormViewerVM();
            for (
              let i: number = 0;
              i <
              this.oIPVM.FormViewerDetails.TechValidateDetails
                .PresTechValidatedItems[0].FormViewerDetails.TechValidateDetails
                .TechValidatedItems.Count;
              i++
            ) {
              this.oPreObj.FormViewerDetails.TechValidatedFVMItems =
                new ObservableCollection<CustomTechValidatedItem>();
              this.oPreObj.FormViewerDetails.TechValidatedFVMItems.Add(
                this.oIPVM.FormViewerDetails.TechValidateDetails
                  .PresTechValidatedItems[0].FormViewerDetails
                  .TechValidateDetails.TechValidatedItems[i]
              );
              this.bParentItm = true;
            }
          }
        }
      }
      if (this.oIPVM.FormViewerDetails.BasicDetails != null) {
        if (
          (this.oIPVM.FormViewerDetails.BasicDetails
            .SelectedsupplyInstruction != null &&
            this.oIPVM.FormViewerDetails.BasicDetails.SelectedsupplyInstruction
              .Count > 0) ||
          !String.IsNullOrEmpty(
            this.oIPVM.FormViewerDetails.BasicDetails.Supplycomments
          ) ||
          !String.IsNullOrEmpty(
            this.oIPVM.FormViewerDetails.BasicDetails.SupplyInsVal
          ) ||
          !String.Equals(
            this.oIPVM.SelectedSupplyreq.Value,
            Resource.TechValidate.Empty
          ) ||
          (this.oIPVM.FormViewerDetails.BasicDetails.TechValSupplyInst !=
            null &&
            !String.IsNullOrEmpty(
              this.oIPVM.FormViewerDetails.BasicDetails.TechValSupplyInst.Value
            )) ||
          (this.oIPVM.FormViewerDetails.TechValidateDetails != null &&
            this.oIPVM.FormViewerDetails.TechValidateDetails
              .TechValidatedItems != null &&
            this.oIPVM.FormViewerDetails.TechValidateDetails.TechValidatedItems
              .Count > 0)
        ) {
          if (
            this.oIPVM.PresTechValidatedItemsChild != null &&
            this.oIPVM.PresTechValidatedItemsChild.Count > 0 &&
            !this.oIPVM.PresTechValidatedItemsChild.Any(
              (x) => x.FluidPrescribableItemListOID > 0
            )
          ) {
            this.oIPVM.PresTechValidatedItemsChild.forEach((child) => {
              child.EnableChildMCIComp = false;
            });
          }
        }
      }
      if (
        this.oIPVM != null &&
        this.oIPVM.FormViewerDetails != null &&
        this.oIPVM.FormViewerDetails.BasicDetails != null &&
        String.Equals(
          this.oIPVM.FormViewerDetails.BasicDetails.itemSubType,
          CConstants.SUBTYPE
        ) &&
        this.oIPVM.ActionCode != ActivityTypes.Prescribe
      ) {
        if (
          this.oIPVM.PresTechValidatedItemsChild != null &&
          this.oIPVM.PresTechValidatedItemsChild.Count > 0 &&
          this.oIPVM.FormViewerDetails.TechValidateDetails != null
        ) {
          let IsSupplyNotChangedForParent: boolean = false;
          if (
            !String.IsNullOrEmpty(
              this.oIPVM.FormViewerDetails.BasicDetails.Supplycomments
            ) &&
            String.Equals(
              this.oIPVM.FormViewerDetails.BasicDetails.Supplycomments,
              this.oIPVM.FormViewerDetails.BasicDetails.OriginalSupplyComments
            ) &&
            this.oIPVM.FormViewerDetails.BasicDetails
              .SelectedsupplyInstruction != null &&
            this.oIPVM.FormViewerDetails.BasicDetails
              .OriginalsupplyInstruction != null &&
            this.oIPVM.FormViewerDetails.BasicDetails.SelectedsupplyInstruction
              .Count ==
              this.oIPVM.FormViewerDetails.BasicDetails
                .OriginalsupplyInstruction.Count
          ) {
            let existsupplyinstcount: number =
              this.oIPVM.FormViewerDetails.BasicDetails
                .OriginalsupplyInstruction.Count;
            let existsupplyvalue: string = String.Empty;
            for (let i: number = 0; i < existsupplyinstcount; i++) {
              existsupplyvalue =
                this.oIPVM.FormViewerDetails.BasicDetails
                  .OriginalsupplyInstruction[i].Value;
              if (
                this.oIPVM.FormViewerDetails.BasicDetails.SelectedsupplyInstruction.Where(
                  (c) => c.Value == existsupplyvalue
                ).Count() > 0 &&
                String.Equals(
                  this.oIPVM.SelectedSupplyreq.Value,
                  Resource.TechValidate.Empty,
                  StringComparison.InvariantCultureIgnoreCase
                )
              ) {
                IsSupplyNotChangedForParent = true;
              } else {
                IsSupplyNotChangedForParent = false;
                break;
              }
            }
          } else if (
            !String.IsNullOrEmpty(
              this.oIPVM.FormViewerDetails.BasicDetails.Supplycomments
            ) &&
            String.Equals(
              this.oIPVM.FormViewerDetails.BasicDetails.Supplycomments,
              this.oIPVM.FormViewerDetails.BasicDetails.OriginalSupplyComments
            ) &&
            this.oIPVM.FormViewerDetails.BasicDetails
              .OriginalsupplyInstruction == null &&
            (this.oIPVM.FormViewerDetails.BasicDetails
              .SelectedsupplyInstruction == null ||
              this.oIPVM.FormViewerDetails.BasicDetails
                .SelectedsupplyInstruction.Count == 0) &&
            String.Equals(
              this.oIPVM.SelectedSupplyreq.Value,
              Resource.TechValidate.Empty,
              StringComparison.InvariantCultureIgnoreCase
            )
          ) {
            IsSupplyNotChangedForParent = true;
          } else if (
            String.IsNullOrEmpty(
              this.oIPVM.FormViewerDetails.BasicDetails.Supplycomments
            ) &&
            String.IsNullOrEmpty(
              this.oIPVM.FormViewerDetails.BasicDetails.OriginalSupplyComments
            ) &&
            this.oIPVM.FormViewerDetails.BasicDetails
              .SelectedsupplyInstruction != null &&
            this.oIPVM.FormViewerDetails.BasicDetails
              .OriginalsupplyInstruction != null &&
            this.oIPVM.FormViewerDetails.BasicDetails.SelectedsupplyInstruction
              .Count ==
              this.oIPVM.FormViewerDetails.BasicDetails
                .OriginalsupplyInstruction.Count
          ) {
            let existsupplyinstcount: number =
              this.oIPVM.FormViewerDetails.BasicDetails
                .OriginalsupplyInstruction.Count;
            let existsupplyvalue: string = String.Empty;
            for (let i: number = 0; i < existsupplyinstcount; i++) {
              existsupplyvalue =
                this.oIPVM.FormViewerDetails.BasicDetails
                  .OriginalsupplyInstruction[i].Value;
              if (
                this.oIPVM.FormViewerDetails.BasicDetails.SelectedsupplyInstruction.Where(
                  (c) => c.Value == existsupplyvalue
                ).Count() > 0 &&
                String.Equals(
                  this.oIPVM.SelectedSupplyreq.Value,
                  Resource.TechValidate.Empty,
                  StringComparison.InvariantCultureIgnoreCase
                )
              ) {
                IsSupplyNotChangedForParent = true;
              } else {
                IsSupplyNotChangedForParent = false;
                break;
              }
            }
          } else if (
            String.IsNullOrEmpty(
              this.oIPVM.FormViewerDetails.BasicDetails.OriginalSupplyComments
            ) &&
            String.IsNullOrEmpty(
              this.oIPVM.FormViewerDetails.BasicDetails.Supplycomments
            ) &&
            (this.oIPVM.FormViewerDetails.BasicDetails
              .OriginalsupplyInstruction == null ||
              this.oIPVM.FormViewerDetails.BasicDetails
                .OriginalsupplyInstruction.Count == 0) &&
            (this.oIPVM.FormViewerDetails.BasicDetails
              .SelectedsupplyInstruction == null ||
              this.oIPVM.FormViewerDetails.BasicDetails
                .SelectedsupplyInstruction.Count == 0) &&
            DateTime.Equals(this.oIPVM.FormViewerDetails.BasicDetails.NextSupplyDate,
              DateTime.MinValue)
          ) {
            if (
              !String.Equals(
                this.oIPVM.SelectedSupplyreq.Value,
                Resource.TechValidate.Empty,
                StringComparison.InvariantCultureIgnoreCase
              )
            )
              IsSupplyNotChangedForParent = false;
            else if (
              String.Equals(
                this.oIPVM.SelectedSupplyreq.Value,
                Resource.TechValidate.Empty,
                StringComparison.InvariantCultureIgnoreCase
              ) &&
              this.oIPVM.FormViewerDetails != null &&
              this.oIPVM.FormViewerDetails.TechValidateDetails != null &&
              this.oIPVM.FormViewerDetails.TechValidateDetails
                .TechValidatedItems != null &&
              this.oIPVM.FormViewerDetails.TechValidateDetails
                .TechValidatedItems.Count == 0
            ) {
              IsSupplyNotChangedForParent = true;
            }
          }
          if (IsSupplyNotChangedForParent) {
            this.oIPVM.PresTechValidatedItemsChild.forEach((child) => {
              if (child != null) {
                child.EnableChildMCIComp = true;
              }
            });
          }
        }
        if (
          !this.oIPVM.EnableParentMCIItem &&
          this.oIPVM.PresTechValidatedItemsChild != null &&
          this.oIPVM.PresTechValidatedItemsChild.Count > 0 &&
          this.oIPVM.PresTechValidatedItemsChild.All(
            (x) => x.EditedGridID == 0
          ) &&
          this.oIPVM.PresTechValidatedItemsChild.All(
            (x) =>
              x.FormViewerDetails != null &&
              x.FormViewerDetails.BasicDetails != null &&
              x.FormViewerDetails.BasicDetails.EditedGridID == 0
          )
        ) {
          this.oIPVM.EnableParentMCIItem = true;
        }
      }
      if (
        this.oIPVM.FormViewerDetails.TechValidateDetails.SelectedPrescItem
          .PresTechValidatedItemsChild != null &&
        this.oIPVM.FormViewerDetails.TechValidateDetails.SelectedPrescItem
          .PresTechValidatedItemsChild.Count > 0 &&
        this.oIPVM.FormViewerDetails.TechValidateDetails.SelectedPrescItem
          .PresTechValidatedItemsChild != null &&
        this.oIPVM.FormViewerDetails.TechValidateDetails.SelectedPrescItem
          .PresTechValidatedItemsChild[0] != null
      ) {
        let button = this.grdTechValItem
          .ChildrenOfType<GridExtension>('GridExtension')
          .Where((b) => b.Name == 'grdTecValItmChld')
          .FirstOrDefault();
        if (button != null) {
          button.SelectedItem =
            this.oIPVM.FormViewerDetails.TechValidateDetails.SelectedPrescItem.PresTechValidatedItemsChild[0];
        }
      }
      if (
        this.oIPVM.FormViewerDetails.BasicDetails != null &&
        this.oIPVM.FormViewerDetails.BasicDetails.InfusionDetails != null &&
        this.oIPVM.FormViewerDetails.BasicDetails.InfusionDetails
          .FluidPrescribableItemListOID > 0
      ) {
        let oTmpConstFluidPrescItemVM: PrescriptionItemVM;
        this.oPrescItemVM = ObjectHelper.CreateType<PrescriptionItemVM>(
          this.DataContext,
          PrescriptionItemVM
        );
        if (
          this.oIPVM.FormViewerDetails.TechValidateDetails.SelectedPrescItem
            .PresTechValidatedItemsChild == null ||
          (this.oIPVM.FormViewerDetails.TechValidateDetails.SelectedPrescItem
            .PresTechValidatedItemsChild != null &&
            this.oIPVM.FormViewerDetails.TechValidateDetails.SelectedPrescItem
              .PresTechValidatedItemsChild.Count == 0) ||
          (this.oIPVM.FormViewerDetails.TechValidateDetails.SelectedPrescItem
            .PresTechValidatedItemsChild != null &&
            this.oIPVM.FormViewerDetails.TechValidateDetails.SelectedPrescItem
              .PresTechValidatedItemsChild.Count > 0 &&
            this.oPrescItemVM.FormViewerDetails.BasicDetails != null &&
            this.oPrescItemVM.FormViewerDetails.BasicDetails.InfusionDetails !=
              null &&
            this.oPrescItemVM.FormViewerDetails.BasicDetails.InfusionDetails
              .FluidPrescribableItemListOID > 0 &&
            this.oIPVM.FormViewerDetails.TechValidateDetails.SelectedPrescItem
              .PresTechValidatedItemsChild[0].FluidPrescribableItemListOID !=
              this.oPrescItemVM.FormViewerDetails.BasicDetails.InfusionDetails
                .FluidPrescribableItemListOID)
        ) {
          this.oIPVM.FormViewerDetails.TechValidateDetails.SelectedPrescItem.PresTechValidatedItemsChild =
            new ObservableCollection<PrescriptionItemVM>();
          oTmpConstFluidPrescItemVM = new PrescriptionItemVM();
          if (
            this.oPrescItemVM != null &&
            this.oPrescItemVM.FormViewerDetails != null &&
            this.oPrescItemVM.FormViewerDetails.TechValidateDetails != null
          ) {
            oTmpConstFluidPrescItemVM.FormViewerDetails = new FormViewerVM();
            oTmpConstFluidPrescItemVM.FormViewerDetails.BasicDetails =
              new BasicDetailsVM(null);
            oTmpConstFluidPrescItemVM.FormViewerDetails.TechValidateDetails =
              new TechValidateVM();
            oTmpConstFluidPrescItemVM.FormViewerDetails.BasicDetails.InfusionDetails =
              new InfusionVM();
            if (oTmpConstFluidPrescItemVM != null) {
              oTmpConstFluidPrescItemVM.FormViewerDetails.BasicDetails.InfusionDetails.FluidPrescribableItemListOID =
                this.oIPVM.FormViewerDetails.BasicDetails.InfusionDetails.FluidPrescribableItemListOID;
              oTmpConstFluidPrescItemVM.FormViewerDetails.BasicDetails.IdentifyingOID =
                this.oIPVM.FormViewerDetails.BasicDetails.InfusionDetails.FluidIdentifyingOID;
              oTmpConstFluidPrescItemVM.FormViewerDetails.BasicDetails.IdentifyingType =
                this.oPrescItemVM.FormViewerDetails.BasicDetails.InfusionDetails.FluidItemType;
              oTmpConstFluidPrescItemVM.FormViewerDetails.BasicDetails.IdentifyingName =
                this.oPrescItemVM.FormViewerDetails.BasicDetails.InfusionDetails.FluidFreetext;
              oTmpConstFluidPrescItemVM.ActionCode =
                this.oPrescItemVM.ActionCode;
              oTmpConstFluidPrescItemVM.IsFormViewerFluidItem = true;
              oTmpConstFluidPrescItemVM.PrescriptionItemOID =
                this.oPrescItemVM.PrescriptionItemOID;
              oTmpConstFluidPrescItemVM.FluidPrescribableItemListOID =
                this.oIPVM.FormViewerDetails.BasicDetails.InfusionDetails.FluidPrescribableItemListOID;
              oTmpConstFluidPrescItemVM.FormViewerDetails.TechValidateDetails.TechValidatedItems =
                new ObservableCollection<CustomTechValidatedItem>();
              oTmpConstFluidPrescItemVM.LorenzoID =
                this.oPrescItemVM.FormViewerDetails.BasicDetails.InfusionDetails.FluidLorenzoID;
              oTmpConstFluidPrescItemVM.IsCallForFluid = true;
              oTmpConstFluidPrescItemVM.IsMCIComponent = false;
              oTmpConstFluidPrescItemVM.FormViewerDetails.BasicDetails.PresInfusionItemForFluid =
                this.oPrescItemVM;
              if (
                this.oIPVM.ActionCode == ActivityTypes.Amend &&
                !String.IsNullOrEmpty(
                  this.oPrescItemVM.FormViewerDetails.BasicDetails
                    .FluidSupplyInstrText
                )
              ) {
                let fluidsupplyinstrcomm: string[] =
                  this.oPrescItemVM.FormViewerDetails.BasicDetails.FluidSupplyInstrText.Split(
                    '~~',
                    StringSplitOptions.None
                  );
                if (
                  fluidsupplyinstrcomm != null &&
                  fluidsupplyinstrcomm.length > 1
                ) {
                  oTmpConstFluidPrescItemVM.FormViewerDetails.BasicDetails.Supplycomments =
                    fluidsupplyinstrcomm[1];
                }
              }
              if (
                this.oIPVM.ActionCode == ActivityTypes.Amend &&
                DateTime.NotEquals(this.oPrescItemVM.FormViewerDetails.BasicDetails
                  .FluidNextSupplyDate, DateTime.MinValue)
              ) {
                oTmpConstFluidPrescItemVM.FormViewerDetails.BasicDetails.NextSupplyDate =
                  this.oPrescItemVM.FormViewerDetails.BasicDetails.FluidNextSupplyDate;
              }
              if (oTmpConstFluidPrescItemVM.iSSupplyrequest == null)
                oTmpConstFluidPrescItemVM.iSSupplyrequest =
                  new ObservableCollection<CListItem>();
              if (this.oPrescItemVM.iSSupplyrequest != null) {
                oTmpConstFluidPrescItemVM.iSSupplyrequest =
                  this.oPrescItemVM.iSSupplyrequest;
              }
              if (oTmpConstFluidPrescItemVM.iSSupplyrequest != null) {
                let objselectedval: CListItem =
                  oTmpConstFluidPrescItemVM.iSSupplyrequest
                    .Where(
                      (x) =>
                        !String.IsNullOrEmpty(x.Value) &&
                        String.Equals(x.Value, Resource.TechValidate.Empty)
                    )
                    .FirstOrDefault();
                oTmpConstFluidPrescItemVM.SelectedSupplyreq = objselectedval;
              }
              oTmpConstFluidPrescItemVM.FormViewerDetails.BasicDetails.Route =
                ObjectHelper.CreateObject(new CListItem(), {
                  DisplayText:
                    this.oIPVM.FormViewerDetails.BasicDetails.Route.DisplayText,
                  Value: this.oIPVM.FormViewerDetails.BasicDetails.Route.Value,
                  Tag: this.oIPVM.FormViewerDetails.BasicDetails.Route.Tag,
                });
              if (this.oPrescItemVM.LoadParentSupplyDetailsForFluid) {
                oTmpConstFluidPrescItemVM.SelectedSupplyreq =
                  this.oPrescItemVM.SelectedSupplyreq;
                oTmpConstFluidPrescItemVM.FormViewerDetails.BasicDetails.Supplycomments =
                  this.oPrescItemVM.FormViewerDetails.BasicDetails.Supplycomments;
                oTmpConstFluidPrescItemVM.FormViewerDetails.BasicDetails.SelectedsupplyInstruction =
                  new ObservableCollection<CListItem>();
                oTmpConstFluidPrescItemVM.FormViewerDetails.BasicDetails.SelectedsupplyInstruction =
                  this.oPrescItemVM.FormViewerDetails.BasicDetails.SelectedsupplyInstruction;
                oTmpConstFluidPrescItemVM.SupplyreqDisplay =
                  this.oPrescItemVM.SupplyreqDisplay;
                oTmpConstFluidPrescItemVM.supToolTipDisText =
                  this.oPrescItemVM.supToolTipDisText;
                oTmpConstFluidPrescItemVM.SupDisText =
                  this.oPrescItemVM.SupDisText;
                oTmpConstFluidPrescItemVM.FormViewerDetails.BasicDetails.TechsupplyInstText =
                  this.oPrescItemVM.FormViewerDetails.BasicDetails.TechsupplyInstText;
                oTmpConstFluidPrescItemVM.FormViewerDetails.BasicDetails.SupplyInsTextWithComments =
                  this.oPrescItemVM.FormViewerDetails.BasicDetails.SupplyInsTextWithComments;
                oTmpConstFluidPrescItemVM.FormViewerDetails.BasicDetails.SupplyInsVal =
                  this.oPrescItemVM.FormViewerDetails.BasicDetails.SupplyInsVal;
                oTmpConstFluidPrescItemVM.FormViewerDetails.BasicDetails.NextSupplyDate =
                  this.oPrescItemVM.FormViewerDetails.BasicDetails.NextSupplyDate;
                oTmpConstFluidPrescItemVM.FormViewerDetails.BasicDetails.EditedGridID =
                  this.oPrescItemVM.FormViewerDetails.BasicDetails.EditedGridID;
                oTmpConstFluidPrescItemVM.EditedGridID =
                  this.oPrescItemVM.EditedGridID;
              }
            }
            this.oIPVM.FormViewerDetails.TechValidateDetails.SelectedPrescItem.PresTechValidatedItemsChild.Add(
              oTmpConstFluidPrescItemVM
            );
          }
        } else if (
          this.oIPVM.FormViewerDetails.TechValidateDetails.SelectedPrescItem
            .PresTechValidatedItemsChild != null &&
          this.oIPVM.FormViewerDetails.TechValidateDetails.SelectedPrescItem
            .PresTechValidatedItemsChild.Count > 0
        ) {
          let fluidVM: PrescriptionItemVM =
            this.oIPVM.FormViewerDetails.TechValidateDetails.SelectedPrescItem.PresTechValidatedItemsChild.Where(
              (x) => x.FluidPrescribableItemListOID > 0
            ).FirstOrDefault();
          this.oPrescItemVM = ObjectHelper.CreateType<PrescriptionItemVM>(
            this.DataContext,
            PrescriptionItemVM
          );
          if (fluidVM != null && fluidVM.iSSupplyrequest == null) {
            fluidVM.iSSupplyrequest = new ObservableCollection<CListItem>();
            if (this.oPrescItemVM.iSSupplyrequest != null) {
              fluidVM.iSSupplyrequest = this.oPrescItemVM.iSSupplyrequest;
            }
            if (fluidVM.iSSupplyrequest != null) {
              if (fluidVM.SelectedSupplyreq != null) {
                let objselectedval: CListItem = fluidVM.iSSupplyrequest
                  .Where(
                    (x) =>
                      !String.IsNullOrEmpty(x.Value) &&
                      String.Equals(
                        x.Value,
                        fluidVM.SelectedSupplyreq.Value,
                        StringComparison.InvariantCultureIgnoreCase
                      )
                  )
                  .FirstOrDefault();
                fluidVM.SelectedSupplyreq = objselectedval;
              } else {
                let objselectedval: CListItem = fluidVM.iSSupplyrequest
                  .Where(
                    (x) =>
                      !String.IsNullOrEmpty(x.Value) &&
                      String.Equals(
                        x.Value,
                        Resource.TechValidate.Empty,
                        StringComparison.InvariantCultureIgnoreCase
                      )
                  )
                  .FirstOrDefault();
                fluidVM.SelectedSupplyreq = objselectedval;
              }
            }
          }
          if (String.IsNullOrEmpty(fluidVM.LorenzoID)) {
            if (
              this.oIPVM.FormViewerDetails.BasicDetails != null &&
              this.oIPVM.FormViewerDetails.BasicDetails.InfusionDetails != null
            ) {
              fluidVM.LorenzoID =
                this.oIPVM.FormViewerDetails.BasicDetails.InfusionDetails.FluidLorenzoID;
            }
          }
          fluidVM.IsCallForFluid = true;
          fluidVM.IsMCIComponent = false;
          fluidVM.IsFormViewerFluidItem = true;
          fluidVM.ActionCode = this.oIPVM.ActionCode;
          if (
            fluidVM != null &&
            fluidVM.FormViewerDetails != null &&
            fluidVM.FormViewerDetails.BasicDetails != null &&
            this.oPrescItemVM != null &&
            this.oPrescItemVM.FormViewerDetails != null &&
            this.oPrescItemVM.FormViewerDetails.BasicDetails != null
          ) {
            fluidVM.FormViewerDetails.BasicDetails.IdentifyingOID =
              this.oIPVM.FormViewerDetails.BasicDetails.InfusionDetails.FluidIdentifyingOID;
            fluidVM.FormViewerDetails.BasicDetails.IdentifyingType =
              this.oPrescItemVM.FormViewerDetails.BasicDetails.InfusionDetails.FluidItemType;
            fluidVM.FormViewerDetails.BasicDetails.IdentifyingName =
              this.oPrescItemVM.FormViewerDetails.BasicDetails.InfusionDetails.FluidFreetext;
            fluidVM.FormViewerDetails.BasicDetails.PresInfusionItemForFluid =
              this.oPrescItemVM;
          }
          fluidVM.PrescriptionItemOID = this.oPrescItemVM.PrescriptionItemOID;
          if (
            this.oIPVM != null &&
            this.oIPVM.FormViewerDetails != null &&
            this.oIPVM.FormViewerDetails.BasicDetails != null &&
            this.oIPVM.FormViewerDetails.BasicDetails.InfusionDetails != null
          ) {
            fluidVM.FluidPrescribableItemListOID =
              this.oIPVM.FormViewerDetails.BasicDetails.InfusionDetails.FluidPrescribableItemListOID;
          }
          fluidVM.IsWardStockFluid =
            this.oIPVM.FormViewerDetails.BasicDetails.InfusionDetails.IsWardStockFluid;
          if (
            this.oPrescItemVM.FormViewerDetails.TechValidateDetails != null &&
            this.oPrescItemVM.FormViewerDetails.TechValidateDetails
              .TechValidatedItems != null
          ) {
            let FluidTV: CustomTechValidatedItem =
              this.oPrescItemVM.FormViewerDetails.TechValidateDetails.TechValidatedItems.Where(
                (x) => x.FluidPrescribableItemListOID > 0
              ).FirstOrDefault();
            if (FluidTV != null) {
              fluidVM.FormViewerDetails.TechValidateDetails =
                new TechValidateVM();
              fluidVM.FormViewerDetails.TechValidateDetails.TechValidatedItems =
                new ObservableCollection<CustomTechValidatedItem>();
              fluidVM.FormViewerDetails.TechValidateDetails.TechValidatedItems.Add(
                FluidTV
              );
            }
          }
          let TechValidatItems =
            this.oIPVM.FormViewerDetails.TechValidateDetails.TechValidatedItems.Where(
              (TechValItems) =>
                TechValItems.IsDoseCombinationsDefined == '1' &&
                TechValItems.FluidPrescribableItemListOID == 0
            ).Select((TechValItems) => TechValItems);
          if (TechValidatItems != null && TechValidatItems.Count() > 0) {
            this.oIPVM.FormViewerDetails.TechValidateDetails.TechValidatedItems =
              new ObservableCollection<CustomTechValidatedItem>(TechValidatItems);
          }
          if (
            !this.oIPVM.IsSupplyRecordedViaCV &&
            this.oPrescItemVM != null &&
            this.oPrescItemVM.LoadParentSupplyDetailsForFluid &&
            fluidVM != null &&
            fluidVM.FormViewerDetails != null &&
            fluidVM.FormViewerDetails.BasicDetails != null &&
            this.oPrescItemVM.FormViewerDetails != null &&
            this.oPrescItemVM.FormViewerDetails.BasicDetails != null
          ) {
            fluidVM.SelectedSupplyreq = this.oPrescItemVM.SelectedSupplyreq;
            fluidVM.FormViewerDetails.BasicDetails.Supplycomments =
              this.oPrescItemVM.FormViewerDetails.BasicDetails.Supplycomments;
            fluidVM.FormViewerDetails.BasicDetails.SelectedsupplyInstruction =
              new ObservableCollection<CListItem>();
            fluidVM.FormViewerDetails.BasicDetails.SelectedsupplyInstruction =
              this.oPrescItemVM.FormViewerDetails.BasicDetails.SelectedsupplyInstruction;
            fluidVM.SupplyreqDisplay = this.oPrescItemVM.SupplyreqDisplay;
            fluidVM.supToolTipDisText = this.oPrescItemVM.supToolTipDisText;
            fluidVM.SupDisText = this.oPrescItemVM.SupDisText;
            fluidVM.FormViewerDetails.BasicDetails.TechsupplyInstText =
              this.oPrescItemVM.FormViewerDetails.BasicDetails.TechsupplyInstText;
            fluidVM.FormViewerDetails.BasicDetails.SupplyInsTextWithComments =
              this.oPrescItemVM.FormViewerDetails.BasicDetails.SupplyInsTextWithComments;
            fluidVM.FormViewerDetails.BasicDetails.SupplyInsVal =
              this.oPrescItemVM.FormViewerDetails.BasicDetails.SupplyInsVal;
            fluidVM.FormViewerDetails.BasicDetails.NextSupplyDate =
              this.oPrescItemVM.FormViewerDetails.BasicDetails.NextSupplyDate;
            fluidVM.FormViewerDetails.BasicDetails.EditedGridID =
              this.oPrescItemVM.FormViewerDetails.BasicDetails.EditedGridID;
            fluidVM.EditedGridID = this.oPrescItemVM.EditedGridID;
          } else if (this.oIPVM.IsSupplyRecordedViaCV) {
            if (fluidVM.iSSupplyrequest != null) {
              let objselectedval: CListItem = fluidVM.iSSupplyrequest
                .Where(
                  (x) =>
                    !String.IsNullOrEmpty(x.Value) &&
                    String.Equals(x.Value, Resource.TechValidate.Empty)
                )
                .FirstOrDefault();
              fluidVM.SelectedSupplyreq = objselectedval;
            }
            if (
              fluidVM.FormViewerDetails != null &&
              fluidVM.FormViewerDetails.BasicDetails != null
            ) {
              fluidVM.FormViewerDetails.BasicDetails.Supplycomments = null;
              fluidVM.FormViewerDetails.BasicDetails.SelectedsupplyInstruction =
                null;
              fluidVM.FormViewerDetails.BasicDetails.TechsupplyInstText = null;
              fluidVM.FormViewerDetails.BasicDetails.SupplyInsTextWithComments =
                null;
              fluidVM.FormViewerDetails.BasicDetails.SupplyInsVal = null;
            }
          }
          if (
            fluidVM.FormViewerDetails.BasicDetails.SelectedsupplyInstruction !=
              null &&
            fluidVM.FormViewerDetails.BasicDetails.SelectedsupplyInstruction
              .Count > 0
          ) {
            if (
              fluidVM.FormViewerDetails.BasicDetails
                .ExistingSupplyinstruction == null ||
              fluidVM.FormViewerDetails.BasicDetails.ExistingSupplyinstruction
                .Count == 0
            ) {
              fluidVM.FormViewerDetails.BasicDetails.ExistingSupplyinstruction =
                new ObservableCollection<CListItem>();
              fluidVM.FormViewerDetails.BasicDetails.SelectedsupplyInstruction.forEach(
                (instr) => {
                  fluidVM.FormViewerDetails.BasicDetails.ExistingSupplyinstruction.Add(
                    instr
                  );
                }
              );
            }
          }
          if (
            !String.IsNullOrEmpty(
              fluidVM.FormViewerDetails.BasicDetails.Supplycomments
            )
          ) {
            fluidVM.FormViewerDetails.BasicDetails.ExistingSupplyComments =
              fluidVM.FormViewerDetails.BasicDetails.Supplycomments;
          }
          if (
            DateTime.NotEquals(fluidVM.FormViewerDetails.BasicDetails.NextSupplyDate,
            DateTime.MinValue)
          ) {
            fluidVM.FormViewerDetails.BasicDetails.OriginalFluidNextSupplyDate =
              fluidVM.FormViewerDetails.BasicDetails.NextSupplyDate;
          }
        }
      }
    }
  }
  public oMsg_AlertBoxPromtNextClose(
    sender: Object,
    e: MessageEventArgs
  ): void {
    if (e.MessageBoxResult == MessageBoxResult.OK) {
      if (this.oIPVM != null) {
        this.oIPVM.IsNextSupply = false;
      }
    }
  }
  dtpDate_OnDateChange_Func = (s, e) => { this.dtpDate_OnDateChange(s, e); }
  private dtpDate_OnDateChange(sender: Object, e: DateChangeEventArgs): void {
    let dt: DateTime = DateTime.MinValue;
    let Valchk: boolean = false;
    //e.DateValue type should be changed to string by platform
    if (
      sender != null &&
      !String.IsNullOrEmpty(e.DateValue.toString()) &&
      DateTime.TryParse(e.DateValue.ToString(), (o1) => {
        dt = o1;
      })
    ) {
      let oDTPicker: FrameworkElement =
        ObjectHelper.CreateType<FrameworkElement>(sender, FrameworkElement);
      if (oDTPicker != null) {
        let item: PrescriptionItemVM =
          ObjectHelper.CreateType<PrescriptionItemVM>(
            oDTPicker.DataContext,
            PrescriptionItemVM
          );
        if (
          DateTime.NotEquals(dt, DateTime.MinValue) &&
          DateTime.LessThan(dt.Date, CommonBB.GetServerDateTime().Date)
        ) {
          let oMsg: iMessageBox = new iMessageBox();
          oMsg.Title = Resource.multilist.lblNextSupplyDTTM_Text;
          oMsg.Message = Resource.TechValidate.TVCurrentDateMSG;
          oMsg.MessageButton = MessageBoxButton.OK;
          oMsg.IconType = MessageBoxType.Information;
          oMsg.MessageBoxClose = (s, e) => {
            this.oMsg_AlertBoxPromtNextClose(s, e); 
            this.DataContext.FormViewerDetails.BasicDetails.NextSupplyDate=DateTime.MinValue;                                       
          };
          oMsg.Show();
          if (
            item != null &&
            item.FormViewerDetails != null &&
            item.FormViewerDetails.BasicDetails != null
          ) {
            item.FormViewerDetails.BasicDetails.NextSupplyDate =
              DateTime.MinValue;
          }
          if (this.oIPVM != null) {
            this.oIPVM.IsNextSupply = true;
            Valchk = true;
          }
          if (this.oIPVM != null && this.oIPVM.isTechVldMsg) {
            let oFauxTab: iTab = ObjectHelper.CreateType<iTab>(
              ObjectHelper.CreateType<iTabItem>(this.Parent, iTabItem).Parent,
              iTab
            );
            let oFauxTabItem: iTabItem = oFauxTab.GetItem('frmTech');
            if (
              oFauxTabItem instanceof iTabItem &&
              oFauxTabItem.Key == 'frmTech'
            ) {
              oFauxTab.Click(oFauxTabItem.Key, true);
            }
          }
        }
      }
    }
    if (this.oIPVM != null && !Valchk) {
      this.oIPVM.IsNextSupply = false;
    }
  }

  private grdTecValItmChld_onCellClick(
    sender: Object,
    args: GridViewCellClickEventArgs
  ): void {
    let currowindex: number = args.RowIndex;
    let ChildGrid = this.grdTechValItem
      .ChildrenOfType<GridExtension>('GridExtension')
      .Where((b) => b.Name == 'grdTecValItmChld')
      .FirstOrDefault();
    let sCurrCol: string = args.ColumnCell.Column.UniqueName;
    if (this.oIPVM != null) {
      this.oIPVM.bAvoidNextSupplyFirsttime = true;
    }
    if (
      String.Compare(
        sCurrCol,
        'Comments',
        StringComparison.CurrentCultureIgnoreCase
      ) == 0
    ) {
      if (!args.ColumnCell?.DataContext?.EnableChildMCIComp) {
        return;
      }
      let lstPrescriptionItemVM: ObservableCollection<Object> =
        new ObservableCollection<Object>();
      if (args.RowIndex != -1) {
        ChildGrid.setSelectedItemByIndex(args.RowIndex);
      }
      this.oItem = ObjectHelper.CreateType<PrescriptionItemVM>(
        args.ColumnCell.DataContext,
        PrescriptionItemVM
      );
      if (
        this.oItem != null &&
        this.oItem.FormViewerDetails != null &&
        this.oItem.FormViewerDetails.BasicDetails != null
      ) {
        this.oItem.FormViewerDetails.BasicDetails.TechCASupplyInstrClick = (
          s,
          e
        ) => {
          this.TechCASupplyInstrClickEve(s);
        };
      }
      this.oItem.IsTechValidate = true;
      if (this.oItem != null && this.oItem.EnableChildMCIComp) {
        if (
          this.oItem.IsSupplyRequested == false &&
          (String.Equals(
            sCurrCol,
            'colInitiateSupplyRequest',
            StringComparison.InvariantCultureIgnoreCase
          ) ||
            String.Equals(
              sCurrCol,
              'Comments',
              StringComparison.InvariantCultureIgnoreCase
            ))
        ) {
          this.bChildSupplyDispClick = true;
          if (
            String.Compare(
              sCurrCol,
              'colInitiateSupplyRequest',
              StringComparison.CurrentCultureIgnoreCase
            ) == 0
          )
            this.oItem.IsSupplyRequested = true;
          if (
            this.oItem.FormViewerDetails != null &&
            this.oItem.FormViewerDetails.TechValidateDetails != null
          )
            this.oItem.FormViewerDetails.TechValidateDetails.IsMciChildSelected =
              true;
          lstPrescriptionItemVM.Add(this.oItem);
          this.oItem.FormViewerDetails.BasicDetails.oPrescitemVM = this.oItem;
          if (this.oItem.FormViewerDetails.TechValidateDetails != null) {
            this.oItem.FormViewerDetails.TechValidateDetails.FetchfrombasicDetails =
              true;
          } else {
            this.oItem.FormViewerDetails.TechValidateDetails =
              new TechValidateVM();
            this.oItem.FormViewerDetails.TechValidateDetails.FetchfrombasicDetails =
              true;
          }
          this.oItem.FormViewerDetails.BasicDetails.LaunchedFromTechValidate =
            false;
          this.oItem.FormViewerDetails.TechValidateDetails.IslaunchedFromProductOptions =
            false;
          this.oItem.FormViewerDetails.BasicDetails.launchsupplyinstrmezzanine();
        }
      }
    }
  }

  private grdTecValItmChld_RowLoaded(sender: Object, e: RowLoadedEventArgs): void {
    if (
      PatientContext.PrescriptionType == PrescriptionTypes.ForAdministration ||
      PatientContext.PrescriptionType == PrescriptionTypes.Inpatient
    ) {
      let SupplyRequest: GridViewColumn = e.GridViewDataControl.Columns['colInitiateSupplyRequest'];
      if (SupplyRequest instanceof GridViewColumn) {
        SupplyRequest.IsVisible = true;
      }
      let Nextsupply: GridViewColumn = e.GridViewDataControl.Columns['Nextsupply'];
      if (
        MedicationCommonProfileData.AddPrescribingConfig != null &&
        MedicationCommonProfileData.AddPrescribingConfig.EnableWardStockConfig &&
        Nextsupply instanceof GridViewColumn
      ) {
        Nextsupply.IsVisible = true;
      }
    }
  }

  private itemToSelect: Object;
  private grdTecValItmChld_GridMouseButtonClicking(
    sender: Object,
    e: MouseButtonEventArgs
  ): void {
    let senderElement = <FrameworkElement>e.OriginalSource;
    if (
      String.Compare(
        senderElement.Name.ToString(),
        'NavigatorIndicatorBackground',
        StringComparison.CurrentCultureIgnoreCase
      ) == 0
    ) {
      let clickedRow = senderElement.ParentOfType<GridViewRow>();
      let ChildGrid = this.grdTechValItem
        .ChildrenOfType<GridExtension>('GridExtension')
        .Where((b) => b.Name == 'grdTecValItmChld')
        .FirstOrDefault();
      if (clickedRow != null && this.itemToSelect == null) {
        ChildGrid.RowSelectUnselect(clickedRow, true);
      } else {
        if (clickedRow != null && clickedRow.IsSelected) {
          ChildGrid.RowSelectUnselect(clickedRow, false);
        }
      }
      if (clickedRow != null) {
        if (clickedRow.IsSelected) {
          ChildGrid.RowSelectUnselect(clickedRow, false);
        } else {
          ChildGrid.RowSelectUnselect(clickedRow, true);
        }
      }
      this.itemToSelect = null;
    }
  }

  private grdTecValItmChld_SelectionChanged(sender: Object, e: SelectionChangeEventArgs): void {
    if (e.AddedItems.Count > 0) {
      this.itemToSelect = e.AddedItems[0];
    }
  }

  private grdTechValItem_RowIsExpandedChanged(sender: Object, e: RowEventArgs): void {
    this.grdTechValItem.SaveChildGridSelectedIndex(e);
    if (e.Row.IsSelected == false) e.Row.IsSelected = true;
    if (this.oPrescItemVM == null) {
      this.oPrescItemVM = ObjectHelper.CreateType<PrescriptionItemVM>(
        this.DataContext,
        PrescriptionItemVM
      );
    }
    if (
      this.oPrescItemVM != null &&
      this.oPrescItemVM.FormViewerDetails != null &&
      this.oPrescItemVM.FormViewerDetails.BasicDetails != null
    ) {
      if (
        String.Equals(
          this.oPrescItemVM.FormViewerDetails.BasicDetails.itemSubType,
          'CC_MULCMPNTITM',
          StringComparison.InvariantCultureIgnoreCase
        )
      ) {
        let oRow: GridViewRow = ObjectHelper.CreateType<GridViewRow>(
          e.Row,
          GridViewRow
        );
        if (oRow != null) {
          if (oRow.IsExpanded) {
            this.oPrescItemVM.FormViewerDetails.TechValidateDetails.IsMciChildSelected =
              true;
            this.cmdCatalogueOptions.IsEnabled = true;
            if (this.iFirstHit) {
              if (
                this.oPrescItemVM.FormViewerDetails.TechValidateDetails
                  .SelectedPrescItem != null &&
                this.oPrescItemVM.FormViewerDetails.TechValidateDetails
                  .SelectedPrescItem.FormViewerDetails != null &&
                this.oPrescItemVM.FormViewerDetails.TechValidateDetails
                  .SelectedPrescItem.FormViewerDetails.BasicDetails != null
              ) {
                this.oPrescItemVM.isShowallVisible = Visibility.Visible;
                if (this.AllProd.IsChecked.HasValue) {
                  this.AllProd.IsChecked = false;
                }
              }
            }
          } else if (!oRow.IsExpanded) {
            if (
              String.Equals(
                this.oPrescItemVM.FormViewerDetails.TechValidateDetails
                  .SelectedPrescItem.LorenzoID,
                'PI-001',
                StringComparison.CurrentCultureIgnoreCase
              )
            ) {
              let oDrugItemInfo: ObservableCollection<DrugItemBasicInfo> =
                new ObservableCollection<DrugItemBasicInfo>();
              this.oPrescItemVM.FormViewerDetails.TechValidateDetails.oDrugItemBasicInfo =
                oDrugItemInfo;
              this.iFirstHit = true;
              this.oPrescItemVM.isShowallVisible = Visibility.Collapsed;
              this.cmdCatalogueOptions.Visibility = Visibility.Visible;
              this.cmdCatalogueOptions.IsEnabled = false;
              this.cmdFormularyOptions.Visibility = Visibility.Collapsed;
              this.oPrescItemVM.FormViewerDetails.TechValidateDetails.IsMciChildSelected =
                false;
            } else if (
              String.Compare(
                this.oPrescItemVM.FormViewerDetails.TechValidateDetails
                  .SelectedPrescItem.LorenzoID,
                'PI-001',
                StringComparison.CurrentCultureIgnoreCase
              ) != 0
            ) {
              let sIdentifyingName: string = String.Empty;
              let lIdentifyingOid: number = 0;
              let sIdentifyingType: string = String.Empty;
              let sMciItem: string = String.Empty;
              let itemSubType: string = String.Empty;
              itemSubType =
                this.oPrescItemVM.FormViewerDetails.TechValidateDetails
                  .SelectedPrescItem.FormViewerDetails.BasicDetails.itemSubType;
              sMciItem =
                this.oPrescItemVM.FormViewerDetails.TechValidateDetails
                  .SelectedPrescItem.FormViewerDetails.BasicDetails
                  .mCIItemDisplay;
              sIdentifyingName =
                this.oPrescItemVM.FormViewerDetails.TechValidateDetails
                  .SelectedPrescItem.FormViewerDetails.BasicDetails
                  .IdentifyingName;
              lIdentifyingOid =
                this.oPrescItemVM.FormViewerDetails.TechValidateDetails
                  .SelectedPrescItem.FormViewerDetails.BasicDetails
                  .IdentifyingOID;
              sIdentifyingType =
                this.oPrescItemVM.FormViewerDetails.TechValidateDetails
                  .SelectedPrescItem.FormViewerDetails.BasicDetails
                  .IdentifyingType;
              if (
                !String.IsNullOrEmpty(itemSubType) &&
                !String.IsNullOrEmpty(sMciItem)
              ) {
                let cMcicount: number = sMciItem.Split('^').length - 1;
                if (cMcicount < 5)
                  sIdentifyingName = sMciItem.Replace('^', '\n');
              }
              let oDrugItemInfo: ObservableCollection<DrugItemBasicInfo> =
                new ObservableCollection<DrugItemBasicInfo>();
              oDrugItemInfo.Add(
                ObjectHelper.CreateObject(new DrugItemBasicInfo(), {
                  IdentifyingOID: lIdentifyingOid,
                  IdentifyingType: sIdentifyingType,
                  IdentifyingName: sIdentifyingName,
                  TechQtyUomName: '',
                })
              );
              this.oPrescItemVM.FormViewerDetails.TechValidateDetails.oDrugItemBasicInfo =
                oDrugItemInfo;
              this.iFirstHit = true;
              this.oPrescItemVM.isShowallVisible = Visibility.Collapsed;
              if (
                String.Compare(
                  this.oPrescItemVM.FormViewerDetails.TechValidateDetails
                    .SelectedPrescItem.FormViewerDetails.BasicDetails
                    .itemSubType,
                  'CC_MULCMPNTITM',
                  StringComparison.InvariantCultureIgnoreCase
                ) == 0
              ) {
                this.cmdCatalogueOptions.IsEnabled = false;
              } else this.cmdCatalogueOptions.IsEnabled = true;
            }
          }
        }
      } else if (
        this.oPrescItemVM.FormViewerDetails.BasicDetails.InfusionDetails !=
          null &&
        this.oPrescItemVM.FormViewerDetails.BasicDetails.InfusionDetails
          .FluidPrescribableItemListOID > 0
      ) {
        let oDrugItemFluidInfo: ObservableCollection<DrugItemBasicInfo> =
          new ObservableCollection<DrugItemBasicInfo>();
        oDrugItemFluidInfo.Add(
          ObjectHelper.CreateObject(new DrugItemBasicInfo(), {
            IdentifyingOID:
              this.oPrescItemVM.FormViewerDetails.BasicDetails.InfusionDetails
                .FluidIdentifyingOID > 0
                ? this.oPrescItemVM.FormViewerDetails.BasicDetails
                    .InfusionDetails.FluidIdentifyingOID
                : 0,
            IdentifyingType: !String.IsNullOrEmpty(
              this.oPrescItemVM.FormViewerDetails.BasicDetails.InfusionDetails
                .FluidItemType
            )
              ? this.oPrescItemVM.FormViewerDetails.BasicDetails.InfusionDetails
                  .FluidItemType
              : '',
            IdentifyingName: !String.IsNullOrEmpty(
              this.oPrescItemVM.FormViewerDetails.BasicDetails.InfusionDetails
                .FluidFreetext
            )
              ? this.oPrescItemVM.FormViewerDetails.BasicDetails.InfusionDetails
                  .FluidFreetext
              : '',
            TechQtyUomName: '',
          })
        );
        this.oPrescItemVM.FormViewerDetails.TechValidateDetails.oDrugItemBasicInfo =
          oDrugItemFluidInfo;
      }
      this.cmdCatalogueOptions.Visibility = Visibility.Collapsed;
      this.cmdFormularyOptions.Visibility = Visibility.Collapsed;
      this.grdPrescribe.Visibility = Visibility.Collapsed;
      this.grdDosecombinations.Visibility = Visibility.Collapsed;
      this.GrdProduct.Visibility = Visibility.Collapsed;
      this.oPrescItemVM.TechValSplitter = Visibility.Collapsed;
      if (
        this.oPrescItemVM.FormViewerDetails.BasicDetails.InfusionDetails !=
          null &&
        this.oPrescItemVM.FormViewerDetails.BasicDetails.InfusionDetails
          .FluidPrescribableItemListOID == 0 &&
        !String.Equals(
          this.oPrescItemVM.ItemSubType,
          CConstants.SUBTYPE,
          StringComparison.InvariantCultureIgnoreCase
        )
      ) {
        this.cmdCatalogueOptions.Visibility = Visibility.Visible;
        this.grdPrescribe.Visibility = Visibility.Visible;
        this.grdDosecombinations.Visibility = Visibility.Visible;
        this.GrdProduct.Visibility = Visibility.Visible;
        this.oPrescItemVM.TechValSplitter = Visibility.Visible;
      }
    }
    this.bChildSupplyDispClick = true;
  }
  public DisposeFormEvents(): void {
    if (this.oPrsItmVM != null) {
      this.oPrsItmVM.DoCleanUP();
    }
  }
  public DisposeFormObjects(): void {
    if (this.oSupInst != null)
     this.oSupInst.onDialogClose = null;
    if (this.oMultiSelectList != null)
      this.oMultiSelectList.onDialogClose = null;
    if (this.oMultiSelect != null)
      this.oMultiSelect.onDialogClose = null;
    this.PageDataContext = null;
    this.oMultiSelectList = null;
    this.oChildWindow = null;
    this.oSupInst = null;
    this.oItem = null;
    this.oMultiSelect = null;
  }
  
  medFrmviewtechvalidate_Unloaded(sender: Object, e: RoutedEventArgs): void {
    if (this.msgBoxDeactivatedDrug != null) {
      this.msgBoxDeactivatedDrug.Close();
    }
  }

  private cmdPrintsupplysheet_Click(sender: Object, e: RoutedEventArgs): void {
    let sIPPMAREPORT: string = String.Empty;
    let sReportTemplateOID: string = String.Empty;
    let sRDLLatestVersion: string = String.Empty;
    let sStaticFormURL: string = String.Empty;
    let sReportName: string = String.Empty;
    let sRepGrpName: string = String.Empty;
    let sReportQryData: string = String.Empty;
    let objReportDet: ScriptObject = ObjectHelper.CreateType<ScriptObject>(
      HtmlPage.Window.Invoke('GetIPPMAReportDetails', 'ippmaprintsupplysheet'),
      ScriptObject
    );
    if (objReportDet.GetProperty('IPPMAREPORT') != null)
      sIPPMAREPORT = objReportDet.GetProperty('IPPMAREPORT').ToString();
    if (objReportDet.GetProperty('ReportTemplateOID') != null)
      sReportTemplateOID = objReportDet
        .GetProperty('ReportTemplateOID')
        .ToString();
    if (objReportDet.GetProperty('RDLLatestVersion') != null)
      sRDLLatestVersion = objReportDet
        .GetProperty('RDLLatestVersion')
        .ToString();
    if (objReportDet.GetProperty('StaticFormURL') != null)
      sStaticFormURL = objReportDet.GetProperty('StaticFormURL').ToString();
    if (objReportDet.GetProperty('ReportName') != null)
      sReportName = objReportDet.GetProperty('ReportName').ToString();
    if (objReportDet.GetProperty('RepGrpName') != null)
      sRepGrpName = objReportDet.GetProperty('RepGrpName').ToString();
    sReportQryData =
      '&IPPMAREPORT=' +
      sIPPMAREPORT +
      '&ReportTemplateOID=' +
      sReportTemplateOID +
      '&RDLLatestVersion=' +
      sRDLLatestVersion +
      '&StaticFormURL=' +
      sStaticFormURL +
      '&ReportName=' +
      sReportName +
      '&RepGrpName=' +
      sRepGrpName;
    LaunchWizard(this.OnRptWizardClose, 'MN_PRINTREQUEST_P2', sReportQryData);
  }
  public OnRptWizardClose(e: ChildWizardCloseEventargs): void {}

  private grdTechValItem_RowLoaded(sender: Object, e: RowLoadedEventArgs): void {
    if (e.Row != null && e.DataElement != null) {
      let oTech: PrescriptionItemVM =
        ObjectHelper.CreateType<PrescriptionItemVM>(
          e.DataElement,
          PrescriptionItemVM
        );
      if (
        oTech != null &&
        ((!String.IsNullOrEmpty(oTech.ItemSubType) &&
          String.Equals(
            oTech.ItemSubType,
            CConstants.SUBTYPE,
            StringComparison.InvariantCultureIgnoreCase
          )) ||
          (oTech.FormViewerDetails != null &&
            oTech.FormViewerDetails.BasicDetails != null &&
            oTech.FormViewerDetails.BasicDetails.InfusionDetails != null &&
            oTech.FormViewerDetails.BasicDetails.InfusionDetails
              .FluidPrescribableItemListOID > 0))
      ) {
        let dataGridRow: GridViewRow = ObjectHelper.CreateType<GridViewRow>(
          e.Row,
          GridViewRow
        );
        dataGridRow.IsExpanded = true;
        this.grdTechValItem.Columns['Comments'].Header =
          Resource.TechValidate.SupplyDispChild_Header;
        oTech.FormViewerDetails.TechValidateDetails.supplyhyperlinktext =
          Resource.TechValidate.SupplyDispChild_Add_Text;
        oTech.supToolTipDisText = Resource.TechValidate.AddsupinstChild;
        if (
          oTech.FormViewerDetails.BasicDetails.InfusionDetails
            .FluidPrescribableItemListOID > 0 &&
          oTech.PresTechValidatedItemsChild != null &&
          oTech.PresTechValidatedItemsChild[0] != null &&
          oTech.PresTechValidatedItemsChild[0].FluidPrescribableItemListOID > 0
        ) {
          oTech.PresTechValidatedItemsChild[0].supToolTipDisText =
            Resource.TechValidate.AddsupinstChild;
        }
      } else {
        let dataGridRow: GridViewRow = ObjectHelper.CreateType<GridViewRow>(
          e.Row,
          GridViewRow
        );
        dataGridRow.IsExpandable = false;
        if (dataGridRow.IsExpanded) {
          dataGridRow.IsExpanded = false;
        }
        this.grdTechValItem.Columns['Comments'].Header =
          Resource.TechValidate.SupplyDisp_Header;
        oTech.FormViewerDetails.TechValidateDetails.supplyhyperlinktext =
          Resource.TechValidate.SupplyDisp_Add_Text;
        oTech.supToolTipDisText = Resource.TechValidate.Addsupinst;
        if (
          oTech.FormViewerDetails.TechValidateDetailsCA == null &&
          oTech.FormViewerDetails.TechValidateDetails != null
        ) {
          oTech.FormViewerDetails.TechValidateDetails.supplyhyperlinktext =
            oTech.SupDisText;
          oTech.supToolTipDisText =
            Resource.TechValidate.Supplyinst +
            oTech.FormViewerDetails.TechValidateDetails.supplyinstrtext;
        }
      }
    }
  }

  private grdPrescribeSelectedItemUpdate() {
    setTimeout(()=> {
      const firstItem = this.oIPVM.FormViewerDetails.TechValidateDetails.oDrugItemBasicInfo.Count;
      if (firstItem > 0) {
        this.grdPrescribe.selectedRowsIndex = [];
        this.grdPrescribe.SelectedItem = this.oIPVM.FormViewerDetails.TechValidateDetails.oDrugItemBasicInfo[0];
        let selectionChangeEventArgs: SelectionChangeEventArgs = {};
        let addedItemsList: List = new List();
        addedItemsList.Add(this.grdPrescribe.SelectedItem);
        selectionChangeEventArgs.AddedItems = addedItemsList;
        this.grdPrescribe_SelectionChanged({}, selectionChangeEventArgs);
      }
    }, 3000)
  }

  getVisibility(extension: GridExtension) {
    let column = extension?.Columns['Nextsupply'];
    if (MedicationCommonProfileData.AddPrescribingConfig != null && MedicationCommonProfileData.AddPrescribingConfig.EnableWardStockConfig && column)
      return true;
    else
      return false;
  }

  ngOnDestroy() {
    this.medFrmviewtechvalidate_Unloaded(null, null);
  }
}
