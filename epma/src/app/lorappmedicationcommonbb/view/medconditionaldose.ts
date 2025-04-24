import { Component, Input, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { StringBuilder, ProfileFactoryType, ContextManager, Convert, AppActivity } from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp, Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison, AppDialogEventargs, AppDialogResult, DelegateArgs, DialogComponentArgs, WindowButtonType, iAppDialogWindow } from 'epma-platform/models';
import { AppDialog, DataTemplate, GridLength, iLabel, TextBlock } from 'epma-platform/controls';
import { HelperService } from 'epma-platform/soapclient';
import '../../shared/epma-platform/models/string.extensions';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
import { ConditionalDoseVM } from '../viewmodel/ConditionalDoseVM';
import { GridExtension, RowLoadedEventArgs } from 'src/app/shared/epma-platform/controls/epma-grid-helpers/grid-extension';
import { ConditionalDose } from '../model/conditionaldose';
import { ToolTipService } from 'src/app/shared/epma-platform/controls/Control';
import { RoutedEventArgs } from 'src/app/shared/epma-platform/controls/FrameworkElement';
import { Grid } from "src/app/shared/epma-platform/controls/epma-grid-helpers/grid-extension";
import { GridComponent } from '@progress/kendo-angular-grid';
import { Resource } from '../resource';
import * as ControlStyles from "../../shared/epma-platform/controls/ControlStyles";

@Component({ selector: 'medconditionaldose', templateUrl: './medconditionaldose.html' ,styleUrls: ['./medconditionaldose.css']})
export class MedConditionalDose extends iAppDialogWindow {
    public ddkey = Resource.DrugDetails;
    public steppeddose = Resource.steppeddose;
    public Styles = ControlStyles;
    public Conditionaldose= {RowDefinitions:[ { height: '30fr'}, { height: '25fr'},{ height:'150fr'}]};
    // private Conditionaldose: Grid;
    // @ViewChild("ConditionaldoseTempRef", { read: Grid, static: false }) set _Conditionaldose(c: Grid) {
    //     if (c) { this.Conditionaldose = c; }
    // };
    private lblConditionalDose: iLabel;
    @ViewChild("lblConditionalDoseTempRef", { read: iLabel, static: false }) set _lblConditionalDose(c: iLabel) {
        if (c) { this.lblConditionalDose = c; }
    };
    private lblMonitaringperd: iLabel;
    @ViewChild("lblMonitaringperdTempRef", { read: iLabel, static: false }) set _lblMonitaringperd(c: iLabel) {
        if (c) { this.lblMonitaringperd = c; }
    };
    private lblMonitaringperd1: iLabel;
    @ViewChild("lblMonitaringperd1TempRef", { read: iLabel, static: false }) set _lblMonitaringperd1(c: iLabel) {
        if (c) { this.lblMonitaringperd1 = c; }
    };
    grdConditionalDose: GridExtension = new GridExtension();
    @ViewChild("grdConditionalDoseRef", { read: GridComponent, static: false }) set _grdConditionalDose(c: GridComponent) {
        if (c) {
             this.grdConditionalDose.grid = c;
             this.grdConditionalDose.columns = c.columns;
             //this.grdConditionalDose.ItemsSourceData = c.data;             
         }
    };
    grdConditionalDoseRow=2;
    public lblConditionName: iLabel;
    @ViewChild("lblConditionNameTempRef", { read: iLabel, static: false }) set _lblConditionName(c: iLabel) {
        if (c) { this.lblConditionName = c; }
    };

    ConditionalVM: ConditionalDoseVM;
    public InfusionType: string;
    public DoseType: string;

    override _DataContext: ConditionalDoseVM;
    override get DataContext() {
        return this._DataContext;
    }
    @Input() override set DataContext(value: ConditionalDoseVM) {
        this._DataContext = value;
    }
    ngAfterViewInit(): void {
    this.MedConditionalDose_Loaded (null,null)
    setTimeout(() => {
        this.grdConditionalDose.SetBinding('data', this.DataContext.DefinedConditions);   
    }, 0);    
    }

    constructor() {
        super();
        //InitializeComponent();
        // this.Loaded = (s, e) => { this.MedConditionalDose_Loaded(s, e); };
    }
    @ViewChildren('temp') dataTemplates: QueryList<DataTemplate>;
    rowLoaded(context: any) {
    let rowEventArgs = this.grdConditionalDose.GetRowEventArgs(this.dataTemplates, context);
        this.grdConditionalDose_RowLoaded({}, rowEventArgs);
    }
    public grdConditionalDose_RowLoaded(sender: Object, e: RowLoadedEventArgs): void {
        let oRowItem: ConditionalDose = ObjectHelper.CreateType<ConditionalDose>(e.DataElement, ConditionalDose);
        if (oRowItem instanceof ConditionalDose) {
            let DispTxt1: TextBlock = ObjectHelper.CreateType<TextBlock>(e.Row.Cells[this.grdConditionalDose.GetColumnIndexByName("ValueRange")].Content, TextBlock);
            let DispTooltip1: iLabel = new iLabel();
            DispTooltip1.Width = 120;
            DispTooltip1.Text = DispTxt1.Text;
            DispTooltip1.IsWordwrap = true;
            DispTxt1.SetValue(ToolTipService.ToolTipProperty, DispTooltip1);
            e.Row.Cells[this.grdConditionalDose.GetColumnIndexByName("ValueRange")].SetValue(ToolTipService.ToolTipProperty, DispTooltip1);
            let DispTxt2: TextBlock = ObjectHelper.CreateType<TextBlock>(e.Row.Cells[this.grdConditionalDose.GetColumnIndexByName("grdDoseinstruction")].Content, TextBlock);
            let DispTooltip2: iLabel = new iLabel();
            DispTooltip2.Width = 200;
            DispTooltip2.Text = DispTxt2.Text;
            DispTooltip2.IsWordwrap = true;
            DispTxt2.SetValue(ToolTipService.ToolTipProperty, DispTooltip2);
            e.Row.Cells[this.grdConditionalDose.GetColumnIndexByName("grdDoseinstruction")].SetValue(ToolTipService.ToolTipProperty, DispTooltip2);
        }
    }
    MedConditionalDose_Loaded(sender: Object, e: RoutedEventArgs): void {
        //[ { height: '30fr'}, { height: '25fr'},{ height:'150fr'}]
        let conditionaldose={RowDefinitions:[ { height: '30fr'}, { height: '25fr'},{ height:'150fr'}]}        
        if (this.DataContext != null) {
            this.Conditionaldose.RowDefinitions[0].height = "30px";
            this.Conditionaldose.RowDefinitions[1].height = "150px";
            this.Conditionaldose.RowDefinitions[2].height = "25px";
            //Grid.SetRow(this.grdConditionalDose, 1);
            this.grdConditionalDoseRow=2;
            //this.grdConditionalDose.ItemsSource = this.ConditionalVM.DefinedConditions;
            ;
        } 
    }
}