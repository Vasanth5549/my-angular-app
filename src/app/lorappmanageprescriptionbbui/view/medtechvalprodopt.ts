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
    StringSplitOptions,
    iAppDialogWindow
} from 'epma-platform/models';
import {
    AppActivity,
    AppActivityBB,
    Convert,
    iMessageBox,
    MessageBox,
    MessageBoxButton,
    MessageBoxResult,
    MessageBoxType,
    MessageEventArgs,
    ProfileFactoryType,
    StringBuilder,
} from 'epma-platform/services';
import {
    CListItem,
    IProfileProp,
    TextWrapping,
} from 'src/app/shared/epma-platform/models/model';
import { ActivityTypes, ConflictIcons } from '../model/common';
import { ProfileData, UserPermissions } from '../utilities/profiledata';
import { Resource } from '../resource';
import { PrescriptionItemVM } from '../viewmodel/PrescriptionItemVM';
import {
    CommonFlags,
    GlobalVariable,
    QueryStringInfo,
} from '../utilities/globalvariable';
import DateTime from 'epma-platform/DateTime';
import { Dictionary } from 'epma-platform/dictionary';;
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
    TextBlock,
    ToolTipService,
    iTextBox,
    MouseButtonEventArgs,
    FontStyles,
    FontWeights,
    iComboBox,
    StackPanel,
    Grid,
} from 'epma-platform/controls';
import { AfterViewInit, ChangeDetectorRef, Component, OnInit, QueryList, ViewChild, ViewChildren, Input } from '@angular/core';
import {
    CellComponent,
    ColumnComponent,
    GridComponent,
    PageChangeEvent,
    RowArgs,
    RowClassArgs,
    SelectionEvent,
} from '@progress/kendo-angular-grid';
import {
    Color,
    Colors,
    EventArgs,
    SolidColorBrush,
} from 'src/app/shared/epma-platform/controls/Control';

import { MedChartData } from 'src/app/lorappmedicationcommonbb/utilities/globalvariable';
import { Busyindicator } from 'src/app/lorappcommonbb/busyindicator';
import { AMSHelper } from 'src/app/lorappcommonbb/amshelper';
import { PrescriptionHelper } from '../utilities/prescriptionhelper';
import { MonoGraphVM } from 'src/app/lorappmedicationcommonbb/viewmodel/MonographVM';
import { PrescribingConfigData } from 'src/app/lorappslprofiletypes/medication';
import { GPConnectItemVM } from '../viewmodel/GPConnectItemVM';
import { ClerkFormViewDeftBehaviour, Environment } from '../../product/shared/models/Common';
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

import { medTechvalProdOptVM } from '../viewmodel/medTechvalProdOptVM';
import { BasicDetailsVM } from '../viewmodel/BasicDetailsVM';
import { CConstants, DoseTypeCode, MedImage, PrescriptionTypes, ValueDomain } from '../utilities/constants';
import { CustomTechValidatedItem } from '../viewmodel/customtechvalidateditem';
import { ContextInfo, PatientContext } from 'src/app/lorappcommonbb/utilities/globalvariable';
import { CommonBB } from 'src/app/lorappcommonbb/utilities/common';
import * as ManagePrescSer from 'src/app/shared/epma-platform/soap-client/ManagePrescriptionWS';
import { DrugItemBasicInfo } from 'src/app/shared/epma-platform/soap-client/IPPMAManagePrescriptionWS';
import { FormviewerDisplayHelper } from 'src/app/product/shared/convertor/medicationconverters.service';
import * as _Styles from '../../shared/epma-platform/controls/ControlStyles';
import { RoutedEventArgs } from 'src/app/shared/epma-platform/controls/FrameworkElement';
import { MultiSelectListWindow } from './multiSelectListWindow';
import { medsupplydispensinginstructionstab } from './medsupplydispensinginstructionstab';
import { medTechvalidateCA } from './medtechvalidateCA';
import { medsupplydispensinginstructions } from './medsupplydispensinginstructions';
import { TechValidateTabPipe } from 'src/app/product/shared/pipes/medicationconverters.pipe';
import { CommonService } from 'src/app/product/shared/common.service';
// import { medsupplydispensinginstructions } from 'src/app/product/shared/producthelper.service';
var that
@Component({
    selector: 'medtechvalprodopt',
    templateUrl: './medtechvalprodopt.html',
    styleUrls: ['./medtechvalprodopt.css'],
})
export class medtechvalProdOpt extends iAppDialogWindow implements OnInit, AfterViewInit {
    public Styles = _Styles;
    public resTechValidate = Resource.TechValidate;
    public oMultiSelect: MultiSelectListWindow;
    public oSupInst: medsupplydispensinginstructionstab;
    private bMultiDispSup: boolean = false;
    oItem: PrescriptionItemVM;
    public oMultiSelectList: MultiSelectListWindow;
    private oChildWindow: ChildWindow;
    private bRemoveSelection: boolean = false;
    private _MsgBoxTitle: string = "Critical - LORENZO";
    private _IsDeactivatedPerscItem: boolean = false;
    private bMultiCompChild: boolean = false;
    _parent: medTechvalidateCA = null;
    public TechValidateDetailsCA: medTechvalProdOptVM;
    iPresMultiCompitemOID: number = 0;
    iPrescriptionItemOID: number = 0;
    bTechValformularycheck: boolean = false;
    deletedItems: List<ManagePrescSer.TechValidatedItem> = new List<ManagePrescSer.TechValidatedItem>();
    sMandMsgChck: string = String.Empty;
    sFormStyle: string[];
    sNonFormStyle: string[];
  public oPrescItemVM: PrescriptionItemVM;
  TechValTab: TechValidateTabPipe;
  public maxScrollContentHeight;
  public maxGridHeight;
    public Header: StackPanel;
    @ViewChild("HeaderTempRef", { read: StackPanel }) set _Header(c: StackPanel) {
        if (c) { this.Header = c; }
    };
    public spDrugDetails: StackPanel = new StackPanel();
    @ViewChild("spDrugDetailsTempRef", { read: StackPanel }) set _spDrugDetails(c: StackPanel) {
        if (c) { this.spDrugDetails = c; }
    };
    public brdSTA1: Border;
    @ViewChild("brdSTA1TempRef", {read:Border, static: false }) set _brdSTA1(c: Border){
        if(c){ this.brdSTA1  = c; }
    };
    public cmdAdd: iButton;
    @ViewChild("cmdAddTempRef", { read: iButton, static: false }) set _cmdAdd(c: iButton) {
        if (c) { this.cmdAdd = c; }
    };
    public cmdUpdate: iButton;
    @ViewChild("cmdUpdateTempRef", { read: iButton, static: false }) set _cmdUpdate(c: iButton) {
        if (c) { this.cmdUpdate = c; }
    };
    private lblSupplyInstText: iLabel;
    @ViewChild('lblSupplyInstTextTempRef', { read: iLabel, static: false }) set _lblSupplyInstText(c: iLabel) {
        if (c) {
            this.lblSupplyInstText = c;
        }
    }
    private lblPresItemName: iLabel;
    @ViewChild('lblPresItemNameTempRef', { read: iLabel, static: false }) set _lblPresItemName(c: iLabel) {
        if (c) {
            this.lblPresItemName = c;
        }
    }
    private lblSupplyInstValue: iLabel;
    @ViewChild('lblSupplyInstValueTempRef', { read: iLabel, static: false }) set _lblSupplyInstValue(c: iLabel) {
        if (c) {
            this.lblSupplyInstValue = c;
        }
    }
    private cmdCatalogueOptions: iButton;
    @ViewChild('cmdCatalogueOptionsTempRef', { read: iButton, static: false }) set _cmdCatalogueOptions(c: iButton) {
        if (c) {
            this.cmdCatalogueOptions = c;
        }
    }
    public cboTotalQuantityUOM: iComboBox = new iComboBox();
    @ViewChild('cboTotalQuantityUOMTempRef', { read: iComboBox, static: false }) set _cboTotalQuantityUOM(c: iComboBox) {
        if (c) {
            this.cboTotalQuantityUOM = c;
        }
    }
    public txtQuantity: iTextBox = new iTextBox();
    @ViewChild('txtQuantityTempRef', { read: iTextBox, static: false }) set _txtQuantity(c: iTextBox) {
        if (c) {
            this.txtQuantity = c;
        }
    }
    public cboQuantityPerDoseUOM: iComboBox = new iComboBox();
    @ViewChild('cboQuantityPerDoseUOMTempRef', { read: iComboBox, static: false }) set _cboQuantityPerDoseUOM(c: iComboBox) {
        if (c) {
            this.cboQuantityPerDoseUOM = c;
        }
    }
    public txtTotalQuantity: iTextBox = new iTextBox();
    @ViewChild('txtTotalQuantityTempRef', { read: iTextBox, static: false }) set _txtTotalQuantity(c: iTextBox) {
        if (c) {
            this.txtTotalQuantity = c;
        }
    }
    public  btnAddInfo: iButton = new iButton();
    @ViewChild('btnAddInfoTempRef', { read: iButton, static: false }) set _btnAddInfo(c: iButton) {
        if (c) {
            this.btnAddInfo = c;
        }
    }
    private lblSupplyInst: iLabel;
    @ViewChild('lblSupplyInstTempRef', { read: iLabel, static: false }) set _lblSupplyInst(c: iLabel) {
        if (c) {
            this.lblSupplyInst = c;
        }
    }
    private lblTotalQuantity: iLabel;
    @ViewChild('lblTotalQuantityTempRef', { read: iLabel, static: false }) set _lblTotalQuantity(c: iLabel) {
        if (c) {
            this.lblTotalQuantity = c;
        }
    }
    private lblTotalQuantityUOM: iLabel;
    @ViewChild('lblTotalQuantityUOMTempRef', { read: iLabel, static: false }) set _lblTotalQuantityUOM(c: iLabel) {
        if (c) {
            this.lblTotalQuantityUOM = c;
        }
    }
    private LayoutRoot: Grid;
@ViewChild("LayoutRootTempRef", {read:Grid, static: false }) set _LayoutRoot(c: Grid){
    if(c){ this.LayoutRoot  = c; }
};

private GrdProduct: Grid;
@ViewChild("GrdProductTempRef", {read:Grid, static: false }) set _GrdProduct(c: Grid){
    if(c){ this.GrdProduct  = c; }
};
private AllProd: iCheckBox;
@ViewChild("AllProdTempRef", {read:iCheckBox, static: false }) set _AllProd(c: iCheckBox){
    if(c){ this.AllProd  = c; }
};

private cmdFormularyOptions: iButton;
@ViewChild("cmdFormularyOptionsTempRef", {read:iButton, static: false }) set _cmdFormularyOptions(c: iButton){
    if(c){ this.cmdFormularyOptions  = c; }
};

private ChildLayout: Grid;
@ViewChild("ChildLayoutTempRef", {read:Grid, static: false }) set _ChildLayout(c: Grid){
    if(c){ this.ChildLayout  = c; }
};

private lblQuantityPerDose: iLabel;
@ViewChild("lblQuantityPerDoseTempRef", {read:iLabel, static: false }) set _lblQuantityPerDose(c: iLabel){
    if(c){ this.lblQuantityPerDose  = c; }
};

private lblQuantityPerDoseUOM: iLabel;
@ViewChild("lblQuantityPerDoseUOMTempRef", {read:iLabel, static: false }) set _lblQuantityPerDoseUOM(c: iLabel){
    if(c){ this.lblQuantityPerDoseUOM  = c; }
};


private cmdRemove: iButton;
@ViewChild("cmdRemoveTempRef", {read:iButton, static: false }) set _cmdRemove(c: iButton){
    if(c){ this.cmdRemove  = c; }
};
private brdSTA: Border;
@ViewChild("brdSTATempRef", {read:Border, static: false }) set _brdSTA(c: Border){
    if(c){ this.brdSTA  = c; }
};
private lblBorder: iLabel;
@ViewChild("lblBorderTempRef", {read:iLabel, static: false }) set _lblBorder(c: iLabel){
    if(c){ this.lblBorder  = c; }
};
grdPrescribe: GridExtension = new GridExtension();
grdDosecombinations: GridExtension = new GridExtension();

@ViewChild("grdDosecombinationsTempRef", {read:GridComponent, static: false }) set _grdDosecombinations(c: GridComponent){
    if(c){ 
        this.grdDosecombinations.grid  = c; 
        this.grdDosecombinations.columns = c.columns
    }
};
@ViewChild("grdPrescribeTempRef", {read:GridComponent, static: false }) set _grdPrescribe(c: GridComponent){
    if(c){ 
        this.grdPrescribe.grid  = c; 
        this.grdPrescribe.columns = c.columns
    }
};

