
import { ChangeDetectorRef, Component, Input, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { StringBuilder, ProfileFactoryType, ContextManager, Convert, AppActivity } from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp, Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison, AppDialogEventargs, AppDialogResult, DelegateArgs, DialogComponentArgs, WindowButtonType, AppSessionInfo, CListItem, ObservableCollection, PatientContext, SelectionChangedEventArgs } from 'epma-platform/models';
import { AppDialog, Border, Colors, Grid, KeyEventArgs, SolidColorBrush, UserControl, iButton, iCheckBox, iComboBox, iLabel, iRadioButton, iTextBox, iTreeViewControl } from 'epma-platform/controls';
import { HelperService } from 'epma-platform/soapclient';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
import { CTreeListItem } from 'src/app/shared/epma-platform/controls-model/treeView.model';
import { RoutedEventArgs } from 'src/app/shared/epma-platform/controls/FrameworkElement';
import { ManagePrescriptionWSSoapClient, CReqMsgGetAllOptions, GetAllOptionsCompletedEventArgs, CResMsgGetAllOptions } from 'src/app/shared/epma-platform/soap-client/ManagePrescriptionWS';
import { ActivityTypes } from '../model/common';
import { DoseState } from '../model/conditionaldose';
import { Resource } from '../resource';
import { Common } from '../utilities/common';
import { Type } from '@angular/compiler';
import { DoseTypeCode, InfusionTypesCode, CConstants } from '../utilities/constants';
import { PrescriptionItemVM } from '../viewmodel/PrescriptionItemVM';
import { frmAdminSlotTimes } from './frmadminslottimes';
import { TextChangedEventArgs } from './frmformviewforadminconinfusions';
import { medFormViewer } from './medformviewer';
import * as ControlStyles from "../../shared/epma-platform/controls/ControlStyles";
import { AMSHelper } from 'src/app/lorappcommonbb/amshelper';
import { GridExtension, SelectionChangeEventArgs } from 'src/app/shared/epma-platform/controls/epma-grid-helpers/grid-extension';
import { GridComponent, RowArgs } from '@progress/kendo-angular-grid';
var that;

