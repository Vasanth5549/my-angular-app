import { AfterViewInit, Component, OnDestroy, ViewChild } from "@angular/core";
import { DataTemplate, EventArgs, Grid, HorizontalAlignment, iButton, iLabel, iTextBox, KeyEventArgs, StackPanel, Thickness, VerticalAlignment } from "epma-platform/controls";
import DateTime from "epma-platform/DateTime";
import { ObjectHelper } from "epma-platform/helper";
import { CultureInfo, List, StringComparison } from "epma-platform/models";
import { iMessageBox, MessageBoxButton, MessageBoxResult, MessageBoxType, MessageEventArgs } from "epma-platform/services";
import { MezzanineSize, ScheduleDetailsSteppedVM } from "src/app/lorappmedicationcommonbb/viewmodel/scheduledetailsvm";
import { RoutedEventArgs, Stretch } from "src/app/shared/epma-platform/controls/Control";
import { CConstants } from "../utilities/constants";
import { Resource } from '../resource';
import { QueryStringInfo } from "../utilities/globalvariable";
import { ScheduleDetailsCols } from "src/app/lorappmedicationcommonbb/viewmodel/prescriptionitemdetailsvm";
import { ChangeDoseFooter } from "./changedosefooter";
import { Orientation } from "src/app/shared/epma-platform/controls-model/Orientation";
import { align } from "@progress/kendo-drawing";
import { GridComponent } from "@progress/kendo-angular-grid";
import { GridExtension, GridViewBeginningEditRoutedEventArgs, iGridViewDataColumn } from "src/app/shared/epma-platform/controls/epma-grid-helpers/grid-extension";
import { ColumnDefinition, RowDefinition } from "src/app/shared/epma-platform/controls/epma-grid/epma-grid.component";
import { RemoveDoseUOM } from "src/app/product/shared/convertor/medicationconverters.service";
import { iAppDialogWindow } from "src/app/shared/epma-platform/controls/iAppDialogWindow";
import { Binding, BindingMode } from "src/app/shared/epma-platform/controls/FrameworkElement";
var that;
@Component({
    selector: 'ChangeDose',
    templateUrl: './Changedose.html',
    styleUrls: ['./ChangeDose.css'],
  })

export class ChangeDose extends iAppDialogWindow implements AfterViewInit, OnDestroy {
        objChangeDoseFooter: ChangeDoseFooter;
        ScheduleDt: ScheduleDetailsSteppedVM;
        cmdDaywise: iButton;
        cmdChangingdose: iButton;
        lblDrugName1: iLabel;
        cmdClear: iButton;
        IsAssignDosesFromFirstToNextDays: boolean = false;

public LayoutRoot: Grid;
IsChangingDoseEnabledflag: boolean = false;
@ViewChild("LayoutRootTempRef", {read:Grid, static: false }) set _LayoutRoot(c: Grid){
 if(c){ this.LayoutRoot = c; }
};
public lblDrugName: iLabel;
@ViewChild("lblDrugNameTempRef", {read:iLabel, static: false }) set _lblDrugName(c: iLabel){
 if(c){ this.lblDrugName = c; }
};
grdChangingDose : GridExtension = new GridExtension();
  @ViewChild('grdChangingDoseTempRef', { read: GridComponent, static: false }) set _grdChangingDose(
    c: GridComponent
  ) {
    if (c) {
      this.grdChangingDose.grid = c;
      this.grdChangingDose.columns = c.columns;
      //this.grdChangingDose.ItemsSourceData = c.data;
    }
  }

public _contentLoaded: Boolean;
@ViewChild("_contentLoadedTempRef", {read:Boolean, static: false }) set __contentLoaded(c: Boolean){
 if(c){ this._contentLoaded = c; }
};

