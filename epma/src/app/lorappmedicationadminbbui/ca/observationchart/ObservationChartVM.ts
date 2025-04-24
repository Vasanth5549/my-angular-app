import { Component, OnInit } from '@angular/core';
import { StringBuilder,ProfileFactoryType,ContextManager,Convert,AppActivity, BusyIndicator, DayOfWeek, ProcessRTE, SLSecurityAccess, OnCheckAccessEventArgs, MediatorDataService} from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp,Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison,AppDialogEventargs, AppDialogResult, DelegateArgs, DialogComponentArgs, WindowButtonType, ObservableCollection, CListItem, ArrayOfString, RelayCommand, List, IEnumerable,  RTEEventargs } from 'epma-platform/models';
import { AppDialog } from 'epma-platform/controls';
import { AppContextInfo, AppSessionInfo, ContextInfo, PatientContext } from 'src/app/lorappcommonbb/utilities/globalvariable';
import { HelperService} from 'epma-platform/soapclient';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { LzoWizardVmbaseService as LzoWizardVMBase } from 'src/app/shared/epma-platform/services/lzo-wizard-vmbase.service';
import { Data } from '../../viewmodel/ObservationChartDataVM';
import { CReqMsgGetAdminListForObservationChart, CReqMsgGetLatestObservation, CResMsgGetAdministrationList, EPRDataitemReadParameterInfo, GetAdminListForObservationChartCompletedEventArgs, GetLatestObservationCompletedEventArgs, MedicationAdministrationWSSoapClient, Observation, ObservationValue } from 'src/app/shared/epma-platform/soap-client/MedicationAdministrationWS';
import { INotifyPropertyChanged, PropertyChangedEventArgs, PropertyChangedEventHandler } from 'src/app/shared/epma-platform/controls/epma-tab/epma-tab.component';
import { Visibility } from 'src/app/shared/epma-platform/controls-model/Visibility';
import { ObjectHelper as Helper,ObjectHelper } from 'epma-platform/helper';
import { CommonBB } from 'src/app/lorappcommonbb/utilities/common';
import { UserPermissions } from '../../utilities/ProfileData';
import { CReqMsgGetDataItem, CResMsgGetDataItem, GetDataItemCompletedEventArgs, IPPMAPrescribableDefnWSSoapClient } from 'src/app/shared/epma-platform/soap-client/IPPMAPrescribableDefnWS';
import { Common } from '../../utilities/common';
import { Resource } from '../../resource';
import { InfusionAdminDetail, SlotDetail } from 'src/app/product/shared/models/medicationadminws';
import { InfusionTypeCode } from 'src/app/lorappmedicationcommonbb/utilities/constants';
import { CConstants } from '../../utilities/CConstants';
import { CReqMsgGetResultsTabularView, GetResultsTabularViewCompletedEventArgs, InvestigationTabularView, ResultManagementWSSoapClient, SearchInvestigationResult } from 'src/app/shared/epma-platform/soap-client/ResultManagementWS';
import { PrescriptionHelper } from '../../utilities/PrescriptionHelper';
import { FormDataitemLatestValues } from 'src/app/shared/epma-platform/soap-client/CBCFormsWS';
import { SeriesColorCollection } from '../../utilities/ColorHelper';
import { MarkerType, Series, SeriesComponent, ValueAxis, XAxis, XAxisItemComponent } from '@progress/kendo-angular-charts';
import * as _ from 'lodash';
import { InjectorInstance } from 'src/app/app.module';

  ﻿
    export class ObservationChartVM extends LzoWizardVMBase {
        private _refreshChart: boolean;
        private _showGridLine: boolean = false;
        private _showDataPointLabel: boolean = true;
        private _Displaycancelledvalue: boolean = false;
        private _IsEnableGridLine: boolean = false;
        private _IsEnableDataPoint: boolean = false;
        private _IsEnableDisplaycancelledvalue: boolean = false;
        private _IsEnableReferencerange: boolean = false;
        //private _adminYAxis: AxisY = new AxisY();
        //private _axisYDataCollection: AxisYCollection;
        //private _chartSeriesMappings: SeriesMappingCollection;
        private _chartData: ObservableCollection<ObservableCollection<Data>>;
        private _zoomRangeStart: number = 0.0;
        private _zoomRangeEnd: number = 1.0;
        private _axisLabelFormat: string = "#VAL{dd-MMM}";
        private _axisXMinValue: number;
        private _axisXMaxValue: number;
        private _axisXStep: number = 1;
        private _titleName: string;
        private dataItemCodes: StringBuilder = new StringBuilder();
        private RdataItemCodes: StringBuilder = new StringBuilder();
        public RequestItemCodes: StringBuilder = new StringBuilder();
        private dataItemCode: StringBuilder = new StringBuilder();
        private RdataItemCode: StringBuilder = new StringBuilder();
        public static objResAdministrationList: CResMsgGetAdministrationList;
        private sPrescribedItem: string;
        private sPrescribedDose: string;
        private sPrescribedFrequency: string;
        private sPrescriptionType: string;
        private sOpenMode: string;
        private ItemToolTip: string;
        private sAdminchartLoading: string;
        private sObsResultchartLoading: string;
        public bIsAdminSameUOM: boolean = true;
        public bIsDiffInfusionUOM: boolean = false;
        public bAdminMsgShow: boolean = true;
        _showReferenceRange: boolean = true;
        public static bAreaCreated: boolean = false;
        public objGraphType: GraphType = null;
        public static CACHANGE: string = String.Empty;
        IsDST: boolean;
        IsAmbiguous: boolean;
        IsInvalid: boolean;
        public GOButtonEnabled: boolean = true;

        kgrid_columns: ColumnSetting_kgrid[] = []
        kgrid_data: TabViewData_kgrid[] = [];
        kchart_series_obs: Series[];
        kchart_max_axis_crossing: number = 0;
        kchart_min_axis_crossing: number = 0;
        kchart_data_obs: any[] = [];
        kchart_colors: string[] = ["#1597BB", "#D89216", "#726A95", "#541212", "#2B3595", "#F10086", "#6A0572","#A459D1",  "#9A0680", "#1E5128","#FF4301", "#A7D129"];
        kchart_shapes: MarkerType[] = ["circle", "square", "triangle",  "roundedRect"]
        kchart_series_admin: Series;
        kmenu_items: kMenu_MenuItem[] = [];
        kchart_fromDate: DateTime; 
        kchart_toDate: DateTime; 
        kchart_xaxis: XAxis = {baseUnit : 'days'};

        private OnPropertyChanged(prop:string){
            let e:PropertyChangedEventArgs = { PropertyName:prop};
            this.PropertyChanged({},e);

            if(prop == 'Displaycancelledvalue'){
                this.generatekGridDataFromDynTabularviewData();
                //equivalent to observationVM_GenerateTabview method in the MedsAdminObservationView.ts
            }
            
        }
        public get PrescribedItem(): string {
            return this.sPrescribedItem;
        }
        public set PrescribedItem(value: string) {
            this.sPrescribedItem = value;
            //super.OnPropertyChanged("PrescribedItem");
        }
        public get AdminChartLoading(): string {
            return this.sAdminchartLoading;
        }
        public set AdminChartLoading(value: string) {
            this.sAdminchartLoading = value;
            //super.OnPropertyChanged("AdminChartLoading");
        }
        public get ObsResultchartLoading(): string {
            return this.sObsResultchartLoading;
        }
        public set ObsResultchartLoading(value: string) {
            this.sObsResultchartLoading = value;
            //super.OnPropertyChanged("ObsResultchartLoading");
        }
        public get PrescriptionType(): string {
            return this.sPrescriptionType;
        }
        public set PrescriptionType(value: string) {
            this.sPrescriptionType = value;
            //super.OnPropertyChanged("PrescriptionType");
        }
        public get OpenMode(): string {
            return this.sOpenMode;
        }
        public set OpenMode(value: string) {
            this.sOpenMode = value;
            //super.OnPropertyChanged("OpenMode");
        }
        public get PrescribedDose(): string {
            return this.sPrescribedDose;
        }
        public set PrescribedDose(value: string) {
            this.sPrescribedDose = value;
            //super.OnPropertyChanged("PrescribedDose");
        }
        public get PrescribedFrequency(): string {
            return this.sPrescribedFrequency;
        }
        public set PrescribedFrequency(value: string) {
            this.sPrescribedFrequency = value;
            //super.OnPropertyChanged("PrescribedFrequency");
        }
        private _WindowClosed: string;
        public get WindowClosed(): string {
            return this._WindowClosed;
        }
        public set WindowClosed(value: string) {
            this._WindowClosed = value;
            //OnPropertyChanged("WindowClosed");
        }
        private obsTabluarviewData: ObservableCollection<ObservationData>;
        public get TabularviewData(): ObservableCollection<ObservationData> {
            return this.obsTabluarviewData;
        }
        public set TabularviewData(value: ObservableCollection<ObservationData>) {
            this.obsTabluarviewData = value;
            //super.OnPropertyChanged("TabularviewData");
        }
        private obsDynTabluarviewData: ObservableCollection<TabViewData>;
        public get DynTabularviewData(): ObservableCollection<TabViewData> {
            return this.obsDynTabluarviewData;
        }
        public set DynTabularviewData(value: ObservableCollection<TabViewData>) {
            this.obsDynTabluarviewData = value;
            //super.OnPropertyChanged("DynTabularviewData");
        }
        private objMainMenu: ObservableCollection<MenuItem>;
        public get MainMenu(): ObservableCollection<MenuItem> {
            return this.objMainMenu;
        }
        public set MainMenu(value: ObservableCollection<MenuItem>) {
            this.objMainMenu = value;
            //super.OnPropertyChanged("MainMenu");
        }
        private bIsEnteredObsResult: boolean;
        public get IsEnteredObsResult(): boolean {
            return this.bIsEnteredObsResult;
        }
        public set IsEnteredObsResult(value: boolean) {
            this.bIsEnteredObsResult = value;
            //super.OnPropertyChanged("IsEnteredObsResult");
        }
        //public delegate void SetFocus(string PropertyName, string sErrorTitle, string sErrorMessage, bool bShowErrorMsg);
        //public delegate void GenerateColumns();
        public GenerateTabview: Function;
        public ObservationFocus: Function;
        public get RefreshChart(): boolean {
            return this._refreshChart;
        }
        public set RefreshChart(value: boolean) {
            this._refreshChart = value;
            this.OnPropertyChanged("RefreshChart");
        }
        public get ShowReferenceRange(): boolean {
            return this._showReferenceRange;
        }
        public set ShowReferenceRange(value: boolean) {
            this._showReferenceRange = value;
            this.OnPropertyChanged("ShowReferenceRange");
        }
        public get ShowGridLine(): boolean {
            return this._showGridLine;
        }
        public set ShowGridLine(value: boolean) {
            this._showGridLine = value;
            this.OnPropertyChanged("ShowGridLine");
        }
        public get ShowDataPointLabel(): boolean {
            return this._showDataPointLabel;
        }
        public set ShowDataPointLabel(value: boolean) {
            this._showDataPointLabel = value;
            this.OnPropertyChanged("ShowDataPointLabel");
        }
        public get Displaycancelledvalue(): boolean {
            return this._Displaycancelledvalue;
        }
        public set Displaycancelledvalue(value: boolean) {
            this._Displaycancelledvalue = value;
            this.OnPropertyChanged("Displaycancelledvalue");
        }
        public get IsEnableDisplaycancelledvalue(): boolean {
            return this._IsEnableDisplaycancelledvalue;
        }
        public set IsEnableDisplaycancelledvalue(value: boolean) {
            this._IsEnableDisplaycancelledvalue = value;
            this.OnPropertyChanged("IsEnableDisplaycancelledvalue");
        }
        public get IsEnableDataPoint(): boolean {
            return this._IsEnableDataPoint;
        }
        public set IsEnableDataPoint(value: boolean) {
            this._IsEnableDataPoint = value;
            this.OnPropertyChanged("IsEnableDataPoint");
        }
        public get IsEnableGridLine(): boolean {
            return this._IsEnableGridLine;
        }
        public set IsEnableGridLine(value: boolean) {
            this._IsEnableGridLine = value;
            this.OnPropertyChanged("IsEnableGridLine");
        }
        public get IsEnableReferencerange(): boolean {
            return this._IsEnableReferencerange;
        }
        public set IsEnableReferencerange(value: boolean) {
            this._IsEnableReferencerange = value;
            this.OnPropertyChanged("IsEnableReferencerange");
        }
        public get ZoomRangeStart(): number {
            return this._zoomRangeStart;
        }
        public set ZoomRangeStart(value: number) {
            if (this._zoomRangeStart != value) {
                this._zoomRangeStart = value;
                //this.OnPropertyChanged("ZoomRangeStart");
            }
        }
        public get ZoomRangeEnd(): number {
            return this._zoomRangeEnd;
        }
        public set ZoomRangeEnd(value: number) {
            if (this._zoomRangeEnd != value) {
                this._zoomRangeEnd = value;
                //this.OnPropertyChanged("ZoomRangeEnd");
            }
        }
        public get AxisXMinValue(): number {
            return this._axisXMinValue;
        }
        public set AxisXMinValue(value: number) {
            if (this._axisXMinValue != value) {
                this._axisXMinValue = value;
                //this.OnPropertyChanged("AxisXMinValue");
            }
        }
        public get AxisXMaxValue(): number {
            return this._axisXMaxValue;
        }
        public set AxisXMaxValue(value: number) {
            if (this._axisXMaxValue != value) {
                this._axisXMaxValue = value;
                //this.OnPropertyChanged("AxisXMaxValue");
            }
        }
        public get AxisXStep(): number {
            return this._axisXStep;
        }
        public set AxisXStep(value: number) {
            if (this._axisXStep != value) {
                this._axisXStep = value;
                //this.OnPropertyChanged("AxisXStep");
            }
        }
        public get AxisLabelFormat(): string {
            return this._axisLabelFormat;
        }
        public set AxisLabelFormat(value: string) {
            if (this._axisLabelFormat != value) {
                this._axisLabelFormat = value;
                //this.OnPropertyChanged("AxisLabelFormat");
            }
        }
        /* public get ChartSeriesMappings(): SeriesMappingCollection {
            if (this._chartSeriesMappings == null) {
                this._chartSeriesMappings = new SeriesMappingCollection();
            }
            return this._chartSeriesMappings;
        } */
        /* public set ChartSeriesMappings(value: SeriesMappingCollection) {
            if (this._chartSeriesMappings != value) {
                this._chartSeriesMappings = value;
            }
            this.OnPropertyChanged("ChartSeriesMappings");
        } */
        public get ChartData(): ObservableCollection<ObservableCollection<Data>> {
            return this._chartData;
        }
        public set ChartData(value: ObservableCollection<ObservableCollection<Data>>) {
            if (this._chartData != value) {
                this._chartData = value;
                this.OnPropertyChanged("ChartData");
            }
        }
        public get TitleName(): string {
            return this._titleName;
        }
        public set TitleName(value: string) {
            this._titleName = value;
            this.OnPropertyChanged("TitleName");
        }
        /* public get ObsResultAdditionalYAxis(): AxisYCollection {
            if (this._axisYDataCollection == null) {
                this._axisYDataCollection = new AxisYCollection();
                for (let i: number = 0; i <= 10; i++) {
                    let axisYData: AxisY = new AxisY();
                    axisYData.AddRange(0, 100, 10);
                    axisYData.Visibility = Visibility.Collapsed;
                    axisYData.PlotAreaAxisVisibility = Visibility.Collapsed;
                    axisYData.AxisName = "ObsResultAxisName" + i;
                    this._axisYDataCollection.Add(axisYData);
                }
            }
            return this._axisYDataCollection;
        }  */
        /* public set ObsResultAdditionalYAxis(value: AxisYCollection) {
            this._axisYDataCollection = value;
            this.OnPropertyChanged("ObsResultAdditionalYAxis");
        } */
        /* public get AdminAxis(): AxisY {
            if (this._adminYAxis == null) {
                this._adminYAxis = new AxisY();
                this._adminYAxis.Visibility = Visibility.Visible;
            }
            return this._adminYAxis;
        } */
        /* public set AdminAxis(value: AxisY) {
            this._adminYAxis = value;
            this.OnPropertyChanged("AdminAxis");
        } */
        private _zoomScrollVisibility: Visibility = Visibility.Collapsed;
        public get ZoomScrollVisibility(): Visibility {
            return this._zoomScrollVisibility;
        }
        public set ZoomScrollVisibility(value: Visibility) {
            this._zoomScrollVisibility = value;
            this.OnPropertyChanged("ZoomScrollVisibility");
        }
        private dttmFromDate: DateTime;
        private dttmToDate: DateTime;
        private sPeriod: string;
        private bReferenceRange: boolean;
        private bGriLines: boolean;
        
        private periodCode: CListItem;
        private bRangeEnabled: boolean;
        public get Period(): string {
            return this.sPeriod;
        }
        public set Period(value: string) {
            if (this.sPeriod != value) {
                this.sPeriod = value;
                this.OnPropertyChanged("Period");
            }
        }
        public get FromDate(): DateTime{
            return this.dttmFromDate;
        }
        public set FromDate(value: DateTime) {
            if (this.dttmFromDate != value) {
                this.dttmFromDate = value;
                this.OnPropertyChanged("FromDate");
            }
        }
        public get ToDate(): DateTime{
            return this.dttmToDate;
        }
        public set ToDate(value: DateTime) {
            if (this.dttmToDate != value) {
                this.dttmToDate = value;
                this.OnPropertyChanged("ToDate");
            }
        }
        public get IsReferenceRange(): boolean {
            return this.bReferenceRange;
        }
        public set IsReferenceRange(value: boolean) {
            if (this.bReferenceRange != value) {
                this.bReferenceRange = value;
                this.OnPropertyChanged("IsReferenceRange");
            }
        }
        public get IsGridLines(): boolean {
            return this.bGriLines;
        }
        public set IsGridLines(value: boolean) {
            if (this.bGriLines != value) {
                this.bGriLines = value;
                //this.OnPropertyChanged("IsGridLines");
            }
        }
        public get PeriodCode(): CListItem {
            return this.periodCode;
        }
        public set PeriodCode(value: CListItem) {
            if (this.periodCode != value) {
                this.periodCode = value;
                //this.OnPropertyChanged("PeriodCode");
            }
        }
        private _PeriodCodes: ObservableCollection<CListItem> = new ObservableCollection<CListItem>();
        public get PeriodCodes(): ObservableCollection<CListItem> {
            return this._PeriodCodes;
        }
        public set PeriodCodes(value: ObservableCollection<CListItem>) {
            if (!Helper.ReferenceEquals(this._PeriodCodes, value)) {
                this._PeriodCodes = value;
                //this.OnPropertyChanged("PeriodCodes");
            }
        }
        public get IsRangeEnabled(): boolean {
            return this.bRangeEnabled;
        }
        public set IsRangeEnabled(value: boolean) {
            if (this.bRangeEnabled != value) {
                this.bRangeEnabled = value;
                //this.OnPropertyChanged("IsRangeEnabled");
            }
        }
        private sDayOneHeader: string;
        public get DayOneHeader(): string {
            return this.sDayOneHeader;
        }
        public set DayOneHeader(value: string) {
            if (this.sDayOneHeader != value) {
                this.sDayOneHeader = value;
                //this.OnPropertyChanged("DayOneHeader");
            }
        }
        private sDayTwoHeader: string;
        public get DayTwoHeader(): string {
            return this.sDayTwoHeader;
        }
        public set DayTwoHeader(value: string) {
            if (this.sDayTwoHeader != value) {
                this.sDayTwoHeader = value;
                //this.OnPropertyChanged("DayTwoHeader");
            }
        }
        private sDayThreeHeader: string;
        public get DayThreeHeader(): string {
            return this.sDayThreeHeader;
        }
        public set DayThreeHeader(value: string) {
            if (this.sDayThreeHeader != value) {
                this.sDayThreeHeader = value;
                //this.OnPropertyChanged("DayThreeHeader");
            }
        }
        private sDayFourHeader: string;
        public get DayFourHeader(): string {
            return this.sDayFourHeader;
        }
        public set DayFourHeader(value: string) {
            if (this.sDayFourHeader != value) {
                this.sDayFourHeader = value;
                //this.OnPropertyChanged("DayFourHeader");
            }
        }
        private sDayFiveHeader: string;
        public get DayFiveHeader(): string {
            return this.sDayFiveHeader;
        }
        public set DayFiveHeader(value: string) {
            if (this.sDayFiveHeader != value) {
                this.sDayFiveHeader = value;
                //his.OnPropertyChanged("DayFiveHeader");
            }
        }
        private sDaySixHeader: string;
        public get DaySixHeader(): string {
            return this.sDaySixHeader;
        }
        public set DaySixHeader(value: string) {
            if (this.sDaySixHeader != value) {
                this.sDaySixHeader = value;
                //this.OnPropertyChanged("DaySixHeader");
            }
        }
        private sDaySevenHeader: string;
        public get DaySevenHeader(): string {
            return this.sDaySevenHeader;
        }
        public set DaySevenHeader(value: string) {
            if (this.sDaySevenHeader != value) {
                this.sDaySevenHeader = value;
                //this.OnPropertyChanged("DaySevenHeader");
            }
        }
        private objAdminDetail: ObservableCollection<AdministrationRow>;
        public get AdminDetailGrid(): ObservableCollection<AdministrationRow> {
            return this.objAdminDetail;
        }
        public set AdminDetailGrid(value: ObservableCollection<AdministrationRow>) {
            this.objAdminDetail = value;
            //super.OnPropertyChanged("AdminDetailGrid");
        }
        public ItemSubType: string;
        public MultiComponentItems: ArrayOfString;
        /* private ClearSeriesMappings(): void {
            if (this.ChartSeriesMappings != null && this.ChartSeriesMappings.Count > 0)
                this.ChartSeriesMappings.Clear();
        } */
        private SetAxesVisibility(): void {
            /* this.ObsResultAdditionalYAxis.ForEach(x => x.Visibility = Visibility.Collapsed);
            this.AdminAxis.Visibility = Visibility.Collapsed; */
        } 
        public UpdateChartAdditionalAxes(): void {
            this.SetAxesVisibility();
            if (this.objGraphType != null && this.objGraphType.GraphData != null && this.objGraphType.GraphData.Count > 0) {
                let adminResult = this.objGraphType.GraphData.Where(x => x.Type == "Admin").FirstOrDefault();
                let obsResults = this.objGraphType.GraphData.Where(x => x.Type != "Admin" && x.Type != "Composite").ToList();
                //let compositeResults = this.objGraphType.GraphData.Where(x => x.Type == "Composite").GroupBy(x => x.Name).Select(group => new { Name = group.Key, Results = group.Select(x => x).ToList() });
                var compositeResults = this.objGraphType.GraphData.Where(x => x.Type == "Composite").GroupBy(x => x.Name).Select(group => {return { Name : group.Key, Results : group.Select(x => x).ToList() }});
                let axisCount: number = 0;
                if (obsResults != null) {
                    obsResults.forEach( (obsResult)=> {
                        /* this.ObsResultAdditionalYAxis[axisCount].Visibility = Visibility.Visible;
                        this.ObsResultAdditionalYAxis[axisCount].Title = obsResult.Displayname; */
                        axisCount++;
                    });
                }
                if (compositeResults != null) {
                    compositeResults.forEach( (composite)=> {
                        /* this.ObsResultAdditionalYAxis[axisCount].Visibility = Visibility.Visible;
                        this.ObsResultAdditionalYAxis[axisCount].Title = composite.Results[0].Displayname; */
                        axisCount++;
                    });
                }
                if (adminResult != null) {
                    /* this.AdminAxis.Visibility = Visibility.Visible;
                    this.AdminAxis.Title = adminResult.Displayname; */
                }
            }
        } 
        /* private CreateLineSeries(axisName: string, seriesName: string, seriesColor: Brush, markerShape: number): SplineSeriesDefinition {
            let objLineSeriesDefinition: SplineSeriesDefinition = new SplineSeriesDefinition();
            objLineSeriesDefinition.EmptyPointBehavior = EmptyPointBehavior.Drop;
            objLineSeriesDefinition.Appearance.Cursor = Cursors.Hand;
            objLineSeriesDefinition.InteractivitySettings.HoverScope = InteractivityScope.Series;
            objLineSeriesDefinition.AxisName = axisName;
            objLineSeriesDefinition.SeriesName = seriesName;
            objLineSeriesDefinition.Appearance.PointMark.Stroke = new SolidColorBrush(Colors.Gray);
            objLineSeriesDefinition.Appearance.PointMark.Shape = <MarkerShape>markerShape;
            objLineSeriesDefinition.Appearance.PointMark.Fill = seriesColor;
            objLineSeriesDefinition.LegendDisplayMode = LegendDisplayMode.SeriesLabel;
            objLineSeriesDefinition.ShowItemToolTips = true;
            return objLineSeriesDefinition;
        } */
        /* private CreateSeries(seriesDefinition: SeriesDefinition, hoverScope: InteractivityScope, legendDisplayMode: LegendDisplayMode, axisName: string, seriesName: string, seriesColor: Brush, markerShape: number): SeriesDefinition {
            let objSeriesDefinition: SeriesDefinition = seriesDefinition;
            objSeriesDefinition.EmptyPointBehavior = EmptyPointBehavior.Drop;
            objSeriesDefinition.Appearance.Cursor = Cursors.Hand;
            objSeriesDefinition.InteractivitySettings.HoverScope = hoverScope;
            objSeriesDefinition.AxisName = axisName;
            objSeriesDefinition.SeriesName = seriesName;
            objSeriesDefinition.Appearance.PointMark.Stroke = new SolidColorBrush(Colors.Gray);
            objSeriesDefinition.Appearance.PointMark.Shape = <MarkerShape>markerShape;
            objSeriesDefinition.Appearance.PointMark.Fill = seriesColor;
            objSeriesDefinition.Appearance.Fill = seriesColor;
            objSeriesDefinition.Appearance.Stroke = seriesColor;
            objSeriesDefinition.LegendDisplayMode = legendDisplayMode;
            objSeriesDefinition.ShowItemToolTips = true;
            if (objSeriesDefinition.GetType() == typeof(RangeBarSeriesDefinition))
                objSeriesDefinition.ShowItemLabels = false;
            return objSeriesDefinition;
        } */
        /* private CreateSeriesDef(seriesDefinition: SeriesDefinition, axisName: string, seriesName: string): SeriesDefinition {
            let objSeriesDefinition: SeriesDefinition = seriesDefinition;
            objSeriesDefinition.EmptyPointBehavior = EmptyPointBehavior.Drop;
            objSeriesDefinition.Appearance.Cursor = Cursors.Hand;
            objSeriesDefinition.AxisName = axisName;
            objSeriesDefinition.SeriesName = seriesName;
            objSeriesDefinition.LegendDisplayMode = LegendDisplayMode.None;
            objSeriesDefinition.ShowItemLabels = false;
            return objSeriesDefinition;
        } */
        /* private ConfigureLineMapping(collectionIndex: number, legendLabel: string, seriesDefinition: SeriesDefinition, filterDescriptor: string, chartAreaName: string): SeriesMapping {
            let mapping: SeriesMapping = new SeriesMapping();
            mapping.CollectionIndex = collectionIndex;
            mapping.SeriesDefinition = seriesDefinition;
            mapping.LegendLabel = legendLabel;
            mapping.ChartAreaName = chartAreaName;
            mapping.FilterDescriptors.Add(ObjectHelper.CreateObject(new ChartFilterDescriptor(), { Member: "Type", Value: filterDescriptor }));
            mapping.ItemMappings.Add(new ItemMapping("TimeStamp", DataPointMember.XValue));
            mapping.ItemMappings.Add(new ItemMapping("High", DataPointMember.High));
            mapping.ItemMappings.Add(new ItemMapping("Low", DataPointMember.Low));
            mapping.ItemMappings.Add(new ItemMapping("Value", DataPointMember.YValue));
            return mapping;
        } */
        /* private ConfigureLineMapping1(collectionIndex: number, legendLabel: string, seriesDefinition: SeriesDefinition, FilterDescriptor: string, CAName: string): SeriesMapping {
            let mapping: SeriesMapping = new SeriesMapping();
            mapping.SeriesDefinition = seriesDefinition;
            mapping.LegendLabel = legendLabel;
            mapping.CollectionIndex = collectionIndex;
            mapping.ChartAreaName = CAName;
            mapping.FilterDescriptors.Add(ObjectHelper.CreateObject(new ChartFilterDescriptor(), { Member: "Type", Value: FilterDescriptor }));
            mapping.ItemMappings.Add(new ItemMapping("TimeStamp", DataPointMember.XValue));
            mapping.ItemMappings.Add(new ItemMapping("High", DataPointMember.High));
            mapping.ItemMappings.Add(new ItemMapping("Low", DataPointMember.Low));
            mapping.ItemMappings.Add(new ItemMapping("Value", DataPointMember.YValue));
            return mapping;
        } */
        public AssignObsResultData(): ObservableCollection<ObservableCollection<Data>> {
            let AreaData: ObservableCollection<ObservableCollection<Data>> = new ObservableCollection<ObservableCollection<Data>>();
            //this.ClearSeriesMappings();
            if (this.objGraphType != null) {
                if (this.objGraphType.GraphData != null) {
                    let count: number = 0;
                    let isRangeAvailable: boolean = false;
                    let adminResult = this.objGraphType.GraphData.Where(x => x.Type == "Admin").FirstOrDefault();
                    let obsResults = this.objGraphType.GraphData.Where(x => x.Type != "Admin" && x.Type != "Composite").ToList();
                    //let compositeResults = this.objGraphType.GraphData.Where(x => x.Type == "Composite").GroupBy(x => x.Name).Select(group => new { Name = group.Key, Results = group.Select(x => x).ToList() });
                    var compositeResults = this.objGraphType.GraphData.Where(x => x.Type == "Composite").GroupBy(x => x.Name).Select(group => {return { Name : group.Key, Results : group.Select(x => x).ToList() }});
                    let pointCount: number = 0;
                    let compositeColorCount: number = 0;
                    let markerCount: number = 0;
                    let DummyData: ObservableCollection<Data> = new ObservableCollection<Data>();
                    let dt: TimeSpan = this.ToDate.Subtract(this.FromDate);
                    if (dt.Days == 0 && dt.Hours > 0) {
                        for (let i: number = 0; i <= dt.Hours; i++) {
                            DummyData.Add(new Data("Observation", this.FromDate.AddHours(i), 10, 50, 20));
                        }
                    }
                    else {
                        for (let i: number = 0; i <= dt.Days; i++) {
                            DummyData.Add(new Data("Observation", this.FromDate.AddDays(i), 10, 50, 20));
                        }
                    }
                    AreaData.Add(DummyData);
                    /* this.ChartSeriesMappings.Add(this.ConfigureLineMapping(count, "DummyData",
                        CreateSeries(new SplineSeriesDefinition(), InteractivityScope.None, LegendDisplayMode.None, "DummyYAxis",
                            "Series_DummyData", SeriesColorCollection.SeriesColors[pointCount].Value, markerCount),
                        "Observation", "ObsResultChartArea")); */
                    pointCount++;
                    count++;
                    if (obsResults != null && obsResults.Count > 0) {
                        for (let nCnt: number = 0; nCnt < obsResults.Count; nCnt++) {
                            let RData: ObservableCollection<Data> = new ObservableCollection<Data>();
                            obsResults[nCnt].oDataPoints.forEach( (subRGraph)=> {
                                RData.Add(new Data(obsResults[nCnt].Type, subRGraph.RecorderDTTM,
                                    Convert.ToDouble(subRGraph.Value), obsResults[nCnt].High, obsResults[nCnt].Low, subRGraph.ValuePrefix, subRGraph.FormOID, subRGraph.Name,
                                    subRGraph.sTooltipText, subRGraph.ModifyObserRights, subRGraph.CancelObserRights, subRGraph.ObsName, subRGraph.PatientOID, subRGraph.EncounterOID));
                            });
                            if (RData.Count > 0) {
                                AreaData.Add(RData);
                                /* this.ChartSeriesMappings.Add(this.ConfigureLineMapping1(count, "DummyData",
                                    CreateSeriesDef(new SplineSeriesDefinition(), "ObsResultAxis" + pointCount,
                                        "Series" + obsResults[nCnt].Name + count),
                                    obsResults[nCnt].Type, "ObsResultChartArea"));
                                this.ChartSeriesMappings.Add(this.ConfigureLineMapping(count, obsResults[nCnt].Name,
                                    CreateSeries(new SplineSeriesDefinition(), InteractivityScope.None, LegendDisplayMode.SeriesLabel, "ObsResultAxis" + pointCount,
                                        "Series" + obsResults[nCnt].Name + count, SeriesColorCollection.SeriesColors[pointCount].Value, markerCount),
                                    obsResults[nCnt].Type, "ObsResultChartArea")); */
                                pointCount++;
                                count++;
                                markerCount++;
                            }
                        }
                    }
                    compositeResults.forEach( (composite)=> {
                        //let legendDisplayMode: LegendDisplayMode = LegendDisplayMode.SeriesLabel;
                        if (composite != null && composite.Results.Count > 0) {
                            for (let nCnt: number = 0; nCnt < composite.Results.Count; nCnt++) {
                                let CompositeH: ObservableCollection<Data> = new ObservableCollection<Data>();
                                let CompositeR: ObservableCollection<Data> = new ObservableCollection<Data>();
                                if (composite.Results[nCnt].oDataPoints.Count > 0 && (composite.Results[nCnt].oDataPoints[0].High != composite.Results[nCnt].oDataPoints[0].Low)) {
                                    if (!isRangeAvailable) {
                                        composite.Results[nCnt].oDataPoints.forEach( (subRGraph)=> {
                                            CompositeR.Add(new Data("Composite", subRGraph.RecorderDTTM,
                                                subRGraph.High, subRGraph.Low,
                                                subRGraph.FormOID, composite.Name,
                                                subRGraph.sTooltipText, subRGraph.ModifyObserRights, subRGraph.CancelObserRights, subRGraph.ObsName, subRGraph.PatientOID, subRGraph.EncounterOID));
                                        });
                                        if (CompositeR.Count > 0) {
                                            AreaData.Add(CompositeR);
                                            /* this.ChartSeriesMappings.Add(this.ConfigureLineMapping(count, composite.Name,
                                                CreateSeries(new RangeBarSeriesDefinition(), InteractivityScope.None, LegendDisplayMode.None, "ObsResultAxis" + pointCount,
                                                    "Series" + composite.Name + count, SeriesColorCollection.SeriesColors[pointCount].Value, markerCount), "Composite", "ObsResultChartArea")); */
                                            count++;
                                        }
                                    }
                                }
                                else {
                                    composite.Results[nCnt].oDataPoints.forEach( (subRGraph)=> {
                                        CompositeH.Add(new Data("Composite", subRGraph.RecorderDTTM,
                                            Convert.ToDouble(subRGraph.Value), subRGraph.ValuePrefix,
                                            subRGraph.FormOID, composite.Name,
                                            subRGraph.sTooltipText, subRGraph.ModifyObserRights, subRGraph.CancelObserRights, subRGraph.ObsName, subRGraph.PatientOID, subRGraph.EncounterOID));
                                    });
                                    if (CompositeH.Count > 0) {
                                        AreaData.Add(CompositeH);
                                        /* this.ChartSeriesMappings.Add(this.ConfigureLineMapping(count, composite.Name,
                                            CreateSeries(new LineSeriesDefinition(), InteractivityScope.None, legendDisplayMode, "ObsResultAxis" + pointCount,
                                                "Series" + composite.Name + count, SeriesColorCollection.SeriesColors[pointCount].Value, markerCount),
                                            "Composite", "ObsResultChartArea")); */
                                        count++;
                                    }
                                    //legendDisplayMode = LegendDisplayMode.None;
                                }
                            }
                        }
                        isRangeAvailable = true;
                        pointCount++;
                        markerCount++;
                        compositeColorCount++;
                    });
                    let AdminDummyData: ObservableCollection<Data> = new ObservableCollection<Data>();
                    let dt1: TimeSpan = this.ToDate.Subtract(this.FromDate);
                    if (dt1.Days == 0 && dt1.Hours > 0) {
                        for (let i: number = 0; i <= dt1.Hours; i++) {
                            AdminDummyData.Add(new Data("Admin", this.FromDate.AddHours(i), 30, 50, 20));
                        }
                    }
                    else {
                        for (let i: number = 0; i <= dt1.Days; i++) {
                            AdminDummyData.Add(new Data("Admin", this.FromDate.AddDays(i), 30, 50, 20));
                        }
                    }
                    AreaData.Add(AdminDummyData);
                    /* this.ChartSeriesMappings.Add(this.ConfigureLineMapping(count, "Dose administered",
                        CreateSeries(new SplineSeriesDefinition(), InteractivityScope.None, LegendDisplayMode.None, "AdminDummyAxis", "AdminSeries",
                            SeriesColorCollection.SeriesColors[0].Value, 4), "Admin", "AdminChartArea")); */
                    count++;
                    if (adminResult != null) {
                        let RData: ObservableCollection<Data> = new ObservableCollection<Data>();
                        let nFlowRate: number = 0;
                        let sAdminLegendDisplay: string;
                        adminResult.oDataPoints.forEach( (subRGraph)=> {
                            RData.Add(new Data("Admin", subRGraph.RecorderDTTM, Convert.ToDouble(subRGraph.Value), adminResult.High, adminResult.Low,
                                subRGraph.ValuePrefix, subRGraph.FormOID, subRGraph.Name, subRGraph.sTooltipText, subRGraph.ModifyObserRights, subRGraph.CancelObserRights, subRGraph.ObsName, subRGraph.PatientOID, subRGraph.EncounterOID));
                            if (subRGraph.IsFlowRate)
                                nFlowRate = nFlowRate + 1;
                        });
                        if (RData.Count > 0) {
                            if (nFlowRate > 0)
                                sAdminLegendDisplay = Resource.ObservationChartResource.INFUSION_FLOWRATE;
                            else sAdminLegendDisplay = Resource.ObservationChartResource.DOSE_ADMINISTERED;
                            AreaData.Add(RData);
                            /* this.ChartSeriesMappings.Add(this.ConfigureLineMapping(count, sAdminLegendDisplay,
                                CreateSeries(new SplineSeriesDefinition(), InteractivityScope.None, LegendDisplayMode.SeriesLabel, "AdminAxisName", "AdminSeries",
                                    SeriesColorCollection.SeriesColors[0].Value, 4), "Admin", "AdminChartArea")); */
                            count++;
                        }
                    }
                }
            } 
            return AreaData;
        }
        private AssignChart(axisXMinValue: number, axisXMaxValue: number, axisXStep: number, IsAdmin: boolean, IsHourFormat: boolean): void {
            this.AxisXMinValue = axisXMinValue;
            this.AxisXMaxValue = axisXMaxValue;
            this.AxisXStep = axisXStep;
            if (IsHourFormat)
                this.AxisLabelFormat = "#VAL{HH:mm}";
            else this.AxisLabelFormat = "#VAL{dd-MMM}";
            //this.UpdateChartAdditionalAxes();
            this.ChartData = this.AssignObsResultData();
            if (this.ChartData != null) {
                this.ZoomScrollVisibility = Visibility.Visible;
            }
            else this.ZoomScrollVisibility = Visibility.Collapsed;
            if (!this.bIsAdminSameUOM && this.bAdminMsgShow) {
                iMessageBox.Show("LORENZO", "Dose administered has values from different UOMs and hence cannot be plotted.", MessageBoxType.Information, MessageBoxButton.OK);
                this.bAdminMsgShow = false;
            }
            this.RefreshChart = !this.RefreshChart;
        }
        private oBtnGOClick: RelayCommand;
        public get BtnGoClick(): RelayCommand {
            if (this.oBtnGOClick == null) {
                this.oBtnGOClick = new RelayCommand(this.OnGoButtonClick);
            }
            return this.oBtnGOClick;
        }
        public OnGoButtonClick(): void {
            this.GOButtonEnabled = false;
            if (!this.ValidateMandatory())
                return
            if (this.ChartData != null && this.ChartData.Count > 0) {
                this.ChartData = new ObservableCollection<ObservableCollection<Data>>();
            }
            this.objGraphType = new GraphType();
            this.objGraphType.GraphData = new ObservableCollection<DataSeries>();
            this.ZoomRangeStart = Convert.ToDouble(0.0);
            this.ZoomRangeEnd = Convert.ToDouble(1.0);
            ObservationChartVM.CACHANGE = "NONE";
            this.bAdminMsgShow = true;
            this.SetDateRange(true);
            this.DynTabularviewData = new ObservableCollection<TabViewData>();
            this.IsEnableDataPoint = this.IsEnableGridLine = this.IsEnableDisplaycancelledvalue = this.IsEnableReferencerange = false;
            this.GetDetails();
        }
        private ValidateMandatory(): boolean {
            if (this.FromDate.Equals(DateTime.MinValue)) {
                if (this.ObservationFocus != null)
                    this.ObservationFocus("FromDate", "Lorenzo", "Please select/ enter the date range", true);
                return false;
            }
            else if (this.ToDate.Equals(DateTime.MinValue)) {
                if (this.ObservationFocus != null)
                    this.ObservationFocus("ToDate", "Lorenzo", "Please select/ enter the date range", true);
                return false;
            }
            else if (this.FromDate.Date > CommonBB.GetServerDateTime().Date) {
                if (this.ObservationFocus != null)
                    this.ObservationFocus("FromDate", "Lorenzo", "Selected date cannot be futuredate", true);
                return false;
            }
            else if (this.ToDate.Date > CommonBB.GetServerDateTime().Date) {
                if (this.ObservationFocus != null)
                    this.ObservationFocus("ToDate", "Lorenzo", "Selected date cannot be futuredate", true);
                return false;
            }
            else if (this.ToDate < this.FromDate) {
                if (this.ObservationFocus != null)
                    this.ObservationFocus("ToDate", "Lorenzo", "To date cannot be earlier than the from date", true);
                return false;
            }
            let timeSpan: TimeSpan = this.ToDate.Diff(this.FromDate);
            //let timeSpan: TimeSpan = this.ToDate - this.FromDate;
            if (timeSpan.Days > 30) {
                if (this.ObservationFocus != null)
                    this.ObservationFocus("ToDate", "Lorenzo", "The specified from and to date range cannot be greater than 30 days.", true);
                return false;
            }
            return true;
        }
        private AssignDataItemCodes(): void {
            this.MainMenu = new ObservableCollection<MenuItem>();
            let fileSubObsItems: ObservableCollection<MenuItem> = new ObservableCollection<MenuItem>();
            let fileSubResItems: ObservableCollection<MenuItem> = new ObservableCollection<MenuItem>();
            if ((this.dataItemCodes != null && this.dataItemCodes.Length > 0) || (this.RdataItemCodes != null && this.RdataItemCodes.Length > 0) || (this.RequestItemCodes != null && this.RequestItemCodes.Length > 0)) {
                let menuItem: MenuItem = new MenuItem();
                if (this.dataItemCodes != null && this.dataItemCodes.Length > 0) {
                    let sTempCodes: string = this.dataItemCodes.ToString();
                    this.dataItemCodes.Clear();
                    if (!String.IsNullOrEmpty(sTempCodes) && sTempCodes.Contains('^')) {
                        let sTemp: string[] = sTempCodes.Split('^');
                        for (let i: number = 0; i < sTemp.Count(); i++) {
                            let sTemp1: string[] = sTemp[i].Split('~');
                            if (i == 0) {
                                this.dataItemCodes.Append(sTemp1[0]);
                                menuItem = ObjectHelper.CreateObject(new MenuItem(), {
                                    Name: sTemp1[0],
                                    DisplayName: sTemp1[1],
                                    Version: Convert.ToInt64(sTemp1[2]),
                                    Code: Convert.ToInt64(sTemp1[3]),
                                    Type: sTemp1[4]
                                });
                                fileSubObsItems.Add(menuItem);
                            }
                            else {
                                this.dataItemCodes.Append(",");
                                this.dataItemCodes.Append(sTemp1[0]);
                                menuItem = ObjectHelper.CreateObject(new MenuItem(), {
                                    Name: sTemp1[0],
                                    DisplayName: sTemp1[1],
                                    Version: Convert.ToInt64(sTemp1[2]),
                                    Code: Convert.ToInt64(sTemp1[3]),
                                    Type: sTemp1[4]
                                });
                                fileSubObsItems.Add(menuItem);
                            }
                        }
                    }
                    else {
                        let sTemp: string[] = sTempCodes.Split('~');
                        this.dataItemCodes.Append(sTemp[0]);
                        menuItem = ObjectHelper.CreateObject(new MenuItem(), {
                            Name: sTemp[0],
                            DisplayName: sTemp[1],
                            Version: Convert.ToInt64(sTemp[2]),
                            Code: Convert.ToInt64(sTemp[3]),
                            Type: sTemp[4]
                        });
                        fileSubObsItems.Add(menuItem);
                    }
                }
                if (this.RdataItemCodes != null && this.RdataItemCodes.Length > 0) {
                    let sTempCodes: string = this.RdataItemCodes.ToString();
                    this.RdataItemCodes.Clear();
                    if (!String.IsNullOrEmpty(sTempCodes) && sTempCodes.Contains('^')) {
                        let sTemp: string[] = sTempCodes.Split('^');
                        for (let i: number = 0; i < sTemp.Count(); i++) {
                            let sTemp1: string[] = sTemp[i].Split('~');
                            if (i == 0) {
                                this.RdataItemCodes.Append(sTemp1[0]);
                            }
                            else {
                                this.RdataItemCodes.Append(",");
                                this.RdataItemCodes.Append(sTemp1[0]);
                            }
                        }
                    }
                    else {
                        let sTemp: string[] = sTempCodes.Split('~');
                        this.RdataItemCodes.Append(sTemp[0]);
                    }
                }
                if (this.RequestItemCodes != null && this.RequestItemCodes.Length > 0) {
                    let sTempCodes: string = this.RequestItemCodes.ToString();
                    this.RequestItemCodes.Clear();
                    if (!String.IsNullOrEmpty(sTempCodes) && sTempCodes.Contains('^')) {
                        let sTemp: string[] = sTempCodes.Split('^');
                        for (let i: number = 0; i < sTemp.Count(); i++) {
                            let sTemp1: string[] = sTemp[i].Split('~');
                            if (i == 0) {
                                this.RequestItemCodes.Append(sTemp1[0]);
                                menuItem = ObjectHelper.CreateObject(new MenuItem(), {
                                    Name: sTemp1[0],
                                    DisplayName: sTemp1[1],
                                    Version: Convert.ToInt64(sTemp1[2]),
                                    Code: Convert.ToInt64(sTemp1[3]),
                                    Type: sTemp1[4]
                                });
                                fileSubResItems.Add(menuItem);
                            }
                            else {
                                this.RequestItemCodes.Append(",");
                                this.dataItemCodes.Append(sTemp1[0]);
                                menuItem = ObjectHelper.CreateObject(new MenuItem(), {
                                    Name: sTemp1[0],
                                    DisplayName: sTemp1[1],
                                    Version: Convert.ToInt64(sTemp1[2]),
                                    Code: Convert.ToInt64(sTemp1[3]),
                                    Type: sTemp1[4]
                                });
                                fileSubResItems.Add(menuItem);
                            }
                        }
                    }
                    else {
                        let sTemp: string[] = sTempCodes.Split('~');
                        this.RequestItemCodes.Append(sTemp[0]);
                        menuItem = ObjectHelper.CreateObject(new MenuItem(), {
                            Name: sTemp[0],
                            DisplayName: sTemp[1],
                            Version: Convert.ToInt64(sTemp[2]),
                            Code: Convert.ToInt64(sTemp[3]),
                            Type: sTemp[4]
                        });
                        fileSubResItems.Add(menuItem);
                    }
                }
                if (this.RequestItemCodes.Length > 0) {
                    menuItem = ObjectHelper.CreateObject(new MenuItem(), {
                        Name: "All",
                        DisplayName: "All",
                        Version: 0,
                        Code: 0,
                        Type: "Request"
                    });
                    fileSubResItems.Add(menuItem);
                }
            }
            if (fileSubObsItems.Count > 0) {
                let ObservationItem: MenuItem = ObjectHelper.CreateObject(new MenuItem(), {
                    SubItems: fileSubObsItems,
                    DisplayName: "Record observation"
                });
                this.MainMenu.Add(ObservationItem);
            }
            if (fileSubResItems.Count > 0) {
                let ResulsItems: MenuItem = ObjectHelper.CreateObject(new MenuItem(), {
                    SubItems: fileSubResItems,
                    DisplayName: "Record results"
                });
                this.MainMenu.Add(ResulsItems);
            }
            ObservationChartVM.CACHANGE = "NONE";
            this.SetDefaultValues();
            if (!UserPermissions.CanViewObservations && UserPermissions.CanViewResults == true) {
                this.dataItemCodes = new StringBuilder();
                this.GetDetails();
            }
            else if (UserPermissions.CanViewObservations && UserPermissions.CanViewResults != true) {
                this.RdataItemCodes = new StringBuilder();
                this.GetDetails();
            }
            else if (UserPermissions.CanViewObservations && UserPermissions.CanViewResults == true)
                this.GetDetails();
        }
        private GetDataItemCodes(): void {
            if (!(PatientContext.PrescriptionMCitemlist == "undefined" || PatientContext.PrescriptionMCitemlist == null ) || (PatientContext.PrescriptionItemOID > 0)) {
                let oReq: CReqMsgGetDataItem = new CReqMsgGetDataItem();
                oReq.oContextInformation = Common.FillContext();
                oReq.IdentifyingOIDBC = PatientContext.PrescriptionIdentifyingOID;
                oReq.IdentifyingTypeBC = PatientContext.PrescriptionIdentyType;
                oReq.MCVersionNoBC = PatientContext.PrescriptionMCVersionNo;
                oReq.itemlistBC = (PatientContext.PrescriptionMCitemlist == 'undefined' || PatientContext.PrescriptionMCitemlist == null) ? '' : PatientContext.PrescriptionMCitemlist;
                oReq.PrescriptionitemoidBC = PatientContext.PrescriptionItemOID;
                oReq.IsRequestRequiredBC = true;
                let serviceProxy: IPPMAPrescribableDefnWSSoapClient = new IPPMAPrescribableDefnWSSoapClient();
                serviceProxy.GetDataItemCompleted  = (s,e) => { this.serviceProxy_GetDataItemCompleted(s,e); } ;
                serviceProxy.GetDataItemAsync(oReq);
            }
            else {
                if (PatientContext.PrescriptionIdentifyingOID > 0) {
                    let oReq: CReqMsgGetDataItem = new CReqMsgGetDataItem();
                    oReq.oContextInformation = Common.FillContext();
                    oReq.IdentifyingOIDBC = PatientContext.PrescriptionIdentifyingOID;
                    oReq.IdentifyingTypeBC = PatientContext.PrescriptionIdentyType;
                    oReq.MCVersionNoBC = PatientContext.PrescriptionMCVersionNo;
                    oReq.IsRequestRequiredBC = true;
                    let serviceProxy: IPPMAPrescribableDefnWSSoapClient = new IPPMAPrescribableDefnWSSoapClient();
                    serviceProxy.GetDataItemCompleted  = (s,e) => { this.serviceProxy_GetDataItemCompleted(s,e); } ;
                    serviceProxy.GetDataItemAsync(oReq);
                }
            }
        }
        private GetAdministrationHistory(): void {
            let oServiceProxy: MedicationAdministrationWSSoapClient = new MedicationAdministrationWSSoapClient();
            oServiceProxy.GetAdminListForObservationChartCompleted  = (s,e) => { this.oServiceProxy_GetAdminListForObservationChart(s,e); } ;
            let objReqAdministration: CReqMsgGetAdminListForObservationChart = new CReqMsgGetAdminListForObservationChart();
            objReqAdministration.PrescriptionItemOIDBC = PatientContext.PrescriptionItemOID;
            objReqAdministration.oContextInformation = CommonBB.FillContext();
            oServiceProxy.GetAdminListForObservationChartAsync(objReqAdministration);
        }
        private GetObservationDetails(): void {
            let FormTemplateWS: MedicationAdministrationWSSoapClient = new MedicationAdministrationWSSoapClient();
            let objReq: CReqMsgGetLatestObservation = new CReqMsgGetLatestObservation();
            objReq.oContextInformation = CommonBB.FillContext();
            objReq.oContextInformation.PatientID = Convert.ToString(PatientContext.PatientOID);
            objReq.infoBC = new EPRDataitemReadParameterInfo();
            objReq.infoBC.Count = 0;
            objReq.infoBC.DataitemCode = this.dataItemCodes != null ? this.dataItemCodes.ToString() : String.Empty;
            objReq.infoBC.ParentDICode = null;
            objReq.infoBC.ObservationStatus = "CC_FINALISED,CC_STRUCKOUT";
            objReq.infoBC.SourceType = 0;
            //Below line of code is added since sometimes the value of fromdate and todate is null and the chart does not load on the pageload
            if(!this.FromDate || !this.ToDate){
                this.FromDate = CommonBB.GetServerDateTime().DateTime.AddDays(-6);
                this.ToDate = CommonBB.GetServerDateTime().Date;
                this.ToDate = this.ToDate.DateTime.AddHours(23).AddMinutes(59).AddSeconds(59);
            }
            objReq.infoBC.FromDate = this.FromDate;
            objReq.infoBC.ToDate = this.ToDate;
            //console.log("checking if from and to dates are fine" + this.FromDate + "  --  " + this.ToDate)
            objReq.PatientOIDBC = PatientContext.PatientOID;
            FormTemplateWS.GetLatestObservationCompleted  = (s,e) => { this.FormTemplateWS_GetLatestObservationCompleted(s,e); } ;
            FormTemplateWS.GetLatestObservationAsync(objReq);
        }
        FormTemplateWS_GetLatestObservationCompleted(sender: Object, e: GetLatestObservationCompletedEventArgs): void {
            if (e.Result != null && e.Result.oRecordedObservations != null) {
                /* let ObservationDataseries = from ObservationDet in e.Result.oRecordedObservations
                group ObservationDet by ObservationDet.Name into SingleSeries
                orderby SingleSeries.Key descending
                select SingleSeries;  */ 
                let ObservationDataseries = e.Result.oRecordedObservations.GroupBy((g) => g.Name).OrderBy(o => o.key).Select(oSingleSeries => oSingleSeries);  
                ObservationDataseries.forEach( (SingleSeries)=> {
                    /* let Dataseries = from oSingleSeries in SingleSeries
                    orderby oSingleSeries.Observedon
                    select oSingleSeries; */
                    let Dataseries = SingleSeries.OrderBy(o => o.ObservedOn).Select(oSingleSeries => oSingleSeries);
                    if (Dataseries != null && Dataseries.Count() > 0) {
                        if (Dataseries.ElementAt(0) != null && Dataseries.ElementAt(0).PatientObservation != null && Dataseries.ElementAt(0).PatientObservation.Count == 1 && String.Compare(Dataseries.ElementAt(0).PatientObservation[0].DataType, "Composite") == 0) {
                            let oAllchild_DataPoints: List<ObservationValue> = new List<ObservationValue>();
                            let oAllChild_ObservedOn: List<DateTime> = new List<DateTime>();
                            let oDatapointDetails: List<DatapointDetails> = new List<DatapointDetails>();
                            Dataseries.forEach( (Composite_DataPoints)=> {
                                if (Composite_DataPoints != null && Composite_DataPoints.PatientObservation[0] != null && Composite_DataPoints.PatientObservation[0].ChildObservationValue != null && Composite_DataPoints.PatientObservation[0].ChildObservationValue.Count > 0) {
                                    if (!oAllChild_ObservedOn.Contains(Composite_DataPoints.Observedon)) {
                                        let oSDatapnts: DatapointDetails = new DatapointDetails();
                                        oSDatapnts.Observedon = Composite_DataPoints.Observedon;
                                        if (String.Compare(AppContextInfo.UserOID, Composite_DataPoints.RecorderUserOID.ToString(), StringComparison.InvariantCultureIgnoreCase) == 0 && Composite_DataPoints.PatientObservation[0].IsDynamicForm)
                                            oSDatapnts.IsModify = true;
                                        oSDatapnts.FormOID = Composite_DataPoints.PatientObservation[0].FormOID;
                                        oSDatapnts.ObserverName = Composite_DataPoints.ObserverName;
                                        oSDatapnts.Status = Composite_DataPoints.OBSTSCode;
                                        oSDatapnts.ParentItemName = Composite_DataPoints.PatientObservation[0].Name;
                                        if (!String.IsNullOrEmpty(Composite_DataPoints.EncounterOID))
                                            oSDatapnts.EncounterOID = Convert.ToInt64(Composite_DataPoints.EncounterOID);
                                        if (!String.IsNullOrEmpty(Composite_DataPoints.PatientOID))
                                            oSDatapnts.PatientOID = Convert.ToInt64(Composite_DataPoints.PatientOID);
                                        oSDatapnts.ObservationValueName = Composite_DataPoints.PatientObservation[0].ObservationValueName;
                                        oDatapointDetails.Add(oSDatapnts);
                                        oAllChild_ObservedOn.Add(Composite_DataPoints.Observedon);
                                    }
                                    oAllchild_DataPoints.AddRange(Composite_DataPoints.PatientObservation[0].ChildObservationValue);
                                }
                            });
                            /* let oAllChildSeries_AllType: IEnumerable<List<ObservationValue>> = from oNDataPoints in oAllchild_DataPoints
                            group oNDataPoints by new
                                {
                                    ObservationName = oNDataPoints.Name,
                                    Datatype = oNDataPoints.DataType
                                } into SingleNameComposite
                            select SingleNameComposite.ToList();  */ 
                            let oAllChildSeries_AllType: IEnumerable<List<ObservationValue>> = oAllchild_DataPoints.GroupBy(oNDataPoints => oNDataPoints.Name).GroupBy(oNDataPoints => oNDataPoints.DataType).Select(oNDataPoints => oNDataPoints);
                            
                            let IsUniqueUOM: boolean = true;
                            let UniqueUOM: string = String.Empty;
                            let IsUomAssigned: boolean = false;
                            let CompositeChildseries: ObservableCollection<DataSeries> = new ObservableCollection<DataSeries>();
                            oAllChildSeries_AllType.forEach( (SingleChildseries)=> {
                                let tbChildseries: TabViewData = new TabViewData();
                                tbChildseries.DisplayOrder = 1;
                                let tbChildPointsRow: ObservableCollection<obscol> = new ObservableCollection<obscol>();
                                let oSingleChildDataPoints: ObservableCollection<DataPoints> = new ObservableCollection<DataPoints>();
                                SingleChildseries.forEach( (SingleChildPoint)=> {
                                    let sComToolTip: string = String.Empty;
                                    let sComUom: string = String.Empty;
                                    let sComObsType: string = String.Empty;
                                    let sComValue: string = String.Empty;
                                    /* let BasicDataseriesInfo = from oDdetails in oDatapointDetails
                                    where oDdetails.Observedon == SingleChildPoint.ObservedOn
                                    select oDdetails; */
                                    let BasicDataseriesInfo = oDatapointDetails.Where(oDdetails => oDdetails.Observedon == SingleChildPoint.ObservedOn).Select(oDdetails => oDdetails);
                                    if (SingleChildPoint.DataType == "Number") {
                                        sComObsType = "Numeric";
                                        sComValue = ((!String.IsNullOrEmpty(SingleChildPoint.BaseValue)) ? (SingleChildPoint.BaseValue) : (!String.IsNullOrEmpty(SingleChildPoint.Value) ? (SingleChildPoint.Value) : String.Empty));
                                        if (!String.IsNullOrEmpty(sComValue)) {
                                            sComToolTip = sComValue;
                                            sComUom = (!String.IsNullOrEmpty(SingleChildPoint.BaseUOMName) ? (SingleChildPoint.BaseUOMName) : (!String.IsNullOrEmpty(SingleChildPoint.UOMName) ? (SingleChildPoint.UOMName) : String.Empty));
                                            if (!String.IsNullOrEmpty(sComUom))
                                                sComToolTip += " " + sComUom;
                                        }
                                        if (IsUniqueUOM) {
                                            if (!IsUomAssigned) {
                                                UniqueUOM = sComUom;
                                                IsUomAssigned = true;
                                            }
                                            else if (String.Compare(UniqueUOM, sComUom) != 0) {
                                                IsUniqueUOM = false;
                                                oSingleChildDataPoints.Clear();
                                                CompositeChildseries.Clear();
                                            }
                                        }
                                        if (IsUniqueUOM && String.Compare(BasicDataseriesInfo.ElementAt(0).Status, "CC_STRUCKOUT", StringComparison.InvariantCultureIgnoreCase) != 0) {
                                            let oSngleHorizontalDPnts: DataPoints = new DataPoints();
                                            oSngleHorizontalDPnts.FormOID = BasicDataseriesInfo.ElementAt(0).FormOID;
                                            if (BasicDataseriesInfo.ElementAt(0).IsModify) {
                                                if (UserPermissions.CanCancelObservations)
                                                    oSngleHorizontalDPnts.CancelObserRights = true;
                                                if (UserPermissions.CanModifyObservations)
                                                    oSngleHorizontalDPnts.ModifyObserRights = true;
                                            }
                                            oSngleHorizontalDPnts.RecorderDTTM = BasicDataseriesInfo.ElementAt(0).Observedon;
                                            oSngleHorizontalDPnts.sTooltipText = this.Format_ObsTooltipForComposite(SingleChildPoint.Name, BasicDataseriesInfo.ElementAt(0), sComToolTip).ToString();
                                            oSngleHorizontalDPnts.Type = "Observation";
                                            if (!String.IsNullOrEmpty(sComValue))
                                                oSngleHorizontalDPnts.Value = Convert.ToDouble(sComValue);
                                            oSngleHorizontalDPnts.Low = Convert.ToDouble(0);
                                            oSngleHorizontalDPnts.High = Convert.ToDouble(0);
                                            oSngleHorizontalDPnts.ValueUOMText = sComUom;
                                            oSngleHorizontalDPnts.RecordedUserName = BasicDataseriesInfo.ElementAt(0).ObserverName;
                                            oSngleHorizontalDPnts.ObsName = BasicDataseriesInfo.ElementAt(0).ObservationValueName;
                                            oSngleHorizontalDPnts.Name = BasicDataseriesInfo.ElementAt(0).ParentItemName;
                                            if (BasicDataseriesInfo.ElementAt(0).PatientOID > 0)
                                                oSngleHorizontalDPnts.PatientOID = BasicDataseriesInfo.ElementAt(0).PatientOID;
                                            if (BasicDataseriesInfo.ElementAt(0).EncounterOID > 0)
                                                oSngleHorizontalDPnts.EncounterOID = BasicDataseriesInfo.ElementAt(0).EncounterOID;
                                            oSingleChildDataPoints.Add(oSngleHorizontalDPnts);
                                        }
                                    }
                                    else {
                                        sComObsType = "Text";
                                        sComToolTip = Resource.ObservationChartResource.ObservationTooltip;
                                        sComValue = SingleChildPoint.Value;
                                    }
                                    let bComIscancel: boolean = false;
                                    if (BasicDataseriesInfo && BasicDataseriesInfo.Count()>0 && BasicDataseriesInfo?.ElementAt(0) && !String.IsNullOrEmpty(BasicDataseriesInfo?.ElementAt(0)?.Status) && String.Compare(BasicDataseriesInfo?.ElementAt(0)?.Status, "CC_STRUCKOUT", StringComparison.InvariantCultureIgnoreCase) == 0)
                                        bComIscancel = true;
                                    let tbdPointCol: obscol = new obscol();
                                    tbdPointCol.RecDTTM = SingleChildPoint.ObservedOn;
                                    if(BasicDataseriesInfo.Count()>0){//added this condition since BasicDataseriesInfo.ElementAt(0) is null and undefined value gets added
                                        tbdPointCol.DataPointsCol = new Datapoints(sComValue, "Observation", sComUom, sComObsType, sComToolTip, String.Empty, String.Empty, 0, bComIscancel, String.Empty, BasicDataseriesInfo.ElementAt(0).ParentItemName + "-" + SingleChildPoint.Name);
                                        tbChildPointsRow.Add(tbdPointCol);
                                    }
                                    
                                });
                                if (oSingleChildDataPoints.Count > 0) {
                                    let oSHorChildseries: DataSeries = new DataSeries();
                                    oSHorChildseries.Name = oSingleChildDataPoints[0].Name;
                                    oSHorChildseries.Displayname = oSingleChildDataPoints[0].Name;
                                    oSHorChildseries.Type = "Composite";
                                    oSHorChildseries.oDataPoints = oSingleChildDataPoints;
                                    if (!String.IsNullOrEmpty(oSingleChildDataPoints[0].ValueUOMText)) {
                                        oSHorChildseries.BaseUOM = oSingleChildDataPoints[0].ValueUOMText;
                                        oSHorChildseries.Displayname += " (" + oSingleChildDataPoints[0].ValueUOMText + ")";
                                    }
                                    CompositeChildseries.Add(oSHorChildseries);
                                    this.IsEnableDataPoint = this.IsEnableGridLine = true;
                                }
                                if (tbChildPointsRow.Count > 0) {
                                    tbChildseries.ObsDataPoints = tbChildPointsRow;
                                    tbChildseries.DataPointName = tbChildPointsRow[0].DataPointsCol.ResultName;
                                    this.DynTabularviewData.Add(tbChildseries);
                                }
                            });
                            let GraphChildseriescnt: number = CompositeChildseries.Count;
                            if (IsUniqueUOM && CompositeChildseries.Count > 1) {
                                let ObComDataSeries: ObservableCollection<DataSeries> = new ObservableCollection<DataSeries>();
                                /* let oAllChildSeries_intType: IEnumerable<List<ObservationValue>> = from oIntDataPoints in oAllchild_DataPoints
                                where oIntDataPoints.DataType == "Number"
                                group oIntDataPoints by new
                                    {
                                        ObservationName = oIntDataPoints.Name
                                    } into SingleIntchildSeries
                                select SingleIntchildSeries.ToList(); */ 
                                let oAllChildSeries_intType: IEnumerable<List<ObservationValue>> = oAllchild_DataPoints.Where(oIntDataPoints =>  oIntDataPoints.DataType == "Number").GroupBy(oIntDataPoints => {return {ObservationName: oIntDataPoints.Name}});
                                for (let nComCnt: number = 0; nComCnt < GraphChildseriescnt - 1; nComCnt++) {
                                    let OHigh_LowDataPoints: ObservableCollection<DataPoints> = new ObservableCollection<DataPoints>();
                                    oAllChild_ObservedOn.forEach( (Datapoint_ObservedOn)=> {
                                        let sHighValue: string = String.Empty;
                                        let sLowValue: string = String.Empty;
                                        let sComUom: string = String.Empty;
                                        let HVSingleChildseries = oAllChildSeries_intType.ElementAt(nComCnt);
                                        /* let HVSingleDatapoints = from oCHDataPoints in HVSingleChildseries
                                        where oCHDataPoints.ObservedOn == Datapoint_ObservedOn
                                        select oCHDataPoints; */
                                        let HVSingleDatapoints = HVSingleChildseries.Where(oCHDataPoints =>oCHDataPoints.ObservedOn==Datapoint_ObservedOn).Select(oCHDataPoints => oCHDataPoints);
                                        let LVSingleChildseries = oAllChildSeries_intType.ElementAt(nComCnt + 1);
                                        /* let LVSingleDatapoints = from oCLDataPoints in LVSingleChildseries
                                        where oCLDataPoints.ObservedOn == Datapoint_ObservedOn
                                        select oCLDataPoints; */
                                        let LVSingleDatapoints = LVSingleChildseries.Where(oCLDataPoints =>oCLDataPoints.ObservedOn==Datapoint_ObservedOn).Select(oCLDataPoints => oCLDataPoints);
                                        HVSingleDatapoints.forEach( (HDatapoint)=> {
                                            sHighValue = ((!String.IsNullOrEmpty(HDatapoint.BaseValue)) ? (HDatapoint.BaseValue) : (!String.IsNullOrEmpty(HDatapoint.Value) ? (HDatapoint.Value) : String.Empty));
                                        });
                                        LVSingleDatapoints.forEach( (LDatapoint)=> {
                                            sLowValue = ((!String.IsNullOrEmpty(LDatapoint.BaseValue)) ? (LDatapoint.BaseValue) : (!String.IsNullOrEmpty(LDatapoint.Value) ? (LDatapoint.Value) : String.Empty));
                                        });
                                        if (!String.IsNullOrEmpty(sHighValue) && !String.IsNullOrEmpty(sLowValue)) {
                                            let oHigh_LowPnt: DataPoints = new DataPoints();
                                            oHigh_LowPnt.Low = Convert.ToDouble(sLowValue);
                                            oHigh_LowPnt.High = Convert.ToDouble(sHighValue);
                                            oHigh_LowPnt.RecorderDTTM = Datapoint_ObservedOn;
                                            oHigh_LowPnt.Type = "Composite";
                                            oHigh_LowPnt.ObsName = Dataseries.ElementAt(0).PatientObservation[0].ObservationValueName;
                                            oHigh_LowPnt.Name = Dataseries.ElementAt(0).PatientObservation[0].Name;
                                            OHigh_LowDataPoints.Add(oHigh_LowPnt);
                                        }
                                    });
                                    if (OHigh_LowDataPoints.Count > 0) {
                                        let oHigh_LowSeries: DataSeries = new DataSeries();
                                        oHigh_LowSeries.Name = Dataseries.ElementAt(0).PatientObservation[0].Name;
                                        oHigh_LowSeries.Displayname = OHigh_LowDataPoints[0].Name;
                                        oHigh_LowSeries.Type = "Composite";
                                        oHigh_LowSeries.oDataPoints = OHigh_LowDataPoints;
                                        if (!String.IsNullOrEmpty(UniqueUOM)) {
                                            oHigh_LowSeries.BaseUOM = UniqueUOM;
                                            oHigh_LowSeries.Displayname += " (" + UniqueUOM + ")";
                                        }
                                        ObComDataSeries.Add(oHigh_LowSeries);
                                    }
                                }
                                if (ObComDataSeries.Count > 0) {
                                    ObComDataSeries.forEach( (comseries)=> {
                                        this.objGraphType.GraphData.Add(comseries);
                                    });
                                }
                            }
                            if (CompositeChildseries.Count > 0) {
                                CompositeChildseries.forEach( (comseries)=> {
                                    this.objGraphType.GraphData.Add(comseries);
                                });
                            }
                        }
                        else {
                            let tbViewData: TabViewData = new TabViewData();
                            tbViewData.DisplayOrder = 1;
                            let datPointsCol: ObservableCollection<obscol> = new ObservableCollection<obscol>();
                            let ObDataPoints: ObservableCollection<DataPoints> = new ObservableCollection<DataPoints>();
                            Dataseries.forEach( (dataPoints)=> {
                                if (dataPoints.PatientObservation != null && dataPoints.PatientObservation.Count == 1 && (String.Compare(dataPoints.PatientObservation[0].DataType, "Composite") != 0)) {
                                    let dpDttmCol: obscol = new obscol();
                                    let sToolTip: string = String.Empty;
                                    let Uom: string = String.Empty;
                                    let sObsType: string = String.Empty;
                                    let Value: string = String.Empty;
                                    if (dataPoints.PatientObservation[0].DataType == "Number") {
                                        sObsType = "Numeric";
                                        Value = ((!String.IsNullOrEmpty(dataPoints.PatientObservation[0].BaseValue)) ? (dataPoints.PatientObservation[0].BaseValue) : (!String.IsNullOrEmpty(dataPoints.PatientObservation[0].Value) ? (dataPoints.PatientObservation[0].Value) : String.Empty));
                                        if (!String.IsNullOrEmpty(Value)) {
                                            sToolTip = Value;
                                            Uom = (!String.IsNullOrEmpty(dataPoints.PatientObservation[0].BaseUOMName) ? (dataPoints.PatientObservation[0].BaseUOMName) : (!String.IsNullOrEmpty(dataPoints.PatientObservation[0].UOMName) ? (dataPoints.PatientObservation[0].UOMName) : String.Empty));
                                            if (!String.IsNullOrEmpty(Uom))
                                                sToolTip += " " + Uom;
                                        }
                                        if (String.Compare(dataPoints.OBSTSCode, "CC_STRUCKOUT", StringComparison.InvariantCultureIgnoreCase) != 0) {
                                            let oObsDataPoints: DataPoints = new DataPoints();
                                            oObsDataPoints.FormOID = dataPoints.PatientObservation[0].FormOID;
                                            if (String.Compare(AppContextInfo.UserOID, dataPoints.RecorderUserOID.ToString(), StringComparison.InvariantCultureIgnoreCase) == 0 && dataPoints.PatientObservation[0].IsDynamicForm) {
                                                if (UserPermissions.CanCancelObservations)
                                                    oObsDataPoints.CancelObserRights = true;
                                                if (UserPermissions.CanModifyObservations)
                                                    oObsDataPoints.ModifyObserRights = true;
                                            }
                                            oObsDataPoints.RecorderDTTM = dataPoints.PatientObservation[0].ObservedOn;
                                            oObsDataPoints.sTooltipText = this.Format_ObservationFTooltip(dataPoints, sToolTip).ToString();
                                            oObsDataPoints.Type = "Observation";
                                            if (!String.IsNullOrEmpty(Value))
                                                oObsDataPoints.Value = Convert.ToDouble(Value);
                                            oObsDataPoints.RefRange_LowerLimit = Convert.ToDouble(0);
                                            oObsDataPoints.ValueUOMText = Uom;
                                            oObsDataPoints.RecordedUserName = dataPoints.ObserverName;
                                            oObsDataPoints.ObsName = dataPoints.PatientObservation[0].ObservationValueName;
                                            oObsDataPoints.Name = dataPoints.PatientObservation[0].Name;
                                            if (!String.IsNullOrEmpty(dataPoints.PatientOID)) {
                                                oObsDataPoints.PatientOID = Convert.ToInt64(dataPoints.PatientOID);
                                            }
                                            if (!String.IsNullOrEmpty(dataPoints.EncounterOID)) {
                                                oObsDataPoints.EncounterOID = Convert.ToInt64(dataPoints.EncounterOID);
                                            }
                                            ObDataPoints.Add(oObsDataPoints);
                                        }
                                    }
                                    else {
                                        sObsType = "Text";
                                        sToolTip = Resource.ObservationChartResource.ObservationTooltip;
                                        Value = dataPoints.PatientObservation[0].Value;
                                    }
                                    let bIscancel: boolean = false;
                                    if (!String.IsNullOrEmpty(dataPoints.OBSTSCode) && String.Compare(dataPoints.OBSTSCode, "CC_STRUCKOUT", StringComparison.InvariantCultureIgnoreCase) == 0)
                                        bIscancel = true;
                                    dpDttmCol.RecDTTM = dataPoints.Observedon;
                                    dpDttmCol.DataPointsCol = new Datapoints(Value, "Observation", Uom, sObsType, sToolTip, String.Empty, String.Empty, 0, bIscancel, String.Empty, dataPoints.PatientObservation[0].Name);
                                    datPointsCol.Add(dpDttmCol);
                                }
                            });
                            tbViewData.ObsDataPoints = datPointsCol;
                            if (datPointsCol.Count > 0) {
                                tbViewData.DataPointName = datPointsCol[0].DataPointsCol.ResultName;
                                this.IsEnableDisplaycancelledvalue = true;
                                this.DynTabularviewData.Add(tbViewData);
                            }
                            if (ObDataPoints.Count > 0) {
                                let objMainGraph: DataSeries = new DataSeries();
                                objMainGraph.Name = ObDataPoints[0].Name;
                                objMainGraph.Displayname = ObDataPoints[0].Name;
                                objMainGraph.High = Convert.ToDouble(ObDataPoints.Max(y => y.Value));
                                objMainGraph.Low = Convert.ToDouble(ObDataPoints.Min(y => y.Value));
                                objMainGraph.Type = "Observation";
                                objMainGraph.oDataPoints = ObDataPoints;
                                if (!String.IsNullOrEmpty(ObDataPoints[0].ValueUOMText)) {
                                    objMainGraph.BaseUOM = ObDataPoints[0].ValueUOMText;
                                    objMainGraph.Displayname += " (" + ObDataPoints[0].ValueUOMText + ")";
                                }
                                objMainGraph.Id = ObDataPoints[0].ObsName;
                                this.objGraphType.GraphData.Add(objMainGraph);
                                this.IsEnableDataPoint = this.IsEnableGridLine = true;
                            }
                        }
                    }
                });
            }
            //Below line of code is added since sometimes the value of fromdate and todate is null and the chart does not load on the pageload
            if(!this.FromDate || !this.ToDate){
                this.FromDate = CommonBB.GetServerDateTime().DateTime.AddDays(-6);
                this.ToDate = CommonBB.GetServerDateTime().Date;
                this.ToDate = this.ToDate.DateTime.AddHours(23).AddMinutes(59).AddSeconds(59);
            }
            if (String.Compare(this.Period, "CC_CUSTOM", StringComparison.InvariantCultureIgnoreCase) == 0) {
                this.ToDate = this.ToDate.DateTime.AddHours(23).AddMinutes(59).AddSeconds(59);
            }
            if (String.Compare(this.Period, "CC_TODAY", StringComparison.InvariantCultureIgnoreCase) == 0 || String.Compare(this.Period, "CC_YESTERDAY", StringComparison.InvariantCultureIgnoreCase) == 0 || String.Compare(this.Period, "CC_24HOURS", StringComparison.InvariantCultureIgnoreCase) == 0) {
                this.ToDate = this.ToDate.DateTime.AddHours(23).AddMinutes(59).AddSeconds(59);
                let difference: TimeSpan = this.ToDate.Diff(this.FromDate)  ;
                this.AssignChart(this.FromDate.ToOADate(), this.ToDate.ToOADate(), ((this.ToDate.ToOADate() - this.FromDate.ToOADate()) / difference.TotalHours) * 3, false, true);
            }
            else {
                let difference: TimeSpan = this.ToDate.Diff(this.FromDate);
                let dStepValue: number = 1;
                if (difference.TotalDays > 15) {
                    dStepValue = 2;
                }
                this.AssignChart(this.FromDate.ToOADate(), this.ToDate.ToOADate(), dStepValue, false, false);
            }
            if (String.Compare(ObservationChartVM.CACHANGE, "NONE") == 0) {
                //if ( this.GenerateTabview != null && this.DynTabularviewData != null) {
                if (this.DynTabularviewData != null) { //this.GenerateTabview != null is always false, so commented
                    this.DynTabularviewData = new ObservableCollection<TabViewData>(this.DynTabularviewData.OrderBy(x => x.DisplayOrder).ThenBy(x => x.DataPointName));
                    //this.GenerateTabview(); //this.GenerateTabview != null is always false, so commented
                }
            }
            else if (String.Compare(ObservationChartVM.CACHANGE, "Observation") == 0)
                ObservationChartVM.CACHANGE = "NONE";

            this.generatekGridDataFromDynTabularviewData();
            this.generatekChartDataFromObjGraphType();
            this.GOButtonEnabled = true;
            BusyIndicator.SetStatusIdle("ObsChartLoad");
        }
        private generatekGridDataFromDynTabularviewData(){
            
            this.kgrid_columns = [];
            this.kgrid_data = [];
            if(this.DynTabularviewData && this.DynTabularviewData.Length > 0){
                this.DynTabularviewData.forEach((tabViewData_element, index) => {
                    if(tabViewData_element && tabViewData_element.ObsDataPoints && tabViewData_element.ObsDataPoints.Length > 0){
                        let tabViewData_kgrid: TabViewData_kgrid = new TabViewData_kgrid();
                        if(tabViewData_element.DataPointName){
                            tabViewData_kgrid.ItemName = tabViewData_element.DataPointName;
                        }else{
                            tabViewData_kgrid.ItemName = ''
                        }
                        tabViewData_kgrid.UOM = tabViewData_element.ObsDataPoints[0].objDataPoints.UOM;
                        tabViewData_element.ObsDataPoints.forEach((ObsDataPoints_element, index) => {
                            if((!ObsDataPoints_element.DataPointsCol.IsCancel || (ObsDataPoints_element.DataPointsCol.IsCancel && this.Displaycancelledvalue)) && ObsDataPoints_element.RecDTTM && ObsDataPoints_element.RecDTTM != undefined && ObsDataPoints_element.DataPointsCol){
                                let newGridCol: ColumnSetting_kgrid = new ColumnSetting_kgrid();
                                newGridCol.field = "YY_"+ObsDataPoints_element.RecDTTM.Year+"MM_"+ObsDataPoints_element.RecDTTM.Month+"DD_"+ObsDataPoints_element.RecDTTM.Day+"hh_"+ObsDataPoints_element.RecDTTM.Hour + "mm_"+ObsDataPoints_element.RecDTTM.Minute;
                                newGridCol.title = ObsDataPoints_element.RecDTTM.ToString("dd-MMM-yyyy HH:mm");
                                newGridCol.type = "text";
                                newGridCol.dateVal = ObsDataPoints_element.RecDTTM;
                                this.kgrid_columns.push(newGridCol);
                                tabViewData_kgrid[newGridCol.field] = ObsDataPoints_element.DataPointsCol;
                            }
                        })
                        this.kgrid_data.push(tabViewData_kgrid);


                    }
                    
                });
                if(this.kgrid_columns.length>0){
                    this.kgrid_columns = _.uniqBy(this.kgrid_columns, (item => { return item.field }));
                    this.kgrid_columns = _.orderBy(this.kgrid_columns, item =>  item.dateVal, 'desc');
                }
            }
            if(this.kgrid_columns.length==0){
                this.kgrid_columns.push(
                    {
                        field: "$$EMPTY__COL$$",
                        title: "",
                        type: "text",
                    },
                )

            }
            this.kgrid_columns.unshift(
                {
                    field: "ItemName",
                    title: "Item Name",
                    type: "text",
                },
                {
                    field: "StatusDetails",
                    title: "Status details",
                    type: "text",
                },
                {
                    field: "UOM",
                    title: "UOM",
                    type: "text",
                }
            )
        }
        private generatekChartDataFromObjGraphType(){
            this.kchart_data_obs = [];
            this.kchart_series_obs = [];
            this.kchart_fromDate = this.FromDate;
            this.kchart_toDate= this.ToDate;
            this.kchart_xaxis.baseUnit = 'days';
            if(this.ToDate.Diff(this.FromDate).Days<=1){
                this.kchart_xaxis.baseUnit = 'hours';
            }
            if(this.objGraphType && this.objGraphType.GraphData && this.objGraphType.GraphData.Length > 0){
                this.objGraphType.GraphData.forEach((dataSeries_elem, index) => {
                    if(dataSeries_elem && dataSeries_elem.Type){
                        if(dataSeries_elem.Type == "Admin"){
                            this.kchart_series_admin = {
                                name: dataSeries_elem.Displayname,
                                axis: dataSeries_elem.Name,
                                data: [],
                                xField: "Timestamp",
                                yField: "admin",
                                yAxis: "admin",
                                type: "line",
                                color: "#A7D129",
                            };

                            if(dataSeries_elem.oDataPoints && dataSeries_elem.oDataPoints.Length > 0){
                                dataSeries_elem.oDataPoints.forEach((dataPoint_element, index_dp) => {
                                    let kchart_dataItem: any = {};
                                    kchart_dataItem.Timestamp = new Date(dataPoint_element.RecorderDTTM.toISOString());
                                    kchart_dataItem.admin = dataPoint_element.Value;
                                    kchart_dataItem.type="ADMIN";
                                    //kchart_dataItem.FormOID = dataPoint_element.FormOID;
                                    //kchart_dataItem.ObsName = dataPoint_element.ObsName
                                    kchart_dataItem.RecordedUserName = dataPoint_element.RecordedUserName;
                                    //kchart_dataItem.Name = dataPoint_element.Name;
                                    //kchart_dataItem.ItemName = dataPoint_element.Name;
                                    kchart_dataItem.ValueUOMText = dataPoint_element.ValueUOMText;
                                    kchart_dataItem.sTooltipText = dataPoint_element.sTooltipText;
                                    //kchart_dataItem.EncounterOID = dataPoint_element.EncounterOID;
                                    //kchart_dataItem.PatientOID = dataPoint_element.PatientOID;
                                    this.kchart_series_admin.data.push(kchart_dataItem);
                                    if(dataPoint_element.Value < this.kchart_min_axis_crossing)
                                        this.kchart_min_axis_crossing = dataPoint_element.Value;
                                    if(dataPoint_element.Value > this.kchart_max_axis_crossing)
                                        this.kchart_max_axis_crossing = dataPoint_element.Value;
                                });
                            }

                        }else{
                            let kSeriesItem: Series = {
                                name: dataSeries_elem.Displayname,
                                axis: dataSeries_elem.Name,
                                data: this.kchart_data_obs,
                                xField: "Timestamp",
                                yField: dataSeries_elem.Id,
                                yAxis: dataSeries_elem.Id,
                                type: 'line',
                                stack: true,
                                visible: true,
                                color: this.kchart_colors[index], //TODOsaras add more colors or check if modulo operator can be used here
                                /* markers: {
                                    type: this.kchart_shapes[index%4]
                                } */
                            };
                           
                            if(dataSeries_elem.oDataPoints && dataSeries_elem.oDataPoints.Length > 0){
                                dataSeries_elem.oDataPoints.forEach((dataPoint_element, index_dp) => {
                                    let kchart_dataItem: any = {};
                                    kchart_dataItem.Timestamp = new Date(dataPoint_element.RecorderDTTM.toISOString());
                                    kchart_dataItem[dataSeries_elem.Id] = dataPoint_element.Value;
                                    kchart_dataItem.FormOID = dataPoint_element.FormOID;
                                    kchart_dataItem.ObsName = dataPoint_element.ObsName
                                    kchart_dataItem.RecordedUserName = dataPoint_element.RecordedUserName;
                                    kchart_dataItem.Name = dataPoint_element.Name;
                                    kchart_dataItem.ItemName = dataPoint_element.Name;
                                    kchart_dataItem.ValueUOMText = dataPoint_element.ValueUOMText;
                                    kchart_dataItem.sTooltipText = dataPoint_element.sTooltipText;
                                    kchart_dataItem.EncounterOID = dataPoint_element.EncounterOID;
                                    kchart_dataItem.PatientOID = dataPoint_element.PatientOID;
                                    kchart_dataItem.ModifyObserRights = dataPoint_element.ModifyObserRights;
                                    kchart_dataItem.CancelObserRights = dataPoint_element.CancelObserRights;
                                    kchart_dataItem.type = 'OBSERVATION'


                                    this.kchart_data_obs.push(kchart_dataItem);
                                    if(dataPoint_element.Value < this.kchart_min_axis_crossing)
                                        this.kchart_min_axis_crossing = dataPoint_element.Value;
                                    if(dataPoint_element.Value > this.kchart_max_axis_crossing)
                                        this.kchart_max_axis_crossing = dataPoint_element.Value;
                                });
                            }
                            if(this.kchart_series_obs.length < 10)
                                this.kchart_series_obs.push(kSeriesItem);
                        }
                        
                    }
                })
                if(this.kchart_series_obs.length>0){
                    //this.kchart_series_obs.OrderBy(item => item.name.length)
                    //_.orderBy(this.kchart_series_obs, item=> item.name.length)
                    this.kchart_series_obs = _.orderBy(this.kchart_series_obs, item =>  item.name.length)

                }
                this.kchart_max_axis_crossing = this.kchart_max_axis_crossing * 2; //because kendo chart adds additional max value in the y axis
            }
            
        }
        private Format_ObsTooltipForComposite(ChildName: string, Observation: DatapointDetails, Value_UOM: string): StringBuilder {
            let sTooltipText: StringBuilder = new StringBuilder();
            if (!String.IsNullOrEmpty(Observation.ParentItemName) && !String.IsNullOrEmpty(ChildName))
                sTooltipText.Append(Observation.ParentItemName + "-" + ChildName + "#");
            if (Observation.Observedon.NotEquals(DateTime.MinValue))
                sTooltipText.Append(Observation.Observedon.ToString("dd-MMM-yyyy HH:mm") + "#");
            if (!String.IsNullOrEmpty(Observation.ObserverName))
                sTooltipText.Append(Observation.ObserverName + "#");
            if (!String.IsNullOrEmpty(Value_UOM))
                sTooltipText.Append(Value_UOM);
            return sTooltipText;
        }
        oServiceProxy_GetAdminListForObservationChart(sender: Object, e: GetAdminListForObservationChartCompletedEventArgs): void {
            this.bIsAdminSameUOM = true;
            this.bIsDiffInfusionUOM = false;
            let sLorenzoID: string = "";
            //Below line of code is added since sometimes the value of fromdate and todate is null and the chart does not load on the pageload
            if(!this.FromDate || !this.ToDate){
                this.FromDate = CommonBB.GetServerDateTime().DateTime.AddDays(-6);
                this.ToDate = CommonBB.GetServerDateTime().Date;
                this.ToDate = this.ToDate.DateTime.AddHours(23).AddMinutes(59).AddSeconds(59);
            }
            if (e.Result != null && e.Result.oSlotDetails != null) {
                if (e.Result.oSlotDetails.Count > 0) {
                    let sFluidName: string = "";
                    let sInfusionType: string = "";
                    let sPrevFluidRateUOM: string = "";
                    let sCurFluidRateUOM: string = "";
                    let lstInfusionAdminDetail: List<InfusionAdminDetail> = new List<InfusionAdminDetail>();
                    let lstAdministrationDetail: List<SlotDetail> = new List<SlotDetail>();
                    let objInfusionAdminDetail: InfusionAdminDetail[] = null;
                    let objAdminDetail: SlotDetail[] = null;
                    e.Result.oSlotDetails.forEach( (objSlotDetail)=> {
                        sLorenzoID = objSlotDetail.LorenzoID;
                        if (objSlotDetail.AdministrationDetail != null) {
                            if ((objSlotDetail.AdministrationDetail.IsInfusion == '0') || (objSlotDetail.AdministrationDetail.IsInfusion == '1' && (objSlotDetail.AdministrationDetail.IsBolus == '1' || objSlotDetail.AdministrationDetail.INFTYCode == InfusionTypeCode.INTERMITTENT))) {
                                lstAdministrationDetail.Add(objSlotDetail);
                            }
                            else if (objSlotDetail.AdministrationDetail.IsInfusion == '1' && objSlotDetail.AdministrationDetail.IsBolus == '0') {
                                objSlotDetail.AdministrationDetail.oInfusionAdminDetail.forEach( (objInfAdminDetail)=> {
                                    sCurFluidRateUOM = objInfAdminDetail.InfusionRateUOM.UOMName + "/" + objInfAdminDetail.InfusionRatePerUOM.UOMName;
                                    if (!String.IsNullOrEmpty(sPrevFluidRateUOM) && (String.Compare(sCurFluidRateUOM, sPrevFluidRateUOM) != 0))
                                        this.bIsDiffInfusionUOM = true;
                                    sPrevFluidRateUOM = sCurFluidRateUOM;
                                    lstInfusionAdminDetail.Add(objInfAdminDetail);
                                });
                                sFluidName = objSlotDetail.AdministrationDetail.FluidName;
                                sInfusionType = objSlotDetail.AdministrationDetail.INFTYCode;
                            }
                            if (lstAdministrationDetail.Count > 0)
                                objAdminDetail = lstAdministrationDetail.ToArray();
                            if (lstInfusionAdminDetail.Count > 0)
                                objInfusionAdminDetail = lstInfusionAdminDetail.ToArray();
                        }
                    });
                    if (objAdminDetail != null) {
                        let nAdminSeriesCount: number = objAdminDetail.Count();
                        if (nAdminSeriesCount > 0) {
                            /* let AdminDataseries = from Admin in objAdminDetail
                            where ToDate.Date >= Admin.AdministrationDetail.AdministeredDate.Date
                                && Admin.AdministrationDetail.AdministeredDate.Date >= FromDate.Date
                                && !String.IsNullOrEmpty(Admin.Dose) && String.Compare(Admin.Dose, "0") != 0
                            orderby Admin.AdministrationDetail.AdministeredDate
                            select Admin; */
                            let AdminDataseries = objAdminDetail.Where((Admin) => this.ToDate?.Date >= Admin.AdministrationDetail.AdministeredDate.Date
                            && Admin.AdministrationDetail.AdministeredDate.Date >= this.FromDate?.Date
                            && !String.IsNullOrEmpty(Admin.Dose) && String.Compare(Admin.Dose, "0") != 0).OrderBy(Admin => Admin.AdministrationDetail.AdministeredDate).Select(admin => admin)
                            let datPointsCol: ObservableCollection<obscol> = new ObservableCollection<obscol>();
                            let ObDataPoints: ObservableCollection<DataPoints> = new ObservableCollection<DataPoints>();
                            let Uom: string = "EMPTY";
                            let previouspointdatetime: DateTime= DateTime.MinValue;
                            AdminDataseries.forEach( (SingleSeries)=> {
                                if (previouspointdatetime != SingleSeries.AdministrationDetail.AdministeredDate) {
                                    let oObsDataPoints: DataPoints = new DataPoints();
                                    let dpDttmCol: obscol = new obscol();
                                    if (this.bIsAdminSameUOM && (String.Compare(Uom, "EMPTY", StringComparison.InvariantCultureIgnoreCase) == 0) || String.Compare(Uom, SingleSeries.DoseUOM, StringComparison.InvariantCultureIgnoreCase) == 0) {
                                        Uom = SingleSeries.DoseUOM;
                                        oObsDataPoints.CancelObserRights = false;
                                        oObsDataPoints.ModifyObserRights = false;
                                        oObsDataPoints.RecorderDTTM = SingleSeries.AdministrationDetail.AdministeredDate;
                                        oObsDataPoints.sTooltipText = this.Format_Admin_Tooltip(SingleSeries).ToString();
                                        previouspointdatetime = SingleSeries.AdministrationDetail.AdministeredDate;
                                        oObsDataPoints.Type = "Admin";
                                        oObsDataPoints.Value = Convert.ToDouble(SingleSeries.Dose);
                                        oObsDataPoints.ValueUOMText = SingleSeries.DoseUOM;
                                        oObsDataPoints.RecordedUserName = SingleSeries.AdministrationDetail.AdministeredBy;
                                        oObsDataPoints.IsFlowRate = false;
                                        oObsDataPoints.INFTYCode = sInfusionType;
                                        ObDataPoints.Add(oObsDataPoints);
                                    }
                                    else if (this.bIsAdminSameUOM) {
                                        ObDataPoints.Clear();
                                        this.bIsAdminSameUOM = false;
                                    }
                                    dpDttmCol.RecDTTM = SingleSeries.AdministrationDetail.AdministeredDate;
                                    dpDttmCol.DataPointsCol = new Datapoints(SingleSeries.Dose, "Admin", SingleSeries.DoseUOM, "Admin", String.Empty, String.Empty, String.Empty, 0, false, String.Empty, String.Empty);
                                    datPointsCol.Add(dpDttmCol);
                                }
                            });
                            let tbViewData: TabViewData = new TabViewData();
                            tbViewData.DataPointName = this.PrescribedItem;
                            let sMCICompNames: StringBuilder = new StringBuilder();
                            let nlength: number = 0;
                            if (String.Equals(this.ItemSubType, CConstants.ItemSubType)) {
                                let sMCIComp: string[] = null;
                                let sMCICompRes: string[] = null;
                                sMCIComp = this.ItemToolTip.Split('^');
                                if (sMCIComp != null) {
                                    nlength = sMCIComp.length;
                                    if (nlength > 0) {
                                        for (let i: number = 0; i < nlength; i++) {
                                            if (sMCIComp[i] != null)
                                                sMCICompRes = sMCIComp[i].Split('~');
                                            if (sMCICompRes != null && sMCICompRes.length == 2 && sMCICompRes[0] != null && sMCICompRes[1] != null) {
                                                sMCICompNames.Append(sMCICompRes[0]);
                                                if (i < nlength - 1)
                                                    sMCICompNames.Append('^');
                                            }
                                        }
                                    }
                                }
                            }
                            else sMCICompNames.Append(this.PrescribedItem);
                            tbViewData.DataPointName = tbViewData.DataPointName.Replace("^", "~");
                            tbViewData.IsFlowrate = false;
                            tbViewData.DisplayOrder = 3;
                            tbViewData.ObsDataPoints = datPointsCol;
                            if (datPointsCol.Count > 0)
                                this.DynTabularviewData.Add(tbViewData);
                            if (ObDataPoints.Count > 0) {
                                let objMainGraph: DataSeries = new DataSeries();
                                if (String.Equals(sLorenzoID, CConstants.ADHOC_ITEM_LORENZOID)) {
                                    if (nlength > 5) {
                                        objMainGraph.Displayname = "Multiple component item";
                                        tbViewData.DataPointName = "Multiple component item";
                                        tbViewData.MCIToolTip = Convert.ToString(sMCICompNames);
                                    }
                                    else {
                                        objMainGraph.Name = Convert.ToString(sMCICompNames);
                                        objMainGraph.Displayname = Convert.ToString(sMCICompNames);
                                        if (objMainGraph.Name.Contains("^")) {
                                            tbViewData.DataPointName = Convert.ToString(sMCICompNames).Replace("^", "\n");
                                            objMainGraph.Name = objMainGraph.Name.Replace("^", "\n");
                                            objMainGraph.Displayname = objMainGraph.Displayname.Replace("^", "\n");
                                            tbViewData.MCIToolTip = Convert.ToString(sMCICompNames);
                                        }
                                    }
                                }
                                else {
                                    objMainGraph.Name = this.PrescribedItem;
                                    objMainGraph.Displayname = this.PrescribedItem;
                                    tbViewData.MCIToolTip = Convert.ToString(sMCICompNames);
                                }
                                objMainGraph.Type = "Admin";
                                objMainGraph.oDataPoints = ObDataPoints;
                                objMainGraph.High = Convert.ToDouble(ObDataPoints.Max(y => y.Value));
                                objMainGraph.Low = Convert.ToDouble(ObDataPoints.Min(y => y.Value));
                                if (!String.IsNullOrEmpty(ObDataPoints[0].ValueUOMText)) {
                                    objMainGraph.BaseUOM = ObDataPoints[0].ValueUOMText;
                                    objMainGraph.Displayname += " (" + ObDataPoints[0].ValueUOMText + ")";
                                }
                                this.IsEnableDataPoint = this.IsEnableGridLine = true;
                                objMainGraph.Id = ObDataPoints[0].ObsName;
                                this.objGraphType.GraphData.Add(objMainGraph);
                            }
                        }
                    }
                    else if (objInfusionAdminDetail != null) {
                        let nInfDataSeriesCount: number = objInfusionAdminDetail.Count();
                        if (nInfDataSeriesCount > 0) {
                            /* let InfusionAdminDataseries = from Admin in objInfusionAdminDetail
                            where(Admin.InfusionAdministeredAt.NotEquals(DateTime.MinValue) && ToDate.Date >= Admin.InfusionAdministeredAt.Date
                                && Admin.InfusionAdministeredAt.Date >= FromDate.Date)
                                && !String.IsNullOrEmpty(Admin.InfusionRate)
                            orderby Admin.InfusionAdministeredAt
                            select Admin;  */
                            let InfusionAdminDataseries = objInfusionAdminDetail.Where((Admin) => Admin.InfusionAdministeredAt.NotEquals(DateTime.MinValue) && this.ToDate.Date >= Admin.InfusionAdministeredAt.Date && Admin.InfusionAdministeredAt.Date >= this.FromDate.Date && !String.IsNullOrEmpty(Admin.InfusionRate))
                            .OrderBy(Admin => Admin.InfusionAdministeredAt).Select(Admin => Admin);
                            let datPointsCol: ObservableCollection<obscol> = new ObservableCollection<obscol>();
                            let ObDataPoints: ObservableCollection<DataPoints> = new ObservableCollection<DataPoints>();
                            let Uom: string = "EMPTY";
                            let previouspointdatetime: DateTime= DateTime.MinValue;
                            InfusionAdminDataseries.forEach( (SingleSeries)=> {
                                if (previouspointdatetime != SingleSeries.InfusionAdministeredAt && (String.Compare(SingleSeries.ActionCode, CConstants.ACTIONBEGUN) == 0 || String.Compare(SingleSeries.ActionCode, CConstants.ACTIONFLOWRATECHANGE) == 0 || String.Compare(SingleSeries.ActionCode, CConstants.ACTIONSTOP) == 0 || String.Compare(SingleSeries.ActionCode, CConstants.ACTIONCOMPLETE) == 0)) {
                                    let dpDttmCol: obscol = new obscol();
                                    if (!this.bIsDiffInfusionUOM) {
                                        let oObsDataPoints: DataPoints = new DataPoints();
                                        Uom = SingleSeries.InfusionRateUOM.UOMName + "/" + SingleSeries.InfusionRatePerUOM.UOMName;
                                        oObsDataPoints.CancelObserRights = false;
                                        oObsDataPoints.ModifyObserRights = false;
                                        oObsDataPoints.RecorderDTTM = SingleSeries.InfusionAdministeredAt;
                                        previouspointdatetime = SingleSeries.InfusionAdministeredAt;
                                        oObsDataPoints.RecordedUserName = SingleSeries.InfusionAdministeredBy;
                                        oObsDataPoints.sTooltipText = Convert.ToString(this.Format_InfusionAdmin_Tooltip(SingleSeries, sFluidName, Uom));
                                        oObsDataPoints.Type = "Admin";
                                        oObsDataPoints.Value = Convert.ToDouble(SingleSeries.InfusionRate);
                                        oObsDataPoints.ValueUOMText = Uom;
                                        oObsDataPoints.IsFlowRate = true;
                                        oObsDataPoints.INFTYCode = sInfusionType;
                                        ObDataPoints.Add(oObsDataPoints);
                                    }
                                    dpDttmCol.RecDTTM = SingleSeries.InfusionAdministeredAt;
                                    dpDttmCol.DataPointsCol = new Datapoints(SingleSeries.InfusionRate, "Admin", Uom, "Admin", String.Empty, String.Empty, String.Empty, 0, false, String.Empty, String.Empty);
                                    datPointsCol.Add(dpDttmCol);
                                }
                            });
                            let tbViewData: TabViewData = new TabViewData();
                            tbViewData.DataPointName = this.PrescribedItem;
                            tbViewData.IsFlowrate = true;
                            tbViewData.FluidName = sFluidName;
                            tbViewData.DisplayOrder = 3;
                            tbViewData.ObsDataPoints = datPointsCol;
                            if (datPointsCol.Count > 0)
                                this.DynTabularviewData.Add(tbViewData);
                            if (ObDataPoints.Count > 0 && (!this.bIsDiffInfusionUOM)) {
                                let objMainGraph: DataSeries = new DataSeries();
                                objMainGraph.Name = this.PrescribedItem;
                                if (!String.IsNullOrEmpty(sFluidName))
                                    objMainGraph.Displayname = this.PrescribedItem + "\n" + sFluidName + "\n" + Resource.ObservationChartResource.INFUSION_FLOWRATE + "\n";
                                else objMainGraph.Displayname = this.PrescribedItem + "\n" + Resource.ObservationChartResource.INFUSION_FLOWRATE + "\n";
                                objMainGraph.Type = "Admin";
                                objMainGraph.oDataPoints = ObDataPoints;
                                objMainGraph.High = Convert.ToDouble(ObDataPoints.Max(y => y.Value));
                                objMainGraph.Low = Convert.ToDouble(ObDataPoints.Min(y => y.Value));
                                if (!String.IsNullOrEmpty(ObDataPoints[0].ValueUOMText)) {
                                    objMainGraph.BaseUOM = ObDataPoints[0].ValueUOMText;
                                    objMainGraph.Displayname += " (" + ObDataPoints[0].ValueUOMText + ")";
                                }
                                this.IsEnableDataPoint = this.IsEnableGridLine = true;
                                objMainGraph.Id = ObDataPoints[0].ObsName;
                                this.objGraphType.GraphData.Add(objMainGraph);
                            }
                        }
                    }
                }
            }
            if (!String.IsNullOrEmpty(this.RdataItemCodes.ToString())) {
                this.GetRequestResultDetails();
            }
            else if (!String.IsNullOrEmpty(this.dataItemCodes.ToString())) {
                this.GetObservationDetails();
            }
            else {
                //Below line of code is added since sometimes the value of fromdate and todate is null and the chart does not load on the pageload
                if(!this.FromDate || !this.ToDate){
                    this.FromDate = CommonBB.GetServerDateTime().DateTime.AddDays(-6);
                    this.ToDate = CommonBB.GetServerDateTime().Date;
                    this.ToDate = this.ToDate.DateTime.AddHours(23).AddMinutes(59).AddSeconds(59);
                }
                if (String.Compare(this.Period, "CC_CUSTOM", StringComparison.InvariantCultureIgnoreCase) == 0) {
                    this.ToDate = this.ToDate.DateTime.AddHours(23).AddMinutes(59).AddSeconds(59);
                }
                if (String.Compare(this.Period, "CC_TODAY", StringComparison.InvariantCultureIgnoreCase) == 0 || String.Compare(this.Period, "CC_YESTERDAY", StringComparison.InvariantCultureIgnoreCase) == 0 || String.Compare(this.Period, "CC_24HOURS", StringComparison.InvariantCultureIgnoreCase) == 0) {
                    this.ToDate = this.ToDate.DateTime.AddHours(23).AddMinutes(59).AddSeconds(59);
                    let difference: TimeSpan = this.ToDate.Diff(this.FromDate);
                    this.AssignChart(this.FromDate.ToOADate(), this.ToDate.ToOADate(), ((this.ToDate.ToOADate() - this.FromDate.ToOADate()) / difference.TotalHours) * 3, true, true);
                }
                else {
                    this.AssignChart(this.FromDate.ToOADate(), this.ToDate.ToOADate(), 1, true, false);
                }
                if (this.GenerateTabview != null && this.DynTabularviewData != null) {
                    this.DynTabularviewData = new ObservableCollection<TabViewData>(this.DynTabularviewData.OrderBy(x => x.DisplayOrder).ThenBy(x => x.DataPointName));
                    this.GenerateTabview();
                }
            }
            BusyIndicator.SetStatusIdle("MedChart");
        }
        serviceProxy_GetDataItemCompleted(sender: Object, e: GetDataItemCompletedEventArgs): void {
            let oRes: CResMsgGetDataItem = e.Result;
            this.MainMenu = new ObservableCollection<MenuItem>();
            let mainMenu_kmenu = new kMenu_MenuItem();
            this.kmenu_items = []
            
            let fileSubObsItems: ObservableCollection<MenuItem> = new ObservableCollection<MenuItem>();
            let fileSubResItems: ObservableCollection<MenuItem> = new ObservableCollection<MenuItem>();
            let fileSubObsItems_kmenu: kMenu_MenuItem = {
                Name: "Record observation",
                DisplayName: "Record observation",
                text: "Record observation", 
                items: []
            }
            let fileSubResItems_kmenu: kMenu_MenuItem = {
                Name: "Record results",
                DisplayName: "Record results",
                text: "Record results", 
                items: []
            }
            if (oRes != null && oRes.oObservationResult != null && oRes.oObservationResult.Count > 0) {
                let menuItem: MenuItem = new MenuItem();
                oRes.oObservationResult.forEach( (obsResItem)=> {
                    if (String.Compare(obsResItem.ItemType, "Observation", StringComparison.InvariantCultureIgnoreCase) == 0) {
                        if (this.dataItemCodes.Length == 0)
                            this.dataItemCodes.Append(obsResItem.ItemCode);
                        else {
                            this.dataItemCodes.Append(",");
                            this.dataItemCodes.Append(obsResItem.ItemCode);
                        }
                        menuItem = ObjectHelper.CreateObject(new MenuItem(), {
                            Name: obsResItem.ItemCode,
                            DisplayName: obsResItem.ItemName,
                            Version: obsResItem.Version,
                            Code: obsResItem.ItemOID,
                            Type: obsResItem.ItemType
                        });
                        let menuItem_kmenu: kMenu_MenuItem = {
                            Name: obsResItem.ItemCode,
                            DisplayName: obsResItem.ItemName,
                            Version: obsResItem.Version,
                            Code: obsResItem.ItemOID,
                            Type: obsResItem.ItemType,
                            text: obsResItem.ItemName,
                            //items: []
                        }

                        fileSubObsItems.Add(menuItem);
                        fileSubObsItems_kmenu.items.push(menuItem_kmenu)
                    }
                    else if (String.Compare(obsResItem.ItemType, "Result", StringComparison.InvariantCultureIgnoreCase) == 0) {
                        if (this.RdataItemCodes.Length == 0)
                            this.RdataItemCodes.Append(obsResItem.ItemOID);
                        else {
                            this.RdataItemCodes.Replace('^', ',');
                            this.RdataItemCodes.Append(",");
                            this.RdataItemCodes.Append(obsResItem.ItemOID);
                        }
                    }
                    else {
                        if (this.RequestItemCodes.Length == 0)
                            this.RequestItemCodes.Append(obsResItem.ItemOID);
                        else {
                            this.RequestItemCodes.Append(",");
                            this.RequestItemCodes.Append(obsResItem.ItemOID);
                        }
                        menuItem = ObjectHelper.CreateObject(new MenuItem(), {
                            Name: obsResItem.ItemCode,
                            DisplayName: obsResItem.ItemName,
                            Version: obsResItem.Version,
                            Code: obsResItem.ItemOID,
                            Type: obsResItem.ItemType
                        });
                        let menuItem_kmenu: kMenu_MenuItem = {
                            Name: obsResItem.ItemCode,
                            DisplayName: obsResItem.ItemName,
                            Version: obsResItem.Version,
                            Code: obsResItem.ItemOID,
                            Type: obsResItem.ItemType,
                            text: obsResItem.ItemName,
                            //items: []
                        }
                        fileSubResItems.Add(menuItem);
                        fileSubResItems_kmenu.items.push(menuItem_kmenu);
                    }
                });
                if (this.RequestItemCodes.Length > 0) {
                    menuItem = ObjectHelper.CreateObject(new MenuItem(), {
                        Name: "All",
                        DisplayName: "All",
                        Version: 0,
                        Code: 0,
                        Type: "Request"
                    });
                    let menuItem_kmenu: kMenu_MenuItem = {
                        Name: "All",
                        DisplayName: "All",
                        Version: 0,
                        Code: 0,
                        Type: "Request",
                        text: "All",
                        //items: []
                    }
                    fileSubResItems.Add(menuItem);
                    fileSubResItems_kmenu.items.push(menuItem_kmenu);
                }
            }
            if(fileSubObsItems.Count > 0 || fileSubResItems.Count > 0){
                mainMenu_kmenu = {
                    Name: "Actions",
                    DisplayName: "Actions",
                    Version: 0,
                    Code: 0,
                    Type: "Main",
                    text: "Actions",
                    items: []
                }
                if (fileSubObsItems.Count > 0) {
                    let ObservationItem: MenuItem = ObjectHelper.CreateObject(new MenuItem(), {
                        SubItems: fileSubObsItems,
                        DisplayName: "Record observation"
                    });
                    mainMenu_kmenu.items.push(fileSubObsItems_kmenu);
                    this.MainMenu.Add(ObservationItem);
                }
                if (fileSubResItems.Count > 0) {
                    let ResulsItems: MenuItem = ObjectHelper.CreateObject(new MenuItem(), {
                        SubItems: fileSubResItems,
                        DisplayName: "Record results"
                    });
                    mainMenu_kmenu.items.push(fileSubResItems_kmenu);
                    this.MainMenu.Add(ResulsItems);
                }
                this.kmenu_items.push(mainMenu_kmenu);
            }
            
            
            ObservationChartVM.CACHANGE = "NONE";
            //this.SetDefaultValues();
            if (!UserPermissions.CanViewObservations && UserPermissions.CanViewResults == true) {
                this.dataItemCodes = new StringBuilder();
                this.GetDetails();
            }
            else if (UserPermissions.CanViewObservations && UserPermissions.CanViewResults != true) {
                this.RdataItemCodes = new StringBuilder();
                this.GetDetails();
            }
            else if (UserPermissions.CanViewObservations && UserPermissions.CanViewResults == true) 
                this.GetDetails();
                
        }
        public generatekMenuDataFromObjMainMenu(){

        }
        public GetDetails(): void {
            this.GetAdministrationHistory();
            this.ObsResultchartLoading = "Loading...";
            this.AdminChartLoading = "";
        }
        public GetRequestResultDetails(): void {
            let objResultManagementWS: ResultManagementWSSoapClient = new ResultManagementWSSoapClient();
            let objReqResults: CReqMsgGetResultsTabularView = new CReqMsgGetResultsTabularView();
            objReqResults.oContextInformation = CommonBB.FillContext();
            objReqResults.oContextInformation.PatientID = Convert.ToString(PatientContext.PatientOID);
            objReqResults.oSearchBC = new SearchInvestigationResult();
            objReqResults.oSearchBC.PatientOID = Convert.ToString(PatientContext.PatientOID);
            objReqResults.oSearchBC.FromDate = this.FromDate;
            objReqResults.oSearchBC.ToDate = this.ToDate;
            objReqResults.oSearchBC.CACode = "IPPMA";
            objReqResults.oSearchBC.ResultItemOIDs = this.RdataItemCodes.ToString().replaceAll('^', ',');
            objReqResults.oSearchBC.IsConfidential = false;
            objReqResults.oSearchBC.IsGroupBy = false;
            objReqResults.oSearchBC.CurrentUserInfo = String.Empty;
            objReqResults.oSearchBC.UserOID = 0;
            objReqResults.oSearchBC.EPRFilterList = String.Empty;
            let SealRecordListBC: string = String.Empty;
            let SealImageBC: string = String.Empty;
            objReqResults.oSearchBC.SealRecordListBC = PrescriptionHelper.GetSealDrugs("CC_PCRESULT", (o) => { SealRecordListBC = o; });
            objReqResults.oSearchBC.SealImageListBC = SealImageBC;
            objResultManagementWS.GetResultsTabularViewCompleted  = (s,e) => { this.objResultManagementWS_GetResultsTabularViewCompleted(s,e); } ;
            objResultManagementWS.GetResultsTabularViewAsync(objReqResults);
        }
        objResultManagementWS_GetResultsTabularViewCompleted(sender: Object, e: GetResultsTabularViewCompletedEventArgs): void {
            //Below line of code is added since sometimes the value of fromdate and todate is null and the chart does not load on the pageload
            if(!this.FromDate || !this.ToDate){
                this.FromDate = CommonBB.GetServerDateTime().DateTime.AddDays(-6);
                this.ToDate = CommonBB.GetServerDateTime().Date;
                this.ToDate = this.ToDate.DateTime.AddHours(23).AddMinutes(59).AddSeconds(59);
            }
            if (e.Result != null && e.Result.oResults != null && !String.IsNullOrEmpty(this.RdataItemCodes.ToString())) {
                /* let ResultDataseries = from Result in e.Result.oResults
                where(Result.WorkFlowStatus != "CC_PENDINGAUTH")
                group Result by Result.ResultItemCode into SingleSeries
                orderby SingleSeries.Key descending
                select SingleSeries; */
                let ResultDataseries = e.Result.oResults.Where(Result => (Result.WorkFlowStatus != "CC_PENDINGAUTH") ).GroupBy(Result => Result.ResultItemCode).OrderBy(SingleSeries => (SingleSeries.Key?SingleSeries.Key:SingleSeries.key)).Select(SingleSeries => SingleSeries)
                ResultDataseries.forEach( (SingleSeries)=> {
                    let tbViewData: TabViewData = new TabViewData();
                    let Uom: string = String.Empty;
                    let bUniqueUom: boolean = true;
                    let bIsUniqueNorRange: boolean = true;
                    let NRefRange: string = String.Empty;
                    tbViewData.DataPointName = SingleSeries.Key?SingleSeries.Key:SingleSeries.key ;
                    tbViewData.DisplayOrder = 2;
                    let dpDttmCol: obscol = new obscol();
                    let datPointsCol: ObservableCollection<obscol> = new ObservableCollection<obscol>();
                    let ObDataPoints: ObservableCollection<DataPoints> = new ObservableCollection<DataPoints>();
                    /* let Dataseries = from oSingleSeries in SingleSeries
                    orderby oSingleSeries.ResultReceivedDttm
                    select oSingleSeries; */
                    let Dataseries = SingleSeries.OrderBy(oSingleSeries => oSingleSeries.ResultReceivedDttm);
                    if (Dataseries != null && Dataseries.Count() > 0)
                        NRefRange = Dataseries[0].NormalReferenceRange;
                    Dataseries.forEach( (DataPoints_item)=> {
                        if (DataPoints_item != null) {
                            dpDttmCol = new obscol();
                            let sResTypeToolTip: string = String.Empty;
                            let sResultType: string = String.Empty;
                            let Value: string = String.Empty;
                            let lnRsltTextMediaOId: number = 0;
                            let sAbnTooltip: string = String.Empty;
                            let sComments: string = String.Empty;
                            if (!String.IsNullOrEmpty(DataPoints_item.ResultType)) {
                                if (DataPoints_item.ResultType == "CC_NUMERIC") {
                                    if (DataPoints_item.ResWRKFSCode != "CC_CANCDEPT" && DataPoints_item.WorkFlowStatus != "CC_RESCANCELED" && bUniqueUom) {
                                        if ((String.IsNullOrEmpty(Uom) || String.Compare(Uom, DataPoints_item.UOMDisplayName, StringComparison.InvariantCultureIgnoreCase) == 0)) {
                                            Uom = DataPoints_item.UOMDisplayName;
                                            let oObsDataPoints: DataPoints = new DataPoints();
                                            oObsDataPoints.Name = DataPoints_item.ResultItemCode; //RICode
                                            oObsDataPoints.ObsName = DataPoints_item.RICode;
                                            if (String.Compare(NRefRange, DataPoints_item.NormalReferenceRange, StringComparison.InvariantCultureIgnoreCase) == 0) {
                                                if (!String.IsNullOrEmpty(DataPoints_item.NormalReferenceRange)) {
                                                    let RRLimits: string[] = DataPoints_item.NormalReferenceRange.Split('-');
                                                    if (RRLimits != null && RRLimits.length == 2 && !String.IsNullOrEmpty(RRLimits[0]) && !String.IsNullOrEmpty(RRLimits[1])) {
                                                        oObsDataPoints.RefRange_LowerLimit = Convert.ToDouble(RRLimits[0]);
                                                        oObsDataPoints.RefRange_UpperLimit = Convert.ToDouble(RRLimits[1]);
                                                    }
                                                }
                                            }
                                            else bIsUniqueNorRange = false;
                                            if (DataPoints_item.CustomValue != null) {
                                                if (DataPoints_item.CustomValue.Contains(">")) {
                                                    oObsDataPoints.ValuePrefix = "GT";
                                                    let RValue: string[] = DataPoints_item.CustomValue.Split('>');
                                                    if (RValue != null && RValue.length == 2 && !String.IsNullOrEmpty(RValue[1]))
                                                        oObsDataPoints.Value = Convert.ToDouble(RValue[1]);
                                                }
                                                else if (DataPoints_item.CustomValue.Contains("<")) {
                                                    oObsDataPoints.ValuePrefix = "LT";
                                                    let RValue: string[] = DataPoints_item.CustomValue.Split('<');
                                                    if (RValue != null && RValue.length == 2 && !String.IsNullOrEmpty(RValue[1]))
                                                        oObsDataPoints.Value = Convert.ToDouble(RValue[1]);
                                                }
                                                else {
                                                    oObsDataPoints.Value = Convert.ToDouble(DataPoints_item.CustomValue);
                                                }
                                                oObsDataPoints.CancelObserRights = false;
                                                oObsDataPoints.ModifyObserRights = false;
                                                oObsDataPoints.RecorderDTTM = DataPoints_item.ResultReceivedDttm;
                                                oObsDataPoints.sTooltipText = this.Format_ResultTooltip(DataPoints_item).ToString();
                                                oObsDataPoints.Type = "Result";
                                                oObsDataPoints.ValueUOMText = DataPoints_item.UOMDisplayName;
                                                oObsDataPoints.RecordedUserName = DataPoints_item.ResultEnteredBy;
                                                ObDataPoints.Add(oObsDataPoints);
                                            }
                                        }
                                        else {
                                            bUniqueUom = false;
                                            ObDataPoints.Clear();
                                        }
                                    }
                                    Value = DataPoints_item.CustomValue;
                                }
                                else if (DataPoints_item.ResultType == "CC_IMAGE") {
                                    Value = sResultType = "Media";
                                    sResTypeToolTip = Resource.ObservationChartResource.MediaResultTooltip;
                                }
                                else if (!String.IsNullOrEmpty(DataPoints_item.ResultType) && (DataPoints_item.ResultType == "CC_TEXT" || DataPoints_item.ResultType == "CC_CODEDTEXT" || DataPoints_item.ResultType == "CC_REFERENCETEXT" || DataPoints_item.ResultType == "CC_FORMATTEDTEXT")) {
                                    sResTypeToolTip = Resource.ObservationChartResource.TextResultTooltip;
                                    Value = sResultType = "Text";
                                }
                                lnRsltTextMediaOId = String.IsNullOrEmpty(DataPoints_item.RequestDetailOID) ? 0 : Convert.ToInt64(DataPoints_item.RequestDetailOID);
                                if (DataPoints_item.Abnormality != "N") {
                                    sAbnTooltip = DataPoints_item.AbnDisplayName;
                                }
                                dpDttmCol.RecDTTM = DataPoints_item.ResultReceivedDttm;
                                dpDttmCol.DataPointsCol = new Datapoints(Value, "Result", DataPoints_item.UOMDisplayName, sResultType, sResTypeToolTip, DataPoints_item.Comments, (DataPoints_item.Abnormality != "N") ? DataPoints_item.AbnDisplayName : String.Empty, lnRsltTextMediaOId, ((DataPoints_item.ResWRKFSCode != "CC_CANCDEPT" && DataPoints_item.WorkFlowStatus != "CC_RESCANCELED") ? false : true), (DataPoints_item.IsMessaging) ? DataPoints_item.ResultEnteredBy : "M", String.Empty);
                                datPointsCol.Add(dpDttmCol);
                            }
                        }
                    });
                    tbViewData.ObsDataPoints = datPointsCol;
                    if (datPointsCol.Count > 0) {
                        this.DynTabularviewData.Add(tbViewData);
                        this.IsEnableDisplaycancelledvalue = true;
                    }
                    if (ObDataPoints.Count > 0) {
                        let objMainGraph: DataSeries = new DataSeries();
                        objMainGraph.Name = SingleSeries.Key?SingleSeries.Key: SingleSeries.key;
                        objMainGraph.Displayname = SingleSeries.Key?SingleSeries.Key: SingleSeries.key;
                        objMainGraph.Type = "Result";
                        objMainGraph.oDataPoints = ObDataPoints;
                        if (bIsUniqueNorRange) {
                            objMainGraph.High = Convert.ToDouble(ObDataPoints.Max(y => y.RefRange_UpperLimit));
                            objMainGraph.Low = Convert.ToDouble(ObDataPoints.Min(y => y.RefRange_LowerLimit));
                        }
                        if (!String.IsNullOrEmpty(ObDataPoints[0].ValueUOMText)) {
                            objMainGraph.BaseUOM = ObDataPoints[0].ValueUOMText;
                            objMainGraph.Displayname += " (" + ObDataPoints[0].ValueUOMText + ")";
                        }
                        objMainGraph.Id = ObDataPoints[0].ObsName;
                        this.objGraphType.GraphData.Add(objMainGraph);
                        this.IsEnableDataPoint = this.IsEnableGridLine = this.IsEnableReferencerange = true;
                    }
                });
            }
            if (String.Compare(ObservationChartVM.CACHANGE, "NONE") == 0) {
                if (!String.IsNullOrEmpty(this.dataItemCodes.ToString())) {
                    this.GetObservationDetails();
                }
                else {
                    //Below line of code is added since sometimes the value of fromdate and todate is null and the chart does not load on the pageload
                    if(!this.FromDate || !this.ToDate){
                        this.FromDate = CommonBB.GetServerDateTime().DateTime.AddDays(-6);
                        this.ToDate = CommonBB.GetServerDateTime().Date;
                        this.ToDate = this.ToDate.DateTime.AddHours(23).AddMinutes(59).AddSeconds(59);
                    }
                    if (String.Compare(this.Period, "CC_CUSTOM", StringComparison.InvariantCultureIgnoreCase) == 0) {
                        this.ToDate = this.ToDate.DateTime.AddHours(23).AddMinutes(59).AddSeconds(59);
                    }
                    if (String.Compare(this.Period, "CC_TODAY", StringComparison.InvariantCultureIgnoreCase) == 0 || String.Compare(this.Period, "CC_YESTERDAY", StringComparison.InvariantCultureIgnoreCase) == 0 || String.Compare(this.Period, "CC_24HOURS", StringComparison.InvariantCultureIgnoreCase) == 0) {
                        this.ToDate = this.ToDate.DateTime.AddHours(23).AddMinutes(59).AddSeconds(59);
                        let difference: TimeSpan = this.ToDate.Diff(this.FromDate);
                        this.AssignChart(this.FromDate.ToOADate(), this.ToDate.ToOADate(), ((this.ToDate.ToOADate() - this.FromDate.ToOADate()) / difference.TotalHours) * 3, false, true);
                    }
                    else this.AssignChart(this.FromDate.ToOADate(), this.ToDate.ToOADate(), 1, false, false);
                    if (this.GenerateTabview != null && this.DynTabularviewData != null) {
                        this.DynTabularviewData = new ObservableCollection<TabViewData>(this.DynTabularviewData.OrderBy(x => x.DisplayOrder).ThenBy(x => x.DataPointName));
                        this.GenerateTabview();
                    }

                    this.generatekGridDataFromDynTabularviewData();
                    this.generatekChartDataFromObjGraphType();
                    this.GOButtonEnabled = true;
                    BusyIndicator.SetStatusIdle("ObsChartLoad");
                }
            }
        }
        private Format_Admin_Tooltip(AdminDetails: SlotDetail): StringBuilder {
            let sTooltipText: StringBuilder = new StringBuilder();
            let sTooltip: string = String.Empty;
            if (!String.IsNullOrEmpty(this.PrescribedItem)) {
                if (this.PrescribedItem.Contains("^")) {
                    sTooltip = "Multiple component item";
                }
                else sTooltip = this.PrescribedItem;
                sTooltipText.Append(sTooltip + "#");
            }
            if (!String.IsNullOrEmpty(AdminDetails.Dose) && !String.IsNullOrEmpty(AdminDetails.DoseUOM))
                sTooltipText.Append(AdminDetails.Dose.ToString() + " " + AdminDetails.DoseUOM + "#");
            if (!String.IsNullOrEmpty(AdminDetails.AdministrationDetail.AdministeredBy))
                sTooltipText.Append(AdminDetails.AdministrationDetail.AdministeredBy + "#");
            if (AdminDetails.AdministrationDetail.AdministeredDate.NotEquals(DateTime.MinValue))
                sTooltipText.Append(AdminDetails.AdministrationDetail.AdministeredDate.ConvertToUser((o) => {this.IsDST = o}, (o) => {this.IsAmbiguous = o} , (o) => {this.IsInvalid = o} ).ToDateTimeString(this.IsDST, this.IsAmbiguous, CConstants.DateTimeFormat));
            return sTooltipText;
        }
        private Format_InfusionAdmin_Tooltip(AdminDetails: InfusionAdminDetail, FluidName: string, FluidRateUOM: string): StringBuilder {
            let sTooltipText: StringBuilder = new StringBuilder();
            let sTooltip: string = String.Empty;
            if (!String.IsNullOrEmpty(this.PrescribedItem)) {
                if (!String.IsNullOrEmpty(FluidName))
                    sTooltip = this.PrescribedItem + " " + Resource.ObservationChartResource.CONCATEITEMANDFLUID + " " + FluidName;
                else sTooltip = this.PrescribedItem;
                sTooltipText.Append(sTooltip + "#");
            }
            if (!String.IsNullOrEmpty(AdminDetails.ActionTermText))
                sTooltipText.Append(AdminDetails.ActionTermText);
            if (!String.IsNullOrEmpty(AdminDetails.InfusionRate))
                sTooltipText.Append(Resource.ObservationChartResource.CONCATETOOLTIP + AdminDetails.InfusionRate);
            if (!String.IsNullOrEmpty(FluidRateUOM))
                sTooltipText.Append(" " + FluidRateUOM);
            sTooltipText.Append("#");
            if (DateTime.NotEquals(AdminDetails.InfusionAdministeredAt, DateTime.MinValue)) {
            //if (AdminDetails.InfusionAdministeredAt.NotEquals(DateTime.MinValue)) {
                if (!String.IsNullOrEmpty(AdminDetails.InfusionAdministeredBy))
                    sTooltipText.Append(AdminDetails.InfusionAdministeredBy + "#");
                    //change to class in soap client 
                sTooltipText.Append(AdminDetails.InfusionAdministeredAt.ConvertToUser((o) => {this.IsDST = o}, (o) => {this.IsAmbiguous = o} , (o) => {this.IsInvalid = o}).ToDateTimeString(this.IsDST, this.IsAmbiguous, CConstants.DateTimeFormat));
            }
            return sTooltipText;
        }
        private Format_ResultTooltip(Result: InvestigationTabularView): StringBuilder {
            let sTooltipText: StringBuilder = new StringBuilder();
            if (!String.IsNullOrEmpty(Result.ResultItemCode))
                sTooltipText.Append(Result.ResultItemCode + "#");
            if (Result.ResultReceivedDttm.NotEquals(DateTime.MinValue))
                sTooltipText.Append(Result.ResultReceivedDttm.ConvertToUser((o) => {this.IsDST = o}, (o) => {this.IsAmbiguous = o} , (o) => {this.IsInvalid = o} ).ToDateTimeString(this.IsDST, this.IsAmbiguous, CConstants.DateTimeFormat) + "#");
            if (!String.IsNullOrEmpty(Result.ResultEnteredBy))
                sTooltipText.Append(Result.ResultEnteredBy + "#");
            if (Result.Abnormality != "N") {
                sTooltipText.Append("[" + Result.AbnDisplayName + "] ");
            }
            if (!String.IsNullOrEmpty(Result.CustomValue)) {
                sTooltipText.Append(Result.CustomValue + (!String.IsNullOrEmpty(Result.UOMDisplayName) ? (" " + Result.UOMDisplayName) : String.Empty) + "#");
            }
            if (!String.IsNullOrEmpty(Result.RefRange))
                sTooltipText.Append(Result.RefRange);
            return sTooltipText;
        }
        private Format_ObservationFTooltip(Observation: Observation, Value_UOM: string): StringBuilder {
            let sTooltipText: StringBuilder = new StringBuilder();
            if (!String.IsNullOrEmpty(Observation.PatientObservation[0].Name))
                sTooltipText.Append(Observation.PatientObservation[0].Name + "#");
            if (Observation.Observedon.NotEquals(DateTime.MinValue))
                sTooltipText.Append(Observation.Observedon.ConvertToUser((o) => {this.IsDST = o}, (o) => {this.IsAmbiguous = o} , (o) => {this.IsInvalid = o} ).ToDateTimeString(this.IsDST, this.IsAmbiguous, "dd-MMM-yyyy HH:mm") + "#");
            if (!String.IsNullOrEmpty(Observation.ObserverName))
                sTooltipText.Append(Observation.ObserverName + "#");
            if (!String.IsNullOrEmpty(Value_UOM))
                sTooltipText.Append(Value_UOM);
            return sTooltipText;
        }
        private Format_ObservationTooltip(Observation: FormDataitemLatestValues, Value_UOM: string): StringBuilder {
            let sTooltipText: StringBuilder = new StringBuilder();
            if (!String.IsNullOrEmpty(Observation.Name))
                sTooltipText.Append(Observation.Name + "#");
            if (Observation.RecordedDTTM.NotEquals(DateTime.MinValue))
                sTooltipText.Append(Observation.RecordedDTTM.ToString() + "#");
            if (!String.IsNullOrEmpty(Observation.RecordedUser))
                sTooltipText.Append(Observation.RecordedUser + "#");
            if (!String.IsNullOrEmpty(Value_UOM))
                sTooltipText.Append(Value_UOM);
            return sTooltipText;
        }
        public override GetChildWizardData(sData: string): void {
            if (sData.Contains("WIZ_Status=FINISH")) {
                this.IsEnableDataPoint = this.IsEnableGridLine = this.IsEnableDisplaycancelledvalue = this.IsEnableReferencerange = false;
                ObservationChartVM.CACHANGE = "NONE";
                this.objGraphType = new GraphType();
                this.objGraphType.GraphData = new ObservableCollection<DataSeries>();
                this.DynTabularviewData = new ObservableCollection<TabViewData>();
                this.SetDateRange(true);
                this.IsEnteredObsResult = true;
                this.GetDetails();
            }
        }
        /* public static ShowContents<TKey, TValue>(data: IDictionary<TKey, TValue>): void {
            data.forEach( (pair)=> {

            });
        } */
       
        constructor(sTaskOID?: string) {
            super(sTaskOID);
            //this.OnInitialize();// adding this call, beacuse it doesnt gets called automatically as in SL code 
            let _mediatorDataService = InjectorInstance.get<MediatorDataService>(MediatorDataService);
            _mediatorDataService.listenFor(6).subscribe((data:any) => {
              if(data){
               let contextData = data.context;
               switch (contextData.context.event) {
                case 'Discard_Click': this.OnCancel();
                           break;
                case 'Finish_Click':
                  HelperService.windowCloseFlag = "Finish";
                  this.OnFinish();  
                  break;
                case 'FinishNow_Click': 
                  HelperService.windowCloseFlag = "FinishNow";            
                  this.OnFinishNow();  
                  break;
               }
              }
            })
            
        }
        public override OnInitialize(): void {
            this.IsEnteredObsResult = false;
            super.IsButtonCancelVisible = Visibility.Collapsed;
            if (UserPermissions.CanViewResults == null) {
                UserPermissions.CanViewResults = PrescriptionHelper.CheckPermission("RM_TABULAR_VIEW", "Can View Tabular View"); 
            }
            if (UserPermissions.CanViewObservations == null) {
                UserPermissions.CanViewObservations = PrescriptionHelper.CheckPermission("IPP_CAN_VIEW_OBSERVATIONS", "Can view Observations"); 
            }
            let arrResourceNames: string[] = ["IPP_CAN_VIEW_OBSE_P2","IPP_CAN_ENTER_OBS_P2", "RM_ENTER_RESULTS", "IPP_CAN_MODIFY_OB_P2", "IPP_CAN_STRIKE_OB_P2"];
            SLSecurityAccess.CheckAccess("CA", arrResourceNames, (s,e) => this.CheckAccess_OnCompleted(s,e));
            super.OnInitialize();
            this.OnInitComplete();

        }
        private CheckAccess_OnCompleted(sender: Object, Result: OnCheckAccessEventArgs): void {
            if (Result.AccResources != null) {
                let nCount: number = Result.AccResources.Length;
                for (let i: number = 0; i < nCount; i++) {
                    switch (Result.AccResources[i]) {
                        case "IPP_CAN_VIEW_OBSE_P2":
                            UserPermissions.CanViewObservations = true;
                            break;
                        case "IPP_CAN_ENTER_OBS_P2":
                            UserPermissions.CanEnterObservations = true;
                            break;
                        case "RM_ENTER_RESULTS":
                            UserPermissions.CanEnterResults = true;
                            break;
                        case "IPP_CAN_MODIFY_OB_P2":
                            UserPermissions.CanModifyObservations = true;
                            break;
                        case "IPP_CAN_STRIKE_OB_P2":
                            UserPermissions.CanCancelObservations = true;
                            break;
                    }
                }
            }
            /* UserPermissions.CanCancelObservations = true;
            UserPermissions.CanEnterObservations = true;
            UserPermissions.CanEnterResults = true;
            UserPermissions.CanModifyObservations = true;
            UserPermissions.CanCancelObservations = true; */
        }
        public override OnInitComplete(): void {
            super.OnInitComplete();
            if (ContextManager.Instance["FRC-001-CHILD"] != null)
                Common.Frc001Childs = ContextManager.Instance["FRC-001-CHILD"].ToString();
            if (ContextManager.Instance["FRC-002-CHILD"] != null)
                Common.Frc002Childs = ContextManager.Instance["FRC-002-CHILD"].ToString();
            if (ContextManager.Instance["FRC-003-CHILD"] != null)
                Common.Frc003Childs = ContextManager.Instance["FRC-003-CHILD"].ToString();
            if (ContextManager.Instance["FRQ-88-CHILD"] != null)
                Common.Frq88Childs = ContextManager.Instance["FRQ-88-CHILD"].ToString();
            this.GetContextInfo();
            this.GetDataItemCodes();
            this.InitializeChart();

        }
        private GetContextInfo(): void {
            let lnPatOID: number, lnEncOID, lnPrescriptionItemOID, lnIdentifyingOID;
            this.PropertyChanged  = (s,e) => { this.ObservationChartVM_PropertyChanged(s,e); } ;
            if (!String.IsNullOrEmpty(this.WizardContext["IsDrugRound"]) && this.WizardContext["IsDrugRound"] == "True") {
                if (Number.TryParse(this.WizardContext["PatientID"].ToString(), o => lnPatOID = o))
                    PatientContext.PatientOID = lnPatOID;
                PatientContext.PatientAge = this.WizardContext["PatientAge"].ToString();
            }
            else {
                if (ContextManager.Instance["PatientID"] && Number.TryParse(ContextManager.Instance["PatientID"].ToString(), o => lnPatOID = o))
                    PatientContext.PatientOID = lnPatOID;
                PatientContext.PatientAge = ContextManager.Instance["PatientAge"]?.ToString();
            }
            if (Number.TryParse(this.WizardContext["PrescriptionItemOID"].ToString(), o => lnPrescriptionItemOID = o))
                PatientContext.PrescriptionItemOID = lnPrescriptionItemOID;
            if (Number.TryParse(this.WizardContext["IdentifyingOID"].ToString(), o => lnIdentifyingOID = o))
                PatientContext.PrescriptionIdentifyingOID = lnIdentifyingOID;
            PatientContext.PrescriptionMCVersionNo = this.WizardContext["MCVersionNo"].ToString();
            PatientContext.PrescriptionIdentyType = this.WizardContext["IdentifyingType"].ToString();
            this.PrescribedDose = Convert.ToString(this.WizardContext["PrescribedDose"]);
            this.PrescribedItem = Convert.ToString(this.WizardContext["PrescribedItem"]);
            this.ItemSubType = Convert.ToString(this.WizardContext["ItemSubType"]);
            this.ItemToolTip = Convert.ToString(this.WizardContext["ItemToolTip"]);
            this.PrescribedFrequency = this.WizardContext["DrugFrequency"];
            if (!String.IsNullOrEmpty(this.WizardContext["PrescriptionType"]))
                this.PrescriptionType = this.WizardContext["PrescriptionType"].ToString();
            if (!String.IsNullOrEmpty(this.WizardContext["OpenMode"]))
                this.OpenMode = this.WizardContext["OpenMode"].ToString();
            if (Number.TryParse(ContextManager.Instance["EncounterOID"]?.ToString(), o => lnEncOID = o))
                PatientContext.EncounterOid = lnEncOID;
            PatientContext.DOB = ContextManager.Instance["DOB"]?.ToString();
            PatientContext.Sex = ContextManager.Instance["Sex"]?.ToString();
            PatientContext.EncounterType = ContextManager.Instance["EncounterType"]?.ToString();
            PatientContext.PrescriptionType = this.WizardContext["PrescType"];
            AppContextInfo.OrganisationName = ContextManager.Instance["OrganisationName"]?.ToString();
            AppContextInfo.JobRoleOID = ContextManager.Instance["JobRoleOID"]?.ToString();
            AppContextInfo.RoleProfileName = ContextManager.Instance["RoleProfileName"]?.ToString();
            AppSessionInfo.AMCV = ContextManager.Instance["AMCV"]?.ToString();
            if (ContextManager.Instance["TeamNames"] != null)
                AppContextInfo.TeamNames = ContextManager.Instance["TeamNames"].ToString();
            if (ContextManager.Instance["TeamOIDs"] != null)
                AppContextInfo.TeamOIDs = ContextManager.Instance["TeamOIDs"].ToString();
            ContextInfo.SecurityToken = super.AppContext.SecurityToken;
            AppContextInfo.JobRoleName = ContextManager.Instance["JobRoleName"]?.ToString();
            AppContextInfo.UserName = ContextManager.Instance["UserName"]?.ToString();
            AppContextInfo.UserOID = ContextManager.Instance["UserOID"]?.ToString();
            let objUserOid: number;
            Int64.TryParse(super.AppContext.UserOID, o => {objUserOid=o});
            ContextInfo.UserOID = objUserOid;
            AppContextInfo.OrganisationOID = super.AppContext.OrganisationOID;
            let objReleaseVer: number;
            Byte.TryParse(super.AppContext.ReleaseVersion, o => {objReleaseVer = o});
            ContextInfo.ReleaseVersion = objReleaseVer;
            if (this.DynTabularviewData == null)
                this.DynTabularviewData = new ObservableCollection<TabViewData>();
            PatientContext.PrescriptionMCitemlist = this.WizardContext["Itemlist"];
            if (this.WizardContext["Observation"] != null && this.WizardContext["Observation"].length > 0) {
                this.dataItemCodes.Append(this.WizardContext["Observation"].ToString());
                this.dataItemCode.Append(this.WizardContext["Observation"].ToString());
            }
            if (this.WizardContext["Result"] != null && this.WizardContext["Result"].length > 0) {
                this.RdataItemCodes.Append(this.WizardContext["Result"].ToString());
                this.RdataItemCode.Append(this.WizardContext["Result"].ToString());
            }
            if (this.WizardContext["Request"] != null && this.WizardContext["Request"].length > 0)
                this.RequestItemCodes.Append(this.WizardContext["Request"].ToString());
            ProcessRTE.GetValuesByDomainCode("MEDOBSERESPRD", ret => this.OnRTEResult(ret));
            
        }
        OnRTEResult(args: RTEEventargs): void {
            if (String.IsNullOrEmpty(args.Request) || args.Result == null)
                return
            if (String.Compare(args.Request, "MEDOBSERESPRD", StringComparison.CurrentCultureIgnoreCase) == 0) {
                this.PeriodCodes = new ObservableCollection<CListItem>();
                <List<CListItem>>args.Result.forEach( (oCListItem)=> {
                    if (oCListItem.Value == "CC_LASTMONTH")
                        oCListItem.DisplayText = "Last month";
                    if (oCListItem.Value == "CC_LASTWEEK")
                        oCListItem.DisplayText = "Last week";
                    this.PeriodCodes.Add(oCListItem);
                });
                this.Period = "CC_LST7DAYS";
            }
            this.Period = "CC_LST7DAYS";
            this.FromDate = CommonBB.GetServerDateTime().DateTime.AddDays(-6);
            this.ToDate = CommonBB.GetServerDateTime().Date;
            this.ToDate = this.ToDate.DateTime.AddHours(23).AddMinutes(59).AddSeconds(59);

        }
        public InitializeChart(): void {
            //this.ChartSeriesMappings = new SeriesMappingCollection();
            this.ChartData = new ObservableCollection<ObservableCollection<Data>>();
            this.IsRoadMapVisible = Visibility.Collapsed;
            this.objGraphType = new GraphType();
            this.objGraphType.GraphData = new ObservableCollection<DataSeries>();
            this.DynTabularviewData = new ObservableCollection<TabViewData>();
        }
        private InitializeSeriesMappings(): void {
            for (let nCnt: number = 0; nCnt < 9; nCnt++) {
                /* this.ChartSeriesMappings.Add(this.ConfigureLineMapping(nCnt, "Observation-" + nCnt,
                    CreateLineSeries("ObsResultAxisName" + nCnt, "Observation-" + nCnt,
                        SeriesColorCollection.SeriesColors[nCnt].Value, nCnt), "Observation", "ObsResultChartArea")); */
            }
            /* this.ChartSeriesMappings.Add(this.ConfigureLineMapping(0, "Dose administered",
                CreateLineSeries("AdminAxisName", "AdminSeries",
                    SeriesColorCollection.SeriesColors[0].Value, 4), "Admin", "AdminChartArea")); */
        }
        SetDefaultValues(): void {
            this.Period = "CC_LST7DAYS";
            this.FromDate = CommonBB.GetServerDateTime().DateTime.AddDays(-6);
            this.ToDate = CommonBB.GetServerDateTime().Date;
            this.ToDate = this.ToDate.DateTime.AddHours(23).AddMinutes(59).AddSeconds(59);

        }
        ObservationChartVM_PropertyChanged(sender: Object, e: PropertyChangedEventArgs): void {
            switch (e.PropertyName) {
                case ("Period"):
                    this.SetDateRange(false);
                    break;
            }
        }
        public SetDateRange(IschangeCA: boolean): void {
            this.IsRangeEnabled = false;
            if (String.Compare(this.Period, "CC_TODAY", StringComparison.InvariantCultureIgnoreCase) == 0 || String.Compare(this.Period, "CC_CUSTOM", StringComparison.InvariantCultureIgnoreCase) == 0 || String.Compare(this.Period, "CC_24HOURS", StringComparison.InvariantCultureIgnoreCase) == 0) {
                if (!IschangeCA || String.Compare(this.Period, "CC_CUSTOM", StringComparison.InvariantCultureIgnoreCase) != 0) {
                    this.FromDate = CommonBB.GetServerDateTime().Date;
                    this.ToDate = CommonBB.GetServerDateTime().Date;
                }
                if (String.Compare(this.Period, "CC_CUSTOM", StringComparison.InvariantCultureIgnoreCase) == 0)
                    this.IsRangeEnabled = true;
            }
            else if (String.Compare(this.Period, "CC_YESTERDAY", StringComparison.InvariantCultureIgnoreCase) == 0) {
                this.FromDate = CommonBB.GetServerDateTime().DateTime.AddDays(-1);
                this.ToDate = CommonBB.GetServerDateTime().DateTime.AddDays(-1);
            }
            else if (String.Compare(this.Period, "CC_THISWEEK", StringComparison.InvariantCultureIgnoreCase) == 0) {
                let day: DayOfWeek = CommonBB.GetServerDateTime().DateTime.DayOfWeek;
                if (day == DayOfWeek.Sunday)
                    this.FromDate = CommonBB.GetServerDateTime().DateTime.AddDays(-6);
                else {
                    let days: number = day - DayOfWeek.Monday;
                    this.FromDate = CommonBB.GetServerDateTime().DateTime.AddDays(-days);
                }
                this.ToDate = CommonBB.GetServerDateTime().Date;
            }
            else if (String.Compare(this.Period, "CC_LASTWEEK", StringComparison.InvariantCultureIgnoreCase) == 0) {
                let day: DayOfWeek = CommonBB.GetServerDateTime().DateTime.DayOfWeek;
                let days: number = day - DayOfWeek.Monday;
                this.FromDate = CommonBB.GetServerDateTime().DateTime.AddDays(-days).AddDays(-7);
                this.ToDate = this.FromDate.AddDays(6);
            }
            else if (String.Compare(this.Period, "CC_LAST_2WEEKS", StringComparison.InvariantCultureIgnoreCase) == 0) {
                let day: DayOfWeek = CommonBB.GetServerDateTime().DateTime.DayOfWeek;
                let days: number = day - DayOfWeek.Monday;
                this.FromDate = CommonBB.GetServerDateTime().DateTime.AddDays(-days).AddDays(-14);
                this.ToDate = this.FromDate.AddDays(13);
            }
            else if (String.Compare(this.Period, "CC_LASTMONTH", StringComparison.InvariantCultureIgnoreCase) == 0) {
                this.FromDate = new DateTime(CommonBB.GetServerDateTime().Year, CommonBB.GetServerDateTime().DateTime.AddMonths(-1).Month, 1);
                this.ToDate = this.FromDate.AddMonths(1).AddDays(-1);
            }
            else if (String.Equals(this.Period, "CC_LST7DAYS", StringComparison.CurrentCultureIgnoreCase)) {
                this.FromDate = CommonBB.GetServerDateTime().DateTime.AddDays(-6);
                this.ToDate = CommonBB.GetServerDateTime().Date;
            }
            this.ToDate = this.ToDate.DateTime.AddHours(23).AddMinutes(59).AddSeconds(59);
        }
        public override OnFinish(): void {
            this.WizardContext.Add("RECORDENTERED", this.IsEnteredObsResult.ToString());
            super.OnFinish();
        }
    }
    export class MenuItem {
        constructor() {
            this.SubItems = new ObservableCollection<MenuItem>();
        }
        public Name: string;
        public Code: number;
        public DisplayName: string;
        public Version: number;
        public Type: string;
        public SubItems: ObservableCollection<MenuItem>;
    }
    export class kMenu_MenuItem {
        constructor() {
            this.items = [];
        }
        public text?: string;
        public items?: kMenu_MenuItem[];
        public Name?: string;
        public Code?: number;
        public DisplayName?: string;
        public Version?: number;
        public Type?: string;
    }
    export class Menu {
        constructor() {

        }
        public Name: string;
        public Code: number;
        public DisplayName: string;
        public Version: number;
    }
    export class AdministrationRow implements INotifyPropertyChanged {
        private sItemName: string;
        private sUOM: string;
        private sDayOne: string;
        private sDayTwo: string;
        private sDayThree: string;
        private sDayFour: string;
        private sDayFive: string;
        private sDaySix: string;
        private sDaySeven: string;
        public get ItemName(): string {
            return this.sItemName;
        }
        public set ItemName(value: string) {
            this.sItemName = value;
        }
        public get UOM(): string {
            return this.sUOM;
        }
        public set UOM(value: string) {
            this.sUOM = value;
            //this.OnPropertyChanged(String.Empty);
        }
        public get DayOneValue(): string {
            return this.sDayOne;
        }
        public set DayOneValue(value: string) {
            this.sDayOne = value;
            //this.OnPropertyChanged(String.Empty);
        }
        public get DayTwoValue(): string {
            return this.sDayTwo;
        }
        public set DayTwoValue(value: string) {
            this.sDayTwo = value;
            //this.OnPropertyChanged(String.Empty);
        }
        public get DayThreeValue(): string {
            return this.sDayThree;
        }
        public set DayThreeValue(value: string) {
            this.sDayThree = value;
            //this.OnPropertyChanged(String.Empty);
        }
        public get DayFourValue(): string {
            return this.sDayFour;
        }
        public set DayFourValue(value: string) {
            this.sDayFour = value;
            //this.OnPropertyChanged(String.Empty);
        }
        public get DayFiveValue(): string {
            return this.sDayFive;
        }
        public set DayFiveValue(value: string) {
            this.sDayFive = value;
            //this.OnPropertyChanged(String.Empty);
        }
        public get DaySixValue(): string {
            return this.sDaySix;
        }
        public set DaySixValue(value: string) {
            this.sDaySix = value;
            //this.OnPropertyChanged(String.Empty);
        }
        public get DaySevenValue(): string {
            return this.sDaySeven;
        }
        public set DaySevenValue(value: string) {
            this.sDaySeven = value;
            //this.OnPropertyChanged(String.Empty);
        }
        private _MultiComponentItems: ArrayOfString;
        public get MultiComponentItems(): ArrayOfString {
            return this._MultiComponentItems;
        }
        public set MultiComponentItems(value: ArrayOfString) {
            this._MultiComponentItems = value;
            //this.OnPropertyChanged("MultiComponentItems");
        }
        private _ItemSubtype: string;
        public get ItemSubType(): string {
            return this._ItemSubtype;
        }
        public set ItemSubType(value: string) {
            this._ItemSubtype = value;
            //this.OnPropertyChanged("ItemSubtype");
        }
        /* protected OnPropertyChanged(info: string): void {
            if (PropertyChanged != null) {
                PropertyChanged(this, new PropertyChangedEventArgs(info));
            }
        } */
        public PropertyChanged: PropertyChangedEventHandler;
    }
    export class ObservationData implements INotifyPropertyChanged {
        private sDataItemCode: string;
        private sDataItemName: string;
        private sUOM: string;
        private dttmRecordedDTTM: DateTime;
        private dValue: number;
        private sType: string;
        public get DataItemCode(): string {
            return this.sDataItemCode;
        }
        public set DataItemCode(value: string) {
            this.sDataItemCode = value;
        }
        public get DataItemName(): string {
            return this.sDataItemName;
        }
        public set DataItemName(value: string) {
            this.sDataItemName = value;
        }
        public get UOM(): string {
            return this.sUOM;
        }
        public set UOM(value: string) {
            this.sUOM = value;
        }
        public get RecordedDTTM(): DateTime{
            return this.dttmRecordedDTTM;
        }
        public set RecordedDTTM(value: DateTime) {
            this.dttmRecordedDTTM = value;
        }
        public get Value(): number {
            return this.dValue;
        }
        public set Value(value: number) {
            this.dValue = value;
        }
        public get Type(): string {
            return this.sType;
        }
        public set Type(value: string) {
            this.sType = value;
        }
        /* protected OnPropertyChanged(info: string): void {
            if (PropertyChanged != null) {
                PropertyChanged(this, new PropertyChangedEventArgs(info));
            }
        } */
       
        constructor(recordedDTTM: DateTime, value: number) {
            this.RecordedDTTM = recordedDTTM;
            this.Value = value;
        }
        public  PropertyChanged: PropertyChangedEventHandler;
    }
    export class Datapoints implements INotifyPropertyChanged {
        private sUOM: string;
        private dttmRecordedDTTM: DateTime;
        private dValue: string;
        private sType: string;
        private sAbnImgSource: string;
        private sToolTip: string;
        private sResultype: string;
        private sResultTextMediaOID: number;
        private sCommentImgSource: string;
        private sComments: string;
        private sAbnormaltooltip: string;
        private bIsCancel: boolean;
        private sResultenteredby: string;
        private sResultName: string;
        public get UOM(): string {
            return this.sUOM;
        }
        public set UOM(value: string) {
            this.sUOM = value;
        }
        public get RecordedDTTM(): DateTime{
            return this.dttmRecordedDTTM;
        }
        public set RecordedDTTM(value: DateTime) {
            this.dttmRecordedDTTM = value;
        }
        public get Value(): string {
            return this.dValue;
        }
        public set Value(value: string) {
            this.dValue = value;
        }
        public get Type(): string {
            return this.sType;
        }
        public set Type(value: string) {
            this.sType = value;
        }
        public get AbnImgSource(): string {
            return this.sAbnImgSource;
        }
        public set AbnImgSource(value: string) {
            this.sAbnImgSource = value;
        }
        public get RtypeToolTip(): string {
            return this.sToolTip;
        }
        public set RtypeToolTip(value: string) {
            this.sToolTip = value;
        }
        public get ResultType(): string {
            return this.sResultype;
        }
        public set ResultType(value: string) {
            this.sResultype = value;
        }
        public get ResultTextMediaOID(): number {
            return this.sResultTextMediaOID;
        }
        public set ResultTextMediaOID(value: number) {
            this.sResultTextMediaOID = value;
        }
        public get CommentImgSource(): string {
            return this.sCommentImgSource;
        }
        public set CommentImgSource(value: string) {
            this.sCommentImgSource = value;
        }
        public get Comments(): string {
            return this.sComments;
        }
        public set Comments(value: string) {
            this.sComments = value;
        }
        public get Abnormaltooltip(): string {
            return this.sAbnormaltooltip;
        }
        public set Abnormaltooltip(value: string) {
            this.sAbnormaltooltip = value;
        }
        public get IsCancel(): boolean {
            return this.bIsCancel;
        }
        public set IsCancel(value: boolean) {
            this.bIsCancel = value;
        }
        public get Resultenteredby(): string {
            return this.sResultenteredby;
        }
        public set Resultenteredby(value: string) {
            this.sResultenteredby = value;
        }
        public get ResultName(): string {
            return this.sResultName;
        }
        public set ResultName(value: string) {
            this.sResultName = value;
        }
        /* protected OnPropertyChanged(info: string): void {
            if (PropertyChanged != null) {
                PropertyChanged(this, new PropertyChangedEventArgs(info));
            }
        } */

        
        constructor(value: string,
            type: string,
            sUOM: string,
            sResultType: string,
            sRtypeTooltip: string,
            sComments: string,
            sAbnTooltip: string,
            lnResultTextMediaOID: number,
            bIscancel: boolean,
            sResultenteredby: string,
            sResultName: string) {
            this.UOM = sUOM;
            this.Type = type;
            this.Value = value;
            this.ResultType = sResultType;
            this.RtypeToolTip = sRtypeTooltip;
            this.Comments = sComments;
            this.Abnormaltooltip = sAbnTooltip;
            this.ResultTextMediaOID = lnResultTextMediaOID;
            this.IsCancel = bIscancel;
            this.Resultenteredby = sResultenteredby;
            this.ResultName = sResultName;
        }
        public  PropertyChanged: PropertyChangedEventHandler;
    }
    export class TabViewData_kgrid{
        ItemName: string;
        ExpandIcon: string;
        UOM: string;

    }
    export class TabViewData_kgrid_left{
        itemName: string;

    }
    export class TabViewData_kgrid_right{
        itemName: string;

    }
    export class ColumnSetting_kgrid {
        field: string;
        title: string;
        format?: string;
        dateVal?: DateTime;
        type: "text" | "numeric" | "boolean" | "date";
    }
    export class TabViewData implements INotifyPropertyChanged {
        private sDataPointName: string;
        private objObsData: ObservableCollection<obscol>;
        private nDisplayOrder: number;
        private bIsFlowrate: boolean;
        private sFluidName: string;
        private sMCIToolTip: string;
        public get DisplayOrder(): number {
            return this.nDisplayOrder;
        }
        public set DisplayOrder(value: number) {
            this.nDisplayOrder = value;
        }
        public get DataPointName(): string {
            return this.sDataPointName;
        }
        public set DataPointName(value: string) {
            this.sDataPointName = value;
        }
        public get ObsDataPoints(): ObservableCollection<obscol> {
            return this.objObsData;
        }
        public set ObsDataPoints(value: ObservableCollection<obscol>) {
            this.objObsData = value;
        }
        public  PropertyChanged: PropertyChangedEventHandler;
        public get IsFlowrate(): boolean {
            return this.bIsFlowrate;
        }
        public set IsFlowrate(value: boolean) {
            this.bIsFlowrate = value;
        }
        public get FluidName(): string {
            return this.sFluidName;
        }
        public set FluidName(value: string) {
            this.sFluidName = value;
        }
        public get MCIToolTip(): string {
            return this.sMCIToolTip;
        }
        public set MCIToolTip(value: string) {
            this.sMCIToolTip = value;
        }
    }
    export class obscol implements INotifyPropertyChanged {
        public PropertyChanged: PropertyChangedEventHandler;
        private recDTTM: DateTime;
        private objDataPoints: Datapoints;
        public get RecDTTM(): DateTime{
            return this.recDTTM;
        }
        public set RecDTTM(value: DateTime) {
            this.recDTTM = value;
        }
        public get DataPointsCol(): Datapoints {
            return this.objDataPoints;
        }
        public set DataPointsCol(value: Datapoints) {
            this.objDataPoints = value;
        }
        //public event PropertyChangedEventHandler PropertyChanged;
    }
        export class DataPoints {
          
            constructor(recorderDTTM?: DateTime, type?: string, value?: number) {
                this.RecorderDTTM = recorderDTTM;
                this.Type = type;
                this.Value = value;
            } 
            /* constructor(){

            } */
            private _valuePrefix: string;
            public get ValuePrefix(): string {
                return this._valuePrefix;
            }
            public set ValuePrefix(value: string) {
                this._valuePrefix = value;
            }
            public Type: string;
            public FormOID: number;
            public Value: number;
            public ValueUOMText: string;
            public CancelObserRights: boolean;
            public ModifyObserRights: boolean;
            public RecordedUserName: string;
            public RecorderDTTM: DateTime;
            private _sTooltipText: string;
            public get sTooltipText(): string {
                return this._sTooltipText;
            }
            public set sTooltipText(value: string) {
                this._sTooltipText = value;
            }
            public RefRange_UpperLimit: number;
            public RefRange_LowerLimit: number;
            public ObsName: string;
            public Name: string;
            public High: number;
            public Low: number;
            public PatientOID: number;
            public EncounterOID: number;
            public IsFlowRate: boolean;
            public INFTYCode: string;
        }
        export class GraphType {
            
            public GraphData: ObservableCollection<DataSeries>;
        }
    
    export class DatapointDetails {
        constructor() {

        }
        public ObserverName: string;
        public Status: string;
        public IsModify: boolean;
        public ParentItemName: string;
        public ObservationValueName: string;
        public Observedon: DateTime;
        public FormOID: number;
        public PatientOID: number;
        public EncounterOID: number;
    }
    export class DataSeries {
        constructor() {

        }
        public Name: string;
        public Displayname: string;
        public Id:string;
        public BaseUOM: string;
        public BaseUOMOID: string;
        public Type: string;
        public oDataPoints: ObservableCollection<DataPoints>;
        public High: number;
        public Low: number;
        public IsRefUnique: boolean;
    }