@Component({
    selector: 'medConditionalDose',
    templateUrl: './medconditionaldose.html',
    styleUrls: ['./medconditionaldose.css']
})
export class medConditionalDose extends UserControl {
    public ResConditional = Resource.medConditionalDoseRes;
    public bLoaded: boolean;
    public oItemVM: PrescriptionItemVM;
    public Styles = ControlStyles;
    public resKey = Resource.MedicationForm;
    public resKey1 = Resource.Infusion;
    public CondionalErrorEvent: Function;
    public CondionalConfirmEvent: Function;
    public tvwEnabledChangedEvent: Function;
    public onConditionalDoseChanged: Function;
    public oMsgBox: iMessageBox;
    public omedFormViewer: medFormViewer;
    public LayoutRoot: Grid;
    public IsCondDoseAvailable: boolean = false;
    override _DataContext: PrescriptionItemVM;
    override get DataContext() {
        return this._DataContext;
    }
    @Input() medConditionalDoseLoadedFunc: Function;
    @Input() override set DataContext(value: PrescriptionItemVM) {
        if (value) {
            this._DataContext = value;
        }
    }
    public presdrugs = Resource.prescribedrugs;
    @ViewChild("LayoutRootTempRef", { read: Grid, static: false }) set _LayoutRoot(c: Grid) {
        if (c) { this.LayoutRoot = c; }
    };
    public lblFrequency: iLabel = new iLabel();
    @ViewChild("lblFrequencyTempRef", { read: iLabel, static: false }) set _lblFrequency(c: iLabel) {
        if (c) { this.lblFrequency = c; }
    };
    public cboFrequency: iComboBox;
    @ViewChild("cboFrequencyTempRef", { read: iComboBox, static: false }) set _cboFrequency(c: iComboBox) {
        if (c) { this.cboFrequency = c; }
    };
    public lblIsPRN: iLabel = new iLabel();
    @ViewChild("lblIsPRNTempRef", { read: iLabel, static: false }) set _lblIsPRN(c: iLabel) {
        if (c) { this.lblIsPRN = c; }
    };
    public chkPRN: iCheckBox = new iCheckBox();
    @ViewChild("chkPRNTempRef", { read: iCheckBox, static: false }) set _chkPRN(c: iCheckBox) {
        if (c) { this.chkPRN = c; }
    };
    public chkGridSelection: Array<iCheckBox>;
    @ViewChildren("chkGridSelectionRef", { read: iCheckBox }) set _chkGridSelection(c: Array<iCheckBox>) {
        if (c) { this.chkGridSelection = c; }
    };
    public chkGridSelections: Array<iCheckBox>;
    @ViewChildren("chkGridHeaderSelectionRef", { read: iCheckBox }) set _chkGridSelections(c: Array<iCheckBox>) {
        if (c) { this.chkGridSelections = c; }
    };
    public lblPRNInstruction: iLabel = new iLabel();
    @ViewChild("lblPRNInstructionTempRef", { read: iLabel, static: false }) set _lblPRNInstruction(c: iLabel) {
        if (c) { this.lblPRNInstruction = c; }
    };
    public cboPRNInstruction: iComboBox = new iComboBox();
    @ViewChild("cboPRNInstructionTempRef", { read: iComboBox, static: false }) set _cboPRNInstruction(c: iComboBox) {
        if (c) { this.cboPRNInstruction = c; }
    };
    public brdAdminDetailsCond: Border;
    @ViewChild("brdAdminDetailsCondTempRef", { read: Border, static: false }) set _brdAdminDetailsCond(c: Border) {
        if (c) { this.brdAdminDetailsCond = c; }
    };
    public adminslotuc: frmAdminSlotTimes;
    @ViewChild("adminslotucTempRef", { read: frmAdminSlotTimes, static: false }) set _adminslotuc(c: frmAdminSlotTimes) {
        if (c) { this.adminslotuc = c; }
    };
    public InfusioninnerBorder: Border;
    @ViewChild("InfusioninnerBorderTempRef", { read: Border, static: false }) set _InfusioninnerBorder(c: Border) {
        if (c) { this.InfusioninnerBorder = c; }
    };
    public InfusionrateBorder: Border;
    @ViewChild("InfusionrateBorderTempRef", { read: Border, static: false }) set _InfusionrateBorder(c: Border) {
        if (c) { this.InfusionrateBorder = c; }
    };
    public lblCondition: iLabel = new iLabel();
    @ViewChild("lblConditionTempRef", { read: iLabel, static: false }) set _lblCondition(c: iLabel) {
        if (c) { this.lblCondition = c; }
    };
    public tvwCondition: iTreeViewControl = new iTreeViewControl();
    @ViewChild("tvwConditionTempRef", { read: iTreeViewControl, static: false }) set _tvwCondition(c: iTreeViewControl) {
        if (c) { this.tvwCondition = c; }
    };
    public lblValueRange: iLabel = new iLabel();
    @ViewChild("lblValueRangeTempRef", { read: iLabel, static: false }) set _lblValueRange(c: iLabel) {
        if (c) { this.lblValueRange = c; }
    };
    public LayoutValueRange: Grid = new Grid();
    @ViewChild("LayoutValueRangeTempRef", { read: Grid, static: false }) set _LayoutValueRange(c: Grid) {
        if (c) { this.LayoutValueRange = c; }
    };
    public cboRangeValInf: iComboBox = new iComboBox();
    @ViewChild("cboRangeValInfTempRef", { read: iComboBox, static: false }) set _cboRangeValInf(c: iComboBox) {
        if (c) { this.cboRangeValInf = c; }
    };
    public txtLowerRange: iTextBox = new iTextBox();
    @ViewChild("txtLowerRangeTempRef", { read: iTextBox, static: false }) set _txtLowerRange(c: iTextBox) {
        if (c) { this.txtLowerRange = c; }
    };
    public lblHifen: iLabel = new iLabel();
    @ViewChild("lblHifenTempRef", { read: iLabel, static: false }) set _lblHifen(c: iLabel) {
        if (c) { this.lblHifen = c; }
    };
    public txtUpperRange: iTextBox = new iTextBox();
    @ViewChild("txtUpperRangeTempRef", { read: iTextBox, static: false }) set _txtUpperRange(c: iTextBox) {
        if (c) { this.txtUpperRange = c; }
    };
    public lblValueRangeUOM: iLabel = new iLabel();
    @ViewChild("lblValueRangeUOMTempRef", { read: iLabel, static: false }) set _lblValueRangeUOM(c: iLabel) {
        if (c) { this.lblValueRangeUOM = c; }
    };
    public cboRangeUOM: iComboBox = new iComboBox();
    @ViewChild("cboRangeUOMTempRef", { read: iComboBox, static: false }) set _cboRangeUOM(c: iComboBox) {
        if (c) { this.cboRangeUOM = c; }
    };
    public lblDoseValue: iLabel = new iLabel();
    @ViewChild("lblDoseValueTempRef", { read: iLabel, static: false }) set _lblDoseValue(c: iLabel) {
        if (c) { this.lblDoseValue = c; }
    };
    public LayoutDoseValueType: Grid = new Grid();
    @ViewChild("LayoutDoseValueTypeTempRef", { read: Grid, static: false }) set _LayoutDoseValueType(c: Grid) {
        if (c) { this.LayoutDoseValueType = c; }
    };
    public optNumeric: iRadioButton = new iRadioButton();
    @ViewChild("optNumericTempRef", { read: iRadioButton, static: false }) set _optNumeric(c: iRadioButton) {
        if (c) { this.optNumeric = c; }
    };
    public optInstruction: iRadioButton = new iRadioButton();
    @ViewChild("optInstructionTempRef", { read: iRadioButton, static: false }) set _optInstruction(c: iRadioButton) {
        if (c) { this.optInstruction = c; }
    };
    public lblDose: iLabel = new iLabel();
    @ViewChild("lblDoseTempRef", { read: iLabel, static: false }) set _lblDose(c: iLabel) {
        if (c) { this.lblDose = c; }
    };
    public LayoutDoseValue: Grid = new Grid();
    @ViewChild("LayoutDoseValueTempRef", { read: Grid, static: false }) set _LayoutDoseValue(c: Grid) {
        if (c) { this.LayoutDoseValue = c; }
    };
    public txtDoseValue: iTextBox = new iTextBox();
    @ViewChild("txtDoseValueTempRef", { read: iTextBox, static: false }) set _txtDoseValue(c: iTextBox) {
        if (c) { this.txtDoseValue = c; }
    };
    public lblDoseHifen: iLabel = new iLabel();
    @ViewChild("lblDoseHifenTempRef", { read: iLabel, static: false }) set _lblDoseHifen(c: iLabel) {
        if (c) { this.lblDoseHifen = c; }
    };
    public txtUpperDoseValue: iTextBox = new iTextBox();
    @ViewChild("txtUpperDoseValueTempRef", { read: iTextBox, static: false }) set _txtUpperDoseValue(c: iTextBox) {
        if (c) { this.txtUpperDoseValue = c; }
    };
    public lblDoseValueUOM: iLabel = new iLabel();
    @ViewChild("lblDoseValueUOMTempRef", { read: iLabel, static: false }) set _lblDoseValueUOM(c: iLabel) {
        if (c) { this.lblDoseValueUOM = c; }
    };
    public cboDoseValueUOM: iComboBox = new iComboBox();
    @ViewChild("cboDoseValueUOMTempRef", { read: iComboBox, static: false }) set _cboDoseValueUOM(c: iComboBox) {
        if (c) { this.cboDoseValueUOM = c; }
    };
    public InfusionrateLabel: Grid = new Grid();
    @ViewChild("InfusionrateLabelTempRef", { read: Grid, static: false }) set _InfusionrateLabel(c: Grid) {
        if (c) { this.InfusionrateLabel = c; }
    };
    public lblInfusionrate: iLabel = new iLabel();
    @ViewChild("lblInfusionrateTempRef", { read: iLabel, static: false }) set _lblInfusionrate(c: iLabel) {
        if (c) { this.lblInfusionrate = c; }
    };
    public InfusionrateLayoutRoot: Grid = new Grid();
    @ViewChild("InfusionrateLayoutRootTempRef", { read: Grid, static: false }) set _InfusionrateLayoutRoot(c: Grid) {
        if (c) { this.InfusionrateLayoutRoot = c; }
    };
    public txtLowerInfusionrate: iTextBox = new iTextBox();
    @ViewChild("txtLowerInfusionrateTempRef", { read: iTextBox, static: false }) set _txtLowerInfusionrate(c: iTextBox) {
        if (c) { this.txtLowerInfusionrate = c; }
    };
    public lblHifen1: iLabel = new iLabel();
    @ViewChild("lblHifen1TempRef", { read: iLabel, static: false }) set _lblHifen1(c: iLabel) {
        if (c) { this.lblHifen1 = c; }
    };
    public txtUpperInfusionrate: iTextBox = new iTextBox();
    @ViewChild("txtUpperInfusionrateTempRef", { read: iTextBox, static: false }) set _txtUpperInfusionrate(c: iTextBox) {
        if (c) { this.txtUpperInfusionrate = c; }
    };
    public lblUOMInfusionrate: iLabel = new iLabel();
    @ViewChild("lblUOMInfusionrateTempRef", { read: iLabel, static: false }) set _lblUOMInfusionrate(c: iLabel) {
        if (c) { this.lblUOMInfusionrate = c; }
    };
    public cboUOMInfusionrate: iComboBox = new iComboBox();
    @ViewChild("cboUOMInfusionrateTempRef", { read: iComboBox, static: false }) set _cboUOMInfusionrate(c: iComboBox) {
        if (c) { this.cboUOMInfusionrate = c; }
    };
    public lblUOMInfusionrate1: iLabel = new iLabel();
    @ViewChild("lblUOMInfusionrate1TempRef", { read: iLabel, static: false }) set _lblUOMInfusionrate1(c: iLabel) {
        if (c) { this.lblUOMInfusionrate1 = c; }
    };
    public cboUOMInfusionrate1: iComboBox = new iComboBox();
    @ViewChild("cboUOMInfusionrate1TempRef", { read: iComboBox, static: false }) set _cboUOMInfusionrate1(c: iComboBox) {
        if (c) { this.cboUOMInfusionrate1 = c; }
    };
    public lblInstuction: iLabel = new iLabel();
    @ViewChild("lblInstuctionTempRef", { read: iLabel, static: false }) set _lblInstuction(c: iLabel) {
        if (c) { this.lblInstuction = c; }
    };
    public txtInstruction: iTextBox = new iTextBox();
    @ViewChild("txtInstructionTempRef", { read: iTextBox, static: false }) set _txtInstruction(c: iTextBox) {
        if (c) { this.txtInstruction = c; }
    };
    public cmdAdd: iButton = new iButton();
    @ViewChild("cmdAddTempRef", { read: iButton, static: false }) set _cmdAdd(c: iButton) {
        if (c) { this.cmdAdd = c; }
    };
    public cmdUpdate: iButton = new iButton();
    @ViewChild("cmdUpdateTempRef", { read: iButton, static: false }) set _cmdUpdate(c: iButton) {
        if (c) { this.cmdUpdate = c; }
    };
    public cmdRemove: iButton = new iButton();;
    @ViewChild("cmdRemoveTempRef", { read: iButton, static: false }) set _cmdRemove(c: iButton) {
        if (c) { this.cmdRemove = c; }
    };
    // public grdCondition: iGrid;
    // @ViewChild("grdConditionTempRef", { read: iGrid, static: false }) set _grdCondition(c: iGrid) {
    //     if (c) { this.grdCondition = c; }
    // };

