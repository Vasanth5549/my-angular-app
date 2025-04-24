import { AfterViewInit, Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { StringBuilder, ProfileFactoryType, ContextManager, Convert, AppActivity, AppActivityBB } from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp, Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison, AppDialogEventargs, AppDialogResult, DelegateArgs, DialogComponentArgs, WindowButtonType, IEnumerable, List } from 'epma-platform/models';
import { AppDialog, Border, DataTemplate, FrameworkElement, Grid, GridLength, MouseButtonEventArgs, SolidColorBrush, iCheckBox, iComboBox } from 'epma-platform/controls';
import { HelperService } from 'epma-platform/soapclient';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
import { MedRequestVM, MedicationRequestVM } from 'src/app/lorappmedicationadminbbui/viewmodel/MedicationRequestVM';
import { GridExtension, GridViewCellBase, GridViewCellClickEventArgs, GridViewRow, RowEventArgs, RowLoadedEventArgs, SelectionChangeEventArgs } from 'src/app/shared/epma-platform/controls/epma-grid-helpers/grid-extension';
import { MedicationCommonProfileData } from 'src/app/lorappmedicationcommonbb/utilities/profiledata';
import { MedChartData } from 'src/app/lorappmedicationadminbbui/utilities/globalvariable';
import { CConstants } from 'src/app/lorappmedicationadminbbui/utilities/CConstants';
import { RoutedEventArgs } from 'src/app/shared/epma-platform/controls/FrameworkElement';
import { HtmlPage } from 'src/app/shared/epma-platform/services/ContextCollection.service';
import { GridComponent, RowArgs, RowClassArgs } from '@progress/kendo-angular-grid';
import { medddetailsChild } from 'src/app/lorappmedicationcommonbb/child/medddetailschild';
import { Resource } from '../resource';
import { DisplayPrescriptionLineMedsItemPipe, FalseToVisibilityConverterPipe, MCItemDisplayMedsItemPipe, StatusIconPipe, TypeIconPipe } from 'src/app/lorarcbluebirdmedicationchart/converter/MedChartConverter.pipe';

var that;

@Component({
    selector: 'MedRequestCA',
    templateUrl: './MedRequestCA.html',
    styleUrls: ['./MedRequestCA.css']
  })


export class MedRequestCA extends AppActivityBB implements AfterViewInit,OnInit {
    ChildWidth: number = 0;
    LastMCIChild: number = 0;
    public IsPRN: boolean = false;
    public oMedReqVM: MedicationRequestVM;
    public oMedReqMCIChildVM : MedRequestVM;
    public oMedicationRequest = Resource.MedicationRequest;
    MedAdminLineDisplay:  DisplayPrescriptionLineMedsItemPipe;
    TypeIconKey: TypeIconPipe;
    StatusIconKey: StatusIconPipe;
    FalseToVisibleConvert:FalseToVisibilityConverterPipe;
    MedMCItemDisplay: MCItemDisplayMedsItemPipe;

    private LayoutRoot: Grid =new Grid();
    @ViewChild("LayoutRootTempRef", { read: Grid, static: false }) set _LayoutRoot(c: Grid) {
        if (c) { this.LayoutRoot = c; }
    };
    private border: Border;
    @ViewChild("borderTempRef", { read: Border, static: false }) set _border(c: Border) {
        if (c) { this.border = c; }
    };
    private GrdMain: Grid;
    @ViewChild("GrdMainTempRef", { read: Grid, static: false }) set _GrdMain(c: Grid) {
        if (c) { this.GrdMain = c; }
    };
    private cboUrgency: iComboBox;
    @ViewChild('cboUrgencyTempRef', { read: iComboBox, static: false }) set _cboUrgency(c: iComboBox) {
      if (c) {
        this.cboUrgency = c;
      }
    }
    public chkUrgencyLevelPa: iCheckBox;
    @ViewChild('chkUrgencyLevelParentTempRef', { read: iCheckBox, static: false }) set _chkUrgencyLevelPa(c: iCheckBox) {
        if (c) {
            this.chkUrgencyLevelPa = c;
        }
    }

