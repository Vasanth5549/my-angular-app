import { Component, OnInit, ViewChild } from '@angular/core';
import { StringBuilder, ProfileFactoryType, ContextManager, Convert, AppActivity, iBusyIndicator } from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp, Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison, AppDialogEventargs, AppDialogResult, DelegateArgs, DialogComponentArgs, WindowButtonType, Visibility, SelectionChangedEventArgs, CListItem, ObservableCollection } from 'epma-platform/models';
import { AppDialog, Colors, GridLength, SolidColorBrush, UserControl, iCheckBox, iComboBox, iLabel, iListBox, iTab, iTabItem } from 'epma-platform/controls';
import { HelperService } from 'epma-platform/soapclient';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
import { DrugItemInputData } from 'src/app/shared/epma-platform/soap-client/ManagePrescriptionWS';
import { MedAccessConstraintsVM } from '../viewmodel/medaccessconstraintsvm';
import { InfContinousSequentail, PrescriptionItemVM } from '../viewmodel/PrescriptionItemVM';
import { IPPMABaseVM } from '../viewmodel/ippmabasevm';
import { Grid, GridExtension, GridViewCellClickEventArgs } from 'src/app/shared/epma-platform/controls/epma-grid-helpers/grid-extension';
import { Binding, BindingMode, RoutedEventArgs } from 'src/app/shared/epma-platform/controls/FrameworkElement';
import { GridComponent, } from '@progress/kendo-angular-grid';
import { CommonVariables } from 'src/app/lorappcommonbb/utilities/common';
import { AppSessionInfo } from 'src/app/lorappcommonbb/utilities/globalvariable';
import { Resource } from '../resource';
import { CConstants, PrescribeSource } from '../utilities/constants';
import { Busyindicator } from 'src/app/lorappcommonbb/busyindicator';
import { MedSecondaryTabChild } from './medsecondarytabchild';
import * as ControlStyles from "../../shared/epma-platform/controls/ControlStyles";
import { ColumnDefinition, RowDefinition } from 'src/app/shared/epma-platform/controls/epma-grid/epma-grid.component';
import { WrapToolTip } from 'src/app/product/shared/convertor/medicationconverters.service';
import { iterator } from '@progress/kendo-angular-grid/utils';
import { QueryStringInfo } from '../utilities/globalvariable';

@Component({
     selector: 'MedAccessConstraints', 
     templateUrl: './medaccessconstraints.html',
     styleUrls: ['./medaccessconstraints.css']
     })

export class MedAccessConstraints extends UserControl implements OnInit{
    oMedAccessConst: MedAccessConstraintsVM;
    objPresItemVM: PrescriptionItemVM;
    public oDrugItemInputData: DrugItemInputData;
    bLoaded: boolean;
    public IPPMABaseVMData: IPPMABaseVM;
    public get objDrugItemInputData(): DrugItemInputData {
        return this.oDrugItemInputData;
    }
    public set objDrugItemInputData(value: DrugItemInputData) {
        this.oDrugItemInputData = value;
    }

    public objResMedAccessConstraints = Resource.ResMedAccessConstraints;
    public Styles = ControlStyles;

    constructor() {
        super();
        //InitializeComponent();
        this.bLoaded = false;
    }    
    ngOnInit(): void {
        this.grdDetails.onCellClick = (s, e) => { this.grdDetails_onCellClick(s, e); };
        //this.lstIndication.SelectionChangedValue = (s) => {this.lstIndication_SelectionChanged(s);};
    }