    public grdCondition: GridExtension = new GridExtension();
    @ViewChild("grdConditionTempRef", { read: GridComponent, static: false }) set _grdCondition(comp: GridComponent) {
        if (comp) {
            this.grdCondition.grid = comp;
            this.grdCondition.columns = comp.columns;
        }
    };

    private _chkGridSelectionRef: QueryList<iCheckBox>;
    @ViewChildren("chkGridSelectionRef", { read: iCheckBox }) set __chkGridSelectionRef(c: QueryList<iCheckBox>) {
        if (c) { this._chkGridSelectionRef = c; }
    };
    private _chkHeaderRowCheckbox: iCheckBox;
    @ViewChild("chkGridHeaderSelectionRef", { read: iCheckBox }) set ___chkRowCheckbox(c: iCheckBox) {
        if (c) { this._chkHeaderRowCheckbox = c; }
    };
    constructor(private changeDetectionRef?: ChangeDetectorRef) {
        super();
        that = this;
    }
    ngAfterViewInit(): void {
        this.bLoaded = false;
        this.CondionalErrorEvent = (arg1, arg2, arg3) => { this.ConditionalDosingDetails_OnErrorEvent(arg1, arg2, arg3); };
        this.CondionalConfirmEvent = (arg1, arg2, arg3, arg4) => { this.ConditionalDosingDetails_OnConfirmEvent(arg1, arg2, arg3, arg4) };
        this.tvwEnabledChangedEvent = (s, e) => { this.ConditionalDosingDetails_tvwConditionEnabledChangedEvent(s) }
        this.onConditionalDoseChanged = (s, e) => { this.ConditionalDosingDetails_ConditionalDoseChangedEvent(s) };
        this.medConditionalDose_Loaded(null, null);
        this.grdCondition.GenerateColumns();
        this.grdCondition.changeDetectionRef = this.changeDetectionRef;
        if (this.oItemVM.FormViewerDetails.BasicDetails.ConditionalDosingDetails.DoseDetails.Length > 0) {
            this.grdCondition.SetBinding('data', this.oItemVM.FormViewerDetails.BasicDetails.ConditionalDosingDetails.DoseDetails);
        }
        this.oItemVM.FormViewerDetails.BasicDetails.PrnInstructionLoaded.subscribe(data => {
            this.cboPRNInstruction.ClearValue();
        }); 
    }

    GridHeaderCheckboxChange_Func = (s, e) => {
        this.GridHeaderCheckboxChange(s, e);
        let _selectionChangeEventArgs: SelectionChangeEventArgs = {};
        let _selectedRows: RowArgs[] = [];
        if(this.grdCondition.selectedRows?.length > 0){
            let item: RowArgs = { dataItem: this.grdCondition.selectedRows[0], index: 0 };
            _selectedRows.push(item);    
        }
        _selectionChangeEventArgs.selectedRows = _selectedRows;
        this.grdCondition_SelectionChanged(s, _selectionChangeEventArgs);
    }
    GridHeaderCheckboxChange(s, e) {
        this.grdCondition.UpdateCheckBoxSelection(this._chkHeaderRowCheckbox, this._chkGridSelectionRef, true, this.grdCondition.ItemsSource, this.grdCondition);
    }
    GridRowCheckboxChange_Func = (s, e) => {
        this.GridRowCheckboxChange(s, e);
    }
    GridRowCheckboxChange(s, e) {
        this.grdCondition.UpdateCheckBoxSelection(this._chkHeaderRowCheckbox, this._chkGridSelectionRef, false);
    }

