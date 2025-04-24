import { Component, Input, OnInit, ViewChild,OnDestroy } from "@angular/core";
import { Border, Grid, iButton, iCheckBox, iComboBox, iDateTimePicker, iHyperlinkButton, iLabel, iMultiSelectDropdown, iTextBox, iUpDownBox, KeyEventArgs, MouseButtonEventArgs, ScrollViewer, TextBlock, ToolTipService, UserControl } from "epma-platform/controls";
import DateTime from "epma-platform/DateTime";
import { ObjectHelper } from "epma-platform/helper";
import { AppDialogEventargs, AppDialogResult, ClerkFormViewDeftBehaviour, CListItem, ContentControl, SelectionChangedEventArgs, StringComparison, Visibility, WindowButtonType } from "epma-platform/models";
import { AppActivity, Convert, MessageBoxResult, MessageEventArgs } from "epma-platform/services";
import { CommonBB } from "src/app/lorappcommonbb/utilities/common";
import { InfusionTypeCode } from "src/app/lorappmedicationcommonbb/utilities/constants";
import { CConstants } from "src/app/product/shared/models/constant";
//import { DependencyProperty } from "src/app/shared/epma-platform/controls/iActivitityConsideration";
import { ActivityTypes } from "../model/common";
import { Resource } from "../resource";
import { DoseTypeCode, InfusionTypesCode, PrescriptionTypes, ValueDomain } from "../utilities/constants";
import { CSequentialHelper } from "../utilities/CSequentialHelper";
import { ProfileData } from "../utilities/profiledata";
import { InfusionVM } from "../viewmodel/BasicDetailsVM";
import { MultiSelectListVM } from "../viewmodel/MultiSelectListVM";
import { InfContinousSequentail, PrescriptionItemVM } from "../viewmodel/PrescriptionItemVM";
import { MultiSelectListView } from "./MultiSelectListView";
import { Common as MedicationCommon, MultiRouteEvents } from '../utilities/common';
import { MedChartData } from "src/app/lorappmedicationcommonbb/utilities/globalvariable";
import { iTimeBox } from "src/app/shared/epma-platform/controls/epma-timebox/epma-timebox.component";
import { Binding, BindingMode, RoutedEventArgs } from "src/app/shared/epma-platform/controls/FrameworkElement";
import * as ControlStyles from "../../shared/epma-platform/controls/ControlStyles";
import { ContextInfo, PatientContext } from "src/app/lorappcommonbb/utilities/globalvariable";
import { medipresolvestepped } from "./medipresolvestepped";
import { medContConditionalDose } from "./medcontconditionaldose";
import { CommonService } from "src/app/product/shared/common.service";

var that;

@Component({
    selector: 'app-frmformviewforadminconinfusions',
    templateUrl: './frmformviewforadminconinfusions.html',
    styleUrls: ['./frmformviewforadminconinfusions.css']
})

export class frmformviewForAdminConInfusions extends UserControl implements OnInit,OnDestroy {
    //// DataContext: any;
    testVisible = true;
    layoutRootStyle = Visibility.Visible;
    Ref: this;

    toggleVisibility() {
        this.testVisible = !this.testVisible;
        this.layoutRootStyle = this.layoutRootStyle == Visibility.Visible ? Visibility.Collapsed : Visibility.Visible;
    }

    override _DataContext;
    override get DataContext() {
        return this._DataContext;
    }
    @Input() override set DataContext(value: any) {
        this._DataContext = value;
    }

    ngOnInit(): void {
        console.log("__DataContext__", this._DataContext);
    }