    public grdRequestMedication: GridExtension = new GridExtension();
    @ViewChild("grdRequestMedicationTempRef", { read: GridComponent, static: false }) set _grdRequestMedication(c: GridComponent) {
        if (c) { 
            this.grdRequestMedication.grid = c;
            this.grdRequestMedication.columns = c.columns;
        }
    };

    dataTemplates: QueryList<DataTemplate>;
    @ViewChildren("medRequestDataTemplate", { read: DataTemplate }) set _dataTemplates(v: QueryList<DataTemplate>) {
        if (v) {
            this.dataTemplates = v;
            // this.grdRequestMedication.dataTemplates = v;

        }
    }

    public grdReqMedMCIChld: GridExtension = new GridExtension();
    childGridRefCollection: QueryList<GridComponent>;
    @ViewChildren('grdReqMedMCIChldTempRef', { read: GridComponent }) set _grdReqMedMCIChldTempRef(v: QueryList<GridComponent>) {
        if (v) {
          this.childGridRefCollection = v;
        }
    }

    childDataTemplates: QueryList<DataTemplate>;
    @ViewChildren('grdReqMedMCIChldDTTempRef', { read: DataTemplate }) set _childDataTemplates(v: QueryList<DataTemplate>) {
        if (v) {
            this.childDataTemplates = v;
            this.grdRequestMedication.ChildDataTemplateCollection = v;
        }
    }
       
    constructor() {
        super();
        //  InitializeComponent();
        that = this;
    }

    ngOnInit() {
        this.grdRequestMedication.RowExpandedChanged = (s, e) => { this.grdRequestMedication_RowIsExpandedChanged(s, e)};
    }

    QueryListCollection: any[] = [];
    ngAfterViewInit(): void {
        this.grdRequestMedication.GenerateColumns();

        this.MedRequestCA_Loaded(null, null);
        if (this.oMedReqVM != null) {
            this.oMedReqVM.PropertyChanged = (s, e) => {
                if (e.PropertyName == 'MedRequestlist') {
                    this.SetParentChildGridData();
                }
            }
        }
    }

    private SetParentChildGridData() {
        this.grdRequestMedication.SetBinding('data', this.oMedReqVM.MedRequestlist);
        //ParentGird
        this.oMedReqVM.MedRequestlist.forEach((item) => {
            item.PropertyChanged = (s, e) => {
                if (e.PropertyName == 'IsUrgencyChecked') {
                    let c = new iCheckBox();
                    c.IsChecked = s.IsUrgencyChecked;
                    let nCount = this.oMedReqVM.MedRequestlist.Count;
                    for (let i = 0; i < nCount; i++) {
                        if (this.oMedReqVM.MedRequestlist.array[i].PrescriptionItemOID == s.PrescriptionItemOID) {
                            c.GridRowIndex = i
                        }
                    }
                    this.chkUrgencyLevelPa_OnChange_Func(c, undefined);
                }
            }
            //MCIChildGird
            if (item != null && item.ReqMedPresItemsList != null && item.ReqMedPresItemsList.Count > 0) {
                item.ReqMedPresItemsList.forEach((citem) => {
                    citem.PropertyChanged = (s, e) => {
                        if (e.PropertyName == 'IsUrgencyChecked') {
                            let c = new iCheckBox();
                            c.IsChecked = s.IsUrgencyChecked;
                            let Parentitem;
                            let nMedsReqlstCount = this.oMedReqVM.MedRequestlist.Count;
                            for (let i = 0; i < nMedsReqlstCount; i++) {
                                if (this.oMedReqVM.MedRequestlist.array[i].PrescriptionItemOID == s.PrescriptionItemOID) {
                                    c.GridParentRowIndex = i;
                                    Parentitem = this.oMedReqVM.MedRequestlist.array[i];
                                }
                            }
                            if (Parentitem != null && Parentitem.ReqMedPresItemsList != null && Parentitem.ReqMedPresItemsList.Count > 0) {
                                let nMedChildCount = Parentitem.ReqMedPresItemsList.Count;
                                for (let i = 0; i < nMedChildCount; i++) {
                                    if (Parentitem.ReqMedPresItemsList.array[i].PrescMultiCompOID == s.PrescMultiCompOID) {
                                        c.GridRowIndex = i
                                    }
                                }
                                this.chkUrgencyLevel_OnChangeChild_Func(c, undefined);
                            }
                        }
                    }
                });
            }
        });

        this.grdRequestMedication.OpenAllChildGrids(this.oMedReqVM.MedRequestlist);
        this.childDataTemplates.changes.subscribe((dt) => {
            this.oMedReqVM.MedRequestlist.forEach((item, index) => {
                if (item.ReqMedPresItemsList?.Count > 0) {
                    item.ChildGridExtension.SetSelectedChildItem(item.SelectedChildGridIndex);
                    this.QueryListCollection.push(item.ChildGridExtension.SetChildDataTemplates(dt, index));
                }
            });
        });
        this.childGridRefCollection.changes.subscribe((children) => {
            this.grdRequestMedication.SetChildGridReference(children, this.QueryListCollection, "grdReqMedMCIChld");
        });
    }