    public medConditionalDose_Loaded(sender: Object, e: RoutedEventArgs): void {
        setTimeout(() => {
            if (this.omedFormViewer != null && this.omedFormViewer.DOAutoScroll) {
                this.omedFormViewer.AutoScrollView();
            }
        }, 0);
        if (!this.bLoaded) {
            this.oItemVM = ObjectHelper.CreateType<PrescriptionItemVM>(this.DataContext, PrescriptionItemVM);
            if (this.oItemVM != null) {
                this.oItemVM.FormViewerDetails.BasicDetails.ConditionalDosingDetails.OnErrorEvent = (arg1, arg2, arg3) => { this.CondionalErrorEvent(arg1, arg2, arg3); };
                this.oItemVM.FormViewerDetails.BasicDetails.ConditionalDosingDetails.OnConfirmEvent = (arg1, arg2, arg3, arg4) => {
                    this.CondionalConfirmEvent(arg1, arg2, arg3, arg4);
                };
                this.oItemVM.FormViewerDetails.BasicDetails.ConditionalDosingDetails.tvwConditionEnabledChangedEvent = (s, e) => { this.tvwEnabledChangedEvent(s); };
                this.oItemVM.FormViewerDetails.BasicDetails.ConditionalDosingDetails.ConditionalDoseChangedEvent = (s, e) => { this.onConditionalDoseChanged(s); };
                let selectedObservationResult = this.oItemVM.FormViewerDetails.BasicDetails.ConditionalDosingDetails.SelectedObservationResult;
                if (this.tvwCondition && this.tvwCondition.TreeViewDataContext) {
                    if (selectedObservationResult) {
                        this.tvwCondition.TreeViewDataContext.forEach((context) => {
                            if (selectedObservationResult.Key == context.Key) {
                                selectedObservationResult = context;
                            }
                        })
                    } else {
                        this.tvwCondition.TreeViewDataContext.forEach((context) => {
                            if (context.Selected) {
                                selectedObservationResult = context;
                            }
                        })
                    }
                }
                this.SelectObservationResult(selectedObservationResult);
                this.oItemVM.FormViewerDetails.BasicDetails.ConditionalDosingDetails.SetDefaultValues();
            }
            this.bLoaded = true;
            this.txtUpperInfusionrate.IsEnabled = false;
            if (this.oItemVM != null && this.oItemVM.FormViewerDetails != null && this.oItemVM.FormViewerDetails.BasicDetails != null && this.oItemVM.FormViewerDetails.BasicDetails.ConditionalDosingDetails != null) {
                if (this.oItemVM.FormViewerDetails.BasicDetails.ConditionalDosingDetails.DoseDetails == null || (this.oItemVM.FormViewerDetails.BasicDetails.ConditionalDosingDetails.DoseDetails != null && this.oItemVM.FormViewerDetails.BasicDetails.ConditionalDosingDetails.DoseDetails.Count == 0)) {
                    this.oItemVM.FormViewerDetails.BasicDetails.ConditionalDosingDetails.SetDefaultDisable();
                }
            }
            this.txtLowerRange_TextChanged();
            this.txtLowerInfusionrate_TextChanged();
        }

        // if (
        //     this.DataContext.FormViewerDetails != null &&
        //     this.DataContext.FormViewerDetails.BasicDetails != null &&
        //     this.DataContext.FormViewerDetails.BasicDetails.AdminTimes != null &&
        //     this.DataContext.FormViewerDetails.BasicDetails.AdminTimes.AdministrationScheduleTimes != null &&
        //     (this.DataContext.FormViewerDetails?.BasicDetails?.AdminTimes?.AdministrationScheduleTimes?.Length < 1)
        // )
        //     this.cboFrequency.Focus();
    }
    ConditionalDosingDetails_ConditionalDoseChangedEvent(ConditionalDoseState: DoseState): void {
        if (this.oItemVM != null) {
            this.oItemVM.FormViewerDetails.BasicDetails.IsenableRSNFORMOD = this.oItemVM.FormViewerDetails.BasicDetails.IsMandatoryRSNFORMOD = true;
            this.oItemVM.FormViewerDetails.BasicDetails.IsenableModificationcomments = this.oItemVM.FormViewerDetails.BasicDetails.IsMandatoryReasonForMedClerkModify = true;
            this.oItemVM.FormViewerDetails.BasicDetails.SetOnadmissionValue("", DoseTypeCode.CONDITIONAL);
            if (this.oItemVM.FormViewerDetails != null && this.oItemVM.FormViewerDetails.BasicDetails != null && this.oItemVM.FormViewerDetails.BasicDetails.lstAmendedFlds != null && !this.oItemVM.FormViewerDetails.BasicDetails.lstAmendedFlds.Contains("AddCondDoseDetails"))
                this.oItemVM.FormViewerDetails.BasicDetails.lstAmendedFlds.Add("AddCondDoseDetails");
            if (this.oItemVM.ActionCode == ActivityTypes.Amend && this.oItemVM.FormViewerDetails.BasicDetails != null && this.oItemVM.FormViewerDetails.BasicDetails.ConditionalDosingDetails != null && this.oItemVM.FormViewerDetails.BasicDetails.ConditionalDosingDetails.IsModifiedDose) {
                this.oItemVM.FormViewerDetails.BasicDetails.ClearPrescribedQuantity();
            }
            if (this.oItemVM.FormViewerDetails.BasicDetails != null && this.oItemVM.FormViewerDetails.BasicDetails.ConditionalDosingDetails != null && this.oItemVM.FormViewerDetails.BasicDetails.ConditionalDosingDetails.IsTvMsgShown) {
                this.oItemVM.TechnicallyValidateMessage();
            }
            if (ConditionalDoseState == DoseState.Updated || ConditionalDoseState == DoseState.Removed) {
                console.log(this.chkGridSelection);
                if (this.chkGridSelection && this.chkGridSelection.length > 0) {
                    this.chkGridSelection.forEach((selection) => {
                        if (selection.IsChecked) {
                            selection.IsChecked = false;
                        }
                    })
                    this.chkGridSelections.forEach((selection)=>{
                        if(selection.IsChecked){
                            selection.IsChecked = false;
                        }
                    })
                }
                if (this.oItemVM.FormViewerDetails.BasicDetails.ConditionalDosingDetails.DoseDetails.Length > 0) {
                    this.grdCondition.SetBinding('data', this.oItemVM.FormViewerDetails.BasicDetails.ConditionalDosingDetails.DoseDetails);
                }
            }
            else if (ConditionalDoseState == DoseState.Added) {
                this.grdCondition.SetBinding('data', this.oItemVM.FormViewerDetails.BasicDetails.ConditionalDosingDetails.DoseDetails);
            }
            setTimeout(() => {                
                this.txtLowerRange_TextChanged();
                this.txtLowerInfusionrate_TextChanged();
            }, 10);
        }
    }
    public ConditionalDosingDetails_tvwConditionEnabledChangedEvent(IsEnabled: boolean): void {
        this.tvwCondition.IsEnabled = IsEnabled;
    }
    public ConditionalDosingDetails_OnErrorEvent(ErrorNumber: number, ErrorMessage: string, ContronID: string): void {
        this.oMsgBox = ObjectHelper.CreateObject(new iMessageBox(), { Title: Resource.medConditionalDoseRes.MessageBox_Title });
        this.oMsgBox.OverlayBrush = new SolidColorBrush(Colors.Transparent);
        this.oMsgBox.MessageBoxClose = (s, e) => { this.oMsgBox_MessageBoxClose(s, e); };
        this.oMsgBox.Message = ErrorMessage;
        this.oMsgBox.IconType = MessageBoxType.Critical;
        this.oMsgBox.MessageButton = MessageBoxButton.OK;
        this.oMsgBox.Tag = ContronID;
        this.oMsgBox.Show();
    }
    dDoseValue: number;
    public ConditionalDosingDetails_OnConfirmEvent(DoseValue: number, ConfirmationMessage: string, ContronID: string, Action: string): void {
        this.oMsgBox = ObjectHelper.CreateObject(new iMessageBox(), { Title: Resource.medConditionalDoseRes.MessageBox_Title });
        this.dDoseValue = DoseValue;
        this.oMsgBox.OverlayBrush = new SolidColorBrush(Colors.Transparent);
        this.oMsgBox.MessageBoxClose = (s, e) => { this.DoseConfirmation_MessageBoxClose(s, e); };
        this.oMsgBox.Message = ConfirmationMessage;
        this.oMsgBox.IconType = MessageBoxType.Question;
        this.oMsgBox.MessageButton = MessageBoxButton.YesNo;
        this.oMsgBox.Tag = () => void
            this.oMsgBox.Show();
    }
    DoseConfirmation_MessageBoxClose(sender: Object, e: MessageEventArgs): void {
        if (e.MessageBoxResult == MessageBoxResult.Yes) {
            if (this.dDoseValue < 0) {
                this.oItemVM.FormViewerDetails.BasicDetails.ConditionalDosingDetails.Condition.Dose = String.Empty;
            }
            else {
                let sAction: string = ObjectHelper.CreateType<string>(this.oMsgBox.Tag, String);
                if (String.IsNullOrEmpty(sAction))
                    return
                this.oItemVM.FormViewerDetails.BasicDetails.ConditionalDosingDetails.IsDoseAccepted = true;
                if (String.Compare(sAction, "Add") == 0) {
                    this.oItemVM.FormViewerDetails.BasicDetails.ConditionalDosingDetails.AddCondition();
                }
                else if (String.Compare(sAction, "Update") == 0) {
                    this.oItemVM.FormViewerDetails.BasicDetails.ConditionalDosingDetails.UpdateCondition();
                }
                return
            }
        }
        this.txtDoseValue.Focus();
    }
    public oMsgBox_MessageBoxClose(sender: Object, e: MessageEventArgs): void {
        let sCtrlID: string = ObjectHelper.CreateType<string>(this.oMsgBox.Tag, String);
        if (String.IsNullOrEmpty(sCtrlID))
            return
        let ctrlToSetFocus: any = this.FindName(sCtrlID);
        if (ctrlToSetFocus != null) {
            let ctrlType: Type = ctrlToSetFocus.GetType();
            if (ctrlType.Equals(/*typeof*/iTextBox)) {
                (ObjectHelper.CreateType<iTextBox>(ctrlToSetFocus, iTextBox)).Focus();
            }
            else if (ctrlType.Equals(/*typeof*/iComboBox)) {
                (ObjectHelper.CreateType<iComboBox>(ctrlToSetFocus, iComboBox)).Focus();
            }
            else if (ctrlType.Equals(/*typeof*/iTreeViewControl)) {
                (ObjectHelper.CreateType<iTreeViewControl>(ctrlToSetFocus, iTreeViewControl)).Focus();
            }
            else if (ctrlType.Equals(/*typeof*/iRadioButton)) {
                (ObjectHelper.CreateType<iRadioButton>(ctrlToSetFocus, iRadioButton)).Focus();
            }
        }
    }
    tvwConditionDataContextChanged(event) {
        if (this.oItemVM)
            this.SelectObservationResult(this.oItemVM.FormViewerDetails.BasicDetails.ConditionalDosingDetails.SelectedObservationResult);
    }
    private SelectObservationResult(ObservationResult: CTreeListItem): void {
        let _ErrorID: number = 80000041;
        let _ErrorSource: string = "LorAppManagePrescriptionBBUI_P2.dll, Class:medConditionalDose, Method:SelectObservationResult()";
        if (this.tvwCondition && this.tvwCondition.TreeViewDataContext) {
            this.getAllParentNodes(this.unflatten(this.tvwCondition.TreeViewDataContext));
            this.tvwCondition.expandedKeys = this.allParentNodesIndexes;
        }
        if (ObservationResult != null) {
            this.oItemVM.FormViewerDetails.BasicDetails.ConditionalDosingDetails.SelectedObservationResult = ObservationResult;
            setTimeout(() => {
                var treeViewElement = document.querySelector(`.k-treeview`);
                if (treeViewElement) {
                    var selectedElement = treeViewElement.querySelector(`.k-selected`);
                    if (selectedElement && (selectedElement['offsetTop'] + selectedElement.clientHeight) > treeViewElement.clientHeight)
                        treeViewElement.scrollTop = selectedElement['offsetTop'];
                }
            });
        }
    }

