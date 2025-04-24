import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { AppActivity, base } from 'epma-platform/services';
import { StringComparison, AppDialogEventargs, WindowButtonType, Visibility, List } from 'epma-platform/models';
import { DataTemplate, EventArgs, Grid, UserControl, iTab } from 'epma-platform/controls';
import 'epma-platform/stringextension';
import { ObjectHelper } from 'epma-platform/helper';
import { MedsAdminSlotHistory } from '../child/medsadminslothistory';
import { medinfusionstrikehistory } from '../child/medInfusionStrikeHistory';
import { medbagdetails } from './medbagdetails/medbagdetails.component';
import { AdminList, PrescriptionItemDetailsVM } from '../viewmodel/prescriptionitemdetailsvm';
import { BagDetailsVM } from '../viewmodel/BagDetailsVM'
import { MedsAdminEventDetails } from './medsadmineventdetails';
import { GridExtension, GridViewRow, RowEventArgs, SelectionChangeEventArgs, iGridViewHeaderRow, RowLoadedEventArgs, GridViewCellClickEventArgs } from 'src/app/shared/epma-platform/controls/epma-grid-helpers/grid-extension';
import { CellClickEvent, GridComponent } from '@progress/kendo-angular-grid';
import { RoutedEventArgs, ScrollBarVisibility } from 'src/app/shared/epma-platform/controls/Control';
import { CConstants } from '../utilities/constants';
import { infstrikethroughVM } from '../viewmodel/infstrikethroughvm';
import { CnstSlotStatus, DrugItemSubTypeCode } from 'src/app/product/shared/models/medcommonbbconstant';
import { AppSessionInfo } from 'src/app/lorappcommonbb/utilities/globalvariable';
import { Resource } from "../resource";

var that;

@Component({
    selector: 'MedAdminDetails',
    templateUrl: './medadmindetails.html',
    styleUrls: ['./medadmindetails.css']
})

export class MedAdminDetails extends UserControl {
    isEPRview:boolean;
    public grdAdminList: GridExtension = new GridExtension();
    public grdinfuactchld: GridExtension = new GridExtension();
    public medsadmindetailsToolTip = Resource.medsadmindetails;
    public objBagDetailsVM: BagDetailsVM;
    public LayoutRoot: Grid;
    public ischangerow: boolean = false;

    @ViewChild("LayoutRootTempRef", { read: Grid, static: false }) set _LayoutRoot(c: Grid) {
        if (c) { this.LayoutRoot = c; }
    };

    public ftbMedsAdminTabs: iTab;
    @ViewChild("ftbMedsAdminTabsTempRef", { read: iTab, static: false }) set _ftbMedsAdminTabs(c: iTab) {
        if (c) { this.ftbMedsAdminTabs = c; }
    };

    @ViewChildren('tempAdminList') dataTemplates: QueryList<DataTemplate>;
    @ViewChild("grdAdminListTempRef", { read: GridComponent, static: false }) set _grdAdminList(c: GridComponent) {
        if (c) {
            this.grdAdminList.grid = c;
            this.grdAdminList.columns = c.columns;
        }
    };

    childGridRefCollection: QueryList<GridComponent>;
    @ViewChildren('grdinfuactchldTempRef', { read: GridComponent }) set _grdinfuactchldTempRef(v: QueryList<GridComponent>) {
        if (v) { this.childGridRefCollection = v; }
    };

    childDataTemplates: QueryList<DataTemplate>;
    @ViewChildren('grdinfuactchldDTTempRef', { read: DataTemplate }) set _grdinfuactchldDTTempRef(v: QueryList<DataTemplate>) {
        if (v) { this.childDataTemplates = v; }
    };

    constructor() {
        super();
        that = this;
    }

    rowLoaded(context: any) {
        let rowEventArgs = this.grdAdminList.GetRowEventArgs(this.dataTemplates, context);
        this.grdAdminHistoryList_RowLoaded({}, rowEventArgs);
    }

    rowLoadedChild(context: any, dataItemChild: any) {
        let newContext = {
            index: context['index'],
            dataItem: dataItemChild
        }
        this.QueryListCollection.forEach((item) => {
            let rowEventArgs = dataItemChild.ChildGridExtension.GetRowEventArgs(item, newContext, true);
            this.grdinfuactchld_RowLoaded({}, rowEventArgs);
        });

    }

