import { AfterViewInit, Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { StringBuilder, ProfileFactoryType, ContextManager, Convert, AppActivity, iBusyIndicator } from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp, Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison, AppDialogEventargs, AppDialogResult, DelegateArgs, DialogComponentArgs, WindowButtonType, AppSessionInfo, ChildWindow, SelectionChangedEventArgs, Visibility, iAppDialogWindow } from 'epma-platform/models';
import { AppDialog, Colors, ContentPresenter, EventArgs, Grid, SolidColorBrush, iCheckBox, iComboBox, iLabel, iListBox } from 'epma-platform/controls';
import { HelperService } from 'epma-platform/soapclient';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
import { Busyindicator } from 'src/app/lorappcommonbb/busyindicator';
import { GridViewCellClickEventArgs } from 'src/app/shared/epma-platform/controls/Control';
import { RoutedEventArgs } from 'src/app/shared/epma-platform/controls/FrameworkElement';
import { Resource } from '../resource';
import { InfusionTypesCode, PrescribeSource, CConstants } from '../utilities/constants';
import { PrescriptionItemVM, InfContinousSequentail } from '../viewmodel/PrescriptionItemVM';
import { IPPMABaseVM } from '../viewmodel/ippmabasevm';
import { MedAccessConstraintsVM } from '../viewmodel/medaccessconstraintsvm';
import { GridExtension } from 'src/app/shared/epma-platform/controls/epma-grid-helpers/grid-extension';
import { GridComponent } from '@progress/kendo-angular-grid';
import * as ControlStyles from "../../shared/epma-platform/controls/ControlStyles";
import { DrugItemInputData } from 'src/app/shared/epma-platform/soap-client/ManagePrescriptionWS';
import { WrapToolTip } from 'src/app/product/shared/convertor/medicationconverters.service';
import { Binding, BindingMode } from "src/app/shared/epma-platform/controls/FrameworkElement";

@Component({ selector: 'MedAccessConstraintsChild', templateUrl: './medaccessconstraintschild.html' })

export class MedAccessConstraintsChild extends iAppDialogWindow implements OnInit,AfterViewInit {