    private allParentNodesIndexes = [];
    private unflatten(items) {
        var tree = [],
            mappedArr = {};
        items.forEach(function (item,index) {
            let id = item.Key;
            if (!mappedArr.hasOwnProperty(id)) {
                mappedArr[id] = item;
                mappedArr[id].Children = [];
                mappedArr[id].Children.Count = 0;
            } else {
                let duplicateId = `${item.ParentKey}_${item.Key}_${index}`;
                mappedArr[duplicateId] = item;
                mappedArr[duplicateId].Children = [];
                mappedArr[duplicateId].Children.Count = 0;
            }
        });
        for (var id in mappedArr) {
            if (mappedArr.hasOwnProperty(id)) {
                var mappedElem = mappedArr[id];
                if (mappedElem.ParentKey) {
                    var parentId = mappedElem.ParentKey;
                    mappedArr[parentId].Children.push(mappedElem);
                    mappedArr[parentId].Children.Count = mappedArr[parentId].Children.length;
                } else {
                    tree.push(mappedElem);
                }
            }
        }
        return tree;
    }
    private getAllParentNodes(data: Array<any>, parentIndex = '') {
        data.forEach((item, index) => {
            if (item.Children.length > 0) {
                let expandedNodeIndex;
                if (parentIndex == '') expandedNodeIndex = index.toString();
                else expandedNodeIndex = `${parentIndex}_${index}`;
                if (item.Expanded == true)
                    this.allParentNodesIndexes.push(expandedNodeIndex);
                if (item.Selected == true) {
                    this.tvwCondition.selectedKeys = [expandedNodeIndex];
                }
                this.getAllParentNodes(item.Children, expandedNodeIndex);
            } else {
                if (item.Selected) {
                    this.tvwCondition.selectedKeys = [`${parentIndex}_${index}`];
                }
            }
        });
    }

