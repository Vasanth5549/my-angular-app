import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { StringBuilder, ProfileFactoryType, ContextManager, Convert, AppActivity, AppLoadService } from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp, Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison, AppDialogEventargs, AppDialogResult, DelegateArgs, DialogComponentArgs, WindowButtonType, iAppDialogWindow, ObservableCollection, CListItem, ContextInfo, List, Visibility } from 'epma-platform/models';
import { AppDialog, DataTemplate, Grid, iButton, iCheckBox } from 'epma-platform/controls';
import { HelperService } from 'epma-platform/soapclient';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
import { DiscontinueCancelVM, GrdDiscontinueCancelCols, SelectedPrescriptionItemVM } from '../viewmodel/discontinuecancelvm';
import { RoutedEventArgs } from 'src/app/shared/epma-platform/controls/FrameworkElement';
import { GridExtension, SelectionChangeEventArgs } from 'src/app/shared/epma-platform/controls/epma-grid-helpers/grid-extension';
import { GridComponent } from '@progress/kendo-angular-grid';
import { CConstants, PrescriptionTypes } from '../utilities/constants';
import { disconcan1 } from '../resource/disconcan1.designer';
import { MedicationCommonBB } from '../utilities/medicationcommonbb';
import { App } from 'src/app/shared/epma-platform/controls/ResourceStyle';
import { PropertyChangedEventArgs } from 'src/app/shared/epma-platform/controls/epma-tab/epma-tab.component';
import { Resource } from '../resource';
import { CellStyle } from 'src/app/shared/epma-platform/controls/epma-grid-helpers/cell-style.component';
import { medonbehalfof } from '../view/medonbehalfof';
var that;

@Component({
    selector: 'meddiscontinuecancelChild',
    templateUrl: './meddiscontinuecancelchild.html',
    styleUrls: ['./meddiscontinuecancelchild.css'],
})
export class meddiscontinuecancelChild extends iAppDialogWindow {

    public LayoutRoot: Grid;
    private _cellStyle: {};
    GridHelper: any;
    @ViewChild("LayoutRootTempRef", { read: Grid, static: false }) set _LayoutRoot(c: Grid) {
        if (c) { this.LayoutRoot = c; }
    };
    public grdDisCancelData: GridExtension = new GridExtension();
    @ViewChild("grdDisCancelDataTempRef", { read: GridComponent, static: false }) set _grdDisCancelData(c: GridComponent) {
        if (c) { this.grdDisCancelData.grid = c; }
    };
    private cmdOnbehalfOf: iButton;
    @ViewChild("cmdOnbehalfOfTempRef", { read: iButton, static: false }) set _cmdOnbehalfOf(c: iButton) {
        if (c) { this.cmdOnbehalfOf = c; }
    };
    private cmdRemove: iButton;
    @ViewChild("cmdRemoveTempRef", { read: iButton, static: false }) set _cmdRemove(c: iButton) {
        if (c) { this.cmdRemove = c; }
    };

    private SelectCheckbox: QueryList<iCheckBox>;
    @ViewChildren('SelectCheckboxTempRef', { read: iCheckBox })
    set _SelectCheckbox(c: QueryList<iCheckBox>) {
        if (c) {
            this.SelectCheckbox = c;
        }
    }
    dataTemplates: QueryList<DataTemplate>;
    @ViewChildren('temp', { read: DataTemplate })
    set _dataTemplates(v: QueryList<DataTemplate>) {
        if (v) {
            this.dataTemplates = v;
            this.grdDisCancelData.dataTemplates = v;
        }
    }

    // @ViewChild('CellTemplateStyle', { read: CellStyle, static: false })
    // set cellTemplateStyle(value: CellStyle) {
    //     this._cellStyle = this.grdDisCancelData.setCellStyle(
    //         value,
    //         this.GridHelper.columns
    //     );
    // }