    oMedsAdminSlotHistory: MedsAdminSlotHistory;
    omedinfusionstrikehistory: medinfusionstrikehistory;
    oMedsAdminEventDetails: MedsAdminEventDetails;
    omedbagdetails: medbagdetails;
    MezzanineDataContext: PrescriptionItemDetailsVM;
    public MCVersion: string = String.Empty;
    public PrescriptionItemOID: number = 0;
    public objPrescriptionItemDetailsVM: PrescriptionItemDetailsVM;
    public Callbackpage: boolean = false;
    public lnMedAdminOID: number = 0;
    QueryListCollection: any[] = [];
    public maxGridHeight = 150;
    public fullHeight =350;
    
    //47670 Div Click is introduced for RowIndicatorColumn click to trigger while grid is processing the data
    GridRowSelect(nRowIndex:number){
        
        if (this.grdAdminList != null && this.grdAdminList.Rows != null && this.grdAdminList.Rows.Count > 0){
         
        this.grdAdminList.SelectedItem = this.objPrescriptionItemDetailsVM.AdminList[nRowIndex];
       this.grdAdminList.selectedRowsIndex=[nRowIndex];
       this.grdAdminList_SelectionChanged([],null);
    }
        
    }

    ngOnInit(): void {
        this.grdAdminList.Ismedadmindetails = true;
        this.grdAdminList.RowIndicatorVisibility = Visibility.Visible;
        this.grdinfuactchld.RowIndicatorVisibility = Visibility.Visible;
        

        this.grdAdminList.onCellClick = (s, e) => { this.grdAdminList_onCellClick(s, e) };
        this.grdAdminList.GridSelectionChange = (s, e) => { this.grdAdminList_SelectionChanged(s, e)};
        //this.grdAdminList.GridSelectionChange = (s, e) => { this.grdAdminList_SelectionChanged(this.grdAdminList, e) };
        this.grdAdminList.GridFocus = (s, e) => { this.grdAdminList_GotFocus(this.grdAdminList, e) };
        let viewcheck : any = base.WizardContext;
        if(viewcheck?.IconClick){
            this.isEPRview=true;
        }
        else this.isEPRview=false;
    }

    ngAfterViewInit(): void {
            let elem = (document.querySelectorAll('medddetails')[0])?.querySelectorAll('#medddetailsRx')[0];
            if (elem.children[1]?.scrollHeight) {
                if (window.screen.height < 1000 && window.devicePixelRatio != 1.25) {
                    this.fullHeight = window.innerHeight - (elem.children[0].scrollHeight + 135);
                    this.maxGridHeight = (this.fullHeight) / 2;

                }
                else{
                    this.fullHeight = (elem.children[1].scrollHeight) - 33;
                    this.maxGridHeight = (this.fullHeight) / 2;
                }
                
            }
        this.grdAdminList.SelectedItem = this.DataContext.SelectedSlot;
        this.MedAdminDetails_Loaded(null, null);
        this.grdAdminHistoryList_DataLoaded(null, null);
        this.grdAdminList.UpdateColumns();
        this.grdAdminList.RowExpandedChanged = (s, e) => { this.grdinfuactchld_RowIsExpandedChanged(s, e) };
        this.grdAdminList.GenerateColumns();
        this.grdinfuactchld.GenerateColumns();
    }

    ngOnDestroy(): void {
        this.MedAdminDetails_Unloaded(null, null);
    }

    displayHierarchicalBtn(dataItem: any): boolean {
        return dataItem?.ShowGridExpander;
    }

    grdAdminList_GotFocus(sender: Object, e: RoutedEventArgs): void {
        if (this.grdAdminList.SelectedItem != null) {
            this.grdAdminList.ScrollIntoView(this.grdAdminList.SelectedItem);
        }
    }

    MedAdminDetails_Unloaded(sender: Object, e: RoutedEventArgs): void {
        this.MezzanineDataContext = null;
    }

