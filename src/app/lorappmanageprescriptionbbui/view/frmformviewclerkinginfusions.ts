import { Component, OnInit, ViewChild } from '@angular/core';
import { Border, ContentControl, Grid, KeyEventArgs, MouseButtonEventArgs, ScrollViewer, ToolTipService, UserControl, iButton, iCheckBox, iComboBox, iDateTimePicker, iLabel, iRadioButton, iTextBox, iUpDownBox } from 'epma-platform/controls';
import { PrescriptionItemVM } from '../viewmodel/PrescriptionItemVM';
import { MultiSelectListView } from './MultiSelectListView';
import { RoutedEventArgs } from 'src/app/shared/epma-platform/controls/FrameworkElement';
import { ObjectHelper } from 'epma-platform/helper';
import DateTime from 'epma-platform/DateTime';
import { AppDialogEventargs, AppDialogResult, CListItem, SelectionChangedEventArgs, Visibility, WindowButtonType, StringComparison } from 'epma-platform/models';
import { ActivityTypes } from '../model/common';
import { CConstants, InfusionTypesCode, PrescriptionTypes, ValueDomain } from '../utilities/constants';
import { Convert, MessageBoxResult, MessageEventArgs } from 'epma-platform/services';
import { Resource } from '../resource';
import { MultiSelectListVM } from '../viewmodel/MultiSelectListVM';
import { DependencyPropertyChangedEventArgs, TextChangedEventArgs } from 'src/app/shared/epma-platform/controls/Control';
import { InfusionTypeCode } from 'src/app/lorappmedicationcommonbb/utilities/constants';
import * as ControlStyles from "../../shared/epma-platform/controls/ControlStyles";
import { ContextInfo, PatientContext } from "src/app/lorappcommonbb/utilities/globalvariable";
import { AppActivity } from 'epma-platform/services';
import { Busyindicator } from 'src/app/lorappcommonbb/busyindicator';
import { frmWeekdays } from './frmweekdays';
import { medipresolvestepped } from './medipresolvestepped';
import { CommonService } from 'src/app/product/shared/common.service';

var that;
@Component({
  selector: 'app-frmformviewclerkinginfusions',
  templateUrl: './frmformviewclerkinginfusions.html',
  styleUrls: ['./frmformviewclerkinginfusions.css']
})
export class frmformviewClerkinginfusions extends UserControl {
  bIsLoaded: boolean = false;
  objfrm: PrescriptionItemVM;
  sLowerDoseDefaultValue: string = String.Empty;
  sUpperDoseDefaultValue: string = String.Empty;
  private oMultiSelectListView: MultiSelectListView;
  ResourceStyles = ControlStyles;
  public resKey = Resource.MedicationForm;
  public resKey1 = Resource.Infusion;
  public Styles = ControlStyles;