    public chkPRN_KeyDown_Func = (s, e) => { this.chkPRN_KeyDown(s, e); };
    private chkPRN_KeyDown(sender: Object, e: KeyEventArgs): void {
        if (e.PlatformKeyCode == 13) {
            this.chkPRN.IsChecked = !this.chkPRN.IsChecked;
        }
    }

    public tvwCondition_SelectionChanged_Func = (s, e) => { this.tvwCondition_SelectionChanged(s, e); };
    private tvwCondition_SelectionChanged(sender: Object, e: SelectionChangedEventArgs): void {
        if (e.AddedItems != null && e.AddedItems.Count > 0) {
            let oItemVM: PrescriptionItemVM = ObjectHelper.CreateType<PrescriptionItemVM>(this.DataContext, PrescriptionItemVM);
            if (oItemVM != null) {
                e.AddedItems[0].dataItem.Selected = true;
                oItemVM.FormViewerDetails.BasicDetails.ConditionalDosingDetails.SelectedObservationResult = ObjectHelper.CreateType<CTreeListItem>(e.AddedItems[0].dataItem, CTreeListItem);
            }
        }
        if(e.RemovedItems != null && e.RemovedItems.Count > 0){
            e.RemovedItems[0].Selected = false;
        }
    }

    public DisposeFormEvents(): void {
        if (this.oItemVM != null && this.oItemVM.FormViewerDetails.BasicDetails.ConditionalDosingDetails != null) {
            // this.oItemVM.FormViewerDetails.BasicDetails.ConditionalDosingDetails.OnErrorEvent -= this.CondionalErrorEvent;
            // this.oItemVM.FormViewerDetails.BasicDetails.ConditionalDosingDetails.OnConfirmEvent -= this.CondionalConfirmEvent;
            // this.oItemVM.FormViewerDetails.BasicDetails.ConditionalDosingDetails.tvwConditionEnabledChangedEvent -= this.tvwEnabledChangedEvent;
            // this.oItemVM.FormViewerDetails.BasicDetails.ConditionalDosingDetails.ConditionalDoseChangedEvent -= this.onConditionalDoseChanged;
            this.oItemVM.DoCleanUP();
        }
    }
    public medConditionalDose_Unloaded(sender: Object, e: RoutedEventArgs): void {
        this.bLoaded = false;
        this.omedFormViewer = null;
        this.DisposeFormEvents();
    }

    public grdCondition_SelectionChanged(sender: Object, e: SelectionChangeEventArgs): void {
        if (this.oItemVM != null) {
            if (e.selectedRows.length > 0){
                this.oItemVM.FormViewerDetails.BasicDetails.ConditionalDosingDetails.SelectedDose = e.selectedRows[0].dataItem;
                 if(this._chkGridSelectionRef.toArray().length > 0) this._chkGridSelectionRef.toArray()[e.selectedRows[0].index].IsChecked =true;
            }
            else {
                if (this.grdCondition.selectedRowsIndex.length < 1)
                    this.oItemVM.FormViewerDetails.BasicDetails.ConditionalDosingDetails.SelectedDose = null;
                else{
                    this.oItemVM.FormViewerDetails.BasicDetails.ConditionalDosingDetails.SelectedDose = this.grdCondition.ItemsSource.array[this.grdCondition.selectedRowsIndex[this.grdCondition.selectedRowsIndex.length - 1]];
                 }
                 if(this._chkGridSelectionRef.toArray().length > 0) this._chkGridSelectionRef.toArray()[e.deselectedRows[0].index].IsChecked = false; 
                }
                this.grdCondition.UpdateCheckBoxSelection(this._chkHeaderRowCheckbox, this._chkGridSelectionRef, false);
            this.oItemVM.FormViewerDetails.BasicDetails.ConditionalDosingDetails.SelectedDoseDetails = this.grdCondition.GetSelectedRowsIndexByOrder();
            if (this.grdCondition.GetSelectedRowsIndexByOrder() != null && this.grdCondition.GetSelectedRowsIndexByOrder().Length == 0)
                this.oItemVM.FormViewerDetails.BasicDetails.ConditionalDosingDetails.ValueragneValidations();
            if (this.oItemVM.FormViewerDetails != null && this.oItemVM.FormViewerDetails.BasicDetails != null && this.oItemVM.FormViewerDetails.BasicDetails.ConditionalDosingDetails != null && this.oItemVM.FormViewerDetails.BasicDetails.InfusionType != null && !String.IsNullOrEmpty(this.oItemVM.FormViewerDetails.BasicDetails.InfusionType.Value) && String.Equals(this.oItemVM.FormViewerDetails.BasicDetails.InfusionType.Value, InfusionTypesCode.INTERMITTENT, StringComparison.OrdinalIgnoreCase)) {
                if (this.oItemVM.FormViewerDetails.BasicDetails.ConditionalDosingDetails.DoseDetails != null && this.oItemVM.FormViewerDetails.BasicDetails.ConditionalDosingDetails.DoseDetails.Count > 0) {
                    let gridContainsInfusionRate: boolean = false;
                    this.oItemVM.FormViewerDetails.BasicDetails.ConditionalDosingDetails.DoseDetails.forEach((dose) => {
                        if (!String.IsNullOrEmpty(dose.Infusionrate)) {
                            gridContainsInfusionRate = true;
                        }
                    });
                    if (!gridContainsInfusionRate) {
                        this.oItemVM.FormViewerDetails.BasicDetails.IsenableInfusionPeriod = true;
                    }
                    else {
                        this.oItemVM.FormViewerDetails.BasicDetails.IsenableInfusionPeriod = false;
                    }
                }
            }
            this.txtLowerRange.RaiseTxtChangeEvent = true;
            this.txtLowerInfusionrate.RaiseTxtChangeEvent = true;
        }
    }

    public txtDoseValue_KeyDown_Func = (s, e) => { this.txtDoseValue_KeyDown(s, e); };
    private txtDoseValue_KeyDown(sender: Object, e: KeyEventArgs): void {
        if (e.PlatformKeyCode == 189 || e.PlatformKeyCode == 109) {
            e.Handled = true;
        }
    }