    chkUrgencyLevelPa_OnChange_Func = (s, e) => {
        Object.keys(that).forEach((prop) => (this[prop] = that[prop]));
         this.chkUrgencyLevel_OnChangeParent(s, e);
     };
    
    rowLoaded(context: any) {
        let rowEventArgs = this.grdRequestMedication.GetRowEventArgs(
            this.dataTemplates,
            context,
            true,
            true
        );
        this.grdRequestMedication_RowLoaded({}, rowEventArgs);
    }

    grdReqMedMCIChldRowLoaded(context: any, dataItemChild: any) {
        let newContext = {
            index: context['index'],
            dataItem: dataItemChild
        }
        this.QueryListCollection.forEach((item) => {
        let rowEventArgs = dataItemChild.ChildGridExtension.GetRowEventArgs(item, newContext, true, true);
        this.grdMultiCompItem_RowLoaded({}, rowEventArgs);
        });
    }

    rowCallback = (context: RowClassArgs) => {
        let rowStyles = this.grdRequestMedication.getRowStyles(context);
        return rowStyles;
    };
    
    displayHierarchicalBtn(dataItem: any): boolean {
        return dataItem.ReqMedPresItemsList && dataItem.ReqMedPresItemsList.Count > 0;
    }
    
     grdRequestMedication_RowLoaded(sender: Object, e: RowLoadedEventArgs): void {
        if (e.Row != null) {
            let Selected = ObjectHelper.CreateType<MedRequestVM>(e.DataElement, MedRequestVM);
            if (e.Row != null && e.Row.Cells != null && e.Row.Cells[2] != null && e.Row.Cells[2].Content != null && !String.IsNullOrEmpty((ObjectHelper.CreateType<FrameworkElement>((e.Row.Cells[2].Content), FrameworkElement)).Name) && Selected != null && Selected.oPrescriptionItemViewVM != null && Selected.oPrescriptionItemViewVM.InfusionDetails != null && Selected.oPrescriptionItemViewVM.InfusionDetails.FluidSelectvalue == null) {
                let RowCells = (ObjectHelper.CreateType<Grid>((e.Row.Cells[2]).Content, Grid));
                if (RowCells != null && !String.IsNullOrEmpty(RowCells.Name) && RowCells.ColumnDefinitions != null && RowCells.ColumnDefinitions[0].Width != null) {
                    let NewGridLen: GridLength = new GridLength();
                    RowCells.ColumnDefinitions[0].Width = NewGridLen;
                }
            }
            if (MedicationCommonProfileData.AddPrescribingConfig != null && MedicationCommonProfileData.AddPrescribingConfig.EnableWardStockConfig) {
                if (Selected != null && e.Row.Cells != null && e.Row.Cells[10] != null) {
                    e.Row.Cells[11].Children[0].IsEnabled = false;
                    if (Selected.IsCancelReqEnabled || Selected.IsSupplyRequestExist)
                        e.Row.Cells[11].Children[0].IsEnabled = true;
                }
            }
            if (e.DataElement != null) {
                let objreq: MedRequestVM = ObjectHelper.CreateType<MedRequestVM>(e.DataElement, MedRequestVM);
                if (objreq != null && objreq.oPrescriptionItemViewVM != null && objreq.oPrescriptionItemViewVM.PrescriptionItemViewDetails != null && objreq.oPrescriptionItemViewVM.PrescriptionItemViewDetails.oPresItemBasicPropertiesView != null && (!String.IsNullOrEmpty(objreq.oPrescriptionItemViewVM.PrescriptionItemViewDetails.oPresItemBasicPropertiesView.Direction) && String.Equals(objreq.oPrescriptionItemViewVM.PrescriptionItemViewDetails.oPresItemBasicPropertiesView.Direction, CConstants.AsNeeded, StringComparison.InvariantCultureIgnoreCase)) || (!String.IsNullOrEmpty(objreq.oPrescriptionItemViewVM.FluidDirection) && String.Equals(objreq.oPrescriptionItemViewVM.FluidDirection, CConstants.AsNeeded, StringComparison.InvariantCultureIgnoreCase))) {
                    // e.Row.Background = new SolidColorBrush(MedChartData.AsRequiredSlotsColor);
                    // e.dataItem['RowStyles'].push("AsRequiredSlotsColor");
                    this.grdRequestMedication.SetRowStyle(e, MedChartData.AsRequiredSlotsColor.color, 'Background', true);
                    e.Row.IsAlternating = false;
                    this.IsPRN = true;
                }
                else {
                    this.IsPRN = false;
                }
                if (objreq != null && objreq.oPrescriptionItemViewVM != null && (!String.Equals(objreq.oPrescriptionItemViewVM.Itemsubtype, CConstants.ItemSubType, StringComparison.InvariantCultureIgnoreCase))) {
                    let dataGridRow: GridViewRow = ObjectHelper.CreateType<GridViewRow>(e.Row, GridViewRow);
                    dataGridRow.IsExpandable = false;
                }
                if (objreq != null && objreq.oPrescriptionItemViewVM != null && (String.Equals(objreq.oPrescriptionItemViewVM.Itemsubtype, CConstants.ItemSubType, StringComparison.InvariantCultureIgnoreCase))) {
                    let dataGridRow: GridViewRow = ObjectHelper.CreateType<GridViewRow>(e.Row, GridViewRow);
                    dataGridRow.IsExpanded = true;
                }
            }
            if (this.grdRequestMedication.Rows.Count > 1) {
                this.grdRequestMedication.setSelectedItemByIndex(0);
                this.grdRequestMedication.UnselectAll();
            }
        }
    }
    
