import { ChangeDetectorRef, Component, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Convert, AppActivity } from 'epma-platform/services';
import { StringComparison, AppDialogEventargs, WindowButtonType, iAppDialogWindow } from 'epma-platform/models';
import { CheckBox, DataTemplate, Grid, KeyEventArgs, SolidColorBrush, iCheckBox } from 'epma-platform/controls';
import 'epma-platform/stringextension';
import { MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType } from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
import { GridComponent, RowClassArgs } from '@progress/kendo-angular-grid';
import { RoutedEventArgs } from 'src/app/shared/epma-platform/controls/Control';
import { SelfAdminDrug } from 'src/app/shared/epma-platform/soap-client/MedicationAdministrationWS';
import { AppSessionInfo } from 'src/app/lorappcommonbb/utilities/globalvariable';
import { MedChartData } from '../utilities/globalvariable';
import { GridExtension, GridViewCellClickEventArgs, RowLoadedEventArgs } from 'src/app/shared/epma-platform/controls/epma-grid-helpers/grid-extension';

import { CellStyle } from 'src/app/shared/epma-platform/controls/epma-grid-helpers/cell-style.component';
import {  DisplayPrescriptionLineItemMedPipe } from 'src/app/lorarcbluebirdmedicationchart/converter/MedChartConverter.pipe';
import { Visibility } from 'src/app/shared/epma-platform/controls-model/Visibility';
import { CConstants } from '../utilities/CConstants';
import { Resource } from '../resource';
import { CallBackMethodRefName, SelfAdminCallBackEventArgs, SelfAdminDrugDetailVM } from '../viewmodel/MedsAdminVM';
import { MedsAdminChartToolTip } from '../resource/medsadmincharttooltip.designer';
import { medddetails } from 'src/app/lorappmedicationcommonbb/view/medddetails';


@Component({
    selector: 'MedsAdminManageSelfAdminChild',
    templateUrl: './MedsAdminManageSelfAdminChild.html',
    styleUrls: ['./MedsAdminManageSelfAdminChild.css']
})

export class MedsAdminManageSelfAdminChild extends iAppDialogWindow {
    private _cellStyle: {};
    ddetChild: medddetails;
    public objSelfAdminDrugDetailVM: SelfAdminDrugDetailVM;
    public MedCharOIDBC: number;
    private LayoutRoot: Grid;
    public objManageSelfAdministration = Resource.ManageSelfAdministration;
    @ViewChild("LayoutRootTempRef", { read: Grid, static: false }) set _LayoutRoot(c: Grid) {
        if (c) { this.LayoutRoot = c; }
    };
    grdManageSelfAdmin: GridExtension = new GridExtension();
    @ViewChild("grdManageSelfAdminTempRef", { read: GridComponent, static: false })
    set _grdManageSelfAdmin(c: GridComponent) {
        if (c) {
            this.grdManageSelfAdmin.grid = c;
            this.grdManageSelfAdmin.columns = c.columns;
        }
    };
    @ViewChildren('temp' , { read: DataTemplate }) 
    dataTemplates: QueryList<DataTemplate>;
    rowLoaded(context: any) {
        let rowEventArgs = this.grdManageSelfAdmin.GetRowEventArgs(
            this.dataTemplates,
            context
        );
        this.grdManageSelfAdmin_RowLoaded({}, rowEventArgs);
    }


    @ViewChild('CellTemplateStyle', { read: CellStyle, static: false })
    set cellTemplateStyle(value: CellStyle) {
        this._cellStyle = this.grdManageSelfAdmin.setCellStyle(
            value,
            this.grdManageSelfAdmin.columns
        );
    }
    MedAdminLineDisplay:  DisplayPrescriptionLineItemMedPipe;
    