    public svwFormViewer: ScrollViewer;
    @ViewChild("svwFormViewerTempRef", { read: ScrollViewer, static: false }) set _svwFormViewer(c: ScrollViewer) {
        if (c) { this.svwFormViewer = c; }
    };
    public LayoutRoot: Grid;
    @ViewChild("LayoutRootTempRef", { read: Grid, static: false }) set _LayoutRoot(c: Grid) {
        if (c) { this.LayoutRoot = c; }
    };
    public lblNonCatName: iLabel;
    @ViewChild("lblNonCatNameTempRef", { read: iLabel, static: false }) set _lblNonCatName(c: iLabel) {
        if (c) { this.lblNonCatName = c; }
    };
    public txtNonCatItem: iTextBox;
    @ViewChild("txtNonCatItemTempRef", { read: iTextBox, static: false }) set _txtNonCatItem(c: iTextBox) {
        if (c) { this.txtNonCatItem = c; }
    };
    public lblNonCatReason: iLabel;
    @ViewChild("lblNonCatReasonTempRef", { read: iLabel, static: false }) set _lblNonCatReason(c: iLabel) {
        if (c) { this.lblNonCatReason = c; }
    };
    public cboNONCATReason: iComboBox;
    @ViewChild("cboNONCATReasonTempRef", { read: iComboBox, static: false }) set _cboNONCATReason(c: iComboBox) {
        if (c) { this.cboNONCATReason = c; }
    };
    public lblSrcOther: iLabel;
    @ViewChild("lblSrcOtherTempRef", { read: iLabel, static: false }) set _lblSrcOther(c: iLabel) {
        if (c) { this.lblSrcOther = c; }
    };
    public txtOtherNonCatReason: iTextBox;
    @ViewChild("txtOtherNonCatReasonTempRef", { read: iTextBox, static: false }) set _txtOtherNonCatReason(c: iTextBox) {
        if (c) { this.txtOtherNonCatReason = c; }
    };
    public lblRoute: iLabel;
    @ViewChild("lblRouteTempRef", { read: iLabel, static: false }) set _lblRoute(c: iLabel) {
        if (c) { this.lblRoute = c; }
    };
    public lblMultiRoute: iLabel;
    @ViewChild("lblMultiRouteTempRef", { read: iLabel, static: false }) set _lblMultiRoute(c: iLabel) {
        if (c) { this.lblMultiRoute = c; }
    };
    public Routelayout: Grid;
    @ViewChild("RoutelayoutTempRef", { read: Grid, static: false }) set _Routelayout(c: Grid) {
        if (c) { this.Routelayout = c; }
    };
    public cboRoute: iComboBox;
    @ViewChild("cboRouteTempRef", { read: iComboBox, static: false }) set _cboRoute(c: iComboBox) {
        if (c) { this.cboRoute = c; }
    };
    public MultiRoutelayout: Grid;
    @ViewChild("MultiRoutelayoutTempRef", { read: Grid, static: false }) set _MultiRoutelayout(c: Grid) {
        if (c) { this.MultiRoutelayout = c; }
    };
    public cboMultiRoute: iComboBox;
    @ViewChild("cboMultiRouteTempRef", { read: iComboBox, static: false }) set _cboMultiRoute(c: iComboBox) {
        if (c) { this.cboMultiRoute = c; }
    };
    public iMultiRoute: iMultiSelectDropdown;
    @ViewChild("iMultiRouteTempRef", { read: iMultiSelectDropdown, static: false }) set _iMultiRoute(c: iMultiSelectDropdown) {
        if (c) { this.iMultiRoute = c;
    //Multiroute Dropdown open/close
            if(this.ParentRef.isMultiRouteOpenClose){
                this.ParentRef.isMultiRouteOpenClose = false;
                this.iMultiRoute.multiSelectComponent.toggle(true);
                this.iMultiRoute.isEmailDropDownOpen = true;
                this.iMultiRoute.Focus();
            } }
    };
    public chckIsMultiRoute: iCheckBox;
    @ViewChild("chckIsMultiRouteTempRef", { read: iCheckBox, static: false }) set _chckIsMultiRoute(c: iCheckBox) {
        if (c) { this.chckIsMultiRoute = c; }
    };
    public lblforMultiRoute: iLabel;
    @ViewChild("lblforMultiRouteTempRef", { read: iLabel, static: false }) set _lblforMultiRoute(c: iLabel) {
        if (c) { this.lblforMultiRoute = c; }
    };
    public SelectProductlayout: Grid;
    @ViewChild("SelectProductlayoutTempRef", { read: Grid, static: false }) set _SelectProductlayout(c: Grid) {
        if (c) { this.SelectProductlayout = c; }
    };
    public SelectProduct: iLabel;
    @ViewChild("SelectProductTempRef", { read: iLabel, static: false }) set _SelectProduct(c: iLabel) {
        if (c) { this.SelectProduct = c; }
    };
    public cmdClearProduct: iButton;
    @ViewChild("cmdClearProductTempRef", { read: iButton, static: false }) set _cmdClearProduct(c: iButton) {
        if (c) { this.cmdClearProduct = c; }
    };
    public lblInfusion: iLabel;
    @ViewChild("lblInfusionTempRef", { read: iLabel, static: false }) set _lblInfusion(c: iLabel) {
        if (c) { this.lblInfusion = c; }
    };
    public cboInfusion: iComboBox;
    @ViewChild("cboInfusionTempRef", { read: iComboBox, static: false }) set _cboInfusion(c: iComboBox) {
        if (c) { this.cboInfusion = c; }
    };
    public lblDeliveryDevice: iLabel;
    @ViewChild("lblDeliveryDeviceTempRef", { read: iLabel, static: false }) set _lblDeliveryDevice(c: iLabel) {
        if (c) { this.lblDeliveryDevice = c; }
    };
    public cboDeliveryDevice: iComboBox;
    @ViewChild("cboDeliveryDeviceTempRef", { read: iComboBox, static: false }) set _cboDeliveryDevice(c: iComboBox) {
        if (c) { this.cboDeliveryDevice = c; }
    };
    public lblBoosterDose: iLabel;
    @ViewChild("lblBoosterDoseTempRef", { read: iLabel, static: false }) set _lblBoosterDose(c: iLabel) {
        if (c) { this.lblBoosterDose = c; }
    };
    public BoosterDoseLayout: Grid;
    @ViewChild("BoosterDoseLayoutTempRef", { read: Grid, static: false }) set _BoosterDoseLayout(c: Grid) {
        if (c) { this.BoosterDoseLayout = c; }
    };
    public txtBoosterDose: iTextBox;
    @ViewChild("txtBoosterDoseTempRef", { read: iTextBox, static: false }) set _txtBoosterDose(c: iTextBox) {
        if (c) { this.txtBoosterDose = c; }
    };
    public lblBoosterUOM: iLabel;
    @ViewChild("lblBoosterUOMTempRef", { read: iLabel, static: false }) set _lblBoosterUOM(c: iLabel) {
        if (c) { this.lblBoosterUOM = c; }
    };
    public cboBoosterUOM: iComboBox;
    @ViewChild("cboBoosterUOMTempRef", { read: iComboBox, static: false }) set _cboBoosterUOM(c: iComboBox) {
        if (c) { this.cboBoosterUOM = c; }
    };
    public lblDoseType: iLabel;
    @ViewChild("lblDoseTypeTempRef", { read: iLabel, static: false }) set _lblDoseType(c: iLabel) {
        if (c) { this.lblDoseType = c; }
    };
    public cboDoseType: iComboBox;
    @ViewChild("cboDoseTypeTempRef", { read: iComboBox, static: false }) set _cboDoseType(c: iComboBox) {
        if (c) { this.cboDoseType = c; }
    };
    public lblMonitoringdevice: iLabel;
    @ViewChild("lblMonitoringdeviceTempRef", { read: iLabel, static: false }) set _lblMonitoringdevice(c: iLabel) {
        if (c) { this.lblMonitoringdevice = c; }
    };
    public Monitoringdevicelayout: Grid;
    @ViewChild("MonitoringdevicelayoutTempRef", { read: Grid, static: false }) set _Monitoringdevicelayout(c: Grid) {
        if (c) { this.Monitoringdevicelayout = c; }
    };
    public txtMonitoringdevice: iTextBox;
    @ViewChild("txtMonitoringdeviceTempRef", { read: iTextBox, static: false }) set _txtMonitoringdevice(c: iTextBox) {
        if (c) { this.txtMonitoringdevice = c; }
    };
    public lblMonitoringdeviceUOM: iLabel;
    @ViewChild("lblMonitoringdeviceUOMTempRef", { read: iLabel, static: false }) set _lblMonitoringdeviceUOM(c: iLabel) {
        if (c) { this.lblMonitoringdeviceUOM = c; }
    };
    public cboMonitoringdeviceUOM: iComboBox;
    @ViewChild("cboMonitoringdeviceUOMTempRef", { read: iComboBox, static: false }) set _cboMonitoringdeviceUOM(c: iComboBox) {
        if (c) { this.cboMonitoringdeviceUOM = c; }
    };
    public lblDose: iLabel;
    @ViewChild("lblDoseTempRef", { read: iLabel, static: false }) set _lblDose(c: iLabel) {
        if (c) { this.lblDose = c; }
    };
    public DoseLayoutRoot: Grid;
    @ViewChild("DoseLayoutRootTempRef", { read: Grid, static: false }) set _DoseLayoutRoot(c: Grid) {
        if (c) { this.DoseLayoutRoot = c; }
    };
    public txtLowerDose: iTextBox;
    @ViewChild("txtLowerDoseTempRef", { read: iTextBox, static: false }) set _txtLowerDose(c: iTextBox) {
        if (c) { this.txtLowerDose = c; }
    };
    public lblHifen: iLabel;
    @ViewChild("lblHifenTempRef", { read: iLabel, static: false }) set _lblHifen(c: iLabel) {
        if (c) { this.lblHifen = c; }
    };
    public txtUpperDose: iTextBox;
    @ViewChild("txtUpperDoseTempRef", { read: iTextBox, static: false }) set _txtUpperDose(c: iTextBox) {
        if (c) { this.txtUpperDose = c; }
    };
    public lblUOM: iLabel;
    @ViewChild("lblUOMTempRef", { read: iLabel, static: false }) set _lblUOM(c: iLabel) {
        if (c) { this.lblUOM = c; }
    };
    public cboUOM: iComboBox;
    @ViewChild("cboUOMTempRef", { read: iComboBox, static: false }) set _cboUOM(c: iComboBox) {
        if (c) { this.cboUOM = c; }
    };
    public lblFluid: iLabel;
    @ViewChild("lblFluidTempRef", { read: iLabel, static: false }) set _lblFluid(c: iLabel) {
        if (c) { this.lblFluid = c; }
    };
    public BrandLayout2: Grid;
    @ViewChild("BrandLayout2TempRef", { read: Grid, static: false }) set _BrandLayout2(c: Grid) {
        if (c) { this.BrandLayout2 = c; }
    };
    public cboFluid: iComboBox;
    @ViewChild("cboFluidTempRef", { read: iComboBox, static: false }) set _cboFluid(c: iComboBox) {
        if (c) { this.cboFluid = c; }
    };
    public cmdfluid: iButton;
    @ViewChild("cmdfluidTempRef", { read: iButton, static: false }) set _cmdfluid(c: iButton) {
        if (c) { this.cmdfluid = c; }
    };
    public lblVolume: iLabel;
    @ViewChild("lblVolumeTempRef", { read: iLabel, static: false }) set _lblVolume(c: iLabel) {
        if (c) { this.lblVolume = c; }
    };
    public VolumeLayoutRoot: Grid;
    @ViewChild("VolumeLayoutRootTempRef", { read: Grid, static: false }) set _VolumeLayoutRoot(c: Grid) {
        if (c) { this.VolumeLayoutRoot = c; }
    };
    public txtVolume: iTextBox;
    @ViewChild("txtVolumeTempRef", { read: iTextBox, static: false }) set _txtVolume(c: iTextBox) {
        if (c) { this.txtVolume = c; }
    };
    public lblVolUOM: iLabel;
    @ViewChild("lblVolUOMTempRef", { read: iLabel, static: false }) set _lblVolUOM(c: iLabel) {
        if (c) { this.lblVolUOM = c; }
    };
    public cboVolumeUOM: iComboBox;
    @ViewChild("cboVolumeUOMTempRef", { read: iComboBox, static: false }) set _cboVolumeUOM(c: iComboBox) {
        if (c) { this.cboVolumeUOM = c; }
    };
    public lblInfConcentration: iLabel;
    @ViewChild("lblInfConcentrationTempRef", { read: iLabel, static: false }) set _lblInfConcentration(c: iLabel) {
        if (c) { this.lblInfConcentration = c; }
    };
    public InfConcentrationLayoutRoot: Grid;
    @ViewChild("InfConcentrationLayoutRootTempRef", { read: Grid, static: false }) set _InfConcentrationLayoutRoot(c: Grid) {
        if (c) { this.InfConcentrationLayoutRoot = c; }
    };
    public txtLowConcentration: iTextBox;
    @ViewChild("txtLowConcentrationTempRef", { read: iTextBox, static: false }) set _txtLowConcentration(c: iTextBox) {
        if (c) { this.txtLowConcentration = c; }
    };
    public cboLowConcentrationUOMlist: iComboBox;
    @ViewChild("cboLowConcentrationUOMlistTempRef", { read: iComboBox, static: false }) set _cboLowConcentrationUOMlist(c: iComboBox) {
        if (c) { this.cboLowConcentrationUOMlist = c; }
    };
    public lblSlash: iLabel;
    @ViewChild("lblSlashTempRef", { read: iLabel, static: false }) set _lblSlash(c: iLabel) {
        if (c) { this.lblSlash = c; }
    };
    public txtUpperConcentration: iTextBox;
    @ViewChild("txtUpperConcentrationTempRef", { read: iTextBox, static: false }) set _txtUpperConcentration(c: iTextBox) {
        if (c) { this.txtUpperConcentration = c; }
    };
    public cboUpperConcentrationUOMlist: iComboBox;
    @ViewChild("cboUpperConcentrationUOMlistTempRef", { read: iComboBox, static: false }) set _cboUpperConcentrationUOMlist(c: iComboBox) {
        if (c) { this.cboUpperConcentrationUOMlist = c; }
    };
    public lblInfusionPeriod: iLabel;
    @ViewChild("lblInfusionPeriodTempRef", { read: iLabel, static: false }) set _lblInfusionPeriod(c: iLabel) {
        if (c) { this.lblInfusionPeriod = c; }
    };
    public InfusionPeriodLayout: Grid;
    @ViewChild("InfusionPeriodLayoutTempRef", { read: Grid, static: false }) set _InfusionPeriodLayout(c: Grid) {
        if (c) { this.InfusionPeriodLayout = c; }
    };
    public txtInfusionperiod: iTextBox;
    @ViewChild("txtInfusionperiodTempRef", { read: iTextBox, static: false }) set _txtInfusionperiod(c: iTextBox) {
        if (c) { this.txtInfusionperiod = c; }
    };
    public lblinfustionPeriodUOM: iLabel;
    @ViewChild("lblinfustionPeriodUOMTempRef", { read: iLabel, static: false }) set _lblinfustionPeriodUOM(c: iLabel) {
        if (c) { this.lblinfustionPeriodUOM = c; }
    };
    public cboinfustionPeriodUOM: iComboBox;
    @ViewChild("cboinfustionPeriodUOMTempRef", { read: iComboBox, static: false }) set _cboinfustionPeriodUOM(c: iComboBox) {
        if (c) { this.cboinfustionPeriodUOM = c; }
    };
    public lblInfusionRate: iLabel;
    @ViewChild("lblInfusionRateTempRef", { read: iLabel, static: false }) set _lblInfusionRate(c: iLabel) {
        if (c) { this.lblInfusionRate = c; }
    };
    public Infusioncal: iButton;
    @ViewChild("InfusioncalTempRef", { read: iButton, static: false }) set _Infusioncal(c: iButton) {
        if (c) { this.Infusioncal = c; }
    };
    public Dosecal: iButton;
    @ViewChild("DosecalTempRef", { read: iButton, static: false }) set _Dosecal(c: iButton) {
        if (c) { this.Dosecal = c; }
    };
    public InfusionRateLayout: Grid;
    @ViewChild("InfusionRateLayoutTempRef", { read: Grid, static: false }) set _InfusionRateLayout(c: Grid) {
        if (c) { this.InfusionRateLayout = c; }
    };
    public txtInfusionRate: iTextBox;
    @ViewChild("txtInfusionRateTempRef", { read: iTextBox, static: false }) set _txtInfusionRate(c: iTextBox) {
        if (c) { this.txtInfusionRate = c; }
    };
    public lblRateHifen: iLabel;
    @ViewChild("lblRateHifenTempRef", { read: iLabel, static: false }) set _lblRateHifen(c: iLabel) {
        if (c) { this.lblRateHifen = c; }
    };
    public txtUpperInfusionRate: iTextBox;
    @ViewChild("txtUpperInfusionRateTempRef", { read: iTextBox, static: false }) set _txtUpperInfusionRate(c: iTextBox) {
        if (c) { this.txtUpperInfusionRate = c; }
    };
    public lblInfusionUOM: iLabel;
    @ViewChild("lblInfusionUOMTempRef", { read: iLabel, static: false }) set _lblInfusionUOM(c: iLabel) {
        if (c) { this.lblInfusionUOM = c; }
    };
    public cboInfustionRateUOM: iComboBox;
    @ViewChild("cboInfustionRateUOMTempRef", { read: iComboBox, static: false }) set _cboInfustionRateUOM(c: iComboBox) {
        if (c) { this.cboInfustionRateUOM = c; }
    };
    public lblInfusionRateHifen: iLabel;
    @ViewChild("lblInfusionRateHifenTempRef", { read: iLabel, static: false }) set _lblInfusionRateHifen(c: iLabel) {
        if (c) { this.lblInfusionRateHifen = c; }
    };
    public cboInfusionRateUOM: iComboBox;
    @ViewChild("cboInfusionRateUOMTempRef", { read: iComboBox, static: false }) set _cboInfusionRateUOM(c: iComboBox) {
        if (c) { this.cboInfusionRateUOM = c; }
    };
    public lblSite: iLabel;
    @ViewChild("lblSiteTempRef", { read: iLabel, static: false }) set _lblSite(c: iLabel) {
        if (c) { this.lblSite = c; }
    };
    public cboSite: iComboBox;
    @ViewChild("cboSiteTempRef", { read: iComboBox, static: false }) set _cboSite(c: iComboBox) {
        if (c) { this.cboSite = c; }
    };
    public lblLumen: iLabel;
    @ViewChild("lblLumenTempRef", { read: iLabel, static: false }) set _lblLumen(c: iLabel) {
        if (c) { this.lblLumen = c; }
    };
    public txtLumen: iTextBox;
    @ViewChild("txtLumenTempRef", { read: iTextBox, static: false }) set _txtLumen(c: iTextBox) {
        if (c) { this.txtLumen = c; }
    };
    public lblBrand: iLabel;
    @ViewChild("lblBrandTempRef", { read: iLabel, static: false }) set _lblBrand(c: iLabel) {
        if (c) { this.lblBrand = c; }
    };
    public BrandLayout: Grid;
    @ViewChild("BrandLayoutTempRef", { read: Grid, static: false }) set _BrandLayout(c: Grid) {
        if (c) { this.BrandLayout = c; }
    };
    public cmdBrand: iLabel;
    @ViewChild("cmdBrandTempRef", { read: iLabel, static: false }) set _cmdBrand(c: iLabel) {
        if (c) { this.cmdBrand = c; }
    };
    public cmdClear: iButton;
    @ViewChild("cmdClearTempRef", { read: iButton, static: false }) set _cmdClear(c: iButton) {
        if (c) { this.cmdClear = c; }
    };
    public lbtnSequencelinkfororderset: iHyperlinkButton;
    @ViewChild("lbtnSequencelinkforordersetTempRef", { read: iHyperlinkButton, static: false }) set _lbtnSequencelinkfororderset(c: iHyperlinkButton) {
        if (c) { this.lbtnSequencelinkfororderset = c; }
    };
    public brdManageSequence: Border;
    @ViewChild("brdManageSequenceTempRef", { read: Border, static: false }) set _brdManageSequence(c: Border) {
        if (c) { this.brdManageSequence = c; }
    };
    public lblManageSequenceBorder: TextBlock;
    @ViewChild("lblManageSequenceBorderTempRef", { read: TextBlock, static: false }) set _lblManageSequenceBorder(c: TextBlock) {
        if (c) { this.lblManageSequenceBorder = c; }
    };
    public lblSequenceName: iLabel;
    @ViewChild("lblSequenceNameTempRef", { read: iLabel, static: false }) set _lblSequenceName(c: iLabel) {
        if (c) { this.lblSequenceName = c; }
    };
    public cboSequenceName: iComboBox;
    @ViewChild("cboSequenceNameTempRef", { read: iComboBox, static: false }) set _cboSequenceName(c: iComboBox) {
        if (c) { this.cboSequenceName = c; }
    };
    public lblSelectedSequenceNamelst: iLabel;
    @ViewChild("lblSelectedSequenceNamelstTempRef", { read: iLabel, static: false }) set _lblSelectedSequenceNamelst(c: iLabel) {
        if (c) { this.lblSelectedSequenceNamelst = c; }
    };
    public lbtnSequencelink: iHyperlinkButton;
    @ViewChild("lbtnSequencelinkTempRef", { read: iHyperlinkButton, static: false }) set _lbtnSequencelink(c: iHyperlinkButton) {
        if (c) { this.lbtnSequencelink = c; }
    };
    public cmdClearSeq: iButton;
    @ViewChild("cmdClearSeqTempRef", { read: iButton, static: false }) set _cmdClearSeq(c: iButton) {
        if (c) { this.cmdClearSeq = c; }
    };
    public lblPrecedingInfusionItem: iLabel;
    @ViewChild("lblPrecedingInfusionItemTempRef", { read: iLabel, static: false }) set _lblPrecedingInfusionItem(c: iLabel) {
        if (c) { this.lblPrecedingInfusionItem = c; }
    };
    public cboPrecedingInfusionItem: iComboBox;
    @ViewChild("cboPrecedingInfusionItemTempRef", { read: iComboBox, static: false }) set _cboPrecedingInfusionItem(c: iComboBox) {
        if (c) { this.cboPrecedingInfusionItem = c; }
    };
    public lblSelectedPrecedingInfusionItemlst: iLabel;
    @ViewChild("lblSelectedPrecedingInfusionItemlstTempRef", { read: iLabel, static: false }) set _lblSelectedPrecedingInfusionItemlst(c: iLabel) {
        if (c) { this.lblSelectedPrecedingInfusionItemlst = c; }
    };
    public lblStartDate: iLabel;
    @ViewChild("lblStartDateTempRef", { read: iLabel, static: false }) set _lblStartDate(c: iLabel) {
        if (c) { this.lblStartDate = c; }
    };
    public dtpStartDate: iDateTimePicker;
    @ViewChild("dtpStartDateTempRef", { read: iDateTimePicker, static: false }) set _dtpStartDate(c: iDateTimePicker) {
        if (c) { this.dtpStartDate = c; }
    };
    public iTimeStartDateTime: iTimeBox;
    @ViewChild("iTimeStartDateTimeTempRef", { read: iTimeBox, static: false }) set _iTimeStartDateTime(c: iTimeBox) {
        if (c) { this.iTimeStartDateTime = c; }
    };
    public lblReviewafter: iLabel;
    @ViewChild("lblReviewafterTempRef", { read: iLabel, static: false }) set _lblReviewafter(c: iLabel) {
        if (c) { this.lblReviewafter = c; }
    };
    public udReviewafter: iUpDownBox;
    @ViewChild("udReviewafterTempRef", { read: iUpDownBox, static: false }) set _udReviewafter(c: iUpDownBox) {
        if (c) { this.udReviewafter = c; }
    };
    public cboreviewAfterUOM: iComboBox;
    @ViewChild("cboreviewAfterUOMTempRef", { read: iComboBox, static: false }) set _cboreviewAfterUOM(c: iComboBox) {
        if (c) { this.cboreviewAfterUOM = c; }
    };
    public lblReviewAfterDate: iLabel;
    @ViewChild("lblReviewAfterDateTempRef", { read: iLabel, static: false }) set _lblReviewAfterDate(c: iLabel) {
        if (c) { this.lblReviewAfterDate = c; }
    };
    public cmdReviewDetails: iButton;
    @ViewChild("cmdReviewDetailsTempRef", { read: iButton, static: false }) set _cmdReviewDetails(c: iButton) {
        if (c) { this.cmdReviewDetails = c; }
    };
    public lblReviewComments: iLabel;
    @ViewChild("lblReviewCommentsTempRef", { read: iLabel, static: false }) set _lblReviewComments(c: iLabel) {
        if (c) { this.lblReviewComments = c; }
    };
    public txtReviewComments: iTextBox;
    @ViewChild("txtReviewCommentsTempRef", { read: iTextBox, static: false }) set _txtReviewComments(c: iTextBox) {
        if (c) { this.txtReviewComments = c; }
    };
    public lblDuration: iLabel;
    @ViewChild("lblDurationTempRef", { read: iLabel, static: false }) set _lblDuration(c: iLabel) {
        if (c) { this.lblDuration = c; }
    };
    public udDuration: iUpDownBox;
    @ViewChild("udDurationTempRef", { read: iUpDownBox, static: false }) set _udDuration(c: iUpDownBox) {
        if (c) { this.udDuration = c; }
    };
    public cboDuration: iComboBox;
    @ViewChild("cboDurationTempRef", { read: iComboBox, static: false }) set _cboDuration(c: iComboBox) {
        if (c) { this.cboDuration = c; }
    };
    public lblStopDate: iLabel;
    @ViewChild("lblStopDateTempRef", { read: iLabel, static: false }) set _lblStopDate(c: iLabel) {
        if (c) { this.lblStopDate = c; }
    };
    public dtpStopDate: iDateTimePicker;
    @ViewChild("dtpStopDateTempRef", { read: iDateTimePicker, static: false }) set _dtpStopDate(c: iDateTimePicker) {
        if (c) { this.dtpStopDate = c; }
    };
    public iTimeStopDateTime: iTimeBox;
    @ViewChild("iTimeStopDateTimeTempRef", { read: iTimeBox, static: false }) set _iTimeStopDateTime(c: iTimeBox) {
        if (c) { this.iTimeStopDateTime = c; }
    };
    public lblQuantity: iLabel;
    @ViewChild("lblQuantityTempRef", { read: iLabel, static: false }) set _lblQuantity(c: iLabel) {
        if (c) { this.lblQuantity = c; }
    };
    public txtQuantity: iTextBox;
    @ViewChild("txtQuantityTempRef", { read: iTextBox, static: false }) set _txtQuantity(c: iTextBox) {
        if (c) { this.txtQuantity = c; }
    };
    public cboQuantity: iComboBox;
    @ViewChild("cboQuantityTempRef", { read: iComboBox, static: false }) set _cboQuantity(c: iComboBox) {
        if (c) { this.cboQuantity = c; }
    };
    public lblIsOnAdmission: iLabel;
    @ViewChild("lblIsOnAdmissionTempRef", { read: iLabel, static: false }) set _lblIsOnAdmission(c: iLabel) {
        if (c) { this.lblIsOnAdmission = c; }
    };
    public chckIsOnAdmission: iCheckBox;
    @ViewChild("chckIsOnAdmissionTempRef", { read: iCheckBox, static: false }) set _chckIsOnAdmission(c: iCheckBox) {
        if (c) { this.chckIsOnAdmission = c; }
    };
    public lblStatType: iLabel;
    @ViewChild("lblStatTypeTempRef", { read: iLabel, static: false }) set _lblStatType(c: iLabel) {
        if (c) { this.lblStatType = c; }
    };
    public cboStatType: iComboBox;
    @ViewChild("cboStatTypeTempRef", { read: iComboBox, static: false }) set _cboStatType(c: iComboBox) {
        if (c) { this.cboStatType = c; }
    };
    public lblPrescribedby: iLabel;
    @ViewChild("lblPrescribedbyTempRef", { read: iLabel, static: false }) set _lblPrescribedby(c: iLabel) {
        if (c) { this.lblPrescribedby = c; }
    };
    public txtPrescribedby: iLabel;
    @ViewChild("txtPrescribedbyTempRef", { read: iLabel, static: false }) set _txtPrescribedby(c: iLabel) {
        if (c) { this.txtPrescribedby = c; }
    };
    public lblIsClinicallyVerified: iLabel;
    @ViewChild("lblIsClinicallyVerifiedTempRef", { read: iLabel, static: false }) set _lblIsClinicallyVerified(c: iLabel) {
        if (c) { this.lblIsClinicallyVerified = c; }
    };
    public chckClinicalVerify: iCheckBox;
    @ViewChild("chckClinicalVerifyTempRef", { read: iCheckBox, static: false }) set _chckClinicalVerify(c: iCheckBox) {
        if (c) { this.chckClinicalVerify = c; }
    };
    public lblVerificationComments: iLabel;
    @ViewChild("lblVerificationCommentsTempRef", { read: iLabel, static: false }) set _lblVerificationComments(c: iLabel) {
        if (c) { this.lblVerificationComments = c; }
    };
    public txtVerificationComments: iTextBox;
    @ViewChild("txtVerificationCommentsTempRef", { read: iTextBox, static: false }) set _txtVerificationComments(c: iTextBox) {
        if (c) { this.txtVerificationComments = c; }
    };
    public lblModClerkReason: iLabel;
    @ViewChild("lblModClerkReasonTempRef", { read: iLabel, static: false }) set _lblModClerkReason(c: iLabel) {
        if (c) { this.lblModClerkReason = c; }
    };
    public cboModClerkReason: iComboBox;
    @ViewChild("cboModClerkReasonTempRef", { read: iComboBox, static: false }) set _cboModClerkReason(c: iComboBox) {
        if (c) { this.cboModClerkReason = c; }
    };
    public lblRsnForMod: iLabel;
    @ViewChild("lblRsnForModTempRef", { read: iLabel, static: false }) set _lblRsnForMod(c: iLabel) {
        if (c) { this.lblRsnForMod = c; }
    };
    public cboRsnForMod: iComboBox;
    @ViewChild("cboRsnForModTempRef", { read: iComboBox, static: false }) set _cboRsnForMod(c: iComboBox) {
        if (c) { this.cboRsnForMod = c; }
    };
    public lblModComments: iLabel;
    @ViewChild("lblModCommentsTempRef", { read: iLabel, static: false }) set _lblModComments(c: iLabel) {
        if (c) { this.lblModComments = c; }
    };
    public txtModComments: iTextBox;
    @ViewChild("txtModCommentsTempRef", { read: iTextBox, static: false }) set _txtModComments(c: iTextBox) {
        if (c) { this.txtModComments = c; }
    };
    public lblAdmin: iLabel;
    @ViewChild("lblAdminTempRef", { read: iLabel, static: false }) set _lblAdmin(c: iLabel) {
        if (c) { this.lblAdmin = c; }
    };
    public txtAdminInstruction: iTextBox;
    @ViewChild("txtAdminInstructionTempRef", { read: iTextBox, static: false }) set _txtAdminInstruction(c: iTextBox) {
        if (c) { this.txtAdminInstruction = c; }
    };
    public lblPblmInd: iLabel;
    @ViewChild("lblPblmIndTempRef", { read: iLabel, static: false }) set _lblPblmInd(c: iLabel) {
        if (c) { this.lblPblmInd = c; }
    };
    public txtProblem: iTextBox;
    @ViewChild("txtProblemTempRef", { read: iTextBox, static: false }) set _txtProblem(c: iTextBox) {
        if (c) { this.txtProblem = c; }
    };
    public lblAddComments: iLabel;
    @ViewChild("lblAddCommentsTempRef", { read: iLabel, static: false }) set _lblAddComments(c: iLabel) {
        if (c) { this.lblAddComments = c; }
    };
    public txtAddComments: iTextBox;
    @ViewChild("txtAddCommentsTempRef", { read: iTextBox, static: false }) set _txtAddComments(c: iTextBox) {
        if (c) { this.txtAddComments = c; }
    };
    public lblMedicationClerk: iLabel;
    @ViewChild("lblMedicationClerkTempRef", { read: iLabel, static: false }) set _lblMedicationClerk(c: iLabel) {
        if (c) { this.lblMedicationClerk = c; }
    };
    public lblMedicationClerking: iLabel;
    @ViewChild("lblMedicationClerkingTempRef", { read: iLabel, static: false }) set _lblMedicationClerking(c: iLabel) {
        if (c) { this.lblMedicationClerking = c; }
    };
    public lblSupplyInst: iLabel;
    @ViewChild("lblSupplyInstTempRef", { read: iLabel, static: false }) set _lblSupplyInst(c: iLabel) {
        if (c) { this.lblSupplyInst = c; }
    };
    public lblSupplyInstText: iLabel;
    @ViewChild("lblSupplyInstTextTempRef", { read: iLabel, static: false }) set _lblSupplyInstText(c: iLabel) {
        if (c) { this.lblSupplyInstText = c; }
    };
    public lblSupplyInstValue: iLabel;
    @ViewChild("lblSupplyInstValueTempRef", { read: iLabel, static: false }) set _lblSupplyInstValue(c: iLabel) {
        if (c) { this.lblSupplyInstValue = c; }
    };
    public lblTreatToCon: iLabel;
    @ViewChild("lblTreatToConTempRef", { read: iLabel, static: false }) set _lblTreatToCon(c: iLabel) {
        if (c) { this.lblTreatToCon = c; }
    };
    public cboTreatToCon: iComboBox;
    @ViewChild("cboTreatToConTempRef", { read: iComboBox, static: false }) set _cboTreatToCon(c: iComboBox) {
        if (c) { this.cboTreatToCon = c; }
    };
    public lblisnewmeds: iLabel;
    @ViewChild("lblisnewmedsTempRef", { read: iLabel, static: false }) set _lblisnewmeds(c: iLabel) {
        if (c) { this.lblisnewmeds = c; }
    };
    public chcknewmeds: iCheckBox;
    @ViewChild("chcknewmedsTempRef", { read: iCheckBox, static: false }) set _chcknewmeds(c: iCheckBox) {
        if (c) { this.chcknewmeds = c; }
    };
    public brdAdditionalOptions: Border;
    @ViewChild("brdAdditionalOptionsTempRef", { read: Border, static: false }) set _brdAdditionalOptions(c: Border) {
        if (c) { this.brdAdditionalOptions = c; }
    };
    public lblRecordAdminBorder: TextBlock;
    @ViewChild("lblRecordAdminBorderTempRef", { read: TextBlock, static: false }) set _lblRecordAdminBorder(c: TextBlock) {
        if (c) { this.lblRecordAdminBorder = c; }
    };
    public lblInfAdminMessage: iLabel;
    @ViewChild("lblInfAdminMessageTempRef", { read: iLabel, static: false }) set _lblInfAdminMessage(c: iLabel) {
        if (c) { this.lblInfAdminMessage = c; }
    };
    public chkForAdminOption1: iCheckBox;
    @ViewChild("chkForAdminOption1TempRef", { read: iCheckBox, static: false }) set _chkForAdminOption1(c: iCheckBox) {
        if (c) { this.chkForAdminOption1 = c; }
    };
    public brdSTA: Border;
    @ViewChild("brdSTATempRef", { read: Border, static: false }) set _brdSTA(c: Border) {
        if (c) { this.brdSTA = c; }
    };
    public lblBorder: iLabel;
    @ViewChild("lblBorderTempRef", { read: iLabel, static: false }) set _lblBorder(c: iLabel) {
        if (c) { this.lblBorder = c; }
    };
    public ContentCtrlMedResolveStepped: ContentControl = new ContentControl();
    // @ViewChild("ContentCtrlMedResolveSteppedTempRef", { read: ContentControl, static: false }) set _ContentCtrlMedResolveStepped(c: ContentControl) {
    //     if (c) { this.ContentCtrlMedResolveStepped = c; }
    // };
    public MedIPResolveStepped: medipresolvestepped;
    @ViewChild("MedIPResolveSteppedTempRef", {read:medipresolvestepped, static: false }) set _MedIPResolveStepped(c: medipresolvestepped){
        if(c)
        {
            console.log("Medipresolve.ViewChild ",(new Date()).getTime().toString(), c.cboFrequency == undefined);
            this.MedIPResolveStepped  = c;
            this.MedIPResolveStepped.ParentRef = this;
            if(this.ContentCtrlMedResolveStepped.Content.MedIpResolveSteppedLoadedFunc)
                this.ContentCtrlMedResolveStepped.Content.MedIpResolveSteppedLoadedFunc(c);
        }
    };
public medContConditionalDose: medContConditionalDose;
@ViewChild("medContConditionalDoseTempRef", {read:medContConditionalDose, static: false }) set _medContConditionalDose(c: medContConditionalDose){
 if(c)
 { 
     this.medContConditionalDose  = c; 
     this.medContConditionalDose.ParentRef = this;
     this.medContConditionalDose.omedFormViewer = this.ParentRef;  
    //  if(this.ContentCtrlMedResolveStepped.Content.medContConditionalDoseLoadedFunc)
    //       this.ContentCtrlMedResolveStepped.Content.medContConditionalDoseLoadedFunc(c);
 }
};
    public bIsLoaded: boolean = false;
    objfrm: PrescriptionItemVM;
    sLowerDoseDefaultValue: string = String.Empty;
    sUpperDoseDefaultValue: string = String.Empty;
    private oMultiSelectListView: MultiSelectListView;
    // Need to check 
    // objMulti: Common.MultiRouteEvents;
    objMulti: MultiRouteEvents;