    public txtLowerRange_TextChanged_Func = (s, e) => { this.txtLowerRange_TextChanged(s, e); };
    private txtLowerRange_TextChanged(sender?: Object, e?: TextChangedEventArgs): void {
        let LText: string = this.txtLowerRange.Text?.ToString();
        LText.Trim();
        let bEnable: boolean = this.oItemVM.FormViewerDetails.BasicDetails.ConditionalDosingDetails.IsUpperRateEnable();
        if (this.cboRangeValInf.SelectedItem && this.cboRangeValInf.SelectedIndex >= 0) {
            this.txtUpperRange.IsEnabled = true;
            this.txtUpperRange.IsEnabled = false;
        }
        if ((!this.cboRangeValInf.SelectedItem || this.cboRangeValInf.SelectedIndex == null || this.cboRangeValInf.SelectedIndex == undefined || this.cboRangeValInf.SelectedIndex == -1) && LText.length > 0 && bEnable)
            this.txtUpperRange.IsEnabled = true;
        else this.txtUpperRange.IsEnabled = false;
    }

    public txtLowerInfusionrate_TextChanged_Func = (s, e) => { this.txtLowerInfusionrate_TextChanged(s, e); };
    private txtLowerInfusionrate_TextChanged(sender?: Object, e?: TextChangedEventArgs): void {
        let oVM: PrescriptionItemVM = ObjectHelper.CreateType<PrescriptionItemVM>(this.DataContext, PrescriptionItemVM);
        let L1Text: string = this.txtLowerInfusionrate.Text?.ToString();
        L1Text.Trim();
        if (L1Text.length > 0) {
            this.txtUpperInfusionrate.IsEnabled = true;
            if (oVM != null && oVM.FormViewerDetails != null && oVM.FormViewerDetails.BasicDetails != null && oVM.FormViewerDetails.BasicDetails.ConditionalDosingDetails != null && oVM.FormViewerDetails.BasicDetails.ConditionalDosingDetails.Condition != null && oVM.FormViewerDetails.BasicDetails.ConditionalDosingDetails.Condition.Infratenumeratoruom != null && !String.IsNullOrEmpty(oVM.FormViewerDetails.BasicDetails.ConditionalDosingDetails.Condition.Infratenumeratoruom.Value) && oVM.FormViewerDetails.BasicDetails.ConditionalDosingDetails.Condition.InfrateDenominatoruom != null && !String.IsNullOrEmpty(oVM.FormViewerDetails.BasicDetails.ConditionalDosingDetails.Condition.InfrateDenominatoruom.Value) && oVM.FormViewerDetails.BasicDetails.InfusionType != null && !String.IsNullOrEmpty(oVM.FormViewerDetails.BasicDetails.InfusionType.Value) && String.Equals(oVM.FormViewerDetails.BasicDetails.InfusionType.Value, InfusionTypesCode.INTERMITTENT, StringComparison.OrdinalIgnoreCase)) {
                oVM.FormViewerDetails.BasicDetails.IsenableInfusionPeriod = false;
            }
        }
        else {
            this.txtUpperInfusionrate.IsEnabled = false;
            if (oVM != null && oVM.FormViewerDetails != null && oVM.FormViewerDetails.BasicDetails != null && !oVM.FormViewerDetails.BasicDetails.IsenableInfusionPeriod && (oVM.FormViewerDetails.BasicDetails.ConditionalDosingDetails.DoseDetails == null || oVM.FormViewerDetails.BasicDetails.ConditionalDosingDetails.DoseDetails.Count == 0) && oVM.FormViewerDetails.BasicDetails.InfusionType != null && !String.IsNullOrEmpty(oVM.FormViewerDetails.BasicDetails.InfusionType.Value) && String.Equals(oVM.FormViewerDetails.BasicDetails.InfusionType.Value, InfusionTypesCode.INTERMITTENT, StringComparison.OrdinalIgnoreCase)) {
                this.oItemVM.FormViewerDetails.BasicDetails.IsenableInfusionPeriod = true;
            }
        }
    }

    public cboUOMInfusionrate_SelectionChanged_Func = (s, e) => { this.cboUOMInfusionrate_SelectionChanged(s, e); };
    private cboUOMInfusionrate_SelectionChanged(sender: Object, e: SelectionChangedEventArgs): void {
        let oVM: PrescriptionItemVM = ObjectHelper.CreateType<PrescriptionItemVM>(this.DataContext, PrescriptionItemVM);
        if (e.AddedItems.Count > 0) {
            if (this.txtLowerInfusionrate != null && !String.IsNullOrEmpty(this.txtLowerInfusionrate.Text) && oVM != null && oVM.FormViewerDetails != null && oVM.FormViewerDetails.BasicDetails != null && oVM.FormViewerDetails.BasicDetails.ConditionalDosingDetails != null && oVM.FormViewerDetails.BasicDetails.ConditionalDosingDetails.Condition != null && oVM.FormViewerDetails.BasicDetails.ConditionalDosingDetails.Condition.InfrateDenominatoruom != null && !String.IsNullOrEmpty(oVM.FormViewerDetails.BasicDetails.ConditionalDosingDetails.Condition.InfrateDenominatoruom.Value) && oVM.FormViewerDetails.BasicDetails.InfusionType != null && !String.IsNullOrEmpty(oVM.FormViewerDetails.BasicDetails.InfusionType.Value) && String.Equals(oVM.FormViewerDetails.BasicDetails.InfusionType.Value, InfusionTypesCode.INTERMITTENT, StringComparison.OrdinalIgnoreCase)) {
                oVM.FormViewerDetails.BasicDetails.IsenableInfusionPeriod = false;
            }
        }
        else if (e.AddedItems.Count == 0) {
            oVM.FormViewerDetails.BasicDetails.IsenableInfusionPeriod = true;
        }
    }