    MedAdminDetails_Loaded(sender: Object, e: RoutedEventArgs): void {
        this.MezzanineDataContext = ObjectHelper.CreateType<PrescriptionItemDetailsVM>(this.DataContext, PrescriptionItemDetailsVM);
        this.oMedsAdminEventDetails = new MedsAdminEventDetails();
        this.omedbagdetails = new medbagdetails();
        this.oMedsAdminEventDetails.DataContext = ObjectHelper.CreateType<PrescriptionItemDetailsVM>(this.DataContext, PrescriptionItemDetailsVM);
        this.ftbMedsAdminTabs.AddTabItem("Administration", "Administration event details", this.oMedsAdminEventDetails, true, "Administration event details");
        this.ftbMedsAdminTabs.SelectedKey = "Administration";
        if ((this.MezzanineDataContext != null) && (this.MezzanineDataContext.AdditionalDetails != null) && (this.MezzanineDataContext.AdditionalDetails.IsInfusion) && (!this.MezzanineDataContext.AdditionalDetails.IsBolus) && (this.MezzanineDataContext.DrugDetails != null) && (String.Compare(this.MezzanineDataContext.DrugDetails.ItemSubType, DrugItemSubTypeCode.MEDICAL_GAS, StringComparison.OrdinalIgnoreCase) != 0) && (this.MezzanineDataContext.AdditionalDetails.IsPGD != '1')) {
            this.omedbagdetails.isRx=true;
            this.ftbMedsAdminTabs.AddTabItem("Bagdetails", "Bag details", this.omedbagdetails, false, "Bag details");
        }
        if (this.DataContext != null) {
            this.grdAdminList.ItemsSource.Clear();
            this.grdAdminList.UnselectAll();
            //this.grdinfuactchld.ItemsSource.Clear();

            this.objPrescriptionItemDetailsVM = ObjectHelper.CreateType<PrescriptionItemDetailsVM>(this.DataContext, PrescriptionItemDetailsVM);
            if (String.Compare(CConstants.CancelledStatusTermText, this.objPrescriptionItemDetailsVM.DrugDetails.Status, StringComparison.CurrentCultureIgnoreCase) != 0) {
                this.objPrescriptionItemDetailsVM.GetAdministrationList(this.objPrescriptionItemDetailsVM.PrescriptionItemOID);

                this.objPrescriptionItemDetailsVM.getdata.subscribe(x => {
                    this.grdAdminList.SetBinding('data', this.objPrescriptionItemDetailsVM.AdminList);
                    if (this.grdAdminList != null && this.grdAdminList.Rows != null && this.grdAdminList.Rows.Count > 0) {
                        this.grdAdminHistoryList_DataLoaded(null, null);
                        this.gridFocusTimeout();
                    }
                    this.grdAdminList.UpdateColumns();
                })
            }
            if (((this.objPrescriptionItemDetailsVM.DrugDetails.InfusionDetails.InfusionType != null && !String.IsNullOrEmpty(this.objPrescriptionItemDetailsVM.DrugDetails.InfusionDetails.InfusionType.Value))) && !this.objPrescriptionItemDetailsVM.AdditionalDetails.IsBolus) {
                this.oMedsAdminEventDetails.scrollbar.VerticalScrollBarVisibility = ScrollBarVisibility.Visible;
                this.oMedsAdminEventDetails.lblaction.Visibility = Visibility.Visible;
                this.oMedsAdminEventDetails.lblactionData.Visibility = Visibility.Visible;
                this.oMedsAdminEventDetails.lblVolinfused.Visibility = Visibility.Visible;
                this.oMedsAdminEventDetails.lblVolinfusedata.Visibility = Visibility.Visible;
                this.oMedsAdminEventDetails.lbldriprate.Visibility = Visibility.Visible;
                this.oMedsAdminEventDetails.lbldripratedata.Visibility = Visibility.Visible;
                this.oMedsAdminEventDetails.brdadminby.Visibility = Visibility.Visible;
                this.oMedsAdminEventDetails.brddeldevice.Visibility = Visibility.Visible;
                this.oMedsAdminEventDetails.brddriprate.Visibility = Visibility.Visible;
                this.oMedsAdminEventDetails.brdlumen.Visibility = Visibility.Visible;
                this.oMedsAdminEventDetails.brdvolinf.Visibility = Visibility.Visible;
                this.oMedsAdminEventDetails.brdbagvol.Visibility = Visibility.Visible;
                this.oMedsAdminEventDetails.brdinfrate.Visibility = Visibility.Visible;
                this.oMedsAdminEventDetails.bgdadminby.Visibility = Visibility.Visible;
                this.oMedsAdminEventDetails.bgddeldevice.Visibility = Visibility.Visible;
                this.oMedsAdminEventDetails.bgddriprate.Visibility = Visibility.Visible;
                this.oMedsAdminEventDetails.bgdlumen.Visibility = Visibility.Visible;
                this.oMedsAdminEventDetails.bgdvolinf.Visibility = Visibility.Visible;
                this.oMedsAdminEventDetails.bgdinfrate.Visibility = Visibility.Visible;
                this.oMedsAdminEventDetails.bgdbagvol.Visibility = Visibility.Visible;
                this.oMedsAdminEventDetails.lblinfusionrate.Visibility = Visibility.Visible;
                this.oMedsAdminEventDetails.lblinfusionratedata.Visibility = Visibility.Visible;
                this.oMedsAdminEventDetails.lblbagvolume.Visibility = Visibility.Visible;
                this.oMedsAdminEventDetails.lblbagvolumeData.Visibility = Visibility.Visible;
                this.oMedsAdminEventDetails.lbllumen.Visibility = Visibility.Visible;
                this.oMedsAdminEventDetails.lbllumendata.Visibility = Visibility.Visible;
                this.oMedsAdminEventDetails.lblDeldevice.Visibility = Visibility.Visible;
                this.oMedsAdminEventDetails.lblDeldevicedata.Visibility = Visibility.Visible;
                this.oMedsAdminEventDetails.lblRouteAdminstered.Visibility = Visibility.Visible;
                this.oMedsAdminEventDetails.lblRouteAdminstered.Text = Resource.DrugDetails.lblRouteName_Text;
                this.oMedsAdminEventDetails.lblRouteAdminsteredData.Visibility = Visibility.Visible;
                this.oMedsAdminEventDetails.lblHumidification.Visibility = Visibility.Collapsed;
                this.oMedsAdminEventDetails.lblHumidificationData.Visibility = Visibility.Collapsed;
                this.oMedsAdminEventDetails.lblinfusiondose.Visibility = Visibility.Visible;
                this.oMedsAdminEventDetails.lblinfusiondosedata.Visibility = Visibility.Visible;
                this.oMedsAdminEventDetails.lblinfConcentration.Visibility = Visibility.Visible;
                this.oMedsAdminEventDetails.lblinfConcentrationdata.Visibility = Visibility.Visible;
                this.oMedsAdminEventDetails.lblinfusionperiod.Visibility = Visibility.Visible;
                this.oMedsAdminEventDetails.lblinfusionperioddata.Visibility = Visibility.Visible;
                this.oMedsAdminEventDetails.bgdinfdose.Visibility = Visibility.Visible;
                this.oMedsAdminEventDetails.bgdinfconcentration.Visibility = Visibility.Visible;
                this.oMedsAdminEventDetails.bgdinfperiod.Visibility = Visibility.Visible;
                this.oMedsAdminEventDetails.brdinfdose.Visibility = Visibility.Visible;
                this.oMedsAdminEventDetails.brdinfconcentration.Visibility = Visibility.Visible;
                this.oMedsAdminEventDetails.brdinfperiod.Visibility = Visibility.Visible;
            }
            else if (((this.objPrescriptionItemDetailsVM.DrugDetails.InfusionDetails.InfusionType != null && !String.IsNullOrEmpty(this.objPrescriptionItemDetailsVM.DrugDetails.InfusionDetails.InfusionType.Value))) && this.objPrescriptionItemDetailsVM.AdditionalDetails.IsBolus) {
                this.oMedsAdminEventDetails.lblinfusionperiod.Visibility = Visibility.Visible;
                this.oMedsAdminEventDetails.lblinfusionperioddata.Visibility = Visibility.Visible;
                this.oMedsAdminEventDetails.lblinfConcentration.Visibility = Visibility.Visible;
                this.oMedsAdminEventDetails.lblinfConcentrationdata.Visibility = Visibility.Visible;
                this.oMedsAdminEventDetails.bgdinfconcentration.Visibility = Visibility.Visible;
                this.oMedsAdminEventDetails.brdinfconcentration.Visibility = Visibility.Collapsed;
                this.oMedsAdminEventDetails.bgdinfperiod.Visibility = Visibility.Visible;
                this.oMedsAdminEventDetails.brdinfperiod.Visibility = Visibility.Collapsed;
            }
            else if (!String.IsNullOrEmpty(this.objPrescriptionItemDetailsVM.DrugDetails.ItemSubType) && String.Compare(this.objPrescriptionItemDetailsVM.DrugDetails.ItemSubType, DrugItemSubTypeCode.MEDICAL_GAS, StringComparison.CurrentCultureIgnoreCase) == 0) {
                this.oMedsAdminEventDetails.scrollbar.VerticalScrollBarVisibility = ScrollBarVisibility.Visible;
                this.oMedsAdminEventDetails.lblaction.Visibility = Visibility.Visible;
                this.oMedsAdminEventDetails.lblactionData.Visibility = Visibility.Visible;
                this.oMedsAdminEventDetails.lblVolinfused.Visibility = Visibility.Collapsed;
                this.oMedsAdminEventDetails.lblVolinfusedata.Visibility = Visibility.Collapsed;
                this.oMedsAdminEventDetails.lbldriprate.Visibility = Visibility.Collapsed;
                this.oMedsAdminEventDetails.lbldripratedata.Visibility = Visibility.Collapsed;
                this.oMedsAdminEventDetails.brdadminby.Visibility = Visibility.Visible;
                this.oMedsAdminEventDetails.brddeldevice.Visibility = Visibility.Visible;
                this.oMedsAdminEventDetails.brddriprate.Visibility = Visibility.Collapsed;
                this.oMedsAdminEventDetails.brdlumen.Visibility = Visibility.Collapsed;
                this.oMedsAdminEventDetails.brdvolinf.Visibility = Visibility.Collapsed;
                this.oMedsAdminEventDetails.brdbagvol.Visibility = Visibility.Collapsed;
                this.oMedsAdminEventDetails.brdinfrate.Visibility = Visibility.Collapsed;
                this.oMedsAdminEventDetails.bgdadminby.Visibility = Visibility.Visible;
                this.oMedsAdminEventDetails.bgddeldevice.Visibility = Visibility.Visible;
                this.oMedsAdminEventDetails.bgddriprate.Visibility = Visibility.Collapsed;
                this.oMedsAdminEventDetails.bgdlumen.Visibility = Visibility.Collapsed;
                this.oMedsAdminEventDetails.bgdvolinf.Visibility = Visibility.Collapsed;
                this.oMedsAdminEventDetails.bgdinfrate.Visibility = Visibility.Collapsed;
                this.oMedsAdminEventDetails.bgdbagvol.Visibility = Visibility.Collapsed;
                this.oMedsAdminEventDetails.lblinfusionrate.Visibility = Visibility.Collapsed;
                this.oMedsAdminEventDetails.lblinfusionratedata.Visibility = Visibility.Collapsed;
                this.oMedsAdminEventDetails.lblbagvolume.Visibility = Visibility.Collapsed;
                this.oMedsAdminEventDetails.lblbagvolumeData.Visibility = Visibility.Collapsed;
                this.oMedsAdminEventDetails.lbllumen.Visibility = Visibility.Collapsed;
                this.oMedsAdminEventDetails.lbllumendata.Visibility = Visibility.Collapsed;
                this.oMedsAdminEventDetails.lblDeldevice.Visibility = Visibility.Visible;
                this.oMedsAdminEventDetails.lblDeldevicedata.Visibility = Visibility.Visible;
                this.oMedsAdminEventDetails.lblRouteAdminstered.Visibility = Visibility.Visible;
                this.oMedsAdminEventDetails.lblRouteAdminstered.Text = Resource.DrugDetails.lblRouteName_Text;
                this.oMedsAdminEventDetails.lblRouteAdminsteredData.Visibility = Visibility.Visible;
                this.oMedsAdminEventDetails.lblHumidification.Visibility = Visibility.Visible;
                this.oMedsAdminEventDetails.lblHumidificationData.Visibility = Visibility.Visible;
                this.oMedsAdminEventDetails.lblSiteAdministered.Visibility = Visibility.Collapsed;
                this.oMedsAdminEventDetails.lblSiteAdministereddata.Visibility = Visibility.Collapsed;
                this.oMedsAdminEventDetails.lblDoseDiscrepancyReason.Visibility = Visibility.Collapsed;
                this.oMedsAdminEventDetails.lblDoseDiscrepancyReasonData.Visibility = Visibility.Collapsed;
                this.oMedsAdminEventDetails.bgdhumidification.Visibility = Visibility.Visible;
                this.oMedsAdminEventDetails.brdHumidification.Visibility = Visibility.Visible;
                this.oMedsAdminEventDetails.brdDoseDiscrepancyReason.Visibility = Visibility.Collapsed;
                this.oMedsAdminEventDetails.brdSite.Visibility = Visibility.Collapsed;
            }
            if ((this.MezzanineDataContext != null) && (this.MezzanineDataContext.AdditionalDetails != null) && (this.MezzanineDataContext.AdditionalDetails.IsInfusion) && (this.MezzanineDataContext.AdditionalDetails.IsPGD == '1') && !this.MezzanineDataContext.AdditionalDetails.IsBolus) {
                this.oMedsAdminEventDetails.bgdinfrate.Visibility = Visibility.Visible;
                this.oMedsAdminEventDetails.brdinfrate.Visibility = Visibility.Visible;
                this.oMedsAdminEventDetails.lblinfusionrate.Visibility = Visibility.Visible;
                this.oMedsAdminEventDetails.lblinfusionratedata.Visibility = Visibility.Visible;
            }
        }
    }

