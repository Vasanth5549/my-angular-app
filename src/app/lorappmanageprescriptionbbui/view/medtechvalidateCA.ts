import { ObjectHelper } from 'epma-platform/helper';
import {
  AppDialogEventargs,
  AppDialogResult,
  ChildWindow,
  ObservableCollection,
  Visibility,
  WindowButtonType,
  StringComparison,
  List,
} from 'epma-platform/models';
import {
  AppActivity,
  Convert,
  iMessageBox,
  MediatorDataService,
  MessageBoxButton,
  MessageBoxResult,
  MessageBoxType,
  MessageEventArgs,
} from 'epma-platform/services';
import {
  CListItem
} from 'src/app/shared/epma-platform/models/model';
import { ProfileData } from '../utilities/profiledata';
import { Resource } from '../resource';
import { PrescriptionItemVM } from '../viewmodel/PrescriptionItemVM';
import {
  CommonFlags,
  QueryStringInfo,
} from '../utilities/globalvariable';
import DateTime from 'epma-platform/DateTime';
import {
  iTabItem,
  FrameworkElement,
  iDateTimePicker,
  MouseButtonEventArgs,
  Grid,
  iButton,
  DataTemplate,
} from 'epma-platform/controls';
import {
  GridComponent, GridDataResult, PageChangeEvent, RowArgs, RowClassArgs
} from '@progress/kendo-angular-grid';
import {
  DateChangedArgs,
  EventArgs
} from 'src/app/shared/epma-platform/controls/Control';

import { MedChartData } from 'src/app/lorappmedicationcommonbb/utilities/globalvariable';
import { Busyindicator } from 'src/app/lorappcommonbb/busyindicator';
import { PrescriptionHelper } from '../utilities/prescriptionhelper';
import {
  GridExtension,
  GridViewCell,
  GridViewCellClickEventArgs,
  GridViewColumn,
  GridViewRow,
  PRNColorList,
  RowEventArgs,
  RowLoadedEventArgs,
  SelectionChangeEventArgs
} from 'src/app/shared/epma-platform/controls/epma-grid-helpers/grid-extension';
import { meddispensinginstructions } from './dispensinginstruction';
import { medtechvalProdOpt } from './medtechvalprodopt';
import { medsupplydispensinginstructionstab } from './medsupplydispensinginstructionstab';
import { ContextInfo, PatientContext } from 'src/app/lorappcommonbb/utilities/globalvariable';
import { AppActivityBB } from 'src/app/lorappcommonbb/appactivitybb';
import { CConstants, PrescriptionTypes } from '../utilities/constants';
import { CommonBB } from 'src/app/lorappcommonbb/utilities/common';
import { MedicationCommonBB } from 'src/app/lorappmedicationcommonbb/utilities/medicationcommonbb';
import { CSequentialHelper } from '../utilities/CSequentialHelper';
import { TechvalidateCAVM } from '../viewmodel/TechvalidateCAVM';
import { TechValidateVM } from '../viewmodel/TechValidateVM';
import { SupplyDispensingInstructionsVM } from '../viewmodel/SupplyDispensingInstructionsVM';
import { medsupplydispensinginstructions } from './medsupplydispensinginstructions';
import { CustomTechValidatedItem } from '../viewmodel/customtechvalidateditem';
import { DispensingInstructionsVM } from '../viewmodel/dispensinginstructionsvm';
import * as ManagePrescSer from 'src/app/shared/epma-platform/soap-client/ManagePrescriptionWS';
import { DateChangeEventArgs } from 'src/app/shared/epma-platform/controls/epma-datetimepicker/epma-datetimepicker.component';
import { RoutedEventArgs } from 'src/app/shared/epma-platform/controls/FrameworkElement';
import { AfterViewInit, Component, ElementRef, HostListener, Input, OnInit, QueryList, TemplateRef, ViewChild, ViewChildren } from '@angular/core';
import { Canvas } from 'src/app/shared/epma-platform/controls/epma-canvas/epma-canvas.component';
import * as ControlStyles from "../../shared/epma-platform/controls/ControlStyles";
import { medddetailsChild } from 'src/app/lorappmedicationcommonbb/child/medddetailschild';
import { SVIconLaunchFrom } from 'src/app/lorappmedicationcommonbb/utilities/constants';
import { AnimationDirection, AnimationType, Offset, PopupAnimation, PopupComponent } from '@progress/kendo-angular-popup';
import { TechnicallyValidateCAVM } from '../ca/technicallyvalidate/technicallyvalidatecavm';
import { DisplayOtherInformationLineItemPipe } from 'src/app/product/shared/pipes/medicationconverters.pipe';
import * as _ from 'lodash';

const VIRTUAL_ROW_PAGESIZE = 20;
const VIRTUAL_ROW_SKIP = 0;


@Component({
    selector: 'medTechvalidateCA',
    templateUrl: './medTechvalidateCA.html',
    styleUrls: ['./medTechvalidateCA.css']
})

export class medTechvalidateCA extends AppActivityBB implements OnInit, AfterViewInit {
    grdTechValItem : GridExtension = new GridExtension();
    grdTecValItmChld : GridExtension = new GridExtension();
    
    public image1Enabled = './assets/images/MPAD_OkHOT.png';
    public image1Disabled = "./assets/images/MPAD_OkDIS.gif";
    public image2Enabled = './assets/images/inewcancel.png';
    public image2Disabled = './assets/images/inewcanceldis.png';
    public displayButton = { button1Enable: true, button2Enable: true};
    public localProfileData: any;
    private LgndClickCount: number = 0;
    private _PopupParent: FrameworkElement;
    oIPVM: PrescriptionItemVM;
    PageDataContext: PrescriptionItemVM;
    oPrsItmVM: PrescriptionItemVM;
    oPrescItemVM: PrescriptionItemVM;
    private omedtechvalProdOpt: medtechvalProdOpt;
    private oChildWindow: ChildWindow;
    private oSupInst: medsupplydispensinginstructionstab;
    private oProdOpt: medtechvalProdOpt;
    oItem: PrescriptionItemVM;
    private _MsgBoxTitle: string;
    private _IsDeactivatedPerscItem: boolean = false;
    private bMultiDispSup: boolean = false;
    private bMultiCompChild: boolean = false;
    private odisInst: meddispensinginstructions;
    private bCDItemEnable: boolean = false;
    msgBoxDeactivatedDrug: iMessageBox;
    public bChildSupplyDispClick: boolean = true;
    public bChildSupplyDispFirstLoad: boolean = true;
    ddetChild: medddetailsChild;
    oTechValCAVM: TechnicallyValidateCAVM;
    TechValidate = Resource.TechValidate;
    whiteBorder: string | object = ControlStyles.whiteBorder;
    public showLegendPopup: boolean = false;
    public CheckPermission: boolean;


    public override _DataContext: any;
    override get DataContext() {
        return this._DataContext;
        }
    
        @Input() override set DataContext(value: any) {
        this._DataContext = value;
        }

    private LayoutRoot: Grid;
    @ViewChild("LayoutRootTempRef", {read:Grid, static: false }) set _LayoutRoot(c: Grid ){
        if(c){ this.LayoutRoot  = c; }
    };
    private SeedCanvas: Canvas;
    @ViewChild("SeedCanvasTempRef", {read:Canvas, static: false }) set _SeedCanvas(c: Canvas ){
        if(c){ this.SeedCanvas  = c; }
    };
    // private popup: PopupComponent;
    // @ViewChild("popupTempRef", {read: PopupComponent, static: false }) set _popup(c: PopupComponent ){
    //     if(c){ this.popup  = c; }
    // };
    @ViewChild("popupTempRef", { read: ElementRef }) public popup: ElementRef;
    @ViewChild("grdTechValItemTempRef", {read:GridComponent, static: false }) set _grdTechValItem(c: GridComponent ){
        if(c){ 
            this.grdTechValItem.grid  = c; 
            this.grdTechValItem.columns = c.columns;
        }
    };

    childGridRefCollection: QueryList<GridComponent>;
    @ViewChildren('grdTecValItmChldTempRef', { read: GridComponent }) set _grdTecValItmChldTempRef(v: QueryList<GridComponent>) {
        if (v) {
          this.childGridRefCollection = v;
        }
    }
        
	// @ViewChild("grdTecValItmChldTempRef", {static: false }) grdTecValItmDetailGrid!: GridComponent;
	// @ViewChildren("grdTecValItmChldTempRef") ChildGrids!: QueryList<any>;
        private cmdDispensingInstr: iButton;
        @ViewChild("cmdDispensingInstrTempRef", {read:iButton, static: false }) set _cmdDispensingInstr(c: iButton ){
            if(c){ this.cmdDispensingInstr  = c; }
        };
        private cmdMedAdmin: iButton;
        @ViewChild("cmdMedAdminTempRef", {read:iButton, static: false }) set _cmdMedAdmin(c: iButton ){
            if(c){ this.cmdMedAdmin  = c; }
        };
        private showIcon: iButton;
        @ViewChild("showIconTempRef", {read:iButton, static: false }) set _showIcon(c: iButton ){
            if(c){ this.showIcon  = c; }
        };

        @ViewChildren('grdTechValItemDTTempRef') grdTechValItemDT: QueryList<DataTemplate>;

        childDataTemplates: QueryList<DataTemplate>;
        @ViewChildren('grdTecValItmChldDTTempRef', { read: DataTemplate }) set _childDataTemplates(v: QueryList<DataTemplate>) {
          if (v) {
            this.childDataTemplates = v;
          }
        }

        @ViewChild('dialogActions') dialogTemplate: TemplateRef<any>;

        constructor() {
            super();
        }

        ngOnInit() {
            MediatorDataService.cancelClick.subscribe((data) => {this.showLegendPopup = false});
            this.grdTechValItem.RowIndicatorVisibility = Visibility.Visible;
            this.oTechValCAVM = (ObjectHelper.CreateType<TechnicallyValidateCAVM>(this.DataContext, TechnicallyValidateCAVM));
            if (this.oTechValCAVM != null) {
                if (PatientContext.PrescriptionType == PrescriptionTypes.ForAdministration || PatientContext.PrescriptionType == PrescriptionTypes.Inpatient)
                    this.oTechValCAVM.oPrescItemVM.PrescriptionType = Resource.TechValidate.ForAdmin;
                else if (PatientContext.PrescriptionType == PrescriptionTypes.Discharge)
                    this.oTechValCAVM.oPrescItemVM.PrescriptionType = Resource.TechValidate.Discharge;
                else if (PatientContext.PrescriptionType == PrescriptionTypes.Outpatient)
                    this.oTechValCAVM.oPrescItemVM.PrescriptionType = Resource.TechValidate.Outpatient;
                else if (PatientContext.PrescriptionType == PrescriptionTypes.Clerking)
                    this.oTechValCAVM.oPrescItemVM.PrescriptionType = Resource.TechValidate.Clerking;
                else if (PatientContext.PrescriptionType == PrescriptionTypes.Leave)
                    this.oTechValCAVM.oPrescItemVM.PrescriptionType = Resource.TechValidate.Leave;
                this.DataContext = this.oTechValCAVM.oPrescItemVM;
                ContextInfo.MenuCode = CConstants.TechnicallyValidateMenuCode;
            }
            this.grdTechValItem.GridSelectionChange = (s, e) => { this.grdTechValItem_SelectionChanged(s, e)};
            this.grdTechValItem.onCellClick = (s, e) => { this.grdTechValItem_onCellClick(s, e)};
            this.grdTechValItem.RowExpandedChanged = (s, e) => { this.grdTechValItem_RowIsExpandedChanged(s, e)};
        }

