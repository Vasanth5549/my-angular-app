import { Component, OnInit, ViewChild } from '@angular/core';
import { StringBuilder, ProfileFactoryType, ContextManager, Convert, AppActivity, Regex, ScriptObject } from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp, Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison, AppDialogEventargs, AppDialogResult, DelegateArgs, DialogComponentArgs, WindowButtonType, Visibility, ObservableCollection, CListItem, PatientContext, IEnumerable, List, HtmlPage, AppContextInfo, SelectionChangedEventArgs } from 'epma-platform/models';
import { AppDialog, Binding, BindingMode, Border, Control, Grid, KeyEventArgs, MouseButtonEventArgs, StackPanel, TextBlock, ToolTipService, UserControl, iButton, iCheckBox, iComboBox, iDateTimePicker, iLabel, iTextBox, iTimeBox } from 'epma-platform/controls';
import { HelperService } from 'epma-platform/soapclient';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
import { PrescriptionItemVM } from '../viewmodel/PrescriptionItemVM';
import { SelectedUserType, WitnessHelper } from 'src/app/lorappmedicationcommonbb/utilities/witnesshelper';
import { iSFS } from 'src/app/shared/epma-platform/controls/epma-isfs/epma-isfs.component';
import { RoutedEventArgs, RoutedPropertyChangedEventArgs } from 'src/app/shared/epma-platform/controls/Control';
import { CConstants, DoseTypeCode, InfusionTypesCode } from '../utilities/constants';
import { CommonBB } from 'src/app/lorappcommonbb/utilities/common';
import { Common } from '../utilities/common';
import { Resource } from '../resource';
import { MedicationForm } from '../resource/medicationform.designer';
import { Infusion } from '../resource/infusion.designer';
import { RecordAdminVM } from '../viewmodel/RecordAdminVM';
import { SLSFSItem } from 'src/app/shared/epma-platform/models/model';
import { ProfileData } from '../utilities/profiledata';
import { AuthResult } from 'src/app/lorappmedicationcommonbb/viewmodel/UserAuthenticateVM';
import * as ControlStyles from "../../shared/epma-platform/controls/ControlStyles";
import { CommonService } from 'src/app/product/shared/common.service';
var that;

@Component({
    selector: 'medrecordadmin',
    templateUrl: './medrecordadmin.html',
    styleUrls: ['./medrecordadmin.css'],
})

export class medrecordadmin extends UserControl {
    objVM: PrescriptionItemVM;
    oParam: string = String.Empty;
    objWitnessHelper: WitnessHelper;
    public bIsAdminByUserSelected: boolean = false;

    public BorderFrame: {
        'border-radius': '6px';
        padding: '4px';        
        width: '370px';
        'border-width': '1px';
        height: '500px';
    };

    public nstyle : {
        float : 'none'
        'margin-top': '6px';
    }
    public FlowrateLayout : Visibility = Visibility.Collapsed;
    public LayoutInfusionRate : Visibility = Visibility.Collapsed;
    public LayoutConcentrationVisible : Visibility = Visibility.Collapsed;
    public bgdInfPeriod1 : Visibility = Visibility.Collapsed;
    public brdInfPeriod1 : Visibility = Visibility.Collapsed;

    //#region  viewchild
    private brdAdminDetails: Border;
    @ViewChild("brdAdminDetailsTempRef", { read: Border, static: false }) set _brdAdminDetails(c: Border) {
        if (c) { this.brdAdminDetails = c; }
    };
    private lblAdminDetails: TextBlock;
    @ViewChild("lblAdminDetailsTempRef", { read: TextBlock, static: false }) set _lblAdminDetails(c: TextBlock) {
        if (c) { this.lblAdminDetails = c; }
    };
    private LayoutRoot: Grid;
    @ViewChild("LayoutRootTempRef", { read: Grid, static: false }) set _LayoutRoot(c: Grid) {
        if (c) { this.LayoutRoot = c; }
    };
    private bgddose: Border;
    @ViewChild("bgddoseTempRef", { read: Border, static: false }) set _bgddose(c: Border) {
        if (c) { this.bgddose = c; }
    };
    private bgdroute: Border;
    @ViewChild("bgdrouteTempRef", { read: Border, static: false }) set _bgdroute(c: Border) {
        if (c) { this.bgdroute = c; }
    };
    private bgdinfurate: Border;
    @ViewChild("bgdinfurateTempRef", { read: Border, static: false }) set _bgdinfurate(c: Border) {
        if (c) { this.bgdinfurate = c; }
    };
    private bgddriprate: Border;
    @ViewChild("bgddriprateTempRef", { read: Border, static: false }) set _bgddriprate(c: Border) {
        if (c) { this.bgddriprate = c; }
    };
    private bgdbagvol: Border;
    @ViewChild("bgdbagvolTempRef", { read: Border, static: false }) set _bgdbagvol(c: Border) {
        if (c) { this.bgdbagvol = c; }
    };
    private bgdsite: Border;
    @ViewChild("bgdsiteTempRef", { read: Border, static: false }) set _bgdsite(c: Border) {
        if (c) { this.bgdsite = c; }
    };
    private bgdlumen: Border;
    @ViewChild("bgdlumenTempRef", { read: Border, static: false }) set _bgdlumen(c: Border) {
        if (c) { this.bgdlumen = c; }
    };
    private bgddeldevice: Border;
    @ViewChild("bgddeldeviceTempRef", { read: Border, static: false }) set _bgddeldevice(c: Border) {
        if (c) { this.bgddeldevice = c; }
    };
    private bgdHumidification: Border;
    @ViewChild("bgdHumidificationTempRef", { read: Border, static: false }) set _bgdHumidification(c: Border) {
        if (c) { this.bgdHumidification = c; }
    };
    private bgdbatchno: Border;
    @ViewChild("bgdbatchnoTempRef", { read: Border, static: false }) set _bgdbatchno(c: Border) {
        if (c) { this.bgdbatchno = c; }
    };
    private bgdexpdate: Border;
    @ViewChild("bgdexpdateTempRef", { read: Border, static: false }) set _bgdexpdate(c: Border) {
        if (c) { this.bgdexpdate = c; }
    };
    private bgd: Border;
    @ViewChild("bgdTempRef", { read: Border, static: false }) set _bgd(c: Border) {
        if (c) { this.bgd = c; }
    };
    private bgdConcentration: Border;
    @ViewChild("bgdConcentrationTempRef", { read: Border, static: false }) set _bgdConcentration(c: Border) {
        if (c) { this.bgdConcentration = c; }
    };
    private bgdInfPeriod: Border;
    @ViewChild("bgdInfPeriodTempRef", { read: Border, static: false }) set _bgdInfPeriod(c: Border) {
        if (c) { this.bgdInfPeriod = c; }
    };
    private bgdInfDoseRate: Border;
    @ViewChild("bgdInfDoseRateTempRef", { read: Border, static: false }) set _bgdInfDoseRate(c: Border) {
        if (c) { this.bgdInfDoseRate = c; }
    };
    private brdroute: Border;
    @ViewChild("brdrouteTempRef", { read: Border, static: false }) set _brdroute(c: Border) {
        if (c) { this.brdroute = c; }
    };
    private brdinfurate: Border;
    @ViewChild("brdinfurateTempRef", { read: Border, static: false }) set _brdinfurate(c: Border) {
        if (c) { this.brdinfurate = c; }
    };
    private brddriprate: Border;
    @ViewChild("brddriprateTempRef", { read: Border, static: false }) set _brddriprate(c: Border) {
        if (c) { this.brddriprate = c; }
    };
    private brdbagvol: Border;
    @ViewChild("brdbagvolTempRef", { read: Border, static: false }) set _brdbagvol(c: Border) {
        if (c) { this.brdbagvol = c; }
    };
    private brdsite: Border;
    @ViewChild("brdsiteTempRef", { read: Border, static: false }) set _brdsite(c: Border) {
        if (c) { this.brdsite = c; }
    };
    private brdlumen: Border;
    @ViewChild("brdlumenTempRef", { read: Border, static: false }) set _brdlumen(c: Border) {
        if (c) { this.brdlumen = c; }
    };
    private brddeldevice: Border;
    @ViewChild("brddeldeviceTempRef", { read: Border, static: false }) set _brddeldevice(c: Border) {
        if (c) { this.brddeldevice = c; }
    };
    private brdHumidification: Border;
    @ViewChild("brdHumidificationTempRef", { read: Border, static: false }) set _brdHumidification(c: Border) {
        if (c) { this.brdHumidification = c; }
    };
    private brdbatchno: Border;
    @ViewChild("brdbatchnoTempRef", { read: Border, static: false }) set _brdbatchno(c: Border) {
        if (c) { this.brdbatchno = c; }
    };
    private brdexpdate: Border;
    @ViewChild("brdexpdateTempRef", { read: Border, static: false }) set _brdexpdate(c: Border) {
        if (c) { this.brdexpdate = c; }
    };
    private brd: Border;
    @ViewChild("brdTempRef", { read: Border, static: false }) set _brd(c: Border) {
        if (c) { this.brd = c; }
    };
    private brdConcentration: Border;
    @ViewChild("brdConcentrationTempRef", { read: Border, static: false }) set _brdConcentration(c: Border) {
        if (c) { this.brdConcentration = c; }
    };
    private brdInfPeriod: Border;
    @ViewChild("brdInfPeriodTempRef", { read: Border, static: false }) set _brdInfPeriod(c: Border) {
        if (c) { this.brdInfPeriod = c; }
    };
    private brdInfDoseRate: Border;
    @ViewChild("brdInfDoseRateTempRef", { read: Border, static: false }) set _brdInfDoseRate(c: Border) {
        if (c) { this.brdInfDoseRate = c; }
    };
    private lblDose: iLabel;
    @ViewChild("lblDoseTempRef", { read: iLabel, static: false }) set _lblDose(c: iLabel) {
        if (c) { this.lblDose = c; }
    };
    private txtDoseValue: iTextBox;
    @ViewChild("txtDoseValueTempRef", { read: iTextBox, static: false }) set _txtDoseValue(c: iTextBox) {
        if (c) { this.txtDoseValue = c; }
    };
    private lblDoseUoM: iLabel;
    @ViewChild("lblDoseUoMTempRef", { read: iLabel, static: false }) set _lblDoseUoM(c: iLabel) {
        if (c) { this.lblDoseUoM = c; }
    };
    private cboDoseUoMValue: iComboBox;
    @ViewChild("cboDoseUoMValueTempRef", { read: iComboBox, static: false }) set _cboDoseUoMValue(c: iComboBox) {
        if (c) { this.cboDoseUoMValue = c; }
    };
    private lblDoseUOMValue: iLabel;
    @ViewChild("lblDoseUOMValueTempRef", { read: iLabel, static: false }) set _lblDoseUOMValue(c: iLabel) {
        if (c) { this.lblDoseUOMValue = c; }
    };
    private lblRoute: iLabel;
    @ViewChild("lblRouteTempRef", { read: iLabel, static: false }) set _lblRoute(c: iLabel) {
        if (c) { this.lblRoute = c; }
    };
    private cboRoute: iComboBox;
    @ViewChild("cboRouteTempRef", { read: iComboBox, static: false }) set _cboRoute(c: iComboBox) {
        if (c) { this.cboRoute = c; }
    };
    private lblConcentration: iLabel;
    @ViewChild("lblConcentrationTempRef", { read: iLabel, static: false }) set _lblConcentration(c: iLabel) {
        if (c) { this.lblConcentration = c; }
    };
    // private spConcentration: StackPanel;
    // @ViewChild("spConcentrationTempRef", { read: StackPanel, static: false }) set _spConcentration(c: StackPanel) {
    //     if (c) { this.spConcentration = c; }
    // };
    private LayoutConcentration: Grid;
    @ViewChild("LayoutConcentrationTempRef", { read: Grid, static: false }) set _LayoutConcentration(c: Grid) {
        if (c) { this.LayoutConcentration = c; }
    };
    