    constructor(private changeDetect?: ChangeDetectorRef) {
        super();
        this.DataContext = new SelfAdminDrug();
    }
    public maxScrollHeight;
    ngAfterViewInit(): void {
        if(window.screen.height < 1000 && window.devicePixelRatio != 1.25){
            this.maxScrollHeight = 355;
        }else{
            this.maxScrollHeight = (window.devicePixelRatio == 1) ? 485 :(485/window.devicePixelRatio)-16;
        }
        this.grdManageSelfAdmin.GenerateColumns();
        this.ChildWindow_Loaded(null, null);
    }
    public OKButton_Click(): void {
        this.objSelfAdminDrugDetailVM.ManageSelfAdminDetails();
        
    }
    ChildWindow_Loaded(sender: Object, e: RoutedEventArgs): void {
        this.objSelfAdminDrugDetailVM = <SelfAdminDrugDetailVM>this.DataContext;
        this.grdManageSelfAdmin.RowIndicatorVisibility = Visibility.Collapsed;
        if (this.objSelfAdminDrugDetailVM != null) {
            // this.objSelfAdminDrugDetailVM.OnSelfAdminCallBack = (s, e) => { this.objSelfAdminDrugDetailVM_OnSelfAdminCallBack(s, e); };     
            this.objSelfAdminDrugDetailVM.GetSelfAdminDetailsCompleted.subscribe(x => {
                this.grdManageSelfAdmin.ItemsSource = this.objSelfAdminDrugDetailVM.SelfAdminDrugDetails;
            })
    
            this.objSelfAdminDrugDetailVM.GetSelfAdminDetails(Convert.ToInt64(AppSessionInfo.AMCV), this.MedCharOIDBC);
        }
    }
    rowCallback = (context: RowClassArgs) => {
        let rowStyles = this.grdManageSelfAdmin.getRowStyles(context);
        return rowStyles;
    };
    grdManageSelfAdmin_RowLoaded(sender: Object, e: RowLoadedEventArgs): void {
        if (e.Row != null && e.Row.Item != null && e.DataElement != null) {
            let oManageselfadmin: SelfAdminDrug = ObjectHelper.CreateType<SelfAdminDrug>(e.DataElement, SelfAdminDrug);
            if (oManageselfadmin != null &&
                oManageselfadmin.oPrescriptionItemView != null
                && oManageselfadmin.oPrescriptionItemView.oPresItemBasicPropertiesView != null
                && !String.IsNullOrEmpty(oManageselfadmin.oPrescriptionItemView.oPresItemBasicPropertiesView.Direction)
                && String.Equals(oManageselfadmin.oPrescriptionItemView.oPresItemBasicPropertiesView.Direction,
                    CConstants.AsNeeded, StringComparison.InvariantCultureIgnoreCase)
            ) {
                // e.Row.Background = new SolidColorBrush(MedChartData.AsRequiredSlotsColor);
                // e.dataItem['RowStyles'].push("AsRequiredSlotsColor");
                 this.grdManageSelfAdmin.SetRowStyle( e, MedChartData.AsRequiredSlotsColor.color,'Background')
                e.Row.IsAlternating = false;
            }
        }
    }
    objSelfAdminDrugDetailVM_OnSelfAdminCallBack(sender: Object, e: SelfAdminCallBackEventArgs): void {
        if (e.CallBackMethod == CallBackMethodRefName.GetSelfAdminDetails) {
            // this.grdManageSelfAdmin.SetBinding(GridExtension.ItemsSourceProperty, ObjectHelper.CreateObject(new Data.Binding("SelfAdminDrugDetails"), { Mode: BindingMode.OneWay }));
            // this.objSelfAdminDrugDetailVM.GetSelfAdminDetailsCompleted
            this.objSelfAdminDrugDetailVM.GetSelfAdminDetailsCompleted.subscribe(x => {             
                this.grdManageSelfAdmin.SetBinding(
                    'data', this.objSelfAdminDrugDetailVM.SelfAdminDrugDetails
                );
            })
            this.EnableCommentsSection();
        }
        else if (e.CallBackMethod == CallBackMethodRefName.ManageSelfAdmin) {
            if (e.CallBackError == null) {
                this.appDialog.DialogResult = true;
            }
        }
    }
    chkSelfAdminister_KeyDown_Func = (s, e) => { this.chkSelfAdminister_KeyDown(s, e); };
    chkSelfAdminister_KeyDown(sender: Object, e: KeyEventArgs): void {
        if (e.PlatformKeyCode == 13) {
            let chkSelfAdminister: iCheckBox = <iCheckBox>this.grdManageSelfAdmin.FindName("chkSelfAdminister");
            chkSelfAdminister.IsChecked = !chkSelfAdminister.IsChecked;
        }
    }
    ngOnInit(): void {
        this.grdManageSelfAdmin.RowIndicatorVisibility = Visibility.Collapsed;
        this.grdManageSelfAdmin.onCellClick = (s, e) => { this.grdManageSelfAdmin_onCellClick(s, e); };
    }
     public grdManageSelfAdmin_onCellClick(sender: Object, args: GridViewCellClickEventArgs): void {
        this.grdManageSelfAdmin.setSelectedItemByIndex(args.RowIndex);
        if (this.grdManageSelfAdmin.GetColumnIndexByName("SelfAdminister") == args.ColumnIndex) {
            if (args.RowIndex >= 0) {
            }
        }
        else if (this.grdManageSelfAdmin.GetColumnIndexByName("SlctColumn") == args.ColumnIndex) {
            if (args.RowIndex >= 0) {
                let sDrugName: string = String.Empty;
                let MCVersionNo: string = String.Empty;
                let objSelfAdminDrugVM: SelfAdminDrug = ObjectHelper.CreateType<SelfAdminDrug>(this.grdManageSelfAdmin.GetRowData(args.RowIndex), SelfAdminDrug);
                if (objSelfAdminDrugVM != null && objSelfAdminDrugVM instanceof SelfAdminDrug && objSelfAdminDrugVM.oPrescriptionItemView != null) {
                    if (objSelfAdminDrugVM.oPrescriptionItemView.oPrescriptionItem != null) {
                        MCVersionNo = objSelfAdminDrugVM.oPrescriptionItemView.oPrescriptionItem.MCVersionNo;
                    }
                    this.ddetChild = new medddetails();
                    this.ddetChild.PrescriptionItemOID = objSelfAdminDrugVM.oPrescriptionItemView.oPrescriptionItem.OID;
                    this.ddetChild.MCVersion = !String.IsNullOrEmpty(MCVersionNo) ? MCVersionNo : AppSessionInfo.AMCV;
                    this.ddetChild.LorenzoID = objSelfAdminDrugVM.LorenzoID;
                    this.ddetChild.ServiceOID = MedChartData.ServiceOID;
                    this.ddetChild.LocationOID = MedChartData.LocationOID;
                    if (String.Compare(objSelfAdminDrugVM.ItemSubType, CConstants.ItemSubType, StringComparison.InvariantCultureIgnoreCase) == 0)
                        sDrugName = MedsAdminChartToolTip.AdhocItemCaption;
                    else sDrugName = objSelfAdminDrugVM.oPrescriptionItemView.oPrescriptionItem.IdentifyingName;
                    AppActivity.OpenWindow(sDrugName, this.ddetChild, this.ddetChild_Closed, "", false, 650, 930, false, WindowButtonType.Close, null);
                }
            }
        }
        this.grdManageSelfAdmin.CommitEdit();
    }
    public ddetChild_Closed(args: AppDialogEventargs): void {
        args.AppChildWindow.DialogResult = true;
    }
    public EnableCommentsSection(): void {

    }