    // DoseLayoutRootCol = [];

    public resKey = Resource.MedicationForm;
    public resKey1 = Resource.Infusion;
    ResourceStyles = ControlStyles;
    public FormLoadAFterviewinit : boolean = false;
    // InnerBG = InnerBG;
    // whiteBorder = { 'border-top': '1px solid white' };
    // BorderFrameForAdditionalOptions = "";
    // BorderFrame = "";

    constructor() {
        // InitializeComponent();
        super();
        this.Ref = this;
        this.bIsLoaded = false;
        // dtpStartDate.IsConstrainEntry = true;
        // dtpStopDate.SelectedDateTime = DateTime.MinValue;
    }

    SelectedValueChanged_reviewAfterUOM(e: CListItem){
        if (e != this.DataContext.FormViewerDetails.BasicDetails.ReviewafterUOM) {
            this.DataContext.FormViewerDetails.BasicDetails.ReviewafterUOM = e;
        }
    }

    FormviewerLoadedEventsubscription;
    public maxScrollContentHeight;
    ngAfterViewInit() {
        this.maxScrollContentHeight = CommonService.setDynamicScrollviewerHeight();
        if (window.screen.height < 1000 && window.devicePixelRatio != 1.25) {
            this.maxScrollContentHeight = this.maxScrollContentHeight - 35;
        }
        else {
            if (this.maxScrollContentHeight) {
                this.maxScrollContentHeight = this.maxScrollContentHeight - 33;
            }
        }
        that = this;
        if(!this.dtpStopDate.IsEnabled && !this.iTimeStopDateTime.IsEnabled){
            this.iTimeStopDateTime.setZerotime();
        }
        // this.bIsLoaded = false;
        if(this.FormLoadAFterviewinit){
            this.UserControl_Loaded(null, null);
            this.objfrm = ObjectHelper.CreateType<PrescriptionItemVM>(this.DataContext, PrescriptionItemVM);
            this.objfrm.SubFormLoadedEvent.emit(true);
        }
        else{
        this.objfrm = ObjectHelper.CreateType<PrescriptionItemVM>(this.DataContext, PrescriptionItemVM);       
        this.FormviewerLoadedEventsubscription = this.objfrm.FormviewerLoadedEvent.subscribe( data => {
        Object.keys(that).forEach((prop) => (this[prop] = that[prop]));
        this.UserControl_Loaded(null, null);
        this.FormLoadAFterviewinit = true
        this.objfrm = ObjectHelper.CreateType<PrescriptionItemVM>(this.DataContext, PrescriptionItemVM);
        this.objfrm.SubFormLoadedEvent.emit(true);
        this.FormviewerLoadedEventsubscription.unsubscribe();
        }
        );
    }


    }
    //Multiroute Dropdown open/close
    onMultiRouteSelectedItemChanged(s:iMultiSelectDropdown,e){
        this.DataContext.FormViewerDetails.BasicDetails.DefaultDetails.MultiRoute2 = e;
            this.ParentRef.isMultiRouteOpenClose = true;
    }
    //Multiroute SelectionChanged
    onMultiRouteIsChecked(e){
        console.log("DoseType.trigger.onMultiRouteChecked", e,this.DataContext.FormViewerDetails.BasicDetails.IsMultiRouteChecked);        
        this.DataContext.FormViewerDetails.BasicDetails.IsMultiRouteChecked = e;
        if(e){
            setTimeout(() => {
            console.log("DoseType.trigger.onMultiRouteChecked.settimeout", e,this.DataContext.FormViewerDetails.BasicDetails.IsMultiRouteChecked);        
                this.ParentRef.multiSelectCboDoseTypePropertyChange()
            }, 0);
        }
    }

