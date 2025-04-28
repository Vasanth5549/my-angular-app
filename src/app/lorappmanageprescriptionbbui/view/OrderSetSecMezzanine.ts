import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { StringBuilder, ProfileFactoryType, ContextManager, Convert, AppActivity, iBusyIndicator } from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp, Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison, AppDialogEventargs, AppDialogResult, DelegateArgs, DialogComponentArgs, WindowButtonType, List, PatientContext, iAppDialogWindow, IEnumerable, ObservableCollection, SelectionChangedEventArgs } from 'epma-platform/models';
import { AppDialog, Border, Color, ContentControl, DataTemplate, Grid, GridLength, Image, MouseButtonEventArgs, SolidColorBrush, iButton, iCheckBox, iDateTimePicker, iLabel, iTimeBox } from 'epma-platform/controls';
import { HelperService } from 'epma-platform/soapclient';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
import { OrderSetSecMezzanineVM, PrescriptionItemAssociations } from '../viewmodel/ordersetsecmezzanineVM';
import { FrameworkElement, RoutedEventArgs, Thickness } from 'src/app/shared/epma-platform/controls/FrameworkElement';
import { CommonBB } from 'src/app/lorappcommonbb/utilities/common';
import { PrescriptionItemVM } from '../viewmodel/PrescriptionItemVM';
import { OsValidation } from '../utilities/common';
import { Visibility } from 'src/app/shared/epma-platform/controls-model/Visibility';
import { CAActivity, PrescriptionTypes } from '../utilities/constants';
import { ClerkFormViewDeftBehaviour } from 'src/app/product/shared/models/Common';
import { GridExtension, GridViewBeginningEditRoutedEventArgs, GridViewCell, RowLoadedEventArgs, SelectionChangeEventArgs, SelectionChangingEventArgs } from 'src/app/shared/epma-platform/controls/epma-grid-helpers/grid-extension';
import { OrderSetChildfooter } from './OrderSetChildfooter';
import { MultipleDoseDetail } from '../viewmodel/MultipleDoseDetail';
import { GridComponent, RowClassArgs } from '@progress/kendo-angular-grid';
import { OrderSetGuidanceSecMezzanine } from './OrderSetGuidanceSecMezzanine';
import { OrderSetsLinks } from './OrderSetsLinks';
import { DateChangeEventArgs } from 'src/app/shared/epma-platform/controls/epma-datetimepicker/epma-datetimepicker.component';
import * as ControlStyles from "../../shared/epma-platform/controls/ControlStyles";
import { Resource } from "../resource";
import { ProfileData } from '../utilities/profiledata';
import { QueryStringInfo } from '../utilities/globalvariable';

@Component({
    selector: 'OrderSetSecMezzanine',
    templateUrl: './OrderSetSecMezzanine.html',
    styleUrls: ['./OrderSetSecMezzanine.css']
})

export class OrderSetSecMezzanine extends iAppDialogWindow {

    public Styles = ControlStyles;
    public resKey = Resource.ORSSecMezzanine;
    public LayoutRoot: Grid = new Grid();
    mldetails = Resource.Medlistdetails;
    @ViewChild("LayoutRootTempRef", { read: Grid, static: false }) set _LayoutRoot(c: Grid) {
        if (c) { this.LayoutRoot = c; }
    };
    public lblGuidanceText: iLabel;
    @ViewChild("lblGuidanceTextTempRef", { read: iLabel, static: false }) set _lblGuidanceText(c: iLabel) {
        if (c) { this.lblGuidanceText = c; }
    };
    public lblGuidanceHyperlink: iLabel;
    @ViewChild("lblGuidanceHyperlinkTempRef", { read: iLabel, static: false }) set _lblGuidanceHyperlink(c: iLabel) {
        if (c) { this.lblGuidanceHyperlink = c; }
    };
    public DRCDisableRow: Grid = new Grid();
    @ViewChild("DRCDisableRowTempRef", { read: Grid, static: false }) set _DRCDisableRow(c: Grid) {
        if (c) { this.DRCDisableRow = c; }
    };
    public DRCCheckBox: iCheckBox;
    @ViewChild("DRCCheckBoxTempRef", { read: iCheckBox, static: false }) set _DRCCheckBox(c: iCheckBox) {
        if (c) { this.DRCCheckBox = c; }
    };
    public DisableDRC: iLabel;
    @ViewChild("DisableDRCTempRef", { read: iLabel, static: false }) set _DisableDRC(c: iLabel) {
        if (c) { this.DisableDRC = c; }
    };
    public DisableDRCWarning: iLabel;
    @ViewChild("DisableDRCWarningTempRef", { read: iLabel, static: false }) set _DisableDRCWarning(c: iLabel) {
        if (c) { this.DisableDRCWarning = c; }
    };
    public lblSelectText: iLabel;
    @ViewChild("lblSelectTextTempRef", { read: iLabel, static: false }) set _lblSelectText(c: iLabel) {
        if (c) { this.lblSelectText = c; }
    };
    public lblSetDateTime: iLabel;
    @ViewChild("lblSetDateTimeTempRef", { read: iLabel, static: false }) set _lblSetDateTime(c: iLabel) {
        if (c) { this.lblSetDateTime = c; }
    };
    public dtpSetDateTime: iDateTimePicker;
    @ViewChild("dtpSetDateTimeTempRef", { read: iDateTimePicker, static: false }) set _dtpSetDateTime(c: iDateTimePicker) {
        if (c) { this.dtpSetDateTime = c; }
    };
    public iTimeStartDateTime: iTimeBox;
    @ViewChild("iTimeStartDateTimeTempRef", { read: iTimeBox, static: false }) set _iTimeStartDateTime(c: iTimeBox) {
        if (c) { this.iTimeStartDateTime = c; }
    };
    public btnApply: iButton;
    @ViewChild("btnApplyTempRef", { read: iButton, static: false }) set _btnApply(c: iButton) {
        if (c) { this.btnApply = c; }
    };
    public grdPatientSelect: GridExtension = new GridExtension();
    @ViewChild("grdPatientSelectTempRef", { read: GridComponent }) set _grdPatientSelect(c: GridComponent) {
        if (c) {
            this.grdPatientSelect.grid = c;
            this.grdPatientSelect.columns = c.columns;
        }
    };
    
    private _chkHeaderRowCheckbox: iCheckBox;
    @ViewChild("chkGridHeaderSelectionRef", { read: iCheckBox}) set ___chkRowCheckbox(c: iCheckBox) {
        if (c) { this._chkHeaderRowCheckbox = c; }
    };
    
    SelectCheckbox: QueryList<iCheckBox>;
    @ViewChildren("SelectCheckboxTempRef", {read: iCheckBox}) set _SelectCheckbox(c: QueryList<iCheckBox>) {
        if (c) { this.SelectCheckbox = c; }
    }
    private _chkGridSelectionRef: QueryList<iCheckBox>;
    @ViewChildren("chkGridSelectionRef", { read: iCheckBox }) set __chkGridSelectionRef(c: QueryList<iCheckBox>) {
        if (c) { this._chkGridSelectionRef = c; }
    };

    private dtpStartDate: QueryList<iDateTimePicker>;
    @ViewChildren('dtpStartDateTempRef', { read: iDateTimePicker })
    set _dtpStartDate(c: QueryList<iDateTimePicker>) {
        if (c) {
        this.dtpStartDate = c;
        }
    }

    dataTemplates: QueryList<DataTemplate>;
    @ViewChildren('temp', { read: DataTemplate })
    set _dataTemplates(v: QueryList<DataTemplate>) {
      if (v) {
        this.dataTemplates = v;
        this.grdPatientSelect.dataTemplates = v;
      }
    }

    public res_Key = Resource.MedicationForm;
    public objsecondary: OrderSetChildfooter;
    public objOrderSetSecMezzanineVM: OrderSetSecMezzanineVM = null;
    oORSChild: OrderSetGuidanceSecMezzanine;
    oORSChildLinks: OrderSetsLinks;
    public IsORSEditable: boolean = true;
    // objStepped: MedSteppedDose;
    public MultiDoseDetailVM: MultipleDoseDetail;
    cmdLink: iButton;
    cmdSetSequence: iButton;
    cmdClearSequence: iButton;
    cmdSequenceLink: iButton;
    cmdMoveDown: iButton;
    cmdMoveUp: iButton;
    liDefaultSet: List<number>;
    IsBusy: boolean = false;
    DynamicHeight: number = 513;
    guidanceheight: number = 0;
    drccheckheight: number = 0;
    ordersetLayout:boolean;
    constructor(private cd?: ChangeDetectorRef, private el?: ElementRef) {
        super();
    }

