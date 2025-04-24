import { Component, OnInit, ViewChild, AfterViewInit,ViewChildren,QueryList} from '@angular/core';
import { StringBuilder,ProfileFactoryType,ContextManager,Convert,AppActivity} from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp,Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison,AppDialogEventargs, AppDialogResult, DelegateArgs, DialogComponentArgs, WindowButtonType,Visibility } from 'epma-platform/models';
//import { AppDialog } from 'epma-platform/controls';
import { HelperService} from 'epma-platform/soapclient';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
import { GridExtension} from 'src/app/shared/epma-platform/controls/epma-grid-helpers/grid-extension';
import { GridComponent } from '@progress/kendo-angular-grid';
import { Resource } from '../resource';
import { AppDialog, Colors, GridLength, SolidColorBrush, UserControl, iCheckBox, iLabel, Image,DataTemplate, ScrollViewer,
        iImage,TextBlock,Grid,iButton,Ellipse,TextWrapping}  from 'epma-platform/controls';
import { RoutedEventArgs } from 'src/app/shared/epma-platform/controls/FrameworkElement';
import { GPConnectAddlDetailVM } from '../viewmodel/GPConnectAddlDtlsVM';
import * as ControlStyles from "../../shared/epma-platform/controls/ControlStyles";
import { iAppDialogWindow } from "src/app/shared/epma-platform/controls/iAppDialogWindow";
import { RowDefinition, ColumnDefinition } from 'src/app/shared/epma-platform/controls/epma-grid/epma-grid.component'