    private UserControl_Loaded(sender: Object, e: RoutedEventArgs): void {
        this.objfrm = ObjectHelper.CreateType<PrescriptionItemVM>(this.DataContext, PrescriptionItemVM);
        let selectedrouteClistitem: CListItem[] = null;
        let selectedInfusionRoute: CListItem[] = null;
        this.objfrm.FormViewerDetails.BasicDetails.bIsForAmendLaunchNewItem = false;
        if (this.cboSequenceName != null && typeof(this.cboSequenceName) !== 'undefined') {
            this.cboSequenceName.SelectionChanged = (s, e) => {
                Object.keys(that).forEach((prop) => (this[prop] = that[prop]));
                //if(this.cboSequenceName != null || typeof(this.cboSequenceName) !== 'undefined')
                this.cboSequenceName_SelectionChanged(s, e);
            }
        }
        if (PatientContext.PrescriptionType == PrescriptionTypes.ForAdministration) {
            if (this.objfrm != null && this.objfrm.FormViewerDetails != null && this.objfrm.FormViewerDetails.BasicDetails != null) {
                if (this.objfrm.FormViewerDetails.BasicDetails.DefaultDetails != null && this.objfrm.FormViewerDetails.BasicDetails.DefaultDetails.Routes != null) {
                    selectedrouteClistitem = this.objfrm.FormViewerDetails.BasicDetails.DefaultDetails.Routes.Where(cl => cl.IsSelected == true).ToArray();
                    selectedInfusionRoute = this.objfrm.FormViewerDetails.BasicDetails.DefaultDetails.Routes.Where(cl => cl.IsSelected == true && (cl.Tag != null && String.Compare(cl.Tag.ToString(), "1") == 0)).ToArray();
                }
                this.objfrm.FormViewerDetails.BasicDetails.OtherAdminiInstVisibility = Visibility.Visible;
            }
        }
        if (String.Equals(PatientContext.ClerkFormViewDefaultBehavior, ClerkFormViewDeftBehaviour.LaunchFormMandatory) && this.objfrm != null && this.objfrm.FormViewerDetails != null && this.objfrm.FormViewerDetails.BasicDetails != null) {
            this.objfrm.FormViewerDetails.BasicDetails.RangeStartDTTM = DateTime.MinValue;
        }
        if ((String.Equals(PatientContext.PrescriptionType, PrescriptionTypes.Discharge, StringComparison.InvariantCultureIgnoreCase) || String.Equals(PatientContext.PrescriptionType, PrescriptionTypes.Leave, StringComparison.InvariantCultureIgnoreCase) || String.Equals(PatientContext.PrescriptionType, PrescriptionTypes.Outpatient, StringComparison.InvariantCultureIgnoreCase)) && (!String.IsNullOrEmpty(this.objfrm.FormViewerDetails.BasicDetails.Quantity) && Convert.ToDouble(this.objfrm.FormViewerDetails.BasicDetails.Quantity) == 0) && this.objfrm != null && this.objfrm.FormViewerDetails != null && this.objfrm.FormViewerDetails.BasicDetails != null) {
            this.objfrm.FormViewerDetails.BasicDetails.IsMandatorySupplyInstr = true;
        }
        else {
            if (this.objfrm != null && this.objfrm.FormViewerDetails != null && this.objfrm.FormViewerDetails.BasicDetails != null)
                this.objfrm.FormViewerDetails.BasicDetails.IsMandatorySupplyInstr = false;
        }
        if (PatientContext.PrescriptionType == PrescriptionTypes.ForAdministration && this.objfrm != null && this.objfrm.FormViewerDetails != null && this.objfrm.FormViewerDetails.BasicControls != null && this.objfrm.FormViewerDetails.BasicDetails.ManageReviewDetail != null && this.objfrm.FormViewerDetails.BasicDetails.ManageReviewDetail.oReviewAfterDetail != null && this.objfrm.FormViewerDetails.BasicDetails.ManageReviewDetail.oReviewAfterDetail.ReviewType != null && !String.IsNullOrEmpty(this.objfrm.FormViewerDetails.BasicDetails.ManageReviewDetail.oReviewAfterDetail.ReviewType.Code) && this.objfrm.FormViewerDetails.BasicDetails.ManageReviewDetail.oReviewAfterDetail.ReviewType.Code.Equals(CConstants.OmitReview)) {
            this.objfrm.FormViewerDetails.BasicDetails.ReviewAfterMandatory = true;
        }
        if (this.objfrm != null && this.objfrm.FormViewerDetails != null && this.objfrm.FormViewerDetails.BasicDetails != null && !this.objfrm.FormViewerDetails.BasicDetails.HasParentidset && !String.IsNullOrEmpty(this.objfrm.FormViewerDetails.BasicDetails.IdentifyingType) && (String.Compare(this.objfrm.FormViewerDetails.BasicDetails.IdentifyingType, "CATALOGUEITEM", StringComparison.OrdinalIgnoreCase) == 0)) {
            this.objfrm.FormViewerDetails.BasicDetails.ParentIdentifyingOID = this.objfrm.FormViewerDetails.BasicDetails.IdentifyingOID;
            this.objfrm.FormViewerDetails.BasicDetails.ParentIdentifyingName = this.objfrm.FormViewerDetails.BasicDetails.IdentifyingName;
            this.objfrm.FormViewerDetails.BasicDetails.ParentIdentifyingType = this.objfrm.FormViewerDetails.BasicDetails.IdentifyingType;
            this.objfrm.FormViewerDetails.BasicDetails.HasParentidset = true;
        }
        if (this.objfrm != null && this.objfrm.FormViewerDetails != null && this.objfrm.FormViewerDetails.BasicDetails != null && this.objfrm.FormViewerDetails.BasicDetails.InfusionDetails != null && this.objfrm.FormViewerDetails.BasicDetails.InfusionDetails.PrevSequentialPrescribingData != null && this.objfrm.FormViewerDetails.BasicDetails.InfusionDetails.PrevSequentialPrescribingData.IsSequentialPrescribing && (this.objfrm.FormViewerDetails.BasicDetails.InfusionDetails.PrevSequentialPrescribingData.SequentialRoute != null || this.objfrm.FormViewerDetails.BasicDetails.InfusionDetails.PrevSequentialPrescribingData.SequentialMultiplsRoutes != null) && this.objfrm.FormViewerDetails.BasicDetails.InfusionType != null) {
            let indx: number = -1;
            indx = this.objfrm.FormViewerDetails.BasicDetails.DefaultDetails.InfusionTypeList.IndexOf(ObjectHelper.CreateType<CListItem>(this.objfrm.FormViewerDetails.BasicDetails.DefaultDetails.InfusionTypeList.Where(c => c.Value.Contains(this.objfrm.FormViewerDetails.BasicDetails.InfusionType.Value)).FirstOrDefault(), CListItem));
            if (indx != -1) {
                this.objfrm.FormViewerDetails.BasicDetails.IsClearlstAmendList = true;
                this.cboInfusion.SelectedIndex = indx;
            }
            indx = -1;
            if (this.objfrm.FormViewerDetails.BasicDetails.InfusionDetails.DeliveryDevice != null && this.objfrm.FormViewerDetails.BasicDetails.InfusionDetails.DeliveryDevice.DisplayText != null && this.objfrm.FormViewerDetails.BasicDetails.InfusionDetails.DeliveryDevice.DisplayText.length > 0)
                indx = this.objfrm.FormViewerDetails.BasicDetails.InfusionDetails.DeliveryDeviceList.IndexOf(ObjectHelper.CreateType<CListItem>(this.objfrm.FormViewerDetails.BasicDetails.InfusionDetails.DeliveryDeviceList.Where(c => c.DisplayText.Contains(this.objfrm.FormViewerDetails.BasicDetails.InfusionDetails.DeliveryDevice.DisplayText)).FirstOrDefault(), CListItem));
            if (indx != -1)
                this.cboDeliveryDevice.SelectedIndex = indx;
            this.Infusioncal.SetBinding(iButton.IsEnabledProperty, ObjectHelper.CreateObject(new Binding(this.DataContext,"FormViewerDetails.BasicDetails.InfusionDetails.IsenableInfusionrateCalculator"), { Mode: BindingMode.TwoWay }));
        }
        if (this.objfrm != null && this.objfrm.FormViewerDetails != null && this.objfrm.FormViewerDetails.BasicDetails != null) {
            if (String.Compare(PatientContext.PrescriptionType, PrescriptionTypes.Discharge) != 0)
                this.objfrm.FormViewerDetails.BasicDetails.IsVisiblenewmeds = Visibility.Collapsed;
            let CurrentActiveFirstItem: number = 1;
            let objInfusionVM: InfusionVM = null;
            if (this.objfrm.FormViewerDetails.BasicDetails.InfusionDetails != null && this.objfrm.FormViewerDetails.BasicDetails.oPrescitemVM != null && this.objfrm.FormViewerDetails.BasicDetails.oPrescitemVM.ParentbaseVM != null && this.objfrm.FormViewerDetails.BasicDetails.oPrescitemVM.ParentbaseVM.MedsResolve != null && this.objfrm.FormViewerDetails.BasicDetails.oPrescitemVM.ParentbaseVM.MedsResolve.Count > 0) {
                objInfusionVM = CSequentialHelper.GetFirstActiveItemInfusionVM(this.objfrm.FormViewerDetails.BasicDetails.oPrescitemVM.ParentbaseVM.MedsResolve, this.objfrm.FormViewerDetails.BasicDetails.InfusionDetails.GroupSequenceNo);
            }
            if (objInfusionVM != null) {
                CurrentActiveFirstItem = objInfusionVM.ItemSequenceNo;
            }
            if (this.objfrm.FormViewerDetails.BasicDetails.InfusionDetails.ItemSequenceNo == CurrentActiveFirstItem) {
                this.iTimeStartDateTime.SetBinding(iTimeBox.ValueProperty, ObjectHelper.CreateObject(new Binding(this.DataContext,"FormViewerDetails.BasicDetails.StartPrescriptionTime"), { Mode: BindingMode.TwoWay }));
                if (!String.IsNullOrEmpty(PatientContext.PrescriptionType) && String.Compare(PatientContext.PrescriptionType, PrescriptionTypes.ForAdministration) == 0 && (this.objfrm.FormViewerDetails.BasicDetails.InfusionType != null && !String.IsNullOrEmpty(this.objfrm.FormViewerDetails.BasicDetails.InfusionType.Value) && ((String.Equals(this.objfrm.FormViewerDetails.BasicDetails.InfusionType.Value, InfusionTypesCode.CONTINUOUS) || String.Equals(this.objfrm.FormViewerDetails.BasicDetails.InfusionType.Value, InfusionTypesCode.SINGLEDOSEVOLUME) || String.Equals(this.objfrm.FormViewerDetails.BasicDetails.InfusionType.Value, InfusionTypesCode.FLUID))) || this.objfrm.FormViewerDetails.BasicDetails.itemSubType != null && String.Compare(this.objfrm.FormViewerDetails.BasicDetails.itemSubType, CConstants.SUBTYPE_BLOOD) == 0)) {
                    if (DateTime.NotEquals(this.objfrm.FormViewerDetails.BasicDetails.StartDTTM, DateTime.MinValue)) {
                        let dtStartDTTM: DateTime = this.objfrm.FormViewerDetails.BasicDetails.StartDTTM.DateTime.AddTime(this.objfrm.FormViewerDetails.BasicDetails.StartPrescriptionTime);
                        let dtCurrent: DateTime = CommonBB.GetServerDateTime();
                        // Need to check
                        // if (String.Compare(ContextInfo.MenuCode, CConstants.ClinicallyVerifyMenuCode) != 0 && dtStartDTTM >= dtCurrent && (dtStartDTTM.AddMinutes(-MedicationCommon.MedChartData.DuenessThreshold) <= dtCurrent && dtCurrent <= dtStartDTTM.AddMinutes(MedicationCommon.MedChartData.DuenessThreshold)) && this.objfrm.FormViewerDetails.BasicDetails.InfusionDetails.SelectedSequenceName == null) {
                        if (String.Compare(ContextInfo.MenuCode, CConstants.ClinicallyVerifyMenuCode) != 0 && DateTime.GreaterThanOrEqualTo(dtStartDTTM, dtCurrent) && (DateTime.LessThanOrEqualTo(dtStartDTTM.AddMinutes(-MedChartData.DuenessThreshold), dtCurrent) && DateTime.LessThanOrEqualTo(dtCurrent, dtStartDTTM.AddMinutes(MedChartData.DuenessThreshold))) && this.objfrm.FormViewerDetails.BasicDetails.InfusionDetails.SelectedSequenceName == null) {
                            this.objfrm.FormViewerDetails.BasicDetails.DueNowScheduleDTTM = dtStartDTTM;
                            this.objfrm.FormViewerDetails.BasicDetails.RecordAdminMsg1 = String.Format(Resource.MedicationForm.RecordAdminDueNowMessage, dtStartDTTM.ToUserDateTimeString("HH:mm"));
                            this.objfrm.FormViewerDetails.BasicDetails.RecordAdminMsg1_Tooltip = Resource.MedicationForm.RecordAdminDueNowMessage_Tooltip;
                            this.objfrm.FormViewerDetails.BasicDetails.InfusionDetails.ContinousAddOptions = Resource.Infusion.Additionaloptions_Msg;
                        }
                    }
                }
            }
            else {
                let PreviousStartDTTM: DateTime = DateTime.MinValue;
                let PreviousStartPrescriptionTime: DateTime = DateTime.MinValue;
                if (this.objfrm.ActionCode == ActivityTypes.Amend && DateTime.NotEquals(this.objfrm.FormViewerDetails.BasicDetails.StartDTTM, DateTime.MinValue)) {
                    if (DateTime.NotEquals(this.objfrm.FormViewerDetails.BasicDetails.StartDTTM, DateTime.MinValue)) {
                        this.iTimeStartDateTime.SetBinding(iTimeBox.ValueProperty, ObjectHelper.CreateObject(new Binding(this.DataContext,"FormViewerDetails.BasicDetails.StartPrescriptionTime"), { Mode: BindingMode.TwoWay }));
                    }
                }
                else {
                    this.objfrm.FormViewerDetails.BasicDetails.StartDTTM = (DateTime.NotEquals(this.objfrm.FormViewerDetails.BasicDetails.StartDTTM, DateTime.MinValue) && this.objfrm.ParentbaseVM != null && this.objfrm.ParentbaseVM.IsNonSequentialitem) ? DateTime.MinValue : this.objfrm.FormViewerDetails.BasicDetails.StartDTTM;
                    if (DateTime.Equals(this.objfrm.FormViewerDetails.BasicDetails.StartDTTM,  DateTime.MinValue) && (this.objfrm.FormViewerDetails.BasicDetails.InfusionDetails.CurrentSequentialOrder > 0 || this.objfrm.FormViewerDetails.BasicDetails.InfusionDetails.SequentialItemOrder > 0)) {
                        let oInfusionContinousSeq: InfContinousSequentail = null;
                        if (this.objfrm.ParentbaseVM != null)
                            oInfusionContinousSeq = this.objfrm.ParentbaseVM.InfusionContinousSeq;
                        let isNextScheduleExists: boolean = this.objfrm.IsNextSeqSlotExists(oInfusionContinousSeq, this.objfrm, (o1) => { PreviousStartDTTM = o1; }, (o2) => { PreviousStartPrescriptionTime = o2; });
                        if (isNextScheduleExists) {
                            this.objfrm.FormViewerDetails.BasicDetails.StartDTTM = PreviousStartDTTM;
                            this.objfrm.FormViewerDetails.BasicDetails.StartPrescriptionTime = PreviousStartPrescriptionTime;
                            this.iTimeStartDateTime.SetBinding(iTimeBox.ValueProperty, ObjectHelper.CreateObject(new Binding(this.DataContext,"FormViewerDetails.BasicDetails.StartPrescriptionTime"), { Mode: BindingMode.TwoWay }));
                        }
                        else {
                            this.objfrm.FormViewerDetails.BasicDetails.StartDTTM = DateTime.MinValue;
                        }
                    }
                    else {
                        this.iTimeStartDateTime.SetBinding(iTimeBox.ValueProperty, ObjectHelper.CreateObject(new Binding(this.DataContext,"FormViewerDetails.BasicDetails.StartPrescriptionTime"), { Mode: BindingMode.TwoWay }));
                    }
                }
                if (this.objfrm.FormViewerDetails.BasicDetails.IsRecordAdminMsg1Visible == Visibility.Collapsed) {
                    this.objfrm.FormViewerDetails.BasicDetails.IscontentAdditionalOptions = Visibility.Collapsed;
                }
            }
            if (String.Compare(this.objfrm.FormViewerDetails.BasicDetails.BrandName, "Select brand", StringComparison.InvariantCultureIgnoreCase) == 0) {
                this.objfrm.FormViewerDetails.BasicDetails.IsClearEnabled = false;
            }
            else {
                this.objfrm.FormViewerDetails.BasicDetails.IsClearEnabled = true;
            }
            this.SetInfrateCalEnaDis();
            if (!this.bIsLoaded) {
                this.bIsLoaded = true;
                this.objfrm.FormViewerDetails.BasicDetails.IscontentAdminTimesVisible = Visibility.Collapsed;
                if (this.objfrm.ActionCode == ActivityTypes.Amend && this.objfrm.IsReasonForModificationVisible == Visibility.Visible && (this.objfrm.formViewerDetails.BasicDetails.ReasonforModification != null && !String.IsNullOrEmpty(this.objfrm.formViewerDetails.BasicDetails.ReasonforModification.Value) && (!String.Equals(this.objfrm.FormViewerDetails.BasicDetails.ReasonforModification.DisplayText, "Select reason", StringComparison.InvariantCultureIgnoreCase))) && (this.objfrm.formViewerDetails.BasicDetails.MedClerkModifyReason == null || (this.objfrm.formViewerDetails.BasicDetails.MedClerkModifyReason != null && String.IsNullOrEmpty(this.objfrm.formViewerDetails.BasicDetails.MedClerkModifyReason.Value)))) {
                    this.objfrm.FormViewerDetails.BasicDetails.IsenableRSNFORMOD = false;
                    this.objfrm.FormViewerDetails.BasicDetails.IsMandatoryRSNFORMOD = false;
                    this.objfrm.FormViewerDetails.BasicDetails.IsClearlstAmendedFlds = true;
                    this.objfrm.FormViewerDetails.BasicDetails.lstAmendedFlds.Clear();
                    this.objfrm.FormViewerDetails.BasicDetails.IsClearlstAmendList = true;
                }
                else if (this.objfrm.ActionCode == ActivityTypes.Amend && (this.objfrm.FormViewerDetails.BasicDetails.IsMCenableRSNFORMOD || (this.objfrm.FormViewerDetails.BasicDetails.IsClearlstAmendedFlds && this.objfrm.FormViewerDetails.BasicDetails.lstAmendedFlds != null && this.objfrm.FormViewerDetails.BasicDetails.lstAmendedFlds.Count > 0 && (this.objfrm.FormViewerDetails.BasicDetails.lstAmendedFlds.Contains("InfusionType") || this.objfrm.FormViewerDetails.BasicDetails.lstAmendedFlds.Contains("Route"))))) {
                    this.objfrm.IsReasonForModificationVisible = Visibility.Visible;
                    this.objfrm.FormViewerDetails.BasicDetails.IsMandatoryRSNFORMOD = true;
                }
                else if (this.objfrm.ActionCode == ActivityTypes.Reorder && ((this.objfrm.FormViewerDetails.BasicDetails.IsClearlstAmendList && this.objfrm.FormViewerDetails.BasicDetails.lstAmendedFlds != null && this.objfrm.FormViewerDetails.BasicDetails.lstAmendedFlds.Count > 0 && (this.objfrm.FormViewerDetails.BasicDetails.lstAmendedFlds.Contains("InfusionType") || this.objfrm.FormViewerDetails.BasicDetails.lstAmendedFlds.Contains("Route"))))) {
                    this.objfrm.FormViewerDetails.BasicDetails.IsClearOnAdmissionAmended = true;
                }
                else {
                    let bIsModificationReasonExists: boolean = this.objfrm.FormViewerDetails.BasicDetails.IsModificationReasonExists;
                    if (this.objfrm.FormViewerDetails.BasicDetails.IsCancelClick) {
                        this.objfrm.FormViewerDetails.BasicDetails.IsClearOnAdmissionAmended = false;
                        this.objfrm.FormViewerDetails.BasicDetails.IsCancelClick = false;
                    }
                    this.objfrm.IsReasonForModificationVisible = Visibility.Collapsed;
                    if (!this.objfrm.IsTechValFauxTabLoaded) {
                        this.objfrm.FormViewerDetails.BasicDetails.lstAmendedFlds.Clear();
                    }
                    if (!this.objfrm.IsConflictFaxTabLoaded && !this.objfrm.IsTechValFauxTabLoaded && !this.objfrm.FormViewerDetails.BasicDetails.IsClearlstAmendedFlds) {
                        this.objfrm.FormViewerDetails.BasicDetails.IsenableRSNFORMOD = false;
                        this.objfrm.FormViewerDetails.BasicDetails.IsMandatoryRSNFORMOD = false;
                    }
                    this.objfrm.FormViewerDetails.BasicDetails.IsClearlstAmendedFlds = true;
                    this.objfrm.FormViewerDetails.BasicDetails.IsClearlstAmendList = true;
                    if (bIsModificationReasonExists)
                        this.objfrm.FormViewerDetails.BasicDetails.IsModificationReasonExists = true;
                    if (!this.objfrm.FormViewerDetails.BasicDetails.IsReloadedBasicTabContent) {
                        this.objfrm.FormViewerDetails.BasicDetails.lstDRCAmendedFlds.Clear();
                    }
                }
                this.objfrm.FormViewerDetails.BasicDetails.IsValidateDose = true;
                this.objfrm.FormViewerDetails.BasicDetails.IsMandatoryFrequency = false;
                this.objfrm.FormViewerDetails.BasicDetails.Infusions = true;
                if (String.Compare(this.objfrm.FormViewerDetails.BasicDetails.itemSubType, CConstants.SUBTYPE_BLOOD, StringComparison.OrdinalIgnoreCase) != 0 && ((this.objfrm.FormViewerDetails.BasicDetails.InfusionType != null && !String.IsNullOrEmpty(this.objfrm.FormViewerDetails.BasicDetails.InfusionType.Value) && !String.Equals(this.objfrm.FormViewerDetails.BasicDetails.InfusionType.Value, InfusionTypeCode.FLUID)) || this.objfrm.FormViewerDetails.BasicDetails.InfusionType == null)) {
                    if (this.objfrm.FormViewerDetails.BasicDetails.AccessContraintControls != null && this.objfrm.FormViewerDetails.BasicDetails.AccessContraintControls.Contains("cboDoseType"))
                        this.objfrm.FormViewerDetails.BasicDetails.IsenableDoseType = false;
                    else this.objfrm.FormViewerDetails.BasicDetails.IsenableDoseType = true;
                }
                else if (String.Compare(this.objfrm.FormViewerDetails.BasicDetails.itemSubType, CConstants.SUBTYPE_BLOOD, StringComparison.OrdinalIgnoreCase) == 0) {
                    this.objfrm.FormViewerDetails.BasicDetails.IsenableDoseType = false;
                }
                if (this.objfrm.FormViewerDetails.BasicDetails.AccessContraintControls != null && this.objfrm.FormViewerDetails.BasicDetails.AccessContraintControls.Contains("cboSite"))
                    this.objfrm.FormViewerDetails.BasicDetails.IsSiteEnabled = false;
                else if (selectedInfusionRoute != null && selectedInfusionRoute.Count() > 1 && selectedrouteClistitem != null && selectedrouteClistitem.Count() > 0 && (selectedInfusionRoute.Count() == selectedrouteClistitem.Count()) && PatientContext.PrescriptionType == PrescriptionTypes.ForAdministration) {
                    this.objfrm.FormViewerDetails.BasicDetails.IsSiteEnabled = false;
                }
                else this.objfrm.FormViewerDetails.BasicDetails.IsSiteEnabled = true;
                if ((this.objfrm.FormViewerDetails.BasicDetails.DoseType != null)) {
                    if (String.Equals(this.objfrm.FormViewerDetails.BasicDetails.DoseType.Value, DoseTypeCode.STEPPEDVARIABLE)) {
                        this.objfrm.FormViewerDetails.BasicDetails.DoseType = ObjectHelper.CreateObject(new CListItem(), {
                            Value: DoseTypeCode.NORMAL,
                            DisplayText: DoseTypeCode.NORMALDisplaytxt
                        });
                    }
                }
                if (!this.objfrm.IsClinicallyVerifyEnable && String.Compare(ContextInfo.MenuCode, CConstants.ClinicallyVerifyMenuCode, StringComparison.InvariantCultureIgnoreCase) != 0 && String.Compare(ContextInfo.MenuCode, CConstants.AuthoriseMenuCode, StringComparison.InvariantCultureIgnoreCase) != 0) {
                    this.objfrm.FormViewerDetails.BasicDetails.IsVisibleClinicallyverify = Visibility.Collapsed;
                }
                this.SetInfrateCalEnaDis();
                if (String.Compare(ContextInfo.MenuCode, CConstants.ClinicallyVerifyMenuCode, StringComparison.InvariantCultureIgnoreCase) == 0) {
                    this.EnableClinicallyverifyCheckbox();
                }
                else if (String.Compare(ContextInfo.MenuCode, CConstants.AuthoriseMenuCode, StringComparison.InvariantCultureIgnoreCase) == 0) {
                    this.lblIsClinicallyVerified.Text = "Authorised";
                    this.lblVerificationComments.Text = "Authoriser’s comments";
                    this.lblVerificationComments.Mandatory = false;
                    ToolTipService.SetToolTip(this.txtVerificationComments, Resource.MedicationForm.txtVerificationComments_Tooltip_Authorise);
                    ToolTipService.SetToolTip(this.chckClinicalVerify, Resource.MedicationForm.chckClinicalVerify_Tooltip_Athorise);
                    if (!this.objfrm.IsClinicallyVerifyEnable) {
                        this.chckClinicalVerify.IsEnabled = this.objfrm.FormViewerDetails.BasicDetails.IsEnableChkClinivallyVerify = false;
                    }
                }
            }
            let IsSteppedDose: boolean = false;
            if (String.Compare(PatientContext.PrescriptionType, PrescriptionTypes.Clerking) != 0 && ((this.objfrm.FormViewerDetails.BasicDetails.oPrescitemVM.ActionCode != ActivityTypes.Reorder && !this.objfrm.FormViewerDetails.BasicDetails.IsClearlstAmendList) || this.objfrm.FormViewerDetails.BasicDetails.IsClearlstAmendList)) {
                if (this.objfrm.FormViewerDetails.BasicDetails != null && this.objfrm.FormViewerDetails.BasicDetails.InfusionType != null && (String.Equals(this.objfrm.FormViewerDetails.BasicDetails.InfusionType.Value, InfusionTypesCode.CONTINUOUS) || String.Equals(this.objfrm.FormViewerDetails.BasicDetails.InfusionType.Value, InfusionTypesCode.SINGLEDOSEVOLUME) || String.Equals(this.objfrm.FormViewerDetails.BasicDetails.InfusionType.Value, InfusionTypesCode.FLUID)) && ProfileData.InfusionPresConfig != null && this.objfrm.FormViewerDetails.BasicDetails.InfusionDetails != null && this.objfrm.FormViewerDetails.BasicDetails.InfusionDetails.DeliveryDevice != null) {
                    let InfusionrateNUMDEMUOM = ProfileData.InfusionPresConfig.objInfusDeliveryDevice.Where(UOMDEMO => UOMDEMO.DeviceName == this.objfrm.FormViewerDetails.BasicDetails.InfusionDetails.DeliveryDevice.DisplayText).Select(UOMDEMO => UOMDEMO).FirstOrDefault();
                    if (((this.objfrm.FormViewerDetails.BasicDetails.DoseType != null) && (String.Compare(this.objfrm.FormViewerDetails.BasicDetails.DoseType.Value, DoseTypeCode.STEPPED, StringComparison.OrdinalIgnoreCase) == 0)) || ((this.objfrm.FormViewerDetails.BasicDetails.DoseType != null) && (String.Compare(this.objfrm.FormViewerDetails.BasicDetails.DoseType.Value, DoseTypeCode.VARIABLE, StringComparison.OrdinalIgnoreCase) == 0)) || ((this.objfrm.FormViewerDetails.BasicDetails.DoseType != null) && (String.Compare(this.objfrm.FormViewerDetails.BasicDetails.DoseType.Value, DoseTypeCode.STEPPEDVARIABLE, StringComparison.OrdinalIgnoreCase) == 0))) {
                        IsSteppedDose = true;
                    }
                    if (InfusionrateNUMDEMUOM != null && !IsSteppedDose) {
                        let oItemNum: CListItem = new CListItem();
                        let oItemDenom: CListItem = new CListItem();
                        oItemNum.DisplayText = InfusionrateNUMDEMUOM.InfusionRateNumUOMCode;
                        oItemNum.Value = InfusionrateNUMDEMUOM.InfusionRateNumUOMOID;
                        oItemDenom.DisplayText = InfusionrateNUMDEMUOM.InfusionRateDenomUOMCode;
                        oItemDenom.Value = InfusionrateNUMDEMUOM.InfusionRateDenomUOMOID;
                        if (!(String.Equals(this.objfrm.FormViewerDetails.BasicDetails.InfusionType.Value, InfusionTypesCode.CONTINUOUS) || String.Equals(this.objfrm.FormViewerDetails.BasicDetails.InfusionType.Value, InfusionTypesCode.SINGLEDOSEVOLUME) || String.Equals(this.objfrm.FormViewerDetails.BasicDetails.InfusionType.Value, InfusionTypesCode.FLUID))) {
                            if (oItemNum != null && !String.IsNullOrEmpty(oItemNum.DisplayText) && this.objfrm.FormViewerDetails.BasicDetails.InfusionDetails.InfRateNumeratorUom != null && this.objfrm.FormViewerDetails.BasicDetails.InfusionDetails.InfRateNumeratorUom.Value != null && this.objfrm.FormViewerDetails.BasicDetails.InfusionDetails.InfRateNumeratorUom.Value.length > 0) {
                                this.objfrm.FormViewerDetails.BasicDetails.InfusionDetails.IsenableInfusionratenumuom = false;
                            }
                            if (oItemDenom != null && !String.IsNullOrEmpty(oItemDenom.DisplayText) && this.objfrm.FormViewerDetails.BasicDetails.InfusionDetails.InfRateDinominatorUom != null && this.objfrm.FormViewerDetails.BasicDetails.InfusionDetails.InfRateDinominatorUom.Value != null && this.objfrm.FormViewerDetails.BasicDetails.InfusionDetails.InfRateDinominatorUom.Value.length > 0) {
                                this.objfrm.FormViewerDetails.BasicDetails.InfusionDetails.IsenableInfusionrateDenominatoruom = false;
                            }
                            if (!this.objfrm.FormViewerDetails.BasicDetails.InfusionDetails.IsenableInfusionratenumuom && !this.objfrm.FormViewerDetails.BasicDetails.InfusionDetails.IsenableInfusionrateDenominatoruom) {
                                this.objfrm.FormViewerDetails.BasicDetails.InfusionDetails.IsenableInfusionrateCalculator = false;
                            }
                        }
                    }
                }
            }
            if (this.objfrm.FormViewerDetails.BasicDetails.DoseType != null) {
                if (String.Compare(this.objfrm.FormViewerDetails.BasicDetails.DoseType.Value, DoseTypeCode.STEPPED, StringComparison.OrdinalIgnoreCase) == 0 || String.Compare(this.objfrm.FormViewerDetails.BasicDetails.DoseType.Value, DoseTypeCode.VARIABLE, StringComparison.OrdinalIgnoreCase) == 0 || String.Compare(this.objfrm.FormViewerDetails.BasicDetails.DoseType.Value, DoseTypeCode.STEPPEDVARIABLE, StringComparison.OrdinalIgnoreCase) == 0) {
                    this.objfrm.FormViewerDetails.BasicDetails.DoseType = ObjectHelper.CreateObject(new CListItem(), { Value: String.Empty });
                }
            }
        }
        if ((String.Compare(PatientContext.PrescriptionType, PrescriptionTypes.Discharge, StringComparison.OrdinalIgnoreCase) != 0) && this.objfrm != null && this.objfrm.FormViewerDetails != null && this.objfrm.FormViewerDetails.BasicDetails != null) {
            this.objfrm.FormViewerDetails.BasicDetails.IsVisiblenewmeds = Visibility.Collapsed;
        }
        {
            let objInfVM: InfusionVM = null;
            if (this.objfrm.FormViewerDetails.BasicDetails.InfusionDetails != null && this.objfrm.FormViewerDetails.BasicDetails.oPrescitemVM != null && this.objfrm.FormViewerDetails.BasicDetails.oPrescitemVM.ParentbaseVM != null && this.objfrm.FormViewerDetails.BasicDetails.oPrescitemVM.ParentbaseVM.MedsResolve != null && this.objfrm.FormViewerDetails.BasicDetails.oPrescitemVM.ParentbaseVM.MedsResolve.Count > 0) {
                objInfVM = CSequentialHelper.GetFirstActiveItemInfusionVM(this.objfrm.FormViewerDetails.BasicDetails.oPrescitemVM.ParentbaseVM.MedsResolve, this.objfrm.FormViewerDetails.BasicDetails.InfusionDetails.GroupSequenceNo);
                if (objInfVM != null) {
                    if (this.objfrm.FormViewerDetails.BasicDetails.InfusionDetails.ItemSequenceNo != objInfVM.ItemSequenceNo) {
                        this.objfrm.FormViewerDetails.BasicDetails.IsEnableStartdtSeq = false;
                    }
                    else {
                        this.objfrm.FormViewerDetails.BasicDetails.IsEnableStartdtSeq = true;
                    }
                }
                else if (this.objfrm.FormViewerDetails.BasicDetails.InfusionDetails.IsAnyItemAdministeredInSeqGroup == 1) {
                    this.objfrm.FormViewerDetails.BasicDetails.IsEnableStartdtSeq = false;
                }
            }
        }
        if (this.DataContext.FormViewerDetails.BasicDetails.IsClinicallyVerified == true) {
            if (this.objfrm != null) {
                this.objfrm.IsClinicallyVerifyCommentsMandatory = false;
    
            }
        }
        else{
            if (String.Equals(ContextInfo.MenuCode, CConstants.ClinicallyVerifyMenuCode, StringComparison.InvariantCultureIgnoreCase) && this.objfrm != null && this.objfrm.PrescriptionItemStatus == CConstants.CLINICALLYVERIFIED){
                this.objfrm.IsClinicallyVerifyCommentsMandatory = true;
            }
            
        }
    }