    private grdMultiCompItem_RowLoaded(sender: Object, e: RowLoadedEventArgs): void {
        if (e.Row != null) {
            if (e.GridViewDataControl != null) {
                // e.GridViewDataControl.UnselectAll();
                if (this.IsPRN && e.Row.Item != null) {
                    e.Row.Background = new SolidColorBrush(MedChartData.AsRequiredSlotsColor);
                    e.Row.IsAlternating = false;
                }
            }
            if (MedicationCommonProfileData.AddPrescribingConfig != null && MedicationCommonProfileData.AddPrescribingConfig.EnableWardStockConfig) {
                let Selected = ObjectHelper.CreateType<MedRequestVM>(e.DataElement, MedRequestVM);
                if (Selected != null && e.Row.Cells != null && e.Row.Cells[10] != null) {
                    e.Row.Cells[10].Children[0].IsEnabled = false;
                    if (e.Row.Cells[10].dataItem != null && (e.Row.Cells[10].dataItem.IsCancelReqEnabled || e.Row.Cells[10].dataItem.IsSupplyRequestExist)) {
                        e.Row.Cells[10].Children[0].IsEnabled = true;
                    }
                }
            }
            else {
                e.GridViewDataControl.Columns["CancelRequest"].IsVisible = false;
                e.GridViewDataControl.Columns["DCLastDispensing"].IsVisible = false;
            }
        }
        if (ObjectHelper.CreateType<FrameworkElement>(sender, FrameworkElement) != null) {
            let MCISender = ObjectHelper.CreateType<MedRequestVM>((ObjectHelper.CreateType<FrameworkElement>(sender, FrameworkElement)).DataContext, MedRequestVM);
            if (MCISender != null && MCISender.IsLastReqMedMCI) {
                this.LastMCIChild = this.LastMCIChild + 1;
                if (MCISender.ReqMedPresItemsList != null && (this.LastMCIChild - 1) == MCISender.ReqMedPresItemsList.Count && ObjectHelper.CreateType<MedicationRequestVM>(this.DataContext, MedicationRequestVM) != null) {
                    this.ChildWidth = CConstants.WidthLessThree;
                    let _Rows = this.grdRequestMedication.ChildrenOfType<GridExtension>().Where(b => b.Name == "grdReqMedMCIChld" && b.Rows != null);
                    let _Width: number = this.grdRequestMedication.ActualWidth - this.ChildWidth;
                    if (_Rows != null) {
                        _Rows.forEach((item) => {
                            item.Width = _Width;
                        });
                    }
                }
            }
        }
    }