    public cboUOMInfusionrate1_SelectionChanged_Func = (s, e) => { this.cboUOMInfusionrate1_SelectionChanged(s, e); };
    private cboUOMInfusionrate1_SelectionChanged(sender: Object, e: SelectionChangedEventArgs): void {
        let oVM: PrescriptionItemVM = ObjectHelper.CreateType<PrescriptionItemVM>(this.DataContext, PrescriptionItemVM);
        if (e.AddedItems.Count > 0) {
            if (this.txtLowerInfusionrate != null && !String.IsNullOrEmpty(this.txtLowerInfusionrate.Text) && oVM != null && oVM.FormViewerDetails != null && oVM.FormViewerDetails.BasicDetails != null && oVM.FormViewerDetails.BasicDetails.ConditionalDosingDetails != null && oVM.FormViewerDetails.BasicDetails.ConditionalDosingDetails.Condition != null && oVM.FormViewerDetails.BasicDetails.ConditionalDosingDetails.Condition.Infratenumeratoruom != null && !String.IsNullOrEmpty(oVM.FormViewerDetails.BasicDetails.ConditionalDosingDetails.Condition.Infratenumeratoruom.Value) && oVM.FormViewerDetails.BasicDetails.InfusionType != null && !String.IsNullOrEmpty(oVM.FormViewerDetails.BasicDetails.InfusionType.Value) && String.Equals(oVM.FormViewerDetails.BasicDetails.InfusionType.Value, InfusionTypesCode.INTERMITTENT, StringComparison.OrdinalIgnoreCase)) {
                oVM.FormViewerDetails.BasicDetails.IsenableInfusionPeriod = false;
            }
        }
        else if (e.AddedItems.Count == 0) {
            oVM.FormViewerDetails.BasicDetails.IsenableInfusionPeriod = true;
        }
    }

    public cboRangeValInf_KeyDown_Func = (s, e) => { this.cboRangeValInf_KeyDown(s, e); };
    private cboRangeValInf_KeyDown(sender: Object, e: KeyEventArgs): void {
        if (String.IsNullOrEmpty(this.cboRangeValInf.Text)) {
            this.txtUpperRange.IsEnabled = true;
        }
    }

    public cboRangeValInf_SelectionChanged_Func = (s, e) => { this.cboRangeValInf_SelectionChanged(s, e); };
    private cboRangeValInf_SelectionChanged(sender: Object, e: SelectionChangedEventArgs): void {
        let oRangeValInf: CListItem = ObjectHelper.CreateType<CListItem>(e.AddedItems[0], CListItem);
        if (oRangeValInf != null && !String.IsNullOrEmpty(oRangeValInf.Value)) {
            this.txtUpperRange.IsEnabled = false;
            this.txtUpperRange.Text = String.Empty;
        }
        else {
            this.txtUpperRange.IsEnabled = true;
        }
    }

    public cboDoseValueUOM_SelectionChanged_Func = (s, e) => { this.cboDoseValueUOM_SelectionChanged(s, e); };
    private cboDoseValueUOM_SelectionChanged(sender: Object, e: SelectionChangedEventArgs): void {
        let oVM: PrescriptionItemVM = ObjectHelper.CreateType<PrescriptionItemVM>(this.DataContext, PrescriptionItemVM);
        if (oVM != null && oVM.FormViewerDetails != null && oVM.FormViewerDetails.BasicDetails != null && oVM.FormViewerDetails.BasicDetails.ConditionalDosingDetails != null && oVM.FormViewerDetails.BasicDetails.ConditionalDosingDetails.Condition != null && this.cboDoseValueUOM.SelectedItem != null && oVM.ActionCode == ActivityTypes.Amend) {
            oVM.FormViewerDetails.BasicDetails.ConditionalDosingDetails.Condition.DoseUoM = ObjectHelper.CreateType<CListItem>((this.cboDoseValueUOM.SelectedItem), CListItem);
        }
        if (String.Compare(this.cboDoseValueUOM.GetValue(), "CC_More") == 0) {
            this.MoreOptionCode = CConstants.DoseUOMOptionCode;
            this.GetMoreComboOption();
        }
    }

    public MoreOptionCode: string;
    public GetMoreComboOption(): void {
        let objService: ManagePrescriptionWSSoapClient = new ManagePrescriptionWSSoapClient();
        objService.GetAllOptionsCompleted = (s, e) => { this.objService_GetAllOptionsCompleted(s, e); };
        let objAllRequest: CReqMsgGetAllOptions = new CReqMsgGetAllOptions();
        objAllRequest.IdentifyingOIDBC = 0;
        objAllRequest.IdentifyingTypeBC = String.Empty;
        objAllRequest.sOptionCodeBC = this.MoreOptionCode;
        objAllRequest.MCVersionNoBC = AppSessionInfo.AMCV;
        objAllRequest.oContextInformation = Common.FillContext();
        objService.GetAllOptionsAsync(objAllRequest);
    }
    objService_GetAllOptionsCompleted(sender: Object, e: GetAllOptionsCompletedEventArgs): void {
        let _ErrorID: number = 80000046;
        let _ErrorSource: string = "LorAppManagePrescriptionBBUI_P2.dll, Class:BasicDetailsVM, Method:objService_GetAllOptionsCompleted()";
        if (e.Error == null) {
            try {
                let objResponse: CResMsgGetAllOptions = e.Result;
                if (objResponse != null && objResponse.oValues != null && objResponse.oValues.Count > 0) {
                    this.oItemVM.FormViewerDetails.BasicDetails.ConditionalDosingDetails.DoseUOMs = new ObservableCollection<CListItem>();
                    for (let i: number = 0; i < objResponse.oValues.Count; i++) {
                        if (!String.IsNullOrEmpty(objResponse.oValues[i].Name)) {
                            if (PatientContext.IsINFUSIONON && this.oItemVM.FormViewerDetails.BasicDetails.Route != null && this.oItemVM.FormViewerDetails.BasicDetails.Route.Tag != null && !String.IsNullOrEmpty(this.oItemVM.FormViewerDetails.BasicDetails.Route.Tag.ToString()) && (String.Compare(this.oItemVM.FormViewerDetails.BasicDetails.Route.Tag.ToString(), "1") == 0 || this.oItemVM.FormViewerDetails.BasicDetails.Route.Tag.ToString().Contains("1"))) {
                                if (!String.Equals(objResponse.oValues[i].SealImageList, CConstants.CompositeUOM)) {
                                    this.oItemVM.FormViewerDetails.BasicDetails.ConditionalDosingDetails.DoseUOMs.Add(ObjectHelper.CreateObject(new CListItem(), {
                                        DisplayText: objResponse.oValues[i].Name,
                                        Value: objResponse.oValues[i].Code.ToString()
                                    }));
                                }
                            }
                            else {
                                this.oItemVM.FormViewerDetails.BasicDetails.ConditionalDosingDetails.DoseUOMs.Add(ObjectHelper.CreateObject(new CListItem(), {
                                    DisplayText: objResponse.oValues[i].Name,
                                    Value: objResponse.oValues[i].Code.ToString()
                                }));
                            }
                        }
                    }
                }
            }
            catch (ex: any) {
                let lnReturn: number = AMSHelper.PublicExceptionDetails(_ErrorID, _ErrorSource, ex);
            }

        }
        else {
            let lnReturn: number = AMSHelper.PublicExceptionDetails(_ErrorID, _ErrorSource, e.Error);
        }
    }
}