        constructor(){
            super();
            that = this;
        }
        constructorImpl(ScheduleDetails: ScheduleDetailsSteppedVM) {         
            if (ScheduleDetails != null) {
                ScheduleDetails.IsStartDateGiven = (ScheduleDetails.StartDate != DateTime.MinValue);
                this.ScheduleDt = ScheduleDetails;
                this.DataContext = ScheduleDetails;
                this.IsAssignDosesFromFirstToNextDays = ScheduleDetails.GrdData == null || ScheduleDetails.GrdData.Count == 0 || !ScheduleDetails.IsDaywiseView;
                if (!String.IsNullOrEmpty(ScheduleDetails.PresType)) {
                    this.ScheduleDt.IsDaywiseView = (this.ScheduleDt.DurationValue > 0 && !String.IsNullOrEmpty(this.ScheduleDt.DurationUOM));
                }
                if (!ScheduleDetails.IsReadOnly && ScheduleDetails.IsModifiedChangeDoseDetail) {
                    ScheduleDetails.LoadData();
                }
            }
        }
    ngAfterViewInit(): void {
        this.iAppDialogWindow_Loaded({},null);
        if(this.ScheduleDt != null)
        {
            this.grdChangingDose.SetBinding('data', this.ScheduleDt.GrdData);
            this.grdChangingDose.GenerateColumns();
            if (this.ScheduleDt != null && this.ScheduleDt.GrdData != null && this.ScheduleDt.GrdData.Count > 0) {
                if (this.ScheduleDt.IsDaywiseView || (!this.ScheduleDt.IsDaywiseView && this.ScheduleDt.IsDurationIsOneDayOrLesser(this.ScheduleDt.DurationUOM, this.ScheduleDt.DurationValue) && this.ScheduleDt.GrdData[0].ScheduleDate != null)) {
                    this.ScheduleDt.IsDaywiseView = true;
                    this.ScheduleDt.IsDayWiseEnabled = false;
                    this.SwitchToDaywiseMode(true);
                }
                else if (!this.ScheduleDt.IsReadOnly && !String.IsNullOrEmpty(this.ScheduleDt.DurationUOM) && this.ScheduleDt.DurationValue > 0 && this.ScheduleDt.GrdData[0].ScheduleDate != null && this.ScheduleDt.GrdData[0].ScheduleDate.length > 1) {
                    this.ScheduleDt.IsDayWiseEnabled = true;
                }
            }
            //this.grdChangingDose.GenerateColumns();
            if (this.ScheduleDt.IsGridLinkClicked) {
                this.grdChangingDose.Columns[0].IsReadOnly = this.grdChangingDose.Columns[1].IsReadOnly = this.ScheduleDt.IsReadOnly;
            }
            else {
                this.grdChangingDose.Columns[0].IsReadOnly = true;
            }
        }
    }
    clearAllSetTimeOut(){
        this.timeoutId?.forEach((timeoutId) => {
            clearTimeout(timeoutId);
          });
    }
        private cmdDaywise_Click(sender: Object, e: RoutedEventArgs): void {
            this.IsAssignDosesFromFirstToNextDays = true;
            this.ScheduleDt.ChangingDoseMezzanineSize = MezzanineSize.Expanded;
            this.SwitchToDaywiseMode(true);
            this.ScheduleDt.IsChangingDoseEnabled = true;
            this.ScheduleDt.IsClearEnabled = true;
            this.objChangeDoseFooter.removepadding(2);
        }
        private cmdChangingdose_Click(sender: Object, e: RoutedEventArgs): void {
            if (this.ScheduleDt.ChangingDoseMezzanineSize == MezzanineSize.Expanded) {
                let _strFirstDose: string = String.Empty;
                if (!this.ScheduleDt.IsAllDoseValuesSame((o)=>{_strFirstDose = o})) {
                    let iMsgBox: iMessageBox = ObjectHelper.CreateObject(new iMessageBox(), {
                        Title: "Lorenzo",
                        IconType: MessageBoxType.Information,
                        MessageButton: MessageBoxButton.YesNo,
                        Message: Resource.steppeddose.SwitchingToChangingDoseView
                    });
                    this.objChangeDoseFooter.removepadding(2);
                    iMsgBox.Show();
                    iMsgBox.MessageBoxClose  = (s,e) => { this.iMsgBox_MessageBoxClose(s,e); } ;
                }
                else {
                    this.SwitchToNonDaywiseMode(_strFirstDose);
                    this.objChangeDoseFooter.removepadding(1);
                }
            }
        }
        iMsgBox_MessageBoxClose(sender: Object, e: MessageEventArgs): void {
            if (e.MessageBoxResult == MessageBoxResult.Yes) {
              this.SwitchToNonDaywiseMode(String.Empty);
              this.objChangeDoseFooter.removepadding(1);
            }
        }
        private SwitchToNonDaywiseMode(sDose: string): void {
            if (this.grdChangingDose != null && this.grdChangingDose.Columns != null && this.grdChangingDose.Columns.Count > 0) {
                for (let i: number = (this.grdChangingDose.Columns.Count - 1); i > 1; i--) {
                    this.grdChangingDose.Columns.RemoveAt(i);
                }
      if (this.grdChangingDose.dColumns.Count > 0) {
        // for (let i = 0; i <= this.grdChangingDose.dColumns.Count; i++) {
        //   this.grdChangingDose.dColumns.RemoveAt(i);
        this.grdChangingDose.dColumns.Clear();
        // }
      }
      this.grdChangingDose.Columns[1].Header =
        CConstants.ChangingDoseColumnHeader;
                this.ScheduleDt.IsChangingDoseEnabled = false;
                this.IsChangingDoseEnabledflag = true
                this.ScheduleDt.IsDayWiseEnabled = true;
                this.ScheduleDt.IsDaywiseView = false;
                this.ScheduleDt.ChangingDoseMezzanineSize = MezzanineSize.Normal;
                this.ClearDoseValues();
                this.SetDoseValueInFirstColumn(sDose);
                if (this.appDialog != null) {
                    this.Width = this.appDialog.Width = CConstants.ChangingDoseMezzanineNonDaywiseWidth;
                    this.UpdateLayout();
                    //Presently not supported in appDialog.
                    //this.appDialog.CenterInScreen();
                    this.grdChangingDose.Width = this.Width - 60 + '';
                }
            }
        }
        private cmdClear_Click(sender: Object, e: RoutedEventArgs): void {
            this.ClearDoseValues();
        }
        private ClearDoseValues(): void {
            if (this.ScheduleDt.GrdData != null && this.ScheduleDt.GrdData.Count > 0) {
                let grdDataCount: number = this.ScheduleDt.GrdData.Count;
                for (let i: number = 0; i < grdDataCount; i++) {
                    if (this.ScheduleDt.GrdData[i].ScheduleDoseValue != null && this.ScheduleDt.GrdData[i].ScheduleDoseValue.length > 0) {
                        let schdDoseCount: number = this.ScheduleDt.GrdData[i].ScheduleDoseValue.length;
                        for (let j: number = 0; j < schdDoseCount; j++) {
                            this.ScheduleDt.GrdData[i].ScheduleDoseValue[j] = String.Empty;
                        }
                    }
                }
      // this.grdChangingDose.Rebind();
            }
        }
        private SetDoseValueInFirstColumn(sDose: string): void {
            if (this.ScheduleDt.GrdData != null && this.ScheduleDt.GrdData.Count > 0) {
                let grdDataCount: number = this.ScheduleDt.GrdData.Count;
                for (let i: number = 0; i < grdDataCount; i++) {
                    if (this.ScheduleDt.GrdData[i].ScheduleDoseValue != null && this.ScheduleDt.GrdData[i].ScheduleDoseValue.length > 0) {
                        this.ScheduleDt.GrdData[i].ScheduleDoseValue[0] = sDose;
                        this.ScheduleDt.GrdData[i].Scheduledoseflag[0] = true;
                    }
                }
      // this.grdChangingDose.Rebind();
            }
        }
        private SwitchToDaywiseMode(IsDaywiseViewClicked: boolean): void {
            this.GenarateColumn(IsDaywiseViewClicked);
            if (this.ScheduleDt.ChangingDoseMezzanineSize == MezzanineSize.Expanded && !this.ScheduleDt.IsReadOnly) {
                this.ScheduleDt.IsChangingDoseEnabled = true;
            }
            else {
                this.ScheduleDt.IsChangingDoseEnabled = false;
            }
            if (this.appDialog != null && this.ScheduleDt.ChangingDoseMezzanineSize == MezzanineSize.Expanded) {                
                // if (!String.IsNullOrEmpty(QueryStringInfo.IsClinicalNote) && QueryStringInfo.IsClinicalNote.Equals("Yes", StringComparison.OrdinalIgnoreCase)) {
                //     this.Width = this.appDialog.Width = 950;
                // }
                // else {
                //     this.Width = this.appDialog.Width = CConstants.ChangingDoseMezzanineDaywiseWidth;
                // }
                this.Width = this.appDialog.Width = CConstants.ChangingDoseMezzanineDaywiseWidth;
                this.IsChangingDoseEnabledflag = false
                this.UpdateLayout();
                this.grdChangingDose.Width = this.Width - 60 + '' ;
                //Presently not supported in appDialog.
                //this.appDialog.CenterInScreen();
            }
        }
        private GenarateColumn(IsDaywiseViewClicked: boolean): void {
            let ChangedDoseScheduleDetails: ScheduleDetailsSteppedVM = ObjectHelper.CreateType<ScheduleDetailsSteppedVM>(this.DataContext, ScheduleDetailsSteppedVM);
            if (ChangedDoseScheduleDetails != null) {
                if (!ChangedDoseScheduleDetails.IsReadOnly) {
                    this.grdChangingDose.BeginningEdit  = (s,e) => { this.grdChangingDose_BeginningEdit(s,e); } ;
                }
                ChangedDoseScheduleDetails.IsDaywiseViewClicked = IsDaywiseViewClicked;
                ChangedDoseScheduleDetails.FillDatesForGridColumnsFromExistingData();
                if (this.IsAssignDosesFromFirstToNextDays) {
                    ChangedDoseScheduleDetails.AssignDosesFromFirstToNextDays();
                }
                else if (!ChangedDoseScheduleDetails.IsReadOnly && ChangedDoseScheduleDetails.IsModifiedChangeDoseDetail && ChangedDoseScheduleDetails.GrdData != null && ChangedDoseScheduleDetails.GrdData.Count > 0) {
                    ChangedDoseScheduleDetails.ReassignDosesForStartDTTMChange(ChangedDoseScheduleDetails.GrdData, ChangedDoseScheduleDetails.LstOriginalDoseValues);
                }
                if (this.grdChangingDose != null && this.grdChangingDose.Columns.Count > 0 && ChangedDoseScheduleDetails.LstGridColumnsDates != null && ChangedDoseScheduleDetails.LstGridColumnsDates.Count > 0) {
                    this.GenerateColumnsInDaywisemode(ChangedDoseScheduleDetails.LstGridColumnsDates, ChangedDoseScheduleDetails.IsReadOnly);
                }
            }
        };
        private timeoutId: any=[];
        private GenerateColumnsInDaywisemode(LstGridColumnsDates: List<DateTime>, _IsReadOnly: boolean): void {
            if (LstGridColumnsDates.Count > 1) {
                let nCount: number = LstGridColumnsDates.Count;
                this.grdChangingDose.Columns[1].Header = LstGridColumnsDates[0].ToString("dd-MMM-yyyy");
		this.grdChangingDose.dColumns.Clear();
                for (let i: number = 1; i < nCount; i++) {
                    if(i<=20){
                        this.AddGridColumn(i, LstGridColumnsDates[i], _IsReadOnly);
                    }else{
                        this.timeoutId.push(setTimeout(()=>{
                            this.AddGridColumn(i, LstGridColumnsDates[i], _IsReadOnly);
                        },0));
                    }
                }
                this.ScheduleDt.ChangingDoseMezzanineSize = MezzanineSize.Expanded;
            }
            else {
                this.ScheduleDt.ChangingDoseMezzanineSize = MezzanineSize.Normal;
            }
        }
        private AddGridColumn(i: number, ColumnDTTM: DateTime, _IsReadonly: boolean): void {
            let celltemplate: DataTemplate;
            let edittemplate: DataTemplate;

            celltemplate = new DataTemplate();
            let stackpanel = new StackPanel();            
            let lblDose = new iLabel();
            lblDose.isAfterViewInitRequired = false;
            lblDose.Name = "lblDoseValue";
            lblDose.VerticalAlignment = VerticalAlignment.Center;
    lblDose.Width = 'auto';
    let bindLbl = new Binding();
    bindLbl.Mode = BindingMode.TwoWay;
    // console.log('addGridColumn', `ScheduleDoseValue[${i}]`);a
    bindLbl.Path = `ScheduleDoseValue[${i}]`;
    // bindLbl.PathObject = this.DataContext.GrdData[0];
    bindLbl.PathObject = undefined;
    lblDose.SetBinding(iLabel.TextProperty, bindLbl);
            lblDose.Text = this.DataContext.GrdData[0].ScheduleDoseValue[i];
            stackpanel.Orientation = Orientation.Horizontal;
            let lblDoseUom = new iLabel();
            lblDoseUom.isAfterViewInitRequired = false;
            lblDoseUom.Name = "lblDoseUOM";
            lblDoseUom.VerticalAlignment = VerticalAlignment.Center;
            lblDoseUom.Width = "auto";
            lblDoseUom.IsWordwrap = true;
            lblDoseUom.Text = (new RemoveDoseUOM()).Convert(this.DataContext.GrdData[0],String,i,CultureInfo).ToString();
            stackpanel.Children.Add(lblDose);
            stackpanel.Children.Add(lblDoseUom);
            celltemplate.Content = stackpanel;
            
            // celltemplate = @"<DataTemplate xmlns=""http://schemas.microsoft.com/winfx/2006/xaml/presentation"" xmlns:x=""http://schemas.microsoft.com/winfx/2006/xaml"" xmlns:iSOFT=""clr-namespace:assembly=LorArcBlueBirdInput"" xmlns:ConClass=""clr-namespace:assembly=LorAppManagePrescriptionBBUI_P2""> 
            //     < StackPanel Orientation= ""Horizontal"">
            //         <StackPanel.Resources>
            //         <ConClass:RemoveDoseUOM x: Key = ""RemoveDoseUOM"" />
            //             </StackPanel.Resources>
            //             < iSOFT:iLabel Name= ""lblDoseValue"" VerticalAlignment= ""Center"" Text= ""{Binding ScheduleDoseValue[" + i + @"] } "" Width= ""auto""/>
            //                 <iSOFT:iLabel HorizontalAlignment= ""Stretch"" Name= ""lblDoseUOM"" VerticalAlignment= ""Center"" Text= ""{Binding., Converter = { StaticResource RemoveDoseUOM}, ConverterParameter = " + i + @" } "" IsWordwrap = ""true"" Width= ""auto""/>
            //                     </StackPanel>
            //                     < /DataTemplate>";
            edittemplate = new DataTemplate();
            let grdEdit : Grid= new Grid();
            grdEdit.Name = "grdEdit";
            let RowDef : RowDefinition = new RowDefinition();
            RowDef.Height = 25;
            grdEdit.RowDefinitions.Add(RowDef);
            let ColDef1 : ColumnDefinition = new ColumnDefinition();
            let ColDef2 : ColumnDefinition = new ColumnDefinition();
            ColDef1.Width = "auto";
            ColDef2.Width = "auto";
            grdEdit.ColumnDefinitions.Add(ColDef1);
            grdEdit.ColumnDefinitions.Add(ColDef2);
            
            
            let textbox1 : iTextBox = new iTextBox();        
            textbox1.Name = "txtDoseValue";    
            let bind=new Binding();
            bind.Mode = BindingMode.TwoWay;
            bind.Path = `ScheduleDoseValue[${i}]`;
    // bind.PathObject = this.DataContext.GrdData[0];
    bind.PathObject = undefined;
            textbox1.Minimum = 0;
            textbox1.VerticalAlignment= VerticalAlignment.Center;
            textbox1.Width= "auto";
            textbox1.Type= "Numeric";
            textbox1.Scale= 7 ;
            textbox1.Precision= 3;
            textbox1.MaxLength= 11;
            textbox1.MinWidth= "20";
            textbox1.SetBinding(iTextBox.TextProperty, bind);
            grdEdit.Children.Add(textbox1);
            //Revisit Required
            //Keydown event needs to be handled
            grdEdit.SetGridRow(textbox1,1);
            grdEdit.SetGridColumn(textbox1,1);

            let lblDoseUom2 = new iLabel();
            lblDoseUom2.isAfterViewInitRequired = false;
            lblDoseUom2.Name = "lblDoseUOM";
            lblDoseUom2.VerticalAlignment = VerticalAlignment.Center;
            lblDoseUom2.HorizontalAlignment = HorizontalAlignment.Stretch;
            lblDoseUom2.Width = "auto";
            lblDoseUom2.IsWordwrap = true;
            lblDoseUom2.Text = this.DataContext.GrdData[0].ScheduleDoseUOM;            
            grdEdit.Children.Add(lblDoseUom2);
            grdEdit.SetGridRow(lblDoseUom2,1);
            grdEdit.SetGridColumn(lblDoseUom2,2);

            edittemplate.Content = grdEdit;
            

            // edittemplate = @"<DataTemplate xmlns=""http://schemas.microsoft.com/winfx/2006/xaml/presentation"" xmlns:x=""http://schemas.microsoft.com/winfx/2006/xaml"" xmlns:iSOFT=""clr-namespace:assembly=LorArcBlueBirdInput"" xmlns:my1=""clr-namespace:assembly=LorAppManagePrescriptionBBUI_P2"" xmlns:interactivity=""clr-namespace:System.Windows.Interactivity;assembly=System.Windows.Interactivity""> 
            //     < Grid x: Name = ""grdEdit"">
            //         <Grid.RowDefinitions>
            //         <RowDefinition Height=""25""/>
            //             </Grid.RowDefinitions>
            //             < Grid.ColumnDefinitions >
            //             <ColumnDefinition Width=""auto""/>
            //                 <ColumnDefinition Width=""auto""/>
            //                     </Grid.ColumnDefinitions>
            //                     < iSOFT:iTextBox Name= ""txtDoseValue"" Grid.Row = ""0"" Grid.Column = ""0"" Minimum= ""0"" VerticalAlignment= ""Center"" Text= ""{Binding ScheduleDoseValue[" + i + @"], Mode = TwoWay } "" Width= ""auto"" Type= ""Numeric"" Scale= ""7"" Precision= ""3"" MaxLength= ""11"" MinWidth= ""20"">
            //                         <interactivity:Interaction.Triggers >
            //                             <interactivity:EventTrigger EventName= ""KeyDown"">
            //                                 <my1:InvokeTextBoxEventMethods />
            //                                     </interactivity:EventTrigger>
            //                                     < /interactivity:Interaction.Triggers>
            //                                     < /iSOFT:iTextBox>
            //                                     < iSOFT:iLabel Name= ""lblDoseUOM"" Grid.Row = ""0"" Grid.Column = ""1"" HorizontalAlignment= ""Stretch"" IsWordwrap = ""true"" VerticalAlignment= ""Center"" Text= ""{Binding ScheduleDoseUOM} "" > </iSOFT:iLabel>
            //                                         < /Grid>
            //                                         < /DataTemplate>";
            let dtCellTemplate: DataTemplate =celltemplate; // <DataTemplate>XamlReader.Load(celltemplate);
            let dtEditTemplate: DataTemplate = edittemplate;// <DataTemplate>XamlReader.Load(edittemplate);

            
            let icolumn: iGridViewDataColumn = new iGridViewDataColumn();
            icolumn.IsReadOnly = _IsReadonly;
            icolumn.Header = ColumnDTTM.ToString("dd-MMM-yyyy");
            icolumn.IsVisible = true;
            icolumn.IsFilterable = false;
            icolumn.CellTemplate = dtCellTemplate;
            icolumn.CellEditTemplate = dtEditTemplate;
            icolumn.MinWidth = 140;
            this.grdChangingDose.dColumns.Add(icolumn);
        }
        public cmdOk_Click(): void {

        }
        txtDoseValue_KeyDown_Func = (s,e) => {Object.keys(that).forEach((prop) => (this[prop] = that[prop]));  this.txtDoseValue_KeyDown(s,e)};
        private txtDoseValue_KeyDown(sender: Object, e: KeyEventArgs): void {
            if (e.PlatformKeyCode == 189 || e.PlatformKeyCode == 109) {
                e.Handled = true;
            }
            else if (this.ScheduleDt != null) {
                this.ScheduleDt.IsDataModified = true;
            }
        }