    public maxscrollHeightone;
    public maxLayoutHeight;
    public rowHeight ;
    ngAfterViewInit(): void {
        if(!String.IsNullOrEmpty(QueryStringInfo.IsLaunchformMedchart) &&
                     String.Equals(
                      QueryStringInfo.IsLaunchformMedchart,
                      'True',
                      StringComparison.InvariantCultureIgnoreCase
                    )){
                        this.maxscrollHeightone = (window.devicePixelRatio == 1) ? 180 : (180/window.devicePixelRatio)-14;
                        this.rowHeight = (window.devicePixelRatio == 1) ? 180 : (180/window.devicePixelRatio)-23;
                    }
                    else{
                        this.maxscrollHeightone = (window.devicePixelRatio == 1) ? 250 : (250/window.devicePixelRatio)-14;
                        this.rowHeight = (window.devicePixelRatio == 1) ? 260 : (260/window.devicePixelRatio)-23;  
                    }
                    if(window.screen.height < 1000 && window.devicePixelRatio != 1.25){
                        this.maxLayoutHeight = window.innerHeight - 290;
                      }
                     
        this.bLoaded = false;      
        this.LayoutRoot_Loaded(null,null);   
        this.grdDetails.GenerateColumns();     
    }

    public MainLayoutRoot: Grid;
    @ViewChild("MainLayoutRootTempRef", { read: Grid, static: false }) set _MainLayoutRoot(c: Grid) {
        if (c) { this.MainLayoutRoot = c; }
    };
    public LayoutRoot: Grid;
    @ViewChild("LayoutRootTempRef", { read: Grid, static: false }) set _LayoutRoot(c: Grid) {
        if (c) { this.LayoutRoot = c; }
    };
    private lblCaptionName: iLabel;
    @ViewChild("lblCaptionNameTempRef", { read: iLabel, static: false }) set _lblCaptionName(c: iLabel) {
        if (c) { this.lblCaptionName = c; }
    };
    private lblIndications: iLabel;
    @ViewChild("lblIndicationsTempRef", { read: iLabel, static: false }) set _lblIndications(c: iLabel) {
        if (c) { this.lblIndications = c; }
    };
    public lstIndication: iListBox;
    @ViewChild("lstIndicationTempRef", { read: iListBox, static: false }) set _lstIndication(c: iListBox) {
        if (c) { this.lstIndication = c; }
    };
    private lblPrescribing: iLabel;
    @ViewChild("lblPrescribingTempRef", { read: iLabel, static: false }) set _lblPrescribing(c: iLabel) {
        if (c) { this.lblPrescribing = c; }
    };
    //private 
    grdDetails: GridExtension = new GridExtension();
    @ViewChild("grdDetailsTempRef", { read: GridComponent, static: false }) set _grdDetails(c: GridComponent) {
        if (c) { this.grdDetails.grid = c; this.grdDetails.columns = c.columns; }
    };
    private lblOverrideIndication: iLabel;
    @ViewChild("lblOverrideIndicationTempRef", { read: iLabel, static: false }) set _lblOverrideIndication(c: iLabel) {
        if (c) { this.lblOverrideIndication = c; }
    };
    public chkOverrideIndication: iCheckBox;
    @ViewChild("chkOverrideIndicationTempRef", { read: iCheckBox, static: false }) set _chkOverrideIndication(c: iCheckBox) {
        if (c) { this.chkOverrideIndication = c; }
    };
    private lblReasonForIndication: iLabel;
    @ViewChild("lblReasonForIndicationTempRef", { read: iLabel, static: false }) set _lblReasonForIndication(c: iLabel) {
        if (c) { this.lblReasonForIndication = c; }
    };
    private cboOverrideReason: iComboBox;
    @ViewChild("cboOverrideReasonTempRef", { read: iComboBox, static: false }) set _cboOverrideReason(c: iComboBox) {
        if (c) { this.cboOverrideReason = c; }
    };

    NoteToolTip: WrapToolTip;
    
    // private CancelButton_Click(sender: Object, e: RoutedEventArgs): void {

    // }    
    public DispensingInstructionsList: ObservableCollection<CListItem> =
    new ObservableCollection<CListItem>();
        
