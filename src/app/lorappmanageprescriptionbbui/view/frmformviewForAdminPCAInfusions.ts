import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { StringBuilder, ProfileFactoryType, ContextManager, Convert, AppActivity } from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp, Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison, AppDialogEventargs, AppDialogResult, DelegateArgs, DialogComponentArgs, WindowButtonType, CListItem, Visibility, SelectionChangedEventArgs } from 'epma-platform/models';
import { AppDialog, Border, Grid, TextBlock, UserControl, iButton, iCheckBox, iMultiSelectDropdown, iComboBox, iDateTimePicker, iLabel, iTextBox, iTimeBox, iUpDownBox } from 'epma-platform/controls';
import { HelperService } from 'epma-platform/soapclient';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';

import { PrescriptionItemVM } from '../viewmodel/PrescriptionItemVM';
import { MultiSelectListView } from './MultiSelectListView';
import { RoutedEventArgs } from 'src/app/shared/epma-platform/controls/FrameworkElement';
import { ClerkFormViewDeftBehaviour, ContextInfo, PatientContext } from 'src/app/lorappcommonbb/utilities/globalvariable';
import { DoseTypeCode, InfusionTypesCode, PrescriptionTypes, ValueDomain } from '../utilities/constants';
import { ActivityTypes } from '../model/common';
import { Resource } from '../resource';
import { DependencyPropertyChangedEventArgs, KeyEventArgs, MouseButtonEventArgs, TextChangedEventArgs, ToolTipService } from 'src/app/shared/epma-platform/controls/Control';
import { MultiSelectListVM } from '../viewmodel/MultiSelectListVM';
import { MedChartData } from "src/app/lorappmedicationcommonbb/utilities/globalvariable";
import * as ControlStyles from "../../shared/epma-platform/controls/ControlStyles";
import { CommonBB } from 'src/app/lorappcommonbb/utilities/common';
import { CConstants } from 'src/app/product/shared/models/constant';
import { CommonService } from 'src/app/product/shared/common.service';


var that;

@Component({
    selector: 'app-frmformviewForAdminPCAInfusions',
    templateUrl: './frmformviewForAdminPCAInfusions.html',
    styles: [
        ` 
        .clear-button ::ng-deep button{
            font-size:11px !important;
            font-weight:100;
        }
        .clear-button ::ng-deep button span img{
            height:17px;
            margin-bottom: -5px;
            margin-right: 4px;
        }
        .clear-button-margin{
            margin-top:-7px;
        }
        .clear-button-alignment{
            text-align:right;
        }

        .whitespace{
            white-space:nowrap;
	    width: 108px;
        }
        .brandClearRow{
            text-align: right;
        }
	    .SupInH
        {
           height:35px;
        }
	.leftAlignment {
            padding-left: 0.4rem;
        }
.SupplyInscroll
{
  overflow: auto; line-height: 1.5;
}
.SupplyVis
{
    display:none;
}

        `
    ]
})
export class frmformviewForAdminPCAInfusions extends UserControl {
    public bIsLoaded: boolean = false;
    objfrm: PrescriptionItemVM;
    private oMultiSelectListView: MultiSelectListView;
    sLowerDoseDefaultValue: string = String.Empty;
    sUpperDoseDefaultValue: string = String.Empty;