  public grdinfuactchld_RowIsExpandedChanged(sender: Object, e: RowEventArgs): void {
        this.lnMedAdminOID = 0;
        this.DataContext.SelectedSlot = this.grdAdminList?.SelectedItem;
        this.grdinfuactchld_RowIsExpandedChanging(sender, e);
        this.grdAdminList.SaveChildGridSelectedIndex(e);
        if (e.Row.IsSelected == false)
            e.Row.IsSelected = true;
        this.grdAdminList_SelectionChanged({}, null);        
    }

    // TODO: REVISIT REQUIRE
    // private grdinfuactchld_RowIsExpandedChanging(sender: Object, e: RowCancelEventArgs): void {
    public grdinfuactchld_RowIsExpandedChanging(sender: Object, e: any): void {
        if (e.Row != null) {
            let oGridRow: GridViewRow = ObjectHelper.CreateType<GridViewRow>(e.Row, GridViewRow);

            if (oGridRow != null) {
              let oAdminListItem: AdminList = ObjectHelper.CreateType<AdminList>(this.grdAdminList.SelectedItem, AdminList);
              this.lnMedAdminOID = oAdminListItem.MedAdminOID;
                if (oAdminListItem != null && oGridRow.IsExpanded) {
                    if (this.MezzanineDataContext != null && this.MezzanineDataContext.SelectedSlot != null) {
                        oAdminListItem.IsAdminRowExpanded = true;
                        if (this.MezzanineDataContext.SelectedSlot.infuactchldDet != null) {
                            this.MezzanineDataContext.UpdateFauxTabDataContext("Administration");  
                        }
                        else {
                            this.MezzanineDataContext.GetInfuactchldDetl(oAdminListItem.MedAdminOID, this.MezzanineDataContext.MCVersion, 0);
                        }

                        this.objPrescriptionItemDetailsVM.getdataChild.subscribe((dt) => {
                            this.objPrescriptionItemDetailsVM.AdminList.forEach((item, index) => {
                              if (item && item.MedAdminOID == this.lnMedAdminOID && item.infuactchldDet && item.infuactchldDet.Count > 0) {
                                    item.ChildGridExtension.SetSelectedChildItem(item.SelectedChildGridIndex);
                                    item.ChildGridExtension.onCellClick = (s, e) => { this.grdinfuactchld_onCellClick(s, e) };
                                    item.ChildGridExtension.GridSelectionChange = (s, e) => { this.grdinfuactchld_SelectionChanged(item.ChildGridExtension, e); }
                                    this.QueryListCollection.push(item.ChildGridExtension.SetChildDataTemplates(dt, index));
                                }
                            });
                        });
                        this.childGridRefCollection.changes.subscribe((children) => {
                            this.grdAdminList.SetChildGridReference(children, this.QueryListCollection);
                        });
                    }
                }
                else {
                    oAdminListItem.IsAdminRowExpanded = false;
                    this.MezzanineDataContext.UpdateFauxTabDataContext("Administration");
                }
            }
        }
    }

