import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, ViewChild } from '@angular/core';
import { Convert } from 'epma-platform/services';
import { StringComparison, iAppDialogWindow, Visibility,  CListItem, ClerkFormViewDeftBehaviour, ObservableCollection } from 'epma-platform/models';
import { PatientContext }  from 'src/app/lorappcommonbb/utilities/globalvariable';
import { Binding, BindingMode, Border, DataTemplate, EventArgs, StackPanel, TextBlock, TextWrapping, iLabel, } from 'epma-platform/controls';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { ObjectHelper } from 'epma-platform/helper';
import { Grid, GridExtension, GridViewCellClickEventArgs, GridViewLength, GridViewLengthUnitType, iGridViewDataColumn } from 'src/app/shared/epma-platform/controls/epma-grid-helpers/grid-extension';
import { RoutedEventArgs } from 'src/app/shared/epma-platform/controls/Control';
import { CConstants, InfusionTypeCode, PrescriptionTypes, SVIconLaunchFrom } from '../utilities/constants';
import { ViewModelBase } from 'src/app/lorappcommonbb/viewmodelbase';
import { MedicationCommonProfileData } from '../utilities/profiledata';
import { ScheduleDetailsSteppedVM, ScheduleDetailsVM } from '../viewmodel/scheduledetailsvm';
import { Resource } from '../resource';
import { Busyindicator } from 'src/app/lorappcommonbb/busyindicator';
import { FullPrescriptionViewScheduling } from '../utilities/FullPrescriptionViewScheduling';
import { GridComponent, GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';
import * as Application from 'src/app/lorappcommonbb/amshelper';
import { MultipleDoseDetail, ScheduleDetailsCols } from '../viewmodel/prescriptionitemdetailsvm';
import { Orientation } from '../../shared/epma-platform/controls-model/Orientation';
import * as Deepclone from 'lodash';

@Component({
    selector: 'MedSteppedFullPrescriptionVW',
    templateUrl: './medSteppedFullPrescriptionVW.html',
    styleUrls: ['./medSteppedFullPrescriptionVW.css']
})


//LL1 
export class MedSteppedFullPrescriptionVW extends iAppDialogWindow implements AfterViewInit, OnInit {
    oSteppeddose: MultipleDoseDetail;
    oScheduleDetails: ScheduleDetailsVM;
    LastClickRowIndex: number = -1;
    bColRemoved: boolean = false;
    IsDST: boolean;
    IsAmbiguous: boolean;
    IsInvalid: boolean;
    Isboder2: boolean = false;
    public sInfusionType: string = String.Empty;
    @Input() sPrescriptionTypeCode: string = String.Empty;
    PresViewStartDate: DateTime;
    PresViewEndDate: DateTime;
    CurPageStartDate: DateTime;
    CurPageEndDate: DateTime;
    IsIntervalExistCnt: number = 0;
    chdGrdPageCnt: number = 0;
    PageNavText: string = String.Empty;
    CurrentPageIndex: number = 0;
    sPresFullViewTitle: string = String.Empty;
    PresFullViewWarningMessage: string = String.Empty;
    public sLaunchMenuCode: string = String.Empty;
    FVWarningMessage_1StepWO_Dur: string = String.Empty;
    @Input() oLaunchFrom: SVIconLaunchFrom;
    grdSchduleView: GridDataResult;

    public grdChangingDoseCss: string = "";
    public innerGrdChangingDoseCss: any = {};
    public bolFooterCss: number = -1;
    public bolFooterNoteCss: boolean = false;

    public getdata: EventEmitter<any> = new EventEmitter();
    public ScrollN: string = "";

    override _DataContext: MultipleDoseDetail;
    override get DataContext() {
        return this._DataContext;
    }

    public steppeddose1 = Resource.steppeddose;
    public ddkey = Resource.DrugDetails;

    elementStyles : { [key: string]: string } = {};

    @Input() override set DataContext(value: MultipleDoseDetail) {
        this._DataContext = value;
    }

    public Steppeddosedetails: Grid;
    @ViewChild("grdChangingDoseref", { read: Grid, static: false }) set _Steppeddosedetails(c: Grid) {
        if (c) { this.Steppeddosedetails = c; }
    };

    public lblTitleSteppedDose: iLabel;
    @ViewChild("lblTitleSteppedDoseTempRef", { read: iLabel, static: false }) set _lblTitleSteppedDose(c: iLabel) {
        if (c) { this.lblTitleSteppedDose = c; }
    };


    public grdStepped: GridExtension = new GridExtension();

    @ViewChild('grdSteppedref', { read: GridComponent, static: false })
    set _grdStepped(c: GridComponent) {
        if (c) {
            this.grdStepped.grid = c;
            this.grdStepped.columns = c.columns;
        }
    }

    public DChangingBorder: Border;
    @ViewChild("DChangingBorderTempRef", { read: Border, static: false }) set _DChangingBorder(c: Border) {
        if (c) { this.DChangingBorder = c; }
    };
    public BorderChangedose: Border;
    @ViewChild("BorderChangedoseTempRef", { read: Border, static: false }) set _BorderChangedose(c: Border) {
        if (c) { this.BorderChangedose = c; }
    };
    public lblChangingdose: iLabel;
    @ViewChild("lblChangingdoseTempRef", { read: iLabel, static: false }) set _lblChangingdose(c: iLabel) {
        if (c) { this.lblChangingdose = c; }
    };
    public lblScheduleNotExist: iLabel;
    @ViewChild("lblScheduleNotExistTempRef", { read: iLabel, static: false }) set _lblScheduleNotExist(c: iLabel) {
        if (c) { this.lblScheduleNotExist = c; }
    };

    public afterViewInitColumnLoaded = false;
    public grdChangingDose: GridExtension = new GridExtension();

    @ViewChild('grdChangingDoseref', { read: GridComponent, static: false })
    set _grdChangingDose(c: GridComponent) {
        if (c) {
            this.grdChangingDose.grid = c;
            this.grdChangingDose.columns = c.columns;
        }
    }

    public lblPresWarningMessage: iLabel;
    @ViewChild("lblPresWarningMessageTempRef", { read: iLabel, static: false }) set _lblPresWarningMessage(c: iLabel) {
        if (c) { this.lblPresWarningMessage = c; }
    };
    public lblDrugroundProfileWarningMessage: TextBlock;
    @ViewChild("lblDrugroundProfileWarningMessageTempRef", { read: TextBlock, static: false }) set _lblDrugroundProfileWarningMessage(c: TextBlock) {
        if (c) { this.lblDrugroundProfileWarningMessage = c; }
    };

    //LL2
    constructor(private cd?: ChangeDetectorRef) {
        super(); // Qradd
    }
    public windowresolution = (window.devicePixelRatio==1 && window.innerHeight > 1000) ? true : false; 
    maxLayoutHeight;
    eprview :boolean = false;
       ngAfterViewInit(): void {
        
        super.AfterViewInit();
        this.afterViewInitColumnLoaded = true;
        this.grdStepped.GenerateColumns();
        this.grdChangingDose.GenerateColumns();
        ////LL3
        this.MedSteppedDose_Loaded(null, null); 
        //New 
        if (typeof this.oSteppeddose.ScheduleGridTitile === 'undefined')
            this.oSteppeddose.ScheduleGridTitile = "";

           this.cd?.detectChanges();
           if (window.screen.height < 1000 && window.devicePixelRatio != 1.25) {
               if (window.innerHeight < 700) {
                this.eprview = true;
                   this.maxLayoutHeight = window.innerHeight - 84;
               }
               else {
                this.eprview = false;
                   this.maxLayoutHeight = window.innerHeight - 39;
               }
           }
          else if(window.screen.height < 1000 && window.devicePixelRatio === 1.25) {
            this.maxLayoutHeight = window.innerHeight - 87;
          }
          else if(window.screen.height >1000 && window.devicePixelRatio === 1){
            if(window.innerHeight < 700){
                this.maxLayoutHeight = 616;
                this.eprview = true;
            }
            else{
                this.maxLayoutHeight = 506;
                this.eprview = false;
            }
          }
          else{
            this.maxLayoutHeight = 440;
          }
    }


    ngOnInit(): void {
        this.grdStepped.onCellClick = (s, e) => { this.grdStepped_onCellClick(s, e) };
    }


    //LL4
    MedSteppedDose_Loaded(sender: Object, e: RoutedEventArgs): void {
        this.PageNavText = Resource.steppeddose.PageDisplayFormat;
        this.sPresFullViewTitle = Resource.steppeddose.PresFullViewTitle;
        this.PresFullViewWarningMessage = Resource.steppeddose.PresFullViewWarningMessage;
        this.FVWarningMessage_1StepWO_Dur = Resource.steppeddose.FVWarningMessage_1StepWO_Dur;
        if (this.DataContext != null) {
            //LL5
            this.oSteppeddose = ObjectHelper.CreateType<MultipleDoseDetail>(this.DataContext, MultipleDoseDetail);
            //New Assign DS
            if (this.oSteppeddose != null && this.oSteppeddose.StepDoseGridColms != null) //new
                this.grdStepped.SetBinding('data', this.oSteppeddose.StepDoseGridColms);

            this.DChangingBorder.Visibility = Visibility.Collapsed;
            this.grdChangingDose.Visibility = Visibility.Collapsed;

            if (PatientContext.PrescriptionType != PrescriptionTypes.ForAdministration && !this.bColRemoved)
                this.grdStepped.Columns["grdAdministrationtimes"].IsVisible = false;
            if (this.oSteppeddose.StepDoseGridColms != null && this.oSteppeddose.StepDoseGridColms.Count > 0) {
                if ((!String.IsNullOrEmpty(this.oSteppeddose.StepDoseGridColms[0].InfusionType) && String.Compare(this.oSteppeddose.StepDoseGridColms[0].InfusionType, InfusionTypeCode.INTERMITTENT, StringComparison.CurrentCultureIgnoreCase) == 0) || (!String.IsNullOrEmpty(this.sInfusionType) && String.Equals(this.sInfusionType, InfusionTypeCode.INTERMITTENT, StringComparison.InvariantCultureIgnoreCase))) {
                    this.grdStepped.Columns["grdDose"].IsVisible = true;
                    this.grdStepped.Columns["grdInfusion"].IsVisible = true;
                    this.grdStepped.Columns["grdFrequency"].IsVisible = true;
                    this.grdStepped.Columns["grdDuration"].IsVisible = true;
                    this.grdStepped.Columns["grdVariabledoseinstruction"].IsVisible = true;
                    this.grdStepped.Columns["grdVariabledoseinstruction"].Header = "Variable dose instructions";
                    if (!this.bColRemoved) {
                        this.grdStepped.Columns["grdAdministrationtimes"].IsVisible = true;
                    }
                }
                else if (String.IsNullOrEmpty(this.oSteppeddose.StepDoseGridColms[0].InfusionType)) {
                    this.grdStepped.Columns["grdInfusion"].IsVisible = false;
                    if (!this.bColRemoved) {
                        this.grdStepped.Columns["grdAdministrationtimes"].IsVisible = true;
                    }
                }
                if (MedicationCommonProfileData.PrescribeConfig != null && !String.IsNullOrEmpty(MedicationCommonProfileData.PrescribeConfig.ClerkFormViewDefautCode) && String.Equals(MedicationCommonProfileData.PrescribeConfig.ClerkFormViewDefautCode, "CC_FRMVWRMAND") && !String.IsNullOrEmpty(this.sPrescriptionTypeCode) && String.Equals(this.sPrescriptionTypeCode, PrescriptionTypes.Clerking) && !this.bColRemoved) {
                    this.grdStepped.Columns["grdAdministrationtimes"].IsVisible = true;
                }

                this.LoadPrescribedDoseDataGrid();
            }
            else {
                if (!String.IsNullOrEmpty(this.sInfusionType) && String.Compare(this.sInfusionType, InfusionTypeCode.INTERMITTENT, StringComparison.CurrentCultureIgnoreCase) == 0) {
                    this.grdStepped.Columns["grdDose"].IsVisible = true;
                    this.grdStepped.Columns["grdInfusion"].IsVisible = true;
                    this.grdStepped.Columns["grdFrequency"].IsVisible = true;
                    this.grdStepped.Columns["grdDuration"].IsVisible = true;
                    this.grdStepped.Columns["grdVariabledoseinstruction"].IsVisible = true;
                    this.grdStepped.Columns["grdVariabledoseinstruction"].Header = "Variable dose instructions";
                    if (!this.bColRemoved) {
                        this.grdStepped.Columns["grdAdministrationtimes"].IsVisible = true;
                    }
                }
                else if (String.IsNullOrEmpty(this.sInfusionType)) {
                    this.grdStepped.Columns["grdInfusion"].IsVisible = false;
                    if (!this.bColRemoved) {
                        this.grdStepped.Columns["grdAdministrationtimes"].IsVisible = true;
                    }
                }
                if (MedicationCommonProfileData.PrescribeConfig != null && !String.IsNullOrEmpty(MedicationCommonProfileData.PrescribeConfig.ClerkFormViewDefautCode) && String.Equals(MedicationCommonProfileData.PrescribeConfig.ClerkFormViewDefautCode, "CC_FRMVWRMAND") && !String.IsNullOrEmpty(this.sPrescriptionTypeCode) && String.Equals(this.sPrescriptionTypeCode, PrescriptionTypes.Clerking) && !this.bColRemoved) {
                    this.grdStepped.Columns["grdAdministrationtimes"].IsVisible = true;
                }
                this.oSteppeddose.ScheduleGridTitile = Resource.steppeddose.ChangingDoseTitle;
            }
            Busyindicator.SetStatusIdle("SteppenFullPrescription");
        }
    }

    getUpdatedValues(dataItem) {
        return {
            ...(dataItem.Duration, dataItem.DurationUOM, dataItem.ScheduleDetailsData, dataItem.LowerDose, dataItem.UpperDose, dataItem.DoseValueDisplay,
                dataItem.HyperlinkText, dataItem.InfusionRate, dataItem.InfusionUpperrate, dataItem.Infratenumeratoruom, dataItem.InfrateDenominatoruom, dataItem.Frequency,
                dataItem.DurationValueDisplay, dataItem.DoseInstructions, dataItem.AdministrationTimes, dataItem.OperationMode, dataItem.IsDaywiseView)
        };
    }
    /*
        //LL6
        public DisposeFormEvents(): void {
            // if (this.oSteppeddose != null)
            // this.oSteppeddose.oSteppedInfContCompleted -= this.oSteppeddose_oSteppedInfContCompleted;
        }
    
          //LL7
        MedSteppedDose_UnLoaded(sender: Object, e: RoutedEventArgs): void {
            this.DisposeFormEvents();
        }
    */

    //LL8
    oSteppeddose_oSteppedInfContCompleted(isInfContFlag: boolean, IsNonInfusion: boolean): void {
        if (isInfContFlag) {
            this.grdStepped.Columns["grdDose"].IsVisible = false;
            this.grdStepped.Columns["grdFrequency"].IsVisible = false;
            this.grdStepped.Columns["grdVariabledoseinstruction"].Header = "Instructions";
            this.grdStepped.Columns["grdAdministrationtimes"].IsVisible = false;
            this.BorderChangedose.Visibility = Visibility.Collapsed;
            this.lblChangingdose.Visibility = Visibility.Collapsed;
            this.grdChangingDose.Visibility = Visibility.Collapsed;
            this.DChangingBorder.Visibility = Visibility.Collapsed;
        }
        if (IsNonInfusion) {
            this.grdStepped.Columns["grdInfusion"].IsVisible = false;
        }
    }

    //LL9  
    public GenarateColumn(ScheduleDetails: ScheduleDetailsVM, FreqUOMCode: string): void {
        if (this.oSteppeddose == null && this.DataContext != null) {
            this.oSteppeddose = ObjectHelper.CreateType<MultipleDoseDetail>(this.DataContext, MultipleDoseDetail);
        }
        if (this.oSteppeddose instanceof MultipleDoseDetail) {
            let nCount: number = this.grdChangingDose.Columns.Count;
            for (let j: number = 2; j < nCount; j++) {
                this.grdChangingDose.Columns.RemoveAt(2);
            }
            let ChangedDoseScheduleDetails: ScheduleDetailsVM = ScheduleDetails;
            if (ChangedDoseScheduleDetails == null)
                return;

            // new 2
            this.grdSchduleView = { data: ChangedDoseScheduleDetails.GrdData.array, total: this.chdGrdPageCnt + 1 }
            this.grdChangingDose.dColumns.Clear();

            if (ChangedDoseScheduleDetails != null && ChangedDoseScheduleDetails.GrdData != null && ChangedDoseScheduleDetails.GrdData.Count > 0) {
                let sDoseUOM: string = String.Empty;
                let nSchStepCnt: number = ChangedDoseScheduleDetails.GrdData.Count;
                for (let icnt: number = 0; icnt < nSchStepCnt; icnt++) {
                    sDoseUOM = ChangedDoseScheduleDetails.GrdData[icnt].ScheduleDoseUOM;
                    if (ChangedDoseScheduleDetails.GrdData[icnt].ScheduleDoseValue != null && ChangedDoseScheduleDetails.GrdData[icnt].ScheduleDoseValue.Length > 0) {
                        let nSchDateCnt: number = ChangedDoseScheduleDetails.GrdData[icnt].ScheduleDoseValue.Length;
                        for (let jcnt: number = 0; jcnt < nSchDateCnt; jcnt++) {
                            if (!String.IsNullOrEmpty(ChangedDoseScheduleDetails.GrdData[icnt].ScheduleDoseValue[jcnt])) {
                                if (String.IsNullOrEmpty(ChangedDoseScheduleDetails.GrdData[icnt].ScheduleDoseUOMs[jcnt])) {
                                    ChangedDoseScheduleDetails.GrdData[icnt].ScheduleDoseUOMs[jcnt] = sDoseUOM;
                                }
                            }
                            else {
                                ChangedDoseScheduleDetails.GrdData[icnt].ScheduleDoseUOMs[jcnt] = String.Empty;
                            }
                        }
                    }
                }
            }

            ChangedDoseScheduleDetails.DaywiseVisibility = Visibility.Collapsed;                       
            ChangedDoseScheduleDetails.IsDaywiseView = FreqUOMCode != "CC_DOSES" ? true : false;
            
            if (!ChangedDoseScheduleDetails.IsSysDoseDetail) {
                let i: number = 0;
                if (this.grdChangingDose.Columns[1] != null) {
                    this.grdChangingDose.Columns[1].Header = ChangedDoseScheduleDetails.StartDate.ConvertToUser(_IsDST => { this.IsDST = _IsDST; }, (_IsAmbiguous) => { this.IsAmbiguous = _IsAmbiguous; }, (_IsInvalid) => { this.IsInvalid = _IsInvalid; }).ToDateTimeString(this.IsDST, this.IsAmbiguous, CConstants.ShortDateFormat);
                    this.grdChangingDose.Columns[1].IsVisible = true;
                    this.grdChangingDose.Columns[1].Width = new GridViewLength(1, GridViewLengthUnitType.Auto);
                }
                if (!this.IsDataExistsForGivenDate(ChangedDoseScheduleDetails.StartDate)) {
                    this.grdChangingDose.Columns[1].IsVisible = false;
                    let nElapsedDateExist: number = ChangedDoseScheduleDetails.GrdData[0].ScheduleDate.Where(p => p.Date == ChangedDoseScheduleDetails.StartDate.Date).Count();
                    if (nElapsedDateExist == 0)
                        i = 0;
                    else i = 1;
                }
                if (!String.IsNullOrEmpty(FreqUOMCode) && FreqUOMCode.Equals("CC_MEDDRSN2")) {
                    let nCnt: number = 1;
                    if (ChangedDoseScheduleDetails.GrdData != null && ChangedDoseScheduleDetails.GrdData[0] != null && ChangedDoseScheduleDetails.GrdData[0].ScheduleDoseUOMs != null && ChangedDoseScheduleDetails.GrdData[0].ScheduleDoseUOMs.Count() > 0)
                        ChangedDoseScheduleDetails.StartDate = ChangedDoseScheduleDetails.StartDate.AddDays(1);
                    while (DateTime.LessThanOrEqualTo(ChangedDoseScheduleDetails.StartDate.Date, ChangedDoseScheduleDetails.EndDate.Date)) {

                        if (this.IsDataExistsForGivenDate(ChangedDoseScheduleDetails.StartDate)) {
                            //LL11 // new
    
                            let celltemplate: string = String.Empty;
                            let ct = new DataTemplate();
                            let sp = new StackPanel();
                            let lbl = new iLabel();
                            lbl.Name = "lblDoseValue";
                            lbl.VerticalAlignment = "Center";
                            lbl.Width = "auto";
                            let bindLbl = new Binding();
                            bindLbl.Mode = BindingMode.TwoWay;
                            bindLbl.Path = `ScheduleDoseValue[${i}]`;
                            bindLbl.PathObject = undefined;
                            lbl.SetBinding(iLabel.TextProperty, bindLbl);
                            lbl.Text = ChangedDoseScheduleDetails.GrdData[0].ScheduleDoseValue[i];
                            sp.Children.Add(lbl);


                            let lbl2 = new iLabel();
                            lbl2.Name = "lblDoseUOM";
                            lbl2.VerticalAlignment = "Center";
                            lbl2.Width = "auto";
                            let bindLbl2 = new Binding();
                            bindLbl2.Mode = BindingMode.TwoWay;
                            bindLbl2.Path = `ScheduleDoseUOMs[${i}]`;
                            bindLbl2.PathObject = undefined;
                            lbl2.SetBinding(iLabel.TextProperty, bindLbl2);
                            lbl2.Text = ChangedDoseScheduleDetails.GrdData[0].ScheduleDoseUOMs[i];
                            sp.Children.Add(lbl2);
                            sp.Orientation = Orientation.Horizontal;
                            ct.Content = sp;







                            let icolumn: iGridViewDataColumn = new iGridViewDataColumn();
                            icolumn.IsReadOnly = ChangedDoseScheduleDetails.IsReadOnly;
                            icolumn.Header = ChangedDoseScheduleDetails.StartDate.ConvertToUser(_IsDST => { this.IsDST = _IsDST; }, (_IsAmbiguous) => { this.IsAmbiguous = _IsAmbiguous; }, (_IsInvalid) => { this.IsInvalid = _IsInvalid; }).ToDateTimeString(this.IsDST, this.IsAmbiguous, CConstants.ShortDateFormat);

                            icolumn.IsVisible = true;
                            icolumn.IsFilterable = false;
                            icolumn.IsReadOnly = true;
                            icolumn.CellTemplate = ct.Content;
                            this.grdChangingDose.dColumns.Add(icolumn);
                        }
                        nCnt++;
                        ChangedDoseScheduleDetails.StartDate = ChangedDoseScheduleDetails.StartDate.AddDays(1); 
                    }

                }


                else { 
                    ChangedDoseScheduleDetails.StartDate = ChangedDoseScheduleDetails.StartDate.AddDays(1);
                    while (DateTime.LessThanOrEqualTo(ChangedDoseScheduleDetails.StartDate.Date, ChangedDoseScheduleDetails.EndDate.Date)) {

                        let celltemplate: string = String.Empty;
                        let ct = new DataTemplate();
                        if (this.IsDataExistsForGivenDate(ChangedDoseScheduleDetails.StartDate)) {

                            let celltemplate: string = String.Empty;
                            let ct = new DataTemplate();
                            let sp = new StackPanel();
                            let lbl = new iLabel();
                            lbl.Name = "lblDoseValue";
                            lbl.VerticalAlignment = "Center"; 
                            lbl.Width = "auto";
                            let bindLbl = new Binding();
                            bindLbl.Mode = BindingMode.TwoWay;
                            bindLbl.Path = `ScheduleDoseValue[${i}]`;
                            bindLbl.PathObject = undefined;
                            lbl.SetBinding(iLabel.TextProperty, bindLbl);
                            lbl.Text = ChangedDoseScheduleDetails.GrdData[0].ScheduleDoseValue[i];
                            sp.Children.Add(lbl);





                            let lbl2 = new iLabel();
                            lbl2.Name = "lblDoseUOM";
                            lbl2.VerticalAlignment = "Center";
                            lbl2.Width = "auto";
                            let bindLbl2 = new Binding();
                            bindLbl2.Mode = BindingMode.TwoWay;
                            bindLbl2.Path = `ScheduleDoseUOMs[${i}]`;
                            bindLbl2.PathObject = undefined;
                            lbl2.SetBinding(iLabel.TextProperty, bindLbl2);
                            lbl2.Text = ChangedDoseScheduleDetails.GrdData[0].ScheduleDoseUOMs[i];
                            sp.Children.Add(lbl2);
                            sp.Orientation = Orientation.Horizontal;
                            ct.Content = sp;

                            let dtCellTemplate: DataTemplate;
                            let icolumn: iGridViewDataColumn = new iGridViewDataColumn();
                            icolumn.IsReadOnly = ChangedDoseScheduleDetails.IsReadOnly;
                            icolumn.Header = ChangedDoseScheduleDetails.StartDate.ConvertToUser(_IsDST => { this.IsDST = _IsDST; }, (_IsAmbiguous) => { this.IsAmbiguous = _IsAmbiguous; }, (_IsInvalid) => { this.IsInvalid = _IsInvalid; }).ToDateTimeString(this.IsDST, this.IsAmbiguous, CConstants.ShortDateFormat);

                            icolumn.IsVisible = true;
                            icolumn.IsFilterable = false;
                            icolumn.IsReadOnly = true;
                            icolumn.CellTemplate = ct.Content;
                            i++;
                            this.grdChangingDose.dColumns.Add(icolumn);
                        }
                        ChangedDoseScheduleDetails.StartDate = ChangedDoseScheduleDetails.StartDate.AddDays(1);
                    }
                }
            }
            else {
                let i: number = 0;
                if (this.grdChangingDose.Columns[0] != null)
                    this.grdChangingDose.Columns[0].Header = "Events";
                if (this.grdChangingDose.Columns[1] != null)
                    this.grdChangingDose.Columns[1].Header = "Day " + i;

                if (!String.IsNullOrEmpty(ChangedDoseScheduleDetails.DurationUOM) && String.Equals(ChangedDoseScheduleDetails.DurationUOM, "CC_DOSES")) {
                    let nDays: number = 0;
                    if (ChangedDoseScheduleDetails.GrdData != null && ChangedDoseScheduleDetails.GrdData.Count > 0 && ChangedDoseScheduleDetails.DurationValue > 0)
                        nDays = Math.ceil(ChangedDoseScheduleDetails.DurationValue / ChangedDoseScheduleDetails.GrdData.Count);
                     
                        while ( i < nDays &&  (typeof ChangedDoseScheduleDetails.GrdData[0].ScheduleDoseValue[i] !== 'undefined' )) {
                        
                        let celltemplate: string = String.Empty;
                        let ct = new DataTemplate();
                        let sp = new StackPanel();
                        let lbl = new iLabel();
                        lbl.Name = "lblDoseValue";
                        lbl.VerticalAlignment = "Center"; 
                        lbl.Width = "auto";
                        let bindLbl = new Binding();
                        bindLbl.Mode = BindingMode.TwoWay;
                        bindLbl.Path = `ScheduleDoseValue[${i}]`;
                        bindLbl.PathObject = undefined;
                        lbl.SetBinding(iLabel.TextProperty, bindLbl);
                        lbl.Text = ChangedDoseScheduleDetails.GrdData[0].ScheduleDoseValue[i];
                        sp.Children.Add(lbl);





                        let lbl2 = new iLabel();
                        lbl2.Name = "lblDoseUOM";
                        lbl2.VerticalAlignment = "Center"; 
                        lbl2.Width = "auto";
                        let bindLbl2 = new Binding();
                        bindLbl2.Mode = BindingMode.TwoWay;
                        bindLbl2.Path = `ScheduleDoseUOMs[${i}]`;
                        bindLbl2.PathObject = undefined;
                        lbl2.SetBinding(iLabel.TextProperty, bindLbl2);
                        lbl2.Text = ChangedDoseScheduleDetails.GrdData[0].ScheduleDoseUOMs[i];
                        sp.Children.Add(lbl2);
                        sp.Orientation = Orientation.Horizontal;
                        ct.Content = sp;

                        let dtCellTemplate: DataTemplate;
                        let icolumn: iGridViewDataColumn = new iGridViewDataColumn();

                        icolumn.IsReadOnly = ChangedDoseScheduleDetails.IsReadOnly;
                        icolumn.Header = "Day " + (i+1);
                        icolumn.IsVisible = true;
                        icolumn.IsFilterable = false;
                        icolumn.IsReadOnly = true;
                        icolumn.CellTemplate = ct.Content;
                        i++;
                        this.grdChangingDose.dColumns.Add(icolumn);
                    }
                }
                else {
                    if (ChangedDoseScheduleDetails.IsDaywiseView) {
                        let NoOfDays: number = 1;
                        switch (ChangedDoseScheduleDetails.DurationUOM) {
                            case "CC_MEDDRSN1":
                                NoOfDays = Convert.ToInt32(ChangedDoseScheduleDetails.DurationValue);
                                break;
                            case "CC_MEDDRSN2":
                                NoOfDays = Convert.ToInt32(ChangedDoseScheduleDetails.DurationValue) * 7;
                                break;
                            case "CC_MEDRSN3":
                                NoOfDays = Convert.ToInt32(ChangedDoseScheduleDetails.DurationValue) * 28;
                                break;
                            case "CC_MEDRSN4":
                                NoOfDays = Convert.ToInt32(ChangedDoseScheduleDetails.DurationValue) * 365;
                                break;
                        }

                  
                        while (i < NoOfDays &&  (typeof ChangedDoseScheduleDetails.GrdData[0].ScheduleDoseValue[i] !== 'undefined' )) {
                            

                            let celltemplate: string = String.Empty;
                            let ct = new DataTemplate();
                            let sp = new StackPanel();
                            let lbl = new iLabel();
                            lbl.Name = "lblDoseValue";
                            lbl.VerticalAlignment = "Center"; 
                            lbl.Width = "auto";
                            let bindLbl = new Binding();
                            bindLbl.Mode = BindingMode.TwoWay;
                            bindLbl.Path = `ScheduleDoseValue[${i}]`;
                            bindLbl.PathObject = undefined;
                            lbl.SetBinding(iLabel.TextProperty, bindLbl);
                            lbl.Text = ChangedDoseScheduleDetails.GrdData[0].ScheduleDoseValue[i];
                            sp.Children.Add(lbl);





                            let lbl2 = new iLabel();
                            lbl2.Name = "lblDoseUOM";
                            lbl2.VerticalAlignment = "Center"; 
                            lbl2.Width = "auto";
                            let bindLbl2 = new Binding();
                            bindLbl2.Mode = BindingMode.TwoWay;
                            bindLbl2.Path = `ScheduleDoseUOMs[${i}]`;
                            bindLbl2.PathObject = undefined;
                            lbl2.SetBinding(iLabel.TextProperty, bindLbl2);
                            lbl2.Text = ChangedDoseScheduleDetails.GrdData[0].ScheduleDoseUOMs[i];
                            sp.Children.Add(lbl2);
                            sp.Orientation = Orientation.Horizontal;
                            ct.Content = sp;

                            let icolumn: iGridViewDataColumn = new iGridViewDataColumn();

                            icolumn.IsReadOnly = ChangedDoseScheduleDetails.IsReadOnly;
                            icolumn.Header = "Day " + (i+1);
                            icolumn.IsVisible = true;
                            icolumn.IsFilterable = false;
                            icolumn.IsReadOnly = true;
                            icolumn.CellTemplate = ct.Content;
                            i++;
                            this.grdChangingDose.dColumns.Add(icolumn);
                        }
                    }
                }
            }
        }
     }


    //LL12
    public grdStepped_onCellClick(sender: any, args: GridViewCellClickEventArgs): void {
        if (this.IsIntervalExistCnt > 0) {
            if (this.grdStepped.GetColumnIndexByName("SelectColumn") == args.ColumnIndex && this.LastClickRowIndex != args.RowIndex) {
                this.grdSteppedPopulation(args.RowIndex);
            }
        }
    }

    public grdStepped_DataLoaded(sender: Object, e: EventArgs): void {
        if (this.grdStepped.GetRowCount() > 0) {
            if (this.grdStepped.Columns["grdAdministrationtimes"] != null) {
                this.grdStepped.Columns["grdAdministrationtimes"].IsVisible = true;
            }
            if (MedicationCommonProfileData.PrescribeConfig != null && !String.IsNullOrEmpty(MedicationCommonProfileData.PrescribeConfig.ClerkFormViewDefautCode) && String.Equals(MedicationCommonProfileData.PrescribeConfig.ClerkFormViewDefautCode, "CC_FRMVWRMAND") && !String.IsNullOrEmpty(this.sPrescriptionTypeCode) && String.Equals(this.sPrescriptionTypeCode, PrescriptionTypes.Clerking, StringComparison.CurrentCultureIgnoreCase) && !this.bColRemoved) {
                this.grdStepped.Columns["grdAdministrationtimes"].IsVisible = true;
            }
            this.LoadPrescribedDoseDataGrid();
        }
    }

    public grdSteppedPopulation(index: number): void {

        let objMultipleDoseDetail: MultipleDoseDetail = ObjectHelper.CreateType<MultipleDoseDetail>(this.grdStepped.GetRowData(index), MultipleDoseDetail);
        if (objMultipleDoseDetail != null && !String.IsNullOrEmpty(objMultipleDoseDetail.HyperlinkText) && String.Compare(objMultipleDoseDetail.HyperlinkText, "Changing dose", StringComparison.CurrentCultureIgnoreCase) == 0) {
            this.BorderChangedose.Visibility = Visibility.Visible;
            this.lblChangingdose.Visibility = Visibility.Visible;
            this.grdChangingDose.Visibility = Visibility.Visible;
            this.DChangingBorder.Visibility = Visibility.Visible;               
            this.elementStyles = { display: 'block' };    
        }
        else {
            this.BorderChangedose.Visibility = Visibility.Collapsed;
            this.lblChangingdose.Visibility = Visibility.Collapsed;
            this.grdChangingDose.Visibility = Visibility.Collapsed;
            this.DChangingBorder.Visibility = Visibility.Collapsed;            
            this.elementStyles = { display: 'none' }; 
        }
        if (objMultipleDoseDetail != null && objMultipleDoseDetail.DoseValueDisplay == "0" && objMultipleDoseDetail.ScheduleDetailsData != null && objMultipleDoseDetail.ScheduleDetailsData.Count > 0) {
            this.grdChangingDose.IsEnabled = true;
            this.lblChangingdose.IsEnabled = true;
            this.grdChangingDose.RecordsPerPage = 100;
            this.grdChangingDose.PageCount = 1;
            let durationUOM: string = String.Empty;
            if (objMultipleDoseDetail.DurationUOM != null) {
                switch (objMultipleDoseDetail.DurationUOM.DisplayText) {
                    case "Day(s)":
                        objMultipleDoseDetail.DurationUOM = ObjectHelper.CreateObject(new CListItem(), { DisplayText: "Day(s)", Value: "CC_MEDDRSN1" });
                        break;
                    case "Week(s)":
                        objMultipleDoseDetail.DurationUOM = ObjectHelper.CreateObject(new CListItem(), { DisplayText: "Week(s)", Value: "CC_MEDDRSN2" });
                        break;
                    case "Month(s)":
                        objMultipleDoseDetail.DurationUOM = ObjectHelper.CreateObject(new CListItem(), { DisplayText: "Month(s)", Value: "CC_MEDRSN3" });
                        break;
                    case "Year(s)":
                        objMultipleDoseDetail.DurationUOM = ObjectHelper.CreateObject(new CListItem(), { DisplayText: "Year(s)", Value: "CC_MEDRSN4" });
                        break;
                    case "Hour(s)":
                        objMultipleDoseDetail.DurationUOM = ObjectHelper.CreateObject(new CListItem(), { DisplayText: "Hour(s)", Value: "CC_HOURS" });
                        break;
                    case "Minute(s)":
                        objMultipleDoseDetail.DurationUOM = ObjectHelper.CreateObject(new CListItem(), { DisplayText: "Minute(s)", Value: "CC_MINUTES" });
                        break;
                    case "Dose(s)":
                        objMultipleDoseDetail.DurationUOM = ObjectHelper.CreateObject(new CListItem(), { DisplayText: "Dose(s)", Value: "CC_DOSES" });
                        break;
                }
                durationUOM = objMultipleDoseDetail.DurationUOM.Value;
            }

            this.oScheduleDetails = ObjectHelper.CreateObject(new ScheduleDetailsVM(), {
                GrdData: objMultipleDoseDetail.ScheduleDetailsData,
                DurationValue: objMultipleDoseDetail.Duration,
                DurationUOM: durationUOM,
                StartDate: objMultipleDoseDetail.StartDTTM,
                EndDate: objMultipleDoseDetail.EndDTTM,
                IsDaywiseView: objMultipleDoseDetail.IsDaywiseView,
                IsSysDoseDetail: objMultipleDoseDetail.SysDoseDetail,
                IsReadOnly: true
            });

            try {
                this.grdChangingDose.Columns[1].IsReadOnly = objMultipleDoseDetail.SysDoseDetail;
            }
            catch (e) {
            }

            this.bolFooterCss = 0;
            this.grdChangingDose.DataContext = this.oScheduleDetails;
            //this.grdChangingDose.ItemsSource = this.oScheduleDetails.GrdData;
            let grdAdministrationtimes: boolean = true;
            if (MedicationCommonProfileData.PrescribeConfig != null && !String.IsNullOrEmpty(MedicationCommonProfileData.PrescribeConfig.ClerkFormViewDefautCode) && String.Equals(MedicationCommonProfileData.PrescribeConfig.ClerkFormViewDefautCode, "CC_FRMVWRMAND") && !String.IsNullOrEmpty(this.sPrescriptionTypeCode) && String.Equals(this.sPrescriptionTypeCode, PrescriptionTypes.Clerking)) {
                grdAdministrationtimes = false;
            }
            if (!String.IsNullOrEmpty(objMultipleDoseDetail.PresType) && !this.bColRemoved && grdAdministrationtimes && !String.Equals(objMultipleDoseDetail.PresType, PrescriptionTypes.ForAdministration) && !String.Equals(objMultipleDoseDetail.PresType, PrescriptionTypes.Clerking)) {
                if (this.grdStepped.Columns["grdAdministrationtimes"] != null)
                    this.grdStepped.Columns.RemoveAt(this.grdStepped.GetColumnIndexByName("grdAdministrationtimes"));
                this.bColRemoved = true;
            }
            let sFreqTag: string = String.Empty;
            sFreqTag = objMultipleDoseDetail.DurationUOM.Value;
            
            let objTempSchDetVM: ScheduleDetailsVM = ObjectHelper.CreateType<ScheduleDetailsVM>(this.oScheduleDetails, ScheduleDetailsVM);
            if (objTempSchDetVM != null && ( String.Equals(durationUOM, "CC_DOSES", StringComparison.CurrentCultureIgnoreCase) || objTempSchDetVM.CheckDuration() > 1 || (objTempSchDetVM.CheckDuration() >= 1 && !String.IsNullOrEmpty(objMultipleDoseDetail.PresType)) && String.Equals(objMultipleDoseDetail.PresType, PrescriptionTypes.ForAdministration, StringComparison.InvariantCultureIgnoreCase) || (objTempSchDetVM.StartDate != DateTime.MinValue && objTempSchDetVM.EndDate != DateTime.MinValue && objTempSchDetVM.StartDate.Date != objTempSchDetVM.EndDate.Date) || (objMultipleDoseDetail.ScheduleDetailsData != null && objMultipleDoseDetail.ScheduleDetailsData.Count > 0)  ) && (objMultipleDoseDetail.IsDaywiseView || objMultipleDoseDetail.SysDoseDetail)) {
                this.GenarateColumn(objTempSchDetVM, sFreqTag);
            }
            else {
                let nCount: number = this.grdChangingDose.Columns.Count;
                for (let j: number = 2; j < nCount; j++) {
                    this.grdChangingDose.Columns.RemoveAt(2);
                }
                if (this.grdChangingDose.Columns[1] != null) {
                    this.grdChangingDose.Columns[1].Header = Resource.steppeddose.Dose_Header;
                    this.grdChangingDose.Columns[1].IsVisible = true;
                }
            }
            this.LastClickRowIndex = index;
        }
        else {
            let nCount: number = this.grdChangingDose.Columns.Count;
            for (let j: number = 2; j < nCount; j++) {
                this.grdChangingDose.Columns.RemoveAt(2);
            }
            this.grdChangingDose.DataContext = null;
            if (this.grdChangingDose.Columns[1] != null)
                this.grdChangingDose.Columns[1].Header = Resource.steppeddose.Dose_Header;
            this.lblChangingdose.IsEnabled = false;
            this.grdChangingDose.IsEnabled = false;
            this.LastClickRowIndex = index;
        } 
    }

    //LL13
    public IsDataExistsForGivenDate(_datetime: DateTime): boolean {
        let IsExist: boolean = false;
        try {
            if (this.oScheduleDetails != null) {
                let _RowCount: number = (ObjectHelper.CreateType<ScheduleDetailsVM>(this.oScheduleDetails, ScheduleDetailsVM)).GrdData.Count;
                let _ColCount: number;
                for (let i: number = 0; i < _RowCount; i++) {
                    _ColCount = (ObjectHelper.CreateType<ScheduleDetailsVM>(this.oScheduleDetails, ScheduleDetailsVM)).GrdData[i].ScheduleDoseValue.Count();
                    for (let j: number = 0; j < _ColCount; j++) {
                        if (_datetime.Date == (ObjectHelper.CreateType<ScheduleDetailsVM>(this.oScheduleDetails, ScheduleDetailsVM)).GrdData[i].ScheduleDate[j].Date && !String.IsNullOrEmpty((ObjectHelper.CreateType<ScheduleDetailsVM>(this.oScheduleDetails, ScheduleDetailsVM)).GrdData[i].ScheduleDoseValue[j])) {
                            IsExist = true;
                            break;
                        }
                    }
                    if (IsExist)
                        break;
                }
            }
        }
        catch (ex: any) {
            IsExist = true;
            let lnReturn: number = Application.AMSHelper.PublicExceptionDetails(3500001, "IPPMA,LorAppMedicationCommonBB.dll,IsDataExistsForGivenDate()", ex);
        }

        return IsExist;
    }

    //LL14
    // New Page
    public totalCount: number = 0;
    public pageSize = 5;
    public skip: number = 0;
    public gridView: GridDataResult;
    public buttonCount = 2;
    public sizes = [10, 20, 50];
    public isRowselectFlag: boolean = false;

    pageChange({ skip, take }: PageChangeEvent) {
        this.CurrentPageIndex = skip / take + 1;
        this.pageSize = this.chdGrdPageCnt / take;
        this.CurPageStartDate = this.PresViewStartDate.DateTime.AddDays(skip);
        this.CurPageEndDate = this.CurPageStartDate.DateTime.AddDays(CConstants.NO_OF_DAYS_INCREASED) > this.PresViewEndDate ? this.PresViewEndDate : this.CurPageStartDate.DateTime.AddDays(CConstants.NO_OF_DAYS_INCREASED);
        this.GetPrescribedDoseData();
        this.grdChangingDose.NavigatorText = String.Format(this.PageNavText, this.CurrentPageIndex, this.grdChangingDose.PageCount);
        this.skip = skip;
    }

    //LL15
    public GeneratePresDateColumn(): void {

        let objScheduleDetailsSteppedVM = this.oScheduleDetails;
        let dProcessStDate: DateTime = this.CurPageStartDate;
        let dProcessEndDate: DateTime = this.CurPageEndDate;
        let i: number = 0;
        let nCount: number = this.grdChangingDose.dColumns.Count;
        this.grdChangingDose.dColumns.Clear();
        while (DateTime.LessThanOrEqualTo(dProcessStDate, dProcessEndDate)) {
            //New
            let ct = new DataTemplate();
            let sp = new StackPanel();
            let lbl = new iLabel();
            lbl.Name = "lblDoseValue";
            lbl.VerticalAlignment = "Center";
            lbl.Width = "auto";
            let bindLbl = new Binding();
            bindLbl.Mode = BindingMode.TwoWay;
            bindLbl.Path = `ScheduleDoseValue[${i}]`;
            bindLbl.PathObject = undefined;
            lbl.SetBinding(iLabel.TextProperty, bindLbl);
            lbl.Text = objScheduleDetailsSteppedVM.GrdData[0].ScheduleDoseValue[i];
            sp.Children.Add(lbl);

            let lbl2 = new iLabel();
            lbl2.Name = "lblDoseUOM";
            lbl2.VerticalAlignment = "Center";
            lbl2.Width = "auto";
            let bindLbl2 = new Binding();
            bindLbl2.Mode = BindingMode.TwoWay;
            bindLbl2.Path = `ScheduleDoseUOMs[${i}]`;
            bindLbl2.PathObject = undefined;
            lbl2.SetBinding(iLabel.TextProperty, bindLbl2);
            lbl2.Text = objScheduleDetailsSteppedVM.GrdData[0].ScheduleDoseUOMs[i];
            sp.Children.Add(lbl2);

            sp.Orientation = Orientation.Horizontal;
            ct.Content = sp;

            let dtCellTemplate: DataTemplate;
            let icolumn: iGridViewDataColumn = new iGridViewDataColumn();
            icolumn.Header = dProcessStDate.ConvertToUser(_IsDST => { this.IsDST = _IsDST; }, (_IsAmbiguous) => { this.IsAmbiguous = _IsAmbiguous; }, (_IsInvalid) => { this.IsInvalid = _IsInvalid; }).ToDateTimeString(this.IsDST, this.IsAmbiguous, CConstants.ShortDateFormat);

            icolumn.IsVisible = true;
            icolumn.IsFilterable = false;
            icolumn.IsReadOnly = true;
            icolumn.CellTemplate = ct.Content;
            i++;
            this.grdChangingDose.dColumns.Add(icolumn);
            dProcessStDate = dProcessStDate.DateTime.AddDays(1);
        }
    }

    public LoadPrescribedDoseDataGrid(): void {
        if (this.oSteppeddose != null) {
            let bHasValidSchedule: boolean;
            this.oSteppeddose.ScheduleGridTitile = Resource.steppeddose.FVScheduleTitle;
            bHasValidSchedule = true;
            if (this.oSteppeddose.StepDoseGridColms != null && this.oSteppeddose.StepDoseGridColms.Count > 0) {
                let dtEnddatetime: DateTime;
                let dtPrevPresEnddatetime: DateTime = DateTime.MinValue;
                let dtlastwithDurStartdate: DateTime = DateTime.MinValue;
                let ShowWarningwithoutAfter: boolean = false;
                this.oSteppeddose.IsSchduleNotExist = Visibility.Collapsed;
                this.oSteppeddose.ScheduleNotExistMessage = String.Empty;
                this.IsIntervalExistCnt = (this.oSteppeddose.StepDoseGridColms.Where(x => x.FullPrescriptionLaunchMode != null && x.FullPrescriptionLaunchMode.Equals("OLD")).Count());
                if (this.IsIntervalExistCnt == 0) {
                    if (!this.ValidateSteppedDoseForBlankAdminTimes(this.oSteppeddose.StepDoseGridColms)) {
                        this.oSteppeddose.ScheduleNotExistMessage = Resource.steppeddose.FVClerkingSchNotValidMessage;
                        bHasValidSchedule = false;
                        this.oSteppeddose.IsSchduleNotExist = Visibility.Visible;
                    }
                }
                if (DateTime.NotEquals(this.oSteppeddose.StepDoseGridColms[this.oSteppeddose.StepDoseGridColms.Count - 1].EndDTTM , DateTime.MinValue)) {
                    dtEnddatetime = this.oSteppeddose.StepDoseGridColms[this.oSteppeddose.StepDoseGridColms.Count - 1].EndDTTM;
                }
                else {
                    dtlastwithDurStartdate = this.oSteppeddose.StepDoseGridColms[this.oSteppeddose.StepDoseGridColms.Count - 1].StartDTTM;
                    if (this.oSteppeddose.StepDoseGridColms.Count > 1) {
                        dtPrevPresEnddatetime = this.oSteppeddose.StepDoseGridColms[this.oSteppeddose.StepDoseGridColms.Count - 2].EndDTTM;
                        if (dtPrevPresEnddatetime.Date == dtlastwithDurStartdate.Date) {
                            dtEnddatetime = this.oSteppeddose.StepDoseGridColms[this.oSteppeddose.StepDoseGridColms.Count - 1].StartDTTM.DateTime.AddDays(3);
                        }
                        else dtEnddatetime = this.oSteppeddose.StepDoseGridColms[this.oSteppeddose.StepDoseGridColms.Count - 1].StartDTTM.DateTime.AddDays(2);
                    }
                    else {
                        dtPrevPresEnddatetime = this.oSteppeddose.StepDoseGridColms[0].StartDTTM;
                        dtEnddatetime = this.oSteppeddose.StepDoseGridColms[this.oSteppeddose.StepDoseGridColms.Count - 1].StartDTTM.DateTime.AddDays(2);
                        ShowWarningwithoutAfter = true;
                    }
                    this.oSteppeddose.ShowPrescribedWarningMessage = true;
                }
                if (this.IsIntervalExistCnt == 0) {
                    if (this.oSteppeddose.ShowPrescribedWarningMessage) {
                        this.oSteppeddose.PrescribedDoseTitle = String.Format(this.sPresFullViewTitle,
                            this.oSteppeddose.StepDoseGridColms[0].StartDTTM.ConvertToUser(_IsDST => { this.IsDST = _IsDST; }, (_IsAmbiguous) => { this.IsAmbiguous = _IsAmbiguous; }, (_IsInvalid) => { this.IsInvalid = _IsInvalid; }).ToDateTimeString(this.IsDST, this.IsAmbiguous, CConstants.LongDateWithoutSecs), String.Empty);


                        if (bHasValidSchedule) {
                            if (!ShowWarningwithoutAfter)
                                this.oSteppeddose.PrescribedWarningMessage = String.Format(this.PresFullViewWarningMessage,
                                    dtPrevPresEnddatetime.ConvertToUser(_IsDST => { this.IsDST = _IsDST; }, (_IsAmbiguous) => { this.IsAmbiguous = _IsAmbiguous; }, (_IsInvalid) => { this.IsInvalid = _IsInvalid; }).ToDateTimeString(this.IsDST, this.IsAmbiguous, CConstants.ShortDateFormat))
                            else {
                                this.oSteppeddose.PrescribedWarningMessage = this.FVWarningMessage_1StepWO_Dur;
                            }
                        }
                    }
                    else this.oSteppeddose.PrescribedDoseTitle =
                        String.Format(this.sPresFullViewTitle,
                            this.oSteppeddose.StepDoseGridColms[0].StartDTTM.ConvertToUser(_IsDST => { this.IsDST = _IsDST; }, (_IsAmbiguous) => { this.IsAmbiguous = _IsAmbiguous; }, (_IsInvalid) => { this.IsInvalid = _IsInvalid; }).ToDateTimeString(this.IsDST, this.IsAmbiguous, CConstants.LongDateWithoutSecs),
                            dtEnddatetime.ConvertToUser(_IsDST => { this.IsDST = _IsDST; }, (_IsAmbiguous) => { this.IsAmbiguous = _IsAmbiguous; }, (_IsInvalid) => { this.IsInvalid = _IsInvalid; }).ToDateTimeString(this.IsDST, this.IsAmbiguous, CConstants.LongDateWithoutSecs));
                }
                this.oSteppeddose.PrescribedViewStartDate = this.oSteppeddose.StepDoseGridColms[0].StartDTTM;
                this.oSteppeddose.PrescribedViewEndDate = dtEnddatetime;
                if ((this.oSteppeddose.sPresType == PrescriptionTypes.ForAdministration || (!String.IsNullOrEmpty(this.sPrescriptionTypeCode) && this.sPrescriptionTypeCode == PrescriptionTypes.ForAdministration)) && PatientContext.ClerkFormViewDefaultBehavior != ClerkFormViewDeftBehaviour.LaunchFormMandatory && this.oSteppeddose.StepDoseGridColms.Where(s => s.SlotTimeMode.Equals('D')).Count() > 0) {
                    this.oSteppeddose.IsSVHavingDrugRoundTimes = true;
                }
            }
            if (this.oSteppeddose.ShowPrescribedWarningMessage)
                this.lblPresWarningMessage.Visibility = Visibility.Visible;
            else this.lblPresWarningMessage.Visibility = Visibility.Collapsed;
            this.PresViewStartDate = this.oSteppeddose.PrescribedViewStartDate;
            this.PresViewEndDate = this.oSteppeddose.PrescribedViewEndDate;
            this.DChangingBorder.Visibility = Visibility.Visible;
            if (this.IsIntervalExistCnt == 0 && bHasValidSchedule) {
                this.grdChangingDose.Visibility = Visibility.Visible;

                this.grdChangingDose.RecordsPerPage = 7;
                //new
                let tp: TimeSpan = TimeSpan.Parse(
                    this.PresViewEndDate.Date.Subtract(this.PresViewStartDate.Date).ToString('hh:mm')
                );

                if (this.PresViewStartDate != DateTime.MinValue && this.PresViewEndDate != DateTime.MinValue && this.PresViewEndDate.Date != DateTime.MinValue.Date) {
                    let iNoOfPages: number = Convert.ToUInt16(Math.ceil((tp.TotalDays + 1) / 7));
                    this.grdChangingDose.PageCount = iNoOfPages;
                    this.totalCount = iNoOfPages;
                }
                this.CurPageStartDate = this.PresViewStartDate;
                this.CurPageEndDate = this.CurPageStartDate.DateTime.AddDays(CConstants.NO_OF_DAYS_INCREASED);
                if (this.CurPageEndDate > this.PresViewEndDate)
                    this.CurPageEndDate = this.PresViewEndDate;

                this.grdChangingDose.IsEnabled = true;
                this.grdStepped.CanUserSelect = false;
                this.grdStepped.IsSynchronizedWithCurrentItem = false;
                this.GetPrescribedDoseData();
                this.CurrentPageIndex = 1;
            }
            else if (!bHasValidSchedule) {
                this.grdChangingDose.Visibility = Visibility.Collapsed;
            }
            else {
                this.oSteppeddose.IsSchduleNotExist = Visibility.Collapsed;
                this.oSteppeddose.ScheduleGridTitile = Resource.steppeddose.ChangingDoseTitle;
                this.grdStepped.IsSynchronizedWithCurrentItem = true;
                this.grdStepped.CanUserSelect = true;
                this.grdStepped.setSelectedItemByIndex(0);
                this.grdSteppedPopulation(0);
                this.isRowselectFlag = true;
            }
            if ((this.oSteppeddose.sPresType == PrescriptionTypes.ForAdministration || (!String.IsNullOrEmpty(this.sPrescriptionTypeCode) && this.sPrescriptionTypeCode == PrescriptionTypes.ForAdministration)) && PatientContext.ClerkFormViewDefaultBehavior != ClerkFormViewDeftBehaviour.LaunchFormMandatory && (this.oLaunchFrom == SVIconLaunchFrom.MedChart || this.oLaunchFrom == SVIconLaunchFrom.PresChart || this.oLaunchFrom == SVIconLaunchFrom.PrescribeRHS || this.oLaunchFrom == SVIconLaunchFrom.TechVal || this.oLaunchFrom == SVIconLaunchFrom.PrescribeLHS || this.oLaunchFrom == SVIconLaunchFrom.Rx)) {
                if (!String.IsNullOrEmpty(PatientContext.IsPatientTranferAct) && PatientContext.IsPatientTranferAct.Equals("1")) {
                    this.bolFooterNoteCss = true;
                    this.lblDrugroundProfileWarningMessage.Visibility = Visibility.Visible;
                    this.lblDrugroundProfileWarningMessage.Text = Resource.steppeddose.WT_DrugroundTimeWarningMessage;
                    this.lblDrugroundProfileWarningMessage.TextWrapping = TextWrapping.Wrap;
                    this.oSteppeddose.ScheduleGridTitile = Resource.steppeddose.WT_ScheduleHeaderText;
                }
                else {
                    this.lblDrugroundProfileWarningMessage.Visibility = Visibility.Collapsed;
                    this.bolFooterNoteCss = false;
                }
            }
            else {
                this.bolFooterNoteCss = false;
                this.lblDrugroundProfileWarningMessage.Visibility = Visibility.Collapsed;
            }
        }
        //New For  CSS
         if(!this.isRowselectFlag)this.grdStepped.UnselectAll();
        this.updateDivHeight();
    }
    //LL16
    private OrginalCopy : any;
    private WorkingCopy :  any;
    public GetPrescribedDoseData(): void {
        if (this.oSteppeddose != null) {
            var objFullPresView: FullPrescriptionViewScheduling = new FullPrescriptionViewScheduling();
            var oScheduleDetailsCols: ObservableCollection<ScheduleDetailsCols>;
            if(this.OrginalCopy  == null) this.OrginalCopy = Deepclone.cloneDeep(this.oSteppeddose.StepDoseGridColms) as any;
            this.WorkingCopy = Deepclone.cloneDeep(this.OrginalCopy) as any;
            oScheduleDetailsCols = objFullPresView.ExtractCombinedScheduleDetails(this.CurPageStartDate, this.CurPageEndDate,  this.WorkingCopy as any);
            this.oScheduleDetails = ObjectHelper.CreateObject(new ScheduleDetailsSteppedVM(), { GrdData: oScheduleDetailsCols });
            //New Grid 2 Assign DS
            this.chdGrdPageCnt = Math.floor((new Date(this.PresViewEndDate.toString()).getTime() - new Date(this.PresViewStartDate.toString()).getTime()) / (24 * 60 * 60 * 1000));
            this.grdSchduleView = { data: this.oScheduleDetails.GrdData.array, total: this.chdGrdPageCnt + 1 }
            this.grdChangingDose.GenerateColumns();
            this.grdChangingDose.DataContext = this.oScheduleDetails;
            this.GeneratePresDateColumn();

        }

    }

    // new Css

    public updateDivHeight() {
        this.bolFooterCss = 0;
        if ((typeof this.oSteppeddose.PrescribedWarningMessage === 'undefined' ? 0 : (this.oSteppeddose.PrescribedWarningMessage.length > 0)) ||
            (typeof this.oSteppeddose.ScheduleNotExistMessage === 'undefined' ? 0 : (this.oSteppeddose.ScheduleNotExistMessage.length > 0))) {
            if (!this.bolFooterNoteCss)
                this.bolFooterCss = 3;
            else
                this.bolFooterCss = 1;
        }
        else {
            if (!this.bolFooterNoteCss)
                this.bolFooterCss = 2;
            else
                this.bolFooterCss = 0;
        }
    }

    public ValidateSteppedDoseForBlankAdminTimes(MultiDoseDetails: ObservableCollection<MultipleDoseDetail>): boolean {
        var isValidationSuccess: boolean = true;
        var _IsDoseValueEmpty: boolean = false;
        var isInValidateDayofWeek: boolean = false;
        var isAdminTimesEmpty: boolean = false;
        if (MultiDoseDetails != null && MultiDoseDetails.Count > 0) {
            var nTotalCount: number = MultiDoseDetails.Count;
            for (var iCount: number = 0; iCount < nTotalCount; iCount++) {
                if (MultiDoseDetails[iCount].Frequency == null || (MultiDoseDetails[iCount].Frequency != null && !String.IsNullOrEmpty(MultiDoseDetails[iCount].Frequency.Value) && String.Equals(MultiDoseDetails[iCount].Frequency.Value, "0"))) {
                    isAdminTimesEmpty = true;
                    break;
                }
                if (MultiDoseDetails[iCount] != null && ((MultiDoseDetails[iCount].DoseUOM == null) || (MultiDoseDetails[iCount].DoseUOM != null && (String.IsNullOrEmpty(MultiDoseDetails[iCount].DoseUOM.Value) || (!String.IsNullOrEmpty(MultiDoseDetails[iCount].DoseUOM.Value) && MultiDoseDetails[iCount].DoseUOM.Value.Equals("0")))))) {
                    _IsDoseValueEmpty = true;
                    break;
                }
                if (MultiDoseDetails[iCount] != null && String.IsNullOrEmpty(MultiDoseDetails[iCount].HyperlinkText) && MultiDoseDetails[iCount].LowerDose <= 0) {
                    _IsDoseValueEmpty = true;
                    break;
                }
                if (MultiDoseDetails[iCount].oAdminTimesVM != null && MultiDoseDetails[iCount].oAdminTimesVM.FreqDetails != null && MultiDoseDetails[iCount].oAdminTimesVM.FreqDetails.oFrequency != null && !String.IsNullOrEmpty(MultiDoseDetails[iCount].oAdminTimesVM.FreqDetails.oFrequency.UOM) && String.Equals(MultiDoseDetails[iCount].oAdminTimesVM.FreqDetails.oFrequency.UOM, "CC_MEDDRSN2")) {
                    var oDaysOfWeekSelectedCnt: number = MultiDoseDetails[iCount].DaysOfWeek != null ? MultiDoseDetails[iCount].DaysOfWeek.Where(x => x.StartsWith("T")).Count() : 0;
                    if (oDaysOfWeekSelectedCnt == 0) {
                        if (MultiDoseDetails[iCount].oAdminTimesVM.FreqDetails.oFrequency.IsSunday)
                            oDaysOfWeekSelectedCnt++;
                        if (MultiDoseDetails[iCount].oAdminTimesVM.FreqDetails.oFrequency.IsMonday)
                            oDaysOfWeekSelectedCnt++;
                        if (MultiDoseDetails[iCount].oAdminTimesVM.FreqDetails.oFrequency.IsTuesday)
                            oDaysOfWeekSelectedCnt++;
                        if (MultiDoseDetails[iCount].oAdminTimesVM.FreqDetails.oFrequency.IsWednesday)
                            oDaysOfWeekSelectedCnt++;
                        if (MultiDoseDetails[iCount].oAdminTimesVM.FreqDetails.oFrequency.IsThursday)
                            oDaysOfWeekSelectedCnt++;
                        if (MultiDoseDetails[iCount].oAdminTimesVM.FreqDetails.oFrequency.IsFriday)
                            oDaysOfWeekSelectedCnt++;
                        if (MultiDoseDetails[iCount].oAdminTimesVM.FreqDetails.oFrequency.IsSaturday)
                            oDaysOfWeekSelectedCnt++;
                    }
                    var LowEvent: number = (MultiDoseDetails[iCount].oAdminTimesVM.FreqDetails.oFrequency.LowEvent > 0 ? MultiDoseDetails[iCount].oAdminTimesVM.FreqDetails.oFrequency.LowEvent : 0);
                    if (oDaysOfWeekSelectedCnt < LowEvent) {
                        isInValidateDayofWeek = true;
                        break;
                    }
                }
            }
            if (isAdminTimesEmpty || _IsDoseValueEmpty || isInValidateDayofWeek) {
                isValidationSuccess = false;
            }
        }
        return isValidationSuccess;
    }

}

function __init(arg0: ScheduleDetailsSteppedVM, arg1: { GrdData: ObservableCollection<ScheduleDetailsCols>; }): ViewModelBase {
    throw new Error('Function not implemented.');
}