    public dccl = Resource.disconcan1;
    public grdDisCancelData1: GridExtension = new GridExtension();
    oVM: DiscontinueCancelVM;
    objmedonbehalfof: medonbehalfof;
    _selectedData: ObservableCollection<SelectedPrescriptionItemVM>;
    //public delegate void onAllergyClosed();
    public OnAllergyClosedEvent: Function;
    _bAllergy: boolean;
    public CALanchFrom: string;
    public get bAlleryChk(): boolean {
        return this._bAllergy;
    }
    public set bAlleryChk(value: boolean) {
        this._bAllergy = value;
    }
    public get objSelectedData(): ObservableCollection<SelectedPrescriptionItemVM> {
        return this._selectedData;
    }
    public set objSelectedData(value: ObservableCollection<SelectedPrescriptionItemVM>) {
        this._selectedData = value;
    }
    private _sLastMenuCode: string;
    public get SLMenuCode(): string {
        return this._sLastMenuCode;
    }
    public set SLMenuCode(value: string) {
        this._sLastMenuCode = value;
    }
    oAllGrdRows: ObservableCollection<GrdDiscontinueCancelCols>;
    public comobBoxInstance;
    public gridsLastItem:any = null;
    public gridLastItemClicked:any = null;
    constructor() {
        super();
        // InitializeComponent();
        that = this;
    }
    ngOnInit(): void {
        this.grdDisCancelData.RowIndicatorVisibility = Visibility.Collapsed;
    }