    // public spDrugDetails: StackPanel = new StackPanel();

    override _DataContext: any;
  override get DataContext() {
    return this._DataContext;
  }
  @Input() override set DataContext(value: any) {
    this._DataContext = value;
  }

  set medtechvalidate(value: PrescriptionItemVM) {
    this.oPrescItemVM = value; 
  }

    constructor() {
        super();
        that = this;
    }
    ngOnInit(): void {
        this.grdPrescribe.RowIndicatorVisibility = Visibility.Visible;
        this.grdPrescribe.GridSelectionChange = (s, e) => { this.grdPrescribe_SelectionChanged(s, e) };
        this.grdDosecombinations.GridSelectionChange = (s, e) => { 
            this.grdDosecombinations_SelectionChanged(s, e) 
        };
    }
    public maxHeight;
    ngAfterViewInit(): void {
    if(window.screen.height < 1000 && window.devicePixelRatio != 1.25){
        this.maxHeight = 323;
    }else{
        this.maxHeight = (window.devicePixelRatio == 1) ? 645: (645 / window.devicePixelRatio) - 60;  // 645
    }  
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
            this.maxHeight = this.maxHeight - 39;
        }
        this.grdPrescribe.GenerateColumns();
        this.grdDosecombinations.GenerateColumns();
        this.LayoutRoot_Loaded({}, {});
        this.grdPrescribe.SetBinding('data', this.DataContext.oProductOption);
        this.grdDosecombinations.SetBinding('data', this.DataContext.TechValidatedItems);
        this.constructorMedtechvalProdOpt(this.oPrescItemVM);
        this.grdPrescribeSelectedItemUpdate();
        this.SetFoceProductGrid();
        this.TechValidateDetailsCA.IsenableQtyDose=true;
        this.maxScrollContentHeight = CommonService.setDynamicScrollHeight_MedSupplyInstructions("#medtechvalProdOpt");
        if (this.maxScrollContentHeight) {
            this.maxGridHeight = (this.maxScrollContentHeight - 155) / 2; // supply status, instructions, 
        }
        
    }
    private SetFoceProductGrid(){
        if (this.grdPrescribe != null && this.grdPrescribe.Rows != null && this.grdPrescribe.Rows.Count > 0) {
            this.grdPrescribe.setSelectedItemByIndex(0);
          
            this.PopulateUOMs(null);
            this.TechValidateDetailsCA.IsenableAdd = true;
        }
            
  }
   //Added this condition as suggested by SivaRamakrishna for the bug 48304,48306
  setDefaultTextforSupply() {
    if (this.TechValidateDetailsCA != null) {
      this.TechValidateDetailsCA.SetDefaultsupplyText();
    }
  }
    constructorMedtechvalProdOpt(oitems: PrescriptionItemVM) {
        this.oPrescItemVM = oitems;
        this.iPresMultiCompitemOID = oitems.PresMultiCompitemOID;
        this.iPrescriptionItemOID = oitems.PrescriptionItemOID;
        Common.SetColorConfigCSS();
        this.sFormStyle = Common.sFormStyle.Split('~');
        this.sNonFormStyle = Common.sNonFormStyle.Split('~');
        let BasicDetails: BasicDetailsVM = null;
        if (oitems != null && oitems.FormViewerDetails != null && oitems.FormViewerDetails.BasicDetails != null)
            BasicDetails = oitems.FormViewerDetails.BasicDetails;
        if (this.TechValidateDetailsCA == null) {
            this.TechValidateDetailsCA = ObjectHelper.CreateObject(new medTechvalProdOptVM(), { Quantity: String.Empty, TotalQuantity: String.Empty });
        }
        this.DataContext = this.TechValidateDetailsCA;
        if (oitems != null && oitems.FormViewerDetails != null && oitems.FormViewerDetails.TechvalidateCADetails != null) {
            if ((BasicDetails.DrugProperties != null && BasicDetails.DrugProperties.Count > 0) && ((String.Compare(oitems.ItemSubType, CConstants.SUBTYPE, StringComparison.OrdinalIgnoreCase) != 0) || (String.Equals(oitems.ItemSubType, CConstants.SUBTYPE, StringComparison.OrdinalIgnoreCase)))) {
                FormviewerDisplayHelper.GetDrugProperties(BasicDetails.DrugProperties, BasicDetails.IdentifyingType, this.spDrugDetails, BasicDetails.itemSubType);
            }
            if (String.Equals(oitems.ItemSubType, CConstants.SUBTYPE, StringComparison.OrdinalIgnoreCase))
                this.TechValidateDetailsCA.IsenableCatOpt = false;
            else this.TechValidateDetailsCA.IsenableCatOpt = true;
        }
        oitems.IsNonformulary = '1';
        this.TechValidateDetailsCA = ObjectHelper.CreateType<medTechvalProdOptVM>(this.DataContext, medTechvalProdOptVM);
        this.TechValidateDetailsCA.LoadProdOptData(oitems, true);
        if (oitems.FormViewerDetails.TechValidateDetails != null && oitems.FormViewerDetails.TechValidateDetails.TechValidatedItems != null && oitems.FormViewerDetails.TechValidateDetails.TechValidatedItems.Length > 0) {
            this.TechValidateDetailsCA.TechValidatedItems = new ObservableCollection<CustomTechValidatedItem>(oitems.FormViewerDetails.TechValidateDetails.TechValidatedItems);
        }
        if (String.Equals(ContextInfo.MenuCode, CConstants.TechnicallyValidateMenuCode, StringComparison.InvariantCultureIgnoreCase) && this.TechValidateDetailsCA != null && this.TechValidateDetailsCA.TechValidatedItems != null) {
            for (let i: number = 0; i < this.TechValidateDetailsCA.TechValidatedItems.Count; i++) {
                this.TechValidateDetailsCA.SetTechCADetails(this.TechValidateDetailsCA.TechValidatedItems[i], "LOAD");
            }
        }
        //this.TechValidateDetailsCA.SupplyInsTextWithComments = Resource.TechValProdOpt.SelectSupInstrution;
        //this.TechValidateDetailsCA.SupplyInsVal = "";
    }
    @ViewChildren('tempGrdPrescribe') tempGrdPrescribeDataTemplates: QueryList<DataTemplate>;
    @ViewChildren('tempGrdDoseCombinations') tempGrdDoseCombinationsDataTemplates: QueryList<DataTemplate>;

    grdPrescribeRowLoaded(context: any) {
        let rowEventArgs = this.grdPrescribe.GetRowEventArgs(this.tempGrdPrescribeDataTemplates, context);
        this.grdPrescribe_RowLoaded({}, rowEventArgs);
    }

    grdDosecombinationsRowLoaded(context: any) {
        let rowEventArgs = this.grdPrescribe.GetRowEventArgs(this.tempGrdDoseCombinationsDataTemplates, context);
        this.grdDosecombinations_RowLoaded({}, rowEventArgs);
    }
    
    LayoutRoot_UnLoaded(sender: Object, e: RoutedEventArgs): void {
        this.DisposeFormevents();
    }
    private DisposeFormevents(): void {}

    private grdDosecombinations_RowLoaded(sender: Object, e: RowLoadedEventArgs): void {
        let oTech: CustomTechValidatedItem = ObjectHelper.CreateType<CustomTechValidatedItem>(e.DataElement, CustomTechValidatedItem);
        if (oTech != null) {
            let sText: string = String.Empty;
            if (!String.IsNullOrEmpty(oTech.ProdSupplyInsWithComments)) {
                sText = oTech.ProdSupplyInsWithComments;
            }
            else {
                sText = "";
            }
            if (this.TechValidateDetailsCA != null) {
                let SupTxt: TextBlock = ObjectHelper.CreateType<TextBlock>(e.Row.Cells[this.grdDosecombinations.GetColumnIndexByName("SupplyInstruction")].Content, TextBlock);
                SupTxt.SetValue(TextBlock.TextProperty, sText);
                let SuplTooltip: iLabel = new iLabel();
                SuplTooltip.Width = 250;
                SuplTooltip.Text = sText;
                SuplTooltip.IsWordwrap = true;
                SupTxt.SetValue(ToolTipService.ToolTipProperty, SuplTooltip);
                e.Row.Cells[this.grdDosecombinations.GetColumnIndexByName("SupplyInstruction")].SetValue(ToolTipService.ToolTipProperty, SuplTooltip);
            }
        }
  }


    private LayoutRoot_Loaded(sender: Object, e: RoutedEventArgs): void {
        this.ClearControls();
        if (this.TechValidateDetailsCA != null) {
            if (this.oPrescItemVM != null && this.oPrescItemVM.FormViewerDetails != null && this.oPrescItemVM.FormViewerDetails.BasicDetails != null && (String.Equals(this.oPrescItemVM.FormViewerDetails.BasicDetails.IdentifyingType, CConstants.NONCATALOGUEITEM, StringComparison.InvariantCultureIgnoreCase) || String.Equals(this.oPrescItemVM.FormViewerDetails.BasicDetails.IdentifyingType, CConstants.Precatalog, StringComparison.InvariantCultureIgnoreCase))) {
                this.cmdCatalogueOptions.IsEnabled = false;
                if (this.TechValidateDetailsCA.oProductOption == null) {
                    this.TechValidateDetailsCA.oProductOption = new ObservableCollection<DrugItemBasicInfo>();
                    let oDrugItemBasicInfo: DrugItemBasicInfo = new DrugItemBasicInfo();
                    if (!this.oPrescItemVM.canLuanchProdOpt) {
                        oDrugItemBasicInfo.IdentifyingName = this.oPrescItemVM.MedLineDisplayText;
                    }
                    this.TechValidateDetailsCA.oProductOption.Add(oDrugItemBasicInfo);
                }
            }
            if (this.TechValidateDetailsCA.oitems != null && String.Equals(this.TechValidateDetailsCA.oitems.ItemSubType, CConstants.SUBTYPE, StringComparison.OrdinalIgnoreCase)) {
                this.cmdCatalogueOptions.IsEnabled = false;
                if (String.Equals(this.TechValidateDetailsCA.oitems.LorenzoID, "PI-001", StringComparison.CurrentCultureIgnoreCase)) {
                    this.TechValidateDetailsCA.IsenableQtyDose = false;
                    this.TechValidateDetailsCA.IsenableTotQtyDose = false;
                    this.cboTotalQuantityUOM.IsEnabled = false;
                    this.cboQuantityPerDoseUOM.IsEnabled = false;
                    this.txtQuantity.IsEnabled = false;
                    this.txtTotalQuantity.IsEnabled = false;
                    this.lblSupplyInst.IsEnabled = false;
                    this.btnAddInfo.IsEnabled = false;
                }
            }
            this.TechValidateDetailsCA.IsCatalogueOptions = Visibility.Visible;
            this.TechValidateDetailsCA.IsFormularyOptions = Visibility.Collapsed;
            if (this.TechValidateDetailsCA.oitems != null && this.TechValidateDetailsCA.oitems.TechValidatedItems != null && this.TechValidateDetailsCA.oitems.TechValidatedItems.Length > 0) {
                this.TechValidateDetailsCA.TechValidatedItems = this.TechValidateDetailsCA.oitems.TechValidatedItems;
                if (this.grdDosecombinations != null) {
                    this.grdDosecombinations.SelectedItem = this.TechValidateDetailsCA.oitems.TechValidatedItems;
                }
            }
            if (this.TechValidateDetailsCA.oProductOption != null && this.TechValidateDetailsCA.oProductOption.Count > 0) {
                this.TechValidateDetailsCA.SelectedProdOpt = this.TechValidateDetailsCA.oProductOption.FirstOrDefault();
                if (this.grdPrescribe != null && this.TechValidateDetailsCA.SelectedProdOpt != null) {
                    this.grdPrescribe.SelectedItem = this.TechValidateDetailsCA.SelectedProdOpt;
                }
            }
            if (this.oPrescItemVM != null && this.oPrescItemVM.IsTechValidateMandatory && this.oPrescItemVM.IsFormviewTechValtabMandatory) {
                if (this.oPrescItemVM.FormViewerDetails != null && this.oPrescItemVM.FormViewerDetails.TechValidateDetails != null) {
                    if ((String.Compare(PatientContext.PrescriptionType, PrescriptionTypes.Outpatient, StringComparison.CurrentCultureIgnoreCase) == 0) || (String.Compare(PatientContext.PrescriptionType, PrescriptionTypes.Leave, StringComparison.CurrentCultureIgnoreCase) == 0) || (String.Compare(PatientContext.PrescriptionType, PrescriptionTypes.Discharge, StringComparison.CurrentCultureIgnoreCase) == 0)) {
                        if (this.oPrescItemVM.FormViewerDetails.BasicDetails != null && this.oPrescItemVM.FormViewerDetails.BasicDetails.DoseType != null && this.oPrescItemVM.FormViewerDetails.BasicDetails.DoseType.Value != null && this.oPrescItemVM.FormViewerDetails.BasicDetails.DoseType.Value == DoseTypeCode.NORMAL) {
                            this.oPrescItemVM.FormViewerDetails.TechValidateDetails.IsQuantityPerDoseMandatory = true;
                        }
                    }
                    this.oPrescItemVM.FormViewerDetails.TechValidateDetails.IsMandatoryQntyUOM = this.oPrescItemVM.FormViewerDetails.TechValidateDetails.IsQuantityPerDoseMandatory;
                    this.oPrescItemVM.FormViewerDetails.TechValidateDetails.QuantityMand = this.oPrescItemVM.FormViewerDetails.TechValidateDetails.IsQuantityPerDoseMandatory;
                }
                this.lblTotalQuantity.Mandatory = true;
                this.lblTotalQuantityUOM.Mandatory = true;
                if (this.oPrescItemVM != null && this.oPrescItemVM.FormViewerDetails != null && this.oPrescItemVM.FormViewerDetails.TechValidateDetails != null) {
                    this.oPrescItemVM.FormViewerDetails.TechValidateDetails.TotalQuantityMand = true;
                }
            }
            if (ProfileData.AdditionalPrescConfig != null && ProfileData.AdditionalPrescConfig.EnableWardStockConfig && PatientContext.PrescriptionType != PrescriptionTypes.Clerking && PatientContext.ClerkFormViewDefaultBehavior != ClerkFormViewDeftBehaviour.LaunchFormMandatory && this.oPrescItemVM != null && this.oPrescItemVM.FormViewerDetails != null && this.oPrescItemVM.FormViewerDetails.BasicDetails != null && this.oPrescItemVM.FormViewerDetails.BasicDetails.DrugProperties != null && this.oPrescItemVM.FormViewerDetails.BasicDetails.DrugProperties.Where(x => String.Equals(x.DrugPropertyCode, CConstants.DrugPropertyCNTRLDDRUG, StringComparison.InvariantCultureIgnoreCase)).Count() > 0 && String.Equals(ContextInfo.MenuCode, "MN_MED_VALIDATE_S_P2", StringComparison.InvariantCultureIgnoreCase)) {
                this.TechValidateDetailsCA.IsenableTotQtyDose = false;
            }
        }
    }
    private TechValidate(): boolean {
        if (this.TechValidateDetailsCA != null) {
            if (this.TechValidateDetailsCA.launchTechvalCAsupplyinstrmezzanineCheck) {
                return false;
            }
            let Quantity: string = String.Empty;
            let TotalQuantity: string = String.Empty;
            Quantity = this.TechValidateDetailsCA.Quantity;
            TotalQuantity = this.TechValidateDetailsCA.TotalQuantity;
            if (this.oPrescItemVM != null && this.oPrescItemVM.IsTechValidateMandatory && this.oPrescItemVM.IsFormviewTechValtabMandatory) {
                if (String.IsNullOrEmpty(this.TechValidateDetailsCA.TotalQuantity)) {
                    this.sMandMsgChck = "TotQtyVal";
                    return false;
                }
            }
            if (((String.Equals(PatientContext.PrescriptionType, PrescriptionTypes.Discharge, StringComparison.InvariantCultureIgnoreCase) || String.Equals(PatientContext.PrescriptionType, PrescriptionTypes.Outpatient, StringComparison.InvariantCultureIgnoreCase) || String.Equals(PatientContext.PrescriptionType, PrescriptionTypes.Leave, StringComparison.InvariantCultureIgnoreCase)) && (!String.IsNullOrEmpty(this.TechValidateDetailsCA.TotalQuantity) && Convert.ToDouble(this.TechValidateDetailsCA.TotalQuantity) > 0)) || ((String.Equals(PatientContext.PrescriptionType, PrescriptionTypes.Clerking, StringComparison.InvariantCultureIgnoreCase) || String.Equals(PatientContext.PrescriptionType, PrescriptionTypes.ForAdministration, StringComparison.InvariantCultureIgnoreCase) || String.Equals(PatientContext.PrescriptionType, PrescriptionTypes.Inpatient, StringComparison.InvariantCultureIgnoreCase)) && !String.IsNullOrEmpty(this.TechValidateDetailsCA.TotalQuantity))) {
                if (this.TechValidateDetailsCA.TotalQuantityUOM == null || this.TechValidateDetailsCA.TotalQuantityUOM != null && String.IsNullOrEmpty(this.TechValidateDetailsCA.TotalQuantityUOM.DisplayText) && String.IsNullOrEmpty(this.TechValidateDetailsCA.TotalQuantityUOM.Value)) {
                    this.sMandMsgChck = "TotQtyUom";
                    return false;
                }
            }
            else if (((String.Equals(PatientContext.PrescriptionType, PrescriptionTypes.Discharge, StringComparison.InvariantCultureIgnoreCase) || String.Equals(PatientContext.PrescriptionType, PrescriptionTypes.Outpatient, StringComparison.InvariantCultureIgnoreCase) || String.Equals(PatientContext.PrescriptionType, PrescriptionTypes.Leave, StringComparison.InvariantCultureIgnoreCase)) && this.TechValidateDetailsCA.TotalQuantityUOM != null && !String.IsNullOrEmpty(this.TechValidateDetailsCA.TotalQuantityUOM.DisplayText) && !String.IsNullOrEmpty(this.TechValidateDetailsCA.TotalQuantityUOM.Value) && (String.IsNullOrEmpty(this.TechValidateDetailsCA.TotalQuantity) || Convert.ToInt64(this.TechValidateDetailsCA.TotalQuantity) != 0)) || ((String.Equals(PatientContext.PrescriptionType, PrescriptionTypes.Clerking, StringComparison.InvariantCultureIgnoreCase) || String.Equals(PatientContext.PrescriptionType, PrescriptionTypes.ForAdministration, StringComparison.InvariantCultureIgnoreCase) || String.Equals(PatientContext.PrescriptionType, PrescriptionTypes.Inpatient, StringComparison.InvariantCultureIgnoreCase)) && this.TechValidateDetailsCA.TotalQuantityUOM != null && !String.IsNullOrEmpty(this.TechValidateDetailsCA.TotalQuantityUOM.DisplayText) && !String.IsNullOrEmpty(this.TechValidateDetailsCA.TotalQuantityUOM.Value) && String.IsNullOrEmpty(this.TechValidateDetailsCA.TotalQuantity))) {
                this.sMandMsgChck = "TotQtyVal";
                return false;
            }
            if (((String.Equals(PatientContext.PrescriptionType, PrescriptionTypes.Discharge, StringComparison.InvariantCultureIgnoreCase) || String.Equals(PatientContext.PrescriptionType, PrescriptionTypes.Outpatient, StringComparison.InvariantCultureIgnoreCase) || String.Equals(PatientContext.PrescriptionType, PrescriptionTypes.Leave, StringComparison.InvariantCultureIgnoreCase)) && (!String.IsNullOrEmpty(this.TechValidateDetailsCA.Quantity) && Convert.ToDouble(this.TechValidateDetailsCA.Quantity) > 0)) || ((String.Equals(PatientContext.PrescriptionType, PrescriptionTypes.Clerking, StringComparison.InvariantCultureIgnoreCase) || String.Equals(PatientContext.PrescriptionType, PrescriptionTypes.ForAdministration, StringComparison.InvariantCultureIgnoreCase) || String.Equals(PatientContext.PrescriptionType, PrescriptionTypes.Inpatient, StringComparison.InvariantCultureIgnoreCase)) && !String.IsNullOrEmpty(this.TechValidateDetailsCA.Quantity))) {
                if (this.TechValidateDetailsCA.QuantityUOM == null || this.TechValidateDetailsCA.QuantityUOM != null && String.IsNullOrEmpty(this.TechValidateDetailsCA.QuantityUOM.DisplayText) && String.IsNullOrEmpty(this.TechValidateDetailsCA.QuantityUOM.Value)) {
                    this.sMandMsgChck = "QtyUom";
                    return false;
                }
            }
            else if (((String.Equals(PatientContext.PrescriptionType, PrescriptionTypes.Discharge, StringComparison.InvariantCultureIgnoreCase) || String.Equals(PatientContext.PrescriptionType, PrescriptionTypes.Outpatient, StringComparison.InvariantCultureIgnoreCase) || String.Equals(PatientContext.PrescriptionType, PrescriptionTypes.Leave, StringComparison.InvariantCultureIgnoreCase)) && this.TechValidateDetailsCA.QuantityUOM != null && !String.IsNullOrEmpty(this.TechValidateDetailsCA.QuantityUOM.DisplayText) && !String.IsNullOrEmpty(this.TechValidateDetailsCA.QuantityUOM.Value) && (String.IsNullOrEmpty(this.TechValidateDetailsCA.Quantity) || Convert.ToInt64(this.TechValidateDetailsCA.Quantity) != 0)) || ((String.Equals(PatientContext.PrescriptionType, PrescriptionTypes.Clerking, StringComparison.InvariantCultureIgnoreCase) || String.Equals(PatientContext.PrescriptionType, PrescriptionTypes.ForAdministration, StringComparison.InvariantCultureIgnoreCase) || String.Equals(PatientContext.PrescriptionType, PrescriptionTypes.Inpatient, StringComparison.InvariantCultureIgnoreCase)) && this.TechValidateDetailsCA.QuantityUOM != null && !String.IsNullOrEmpty(this.TechValidateDetailsCA.QuantityUOM.DisplayText) && !String.IsNullOrEmpty(this.TechValidateDetailsCA.QuantityUOM.Value) && String.IsNullOrEmpty(this.TechValidateDetailsCA.Quantity))) {
                this.sMandMsgChck = "QtyVal";
                return false;
            }
            if (this.TechValidateDetailsCA.IsMandatoryTechValCASupplyInstr && (String.IsNullOrEmpty(this.TechValidateDetailsCA.SupplyInsVal) || this.TechValidateDetailsCA.SupplyInsVal == "" || String.Equals(this.lblSupplyInstText.Text, "Select supply instructions to enter value(s)", StringComparison.InvariantCultureIgnoreCase))) {
                this.sMandMsgChck = "SupplyInstMand";
                this.lblSupplyInst.Focus();
                return false;
            }
        }
        if (String.Equals(PatientContext.PrescriptionType, PrescriptionTypes.Discharge, StringComparison.InvariantCultureIgnoreCase) || String.Equals(PatientContext.PrescriptionType, PrescriptionTypes.Outpatient, StringComparison.InvariantCultureIgnoreCase) || String.Equals(PatientContext.PrescriptionType, PrescriptionTypes.Leave, StringComparison.InvariantCultureIgnoreCase)) {
            if (String.IsNullOrEmpty(this.TechValidateDetailsCA.TotalQuantity) && !String.IsNullOrEmpty(this.TechValidateDetailsCA.Quantity) && Convert.ToDouble(this.TechValidateDetailsCA.Quantity) == 0) {
                if (this.TechValidateDetailsCA.IsenableTotQtyDose) {
                    this.TechValidateDetailsCA.TotalQuantity = "0";
                }
            }
            if (String.IsNullOrEmpty(this.TechValidateDetailsCA.Quantity) && !String.IsNullOrEmpty(this.TechValidateDetailsCA.TotalQuantity) && Convert.ToDouble(this.TechValidateDetailsCA.TotalQuantity) == 0) {
                this.TechValidateDetailsCA.Quantity = "0";
            }
        }
        return true;
    }
    private QuntityMandatoryMSG(): void {
        if (!String.IsNullOrEmpty(this.sMandMsgChck)) {
            let sQtyMsg: string = this.sMandMsgChck;
            if (String.Equals(sQtyMsg, "QtyVal"))
                sQtyMsg = Resource.TechValProdOpt.Quantityperdose;
            if (String.Equals(sQtyMsg, "TotQtyVal"))
                sQtyMsg = Resource.TechValProdOpt.Totquantity;
            if (String.Equals(sQtyMsg, "QtyUom"))
                sQtyMsg = Resource.TechValProdOpt.QuantityUOM;
            if (String.Equals(sQtyMsg, "TotQtyUom"))
                sQtyMsg = Resource.TechValProdOpt.TotalUOM;
            if (String.Equals(sQtyMsg, "SupplyInstMand"))
                sQtyMsg = Resource.TechValProdOpt.SupplyInstMand;
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
        if (String.Equals(this.sMandMsgChck, "TotQtyVal"))
            this.txtTotalQuantity.Focus();
        else if (String.Equals(this.sMandMsgChck, "TotQtyUom"))
            this.cboTotalQuantityUOM.Focus();
        else if (String.Equals(this.sMandMsgChck, "QtyVal"))
            this.txtQuantity.Focus();
        else if (String.Equals(this.sMandMsgChck, "QtyUom"))
            this.cboQuantityPerDoseUOM.Focus();
        else if (String.Equals(this.sMandMsgChck, "SupplyInstMand")) {
            this.lblSupplyInstValue_MouseLeftButtonUp(null, null);
            if (this.TechValidateDetailsCA.TechQntyPerDosVisible == Visibility.Collapsed) {
                let strImagesource: string = MedImage.GetPath("icon_upsmall.png");
                let strDisImagesource: string = MedImage.GetPath("icon_downsmalldis.png");
                this.btnAddInfo.ChangeImage(strImagesource, strImagesource, strDisImagesource);
                this.TechValidateDetailsCA.TechQntyPerDosVisible = Visibility.Visible;
            }
        }
    }
    public AddClick(): boolean {
        let bNoError: boolean = false;
        if (this.grdPrescribe.GetRowCount() <= 0)
            bNoError = false;
        if (this.TechValidateDetailsCA.TechValidatedItems == null) {
            this.TechValidateDetailsCA.TechValidatedItems = new ObservableCollection<CustomTechValidatedItem>();
        }
        if (this.oPrescItemVM != null && this.oPrescItemVM.FormViewerDetails != null && this.oPrescItemVM.FormViewerDetails.TechValidateDetails != null && this.oPrescItemVM.FormViewerDetails.TechValidateDetails.TechValidatedItems == null) {
            this.oPrescItemVM.FormViewerDetails.TechValidateDetails.TechValidatedItems = new ObservableCollection<CustomTechValidatedItem>();
        }
        if (this.oPrescItemVM.FormViewerDetails.TechValidateDetails != null) {
            this.oPrescItemVM.FormViewerDetails.TechValidateDetails.Technicalvalidateupdate = true;
        }
        let oNewItem: CustomTechValidatedItem = new CustomTechValidatedItem();
        let oTech: DrugItemBasicInfo = new DrugItemBasicInfo();
        try {
            oTech = ObjectHelper.CreateType<DrugItemBasicInfo>(this.grdPrescribe.GetCurrentRowData(), DrugItemBasicInfo);
        }
        catch (err) {
            oTech = null;
        }

        if (oTech == null) {
            iMessageBox.Show(this._MsgBoxTitle, Resource.TechValProdOpt.ProdOptMSG, MessageBoxType.Critical, MessageBoxButton.OK);
            bNoError = false;
            return false;
        }
        if (!this.TechValidate()) {
            this.QuntityMandatoryMSG();
            bNoError = false;
            return false;
        }
        else {
            if (this.duplicatecheck(oTech.IdentifyingOID, "N")) {
                oNewItem.DrugItem = new ManagePrescSer.DrugItemBasicData();
                oNewItem.DrugItem.IdentifyingName = oTech.IdentifyingName;
                oNewItem.DrugItem.IdentifyingOID = oTech.IdentifyingOID;
                oNewItem.DrugItem.IdentifyingType = oTech.IdentifyingType;
                oNewItem.IsWardStock = oTech.IsWardStock;
                oNewItem.DrugItem.PrescribableItemListOID = this.iPrescriptionItemOID;
                oNewItem.DrugItem.MCVersionNo = oTech.MCVersionNo;
                this.TechValidateDetailsCA.SetTechCADetails(oNewItem, "ADD");
                oNewItem.OperationMode = "N";
                bNoError = true;
                oNewItem.IsDoseCombinationsDefined = '1';
                this.TechValidateDetailsCA.Technicalvalidateupdate = true;
                oNewItem.PrescriptionMultiComponentOID = this.iPresMultiCompitemOID;
                this.TechValidateDetailsCA.TechValidatedItems.Add(oNewItem);
                if (ProfileData.AdditionalPrescConfig != null && ProfileData.AdditionalPrescConfig.EnableWardStockConfig && !String.IsNullOrEmpty(oNewItem.TotalQuantity) && !oNewItem.TotalQuantity.Equals("0") && Convert.ToDouble(oNewItem.TotalQuantity) > 0 && String.Equals(this.oPrescItemVM.SelectedSupplyreq.Value, "CC_Empty", StringComparison.InvariantCultureIgnoreCase)) {
                    // this.oSupInst = CommonBB.FindParent<medsupplydispensinginstructionstab>(this);
                    // let oFauxsupply: iTabItem = this.oSupInst.tab1.GetItem("SupplyDetails");
                    // let medsupins: medsupplydispensinginstructions;
                    // medsupins = ObjectHelper.CreateType<medsupplydispensinginstructions>((oFauxsupply.Content), medsupplydispensinginstructions);
                    // if (medsupins.oVM != null) {
                    //     let cnt: number = oNewItem.selectedSupplyInstruction.Count;
                    //     let IsDNDinList: boolean = false;
                    //     for (let i: number = 0; i < cnt; i++) {
                    //         IsDNDinList = medsupins.oVM.SupplyInstructionsList.Where(x => x.Value.Equals(oNewItem.selectedSupplyInstruction[i].Value) && x.ConceptProperties != null && x.ConceptProperties.Where(y => y.Name.Equals("DONOTDSPMED")).Count() > 0).Count() > 0;
                    //         if (IsDNDinList)
                    //             break;
                    //     }
                    //     if (!IsDNDinList) {
                    //         let supply: CListItem = medsupins.oVM.iSupplyrequest.Where(x => String.Equals(x.Value, CConstants.Supplycode, StringComparison.InvariantCultureIgnoreCase)).FirstOrDefault();
                    //         medsupins.oVM.SelectedSupplyrequest = supply;
                    //     }
                    // }
                }      
                this.grdDosecombinations.SetBinding('data', this.DataContext.TechValidatedItems);          
                this.ClearControls(true);
            }
            else {
                this.ClearControls(true);
                return false;
            }
        }
        return bNoError;
    }
    cmdAdd_Click_Func = (s, e) => { 
        // Object.keys(that).forEach((prop) => (this[prop] = that[prop])); 
        this.cmdAdd_Click(s, e);
      }
    private cmdAdd_Click(sender: Object, e: RoutedEventArgs): void {
        this.AddClick();
    }
    btnAddInfo_Click_Func = (s, e) => { 
        Object.keys(that).forEach((prop) => (this[prop] = that[prop]));
        this.btnAddInfo_Click(s, e); 
      }
    private btnAddInfo_Click(sender: Object, e: RoutedEventArgs): void {
        this.VisibilityQntyPerDoseDetails(false);
    }
    private VisibilityQntyPerDoseDetails(IsVisible: boolean): void {
        if (this.TechValidateDetailsCA.TechQntyPerDosVisible == Visibility.Collapsed) {
            let strImagesource: string = MedImage.GetPath("icon_upsmall.png");
            let strDisImagesource: string = MedImage.GetPath("icon_downsmalldis.png");
            this.btnAddInfo.ChangeImage(strImagesource, strImagesource, strDisImagesource);
            this.TechValidateDetailsCA.TechQntyPerDosVisible = Visibility.Visible;
            // if(this.grdPrescribe != null && this.grdPrescribe.GetSelectedRowCount()==0)
            // {

                
            //     this.TechValidateDetailsCA.QuantityUOMList = null;
                

            // }
        }
        else if (!IsVisible) {
            let strImagesource: string = MedImage.GetPath("icon_downsmallhot.png");
            let strDisImagesource: string = MedImage.GetPath("icon_downsmalldis.png");
            this.btnAddInfo.ChangeImage(strImagesource, strImagesource, strDisImagesource);
            this.TechValidateDetailsCA.TechQntyPerDosVisible = Visibility.Collapsed;
        }
    }
    private txtTotalQuantity_LostFocus(sender: Object, e: RoutedEventArgs): void {
        if ((sender instanceof iTextBox) && (ObjectHelper.CreateType<iTextBox>(sender, iTextBox)) != null && !String.IsNullOrEmpty((ObjectHelper.CreateType<iTextBox>(sender, iTextBox)).Text) && String.Equals((ObjectHelper.CreateType<iTextBox>(sender, iTextBox)).Text, "0")) {
            this.VisibilityQntyPerDoseDetails(true);
        }
    }
    cmdCatalogueOptions_Click_Func = (s, e) => {
        Object.keys(that).forEach((prop) => (this[prop] = that[prop]));
        this.cmdCatalogueOptions_Click(s, e); 
      }
    private cmdCatalogueOptions_Click(sender: Object, e: RoutedEventArgs): void {
        if (this.TechValidateDetailsCA != null) {
            this.TechValidateDetailsCA.CatalogueFormularySel(true);
            if (this.TechValidateDetailsCA.oProductOption == null && this.TechValidateDetailsCA.oitems != null && this.TechValidateDetailsCA.oitems.drugProductDetails != null) {
                this.TechValidateDetailsCA.oitems.drugProductDetails.IdentifyingName = "";
            }
        }
        this.grdPrescribeSelectedItemUpdate();
    }
    cmdFormularyOptions_Click_Func = (s, e) => { 
        Object.keys(that).forEach((prop) => (this[prop] = that[prop])); 
        this.cmdFormularyOptions_Click(s, e); 
      }
    private cmdFormularyOptions_Click(sender: Object, e: RoutedEventArgs): void {
        if (this.TechValidateDetailsCA != null) {
            this.TechValidateDetailsCA.CatalogueFormularySel(false);
            if (this.TechValidateDetailsCA.oProductOption == null && this.TechValidateDetailsCA.oitems != null && this.TechValidateDetailsCA.oitems.drugProductDetails != null) {
                this.TechValidateDetailsCA.oitems.drugProductDetails.IdentifyingName = "";
            }
        }
        this.grdPrescribeSelectedItemUpdate();
    }
    private lblSupplyInstValue_MouseLeftButtonUp(sender: Object, e: MouseButtonEventArgs): void {
        this.SupplyinstrDataAssign();        
        const supplyInstrVal = this.lblSupplyInstValue?.Text;
        const supplyInstrText = this.lblSupplyInstText?.Text;

        this.TechValidateDetailsCA.ShowMultiSelectListWindow(
            ValueDomain.SupplyInstruction,
            supplyInstrVal ? supplyInstrVal : this.TechValidateDetailsCA.SupplyInsTextWithComments,
            supplyInstrText ? supplyInstrText : this.TechValidateDetailsCA.SupplyInsVal
        );
    }
lblSupplyInstValue_MouseLeftButtonUp_Func = (s, e) => {
    // Object.keys(that).forEach((prop) => (this[prop] = that[prop]));
    this.lblSupplyInstValue_MouseLeftButtonUp(s, e);
  };
    private SupplyinstrDataAssign(): void {
        if (this.TechValidateDetailsCA != null && this.TechValidateDetailsCA.oitems != null) {
            let SupplyInstruction: string = String.Empty;
            let SupplyInstructionSelected: string = String.Empty;
            let SupplyCommentsBasic: string = String.Empty;
            let SupplyCommentsSelected: string = String.Empty;
            let SupplyCommentsdisplayed: string = String.Empty;
            this.TechValidateDetailsCA.oitems.IsTechValidate = true;
            let objcheck: PrescriptionItemVM = this.TechValidateDetailsCA.oitems;
            if (objcheck != null && objcheck.FormViewerDetails != null && objcheck.FormViewerDetails.BasicDetails != null) {
                objcheck.FormViewerDetails.BasicDetails.CustomTechValidatedItem = null;
            }
            if (this.grdPrescribe != null && this.grdPrescribe.Rows != null && this.grdPrescribe.Rows.Count > 0 && this.TechValidateDetailsCA.oProductOption != null && this.grdPrescribe.GetSelectedRowCount() > 0) {
                let oTech: DrugItemBasicInfo = ObjectHelper.CreateType<DrugItemBasicInfo>(this.grdPrescribe.GetCurrentRowData(), DrugItemBasicInfo);
                if (oTech != null && this.TechValidateDetailsCA != null && objcheck != null) {
                    objcheck.drugProductDetails = oTech;
                }
                if (objcheck.FormViewerDetails != null && objcheck.FormViewerDetails.TechValidateDetails != null) {
                    objcheck.FormViewerDetails.TechValidateDetails.FetchfrombasicDetails = true;
                    if (!String.IsNullOrEmpty(this.TechValidateDetailsCA.SupplyInsVal) && this.TechValidateDetailsCA.SupplyInsVal.IndexOf("~~") > 0) {
                        SupplyInstructionSelected = this.TechValidateDetailsCA.SupplyInsVal.Split("~~", StringSplitOptions.None).FirstOrDefault();
                    }
                    else {
                        SupplyInstructionSelected = this.TechValidateDetailsCA.SupplyInsVal;
                    }
                    if (!String.IsNullOrEmpty(objcheck.FormViewerDetails.BasicDetails.SupplyInsVal)) {
                        objcheck.FormViewerDetails.BasicDetails.SupplyInsVal = String.Empty;
                    }
                    if (String.IsNullOrEmpty(objcheck.FormViewerDetails.BasicDetails.Supplycomments)) {
                        objcheck.FormViewerDetails.BasicDetails.Supplycomments = String.Empty;
                    }
                    if (objcheck.FormViewerDetails.TechValidateDetails != null) {
                        if ((String.Equals(objcheck.FormViewerDetails.BasicDetails.SupplyInsVal, SupplyInstructionSelected, StringComparison.InvariantCultureIgnoreCase) || (String.IsNullOrEmpty(objcheck.FormViewerDetails.BasicDetails.SupplyInsVal) && String.IsNullOrEmpty(SupplyInstructionSelected)))) {
                            objcheck.FormViewerDetails.TechValidateDetails.ProductSelectedsupplyInstruction = null;
                        }
                    }
                }
            }
            else {
                if (this.grdPrescribe.Rows.Count == 1 && this.TechValidateDetailsCA.oProductOption == null) {
                    if (objcheck.FormViewerDetails.TechValidateDetails != null) {
                        objcheck.FormViewerDetails.TechValidateDetails.FetchfrombasicDetails = true;
                    }
                    if (this.TechValidateDetailsCA != null && objcheck != null && objcheck.drugProductDetails != null && objcheck.drugProductDetails.IdentifyingName != null) {
                        objcheck.drugProductDetails.IdentifyingName = "";
                    }
                }
                else {
                    if (objcheck.FormViewerDetails.TechValidateDetails != null) {
                        objcheck.FormViewerDetails.TechValidateDetails.FetchfrombasicDetails = false;
                    }
                }
            }
            if (this.grdDosecombinations != null && this.grdDosecombinations.Rows != null && this.grdDosecombinations.Rows.Count >= 1 && this.grdDosecombinations.GetSelectedRowCount() > 0) {
                SupplyInstruction = String.Empty;
                SupplyInstructionSelected = String.Empty;
                SupplyCommentsBasic = String.Empty;
                SupplyCommentsSelected = String.Empty;
                SupplyCommentsdisplayed = String.Empty;
                if (this.TechValidateDetailsCA != null && objcheck != null && objcheck.FormViewerDetails != null && objcheck.FormViewerDetails.TechValidateDetails != null) {
                    objcheck.FormViewerDetails.TechValidateDetails.FetchfrombasicDetails = false;
                }
                let oUpdateItem: CustomTechValidatedItem = ObjectHelper.CreateType<CustomTechValidatedItem>(this.grdDosecombinations.GetCurrentRowData(), CustomTechValidatedItem);
                if (this.grdPrescribe.Rows.Count == 1 && this.TechValidateDetailsCA != null && objcheck != null && objcheck.drugProductDetails != null && !String.IsNullOrEmpty(objcheck.drugProductDetails.IdentifyingName)) {
                    objcheck.drugProductDetails.IdentifyingName = oUpdateItem.DrugItem.IdentifyingName;
                }
                if (objcheck.FormViewerDetails != null && objcheck.FormViewerDetails.BasicDetails != null) {
                    objcheck.FormViewerDetails.BasicDetails.CustomTechValidatedItem = oUpdateItem;
                }
                if (oUpdateItem != null && oUpdateItem.selectedSupplyInstruction != null && oUpdateItem.selectedSupplyInstruction.Count > 0) {
                    SupplyInstruction = String.Join(";", oUpdateItem.selectedSupplyInstruction.Select(x => x.Value).ToArray());
                }
                if (objcheck != null && objcheck.FormViewerDetails != null && objcheck.FormViewerDetails.TechValidateDetails != null) {
                    if (!String.IsNullOrEmpty(oUpdateItem.SupComments)) {
                        SupplyCommentsBasic = oUpdateItem.SupComments;
                    }
                    if (!String.IsNullOrEmpty(this.TechValidateDetailsCA.Supplycomments)) {
                        SupplyCommentsSelected = this.TechValidateDetailsCA.Supplycomments;
                    }
                }
                if (!String.IsNullOrEmpty(this.TechValidateDetailsCA.SupplyInsVal) && this.TechValidateDetailsCA.SupplyInsVal.IndexOf("~~") > 0) {
                    SupplyInstructionSelected = this.TechValidateDetailsCA.SupplyInsVal.Split("~~", StringSplitOptions.None).FirstOrDefault();
                }
                else {
                    SupplyInstructionSelected = this.TechValidateDetailsCA.SupplyInsVal;
                }
                if (objcheck.FormViewerDetails.TechValidateDetails != null) {
                    if (String.Equals(SupplyInstruction, SupplyInstructionSelected, StringComparison.InvariantCultureIgnoreCase) && !String.Equals(this.TechValidateDetailsCA.SupplyInsTextWithComments, Resource.TechValProdOpt.SelectSupInstrution)) {
                        objcheck.FormViewerDetails.TechValidateDetails.ProductSelectedsupplyInstruction = null;
                    }
                    if (objcheck.FormViewerDetails.BasicDetails != null && objcheck.FormViewerDetails.BasicDetails.CustomTechValidatedItem != null && objcheck.FormViewerDetails.BasicDetails.CustomTechValidatedItem.selectedSupplyInstruction != null && objcheck.FormViewerDetails.BasicDetails.CustomTechValidatedItem.selectedSupplyInstruction.Count > 0) {
                        if (objcheck.FormViewerDetails.TechValidateDetails.ProductSelectedsupplyInstruction == null) {
                            objcheck.FormViewerDetails.TechValidateDetails.ProductSelectedsupplyInstruction = new ObservableCollection<CListItem>();
                        }
                        objcheck.FormViewerDetails.BasicDetails.CustomTechValidatedItem.selectedSupplyInstruction.forEach((ins) => {
                            objcheck.FormViewerDetails.TechValidateDetails.ProductSelectedsupplyInstruction.Add(ins);
                        });
                    }
                }
            }
        }
    }
    private duplicatecheck(OID: number, OpertionMode: string): boolean {
        let index: number = 0;
        let itemOid: number = 0;
        let rowVal: number = 0;
        let OPRMode: string = String.Empty;
        let itemName: string = String.Empty;
        if (this.grdDosecombinations.GetRowCount() > 0) {
            if (String.Equals(OpertionMode, "M", StringComparison.OrdinalIgnoreCase))
                index = this.grdDosecombinations.GetCurrentRowIndex();
            let sCurcount: number = this.grdDosecombinations.GetRowCount();
            for (let rcount: number = 1; rcount <= sCurcount; rcount++) {
                if (index == rcount)
                    continue;
                let oUpdateItem: ManagePrescSer.TechValidatedItem = ObjectHelper.CreateType<ManagePrescSer.TechValidatedItem>(this.grdDosecombinations.GetRowData(rowVal), ManagePrescSer.TechValidatedItem);
                itemOid = oUpdateItem.DrugItem.IdentifyingOID;
                OPRMode = oUpdateItem.DrugItem.OperationMode;
                itemName = oUpdateItem.DrugItem.IdentifyingName;
                if (oUpdateItem.PrescriptionItemTechOID == 0) {
                    if (OID == itemOid && !String.Equals(OPRMode, "ND", StringComparison.OrdinalIgnoreCase) && !String.Equals(OPRMode, "D", StringComparison.OrdinalIgnoreCase)) {
                        let oMsgBox: iMessageBox = new iMessageBox();
                        oMsgBox.Title = 'Critical - LORENZO';
                        oMsgBox.MessageButton = MessageBoxButton.OK;
                        oMsgBox.IconType = MessageBoxType.Critical;
                        oMsgBox.Message =  Resource.TechValidate.Duplicate_check + " " +itemName ;
                        oMsgBox.Show();
                        // iMessageBox.Show(this._MsgBoxTitle, Resource.TechValidate.Duplicate_check + itemName + " ", MessageBoxType.Critical, MessageBoxButton.OK);
                        return false;
                    }
                }
                rowVal = rowVal + 1;
            }
            return true;
        }
        return true;
    }
    public grdDosecombinations_SelectionChanged(sender: Object, e: SelectionChangeEventArgs): void {
        if (this._IsDeactivatedPerscItem)
            return
        let oTech: CustomTechValidatedItem = ObjectHelper.CreateType<CustomTechValidatedItem>(this.grdDosecombinations.SelectedItem, CustomTechValidatedItem);
        let PrscCnt: number = 0;
        let IsMatchedTech: boolean = false;
        if (oTech == null) {
            let isPresRowCnt: boolean = true;
            if (this.grdPrescribe.GetSelectedRowCount() <= 0) {
                isPresRowCnt = false;
            }
            this.TechValidateDetailsCA.ClearInputControls(isPresRowCnt);
        }
        else {
            this.TechValidateDetailsCA.ClearInputControls(true);
            let rowcountpres: number = this.grdPrescribe.GetRowCount();
            if (rowcountpres > 0) {
                for (let count: number = 1; count <= rowcountpres; count++) {
                    let objDrug: DrugItemBasicInfo = ObjectHelper.CreateType<DrugItemBasicInfo>(this.grdPrescribe.GetRowData(PrscCnt), DrugItemBasicInfo);
                    if (objDrug.IdentifyingOID.ToString() == oTech.DrugItem.IdentifyingOID.ToString()) {
                        this.TechValidateDetailsCA.TotalQuantityUOMList = null;
                        this.TechValidateDetailsCA.QuantityUOMList = null;
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
                    if (this.TechValidateDetailsCA != null) {
                        this.TechValidateDetailsCA.Quantity = String.Empty;
                        this.TechValidateDetailsCA.TotalQuantity = String.Empty;
                        this.TechValidateDetailsCA.QuantityUOM = null;
                        this.TechValidateDetailsCA.TotalQuantityUOM = null;
                        this.TechValidateDetailsCA.QuantityUOMList = null;
                        this.TechValidateDetailsCA.TotalQuantityUOMList = null;
                    }
                    this.TechValidateDetailsCA.PopulateSpecificUOMs(oTech);
                }
            }
            else {
                this.TechValidateDetailsCA.PopulateSpecificUOMs(oTech);
            }
            if (String.IsNullOrEmpty(oTech.DoseComQuantityPerDoseUom) && String.IsNullOrEmpty(oTech.ProdSupplyInsWithComments)) {
                let strImagesource: string = MedImage.GetPath("icon_downsmallhot.png");
                let strDisImagesource: string = MedImage.GetPath("icon_downsmalldis.png");
                this.btnAddInfo.ChangeImage(strImagesource, strImagesource, strDisImagesource);
                this.TechValidateDetailsCA.TechQntyPerDosVisible = Visibility.Collapsed;
            }
            else {
                if (this.TechValidateDetailsCA.TechQntyPerDosVisible == Visibility.Collapsed) {
                    let strImagesource: string = MedImage.GetPath("icon_upsmall.png");
                    let strDisImagesource: string = MedImage.GetPath("icon_downsmalldis.png");
                    this.btnAddInfo.ChangeImage(strImagesource, strImagesource, strDisImagesource);
                    this.TechValidateDetailsCA.TechQntyPerDosVisible = Visibility.Visible;
                }
            }
            this.TechValidateDetailsCA.SelectedUOMValues(oTech);
        }
        this.SupplyinstrDataAssign();
    }
    public ClearControls(isControlClicked: boolean = false): void {
        if (isControlClicked) {
            this.txtQuantity.Text = String.Empty;
            this.txtTotalQuantity.Text = String.Empty;
            this.cboQuantityPerDoseUOM.SelectedIndex = -1;
            this.cboTotalQuantityUOM.SelectedIndex = -1;
        }
        if (this.TechValidateDetailsCA != null) {
            this.TechValidateDetailsCA.Quantity = String.Empty;
            this.TechValidateDetailsCA.TotalQuantity = String.Empty;
            this.TechValidateDetailsCA.QuantityUOM = null;
            this.TechValidateDetailsCA.TotalQuantityUOM = null;
            this.TechValidateDetailsCA.TechQntyPerDosVisible = Visibility.Collapsed;
            this.TechValidateDetailsCA.SetDefaultsupplyText();
            if (this.oPrescItemVM != null && this.oPrescItemVM.FormViewerDetails != null && this.oPrescItemVM.FormViewerDetails.TechValidateDetails != null) {
                this.oPrescItemVM.FormViewerDetails.TechValidateDetails.ProductSelectedsupplyInstruction = null;
            }
        }
        this.grdDosecombinations.UnselectAll();
        this.grdPrescribe.UnselectAll();
        if (this.TechValidateDetailsCA != null) {
            this.TechValidateDetailsCA.SetDefaultsupplyText();
            this.TechValidateDetailsCA.IsenableQtyDose = false;
            this.TechValidateDetailsCA.IsenableTotQtyDose = false;
            this.TechValidateDetailsCA.EnableDisableButtonControls(false);
        }
        let strImagesource: string = MedImage.GetPath("icon_downsmallhot.png");
        let strDisImagesource: string = MedImage.GetPath("icon_downsmalldis.png");
        this.btnAddInfo.ChangeImage(strImagesource, strImagesource, strDisImagesource);
    }
    private PopulateUOMs(objDrugAll: DrugItemBasicInfo): void {
        let objDrug: DrugItemBasicInfo = null;
        if (objDrugAll == null) {
            objDrug = ObjectHelper.CreateType<DrugItemBasicInfo>(this.grdPrescribe.SelectedItem, DrugItemBasicInfo);
        }
        else {
            objDrug = objDrugAll;
        }
        this.TechValidateDetailsCA.PopulateUOMs(objDrug);
    }
    public UpdateClick(): boolean {
        let bNoError: boolean = false;
        if (!this.TechValidate()) {
            this.QuntityMandatoryMSG();
            bNoError = false;
        }
        else {
            let oUpdateItem: CustomTechValidatedItem = ObjectHelper.CreateType<CustomTechValidatedItem>(this.grdDosecombinations.GetCurrentRowData(), CustomTechValidatedItem);
            oUpdateItem.DrugItem.PrescribableItemListOID = this.iPrescriptionItemOID;
            oUpdateItem.PrescriptionMultiComponentOID = this.iPresMultiCompitemOID;
            this.TechValidateDetailsCA.SetTechCADetails(oUpdateItem, "UPDATE");
            if (this.oPrescItemVM.FormViewerDetails.TechValidateDetails != null) {
                this.oPrescItemVM.FormViewerDetails.TechValidateDetails.Technicalvalidateupdate = true;
            }
            if (String.IsNullOrEmpty(oUpdateItem.OperationMode)) {
                oUpdateItem.OperationMode = "N";
            }
            oUpdateItem.IsDoseCombinationsDefined = '1';
            let grdRow: GridViewRow = <GridViewRow>this.grdDosecombinations.ItemContainerGenerator.ContainerFromItem(oUpdateItem);
            grdRow.IsSelected = false;
            this.grdDosecombinations.UnselectAll();
            this.grdDosecombinations.Rebind();
            this.ClearControls(true);
            bNoError = true;
        }
        return bNoError;
    }
    cmdUpdate_Click_Func = (s, e) => { 
        // Object.keys(that).forEach((prop) => (this[prop] = that[prop])); 
        this.cmdUpdate_Click(s, e); 
    }
    private cmdUpdate_Click(sender: Object, e: RoutedEventArgs): void {
        this.UpdateClick();
    }
    cmdRemove_Click_Func = (s, e) => { 
        // Object.keys(that).forEach((prop) => (this[prop] = that[prop]));
        this.cmdRemove_Click(s, e); 
    }
    private cmdRemove_Click(sender: Object, e: RoutedEventArgs): void {
        this.deleteSeletedrow();
    }
    private deleteSeletedrow(): void {
        this.TechValidateDetailsCA.Technicalvalidateupdate = true;
        let oUpdateItem: ManagePrescSer.TechValidatedItem = ObjectHelper.CreateType<ManagePrescSer.TechValidatedItem>(this.grdDosecombinations.GetCurrentRowData(), ManagePrescSer.TechValidatedItem);
        let oUpdateItemCustomTech:CustomTechValidatedItem=ObjectHelper.CreateType<CustomTechValidatedItem>(this.grdDosecombinations.GetCurrentRowData(), ManagePrescSer.TechValidatedItem);
        this.deletedItems.Add(oUpdateItem);
        // this.grdDosecombinations.Rows[this.grdDosecombinations.GetCurrentRowIndex() + 1].Visibility = Visibility.Collapsed;
        this.grdDosecombinations.Rows[this.grdDosecombinations?.GetCurrentRowIndex()].Visibility = Visibility.Collapsed;
        this.TechValidateDetailsCA.DeleteItmDoseCombinations(this.deletedItems);
        this. TechValidateDetailsCA.oitems.TechValidatedItems.Remove(oUpdateItemCustomTech);  
        this.oPrescItemVM.formViewerDetails.TechValidateDetails.TechValidatedItems.Remove(oUpdateItemCustomTech);
        this.deletedItems.Clear();
       this.ClearControls(true);
        this.TechValidateDetailsCA.IsenableTotQtyDose = true;
        this.TechValidateDetailsCA.IsenableQtyDose=true;
        this.SetFoceProductGrid();
    }
    grdPrescribe_RowLoaded(sender: Object, e: RowLoadedEventArgs): void {
        if (e.Row != null && e.DataElement != null) {
            let data: string[];
            let oTech: DrugItemBasicInfo = ObjectHelper.CreateType<DrugItemBasicInfo>(e.DataElement, DrugItemBasicInfo);
            if (oTech != null && String.Equals(oTech.IsFormulary, "1")) {
                data = this.sFormStyle;
            }
            else {
                data = this.sNonFormStyle;
            }
            if (data != null) {
                if (e.Row.Cells != null && data.length > 0) {
                    if (!String.IsNullOrEmpty(data[0])) {
                        e.Row.Cells[0].Foreground = new SolidColorBrush(CommonBB.ToColor(data[0]));
                    }
                }
                if (data.length > 3 && String.Equals(data[3], "bold")) {
                    e.Row.FontWeight = FontWeights.Bold;
                }
                else {
                    e.Row.FontWeight = FontWeights.Normal;
                }
                if (data.length > 2 && String.Equals(data[2], "italic")) {
                    e.Row.FontStyle = FontStyles.Italic;
                }
                else {
                    e.Row.FontStyle = FontStyles.Normal;
                }
                if (this.oPrescItemVM != null && !String.IsNullOrEmpty(this.oPrescItemVM.MedLineDisplayText) && this.oPrescItemVM.FormViewerDetails != null && this.oPrescItemVM.FormViewerDetails.BasicDetails != null && !String.IsNullOrEmpty(this.oPrescItemVM.FormViewerDetails.BasicDetails.IdentifyingType) && (String.Equals(this.oPrescItemVM.FormViewerDetails.BasicDetails.IdentifyingType, CConstants.Precatalog, StringComparison.InvariantCultureIgnoreCase) || String.Equals(this.oPrescItemVM.FormViewerDetails.BasicDetails.IdentifyingType, CConstants.NONCATALOGUEITEM, StringComparison.InvariantCultureIgnoreCase)) && oTech != null) {
                    oTech.IdentifyingName = this.oPrescItemVM.MedLineDisplayText;
                }
                if (this.oPrescItemVM != null && this.oPrescItemVM.FormViewerDetails != null && this.oPrescItemVM.FormViewerDetails.BasicDetails != null && !String.IsNullOrEmpty(this.oPrescItemVM.FormViewerDetails.BasicDetails.IdentifyingName) && this.oPrescItemVM.FormViewerDetails.BasicDetails.InfusionDetails != null && this.oPrescItemVM.FormViewerDetails.BasicDetails.InfusionDetails.FluidSelectedItem != null && !String.IsNullOrEmpty(this.oPrescItemVM.FormViewerDetails.BasicDetails.InfusionDetails.FluidSelectedItem.Value) && oTech != null) {
                    oTech.IdentifyingName = this.oPrescItemVM.FormViewerDetails.BasicDetails.IdentifyingName;
                }
                if (data.length > 1 && String.Equals(data[1], "uppercase")) {
                    if (oTech != null && !String.IsNullOrEmpty(oTech.IdentifyingName)) {
                        oTech.IdentifyingName = oTech.IdentifyingName.ToUpper();
                    }
                }
                else if (data.length > 1 && String.Equals(data[1], "lowercase")) {
                    if (this.oPrescItemVM != null && this.oPrescItemVM.FormViewerDetails != null && this.oPrescItemVM.FormViewerDetails.BasicDetails != null && (String.Equals(this.oPrescItemVM.FormViewerDetails.BasicDetails.itemSubType, CConstants.SUBTYPE, StringComparison.OrdinalIgnoreCase)) && oTech != null) {
                        oTech.IdentifyingName = this.oPrescItemVM.FormViewerDetails.BasicDetails.IdentifyingName;
                    }
                    else if ((oTech != null && !String.IsNullOrEmpty(oTech.IdentifyingName))) {
                        oTech.IdentifyingName = oTech.IdentifyingName.ToLower();
                    }
                    else {

                    }
                }
            }
        }
    }
    public grdPrescribe_SelectionChanged(sender: Object, e: SelectionChangeEventArgs): void {
        if (this._IsDeactivatedPerscItem)
            return
        let IsAddeditem: boolean = false;
        if (e.AddedItems != null && e.AddedItems.Count > 0) {
            IsAddeditem = true;
        }
        this.TechValidateDetailsCA.PrescribeSelection(IsAddeditem, this.bRemoveSelection);
        if (!String.Equals(ContextInfo.MenuCode, CConstants.TechnicallyValidateMenuCode, StringComparison.InvariantCultureIgnoreCase) && IsAddeditem && this.oPrescItemVM != null && this.oPrescItemVM.TechValidatedItems != null && this.TechValidateDetailsCA != null && this.oPrescItemVM.TechValidatedItems.Count>0) {
            this.TechValidateDetailsCA.TechValidatedItems = this.oPrescItemVM.TechValidatedItems;
        }
        if (!String.Equals(ContextInfo.MenuCode, CConstants.TechnicallyValidateMenuCode, StringComparison.InvariantCultureIgnoreCase) && this.TechValidateDetailsCA != null && this.oPrescItemVM != null && this.oPrescItemVM.ActionCode == ActivityTypes.Prescribe && this.oPrescItemVM.FormViewerDetails != null && this.oPrescItemVM.FormViewerDetails.BasicDetails != null && this.oPrescItemVM.FormViewerDetails.BasicDetails.DefaultDetails != null && this.oPrescItemVM.FormViewerDetails.BasicDetails.DefaultDetails.Quantitys != null && this.oPrescItemVM.FormViewerDetails.BasicDetails.DefaultDetails.Quantitys.Count > 0 && (String.Equals(this.oPrescItemVM.FormViewerDetails.BasicDetails.IdentifyingType, CConstants.Precatalog, StringComparison.InvariantCultureIgnoreCase) || String.Equals(this.oPrescItemVM.FormViewerDetails.BasicDetails.IdentifyingType, CConstants.NONCATALOGUEITEM, StringComparison.InvariantCultureIgnoreCase))) {
            let sb: StringBuilder = new StringBuilder();
            sb.Append(this.oPrescItemVM.FormViewerDetails.BasicDetails.DefaultDetails.Quantitys[0].Value.ToString());
            sb.Append("*");
            sb.Append(this.oPrescItemVM.FormViewerDetails.BasicDetails.DefaultDetails.Quantitys[0].DisplayText);
            this.TechValidateDetailsCA.oProductOption[0].TechQtyUomName = sb.ToString();
        }
        if (!this.bRemoveSelection) {
            let strImagesource: string = MedImage.GetPath("icon_downsmallhot.png");
            let strDisImagesource: string = MedImage.GetPath("icon_downsmalldis.png");
            this.btnAddInfo.ChangeImage(strImagesource, strImagesource, strDisImagesource);
            this.TechValidateDetailsCA.TechQntyPerDosVisible = Visibility.Collapsed;
        }
        if (this.grdDosecombinations.GetSelectedRowCount()) this.grdDosecombinations.UnselectAll();
        if (this.grdDosecombinations.GetSelectedRowCount() > 0 && !this.bRemoveSelection) {
            this.grdDosecombinations.UnselectAll();
            let strImagesource: string = MedImage.GetPath("icon_downsmallhot.png");
            let strDisImagesource: string = MedImage.GetPath("icon_downsmalldis.png");
            this.btnAddInfo.ChangeImage(strImagesource, strImagesource, strDisImagesource);
            this.TechValidateDetailsCA.TechQntyPerDosVisible = Visibility.Collapsed;
        }
        this.PopulateUOMs(null);
        this.bRemoveSelection = false;
        this.SupplyinstrDataAssign();
        if (this.bTechValformularycheck)
            this.TechValidateDetailsCA.IsenableCatOpt = false;
        else this.TechValidateDetailsCA.IsenableForOpt = true;
    }
    public okButtonClick(): void {
        let IsModified: boolean = false;
        if (this.TechValidateDetailsCA != null) {
            if (this.TechValidateDetailsCA.TechValidatedItems != null && this.cmdUpdate.IsEnabled) {
                let TechCount = this.TechValidateDetailsCA.TechValidatedItems.Count;
                let nQtyPerDose: string, nTotalQty;
                let oTechValidatedItem: CustomTechValidatedItem = null;
                if (this.grdDosecombinations != null && this.grdDosecombinations.SelectedItem != null)
                    oTechValidatedItem = <CustomTechValidatedItem>(this.grdDosecombinations.SelectedItem);
                if (oTechValidatedItem != null) {
                    for (let i: number = 0; i < TechCount; i++) {
                        nQtyPerDose = this.TechValidateDetailsCA.TechValidatedItems[i].QuantityPerDose;
                        nTotalQty = this.TechValidateDetailsCA.TechValidatedItems[i].TotalQuantity;
                        if (oTechValidatedItem.DrugItem != null && this.TechValidateDetailsCA.TechValidatedItems[i].DrugItem != null && oTechValidatedItem.DrugItem.IdentifyingOID == this.TechValidateDetailsCA.TechValidatedItems[i].DrugItem.IdentifyingOID && oTechValidatedItem.DrugItem.IdentifyingType == this.TechValidateDetailsCA.TechValidatedItems[i].DrugItem.IdentifyingType && (((String.IsNullOrEmpty(this.TechValidateDetailsCA.Quantity) && !String.IsNullOrEmpty(nQtyPerDose)) || (!String.IsNullOrEmpty(this.TechValidateDetailsCA.Quantity) && String.IsNullOrEmpty(nQtyPerDose)) || (!String.IsNullOrEmpty(this.TechValidateDetailsCA.Quantity) && !String.IsNullOrEmpty(nQtyPerDose) && !String.Equals(this.TechValidateDetailsCA.Quantity, nQtyPerDose, StringComparison.InvariantCultureIgnoreCase))) || ((String.IsNullOrEmpty(this.TechValidateDetailsCA.TotalQuantity) && !String.IsNullOrEmpty(nTotalQty)) || (!String.IsNullOrEmpty(this.TechValidateDetailsCA.TotalQuantity) && String.IsNullOrEmpty(nTotalQty)) || (!String.IsNullOrEmpty(this.TechValidateDetailsCA.TotalQuantity) && !String.IsNullOrEmpty(nTotalQty) && !String.Equals(this.TechValidateDetailsCA.TotalQuantity, nTotalQty, StringComparison.InvariantCultureIgnoreCase))) || (this.TechValidateDetailsCA.QuantityUOM != null && this.TechValidateDetailsCA.QuantityUOM.DisplayText != this.TechValidateDetailsCA.TechValidatedItems[i].QuantityPerDoseUOM.Name) || (this.TechValidateDetailsCA.TotalQuantityUOM != null && this.TechValidateDetailsCA.TotalQuantityUOM.DisplayText != this.TechValidateDetailsCA.TechValidatedItems[i].TotalQuantityUOM.Name))) {
                            IsModified = true;
                            break;
                        }
                    }
                }
            }
            if ((!String.IsNullOrEmpty(this.TechValidateDetailsCA.Quantity) || this.TechValidateDetailsCA.QuantityUOM != null || !String.IsNullOrEmpty(this.TechValidateDetailsCA.TotalQuantity) || this.TechValidateDetailsCA.TotalQuantityUOM != null) && this.cmdAdd.IsEnabled)
                IsModified = true;
            if (IsModified) {
                this.TechvalidateOk();
            }
            else {
                this.DoTask(this.TechValidateDetailsCA.TechValidatedItems);
            }
        }
        else {
            if ((!String.IsNullOrEmpty(this.TechValidateDetailsCA.Quantity) || this.TechValidateDetailsCA.QuantityUOM != null || !String.IsNullOrEmpty(this.TechValidateDetailsCA.TotalQuantity) || this.TechValidateDetailsCA.TotalQuantityUOM != null) && this.cmdAdd.IsEnabled)
                IsModified = true;
            if (IsModified) {
                this.TechvalidateOk();
            }
            else {
                this.DoTask(this.TechValidateDetailsCA.TechValidatedItems);
            }
        }
    }
    public DoTask(TechValidatedItems: ObservableCollection<CustomTechValidatedItem>): void {
        if (TechValidatedItems != null && TechValidatedItems.Count > 0) {
            if (this.oPrescItemVM != null) {
                if (this.oPrescItemVM.FormViewerDetails != null) {
                    if (this.oPrescItemVM.TechValidatedItems == null)
                        this.oPrescItemVM.TechValidatedItems = new ObservableCollection<CustomTechValidatedItem>();
                    this.oPrescItemVM.TechValidatedItems = TechValidatedItems;
                    if (this.oPrescItemVM.FormViewerDetails.TechValidateDetails != null)
                        this.oPrescItemVM.FormViewerDetails.TechValidateDetails.Technicalvalidateupdate = this.TechValidateDetailsCA.Technicalvalidateupdate;
                }
                this.oPrescItemVM.ProdOptDisText = Resource.TechValidate.ProdOpt_Text;
                if (this.oPrescItemVM.FormViewerDetails.TechValidateDetails != null) {
                    if (this.oPrescItemVM.FormViewerDetails.TechValidateDetails.PrevTechValidatedItems == null && this.oPrescItemVM.FormViewerDetails.TechValidateDetails.TechValidatedItems != null && this.oPrescItemVM.FormViewerDetails.TechValidateDetails.TechValidatedItems.Count > 0) {
                        this.oPrescItemVM.EditedGridID = 1;
                        this.oPrescItemVM.IsProdOptChange = 1;
                    }
                    else if (this.oPrescItemVM.FormViewerDetails.TechValidateDetails.PrevTechValidatedItems != null && this.oPrescItemVM.FormViewerDetails.TechValidateDetails.TechValidatedItems != null && this.oPrescItemVM.FormViewerDetails.TechValidateDetails.PrevTechValidatedItems.Count != this.oPrescItemVM.FormViewerDetails.TechValidateDetails.TechValidatedItems.Count) {
                        this.oPrescItemVM.EditedGridID = 1;
                        this.oPrescItemVM.IsProdOptChange = 1;
                    }
                    else {
                        let cnt: number = this.oPrescItemVM.FormViewerDetails.TechValidateDetails.PrevTechValidatedItems.Count;
                        for (let i: number = 0; i < cnt; i++) {
                            if (this.oPrescItemVM.FormViewerDetails.TechValidateDetails.PrevTechValidatedItems[i].IsDoseCombinationsDefined == '1') {
                                let identoid: number = this.oPrescItemVM.FormViewerDetails.TechValidateDetails.PrevTechValidatedItems[i].DrugItem.IdentifyingOID;
                                let li: List<CustomTechValidatedItem> = new List<CustomTechValidatedItem>();
                                li = this.oPrescItemVM.FormViewerDetails.TechValidateDetails.TechValidatedItems.Where(x => x.DrugItem.IdentifyingOID == identoid).ToList();
                                if (!String.Equals(this.oPrescItemVM.FormViewerDetails.TechValidateDetails.PrevTechValidatedItems[i].prevQuantity, li.First().QuantityPerDose, StringComparison.InvariantCultureIgnoreCase) || !String.Equals(this.oPrescItemVM.FormViewerDetails.TechValidateDetails.PrevTechValidatedItems[i].prevTotQuantity, li.First().TotalQuantity, StringComparison.InvariantCultureIgnoreCase) || (String.IsNullOrEmpty(this.oPrescItemVM.FormViewerDetails.TechValidateDetails.PrevTechValidatedItems[i].prevsuppcomments) && !String.IsNullOrEmpty(li.First().SupComments)) || (!String.IsNullOrEmpty(this.oPrescItemVM.FormViewerDetails.TechValidateDetails.PrevTechValidatedItems[i].prevsuppcomments) && String.IsNullOrEmpty(li.First().SupComments)) || (!String.IsNullOrEmpty(this.oPrescItemVM.FormViewerDetails.TechValidateDetails.PrevTechValidatedItems[i].prevsuppcomments) && !String.IsNullOrEmpty(li.First().SupComments) && !String.Equals(this.oPrescItemVM.FormViewerDetails.TechValidateDetails.PrevTechValidatedItems[i].prevsuppcomments, li.First().SupComments, StringComparison.InvariantCultureIgnoreCase))) {
                                    this.oPrescItemVM.EditedGridID = 1;
                                    this.oPrescItemVM.IsProdOptChange = 1;
                                    break;
                                }
                                else if ((li.First().QuantityPerDoseUOM != null && !String.Equals(this.oPrescItemVM.FormViewerDetails.TechValidateDetails.PrevTechValidatedItems[i].prevQuantityUOM, li.First().QuantityPerDoseUOM.Name, StringComparison.InvariantCultureIgnoreCase)) || (li.First().TotalQuantityUOM != null && !String.Equals(this.oPrescItemVM.FormViewerDetails.TechValidateDetails.PrevTechValidatedItems[i].prevTotQuantityUOM, li.First().TotalQuantityUOM.Name, StringComparison.InvariantCultureIgnoreCase))) {
                                    this.oPrescItemVM.EditedGridID = 1;
                                    this.oPrescItemVM.IsProdOptChange = 1;
                                    break;
                                }
                                else if (this.oPrescItemVM.FormViewerDetails.TechValidateDetails.PrevTechValidatedItems[i].prevselectedSupplyInstruction != null && li.First().selectedSupplyInstruction != null && this.oPrescItemVM.FormViewerDetails.TechValidateDetails.PrevTechValidatedItems[i].prevselectedSupplyInstruction.Count != li.First().selectedSupplyInstruction.Count) {
                                    this.oPrescItemVM.EditedGridID = 1;
                                    this.oPrescItemVM.IsProdOptChange = 1;
                                    break;
                                }
                                else {
                                    if (this.oPrescItemVM.FormViewerDetails.TechValidateDetails.PrevTechValidatedItems[i].prevselectedSupplyInstruction != null && li.First().selectedSupplyInstruction != null && this.oPrescItemVM.FormViewerDetails.TechValidateDetails.PrevTechValidatedItems[i].prevselectedSupplyInstruction.Count == li.First().selectedSupplyInstruction.Count) {
                                        let existsupplyinstcount: number = this.oPrescItemVM.FormViewerDetails.TechValidateDetails.PrevTechValidatedItems[i].selectedSupplyInstruction.Count;
                                        let existsupplyvalue: string = String.Empty;
                                        for (let j: number = 0; j < existsupplyinstcount; j++) {
                                            existsupplyvalue = this.oPrescItemVM.FormViewerDetails.TechValidateDetails.PrevTechValidatedItems[i].prevselectedSupplyInstruction[j].Value;
                                            if (li.First().selectedSupplyInstruction.Where(c => c.Value == existsupplyvalue).Count() > 0) {

                                            }
                                            else {
                                                this.oPrescItemVM.EditedGridID = 1;
                                                this.oPrescItemVM.IsProdOptChange = 1;
                                                break;
                                            }
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
            if (this.oPrescItemVM != null) {
                this.oPrescItemVM.TechValidatedItems = TechValidatedItems;
                if (this.oPrescItemVM.FormViewerDetails != null && this.oPrescItemVM.FormViewerDetails.TechValidateDetails != null)
                    this.oPrescItemVM.FormViewerDetails.TechValidateDetails.Technicalvalidateupdate = this.TechValidateDetailsCA.Technicalvalidateupdate;
                this.oPrescItemVM.ProdOptDisText = Resource.TechValidate.ProdOpt_Add_Text;
                if (this.oPrescItemVM.FormViewerDetails.TechValidateDetails.PrevTechValidatedItems != null && this.oPrescItemVM.FormViewerDetails.TechValidateDetails.PrevTechValidatedItems.Count > 0 && (TechValidatedItems == null || TechValidatedItems.Count == 0)) {
                    this.oPrescItemVM.EditedGridID = 1;
                    this.oPrescItemVM.IsProdOptChange = 1;
                }
            }
        }
        if (this.oPrescItemVM.IsTechValidateMandatory)
            this.oPrescItemVM.SetTechvalImageStatus();
    }
    TechvalidateOk(): void {
        if (!this.TechValidateDetailsCA.launchTechvalCAsupplyinstrmezzanineCheck) {
            let objTech: iMessageBox = new iMessageBox();
            objTech.Title = Resource.TechValProdOpt.Title;
            objTech.MessageButton = MessageBoxButton.YesNo;
            objTech.IconType = MessageBoxType.Question;
            objTech.MessageBoxClose = (s, e) => { this.objTechValMsgBox_MessageBoxClose(s, e); };
            objTech.Message = Resource.MedicationForm.SteppedDetailsModify_Message;
            objTech.Show();
        }
    }
    objTechValMsgBox_MessageBoxClose(sender: Object, e: MessageEventArgs): void {
        let bNoError: boolean = false;
        if (e.MessageBoxResult == MessageBoxResult.Yes) {
            if (this.cmdAdd.IsEnabled) {
                if (!this.AddClick())
                    return
                bNoError = true;
            }
            else if (this.cmdUpdate.IsEnabled) {
                if (!this.UpdateClick())
                    return
                bNoError = true;
            }
        }
        else {

        }
        if (bNoError) {
            this.DoTask(this.TechValidateDetailsCA.TechValidatedItems);
        }
        else {
            this.DoTask(this.TechValidateDetailsCA.TechValidatedItems);
        }
    }

    private grdPrescribeSelectedItemUpdate() {
        setTimeout(()=> {
          const firstItem = this.DataContext.oProductOption.Count;
          if (firstItem > 0) {
            this.ClearPrescribeControls(true);
            this.grdPrescribe.SetBinding('data',this.DataContext.oProductOption);
            this.grdPrescribe.SelectedItem = this.DataContext.oProductOption[0];
            let selectionChangeEventArgs: SelectionChangeEventArgs = {};
            let addedItemsList: List = new List();
            addedItemsList.Add(this.grdPrescribe.SelectedItem);
            selectionChangeEventArgs.AddedItems = addedItemsList;
            this.grdPrescribe_SelectionChanged({}, selectionChangeEventArgs);
          }
          if (firstItem == 0) {
            this.ClearPrescribeControls(false);
          }
        }, 1000)
      }

      private ClearPrescribeControls(value: boolean) {
        this.grdPrescribe.selectedRowsIndex = [];
        this.cboTotalQuantityUOM.IsEnabled = value;
        this.txtTotalQuantity.IsEnabled = value;
      }
    
}