    private LayoutRoot_Loaded(sender: Object, e: RoutedEventArgs): void {
        if (!this.bLoaded) {
            this.oMedAccessConst = ObjectHelper.CreateType<MedAccessConstraintsVM>(this.DataContext, MedAccessConstraintsVM);
            console.log("IsVisible =>" + this.DataContext.IsVisibleOverrideIndication);
            this.lstIndication.Focus();
            // if (this.oMedAccessConst.LblDrugVisible)
            //     this.LayoutRoot.RowDefinition[0].Height = new GridLength(20);
            // else 
            //     this.LayoutRoot.RowDefinition[0].Height = new GridLength(0);                        
            setTimeout(() => {
                this.oMedAccessConst.GetIndications();
                let object = ObjectHelper.CreateObject(new Binding(this.DataContext, 'LsIndication'), { Mode: BindingMode.OneWay });
                this.lstIndication.SetBinding(iListBox.ItemsSourceProperty, object); 
            }, 0);            
            // if(this.oMedAccessConst!= null && this.oMedAccessConst.PresOptions != null)
            // {
            //     this.grdDetails.SetBinding('data', this.oMedAccessConst.PresOptions);
            // }
            this.bLoaded = true;
        }        
    }
    lstIndication_SelectionChanged(sender: Object, e: SelectionChangedEventArgs): void {
        let sArrItem: string[] = null;
        sArrItem = this.lstIndication.GetValue(this.lstIndication.SelectedIndex).Split(',');
        this.oMedAccessConst.IdentifyingOID = Convert.ToInt64(this.oMedAccessConst.DrugOid);
        this.oMedAccessConst.IdentifyingType = this.oMedAccessConst.DrugType;
        this.oMedAccessConst.Code = sArrItem[0];
        this.oMedAccessConst.CodingschemeCode = sArrItem[1];
        this.oMedAccessConst.Version = sArrItem[2];
        this.oMedAccessConst.Term = this.lstIndication.GetText(this.lstIndication.SelectedIndex);
        this.oMedAccessConst.ItemsubType = this.oMedAccessConst.ItemsubType;
        this.DataContext = this.oMedAccessConst;
        this.oMedAccessConst.GetProcessingOptionByIndication();
        if(this.oMedAccessConst!= null && this.oMedAccessConst.PresOptions != null)
        {
            this.grdDetails.SetBinding('data', this.oMedAccessConst.PresOptions);
        }
        else 
        {
            this.grdDetails.Rebind();
        }
    }
    grdDetails_onCellClick(sender: Object, args: GridViewCellClickEventArgs): void {
        if (this.grdDetails.GetColumnIndexByName("SlctColumn") == args.ColumnIndex) {
            if (!this.oMedAccessConst.IsChkOverrideIndication || (this.oMedAccessConst.IsChkOverrideIndication && this.oMedAccessConst.IndicationOverrideReasonValue != null && !String.IsNullOrEmpty(this.oMedAccessConst.IndicationOverrideReasonValue.Value) && !String.IsNullOrEmpty(this.oMedAccessConst.IndicationOverrideReasonValue.DisplayText))) {
                this.objPresItemVM = ObjectHelper.CreateType<PrescriptionItemVM>(this.grdDetails.GetRowData(args.RowIndex), PrescriptionItemVM);
                if (this.objPresItemVM.IsProcessinIconEnable) {
                    iBusyIndicator.Start("FormViewer", true);
                    CommonVariables.FormViewerIsInProgress = true;
                }
                this.objPresItemVM.IsProcessinIconEnable = false;
                this.objDrugItemInputData = new DrugItemInputData();
                this.objDrugItemInputData.IdentifyingName = this.objPresItemVM.FormViewerDetails.BasicDetails.IdentifyingName;
                this.objDrugItemInputData.IdentifyingOID = Convert.ToInt64(this.objPresItemVM.FormViewerDetails.BasicDetails.IdentifyingOID);
                this.objDrugItemInputData.IdentifyingType = this.objPresItemVM.FormViewerDetails.BasicDetails.IdentifyingType;
                this.objDrugItemInputData.MCVersionNo = AppSessionInfo.AMCV;
                this.objDrugItemInputData.IsFormulary = (this.objPresItemVM.IsNonformulary == '1') ? false : true;
                this.objDrugItemInputData.FavouritesDetailOID = 0;
                this.objDrugItemInputData.IsAccessContraint = this.objPresItemVM.IsAccessContraint;
                this.objDrugItemInputData.IsPrescribeByBrand = this.objPresItemVM.IsPrescribeByBrand;
                this.objDrugItemInputData.ItemType = this.objPresItemVM.ItemMainType;
                this.objDrugItemInputData.ITMSUBTYP = this.objPresItemVM.ItemSubType;
                this.objPresItemVM.FormViewerDetails.BasicDetails.ProblemIndication = this.oMedAccessConst.Term;
                this.IPPMABaseVMData.PrescribeNewItemEvent = (s, e) => { this.objMPVM_PrescribeNewItemEvent(s); };
                this.objPresItemVM.NonFormularyReason = this.oMedAccessConst.NonFormularyReason;
                this.objPresItemVM.OtherNonFormularyReason = this.oMedAccessConst.OtherNonFormularyReason;
                if (this.oMedAccessConst.validateForMDDFLocailzeIndication()) {
                    this.objPresItemVM.FillPresItemProcDetail();
                }
                if (this.objPresItemVM != null && this.objPresItemVM.FormViewerDetails != null && this.objPresItemVM.FormViewerDetails.BasicDetails != null && this.objPresItemVM.FormViewerDetails.BasicDetails.Route != null && this.objPresItemVM.FormViewerDetails.BasicDetails.Route.Tag != null && this.IPPMABaseVMData.InfusionContinousSeq != null && (this.objPresItemVM.FormViewerDetails.BasicDetails.Route.Tag.ToString() == "0" || (this.objPresItemVM.FormViewerDetails.BasicDetails.Route.Tag.ToString() == "1" && this.objPresItemVM.FormViewerDetails.BasicDetails.InfusionType != null && this.IPPMABaseVMData.InfusionContinousSeq.Infusiontype != null && !String.Equals(this.objPresItemVM.FormViewerDetails.BasicDetails.InfusionType.Value, this.IPPMABaseVMData.InfusionContinousSeq.Infusiontype.Value))) && (this.IPPMABaseVMData.InfusionContinousSeq.SequentialRoute != null || this.IPPMABaseVMData.InfusionContinousSeq.SequentialMultiplsRoutes != null) && this.IPPMABaseVMData.InfusionContinousSeq.IsSequentialPrescribing) {
                    let iMsgBox: iMessageBox = ObjectHelper.CreateObject(new iMessageBox(), {
                        Title: "Lorenzo - Manage prescription",
                        Message: Resource.Infusion.SequentialRouteDifferentitemlevel_Message,
                        MessageButton: MessageBoxButton.OKCancel,
                        IconType: MessageBoxType.Question
                    });
                    iMsgBox.MessageBoxClose = (s, e) => { this.iMsgBox_MessageBoxClose(s, e); };
                    iMsgBox.Show();
                }
                else {
                    if (this.objPresItemVM != null && this.objPresItemVM.FormViewerDetails != null && this.objPresItemVM.FormViewerDetails.BasicDetails != null && this.objPresItemVM.FormViewerDetails.BasicDetails.Route != null && this.objPresItemVM.FormViewerDetails.BasicDetails.Route.Tag != null && this.objPresItemVM.FormViewerDetails.BasicDetails.Route.Tag.ToString() == "1" && this.IPPMABaseVMData.InfusionContinousSeq != null && (this.IPPMABaseVMData.InfusionContinousSeq.SequentialRoute != null || this.IPPMABaseVMData.InfusionContinousSeq.SequentialMultiplsRoutes != null))
                        this.IPPMABaseVMData.PrescribeNewItem(this.objDrugItemInputData);
                    else {
                        this.objPresItemVM.FormViewerDetails.BasicDetails.IsLoadingDataForOrderSentence = true;
                        this.objPresItemVM.ePrescribeSource = PrescribeSource.DOS;
                        this.IPPMABaseVMData.PrescribeNewItem(this.objDrugItemInputData, this.objPresItemVM);
                    }
                }
            }
            else {
                if (this.oMedAccessConst.IsChkOverrideIndication && (this.oMedAccessConst.IndicationOverrideReasonValue == null || (this.oMedAccessConst.IndicationOverrideReasonValue != null && String.IsNullOrEmpty(this.oMedAccessConst.IndicationOverrideReasonValue.Value)))) {
                    let iMsgBox: iMessageBox = ObjectHelper.CreateObject(new iMessageBox(), {
                        Title: "Lorenzo",
                        OverlayBrush: new SolidColorBrush(Colors.Transparent),
                        MessageButton: MessageBoxButton.OK,
                        IconType: MessageBoxType.Exclamation,
                        Message: CConstants.ErrMsgOverrideIndicationRsn
                    });
                    iMsgBox.MessageBoxClose = (s, e) => { this.iMsgBox_MessageBoxClose_validation(s, e); };
                    iMsgBox.Show();
                }
            }
        }
    }
    iMsgBox_MessageBoxClose_validation(sender: Object, e: MessageEventArgs): void {
        if (e.MessageBoxResult == MessageBoxResult.OK)
            this.cboOverrideReason.Focus();
    }
    iMsgBox_MessageBoxClose(sender: Object, e: MessageEventArgs): void {
        if (e.MessageBoxResult == MessageBoxResult.OK) {
            this.IPPMABaseVMData.PrescribeNewItemEvent = (s, e) => { this.objMPVM_PrescribeNewItemEvent(s); };
            this.IPPMABaseVMData.InfusionContinousSeq = new InfContinousSequentail();
            this.objPresItemVM.FormViewerDetails.BasicDetails.InfusionDetails.PrevSequentialPrescribingData = new InfContinousSequentail();
            this.objPresItemVM.FormViewerDetails.BasicDetails.InfusionDetails.SequentialItemOrder = 0;
            this.objPresItemVM.FormViewerDetails.BasicDetails.InfusionDetails.PrescriptionItemNumber = 0;
            this.objPresItemVM.FormViewerDetails.BasicDetails.InfusionDetails.IsSequentiallinkvisi = Visibility.Collapsed;
            this.objPresItemVM.FormViewerDetails.BasicDetails.IsSequentiallinkvisi = Visibility.Collapsed;
            this.objPresItemVM.FormViewerDetails.BasicDetails.InfusionDetails.IsDisplayOrderSeqPresc = String.Empty;
            this.objPresItemVM.FormViewerDetails.BasicDetails.InfusionDetails.CurrentSequentialOrder = 0;
            this.objPresItemVM.FormViewerDetails.BasicDetails.InfusionDetails.IsShowRouteDiscrepency = false;
            this.objPresItemVM.FormViewerDetails.BasicDetails.IsLoadingDataForOrderSentence = true;
            this.IPPMABaseVMData.PrescribeNewItem(this.objDrugItemInputData, this.objPresItemVM);
        }
        else {
            if (e.MessageBoxResult == MessageBoxResult.Cancel) {
                Busyindicator.SetStatusIdle("FormViewer");
            }
        }
    }
   
    objMPVM_PrescribeNewItemEvent(IsChildWindowClosed: boolean): void {
       
        
        this.IPPMABaseVMData.oSecChild.dupDialogRef.close();
        // this.dialog.appDialog.DialogResult = IsChildWindowClosed;
    }

    // public objMPVM_PrescribeNewItemEvent(IsChildWindowClosed: boolean): void {
    //     (<MedSecondaryTabChild>(<Grid>(<iTab>(<iTabItem>this.Parent).Parent).Parent).Parent).appDialog.DialogResult = IsChildWindowClosed;
    // }
    // private ChildWindow_Closed(sender: Object, e: EventArgs): void {

    // }
    // private DisposeFormEvents(): void {
    //     if (this.IPPMABaseVMData != null) {
    //         this.IPPMABaseVMData.PrescribeNewItemEvent -= objMPVM_PrescribeNewItemEvent;
    //     }
    // }
    // private MedAcccessConstraints_Unloaded(sender: Object, e: RoutedEventArgs): void {
    //     this.DisposeFormEvents();
    // }
}
