import { Component, ViewChild } from '@angular/core';
import { Convert } from 'epma-platform/services';
import { StringComparison, HtmlPage, CultureInfo } from 'epma-platform/models';
import { Border, TextBlock, iComboBox, iDateTimePicker, iLabel } from 'epma-platform/controls';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, iMessageBox, MessageBoxButton, MessageBoxType } from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
import { CListItem, List, SelectionChangedEventArgs, Visibility, iAppDialogWindow } from "epma-platform/models";
import { OverViewChartData } from "../viewmodel/MedicationChartVM";
import { RoutedEventArgs } from "src/app/shared/epma-platform/controls/FrameworkElement";
// import { ChartContext, MedChartData, ValueDomainValues } from "../utilities/globalvariable";
import { ChartContext, MedChartData, ValueDomainValues } from 'src/app/lorappmedicationadminbbui/utilities/globalvariable';
import { CConstants, ValueDomain } from "../utilities/CConstants";
import { CommonBB } from "src/app/lorappcommonbb/utilities/common";
import { DateChangedArgs } from "src/app/shared/epma-platform/controls/Control";
import { DateTimeKind } from "epma-platform/DateTime";
import { PatientContext } from "src/app/lorappcommonbb/utilities/globalvariable";
import { ScriptObject } from "epma-platform/services";
import { Common } from "src/app/lorappmanageprescriptionbbui/utilities/common";
import { Resource } from "../resource";
import { StackPanel } from 'src/app/shared/epma-platform/controls-model/StackPanel';
import { iSFS } from 'src/app/shared/epma-platform/controls/epma-isfs/epma-isfs.component';
import * as ControlStyles from "../../shared/epma-platform/controls/ControlStyles";

@Component({
    selector: 'MedSortFilterbyOptions',
    templateUrl: './MedSortFilterbyOptions.html',
    styleUrls: ['./MedSortFilterbyOptions.css']
})
export class MedSortFilterbyOptions extends iAppDialogWindow {

    oOverViewData: OverViewChartData;
    public lnMedChartOID: number;
    public lnEncOID: number;
    public lnMergedPatientOID:number;
    public lnMedChartPatOID:number;
    public dtMCStartDTTM: DateTime;
    public dtMCEndDTTM: DateTime;
    public dtMedChartDataSuspendedOn: DateTime = DateTime.MinValue;
    public dtMedChartDataActiveFrom = DateTime.MinValue;
    public  dtMedChartDataActiveTo = DateTime.MinValue;
    public sMedChartDataChartStatus: string = String.Empty;
    public nMedChartDataMedChartOID: number = 0;
    sChartStatus: string = String.Empty;
    sEncMainId: string = String.Empty;
    sEncType: string = String.Empty;
    sEncStatusCCode: string = String.Empty;
    public SortBy: CListItem;
    public FilterEnctrBy: CListItem = new CListItem();
    IsPageLoad: boolean = false;
    IsPrescriptionChartInvoked: boolean = false;
    oLstItemEnc: List<CListItem> = null;
    isExceptionOccured: boolean = false;
    isCancelButtonClicked: boolean = false;
    isDiscontinueChecked: boolean = false;
    public medViewOptionValue: CListItem;
    IsFromDateChanged: boolean = false;
    IsViewChanged: boolean = false;
    oOverViewChartData: OverViewChartData; 
    isPrescriptionChartInvoked: boolean;
    public SortFilterOptions = Resource.MedSortFilterbyOptionsDesign;
    public Styles = ControlStyles;
    cboMedView_SelectionChanged_Func:Function;
    dtpFromdate_OnDateValueChanged_Func:Function;
    dtpFromdate_LostFocus_Func:Function;
    

