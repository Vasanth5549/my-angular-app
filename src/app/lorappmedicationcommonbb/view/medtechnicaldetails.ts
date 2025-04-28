import { AfterViewInit, Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { List, StringComparison, Visibility } from 'epma-platform/models';
import { ContentPresenter, DataTemplate, EventArgs, Grid, SolidColorBrush, UserControl, iLabel } from 'epma-platform/controls';
import 'epma-platform/stringextension';
import { ObjectHelper } from 'epma-platform/helper';
import { PrescriptionItemDetailsVM, SupplyDetails, SupplyDetailsMCIChild, TechnicalDetails } from '../viewmodel/prescriptionitemdetailsvm';
import { RoutedEventArgs } from 'src/app/shared/epma-platform/controls/FrameworkElement';
import { GridExtension, GridViewColumnCollection, GridExtension as GridViewDataControl, GridViewRow, RowEventArgs, RowLoadedEventArgs, SelectionChangeEventArgs, SelectionChangingEventArgs } from 'src/app/shared/epma-platform/controls/epma-grid-helpers/grid-extension';
import { GridComponent, RowClassArgs } from '@progress/kendo-angular-grid';
import { MedicationCommonProfileData } from '../utilities/profiledata';
import { CConstants } from '../utilities/constants';
import * as ControlStyles from "../../shared/epma-platform/controls/ControlStyles";
import { Colors } from 'src/app/shared/epma-platform/controls/Control';
import { Resource } from '../resource';
import { base } from 'epma-platform/services';

@Component({
    selector: 'MedTechnicalDetails',
    templateUrl: './MedTechnicalDetails.html',
    styleUrls: ['./MedTechnicalDetails.css']
})
export class MedTechnicalDetails extends UserControl implements OnInit, AfterViewInit {
    isEPRview:boolean;
    objPrescriptionItemDetailsVM: PrescriptionItemDetailsVM;
    osupplydetails: SupplyDetails;
    oSupDetMCIchild: SupplyDetailsMCIChild;
    public Styles = ControlStyles;
    public IsDisContinued: boolean = false;
    public ddkey = Resource.DrugDetails;
    public mdkey = Resource.medlistdetails;
    public TechValidate = Resource.TechValidate;
    public bChildSupplyDispClick: boolean = true;
    public maxGridHeight = 200;
    public fullHeight = 400;
    public LayoutRoot: Grid;
    @ViewChild("LayoutRootTempRef", { read: Grid, static: false }) set _LayoutRoot(c: Grid) {
        if (c) { this.LayoutRoot = c; }
    };
    public lblSupplyDetHeading: iLabel;
    @ViewChild("lblSupplyDetHeadingTempRef", { read: iLabel, static: false }) set _lblSupplyDetHeading(c: iLabel) {
        if (c) { this.lblSupplyDetHeading = c; }
    };
    public grdSupplydetails: GridExtension = new GridExtension()
    @ViewChild("grdSupplydetailsTempRef", { read: GridComponent, static: false }) set _grdSupplydetails(c: GridComponent) {
        if (c) {
            this.grdSupplydetails.grid = c;
            this.grdSupplydetails.columns = c.columns;
        }
    };

    childGridRefCollection: QueryList<GridComponent>;
    @ViewChildren('grdMCISupplyDetTempRef', { read: GridComponent })
    set _grdMCISupplyDetTempRef(v: QueryList<GridComponent>) {
        if (v) {
            this.childGridRefCollection = v;
        }
    };

    childDataTemplates: QueryList<DataTemplate>;
    @ViewChildren('grdSupplydetailschildDTTempRef', { read: DataTemplate }) set _childDataTemplates(v: QueryList<DataTemplate>) {
        if (v) {
            this.childDataTemplates = v;
        }
    }

    public lblHeading: iLabel;
    @ViewChild("lblHeadingTempRef", { read: iLabel, static: false }) set _lblHeading(c: iLabel) {
        if (c) { this.lblHeading = c; }
    };
    public grdData: GridExtension = new GridExtension()
    @ViewChild("grdDataTempRef", { read: GridComponent, static: false }) set _grdData(c: GridComponent) {
        if (c) {
            this.grdData.grid = c;
            this.grdData.columns = c.columns;
        }
    };
    public grdMCISupplyDet: GridExtension = new GridExtension()

    @ViewChildren('tempgrdSupplydetails') DTSupplydetails: QueryList<DataTemplate>;
    @ViewChildren('tempgrdSupplydetailschild') DTSupplydetailsChild: QueryList<DataTemplate>;
    @ViewChildren('tempgrdData') DTSGridData: QueryList<DataTemplate>;
    constructor() {
        super();
    }

    ngOnInit(): void {
        this.grdSupplydetails.IsMedtechnicaldetails = true;
        this.grdSupplydetails.RowIndicatorVisibility = Visibility.Visible;
        this.grdSupplydetails.GridSelectionChange = (s, e) => {
            this.grdSupplydetails_SelectionChanged_1(this.grdSupplydetails, e)
        };
        this.grdSupplydetails.RowExpandedChanged = (s, e) => {
            this.grdSupplydetails_RowIsExpandedChanged(s, e)
        };
        let viewcheck : any = base.WizardContext;
        if(viewcheck?.IconClick != undefined){
            this.isEPRview=true;
        }
        else this.isEPRview=false;
    }
    QueryListCollection: any[] = [];
    ngAfterViewInit(): void {
        this.grdSupplydetails.GenerateColumns();
        this.grdData.GenerateColumns();
        this.MedTechnicalDetails_Loaded({}, {});
        this.grdMCISupplyDet_DataLoaded({}, {});
        this.grdData.SetNoRecordsTemplateWidth('grdData', 'NoRecordsTemplateID1');
        this.grdData.SetNoRecordsTemplateWidth('grdSupplydetails', 'NoRecordsTemplateID2');
        let elem = (document.querySelectorAll('medddetails')[0])?.querySelectorAll('#medddetailsRx')[0];
        if (elem.children[1]?.scrollHeight) {
            if (window.screen.height < 1000 && window.devicePixelRatio != 1.25) {
                this.fullHeight = window.innerHeight - (elem.children[0].scrollHeight + 100);
                this.maxGridHeight = (this.fullHeight - 100) / 2;
            }
            else {
                this.fullHeight = (elem.children[1].scrollHeight) - 33;
                this.maxGridHeight = (this.fullHeight - 60) / 2;
            }
        }
        console.log("maxGridHeight", this.maxGridHeight)
    }
    private SetParentChildGridData() {
        this.grdSupplydetails.OpenAllChildGrids(this.objPrescriptionItemDetailsVM.SupplyHistory);
        this.childDataTemplates.changes.subscribe((dt) => {
            this.objPrescriptionItemDetailsVM.SupplyHistory.forEach((item, index) => {
              if (item && item?.SupplyHistoryMCIChild && item?.SupplyHistoryMCIChild.Count > 0) {
                  if (this.grdSupplydetails.IsMedtechnicaldetails && item.SelectedChildGridIndex.length > 0)
                        item.ChildGridExtension.SetSelectedChildItem(item.SelectedChildGridIndex);
                    item.ChildGridExtension.GridSelectionChange = (s, e) => { this.grdSupplydetails_SelectionChanged_Child(item.ChildGridExtension, e); }
                    this.QueryListCollection.push(item.ChildGridExtension.SetChildDataTemplates(dt, index));
                }
            });
        });
        this.childGridRefCollection.changes.subscribe((children) => {
            this.grdSupplydetails.SetChildGridReference(children, this.QueryListCollection);
        });
    }
    public displayHierarchicalBtn(dataItem: any): boolean {
        return dataItem.SupplyHistoryMCIChild && dataItem.SupplyHistoryMCIChild.Count > 0;
    }

    rowLoadedTV(context: any) {
        let rowEventArgs = this.grdSupplydetails.GetRowEventArgs(this.DTSupplydetails, context);
        this.grdSupplydetails_RowLoaded({}, rowEventArgs);
    }

    rowLoadedTVChild(context: any, dataItemChild: any) {
        let newContext = {
            index: context['index'],
            dataItem: dataItemChild
        }
        this.QueryListCollection.forEach((item) => {
            let rowEventArgs = dataItemChild.ChildGridExtension.GetRowEventArgs(item, newContext, true);
            this.grdMCISupplyDet_RowLoaded({}, rowEventArgs);
        });
    }

    rowLoadedData(context: any) {
        if (this.grdSupplydetails != null) {
            let rowEventArgs = this.grdData.GetRowEventArgs(this.DTSGridData, context);
            this.grdData_RowLoaded({}, rowEventArgs)
        }
    }

    MedTechnicalDetails_Loaded(sender: Object, e: RoutedEventArgs): void {
        if (this.DataContext != null) {
            this.objPrescriptionItemDetailsVM = ObjectHelper.CreateType<PrescriptionItemDetailsVM>(this.DataContext, PrescriptionItemDetailsVM);
            if (this.objPrescriptionItemDetailsVM != null && this.objPrescriptionItemDetailsVM.DrugDetails != null && !String.IsNullOrEmpty(this.objPrescriptionItemDetailsVM.DrugDetails.MCLorenzoid)) {
                this.objPrescriptionItemDetailsVM.GetSupplyHistory(this.objPrescriptionItemDetailsVM.DrugDetails.MCLorenzoid, this.objPrescriptionItemDetailsVM.IsMCIComponent);
                this.objPrescriptionItemDetailsVM.SupplyHistoryservicedata.subscribe(x => {
                    if (this.objPrescriptionItemDetailsVM.SupplyHistory.Count > 0)
                        this.grdSupplydetails.SetBinding('data', this.objPrescriptionItemDetailsVM.SupplyHistory);
                    this.grdSupplydetails.SelectedItem = this.objPrescriptionItemDetailsVM.SelectedSupplyItem;
                    this.setSelectedRowData();
                    this.SetParentChildGridData();
                })
            }
        }
        if (this.grdSupplydetails != null && this.grdSupplydetails.Columns != null && this.grdSupplydetails.Columns.Count > 0) {
            if (MedicationCommonProfileData.AddPrescribingConfig != null && MedicationCommonProfileData.AddPrescribingConfig.EnableWardStockConfig) {
                this.grdSupplydetails.Columns["Dispensingrequestdetailsdatetime"].IsVisible = true;
                this.grdSupplydetails.Columns["NextSupply"].IsVisible = true;
            }
            else {
                this.grdSupplydetails.Columns["Dispensingrequestdetailsdatetime"].IsVisible = false;
                this.grdSupplydetails.Columns["NextSupply"].IsVisible = false;
            }
        }
        if (this.grdData != null && this.grdData.Columns != null && this.grdData.Columns.Count > 0) {
            if (MedicationCommonProfileData.AddPrescribingConfig != null && MedicationCommonProfileData.AddPrescribingConfig.EnableWardStockConfig) {
                this.grdData.Columns["Dispensingrequestdetailsdatetime"].IsVisible = true;
            }
            else {
                this.grdData.Columns["Dispensingrequestdetailsdatetime"].IsVisible = false;
            }
        }
        this.grdSupplydetails.UpdateColumns();
    }

    private grdSupplydetails_SelectionChanged_1(sender: Object, e: SelectionChangeEventArgs): void {
        this.objPrescriptionItemDetailsVM.SupplyHistory.forEach((item) => {
            item.ChildGridExtension.selectedRowsIndex = [];
        })

        if (this.grdSupplydetails.SelectedItem.IsGroupHeader) {
            this.grdSupplydetails.selectedRowsIndex = [];
            return;
        }
        if ((<GridExtension>(sender)).SelectedItem == null)
            return
        if ((ObjectHelper.CreateType<GridExtension>(sender, GridExtension).Rows.Count > 0)) {
            if (e.AddedItems.Count > 0) {
                let currentGrid: GridExtension = ObjectHelper.CreateType<GridExtension>(sender, GridExtension);
                if (this.lastSelectedGrid != null) {
                    if (this.lastSelectedGrid != currentGrid) {
                        this.lastSelectedGrid.UnselectAll();
                    }
                }
                this.lastSelectedGrid = currentGrid;

                if (e.AddedItems[0] != null) {
                    this.setSelectedRowData();
                }

            }
        }
    }
    private setSelectedRowData() {
        this.osupplydetails = ObjectHelper.CreateType<SupplyDetails>(this.grdSupplydetails.SelectedItem, SupplyDetails);
        if (this.osupplydetails != null) {
            if (this.objPrescriptionItemDetailsVM != null) {
                if (String.Equals(this.osupplydetails.PresItemstatusCode, CConstants.CANCELLED)) {
                    this.objPrescriptionItemDetailsVM.Iscancelled = true;
                }
                else {
                    this.objPrescriptionItemDetailsVM.Iscancelled = false;
                }
                this.objPrescriptionItemDetailsVM.GetTechnicalDetails(this.osupplydetails.MedSupplyDetailOID, this.osupplydetails.SortingDTTM, this.osupplydetails.PrescriptionItemOID);
                this.objPrescriptionItemDetailsVM.TechnicalDetailsservicedata.subscribe(x => {
                    this.grdData.SetBinding('data', this.objPrescriptionItemDetailsVM.TechnicalDetails);
		    if (this.grdData != null && this.grdData.Rows != null && this.grdData.Rows.Count > 0){
                        this.grdData.setSelectedItemByIndex(0);
                    }
                })
            }
        }
    }

    lastSelectedGrid: GridExtension = null;

    private grdSupplydetails_SelectionChanged_Child(sender: Object, e: SelectionChangeEventArgs): void {
        this.grdSupplydetails.selectedRowsIndex = [];
        // if ((<GridExtension>(sender)).SelectedItem == null)
        //     return
        // if ((ObjectHelper.CreateType<GridExtension>(sender, GridExtension)).Rows.Count > 0) {
        //this.grdSupplydetails.UnselectAll();
        if (e.AddedItems.Count > 0) {
            let currentGrid: GridExtension = ObjectHelper.CreateType<GridExtension>(sender, GridExtension);
            if (this.lastSelectedGrid != null) {
                if (this.lastSelectedGrid != currentGrid) {
                    this.lastSelectedGrid.UnselectAll();
                }
            }
            this.lastSelectedGrid = currentGrid;
            if (e.AddedItems[0] != null) {
                this.oSupDetMCIchild = ObjectHelper.CreateType<SupplyDetailsMCIChild>(e.AddedItems[0], SupplyDetailsMCIChild);
                if (this.oSupDetMCIchild != null) {
                    if (this.objPrescriptionItemDetailsVM != null) {
                        if (String.Equals(this.oSupDetMCIchild.PresItemstatusCode, CConstants.CANCELLED)) {
                            this.objPrescriptionItemDetailsVM.Iscancelled = true;
                        }
                        else {
                            this.objPrescriptionItemDetailsVM.Iscancelled = false;
                        }
                        this.objPrescriptionItemDetailsVM.GetTechnicalDetails(this.oSupDetMCIchild.MedSupplyDetailOID, this.oSupDetMCIchild.SortingDTTM, this.oSupDetMCIchild.PrescriptionItemOID);
                        this.objPrescriptionItemDetailsVM.TechnicalDetailsservicedata.subscribe(x => {
                            this.grdData.SetBinding('data', this.objPrescriptionItemDetailsVM.TechnicalDetails);
                            if (this.grdData != null && this.grdData.Rows != null && this.grdData.Rows.Count > 0) {
                                this.grdData.setSelectedItemByIndex(0);
                            }
                        })
                    }
                }
            }
        }
        //}
    }

    private grdData_RowLoaded(sender: Object, e: RowLoadedEventArgs): void {
        if (e.Row != null && e.Row.Item != null) {
            let oSupplyHistoryDetails: TechnicalDetails = ObjectHelper.CreateType<TechnicalDetails>(e.Row.Item, TechnicalDetails);
            if (oSupplyHistoryDetails != null) {
                if (this.osupplydetails != null && String.Equals(this.osupplydetails.PresItemstatusCode, CConstants.DISCONTINUED)) {
                    e.dataItem['RowStyles'].push('Background_DISCONTINUED');
                }
            }
        }
    }

    private grdMCISupplyDet_RowLoaded(sender: Object, e: RowLoadedEventArgs): void {
        if (e.Row != null && e.Row.Item != null) {
            let oSupplyMCIChild: SupplyDetailsMCIChild = ObjectHelper.CreateType<SupplyDetailsMCIChild>(e.Row.Item, SupplyDetailsMCIChild);
            if (this.IsDisContinued || String.Equals(oSupplyMCIChild.PresItemstatusCode, CConstants.DISCONTINUED)) {
                e.dataItem['RowStyles'].push('Background_DISCONTINUED');
            }
            if (e.GridViewDataControl != null) {
                // e.GridViewDataControl.UnselectAll();
            }
        }
    }

    private grdMCISupplyDet_DataLoaded(sender: Object, e: EventArgs): void {
        if (sender != null) {
            let objGridColmns: GridViewColumnCollection = (<GridViewDataControl>(sender)).Columns;
            if (objGridColmns != null && objGridColmns.Count > 0) {
                objGridColmns.forEach((col) => {
                    if (col.UniqueName == "Dispensingrequestdetailsdatetime" || col.UniqueName == "NextSupply") {
                        if (MedicationCommonProfileData.AddPrescribingConfig != null && MedicationCommonProfileData.AddPrescribingConfig.EnableWardStockConfig) {
                            col.IsVisible = true;
                        }
                        else {
                            col.IsVisible = false;
                        }
                    }
                });
            }
        }
    }
    
    rowCallback = (context: RowClassArgs) => {
        let rowStyles = this.grdSupplydetails.getRowStyles(context);
        return rowStyles;
      };
      
    private grdSupplydetails_RowLoaded(sender: Object, e: RowLoadedEventArgs): void {
        if (e.Row != null && e.Row.Item != null) {
            let oSupplyHistoryDetails: SupplyDetails = ObjectHelper.CreateType<SupplyDetails>(e.Row.Item, SupplyDetails);
            if (oSupplyHistoryDetails != null) {
                if (String.Equals(oSupplyHistoryDetails.PresItemstatusCode, CConstants.DISCONTINUED)) {
                   e.dataItem['RowStyles'].push('Background_DISCONTINUED');
                    this.IsDisContinued = true;
                }
                else {
                    this.IsDisContinued = false;
                }
                let dataGridRow: GridViewRow = ObjectHelper.CreateType<GridViewRow>(e.Row, GridViewRow);
                if (String.Equals(oSupplyHistoryDetails.ItemSubType, CConstants.SUBTYPE, StringComparison.InvariantCultureIgnoreCase)) {
                    dataGridRow.IsExpanded = true;
                }
                else {
                    dataGridRow.IsExpandable = false;
                }
                if (oSupplyHistoryDetails.FluidPrescribableItemListOID > 0) {
                    if (e.Row.Cells.Count > 0) {
                        if (e.Row.Cells[0].Content != null) {
                            let cntControl: iLabel = <iLabel>(<ContentPresenter>(e.Row.Cells[0].Content)).Content;
                            cntControl.Width = 120;
                        }
                    }
                }
                if (this.grdSupplydetails.Rows.Count > 1) {

                }
            }
        }
    }

    private grdSupplydetails_RowIsExpandedChanged(sender: Object, e: RowEventArgs): void {
        this.grdSupplydetails.SaveChildGridSelectedIndex(e);
        // if (e.Row.IsExpanded) {
        //     setTimeout(() => {
        //         this.objPrescriptionItemDetailsVM.SupplyHistory[e.Row.Index].ChildGridExtension.selectedRowsIndex = e.Row.DataContext.SelectedChildGridIndex;
        //     }, 500);

        // }
    }
}