    // cboSequenceName_SelectionChanged_Func = (s, e) => {
    //     if (this.cboSequenceName != null || typeof (this.cboSequenceName) !== 'undefined') {
    //         Object.keys(that).forEach((prop) => (this[prop] = that[prop]));
    //         this.cboSequenceName_SelectionChanged(s, e);
    //     }
    // }

    private cboSequenceName_SelectionChanged(sender: Object, e: SelectionChangedEventArgs): void {
        let SelectedSeqName = ((sender as iComboBox).SelectedValue as CListItem).DisplayText
        if(SelectedSeqName === "<New sequence>"){
            this.cboPrecedingInfusionItem.SelectedValue = null;  
            this.DataContext.FormViewerDetails.BasicDetails.InfusionDetails.SelectedPrecedingInfusionItem = null;   
        }   
    }

    private UserControl_Unloaded(sender: Object, e: RoutedEventArgs): void {

    }

    chckisnewmeds_OnChange_Func = (s, e) => {
        ObjectHelper.CreateObject(this, that);
        this.chckisnewmeds_OnChange(s, e);
    }

    private chckisnewmeds_OnChange(sender: Object, e: RoutedEventArgs): void {
        if (this.objfrm != null && this.objfrm.ParentbaseVM != null)
            this.objfrm.ParentbaseVM.isReconcileserreq = true;
        if (this.objfrm != null)
            this.objfrm.isnewmedschecked = true;
    }
    private EnableClinicallyverifyCheckbox(): void {
        if (this.objfrm != null && (this.objfrm.ActionCode == ActivityTypes.Prescribe || this.objfrm.ActionCode == ActivityTypes.Reorder)) {
            if ((this.objfrm.FormViewerDetails.BasicDetails.IsAuthorise || this.objfrm.FormViewerDetails.BasicDetails.IsFluidAuthorise || this.objfrm.FormViewerDetails.BasicDetails.IsMCIAuthorise) && String.IsNullOrEmpty(this.objfrm.PrescriptionItemStatus) && String.Equals(PatientContext.PrescriptionType, PrescriptionTypes.ForAdministration, StringComparison.OrdinalIgnoreCase) && PatientContext.ClerkFormViewDefaultBehavior != ClerkFormViewDeftBehaviour.LaunchFormMandatory) {
                this.chckClinicalVerify.IsEnabled = this.objfrm.IsClinicallyVerifyEnable = this.objfrm.FormViewerDetails.BasicDetails.IsEnableChkClinivallyVerify = false;
            }
            else {
                this.chckClinicalVerify.IsEnabled = this.objfrm.IsClinicallyVerifyEnable = this.objfrm.FormViewerDetails.BasicDetails.IsEnableChkClinivallyVerify = true;
            }
            this.objfrm.IsClinicallyVerifyCommentsMandatory = false;
        }
        else if (this.objfrm.ActionCode == ActivityTypes.Amend) {
            if (this.objfrm.FormViewerDetails.BasicDetails.IsClinicallyVerified || this.objfrm.IsClinicallyVerifyEnable)
                this.chckClinicalVerify.IsEnabled = this.objfrm.FormViewerDetails.BasicDetails.IsEnableChkClinivallyVerify = true;
            this.objfrm.IsClinicallyVerifyCommentsMandatory = !this.objfrm.FormViewerDetails.BasicDetails.IsClinicallyVerified && this.objfrm.PrescriptionItemStatus == CConstants.CLINICALLYVERIFIED;
        }
    }
    cmdBrand_MouseLeftButtonDown_Func = (s, e) => { 
        Object.keys(that).forEach((prop) => (this[prop] = that[prop]));
        this.cmdBrand_MouseLeftButtonDown(s, e); }
    private cmdBrand_MouseLeftButtonDown(sender: Object, e: MouseButtonEventArgs): void {
        this.objfrm.LaunchBrandConstraint();
    }
     lblMedicationClerk_MouseLeftButtonUp(sender: Object, e: MouseButtonEventArgs): void {
        // implemented to invoke the multiselectListView 14-06
        if (this.objfrm != null && this.objfrm.FormViewerDetails.BasicDetails != null && this.objfrm.FormViewerDetails.BasicDetails.MedicationClerkingSource != null) {
            this.oMultiSelectListView = new MultiSelectListView();
            this.oMultiSelectListView.constructorImpl(ValueDomain.MedicationClerking, this.objfrm.FormViewerDetails.BasicDetails.MedicationClerkingSource.ToList());
            // ObjectHelper.stopFinishAndCancelEvent(true);
            AppActivity.OpenWindow("Medication clerking source - LORENZO", this.oMultiSelectListView, (s, e) => { this.oMultiSelectListView_Closed(s); }, "", false, 625, 450, false, WindowButtonType.OkCancel, null);
        }
        //this.oMultiSelectListView = new MultiSelectListView(ValueDomain.MedicationClerking, this.objfrm.FormViewerDetails.BasicDetails.MedicationClerkingSource);
        //AppActivity.OpenWindow("Medication clerking source - LORENZO", this.oMultiSelectListView, this.oMultiSelectListView_Closed, "", false, 480, 450, false, WindowButtonType.OkCancel, null);
    }
    oMultiSelectListView_Closed(args: AppDialogEventargs): void {
        if (args.Content != null)
            this.oMultiSelectListView = ObjectHelper.CreateType<MultiSelectListView>(args.Content.Component, MultiSelectListView);
        if (args.Result == AppDialogResult.Ok && args.Content != null && args.Content.Component != null) {
            if (this.oMultiSelectListView.okButtonClick()) {
                if (this.oMultiSelectListView instanceof MultiSelectListView) {
                    let oMultiSelectVM: MultiSelectListVM = ObjectHelper.CreateType<MultiSelectListVM>(this.oMultiSelectListView.DataContext, MultiSelectListVM);
                    if (oMultiSelectVM instanceof MultiSelectListVM)
                        this.objfrm.FormViewerDetails.BasicDetails.MedicationClerkingSource = oMultiSelectVM.ValueDomainCollection;
                }
            }
        }
        else {
            this.oMultiSelectListView.CancelButtonClick();
        }
    }