    // TODO: REVISIT REQUIRED
    // private grdAdminList_onCellClick(sender: Object, args: LORENZO.BlueBird.Controls.GridViewCellClickEventArgs): void {
    //public grdAdminList_onCellClick(sender: any, args: CellClickEvent): void {
        //As Grid extension onCellClick is passing Sender as null, has to change usage of Sender and its contents with args parameter having GridViewCellClickEventArgs
        public grdAdminList_onCellClick(sender: any, args: GridViewCellClickEventArgs): void {
        // let sCurrCol: string = args.ColumnCell.Column.UniqueName;
        //let ChkRowExpanded = this.grdAdminList.GetRowData(sender.rowIndex).IsAdminRowExpanded;
        let ChkRowExpanded = this.grdAdminList.GetRowData(args.RowIndex).IsAdminRowExpanded;
        //if (args.originalEvent && args.originalEvent.button == 2)
         //   return;
        if (args.MouseEvents.originalEvent && args.MouseEvents.button == 2)
            return;

        //let sCurrCol: string = sender.column.UniqueName.uniqueName;
        let sCurrCol: string = args.ColumnCell.Column.UniqueName;
        // if (!ChkRowExpanded) {
            if (!this.Callbackpage) {
                if (String.Compare(sCurrCol, "historyicon", StringComparison.CurrentCultureIgnoreCase) == 0) {
                    //let oItem: AdminList = ObjectHelper.CreateType<AdminList>(this.grdAdminList.GetRowData(sender.rowIndex), AdminList);
                    let oItem: AdminList = ObjectHelper.CreateType<AdminList>(this.grdAdminList.GetRowData(args.RowIndex), AdminList);
                    if (oItem.IsHistoryExists && (!this.MezzanineDataContext.AdditionalDetails.IsInfusion || (this.MezzanineDataContext.AdditionalDetails.IsInfusion && this.MezzanineDataContext.AdditionalDetails.IsBolus))) {
                        this.Callbackpage = true;
                        if (String.IsNullOrEmpty(AppSessionInfo.AMCV))
                            AppSessionInfo.AMCV = this.MezzanineDataContext.MCVersion;
                        this.oMedsAdminSlotHistory = new MedsAdminSlotHistory();
                        this.oMedsAdminSlotHistory.onDialogClose = this.omedsadmin_Closed;
                        this.oMedsAdminSlotHistory.MedAdminOID = oItem.MedAdminOID;
                        this.oMedsAdminSlotHistory.PresSchOID = oItem.ScheduleOID;
                        this.oMedsAdminSlotHistory.PrescriptionItemOID = this.PrescriptionItemOID;
                        this.oMedsAdminSlotHistory.MCVersion = this.MCVersion;
                        let Callback = (s, e) => {
                            if (s != null) {
                                this.oMedsAdminSlotHistory = s;
                            }
                        }
                        AppActivity.OpenWindow("Administration modification history", this.oMedsAdminSlotHistory, (s, e) => { this.omedsadmin_Closed(s); }, "Administration modification history", false, 545, 630, false, WindowButtonType.Close, Callback);

                    }
                    else if (oItem.IsHistoryExists && this.MezzanineDataContext.AdditionalDetails.IsInfusion) {
                        this.Callbackpage = true;
                        let objinfstrikethroughVM: infstrikethroughVM = new infstrikethroughVM();
                        objinfstrikethroughVM.GetAllstrikethrdtl(oItem.MedAdminOID, this.MezzanineDataContext.MCVersion, () => {
                            this.Callbackpage = false;
                        });
                    }
                }
            }
        // }
        //This call is introduced to select the row any of the column cell is clicked
             this.grdAdminList_SelectionChanged([], null);
    }
    omedsadmin_Closed(args: AppDialogEventargs): void {
        args.AppChildWindow.DialogResult = true;
        this.oMedsAdminSlotHistory = ObjectHelper.CreateType<MedsAdminSlotHistory>(args.Content.Component, MedsAdminSlotHistory);
        this.Callbackpage = false;
    }