    ngAfterViewInit(): void {
        iBusyIndicator.Start("orderSetMezzanine");
        this.grdPatientSelect.GenerateColumns();
        this.ChildWindow_Loaded({}, null);
        // fix for FOT #55562
        if (this.objOrderSetSecMezzanineVM != null) {
            this.DRCCheckBox.IsChecked = this.objOrderSetSecMezzanineVM.IsDisableDRC ? true : false;
            if ((!this.objOrderSetSecMezzanineVM.IsDisableDRC || !((ProfileData.MedConflictConfig != null && ProfileData.MedConflictConfig.TurnOnDRC != null && ProfileData.MedConflictConfig.TurnOnDRC == '1') || (ProfileData.MedConflictConfig == null && PatientContext.IsTurnONDRC))) || PatientContext.PrescriptionType == PrescriptionTypes.Clerking || PatientContext.ClerkFormViewDefaultBehavior == ClerkFormViewDeftBehaviour.LaunchFormMandatory) {
                this.DRCCheckBox.Visibility = Visibility.Collapsed;
                this.DisableDRC.Visibility = Visibility.Collapsed;
                this.DisableDRCWarning.Visibility = Visibility.Collapsed;
            }
            else if ((this.objOrderSetSecMezzanineVM.IsDisableDRC && ((ProfileData.MedConflictConfig != null && ProfileData.MedConflictConfig.TurnOnDRC != null && ProfileData.MedConflictConfig.TurnOnDRC == '1') || (ProfileData.MedConflictConfig == null && PatientContext.IsTurnONDRC))) && PatientContext.PrescriptionType != PrescriptionTypes.Clerking && PatientContext.ClerkFormViewDefaultBehavior != ClerkFormViewDeftBehaviour.LaunchFormMandatory) {
                this.DRCCheckBox.Visibility = Visibility.Visible;
                this.DisableDRC.Visibility = Visibility.Visible;
                this.DisableDRCWarning.Visibility = Visibility.Visible;
            }
        }
        this.cd?.detectChanges();
        this.dataTemplates.changes.subscribe((children) => {
            setTimeout(() => {
                this.renderRows(children);  
            }, 0);
            this.gridHeightChange();
        });
     
    }
    private gridHeightChange() {
        let defaultHeight= (window.devicePixelRatio == 1) ? 587 : (587/window.devicePixelRatio)-22.6; //(587/window.devicePixelRatio)
        const guidanceText = document.getElementById('Guidancetext');
        const drcCheck = document.getElementById('DRCCheck');
        if(window.screen.height < 1000 && window.devicePixelRatio != 1.25){
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
                ))) ) {
                    // alert("chart");
                    this.DynamicHeight = 264;
                    this.ordersetLayout = false;
                }
                else{
                    // alert("direct");
                    this.ordersetLayout = true;
                    this.DynamicHeight = 295;
                }
           
          }else{
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
                    ))) && window.devicePixelRatio == 1.25) {
                 defaultHeight = defaultHeight - 49;
        }
            this.DynamicHeight = defaultHeight - guidanceText.clientHeight - drcCheck.clientHeight;
          }
    }

    private renderRows(c) {
        if (this.DataContext.objPrescriptionList && this.DataContext.objPrescriptionList.length > 0) {
            for (let i: number = 0; i < this.DataContext.objPrescriptionList.length; i++) {
                this.rowLoaded(i);
            }
        }
    }
   
    public rowLoaded(c) {
        let datalist= this.DataContext.objPrescriptionList;
        if (datalist && datalist.Count > 0) {
            for (let i:number = 0; i < datalist.Count ; i++) {
                let context: { index: any, dataItem: any } = { index: 0, dataItem: {} };
                context.index = i;
                context.dataItem = this.DataContext.objPrescriptionList[i];
                let rowEventArgs = this.grdPatientSelect.GetRowEventArgs(this.dataTemplates, context);
                rowEventArgs.Row.DataContext = this.DataContext.objPrescriptionList[i];
                this.grdPatientSelect_RowLoaded({}, rowEventArgs);
            }
        }
    }

    public GridHeaderCheckboxChange_Func = (s, e) => {
        if (s.target.checked) {
            this.grdPatientSelect.UnselectAll();
            this.grdPatientSelect.ItemsSource.forEach((item, inx) => {
                if (item && !item.PrescrptionItem.OsInstance.OsIsGroupHeader && !item.PrescrptionItem.OsInstance.IsPrescribed && !this.grdPatientSelect.GetSelectedRowsIndex().Contains(inx.toString())) {
                    this.grdPatientSelect.SelectedItem = item;
                }
            })
        }
        else {
            this.grdPatientSelect.ItemsSource.forEach((item) => {
                if (item && !item.PrescrptionItem.OsInstance.OsIsGroupHeader && !item.PrescrptionItem.OsInstance.IsPrescribed) {
                    let addedItems = new ObservableCollection<Object>();
                    addedItems.Add(item);
                    this.grdPatientSelect.Unselect(addedItems);
                }
            })
        }
        let selectableItemsCount: number = 0;
        this.grdPatientSelect.ItemsSource.forEach((item, inx) => {
            if (!item.PrescrptionItem.OsInstance.IsPrescribed && !item.PrescrptionItem.OsInstance.OsIsGroupHeader) {
                selectableItemsCount = selectableItemsCount + 1;
            }
        })
        if (selectableItemsCount == this.grdPatientSelect.GetSelectedRowCount()) {
            this.isSelectAll = true;
        }
        else {
            this.isSelectAll = false;
        }
        this.GridHeaderCheckboxChange(s, e);
        this.SetSequenceCanbeEnabledVisible();
        this.SequenceLinkCanbeEnabledVisible();
        this.ClearSequenceCanbeEnabledVisible();
        this.MoveDownCanbeEnabledVisible();
        this.MoveUpCanbeEnabledVisible();
    }

    GridHeaderCheckboxChange(s, e) {
        this.grdPatientSelect.UpdateCheckBoxSelection(this._chkHeaderRowCheckbox, this._chkGridSelectionRef, true);
    }

    public ChildWindow_Loaded(sender: Object, e: RoutedEventArgs): void {
        this.objOrderSetSecMezzanineVM = ObjectHelper.CreateType<OrderSetSecMezzanineVM>(this.DataContext, OrderSetSecMezzanineVM);
        this.objOrderSetSecMezzanineVM.OnOSItemsLoaded = (s, e) => { this.objOrderSetSecMezzanineVM_OnOSItemsLoaded(s, e); };
        this.objOrderSetSecMezzanineVM.OnShowHyperlink = (s, e) => { this.objOrderSetSecMezzanineVM_OnShowHyperlink(s); };
        // this.grdPatientSelect.SelectionChanging = (s, e) => { this.grdPatientSelect_SelectionChanging(s, e); };
        // this.grdPatientSelect.SelectionChanged = (s, e) => { this.grdPatientSelect_SelectionChanged(s, e); };
        this.grdPatientSelect.GridSelectionChange = (s, e) => { this.grdPatientSelect_SelectionChanged(s, e) };
        this.liDefaultSet = new List<number>();
        let subscribeOrderSetChildFooterLoadedEvent = this.objsecondary.OrderSetChildFooterLoadedEvent.subscribe(data => {
            this.cmdLink = ObjectHelper.CreateType<iButton>(this.objsecondary.FindName("cmdLinks"), iButton);
            this.cmdSetSequence = ObjectHelper.CreateType<iButton>(this.objsecondary.FindName("cmdSetSequence"), iButton);
            this.cmdClearSequence = ObjectHelper.CreateType<iButton>(this.objsecondary.FindName("cmdClearSequence"), iButton);
            this.cmdSequenceLink = ObjectHelper.CreateType<iButton>(this.objsecondary.FindName("cmdSequenceLink"), iButton);
            this.cmdMoveDown = ObjectHelper.CreateType<iButton>(this.objsecondary.FindName("cmdMoveDown"), iButton);
            this.cmdMoveUp = ObjectHelper.CreateType<iButton>(this.objsecondary.FindName("cmdMoveUp"), iButton);
            this.objsecondary.Width = 897;
            if (this.cmdLink != null)
                this.cmdLink.Click = (s, e) => { this.cmdLink_Click(s, e); };
            if (this.cmdSetSequence != null)
                this.cmdSetSequence.Click = (s, e) => { this.cmdSetSequence_Click(s, e); };
            if (this.cmdClearSequence != null)
                this.cmdClearSequence.Click = (s, e) => { this.cmdClearSequence_Click(s, e); };
            if (this.cmdSequenceLink != null)
                this.cmdSequenceLink.Click = (s, e) => { this.cmdSequenceLink_Click(s, e); };
            if (this.cmdMoveDown != null)
                this.cmdMoveDown.Click = (s, e) => { this.cmdMoveDown_Click(s, e); };
            if (this.cmdMoveUp != null)
                this.cmdMoveUp.Click = (s, e) => { this.cmdMoveUp_Click(s, e); };
            subscribeOrderSetChildFooterLoadedEvent.unsubscribe();
        })
        if (this.objOrderSetSecMezzanineVM != null && !String.IsNullOrEmpty(this.objOrderSetSecMezzanineVM.ActivityType) && String.Equals(this.objOrderSetSecMezzanineVM.ActivityType, CAActivity.CA_REORDER, StringComparison.InvariantCultureIgnoreCase)) {
            this.objOrderSetSecMezzanineVM_OnOSItemsLoaded(this.objOrderSetSecMezzanineVM.IsEditable, this.objOrderSetSecMezzanineVM.IsLinkDisabled);
        }
    }
    public SetOkDisableIfNoActiveItems(): void {
        if (this.objOrderSetSecMezzanineVM != null && this.objOrderSetSecMezzanineVM.PrescriptionItemList != null && this.objOrderSetSecMezzanineVM.PrescriptionItemList.All(x => x != null && x.PrescrptionItem != null && x.PrescrptionItem.OsInstance != null && (x.PrescrptionItem.OsInstance.OsIsGroupHeader || x.PrescrptionItem.OsInstance.IsPrescribed))) {
            let btnOk: iButton = this.GetOkButton(this);
            if (btnOk != null) {
                btnOk.IsEnabled = false;
            }
        }
    }
    public cmdSetSequence_Click(sender: Object, e: RoutedEventArgs): void {
        if (this.IsBusy)
            return
        this.IsBusy = true;
        /*Edited old - let selectedRowsWidthPos = this.grdPatientSelect.GetSelectedRows().Select((x) => new { Row = x as PrescriptionItemAssociations, Position = this.objOrderSetSecMezzanineVM.PrescriptionItemList.IndexOf(x as PrescriptionItemAssociations) }).Where(x => x != null && x.Row != null && x.Row.PrescrptionItem != null && (x.Row.PrescrptionItem.OsInstance == null || !x.Row.PrescrptionItem.OsInstance.OsIsGroupHeader)).OrderBy(x => x.Position).ToArray();*/
        let selectedRowsWidthPos = this.grdPatientSelect.GetSelectedRows().Select((x) => { return { Row: x as PrescriptionItemAssociations, Position: this.objOrderSetSecMezzanineVM.PrescriptionItemList.IndexOf(x as PrescriptionItemAssociations) } }).Where(x => x != null && x.Row != null && x.Row.PrescrptionItem != null && (x.Row.PrescrptionItem.OsInstance == null || !x.Row.PrescrptionItem.OsInstance.OsIsGroupHeader)).OrderBy(x => x.Position).ToArray();
        {
            // let validations = selectedRowsWidthPos.Select((x) => new { x.Position, Validation = OsValidation.GetOsValidation(x.Row, true) }).Where(x => x.Validation != null).ToArray();
            let validations = selectedRowsWidthPos.Select((x) => { return { Validation: OsValidation.GetOsValidation(x.Row, true) } }).Where(x => x.Validation != null).ToArray();
            let errorCount: number = 0;
            let errorMessage: string = String.Empty;
            if (validations.Any(x => x.Validation.IsStatOnceOnlyOrPrn)) {
                errorCount++;
                errorMessage = Resource.MedicationErrors.IsStatOnceOnlyOrPrnError;
            }
            if (validations.Any(x => x.Validation.IsApplianceMedGasSVOrPCA || x.Validation.IsTitrated || x.Validation.IsInfusion && x.Validation.IsIntermittend)) {
                errorCount++;
                errorMessage = Resource.MedicationErrors.IsApplianceMedGasSVOrPCAError;
            }
            let lastIndex: number = validations.Max(x => x.Position);
            if (validations.Any(x => x.Position != lastIndex && !x.Validation.HavingDuration && !x.Validation.HavingInfusionPeriod)) {
                errorCount++;
                errorMessage = Resource.MedicationErrors.HavingDurationInfusionPeriodError;
            }
            if (validations.Select(x => x.Validation.IsInfusion).Distinct().Count() > 1) {
                errorCount++;
                errorMessage = Resource.MedicationErrors.HavingIVAndNonIVError;
            }
            if (errorCount > 1) {
                errorMessage = Resource.MedicationErrors.OrdersetMultipleValidationError;
                this.ShoCustomMessage(errorMessage);
                return
            }
            else if (!String.IsNullOrEmpty(errorMessage)) {
                this.ShoCustomMessage(errorMessage);
                return
            }
        }
        for (let i: number = 0; i < selectedRowsWidthPos.Length; i++) {
            this.MoveUpDownItem(selectedRowsWidthPos[i].Position, i);
        }
        selectedRowsWidthPos[0].Row.PrescrptionItem.OsInstance.OsIsFirstItem = true;
        if (selectedRowsWidthPos[0].Row.StartDTTM == DateTime.MinValue) {
            let _serverDateTime: DateTime = CommonBB.GetServerDateTime();
            selectedRowsWidthPos[0].Row.StartDTTM = _serverDateTime;
            selectedRowsWidthPos[0].Row.StartPrescriptionTime = _serverDateTime;
        }
        selectedRowsWidthPos[selectedRowsWidthPos.Length - 1].Row.PrescrptionItem.OsInstance.OsIsLastItem = true;
        /*Edited old -  let newSeqNo: number = (this.objOrderSetSecMezzanineVM.PrescriptionItemList.Where(x => x.PrescrptionItem.OsInstance.OsSeqGroupNo < 0).Select(x => <number>x.PrescrptionItem.OsInstance.OsSeqGroupNo).Max() ?? 0) + 1;*/
        let newSeqNo: number = (this.objOrderSetSecMezzanineVM.PrescriptionItemList.Where(x => x.PrescrptionItem.OsInstance.OsSeqGroupNo < 0).Select(x => <number>x.PrescrptionItem.OsInstance.OsSeqGroupNo).Max(null) ?? 0) + 1;
        for (let i: number = 0; i < selectedRowsWidthPos.Length; i++) {
            let pItemAssoc: PrescriptionItemAssociations = selectedRowsWidthPos[i].Row;
            if (pItemAssoc != null) {
                let pItem: PrescriptionItemVM = pItemAssoc.PrescrptionItem;
                if (pItem != null) {
                    pItem.OsInstance.OsSeqGroupNo = newSeqNo;
                    pItem.OsInstance.OsDisplayOrder = i + 1;
                    pItem.OsInstance.OsIsSequential = true;
                    pItem.OsInstance.OsIsFirstItem = (i == 0);
                    pItem.OsInstance.OsIsLastItem = (i == selectedRowsWidthPos.Length - 1);
                    if (i != 0) {
                        pItemAssoc.IsTimeAdjust = false;
                        pItemAssoc.StartDTTM = null;
                        pItemAssoc.StartPrescriptionTime = null;
                        pItemAssoc.Offset = null;
                    }
                }
            }
        }
        this.grdPatientSelect.Select(selectedRowsWidthPos.Select(x => x.Row));
        /* Edited */
        this.objOrderSetSecMezzanineVM.IsSetSequenceVisible = Visibility.Collapsed;
        this.objOrderSetSecMezzanineVM.IsClearSequenceVisible = Visibility.Visible;
        this.IsBusy = false;
        let _selectedRows = this.grdPatientSelect.GetSelectedRows().ToArray();
        if (_selectedRows.Length > 0) {
            this.grdPatientSelect.ScrollIntoView(_selectedRows[0]);
        }
    }
    public cmdClearSequence_Click(sender: Object, e: RoutedEventArgs): void {
        if (this.IsBusy)
            return
        this.IsBusy = true;
        let _selectedRows: any = this.grdPatientSelect.GetSelectedRows().ToArray();
        /*Edited Old - let selectedRowsWidthPos = this.objOrderSetSecMezzanineVM.PrescriptionItemList.Where(x => x.PrescrptionItem != null && x.PrescrptionItem.OsInstance.OsIsSequential).Select(x => new { Row = x, Position = this.objOrderSetSecMezzanineVM.PrescriptionItemList.IndexOf(x as PrescriptionItemAssociations) }).OrderByDescending(x => x.Position).ToArray();*/
        let selectedRowsWidthPos = this.objOrderSetSecMezzanineVM.PrescriptionItemList.Where(x => x.PrescrptionItem != null && x.PrescrptionItem.OsInstance.OsIsSequential).Select((x) => { return { Row: x, Position: this.objOrderSetSecMezzanineVM.PrescriptionItemList.IndexOf(x as PrescriptionItemAssociations) } }).OrderByDescending(x => x.Position).ToArray();
        selectedRowsWidthPos.forEach(x => {
            if (!x.Row.PrescrptionItem.OsInstance.OsIsFirstItem) {
                let _serverDateTime: DateTime = CommonBB.GetServerDateTime();
                x.Row.StartDTTM = _serverDateTime;
                x.Row.StartPrescriptionTime = _serverDateTime;
            }
            x.Row.PrescrptionItem.OsInstance.OsIsGroupHeader = false;
            x.Row.PrescrptionItem.OsInstance.OsGroupHeaderName = null;
            x.Row.PrescrptionItem.OsInstance.OsSeqGroupNo = 0;
            x.Row.PrescrptionItem.OsInstance.OsIsSequential = false;
            x.Row.PrescrptionItem.OsInstance.OsIsProtected = false;
            x.Row.PrescrptionItem.OsInstance.OsDisplayOrder = 0;
            x.Row.PrescrptionItem.OsInstance.OsIsFirstItem = false;
            x.Row.PrescrptionItem.OsInstance.OsIsLastItem = false;
            this.objOrderSetSecMezzanineVM.PrescriptionItemList.Remove(x.Row);
        });
        for (let i: number = selectedRowsWidthPos.Length - 1; i >= 0; i--) {
            this.objOrderSetSecMezzanineVM.PrescriptionItemList.Insert(selectedRowsWidthPos[i].Position, selectedRowsWidthPos[i].Row);
        }
        if (_selectedRows.Length > 0) {
            this.grdPatientSelect.Select(_selectedRows);
        }
        this.SetSequenceCanbeEnabledVisible();
        this.SequenceLinkCanbeEnabledVisible();
        this.ClearSequenceCanbeEnabledVisible();
        this.IsBusy = false;
    }
    public cmdSequenceLink_Click(sender: Object, e: RoutedEventArgs): void {
        if (this.IsBusy)
            return
        this.IsBusy = true;
        let _selectedRows: any = this.grdPatientSelect.GetSelectedRows().ToArray();
        /* Edited Line - let selectedRowsWidthPos = _selectedRows.Select(x => new { Row = x as PrescriptionItemAssociations, Position = objOrderSetSecMezzanineVM.PrescriptionItemList.IndexOf(x as PrescriptionItemAssociations) }).Where(x => x != null && x.Row != null && x.Row.PrescrptionItem != null && (x.Row.PrescrptionItem.OsInstance == null || !x.Row.PrescrptionItem.OsInstance.OsIsGroupHeader)).OrderBy(x => x.Position).ToArray(); */
        let selectedRowsWidthPos = _selectedRows.Select((x) => { return { Row: x as PrescriptionItemAssociations, Position: this.objOrderSetSecMezzanineVM.PrescriptionItemList.IndexOf(x as PrescriptionItemAssociations) } }).Where(x => x != null && x.Row != null && x.Row.PrescrptionItem != null && (x.Row.PrescrptionItem.OsInstance == null || !x.Row.PrescrptionItem.OsInstance.OsIsGroupHeader)).OrderBy(x => x.Position).ToArray();
        let sequenceItem = selectedRowsWidthPos.Where(x => x.Row.PrescrptionItem.OsInstance != null && x.Row.PrescrptionItem.OsInstance.OsIsSequential).ToArray()[0];
        let nonSequenceItem = selectedRowsWidthPos.Where(x => x.Row.PrescrptionItem.OsInstance == null || !x.Row.PrescrptionItem.OsInstance.OsIsSequential).ToArray()[0];
        {
            let errorCount: number = 0;
            let errorMessage: string = String.Empty;
            let sequenceItemValidation = OsValidation.GetOsValidation(sequenceItem.Row, true);
            let nonSequenceItemValidation = OsValidation.GetOsValidation(nonSequenceItem.Row, true);
            if (nonSequenceItemValidation.IsStatOnceOnlyOrPrn) {
                errorCount++;
                errorMessage = Resource.MedicationErrors.IsStatOnceOnlyOrPrnError;
            }
            if (nonSequenceItemValidation.IsApplianceMedGasSVOrPCA || nonSequenceItemValidation.IsTitrated || nonSequenceItemValidation.IsInfusion && nonSequenceItemValidation.IsIntermittend) {
                errorCount++;
                errorMessage = Resource.MedicationErrors.IsApplianceMedGasSVOrPCAError;
            }
            if (!sequenceItemValidation.HavingInfusionPeriod && !sequenceItemValidation.HavingDuration) {
                errorCount++;
                errorMessage = Resource.MedicationErrors.HavingDurationInfusionPeriodError;
            }
            if (sequenceItemValidation.IsInfusion != nonSequenceItemValidation.IsInfusion) {
                errorCount++;
                errorMessage = Resource.MedicationErrors.HavingIVAndNonIVError;
            }
            if ((sequenceItem.Row == null || sequenceItem.Row.PrescrptionItem == null || sequenceItem.Row.PrescrptionItem.OsInstance == null || !sequenceItem.Row.PrescrptionItem.OsInstance.OsIsLastItem) && (!nonSequenceItemValidation.HavingInfusionPeriod && !nonSequenceItemValidation.HavingDuration)) {
                errorCount++;
                errorMessage = Resource.MedicationErrors.HaveDurationInfusionPeriodLinkError;
            }
            if (errorCount > 1) {
                errorMessage = Resource.MedicationErrors.OrdersetMultipleValidationError;
                this.ShoCustomMessage(errorMessage);
                return
            }
            else if (!String.IsNullOrEmpty(errorMessage)) {
                this.ShoCustomMessage(errorMessage);
                return
            }
        }
        let firstItem: PrescriptionItemAssociations = selectedRowsWidthPos.Where(x => x.Row.PrescrptionItem.OsInstance != null && x.Row.PrescrptionItem.OsInstance.OsIsSequential).Select(x => ObjectHelper.CreateType<PrescriptionItemAssociations>(x.Row, PrescriptionItemAssociations)).First();
        let nextItem: PrescriptionItemAssociations = selectedRowsWidthPos.Where(x => x.Row.PrescrptionItem.OsInstance == null || !x.Row.PrescrptionItem.OsInstance.OsIsSequential).Select(x => ObjectHelper.CreateType<PrescriptionItemAssociations>(x.Row, PrescriptionItemAssociations)).First();
        let firstPos: number = this.objOrderSetSecMezzanineVM.PrescriptionItemList.IndexOf(firstItem);
        let otherPos: number = this.objOrderSetSecMezzanineVM.PrescriptionItemList.IndexOf(nextItem);
        nextItem.PrescrptionItem.OsInstance.OsDisplayOrder = firstItem.PrescrptionItem.OsInstance.OsDisplayOrder + 1;
        nextItem.PrescrptionItem.OsInstance.OsIsSequential = firstItem.PrescrptionItem.OsInstance.OsIsSequential;
        this.SetClearAllowAdjustStartTime(nextItem);
        if (firstItem.PrescrptionItem.OsInstance.OsIsLastItem) {
            firstItem.PrescrptionItem.OsInstance.OsIsLastItem = false;
            nextItem.PrescrptionItem.OsInstance.OsIsLastItem = true;
        }
        this.objOrderSetSecMezzanineVM.PrescriptionItemList.Where((x, p) => p > firstPos && x.PrescrptionItem.OsInstance.OsSeqGroupNo == firstItem.PrescrptionItem.OsInstance.OsSeqGroupNo).ForEach(x => {
            x.PrescrptionItem.OsInstance.OsDisplayOrder = x.PrescrptionItem.OsInstance.OsDisplayOrder + 1;
        });
        nextItem.PrescrptionItem.OsInstance.OsSeqGroupNo = firstItem.PrescrptionItem.OsInstance.OsSeqGroupNo;
        this.MoveLinkItem(otherPos, firstPos);
        this.grdPatientSelect.Select(_selectedRows);
        this.IsBusy = false;
    }
    public cmdMoveDown_Click(sender: Object, e: RoutedEventArgs): void {
        // if (this.IsBusy)
        //     return
        // this.IsBusy = true;
        // let _selectedRows: any = this.grdPatientSelect.GetSelectedRows().ToArray();
        // let temp = this.objOrderSetSecMezzanineVM.PrescriptionItemList;
        this.grdPatientSelect.MoveRowDown();
        // this.objOrderSetSecMezzanineVM.PrescriptionItemList = temp;
        // if (_selectedRows.Length > 0) {
        //     if (_selectedRows.Length == 1) {
        //         let selectedItem: PrescriptionItemAssociations = ObjectHelper.CreateType<PrescriptionItemAssociations>(_selectedRows[0], PrescriptionItemAssociations);
        //         let pos: number = this.objOrderSetSecMezzanineVM.PrescriptionItemList.IndexOf(selectedItem);
        //         if (this.objOrderSetSecMezzanineVM.PrescriptionItemList.Count <= pos + 1) {
        //             this.IsBusy = false;
        //             return
        //         }
        //         if (selectedItem.PrescrptionItem != null && selectedItem.PrescrptionItem.OsInstance != null && selectedItem.PrescrptionItem.OsInstance.OsIsLastItem) {
        //             let seqNo: number = selectedItem.PrescrptionItem.OsInstance.OsSeqGroupNo;
        //             selectedItem.PrescrptionItem.OsInstance.OsIsSequential = false;
        //             selectedItem.PrescrptionItem.OsInstance.OsIsFirstItem = false;
        //             selectedItem.PrescrptionItem.OsInstance.OsIsLastItem = false;
        //             selectedItem.PrescrptionItem.OsInstance.OsDisplayOrder = 0;
        //             if (!selectedItem.PrescrptionItem.OsInstance.OsIsFirstItem) {
        //                 let lastItem: PrescriptionItemAssociations = this.objOrderSetSecMezzanineVM.PrescriptionItemList.Where(x => x != null && x != selectedItem && x.PrescrptionItem != null && x.PrescrptionItem.OsInstance != null && !x.PrescrptionItem.OsInstance.OsIsGroupHeader && x.PrescrptionItem.OsInstance.OsSeqGroupNo == seqNo).OrderBy(x => x.PrescrptionItem.OsInstance.OsSeqGroupNo).LastOrDefault();
        //                 if (lastItem != null) {
        //                     lastItem.PrescrptionItem.OsInstance.OsIsLastItem = true;
        //                 }
        //             }
        //             else {
        //                 selectedItem.PrescrptionItem.OsInstance.OsIsFirstItem = false;
        //             }
        //             selectedItem.PrescrptionItem.OsInstance.OsSeqGroupNo = 0;
        //             this.MoveUpDownItem(pos, pos + 1);
        //         }
        //         else if (selectedItem.PrescrptionItem.OsInstance.OsIsGroupHeader) {
        //             this.MoveUpDownItem(pos, pos + 1);
        //             if (selectedItem.PrescrptionItem.OsInstance.OsIsSequential) {
        //                 this.SetClearAllowAdjustStartTime(selectedItem);
        //             }
        //         }
        //         else {
        //             let otherItem: PrescriptionItemAssociations = ObjectHelper.CreateType<PrescriptionItemAssociations>(this.objOrderSetSecMezzanineVM.PrescriptionItemList[pos + 1], PrescriptionItemAssociations);
        //             if (otherItem.PrescrptionItem.OsInstance.OsIsGroupHeader) {
        //                 this.MoveUpDownItem(pos, pos + 1);
        //                 if (selectedItem.PrescrptionItem.OsInstance.OsIsSequential) {
        //                     this.SetClearAllowAdjustStartTime(selectedItem);
        //                 }
        //             }
        //             else {
        //                 if (selectedItem.PrescrptionItem.OsInstance.OsIsSequential == otherItem.PrescrptionItem.OsInstance.OsIsSequential) {
        //                     if (selectedItem.PrescrptionItem.OsInstance.OsIsSequential) {
        //                         let otherItemValidation = OsValidation.GetOsValidation(ObjectHelper.CreateType<PrescriptionItemAssociations>(otherItem, PrescriptionItemAssociations), true);
        //                         let errorMessage: string = String.Empty;
        //                         if (!otherItemValidation.HavingInfusionPeriod && !otherItemValidation.HavingDuration) {
        //                             errorMessage = Resource.MedicationErrors.HaveDurationInfusionPeriodLinkError;
        //                         }
        //                         if (!String.IsNullOrEmpty(errorMessage)) {
        //                             this.ShoCustomMessage(errorMessage);
        //                             return
        //                         }
        //                         let _seqNo: number = selectedItem.PrescrptionItem.OsInstance.OsDisplayOrder;
        //                         selectedItem.PrescrptionItem.OsInstance.OsDisplayOrder = otherItem.PrescrptionItem.OsInstance.OsDisplayOrder;
        //                         otherItem.PrescrptionItem.OsInstance.OsDisplayOrder = _seqNo;
        //                         let _isFirstItem: boolean = selectedItem.PrescrptionItem.OsInstance.OsIsFirstItem;
        //                         selectedItem.PrescrptionItem.OsInstance.OsIsFirstItem = otherItem.PrescrptionItem.OsInstance.OsIsFirstItem;
        //                         otherItem.PrescrptionItem.OsInstance.OsIsFirstItem = _isFirstItem;
        //                         if (otherItem.PrescrptionItem.OsInstance.OsIsFirstItem && otherItem.StartDTTM == DateTime.MinValue) {
        //                             let _serverDateTime: DateTime = CommonBB.GetServerDateTime();
        //                             otherItem.StartDTTM = _serverDateTime;
        //                             otherItem.StartPrescriptionTime = _serverDateTime;
        //                         }
        //                         let _isLastItem: boolean = selectedItem.PrescrptionItem.OsInstance.OsIsLastItem;
        //                         selectedItem.PrescrptionItem.OsInstance.OsIsLastItem = otherItem.PrescrptionItem.OsInstance.OsIsLastItem;
        //                         otherItem.PrescrptionItem.OsInstance.OsIsLastItem = _isLastItem;
        //                     }
        //                     this.MoveUpDownItem(pos, pos + 1);
        //                     if (selectedItem.PrescrptionItem.OsInstance.OsIsSequential) {
        //                         this.SetClearAllowAdjustStartTime(selectedItem);
        //                     }
        //                 }
        //                 else {
        //                     if (selectedItem.PrescrptionItem.OsInstance.OsIsSequential) {
        //                         let seqNo: number = selectedItem.PrescrptionItem.OsInstance.OsSeqGroupNo;
        //                         selectedItem.PrescrptionItem.OsInstance.OsIsSequential = false;
        //                         selectedItem.PrescrptionItem.OsInstance.OsIsFirstItem = false;
        //                         selectedItem.PrescrptionItem.OsInstance.OsIsLastItem = false;
        //                         selectedItem.PrescrptionItem.OsInstance.OsDisplayOrder = 0;
        //                         if (!selectedItem.PrescrptionItem.OsInstance.OsIsFirstItem) {
        //                             let lastItem: PrescriptionItemAssociations = this.objOrderSetSecMezzanineVM.PrescriptionItemList.Where(x => x != null && x != selectedItem && x.PrescrptionItem != null && x.PrescrptionItem.OsInstance != null && !x.PrescrptionItem.OsInstance.OsIsGroupHeader && x.PrescrptionItem.OsInstance.OsSeqGroupNo == seqNo).OrderBy(x => x.PrescrptionItem.OsInstance.OsSeqGroupNo).LastOrDefault();
        //                             if (lastItem != null) {
        //                                 lastItem.PrescrptionItem.OsInstance.OsIsLastItem = true;
        //                             }
        //                         }
        //                         else {
        //                             selectedItem.PrescrptionItem.OsInstance.OsIsFirstItem = false;
        //                         }
        //                         selectedItem.PrescrptionItem.OsInstance.OsSeqGroupNo = 0;
        //                         this.MoveUpDownItem(pos, pos + 1);
        //                     }
        //                     else {
        //                         if (pos != 0) {
        //                             let sequentialItem = otherItem;
        //                             let nonSequenceItem = selectedItem;
        //                             let errorCount: number = 0;
        //                             let errorMessage: string = String.Empty;
        //                             let sequenceItemValidation = OsValidation.GetOsValidation(sequentialItem, true);
        //                             let nonSequenceItemValidation = OsValidation.GetOsValidation(nonSequenceItem, true);
        //                             if (nonSequenceItemValidation.IsStatOnceOnlyOrPrn) {
        //                                 errorCount++;
        //                                 errorMessage = Resource.MedicationErrors.IsStatOnceOnlyOrPrnError;
        //                             }
        //                             if (nonSequenceItemValidation.IsApplianceMedGasSVOrPCA || nonSequenceItemValidation.IsTitrated || nonSequenceItemValidation.IsInfusion && nonSequenceItemValidation.IsIntermittend) {
        //                                 errorCount++;
        //                                 errorMessage = Resource.MedicationErrors.IsApplianceMedGasSVOrPCAError;
        //                             }
        //                             if (!sequenceItemValidation.HavingInfusionPeriod && !sequenceItemValidation.HavingDuration) {
        //                                 errorCount++;
        //                                 errorMessage = Resource.MedicationErrors.HaveDurationInfusionPeriodLinkError;
        //                             }
        //                             if (sequenceItemValidation.IsInfusion != nonSequenceItemValidation.IsInfusion) {
        //                                 errorCount++;
        //                                 errorMessage = Resource.MedicationErrors.HavingIVAndNonIVError;
        //                             }
        //                             if (errorCount > 1) {
        //                                 errorMessage = Resource.MedicationErrors.OrdersetMultipleValidationError;
        //                                 this.ShoCustomMessage(errorMessage);
        //                                 return
        //                             }
        //                             else if (!String.IsNullOrEmpty(errorMessage)) {
        //                                 this.ShoCustomMessage(errorMessage);
        //                                 return
        //                             }
        //                         }
        //                         selectedItem.PrescrptionItem.OsInstance.OsIsSequential = true;
        //                         selectedItem.PrescrptionItem.OsInstance.OsSeqGroupNo = otherItem.PrescrptionItem.OsInstance.OsSeqGroupNo;
        //                         otherItem.PrescrptionItem.OsInstance.OsDisplayOrder = 1;
        //                         selectedItem.PrescrptionItem.OsInstance.OsDisplayOrder = 2;
        //                         otherItem.PrescrptionItem.OsInstance.OsIsFirstItem = true;
        //                         if (otherItem.StartDTTM == DateTime.MinValue) {
        //                             let _serverDateTime: DateTime = CommonBB.GetServerDateTime();
        //                             otherItem.StartDTTM = _serverDateTime;
        //                             otherItem.StartPrescriptionTime = _serverDateTime;
        //                         }
        //                         selectedItem.PrescrptionItem.OsInstance.OsIsFirstItem = false;
        //                         selectedItem.PrescrptionItem.OsInstance.OsIsLastItem = otherItem.PrescrptionItem.OsInstance.OsIsLastItem;
        //                         otherItem.PrescrptionItem.OsInstance.OsIsLastItem = false;
        //                         this.objOrderSetSecMezzanineVM.PrescriptionItemList.Where((x, p) => p > pos + 1 && x.PrescrptionItem.OsInstance.OsSeqGroupNo == otherItem.PrescrptionItem.OsInstance.OsSeqGroupNo).ForEach(x => {
        //                             x.PrescrptionItem.OsInstance.OsDisplayOrder = x.PrescrptionItem.OsInstance.OsDisplayOrder + 1;
        //                         });
        //                         this.MoveUpDownItem(pos, pos + 1);
        //                     }
        //                 }
        //             }
        //         }
        //     }
        // }
        // this.grdPatientSelect.Select(_selectedRows);
        // if (_selectedRows.Length > 0) {
        //     this.grdPatientSelect.ScrollIntoView(_selectedRows[0]);
        // }
        this.MoveUpCanbeEnabledVisible();
        this.MoveDownCanbeEnabledVisible();
        this.grdPatientSelect.Rebind();
        // this.IsBusy = false;
    }
    public cmdMoveUp_Click(sender: Object, e: RoutedEventArgs): void {
        // if (this.IsBusy)
        //     return
        // this.IsBusy = true;
        // let _selectedRows: any = this.grdPatientSelect.GetSelectedRows().ToArray();
        // let tempData = this.objOrderSetSecMezzanineVM.PrescriptionItemList;
        this.grdPatientSelect.MoveRowUp();
        // this.objOrderSetSecMezzanineVM.PrescriptionItemList = tempData;
        // if (_selectedRows.Length > 0) {
        //     if (_selectedRows.Length == 1) {
        //         let selectedItem: PrescriptionItemAssociations = ObjectHelper.CreateType<PrescriptionItemAssociations>(_selectedRows[0], PrescriptionItemAssociations);
        //         let pos: number = this.objOrderSetSecMezzanineVM.PrescriptionItemList.IndexOf(selectedItem);
        //         if (pos == 0) {
        //             this.IsBusy = false;
        //             return
        //         }
        //         if (selectedItem.PrescrptionItem != null && selectedItem.PrescrptionItem.OsInstance != null && selectedItem.PrescrptionItem.OsInstance.OsIsFirstItem && !selectedItem.PrescrptionItem.OsInstance.OsIsProtected) {
        //             selectedItem.PrescrptionItem.OsInstance.OsIsSequential = false;
        //             selectedItem.PrescrptionItem.OsInstance.OsIsFirstItem = false;
        //             selectedItem.PrescrptionItem.OsInstance.OsDisplayOrder = 0;
        //             if (!selectedItem.PrescrptionItem.OsInstance.OsIsLastItem) {
        //                 let seqNo: number = selectedItem.PrescrptionItem.OsInstance.OsSeqGroupNo;
        //                 let firstItem: PrescriptionItemAssociations = this.objOrderSetSecMezzanineVM.PrescriptionItemList.Where(x => x != null && x != selectedItem && x.PrescrptionItem != null && x.PrescrptionItem.OsInstance != null && !x.PrescrptionItem.OsInstance.OsIsGroupHeader && x.PrescrptionItem.OsInstance.OsSeqGroupNo == seqNo).OrderBy(x => x.PrescrptionItem.OsInstance.OsSeqGroupNo).FirstOrDefault();
        //                 firstItem.PrescrptionItem.OsInstance.OsIsFirstItem = true;
        //                 if (firstItem.StartDTTM == DateTime.MinValue) {
        //                     let _serverDateTime: DateTime = CommonBB.GetServerDateTime();
        //                     firstItem.StartDTTM = _serverDateTime;
        //                     firstItem.StartPrescriptionTime = _serverDateTime;
        //                 }
        //             }
        //             else {
        //                 selectedItem.PrescrptionItem.OsInstance.OsIsLastItem = false;
        //             }
        //             {
        //                 this.objOrderSetSecMezzanineVM.PrescriptionItemList.Where((x, p) => p > pos && x.PrescrptionItem.OsInstance.OsSeqGroupNo == selectedItem.PrescrptionItem.OsInstance.OsSeqGroupNo).ForEach(x => {
        //                     x.PrescrptionItem.OsInstance.OsDisplayOrder = x.PrescrptionItem.OsInstance.OsDisplayOrder - 1;
        //                 });
        //             }
        //             selectedItem.PrescrptionItem.OsInstance.OsSeqGroupNo = 0;
        //             this.MoveUpDownItem(pos, pos - 1);
        //         }
        //         else if (selectedItem.PrescrptionItem.OsInstance.OsIsGroupHeader) {
        //             this.MoveUpDownItem(pos, pos - 1);
        //             if (selectedItem.PrescrptionItem.OsInstance.OsIsSequential) {
        //                 this.SetClearAllowAdjustStartTime(selectedItem);
        //             }
        //         }
        //         else {
        //             let otherItem: PrescriptionItemAssociations = ObjectHelper.CreateType<PrescriptionItemAssociations>(this.objOrderSetSecMezzanineVM.PrescriptionItemList[pos - 1], PrescriptionItemAssociations);
        //             if (otherItem.PrescrptionItem.OsInstance.OsIsGroupHeader) {
        //                 this.MoveUpDownItem(pos, pos - 1);
        //                 if (selectedItem.PrescrptionItem.OsInstance.OsIsSequential) {
        //                     this.SetClearAllowAdjustStartTime(selectedItem);
        //                 }
        //             }
        //             else {
        //                 if (selectedItem.PrescrptionItem.OsInstance.OsIsSequential == otherItem.PrescrptionItem.OsInstance.OsIsSequential) {
        //                     if (selectedItem.PrescrptionItem.OsInstance.OsIsSequential) {
        //                         let errorMessage: string = String.Empty;
        //                         let selectedItemValidation = OsValidation.GetOsValidation(ObjectHelper.CreateType<PrescriptionItemAssociations>(selectedItem, PrescriptionItemAssociations), true);
        //                         if (!selectedItemValidation.HavingInfusionPeriod && !selectedItemValidation.HavingDuration) {
        //                             errorMessage = Resource.MedicationErrors.HaveDurationInfusionPeriodLinkError;
        //                         }
        //                         if (!String.IsNullOrEmpty(errorMessage)) {
        //                             this.ShoCustomMessage(errorMessage);
        //                             return
        //                         }
        //                         let _seqNo: number = selectedItem.PrescrptionItem.OsInstance.OsDisplayOrder;
        //                         selectedItem.PrescrptionItem.OsInstance.OsDisplayOrder = otherItem.PrescrptionItem.OsInstance.OsDisplayOrder;
        //                         otherItem.PrescrptionItem.OsInstance.OsDisplayOrder = _seqNo;
        //                         let _isFirstItem: boolean = selectedItem.PrescrptionItem.OsInstance.OsIsFirstItem;
        //                         selectedItem.PrescrptionItem.OsInstance.OsIsFirstItem = otherItem.PrescrptionItem.OsInstance.OsIsFirstItem;
        //                         if (selectedItem.PrescrptionItem.OsInstance.OsIsFirstItem && selectedItem.StartDTTM == DateTime.MinValue) {
        //                             let _serverDateTime: DateTime = CommonBB.GetServerDateTime();
        //                             selectedItem.StartDTTM = _serverDateTime;
        //                             selectedItem.StartPrescriptionTime = _serverDateTime;
        //                         }
        //                         otherItem.PrescrptionItem.OsInstance.OsIsFirstItem = _isFirstItem;
        //                         if (otherItem.PrescrptionItem.OsInstance.OsIsFirstItem && otherItem.StartDTTM == DateTime.MinValue) {
        //                             let _serverDateTime: DateTime = CommonBB.GetServerDateTime();
        //                             otherItem.StartDTTM = _serverDateTime;
        //                             otherItem.StartPrescriptionTime = _serverDateTime;
        //                         }
        //                         let _isLastItem: boolean = selectedItem.PrescrptionItem.OsInstance.OsIsLastItem;
        //                         selectedItem.PrescrptionItem.OsInstance.OsIsLastItem = otherItem.PrescrptionItem.OsInstance.OsIsLastItem;
        //                         otherItem.PrescrptionItem.OsInstance.OsIsLastItem = _isLastItem;
        //                     }
        //                     this.MoveUpDownItem(pos, pos - 1);
        //                     if (selectedItem.PrescrptionItem.OsInstance.OsIsSequential) {
        //                         this.SetClearAllowAdjustStartTime(otherItem);
        //                     }
        //                 }
        //                 else {
        //                     if (selectedItem.PrescrptionItem.OsInstance.OsIsSequential) {
        //                         selectedItem.PrescrptionItem.OsInstance.OsIsSequential = false;
        //                         selectedItem.PrescrptionItem.OsInstance.OsIsFirstItem = false;
        //                         selectedItem.PrescrptionItem.OsInstance.OsDisplayOrder = 0;
        //                         if (!selectedItem.PrescrptionItem.OsInstance.OsIsLastItem) {
        //                             let seqNo: number = selectedItem.PrescrptionItem.OsInstance.OsSeqGroupNo;
        //                             let firstItem: PrescriptionItemAssociations = this.objOrderSetSecMezzanineVM.PrescriptionItemList.Where(x => x != null && x != selectedItem && x.PrescrptionItem != null && x.PrescrptionItem.OsInstance != null && !x.PrescrptionItem.OsInstance.OsIsGroupHeader && x.PrescrptionItem.OsInstance.OsSeqGroupNo == seqNo).OrderBy(x => x.PrescrptionItem.OsInstance.OsSeqGroupNo).FirstOrDefault();
        //                             firstItem.PrescrptionItem.OsInstance.OsIsFirstItem = true;
        //                             if (firstItem.StartDTTM == DateTime.MinValue) {
        //                                 let _serverDateTime: DateTime = CommonBB.GetServerDateTime();
        //                                 firstItem.StartDTTM = _serverDateTime;
        //                                 firstItem.StartPrescriptionTime = _serverDateTime;
        //                             }
        //                         }
        //                         else {
        //                             selectedItem.PrescrptionItem.OsInstance.OsIsLastItem = false;
        //                         }
        //                         {
        //                             this.objOrderSetSecMezzanineVM.PrescriptionItemList.Where((x, p) => p > pos && x.PrescrptionItem.OsInstance.OsSeqGroupNo == selectedItem.PrescrptionItem.OsInstance.OsSeqGroupNo).ForEach(x => {
        //                                 x.PrescrptionItem.OsInstance.OsDisplayOrder = x.PrescrptionItem.OsInstance.OsDisplayOrder - 1;
        //                             });
        //                         }
        //                         selectedItem.PrescrptionItem.OsInstance.OsSeqGroupNo = 0;
        //                         this.MoveUpDownItem(pos, pos - 1);
        //                     }
        //                     else {
        //                         {
        //                             let sequenceItem = otherItem;
        //                             let nonSequenceItem = selectedItem;
        //                             let errorCount: number = 0;
        //                             let errorMessage: string = String.Empty;
        //                             let sequenceItemValidation = OsValidation.GetOsValidation(sequenceItem, true);
        //                             let nonSequenceItemValidation = OsValidation.GetOsValidation(nonSequenceItem, true);
        //                             if (nonSequenceItemValidation.IsStatOnceOnlyOrPrn) {
        //                                 errorCount++;
        //                                 errorMessage = Resource.MedicationErrors.IsStatOnceOnlyOrPrnError;
        //                             }
        //                             if (nonSequenceItemValidation.IsApplianceMedGasSVOrPCA || nonSequenceItemValidation.IsTitrated || nonSequenceItemValidation.IsInfusion && nonSequenceItemValidation.IsIntermittend) {
        //                                 errorCount++;
        //                                 errorMessage = Resource.MedicationErrors.IsApplianceMedGasSVOrPCAError;
        //                             }
        //                             if (!nonSequenceItemValidation.HavingInfusionPeriod && !nonSequenceItemValidation.HavingDuration) {
        //                                 errorCount++;
        //                                 errorMessage = Resource.MedicationErrors.HaveDurationInfusionPeriodLinkError;
        //                             }
        //                             if (sequenceItemValidation.IsInfusion != nonSequenceItemValidation.IsInfusion) {
        //                                 errorCount++;
        //                                 errorMessage = Resource.MedicationErrors.HavingIVAndNonIVError;
        //                             }
        //                             if (errorCount > 1) {
        //                                 errorMessage = Resource.MedicationErrors.OrdersetMultipleValidationError;
        //                                 this.ShoCustomMessage(errorMessage);
        //                                 return
        //                             }
        //                             else if (!String.IsNullOrEmpty(errorMessage)) {
        //                                 this.ShoCustomMessage(errorMessage);
        //                                 return
        //                             }
        //                         }
        //                         if (otherItem == null || otherItem.PrescrptionItem == null || otherItem.PrescrptionItem.OsInstance == null || !otherItem.PrescrptionItem.OsInstance.OsIsFirstItem) {
        //                             this.SetClearAllowAdjustStartTime(selectedItem);
        //                         }
        //                         this.SetClearAllowAdjustStartTime(otherItem);
        //                         selectedItem.PrescrptionItem.OsInstance.OsIsSequential = true;
        //                         selectedItem.PrescrptionItem.OsInstance.OsSeqGroupNo = otherItem.PrescrptionItem.OsInstance.OsSeqGroupNo;
        //                         selectedItem.PrescrptionItem.OsInstance.OsDisplayOrder = otherItem.PrescrptionItem.OsInstance.OsDisplayOrder;
        //                         selectedItem.PrescrptionItem.OsInstance.OsIsFirstItem = otherItem.PrescrptionItem.OsInstance.OsIsFirstItem;
        //                         if (selectedItem.PrescrptionItem.OsInstance.OsIsFirstItem && selectedItem.StartDTTM == DateTime.MinValue) {
        //                             let _serverDateTime: DateTime = CommonBB.GetServerDateTime();
        //                             selectedItem.StartDTTM = _serverDateTime;
        //                             selectedItem.StartPrescriptionTime = _serverDateTime;
        //                         }
        //                         otherItem.PrescrptionItem.OsInstance.OsIsFirstItem = false;
        //                         otherItem.PrescrptionItem.OsInstance.OsDisplayOrder = selectedItem.PrescrptionItem.OsInstance.OsDisplayOrder + 1;
        //                         otherItem.PrescrptionItem.OsInstance.OsIsLastItem = true;
        //                         selectedItem.PrescrptionItem.OsInstance.OsIsLastItem = false;
        //                         this.MoveUpDownItem(pos, pos - 1);
        //                     }
        //                 }
        //             }
        //         }
        //     }
        // }
        // this.grdPatientSelect.Select(_selectedRows);
        // if (_selectedRows.Length > 0) {
        //     this.grdPatientSelect.ScrollIntoView(_selectedRows[0]);
        // }
        this.MoveDownCanbeEnabledVisible();
        this.MoveUpCanbeEnabledVisible();
        this.grdPatientSelect.Rebind();
        // this.IsBusy = false;
    }
    rowCallback = (context: RowClassArgs) => {
        let rowStyles = this.grdPatientSelect.getRowStyles(context); 
        return rowStyles;
    };
    public ShoCustomMessage(message: string): void {
        let oMsgBox: iMessageBox = new iMessageBox();
        // oMsgBox.MessageBoxClose += new EventHandler<MessageEventArgs>((sender: Object, e: MessageEventArgs) => {
        //     this.IsBusy = false;
        // });
        oMsgBox.Title = "Information - Lorenzo";
        // oMsgBox.MessageButton = LORENZO.BlueBird.Controls.MessageBoxButton.OK;
        oMsgBox.MessageButton = MessageBoxButton.OK;
        oMsgBox.IconType = MessageBoxType.Information;
        oMsgBox.Message = message;
        oMsgBox.Show();
    }
    public MoveLinkItem(nonSeqPos: number, seqPos: number): void {
        let selectedItem: PrescriptionItemAssociations = ObjectHelper.CreateType<PrescriptionItemAssociations>(this.objOrderSetSecMezzanineVM.PrescriptionItemList[nonSeqPos], PrescriptionItemAssociations);
        if (nonSeqPos < seqPos) {
            let toLast: boolean = this.objOrderSetSecMezzanineVM.PrescriptionItemList.Count - 1 == seqPos;
            this.objOrderSetSecMezzanineVM.PrescriptionItemList.RemoveAt(nonSeqPos);
            if (toLast) {
                this.objOrderSetSecMezzanineVM.PrescriptionItemList.Add(selectedItem);
            }
            else {
                this.objOrderSetSecMezzanineVM.PrescriptionItemList.Insert(seqPos, selectedItem);
            }
        }
        else if (nonSeqPos > seqPos) {
            this.objOrderSetSecMezzanineVM.PrescriptionItemList.RemoveAt(nonSeqPos);
            if (seqPos + 1 == this.objOrderSetSecMezzanineVM.PrescriptionItemList.Count)
                this.objOrderSetSecMezzanineVM.PrescriptionItemList.Add(selectedItem);
            else this.objOrderSetSecMezzanineVM.PrescriptionItemList.Insert(seqPos + 1, selectedItem);
        }
    }
    public MoveUpDownItem(fromPos: number, toPos: number): void {
        let selectedItem: PrescriptionItemAssociations = ObjectHelper.CreateType<PrescriptionItemAssociations>(this.objOrderSetSecMezzanineVM.PrescriptionItemList[fromPos], PrescriptionItemAssociations);
        if (fromPos <= toPos) {
            let toLast: boolean = this.objOrderSetSecMezzanineVM.PrescriptionItemList.Count == toPos;
            this.objOrderSetSecMezzanineVM.PrescriptionItemList.RemoveAt(fromPos);
            if (toLast) {
                this.objOrderSetSecMezzanineVM.PrescriptionItemList.Add(selectedItem);
            }
            else {
                this.objOrderSetSecMezzanineVM.PrescriptionItemList.Insert(toPos, selectedItem);
            }
        }
        else if (fromPos > toPos) {
            this.objOrderSetSecMezzanineVM.PrescriptionItemList.RemoveAt(fromPos);
            this.objOrderSetSecMezzanineVM.PrescriptionItemList.Insert(toPos, selectedItem);
        }
    }
    public SetClearAllowAdjustStartTime(pItemAssoc: PrescriptionItemAssociations): void {
        pItemAssoc.IsTimeAdjust = false;
        pItemAssoc.StartDTTM = null;
        pItemAssoc.StartPrescriptionTime = null;
        pItemAssoc.Offset = null;
    }
    objOrderSetSecMezzanineVM_OnShowHyperlink(IsVisible: boolean): void {
        this.lblGuidanceHyperlink.Visibility = (IsVisible ? Visibility.Visible : Visibility.Collapsed);
    }
    isProtectedSelectedNow: boolean = false;
    isProtectedDeselectedNow: boolean = false;
    selectDeselectSequenceId: number = 0;
    isSelectAll: boolean = null;
    /*Telerik.Windows.Controls.SelectionChangingEventArgs*/
    grdPatientSelect_SelectionChanging(sender: Object, e: SelectionChangingEventArgs): void {
        this.isSelectAll = null;
        if (!this.IsORSEditable) {
            e.Cancel = true;
            return
        }
        else {
            if (e.AddedItems.Count > 1 && this.objOrderSetSecMezzanineVM.PrescriptionItemList != null && this.objOrderSetSecMezzanineVM.PrescriptionItemList.Count == this.grdPatientSelect.GetSelectedRows().Count + e.AddedItems.Count) {
                // this.isSelectAll = e.AddedItems.Count != (this.objOrderSetSecMezzanineVM.IgnoreOrdetAssociations == null ? 0 : this.objOrderSetSecMezzanineVM.IgnoreOrdetAssociations.Length) + this.objOrderSetSecMezzanineVM.PrescriptionItemList.Count(x => x.PrescrptionItem.OsInstance.OsIsGroupHeader);
                this.isSelectAll = e.AddedItems.Count != (this.objOrderSetSecMezzanineVM.IgnoreOrdetAssociations == null ? 0 : this.objOrderSetSecMezzanineVM.IgnoreOrdetAssociations.Length) + this.objOrderSetSecMezzanineVM.PrescriptionItemList.Select(x => x.PrescrptionItem.OsInstance.OsIsGroupHeader).Count();
            }
            if (e.AddedItems.Count == 1 && this.objOrderSetSecMezzanineVM != null && this.objOrderSetSecMezzanineVM.IgnoreOrdetAssociations != null) {
                let ignoredItemBeingSelected = e.AddedItems.Select(x => ObjectHelper.CreateType<PrescriptionItemAssociations>(x, PrescriptionItemAssociations)).First();
                if (ignoredItemBeingSelected != null && ignoredItemBeingSelected.PrescrptionItem != null && ignoredItemBeingSelected.PrescrptionItem.OsInstance != null && ignoredItemBeingSelected.PrescrptionItem.OsInstance.OsIsGroupHeader) {
                    e.Cancel = true;
                    return
                }
                if (ignoredItemBeingSelected != null && ignoredItemBeingSelected.PrescrptionItem != null && ignoredItemBeingSelected.PrescrptionItem.FormViewerDetails != null && ignoredItemBeingSelected.PrescrptionItem.FormViewerDetails.BasicDetails != null && this.objOrderSetSecMezzanineVM.IgnoreOrdetAssociations != null && this.objOrderSetSecMezzanineVM.IgnoreOrdetAssociations.Any(y => y == ignoredItemBeingSelected.PrescrptionItem.FormViewerDetails.BasicDetails.OrdersetAssociationOID)) {
                    e.Cancel = true;
                    return
                }
            }
        }
        this.isProtectedSelectedNow = false;
        this.isProtectedDeselectedNow = false;
        let isClearking: boolean = (String.Compare(PatientContext.PrescriptionType, PrescriptionTypes.Clerking, StringComparison.OrdinalIgnoreCase) == 0 || PatientContext.ClerkFormViewDefaultBehavior == ClerkFormViewDeftBehaviour.LaunchFormMandatory);
        if (!isClearking) {
            if (e.AddedItems != null && e.AddedItems.Count > 0) {
                let sequenceId: number = e.AddedItems.Select(x => ObjectHelper.CreateType<PrescriptionItemAssociations>(x, PrescriptionItemAssociations)).Where(x => x.PrescrptionItem != null && x.PrescrptionItem.OsInstance.OsIsSequential && x.PrescrptionItem.OsInstance.OsIsProtected).Select(x => x.PrescrptionItem.OsInstance.OsSeqGroupNo).FirstOrDefault();
                if (sequenceId > 0) {
                    let isAlreadyProtectedSelected: boolean = this.grdPatientSelect.GetSelectedRows().Select(x => ObjectHelper.CreateType<PrescriptionItemAssociations>(x, PrescriptionItemAssociations)).Any(x => x.PrescrptionItem != null && x.PrescrptionItem.OsInstance.OsIsSequential && x.PrescrptionItem.OsInstance.OsIsProtected && x.PrescrptionItem.OsInstance.OsSeqGroupNo == sequenceId);
                    if (!isAlreadyProtectedSelected) {
                        this.isProtectedSelectedNow = true;
                        this.selectDeselectSequenceId = sequenceId;
                    }
                }
            }
            if (e.RemovedItems != null && e.RemovedItems.Count > 0) {
                let sequenceId: number = e.RemovedItems.Select(x => ObjectHelper.CreateType<PrescriptionItemAssociations>(x, PrescriptionItemAssociations)).Where(x => x.PrescrptionItem != null && x.PrescrptionItem.OsInstance.OsIsSequential && x.PrescrptionItem.OsInstance.OsIsProtected).Select(x => x.PrescrptionItem.OsInstance.OsSeqGroupNo).FirstOrDefault();
                if (sequenceId > 0) {
                    // let isAlreadyProtectedUnSelected = true;
                    // let isAlreadyProtectedUnSelected: boolean = this.objOrderSetSecMezzanineVM.PrescriptionItemList.Except(this.grdPatientSelect.GetSelectedRows().Select(x => ObjectHelper.CreateType<PrescriptionItemAssociations>(x, PrescriptionItemAssociations))).Any(x => x.PrescrptionItem != null && x.PrescrptionItem.OsInstance.OsIsSequential && x.PrescrptionItem.OsInstance.OsIsProtected && x.PrescrptionItem.OsInstance.OsSeqGroupNo == sequenceId);
                    let getSelectedRows = this.grdPatientSelect.GetSelectedRows().Select(x => ObjectHelper.CreateType<PrescriptionItemAssociations>(x, PrescriptionItemAssociations))
                    let isAlreadyProtectedUnSelected: boolean = this.objOrderSetSecMezzanineVM.PrescriptionItemList.Select((x) => !getSelectedRows.Contains(x)).Any(x => x.PrescrptionItem != null && x.PrescrptionItem.OsInstance.OsIsSequential && x.PrescrptionItem.OsInstance.OsIsProtected && x.PrescrptionItem.OsInstance.OsSeqGroupNo == sequenceId);
                    if (!isAlreadyProtectedUnSelected) {
                        this.isProtectedDeselectedNow = true;
                        this.selectDeselectSequenceId = sequenceId;
                    }
                }
            }
        }
    }
    grdPatientSelect_SelectionChanged(sender: Object, e: SelectionChangedEventArgs): void {
        // if (this.isSelectAll.HasValue) {
        //     if (this.isSelectAll.Value) {
        if (!this.IsORSEditable) {
            if (e.AddedItems && e.AddedItems.Count > 0) {
                let addedItems = new ObservableCollection<Object>();
                addedItems.Add(e.AddedItems[0]);
                this.grdPatientSelect.Unselect(addedItems);
            }
            if (e.RemovedItems && e.RemovedItems.Count > 0) {
                this.grdPatientSelect.SelectedItem = e.RemovedItems[0];
            }
            return;
        }
        else {
           if (e.AddedItems && e.AddedItems.Count > 0 && (e.AddedItems[0].PrescrptionItem.OsInstance.OsIsGroupHeader || e.AddedItems[0].PrescrptionItem.OsInstance.IsPrescribed)) {
                let addedItems = new ObservableCollection<Object>();
                addedItems.Add(e.AddedItems[0]);
                this.grdPatientSelect.Unselect(addedItems);
                return;
            }
            if (e.RemovedItems && e.RemovedItems.Count > 0 && (e.RemovedItems[0].PrescrptionItem.OsInstance.OsIsGroupHeader || e.RemovedItems[0].PrescrptionItem.OsInstance.IsPrescribed)) {
                this.grdPatientSelect.SelectedItem = e.RemovedItems[0];
                return;
            }
            if (this.objOrderSetSecMezzanineVM.IgnoreOrdetAssociations != null && this.objOrderSetSecMezzanineVM.IgnoreOrdetAssociations.Length > 0) {
                let defNonSelection = this.objOrderSetSecMezzanineVM.PrescriptionItemList.Where(x => x.PrescrptionItem == null || x.PrescrptionItem.OsInstance == null || x.PrescrptionItem.OsInstance.OsIsGroupHeader || x.PrescrptionItem.FormViewerDetails != null && x.PrescrptionItem.FormViewerDetails.BasicDetails != null && this.objOrderSetSecMezzanineVM.IgnoreOrdetAssociations.Any(y => x.PrescrptionItem.FormViewerDetails.BasicDetails.OrdersetAssociationOID == y));
                let selectedItems = this.grdPatientSelect.GetSelectedRows().Select(x => ObjectHelper.CreateType<PrescriptionItemAssociations>(x, PrescriptionItemAssociations));
                defNonSelection = defNonSelection.Where(x => selectedItems.Any(y => x == y));
                if (defNonSelection.Count() > 0) {
                    // this.grdPatientSelect.Unselect(defNonSelection);
                    return
                }
            }
            else {
                let defNonSelection = this.objOrderSetSecMezzanineVM.PrescriptionItemList.Where(x => x.PrescrptionItem == null || x.PrescrptionItem.OsInstance == null || x.PrescrptionItem.OsInstance.OsIsGroupHeader);
                let selectedItems = this.grdPatientSelect.GetSelectedRows().Select(x => ObjectHelper.CreateType<PrescriptionItemAssociations>(x, PrescriptionItemAssociations));
                defNonSelection = defNonSelection.Where(x => selectedItems.Any(y => x == y));
                if (defNonSelection.Count() > 0) {
                    // this.grdPatientSelect.Unselect(defNonSelection);
                    return
                }
            }
            let selectableItemsCount: number = 0;
            this.grdPatientSelect.ItemsSource.forEach((item, inx) => {
                if (!item.PrescrptionItem.OsInstance.IsPrescribed && !item.PrescrptionItem.OsInstance.OsIsGroupHeader) {
                    selectableItemsCount = selectableItemsCount + 1;
                }
            })
            if (selectableItemsCount == this.grdPatientSelect.GetSelectedRowCount()) {
                this.isSelectAll = true;
            }
            else {
                this.isSelectAll = false;
            }
            //     }
            //     else {
            //         this.grdPatientSelect.UnselectAll();
            //     }
            // }
            // if (this.isProtectedSelectedNow) {
            //     let seqId: number = this.selectDeselectSequenceId;
            //     // this.grdPatientSelect.Select(this.objOrderSetSecMezzanineVM.PrescriptionItemList.Except(this.grdPatientSelect.GetSelectedRows().Select(x => ObjectHelper.CreateType<PrescriptionItemAssociations>(x, PrescriptionItemAssociations))).Where(x => x.PrescrptionItem != null && x.PrescrptionItem.OsInstance.OsIsSequential && x.PrescrptionItem.OsInstance.OsIsProtected && x.PrescrptionItem.OsInstance.OsSeqGroupNo == seqId));
            // }
            // if (this.isProtectedDeselectedNow) {
            //     let seqId: number = this.selectDeselectSequenceId;
            //     // this.grdPatientSelect.Unselect(this.grdPatientSelect.GetSelectedRows().Select(x => ObjectHelper.CreateType<PrescriptionItemAssociations>(x, PrescriptionItemAssociations)).Where(x => x.PrescrptionItem != null && x.PrescrptionItem.OsInstance.OsIsSequential && x.PrescrptionItem.OsInstance.OsIsProtected && x.PrescrptionItem.OsInstance.OsSeqGroupNo == seqId));
            // }
            this.SetSequenceCanbeEnabledVisible();
            this.SequenceLinkCanbeEnabledVisible();
            this.ClearSequenceCanbeEnabledVisible();
            this.MoveDownCanbeEnabledVisible();
            this.MoveUpCanbeEnabledVisible();
        }
    }
    public SetSequenceCanbeEnabledVisible(): void {
        let isClearking: boolean = (String.Compare(PatientContext.PrescriptionType, PrescriptionTypes.Clerking, StringComparison.OrdinalIgnoreCase) == 0 || PatientContext.ClerkFormViewDefaultBehavior == ClerkFormViewDeftBehaviour.LaunchFormMandatory);
        if (isClearking) {
            this.objOrderSetSecMezzanineVM.IsSetSequenceVisible = Visibility.Collapsed;
            return
        }
        let selectedRows = this.grdPatientSelect.GetSelectedRows();
        let canBeVisible: boolean = true;
        let sequenceFound = this.objOrderSetSecMezzanineVM.PrescriptionItemList.Select(x => ObjectHelper.CreateType<PrescriptionItemAssociations>(x, PrescriptionItemAssociations)).Any(x => x.PrescrptionItem != null && x.PrescrptionItem.OsInstance.OsIsSequential);
        if (sequenceFound) {
            canBeVisible = false;
        }
        else {
            let normalItemCount = selectedRows.Select(x => ObjectHelper.CreateType<PrescriptionItemAssociations>(x, PrescriptionItemAssociations)).Where(x => x.PrescrptionItem != null && !(x != null && x.PrescrptionItem != null && x.PrescrptionItem.OsInstance != null && x.PrescrptionItem.OsInstance.OsIsGroupHeader)).Count();
            canBeVisible = normalItemCount > 1;
        }
        let IsOrdersetPartialPrescribe: boolean = this.objOrderSetSecMezzanineVM != null && this.objOrderSetSecMezzanineVM.IsPartialPrescribe;
        this.objOrderSetSecMezzanineVM.IsSetSequenceVisible = !IsOrdersetPartialPrescribe && canBeVisible ? Visibility.Visible : Visibility.Collapsed;
        this.objOrderSetSecMezzanineVM.IsSetSequenceEnabled = canBeVisible;
    }
    public ClearSequenceCanbeEnabledVisible(): void {
        let isClearking: boolean = (String.Compare(PatientContext.PrescriptionType, PrescriptionTypes.Clerking, StringComparison.OrdinalIgnoreCase) == 0 || PatientContext.ClerkFormViewDefaultBehavior == ClerkFormViewDeftBehaviour.LaunchFormMandatory);
        if (isClearking) {
            this.objOrderSetSecMezzanineVM.IsClearSequenceVisible = Visibility.Collapsed;
            return
        }
        let canBeVisible: boolean = this.objOrderSetSecMezzanineVM.PrescriptionItemList.Select(x => ObjectHelper.CreateType<PrescriptionItemAssociations>(x, PrescriptionItemAssociations)).Any(x => x.PrescrptionItem != null && x.PrescrptionItem.OsInstance.OsIsSequential && !x.PrescrptionItem.OsInstance.OsIsProtected);
        let IsOrdersetPartialPrescribe: boolean = this.objOrderSetSecMezzanineVM != null && this.objOrderSetSecMezzanineVM.IsPartialPrescribe;
        this.objOrderSetSecMezzanineVM.IsClearSequenceEnabled = canBeVisible;
        this.objOrderSetSecMezzanineVM.IsClearSequenceVisible = !IsOrdersetPartialPrescribe && canBeVisible ? Visibility.Visible : Visibility.Collapsed;
    }
    public SequenceLinkCanbeEnabledVisible(): void {
        let isClearking: boolean = (String.Compare(PatientContext.PrescriptionType, PrescriptionTypes.Clerking, StringComparison.OrdinalIgnoreCase) == 0 || PatientContext.ClerkFormViewDefaultBehavior == ClerkFormViewDeftBehaviour.LaunchFormMandatory);
        if (isClearking) {
            this.objOrderSetSecMezzanineVM.IsDoLinkVisible = Visibility.Collapsed;
            return
        }
        let canbeEnabled: boolean = true;
        let sequencialSelected = this.grdPatientSelect.GetSelectedRows().Select(x => ObjectHelper.CreateType<PrescriptionItemAssociations>(x, PrescriptionItemAssociations)).Where(x => x.PrescrptionItem != null && x.PrescrptionItem.OsInstance != null && !x.PrescrptionItem.OsInstance.OsIsGroupHeader && x.PrescrptionItem.OsInstance.OsIsSequential && x.PrescrptionItem.OsInstance.OsIsSequential);
        let nonSequencialSelected = this.grdPatientSelect.GetSelectedRows().Select(x => ObjectHelper.CreateType<PrescriptionItemAssociations>(x, PrescriptionItemAssociations)).Where(x => x.PrescrptionItem != null && x.PrescrptionItem.OsInstance != null && !x.PrescrptionItem.OsInstance.OsIsGroupHeader && !x.PrescrptionItem.OsInstance.OsIsSequential && !x.PrescrptionItem.OsInstance.OsIsSequential);
        if (sequencialSelected.Count() > 1 || nonSequencialSelected.Count() > 1) {
            canbeEnabled = false;
        }
        else if (sequencialSelected.Count() < 1 || nonSequencialSelected.Count() < 1) {
            canbeEnabled = false;
        }
        let IsOrdersetPartialPrescribe: boolean = this.objOrderSetSecMezzanineVM != null && this.objOrderSetSecMezzanineVM.IsPartialPrescribe;
        this.objOrderSetSecMezzanineVM.IsDoLinkEnabled = this.IsORSEditable && canbeEnabled;
        this.objOrderSetSecMezzanineVM.IsDoLinkVisible = !IsOrdersetPartialPrescribe && sequencialSelected.Count() > 0 && sequencialSelected.Where(x => x.PrescrptionItem.OsInstance.OsIsProtected).Count() == 0 && nonSequencialSelected.Count() > 0 ? Visibility.Visible : Visibility.Collapsed;
    }
    public MoveDownCanbeEnabledVisible(): void {
        let isClearking: boolean = (String.Compare(PatientContext.PrescriptionType, PrescriptionTypes.Clerking, StringComparison.OrdinalIgnoreCase) == 0 || PatientContext.ClerkFormViewDefaultBehavior == ClerkFormViewDeftBehaviour.LaunchFormMandatory);
        if (isClearking) {
            this.objOrderSetSecMezzanineVM.IsMoveDownVisible = Visibility.Collapsed;
            return
        }
        let selectedRows = this.grdPatientSelect.GetSelectedRows();
        let canbeEnabled: boolean = this.grdPatientSelect.GetSelectedRowsIndex().Count() == 1;
        if (canbeEnabled) {
            let selectedRowsWidthPos = selectedRows.Select((x) => { return { Row: x, Position: this.objOrderSetSecMezzanineVM.PrescriptionItemList.IndexOf(x as PrescriptionItemAssociations) } }).OrderBy(x => x.Position).ToArray();
            // if (selectedRowsWidthPos[0].Position == this.objOrderSetSecMezzanineVM.PrescriptionItemList.Count - 1) {
            //     canbeEnabled = false;
            // }
            if (this.grdPatientSelect.GetSelectedRowsIndex()[0] == this.objOrderSetSecMezzanineVM.PrescriptionItemList.Count - 1) {
                canbeEnabled = false;
            }
        }
        let IsOrdersetPartialPrescribe: boolean = this.objOrderSetSecMezzanineVM != null && this.objOrderSetSecMezzanineVM.IsPartialPrescribe;
        console.log(selectedRows.Select(x => ObjectHelper.CreateType<PrescriptionItemAssociations>(x, PrescriptionItemAssociations)).All(x => x == null || x.PrescrptionItem == null || x.PrescrptionItem.OsInstance == null || !x.PrescrptionItem.OsInstance.OsIsProtected))
        this.objOrderSetSecMezzanineVM.IsMoveDownVisible = !IsOrdersetPartialPrescribe && (this.grdPatientSelect.GetSelectedRowsIndex().Count() >= 1 && selectedRows.Select(x => ObjectHelper.CreateType<PrescriptionItemAssociations>(x, PrescriptionItemAssociations)).All(x => x == null || x.PrescrptionItem == null || x.PrescrptionItem.OsInstance == null || !x.PrescrptionItem.OsInstance.OsIsProtected)) ? Visibility.Visible : Visibility.Collapsed;
        this.objOrderSetSecMezzanineVM.IsMoveDownEnabled = this.IsORSEditable && canbeEnabled;
    }
    public  MoveUpCanbeEnabledVisible(): void {
        let isClearking: boolean = (String.Compare(PatientContext.PrescriptionType, PrescriptionTypes.Clerking, StringComparison.OrdinalIgnoreCase) == 0 || PatientContext.ClerkFormViewDefaultBehavior == ClerkFormViewDeftBehaviour.LaunchFormMandatory);
        if (isClearking) {
            this.objOrderSetSecMezzanineVM.IsMoveUpVisible = Visibility.Collapsed;
            return
        }
        let selectedRows = this.grdPatientSelect.GetSelectedRows().Where(x => x != undefined);
        let canbeEnabled: boolean = this.grdPatientSelect.GetSelectedRowsIndex().Count() == 1;
        if (canbeEnabled) {
            let selectedRowsWidthPos = selectedRows.Select(x => { return { Row: x, Position: this.objOrderSetSecMezzanineVM.PrescriptionItemList.IndexOf(x as PrescriptionItemAssociations) } }).OrderBy(x => x.Position).ToArray();
            let pos: number = selectedRowsWidthPos[0].Position;
            let selectedPrescriptionItemAssociation = ObjectHelper.CreateType<PrescriptionItemAssociations>(selectedRowsWidthPos[0].Row, PrescriptionItemAssociations);
            // if (selectedRowsWidthPos[0].Position == 0 || selectedPrescriptionItemAssociation != null && selectedPrescriptionItemAssociation.PrescrptionItem != null && selectedPrescriptionItemAssociation.PrescrptionItem.OsInstance != null && selectedPrescriptionItemAssociation.PrescrptionItem.OsInstance.OsIsSequential && !this.objOrderSetSecMezzanineVM.PrescriptionItemList.Select((x) => { return { Row: x, Position: this.objOrderSetSecMezzanineVM.PrescriptionItemList.IndexOf(x as PrescriptionItemAssociations) } }).Where(x => x.Position < pos).Any(x => x.Row == null || x.Row.PrescrptionItem == null || x.Row.PrescrptionItem.OsInstance == null || !x.Row.PrescrptionItem.OsInstance.OsIsGroupHeader)) {
                // canbeEnabled = false;
            // }
            if (this.grdPatientSelect.GetSelectedRowsIndex()[0] == 0) {
                canbeEnabled = false;
            }
        }
        let IsOrdersetPartialPrescribe: boolean = this.objOrderSetSecMezzanineVM != null && this.objOrderSetSecMezzanineVM.IsPartialPrescribe;
        console.log(selectedRows.Select(x => ObjectHelper.CreateType<PrescriptionItemAssociations>(x, PrescriptionItemAssociations)).All(x => x == null || x.PrescrptionItem == null || x.PrescrptionItem.OsInstance == null || !x.PrescrptionItem.OsInstance.OsIsProtected))
        this.objOrderSetSecMezzanineVM.IsMoveUpVisible = !IsOrdersetPartialPrescribe && (this.grdPatientSelect.GetSelectedRowsIndex().Count() >= 1 && selectedRows.Select(x => ObjectHelper.CreateType<PrescriptionItemAssociations>(x, PrescriptionItemAssociations)).All(x => x == null || x.PrescrptionItem == null || x.PrescrptionItem.OsInstance == null || !x.PrescrptionItem.OsInstance.OsIsProtected)) ? Visibility.Visible : Visibility.Collapsed;
        this.objOrderSetSecMezzanineVM.IsMoveUpEnabled = this.IsORSEditable && canbeEnabled;
    }
    objOrderSetSecMezzanineVM_OnOSItemsLoaded(IsEnabled: boolean, IsLinkDisabled: boolean): void {
        this.grdPatientSelect.SetBinding('data', this.DataContext.objPrescriptionList);
        this.grdPatientSelect.Columns["OpenFrmVewr"].IsVisible = this.objOrderSetSecMezzanineVM.IsDoNotOpenFormViewer && this.objOrderSetSecMezzanineVM.IsDoNotOpenFormViewer.HasValue && this.objOrderSetSecMezzanineVM.IsDoNotOpenFormViewer.Value;
        if (!IsEnabled) {
            let defSelection = this.objOrderSetSecMezzanineVM.PrescriptionItemList.Where(x => x.PrescrptionItem == null || x.PrescrptionItem.OsInstance == null || !x.PrescrptionItem.OsInstance.OsIsGroupHeader);
            if (this.objOrderSetSecMezzanineVM.IgnoreOrdetAssociations.Length > 0) {
                defSelection = defSelection.Where(x => x == null || x.PrescrptionItem == null || x.PrescrptionItem.FormViewerDetails == null || x.PrescrptionItem.FormViewerDetails.BasicDetails == null || !this.objOrderSetSecMezzanineVM.IgnoreOrdetAssociations.Any(y => x.PrescrptionItem.FormViewerDetails.BasicDetails.OrdersetAssociationOID == y));
            }
            this.grdPatientSelect.Select(defSelection);
        }
        this.IsORSEditable = IsEnabled;
        this.SetOkDisableIfNoActiveItems();
        // {
        //     this.SetSequenceCanbeEnabledVisible();
        //     this.SequenceLinkCanbeEnabledVisible();
        //     this.ClearSequenceCanbeEnabledVisible();
        //     this.MoveDownCanbeEnabledVisible();
        //     this.MoveUpCanbeEnabledVisible();
        // }
        if (IsLinkDisabled) {
            //(<OrderSetSecMezzanine>(((<ContentControl>this.Parent)).Content)).cmdLink.IsEnabled = false;
            this.cmdLink.IsEnabled = false;
        }
        if (this.objOrderSetSecMezzanineVM != null) {
            this.DRCCheckBox.IsChecked = this.objOrderSetSecMezzanineVM.IsDisableDRC ? true : false;
            if ((!this.objOrderSetSecMezzanineVM.IsDisableDRC || !((ProfileData.MedConflictConfig != null && ProfileData.MedConflictConfig.TurnOnDRC != null && ProfileData.MedConflictConfig.TurnOnDRC == '1') || (ProfileData.MedConflictConfig == null && PatientContext.IsTurnONDRC))) || PatientContext.PrescriptionType == PrescriptionTypes.Clerking || PatientContext.ClerkFormViewDefaultBehavior == ClerkFormViewDeftBehaviour.LaunchFormMandatory) {
                this.DRCCheckBox.Visibility = Visibility.Collapsed;
                this.DisableDRC.Visibility = Visibility.Collapsed;
                this.DisableDRCWarning.Visibility = Visibility.Collapsed;
                // let OrderSetLayoutRoot: Grid = ObjectHelper.CreateType<Grid>(this.FindName("LayoutRoot"), Grid);
                // RowDefinitions ==> RowDefinitionsArr
                // if (OrderSetLayoutRoot != null && OrderSetLayoutRoot.RowDefinitions != null && OrderSetLayoutRoot.RowDefinitions.Count >= 2) {
                // if (OrderSetLayoutRoot != null && OrderSetLayoutRoot.RowDefinitionsArr != null && OrderSetLayoutRoot.RowDefinitionsArr.Count() >= 2) {
                //     OrderSetLayoutRoot.RowDefinitions[1].Height = new GridLength(20);
                //     let OrderSetDisableDRC: Grid = ObjectHelper.CreateType<Grid>(OrderSetLayoutRoot.FindName("DRCDisableRow"), Grid);
                    // RowDefinitions ==> RowDefinitionsArr
                    // if (OrderSetDisableDRC != null && OrderSetDisableDRC.RowDefinitions != null && OrderSetDisableDRC.RowDefinitions.Count > 0) {
                //     if (OrderSetDisableDRC != null && OrderSetDisableDRC.RowDefinitionsArr != null && OrderSetDisableDRC.RowDefinitionsArr.Count() > 0) {
                //         OrderSetDisableDRC.RowDefinitions[0].Height = new GridLength(0);
                //     }
                // }
                let IsChecked: boolean = false;
                if (this.objOrderSetSecMezzanineVM != null && this.objOrderSetSecMezzanineVM.PrescriptionItemList != null) {
                    this.objOrderSetSecMezzanineVM.PrescriptionItemList.forEach((item) => {
                        if (item != null && item.PrescrptionItem != null && item.PrescrptionItem.FormViewerDetails != null && item.PrescrptionItem.FormViewerDetails.BasicDetails != null && item.PrescrptionItem.FormViewerDetails.BasicDetails.Ordersets != null) {
                            item.PrescrptionItem.FormViewerDetails.BasicDetails.Ordersets.IsDefault = IsChecked;
                        }
                    });
                }
            }
            else if ((this.objOrderSetSecMezzanineVM.IsDisableDRC && ((ProfileData.MedConflictConfig != null && ProfileData.MedConflictConfig.TurnOnDRC != null && ProfileData.MedConflictConfig.TurnOnDRC == '1') || (ProfileData.MedConflictConfig == null && PatientContext.IsTurnONDRC))) && PatientContext.PrescriptionType != PrescriptionTypes.Clerking && PatientContext.ClerkFormViewDefaultBehavior != ClerkFormViewDeftBehaviour.LaunchFormMandatory) {
                this.DRCCheckBox.Visibility = Visibility.Visible;
                this.DisableDRC.Visibility = Visibility.Visible;
                this.DisableDRCWarning.Visibility = Visibility.Visible;
            }
        }
    }
    public btnApply_Click(sender: Object, e: RoutedEventArgs): void {
        let StartDateTimeTop: DateTime = DateTime.MinValue;
        if (this.objOrderSetSecMezzanineVM != null && this.objOrderSetSecMezzanineVM.PrescriptionItemList != null) {
            this.objOrderSetSecMezzanineVM.PrescriptionItemList.forEach((item) => {
                if (item != null && item.IsTimeAdjust) {
                    if (String.Compare(PatientContext.PrescriptionType, PrescriptionTypes.Clerking, StringComparison.OrdinalIgnoreCase) != 0) {
                        item.StartDTTM = this.dtpSetDateTime.SelectedDateTime;
                        if (this.dtpSetDateTime && (this.dtpSetDateTime.SelectedDateTime == null || this.dtpSetDateTime.SelectedDateTime == DateTime.MinValue)) {
                            this.dtpStartDate.forEach((datepicker: iDateTimePicker) => {
                                datepicker.SelectedDateTime = DateTime.MinValue
                            })
                        }
                        
                    }
                    else {
                        item.StartDTTM = this.dtpSetDateTime.SelectedDateTime.Date;
                        if (this.dtpSetDateTime && (this.dtpSetDateTime.SelectedDateTime.Date == null || this.dtpSetDateTime.SelectedDateTime.Date == DateTime.MinValue)) {
                            this.dtpStartDate.forEach((datepicker: iDateTimePicker) => {
                                datepicker.SelectedDateTime = DateTime.MinValue
                            })
                        }
                    }
                    if (this.iTimeStartDateTime.Value != null) {
                        item.StartPrescriptionTime = this.iTimeStartDateTime.Value.GetValueOrDefault(DateTime.Now);
                    }
                    item.PrescrptionItem.FormViewerDetails.BasicDetails.IsDTTMSetViaORSMezzanine = true;
                    item.PrescrptionItem.FormViewerDetails.BasicDetails.TimeMinValueFlag = false;
                    if ((item.StartDTTM && (item.StartDTTM.Date != item.OriginalStartDTTM.Date)) || item.StartPrescriptionTime != item.OriginalStartPrescriptionTime) {
                        item.Offset = String.Empty;
                    }
                }
            });
        }
    }
    public dtpDate_OnDateChange(sender: Object, e: DateChangeEventArgs): void {
        let dt: DateTime = DateTime.MinValue;
        if (sender != null && !String.IsNullOrEmpty(e.DateValue.ToString())) {
            DateTime.TryParse(e.DateValue.ToString(), (o) => { dt = o; });
            let item: PrescriptionItemAssociations = ObjectHelper.CreateType<PrescriptionItemAssociations>((<FrameworkElement>(sender)).DataContext, PrescriptionItemAssociations);
            if (item != null && item.StartDTTM != DateTime.MinValue) {
                if (dt.Date != item.OriginalStartDTTM.Date) {
                    item.Offset = String.Empty;
                }
            }
        }
    }
    public iTimeStartTime_LostFocus(sender: Object, e: RoutedEventArgs): void {
        if (this.iTimeStartDateTime != null) {
            let item: PrescriptionItemAssociations = ObjectHelper.CreateType<PrescriptionItemAssociations>((<FrameworkElement>(this.iTimeStartDateTime)).DataContext, PrescriptionItemAssociations);
            if (item != null && item.StartPrescriptionTime != DateTime.MinValue) {
                if (item.StartPrescriptionTime != item.OriginalStartPrescriptionTime) {
                    item.Offset = String.Empty;
                }
            }
        }
    }
    // Telerik.Windows.Controls.GridView.RowLoadedEventArgs
    public grdPatientSelect_RowLoaded(sender: Object, e: RowLoadedEventArgs): void {
        if (e.Row != null && e.Row.Item != null) {
            let objlist: PrescriptionItemAssociations = ObjectHelper.CreateType<PrescriptionItemAssociations>(e.Row.Item, PrescriptionItemAssociations);
            if (objlist != null) {
                if (objlist.PrescrptionItem != null && objlist.PrescrptionItem.OsInstance.OsIsGroupHeader) {
                    e.dataItem['RowStyles'].push('PART_RowBordeTOP');
                    e.dataItem['RowStyles'].push('GroupHeader');
                    // this.grdPatientSelect.styles.push({ index: e.index, class:'PART_RowBordeTOP'});
                    // this.grdPatientSelect.styles.push({ index: e.index, class:'GroupHeader'});
                    // let rowBorder: Border = e.Row.ChildrenOfType<Border>().Where(c => c.Name == "PART_RowBordeTOP").First();
                    // rowBorder.Visibility = Visibility.Visible;
                    // rowBorder.BorderThickness = new Thickness(0, 2, 0, 0);
                    // let GS1: GradientStopCollection = new GradientStopCollection();
                    // GS1.Add(ObjectHelper.CreateObject(new GradientStop(), { Color: Color.FromArgb(255, 122, 194, 193), Offset: 0.6 }));
                    // GS1.Add(ObjectHelper.CreateObject(new GradientStop(), { Color: Color.FromArgb(255, 176, 218, 217), Offset: 0.4 }));
                    // e.Row.Background = new LinearGradientBrush(GS1, 90.0);
                    e.Row.IsAlternating = false;
                }
                else if (objlist.PrescrptionItem != null && objlist.PrescrptionItem.OsInstance.IsPrescribed) {
                    e.dataItem['RowStyles'].push('PART_RowBordeTOP');
                    e.dataItem['RowStyles'].push('Background_DISCONTINUED');
                    // this.grdPatientSelect.styles.push({
                    //     index: e.index,
                    //     class: 'PART_RowBordeTOP',
                    //   });
                    //   this.grdPatientSelect.styles.push({index: e.index, class:'Background_DISCONTINUED'});
                    // let rowBorder: Border = e.Row.ChildrenOfType<Border>().Where(c => c.Name == "PART_RowBordeTOP").First();
                    // rowBorder.Visibility = Visibility.Visible;
                    // e.Row.Background = new SolidColorBrush(Color.FromArgb(255, 204, 204, 204));
                    e.Row.IsAlternating = false;
                }
                else {
                    if (objlist.PrescrptionItem != null && objlist.PrescrptionItem.OsInstance.OsIsFirstItem) {
                        e.dataItem['RowStyles'].push('PART_RowBordeTOP');
                        // this.grdPatientSelect.styles.push({
                        //     index: e.index,
                        //     class: 'PART_RowBordeTOP',
                        //   });
                        // let rowBorder1: Border = e.Row.ChildrenOfType<Border>().Where(c => c.Name == "PART_RowBordeTOP").FirstOrDefault();
                        // if (rowBorder1 != null) {
                        //     rowBorder1.Visibility = Visibility.Visible;
                        //     rowBorder1.BorderBrush = new SolidColorBrush(Color.FromArgb(255, 63, 72, 204));
                        //     rowBorder1.BorderThickness = new Thickness(0, 2, 0, 0);
                        // }
                    }
                    if (objlist.PrescrptionItem != null && objlist.PrescrptionItem.OsInstance.OsIsLastItem) {
                        e.dataItem['RowStyles'].push('PART_RowBorder');
                        // this.grdPatientSelect.styles.push({
                        //     index: e.index,
                        //     class: 'PART_RowBorder',
                        //   });
                        // let rowBorder1: Border = e.Row.ChildrenOfType<Border>().Where(c => c.Name == "PART_RowBorder").FirstOrDefault();
                        // if (rowBorder1 != null) {
                        //     rowBorder1.Visibility = Visibility.Visible;
                        //     rowBorder1.BorderBrush = new SolidColorBrush(Color.FromArgb(255, 63, 72, 204));
                        //     rowBorder1.BorderThickness = new Thickness(0, 0, 0, 2);
                        // }
                    }
		             let selectableItemsCount: number = 0;
                     this.grdPatientSelect.ItemsSource.forEach((item, inx) => {
                        if (String.Compare(item.ActivityType, CAActivity.CA_PRESCRIBE) == 0 && !item.PrescrptionItem.OsInstance.IsPrescribed) {
                            if (String.Compare(item.Default, "yes", StringComparison.OrdinalIgnoreCase) == 0) {
                                if (item.PrescrptionItem.OsInstance == null || item.PrescrptionItem.OsInstance.UniqId == 0) {
                                    // e.Row.IsSelected = true;
                                    if (!this.grdPatientSelect.GetSelectedRowsIndex().includes(inx)) {
                                        this.grdPatientSelect.SelectedItem = item;
                                    }
                                }
                                else if (this.liDefaultSet == null || !this.liDefaultSet.Contains(item.PrescrptionItem.OsInstance.UniqId)) {
                                    // e.Row.IsSelected = true;
                                    if (!this.grdPatientSelect.GetSelectedRowsIndex().includes(inx)) {
                                        this.grdPatientSelect.SelectedItem = item;
                                    }
                                    if (this.liDefaultSet != null) {
                                        this.liDefaultSet.Add(item.PrescrptionItem.OsInstance.UniqId);
                                    }
                                }
                            }
                        }
                        else if (String.Compare(item.ActivityType, CAActivity.CA_REORDER) == 0 && !item.PrescrptionItem.OsInstance.IsPrescribed) {
                            if (item.PrescrptionItem.PrescriptionItemOID != 0) {
                                if (item.PrescrptionItem.OsInstance == null || item.PrescrptionItem.OsInstance.UniqId == 0) {
                                    // e.Row.IsSelected = true;
                                    if (!this.grdPatientSelect.GetSelectedRowsIndex().includes(inx)) {
                                        this.grdPatientSelect.SelectedItem = item;
                                    }
                                }
                                else if (this.liDefaultSet == null || !this.liDefaultSet.Contains(item.PrescrptionItem.OsInstance.UniqId)) {
                                    // e.Row.IsSelected = true;
                                    if (!this.grdPatientSelect.GetSelectedRowsIndex().includes(inx)) {
                                        this.grdPatientSelect.SelectedItem = item;
                                    }
                                    if (this.liDefaultSet != null) {
                                        this.liDefaultSet.Add(item.PrescrptionItem.OsInstance.UniqId);
                                    }
                                }
                            }
                        }
                        if (!item.PrescrptionItem.OsInstance.IsPrescribed && !item.PrescrptionItem.OsInstance.OsIsGroupHeader) {
                            selectableItemsCount = selectableItemsCount + 1;
                        }
                    })
                    if (selectableItemsCount == this.grdPatientSelect.GetSelectedRowCount()) {
                        this.isSelectAll = true;
                    }
                    else {
                        this.isSelectAll = false;
                    }
                }
            }
            let cellFormViewerIcon: GridViewCell = ObjectHelper.CreateType<GridViewCell>(e.Row.Cells[this.grdPatientSelect.GetColumnIndexByName("SequenceLink", true)], GridViewCell);
            if (cellFormViewerIcon != null) {
                let SequenceLinkIcon: Image = cellFormViewerIcon.ChildrenOfType<Image>().Where(x => x.Name == "SequentialIconlink").FirstOrDefault();
                if (SequenceLinkIcon != null) {
                    this.objOrderSetSecMezzanineVM.SequenciatlLinkButtonEvent(SequenceLinkIcon);
                }
            }
            {
                this.SetSequenceCanbeEnabledVisible();
                this.SequenceLinkCanbeEnabledVisible();
                this.ClearSequenceCanbeEnabledVisible();
                this.MoveDownCanbeEnabledVisible();
                this.MoveUpCanbeEnabledVisible();
            }
                iBusyIndicator.Stop("orderSetMezzanine");
        // setTimeout(() => {
        // }, 100);
        }
    }
    public lblGuidanceHyperlink_MouseLeftButtonUp(sender: Object, e: MouseButtonEventArgs): void {
        this.oORSChild = new OrderSetGuidanceSecMezzanine();
        this.oORSChild.DataContext = this.objOrderSetSecMezzanineVM;
        this.oORSChild.onDialogClose = (s,e) => {this.oORSChild_Closed(s);};
        let sWindowTitle: string = this.objOrderSetSecMezzanineVM.OrderSetName + Resource.ORSSecMezzanine.GuidanceText;
        AppActivity.OpenWindow(sWindowTitle, this.oORSChild, (s,e) => {this.oORSChild_Closed(s);}, "", false, 450, 560, false, WindowButtonType.Ok, null);
    }
    oORSChild_Closed(args: AppDialogEventargs): void {
        this.oORSChild.appDialog.DialogResult = false;
    }
    public cmdLink_Click(sender: Object, e: RoutedEventArgs): void {
        this.oORSChildLinks = new OrderSetsLinks();
        this.oORSChildLinks.DataContext = this.objOrderSetSecMezzanineVM;
        this.oORSChildLinks.onDialogClose = this.oORSChildLinks_Closed;
        let sWindowTitle: string = this.objOrderSetSecMezzanineVM.OrderSetName + Resource.ORSSecMezzanine.WebpageDialog;
        AppActivity.OpenWindow(sWindowTitle, this.oORSChildLinks, (s, e) => { this.oORSChildLinks_Closed(s); }, "", false, 450, 560, false, WindowButtonType.Close, null);
    }
    oORSChildLinks_Closed(args: AppDialogEventargs): void {
        args.AppChildWindow.DialogResult = true;
        // this.oORSChildLinks.appDialog.DialogResult = false;
    }
    // public DisposeFormEvents(): void {
    //     if (this.objOrderSetSecMezzanineVM != null) {
    //         this.objOrderSetSecMezzanineVM.OnOSItemsLoaded -= objOrderSetSecMezzanineVM_OnOSItemsLoaded;
    //         this.objOrderSetSecMezzanineVM.OnShowHyperlink -= objOrderSetSecMezzanineVM_OnShowHyperlink;
    //     }
    //     if (grdPatientSelect != null)
    //         grdPatientSelect.SelectionChanging -= grdPatientSelect_SelectionChanging;
    //     if (grdPatientSelect != null)
    //         // grdPatientSelect.SelectionChanged -= grdPatientSelect_SelectionChanged;
    //     if (this.cmdLink != null)
    //         this.cmdLink.Click -= cmdLink_Click;
    // }
    public iAppDialogWindow_Unloaded(sender: Object, e: RoutedEventArgs): void {

    }
    MedSteppedDose_Closed(args: AppDialogEventargs): void {
        args.AppChildWindow.DialogResult = true;
    }
    public iCheckBox_OnChange(sender: Object, e: RoutedEventArgs): void {
        let IsChecked: boolean = false;
        // IsChecked = (ObjectHelper.CreateType<System.Windows.Controls.Primitives.ToggleButton>(sender, System.Windows.Controls.Primitives.ToggleButton)).IsChecked != null ? (ObjectHelper.CreateType<System.Windows.Controls.Primitives.ToggleButton>(sender, System.Windows.Controls.Primitives.ToggleButton)).IsChecked : true;
        // e.OriginalSource.IsChecked
        IsChecked = this.DRCCheckBox.IsChecked != null ? this.DRCCheckBox.IsChecked : true;
        if (this.objOrderSetSecMezzanineVM != null && this.objOrderSetSecMezzanineVM.PrescriptionItemList != null) {
            this.objOrderSetSecMezzanineVM.PrescriptionItemList.forEach((item) => {
                if (item != null && item.PrescrptionItem != null && item.PrescrptionItem.FormViewerDetails != null && item.PrescrptionItem.FormViewerDetails.BasicDetails != null && item.PrescrptionItem.FormViewerDetails.BasicDetails.Ordersets != null) {
                    item.PrescrptionItem.FormViewerDetails.BasicDetails.Ordersets.IsDefault = IsChecked;
                }
            });
        }
        this.DisableDRCWarning.Visibility = IsChecked ? Visibility.Visible : Visibility.Collapsed;
    }
    ChkDoNotOpenFrmVewr_OnChangeFunc = (s, e) => {
        this.ChkDoNotOpenFrmVewr_OnChange(s, e);
    }
    public ChkDoNotOpenFrmVewr_OnChange(sender: any, index: number): void {
        // let button: System.Windows.Controls.Primitives.ToggleButton = ObjectHelper.CreateType<System.Windows.Controls.Primitives.ToggleButton>(sender, System.Windows.Controls.Primitives.ToggleButton);
        let button = sender;
        if (button != null) {
            // let assoc: PrescriptionItemAssociations = ObjectHelper.CreateType<PrescriptionItemAssociations>(button.Tag, PrescriptionItemAssociations);
            let assoc: PrescriptionItemAssociations = this.grdPatientSelect.ItemsSource[index];
            if (button.target.checked && assoc != null) {
                if (!this.IsORSEditable || assoc != null && assoc.PrescrptionItem != null && assoc.PrescrptionItem.FormViewerDetails != null && assoc.PrescrptionItem.FormViewerDetails.BasicDetails != null && this.objOrderSetSecMezzanineVM.IgnoreOrdetAssociations != null && this.objOrderSetSecMezzanineVM.IgnoreOrdetAssociations.Any(x => x == assoc.PrescrptionItem.FormViewerDetails.BasicDetails.OrdersetAssociationOID)) {
                    button.target.checked = false;
                    assoc.IsPresOpenFVChecked = false;
                    return
                }
                if (assoc.PrescrptionItem.OsInstance.OsIsSequential && assoc.PrescrptionItem.OsInstance.OsIsProtected) {
                    let seqId: number = assoc.PrescrptionItem.OsInstance.OsSeqGroupNo;
                    this.grdPatientSelect.Select(this.objOrderSetSecMezzanineVM.PrescriptionItemList.Where(x => x != null).Except(this.grdPatientSelect.GetSelectedRows().Select(x => ObjectHelper.CreateType<PrescriptionItemAssociations>(x, PrescriptionItemAssociations))).Where(x => x.PrescrptionItem != null && x.PrescrptionItem.OsInstance.OsIsSequential && x.PrescrptionItem.OsInstance.OsIsProtected && x.PrescrptionItem.OsInstance.OsSeqGroupNo == seqId));
                }
                else {
                    let assocObs = new ObservableCollection<Object>(); 
                    assocObs.Add(assoc);
                    this.grdPatientSelect.Select(assocObs.Where(x => x != null));
                }
            }
            let selectableItemsCount: number = 0;
            this.grdPatientSelect.ItemsSource.forEach((item, inx) => {
                if (!item.PrescrptionItem.OsInstance.IsPrescribed && !item.PrescrptionItem.OsInstance.OsIsGroupHeader) {
                    selectableItemsCount = selectableItemsCount + 1;
                }
            })
            if (selectableItemsCount == this.grdPatientSelect.GetSelectedRowCount()) {
                this.isSelectAll = true;
            }
            else {
                this.isSelectAll = false;
            }
            this.SetSequenceCanbeEnabledVisible();
            this.SequenceLinkCanbeEnabledVisible();
            this.ClearSequenceCanbeEnabledVisible();
            this.MoveDownCanbeEnabledVisible();
            this.MoveUpCanbeEnabledVisible();
        }
    }
}
