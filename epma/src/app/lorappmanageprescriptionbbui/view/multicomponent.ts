import { Component, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { GridComponent } from '@progress/kendo-angular-grid';
import { DataTemplate, Grid, HeaderImageAlignment, HeaderImageListItem, MouseButtonEventArgs, UserControl, iButton, iCheckBox, iComboBox, iLabel, iTab, iTabItem, iTextBox } from 'epma-platform/controls';
import { ObjectHelper } from 'epma-platform/helper';
import { AppSessionInfo, CListItem, HtmlPage, List, ObservableCollection, Random, SelectionChangedEventArgs, StringComparison, Visibility } from 'epma-platform/models';
import { Convert, ScriptObject, StringBuilder } from 'epma-platform/services';
import 'epma-platform/stringextension';
import { CommonBB } from 'src/app/lorappcommonbb/utilities/common';
import { ClerkFormViewDeftBehaviour, PatientContext } from "src/app/lorappcommonbb/utilities/globalvariable";
import { TextChangedEventArgs } from 'src/app/shared/epma-platform/controls/Control';
import { RoutedEventArgs } from 'src/app/shared/epma-platform/controls/FrameworkElement';
import { GridExtension, GridViewCellClickEventArgs, RowLoadedEventArgs, SelectionChangeEventArgs } from 'src/app/shared/epma-platform/controls/epma-grid-helpers/grid-extension';
import * as ControlStyles from "../../shared/epma-platform/controls/ControlStyles";
import { ActivityTypes, ConflictIcons, FormDefaults } from '../model/common';
import { Resource } from '../resource';
import { DoseTypeCode, MedImage, MedImages, PrescriptionTypes } from '../utilities/constants';
import { CommonFlags } from '../utilities/globalvariable';
import { MulticomponentChildVM } from '../viewmodel/MulticomponentVM';
import { PrescriptionItemVM } from '../viewmodel/PrescriptionItemVM';
import { ConditionalDosingVM } from '../viewmodel/conditionaldosevm';
import { medFormViewer } from './medformviewer';
import { CommonService } from 'src/app/product/shared/common.service';
var that;

@Component({
    selector: 'Multicomponent',
    templateUrl: './multicomponent.html',
    styles: [
        ` 
        .hedderstyle{
        margin-top: -135px;
        padding: 0px 5px 0px 5px;
        background: #E0EFF1;

        }
        
        :host ::ng-deep .k-grid .k-grid-content td.UOM {
            position: relative;
        }
         :host ::ng-deep .k-grid .k-grid-content td.Quantity {
       position: relative;
         }

         .Size {
            margin: 4px;
         }
         .SfsPadding {
            padding-left: 10px;
         }
        `
    ]
})


export class Multicomponent extends UserControl {
    public Styles = ControlStyles;
    public objMulticomponent = Resource.Multicomponent;
    //public MCconflicticon:MCconflicticon;

    private LayoutRoot: Grid;
    @ViewChild("LayoutRootTempRef", { read: Grid, static: false }) set _LayoutRoot(c: Grid) {
        if (c) { this.LayoutRoot = c; }
    };
    private lblBorder: iLabel;
    @ViewChild("lblBorderTempRef", { read: iLabel, static: false }) set _lblBorder(c: iLabel) {
        if (c) { this.lblBorder = c; }
    };
    public grdmulticomponent: GridExtension = new GridExtension();
    @ViewChild("grdmulticomponentTempRef", { read: GridComponent, static: false }) set _grdmulticomponent(c: GridComponent) {
        if (c) {
            this.grdmulticomponent.grid = c;
            this.grdmulticomponent.columns = c.columns;
        }
    };
    private cmdAdd: iButton;
    @ViewChild("cmdAddTempRef", { read: iButton, static: false }) set _cmdAdd(c: iButton) {
        if (c) { this.cmdAdd = c; }
    };
    private cmdRemove: iButton;
    @ViewChild("cmdRemoveTempRef", { read: iButton, static: false }) set _cmdRemove(c: iButton) {
        if (c) { this.cmdRemove = c; }
    };
    private lblDosageform: iLabel;
    @ViewChild("lblDosageformTempRef", { read: iLabel, static: false }) set _lblDosageform(c: iLabel) {
        if (c) { this.lblDosageform = c; }
    };
    private cboDosageFormMC: iComboBox;
    @ViewChild("cboDosageFormMCTempRef", { read: iComboBox, static: false }) set _cboDosageFormMC(c: iComboBox) {
        if (c) { this.cboDosageFormMC = c; }
    };
    private dataTemplates: QueryList<DataTemplate>;
    @ViewChildren(DataTemplate) set _dataTemplates(val: QueryList<DataTemplate>) {
        if (val) {
            this.dataTemplates = val;
            this.grdmulticomponent.dataTemplates = val;
        }
    }

    @ViewChildren('temp', { read: DataTemplate }) set _grdDataDataTemplates(c: QueryList<DataTemplate>) {
        if (c) {
            this.grdmulticomponent.dataTemplates = c;
        }
    }

    oPVM: PrescriptionItemVM;
    public omedFormViewer: medFormViewer;
    private oTechValTab: iTabItem;
    private oRecordAdminTab: iTabItem;
    private isdefaultUOM: boolean;
    private DefaultUOMOID: string;
    private DefaultUOMname: string;
    private isAddClicked: boolean = false;
    private isAddItemClicked: boolean = false;
    private IsPreventReBindGird: boolean = false;
    cboDosageForm_SelectionChanged_Func: Function;

    constructor() {
        super();
        that = this;
        //this.grdmulticomponent.RowLoaded  = (s,e) => { this.grdmulticomponent_RowLoaded(s,e); } ;
    }

    ngOnInit(): void {
        this.grdmulticomponent.RowIndicatorVisibility = Visibility.Visible;
        this.grdmulticomponent.onCellClick = (s, e) => { this.grdmulticomponent_onCellClick(s, e); };
    }

        public maxScrollContentHeight;
        public maxGridLayoutHeight;
        public maxGridHeight;
        public maxcolWidth;
    ngAfterViewInit(): void {
        // if(window.screen.height < 1000 ){
        //     this.maxcolWidth = 938;
        //     // this.maxScrollContentHeight = 300;
        //     this.maxScrollContentHeight = CommonService.setDynamicScrollviewerHeight();
        //     if(this.maxScrollContentHeight){
        //         this.maxScrollContentHeight = (this.maxScrollContentHeight - 252)
        //         this.maxGridLayoutHeight = (this.maxScrollContentHeight - 50); // (row2)70 + 15 + 15
        //         this.maxGridHeight = this.maxGridLayoutHeight - 60;
        //         this.maxScrollContentHeight -= 30; // scrollviewer maxHeight
        //   }
        // }
        //   else{
            this.maxcolWidth = 947;
            this.maxScrollContentHeight = CommonService.setDynamicScrollviewerHeight();
            if(this.maxScrollContentHeight){
                this.maxGridLayoutHeight = (this.maxScrollContentHeight - 100); // (row2)70 + 15 + 15
                this.maxGridHeight = this.maxGridLayoutHeight - 60;
                this.maxScrollContentHeight -= 30; // scrollviewer maxHeight
            }
        // }
        this.grdmulticomponent.GenerateColumns();
        this.cmdRemove.IsEnabled = false;
        this.LayoutRoot_Loaded(null, null);
        this.cboDosageForm_SelectionChanged_Func = (s, e: SelectionChangedEventArgs) => {
            if (((s as iComboBox).tagData == false) || this.isAddItemClicked)
                e.sourceComponent = undefined;
            else
                e.sourceComponent = "MCI";

            this.isAddItemClicked = false;
            this.cboDosageForm_SelectionChanged(s, e);
        };
        if (this.oPVM != null && this.oPVM.FormViewerDetails != null && this.oPVM.FormViewerDetails.MulticomponentDetails != null
            && this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo != null) {
            this.grdmulticomponent.SetBinding("data", this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo);
            this.RetainGridRowSelection();
        }
        this.grdmulticomponent.GridSelectionChange = (s, e) => { this.grdmulticomponent_SelectionChanged(s, e) };
    }

    MouseLeftButtonDown_FuncNew($event, rowIndex, columnIndex) {
        columnIndex = this.grdmulticomponent.GetColumnIndexForCellClick(columnIndex);
        let args: GridViewCellClickEventArgs = { ColumnIndex: columnIndex, RowIndex: rowIndex, ColumnCell: undefined };
        this.grdmulticomponent.onCellClick($event, args);
    }

    MCI_ReBindMCiGRIDEvent(s, e): void {
        if (!this.IsPreventReBindGird) {
            this.grdmulticomponent.Rebind();
        }
        else {
            this.IsPreventReBindGird = false;
        }
        let oFauxTab: iTab = ObjectHelper.CreateType<iTab>((ObjectHelper.CreateType<iTabItem>(this.Parent, iTabItem)).Parent, iTab);
        let oFauxTabItem: iTabItem = oFauxTab.GetItem("frmConflicts");
        if (oFauxTabItem instanceof iTabItem && oFauxTabItem.Key == "frmConflicts") {
            oFauxTabItem.HeaderImageList = new List<HeaderImageListItem>();
            let obj: HeaderImageListItem = new HeaderImageListItem();
            if (this.oPVM.TrafficIcon == ConflictIcons.Red) {
                oFauxTabItem.HeaderImage = MedImage.GetPath(MedImages.RedStar);
                oFauxTabItem.HeaderImageAlign = HeaderImageAlignment.Right;
                obj.HeaderImage = MedImage.GetPath(MedImages.RedStar);
                obj.HeaderImageAlignment = HeaderImageAlignment.Right;
            }
            else if (this.oPVM.TrafficIcon == ConflictIcons.Amber) {
                oFauxTabItem.HeaderImage = MedImage.GetPath(MedImages.Amber);
                oFauxTabItem.HeaderImageAlign = HeaderImageAlignment.Right;
                obj.HeaderImage = MedImage.GetPath(MedImages.Amber);
                obj.HeaderImageAlignment = HeaderImageAlignment.Right;
            }
            else if (this.oPVM.TrafficIcon == ConflictIcons.Question) {
                oFauxTabItem.HeaderImage = MedImage.GetPath(MedImages.WhiteQuestionMark);
                oFauxTabItem.HeaderImageAlign = HeaderImageAlignment.Right;
                obj.HeaderImage = MedImage.GetPath(MedImages.WhiteQuestionMark);
                obj.HeaderImageAlignment = HeaderImageAlignment.Right;
            }
            else {
                oFauxTabItem.HeaderImage = "";
                oFauxTabItem.HeaderImageAlign = HeaderImageAlignment.Right;
                obj.HeaderImage = "";
                obj.HeaderImageAlignment = HeaderImageAlignment.Right;
            }
            oFauxTabItem.HeaderImageList.Add(obj);
            if (obj.HeaderImage != null)
                oFauxTabItem.UpdateHeader();
        }
        if (this.oPVM != null && this.oPVM.FormViewerDetails != null && this.oPVM.FormViewerDetails.MulticomponentDetails != null && this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo != null) {
            let MCAuthorizeCount = this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo.Where(s => s.IsMCAuthorize).ToList().Count;
            if (this.omedFormViewer == null) {
                this.omedFormViewer = CommonBB.FindParent<medFormViewer>(this);
            }
            if (this.omedFormViewer != null) {
                if (MCAuthorizeCount > 0 && String.Equals(PatientContext.PrescriptionType, PrescriptionTypes.ForAdministration, StringComparison.OrdinalIgnoreCase) && PatientContext.ClerkFormViewDefaultBehavior != ClerkFormViewDeftBehaviour.LaunchFormMandatory) {
                    this.oTechValTab = this.omedFormViewer.ftbFormViewDetails.GetItem("frmTech");
                    if (this.oTechValTab != null)
                        this.oTechValTab.IsEnabled = false;
                    this.oRecordAdminTab = this.omedFormViewer.ftbFormViewDetails.GetItem("frmRecordAdmin");
                    if (this.oRecordAdminTab != null)
                        this.oRecordAdminTab.IsEnabled = false;
                }
                else {
                    this.oTechValTab = this.omedFormViewer.ftbFormViewDetails.GetItem("frmTech");
                    if (this.oTechValTab != null)
                        this.oTechValTab.IsEnabled = true;
                }
            }
        }
    }
    private ColumnVisibility(IsAllColumn: boolean, visibility: boolean): void {
        this.grdmulticomponent.Columns["Quantity"].IsVisible = visibility;
        this.grdmulticomponent.Columns["UOM"].IsVisible = visibility;
        this.grdmulticomponent.Columns["MulticomponentName"].IsVisible = visibility;
        this.grdmulticomponent.Columns["Upto"].IsVisible = visibility;
        this.grdmulticomponent.Columns["isEditable"].IsVisible = false;
        this.grdmulticomponent.Columns["isFormulary"].IsVisible = false;
        if ((this.oPVM != null && this.oPVM.FormViewerDetails.MulticomponentDetails != null && this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo.Count > 0 && this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo[0].isEditable == true) || this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo.Count == 0) {
            this.cmdAdd.IsEnabled = true;
        }
        else {
            this.cmdAdd.IsEnabled = false;
        }
        if (String.Compare(PatientContext.PrescriptionType, PrescriptionTypes.Clerking, StringComparison.InvariantCultureIgnoreCase) == 0)
            this.lblDosageform.Mandatory = false;
    }
    private LayoutRoot_UnLoaded(sender: Object, e: RoutedEventArgs): void {
        this.DisposeFormevents();
    }
    private LayoutRoot_Loaded(sender: Object, e: RoutedEventArgs): void {
        this.oPVM = (ObjectHelper.CreateType<PrescriptionItemVM>(this.DataContext, PrescriptionItemVM));

        this.ColumnVisibility(true, true);
        this.grdmulticomponent.UpdateColumns()
        if (!this.oPVM.IsLoadBasicFaxTab) {
            let bIsModificationReasonExists: boolean = this.oPVM.FormViewerDetails.BasicDetails.IsModificationReasonExists;
            this.oPVM.IsReasonForModificationVisible = Visibility.Collapsed;
            this.oPVM.FormViewerDetails.BasicDetails.IsMandatoryRSNFORMOD = false;
            this.oPVM.FormViewerDetails.BasicDetails.IsMCenableRSNFORMOD = false;
            this.oPVM.FormViewerDetails.BasicDetails.IsMandatoryReasonForMedClerkModify = false;
            this.oPVM.FormViewerDetails.BasicDetails.lstDRCAmendedFlds.Clear();
            this.oPVM.FormViewerDetails.BasicDetails.lstAmendedFlds.Clear();
            this.oPVM.FormViewerDetails.BasicDetails.IsValidateDose = true;
            this.oPVM.FormViewerDetails.BasicDetails.IsClearlstAmendList = true;
            this.oPVM.FormViewerDetails.BasicDetails.IsClearlstAmendedFlds = true;
            if (bIsModificationReasonExists)
                this.oPVM.FormViewerDetails.BasicDetails.IsModificationReasonExists = true;
        }
        if (this.oPVM.FormViewerDetails.BasicDetails.IsInfusionFormViewer) {
            this.oPVM.FormViewerDetails.BasicDetails.Infusions = true;
        }
        if ((this.oPVM.FormViewerDetails.MulticomponentDetails != null && this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo.Count > 0 && (this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo[0].isEditable == true || this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo[0].isQtyEditable == true || this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo[0].isQtyUOMEditable == true)) || this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo.Count == 0) {
            if (this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo.Count == 0 || this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo[0].isQtyEditable == true) {
                this.grdmulticomponent.Columns["Quantity"].IsReadOnly = false;
            }
            else {
                this.grdmulticomponent.Columns["Quantity"].IsReadOnly = true;
            }
            if (this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo.Count == 0 || this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo[0].isQtyUOMEditable == true) {
                this.grdmulticomponent.Columns["UOM"].IsReadOnly = false;
            }
            else {
                this.grdmulticomponent.Columns["UOM"].IsReadOnly = true;
            }
            this.grdmulticomponent.Columns["MulticomponentName"].IsReadOnly = true;
            if (this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo.Count == 0 || this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo[0].isEditable == true) {
                this.grdmulticomponent.Columns["Upto"].IsReadOnly = false;
                if (this.oPVM.FormViewerDetails.MulticomponentDetails != null && this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo.Count > 0) {
                    for (let i: number = 0; i < this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo.Count; i++) {
                        this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo[i].IsUptoEnabled = true;
                    }
                }
            }
            else {
                this.grdmulticomponent.Columns["Upto"].IsReadOnly = true;
                if (this.oPVM.FormViewerDetails.MulticomponentDetails != null && this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo.Count > 0) {
                    for (let i: number = 0; i < this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo.Count; i++) {
                        this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo[i].IsUptoEnabled = false;
                    }
                }
            }
            this.grdmulticomponent.Columns["isEditable"].IsReadOnly = false;
            this.grdmulticomponent.Columns["isFormulary"].IsReadOnly = false;
        }
        else {
            this.grdmulticomponent.Columns["Quantity"].IsReadOnly = true;
            this.grdmulticomponent.Columns["UOM"].IsReadOnly = true;
            this.grdmulticomponent.Columns["MulticomponentName"].IsReadOnly = true;
            this.grdmulticomponent.Columns["Upto"].IsReadOnly = true;
            if (this.oPVM.FormViewerDetails.MulticomponentDetails != null && this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo.Count > 0) {
                for (let i: number = 0; i < this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo.Count; i++) {
                    this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo[i].IsUptoEnabled = false;
                }
            }
            this.grdmulticomponent.Columns["isEditable"].IsReadOnly = true;
            this.grdmulticomponent.Columns["isFormulary"].IsReadOnly = true;
        }
        if (this.oPVM.IsFormViewerDisable) {
            this.grdmulticomponent.IsEnabled = false;
            this.cmdAdd.IsEnabled = false;
            this.cmdRemove.IsEnabled = false;
            this.cboDosageFormMC.IsEnabled = false;
            this.lblDosageform.IsEnabled = false;
            this.lblDosageform.Mandatory = false;
        }
        this.oPVM.ReBindMCiGRIDEvent = (s, e) => { this.MCI_ReBindMCiGRIDEvent(s, e); };
        // this.grdmulticomponent.RowLoaded  = (s,e) => { this.grdmulticomponent_RowLoaded(s,e); } ;
        this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo.forEach((objChild) => {
            objChild.QuantityUOMChangedEvent = (s, e) => { this.cboMCUOM_SelectionChanged(s, e); };
            // objChild.QuantityUOMChangedEvent  = (s,e) => { this.cboMCUOM_SelectionChanged(s,e); } ;
        });
    }
    private DisposeFormevents(): void {
        if (this.grdmulticomponent != null)
            // this.grdmulticomponent.RowLoaded -= grdmulticomponent_RowLoaded;
            if (this.oPVM != null)
                // this.oPVM.ReBindMCiGRIDEvent -= MCI_ReBindMCiGRIDEvent;
                if (this.oPVM != null && this.oPVM.FormViewerDetails != null && this.oPVM.FormViewerDetails.MulticomponentDetails != null && this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo != null && this.oPVM.formViewerDetails.MulticomponentDetails.oMCItemBasicInfo.Count > 0) {
                    this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo.forEach((objChild) => {
                        //  objChild.QuantityUOMChangedEvent -= cboMCUOM_SelectionChanged;
                    });
                }
    }
    private cboMCUOM_SelectionChanged(s, e): void {
        if (this.oPVM.FormViewerDetails.MulticomponentDetails != null && this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo.Count > 0 && this.oPVM.formViewerDetails.BasicDetails.isAdhocitem != true) {
            this.IsPreventReBindGird = true;
            this.GetAdhocOnChangeQtyQtyUOM();
            this.ChangeAdHocSettings();
        }
        if (this.oPVM.FormViewerDetails.BasicDetails != null && this.oPVM.FormViewerDetails.BasicDetails.IsenableOnbehalfOf != true) {
            this.oPVM.FormViewerDetails.BasicDetails.IsenableOnbehalfOf = true;
        }
    }
    grdmulticomponent_SelectionChanged(sender: Object, e: SelectionChangeEventArgs): void {
        this.grdmulticomponent.ItemsSource.forEach(item => item.SelectedRowIndex = -1);
        e.AddedItems[0].SelectedRowIndex = this.grdmulticomponent.selectedRowsIndex[0];
        if (this.grdmulticomponent.GetSelectedRowCount() == 0) {
            this.cmdRemove.IsEnabled = false;
        }
        else if (this.grdmulticomponent.GetSelectedRowCount() >= 1) {
            if (this.grdmulticomponent.SelectedItems != null) {
                if (this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo != null && this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo[0].isEditable == true) {
                    this.cmdRemove.IsEnabled = true;
                }
            }
        }
    }

    RowSelectionChanged({ trigger, selectedRowIndex }) {
        if (trigger && selectedRowIndex != undefined) {
            let e: SelectionChangeEventArgs = {};
            let addedItems: List = new List();
            addedItems.Add(this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo[selectedRowIndex]);
            e.AddedItems = addedItems;
            this.grdmulticomponent.selectedRowsIndex = [selectedRowIndex];
            this.grdmulticomponent_SelectionChanged({}, e);
        }
    }

    rowLoaded(context: any) {
        let rowEventArgs = this.grdmulticomponent.GetRowEventArgs(
            this.dataTemplates,
            context,
            false,
            true
        );
        this.grdmulticomponent_RowLoaded({}, rowEventArgs);
    }

    private grdmulticomponent_RowLoaded(sender: Object, e: RowLoadedEventArgs): void {
        if (e != null && e.Row != null && e.Row.Item != null) {
            let oVM: MulticomponentChildVM = ObjectHelper.CreateType<MulticomponentChildVM>(e.Row.Item, MulticomponentChildVM);
            e.Row.IsSelected = false;
            //  need to chk in kendo grid load ItemsSource(xmal)
            //  this.grdmulticomponent.SetBinding("data", this.oPVM);
        }

    }

    txtLowerRange_TextChanged_Func = (s, e) => {
        Object.keys(that).forEach((prop) => (this[prop] = that[prop]));
        this.txtLowerRange_TextChanged(s, e);
    }

    private txtLowerRange_TextChanged(sender: Object, e: TextChangedEventArgs): void {
        let tb: iTextBox = ObjectHelper.CreateType<iTextBox>(sender, iTextBox);
        if (this.grdmulticomponent.GetCurrentRowIndex() != this.nQtyrowindex) {
            this.nQtyrowindex = this.grdmulticomponent.GetCurrentRowIndex();
        }
        //  if ((this.oPVM != null && this.oPVM.formViewerDetails != null && this.oPVM.FormViewerDetails.MulticomponentDetails != null && this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo.Count > 0 && this.oPVM.formViewerDetails.BasicDetails.isAdhocitem != true && !String.IsNullOrEmpty(tb.Text) && this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo[this.nQtyrowindex].Quantity != tb.Text)) {
        this.IsPreventReBindGird = true;
        this.GetAdhocOnChangeQtyQtyUOM();
        this.ChangeAdHocSettings();
        //  }
        if (this.oPVM.FormViewerDetails.MulticomponentDetails != null && this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo != null) {
            if (this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo.Count > 0)
                this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo[this.nQtyrowindex].Quantity = tb.Text;
            if (this.oPVM.FormViewerDetails.BasicDetails != null && this.oPVM.FormViewerDetails.BasicDetails.IsenableOnbehalfOf != true) {
                this.oPVM.FormViewerDetails.BasicDetails.IsenableOnbehalfOf = true;
            }
        }
    }
    IsUpToChkBoxHandled: boolean = false;
    onUptoCheckBox(sender: any, RowIndex, ColumnIndex) {
        this.IsUpToChkBoxHandled = true;
        ColumnIndex = this.grdmulticomponent.GetColumnIndexForCellClick(ColumnIndex);
        let args: GridViewCellClickEventArgs = { ColumnIndex: ColumnIndex, RowIndex: RowIndex, ColumnCell: undefined };
        if (RowIndex != this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo.Count - 1) {
            setTimeout(() => {
                (sender as iCheckBox).IsChecked = false;
            }, 0);
            this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo[RowIndex].IsUpto = false;
            this.grdmulticomponent_onCellClick(sender, args);
        } else if ((sender as iCheckBox).IsChecked && this.grdmulticomponent.GetRowCount() - 1 == RowIndex) {
            this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo[RowIndex].IsUpto = false;
            this.grdmulticomponent_onCellClick(sender, args);
        }
    }
    nQtyrowindex: number = 0;
    grdmulticomponent_onCellClick(sender: Object, args: GridViewCellClickEventArgs): void {
        let UniqueID: Random = new Random();
        if (this.grdmulticomponent.GetColumnIndexByName("Quantity") == args.ColumnIndex)
            this.nQtyrowindex = args.RowIndex;
        if (this.grdmulticomponent.GetColumnIndexByName("Conflictsicon") == args.ColumnIndex) {
            //if ((args.ColumnCell.Content != null) && (args.ColumnCell.Content instanceof ContentPresenter) && ((ObjectHelper.CreateType<ContentPresenter>(args.ColumnCell.Content, ContentPresenter)).Content != null) && ((ObjectHelper.CreateType<ContentPresenter>(args.ColumnCell.Content, ContentPresenter)).Content instanceof StackPanel) && ((ObjectHelper.CreateType<StackPanel>((ObjectHelper.CreateType<ContentPresenter>(args.ColumnCell.Content, ContentPresenter)).Content, StackPanel)).Children != null) && ((ObjectHelper.CreateType<StackPanel>((ObjectHelper.CreateType<ContentPresenter>(args.ColumnCell.Content, ContentPresenter)).Content, StackPanel)).Children.Count > 0)) {
            let oFauxTab: iTab = ObjectHelper.CreateType<iTab>((ObjectHelper.CreateType<iTabItem>(this.Parent, iTabItem)).Parent, iTab);
            let oFauxTabItem: iTabItem = oFauxTab.GetItem("frmConflicts");
            if (oFauxTabItem instanceof iTabItem && oFauxTabItem.Key == "frmConflicts") {
                oFauxTab.Click(oFauxTabItem.Key, true);
                //}
            }
        }
        if ((this.oPVM.FormViewerDetails.MulticomponentDetails != null && this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo.Count > 0 && this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo[0].isEditable == true) || this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo.Count == 0) {
            if (this.IsUpToChkBoxHandled && this.grdmulticomponent.GetColumnIndexByName("Upto") == args.ColumnIndex) {
                if (args.RowIndex >= 0) {
                    if (this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo[args.RowIndex].IsUpto == false) {
                        this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo[args.RowIndex].IsUpto = true;
                    }
                    else {
                        this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo[args.RowIndex].IsUpto = false;
                    }
                    for (let rcount: number = 0; rcount < this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo.Count; rcount++) {
                        if (this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo[args.RowIndex].IsUpto == true) {
                            if (this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo[args.RowIndex] != this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo[rcount]) {
                                this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo[rcount].IsUpto = false;
                            }
                            else {
                                this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo[rcount].IsUpto = true;
                                this.oPVM.MCuptoIdentifyingoid = this.oPVM.FormViewerDetails.BasicDetails.MCuptoIdentifyingoid = this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo[rcount].IdentifyingOID;
                                this.oPVM.MCuptoIdentifyingtype = this.oPVM.FormViewerDetails.BasicDetails.MCuptoIdentifyingtype = this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo[rcount].IdentifyingType;
                            }
                        }
                        else {
                            this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo[rcount].IsUpto = false;
                            this.oPVM.MCuptoIdentifyingoid = this.oPVM.FormViewerDetails.BasicDetails.MCuptoIdentifyingoid = 0;
                            this.oPVM.MCuptoIdentifyingtype = this.oPVM.FormViewerDetails.BasicDetails.MCuptoIdentifyingtype = String.Empty;
                            this.grdmulticomponent.Rebind();
                        }
                    }
                    if (this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo[args.RowIndex].IsUpto == true) {
                        let objMulti: MulticomponentChildVM = new MulticomponentChildVM();
                        objMulti.ComponentName = this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo[args.RowIndex].ComponentName;
                        this.oPVM.MCIVMVPIdentifyingName = this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo[args.RowIndex].ComponentName;
                        objMulti.ConflictsExist = this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo[args.RowIndex].ConflictsExist;
                        objMulti.ActionCode = this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo[args.RowIndex].ActionCode;
                        objMulti.IdentifyingOID = this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo[args.RowIndex].IdentifyingOID;
                        objMulti.IdentifyingType = this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo[args.RowIndex].IdentifyingType;
                        objMulti.isEditable = this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo[args.RowIndex].isEditable;
                        objMulti.isQtyEditable = this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo[args.RowIndex].isQtyEditable;
                        objMulti.isQtyUOMEditable = this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo[args.RowIndex].isQtyUOMEditable;
                        objMulti.IsUpto = this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo[args.RowIndex].IsUpto;
                        objMulti.LastModifiedAt = this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo[args.RowIndex].LastModifiedAt;
                        objMulti.LorenzoID = this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo[args.RowIndex].LorenzoID;
                        this.oPVM.MCIVMVPLorenzoID = this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo[args.RowIndex].LorenzoID;
                        objMulti.MCQuantity = this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo[args.RowIndex].MCQuantity;
                        objMulti.MCUOMCombo = this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo[args.RowIndex].MCUOMCombo;
                        objMulti.VMVPLorenzoID = this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo[args.RowIndex].VMVPLorenzoID;
                        if (this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo[args.RowIndex].MCUomName == "%") {
                            objMulti.MCUomName = null;
                            objMulti.MCUOMValue = null;
                        }
                        else {
                            objMulti.MCUomName = this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo[args.RowIndex].MCUomName;
                            objMulti.MCUOMValue = this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo[args.RowIndex].MCUOMValue;
                        }
                        objMulti.Nonformularyreason = this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo[args.RowIndex].Nonformularyreason;
                        objMulti.OID = this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo[args.RowIndex].OID;
                        objMulti.OperationMode = this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo[args.RowIndex].OperationMode;
                        objMulti.OtherNonformularyreason = this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo[args.RowIndex].OtherNonformularyreason;
                        objMulti.PrescribableItemListOID = this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo[args.RowIndex].PrescribableItemListOID;
                        objMulti.PrescriptionItemOID = this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo[args.RowIndex].PrescriptionItemOID;
                        objMulti.Quantity = this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo[args.RowIndex].Quantity;
                        objMulti.QuantityUOM = this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo[args.RowIndex].QuantityUOM;
                        objMulti.QuantityUomcol = this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo[args.RowIndex].QuantityUomcol;
                        objMulti.QuantityUOMOID = this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo[args.RowIndex].QuantityUOMOID;
                        objMulti.QuantityUOMs = this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo[args.RowIndex].QuantityUOMs;
                        objMulti.SealImage = this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo[args.RowIndex].SealImage;
                        objMulti.UniqueMCRowID = this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo[args.RowIndex].UniqueMCRowID;
                        objMulti.Compoentsdrugprop = this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo[args.RowIndex].Compoentsdrugprop;
                        objMulti.IsNonFormulary = this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo[args.RowIndex].IsNonFormulary;
                        objMulti.IsMCAuthorize = this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo[args.RowIndex].IsMCAuthorize;
                        objMulti.DisplayOrder = UniqueID.Next();
                        this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo.RemoveAt(args.RowIndex);
                        this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo.Add(objMulti);
                        this.grdmulticomponent.Rebind();
                        this.oPVM.isAdhocitem = true;
                        this.oPVM.FormViewerDetails.BasicDetails.isAdhocitem = true;
                        this.oPVM.AllergenCheck = false;
                        this.oPVM.LorenzoID = CommonFlags.MClorenzoid;
                        this.oPVM.FormViewerDetails.BasicDetails.IsAllowMultiRoute = false;
                        this.oPVM.FormViewerDetails.BasicDetails.IdentifyingOID = CommonFlags.MCidentifyingOID;
                        if (this.oPVM.ActionCode != ActivityTypes.Amend)
                            this.oPVM.GenerateConflictsForInpatient(this.oPVM.objItems);
                        this.oPVM.FormViewerDetails.BasicDetails.bIsMCIrule = true;
                        if (this.oPVM.FormViewerDetails.BasicDetails != null && this.oPVM.FormViewerDetails.BasicDetails.Route != null && this.oPVM.FormViewerDetails.BasicDetails.Route.Value != null) {
                            if (this.oPVM.FormViewerDetails.BasicDetails.DosageForm != null && this.oPVM.FormViewerDetails.BasicDetails.DosageForm.Value != null) {
                                if (!this.oPVM.ParentbaseVM.IsAdhocMCIClicked) {
                                    this.oPVM.GetMcchilditem();
                                    this.oPVM.FormViewerDetails.BasicDetails.GetAdhocMCIFormDefaults(this.oPVM.Itemlist, this.oPVM.FormViewerDetails.BasicDetails.Route.Value, String.Empty, this.oPVM.FormViewerDetails.BasicDetails.MCVersion, FormDefaults.ALL.ToString(), this.oPVM.MCuptoIdentifyingoid, this.oPVM.MCuptoIdentifyingtype);
                                }
                                else {
                                    this.oPVM.FormViewerDetails.BasicDetails.GetAdhocMCIFormDefaults(String.Empty, this.oPVM.FormViewerDetails.BasicDetails.Route.Value, this.oPVM.FormViewerDetails.BasicDetails.DosageForm.Value, this.oPVM.FormViewerDetails.BasicDetails.MCVersion, FormDefaults.ALL.ToString(), this.oPVM.MCuptoIdentifyingoid, this.oPVM.MCuptoIdentifyingtype);
                                }
                            }
                            else this.oPVM.FormViewerDetails.BasicDetails.GetAdhocMCIFormDefaults(String.Empty, this.oPVM.FormViewerDetails.BasicDetails.Route.Value, String.Empty, this.oPVM.FormViewerDetails.BasicDetails.MCVersion, FormDefaults.ALL.ToString(), this.oPVM.MCuptoIdentifyingoid, this.oPVM.MCuptoIdentifyingtype);
                        }
                        else {
                            if (!this.oPVM.ParentbaseVM.IsAdhocMCIClicked) {
                                this.oPVM.GetMcchilditem();
                                this.oPVM.FormViewerDetails.BasicDetails.GetAdhocMCIFormDefaults(this.oPVM.Itemlist, String.Empty, String.Empty, this.oPVM.FormViewerDetails.BasicDetails.MCVersion, FormDefaults.ALL.ToString(), this.oPVM.MCuptoIdentifyingoid, this.oPVM.MCuptoIdentifyingtype);
                            }
                        }
                    }
                    else if (!this.oPVM.ParentbaseVM.IsAdhocMCIClicked) {
                        this.oPVM.FormViewerDetails.BasicDetails.bIsMCIrule = true;
                        this.oPVM.GetMcchilditem();
                        this.oPVM.isAdhocitem = true;
                        if (this.oPVM.ActionCode != ActivityTypes.Amend) {
                            this.oPVM.GenerateConflictsForInpatient(this.oPVM.objItems);
                        }
                        this.oPVM.LorenzoID = CommonFlags.MClorenzoid;
                        this.oPVM.FormViewerDetails.BasicDetails.isAdhocitem = true;
                        this.oPVM.AllergenCheck = false;
                        this.oPVM.FormViewerDetails.BasicDetails.IdentifyingOID = CommonFlags.MCidentifyingOID;
                        this.oPVM.FormViewerDetails.BasicDetails.GetAdhocMCIFormDefaults(this.oPVM.Itemlist, String.Empty, String.Empty, this.oPVM.FormViewerDetails.BasicDetails.MCVersion, FormDefaults.ALL.ToString(), 0, String.Empty);
                    }
                }
            }
        }
        this.IsUpToChkBoxHandled = false;
    }
    public GetAdhocOnChangeQtyQtyUOM(): void {
        this.oPVM.isAdhocitem = true;
        this.oPVM.FormViewerDetails.BasicDetails.isAdhocitem = true;
        this.oPVM.AllergenCheck = false;
        this.oPVM.LorenzoID = this.oPVM.LorenzoID = CommonFlags.MClorenzoid;
        this.oPVM.FormViewerDetails.BasicDetails.IsAllowMultiRoute = false;
        this.oPVM.FormViewerDetails.BasicDetails.IdentifyingOID = CommonFlags.MCidentifyingOID;
        if (this.oPVM.ActionCode != ActivityTypes.Amend) {
            this.oPVM.GenerateConflictsForInpatient(this.oPVM.objItems);
        }
        this.oPVM.FormViewerDetails.BasicDetails.bIsMCIrule = true;
        this.oPVM.GetMcchilditem();
        if (this.oPVM.FormViewerDetails.BasicDetails != null && this.oPVM.FormViewerDetails.BasicDetails.Route != null && this.oPVM.FormViewerDetails.BasicDetails.Route.Value != null) {
            if (this.oPVM.FormViewerDetails.BasicDetails.DosageForm != null && this.oPVM.FormViewerDetails.BasicDetails.DosageForm.Value != null) {
                this.oPVM.FormViewerDetails.BasicDetails.GetAdhocMCIFormDefaults(this.oPVM.Itemlist, this.oPVM.FormViewerDetails.BasicDetails.Route.Value, this.oPVM.FormViewerDetails.BasicDetails.DosageForm.Value, this.oPVM.FormViewerDetails.BasicDetails.MCVersion, FormDefaults.ALL.ToString(), this.oPVM.MCuptoIdentifyingoid, this.oPVM.MCuptoIdentifyingtype);
            }
            else {
                this.oPVM.FormViewerDetails.BasicDetails.GetAdhocMCIFormDefaults(this.oPVM.Itemlist, this.oPVM.FormViewerDetails.BasicDetails.Route.Value, String.Empty, this.oPVM.FormViewerDetails.BasicDetails.MCVersion, FormDefaults.ALL.ToString(), this.oPVM.MCuptoIdentifyingoid, this.oPVM.MCuptoIdentifyingtype);
            }
        }
        else {
            this.oPVM.FormViewerDetails.BasicDetails.GetAdhocMCIFormDefaults(this.oPVM.Itemlist, String.Empty, String.Empty, this.oPVM.FormViewerDetails.BasicDetails.MCVersion, FormDefaults.ALL.ToString(), this.oPVM.MCuptoIdentifyingoid, this.oPVM.MCuptoIdentifyingtype);
        }
    }
    async cmdAdd_Click(sender: Object, e: RoutedEventArgs) {
        if (this.isAddClicked)
            return
        else this.isAddClicked = true;

        this.isAddItemClicked = true;
        this.oPVM.GetMCFormviewcloseflag();
        if (this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo == null) {
            this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo = new ObservableCollection<MulticomponentChildVM>();
        }
        let UniqueID: Random = new Random();
        let oParam: string[] = new Array(5);
        oParam[0] = AppSessionInfo.AMCV;
        if (!this.oPVM.FormViewerDetails.BasicDetails.isAdhocitem && !String.IsNullOrEmpty(this.oPVM.FormViewerDetails.BasicDetails.mCIItemDisplay)) {
            let sbDrugOIDTypes: StringBuilder = new StringBuilder();
            sbDrugOIDTypes.Append(this.oPVM.FormViewerDetails.BasicDetails.IdentifyingOID);
            sbDrugOIDTypes.Append("-");
            sbDrugOIDTypes.Append(this.oPVM.FormViewerDetails.BasicDetails.IdentifyingType);
            oParam[1] = sbDrugOIDTypes.ToString();
            oParam[2] = "2";
            oParam[3] = "1";
            oParam[4] = !String.IsNullOrEmpty(this.oPVM.ParentbaseVM.sTeamOIDs) ? this.oPVM.ParentbaseVM.sTeamOIDs : String.Empty;
        }
        else {
            this.oPVM.GetMcchilditem();
            if (!String.IsNullOrEmpty(this.oPVM.Itemlist))
                oParam[1] = this.oPVM.Itemlist;
            else oParam[1] = String.Empty;
            oParam[2] = "1";
            oParam[3] = "1";
            oParam[4] = !String.IsNullOrEmpty(this.oPVM.ParentbaseVM.sTeamOIDs) ? this.oPVM.ParentbaseVM.sTeamOIDs : String.Empty;
        }
        // let returnValue: ScriptObject = ObjectHelper.CreateType<ScriptObject>(HtmlPage.Window.Invoke("Powersearchsfs", oParam), ScriptObject);
        let returnValue = await HtmlPage.Window.InvokeAsync("Powersearchsfs", ...oParam);
        this.isAddClicked = false;
        let selectedValue: ScriptObject;
        if (returnValue != null && returnValue.GetProperty("length") != null) {
            let nSelectCnt: number = Convert.ToInt32(returnValue.GetProperty("length"));
            if (nSelectCnt == 0) {
                let objMulti: MulticomponentChildVM = new MulticomponentChildVM();
                let isnonform: string = ObjectHelper.CreateType<string>(returnValue.GetProperty("IsFormulary"), String);
                if (isnonform == "1") {
                    objMulti.IsNonFormulary = false;
                }
                else objMulti.IsNonFormulary = true;
                objMulti.ComponentName = ObjectHelper.CreateType<string>(returnValue.GetProperty("Name"), String);
                objMulti.IdentifyingType = ObjectHelper.CreateType<string>(returnValue.GetProperty("Type"), String);
                objMulti.PrescriptionItemOID = 0;
                objMulti.Quantity = String.Empty;
                objMulti.QuantityUOM = String.Empty;
                objMulti.IdentifyingOID = Number.Parse(ObjectHelper.CreateType<string>(returnValue.GetProperty("OID"), String));
                objMulti.isEditable = true;
                objMulti.isQtyEditable = true;
                objMulti.isQtyUOMEditable = true;
                objMulti.IsDisableConflicts = false;
                objMulti.IsUpto = false;
                objMulti.QuantityUOMOID = 0;
                objMulti.PrescribableItemListOID = Number.Parse(ObjectHelper.CreateType<string>(returnValue.GetProperty("PrescribableItemListOID"), String));
                objMulti.LorenzoID = ObjectHelper.CreateType<string>(returnValue.GetProperty("LorenzoID"), String);
                objMulti.UniqueMCRowID = UniqueID.Next();
                objMulti.QuantityUomcol = ObjectHelper.CreateType<string>(returnValue.GetProperty("MCUOMS"), String);
                objMulti.VMVPLorenzoID = ObjectHelper.CreateType<string>(returnValue.GetProperty("VMVPLorenzoID"), String);
                objMulti.VMVPMCIdentifyingName = ObjectHelper.CreateType<string>(returnValue.GetProperty("VMVPMCIdentifyingName"), String);
                if (!String.IsNullOrEmpty(objMulti.VMVPMCIdentifyingName))
                    objMulti.ComponentName = objMulti.VMVPMCIdentifyingName + " - " + objMulti.ComponentName;
                objMulti.Compoentsdrugprop = ObjectHelper.CreateType<string>(returnValue.GetProperty("MCDrugproperty"), String);
                objMulti.DisplayOrder = UniqueID.Next();
                if (String.Equals(PatientContext.PrescriptionType, PrescriptionTypes.ForAdministration, StringComparison.OrdinalIgnoreCase) && PatientContext.ClerkFormViewDefaultBehavior != ClerkFormViewDeftBehaviour.LaunchFormMandatory) {
                    let oParams: string[] = new Array(3);
                    oParams[0] = objMulti.IdentifyingType;
                    oParams[1] = objMulti.LorenzoID;
                    oParams[2] = AppSessionInfo.AMCV;
                    let MCAuthorise: string = ObjectHelper.CreateType<string>(HtmlPage.Window.Invoke("GetIsItemAuthorise", oParams), String);
                    if (!String.IsNullOrEmpty(MCAuthorise)) {
                        objMulti.IsMCAuthorize = (String.Compare(MCAuthorise, "1") == 0) ? true : false;
                    }
                }
                objMulti.MCUOMValue = new CListItem();
                let sUomlist: StringBuilder = new StringBuilder();
                let sProblemName: StringBuilder = new StringBuilder();
                if (objMulti.QuantityUomcol != null && !String.IsNullOrEmpty(objMulti.QuantityUomcol)) {
                    let sQUOMlist: string[] = objMulti.QuantityUomcol.Split('|');
                    if (sQUOMlist != null && sQUOMlist.length > 0) {
                        objMulti.MCUOMCombo = new ObservableCollection<CListItem>();
                        for (let i: number = 0; i <= sQUOMlist.length - 1; i++) {
                            let stmp: string[] = sQUOMlist[i].Split('~');
                            objMulti.MCUOMCombo.Add(ObjectHelper.CreateObject(new CListItem(), {
                                DisplayText: stmp[1],
                                Value: stmp[0]
                            }));
                        }
                    }
                }
                if (!String.IsNullOrEmpty(objMulti.QuantityUOM)) {
                    objMulti.MCUOMValue = ObjectHelper.CreateObject(new CListItem(), {
                        DisplayText: objMulti.QuantityUOM,
                        Value: objMulti.QuantityUOMOID.ToString()
                    });
                }
                this.GetDefaultQuantityUOM(-1);
                objMulti.MCUomName = objMulti.MCUOMValue.DisplayText;
                if (this.isdefaultUOM) {
                    if (objMulti.MCUOMCombo != null)
                        objMulti.MCUOMCombo.Add(ObjectHelper.CreateObject(new CListItem(), { DisplayText: this.DefaultUOMname, Value: this.DefaultUOMOID }));
                    else {
                        objMulti.MCUOMCombo = new ObservableCollection<CListItem>();
                        objMulti.MCUOMCombo.Add(ObjectHelper.CreateObject(new CListItem(), { DisplayText: this.DefaultUOMname, Value: this.DefaultUOMOID }));
                    }
                    objMulti.MCUOMValue = ObjectHelper.CreateObject(new CListItem(), { DisplayText: this.DefaultUOMname, Value: this.DefaultUOMOID });
                    objMulti.MCUomName = this.DefaultUOMname;
                }
                if (objMulti.MCUOMCombo != null)
                    objMulti.MCUOMCombo.Add(ObjectHelper.CreateObject(new CListItem(), { DisplayText: "More", Value: "CC_More" }));
                else {
                    objMulti.MCUOMCombo = new ObservableCollection<CListItem>();
                    objMulti.MCUOMCombo.Add(ObjectHelper.CreateObject(new CListItem(), { DisplayText: "More", Value: "CC_More" }));
                }
                this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo.Add(objMulti);
                this.oPVM.FormViewerDetails.BasicDetails.DosageFormMoreClicked = false;
                this.MCICommon();
            }
            else {
                for (let ncount: number = 0; ncount < nSelectCnt; ncount++) {
                    selectedValue = ObjectHelper.CreateType<ScriptObject>(returnValue.GetProperty(ncount), ScriptObject);
                    let objMulti: MulticomponentChildVM = new MulticomponentChildVM();
                    let isnonform: string = ObjectHelper.CreateType<string>(selectedValue.GetProperty("IsFormulary"), String);
                    if (isnonform == "1") {
                        objMulti.IsNonFormulary = false;
                    }
                    else objMulti.IsNonFormulary = true;
                    objMulti.ComponentName = ObjectHelper.CreateType<string>(selectedValue.GetProperty("Name"), String);
                    objMulti.IdentifyingType = ObjectHelper.CreateType<string>(selectedValue.GetProperty("Type"), String);
                    objMulti.PrescriptionItemOID = 0;
                    objMulti.Quantity = String.Empty;
                    objMulti.QuantityUOM = String.Empty;
                    objMulti.IdentifyingOID = Number.Parse(ObjectHelper.CreateType<string>(selectedValue.GetProperty("OID"), String));
                    objMulti.isEditable = true;
                    objMulti.isQtyEditable = true;
                    objMulti.isQtyUOMEditable = true;
                    objMulti.IsDisableConflicts = false;
                    objMulti.IsUpto = false;
                    objMulti.QuantityUOMOID = 0;
                    objMulti.PrescribableItemListOID = Number.Parse(ObjectHelper.CreateType<string>(selectedValue.GetProperty("PrescribableItemListOID"), String));
                    objMulti.LorenzoID = ObjectHelper.CreateType<string>(selectedValue.GetProperty("LorenzoID"), String);
                    objMulti.UniqueMCRowID = UniqueID.Next();
                    objMulti.DisplayOrder = UniqueID.Next();
                    objMulti.QuantityUomcol = ObjectHelper.CreateType<string>(selectedValue.GetProperty("MCUOMS"), String);
                    objMulti.VMVPLorenzoID = ObjectHelper.CreateType<string>(returnValue.GetProperty("VMVPLorenzoID"), String);
                    objMulti.VMVPMCIdentifyingName = ObjectHelper.CreateType<string>(returnValue.GetProperty("VMVPMCIdentifyingName"), String);
                    objMulti.Compoentsdrugprop = ObjectHelper.CreateType<string>(selectedValue.GetProperty("MCDrugproperty"), String);
                    if (!String.IsNullOrEmpty(objMulti.VMVPMCIdentifyingName))
                        objMulti.ComponentName = objMulti.VMVPMCIdentifyingName + " - " + objMulti.ComponentName;
                    objMulti.MCUOMValue = new CListItem();
                    let sUomlist: StringBuilder = new StringBuilder();
                    let sProblemName: StringBuilder = new StringBuilder();
                    if (objMulti.QuantityUomcol != null && !String.IsNullOrEmpty(objMulti.QuantityUomcol)) {
                        let sQUOMlist: string[] = objMulti.QuantityUomcol.Split('|');
                        if (sQUOMlist != null && sQUOMlist.length > 0) {
                            objMulti.MCUOMCombo = new ObservableCollection<CListItem>();
                            for (let i: number = 0; i <= sQUOMlist.length - 1; i++) {
                                let stmp: string[] = sQUOMlist[i].Split('~');
                                objMulti.MCUOMCombo.Add(ObjectHelper.CreateObject(new CListItem(), {
                                    DisplayText: stmp[1],
                                    Value: stmp[0]
                                }));
                            }
                        }
                    }
                    if (objMulti.QuantityUOM != null) {
                        objMulti.MCUOMValue = ObjectHelper.CreateObject(new CListItem(), {
                            DisplayText: objMulti.QuantityUOM,
                            Value: objMulti.QuantityUOMOID.ToString()
                        });
                    }
                    objMulti.MCUomName = objMulti.MCUOMValue.DisplayText;
                    this.GetDefaultQuantityUOM(-1);
                    if (this.isdefaultUOM) {
                        if (objMulti.MCUOMCombo != null)
                            objMulti.MCUOMCombo.Add(ObjectHelper.CreateObject(new CListItem(), { DisplayText: this.DefaultUOMname, Value: this.DefaultUOMOID }));
                        else {
                            objMulti.MCUOMCombo = new ObservableCollection<CListItem>();
                            objMulti.MCUOMCombo.Add(ObjectHelper.CreateObject(new CListItem(), { DisplayText: this.DefaultUOMname, Value: this.DefaultUOMOID }));
                        }
                        objMulti.MCUOMValue = ObjectHelper.CreateObject(new CListItem(), { DisplayText: this.DefaultUOMname, Value: this.DefaultUOMOID });
                        objMulti.MCUomName = this.DefaultUOMname;
                    }
                    if (objMulti.MCUOMCombo != null)
                        objMulti.MCUOMCombo.Add(ObjectHelper.CreateObject(new CListItem(), { DisplayText: "More", Value: "CC_More" }));
                    else {
                        objMulti.MCUOMCombo = new ObservableCollection<CListItem>();
                        objMulti.MCUOMCombo.Add(ObjectHelper.CreateObject(new CListItem(), { DisplayText: "More", Value: "CC_More" }));
                    }
                    this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo.Add(objMulti);
                    this.oPVM.FormViewerDetails.BasicDetails.DosageFormMoreClicked = false;
                    this.MCICommon();
                }
            }
            this.oPVM.GetMCConflictImageStatus();
            this.oPVM.MCIGridchange = true;
            if (this.oPVM.FormViewerDetails.MulticomponentDetails != null && this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo != null) {
                let MCAuthorizeCount = this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo.Where(s => s.IsMCAuthorize).ToList().Count;
                if (this.omedFormViewer == null) {
                    this.omedFormViewer = CommonBB.FindParent<medFormViewer>(this);
                }
                if (this.omedFormViewer != null) {
                    if (MCAuthorizeCount > 0 && String.Equals(PatientContext.PrescriptionType, PrescriptionTypes.ForAdministration, StringComparison.OrdinalIgnoreCase) && PatientContext.ClerkFormViewDefaultBehavior != ClerkFormViewDeftBehaviour.LaunchFormMandatory) {
                        this.oTechValTab = this.omedFormViewer.ftbFormViewDetails.GetItem("frmTech");
                        if (this.oTechValTab != null)
                            this.oTechValTab.IsEnabled = false;
                        this.oRecordAdminTab = this.omedFormViewer.ftbFormViewDetails.GetItem("frmRecordAdmin");
                        if (this.oRecordAdminTab != null)
                            this.oRecordAdminTab.IsEnabled = false;
                    }
                    else {
                        this.oTechValTab = this.omedFormViewer.ftbFormViewDetails.GetItem("frmTech");
                        if (this.oTechValTab != null)
                            this.oTechValTab.IsEnabled = true;
                    }
                }
            }
        }
    }
    cmdRemove_Click(sender: Object, e: RoutedEventArgs): void {
        this.oPVM.GetMCFormviewcloseflag();
        let RemoveIndecies: number[] = this.grdmulticomponent.GetSelectedRowsIndexByOrder();
        if (RemoveIndecies != null) {
            let nLen: number = RemoveIndecies.length;
            for (let i: number = nLen; i > 0; i--) {
                this.grdmulticomponent.DeleteRow(this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo[RemoveIndecies[i - 1]]);
            }
            this.oPVM.FormViewerDetails.BasicDetails.DosageFormMoreClicked = false;
            this.cboDosageFormMC.Focus();
        }
        this.isdefaultUOM = false;
        this.oPVM.isAdhocitem = true;
        this.oPVM.FormViewerDetails.BasicDetails.isAdhocitem = true;
        this.oPVM.AllergenCheck = false;
        this.oPVM.FormViewerDetails.BasicDetails.IsAllowMultiRoute = false;
        this.oPVM.FormViewerDetails.BasicDetails.IdentifyingOID = CommonFlags.MCidentifyingOID;
        this.oPVM.FormViewerDetails.BasicDetails.itemSubType = CommonFlags.MCsubtype;
        this.oPVM.LorenzoID = CommonFlags.MClorenzoid;
        if (this.oPVM.ActionCode != ActivityTypes.Amend) {
            this.oPVM.GenerateConflictsForInpatient(this.oPVM.objItems);
        }
        if (this.oPVM != null && this.oPVM.FormViewerDetails.BasicDetails.isAdhocitem == true) {
            this.oPVM.GetMcchilditem();
            if (!String.IsNullOrEmpty(this.oPVM.Itemlist)) {
                this.oPVM.FormViewerDetails.BasicDetails.bIsMCIrule = true;
                this.oPVM.FormViewerDetails.BasicDetails.GetAdhocMCIFormDefaults(this.oPVM.Itemlist, String.Empty, String.Empty, this.oPVM.FormViewerDetails.BasicDetails.MCVersion, "DOSAGEFORM", this.oPVM.MCuptoIdentifyingoid, this.oPVM.MCuptoIdentifyingtype);
                if (this.oPVM.FormViewerDetails.BasicDetails.ConditionalDosingDetails != null) {
                    if (this.oPVM.FormViewerDetails.BasicDetails.DoseType != null && this.oPVM.FormViewerDetails.BasicDetails.DoseType.Value == DoseTypeCode.CONDITIONAL)
                        this.oPVM.FormViewerDetails.BasicDetails.DoseType = ObjectHelper.CreateObject(new CListItem(), { DisplayText: "Normal", Value: DoseTypeCode.NORMAL });
                    let lnIdentifyingOID: number = this.oPVM.FormViewerDetails.BasicDetails.IdentifyingOID;
                    let sIdentifyingType: string = this.oPVM.FormViewerDetails.BasicDetails.IdentifyingType;
                    let sMCVersion: string = String.IsNullOrEmpty(this.oPVM.FormViewerDetails.BasicDetails.MCVersion) ? AppSessionInfo.AMCV : this.oPVM.FormViewerDetails.BasicDetails.MCVersion;
                    let sitemsubtype: string = this.oPVM.FormViewerDetails.BasicDetails.itemSubType;
                    let smcitemname: string = this.oPVM.FormViewerDetails.BasicDetails.mCIItemDisplay;
                    let lnprescriptionitemoid: number = this.oPVM.PrescriptionItemOID;
                    let sMClorenzoid: string = this.oPVM.LorenzoID;
                    let mcitemlist: string = this.oPVM.Itemlist;
                    let sAction: ActivityTypes = this.oPVM.ActionCode;
                    let IsOrdersetPrescribing: boolean = false;
                    if (this.oPVM.FormViewerDetails.BasicDetails != null && this.oPVM.FormViewerDetails.BasicDetails.Ordersets != null) {
                        IsOrdersetPrescribing = true;
                    }
                    this.oPVM.FormViewerDetails.BasicDetails.ConditionalDosingDetails = new ConditionalDosingVM(lnIdentifyingOID, sIdentifyingType, sMCVersion, sitemsubtype, smcitemname, lnprescriptionitemoid, sMClorenzoid, mcitemlist, sAction, IsOrdersetPrescribing);
                }
            }
            else {
                if (this.oPVM.FormViewerDetails.BasicDetails.DosageForm != null) {
                    this.oPVM.FormViewerDetails.BasicDetails.DosageForm.Tag = "MCR";
                }
                this.oPVM.FormViewerDetails.BasicDetails.DosageForm = null;
                this.oPVM.FormViewerDetails.BasicDetails.DefaultDetails.Forms = null;
                if (this.oPVM.FormViewerDetails.BasicDetails.DefaultDetails.Forms == null) {
                    this.oPVM.FormViewerDetails.BasicDetails.DefaultDetails.Forms = new ObservableCollection<CListItem>();
                    this.oPVM.FormViewerDetails.BasicDetails.DefaultDetails.Forms.Add(ObjectHelper.CreateObject(new CListItem(), {
                        DisplayText: "More",
                        Value: "CC_More"
                    }));
                }
                this.oPVM.FormViewerDetails.BasicDetails.Route = null;
                this.oPVM.FormViewerDetails.BasicDetails.DefaultDetails.Routes = null;
                this.oPVM.FormViewerDetails.BasicDetails.Site = null;
                this.oPVM.FormViewerDetails.BasicDetails.DefaultDetails.Sites = null;
                this.oPVM.FormViewerDetails.BasicDetails.DoseUOM = null;
                this.oPVM.FormViewerDetails.BasicDetails.DefaultDetails.Uoms = null;
            }
            this.ChangeAdHocSettings();
        }
        this.oPVM.FormViewerDetails.BasicDetails.IdentifyingOID = CommonFlags.MCidentifyingOID;
        this.oPVM.FormViewerDetails.BasicDetails.itemSubType = CommonFlags.MCsubtype;
        this.cmdRemove.IsEnabled = false;
        this.oPVM.MCIGridchange = true;
        this.oPVM.IsControlledDrug = '0';
        if (this.oPVM.FormViewerDetails.MulticomponentDetails != null && this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo != null) {
            let MCAuthorizeCount = this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo.Where(s => s.IsMCAuthorize).ToList().Count;
            if (this.omedFormViewer == null) {
                this.omedFormViewer = CommonBB.FindParent<medFormViewer>(this);
            }
            if (this.omedFormViewer != null) {
                if (MCAuthorizeCount > 0 && String.Equals(PatientContext.PrescriptionType, PrescriptionTypes.ForAdministration, StringComparison.OrdinalIgnoreCase) && PatientContext.ClerkFormViewDefaultBehavior != ClerkFormViewDeftBehaviour.LaunchFormMandatory) {
                    this.oTechValTab = this.omedFormViewer.ftbFormViewDetails.GetItem("frmTech");
                    if (this.oTechValTab != null)
                        this.oTechValTab.IsEnabled = false;
                    this.oRecordAdminTab = this.omedFormViewer.ftbFormViewDetails.GetItem("frmRecordAdmin");
                    if (this.oRecordAdminTab != null)
                        this.oRecordAdminTab.IsEnabled = false;
                }
                else {
                    this.oTechValTab = this.omedFormViewer.ftbFormViewDetails.GetItem("frmTech");
                    if (this.oTechValTab != null)
                        this.oTechValTab.IsEnabled = true;
                }
            }
        }
        this.grdmulticomponent.UnselectAll();
    }
    cboDosageForm_SelectionChanged(sender: Object, e: SelectionChangedEventArgs): void {

        if (this.oPVM != null && this.oPVM.FormViewerDetails.BasicDetails.DosageForm != null) {
            this.oPVM.GetMcchilditem();
            if (!String.IsNullOrEmpty(this.oPVM.Itemlist) && e.sourceComponent == undefined) {
                this.oPVM.FormViewerDetails.BasicDetails.bIsMCIrule = true;
                this.oPVM.FormViewerDetails.BasicDetails.GetAdhocMCIFormDefaults(this.oPVM.Itemlist, String.Empty, this.oPVM.FormViewerDetails.BasicDetails.DosageForm.Value, this.oPVM.FormViewerDetails.BasicDetails.MCVersion, FormDefaults.ALL.ToString(), this.oPVM.MCuptoIdentifyingoid, this.oPVM.MCuptoIdentifyingtype);
            }
        }
    }
    private MCICommon(): void {
        let count: number = 0;
        let nCount: number = 0;
        for (let rcount: number = 0; rcount < this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo.Count; rcount++) {
            if (this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo[rcount].IsUpto == true) {
                count = rcount;
                nCount = 1;
                break;
            }
        }
        if (nCount > 0) {
            let objMulti: MulticomponentChildVM = new MulticomponentChildVM();
            objMulti.ComponentName = this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo[count].ComponentName;
            objMulti.ConflictsExist = this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo[count].ConflictsExist;
            objMulti.ActionCode = this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo[count].ActionCode;
            objMulti.IdentifyingOID = this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo[count].IdentifyingOID;
            objMulti.IdentifyingType = this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo[count].IdentifyingType;
            objMulti.isEditable = this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo[count].isEditable;
            objMulti.isQtyEditable = this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo[count].isQtyEditable;
            objMulti.isQtyUOMEditable = this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo[count].isQtyUOMEditable;
            objMulti.IsUpto = this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo[count].IsUpto;
            objMulti.LastModifiedAt = this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo[count].LastModifiedAt;
            objMulti.LorenzoID = this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo[count].LorenzoID;
            objMulti.MCQuantity = this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo[count].MCQuantity;
            objMulti.MCUOMCombo = this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo[count].MCUOMCombo;
            objMulti.VMVPLorenzoID = this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo[count].VMVPLorenzoID;
            objMulti.MCUomName = this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo[count].MCUomName;
            objMulti.MCUOMValue = this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo[count].MCUOMValue;
            objMulti.Nonformularyreason = this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo[count].Nonformularyreason;
            objMulti.OID = this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo[count].OID;
            objMulti.OperationMode = this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo[count].OperationMode;
            objMulti.OtherNonformularyreason = this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo[count].OtherNonformularyreason;
            objMulti.PrescribableItemListOID = this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo[count].PrescribableItemListOID;
            objMulti.PrescriptionItemOID = this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo[count].PrescriptionItemOID;
            objMulti.Quantity = this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo[count].Quantity;
            objMulti.QuantityUOM = this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo[count].QuantityUOM;
            objMulti.QuantityUomcol = this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo[count].QuantityUomcol;
            objMulti.QuantityUOMOID = this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo[count].QuantityUOMOID;
            objMulti.QuantityUOMs = this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo[count].QuantityUOMs;
            objMulti.SealImage = this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo[count].SealImage;
            objMulti.UniqueMCRowID = this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo[count].UniqueMCRowID;
            objMulti.DisplayOrder = this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo[count].DisplayOrder;
            objMulti.Compoentsdrugprop = this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo[count].Compoentsdrugprop;
            objMulti.IsNonFormulary = this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo[count].IsNonFormulary;
            this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo.RemoveAt(count);
            this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo.Add(objMulti);
            this.grdmulticomponent.Rebind();
        }
        this.oPVM.isAdhocitem = this.oPVM.FormViewerDetails.BasicDetails.isAdhocitem = true;
        this.oPVM.FormViewerDetails.BasicDetails.IdentifyingOID = CommonFlags.MCidentifyingOID;
        this.oPVM.FormViewerDetails.BasicDetails.itemSubType = CommonFlags.MCsubtype;
        this.oPVM.LorenzoID = CommonFlags.MClorenzoid;
        this.oPVM.isAdhocitem = true;
        this.oPVM.FormViewerDetails.BasicDetails.isAdhocitem = true;
        this.oPVM.AllergenCheck = false;
        this.oPVM.FormViewerDetails.BasicDetails.IsAllowMultiRoute = false;
        if (this.oPVM.ActionCode != ActivityTypes.Amend) {
            this.oPVM.GenerateConflictsForInpatient(this.oPVM.objItems);
        }
        if (this.oPVM != null && this.oPVM.FormViewerDetails.BasicDetails.isAdhocitem == true) {
            this.oPVM.GetMcchilditem();
            if (!String.IsNullOrEmpty(this.oPVM.Itemlist)) {
                this.oPVM.FormViewerDetails.BasicDetails.bIsMCIrule = true;
                this.oPVM.FormViewerDetails.BasicDetails.GetAdhocMCIFormDefaults(this.oPVM.Itemlist, String.Empty, String.Empty, this.oPVM.FormViewerDetails.BasicDetails.MCVersion, "DOSAGEFORM", this.oPVM.MCuptoIdentifyingoid, this.oPVM.MCuptoIdentifyingtype);
                if (this.oPVM.FormViewerDetails.BasicDetails.ConditionalDosingDetails != null) {
                    if (this.oPVM.FormViewerDetails.BasicDetails.DoseType != null && this.oPVM.FormViewerDetails.BasicDetails.DoseType.Value == DoseTypeCode.CONDITIONAL)
                        this.oPVM.FormViewerDetails.BasicDetails.DoseType = ObjectHelper.CreateObject(new CListItem(), { DisplayText: "Normal", Value: DoseTypeCode.NORMAL });
                    let lnIdentifyingOID: number = this.oPVM.FormViewerDetails.BasicDetails.IdentifyingOID;
                    let sIdentifyingType: string = this.oPVM.FormViewerDetails.BasicDetails.IdentifyingType;
                    let sMCVersion: string = String.IsNullOrEmpty(this.oPVM.FormViewerDetails.BasicDetails.MCVersion) ? AppSessionInfo.AMCV : this.oPVM.FormViewerDetails.BasicDetails.MCVersion;
                    let sitemsubtype: string = this.oPVM.FormViewerDetails.BasicDetails.itemSubType;
                    let smcitemname: string = this.oPVM.FormViewerDetails.BasicDetails.mCIItemDisplay;
                    let lnprescriptionitemoid: number = this.oPVM.PrescriptionItemOID;
                    let sMClorenzoid: string = this.oPVM.LorenzoID;
                    let mcitemlist: string = this.oPVM.Itemlist;
                    let sAction: ActivityTypes = this.oPVM.ActionCode;
                    let IsOrdersetPrescribing: boolean = false;
                    if (this.oPVM.FormViewerDetails.BasicDetails != null && this.oPVM.FormViewerDetails.BasicDetails.Ordersets != null) {
                        IsOrdersetPrescribing = true;
                    }
                    this.oPVM.FormViewerDetails.BasicDetails.ConditionalDosingDetails = new ConditionalDosingVM(lnIdentifyingOID, sIdentifyingType, sMCVersion, sitemsubtype, smcitemname, lnprescriptionitemoid, sMClorenzoid, mcitemlist, sAction, IsOrdersetPrescribing);
                }
            }
        }
    }
    private GetDefaultQuantityUOM(rowindex: number): void {
        for (let rcount: number = 0; rcount < this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo.Count; rcount++) {
            if (this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo[rcount].IsUpto == false) {
                if (rcount != rowindex) {
                    if (this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo[rcount].MCUomName == "%") {
                        this.isdefaultUOM = true;
                        if (this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo[rcount].MCUOMValue != null) {
                            this.DefaultUOMOID = this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo[rcount].MCUOMValue.Value;
                            this.DefaultUOMname = this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo[rcount].MCUOMValue.DisplayText;
                        }
                    }
                    else {
                        this.isdefaultUOM = false;
                        break;
                    }
                }
            }
        }
    }
    async images_MouseLeftButtonDown(sender: Object, e: MouseButtonEventArgs) {
        Object.keys(that).forEach((prop) => (this[prop] = that[prop]));
        if ((this.oPVM.FormViewerDetails.MulticomponentDetails != null && this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo.Count > 0 && this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo[0].isEditable == true) || this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo.Count == 0) {
            this.oPVM.GetMCFormviewcloseflag();
            let oParam: string[] = new Array(5);
            oParam[0] = AppSessionInfo.AMCV;
            oParam[1] = String.Empty;
            oParam[2] = "0";
            oParam[3] = "1";
            oParam[4] = !String.IsNullOrEmpty(this.oPVM.ParentbaseVM.sTeamOIDs) ? this.oPVM.ParentbaseVM.sTeamOIDs : String.Empty;
            // let returnValue: ScriptObject = ObjectHelper.CreateType<ScriptObject>(HtmlPage.Window.Invoke("Powersearchsfs", oParam),ScriptObject);
            let returnValue = await HtmlPage.Window.InvokeAsync("Powersearchsfs", ...oParam);
            if (returnValue != null && returnValue.GetProperty("length") != null) {
                let nSelectCnt: number = Convert.ToInt32(returnValue.GetProperty("length"));
                if (nSelectCnt == 0) {
                    let Indices: number[] = this.grdmulticomponent.GetSelectedRowsIndexByOrder();
                    if (Indices != null) {
                        let nLen: number = Indices.length;
                        for (let i: number = nLen; i > 0; i--) {
                            let isnonform: string = ObjectHelper.CreateType<string>(returnValue.GetProperty("IsFormulary"), String);
                            if (isnonform == "1") {
                                this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo[Indices[i - 1]].IsNonFormulary = false;
                            }
                            else this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo[Indices[i - 1]].IsNonFormulary = true;
                            this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo[Indices[i - 1]].ComponentName = ObjectHelper.CreateType<string>(returnValue.GetProperty("Name"), String);
                            this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo[Indices[i - 1]].IdentifyingType = ObjectHelper.CreateType<string>(returnValue.GetProperty("Type"), String);
                            this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo[Indices[i - 1]].PrescriptionItemOID = 0;
                            this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo[Indices[i - 1]].Quantity = String.Empty;
                            this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo[Indices[i - 1]].QuantityUOM = String.Empty;
                            this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo[Indices[i - 1]].IdentifyingOID = Number.Parse(ObjectHelper.CreateType<string>(returnValue.GetProperty("OID"), String));
                            this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo[Indices[i - 1]].isEditable = true;
                            this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo[Indices[i - 1]].isQtyEditable = true;
                            this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo[Indices[i - 1]].isQtyUOMEditable = true;
                            this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo[Indices[i - 1]].QuantityUOMOID = 0;
                            this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo[Indices[i - 1]].PrescribableItemListOID = Number.Parse(ObjectHelper.CreateType<string>(returnValue.GetProperty("PrescribableItemListOID"), String));
                            this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo[Indices[i - 1]].LorenzoID = ObjectHelper.CreateType<string>(returnValue.GetProperty("LorenzoID"), String);
                            this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo[Indices[i - 1]].QuantityUomcol = ObjectHelper.CreateType<string>(returnValue.GetProperty("MCUOMS"), String);
                            this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo[Indices[i - 1]].Compoentsdrugprop = ObjectHelper.CreateType<string>(returnValue.GetProperty("MCDrugproperty"), String);
                            this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo[Indices[i - 1]].MCUOMValue = new CListItem();
                            let sUomlist: StringBuilder = new StringBuilder();
                            let sProblemName: StringBuilder = new StringBuilder();
                            if (this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo[Indices[i - 1]].QuantityUomcol != null && !String.IsNullOrEmpty(this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo[Indices[i - 1]].QuantityUomcol)) {
                                let sQUOMlist: string[] = this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo[Indices[i - 1]].QuantityUomcol.Split('|');
                                if (sQUOMlist != null && sQUOMlist.length > 0) {
                                    this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo[Indices[i - 1]].MCUOMCombo = new ObservableCollection<CListItem>();
                                    for (let j: number = 0; j <= sQUOMlist.length - 1; j++) {
                                        let stmp: string[] = sQUOMlist[j].Split('~');
                                        this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo[Indices[i - 1]].MCUOMCombo.Add(ObjectHelper.CreateObject(new CListItem(), {
                                            DisplayText: stmp[1],
                                            Value: stmp[0]
                                        }));
                                    }
                                }
                            }
                            if (this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo[Indices[i - 1]].QuantityUOM != null) {
                                this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo[Indices[i - 1]].MCUOMValue = ObjectHelper.CreateObject(new CListItem(), {
                                    DisplayText: this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo[Indices[i - 1]].QuantityUOM,
                                    Value: this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo[Indices[i - 1]].QuantityUOMOID.ToString()
                                });
                            }
                            this.GetDefaultQuantityUOM(Indices[i - 1]);
                            this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo[Indices[i - 1]].MCUomName = this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo[Indices[i - 1]].MCUOMValue.DisplayText;
                            if (this.isdefaultUOM) {
                                if (this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo[Indices[i - 1]].MCUOMCombo != null)
                                    this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo[Indices[i - 1]].MCUOMCombo.Add(ObjectHelper.CreateObject(new CListItem(), { DisplayText: this.DefaultUOMname, Value: this.DefaultUOMOID }));
                                else {
                                    this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo[Indices[i - 1]].MCUOMCombo = new ObservableCollection<CListItem>();
                                    this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo[Indices[i - 1]].MCUOMCombo.Add(ObjectHelper.CreateObject(new CListItem(), { DisplayText: this.DefaultUOMname, Value: this.DefaultUOMOID }));
                                }
                                this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo[Indices[i - 1]].MCUOMValue = ObjectHelper.CreateObject(new CListItem(), { DisplayText: this.DefaultUOMname, Value: this.DefaultUOMOID });
                                this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo[Indices[i - 1]].MCUomName = this.DefaultUOMname;
                            }
                            if (this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo[Indices[i - 1]].MCUOMCombo != null) {
                                let ncount: number = this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo[Indices[i - 1]].MCUOMCombo.Count;
                                if (ncount > 0 && this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo[Indices[i - 1]].MCUOMCombo != null && !this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo[Indices[i - 1]].MCUOMCombo[ncount - 1].DisplayText.Contains("More"))
                                    this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo[Indices[i - 1]].MCUOMCombo.Add(ObjectHelper.CreateObject(new CListItem(), { DisplayText: "More", Value: "CC_More" }));
                                else if (ncount == 0 && this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo[Indices[i - 1]].MCUOMCombo != null)
                                    this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo[Indices[i - 1]].MCUOMCombo.Add(ObjectHelper.CreateObject(new CListItem(), { DisplayText: "More", Value: "CC_More" }));
                            }
                            else {
                                this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo[Indices[i - 1]].MCUOMCombo = new ObservableCollection<CListItem>();
                                this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo[Indices[i - 1]].MCUOMCombo.Add(ObjectHelper.CreateObject(new CListItem(), { DisplayText: "More", Value: "CC_More" }));
                            }
                            if (this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo[Indices[i - 1]].IsUpto == true) {
                                this.oPVM.MCuptoIdentifyingoid = Number.Parse(ObjectHelper.CreateType<string>(returnValue.GetProperty("OID"), String));
                                this.oPVM.MCuptoIdentifyingtype = ObjectHelper.CreateType<string>(returnValue.GetProperty("Type"), String);
                                if (this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo[Indices[i - 1]].MCUomName == "%") {
                                    this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo[Indices[i - 1]].MCUomName = null;
                                    this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo[Indices[i - 1]].MCUOMValue = null;
                                }
                            }
                            if (String.Equals(PatientContext.PrescriptionType, PrescriptionTypes.ForAdministration, StringComparison.OrdinalIgnoreCase) && PatientContext.ClerkFormViewDefaultBehavior != ClerkFormViewDeftBehaviour.LaunchFormMandatory && !String.IsNullOrEmpty(this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo[Indices[i - 1]].IdentifyingType) && !String.IsNullOrEmpty(this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo[Indices[i - 1]].LorenzoID) && !String.IsNullOrEmpty(AppSessionInfo.AMCV)) {
                                let oParams: string[] = new Array(3);
                                oParams[0] = this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo[Indices[i - 1]].IdentifyingType;
                                oParams[1] = this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo[Indices[i - 1]].LorenzoID;
                                oParams[2] = AppSessionInfo.AMCV;
                                let MCAuthorise: string = ObjectHelper.CreateType<string>(HtmlPage.Window.Invoke("GetIsItemAuthorise", oParams), String);
                                if (!String.IsNullOrEmpty(MCAuthorise)) {
                                    this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo[Indices[i - 1]].IsMCAuthorize = (String.Compare(MCAuthorise, "1") == 0) ? true : false;
                                }
                            }
                        }
                    }
                    this.oPVM.isAdhocitem = true;
                    this.oPVM.FormViewerDetails.BasicDetails.isAdhocitem = true;
                    this.oPVM.FormViewerDetails.BasicDetails.IsAllowMultiRoute = false;
                    if (this.oPVM != null && this.oPVM.FormViewerDetails.BasicDetails.isAdhocitem == true) {
                        this.oPVM.GetMcchilditem();
                        if (!String.IsNullOrEmpty(this.oPVM.Itemlist)) {
                            this.oPVM.FormViewerDetails.BasicDetails.bIsMCIrule = true;
                            if (this.oPVM.FormViewerDetails.BasicDetails != null && this.oPVM.FormViewerDetails.BasicDetails.Route != null && this.oPVM.FormViewerDetails.BasicDetails.Route.Value != null) {
                                this.oPVM.FormViewerDetails.BasicDetails.GetAdhocMCIFormDefaults(this.oPVM.Itemlist, this.oPVM.FormViewerDetails.BasicDetails.Route.Value, String.Empty, this.oPVM.FormViewerDetails.BasicDetails.MCVersion, "DOSAGEFORM", this.oPVM.MCuptoIdentifyingoid, this.oPVM.MCuptoIdentifyingtype);
                            }
                            else {
                                this.oPVM.FormViewerDetails.BasicDetails.GetAdhocMCIFormDefaults(this.oPVM.Itemlist, String.Empty, String.Empty, this.oPVM.FormViewerDetails.BasicDetails.MCVersion, "DOSAGEFORM", this.oPVM.MCuptoIdentifyingoid, this.oPVM.MCuptoIdentifyingtype);
                            }
                            if (this.oPVM.FormViewerDetails.BasicDetails.ConditionalDosingDetails != null) {
                                if (this.oPVM.FormViewerDetails.BasicDetails.DoseType != null && this.oPVM.FormViewerDetails.BasicDetails.DoseType.Value == DoseTypeCode.CONDITIONAL)
                                    this.oPVM.FormViewerDetails.BasicDetails.DoseType = ObjectHelper.CreateObject(new CListItem(), { DisplayText: "Normal", Value: DoseTypeCode.NORMAL });
                                let lnIdentifyingOID: number = this.oPVM.FormViewerDetails.BasicDetails.IdentifyingOID;
                                let sIdentifyingType: string = this.oPVM.FormViewerDetails.BasicDetails.IdentifyingType;
                                let sMCVersion: string = String.IsNullOrEmpty(this.oPVM.FormViewerDetails.BasicDetails.MCVersion) ? AppSessionInfo.AMCV : this.oPVM.FormViewerDetails.BasicDetails.MCVersion;
                                let sitemsubtype: string = this.oPVM.FormViewerDetails.BasicDetails.itemSubType;
                                let smcitemname: string = this.oPVM.FormViewerDetails.BasicDetails.mCIItemDisplay;
                                let lnprescriptionitemoid: number = this.oPVM.PrescriptionItemOID;
                                let sMClorenzoid: string = this.oPVM.LorenzoID;
                                let mcitemlist: string = this.oPVM.Itemlist;
                                let sAction: ActivityTypes = this.oPVM.ActionCode;
                                let IsOrdersetPrescribing: boolean = false;
                                if (this.oPVM.FormViewerDetails.BasicDetails != null && this.oPVM.FormViewerDetails.BasicDetails.Ordersets != null) {
                                    IsOrdersetPrescribing = true;
                                }
                                this.oPVM.FormViewerDetails.BasicDetails.ConditionalDosingDetails = new ConditionalDosingVM(lnIdentifyingOID, sIdentifyingType, sMCVersion, sitemsubtype, smcitemname, lnprescriptionitemoid, sMClorenzoid, mcitemlist, sAction, IsOrdersetPrescribing);
                            }
                        }
                    }
                }
                if (this.oPVM.ActionCode != ActivityTypes.Amend) {
                    this.oPVM.GenerateConflictsForInpatient(this.oPVM.objItems);
                }
                this.oPVM.GetMCConflictImageStatus();
                this.oPVM.isAdhocitem = true;
                this.oPVM.FormViewerDetails.BasicDetails.isAdhocitem = true;
                this.oPVM.AllergenCheck = false;
                this.oPVM.FormViewerDetails.BasicDetails.IsAllowMultiRoute = false;
                this.oPVM.FormViewerDetails.BasicDetails.IdentifyingOID = CommonFlags.MCidentifyingOID;
                this.oPVM.FormViewerDetails.BasicDetails.itemSubType = CommonFlags.MCsubtype;
                this.oPVM.LorenzoID = CommonFlags.MClorenzoid;
                this.oPVM.MCIGridchange = true;
                this.oPVM.IsControlledDrug = '0';
            }
            //  this.ChangeAdHocSettings();
        }
    }
    public ChangeAdHocSettings(): void {
        if (this.oPVM.isAdhocitem == true) {
            if (this.oPVM.FormViewerDetails.MulticomponentDetails != null && this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo.Count > 0) {
                for (let i: number = 0; i < this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo.Count; i++) {
                    this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo[i].IsDisableConflicts = false;
                }
            }
        }
    }
    RetainGridRowSelection() {
        let SelectedRow;
        this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo.forEach((item) => {
            if (item['SelectedRowIndex'] != -1) {
                SelectedRow = item['SelectedRowIndex']
            }
        })
        if (SelectedRow != undefined) {
            this.grdmulticomponent.selectedRowsIndex = [SelectedRow];
            let e: SelectionChangeEventArgs = {};
            let addedItems: List = new List();
            addedItems.Add(this.oPVM.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo[SelectedRow]);
            e.AddedItems = addedItems;
            this.grdmulticomponent_SelectionChanged({}, e);

        }
    }
}