    private MedRequestCA_Loaded(sender: Object, e: RoutedEventArgs): void {
        let nScrrenResolutionWidth: number = 0.0;
        let oScreenWidth: Object = HtmlPage.Window.Eval("screen.width");
        if (oScreenWidth != null) {
            if (Number.TryParse(oScreenWidth.ToString(), (o) => {
                nScrrenResolutionWidth = o;
            })) {
                if (this.LayoutRoot.ActualWidth > nScrrenResolutionWidth) {
                    this.Width = (nScrrenResolutionWidth * 97.5) / 100;
                }
                else {
                    this.Width = this.LayoutRoot.ActualWidth;
                }
            }
        }
        else {
            this.Width = this.LayoutRoot.ActualWidth;
        }
        // this.Height = this.LayoutRoot.ActualHeight - 5;
        // if (this.LayoutRoot.ActualWidth < 1024 && this.grdRequestMedication.Columns["Prescriptionitem"] != null) 
        // {
        //     this.grdRequestMedication.Columns["Prescriptionitem"].Width = 250;
        // }
        this.oMedReqVM = ObjectHelper.CreateType<MedicationRequestVM>(this.DataContext, MedicationRequestVM);
        this.oMedReqMCIChildVM = ObjectHelper.CreateType<MedRequestVM>(this.DataContext, MedRequestVM);
        this.oMedReqVM.MedReqProfileCompleted = (s, e) => { this.oMedReqVM_MedReqProfileCompleted(); };
    }

    oMedReqVM_MedReqProfileCompleted(): void {
        if (MedicationCommonProfileData.AddPrescribingConfig != null && !MedicationCommonProfileData.AddPrescribingConfig.EnableWardStockConfig) {
            this.grdRequestMedication.Columns["CancelRequest"].IsVisible = false;
            this.grdRequestMedication.Columns["DCLastDispensing"].IsVisible = false;
        }
        this.grdRequestMedication.UpdateColumns();
    }

    private grdRequestMedication_RowIsExpandedChanged(sender: Object, e: RowEventArgs): void {
        this.grdRequestMedication.SaveChildGridSelectedIndex(e);
        if (e.Row.IsExpanded) {
            this.childGridRefCollection.changes.subscribe((children) => {
                this.childDataTemplates.changes.subscribe((dt) => {
                    this.SetChildGridRows(dt, e);
                })
            })
        }
        if (e.Row != null && e.Row.IsSelected == false) {
            e.Row.IsSelected = true;
        }
    }

    chkUrgencyLevel_OnChangeChild_Func = (s, e) => {
        Object.keys(that).forEach((prop) => (this[prop] = that[prop]));
        this.chkUrgencyLevel_OnChangeChild(s, e);
    }