    private txtConStrengthValue: iTextBox;
    @ViewChild("txtConStrengthValueTempRef", { read: iTextBox, static: false }) set _txtConStrengthValue(c: iTextBox) {
        if (c) { this.txtConStrengthValue = c; }
    };
    private cboConStrengthUoMValue: iComboBox;
    @ViewChild("cboConStrengthUoMValueTempRef", { read: iComboBox, static: false }) set _cboConStrengthUoMValue(c: iComboBox) {
        if (c) { this.cboConStrengthUoMValue = c; }
    };
    private lblConPer: iLabel;
    @ViewChild("lblConPerTempRef", { read: iLabel, static: false }) set _lblConPer(c: iLabel) {
        if (c) { this.lblConPer = c; }
    };
    private txtConVolumeValue: iTextBox;
    @ViewChild("txtConVolumeValueTempRef", { read: iTextBox, static: false }) set _txtConVolumeValue(c: iTextBox) {
        if (c) { this.txtConVolumeValue = c; }
    };
    private cboConVolumeUoMValue: iComboBox;
    @ViewChild("cboConVolumeUoMValueTempRef", { read: iComboBox, static: false }) set _cboConVolumeUoMValue(c: iComboBox) {
        if (c) { this.cboConVolumeUoMValue = c; }
    };
    private lblInfusionperiod: iLabel;
    @ViewChild("lblInfusionperiodTempRef", { read: iLabel, static: false }) set _lblInfusionperiod(c: iLabel) {
        if (c) { this.lblInfusionperiod = c; }
    };
    private spInfPeriod: StackPanel;
    @ViewChild("spInfPeriodTempRef", { read: StackPanel, static: false }) set _spInfPeriod(c: StackPanel) {
        if (c) { this.spInfPeriod = c; }
    };
    private Infusionperiodtext: iTextBox;
    @ViewChild("InfusionperiodtextTempRef", { read: iTextBox, static: false }) set _Infusionperiodtext(c: iTextBox) {
        if (c) { this.Infusionperiodtext = c; }
    };
    private lblInfperioduom: iLabel;
    @ViewChild("lblInfperioduomTempRef", { read: iLabel, static: false }) set _lblInfperioduom(c: iLabel) {
        if (c) { this.lblInfperioduom = c; }
    };
    private cboInfusionperiodUoMValue: iComboBox;
    @ViewChild("cboInfusionperiodUoMValueTempRef", { read: iComboBox, static: false }) set _cboInfusionperiodUoMValue(c: iComboBox) {
        if (c) { this.cboInfusionperiodUoMValue = c; }
    };
    private lblInfusiondose: iLabel;
    @ViewChild("lblInfusiondoseTempRef", { read: iLabel, static: false }) set _lblInfusiondose(c: iLabel) {
        if (c) { this.lblInfusiondose = c; }
    };
    private spInfDoseRate: StackPanel;
    @ViewChild("spInfDoseRateTempRef", { read: StackPanel, static: false }) set _spInfDoseRate(c: StackPanel) {
        if (c) { this.spInfDoseRate = c; }
    };
    private Infusiondosetext: iTextBox;
    @ViewChild("InfusiondosetextTempRef", { read: iTextBox, static: false }) set _Infusiondosetext(c: iTextBox) {
        if (c) { this.Infusiondosetext = c; }
    };
    private lblInfusiondoseValue: iLabel;
    @ViewChild("lblInfusiondoseValueTempRef", { read: iLabel, static: false }) set _lblInfusiondoseValue(c: iLabel) {
        if (c) { this.lblInfusiondoseValue = c; }
    };
    private lblinfusiontrate: iLabel;
    @ViewChild("lblinfusiontrateTempRef", { read: iLabel, static: false }) set _lblinfusiontrate(c: iLabel) {
        if (c) { this.lblinfusiontrate = c; }
    };
    private cmdinfratecal: iButton;
    @ViewChild("cmdinfratecalTempRef", { read: iButton, static: false }) set _cmdinfratecal(c: iButton) {
        if (c) { this.cmdinfratecal = c; }
    };
    private InfusionRateLayout: Grid;
    @ViewChild("InfusionRateLayoutTempRef", { read: Grid, static: false }) set _InfusionRateLayout(c: Grid) {
        if (c) { this.InfusionRateLayout = c; }
    };
    private txtRecinfusionrate: iTextBox;
    @ViewChild("txtRecinfusionrateTempRef", { read: iTextBox, static: false }) set _txtRecinfusionrate(c: iTextBox) {
        if (c) { this.txtRecinfusionrate = c; }
    };
    private lblInfusionUOM: iLabel;
    @ViewChild("lblInfusionUOMTempRef", { read: iLabel, static: false }) set _lblInfusionUOM(c: iLabel) {
        if (c) { this.lblInfusionUOM = c; }
    };
    private cboInfusionRateUOM: iComboBox;
    @ViewChild("cboInfusionRateUOMTempRef", { read: iComboBox, static: false }) set _cboInfusionRateUOM(c: iComboBox) {
        if (c) { this.cboInfusionRateUOM = c; }
    };
    private lblInfusionRateHifen: iLabel;
    @ViewChild("lblInfusionRateHifenTempRef", { read: iLabel, static: false }) set _lblInfusionRateHifen(c: iLabel) {
        if (c) { this.lblInfusionRateHifen = c; }
    };
    private cboInfusionRatePerUOM: iComboBox;
    @ViewChild("cboInfusionRatePerUOMTempRef", { read: iComboBox, static: false }) set _cboInfusionRatePerUOM(c: iComboBox) {
        if (c) { this.cboInfusionRatePerUOM = c; }
    };
    public FlowrateLayoutRoot: Grid;
    @ViewChild("FlowrateLayoutRootTempRef", { read: Grid, static: false }) set _FlowrateLayoutRoot(c: Grid) {
        if (c) { this.FlowrateLayoutRoot = c; }
    };
    private txtRecFlowRate: iTextBox;
    @ViewChild("txtRecFlowRateTempRef", { read: iTextBox, static: false }) set _txtRecFlowRate(c: iTextBox) {
        if (c) { this.txtRecFlowRate = c; }
    };
    private lblUOMFlowrate: iLabel;
    @ViewChild("lblUOMFlowrateTempRef", { read: iLabel, static: false }) set _lblUOMFlowrate(c: iLabel) {
        if (c) { this.lblUOMFlowrate = c; }
    };
    private cboflowratenumuom: iComboBox;
    @ViewChild("cboflowratenumuomTempRef", { read: iComboBox, static: false }) set _cboflowratenumuom(c: iComboBox) {
        if (c) { this.cboflowratenumuom = c; }
    };
    private lblUOMFlow1: iLabel;
    @ViewChild("lblUOMFlow1TempRef", { read: iLabel, static: false }) set _lblUOMFlow1(c: iLabel) {
        if (c) { this.lblUOMFlow1 = c; }
    };
    private cboflowratedenuom: iComboBox;
    @ViewChild("cboflowratedenuomTempRef", { read: iComboBox, static: false }) set _cboflowratedenuom(c: iComboBox) {
        if (c) { this.cboflowratedenuom = c; }
    };
    private lbldriprate: iLabel;
    @ViewChild("lbldriprateTempRef", { read: iLabel, static: false }) set _lbldriprate(c: iLabel) {
        if (c) { this.lbldriprate = c; }
    };
    private cmddripratecal: iButton;
    @ViewChild("cmddripratecalTempRef", { read: iButton, static: false }) set _cmddripratecal(c: iButton) {
        if (c) { this.cmddripratecal = c; }
    };
    private txtdriprate: iTextBox;
    @ViewChild("txtdriprateTempRef", { read: iTextBox, static: false }) set _txtdriprate(c: iTextBox) {
        if (c) { this.txtdriprate = c; }
    };
    private lbldriprateValue: iLabel;
    @ViewChild("lbldriprateValueTempRef", { read: iLabel, static: false }) set _lbldriprateValue(c: iLabel) {
        if (c) { this.lbldriprateValue = c; }
    };
    private lblbagvolume: iLabel;
    @ViewChild("lblbagvolumeTempRef", { read: iLabel, static: false }) set _lblbagvolume(c: iLabel) {
        if (c) { this.lblbagvolume = c; }
    };
    private stackbagvol: StackPanel;
    @ViewChild("stackbagvolTempRef", { read: StackPanel, static: false }) set _stackbagvol(c: StackPanel) {
        if (c) { this.stackbagvol = c; }
    };
    private bagvolumetext: iTextBox;
    @ViewChild("bagvolumetextTempRef", { read: iTextBox, static: false }) set _bagvolumetext(c: iTextBox) {
        if (c) { this.bagvolumetext = c; }
    };
    private lbluom: iLabel;
    @ViewChild("lbluomTempRef", { read: iLabel, static: false }) set _lbluom(c: iLabel) {
        if (c) { this.lbluom = c; }
    };
    private cbobagUoMValue: iComboBox;
    @ViewChild("cbobagUoMValueTempRef", { read: iComboBox, static: false }) set _cbobagUoMValue(c: iComboBox) {
        if (c) { this.cbobagUoMValue = c; }
    };
    private lblSite: iLabel;
    @ViewChild("lblSiteTempRef", { read: iLabel, static: false }) set _lblSite(c: iLabel) {
        if (c) { this.lblSite = c; }
    };
    private cboSite: iComboBox;
    @ViewChild("cboSiteTempRef", { read: iComboBox, static: false }) set _cboSite(c: iComboBox) {
        if (c) { this.cboSite = c; }
    };
    private lblBatchNo: iLabel;
    @ViewChild("lblBatchNoTempRef", { read: iLabel, static: false }) set _lblBatchNo(c: iLabel) {
        if (c) { this.lblBatchNo = c; }
    };
    private txtRecBatchNo: iTextBox;
    @ViewChild("txtRecBatchNoTempRef", { read: iTextBox, static: false }) set _txtRecBatchNo(c: iTextBox) {
        if (c) { this.txtRecBatchNo = c; }
    };
    private lblExpiryDate: iLabel;
    @ViewChild("lblExpiryDateTempRef", { read: iLabel, static: false }) set _lblExpiryDate(c: iLabel) {
        if (c) { this.lblExpiryDate = c; }
    };
    private dtpRecExpiryDate: iDateTimePicker;
    @ViewChild("dtpRecExpiryDateTempRef", { read: iDateTimePicker, static: false }) set _dtpRecExpiryDate(c: iDateTimePicker) {
        if (c) { this.dtpRecExpiryDate = c; }
    };
    private lblLumen: iLabel;
    @ViewChild("lblLumenTempRef", { read: iLabel, static: false }) set _lblLumen(c: iLabel) {
        if (c) { this.lblLumen = c; }
    };
    private txtLumen: iTextBox;
    @ViewChild("txtLumenTempRef", { read: iTextBox, static: false }) set _txtLumen(c: iTextBox) {
        if (c) { this.txtLumen = c; }
    };
    private lblDeliveryDevice: iLabel;
    @ViewChild("lblDeliveryDeviceTempRef", { read: iLabel, static: false }) set _lblDeliveryDevice(c: iLabel) {
        if (c) { this.lblDeliveryDevice = c; }
    };
    private cboDeliveryDevice: iComboBox;
    @ViewChild("cboDeliveryDeviceTempRef", { read: iComboBox, static: false }) set _cboDeliveryDevice(c: iComboBox) {
        if (c) { this.cboDeliveryDevice = c; }
    };
    private lblHumidification: iLabel;
    @ViewChild("lblHumidificationTempRef", { read: iLabel, static: false }) set _lblHumidification(c: iLabel) {
        if (c) { this.lblHumidification = c; }
    };
    private cboHumidification: iComboBox;
    @ViewChild("cboHumidificationTempRef", { read: iComboBox, static: false }) set _cboHumidification(c: iComboBox) {
        if (c) { this.cboHumidification = c; }
    };
    private bgddatetime: Border;
    @ViewChild("bgddatetimeTempRef", { read: Border, static: false }) set _bgddatetime(c: Border) {
        if (c) { this.bgddatetime = c; }
    };
    private bgdadminby: Border;
    @ViewChild("bgdadminbyTempRef", { read: Border, static: false }) set _bgdadminby(c: Border) {
        if (c) { this.bgdadminby = c; }
    };
    private bgdchknowit: Border;
    @ViewChild("bgdchknowitTempRef", { read: Border, static: false }) set _bgdchknowit(c: Border) {
        if (c) { this.bgdchknowit = c; }
    };
    private bgdchkwit: Border;
    @ViewChild("bgdchkwitTempRef", { read: Border, static: false }) set _bgdchkwit(c: Border) {
        if (c) { this.bgdchkwit = c; }
    };
    private bgdclin: Border;
    @ViewChild("bgdclinTempRef", { read: Border, static: false }) set _bgdclin(c: Border) {
        if (c) { this.bgdclin = c; }
    };
    private bgdcomments: Border;
    @ViewChild("bgdcommentsTempRef", { read: Border, static: false }) set _bgdcomments(c: Border) {
        if (c) { this.bgdcomments = c; }
    };
    private bgdfive: Border;
    @ViewChild("bgdfiveTempRef", { read: Border, static: false }) set _bgdfive(c: Border) {
        if (c) { this.bgdfive = c; }
    };
    private brdadminby: Border;
    @ViewChild("brdadminbyTempRef", { read: Border, static: false }) set _brdadminby(c: Border) {
        if (c) { this.brdadminby = c; }
    };
    private brdchknowit: Border;
    @ViewChild("brdchknowitTempRef", { read: Border, static: false }) set _brdchknowit(c: Border) {
        if (c) { this.brdchknowit = c; }
    };
    private brdClini: Border;
    @ViewChild("brdCliniTempRef", { read: Border, static: false }) set _brdClini(c: Border) {
        if (c) { this.brdClini = c; }
    };
    private brdcomments: Border;
    @ViewChild("brdcommentsTempRef", { read: Border, static: false }) set _brdcomments(c: Border) {
        if (c) { this.brdcomments = c; }
    };
    private lblAdminDateTime: iLabel;
    @ViewChild("lblAdminDateTimeTempRef", { read: iLabel, static: false }) set _lblAdminDateTime(c: iLabel) {
        if (c) { this.lblAdminDateTime = c; }
    };
    private dtpAdminDate: iDateTimePicker;
    @ViewChild("dtpAdminDateTempRef", { read: iDateTimePicker, static: false }) set _dtpAdminDate(c: iDateTimePicker) {
        if (c) { this.dtpAdminDate = c; }
    };
    private iTimedtpAdminTime: iTimeBox;
    @ViewChild("iTimedtpAdminTimeTempRef", { read: iTimeBox, static: false }) set _iTimedtpAdminTime(c: iTimeBox) {
        if (c) { this.iTimedtpAdminTime = c; }
    };
    private lblAdminBy: iLabel;
    @ViewChild("lblAdminByTempRef", { read: iLabel, static: false }) set _lblAdminBy(c: iLabel) {
        if (c) { this.lblAdminBy = c; }
    };
    private lblAdminByValue: iLabel;
    @ViewChild("lblAdminByValueTempRef", { read: iLabel, static: false }) set _lblAdminByValue(c: iLabel) {
        if (c) { this.lblAdminByValue = c; }
    };
    private chkNoWitness: iCheckBox;
    @ViewChild("chkNoWitnessTempRef", { read: iCheckBox, static: false }) set _chkNoWitness(c: iCheckBox) {
        if (c) { this.chkNoWitness = c; }
    };
    private lblWitnessedBy: iLabel;
    @ViewChild("lblWitnessedByTempRef", { read: iLabel, static: false }) set _lblWitnessedBy(c: iLabel) {
        if (c) { this.lblWitnessedBy = c; }
    };
    private sfsWitnessedby: iSFS;
    @ViewChild("sfsWitnessedbyTempRef", { read: iSFS, static: false }) set _sfsWitnessedby(c: iSFS) {
        if (c) { this.sfsWitnessedby = c; }
    };
    private lblcliniIncFrm: iLabel;
    @ViewChild("lblcliniIncFrmTempRef", { read: iLabel, static: false }) set _lblcliniIncFrm(c: iLabel) {
        if (c) { this.lblcliniIncFrm = c; }
    };
    private lblcliniIncFrmValue: iLabel;
    @ViewChild("lblcliniIncFrmValueTempRef", { read: iLabel, static: false }) set _lblcliniIncFrmValue(c: iLabel) {
        if (c) { this.lblcliniIncFrmValue = c; }
    };
    private lblComments: iLabel;
    @ViewChild("lblCommentsTempRef", { read: iLabel, static: false }) set _lblComments(c: iLabel) {
        if (c) { this.lblComments = c; }
    };
    private txtAdminComments: iTextBox;
    @ViewChild("txtAdminCommentsTempRef", { read: iTextBox, static: false }) set _txtAdminComments(c: iTextBox) {
        if (c) { this.txtAdminComments = c; }
    };

    //#endregion

    public resKey = Resource.RecordAdmin;
    public resKeyInf = Resource.Infusion;
    //public resKey1 = Resource.MedicationAdministrator;
    public medFrmresKey = Resource.MedicationForm;
    public Styles = ControlStyles;

    chkNoWitness_Checked_Func: Function;
    chkNoWitness_Unchecked_Func: Function;

    constructor() {
        super();
        that = this;
        //InitializeComponent();
    }

    ngOnInit(): void{
        this.chkNoWitness_Checked_Func = (s, e) => { this.chkNoWitness_Checked(s); };
        this.chkNoWitness_Unchecked_Func = (s, e) => { this.chkNoWitness_Unchecked(s); };
    }

    public maxGridHeight;
    public borderHeight;
    ngAfterViewInit(): void { 

        if(that.Parent && that.Parent != null && that.Parent.Parent && that.Parent.Parent != null && that.Parent.Parent.KeepTabContent)        
        {
            Object.keys(that).forEach((prop) => (this[prop] = that[prop]));              
        };
        this.UserControl_Loaded(null,null);   
        this.sfsWitnessedby.OnGetItems = (s,e) => { this.sfsWitnessedby_OnGetItems(s,e) }; 
        this.sfsWitnessedby.ItemsSource = new ObservableCollection<CListItem>();   
        this.objVM = ObjectHelper.CreateType<PrescriptionItemVM>(this.DataContext, PrescriptionItemVM);
        this.objVM.FormViewerDetails.BasicDetails.RecordAdmin.TabVisited = true;
        if (window.screen.height < 1000 && window.devicePixelRatio != 1.25) {
            this.maxGridHeight = window.innerHeight - 215;
            this.borderHeight = window.innerHeight ;
        }
        else {
        this.maxGridHeight = CommonService.setDynamicScrollviewerHeight();
        if(this.maxGridHeight && ((this.maxGridHeight - 50) < 470)){
            this.maxGridHeight = this.maxGridHeight - 50;
        }
        else{
            this.maxGridHeight = 470;
        }
        this.borderHeight = this.maxGridHeight - 10;
    }
    }

