import { AfterViewInit, Component, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { StringBuilder, ProfileFactoryType, ContextManager, Convert, AppActivity, iBusyIndicator } from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp, Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison, AppDialogEventargs, AppDialogResult, DelegateArgs, DialogComponentArgs, WindowButtonType, iAppDialogWindow, ChildWindow, Visibility, AppSessionInfo, PatientContext, HtmlPage, ObservableCollection, ClerkFormViewDeftBehaviour } from 'epma-platform/models';
import { AppDialog, Binding, BitmapImage, ContentPresenter, DataTemplate, EventArgs, FontStyles, FontWeights, Grid, GridLength, SolidColorBrush, StackPanel, Uri, UriKind, iButton, iCheckBox, iImage, iLabel } from 'epma-platform/controls';
import { HelperService } from 'epma-platform/soapclient';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
import { GridExtension, RowLoadedEventArgs, SelectionChangeEventArgs } from 'src/app/shared/epma-platform/controls/epma-grid-helpers/grid-extension';
import { GridComponent } from '@progress/kendo-angular-grid';
import { RelateItem } from '../viewmodel/RelateItem';
import { MedBrandConstraintsVM } from '../viewmodel/medbrandconstraintsvm';
import { PackOptionItem } from '../model/common';
import { PrescriptionItemVM } from '../viewmodel/PrescriptionItemVM';
import { IPPMABaseVM, Indicationdtl } from '../viewmodel/ippmabasevm';
// import { DrugItemInputData } from 'src/app/shared/epma-platform/soap-client/IPPMAManagePrescriptionWS';
import { GridViewCellClickEventArgs, RoutedEventArgs } from 'src/app/shared/epma-platform/controls/Control';
import { CommonVariables } from 'src/app/lorappcommonbb/utilities/common';
import { CConstants, MedImage, MedImages, PrescribeSource, PrescriptionTypes } from '../utilities/constants';
import { MedicationOptionVM } from '../viewmodel/medicationoptionvm';
import { Common } from '../utilities/common';
import { Resource } from '../resource';
import { DrugItemInputData } from 'src/app/shared/epma-platform/soap-client/ManagePrescriptionWS';
import { PackOptionChildfooter } from './packoptionchildfooter';
//import { DrugItemInputData } from 'src/app/shared/epma-platform/controls/iPowerSearch';
import * as ControlStyles from "../../shared/epma-platform/controls/ControlStyles";
import { WrapToolTip } from 'src/app/product/shared/convertor/medicationconverters.service';

var that;
@Component({
    selector: 'meddrugprescriptionpackoptionChild',
    templateUrl: './meddrugprescriptionpackoptionChild.html',
    styleUrls: ['./meddrugprescriptionpackoptionChild.css'],
    styles: [
        `         
          .lineHeightNormal{
            line-height: 1.2 !important; 
          }            
        `
        ]
})
export class meddrugprescriptionpackoptionChild extends iAppDialogWindow implements AfterViewInit, OnInit, OnDestroy {

    public LayoutRoot: Grid;
    public mldetails = Resource.Medlistdetails;
    @ViewChild("LayoutRootTempRef", { read: Grid, static: false }) set _LayoutRoot(c: Grid) {
        if (c) { this.LayoutRoot = c; }
    };
    private lblDrugName: iLabel;
    @ViewChild("lblDrugNameTempRef", { read: iLabel, static: false }) set _lblDrugName(c: iLabel) {
        if (c) { this.lblDrugName = c; }
    };
    public R_Name: iImage;
    @ViewChild("R_NameTempRef", { read: iImage, static: false }) set _R_Name(c: iImage) {
        if (c) { this.R_Name = c; }
    };
    private spGPItemDetail: ContentPresenter;
    @ViewChild("spGPItemDetailTempRef", { read: ContentPresenter, static: false }) set _spGPItemDetail(c: ContentPresenter) {
        if (c) { this.spGPItemDetail = c; }
    };
    private grdDrugPrescriptionPackOptionSubGrid: Grid;
    @ViewChild("grdDrugPrescriptionPackOptionSubGridTempRef", { read: Grid, static: false }) set _grdDrugPrescriptionPackOptionSubGrid(c: Grid) {
        if (c) { this.grdDrugPrescriptionPackOptionSubGrid = c; }
    };
    public chkInclNonFor: iCheckBox;
    @ViewChild("chkInclNonForTempRef", { read: iCheckBox, static: false }) set _chkInclNonFor(c: iCheckBox) {
        if (c) { this.chkInclNonFor = c; }
    };
    public grdRelated: GridExtension = new GridExtension();
    @ViewChild("grdRelatedTempRef", { read: GridComponent, static: false }) set _grdRelated(c: GridComponent) {
        if (c) { this.grdRelated.grid = c; this.grdRelated.columns = c.columns; }
    };
    private LblPresOpt: iLabel;
    @ViewChild("LblPresOptTempRef", { read: iLabel, static: false }) set _LblPresOpt(c: iLabel) {
        if (c) { this.LblPresOpt = c; }
    };
    public grdPrescribe: GridExtension = new GridExtension();
    @ViewChild("grdPrescribeTempRef", { read: GridComponent, static: false }) set _grdPrescribe(c: GridComponent) {
        if (c) { this.grdPrescribe.grid = c; this.grdPrescribe.columns = c.columns; }
    };