    public grdinfuactchld_RowLoaded(sender: Object, e: RowLoadedEventArgs): void {

    }

    public grdAdminList_SelectionChanged_Func = (s, e) => {
        Object.keys(that).forEach((prop) => (this[prop] = that[prop]));
        this.grdAdminList_SelectionChanged(s, e);
    }

    //TODO: REVISIT REQUIRED
    // private grdAdminList_SelectionChanged(sender: Object, e: Telerik.Windows.Controls.SelectionChangeEventArgs): void {
    public grdAdminList_SelectionChanged(sender: Object, e: RoutedEventArgs): void {
        this.DataContext.SelectedSlot = this.grdAdminList.SelectedItem;

        if (this.ftbMedsAdminTabs.itabs && this.ftbMedsAdminTabs.itabs[1] && !this.ischangerow) {
            this.DataContext.SelectedSlot._oBagDetailsVM = undefined;
            this.ischangerow = true;
            this.DataContext.SelectedAdminDetailsFauxTab = this.ftbMedsAdminTabs.itabs[1];
            let oBagDetailsView: medbagdetails = ObjectHelper.CreateType<medbagdetails>(this.DataContext.SelectedAdminDetailsFauxTab.Content, medbagdetails);

            oBagDetailsView.DataContext.getdata.subscribe(x => {
                this.ischangerow = false;
                if (oBagDetailsView.DataContext.InfBagDetails)
                    oBagDetailsView.grdbagdetails.SetBinding('data', oBagDetailsView.DataContext.InfBagDetails);
                else
                    oBagDetailsView.grdbagdetails.SetBinding('data', "");
            })
        }

        if (this.ftbMedsAdminTabs.itabs && this.ftbMedsAdminTabs.itabs[0])
            this.DataContext.SelectedAdminDetailsFauxTab = this.ftbMedsAdminTabs.itabs[0];

    }

