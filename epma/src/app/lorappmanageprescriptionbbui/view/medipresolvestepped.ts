import { AfterViewInit,ChangeDetectorRef, Component, Input, OnDestroy, OnInit, QueryList, Type, ViewChild, ViewChildren } from "@angular/core";
import { Border, Colors, DataTemplate, EventArgs, Grid, iButton, iCheckBox, iComboBox, iDateTimePicker, iLabel, iRadioButton, iTabItem, iTextBox, iUpDownBox, KeyEventArgs, MouseEventArgs, SolidColorBrush, TextBlock, UserControl } from "epma-platform/controls";
import DateTime from "epma-platform/DateTime";
import { AppDialogEventargs, AppDialogResult, CListItem, IProfileProp, List, ObservableCollection, SelectionChangedEventArgs, Visibility, WindowButtonType, StringComparison } from "epma-platform/models";
import { AppActivity, Convert, DayOfWeek, iMessageBox, MessageBoxButton, MessageBoxResult, MessageBoxType, MessageEventArgs, ProfileFactoryType } from "epma-platform/services";
import { Busyindicator } from "src/app/lorappcommonbb/busyindicator";
import { ClerkFormViewDeftBehaviour, ContextInfo, PatientContext } from "src/app/lorappcommonbb/utilities/globalvariable";
import { MCommonBB } from "src/app/lorappmedicationcommonbb/utilities/common";
import { AdminstrativeTimesVM } from "src/app/lorappmedicationcommonbb/viewmodel/adminstrativetimesvm";
import { GrdAdminstrativeTimesCols, ScheduleDetailsCols } from "src/app/lorappmedicationcommonbb/viewmodel/prescriptionitemdetailsvm";
import { eDoseValuesKind, ScheduleDetailsSteppedVM } from "src/app/lorappmedicationcommonbb/viewmodel/scheduledetailsvm";
import { ScheduleConfig } from "src/app/lorappslprofiletypes/medication";
import { DependencyPropertyChangedEventArgs, RoutedEventArgs, RoutedPropertyChangedEventArgs, TextChangedEventArgs, TextDecorations } from "src/app/shared/epma-platform/controls/Control";
import { ActivityTypes } from "../model/common";
import { CConstants, ConstDurationUOM, DoseTypeCode, InfusionTypesCode, PrescriptionTypes } from "../utilities/constants";
import { PrescriptionHelper } from "../utilities/prescriptionhelper";
import { ProfileData } from "../utilities/profiledata";
import { IPPMABaseVM } from "../viewmodel/ippmabasevm";
import { PrescriptionItemVM } from "../viewmodel/PrescriptionItemVM";
import { Resource } from "../resource";
import { FormviewerCommonData, QueryStringInfo } from "../utilities/globalvariable";
import { CommonBB } from "src/app/lorappcommonbb/utilities/common";
import TimeSpan from "epma-platform/TimeSpan";
import { medFormViewer } from "./medformviewer";
import { ChangeDose } from "./changedose";
import { Common } from "../utilities/common";
import { GridExtension, GridViewCellClickEventArgs, SelectionChangeEventArgs } from "src/app/shared/epma-platform/controls/epma-grid-helpers/grid-extension";
import { MeasurableObject } from "src/app/shared/epma-platform/soap-client/IPPMAManagePrescriptionWS";
import { PropertyChangedEventArgs } from "src/app/shared/epma-platform/controls/epma-tab/epma-tab.component";
import { MedicationCommonProfileData } from "src/app/lorappmedicationcommonbb/utilities/profiledata";
import { ScheduleDoseDtl } from "../viewmodel/BasicDetailsVM";
import { SVIconLaunchFrom } from "src/app/lorappmedicationcommonbb/utilities/constants";
import { MultipleDoseDetail } from "../viewmodel/MultipleDoseDetail";
import * as LorAppMedCommonBB from "src/app/lorappmedicationcommonbb/viewmodel/prescriptionitemdetailsvm"
import { ChangeDoseFooter } from "./changedosefooter";
import { ObjectHelper as Helper, ObjectHelper } from 'epma-platform/helper';
import { GridComponent, RowArgs } from "@progress/kendo-angular-grid";
import * as ControlStyles from "../../shared/epma-platform/controls/ControlStyles";
import { ContentControl } from '../../shared/epma-platform/controls/ContentControl';
import { MedSteppedFullPrescriptionVW } from "src/app/lorappmedicationcommonbb/view/medSteppedFullPrescriptionVW";
var that;

@Component({
    selector: 'medipresolvestepped',
    templateUrl: './medipresolvestepped.html',
    styleUrls: ['./medipresolvestepped.css'],
})

export class medipresolvestepped extends UserControl implements OnInit, AfterViewInit, OnDestroy {
    IsFreqChanged: boolean = true;
    IsRowSelectionThrUpDownBut: boolean = false;
    objfrm: PrescriptionItemVM;
    oChangingDose: ChangeDose;
    public isClerkVal: boolean;
    bIsStepped: boolean;
    args1: AppDialogEventargs;
    public oAdminTimesVM: AdminstrativeTimesVM = new AdminstrativeTimesVM();
    ScheduleDetailsColsDetails: ObservableCollection<ScheduleDetailsCols>;
    public ChangedDoseScheduleDetails: ScheduleDetailsSteppedVM;
    strDoseUOM: string = String.Empty;
    IsPeriodFrequency: boolean = false;
    IsDaywise: boolean = false;
    IsChangingDose: boolean = false;
    IsSteppedDoseChanged: boolean = false;
    isMedicationClerk: boolean = false;
    dLowerDose: number;
    dUpperDose: number;
    sDoseUOM: string = String.Empty;
    dDuration: number;
    dFrequency: string = String.Empty;
    dDurUOM: string = String.Empty;
    IsDefaultFixedTime: boolean = false;
    _sActionText: string = String.Empty;
    _IsStopDTTMUpdate: boolean = false;
    public _DefaultDoseUOM: CListItem;
    DynamicAddedOnceOnly: CListItem = null;
    DynamicAddedMinutesDuration: CListItem = null;
    public get sActionText(): string {
        return this._sActionText;
    }
    public set sActionText(value: string) {
        this._sActionText = value;
    }
    bDoseSafetymsg: boolean = false;
    iMsgBox: iMessageBox;
    dtCurrent: DateTime = CommonBB.GetServerDateTime();
    public IsDaywiseViewEnabled: boolean = false;
    public IsDaywiseViewClicked: boolean = false;
    public IsStartDateAvailable: boolean = true;
    public IsStopDateAvailable: boolean = true;
    public IsChangingDoseMezzaineLaunched: boolean = false;
    profile: ProfileFactoryType;
    public omedFormViewer: medFormViewer;
    DoseFromChangingDose: string = String.Empty;
    public AmendDurationDTTM: DateTime = DateTime.MinValue;
    private CanAddAdditionalDose: boolean = false;
    public IsAdditionalDoseConfirmMsgShown: boolean = false;
    private oAdditionalDoseAdminTimesVM: AdminstrativeTimesVM;
    private NewItemRowIndex: number = -1;
    public CanCloseFormViewerWithSVValidation: boolean;
    private IsStartDTTMMoveNextDay: boolean = false;
    private IsValidateForStartFromNextDayMsgShown: boolean = false;
    private _OrginalCanAddAdditionalDose: boolean = false;
    public bDuplicateAdminTimesPrompt: boolean = false;
    ScheduleDetails: ScheduleDetailsSteppedVM;

    public SVRegime: ContentControl;
    @ViewChild("SVRegimeTempRef", { read: ContentControl, static: false }) set _SVRegime(c: ContentControl) {
        if (c) { this.SVRegime = c; }
    };
    public LayoutRoot: Grid;
    @ViewChild("LayoutRootTempRef", { read: Grid, static: false }) set _LayoutRoot(c: Grid) {
        if (c) { this.LayoutRoot = c; }
    };
    public lblStartDatetime: iLabel;
    @ViewChild("lblStartDatetimeTempRef", { read: iLabel, static: false }) set _lblStartDatetime(c: iLabel) {
        if (c) { this.lblStartDatetime = c; }
    };
    public lblStartDatetimeValue: iLabel;
    @ViewChild("lblStartDatetimeValueTempRef", { read: iLabel, static: false }) set _lblStartDatetimeValue(c: iLabel) {
        if (c) { this.lblStartDatetimeValue = c; }
    };
    public lblStopDatetime: iLabel;
    @ViewChild("lblStopDatetimeTempRef", { read: iLabel, static: false }) set _lblStopDatetime(c: iLabel) {
        if (c) { this.lblStopDatetime = c; }
    };
    public lblStopDatetimeValue: iLabel;
    @ViewChild("lblStopDatetimeValueTempRef", { read: iLabel, static: false }) set _lblStopDatetimeValue(c: iLabel) {
        if (c) { this.lblStopDatetimeValue = c; }
    };
    public lblDose: iLabel;
    @ViewChild("lblDoseTempRef", { read: iLabel, static: false }) set _lblDose(c: iLabel) {
        if (c) { this.lblDose = c; }
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
    public lblInfusionRate: iLabel;
    @ViewChild("lblInfusionRateTempRef", { read: iLabel, static: false }) set _lblInfusionRate(c: iLabel) {
        if (c) { this.lblInfusionRate = c; }
    };
    public InfusionRateLayout: Grid;
    @ViewChild("InfusionRateLayoutTempRef", { read: Grid, static: false }) set _InfusionRateLayout(c: Grid) {
        if (c) { this.InfusionRateLayout = c; }
    };
    public txtInfusionRate: iTextBox;
    @ViewChild("txtInfusionRateTempRef", { read: iTextBox, static: false }) set _txtInfusionRate(c: iTextBox) {
        if (c) { this.txtInfusionRate = c; }
    };
    public lblInfusionhyf: iLabel;
    @ViewChild("lblInfusionhyfTempRef", { read: iLabel, static: false }) set _lblInfusionhyf(c: iLabel) {
        if (c) { this.lblInfusionhyf = c; }
    };
    public txtUpperInfusionRate: iTextBox;
    @ViewChild("txtUpperInfusionRateTempRef", { read: iTextBox, static: false }) set _txtUpperInfusionRate(c: iTextBox) {
        if (c) { this.txtUpperInfusionRate = c; }
    };
    public lblInfusionUOM: iLabel;
    @ViewChild("lblInfusionUOMTempRef", { read: iLabel, static: false }) set _lblInfusionUOM(c: iLabel) {
        if (c) { this.lblInfusionUOM = c; }
    };
    public cboInfRateNumUOM: iComboBox;
    @ViewChild("cboInfRateNumUOMTempRef", { read: iComboBox, static: false }) set _cboInfRateNumUOM(c: iComboBox) {
        if (c) { this.cboInfRateNumUOM = c; }
    };
    public lblInfusionRateslash: iLabel;
    @ViewChild("lblInfusionRateslashTempRef", { read: iLabel, static: false }) set _lblInfusionRateslash(c: iLabel) {
        if (c) { this.lblInfusionRateslash = c; }
    };
    public cboInfRateDenoUOM: iComboBox;
    @ViewChild("cboInfRateDenoUOMTempRef", { read: iComboBox, static: false }) set _cboInfRateDenoUOM(c: iComboBox) {
        if (c) { this.cboInfRateDenoUOM = c; }
    };
    public lblFrequency: iLabel;
    @ViewChild("lblFrequencyTempRef", { read: iLabel, static: false }) set _lblFrequency(c: iLabel) {
        if (c) { this.lblFrequency = c; }
    };
    public cboFrequency: iComboBox;
    @ViewChild("cboFrequencyTempRef", { read: iComboBox, static: false }) set _cboFrequency(c: iComboBox) {
        if (c) { this.cboFrequency = c; }
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
    public btnChangingDose: iButton;
    @ViewChild("btnChangingDoseTempRef", { read: iButton, static: false }) set _btnChangingDose(c: iButton) {
        if (c) { this.btnChangingDose = c; }
    };
    public lblVariable: iLabel;
    @ViewChild("lblVariableTempRef", { read: iLabel, static: false }) set _lblVariable(c: iLabel) {
        if (c) { this.lblVariable = c; }
    };
    public txtVariable: iTextBox;
    @ViewChild("txtVariableTempRef", { read: iTextBox, static: false }) set _txtVariable(c: iTextBox) {
        if (c) { this.txtVariable = c; }
    };
    public lblSlotTime: iLabel;
    @ViewChild("lblSlotTimeTempRef", { read: iLabel, static: false }) set _lblSlotTime(c: iLabel) {
        if (c) { this.lblSlotTime = c; }
    };
    public iRdBtnFixedTime: iRadioButton;
    @ViewChild("iRdBtnFixedTimeTempRef", { read: iRadioButton, static: false }) set _iRdBtnFixedTime(c: iRadioButton) {
        if (c) { this.iRdBtnFixedTime = c; }
    };
    public iRdBtndrgRoundTime: iRadioButton;
    @ViewChild("iRdBtndrgRoundTimeTempRef", { read: iRadioButton, static: false }) set _iRdBtndrgRoundTime(c: iRadioButton) {
        if (c) { this.iRdBtndrgRoundTime = c; }
    };
    public lblAdminisTime: iLabel;
    @ViewChild("lblAdminisTimeTempRef", { read: iLabel, static: false }) set _lblAdminisTime(c: iLabel) {
        if (c) { this.lblAdminisTime = c; }
    };
    grdAdminTimes: GridExtension = new GridExtension();
    @ViewChild('grdAdminTimesTempRef', { read: GridComponent, static: false }) set _grdAdminTimes(
        c: GridComponent
    ) {
        if (c) {
            this.grdAdminTimes.grid = c;
            this.grdAdminTimes.columns = c.columns;
        }
    }


    public lblDaysOfWeek: iLabel;
    @ViewChild("lblDaysOfWeekTempRef", { read: iLabel, static: false }) set _lblDaysOfWeek(c: iLabel) {
        if (c) { this.lblDaysOfWeek = c; }
    };
    public chkSunday: iCheckBox;
    @ViewChild("chkSundayTempRef", { read: iCheckBox, static: false }) set _chkSunday(c: iCheckBox) {
        if (c) { this.chkSunday = c; }
    };
    public chkMonday: iCheckBox;
    @ViewChild("chkMondayTempRef", { read: iCheckBox, static: false }) set _chkMonday(c: iCheckBox) {
        if (c) { this.chkMonday = c; }
    };
    public chkTuesday: iCheckBox;
    @ViewChild("chkTuesdayTempRef", { read: iCheckBox, static: false }) set _chkTuesday(c: iCheckBox) {
        if (c) { this.chkTuesday = c; }
    };
    public chkWednesday: iCheckBox;
    @ViewChild("chkWednesdayTempRef", { read: iCheckBox, static: false }) set _chkWednesday(c: iCheckBox) {
        if (c) { this.chkWednesday = c; }
    };
    public chkThursday: iCheckBox;
    @ViewChild("chkThursdayTempRef", { read: iCheckBox, static: false }) set _chkThursday(c: iCheckBox) {
        if (c) { this.chkThursday = c; }
    };
    public chkFriday: iCheckBox;
    @ViewChild("chkFridayTempRef", { read: iCheckBox, static: false }) set _chkFriday(c: iCheckBox) {
        if (c) { this.chkFriday = c; }
    };
    public chkSaturday: iCheckBox;
    @ViewChild("chkSaturdayTempRef", { read: iCheckBox, static: false }) set _chkSaturday(c: iCheckBox) {
        if (c) { this.chkSaturday = c; }
    };
    public cmdAdd: iButton;
    @ViewChild("cmdAddTempRef", { read: iButton, static: false }) set _cmdAdd(c: iButton) {
        if (c) { this.cmdAdd = c; }
    };
    public cmdUpdate: iButton;
    @ViewChild("cmdUpdateTempRef", { read: iButton, static: false }) set _cmdUpdate(c: iButton) {
        if (c) { this.cmdUpdate = c; }
    };
    public cmdRemove: iButton;
    @ViewChild("cmdRemoveTempRef", { read: iButton, static: false }) set _cmdRemove(c: iButton) {
        if (c) { this.cmdRemove = c; }
    };
    grdData: GridExtension = new GridExtension();
    @ViewChild('grdDataTempRef', { read: GridComponent, static: false }) set _grdData(
        c: GridComponent
    ) {
        if (c) {
            this.grdData.grid = c;
            this.grdData.columns = c.columns;
        }
    }

    public btnFullPresView: iButton;
    @ViewChild("btnFullPresViewTempRef", { read: iButton, static: false }) set _btnFullPresView(c: iButton) {
        if (c) { this.btnFullPresView = c; }
    };
    public brdAdditionalOptions: Border;
    @ViewChild("brdAdditionalOptionsTempRef", { read: Border, static: false }) set _brdAdditionalOptions(c: Border) {
        if (c) { this.brdAdditionalOptions = c; }
    };
    public lblAdditionalOptionsBorder: TextBlock;
    @ViewChild("lblAdditionalOptionsBorderTempRef", { read: TextBlock, static: false }) set _lblAdditionalOptionsBorder(c: TextBlock) {
        if (c) { this.lblAdditionalOptionsBorder = c; }
    };
    public lblForAdminMessage1: iLabel;
    @ViewChild("lblForAdminMessage1TempRef", { read: iLabel, static: false }) set _lblForAdminMessage1(c: iLabel) {
        if (c) { this.lblForAdminMessage1 = c; }
    };
    public chkForAdminOption1: iCheckBox;
    @ViewChild("chkForAdminOption1TempRef", { read: iCheckBox, static: false }) set _chkForAdminOption1(c: iCheckBox) {
        if (c) { this.chkForAdminOption1 = c; }
    };
    public lblForAdminMessage2: iLabel;
    @ViewChild("lblForAdminMessage2TempRef", { read: iLabel, static: false }) set _lblForAdminMessage2(c: iLabel) {
        if (c) { this.lblForAdminMessage2 = c; }
    };
    public chkForAdminOption2: iCheckBox;
    @ViewChild("chkForAdminOption2TempRef", { read: iCheckBox, static: false }) set _chkForAdminOption2(c: iCheckBox) {
        if (c) { this.chkForAdminOption2 = c; }
    };
    public _contentLoaded: Boolean;
    @ViewChild("_contentLoadedTempRef", { read: Boolean, static: false }) set __contentLoaded(c: Boolean) {
        if (c) { this._contentLoaded = c; }
    };



    private CheckBoxColumn: QueryList<iCheckBox>;
    @ViewChildren('CheckBoxColumnTempRef', { read: iCheckBox }) set _SelectCheckbox(c: QueryList<iCheckBox>) {
        if (c) {
            this.CheckBoxColumn = c;
        }
    }

    @ViewChildren('grdDataDTTempRef', { read: DataTemplate }) set _grdDataDataTemplates(c: QueryList<DataTemplate>) {
        if (c) {
            this.grdData.dataTemplates = c;
        }
    }

    @ViewChildren('CheckBoxColumnTempRef', { read: iCheckBox }) set _RowCheckBoxCollection(c: QueryList<iCheckBox>) {
        if (c) {
            this.grdData.RowCheckBoxCollection = c;
        }
    }

    public _chkGridSelectionRef: QueryList<iCheckBox>;
    @ViewChildren("CheckBoxColumnTempRef", { read: iCheckBox }) set __chkGridSelectionRef(c: QueryList<iCheckBox>) {
        if (c) { this._chkGridSelectionRef = c; }
    };
    public _chkHeaderRowCheckbox: iCheckBox;
    @ViewChild("chkGridHeaderSelectionRef", { read: iCheckBox }) set ___chkRowCheckbox(c: iCheckBox) {
        if (c) { this._chkHeaderRowCheckbox = c; }
    };

    itxtDose_KeyDown_Func = (s, e) => { Object.keys(that).forEach((prop) => (this[prop] = that[prop])); this.itxtDose_KeyDown(s, e) };
    cboInfRateNumUOM_SelectionChanged_Func = (s, e) => { Object.keys(that).forEach((prop) => (this[prop] = that[prop])); this.cboInfRateNumUOM_SelectionChanged(s, e) };
    cboUOM_KeyUp_Func = (s, e) => { Object.keys(that).forEach((prop) => (this[prop] = that[prop])); this.cboUOM_KeyUp(s, e) };
    cboFrequency_KeyUp_Func = (s, e) => { Object.keys(that).forEach((prop) => (this[prop] = that[prop])); this.cboFrequency_KeyUp(s, e) };
    udDuration_KeyDown_Func = (s, e) => { Object.keys(that).forEach((prop) => (this[prop] = that[prop])); this.udDuration_KeyDown(s, e) };
    cboInfRateDenoUOM_SelectionChanged_Func = (s, e) => { Object.keys(that).forEach((prop) => (this[prop] = that[prop])); this.cboInfRateDenoUOM_SelectionChanged(s, e) };
    cboFrequency_SelectionChanged_Func = (s, e) => { Object.keys(that).forEach((prop) => (this[prop] = that[prop])); this.cboFrequency_SelectionChanged(s, e) };

    public resKey = Resource.MedicationForm;
    public resKey1 = Resource.Infusion;
    public Styles = ControlStyles;
    public flgMsgBoxZero:boolean = true;

    override _DataContext: PrescriptionItemVM;
    override get DataContext() {
        return this._DataContext;
    }
    @Input() override set DataContext(value: PrescriptionItemVM) {
        console.log("Medipresolve.DataContextSetter ", this._DataContext, value);
        this._DataContext = value;
    }
    constructor(private cd?: ChangeDetectorRef) {
        super();
        that = this;
        this.iMsgBox = ObjectHelper.CreateObject(new iMessageBox(), { Title: "Lorenzo" });
        this.iMsgBox.MessageBoxClose = (s, e) => { this.iMsgBox_MessageBoxClose(s, e); };
    }
    ngOnInit(): void {
        // this.grdData.RowIndicatorVisibility = Visibility.Collapsed;
        this.grdData.IsRowClickCheckboxSelection = true;
        this.grdData.RestrictContentClickUnSelectionColIndex = 1;
        this.grdData.onCellClick = (s, e) => { this.grdData_onCellClick(s, e); };
    }
    ngOnDestroy(): void {
        this.medipresolvestepped_UnLoaded({}, null);
    }

    @Input() MedIpResolveSteppedLoadedFunc: Function;
    ngAfterViewInit(): void {
        this.grdData.GenerateColumns();
        this.grdAdminTimes.GenerateColumns();
        this.medipresolvestepped_Loaded({}, null);
        this.grdData.SetBinding('data', this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails);
        this.grdData.UnselectAll();         
        this.cd?.detectChanges();
        this.grdData.SelectedItem = this.objfrm.FormViewerDetails.BasicDetails.SelectedDoseDetail;       
        if(this.grdData.SelectedItem !=null)
        {
            if(this.grdData.SelectedItem.StepSequenceNo > 0){
                this._chkGridSelectionRef.toArray()[(this.grdData.SelectedItem.StepSequenceNo-1)].IsChecked =true;
            }else{
                this._chkGridSelectionRef.toArray()[(this.grdData.SelectedItem.StepSequenceNo)].IsChecked =true;
            }
            this.grdData.UpdateCheckBoxSelection(this._chkHeaderRowCheckbox, this._chkGridSelectionRef, false);  
            this.grdData_SelectionChanged({}, {});      
        }  
             
        if( this.objfrm != null && this.objfrm.FormViewerDetails != null)
        this.objfrm.FormViewerDetails.IsFlgStpCheck =true;      
    }

    GridHeaderCheckboxChange_Func = (s, e) => {
        Object.keys(that).forEach((prop) => (this[prop] = that[prop])); this.GridHeaderCheckboxChange(s, e);
    }
    GridHeaderCheckboxChange(s, e) {
        this.grdData.UpdateCheckBoxSelection(this._chkHeaderRowCheckbox, this._chkGridSelectionRef, true, this.grdData.ItemsSource, this.grdData);

        let _selectionChangeEventArgs: SelectionChangeEventArgs = {};
        let _selectedRows: RowArgs[] = [];
        if (this.grdData.selectedRows?.length > 0) {
            let item: RowArgs = { dataItem: this.grdData.selectedRows[0], index: 0 };
            _selectedRows.push(item);
        }
        _selectionChangeEventArgs.selectedRows = _selectedRows;
        this.grdData_SelectionChanged(s, _selectionChangeEventArgs);

        if (this._chkHeaderRowCheckbox.IsChecked) {
            // this.HandlMoveUpDownEnabling();
            // this.EnableDisableAdd();          
            // this.grdData_SelectionChanged({}, {});
            //this.cmdRemove.IsEnabled = true;
            // this.cmdAdd.IsEnabled = false;
            // this.cmdUpdate.IsEnabled = true;
            this.btnFullPresView.IsEnabled = false;
        } else {
            // this.grdData_SelectionChanged({}, {});
            // this.cmdRemove.IsEnabled = false;
            //this.cmdAdd.IsEnabled = false;
            //this.cmdUpdate.IsEnabled = false;
            this.btnFullPresView.IsEnabled = true;
        }
    }
    GridRowCheckboxChange_Func = (s, e) => {
        Object.keys(that).forEach((prop) => (this[prop] = that[prop])); this.GridRowCheckboxChange(s, e);
    }
    GridRowCheckboxChange(s, e) {
        this.grdData.UpdateCheckBoxSelection(this._chkHeaderRowCheckbox, this._chkGridSelectionRef, false);
    }
    iMsgBox_MessageBoxClose(sender: Object, e: MessageEventArgs): void {
        if (this.iMsgBox != null) {
            let sCtrlID: string = ObjectHelper.CreateType<string>(this.iMsgBox.Tag, String);
            if (!String.IsNullOrEmpty(sCtrlID)) {
                if (String.Equals(sCtrlID, "dtpStartDate", StringComparison.InvariantCultureIgnoreCase) && this.omedFormViewer != null && this.omedFormViewer.ftbFormViewDetails != null) {
                    let oBasicDetailFauxTab: iTabItem = this.omedFormViewer.ftbFormViewDetails.GetItem("frmBasic");
                    if (oBasicDetailFauxTab != null && oBasicDetailFauxTab.Content != null) {
                        let oBasicDetailFauxTabContent: UserControl = ObjectHelper.CreateType<UserControl>(oBasicDetailFauxTab.Content, UserControl);
                        if (oBasicDetailFauxTabContent != null) {
                            let ctrlToSetFocus: Object = oBasicDetailFauxTabContent.FindName(sCtrlID);
                            if (ctrlToSetFocus != null) {
                                let dtpStartDate: iDateTimePicker = ObjectHelper.CreateType<iDateTimePicker>(ctrlToSetFocus, iDateTimePicker);
                                if (dtpStartDate != null) {
                                    dtpStartDate.Focus();
                                }
                            }
                        }
                    }
                }
                else {
                    let ctrlToSetFocus: Object = this.FindName(sCtrlID);
                    if (ctrlToSetFocus != null) {
                        let ctrlType: string = ObjectHelper.GetType(ctrlToSetFocus);//Needs to return control type name via constructor
                        if (ctrlType.Equals("iTextBox")) {
                            (ObjectHelper.CreateType<iTextBox>(ctrlToSetFocus, iTextBox)).Focus();
                        }
                        else if (ctrlType.Equals("iComboBox")) {
                            (ObjectHelper.CreateType<iComboBox>(ctrlToSetFocus, iComboBox)).Focus();
                        }
                        else if (ctrlType.Equals("iUpDownBox")) {
                            (ObjectHelper.CreateType<iUpDownBox>(ctrlToSetFocus, iUpDownBox)).Focus();
                        }
                        else if (ctrlType.Equals("iButton")) {
                            (ObjectHelper.CreateType<iButton>(ctrlToSetFocus, iButton)).Focus();
                        }
                        else if (ctrlType.Equals("CheckBox")) {
                            (ObjectHelper.CreateType<iCheckBox>(ctrlToSetFocus, iCheckBox)).Focus();
                        }
                    }
                }
            }
        }
    }
    medipresolvestepped_Loaded(sender: Object, e: RoutedEventArgs): void {
        if (this.omedFormViewer == null) {
            this.omedFormViewer = CommonBB.FindParent<medFormViewer>(this, 'medFormViewer');
        }
        if (this.omedFormViewer != null) {
            setTimeout(() => {
                this.omedFormViewer.AutoScrollView();
                this.txtLowerDose?.Focus();
            }, 10);
        }
        let IsMultiInfusionRoutes: boolean = false;
        this.isClerkVal = (String.Compare(PatientContext.PrescriptionType, PrescriptionTypes.Clerking, StringComparison.CurrentCultureIgnoreCase) == 0) ? true : false;
        if (this.isClerkVal) {
            this.lblDose.Mandatory = false;
            this.lblUOM.Mandatory = false;
            this.lblFrequency.Mandatory = false;
        }
        else {
            this.lblDose.Mandatory = true;
            this.lblUOM.Mandatory = true;
            this.lblFrequency.Mandatory = true;
        }
        if (this.DataContext instanceof PrescriptionItemVM) {
            this.objfrm = ObjectHelper.CreateType<PrescriptionItemVM>(this.DataContext, PrescriptionItemVM);
            if (this.IsSteppedDoseChanged) {
                this.objfrm.FormViewerDetails.IsSteppedDoseDetailsModified = this.IsSteppedDoseChanged;
            }
            else if (!String.IsNullOrEmpty(this.txtLowerDose.Text) || !String.IsNullOrEmpty(this.txtUpperDose.Text)) {
                this.objfrm.FormViewerDetails.IsSteppedDoseDetailsModified = true;
            }
            if (this.objfrm != null && this.objfrm.FormViewerDetails != null && this.objfrm.FormViewerDetails.BasicDetails != null) {
                this.IsAdditionalDoseConfirmMsgShown = this.objfrm.FormViewerDetails.BasicDetails.IsAdditionalDoseConfirmMsgShown;
                if (this.objfrm.ActionCode == ActivityTypes.Reorder && this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails != null && this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails.Count > 0 && String.Equals(PatientContext.PrescriptionType, PrescriptionTypes.ForAdministration, StringComparison.CurrentCultureIgnoreCase) && String.IsNullOrEmpty(this.objfrm.FormViewerDetails.BasicDetails.RecordAdminMsg1)) {
                    this.objfrm.FormViewerDetails.BasicDetails.SetAdditionalOptionMessage();
                }
                if (String.Equals(PatientContext.PrescriptionType, PrescriptionTypes.ForAdministration, StringComparison.CurrentCultureIgnoreCase) && (this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails == null || this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails.Count == 0)) {
                    this.objfrm.FormViewerDetails.BasicDetails.FollowUpStatMessage = String.Empty;
                    this.objfrm.FormViewerDetails.BasicDetails.RecordAdminMsg1 = String.Empty;
                    this.objfrm.FormViewerDetails.BasicDetails.FollowUpOrStat = '\0';
                }
                if (this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails != null && this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails.Count > 0) {
                    let gridContainsInfusionRate: boolean = false;
                    this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails.forEach((dose) => {
                        if (!String.IsNullOrEmpty(dose.InfusionRate)) {
                            gridContainsInfusionRate = true;
                        }
                    });
                    if (!gridContainsInfusionRate && !this.objfrm.FormViewerDetails.BasicDetails.IsenableInfusionPeriod) {
                        this.objfrm.FormViewerDetails.BasicDetails.IsenableInfusionPeriod = true;
                    }
                    else if (gridContainsInfusionRate && this.objfrm.FormViewerDetails.BasicDetails.IsenableInfusionPeriod) {
                        this.objfrm.FormViewerDetails.BasicDetails.IsenableInfusionPeriod = false;
                        if (this.objfrm.FormViewerDetails.BasicDetails.InfusionDetails != null) {
                            if (!String.IsNullOrEmpty(this.objfrm.FormViewerDetails.BasicDetails.InfusionDetails.InfusionPeriod)) {
                                this.objfrm.FormViewerDetails.BasicDetails.InfusionDetails.InfusionPeriod = String.Empty;
                            }
                            if (this.objfrm.FormViewerDetails.BasicDetails.InfusionDetails.InfusionPeriodUom != null) {
                                this.objfrm.FormViewerDetails.BasicDetails.InfusionDetails.InfusionPeriodUom = null;
                            }
                        }
                    }
                }
            }
            this.objfrm.FormViewerDetails.BasicDetails.PropertyChanged = (s, e) => { this.BasicDetails_PropertyChanged(s, e); };
            this.isMedicationClerk = (this.objfrm != null && String.Compare(this.objfrm.SourcePrescriptionType, PrescriptionTypes.Clerking, StringComparison.CurrentCultureIgnoreCase) == 0) ? true : false;
            if (Object.keys(sender).length!=0) {
                this.txtLowerDose.Focus();            
            }
            if (this.objfrm.FormViewerDetails.BHasFormViewParams && this.objfrm.FormViewerDetails.BasicControls != null && this.objfrm.FormViewerDetails.BasicControls.Count() > 0) {
                this.IsStartDateAvailable = (this.objfrm.FormViewerDetails.BasicControls.Contains("CC_STARTDTTM")) ? true : false;
                this.IsStopDateAvailable = (this.objfrm.FormViewerDetails.BasicControls.Contains("CC_STOPDTTM")) ? true : false;
            }
            if (this.objfrm.FormViewerDetails.BasicDetails != null && DateTime.NotEquals(this.objfrm.FormViewerDetails.BasicDetails.StartDTTM, DateTime.MinValue) && this.IsStartDateAvailable) {
                let dtStartDTTM: DateTime;
                if (DateTime.NotEquals(this.objfrm.FormViewerDetails.BasicDetails.StartPrescriptionTime, DateTime.MinValue)) {
                    dtStartDTTM = this.objfrm.FormViewerDetails.BasicDetails.StartDTTM.Date.AddTime(this.objfrm.FormViewerDetails.BasicDetails.StartPrescriptionTime);
                }
                else {
                    dtStartDTTM = this.objfrm.FormViewerDetails.BasicDetails.StartDTTM.Date;
                }
                this.lblStartDatetimeValue.Text = " " + dtStartDTTM.ToUserDateTimeString("dd-MMM-yyyy HH:mm");
            }
            else if (PatientContext.PrescriptionType == PrescriptionTypes.Clerking) {
                if (this.objfrm.ActionCode == ActivityTypes.Amend && this.objfrm.FormViewerDetails.BasicDetails != null && this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails.Count > 0) {
                    let _StartDTTM: DateTime = this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails[0].StartDTTM;
                    this.lblStartDatetimeValue.Text = " " + _StartDTTM.ToUserDateTimeString("dd-MMM-yyyy HH:mm");
                }
                else if (this.objfrm.FormViewerDetails.BasicDetails.Partialdate) {
                    let dtStartDTTM: DateTime = this.objfrm.FormViewerDetails.BasicDetails.GetClerkingParialDate();
                    if (DateTime.NotEquals(dtStartDTTM, DateTime.MinValue) && dtStartDTTM.Year > CConstants.DateTimeMinYear) {
                        this.lblStartDatetimeValue.Text = " " + dtStartDTTM.ToUserDateTimeString("dd-MMM-yyyy HH:mm");
                    }
                    else {
                        dtStartDTTM = CommonBB.GetServerDateTime().Date;
                        this.lblStartDatetimeValue.Text = " " + dtStartDTTM.ToUserDateTimeString("dd-MMM-yyyy HH:mm");
                    }
                }
                else {
                    let dtStartDTTM: DateTime = CommonBB.GetServerDateTime().Date;
                    this.lblStartDatetimeValue.Text = " " + dtStartDTTM.ToUserDateTimeString("dd-MMM-yyyy HH:mm");
                }
            }
            else {
                this.lblStartDatetimeValue.Text = String.Empty;
            }
            if (this.objfrm.FormViewerDetails.BasicDetails != null && DateTime.NotEquals(this.objfrm.FormViewerDetails.BasicDetails.StopDate, DateTime.MinValue) && this.IsStopDateAvailable) {
                let dtEndDTTM: DateTime;
                if (ObjectHelper.HasValue(this.objfrm.FormViewerDetails.BasicDetails.StopPrescriptionTime)) {
                    dtEndDTTM = this.objfrm.FormViewerDetails.BasicDetails.StopDate.Date.Add(this.objfrm.FormViewerDetails.BasicDetails.StopPrescriptionTime.Value.TimeOfDay);
                }
                else {
                    dtEndDTTM = this.objfrm.FormViewerDetails.BasicDetails.StopDate.Date;
                }
                this.lblStopDatetimeValue.Text = " " + dtEndDTTM.ToUserDateTimeString("dd-MMM-yyyy HH:mm");
                this.objfrm.FormViewerDetails.BasicDetails.IsStopDTTMAutoUpdate = true;
            }
            else {
                this.lblStopDatetimeValue.Text = String.Empty;
            }
            if (this.objfrm != null && this.objfrm.FormViewerDetails != null && this.objfrm.FormViewerDetails.BasicDetails != null) {
                this.btnFullPresView.IsEnabled = true;
            }
        }
        if (ProfileData.ScheduleConfig == null) {
            let profile: ProfileFactoryType = new ProfileFactoryType();
            profile.OnProfileLoaded = (s, e) => { this.profile_OnProfileLoaded(s, e); };
            profile.GetProfile<ScheduleConfig>("VW_MEDICONFIG", "MEDSCHEDULECONFIG");
        }
        else {
            this.SetProfileData();
        }
        let WeeKfreqSel: boolean = false;
        if (this.cboFrequency.SelectedItem != null) {
            let SelFreq: CListItem = new CListItem();
            SelFreq = (ObjectHelper.CreateType<CListItem>(this.cboFrequency.SelectedItem, CListItem));
            if (SelFreq != null && SelFreq.Tag != null && SelFreq.Tag instanceof (Array<string> as typeof Array<string>)) {
                let FreqTag: string[] = ObjectHelper.CreateType<string[]>(SelFreq.Tag, Array<string>);
                if (FreqTag != null && FreqTag.length > 0) {
                    let oWeek = FreqTag.Where(oitem => String.Equals(oitem, "CC_MEDDRSN2"));
                    if (oWeek != null && oWeek.Count() > 0) {
                        WeeKfreqSel = true;
                    }
                }
            }
        }
        if (this.grdData != null && (this.grdData.GetSelectedRows() == null || (this.grdData.GetSelectedRows() != null && this.grdData.GetSelectedRows().Count == 0))) {
            if (!WeeKfreqSel)
                this.InVisibileDayOfWeek();
        }
        this.iRdBtndrgRoundTime.IsEnabled = false;
        this.iRdBtnFixedTime.IsEnabled = false;
        if (this.objfrm != null && this.objfrm.FormViewerDetails != null && this.objfrm.FormViewerDetails.BasicDetails != null && this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails != null && this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails.Count > 0) {
            let nLastDoseIndex: number = this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails.Count - 1;
            this.cmdAdd.IsEnabled = this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails[nLastDoseIndex].Duration != 0 && this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails[nLastDoseIndex].DurationUOM != null && !String.IsNullOrEmpty(this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails[nLastDoseIndex].DurationUOM.Value);
            let nSelectedRowCount: number = this.grdData.GetSelectedRowCount();
            if (nSelectedRowCount == 1) {
                this.cmdAdd.IsEnabled = false;
            }
        }
        if (this.objfrm.FormViewerDetails.BasicDetails.IsAllowMultiRoute && this.objfrm.FormViewerDetails.BasicDetails.DefaultDetails.Routes != null && this.objfrm.FormViewerDetails.BasicDetails.DefaultDetails.Routes != null) {
            if (this.objfrm.FormViewerDetails.BasicDetails.Route != null)
                IsMultiInfusionRoutes = !Common.IsNonInfusionMultiRoutes(this.objfrm.FormViewerDetails.BasicDetails.DefaultDetails.Routes);
        }
        if (PatientContext.IsINFUSIONON && (this.objfrm.FormViewerDetails.BasicDetails.Route != null && this.objfrm.FormViewerDetails.BasicDetails.Route.Tag != null && String.Compare(this.objfrm.FormViewerDetails.BasicDetails.Route.Tag.ToString(), "1") == 0) || IsMultiInfusionRoutes) {
            this.txtUpperInfusionRate.IsEnabled = false;
            if ((this.objfrm.FormViewerDetails.BasicDetails.InfusionType != null && !String.IsNullOrEmpty(this.objfrm.FormViewerDetails.BasicDetails.InfusionType.Value) && (String.Equals(this.objfrm.FormViewerDetails.BasicDetails.InfusionType.Value, InfusionTypesCode.CONTINUOUS) || String.Equals(this.objfrm.FormViewerDetails.BasicDetails.InfusionType.Value, InfusionTypesCode.SINGLEDOSEVOLUME) || String.Equals(this.objfrm.FormViewerDetails.BasicDetails.InfusionType.Value, InfusionTypesCode.FLUID)) || this.objfrm.FormViewerDetails.BasicDetails.IsInfContiniousFormLoaded)) {
                this.lblDose.Mandatory = false;
                this.txtLowerDose.IsEnabled = false;
                this.txtUpperDose.IsEnabled = false;
                this.lblDose.IsEnabled = false;
                this.lblUOM.Mandatory = false;
                this.lblUOM.IsEnabled = false;
                this.objfrm.FormViewerDetails.BasicDetails.Isdoseenable = false;
                this.lblFrequency.Mandatory = false;
                this.lblFrequency.IsEnabled = false;
                this.cboFrequency.IsEnabled = false;
                this.objfrm.FormViewerDetails.BasicDetails.InfusionDetails.InfusRateVisi = Visibility.Visible;
                if (this.isClerkVal)
                    this.objfrm.FormViewerDetails.BasicDetails.InfusionDetails.IsInfusRateMand = false;
                else this.objfrm.FormViewerDetails.BasicDetails.InfusionDetails.IsInfusRateMand = true;
                this.btnChangingDose.IsEnabled = false;
                this.grdAdminTimes.IsEnabled = false;
                this.grdData.Columns["Variable"].Header = "Instructions";
                this.grdData.Columns["Dosedet"].IsVisible = false;
                this.grdData.Columns["Frequency"].IsVisible = false;
                this.grdData.Columns["AdminTimes"].IsVisible = false;
                this.grdData.Columns["Infusionrate"].IsVisible = true;
            }
            else if (this.objfrm.FormViewerDetails.BasicDetails.InfusionType != null && this.objfrm.FormViewerDetails.BasicDetails.InfusionType.Value == InfusionTypesCode.INTERMITTENT) {
                if (this.isClerkVal) {
                    this.lblDose.Mandatory = false;
                    this.lblUOM.Mandatory = false;
                    this.lblFrequency.Mandatory = false;
                }
                else {
                    this.lblDose.Mandatory = true;
                    this.lblUOM.Mandatory = true;
                    this.lblFrequency.Mandatory = true;
                    // this.lblAdminisTime.Mandatory = true;
                }
                this.lblDose.IsEnabled = true;
                this.lblUOM.IsEnabled = true;
                this.lblFrequency.IsEnabled = true;
                this.objfrm.FormViewerDetails.BasicDetails.InfusionDetails.InfusRateVisi = Visibility.Visible;
                this.objfrm.FormViewerDetails.BasicDetails.InfusionDetails.IsInfusRateMand = false;
                this.btnChangingDose.IsEnabled = false;
                this.grdAdminTimes.IsEnabled = true;
                this.grdData.Columns["Variable"].Header = "Variable dose instructions";
                this.grdData.Columns["Dosedet"].IsVisible = true;
                this.grdData.Columns["Frequency"].IsVisible = true;
                this.grdData.Columns["AdminTimes"].IsVisible = true;
                this.grdData.Columns["Infusionrate"].IsVisible = true;
            }
        }
        else {
            this.objfrm.FormViewerDetails.BasicDetails.InfusionDetails.InfusRateVisi = Visibility.Collapsed;
            this.grdData.Columns["Infusionrate"].IsVisible = false;
            this.txtLowerDose.IsEnabled = true;
            this.txtUpperDose.IsEnabled = true;
            this.lblDose.IsEnabled = true;
            this.lblUOM.IsEnabled = true;
            this.cboUOM.IsEnabled = true;
            this.lblFrequency.IsEnabled = true;
            this.objfrm.FormViewerDetails.BasicDetails.IsFreqenable = true;
        }
        this.DefaultDoseUOMForSubSequentSteps();

        if (this.objfrm.FormViewerDetails.BasicDetails.IsNotInPatientSteppedVariableAmend
            && (this.objfrm.PrescriptionItemStatus == CConstants.DISCONTINUED
                || this.objfrm.PrescriptionItemStatus == CConstants.COMPLETED)) {
            this.objfrm.FormViewerDetails.BasicDetails.IsNotInPatientSteppedVariableAmend = false;
        }

        if (!this.objfrm.FormViewerDetails.BasicDetails.IsNotInPatientSteppedVariableAmend) {
            this.cboUOM.IsEnabled = false;
            this.txtLowerDose.IsEnabled = false;
            this.txtUpperDose.IsEnabled = false;
            this.lblUOM.IsEnabled = false;
            this.lblDose.IsEnabled = false;
            this.lblFrequency.IsEnabled = false;
            this.cmdAdd.IsEnabled = false;
            this.lblDuration.IsEnabled = false;
            this.udDuration.IsEnabled = false;
            this.cboDuration.IsEnabled = false;
            this.lblVariable.IsEnabled = false;
            this.txtVariable.IsEnabled = false;
            this.objfrm.FormViewerDetails.BasicDetails.IsEnableInfusionRateSteppedVariable = false;
        }
    }
    BasicDetails_PropertyChanged(sender: Object, e: PropertyChangedEventArgs): void {
        if (String.Compare(e.PropertyName, "StartDTTM") == 0 || String.Compare(e.PropertyName, "StartPrescriptionTime") == 0) {
            if (this.objfrm != null && this.objfrm.FormViewerDetails != null && this.objfrm.FormViewerDetails.BasicDetails != null && DateTime.NotEquals(this.objfrm.FormViewerDetails.BasicDetails.StartDTTM, DateTime.MinValue)) {
                if (this.oAdminTimesVM != null && this.oAdminTimesVM.FreqDetails != null && this.oAdminTimesVM.FreqDetails.oFrequency != null && !String.IsNullOrEmpty(this.oAdminTimesVM.FreqDetails.oFrequency.Type) && String.Compare(this.oAdminTimesVM.FreqDetails.oFrequency.Type, "CC_INTERVAL") == 0 && (this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails == null || this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails.Count == 0)) {
                    this.oAdminTimesVM_FreqDetailsCompleted();
                }
            }
        }
        else if (String.Equals(e.PropertyName, "DoseType", StringComparison.OrdinalIgnoreCase) || String.Equals(e.PropertyName, "Route", StringComparison.OrdinalIgnoreCase)) {
            if (this.objfrm != null && this.objfrm.FormViewerDetails != null && this.objfrm.FormViewerDetails.BasicDetails != null && this.objfrm.FormViewerDetails.BasicDetails.DoseType != null && this.objfrm.FormViewerDetails.BasicDetails.DoseType.Value == "CC_STEPPEDVARIABLE") {
                if (this.objfrm.formViewerDetails.BasicDetails.MultiDoseDetails != null) {
                    if (this.objfrm.FormViewerDetails.BasicDetails.SelectedDoseDetail != null) {
                        this.cmdRemove.IsEnabled = this.cmdUpdate.IsEnabled = true;
                        this.btnFullPresView.IsEnabled = false;
                    }
                    else {
                        let count: number = this.objfrm.formViewerDetails.BasicDetails.MultiDoseDetails.Count;
                        let i: number;
                        for (; i < count; i++) {
                            if (this.objfrm.formViewerDetails.BasicDetails.MultiDoseDetails[i].Duration > 0) {
                                this.cmdAdd.IsEnabled = true;
                                this.cmdRemove.IsEnabled = this.cmdUpdate.IsEnabled = false;
                            }
                            else {
                                this.cmdAdd.IsEnabled = false;
                            }
                        }
                        this.btnFullPresView.IsEnabled = true;
                    }
                }
            }
        }
    }
    profile_OnProfileLoaded(sender: Object, Result: IProfileProp): void {
        if (Result == null)
            return
        ProfileData.ScheduleConfig = ObjectHelper.CreateType<ScheduleConfig>(Result.Profile, ScheduleConfig);
        this.SetProfileData();
    }
    private SetProfileData(): void {
        if (ProfileData.ScheduleConfig instanceof ScheduleConfig && ProfileData.ScheduleConfig != null) {
            this.IsDefaultFixedTime = String.Compare(ProfileData.ScheduleConfig.SlotTimesTypeForAdmin, "Y", StringComparison.CurrentCultureIgnoreCase) == 0;
        }
    }
    public ValidateStepDurationAmendment(): boolean {
        if (PatientContext.PrescriptionType == PrescriptionTypes.Clerking) {
            return true;
        }
        let dPrevDurationValue: number = 0;
        let dNewDurationvalue: number = 0;
        let sPrevDurationUOM: string = String.Empty;
        let sNewDurationUOM: string = String.Empty;
        let StepEndDTTM: DateTime = DateTime.MinValue;
        let tmpStopDTTM: DateTime = DateTime.MinValue;
        let StartDTTM: DateTime = DateTime.MinValue;
        if (DateTime.NotEquals(this.objfrm.FormViewerDetails.BasicDetails.StopDate, DateTime.MinValue)) {
            tmpStopDTTM = this.objfrm.FormViewerDetails.BasicDetails.StopDate.DateTime.AddTime(this.objfrm.FormViewerDetails.BasicDetails.StopPrescriptionTime.Value);
            this.objfrm.FormViewerDetails.BasicDetails.StopDate = tmpStopDTTM;
        }
        if (DateTime.NotEquals(this.objfrm.FormViewerDetails.BasicDetails.StartDTTM, DateTime.MinValue)) {
            StartDTTM = this.objfrm.FormViewerDetails.BasicDetails.StartDTTM.DateTime.AddTime(this.objfrm.FormViewerDetails.BasicDetails.StartPrescriptionTime);
        }
        let objgrddata: MultipleDoseDetail = this.objfrm.FormViewerDetails.BasicDetails.SelectedDoseDetail;
        if (objgrddata != null && this.objfrm.FormViewerDetails.BasicDetails.IsStopDTTMAutoUpdate && this.IsStopDateAvailable) {
            if (objgrddata.DurationUOM != null && !String.IsNullOrEmpty(objgrddata.DurationUOM.Value)) {
                sPrevDurationUOM = objgrddata.DurationUOM.Value;
            }
            if (objgrddata.Duration > 0) {
                dPrevDurationValue = objgrddata.Duration;
            }
            let clDurationUOM: CListItem = ObjectHelper.CreateType<CListItem>(this.cboDuration.SelectedValue, CListItem);
            if (clDurationUOM != null && !String.IsNullOrEmpty(clDurationUOM.Value)) {
                sNewDurationUOM = clDurationUOM.Value;
            }
            if (this.udDuration.Value > 0)
                dNewDurationvalue = this.udDuration.Value;
            let sIndx: number = this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails.IndexOf(objgrddata);
            for (let i: number = 0; i < this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails.Count; i++) {
                let DurationUOM: string = String.Empty;
                let nDurationValue: number = 0;
                if (this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails[i] != null && this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails[i].DurationUOM != null)
                    DurationUOM = this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails[i].DurationUOM.Value;
                if (this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails[i] != null && this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails[i].Duration > 0)
                    nDurationValue = Convert.ToInt32(this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails[i].Duration);
                if (i == 0) {
                    StartDTTM = this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails[i].StartDTTM;
                }
                else {
                    StartDTTM = StepEndDTTM.AddMinutes(1);
                }
                if (sIndx == i) {
                    DurationUOM = sNewDurationUOM;
                    nDurationValue = Convert.ToInt32(dNewDurationvalue);
                }
                if (!String.IsNullOrEmpty(DurationUOM)) {
                    switch (DurationUOM) {
                        case "CC_MINUTES":
                            StepEndDTTM = StartDTTM.AddMinutes(nDurationValue).AddMinutes(-1);
                            break;
                        case "CC_HOURS":
                            StepEndDTTM = StartDTTM.AddHours(nDurationValue).AddMinutes(-1);
                            break;
                        case "CC_MEDDRSN1":
                            MCommonBB.CalculateEndDTTMForDaysDuration(this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails[i].AdminTimesData, StartDTTM, DateTime.MinValue, objgrddata.IsfixedTime, Convert.ToInt32(nDurationValue), (o1) => { StartDTTM = o1 }, (o2) => { StepEndDTTM = o2 });
                            break;
                        case "CC_MEDDRSN2":
                            StepEndDTTM = StartDTTM.AddDays(nDurationValue * 7).AddMinutes(-1);
                            break;
                        case "CC_MEDRSN3":
                            StepEndDTTM = StartDTTM.AddMonths(Convert.ToInt32(nDurationValue)).AddMinutes(-1);
                            break;
                        case "CC_MEDRSN4":
                            StepEndDTTM = StartDTTM.AddYears(Convert.ToInt32(nDurationValue)).AddMinutes(-1);
                            break;
                        case "CC_DOSES":
                            StepEndDTTM = PrescriptionHelper.EndDTTMforDurationDose(this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails[i], null);
                            break;
                        default:
                            StepEndDTTM = StartDTTM.AddDays(3).DateTime.AddHours(23).AddMinutes(59).AddSeconds(59);
                            break;
                    }
                }
            }
            if ((dPrevDurationValue != dNewDurationvalue || !String.Equals(sNewDurationUOM, sPrevDurationUOM)) && DateTime.LessThan(tmpStopDTTM, StepEndDTTM)) {
                this.AmendDurationDTTM = StepEndDTTM;
                let objMsg: iMessageBox = new iMessageBox();
                objMsg.MessageButton = MessageBoxButton.OKCancel;
                objMsg.IconType = MessageBoxType.Information;
                objMsg.Title = "Lorenzo - Manage prescription";
                objMsg.MessageBoxClose = (s, e) => { this.StepDurationAmendment_MessageBoxClose(s, e); };
                objMsg.Message = Resource.MedicationForm.ValidateStepAmendmentDuration;
                objMsg.Show();
                return false;
            }
        }
        return true;
    }
    public GetCummulativeEndDTTM(oMultiDoseDetails: ObservableCollection<MultipleDoseDetail>): DateTime {
        let EndDTTM: DateTime = DateTime.MinValue;
        let nCount: number = 0;
        if (oMultiDoseDetails != null && oMultiDoseDetails.Count > 0) {
            while (nCount < oMultiDoseDetails.Count) {
                if (nCount == 0) {
                    if (PatientContext.PrescriptionType == PrescriptionTypes.Clerking && DateTime.Equals(this.objfrm.FormViewerDetails.BasicDetails.StartDTTM, DateTime.MinValue)) {
                        oMultiDoseDetails[nCount].StartDTTM = this.objfrm.FormViewerDetails.BasicDetails.StartDTTM;
                    }
                    else {
                        oMultiDoseDetails[nCount].StartDTTM = this.objfrm.FormViewerDetails.BasicDetails.StartDTTM.DateTime.AddMinutes(this.objfrm.FormViewerDetails.BasicDetails.StartPrescriptionTime.TimeOfDay.TotalMinutes);
                    }
                }
                else {
                    oMultiDoseDetails[nCount].StartDTTM = oMultiDoseDetails[nCount - 1].EndDTTM.AddMinutes(1);
                }
                let currDuration: number = oMultiDoseDetails[nCount].Duration;
                let currDurationType: string = String.Empty;
                if (oMultiDoseDetails[nCount].DurationUOM != null) {
                    currDurationType = oMultiDoseDetails[nCount].DurationUOM.Value;
                }
                switch (currDurationType) {
                    case "CC_MINUTES":
                        oMultiDoseDetails[nCount].EndDTTM = oMultiDoseDetails[nCount].StartDTTM.AddMinutes(currDuration).AddMinutes(-1);
                        break;
                    case "CC_HOURS":
                        oMultiDoseDetails[nCount].EndDTTM = oMultiDoseDetails[nCount].StartDTTM.AddHours(currDuration).AddMinutes(-1);
                        break;
                    case "CC_MEDDRSN1":
                        let StartDTTM: DateTime;
                        let StopDTTM: DateTime;
                        MCommonBB.CalculateEndDTTMForDaysDuration(oMultiDoseDetails[nCount].AdminTimesData, oMultiDoseDetails[nCount].StartDTTM, DateTime.MinValue, oMultiDoseDetails[nCount].IsfixedTime, Convert.ToInt32(this.udDuration.Value), (o1) => { StartDTTM = o1 }, (o2) => { StopDTTM = o2 });
                        oMultiDoseDetails[nCount].EndDTTM = StopDTTM;
                        break;
                    case "CC_MEDDRSN2":
                        oMultiDoseDetails[nCount].EndDTTM = oMultiDoseDetails[nCount].StartDTTM.AddDays(currDuration * 7).AddMinutes(-1);
                        break;
                    case "CC_MEDRSN3":
                        oMultiDoseDetails[nCount].EndDTTM = oMultiDoseDetails[nCount].StartDTTM.AddMonths(Convert.ToInt32(currDuration)).AddMinutes(-1);
                        break;
                    case "CC_MEDRSN4":
                        oMultiDoseDetails[nCount].EndDTTM = oMultiDoseDetails[nCount].StartDTTM.AddYears(Convert.ToInt32(currDuration)).AddMinutes(-1);
                        break;
                    case "CC_DOSES":
                        oMultiDoseDetails[nCount].EndDTTM = PrescriptionHelper.EndDTTMforDurationDose(oMultiDoseDetails[nCount], null);
                        break;
                    default:
                        oMultiDoseDetails[nCount].EndDTTM = oMultiDoseDetails[nCount].StartDTTM.AddDays(3).DateTime.AddHours(23).AddMinutes(59).AddSeconds(59);
                        break;
                }
                nCount++;
            }
            let nDoseCnt: number = oMultiDoseDetails.Count;
            if (nDoseCnt > 0 && oMultiDoseDetails[nDoseCnt - 1] != null) {
                if (oMultiDoseDetails[nDoseCnt - 1].DurationUOM != null && oMultiDoseDetails[nDoseCnt - 1].Duration > 0 && (!String.IsNullOrEmpty(oMultiDoseDetails[nDoseCnt - 1].DurationUOM.Value) || !String.IsNullOrEmpty(oMultiDoseDetails[nDoseCnt - 1].DurationUOM.DisplayText)) && DateTime.NotEquals(oMultiDoseDetails[nDoseCnt - 1].EndDTTM, DateTime.MinValue)) {
                    EndDTTM = oMultiDoseDetails[nDoseCnt - 1].EndDTTM;
                }
                else {
                    EndDTTM = DateTime.MinValue;
                }
            }
        }
        return EndDTTM;
    }
    private FillMultiDoseDetailForDosesENDDTTMCalc(_StartDTTM: DateTime, out1: (_TempMultipleDoseDetail: MultipleDoseDetail) => void): void {
        let _TempMultipleDoseDetail: MultipleDoseDetail = new MultipleDoseDetail();
        _TempMultipleDoseDetail.StartDTTM = _StartDTTM;
        _TempMultipleDoseDetail.EndDTTM = DateTime.MinValue;
        if (ObjectHelper.CreateType<CListItem>(this.cboDuration.SelectedValue, CListItem) != null) {
            _TempMultipleDoseDetail.Duration = this.udDuration.Value;
            _TempMultipleDoseDetail.DurationUOM = ObjectHelper.CreateType<CListItem>(this.cboDuration.SelectedValue, CListItem);
        }
        _TempMultipleDoseDetail.Frequency = ObjectHelper.CreateType<CListItem>(this.cboFrequency.SelectedValue, CListItem);
        _TempMultipleDoseDetail.SlotTimeMode = this.oAdminTimesVM.GrdData[0].IsFixedEnabled ? 'F' : 'D';
        if (this.oAdminTimesVM != null) {
            _TempMultipleDoseDetail.oAdminTimesVM = this.oAdminTimesVM;
            _TempMultipleDoseDetail.AdminTimesData = this.oAdminTimesVM.GrdData;
            _TempMultipleDoseDetail.FreqDetails = this.oAdminTimesVM.FreqDetails;
        }
        out1(_TempMultipleDoseDetail);
    }
    public ValidateStopDTTMMismatchDuration(Atcion: string): boolean {
        if (PatientContext.PrescriptionType == PrescriptionTypes.Clerking) {
            return true;
        }
        let StepStartDTTM: DateTime = DateTime.MinValue;
        let StepEndDTTM: DateTime = DateTime.MinValue;
        StepStartDTTM = this.GetStartDateTimeForNewStep();
        if (!String.IsNullOrEmpty(this.cboDuration.GetValue()) && this.udDuration.Value > 0 && !String.IsNullOrEmpty(this.udDuration.Value.ToString())) {
            switch (this.cboDuration.GetValue()) {
                case "CC_MINUTES":
                    StepEndDTTM = StepStartDTTM.AddMinutes(this.udDuration.Value).AddMinutes(-1);
                    break;
                case "CC_HOURS":
                    StepEndDTTM = StepStartDTTM.AddHours(this.udDuration.Value).AddMinutes(-1);
                    break;
                case "CC_MEDDRSN1":
                    MCommonBB.CalculateEndDTTMForDaysDuration(this.oAdminTimesVM.GrdData, StepStartDTTM, DateTime.MinValue, this.oAdminTimesVM.SlotTimeMode.Equals('F'), Convert.ToInt32(this.udDuration.Value), (o1) => { StepStartDTTM = o1 }, (o2) => { StepEndDTTM = o2 });
                    break;
                case "CC_MEDDRSN2":
                    StepEndDTTM = StepStartDTTM.AddDays(this.udDuration.Value * 7).AddMinutes(-1);
                    break;
                case "CC_MEDRSN3":
                    StepEndDTTM = StepStartDTTM.AddMonths(Convert.ToInt32(this.udDuration.Value)).AddMinutes(-1);
                    break;
                case "CC_MEDRSN4":
                    StepEndDTTM = StepStartDTTM.AddYears(Convert.ToInt32(this.udDuration.Value)).AddMinutes(-1);
                    break;
                case "CC_DOSES":
                    let oMultipleDoseDetail: MultipleDoseDetail;
                    this.FillMultiDoseDetailForDosesENDDTTMCalc(StepStartDTTM, (o) => { oMultipleDoseDetail = o });
                    StepEndDTTM = PrescriptionHelper.EndDTTMforDurationDose(oMultipleDoseDetail, null);
                    break;
            }
        }
        else {
            StepEndDTTM = DateTime.MinValue;
        }
        let tmpStopDTTM: DateTime = DateTime.MinValue;
        if (DateTime.NotEquals(this.objfrm.FormViewerDetails.BasicDetails.StopDate, DateTime.MinValue)) {
            tmpStopDTTM = this.objfrm.FormViewerDetails.BasicDetails.StopDate.DateTime.AddTime(this.objfrm.FormViewerDetails.BasicDetails.StopPrescriptionTime.Value);
        }
        if (String.Equals(Atcion, "Add") && DateTime.NotEquals(StepEndDTTM, DateTime.MinValue) && this.objfrm.FormViewerDetails.BasicDetails.IsStopDTTMAutoUpdate && this.IsStopDateAvailable && DateTime.NotEquals(this.objfrm.FormViewerDetails.BasicDetails.StopDate, DateTime.MinValue) && DateTime.LessThan(tmpStopDTTM, StepEndDTTM)) {
            let objMsg: iMessageBox = new iMessageBox();
            objMsg.MessageButton = MessageBoxButton.OKCancel;
            objMsg.IconType = MessageBoxType.Information;
            objMsg.Title = "Lorenzo - Manage prescription";
            objMsg.MessageBoxClose = (s, e) => { this.SteppedStopDTTMMismatchDuration_MessageBoxClose(s, e); };
            objMsg.Message = String.Format(Resource.MedicationForm.Stepped_StopDTTMMismatchDurationMessage, StepEndDTTM.ToUserDateTimeString("dd-MMM-yyyy HH:mm"));
            objMsg.sender = StepEndDTTM;
            objMsg.Show();
            return false;
        }
        else if (String.Equals(Atcion, "Add") && DateTime.NotEquals(StepStartDTTM, DateTime.MinValue) && this.objfrm.FormViewerDetails.BasicDetails.IsStopDTTMAutoUpdate && DateTime.Equals(StepEndDTTM, DateTime.MinValue) && this.IsStopDateAvailable && this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails != null && this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails.Count > 0 && DateTime.LessThan(tmpStopDTTM, StepStartDTTM)) {
            let objMsg: iMessageBox = new iMessageBox();
            objMsg.MessageButton = MessageBoxButton.OKCancel;
            objMsg.IconType = MessageBoxType.Information;
            objMsg.Title = "Lorenzo - Manage prescription";
            objMsg.MessageBoxClose = (s, e) => { this.SteppedStopDTTMWithoutDuration_MessageBoxClose(s, e); };
            objMsg.Message = Resource.MedicationForm.Stepped_StopDTTMWithoutDurationMsg;
            objMsg.Tag = StepEndDTTM;
            objMsg.Show();
            return false;
        }
        return true;
    }
    public ValidateForAdditionalDose(): boolean {
        let _StartDTTM: DateTime = DateTime.MinValue;
        let _CurrentDTTM: DateTime = FormviewerCommonData.ServerDateTime;
        let _ScheduleTime: DateTime = DateTime.MinValue;
        let _NewItemAdminTime: TimeSpan;
        let _SelectedAdminTime: string;
        this.NewItemRowIndex = -1;
        if (this.objfrm != null && this.objfrm.FormViewerDetails != null && this.objfrm.FormViewerDetails.BasicDetails != null && DateTime.NotEquals(this.objfrm.FormViewerDetails.BasicDetails.StartDTTM, DateTime.MinValue) && this.oAdminTimesVM != null && this.oAdminTimesVM.GrdData != null && this.oAdminTimesVM.GrdData.Count > 0 && this.oAdminTimesVM.GrdData[0] != null && this.oAdminTimesVM.FreqDetails != null && this.oAdminTimesVM.FreqDetails.oFrequency != null && !String.IsNullOrEmpty(this.oAdminTimesVM.FreqDetails.oFrequency.UOM) && String.Equals(this.oAdminTimesVM.FreqDetails.oFrequency.UOM, CConstants.OnceOnlyFrequency, StringComparison.InvariantCultureIgnoreCase)) {
            if (DateTime.NotEquals(this.objfrm.FormViewerDetails.BasicDetails.StartPrescriptionTime, DateTime.MinValue)) {
                _StartDTTM = this.objfrm.FormViewerDetails.BasicDetails.StartDTTM.DateTime.AddTime(this.objfrm.FormViewerDetails.BasicDetails.StartPrescriptionTime);
            }
            else {
                _StartDTTM = this.objfrm.FormViewerDetails.BasicDetails.StartDTTM;
            }
            this.GetNewAdminTime((o1) => { _SelectedAdminTime = o1 }, (o2) => { _NewItemAdminTime = o2 });
            if (_NewItemAdminTime != TimeSpan.MinValue) {
                _ScheduleTime = _StartDTTM.DateTime.Add(_NewItemAdminTime);
            }
            if (DateTime.NotEquals(_ScheduleTime, DateTime.MinValue)) {
                if (DateTime.NotEquals(_CurrentDTTM.Date, _StartDTTM.Date) || DateTime.LessThan(_ScheduleTime, _StartDTTM)) {
                    let objMsg: iMessageBox = new iMessageBox();
                    objMsg.MessageButton = MessageBoxButton.OK;
                    objMsg.IconType = MessageBoxType.Information;
                    objMsg.Title = "Lorenzo - Manage prescription";
                    objMsg.Message = Resource.steppeddose.AdditionalonceeonlyFutureOrPastDTTM_Msg;
                    objMsg.Show();
                    return false;
                }
                else if (this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails != null && this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails.Count > 0) {
                    let _IsDuplicateTimeExists: boolean = false;
                    let OnceOnlyMultiDoseDtl = this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails.Where(c => c.IsAdditionalDose);
                    if (OnceOnlyMultiDoseDtl != null && OnceOnlyMultiDoseDtl.Count() > 0) {
                        for (let i: number = 0; i < OnceOnlyMultiDoseDtl.Count(); i++) {
                            let oMultipleDoseDetail: MultipleDoseDetail = OnceOnlyMultiDoseDtl[i];
                            if (oMultipleDoseDetail.AdminTimesData != null && oMultipleDoseDetail.AdminTimesData.Count > 0 && (this.objfrm.formViewerDetails.BasicDetails.SelectedDoseDetail == null || !Helper.ReferenceEquals(this.objfrm.formViewerDetails.BasicDetails.SelectedDoseDetail, oMultipleDoseDetail))) {
                                if (oMultipleDoseDetail.SlotTimeMode.Equals('D') && String.Equals(oMultipleDoseDetail.AdminTimesData[0].DruRoundTimes, _SelectedAdminTime)) {
                                    _IsDuplicateTimeExists = true;
                                    break;
                                }
                                else if (oMultipleDoseDetail.SlotTimeMode.Equals('F') && String.Equals(oMultipleDoseDetail.AdminTimesData[0].FixedTimes, _SelectedAdminTime)) {
                                    _IsDuplicateTimeExists = true;
                                    break;
                                }
                            }
                        }

                        if (!_IsDuplicateTimeExists) {
                            this.NewItemRowIndex = this.GetNewItemRowIndexForAdditionalDose(_NewItemAdminTime);
                        }
                    }
                    else {
                        this.NewItemRowIndex = 0;
                    }
                    if (_IsDuplicateTimeExists) {
                        let objMsg: iMessageBox = new iMessageBox();
                        objMsg.MessageButton = MessageBoxButton.OK;
                        objMsg.IconType = MessageBoxType.Information;
                        objMsg.Title = "Lorenzo - Manage prescription";
                        objMsg.Message = Resource.steppeddose.DoseAlreadyExist_Msg;
                        objMsg.Show();
                        return false;
                    }
                }
            }
            if (!this.objfrm.FormViewerDetails.BasicDetails.IsAdditionalDoseOpted) {
                this.objfrm.FormViewerDetails.BasicDetails.IsAdditionalDoseOpted = true;
            }
        }
        return true;
    }
    private GetNewAdminTime(out1: (sAdminTime: string) => void, out2: (tsAdminTime: TimeSpan) => void): void {
        let tsAdminTime: TimeSpan = TimeSpan.MinValue;
        let sAdminTime: string = String.Empty;
        if (this.oAdminTimesVM != null && this.oAdminTimesVM.GrdData != null && this.oAdminTimesVM.GrdData.Count > 0) {
            if (this.iRdBtnFixedTime.IsChecked == true) {
                sAdminTime = (!String.IsNullOrEmpty(this.oAdminTimesVM.GrdData[0].FixedTimes)) ? this.oAdminTimesVM.GrdData[0].FixedTimes : String.Empty;
            }
            else {
                sAdminTime = (!String.IsNullOrEmpty(this.oAdminTimesVM.GrdData[0].DruRoundTimes)) ? this.oAdminTimesVM.GrdData[0].DruRoundTimes : String.Empty;
            }
            if (sAdminTime != String.Empty) {
                tsAdminTime = TimeSpan.Parse(sAdminTime);
            }
        }
        out1(sAdminTime);
        out2(tsAdminTime);
    }
    private GetNewItemRowIndexForAdditionalDose(NewAdminTime: TimeSpan): number {
        let _ExistingAdminTime: TimeSpan;
        let NewItemRowIndex: number = -1;
        let OnceOnlyMultiDoseDtl = this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails.Where(c => c.IsAdditionalDose);
        if (OnceOnlyMultiDoseDtl != null && OnceOnlyMultiDoseDtl.Count() > 0) {
            let _TmpRowIdx: number = 0;
            for (let i: number = 0; i < OnceOnlyMultiDoseDtl.Count(); i++) {
                let oMultipleDoseDetail: MultipleDoseDetail = OnceOnlyMultiDoseDtl[i];
                if (oMultipleDoseDetail.AdminTimesData != null && oMultipleDoseDetail.AdminTimesData.Count > 0) {
                    if (oMultipleDoseDetail.SlotTimeMode.Equals('D')) {
                        _ExistingAdminTime = TimeSpan.Parse(oMultipleDoseDetail.AdminTimesData[0].DruRoundTimes);
                    }
                    else {
                        _ExistingAdminTime = TimeSpan.Parse(oMultipleDoseDetail.AdminTimesData[0].FixedTimes);
                    }
                    if (NewAdminTime > _ExistingAdminTime) {
                        _TmpRowIdx++;
                    }
                    else if (NewAdminTime < _ExistingAdminTime) {
                        break;
                    }
                }
            }
            NewItemRowIndex = _TmpRowIdx > 0 ? _TmpRowIdx : 0;
        }
        else {
            NewItemRowIndex = 0;
        }
        return NewItemRowIndex;
    }
    public cmdAdd_Click(sender: Object, e: RoutedEventArgs): void {
        if (!this.bDuplicateAdminTimesPrompt) {
            this.AddClick();
        }
    }
    private ValidateBeforeUpdateCondition(): boolean {
        let _SelectedIdx: number[] = this.grdData.GetSelectedRowsIndex();
        if (this.objfrm != null && this.objfrm.FormViewerDetails != null && this.objfrm.FormViewerDetails.BasicDetails != null && this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails != null && this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails.Count > 1 && !this.objfrm.FormViewerDetails.BasicDetails.IsDifferentDoseUOMFrmSourceForSV && this.objfrm.FormViewerDetails.BasicDetails.IsNotInPatientSteppedVariableAmend && _SelectedIdx != null && _SelectedIdx.Count() > 0 && _SelectedIdx[0] == 0 && this.objfrm.FormViewerDetails.BasicDetails.SelectedDoseDetail != null) {
            let PrevDoseUOM: CListItem = this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails[0].DoseUOM;
            if (PrevDoseUOM != null && this.cboUOM != null && this.cboUOM.GetValue() != null && !String.Equals(PrevDoseUOM.Value, this.cboUOM.GetValue())) {
                let objMsg: iMessageBox = new iMessageBox();
                objMsg.MessageButton = MessageBoxButton.OKCancel;
                objMsg.IconType = MessageBoxType.Information;
                objMsg.Title = "Lorenzo - Manage prescription";
                objMsg.MessageBoxClose = (s, e) => { this.DoseUOMUpdateSubsequentSteps_MessageBoxClose(s, e); };
                objMsg.Message = Resource.steppeddose.DoseUOMForSubsequentSteps;
                objMsg.Tag = PrevDoseUOM;
                objMsg.Show();
                return false;
            }
        }
        return true;
    }
    DoseUOMUpdateSubsequentSteps_MessageBoxClose(sender: Object, e: MessageEventArgs): void {
        let _DoseUOM: CListItem = null;
        let _sDoseUOMtxt: string = String.Empty;
        if (e.MessageBoxResult == MessageBoxResult.Cancel) {
            this.ClearControls();
            this.grdData.UnselectAll(this.CheckBoxColumn);
            this.IsChangingDoseMezzaineLaunched = false;
            if (this.CanCloseFormViewerWithSVValidation && this.omedFormViewer != null) {
                this.CanCloseFormViewerWithSVValidation = false;
                this.omedFormViewer.CloseFormViewer(AppDialogResult.Ok);
            }
        }
        else if (e.MessageBoxResult == MessageBoxResult.OK) {
            let objgrddata: MultipleDoseDetail = this.objfrm.FormViewerDetails.BasicDetails.SelectedDoseDetail;
            if (this.objfrm.FormViewerDetails.BasicDetails.SteppedDoseUOM != null) {
                _DoseUOM = this.objfrm.FormViewerDetails.BasicDetails.SteppedDoseUOM;
                _sDoseUOMtxt = _DoseUOM.DisplayText;
            }
            this.UpdateCondition(objgrddata, this.IsDaywiseViewEnabled);
            let nCount: number = this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails.Count;
            if (_DoseUOM != null && nCount > 0 && !String.IsNullOrEmpty(_sDoseUOMtxt)) {
                for (let i: number = 0; i < nCount; i++) {
                    if (i == 0) {
                        continue;
                    }
                    this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails[i].DoseUOM = _DoseUOM;
                    if (this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails[i].ScheduleDetailsData != null && this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails[i].ScheduleDetailsData.Count > 0) {
                        let nSchdleCount: number = this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails[i].ScheduleDetailsData.Count;
                        for (let j: number = 0; j < nSchdleCount; j++) {
                            this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails[i].ScheduleDetailsData[j].ScheduleDoseUOM = _sDoseUOMtxt;
                            if (this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails[i].ScheduleDetailsData[j].ScheduleDoseUOMs != null && this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails[i].ScheduleDetailsData[j].ScheduleDoseUOMs.Count() > 0) {
                                let nCountUOMS: number = this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails[i].ScheduleDetailsData[j].ScheduleDoseUOMs.Count();
                                for (let K: number = 0; K < nCountUOMS; K++) {
                                    if (!String.IsNullOrEmpty(this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails[i].ScheduleDetailsData[j].ScheduleDoseUOMs[K])) {
                                        this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails[i].ScheduleDetailsData[j].ScheduleDoseUOMs[K] = " " + _sDoseUOMtxt.Trim();
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    public AddClick(): boolean {
        let bNoError: boolean = false;
        this.sActionText = CConstants.SVActionAdd;
        if (this.omedFormViewer == null) {
            this.omedFormViewer = CommonBB.FindParent<medFormViewer>(this, 'medFormViewer');
        }
        if (this.DataContext != null && this.Validate(null) && this.ValidateDoseValue(null) && this.ValidatechangingDoseValue() && this.showduplicate() && this.InfIntermitValidation() && this.ValidateStopDTTMMismatchDuration(CConstants.SVActionAdd) && this.ValidateForPerviousAndCurrentStepOverlapAdminTime()) {
            bNoError = this.AddClickedORLaunchChangingDoseMezzanine();
        }
        return bNoError;
    }
    private AddClickedORLaunchChangingDoseMezzanine(): boolean {
        let bReturn: boolean = false;
        let bClerkingFrequencyEmpty: boolean = false;
        if (PatientContext.PrescriptionType == PrescriptionTypes.Clerking && this.cboFrequency != null && this.cboFrequency.SelectedItem == null) {
            bClerkingFrequencyEmpty = true;
        }
        if (!this.IsChangingDoseMezzaineLaunched && !bClerkingFrequencyEmpty) {
            let _NoError: boolean = this.LaunchChangingDoseMezzanine();
        }
        else {
            this.AddCondition();
            bReturn = true;
        }
        return bReturn;
    }
    private DefaultDoseUOMForSubSequentSteps(): void {
        if (this.objfrm != null && this.objfrm.FormViewerDetails != null && this.objfrm.FormViewerDetails.BasicDetails != null && this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails != null && this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails.Count > 0 && !this.objfrm.FormViewerDetails.BasicDetails.IsDifferentDoseUOMFrmSourceForSV && this.objfrm.FormViewerDetails.BasicDetails.IsNotInPatientSteppedVariableAmend) {
            if (this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails.Count == 1 && this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails[0] != null) {
                this._DefaultDoseUOM = this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails[0].DoseUOM;
            }
            if (this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails.Count > 1) {
                this._DefaultDoseUOM = this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails.Where(S => S.DoseUOM != null).Select(D => D.DoseUOM).FirstOrDefault();
            }
            if (this._DefaultDoseUOM != null && !String.IsNullOrEmpty(this._DefaultDoseUOM.Value) && !String.IsNullOrEmpty(this._DefaultDoseUOM.DisplayText)) {
                if (this.objfrm.FormViewerDetails.BasicDetails.DefaultDetails != null && this.objfrm.FormViewerDetails.BasicDetails.DefaultDetails.Uoms != null) {
                    let selectedDoseUOM = this.objfrm.FormViewerDetails.BasicDetails.DefaultDetails.Uoms.Where(item => item.Value == this._DefaultDoseUOM.Value);
                    if (selectedDoseUOM != null && selectedDoseUOM.Count() > 0) {
                        this.objfrm.FormViewerDetails.BasicDetails.SteppedDoseUOM = selectedDoseUOM.First();
                    }
                    else {
                        let AvailMore = this.objfrm.FormViewerDetails.BasicDetails.DefaultDetails.Uoms.Where(item => String.Equals(item.Value, CConstants.CONST_MORE));
                        let DefaultUOMCnt: number = this.objfrm.FormViewerDetails.BasicDetails.DefaultDetails.Uoms.Count;
                        if (AvailMore != null && DefaultUOMCnt >= 1)
                            this.objfrm.FormViewerDetails.BasicDetails.DefaultDetails.Uoms.Insert(DefaultUOMCnt - 1, this._DefaultDoseUOM);
                        else this.objfrm.FormViewerDetails.BasicDetails.DefaultDetails.Uoms.Add(this._DefaultDoseUOM);
                        this.objfrm.FormViewerDetails.BasicDetails.SteppedDoseUOM = this._DefaultDoseUOM;
                    }
                }
                else {
                    this.objfrm.FormViewerDetails.BasicDetails.SteppedDoseUOM = this._DefaultDoseUOM;
                }
                this.cboUOM.IsEnabled = false;
            }
        }
        else {
            this._DefaultDoseUOM = null;
            if (this.objfrm.FormViewerDetails.BasicDetails.IsNotInPatientSteppedVariableAmend) {
                this.cboUOM.IsEnabled = true;
            }
        }
    }
    private AddCondition(): void {
        if (this.CanAddAdditionalDose) {
            this.GetFrequencyDetailForAdditionalDose();
        }
        let IsInfusionItem: boolean = false;
        let IsMultiInfusionRoutes: boolean = false;
        let InfContinuous: boolean = false;
        if (this.objfrm.FormViewerDetails.BasicDetails.InfusionType != null && ((String.Compare(this.objfrm.FormViewerDetails.BasicDetails.InfusionType.Value, InfusionTypesCode.CONTINUOUS, StringComparison.CurrentCultureIgnoreCase) == 0) || (String.Compare(this.objfrm.FormViewerDetails.BasicDetails.InfusionType.Value, InfusionTypesCode.SINGLEDOSEVOLUME, StringComparison.CurrentCultureIgnoreCase) == 0) || (String.Compare(this.objfrm.FormViewerDetails.BasicDetails.InfusionType.Value, InfusionTypesCode.FLUID, StringComparison.CurrentCultureIgnoreCase) == 0))) {
            InfContinuous = true;
        }
        if (this.objfrm.FormViewerDetails.BasicDetails.InfusionType == null && this.objfrm.FormViewerDetails.BasicDetails.IsInfContiniousFormLoaded) {
            InfContinuous = true;
        }
        if (((this.objfrm.FormViewerDetails.BasicDetails.Route != null && this.objfrm.FormViewerDetails.BasicDetails.Route.Tag != null && String.Compare(this.objfrm.FormViewerDetails.BasicDetails.Route.Tag.ToString(), "1") == 0) || IsMultiInfusionRoutes) && (this.objfrm.FormViewerDetails.BasicDetails.InfusionType != null && String.Compare(this.objfrm.FormViewerDetails.BasicDetails.InfusionType.Value, InfusionTypesCode.INTERMITTENT, StringComparison.CurrentCultureIgnoreCase) == 0)) {
            IsInfusionItem = true;
        }
        else if ((this.objfrm.FormViewerDetails.BasicDetails.Route != null && this.objfrm.FormViewerDetails.BasicDetails.Route.Tag != null && String.Compare(this.objfrm.FormViewerDetails.BasicDetails.Route.Tag.ToString(), "1") != 0) || !IsMultiInfusionRoutes) {
            IsInfusionItem = true;
        }
        let objgrddata: MultipleDoseDetail = new MultipleDoseDetail();
        if (IsInfusionItem && !InfContinuous) {
            if (!String.IsNullOrEmpty(this.txtLowerDose.Text)) {
                objgrddata.LowerDose = Convert.ToDouble(this.txtLowerDose.Text);
                objgrddata.OriginalLowerDose = this.txtLowerDose.Text;
            }
            if (!String.IsNullOrEmpty(this.txtUpperDose.Text)) {
                objgrddata.UpperDose = Convert.ToDouble(this.txtUpperDose.Text);
                objgrddata.OriginalUpperDose = this.txtUpperDose.Text;
            }
            if (this.objfrm.FormViewerDetails.BasicDetails.SteppedDoseUOM != null) {
                objgrddata.DoseUOM = this.objfrm.FormViewerDetails.BasicDetails.SteppedDoseUOM;
            }
            if (ObjectHelper.CreateType<CListItem>(this.cboDuration.SelectedValue, CListItem) != null) {
                objgrddata.Duration = this.udDuration.Value;
                objgrddata.DurationUOM = ObjectHelper.CreateType<CListItem>(this.cboDuration.SelectedValue, CListItem);
            }
            objgrddata.Frequency = ObjectHelper.CreateType<CListItem>(this.cboFrequency.SelectedValue, CListItem);
            if (this.ChangedDoseScheduleDetails != null)
                objgrddata.IsDaywiseView = this.ChangedDoseScheduleDetails.IsDaywiseView;
            else objgrddata.IsDaywiseView = this.IsDaywise;
            objgrddata.OperationMode = 'N';
            let _PresItemStartDTTM: DateTime = this.objfrm.FormViewerDetails.BasicDetails.StartDTTM;
            if (DateTime.Equals(_PresItemStartDTTM, DateTime.MinValue) && String.Equals(PatientContext.PrescriptionType, PrescriptionTypes.Clerking)) {
                _PresItemStartDTTM = CommonBB.GetServerDateTime().Date;
            }
            else {
                _PresItemStartDTTM = this.objfrm.FormViewerDetails.BasicDetails.StartDTTM;
            }
            if (DateTime.NotEquals(_PresItemStartDTTM, DateTime.MinValue)) {
                objgrddata = this.AddAdminTimes(objgrddata);
                if (this.ScheduleDetailsColsDetails != null && this.ScheduleDetailsColsDetails.Count > 0) {
                    let _strFirstDose: string = String.Empty;
                    if (!this.ChangedDoseScheduleDetails.IsAllDoseValuesSame((o1) => { _strFirstDose = o1; })) {
                        objgrddata.ScheduleDetailsData = new ObservableCollection<ScheduleDetailsCols>(this.ScheduleDetailsColsDetails.AsEnumerable());
                        objgrddata.LowerDose = 0.0;
                        objgrddata.UpperDose = 0.0;
                        objgrddata.OriginalLowerDose = this.txtLowerDose.Text;
                        objgrddata.OriginalUpperDose = this.txtUpperDose.Text;
                        this.txtLowerDose.Text = String.Empty;
                        this.txtUpperDose.Text = String.Empty;
                        objgrddata.HyperlinkText = "Changing dose";
                        this.btnChangingDose.Foreground = new SolidColorBrush(Colors.Blue);
                    }
                    else {
                        objgrddata.IsDaywiseView = false;
                        if (objgrddata.UpperDose > 0 && !String.IsNullOrEmpty(this.txtLowerDose.Text) && !String.IsNullOrEmpty(_strFirstDose)) {
                            if (Convert.ToDouble(this.txtLowerDose.Text) != Convert.ToDouble(_strFirstDose)) {
                                objgrddata.UpperDose = 0.0;
                            }
                        }
                        if (!String.IsNullOrEmpty(_strFirstDose)) {
                            objgrddata.LowerDose = Number.Parse(_strFirstDose);
                        }
                        else {
                            objgrddata.LowerDose = 0.0;
                        }
                    }
                }
            }
            let _AdminTimeChangeAfterClickChangingdose: boolean = false;
            if (objgrddata != null && objgrddata.AdminTimesData != null && objgrddata.AdminTimesData.Count > 0 && objgrddata.ScheduleDetailsData != null && objgrddata.ScheduleDetailsData.Count > 0) {
                let count: number = objgrddata.ScheduleDetailsData.Count;
                for (let i: number = 0; i < count; i++) {
                    if (String.Compare(objgrddata.ScheduleDetailsData[i].ScheduleTime, objgrddata.AdminTimesData[i].FixedTimes) != 0 && objgrddata.SlotTimeMode == 'F') {
                        objgrddata.ScheduleDetailsData[i].ScheduleTime = objgrddata.AdminTimesData[i].FixedTimes;
                        _AdminTimeChangeAfterClickChangingdose = false;
                    }
                    else if (String.Compare(objgrddata.ScheduleDetailsData[i].ScheduleTime, objgrddata.AdminTimesData[i].DruRoundTimes) != 0 && objgrddata.SlotTimeMode == 'D') {
                        objgrddata.ScheduleDetailsData[i].ScheduleTime = objgrddata.AdminTimesData[i].DruRoundTimes;
                        _AdminTimeChangeAfterClickChangingdose = true;
                    }
                }
            }
            if (_AdminTimeChangeAfterClickChangingdose) {
                this.ChangedDoseScheduleDetails.LoadData();
            }
            objgrddata.DoseInstructions = this.txtVariable.Text;
            if (this.oAdminTimesVM != null && this.oAdminTimesVM.FreqDetails != null && this.oAdminTimesVM.FreqDetails.oFrequency != null) {
                objgrddata.FreqDetails = this.oAdminTimesVM.FreqDetails;
                objgrddata.FreqDetails.oFrequency.IsSunday = this.oAdminTimesVM.IsSun;
                objgrddata.FreqDetails.oFrequency.IsMonday = this.oAdminTimesVM.IsMon;
                objgrddata.FreqDetails.oFrequency.IsTuesday = this.oAdminTimesVM.IsTue;
                objgrddata.FreqDetails.oFrequency.IsWednesday = this.oAdminTimesVM.IsWed;
                objgrddata.FreqDetails.oFrequency.IsThursday = this.oAdminTimesVM.IsThu;
                objgrddata.FreqDetails.oFrequency.IsFriday = this.oAdminTimesVM.IsFri;
                objgrddata.FreqDetails.oFrequency.IsSaturday = this.oAdminTimesVM.IsSat;
            }
        }
        objgrddata.OperationMode = 'N';
        if (ObjectHelper.CreateType<CListItem>(this.cboDuration.SelectedValue, CListItem) != null) {
            objgrddata.Duration = this.udDuration.Value;
            objgrddata.DurationUOM = ObjectHelper.CreateType<CListItem>(this.cboDuration.SelectedValue, CListItem);
        }
        objgrddata.DoseInstructions = this.txtVariable.Text;
        if ((this.objfrm.FormViewerDetails.BasicDetails.Route != null && this.objfrm.FormViewerDetails.BasicDetails.Route.Tag != null && String.Compare(this.objfrm.FormViewerDetails.BasicDetails.Route.Tag.ToString(), "1") == 0) || IsMultiInfusionRoutes) {
            if (!String.IsNullOrEmpty(this.txtInfusionRate.Text))
                objgrddata.InfusionRate = this.txtInfusionRate.Text;
            if (!String.IsNullOrEmpty(this.txtUpperInfusionRate.Text))
                objgrddata.InfusionUpperrate = this.txtUpperInfusionRate.Text;
            else objgrddata.InfusionUpperrate = String.Empty;
            if (ObjectHelper.CreateType<CListItem>(this.cboInfRateNumUOM.SelectedValue, CListItem) != null)
                objgrddata.Infratenumeratoruom = ObjectHelper.CreateType<CListItem>(this.cboInfRateNumUOM.SelectedValue, CListItem);
            if (ObjectHelper.CreateType<CListItem>(this.cboInfRateDenoUOM.SelectedValue, CListItem) != null)
                objgrddata.InfrateDenominatoruom = ObjectHelper.CreateType<CListItem>(this.cboInfRateDenoUOM.SelectedValue, CListItem);
            if (!String.IsNullOrEmpty(objgrddata.InfusionRate)) {
                this.objfrm.FormViewerDetails.BasicDetails.IsenableInfusionPeriod = false;
            }
        }
        if (this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails == null) {
            this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails = new ObservableCollection<MultipleDoseDetail>();
        }
        if (IsInfusionItem) {
            objgrddata.IsInfusionData = true;
        }
        else {
            objgrddata.IsInfusionData = false;
        }
        if (String.Equals(this.cboDuration.GetValue(), "CC_DOSES") && DateTime.Equals(objgrddata.EndDTTM, DateTime.MinValue)) {
            objgrddata.EndDTTM = PrescriptionHelper.EndDTTMforDurationDose(objgrddata, null);
        }
        objgrddata.oAdminTimesVM = this.oAdminTimesVM;
        objgrddata.IsStartFromNextDay = true;
        if (this.NewItemRowIndex >= 0) {
            this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails.Insert(this.NewItemRowIndex, objgrddata);
            let nCountOnceonlyDoses: number = 0;
            nCountOnceonlyDoses = this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails.Where(x => x.IsAdditionalDose).Count();
            if (nCountOnceonlyDoses > 0 && this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails.Count > nCountOnceonlyDoses && (DateTime.LessThanOrEqualTo(this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails[nCountOnceonlyDoses].StartDTTM, this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails[0].StartDTTM) || DateTime.LessThanOrEqualTo(this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails[nCountOnceonlyDoses].StartDTTM, this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails[nCountOnceonlyDoses - 1].EndDTTM))) {
                this.objfrm.FormViewerDetails.BasicDetails.UpdateStartEndDateForInPatSteppedDose(false, false, false);
            }
        }
        else {
            this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails.Add(objgrddata);
            this.grdData.SetBinding('data', this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails);
        }
        this.ClearControls();
        this.IsValidateForStartFromNextDayMsgShown = false;
        this.bDoseSafetymsg = false;
        this.objfrm.FormViewerDetails.IsSteppedDoseDetailsModified = false;
        this.objfrm.FormViewerDetails.BasicDetails.IsenableRSNFORMOD = true;
        this.objfrm.FormViewerDetails.BasicDetails.IsenableModificationcomments = true;
        this.objfrm.FormViewerDetails.BasicDetails.IsMandatoryRSNFORMOD = true;
        if (!this.objfrm.FormViewerDetails.BasicDetails.lstAmendedFlds.Contains("AddSteppedDoseDetails"))
            this.objfrm.FormViewerDetails.BasicDetails.lstAmendedFlds.Add("AddSteppedDoseDetails");
        if (!this.objfrm.FormViewerDetails.BasicDetails.lstDRCAmendedFlds.Contains("AddSteppedDoseDetails"))
            this.objfrm.FormViewerDetails.BasicDetails.lstDRCAmendedFlds.Add("AddSteppedDoseDetails");
        if (this.isMedicationClerk && this.objfrm.FormViewerDetails.BasicDetails != null && this.objfrm.FormViewerDetails.BasicDetails.actualClerkingValues != null && this.objfrm.FormViewerDetails.BasicDetails.actualClerkingValues.Multidosedetail != null && this.objfrm.FormViewerDetails.BasicDetails.actualClerkingValues.Multidosedetail.Count > 0) {
            this.objfrm.FormViewerDetails.BasicDetails.IsMandatoryReasonForMedClerkModify = true;
            this.objfrm.FormViewerDetails.BasicDetails.SetOnadmissionValue("", DoseTypeCode.STEPPEDVARIABLE);
        }
        this.objfrm.FormViewerDetails.BasicDetails.SetAdditionalOptionMessage();
        this.objfrm.FormViewerDetails.BasicDetails.CheckStrengthMandatoryByDoseUOMType();
        this.objfrm.TechnicallyValidateMessage();
        if (this.objfrm != null && this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails != null && this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails.Count > 0 && this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails.Count == 1 && this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails[0] != null && String.Equals(PatientContext.PrescriptionType, PrescriptionTypes.ForAdministration, StringComparison.InvariantCultureIgnoreCase) && !(PatientContext.ClerkFormViewDefaultBehavior == ClerkFormViewDeftBehaviour.LaunchFormMandatory)) {
            let IsAddtionalSTATPrompted: boolean = this.objfrm.FormViewerDetails.BasicDetails.SetAdditionalOptionMessageForSV(this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails[0]);
            if (IsAddtionalSTATPrompted && this.omedFormViewer != null) {
                this.omedFormViewer.AutoScrollView();
            }
        }
        this.IsChangingDoseMezzaineLaunched = false;
        this.sActionText = String.Empty;
        if(this.CanCloseFormViewerWithSVValidation == null && this.omedFormViewer.CanCloseFormViewerWithSVValidation != null)
        {
            this.CanCloseFormViewerWithSVValidation = this.omedFormViewer.CanCloseFormViewerWithSVValidation;
            this.omedFormViewer.CanCloseFormViewerWithSVValidation = null;
        }
        if (this.CanCloseFormViewerWithSVValidation && this.omedFormViewer != null) {
            this.CanCloseFormViewerWithSVValidation = false;
            this.omedFormViewer.CloseFormViewer(AppDialogResult.Ok);
        }
    }
    private SetSTATAdditionalPromptForAddORUpdateInStep(oMultiDoseDetail: MultipleDoseDetail): void {
        if (this.objfrm != null && this.objfrm.FormViewerDetails != null && this.objfrm.FormViewerDetails.BasicDetails != null && DateTime.NotEquals(this.objfrm.FormViewerDetails.BasicDetails.StartDTTM, DateTime.MinValue) && this.ScheduleDetails != null && this.ScheduleDetails.GrdData != null && oMultiDoseDetail != null && DateTime.GreaterThanOrEqualTo(this.objfrm.FormViewerDetails.BasicDetails.StartDTTM, FormviewerCommonData.ServerDateTime) && String.Equals(PatientContext.PrescriptionType, PrescriptionTypes.ForAdministration, StringComparison.InvariantCultureIgnoreCase) && PatientContext.ClerkFormViewDefaultBehavior != ClerkFormViewDeftBehaviour.LaunchFormMandatory && (this.objfrm.ActionCode == ActivityTypes.Prescribe || this.objfrm.ActionCode == ActivityTypes.Reorder)) {
            let SchdlDoseDtl: ScheduleDoseDtl = this.objfrm.FormViewerDetails.BasicDetails.GetFirstDoseDetailFromSVGrdData(FormviewerCommonData.ServerDateTime, this.ScheduleDetails.GrdData);
            if (SchdlDoseDtl != null) {
                this.objfrm.ParentbaseVM.FirstDoseStepped = SchdlDoseDtl.FirstDose;
                this.objfrm.ParentbaseVM.IsSteppedScheduleDTTM = SchdlDoseDtl.FirstScheduleDTTM;
                if (oMultiDoseDetail.DoseUOM != null) {
                    this.objfrm.ParentbaseVM.FirstSTATDoseUom = oMultiDoseDetail.DoseUOM;
                }
                this.objfrm.FormViewerDetails.BasicDetails.SetAdditionalOptionsVisibilityForSV(FormviewerCommonData.ServerDateTime, SchdlDoseDtl.FirstScheduleDTTM);
            }
        }
    }
    private GetFrequencyDetailForAdditionalDose(): void {
        if (this.objfrm != null && this.objfrm.FormViewerDetails != null && this.objfrm.FormViewerDetails.BasicDetails != null && this.objfrm.FormViewerDetails.BasicDetails.DefaultDetails != null && this.objfrm.FormViewerDetails.BasicDetails.DefaultDetails.SteppedFrequencies != null && this.objfrm.FormViewerDetails.BasicDetails.DefaultDetails.SteppedFrequencies.Count > 0) {
            let _OnceOnly: string = CConstants.OnceOnlyLZOID;
            if (!String.IsNullOrEmpty(Common.Frc002Childs))
                _OnceOnly = Common.Frc002Childs;
            let ofreq = this.objfrm.FormViewerDetails.BasicDetails.DefaultDetails.SteppedFrequencies.Where(Freq => Freq.Tag != null && (Freq.Tag as Array<String>).Length > 2 && _OnceOnly.Contains((Freq.Tag as Array<string>)[2]));
            if (ofreq != null && ofreq.Count() > 0) {
                this.oAdditionalDoseAdminTimesVM = new AdminstrativeTimesVM(Convert.ToInt64(ofreq.FirstOrDefault().Value));
                this.oAdditionalDoseAdminTimesVM.FreqDetailsCompleted = (s, e) => { this.oAdditionalDoseAdminTimesVM_FreqDetailsCompleted(); };
            }
        }
    }
    public oAdditionalDoseAdminTimesVM_FreqDetailsCompleted(): void {
        let _StartDTTM: DateTime = FormviewerCommonData.ServerDateTime;
        this.oAdditionalDoseAdminTimesVM.FillAdministrationTimes(this.oAdditionalDoseAdminTimesVM.FreqDetails);
        if (this.oAdditionalDoseAdminTimesVM.GrdData != null && this.oAdditionalDoseAdminTimesVM.GrdData.Count > 0) {
            if (this.objfrm != null && this.objfrm.FormViewerDetails != null && this.objfrm.FormViewerDetails.BasicDetails != null && DateTime.NotEquals(this.objfrm.FormViewerDetails.BasicDetails.StartPrescriptionTime, DateTime.MinValue)) {
                _StartDTTM = this.objfrm.FormViewerDetails.BasicDetails.StartDTTM.DateTime.AddTime(this.objfrm.FormViewerDetails.BasicDetails.StartPrescriptionTime);
            }
            else {
                _StartDTTM = this.objfrm.FormViewerDetails.BasicDetails.StartDTTM;
            }
            this.oAdditionalDoseAdminTimesVM.GrdData[0].FixedTimes = _StartDTTM.ToString("HH:mm");
        }
        this.oAdditionalDoseAdminTimesVM.SlotTimeMode = 'F';
        this.AddAdditionalDose();
    }
    public ConfirmAdditionalDose(sActionText: string): boolean {
        let bReturn: boolean = true;
        this.sActionText = sActionText;
        let _IsAddlDoseConfirmRequired: boolean = false;
        let _CurrentDTTM: DateTime = FormviewerCommonData.ServerDateTime;
        if (this.objfrm == null && this.DataContext instanceof PrescriptionItemVM) {
            this.objfrm = ObjectHelper.CreateType<PrescriptionItemVM>(this.DataContext, PrescriptionItemVM);
        }
        this._OrginalCanAddAdditionalDose = this.CanAddAdditionalDose;
        if (this.objfrm != null && !this.IsAdditionalDoseConfirmMsgShown && DateTime.Equals(_CurrentDTTM.Date, this.objfrm.FormViewerDetails.BasicDetails.StartDTTM.Date)) {
            if ((((String.Equals(sActionText, CConstants.SVActionAdd) || String.Equals(sActionText, CConstants.SVActionChangingDose)) && (this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails == null || this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails.Count == 0)) || ((String.Equals(sActionText, CConstants.SVActionUpdate) || String.Equals(sActionText, CConstants.SVActionChangingDose)) && this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails != null && this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails.Count > 0 && !this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails.Any(x => x.IsAdditionalDose) && this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails.IndexOf(this.objfrm.FormViewerDetails.BasicDetails.SelectedDoseDetail) == 0))) {
                _IsAddlDoseConfirmRequired = true;
            }
            else if (String.Equals(sActionText, CConstants.SVActionFormViewerOk) && this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails != null && this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails.Count > 0 && !this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails.Any(x => x.IsAdditionalDose)) {
                this.objfrm.FormViewerDetails.BasicDetails.SelectedDoseDetail = this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails[0];
                _IsAddlDoseConfirmRequired = true;
            }
            if (_IsAddlDoseConfirmRequired) {
                if (String.Equals(sActionText, CConstants.SVActionFormViewerOk) && this.objfrm.FormViewerDetails.BasicDetails.lstAmendedFlds != null && this.objfrm.FormViewerDetails.BasicDetails.lstAmendedFlds.Count > 0) {
                    if (this.objfrm.FormViewerDetails.BasicDetails.lstAmendedFlds.Contains("SDuration"))
                        this.objfrm.FormViewerDetails.BasicDetails.lstAmendedFlds.Remove("SDuration");
                    if (this.objfrm.FormViewerDetails.BasicDetails.lstAmendedFlds.Contains("SDurationUOM"))
                        this.objfrm.FormViewerDetails.BasicDetails.lstAmendedFlds.Remove("SDurationUOM");
                }
                let _IsPartiallyCrossedStartDate: boolean = false;
                let _IsDayCrossedStartDate: boolean = false;
                this.CheckPartiallyorDayCrossed(_IsPartiallyCrossedStartDate, _IsDayCrossedStartDate);
                if (_IsPartiallyCrossedStartDate || _IsDayCrossedStartDate) {
                    let objMsg: iMessageBox = new iMessageBox();
                    objMsg.MessageButton = MessageBoxButton.YesNoCancel;
                    objMsg.IconType = MessageBoxType.Information;
                    objMsg.Title = "Lorenzo - Manage prescription";
                    objMsg.MessageBoxClose = (s, e) => { this.AdditionalDoseOnceOnly_MessageBoxClose(s, e); };
                    objMsg.Message = Resource.steppeddose.AdditionalDoseOnceOnly_Msg;
                    objMsg.Height = 170;
                    objMsg.Width = 390;
                    objMsg.Show();
                    bReturn = false;
                }
                else if (String.Equals(sActionText, CConstants.SVActionFormViewerOk)) {
                    this.objfrm.FormViewerDetails.BasicDetails.SelectedDoseDetail = null;
                }
            }
        }
        return bReturn;
    }
    private AdditionalDoseOnceOnly_MessageBoxClose(sender: Object, e: MessageEventArgs): void {
        let _IsMessageBoxNotCancelled: boolean = false;
        this.CanAddAdditionalDose = false;
        this.objfrm.formViewerDetails.BasicDetails.IsAdditionalDoseOpted = false;
        if (e.MessageBoxResult == MessageBoxResult.Yes) {
            this.CanCloseFormViewerWithSVValidation = false;
            this.CanAddAdditionalDose = true;
            this.objfrm.formViewerDetails.BasicDetails.IsAdditionalDoseOpted = true;
            _IsMessageBoxNotCancelled = true;
        }
        else if (e.MessageBoxResult == MessageBoxResult.No) {
            _IsMessageBoxNotCancelled = true;
        }
        else if (e.MessageBoxResult == MessageBoxResult.Cancel) {
            _IsMessageBoxNotCancelled = false;
        }
        if (_IsMessageBoxNotCancelled) {
            let bResult: boolean = true;
            this.IsAdditionalDoseConfirmMsgShown = true;
            if (this.cmdAdd.IsEnabled) {
                bResult = this.ValidateStopDTTMMismatchDuration(CConstants.SVActionAdd);
            }
            else if (this.cmdUpdate.IsEnabled) {
                bResult = this.ValidateStepDurationAmendment();
            }
            if (bResult) {
                if (String.Equals(this.sActionText, CConstants.SVActionAdd)) {
                    this.AddClickedORLaunchChangingDoseMezzanine();
                }
                else if (String.Equals(this.sActionText, CConstants.SVActionUpdate) || String.Equals(this.sActionText, CConstants.SVActionFormViewerOk)) {
                    let objgrddata: MultipleDoseDetail = this.objfrm.FormViewerDetails.BasicDetails.SelectedDoseDetail;
                    this.UpdateClickedORLaunchChangingDoseMezzanine(objgrddata);
                }
                else if (String.Equals(this.sActionText, CConstants.SVActionChangingDose)) {
                    this.LaunchChangingDoseMezzanine();
                }
            }
        }
    }
    private AddAdditionalDose(): void {
        let IsInfusionItem: boolean = false;
        let IsMultiInfusionRoutes: boolean = false;
        let InfContinuous: boolean = false;
        let CurrentDTTM: DateTime = FormviewerCommonData.ServerDateTime;
        let oFirstStep: MultipleDoseDetail;
        let _OnceOnly: string = CConstants.OnceOnlyLZOID;
        if (!String.IsNullOrEmpty(Common.Frc002Childs))
            _OnceOnly = Common.Frc002Childs;
        let ofreq = this.objfrm.FormViewerDetails.BasicDetails.DefaultDetails.SteppedFrequencies.Where(Freq => Freq.Tag != null && (Freq.Tag as Array<String>).Length > 2 && _OnceOnly.Contains((Freq.Tag as Array<string>)[2]));
        if (ofreq != null && ofreq.Count() > 0 && this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails != null && this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails.Count > 0) {
            oFirstStep = this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails[0];
            let OnceOnlyFreq: CListItem = ofreq.FirstOrDefault();
            if (this.objfrm.FormViewerDetails.BasicDetails.InfusionType != null && ((String.Compare(this.objfrm.FormViewerDetails.BasicDetails.InfusionType.Value, InfusionTypesCode.CONTINUOUS, StringComparison.CurrentCultureIgnoreCase) == 0) || (String.Compare(this.objfrm.FormViewerDetails.BasicDetails.InfusionType.Value, InfusionTypesCode.SINGLEDOSEVOLUME, StringComparison.CurrentCultureIgnoreCase) == 0) || (String.Compare(this.objfrm.FormViewerDetails.BasicDetails.InfusionType.Value, InfusionTypesCode.FLUID, StringComparison.CurrentCultureIgnoreCase) == 0))) {
                InfContinuous = true;
            }
            if (this.objfrm.FormViewerDetails.BasicDetails.InfusionType == null && this.objfrm.FormViewerDetails.BasicDetails.IsInfContiniousFormLoaded) {
                InfContinuous = true;
            }
            if (this.objfrm.FormViewerDetails.BasicDetails.IsAllowMultiRoute && this.objfrm.FormViewerDetails.BasicDetails.DefaultDetails.Routes != null && this.objfrm.FormViewerDetails.BasicDetails.DefaultDetails.Routes != null) {
                if (this.objfrm.FormViewerDetails.BasicDetails.Route != null)
                    IsMultiInfusionRoutes = !Common.IsNonInfusionMultiRoutes(this.objfrm.FormViewerDetails.BasicDetails.DefaultDetails.Routes);
            }
            if (((this.objfrm.FormViewerDetails.BasicDetails.Route != null && this.objfrm.FormViewerDetails.BasicDetails.Route.Tag != null && String.Compare(this.objfrm.FormViewerDetails.BasicDetails.Route.Tag.ToString(), "1") == 0) || IsMultiInfusionRoutes) && (this.objfrm.FormViewerDetails.BasicDetails.InfusionType != null && String.Compare(this.objfrm.FormViewerDetails.BasicDetails.InfusionType.Value, InfusionTypesCode.INTERMITTENT, StringComparison.CurrentCultureIgnoreCase) == 0)) {
                IsInfusionItem = true;
            }
            else if ((this.objfrm.FormViewerDetails.BasicDetails.Route != null && this.objfrm.FormViewerDetails.BasicDetails.Route.Tag != null && String.Compare(this.objfrm.FormViewerDetails.BasicDetails.Route.Tag.ToString(), "1") != 0) || !IsMultiInfusionRoutes) {
                IsInfusionItem = true;
            }
            let oAddlDose: MultipleDoseDetail = new MultipleDoseDetail();
            oAddlDose.IsAdditionalDose = true;
            if (IsInfusionItem && !InfContinuous) {
                if (oFirstStep != null) {
                    if (oFirstStep.LstElaspedDoses != null && oFirstStep.LstElaspedDoses.Count > 0) {
                        if (!String.IsNullOrEmpty(oFirstStep.LstElaspedDoses[oFirstStep.LstElaspedDoses.Count - 1])) {
                            let LowerDose: number;
                            Number.TryParse(oFirstStep.LstElaspedDoses[oFirstStep.LstElaspedDoses.Count - 1], (o) => { LowerDose = o });
                            oAddlDose.LowerDose = LowerDose;
                        }
                        if (oFirstStep.LstElaspedDoses.Count > 1) {
                            oFirstStep.LstElaspedDoses.RemoveAt(oFirstStep.LstElaspedDoses.Count - 1);
                        }
                    }
                    else if (!String.IsNullOrEmpty(oFirstStep.OriginalLowerDose) && Number.Parse(oFirstStep.OriginalLowerDose) > 0) {
                        let LowerDose: number;
                        Number.TryParse(oFirstStep.OriginalLowerDose, (o) => { LowerDose = o });
                        oAddlDose.LowerDose = LowerDose;
                        if (!String.IsNullOrEmpty(oFirstStep.OriginalUpperDose)) {
                            let UpperDose: number;
                            Number.TryParse(oFirstStep.OriginalUpperDose, (o) => { UpperDose = o });
                            oAddlDose.UpperDose = UpperDose;
                        }
                    }
                    else if (oFirstStep.ScheduleDetailsData != null && oFirstStep.ScheduleDetailsData.Count > 0) {
                        let _FirstDose: string = String.Empty;
                        for (let _adminTimeIndex: number = 0; _adminTimeIndex < oFirstStep.ScheduleDetailsData.Count; _adminTimeIndex++) {
                            if (oFirstStep.ScheduleDetailsData[_adminTimeIndex].ScheduleDoseValue.length > 0 && !String.IsNullOrEmpty(oFirstStep.ScheduleDetailsData[_adminTimeIndex].ScheduleDoseValue[0])) {
                                let LowerDose: number;
                                Number.TryParse(oFirstStep.ScheduleDetailsData[_adminTimeIndex].ScheduleDoseValue[0], (o) => { LowerDose = o });
                                oAddlDose.LowerDose = LowerDose;
                                break;
                            }
                        }
                    }
                    if (oFirstStep.DoseUOM != null) {
                        oAddlDose.DoseUOM = oFirstStep.DoseUOM;
                    }
                }
                oAddlDose.Duration = 1;
                oAddlDose.DurationUOM = this.objfrm.FormViewerDetails.BasicDetails.DefaultDetails.DurationStepped.Where(c => c.Value.Contains(ConstDurationUOM.Doses)).FirstOrDefault();
                oAddlDose.Frequency = OnceOnlyFreq;
                oAddlDose.IsDaywiseView = false;
                oAddlDose.SlotTimeMode = 'F';
                if (this.oAdditionalDoseAdminTimesVM != null && this.oAdditionalDoseAdminTimesVM.GrdData != null && this.oAdditionalDoseAdminTimesVM.GrdData.Count > 0) {
                    oAddlDose.oAdminTimesVM = this.oAdditionalDoseAdminTimesVM;
                    oAddlDose.FreqDetails = this.oAdditionalDoseAdminTimesVM.FreqDetails;
                    oAddlDose.AdminTimesData = new ObservableCollection<GrdAdminstrativeTimesCols>(this.oAdditionalDoseAdminTimesVM.GrdData.AsEnumerable());
                    oAddlDose.AdministrationTimes = "Fixed - " + this.oAdditionalDoseAdminTimesVM.GrdData[0].FixedTimes;
                }
                oAddlDose.OperationMode = 'N';
                if (DateTime.NotEquals(this.objfrm.FormViewerDetails.BasicDetails.StartDTTM, DateTime.MinValue)) {
                    oAddlDose.StartDTTM = this.objfrm.FormViewerDetails.BasicDetails.StartDTTM.DateTime.AddTime(this.objfrm.FormViewerDetails.BasicDetails.StartPrescriptionTime);
                    oAddlDose.EndDTTM = oAddlDose.StartDTTM.AddMinutes(1);
                }
            }
            if (IsInfusionItem) {
                oAddlDose.IsInfusionData = true;
            }
            else {
                oAddlDose.IsInfusionData = false;
            }
            if (IsInfusionItem && this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails != null && this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails.Count == 1) {
                oAddlDose.InfusionRate = this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails.FirstOrDefault().InfusionRate;
                oAddlDose.InfusionUpperrate = this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails.FirstOrDefault().InfusionUpperrate;
                oAddlDose.Infratenumeratoruom = this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails.FirstOrDefault().Infratenumeratoruom;
                oAddlDose.InfrateDenominatoruom = this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails.FirstOrDefault().InfrateDenominatoruom;
            }
            this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails.Insert(0, oAddlDose);
            this.grdData.UpdateLayout();
            this.grdData.setSelectedItemByIndex(0);
            this.objfrm.FormViewerDetails.BasicDetails.SetAdditionalOptionMessage();
            let StepEndDTTM: DateTime = DateTime.MinValue;
            let nDoseCnt: number = this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails.Count;
            if (nDoseCnt > 0 && this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails[nDoseCnt - 1] != null) {
                if (this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails[nDoseCnt - 1].DurationUOM != null && this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails[nDoseCnt - 1].Duration > 0 && (!String.IsNullOrEmpty(this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails[nDoseCnt - 1].DurationUOM.Value) || !String.IsNullOrEmpty(this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails[nDoseCnt - 1].DurationUOM.DisplayText)) && DateTime.NotEquals(this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails[nDoseCnt - 1].EndDTTM, DateTime.MinValue)) {
                    StepEndDTTM = this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails[nDoseCnt - 1].EndDTTM;
                }
            }
            if (DateTime.NotEquals(StepEndDTTM, DateTime.MinValue) && this.objfrm.FormViewerDetails.BasicDetails.IsStopDTTMAutoUpdate && this.IsStopDateAvailable) {
                this.lblStopDatetimeValue.Text = StepEndDTTM.ToUserDateTimeString("dd-MMM-yyyy HH:mm");
                this.objfrm.FormViewerDetails.BasicDetails.StopDate = StepEndDTTM;
                this.objfrm.FormViewerDetails.BasicDetails.StopPrescriptionTime = StepEndDTTM;
            }
        }
        this.CanAddAdditionalDose = false;
        if (this.omedFormViewer != null && String.Equals(this.sActionText, CConstants.SVActionFormViewerOk)) {
            this.omedFormViewer.CloseFormViewer(AppDialogResult.Ok);
        }
    }
    private ValidateForStartFromNextDay(): boolean {
        let _TempPrevStepEndDTTM: DateTime, _TempNewStepStartDTTM = DateTime.MinValue;
        let _bResult: boolean = true;
        let _IsFixedTime: boolean = false;
        let _IsPartiallyCrossedStartDate: boolean, _IsDayCrossedStartDate;
        let _SelectedRowIndex: number = -1;
        this.IsStartDTTMMoveNextDay = false;
        if ((this.cmdAdd.IsEnabled || this.cmdUpdate.IsEnabled) && this.objfrm != null && this.objfrm.FormViewerDetails != null && this.objfrm.FormViewerDetails.BasicDetails != null && this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails != null && this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails.Count > 0) {
            if (this.cmdAdd.IsEnabled) {
                _SelectedRowIndex = this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails.Count - 1;
            }
            else if (this.cmdUpdate.IsEnabled && this.objfrm.FormViewerDetails.BasicDetails.SelectedDoseDetail != null && !this.objfrm.FormViewerDetails.BasicDetails.SelectedDoseDetail.IsStartFromNextDay) {
                _SelectedRowIndex = this.grdData.GetCurrentRowIndex() - 1;
            }
            if (!this.IsValidateForStartFromNextDayMsgShown && _SelectedRowIndex > -1 && this.oAdminTimesVM != null && this.oAdminTimesVM.GrdData != null && !this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails[_SelectedRowIndex].IsAdditionalDose && this.oAdminTimesVM.FreqDetails != null && this.oAdminTimesVM.FreqDetails.oFrequency != null && !String.IsNullOrEmpty(this.oAdminTimesVM.FreqDetails.oFrequency.UOM) && !String.Equals(this.oAdminTimesVM.FreqDetails.oFrequency.UOM, CConstants.OnceOnlyFrequency, StringComparison.InvariantCultureIgnoreCase)) {
                _IsFixedTime = (this.iRdBtnFixedTime.IsChecked == true) ? true : false;
                _TempNewStepStartDTTM = this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails[_SelectedRowIndex].EndDTTM.AddMinutes(1);
                _TempPrevStepEndDTTM = this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails[_SelectedRowIndex].EndDTTM;
                if (DateTime.Equals(_TempPrevStepEndDTTM.Date, _TempNewStepStartDTTM.Date) && this.IsAnyScheduleExistInLastDayOfStep(_SelectedRowIndex)) {
                    {
                        this.IsStartDTTMMoveNextDay = true;
                        this.validateForStartFromNextDay();
                        _bResult = false;
                    }
                }
            }
        }
        return _bResult;
    }
    private IsAnyScheduleExistInLastDayOfStep(StepIndex: number): boolean {
        let bReturnValue: boolean = false;
        if (StepIndex > -1 && this.objfrm != null && this.objfrm.FormViewerDetails != null && this.objfrm.FormViewerDetails.BasicDetails != null && this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails != null && this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails.Count > 0 && StepIndex <= (this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails.Count - 1) && DateTime.NotEquals(this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails[StepIndex].StartDTTM, DateTime.MinValue) && DateTime.NotEquals(this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails[StepIndex].EndDTTM, DateTime.MinValue) && this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails[StepIndex].SlotTimeMode != String.MinValue && this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails[StepIndex].AdminTimesData != null && this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails[StepIndex].AdminTimesData.Count > 0) {
            let _IsFixedTime: boolean = this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails[StepIndex].SlotTimeMode.Equals('F');
            let nAdminTimesCount: number = this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails[StepIndex].AdminTimesData.Count;
            for (let nAdminTimeIdx: number = 0; nAdminTimeIdx < nAdminTimesCount; nAdminTimeIdx++) {
                let sAdminTime: string = String.Empty;
                if (_IsFixedTime) {
                    sAdminTime = this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails[StepIndex].AdminTimesData[nAdminTimeIdx].FixedTimes;
                }
                else {
                    sAdminTime = this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails[StepIndex].AdminTimesData[nAdminTimeIdx].DruRoundTimes;
                }
                if (!String.IsNullOrEmpty(sAdminTime)) {
                    let _tsAdminTime: TimeSpan;
                    if (TimeSpan.TryParse(sAdminTime, (o) => { _tsAdminTime = o }) && _tsAdminTime <= this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails[StepIndex].EndDTTM.TimeOfDay) {
                        bReturnValue = true;
                        break;
                    }
                }
            }
        }
        return bReturnValue;
    }
    private ValidateForStartFromNextDay_MessageBoxClose(sender: Object, e: MessageEventArgs): void {
        let bResult: boolean = false;
        let _IsMessageBoxCancelled: boolean = false;
        if (e.MessageBoxResult == MessageBoxResult.Yes) {
            this.IsStartDTTMMoveNextDay = true;
        }
        else if (e.MessageBoxResult == MessageBoxResult.No) {
            this.IsStartDTTMMoveNextDay = false;
        }
        else if (e.MessageBoxResult == MessageBoxResult.Cancel) {
            _IsMessageBoxCancelled = true;
        }
        if (!_IsMessageBoxCancelled) {
            this.IsValidateForStartFromNextDayMsgShown = true;
            if (this.objfrm != null && this.objfrm.FormViewerDetails != null && this.objfrm.FormViewerDetails.BasicDetails != null) {
                this.objfrm.FormViewerDetails.BasicDetails.IsStartFromNextDay = this.IsStartDTTMMoveNextDay;
            }
            if (this.cmdAdd.IsEnabled) {
                if (!this.IsStartDTTMMoveNextDay) {
                    bResult = this.ValidateForPerviousAndCurrentStepOverlapAdminTime();
                }
                else {
                    bResult = this.ValidateStopDTTMMismatchDuration(CConstants.SVActionAdd);
                }
            }
            else if (this.cmdUpdate.IsEnabled) {
                if (!this.IsStartDTTMMoveNextDay) {
                    bResult = this.ValidateForPerviousAndCurrentStepOverlapAdminTime();
                }
                else {
                    bResult = this.ValidateStepDurationAmendment();
                }
            }
            if (bResult) {
                this.LaunchChangingDoseMezzanine();
            }
        }
    }
    private validateForStartFromNextDay(): void {
        let bResult: boolean = false;
        if (this.objfrm != null && this.objfrm.FormViewerDetails != null && this.objfrm.FormViewerDetails.BasicDetails != null) {
            this.objfrm.FormViewerDetails.BasicDetails.IsStartFromNextDay = this.IsStartDTTMMoveNextDay;
        }
        if (this.cmdAdd.IsEnabled) {
            if (!this.IsStartDTTMMoveNextDay) {
                bResult = this.ValidateForPerviousAndCurrentStepOverlapAdminTime();
            }
            else {
                bResult = this.ValidateStopDTTMMismatchDuration(CConstants.SVActionAdd);
            }
        }
        else if (this.cmdUpdate.IsEnabled) {
            if (!this.IsStartDTTMMoveNextDay) {
                bResult = this.ValidateForPerviousAndCurrentStepOverlapAdminTime();
            }
            else {
                bResult = this.ValidateStepDurationAmendment();
            }
        }
        if (bResult) {
            this.LaunchChangingDoseMezzanine();
        }
    }
    public ValidateForPerviousAndCurrentStepOverlapAdminTime(): boolean {
        let _TempPrevStepEndDTTM: DateTime, _TempNewStepStartDTTM = DateTime.MinValue;
        let _bResult: boolean = true;
        let _NewItemAdminTime: TimeSpan = TimeSpan.MinValue;
        let _SelectedAdminTime: string;
        let _NewItemRowIndex: number;
        let _SelectedRowIndex: number = -1;
        if ((this.cmdAdd.IsEnabled || this.cmdUpdate.IsEnabled) && this.objfrm != null && this.objfrm.FormViewerDetails != null && this.objfrm.FormViewerDetails.BasicDetails != null && this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails != null && this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails.Count > 0 && (!this.IsStartDTTMMoveNextDay || (this.objfrm.FormViewerDetails.BasicDetails.SelectedDoseDetail != null && !this.objfrm.FormViewerDetails.BasicDetails.SelectedDoseDetail.IsStartFromNextDay))) {
            if (this.cmdAdd.IsEnabled) {
                _SelectedRowIndex = this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails.Count - 1;
            }
            else if (this.cmdUpdate.IsEnabled && this.objfrm.FormViewerDetails.BasicDetails.SelectedDoseDetail != null) {
                _SelectedRowIndex = this.grdData.GetCurrentRowIndex() - 1;
            }
            if (this.oAdminTimesVM != null && this.oAdminTimesVM.FreqDetails != null && this.oAdminTimesVM.FreqDetails.oFrequency != null && !String.IsNullOrEmpty(this.oAdminTimesVM.FreqDetails.oFrequency.UOM) && String.Equals(this.oAdminTimesVM.FreqDetails.oFrequency.UOM, CConstants.OnceOnlyFrequency, StringComparison.InvariantCultureIgnoreCase)) {
                let _PrevStepIndex: number = -1;
                let _NextStepIndex: number = -1;
                this.GetNewAdminTime((o1) => { _SelectedAdminTime = o1 }, (o2) => { _NewItemAdminTime = o2 });
                _NewItemRowIndex = this.GetNewItemRowIndexForAdditionalDose(_NewItemAdminTime);
                if (this.cmdAdd.IsEnabled) {
                    _PrevStepIndex = _NewItemRowIndex - 1;
                    _NextStepIndex = _NewItemRowIndex;
                }
                else {
                    _PrevStepIndex = _NewItemRowIndex - 1;
                    _NextStepIndex = _NewItemRowIndex + 1;
                }
                if (_PrevStepIndex > -1 && this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails.Count > _PrevStepIndex && this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails[_PrevStepIndex].IsAdditionalDose && _NewItemAdminTime == this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails[_PrevStepIndex].EndDTTM.TimeOfDay) {
                    _bResult = false;
                }
                else if (_NextStepIndex > -1 && this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails.Count > _NextStepIndex && this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails[_NextStepIndex].IsAdditionalDose && _NewItemAdminTime.Add(TimeSpan.FromMinutes(1)) == this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails[_NextStepIndex].StartDTTM.TimeOfDay) {
                    _bResult = false;
                }
            }
            else if (_SelectedRowIndex > -1 && this.oAdminTimesVM != null && this.oAdminTimesVM.GrdData != null && !this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails[_SelectedRowIndex].IsAdditionalDose) {
                _TempNewStepStartDTTM = this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails[_SelectedRowIndex].EndDTTM.AddMinutes(1);
                _TempPrevStepEndDTTM = this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails[_SelectedRowIndex].EndDTTM;
                let _IsFixedTime: boolean = ObjectHelper.HasValue(this.iRdBtnFixedTime.IsChecked) ? this.iRdBtnFixedTime.IsChecked.Value : false;
                if (DateTime.Equals(_TempPrevStepEndDTTM.Date, _TempNewStepStartDTTM.Date) && !this.objfrm.FormViewerDetails.BasicDetails.IsAnyScheduleExistInLastDayOfStep(_SelectedRowIndex) && PrescriptionHelper.ValidateAdminTimesAgainstGivenDTTM(_TempPrevStepEndDTTM, this.oAdminTimesVM.GrdData, _IsFixedTime)) {
                    _bResult = false;
                }
            }
            if (!_bResult) {
                let objMsg: iMessageBox = new iMessageBox();
                objMsg.MessageButton = MessageBoxButton.OK;
                objMsg.IconType = MessageBoxType.Information;
                objMsg.Title = "Lorenzo - Manage prescription";
                objMsg.Message = Resource.steppeddose.ScheduledTimeOverLap;
                objMsg.Show();
            }
        }
        if (_bResult) {
            if (this.cmdAdd.IsEnabled) {
                _bResult = this.ValidateStopDTTMMismatchDuration(CConstants.SVActionAdd);
            }
            else if (this.cmdUpdate.IsEnabled) {
                _bResult = this.ValidateStepDurationAmendment();
            }
        }
        return _bResult;
    }
    private ValidateForGivenAdministrationTimesNotFitInCurrentStep(): boolean {
        let _bResult: boolean = true;
        let _TempNewStepStartDTTM: DateTime = DateTime.MinValue;
        let _TempNewStepEndDTTM: DateTime = DateTime.MinValue;
        let dTempScheduleDTTM: DateTime = DateTime.MinValue;
        let _SelectedRowIndex: number = -1;
        let _IsTimeNotMatch: boolean = false;
        if ((this.cmdAdd.IsEnabled || this.cmdUpdate.IsEnabled) && this.objfrm != null && this.objfrm.FormViewerDetails != null && this.objfrm.FormViewerDetails.BasicDetails != null && this.oAdminTimesVM != null && this.oAdminTimesVM.GrdData != null && this.oAdminTimesVM.GrdData.Count > 0 && !String.IsNullOrEmpty(this.cboDuration.GetValue()) && (String.Equals(this.cboDuration.GetValue(), ConstDurationUOM.Hours, StringComparison.InvariantCultureIgnoreCase) || String.Equals(this.cboDuration.GetValue(), ConstDurationUOM.Days, StringComparison.InvariantCultureIgnoreCase)) && this.udDuration.Value != null && !String.IsNullOrEmpty(this.udDuration.Value.ToString()) && this.udDuration.Value > 0) {
            let _IsFixedTime: boolean = (this.iRdBtnFixedTime.IsChecked == true) ? true : false;
            let nAdminTimesCount: number = this.oAdminTimesVM.GrdData.Count;
            if (this.cmdAdd.IsEnabled) {
                if (DateTime.NotEquals(this.objfrm.FormViewerDetails.BasicDetails.StartDTTM, DateTime.MinValue) && this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails != null && this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails.Count == 0) {
                    _TempNewStepStartDTTM = this.objfrm.FormViewerDetails.BasicDetails.StartDTTM;
                }
                else if (this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails != null && this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails.Count > 0) {
                    _SelectedRowIndex = this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails.Count - 1;
                    _TempNewStepStartDTTM = this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails[_SelectedRowIndex].EndDTTM;
                }
            }
            else if (this.cmdUpdate.IsEnabled && this.objfrm.FormViewerDetails.BasicDetails.SelectedDoseDetail != null && this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails != null && this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails.Count > 0) {
                _SelectedRowIndex = this.grdData.GetCurrentRowIndex() - 1;
                if (_SelectedRowIndex == -1) {
                    _SelectedRowIndex = 0;
                }
                _TempNewStepStartDTTM = this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails[_SelectedRowIndex].StartDTTM;
            }
            if (DateTime.NotEquals(_TempNewStepStartDTTM, DateTime.MinValue)) {
                if (String.Equals(this.cboDuration.GetValue(), ConstDurationUOM.Hours, StringComparison.InvariantCultureIgnoreCase)) {
                    _TempNewStepEndDTTM = _TempNewStepStartDTTM.AddHours(this.udDuration.Value).AddMinutes(-1);
                }
                else if (String.Equals(this.cboDuration.GetValue(), ConstDurationUOM.Days, StringComparison.InvariantCultureIgnoreCase)) {
                    let StartDTTM: DateTime;
                    let StopDTTM: DateTime;
                    MCommonBB.CalculateEndDTTMForDaysDuration(this.oAdminTimesVM.GrdData, _TempNewStepStartDTTM, DateTime.MinValue, _IsFixedTime, Convert.ToInt32(this.udDuration.Value), (o1) => { StartDTTM = o1 }, (o2) => { StopDTTM = o2 });
                    _TempNewStepEndDTTM = StopDTTM;
                }
                for (let nAdminTimeIdx: number = 0; nAdminTimeIdx < nAdminTimesCount; nAdminTimeIdx++) {
                    let _bAdminTime: boolean;
                    let ts: TimeSpan = new TimeSpan();
                    if (_IsFixedTime) {
                        _bAdminTime = TimeSpan.TryParse(this.oAdminTimesVM.GrdData[nAdminTimeIdx].FixedTimes, (o) => { ts = o });
                    }
                    else {
                        _bAdminTime = TimeSpan.TryParse(this.oAdminTimesVM.GrdData[nAdminTimeIdx].DruRoundTimes, (o) => { ts = o });
                    }
                    if (_bAdminTime && DateTime.NotEquals(_TempNewStepEndDTTM, DateTime.MinValue)) {
                        dTempScheduleDTTM = _TempNewStepStartDTTM.DateTime.Add(ts);
                        if (this.IsStartDTTMMoveNextDay) {
                            dTempScheduleDTTM = dTempScheduleDTTM.AddDays(1);
                        }
                        if (DateTime.GreaterThanOrEqualTo(dTempScheduleDTTM, _TempNewStepStartDTTM) && DateTime.LessThanOrEqualTo(dTempScheduleDTTM, _TempNewStepEndDTTM)) {
                            _IsTimeNotMatch = true;
                            break;
                        }
                    }
                }
            }
            if (!_IsTimeNotMatch) {
                _bResult = false;
                let objMsg: iMessageBox = new iMessageBox();
                objMsg.MessageButton = MessageBoxButton.OK;
                objMsg.IconType = MessageBoxType.Question;
                objMsg.Title = "Lorenzo - Manage prescription";
                objMsg.MessageBoxClose = (s, e) => { this.ValidateForGivenAdministrationTimesNotFit_MessageBoxClose(s, e); };
                objMsg.Message = Resource.steppeddose.GivenAdministrationTimesNotFitInStep;
                objMsg.Show();
            }
        }
        return _bResult;
    }
    private ValidateForGivenAdministrationTimesNotFit_MessageBoxClose(sender: Object, e: MessageEventArgs): void {
        if (e.MessageBoxResult == MessageBoxResult.OK) {
            this.IsStartDTTMMoveNextDay = false;
            this.IsValidateForStartFromNextDayMsgShown = false;
        }
    }
    private IsCanStartFromNextDay(): boolean {
        let _TempPrevStepEndDTTM: DateTime, _TempNewStepStartDTTM = DateTime.MinValue;
        let _IsStartDTTMMoveNextDay: boolean = false;
        let _IsFixedTime: boolean = false;
        let _IsPartiallyCrossedStartDate: boolean, _IsDayCrossedStartDate;
        let _SelectedRowIndex: number = -1;
        if ((this.cmdAdd.IsEnabled || this.cmdUpdate.IsEnabled) && this.objfrm != null && this.objfrm.FormViewerDetails != null && this.objfrm.FormViewerDetails.BasicDetails != null && this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails != null && this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails.Count > 0) {
            if (this.cmdAdd.IsEnabled) {
                _SelectedRowIndex = this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails.Count - 1;
            }
            else if (this.cmdUpdate.IsEnabled && this.objfrm.FormViewerDetails.BasicDetails.SelectedDoseDetail != null && this.objfrm.FormViewerDetails.BasicDetails.SelectedDoseDetail.IsStartFromNextDay) {
                _SelectedRowIndex = this.grdData.GetCurrentRowIndex() - 1;
            }
            if (_SelectedRowIndex > -1 && this.oAdminTimesVM != null && this.oAdminTimesVM.GrdData != null && this.oAdminTimesVM.FreqDetails != null && this.oAdminTimesVM.FreqDetails.oFrequency != null && !String.IsNullOrEmpty(this.oAdminTimesVM.FreqDetails.oFrequency.UOM)) {
                _IsFixedTime = (this.iRdBtnFixedTime.IsChecked == true) ? true : false;
                _TempNewStepStartDTTM = this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails[_SelectedRowIndex].EndDTTM.AddMinutes(1);
                _TempPrevStepEndDTTM = this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails[_SelectedRowIndex].EndDTTM;
                if (DateTime.Equals(_TempPrevStepEndDTTM.Date, _TempNewStepStartDTTM.Date) && this.objfrm.FormViewerDetails.BasicDetails.IsAnyScheduleExistInLastDayOfStep(_SelectedRowIndex)) {
                    {
                        _IsStartDTTMMoveNextDay = true;
                    }
                }
            }
        }
        return _IsStartDTTMMoveNextDay;
    }
    public grdData_SelectionChanged(sender: Object, e: SelectionChangeEventArgs): void {
        this.IsChangingDose = false;
        let nSelectedRowCount: number = this.grdData.GetSelectedRowCount();
        if (this.objfrm != null && this.objfrm.FormViewerDetails != null && this.objfrm.FormViewerDetails.BasicDetails != null) {
            this.objfrm.FormViewerDetails.BasicDetails.IsEnableVariableInst = true;
            if (nSelectedRowCount > 0 && this.objfrm != null && this.objfrm.FormViewerDetails != null && this.objfrm.FormViewerDetails.BasicDetails != null) {
                this.objfrm.FormViewerDetails.BasicDetails.IsenableStartdate = false;
                this.objfrm.FormViewerDetails.BasicDetails.IsEnableStartTime = false;
            }
            else {
                this.objfrm.FormViewerDetails.BasicDetails.IsenableStartdate = true;
                this.objfrm.FormViewerDetails.BasicDetails.IsEnableStartTime = true;
            }
            this.objfrm.FormViewerDetails.BasicDetails.IsSteppedVariableFormEnabled = true;
        }
        if (nSelectedRowCount == 1) {
            //Revisit required. When iGrid's SelectedIndex binding starts working as Two-Way then this line below needs to be removed.
            this.objfrm.FormViewerDetails.BasicDetails.SelectedDoseDetail = this.grdData.ItemsSource.array[this.grdData.selectedRowsIndex[0]];
            /////

            let objgrddata: MultipleDoseDetail = this.objfrm.FormViewerDetails.BasicDetails.SelectedDoseDetail;
            if (objgrddata == null) {
                this.ClearControls();
            }
            else {
                if (objgrddata.IsAdditionalDose && this.objfrm.ActionCode == ActivityTypes.Reorder && objgrddata.FreqDetails != null && objgrddata.FreqDetails.oFrequency != null && this.objfrm != null && this.objfrm.FormViewerDetails != null && this.objfrm.FormViewerDetails.BasicDetails != null && !String.IsNullOrEmpty(objgrddata.FreqDetails.oFrequency.UOM) && String.Equals(objgrddata.FreqDetails.oFrequency.UOM, CConstants.OnceOnlyFrequency, StringComparison.InvariantCultureIgnoreCase) && DateTime.LessThan(objgrddata.StartDTTM.Date, CommonBB.GetServerDateTime().Date)) {
                    this.objfrm.FormViewerDetails.BasicDetails.IsSteppedVariableFormEnabled = false;
                }
                if (PatientContext.PrescriptionType == PrescriptionTypes.Clerking && DateTime.Equals(this.objfrm.FormViewerDetails.BasicDetails.StartDTTM, DateTime.MinValue) && DateTime.NotEquals(objgrddata.StartDTTM, DateTime.MinValue) && this.grdData != null) {
                    let totRowCnt: number = this.grdData.GetRowCount();
                    if (totRowCnt > 0) {
                        let objgrdFirstStep: MultipleDoseDetail = ObjectHelper.CreateType<MultipleDoseDetail>(this.grdData.GetRowData(0), MultipleDoseDetail);
                        if (objgrdFirstStep != null)
                            this.objfrm.FormViewerDetails.BasicDetails.StartDTTM = objgrdFirstStep.StartDTTM;
                    }
                }
                this.objfrm.FormViewerDetails.BasicDetails.CloneSelectedDoseDetail(this.objfrm.FormViewerDetails.BasicDetails.SelectedDoseDetail);
                if (this.objfrm.FormViewerDetails.BasicDetails.SelectedDoseDetail != null && this.objfrm.FormViewerDetails.BasicDetails.SelectedDoseDetail.ScheduleDetailsData != null) {
                    this.ScheduleDetailsColsDetails = new ObservableCollection<ScheduleDetailsCols>();
                    for (let i: number = 0; i < this.objfrm.FormViewerDetails.BasicDetails.SelectedDoseDetail.ScheduleDetailsData.Count; i++) {
                        this.ScheduleDetailsColsDetails.Add(this.objfrm.FormViewerDetails.BasicDetails.SelectedDoseDetail.ScheduleDetailsData[i].GetCloneObject());
                    }
                    this.objfrm.FormViewerDetails.BasicDetails.Isdoseenable = false;
                    this.cboUOM.IsEnabled = false;
                    if (this.ScheduleDetailsColsDetails != null && this.ScheduleDetailsColsDetails.Count > 0) {
                        this.objfrm.FormViewerDetails.BasicDetails.IsAdminTimesGridEnabled = (this.ScheduleDetailsColsDetails.Where(c => !String.IsNullOrEmpty(c.ScheduleTime) && c.ScheduleTime == "00:00").Count() > 1) ? true : false;
                    }
                    else {
                        this.objfrm.FormViewerDetails.BasicDetails.IsAdminTimesGridEnabled = true;
                    }
                    this.cboDuration.IsEnabled = false;
                    this.udDuration.IsEnabled = false;
                    this.cboDuration.IsEnabled = false;
                    this.cboFrequency.IsEnabled = false;
                    this.objfrm.FormViewerDetails.BasicDetails.IsFreqenable = false;
                    this.lblDaysOfWeek.Mandatory = false;
                    if (this.oAdminTimesVM != null)
                        this.oAdminTimesVM.IsSunEnable = this.oAdminTimesVM.IsMonEnable = this.oAdminTimesVM.IsTueEnable = this.oAdminTimesVM.IsWedEnable = this.oAdminTimesVM.IsThuEnable = this.oAdminTimesVM.IsFriEnable = this.oAdminTimesVM.IsSatEnable = this.oAdminTimesVM.IsSunEnable = false;
                }
                else {
                    if (objgrddata != null) {
                        if (String.IsNullOrEmpty(objgrddata.LowerDose.ToString()) || (objgrddata.LowerDose == 0.0 && objgrddata.DoseUOM != null && (objgrddata.DoseUOM.Value == "0"))) {
                            this.txtLowerDose.Text = String.Empty;
                        }
                        else {
                            this.txtLowerDose.Text = (objgrddata.LowerDose >= 0) ? objgrddata.LowerDose.ToString() : String.Empty;
                        }
                    }
                    else {
                        this.txtLowerDose.Text = String.Empty;
                    }
                    this.txtUpperDose.Text = (objgrddata.UpperDose > 0) ? objgrddata.UpperDose.ToString() : String.Empty;
                    this.udDuration.IsEnabled = this.cboDuration.IsEnabled = !this.IsDaywise;
                    this.dLowerDose = objgrddata.LowerDose;
                    this.dUpperDose = objgrddata.UpperDose;
                    this.sDoseUOM = objgrddata.DoseUOM != null ? objgrddata.DoseUOM.Value : String.Empty;
                    this.dDuration = objgrddata.Duration;
                    this.dDurUOM = objgrddata.DurationUOM != null ? objgrddata.DurationUOM.Value : String.Empty;
                    this.dFrequency = objgrddata.Frequency != null ? objgrddata.Frequency.Value : String.Empty;
                    if (this.objfrm != null && this.objfrm.FormViewerDetails != null && this.objfrm.FormViewerDetails.BasicDetails != null) {
                        if (this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails != null && this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails.Count > 0 && !this.objfrm.FormViewerDetails.BasicDetails.IsDifferentDoseUOMFrmSourceForSV && this.objfrm.FormViewerDetails.BasicDetails.IsNotInPatientSteppedVariableAmend) {
                            let _SelectedIdx: number[] = this.grdData.GetSelectedRowsIndex();
                            if (_SelectedIdx != null && _SelectedIdx.Count() > 0 && _SelectedIdx[0] == 0 && this.objfrm.FormViewerDetails.BasicDetails.IsSteppedVariableFormEnabled) {
                                this.cboUOM.IsEnabled = true;
                            }
                            else {
                                this.cboUOM.IsEnabled = false;
                            }
                        }
                        else {
                            this.cboUOM.IsEnabled = this.objfrm.FormViewerDetails.BasicDetails.IsSteppedVariableFormEnabled;
                        }
                    }
                }
                if (objgrddata.DoseUOM != null && !String.IsNullOrEmpty(objgrddata.DoseUOM.Value) && !String.IsNullOrEmpty(objgrddata.DoseUOM.DisplayText) && this.objfrm.FormViewerDetails.BasicDetails.DefaultDetails.Uoms != null) {
                    let selectedDoseUOM = this.objfrm.FormViewerDetails.BasicDetails.DefaultDetails.Uoms.Where(item => item.Value == objgrddata.DoseUOM.Value);
                    let AvailMore = this.objfrm.FormViewerDetails.BasicDetails.DefaultDetails.Uoms.Where(item => String.Equals(item.Value, CConstants.CONST_MORE));
                    let DefaultUOMCnt: number = this.objfrm.FormViewerDetails.BasicDetails.DefaultDetails.Uoms.Count;
                    if (selectedDoseUOM != null && selectedDoseUOM.Count() > 0) {
                        this.objfrm.FormViewerDetails.BasicDetails.SteppedDoseUOM = selectedDoseUOM.First();
                    }
                    else {
                        if (AvailMore != null && DefaultUOMCnt >= 1)
                            this.objfrm.FormViewerDetails.BasicDetails.DefaultDetails.Uoms.Insert(DefaultUOMCnt - 1, objgrddata.DoseUOM);
                        else this.objfrm.FormViewerDetails.BasicDetails.DefaultDetails.Uoms.Add(objgrddata.DoseUOM);
                        this.objfrm.FormViewerDetails.BasicDetails.SteppedDoseUOM = objgrddata.DoseUOM;
                    }
                }
                this.udDuration.Value = (objgrddata.Duration > 0) ? objgrddata.Duration : Number.MinValue;
                if (objgrddata.DurationUOM != null && !String.IsNullOrEmpty(objgrddata.DurationUOM.Value) && !String.IsNullOrEmpty(objgrddata.DurationUOM.DisplayText) && this.objfrm.FormViewerDetails.BasicDetails.DefaultDetails.Duration != null) {
                    let selectedDurationUOM = this.objfrm.FormViewerDetails.BasicDetails.DefaultDetails.Duration.Where(item => item.Value == objgrddata.DurationUOM.Value);
                    if (selectedDurationUOM != null && selectedDurationUOM.Count() > 0) {
                        this.cboDuration.SelectedValue = selectedDurationUOM.First();
                    }
                    else {
                        this.objfrm.FormViewerDetails.BasicDetails.DefaultDetails.Duration.Add(objgrddata.DurationUOM);
                        this.cboDuration.SelectedValue = objgrddata.DurationUOM;
                        if (objgrddata.DurationUOM != null && String.Equals(objgrddata.DurationUOM.Value, ConstDurationUOM.Minutes, StringComparison.InvariantCultureIgnoreCase)) {
                            this.DynamicAddedMinutesDuration = objgrddata.DurationUOM;
                        }
                    }
                }
                else if (objgrddata.DurationUOM == null) {
                    this.cboDuration.SelectedIndex = -1;
                }
                if (objgrddata.Frequency != null && !String.IsNullOrEmpty(objgrddata.Frequency.Value) && !String.IsNullOrEmpty(objgrddata.Frequency.DisplayText) && this.objfrm.FormViewerDetails.BasicDetails.DefaultDetails.SteppedFrequencies != null) {
                    let selectedDurationUOM = this.objfrm.FormViewerDetails.BasicDetails.DefaultDetails.SteppedFrequencies.Where(item => item.Value == objgrddata.Frequency.Value);
                    if (selectedDurationUOM != null && selectedDurationUOM.Count() > 0) {
                        if (this.cboFrequency.SelectedValue != null) {
                            this.cboFrequency.SelectedValue = null;
                        }
                        this.cboFrequency.SelectedValue = selectedDurationUOM.First();
                        if ((<string[]>(selectedDurationUOM.First().Tag)).Count() > 1 && (<string[]>(selectedDurationUOM.First().Tag))[1] != null && String.Compare((<string[]>(selectedDurationUOM.First().Tag))[1], CConstants.OnceOnlyFrequency, StringComparison.CurrentCultureIgnoreCase) == 0) {
                            this.cboDuration.IsEnabled = false;
                            this.udDuration.IsEnabled = false;
                        }
                    }
                    else {
                        let iIndex: number = 0;
                        if (this.objfrm.FormViewerDetails.BasicDetails.DefaultDetails.SteppedFrequencies.Count > 0)
                            iIndex = this.objfrm.FormViewerDetails.BasicDetails.DefaultDetails.SteppedFrequencies.Count - 1;
                        this.objfrm.FormViewerDetails.BasicDetails.DefaultDetails.SteppedFrequencies.Insert(iIndex, objgrddata.Frequency);
                        this.cboFrequency.SelectedValue = objgrddata.Frequency;
                        if (objgrddata != null && objgrddata.Frequency != null && objgrddata.Frequency.Tag != null && (<string[]>(objgrddata.Frequency.Tag)).length > 1 && String.Equals((<string[]>(objgrddata.Frequency.Tag))[1], CConstants.OnceOnlyFrequency, StringComparison.InvariantCultureIgnoreCase)) {
                            this.DynamicAddedOnceOnly = new CListItem();
                            this.DynamicAddedOnceOnly = objgrddata.Frequency;
                            this.cboDuration.IsEnabled = false;
                            this.udDuration.IsEnabled = false;
                        }
                    }
                    if (this.IsPeriodFrequency) {
                        this.grdAdminTimes.Columns[0].Header = "Scheduled";
                        this.grdAdminTimes.Columns[1].Header = "Drug round";
                        if (this.objfrm.ActionCode == ActivityTypes.Reorder) {
                            this.grdAdminTimes.Columns[0].IsReadOnly = false;
                            if (this.objfrm.FormViewerDetails.BasicDetails.SelectedDoseDetail != null && this.objfrm.FormViewerDetails.BasicDetails.SelectedDoseDetail.AdminTimesData != null && !String.IsNullOrEmpty(this.objfrm.FormViewerDetails.BasicDetails.SelectedDoseDetail.AdminTimesData[0].DruRoundTimes)) {
                                this.iRdBtndrgRoundTime.IsEnabled = true;
                            }
                        }
                    }
                    else {
                        this.grdAdminTimes.Columns[0].Header = "Date";
                        this.grdAdminTimes.Columns[1].Header = "Time";
                    }
                    if (this.oAdminTimesVM != null && this.oAdminTimesVM.GrdData != null && this.oAdminTimesVM.GrdData.Count > 0 && !String.IsNullOrEmpty(this.oAdminTimesVM.GrdData[0].FrequencyUOM) && String.Compare(this.oAdminTimesVM.GrdData[0].FrequencyUOM, "CC_MEDDRSN2", StringComparison.CurrentCultureIgnoreCase) == 0) {
                        this.VisibileDayOfWeek();
                        this.chkSunday.DataContext = this.chkMonday.DataContext = this.chkTuesday.DataContext = this.chkWednesday.DataContext = this.chkThursday.DataContext = this.chkFriday.DataContext = this.chkSaturday.DataContext = this.oAdminTimesVM;
                        if (this.oAdminTimesVM.FreqDetails != null && this.oAdminTimesVM.FreqDetails.oFrequency != null && !this.oAdminTimesVM.FreqDetails.oFrequency.IsSunday && !this.oAdminTimesVM.FreqDetails.oFrequency.IsMonday && !this.oAdminTimesVM.FreqDetails.oFrequency.IsTuesday && !this.oAdminTimesVM.FreqDetails.oFrequency.IsWednesday && !this.oAdminTimesVM.FreqDetails.oFrequency.IsThursday && !this.oAdminTimesVM.FreqDetails.oFrequency.IsFriday && !this.oAdminTimesVM.FreqDetails.oFrequency.IsSaturday) {
                            this.oAdminTimesVM.IsSunEnable = this.oAdminTimesVM.IsMonEnable = this.oAdminTimesVM.IsTueEnable = this.oAdminTimesVM.IsWedEnable = this.oAdminTimesVM.IsThuEnable = this.oAdminTimesVM.IsFriEnable = this.oAdminTimesVM.IsSatEnable = this.oAdminTimesVM.IsSunEnable = true;
                        }
                    }
                    else {
                        this.InVisibileDayOfWeek();
                    }
                    if (String.IsNullOrEmpty(this.objfrm.FormViewerDetails.BasicDetails.RecordAdminMsg1)) {
                        this.objfrm.FormViewerDetails.BasicDetails.SetAdditionalOptionMessage();
                    }
                }
                else if (objgrddata.Frequency == null) {
                    this.cboFrequency.SelectedIndex = -1;
                    if (this.oAdminTimesVM != null) {
                        this.oAdminTimesVM.GrdData = null;
                    }
                }
                if (!String.IsNullOrEmpty(this.cboFrequency.GetValue()) && this.udDuration.Value > 0 && !String.IsNullOrEmpty(this.cboDuration.GetValue()) && this.oAdminTimesVM != null && objgrddata.oAdminTimesVM != null && objgrddata.oAdminTimesVM.FreqDetails != null) {
                    this.oAdminTimesVM.FreqDetails = objgrddata.oAdminTimesVM.FreqDetails;
                    if (this.oAdminTimesVM.FreqDetails.oFrequency != null && !String.IsNullOrEmpty(this.oAdminTimesVM.FreqDetails.oFrequency.Type) && String.Compare(this.oAdminTimesVM.FreqDetails.oFrequency.Type, "CC_INTERVAL") == 0)
                        this.oAdminTimesVM_FreqDetailsCompleted();
                }
                if (objgrddata.DoseInstructions != null)
                    this.txtVariable.Text = objgrddata.DoseInstructions;
                this.IsDaywise = objgrddata.IsDaywiseView;
                if (objgrddata.InfusionRate != null && !String.IsNullOrEmpty(objgrddata.InfusionRate))
                    this.txtInfusionRate.Text = objgrddata.InfusionRate;
                if (objgrddata.InfusionUpperrate != null && !String.IsNullOrEmpty(objgrddata.InfusionUpperrate)) {
                    this.txtUpperInfusionRate.Text = objgrddata.InfusionUpperrate;
                    this.txtUpperInfusionRate.IsEnabled = true;
                }
                if (this.objfrm.FormViewerDetails.BasicDetails.InfusionDetails != null && this.objfrm.FormViewerDetails.BasicDetails.InfusionDetails.InfRateNumeratorUOM != null && this.objfrm.FormViewerDetails.BasicDetails.InfusionDetails.InfRateNumeratorUOM.Count > 0 && objgrddata.Infratenumeratoruom != null && !String.IsNullOrEmpty(objgrddata.Infratenumeratoruom.DisplayText)) {
                    let selectedRateNumeratorUOM = this.objfrm.FormViewerDetails.BasicDetails.InfusionDetails.InfRateNumeratorUOM.Where(item => item.Value == objgrddata.Infratenumeratoruom.Value);
                    if (selectedRateNumeratorUOM != null && selectedRateNumeratorUOM.Count() > 0) {
                        this.cboInfRateNumUOM.SelectedValue = selectedRateNumeratorUOM.First();
                    }
                    else {
                        this.objfrm.FormViewerDetails.BasicDetails.InfusionDetails.InfRateNumeratorUOM.Add(objgrddata.Infratenumeratoruom);
                        this.cboInfRateNumUOM.SelectedValue = objgrddata.Infratenumeratoruom;
                    }
                }
                if (this.objfrm.FormViewerDetails.BasicDetails.InfusionDetails != null && this.objfrm.FormViewerDetails.BasicDetails.InfusionDetails.InfRateDenominatorUOM != null && this.objfrm.FormViewerDetails.BasicDetails.InfusionDetails.InfRateDenominatorUOM.Count > 0 && objgrddata.InfrateDenominatoruom != null && !String.IsNullOrEmpty(objgrddata.InfrateDenominatoruom.DisplayText)) {
                    let selectedRateDinaminatorUOM = this.objfrm.FormViewerDetails.BasicDetails.InfusionDetails.InfRateDenominatorUOM.Where(item => item.Value == objgrddata.InfrateDenominatoruom.Value);
                    if (selectedRateDinaminatorUOM != null && selectedRateDinaminatorUOM.Count() > 0) {
                        this.cboInfRateDenoUOM.SelectedValue = selectedRateDinaminatorUOM.First();
                    }
                    else {
                        this.objfrm.FormViewerDetails.BasicDetails.InfusionDetails.InfRateDenominatorUOM.Add(objgrddata.InfrateDenominatoruom);
                        this.cboInfRateDenoUOM.SelectedValue = objgrddata.InfrateDenominatoruom;
                    }
                }
                if (this.ScheduleDetailsColsDetails != null && this.ScheduleDetailsColsDetails.Count > 0) {
                    this.IsChangingDose = true;
                    this.btnChangingDose.IsEnabled = true;
                }
                else this.EnableChangingDose();
                this.cmdRemove.IsEnabled = this.cmdUpdate.IsEnabled = true;
                this.cmdAdd.IsEnabled = false;
                if (this.objfrm != null && this.objfrm.FormViewerDetails != null && this.objfrm.FormViewerDetails.BasicDetails != null && !this.objfrm.FormViewerDetails.BasicDetails.IsSteppedVariableFormEnabled) {
                    this.objfrm.FormViewerDetails.BasicDetails.Isdoseenable = false;
                    this.objfrm.FormViewerDetails.BasicDetails.IsFreqenable = false;
                    this.objfrm.FormViewerDetails.BasicDetails.IsEnableVariableInst = false;
                    this.objfrm.FormViewerDetails.BasicDetails.IsAdmintimesenable = false;
                    this.btnChangingDose.IsEnabled = false;
                    this.iRdBtnFixedTime.IsEnabled = false;
                    this.iRdBtndrgRoundTime.IsEnabled = false;
                    this.grdAdminTimes.IsEnabled = false;
                    this.cmdUpdate.IsEnabled = false;
                    if (this.oAdminTimesVM != null && this.oAdminTimesVM.GrdData != null && this.oAdminTimesVM.GrdData.Count > 0 && this.oAdminTimesVM.GrdData[0] != null) {
                        this.oAdminTimesVM.GrdData[0].IsFixedEnabled = false;
                        this.oAdminTimesVM.GrdData[0].IsFixedMandatory = false;
                        this.oAdminTimesVM.GrdData[0].IsDrugRoundEnabled = false;
                        this.oAdminTimesVM.GrdData[0].IsDrugRoundMandatory = false;
                    }
                }
            }
            if (this.objfrm != null && this.objfrm.FormViewerDetails != null) {
                this.objfrm.FormViewerDetails.SteppedPopup = false;
                if (this.objfrm.FormViewerDetails.BasicDetails != null && objgrddata != null) {
                    this.objfrm.FormViewerDetails.BasicDetails.IsChangingDoseContentModified = false;
                    this.objfrm.FormViewerDetails.BasicDetails.IsStartFromNextDay = objgrddata.IsStartFromNextDay;
                }
            }
        }
        else {
            if (!this.IsRowSelectionThrUpDownBut)
            {
                let isBasicDetail : boolean =false;
                if(this.objfrm != null && this.objfrm.FormViewerDetails != null && this.objfrm.FormViewerDetails.BasicDetails != null)
                {   isBasicDetail = true;
                    this.objfrm.FormViewerDetails.BasicDetails.IsCallFromSVGridUnSelect = true;
                }
                this.ClearControls();
                if(isBasicDetail)
                {
                    this.objfrm.FormViewerDetails.BasicDetails.IsCallFromSVGridUnSelect = false;
                }
            }
               
            if (nSelectedRowCount > 1) {
                this.cmdRemove.IsEnabled = true;
                this.cmdAdd.IsEnabled = false;
            }
            if (this.DynamicAddedOnceOnly != null && this.objfrm != null && this.objfrm.FormViewerDetails != null && this.objfrm.FormViewerDetails.BasicDetails != null && this.objfrm.FormViewerDetails.BasicDetails.DefaultDetails != null && this.objfrm.FormViewerDetails.BasicDetails.DefaultDetails.SteppedFrequencies != null && this.objfrm.FormViewerDetails.BasicDetails.DefaultDetails.SteppedFrequencies.Count > 0) {
                this.objfrm.FormViewerDetails.BasicDetails.DefaultDetails.SteppedFrequencies.Remove(this.DynamicAddedOnceOnly);
                this.DynamicAddedOnceOnly = null;
            }
            if (this.DynamicAddedMinutesDuration != null && this.objfrm != null && this.objfrm.FormViewerDetails != null && this.objfrm.FormViewerDetails.BasicDetails != null && this.objfrm.FormViewerDetails.BasicDetails.DefaultDetails != null && this.objfrm.FormViewerDetails.BasicDetails.DefaultDetails.DurationStepped != null && this.objfrm.FormViewerDetails.BasicDetails.DefaultDetails.DurationStepped.Count > 0) {
                this.objfrm.FormViewerDetails.BasicDetails.DefaultDetails.DurationStepped.Remove(this.DynamicAddedMinutesDuration);
                this.DynamicAddedMinutesDuration = null;
            }
        }
        if (this.objfrm != null && this.objfrm.FormViewerDetails != null && this.objfrm.FormViewerDetails.BasicDetails != null) {
            if (nSelectedRowCount >= 1) {
                this.btnFullPresView.IsEnabled = false;
            }
            else {
                this.btnFullPresView.IsEnabled = true;
            }
        }
        this.MoveUpDownEnable();
        if (this.objfrm != null && this.objfrm.FormViewerDetails != null && this.objfrm.FormViewerDetails.BasicDetails != null)
            this.objfrm.FormViewerDetails.BasicDetails.IsUserUpdatedChangingDose = false;
    }
    public MoveUpDownEnable(): void {
        let nSelectedRowCount: number = 0;
        if (this.grdData.GetSelectedRows() != null) {
            nSelectedRowCount = this.grdData.GetSelectedRows().Count;
        }
    }
    public txtInfusionRate_TextChanged(sender: Object, e: TextChangedEventArgs): void {
        let LText: string = this.txtInfusionRate.Text.ToString();
        LText.Trim();
        if (LText.length > 0) {
            this.txtUpperInfusionRate.IsEnabled = true;
            if (this.objfrm != null && this.objfrm.FormViewerDetails != null && this.objfrm.FormViewerDetails.BasicDetails != null && this.cboInfRateNumUOM != null && this.cboInfRateNumUOM.SelectedValue != null && this.cboInfRateDenoUOM != null && this.cboInfRateDenoUOM.SelectedValue != null) {
                this.objfrm.FormViewerDetails.BasicDetails.IsenableInfusionPeriod = false;
                if (this.objfrm.FormViewerDetails.BasicDetails.InfusionDetails != null) {
                    if (!String.IsNullOrEmpty(this.objfrm.FormViewerDetails.BasicDetails.InfusionDetails.InfusionPeriod)) {
                        this.objfrm.FormViewerDetails.BasicDetails.InfusionDetails.InfusionPeriod = String.Empty;
                    }
                    if (this.objfrm.FormViewerDetails.BasicDetails.InfusionDetails.InfusionPeriodUom != null) {
                        this.objfrm.FormViewerDetails.BasicDetails.InfusionDetails.InfusionPeriodUom = null;
                    }
                }
            }
        }
        else {
            this.txtUpperInfusionRate.IsEnabled = false;
        }
        if (String.IsNullOrEmpty(LText) && this.objfrm != null && this.objfrm.FormViewerDetails != null && this.objfrm.FormViewerDetails.BasicDetails != null && !this.objfrm.FormViewerDetails.BasicDetails.IsenableInfusionPeriod && (this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails == null || this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails.Count == 0)) {
            this.objfrm.FormViewerDetails.BasicDetails.IsenableInfusionPeriod = true;
        }
    }
    public cmdUpdate_Click(sender: Object, e: RoutedEventArgs): void {
        if (!this.bDuplicateAdminTimesPrompt) {
            this.UpdateClick();
        }
    }
    public UpdateClick(): boolean {
        let bNoError: boolean = false;
        let objgrddata: MultipleDoseDetail = this.objfrm.FormViewerDetails.BasicDetails.SelectedDoseDetail;
        this.sActionText = CConstants.SVActionUpdate;
        if (this.omedFormViewer == null) {
            this.omedFormViewer = CommonBB.FindParent<medFormViewer>(this, 'medFormViewer');
        }
        if (objgrddata != null && this.Validate(objgrddata) && this.ValidateDoseValue(objgrddata) && this.ValidatechangingDoseValue() && this.showduplicate() && this.InfIntermitValidation() && this.ValidateStepDurationAmendment() && this.ValidateForPerviousAndCurrentStepOverlapAdminTime()) {
            bNoError = this.UpdateClickedORLaunchChangingDoseMezzanine(objgrddata);
        }
        return bNoError;
    }
    private UpdateClickedORLaunchChangingDoseMezzanine(objgrddata: MultipleDoseDetail): boolean {
        let bResult: boolean = false;
        let bClerkingFrequencyEmpty: boolean = false;
        if (PatientContext.PrescriptionType == PrescriptionTypes.Clerking && this.cboFrequency != null && this.cboFrequency.SelectedItem == null) {
            bClerkingFrequencyEmpty = true;
        }
        if (!this.IsChangingDoseMezzaineLaunched && !bClerkingFrequencyEmpty) {
            let _NoError: boolean = this.LaunchChangingDoseMezzanine();
        }
        else {
            if (this.ValidateBeforeUpdateCondition()) {
                this.UpdateCondition(objgrddata, this.IsDaywiseViewEnabled);
            }
            bResult = true;
        }
        return bResult;
    }
    private UpdateCondition(objgrddata: MultipleDoseDetail, IsDaywiseViewEnabled: boolean): void {
        let IsInfusionItem: boolean = false;
        let IsMultiInfusionRoutes: boolean = false;
        let InfContinuous: boolean = false;
        if (this.CanAddAdditionalDose) {
            this.GetFrequencyDetailForAdditionalDose();
        }
        if (this.objfrm.FormViewerDetails.BasicDetails.InfusionType != null && ((String.Compare(this.objfrm.FormViewerDetails.BasicDetails.InfusionType.Value, InfusionTypesCode.CONTINUOUS, StringComparison.CurrentCultureIgnoreCase) == 0) || (String.Compare(this.objfrm.FormViewerDetails.BasicDetails.InfusionType.Value, InfusionTypesCode.SINGLEDOSEVOLUME, StringComparison.CurrentCultureIgnoreCase) == 0) || (String.Compare(this.objfrm.FormViewerDetails.BasicDetails.InfusionType.Value, InfusionTypesCode.FLUID, StringComparison.CurrentCultureIgnoreCase) == 0))) {
            InfContinuous = true;
        }
        else if (this.objfrm.FormViewerDetails.BasicDetails.InfusionType == null && this.objfrm.FormViewerDetails.BasicDetails.IsInfContiniousFormLoaded) {
            InfContinuous = true;
        }
        if (this.objfrm.FormViewerDetails.BasicDetails.IsAllowMultiRoute && this.objfrm.FormViewerDetails.BasicDetails.DefaultDetails.Routes != null && this.objfrm.FormViewerDetails.BasicDetails.DefaultDetails.Routes != null) {
            if (this.objfrm.FormViewerDetails.BasicDetails.Route != null)
                IsMultiInfusionRoutes = !Common.IsNonInfusionMultiRoutes(this.objfrm.FormViewerDetails.BasicDetails.DefaultDetails.Routes);
        }
        if (((this.objfrm.FormViewerDetails.BasicDetails.Route != null && this.objfrm.FormViewerDetails.BasicDetails.Route.Tag != null && String.Compare(this.objfrm.FormViewerDetails.BasicDetails.Route.Tag.ToString(), "1") == 0) || IsMultiInfusionRoutes) && (this.objfrm.FormViewerDetails.BasicDetails.InfusionType != null && String.Compare(this.objfrm.FormViewerDetails.BasicDetails.InfusionType.Value, InfusionTypesCode.INTERMITTENT, StringComparison.CurrentCultureIgnoreCase) == 0)) {
            IsInfusionItem = true;
        }
        else if ((this.objfrm.FormViewerDetails.BasicDetails.Route != null && this.objfrm.FormViewerDetails.BasicDetails.Route.Tag != null && String.Compare(this.objfrm.FormViewerDetails.BasicDetails.Route.Tag.ToString(), "1") != 0) || !IsMultiInfusionRoutes) {
            IsInfusionItem = true;
        }
        if (IsInfusionItem && !InfContinuous) {
            let dLDose: number;
            Number.TryParse(this.txtLowerDose.Text, (o) => { dLDose = o });
            objgrddata.LowerDose = dLDose;
            let dUDose: number;
            Number.TryParse(this.txtUpperDose.Text, (o) => { dUDose = o });
            objgrddata.UpperDose = dUDose;
            if (this.objfrm.FormViewerDetails.BasicDetails.SteppedDoseUOM != null) {
                objgrddata.DoseUOM = this.objfrm.FormViewerDetails.BasicDetails.SteppedDoseUOM;
            }
            objgrddata.Duration = this.udDuration.Value;
            objgrddata.DurationUOM = ObjectHelper.CreateType<CListItem>(this.cboDuration.SelectedValue, CListItem);
            objgrddata.Frequency = ObjectHelper.CreateType<CListItem>(this.cboFrequency.SelectedValue, CListItem);
            objgrddata.DoseInstructions = this.txtVariable.Text;
            if (objgrddata.OperationMode != 'N') {
                objgrddata.OperationMode = 'U';
            }
            objgrddata.IsStartFromNextDay = this.objfrm.FormViewerDetails.BasicDetails.IsStartFromNextDay;
            if (this.ChangedDoseScheduleDetails != null)
                objgrddata.IsDaywiseView = this.ChangedDoseScheduleDetails.IsDaywiseView;
            else objgrddata.IsDaywiseView = this.IsDaywise;
            objgrddata = this.AddAdminTimes(objgrddata);
            if (this.ScheduleDetailsColsDetails != null && this.ScheduleDetailsColsDetails.Count > 0) {
                let _strFirstDose: string = String.Empty;
                if (this.ChangedDoseScheduleDetails != null && !this.ChangedDoseScheduleDetails.IsAllDoseValuesSame((o1) => { _strFirstDose = o1; })) {
                    objgrddata.ScheduleDetailsData = new ObservableCollection<ScheduleDetailsCols>(this.ScheduleDetailsColsDetails.AsEnumerable());
                    objgrddata.LowerDose = 0.0;
                    objgrddata.UpperDose = 0.0;
                    objgrddata.HyperlinkText = "Changing dose";
                    this.btnChangingDose.Foreground = new SolidColorBrush(Colors.Blue);
                }
                else {
                    objgrddata.IsDaywiseView = false;
                    objgrddata.ScheduleDetailsData = null;
                    if (objgrddata.UpperDose > 0 && !String.IsNullOrEmpty(this.txtLowerDose.Text) && !String.IsNullOrEmpty(_strFirstDose)) {
                        if (Convert.ToDouble(this.txtLowerDose.Text) != Convert.ToDouble(_strFirstDose)) {
                            objgrddata.UpperDose = 0.0;
                        }
                    }
                    if (!String.IsNullOrEmpty(_strFirstDose)) {
                        objgrddata.LowerDose = Number.Parse(_strFirstDose);
                    }
                    else {
                        objgrddata.LowerDose = 0.0;
                    }
                }
            }
            else {
                objgrddata.OriginalLowerDose = this.txtLowerDose.Text;
                objgrddata.OriginalUpperDose = this.txtUpperDose.Text;
                objgrddata.ScheduleDetailsData = null;
                objgrddata.HyperlinkText = String.Empty;
            }
            if (!String.IsNullOrEmpty(this.txtLowerDose.Text)) {
                objgrddata.OriginalLowerDose = this.txtLowerDose.Text;
            }
            if (!String.IsNullOrEmpty(this.txtUpperDose.Text)) {
                objgrddata.OriginalUpperDose = this.txtUpperDose.Text;
            }
            if (objgrddata != null && objgrddata.AdminTimesData != null && objgrddata.AdminTimesData.Count > 0 && objgrddata.ScheduleDetailsData != null && objgrddata.ScheduleDetailsData.Count > 0) {
                let schcount: number = objgrddata.ScheduleDetailsData.Count;
                let admcount: number = objgrddata.AdminTimesData.Count;
                let nCount: number = (admcount < schcount) ? admcount : schcount;
                for (let i: number = 0; i < nCount; i++) {
                    if (objgrddata.SlotTimeMode == 'D' && String.Compare(objgrddata.ScheduleDetailsData[i].ScheduleTime, objgrddata.AdminTimesData[i].DruRoundTimes) != 0) {
                        objgrddata.ScheduleDetailsData[i].ScheduleTime = objgrddata.AdminTimesData[i].DruRoundTimes;
                    }
                    else if (objgrddata.SlotTimeMode == 'F' && String.Compare(objgrddata.ScheduleDetailsData[i].ScheduleTime, objgrddata.AdminTimesData[i].FixedTimes) != 0) {
                        objgrddata.ScheduleDetailsData[i].ScheduleTime = objgrddata.AdminTimesData[i].FixedTimes;
                    }
                }
            }
            if (this.oAdminTimesVM != null && this.oAdminTimesVM.FreqDetails != null && this.oAdminTimesVM.FreqDetails.oFrequency != null) {
                objgrddata.FreqDetails = this.oAdminTimesVM.FreqDetails;
                objgrddata.FreqDetails.oFrequency.IsSunday = this.oAdminTimesVM.IsSun;
                objgrddata.FreqDetails.oFrequency.IsMonday = this.oAdminTimesVM.IsMon;
                objgrddata.FreqDetails.oFrequency.IsTuesday = this.oAdminTimesVM.IsTue;
                objgrddata.FreqDetails.oFrequency.IsWednesday = this.oAdminTimesVM.IsWed;
                objgrddata.FreqDetails.oFrequency.IsThursday = this.oAdminTimesVM.IsThu;
                objgrddata.FreqDetails.oFrequency.IsFriday = this.oAdminTimesVM.IsFri;
                objgrddata.FreqDetails.oFrequency.IsSaturday = this.oAdminTimesVM.IsSat;
            }
            if (String.Equals(this.cboDuration.GetValue(), "CC_DOSES")) {
                objgrddata.EndDTTM = PrescriptionHelper.EndDTTMforDurationDose(objgrddata, null);
            }
            if (this.objfrm != null && this.objfrm.FormViewerDetails != null && this.objfrm.FormViewerDetails.BasicDetails != null) {
                if (this.objfrm.formViewerDetails.BasicDetails.SelectedDoseDetail != null && this.objfrm.formViewerDetails.BasicDetails.SelectedDoseDetail.LstOriginalDoseValues != null && this.objfrm.formViewerDetails.BasicDetails.SelectedDoseDetail.LstOriginalDoseValues.Count > 0) {
                    this.objfrm.formViewerDetails.BasicDetails.SelectedDoseDetail.LstOriginalDoseValues.Clear();
                }
                this.objfrm.FormViewerDetails.BasicDetails.UpdateStartEndDateForInPatSteppedDose(IsDaywiseViewEnabled, this.CanAddAdditionalDose, false);
            }
            if (this.objfrm != null && (this.objfrm.ActionCode == ActivityTypes.Amend || this.objfrm.ActionCode == ActivityTypes.Prescribe || this.objfrm.ActionCode == ActivityTypes.Reorder)) {
                if (this.objfrm != null && this.objfrm.FormViewerDetails != null && this.objfrm.FormViewerDetails.TechValidateDetails != null && this.objfrm.FormViewerDetails.TechValidateDetails.TechValidatedItems != null && this.objfrm.FormViewerDetails.TechValidateDetails.TechValidatedItems.Count > 0) {
                    if (this.dLowerDose != objgrddata.LowerDose || this.dUpperDose != objgrddata.UpperDose || (objgrddata.DoseUOM != null && String.Compare(this.sDoseUOM, objgrddata.DoseUOM.Value, StringComparison.CurrentCultureIgnoreCase) != 0) || (objgrddata.Duration != -1.7976931348623157E+308 && this.dDuration != objgrddata.Duration) || (objgrddata.DurationUOM != null && !String.Equals(this.dDurUOM, objgrddata.DurationUOM.Value, StringComparison.InvariantCultureIgnoreCase)) || (objgrddata.Frequency != null && !String.Equals(this.dFrequency, objgrddata.Frequency.Value, StringComparison.InvariantCultureIgnoreCase))) {
                        this.objfrm.TechnicallyValidateMessage();
                    }
                }
            }
        }
        objgrddata.Duration = this.udDuration.Value;
        objgrddata.DurationUOM = ObjectHelper.CreateType<CListItem>(this.cboDuration.SelectedValue, CListItem);
        objgrddata.DoseInstructions = this.txtVariable.Text;
        if (objgrddata.OperationMode != 'N') {
            objgrddata.OperationMode = 'U';
        }
        if (this.objfrm.FormViewerDetails.BasicDetails.IsAllowMultiRoute && this.objfrm.FormViewerDetails.BasicDetails.DefaultDetails.Routes != null && this.objfrm.FormViewerDetails.BasicDetails.DefaultDetails.Routes != null) {
            if (this.objfrm.FormViewerDetails.BasicDetails.Route != null)
                IsMultiInfusionRoutes = !Common.IsNonInfusionMultiRoutes(this.objfrm.FormViewerDetails.BasicDetails.DefaultDetails.Routes);
        }
        if ((this.objfrm.FormViewerDetails.BasicDetails.Route != null && this.objfrm.FormViewerDetails.BasicDetails.Route.Tag != null && String.Compare(this.objfrm.FormViewerDetails.BasicDetails.Route.Tag.ToString(), "1") == 0) || IsMultiInfusionRoutes) {
            if (!String.IsNullOrEmpty(this.txtInfusionRate.Text))
                objgrddata.InfusionRate = this.txtInfusionRate.Text;
            if (!String.IsNullOrEmpty(this.txtUpperInfusionRate.Text))
                objgrddata.InfusionUpperrate = this.txtUpperInfusionRate.Text;
            if (!String.IsNullOrEmpty(this.txtUpperInfusionRate.Text))
                objgrddata.InfusionUpperrate = this.txtUpperInfusionRate.Text;
            else objgrddata.InfusionUpperrate = String.Empty;
            if (ObjectHelper.CreateType<CListItem>(this.cboInfRateNumUOM.SelectedValue, CListItem) != null)
                objgrddata.Infratenumeratoruom = ObjectHelper.CreateType<CListItem>(this.cboInfRateNumUOM.SelectedValue, CListItem);
            if (ObjectHelper.CreateType<CListItem>(this.cboInfRateDenoUOM.SelectedValue, CListItem) != null)
                objgrddata.InfrateDenominatoruom = ObjectHelper.CreateType<CListItem>(this.cboInfRateDenoUOM.SelectedValue, CListItem);
        }
        this.cmdRemove.IsEnabled = this.cmdUpdate.IsEnabled = false;
        this.EnableDisableAdd();
        if (IsInfusionItem) {
            objgrddata.IsInfusionData = true;
        }
        else {
            objgrddata.IsInfusionData = false;
        }
        objgrddata.oAdminTimesVM = this.oAdminTimesVM;
        this.IsValidateForStartFromNextDayMsgShown = false;
        this.objfrm.FormViewerDetails.IsSteppedDoseDetailsModified = false;
        this.objfrm.FormViewerDetails.BasicDetails.IsenableRSNFORMOD = true;
        this.objfrm.FormViewerDetails.BasicDetails.IsenableModificationcomments = true;
        this.objfrm.FormViewerDetails.BasicDetails.IsMandatoryRSNFORMOD = true;
        if (!this.objfrm.FormViewerDetails.BasicDetails.lstDRCAmendedFlds.Contains("UpdateSteppedDoseDetails"))
            this.objfrm.FormViewerDetails.BasicDetails.lstDRCAmendedFlds.Add("UpdateSteppedDoseDetails");
        if (this.isMedicationClerk && (this.objfrm.FormViewerDetails.BasicDetails.IsAdditionalDoseOpted || !String.Equals(this.sActionText, CConstants.SVActionFormViewerOk)) && this.objfrm.FormViewerDetails.BasicDetails != null && this.objfrm.FormViewerDetails.BasicDetails.actualClerkingValues != null && this.objfrm.FormViewerDetails.BasicDetails.actualClerkingValues.Multidosedetail != null && this.objfrm.FormViewerDetails.BasicDetails.actualClerkingValues.Multidosedetail.Count > 0) {
            this.objfrm.FormViewerDetails.BasicDetails.IsMandatoryReasonForMedClerkModify = true;
            this.objfrm.FormViewerDetails.BasicDetails.SetOnadmissionValue("", DoseTypeCode.STEPPEDVARIABLE);
        }
        this.objfrm.FormViewerDetails.BasicDetails.SetAdditionalOptionMessage();
        this.objfrm.FormViewerDetails.BasicDetails.CheckStrengthMandatoryByDoseUOMType();
        let _SelectedIdx: number[] = this.grdData.GetSelectedRowsIndex();
        if (_SelectedIdx != null && _SelectedIdx.Count() > 0 && _SelectedIdx[0] == 0) {
            if (this.objfrm != null && this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails != null && this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails.Count > 0 && this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails[0] != null && String.Equals(PatientContext.PrescriptionType, PrescriptionTypes.ForAdministration, StringComparison.InvariantCultureIgnoreCase) && !(PatientContext.ClerkFormViewDefaultBehavior == ClerkFormViewDeftBehaviour.LaunchFormMandatory)) {
                let IsAddtionalSTATPrompted: boolean = this.objfrm.FormViewerDetails.BasicDetails.SetAdditionalOptionMessageForSV(this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails[0]);
                if (IsAddtionalSTATPrompted && this.omedFormViewer != null) {
                    this.omedFormViewer.AutoScrollView();
                }
            }
        }
        this.bDoseSafetymsg = false;
        this.IsChangingDoseMezzaineLaunched = false;
        if (!String.Equals(this.sActionText, CConstants.SVActionFormViewerOk)) {
            this.sActionText = String.Empty;
        }
        if (this.oAdminTimesVM != null && this.oAdminTimesVM.FreqDetails != null && this.oAdminTimesVM.FreqDetails.oFrequency != null && !String.IsNullOrEmpty(this.oAdminTimesVM.FreqDetails.oFrequency.UOM) && String.Equals(this.oAdminTimesVM.FreqDetails.oFrequency.UOM, CConstants.OnceOnlyFrequency, StringComparison.InvariantCultureIgnoreCase) && this.NewItemRowIndex > -1 && this.objfrm != null && this.objfrm.FormViewerDetails != null && this.objfrm.FormViewerDetails.BasicDetails != null && this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails != null && this.grdData != null) {
            let _SelectedIndices: number[] = this.grdData.GetSelectedRowsIndex();
            if (_SelectedIndices != null && _SelectedIndices.Count() > 0 && _SelectedIndices[0] >= 0) {
                let _NewItemAdminTime: TimeSpan;
                let _SelectedAdminTime: string;
                this.GetNewAdminTime((o1) => { _SelectedAdminTime = o1 }, (o2) => { _NewItemAdminTime = o2 });
                let _NewRowIndex: number = this.GetNewItemRowIndexForAdditionalDose(_NewItemAdminTime);
                if (_SelectedIndices[0] != this.NewItemRowIndex) {
                    this.objfrm.formViewerDetails.BasicDetails.MultiDoseDetails.RemoveAt(_SelectedIndices[0]);
                    this.objfrm.formViewerDetails.BasicDetails.MultiDoseDetails.Insert(_NewRowIndex, objgrddata);
                }
            }
        }
        this.grdData.UnselectAll(this.CheckBoxColumn);
        this._chkHeaderRowCheckbox.IsChecked = false;
        this.grdData.Rebind();
        this.grdData_SelectionChanged({}, {});
        if (this.CanCloseFormViewerWithSVValidation && this.omedFormViewer != null) {
            this.grdData.UpdateLayout();
            this.CanCloseFormViewerWithSVValidation = false;
            this.omedFormViewer.CloseFormViewer(AppDialogResult.Ok);
        }
    }
    AddAdminTimes(objgrddata: MultipleDoseDetail): MultipleDoseDetail {
        if (this.oAdminTimesVM != null && this.oAdminTimesVM.GrdData != null) {
            this.oAdminTimesVM.GrdData = new ObservableCollection<GrdAdminstrativeTimesCols>(this.oAdminTimesVM.GrdData.OrderBy(oItem => oItem._fixedtimeProperty));
        }
        let oAllGrdRows: ObservableCollection<GrdAdminstrativeTimesCols> = <ObservableCollection<GrdAdminstrativeTimesCols>>this.grdAdminTimes.ItemsSource;
        objgrddata.AdministrationTimes = String.Empty;
        let IsPeriodFreq: boolean = false;
        if (oAllGrdRows != null && oAllGrdRows.Count > 0 && oAllGrdRows[0] != null && oAllGrdRows[0].FrequencyType == "CC_PERIOD") {
            IsPeriodFreq = true;
        }
        if (IsPeriodFreq) {
            if (this.iRdBtnFixedTime.IsChecked.Value) {
                objgrddata.SlotTimeMode = 'F';
                objgrddata.IsfixedTime = true;
            }
            else {
                objgrddata.SlotTimeMode = 'D';
                objgrddata.IsfixedTime = false;
            }
        }
        if (oAllGrdRows != null && oAllGrdRows.Count > 0 && oAllGrdRows[0] != null) {
            for (let nCnt: number = 0; nCnt < oAllGrdRows.Count; nCnt++) {
                if (IsPeriodFreq) {
                    if (String.IsNullOrEmpty(objgrddata.AdministrationTimes)) {
                        if (this.iRdBtnFixedTime.IsChecked == true) {
                            objgrddata.AdministrationTimes = "Fixed - ";
                        }
                        else {
                            objgrddata.AdministrationTimes = "Drug round - ";
                        }
                    }
                    if (this.iRdBtnFixedTime.IsChecked == true) {
                        if (!String.IsNullOrEmpty(oAllGrdRows[nCnt].FixedTimes)) {
                            if (nCnt == oAllGrdRows.Count - 1)
                                objgrddata.AdministrationTimes += oAllGrdRows[nCnt].FixedTimes;
                            else objgrddata.AdministrationTimes += oAllGrdRows[nCnt].FixedTimes + "/";
                        }
                    }
                    else {
                        if (!String.IsNullOrEmpty(oAllGrdRows[nCnt].DruRoundTimes)) {
                            if (nCnt == oAllGrdRows.Count - 1)
                                objgrddata.AdministrationTimes += oAllGrdRows[nCnt].DruRoundTimes;
                            else objgrddata.AdministrationTimes += oAllGrdRows[nCnt].DruRoundTimes + "/";
                        }
                    }
                }
                else {
                    if (String.IsNullOrEmpty(objgrddata.AdministrationTimes)) {
                        if (String.IsNullOrEmpty(objgrddata.AdministrationTimes)) {
                            objgrddata.AdministrationTimes = oAllGrdRows[0].FixedTimes + " " + oAllGrdRows[0].DruRoundTimes + " repeats " + this.cboFrequency.GetText();
                        }
                    }
                }
            }
        }
        if (objgrddata.OperationMode.Equals('N')) {
            objgrddata.StartDTTM = this.GetStartDateTimeForNewStep();
        }
        if (this.oAdminTimesVM != null) {
            objgrddata.AdminTimesData = new ObservableCollection<GrdAdminstrativeTimesCols>(this.oAdminTimesVM.GrdData.AsEnumerable());
            if (this.oAdminTimesVM.FreqDetails != null && this.oAdminTimesVM.FreqDetails.oFrequency != null && String.Equals(this.oAdminTimesVM.FreqDetails.oFrequency.UOM, CConstants.OnceOnlyFrequency, StringComparison.InvariantCultureIgnoreCase)) {
                objgrddata.IsAdditionalDose = true;
                objgrddata.StartDTTM = this.objfrm.formViewerDetails.BasicDetails.StartDTTM;
                if (this.oAdminTimesVM.GrdData != null && this.oAdminTimesVM.GrdData.Count > 0) {
                    let _GivenAdminTime: string;
                    if (objgrddata.SlotTimeMode.Equals('F')) {
                        _GivenAdminTime = this.oAdminTimesVM.GrdData[0].FixedTimes;
                    }
                    else {
                        _GivenAdminTime = this.oAdminTimesVM.GrdData[0].DruRoundTimes;
                    }
                    let _tsAdminTime: TimeSpan;
                    if (!String.IsNullOrEmpty(_GivenAdminTime) && TimeSpan.TryParse(_GivenAdminTime, (o) => { _tsAdminTime = o })) {
                        objgrddata.StartDTTM = this.objfrm.formViewerDetails.BasicDetails.StartDTTM.DateTime.Add(_tsAdminTime);
                    }
                }
            }
            else {
                objgrddata.IsAdditionalDose = false;
            }
        }
        if (!String.IsNullOrEmpty(this.cboDuration.GetValue()) && this.udDuration.Value > 0 && !String.IsNullOrEmpty(this.udDuration.Value.ToString())) {
            switch (this.cboDuration.GetValue()) {
                case "CC_MINUTES":
                    objgrddata.EndDTTM = objgrddata.StartDTTM.AddMinutes(this.udDuration.Value).AddMinutes(-1);
                    break;
                case "CC_HOURS":
                    objgrddata.EndDTTM = objgrddata.StartDTTM.AddHours(this.udDuration.Value).AddMinutes(-1);
                    break;
                case "CC_MEDDRSN1":
                    let StartDTTM: DateTime;
                    let StopDTTM: DateTime;
                    objgrddata.IsfixedTime = objgrddata.SlotTimeMode.Equals('F') ? true : false;
                    MCommonBB.CalculateEndDTTMForDaysDuration(objgrddata.AdminTimesData, objgrddata.StartDTTM, DateTime.MinValue, objgrddata.IsfixedTime, Convert.ToInt32(this.udDuration.Value), (o1) => { StartDTTM = o1 }, (o2) => { StopDTTM = o2 });
                    objgrddata.EndDTTM = StopDTTM;
                    break;
                case "CC_MEDDRSN2":
                    objgrddata.EndDTTM = objgrddata.StartDTTM.AddDays(this.udDuration.Value * 7).AddMinutes(-1);
                    break;
                case "CC_MEDRSN3":
                    objgrddata.EndDTTM = objgrddata.StartDTTM.AddMonths(Convert.ToInt32(this.udDuration.Value)).AddMinutes(-1);
                    break;
                case "CC_MEDRSN4":
                    objgrddata.EndDTTM = objgrddata.StartDTTM.AddYears(Convert.ToInt32(this.udDuration.Value)).AddMinutes(-1);
                    break;
            }
        }
        else {
            objgrddata.EndDTTM = DateTime.MinValue;
        }
        if ((this.oAdminTimesVM != null && (String.Compare(this.oAdminTimesVM.sFrequencyUOM, "CC_MEDDRSN2", StringComparison.CurrentCultureIgnoreCase) == 0 || (this.oAdminTimesVM.FreqDetails != null && this.oAdminTimesVM.FreqDetails.oFrequency != null && String.Compare(this.oAdminTimesVM.FreqDetails.oFrequency.UOM, "CC_MEDDRSN2", StringComparison.CurrentCultureIgnoreCase) == 0))) || (objgrddata != null && objgrddata.AdminTimesData != null && objgrddata.AdminTimesData.Count > 0 && String.Compare(objgrddata.AdminTimesData[0].FrequencyUOM, "CC_MEDDRSN2", StringComparison.CurrentCultureIgnoreCase) == 0)) {
            objgrddata.DaysOfWeek = new Array(7);
            objgrddata.DaysOfWeek[0] = this.oAdminTimesVM.IsSun.ToString();
            objgrddata.DaysOfWeek[1] = this.oAdminTimesVM.IsMon.ToString();
            objgrddata.DaysOfWeek[2] = this.oAdminTimesVM.IsTue.ToString();
            objgrddata.DaysOfWeek[3] = this.oAdminTimesVM.IsWed.ToString();
            objgrddata.DaysOfWeek[4] = this.oAdminTimesVM.IsThu.ToString();
            objgrddata.DaysOfWeek[5] = this.oAdminTimesVM.IsFri.ToString();
            objgrddata.DaysOfWeek[6] = this.oAdminTimesVM.IsSat.ToString();
        }
        return objgrddata;
    }
    public cmdRemove_Click(sender: Object, e: RoutedEventArgs): void {
        let localMultidosedetail: ObservableCollection<MultipleDoseDetail> = new ObservableCollection<MultipleDoseDetail>();
        if (this.objfrm.FormViewerDetails.BasicDetails != null && this.objfrm.FormViewerDetails.BasicDetails.actualClerkingValues != null && this.objfrm.FormViewerDetails.BasicDetails.actualClerkingValues.Multidosedetail != null && this.objfrm.FormViewerDetails.BasicDetails.actualClerkingValues.Multidosedetail.Count > 0) {
            IPPMABaseVM.CloneObjects(this.objfrm.FormViewerDetails.BasicDetails.actualClerkingValues.Multidosedetail, localMultidosedetail);
        }
        let _IsContainOnceOnlyBeforeRemove: boolean = false;
        if (this.objfrm != null && this.objfrm.FormViewerDetails != null && this.objfrm.FormViewerDetails.BasicDetails != null) {
            _IsContainOnceOnlyBeforeRemove = this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails.Any(x => x.IsAdditionalDose);
        }
        let RemoveIndecies: number[] = this.grdData.GetSelectedRowsIndexByOrder();
        if (RemoveIndecies != null) {
            let nLen: number = RemoveIndecies.length;
            for (let i: number = nLen; i > 0; i--) {
                this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails[RemoveIndecies[i - 1]].OperationMode = 'D';
                this.grdData.DeleteRow(this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails[RemoveIndecies[i - 1]]);
            }
            this.grdData.selectedRowsIndex = [];
            this.grdData_SelectionChanged({}, {}); 
        }
        if (this.objfrm.FormViewerDetails.BasicDetails != null && this.objfrm.FormViewerDetails.BasicDetails.actualClerkingValues != null && this.objfrm.FormViewerDetails.BasicDetails.actualClerkingValues.Multidosedetail != null) {
            this.objfrm.FormViewerDetails.BasicDetails.actualClerkingValues.Multidosedetail = localMultidosedetail;
        }
        if (this.objfrm != null && this.objfrm.FormViewerDetails != null && this.objfrm.FormViewerDetails.BasicDetails != null) {
            let _IsContainOnceOnlyAfterRemove: boolean = this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails.Any(x => x.IsAdditionalDose);
            if (this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails == null || this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails.Count == 0 || (_IsContainOnceOnlyBeforeRemove && !_IsContainOnceOnlyAfterRemove)) {
                this.IsAdditionalDoseConfirmMsgShown = false;
                this.CanAddAdditionalDose = false;
                this.objfrm.formViewerDetails.BasicDetails.IsAdditionalDoseOpted = false;
            }
            let _IsFirstRowRemoved: boolean = false;
            if (RemoveIndecies != null && RemoveIndecies.length > 0) {
                _IsFirstRowRemoved = RemoveIndecies.Any(c => c == 0);
            }
            this.objfrm.FormViewerDetails.BasicDetails.UpdateStartEndDateForInPatSteppedDose(false, false, _IsFirstRowRemoved);
            if (this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails != null && this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails.Count == 0) {
                this.objfrm.FormViewerDetails.BasicDetails.FollowUpOrStat = String.MinValue;
                this.objfrm.FormViewerDetails.BasicDetails.FollowUpStatLaunch = String.MinValue;
                this.objfrm.FormViewerDetails.BasicDetails.IsFollowUpStat = false;
                this.objfrm.FormViewerDetails.BasicDetails.FollowUpStatMessageVisibility = Visibility.Collapsed;
                this.objfrm.FormViewerDetails.BasicDetails.IsFollowUpStatEnabled = true;
            }
        }
        this.ClearControls();
        this.bDoseSafetymsg = false;
        this.cmdRemove.IsEnabled = this.cmdUpdate.IsEnabled = false;
        this.objfrm.FormViewerDetails.BasicDetails.IsenableRSNFORMOD = true;
        this.objfrm.FormViewerDetails.BasicDetails.IsenableModificationcomments = true;
        this.objfrm.FormViewerDetails.BasicDetails.IsMandatoryRSNFORMOD = true;
        if (this.objfrm != null && (this.objfrm.ActionCode == ActivityTypes.Amend || this.objfrm.ActionCode == ActivityTypes.Prescribe || this.objfrm.ActionCode == ActivityTypes.Reorder)) {
            if (this.objfrm != null && this.objfrm.FormViewerDetails != null && this.objfrm.FormViewerDetails.TechValidateDetails != null && this.objfrm.FormViewerDetails.TechValidateDetails.TechValidatedItems != null && this.objfrm.FormViewerDetails.TechValidateDetails.TechValidatedItems.Count > 0) {
                this.objfrm.TechnicallyValidateMessage();
            }
        }
        if (!this.objfrm.FormViewerDetails.BasicDetails.lstAmendedFlds.Contains("RemoveSteppedDoseDetails"))
            this.objfrm.FormViewerDetails.BasicDetails.lstAmendedFlds.Add("RemoveSteppedDoseDetails");
        if (!this.objfrm.FormViewerDetails.BasicDetails.lstDRCAmendedFlds.Contains("RemoveSteppedDoseDetails"))
            this.objfrm.FormViewerDetails.BasicDetails.lstDRCAmendedFlds.Add("RemoveSteppedDoseDetails");
        if (this.isMedicationClerk && this.objfrm.FormViewerDetails.BasicDetails != null && this.objfrm.FormViewerDetails.BasicDetails.actualClerkingValues != null && this.objfrm.FormViewerDetails.BasicDetails.actualClerkingValues.Multidosedetail != null && this.objfrm.FormViewerDetails.BasicDetails.actualClerkingValues.Multidosedetail.Count > 0) {
            this.objfrm.FormViewerDetails.BasicDetails.IsMandatoryReasonForMedClerkModify = true;
            this.objfrm.FormViewerDetails.BasicDetails.SetOnadmissionValue("", DoseTypeCode.STEPPEDVARIABLE);
        }
        this.objfrm.FormViewerDetails.BasicDetails.SetAdditionalOptionMessage();
        if (this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails == null || (this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails != null && this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails.Count == 0)) {
            this.objfrm.FormViewerDetails.BasicDetails.CheckStrengthMandatoryByDoseUOMType();
        }
        this.IsChangingDoseMezzaineLaunched = false;
        if (this.objfrm != null && this.objfrm.FormViewerDetails != null && this.objfrm.FormViewerDetails.BasicDetails != null) {
            if (this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails == null || this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails.Count == 0) {
                if (DateTime.NotEquals(this.objfrm.FormViewerDetails.BasicDetails.StopDate, DateTime.MinValue)) {
                    this.objfrm.FormViewerDetails.BasicDetails.StopDate = DateTime.MinValue;
                }
                this.objfrm.FormViewerDetails.BasicDetails.IsDifferentDoseUOMFrmSourceForSV = false;
                this.objfrm.FormViewerDetails.BasicDetails.IsenableInfusionPeriod = true;
            }
            else if (this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails != null && this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails.Count == 1) {
                this.objfrm.FormViewerDetails.BasicDetails.IsDifferentDoseUOMFrmSourceForSV = false;
                this.DefaultDoseUOMForSubSequentSteps();
            }
        }
        this.grdData.UnselectAll(this.CheckBoxColumn);
        this._chkHeaderRowCheckbox.IsChecked = false;
    }
    public ClearControls(): void {
        let IsMultiInfusionRoutes: boolean = false;
        this.IsDaywiseViewEnabled = false;
        this.IsDaywiseViewClicked = false;
        let IsInfContinous: boolean = false;
        if (this.objfrm != null && this.objfrm.FormViewerDetails != null && this.objfrm.FormViewerDetails.BasicDetails != null && this.objfrm.FormViewerDetails.BasicDetails.InfusionType == null && this.objfrm.FormViewerDetails.BasicDetails.IsInfContiniousFormLoaded) {
            IsInfContinous = true;
        }
        if (this.objfrm != null && this.objfrm.FormViewerDetails != null && this.objfrm.FormViewerDetails.BasicDetails != null && this.objfrm.FormViewerDetails.BasicDetails.IsAllowMultiRoute && this.objfrm.FormViewerDetails.BasicDetails.DefaultDetails.Routes != null && this.objfrm.FormViewerDetails.BasicDetails.DefaultDetails.Routes != null) {
            if (this.objfrm.FormViewerDetails.BasicDetails.Route != null)
                IsMultiInfusionRoutes = !Common.IsNonInfusionMultiRoutes(this.objfrm.FormViewerDetails.BasicDetails.DefaultDetails.Routes);
        }
        if (((this.objfrm != null && this.objfrm.FormViewerDetails != null && this.objfrm.FormViewerDetails.BasicDetails != null && this.objfrm.FormViewerDetails.BasicDetails.Route != null && this.objfrm.FormViewerDetails.BasicDetails.Route.Tag != null && String.Compare(this.objfrm.FormViewerDetails.BasicDetails.Route.Tag.ToString(), "1") == 0) || IsMultiInfusionRoutes) && this.objfrm != null && this.objfrm.FormViewerDetails != null && this.objfrm.FormViewerDetails.BasicDetails != null && this.objfrm.FormViewerDetails.BasicDetails.InfusionType != null && this.objfrm != null && this.objfrm.FormViewerDetails != null && this.objfrm.FormViewerDetails.BasicDetails != null && String.Equals(this.objfrm.FormViewerDetails.BasicDetails.InfusionType.Value, InfusionTypesCode.INTERMITTENT)) {
            if (this.objfrm.FormViewerDetails.BasicDetails.IsNotInPatientSteppedVariableAmend) {
                this.txtLowerDose.IsEnabled = true;
                this.txtUpperDose.IsEnabled = true;

                this.objfrm.FormViewerDetails.BasicDetails.Isdoseenable = true;
            }
        }
        if (((this.objfrm != null && this.objfrm.FormViewerDetails != null && this.objfrm.FormViewerDetails.BasicDetails != null && this.objfrm.FormViewerDetails.BasicDetails.Route != null && this.objfrm.FormViewerDetails.BasicDetails.Route.Tag != null && String.Compare(this.objfrm.FormViewerDetails.BasicDetails.Route.Tag.ToString(), "1") == 0) || IsMultiInfusionRoutes) && ((this.objfrm != null && this.objfrm.FormViewerDetails != null && this.objfrm.FormViewerDetails.BasicDetails != null && this.objfrm.FormViewerDetails.BasicDetails.InfusionType != null && (this.objfrm.FormViewerDetails.BasicDetails.InfusionType.Value == InfusionTypesCode.CONTINUOUS || this.objfrm.FormViewerDetails.BasicDetails.InfusionType.Value == InfusionTypesCode.SINGLEDOSEVOLUME || this.objfrm.FormViewerDetails.BasicDetails.InfusionType.Value == InfusionTypesCode.FLUID)) || IsInfContinous)) {
            this.cboFrequency.IsEnabled = false;
            this.lblFrequency.Mandatory = false;
        }
        else {
            if (this.objfrm.FormViewerDetails.BasicDetails.IsNotInPatientSteppedVariableAmend) {
                this.txtLowerDose.IsEnabled = true;
                this.txtUpperDose.IsEnabled = true;
                if (this.objfrm != null && this.objfrm.FormViewerDetails != null && this.objfrm.FormViewerDetails.BasicDetails != null) {
                    this.objfrm.FormViewerDetails.BasicDetails.Isdoseenable = true;
                }
                this.lblFrequency.IsEnabled = true;
                this.cboFrequency.IsEnabled = true;
                this.cboFrequency.SelectedIndex = -1;
                this.objfrm.FormViewerDetails.BasicDetails.Frequency = null;
            }
        }
        if (this.objfrm.FormViewerDetails.BasicDetails.IsNotInPatientSteppedVariableAmend) {
            this.udDuration.IsEnabled = true;
            this.cboDuration.IsEnabled = true;
        }
        this.txtLowerDose.Text = String.Empty;
        this.txtUpperDose.Text = String.Empty;
        this.objfrm.FormViewerDetails.BasicDetails.Dose = this.txtLowerDose.Text;
        this.objfrm.FormViewerDetails.BasicDetails.UpperDose = this.txtUpperDose.Text;
        if (this.objfrm != null && this.objfrm.FormViewerDetails != null && this.objfrm.FormViewerDetails.BasicDetails != null) {
            this.objfrm.FormViewerDetails.BasicDetails.SteppedDoseUOM = null;
            this.objfrm.FormViewerDetails.BasicDetails.IsAdminTimesGridEnabled = true;
            this.objfrm.FormViewerDetails.BasicDetails.IsAdmintimesenable = true;
        }
        this.udDuration.Value = Number.MinValue;
        this.objfrm.FormViewerDetails.BasicDetails.Duration = null;
        this.cboDuration.SelectedIndex = -1;
        this.objfrm.FormViewerDetails.BasicDetails.DurationUOM = null;
        this.lblDaysOfWeek.Mandatory = true;
        this.txtInfusionRate.Text = String.Empty;
        this.txtUpperInfusionRate.Text = String.Empty;
        this.objfrm.FormViewerDetails.BasicDetails.InfusionDetails.Rate = this.txtInfusionRate.Text;
        this.objfrm.FormViewerDetails.BasicDetails.InfusionDetails.UpperRate = this.txtUpperInfusionRate.Text;
        this.txtUpperInfusionRate.IsEnabled = false;
        if (this.cboInfRateNumUOM.IsEnabled){
            this.cboInfRateNumUOM.SelectedIndex = -1;
            this.objfrm.FormViewerDetails.BasicDetails.InfusionDetails.InfRateNumeratorUom = null;
        }
        if (this.cboInfRateDenoUOM.IsEnabled){
            this.cboInfRateDenoUOM.SelectedIndex = -1;
            this.objfrm.FormViewerDetails.BasicDetails.InfusionDetails.InfRateDinominatorUom = null;
        }
        this.txtVariable.Text = String.Empty;
        this.objfrm.FormViewerDetails.BasicDetails.VariableDoseInstructions = this.txtVariable.Text;
        this.cmdRemove.IsEnabled = this.cmdUpdate.IsEnabled = false;
        if (this.objfrm.FormViewerDetails.BasicDetails.IsNotInPatientSteppedVariableAmend) {
            this.EnableDisableAdd();
        }
        this.ClearAdministrationDetails();
        this.btnChangingDose.IsEnabled = false;
        this.strDoseUOM = String.Empty;
        this.IsPeriodFrequency = false;
        this.IsDaywise = false;
        // if (this.oAdminTimesVM != null) {
        //     this.oAdminTimesVM.FreqDetailsCompleted -= oAdminTimesVM_FreqDetailsCompleted;
        //     this.oAdminTimesVM.AdminstrativeTimesCompleted -= oVM_AdminstrativeTimesCompleted;
        //     this.oAdminTimesVM.AdminstrativeTimesCompleted -= oVM_GrdTimesCompleted;
        // }
        this.oAdminTimesVM = null;
        this.oAdminTimesVM = new AdminstrativeTimesVM();
        if (this.oAdminTimesVM != null)
            this.oAdminTimesVM.IsSun = this.oAdminTimesVM.IsMon = this.oAdminTimesVM.IsTue = this.oAdminTimesVM.IsWed = this.oAdminTimesVM.IsThu = this.oAdminTimesVM.IsFri = this.oAdminTimesVM.IsSat = false;
        if (this.ScheduleDetailsColsDetails != null && this.ScheduleDetailsColsDetails.Count > 0)
            this.ScheduleDetailsColsDetails.Clear();
        this.ChangedDoseScheduleDetails = null;
        this.IsChangingDose = false;
        setTimeout(() => {
            this.DefaultDoseUOMForSubSequentSteps();
        }, 0);

        this.objfrm.FormViewerDetails.BasicDetails.SelectedDoseDetail = null;
    }
    private EnableDisableAdd(): void {
        if (this.objfrm == null || this.objfrm.FormViewerDetails == null || this.objfrm.FormViewerDetails.BasicDetails == null || this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails == null || this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails.Count == 0) {
            this.cmdAdd.IsEnabled = true;
        }
        else {
            let nLastDoseIndex: number = this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails.Count - 1;
            this.cmdAdd.IsEnabled = this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails[nLastDoseIndex].Duration != 0 && this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails[nLastDoseIndex].DurationUOM != null && !String.IsNullOrEmpty(this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails[nLastDoseIndex].DurationUOM.Value);
        }
        this.btnFullPresView.IsEnabled = true;
    }
    ShowErrorMsg(ErrorMsg: string, MsgBoxType: MessageBoxType, MsgBoxButton: MessageBoxButton, MsgBoxTag: Object = null): void {
        this.iMsgBox.IconType = MsgBoxType;
        this.iMsgBox.MessageButton = MsgBoxButton;
        this.iMsgBox.Message = ErrorMsg;
        if (MsgBoxTag != null)
            this.iMsgBox.Tag = MsgBoxTag;
        this.iMsgBox.Show();
    }
    private Validate(oMultipleDoseDetail: MultipleDoseDetail): boolean {
        let objMsg: iMessageBox = new iMessageBox();
        let IsInfContinous: boolean = false;
        if (this.objfrm.FormViewerDetails.BasicDetails.InfusionType == null && this.objfrm.FormViewerDetails.BasicDetails.IsInfContiniousFormLoaded) {
            IsInfContinous = true;
        }
        if (PatientContext.PrescriptionType != PrescriptionTypes.Clerking && this.objfrm != null && this.objfrm.formViewerDetails != null && this.objfrm.FormViewerDetails.BasicDetails != null && DateTime.Equals(this.objfrm.FormViewerDetails.BasicDetails.StartDTTM.Date, DateTime.MinValue.Date)) {
            this.ShowErrorMsg("Start date time cannot be blank.", MessageBoxType.Critical, MessageBoxButton.OK, "dtpStartDate");
            return false;
        }
        if (!this.IsChangingDose && (this.ScheduleDetailsColsDetails == null || this.ScheduleDetailsColsDetails.Count == 0)) {
            if (this.objfrm.FormViewerDetails.BasicDetails.InfusionType == null || (this.objfrm.FormViewerDetails.BasicDetails.InfusionType != null && this.objfrm.FormViewerDetails.BasicDetails.InfusionType.Value == InfusionTypesCode.INTERMITTENT)) {
                if (String.IsNullOrEmpty(this.txtLowerDose.Text)) {
                    this.ShowErrorMsg("From dose cannot be blank.", MessageBoxType.Information, MessageBoxButton.OK, "txtLowerDose");
                    return false;
                }
                else if ((String.IsNullOrEmpty(this.txtLowerDose.Text)) && (this.objfrm.FormViewerDetails.BasicDetails.SteppedDoseUOM != null)) {
                    this.ShowErrorMsg("From dose cannot be blank.", MessageBoxType.Information, MessageBoxButton.OK, "txtLowerDose");
                    return false;
                }
                // else if ((!String.IsNullOrEmpty(this.txtLowerDose.Text)) && (this.objfrm.FormViewerDetails.BasicDetails.SteppedDoseUOM == null)) {
                else if (((!String.IsNullOrEmpty(this.txtLowerDose.Text)) && (this.objfrm.FormViewerDetails.BasicDetails.SteppedDoseUOM === null)||(this.cboUOM.text=="More"))) {
                    this.ShowErrorMsg("Dose UOM cannot be blank.", MessageBoxType.Information, MessageBoxButton.OK, "cboUOM");
                    return false;
                }
                else if ((!String.IsNullOrEmpty(this.txtLowerDose.Text)) && (!String.IsNullOrEmpty(this.txtUpperDose.Text))) {
                    let dLDose: number;
                    Number.TryParse(this.txtLowerDose.Text, (o) => { dLDose = o });
                    let lowerdose: number = dLDose;
                    let dUDose: number;
                    Number.TryParse(this.txtUpperDose.Text, (o) => { dUDose = o });
                    let upperdose: number = dUDose;
                    if (lowerdose > upperdose) {
                        this.ShowErrorMsg("Upper limit value is less than the lower limit value. Please change the value.", MessageBoxType.Information, MessageBoxButton.OK, "txtLowerDose");
                        return false;
                    }
                    else if (lowerdose == upperdose) {
                        this.ShowErrorMsg("Lower and upper limit values are the same. Please change either.", MessageBoxType.Information, MessageBoxButton.OK, "txtLowerDose");
                        return false;
                    }
                }
                else if ((!String.IsNullOrEmpty(this.txtInfusionRate.Text)) && (!String.IsNullOrEmpty(this.txtUpperInfusionRate.Text))) {
                    let dLRate: number;
                    Number.TryParse(this.txtInfusionRate.Text, (o) => { dLRate = o });
                    let lowerrate: number = dLRate;
                    let dURate: number;
                    Number.TryParse(this.txtUpperInfusionRate.Text, (o) => { dURate = o });
                    let upperrate: number = dURate;
                    if (lowerrate > upperrate) {
                        this.ShowErrorMsg("Upper limit value is less than the lower limit value. Please change the value.", MessageBoxType.Information, MessageBoxButton.OK, "txtInfusionRate");
                        return false;
                    }
                    else if (lowerrate == upperrate) {
                        this.ShowErrorMsg("Lower and upper limit values are the same. Please change either.", MessageBoxType.Information, MessageBoxButton.OK, "txtInfusionRate");
                        return false;
                    }
                }
            }
            else if ((this.objfrm.FormViewerDetails.BasicDetails.InfusionType != null && (this.objfrm.FormViewerDetails.BasicDetails.InfusionType.Value == InfusionTypesCode.CONTINUOUS || this.objfrm.FormViewerDetails.BasicDetails.InfusionType.Value == InfusionTypesCode.SINGLEDOSEVOLUME || this.objfrm.FormViewerDetails.BasicDetails.InfusionType.Value == InfusionTypesCode.FLUID)) || IsInfContinous) {
                if ((String.IsNullOrEmpty(this.txtInfusionRate.Text) || (Convert.ToDecimal(this.txtInfusionRate.Text) == 0)) && this.cboInfRateNumUOM.SelectedValue == null && this.cboInfRateDenoUOM.SelectedValue == null) {
                    this.ShowErrorMsg("Infusion rate cannot be blank.", MessageBoxType.Information, MessageBoxButton.OK, "txtInfusionRate");
                    return false;
                }
                if (String.IsNullOrEmpty(this.txtInfusionRate.Text) || (Convert.ToDecimal(this.txtInfusionRate.Text) == 0)) {
                    this.ShowErrorMsg("Infusion rate cannot be zero or empty.", MessageBoxType.Information, MessageBoxButton.OK, "txtInfusionRate");
                    return false;
                }
                if ((!String.IsNullOrEmpty(this.txtInfusionRate.Text)) && (this.cboInfRateNumUOM.SelectedValue == null)) {
                    this.ShowErrorMsg("Infusion rate UOM cannot be blank.", MessageBoxType.Information, MessageBoxButton.OK, "cboInfRateNumUOM");
                    return false;
                }
                if ((!String.IsNullOrEmpty(this.txtInfusionRate.Text)) && (this.cboInfRateDenoUOM.SelectedValue == null)) {
                    this.ShowErrorMsg("Infusion rate UOM cannot be blank.", MessageBoxType.Information, MessageBoxButton.OK, "cboInfRateDenoUOM");
                    return false;
                }
            }
        }
        if ((this.objfrm.FormViewerDetails.BasicDetails.InfusionType != null && this.objfrm.FormViewerDetails.BasicDetails.InfusionType.Value == InfusionTypesCode.INTERMITTENT) || this.objfrm.FormViewerDetails.BasicDetails.InfusionType == null) {
            if (this.cboFrequency.SelectedValue == null && PatientContext.PrescriptionType != PrescriptionTypes.Clerking) {
                this.ShowErrorMsg("Frequency cannot be blank.", MessageBoxType.Information, MessageBoxButton.OK, "cboFrequency");
                return false;
            }
            else if (!this.CheckAdminTimes()) {
                return false;
            }
            if (this.grdData != null) {
                let _LastRowIndex: number = this.grdData.GetRowCount() - 1;
                let Rows: number[] = this.grdData.GetSelectedRowsIndex();
                let SelRowLen: number = Rows.length - 1;
                if (this.grdData.GetRowCount() > 1 && Rows != null && Rows.length > 0 && Rows[0] != _LastRowIndex) {
                    if ((this.udDuration.Value <= 0 || this.udDuration.Value == Number.MinValue) && !String.IsNullOrEmpty(this.cboDuration.GetValue())) {
                        this.ShowErrorMsg("Duration cannot be zero or empty.", MessageBoxType.Information, MessageBoxButton.OK, "udDuration");
                        return false;
                    }
                    else if (this.udDuration.Value > 0 && String.IsNullOrEmpty(this.cboDuration.GetValue())) {
                        this.ShowErrorMsg("Duration UOM cannot be blank.", MessageBoxType.Information, MessageBoxButton.OK, "cboDuration");
                        return false;
                    }
                    else if ((this.udDuration.Value <= 0 || this.udDuration.Value == Number.MinValue) && String.IsNullOrEmpty(this.cboDuration.GetValue())) {
                        this.ShowErrorMsg("Duration cannot be zero or empty.", MessageBoxType.Information, MessageBoxButton.OK, "udDuration");
                        return false;
                    }
                }
                else {
                    if ((this.udDuration.Value <= 0 || this.udDuration.Value == Number.MinValue) && !String.IsNullOrEmpty(this.cboDuration.GetValue())) {
                        this.ShowErrorMsg("Duration cannot be zero or empty.", MessageBoxType.Information, MessageBoxButton.OK, "udDuration");
                        return false;
                    }
                    else if (this.udDuration.Value > 0 && String.IsNullOrEmpty(this.cboDuration.GetValue())) {
                        this.ShowErrorMsg("Duration UOM cannot be blank.", MessageBoxType.Information, MessageBoxButton.OK, "cboDuration");
                        return false;
                    }
                }
            }
            if (!this.CheckEnteredInfusionRate())
                return false;
            if (this.lblDaysOfWeek.Visibility == Visibility.Visible) {
                let nDayCnt: number = 0;
                if (this.oAdminTimesVM != null) {
                    if (this.oAdminTimesVM.IsMon)
                        nDayCnt++;
                    if (this.oAdminTimesVM.IsTue)
                        nDayCnt++;
                    if (this.oAdminTimesVM.IsWed)
                        nDayCnt++;
                    if (this.oAdminTimesVM.IsThu)
                        nDayCnt++;
                    if (this.oAdminTimesVM.IsFri)
                        nDayCnt++;
                    if (this.oAdminTimesVM.IsSat)
                        nDayCnt++;
                    if (this.oAdminTimesVM.IsSun)
                        nDayCnt++;
                    if (nDayCnt > 0 && nDayCnt < this.oAdminTimesVM.FrequencyLowEvent) {
                        this.ShowErrorMsg(Resource.MedicationForm.ManDaysofWeek, MessageBoxType.Information, MessageBoxButton.OK, "chkSunday");
                        return false;
                    }
                }
            }
        }
        else if ((this.objfrm.FormViewerDetails.BasicDetails.InfusionType != null && (String.Compare(this.objfrm.FormViewerDetails.BasicDetails.InfusionType.Value, InfusionTypesCode.CONTINUOUS, StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(this.objfrm.FormViewerDetails.BasicDetails.InfusionType.Value, InfusionTypesCode.SINGLEDOSEVOLUME, StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(this.objfrm.FormViewerDetails.BasicDetails.InfusionType.Value, InfusionTypesCode.FLUID, StringComparison.CurrentCultureIgnoreCase) == 0)) || IsInfContinous) {
            let DVal: string = this.udDuration.Text;
            if ((!String.IsNullOrEmpty(DVal) && DVal == "0")) {
                this.ShowErrorMsg("Duration cannot be zero or empty.", MessageBoxType.Information, MessageBoxButton.OK, "udDuration");
                return false;
            }
            else if ((String.IsNullOrEmpty(DVal) || (!String.IsNullOrEmpty(DVal) && DVal == "0")) && !String.IsNullOrEmpty(this.cboDuration.GetValue())) {
                this.ShowErrorMsg("Duration cannot be zero or empty.", MessageBoxType.Information, MessageBoxButton.OK, "udDuration");
                return false;
            }
            else if (this.udDuration.Value > 0 && String.IsNullOrEmpty(this.cboDuration.GetValue())) {
                this.ShowErrorMsg("Duration UOM cannot be blank.", MessageBoxType.Information, MessageBoxButton.OK, "cboDuration");
                return false;
            }
            else if (this.objfrm.FormViewerDetails.BasicDetails.InfusionDetails != null && !String.IsNullOrEmpty(this.objfrm.FormViewerDetails.BasicDetails.InfusionDetails.InfusionPeriod) && this.objfrm.FormViewerDetails.BasicDetails.InfusionDetails.InfusionPeriodUom != null && !String.IsNullOrEmpty(this.objfrm.FormViewerDetails.BasicDetails.InfusionDetails.InfusionPeriodUom.DisplayText) && !String.IsNullOrEmpty(this.cboDuration.GetValue())) {
                let InfusionPeriodInMins: number = PrescriptionHelper.GetDurationInMinutesByUOM(this.objfrm.FormViewerDetails.BasicDetails.InfusionDetails.InfusionPeriod, this.objfrm.FormViewerDetails.BasicDetails.InfusionDetails.InfusionPeriodUom.DisplayText);
                let StepDoseInfusionPeriodInMins: number = PrescriptionHelper.GetDurationInMinutesByUOM(this.udDuration.Value.ToString(), this.cboDuration.GetValue());
                if (this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails != null) {
                    if (this.grdData.GetSelectedRowCount() > 0) {
                        let objSelectedMultipleDoseDetail: MultipleDoseDetail = ObjectHelper.CreateType<MultipleDoseDetail>(this.grdData.GetRowData(this.grdData.GetCurrentRowIndex()), MultipleDoseDetail);
                        let nTotalCount: number = this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails.Count;
                        for (let nCount: number = 0; nCount < nTotalCount; nCount++) {
                            let oTmpMultipleDoseDetail: MultipleDoseDetail = this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails[nCount];
                            if (objSelectedMultipleDoseDetail != oTmpMultipleDoseDetail) {
                                if (oTmpMultipleDoseDetail.Duration > 0 && oTmpMultipleDoseDetail.DurationUOM != null && !String.IsNullOrEmpty(oTmpMultipleDoseDetail.DurationUOM.Value))
                                    StepDoseInfusionPeriodInMins += PrescriptionHelper.GetDurationInMinutesByUOM(oTmpMultipleDoseDetail.Duration.ToString(), oTmpMultipleDoseDetail.DurationUOM.Value);
                            }
                        }
                    }
                    else if (this.grdData.GetRowCount() > 0) {
                        let nTotalCount: number = this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails.Count;
                        for (let nCount: number = 0; nCount < nTotalCount; nCount++) {
                            let oTmpMultipleDoseDetail: MultipleDoseDetail = this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails[nCount];
                            if (this.udDuration.Value > 0 && this.cboDuration.SelectedValue != null)
                                StepDoseInfusionPeriodInMins += PrescriptionHelper.GetDurationInMinutesByUOM(oTmpMultipleDoseDetail.Duration.ToString(), oTmpMultipleDoseDetail.DurationUOM.Value);
                        }
                    }
                    if (StepDoseInfusionPeriodInMins > InfusionPeriodInMins) {
                        this.ShowErrorMsg(Resource.Infusion.CombinedDuration_ValMsg, MessageBoxType.Information, MessageBoxButton.OK, "");
                        return false;
                    }
                }
            }
        }
        return true;
    }
    private CheckEnteredInfusionRate(): boolean {
        if ((!this.isClerkVal) && (String.IsNullOrEmpty(this.txtInfusionRate.Text) || (String.Compare(this.txtInfusionRate.Text, "0") == 0)) && ((this.cboInfRateNumUOM.SelectedValue != null) || (this.cboInfRateDenoUOM.SelectedValue != null))) {
            this.ShowErrorMsg("Infusion rate cannot be zero or empty.", MessageBoxType.Information, MessageBoxButton.OK, "txtInfusionRate");
            return false;
        }
        else if ((!this.isClerkVal) && (!String.IsNullOrEmpty(this.txtInfusionRate.Text)) && (String.Compare(this.txtInfusionRate.Text, "0") == 0) && (this.cboInfRateNumUOM.SelectedValue == null)) {
            this.ShowErrorMsg("Infusion rate cannot be zero or empty.", MessageBoxType.Information, MessageBoxButton.OK, "txtInfusionRate");
            return false;
        }
        else if ((!this.isClerkVal) && (!String.IsNullOrEmpty(this.txtInfusionRate.Text)) && (String.Compare(this.txtInfusionRate.Text, "0") == 0) && (this.cboInfRateDenoUOM.SelectedValue == null)) {
            this.ShowErrorMsg("Infusion rate cannot be zero or empty.", MessageBoxType.Information, MessageBoxButton.OK, "txtInfusionRate");
            return false;
        }
        else if ((!this.isClerkVal) && (!String.IsNullOrEmpty(this.txtInfusionRate.Text)) && (this.cboInfRateNumUOM.SelectedValue == null)) {
            this.ShowErrorMsg("Infusion rate UOM cannot be blank..", MessageBoxType.Information, MessageBoxButton.OK, "cboInfRateNumUOM");
            return false;
        }
        else if ((!this.isClerkVal) && (!String.IsNullOrEmpty(this.txtInfusionRate.Text)) && (this.cboInfRateDenoUOM.SelectedValue == null)) {
            this.ShowErrorMsg("Infusion rate UOM cannot be blank.", MessageBoxType.Information, MessageBoxButton.OK, "cboInfRateDenoUOM");
            return false;
        }
        return true;
    }
    ValidateDoseValue(oMultipleDoseDetail: MultipleDoseDetail): boolean {
        let bIsValid: boolean = true;
        if ((this.objfrm.FormViewerDetails.BasicDetails.InfusionType == null) || (this.objfrm.FormViewerDetails.BasicDetails.InfusionType != null && this.objfrm.FormViewerDetails.BasicDetails.InfusionType.Value == InfusionTypesCode.INTERMITTENT)) {
            let objMsg: iMessageBox = new iMessageBox();
            if (!String.IsNullOrEmpty(this.txtLowerDose.Text)) {
                let dDoseValue: number;
                Number.TryParse(this.txtLowerDose.Text, (o) => { dDoseValue = o });
                if (dDoseValue > 0 && dDoseValue < 1) {
                    if ((this.objfrm.FormViewerDetails.BasicDetails.InfusionType == null) || (!this.bDoseSafetymsg && this.objfrm.FormViewerDetails.BasicDetails.InfusionType != null && this.objfrm.FormViewerDetails.BasicDetails.InfusionType.Value == InfusionTypesCode.INTERMITTENT)) {
                        this.bDoseSafetymsg = true;
                        objMsg.MessageButton = MessageBoxButton.YesNo;
                        objMsg.IconType = MessageBoxType.Information;
                        objMsg.Title = "Lorenzo - Manage prescription";
                        objMsg.MessageBoxClose = (s, e) => { this.objMsg_MessageBoxClose(s, e); };
                        objMsg.Message = "For safety, avoid entering a dose value of less than 1, change unit of measure if necessary. Do you wish to continue?";
                        objMsg.Show();
                        bIsValid = false;
                    }
                }
                if (dDoseValue == 0 && String.IsNullOrEmpty(this.txtUpperDose.Text)) {
                    objMsg.MessageButton = MessageBoxButton.OK;
                    objMsg.IconType = MessageBoxType.Information;
                    objMsg.Title = "Lorenzo - Manage prescription";
                    objMsg.MessageBoxClose = (s, e) => { this.objMsg_MessageBoxClose(s, e); };
                    objMsg.Message = "From dose cannot be zero or empty.";
                    objMsg.Show();
                    bIsValid = false;
                }
                if (oMultipleDoseDetail != null) {
                    let dUDoseValue: number = 0;
                    if (!String.IsNullOrEmpty(this.txtUpperDose.Text)) {
                        Number.TryParse(this.txtUpperDose.Text, (o) => { dUDoseValue = o });
                    }
                    if ((oMultipleDoseDetail.LowerDose != dDoseValue) || (oMultipleDoseDetail.UpperDose != dUDoseValue)) {
                        if (this.objfrm != null && this.objfrm.FormViewerDetails != null && this.objfrm.FormViewerDetails.BasicDetails != null && !this.objfrm.FormViewerDetails.BasicDetails.lstAmendedFlds.Contains("Dose"))
                            this.objfrm.FormViewerDetails.BasicDetails.lstAmendedFlds.Add("Dose");
                    }
                }
            }
        }
        return bIsValid;
    }
    ValidatechangingDoseValue(): boolean {
        let bIsValid: boolean = true;
        if (!this.bDoseSafetymsg && this.objfrm.FormViewerDetails.BasicDetails.InfusionType != null && this.objfrm.FormViewerDetails.BasicDetails.InfusionType.Value == InfusionTypesCode.INTERMITTENT) {
            let objMsg: iMessageBox = new iMessageBox();
            if ((this.ChangedDoseScheduleDetails != null) && (!String.IsNullOrEmpty(this.ChangedDoseScheduleDetails.DoseValue))) {
                let dDoseValue1: number;
                Number.TryParse(this.ChangedDoseScheduleDetails.DoseValue, (o) => { dDoseValue1 = o });
                if (dDoseValue1 < 1) {
                    this.bDoseSafetymsg = true;
                    objMsg.MessageButton = MessageBoxButton.YesNo;
                    objMsg.IconType = MessageBoxType.Information;
                    objMsg.Title = "Lorenzo - Manage prescription";
                    objMsg.MessageBoxClose = (s, e) => { this.objMsg_MessageBoxClose(s, e); };
                    objMsg.Message = "For safety, avoid entering a dose value of less than 1, change unit of measure if necessary. Do you wish to continue?";
                    objMsg.Show();
                    bIsValid = false;
                }
            }
        }
        return bIsValid;
    }
    CheckAdminTimes(): boolean {
        if (this.oAdminTimesVM != null && this.oAdminTimesVM.GrdData != null && this.oAdminTimesVM.GrdData.Count > 0) {
            let IsVaildTime: boolean = true;
            let nCntZero: number = 0;
            let isDrugRoundSelected: boolean = ObjectHelper.HasValue(this.iRdBtndrgRoundTime.IsChecked) && this.iRdBtndrgRoundTime.IsChecked.Value;
            let sEventTime: string;
            let duplicateEventtime: boolean = false;
            for (let i: number = 0; i < this.oAdminTimesVM.GrdData.Count; i++) {
                if (isDrugRoundSelected) {
                    sEventTime = this.oAdminTimesVM.GrdData[i].DruRoundTimes;
                }
                else {
                    sEventTime = this.oAdminTimesVM.GrdData[i].FixedTimes;
                }
                if (String.IsNullOrEmpty(sEventTime)) {
                    IsVaildTime = false;
                    break;
                }
                else if (String.Compare(sEventTime, "00:00") == 0) {
                    if (nCntZero >= 1 && duplicateEventtime == true) {
                        IsVaildTime = false;
                        break;
                    }
                    nCntZero++;
                    duplicateEventtime = true;
                }
                else if (this.ScheduleDetailsColsDetails != null && this.ScheduleDetailsColsDetails.Count > i && !String.IsNullOrEmpty(this.ScheduleDetailsColsDetails[i].ScheduleTime) && this.ScheduleDetailsColsDetails[i].ScheduleTime.Contains(CConstants.Event)) {
                    this.ScheduleDetailsColsDetails[i].ScheduleTime = sEventTime;
                }
            }
            if (!IsVaildTime) {
                let objMsg: iMessageBox = new iMessageBox();
                objMsg.Title = "Lorenzo - Manage prescription";
                objMsg.MessageButton = MessageBoxButton.OK;
                objMsg.IconType = MessageBoxType.Information;
                objMsg.Message = Resource.Infusion.RecAdminAdministrationTime_Msg;
                ;
                objMsg.Show();
                return false;
            }
        }
        if (this.lblDaysOfWeek.Visibility == Visibility.Visible) {
            let nDayCnt: number = 0;
            if (this.oAdminTimesVM != null) {
                if (this.oAdminTimesVM.IsMon)
                    nDayCnt++;
                if (this.oAdminTimesVM.IsTue)
                    nDayCnt++;
                if (this.oAdminTimesVM.IsWed)
                    nDayCnt++;
                if (this.oAdminTimesVM.IsThu)
                    nDayCnt++;
                if (this.oAdminTimesVM.IsFri)
                    nDayCnt++;
                if (this.oAdminTimesVM.IsSat)
                    nDayCnt++;
                if (this.oAdminTimesVM.IsSun)
                    nDayCnt++;
                if (nDayCnt < this.oAdminTimesVM.FrequencyLowEvent) {
                    this.ShowErrorMsg(Resource.MedicationForm.ManDaysofWeek, MessageBoxType.Information, MessageBoxButton.OK, "chkSunday");
                    return false;
                }
            }
        }
        return true;
    }
    StepDurationAmendment_MessageBoxClose(sender: Object, e: MessageEventArgs): void {
        if (e.MessageBoxResult == MessageBoxResult.OK) {
            let objgrddata: MultipleDoseDetail = this.objfrm.FormViewerDetails.BasicDetails.SelectedDoseDetail;
            this.sActionText = CConstants.SVActionUpdate;
            this.objfrm.FormViewerDetails.BasicDetails.StopDate = this.AmendDurationDTTM;
            this.objfrm.FormViewerDetails.BasicDetails.StopPrescriptionTime = this.AmendDurationDTTM;
            this.AmendDurationDTTM = DateTime.MinValue;
            if (!this.IsChangingDoseMezzaineLaunched) {
                this.LaunchChangingDoseMezzanine();
            }
            else {
                if (this.ValidateBeforeUpdateCondition()) {
                    this.UpdateCondition(objgrddata, this.IsDaywiseViewEnabled);
                }
            }
        }
        else {
            this.AmendDurationDTTM = DateTime.MinValue;
        }
    }
    SteppedStopDTTMWithoutDuration_MessageBoxClose(sender: Object, e: MessageEventArgs): void {
        if (e.MessageBoxResult == MessageBoxResult.OK) {
            {
                if (!this.IsChangingDoseMezzaineLaunched) {
                    this.LaunchChangingDoseMezzanine();
                }
                else {
                    this.AddCondition();
                }
            }
            if (this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails != null && this.objfrm.FormViewerDetails.BasicDetails.IsStopDTTMAutoUpdate) {
                this.lblStopDatetimeValue.Text = String.Empty;
                this.objfrm.FormViewerDetails.BasicDetails.StopDate = DateTime.MinValue;
                this.objfrm.FormViewerDetails.BasicDetails.StopPrescriptionTime = DateTime.MinValue;
                this.objfrm.FormViewerDetails.BasicDetails.IsStopDTTMAutoUpdate = false;
            }
        }
        else if (e.MessageBoxResult == MessageBoxResult.Cancel) {

        }
    }
    SteppedStopDTTMMismatchDuration_MessageBoxClose(sender: any, e: MessageEventArgs): void {
        if (e.MessageBoxResult == MessageBoxResult.OK) {
            this._IsStopDTTMUpdate = true;
            {
                let StepStartDTTM: DateTime = DateTime.MinValue;
                let StepEndDTTM: DateTime = DateTime.MinValue;
                StepStartDTTM = this.GetStartDateTimeForNewStep();
                // let oMsgBox: iMessageBox = ObjectHelper.CreateType<iMessageBox>(sender, iMessageBox);
                if (sender != null) {
                    StepEndDTTM = Convert.ToDateTime(sender);
                }
                else {
                    StepEndDTTM = DateTime.MinValue;
                }
                if (!this.IsChangingDoseMezzaineLaunched) {
                    this.LaunchChangingDoseMezzanine();
                }
                else {
                    this.AddCondition();
                }
                if (this._IsStopDTTMUpdate && DateTime.NotEquals(StepEndDTTM, DateTime.MinValue) && this.objfrm.FormViewerDetails.BasicDetails.IsStopDTTMAutoUpdate && this.IsStopDateAvailable) {
                    this.objfrm.FormViewerDetails.BasicDetails.StopTVMsgFromStepVar = true;
                    this.lblStopDatetimeValue.Text = StepEndDTTM.ToUserDateTimeString("dd-MMM-yyyy HH:mm");
                    this.objfrm.FormViewerDetails.BasicDetails.StopDate = StepEndDTTM;
                    this.objfrm.FormViewerDetails.BasicDetails.StopPrescriptionTime = StepEndDTTM;
                }
            }
        }
        else if (e.MessageBoxResult == MessageBoxResult.Cancel) {

        }
    }
    objMsg_MessageBoxClose(sender: Object, e: MessageEventArgs): void {
        if (e.MessageBoxResult == MessageBoxResult.No) {
            this.txtLowerDose.Text = String.Empty;
            this.txtLowerDose.Focus();
            this.bDoseSafetymsg = false;
        }
        else if (e.MessageBoxResult == MessageBoxResult.Yes) {
            if (String.Equals(this.sActionText, CConstants.SVActionAdd) && this.Validate(null) && this.ValidateStopDTTMMismatchDuration(this.sActionText)) {
                this.AddCondition();
            }
            else {
                let objgrddata: MultipleDoseDetail = this.objfrm.FormViewerDetails.BasicDetails.SelectedDoseDetail;
                if (String.Compare(this.sActionText, CConstants.SVActionUpdate) == 0 && objgrddata != null && this.Validate(objgrddata) && this.ValidateStepDurationAmendment()) {
                    let bNoError: boolean = this.UpdateClickedORLaunchChangingDoseMezzanine(objgrddata);
                }
            }
        }
    }
    private itxtDose_KeyDown(sender: Object, e: KeyEventArgs): void {
        if (e.PlatformKeyCode == 189) {
            e.Handled = true;
        }
    }
    private GetStartDateTimeForNewStep(): DateTime {
        let _StartDTTM: DateTime = DateTime.MinValue;
        let _PresItemStartDTTM: DateTime = this.objfrm.FormViewerDetails.BasicDetails.StartDTTM;
        if (DateTime.Equals(_PresItemStartDTTM, DateTime.MinValue) && String.Equals(PatientContext.PrescriptionType, PrescriptionTypes.Clerking)) {
            if (this.objfrm.FormViewerDetails.BasicDetails.Partialdate) {
                _PresItemStartDTTM = this.objfrm.FormViewerDetails.BasicDetails.GetClerkingParialDate();
            }
            else {
                _PresItemStartDTTM = CommonBB.GetServerDateTime().Date;
            }
        }
        if (DateTime.NotEquals(_PresItemStartDTTM, DateTime.MinValue)) {
            let _IsMonthlyFrequency: boolean = false;
            let dtEndDttm: DateTime = DateTime.MinValue;
            let objCurDuration: MeasurableObject = null;
            let sDurationUOM: string = String.Empty;
            if (this.oAdminTimesVM != null && this.oAdminTimesVM.FreqDetails != null && this.oAdminTimesVM.FreqDetails.oFrequency != null && this.oAdminTimesVM.FreqDetails.oFrequency.UOM != null) {
                _IsMonthlyFrequency = String.Equals(this.oAdminTimesVM.FreqDetails.oFrequency.UOM, CConstants.UOMType3, StringComparison.CurrentCultureIgnoreCase);
            }
            if (ObjectHelper.CreateType<CListItem>(this.cboDuration.SelectedValue, CListItem) != null && this.udDuration.Value > 0) {
                objCurDuration = new MeasurableObject();
                objCurDuration.Value = Convert.ToInt64(this.udDuration.Value);
                if (this.cboDuration.SelectedValue != null) {
                    sDurationUOM = this.cboDuration.SelectedValue.ToString();
                }
            }
            if (this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails == null || (this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails != null && this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails.Count == 0)) {
                if (this.CanAddAdditionalDose) {
                    if (_IsMonthlyFrequency) {
                        if (objCurDuration != null && !String.IsNullOrEmpty(sDurationUOM)) {
                            dtEndDttm = this.objfrm.CalculateEndDTTM(_PresItemStartDTTM, objCurDuration, sDurationUOM);
                        }
                        if ((DateTime.NotEquals(dtEndDttm, DateTime.MinValue) && DateTime.LessThanOrEqualTo(_PresItemStartDTTM.DateTime.AddDays(CConstants.NoOfDaysInMonth), dtEndDttm)) || DateTime.Equals(dtEndDttm, DateTime.MinValue)) {
                            _StartDTTM = _PresItemStartDTTM.AddDays(CConstants.NoOfDaysInMonth);
                        }
                        else {
                            _StartDTTM = _PresItemStartDTTM;
                        }
                    }
                    else {
                        _StartDTTM = _PresItemStartDTTM.DateTime.AddDays(1);
                    }
                }
                else {
                    if (DateTime.NotEquals(this.objfrm.FormViewerDetails.BasicDetails.StartPrescriptionTime, DateTime.MinValue)) {
                        _StartDTTM = _PresItemStartDTTM.DateTime.AddTime(this.objfrm.FormViewerDetails.BasicDetails.StartPrescriptionTime);
                    }
                    else {
                        _StartDTTM = _PresItemStartDTTM;
                    }
                }
            }
            else {
                if (this.CanAddAdditionalDose && this.objfrm.FormViewerDetails.BasicDetails.SelectedDoseDetail != null) {
                    if (_IsMonthlyFrequency) {
                        if (objCurDuration != null && !String.IsNullOrEmpty(sDurationUOM)) {
                            dtEndDttm = this.objfrm.CalculateEndDTTM(_PresItemStartDTTM, objCurDuration, sDurationUOM);
                        }
                        if ((DateTime.NotEquals(dtEndDttm, DateTime.MinValue) && DateTime.LessThanOrEqualTo(_PresItemStartDTTM.DateTime.AddDays(CConstants.NoOfDaysInMonth), dtEndDttm)) || DateTime.Equals(dtEndDttm, DateTime.MinValue)) {
                            _StartDTTM = _PresItemStartDTTM.DateTime.AddDays(CConstants.NoOfDaysInMonth);
                        }
                        else {
                            _StartDTTM = _PresItemStartDTTM;
                        }
                    }
                    else {
                        _StartDTTM = _PresItemStartDTTM.DateTime.AddDays(1);
                    }
                }
                else {
                    if (this.cmdUpdate.IsEnabled && this.objfrm.FormViewerDetails.BasicDetails.SelectedDoseDetail != null) {
                        _StartDTTM = this.objfrm.FormViewerDetails.BasicDetails.SelectedDoseDetail.StartDTTM;
                    }
                    else if (this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails != null && this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails.Count > 0) {
                        if (this.oAdminTimesVM != null && this.oAdminTimesVM.FreqDetails != null && this.oAdminTimesVM.FreqDetails.oFrequency != null && String.Equals(this.oAdminTimesVM.FreqDetails.oFrequency.UOM, CConstants.OnceOnlyFrequency, StringComparison.InvariantCultureIgnoreCase) && this.oAdminTimesVM.GrdData != null && this.oAdminTimesVM.GrdData.Count > 0) {
                            let _IsFixedTime: boolean = (this.iRdBtnFixedTime.IsChecked == true) ? true : false;
                            let _bAdminTime: boolean;
                            let ts: TimeSpan = new TimeSpan();
                            if (_IsFixedTime) {
                                _bAdminTime = TimeSpan.TryParse(this.oAdminTimesVM.GrdData[0].FixedTimes, (o) => { ts = o });
                            }
                            else {
                                _bAdminTime = TimeSpan.TryParse(this.oAdminTimesVM.GrdData[0].DruRoundTimes, (o) => { ts = o });
                            }
                            if (_bAdminTime) {
                                _StartDTTM = _PresItemStartDTTM.Add(ts);
                            }
                        }
                        else {
                            if (this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails[this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails.Count - 1].IsAdditionalDose) {
                                _StartDTTM = this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails[this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails.Count - 1].EndDTTM.DateTime.AddDays(1);
                            }
                            else {
                                _StartDTTM = this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails[this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails.Count - 1].EndDTTM.AddMinutes(1);
                            }
                        }
                    }
                }
                if (this.IsCanStartFromNextDay()) {
                    let _SelectedRowIndex: number = -1;
                    if (!String.IsNullOrEmpty(this.sActionText) && this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails != null && this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails.Count > 0) {
                        if (this.cmdAdd.IsEnabled) {
                            _SelectedRowIndex = this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails.Count - 1;
                        }
                        else if (this.cmdUpdate.IsEnabled) {
                            _SelectedRowIndex = this.grdData.GetCurrentRowIndex() - 1;
                        }
                    }
                    if (_SelectedRowIndex > -1) {
                        _StartDTTM = this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails[_SelectedRowIndex].EndDTTM.DateTime.AddDays(1);
                    }
                }
            }
        }
        return _StartDTTM;
    }
    private ExtractCollectionFromStepVariableGrid(): ObservableCollection<LorAppMedCommonBB.MultipleDoseDetail> {
        let objColl: ObservableCollection<LorAppMedCommonBB.MultipleDoseDetail> = new ObservableCollection<LorAppMedCommonBB.MultipleDoseDetail>();
        if (this.grdData != null && this.grdData.Rows != null && this.grdData.Rows.Count > 0) {
            let nRowCount: number = this.grdData.Rows.Count;
            for (let nRow: number = 0; nRow < nRowCount; nRow++) {
                let objMultipleDoseDetail: MultipleDoseDetail = ObjectHelper.CreateType<MultipleDoseDetail>(this.grdData.GetRowData(nRow), MultipleDoseDetail);
                if (objMultipleDoseDetail) {
                    let tmpEndDt: DateTime = objMultipleDoseDetail.Duration > 0 ? objMultipleDoseDetail.EndDTTM : (this.objfrm != null && this.objfrm.FormViewerDetails != null && this.objfrm.FormViewerDetails.BasicDetails != null && DateTime.NotEquals(this.objfrm.FormViewerDetails.BasicDetails.StopDate, DateTime.MinValue) && DateTime.GreaterThan(this.objfrm.FormViewerDetails.BasicDetails.StopDate, this.objfrm.FormViewerDetails.BasicDetails.StartDTTM) && this.objfrm.FormViewerDetails.BasicDetails.StopPrescriptionTime != null) ? this.objfrm.FormViewerDetails.BasicDetails.StopDate.DateTime.AddTime(this.objfrm.FormViewerDetails.BasicDetails.StopPrescriptionTime.Value) : DateTime.MinValue;
                    objColl.Add(ObjectHelper.CreateObject(new MultipleDoseDetail(), {
                        AdministrationTimes: objMultipleDoseDetail.AdministrationTimes,
                        AdminTimesData: objMultipleDoseDetail.AdminTimesData,
                        DaysOfWeek: objMultipleDoseDetail.DaysOfWeek,
                        Direction: objMultipleDoseDetail.Direction,
                        DoseInstructions: objMultipleDoseDetail.DoseInstructions,
                        DoseUOM: objMultipleDoseDetail.DoseUOM,
                        DoseValueDisplay: objMultipleDoseDetail.DoseValueDisplay,
                        Duration: objMultipleDoseDetail.Duration > 0 ? objMultipleDoseDetail.Duration : 0,
                        DurationUOM: objMultipleDoseDetail.DurationUOM,
                        DurationValueDisplay: objMultipleDoseDetail.DurationValueDisplay,
                        EndDTTM: tmpEndDt,
                        FreqDetails: objMultipleDoseDetail.FreqDetails,
                        Frequency: objMultipleDoseDetail.Frequency,
                        HyperlinkText: objMultipleDoseDetail.HyperlinkText,
                        InfrateDenominatoruom: objMultipleDoseDetail.InfrateDenominatoruom,
                        Infratenumeratoruom: objMultipleDoseDetail.Infratenumeratoruom,
                        InfusionRate: objMultipleDoseDetail.InfusionRate,
                        InfusionUpperrate: objMultipleDoseDetail.InfusionUpperrate,
                        IsDaywiseView: objMultipleDoseDetail.IsDaywiseView,
                        IsfixedTime: String.Equals(objMultipleDoseDetail.SlotTimeMode, 'F') ? true : false,
                        IsHyperLink: objMultipleDoseDetail.IsHyperLink,
                        IsPRN: objMultipleDoseDetail.IsPRN,
                        LowerDose: objMultipleDoseDetail.LowerDose,
                        oAdminTimesVM: objMultipleDoseDetail.oAdminTimesVM,
                        PresType: objMultipleDoseDetail.PresType,
                        sceduledTimelst: objMultipleDoseDetail.sceduledTimelst,
                        ScheduleDetailsData: objMultipleDoseDetail.ScheduleDetailsData,
                        SlotTimeMode: objMultipleDoseDetail.SlotTimeMode,
                        StartDTTM: objMultipleDoseDetail.StartDTTM,
                        TotalCols: objMultipleDoseDetail.TotalCols,
                        UpperDose: objMultipleDoseDetail.UpperDose
                    }));
                }
            }
        }
        return objColl;
    }

    public FullPrescriptionView_Click(sender: Object, e: RoutedEventArgs): void {
        if (this.omedFormViewer != null && this.omedFormViewer.ValidateSteppedDoseForBlankAdminTimes(true)) {
            let objAllSteps: ObservableCollection<LorAppMedCommonBB.MultipleDoseDetail> = this.ExtractCollectionFromStepVariableGrid();
            let nRowCount: number = objAllSteps.Count;
            if (objAllSteps != null && nRowCount > 0) {

                let oSDDet: MedSteppedFullPrescriptionVW = new MedSteppedFullPrescriptionVW();
                if (this.objfrm != null && this.objfrm.FormViewerDetails != null && this.objfrm.FormViewerDetails.BasicDetails != null && this.objfrm.FormViewerDetails.BasicDetails.InfusionType != null && this.objfrm.FormViewerDetails.BasicDetails.InfusionType.Value != null) {
                    oSDDet.sInfusionType = this.objfrm.FormViewerDetails.BasicDetails.InfusionType.Value;
                }
                Busyindicator.SetStatusBusy("SteppenFullPrescription");
                let containerMultiDose: LorAppMedCommonBB.MultipleDoseDetail = new LorAppMedCommonBB.MultipleDoseDetail();
                setTimeout(() => {
                    containerMultiDose.StepDoseGridColms = objAllSteps;
                    containerMultiDose.sPresType = PatientContext.PrescriptionType;
                    oSDDet.DataContext = containerMultiDose;
                    oSDDet.sPrescriptionTypeCode = PatientContext.PrescriptionType;
                    oSDDet.oLaunchFrom = SVIconLaunchFrom.PrescribeRHS;
                    oSDDet.sLaunchMenuCode = ContextInfo.MenuCode;
                    oSDDet.onDialogClose = this.oFullPresView_Closed;
                    let oSDDetCallBack = (s, e) => { oSDDet = s; };
                    let dialogWindowHeight = 600;
                    if(!String.IsNullOrEmpty(QueryStringInfo.IsLaunchformMedchart) &&
                    window.devicePixelRatio == 1.25 &&
                     String.Equals(
                      QueryStringInfo.IsLaunchformMedchart,
                      'True',
                      StringComparison.InvariantCultureIgnoreCase
                    ))
                    dialogWindowHeight = 560;
                    AppActivity.OpenWindow("Full prescription view", oSDDet, (s, e) => { this.oFullPresView_Closed(s); }, "", false, dialogWindowHeight, 950, false, WindowButtonType.Close, null, null, null, oSDDetCallBack);
                }, 0);
            }
        }
    }
    private oFullPresView_Closed(args: AppDialogEventargs): void {
        Busyindicator.SetStatusIdle("SteppenFullPrescription");
        args.AppChildWindow.DialogResult = true;
    }

    public LaunchChangingDoseMezzanine(): boolean {
        if (!this.CheckAdminTimes())
            return false;
        if (!this.showduplicate())
            return false;
        let startdate: DateTime = this.GetStartDateTimeForNewStep();
        let _PresItemStartDTTM: DateTime = this.objfrm.FormViewerDetails.BasicDetails.StartDTTM;
        if (DateTime.Equals(_PresItemStartDTTM, DateTime.MinValue) && String.Equals(PatientContext.PrescriptionType, PrescriptionTypes.Clerking)) {
            _PresItemStartDTTM = CommonBB.GetServerDateTime().Date;
        }
        if (this.isMedicationClerk && this.objfrm != null && this.objfrm.FormViewerDetails != null && (this.objfrm.FormViewerDetails.BasicDetails.IsAdditionalDoseOpted || !String.Equals(this.sActionText, CConstants.SVActionFormViewerOk)) && this.objfrm.FormViewerDetails.BasicDetails != null && this.objfrm.FormViewerDetails.BasicDetails.actualClerkingValues != null && this.objfrm.FormViewerDetails.BasicDetails.actualClerkingValues.Multidosedetail != null && this.objfrm.FormViewerDetails.BasicDetails.actualClerkingValues.Multidosedetail.Count > 0) {
            this.objfrm.FormViewerDetails.BasicDetails.IsMandatoryReasonForMedClerkModify = true;
            this.objfrm.FormViewerDetails.BasicDetails.SetOnadmissionValue("", DoseTypeCode.STEPPEDVARIABLE);
        }
        if (this.ChangedDoseScheduleDetails == null) {
            let doseValue: string = String.Empty;
            let doseUOM: string = String.Empty;
            let durationValue: number = 0;
            let durationUOM: string = String.Empty;
            let IsFixedTime: boolean = false;
            if (DateTime.NotEquals(_PresItemStartDTTM, DateTime.MinValue) && this.oAdminTimesVM != null && this.oAdminTimesVM.GrdData != null) {
                if (!String.IsNullOrEmpty(this.txtLowerDose.Text)) {
                    doseValue = this.txtLowerDose.Text;
                }
                if (this.objfrm.FormViewerDetails.BasicDetails.SteppedDoseUOM != null && !String.IsNullOrEmpty(this.objfrm.FormViewerDetails.BasicDetails.SteppedDoseUOM.DisplayText)) {
                    doseUOM = this.objfrm.FormViewerDetails.BasicDetails.SteppedDoseUOM.DisplayText;
                }
                if (this.udDuration.Value > 0) {
                    durationValue = this.udDuration.Value;
                }
                if (!String.IsNullOrEmpty(this.cboDuration.GetValue())) {
                    durationUOM = this.cboDuration.GetValue();
                }
                if (this.iRdBtnFixedTime.IsChecked.Value) {
                    IsFixedTime = true;
                }
                if (this.oAdminTimesVM.FreqDetails != null && this.oAdminTimesVM.FreqDetails.oFrequency != null) {
                    this.oAdminTimesVM.FreqDetails.oFrequency.IsSunday = this.oAdminTimesVM.IsSun;
                    this.oAdminTimesVM.FreqDetails.oFrequency.IsMonday = this.oAdminTimesVM.IsMon;
                    this.oAdminTimesVM.FreqDetails.oFrequency.IsTuesday = this.oAdminTimesVM.IsTue;
                    this.oAdminTimesVM.FreqDetails.oFrequency.IsWednesday = this.oAdminTimesVM.IsWed;
                    this.oAdminTimesVM.FreqDetails.oFrequency.IsThursday = this.oAdminTimesVM.IsThu;
                    this.oAdminTimesVM.FreqDetails.oFrequency.IsFriday = this.oAdminTimesVM.IsFri;
                    this.oAdminTimesVM.FreqDetails.oFrequency.IsSaturday = this.oAdminTimesVM.IsSat;
                }
                let obj: ScheduleDetailsSteppedVM = ObjectHelper.CreateObject(new ScheduleDetailsSteppedVM(), {
                    DoseValue: doseValue,
                    DoseUOM: doseUOM,
                    StartDate: startdate,
                    DurationValue: durationValue,
                    DurationUOM: durationUOM,
                    EndDate: this.objfrm.FormViewerDetails.BasicDetails.SelectedDoseDetail != null ? this.objfrm.FormViewerDetails.BasicDetails.SelectedDoseDetail.EndDTTM : DateTime.MinValue,
                    AdminTimeGrdData: this.oAdminTimesVM.GrdData,
                    FreqDetails: this.oAdminTimesVM.FreqDetails != null ? this.oAdminTimesVM.FreqDetails : (this.objfrm.FormViewerDetails.BasicDetails.SelectedDoseDetail != null && this.objfrm.FormViewerDetails.BasicDetails.SelectedDoseDetail.FreqDetails != null ? this.objfrm.FormViewerDetails.BasicDetails.SelectedDoseDetail.FreqDetails : null),
                    IsFixedTime: IsFixedTime,
                    IsDaywiseView: this.IsDaywise,
                    PresType: PatientContext.PrescriptionType,
                    IsModifiedChangeDoseDetail: this.IsChangingDoseMetaDataModified(this.objfrm.FormViewerDetails.BasicDetails.SelectedDoseDetail),
                    IsClearEnabled: true,
                    ActionCode: this.objfrm.ActionCode.ToString()
                });
                let nCount: number = 0;
                if (this.oAdminTimesVM != null) {
                    nCount = this.oAdminTimesVM.GrdData.Count;
                    obj.AdminTimeGrdData = this.oAdminTimesVM.GrdData;
                }
                if (this.ScheduleDetailsColsDetails != null && this.ScheduleDetailsColsDetails.Count > 0) {
                    obj.GrdData = new ObservableCollection<ScheduleDetailsCols>();
                    for (let i: number = 0; i < this.ScheduleDetailsColsDetails.Count; i++) {
                        obj.GrdData.Add(this.ScheduleDetailsColsDetails[i].GetCloneObject());
                    }
                    if (this.objfrm.FormViewerDetails.BasicDetails.SelectedDoseDetail != null) {
                        for (let i: number = 0; i < nCount; i++) {
                            if (this.iRdBtnFixedTime.IsChecked == true && this.objfrm.FormViewerDetails.BasicDetails.SelectedDoseDetail.SlotTimeMode != 'F') {
                                obj.GrdData[i].ScheduleTime = this.oAdminTimesVM.GrdData[i].FixedTimes;
                            }
                            else if (this.iRdBtndrgRoundTime.IsChecked == true && this.objfrm.FormViewerDetails.BasicDetails.SelectedDoseDetail.SlotTimeMode != 'D') {
                                obj.GrdData[i].ScheduleTime = this.oAdminTimesVM.GrdData[i].DruRoundTimes;
                            }
                        }
                        obj.LstOriginalDoseValues = this.objfrm.FormViewerDetails.BasicDetails.SelectedDoseDetail.LstOriginalDoseValues;
                    }
                }
                this.oChangingDose = new ChangeDose();
                this.oChangingDose.constructorImpl(obj);
                this.ScheduleDetails = obj;
            }
        }
        else {
            this.ChangedDoseScheduleDetails.StartDate = startdate;
            this.oChangingDose = new ChangeDose();
            this.oChangingDose.constructorImpl(this.ChangedDoseScheduleDetails);
            this.ScheduleDetails = this.ChangedDoseScheduleDetails;
        }
        if (this.oChangingDose != null) {
            this.oChangingDose.objChangeDoseFooter = new ChangeDoseFooter();
            this.oChangingDose.objChangeDoseFooter.DataContext = ObjectHelper.CreateType<ScheduleDetailsSteppedVM>(this.oChangingDose.DataContext, ScheduleDetailsSteppedVM);
            let oChangingDoseCallBack = (primary, secondary) => {
                if (primary != undefined && secondary != undefined) {
                    this.oChangingDose = primary;
                    this.oChangingDose.objChangeDoseFooter = secondary;
                }
            };
            AppActivity.OpenWindow("Changing dose mezzanine", this.oChangingDose, (s, e) => { this.oChangingDose_Closed(s); }, "", false, 330, CConstants.ChangingDoseMezzanineNonDaywiseWidth, false, WindowButtonType.Ok, this.oChangingDose.objChangeDoseFooter, null, null, oChangingDoseCallBack);
            this.IsChangingDoseMezzaineLaunched = true;
        }
        return true;
    }
    public ChangingDose_Click(sender: Object, e: RoutedEventArgs): void {
        this.sActionText = CConstants.SVActionChangingDose;
        if (!this.bDuplicateAdminTimesPrompt) {
            if (this.Validate(null) && this.showduplicate() && this.ValidateForPerviousAndCurrentStepOverlapAdminTime()) {
                let _IsCallBack: boolean = this.LaunchChangingDoseMezzanine();
            }
        }
    }
    oChangingDose_Closed(args: AppDialogEventargs): void {
        let CanContinue: boolean = true;
        if (CanContinue) {
            this.args1 = args;
            if (args.Result == AppDialogResult.Ok) {
                if (this.oChangingDose != null && this.oChangingDose.DataContext != null) {
                    this.ChangedDoseScheduleDetails = ObjectHelper.CreateType<ScheduleDetailsSteppedVM>(this.oChangingDose.DataContext, ScheduleDetailsSteppedVM);
                }
                if (this.ChangedDoseScheduleDetails != null) {
                    if (this.ChangedDoseScheduleDetails.IsDaywiseViewClicked) {
                        this.IsDaywiseViewEnabled = this.ChangedDoseScheduleDetails.IsDaywiseViewClicked;
                    }
                    else {
                        this.IsDaywiseViewEnabled = this.ChangedDoseScheduleDetails.IsDayWiseEnabled;
                    }
                    this.ChangedDoseScheduleDetails.LstOriginalDoseValues = null;
                }
                if (this.ValidateChangeDose()) {
                    if (this.objfrm.FormViewerDetails.BasicDetails.SelectedDoseDetail != null)
                        this.objfrm.FormViewerDetails.BasicDetails.IsChangingDoseContentModified = PrescriptionHelper.IsChangingDoseValuesGotChanged(this.ChangedDoseScheduleDetails, this.objfrm.FormViewerDetails.BasicDetails.SelectedDoseDetail);
                    this.UpdateChangeDose();
                    if (String.Equals(this.sActionText, CConstants.SVActionAdd, StringComparison.InvariantCultureIgnoreCase)) {
                        this.AddCondition();
                    }
                    else if (String.Equals(this.sActionText, CConstants.SVActionUpdate, StringComparison.InvariantCultureIgnoreCase) || String.Equals(this.sActionText, CConstants.SVActionFormViewerOk, StringComparison.InvariantCultureIgnoreCase)) {
                        let objgrddata: MultipleDoseDetail = this.objfrm.FormViewerDetails.BasicDetails.SelectedDoseDetail;
                        if (this.ValidateBeforeUpdateCondition()) {
                            this.UpdateCondition(objgrddata, this.IsDaywiseViewEnabled);
                        }
                    }
                    args.AppChildWindow.DialogResult = true;
                }
                this.objfrm.FormViewerDetails.BasicDetails.IsUserUpdatedChangingDose = true;
            }
            else if (args.Result == AppDialogResult.Cancel) {
                if (this._OrginalCanAddAdditionalDose != this.CanAddAdditionalDose && !this._OrginalCanAddAdditionalDose) {
                    this.CanAddAdditionalDose = false;
                    this.objfrm.FormViewerDetails.BasicDetails.IsAdditionalDoseOpted = false;
                    this.IsAdditionalDoseConfirmMsgShown = false;
                }
                this._IsStopDTTMUpdate = false;
                if (!PrescriptionHelper.IsChangingDoseValuesGotChanged(this.ChangedDoseScheduleDetails, this.objfrm.FormViewerDetails.BasicDetails.SelectedDoseDetail)) {
                    this.ChangedDoseScheduleDetails = null;
                }
                args.AppChildWindow.DialogResult = true;
                this.IsChangingDoseMezzaineLaunched = false;
                this.sActionText = String.Empty;
                this.IsValidateForStartFromNextDayMsgShown = false;
            }
        }
    }
    private UpdateChangeDose(): void {
        if (this.ChangedDoseScheduleDetails.IsGridLinkClicked)
            this.ChangedDoseScheduleDetails = null;
        if (this.ChangedDoseScheduleDetails != null && !this.ChangedDoseScheduleDetails.IsReadOnly && this.ChangedDoseScheduleDetails.GrdData != null && this.ChangedDoseScheduleDetails.GrdData.Count > 0) {
            this.ClearChangingDoseFormAndGridData(this.ChangedDoseScheduleDetails.DoseValuesKind);
            if (this.ChangedDoseScheduleDetails != null && this.ChangedDoseScheduleDetails.DoseValuesKind == eDoseValuesKind.DifferentValues) {
                let objgrddata: MultipleDoseDetail = this.objfrm.FormViewerDetails.BasicDetails.SelectedDoseDetail;
                this.ScheduleDetailsColsDetails = new ObservableCollection<ScheduleDetailsCols>(this.ChangedDoseScheduleDetails.GrdData.OrderBy(oItem => oItem.ScheduleDTTM));
                if (!this.ChangedDoseScheduleDetails.IsDaywiseView) {
                    let iCount: number = this.ChangedDoseScheduleDetails.GrdData.Count;
                    for (let nCnt: number = 0; nCnt < iCount; nCnt++) {
                        let iTot: number = this.ChangedDoseScheduleDetails.GrdData[nCnt].ScheduleDoseValue.length;
                        let sSceduleValue: string = this.ChangedDoseScheduleDetails.GrdData[nCnt].ScheduleDoseValue.First();
                        for (let iCnt: number = 1; iCnt < iTot; iCnt++) {
                            this.ChangedDoseScheduleDetails.GrdData[nCnt].ScheduleDoseValue[iCnt] = sSceduleValue;
                        }
                    }
                }
            }
            if (!this.objfrm.FormViewerDetails.BasicDetails.lstAmendedFlds.Contains("Dose"))
                this.objfrm.FormViewerDetails.BasicDetails.lstAmendedFlds.Add("Dose");
        }
    }
    private ResetAdminDaysofWeek(): void {
        if (this.oAdminTimesVM != null) {
            this.oAdminTimesVM.IsSunEnable = this.oAdminTimesVM.IsSun;
            this.oAdminTimesVM.IsMonEnable = this.oAdminTimesVM.IsMon;
            this.oAdminTimesVM.IsTueEnable = this.oAdminTimesVM.IsTue;
            this.oAdminTimesVM.IsWedEnable = this.oAdminTimesVM.IsWed;
            this.oAdminTimesVM.IsThuEnable = this.oAdminTimesVM.IsThu;
            this.oAdminTimesVM.IsFriEnable = this.oAdminTimesVM.IsFri;
            this.oAdminTimesVM.IsSatEnable = this.oAdminTimesVM.IsSat;
        }
    }
    private ValidateChangeDose(): boolean {
        if (this.ChangedDoseScheduleDetails != null && !this.ChangedDoseScheduleDetails.IsReadOnly && this.ChangedDoseScheduleDetails.GrdData != null && this.ChangedDoseScheduleDetails.GrdData.Count > 0) {
            if (this.ChangedDoseScheduleDetails.IsAllDoseValuesSame((o1) => { this.DoseFromChangingDose = o1; }) && this.ChangedDoseScheduleDetails.DoseValuesKind == eDoseValuesKind.AllValuesEmpty) {
                this.ResetAdminDaysofWeek();
                return true;
            }
            else if (this.ChangedDoseScheduleDetails != null && this.ChangedDoseScheduleDetails.DoseValuesKind == eDoseValuesKind.AllValuesSame) {
                this.ResetAdminDaysofWeek();
            }
            let iCount: number = this.ChangedDoseScheduleDetails.GrdData.Count;
            for (let nCnt: number = 0; nCnt < iCount; nCnt++) {
                let iTot: number = this.ChangedDoseScheduleDetails.GrdData[nCnt].ScheduleDoseValue.length;
                if (!this.ChangedDoseScheduleDetails.IsDaywiseView) {
                    let sSceduleValue: string = this.ChangedDoseScheduleDetails.GrdData[nCnt].ScheduleDoseValue.First();
                    if (String.IsNullOrEmpty(sSceduleValue) || sSceduleValue == "0") {
                        this.ShowErrorMsg("Dose value cannot be zero or empty.", MessageBoxType.Information, MessageBoxButton.OK, "txtLowerDose");
                        return false;
                    }
                }
                else {
                    for (let iCnt: number = 0; iCnt < iTot; iCnt++) {
                        if ((String.IsNullOrEmpty(this.ChangedDoseScheduleDetails.GrdData[nCnt].ScheduleDoseValue[iCnt]) || this.ChangedDoseScheduleDetails.GrdData[nCnt].ScheduleDoseValue[iCnt] == "0") && this.ChangedDoseScheduleDetails.GrdData[nCnt].Scheduledoseflag[iCnt] == true) {
                            this.ShowErrorMsg("Dose value cannot be zero or empty.", MessageBoxType.Information, MessageBoxButton.OK, "txtLowerDose");
                            return false;
                        }
                    }
                }
            }
            for (let nCnt: number = 0; nCnt < iCount; nCnt++) {
                let iTot1: number = this.ChangedDoseScheduleDetails.GrdData[nCnt].ScheduleDoseValue.length;
                if (!this.ChangedDoseScheduleDetails.IsDaywiseView) {
                    let sSceduleValue: string = this.ChangedDoseScheduleDetails.GrdData[nCnt].ScheduleDoseValue.First();
                    if (!String.IsNullOrEmpty(sSceduleValue)) {
                        let ddose: number;
                        Number.TryParse(sSceduleValue, (o) => { ddose = o });
                        if (ddose < 1.0 && !this.bDoseSafetymsg) {
                            this.bDoseSafetymsg = true;
                            let imsgBox: iMessageBox = new iMessageBox();
                            imsgBox.MessageButton = MessageBoxButton.YesNo;
                            imsgBox.IconType = MessageBoxType.Information;
                            imsgBox.Title = "Lorenzo - Manage prescription";
                            imsgBox.MessageBoxClose = (s, e) => { this.imsgBox_MessageBox1Close(s, e); };
                            imsgBox.Message = "For safety, avoid entering a dose value of less than 1, change unit of measure if necessary. Do you wish to continue?";
                            imsgBox.Show();
                            return false;
                        }
                    }
                }
                else {
                    for (let iCnt: number = 0; iCnt < iTot1; iCnt++) {
                        if (!String.IsNullOrEmpty(this.ChangedDoseScheduleDetails.GrdData[nCnt].ScheduleDoseValue[iCnt])) {
                            let lowerdose: number;
                            Number.TryParse(this.ChangedDoseScheduleDetails.GrdData[nCnt].ScheduleDoseValue[iCnt], (o) => { lowerdose = o });
                            if (lowerdose < 1.0 && !this.bDoseSafetymsg) {
                                this.bDoseSafetymsg = true;
                                let imsgBox: iMessageBox = new iMessageBox();
                                imsgBox.MessageButton = MessageBoxButton.YesNo;
                                imsgBox.IconType = MessageBoxType.Information;
                                imsgBox.Title = "Lorenzo - Manage prescription";
                                imsgBox.MessageBoxClose = (s, e) => { this.imsgBox_MessageBox1Close(s, e); };
                                imsgBox.Message = "For safety, avoid entering a dose value of less than 1, change unit of measure if necessary. Do you wish to continue?";
                                imsgBox.Show();
                                return false;
                            }
                        }
                    }
                }
            }
        }
        return true;
    }
    private IsAllDosesInChangeDoseRegimeInvalid(): boolean {
        let _IsAllDosesInvalid: boolean = true;
        if (this.ChangedDoseScheduleDetails != null && this.ChangedDoseScheduleDetails.GrdData != null && this.ChangedDoseScheduleDetails.GrdData.Count > 0) {
            let _AdminTimeCount: number = this.ChangedDoseScheduleDetails.GrdData.Count;
            for (let _AdminTimeIndex: number = 0; _AdminTimeIndex < _AdminTimeCount; _AdminTimeIndex++) {
                let _DayCount: number = this.ChangedDoseScheduleDetails.GrdData[_AdminTimeIndex].ScheduleDoseValue.length;
                for (let _DayIndex: number = 0; _DayIndex < _DayCount; _DayIndex++) {
                    if (!String.IsNullOrEmpty(this.ChangedDoseScheduleDetails.GrdData[_AdminTimeIndex].ScheduleDoseValue[_DayIndex])) {
                        _IsAllDosesInvalid = false;
                        break;
                    }
                }
                if (!_IsAllDosesInvalid) {
                    break;
                }
            }
        }
        return _IsAllDosesInvalid;
    }
    imsgBox_MessageBox1Close(sender: Object, e: MessageEventArgs): void {
        if (e.MessageBoxResult == MessageBoxResult.Yes) {
            if (this.objfrm.FormViewerDetails.BasicDetails.SelectedDoseDetail != null)
                this.objfrm.FormViewerDetails.BasicDetails.IsChangingDoseContentModified = PrescriptionHelper.IsChangingDoseValuesGotChanged(this.ChangedDoseScheduleDetails, this.objfrm.FormViewerDetails.BasicDetails.SelectedDoseDetail);
            this.UpdateChangeDose();
            if (String.Equals(this.sActionText, CConstants.SVActionAdd, StringComparison.InvariantCultureIgnoreCase)) {
                this.AddCondition();
            }
            else if (String.Equals(this.sActionText, CConstants.SVActionUpdate, StringComparison.InvariantCultureIgnoreCase) || String.Equals(this.sActionText, CConstants.SVActionFormViewerOk, StringComparison.InvariantCultureIgnoreCase)) {
                let objgrddata: MultipleDoseDetail = this.objfrm.FormViewerDetails.BasicDetails.SelectedDoseDetail;
                if (this.ValidateBeforeUpdateCondition()) {
                    this.UpdateCondition(objgrddata, this.IsDaywiseViewEnabled);
                }
            }
            this.args1.AppChildWindow.DialogResult = true;
        }
    }
    public cboFrequency_SelectionChanged(sender: Object, e: SelectionChangedEventArgs): void {
        let objgrddata: MultipleDoseDetail = null;
        if (this.objfrm != null && this.objfrm.FormViewerDetails.BasicDetails.SelectedDoseDetail != null) {
            objgrddata = this.objfrm.FormViewerDetails.BasicDetails.SelectedDoseDetail;

            //((<Selector>(sender)).SelectedItem)
            if (objgrddata.Frequency != null && (String.Equals(objgrddata.Frequency.DisplayText, (<CListItem>sender['SelectedItem']).DisplayText, StringComparison.InvariantCultureIgnoreCase))) {
                this.IsFreqChanged = false;
            }
            else {
                this.IsFreqChanged = true;
            }
        }
        else {
            this.IsFreqChanged = true;
        }
        if (this.IsFreqChanged) {
            if (objgrddata != null) {
                if (objgrddata.ScheduleDetailsData != null && objgrddata.ScheduleDetailsData.Count > 0)
                    objgrddata.ScheduleDetailsData.Clear();
            }
            this.GetFrequencyDetails();
        }
        else {
            if (objgrddata != null && objgrddata.AdminTimesData != null && objgrddata.AdminTimesData.Count > 0) {
                this.oAdminTimesVM = new AdminstrativeTimesVM();
                if (this.objfrm.FormViewerDetails.BasicDetails.SelectedDoseDetail.FreqDetails != null && this.objfrm.FormViewerDetails.BasicDetails.SelectedDoseDetail.FreqDetails.oFrequency != null) {
                    this.oAdminTimesVM.FrequencyLowEvent = this.objfrm.FormViewerDetails.BasicDetails.SelectedDoseDetail.FreqDetails.oFrequency.LowEvent;
                }
                else if (this.objfrm.FormViewerDetails.BasicDetails.SelectedDoseDetail.AdminTimesData != null) {
                    this.oAdminTimesVM.FrequencyLowEvent = this.objfrm.FormViewerDetails.BasicDetails.SelectedDoseDetail.AdminTimesData[0].FreqLowEvent;
                }
                if (this.oAdminTimesVM.GrdData == null)
                    this.oAdminTimesVM.GrdData = new ObservableCollection<GrdAdminstrativeTimesCols>();
                IPPMABaseVM.CloneObjects(objgrddata.AdminTimesData, this.oAdminTimesVM.GrdData);
                if (objgrddata.FreqDetails != null)
                    this.oAdminTimesVM.FreqDetails = objgrddata.FreqDetails;
                this.grdAdminTimes.DataContext = this.oAdminTimesVM;
                this.grdAdminTimes.SetBinding('data', this.oAdminTimesVM.GrdData);
                if (String.Compare(this.oAdminTimesVM.GrdData[0].FrequencyType, "CC_PERIOD") == 0) {
                    this.IsPeriodFrequency = true;
                    this.grdAdminTimes.Columns[0].IsReadOnly = false;
                    this.iRdBtnFixedTime.IsEnabled = this.oAdminTimesVM.GrdData[0].IsFixedEnabled;
                    this.iRdBtndrgRoundTime.IsEnabled = this.oAdminTimesVM.GrdData[0].IsDrugRoundEnabled;
                    if (this.oAdminTimesVM.GrdData != null && this.oAdminTimesVM.GrdData.Count > 0) {
                        if (!String.IsNullOrEmpty(this.oAdminTimesVM.GrdData[0].DruRoundTimes)) {
                            this.iRdBtnFixedTime.IsEnabled = true;
                            this.iRdBtndrgRoundTime.IsEnabled = true;
                        }
                    }
                    if (!String.IsNullOrEmpty(objgrddata.SlotTimeMode.ToString())) {
                        switch (this.objfrm.FormViewerDetails.BasicDetails.SelectedDoseDetail.SlotTimeMode) {
                            case 'F':
                                this.iRdBtnFixedTime.IsChecked = true;
                                this.EnableDisableAdminTimes('F');
                                this.iRdBtnFixedTime.IsEnabled = true;
                                break;
                            case 'D':
                                this.iRdBtndrgRoundTime.IsChecked = true;
                                this.EnableDisableAdminTimes('D');
                                break;
                        }
                    }
                    if (String.Compare(this.oAdminTimesVM.GrdData[0].FrequencyUOM, "CC_MEDDRSN2", StringComparison.CurrentCultureIgnoreCase) == 0) {
                        this.chkSunday.DataContext = this.chkMonday.DataContext = this.chkTuesday.DataContext = this.chkWednesday.DataContext = this.chkThursday.DataContext = this.chkFriday.DataContext = this.chkSaturday.DataContext = this.oAdminTimesVM;
                        if (objgrddata.DaysOfWeek != null && objgrddata.DaysOfWeek.Count() > 0) {
                            for (let i: number = 0; i < objgrddata.DaysOfWeek.Count(); i++) {
                                switch (objgrddata.DaysOfWeek[i]) {
                                    case "T":
                                        objgrddata.DaysOfWeek[i] = "True";
                                        break;
                                    case "F":
                                        objgrddata.DaysOfWeek[i] = "False";
                                        break;
                                }
                            }
                            this.oAdminTimesVM.IsSun = Convert.ToBoolean(objgrddata.DaysOfWeek[0]);
                            this.oAdminTimesVM.IsMon = Convert.ToBoolean(objgrddata.DaysOfWeek[1]);
                            this.oAdminTimesVM.IsTue = Convert.ToBoolean(objgrddata.DaysOfWeek[2]);
                            this.oAdminTimesVM.IsWed = Convert.ToBoolean(objgrddata.DaysOfWeek[3]);
                            this.oAdminTimesVM.IsThu = Convert.ToBoolean(objgrddata.DaysOfWeek[4]);
                            this.oAdminTimesVM.IsFri = Convert.ToBoolean(objgrddata.DaysOfWeek[5]);
                            this.oAdminTimesVM.IsSat = Convert.ToBoolean(objgrddata.DaysOfWeek[6]);
                            if (objgrddata.HyperlinkText != "Changing dose") {
                                this.oAdminTimesVM.IsSunEnable = Convert.ToBoolean(objgrddata.DaysOfWeek[0]);
                                this.oAdminTimesVM.IsMonEnable = Convert.ToBoolean(objgrddata.DaysOfWeek[1]);
                                this.oAdminTimesVM.IsTueEnable = Convert.ToBoolean(objgrddata.DaysOfWeek[2]);
                                this.oAdminTimesVM.IsWedEnable = Convert.ToBoolean(objgrddata.DaysOfWeek[3]);
                                this.oAdminTimesVM.IsThuEnable = Convert.ToBoolean(objgrddata.DaysOfWeek[4]);
                                this.oAdminTimesVM.IsFriEnable = Convert.ToBoolean(objgrddata.DaysOfWeek[5]);
                                this.oAdminTimesVM.IsSatEnable = Convert.ToBoolean(objgrddata.DaysOfWeek[6]);
                            }
                            else {
                                this.oAdminTimesVM.IsSunEnable = this.oAdminTimesVM.IsMonEnable = this.oAdminTimesVM.IsTueEnable = this.oAdminTimesVM.IsWedEnable = this.oAdminTimesVM.IsThuEnable = this.oAdminTimesVM.IsFriEnable = this.oAdminTimesVM.IsSatEnable = this.oAdminTimesVM.IsSunEnable = false;
                            }
                            if (this.oAdminTimesVM.FreqDetails != null && this.oAdminTimesVM.FreqDetails.oFrequency != null) {
                                this.oAdminTimesVM.FreqDetails.oFrequency.IsSunday = this.oAdminTimesVM.IsSun;
                                this.oAdminTimesVM.FreqDetails.oFrequency.IsMonday = this.oAdminTimesVM.IsMon;
                                this.oAdminTimesVM.FreqDetails.oFrequency.IsTuesday = this.oAdminTimesVM.IsTue;
                                this.oAdminTimesVM.FreqDetails.oFrequency.IsWednesday = this.oAdminTimesVM.IsWed;
                                this.oAdminTimesVM.FreqDetails.oFrequency.IsThursday = this.oAdminTimesVM.IsThu;
                                this.oAdminTimesVM.FreqDetails.oFrequency.IsFriday = this.oAdminTimesVM.IsFri;
                                this.oAdminTimesVM.FreqDetails.oFrequency.IsSaturday = this.oAdminTimesVM.IsSat;
                            }
                        }
                        else if (objgrddata != null && objgrddata.FreqDetails != null && objgrddata.FreqDetails.oFrequency != null) {
                            this.oAdminTimesVM.IsSun = objgrddata.FreqDetails.oFrequency.IsSunday;
                            this.oAdminTimesVM.IsMon = objgrddata.FreqDetails.oFrequency.IsMonday;
                            this.oAdminTimesVM.IsTue = objgrddata.FreqDetails.oFrequency.IsTuesday;
                            this.oAdminTimesVM.IsWed = objgrddata.FreqDetails.oFrequency.IsWednesday;
                            this.oAdminTimesVM.IsThu = objgrddata.FreqDetails.oFrequency.IsThursday;
                            this.oAdminTimesVM.IsFri = objgrddata.FreqDetails.oFrequency.IsFriday;
                            this.oAdminTimesVM.IsSat = objgrddata.FreqDetails.oFrequency.IsSaturday;
                            if (objgrddata.HyperlinkText != "Changing dose") {

                            }
                            else {
                                this.oAdminTimesVM.IsSunEnable = this.oAdminTimesVM.IsMonEnable = this.oAdminTimesVM.IsTueEnable = this.oAdminTimesVM.IsWedEnable = this.oAdminTimesVM.IsThuEnable = this.oAdminTimesVM.IsFriEnable = this.oAdminTimesVM.IsSatEnable = this.oAdminTimesVM.IsSunEnable = false;
                            }
                        }
                    }
                    else {
                        this.InVisibileDayOfWeek();
                    }
                    this.EnableChangingDose();
                }
                else {
                    this.IsPeriodFrequency = false;
                    this.iRdBtndrgRoundTime.IsEnabled = false;
                    this.iRdBtndrgRoundTime.IsChecked = false;
                    this.iRdBtnFixedTime.IsEnabled = true;
                    this.iRdBtnFixedTime.IsChecked = true;
                    this.btnChangingDose.IsEnabled = false;
                }
            }
            else {
                this.GetFrequencyDetails();
            }
        }
        if (e.RemovedItems != null && e.RemovedItems.Count > 0) {
            if (this.objfrm != null && this.objfrm.FormViewerDetails != null && this.objfrm.FormViewerDetails.BasicDetails != null && !this.objfrm.FormViewerDetails.BasicDetails.lstAmendedFlds.Contains("Frequency"))
                this.objfrm.FormViewerDetails.BasicDetails.lstAmendedFlds.Add("Frequency");
        }
    }
    UpdatedEndDTTM(StartDTTM: DateTime): DateTime {
        let EndDTTM: DateTime = DateTime.MinValue;
        if (!String.IsNullOrEmpty(this.cboDuration.GetValue()) && this.udDuration.Value != null && !String.IsNullOrEmpty(this.udDuration.Value.ToString()) && this.udDuration.Value > 0) {
            switch (this.cboDuration.GetValue()) {
                case "CC_MINUTES":
                    EndDTTM = StartDTTM.AddMinutes(this.udDuration.Value);
                    break;
                case "CC_HOURS":
                    EndDTTM = StartDTTM.AddHours(this.udDuration.Value);
                    break;
                case "CC_MEDDRSN1":
                    EndDTTM = StartDTTM.AddDays(this.udDuration.Value);
                    break;
                case "CC_MEDDRSN2":
                    EndDTTM = StartDTTM.AddDays(this.udDuration.Value * 7);
                    break;
                case "CC_MEDRSN3":
                    EndDTTM = StartDTTM.AddMonths(Convert.ToInt32(this.udDuration.Value));
                    break;
                case "CC_MEDRSN4":
                    EndDTTM = StartDTTM.AddYears(Convert.ToInt32(this.udDuration.Value));
                    break;
            }
        }
        return EndDTTM;
    }
    public FrequencyAlert(): void {
        let oMsg: iMessageBox = new iMessageBox();
        oMsg.Title = Resource.prescribedrugs.Title;
        oMsg.Message = Resource.prescribedrugs.FrequencyAlert;
        oMsg.MessageButton = MessageBoxButton.YesNo;
        oMsg.IconType = MessageBoxType.Information;
        oMsg.MessageBoxClose = (s, e) => { this.oMsg_AlertBoxPromtClose(s, e); };
        oMsg.Show();
    }
    public Freqindexvalue: number;
    public FreqAlertFlag: boolean = false;
    public oMsg_AlertBoxPromtClose(sender: Object, e: MessageEventArgs): void {
        if (e.MessageBoxResult == MessageBoxResult.Yes) {
            this.Freqmoredetails();
        }
        else {
            this.cboFrequency.SelectedIndex = -1;
            if (this.FreqAlertFlag) {
                this.cboFrequency.SelectedIndex = this.Freqindexvalue;
            }
        }
    }
    public Freqmoredetails(): void {
        let freqItemList: CListItem = new CListItem();
        freqItemList.DisplayText = CConstants.More;
        freqItemList.Value = "CC_More";
        if (this.objfrm != null && this.objfrm.FormViewerDetails != null && this.objfrm.FormViewerDetails.BasicDetails != null) {
            this.objfrm.FormViewerDetails.BasicDetails.Frequency = freqItemList;
        }
        this.cboFrequency.SelectedValue = null;
        this.ClearAdministrationDetails(true);
    }
    private GetFrequencyDetails(): void {
        if (this.objfrm == null)
            this.objfrm = ObjectHelper.CreateType<PrescriptionItemVM>(this.DataContext, PrescriptionItemVM);
        this.objfrm.FormViewerDetails.IsSteppedDoseDetailsModified = true;
        if (String.Compare(this.cboFrequency.GetValue(), "CC_More", StringComparison.CurrentCultureIgnoreCase) != 0) {
            this.oAdminTimesVM = new AdminstrativeTimesVM(Convert.ToInt64(this.cboFrequency.GetValue()));
            this.oAdminTimesVM.FreqDetailsCompleted = (s, e) => { this.oAdminTimesVM_FreqDetailsCompleted(); };
            this.FreqAlertFlag = true;
            this.Freqindexvalue = this.cboFrequency.SelectedIndex;
        }
        else {
            if (MedicationCommonProfileData.PrescribeConfig.PromptFreqMoreOption && (this.cboFrequency.OptionCount != 1 && String.Equals(this.cboFrequency.GetValue(), CConstants.CONST_MORE))) {
                this.FrequencyAlert();
            }
            else {
                this.Freqmoredetails();
            }
        }
    }
    public oAdminTimesVM_FreqDetailsCompleted(): void {
        if (this.objfrm != null && this.objfrm.FormViewerDetails != null && this.objfrm.FormViewerDetails.BasicDetails != null) {
            let StartDTTM: DateTime = DateTime.MinValue;
            if (DateTime.NotEquals(this.objfrm.FormViewerDetails.BasicDetails.StartDTTM, DateTime.MinValue)) {
                StartDTTM = this.objfrm.FormViewerDetails.BasicDetails.StartDTTM;
            }
            else if (PatientContext.PrescriptionType == PrescriptionTypes.Clerking) {
                StartDTTM = CommonBB.GetServerDateTime().Date;
            }
            if (this.oAdminTimesVM != null && this.oAdminTimesVM.FreqDetails != null && DateTime.NotEquals(StartDTTM, DateTime.MinValue)) {
                let objMultipleDoseDetail: MultipleDoseDetail = (this.grdData.SelectedItems != null && this.grdData.SelectedItems.Count > 0) ? ObjectHelper.CreateType<MultipleDoseDetail>(this.grdData.SelectedItems[0], MultipleDoseDetail) : null;
                if ((this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails == null || this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails.Count == 0) || (objMultipleDoseDetail == this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails[0])) {
                    if (DateTime.NotEquals(this.objfrm.FormViewerDetails.BasicDetails.StartPrescriptionTime, DateTime.MinValue)) {
                        StartDTTM = StartDTTM.DateTime.AddTime(this.objfrm.FormViewerDetails.BasicDetails.StartPrescriptionTime);
                    }
                }
                else {
                    let _SelectedRowIndices: number[] = this.grdData.GetSelectedRowsIndex();
                    if (_SelectedRowIndices != null && _SelectedRowIndices.length > 0) {
                        let _SelectedRowIndex: number = _SelectedRowIndices[0];
                        if (_SelectedRowIndex > 0) {
                            if (DateTime.NotEquals(this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails[_SelectedRowIndex - 1].EndDTTM, DateTime.MinValue))
                                StartDTTM = this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails[_SelectedRowIndex - 1].EndDTTM.AddMinutes(1);
                            else StartDTTM = this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails[_SelectedRowIndex].StartDTTM.AddDays(3).DateTime.AddHours(23).AddMinutes(59).AddSeconds(59);
                        }
                    }
                    else {
                        let nLastIdx: number = this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails.Count - 1;
                        if (DateTime.NotEquals(this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails[nLastIdx].EndDTTM, DateTime.MinValue)) {
                            StartDTTM = this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails[nLastIdx].EndDTTM.AddMinutes(1);
                        }
                    }
                }
                this.oAdminTimesVM.dtStartDate = StartDTTM;
                this.oAdminTimesVM.dtEndDate = this.UpdatedEndDTTM(StartDTTM);
                this.oAdminTimesVM.AdminstrativeTimesCompleted = (s, e) => { this.oVM_AdminstrativeTimesCompleted(); };
                //Revisit Required
                //this.oAdminTimesVM.FillAdministrationTimes();
                this.oAdminTimesVM.FillAdministrationTimes(false, null);
            }
        }
    }
    oVM_AdminstrativeTimesCompleted(): void {
        let bDrugRound: boolean = false;
        if (this.oAdminTimesVM != null) {
            if (String.Compare(this.oAdminTimesVM.sFrequencyUOM, CConstants.OnceOnlyFrequency, StringComparison.CurrentCultureIgnoreCase) == 0) {
                this.udDuration.Value = 1;
                this.cboDuration.SelectedIndex = this.objfrm.FormViewerDetails.BasicDetails.DefaultDetails.DurationStepped.IndexOf(ObjectHelper.CreateType<CListItem>(this.objfrm.FormViewerDetails.BasicDetails.DefaultDetails.DurationStepped.Where(c => c.Value.Contains(ConstDurationUOM.Doses)).FirstOrDefault(), CListItem));
                this.cboDuration.IsEnabled = false;
                this.udDuration.IsEnabled = false;
            }
            else if (this.objfrm.FormViewerDetails.BasicDetails.SelectedDoseDetail == null || this.objfrm.FormViewerDetails.BasicDetails.SelectedDoseDetail.ScheduleDetailsData == null) {
                this.cboDuration.IsEnabled = true;
                this.udDuration.IsEnabled = true;
                if (this.udDuration.Value <= 0.0)
                    this.udDuration.Value = Number.MinValue;
            }
            if (String.Compare(this.oAdminTimesVM.sFrequencyType, "CC_PERIOD", StringComparison.CurrentCultureIgnoreCase) == 0) {
                this.IsPeriodFrequency = true;
                this.iRdBtnFixedTime.IsEnabled = true;
                this.iRdBtndrgRoundTime.IsEnabled = true;
                this.grdAdminTimes.Columns[0].Header = "Scheduled";
                this.grdAdminTimes.Columns[1].Header = "Drug round";
                this.grdAdminTimes.Columns[0].IsReadOnly = false;
                if (String.Compare(this.oAdminTimesVM.sFrequencyUOM, "CC_MEDDRSN2", StringComparison.CurrentCultureIgnoreCase) == 0) {
                    this.VisibileDayOfWeek();
                    this.chkSunday.DataContext = this.chkMonday.DataContext = this.chkTuesday.DataContext = this.chkWednesday.DataContext = this.chkThursday.DataContext = this.chkFriday.DataContext = this.chkSaturday.DataContext = this.oAdminTimesVM;
                }
                else {
                    this.InVisibileDayOfWeek();
                }
                if (this.oAdminTimesVM.GrdData != null && this.oAdminTimesVM.GrdData.Count > 0) {
                    if (!String.IsNullOrEmpty(this.oAdminTimesVM.GrdData[0].DruRoundTimes)) {
                        bDrugRound = true;
                    }
                    if (this.IsDefaultFixedTime) {
                        if (bDrugRound) {
                            this.iRdBtnFixedTime.IsChecked = true;
                            this.iRdBtnFixedTime.IsEnabled = true;
                            this.EnableDisableAdminTimes('F');
                            this.grdAdminTimes.Columns[0].IsReadOnly = false;
                            this.iRdBtndrgRoundTime.IsChecked = false;
                            this.iRdBtndrgRoundTime.IsEnabled = true;
                        }
                        else {
                            this.iRdBtnFixedTime.IsChecked = true;
                            this.iRdBtnFixedTime.IsEnabled = true;
                            this.EnableDisableAdminTimes('F');
                            this.grdAdminTimes.Columns[0].IsReadOnly = false;
                            this.iRdBtndrgRoundTime.IsChecked = false;
                            this.iRdBtndrgRoundTime.IsEnabled = false;
                        }
                    }
                    else {
                        if (bDrugRound) {
                            this.iRdBtnFixedTime.IsChecked = false;
                            this.iRdBtnFixedTime.IsEnabled = true;
                            this.grdAdminTimes.Columns[0].IsReadOnly = true;
                            this.iRdBtndrgRoundTime.IsChecked = true;
                            this.iRdBtndrgRoundTime.IsEnabled = true;
                            this.EnableDisableAdminTimes('D');
                        }
                        else {
                            this.iRdBtnFixedTime.IsChecked = true;
                            this.iRdBtnFixedTime.IsEnabled = true;
                            this.grdAdminTimes.Columns[0].IsReadOnly = false;
                            this.EnableDisableAdminTimes('F');
                            this.iRdBtndrgRoundTime.IsChecked = false;
                            this.iRdBtndrgRoundTime.IsEnabled = false;
                        }
                    }
                }
                else {
                    this.iRdBtnFixedTime.IsChecked = false;
                    this.iRdBtnFixedTime.IsEnabled = false;
                    this.iRdBtndrgRoundTime.IsChecked = false;
                    this.iRdBtndrgRoundTime.IsEnabled = false;
                }
            }
            else {
                this.txtLowerDose.IsEnabled = true;
                this.txtUpperDose.IsEnabled = true;
                this.objfrm.FormViewerDetails.BasicDetails.Isdoseenable = true;
                this.objfrm.FormViewerDetails.BasicDetails.IsAdminTimesGridEnabled = true;
                this.IsPeriodFrequency = false;
                if (this.oAdminTimesVM != null && this.oAdminTimesVM.GrdData != null && this.oAdminTimesVM.GrdData.Count > 0)
                    this.iRdBtnFixedTime.IsEnabled = true;
                this.iRdBtnFixedTime.IsChecked = true;
                this.iRdBtndrgRoundTime.IsEnabled = false;
                this.grdAdminTimes.Columns[0].Header = "Date";
                this.grdAdminTimes.Columns[1].Header = "Time";
                this.grdAdminTimes.Columns[0].IsReadOnly = true;
                this.InVisibileDayOfWeek();
            }
            if (this.cboFrequency.SelectedIndex != -1) {
                this.grdAdminTimes.DataContext = this.oAdminTimesVM;
                this.grdAdminTimes.SetBinding('data', this.oAdminTimesVM.GrdData);
            }
            this.EnableChangingDose();
        }
    }
    private VisibileAdminTimeSlot(): void {
        this.lblSlotTime.Visibility = Visibility.Visible;
        this.iRdBtnFixedTime.Visibility = Visibility.Visible;
        this.iRdBtndrgRoundTime.Visibility = Visibility.Visible;
    }
    private InVisibileAdminTimeSlot(): void {
        this.lblSlotTime.Visibility = Visibility.Collapsed;
        this.iRdBtnFixedTime.Visibility = Visibility.Collapsed;
        this.iRdBtndrgRoundTime.Visibility = Visibility.Collapsed;
        this.iRdBtnFixedTime.IsChecked = false;
        this.iRdBtndrgRoundTime.IsChecked = false;
    }
    private VisibileDayOfWeek(): void {
        this.lblDaysOfWeek.Visibility = Visibility.Visible;
        this.lblDaysOfWeek.Mandatory = true;
        this.chkSunday.Visibility = Visibility.Visible;
        this.chkMonday.Visibility = Visibility.Visible;
        this.chkTuesday.Visibility = Visibility.Visible;
        this.chkWednesday.Visibility = Visibility.Visible;
        this.chkThursday.Visibility = Visibility.Visible;
        this.chkFriday.Visibility = Visibility.Visible;
        this.chkSaturday.Visibility = Visibility.Visible;
    }
    private InVisibileDayOfWeek(): void {
        this.lblDaysOfWeek.Visibility = Visibility.Collapsed;
        this.lblDaysOfWeek.Mandatory = false;
        this.chkSunday.Visibility = Visibility.Collapsed;
        this.chkMonday.Visibility = Visibility.Collapsed;
        this.chkTuesday.Visibility = Visibility.Collapsed;
        this.chkWednesday.Visibility = Visibility.Collapsed;
        this.chkThursday.Visibility = Visibility.Collapsed;
        this.chkFriday.Visibility = Visibility.Collapsed;
        this.chkSaturday.Visibility = Visibility.Collapsed;
    }
    public grdData_onCellClick(sender: Object, args: GridViewCellClickEventArgs): void {
        if (args.TriggerSelectionChange) this.grdData_SelectionChanged({}, {});
        if (this.grdData.GetColumnIndexByName("Dosedet") == args.ColumnIndex && this.CheckAdminTimes()) {
            let objMultipleDoseDetail: MultipleDoseDetail = ObjectHelper.CreateType<MultipleDoseDetail>(this.grdData.GetRowData(args.RowIndex), MultipleDoseDetail);
            if (objMultipleDoseDetail != null && objMultipleDoseDetail.ScheduleDetailsData != null && objMultipleDoseDetail.ScheduleDetailsData.Count > 0) {
                let durationUOM: string = String.Empty;
                if (objMultipleDoseDetail.DurationUOM != null) {
                    durationUOM = objMultipleDoseDetail.DurationUOM.Value;
                }
                let ScheduleDetails: ScheduleDetailsSteppedVM = ObjectHelper.CreateObject(new ScheduleDetailsSteppedVM(), {
                    DurationValue: objMultipleDoseDetail.Duration,
                    DurationUOM: durationUOM,
                    StartDate: objMultipleDoseDetail.StartDTTM,
                    EndDate: objMultipleDoseDetail.EndDTTM,
                    IsDaywiseView: objMultipleDoseDetail.IsDaywiseView,
                    FreqDetails: objMultipleDoseDetail.FreqDetails != null ? objMultipleDoseDetail.FreqDetails : null,
                    AdminTimeGrdData: objMultipleDoseDetail.AdminTimesData,
                    IsReadOnly: true,
                    IsGridLinkClicked: true,
                    PresType: PatientContext.PrescriptionType,
                    IsFixedTime: objMultipleDoseDetail.IsfixedTime,
                    IsClearEnabled: false
                });
                ScheduleDetails.GrdData = new ObservableCollection<ScheduleDetailsCols>();
                for (let i: number = 0; i < objMultipleDoseDetail.ScheduleDetailsData.Count; i++) {
                    ScheduleDetails.GrdData.Add(objMultipleDoseDetail.ScheduleDetailsData[i].GetCloneObject());
                }
                this.oChangingDose = new ChangeDose();
                this.oChangingDose.constructorImpl(ScheduleDetails);
                this.oChangingDose.objChangeDoseFooter = new ChangeDoseFooter();
                this.oChangingDose.objChangeDoseFooter.DataContext = ObjectHelper.CreateType<ScheduleDetailsSteppedVM>(this.oChangingDose.DataContext, ScheduleDetailsSteppedVM);
                if (objMultipleDoseDetail.AdminTimesData == null)
                    this.oAdminTimesVM.AdminstrativeTimesCompleted = (s, e) => { this.oVM_GrdTimesCompleted(); };
                else {
                    let oChangingDoseCallBack = (primary, secondary) => {
                        if (primary != undefined && secondary != undefined) {
                            this.oChangingDose = primary;
                            this.oChangingDose.objChangeDoseFooter = secondary;
                        }
                    };
                    AppActivity.OpenWindow("Changing dose mezzanine", this.oChangingDose, (s, e) => { this.ChangingDoseReadOnlyView_Closed(s); }, "", false, 330, 330, false, WindowButtonType.Ok, this.oChangingDose.objChangeDoseFooter, null, null, oChangingDoseCallBack);
                }
            }
        }
    }
    ChangingDoseReadOnlyView_Closed(args: AppDialogEventargs): void {
        if (args != null && args.AppChildWindow != null) {
            args.AppChildWindow.DialogResult = true;
        }
    }
    private IsChangingDoseMetaDataModified(oDoseDetail: MultipleDoseDetail): boolean {
        let bResult: boolean = false;
        let oDuration: CListItem = ObjectHelper.CreateType<CListItem>(this.cboDuration.SelectedValue, CListItem);
        let oFrequency: CListItem = ObjectHelper.CreateType<CListItem>(this.cboFrequency.SelectedValue, CListItem);
        let _Duration: string = String.Empty;
        let _Frequency: string = String.Empty;
        if (oDuration != null) {
            _Duration = oDuration.Value;
        }
        if (oFrequency != null) {
            _Frequency = oFrequency.Value;
        }
        if (oDoseDetail != null && (oDoseDetail.OperationMode == String.MinValue || this.objfrm.FormViewerDetails.BasicDetails.IsAdminTimesGridEnabled || oDoseDetail.Duration != this.udDuration.Value || (oDoseDetail.DurationUOM != null && this.cboDuration.SelectedValue != null && !String.Equals(oDoseDetail.DurationUOM.Value, _Duration)) || (oDoseDetail.oAdminTimesVM != null && this.cboFrequency.SelectedValue != null && !String.Equals(oDoseDetail.Frequency.Value, _Frequency)))) {
            bResult = true;
        }
        else if (oDoseDetail == null) {
            bResult = true;
        }
        if (!bResult && ObjectHelper.HasValue(this.iRdBtnFixedTime.IsChecked) && this.iRdBtnFixedTime.IsChecked.Value) {
            for (let i: number = 0; i < this.oAdminTimesVM.GrdData.Count; i++) {
                if (oDoseDetail.ScheduleDetailsData != null && i < oDoseDetail.ScheduleDetailsData.Count && !String.Equals(oDoseDetail.ScheduleDetailsData[i].ScheduleTime, this.oAdminTimesVM.GrdData[i].FixedTimes)) {
                    bResult = true;
                    break;
                }
            }
        }
        return bResult;
    }
    oVM_GrdTimesCompleted(): void {
        if (!this.CheckAdminTimes())
            return;
        let oChangingDoseCallBack = (primary, secondary) => {
            if (primary != undefined && secondary != undefined) {
                this.oChangingDose = primary;
                this.oChangingDose.objChangeDoseFooter = secondary;
            }
        };
        AppActivity.OpenWindow("Changing dose mezzanine", this.oChangingDose, (s, e) => { this.oChangingDose_Closed(s); }, "", false, 330, 248, false, WindowButtonType.Ok, this.oChangingDose.objChangeDoseFooter, null, null, oChangingDoseCallBack);
    }
    public cboUOM_SelectionChanged(sender: Object, e: SelectionChangedEventArgs): void {
        if (e != null) {
            if (this.objfrm != null)
                this.objfrm.FormViewerDetails.IsSteppedDoseDetailsModified = true;
            else this.bIsStepped = true;
            if (e.AddedItems.Count > 0) {
                let newItem: CListItem = ObjectHelper.CreateType<CListItem>(e.AddedItems[0], CListItem);
                if (newItem != null && newItem.Value == "CC_More") {
                    this.strDoseUOM = CConstants.More;
                }
                else {
                    this.strDoseUOM = newItem.DisplayText;
                }
                if (!String.IsNullOrEmpty(this.strDoseUOM) && String.Compare(this.strDoseUOM, "More", StringComparison.InvariantCultureIgnoreCase) == 0) {
                    if (this.objfrm != null) {
                        this.strDoseUOM = '';
                        this.objfrm.MoreOptionCode = CConstants.DoseUOMOptionCode;
                        this.objfrm.GetMoreComboOption();
                    }
                }
                this.EnableChangingDose();
            }
            if (e.RemovedItems.Count > 0) {
                if (this.objfrm != null && this.objfrm.FormViewerDetails != null && this.objfrm.FormViewerDetails.BasicDetails != null && !this.objfrm.FormViewerDetails.BasicDetails.lstAmendedFlds.Contains("DoseUOM"))
                    this.objfrm.FormViewerDetails.BasicDetails.lstAmendedFlds.Add("DoseUOM");
            }
        }
    }
    public cboInfRateNumUOM_SelectionChanged(sender: Object, e: SelectionChangedEventArgs): void {
        if (e.AddedItems.Count > 0) {
            if (this.txtInfusionRate != null && !String.IsNullOrEmpty(this.txtInfusionRate.Text) && this.objfrm != null && this.objfrm.FormViewerDetails != null && this.objfrm.FormViewerDetails.BasicDetails != null && this.cboInfRateDenoUOM != null && this.cboInfRateDenoUOM.SelectedValue != null) {
                this.objfrm.FormViewerDetails.BasicDetails.IsenableInfusionPeriod = false;
                if (this.objfrm.FormViewerDetails.BasicDetails.InfusionDetails != null) {
                    if (!String.IsNullOrEmpty(this.objfrm.FormViewerDetails.BasicDetails.InfusionDetails.InfusionPeriod)) {
                        this.objfrm.FormViewerDetails.BasicDetails.InfusionDetails.InfusionPeriod = String.Empty;
                    }
                    if (this.objfrm.FormViewerDetails.BasicDetails.InfusionDetails.InfusionPeriodUom != null) {
                        this.objfrm.FormViewerDetails.BasicDetails.InfusionDetails.InfusionPeriodUom = null;
                    }
                }
            }
        }
        else if (e.AddedItems.Count == 0) {
            this.objfrm.FormViewerDetails.BasicDetails.IsenableInfusionPeriod = true;
        }
    }
    public cboInfRateDenoUOM_SelectionChanged(sender: Object, e: SelectionChangedEventArgs): void {
        if (e.AddedItems.Count > 0) {
            if (this.txtInfusionRate != null && !String.IsNullOrEmpty(this.txtInfusionRate.Text) && this.objfrm != null && this.objfrm.FormViewerDetails != null && this.objfrm.FormViewerDetails.BasicDetails != null && this.cboInfRateNumUOM != null && this.cboInfRateNumUOM.SelectedValue != null) {
                this.objfrm.FormViewerDetails.BasicDetails.IsenableInfusionPeriod = false;
                if (this.objfrm.FormViewerDetails.BasicDetails.InfusionDetails != null) {
                    if (!String.IsNullOrEmpty(this.objfrm.FormViewerDetails.BasicDetails.InfusionDetails.InfusionPeriod)) {
                        this.objfrm.FormViewerDetails.BasicDetails.InfusionDetails.InfusionPeriod = String.Empty;
                    }
                    if (this.objfrm.FormViewerDetails.BasicDetails.InfusionDetails.InfusionPeriodUom != null) {
                        this.objfrm.FormViewerDetails.BasicDetails.InfusionDetails.InfusionPeriodUom = null;
                    }
                }
            }
        }
        else if (e.AddedItems.Count == 0) {
            this.objfrm.FormViewerDetails.BasicDetails.IsenableInfusionPeriod = true;
        }
    }
    public txtLowerDose_TextChanged(sender: Object, e: TextChangedEventArgs): void {
        this.EnableChangingDose();
    }
    public txtUpperDose_TextChanged(sender: Object, e: TextChangedEventArgs): void {
        this.EnableChangingDose();
    }
    private EnableChangingDose(typedText?): void {
        if (this.objfrm != null && this.objfrm.FormViewerDetails != null && this.objfrm.FormViewerDetails.BasicDetails != null && this.objfrm.FormViewerDetails.BasicDetails.IsSteppedVariableFormEnabled) {
            if ((this.objfrm != null && this.objfrm.FormViewerDetails != null && this.objfrm.FormViewerDetails.BasicDetails != null
                && this.objfrm.FormViewerDetails.BasicDetails.SelectedDoseDetail != null
                && this.objfrm.FormViewerDetails.BasicDetails.SelectedDoseDetail.ScheduleDetailsData != null
                && this.objfrm.FormViewerDetails.BasicDetails.SelectedDoseDetail.ScheduleDetailsData.Count > 0) ||
                (!String.IsNullOrEmpty(this.txtLowerDose.Text) && !String.IsNullOrEmpty(this.strDoseUOM) && this.IsPeriodFrequency) ||
                (this.ScheduleDetailsColsDetails != null && this.ScheduleDetailsColsDetails.Count > 0)) {
                this.btnChangingDose.IsEnabled = true;
            }
            else {
                if (!String.IsNullOrEmpty(this.txtLowerDose.Text) && !String.IsNullOrEmpty(typedText) && this.IsPeriodFrequency) {
                    this.btnChangingDose.IsEnabled = true;
                } else {
                    this.btnChangingDose.IsEnabled = false;
                }
            }
        }
    }

    public cboUOM_SelectionChangedExtended(sender: Object, e: SelectionChangedEventArgs): void {
        this.EnableChangingDose(e.typedText);
    }
    private ClearChangingDoseFormAndGridData(DoseValuesKind: eDoseValuesKind): void {
        if (DoseValuesKind == eDoseValuesKind.AllValuesEmpty || DoseValuesKind == eDoseValuesKind.AllValuesSame) {
            this.txtLowerDose.IsEnabled = true;
            this.txtUpperDose.IsEnabled = true;
            if (this.objfrm != null && this.objfrm.FormViewerDetails != null && this.objfrm.FormViewerDetails.BasicDetails != null) {
                if (this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails != null && this.objfrm.FormViewerDetails.BasicDetails.MultiDoseDetails.Count > 0 && !this.objfrm.FormViewerDetails.BasicDetails.IsDifferentDoseUOMFrmSourceForSV && this.objfrm.FormViewerDetails.BasicDetails.IsNotInPatientSteppedVariableAmend) {
                    let _SelectedIdx: number[] = this.grdData.GetSelectedRowsIndex();
                    if (_SelectedIdx != null && _SelectedIdx.Count() > 0 && _SelectedIdx[0] == 0) {
                        this.cboUOM.IsEnabled = true;
                    }
                    else {
                        this.cboUOM.IsEnabled = false;
                    }
                }
                else {
                    this.cboUOM.IsEnabled = this.objfrm.FormViewerDetails.BasicDetails.IsSteppedVariableFormEnabled;
                }
            }
            this.objfrm.FormViewerDetails.BasicDetails.Isdoseenable = true;
            this.cboFrequency.IsEnabled = true;
            if (this.cboFrequency.SelectedItem != null) {
                let SelFreq: CListItem = new CListItem();
                SelFreq = (ObjectHelper.CreateType<CListItem>(this.cboFrequency.SelectedItem, CListItem));
                if (SelFreq != null && SelFreq.Tag != null && SelFreq.Tag instanceof (Array<string> as typeof Array<string>)) {
                    let FreqTag: string[] = ObjectHelper.CreateType<string[]>(SelFreq.Tag, Array<string>);
                    if (FreqTag != null && FreqTag.length > 0) {
                        let oncefreq = FreqTag.Where(oitem => String.Equals(oitem, CConstants.OnceOnlyFrequency, StringComparison.InvariantCultureIgnoreCase));
                        if (oncefreq != null && oncefreq.Count() > 0) {
                            this.udDuration.IsEnabled = false;
                            this.cboDuration.IsEnabled = false;
                        }
                        else {
                            this.udDuration.IsEnabled = true;
                            this.cboDuration.IsEnabled = true;
                        }
                    }
                }
            }
            this.objfrm.FormViewerDetails.BasicDetails.IsAdminTimesGridEnabled = true;
            this.lblDaysOfWeek.Mandatory = true;
            if (DoseValuesKind == eDoseValuesKind.AllValuesEmpty) {
                this.txtLowerDose.Text = String.Empty;
                this.txtUpperDose.Text = String.Empty;
                this.btnChangingDose.IsEnabled = false;
                this.sActionText = String.Empty;
                this.IsChangingDoseMezzaineLaunched = false;
            }
            else if (!String.IsNullOrEmpty(this.DoseFromChangingDose)) {
                if (!String.IsNullOrEmpty(this.txtUpperDose.Text) && !String.IsNullOrEmpty(this.txtLowerDose.Text)) {
                    if (Convert.ToDouble(this.txtLowerDose.Text) != Convert.ToDouble(this.DoseFromChangingDose)) {
                        this.txtUpperDose.Text = String.Empty;
                    }
                }
                this.txtLowerDose.Text = this.DoseFromChangingDose;
            }
            if (this.ScheduleDetailsColsDetails != null && this.ScheduleDetailsColsDetails.Count > 0) {
                this.ScheduleDetailsColsDetails.Clear();
            }
            this.ChangedDoseScheduleDetails = null;
            this.IsChangingDose = false;
            this.IsDaywise = false;
        }
        else {
            this.txtLowerDose.IsEnabled = false;
            this.txtUpperDose.IsEnabled = false;
            this.cboFrequency.IsEnabled = false;
            this.objfrm.FormViewerDetails.BasicDetails.Isdoseenable = false;
            this.cboUOM.IsEnabled = false;
            this.udDuration.IsEnabled = false;
            this.cboDuration.IsEnabled = false;
            this.objfrm.FormViewerDetails.BasicDetails.IsAdminTimesGridEnabled = false;
            this.lblDaysOfWeek.Mandatory = false;
            if (this.oAdminTimesVM != null)
                this.oAdminTimesVM.IsSunEnable = this.oAdminTimesVM.IsMonEnable = this.oAdminTimesVM.IsTueEnable = this.oAdminTimesVM.IsWedEnable = this.oAdminTimesVM.IsThuEnable = this.oAdminTimesVM.IsFriEnable = this.oAdminTimesVM.IsSatEnable = this.oAdminTimesVM.IsSunEnable = false;
        }
    }
    public iRdBtnFixedTime_Click(sender: Object, e: RoutedEventArgs): void {
        this.EnableDisableAdminTimes('F');
        this.grdAdminTimes.Columns[0].IsReadOnly = false;
    }
    public iRdBtndrgRoundTime_Click(sender: Object, e: RoutedEventArgs): void {
        this.EnableDisableAdminTimes('D');
        this.grdAdminTimes.Columns[0].IsReadOnly = true;
    }
    private EnableDisableAdminTimes(AdminType: string): void {
        if (this.oAdminTimesVM != null && this.oAdminTimesVM.GrdData.Count > 0) {
            for (let i: number = 0; i < this.oAdminTimesVM.GrdData.Count; i++) {
                if (AdminType == 'F') {
                    this.oAdminTimesVM.GrdData[i].IsFixedMandatory = true;
                    this.oAdminTimesVM.GrdData[i].IsDrugRoundEnabled = false;
                }
                else {
                    this.oAdminTimesVM.GrdData[i].IsFixedMandatory = false;
                    this.oAdminTimesVM.GrdData[i].IsDrugRoundEnabled = true;
                }
                if (AdminType == 'D') {
                    this.oAdminTimesVM.GrdData[i].IsDrugRoundMandatory = true;
                    this.oAdminTimesVM.GrdData[i].IsFixedEnabled = false;
                }
                else {
                    this.oAdminTimesVM.GrdData[i].IsDrugRoundMandatory = false;
                    this.oAdminTimesVM.GrdData[i].IsFixedEnabled = true;
                }
            }
        }
    }
    public btnFullPresView_MouseEnter(sender: Object, e: MouseEventArgs): void {
        this.btnFullPresView.TextDecorations = TextDecorations.Underline;
    }
    public btnFullPresView_MouseLeave(sender: Object, e: MouseEventArgs): void {
        this.btnFullPresView.TextDecorations = TextDecorations.None;
    }
    public btnChangingDose_IsEnabledChanged(sender: Object, e: DependencyPropertyChangedEventArgs): void {
        if (<boolean>e.NewValue) {
            this.btnChangingDose.Foreground = new SolidColorBrush(Colors.Blue);
        }
        else {
            this.btnChangingDose.Foreground = new SolidColorBrush(Colors.Black);
        }
    }
    public btnChangingDose_MouseEnter(sender: Object, e: MouseEventArgs): void {
        this.btnChangingDose.TextDecorations = TextDecorations.Underline;
    }
    public btnChangingDose_MouseLeave(sender: Object, e: MouseEventArgs): void {
        this.btnChangingDose.TextDecorations = null;
    }
    public udDuration_KeyDown(sender: Object, e: KeyEventArgs): void {
        this.objfrm.FormViewerDetails.IsSteppedDoseDetailsModified = true;
        if (this.objfrm != null && this.objfrm.FormViewerDetails != null && this.objfrm.FormViewerDetails.BasicDetails != null && !this.objfrm.FormViewerDetails.BasicDetails.IsClerkingStartDTTMBlank && !this.objfrm.FormViewerDetails.BasicDetails.lstAmendedFlds.Contains("SDuration"))
            this.objfrm.FormViewerDetails.BasicDetails.lstAmendedFlds.Add("SDuration");
    }
    private cboDuration_KeyDown(sender: Object, e: KeyEventArgs): void {
        this.objfrm.FormViewerDetails.IsSteppedDoseDetailsModified = true;
        if (this.objfrm != null && this.objfrm.FormViewerDetails != null && this.objfrm.FormViewerDetails.BasicDetails != null && !this.objfrm.FormViewerDetails.BasicDetails.IsClerkingStartDTTMBlank && !this.objfrm.FormViewerDetails.BasicDetails.lstAmendedFlds.Contains("SDurationUOM"))
            this.objfrm.FormViewerDetails.BasicDetails.lstAmendedFlds.Add("SDurationUOM");
    }
    private HandlMoveUpDownEnabling(): void {
        let nRowCount: number = this.grdData.GetRowCount();
        let nCurrRowIdx: number = this.grdData.GetCurrentRowIndex();
        let nSelectedRow: number = 0;
        if (this.grdData.GetSelectedRows() != null)
            nSelectedRow = this.grdData.GetSelectedRows().Count;
        this.cmdAdd.IsEnabled = false;
        if (nSelectedRow == 1)
            this.cmdUpdate.IsEnabled = true;
        else this.cmdUpdate.IsEnabled = false;
        if (nSelectedRow > 0)
            this.cmdRemove.IsEnabled = true;
    }
    private cmdMoueUp_Click(sender: Object, e: RoutedEventArgs): void {
        this.IsRowSelectionThrUpDownBut = true;
        this.grdData.MoveRowUp();
        if (this.objfrm != null && this.objfrm.FormViewerDetails != null && this.objfrm.FormViewerDetails.BasicDetails != null) {
            this.objfrm.FormViewerDetails.BasicDetails.UpdateStartEndDateForInPatSteppedDose(false, false, false);
        }
        this.objfrm.FormViewerDetails.BasicDetails.IsenableRSNFORMOD = true;
        this.objfrm.FormViewerDetails.BasicDetails.IsenableModificationcomments = true;
        this.objfrm.FormViewerDetails.BasicDetails.IsMandatoryRSNFORMOD = true;
        this.HandlMoveUpDownEnabling();
        this.IsRowSelectionThrUpDownBut = false;
    }
    private cmdMoveDown_Click(sender: Object, e: RoutedEventArgs): void {
        this.IsRowSelectionThrUpDownBut = true;
        this.grdData.MoveRowDown();
        if (this.objfrm != null && this.objfrm.FormViewerDetails != null && this.objfrm.FormViewerDetails.BasicDetails != null) {
            this.objfrm.FormViewerDetails.BasicDetails.UpdateStartEndDateForInPatSteppedDose(false, false, false);
        }
        this.objfrm.FormViewerDetails.BasicDetails.IsenableRSNFORMOD = true;
        this.objfrm.FormViewerDetails.BasicDetails.IsenableModificationcomments = true;
        this.objfrm.FormViewerDetails.BasicDetails.IsMandatoryRSNFORMOD = true;
        this.HandlMoveUpDownEnabling();
        this.IsRowSelectionThrUpDownBut = false;
    }
    private cboFrequency_KeyUp(sender: Object, e: KeyEventArgs): void {
        //Revisit Required
        //if (String.IsNullOrEmpty((<RadComboBox>(sender)).Text)) {
        let freqtext = null;
        if ((<iComboBox>(sender)).SelectedItem) {
            freqtext = (<iComboBox>(sender)).SelectedItem.DisplayText;
        }
        if (String.IsNullOrEmpty(freqtext)) {
            this.IsPeriodFrequency = false;
            this.EnableChangingDose();
            this.ClearAdministrationDetails();
            if (this.objfrm.FormViewerDetails.BasicDetails.SelectedDoseDetail != null && DateTime.NotEquals(this.objfrm.FormViewerDetails.BasicDetails.SelectedDoseDetail.DueDTTM, DateTime.MinValue)) {
                this.objfrm.FormViewerDetails.BasicDetails.RecordAdminMsg1 = String.Empty;
            }
        }
        if (this.objfrm != null && this.objfrm.FormViewerDetails != null && this.objfrm.FormViewerDetails.BasicDetails != null && !this.objfrm.FormViewerDetails.BasicDetails.lstAmendedFlds.Contains("Frequency"))
            this.objfrm.FormViewerDetails.BasicDetails.lstAmendedFlds.Add("Frequency");
    }
    public cboUOM_KeyUp(sender: Object, e: KeyEventArgs): void {
        //Revisit Required
        //if (String.IsNullOrEmpty((<RadComboBox>(sender)).Text)) {
        if (String.IsNullOrEmpty((<iComboBox>(sender)).Text)) {
            this.strDoseUOM = String.Empty;
            this.EnableChangingDose();
        }
        if (this.objfrm != null && this.objfrm.FormViewerDetails != null && this.objfrm.FormViewerDetails.BasicDetails != null && !this.objfrm.FormViewerDetails.BasicDetails.lstAmendedFlds.Contains("DoseUOM"))
            this.objfrm.FormViewerDetails.BasicDetails.lstAmendedFlds.Add("DoseUOM");
    }
    public udDuration_ValueChanged(sender: Object, e: RoutedPropertyChangedEventArgs<number>): void {
        if (!String.IsNullOrEmpty(this.cboFrequency.GetValue()) && String.Compare(this.cboFrequency.GetValue(), "CC_More", StringComparison.CurrentCultureIgnoreCase) != 0 && this.udDuration.Value > 0 && !String.IsNullOrEmpty(this.cboDuration.GetValue())) {
            if (this.oAdminTimesVM != null && this.oAdminTimesVM.FreqDetails != null && this.oAdminTimesVM.FreqDetails.oFrequency != null && !String.IsNullOrEmpty(this.oAdminTimesVM.FreqDetails.oFrequency.Type) && String.Compare(this.oAdminTimesVM.FreqDetails.oFrequency.Type, "CC_INTERVAL") == 0)
                this.oAdminTimesVM_FreqDetailsCompleted();
        }
        if (this.objfrm != null && this.objfrm.FormViewerDetails != null && this.objfrm.FormViewerDetails.BasicDetails != null && !this.objfrm.FormViewerDetails.BasicDetails.IsClerkingStartDTTMBlank && !this.objfrm.FormViewerDetails.BasicDetails.lstAmendedFlds.Contains("SDuration"))
            this.objfrm.FormViewerDetails.BasicDetails.lstAmendedFlds.Add("SDuration");
    }
    public cboDuration_SelectionChanged(sender: Object, e: SelectionChangedEventArgs): void {
        if (!String.IsNullOrEmpty(this.cboFrequency.GetValue()) && String.Compare(this.cboFrequency.GetValue(), "CC_More", StringComparison.CurrentCultureIgnoreCase) != 0 && this.udDuration.Value > 0 && !String.IsNullOrEmpty(this.cboDuration.GetValue())) {
            if (this.oAdminTimesVM != null && this.oAdminTimesVM.FreqDetails != null && this.oAdminTimesVM.FreqDetails.oFrequency != null && !String.IsNullOrEmpty(this.oAdminTimesVM.FreqDetails.oFrequency.Type) && String.Compare(this.oAdminTimesVM.FreqDetails.oFrequency.Type, "CC_INTERVAL") == 0)
                this.oAdminTimesVM_FreqDetailsCompleted();
        }
        if (this.objfrm != null && this.objfrm.FormViewerDetails != null && this.objfrm.FormViewerDetails.BasicDetails != null && !this.objfrm.FormViewerDetails.BasicDetails.IsClerkingStartDTTMBlank && !this.objfrm.FormViewerDetails.BasicDetails.lstAmendedFlds.Contains("SDurationUOM"))
            this.objfrm.FormViewerDetails.BasicDetails.lstAmendedFlds.Add("SDurationUOM");
    }
    ClearAdministrationDetails(isMoreOptionClicked: boolean = false): void {
        if (this.oAdminTimesVM != null) {
            this.oAdminTimesVM.FreqDetails = null;
            this.oAdminTimesVM.Clear();
            if (this.oAdminTimesVM != null)
                this.oAdminTimesVM.IsSunEnable = this.oAdminTimesVM.IsMonEnable = this.oAdminTimesVM.IsTueEnable = this.oAdminTimesVM.IsWedEnable = this.oAdminTimesVM.IsThuEnable = this.oAdminTimesVM.IsFriEnable = this.oAdminTimesVM.IsSatEnable = this.oAdminTimesVM.IsSunEnable = true;
        }
        if (isMoreOptionClicked) {
            this.iRdBtndrgRoundTime.IsChecked = this.iRdBtndrgRoundTime.IsEnabled = false;
            this.iRdBtnFixedTime.IsChecked = true;
            this.iRdBtnFixedTime.IsEnabled = false;
        }
        else {
            this.iRdBtndrgRoundTime.IsChecked = this.iRdBtndrgRoundTime.IsEnabled = false;
            this.iRdBtnFixedTime.IsChecked = this.iRdBtnFixedTime.IsEnabled = false;
        }
        this.InVisibileDayOfWeek();
    }
    sDupliTimeDet: string = String.Empty;
    public iTimeScheduled_LostFocus_Func = (s, e) => { this.iTimeScheduled_LostFocus(s, e); };
    public iTimeScheduled_LostFocus(sender: Object, e: RoutedEventArgs): void {
        if (this.oAdminTimesVM != null) {
            if (String.IsNullOrEmpty(this.sDupliTimeDet)) {
                this.sDupliTimeDet = String.Compare(this.oAdminTimesVM.GrdData[0].FrequencyType, "CC_PERIOD", StringComparison.CurrentCultureIgnoreCase) != 0 ? String.Empty : this.oAdminTimesVM.duplicatecheck();
                if (!String.IsNullOrEmpty(this.sDupliTimeDet)) {
                    this.bDuplicateAdminTimesPrompt = true;
                    this.sDupliTimeDet = this.sDupliTimeDet.ToString().Substring(0, this.sDupliTimeDet.length - 1);
                    let objMsg: iMessageBox = new iMessageBox();
                    objMsg.MessageButton = MessageBoxButton.OK;
                    objMsg.Message = "Time" + " " + this.sDupliTimeDet + " " + "has already been selected as an administration time. Duplicate administration times cannot be added";
                    objMsg.Closed = (s, e) => { this.objMsg_Closed(s, e); };
                    objMsg.Show();
                }
            }
        }
    }
    private InfIntermitValidation(): boolean {
        let IsInfusionItem: boolean = false;
        let IsMultiInfusionRoutes: boolean = false;
        if (PatientContext.ClerkFormViewDefaultBehavior == ClerkFormViewDeftBehaviour.LaunchFormMandatory) {
            return true;
        }
        if (this.objfrm.FormViewerDetails.BasicDetails.IsAllowMultiRoute && this.objfrm.FormViewerDetails.BasicDetails.DefaultDetails.Routes != null && this.objfrm.FormViewerDetails.BasicDetails.DefaultDetails.Routes != null) {
            if (this.objfrm.FormViewerDetails.BasicDetails.Route != null)
                IsMultiInfusionRoutes = !Common.IsNonInfusionMultiRoutes(this.objfrm.FormViewerDetails.BasicDetails.DefaultDetails.Routes);
        }
        if ((this.objfrm.FormViewerDetails.BasicDetails.Route != null && this.objfrm.FormViewerDetails.BasicDetails.Route.Tag != null && String.Compare(this.objfrm.FormViewerDetails.BasicDetails.Route.Tag.ToString(), "1") != 0) || !IsMultiInfusionRoutes || this.objfrm.FormViewerDetails.BasicDetails.Infusions) {
            IsInfusionItem = true;
        }
        if (IsInfusionItem && this.objfrm.FormViewerDetails.BasicDetails != null && this.objfrm.FormViewerDetails.BasicDetails.InfusionType != null && String.Compare(this.objfrm.FormViewerDetails.BasicDetails.InfusionType.Value, InfusionTypesCode.INTERMITTENT, StringComparison.OrdinalIgnoreCase) == 0) {
            if (this.oAdminTimesVM != null && this.oAdminTimesVM.FreqDetails != null && this.oAdminTimesVM.FreqDetails.oFrequency != null && !String.IsNullOrEmpty(this.oAdminTimesVM.FreqDetails.oFrequency.UOM) && this.oAdminTimesVM.FreqDetails.oFrequency.LowEvent < 2 && String.Compare(this.oAdminTimesVM.FreqDetails.oFrequency.UOM, "CC_MINUTES", StringComparison.CurrentCultureIgnoreCase) == 0) {
                this.ShowErrorMsg(Resource.Infusion.cbofrequency_Msg, MessageBoxType.Information, MessageBoxButton.OK, "cboFrequency");
                return false;
            }
            let sSlotTimeMode: string = String.Empty;
            let errorMsgFound: boolean = false;
            {
                if (this.oAdminTimesVM != null && this.oAdminTimesVM.GrdData != null && this.oAdminTimesVM.GrdData.Count > 0) {
                    let nCount: number = this.oAdminTimesVM.GrdData.Count;
                    let CurrDateTime: DateTime = CommonBB.GetServerDateTime().Date;
                    let dtprevScheduleDTTM: DateTime = DateTime.MinValue;
                    let dtlatestSchedulDTTM: DateTime = DateTime.MinValue;
                    if (this.oAdminTimesVM.GrdData != null && this.oAdminTimesVM.GrdData.Count > 0) {
                        if (this.oAdminTimesVM.GrdData != null) {
                            let SlotMode = this.oAdminTimesVM.GrdData.Where(OItem => OItem.IsFixedEnabled);
                            if (SlotMode != null && SlotMode.Count() > 0) {
                                sSlotTimeMode = "F";
                            }
                            else {
                                sSlotTimeMode = "D";
                            }
                        }
                        if (nCount > 1 && sSlotTimeMode == "F") {
                            for (let i: number = 0; i < nCount; i++) {
                                if (!String.IsNullOrEmpty(this.oAdminTimesVM.GrdData[i].FixedTimes) && this.oAdminTimesVM.GrdData[i].FixedTimes.Contains(':')) {
                                    let strHHMM: string[] = this.oAdminTimesVM.GrdData[i].FixedTimes.Split(':');
                                    if (strHHMM != null && strHHMM.length > 1) {
                                        dtprevScheduleDTTM = CurrDateTime.AddHours(Convert.ToDouble(strHHMM[0])).AddMinutes(Convert.ToDouble(strHHMM[1]));
                                    }
                                    let ts: TimeSpan = new TimeSpan(dtprevScheduleDTTM.Hour, dtprevScheduleDTTM.Minute, dtprevScheduleDTTM.Second);
                                    if (DateTime.NotEquals(dtlatestSchedulDTTM, DateTime.MinValue) && DateTime.NotEquals(dtprevScheduleDTTM, dtlatestSchedulDTTM)) {
                                        errorMsgFound = this.IsWrongAdminTime(dtprevScheduleDTTM, dtlatestSchedulDTTM);
                                        if (errorMsgFound)
                                            break;
                                    }
                                    dtlatestSchedulDTTM = dtprevScheduleDTTM;
                                }
                            }
                        }
                        else if (nCount > 1 && sSlotTimeMode == "D") {
                            for (let i: number = 0; i < nCount; i++) {
                                if (!String.IsNullOrEmpty(this.oAdminTimesVM.GrdData[i].DruRoundTimes) && this.oAdminTimesVM.GrdData[i].DruRoundTimes.Contains(':')) {
                                    let strHHMM: string[] = this.oAdminTimesVM.GrdData[i].DruRoundTimes.Split(':');
                                    if (strHHMM != null && strHHMM.length > 1) {
                                        dtprevScheduleDTTM = CurrDateTime.AddHours(Convert.ToDouble(strHHMM[0])).AddMinutes(Convert.ToDouble(strHHMM[1]));
                                    }
                                    let ts: TimeSpan = new TimeSpan(dtprevScheduleDTTM.Hour, dtprevScheduleDTTM.Minute, dtprevScheduleDTTM.Second);
                                    if (DateTime.NotEquals(dtlatestSchedulDTTM, DateTime.MinValue) && DateTime.NotEquals(dtprevScheduleDTTM, dtlatestSchedulDTTM)) {
                                        errorMsgFound = this.IsWrongAdminTime(dtprevScheduleDTTM, dtlatestSchedulDTTM);
                                        if (errorMsgFound)
                                            break;
                                    }
                                    dtlatestSchedulDTTM = dtprevScheduleDTTM;
                                }
                            }
                        }
                    }
                }
                if (errorMsgFound) {
                    if (sSlotTimeMode == "D" || sSlotTimeMode == "F") {
                        this.ShowErrorMsg(Resource.Infusion.grdAdminTimes_Msg, MessageBoxType.Information, MessageBoxButton.OK, "iTimeScheduled");
                        return false;
                    }
                }
            }
            if (this.objfrm.FormViewerDetails.BasicDetails.InfusionDetails != null && !String.IsNullOrEmpty(this.objfrm.FormViewerDetails.BasicDetails.InfusionDetails.InfusionPeriod) && this.objfrm.FormViewerDetails.BasicDetails.InfusionDetails.InfusionPeriodUom != null && !String.IsNullOrEmpty(this.objfrm.FormViewerDetails.BasicDetails.InfusionDetails.InfusionPeriodUom.Value)) {
                let Infperdmin: number = this.objfrm.Infusionperiodmin(this.objfrm.FormViewerDetails);
                if (this.oAdminTimesVM.GrdData != null && this.oAdminTimesVM.GrdData.Count > 0) {
                    let nCount: number = this.oAdminTimesVM.GrdData.Count;
                    let stDTTM: DateTime = DateTime.MinValue;
                    let endDTTM: DateTime = DateTime.MinValue;
                    let CurrDateTime: DateTime = CommonBB.GetServerDateTime().Date;
                    let tsIntervalmin: TimeSpan = new TimeSpan();
                    if (this.oAdminTimesVM.GrdData != null) {
                        let SlotMode = this.oAdminTimesVM.GrdData.Where(OItem => OItem.IsFixedEnabled);
                        if (SlotMode != null && SlotMode.Count() > 0) {
                            sSlotTimeMode = "F";
                        }
                        else {
                            sSlotTimeMode = "D";
                        }
                    }
                    let errmsg: boolean = false;
                    if (nCount > 1 && sSlotTimeMode == "F") {
                        for (let i: number = 0; i < nCount; i++) {
                            if (!String.IsNullOrEmpty(this.oAdminTimesVM.GrdData[i].FixedTimes) && this.oAdminTimesVM.GrdData[i].FixedTimes.Contains(':')) {
                                let strHHMM: string[] = this.oAdminTimesVM.GrdData[i].FixedTimes.Split(':');
                                if (strHHMM != null && strHHMM.length > 1) {
                                    stDTTM = CurrDateTime.AddHours(Convert.ToDouble(strHHMM[0])).AddMinutes(Convert.ToDouble(strHHMM[1]));
                                    if (DateTime.NotEquals(endDTTM, DateTime.MinValue)) {
                                        tsIntervalmin = TimeSpan.Parse(stDTTM.Subtract(endDTTM).ToString("hh:mm"));
                                        if (tsIntervalmin.TotalMinutes <= Infperdmin) {
                                            errmsg = true;
                                            break;
                                        }
                                    }
                                }
                            }
                            endDTTM = stDTTM;
                        }
                    }
                    else if (nCount > 1 && sSlotTimeMode == "D") {
                        for (let i: number = 0; i < nCount; i++) {
                            if (!String.IsNullOrEmpty(this.oAdminTimesVM.GrdData[i].DruRoundTimes) && this.oAdminTimesVM.GrdData[i].DruRoundTimes.Contains(':')) {
                                let strHHMM: string[] = this.oAdminTimesVM.GrdData[i].DruRoundTimes.Split(':');
                                if (strHHMM != null && strHHMM.length > 1) {
                                    stDTTM = CurrDateTime.AddHours(Convert.ToDouble(strHHMM[0])).AddMinutes(Convert.ToDouble(strHHMM[1]));
                                    if (DateTime.NotEquals(endDTTM, DateTime.MinValue)) {
                                        tsIntervalmin = TimeSpan.Parse(stDTTM.Subtract(endDTTM).ToString("hh:mm"));
                                        if (tsIntervalmin.TotalMinutes <= Infperdmin) {
                                            errmsg = true;
                                            break;
                                        }
                                    }
                                }
                            }
                            endDTTM = stDTTM;
                        }
                    }
                    if (errmsg) {
                        let Msg: string = String.Format(Resource.Infusion.InfusionPeriod_Msg, this.objfrm.FormViewerDetails.BasicDetails.InfusionDetails.InfusionPeriod + ' ' + this.objfrm.FormViewerDetails.BasicDetails.InfusionDetails.InfusionPeriodUom.DisplayText);
                        this.ShowErrorMsg(Msg, MessageBoxType.Information, MessageBoxButton.OK, "iTimeScheduled");
                        return false;
                    }
                }
            }
        }
        return true;
    }
    private IsWrongAdminTime(dtPreviousSchDTTM: DateTime, dtLatestSchDTTM: DateTime): boolean {
        let isWrongTime: boolean = false;
        let ts: TimeSpan = TimeSpan.Parse(dtPreviousSchDTTM.Subtract(dtLatestSchDTTM).ToString("hh:mm"));
        if (ts.TotalMinutes < 120) {
            isWrongTime = true;
        }
        return isWrongTime;
    }
    public showduplicate(): boolean {
        let bIsValid: boolean = true;
        if (this.oAdminTimesVM != null) {
            if (String.IsNullOrEmpty(this.sDupliTimeDet)) {
                if (this.oAdminTimesVM != null && this.oAdminTimesVM.GrdData != null && this.oAdminTimesVM.GrdData.Count > 0) {
                    this.sDupliTimeDet = String.Compare(this.oAdminTimesVM.GrdData[0].FrequencyType, "CC_PERIOD", StringComparison.CurrentCultureIgnoreCase) != 0 ? String.Empty : this.oAdminTimesVM.duplicatecheck();
                    if (!String.IsNullOrEmpty(this.sDupliTimeDet)) {
                        this.sDupliTimeDet = this.sDupliTimeDet.ToString().Substring(0, this.sDupliTimeDet.length - 1);
                        let objMsg: iMessageBox = new iMessageBox();
                        objMsg.MessageButton = MessageBoxButton.OK;
                        objMsg.Message = "Time" + " " + this.sDupliTimeDet + " " + "has already been selected as an administration time. Duplicate administration times cannot be added";
                        objMsg.Closed = (s, e) => { this.objMsg_Closed(s, e); };
                        objMsg.Show();
                        bIsValid = false;
                    }
                }
            }
        }
        return bIsValid;
    }
    objMsg_Closed(sender: Object, e: EventArgs): void {
        this.sDupliTimeDet = String.Empty;
        this.bDuplicateAdminTimesPrompt = false;
    }
    private RegenSlotsForChangingDose(objgrddata: MultipleDoseDetail): void {
        if (DateTime.NotEquals(objgrddata.EndDTTM, DateTime.MinValue)) {
            let dtColDate: DateTime;
            let nDurationInDays: number = objgrddata.EndDTTM.DateTime.Subtract(objgrddata.StartDTTM.Date).Days + 1;
            let _CanGenerate: boolean = true;
            let tmpScheduleTime: string, tmpScheduleDoseValue, tmpScheduleDoseUOM;
            if (objgrddata != null && objgrddata.ScheduleDetailsData != null && nDurationInDays > 1 && objgrddata.ScheduleDetailsData[0].ScheduleDate.Count() == 1) {
                let nFreqTimesCount: number = objgrddata.ScheduleDetailsData.Count;
                let IsWeeklyFrequency: boolean = false;
                if (objgrddata.FreqDetails != null && objgrddata.FreqDetails.oFrequency != null) {
                    IsWeeklyFrequency = (String.Compare(objgrddata.FreqDetails.oFrequency.UOM, "CC_MEDDRSN2", StringComparison.InvariantCultureIgnoreCase) == 0);
                }
                let lstScheduleDates: List<DateTime> = new List<DateTime>();
                dtColDate = objgrddata.StartDTTM.Date;
                while (DateTime.LessThanOrEqualTo(dtColDate.Date, objgrddata.EndDTTM.Date)) {
                    if (IsWeeklyFrequency) {
                        switch (dtColDate.DayOfWeek) {
                            case DayOfWeek.Sunday:
                                _CanGenerate = objgrddata.FreqDetails.oFrequency.IsSunday;
                                break;
                            case DayOfWeek.Monday:
                                _CanGenerate = objgrddata.FreqDetails.oFrequency.IsMonday;
                                break;
                            case DayOfWeek.Tuesday:
                                _CanGenerate = objgrddata.FreqDetails.oFrequency.IsTuesday;
                                break;
                            case DayOfWeek.Wednesday:
                                _CanGenerate = objgrddata.FreqDetails.oFrequency.IsWednesday;
                                break;
                            case DayOfWeek.Thursday:
                                _CanGenerate = objgrddata.FreqDetails.oFrequency.IsThursday;
                                break;
                            case DayOfWeek.Friday:
                                _CanGenerate = objgrddata.FreqDetails.oFrequency.IsFriday;
                                break;
                            case DayOfWeek.Saturday:
                                _CanGenerate = objgrddata.FreqDetails.oFrequency.IsSaturday;
                                break;
                        }
                    }
                    else {
                        _CanGenerate = true;
                    }
                    if (_CanGenerate) {
                        lstScheduleDates.Add(dtColDate);
                    }
                    dtColDate = dtColDate.AddDays(1);
                }
                for (let i: number = 0; i < nFreqTimesCount; i++) {
                    tmpScheduleTime = objgrddata.ScheduleDetailsData[i].ScheduleTime;
                    tmpScheduleDoseValue = objgrddata.ScheduleDetailsData[i].ScheduleDoseValue[0];
                    tmpScheduleDoseUOM = objgrddata.ScheduleDetailsData[i].ScheduleDoseUOM;
                    objgrddata.ScheduleDetailsData[i].ScheduleDate = new Array(lstScheduleDates.Count);
                    objgrddata.ScheduleDetailsData[i].ScheduleDoseValue = new Array(lstScheduleDates.Count);
                    let nDayCount: number = 0;
                    lstScheduleDates.forEach((oDate) => {
                        objgrddata.ScheduleDetailsData[i].ScheduleDate[nDayCount] = new DateTime(oDate.Year, oDate.Month, oDate.Day, 0, 0, 0);
                        objgrddata.ScheduleDetailsData[i].ScheduleTime = tmpScheduleTime;
                        objgrddata.ScheduleDetailsData[i].ScheduleDoseValue[nDayCount] = tmpScheduleDoseValue;
                        objgrddata.ScheduleDetailsData[i].ScheduleDoseUOMs[nDayCount] = tmpScheduleDoseUOM;
                        objgrddata.ScheduleDetailsData[i].ScheduleDoseUOM = tmpScheduleDoseUOM;
                        nDayCount++;
                    });
                }
            }
        }
    }
    private CheckPartiallyorDayCrossed(_IsPartiallyCrossedStartDate: boolean, _IsDayCrossedStartDate: boolean): void {
        _IsPartiallyCrossedStartDate = false;
        _IsDayCrossedStartDate = false;
        let _PartiallyCrossedStartDateCount: number = 0;
        let dTempScheduleDTTM: DateTime;
        if (this.oAdminTimesVM != null && this.oAdminTimesVM.GrdData != null && this.oAdminTimesVM.GrdData.Count > 0) {
            let nAdminTimeCount: number = this.oAdminTimesVM.GrdData.Count;
            let IsDrugroundTimeNotExists: boolean = true;
            let IsFixedTimeNotExists: boolean = false;
            if (nAdminTimeCount == 1 && String.IsNullOrEmpty(this.oAdminTimesVM.GrdData[0].DruRoundTimes)) {
                IsDrugroundTimeNotExists = true;
            }
            else if (nAdminTimeCount > 1) {
                IsDrugroundTimeNotExists = this.oAdminTimesVM.GrdData.All(x => String.IsNullOrEmpty(x.DruRoundTimes) || String.Equals(x.DruRoundTimes, "00:00"));
            }
            if (IsDrugroundTimeNotExists) {
                IsFixedTimeNotExists = nAdminTimeCount > 1 && this.oAdminTimesVM.GrdData.All(x => String.IsNullOrEmpty(x.FixedTimes) || String.Equals(x.FixedTimes, "00:00"));
            }
            let _PresItemStartDTTM: DateTime;
            if (DateTime.NotEquals(this.objfrm.FormViewerDetails.BasicDetails.StartPrescriptionTime, DateTime.MinValue)) {
                _PresItemStartDTTM = this.objfrm.FormViewerDetails.BasicDetails.StartDTTM.DateTime.AddTime(this.objfrm.FormViewerDetails.BasicDetails.StartPrescriptionTime);
            }
            else if (DateTime.Equals(this.objfrm.FormViewerDetails.BasicDetails.StartDTTM, DateTime.MinValue) && PatientContext.PrescriptionType == PrescriptionTypes.Clerking) {
                _PresItemStartDTTM = CommonBB.GetServerDateTime().Date;
            }
            else {
                _PresItemStartDTTM = this.objfrm.FormViewerDetails.BasicDetails.StartDTTM;
            }
            let _IsFixedTime: boolean = this.iRdBtnFixedTime.IsChecked == true;
            if (!IsDrugroundTimeNotExists || !IsFixedTimeNotExists) {
                for (let i: number = 0; i < nAdminTimeCount; i++) {
                    let ts: TimeSpan = new TimeSpan();
                    let bResult: boolean = false;
                    if (_IsFixedTime && !String.IsNullOrEmpty(this.oAdminTimesVM.GrdData[i].FixedTimes)) {
                        bResult = TimeSpan.TryParse(this.oAdminTimesVM.GrdData[i].FixedTimes, (o) => { ts = o });
                    }
                    else if (!String.IsNullOrEmpty(this.oAdminTimesVM.GrdData[i].DruRoundTimes)) {
                        bResult = TimeSpan.TryParse(this.oAdminTimesVM.GrdData[i].DruRoundTimes, (o) => { ts = o });
                    }
                    if (bResult) {
                        if (DateTime.Equals(this.objfrm.FormViewerDetails.BasicDetails.StartDTTM, DateTime.MinValue) && PatientContext.PrescriptionType == PrescriptionTypes.Clerking) {
                            dTempScheduleDTTM = CommonBB.GetServerDateTime().DateTime.Add(ts);
                        }
                        else {
                            dTempScheduleDTTM = this.objfrm.FormViewerDetails.BasicDetails.StartDTTM.DateTime.Add(ts);
                        }
                        if (DateTime.LessThan(dTempScheduleDTTM, _PresItemStartDTTM)) {
                            _PartiallyCrossedStartDateCount++;
                        }
                    }
                }
                if (_PartiallyCrossedStartDateCount == 0) {
                    _IsDayCrossedStartDate = false;
                    _IsPartiallyCrossedStartDate = false;
                }
                else if (_PartiallyCrossedStartDateCount == nAdminTimeCount) {
                    _IsDayCrossedStartDate = true;
                    _IsPartiallyCrossedStartDate = false;
                }
                else {
                    _IsDayCrossedStartDate = false;
                    _IsPartiallyCrossedStartDate = true;
                }
            }
        }
    }
    public DisposeFormEvents(): void {
        if (this.objfrm != null && this.objfrm.FormViewerDetails != null && this.objfrm.FormViewerDetails.BasicDetails != null) {
            // this.objfrm.FormViewerDetails.BasicDetails.PropertyChanged -= BasicDetails_PropertyChanged;
            this.objfrm.DoCleanUP();
        }
        // if (this.profile != null)
        //     this.profile.OnProfileLoaded -= profile_OnProfileLoaded;
        // if (this.oAdminTimesVM != null) {
        //     this.oAdminTimesVM.FreqDetailsCompleted -= oAdminTimesVM_FreqDetailsCompleted;
        //     this.oAdminTimesVM.AdminstrativeTimesCompleted -= oVM_AdminstrativeTimesCompleted;
        //     this.oAdminTimesVM.AdminstrativeTimesCompleted -= oVM_GrdTimesCompleted;
        // }
    }
    public DisposeFormObjects(): void {

    }
    private medipresolvestepped_UnLoaded(sender: Object, e: RoutedEventArgs): void {
        this.omedFormViewer = null;
        this.DisposeFormEvents();
    }
    public EnableButtonsForNewEntry(): void {
        this.cmdAdd.IsEnabled = true;
        this.cmdRemove.IsEnabled = this.cmdUpdate.IsEnabled = false;
        return
    }

    getUpdatedValues(dataItem) {
        return {
            ...(dataItem.Duration, dataItem.DurationUOM, dataItem.ScheduleDetailsData, dataItem.LowerDose, dataItem.UpperDose, dataItem.DoseValueDisplay,
                dataItem.HyperlinkText, dataItem.InfusionRate, dataItem.InfusionUpperrate, dataItem.Infratenumeratoruom, dataItem.InfrateDenominatoruom, dataItem.Frequency,
                dataItem.DurationValueDisplay, dataItem.DoseInstructions, dataItem.AdministrationTimes, dataItem.OperationMode, dataItem.IsDaywiseView)
        };
    }
    public SetCombox(c?: iComboBox) {
        let c1 = this.DataContext.FormViewerDetails.BasicDetails.SteppedDoseUOM;
        setTimeout(() => {
            this.DataContext.FormViewerDetails.BasicDetails.SteppedDoseUOM = null;
        }, 0);
        setTimeout(() => {
            this.DataContext.FormViewerDetails.BasicDetails.SteppedDoseUOM = c1;
        }, 0);
    }

}