@Component({ selector: 'GPConnectAddlDtls', templateUrl: './GPConnectAddlDtls.html',  styleUrls: ['./GPConnectAddlDtls.css'] })

        export class GPConnectAddlDtls extends iAppDialogWindow implements AfterViewInit {
            public brdHeader: ScrollViewer;
            @ViewChild("brdHeaderTempRef", {read:ScrollViewer, static: false }) set _brdHeader(c: ScrollViewer){
                if(c){ this.brdHeader  = c; }
            };
            public LayoutRoot: Grid;
            @ViewChild("LayoutRootTempRef", {read:Grid, static: false }) set _LayoutRoot(c: Grid){
                if(c){ this.LayoutRoot  = c; }
            };
            public lblDrugName: iLabel;
            @ViewChild("lblDrugNameTempRef", {read:iLabel, static: false }) set _lblDrugName(c: iLabel){
                if(c){ this.lblDrugName  = c; }
            };
            public lblSnomedInfo: iLabel;
            @ViewChild("lblSnomedInfoTempRef", {read:iLabel, static: false }) set _lblSnomedInfo(c: iLabel){
                if(c){ this.lblSnomedInfo  = c; }
            };
            public lblDosageText: iLabel;
            @ViewChild("lblDosageTextTempRef", {read:iLabel, static: false }) set _lblDosageText(c: iLabel){
                if(c){ this.lblDosageText  = c; }
            };
            public lblLastIssue: iLabel;
            @ViewChild("lblLastIssueTempRef", {read:iLabel, static: false }) set _lblLastIssue(c: iLabel){
                if(c){ this.lblLastIssue  = c; }
            };
            public lblLastIssuedDate: iLabel;
            @ViewChild("lblLastIssuedDateTempRef", {read:iLabel, static: false }) set _lblLastIssuedDate(c: iLabel){
                if(c){ this.lblLastIssuedDate  = c; }
            };
            public lblCareSetting: iLabel;
            @ViewChild("lblCareSettingTempRef", {read:iLabel, static: false }) set _lblCareSetting(c: iLabel){
                if(c){ this.lblCareSetting  = c; }
            };
            public lblCareSettingName: iLabel;
            @ViewChild("lblCareSettingNameTempRef", {read:iLabel, static: false }) set _lblCareSettingName(c: iLabel){
                if(c){ this.lblCareSettingName  = c; }
            };
            
             public ellStatus: Ellipse;
             @ViewChild("ellStatusTempRef", {read:Ellipse, static: false }) set _ellStatus(c: Ellipse){
                 if(c){ this.ellStatus  = c; }
             };
            public lblStatus: iLabel;
            @ViewChild("lblStatusTempRef", {read:iLabel, static: false }) set _lblStatus(c: iLabel){
                if(c){ this.lblStatus  = c; }
            };
            public lblEncounter: iLabel;
            @ViewChild("lblEncounterTempRef", {read:iLabel, static: false }) set _lblEncounter(c: iLabel){
                if(c){ this.lblEncounter  = c; }
            };
            public lblEncounterName: iLabel;
            @ViewChild("lblEncounterNameTempRef", {read:iLabel, static: false }) set _lblEncounterName(c: iLabel){
                if(c){ this.lblEncounterName  = c; }
            };
            public lblIntent: iLabel;
            @ViewChild("lblIntentTempRef", {read:iLabel, static: false }) set _lblIntent(c: iLabel){
                if(c){ this.lblIntent  = c; }
            };
            public lblIntentName: iLabel;
            @ViewChild("lblIntentNameTempRef", {read:iLabel, static: false }) set _lblIntentName(c: iLabel){
                if(c){ this.lblIntentName  = c; }
            };
            public lblQuantity: iLabel;
            @ViewChild("lblQuantityTempRef", {read:iLabel, static: false }) set _lblQuantity(c: iLabel){
                if(c){ this.lblQuantity  = c; }
            };
            public lblQuantityVal: iLabel;
            @ViewChild("lblQuantityValTempRef", {read:iLabel, static: false }) set _lblQuantityVal(c: iLabel){
                if(c){ this.lblQuantityVal  = c; }
            };
            public lblPlanDetails: iLabel;
            @ViewChild("lblPlanDetailsTempRef", {read:iLabel, static: false }) set _lblPlanDetails(c: iLabel){
                if(c){ this.lblPlanDetails  = c; }
            };
            public lblStatusDetails: iLabel;
            @ViewChild("lblStatusDetailsTempRef", {read:iLabel, static: false }) set _lblStatusDetails(c: iLabel){
                if(c){ this.lblStatusDetails  = c; }
            };
            public lblLastDosage: iLabel;
            @ViewChild("lblLastDosageTempRef", {read:iLabel, static: false }) set _lblLastDosage(c: iLabel){
                if(c){ this.lblLastDosage  = c; }
            };
            public lblLastDosageChanged: iLabel;
            @ViewChild("lblLastDosageChangedTempRef", {read:iLabel, static: false }) set _lblLastDosageChanged(c: iLabel){
                if(c){ this.lblLastDosageChanged  = c; }
            };
            public lblRepeatName: iLabel;
            @ViewChild("lblRepeatNameTempRef", {read:iLabel, static: false }) set _lblRepeatName(c: iLabel){
                if(c){ this.lblRepeatName  = c; }
            };
            public lblDosage: iLabel;
            @ViewChild("lblDosageTempRef", {read:iLabel, static: false }) set _lblDosage(c: iLabel){
                if(c){ this.lblDosage  = c; }
            };
            public lblDosageName: iLabel;
            @ViewChild("lblDosageNameTempRef", {read:iLabel, static: false }) set _lblDosageName(c: iLabel){
                if(c){ this.lblDosageName  = c; }
            };
            public lblInstructions: iLabel;
            @ViewChild("lblInstructionsTempRef", {read:iLabel, static: false }) set _lblInstructions(c: iLabel){
                if(c){ this.lblInstructions  = c; }
            };
            public lblInstructionsName: iLabel;
            @ViewChild("lblInstructionsNameTempRef", {read:iLabel, static: false }) set _lblInstructionsName(c: iLabel){
                if(c){ this.lblInstructionsName  = c; }
            };
            public lblNoOfRepAllowed: iLabel;
            @ViewChild("lblNoOfRepAllowedTempRef", {read:iLabel, static: false }) set _lblNoOfRepAllowed(c: iLabel){
                if(c){ this.lblNoOfRepAllowed  = c; }
            };
            public lblNoOfRepAllowedVal: iLabel;
            @ViewChild("lblNoOfRepAllowedValTempRef", {read:iLabel, static: false }) set _lblNoOfRepAllowedVal(c: iLabel){
                if(c){ this.lblNoOfRepAllowedVal  = c; }
            };
            public lblNoOfRepIssued: iLabel;
            @ViewChild("lblNoOfRepIssuedTempRef", {read:iLabel, static: false }) set _lblNoOfRepIssued(c: iLabel){
                if(c){ this.lblNoOfRepIssued  = c; }
            };
            public lblNoOfRepIssuedVal: iLabel;
            @ViewChild("lblNoOfRepIssuedValTempRef", {read:iLabel, static: false }) set _lblNoOfRepIssuedVal(c: iLabel){
                if(c){ this.lblNoOfRepIssuedVal  = c; }
            };
            public lblIssueDetails: iLabel;
            @ViewChild("lblIssueDetailsTempRef", {read:iLabel, static: false }) set _lblIssueDetails(c: iLabel){
                if(c){ this.lblIssueDetails  = c; }
            };
                        
            grdData: GridExtension = new GridExtension();
            @ViewChild("grdDataTempRef", { read: GridComponent, static: false }) set _grdData(c: GridComponent) {
                if (c) { this.grdData.grid = c; this.grdData.columns = c.columns; }
            };
            @ViewChildren("imgmultipletxtblocktooltip") imgsmultipletxtblocktooltip: QueryList<iImage>;
            public mldetails = Resource.Medlistdetails;
            public Styles = ControlStyles;
            
        
            
        constructor() {
            //InitializeComponent();
            super();

        }

        ngOnInit(): void { 
            this.grdData.RowIndicatorVisibility = Visibility.Collapsed;
        }

        ngAfterViewInit(): void {  
            let AddtlDtlsVM: GPConnectAddlDetailVM = ObjectHelper.CreateType<GPConnectAddlDetailVM>(this.DataContext, GPConnectAddlDetailVM);
            if (AddtlDtlsVM != null){
                 if(AddtlDtlsVM.Status != "Active")
                    this.ellStatus.Fill = new SolidColorBrush(Colors.Grey);
                   if (AddtlDtlsVM!=null && AddtlDtlsVM.DispenseDetails != null && AddtlDtlsVM.DispenseDetails.Count>0)
                        this.ShowTooltipService(AddtlDtlsVM);
            }
        }

        public ShowTooltipService(AddtlDtlsVM: GPConnectAddlDetailVM):void{
          let imagestooltip= this.imgsmultipletxtblocktooltip.filter(item => !!item);
           for (let i = 0; i < AddtlDtlsVM.DispenseDetails.Count; i++) {
           let textblock1 = new TextBlock();
           let sStartDate = String.Empty;
           let sEndDate = String.Empty;
           if (!DateTime.LessThanOrEqualTo(AddtlDtlsVM.DispenseDetails[i].StartDate,DateTime.MinValue))
            sStartDate= AddtlDtlsVM.DispenseDetails[i].StartDate.ToString("dd-MMM-yyyy")
            if (!DateTime.LessThanOrEqualTo(AddtlDtlsVM.DispenseDetails[i].EndDate,DateTime.MinValue))
            sEndDate= AddtlDtlsVM.DispenseDetails[i].EndDate.ToString("dd-MMM-yyyy")

            textblock1.Text = sStartDate + ' - ' + sEndDate + ':';
            textblock1.FontWeight= "Bold";
            
            let textblock2 = new TextBlock();
            textblock2.Text = AddtlDtlsVM.DispenseDetails[i].DosageInstruction;
            textblock2.IsWordwrap=true;
            textblock2.TextWrapping=TextWrapping.Wrap;
            textblock2.MaxWidth="350";
            
            let grid1 = new Grid();
            grid1.RowDefinitions.Add(new RowDefinition());
            grid1.RowDefinitions.Add(new RowDefinition());
            let oColumnDefinition1 : ColumnDefinition = new ColumnDefinition();
            oColumnDefinition1.Width = "300";
            grid1.ColumnDefinitions.Add(oColumnDefinition1);
            grid1.Children.Add(textblock1);  
            grid1.Children.Add(textblock2);  
            Grid.SetRow(textblock2,2); 
            if(imagestooltip.length!=0)      
                imagestooltip[i].ToolTip=grid1;
           }
        }
    }