    public MainLayoutRoot: Grid;
    @ViewChild("MainLayoutRootTempRef", { read: Grid, static: false }) set _MainLayoutRoot(c: Grid) {
        if (c) { this.MainLayoutRoot = c; }
    };
    private lblDrugName: iLabel;
    @ViewChild("lblDrugNameTempRef", { read: iLabel, static: false }) set _lblDrugName(c: iLabel) {
        if (c) { this.lblDrugName = c; }
    };
    private spGPItemDetail: ContentPresenter;
    @ViewChild("spGPItemDetailTempRef", { read: ContentPresenter, static: false }) set _spGPItemDetail(c: ContentPresenter) {
        if (c) { this.spGPItemDetail = c; }
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
    //private grdDetails: iGrid;
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

    public oMedAccessConst: MedAccessConstraintsVM;
    public objPresItemVM: PrescriptionItemVM;
    public oDrugItemInputData: DrugItemInputData;
    public medAccessconstraintParent: ChildWindow;
    public IPPMABaseVMData: IPPMABaseVM;
    public get objDrugItemInputData(): DrugItemInputData {
        return this.oDrugItemInputData;
    }
    public set objDrugItemInputData(value: DrugItemInputData) {
        this.oDrugItemInputData = value;
    }

    calcHeight = 100;
    @ViewChild("divGrid", { static: false }) divGrid: ElementRef;

    public objResMedAccessConstraints = Resource.ResMedAccessConstraints;
    public Styles = ControlStyles;
    NoteToolTip: WrapToolTip;
    
    constructor() {
        super();
        //InitializeComponent();        
    }

    constructorImpl(ovm: IPPMABaseVM) {                
        this.IPPMABaseVMData = ovm;
    }

    ngOnInit(): void {
        this.grdDetails.onCellClick = (s, e) => { this.grdDetails_onCellClick(s, e); };
    }

    ngAfterViewInit(): void {

        setTimeout(() => {
            this.calcHeight = this.divGrid.nativeElement.clientHeight;    
        }, 0);

        this.LayoutRoot_Loaded(null,null);   
        this.grdDetails.GenerateColumns();
    }

    private LayoutRoot_Loaded(sender: Object, e: RoutedEventArgs): void {
        this.oMedAccessConst = ObjectHelper.CreateType<MedAccessConstraintsVM>(this.DataContext, MedAccessConstraintsVM);
        if (this.oMedAccessConst != null && !String.IsNullOrEmpty(this.oMedAccessConst.DrugName))
            this.lblDrugName.Text = this.oMedAccessConst.DrugName;
            setTimeout(() => {
                this.oMedAccessConst.GetIndications();
                let object = ObjectHelper.CreateObject(new Binding(this.DataContext, 'LsIndication'), { Mode: BindingMode.OneWay });
                this.lstIndication.SetBinding(iListBox.ItemsSourceProperty, object); 
            }, 0);        
        //this.grdDetails.SetBinding('data', this.oMedAccessConst.PresOptions);
        Busyindicator.SetStatusIdle("FormViewer");
        Busyindicator.SetStatusIdle("Favourites");
        this.IPPMABaseVMData.PrescribeNewItemEvent = (s, e) => { this.objMPVM_PrescribeNewItemEvent(s); };
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
        this.DataContext = this.oMedAccessConst;
        this.oMedAccessConst.GetProcessingOptionByIndication();
        if(this.oMedAccessConst!= null && this.oMedAccessConst.PresOptions != null)
        {
            this.grdDetails.SetBinding('data', this.oMedAccessConst.PresOptions);
        }
    }

    grdDetails_onCellClick(sender: Object, args: GridViewCellClickEventArgs): void {
        if (this.grdDetails.GetColumnIndexByName("SlctColumn") == args.ColumnIndex) {
            if (!this.oMedAccessConst.IsChkOverrideIndication || (this.oMedAccessConst.IsChkOverrideIndication && this.oMedAccessConst.IndicationOverrideReasonValue != null && !String.IsNullOrEmpty(this.oMedAccessConst.IndicationOverrideReasonValue.Value) && !String.IsNullOrEmpty(this.oMedAccessConst.IndicationOverrideReasonValue.DisplayText))) {
                this.objPresItemVM = ObjectHelper.CreateType<PrescriptionItemVM>(this.grdDetails.GetRowData(args.RowIndex), PrescriptionItemVM);
                if (this.objPresItemVM.IsProcessinIconEnable)
                    iBusyIndicator.Start("IndicationreqForm", true);
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
                this.objDrugItemInputData.LorenzoID = this.objPresItemVM.LorenzoID;
                this.objPresItemVM.FormViewerDetails.BasicDetails.ProblemIndication = this.oMedAccessConst.Term;
                this.IPPMABaseVMData.PrescribeNewItemEvent = (s, e) => { this.objMPVM_PrescribeNewItemEvent(s); };
                this.objPresItemVM.NonFormularyReason = this.oMedAccessConst.NonFormularyReason;
                this.objPresItemVM.OtherNonFormularyReason = this.oMedAccessConst.OtherNonFormularyReason;
                if (this.oMedAccessConst.validateForMDDFLocailzeIndication()) {
                    this.objPresItemVM.FillPresItemProcDetail();
                }
                if (this.objPresItemVM != null && this.objPresItemVM.FormViewerDetails != null && this.objPresItemVM.FormViewerDetails.BasicDetails != null && this.objPresItemVM.FormViewerDetails.BasicDetails.Route != null && this.objPresItemVM.FormViewerDetails.BasicDetails.Route.Tag != null && (this.objPresItemVM.FormViewerDetails.BasicDetails.Route.Tag.ToString() == "0" || (this.objPresItemVM.FormViewerDetails.BasicDetails.Route.Tag.ToString() == "1" && this.objPresItemVM.FormViewerDetails.BasicDetails.InfusionType != null && (!String.Equals(this.objPresItemVM.FormViewerDetails.BasicDetails.InfusionType.Value, InfusionTypesCode.CONTINUOUS) && !String.Equals(this.objPresItemVM.FormViewerDetails.BasicDetails.InfusionType.Value, InfusionTypesCode.SINGLEDOSEVOLUME) && !String.Equals(this.objPresItemVM.FormViewerDetails.BasicDetails.InfusionType.Value, InfusionTypesCode.FLUID)))) && this.IPPMABaseVMData.InfusionContinousSeq != null && (this.IPPMABaseVMData.InfusionContinousSeq.SequentialRoute != null || this.IPPMABaseVMData.InfusionContinousSeq.SequentialMultiplsRoutes != null) && this.IPPMABaseVMData.InfusionContinousSeq.IsSequentialPrescribing) {
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
            this.IPPMABaseVMData.PrescribeNewItem(this.objDrugItemInputData, this.objPresItemVM);
        }
        else {
            if (e.MessageBoxResult == MessageBoxResult.Cancel) {
                Busyindicator.SetStatusIdle("IndicationreqForm");
                Busyindicator.SetStatusIdle("FormViewer");
            }
        }
    }
    public objMPVM_PrescribeNewItemEvent(IsChildWindowClosed: boolean): void {
        if (!(IsChildWindowClosed)) {               
            this.dupDialogRef.close(); // medaccessconstraints window ref
            if(this.IPPMABaseVMData != null && this.IPPMABaseVMData.oSecChild != null && this.IPPMABaseVMData.oSecChild.dupDialogRef != null)
                this.IPPMABaseVMData.oSecChild.dupDialogRef.close(); //secondarytabchild window ref            
            if(this.IPPMABaseVMData != null && this.IPPMABaseVMData.oSecChild != null && this.IPPMABaseVMData.oSecChild.objChild != null
                && this.IPPMABaseVMData.oSecChild.objChild.dupDialogRef != null)
                this.IPPMABaseVMData.oSecChild.objChild.dupDialogRef.close(); //pack options window ref            
        }
        else {
            this.appDialog.DialogResult = null;
            if (this.medAccessconstraintParent != null)
                this.medAccessconstraintParent.DialogResult = null;
        }
    }
    // private ChildWindow_Closed(sender: Object, e: EventArgs): void {

    // }
    // private DisposeFormEvents(): void {
    //     if (this.IPPMABaseVMData != null) {
    //         this.IPPMABaseVMData.PrescribeNewItemEvent -= objMPVM_PrescribeNewItemEvent;
    //     }
    // }
    // private MedAccessContraintsChild_Unloaded(sender: Object, e: RoutedEventArgs): void {
    //     this.DisposeFormEvents();
    // }
}