    public grdAdminHistoryList_DataLoaded(sender: Object, e: EventArgs): void {
        if (this.grdAdminList.GetRowCount() > 0) {
            let _Index = this.grdAdminList.GetRowCount() - 1;
            this.grdAdminList.setSelectedItemByIndex(_Index);
            if (this.grdAdminList.SelectedItem != null) {
                this.grdAdminList_SelectionChanged(null, null);
            }
        }
    }

    private gridFocusTimeout() {
        if (this.grdAdminList != null && this.grdAdminList.Rows != null && this.grdAdminList.Rows.Count > 0) {
            setTimeout(() => { this.grdAdminList_GotFocus(null, null); }, 1);
        }
    }

    public grdinfuactchld_Loaded(sender: Object, e: RoutedEventArgs): void {

    }

    // public grdinfuactchld_SelectionChanged(sender: Object, e: SelectionChangeEventArgs): void {
    public grdinfuactchld_SelectionChanged(sender: Object, e: SelectionChangeEventArgs): void {
        let oAdminListItem: AdminList = ObjectHelper.CreateType<AdminList>(this.grdAdminList.SelectedItem, AdminList);
        if (oAdminListItem && oAdminListItem.IsAdminRowExpanded) {
            if (e.AddedItems != null && e.AddedItems.Count > 0) {
                if (e.AddedItems[0] != null) {
                    this.DataContext.SelectedSlot = e.AddedItems[0];
                    this.DataContext.SelectedSlot.OnInfActionRowChanged = e.AddedItems[0];
                    this.DataContext.SelectedSlot.SelectedInfAction = e.AddedItems[0];               
                }
            }
        }
        else
            this.DataContext.SelectedSlot = this.grdAdminList.SelectedItem;
    }