        QueryListCollection: any [] = [];
        isScrollingStarted:boolean = true;
        public maxGridHeight;

        ngAfterViewInit(): void {
            this.maxGridHeight =(window.screen.height < 1000 && window.devicePixelRatio != 1.25) ? true : false;
            if(window.screen.height > 1000 && window.devicePixelRatio != 1.25){
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
                ))))
                {
                    // alert("chart");
                    this.maxGridHeight = false;
                }
                else{
                    // alert("direct");
                    this.maxGridHeight = true;
                }
            }
            this.grdTechValItem.GenerateColumns();
            this.medTechvalidateCA_Loaded({},{});
            this.DataContext.FormViewerDetails.TechvalidateCADetails.PropertyChanged = (s, e) => {
                if (e.PropertyName == 'PresTechValidatedItems') {
                    this.SetParentChildGridData();
                }
            }
            this.oTechValCAVM.PropertyChanged = (s, e) => {
                if (e.PropertyName == 'AsRequiredSlotsColor') {
                    if (this.PRNIndexList.length > 0) {
                        this.PRNIndexList.forEach((item) => {
                           this.grdTechValItem.SetRowStyle(item.e, MedChartData.AsRequiredSlotsColor.color, 'Background', true);     
                        });
                    }
                }
                this.PRNIndexList = [];
            }
        }

        SelectRow(rowIndex, row, isParent) {
            let e: SelectionChangeEventArgs = {};
            let addedItems: List = new List();
            if (!isParent) {
                addedItems.Add(row?.PresTechValidatedItemsChild[rowIndex]);
                e.AddedItems = addedItems;
                row.ChildGridExtension.selectedRowsIndex = [rowIndex];
                this.grdTecValItmChld_SelectionChanged({}, e);
            }
            else {
                addedItems.Add(row);
                e.AddedItems = addedItems;
                this.grdTechValItem.selectedRowsIndex = [rowIndex];
                this.grdTechValItem_SelectionChanged({}, e);
            }
        }
        
        scrollEvent(event) {
            let startingIndex = this.grdTechValItemDT.first.index;
            for (let i = startingIndex; i < startingIndex + VIRTUAL_ROW_PAGESIZE; i++) {
                let context = { 
                    dataItem: this.DataContext.FormViewerDetails.TechvalidateCADetails.PresTechValidatedItems[i], 
                    index: i 
                };
                this.grdTechValItemRowLoaded(context);
            }
        }

        private SetParentChildGridData() {
            // Busyindicator.SetStatusBusy('MedTechValidateCA');
            // this.grdTechValItem.SetBinding('data', this.DataContext.FormViewerDetails.TechvalidateCADetails.PresTechValidatedItems);
            this.data = this.DataContext.FormViewerDetails.TechvalidateCADetails.PresTechValidatedItems;
            this.grdTechValItem.ItemsSource = this.data;
            this.LoadTechValidateData();
            this.grdTechValItem.OpenAllChildGrids(this.DataContext.FormViewerDetails.TechvalidateCADetails.PresTechValidatedItems);
            this.childDataTemplates.changes.subscribe((dt) => {
                this.DataContext.FormViewerDetails.TechvalidateCADetails.PresTechValidatedItems.forEach((item, index) => {
                    if (item.PresTechValidatedItemsChild.Count > 0) {
                        // item.ChildGridExtension.IsSynchronizedWithCurrentItem = true;
                        // item.ChildGridExtension.selectedRowIndex = [0];
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

        public gridView: GridDataResult;
        public pageSize = VIRTUAL_ROW_PAGESIZE;
        public skip = VIRTUAL_ROW_SKIP;
        public data = new ObservableCollection<any>();

        public VirtualRowChange(event: PageChangeEvent): void {
            this.skip = event.skip;
            this.LoadTechValidateData();
        }

        private LoadTechValidateData(): void {
            this.gridView = {
                data: this.data.array.slice(this.skip, this.skip + this.pageSize),
                total: this.data.array.length,
            };
        }
        grdTechValItemRowLoaded(context: any) {
            let rowEventArgs = this.grdTechValItem.GetRowEventArgs(this.grdTechValItemDT, context, false, true);
            this.grdTechValItem_RowLoaded({}, rowEventArgs);
            if (context.index == this.DataContext.FormViewerDetails.TechvalidateCADetails.PresTechValidatedItems.Count - 1) {
                Busyindicator.SetStatusIdle('MedTechValidateCA');
            }
        }

        grdTecValItmChldRowLoaded(context: any, dataItemChild: any) {
            let newContext = {
                index: context['index'],
                dataItem: dataItemChild
            }
            this.QueryListCollection.forEach((item) => {
                let rowEventArgs = dataItemChild.ChildGridExtension.GetRowEventArgs(item, newContext, true);
                this.grdTecValItmChld_RowLoaded({}, rowEventArgs);
            });
        }

        rowCallback = (context: RowClassArgs) => {
            let rowStyles = this.grdTechValItem.getRowStyles(context);
            let PRNStyles = this.GetPRNColor(context)
            return {...rowStyles,...PRNStyles};
        };

        public oMsg_AlertBoxPromtNextClose(sender: Object, e: MessageEventArgs): void {
            if (e.MessageBoxResult == MessageBoxResult.OK) {
                // ObjectHelper.stopFinishAndCancelEvent(false);
                if (this.oIPVM != null) {
                    this.oIPVM.IsNextSupply = false;
                }
            }
        }
        displayHierarchicalBtn(dataItem: any): boolean {
            return dataItem.PresTechValidatedItemsChild && dataItem.PresTechValidatedItemsChild.Count > 0;
        }
        dtpDate_OnDateValueChgChild_Func = (s, e) => { this.dtpDate_OnDateValueChgChild(s, e)}
        dtpDate_OnDateValueChgChild(sender: Object, e: DateChangedArgs): void {
            if ((<iDateTimePicker>(sender)).SelectedDateTime != DateTime.MinValue) {
                let oPrescItemVM: PrescriptionItemVM = ObjectHelper.CreateType<PrescriptionItemVM>((<FrameworkElement>(sender)).DataContext, PrescriptionItemVM);
                if (oPrescItemVM != null && oPrescItemVM.bAvoidNextSupplyFirsttime && oPrescItemVM.FormViewerDetails != null && oPrescItemVM.FormViewerDetails.BasicDetails != null && oPrescItemVM.FormViewerDetails.BasicDetails.ParentMCIItem != null) {
                    oPrescItemVM.FormViewerDetails.BasicDetails.ParentMCIItem.EnableParentMCIItem = false;
                }
            }
            else {
                let oPrescItemVM: PrescriptionItemVM = ObjectHelper.CreateType<PrescriptionItemVM>((<FrameworkElement>(sender)).DataContext, PrescriptionItemVM);
                if (oPrescItemVM != null && oPrescItemVM.bAvoidNextSupplyFirsttime && oPrescItemVM.FormViewerDetails != null && oPrescItemVM.FormViewerDetails.BasicDetails != null && oPrescItemVM.FormViewerDetails.BasicDetails.ParentMCIItem != null && oPrescItemVM.FormViewerDetails.BasicDetails.ParentMCIItem.PresTechValidatedItemsChild != null) {
                    let cPTICint: number = oPrescItemVM.FormViewerDetails.BasicDetails.ParentMCIItem.PresTechValidatedItemsChild.IndexOf(this.oItem);
                    let cint: number = 0;
                    for (let iCnt: number = 0; iCnt < oPrescItemVM.FormViewerDetails.BasicDetails.ParentMCIItem.PresTechValidatedItemsChild.Count; iCnt++) {
                        if (iCnt != cPTICint) {
                            if (oPrescItemVM.FormViewerDetails.BasicDetails.ParentMCIItem.PresTechValidatedItemsChild[iCnt].FormViewerDetails.BasicDetails.NextSupplyDate != DateTime.MinValue) {
                                cint = cint + 1;
                            }
                        }
                    }
                    if (cint >= 1) {
                        oPrescItemVM.FormViewerDetails.BasicDetails.ParentMCIItem.EnableParentMCIItem = false;
                    }
                    else {
                        if (oPrescItemVM.FormViewerDetails.BasicDetails.ParentMCIItem != null && !String.IsNullOrEmpty(oPrescItemVM.FormViewerDetails.BasicDetails.ParentMCIItem.ItemSubType) && String.Equals(oPrescItemVM.FormViewerDetails.BasicDetails.ParentMCIItem.ItemSubType, "CC_MULCMPNTITM", StringComparison.InvariantCultureIgnoreCase) && oPrescItemVM.FormViewerDetails.BasicDetails.ParentMCIItem.PresTechValidatedItemsChild != null && oPrescItemVM.FormViewerDetails.BasicDetails.ParentMCIItem.PresTechValidatedItemsChild.Count > 0 && ((oPrescItemVM.FormViewerDetails.BasicDetails.ParentMCIItem.FormViewerDetails.MulticomponentDetails != null && oPrescItemVM.FormViewerDetails.BasicDetails.ParentMCIItem.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo != null && oPrescItemVM.FormViewerDetails.BasicDetails.ParentMCIItem.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo.Count > 0 && oPrescItemVM.FormViewerDetails.BasicDetails.ParentMCIItem.FormViewerDetails.MulticomponentDetails.oMCItemBasicInfo.Count == oPrescItemVM.FormViewerDetails.BasicDetails.ParentMCIItem.PresTechValidatedItemsChild.Count) || (!String.IsNullOrEmpty(ContextInfo.MenuCode) && String.Equals(ContextInfo.MenuCode, CConstants.TechnicallyValidateMenuCode, StringComparison.InvariantCultureIgnoreCase))) && oPrescItemVM.FormViewerDetails.BasicDetails.ParentMCIItem.PresTechValidatedItemsChild.All(x => x.FormViewerDetails != null && x.FormViewerDetails.BasicDetails != null && String.IsNullOrEmpty(x.FormViewerDetails.BasicDetails.Supplycomments)) && oPrescItemVM.FormViewerDetails.BasicDetails.ParentMCIItem.PresTechValidatedItemsChild.All(x => x.SelectedSupplyreq != null && x.SelectedSupplyreq.Value.Equals(Resource.TechValidate.Empty)) && oPrescItemVM.FormViewerDetails.BasicDetails.ParentMCIItem.PresTechValidatedItemsChild.All(x => x.FormViewerDetails != null && x.FormViewerDetails.BasicDetails != null && x.FormViewerDetails.BasicDetails.SelectedsupplyInstruction == null || x.FormViewerDetails.BasicDetails.SelectedsupplyInstruction.Count == 0)) {
                            oPrescItemVM.FormViewerDetails.BasicDetails.ParentMCIItem.EnableParentMCIItem = true;
                        }
                    }
                }
            }
        }
        public dtpDate_OnDateValueChgParent_Func = (s, e) => { this.dtpDate_OnDateValueChgParent(s, e)};
        private dtpDate_OnDateValueChgParent(sender: Object, e: DateChangedArgs): void {
            let oDTPicker: FrameworkElement = ObjectHelper.CreateType<FrameworkElement>(sender, FrameworkElement);
            if (oDTPicker != null) {
                let item: PrescriptionItemVM = ObjectHelper.CreateType<PrescriptionItemVM>(oDTPicker.DataContext, PrescriptionItemVM);
                if (item != null) {
                    if ((<iDateTimePicker>(sender)).SelectedDateTime != DateTime.MinValue) {
                        if (item != null && item.bAvoidNextSupplyFirsttime && item.PresTechValidatedItemsChild != null && item.PresTechValidatedItemsChild.Count > 0 && item.PresTechValidatedItemsChild.All(x => x.FluidPrescribableItemListOID == 0)) {
                            item.PresTechValidatedItemsChild.forEach( (child)=> {
                                child.EnableChildMCIComp = false;
                            });
                        }
                    }
                    else {
                        if (item.bAvoidNextSupplyFirsttime && item.FormViewerDetails != null && item.FormViewerDetails.BasicDetails != null && item.FormViewerDetails.BasicDetails.ParentMCIItem == null && String.Equals(item.FormViewerDetails.BasicDetails.SupplyInsTextWithComments, Resource.MedicationForm.lblSupplyInstructionsText_Tooltip, StringComparison.InvariantCultureIgnoreCase) && ((item.FormViewerDetails.BasicDetails.SelectedsupplyInstruction == null) || (item.FormViewerDetails.BasicDetails.SelectedsupplyInstruction != null && item.FormViewerDetails.BasicDetails.SelectedsupplyInstruction.Count == 0))) {
                            if (item.PresTechValidatedItemsChild != null && item.PresTechValidatedItemsChild.Count > 0 && item.SelectedSupplyreq != null && String.Equals(item.SelectedSupplyreq.Value, Resource.TechValidate.Empty)) {
                                item.PresTechValidatedItemsChild.forEach( (child)=> {
                                    child.EnableChildMCIComp = true;
                                });
                            }
                        }
                    }
                }
            }
        }
        dtpDate_OnDateChange_Func = (s, e) => { this.dtpDate_OnDateChange(s, e); }
  private dtpDate_OnDateChange(sender: Object, e: DateChangeEventArgs): void {
    let dt: DateTime = DateTime.MinValue;
    let Valchk: boolean = false;
   
    if (
      sender != null &&
      !String.IsNullOrEmpty(e.DateValue.ToString()) &&
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
        //   ObjectHelper.stopFinishAndCancelEvent(true);
          oMsg.MessageButton = MessageBoxButton.OK;
          oMsg.IconType = MessageBoxType.Information;
          oMsg.MessageBoxClose = (s, e) => {
            this.oMsg_AlertBoxPromtNextClose(s, e);
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
       
        }
      }
    }
    if (this.oIPVM != null && !Valchk) {
      this.oIPVM.IsNextSupply = false;
    }
  }
        private TechCASupplyInstrClickEve(SelectedItem: PrescriptionItemVM): void {
            if (SelectedItem != null && SelectedItem.FormViewerDetails != null && SelectedItem.FormViewerDetails.BasicDetails != null) {
                SelectedItem.FormViewerDetails.BasicDetails.RHSSupplyInstrIconTooltip = true;
                SelectedItem.FormViewerDetails.BasicDetails.TechsupplyInstText = null;
                if (SelectedItem.TechValidatedItems != null && SelectedItem.TechValidatedItems.Count > 0) {
                    let prodcount: number = SelectedItem.TechValidatedItems.Count;
                    for (let i: number = 0; i < prodcount; i++) {
                        if (!String.IsNullOrEmpty(SelectedItem.TechValidatedItems[i].ProdSupplyInsWithComments)) {
                            SelectedItem.FormViewerDetails.BasicDetails.TechsupplyInstText = SelectedItem.TechValidatedItems[i].ProdSupplyInsWithComments;
                            break;
                        }
                    }
                }
                // this.grdTechValItem.Rebind();              
      
                let medotherdisplaypipe = new DisplayOtherInformationLineItemPipe();

                SelectedItem.MedOtherDisplay = medotherdisplaypipe.transform(SelectedItem, '', 0,'');

                SelectedItem.mode = 'update';


                this.grdTechValItem.UpdateLayout();
                this.grdTechValItem.ScrollIntoView(SelectedItem);
            }
        }
        cmdMedAdmin_Click(sender: Object, e: RoutedEventArgs): void {
             MedicationCommonBB.LaunchMedChart(PatientContext.PatientOID, PatientContext.EncounterOid, PatientContext.EncounterType, Resource.TechValidate.TecVal);
        }
        cmdDispensingInstr_Click(sender: Object, e: RoutedEventArgs): void {
            let oPrescItemVM: PrescriptionItemVM = ObjectHelper.CreateType<PrescriptionItemVM>(this.DataContext, PrescriptionItemVM);
            if (oPrescItemVM != null && oPrescItemVM.formViewerDetails != null && oPrescItemVM.formViewerDetails.TechvalidateCADetails != null) {
                oPrescItemVM.FormViewerDetails.TechvalidateCADetails.sdischargeinslaunch = true;
            }
            this.odisInst = new meddispensinginstructions();
            // ObjectHelper.stopFinishAndCancelEvent(true);
	        this.odisInst.cosntructorimpl(oPrescItemVM);
            let dialogWindowHeight = (700/window.devicePixelRatio);
            AppActivity.OpenWindow(Resource.Dispensinginstruction.sTitle, this.odisInst,  (s, e) => {
        this.dispensinginstruction_Close(s);
      }, " ", false, dialogWindowHeight, 750, false, WindowButtonType.OkCancel, null);
        }
        dataGridRow: GridViewRow;
        PRNIndexList: any = [];
        grdTechValItem_RowLoaded(sender: Object, e: RowLoadedEventArgs): void {
            if (e.Row != null && e.DataElement != null) {
                let oTech: PrescriptionItemVM = ObjectHelper.CreateType<PrescriptionItemVM>(e.DataElement, PrescriptionItemVM);
                if (oTech != null && oTech.FormViewerDetails != null && oTech.FormViewerDetails.BasicDetails != null && (oTech.FormViewerDetails.BasicDetails.AsRequired || String.Equals(oTech.FormViewerDetails.BasicDetails.Direction, CConstants.AsNeeded, StringComparison.InvariantCultureIgnoreCase))) {
					//e.Row.Background = new SolidColorBrush(MedChartData.AsRequiredSlotsColor); PRN Yellow Background Bug 45006
				//	e.dataItem['RowStyles'].push('AsRequiredSlotsColor');
                    this.PRNIndexList.push({index: e.index, e: e});
                    if (MedChartData.AsRequiredSlotsColor)
                        //this.grdTechValItem.SetRowStyle(e, MedChartData.AsRequiredSlotsColor.color, 'Background', true);
                    e.Row.IsAlternating = false;
                }
                if (oTech != null && (String.Equals(oTech.IsDeactivate, "Y", StringComparison.InvariantCultureIgnoreCase)) || (oTech.IsGroupHeader)) {
                    if (e.Row.Cells != null && Object.keys(e.Row.Cells).length > 0 && Object.keys(e.Row.Cells).length >= 9) {
                        e.Row.Cells[5].IsEnabled = false;
                        e.Row.Cells[6].IsEnabled = false;
                        e.Row.Cells[7].IsEnabled = false;
                        e.Row.Cells[8].IsEnabled = false;
                        if (Object.keys(e.Row.Cells).length == 10) {
                            e.Row.Cells[9].IsEnabled = false;
                        }
                        if (oTech.IsGroupHeader) {
                            if (oTech.IsFirstHeader) {
                                e.dataItem['RowStyles'].push('PART_RowBordeTOP');
                            }
                            if (PatientContext.PrescriptionType == PrescriptionTypes.ForAdministration || PatientContext.PrescriptionType == PrescriptionTypes.Inpatient) {
                                // let dtpNextSupply: iDateTimePicker = e.Row.ChildrenOfType<iDateTimePicker>().Where(c => c.Name == "dtpNextSupplyDate").FirstOrDefault();
                                // if (dtpNextSupply != null) {
                                //     dtpNextSupply.Visibility = Visibility.Collapsed;
                                // }
                            }
                            this.dataGridRow = ObjectHelper.CreateType<GridViewRow>(e.Row, GridViewRow);
                            if (oTech.FormViewerDetails.BasicDetails.InfusionDetails.GroupSequenceNo > 0) {
                                // e.Row.Background = new SolidColorBrush(Color.FromArgb(255, 118, 179, 180));
                                e.dataItem['RowStyles'].push('Background_Blue');
                            }
                            else {
                                e.dataItem['RowStyles'].push('GroupHeader');
                            }
                            e.Row.IsHitTestVisible = false;
                            e.Row.IsAlternating = false;
                            oTech.SupDisText = String.Empty;
                            oTech.supToolTipDisText = String.Empty;
                            oTech.ProdOpt = String.Empty;
                        }
                    }
                }
                if (CSequentialHelper.IsFirstSequentialInfusionHeader(oTech, ObjectHelper.CreateType<ObservableCollection<PrescriptionItemVM>>(this.grdTechValItem.ItemsSource, ObservableCollection<PrescriptionItemVM> ))) {
                  e.dataItem['RowStyles'].push('PART_RowBordeTOP_Blue');
                    // let rowBorder1: Border = e.Row.ChildrenOfType<Border>().Where(c => c.Name == "PART_RowBordeTOP").FirstOrDefault();
                    // if (rowBorder1 != null) {
                    //     rowBorder1.Visibility = Visibility.Visible;
                    //     rowBorder1.BorderBrush = new SolidColorBrush(Color.FromArgb(255, 63, 72, 204));
                    //     rowBorder1.BorderThickness = new Thickness(0, 2, 0, 0);
                    // }
                }
                if (CSequentialHelper.IsLastSequentialInfusionItem(oTech, ObjectHelper.CreateType<ObservableCollection<PrescriptionItemVM>>(this.grdTechValItem.ItemsSource, ObservableCollection<PrescriptionItemVM> ))) {
                    // let rowBorder1: Border = e.Row.ChildrenOfType<Border>().Where(c => c.Name == "PART_RowBorder").FirstOrDefault();
                    // rowBorder1 != null && (String.IsNullOrEmpty(oTech.PrescriptionItemStatus) || 
                    if (!oTech.PrescriptionItemStatus.Equals(CConstants.CANCELLED, StringComparison.OrdinalIgnoreCase) && !oTech.PrescriptionItemStatus.Equals(CConstants.DISCONTINUED, StringComparison.OrdinalIgnoreCase) && !oTech.PrescriptionItemStatus.Equals(CConstants.COMPLETED, StringComparison.OrdinalIgnoreCase)) {
                        // rowBorder1.Visibility = Visibility.Visible;
                        // rowBorder1.BorderBrush = new SolidColorBrush(Color.FromArgb(255, 63, 72, 204));
                        // rowBorder1.BorderThickness = new Thickness(0, 0, 0, 2);
                        e.dataItem['RowStyles'].push('PART_RowBorderBOTTOM_Blue');
                    }
                }
                this.cmdDispensingInstr.IsEnabled = true;
                if (oTech != null && (!String.Equals(oTech.ItemSubType, CConstants.SUBTYPE, StringComparison.InvariantCultureIgnoreCase))) {
                    let dataGridRow: GridViewRow = ObjectHelper.CreateType<GridViewRow>(e.Row, GridViewRow);
                    dataGridRow.IsExpandable = false;
                }
                if (oTech != null && !String.IsNullOrEmpty(oTech.ItemSubType) && (String.Equals(oTech.ItemSubType, CConstants.SUBTYPE, StringComparison.InvariantCultureIgnoreCase))) {
                    let dataGridRow: GridViewRow = ObjectHelper.CreateType<GridViewRow>(e.Row, GridViewRow);
                    dataGridRow.IsExpanded = true;
                }
            }
            else this.cmdDispensingInstr.IsEnabled = false;
        }
        private grdTechValItem_onCellClick(sender: Object, args: GridViewCellClickEventArgs): void {
            //Fix for 52204
            //if (args.ColumnCell.DataContext.IsDeactivate == 'N') {
            let sCurrCol: string = args.ColumnCell.Column.UniqueName;
            if (args.RowIndex != -1) {
                this.oItem = ObjectHelper.CreateType<PrescriptionItemVM>(this.grdTechValItem.GetRowData(args.RowIndex), PrescriptionItemVM);
                this.oItem.FormViewerDetails.BasicDetails.TechCASupplyInstrClick  = (s,e) => { this.TechCASupplyInstrClickEve(s); } ;
            }
            if (this.oItem != null) {
                this.oItem.bAvoidNextSupplyFirsttime = true;
            }
            //52204 condition is added here
            if (this.oItem != null && this.oItem.EnableParentMCIItem && (args.ColumnCell.DataContext.IsDeactivate == 'N' && String.Compare(sCurrCol, "Comments", StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(sCurrCol, "ProductOption", StringComparison.CurrentCultureIgnoreCase) == 0) || String.Compare(sCurrCol, "ViewDetails", StringComparison.CurrentCultureIgnoreCase) == 0) {

                let lstPrescriptionItemVM: ObservableCollection<Object> = new ObservableCollection<Object>();
                if (args.RowIndex != -1) {
                    this.oItem = ObjectHelper.CreateType<PrescriptionItemVM>(this.grdTechValItem.GetRowData(args.RowIndex), PrescriptionItemVM);
                    this.oItem.IsTechValidate = true;
                    if (this.oItem.FormViewerDetails.TechvalidateCADetails == null) {
                        this.oItem.FormViewerDetails.TechvalidateCADetails = new TechvalidateCAVM();
                        this.oItem.FormViewerDetails.TechvalidateCADetails = this.oPrescItemVM.FormViewerDetails.TechvalidateCADetails;
                    }
                    if ((String.Compare(sCurrCol, Resource.TechValidate.Comnts, StringComparison.CurrentCultureIgnoreCase) == 0) && !this.oItem.IsSupDispEnable) {
                        this.oItem.IsSupDispEnable = false;
                    }
                    this.bChildSupplyDispClick = false;
                    if (this.oItem.FormViewerDetails != null && this.oItem.FormViewerDetails.TechvalidateCADetails != null)
                        this.oItem.FormViewerDetails.TechvalidateCADetails.IsMciChildSelected = false;
                    lstPrescriptionItemVM.Add(this.oItem);
                    if (String.Compare(sCurrCol, Resource.TechValidate.ProOpt, StringComparison.CurrentCultureIgnoreCase) == 0) {
                        this.oProdOpt = new medtechvalProdOpt();
                        this.oProdOpt.constructorMedtechvalProdOpt(this.oItem);
                        AppActivity.OpenWindow(Resource.TechValidate.Title_Prod, this.oProdOpt, (s, e) => {
                            this.ProductOption_Close(s);
                          }, Resource.TechValidate.ProdOpt, false, 695, 750, false, WindowButtonType.OkCancel, null);
                    }
                    else if (String.Compare(sCurrCol, Resource.TechValidate.ViewDet, StringComparison.CurrentCultureIgnoreCase) == 0 && this.oItem.FluidPrescribableItemListOID == 0) {
                        this.oItem = ObjectHelper.CreateType<PrescriptionItemVM>(this.grdTechValItem.GetRowData(args.RowIndex), PrescriptionItemVM);
                        if (this.oItem instanceof PrescriptionItemVM) {
                            if (!this.oItem.IsGroupHeader) {
                                this.ddetChild = new medddetailsChild();
                                this.ddetChild.MedDetailsUserControl.PrescriptionItemOID = this.oItem.PrescriptionItemOID;
                                this.ddetChild.MedDetailsUserControl.MCVersion = this.oItem.FormViewerDetails.BasicDetails.MCVersion;
                                this.ddetChild.MedDetailsUserControl.ServiceOID = MedChartData.ServiceOID;
                                this.ddetChild.MedDetailsUserControl.LocationOID = MedChartData.LocationOID;
                                this.ddetChild.MedDetailsUserControl.oLaunchFrom = SVIconLaunchFrom.TechVal;
                                let sDrugTitle: string = String.Empty;
                                if (this.oItem.FormViewerDetails != null && this.oItem.FormViewerDetails.BasicDetails != null && this.oItem.FormViewerDetails.BasicDetails.itemSubType == CConstants.SUBTYPE)
                                    sDrugTitle = CConstants.ADHOC_ITEM_NAME;
                                else if (this.oItem.FormViewerDetails != null && this.oItem.FormViewerDetails.BasicDetails != null)
                                    sDrugTitle = this.oItem.FormViewerDetails.BasicDetails.IdentifyingName;
                                let dialogWindowHeight = (650/window.devicePixelRatio); 
                                // ObjectHelper.stopFinishAndCancelEvent(true);
                                AppActivity.OpenWindow(sDrugTitle, this.ddetChild, (s, e) => {
                                    this.ddetChild_Closed(s);
                                }, "", false, dialogWindowHeight, 930, false, WindowButtonType.Close, null);
                            }
                        }
                    }
                    else if (String.Compare(sCurrCol, Resource.TechValidate.ViewDet, StringComparison.CurrentCultureIgnoreCase) != 0) {
                        this.grdTechValItem.CommitEdit();
                        this.oItem.drugProductDetails = null;
                        if (this.oItem != null && this.oItem.FormViewerDetails != null && this.oItem.FormViewerDetails.BasicDetails != null) {
                            if (this.oItem.FormViewerDetails.TechValidateDetails != null) {
                                this.oItem.FormViewerDetails.TechValidateDetails.FetchfrombasicDetails = true;
                            }
                            else {
                                this.oItem.FormViewerDetails.TechValidateDetails = new TechValidateVM();
                                this.oItem.FormViewerDetails.TechValidateDetails.FetchfrombasicDetails = true;
                            }
                            this.oItem.FormViewerDetails.BasicDetails.oPrescitemVM = this.oItem;
                            this.oItem.FormViewerDetails.BasicDetails.LaunchedFromTechValidate = true;
                            if (this.oItem.FormViewerDetails.TechValidateDetails != null) {
                                this.oItem.FormViewerDetails.TechValidateDetails.SupplyComments = null;
                                this.oItem.FormViewerDetails.TechValidateDetails.ProductSelectedsupplyInstruction = null;
                            }
                            this.oItem.FormViewerDetails.TechValidateDetails.IslaunchedFromProductOptions = false;
                            this.oItem.FormViewerDetails.BasicDetails.launchsupplyinstrmezzanine(this.dialogTemplate, true);
                        }
                        }
                    }
                }
            }
           
        ProductOption_Close(args: AppDialogEventargs): void {
            if (args.Content != null)
                this.omedtechvalProdOpt = ObjectHelper.CreateType<medtechvalProdOpt>(args.Content, medtechvalProdOpt);
            if (args.Result == AppDialogResult.Ok) {
                this.omedtechvalProdOpt.okButtonClick();
                this.TechCASupplyInstrClickEve(this.oItem);
            }
            else if (args.Result == AppDialogResult.Cancel) {
                this.oChildWindow = args.AppChildWindow;
                let iMsgBox: iMessageBox = ObjectHelper.CreateObject(new iMessageBox(), {
                    Title: Resource.TechValidate.Titles,
                    Message: Resource.disconcan1.Cancel_Error_Message,
                    MessageButton: MessageBoxButton.YesNo,
                    IconType: MessageBoxType.Question
                });
                iMsgBox.MessageBoxClose  = (s,e) => { this.iMsgBox_MessageBoxClose_ProductOption(s,e); } ;
                iMsgBox.Show();
            }
        }
        ddetChild_Closed(args: AppDialogEventargs): void {
            // ObjectHelper.stopFinishAndCancelEvent(false);
            args.AppChildWindow.DialogResult = true;
        }
        supplydispensinginstruction_Close(args: AppDialogEventargs): void {
            this.oChildWindow = args.AppChildWindow;
            if (args.Result == AppDialogResult.Cancel) {
                let iMsgBox: iMessageBox = ObjectHelper.CreateObject(new iMessageBox(), {
                    Title: Resource.TechValidate.Titles,
                    Message: Resource.disconcan1.Cancel_Error_Message,
                    MessageButton: MessageBoxButton.YesNo,
                    IconType: MessageBoxType.Question
                });
                iMsgBox.MessageBoxClose  = (s,e) => { this.iMsgBox_MessageBoxClose_App(s,e); } ;
                iMsgBox.Show();
            }
            else if (args.Result == AppDialogResult.Ok) {
                let oContent = ObjectHelper.CreateType<medsupplydispensinginstructionstab>(args.Content, medsupplydispensinginstructionstab);
                let oSupplyDispensingInstructionsVM: SupplyDispensingInstructionsVM = null;
                if (String.Compare(oContent.tab1.SelectedKey, Resource.TechValidate.SupDet) == 0)
                    oSupplyDispensingInstructionsVM = ObjectHelper.CreateType<SupplyDispensingInstructionsVM>((ObjectHelper.CreateType<medsupplydispensinginstructions>(oContent.tab1.SelectedContent, medsupplydispensinginstructions)).DataContext, SupplyDispensingInstructionsVM);
                else oSupplyDispensingInstructionsVM = ObjectHelper.CreateType<SupplyDispensingInstructionsVM>((ObjectHelper.CreateType<medsupplydispensinginstructions>((ObjectHelper.CreateType<iTabItem>(oContent.tab1.Items[0], iTabItem)).Content, medsupplydispensinginstructions)).DataContext, SupplyDispensingInstructionsVM);
                if (oSupplyDispensingInstructionsVM != null) {
                    this.oPrescItemVM = ObjectHelper.CreateType<PrescriptionItemVM>(this.DataContext, PrescriptionItemVM);
                    if (this.bMultiDispSup && this.oPrescItemVM != null && this.oPrescItemVM.FormViewerDetails != null && this.oPrescItemVM.FormViewerDetails.TechvalidateCADetails != null && this.oPrescItemVM.FormViewerDetails.TechvalidateCADetails.PresTechValidatedItems != null) {
                        let nPrescItemsCount: number = this.oPrescItemVM.FormViewerDetails.TechvalidateCADetails.PresTechValidatedItems.Count;
                        for (let i: number = 0; i < nPrescItemsCount; i++) {
                            if (this.oPrescItemVM.FormViewerDetails.TechvalidateCADetails.PresTechValidatedItems[i].IsSupDispEnable)
                                this.oPrescItemVM.FormViewerDetails.TechvalidateCADetails.PresTechValidatedItems[i] = this.SetSupplyDispensingInstructions(this.oPrescItemVM.FormViewerDetails.TechvalidateCADetails.PresTechValidatedItems[i], oSupplyDispensingInstructionsVM);
                        }
                    }
                    else {
                        this.oItem = this.SetSupplyDispensingInstructions(this.oItem, oSupplyDispensingInstructionsVM);
                    }
                    this.oChildWindow.DialogResult = true;
                    if (String.Compare(oContent.tab1.SelectedKey, Resource.TechValidate.ReqHis, StringComparison.OrdinalIgnoreCase) == 0) {
                        oContent.tab1.Click(Resource.TechValidate.SupDet, true);
                    }
                }
                Busyindicator.SetStatusIdle("AddSupplyInstructionParentClicked");
                Busyindicator.SetStatusIdle("AddSupplyInstructionChildClicked");
            }
            this.bMultiDispSup = false;
        }
        dispensinginstruction_Close(args: AppDialogEventargs): void {
            this.oChildWindow = args.AppChildWindow;
            // ObjectHelper.stopFinishAndCancelEvent(false);
            if (args.Result == AppDialogResult.Cancel) {
                let iMsgBox: iMessageBox = ObjectHelper.CreateObject(new iMessageBox(), {
                    Title: Resource.TechValidate.Titles,
                    Message: Resource.disconcan1.Cancel_Error_Message,
                    MessageButton: MessageBoxButton.YesNo,
                    IconType: MessageBoxType.Question
                });
                iMsgBox.MessageBoxClose  = (s,e) => { this.iMsgBox_MessageBoxClose_App(s,e); } ;
                iMsgBox.Show();
            }
            else if (args.Result == AppDialogResult.Ok) {
                let bdialogresult: boolean = false;
                // ObjectHelper.stopFinishAndCancelEvent(false);
                let oContent = ObjectHelper.CreateType<meddispensinginstructions>(args.Content.Component, meddispensinginstructions);
                if (oContent != null) {
                    let oDispensingInstructionsVM: DispensingInstructionsVM = ObjectHelper.CreateType<DispensingInstructionsVM>(oContent.DataContext, DispensingInstructionsVM);
                    if (oDispensingInstructionsVM != null) {
                        bdialogresult = oDispensingInstructionsVM.CheckValidation();
                        if (bdialogresult) {
                            this.oPrescItemVM = ObjectHelper.CreateType<PrescriptionItemVM>(this.DataContext, PrescriptionItemVM);
                            if (this.oPrescItemVM != null && this.oPrescItemVM.FormViewerDetails != null && this.oPrescItemVM.FormViewerDetails.TechvalidateCADetails != null) {
                                let oDispensingInstructions: ObservableCollection<CListItem> = oDispensingInstructionsVM.DispensingInstructionsList;
                                if (oDispensingInstructions != null && oDispensingInstructions.Count > 0) {
                                    this.oPrescItemVM.FormViewerDetails.TechvalidateCADetails.DispensingInstruction = new ObservableCollection<CListItem>();
                                    oDispensingInstructions.forEach( (oSelClistItem)=> {
                                        if (oSelClistItem.IsSelected) {
                                            this.oPrescItemVM.FormViewerDetails.TechvalidateCADetails.DispensingInstruction.Add(oSelClistItem);
                                            if (String.Compare(oSelClistItem.Value, CConstants.Other, StringComparison.CurrentCultureIgnoreCase) == 0) {
                                                if (!String.IsNullOrEmpty(oDispensingInstructionsVM.sOtherInstructions)) {
                                                    this.oPrescItemVM.FormViewerDetails.TechvalidateCADetails.OtherDispensingInstruction = oDispensingInstructionsVM.sOtherInstructions;
                                                    oSelClistItem.Tag = oDispensingInstructionsVM.sOtherInstructions;
                                                }
                                                else {
                                                    this.oPrescItemVM.FormViewerDetails.TechvalidateCADetails.OtherDispensingInstruction = String.Empty;
                                                    oSelClistItem.Tag = String.Empty;
                                                }
                                            }
                                        }
                                    });
                                }
                                this.oPrescItemVM.FormViewerDetails.TechvalidateCADetails.sAdditionalcomments = oDispensingInstructionsVM.sAdditionalcomments;
                            }
                            this.oChildWindow.DialogResult = true;
                        }
                    }
                }
            }
        }
        SetSupplyDispensingInstructions(oSelectedItem: PrescriptionItemVM, oSupplyDispensingInstructionsVM: SupplyDispensingInstructionsVM): PrescriptionItemVM {
            let bSupDisp: boolean = false;
            if (oSelectedItem != null && oSelectedItem.FormViewerDetails != null && oSelectedItem.FormViewerDetails.BasicDetails != null)
                oSelectedItem.FormViewerDetails.BasicDetails.TechsupplyInstText = null;
            let sSuppToolTipText: string = String.Empty;
            if (oSupplyDispensingInstructionsVM != null) {
                oSelectedItem.FormViewerDetails.BasicDetails.Supplycomments = oSupplyDispensingInstructionsVM.Supplycomments;
                oSelectedItem.FormViewerDetails.BasicDetails.NextSupplyDate = oSupplyDispensingInstructionsVM.NextSupDTTM;
                let oSupplyInstrItems: ObservableCollection<CListItem> = oSupplyDispensingInstructionsVM.SupplyInstructionsList;
                if (oSupplyInstrItems != null && oSupplyInstrItems.Count > 0) {
                    oSelectedItem.FormViewerDetails.BasicDetails.SelectedsupplyInstruction = new ObservableCollection<CListItem>(oSupplyInstrItems.Where(c => c.IsSelected).Select(s => s).Distinct());
                    if (oSelectedItem.FormViewerDetails.BasicDetails.SelectedsupplyInstruction != null && oSelectedItem.FormViewerDetails.BasicDetails.SelectedsupplyInstruction.Count > 0) {
                        bSupDisp = true;
                        let oSupplyInstTxt: string = String.Empty;
                        let oSupplyInstVal: string = String.Empty;
                        oSelectedItem.FormViewerDetails.BasicDetails.TechValiadteSupplyInstWithConactSemiColon(oSelectedItem.FormViewerDetails.BasicDetails.SelectedsupplyInstruction, (o1) => {oSupplyInstTxt}, (o2) => {oSupplyInstVal});
                        sSuppToolTipText = oSupplyInstTxt;
                    }
                    else sSuppToolTipText = Resource.TechValidate.SupplyDispChild_Add_Text;
                }
            }
            if (oSelectedItem.FormViewerDetails.BasicDetails.TechValSupplyInst != null)
                oSelectedItem.FormViewerDetails.BasicDetails.TechsupplyInstText = oSelectedItem.FormViewerDetails.BasicDetails.TechValSupplyInst.Value;
            if (oSelectedItem.FormViewerDetails.BasicDetails.SelectedsupplyInstruction != null && oSelectedItem.FormViewerDetails.BasicDetails.SelectedsupplyInstruction.Count > 0) {
                if (oSelectedItem.FormViewerDetails.BasicDetails.TechPresItemTechOID > 0)
                    oSelectedItem.FormViewerDetails.BasicDetails.TecValOperationMode = "M";
                else oSelectedItem.FormViewerDetails.BasicDetails.TecValOperationMode = "N";
            }
            else {
                if (oSelectedItem.FormViewerDetails.BasicDetails.TechPresItemTechOID > 0)
                    oSelectedItem.FormViewerDetails.BasicDetails.TecValOperationMode = "D";
            }
            if (oSelectedItem.FormViewerDetails.TechvalidateCADetails != null)
                oSelectedItem.FormViewerDetails.TechvalidateCADetails.Technicalvalidateupdate = true;
            oSelectedItem.RequisitionCACode = Resource.TechValidate.ReqCACode;
            oSelectedItem.FormViewerDetails.BasicDetails.IsDoseCombDefTech = '0';
            if (bSupDisp && oSelectedItem != null) {
                oSelectedItem.SupDisText = Resource.TechValidate.SupplyDispChild_Add_Text;
                oSelectedItem.supToolTipDisText = Resource.TechValidate.Supplyinst + sSuppToolTipText;
            }
            else if (!bSupDisp && oSelectedItem != null) {
                oSelectedItem.SupDisText = Resource.TechValidate.SupplyDispChild_Add_Text;
                oSelectedItem.supToolTipDisText = Resource.TechValidate.AddsupinstChild;
            }
            return oSelectedItem;
        }
        iMsgBox_MessageBoxClose_App(sender: Object, e: MessageEventArgs): void {
            if (e.MessageBoxResult == MessageBoxResult.Yes) {
                this.oChildWindow.DialogResult = true;
            }
            Busyindicator.SetStatusIdle("AddSupplyInstructionParentClicked");
            Busyindicator.SetStatusIdle("AddSupplyInstructionChildClicked");
        }
        iMsgBox_MessageBoxClose_ProductOption(sender: Object, e: MessageEventArgs): void {
            if (e.MessageBoxResult == MessageBoxResult.Yes) {
                this.oChildWindow.DialogResult = false;
            }
        }
        private medTechvalidateCA_Loaded(sender: Object, e: RoutedEventArgs): void {
            // this.grdTechValItem.Width = this.LayoutRoot.ActualWidth - 30;
            // this.Height = this.LayoutRoot.ActualHeight;
            // this.grdTechValItem.Height = this.LayoutRoot.ActualHeight - 80;
            this._MsgBoxTitle = Resource.TechValidate.Title;
            // this.oTechValCAVM = (ObjectHelper.CreateType<TechnicallyValidateCAVM>(this.DataContext, TechnicallyValidateCAVM));
            // if (this.oTechValCAVM != null) {
            //     if (PatientContext.PrescriptionType == PrescriptionTypes.ForAdministration || PatientContext.PrescriptionType == PrescriptionTypes.Inpatient)
            //         this.oTechValCAVM.oPrescItemVM.PrescriptionType = Resource.TechValidate.ForAdmin;
            //     else if (PatientContext.PrescriptionType == PrescriptionTypes.Discharge)
            //         this.oTechValCAVM.oPrescItemVM.PrescriptionType = Resource.TechValidate.Discharge;
            //     else if (PatientContext.PrescriptionType == PrescriptionTypes.Outpatient)
            //         this.oTechValCAVM.oPrescItemVM.PrescriptionType = Resource.TechValidate.Outpatient;
            //     else if (PatientContext.PrescriptionType == PrescriptionTypes.Clerking)
            //         this.oTechValCAVM.oPrescItemVM.PrescriptionType = Resource.TechValidate.Clerking;
            //     else if (PatientContext.PrescriptionType == PrescriptionTypes.Leave)
            //         this.oTechValCAVM.oPrescItemVM.PrescriptionType = Resource.TechValidate.Leave;
            //     this.DataContext = this.oTechValCAVM.oPrescItemVM;
            //     ContextInfo.MenuCode = CConstants.TechnicallyValidateMenuCode;
            // }
            this.oPrescItemVM = ObjectHelper.CreateType<PrescriptionItemVM>(this.DataContext, PrescriptionItemVM);
            if (this.oPrescItemVM != null) {
                if (this.oPrescItemVM.FormViewerDetails != null && this.oPrescItemVM.FormViewerDetails.TechvalidateCADetails != null) {
                    this.oPrescItemVM.FormViewerDetails.TechvalidateCADetails.OnSelectedPrescItemChanged  = (s,e) => { this.TechValidateDetails_OnSelectedPrescItemChanged(s); } ;
                    this.oPrescItemVM.FormViewerDetails.TechvalidateCADetails.OnDeactivatedPrescItemsFound  = (s,e) => { this.TechValidateDetails_OnDeactivatedPrescItemsFound(s,e); } ;
                    let SupplyRequest: GridViewColumn = this.grdTechValItem.Columns["colInitiateSupplyRequest"];
                    if (SupplyRequest instanceof GridViewColumn) {
                        SupplyRequest.IsVisible = true;
                    }
                    this.oTechValCAVM.TechvalProfileCompleted  = (s,e) => { this.oTechValCAVM_TechvalProfileCompleted(); } ;
                }
            }
            CheckPermission = PrescriptionHelper.CheckPermission("PM_Can_View_MedChart", "Can view medication chart")
            if (CheckPermission && ((QueryStringInfo.IsLaunchformMedchart == String.Empty) ||(QueryStringInfo.IsLaunchformMedchart == "False"))) {
                if (!((!PatientContext.IPPMADU_P2) && PatientContext.TTOPBBDU_P2)) {
                    this.cmdMedAdmin.Visibility = Visibility.Visible;
                    PrescriptionHelper.GetMedicationCount(Convert.ToInt64(PatientContext.EncounterOid), PrescriptionTypes.ForAdministration , (s,e) => { this.PatientCount_Completed(s,e); } );
                }
                else {
                    this.cmdMedAdmin.IsEnabled = false;
                    this.cmdMedAdmin.Visibility = Visibility.Collapsed;
                }
            }
            else {
                this.cmdMedAdmin.IsEnabled = false;
                this.cmdMedAdmin.Visibility = Visibility.Collapsed;
            }
        }
        oTechValCAVM_TechvalProfileCompleted(): void {
            let Nextsupply: GridViewColumn = this.grdTechValItem.Columns["Nextsupply"];
            if (ProfileData.AdditionalPrescConfig != null && ProfileData.AdditionalPrescConfig.EnableWardStockConfig && (String.Equals(PatientContext.PrescriptionType, PrescriptionTypes.ForAdministration) || String.Equals(PatientContext.PrescriptionType, PrescriptionTypes.Inpatient))) {
                Nextsupply.IsVisible = Nextsupply && Nextsupply instanceof GridViewColumn ? true : false;
            }
            else {
                Nextsupply.IsVisible = false;
            }
            this.grdTechValItem.UpdateColumns();
        }
        PatientCount_Completed(sender: Object, e: ManagePrescSer.GetPatientMedicationCountCompletedEventArgs): void {
            if (e.Error != null)
                return
            let objResult: ManagePrescSer.CResMsgGetPatientMedicationCount = e.Result;
            if (!(objResult instanceof ManagePrescSer.CResMsgGetPatientMedicationCount))
                return
            if (objResult != null) {
                if (Convert.ToBoolean(objResult.bIsExist))
                    this.cmdMedAdmin.IsEnabled = true;
                else this.cmdMedAdmin.IsEnabled = false;
            }
        }
        TechValidateDetails_OnDeactivatedPrescItemsFound(sPrescItems: string, sCompItems: string): void {
            let DeactMsgFor: string = String.Empty;
            if (!String.IsNullOrEmpty(sPrescItems) && !String.IsNullOrEmpty(sCompItems)) {
                DeactMsgFor = Resource.TechValidate.DeactPresItem + ' ' + sPrescItems + Resource.TechValidate.DeactPresItem_Mid_Msg + ' ' + sCompItems + ' ' + Resource.TechValidate.DeactPresItem_Last_Msg; 
            }
            else if (!String.IsNullOrEmpty(sPrescItems)) {
                DeactMsgFor = Resource.TechValidate.DeactPresItem + ' ' + sPrescItems + ' ' + Resource.TechValidate.DeactPresItem_Lastdiff_Msg;
            }
            else if (!String.IsNullOrEmpty(sCompItems)) {
                DeactMsgFor = Resource.TechValidate.DeactCompItem + ' ' + sCompItems + Resource.TechValidate.DeactCompItem_Last_Msg;
            }
            if (!String.IsNullOrEmpty(sPrescItems) || !String.IsNullOrEmpty(sCompItems)) {
                this.msgBoxDeactivatedDrug = new iMessageBox();
                this.msgBoxDeactivatedDrug.Height = 140;
                this.msgBoxDeactivatedDrug.Width = 480;
                this.msgBoxDeactivatedDrug.Title = this._MsgBoxTitle;
                this.msgBoxDeactivatedDrug.Message = DeactMsgFor;
                this.msgBoxDeactivatedDrug.IconType = MessageBoxType.Information;
                this.msgBoxDeactivatedDrug.MessageButton = MessageBoxButton.OK;
                this.msgBoxDeactivatedDrug.Show();
            }
        }
        grdTechValItem_SelectionChanged(sender: Object, e: SelectionChangeEventArgs): void {
            if (e.AddedItems[0].IsGroupHeader) {
                this.grdTechValItem.selectedRowsIndex = [];
                if (e.RemovedItems && e.RemovedItems.Count > 0) {
                    this.grdTechValItem.SelectedItem = e.RemovedItems[0];
                }
            }
            let oSelectPrescItem: PrescriptionItemVM = ObjectHelper.CreateType<PrescriptionItemVM>(this.grdTechValItem.SelectedItem, PrescriptionItemVM);
            if (oSelectPrescItem != null) {
                let _IsEnabled: boolean = true;
                this._IsDeactivatedPerscItem = false;
                if (String.Compare(oSelectPrescItem.IsDeactivate, "Y", StringComparison.InvariantCultureIgnoreCase) == 0) {
                    _IsEnabled = false;
                    this._IsDeactivatedPerscItem = true;
                    oSelectPrescItem.IsSupDispEnable = false;
                    oSelectPrescItem.isShowallVisible = Visibility.Collapsed;
                }
                if (oSelectPrescItem.FormViewerDetails != null && oSelectPrescItem.FormViewerDetails.BasicDetails != null && String.Compare(oSelectPrescItem.FormViewerDetails.BasicDetails.itemSubType, "CC_MULCMPNTITM", StringComparison.InvariantCultureIgnoreCase) != 0) {
                    if ((String.Compare(PatientContext.PrescriptionType, PrescriptionTypes.Outpatient, StringComparison.CurrentCultureIgnoreCase) == 0) || (String.Compare(PatientContext.PrescriptionType, PrescriptionTypes.Leave, StringComparison.CurrentCultureIgnoreCase) == 0) || (String.Compare(PatientContext.PrescriptionType, PrescriptionTypes.Discharge, StringComparison.CurrentCultureIgnoreCase) == 0)) {
                        if ((oSelectPrescItem.FormViewerDetails.BasicDetails.DrugProperties != null && oSelectPrescItem.FormViewerDetails.BasicDetails.DrugProperties.Count > 0 && oSelectPrescItem.FormViewerDetails.BasicDetails.DrugProperties[0] != null && String.Compare(oSelectPrescItem.FormViewerDetails.BasicDetails.DrugProperties[0].DrugPropertyCode, "CC_CNTRLDDRUG", StringComparison.InvariantCultureIgnoreCase) == 0) || (oSelectPrescItem.IsControlledDrug == '1')) {
                            _IsEnabled = false;
                        }
                    }
                }
                if ((oSelectPrescItem.FormViewerDetails != null && oSelectPrescItem.FormViewerDetails.TechvalidateCADetails != null && oSelectPrescItem.TechValidatedItems != null && oSelectPrescItem.TechValidatedItems.Count > 0) || (!oSelectPrescItem.IsSupDispEnable)) {
                    oSelectPrescItem.IsSupDispEnable = false;
                }
            }
            this.oPrescItemVM = ObjectHelper.CreateType<PrescriptionItemVM>(this.DataContext, PrescriptionItemVM);
            if (!this.oPrescItemVM.FormViewerDetails.TechvalidateCADetails.IsMciChildSelected) {
                let button = this.grdTechValItem.ChildrenOfType<GridExtension>('GridExtension').Where(b => b.Name == "grdTecValItmChld").FirstOrDefault();
                if (button != null) {
                    //button.UnselectAll();
                }
            }
        }
        TechValidateDetails_OnSelectedPrescItemChanged(oPrescItemVM: PrescriptionItemVM): void {
            this.oIPVM = oPrescItemVM;
            this.PageDataContext = ObjectHelper.CreateType<PrescriptionItemVM>(this.DataContext, PrescriptionItemVM);
            if (this.PageDataContext != null && this.PageDataContext.FormViewerDetails != null && this.PageDataContext.FormViewerDetails.TechvalidateCADetails != null && this.PageDataContext.TechValidatedItems != null) {
                this.PageDataContext.TechValidatedItems.Clear();
                if (oPrescItemVM != null && oPrescItemVM.FormViewerDetails != null && oPrescItemVM.FormViewerDetails.TechvalidateCADetails != null && oPrescItemVM.TechValidatedItems != null) {
                    this.PageDataContext.TechValidatedItems = new ObservableCollection<CustomTechValidatedItem>(oPrescItemVM.TechValidatedItems);
                }
            }
        }
        private grdTecValItmChld_Loaded(sender: Object, e: RoutedEventArgs): void {}

        public opened = false;

        public close(): void {
            this.opened = false;
        }

        CustomSupplyInstructionClick(dataItem, rowIndex, columnIndex, gridInstance, event, isParent) {
            let columnCell: GridViewCell = new GridViewCell();
            if (isParent) columnCell.Column = gridInstance.Columns[columnIndex];
            else columnCell.Column = gridInstance.Columns[columnIndex - 1];
            columnCell.DataContext = dataItem;
            let cellClickArgs: GridViewCellClickEventArgs = {
                ColumnCell: columnCell,
                ColumnIndex: columnIndex - 1,
                RowIndex: rowIndex,
                MouseEvents: event,
                TriggerSelectionChange: false
            }
            if (isParent) this.grdTechValItem_onCellClick({}, cellClickArgs);
            else this.grdTecValItmChld_onCellClick({}, cellClickArgs);

        }

        private grdTecValItmChld_onCellClick(sender: Object, args: GridViewCellClickEventArgs): void {
            let sCurrCol: string = args.ColumnCell.Column.UniqueName;
            this.oItem = ObjectHelper.CreateType<PrescriptionItemVM>(args.ColumnCell.DataContext, PrescriptionItemVM);
            if (this.oItem != null) {
                this.oItem.bAvoidNextSupplyFirsttime = true;
            }
            if (this.oItem != null && this.oItem.FormViewerDetails != null && this.oItem.FormViewerDetails.BasicDetails != null) {
                this.oItem.FormViewerDetails.BasicDetails.TechCASupplyInstrClick  = (s,e) => { this.TechCASupplyInstrClickEve(s); } ;
            }
            if (this.oItem.EnableChildMCIComp && String.Compare(sCurrCol, Resource.TechValidate.Comnts, StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(sCurrCol, "ProductOption", StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(sCurrCol, "ViewDetails", StringComparison.CurrentCultureIgnoreCase) == 0) {
                let lstPrescriptionItemVM: ObservableCollection<Object> = new ObservableCollection<Object>();
                this.oItem = ObjectHelper.CreateType<PrescriptionItemVM>(args.ColumnCell.DataContext, PrescriptionItemVM);
                this.oItem.IsTechValidate = true;
                if (this.oItem.FormViewerDetails.TechvalidateCADetails == null) {
                    this.oItem.FormViewerDetails.TechvalidateCADetails = new TechvalidateCAVM();
                    this.oItem.FormViewerDetails.TechvalidateCADetails = this.oPrescItemVM.FormViewerDetails.TechvalidateCADetails;
                }
                if ((String.Compare(sCurrCol, Resource.TechValidate.Comnts, StringComparison.CurrentCultureIgnoreCase) == 0) && !this.oItem.IsSupDispEnable) {
                    this.oIPVM.SupDisText = Resource.TechValidate.SupplyDispChild_Add_Text;
                    this.oIPVM.supToolTipDisText = Resource.TechValidate.AddsupinstChild;
                    this.oItem.IsSupDispEnable = false;
                }
                this.bChildSupplyDispClick = false;
                if (this.oItem.FormViewerDetails != null && this.oItem.FormViewerDetails.TechvalidateCADetails != null)
                    this.oItem.FormViewerDetails.TechvalidateCADetails.IsMciChildSelected = true;
                lstPrescriptionItemVM.Add(this.oItem);
                if (String.Compare(sCurrCol, Resource.TechValidate.ProOpt, StringComparison.CurrentCultureIgnoreCase) == 0) {
                    this.oProdOpt = new medtechvalProdOpt();
                    this.oProdOpt.constructorMedtechvalProdOpt(this.oItem);
                    AppActivity.OpenWindow(Resource.TechValidate.Title_Prod, this.oProdOpt, (s, e) => {
                        this.ProductOption_Close(s);
                      }, Resource.TechValidate.ProdOpt, false, 695, 750, false, WindowButtonType.OkCancel, null);
                }
                else if (String.Compare(sCurrCol, Resource.TechValidate.ViewDet, StringComparison.CurrentCultureIgnoreCase) == 0) {
                    this.oItem = ObjectHelper.CreateType<PrescriptionItemVM>(this.grdTechValItem.GetRowData(args.RowIndex), PrescriptionItemVM);
                    if (this.oItem instanceof PrescriptionItemVM) {
                        this.ddetChild = new medddetailsChild();
                        this.ddetChild.MedDetailsUserControl.PrescriptionItemOID = this.oItem.PrescriptionItemOID;
                        this.ddetChild.MedDetailsUserControl.MCVersion = this.oItem.FormViewerDetails.BasicDetails.MCVersion;
                        let sDrugTitle: string = String.Empty;
                        if (this.oItem.FormViewerDetails != null && this.oItem.FormViewerDetails.BasicDetails != null && this.oItem.FormViewerDetails.BasicDetails.itemSubType == CConstants.SUBTYPE)
                            sDrugTitle = CConstants.ADHOC_ITEM_NAME;
                        else if (this.oItem.FormViewerDetails != null && this.oItem.FormViewerDetails.BasicDetails != null)
                            sDrugTitle = this.oItem.FormViewerDetails.BasicDetails.IdentifyingName;
                        AppActivity.OpenWindow(sDrugTitle, this.ddetChild, (s, e) => {
                            this.ddetChild_Closed(s);
                        }, "", false,650,930, false, WindowButtonType.Close, null);
                    }
                }
                else {
                    if (this.oItem != null && this.oItem.FormViewerDetails != null && this.oItem.FormViewerDetails.BasicDetails != null) {
                        if (this.oItem.FormViewerDetails.TechValidateDetails != null) {
                            this.oItem.FormViewerDetails.TechValidateDetails.SupplyComments = null;
                            this.oItem.FormViewerDetails.TechValidateDetails.ProductSelectedsupplyInstruction = null;
                        }
                        this.oItem.FormViewerDetails.BasicDetails.oPrescitemVM = this.oItem;
                        this.oItem.FormViewerDetails.BasicDetails.LaunchedFromTechValidate = true;
                        this.oItem.FormViewerDetails.BasicDetails.launchsupplyinstrmezzanine(this.dialogTemplate, true);
                        // this.oItem.FormViewerDetails.BasicDetails.launchsupplyinstrmezzanine2();
                    }
                    else {

                    }
                }
            }
            else {

            }
        }
        private grdTecValItmChld_RowLoaded(sender: Object, e: RowLoadedEventArgs): void {
            let Nextsupply: GridViewColumn = e.GridViewDataControl.Columns["Nextsupplychild"];
            if (ProfileData.AdditionalPrescConfig != null && ProfileData.AdditionalPrescConfig.EnableWardStockConfig && (String.Equals(PatientContext.PrescriptionType, PrescriptionTypes.ForAdministration) || String.Equals(PatientContext.PrescriptionType, PrescriptionTypes.Inpatient))) {
                Nextsupply.IsVisible = Nextsupply && Nextsupply instanceof GridViewColumn ? true : false;
            }
            else {
                Nextsupply.IsVisible = false;
            }
        }

        private itemToSelect: Object;
        private grdTecValItmChld_GridMouseButtonClicking(sender: Object, e: MouseButtonEventArgs): void {
            let senderElement = <FrameworkElement>e.OriginalSource;
            if (String.Compare(senderElement.Name.ToString(), Resource.TechValidate.NavIndBKG, StringComparison.CurrentCultureIgnoreCase) == 0) {
                let clickedRow = senderElement.ParentOfType<GridViewRow>();
                let ChildGrid = this.grdTechValItem.ChildrenOfType<GridComponent>().Where(b => b.Name == "grdTecValItmChld").FirstOrDefault();
                if (clickedRow != null && this.itemToSelect == null) {
                    ChildGrid.RowSelectUnselect(clickedRow, true);
                }
                else {
                    if (clickedRow != null && clickedRow.IsSelected) {
                        ChildGrid.RowSelectUnselect(clickedRow, false);
                    }
                }
                if (clickedRow != null) {
                    if (clickedRow.IsSelected) {
                        ChildGrid.RowSelectUnselect(clickedRow, false);
                    }
                    else {
                        ChildGrid.RowSelectUnselect(clickedRow, true);
                    }
                }
                this.itemToSelect = null;
            }
        }
        // private grdTecValItmChld_SelectionChanging(sender: Object, e: SelectionChangingEventArgs): void {
        //     this.grdTecValItmChld_SelectionChanged(sender, e);
        // }
        private grdTecValItmChld_SelectionChanged(sender: Object, e: SelectionChangeEventArgs): void {
            if (e.AddedItems.Count > 0) {
                this.itemToSelect = e.AddedItems[0];
            }
            this.bMultiCompChild = true;
            if (e.AddedItems.Count == 0) {
                let oTechValDataContext: PrescriptionItemVM = ObjectHelper.CreateType<PrescriptionItemVM>(this.DataContext, PrescriptionItemVM);
                if (oTechValDataContext != null && String.Compare(oTechValDataContext.LorenzoID, "PI-001", StringComparison.CurrentCultureIgnoreCase) != 0) {
                    oTechValDataContext.FormViewerDetails.TechvalidateCADetails.IsMciChildSelected = false;
                    if (this.oIPVM != null && this.oIPVM.FormViewerDetails != null && this.oIPVM.FormViewerDetails.TechvalidateCADetails == null) {
                        this.oIPVM.FormViewerDetails.TechvalidateCADetails = new TechvalidateCAVM();
                    }
                    this.oIPVM.FormViewerDetails.TechvalidateCADetails.IsMciChildSelected = false;
                    this.oIPVM.FormViewerDetails.TechvalidateCADetails.SelectedChildPresItem = null;
                    this.oIPVM = oTechValDataContext.FormViewerDetails.TechvalidateCADetails.SelectedPrescItem;
                    this.PageDataContext.FormViewerDetails.TechvalidateCADetails.SelectedPrescItem = this.oIPVM;
                }
            }
            else {
                if (e.AddedItems != null && e.AddedItems.Count > 0) {
                    let oMCChildItem: PrescriptionItemVM = ObjectHelper.CreateType<PrescriptionItemVM>(e.AddedItems[0], PrescriptionItemVM);
                    if (oMCChildItem != null) {
                        if (oMCChildItem.IsControlledDrug == '1') {
                            this.bCDItemEnable = true;
                        }
                        else {
                            this.bCDItemEnable = false;
                        }
                        let oTechValDataContext: PrescriptionItemVM = ObjectHelper.CreateType<PrescriptionItemVM>(this.DataContext, PrescriptionItemVM);
                        if (oTechValDataContext != null) {
                            if (!oTechValDataContext.IsFRMTecVal) {
                                if (oMCChildItem != null && oMCChildItem.FormViewerDetails != null && oMCChildItem.FormViewerDetails.TechvalidateCADetails != null && oMCChildItem.TechValidatedItems != null) {
                                    for (let i: number = 0; i < oMCChildItem.TechValidatedItems.Count; i++) {
                                        oMCChildItem.TechValidatedItems[i].bMultiCompChilds = true;
                                    }
                                }
                                oTechValDataContext.FormViewerDetails.TechvalidateCADetails.SelectedChildPresItem = oMCChildItem;
                                this.oIPVM = oTechValDataContext.FormViewerDetails.TechvalidateCADetails.SelectedChildPresItem;
                                this.PageDataContext = ObjectHelper.CreateType<PrescriptionItemVM>(this.DataContext, PrescriptionItemVM);
                                if (this.PageDataContext != null && this.PageDataContext.FormViewerDetails != null && this.PageDataContext.FormViewerDetails.TechvalidateCADetails != null && this.PageDataContext.TechValidatedItems != null) {
                                    if (this.PageDataContext.FormViewerDetails != null && this.PageDataContext.FormViewerDetails.TechvalidateCADetails != null && this.PageDataContext.TechValidatedItems != null) {
                                        if (this.PageDataContext.FormViewerDetails.TechvalidateCADetails.PresTechValidatedItems != null && this.PageDataContext.FormViewerDetails.TechvalidateCADetails.PresTechValidatedItems[0] != null && this.PageDataContext.FormViewerDetails.TechvalidateCADetails.PresTechValidatedItems[0].FormViewerDetails != null && this.PageDataContext.FormViewerDetails.TechvalidateCADetails.PresTechValidatedItems[0].FormViewerDetails.TechValidateDetails != null) {
                                            if (this.PageDataContext.FormViewerDetails.TechvalidateCADetails.PresTechValidatedItems[0].FormViewerDetails.TechvalidateCADetails.CareTaker.Memento != null && this.PageDataContext.FormViewerDetails.TechValidateDetails.PresTechValidatedItems[0].FormViewerDetails.TechValidateDetails.CareTaker.Memento.Count > 0)
                                                this.PageDataContext.FormViewerDetails.TechvalidateCADetails.PresTechValidatedItems[0].FormViewerDetails.TechValidateDetails.CareTaker.Memento.Clear();
                                            this.PageDataContext.FormViewerDetails.TechvalidateCADetails.PresTechValidatedItems[0].FormViewerDetails.TechValidateDetails.CareTaker.Memento.Add(this.PageDataContext.FormViewerDetails.TechvalidateCADetails.Clone);
                                        }
                                    }
                                    this.PageDataContext.TechValidatedItems.Clear();
                                    if (oMCChildItem != null && oMCChildItem.FormViewerDetails != null && oMCChildItem.FormViewerDetails.TechvalidateCADetails != null && oMCChildItem.TechValidatedItems != null) {
                                        this.PageDataContext.TechValidatedItems = new ObservableCollection<CustomTechValidatedItem>(oMCChildItem.TechValidatedItems);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        private grdTechValItem_RowIsExpandedChanged(sender: Object, e: RowEventArgs): void {
            this.grdTechValItem.SaveChildGridSelectedIndex(e);
            if (e.Row.IsSelected == false) {
                e.Row.IsSelected = true;
            }
            this.bChildSupplyDispClick = true;
        }
        public DisposeFormEvents(): void {
            if (this.oPrescItemVM != null && this.oPrescItemVM.FormViewerDetails != null && this.oPrescItemVM.FormViewerDetails.TechvalidateCADetails != null) {
                this.oPrescItemVM.DoCleanUP();
            }
            if (this.oPrsItmVM != null) {
                this.oPrsItmVM.DoCleanUP();
            }
        }
        public DisposeFormObjects(): void {
            if (this.oSupInst != null)
                this.oSupInst.onDialogClose = null;
            this.PageDataContext = null;
            this.oChildWindow = null;
            this.oSupInst = null;
            this.oItem = null;
            CommonFlags.IsTechnicallyValidate = false;
        }
        medTechvalidateCA_Unloaded(sender: Object, e: RoutedEventArgs): void {
            if (this.msgBoxDeactivatedDrug != null) {
                this.msgBoxDeactivatedDrug.Close();
            }
            this.DisposeFormEvents();
            this.DisposeFormObjects();
        }
        public offset: Offset;
        showIcon_Click_Func = (s, e) => { this.showIcon_Click(s, e); }
        private showIcon_Click(sender: Object, e: RoutedEventArgs): void {
            this.showIcon.IsHitTestVisible = false;
            // this.showLegendPopup = true;
            let btnLegend: iButton = ObjectHelper.CreateType<iButton>(this.showIcon, iButton);
            let btnTop: number;
            let btnLeft: number;
            if (btnLegend != null && this.LgndClickCount % 2 == 0) {
                // this.SeedCanvas.Visibility = Visibility.Visible;
                // let gt: GeneralTransform = btnLegend.TransformToVisual(this);
                // let btnOffset: Point = gt.Transform(new Point(0, 0));
                btnTop = btnLegend.searchElement.nativeElement.offsetTop - 10;
                btnLeft = btnLegend.searchElement.nativeElement.offsetLeft;
                this.offset = { left: btnLeft, top: btnTop }
                let height: number = btnTop - 180;
                // this.SeedCanvas.Margin = new Thickness(btnLeft, height, 0, 0);
                this.showLegendPopup = !this.showLegendPopup;
            }
        }
        private popup_Opened(sender: Object, e: EventArgs): void {
            // this._PopupParent = this.FindHighestAncestor(this.popup);
            // if (this._PopupParent == null) {
            //     return
            // }
            // this.LgndClickCount++;
            // this._PopupParent.AddHandler(Popup.MouseLeftButtonDownEvent, <MouseButtonEventHandler>this.popup_MouseLeftButtonDown, true);
        }
        private popup_Closed(sender: Object, e: EventArgs): void {
            // if (this._PopupParent == null) {
            //     return
            // }
            // this.LgndClickCount--;
            // this._PopupParent.RemoveHandler(Popup.MouseLeftButtonDownEvent, <MouseButtonEventHandler>this.popup_MouseLeftButtonDown);
            // this.showIcon.IsHitTestVisible = true;
            // this.SeedCanvas.Visibility = Visibility.Collapsed;
        }
        private popup_MouseLeftButtonDown(sender: Object, e: MouseButtonEventArgs): void {
            // let storyboard = ObjectHelper.CreateObject(new Storyboard(), { Duration: TimeSpan.Zero });
            // let objectAnimation = ObjectHelper.CreateObject(new ObjectAnimationUsingKeyFrames(), { Duration: TimeSpan.Zero });
            // objectAnimation.KeyFrames.Add(ObjectHelper.CreateObject(new DiscreteObjectKeyFrame(), { KeyTime: KeyTime.FromTimeSpan(TimeSpan.Zero), Value: false }));
            // Storyboard.SetTarget(objectAnimation, this.popup);
            // Storyboard.SetTargetProperty(objectAnimation, new PropertyPath("IsOpen"));
            // storyboard.Children.Add(objectAnimation);
            // storyboard.Begin();
        }

        @HostListener("document:click", ["$event"])
        public documentClick(event: KeyboardEvent): void {
            if (!this.contains(event.target)) {
                this.showLegendPopup = false;
            }
        }

        private contains(target: EventTarget): boolean {
            return (
              this.showIcon.searchElement.nativeElement.contains(target) ||
              (this.popup ? this.popup.nativeElement.contains(target) : false)
            );
          }

        public enabled = true;
        public duration = 10;
        public type: AnimationType = "fade";
        public direction: AnimationDirection = "down";
        public get animate(): boolean | PopupAnimation {
        if (this.enabled) {
            return {
            type: this.type,
            direction: this.direction,
            duration: this.duration,
            };
        }
    
        return false;
        }
        // private FindHighestAncestor(popup: Popup): FrameworkElement {
        //     let ancestor = <FrameworkElement>popup;
        //     while (true) {
        //         let parent = ObjectHelper.CreateType<FrameworkElement>(VisualTreeHelper.GetParent(ancestor), FrameworkElement);
        //         if (parent == null) {
        //             return ancestor;
        //         }
        //         ancestor = parent;
        //     }
        // }
        
        RowSelectionChanged({trigger, selectedRowIndex}, childdata?: any) {
            if (trigger && selectedRowIndex != undefined) {
                let e: SelectionChangeEventArgs = {};
                let addedItems: List = new List();
                if (childdata) {
                    addedItems.Add(childdata?.PresTechValidatedItemsChild[selectedRowIndex]);
                    e.AddedItems = addedItems;
                    childdata.ChildGridExtension.selectedRowsIndex = [selectedRowIndex];
                    this.grdTecValItmChld_SelectionChanged({}, e);
                } else {
                    addedItems.Add(this.DataContext.FormViewerDetails.TechvalidateCADetails.PresTechValidatedItems[selectedRowIndex]);
                    e.AddedItems = addedItems;
                    this.grdTechValItem.selectedRowsIndex = [selectedRowIndex];
                    this.grdTechValItem_SelectionChanged({}, e);
                }
            }
        }

        showResult(type: string) {
            let dialogRef = this.oItem.FormViewerDetails.BasicDetails.dialogRefCustom;
            let e = new AppDialogEventargs();
            e.AppChildWindow = dialogRef?.content.instance;
            e.Content = dialogRef?.content.instance;
            e.Result = type.toLowerCase() == 'ok' ? AppDialogResult.Ok : AppDialogResult.Cancel;
            this.oItem.FormViewerDetails.BasicDetails.supplydispensinginstruction_Close(e, true);
        }
        GetPRNColor(content){
            let val = {}
            let oTech: PrescriptionItemVM = ObjectHelper.CreateType<PrescriptionItemVM>(content.dataItem, PrescriptionItemVM);
            if (oTech != null && oTech.FormViewerDetails != null && oTech.FormViewerDetails.BasicDetails != null && (oTech.FormViewerDetails.BasicDetails.AsRequired || String.Equals(oTech.FormViewerDetails.BasicDetails.Direction, CConstants.AsNeeded, StringComparison.InvariantCultureIgnoreCase))) {
                if (MedChartData.AsRequiredSlotsColor){
                    let filteredPRNClass = PRNColorList.filter(item => item.value == MedChartData.AsRequiredSlotsColor.color)[0]?.className;
                     val[filteredPRNClass]= true;
                }
                
            }
             return val;
        }
    }
// function TechnicallyValidateCAVM<T>(DataContext: any, TechnicallyValidateCAVM: any): any {
//     throw new Error('Function not implemented.');
// }