    public parentChild: ChildWindow;
    objRelateItem: RelateItem;
    oMedBrandConst: MedBrandConstraintsVM;
    objPackOptionItem: PackOptionItem;
    objDrugItemInputData: DrugItemInputData;
    objPresItemDetls: PrescriptionItemVM;
    public objPackOptionChildfooter: PackOptionChildfooter;
    cmdPrescribingOptions: iButton;
    public IPPMABaseVMData: IPPMABaseVM;
    //public delegate void ImeddrugprescriptionpackoptionChildClose(bool IsOptionSelected);
    public ImeddrugprescriptionpackoptionChildCloseEvent: Function;
    public objResMedDrugPrescriptionPackOption = Resource.ResMedDrugPrescriptionPackOption;
    public objResMedAlternateOption = Resource.ResMedAlternateOption;
    public Styles = ControlStyles;
    NoteToolTip: WrapToolTip;
    public RNameSource: BitmapImage;
    public RNameVisibility: Visibility = Visibility.Visible;
    public RNameToolTip: string = "";

    ngOnInit() {
        this.grdRelated.RowIndicatorVisibility = Visibility.Visible;
        this.grdPrescribe.RowIndicatorVisibility = Visibility.Visible;
        if (this.IPPMABaseVMData.PackOptionItem == null) {
            this.IPPMABaseVMData.PackOptionItem = new MedicationOptionVM(this.IPPMABaseVMData);
        }
        this.grdRelated.GridSelectionChange = (s, e) => { this.grdRelated_SelectionChanged(s, e) };
    }

    ngAfterViewInit() {
        this.grdRelated.GenerateColumns();
        this.grdPrescribe.GenerateColumns();

        let temp = this.objPackOptionChildfooter.FooterLoaded.subscribe(data => {
            this.ChildWindow_Loaded(null, null);
            temp.unsubscribe();
        })

        //this.ChildWindow_Loaded(null, null);               
        // this.grdRelated.selectedRowsIndex = [0];
        // this.grdRelated.RowIndicatorVisibility = Visibility.Visible;
        // this.grdPrescribe.RowIndicatorVisibility = Visibility.Visible;
        //this.grdRelated_SelectionChanged(null,null);        
        //this.grdRelated.GridSelectionChange = (s, e) => { this.grdRelated_SelectionChanged(s, e) };
        this.grdRelated.onCellClick = (s, e) => { this.grdRelated_onCellClick(s, e); };
        this.grdPrescribe.onCellClick = (s, e) => { this.grdPrescribe_onCellClick(s, e); };
        this.chkInclNonFor.Checked = (s, e) => {
            Object.keys(that).forEach((prop) => (this[prop] = that[prop]));
            this.chkInclNonFor_Checked(s, e);
        }
        this.chkInclNonFor.Unchecked = (s, e) => {
            Object.keys(that).forEach((prop) => (this[prop] = that[prop]));
            this.chkInclNonFor_Checked(s, e);
        }
        if (this.IPPMABaseVMData.oItemVM && this.IPPMABaseVMData.oItemVM.FormViewerDetails)
            this.RNameSource = this.IPPMABaseVMData.oItemVM.FormViewerDetails.BasicDetails.NoteIconSource;
        if(this.IPPMABaseVMData.PackOptionItem!=null && this.IPPMABaseVMData.PackOptionItem.PackOptionItemList!=null)
        {
            this.grdRelated.SetBinding('data', this.IPPMABaseVMData.PackOptionItem.PackOptionItemList);
        }
           
    }