    chkSelfAdminister_Checked_Func = (s, e) => { this.chkSelfAdminister_Checked(s, e); };
    chkSelfAdminister_Checked(sender: iCheckBox, e: RoutedEventArgs): void {
        if (sender.IsChecked) {
            let rowData: Object = this.grdManageSelfAdmin.GetRowData(sender.GridRowIndex);
            if (this.grdManageSelfAdmin != null && rowData != null && rowData instanceof SelfAdminDrug && (ObjectHelper.CreateType<SelfAdminDrug>(rowData, SelfAdminDrug)).IsParacetamolIngredient) {
                if (this.DataContext != null && this.DataContext instanceof SelfAdminDrugDetailVM &&
                    (ObjectHelper.CreateType<SelfAdminDrugDetailVM>(this.DataContext, SelfAdminDrugDetailVM)).SelfAdminDrugDetails != null &&
                    (ObjectHelper.CreateType<SelfAdminDrugDetailVM>(this.DataContext, SelfAdminDrugDetailVM)).SelfAdminDrugDetails.Count > 0 &&
                    (ObjectHelper.CreateType<SelfAdminDrugDetailVM>(this.DataContext, SelfAdminDrugDetailVM)).SelfAdminDrugDetails.Where((x) => x.IsParacetamolIngredient).Count() > 1) {
                    let oMessageBox: iMessageBox = new iMessageBox();
                    oMessageBox.Message = Resource.ManageSelfAdministration.Paracetamol_warning;
                    oMessageBox.IconType = MessageBoxType.Question;
                    oMessageBox.MessageButton = MessageBoxButton.YesNo;
                    oMessageBox.Title = "LORENZO";
                    oMessageBox.Width = 420;
                    oMessageBox.Height = 180;
                    oMessageBox.MessageBoxClose = (msgEvtArgs) => {
                        if (msgEvtArgs.MessageBoxResult == MessageBoxResult.Yes) {
                            return
                        }
                        else {
                            sender.IsChecked = false;
                        }
                    };
                    oMessageBox.Show();
                }         
            }      
        }
        else {
            let rowData: Object = this.grdManageSelfAdmin.GetRowData(sender.GridRowIndex);
            if (this.grdManageSelfAdmin != null && rowData != null && rowData instanceof SelfAdminDrug) {
                rowData.SelfAdminComments = "";
            }
        }
      }
    }
