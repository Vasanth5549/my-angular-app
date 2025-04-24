import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { CListItem, ObservableCollection } from 'epma-platform/models';
import { Binding, BindingMode, Border, DataTemplate, iLabel, StackPanel, UserControl } from 'epma-platform/controls';
import '../../shared/epma-platform/models/string.extensions';
import { TitratedDoseCommonVM } from '../viewmodel/TitratedDoseDetailsCommonVM';
import { steppeddose } from '../resource/steppeddose.designer';
import { TitratedDoseInstructions } from '../utilities/profiledata';
import { Grid, GridExtension, iGridViewDataColumn } from 'src/app/shared/epma-platform/controls/epma-grid-helpers/grid-extension';  
import { GridComponent } from '@progress/kendo-angular-grid';
import { Environment } from 'src/app/product/shared/models/Common';
import { Orientation } from 'src/app/shared/epma-platform/controls-model/Orientation';
import { Resource } from '../resource';
import * as ControlStyles from "../../shared/epma-platform/controls/ControlStyles";
import { DayOfWeek } from 'epma-platform/services';
@Component({ 
    selector: 'MedTitratedDoseChild', 
    templateUrl: './MedTitratedDoseChild.html',
    styleUrls: ['./medtitrateddosechild.css'] 
})
    export class MedTitratedDoseChild extends UserControl implements AfterViewInit {
    public steppeddose = Resource.steppeddose;
    public Styles = ControlStyles;

    public grdMedTitratedParent: Grid;
    @ViewChild("grdMedTitratedParentTempRef", { read: Grid, static: false }) set _grdMedTitratedParent(c: Grid) {
        if (c) { this.grdMedTitratedParent = c; }
    };
    public DTitratedDoseBorder: Border;
    @ViewChild("DTitratedDoseBorderTempRef", { read: Border, static: false }) set _DTitratedDoseBorder(c: Border) {
        if (c) { this.DTitratedDoseBorder = c; }
    };
    public grdMedTitratedDose: Grid;
    @ViewChild("grdMedTitratedDoseTempRef", { read: Grid, static: false }) set _grdMedTitratedDose(c: Grid) {
        if (c) { this.grdMedTitratedDose = c; }
    };
    public TitratedDosedetails: Grid;
    @ViewChild("TitratedDosedetailsTempRef", { read: Grid, static: false }) set _TitratedDosedetails(c: Grid) {
        if (c) { this.TitratedDosedetails = c; }
    };
    public lblTitrateddose: iLabel = new iLabel();
    @ViewChild("lblTitrateddoseTempRef", { read: iLabel, static: false }) set _lblTitrateddose(c: iLabel) {
        if (c) { this.lblTitrateddose = c; }
    };
    public afterViewInitColumnLoaded = false;
    public grdTitratedDose: GridExtension =new GridExtension();
    @ViewChild("grdTitratedDoseTempRef", { read: GridComponent, static: false }) set _grdTitratedDose(c: GridComponent) {
        if (c) { this.grdTitratedDose.grid = c; 
                 this.grdTitratedDose.columns = c.columns;
                 if (this.afterViewInitColumnLoaded)
                 {
                    this.grdTitratedDose.GenerateColumns();
                 }
        }
    };
    // public TitratedDoseDetails: Grid;
    // @ViewChild("TitratedDoseDetailsTempRef", { read: Grid, static: false }) set _TitratedDoseDetails(c: Grid) {
    //     if (c) { this.TitratedDoseDetails = c; }
    // };
    public lblTitrDoseInstr: iLabel;
    @ViewChild("lblTitrDoseInstrTempRef", { read: iLabel, static: false }) set _lblTitrDoseInstr(c: iLabel) {
        if (c) { this.lblTitrDoseInstr = c; }
    };
    public lblTitrDoseInstrData: iLabel;
    @ViewChild("lblTitrDoseInstrDataTempRef", { read: iLabel, static: false }) set _lblTitrDoseInstrData(c: iLabel) {
        if (c) { this.lblTitrDoseInstrData = c; }
    };
    public lblTitrDoseAddnlComments: iLabel;
    @ViewChild("lblTitrDoseAddnlCommentsTempRef", { read: iLabel, static: false }) set _lblTitrDoseAddnlComments(c: iLabel) {
        if (c) { this.lblTitrDoseAddnlComments = c; }
    };
    public lblTitrDoseAddnlCommentsVal: iLabel;
    @ViewChild("lblTitrDoseAddnlCommentsValTempRef", { read: iLabel, static: false }) set _lblTitrDoseAddnlCommentsVal(c: iLabel) {
        if (c) { this.lblTitrDoseAddnlCommentsVal = c; }
    };
        @Input() oTitratedDoseCommonVM: TitratedDoseCommonVM;
        ngAfterViewInit(): void {
            this.constructorImpl(this.oTitratedDoseCommonVM);  
            this.grdTitratedDose.GenerateColumns();
            this.afterViewInitColumnLoaded = true;            
        }
        constructor(oLocTitratedDoseCommonVM: TitratedDoseCommonVM) {
        //constructor() {
        super();
        this.oTitratedDoseCommonVM = oLocTitratedDoseCommonVM;
        // InitializeComponent();
        //Below code moved to constructorImpl
            // if (oLocTitratedDoseCommonVM.InputPrescriptionItemOID > 0) {
            //     this.oTitratedDoseCommonVM = new TitratedDoseCommonVM();
            //     this.oTitratedDoseCommonVM.LoadGridData = (s, e) => { this.oTitratedDoseCommonVM_LoadGridData(); };
            //     this.oTitratedDoseCommonVM.PrescriptionItemOID = oLocTitratedDoseCommonVM.InputPrescriptionItemOID;
            //     this.oTitratedDoseCommonVM.PresType = oLocTitratedDoseCommonVM.PresType;
            //     this.oTitratedDoseCommonVM.Startdttm = oLocTitratedDoseCommonVM.Startdttm;
            // }
            // else {
            //     this.oTitratedDoseCommonVM = oLocTitratedDoseCommonVM;
            //     this.oTitratedDoseCommonVM.LoadGridData = (s, e) => { this.oTitratedDoseCommonVM_LoadGridData(); };
            //     this.oTitratedDoseCommonVM.LoadData();
            // }
            // this.DataContext = this.oTitratedDoseCommonVM;
            // this.grdTitratedDose.DataContext = this.oTitratedDoseCommonVM.GrdTitrated;
            // this.grdTitratedDose.ItemsSource = this.oTitratedDoseCommonVM.GrdTitrated;
        }
        // MedTitratedDoseChildw_UnLoaded(sender: Object, e: RoutedEventArgs): void {
        // //this.oTitratedDoseCommonVM.LoadGridData -= this.oTitratedDoseCommonVM_LoadGridData;
        // }
        public constructorImpl(oLocTitratedDoseCommonVM: TitratedDoseCommonVM){
            if (oLocTitratedDoseCommonVM.InputPrescriptionItemOID > 0) {
                this.oTitratedDoseCommonVM = new TitratedDoseCommonVM();
                this.oTitratedDoseCommonVM.LoadGridData = (s, e) => { this.oTitratedDoseCommonVM_LoadGridData(); };
                this.oTitratedDoseCommonVM.PrescriptionItemOID = oLocTitratedDoseCommonVM.InputPrescriptionItemOID;
                this.oTitratedDoseCommonVM.PresType = oLocTitratedDoseCommonVM.PresType;
                this.oTitratedDoseCommonVM.Startdttm = oLocTitratedDoseCommonVM.Startdttm;
            }
            else {
                this.oTitratedDoseCommonVM = oLocTitratedDoseCommonVM;
                this.DataContext = this.oTitratedDoseCommonVM;
                this.oTitratedDoseCommonVM.LoadGridData = (s, e) => { this.oTitratedDoseCommonVM_LoadGridData(); };
                this.oTitratedDoseCommonVM.LoadData();
            }
            this.DataContext = this.oTitratedDoseCommonVM;
            //this.grdTitratedDose.DataContext = this.oTitratedDoseCommonVM.GrdTitrated;
            this.grdTitratedDose.ItemsSource = this.oTitratedDoseCommonVM.GrdTitrated;
        }
        public oTitratedDoseCommonVM_LoadGridData(): void {
            let desc: string = String.Empty;
            //this.grdTitratedDose.DataContext = this.oTitratedDoseCommonVM.GrdTitrated;
            this.grdTitratedDose.ItemsSource = this.oTitratedDoseCommonVM.GrdTitrated;
        if (this.IsConceptCodeExists(this.oTitratedDoseCommonVM.TitratedAdminInstruction, TitratedDoseInstructions.ConceptCodes, (o) => { desc = o; }))
                this.lblTitrDoseInstrData.Text = desc;
            this.lblTitrDoseAddnlCommentsVal.Text = this.oTitratedDoseCommonVM.TitratedComments;
            for (let iCntr: number = 0; iCntr < 8; iCntr++) {
                this.AddGridColumns(iCntr);
            }
        }
    public IsConceptCodeExists(sConceptCode: string, objConceptCodes: ObservableCollection<CListItem>, out1: (sResultDetails: string) => void): boolean {
        let sResultDetails: string;
            let bResult: boolean = false;
            sResultDetails = String.Empty;
        if (!String.IsNullOrEmpty(sConceptCode) && objConceptCodes != null) {
            let nCount: number = objConceptCodes.Count;
            for (let i: number = 0; i < nCount; i++) {
                if (objConceptCodes[i].Value == sConceptCode) {
                    bResult = true;
                    sResultDetails = objConceptCodes[i].DisplayText;
                    break;
                }
            }

        }
        out1(sResultDetails);
        return bResult;
    }
        public AddGridColumns(i: number): void {
            let celltemplate: string = String.Empty;
            let ct =new  DataTemplate();
            if (i != 0) {
                let sp = new StackPanel();
                    let lbl=new iLabel();
                    lbl.isAfterViewInitRequired = false;
                    lbl.Name="lblDoseValue";
                    lbl.VerticalAlignment="Center";
                    let bindLbl = new Binding();
                    bindLbl.Mode = BindingMode.OneWay;
                    bindLbl.Path = `ScheduleDoseValue[${i - 1}]`;
                    bindLbl.PathObject = undefined;
                    lbl.SetBinding(iLabel.TextProperty, bindLbl);
                    // lbl.BindingPath= "ScheduleDoseValue[" + (i - 1) + "]";
                    lbl.Text = this.DataContext.GrdTitrated[0]?.ScheduleDoseValue[i-1];                    
                    lbl.ToolTip= "ScheduleDoseValue[ i-1]";
                    lbl.Width="auto";

                    let lbl1=new iLabel();
                    lbl1.isAfterViewInitRequired = false;
                    lbl1.Name="lblDoseUOM";
                    lbl1.HorizontalAlignment="Stretch"
                    lbl1.VerticalAlignment="Center";
                    let bindLblUOM = new Binding();
                    bindLblUOM.Mode = BindingMode.OneWay;
                    bindLblUOM.Path = `TitratedDoseUom[${i - 1}]`;
                    bindLblUOM.PathObject = undefined;
                    lbl1.SetBinding(iLabel.TextProperty, bindLblUOM);
                    // lbl1.BindingPath = "TitratedDoseUom[" +  (i - 1) + "]";
                    lbl1.Text= this.DataContext.GrdTitrated[0]?.TitratedDoseUom[i-1];
                    lbl1.ToolTip="TitratedDoseUom[ i-1]";
                    lbl1.Width="auto";
                    lbl1.IsWordwrap = true;
                    sp.Children.Add(lbl);
                    sp.Children.Add(lbl1); 
                    sp.Orientation=Orientation.Horizontal;
                    ct.Content=sp;
            // celltemplate = `"<DataTemplate xmlns=""http://schemas.microsoft.com/winfx/2006/xaml/presentation"" xmlns:x=""http://schemas.microsoft.com/winfx/2006/xaml"" xmlns:iSOFT=""clr-namespace:assembly=LorArcBlueBirdInput"" xmlns:ConClass=""clr-namespace:assembly=LorAppManagePrescriptionBBUI_P2""> 
            //         < StackPanel Orientation= ""Horizontal"">
            //             <iSOFT:iLabel Name= ""lblDoseValue""  VerticalAlignment= ""Center"" Text= ""{Binding ScheduleDoseValue[" + (i - 1) + @"] } "" Width= ""auto""/>
            //                 <iSOFT:iLabel Name= ""lblDoseUOM""  Grid.Row = ""0"" Grid.Column = ""1"" HorizontalAlignment= ""Stretch"" IsWordwrap = ""true"" VerticalAlignment= ""Center"" Text= ""{Binding TitratedDoseUom[" + (i - 1) + @"] } "" > </iSOFT:iLabel>
            //                     < /StackPanel>
            //                     < /DataTemplate>"`;
            }
            else {
                let sp = new StackPanel();
                    let lbl=new iLabel();
                    lbl.isAfterViewInitRequired = false;
                    lbl.Name="lblTime";
                    lbl.VerticalAlignment="Center";
                    // lbl.BindingPath = "ScheduleTime";
                    let bindLbl = new Binding();
                    bindLbl.Mode = BindingMode.OneWay;
                    bindLbl.Path = "ScheduleTime";
                    bindLbl.PathObject = undefined;
                    lbl.SetBinding(iLabel.TextProperty, bindLbl);
                    lbl.Text= this.DataContext.GrdTitrated[0]?.ScheduleTime;
                    lbl.ToolTip="ScheduleTime";
                    lbl.Width="auto";
                    sp.Children.Add(lbl);
                    sp.Orientation=Orientation.Horizontal;
                    ct.Content=sp;
            // celltemplate = `"<DataTemplate xmlns=""http://schemas.microsoft.com/winfx/2006/xaml/presentation"" xmlns:x=""http://schemas.microsoft.com/winfx/2006/xaml"" xmlns:iSOFT=""clr-namespace:assembly=LorArcBlueBirdInput"" xmlns:ConClass=""clr-namespace:assembly=LorAppManagePrescriptionBBUI_P2""> 
            //         < StackPanel Orientation= ""Horizontal"">
            //             <iSOFT:iLabel Name= ""lblTime"" VerticalAlignment= ""Center"" Text= ""{Binding ScheduleTime} "" Width= ""auto""/>
            //                 </StackPanel>
            //                 < /DataTemplate>"`;
            }
            // let dtCellTemplate: DataTemplate = <DataTemplate>XamlReader.Load(celltemplate);
            if((this.oTitratedDoseCommonVM.GrdTitrated[0]?.ScheduledDate.length + 1) >= i){
            let icolumn: iGridViewDataColumn = new iGridViewDataColumn();
            if (i != 0) {
                if (this.oTitratedDoseCommonVM != null && this.oTitratedDoseCommonVM.GrdTitrated != null && this.oTitratedDoseCommonVM.GrdTitrated.Count > 0) {
                    //icolumn.Header = this.oTitratedDoseCommonVM.GrdTitrated[0].ScheduledDate[i - 1].ToString("dd-MMM-yyyy") + Environment.NewLine + this.oTitratedDoseCommonVM.GrdTitrated[0].ScheduledDate[i - 1].DayOfWeek;
                        if(this.oTitratedDoseCommonVM.GrdTitrated[0].ScheduledDate[i - 1]){
                    icolumn.Header = this.oTitratedDoseCommonVM.GrdTitrated[0].ScheduledDate[i - 1].ToString("dd-MMM-yyyy") + Environment.NewLine + DayOfWeek[this.oTitratedDoseCommonVM.GrdTitrated[0].ScheduledDate[i - 1].DayOfWeek];
                    icolumn.Width = 140;
                        }
                        else{
                            icolumn.Width = "auto";
                        }
                }
                else {
                    return;
                }
            }
            else {
                icolumn.Header = steppeddose.Times_Header;
                icolumn.Width = 80;
            }
            icolumn.IsVisible = true;
            icolumn.filterable = false;            
            //icolumn.CellTemplate = dtCellTemplate;
            icolumn.CellTemplate = ct;             
            this.grdTitratedDose.dColumns.Add(icolumn);
                if (i != 0) {
                if(this.oTitratedDoseCommonVM.GrdTitrated.Length > 0 && this.oTitratedDoseCommonVM.GrdTitrated[0].TitratedDoseUom[0]){
                let longestUOMValueLength = 0; 
                this.oTitratedDoseCommonVM.GrdTitrated.forEach((dose)=>{
                    if(dose.ScheduleDoseValue[i-1] && (dose.ScheduleDoseValue[i-1].toString()).length > longestUOMValueLength){
                        longestUOMValueLength = (dose.ScheduleDoseValue[i-1].toString()).length;
                    }
                });
                let SelectedUOMLength = this.oTitratedDoseCommonVM.GrdTitrated[0].TitratedDoseUom[0].length + (longestUOMValueLength == 0 ? 0 : longestUOMValueLength+1);
                this.grdTitratedDose.AutoFitColumnWidthForContent(SelectedUOMLength, 'U', icolumn);
                }
            }
            }
        }
    }