    cboRsnForMod_IsEnabledChanged_Func = (s, e) => {
        ObjectHelper.CreateObject(this, that);
        this.cboRsnForMod_IsEnabledChanged(s, e);
    }

    private cboRsnForMod_IsEnabledChanged(sender: Object, e: DependencyPropertyChangedEventArgs): void {
        if (this.cboRsnForMod.IsEnabled) {
            if (this.objfrm != null && this.objfrm.FormViewerDetails != null && this.objfrm.FormViewerDetails.BasicDetails != null && this.objfrm.FormViewerDetails.BasicDetails.IsMandatoryRSNFORMOD == true) {
                if (!String.Equals(ContextInfo.MenuCode, CConstants.ClinicallyVerifyMenuCode, StringComparison.InvariantCultureIgnoreCase))
                    this.objfrm.FormViewerDetails.BasicDetails.IsClinicallyVerified = true;
                if (this.objfrm.FormViewerDetails.BasicDetails.IsAddtoResolve && this.objfrm.ActionCode == ActivityTypes.Amend && this.objfrm.FormViewerDetails.BasicDetails.ReasonforModification == null) {
                    this.objfrm.FormViewerDetails.BasicDetails.IsAddtoResolve = false;
                }
                else {
                    if (!String.Equals(ContextInfo.MenuCode, CConstants.ClinicallyVerifyMenuCode, StringComparison.InvariantCultureIgnoreCase))
                        this.chckClinicalVerify.IsEnabled = this.objfrm.FormViewerDetails.BasicDetails.IsEnableChkClinivallyVerify = this.objfrm.IsClinicallyVerifyEnable = false;
                }
                if (!String.Equals(ContextInfo.MenuCode, CConstants.ClinicallyVerifyMenuCode, StringComparison.InvariantCultureIgnoreCase))
                    this.objfrm.IsClinicallyVerifyCommentsMandatory = !this.objfrm.FormViewerDetails.BasicDetails.IsClinicallyVerified;
            }
            else if (this.objfrm != null && this.objfrm.FormViewerDetails != null && this.objfrm.FormViewerDetails.BasicDetails != null && this.objfrm.FormViewerDetails.BasicDetails.IsenableRSNFORMOD) {
                if (String.Equals(ContextInfo.MenuCode, CConstants.AuthoriseMenuCode, StringComparison.InvariantCultureIgnoreCase))
                    this.objfrm.FormViewerDetails.BasicDetails.IsRsnForModAuthEnabled = true;
            }
        }
    }
    public SetInfrateCalEnaDis(): void {
        if (this.objfrm != null && this.objfrm.FormViewerDetails != null && this.objfrm.FormViewerDetails.BasicDetails != null && this.objfrm.FormViewerDetails.BasicDetails.InfusionDetails != null) {
            if (String.Compare(PatientContext.PrescriptionType, PrescriptionTypes.ForAdministration) == 0)
                this.objfrm.FormViewerDetails.BasicDetails.IsenableReviewAfter = true;
            else this.objfrm.FormViewerDetails.BasicDetails.IsenableReviewAfter = false;
        }
    }
    chckClinicalVerify_OnChange_Func=(s,e)=>{Object.keys(that).forEach((prop) => (this[prop] = that[prop]));this.chckClinicalVerify_OnChange(s,e)}
    private chckClinicalVerify_OnChange(sender: Object, e: RoutedEventArgs): void {
        if (this.chckClinicalVerify.IsChecked == true) {
            if (this.objfrm != null) {
                this.objfrm.IsClinicallyVerifyCommentsMandatory = false;
                this.objfrm.FormViewerDetails.BasicDetails.IsClinicallyVerified = true;
            }
        }
        else {
            if (String.Equals(ContextInfo.MenuCode, CConstants.ClinicallyVerifyMenuCode, StringComparison.InvariantCultureIgnoreCase) && this.objfrm != null && this.objfrm.PrescriptionItemStatus == CConstants.CLINICALLYVERIFIED) {
                this.objfrm.OperationMode = "M";
            }
            if (String.Equals(ContextInfo.MenuCode, CConstants.ClinicallyVerifyMenuCode, StringComparison.InvariantCultureIgnoreCase) && (this.objfrm.ActionCode != ActivityTypes.Amend || this.objfrm.PrescriptionItemStatus != CConstants.CLINICALLYVERIFIED))
                this.objfrm.IsClinicallyVerifyCommentsMandatory = false;
            if (this.objfrm != null && this.objfrm.FormViewerDetails != null && this.objfrm.FormViewerDetails.BasicDetails != null) {
                this.objfrm.FormViewerDetails.BasicDetails.IsClinicallyVerified = false;
            }
            if (String.Equals(ContextInfo.MenuCode, CConstants.ClinicallyVerifyMenuCode, StringComparison.InvariantCultureIgnoreCase) && this.objfrm != null && this.objfrm.PrescriptionItemStatus == CConstants.CLINICALLYVERIFIED){
                this.objfrm.IsClinicallyVerifyCommentsMandatory = true;
            }
        }
    }