        public Gridwidth:string="";
        public KendoScroll:string="";
       

        private iAppDialogWindow_Loaded(sender: Object, e: RoutedEventArgs): void {
            this.objChangeDoseFooter.ChangeDoseFooterLoadedEvent.subscribe(data =>
            {
                this.objChangeDoseFooter.Margin = new Thickness(0, 6, 10, 0);
                this.cmdDaywise = ObjectHelper.CreateType<iButton>(this.objChangeDoseFooter.FindName("cmdDaywise"), iButton);
                if (this.cmdDaywise != null) {
                    this.cmdDaywise.Click  = (s,e) => { this.cmdDaywise_Click(s,e); } ;
                }
                this.cmdChangingdose = ObjectHelper.CreateType<iButton>(this.objChangeDoseFooter.FindName("cmdChangingdose"), iButton);
                if (this.cmdChangingdose != null) {
                    this.cmdChangingdose.Click  = (s,e) => { this.cmdChangingdose_Click(s,e); } ;
                }
                this.cmdClear = ObjectHelper.CreateType<iButton>(this.objChangeDoseFooter.FindName("cmdClear"), iButton);
                if (this.cmdClear != null) {
                    this.cmdClear.Click  = (s,e) => { this.cmdClear_Click(s,e); } ;
                }
		this.lblDrugName1 = ObjectHelper.CreateType<iLabel>(this.objChangeDoseFooter.FindName("lblDrugName1"), iLabel);
                if (this.lblDrugName1 != null) {
                    this.lblDrugName1.Text  = this.grdChangingDose.columns.length.ToString();
                }

                if(parseInt(this.grdChangingDose.columns.length)>6)
                this.Gridwidth= parseInt(this.grdChangingDose.columns.length)>6 ? 'changdosegrdwidth KendoScroll':'';
                else
                this.Gridwidth= parseInt(this.grdChangingDose.columns.length)>4 ? 'changdosegrdwidth ':'';
            });
            
            let ChangedDoseDetails: ScheduleDetailsSteppedVM = ObjectHelper.CreateType<ScheduleDetailsSteppedVM>(this.DataContext, ScheduleDetailsSteppedVM);
            if (ChangedDoseDetails != null && this.appDialog != null && ChangedDoseDetails.ChangingDoseMezzanineSize == MezzanineSize.Expanded) {
                if (!String.IsNullOrEmpty(QueryStringInfo.IsClinicalNote) && QueryStringInfo.IsClinicalNote.Equals("Yes", StringComparison.OrdinalIgnoreCase)) {
                    this.Width = this.appDialog.Width = 950;
                }
                else {
                    this.Width = this.appDialog.Width = CConstants.ChangingDoseMezzanineDaywiseWidth;
                }
                //this.appDialog.CenterInScreen();
            }
        }
        private grdChangingDose_BeginningEdit(sender: Object, e: GridViewBeginningEditRoutedEventArgs): void {
            if (e.Cell != null && e.Cell.Column != null && e.Cell.Column.DisplayIndex > 0) {
                let spDoseValue: StackPanel = ObjectHelper.CreateType<StackPanel>(e.Cell.Content, StackPanel);
                if (spDoseValue != null) {
                    let lblDose: iLabel = ObjectHelper.CreateType<iLabel>(spDoseValue.Children[0], iLabel);
                    if (lblDose != null) {
                        if (lblDose.Name == "lblDoseValue" && !String.IsNullOrEmpty(lblDose.Text)) {
                            e.Cell.Tag = lblDose.Text;
                        }
                        else if (lblDose.Name == "lblDoseValue" && String.IsNullOrEmpty(lblDose.Text)) {
                            e.Cell.Tag = lblDose.Text = "";
                        }
                    }
                    if (this.ScheduleDt != null && !this.ScheduleDt.IsDataModified) {
                        this.ScheduleDt.IsDataModified = true;
                    }
                }
                if (e != null && e.Row != null && e.Row.Item != null) {
                    let oRow: ScheduleDetailsCols = ObjectHelper.CreateType<ScheduleDetailsCols>(e.Row.Item, ScheduleDetailsCols);
                    if (oRow != null && oRow.Scheduledoseflag != null && e.Cell != null && e.Cell.Column != null && oRow.Scheduledoseflag != null && oRow.Scheduledoseflag.length > 0 && (oRow.Scheduledoseflag.length - 1) >= (e.Cell.Column.DisplayIndex - 1) && !oRow.Scheduledoseflag[e.Cell.Column.DisplayIndex - 1]) {
                        e.Cancel = true;
                    }
                }
            }
        }
        sDupliTimeDet: string = String.Empty;
        iTimeScheduled_LostFocus(sender: Object, e: RoutedEventArgs): void {
            if (this.ScheduleDt != null) {
                if (this instanceof iAppDialogWindow) {
                    if (this.appDialog.DialogResult == null || this.appDialog.DialogResult == false) {
                        if (String.IsNullOrEmpty(this.sDupliTimeDet)) {
                            let Duplifalg: boolean = false;
                            this.sDupliTimeDet = this.ScheduleDt.duplicatecheck(Duplifalg);
                            if (!String.IsNullOrEmpty(this.sDupliTimeDet)) {
                                let objMsg: iMessageBox = new iMessageBox();
                                objMsg.MessageButton = MessageBoxButton.OK;
                                objMsg.Message = String.Format(Resource.MedicationForm.DuplicateChangeDoseTime, this.sDupliTimeDet);
                                objMsg.Closed  = (s,e) => { this.objMsg_Closed(s,e); } ;
                                objMsg.Show();
                                this.ScheduleDt.MessDuplicate = true;
                            }
                        }
                    }
                }
            }
        }
        objMsg_Closed(sender: Object, e: EventArgs): void {
            this.sDupliTimeDet = String.Empty;
            this.ScheduleDt.MessDuplicate = false;
        }
        private DisposeFormEvents(): void {
            // this.grdChangingDose.BeginningEdit -= grdChangingDose_BeginningEdit;
            // this.cmdDaywise.Click -= cmdDaywise_Click;
            // this.cmdChangingdose.Click -= cmdChangingdose_Click;
            // this.cmdClear.Click -= cmdClear_Click;
        }
        private iAppDialogWindow_UnLoaded(sender: Object, e: RoutedEventArgs): void {
            this.DisposeFormEvents();
        }
        ngOnDestroy(): void {
            this.iAppDialogWindow_UnLoaded({},null);
            this.clearAllSetTimeOut()
        }
    }