    private LayoutRoot: Grid;
    @ViewChild("LayoutRootTempRef", { read: Grid, static: false }) set _LayoutRoot(c: Grid) {
        if (c) { this.LayoutRoot = c; }
    };
    private lblNonCatName: iLabel;
    @ViewChild("lblNonCatNameTempRef", { read: iLabel, static: false }) set _lblNonCatName(c: iLabel) {
        if (c) { this.lblNonCatName = c; }
    };
    private txtNonCatItem: iTextBox;
    @ViewChild("txtNonCatItemTempRef", { read: iTextBox, static: false }) set _txtNonCatItem(c: iTextBox) {
        if (c) { this.txtNonCatItem = c; }
    };
    private lblNonCatReason: iLabel;
    @ViewChild("lblNonCatReasonTempRef", { read: iLabel, static: false }) set _lblNonCatReason(c: iLabel) {
        if (c) { this.lblNonCatReason = c; }
    };
    private cboNONCATReason: iComboBox;
    @ViewChild("cboNONCATReasonTempRef", { read: iComboBox, static: false }) set _cboNONCATReason(c: iComboBox) {
        if (c) { this.cboNONCATReason = c; }
    };
    private lblSrcOther: iLabel;
    @ViewChild("lblSrcOtherTempRef", { read: iLabel, static: false }) set _lblSrcOther(c: iLabel) {
        if (c) { this.lblSrcOther = c; }
    };
    private txtOtherNonCatReason: iTextBox;
    @ViewChild("txtOtherNonCatReasonTempRef", { read: iTextBox, static: false }) set _txtOtherNonCatReason(c: iTextBox) {
        if (c) { this.txtOtherNonCatReason = c; }
    };
    private lblRoute: iLabel;
    @ViewChild("lblRouteTempRef", { read: iLabel, static: false }) set _lblRoute(c: iLabel) {
        if (c) { this.lblRoute = c; }
    };
    private lblMultiRoute: iLabel;
    @ViewChild("lblMultiRouteTempRef", { read: iLabel, static: false }) set _lblMultiRoute(c: iLabel) {
        if (c) { this.lblMultiRoute = c; }
    };
    private Routelayout: Grid;
    @ViewChild("RoutelayoutTempRef", { read: Grid, static: false }) set _Routelayout(c: Grid) {
        if (c) { this.Routelayout = c; }
    };
    private cboRoute: iComboBox;
    @ViewChild("cboRouteTempRef", { read: iComboBox, static: false }) set _cboRoute(c: iComboBox) {
        if (c) { this.cboRoute = c; }
    };
    private MultiRoutelayout: Grid;
    @ViewChild("MultiRoutelayoutTempRef", { read: Grid, static: false }) set _MultiRoutelayout(c: Grid) {
        if (c) { this.MultiRoutelayout = c; }
    };
    private cboMultiRoute: iComboBox;
    @ViewChild("cboMultiRouteTempRef", { read: iComboBox, static: false }) set _cboMultiRoute(c: iComboBox) {
        if (c) { this.cboMultiRoute = c; }
    };
    private iMultiRoute: iMultiSelectDropdown;
    @ViewChild("iMultiRouteTempRef", { read: iMultiSelectDropdown, static: false }) set _iMultiRoute(c: iMultiSelectDropdown) {
        if (c) { this.iMultiRoute = c; 
    //Multiroute Dropdown open/close
            if(this.ParentRef.isMultiRouteOpenClose){
                this.ParentRef.isMultiRouteOpenClose = false;
                this.iMultiRoute.multiSelectComponent.toggle(true);
                this.iMultiRoute.isEmailDropDownOpen = true;
                this.iMultiRoute.Focus();
            }}
    };
    private chckIsMultiRoute: iCheckBox;
    @ViewChild("chckIsMultiRouteTempRef", { read: iCheckBox, static: false }) set _chckIsMultiRoute(c: iCheckBox) {
        if (c) { this.chckIsMultiRoute = c; }
    };
    private lblforMultiRoute: iLabel;
    @ViewChild("lblforMultiRouteTempRef", { read: iLabel, static: false }) set _lblforMultiRoute(c: iLabel) {
        if (c) { this.lblforMultiRoute = c; }
    };
    private SelectProductlayout: Grid;
    @ViewChild("SelectProductlayoutTempRef", { read: Grid, static: false }) set _SelectProductlayout(c: Grid) {
        if (c) { this.SelectProductlayout = c; }
    };
    private SelectProduct: iLabel;
    @ViewChild("SelectProductTempRef", { read: iLabel, static: false }) set _SelectProduct(c: iLabel) {
        if (c) { this.SelectProduct = c; }
    };
    private cmdClearProduct: iButton;
    @ViewChild("cmdClearProductTempRef", { read: iButton, static: false }) set _cmdClearProduct(c: iButton) {
        if (c) { this.cmdClearProduct = c; }
    };
    private lblInfusion: iLabel;
    @ViewChild("lblInfusionTempRef", { read: iLabel, static: false }) set _lblInfusion(c: iLabel) {
        if (c) { this.lblInfusion = c; }
    };
    private cboInfusion: iComboBox;
    @ViewChild("cboInfusionTempRef", { read: iComboBox, static: false }) set _cboInfusion(c: iComboBox) {
        if (c) { this.cboInfusion = c; }
    };
    private lblDeliveryDevice: iLabel;
    @ViewChild("lblDeliveryDeviceTempRef", { read: iLabel, static: false }) set _lblDeliveryDevice(c: iLabel) {
        if (c) { this.lblDeliveryDevice = c; }
    };
    private cboDeliveryDevice: iComboBox;
    @ViewChild("cboDeliveryDeviceTempRef", { read: iComboBox, static: false }) set _cboDeliveryDevice(c: iComboBox) {
        if (c) { this.cboDeliveryDevice = c; }
    };
    private lblBoosterDose: iLabel;
    @ViewChild("lblBoosterDoseTempRef", { read: iLabel, static: false }) set _lblBoosterDose(c: iLabel) {
        if (c) { this.lblBoosterDose = c; }
    };
    private BoosterDoseLayout: Grid;
    @ViewChild("BoosterDoseLayoutTempRef", { read: Grid, static: false }) set _BoosterDoseLayout(c: Grid) {
        if (c) { this.BoosterDoseLayout = c; }
    };
    private txtBoosterDose: iTextBox;
    @ViewChild("txtBoosterDoseTempRef", { read: iTextBox, static: false }) set _txtBoosterDose(c: iTextBox) {
        if (c) { this.txtBoosterDose = c; }
    };
    private lblBoosterUOM: iLabel;
    @ViewChild("lblBoosterUOMTempRef", { read: iLabel, static: false }) set _lblBoosterUOM(c: iLabel) {
        if (c) { this.lblBoosterUOM = c; }
    };
    private cboBoosterUOM: iComboBox;
    @ViewChild("cboBoosterUOMTempRef", { read: iComboBox, static: false }) set _cboBoosterUOM(c: iComboBox) {
        if (c) { this.cboBoosterUOM = c; }
    };
    private lblDoseType: iLabel;
    @ViewChild("lblDoseTypeTempRef", { read: iLabel, static: false }) set _lblDoseType(c: iLabel) {
        if (c) { this.lblDoseType = c; }
    };
    private cboDoseType: iComboBox;
    @ViewChild("cboDoseTypeTempRef", { read: iComboBox, static: false }) set _cboDoseType(c: iComboBox) {
        if (c) { this.cboDoseType = c; }
    };
    private lblDose: iLabel;
    @ViewChild("lblDoseTempRef", { read: iLabel, static: false }) set _lblDose(c: iLabel) {
        if (c) { this.lblDose = c; }
    };
    private DoseLayoutRoot: Grid;
    @ViewChild("DoseLayoutRootTempRef", { read: Grid, static: false }) set _DoseLayoutRoot(c: Grid) {
        if (c) { this.DoseLayoutRoot = c; }
    };
    private txtLowerDose: iTextBox;
    @ViewChild("txtLowerDoseTempRef", { read: iTextBox, static: false }) set _txtLowerDose(c: iTextBox) {
        if (c) { this.txtLowerDose = c; }
    };
    private lblHifen: iLabel;
    @ViewChild("lblHifenTempRef", { read: iLabel, static: false }) set _lblHifen(c: iLabel) {
        if (c) { this.lblHifen = c; }
    };
    private txtUpperDose: iTextBox;
    @ViewChild("txtUpperDoseTempRef", { read: iTextBox, static: false }) set _txtUpperDose(c: iTextBox) {
        if (c) { this.txtUpperDose = c; }
    };
    private lblUOM: iLabel;
    @ViewChild("lblUOMTempRef", { read: iLabel, static: false }) set _lblUOM(c: iLabel) {
        if (c) { this.lblUOM = c; }
    };
    private cboUOM: iComboBox;
    @ViewChild("cboUOMTempRef", { read: iComboBox, static: false }) set _cboUOM(c: iComboBox) {
        if (c) { this.cboUOM = c; }
    };
    private lblFluid: iLabel;
    @ViewChild("lblFluidTempRef", { read: iLabel, static: false }) set _lblFluid(c: iLabel) {
        if (c) { this.lblFluid = c; }
    };
    private FluidLayout: Grid;
    @ViewChild("FluidLayoutTempRef", { read: Grid, static: false }) set _FluidLayout(c: Grid) {
        if (c) { this.FluidLayout = c; }
    };
    private cboFluid: iComboBox;
    @ViewChild("cboFluidTempRef", { read: iComboBox, static: false }) set _cboFluid(c: iComboBox) {
        if (c) { this.cboFluid = c; }
    };
    private cmdfluid: iButton;
    @ViewChild("cmdfluidTempRef", { read: iButton, static: false }) set _cmdfluid(c: iButton) {
        if (c) { this.cmdfluid = c; }
    };
    private lblVolume: iLabel;
    @ViewChild("lblVolumeTempRef", { read: iLabel, static: false }) set _lblVolume(c: iLabel) {
        if (c) { this.lblVolume = c; }
    };
    private VolumeLayoutRoot: Grid;
    @ViewChild("VolumeLayoutRootTempRef", { read: Grid, static: false }) set _VolumeLayoutRoot(c: Grid) {
        if (c) { this.VolumeLayoutRoot = c; }
    };
    private txtVolume: iTextBox;
    @ViewChild("txtVolumeTempRef", { read: iTextBox, static: false }) set _txtVolume(c: iTextBox) {
        if (c) { this.txtVolume = c; }
    };
    private lblVolUOM: iLabel;
    @ViewChild("lblVolUOMTempRef", { read: iLabel, static: false }) set _lblVolUOM(c: iLabel) {
        if (c) { this.lblVolUOM = c; }
    };
    private cboVolumeUOM: iComboBox;
    @ViewChild("cboVolumeUOMTempRef", { read: iComboBox, static: false }) set _cboVolumeUOM(c: iComboBox) {
        if (c) { this.cboVolumeUOM = c; }
    };
    private lblInfConcentration: iLabel;
    @ViewChild("lblInfConcentrationTempRef", { read: iLabel, static: false }) set _lblInfConcentration(c: iLabel) {
        if (c) { this.lblInfConcentration = c; }
    };
    private InfConcentrationLayoutRoot: Grid;
    @ViewChild("InfConcentrationLayoutRootTempRef", { read: Grid, static: false }) set _InfConcentrationLayoutRoot(c: Grid) {
        if (c) { this.InfConcentrationLayoutRoot = c; }
    };
    private txtLowConcentration: iTextBox;
    @ViewChild("txtLowConcentrationTempRef", { read: iTextBox, static: false }) set _txtLowConcentration(c: iTextBox) {
        if (c) { this.txtLowConcentration = c; }
    };
    private cboLowConcentrationUOMlist: iComboBox;
    @ViewChild("cboLowConcentrationUOMlistTempRef", { read: iComboBox, static: false }) set _cboLowConcentrationUOMlist(c: iComboBox) {
        if (c) { this.cboLowConcentrationUOMlist = c; }
    };
    private lblSlash: iLabel;
    @ViewChild("lblSlashTempRef", { read: iLabel, static: false }) set _lblSlash(c: iLabel) {
        if (c) { this.lblSlash = c; }
    };
    private txtUpperConcentration: iTextBox;
    @ViewChild("txtUpperConcentrationTempRef", { read: iTextBox, static: false }) set _txtUpperConcentration(c: iTextBox) {
        if (c) { this.txtUpperConcentration = c; }
    };
    private cboUpperConcentrationUOMlist: iComboBox;
    @ViewChild("cboUpperConcentrationUOMlistTempRef", { read: iComboBox, static: false }) set _cboUpperConcentrationUOMlist(c: iComboBox) {
        if (c) { this.cboUpperConcentrationUOMlist = c; }
    };
    private lblInfusionPeriod: iLabel;
    @ViewChild("lblInfusionPeriodTempRef", { read: iLabel, static: false }) set _lblInfusionPeriod(c: iLabel) {
        if (c) { this.lblInfusionPeriod = c; }
    };
    private InfusionPeriodLayout: Grid;
    @ViewChild("InfusionPeriodLayoutTempRef", { read: Grid, static: false }) set _InfusionPeriodLayout(c: Grid) {
        if (c) { this.InfusionPeriodLayout = c; }
    };
    private txtInfusionperiod: iTextBox;
    @ViewChild("txtInfusionperiodTempRef", { read: iTextBox, static: false }) set _txtInfusionperiod(c: iTextBox) {
        if (c) { this.txtInfusionperiod = c; }
    };
    private lblinfustionPeriodUOM: iLabel;
    @ViewChild("lblinfustionPeriodUOMTempRef", { read: iLabel, static: false }) set _lblinfustionPeriodUOM(c: iLabel) {
        if (c) { this.lblinfustionPeriodUOM = c; }
    };
    private cboinfustionPeriodUOM: iComboBox;
    @ViewChild("cboinfustionPeriodUOMTempRef", { read: iComboBox, static: false }) set _cboinfustionPeriodUOM(c: iComboBox) {
        if (c) { this.cboinfustionPeriodUOM = c; }
    };
    private lblInfusionRate: iLabel;
    @ViewChild("lblInfusionRateTempRef", { read: iLabel, static: false }) set _lblInfusionRate(c: iLabel) {
        if (c) { this.lblInfusionRate = c; }
    };
    private InfusionRateLayout: Grid;
    @ViewChild("InfusionRateLayoutTempRef", { read: Grid, static: false }) set _InfusionRateLayout(c: Grid) {
        if (c) { this.InfusionRateLayout = c; }
    };
    private txtInfusionRate: iTextBox;
    @ViewChild("txtInfusionRateTempRef", { read: iTextBox, static: false }) set _txtInfusionRate(c: iTextBox) {
        if (c) { this.txtInfusionRate = c; }
    };
    private lblRateHifen: iLabel;
    @ViewChild("lblRateHifenTempRef", { read: iLabel, static: false }) set _lblRateHifen(c: iLabel) {
        if (c) { this.lblRateHifen = c; }
    };
    private txtUpperInfusionRate: iTextBox;
    @ViewChild("txtUpperInfusionRateTempRef", { read: iTextBox, static: false }) set _txtUpperInfusionRate(c: iTextBox) {
        if (c) { this.txtUpperInfusionRate = c; }
    };
    private lblInfusionUOM: iLabel;
    @ViewChild("lblInfusionUOMTempRef", { read: iLabel, static: false }) set _lblInfusionUOM(c: iLabel) {
        if (c) { this.lblInfusionUOM = c; }
    };
    private cboInfustionRateUOM: iComboBox;
    @ViewChild("cboInfustionRateUOMTempRef", { read: iComboBox, static: false }) set _cboInfustionRateUOM(c: iComboBox) {
        if (c) { this.cboInfustionRateUOM = c; }
    };
    private lblInfusionRateHifen: iLabel;
    @ViewChild("lblInfusionRateHifenTempRef", { read: iLabel, static: false }) set _lblInfusionRateHifen(c: iLabel) {
        if (c) { this.lblInfusionRateHifen = c; }
    };
    private cboInfusionRateUOM: iComboBox;
    @ViewChild("cboInfusionRateUOMTempRef", { read: iComboBox, static: false }) set _cboInfusionRateUOM(c: iComboBox) {
        if (c) { this.cboInfusionRateUOM = c; }
    };
    private lblBolus: iLabel;
    @ViewChild("lblBolusTempRef", { read: iLabel, static: false }) set _lblBolus(c: iLabel) {
        if (c) { this.lblBolus = c; }
    };
    private BolusLayout: Grid;
    @ViewChild("BolusLayoutTempRef", { read: Grid, static: false }) set _BolusLayout(c: Grid) {
        if (c) { this.BolusLayout = c; }
    };
    private txtBolus: iTextBox;
    @ViewChild("txtBolusTempRef", { read: iTextBox, static: false }) set _txtBolus(c: iTextBox) {
        if (c) { this.txtBolus = c; }
    };
    private lblBolusUOM: iLabel;
    @ViewChild("lblBolusUOMTempRef", { read: iLabel, static: false }) set _lblBolusUOM(c: iLabel) {
        if (c) { this.lblBolusUOM = c; }
    };
    private cboBolusUOM: iComboBox;
    @ViewChild("cboBolusUOMTempRef", { read: iComboBox, static: false }) set _cboBolusUOM(c: iComboBox) {
        if (c) { this.cboBolusUOM = c; }
    };
    private lblLockoutPeriod: iLabel;
    @ViewChild("lblLockoutPeriodTempRef", { read: iLabel, static: false }) set _lblLockoutPeriod(c: iLabel) {
        if (c) { this.lblLockoutPeriod = c; }
    };
    private LockoutPeriodLayout: Grid;
    @ViewChild("LockoutPeriodLayoutTempRef", { read: Grid, static: false }) set _LockoutPeriodLayout(c: Grid) {
        if (c) { this.LockoutPeriodLayout = c; }
    };
    private txtLockoutPeriod: iTextBox;
    @ViewChild("txtLockoutPeriodTempRef", { read: iTextBox, static: false }) set _txtLockoutPeriod(c: iTextBox) {
        if (c) { this.txtLockoutPeriod = c; }
    };
    private lblLockoutPeriodUOM: iLabel;
    @ViewChild("lblLockoutPeriodUOMTempRef", { read: iLabel, static: false }) set _lblLockoutPeriodUOM(c: iLabel) {
        if (c) { this.lblLockoutPeriodUOM = c; }
    };
    private cboLockoutPeriodUOM: iComboBox;
    @ViewChild("cboLockoutPeriodUOMTempRef", { read: iComboBox, static: false }) set _cboLockoutPeriodUOM(c: iComboBox) {
        if (c) { this.cboLockoutPeriodUOM = c; }
    };
    private lblMaximumdose: iLabel;
    @ViewChild("lblMaximumdoseTempRef", { read: iLabel, static: false }) set _lblMaximumdose(c: iLabel) {
        if (c) { this.lblMaximumdose = c; }
    };
    private txtMaxDose: iTextBox;
    @ViewChild("txtMaxDoseTempRef", { read: iTextBox, static: false }) set _txtMaxDose(c: iTextBox) {
        if (c) { this.txtMaxDose = c; }
    };
    private lblSite: iLabel;
    @ViewChild("lblSiteTempRef", { read: iLabel, static: false }) set _lblSite(c: iLabel) {
        if (c) { this.lblSite = c; }
    };
    private cboSite: iComboBox;
    @ViewChild("cboSiteTempRef", { read: iComboBox, static: false }) set _cboSite(c: iComboBox) {
        if (c) { this.cboSite = c; }
    };
    private lblLumen: iLabel;
    @ViewChild("lblLumenTempRef", { read: iLabel, static: false }) set _lblLumen(c: iLabel) {
        if (c) { this.lblLumen = c; }
    };
    private txtLumen: iTextBox;
    @ViewChild("txtLumenTempRef", { read: iTextBox, static: false }) set _txtLumen(c: iTextBox) {
        if (c) { this.txtLumen = c; }
    };
    private lblBrand: iLabel;
    @ViewChild("lblBrandTempRef", { read: iLabel, static: false }) set _lblBrand(c: iLabel) {
        if (c) { this.lblBrand = c; }
    };
    private BrandLayout: Grid;
    @ViewChild("BrandLayoutTempRef", { read: Grid, static: false }) set _BrandLayout(c: Grid) {
        if (c) { this.BrandLayout = c; }
    };
    private cmdBrand: iLabel;
    @ViewChild("cmdBrandTempRef", { read: iLabel, static: false }) set _cmdBrand(c: iLabel) {
        if (c) { this.cmdBrand = c; }
    };
    private cmdClear: iButton;
    @ViewChild("cmdClearTempRef", { read: iButton, static: false }) set _cmdClear(c: iButton) {
        if (c) { this.cmdClear = c; }
    };
    private lblStartDate: iLabel;
    @ViewChild("lblStartDateTempRef", { read: iLabel, static: false }) set _lblStartDate(c: iLabel) {
        if (c) { this.lblStartDate = c; }
    };
    private dtpStartDate: iDateTimePicker;
    @ViewChild("dtpStartDateTempRef", { read: iDateTimePicker, static: false }) set _dtpStartDate(c: iDateTimePicker) {
        if (c) { this.dtpStartDate = c; }
    };
    private iTimeStartDateTime: iTimeBox;
    @ViewChild("iTimeStartDateTimeTempRef", { read: iTimeBox, static: false }) set _iTimeStartDateTime(c: iTimeBox) {
        if (c) { this.iTimeStartDateTime = c; }
    };
    private lblReviewafter: iLabel;
    @ViewChild("lblReviewafterTempRef", { read: iLabel, static: false }) set _lblReviewafter(c: iLabel) {
        if (c) { this.lblReviewafter = c; }
    };
    private udReviewafter: iUpDownBox;
    @ViewChild("udReviewafterTempRef", { read: iUpDownBox, static: false }) set _udReviewafter(c: iUpDownBox) {
        if (c) { this.udReviewafter = c; }
    };
    private cboreviewAfterUOM: iComboBox;
    @ViewChild("cboreviewAfterUOMTempRef", { read: iComboBox, static: false }) set _cboreviewAfterUOM(c: iComboBox) {
        if (c) { this.cboreviewAfterUOM = c; }
    };
    private lblReviewAfterDate: iLabel;
    @ViewChild("lblReviewAfterDateTempRef", { read: iLabel, static: false }) set _lblReviewAfterDate(c: iLabel) {
        if (c) { this.lblReviewAfterDate = c; }
    };
    private cmdReviewDetails: iButton;
    @ViewChild("cmdReviewDetailsTempRef", { read: iButton, static: false }) set _cmdReviewDetails(c: iButton) {
        if (c) { this.cmdReviewDetails = c; }
    };
    private lblReviewComments: iLabel;
    @ViewChild("lblReviewCommentsTempRef", { read: iLabel, static: false }) set _lblReviewComments(c: iLabel) {
        if (c) { this.lblReviewComments = c; }
    };
    private txtReviewComments: iTextBox;
    @ViewChild("txtReviewCommentsTempRef", { read: iTextBox, static: false }) set _txtReviewComments(c: iTextBox) {
        if (c) { this.txtReviewComments = c; }
    };
    private lblDuration: iLabel;
    @ViewChild("lblDurationTempRef", { read: iLabel, static: false }) set _lblDuration(c: iLabel) {
        if (c) { this.lblDuration = c; }
    };
    private udDuration: iUpDownBox;
    @ViewChild("udDurationTempRef", { read: iUpDownBox, static: false }) set _udDuration(c: iUpDownBox) {
        if (c) { this.udDuration = c; }
    };
    private cboDuration: iComboBox;
    @ViewChild("cboDurationTempRef", { read: iComboBox, static: false }) set _cboDuration(c: iComboBox) {
        if (c) { this.cboDuration = c; }
    };
    private lblStopDate: iLabel;
    @ViewChild("lblStopDateTempRef", { read: iLabel, static: false }) set _lblStopDate(c: iLabel) {
        if (c) { this.lblStopDate = c; }
    };
    private dtpStopDate: iDateTimePicker;
    @ViewChild("dtpStopDateTempRef", { read: iDateTimePicker, static: false }) set _dtpStopDate(c: iDateTimePicker) {
        if (c) { this.dtpStopDate = c; }
    };
    private iTimeStopDateTime: iTimeBox;
    @ViewChild("iTimeStopDateTimeTempRef", { read: iTimeBox, static: false }) set _iTimeStopDateTime(c: iTimeBox) {
        if (c) { this.iTimeStopDateTime = c; }
    };
    private lblQuantity: iLabel;
    @ViewChild("lblQuantityTempRef", { read: iLabel, static: false }) set _lblQuantity(c: iLabel) {
        if (c) { this.lblQuantity = c; }
    };
    private txtQuantity: iTextBox;
    @ViewChild("txtQuantityTempRef", { read: iTextBox, static: false }) set _txtQuantity(c: iTextBox) {
        if (c) { this.txtQuantity = c; }
    };
    private cboQuantity: iComboBox;
    @ViewChild("cboQuantityTempRef", { read: iComboBox, static: false }) set _cboQuantity(c: iComboBox) {
        if (c) { this.cboQuantity = c; }
    };
    private lblIsOnAdmission: iLabel;
    @ViewChild("lblIsOnAdmissionTempRef", { read: iLabel, static: false }) set _lblIsOnAdmission(c: iLabel) {
        if (c) { this.lblIsOnAdmission = c; }
    };
    private chckIsOnAdmission: iCheckBox;
    @ViewChild("chckIsOnAdmissionTempRef", { read: iCheckBox, static: false }) set _chckIsOnAdmission(c: iCheckBox) {
        if (c) { this.chckIsOnAdmission = c; }
    };
    private lblStatType: iLabel;
    @ViewChild("lblStatTypeTempRef", { read: iLabel, static: false }) set _lblStatType(c: iLabel) {
        if (c) { this.lblStatType = c; }
    };
    private cboStatType: iComboBox;
    @ViewChild("cboStatTypeTempRef", { read: iComboBox, static: false }) set _cboStatType(c: iComboBox) {
        if (c) { this.cboStatType = c; }
    };
    private lblPrescribedby: iLabel;
    @ViewChild("lblPrescribedbyTempRef", { read: iLabel, static: false }) set _lblPrescribedby(c: iLabel) {
        if (c) { this.lblPrescribedby = c; }
    };
    private txtPrescribedby: iLabel;
    @ViewChild("txtPrescribedbyTempRef", { read: iLabel, static: false }) set _txtPrescribedby(c: iLabel) {
        if (c) { this.txtPrescribedby = c; }
    };
    private lblIsClinicallyVerified: iLabel;
    @ViewChild("lblIsClinicallyVerifiedTempRef", { read: iLabel, static: false }) set _lblIsClinicallyVerified(c: iLabel) {
        if (c) { this.lblIsClinicallyVerified = c; }
    };
    private chckClinicalVerify: iCheckBox;
    @ViewChild("chckClinicalVerifyTempRef", { read: iCheckBox, static: false }) set _chckClinicalVerify(c: iCheckBox) {
        if (c) { this.chckClinicalVerify = c; }
    };
    private lblVerificationComments: iLabel;
    @ViewChild("lblVerificationCommentsTempRef", { read: iLabel, static: false }) set _lblVerificationComments(c: iLabel) {
        if (c) { this.lblVerificationComments = c; }
    };
    private txtVerificationComments: iTextBox;
    @ViewChild("txtVerificationCommentsTempRef", { read: iTextBox, static: false }) set _txtVerificationComments(c: iTextBox) {
        if (c) { this.txtVerificationComments = c; }
    };
    private lblModClerkReason: iLabel;
    @ViewChild("lblModClerkReasonTempRef", { read: iLabel, static: false }) set _lblModClerkReason(c: iLabel) {
        if (c) { this.lblModClerkReason = c; }
    };
    private cboModClerkReason: iComboBox;
    @ViewChild("cboModClerkReasonTempRef", { read: iComboBox, static: false }) set _cboModClerkReason(c: iComboBox) {
        if (c) { this.cboModClerkReason = c; }
    };
    private lblRsnForMod: iLabel;
    @ViewChild("lblRsnForModTempRef", { read: iLabel, static: false }) set _lblRsnForMod(c: iLabel) {
        if (c) { this.lblRsnForMod = c; }
    };
    private cboRsnForMod: iComboBox;
    @ViewChild("cboRsnForModTempRef", { read: iComboBox, static: false }) set _cboRsnForMod(c: iComboBox) {
        if (c) { this.cboRsnForMod = c; }
    };
    private lblModComments: iLabel;
    @ViewChild("lblModCommentsTempRef", { read: iLabel, static: false }) set _lblModComments(c: iLabel) {
        if (c) { this.lblModComments = c; }
    };
    private txtModComments: iTextBox;
    @ViewChild("txtModCommentsTempRef", { read: iTextBox, static: false }) set _txtModComments(c: iTextBox) {
        if (c) { this.txtModComments = c; }
    };
    private lblAdmin: iLabel;
    @ViewChild("lblAdminTempRef", { read: iLabel, static: false }) set _lblAdmin(c: iLabel) {
        if (c) { this.lblAdmin = c; }
    };
    private txtAdminInstruction: iTextBox;
    @ViewChild("txtAdminInstructionTempRef", { read: iTextBox, static: false }) set _txtAdminInstruction(c: iTextBox) {
        if (c) { this.txtAdminInstruction = c; }
    };
    private lblPblmInd: iLabel;
    @ViewChild("lblPblmIndTempRef", { read: iLabel, static: false }) set _lblPblmInd(c: iLabel) {
        if (c) { this.lblPblmInd = c; }
    };
    private txtProblem: iTextBox;
    @ViewChild("txtProblemTempRef", { read: iTextBox, static: false }) set _txtProblem(c: iTextBox) {
        if (c) { this.txtProblem = c; }
    };
    private lblAddComments: iLabel;
    @ViewChild("lblAddCommentsTempRef", { read: iLabel, static: false }) set _lblAddComments(c: iLabel) {
        if (c) { this.lblAddComments = c; }
    };
    private txtAddComments: iTextBox;
    @ViewChild("txtAddCommentsTempRef", { read: iTextBox, static: false }) set _txtAddComments(c: iTextBox) {
        if (c) { this.txtAddComments = c; }
    };
    private lblMedicationClerk: iLabel;
    @ViewChild("lblMedicationClerkTempRef", { read: iLabel, static: false }) set _lblMedicationClerk(c: iLabel) {
        if (c) { this.lblMedicationClerk = c; }
    };
    private lblMedicationClerking: iLabel;
    @ViewChild("lblMedicationClerkingTempRef", { read: iLabel, static: false }) set _lblMedicationClerking(c: iLabel) {
        if (c) { this.lblMedicationClerking = c; }
    };
    private lblSupplyInst: iLabel;
    @ViewChild("lblSupplyInstTempRef", { read: iLabel, static: false }) set _lblSupplyInst(c: iLabel) {
        if (c) { this.lblSupplyInst = c; }
    };
    private lblSupplyInstText: iLabel;
    @ViewChild("lblSupplyInstTextTempRef", { read: iLabel, static: false }) set _lblSupplyInstText(c: iLabel) {
        if (c) { this.lblSupplyInstText = c; }
    };
    private lblSupplyInstValue: iLabel;
    @ViewChild("lblSupplyInstValueTempRef", { read: iLabel, static: false }) set _lblSupplyInstValue(c: iLabel) {
        if (c) { this.lblSupplyInstValue = c; }
    };
    private lblTreatToCon: iLabel;
    @ViewChild("lblTreatToConTempRef", { read: iLabel, static: false }) set _lblTreatToCon(c: iLabel) {
        if (c) { this.lblTreatToCon = c; }
    };
    private cboTreatToCon: iComboBox;
    @ViewChild("cboTreatToConTempRef", { read: iComboBox, static: false }) set _cboTreatToCon(c: iComboBox) {
        if (c) { this.cboTreatToCon = c; }
    };
    private lblisnewmeds: iLabel;
    @ViewChild("lblisnewmedsTempRef", { read: iLabel, static: false }) set _lblisnewmeds(c: iLabel) {
        if (c) { this.lblisnewmeds = c; }
    };
    private chcknewmeds: iCheckBox;
    @ViewChild("chcknewmedsTempRef", { read: iCheckBox, static: false }) set _chcknewmeds(c: iCheckBox) {
        if (c) { this.chcknewmeds = c; }
    };
    private brdAdditionalOptions: Border;
    @ViewChild("brdAdditionalOptionsTempRef", { read: Border, static: false }) set _brdAdditionalOptions(c: Border) {
        if (c) { this.brdAdditionalOptions = c; }
    };
    private lblRecordAdminBorder: TextBlock;
    @ViewChild("lblRecordAdminBorderTempRef", { read: TextBlock, static: false }) set _lblRecordAdminBorder(c: TextBlock) {
        if (c) { this.lblRecordAdminBorder = c; }
    };
    private lblInfAdminMessage: iLabel;
    @ViewChild("lblInfAdminMessageTempRef", { read: iLabel, static: false }) set _lblInfAdminMessage(c: iLabel) {
        if (c) { this.lblInfAdminMessage = c; }
    };
    private chkForAdminOption1: iCheckBox;
    @ViewChild("chkForAdminOption1TempRef", { read: iCheckBox, static: false }) set _chkForAdminOption1(c: iCheckBox) {
        if (c) { this.chkForAdminOption1 = c; }
    };


    
    public resKey = Resource.MedicationForm;
    public resKey1 = Resource.Infusion;
    ResourceStyles = ControlStyles;
    public FormLoadAFterviewinit : boolean = false;
    constructor() {
        //     InitializeComponent();
        super();
        this.bIsLoaded = false;
        //     dtpStartDate.IsConstrainEntry = true;
        //     dtpStopDate.SelectedDateTime = DateTime.MinValue;
    }