    ngOnDestroy() {
        this.MedDrugPrescriptionpackoptionChild_Unloaded(null, null);
    }
   private _dataTemplates :QueryList<DataTemplate>;
   get dataTemplates()
   {
     return this._dataTemplates;
   }
    @ViewChildren(DataTemplate)  set dataTemplates( val: QueryList<DataTemplate>)
    {
       if (val)
       {
        this._dataTemplates = val;
        this.grdRelated.dataTemplates = val;
       }
    }
    grdData: GridExtension = new GridExtension();

    rowLoaded(context: any) {
        let rowEventArgs = this.grdRelated.GetRowEventArgs(
            this.dataTemplates,
            context
        );
        this.grdRelated_RowLoaded({}, rowEventArgs);
    }
    constructor() {
        super();
        that = this;
        // InitializeComponent();
        // this.grdRelated.SetBinding(GridExtension.ItemsSourceProperty, ObjectHelper.CreateObject(new Binding("PackOptionItemList"), { Mode: BindingMode.OneWay }));
        // this.grdPrescribe.SetBinding(GridExtension.ItemsSourceProperty, ObjectHelper.CreateObject(new Binding("ProcessOptions"), { Mode: BindingMode.OneWay }));
        //this.grdRelated.onCellClick = (s, e) => { this.grdRelated_onCellClick(s, e); };
        //this.grdRelated.RowIndicatorVisibility = Visibility.Visible;
        //this.grdPrescribe.onCellClick = (s, e) => { this.grdPrescribe_onCellClick(s, e); };
    }