    private chkUrgencyLevel_OnChangeParent(sender: Object, e: RoutedEventArgs): void {
        // let Checked = (<System.Windows.Controls.Primitives.ToggleButton>e.OriginalSource).IsChecked;
        let chkUrgencySelectedRow: iCheckBox = ObjectHelper.CreateType<iCheckBox>(sender, iCheckBox);
        let Checked = chkUrgencySelectedRow.IsChecked;
        let Selected: MedRequestVM = new MedRequestVM();
        if (ObjectHelper.CreateType<FrameworkElement>(sender, FrameworkElement) != null) {
            // Selected = ObjectHelper.CreateType<MedRequestVM>((ObjectHelper.CreateType<FrameworkElement>(sender, FrameworkElement)).DataContext, MedRequestVM);
            var oMedicationReqVM = ObjectHelper.CreateType<MedicationRequestVM>((<FrameworkElement>(this)).DataContext, MedicationRequestVM);
            if (oMedicationReqVM != null && chkUrgencySelectedRow.GridRowIndex != -1) {
                Selected = oMedicationReqVM.MedRequestlist[chkUrgencySelectedRow.GridRowIndex];
            }
        }
        if (Selected != null && Selected.oPrescriptionItemViewVM != null && Selected.oPrescriptionItemViewVM.PrescriptionItemOID > 0) {
            let ObjPresColn: MedRequestVM = new MedRequestVM();
            ObjPresColn = (ObjectHelper.CreateType<MedicationRequestVM>(this.DataContext, MedicationRequestVM)).MedRequestlist.Where(z => z.oPrescriptionItemViewVM.PrescriptionItemOID == Selected.oPrescriptionItemViewVM.PrescriptionItemOID).FirstOrDefault();
            if (ObjPresColn != null && ObjPresColn.ReqMedPresItemsList != null && ObjPresColn.ReqMedPresItemsList.Any(y => y.IsUrgencyChecked == true)) {
                e.OriginalSource.IsChecked = false;
                Checked = false;
            }
            if (Selected.oPrescriptionItemViewVM.Itemsubtype == "CC_MULCMPNTITM") {
                let _Rows = this.grdRequestMedication.ChildrenOfType<GridExtension>('GridExtension', -1, true).Where(b => b.Name == "grdReqMedMCIChld");
                if (_Rows != null && Checked != null && Checked == true) {
                    this.OnChangeParent(_Rows, Selected.oPrescriptionItemViewVM.PrescriptionItemOID, false);
                }
                else {
                    this.OnChangeParent(_Rows, Selected.oPrescriptionItemViewVM.PrescriptionItemOID, true);
                }
            }
        }
    }
   
    private OnChangeParent(_Rows: IEnumerable<GridExtension>, prescriptionItemOID: number, flag: boolean): void {
        _Rows.forEach((item) => {
            item.Rows.forEach((Child) => {
                if (Child != null && Child.Item != null) {
                    if ((ObjectHelper.CreateType<MedRequestVM>(Child.Item, MedRequestVM)).oPrescriptionItemViewVM.PrescriptionItemOID == prescriptionItemOID && Child.Cells != null && Child.Cells.Count > 6 && Child.Cells[2] != null && Child.Cells[3] != null && Child.Cells[4] != null) {
                        Child.Cells[2].Children[0].IsEnabled = flag;
                        Child.Cells[3].Children[0].IsDisabled = !flag;
                        Child.Cells[4].Children[0].IsDisabled = !flag;
                    }
                }
            });
        });
    }

