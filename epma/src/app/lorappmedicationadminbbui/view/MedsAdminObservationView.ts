import { AfterViewInit, Component, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { StringBuilder,ProfileFactoryType,ContextManager,Convert,AppActivity, ProcessRTE, ScriptObject, BusyIndicator} from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp,Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison,AppDialogEventargs, AppDialogResult, DelegateArgs, DialogComponentArgs, WindowButtonType, List, ObservableCollection, HtmlPage, RadRoutedEventArgs, IEnumerable, Visibility } from 'epma-platform/models';
import { AppDialog, BitmapImage, Border, Colors, DataTemplate, EventArgs, Grid, Image, SolidColorBrush, StackPanel, Stretch, TextBlock, ToolTipService, Uri, UriKind, UserControl, iButton, iCheckBox, iComboBox, iDateTimePicker, iHyperlinkButton, iLabel } from 'epma-platform/controls';
import { AppContextInfo, AppSessionInfo, ContextInfo, PatientContext } from 'src/app/lorappcommonbb/utilities/globalvariable';
import { HelperService} from 'epma-platform/soapclient';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
import { DataSeries, Datapoints, GraphType, MenuItem, ObservationChartVM, TabViewData, kMenu_MenuItem } from '../ca/observationchart/ObservationChartVM';
import { Path } from '@progress/kendo-drawing';
import { CommonBB } from 'src/app/lorappcommonbb/utilities/common';
import { RoutedEventArgs, VerticalAlignment } from 'src/app/shared/epma-platform/controls/FrameworkElement';
import { UserPermissions } from '../utilities/ProfileData';
import { DateChangedArgs } from 'src/app/shared/epma-platform/controls/epma-datetimepicker/epma-datetimepicker.component';
import { PropertyChangedEventArgs } from 'src/app/shared/epma-platform/controls/epma-tab/epma-tab.component';
import { GridExtension, RowLoadedEventArgs, iGridViewDataColumn } from 'src/app/shared/epma-platform/controls/epma-grid-helpers/grid-extension';
import { CConstants } from '../utilities/CConstants';
import { ObservationChartResource } from '../resource/observationchartresource.designer';
import { Orientation } from 'src/app/shared/epma-platform/controls-model/Orientation';
import { ObservationResultText } from '../viewmodel/ObservationChartDataVM';
import { GridViewCellClickEventArgs } from 'src/app/shared/epma-platform/controls/Control';
import { Type } from 'src/app/product/shared/models/Common';
import { LegendItemClickEvent, LineStyle, PlotAreaClickEvent, PlotAreaHoverEvent, Series, SeriesClickEvent, ValueAxis } from '@progress/kendo-angular-charts';
import { Resource } from '../resource';
import { ObservationResultTextChild } from '../child/observationresulttextchild';
import { DataBindingDirective } from '@progress/kendo-angular-grid';
import { PopupRef, PopupService } from '@progress/kendo-angular-popup';
import { MedsAdminObservationTooltip } from '../child/MedsAdminObservationTooltip';
import { SeriesOverEvent } from '@progress/kendo-angular-charts/events/series-over-event';
import { SeriesLeaveEvent } from '@progress/kendo-angular-charts/events/series-leave-event';
import { PlotAreaLeaveEvent } from '@progress/kendo-angular-charts/events/plot-area-leave-event';
import { Busyindicator } from 'src/app/lorappcommonbb/busyindicator';
@Component({
    selector: 'MedsAdminObservationView',
    templateUrl: './MedsAdminObservationView.html',
    styleUrls: ['./MedsAdminObservationView.css'], 
    encapsulation: ViewEncapsulation.None
})
  
    export class MedsAdminObservationView extends UserControl implements  OnInit, AfterViewInit  {
        @Input("DataContext") observationVM: ObservationChartVM;
        //medsAdminObservationChart: MedsAdminObservationChart = null;
        private sTitle: string;
        JSON: any;
        public layoutMarginWidth: number = 20;
        public kchart_ObsChartHeight: number = 250;
        public kchart_AdmChartHeight: number = 200;
        public kchart_popupRef: PopupRef;
        public kchart_constTooltipVisible: boolean = false;
        @ViewChild(DataBindingDirective) dataBinding: DataBindingDirective;


        public resKey = Resource.ObservationChartResource;

        private LayoutRoot: Grid;
        @ViewChild("LayoutRootTempRef", {read:Grid, static: false }) set _LayoutRoot(c: Grid){
            if(c){ this.LayoutRoot  = c; }
        };
        private ExampleRoot: Grid;
        @ViewChild("ExampleRootTempRef", {read:Grid, static: false }) set _ExampleRoot(c: Grid){
            if(c){ this.ExampleRoot  = c; }
        };
        private chkShowDataPoints: iCheckBox;
        @ViewChild("chkShowDataPointsTempRef", {read:iCheckBox, static: false }) set _chkShowDataPoints(c: iCheckBox){
            if(c){ this.chkShowDataPoints  = c; }
        };
        private chkGridLines: iCheckBox;
        @ViewChild("chkGridLinesTempRef", {read:iCheckBox, static: false }) set _chkGridLines(c: iCheckBox){
            if(c){ this.chkGridLines  = c; }
        };
        private chkReferenceRange: iCheckBox;
        @ViewChild("chkReferenceRangeTempRef", {read:iCheckBox, static: false }) set _chkReferenceRange(c: iCheckBox){
            if(c){ this.chkReferenceRange  = c; }
        };
        private lblPeriod: iLabel;
        @ViewChild("lblPeriodTempRef", {read:iLabel, static: false }) set _lblPeriod(c: iLabel){
            if(c){ this.lblPeriod  = c; }
        };
        private icboPeriod: iComboBox;
        @ViewChild("icboPeriodTempRef", {read:iComboBox, static: false }) set _icboPeriod(c: iComboBox){
            if(c){ this.icboPeriod  = c; }
        };
        private lblPeriodFrom: iLabel;
        @ViewChild("lblPeriodFromTempRef", {read:iLabel, static: false }) set _lblPeriodFrom(c: iLabel){
            if(c){ this.lblPeriodFrom  = c; }
        };
        idtpFromDate: iDateTimePicker;
        @ViewChild("idtpFromDateTempRef", {read:iDateTimePicker, static: false }) set _idtpFromDate(c: iDateTimePicker){
            if(c){ this.idtpFromDate  = c; }
        };
        private lblPeriodTo: iLabel;
        @ViewChild("lblPeriodToTempRef", {read:iLabel, static: false }) set _lblPeriodTo(c: iLabel){
            if(c){ this.lblPeriodTo  = c; }
        };
        idtpToDate: iDateTimePicker;
        @ViewChild("idtpToDateTempRef", {read:iDateTimePicker, static: false }) set _idtpToDate(c: iDateTimePicker){
            if(c){ this.idtpToDate  = c; }
        };
        private icmdGO: iButton;
        @ViewChild("icmdGOTempRef", {read:iButton, static: false }) set _icmdGO(c: iButton){
            if(c){ this.icmdGO  = c; }
        };
        /* private iMenuAction: iMenu;
        @ViewChild("iMenuActionTempRef", {read:iMenu, static: false }) set _iMenuAction(c: iMenu){
            if(c){ this.iMenuAction  = c; }
        }; */
        private DropDownArrow: Path;
        @ViewChild("DropDownArrowTempRef", {read:Path, static: false }) set _DropDownArrow(c: Path){
            if(c){ this.DropDownArrow  = c; }
        };
        private ChartLayoutRoot: Grid;
        @ViewChild("ChartLayoutRootTempRef", {read:Grid, static: false }) set _ChartLayoutRoot(c: Grid){
            if(c){ this.ChartLayoutRoot  = c; }
        };
        public ObsResGrid: GridExtension = new GridExtension();
        private grdData: GridExtension;
        @ViewChild("grdDataTempRef", {read:GridExtension, static: false }) set _grdData(c: GridExtension){
            if(c){ this.grdData  = c; }
        };
        private brdCancelledValues: Border;
        @ViewChild("brdCancelledValuesTempRef", {read:Border, static: false }) set _brdCancelledValues(c: Border){
            if(c){ this.brdCancelledValues  = c; }
        };
        private Displaycancelledvalues: iCheckBox;
        @ViewChild("DisplaycancelledvaluesTempRef", {read:iCheckBox, static: false }) set _Displaycancelledvalues(c: iCheckBox){
            if(c){ this.Displaycancelledvalues  = c; }
        };

        public lineStyle: LineStyle = "smooth";
        

        GetResourceString(sResource: string, sKey: string) {
            let oObservationChartResource: ObservationChartResource = new ObservationChartResource();
            return oObservationChartResource.GetResourceString(sKey);
        }

        public items: any;
        constructor(private popupService: PopupService) {
          super();
            //InitializeComponent();
            this.Loaded  = (s,e) => { this.MedsAdminObservationChartView_Loaded(s,e); } ;
        
            this.JSON = JSON;
            
        }
   
        ngOnInit(): void {
            this.observationVM.OnInitialize();
            //this.observationVM_GenerateTabview();
                this.observationVM.ObservationFocus  = (s,e,f,g) => { this.observationVM_ObservationFocus(s,e, f,g); } ;
                this.observationVM.GenerateTabview  = (s,e) => { this.observationVM_GenerateTabview(); } ;
                this.observationVM.PropertyChanged  = (s,e) => { this.observationVM.ObservationChartVM_PropertyChanged(s,e); this.obj_PropertyChanged(s,e); } ;
        }
        ngAfterViewInit() : void {
            this.idtpFromDate.RangeEndDate = CommonBB.GetServerDateTime().Date;
            this.idtpToDate.RangeEndDate = CommonBB.GetServerDateTime().DateTime.AddHours(23).AddMinutes(59).AddSeconds(59);
            
            this.MedsAdminObservationChartView_Loaded(null, null);
        }

        kchart_splitLongText(longText:string, len: number):string{
            if(longText.length>20){
                const splitTxt = longText.split(' ').reduce((acc, c) => {
                    const currIndex = acc.length - 1;
                    if(currIndex >= 0){
                        if(acc[currIndex].length + c.length + 1 > len){
                            acc.push(c)
                        } else{
                            acc[currIndex] = acc[currIndex] + " " + c;
                        }
                    }else{
                        acc.push(c);
                    }
                    
                    //const currIndex = acc.length - 1;

                    return acc;
                }, []).join("\n");
                return splitTxt;
                    
            }
            else{
                return longText;
            }
        }
        
  
        public getkGridColWidth(field: string): number{
            if(field == 'ItemName'){
                return 200;
            }else if(field == 'StatusDetails'){
                return 25;
            }else if(field == 'UOM'){
                return 150;
            }
            else if(field == '$$EMPTY__COL$$'){
                return 150;
            }else{
                return 150;
            }
        }
        public kchart_onLegendItemClick(e: LegendItemClickEvent): void {
            /* Do not hide the series on legend click */
            //e.preventDefault();
        
            /* Hide the series manually */
            //this.seriesVisible = !this.seriesVisible;
            this.kchart_close_constPop();
            if(e.series['yField'] !="admin"){
                if(this.observationVM.kchart_series_obs[e.series.index]){
                    this.observationVM.kchart_series_obs[e.series.index].visible = !e.series.visible;
                }
            }
            //console.log("we will have to show/hide this series axis" +!e.series.visible + " "+ e.series.name);
        }
        kchart_popCloseSubscribe() {
            if(this.kchart_popupRef){
                this.kchart_popupRef.popupClose.subscribe((val) => {
                    //console.log("kchart_popCloseSubscribe");
                    this.kchart_constTooltipVisible = false;
                });
            }
        }
        kchart_popOpenSubscribe() {
            if(this.kchart_popupRef){
                this.kchart_popupRef.popupOpen.subscribe((val) => {
                    //console.log("kchart_popOpenSubscribe");
                    this.kchart_constTooltipVisible = true;
                });
            }
        }
        kchart_seriesClick(e: SeriesClickEvent) {
            if(e.dataItem.type == "OBSERVATION"){
                //console.log('kchart_seriesClick');
                if (this.kchart_popupRef == null) {
                    let ptop = e.originalEvent.y;
                    let pleft = e.originalEvent.x;
                    //console.log(e.originalEvent.offsetY + '--' + e.originalEvent.offsetX);
                    //console.log(e.originalEvent.y + '--' + e.originalEvent.x);
                    //console.log(e.originalEvent.screenY + '--' + e.originalEvent.screenX);
                    //console.log(e.originalEvent.pageY + '--' + e.originalEvent.pageX);
                    this.kchart_popupRef = this.popupService.open({
                    content: MedsAdminObservationTooltip,
                    //anchor: eclone.originalEvent.srcElement,
                    offset: {
                        top: ptop + 10,
                        left: pleft + 10,
                    },
                    });
                    this.kchart_popupRef.content.instance.dataItem = e.dataItem;
                    this.kchart_popupRef.content.instance.lnkModify_Click_ee.subscribe((dataItem) => {
                        this.lnkModify_Click(dataItem);
                    });
                    this.kchart_popupRef.content.instance.lnkCancel_Click_ee.subscribe((dataItem) => {
                        this.lnkCancel_Click(dataItem);
                    });
                }
                this.kchart_popupRef.content.instance.showActionLinks = true;
                this.kchart_popCloseSubscribe();
                this.kchart_popOpenSubscribe();
                this.kchart_constTooltipVisible = true;
                
                this.kchart_popupRef.content.instance.lnkModify_Click_ee.subscribe((dataItem) => {
                    this.lnkModify_Click(dataItem);
                });
                this.kchart_popupRef.content.instance.lnkCancel_Click_ee.subscribe((dataItem) => {
                    this.lnkCancel_Click(dataItem);
                });
            }
            
        }

        kchart_seriesOver(e: SeriesOverEvent) {
            //console.log('kchart_seriesOver' + e.originalEvent.target.tagName);
            //console.log(e);!
            //let eclone = _.cloneDeep(e);
            if (!this.kchart_constTooltipVisible && e.originalEvent.target.tagName == 'circle') {
                if (this.kchart_popupRef) {
                    this.kchart_popupRef.close();
                    this.kchart_popupRef = null;
                }
                //let ptop = e.originalEvent.offsetY;
                //let pleft = e.originalEvent.offsetX;
                let ptop = e.originalEvent.y;
                let pleft = e.originalEvent.x;
                //console.log(e.originalEvent.offsetY + '--' + e.originalEvent.offsetX);
                //console.log(e.originalEvent.y + '--' + e.originalEvent.x);
                //console.log(e.originalEvent.screenY + '--' + e.originalEvent.screenX);
                //console.log(e.originalEvent.pageY + '--' + e.originalEvent.pageX);
                this.kchart_popupRef = this.popupService.open({
                content: MedsAdminObservationTooltip,
                //anchor: eclone.originalEvent.srcElement,
                offset: {
                    top: ptop + 10,
                    left: pleft + 10,
                },
                });
                this.kchart_popupRef.content.instance.dataItem = e.dataItem;
                this.kchart_popCloseSubscribe();
            }
        }
        kchart_seriesLeave(e: SeriesLeaveEvent) {
            //console.log('kchart_seriesLeave');
            //console.log(e);
            if (!this.kchart_constTooltipVisible) {
                if (this.kchart_popupRef) {
                    //console.log('kchart_seriesLeave --close');
                    this.kchart_popupRef.close();
                    this.kchart_popupRef = null;
                    this.kchart_constTooltipVisible = false;
                }
            }
        }
        kchart_plotAreaClick(e: PlotAreaClickEvent) {
            //console.log('kchart_plotAreaClick' + e.originalEvent.target.tagName);
            //console.log(e);
            if (this.kchart_popupRef && e.originalEvent.target.tagName != 'circle') {
                if (this.kchart_popupRef) {
                    //console.log('kchart_plotAreaClick --close');
                    this.kchart_popupRef.close();
                    this.kchart_popupRef = null;
                    this.kchart_constTooltipVisible = false;
                }
            }
            //this.kchart_constTooltipVisible = false;
        }
        kchart_plotAreaHover(e: PlotAreaHoverEvent) {
            //console.log('PlotAreaHoverEvent' + e.originalEvent.target.tagName);
            //console.log(e);
            if (!this.kchart_constTooltipVisible) {
                if (e.originalEvent.target.tagName != 'circle') {
                    
                    if (this.kchart_popupRef) {
                        //console.log('PlotAreaHoverEvent --close');
                        this.kchart_popupRef.close();
                        this.kchart_popupRef = null;
                        this.kchart_constTooltipVisible = false;
                    }
                }
            }
        }
        kchart_plotAreaLeave(e: PlotAreaLeaveEvent) {
            //console.log('kchart_plotAreaLeave');
            //console.log(e);
            if (!this.kchart_constTooltipVisible) {
                if (this.kchart_popupRef) {
                    //console.log('kchart_plotAreaLeave --close');
                    this.kchart_popupRef.close();
                    this.kchart_popupRef = null;
                    this.kchart_constTooltipVisible = false;
                }
           }
           //this.kchart_constTooltipVisible = false;
        }
        kchart_close_constPop(){
            if (this.kchart_popupRef) {
                this.kchart_popupRef.close();
                this.kchart_popupRef = null;
            }
        }
        public iskGridColLocked(field: string): boolean {
            if ((field == 'ItemName' || field == 'StatusDetails' || field == 'UOM' || field == '$$EMPTY__COL$$') && this.observationVM.kgrid_columns.length > 3 && this.observationVM.kgrid_data.length != 0) {
                return true;
            }
            else {
                return false;
            }


        }     

        MedsAdminObservationChartView_Loaded(sender: Object, e: RoutedEventArgs): void {
            if (this.observationVM == null) {
                this.observationVM = ObjectHelper.CreateType<ObservationChartVM>(this.DataContext, ObservationChartVM);
                this.observationVM_GenerateTabview();
                this.observationVM.ObservationFocus  = (s,e,f,g) => { this.observationVM_ObservationFocus(s,e, f,g); } ;
                this.observationVM.GenerateTabview  = (s,e) => { this.observationVM_GenerateTabview(); } ;
                this.observationVM.PropertyChanged  = (s,e) => { this.obj_PropertyChanged(s,e); } ;
            }
            this.InitializeChart();
            if (!this.observationVM.bIsAdminSameUOM && this.observationVM.bAdminMsgShow) {
                iMessageBox.Show("LORENZO", "Dose administered has values from different UOMs and hence cannot be plotted.", MessageBoxType.Information, MessageBoxButton.OK);
                this.observationVM.bAdminMsgShow = false;
            }
            if (!UserPermissions.CanViewObservations && UserPermissions.CanViewResults == true) {
                iMessageBox.Show("LORENZO", "You are viewing partial data as you don’t have permission for viewing observations.", MessageBoxType.Information, MessageBoxButton.OK);
            }
            else if (UserPermissions.CanViewObservations && UserPermissions.CanViewResults != true) {
                iMessageBox.Show("LORENZO", "You are viewing partial data as you don’t have permission for viewing results. ", MessageBoxType.Information, MessageBoxButton.OK);
            } 
            this.chkShowDataPoints.Focus();
        }
        private InitializeChart(): void {
            this.dataBinding.skip = 0;
            //this.medsAdminObservationChart = new MedsAdminObservationChart();
            /* if (this.observationVM == null) {
                this.observationVM = ObjectHelper.CreateType<ObservationChartVM>(this.DataContext, ObservationChartVM);
            } */
            //this.medsAdminObservationChart.DataContext = this.observationVM;
            /* if (this.ChartLayoutRoot.Children != null && this.ChartLayoutRoot.Children.Count() > 0)
                this.ChartLayoutRoot.Children.Clear();
            this.ChartLayoutRoot.Children.Add(this.medsAdminObservationChart);
            this.LayoutRoot.Visibility = Visibility.Visible; */
        }
        idtpFromDate_OnDateValueChanged(sender: Object, e: DateChangedArgs): void {
            if (this.idtpFromDate.SelectedDateTime.Date == DateTime.MinValue)
                this.idtpFromDate.SetDateString(String.Empty);
        }
        idtpToDate_OnDateValueChanged(sender: Object, e: DateChangedArgs): void {
            if (this.idtpToDate.SelectedDateTime.Date == DateTime.MinValue)
                this.idtpToDate.SetDateString(String.Empty);
        }
        obj_PropertyChanged(sender: Object, e: PropertyChangedEventArgs): void {
            this.kchart_close_constPop();
            //this.observationVM = ObjectHelper.CreateType<ObservationChartVM>(this.DataContext, ObservationChartVM); //Commented since observationVM is becoming null post this
            if (e.PropertyName == "RefreshChart") {
                this.InitializeChart();
            }
            if (e.PropertyName == "kgrid") {
                this.dataBinding.skip = 0;
            }
            
            /* if (e.PropertyName == "ShowReferenceRange") {
                this.medsAdminObservationChart.ShowReferenceRange();
            }
            if (e.PropertyName == "ShowDataPointLabel") {
                this.medsAdminObservationChart.ShowDataPointLabel();
            } */
        }
        private DisplayCancel_OnChange(sender: Object, e: PropertyChangedEventArgs): void {

        }
        observationVM_GenerateTabview(): void {
            let oGenLst: List<DateTime> = new List<DateTime>();
            this.observationVM.DynTabularviewData = new ObservableCollection<TabViewData>(this.observationVM.DynTabularviewData.OrderBy(x => x.DisplayOrder).ThenBy(x => x.DataPointName));
            if (this.Displaycancelledvalues.IsChecked == true) {
                this.observationVM.DynTabularviewData.forEach( (obsData)=> {
                    obsData.ObsDataPoints.forEach( (obsdp)=> {
                        if (!oGenLst.Contains(obsdp.RecDTTM)) {
                            oGenLst.Add(obsdp.RecDTTM);
                        }
                    });
                });
            }
            else {
                this.observationVM.DynTabularviewData.forEach( (obsData)=> {
                    obsData.ObsDataPoints.forEach( (obsdp)=> {
                        if (!oGenLst.Contains(obsdp.RecDTTM) && !obsdp.DataPointsCol.IsCancel) {
                            oGenLst.Add(obsdp.RecDTTM);
                        }
                    });
                });
            }
            if(this.grdData && this.grdData.Columns){
                let gridClnCnt: number = this.grdData.Columns.Count;
                if (gridClnCnt > 3) {
                    for (let ngrd: number = 3; ngrd < gridClnCnt; ngrd++) {
                        this.grdData.Columns.RemoveAt(this.grdData.Columns.Count - 1);
                    }
                }
                //oGenLst.Sort((x, y) => y.CompareTo(x));
                oGenLst.Sort();
                oGenLst.forEach( (dtcolval)=> {
                    /* let celltemplate: string = @"<DataTemplate  xmlns=""http://schemas.microsoft.com/winfx/2006/xaml/presentation""
                    xmlns: x = ""http://schemas.microsoft.com/winfx/2006/xaml""
                    xmlns: iSOFT = ""clr- namespace: assembly = LorArcBlueBirdInput"">
                        <StackPanel Orientation=""Horizontal"">
                            <iSOFT:iLabel this.Name= ""lblDoseValue"" Text= """" this.VerticalAlignment= ""Center"" this.Width= ""auto"" />
                                </StackPanel>
                                < /DataTemplate>"; */
                    let celltemplate: string = "";
                    let dtCellTemplate: DataTemplate = null //<DataTemplate>XamlReader.Load(celltemplate);
                    let icolumn: iGridViewDataColumn = new iGridViewDataColumn();
                    let isColExists: boolean = false;
                    for (let grd: number = 0; grd < this.grdData.Columns.Count; grd++) {
                        if (this.grdData.Columns[grd].Header != null) {
                            let tb: TextBlock = <TextBlock>this.grdData.Columns[grd].Header;
                            if (tb.Text.Contains("DST") && String.Compare(tb.Text, dtcolval.ToUserDateTimeString(CConstants.DateTimeFormat), StringComparison.InvariantCultureIgnoreCase) == 0)
                                isColExists = true;
                            else if (String.Compare(tb.Text, dtcolval.ToString(CConstants.DateTimeFormat), StringComparison.InvariantCultureIgnoreCase) == 0)
                                isColExists = true;
                        }
                    }
                    if (!isColExists) {
                        icolumn.IsReadOnly = true;
                        icolumn.Header = dtcolval.ToString("dd-MMM-yyyy") + " " + dtcolval.GetUserTime();
                        icolumn.UniqueName = dtcolval.ToString("dd-MMM-yyyy") + " " + dtcolval.GetUserTime();
                        icolumn.IsVisible = true;
                        icolumn.IsFilterable = false;
                        icolumn.IsResizable = false;
                        icolumn.CellTemplate = dtCellTemplate;
                        icolumn.MaxWidth = 220;
                        icolumn.MinWidth = 150;
                        this.grdData.Columns.Add(icolumn);
                    }
                });
            }
            //console.log("this.observationVM.DynTabularviewData :: " +this.observationVM.DynTabularviewData);
            this.icmdGO.IsEnabled = this.observationVM.GOButtonEnabled;
        }
        observationVM_ObservationFocus(PropertyName: string, sErrorTitle: string, sErrorMessage: string, bShowErrorMsg: boolean): void {
            let oiMessageBox: iMessageBox = new iMessageBox();
            oiMessageBox.Closed  = (s,e) => { this.oiMessageBox_Closed(s,e); } ;
            oiMessageBox.Title = "Lorenzo";
            oiMessageBox.IconType = MessageBoxType.Information;
            oiMessageBox.Message = sErrorMessage;
            switch (PropertyName) {
                case ("FromDate"):
                    oiMessageBox.Tag = "FromDate";
                    break;
                case ("ToDate"):
                    oiMessageBox.Tag = "ToDate";
                    break;
            }
            oiMessageBox.MessageButton = MessageBoxButton.OK;
            oiMessageBox.Show();
        }
        oiMessageBox_Closed(sender: Object, e: EventArgs): void {
            let oiMessageBox: iMessageBox = ObjectHelper.CreateType<iMessageBox>(sender, iMessageBox);
            if (oiMessageBox != null) {
                switch (oiMessageBox.Tag.ToString()) {
                    case ("FromDate"):
                        this.idtpFromDate.Focus();
                        this.icmdGO.IsEnabled = true;
                        break;
                    case ("ToDate"):
                        this.idtpToDate.Focus();
                        this.icmdGO.IsEnabled = true;
                        break;
                }
            }
        }
        private grdData_RowLoaded(sender: Object, e: RowLoadedEventArgs): void {
            if (e.Row != null && e.Row.Item != null) {
                if (e.Row.DataContext == null)
                    return
                let obsData: TabViewData = ObjectHelper.CreateType<TabViewData>(e.Row.DataContext, TabViewData);
                let sComUOM: string = String.Empty;
                let bUniqueUOM: boolean = true;
                let sTradingIcon: string = String.Empty;
                let bTradingIcon: boolean = false;
                for (let celcnt: number = 3; celcnt < e.Row.Cells.Count; celcnt++) {
                    if (e.Row.Cells[celcnt].DataColumn.Header != null) {
                        let tb: TextBlock = <TextBlock>e.Row.Cells[celcnt].DataColumn.Header;
                        if (celcnt == 3) {
                            let sStackPanel: StackPanel = <StackPanel>(e.Row.Cells[0].Content);
                            if (sStackPanel.Children[1] != null) {
                                let itemname: iLabel = <iLabel>sStackPanel.Children[0];
                                let sImage: Image = <Image>sStackPanel.Children[1];
                                if (String.Equals(itemname.Text, obsData.DataPointName) && obsData.DisplayOrder == 3 && !String.IsNullOrEmpty(obsData.DataPointName)) {
                                    let sTooltip: string[] = null;
                                    let MCtooltip: string = String.Empty;
                                    let tooltip: string = String.Empty;
                                    if (!String.IsNullOrEmpty(obsData.DataPointName)) {
                                        if (!String.IsNullOrEmpty(obsData.MCIToolTip)) {
                                            tooltip = obsData.MCIToolTip.Replace("^", "\n");
                                        }
                                        let name: string = String.Empty;
                                        if (!String.IsNullOrEmpty(obsData.MCIToolTip) && obsData.MCIToolTip.Contains("^")) {
                                            sTooltip = obsData.MCIToolTip.Split('^');
                                            let nToolTiplength: number = sTooltip.length;
                                            if (nToolTiplength > 0) {
                                                sImage.Visibility = Visibility.Visible;
                                                ToolTipService.SetToolTip(sImage, tooltip);
                                            }
                                            itemname.Text = obsData.DataPointName;
                                        }
                                        else {
                                            itemname.Text = obsData.DataPointName;
                                        }
                                        if (obsData.IsFlowrate) {
                                            if (!String.IsNullOrEmpty(obsData.FluidName))
                                                itemname.Text = itemname.Text + " " + ObservationChartResource.CONCATEITEMANDFLUID + " " + obsData.FluidName;
                                            else itemname.Text = itemname.Text;
                                            tooltip = itemname.Text;
                                        }
                                    }
                                    ToolTipService.SetToolTip(itemname, ObjectHelper.CreateObject(new iLabel(), { MaxWidth: 250, IsWordwrap: true, Text: itemname.Text }));
                                    itemname.IsWordwrap = true;
                                }
                            }
                        }
                        obsData.ObsDataPoints.forEach( (obsdp)=> {
                            if (String.Compare(tb.Text, obsdp.RecDTTM.ToUserDateTimeString(CConstants.DateTimeFormat), StringComparison.InvariantCultureIgnoreCase) == 0) {
                                let newstpnl: StackPanel = new StackPanel();
                                newstpnl.Orientation = Orientation.Horizontal;
                                newstpnl.HorizontalAlignment = this.HorizontalAlignment.Left;
                                newstpnl.VerticalAlignment = this.VerticalAlignment.Center;
                                if (String.Compare("Result", obsdp.DataPointsCol.Type, StringComparison.InvariantCultureIgnoreCase) == 0) {
                                    if (!String.IsNullOrEmpty(obsdp.DataPointsCol.Comments)) {
                                        let ibtnHypLinks: iButton = new iButton();
                                        ibtnHypLinks.ImageSource = "Component/images/comments.png"
                                        ibtnHypLinks.DisabledImageSource = "Component/images/comments.png"
                                        ibtnHypLinks.ActiveImageSource = "Component/images/comments.png"
                                        ibtnHypLinks.SelectedImageSource = "Component/images/comments.png"

                                        /* ibtnHypLinks.ImageSource = new BitmapImage(new Uri("/LorAppMedicationAdminBBUI_P2;Component/images/comments.png", UriKind.RelativeOrAbsolute));
                                        ibtnHypLinks.DisabledImageSource = new BitmapImage(new Uri("/LorAppMedicationAdminBBUI_P2;Component/images/comments.png", UriKind.RelativeOrAbsolute));
                                        ibtnHypLinks.ActiveImageSource = new BitmapImage(new Uri("/LorAppMedicationAdminBBUI_P2;Component/images/comments.png", UriKind.RelativeOrAbsolute));
                                        ibtnHypLinks.SelectedImageSource = new BitmapImage(new Uri("/LorAppMedicationAdminBBUI_P2;Component/images/comments.png", UriKind.RelativeOrAbsolute)); */
                                        ToolTipService.SetToolTip(ibtnHypLinks, ObjectHelper.CreateObject(new iLabel(), { MaxWidth: 250, IsWordwrap: true, Text: "Result comments are available, please click here to view the result details" }));
                                        ibtnHypLinks.DataContext = obsdp.DataPointsCol;
                                        ibtnHypLinks.Click  = (s,e) => { this.ibtnComments_Click(s,e); } ;
                                        newstpnl.Children.Add(ibtnHypLinks);
                                    }
                                    if (!String.IsNullOrEmpty(obsdp.DataPointsCol.Abnormaltooltip)) {
                                        let img1: Image = new Image();
                                        img1.Stretch = Stretch.None;
                                        img1.Source = new BitmapImage(new Uri("/LorAppMedicationAdminBBUI_P2;Component/images/abnormal.png", UriKind.RelativeOrAbsolute));
                                        ToolTipService.SetToolTip(img1, ObjectHelper.CreateObject(new iLabel(), { MaxWidth: 250, IsWordwrap: true, Text: obsdp.DataPointsCol.Abnormaltooltip }));
                                        newstpnl.Children.Add(img1);
                                    }
                                    if (String.Compare("Media", obsdp.DataPointsCol.Value, StringComparison.InvariantCultureIgnoreCase) == 0 || String.Compare("Text", obsdp.DataPointsCol.Value, StringComparison.InvariantCultureIgnoreCase) == 0) {
                                        let ibtnHypLinks: iHyperlinkButton = new iHyperlinkButton();
                                        ibtnHypLinks.Foreground = new SolidColorBrush(Colors.Black);
                                        ibtnHypLinks.VerticalAlignment = VerticalAlignment.Center;
                                        ibtnHypLinks.VerticalContentAlignment = VerticalAlignment.Center;
                                        ibtnHypLinks.DataContext = obsdp.DataPointsCol;
                                        ToolTipService.SetToolTip(ibtnHypLinks, ObjectHelper.CreateObject(new iLabel(), { MaxWidth: 250, IsWordwrap: true, Text: obsdp.DataPointsCol.RtypeToolTip }));
                                        ibtnHypLinks.Click  = (s,e) => { this.ibtnHypLinks_Click(s,e); } ;
                                        ibtnHypLinks.Content = obsdp.DataPointsCol.Value;
                                        newstpnl.Children.Add(ibtnHypLinks);
                                    }
                                    else {
                                        if (obsdp.DataPointsCol.Value != null) {
                                            let lbCellvalue: iLabel = new iLabel();
                                            lbCellvalue.Text = obsdp.DataPointsCol.Value.ToString();
                                            newstpnl.Children.Add(lbCellvalue);
                                            ToolTipService.SetToolTip(lbCellvalue, ObjectHelper.CreateObject(new iLabel(), { MaxWidth: 250, IsWordwrap: true, Text: lbCellvalue.Text }));
                                        }
                                    }
                                }
                                else if (String.Compare("Observation", obsdp.DataPointsCol.Type, StringComparison.InvariantCultureIgnoreCase) == 0) {
                                    if (String.Compare("Text", obsdp.DataPointsCol.ResultType, StringComparison.InvariantCultureIgnoreCase) == 0) {
                                        let ibtnHypLinks: iHyperlinkButton = new iHyperlinkButton();
                                        ibtnHypLinks.Foreground = new SolidColorBrush(Colors.Black);
                                        ibtnHypLinks.DataContext = obsdp.DataPointsCol;
                                        ibtnHypLinks.Content = obsdp.DataPointsCol.ResultType;
                                        ibtnHypLinks.Click  = (s,e) => { this.ibtnHypLinks_Click(s,e); } ;
                                        ToolTipService.SetToolTip(ibtnHypLinks, ObjectHelper.CreateObject(new iLabel(), { MaxWidth: 250, IsWordwrap: true, Text: obsdp.DataPointsCol.RtypeToolTip }));
                                        newstpnl.Children.Add(ibtnHypLinks);
                                    }
                                    else {
                                        let lbCellvalue: iLabel = new iLabel();
                                        lbCellvalue.Text = obsdp.DataPointsCol.Value.ToString();
                                        ToolTipService.SetToolTip(lbCellvalue, ObjectHelper.CreateObject(new iLabel(), { MaxWidth: 250, IsWordwrap: true, Text: lbCellvalue.Text }));
                                        newstpnl.Children.Add(lbCellvalue);
                                    }
                                }
                                else if (String.Compare("Admin", obsdp.DataPointsCol.Type, StringComparison.InvariantCultureIgnoreCase) == 0) {
                                    let lbCellvalue: iLabel = new iLabel();
                                    lbCellvalue.Text = obsdp.DataPointsCol.Value.ToString();
                                    lbCellvalue.Text = lbCellvalue.Text + " " + obsdp.DataPointsCol.UOM;
                                    ToolTipService.SetToolTip(lbCellvalue, ObjectHelper.CreateObject(new iLabel(), { MaxWidth: 250, IsWordwrap: true, Text: lbCellvalue.Text }));
                                    newstpnl.Children.Add(lbCellvalue);
                                }
                                else {
                                    let lbCellvalue: iLabel = new iLabel();
                                    lbCellvalue.Text = obsdp.DataPointsCol.Value.ToString();
                                    ToolTipService.SetToolTip(lbCellvalue, ObjectHelper.CreateObject(new iLabel(), { MaxWidth: 250, IsWordwrap: true, Text: lbCellvalue.Text }));
                                    newstpnl.Children.Add(lbCellvalue);
                                }
                                e.Row.Cells[celcnt].Content = newstpnl;
                            }
                            if (!String.IsNullOrEmpty(sComUOM)) {
                                if (String.Compare(sComUOM, obsdp.DataPointsCol.UOM, StringComparison.InvariantCultureIgnoreCase) == 0 && bUniqueUOM)
                                    sComUOM = obsdp.DataPointsCol.UOM;
                                else bUniqueUOM = false;
                            }
                            else {
                                sComUOM = obsdp.DataPointsCol.UOM;
                            }
                            if (obsdp.DataPointsCol.Type == "Results") {
                                if (!String.IsNullOrEmpty(sTradingIcon)) {
                                    if (String.Compare(sTradingIcon, obsdp.DataPointsCol.Resultenteredby, StringComparison.InvariantCultureIgnoreCase) != 0 && !bTradingIcon)
                                        bTradingIcon = true;
                                }
                                else {
                                    sTradingIcon = obsdp.DataPointsCol.Resultenteredby;
                                }
                            }
                        });
                    }
                }
                let ilblUOM: iLabel = <iLabel>e.Row.Cells[2].Content;
                if (!String.IsNullOrEmpty(sComUOM)) {
                    if (bUniqueUOM) {
                        ilblUOM.Text = sComUOM;
                    }
                    else if (String.Compare("Result", obsData.ObsDataPoints[0].DataPointsCol.Type, StringComparison.InvariantCultureIgnoreCase) == 0) {
                        ilblUOM.Text = "Result items have values from different UOM's. Hence it couldn't be displayed";
                        for (let celcnt: number = 3; celcnt < e.Row.Cells.Count; celcnt++) {
                            e.Row.Cells[celcnt].Width = 0.0;
                        }
                    }
                }
                else {
                    ilblUOM.Text = String.Empty;
                }
                ToolTipService.SetToolTip(ilblUOM, ObjectHelper.CreateObject(new iLabel(), { MaxWidth: 250, IsWordwrap: true, Text: ilblUOM.Text }));
                e.Row.Cells[2].Content = ilblUOM;
                if (bTradingIcon) {
                    let newstpnl: StackPanel = new StackPanel();
                    newstpnl.Orientation = Orientation.Horizontal;
                    let Imgicon: Image = new Image();
                    Imgicon.Stretch = Stretch.None;
                    Imgicon.Source = new BitmapImage(new Uri("/LorAppMedicationAdminBBUI_P2;component/Images/refrange.png", UriKind.RelativeOrAbsolute));
                    ToolTipService.SetToolTip(Imgicon, ObjectHelper.CreateObject(new iLabel(), { MaxWidth: 250, IsWordwrap: true, Text: "Results obtained from different trading partners" }));
                    newstpnl.Children.Add(Imgicon);
                    e.Row.Cells[1].Content = newstpnl;
                }
            }
        }
        async ibtnComments_Click(sender: Object, e: RoutedEventArgs): Promise<void> {
            this.kchart_close_constPop();
            let iBtnHypMedia: iButton = <iButton>e.OriginalSource;
            if (iBtnHypMedia.DataContext != null) {
                let data: Datapoints = <Datapoints>iBtnHypMedia.DataContext;
                this.observationVM = ObjectHelper.CreateType<ObservationChartVM>(this.DataContext, ObservationChartVM);
                if (data.Type == "Result") {
                    let returnValue: ScriptObject = <ScriptObject>(await HtmlPage.Window.InvokeAsync("LoadResultDetail", data.ResultTextMediaOID, PatientContext.PatientOID, data.ResultType, "Results", this.observationVM.OpenMode) as ScriptObject);;
                }
            }
        }
        async ibtnHypLinks_Click(data: Datapoints, e?: RoutedEventArgs ): Promise<void> {
            //let iBtnHypMedia: iHyperlinkButton = <iHyperlinkButton>e.OriginalSource;
            //if (iBtnHypMedia.DataContext != null) {
                //let data: Datapoints = <Datapoints>iBtnHypMedia.DataContext;
            this.kchart_close_constPop();

                this.sTitle = data.ResultName;
                if (data.Type == "Result") {
                    let returnValue: ScriptObject = <ScriptObject>(await HtmlPage.Window.InvokeAsync("LoadResultDetail", data.ResultTextMediaOID, PatientContext.PatientOID, data.ResultType, "Results", this.observationVM.OpenMode) as ScriptObject);
                }
                else {
                    let objtext: ObservationResultText = new ObservationResultText();
                    objtext.Title = "Observation";
                    objtext.Text = data.Value;
                    let obj: ObservationResultTextChild = new ObservationResultTextChild();
                    obj.objObserRsttext=objtext;
                    obj.onDialogClose = this.ObservationResultTextChild_Closed;
                    AppActivity.OpenWindow("Observation - " + this.sTitle, obj, this.ObservationResultTextChild_Closed, "Observation", false, 220, 330, false, WindowButtonType.Ok, null);
                }
            //}
        }
        private ObservationResultTextChild_Closed(args: AppDialogEventargs): void {
            args.AppChildWindow.DialogResult = true;
        }
        private grdData_onCellClick(sender: Object, args: GridViewCellClickEventArgs): void {
            let sCurrCol: string = args.ColumnCell.Column.UniqueName;
        }

        minValue(seriesItem, yField): number {
            const data = seriesItem.data;
            if (data && data.length > 0) {
              const minValues = data.map(item => item[yField])
                .filter(value => typeof value === 'number' && !isNaN(value));              
            if (minValues.length > 0) {
                const minValue = Math.min(...minValues);
                return minValue - 1;
              }
            }          
            return 0; 
          }     

          maxValue(seriesItem, yField): number {
            const data = seriesItem.data;
            if (data && data.length > 0) {
              const maxValues = data.map(item => item[yField])
                .filter(value => typeof value === 'number' && !isNaN(value));
            if (maxValues.length > 0) {
                const maxValue = Math.max(...maxValues);
                return maxValue + 1;
              }
            }
            return null;
          }

        async lnkCancel_Click(dataItem): Promise<void> {
            this.kchart_close_constPop();
            var oParam: string[] = new Array(8);
            if (dataItem.EncounterOID > 0) {
                oParam[0] = dataItem.EncounterOID.ToString();
            }
            else {
                oParam[0] = PatientContext.EncounterOid.ToString();
            }
            oParam[1] = dataItem.ObsName;
            oParam[2] = "";
            oParam[3] = dataItem.ItemName;
            oParam[4] = "CANCEL";
            oParam[5] = dataItem.FormOID.ToString();
            oParam[6] = this.observationVM.OpenMode;
            if (dataItem.PatientOID > 0) {
                oParam[7] = dataItem.PatientOID.ToString();
            }
            else {
                oParam[7] = PatientContext.PatientOID.ToString();
            }
            var returnValue: ScriptObject = <ScriptObject>(await HtmlPage.Window.InvokeAsync("LoadObservationForm", oParam[0], oParam[1], oParam[2], oParam[3], oParam[4], oParam[5], oParam[6], oParam[7]) as ScriptObject);
            if (this.observationVM != null && returnValue != null) {
                ObservationChartVM.CACHANGE = "NONE";
                this.observationVM.objGraphType = new GraphType();
                this.observationVM.objGraphType.GraphData = new ObservableCollection<DataSeries>();
                this.observationVM.DynTabularviewData = new ObservableCollection<TabViewData>();
                this.observationVM.SetDateRange(true);
                this.observationVM.IsEnableDataPoint = this.observationVM.IsEnableGridLine = this.observationVM.IsEnableDisplaycancelledvalue = this.observationVM.IsEnableReferencerange = false;
                this.observationVM.IsEnteredObsResult = true;
                this.observationVM.GetDetails();
            }
            //this.IsPopUpOpened();
        }
        async lnkModify_Click(dataItem): Promise<void> {
            this.kchart_close_constPop();
            var oParam: string[] = new Array(8);
            if (dataItem.EncounterOID > 0) {
                oParam[0] = dataItem.EncounterOID.ToString();
            }
            else {
                oParam[0] = PatientContext.EncounterOid.ToString();
            }
            oParam[1] = dataItem.ObsName;
            oParam[2] = "";
            oParam[3] = dataItem.ItemName;
            oParam[4] = "MODIFY";
            oParam[5] = dataItem.FormOID.ToString();
            oParam[6] = this.observationVM.OpenMode;
            if (dataItem.PatientOID > 0) {
                oParam[7] = dataItem.PatientOID.ToString();
            }
            else {
                oParam[7] = PatientContext.PatientOID.ToString();
            }

            var returnValue: ScriptObject = <ScriptObject>(await HtmlPage.Window.InvokeAsync("LoadObservationForm", oParam[0], oParam[1], oParam[2], oParam[3], oParam[4], oParam[5], oParam[6], oParam[7]) as ScriptObject);
            if (this.observationVM != null) {
                ObservationChartVM.CACHANGE = "NONE";
                this.observationVM.objGraphType = new GraphType();
                this.observationVM.objGraphType.GraphData = new ObservableCollection<DataSeries>();
                this.observationVM.DynTabularviewData = new ObservableCollection<TabViewData>();
                this.observationVM.SetDateRange(true);
                this.observationVM.IsEnableDataPoint = this.observationVM.IsEnableGridLine = this.observationVM.IsEnableDisplaycancelledvalue = this.observationVM.IsEnableReferencerange = false;
                this.observationVM.IsEnteredObsResult = true;
                this.observationVM.GetDetails();
            }
            //this.IsPopUpOpened();
        }
        public async  iMenuItem_Click(menuItem: kMenu_MenuItem): Promise<void> {
            this.kchart_close_constPop();
            if(menuItem.Type != "Request" && menuItem.Type != "Observation"){
                return
            }
            //let headerControl; //: HeaderedItemsControl = ObjectHelper.CreateType<HeaderedItemsControl>(e.OriginalSource, Telerik.Windows.Controls.HeaderedItemsControl);
            //let headerType: Type = headerControl.Header.GetType();
            //if (headerType != typeof(MenuItem))
                //return
            //let menuItem: MenuItem = <MenuItem>headerControl.Header;
            if (((String.Compare(menuItem.Type, "Request", StringComparison.InvariantCultureIgnoreCase) == 0) && !UserPermissions.CanEnterResults) || ((String.Compare(menuItem.Type, "observation", StringComparison.InvariantCultureIgnoreCase) == 0) && !UserPermissions.CanEnterObservations)) {
            
                iMessageBox.Show("LORENZO", "You do not have permission to perform this activity", MessageBoxType.Information, MessageBoxButton.OK);
            }
            else {

                
                //this.observationVM = ObjectHelper.CreateType<ObservationChartVM>(this.DataContext, ObservationChartVM);
                let RequestCode: string = String.Empty;
                let sArgs: string = String.Empty;
                let oParam: string[] = new Array(8);
                oParam[0] = PatientContext.EncounterOid.ToString();
                oParam[1] = menuItem.Name;
                oParam[2] = menuItem.Version.ToString();
                oParam[3] = menuItem.DisplayName;
                oParam[4] = "INSERT";
                oParam[5] = "";
                oParam[6] = this.observationVM.OpenMode;
                oParam[7] = PatientContext.PatientOID.ToString();
                if (menuItem.Type == "Request" && menuItem.DisplayName == "ALL")
                    RequestCode = this.observationVM.RequestItemCodes.ToString();
                else RequestCode = menuItem.Code.ToString();
                if (menuItem.Type == "Observation") {
                    //var returnValue: ScriptObject = <ScriptObject>(await HtmlPage.Window.InvokeAsync("SFSCareProvider", this.oParam) as ScriptObject);
                    let returnValue: ScriptObject = <ScriptObject>(await HtmlPage.Window.InvokeAsync("LoadObservationForm", oParam[0], oParam[1], oParam[2], oParam[3], oParam[4], oParam[5], oParam[6], oParam[7]) as ScriptObject);
                    if (this.observationVM != null && returnValue != null) {
                        ObservationChartVM.CACHANGE = "NONE";
                        this.observationVM.objGraphType = new GraphType();
                        this.observationVM.objGraphType.GraphData = new ObservableCollection<DataSeries>();
                        this.observationVM.DynTabularviewData = new ObservableCollection<TabViewData>();
                        this.observationVM.SetDateRange(true);
                        this.observationVM.IsEnableDataPoint = this.observationVM.IsEnableGridLine = this.observationVM.IsEnableDisplaycancelledvalue = this.observationVM.IsEnableReferencerange = false;
                        this.observationVM.IsEnteredObsResult = true;
                        this.observationVM.GetDetails();
                    }
                }
                else {
                    sArgs = "&WFPATIENTOID=" + PatientContext.PatientOID + "&RequestItemOID=" + RequestCode + "&CACode=IPPMA&WFENCOUNTEROID=" + PatientContext.EncounterOid;
                    this.observationVM.LaunchWizard("T2145", sArgs);
                }
            }
        }
        public chkDisplaycancelledvalues(sender: Object, e: RoutedEventArgs): void {
            this.kchart_close_constPop();
            this.observationVM_GenerateTabview();
        }
        public icmdGO_Click(sender?: Object, e?: RoutedEventArgs): void {
             
        if ((this.observationVM.DynTabularviewData.Length <= 0) || (this.observationVM.Period == "CC_CUSTOM") ) {
            this.observationVM.OnGoButtonClick();
            this.icmdGO.IsEnabled = true;
            }
            else{
                BusyIndicator.SetStatusBusy("ObsChartLoad");
                this.kchart_close_constPop();
                this.icmdGO.IsEnabled = this.observationVM.GOButtonEnabled;
                this.observationVM.OnGoButtonClick();
            }
            
        }
       
    }
    export class MyExtented {
        public static ForEach<T>(source: IEnumerable<T>, act: (_: T) => void): IEnumerable<T> {
            source.forEach( (element)=> { act(element); });
            return source;
        }
    }