    MouseLeftButtonDown_FuncNew($event, rowIndex, columnIndex) {        
        columnIndex = this.grdRelated.GetColumnIndexForCellClick(columnIndex);
        let args: GridViewCellClickEventArgs = { ColumnIndex: columnIndex, RowIndex: rowIndex, ColumnCell: undefined };
        this.grdRelated.onCellClick($event, args);  
        //   if($event.mouseEvent.button==0){check for only left click
      //}
      
    }
    // PrescribeMouseLeftButtonDown_FuncNew($event, rowIndex, columnIndex){
    //     columnIndex = this.grdPrescribe.GetColumnIndexForCellClick(columnIndex);
    //     let args: GridViewCellClickEventArgs = { ColumnIndex: columnIndex, RowIndex: rowIndex, ColumnCell: undefined };
    //   if($event.mouseEvent.button==0){
    //     this.grdPrescribe.onCellClick($event, args);  
    //   }
    // }
    grdPrescribe_onCellClick(sender: Object, args: GridViewCellClickEventArgs): void {
        if (this.grdPrescribe.GetColumnIndexByName("SelectColumn") == args.ColumnIndex) {
            this.objPresItemDetls = ObjectHelper.CreateType<PrescriptionItemVM>(this.grdPrescribe.GetRowData(args.RowIndex), PrescriptionItemVM);
            if (this.objPresItemDetls.IsProcessinIconEnable) {
                iBusyIndicator.Start("FormViewer", true);
                CommonVariables.FormViewerIsInProgress = true;
            }
            this.objPresItemDetls.IsProcessinIconEnable = false;
            this.objDrugItemInputData = new DrugItemInputData();
            if (this.objPresItemDetls != null && this.objPresItemDetls.FormViewerDetails != null && this.objPresItemDetls.FormViewerDetails.BasicDetails != null && !String.IsNullOrEmpty(this.objPresItemDetls.FormViewerDetails.BasicDetails.IdentifyingName)) {
                this.objDrugItemInputData.IdentifyingName = this.objPresItemDetls.FormViewerDetails.BasicDetails.IdentifyingName;
                this.objDrugItemInputData.IdentifyingOID = this.objPresItemDetls.FormViewerDetails.BasicDetails.IdentifyingOID;
                this.objDrugItemInputData.IdentifyingType = this.objPresItemDetls.FormViewerDetails.BasicDetails.IdentifyingType;
                this.objDrugItemInputData.MCVersionNo = AppSessionInfo.AMCV;
                this.objDrugItemInputData.IsFormulary = (this.objPresItemDetls.IsNonformulary == '1') ? false : true;
                this.objDrugItemInputData.FavouritesDetailOID = 0;
                this.objDrugItemInputData.IsAccessContraint = this.objPresItemDetls.IsAccessContraint;
                this.objDrugItemInputData.IsPrescribeByBrand = this.objPresItemDetls.IsPrescribeByBrand;
                if (this.objPresItemDetls.ItemMainType != null) {
                    this.objDrugItemInputData.ItemType = this.objPresItemDetls.ItemMainType;
                }
                else {
                    this.objDrugItemInputData.ItemType = this.objRelateItem.ItemType;
                }
                if (!String.IsNullOrEmpty(this.objPresItemDetls.ItemSubType)) {
                    this.objDrugItemInputData.ITMSUBTYP = this.objPresItemDetls.ItemSubType;
                }
                else {
                    this.objDrugItemInputData.ITMSUBTYP = this.objRelateItem.ItemSubType;
                }
            }
            else if (this.oMedBrandConst != null) {
                this.objDrugItemInputData.IdentifyingName = this.oMedBrandConst.DrugName;
                this.objDrugItemInputData.IdentifyingOID = this.oMedBrandConst.DrugOID;
                this.objDrugItemInputData.IdentifyingType = this.oMedBrandConst.DrugType;
                this.objDrugItemInputData.LorenzoID = this.oMedBrandConst.LorenzoID;
                this.objDrugItemInputData.MCVersionNo = AppSessionInfo.AMCV;
                this.objDrugItemInputData.IsFormulary = (String.IsNullOrEmpty(this.oMedBrandConst.IsFormulary) || String.Compare(this.oMedBrandConst.IsFormulary, "0", StringComparison.InvariantCultureIgnoreCase) == 0) ? false : true;
                this.objDrugItemInputData.FavouritesDetailOID = 0;
                this.objDrugItemInputData.IsAccessContraint = this.oMedBrandConst.IsAccessConst;
                this.objDrugItemInputData.IsPrescribeByBrand = this.oMedBrandConst.IsPrescribeByBrand;
                this.objDrugItemInputData.ItemType = this.oMedBrandConst.ItemType;
                this.objDrugItemInputData.ITMSUBTYP = this.oMedBrandConst.ItemsubType;
            }
            this.IPPMABaseVMData.PrescribeNewItemEvent = (s) => { this.objMPVM_PrescribeNewItemEvent(s); };
            if (this.objPresItemDetls.IsOther)
                this.IPPMABaseVMData.PrescribeNewItem(this.objDrugItemInputData);
            else {
                this.objPresItemDetls.FormViewerDetails.BasicDetails.IsLoadingDataForOrderSentence = true;
                this.objPresItemDetls.ePrescribeSource = PrescribeSource.DOS;
                this.IPPMABaseVMData.PrescribeNewItem(this.objDrugItemInputData, this.objPresItemDetls);
            }
        }
    }
    public objMPVM_PrescribeNewItemEvent(IsChildWindowClosed: boolean): void {
        this['dupDialogRef'].close();
        this.IPPMABaseVMData.oSecChild.dupDialogRef.close();
        // if (!(IsChildWindowClosed)) {
        //     //this.appDialog.DialogResult = IsChildWindowClosed;
        //     this.dupDialogRef.close();
        //     if (this.ImeddrugprescriptionpackoptionChildCloseEvent != null) {
        //         this.ImeddrugprescriptionpackoptionChildCloseEvent(true);
        //     }
        // }
        // else {
        //     this.appDialog.DialogResult = null;
        // }
    }
    grdRelated_onCellClick(sender: Object, args: GridViewCellClickEventArgs): void {
        // if (this.parentChild != null) {
        //     this.parentChild.DialogResult = false;
        //     this.parentChild = null;
        // }
        if (this.grdRelated.GetColumnIndexByName("PrescriptionItem") == args.ColumnIndex) {
            iBusyIndicator.Start("FormViewer", true);
            CommonVariables.FormViewerIsInProgress = true;
            this.objPackOptionItem = ObjectHelper.CreateType<PackOptionItem>(this.grdRelated.GetRowData(args.RowIndex), PackOptionItem);
            this.objDrugItemInputData = new DrugItemInputData();
            this.objDrugItemInputData.IdentifyingName = this.objPackOptionItem.IdentifyingName;
            this.objDrugItemInputData.IdentifyingOID = this.objPackOptionItem.IdentifyingOID;
            this.objDrugItemInputData.IdentifyingType = this.objPackOptionItem.IdentifyingType;
            this.objDrugItemInputData.LorenzoID = this.objPackOptionItem.LorenzoID;
            this.objDrugItemInputData.MCVersionNo = AppSessionInfo.AMCV;
            this.objDrugItemInputData.IsFormulary = (String.IsNullOrEmpty(this.objPackOptionItem.IsFormulary) || String.Compare(this.objPackOptionItem.IsFormulary, "0", StringComparison.InvariantCultureIgnoreCase) == 0) ? false : true;
            this.objDrugItemInputData.FavouritesDetailOID = 0;
            this.objDrugItemInputData.IsAccessContraint = this.objPackOptionItem.IsAccessConstraint;
            this.objDrugItemInputData.IsPrescribeByBrand = this.objPackOptionItem.IsByBrand;
            this.objDrugItemInputData.ItemType = this.objRelateItem.ItemType;
            this.objDrugItemInputData.IsIndicationRequired = this.objPackOptionItem.IsIndicationRequired;
            this.objDrugItemInputData.SourceDataProviderType = this.objPackOptionItem.SourceDataproviderType;
            this.objDrugItemInputData.IsAuthorise = this.objPackOptionItem.IsAuthorise;
            this.objDrugItemInputData.ITMSUBTYP = this.objRelateItem.ItemSubType;
            this.IPPMABaseVMData.PrescribeNewItemEvent = (s, e) => { this.objMPVM_PrescribeNewItemEvent_PackOption(s); };
            this.IPPMABaseVMData.PrescribeNewItem(this.objDrugItemInputData);
        }
    }
    objMPVM_PrescribeNewItemEvent_PackOption(IsChildWindowClosed: boolean): void {
        this['dupDialogRef'].close();
        this.IPPMABaseVMData.oSecChild.dupDialogRef.close();
        // if (!(IsChildWindowClosed)) {
        //     this.appDialog.DialogResult = IsChildWindowClosed;
        //     if (this.ImeddrugprescriptionpackoptionChildCloseEvent != null) {
        //         this.ImeddrugprescriptionpackoptionChildCloseEvent(true);
        //     }
        // }
        // else {
        //     this.appDialog.DialogResult = null;
        // }
    }
    // private CancelButton_Click(sender: Object, e: RoutedEventArgs): void {
    //     this.appDialog.DialogResult = false;
    // }
    private ChildWindow_Loaded(sender: Object, e: RoutedEventArgs): void {
        if (this.DataContext != null) {
              
            this.grdRelated.ItemsSource.Clear();
            this.grdPrescribe.ItemsSource.Clear();
            this.objRelateItem = ObjectHelper.CreateType<RelateItem>(this.DataContext, RelateItem);
            if (this.IPPMABaseVMData.PackOptionItem == null) {
                this.IPPMABaseVMData.PackOptionItem = new MedicationOptionVM(this.IPPMABaseVMData);                
            }
            this.IPPMABaseVMData.PackOptionItem.PackOptionChangedEvent = (s, e) => { this.PackOptionItem_PackOptionChangedEvent(); };
            this.IPPMABaseVMData.PrescribeNewItemEvent = (s) => { this.objMPVM_PrescribeNewItemEvent(s); };
            let lnIOID: number;
            if (Number.TryParse(this.objRelateItem.IdentifyingOID, (o) => { lnIOID = o; })) {
                this.IPPMABaseVMData.PackOptionItem.IdentifyingOID = lnIOID;
                this.IPPMABaseVMData.PackOptionItem.IdentifyingType = this.objRelateItem.IdentifyingType;
                this.IPPMABaseVMData.PackOptionItem.ItemType = this.objRelateItem.ItemType;
                this.chkInclNonFor.DataContext = this.IPPMABaseVMData.PackOptionItem;
                this.IPPMABaseVMData.PackOptionItem.IsFormularyCheckedProductOptions = String.Compare(this.objRelateItem.IsFormulary, "0", StringComparison.InvariantCultureIgnoreCase) == 0 ? true : false;                                
                if (this.IPPMABaseVMData.PackOptionItem.IsFormularyCheckedProductOptions) {
                    this.chkInclNonFor_Checked(null, null);                    
                }
                this.lblDrugName.Text = this.objRelateItem.IdentifyingName;
            }
            if (String.Equals(PatientContext.PrescriptionType, PrescriptionTypes.ForAdministration, StringComparison.OrdinalIgnoreCase) && PatientContext.ClerkFormViewDefaultBehavior != ClerkFormViewDeftBehaviour.LaunchFormMandatory && !String.IsNullOrEmpty(this.objRelateItem.IdentifyingType) && !String.IsNullOrEmpty(this.objRelateItem.LorenzoID) && !String.IsNullOrEmpty(AppSessionInfo.AMCV)) {
                let oParam: string[] = new Array(3);
                let Isauthorise: string = String.Empty;
                oParam[0] = this.objRelateItem.IdentifyingType;
                oParam[1] = this.objRelateItem.LorenzoID;
                oParam[2] = AppSessionInfo.AMCV;
                Isauthorise = ObjectHelper.CreateType<string>(HtmlPage.Window.Invoke("GetIsItemAuthorise", oParam), String);
                if (String.Equals(Isauthorise, "1", StringComparison.InvariantCultureIgnoreCase)) {
                    this.lblDrugName.Text = this.objRelateItem.IdentifyingName + CConstants.sAuthoriseText;
                }
            }
            this.cmdPrescribingOptions = ObjectHelper.CreateType<iButton>(this.objPackOptionChildfooter.FindName("cmdPrescribingOptions"), iButton);
            if (this.cmdPrescribingOptions != null)
                this.cmdPrescribingOptions.Click = (s, e) => { this.cmdPrescribingOptions_Click(s, e); };
        }
        Common.SetColorConfigCSS();        
    }
    PackOptionItem_PackOptionChangedEvent(): void {
        if (this.IPPMABaseVMData != null && this.IPPMABaseVMData.PackOptionItem != null && this.IPPMABaseVMData.PackOptionItem.PackOptionItemList != null && this.IPPMABaseVMData.PackOptionItem.PackOptionItemList.Count > 0) {
           // this.grdRelated.ItemsSource = this.IPPMABaseVMData.PackOptionItem.PackOptionItemList;
           this.grdRelated.SetBinding('data', this.IPPMABaseVMData.PackOptionItem.PackOptionItemList);
            this.grdRelated.Rebind();
            this.grdRelated.SelectedItem = this.IPPMABaseVMData.PackOptionItem.PackOptionItemList[0];
            this.grdRelated.selectedRowsIndex = [0];
            this.grdRelated.RowIndicatorVisibility = Visibility.Visible;
            this.grdRelated_SelectionChanged(null, null);
        }
        else this.grdRelated.ItemsSource = null;
        if (this.oMedBrandConst != null)
            this.oMedBrandConst.ProcessOptions = new ObservableCollection<PrescriptionItemVM>();
    }
    grdRelated_SelectionChanged(sender: Object, e: SelectionChangeEventArgs): void {
        if (this.grdRelated.SelectedItem != null) {
            this.objPackOptionItem = ObjectHelper.CreateType<PackOptionItem>(this.grdRelated.GetCurrentRowData(), PackOptionItem);
            if (this.oMedBrandConst == null) {
                if (this.IPPMABaseVMData != null)
                    this.oMedBrandConst = new MedBrandConstraintsVM(this.IPPMABaseVMData);
                else this.oMedBrandConst = new MedBrandConstraintsVM();
            }
            this.oMedBrandConst.DrugName = this.objPackOptionItem.IdentifyingName;
            this.oMedBrandConst.DrugOID = this.objPackOptionItem.IdentifyingOID;
            this.oMedBrandConst.DrugType = !String.IsNullOrEmpty(this.objPackOptionItem.IdentifyingType) ? this.objPackOptionItem.IdentifyingType : String.Empty;
            this.oMedBrandConst.IsFormulary = this.objPackOptionItem.IsFormulary;
            this.oMedBrandConst.IsAccessConst = this.objPackOptionItem.IsAccessConstraint;
            this.oMedBrandConst.IsPrescribeByBrand = this.objPackOptionItem.IsByBrand;
            this.oMedBrandConst.FormularyNote = this.objPackOptionItem.FormularyNotes;
            this.oMedBrandConst.LorenzoID = this.objPackOptionItem.LorenzoID;
            this.oMedBrandConst.ItemsubType = this.objPackOptionItem.ItemSubType;
            this.oMedBrandConst.ItemType = (<RelateItem>(this.DataContext)).ItemType;
            this.grdPrescribe.DataContext = this.oMedBrandConst;
            this.oMedBrandConst.GetProcessingOptions();
            this.grdPrescribe.SetBinding('data', this.oMedBrandConst.ProcessOptions);
            this.grdPrescribe.RowIndicatorVisibility = Visibility.Visible;
            this.grdPrescribe.selectedRowsIndex=[0];
            if (!String.IsNullOrEmpty(this.objPackOptionItem.PrescribingNote)) {
                this.R_Name.Source = new BitmapImage(new Uri(MedImage.GetPath(MedImages.NoteIcon), UriKind.Relative));
                //this.R_Name.TextData = this.objPackOptionItem.PrescribingNote;
                let sToolTip: string = String.Empty;
                if (this.objPackOptionItem.PrescribingNote.length > 200) {
                    sToolTip = this.objPackOptionItem.PrescribingNote.Substring(0, 199) + "...";
                    this.R_Name.ToolTip = sToolTip;
                }
                else {
                    this.R_Name.ToolTip = this.objPackOptionItem.PrescribingNote;
                }
            }
            else {
                this.R_Name.Source = null;
                //this.R_Name.TextData = String.Empty;
                this.R_Name.ToolTip = String.Empty;
            }
        }
    }
    private grdRelated_RowLoaded(sender: Object, e: RowLoadedEventArgs): void {
        if (e.Row != null && e.Row.Item != null) {
            let sStackPanel: StackPanel = (<StackPanel>e.Row.Cells[0].dataTemplates.stkpnl);
            if (sStackPanel.Children[0] != null) {
                let sLabel: iLabel = <iLabel>sStackPanel.Children[0];
                if (!String.IsNullOrEmpty(Common.sFormStyle) || !String.IsNullOrEmpty(Common.sNonFormStyle)) {
                    //let sLabel: iLabel = <iLabel>e.Row.Cells[0].Content;
                    let oItemVM: PackOptionItem = ObjectHelper.CreateType<PackOptionItem>(e.Row.Item, PackOptionItem);
                    if (oItemVM instanceof PackOptionItem) {
                        if (Convert.ToInt64(oItemVM.IsFormulary) > 0) {
                            this.SetStyle(Common.sFormStyle, sLabel);
                        }
                        else {
                            this.SetStyle(Common.sNonFormStyle, sLabel);
                        }
                    }
                }
            }
        }
    }