    txtInfusionRate_TextChanged_Func = (s, e) => {
        ObjectHelper.CreateObject(this, that);
        this.txtInfusionRate_TextChanged(s, e);
    }

    private txtInfusionRate_TextChanged(sender: Object, e: TextChangedEventArgs): void {
        let LText: string = this.txtInfusionRate.Text?.toString();
        LText.Trim();
        if (LText.length > 0 && this.objfrm.FormViewerDetails.BasicDetails.InfusionDetails.IsenableInfusionRate) {
            this.objfrm.FormViewerDetails.BasicDetails.InfusionDetails.IsEnableInfUpperRate = true;
        }
        else {
            this.objfrm.FormViewerDetails.BasicDetails.InfusionDetails.UpperRate = String.Empty;
            this.objfrm.FormViewerDetails.BasicDetails.InfusionDetails.IsEnableInfUpperRate = false;
        }
    }
    private txtLowerDose_KeyDown(sender: Object, e: KeyEventArgs): void {
        if (e.PlatformKeyCode == 189) {
            e.Handled = true;
        }
    }
    objDoseMsg_MessageBoxClose(sender: Object, e: MessageEventArgs): void {
        if (e.MessageBoxResult == MessageBoxResult.No) {
            this.objfrm.FormViewerDetails.IsSteppedDoseDetailsModified = false;
        }
    }
    private ClearAllFields(): void {
        this.objfrm.FormViewerDetails.BasicDetails.TreatmentToContinue = null;
        this.objfrm.FormViewerDetails.BasicDetails.MedClerkModifyReason = null;
        this.objfrm.FormViewerDetails.BasicDetails.QuantityUOM = null;
        this.objfrm.FormViewerDetails.BasicDetails.Quantity = null;
        this.objfrm.FormViewerDetails.BasicDetails.Duration = "0";
        this.objfrm.FormViewerDetails.BasicDetails.Frequency = null;
        this.objfrm.FormViewerDetails.BasicDetails.SupplyInsText = String.Empty;
        this.objfrm.FormViewerDetails.BasicDetails.SupplyInsVal = String.Empty;
        this.objfrm.FormViewerDetails.BasicDetails.AsRequired = false;
        this.objfrm.FormViewerDetails.BasicDetails.AdditionalComments = String.Empty;
        this.objfrm.FormViewerDetails.BasicDetails.ProblemIndication = String.Empty;
        this.objfrm.FormViewerDetails.BasicDetails.ReasonforModification = null;
        this.objfrm.FormViewerDetails.BasicDetails.ModificationComments = String.Empty;
        this.objfrm.FormViewerDetails.BasicDetails.Dose = String.Empty;
        this.objfrm.FormViewerDetails.BasicDetails.UpperDose = String.Empty;
        this.objfrm.FormViewerDetails.BasicDetails.DoseUOM = null;
        this.objfrm.FormViewerDetails.BasicDetails.DurationUOM = null;
    }