    ngOnDestroy(): void {
        this.UserControl_Unloaded({}, null);
    }

    txtLowerDose_KeyDown_Func = (s,e) => {Object.keys(that).forEach((prop) => (this[prop] = that[prop]));  this.txtLowerDose_KeyDown(s,e)};
    private txtLowerDose_KeyDown(sender: Object, e: KeyEventArgs): void {
        if (e.PlatformKeyCode == 189) {
            e.Handled = true;
        }
    }
    DynamicAdminMethodNotIntiated:boolean = true;
    private UserControl_Loaded(sender: Object, e: RoutedEventArgs): void {
        this.lblcliniIncFrm.Visibility = Visibility.Collapsed;
        this.objVM = ObjectHelper.CreateType<PrescriptionItemVM>(this.DataContext, PrescriptionItemVM);
        if(this.objVM.RecordadminSetTimeBoxMode)
        this.SetTimeBoxValue();
        this.iTimedtpAdminTime.ValueChanged = (s, e) => { this.iTimedtpAdminTime_ValueChanged(s, e); };
        this.dtpRecExpiryDate.RangeStartDate = this.objVM.FormViewerDetails.BasicDetails.StartDTTM.Date;
        this.dtpRecExpiryDate.RangeEndDate = DateTime.MaxValue.DateTime.AddDays(-1);
        this.cboRoute.SelectionChanged = (s, e) => { this.cboRoute_SelectionChanged(s, e); };
        this.lblDose.GotFocus = (s, e) => { this.lblDose_GotFocus(s, e); };
        this.chkNoWitness.IsChecked = this.objVM.FormViewerDetails.BasicDetails.RecordAdmin.IsNoWitnessAvialable;
        if (String.IsNullOrEmpty(this.objVM.FormViewerDetails.BasicDetails.RecordAdmin.ClinicalIncidentForm))
            this.objVM.FormViewerDetails.BasicDetails.RecordAdmin.GetCliniicalIncidentFormConfig();
        if (this.objVM.FormViewerDetails.BasicDetails.RecordAdmin.IsNoWitnessAvialable == true) {
            if (!String.IsNullOrEmpty(this.lblcliniIncFrmValue.Text)) {
                this.lblcliniIncFrm.Visibility = Visibility.Visible;
                this.lblcliniIncFrmValue.Visibility = Visibility.Visible;
                this.bgdclin.Visibility = Visibility.Visible;
                this.brdClini.Visibility = Visibility.Visible;
            }
            this.lblWitnessedBy.IsEnabled = this.sfsWitnessedby.IsEnabled = false;
        }
        else {
            this.objVM.FormViewerDetails.BasicDetails.RecordAdmin.WitnessMandatory = this.lblWitnessedBy.IsEnabled = this.chkNoWitness.IsEnabled = this.sfsWitnessedby.IsEnabled = this.objVM.FormViewerDetails.BasicDetails.RecordAdmin.bIsWitnessReqd;
            //this.objVM.FormViewerDetails.BasicDetails.RecordAdmin.GetWitnessRequiredEvent -= RecordAdmin_GetWitnessRequiredEvent;
            this.objVM.FormViewerDetails.BasicDetails.RecordAdmin.GetWitnessRequiredEvent = (s, e) => { this.RecordAdmin_GetWitnessRequiredEvent(s, e); };
        }
        //this.objVM.FormViewerDetails.BasicDetails.RecordAdmin.OnWitnessUserSelected -= ValidateUser;
        this.objVM.FormViewerDetails.BasicDetails.RecordAdmin.OnWitnessUserSelected = (s, e) => { this.ValidateUser(s); };
        let listselectedClistitem: ObservableCollection<CListItem> = null;
        let listselectedClistitemUom: ObservableCollection<CListItem> = null;
        if (this.objVM.FormViewerDetails != null && this.objVM.FormViewerDetails.BasicDetails != null && this.objVM.FormViewerDetails.BasicDetails.DefaultDetails != null) {
            if (this.objVM.FormViewerDetails.BasicDetails.DefaultDetails.Routes != null && this.objVM.FormViewerDetails.BasicDetails.DefaultDetails.Routes.Count > 0) {
                listselectedClistitem = new ObservableCollection<CListItem>();
                this.objVM.FormViewerDetails.BasicDetails.DefaultDetails.Routes.forEach((selectedClistitem) => {
                    if (selectedClistitem.IsSelected) {
                        listselectedClistitem.Add(ObjectHelper.CreateObject(new CListItem(), { DisplayText: selectedClistitem.DisplayText, Value: selectedClistitem.Value, Tag: selectedClistitem.Tag }));
                    }
                });
            }
            if (this.objVM.FormViewerDetails.BasicDetails != null && this.objVM.FormViewerDetails.BasicDetails.InfusionType != null && String.Compare(this.objVM.FormViewerDetails.BasicDetails.InfusionType.Value, InfusionTypesCode.PCA, StringComparison.CurrentCultureIgnoreCase) != 0) {
                if (this.objVM.FormViewerDetails.BasicDetails.DoseUOM != null) {
                    listselectedClistitemUom = new ObservableCollection<CListItem>();
                    listselectedClistitemUom.Add(this.objVM.FormViewerDetails.BasicDetails.DoseUOM);
                }
            }
            else {
                if (this.objVM.FormViewerDetails.BasicDetails.InfusionType != null && this.objVM.FormViewerDetails.BasicDetails.InfusionDetails != null && this.objVM.FormViewerDetails.BasicDetails.InfusionDetails.BolusUOM != null) {
                    listselectedClistitemUom = new ObservableCollection<CListItem>();
                    listselectedClistitemUom.Add(this.objVM.FormViewerDetails.BasicDetails.InfusionDetails.BolusUOM);
                }
                else if (this.objVM.FormViewerDetails.BasicDetails.DoseUOM != null) {
                    listselectedClistitemUom = new ObservableCollection<CListItem>();
                    listselectedClistitemUom.Add(this.objVM.FormViewerDetails.BasicDetails.DoseUOM);
                }
            }
        }
        if (listselectedClistitemUom != null && listselectedClistitemUom.Count > 0) {
            this.cboDoseUoMValue.ItemsSource = listselectedClistitemUom;
            this.cboDoseUoMValue.SelectedIndex = 0;
        }
        let issame: boolean = true;
        if (this.cboRoute.ItemsSource != null) {
            let listrouteClistitem: ObservableCollection<CListItem> = ObjectHelper.CreateType<ObservableCollection<CListItem>>(this.cboRoute.ItemsSource, ObservableCollection<CListItem>);
            let nRecRouteCount: number = listrouteClistitem.Count;
            let nPresRouteCount: number = listselectedClistitem.Count;
            if (nPresRouteCount != nRecRouteCount) {
                issame = false;
            }
            //revisit - break commented
            else if (nPresRouteCount > nRecRouteCount) {
                listselectedClistitem.forEach((objList) => {
                    if (!listrouteClistitem.Any(x => x.Value == objList.Value)) {
                        issame = false;
                        //break;
                    }
                });
            }
            //revisit - break commented
            else {
                listrouteClistitem.forEach((objList) => {
                    if (!listselectedClistitem.Any(x => x.Value == objList.Value)) {
                        issame = false;
                        //break;
                    }
                });
            }
        }
        if (listselectedClistitem != null && listselectedClistitem.Count > 0) {
            if (!issame || this.objVM.FormViewerDetails.BasicDetails.RecordAdmin.Routes == null) {
                this.objVM.FormViewerDetails.BasicDetails.RecordAdmin.Routes = listselectedClistitem;
                if (this.objVM.FormViewerDetails.BasicDetails.RecordAdmin.Route == null) {
                    setTimeout(() => {
                        this.cboRoute.SelectedIndex = (listselectedClistitem.Count == 1) ? 0 : -1;
                    }, 10);
                }
            }
        }
        if (!this.objVM.FormViewerDetails.BasicDetails.IsMultiRouteChecked && this.objVM.FormViewerDetails.BasicDetails.Route != null) {
            let singleSelectedRoute: ObservableCollection<CListItem> = new ObservableCollection<CListItem>();
            let singleRoute: CListItem = new CListItem();
            singleRoute = this.objVM.FormViewerDetails.BasicDetails.Route;
            singleSelectedRoute.Add(singleRoute);
            this.objVM.FormViewerDetails.BasicDetails.RecordAdmin.Routes = singleSelectedRoute;
            this.objVM.FormViewerDetails.BasicDetails.RecordAdmin.Route = singleRoute;
            //this.cboRoute.SelectedIndex = 0;
        }
        if (this.objVM.FormViewerDetails.BasicDetails.RecordAdmin != null && this.cboRoute.SelectedIndex == -1) {
            this.objVM.FormViewerDetails.BasicDetails.RecordAdmin.bIsWitnessReqd = false;
            this.objVM.FormViewerDetails.BasicDetails.RecordAdmin.WitnessMandatory = false;
        }
        if (this.objVM.FormViewerDetails.BasicDetails != null && this.objVM.FormViewerDetails.BasicDetails.InfusionType != null && String.Compare(this.objVM.FormViewerDetails.BasicDetails.InfusionType.Value, InfusionTypesCode.PCA, StringComparison.CurrentCultureIgnoreCase) == 0 && this.objVM.FormViewerDetails.BasicDetails.DoseType != null && String.Compare(this.objVM.FormViewerDetails.BasicDetails.DoseType.Value, DoseTypeCode.NORMAL, StringComparison.CurrentCultureIgnoreCase) == 0) {
            if ((this.objVM.FormViewerDetails.BasicDetails.RecordAdmin.SelectedDoseUoM != null) && (this.objVM.FormViewerDetails.BasicDetails.InfusionDetails.BolusUOM != null)) {
                if (this.objVM.FormViewerDetails.BasicDetails.RecordAdmin.SelectedDoseUoM.Value != this.objVM.FormViewerDetails.BasicDetails.InfusionDetails.BolusUOM.Value) {
                    if (!String.IsNullOrEmpty(this.objVM.FormViewerDetails.BasicDetails.InfusionDetails.Bolus))
                        this.objVM.FormViewerDetails.BasicDetails.RecordAdmin.Dose = this.objVM.FormViewerDetails.BasicDetails.InfusionDetails.Bolus;
                    if (this.objVM.FormViewerDetails.BasicDetails.InfusionDetails.BolusUOMList != null && this.objVM.FormViewerDetails.BasicDetails.InfusionDetails.BolusUOMList != null && this.objVM.FormViewerDetails.BasicDetails.InfusionDetails.BolusUOMList.Count > 0) {
                        this.objVM.FormViewerDetails.BasicDetails.RecordAdmin.DoseUoM = this.objVM.FormViewerDetails.BasicDetails.InfusionDetails.BolusUOMList;
                        this.objVM.FormViewerDetails.BasicDetails.RecordAdmin.SelectedDoseUoM = this.objVM.FormViewerDetails.BasicDetails.InfusionDetails.BolusUOM;
                        this.objVM.FormViewerDetails.BasicDetails.RecordAdmin.DoseUOMValue = this.objVM.FormViewerDetails.BasicDetails.InfusionDetails.BolusUOM.DisplayText;
                    }
                }
            }
        }
        else if (this.objVM.FormViewerDetails.BasicDetails != null && this.objVM.FormViewerDetails.BasicDetails.InfusionType != null && (String.Compare(this.objVM.FormViewerDetails.BasicDetails.InfusionType.Value, InfusionTypesCode.CONTINUOUS, StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(this.objVM.FormViewerDetails.BasicDetails.InfusionType.Value, InfusionTypesCode.SINGLEDOSEVOLUME, StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(this.objVM.FormViewerDetails.BasicDetails.InfusionType.Value, InfusionTypesCode.FLUID, StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(this.objVM.FormViewerDetails.BasicDetails.InfusionType.Value, InfusionTypesCode.INTERMITTENT, StringComparison.CurrentCultureIgnoreCase) == 0) && (this.objVM.FormViewerDetails.BasicDetails.DoseType != null && String.Compare(this.objVM.FormViewerDetails.BasicDetails.DoseType.Value, DoseTypeCode.NORMAL, StringComparison.CurrentCultureIgnoreCase) == 0)) {
            if ((this.objVM.FormViewerDetails.BasicDetails.RecordAdmin.SelectedDoseUoM != null) && (this.objVM.FormViewerDetails.BasicDetails.DoseUOM != null)) {
                if (this.objVM.FormViewerDetails.BasicDetails.RecordAdmin.SelectedDoseUoM.Value != this.objVM.FormViewerDetails.BasicDetails.DoseUOM.Value) {
                    if (!String.IsNullOrEmpty(this.objVM.FormViewerDetails.BasicDetails.Dose))
                        this.objVM.FormViewerDetails.BasicDetails.RecordAdmin.Dose = this.objVM.FormViewerDetails.BasicDetails.Dose;
                    if (this.objVM.FormViewerDetails.BasicDetails.DefaultDetails.Uoms != null && this.objVM.FormViewerDetails.BasicDetails.DefaultDetails.Uoms.Count > 0) {
                        this.objVM.FormViewerDetails.BasicDetails.RecordAdmin.DoseUoM = this.objVM.FormViewerDetails.BasicDetails.DefaultDetails.Uoms;
                        this.objVM.FormViewerDetails.BasicDetails.RecordAdmin.DoseUOMValue = this.objVM.FormViewerDetails.BasicDetails.DoseUOM.DisplayText;
                    }
                }
            }
        }
        if (this.objVM.FormViewerDetails.BasicDetails.Site != null && !String.IsNullOrEmpty(this.objVM.FormViewerDetails.BasicDetails.Site.Value)) {
            this.objVM.FormViewerDetails.BasicDetails.RecordAdmin.Sites = new ObservableCollection<CListItem>();
            let Moreitem: CListItem = ObjectHelper.CreateObject(new CListItem(), {
                DisplayText: "More",
                Value: "CC_More"
            });
            this.objVM.FormViewerDetails.BasicDetails.RecordAdmin.Sites.Add(this.objVM.FormViewerDetails.BasicDetails.Site);
            this.objVM.FormViewerDetails.BasicDetails.RecordAdmin.Sites.Add(Moreitem);
            this.objVM.FormViewerDetails.BasicDetails.RecordAdmin.Site = this.objVM.FormViewerDetails.BasicDetails.Site;
        }
        if (this.objVM.FormViewerDetails.BasicDetails.StartDTTM.Date > CommonBB.GetServerDateTime().Date) {
            this.dtpAdminDate.RangeStartDate = CommonBB.GetServerDateTime().Date;
        }
        else {
            this.dtpAdminDate.RangeStartDate = this.objVM.FormViewerDetails.BasicDetails.StartDTTM.Date;
        }
        this.dtpAdminDate.RangeEndDate = CommonBB.GetServerDateTime().Date;
        this.txtDoseValue.Focus();
        this.txtDoseValue.SelectionStart = this.txtDoseValue.MaxLength;
        this.sfsWitnessedby.OnGetItems = (s, e) => { this.sfsWitnessedby_OnGetItems(s, e); };
        this.sfsWitnessedby.GetSFSItems("cp");
        if (this.objVM.FormViewerDetails.BasicDetails.RecordAdmin.Focus == true) {
            this.sfsWitnessedby.Focus();
        }
        let IsMultiNonInfusionRoutes: boolean = false;
        if (this.objVM.FormViewerDetails.BasicDetails.IsAllowMultiRoute && this.objVM.FormViewerDetails.BasicDetails.DefaultDetails.Routes != null && this.objVM.FormViewerDetails.BasicDetails.DefaultDetails.Routes != null) {
            IsMultiNonInfusionRoutes = Common.IsNonInfusionMultiRoutes(this.objVM.FormViewerDetails.BasicDetails.DefaultDetails.Routes);
        }
        if (((this.objVM.FormViewerDetails.BasicDetails != null && this.objVM.FormViewerDetails.BasicDetails.RecordAdmin != null && this.objVM.FormViewerDetails.BasicDetails.RecordAdmin.Route != null && this.objVM.FormViewerDetails.BasicDetails.RecordAdmin.Route.Tag != null && String.Compare(this.objVM.FormViewerDetails.BasicDetails.RecordAdmin.Route.Tag.ToString(), "1") == 0 || !IsMultiNonInfusionRoutes) && this.objVM.FormViewerDetails.BasicDetails.InfusionType != null && (String.Compare(this.objVM.FormViewerDetails.BasicDetails.InfusionType.Value, InfusionTypesCode.CONTINUOUS) == 0 || String.Compare(this.objVM.FormViewerDetails.BasicDetails.InfusionType.Value, InfusionTypesCode.SINGLEDOSEVOLUME) == 0 || String.Compare(this.objVM.FormViewerDetails.BasicDetails.InfusionType.Value, InfusionTypesCode.FLUID) == 0)) || ((this.objVM.FormViewerDetails.BasicDetails != null && this.objVM.FormViewerDetails.BasicDetails.itemSubType != null && String.Compare(this.objVM.FormViewerDetails.BasicDetails.itemSubType, CConstants.SUBTYPE_BLOOD) == 0) && (this.objVM.FormViewerDetails.BasicDetails.InfusionType != null && (String.Compare(this.objVM.FormViewerDetails.BasicDetails.InfusionType.Value, InfusionTypesCode.CONTINUOUS) == 0 || String.Compare(this.objVM.FormViewerDetails.BasicDetails.InfusionType.Value, InfusionTypesCode.SINGLEDOSEVOLUME) == 0 || String.Compare(this.objVM.FormViewerDetails.BasicDetails.InfusionType.Value, InfusionTypesCode.FLUID) == 0)))) {
            this.lblDoseUOMValue.Visibility = Visibility.Visible;
            this.cboDoseUoMValue.Visibility = Visibility.Collapsed;
            this.lblDoseUoM.Visibility = Visibility.Collapsed;
            this.lblbagvolume.Visibility = Visibility.Visible;
            this.cbobagUoMValue.Visibility = Visibility.Visible;
            this.stackbagvol.Visibility = Visibility.Visible;
            this.bgdbagvol.Visibility = Visibility.Visible;
            this.brdbagvol.Visibility = Visibility.Visible;
            this.lblLumen.Visibility = Visibility.Visible;
            this.txtLumen.Visibility = Visibility.Visible;
            this.bgdlumen.Visibility = Visibility.Visible;
            this.brdlumen.Visibility = Visibility.Visible;
            this.lblDeliveryDevice.Visibility = Visibility.Visible;
            this.cboDeliveryDevice.Visibility = Visibility.Visible;
            this.brddeldevice.Visibility = Visibility.Visible;
            this.bgddeldevice.Visibility = Visibility.Visible;
            this.lblinfusiontrate.Visibility = Visibility.Visible;
            this.txtRecinfusionrate.Visibility = Visibility.Visible;
            ToolTipService.SetToolTip(this.txtRecinfusionrate, Resource.RecordAdmin.txtRecinfusionrate_tooltip);
            this.bgdinfurate.Visibility = Visibility.Visible;
            this.brdinfurate.Visibility = Visibility.Visible;
            this.lblInfusionUOM.Visibility = Visibility.Visible;
            this.cboInfusionRateUOM.Visibility = Visibility.Visible;
            this.lblInfusionRateHifen.Visibility = Visibility.Visible;
            this.cboInfusionRatePerUOM.Visibility = Visibility.Visible;
            this.lbldriprate.Visibility = Visibility.Visible;
            this.txtdriprate.Visibility = Visibility.Visible;
            this.txtdriprate.IsReadOnly = true;
            this.lbldriprateValue.Visibility = Visibility.Visible;
            this.bgddriprate.Visibility = Visibility.Visible;
            this.brddriprate.Visibility = Visibility.Visible;
            this.lblRoute.Visibility = Visibility.Visible;
            this.cboRoute.Visibility = Visibility.Visible;
            this.bgdroute.Visibility = Visibility.Visible;
            this.brdroute.Visibility = Visibility.Visible;
            this.lblAdminDateTime.Text = Infusion.lbldatetime_txt;
            this.lblinfusiontrate.Text = Infusion.lblInfusionRateLabel1_Text;
            this.lblinfusiontrate.Text = Infusion.lblInfusionRateLabel2_Text;
            this.lblinfusiontrate.Mandatory = true;
            this.lblInfusionUOM.Mandatory = true;
            this.lblDose.Text = MedicationForm.lblDose_Text;
            this.objVM.FormViewerDetails.BasicDetails.RecordAdmin.DoseMandatory = false;
            this.objVM.FormViewerDetails.BasicDetails.RecordAdmin.DoseUOMMandatory = false;
            this.lblConcentration.Visibility = Visibility.Visible;
            //this.spConcentration.Visibility = Visibility.Visible;
            this.LayoutConcentrationVisible = Visibility.Visible;
            this.bgdConcentration.Visibility = Visibility.Visible;
            this.brdConcentration.Visibility = Visibility.Visible;
            this.SwitchStateForConcentrationFields();
            this.lblInfusionperiod.Visibility = Visibility.Visible;
            this.spInfPeriod.Visibility = Visibility.Visible;
            //this.lblInfperioduom.Mandatory = true;
            this.bgdInfPeriod.Visibility = Visibility.Visible;
            this.brdInfPeriod.Visibility = Visibility.Visible;
            this.lblInfusiondose.Visibility = Visibility.Visible;
            this.spInfDoseRate.Visibility = Visibility.Visible;
            this.bgdInfDoseRate.Visibility = Visibility.Visible;
            this.brdInfDoseRate.Visibility = Visibility.Visible;
            this.LayoutInfusionRate = Visibility.Visible;
            this.bgdInfPeriod1 = Visibility.Visible;
            this.brdInfPeriod1 = Visibility.Visible;
        }
        else if ((this.objVM.FormViewerDetails.BasicDetails != null && this.objVM.FormViewerDetails.BasicDetails.RecordAdmin != null && this.objVM.FormViewerDetails.BasicDetails.RecordAdmin.Route != null && this.objVM.FormViewerDetails.BasicDetails.RecordAdmin.Route.Tag != null && String.Compare(this.objVM.FormViewerDetails.BasicDetails.RecordAdmin.Route.Tag.ToString(), "1") == 0 || !IsMultiNonInfusionRoutes) && this.objVM.FormViewerDetails.BasicDetails.InfusionType != null && String.Compare(this.objVM.FormViewerDetails.BasicDetails.InfusionType.Value, InfusionTypesCode.PCA) == 0) {
            this.lblDoseUOMValue.Visibility = Visibility.Visible;
            this.cboDoseUoMValue.Visibility = Visibility.Collapsed;
            this.lblDoseUoM.Visibility = Visibility.Collapsed;
            this.lblbagvolume.Visibility = Visibility.Visible;
            this.cbobagUoMValue.Visibility = Visibility.Visible;
            this.stackbagvol.Visibility = Visibility.Visible;
            this.bgdbagvol.Visibility = Visibility.Visible;
            this.brdbagvol.Visibility = Visibility.Visible;
            this.lblLumen.Visibility = Visibility.Visible;
            this.txtLumen.Visibility = Visibility.Visible;
            this.bgdlumen.Visibility = Visibility.Visible;
            this.brdlumen.Visibility = Visibility.Visible;
            this.lblDeliveryDevice.Visibility = Visibility.Visible;
            this.cboDeliveryDevice.Visibility = Visibility.Visible;
            this.brddeldevice.Visibility = Visibility.Visible;
            this.bgddeldevice.Visibility = Visibility.Visible;
            this.lblinfusiontrate.Visibility = this.objVM.FormViewerDetails.BasicDetails.InfusionDetails.InfInfusionRateVisi;
            this.txtRecinfusionrate.Visibility = this.objVM.FormViewerDetails.BasicDetails.InfusionDetails.InfInfusionRateVisi;
            ToolTipService.SetToolTip(this.txtRecinfusionrate, Resource.RecordAdmin.txtRecinfusionrate_Bkinfratetooltip);
            this.bgdinfurate.Visibility = this.objVM.FormViewerDetails.BasicDetails.InfusionDetails.InfInfusionRateVisi;
            this.brdinfurate.Visibility = this.objVM.FormViewerDetails.BasicDetails.InfusionDetails.InfInfusionRateVisi;
            this.lblInfusionUOM.Visibility = this.objVM.FormViewerDetails.BasicDetails.InfusionDetails.InfInfusionRateVisi;
            this.cboInfusionRateUOM.Visibility = this.objVM.FormViewerDetails.BasicDetails.InfusionDetails.InfInfusionRateVisi;
            this.lblInfusionRateHifen.Visibility = this.objVM.FormViewerDetails.BasicDetails.InfusionDetails.InfInfusionRateVisi;
            this.cboInfusionRatePerUOM.Visibility = this.objVM.FormViewerDetails.BasicDetails.InfusionDetails.InfInfusionRateVisi;
            this.lbldriprate.Visibility = Visibility.Visible;
            this.txtdriprate.Visibility = Visibility.Visible;
            this.txtdriprate.IsReadOnly = true;
            this.lbldriprateValue.Visibility = Visibility.Visible;
            this.bgddriprate.Visibility = Visibility.Visible;
            this.brddriprate.Visibility = Visibility.Visible;
            this.lblRoute.Visibility = Visibility.Visible;
            this.cboRoute.Visibility = Visibility.Visible;
            this.bgdroute.Visibility = Visibility.Visible;
            this.brdroute.Visibility = Visibility.Visible;
            this.lblAdminDateTime.Text = Infusion.lbldatetime_txt;
            this.lblDose.Text = Infusion.lblBolusLabel_Text;
            this.lblinfusiontrate.Text = Infusion.lblInfusionRateLabel_Text;
            this.lblinfusiontrate.Text = Infusion.lblInfusionRateLabel3_Text;
            this.lblcliniIncFrm.Visibility = Visibility.Collapsed;
            this.lblcliniIncFrmValue.Visibility = Visibility.Collapsed;
            this.bgdclin.Visibility = Visibility.Collapsed;
            this.brdClini.Visibility = Visibility.Collapsed;
            this.lblinfusiontrate.Mandatory = false;
            this.lblInfusionUOM.Mandatory = false;
            this.objVM.FormViewerDetails.BasicDetails.RecordAdmin.DoseMandatory = false;
            this.objVM.FormViewerDetails.BasicDetails.RecordAdmin.DoseUOMMandatory = false;
            this.lblConcentration.Visibility = Visibility.Visible;
            //this.spConcentration.Visibility = Visibility.Visible;
            this.LayoutConcentrationVisible = Visibility.Visible;
            this.bgdConcentration.Visibility = Visibility.Visible;
            this.brdConcentration.Visibility = Visibility.Visible;
            this.SwitchStateForConcentrationFields();
            this.lblInfusionperiod.Visibility = Visibility.Visible;
            this.spInfPeriod.Visibility = Visibility.Visible;
            //this.lblInfperioduom.Mandatory = true;
            this.bgdInfPeriod.Visibility = Visibility.Visible;
            this.bgdInfPeriod1 = Visibility.Visible;
            this.brdInfPeriod.Visibility = Visibility.Visible;
            this.brdInfPeriod1 = Visibility.Visible;
            this.lblInfusiondose.Visibility = this.objVM.FormViewerDetails.BasicDetails.InfusionDetails.InfInfusionRateVisi;
            this.spInfDoseRate.Visibility = this.objVM.FormViewerDetails.BasicDetails.InfusionDetails.InfInfusionRateVisi;
            this.bgdInfDoseRate.Visibility = this.objVM.FormViewerDetails.BasicDetails.InfusionDetails.InfInfusionRateVisi;
            this.brdInfDoseRate.Visibility = this.objVM.FormViewerDetails.BasicDetails.InfusionDetails.InfInfusionRateVisi;
            this.LayoutInfusionRate = this.objVM.FormViewerDetails.BasicDetails.InfusionDetails.InfInfusionRateVisi;
        }
        else if ((this.objVM.FormViewerDetails.BasicDetails != null && this.objVM.FormViewerDetails.BasicDetails.RecordAdmin != null && (this.objVM.FormViewerDetails.BasicDetails.RecordAdmin.Route != null && this.objVM.FormViewerDetails.BasicDetails.RecordAdmin.Route.Tag != null && String.Compare(this.objVM.FormViewerDetails.BasicDetails.RecordAdmin.Route.Tag.ToString(), "1") == 0 || (!IsMultiNonInfusionRoutes && (this.objVM.FormViewerDetails.BasicDetails.RecordAdmin.Route == null || String.Compare(this.objVM.FormViewerDetails.BasicDetails.RecordAdmin.Route.Tag.ToString(), "0") != 0))) && this.objVM.FormViewerDetails.BasicDetails.InfusionType != null && String.Compare(this.objVM.FormViewerDetails.BasicDetails.InfusionType.Value, InfusionTypesCode.INTERMITTENT) == 0 && (this.objVM.FormViewerDetails.BasicDetails.RecordAdmin != null)) || ((this.objVM.FormViewerDetails.BasicDetails != null && this.objVM.FormViewerDetails.BasicDetails.itemSubType != null && String.Compare(this.objVM.FormViewerDetails.BasicDetails.itemSubType, CConstants.SUBTYPE_BLOOD) == 0) && (this.objVM.FormViewerDetails.BasicDetails.InfusionType != null && String.Compare(this.objVM.FormViewerDetails.BasicDetails.InfusionType.Value, InfusionTypesCode.INTERMITTENT) == 0))) {
            this.lblDoseUOMValue.Visibility = Visibility.Visible;
            this.cboDoseUoMValue.Visibility = Visibility.Collapsed;
            this.lblDoseUoM.Visibility = Visibility.Collapsed;
            if (this.objVM.FormViewerDetails.BasicDetails.DoseType != null && !String.IsNullOrEmpty(this.objVM.FormViewerDetails.BasicDetails.DoseType.Value) && String.Compare(this.objVM.FormViewerDetails.BasicDetails.DoseType.Value, DoseTypeCode.CONDITIONAL, StringComparison.CurrentCultureIgnoreCase) == 0)
                if ((this.objVM.FormViewerDetails.BasicDetails.ConditionalDosingDetails == null) || (this.objVM.FormViewerDetails.BasicDetails.ConditionalDosingDetails != null && this.objVM.FormViewerDetails.BasicDetails.ConditionalDosingDetails.DoseDetails == null) || (this.objVM.FormViewerDetails.BasicDetails.ConditionalDosingDetails != null && this.objVM.FormViewerDetails.BasicDetails.ConditionalDosingDetails.DoseDetails != null && this.objVM.FormViewerDetails.BasicDetails.ConditionalDosingDetails.DoseDetails.Count == 0)) {
                    this.lblDoseUOMValue.Visibility = Visibility.Visible;
                    this.cboDoseUoMValue.Visibility = Visibility.Visible;
                    this.lblDoseUoM.Visibility = Visibility.Visible;
                }
            if (!String.Equals(this.objVM.FormViewerDetails.BasicDetails.InfusionType.Value, InfusionTypesCode.INTERMITTENT, StringComparison.InvariantCultureIgnoreCase)) {
                this.lblConcentration.Visibility = Visibility.Visible;
                //this.spConcentration.Visibility = Visibility.Visible;
                this.LayoutConcentrationVisible = Visibility.Visible;
                this.bgdConcentration.Visibility = Visibility.Visible;
                this.brdConcentration.Visibility = Visibility.Visible;
                this.SwitchStateForConcentrationFields();
            }
            this.lblInfusionperiod.Visibility = Visibility.Visible;
            this.spInfPeriod.Visibility = Visibility.Visible;
            //this.lblInfperioduom.Mandatory = true;
            this.bgdInfPeriod.Visibility = Visibility.Visible;
            this.bgdInfPeriod1 = Visibility.Visible;
            this.brdInfPeriod.Visibility = Visibility.Visible;
            this.brdInfPeriod1 = Visibility.Visible;
            if (!this.objVM.FormViewerDetails.BasicDetails.RecordAdmin.isBolusIntermittent) {
                this.lblbagvolume.Visibility = Visibility.Visible;
                this.cbobagUoMValue.Visibility = Visibility.Visible;
                this.stackbagvol.Visibility = Visibility.Visible;
                this.bgdbagvol.Visibility = Visibility.Visible;
                this.brdbagvol.Visibility = Visibility.Visible;
                this.lblLumen.Visibility = Visibility.Visible;
                this.txtLumen.Visibility = Visibility.Visible;
                this.bgdlumen.Visibility = Visibility.Visible;
                this.brdlumen.Visibility = Visibility.Visible;
                this.lblDose.Text = MedicationForm.lblDose_Text;
                this.lblDeliveryDevice.Visibility = Visibility.Visible;
                this.cboDeliveryDevice.Visibility = Visibility.Visible;
                this.bgddeldevice.Visibility = Visibility.Visible;
                this.brddeldevice.Visibility = Visibility.Visible;
                this.lblinfusiontrate.Mandatory = true;
                this.lblInfusionUOM.Mandatory = true;
                this.cmdinfratecal.Visibility = Visibility.Visible;
                this.cmddripratecal.Visibility = Visibility.Collapsed;
                this.lblinfusiontrate.Visibility = Visibility.Visible;
                this.txtRecinfusionrate.Visibility = Visibility.Visible;
                ToolTipService.SetToolTip(this.txtRecinfusionrate, Resource.RecordAdmin.txtRecinfusionrate_tooltip);
                this.bgdinfurate.Visibility = Visibility.Visible;
                this.brdinfurate.Visibility = Visibility.Visible;
                this.lblInfusionUOM.Visibility = Visibility.Visible;
                this.cboInfusionRateUOM.Visibility = Visibility.Visible;
                this.lblInfusionRateHifen.Visibility = Visibility.Visible;
                this.cboInfusionRatePerUOM.Visibility = Visibility.Visible;
                this.lbldriprate.Visibility = Visibility.Visible;
                this.txtdriprate.Visibility = Visibility.Visible;
                this.txtdriprate.IsReadOnly = true;
                this.lbldriprateValue.Visibility = Visibility.Visible;
                this.bgddriprate.Visibility = Visibility.Visible;
                this.brddriprate.Visibility = Visibility.Visible;
                this.lblRoute.Visibility = Visibility.Visible;
                this.cboRoute.Visibility = Visibility.Visible;
                this.bgdroute.Visibility = Visibility.Visible;
                this.brdroute.Visibility = Visibility.Visible;
                this.lblSite.Visibility = Visibility.Visible;
                this.cboSite.Visibility = Visibility.Visible;
                this.brdsite.Visibility = Visibility.Visible;
                this.bgdsite.Visibility = Visibility.Visible;
                this.lblcliniIncFrm.Visibility = Visibility.Collapsed;
                this.lblcliniIncFrmValue.Visibility = Visibility.Collapsed;
                this.bgdclin.Visibility = Visibility.Collapsed;
                this.brdClini.Visibility = Visibility.Collapsed;
                this.lblAdminDateTime.Text = Infusion.lbldatetiemgiven_txt;
                this.objVM.FormViewerDetails.BasicDetails.RecordAdmin.DoseMandatory = true;
                this.objVM.FormViewerDetails.BasicDetails.RecordAdmin.DoseUOMMandatory = true;
                this.lblInfusiondose.Visibility = Visibility.Visible;
                this.spInfDoseRate.Visibility = Visibility.Visible;
                this.bgdInfDoseRate.Visibility = Visibility.Visible;
                this.brdInfDoseRate.Visibility = Visibility.Visible;
                this.LayoutInfusionRate = Visibility.Visible;
            }
            else {
                this.lblinfusiontrate.Visibility = Visibility.Collapsed;
                this.txtRecinfusionrate.Visibility = Visibility.Collapsed;
                this.bgdinfurate.Visibility = Visibility.Collapsed;
                this.brdinfurate.Visibility = Visibility.Collapsed;
                this.lblInfusionUOM.Visibility = Visibility.Collapsed;
                this.cboInfusionRateUOM.Visibility = Visibility.Collapsed;
                this.lblInfusionRateHifen.Visibility = Visibility.Collapsed;
                this.cboInfusionRatePerUOM.Visibility = Visibility.Collapsed;
                this.lbldriprate.Visibility = Visibility.Collapsed;
                this.txtdriprate.Visibility = Visibility.Collapsed;
                this.txtdriprate.IsReadOnly = true;
                this.lbldriprateValue.Visibility = Visibility.Collapsed;
                this.cmddripratecal.Visibility = Visibility.Collapsed;
                this.cmdinfratecal.Visibility = Visibility.Collapsed;
                this.bgddriprate.Visibility = Visibility.Collapsed;
                this.brddriprate.Visibility = Visibility.Collapsed;
                this.lblbagvolume.Visibility = Visibility.Collapsed;
                this.cbobagUoMValue.Visibility = Visibility.Collapsed;
                this.stackbagvol.Visibility = Visibility.Collapsed;
                this.bgdbagvol.Visibility = Visibility.Collapsed;
                this.brdbagvol.Visibility = Visibility.Collapsed;
                this.lblDeliveryDevice.Visibility = Visibility.Collapsed;
                this.cboDeliveryDevice.Visibility = Visibility.Collapsed;
                this.bgddeldevice.Visibility = Visibility.Collapsed;
                this.brddeldevice.Visibility = Visibility.Collapsed;
                this.lblLumen.Visibility = Visibility.Collapsed;
                this.txtLumen.Visibility = Visibility.Collapsed;
                this.bgdlumen.Visibility = Visibility.Collapsed;
                this.brdlumen.Visibility = Visibility.Collapsed;
                this.lblInfusiondose.Visibility = Visibility.Collapsed;
                this.spInfDoseRate.Visibility = Visibility.Collapsed;
                this.bgdInfDoseRate.Visibility = Visibility.Collapsed;
                this.brdInfDoseRate.Visibility = Visibility.Collapsed;
                this.LayoutInfusionRate = Visibility.Collapsed;
            }
        }
        else if (PatientContext.IsINFUSIONON && this.objVM.FormViewerDetails.BasicDetails != null && this.objVM.FormViewerDetails.BasicDetails.itemSubType != null && String.Compare(this.objVM.FormViewerDetails.BasicDetails.itemSubType, CConstants.SUBTYPE_GAS) == 0) {
            this.lblinfusiontrate.Visibility = Visibility.Visible;
            this.bgdinfurate.Visibility = Visibility.Visible;
            this.brdinfurate.Visibility = Visibility.Visible;
            this.lblinfusiontrate.Text = Infusion.lblFlowRate_Text;
            this.lblinfusiontrate.Mandatory = true;
            this.lblDeliveryDevice.Visibility = Visibility.Visible;
            this.cboDeliveryDevice.Visibility = Visibility.Visible;
            this.bgddeldevice.Visibility = Visibility.Visible;
            this.brddeldevice.Visibility = Visibility.Visible;
            this.lblcliniIncFrm.Visibility = Visibility.Collapsed;
            this.lblAdminDateTime.Text = Infusion.lbldatetime_txt;
            this.lblDose.Visibility = Visibility.Collapsed;
            this.lblDoseUOMValue.Visibility = Visibility.Collapsed;
            this.cboDoseUoMValue.Visibility = Visibility.Collapsed;
            this.txtDoseValue.Visibility = Visibility.Collapsed;
            this.lblDoseUoM.Visibility = Visibility.Collapsed;
            this.bgddose.Visibility = Visibility.Collapsed;
            this.lblRoute.Visibility = Visibility.Visible;
            this.cboRoute.Visibility = Visibility.Visible;
            this.bgdroute.Visibility = Visibility.Visible;
            this.brdroute.Visibility = Visibility.Collapsed;
            this.lblSite.Visibility = Visibility.Collapsed;
            this.cboSite.Visibility = Visibility.Collapsed;
            this.brdsite.Visibility = Visibility.Collapsed;
            this.bgdsite.Visibility = Visibility.Collapsed;
            this.brdbatchno.Visibility = Visibility.Visible;
            this.lblcliniIncFrmValue.Visibility = Visibility.Collapsed;
            this.bgdclin.Visibility = Visibility.Collapsed;
            this.brdClini.Visibility = Visibility.Collapsed;
            if (this.objVM.FormViewerDetails.BasicDetails.InfusionDetails.Medicalgasdelivery != null && this.objVM.FormViewerDetails.BasicDetails.InfusionDetails.Medicalgasdelivery != null) {
                let oDeliveryDevice: CListItem = new CListItem();
                oDeliveryDevice = this.objVM.FormViewerDetails.BasicDetails.RecordAdmin.DeliveryDeviceList.Where(c => c.DisplayText == this.objVM.FormViewerDetails.BasicDetails.InfusionDetails.Medicalgasdelivery.DisplayText).Select(s => s).FirstOrDefault();
                if (oDeliveryDevice != null) {
                    this.objVM.FormViewerDetails.BasicDetails.RecordAdmin.DeliveryDevice = oDeliveryDevice;
                    this.objVM.FormViewerDetails.BasicDetails.RecordAdmin.IsEnabledDeliveryDevice = false;
                }
                else {
                    this.objVM.FormViewerDetails.BasicDetails.RecordAdmin.IsEnabledDeliveryDevice = true;
                }
            }
            let sInfDelDevice: string = this.objVM.FormViewerDetails.BasicDetails.InfusionDetails.DeliveryDeviceFreetext;
            if (!String.IsNullOrEmpty(sInfDelDevice)) {
                this.cboDeliveryDevice.Text = sInfDelDevice;
                this.objVM.FormViewerDetails.BasicDetails.RecordAdmin.IsEnabledDeliveryDevice = false;
            }
            else this.objVM.FormViewerDetails.BasicDetails.RecordAdmin.IsEnabledDeliveryDevice = true;
            this.lblHumidification.Visibility = Visibility.Visible;
            this.cboHumidification.Visibility = Visibility.Visible;
            this.bgdHumidification.Visibility = Visibility.Visible;
            this.brdHumidification.Visibility = Visibility.Visible;
            this.FlowrateLayout = Visibility.Visible;
            this.lblConcentration.Visibility = Visibility.Collapsed;
            //this.spConcentration.Visibility = Visibility.Collapsed;
            this.LayoutConcentrationVisible = Visibility.Collapsed;
            this.bgdConcentration.Visibility = Visibility.Collapsed;
            this.brdConcentration.Visibility = Visibility.Collapsed;
            this.lblInfusionperiod.Visibility = Visibility.Collapsed;
            this.spInfPeriod.Visibility = Visibility.Collapsed;
            this.bgdInfPeriod.Visibility = Visibility.Collapsed;
            this.bgdInfPeriod1 = Visibility.Collapsed;
            this.brdInfPeriod.Visibility = Visibility.Collapsed;
            this.brdInfPeriod1 = Visibility.Collapsed;
            this.lblInfusiondose.Visibility = Visibility.Collapsed;
            this.spInfDoseRate.Visibility = Visibility.Collapsed;
            this.bgdInfDoseRate.Visibility = Visibility.Collapsed;
            this.brdInfDoseRate.Visibility = Visibility.Collapsed;
            this.LayoutInfusionRate = Visibility.Collapsed;
        }
        else {
            this.lblDoseUOMValue.Visibility = Visibility.Collapsed;
            this.cboDoseUoMValue.Visibility = Visibility.Visible;
            this.lblDoseUoM.Visibility = Visibility.Visible;
            this.objVM.FormViewerDetails.BasicDetails.RecordAdmin.DoseMandatory = true;
            this.objVM.FormViewerDetails.BasicDetails.RecordAdmin.DoseUOMMandatory = true;
            this.lblinfusiontrate.Visibility = Visibility.Collapsed;
            this.txtRecinfusionrate.Visibility = Visibility.Collapsed;
            this.bgdinfurate.Visibility = Visibility.Collapsed;
            this.brdinfurate.Visibility = Visibility.Collapsed;
            this.lblInfusionUOM.Visibility = Visibility.Collapsed;
            this.cboInfusionRateUOM.Visibility = Visibility.Collapsed;
            this.lblInfusionRateHifen.Visibility = Visibility.Collapsed;
            this.cboInfusionRatePerUOM.Visibility = Visibility.Collapsed;
            this.lbldriprate.Visibility = Visibility.Collapsed;
            this.txtdriprate.Visibility = Visibility.Collapsed;
            this.txtdriprate.IsReadOnly = true;
            this.lbldriprateValue.Visibility = Visibility.Collapsed;
            this.cmddripratecal.Visibility = Visibility.Collapsed;
            this.cmdinfratecal.Visibility = Visibility.Collapsed;
            this.bgddriprate.Visibility = Visibility.Collapsed;
            this.brddriprate.Visibility = Visibility.Collapsed;
            this.lblbagvolume.Visibility = Visibility.Collapsed;
            this.cbobagUoMValue.Visibility = Visibility.Collapsed;
            this.stackbagvol.Visibility = Visibility.Collapsed;
            this.bgdbagvol.Visibility = Visibility.Collapsed;
            this.brdbagvol.Visibility = Visibility.Collapsed;
            this.lblDeliveryDevice.Visibility = Visibility.Collapsed;
            this.cboDeliveryDevice.Visibility = Visibility.Collapsed;
            this.bgddeldevice.Visibility = Visibility.Collapsed;
            this.brddeldevice.Visibility = Visibility.Collapsed;
            this.lblLumen.Visibility = Visibility.Collapsed;
            this.txtLumen.Visibility = Visibility.Collapsed;
            this.bgdlumen.Visibility = Visibility.Collapsed;
            this.brdlumen.Visibility = Visibility.Collapsed;
            this.FlowrateLayout = Visibility.Collapsed;
            this.lblConcentration.Visibility = Visibility.Collapsed;
            //this.spConcentration.Visibility = Visibility.Collapsed;
            this.LayoutConcentrationVisible = Visibility.Collapsed;
            this.bgdConcentration.Visibility = Visibility.Collapsed;
            this.brdConcentration.Visibility = Visibility.Collapsed;
            this.lblInfusionperiod.Visibility = Visibility.Collapsed;
            this.spInfPeriod.Visibility = Visibility.Collapsed;
            this.bgdInfPeriod.Visibility = Visibility.Collapsed;
            this.bgdInfPeriod1 = Visibility.Collapsed;
            this.brdInfPeriod.Visibility = Visibility.Collapsed;
            this.brdInfPeriod1 = Visibility.Collapsed;
            this.lblInfusiondose.Visibility = Visibility.Collapsed;
            this.spInfDoseRate.Visibility = Visibility.Collapsed;
            this.bgdInfDoseRate.Visibility = Visibility.Collapsed;
            this.brdInfDoseRate.Visibility = Visibility.Collapsed;
            this.LayoutInfusionRate = Visibility.Collapsed;
        }
        let sDoseType: string = this.objVM.FormViewerDetails.BasicDetails.DoseType != null ? this.objVM.FormViewerDetails.BasicDetails.DoseType.Value : String.Empty;
        if (this.objVM.FormViewerDetails.BasicDetails.AdminMethod != null && !String.IsNullOrEmpty(this.objVM.FormViewerDetails.BasicDetails.AdminMethod.Value) && this.objVM.FormViewerDetails.BasicDetails.IsAdminMethodVisible == Visibility.Collapsed) {
            if(this.Parent && this.Parent != null && this.Parent.Parent && this.Parent.Parent != null && this.Parent.Parent.KeepTabContent == false){
                this.objVM.FormViewerDetails.BasicDetails.AdminMethod = null;
            }
            else if(this.Parent && this.Parent != null && this.Parent.Parent && this.Parent.Parent != null && this.Parent.Parent.KeepTabContent && !this.DynamicAdminMethodNotIntiated){
                this.objVM.FormViewerDetails.BasicDetails.AdminMethod = null;
            }
        }
        else if (!String.Equals(sDoseType, DoseTypeCode.CONDITIONAL, StringComparison.CurrentCultureIgnoreCase) && (this.objVM.FormViewerDetails.BasicDetails.IsAdminMethodVisible == Visibility.Visible || (!String.IsNullOrEmpty(this.objVM.ItemMainType) && String.Compare(this.objVM.ItemMainType, CConstants.Formulary_Drug, StringComparison.CurrentCultureIgnoreCase) != 0))) {
            this.cboDoseUoMValue.ItemsSource = null;
        }
        if (this.objVM.FormViewerDetails.BasicDetails.InfusionDetails.InfRateNumeratorUom != null && this.objVM.FormViewerDetails.BasicDetails.InfusionDetails.InfRateDinominatorUom != null && !String.IsNullOrEmpty(this.objVM.FormViewerDetails.BasicDetails.InfusionDetails.InfRateNumeratorUom.DisplayText) && !String.IsNullOrEmpty(this.objVM.FormViewerDetails.BasicDetails.InfusionDetails.InfRateDinominatorUom.DisplayText)) {
            this.objVM.FormViewerDetails.BasicDetails.RecordAdmin.InfusionRateUOMValue = this.objVM.FormViewerDetails.BasicDetails.InfusionDetails.InfRateNumeratorUom.DisplayText + "/" + this.objVM.FormViewerDetails.BasicDetails.InfusionDetails.InfRateDinominatorUom.DisplayText;
        }
        if (this.objVM != null && this.objVM.FormViewerDetails != null && this.objVM.FormViewerDetails.BasicDetails != null && this.objVM.FormViewerDetails.BasicDetails.RecordAdmin != null && this.objVM.FormViewerDetails.BasicDetails.RecordAdmin.AdministeredDate != null)
        this.dtpAdminDate.SelectedDateTime = this.objVM.FormViewerDetails.BasicDetails.RecordAdmin.AdministeredDate;
        if (this.objVM != null && this.objVM.FormViewerDetails != null && this.objVM.FormViewerDetails.BasicDetails != null && this.objVM.FormViewerDetails.BasicDetails.RecordAdmin != null && this.objVM.FormViewerDetails.BasicDetails.RecordAdmin.ExpiryDate != null)
        this.dtpRecExpiryDate.SelectedDateTime = this.objVM.FormViewerDetails.BasicDetails.RecordAdmin.ExpiryDate;
        if(this.Parent && this.Parent != null && this.Parent.Parent && this.Parent.Parent != null && !this.Parent.Parent.KeepTabContent)
        this.objVM.FormViewerDetails.BasicDetails.RecordAdmin.IsLoaded = true;        
        if(this.Parent && this.Parent != null && this.Parent.Parent && this.Parent.Parent != null && this.Parent.Parent.KeepTabContent &&
            this.objVM.FormViewerDetails.BasicDetails.RecordAdmin.DynamicFormRecAdminTabVisited == true)
        this.objVM.FormViewerDetails.BasicDetails.RecordAdmin.IsLoaded = true;
    }
    private PopulateInfusionControlsBasedOnInfusionDoseRate(): void {
        if (this.objVM != null && this.objVM.FormViewerDetails != null && this.objVM.FormViewerDetails.BasicDetails != null && this.objVM.FormViewerDetails.BasicDetails.InfusionType != null && !String.IsNullOrEmpty(this.objVM.FormViewerDetails.BasicDetails.InfusionType.Value)) {
            let _oRecordAdminVM: RecordAdminVM = new RecordAdminVM();
            _oRecordAdminVM = this.objVM.FormViewerDetails.BasicDetails.RecordAdmin;
            if (!String.IsNullOrEmpty(_oRecordAdminVM.InfusionDoseUOM) && _oRecordAdminVM.InfusionDoseUOM.ToLowerInvariant().Contains("mg")) {
                this.objVM.FormViewerDetails.BasicDetails.RecordAdmin.InfusionRate = String.Empty;
                this.objVM.FormViewerDetails.BasicDetails.RecordAdmin.InfRateNumeratorUom = null;
                this.objVM.FormViewerDetails.BasicDetails.RecordAdmin.InfRateDinominatorUom = null;
            }
            else if (!String.IsNullOrEmpty(_oRecordAdminVM.InfusionDoseUOM) && _oRecordAdminVM.InfusionDoseUOM.ToLowerInvariant().Contains("ml")) {
                this.objVM.FormViewerDetails.BasicDetails.RecordAdmin.InfusionDose = String.Empty;
            }
        }
    }
    private SwitchStateForConcentrationFields(): void {
        let _EnableControls: boolean = false;
        let _IsReadOnly: boolean = false;
        if (this.objVM.FormViewerDetails.BasicDetails.InfusionDetails != null) {
            if (!String.IsNullOrEmpty(this.objVM.FormViewerDetails.BasicDetails.InfusionDetails.LowConcentration) && this.objVM.FormViewerDetails.BasicDetails.InfusionDetails.LowConcentrationUOM != null && !String.IsNullOrEmpty(this.objVM.FormViewerDetails.BasicDetails.InfusionDetails.UpperConcentration) && this.objVM.FormViewerDetails.BasicDetails.InfusionDetails.UpperConcentrationUOM != null) {
                _EnableControls = false;
                _IsReadOnly = true;
            }
            else {
                _EnableControls = true;
                _IsReadOnly = false;
            }
            this.objVM.FormViewerDetails.BasicDetails.InfusionDetails.IsReadOnlyConcentrationInRecAdmin = _IsReadOnly;
        }
        this.txtConStrengthValue.IsReadOnly = _IsReadOnly;
        this.cboConStrengthUoMValue.IsReadOnly = _IsReadOnly;
        this.cboConStrengthUoMValue.CanDropDown = _EnableControls;
        this.txtConVolumeValue.IsReadOnly = _IsReadOnly;
        this.cboConVolumeUoMValue.IsReadOnly = _IsReadOnly;
        this.cboConVolumeUoMValue.CanDropDown = _EnableControls;
    }
    RecordAdmin_GetWitnessRequiredEvent(sender : object,e: any): void {
        if(typeof(this.chkNoWitness) !== 'undefined' && this.chkNoWitness != null && typeof(this.chkNoWitness.IsChecked) !== 'undefined' 
        &&!this.chkNoWitness.IsChecked)
            this.objVM.FormViewerDetails.BasicDetails.RecordAdmin.WitnessMandatory = this.chkNoWitness.IsEnabled = this.sfsWitnessedby.IsEnabled = this.lblWitnessedBy.IsEnabled = this.objVM.FormViewerDetails.BasicDetails.RecordAdmin.bIsWitnessReqd;
    }
    private iTimedtpAdminTime_ValueChanged(sender: Object, e: RoutedPropertyChangedEventArgs<DateTime>): void {
        this.SetTimeBoxValue();
    }
    public SetTimeBoxValue(): void {
        if (this.iTimedtpAdminTime.Value != null && this.objVM != null && this.objVM.FormViewerDetails != null && this.objVM.FormViewerDetails.BasicDetails != null && this.objVM.FormViewerDetails.BasicDetails.RecordAdmin != null && this.objVM.FormViewerDetails.BasicDetails.RecordAdmin != null) {
            let dtCurent: DateTime = CommonBB.GetServerDateTime();
            //if (this.dtpAdminDate.SelectedDateTime.Date == dtCurent.Date)
            if (this.dtpAdminDate?.SelectedDateTime?.Date 
                && DateTime.Equals(this.dtpAdminDate.SelectedDateTime.Date,dtCurent.Date)) {
                this.objVM.RecordadminSetTimeBoxMode = true;
                if (this.iTimedtpAdminTime.Value > dtCurent) {
                    this.objVM.FormViewerDetails.BasicDetails.RecordAdmin.AdministeredTime = dtCurent;
                    // this.iTimedtpAdminTime.SetValue = dtCurent;
                    this.iTimedtpAdminTime.SetBinding(iTimeBox.ValueProperty,ObjectHelper.CreateObject(new Binding(this.DataContext,"FormViewerDetails.BasicDetails.RecordAdmin.AdministeredTime"), { Mode: BindingMode.TwoWay }));
                }
                else if (this.iTimedtpAdminTime.Value < this.objVM.FormViewerDetails.BasicDetails.StartDTTM) { 
                    this.objVM.FormViewerDetails.BasicDetails.RecordAdmin.AdministeredTime = this.objVM.FormViewerDetails.BasicDetails.StartDTTM;
                    this.iTimedtpAdminTime.SetBinding(iTimeBox.ValueProperty,ObjectHelper.CreateObject(new Binding(this.DataContext,"FormViewerDetails.BasicDetails.RecordAdmin.AdministeredTime"), { Mode: BindingMode.TwoWay }));                  
                    //this.iTimedtpAdminTime.SetBinding(iTimeBox.ValueProperty,ObjectHelper.CreateObject(new Binding(this.DataContext,"FormViewerDetails.BasicDetails.StartDTTM"),{ Mode: BindingMode.TwoWay }));
                }
            }
        }
    }
    lblDose_GotFocus(sender: Object, e: RoutedEventArgs): void {
        this.txtDoseValue.Focus();
        this.txtDoseValue.SelectionStart = this.txtDoseValue.MaxLength;
    }
    private sfsWitnessedby_KeyUp(sender: Object, e: KeyEventArgs): void {

    }
    private sfsWitnessedby_OnGetItems(sender: Object, Result: ObservableCollection<CListItem>): void {
        this.objVM.FormViewerDetails.BasicDetails.RecordAdmin.WitnessByList = null;
        this.objVM.FormViewerDetails.BasicDetails.RecordAdmin.WitnessByList = Result;
    }
   async sfsWitnessedby_OnSFSOpen(e): Promise<void> {
    // sfsWitnessedby_OnSFSOpen(e) {   
        this.oParam = AppContextInfo.OrganisationName;
        let oSelectedItem: CListItem = null;
      //  let returnValue: ScriptObject =  HtmlPage.Window.Invoke("SFSCareProvider", this.oParam);
      var returnValue: ScriptObject = <ScriptObject>(await HtmlPage.Window.InvokeAsync("SFSCareProvider", this.oParam) as ScriptObject);
        if (returnValue != null && returnValue.GetProperty("length") != null) {
            let nSelectCnt: number = Convert.ToInt32(returnValue.GetProperty("length"));
            var selectedValue: ScriptObject = <ScriptObject>(returnValue.GetProperty("0") as ScriptObject);
          //let selectedValue: ScriptObject = ObjectHelper.CreateType<ScriptObject>(returnValue.GetProperty(0), ScriptObject);
            oSelectedItem = new CListItem();
            oSelectedItem.DisplayText = <string>(selectedValue["SurName"] as string);
            if (!String.IsNullOrEmpty(<string>(selectedValue["ForeName"] as string))) {
                oSelectedItem.DisplayText += " ";
                oSelectedItem.DisplayText += selectedValue["ForeName"];
               // oSelectedItem.DisplayText += selectedValue.GetProperty("ForeName");
            }
            oSelectedItem.Value = <string>(selectedValue["OId"] as string);
            //oSelectedItem.Value = ObjectHelper.CreateType<string>(selectedValue.GetProperty("OId"), String);
        }        

        if (oSelectedItem != null) {
            if (this.objVM.FormViewerDetails.BasicDetails.RecordAdmin.WitnessByList == null)
                this.objVM.FormViewerDetails.BasicDetails.RecordAdmin.WitnessByList = new ObservableCollection<CListItem>();
           // Common.AddSelItemIntoSFSQuickList(this.objVM.FormViewerDetails.BasicDetails.RecordAdmin.WitnessByList, oSelectedItem.Value, oSelectedItem.DisplayText.Trim(), "cp", this.sfsWitnessedby);
            let oTemp: IEnumerable<CListItem> = this.objVM.FormViewerDetails.BasicDetails.RecordAdmin.WitnessByList.Where(user =>
                String.Compare(user.Value, oSelectedItem.Value, StringComparison.InvariantCultureIgnoreCase) == 0
            ).Select((user) => user);           
            if (oTemp != null && oTemp.Count() == 0) {
                this.objVM.FormViewerDetails.BasicDetails.RecordAdmin.WitnessByList.Add(ObjectHelper.CreateObject(new CListItem(), { Value: oSelectedItem.Value, DisplayText: oSelectedItem.DisplayText }));
                let lstItems: List<SLSFSItem> = new List<SLSFSItem>();
                lstItems.Add(ObjectHelper.CreateObject(new SLSFSItem(), { DisplayValue: oSelectedItem.Value, DisplayText: oSelectedItem.DisplayText, Sfskey: oSelectedItem.Value, Sfstype: "cp" }));
                this.sfsWitnessedby.AddSFSItems(lstItems);
            }
            this.sfsWitnessedby.GetSFSItems("cp");
            this.objVM.FormViewerDetails.BasicDetails.RecordAdmin.WitnessBy = oSelectedItem.DisplayText;
            this.objVM.FormViewerDetails.BasicDetails.RecordAdmin.WitnessByOID = oSelectedItem.Value;
        }


    }
    private chkNoWitness_Checked(e): void {
        this.sfsWitnessedby.IsEnabled = false;
        if (this.objVM != null && this.objVM.FormViewerDetails != null && this.objVM.FormViewerDetails.BasicDetails != null && this.objVM.FormViewerDetails.BasicDetails.RecordAdmin != null) {
            if (this.objVM.FormViewerDetails.BasicDetails.RecordAdmin.WitnessMandatory != null) {
                this.objVM.FormViewerDetails.BasicDetails.RecordAdmin.WitnessMandatory = false;
            }
            this.objVM.FormViewerDetails.BasicDetails.RecordAdmin.IsNoWitnessSelected = true;
        }
        this.lblWitnessedBy.IsEnabled = false;
        this.ClearWitnessedBySFS();
        if (!String.IsNullOrEmpty(this.lblcliniIncFrmValue.Text)) {
            this.lblcliniIncFrm.Visibility = Visibility.Visible;
            this.lblcliniIncFrmValue.Visibility = Visibility.Visible;
            this.bgdclin.Visibility = Visibility.Visible;
            this.brdClini.Visibility = Visibility.Visible;
        }
        if (ProfileData.ClinicalIncidentConfig != null && this.ValidateURL(ProfileData.ClinicalIncidentConfig.Address)) {
            this.lblcliniIncFrmValue.IsEnabled = true;
        }
        else {
            this.lblcliniIncFrmValue.IsEnabled = false;
        }
    }
    private chkNoWitness_Unchecked(e): void {
        this.lblcliniIncFrm.Visibility = Visibility.Collapsed;
        this.lblcliniIncFrmValue.Visibility = Visibility.Collapsed;
        this.bgdclin.Visibility = Visibility.Collapsed;
        this.brdClini.Visibility = Visibility.Collapsed;
        this.objVM.FormViewerDetails.BasicDetails.RecordAdmin.IsNoWitnessSelected = false;
        if (this.objVM.FormViewerDetails.BasicDetails.RecordAdmin.bIsWitnessReqd) {
            this.objVM.FormViewerDetails.BasicDetails.RecordAdmin.WitnessMandatory = true;
            this.sfsWitnessedby.IsEnabled = true;
            this.lblWitnessedBy.IsEnabled = true;
            this.chkNoWitness.IsEnabled = true;
        }
        else {
            this.sfsWitnessedby.IsEnabled = false;
            this.objVM.FormViewerDetails.BasicDetails.RecordAdmin.WitnessMandatory = false;
            this.lblWitnessedBy.IsEnabled = false;
        }
    }

    //Changed Regex to RegExp and IsMatch to test
    public ValidateURL(url: string): boolean {
        let RgxUrl: RegExp = new RegExp("^(ht|f)tp(s?)\:\/\/[0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*(:(0-9)*)*(\/?)([a-zA-Z0-9\-\.\?\,\'\/\\\+&amp;%\$#_]*)?$");
        return RgxUrl.test(url);
    }
    private lblCIFValue_MouseLeftButtonUp(sender: Object, e: MouseButtonEventArgs): void {
        if (ProfileData.ClinicalIncidentConfig != null && !String.IsNullOrEmpty(ProfileData.ClinicalIncidentConfig.Address) && this.ValidateURL(ProfileData.ClinicalIncidentConfig.Address)) {
            HtmlPage.Window.Invoke("LaunchClinicalIncidentForm", ProfileData.ClinicalIncidentConfig.Address);
        }
    }
    async CPSFSOpen():  Promise<CListItem>{
        this.oParam = AppContextInfo.OrganisationName;
        let oSelectedItem: CListItem = null;
        let returnValue: ScriptObject = ObjectHelper.CreateType<ScriptObject>(await HtmlPage.Window.Invoke("SFSCareProvider", this.oParam), ScriptObject);
        if (returnValue != null && returnValue.GetProperty("length") != null) {
            let nSelectCnt: number = Convert.ToInt32(returnValue.GetProperty("length"));
            let selectedValue: ScriptObject = ObjectHelper.CreateType<ScriptObject>(returnValue.GetProperty(0), ScriptObject);
            oSelectedItem = new CListItem();
            oSelectedItem.DisplayText = ObjectHelper.CreateType<string>(selectedValue.GetProperty("SurName"), String);
            if (!String.IsNullOrEmpty(ObjectHelper.CreateType<string>(selectedValue.GetProperty("ForeName"), String))) {
                oSelectedItem.DisplayText += " ";
                oSelectedItem.DisplayText += selectedValue.GetProperty("ForeName");
            }
            oSelectedItem.Value = ObjectHelper.CreateType<string>(selectedValue.GetProperty("OId"), String);
        }
        return oSelectedItem;
    }
    IsAuthencateCallInprogress: boolean = false;
    private ValidateUser(_SelectedUserType: SelectedUserType): void {
        let _MsgResxKey: string;
        if (_SelectedUserType == SelectedUserType.WitnessingUser) {
            _MsgResxKey = "WitnessAdminBy_Message";
        }
        else {
            _MsgResxKey = "AdminByWitness_Message";
        }
        if (this.objWitnessHelper == null) {
            this.objWitnessHelper = new WitnessHelper();
        }
        if (!this.IsAuthencateCallInprogress) {
            this.IsAuthencateCallInprogress = true;            
            this.objWitnessHelper.AuthenticateUser(this.objVM.PrescriberDetails.OID, Convert.ToInt64(this.objVM.FormViewerDetails.BasicDetails.RecordAdmin.WitnessByOID), this.objVM.FormViewerDetails.BasicDetails.RecordAdmin.WitnessBy, _SelectedUserType, (oAuthResult: AuthResult, _SelectedUserType: SelectedUserType) => {this.OnUserAuthCompleted(oAuthResult, _SelectedUserType) }, _MsgResxKey);
        }
    }
    public OnUserAuthCompleted(oAuthResult: AuthResult, _SelectedUserType: SelectedUserType): void {
        this.IsAuthencateCallInprogress = false;
        if (_SelectedUserType == SelectedUserType.WitnessingUser && (oAuthResult == AuthResult.FailedSinceSameUser || oAuthResult == AuthResult.Cancelled)) {            
            this.ClearWitnessedBySFS();
        }
        else if (oAuthResult == AuthResult.Success) {            
            this.objVM.FormViewerDetails.BasicDetails.RecordAdmin.bAutRecSuccess = true;
        }
    }
    private ClearWitnessedBySFS(): void {
        if (this.objVM != null && this.objVM.FormViewerDetails != null && this.objVM.FormViewerDetails.BasicDetails != null && this.objVM.FormViewerDetails.BasicDetails.RecordAdmin != null && this.objVM.FormViewerDetails.BasicDetails.RecordAdmin.WitnessByOID != null) {
            this.objVM.FormViewerDetails.BasicDetails.RecordAdmin.WitnessByOID = Convert.ToString(-1);
            this.objVM.FormViewerDetails.BasicDetails.RecordAdmin.WitnessBy = "";
        }
    }
    private DisposeFormEvents(): void {
        // if (this.objVM != null && this.objVM.FormViewerDetails != null && this.objVM.FormViewerDetails.BasicDetails != null && this.objVM.FormViewerDetails.BasicDetails.RecordAdmin != null) {
        //     this.objVM.FormViewerDetails.BasicDetails.RecordAdmin.OnWitnessUserSelected -= ValidateUser;
        //     this.objVM.FormViewerDetails.BasicDetails.RecordAdmin.GetWitnessRequiredEvent -= RecordAdmin_GetWitnessRequiredEvent;
        //     this.objVM.DoCleanUP();
        // }
        // sfsWitnessedby.OnGetItems -= sfsWitnessedby_OnGetItems;
        // iTimedtpAdminTime.ValueChanged -= iTimedtpAdminTime_ValueChanged;
        // lblDose.GotFocus -= lblDose_GotFocus;
    }
    private UserControl_Unloaded(sender: Object, e: RoutedEventArgs): void {
        this.DisposeFormEvents();
    }
    private cboRoute_SelectionChanged(sender: Object, e: SelectionChangedEventArgs): void {
        if ((this.objVM.FormViewerDetails.BasicDetails != null && this.objVM.FormViewerDetails.BasicDetails.RecordAdmin != null && (this.objVM.FormViewerDetails.BasicDetails.RecordAdmin.Route != null && this.objVM.FormViewerDetails.BasicDetails.RecordAdmin.Route.Tag != null && String.Compare(this.objVM.FormViewerDetails.BasicDetails.RecordAdmin.Route.Tag.ToString(), "1") == 0) && this.objVM.FormViewerDetails.BasicDetails.InfusionType != null && String.Compare(this.objVM.FormViewerDetails.BasicDetails.InfusionType.Value, InfusionTypesCode.INTERMITTENT) == 0 && (this.objVM.FormViewerDetails.BasicDetails.RecordAdmin != null)) || ((this.objVM.FormViewerDetails.BasicDetails != null && this.objVM.FormViewerDetails.BasicDetails.itemSubType != null && String.Compare(this.objVM.FormViewerDetails.BasicDetails.itemSubType, CConstants.SUBTYPE_BLOOD) == 0) && (this.objVM.FormViewerDetails.BasicDetails.InfusionType != null && String.Compare(this.objVM.FormViewerDetails.BasicDetails.InfusionType.Value, InfusionTypesCode.INTERMITTENT) == 0))) {
            this.lblDoseUOMValue.Visibility = Visibility.Visible;
            this.cboDoseUoMValue.Visibility = Visibility.Collapsed;
            this.lblDoseUoM.Visibility = Visibility.Collapsed;
            if (this.objVM.FormViewerDetails.BasicDetails.DoseType != null && !String.IsNullOrEmpty(this.objVM.FormViewerDetails.BasicDetails.DoseType.Value) && String.Compare(this.objVM.FormViewerDetails.BasicDetails.DoseType.Value, DoseTypeCode.CONDITIONAL, StringComparison.CurrentCultureIgnoreCase) == 0)
                if ((this.objVM.FormViewerDetails.BasicDetails.ConditionalDosingDetails == null) || (this.objVM.FormViewerDetails.BasicDetails.ConditionalDosingDetails != null && this.objVM.FormViewerDetails.BasicDetails.ConditionalDosingDetails.DoseDetails == null) || (this.objVM.FormViewerDetails.BasicDetails.ConditionalDosingDetails != null && this.objVM.FormViewerDetails.BasicDetails.ConditionalDosingDetails.DoseDetails != null && this.objVM.FormViewerDetails.BasicDetails.ConditionalDosingDetails.DoseDetails.Count == 0)) {
                    this.lblDoseUOMValue.Visibility = Visibility.Visible;
                    this.cboDoseUoMValue.Visibility = Visibility.Visible;
                    this.lblDoseUoM.Visibility = Visibility.Visible;
                }
            if (!String.Equals(this.objVM.FormViewerDetails.BasicDetails.InfusionType.Value, InfusionTypesCode.INTERMITTENT, StringComparison.InvariantCultureIgnoreCase)) {
                this.lblConcentration.Visibility = Visibility.Visible;
                //this.spConcentration.Visibility = Visibility.Visible;
                this.LayoutConcentrationVisible = Visibility.Visible;
                this.bgdConcentration.Visibility = Visibility.Visible;
                this.brdConcentration.Visibility = Visibility.Visible;
                this.SwitchStateForConcentrationFields();
            }
            this.lblInfusionperiod.Visibility = Visibility.Visible;
            this.spInfPeriod.Visibility = Visibility.Visible;
            //this.lblInfperioduom.Mandatory = true;
            this.bgdInfPeriod.Visibility = Visibility.Visible;
            this.bgdInfPeriod1 = Visibility.Visible;
            this.brdInfPeriod.Visibility = Visibility.Visible;
            this.brdInfPeriod1 = Visibility.Visible;
            if (!this.objVM.FormViewerDetails.BasicDetails.RecordAdmin.isBolusIntermittent) {
                this.lblbagvolume.Visibility = Visibility.Visible;
                this.cbobagUoMValue.Visibility = Visibility.Visible;
                this.stackbagvol.Visibility = Visibility.Visible;
                this.bgdbagvol.Visibility = Visibility.Visible;
                this.brdbagvol.Visibility = Visibility.Visible;
                this.lblLumen.Visibility = Visibility.Visible;
                this.txtLumen.Visibility = Visibility.Visible;
                this.bgdlumen.Visibility = Visibility.Visible;
                this.brdlumen.Visibility = Visibility.Visible;
                this.lblDose.Text = MedicationForm.lblDose_Text;
                this.lblDeliveryDevice.Visibility = Visibility.Visible;
                this.cboDeliveryDevice.Visibility = Visibility.Visible;
                this.bgddeldevice.Visibility = Visibility.Visible;
                this.brddeldevice.Visibility = Visibility.Visible;
                this.lblinfusiontrate.Mandatory = true;
                this.lblInfusionUOM.Mandatory = true;
                this.cmdinfratecal.Visibility = Visibility.Visible;
                this.cmddripratecal.Visibility = Visibility.Collapsed;
                this.lblinfusiontrate.Visibility = Visibility.Visible;
                this.txtRecinfusionrate.Visibility = Visibility.Visible;
                ToolTipService.SetToolTip(this.txtRecinfusionrate, Resource.RecordAdmin.txtRecinfusionrate_tooltip);
                this.bgdinfurate.Visibility = Visibility.Visible;
                this.brdinfurate.Visibility = Visibility.Visible;
                this.lblInfusionUOM.Visibility = Visibility.Visible;
                this.cboInfusionRateUOM.Visibility = Visibility.Visible;
                this.lblInfusionRateHifen.Visibility = Visibility.Visible;
                this.cboInfusionRatePerUOM.Visibility = Visibility.Visible;
                this.lbldriprate.Visibility = Visibility.Visible;
                this.txtdriprate.Visibility = Visibility.Visible;
                this.txtdriprate.IsReadOnly = true;
                this.lbldriprateValue.Visibility = Visibility.Visible;
                this.bgddriprate.Visibility = Visibility.Visible;
                this.brddriprate.Visibility = Visibility.Visible;
                this.lblRoute.Visibility = Visibility.Visible;
                this.cboRoute.Visibility = Visibility.Visible;
                this.bgdroute.Visibility = Visibility.Visible;
                this.brdroute.Visibility = Visibility.Visible;
                this.lblSite.Visibility = Visibility.Visible;
                this.cboSite.Visibility = Visibility.Visible;
                this.brdsite.Visibility = Visibility.Visible;
                this.bgdsite.Visibility = Visibility.Visible;
                this.lblcliniIncFrm.Visibility = Visibility.Collapsed;
                this.lblcliniIncFrmValue.Visibility = Visibility.Collapsed;
                this.bgdclin.Visibility = Visibility.Collapsed;
                this.brdClini.Visibility = Visibility.Collapsed;
                this.lblAdminDateTime.Text = Infusion.lbldatetiemgiven_txt;
                this.objVM.FormViewerDetails.BasicDetails.RecordAdmin.DoseMandatory = true;
                this.objVM.FormViewerDetails.BasicDetails.RecordAdmin.DoseUOMMandatory = true;
                this.lblInfusiondose.Visibility = Visibility.Visible;
                this.spInfDoseRate.Visibility = Visibility.Visible;
                this.bgdInfDoseRate.Visibility = Visibility.Visible;
                this.brdInfDoseRate.Visibility = Visibility.Visible;
                this.LayoutInfusionRate = Visibility.Visible;
            }
            else {
                this.lblinfusiontrate.Visibility = Visibility.Collapsed;
                this.txtRecinfusionrate.Visibility = Visibility.Collapsed;
                this.bgdinfurate.Visibility = Visibility.Collapsed;
                this.brdinfurate.Visibility = Visibility.Collapsed;
                this.lblInfusionUOM.Visibility = Visibility.Collapsed;
                this.cboInfusionRateUOM.Visibility = Visibility.Collapsed;
                this.lblInfusionRateHifen.Visibility = Visibility.Collapsed;
                this.cboInfusionRatePerUOM.Visibility = Visibility.Collapsed;
                this.lbldriprate.Visibility = Visibility.Collapsed;
                this.txtdriprate.Visibility = Visibility.Collapsed;
                this.txtdriprate.IsReadOnly = true;
                this.lbldriprateValue.Visibility = Visibility.Collapsed;
                this.cmddripratecal.Visibility = Visibility.Collapsed;
                this.cmdinfratecal.Visibility = Visibility.Collapsed;
                this.bgddriprate.Visibility = Visibility.Collapsed;
                this.brddriprate.Visibility = Visibility.Collapsed;
                this.lblbagvolume.Visibility = Visibility.Collapsed;
                this.cbobagUoMValue.Visibility = Visibility.Collapsed;
                this.stackbagvol.Visibility = Visibility.Collapsed;
                this.bgdbagvol.Visibility = Visibility.Collapsed;
                this.brdbagvol.Visibility = Visibility.Collapsed;
                this.lblDeliveryDevice.Visibility = Visibility.Collapsed;
                this.cboDeliveryDevice.Visibility = Visibility.Collapsed;
                this.bgddeldevice.Visibility = Visibility.Collapsed;
                this.brddeldevice.Visibility = Visibility.Collapsed;
                this.lblLumen.Visibility = Visibility.Collapsed;
                this.txtLumen.Visibility = Visibility.Collapsed;
                this.bgdlumen.Visibility = Visibility.Collapsed;
                this.brdlumen.Visibility = Visibility.Collapsed;
                this.lblInfusiondose.Visibility = Visibility.Collapsed;
                this.spInfDoseRate.Visibility = Visibility.Collapsed;
                this.bgdInfDoseRate.Visibility = Visibility.Collapsed;
                this.brdInfDoseRate.Visibility = Visibility.Collapsed;
                this.LayoutInfusionRate = Visibility.Collapsed;
            }
        }
        else if (this.objVM.FormViewerDetails.BasicDetails != null && this.objVM.FormViewerDetails.BasicDetails.itemSubType != null && String.Compare(this.objVM.FormViewerDetails.BasicDetails.itemSubType, CConstants.SUBTYPE_GAS) == 0) {
            this.lblinfusiontrate.Visibility = Visibility.Visible;
            this.bgdinfurate.Visibility = Visibility.Visible;
            this.brdinfurate.Visibility = Visibility.Visible;
            this.lblinfusiontrate.Text = Infusion.lblFlowRate_Text;
            this.lblinfusiontrate.Mandatory = true;
            this.lblDeliveryDevice.Visibility = Visibility.Visible;
            this.cboDeliveryDevice.Visibility = Visibility.Visible;
            this.bgddeldevice.Visibility = Visibility.Visible;
            this.brddeldevice.Visibility = Visibility.Visible;
            this.lblcliniIncFrm.Visibility = Visibility.Collapsed;
            this.lblAdminDateTime.Text = Infusion.lbldatetime_txt;
            this.lblDose.Visibility = Visibility.Collapsed;
            this.lblDoseUOMValue.Visibility = Visibility.Collapsed;
            this.cboDoseUoMValue.Visibility = Visibility.Collapsed;
            this.txtDoseValue.Visibility = Visibility.Collapsed;
            this.lblDoseUoM.Visibility = Visibility.Collapsed;
            this.bgddose.Visibility = Visibility.Collapsed;
            this.lblRoute.Visibility = Visibility.Visible;
            this.cboRoute.Visibility = Visibility.Visible;
            this.bgdroute.Visibility = Visibility.Visible;
            this.brdroute.Visibility = Visibility.Collapsed;
            this.lblSite.Visibility = Visibility.Collapsed;
            this.cboSite.Visibility = Visibility.Collapsed;
            this.brdsite.Visibility = Visibility.Collapsed;
            this.bgdsite.Visibility = Visibility.Collapsed;
            this.brdbatchno.Visibility = Visibility.Visible;
            this.lblcliniIncFrmValue.Visibility = Visibility.Collapsed;
            this.bgdclin.Visibility = Visibility.Collapsed;
            this.brdClini.Visibility = Visibility.Collapsed;
            if (this.objVM.FormViewerDetails.BasicDetails.InfusionDetails.Medicalgasdelivery != null && this.objVM.FormViewerDetails.BasicDetails.InfusionDetails.Medicalgasdelivery != null) {
                let oDeliveryDevice: CListItem = new CListItem();
                oDeliveryDevice = this.objVM.FormViewerDetails.BasicDetails.RecordAdmin.DeliveryDeviceList.Where(c => c.DisplayText == this.objVM.FormViewerDetails.BasicDetails.InfusionDetails.Medicalgasdelivery.DisplayText).Select(s => s).FirstOrDefault();
                if (oDeliveryDevice != null) {
                    this.objVM.FormViewerDetails.BasicDetails.RecordAdmin.DeliveryDevice = oDeliveryDevice;
                    this.objVM.FormViewerDetails.BasicDetails.RecordAdmin.IsEnabledDeliveryDevice = false;
                }
                else {
                    this.objVM.FormViewerDetails.BasicDetails.RecordAdmin.IsEnabledDeliveryDevice = true;
                }
            }
            let sInfDelDevice: string = this.objVM.FormViewerDetails.BasicDetails.InfusionDetails.DeliveryDeviceFreetext;
            if (!String.IsNullOrEmpty(sInfDelDevice)) {
                this.cboDeliveryDevice.Text = sInfDelDevice;
                this.objVM.FormViewerDetails.BasicDetails.RecordAdmin.IsEnabledDeliveryDevice = false;
            }
            else this.objVM.FormViewerDetails.BasicDetails.RecordAdmin.IsEnabledDeliveryDevice = true;
            this.lblHumidification.Visibility = Visibility.Visible;
            this.cboHumidification.Visibility = Visibility.Visible;
            this.bgdHumidification.Visibility = Visibility.Visible;
            this.brdHumidification.Visibility = Visibility.Visible;
            this.FlowrateLayout = Visibility.Visible;
            this.lblConcentration.Visibility = Visibility.Collapsed;
            //this.spConcentration.Visibility = Visibility.Collapsed;
            this.LayoutConcentrationVisible = Visibility.Collapsed;
            this.bgdConcentration.Visibility = Visibility.Collapsed;
            this.brdConcentration.Visibility = Visibility.Collapsed;
            this.lblInfusionperiod.Visibility = Visibility.Collapsed;
            this.spInfPeriod.Visibility = Visibility.Collapsed;
            this.bgdInfPeriod.Visibility = Visibility.Collapsed;
            this.bgdInfPeriod1 = Visibility.Collapsed;
            this.brdInfPeriod.Visibility = Visibility.Collapsed;
            this.brdInfPeriod1 = Visibility.Collapsed;
            this.lblInfusiondose.Visibility = Visibility.Collapsed;
            this.spInfDoseRate.Visibility = Visibility.Collapsed;
            this.bgdInfDoseRate.Visibility = Visibility.Collapsed;
            this.brdInfDoseRate.Visibility = Visibility.Collapsed;
            this.LayoutInfusionRate = Visibility.Collapsed;
        }
        else if (this.objVM.FormViewerDetails.BasicDetails != null && this.objVM.FormViewerDetails.BasicDetails.RecordAdmin != null && this.objVM.FormViewerDetails.BasicDetails.RecordAdmin.Route != null && this.objVM.FormViewerDetails.BasicDetails.RecordAdmin.Route.Tag != null && String.Compare(this.objVM.FormViewerDetails.BasicDetails.RecordAdmin.Route.Tag.ToString(), "0") == 0) {
            this.lblDoseUOMValue.Visibility = Visibility.Collapsed;
            this.cboDoseUoMValue.Visibility = Visibility.Visible;
            this.lblDoseUoM.Visibility = Visibility.Visible;
            this.lblinfusiontrate.Visibility = Visibility.Collapsed;
            this.txtRecinfusionrate.Visibility = Visibility.Collapsed;
            this.bgdinfurate.Visibility = Visibility.Collapsed;
            this.brdinfurate.Visibility = Visibility.Collapsed;
            this.lblInfusionUOM.Visibility = Visibility.Collapsed;
            this.cboInfusionRateUOM.Visibility = Visibility.Collapsed;
            this.lblInfusionRateHifen.Visibility = Visibility.Collapsed;
            this.cboInfusionRatePerUOM.Visibility = Visibility.Collapsed;
            this.lbldriprate.Visibility = Visibility.Collapsed;
            this.txtdriprate.Visibility = Visibility.Collapsed;
            this.txtdriprate.IsReadOnly = true;
            this.lbldriprateValue.Visibility = Visibility.Collapsed;
            this.cmddripratecal.Visibility = Visibility.Collapsed;
            this.cmdinfratecal.Visibility = Visibility.Collapsed;
            this.bgddriprate.Visibility = Visibility.Collapsed;
            this.brddriprate.Visibility = Visibility.Collapsed;
            this.lblbagvolume.Visibility = Visibility.Collapsed;
            this.cbobagUoMValue.Visibility = Visibility.Collapsed;
            this.stackbagvol.Visibility = Visibility.Collapsed;
            this.bgdbagvol.Visibility = Visibility.Collapsed;
            this.brdbagvol.Visibility = Visibility.Collapsed;
            this.lblDeliveryDevice.Visibility = Visibility.Collapsed;
            this.cboDeliveryDevice.Visibility = Visibility.Collapsed;
            this.bgddeldevice.Visibility = Visibility.Collapsed;
            this.brddeldevice.Visibility = Visibility.Collapsed;
            this.lblLumen.Visibility = Visibility.Collapsed;
            this.txtLumen.Visibility = Visibility.Collapsed;
            this.bgdlumen.Visibility = Visibility.Collapsed;
            this.brdlumen.Visibility = Visibility.Collapsed;
            this.FlowrateLayout = Visibility.Collapsed;
            this.lblConcentration.Visibility = Visibility.Collapsed;
            //this.spConcentration.Visibility = Visibility.Collapsed;
            this.LayoutConcentrationVisible = Visibility.Collapsed;
            this.bgdConcentration.Visibility = Visibility.Collapsed;
            this.brdConcentration.Visibility = Visibility.Collapsed;
            this.lblInfusionperiod.Visibility = Visibility.Collapsed;
            this.spInfPeriod.Visibility = Visibility.Collapsed;
            this.bgdInfPeriod.Visibility = Visibility.Collapsed;
            this.bgdInfPeriod1 = Visibility.Collapsed;
            this.brdInfPeriod.Visibility = Visibility.Collapsed;
            this.brdInfPeriod1 = Visibility.Collapsed;
            this.lblInfusiondose.Visibility = Visibility.Collapsed;
            this.spInfDoseRate.Visibility = Visibility.Collapsed;
            this.bgdInfDoseRate.Visibility = Visibility.Collapsed;
            this.brdInfDoseRate.Visibility = Visibility.Collapsed;
            this.LayoutInfusionRate = Visibility.Collapsed;
        }
        let sDoseType: string = this.objVM.FormViewerDetails.BasicDetails.DoseType != null ? this.objVM.FormViewerDetails.BasicDetails.DoseType.Value : String.Empty;
        if (this.objVM.FormViewerDetails.BasicDetails.AdminMethod != null && !String.IsNullOrEmpty(this.objVM.FormViewerDetails.BasicDetails.AdminMethod.Value) && this.objVM.FormViewerDetails.BasicDetails.IsAdminMethodVisible == Visibility.Collapsed) {
            if(this.Parent && this.Parent != null && this.Parent.Parent && this.Parent.Parent != null && this.Parent.Parent.KeepTabContent == false){
                this.objVM.FormViewerDetails.BasicDetails.AdminMethod = null;
            }
            else if(this.Parent && this.Parent != null && this.Parent.Parent && this.Parent.Parent != null && this.Parent.Parent.KeepTabContent && !this.DynamicAdminMethodNotIntiated){
                this.objVM.FormViewerDetails.BasicDetails.AdminMethod = null;
            }
        }
        else if (!String.Equals(sDoseType, DoseTypeCode.CONDITIONAL, StringComparison.CurrentCultureIgnoreCase) && (this.objVM.FormViewerDetails.BasicDetails.IsAdminMethodVisible == Visibility.Visible || (!String.IsNullOrEmpty(this.objVM.ItemMainType) && String.Compare(this.objVM.ItemMainType, CConstants.Formulary_Drug, StringComparison.CurrentCultureIgnoreCase) != 0))) {
            this.cboDoseUoMValue.ItemsSource = null;
        }
    }

    public iTextBoxForRecordAdministration(name: string): iTextBox {
        let txt: iTextBox = ObjectHelper.CreateObject(new iTextBox(), {
            Name: name,
        });
        return txt;
    }

    public iCheckBoxForRecordAdministration(name: string): iCheckBox {
        let chk: iCheckBox = ObjectHelper.CreateObject(new iCheckBox(), {
            Name: name,
        });
        chk.SetBinding(iCheckBox.IsCheckedProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.RecordAdmin.IsNoWitnessAvialable"), { Mode: BindingMode.TwoWay }));
        chk.SetBinding(iCheckBox.VisibilityProperty, ObjectHelper.CreateObject(new Binding(this.DataContext, "FormViewerDetails.BasicDetails.RecordAdmin.ChkNoWitness"), { Mode: BindingMode.TwoWay }));
        return chk;
    }

    public iComboBoxForRecordAdministration(name: string): iComboBox {
        let cbo: iComboBox = ObjectHelper.CreateObject(new iComboBox(), {
            Name: name,           
        });
        return cbo;
    }

    public iLabelForRecordAdministration(Name: string): iLabel {
        let ilabelTmp : iLabel =  ObjectHelper.CreateObject(new iLabel(), {
            Name: Name,            
        });
        ilabelTmp.SetBinding(iLabel.MandatoryProperty, ObjectHelper.CreateObject(new Binding(this.DataContext,"FormViewerDetails.BasicDetails.RecordAdmin.WitnessMandatory"),{ Mode: BindingMode.TwoWay }));
        return ilabelTmp;
    }

    public iDateTimePickerForRecordAdministration(name: string): iDateTimePicker {
        let dtp: iDateTimePicker = ObjectHelper.CreateObject(new iDateTimePicker(), {
            Name: name,            
        });
        return dtp;
    }
    public iTimeBoxForRecordAdministration(name: string): iTimeBox {
        let tp: iTimeBox = ObjectHelper.CreateObject(new iTimeBox(), {
            Name: name,            
        });
        return tp;
    }

    public iSFSForRecordAdministration(name: string): iSFS {
        let iSfs: iSFS = ObjectHelper.CreateObject(new iSFS(), {
            Name: name,            
        });
        return iSfs;
    }
    
}