    public grdAdminHistoryList_RowLoaded(sender: Object, e: RowLoadedEventArgs): void {
        if (this.grdAdminList.GetRowCount() > 0) {
            let t: any = typeof (iGridViewHeaderRow)
            if (t) {
                let row: GridViewRow = ObjectHelper.CreateType<GridViewRow>(e.Row, GridViewRow);
                if (row != null) {
                    let oAdminListItem1: AdminList = ObjectHelper.CreateType<AdminList>(e.DataElement, AdminList);
                    if (oAdminListItem1 != null) {
                        row.IsExpanded = false;

                        if ((this.MezzanineDataContext != null && this.MezzanineDataContext.AdditionalDetails != null && !this.MezzanineDataContext.AdditionalDetails.IsInfusion)
                            || String.Compare(oAdminListItem1.StatusCode, CnstSlotStatus.NOTGIVEN, StringComparison.CurrentCultureIgnoreCase) == 0
                            || String.Compare(oAdminListItem1.StatusCode, CnstSlotStatus.DEFERADMINISTRATION, StringComparison.CurrentCultureIgnoreCase) == 0
                            || String.Compare(oAdminListItem1.StatusCode, CnstSlotStatus.DEFERDUE, StringComparison.CurrentCultureIgnoreCase) == 0
                            || String.Compare(oAdminListItem1.StatusCode, CnstSlotStatus.DEFEROVERDUE, StringComparison.CurrentCultureIgnoreCase) == 0
                            || String.Compare(oAdminListItem1.StatusCode, CnstSlotStatus.NOTKNOWN, StringComparison.CurrentCultureIgnoreCase) == 0
                            || (this.MezzanineDataContext != null && this.MezzanineDataContext.AdditionalDetails != null && this.MezzanineDataContext.AdditionalDetails.IsBolus == true)
                            || String.Compare(oAdminListItem1.StatusCode, CnstSlotStatus.PLANNED, StringComparison.CurrentCultureIgnoreCase) == 0
                            || String.Compare(oAdminListItem1.StatusCode, CnstSlotStatus.Deleted, StringComparison.CurrentCultureIgnoreCase) == 0
                            || String.Compare(oAdminListItem1.StatusCode, CnstSlotStatus.OMITTED, StringComparison.CurrentCultureIgnoreCase) == 0
                            || String.Compare(oAdminListItem1.StatusCode, CnstSlotStatus.HOMELEAVE, StringComparison.CurrentCultureIgnoreCase) == 0) {
                            row.IsExpandable = false;
                            oAdminListItem1.ShowGridExpander = false;
                        }
                        else if ((this.MezzanineDataContext != null && this.MezzanineDataContext.AdditionalDetails != null
                            && this.MezzanineDataContext.AdditionalDetails.IsInfusion && this.MezzanineDataContext.AdditionalDetails.IsPGD == '1')) {
                            {
                                row.IsExpandable = false;
                                oAdminListItem1.ShowGridExpander = false;
                            }
                        }
                        else {
                            row.IsExpandable = true;
                            oAdminListItem1.ShowGridExpander = true;
                        }
                    }
                }
            }
        }
    }

    public grdinfuactchld_onCellClick(sender: Object, args: GridViewCellClickEventArgs): void {

    }

}