    public maxScrollContentHeight;
    ngAfterViewInit() {
        // if (window.screen.height < 1000 && window.devicePixelRatio != 1.25) {
        //     this.maxScrollContentHeight = window.innerHeight - 218;
        // }
        // else {
            this.maxScrollContentHeight = CommonService.setDynamicScrollviewerHeight();
            if (this.maxScrollContentHeight) {
                this.maxScrollContentHeight = this.maxScrollContentHeight - 33;
            }
        // }
        that = this;
        // this.bIsLoaded = false;
        this.dtpStartDate.IsConstrainEntry = true;
        this.dtpStopDate.SelectedDateTime = DateTime.MinValue;    
         if(!this.dtpStopDate.IsEnabled && !this.iTimeStopDateTime.IsEnabled)
         {
          //this.iTimeStopDateTime.ValueDate = null;
         this.iTimeStopDateTime.setZerotime();
         }
         

        if(this.FormLoadAFterviewinit){
            this.UserControl_Loaded(null, null);        
            this.objfrm = ObjectHelper.CreateType<PrescriptionItemVM>(this.DataContext, PrescriptionItemVM);
            this.objfrm.SubFormLoadedEvent.emit(true);    
        }
        else{
        this.objfrm = ObjectHelper.CreateType<PrescriptionItemVM>(this.DataContext, PrescriptionItemVM);       
        this.objfrm.FormviewerLoadedEvent.subscribe( data => {
            Object.keys(that).forEach((prop) => (this[prop] = that[prop]));
        this.UserControl_Loaded(null, null);
        this.FormLoadAFterviewinit = true
        this.objfrm = ObjectHelper.CreateType<PrescriptionItemVM>(this.DataContext, PrescriptionItemVM);
        this.objfrm.SubFormLoadedEvent.emit(true);
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
    override _DataContext;
    override get DataContext() {
        return this._DataContext;
    }
    @Input() override set DataContext(value: any) {
        this._DataContext = value;
    }

    private UserControl_Loaded(sender: Object, e: RoutedEventArgs): void {
        this.objfrm = ObjectHelper.CreateType<PrescriptionItemVM>(this.DataContext, PrescriptionItemVM);
        let selectedrouteClistitem: CListItem[] = null;
        let selectedInfusionRoute: CListItem[] = null;
        this.objfrm.FormViewerDetails.BasicDetails.bIsForAmendLaunchNewItem = false;
        if (PatientContext.PrescriptionType == PrescriptionTypes.ForAdministration) {
            if (this.objfrm.FormViewerDetails.BasicDetails.DefaultDetails.Routes != null) {
                selectedrouteClistitem = this.objfrm.FormViewerDetails.BasicDetails.DefaultDetails.Routes.Where(cl => cl.IsSelected == true).ToArray();
                selectedInfusionRoute = this.objfrm.FormViewerDetails.BasicDetails.DefaultDetails.Routes.Where(cl => cl.IsSelected == true && (cl.Tag != null && String.Compare(cl.Tag.ToString(), "1") == 0)).ToArray();
            }
            this.objfrm.FormViewerDetails.BasicDetails.OtherAdminiInstVisibility = Visibility.Visible;
        }
        if (PatientContext.PrescriptionType == PrescriptionTypes.ForAdministration && this.objfrm != null && this.objfrm.FormViewerDetails != null && this.objfrm.FormViewerDetails.BasicControls != null && this.objfrm.FormViewerDetails.BasicDetails.ManageReviewDetail != null && this.objfrm.FormViewerDetails.BasicDetails.ManageReviewDetail.oReviewAfterDetail != null && this.objfrm.FormViewerDetails.BasicDetails.ManageReviewDetail.oReviewAfterDetail.ReviewType != null && !String.IsNullOrEmpty(this.objfrm.FormViewerDetails.BasicDetails.ManageReviewDetail.oReviewAfterDetail.ReviewType.Code) && this.objfrm.FormViewerDetails.BasicDetails.ManageReviewDetail.oReviewAfterDetail.ReviewType.Code.Equals(CConstants.OmitReview)) {
            this.objfrm.FormViewerDetails.BasicDetails.ReviewAfterMandatory = true;
        }
        if (!this.objfrm.FormViewerDetails.BasicDetails.HasParentidset && this.objfrm.FormViewerDetails.BasicDetails != null && !String.IsNullOrEmpty(this.objfrm.FormViewerDetails.BasicDetails.IdentifyingType) && (String.Compare(this.objfrm.FormViewerDetails.BasicDetails.IdentifyingType, "CATALOGUEITEM", StringComparison.OrdinalIgnoreCase) == 0)) {
            this.objfrm.FormViewerDetails.BasicDetails.ParentIdentifyingOID = this.objfrm.FormViewerDetails.BasicDetails.IdentifyingOID;
            this.objfrm.FormViewerDetails.BasicDetails.ParentIdentifyingName = this.objfrm.FormViewerDetails.BasicDetails.IdentifyingName;
            this.objfrm.FormViewerDetails.BasicDetails.ParentIdentifyingType = this.objfrm.FormViewerDetails.BasicDetails.IdentifyingType;
            this.objfrm.FormViewerDetails.BasicDetails.HasParentidset = true;
        }
        if (String.Compare(this.objfrm.FormViewerDetails.BasicDetails.BrandName, "Select brand", StringComparison.InvariantCultureIgnoreCase) == 0) {
            this.objfrm.FormViewerDetails.BasicDetails.IsClearEnabled = false;
        }
        else {
            this.objfrm.FormViewerDetails.BasicDetails.IsClearEnabled = true;
        }
        if (String.Compare(PatientContext.PrescriptionType, PrescriptionTypes.Discharge) != 0)
            this.objfrm.FormViewerDetails.BasicDetails.IsVisiblenewmeds = Visibility.Collapsed;
        if (!this.bIsLoaded) {
            this.bIsLoaded = true;
            if (String.Equals(PatientContext.ClerkFormViewDefaultBehavior, ClerkFormViewDeftBehaviour.LaunchFormMandatory)) {
                this.objfrm.FormViewerDetails.BasicDetails.RangeStartDTTM = DateTime.MinValue;
            }
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
                this.objfrm.FormViewerDetails.BasicDetails.IsenableRSNFORMOD = true;
            }
            else if (this.objfrm.ActionCode == ActivityTypes.Reorder && ((this.objfrm.FormViewerDetails.BasicDetails.IsClearlstAmendList && this.objfrm.FormViewerDetails.BasicDetails.lstAmendedFlds != null && this.objfrm.FormViewerDetails.BasicDetails.lstAmendedFlds.Count > 0 && (this.objfrm.FormViewerDetails.BasicDetails.lstAmendedFlds.Contains("InfusionType") || this.objfrm.FormViewerDetails.BasicDetails.lstAmendedFlds.Contains("Route"))))) {
                this.objfrm.FormViewerDetails.BasicDetails.IsClearOnAdmissionAmended = true;
            }
            else {
                let bIsModificationReasonExists: boolean = this.objfrm.FormViewerDetails.BasicDetails.IsModificationReasonExists;
                this.objfrm.IsReasonForModificationVisible = Visibility.Collapsed;
                if (!this.objfrm.IsConflictFaxTabLoaded && !this.objfrm.IsTechValFauxTabLoaded) {
                    this.objfrm.FormViewerDetails.BasicDetails.IsMandatoryRSNFORMOD = false;
                }
                if (!this.objfrm.IsTechValFauxTabLoaded) {
                    this.objfrm.FormViewerDetails.BasicDetails.lstAmendedFlds.Clear();
                }
                this.objfrm.FormViewerDetails.BasicDetails.IsClearlstAmendedFlds = true;
                if (this.objfrm.FormViewerDetails.BasicDetails.IsCancelClick) {
                    this.objfrm.FormViewerDetails.BasicDetails.IsClearOnAdmissionAmended = false;
                    this.objfrm.FormViewerDetails.BasicDetails.IsCancelClick = false;
                }
                this.objfrm.FormViewerDetails.BasicDetails.IsValidateDose = true;
                this.objfrm.FormViewerDetails.BasicDetails.IsClearlstAmendList = true;
                this.objfrm.FormViewerDetails.BasicDetails.lstDRCAmendedFlds.Clear();
                if (bIsModificationReasonExists)
                    this.objfrm.FormViewerDetails.BasicDetails.IsModificationReasonExists = true;
            }
            this.objfrm.FormViewerDetails.BasicDetails.Infusions = true;
            if (this.objfrm.FormViewerDetails.BasicDetails.DoseType != null && String.Compare(this.objfrm.FormViewerDetails.BasicDetails.DoseType.Value, DoseTypeCode.NORMAL, StringComparison.OrdinalIgnoreCase) == 0) {
                this.objfrm.FormViewerDetails.BasicDetails.IsenableDoseType = false;
                this.objfrm.FormViewerDetails.BasicDetails.IsenableStopDate = false;
            }
            else {
                this.objfrm.FormViewerDetails.BasicDetails.DoseType = ObjectHelper.CreateObject(new CListItem(), {
                    Value: DoseTypeCode.NORMAL,
                    DisplayText: "Normal",
                    IsSelected: true
                });
                this.objfrm.FormViewerDetails.BasicDetails.IsenableDoseType = false;
            }
            if (this.objfrm.FormViewerDetails.BasicDetails.AccessContraintControls != null && this.objfrm.FormViewerDetails.BasicDetails.AccessContraintControls.Contains("cboSite"))
                this.objfrm.FormViewerDetails.BasicDetails.IsSiteEnabled = false;
            else if (selectedInfusionRoute != null && selectedInfusionRoute.Count() > 1 && selectedrouteClistitem != null && selectedrouteClistitem.Count() > 0 && (selectedInfusionRoute.Count() == selectedrouteClistitem.Count()) && PatientContext.PrescriptionType == PrescriptionTypes.ForAdministration) {
                this.objfrm.FormViewerDetails.BasicDetails.IsSiteEnabled = false;
            }
            else this.objfrm.FormViewerDetails.BasicDetails.IsSiteEnabled = true;
            if (!this.objfrm.IsClinicallyVerifyEnable && String.Compare(ContextInfo.MenuCode, CConstants.ClinicallyVerifyMenuCode, StringComparison.InvariantCultureIgnoreCase) != 0 && String.Compare(ContextInfo.MenuCode, CConstants.AuthoriseMenuCode, StringComparison.InvariantCultureIgnoreCase) != 0) {
                this.objfrm.FormViewerDetails.BasicDetails.IsVisibleClinicallyverify = Visibility.Collapsed;
            }
            if (this.objfrm != null && this.objfrm.FormViewerDetails != null && this.objfrm.FormViewerDetails.BasicDetails != null && this.objfrm.FormViewerDetails.BasicDetails.InfusionDetails != null) {
                if (String.Compare(PatientContext.PrescriptionType, PrescriptionTypes.ForAdministration) == 0)
                    this.objfrm.FormViewerDetails.BasicDetails.IsenableReviewAfter = true;
                else this.objfrm.FormViewerDetails.BasicDetails.IsenableReviewAfter = false;
            }
            if (!String.IsNullOrEmpty(PatientContext.PrescriptionType) && String.Compare(PatientContext.PrescriptionType, PrescriptionTypes.ForAdministration) == 0 && (this.objfrm.FormViewerDetails.BasicDetails.InfusionType != null && !String.IsNullOrEmpty(this.objfrm.FormViewerDetails.BasicDetails.InfusionType.Value) && (String.Compare(this.objfrm.FormViewerDetails.BasicDetails.InfusionType.Value, InfusionTypesCode.PCA) == 0) || this.objfrm.FormViewerDetails.BasicDetails.itemSubType != null && String.Compare(this.objfrm.FormViewerDetails.BasicDetails.itemSubType, CConstants.SUBTYPE_BLOOD) == 0)) {
                let dtStartDTTM: DateTime = this.objfrm.FormViewerDetails.BasicDetails.StartDTTM.DateTime.AddTime(this.objfrm.FormViewerDetails.BasicDetails.StartPrescriptionTime);
                let dtCurrent: DateTime = CommonBB.GetServerDateTime();
                if (String.Compare(ContextInfo.MenuCode, CConstants.ClinicallyVerifyMenuCode) != 0 && dtStartDTTM >= dtCurrent && (dtStartDTTM.AddMinutes(-MedChartData.DuenessThreshold) <= dtCurrent && dtCurrent <= dtStartDTTM.AddMinutes(MedChartData.DuenessThreshold))) {
                    this.objfrm.FormViewerDetails.BasicDetails.RecordAdminMsg1 = String.Format(Resource.MedicationForm.RecordAdminDueNowMessage, dtStartDTTM.ToUserDateTimeString("HH:mm"));
                    this.objfrm.FormViewerDetails.BasicDetails.RecordAdminMsg1_Tooltip = Resource.MedicationForm.RecordAdminDueNowMessage_Tooltip;
                    this.objfrm.FormViewerDetails.BasicDetails.InfusionDetails.ContinousAddOptions = Resource.Infusion.Additionaloptions_Msg;
                }
            }
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
            if ((String.Equals(PatientContext.PrescriptionType, PrescriptionTypes.Discharge, StringComparison.InvariantCultureIgnoreCase) || String.Equals(PatientContext.PrescriptionType, PrescriptionTypes.Leave, StringComparison.InvariantCultureIgnoreCase) || String.Equals(PatientContext.PrescriptionType, PrescriptionTypes.Outpatient, StringComparison.InvariantCultureIgnoreCase)) && (!String.IsNullOrEmpty(this.objfrm.FormViewerDetails.BasicDetails.Quantity) && Convert.ToDouble(this.objfrm.FormViewerDetails.BasicDetails.Quantity) == 0)) {
                this.objfrm.FormViewerDetails.BasicDetails.IsMandatorySupplyInstr = true;
            }
            else {
                this.objfrm.FormViewerDetails.BasicDetails.IsMandatorySupplyInstr = false;
            }
        }
        if ((String.Compare(PatientContext.PrescriptionType, PrescriptionTypes.Discharge, StringComparison.OrdinalIgnoreCase) != 0)) {
            this.objfrm.FormViewerDetails.BasicDetails.IsVisiblenewmeds = Visibility.Collapsed;
        }
        if (this.chckClinicalVerify.IsChecked == true) {
            if (this.objfrm != null) {
                this.objfrm.IsClinicallyVerifyCommentsMandatory = false;
               
            }
            else{
                if (String.Equals(ContextInfo.MenuCode, CConstants.ClinicallyVerifyMenuCode, StringComparison.InvariantCultureIgnoreCase) && this.objfrm != null && this.objfrm.PrescriptionItemStatus == CConstants.CLINICALLYVERIFIED){
                    this.objfrm.IsClinicallyVerifyCommentsMandatory = true;
                }
            }
        }
    }
    private UserControl_UnLoaded(sender: Object, e: RoutedEventArgs): void {

    }
    cmdBrand_MouseLeftButtonDown_Func = (s, e) => { 
        Object.keys(that).forEach((prop) => (this[prop] = that[prop]));
        this.cmdBrand_MouseLeftButtonDown(s, e); }
        
    private cmdBrand_MouseLeftButtonDown(sender: Object, e: MouseButtonEventArgs): void {
        this.objfrm.LaunchBrandConstraint();
    }
    private chckisnewmeds_OnChange(sender: Object, e: RoutedEventArgs): void {
        if (this.objfrm != null && this.objfrm.ParentbaseVM != null)
            this.objfrm.ParentbaseVM.isReconcileserreq = true;
        if (this.objfrm != null)
            this.objfrm.isnewmedschecked = true;
    }
 lblMedicationClerk_MouseLeftButtonUp(sender: Object, e: MouseButtonEventArgs): void {
     // implemented to invoke the multiselectListView 14-06
     if (this.objfrm != null && this.objfrm.FormViewerDetails.BasicDetails != null && this.objfrm.FormViewerDetails.BasicDetails.MedicationClerkingSource != null) {
        this.oMultiSelectListView = new MultiSelectListView();
        this.oMultiSelectListView.constructorImpl(ValueDomain.MedicationClerking, this.objfrm.FormViewerDetails.BasicDetails.MedicationClerkingSource.ToList());
        // ObjectHelper.stopFinishAndCancelEvent(true);
        AppActivity.OpenWindow("Medication clerking source - LORENZO", this.oMultiSelectListView, (s, e) => { this.oMultiSelectListView_Closed(s); }, "", false, 625, 450, false, WindowButtonType.OkCancel, null);
    }
        //  this.oMultiSelectListView = new MultiSelectListView(ValueDomain.MedicationClerking, this.objfrm.FormViewerDetails.BasicDetails.MedicationClerkingSource);
      //  AppActivity.OpenWindow("Medication clerking source - LORENZO", this.oMultiSelectListView, this.oMultiSelectListView_Closed, "", false, 480, 450, false, WindowButtonType.OkCancel, null);
    }
oMultiSelectListView_Closed(args: AppDialogEventargs): void {
        if (args.Content != null)
            this.oMultiSelectListView = ObjectHelper.CreateType<MultiSelectListView>(args.Content.Component, MultiSelectListView);
        if (args.Result == AppDialogResult.Ok  && args.Content != null && args.Content.Component != null) {
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

    SelectProduct_MouseLeftButtonDown_Func = (s, e) => { 
        Object.keys(that).forEach((prop) => (this[prop] = that[prop]));
        this.SelectProduct_MouseLeftButtonUp(s, e); }

    private SelectProduct_MouseLeftButtonUp(sender: Object, e: MouseButtonEventArgs): void {
        this.objfrm.LaunchSelProductMezzanie(this.objfrm.FormViewerDetails.BasicDetails.ParentIdentifyingOID,
            this.objfrm.FormViewerDetails.BasicDetails.ParentIdentifyingName,
            this.objfrm.FormViewerDetails.BasicDetails.ParentIdentifyingType);
    }
    private cboRsnForMod_IsEnabledChanged(sender: Object, e: DependencyPropertyChangedEventArgs): void {
        if (this.cboRsnForMod.IsEnabled) {
            if (this.objfrm.FormViewerDetails.BasicDetails.IsMandatoryRSNFORMOD == true) {
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
            else if (this.objfrm.FormViewerDetails.BasicDetails.IsenableRSNFORMOD) {
                if (String.Equals(ContextInfo.MenuCode, CConstants.AuthoriseMenuCode, StringComparison.InvariantCultureIgnoreCase))
                    this.objfrm.FormViewerDetails.BasicDetails.IsRsnForModAuthEnabled = true;
            }
        }
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
    private txtInfusionRate_TextChanged(sender: Object, e: TextChangedEventArgs): void {
        let LText: string = this.txtInfusionRate.Text;
        LText.Trim();
        if (LText.length > 0) {
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
        this.objfrm.FormViewerDetails.BasicDetails.SupplyInsVal = null;
        this.objfrm.FormViewerDetails.BasicDetails.SupplyInsText = null;
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
    private cboFluid_SelectionChanged(sender: Object, e: SelectionChangedEventArgs): void {

    }
}