    public LayoutRoot: StackPanel;
    @ViewChild("LayoutRootTempRef", { read: StackPanel, static: false }) set _LayoutRoot(c: StackPanel) {
        if (c) { this.LayoutRoot = c; }
    };
    public lblMedicationView: iLabel;
    @ViewChild("lblMedicationViewTempRef", { read: iLabel, static: false }) set _lblMedicationView(c: iLabel) {
        if (c) { this.lblMedicationView = c; }
    };
    public lblMedicationViewText: iLabel;
    @ViewChild("lblMedicationViewTextTempRef", { read: iLabel, static: false }) set _lblMedicationViewText(c: iLabel) {
        if (c) { this.lblMedicationViewText = c; }
    };
    public cboMedView: iComboBox = new iComboBox();
    @ViewChild("cboMedViewTempRef", { read: iComboBox, static: false }) set _cboMedView(c: iComboBox) {
        if (c) { this.cboMedView = c; }
    };
    public brdFilter: Border;
    @ViewChild("brdFilterTempRef", { read: Border, static: false }) set _brdFilter(c: Border) {
        if (c) { this.brdFilter = c; }
    };
     lblFilterby: iLabel;
    @ViewChild("lblFilterbyTempRef", { read: iLabel, static: false }) set _lblFilterby(c: iLabel) {
        if (c) { this.lblFilterby = c; }
    };
     lblFrom: iLabel;
    @ViewChild("lblFromTempRef", { read: iLabel, static: false }) set _lblFrom(c: iLabel) {
        if (c) { this.lblFrom = c; }
    };
     sfsEncounter: iSFS;
    @ViewChild("sfsEncounterTempRef", { read: iSFS, static: false }) set _sfsEncounter(c: iSFS) {
        if (c) { this.sfsEncounter = c; }
    };
     dtpFromdate: iDateTimePicker;
    @ViewChild("dtpFromdateTempRef", { read: iDateTimePicker, static: false }) set _dtpFromdate(c: iDateTimePicker) {
        if (c) { this.dtpFromdate = c; }
    };
     splSortOption: StackPanel;
    @ViewChild("splSortOptionTempRef", { read: StackPanel, static: false }) set _splSortOption(c: StackPanel) {
        if (c) { this.splSortOption = c; }
    };
     brdSort: Border;
    @ViewChild("brdSortTempRef", { read: Border, static: false }) set _brdSort(c: Border) {
        if (c) { this.brdSort = c; }
    };
     lblSort: TextBlock;
    @ViewChild("lblSortTempRef", { read: TextBlock, static: false }) set _lblSort(c: TextBlock) {
        if (c) { this.lblSort = c; }
    };
     lblSortby: iLabel;
    @ViewChild("lblSortbyTempRef", { read: iLabel, static: false }) set _lblSortby(c: iLabel) {
        if (c) { this.lblSortby = c; }
    };

     public cboSortby: iComboBox = new iComboBox();
    @ViewChild("cboSortbyTempRef", { read: iComboBox, static: false }) set _cboSortby(c: iComboBox) {
        if (c) { this.cboSortby = c; }
    };

    constructor() {
        super();
 
    }
    constructorImpl(oOverViewChartData: OverViewChartData, isPrescriptionChartInvoked: boolean) {
        this.oLstItemEnc = new List<CListItem>();
        this.oOverViewData = oOverViewChartData;
        this.DataContext = ObjectHelper.CreateType<OverViewChartData>(this.oOverViewData,OverViewChartData);
        this.lnEncOID = this.oOverViewData.EncounterOID;
        this.sEncMainId = this.oOverViewData.EncMainID;
        this.sEncType = this.oOverViewData.EncType;
        this.SortBy = this.oOverViewData.SortByValue;
        this.medViewOptionValue = this.oOverViewData.MedViewOptionValue;
        this.IsPrescriptionChartInvoked = isPrescriptionChartInvoked;
        this.lnMedChartOID = this.oOverViewData.MedChartOID;
        this.dtMCStartDTTM = this.oOverViewData.ActiveFrom;
        this.dtMCEndDTTM = this.oOverViewData.ActiveTo;
        this.sChartStatus = this.oOverViewData.ChartStatus;
        this.lnMergedPatientOID = PatientContext.MergedPatientOID;
        this.sEncStatusCCode = PatientContext.EncounterCode;
        this.dtMedChartDataSuspendedOn = MedChartData.SuspendedOn;
        this.nMedChartDataMedChartOID = MedChartData.MedChartOID;
        this.sMedChartDataChartStatus = MedChartData.ChartStatus;
        this.dtMedChartDataActiveFrom = MedChartData.ActiveFrom;
        this.dtMedChartDataActiveTo = MedChartData.ActiveTo;
        this.lnMedChartPatOID = this.oOverViewData.MedChartPatOID;
        // this.sfsEncounter.Visibility = Visibility.Collapsed;
        

    }
    ngAfterViewInit() {
        this.cboMedView.Visibility = Visibility.Visible;
        this.lblMedicationViewText.Visibility = Visibility.Visible;
        this.MedSortFilterbyOptions_Loaded(null, null);
        
        
    }
    ngOnInit(): void {
        this.DataContext = new OverViewChartData();        
        this.cboMedView_SelectionChanged_Func = (s, e) => { this.cboMedView_SelectionChanged(s, e) };
        this.dtpFromdate_OnDateValueChanged_Func =(s,e) => { this.dtpFromdate_OnDateValueChanged(s, e) };
        this.dtpFromdate_LostFocus_Func = (s,e) => { this.dtpFromdate_LostFocus(s, e) };
    }