    ngAfterViewInit(): void {
        this.ChildWindow_Loaded({}, null);
        this.DataContext = this.oVM;
        this.grdDisCancelData.SetBinding("data", this.oVM.GrdData);
        // this.grdDisCancelData.SelectedItem = this.DataContext.FormViewerDetails.TechvalidateCADetails.SelectedPrescItem;
        this.grdDisCancelData.GridSelectionChange = (s, e) => { this.grdDisCancelData_SelectionChanged(s, e) };
        let itemsource: any = this.DataContext.objSelectedData.array;
        this.gridsLastItem = itemsource.length;
    }
    ContentScrollEvent(e) {
        if (this.gridsLastItem != null && this.gridLastItemClicked != null && (this.gridsLastItem - 1) == this.gridLastItemClicked) {
            this.gridLastItemClicked = null;
            this.comobBoxInstance.toggle(true);
        } else {
            this.comobBoxInstance.toggle(false);
        }
    }
    getCombo(e) {
        this.comobBoxInstance = e;
    }
    onLastItemClicked(rowIndex) {
        this.gridLastItemClicked = rowIndex;
    }
    private DisposeFormEvents(): void {
        if (this.oVM != null) {
            //--old this.oVM.PropertyChanged -= obj_PropertyChanged;
            // this.oVM.PropertyChanged = (s, e) => { this.obj_PropertyChanged(s, e); };
        }
    }
    private ChildWindow_UnLoaded(sender: Object, e: RoutedEventArgs): void {
        this.DisposeFormEvents();
    }
    private cmdOnbehalfOf_Closed(args: AppDialogEventargs): void {
        this.isOnbehalfOfLaunched = false;
        let bdialogresult: boolean = false;
        if (args.Result == AppDialogResult.Ok) {
            bdialogresult = this.objmedonbehalfof.OKButtonClick();
            if (bdialogresult && this.objmedonbehalfof != null && this.grdDisCancelData.SelectedItems != null && this.grdDisCancelData.SelectedItems.Count > 0) {
                this.grdDisCancelData.SelectedItems.forEach((oSelectedItem) => {
                    oSelectedItem.OnBehalfOf = ObjectHelper.CreateObject(new CListItem(), {
                        DisplayText: this.objmedonbehalfof.SFSOnBehalfOf.SelectedText,
                        Value: this.objmedonbehalfof.SFSOnBehalfOf.SelectedValue
                    });
                    let oSelectedValue: CListItem = new CListItem();
                    if (this.objmedonbehalfof.cboReason != null && this.objmedonbehalfof.cboReason.SelectedItem != null) {
                        oSelectedValue = ObjectHelper.CreateType<CListItem>(this.objmedonbehalfof.cboReason.SelectedItem, CListItem);
                        oSelectedItem.OnBehalfOfReason = ObjectHelper.CreateObject(new CListItem(), {
                            DisplayText: oSelectedValue.DisplayText,
                            Value: oSelectedValue.Value
                        });
                    }
                    if (this.objmedonbehalfof.cboCommunicationMode != null && this.objmedonbehalfof.cboCommunicationMode.SelectedItem != null) {
                        oSelectedValue = ObjectHelper.CreateType<CListItem>(this.objmedonbehalfof.cboCommunicationMode.SelectedItem, CListItem);
                        oSelectedItem.CommunicationMode = ObjectHelper.CreateObject(new CListItem(), {
                            DisplayText: oSelectedValue.DisplayText,
                            Value: oSelectedValue.Value
                        });
                    }
                });
                this.objmedonbehalfof.appDialog.DialogResult = bdialogresult;
            }
        }
        else if (args.Result == AppDialogResult.Cancel && this.objmedonbehalfof != null) {
            this.objmedonbehalfof.CancelButtonClick();
        }
    }
    private ChildWindow_Loaded(sender: Object, e: RoutedEventArgs): void {
        this.grdDisCancelData1 = (<GridExtension>(this.FindName("grdDisCancelData")));
        this.oVM = new DiscontinueCancelVM(this.objSelectedData);
        if (((String.IsNullOrEmpty(this.SLMenuCode)) && String.Equals(ContextInfo.MenuCode, CConstants.ClinicallyVerifyMenuCode, StringComparison.InvariantCultureIgnoreCase)) || String.Equals(this.SLMenuCode, CConstants.ClinicallyVerifyMenuCode, StringComparison.InvariantCultureIgnoreCase)) {
            this.cmdOnbehalfOf.Visibility = Visibility.Visible;
        }
        else {
            this.cmdOnbehalfOf.Visibility = Visibility.Collapsed;
        }
        if (!String.IsNullOrEmpty(this.CALanchFrom) && (String.Equals(this.CALanchFrom, PrescriptionTypes.Inpatient, StringComparison.InvariantCultureIgnoreCase) || String.Equals(this.CALanchFrom, CConstants.CADisCancelPresChart, StringComparison.InvariantCultureIgnoreCase))) {
            this.oVM.GetOmittedItemInOSS();
        }

    }
    IsOkClicked: boolean = false;
    isValid: boolean;
    public OKButtonClick(): void {
        if (this.IsOkClicked) {
            return
        }
        this.IsOkClicked = true;
        this.isValid = true;
        this.oAllGrdRows = <ObservableCollection<GrdDiscontinueCancelCols>>this.grdDisCancelData.ItemsSource;
        if (this.oVM.ReasonMandatory) {
            for (let nCnt: number = 0; nCnt < this.oAllGrdRows.Count; nCnt++) {
                if (String.Compare(this.oAllGrdRows[nCnt].strReason, "Select reason", StringComparison.CurrentCultureIgnoreCase) == 0) {
                    this.isValid = false;
                    break;
                }
            }
        }
        if (this.isValid) {
            if (this.oVM.IsAlreadyDispensed) {
                let msg: iMessageBox = new iMessageBox();
                msg.Title = "Lorenzo";
                msg.Width = 440;
                msg.MessageButton = MessageBoxButton.OK;
                msg.MessageBoxClose = (s, e) => { this.ItemDispensed_MessageBoxClose(s, e); };
                msg.Message = disconcan1.ItemDispensed_Message;
                msg.Show();
            }
            else {
                let oQuery = this.oAllGrdRows.Where(s => s.SelectedReason != null && String.Compare(s.SelectedReason.Value, "CC_MEDALLADVRECTINTO", StringComparison.CurrentCultureIgnoreCase) == 0).Select(s => s);
                this.oVM.oGrdDiscontinueCancelCols = new ObservableCollection<GrdDiscontinueCancelCols>(oQuery.AsEnumerable());
                if (this.oVM.oGrdDiscontinueCancelCols.Count > 0) {
                    this.oVM.sAllergyDetails.Clear();
                    this.oVM.iIndex = 0;
                    //old this.oVM.PropertyChanged -= new System.ComponentModel.PropertyChangedEventHandler(this.obj_PropertyChanged);
                    // this.oVM.PropertyChanged = (s, e) => { this.obj_PropertyChanged };
                    this.oVM.PropertyChanged = (s, e) => { this.obj_PropertyChanged(s, e); };
                    this.oVM.sAllergyDetails.Append("PrescriptionItemOID=" + this.oVM.oGrdDiscontinueCancelCols[this.oVM.iIndex].PrescriptionItemOID + "~");
                    let SNOMEDTerm: string = MedicationCommonBB.GetSnomedTerm(this.oVM.oGrdDiscontinueCancelCols[this.oVM.iIndex].SNOMEDCode);
                    let SNOMEDCode: string = this.oVM.oGrdDiscontinueCancelCols[this.oVM.iIndex].SNOMEDCode;
                    let AllergyType = "CC_ALGDA";
                    let sArgs = "&AllergenText=" + SNOMEDTerm + "&ALLERGYTYPE=" + AllergyType + "&AllergenCode=" + SNOMEDCode + "&MenuCodeForAllergy=MN_RECALRGY";
                    this.oVM.iIndex++;
                    // App.LaunchWizard(this.oVM.OnChildWizardClose, "MN_HI_RECALRGY", sArgs);
                    AppLoadService.LaunchWizard(this.oVM.OnChildWizardClose, "MN_HI_RECALRGY", sArgs);
                }
                else {
                    let seqQuery = this.oVM.objSelectedData.Where(seq => seq.IsSeqInfusion == true).Select(seq => seq);
                    this.oVM.objSelectedData = new ObservableCollection<SelectedPrescriptionItemVM>(seqQuery.AsEnumerable());
                    if (this.oVM.objSelectedData.Count > 0) {
                        let msg: iMessageBox = new iMessageBox();
                        msg.Title = "Lorenzo";
                        msg.Width = 360;
                        msg.MessageButton = MessageBoxButton.OKCancel;
                        msg.MessageBoxClose = (s, e) => { this.Seq_MessageBoxClose(s, e); };
                        if (this.ValidateOSSOmittedAlertMsg(this.oVM.objSelectedData)) {
                            msg.Width = 500;
                            msg.Height = 170;
                            msg.Message = disconcan1.OSSOmitted_Message;
                        }
                        else {
                            msg.Message = disconcan1.SeqInfusion_DiscontinueCancel;
                        }
                        msg.Show();
                    }
                    else {
                        if (this.OnAllergyClosedEvent != null)
                            this.OnAllergyClosedEvent();
                    }
                }
            }
        }
        else {
            let msg: iMessageBox = new iMessageBox();
            msg.Title = "LORENZO";
            msg.Width = 360;
            msg.IconType = MessageBoxType.Information;
            msg.MessageButton = MessageBoxButton.OK;
            msg.MessageBoxClose = (s, e) => { this.ReasonNotFilled_MessageBoxClose(s, e); };
            msg.Message = disconcan1.Empty_Validation_Message;
            msg.Show();
        }
    }
    Seq_MessageBoxClose(sender: Object, e: MessageEventArgs): void {
        this.IsOkClicked = false;
        // if (e.MessageBoxResult == LORENZO.BlueBird.Controls.MessageBoxResult.OK) {
        if (e.MessageBoxResult == MessageBoxResult.OK) {
            if (this.OnAllergyClosedEvent != null)
                this.OnAllergyClosedEvent();
        }
    }
    private ValidateOSSOmittedAlertMsg(oSelectedData: ObservableCollection<SelectedPrescriptionItemVM>): boolean {
        let IsShownOmittedMsg: boolean = false;
        if (oSelectedData != null && oSelectedData.Count > 0) {
            let grpGroupSequenceNo = oSelectedData.GroupBy(g => g.NonIVGroupSequenceNo).ToList();
            if (grpGroupSequenceNo != null && grpGroupSequenceNo.Count > 0) {
                let nCount: number = grpGroupSequenceNo.Count;
                for (let i: number = 0; i < nCount; i++) {
                    IsShownOmittedMsg = false;
                    let IsOmittedItem = oSelectedData.Any(c => c.NonIVGroupSequenceNo == grpGroupSequenceNo[i].Key && c.IsOmittedSeqItem);
                    if (!IsOmittedItem) {
                        IsShownOmittedMsg = oSelectedData.Any(x => x.NonIVGroupSequenceNo == grpGroupSequenceNo[i].Key && x.IsShowOmitMessageInSeq);
                        if (IsShownOmittedMsg) {
                            break;
                        }
                    }
                }
            }
        }
        return IsShownOmittedMsg;
    }
    ReasonNotFilled_MessageBoxClose(sender: Object, e: MessageEventArgs): void {
        let top : any  = window.top;
        if(top.msgAlert == false){
            top.msgAlert = true;
        }
        this.IsOkClicked = false;
    }
    ItemDispensed_MessageBoxClose(sender: Object, e: MessageEventArgs): void {
        this.IsOkClicked = false;
        this.oVM.IsAlreadyDispensed = false;
        this.OKButtonClick();
    }
    obj_PropertyChanged(sender: Object, e: PropertyChangedEventArgs): void {
        this.IsOkClicked = false;
        if (e.PropertyName == "WindowClosed") {
            if (this.oVM.sAllergyDetails.Length > 0) {
                let sAllergyDetails: string[] = this.oVM.sAllergyDetails.ToString().Split('~');
                if (sAllergyDetails.length == 2) {
                    let PrescriptionItemOID: string[] = sAllergyDetails[0].Split('=');
                    let AllergyID: string[] = sAllergyDetails[1].Split('=');
                    if (PrescriptionItemOID.length == 2 && AllergyID.length == 2) {
                        for (let nRowIndex = 0; nRowIndex < this.oAllGrdRows.Count; nRowIndex++) {
                            if (PrescriptionItemOID[1] == this.oAllGrdRows[nRowIndex].PrescriptionItemOID.ToString()) {
                                this.oAllGrdRows[nRowIndex].sAllergyIDs = AllergyID[1];
                                break;
                            }
                        }
                    }
                }
                if (this.oVM.iIndex == this.oVM.oGrdDiscontinueCancelCols.Count) {
                    let seqQuery = this.oVM.objSelectedData.Where(seq => seq.IsSeqInfusion == true).Select(seq => seq);
                    this.oVM.objSelectedData = new ObservableCollection<SelectedPrescriptionItemVM>(seqQuery.AsEnumerable());
                    if (this.oVM.objSelectedData.Count > 0) {
                        let msg: iMessageBox = new iMessageBox();
                        msg.Title = "Lorenzo";
                        msg.MessageButton = MessageBoxButton.OKCancel;
                        msg.MessageBoxClose = (s, e) => { this.Seq_MessageBoxClose(s, e); };
                        msg.Message = disconcan1.SeqInfusion_DiscontinueCancel;
                        msg.Show();
                    }
                    else {
                        if (this.OnAllergyClosedEvent != null)
                            this.OnAllergyClosedEvent();
                    }
                    //--old  this.oVM.PropertyChanged -= new System.ComponentModel.PropertyChangedEventHandler(this.obj_PropertyChanged);
                    // this.oVM.PropertyChanged = (s, e) => { this.obj_PropertyChanged(s, e); };
                }
            }
        }
    }
    public CancelButtonClick(): void {
        let iMsgBox: iMessageBox = ObjectHelper.CreateObject(new iMessageBox(), {
            Title: "LORENZO",
            Message: disconcan1.Cancel_Error_Message,
            MessageButton: MessageBoxButton.YesNo,
            IconType: MessageBoxType.Question
        });
        iMsgBox.MessageBoxClose = (s, e) => { this.iMsgBox_MessageBoxClose(s, e); };
        iMsgBox.Show();
        // ObjectHelper.stopFinishAndCancelEvent(true);
    }
    iMsgBox_MessageBoxClose(sender: Object, e: MessageEventArgs): void {
        if (e.MessageBoxResult == MessageBoxResult.Yes) {
            // ObjectHelper.stopFinishAndCancelEvent(false);
            this.dupDialogRef.close();
        }else if (e.MessageBoxResult == MessageBoxResult.No) {
            // ObjectHelper.stopFinishAndCancelEvent(true);
        }
    }

