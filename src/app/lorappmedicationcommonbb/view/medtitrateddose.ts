import { Component, OnInit, ViewChild } from '@angular/core';
import { StringBuilder, ProfileFactoryType, ContextManager, Convert, AppActivity } from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp, Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison, AppDialogEventargs, AppDialogResult, DelegateArgs, DialogComponentArgs, WindowButtonType, iAppDialogWindow, Visibility } from 'epma-platform/models';
import { AppDialog, DataTemplate, iLabel, StackPanel } from 'epma-platform/controls';
import { HelperService } from 'epma-platform/soapclient';
import '../../shared/epma-platform/models/string.extensions';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
import { RoutedEventArgs } from 'src/app/shared/epma-platform/controls/FrameworkElement';
import { MultipleDoseDetail } from '../viewmodel/prescriptionitemdetailsvm';
import { ScheduleDetailsVM } from '../viewmodel/scheduledetailsvm';
//import { StackPanel } from 'src/app/shared/epma-platform/controls-model/StackPanel';
import { Binding, BindingMode, ToolTipService } from 'epma-platform/controls';
//import { SortDescriptor } from '@progress/kendo-data-query/dist/npm/sort-descriptor';
import { Grid, GridExtension, iGridViewDataColumn } from 'src/app/shared/epma-platform/controls/epma-grid-helpers/grid-extension';
import { Orientation } from 'src/app/shared/epma-platform/controls-model/Orientation';
import { GridComponent } from '@progress/kendo-angular-grid';
import { Resource } from '../resource';
//import { Binding, BindingMode, Border, DataTemplate, iLabel, StackPanel, UserControl } from 'epma-platform/controls';
export enum ListSortDirection
{
    //
    // Summary:
    //     Sorts in ascending order.
    Ascending = 0,
    //
    // Summary:
    //     Sorts in descending order.
    Descending = 1
}
export class SortDescriptor
{
    Member: string;
    SortDirection: number | ListSortDirection;
}
@Component({ 
    selector: 'MedTitratedDose', 
    templateUrl: './MedTitratedDose.html',
    styleUrls: ['./medtitrateddose.css'] 
})
export class MedTitratedDose extends iAppDialogWindow {
    private Titrateddose: Grid;    
    public steppeddose = Resource.steppeddose;
    @ViewChild("TitrateddoseTempRef", { read: Grid, static: false }) set _Titrateddose(c: Grid) {
        if (c) { this.Titrateddose = c; }
    };
    private lblTitrateddose: iLabel;
    @ViewChild("lblTitrateddoseTempRef", { read: iLabel, static: false }) set _lblTitrateddose(c: iLabel) {
        if (c) { this.lblTitrateddose = c; }
    };
    public afterViewInitColumnLoaded = false;
    public grdTitratedDose: GridExtension = new GridExtension();
    @ViewChild("grdTitratedDoseTempRef", { read: GridComponent, static: false }) set _grdTitratedDose(c: GridComponent) {
        if (c) { 
            this.grdTitratedDose.grid = c;
            this.grdTitratedDose.columns = c.columns;
            //this.grdTitratedDose.ItemsSourceData = c.data;
            if (this.afterViewInitColumnLoaded)
            {
                this.grdTitratedDose.GenerateColumns();
            }
         }
    };
    
    IsDST: boolean = false; IsAmbiguous: boolean = false; IsInvalid: boolean = false;
    public descriptor: SortDescriptor = new SortDescriptor();
    ngAfterViewInit(): void {
        this.grdTitratedDose.GenerateColumns();
        this.afterViewInitColumnLoaded = true;    
        this.MedTitratedDose_Loaded(null, null);
        this.descriptor.Member = 'ScheduleTime';
        this.descriptor.SortDirection = 0;
        this.grdTitratedDose.SortDescriptors.Add(this.descriptor);        
    }
    constructor() {
        super();
        //InitializeComponent();
        // this.Loaded = (s, e) => { this.MedTitratedDose_Loaded(s, e); };
    }
    MedTitratedDose_Loaded(sender: Object, e: RoutedEventArgs): void {
        if (this.DataContext != null) {
            let oTitrateddose: MultipleDoseDetail = ObjectHelper.CreateType<MultipleDoseDetail>(this.DataContext, MultipleDoseDetail);
            if (oTitrateddose != null && oTitrateddose.StepDoseGridColms != null && oTitrateddose.StepDoseGridColms.Count > 0) {
                let durationUOM: string = String.Empty;
                if (oTitrateddose.StepDoseGridColms[0].DurationUOM != null) {
                    durationUOM = oTitrateddose.StepDoseGridColms[0].DurationUOM.Value;
                }
                let ScheduleDetails: ScheduleDetailsVM = ObjectHelper.CreateObject(new ScheduleDetailsVM(), {
                    GrdData: oTitrateddose.StepDoseGridColms[0].ScheduleDetailsData,
                    DurationValue: oTitrateddose.StepDoseGridColms[0].Duration,
                    DurationUOM: durationUOM,
                    StartDate: oTitrateddose.StepDoseGridColms[0].StartDTTM,
                    EndDate: oTitrateddose.StepDoseGridColms[0].EndDTTM,
                    IsDaywiseView: oTitrateddose.StepDoseGridColms[0].IsDaywiseView,
                    IsReadOnly: true
                });
                this.grdTitratedDose.DataContext = ScheduleDetails;
                this.grdTitratedDose.ItemsSource = ScheduleDetails.GrdData;
                this.GenarateColumn(ScheduleDetails);
                let descriptor: SortDescriptor = new SortDescriptor();
                descriptor.Member = "ScheduleTime";
                descriptor.SortDirection = ListSortDirection.Ascending;
                this.grdTitratedDose.SortDescriptors.Add(descriptor);
            }
        }
    }   