    SetStyle(sData: string, sLabel: iLabel): void {
        let data: string[];
        if (sData != null) {
            data = sData.Split('~');
            sLabel.Foreground = new SolidColorBrush(Common.hexToColor(data[0]));
            if (String.Compare(data[3].ToString(), "bold") == 0)
                sLabel.FontWeight = FontWeights.Bold;
            else sLabel.FontWeight = FontWeights.Normal;
            if (String.Compare(data[2].ToString(), "italic") == 0)
                sLabel.FontStyle = FontStyles.Italic;
            else sLabel.FontStyle = FontStyles.Normal;
            if (String.Compare(data[1].ToString(), "uppercase") == 0)
                sLabel.Text = sLabel.Text.ToUpper();
            else if (String.Compare(data[1].ToString(), "lowercase") == 0)
                sLabel.Text = sLabel.Text.ToLower();
        }
    }
    public chkInclNonFor_Checked(sender: Object, e: RoutedEventArgs): void {
        if (this.DataContext != null) {

            if (!this.chkInclNonFor.IsChecked) {
                this.grdRelated.Rows.Clear();
                this.grdRelated.ItemsSource.Clear();
                this.grdPrescribe.Rows.Clear();
                this.grdPrescribe.ItemsSource.Clear();
            }
            
            let objRelateItem: RelateItem = ObjectHelper.CreateType<RelateItem>(this.DataContext, RelateItem);
            //Revisit required for the workaround added --|| this.IPPMABaseVMData.packOptionItem.IsFormularyCheckedProductOptions == true
            if ((String.Equals(objRelateItem.IsAccessConstraint, "1", StringComparison.CurrentCultureIgnoreCase) || String.Equals(objRelateItem.IsIndicationRequired, "1", StringComparison.CurrentCultureIgnoreCase)) && 
                (this.chkInclNonFor.IsChecked == true || this.IPPMABaseVMData.packOptionItem.IsFormularyCheckedProductOptions == true)) {
                //this.LayoutRoot.RowDefinitions[3].Height = new GridLength(260);
                this.grdPrescribe.Visibility = Visibility.Collapsed;
                this.LblPresOpt.Visibility = Visibility.Collapsed;
                this.cmdPrescribingOptions = ObjectHelper.CreateType<iButton>(this.objPackOptionChildfooter.FindName("cmdPrescribingOptions"), iButton);
                if (this.cmdPrescribingOptions != null)
                    this.cmdPrescribingOptions.Visibility = Visibility.Visible;
                //Revisit required - IsEnabled made true
                //this.cmdPrescribingOptions.IsEnabled = (this.grdRelated.Rows.Count > 0);
                this.cmdPrescribingOptions.IsEnabled = true;
            }
            else {
                this.cmdPrescribingOptions = ObjectHelper.CreateType<iButton>(this.objPackOptionChildfooter.FindName("cmdPrescribingOptions"), iButton);
                if (this.cmdPrescribingOptions != null)
                    this.cmdPrescribingOptions.Visibility = Visibility.Collapsed;
                this.grdPrescribe.Visibility = Visibility.Visible;
                this.LblPresOpt.Visibility = Visibility.Visible;
                //this.LayoutRoot.RowDefinitions[3].Height = new GridLength(130);
            }
        }
    }
    private cmdPrescribingOptions_Click(sender: Object, argus: RoutedEventArgs): void {
        if (this.grdRelated.SelectedItem != null) {
            this.objPackOptionItem = ObjectHelper.CreateType<PackOptionItem>(this.grdRelated.SelectedItem, PackOptionItem);
            this.IPPMABaseVMData.oIndicationdtl = new Indicationdtl();
            this.IPPMABaseVMData.oIndicationdtl.IsAccessConstriant = this.objPackOptionItem.IsAccessConstraint;
            this.IPPMABaseVMData.oIndicationdtl.IsIndicationRequired = this.objPackOptionItem.IsIndicationRequired;
            this.IPPMABaseVMData.oIndicationdtl.IsPrescribeByBrand = this.objPackOptionItem.IsByBrand;
            this.IPPMABaseVMData.oIndicationdtl.ItemType = this.objPackOptionItem.ItemType;
            this.IPPMABaseVMData.oIndicationdtl.IsFormulary = String.Equals(this.objPackOptionItem.IsFormulary, "1") ? true : false;
            this.IPPMABaseVMData.oIndicationdtl.LorenzoID = this.objPackOptionItem.LorenzoID;
            this.IPPMABaseVMData.oIndicationdtl.ITMSUBTYP = this.objPackOptionItem.ItemSubType;
            this.IPPMABaseVMData.oIndicationdtl.SourceDataProviderType = this.objPackOptionItem.SourceDataproviderType;
            this.IPPMABaseVMData.LaunchAccessConstraint(this.objPackOptionItem.IdentifyingOID.ToString(), this.objPackOptionItem.IdentifyingType, this.objPackOptionItem.IdentifyingName, String.Empty, null, String.Empty, null, this.IPPMABaseVMData.oIndicationdtl, this.objPackOptionItem.IsAuthorise);
        }
    }
    private ChildWindow_Closed(sender: Object, e: EventArgs): void {

    }
    private MedDrugPrescriptionpackoptionChild_Unloaded(sender: Object, e: RoutedEventArgs): void {
        this.DisposeFormEvents();
        this.DisposeFormObjects();
    }
    public DisposeFormEvents(): void {
        if (this.IPPMABaseVMData != null) {
            // this.IPPMABaseVMData.PrescribeNewItemEvent -= this.objMPVM_PrescribeNewItemEvent;
            // this.IPPMABaseVMData.PrescribeNewItemEvent -= this.objMPVM_PrescribeNewItemEvent_PackOption;
        }
        //this.cmdPrescribingOptions.Click -= this.cmdPrescribingOptions_Click;
        // this.grdRelated.onCellClick -= this.grdRelated_onCellClick;
        //this.grdPrescribe.onCellClick -= this.grdPrescribe_onCellClick;
    }
    public DisposeFormObjects(): void {
        //this.IPPMABaseVMData = null;        
    }
}