    private chkUrgencyLevel_OnChangeChild(sender: Object, e: RoutedEventArgs): void {
        // let IsChecked = e.OriginalSource.IsChecked;
        let Selected: MedRequestVM = new MedRequestVM();
        let chkUrgencySelectedRow: iCheckBox = ObjectHelper.CreateType<iCheckBox>(sender, iCheckBox);
        let IsChecked = chkUrgencySelectedRow.IsChecked;
        if (ObjectHelper.CreateType<FrameworkElement>(sender, FrameworkElement) != null) {
            // Selected = ObjectHelper.CreateType<MedRequestVM>((ObjectHelper.CreateType<FrameworkElement>(sender, FrameworkElement)).DataContext, MedRequestVM);
            var oMedicationReqVM = ObjectHelper.CreateType<MedicationRequestVM>((<FrameworkElement>(this)).DataContext, MedicationRequestVM);
            if (IsChecked == true && oMedicationReqVM != null && chkUrgencySelectedRow.GridParentRowIndex != -1) {
                Selected = oMedicationReqVM.MedRequestlist[chkUrgencySelectedRow.GridParentRowIndex];
            }
            else if (IsChecked == false && chkUrgencySelectedRow.GridParentRowIndex != -1 && chkUrgencySelectedRow.GridRowIndex != -1
                && oMedicationReqVM.MedRequestlist[chkUrgencySelectedRow.GridParentRowIndex] != null
                && oMedicationReqVM.MedRequestlist[chkUrgencySelectedRow.GridParentRowIndex].ReqMedPresItemsList != null
                && oMedicationReqVM.MedRequestlist[chkUrgencySelectedRow.GridParentRowIndex].ReqMedPresItemsList.Count > 0) {
                Selected = oMedicationReqVM.MedRequestlist[chkUrgencySelectedRow.GridParentRowIndex].ReqMedPresItemsList[chkUrgencySelectedRow.GridRowIndex];
            }
        }
        if (Selected != null && Selected.oPrescriptionItemViewVM != null && Selected.oPrescriptionItemViewVM.PrescriptionItemOID > 0) {
            let ObjPresColn: MedRequestVM = new MedRequestVM();
            ObjPresColn = (ObjectHelper.CreateType<MedicationRequestVM>(this.DataContext, MedicationRequestVM)).MedRequestlist.Where(z => z.oPrescriptionItemViewVM.PrescriptionItemOID == Selected.oPrescriptionItemViewVM.PrescriptionItemOID).FirstOrDefault();
            this.SetCellData(this.grdRequestMedication.Rows,this.dataTemplates)
            let _Rows = this.grdRequestMedication.Rows;
            if (_Rows != null) {
                if (IsChecked != null && IsChecked == true) {
                    this.OnChangeChild(_Rows, Selected.oPrescriptionItemViewVM.PrescriptionItemOID, false);
                }
                // else if ((IsChecked != null && IsChecked == false) && ObjPresColn != null && ObjPresColn.ReqMedPresItemsList != null && ObjPresColn.ReqMedPresItemsList.Any(x => x.oPrescriptionItemViewVM.PresMultiCompitemOID == Selected.oPrescriptionItemViewVM.PresMultiCompitemOID && x.IsUrgencyChecked == true && !ObjPresColn.ReqMedPresItemsList.Any(y => y.oPrescriptionItemViewVM.PresMultiCompitemOID != Selected.oPrescriptionItemViewVM.PresMultiCompitemOID && y.IsUrgencyChecked == true))) {
                else if ((IsChecked != null && IsChecked == false) && ObjPresColn != null && ObjPresColn.ReqMedPresItemsList != null
                        && ObjPresColn.ReqMedPresItemsList.All(x => x.IsUrgencyChecked == false
                        //x.oPrescriptionItemViewVM.PresMultiCompitemOID == Selected.oPrescriptionItemViewVM.PresMultiCompitemOID
                        //  && !ObjPresColn.ReqMedPresItemsList.Any(y => y.oPrescriptionItemViewVM.PresMultiCompitemOID != Selected.oPrescriptionItemViewVM.PresMultiCompitemOID)
                    )) {
                    this.OnChangeChild(_Rows, Selected.oPrescriptionItemViewVM.PrescriptionItemOID, true);
                }
            }
        }
    }

    private OnChangeChild(_Rows: List<GridViewRow>, prescriptionItemOID: number, flag: boolean): void {
        _Rows.forEach((Parent) => {
            if (Parent.Item != null && Parent.Item instanceof MedRequestVM) {
                // if ((ObjectHelper.CreateType<MedRequestVM>(Parent.Item, MedRequestVM)).oPrescriptionItemViewVM.PrescriptionItemOID == prescriptionItemOID && (ObjectHelper.CreateType<MedRequestVM>(Parent.Item, MedRequestVM)).oPrescriptionItemViewVM.PresMultiCompitemOID == 0 && Parent.Cells != null && Parent.Cells.Count > 7 && Parent.Cells[3] != null && Parent.Cells[4] != null && Parent.Cells[5] != null) {
                if (Parent.Item.oPrescriptionItemViewVM.PrescriptionItemOID == prescriptionItemOID && Parent.Item.oPrescriptionItemViewVM.PresMultiCompitemOID == 0
                    && Parent.Cells != null && Parent.Cells.Count > 7 && Parent.Cells[3] != null && Parent.Cells[4] != null && Parent.Cells[5] != null) {
                    Parent.Cells[3].Children[0].IsEnabled = flag;
                    Parent.Cells[4].Children[0].IsDisabled = !flag;
                    Parent.Cells[5].Children[0].IsDisabled = !flag;
                }
            }
        });
    }

    Rx_MouseLeftButtonUp_Func = (s, e) => {
        this.Rx_MouseLeftButtonUp(s, e);
      };