    public cmdRemove_Click(sender: Object, e: RoutedEventArgs): void {
        let objItems: ObservableCollection<Object> = this.grdDisCancelData.GetSelectedRows();
        let nSelRowsIndex: number[] = this.grdDisCancelData.GetSelectedRowsIndex();

        nSelRowsIndex.forEach((index) => {
            if (this.oVM != null && this.oVM.objSelectedData != null && this.oVM.objSelectedData.Count > 0) {
                let lnRemoveItemOID: number = this.oVM.GrdData[index].PrescriptionItemOID;
                let objSelItem: SelectedPrescriptionItemVM = this.oVM.objSelectedData.Where(x => x.PrescriptionItemOID == lnRemoveItemOID).FirstOrDefault();
                let selIndex: number = this.oVM.objSelectedData.IndexOf(objSelItem);
                if (objSelItem != null) {
                    this.oVM.objSelectedData.RemoveAt(selIndex);
                }
            }
        });

        for (let i: number = 0; i < objItems.Length; i++) {
            let lnRemoveGrdItemOID: number = objItems[i].PrescriptionItemOID;
            let objGrdItem: GrdDiscontinueCancelCols = this.oVM.GrdData.Where(item => item.PrescriptionItemOID == lnRemoveGrdItemOID).FirstOrDefault();
            let GrdIndex: number = this.oVM.GrdData.IndexOf(objGrdItem);
            if (objGrdItem != null) {
                this.grdDisCancelData.DeleteRow(this.oVM.GrdData[GrdIndex]);
            }
        }

        if (this.oVM.objSelectedData != null && this.oVM.objSelectedData.Count > 0 && this.oVM.objSelectedData.Any(a => a.NonIVGroupSequenceNo > 0)) {
            this.oVM.objSelectedData.ForEach(ReAssign => {
                ReAssign.IsOmittedSeqItem = false;
                ReAssign.IsShowOmitMessageInSeq = false;
            });
            this.oVM.GetOmittedItemInOSS();
        }

        this.ClearCheckboxSelection();
        this.grdDisCancelData.selectedRowsIndex = [];
        this.cmdRemove.IsEnabled = false;
        this.cmdOnbehalfOf.IsEnabled=false;

    }