    public svwFormViewer: ScrollViewer;
    Ref: this;
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
    public cboRoute: iComboBox;
    @ViewChild("cboRouteTempRef", { read: iComboBox, static: false }) set _cboRoute(c: iComboBox) {
        if (c) { this.cboRoute = c; }
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
    public lblSingleActionMedChart: iLabel;
    @ViewChild("lblSingleActionMedChartTempRef", { read: iLabel, static: false }) set _lblSingleActionMedChart(c: iLabel) {
        if (c) { this.lblSingleActionMedChart = c; }
    };
    public chckSingleActionMedChart: iCheckBox;
    @ViewChild("chckSingleActionMedChartTempRef", { read: iCheckBox, static: false }) set _chckSingleActionMedChart(c: iCheckBox) {
        if (c) { this.chckSingleActionMedChart = c; }
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
    public lblDose: iLabel;
    @ViewChild("lblDoseTempRef", { read: iLabel, static: false }) set _lblDose(c: iLabel) {
        if (c) { this.lblDose = c; }
    };
    public Dosecal: iButton;
    @ViewChild("DosecalTempRef", { read: iButton, static: false }) set _Dosecal(c: iButton) {
        if (c) { this.Dosecal = c; }
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
    public InfusionRatelblLayout: Grid;
    @ViewChild("InfusionRatelblLayoutTempRef", { read: Grid, static: false }) set _InfusionRatelblLayout(c: Grid) {
        if (c) { this.InfusionRatelblLayout = c; }
    };
    public lblInfusionRate: iLabel;
    @ViewChild("lblInfusionRateTempRef", { read: iLabel, static: false }) set _lblInfusionRate(c: iLabel) {
        if (c) { this.lblInfusionRate = c; }
    };
    public Infusioncal: iButton;
    @ViewChild("InfusioncalTempRef", { read: iButton, static: false }) set _Infusioncal(c: iButton) {
        if (c) { this.Infusioncal = c; }
    };
    public Dosecalinfrate: iButton;
    @ViewChild("DosecalinfrateTempRef", { read: iButton, static: false }) set _Dosecalinfrate(c: iButton) {
        if (c) { this.Dosecalinfrate = c; }
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
    public lblBolus: iLabel;
    @ViewChild("lblBolusTempRef", { read: iLabel, static: false }) set _lblBolus(c: iLabel) {
        if (c) { this.lblBolus = c; }
    };
    public BolusLayout: Grid;
    @ViewChild("BolusLayoutTempRef", { read: Grid, static: false }) set _BolusLayout(c: Grid) {
        if (c) { this.BolusLayout = c; }
    };
    public txtBolus: iTextBox;
    @ViewChild("txtBolusTempRef", { read: iTextBox, static: false }) set _txtBolus(c: iTextBox) {
        if (c) { this.txtBolus = c; }
    };
    public lblBolusUOM: iLabel;
    @ViewChild("lblBolusUOMTempRef", { read: iLabel, static: false }) set _lblBolusUOM(c: iLabel) {
        if (c) { this.lblBolusUOM = c; }
    };
    public cboBolusUOM: iComboBox;
    @ViewChild("cboBolusUOMTempRef", { read: iComboBox, static: false }) set _cboBolusUOM(c: iComboBox) {
        if (c) { this.cboBolusUOM = c; }
    };
    public lblLockoutPeriod: iLabel;
    @ViewChild("lblLockoutPeriodTempRef", { read: iLabel, static: false }) set _lblLockoutPeriod(c: iLabel) {
        if (c) { this.lblLockoutPeriod = c; }
    };
    public LockoutPeriodLayout: Grid;
    @ViewChild("LockoutPeriodLayoutTempRef", { read: Grid, static: false }) set _LockoutPeriodLayout(c: Grid) {
        if (c) { this.LockoutPeriodLayout = c; }
    };
    public txtLockoutPeriod: iTextBox;
    @ViewChild("txtLockoutPeriodTempRef", { read: iTextBox, static: false }) set _txtLockoutPeriod(c: iTextBox) {
        if (c) { this.txtLockoutPeriod = c; }
    };
    public lblLockoutPeriodUOM: iLabel;
    @ViewChild("lblLockoutPeriodUOMTempRef", { read: iLabel, static: false }) set _lblLockoutPeriodUOM(c: iLabel) {
        if (c) { this.lblLockoutPeriodUOM = c; }
    };
    public cboLockoutPeriodUOM: iComboBox;
    @ViewChild("cboLockoutPeriodUOMTempRef", { read: iComboBox, static: false }) set _cboLockoutPeriodUOM(c: iComboBox) {
        if (c) { this.cboLockoutPeriodUOM = c; }
    };
    public lblMaximumdose: iLabel;
    @ViewChild("lblMaximumdoseTempRef", { read: iLabel, static: false }) set _lblMaximumdose(c: iLabel) {
        if (c) { this.lblMaximumdose = c; }
    };
    public txtMaxDose: iTextBox;
    @ViewChild("txtMaxDoseTempRef", { read: iTextBox, static: false }) set _txtMaxDose(c: iTextBox) {
        if (c) { this.txtMaxDose = c; }
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
    public lblFrequency: iLabel;
    @ViewChild("lblFrequencyTempRef", { read: iLabel, static: false }) set _lblFrequency(c: iLabel) {
        if (c) { this.lblFrequency = c; }
    };
    public cboFrequency: iComboBox;
    @ViewChild("cboFrequencyTempRef", { read: iComboBox, static: false }) set _cboFrequency(c: iComboBox) {
        if (c) { this.cboFrequency = c; }
    };
    public lblIsPRN: iLabel;
    @ViewChild("lblIsPRNTempRef", { read: iLabel, static: false }) set _lblIsPRN(c: iLabel) {
        if (c) { this.lblIsPRN = c; }
    };
    public chckIsPRN: iCheckBox;
    @ViewChild("chckIsPRNTempRef", { read: iCheckBox, static: false }) set _chckIsPRN(c: iCheckBox) {
        if (c) { this.chckIsPRN = c; }
    };
    public cboPRNInstruction: iComboBox;
    @ViewChild("cboPRNInstructionTempRef", { read: iComboBox, static: false }) set _cboPRNInstruction(c: iComboBox) {
        if (c) { this.cboPRNInstruction = c; }
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
    public Weekdays: frmWeekdays;
    @ViewChild("WeekdaysTempRef", { read: frmWeekdays, static: false }) set _Weekdays(c: frmWeekdays) {
        if (c) { this.Weekdays = c; }
    };
    public lblPblmInd: iLabel;
    @ViewChild("lblPblmIndTempRef", { read: iLabel, static: false }) set _lblPblmInd(c: iLabel) {
        if (c) { this.lblPblmInd = c; }
    };
    public txtProblem: iTextBox;
    @ViewChild("txtProblemTempRef", { read: iTextBox, static: false }) set _txtProblem(c: iTextBox) {
        if (c) { this.txtProblem = c; }
    };
    public lblDateCommenced: iLabel;
    @ViewChild("lblDateCommencedTempRef", { read: iLabel, static: false }) set _lblDateCommenced(c: iLabel) {
        if (c) { this.lblDateCommenced = c; }
    };
    public optCompletedate: iRadioButton;
    @ViewChild("optCompletedateTempRef", { read: iRadioButton, static: false }) set _optCompletedate(c: iRadioButton) {
        if (c) { this.optCompletedate = c; }
    };
    public optPartialdate: iRadioButton;
    @ViewChild("optPartialdateTempRef", { read: iRadioButton, static: false }) set _optPartialdate(c: iRadioButton) {
        if (c) { this.optPartialdate = c; }
    };
    public lblIsClinicallyVerified: iLabel;
    @ViewChild("lblIsClinicallyVerifiedTempRef", { read: iLabel, static: false }) set _lblIsClinicallyVerified(c: iLabel) {
        if (c) { this.lblIsClinicallyVerified = c; }
    };
    public chckClinicalVerify: iCheckBox;
    @ViewChild("chckClinicalVerifyTempRef", { read: iCheckBox, static: false }) set _chckClinicalVerify(c: iCheckBox) {
        if (c) { this.chckClinicalVerify = c; }
    };
    public lblPrescribedby: iLabel;
    @ViewChild("lblPrescribedbyTempRef", { read: iLabel, static: false }) set _lblPrescribedby(c: iLabel) {
        if (c) { this.lblPrescribedby = c; }
    };
    public txtPrescribedby: iLabel;
    @ViewChild("txtPrescribedbyTempRef", { read: iLabel, static: false }) set _txtPrescribedby(c: iLabel) {
        if (c) { this.txtPrescribedby = c; }
    };
    public lblStartDate: iLabel;
    @ViewChild("lblStartDateTempRef", { read: iLabel, static: false }) set _lblStartDate(c: iLabel) {
        if (c) { this.lblStartDate = c; }
    };
    public dtpStartDate: iDateTimePicker;
    @ViewChild("dtpStartDateTempRef", { read: iDateTimePicker, static: false }) set _dtpStartDate(c: iDateTimePicker) {
        if (c) { this.dtpStartDate = c; }
    };
    public lblMonth: iLabel;
    @ViewChild("lblMonthTempRef", { read: iLabel, static: false }) set _lblMonth(c: iLabel) {
        if (c) { this.lblMonth = c; }
    };
    public cboMonth: iComboBox;
    @ViewChild("cboMonthTempRef", { read: iComboBox, static: false }) set _cboMonth(c: iComboBox) {
        if (c) { this.cboMonth = c; }
    };
    public udYear: iUpDownBox;
    @ViewChild("udYearTempRef", { read: iUpDownBox, static: false }) set _udYear(c: iUpDownBox) {
        if (c) { this.udYear = c; }
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
    public lblMedicationClerk: iLabel;
    @ViewChild("lblMedicationClerkTempRef", { read: iLabel, static: false }) set _lblMedicationClerk(c: iLabel) {
        if (c) { this.lblMedicationClerk = c; }
    };
    public lblMedicationClerking: iLabel;
    @ViewChild("lblMedicationClerkingTempRef", { read: iLabel, static: false }) set _lblMedicationClerking(c: iLabel) {
        if (c) { this.lblMedicationClerking = c; }
    };
    public lblModComments: iLabel;
    @ViewChild("lblModCommentsTempRef", { read: iLabel, static: false }) set _lblModComments(c: iLabel) {
        if (c) { this.lblModComments = c; }
    };
    public txtModComments: iTextBox;
    @ViewChild("txtModCommentsTempRef", { read: iTextBox, static: false }) set _txtModComments(c: iTextBox) {
        if (c) { this.txtModComments = c; }
    };
    public lblAddComments: iLabel;
    @ViewChild("lblAddCommentsTempRef", { read: iLabel, static: false }) set _lblAddComments(c: iLabel) {
        if (c) { this.lblAddComments = c; }
    };
    public txtAddComments: iTextBox;
    @ViewChild("txtAddCommentsTempRef", { read: iTextBox, static: false }) set _txtAddComments(c: iTextBox) {
        if (c) { this.txtAddComments = c; }
    };
    public lblVerificationComments: iLabel;
    @ViewChild("lblVerificationCommentsTempRef", { read: iLabel, static: false }) set _lblVerificationComments(c: iLabel) {
        if (c) { this.lblVerificationComments = c; }
    };
    public txtVerificationComments: iTextBox;
    @ViewChild("txtVerificationCommentsTempRef", { read: iTextBox, static: false }) set _txtVerificationComments(c: iTextBox) {
        if (c) { this.txtVerificationComments = c; }
    };
    public lblRsnForMod: iLabel;
    @ViewChild("lblRsnForModTempRef", { read: iLabel, static: false }) set _lblRsnForMod(c: iLabel) {
        if (c) { this.lblRsnForMod = c; }
    };
    public cboRsnForMod: iComboBox;
    @ViewChild("cboRsnForModTempRef", { read: iComboBox, static: false }) set _cboRsnForMod(c: iComboBox) {
        if (c) { this.cboRsnForMod = c; }
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

    public FormLoadAFterviewinit: boolean = false;

    constructor() {
        super();
        this.Ref = this;
        //     InitializeComponent();
        this.bIsLoaded = false;
        //     this.dtpStartDate.IsConstrainEntry = true;
    }
    public maxScrollContentHeight;
    ngAfterViewInit() {
        if (window.screen.height < 1000 && window.devicePixelRatio != 1.25) {
            this.maxScrollContentHeight = window.innerHeight - 206;
        }
        else {
            this.maxScrollContentHeight = CommonService.setDynamicScrollviewerHeight();
            if (this.maxScrollContentHeight) {
                this.maxScrollContentHeight = this.maxScrollContentHeight - 40;
            }
        }
        // this.bIsLoaded = false;
        that = this;
        this.dtpStartDate.IsConstrainEntry = true;

        if (this.FormLoadAFterviewinit) {
            this.UserControl_Loaded(null, null);
            this.objfrm = ObjectHelper.CreateType<PrescriptionItemVM>(this.DataContext, PrescriptionItemVM);
            this.objfrm.SubFormLoadedEvent.emit(true);
        }
        else {
            this.objfrm = ObjectHelper.CreateType<PrescriptionItemVM>(this.DataContext, PrescriptionItemVM);
            this.objfrm.FormviewerLoadedEvent.subscribe(data => {
                Object.keys(that).forEach((prop) => (this[prop] = that[prop]));
                this.UserControl_Loaded(null, null);
                this.FormLoadAFterviewinit = true
                this.objfrm = ObjectHelper.CreateType<PrescriptionItemVM>(this.DataContext, PrescriptionItemVM);
                this.objfrm.SubFormLoadedEvent.emit(true);
            });
        }
        this.objfrm.FormViewerDetails.BasicDetails.PrnInstructionLoaded.subscribe(data => {
            this.cboPRNInstruction.ClearValue();
        });
    }



  private UserControl_Loaded(sender: Object, e: RoutedEventArgs): void {
      this.objfrm = ObjectHelper.CreateType<PrescriptionItemVM>(this.DataContext, PrescriptionItemVM);
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
      if (!this.bIsLoaded) {
          this.objfrm.FormViewerDetails.BasicDetails.bIsForAmendLaunchNewItem = false;
          this.objfrm.FormViewerDetails.BasicDetails.RangeStartDTTM = DateTime.MinValue;
          let bIsModificationReasonExists: boolean = this.objfrm.FormViewerDetails.BasicDetails.IsModificationReasonExists;
          this.bIsLoaded = true;
          this.objfrm.FormViewerDetails.BasicDetails.IscontentAdminTimesVisible = Visibility.Collapsed;
          if ((String.Equals(PatientContext.PrescriptionType, PrescriptionTypes.Discharge, StringComparison.InvariantCultureIgnoreCase) || String.Equals(PatientContext.PrescriptionType, PrescriptionTypes.Leave, StringComparison.InvariantCultureIgnoreCase) || String.Equals(PatientContext.PrescriptionType, PrescriptionTypes.Outpatient, StringComparison.InvariantCultureIgnoreCase)) && (!String.IsNullOrEmpty(this.objfrm.FormViewerDetails.BasicDetails.Quantity) && Convert.ToDouble(this.objfrm.FormViewerDetails.BasicDetails.Quantity) == 0)) {
              this.objfrm.FormViewerDetails.BasicDetails.IsMandatorySupplyInstr = true;
          }
          else {
              this.objfrm.FormViewerDetails.BasicDetails.IsMandatorySupplyInstr = false;
          }
          if (this.objfrm.ActionCode == ActivityTypes.Amend && this.objfrm.IsReasonForModificationVisible == Visibility.Visible && (this.objfrm.formViewerDetails.BasicDetails.ReasonforModification != null && !String.IsNullOrEmpty(this.objfrm.formViewerDetails.BasicDetails.ReasonforModification.Value) && (!String.Equals(this.objfrm.FormViewerDetails.BasicDetails.ReasonforModification.DisplayText, "Select reason", StringComparison.InvariantCultureIgnoreCase)))) {
              this.objfrm.FormViewerDetails.BasicDetails.IsenableRSNFORMOD = false;
              this.objfrm.FormViewerDetails.BasicDetails.IsMandatoryRSNFORMOD = false;
              this.objfrm.FormViewerDetails.BasicDetails.IsClearlstAmendedFlds = true;
              this.objfrm.FormViewerDetails.BasicDetails.lstAmendedFlds.Clear();
              this.objfrm.FormViewerDetails.BasicDetails.lstDRCAmendedFlds.Clear();
              this.objfrm.FormViewerDetails.BasicDetails.IsClearlstAmendList = true;
          }
          else if (this.objfrm.ActionCode == ActivityTypes.Amend && (this.objfrm.FormViewerDetails.BasicDetails.IsMCenableRSNFORMOD || (this.objfrm.FormViewerDetails.BasicDetails.IsClearlstAmendedFlds && this.objfrm.FormViewerDetails.BasicDetails.lstAmendedFlds != null && this.objfrm.FormViewerDetails.BasicDetails.lstAmendedFlds.Count > 0 && (this.objfrm.FormViewerDetails.BasicDetails.lstAmendedFlds.Contains("InfusionType") || this.objfrm.FormViewerDetails.BasicDetails.lstAmendedFlds.Contains("Route"))))) {
              this.objfrm.IsReasonForModificationVisible = Visibility.Visible;
              this.objfrm.FormViewerDetails.BasicDetails.IsMandatoryRSNFORMOD = true;
          }
          else if (this.objfrm.ActionCode == ActivityTypes.Reorder && ((this.objfrm.FormViewerDetails.BasicDetails.IsClearlstAmendList && this.objfrm.FormViewerDetails.BasicDetails.lstAmendedFlds != null && this.objfrm.FormViewerDetails.BasicDetails.lstAmendedFlds.Count > 0 && (this.objfrm.FormViewerDetails.BasicDetails.lstAmendedFlds.Contains("InfusionType") || this.objfrm.FormViewerDetails.BasicDetails.lstAmendedFlds.Contains("Route"))))) {

          }
          else {
              this.objfrm.FormViewerDetails.BasicDetails.IsClearlstAmendedFlds = true;
              this.objfrm.IsReasonForModificationVisible = Visibility.Collapsed;
              if (!this.objfrm.IsConflictFaxTabLoaded && !this.objfrm.IsTechValFauxTabLoaded) {
                  this.objfrm.FormViewerDetails.BasicDetails.IsMandatoryRSNFORMOD = false;
              }
              if (!this.objfrm.IsTechValFauxTabLoaded) {
                  this.objfrm.FormViewerDetails.BasicDetails.lstAmendedFlds.Clear();
              }
              this.objfrm.FormViewerDetails.BasicDetails.IsClearlstAmendList = true;
              if (bIsModificationReasonExists)
                  this.objfrm.FormViewerDetails.BasicDetails.IsModificationReasonExists = true;
          }
          this.objfrm.FormViewerDetails.BasicDetails.IsValidateDose = true;
          this.objfrm.FormViewerDetails.BasicDetails.IsMandatoryFrequency = false;
          this.objfrm.FormViewerDetails.BasicDetails.Infusions = true;
          if (this.objfrm.FormViewerDetails.BasicDetails.AccessContraintControls != null && this.objfrm.FormViewerDetails.BasicDetails.AccessContraintControls.Contains("cboSite"))
              this.objfrm.FormViewerDetails.BasicDetails.IsSiteEnabled = false;
          else this.objfrm.FormViewerDetails.BasicDetails.IsSiteEnabled = true;
          if (String.Compare(this.objfrm.FormViewerDetails.BasicDetails.itemSubType, CConstants.SUBTYPE_BLOOD, StringComparison.OrdinalIgnoreCase) != 0) {
              if (this.objfrm.FormViewerDetails.BasicDetails.InfusionType != null && !String.IsNullOrEmpty(this.objfrm.FormViewerDetails.BasicDetails.InfusionType.Value) && (String.Compare(this.objfrm.FormViewerDetails.BasicDetails.InfusionType.Value, InfusionTypesCode.PCA, StringComparison.CurrentCultureIgnoreCase) != 0 && String.Compare(this.objfrm.FormViewerDetails.BasicDetails.InfusionType.Value, InfusionTypesCode.FLUID, StringComparison.CurrentCultureIgnoreCase) != 0)) {
                  if (this.objfrm.FormViewerDetails.BasicDetails.AccessContraintControls != null && this.objfrm.FormViewerDetails.BasicDetails.AccessContraintControls.Contains("cboDoseType"))
                      this.objfrm.FormViewerDetails.BasicDetails.IsenableDoseType = false;
                  else this.objfrm.FormViewerDetails.BasicDetails.IsenableDoseType = true;
              }
          }
          else if (String.Compare(this.objfrm.FormViewerDetails.BasicDetails.itemSubType, CConstants.SUBTYPE_BLOOD, StringComparison.OrdinalIgnoreCase) == 0) {
              this.objfrm.FormViewerDetails.BasicDetails.IsenableDoseType = false;
              this.objfrm.FormViewerDetails.BasicDetails.InfusionDetails.InfInfusionRateVisi = Visibility.Visible;
          }
          if (!this.objfrm.IsClinicallyVerifyEnable && String.Compare(ContextInfo.MenuCode, CConstants.ClinicallyVerifyMenuCode, StringComparison.InvariantCultureIgnoreCase) != 0 && String.Compare(ContextInfo.MenuCode, CConstants.AuthoriseMenuCode, StringComparison.InvariantCultureIgnoreCase) != 0) {
              this.objfrm.FormViewerDetails.BasicDetails.IsVisibleClinicallyverify = Visibility.Collapsed;
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
      }
      if (this.chckClinicalVerify.IsChecked == true) {
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
  private EnableClinicallyverifyCheckbox(): void {
      if (this.objfrm != null && (this.objfrm.ActionCode == ActivityTypes.Prescribe || this.objfrm.ActionCode == ActivityTypes.Reorder)) {
          this.chckClinicalVerify.IsEnabled = this.objfrm.IsClinicallyVerifyEnable = this.objfrm.FormViewerDetails.BasicDetails.IsEnableChkClinivallyVerify = true;
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
        if (!String.IsNullOrEmpty(this.objfrm.FormViewerDetails.BasicDetails.OtherComments)) {
          for (let i: number = 0; i < this.objfrm.FormViewerDetails.BasicDetails.MedicationClerkingSource.Count; i++) {
              if (this.objfrm.FormViewerDetails.BasicDetails.MedicationClerkingSource[i].DisplayText == "Other") {
                  if (this.objfrm.FormViewerDetails.BasicDetails.MedicationClerkingSource[i].Tag != null) {
                      if (this.objfrm.FormViewerDetails.BasicDetails.MedicationClerkingSource[i].Tag.ToString() == this.objfrm.FormViewerDetails.BasicDetails.OtherComments) {
                          this.objfrm.FormViewerDetails.BasicDetails.MedicationClerkingSource[i].Tag = this.objfrm.FormViewerDetails.BasicDetails.OtherComments;
                      }
                      else if (this.objfrm.FormViewerDetails.BasicDetails.MedicationClerkingSource[i].Tag.ToString() != this.objfrm.FormViewerDetails.BasicDetails.OtherComments) {
                          this.objfrm.FormViewerDetails.BasicDetails.MedicationClerkingSource[i].Tag = this.objfrm.FormViewerDetails.BasicDetails.MedicationClerkingSource[i].Tag;
                      }
                  }
              }
          }
      }
        if (this.objfrm != null && this.objfrm.FormViewerDetails.BasicDetails != null && this.objfrm.FormViewerDetails.BasicDetails.MedicationClerkingSource != null) {
            this.oMultiSelectListView = new MultiSelectListView();
            this.oMultiSelectListView.constructorImpl(ValueDomain.MedicationClerking, this.objfrm.FormViewerDetails.BasicDetails.MedicationClerkingSource.ToList());
           // AppActivity.OpenWindow("Medication clerking source - LORENZO", this.oMultiSelectListView, this.oMultiSelectListView_Closed, "", false, 625, 450, false, WindowButtonType.OkCancel, null);
        //    ObjectHelper.stopFinishAndCancelEvent(true);
            AppActivity.OpenWindow("Medication clerking source - LORENZO", this.oMultiSelectListView, (s,e) => {this.oMultiSelectListView_Closed(s);},"", false, 625, 450, false, WindowButtonType.OkCancel, null);
        }
        //this.oMultiSelectListView = new MultiSelectListView(ValueDomain.MedicationClerking, this.objfrm.FormViewerDetails.BasicDetails.MedicationClerkingSource);
        //AppActivity.OpenWindow("Medication clerking source - LORENZO", this.oMultiSelectListView, this.oMultiSelectListView_Closed, "", false, 625, 450, false, WindowButtonType.OkCancel, null);
    }
    oMultiSelectListView_Closed(args: AppDialogEventargs): void {
        if (args.Content != null)
            this.oMultiSelectListView = ObjectHelper.CreateType<MultiSelectListView>(args.Content.Component, MultiSelectListView);
        if (args.Result == AppDialogResult.Ok && args.Content != null && args.Content.Component != null) {
            // && args.Content != null && args.Content.Component != null
            if (this.oMultiSelectListView.okButtonClick()) {// commented to check ok click 12-06
                if (this.oMultiSelectListView instanceof MultiSelectListView) {
                    let oMultiSelectVM: MultiSelectListVM = ObjectHelper.CreateType<MultiSelectListVM>(this.oMultiSelectListView.DataContext, MultiSelectListVM);
                    if (oMultiSelectVM instanceof MultiSelectListVM) {
                        // added 216 code for initialisation as objfrm coming as undefined
                    this.objfrm.FormViewerDetails.BasicDetails.MedicationClerkingSource = oMultiSelectVM.ValueDomainCollection;
                    }
                }
            }
        }
        else {
            this.oMultiSelectListView.CancelButtonClick();
    
        }
      
       
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
    chckClinicalVerify_OnChange_Func=(s,e)=>{Object.keys(that).forEach((prop) => (this[prop] = that[prop]));this.chckClinicalVerify_OnChange(s,e)};
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
        this.objfrm.FormViewerDetails.BasicDetails.SupplyInsText = null;
        this.objfrm.FormViewerDetails.BasicDetails.SupplyInsVal = null;
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
        this.txtLowerDose_SelectionChanged(s, e);
    }
    private txtLowerDose_SelectionChanged(sender: Object, e: RoutedEventArgs): void {
        if (this.objfrm != null && this.objfrm.FormViewerDetails != null && this.objfrm.FormViewerDetails.BasicDetails != null && this.objfrm.FormViewerDetails.BasicDetails.bDoseFromCal)
            this.objfrm.FormViewerDetails.BasicDetails.bDoseChange = true;
    }
    SelectProduct_MouseLeftButtonDown_Func = (s, e) => {
        Object.keys(that).forEach((prop) => (this[prop] = that[prop]));
        this.SelectProduct_MouseLeftButtonUp(s, e);
    }

    private SelectProduct_MouseLeftButtonUp(sender: Object, e: MouseButtonEventArgs): void {
        this.objfrm.LaunchSelProductMezzanie(this.objfrm.FormViewerDetails.BasicDetails.ParentIdentifyingOID,
            this.objfrm.FormViewerDetails.BasicDetails.ParentIdentifyingName,
            this.objfrm.FormViewerDetails.BasicDetails.ParentIdentifyingType);
    }
    cboInfusion_SelectionChanged_Func = (s, e) => {
        this.cboInfusion_SelectionChanged(s, e);
    }
    private cboInfusion_SelectionChanged(sender: Object, e: SelectionChangedEventArgs): void {
        if (e != null && e.AddedItems != null && e.AddedItems.Count > 1) {
            let oInfusionType: CListItem = ObjectHelper.CreateType<CListItem>(e.AddedItems[0], CListItem);
            if (oInfusionType != null && String.Compare(oInfusionType.Value, InfusionTypeCode.PCA) == 0) {
                this.objfrm.FormViewerDetails.BasicDetails.InfusionDetails.InfInfusionRateVisi = Visibility.Collapsed;
            }
        }
    }
}