    ddetChild: medddetailsChild;
    private Rx_MouseLeftButtonUp(sender: Object, e: MouseButtonEventArgs): void {
        let oItem: MedRequestVM = ObjectHelper.CreateType<MedRequestVM>((<FrameworkElement>(sender)).DataContext, MedRequestVM);
        if (oItem instanceof MedRequestVM) {
            this.ddetChild = new medddetailsChild();
            this.ddetChild.MedDetailsUserControl.PrescriptionItemOID = oItem.PrescriptionItemOID;
            this.ddetChild.MedDetailsUserControl.MCVersion = oItem.MCVersionNumber;
            this.ddetChild.MedDetailsUserControl.LorenzoID = oItem.LorenzoID;
            this.ddetChild.MedDetailsUserControl.sDefaultTab = "Technical";
            this.ddetChild.MedDetailsUserControl.ServiceOID = MedChartData.ServiceOID;
            this.ddetChild.MedDetailsUserControl.LocationOID = MedChartData.LocationOID;
            let sDrugTitle: string = oItem.PrescriptionItemName;
            AppActivity.OpenWindow(sDrugTitle, this.ddetChild, this.ddetChild_Closed, "", false, 650, 930, false, WindowButtonType.Close, null);
        }
    }
    private ddetChild_Closed(args: AppDialogEventargs): void {
        this.ddetChild.appDialog.DialogResult = true;
    }
 
    private MedRequestCA_Unloaded(sender: Object, e: RoutedEventArgs): void {
        if (this.oMedReqVM != null) {
           // this.oMedReqVM.MedReqProfileCompleted -= oMedReqVM_MedReqProfileCompleted;
        }
    }
    public IsExpanded_fun({ dataItem }: RowArgs): boolean {
        return true;
      }

    private SetCellData(Rows: List<GridViewRow>, DataTemplate: QueryList<DataTemplate>) {
        for (let i = 0; i < Rows.Count; i++) {
            let filteredCells = DataTemplate.filter(cell => cell.index == i);
            if (filteredCells.length > 0) {
                filteredCells.forEach((item) => {
                    Rows[i]?.Cells.Add(item);
                    Rows[i].Item = this.oMedReqVM.MedRequestlist[i];
                });
            }
        }
    }

    RowSelectionChanged({trigger, selectedRowIndex}, childdata?: any) {
        if (trigger && selectedRowIndex != undefined) {
            let e: SelectionChangeEventArgs = {};
            let addedItems: List = new List();
            if (childdata) {
                addedItems.Add(childdata?.ReqMedPresItemsList[selectedRowIndex]);
                e.AddedItems = addedItems;
                childdata.ChildGridExtension.selectedRowsIndex = [selectedRowIndex];
                // this.grdRequestMedication_SelectionChanged({}, e);
            } else {
                addedItems.Add(this.oMedReqVM.MedRequestlist[selectedRowIndex]);
                e.AddedItems = addedItems;
                this.grdRequestMedication.selectedRowsIndex = [selectedRowIndex];
                // this.grdTechValItem_SelectionChanged({}, e);
            }
        }
    }

    private SetChildGridRows(dt, e) {
        let a = dt.filter(item => item.ParentRowIndex == e.Row.Index);
        if (e.Row.IsExpanded && e.Row.DataContext.IsUrgencyChecked) {
            let Rows = [{Cells: []}];
            let rowCount = e.Row.DataContext.ReqMedPresItemsList.Count;
            // for(let i = 0; i < rowCount; i++) {
            // }
            for(let i = 0; i < rowCount; i++) {
                Rows.push({Cells: []});
                let filteredCells = a.filter(cell => cell.index == i);
                if (filteredCells.length > 0) {
                    filteredCells.forEach((item) => {
                        Rows[i].Cells.push(item);
                    });
                }
            }
            Rows.forEach((Row) => {
                if (Row && Row.Cells != null && Row.Cells.length > 6 && Row.Cells[2] != null && Row.Cells[3] != null && Row.Cells[4] != null) {
                    Row.Cells[2].Children[0].IsEnabled = false;
                    Row.Cells[3].Children[0].IsDisabled = true;
                    Row.Cells[4].Children[0].IsDisabled = true;
                }
            })
        }
    }

}