    public ScrollN:string="";
    private GenarateColumn(ScheduleDetails: ScheduleDetailsVM): void {
        let ChangedDoseScheduleDetails: ScheduleDetailsVM = ScheduleDetails;
        if (ChangedDoseScheduleDetails == null)
            return
        ChangedDoseScheduleDetails.DaywiseVisibility = Visibility.Collapsed;
        let i: number = 1;
        this.grdTitratedDose.Columns[1].Header = ChangedDoseScheduleDetails.StartDate.ConvertToUser((o1) => { this.IsDST = o1; }, (o2) => { this.IsAmbiguous = o2; }, (o3) => { this.IsInvalid = o3; }).ToString("dd-MMM-yyyy");
        ChangedDoseScheduleDetails.StartDate = ChangedDoseScheduleDetails.StartDate.AddDays(1);
        while (DateTime.LessThanOrEqualTo(ChangedDoseScheduleDetails.StartDate.Date, ChangedDoseScheduleDetails.EndDate.Date)) {
            if (ChangedDoseScheduleDetails.GrdData != null && ChangedDoseScheduleDetails.GrdData[0].ScheduleDate.Length == i)
                break;
            if (DateTime.Equals(ChangedDoseScheduleDetails.StartDate.Date, ChangedDoseScheduleDetails.GrdData[0].ScheduleDate[i].Date)) {
           // if (ChangedDoseScheduleDetails.StartDate.Date.Equals(ChangedDoseScheduleDetails.GrdData[0].ScheduleDate[i].Date)) {
                let celltemplate: string = String.Empty;
                let ct =new  DataTemplate();
                if (ChangedDoseScheduleDetails.GrdData[0].IsSavedData)
                 {                  
                    let sp = new StackPanel();
                    let lbl=new iLabel();
                    lbl.isAfterViewInitRequired = false;
                    lbl.Name="lblDoseValue";
                    lbl.VerticalAlignment="Center";
                    let bindLbl = new Binding();
                    bindLbl.Mode = BindingMode.OneWay;
                    bindLbl.Path = `ScheduleDoseValue[${i}]`;
                    bindLbl.PathObject = undefined;
                    lbl.SetBinding(iLabel.TextProperty, bindLbl);
                    lbl.Text= ChangedDoseScheduleDetails.GrdData[0].ScheduleDoseValue[i];
                    //lbl.BindingPath= "ScheduleDoseValue[" + i + "]";
                    //lbl.Text = "";
                    //lbl.ToolTip= "ScheduleDoseValue["+ i +"]"; //ChangedDoseScheduleDetails.GrdData[0].ScheduleDoseValue[i];
                    lbl.Width="auto";
                    sp.Children.Add(lbl);
                    sp.Orientation=Orientation.Horizontal;
                    ct.Content=sp;

                    // celltemplate = @"<DataTemplate  xmlns=""http://schemas.microsoft.com/winfx/2006/xaml/presentation""
                    // xmlns: x = ""http://schemas.microsoft.com/winfx/2006/xaml""
                    // xmlns: iSOFT = ""clr - namespace: assembly = LorArcBlueBirdInput"" >
                    //     <StackPanel Orientation=""Horizontal"" >
                    //         <iSOFT:iLabel Name = ""lblDoseValue"" VerticalAlignment = ""Center"" Text = ""{Binding ScheduleDoseValue[" + i + @"] } "" ToolTipService.ToolTip = ""{Binding ScheduleDoseValue[" + i + @"] } "" Width = ""auto"" />
                    //             </StackPanel>
                    //             < /DataTemplate>";
                }
                else {
                    let sp = new StackPanel();
                    let lbl=new iLabel();
                    lbl.isAfterViewInitRequired = false;
                    lbl.Name="lblDoseValue";
                    lbl.VerticalAlignment="Center";
                    lbl.Name="lblDoseValue";
                    lbl.VerticalAlignment="Center";
                    let bindLbl = new Binding();
                    bindLbl.Mode = BindingMode.OneWay;
                    bindLbl.Path = `ScheduleDoseValue[${i}]`;
                    bindLbl.PathObject = undefined;
                    lbl.SetBinding(iLabel.TextProperty, bindLbl);
                    lbl.Text= ChangedDoseScheduleDetails.GrdData[0].ScheduleDoseValue[i]; //"ScheduleDoseValue[ i ]";
                    //lbl.Text= "ScheduleDoseValue[" + i + "]";
                    //lbl.BindingPath= "ScheduleDoseValue[" + i + "]";
                    //lbl.Text = "";
                    //lbl.ToolTip= ChangedDoseScheduleDetails.GrdData[0].ScheduleDoseValue[i]; //"ScheduleDoseValue[ i]";
                    //lbl.ToolTip= "ScheduleDoseValue["+ i + "]";
                    lbl.Width="auto";
                    sp.Children.Add(lbl);
                    let lbl1=new iLabel();
                    lbl1.isAfterViewInitRequired = false;
                    lbl1.Name="lblDoseUOM";
                    lbl1.HorizontalAlignment="Stretch"
                    lbl1.VerticalAlignment="Center";
                    let bindLbl1 = new Binding();
                    bindLbl1.Mode = BindingMode.OneWay;
                    bindLbl1.Path = `ScheduleDoseUOMs[${i}]`;
                    bindLbl1.PathObject = undefined;
                    lbl1.SetBinding(iLabel.TextProperty, bindLbl1);
                    lbl1.Text= ChangedDoseScheduleDetails.GrdData[0].ScheduleDoseUOMs[i];
                    //lbl1.Text= ChangedDoseScheduleDetails.GrdData[0].ScheduleDoseUOMs[i];//"ScheduleDoseUOMs[ i ]";
                    //lbl1.Text= "ScheduleDoseUOMs["+ i + "]";
                    // lbl1.BindingPath= "ScheduleDoseUOMs["+ i + "]";
                    //lbl1.Text = "";
                    //lbl1.ToolTip= "ScheduleDoseUOMs["+ i + "]";
                    lbl1.Width="auto";
                    sp.Children.Add(lbl1);
                    sp.Orientation=Orientation.Horizontal;
                    ct.Content=sp;

                    // celltemplate = @"<DataTemplate  xmlns=""http://schemas.microsoft.com/winfx/2006/xaml/presentation""
                    // xmlns: x = ""http://schemas.microsoft.com/winfx/2006/xaml""
                    // xmlns: iSOFT = ""clr - namespace: assembly = LorArcBlueBirdInput"" >
                    //     <StackPanel Orientation=""Horizontal"" >
                    //         <iSOFT:iLabel Name = ""lblDoseValue"" VerticalAlignment = ""Center"" Text = ""{Binding ScheduleDoseValue[" + i + @"] } "" ToolTipService.ToolTip = ""{Binding ScheduleDoseValue[" + i + @"] } "" Width = ""auto"" />
                    //             <iSOFT:iLabel HorizontalAlignment = ""Stretch"" Name = ""lblDoseUOM"" VerticalAlignment = ""Center"" Text = ""{Binding ScheduleDoseUOMs[" + i + @"] } "" ToolTipService.ToolTip = ""{Binding ScheduleDoseUOM } "" Width = ""auto"" />
                    //                 </StackPanel>
                    //                 < /DataTemplate>";
                }
                //let dtCellTemplate: DataTemplate = <DataTemplate>XamlReader.Load(celltemplate);
                let icolumn: iGridViewDataColumn = new iGridViewDataColumn();
                icolumn.IsReadOnly = ChangedDoseScheduleDetails.IsReadOnly;
                icolumn.Header = ChangedDoseScheduleDetails.StartDate.ConvertToUser((o1) => { this.IsDST = o1; }, (o2) => { this.IsAmbiguous = o2; }, (o3) => { this.IsInvalid = o3; }).ToString("dd-MMM-yyyy");
                icolumn.IsVisible = true;
                icolumn.IsFilterable = false;
                icolumn.IsReadOnly = true;
                //icolumn.CellTemplate = dtCellTemplate;
                icolumn.CellTemplate = ct;
                i++;
                this.grdTitratedDose.dColumns.Add(icolumn);
            }
            ChangedDoseScheduleDetails.StartDate = ChangedDoseScheduleDetails.StartDate.AddDays(1);
            this.ScrollN=(this.grdTitratedDose.dColumns.Count>1)?"KendoScroll":"";
        }
        /*
        switch (this.grdTitratedDose.Columns.Count) {
            case 2:
                this.grdTitratedDose.Columns[0].Width = new GridViewLength(0.2, GridViewLengthUnitType.Star);
                this.grdTitratedDose.Columns[1].Width = new GridViewLength(0.7, GridViewLengthUnitType.Star);
                break;
            case 3:
                this.grdTitratedDose.Columns[0].Width = new GridViewLength(0.2, GridViewLengthUnitType.Star);
                this.grdTitratedDose.Columns[1].Width = new GridViewLength(0.4, GridViewLengthUnitType.Star);
                this.grdTitratedDose.Columns[2].Width = new GridViewLength(0.4, GridViewLengthUnitType.Star);
                break;
        }
        */
    }
    private cmdClose_Click(sender: Object, e: RoutedEventArgs): void {

    }
}