    txtLowerDose_SelectionChanged_Func = (s, e) => {
        ObjectHelper.CreateObject(this, that);
        this.txtLowerDose_SelectionChanged(s, e);
    }

    private txtLowerDose_SelectionChanged(sender: Object, e: RoutedEventArgs): void {
        if (this.objfrm != null && this.objfrm.FormViewerDetails != null && this.objfrm.FormViewerDetails.BasicDetails != null && this.objfrm.FormViewerDetails.BasicDetails.bDoseFromCal)
            this.objfrm.FormViewerDetails.BasicDetails.bDoseChange = true;
        let otxtLowerDose: iTextBox = ObjectHelper.CreateType<iTextBox>(sender, iTextBox);
        if (this.objfrm != null && this.objfrm.FormViewerDetails != null && this.objfrm.FormViewerDetails.BasicDetails != null && !String.IsNullOrEmpty(this.objfrm.formViewerDetails.BasicDetails.Dose) && !String.Equals(this.objfrm.formViewerDetails.BasicDetails.Dose, otxtLowerDose.Text, StringComparison.CurrentCultureIgnoreCase)) {
            this.objfrm.formViewerDetails.BasicDetails.Dose = otxtLowerDose.Text;
        }
        else if (this.objfrm != null && this.objfrm.FormViewerDetails != null && this.objfrm.FormViewerDetails.BasicDetails != null && String.IsNullOrEmpty(this.objfrm.formViewerDetails.BasicDetails.Dose) && !String.IsNullOrEmpty(otxtLowerDose.Text)) {
            this.objfrm.formViewerDetails.BasicDetails.Dose = otxtLowerDose.Text;
        }
    }
    SelectProduct_MouseLeftButtonDown_Func = (s, e) => { 
        Object.keys(that).forEach((prop) => (this[prop] = that[prop]));
        this.SelectProduct_MouseLeftButtonUp(s, e); }

    private SelectProduct_MouseLeftButtonUp(sender: Object, e: MouseButtonEventArgs): void {
        this.objfrm.LaunchSelProductMezzanie(this.objfrm.FormViewerDetails.BasicDetails.ParentIdentifyingOID,
            this.objfrm.FormViewerDetails.BasicDetails.ParentIdentifyingName,
            this.objfrm.FormViewerDetails.BasicDetails.ParentIdentifyingType);
    }

    txtUpperDose_SelectionChanged_Func = (s, e) => {
        ObjectHelper.CreateObject(this, that);
        this.txtUpperDose_SelectionChanged(s, e);
    }

    private txtUpperDose_SelectionChanged(sender: Object, e: RoutedEventArgs): void {
        let otxtUpperDose: iTextBox = ObjectHelper.CreateType<iTextBox>(sender, iTextBox);
        if (this.objfrm != null && this.objfrm.FormViewerDetails != null && this.objfrm.FormViewerDetails.BasicDetails != null && !String.IsNullOrEmpty(this.objfrm.formViewerDetails.BasicDetails.UpperDose) && !String.Equals(this.objfrm.formViewerDetails.BasicDetails.UpperDose, otxtUpperDose.Text, StringComparison.CurrentCultureIgnoreCase)) {
            this.objfrm.formViewerDetails.BasicDetails.UpperDose = otxtUpperDose.Text;
        }
        else if (this.objfrm != null && this.objfrm.FormViewerDetails != null && this.objfrm.FormViewerDetails.BasicDetails != null && String.IsNullOrEmpty(this.objfrm.formViewerDetails.BasicDetails.UpperDose) && !String.IsNullOrEmpty(otxtUpperDose.Text)) {
            this.objfrm.formViewerDetails.BasicDetails.UpperDose = otxtUpperDose.Text;
        }
    }
    ngOnDestroy(): void {
        this.FormviewerLoadedEventsubscription.unsubscribe();
    }
}


export class DependencyPropertyChangedEventArgs {
    public NewValue: any;
    public OldValue: any;
}

export class TextChangedEventArgs {

}