    MedSortFilterbyOptions_Loaded(sender: Object, e: RoutedEventArgs): void {
        this.IsPageLoad = true;
        this.DataContext = this.oOverViewData;
        if (this.cboSortby.ItemsSource == null || (this.cboSortby.ItemsSource != null && this.cboSortby.ItemsSource.Count ==0) ) {
            this.oOverViewData.GetDomainComboCompletedEvent = (s, e) => { this.oOverViewData_GetDomainComboCompletedEvent(); };
            this.oOverViewData.GetDomainCombo(ValueDomain.SortByStatus + "," + ValueDomain.MedicationView);
            
        }
        else {
            this.oOverViewData_GetDomainComboCompletedEvent();
        }
    }
    oOverViewData_GetDomainComboCompletedEvent() :void{
          this.oOverViewData.GetDomainComboCompletedEvent  = (s,e) => { this.oOverViewData_GetDomainComboCompletedEvent(); } ;
        //this.oOverViewData.GetDomainComboCompletedEvent -= new OverViewChartData.GetDomainComboCompleted(this.oOverViewData_GetDomainComboCompletedEvent);
        this.SetValidDateTimeSelectionRange();
        this.SetDateTimePickerSelectedValue(this.oOverViewData.ActiveFrom);
        if (this.oOverViewData.SortByStatus != null && this.oOverViewData.SortByStatus.Count > 0) {
            if (this.oOverViewData.SortByValue != null)
                this.cboSortby.SelectedItem = this.oOverViewData.SortByValue;
            else this.cboSortby.SelectedIndex = 0;
        }
        this.oOverViewData.SortByValue= this.oOverViewData.SortByStatus[0];
        this.FilterEnctrBy.DisplayText = this.sEncType + " " + this.sEncMainId;
        this.FilterEnctrBy.Value = this.lnEncOID.ToString();
        this.oLstItemEnc.Add(this.FilterEnctrBy);
        // this.sfsEncounter.ItemsSource = this.oLstItemEnc;
        // this.sfsEncounter.SelectedValue = this.FilterEnctrBy.Value;
        if (MedChartData.Is7DayView) {
            this.GetMedViewOptionCListItem("CC_7DAYVIEW");
        }
        else {
            this.GetMedViewOptionCListItem("CC_14DAYVIEW");
        }
    }
    GetMedViewOptionCListItem(sViewOption: string): void {      
        if (this.oOverViewData.MedViewOptionList != null && this.oOverViewData.MedViewOptionValue == null) {
            let nCount: number = this.oOverViewData.MedViewOptionList.Count;
            for (let i: number = 0; i < nCount; i++) {
                if (String.Compare(this.oOverViewData.MedViewOptionList[i].Value, sViewOption, StringComparison.CurrentCultureIgnoreCase) == 0) {
                    this.oOverViewData.MedViewOptionValue = this.oOverViewData.MedViewOptionList[i];
                    this.IsViewChanged = true;
                    break;
                }
            }
        }
    }
     cboMedView_SelectionChanged(sender: Object, e: SelectionChangedEventArgs): void {
        let dtServerDate: DateTime = CommonBB.GetServerDateTime();
        if (!this.IsPrescriptionChartInvoked) {
            if ( this.IsViewChanged && !this.IsFromDateChanged && dtServerDate.NotEquals(DateTime.MinValue) && MedChartData.ActiveFrom.NotEquals(DateTime.MinValue)) {
                if (this.cboMedView.GetValue() == "CC_7DAYVIEW") {
                    //let tsCompareStartDate: TimeSpan = dtServerDate - MedChartData.ActiveFrom;
                    let tsCompareStartDate: TimeSpan = dtServerDate.DateTime.Diff(MedChartData.ActiveFrom);
                    //let tsCompareStartDate: TimeSpan = new TimeSpan(dtServerDate.Subtract(MedChartData.ActiveFrom).ToString("hh\:mm"));
                    if (tsCompareStartDate.Days < 4)
                        this.oOverViewData.ActiveFrom = this.oOverViewData.ValidateDate = MedChartData.ActiveFrom;
                    else this.oOverViewData.ActiveFrom = this.oOverViewData.ValidateDate = dtServerDate.DateTime.AddDays(-3);
                    this.oOverViewData.ActiveTo = this.oOverViewData.ActiveFrom.AddDays(6);
                }
                else {
                    let tsCompareStartDate: TimeSpan = dtServerDate.DateTime.Diff(MedChartData.ActiveFrom);
                    //let tsCompareStartDate: TimeSpan = dtServerDate - MedChartData.ActiveFrom;
                    if (tsCompareStartDate.Days < 7)
                        this.oOverViewData.ActiveFrom = this.oOverViewData.ValidateDate = MedChartData.ActiveFrom;
                    else this.oOverViewData.ActiveFrom = this.oOverViewData.ValidateDate = dtServerDate.DateTime.AddDays(-6);
                    this.oOverViewData.ActiveTo = this.oOverViewData.ActiveFrom.AddDays(13);
                }
                this.IsFromDateChanged = false;
            }
        }
    }
  public cmdOK_Click(): boolean {
        let returnValue: boolean = false;
        // if (this.sfsEncounter.SelectedValue == null) {
        //     if (this.oLstItemEnc != null && this.oLstItemEnc.Count > 0) {
        //         this.sfsEncounter.ItemsSource = this.oLstItemEnc;
        //         this.sfsEncounter.SelectedValue = this.FilterEnctrBy.Value;
        //     }
        // }
        // else {
            if (this.IsMedChartEncounterAssociated()) {
                if (this.dtpFromdate._RangeStartDate.Date.NotEquals(DateTime.MinValue)) {
                    
                    if (this.oOverViewData.ValidateDate.Equals(DateTime.MinValue)) {
                        this.oOverViewData.ValidateDate = MedChartData.ActiveFrom;
                        return returnValue;
                    }
                    this.oOverViewData.ValidateDate = this.oOverViewData.ActiveFrom = this.dtpFromdate.SelectedDateTime.Date;
                }
                else {
                    if (this.oOverViewData.ValidateDate.Equals(DateTime.MinValue)) {
                        this.oOverViewData.ValidateDate = MedChartData.ActiveFrom;
                        return returnValue;
                    }
                    this.oOverViewData.ValidateDate = this.oOverViewData.ActiveFrom;
                }
                if (this.oOverViewData.MedViewOptionValue != null && String.Compare(this.oOverViewData.MedViewOptionValue.Value, "CC_14DAYVIEW") == 0) {
                    if (String.Compare(this.oOverViewData.ChartStatus, CConstants.sChartActiveStatusCode, StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(this.oOverViewData.ChartStatus, CConstants.sChartSuspendedStatusCode, StringComparison.CurrentCultureIgnoreCase) == 0) {
                        this.oOverViewData.ActiveTo = this.oOverViewData.ActiveFrom.AddDays(13);
                    }
                    else {
                        // let tsCompareEndDate: TimeSpan =  MedChartData.ActiveTo.Date - this.oOverViewData.ActiveFrom.Date;// --need to check once
                        let tsCompareEndDate: TimeSpan = MedChartData.ActiveTo.Date.Diff(this.oOverViewData.ActiveFrom.Date);
                        if (tsCompareEndDate.Days >= 13) {
                            this.oOverViewData.ActiveTo = this.oOverViewData.ActiveFrom.DateTime.AddDays(13);
                        }
                        else {
                            this.oOverViewData.ActiveFrom = MedChartData.ActiveTo.DateTime.AddDays(-13);
                            if (this.oOverViewData.ActiveFrom.Date < MedChartData.ActiveFrom.Date)
                                this.oOverViewData.ActiveFrom = MedChartData.ActiveFrom.Date;
                            this.oOverViewData.ActiveTo = this.oOverViewData.ActiveFrom.AddDays(13);
                        }
                    }
                    this.oOverViewData.SortByValue = ObjectHelper.CreateType<CListItem>(this.oOverViewData.SortByValue, CListItem);
                }
                else {
                    if ((String.Compare(MedChartData.ChartStatus, CConstants.sChartActiveStatusCode, StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(MedChartData.ChartStatus, CConstants.sChartSuspendedStatusCode, StringComparison.CurrentCultureIgnoreCase) == 0)) {
                        this.oOverViewData.ActiveTo = this.oOverViewData.ActiveFrom.AddDays(6);
                    }
                    else {
                        //let tsCompareEndDate: TimeSpan = MedChartData.ActiveTo.Date - this.oOverViewData.ActiveFrom.Date;
                        let tsCompareEndDate: TimeSpan = MedChartData.ActiveTo.Date.Diff(this.oOverViewData.ActiveFrom.Date);
                        if (tsCompareEndDate.Days >= 6) {
                            this.oOverViewData.ActiveTo = this.oOverViewData.ActiveFrom.DateTime.AddDays(6);
                        }
                        else {
                            this.oOverViewData.ActiveFrom = MedChartData.ActiveTo.DateTime.AddDays(-6);
                            if (this.oOverViewData.ActiveFrom.Date < MedChartData.ActiveFrom.Date)
                                this.oOverViewData.ActiveFrom = MedChartData.ActiveFrom.Date;
                            this.oOverViewData.ActiveTo = this.oOverViewData.ActiveFrom.AddDays(6);
                        }
                    }
                }
                returnValue = true;
            }
            else {
                let iMsgBox: iMessageBox = ObjectHelper.CreateObject(new iMessageBox(), {
                    Title: "LORENZO",
                    Message: Resource.MedSortFilterbyOptionsDesign.ErrMsgMedChartEncNotAssociated,
                    MessageButton: MessageBoxButton.OK,
                    IconType: MessageBoxType.Critical
                });
                iMsgBox.MessageBoxClose = (s, e) => { this.iMsgBox_MessageBoxClose(s, e); };
                iMsgBox.Show();
            }
            return returnValue;
        // }
        // return returnValue;
    }
    iMsgBox_MessageBoxClose(sender: Object, e: MessageEventArgs): void {
        this.sfsEncounter.Focus();
    }
    IsMedChartEncounterAssociated(): boolean {
        if (MedChartData.MedChartOID > 0) {
            return true;
        }
        return false;
    }
    public cmdCancel_Click(): void {
        this.isCancelButtonClicked = true;
        this.oOverViewData.MedViewOptionValue = this.medViewOptionValue;
        this.oOverViewData.SortByValue = this.SortBy;
        ChartContext.EncounterOID = this.oOverViewData.EncounterOID = this.lnEncOID;
        this.oOverViewData.EncMainID = this.sEncMainId;
        this.oOverViewData.EncType = this.sEncType;
        ChartContext.EncounterType = Common.GetConceptCode(this.sEncType, ValueDomainValues.oEncTyp);
        this.oOverViewData.MedChartOID = this.lnMedChartOID;
        this.oOverViewData.ActiveFrom = this.dtMCStartDTTM;
        this.oOverViewData.ActiveTo = this.dtMCEndDTTM;
        this.oOverViewData.ChartStatus = this.sChartStatus;
        MedChartData.SuspendedOn = this.dtMedChartDataSuspendedOn;
        MedChartData.MedChartOID = this.nMedChartDataMedChartOID;
        MedChartData.ChartStatus = this.sMedChartDataChartStatus;
        MedChartData.ActiveFrom = this.dtMedChartDataActiveFrom;
        MedChartData.ActiveTo = this.dtMedChartDataActiveTo;
        PatientContext.MergedPatientOID = this.lnMergedPatientOID;
        PatientContext.EncounterCode = this.sEncStatusCCode;
        ChartContext.PatientOID = this.oOverViewData.MedChartPatOID = this.lnMedChartPatOID;
        this.appDialog.DialogResult = true;
    }
     sfsEncounter_OnSFSOpen(sender: Object, e: RoutedEventArgs): void {
        let returnValue: ScriptObject = ObjectHelper.CreateType<ScriptObject>(HtmlPage.Window.Invoke("SelectEncounter", PatientContext.PatientOID), ScriptObject);
        if (returnValue != null && returnValue.GetProperty("length") != null) {
            MedChartData.MedChartOID = 0;
            MedChartData.ChartStatus = String.Empty;
            MedChartData.ActiveFrom = DateTime.MinValue;
            MedChartData.ActiveTo = DateTime.MinValue;
            if (returnValue.GetProperty("EncMainID") != null && returnValue.GetProperty("EncMainID").ToString().Length > 0)
                this.oOverViewData.EncMainID = returnValue.GetProperty("EncMainID").ToString();
            if (returnValue.GetProperty("EncType") != null && returnValue.GetProperty("EncType").ToString().Length > 0)
                this.oOverViewData.EncType = returnValue.GetProperty("EncType").ToString();
            if (returnValue.GetProperty("EncounterOID") != null && returnValue.GetProperty("EncounterOID").ToString().Length > 0)
                this.oOverViewData.EncounterOID = Convert.ToInt64(returnValue.GetProperty("EncounterOID"));
            if (returnValue.GetProperty("EncStatusText") != null && returnValue.GetProperty("EncStatusText").ToString().Length > 0)
                PatientContext.EncounterCode = Common.GetConceptCode(returnValue.GetProperty("EncStatusText").ToString().Trim(), ValueDomainValues.oENCSTATUSVALUEDOMAINCODE);
            if (returnValue.GetProperty("MedChartOID") != null && returnValue.GetProperty("MedChartOID").ToString().Length > 0) {
                MedChartData.MedChartOID = this.oOverViewData.MedChartOID = Convert.ToInt64(returnValue.GetProperty("MedChartOID"));
            }
            if (returnValue.GetProperty("MedChartStartDTTM") != null && returnValue.GetProperty("MedChartStartDTTM").ToString().Length > 0) {
                MedChartData.ActiveFrom = this.oOverViewData.ActiveFrom = DateTime.ParseExact(<string>returnValue.GetProperty("MedChartStartDTTM"), "dd/MM/yyyy HH:mm:ss", CultureInfo.InvariantCulture).Date;
            }
            if (returnValue.GetProperty("MedChartEndDTTM") != null && returnValue.GetProperty("MedChartEndDTTM").ToString().Length > 0) {
                MedChartData.SuspendedOn = MedChartData.ActiveTo = this.oOverViewData.ActiveTo = DateTime.ParseExact(<string>returnValue.GetProperty("MedChartEndDTTM"), "dd/MM/yyyy HH:mm:ss", CultureInfo.InvariantCulture);
                if (this.oOverViewData.ActiveTo.Date.Equals(DateTime.MinValue.Date) && this.oOverViewData.ActiveFrom.Date.NotEquals(DateTime.MinValue.Date)) {
                    MedChartData.ActiveTo = this.oOverViewData.ActiveTo = this.oOverViewData.ActiveFrom.AddDays(13);
                }
            }
            if (returnValue.GetProperty("MedChartStatus") != null && returnValue.GetProperty("MedChartStatus").ToString().Length > 0) {
                MedChartData.ChartStatus = this.oOverViewData.ChartStatus = returnValue.GetProperty("MedChartStatus").ToString();
            }
            if (returnValue.GetProperty("MedChartPatOID") != null && returnValue.GetProperty("MedChartPatOID").ToString().Length > 0) {
                this.oOverViewData.MedChartPatOID = Convert.ToInt64(returnValue.GetProperty("MedChartPatOID").ToString());
            }
            if (returnValue.GetProperty("MedChartServiceOID") != null && returnValue.GetProperty("MedChartServiceOID").ToString().Length > 0) {
                this.oOverViewData.MedChartServiceOID = Convert.ToInt64(returnValue.GetProperty("MedChartServiceOID").ToString());
            }
            if (returnValue.GetProperty("MedChartMergPatOID") != null && returnValue.GetProperty("MedChartMergPatOID").ToString().Length > 0) {
                let lnMedChartMergPatOID: number = Convert.ToInt64(returnValue.GetProperty("MedChartMergPatOID").ToString());
                if (lnMedChartMergPatOID > 0 && PatientContext.PatientOID > 0 && PatientContext.PatientOID != lnMedChartMergPatOID)
                    PatientContext.MergedPatientOID = lnMedChartMergPatOID;
            }
            let oCListItem: CListItem = null;
           // let oExistingItem = from oItem in this.oLstItemEnc
                //where.oItem.Value == this.oOverViewData.EncounterOID.ToString()
               // select oItem;
               let oExistingItem = this.oLstItemEnc.Where(oItem => oItem.Value == this.oOverViewData.EncounterOID.ToString()).Select(oItem => oItem);
            if (oExistingItem != null && oExistingItem.Count() > 0) {
                oCListItem = oExistingItem.First();
            }
            else {
                oCListItem = ObjectHelper.CreateObject(new CListItem(), { DisplayText: this.oOverViewData.EncType + " " + this.oOverViewData.EncMainID, Value: this.oOverViewData.EncounterOID.ToString() });
                this.oLstItemEnc.Add(oCListItem);
            }
            this.sfsEncounter.ItemsSource = this.oLstItemEnc;
            this.sfsEncounter.SelectedValue = oCListItem.Value;
            if (this.IsMedChartEncounterAssociated()) {
                try {
                    this.oOverViewData.SortRangeStartDate = DateTime.MinValue;
                    this.oOverViewData.SortRangeEndDate = new DateTime(2099, 12, 31, DateTimeKind.Local);
                    //this.oOverViewData.SortRangeEndDate = new DateTime(2099, 12, 31, 00, 00, 00, 000, DateTimeKind.Local);//to check
                }
                catch (err) {
                    this.isExceptionOccured = true;
                }

                this.SetValidDateTimeSelectionRange();
                this.SetDateTimePickerSelectedValue(this.oOverViewData.ActiveFrom);
            }
        }
    }
    dtpFromdate_OnDateValueChanged(sender: Object, e: DateChangedArgs): void {
        if (!this.IsPageLoad) {
            if (e.ModifiedDate.NotEquals(DateTime.MinValue)) {
                this.ValidateSelectedDate(e.ModifiedDate);
                this.IsFromDateChanged = true;
            }
        }
    }
    ValidateSelectedDate(dtSelectedDate: DateTime): void {
        if (dtSelectedDate >= this.oOverViewData.MinDateValue && dtSelectedDate <= this.oOverViewData.MaxDateValue) {
            this.SetDateTimePickerSelectedValue(dtSelectedDate);
        }
        else if (this.oOverViewData.ActiveFrom.NotEquals(DateTime.MinValue)) {
            this.SetDateTimePickerSelectedValue(this.oOverViewData.ActiveFrom);
        }
    }
    SetDateTimePickerSelectedValue(dtDateTimeToSelect: DateTime): void {
        this.oOverViewData.ValidateDate = dtDateTimeToSelect.Date;
        this.oOverViewData.ActiveFrom = dtDateTimeToSelect.Date;
    }
    SetValidDateTimeSelectionRange(): void {
        this.oOverViewData.MinDateValue = MedChartData.ActiveFrom;
        if (String.Compare(this.oOverViewData.ChartStatus, CConstants.sChartActiveStatusCode, StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(this.oOverViewData.ChartStatus, CConstants.sChartSuspendedStatusCode, StringComparison.CurrentCultureIgnoreCase) == 0) {
            this.oOverViewData.MaxDateValue = CommonBB.GetServerDateTime().DateTime.AddDays(CConstants.ChartNavigationLimitPeriod);
        }
        else {
            this.oOverViewData.MaxDateValue = MedChartData.ActiveTo;
        }
        try {
            this.oOverViewData.SortRangeStartDate = this.oOverViewData.MinDateValue.Date;
            this.oOverViewData.SortRangeEndDate = this.oOverViewData.MaxDateValue.DateTime.AddSeconds(86399);
            this.oOverViewData.ValidateDate = this.oOverViewData.ActiveFrom.Date;
        }
        catch (err) {
            this.isExceptionOccured = true;
        }

    }
    dtpFromdate_LostFocus(sender: Object, e: RoutedEventArgs): void {
        if (!this.IsPageLoad && !this.isCancelButtonClicked) {
            if (this.dtpFromdate.SelectedDateTime.NotEquals(DateTime.MinValue)) {
                this.ValidateSelectedDate(this.dtpFromdate.SelectedDateTime);
            }
            else if (this.oOverViewData.ActiveFrom.NotEquals(DateTime.MinValue)) {
                this.SetDateTimePickerSelectedValue(this.oOverViewData.ActiveFrom);
            }
            this.isCancelButtonClicked = false;
        }
        this.IsPageLoad = false;
    }
    sfsEncounter_GotFocus(sender: Object, e: RoutedEventArgs): void {
        try {
            if (this.isExceptionOccured && this.oOverViewData != null) {
                this.oOverViewData.SortRangeStartDate = this.oOverViewData.MinDateValue.Date;
                this.oOverViewData.SortRangeEndDate = this.oOverViewData.MaxDateValue.DateTime.AddSeconds(86399);
            }
            this.isExceptionOccured = false;
        }
        catch (err) {
            this.isExceptionOccured = false;
        }

    }
}