    private grdDisCancelData_SelectionChanged(sender: Object, e: SelectionChangeEventArgs): void {
        if (this.grdDisCancelData.GetSelectedRowCount() > 0) {
            this.cmdRemove.IsEnabled = true;
            this.cmdOnbehalfOf.IsEnabled = true;
        }
        else {
            this.cmdRemove.IsEnabled = false;
            this.cmdOnbehalfOf.IsEnabled = false;
        }
    }
    isOnbehalfOfLaunched: boolean = false;
    cmdOnbehalfOf_Click_Func = (s,e) => {
        Object.keys(that).forEach((prop) => (this[prop] = that[prop]));
        this.cmdOnbehalfOf_Click(s,e);
    }
    public cmdOnbehalfOf_Click(sender: Object, e: RoutedEventArgs): void {
        if (!this.isOnbehalfOfLaunched) {
            this.isOnbehalfOfLaunched = true;
            //to be re-visit
            this.objmedonbehalfof = new medonbehalfof();
            let oItemVM: GrdDiscontinueCancelCols = ObjectHelper.CreateType<GrdDiscontinueCancelCols>(this.grdDisCancelData.SelectedItem, GrdDiscontinueCancelCols);
            if (oItemVM != null && oItemVM.OnBehalfOf == null && this.grdDisCancelData.SelectedItems != null && this.grdDisCancelData.SelectedItems.Count == 1) {
                this.objmedonbehalfof.PrescriberName = oItemVM.PrescriberOBHName.Trim();
                this.objmedonbehalfof.PrescriberOID = Convert.ToString(oItemVM.PrescriberOBHOID);
            }
            if (oItemVM != null && oItemVM.OnBehalfOf != null && this.grdDisCancelData.SelectedItems != null && this.grdDisCancelData.SelectedItems.Count == 1) {
                let oSelectedItems: List<CListItem> = new List<CListItem>();
                let oItem: CListItem = new CListItem();
                oItem.DisplayText = oItemVM.OnBehalfOf.DisplayText;
                oItem.Value = oItemVM.OnBehalfOf.Value;
                oSelectedItems.Add(oItem);
                this.objmedonbehalfof.SFSOnBehalfOf.ItemsSource = oSelectedItems;
                if (oSelectedItems != null) {
                    this.objmedonbehalfof.SFSOnBehalfOf.SelectedValue = oSelectedItems[0].Value;
                    this.objmedonbehalfof.SFSOnBehalfOf.SelectedText = oSelectedItems[0].DisplayText;
                    this.objmedonbehalfof.PrescriberName = oSelectedItems[0].DisplayText;
                    this.objmedonbehalfof.PrescriberOID = oSelectedItems[0].Value;      
                }
                if (oItemVM.OnBehalfOfReason != null && !String.IsNullOrEmpty(oItemVM.OnBehalfOfReason.Value)) {
                    this.objmedonbehalfof.OnBehalfOfReason = oItemVM.OnBehalfOfReason.DisplayText;
                    this.objmedonbehalfof.OnBehalfOfReasonValue = oItemVM.OnBehalfOfReason.Value;
                }
                if (oItemVM.CommunicationMode != null && !String.IsNullOrEmpty(oItemVM.CommunicationMode.Value)) {
                    this.objmedonbehalfof.CommunicationMode = oItemVM.CommunicationMode.DisplayText;
                    this.objmedonbehalfof.CommunicationModeValue = oItemVM.CommunicationMode.Value;
                }
            }
            AppActivity.OpenWindow("On behalf of details", this.objmedonbehalfof,(s,e) => {this.cmdOnbehalfOf_Closed(s);}, "", false, 200, 425, false, WindowButtonType.OkCancel, null);
        }
    }

    private ClearCheckboxSelection() {
        this.SelectCheckbox.forEach((checkbox: iCheckBox) => {
            checkbox.IsChecked = false;
        });
    }
}
// meddiscontinuecancelChild.ArraySorter.SortDescending<number>(nSelRowsIndex);

// export module meddiscontinuecancelChild {
//     export class ArraySorter<T extends IComparable>
//     {
//         public static SortDescending<T extends IComparable>(array: T[]): void {
//             Array<any>.Sort<T>(array, ArraySorter.s_Comparer);
//         }
//         static private s_Comparer: ReverseComparer = new ReverseComparer();
//     }
//     export module ArraySorter {
//         export class ReverseComparer implements IComparer<T>
//         {
//             public Compare(object1: T, object2: T): number {
//                 return -(<IComparable>object1).CompareTo(object2);
//             }
//         }
//     }
// }
