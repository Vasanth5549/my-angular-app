import { ChangeDetectorRef, Component, Input, QueryList, ViewChild, ViewChildren, ViewEncapsulation } from '@angular/core';
import { List, ObservableCollection, Visibility } from 'epma-platform/models';
import { Binding, Border, CheckBox, Color, Colors, DataTemplate, Grid, MouseButtonEventArgs, SolidColorBrush, StackPanel, Style, TextBlock, UserControl, iCheckBox } from 'epma-platform/controls';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import { ObjectHelper } from 'epma-platform/helper';
import { ChartColumn } from '../common/ChartColumn';
import { Dictionary } from 'epma-platform/dictionary';
import { ChartRow } from '../common/ChartRow';
import { FrameworkElement, HorizontalAlignment, RoutedEventArgs, SizeChangedEventArgs, Thickness, VerticalAlignment } from 'src/app/shared/epma-platform/controls/FrameworkElement';
import { TagObject } from '../common/TagObject';
import { ChartCell } from '../common/ChartCell';
import { IChartSlot } from '../common/IChartSlot';
import { AdministratedSlot } from '../common/AdministratedSlot';
import { DefaultSlot } from '../common/DefaultSlot';
import { AsRequiredSlot } from '../common/AsRequiredSlot';
import { TodayAsRequiredSlot } from '../common/TodayAsRequiredSlot';
import { TodayMultiSlot } from '../common/TodayMultiSlot';
import { ChartStringIcon } from '../common/ChartStringIcon';
import { BlankSlot } from '../common/BlankSlot';
import { OverviewSlot } from '../common/OverViewSlot';
import { DoseOverviewSlot } from '../common/DoseOverViewSlot';
import { UIElement } from 'src/app/shared/epma-platform/controls/UIElement';
import { DependencyObject, VisualTreeHelper } from 'src/app/shared/epma-platform/models/eppma-common-types';
import { ChartIcon } from '../common/ChartIcon';
import { DrugItem } from '../common/DrugItem';
import { TimeSlot } from '../common/TimeSlot';
import { GridExtension, GridViewCell, GridViewLength, GridViewLengthUnitType, GridViewRow, RowLoadedEventArgs, SelectionChangeEventArgs, SelectionChangingEventArgs, iGridViewDataColumn, SelectionMode, TextAlignment } from 'src/app/shared/epma-platform/controls/epma-grid-helpers/grid-extension';
import { GridComponent, RowClassArgs } from '@progress/kendo-angular-grid';
import { DependencyPropertyChangedEventArgs } from 'src/app/shared/epma-platform/controls/Control';
import { Image } from 'epma-platform/controls';
import { IEnableDST } from 'src/app/shared/epma-platform/models/EnableDST';
import { App } from 'src/app/shared/epma-platform/controls/ResourceStyle';
import * as ControlStyles from "../../shared/epma-platform/controls/ControlStyles";
import { GetMedsChartData } from "../../lorappmedicationadminbbui/common/getmedschartdata";
import { AppLoadService, BusyIndicator, MediatorDataService, MedicationService } from 'epma-platform/services';
import { TemplateLoader } from './TemplateLoader/templateLoader';
import { CommonBB } from 'src/app/lorappcommonbb/utilities/common';
import * as _ from 'lodash';
import {ActionByWrapConverterPipe, CommentsWrapConverterPipe, ImageURIBitMapPipe, InfusionDoseWrapConverterPipe, InfusionRouteWrapConverterPipe, LineBreakWrapConverterPipe, OmitWrapConverterPipe, PrescribedByWrapConverterPipe, ReasonWrapConverterPipe, ReviewWrapConverterPipe, StartDTWrapConverterPipe, StopDTWrapConverterPipe, RouteWrapMedConverterPipe, DoseWrapMedConverterPipe} from 'src/app/lorarcbluebirdmedicationchart/converter/MedChartConverter.pipe';
import {ChangeDetectionStrategy} from '@angular/core';
import { InjectorInstance } from 'src/app/app.module';
@Component({
    selector: 'iMedicationChart',
    templateUrl: './iMedicationChart.component.html',
    styleUrls: ['./iMedicationChart.component.css'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})


export class iMedicationChart extends UserControl implements IEnableDST {
    dtCurrentDateTime: DateTime = CommonBB.GetServerDateTime();
    public LayoutRoot: Grid;
    afterViewInitColumnLoaded: boolean = false;
    _chartrows: ObservableCollection<ChartRow>;
    rowIndexArray:number[]=[];
    @ViewChild("LayoutRootTempRef", { read: Grid, static: false }) set _LayoutRoot(c: Grid) {
        if (c) { this.LayoutRoot = c; }
    };
    public dataTemplates: QueryList<DataTemplate>;
    @ViewChildren(DataTemplate) set _dataTemplates(c: QueryList<DataTemplate>) {
        if (c) {
            this.dataTemplates = c;
            this.GridControl.dataTemplates = c;
             for(let i in this.ChartRows){
                let context:{index:any,dataItem:any}={index:0,dataItem:{}};
                context.index = i;
                context.dataItem = this.ChartRows[i];
                 let rowEventArgs = this.GridControl.GetRowEventArgs(this.dataTemplates, context);
             
            try{
                if(!Number.isNaN(Number(i))){
                    if(  this.ChartRows[i].TimeSlots[0]._SlotHeight < 90){
                        this.cellRowHeights.push({
                            rowheight:this.ChartRows[i].TimeSlots[0]._SlotHeight * this.ChartRows[i].TimeSlots.Count,
                            slotheight:this.ChartRows[i].TimeSlots[0]._SlotHeight,
                            timeSlotCount:this.ChartRows[i].TimeSlots.Count,
                            index:i
                        });
                        if(!this.isMedChartView && Number(i)<=5 && this.ChartRows[i].TimeSlots.Count > 35 ){
                            let _mediatorDataService = InjectorInstance.get<MediatorDataService>(MediatorDataService);
                            console.log("templateloader._medicationService",_mediatorDataService.rowVirtualization);
                            _mediatorDataService.rowVirtualization = false;
                        //    this.loadedCount = Number(i)-1;
                        }
                    }else{
                        this.cellRowHeights.push({
                            rowheight:this.ChartRows[i].TimeSlots[0]._SlotHeight,
                            slotheight:null,
                            timeSlotCount:0,
                            index:i})
                    }
                }

            }catch(e){
                console.log("calculation error")
            }
                this.GridControl_RowLoaded(rowEventArgs);
           
            }
        }
    }
    public GridControl: GridExtension = new GridExtension();
    @ViewChild("GridControlTempRef", { read: GridComponent })
    set _kendoGrid(c: GridComponent) {
        if (c) {
            this.GridControl.grid = c;
            this.GridControl.columns = c.columns;
            if (this.afterViewInitColumnLoaded)
                this.GridControl.GenerateColumns();
        }
    }
    private SelectCheckbox: QueryList<iCheckBox>;
    @ViewChildren('SelectCheckboxTempRef', { read: iCheckBox })
    set _SelectCheckbox(c: QueryList<iCheckBox>) {
      if (c) {
        this.SelectCheckbox = c;
      }
    }
    private nFrozenColumnCount: number;
    private oChartColumns: List<ChartColumn>;
    private RowCount: number = 0;
    public static oMedicationChart: iMedicationChart;
    private IsAutoGenerated: boolean = false;
    private _Format: string = "dd/MM/yyyy";
    private _TimeFormat: string = "HH:mm";
    private _DrugHeader: string;
    private _CheckboxColumn: boolean = false;
    private _HeaderBorder: Border = new Border();
    ImageURIBitMap: ImageURIBitMapPipe = new ImageURIBitMapPipe();
    InfusionDoseWrap: InfusionDoseWrapConverterPipe = new InfusionDoseWrapConverterPipe();
    StartDTWrap: StartDTWrapConverterPipe = new StartDTWrapConverterPipe();
    StopDTWrap: StopDTWrapConverterPipe = new StopDTWrapConverterPipe();
    ReviewWrap: ReviewWrapConverterPipe = new ReviewWrapConverterPipe();
    CommentsWrap: CommentsWrapConverterPipe = new CommentsWrapConverterPipe();
    ReasonWrap: ReasonWrapConverterPipe = new ReasonWrapConverterPipe();
    ActionWrap: ActionByWrapConverterPipe = new ActionByWrapConverterPipe();
    PrescribedByWrap: PrescribedByWrapConverterPipe = new PrescribedByWrapConverterPipe();
    InfusionRouteWrap: InfusionRouteWrapConverterPipe = new InfusionRouteWrapConverterPipe();
    OmitWrap: OmitWrapConverterPipe = new OmitWrapConverterPipe();
    LineBreakWrap: LineBreakWrapConverterPipe = new LineBreakWrapConverterPipe();
    DoseWrapConverter: DoseWrapMedConverterPipe = new DoseWrapMedConverterPipe();
    RouteWrapConvert:RouteWrapMedConverterPipe = new RouteWrapMedConverterPipe();
    // DefaultSlotBrdColor: SolidColorBrush = new SolidColorBrush(Color.FromArgb(255, 112, 144, 165)); //Sangeetha
    DefaultSlotBrdColor: any = "#709190";
    DicSelectedSlots: Dictionary<string, Border> = new Dictionary<string, Border>();
    DicSelectedItems: Dictionary<string, ChartRow> = new Dictionary<string, ChartRow>();
    DicUnSelectedItems: Dictionary<string, ChartRow> = new Dictionary<string, ChartRow>();
    chartRow: GetMedsChartData = new GetMedsChartData();

    gridData: ObservableCollection<any>;
    loadedCount = 5;
    public Styles = ControlStyles;
    @Input() isOverviewChart?:boolean = false;
    @Input() isMedChartView?:boolean = true;
    @Input() get isChildWizard(){
        return AppLoadService.isChildWizard;
    } 
// Bug id 53541
    //enterDoseChartRow:any;
    enterDoseKey:any;
    borders:any = [];
//end
isTimeOutStarted:boolean = true;
cellRowHeights=[];
    constructor(public medicationService?: MedicationService, private changeDetectionRef?: ChangeDetectorRef) {
        super();
        iMedicationChart.oMedicationChart = this;
        this.Loaded = (s, e) => { this.iMedicationChart_Loaded(s, e); };
        // iThemeManager.SetApplicationTheme("/LorArcBlueBirdTheme;component/Themes/Generic.xaml"); //CSS
        // this.DefaultSlotBrdColor = ObjectHelper.CreateType<SolidColorBrush>(this.GridControl.VerticalGridLinesBrush, SolidColorBrush); //Sangeetha
        this.DefaultSlotBrdColor = "#7090A5";
    }
    endRowDetails={endRow: 0,timeSlotNumber:0};
    ngAfterViewInit(): void {
        this.GridControl.GenerateColumns();
        this.afterViewInitColumnLoaded = true;

        this.iMedicationChart_Loaded(null, null);
        setTimeout(()=>{
           try{
               let _mediatorDataService = InjectorInstance.get<MediatorDataService>(MediatorDataService);

               if(!_mediatorDataService.rowVirtualization)
               this.loadDataTemplateInit((document.getElementsByClassName("iMedicationChart")[0] as any).offsetHeight);
                }catch(e){
                   console.log(e);
                }
        },500)
        setTimeout(() => {
            BusyIndicator.SetStatusIdle("MedChartLoaded");
            document.querySelector('.iMedicationChart.k-grid .k-grid-content').addEventListener('scroll', _.throttle((e) => {
                try{
                if (!this.isTimeOutStarted) {
                    //scroll ending
                    this.scrollEvent(e);
                    this.isTimeOutStarted = true;
                   // console.log("imedicationchart-isTimeOutStarted", this.isTimeOutStarted, "scrollhappened")
                } else {
                    //scroll starting
                    this.isTimeOutStarted = false;
                    this.fillRemainingTimeSlots();
                    //  console.log("imedicationchart-isTimeOutStarted", this.isTimeOutStarted, "scrollhappeneddidnthappen")
                }
            }catch(e){
                console.log(e);
            }
            }, 500))
        }, 3000);
        if(this.changeDetectionRef)
        this.changeDetectionRef.markForCheck();
    
}
fillRemainingTimeSlots(){
    // this.endRowDetails.endRow = 3;
    // this.endRowDetails.timeSlotNumber=6;
    let _mediatorDataService = InjectorInstance.get<MediatorDataService>(MediatorDataService);
  
        let slotvirtualization = this.cellRowHeights.find(x=>x.index>this.loadedCount && x.index < 6 && x.timeSlotCount > 35);
        this.endRowDetails.timeSlotNumber = slotvirtualization ? 0 : this.endRowDetails.timeSlotNumber;
        if(!_mediatorDataService.rowVirtualization || slotvirtualization){
          console.log("endrow",this.endRowDetails.endRow,this.dataTemplates);
         let dtaa = this.dataTemplates.filter(x=> !!x.Child);

     
            let i = 0;
             this.dataTemplates.forEach(x =>{
                
                if(x.Child && x.Child.constructor?.name == 'Grid'  ){
                
                 x.Child?.ChildrenArr.forEach(y =>
                     {
                     if(y.control.constructor?.name == 'StackPanel'){
                     
                         for(let z = 0;(  z<y.control.ChildrenElementArray.length && y.control.ChildrenElementArray.length > 35);z++){
                             if(z>this.endRowDetails.timeSlotNumber && y.control.ChildrenElementArray[z])
                             y.control.ChildrenElementArray[z].isControlRendered = true;
                         }
                        
                     }
                 })
                
                }
             });
            
    _mediatorDataService.rowVirtualization = true;
            setTimeout(()=>{
                if(this.changeDetectionRef)
                this.changeDetectionRef.detectChanges();

            },500)
           
        }

    }
    scrollEvent(event) {
      //  console.log("scrollevent:", event);
    let _mediatorDataService = InjectorInstance.get<MediatorDataService>(MediatorDataService);
    if(_mediatorDataService.rowVirtualization){
        const scrollTop = event.target.scrollTop;
        const clientHeight = event.target.clientHeight;
        try{
        let startRow = this.calculateRow(scrollTop);
        let remainingVisibleHgt = scrollTop + clientHeight;
        let lastRow = this.calculateRow(remainingVisibleHgt);
        let filteredData = this.dataTemplates.filter(x => x.render == false && x.index <= lastRow);
        if (filteredData && filteredData.length > 0) {
            filteredData.map(x => x.render = true)
        }
        this.changeDetectionRef.detectChanges();
        }catch(e){
            console.log(e);
        }
    }
      //  console.log("startRow: ",startRow,"lastRow: ",lastRow);

    }
    loadDataTemplateInit(remainingVisibleHgt1){
        console.log("remainingVisibleHgt1",remainingVisibleHgt1);
        let lastRow1 = this.calculateRow1(remainingVisibleHgt1);
        if(lastRow1.innerRow == -1){
            for(let i = lastRow1.i;i < 6 && i < this.cellRowHeights.length;i++){
                if(this.cellRowHeights[i].timeSlotCount > 35){
                    let _mediatorDataService = InjectorInstance.get<MediatorDataService>(MediatorDataService);
                    console.log("templateloader._medicationService",_mediatorDataService.rowVirtualization);
                    _mediatorDataService.rowVirtualization = true;
                    this.loadedCount = lastRow1.i;
                    let filteredData = this.dataTemplates.filter(x => x.render == false && x.index >= 0 && x.index <= lastRow1.i);
                    if (filteredData && filteredData.length > 0) {
                        filteredData.map(x => x.render = true)
                    }
                }
            }
        }
        this.endRowDetails.endRow = lastRow1.i;
        this.endRowDetails.timeSlotNumber = lastRow1.innerRow-1;
        console.log("endrow",lastRow1.innerRow);
        let isControlRendered = true;

        this.dataTemplates.forEach(x => {
           if( x.Child && x.Child.constructor?.name == 'Grid'){
          
        x.Child?.ChildrenArr.forEach(y =>
                {
                if(y.control.constructor?.name == 'StackPanel'){
                
                     let condition = y.control.ChildrenElementArray.length;
                    if(y.control.ChildrenElementArray.length > 35){
                        condition = lastRow1.innerRow;
                    }
                    for(let z =0; (z<condition);z++){
                        if(y.control.ChildrenElementArray[z])
                        y.control.ChildrenElementArray[z].isControlRendered = isControlRendered;
                    }
                
                }
            })
           }
        });
    
                this.changeDetectionRef.detectChanges();

    }
    calculateRow1(scrollTop) {
        let totalheight = 0;
        let i = 0;
        let innerRow = 0;
        console.log("remainingVisibleHgt.2");
        // if(this.cellRowHeights[0].slotheight != null){
        while (totalheight < scrollTop) {
            console.log("remainingVisibleHgt",innerRow);
            if(this.cellRowHeights[i]){
                if(this.cellRowHeights[i].slotheight == null) {

                    totalheight += this.cellRowHeights[i].rowheight;
                    i++;
                    innerRow = 0;
                }
                    else{

                        totalheight += this.cellRowHeights[i].slotheight;
                        if(innerRow == (this.cellRowHeights[i].timeSlotCount-1)){
                            i++;
                            innerRow = 0;
                        }else{
                        innerRow++;
                        }
                    }
            }else{
                i--;
                innerRow = this.cellRowHeights[i].timeSlotCount;
                totalheight =scrollTop
            }
          
        }
        if(innerRow < 0){
            innerRow = 0;
        }else{
            innerRow = innerRow - 1;
            i -= 1;
        }
        return {i, innerRow};
    }
    calculateRow(scrollTop) {
        let totalheight = 0;
        let i = 0;
        while ((totalheight < scrollTop) && this.cellRowHeights[i]) {
            totalheight += this.cellRowHeights[i].rowheight;
            i++;
        }
        return i - 1;
    }
    loadMore(e){
        let filteredData = this.dataTemplates.filter(x=>x.render == false)
        if (filteredData && filteredData.length > 0) {
            // BusyIndicator.SetStatusBusy('Editor');
            filteredData.map( x=>x.render = true)
            // setTimeout(()=>{
            //     BusyIndicator.SetStatusIdle('Editor');
            // },3000);
        }

    }
    ngOnInit() {
        this.GridControl.IsCustomCellHeight = true;
        this.GenerateColumnList();
        BusyIndicator.SetStatusBusy("MedChartLoaded");
    }
    iMedicationChart_Loaded(sender: Object, e: RoutedEventArgs): void {
        try {
            if (this.AutoGenerateColumn && this.IsValidDate(this.StartDate) && this.IsValidDate(this.EndDate)) {
                this.ChartColumns = null;
                this.GenerateColumnList();
            }
        }
        catch (err) {
        }
    }
    rowCallback = (context: RowClassArgs) => {
        let rowStyles = this.GridControl.getRowClasses(context);
        return rowStyles;
    };
    private GenerateColumnList(): void {
        try {
            let colInd: number = 0;
            let objChartCols: List<ChartColumn> = new List<ChartColumn>();
            if (this.CheckBoxColumn) {
                // let oSelcol: ChartColumn = ObjectHelper.CreateObject(new ChartColumn(), { Caption: String.Empty, Index: colInd, IsToday: false });
                // oSelcol.Width = 30;
                // objChartCols.Add(oSelcol);
                colInd += 1;
            }
            let oDrugCol: ChartColumn = ObjectHelper.CreateObject(new ChartColumn(), { Caption: this.DrugHeader, Index: colInd, IsToday: false });
            objChartCols.Add(oDrugCol);
            colInd += 1;
            if (this.ShowSlotTiminings) {
                let oSlotTimeCol: ChartColumn = ObjectHelper.CreateObject(new ChartColumn(), { Caption: this.SlotTimeHeader, Index: colInd, IsToday: false });
                oSlotTimeCol.Width = this.SlotTimeWidth;
                objChartCols.Add(oSlotTimeCol);
                colInd += 1;
            }
            for (let sD: DateTime = this.StartDate; sD <= this.EndDate; sD = sD.AddDays(1)) {
                let oChartcol: ChartColumn = new ChartColumn();
                oChartcol.Caption = sD.DateTime.ToString(this.Format);
                oChartcol.Index = colInd;
                let isToday: boolean = (DateTime.Equals(sD,this.TodayDate)) ? true : false;
                oChartcol.IsToday = isToday;
                oChartcol.Width = this.ColWidth;
                if (isToday)
                    oChartcol.Width = this.TodayColWidth;
                objChartCols.Add(oChartcol);
                colInd += 1;
            }
            this.ChartColumns = objChartCols;
            this.IsAutoGenerated = true;
        }
        catch (err) {

        }

    }
    public RefreshIndividualSlot(updateObject: any): void {
        try {
            let selRowIndx: number;
            let selColIndx: number = updateObject.oChartColumn.Index;
            let vChartRow: ChartRow = this.ChartRows.Where(vChartRows => vChartRows.ChartCells.Any(cCell => cCell.Equals(updateObject.oChartCell))).Select(s => s).First();
            selRowIndx = this.ChartRows.IndexOf(vChartRow);
            let objChartCell: ChartCell = this.ChartRows[selRowIndx].ChartCells.Where(oC => oC == updateObject.oChartCell).First();
            objChartCell.Slots[0] = updateObject.oIChartSlot;
            let parentGrid: Grid = ObjectHelper.CreateType<Grid>(this.GridControl.Rows[selRowIndx].Cells[selColIndx].Content, Grid);
            let CellGrid: StackPanel = new StackPanel();
            if (parentGrid.Children.Count() > 1)
                parentGrid.Children.RemoveAt(1);
            parentGrid.ChildrenArr.pop();
            parentGrid.Children.Add(CellGrid);
            for (let j: number = 0; j < objChartCell.Slots.Count; j++) {
                let oChartSlotType: IChartSlot = objChartCell.Slots[j];
                CellGrid.VerticalAlignment = VerticalAlignment.Stretch;
                CellGrid.HorizontalAlignment = HorizontalAlignment.Stretch;
                CellGrid.Orientation = 'Vertical';
                switch (ObjectHelper.GetType(oChartSlotType)) {
                    case "TodayAsRequiredSlot":
                        {
                            let oTodayAsRequiredSlot: TodayAsRequiredSlot = ObjectHelper.CreateType<TodayAsRequiredSlot>(oChartSlotType, TodayAsRequiredSlot);
                            let objTodayAsRequiredSlot: Border = this.GetTemplate<Border>("TodayAsRequiredSlot", oTodayAsRequiredSlot);
                            if (objTodayAsRequiredSlot == null)
                                return
                            if (oTodayAsRequiredSlot.SlotHeight > 0.0) {
                                objTodayAsRequiredSlot.Height = oTodayAsRequiredSlot.SlotHeight;
                                objTodayAsRequiredSlot.Child.Height = oTodayAsRequiredSlot.SlotHeight;
                            }
                            let objTagcon: TagObject = new TagObject();
                            objTagcon.oDrugItem = updateObject.oDrugItem;
                            objTagcon.oIChartSlot = oTodayAsRequiredSlot;
                            objTagcon.oChartColumn = updateObject.oChartColumn;
                            if (objTagcon.oIChartSlot.HighlightReviewSlot) {
                                (<Border>(objTodayAsRequiredSlot)).BorderThickness = ControlStyles.ReviewBorderWidth;
                                (<Border>(objTodayAsRequiredSlot)).BorderBrush = new SolidColorBrush(Colors.Red).color.color;
                            }
                            objTagcon.oChartCell = objChartCell;
                            let tagBind: Binding = new Binding();
                            tagBind.Source = objTagcon;
                            (<Border>(objTodayAsRequiredSlot)).SetBinding(Border.TagProperty, tagBind);
                            objTodayAsRequiredSlot.Background = oTodayAsRequiredSlot.BackGroundColor.color.color;
                            objTodayAsRequiredSlot.MouseLeftButtonDown = (s, e) => this.Slot_MouseLeftButtonDown(s, e);
                            
                            objTodayAsRequiredSlot.DataContext = oTodayAsRequiredSlot;
                            objTodayAsRequiredSlot.SetValue(Grid.RowProperty, j);
                            CellGrid.Children.Add(objTodayAsRequiredSlot);
                            this.CheckAndUpdateSelectedSlots(<Border>(objTodayAsRequiredSlot));
                            break;
                        }
                    case "TodayMultiSlot":
                        {
                            let oTodayMultiSlot: TodayMultiSlot = ObjectHelper.CreateType<TodayMultiSlot>(oChartSlotType, TodayMultiSlot);
                            if (oTodayMultiSlot != null && oTodayMultiSlot.AdminSummary != null) {
                                while (oTodayMultiSlot.AdminSummary.Count < 4) {
                                    let oChartIcon: ChartStringIcon = new ChartStringIcon();
                                    oChartIcon.StringData = String.Empty;
                                    oChartIcon.Tooltip = String.Empty;
                                    oChartIcon.EnableOnHotSpotClick = false;
                                    oChartIcon.UriString = String.Empty;
                                    oTodayMultiSlot.AdminSummary.Add(oChartIcon);
                                }
                            }
                            let objTodayMultiSlot: Border = this.GetTemplate<Border>("TodayMultiSlot", oTodayMultiSlot);
                            if (objTodayMultiSlot == null)
                                return
                            if (oTodayMultiSlot.SlotHeight > 0.0) {
                                objTodayMultiSlot.Height = oTodayMultiSlot.SlotHeight;
                                objTodayMultiSlot.Child.Height = oTodayMultiSlot.SlotHeight;
                            }
                            let objTagcon: TagObject = new TagObject();
                            objTagcon.oDrugItem = updateObject.oDrugItem;
                            objTagcon.oIChartSlot = oTodayMultiSlot;
                            objTagcon.oChartColumn = updateObject.oChartColumn;
                            if (objTagcon.oIChartSlot.HighlightReviewSlot) {
                                (<Border>(objTodayMultiSlot)).BorderThickness = ControlStyles.ReviewBorderWidth;
                                (<Border>(objTodayMultiSlot)).BorderBrush = new SolidColorBrush(Colors.Red).color.color;
                            }
                            objTagcon.oChartCell = objChartCell;
                            let tagBind: Binding = new Binding();
                            tagBind.Source = objTagcon;
                            (<Border>(objTodayMultiSlot)).SetBinding(Border.TagProperty, tagBind);
                            objTodayMultiSlot.MouseLeftButtonDown = (s, e) => this.Slot_MouseLeftButtonDown(s, e);
                            objTodayMultiSlot.Background = oTodayMultiSlot.BackGroundColor.color.color;
                            objTodayMultiSlot.DataContext = oTodayMultiSlot;
                            objTodayMultiSlot.SetValue(Grid.RowProperty, j);
                            CellGrid.Children.Add(objTodayMultiSlot);
                            this.CheckAndUpdateSelectedSlots(<Border>(objTodayMultiSlot));
                            break;
                        }
                }
                if(this.changeDetectionRef)
                this.changeDetectionRef.markForCheck();
            }
        }
        catch (err) {
            console.log(err);
        }
    }
    public RefreshCell(updateObject: TagObject): void {
        try {
            let selRowIndx: number;
            let selColIndx: number = updateObject.oChartColumn.Index;
            let slotIndx: number = 0;
            let nCount: number = updateObject.oChartCell.Slots.Count;
            for (let i: number = 0; i < nCount; i++) {
                let sl = updateObject.oChartCell.Slots[i];
                if (sl.Key == updateObject.oIChartSlot.Key) {
                    break;
                }
                slotIndx += 1;
            }
            let vChartRow: ChartRow = this.ChartRows.Where(vChartRows => vChartRows.ChartCells.Any(cCell => cCell.Equals(updateObject.oChartCell))).Select(s => s).First();
            selRowIndx = this.ChartRows.IndexOf(vChartRow);
            let objChartCell: ChartCell = this.ChartRows[selRowIndx].ChartCells.Where(oC => oC == updateObject.oChartCell).First();
            objChartCell.Slots[slotIndx] = updateObject.oIChartSlot;
            let parentGrid: Grid = ObjectHelper.CreateType<Grid>(this.GridControl.Rows[selRowIndx].Cells[selColIndx].Content, Grid);
            let CellGrid: StackPanel = new StackPanel();
            if (parentGrid.Children.Count() > 1)
                parentGrid.Children.RemoveAt(1);
            parentGrid.ChildrenArr.pop();
            parentGrid.Children.Add(CellGrid);
            for (let j: number = 0; j < objChartCell.Slots.Count; j++) {
                let oChartSlotType: IChartSlot = objChartCell.Slots[j];
                CellGrid.VerticalAlignment = VerticalAlignment.Stretch;
                CellGrid.HorizontalAlignment = HorizontalAlignment.Stretch;
                CellGrid.Orientation = 'Vertical';
                switch (ObjectHelper.GetType(oChartSlotType)) {
                    case "AdministratedSlot":
                        {
                            let oAdminSlot: AdministratedSlot = ObjectHelper.CreateType<AdministratedSlot>(oChartSlotType, AdministratedSlot);
                            if(this.GridControl.Rows[selRowIndx]){
                                oAdminSlot.IsChartAdminSlotLastColumn = selColIndx == this.GridControl.Rows[selRowIndx].Cells.Count - 1 ? true : false;
                            }
                            let objAdministratedSlot: Border = this.GetTemplate<Border>("AdministratedSlot", oAdminSlot);
                            if (objAdministratedSlot == null)
                                return
                            if (oAdminSlot.SlotHeight > 0.0) {
                                objAdministratedSlot.Height = oAdminSlot.SlotHeight;
                                objAdministratedSlot.Child.Height = oAdminSlot.SlotHeight;
                            }
                            let objTagcon: TagObject = new TagObject();
                            objTagcon.oDrugItem = updateObject.oDrugItem;
                            objTagcon.oIChartSlot = oAdminSlot;
                            objTagcon.oChartColumn = updateObject.oChartColumn;
                            objTagcon.oChartCell = objChartCell;
                            if (objTagcon.oIChartSlot.HighlightReviewSlot) {
                                (<Border>(objAdministratedSlot)).BorderThickness = ControlStyles.ReviewBorderWidth;
                                (<Border>(objAdministratedSlot)).BorderBrush = new SolidColorBrush(Colors.Red).color.color;
                            }
                            let tagBind: Binding = new Binding();
                            tagBind.Source = objTagcon;
                            (<Border>(objAdministratedSlot)).SetBinding(Border.TagProperty, tagBind);
                            objAdministratedSlot.MouseLeftButtonDown = (s, e) => this.Slot_MouseLeftButtonDown(s, e);
                            objAdministratedSlot.noDefaultStyle = true;
                            objAdministratedSlot.Background = oAdminSlot.BackGroundColor.color.color;
                            objAdministratedSlot.DataContext = oAdminSlot;
                            objAdministratedSlot.SetValue(Grid.RowProperty, j);
                            CellGrid.Children.Add(objAdministratedSlot);
                            this.CheckAndUpdateSelectedSlots(<Border>(objAdministratedSlot));
                            break;
                        }
                    case "DefaultSlot":
                        {
                            let oDefaultSlot: DefaultSlot = ObjectHelper.CreateType<DefaultSlot>(oChartSlotType, DefaultSlot);
                            if(this.GridControl.Rows[selRowIndx]){
                                oDefaultSlot.IsChartDefaultSlotLastColumn = selColIndx == this.GridControl.Rows[selRowIndx].Cells.Count - 1 ? true : false;
                            }
                            let objNormalDefaultSlot: Border = this.GetTemplate<Border>("NormalDefaultSlot", oDefaultSlot, this.TimeFormat);
                            if (objNormalDefaultSlot == null)
                                return
                            if (oDefaultSlot.SlotHeight > 0.0) {
                                objNormalDefaultSlot.Height = oDefaultSlot.SlotHeight;
                                objNormalDefaultSlot.Child.Height = oDefaultSlot.SlotHeight;
                            }
                            objNormalDefaultSlot.noDefaultStyle = true;
                            let objTagcon: TagObject = new TagObject();
                            objTagcon.oDrugItem = updateObject.oDrugItem;
                            objTagcon.oIChartSlot = oDefaultSlot;
                            objTagcon.oChartColumn = updateObject.oChartColumn;
                            if (objTagcon.oIChartSlot.HighlightReviewSlot) {
                                (<Border>(objNormalDefaultSlot)).Style = ControlStyles.ReviewBorderWidth;
                                (<Border>(objNormalDefaultSlot)).BorderBrush = new SolidColorBrush(Colors.Red).color.color;
                            }
                            objTagcon.oChartCell = objChartCell;
                            let tagBind: Binding = new Binding();
                            tagBind.Source = objTagcon;
                            (<Border>(objNormalDefaultSlot)).SetBinding(Border.TagProperty, tagBind);
                            objNormalDefaultSlot.MouseLeftButtonDown = (s, e) => this.Slot_MouseLeftButtonDown(s, e);
                            objNormalDefaultSlot.Background = oDefaultSlot.BackGroundColor.color.color;
                            objNormalDefaultSlot.DataContext = oDefaultSlot;
                            objNormalDefaultSlot.SetValue(Grid.RowProperty, j);
                            CellGrid.Children.Add(objNormalDefaultSlot);
                            this.CheckAndUpdateSelectedSlots(<Border>(objNormalDefaultSlot));
                            break;
                        }
                    case "AsRequiredSlot":
                        {
                            let oAsRequiredSlot: AsRequiredSlot = ObjectHelper.CreateType<AsRequiredSlot>(oChartSlotType, AsRequiredSlot);
                            if(this.GridControl.Rows[selRowIndx]){
                                oAsRequiredSlot.IsChartAsRequiredSlotLastColumn = selColIndx == this.GridControl.Rows[selRowIndx].Cells.Count - 1 ? true : false;
                            }
                            let objAsRequiredSlot: Border = this.GetTemplate<Border>("AsRequiredSlot", oAsRequiredSlot);
                            if (objAsRequiredSlot == null)
                                return
                            if (oAsRequiredSlot.SlotHeight > 0.0) {
                                objAsRequiredSlot.Height = oAsRequiredSlot.SlotHeight;
                                objAsRequiredSlot.Child.Height = oAsRequiredSlot.SlotHeight;
                            }
                            let objTagcon: TagObject = new TagObject();
                            objTagcon.oDrugItem = updateObject.oDrugItem;
                            objTagcon.oIChartSlot = oAsRequiredSlot;
                            objTagcon.oChartColumn = updateObject.oChartColumn;
                            if (objTagcon.oIChartSlot.HighlightReviewSlot) {
                                (<Border>(objAsRequiredSlot)).BorderThickness = ControlStyles.ReviewBorderWidth;
                                (<Border>(objAsRequiredSlot)).BorderBrush = new SolidColorBrush(Colors.Red).color.color;
                            }
                            objTagcon.oChartCell = objChartCell;
                            let tagBind: Binding = new Binding();
                            tagBind.Source = objTagcon;
                            (<Border>(objAsRequiredSlot)).SetBinding(Border.TagProperty, tagBind);
                            objAsRequiredSlot.MouseLeftButtonDown = (s, e) => this.Slot_MouseLeftButtonDown(s, e);
                            objAsRequiredSlot.Background = oAsRequiredSlot.BackGroundColor.color.color;
                            objAsRequiredSlot.DataContext = oAsRequiredSlot;
                            objAsRequiredSlot.SetValue(Grid.RowProperty, j);
                            CellGrid.Children.Add(objAsRequiredSlot);
                            this.CheckAndUpdateSelectedSlots(<Border>(objAsRequiredSlot));
                            break;
                        }
                    case "TodayAsRequiredSlot":
                        {
                            let oTodayAsRequiredSlot: TodayAsRequiredSlot = ObjectHelper.CreateType<TodayAsRequiredSlot>(oChartSlotType, TodayAsRequiredSlot);
                            if(this.GridControl.Rows[selRowIndx]){
                                oTodayAsRequiredSlot.IsChartTodayAsRequiredSlotLastColumn = selColIndx == this.GridControl.Rows[selRowIndx].Cells.Count - 1 ? true : false;
                            }
                            let objTodayAsRequiredSlot: Border = this.GetTemplate<Border>("TodayAsRequiredSlot", oTodayAsRequiredSlot);
                            if (objTodayAsRequiredSlot == null)
                                return
                            if (oTodayAsRequiredSlot.SlotHeight > 0.0) {
                                objTodayAsRequiredSlot.Height = oTodayAsRequiredSlot.SlotHeight;
                                objTodayAsRequiredSlot.Child.Height = oTodayAsRequiredSlot.SlotHeight;
                            }
                            let objTagcon: TagObject = new TagObject();
                            objTagcon.oDrugItem = updateObject.oDrugItem;
                            objTagcon.oIChartSlot = oTodayAsRequiredSlot;
                            objTagcon.oChartColumn = updateObject.oChartColumn;
                            if (objTagcon.oIChartSlot.HighlightReviewSlot) {
                                (<Border>(objTodayAsRequiredSlot)).BorderThickness = ControlStyles.ReviewBorderWidth;
                                (<Border>(objTodayAsRequiredSlot)).BorderBrush = new SolidColorBrush(Colors.Red).color.color;
                            }
                            objTagcon.oChartCell = objChartCell;
                            let tagBind: Binding = new Binding();
                            tagBind.Source = objTagcon;
                            (<Border>(objTodayAsRequiredSlot)).SetBinding(Border.TagProperty, tagBind);
                            objTodayAsRequiredSlot.MouseLeftButtonDown = (s, e) => this.Slot_MouseLeftButtonDown(s, e);
                            objTodayAsRequiredSlot.Background = oTodayAsRequiredSlot.BackGroundColor.color.color;
                            objTodayAsRequiredSlot.DataContext = oTodayAsRequiredSlot;
                            objTodayAsRequiredSlot.SetValue(Grid.RowProperty, j);
                            CellGrid.Children.Add(objTodayAsRequiredSlot);
                            this.CheckAndUpdateSelectedSlots(<Border>(objTodayAsRequiredSlot));
                            break;
                        }
                    case "TodayMultiSlot":
                        {
                            let oTodayMultiSlot: TodayMultiSlot = ObjectHelper.CreateType<TodayMultiSlot>(oChartSlotType, TodayMultiSlot);
                            if(this.GridControl.Rows[selRowIndx]){
                                oTodayMultiSlot.IsChartTodayMultiSlotLastColumn = selColIndx == this.GridControl.Rows[selRowIndx].Cells.Count - 1 ? true : false;
                            }
                            if (oTodayMultiSlot != null && oTodayMultiSlot.AdminSummary != null) {
                                while (oTodayMultiSlot.AdminSummary.Count < 4) {
                                    let oChartIcon: ChartStringIcon = new ChartStringIcon();
                                    oChartIcon.StringData = String.Empty;
                                    oChartIcon.Tooltip = String.Empty;
                                    oChartIcon.EnableOnHotSpotClick = false;
                                    oChartIcon.UriString = String.Empty;
                                    oTodayMultiSlot.AdminSummary.Add(oChartIcon);
                                }
                            }
                            let objTodayMultiSlot: Border = this.GetTemplate<Border>("TodayMultiSlot", oTodayMultiSlot);
                            if (objTodayMultiSlot == null)
                                return
                            if (oTodayMultiSlot.SlotHeight > 0.0) {
                                objTodayMultiSlot.Height = oTodayMultiSlot.SlotHeight;
                                objTodayMultiSlot.Child.Height = oTodayMultiSlot.SlotHeight;
                            }
                            let objTagcon: TagObject = new TagObject();
                            objTagcon.oDrugItem = updateObject.oDrugItem;
                            objTagcon.oIChartSlot = oTodayMultiSlot;
                            objTagcon.oChartColumn = updateObject.oChartColumn;
                            if (objTagcon.oIChartSlot.HighlightReviewSlot) {
                                (<Border>(objTodayMultiSlot)).BorderThickness = ControlStyles.ReviewBorderWidth;
                                (<Border>(objTodayMultiSlot)).BorderBrush = new SolidColorBrush(Colors.Red).color.color;
                            }
                            objTagcon.oChartCell = objChartCell;
                            let tagBind: Binding = new Binding();
                            tagBind.Source = objTagcon;
                            (<Border>(objTodayMultiSlot)).SetBinding(Border.TagProperty, tagBind);
                            objTodayMultiSlot.MouseLeftButtonDown = (s, e) => this.Slot_MouseLeftButtonDown(s, e);
                            objTodayMultiSlot.Background = oTodayMultiSlot.BackGroundColor.color.color;
                            objTodayMultiSlot.DataContext = oTodayMultiSlot;
                            objTodayMultiSlot.SetValue(Grid.RowProperty, j);
                            CellGrid.Children.Add(objTodayMultiSlot);
                            this.CheckAndUpdateSelectedSlots(<Border>(objTodayMultiSlot));
                            break;
                        }
                    case "BlankSlot":
                        {
                            let oBlankSlot: BlankSlot = ObjectHelper.CreateType<BlankSlot>(oChartSlotType, BlankSlot);
                            let objBlankSlot: Border = this.GetTemplate<Border>("BlankSlot");
                            if (objBlankSlot == null)
                                return
                            if (oBlankSlot.SlotHeight > 0.0)
                                objBlankSlot.Height = oBlankSlot.SlotHeight;
                            let objTagcon: TagObject = new TagObject();
                            objTagcon.oDrugItem = updateObject.oDrugItem;
                            objTagcon.oIChartSlot = oBlankSlot;
                            objTagcon.oChartColumn = updateObject.oChartColumn;
                            if (objTagcon.oIChartSlot.HighlightReviewSlot) {
                                (<Border>(objBlankSlot)).BorderThickness = ControlStyles.ReviewBorderWidth;
                                (<Border>(objBlankSlot)).BorderBrush = new SolidColorBrush(Colors.Red).color.color;
                            }
                            objTagcon.oChartCell = objChartCell;
                            let tagBind: Binding = new Binding();
                            tagBind.Source = objTagcon;
                            (<Border>(objBlankSlot)).SetBinding(Border.TagProperty, tagBind);
                            objBlankSlot.MouseLeftButtonDown = (s, e) => this.Slot_MouseLeftButtonDown(s, e);
                            // (<Border>(objBlankSlot)).SetBinding(Border.BackgroundProperty, new Binding("BackGroundColor"));
                            objBlankSlot.Background = oBlankSlot.BackGroundColor.color.color;
                            objBlankSlot.DataContext = oBlankSlot;
                            objBlankSlot.SetValue(Grid.RowProperty, j);
                            CellGrid.Children.Add(objBlankSlot);
                            this.CheckAndUpdateSelectedSlots(<Border>(objBlankSlot));
                            break;
                        }
                    case "OverviewSlot":
                        {
                            let oOverViewSlot: OverviewSlot = ObjectHelper.CreateType<OverviewSlot>(oChartSlotType, OverviewSlot);
                            let objOverViewSlot: Border = this.GetTemplate<Border>("OverviewSlot", oOverViewSlot);
                            if (objOverViewSlot == null)
                                return
                            if (oOverViewSlot.SlotHeight > 0.0) {
                                objOverViewSlot.Height = oOverViewSlot.SlotHeight;
                                objOverViewSlot.Child.Height = oOverViewSlot.SlotHeight;
                            }
                            let objTagcon: TagObject = new TagObject();
                            objTagcon.oDrugItem = updateObject.oDrugItem;
                            objTagcon.oIChartSlot = oOverViewSlot;
                            objTagcon.oChartColumn = updateObject.oChartColumn;
                            if (objTagcon.oIChartSlot.HighlightReviewSlot) {
                                (<Border>(objOverViewSlot)).BorderThickness = ControlStyles.ReviewBorderWidth;
                                (<Border>(objOverViewSlot)).BorderBrush = new SolidColorBrush(Colors.Red).color.color;
                            }
                            objTagcon.oChartCell = objChartCell;
                            let tagBind: Binding = new Binding();
                            tagBind.Source = objTagcon;
                            (<Border>(objOverViewSlot)).SetBinding(Border.TagProperty, tagBind);
                            objOverViewSlot.MouseLeftButtonDown = (s, e) => this.Slot_MouseLeftButtonDown(s, e);
                            objOverViewSlot.Background = oOverViewSlot.BackGroundColor.color.color;
                            objOverViewSlot.DataContext = oOverViewSlot;
                            objOverViewSlot.SetValue(Grid.RowProperty, j);
                            CellGrid.Children.Add(objOverViewSlot);
                            this.CheckAndUpdateSelectedSlots(<Border>(objOverViewSlot));
                            break;
                        }
                    case "DoseOverviewSlot":
                        {
                            let oDoseOverViewSlot: DoseOverviewSlot = ObjectHelper.CreateType<DoseOverviewSlot>(oChartSlotType, DoseOverviewSlot);
                            if(this.GridControl.Rows[selRowIndx]){
                                oDoseOverViewSlot.IsLastColumn = selColIndx == this.GridControl.Rows[selRowIndx].Cells.Count - 1 ? true : false;
                            }
                            let objDoseOverViewSlot: Border = this.GetTemplate<Border>("DoseOverviewSlot", oDoseOverViewSlot);
                            if (objDoseOverViewSlot == null)
                                return
                            if (oDoseOverViewSlot.SlotHeight > 0.0) {
                                objDoseOverViewSlot.Height = oDoseOverViewSlot.SlotHeight;
                                objDoseOverViewSlot.Child.Height = oDoseOverViewSlot.SlotHeight;
                            }
                            let objTagcon: TagObject = new TagObject();
                            objTagcon.oDrugItem = updateObject.oDrugItem;
                            objTagcon.oIChartSlot = oDoseOverViewSlot;
                            objTagcon.oChartColumn = updateObject.oChartColumn;
                            if (objTagcon.oIChartSlot.HighlightReviewSlot) {
                                (<Border>(objDoseOverViewSlot)).BorderThickness = ControlStyles.ReviewBorderWidth;
                                (<Border>(objDoseOverViewSlot)).BorderBrush = new SolidColorBrush(Colors.Red).color.color;
                            }
                            objTagcon.oChartCell = objChartCell;
                            let tagBind: Binding = new Binding();
                            tagBind.Source = objTagcon;
                            (<Border>(objDoseOverViewSlot)).SetBinding(Border.TagProperty, tagBind);
                            objDoseOverViewSlot.MouseLeftButtonDown = (s, e) => this.Slot_MouseLeftButtonDown(s, e);
                            objDoseOverViewSlot.Background = oDoseOverViewSlot.BackGroundColor.color.color;
                            objDoseOverViewSlot.DataContext = oDoseOverViewSlot;
                            objDoseOverViewSlot.SetValue(Grid.RowProperty, j);
                            CellGrid.Children.Add(objDoseOverViewSlot);
                            this.CheckAndUpdateSelectedSlots(<Border>(objDoseOverViewSlot));
                            break;
                        }
                }
            }
            if(this.changeDetectionRef)
        this.changeDetectionRef.markForCheck();

        }
        catch (err) {

        }

    }
    public RefreshRow(oChartRow: ChartRow, updateObject: TagObject): void {
        try {
            let selRowIndx: number;
            let vChartRow: ChartRow = this.ChartRows.Where(vChartRows => vChartRows.ChartCells.Any(cCell => cCell.Equals(updateObject.oChartCell))).Select(s => s).First();
            selRowIndx = this.ChartRows.IndexOf(vChartRow);
            this.RowCount = selRowIndx;
            iMedicationChart.oMedicationChart.ChartRows.RemoveAt(selRowIndx);
            iMedicationChart.oMedicationChart.ChartRows.Insert(selRowIndx, oChartRow);
            if (this.CheckBoxColumn) {
                this.GridControl.Rows[selRowIndx].Cells[1].dataItem = oChartRow;
            } else {
                this.GridControl.Rows[selRowIndx].Cells[0].dataItem = oChartRow;
            }
            let context: { index: any, dataItem: any } = { index: selRowIndx, dataItem: oChartRow };
            let rowEventArgs = this.GridControl.GetRowEventArgs(this.dataTemplates, context);
            this.GridControl_RowLoaded(rowEventArgs,true);
            if(this.changeDetectionRef)
            this.changeDetectionRef.markForCheck();
        }
        catch (err) {
        }

    }
    private CheckAndUpdateSelectedSlots(border: Border): void {
        let slot: IChartSlot = border.DataContext;
        if (this.DicSelectedSlots.ContainsKey(slot.Key)) {
            this.DicSelectedSlots[slot.Key] = border;
            let tbObj: TagObject = ObjectHelper.CreateType<TagObject>(border.Tag, TagObject);
            if (!this.AllowSlotMultiselect) {
                tbObj.IsSelected = true;
                tbObj.oIChartSlot.IsSelected = true;
                border.BorderBrush = new SolidColorBrush(Colors.Black).color.color;
                this.oCommonBorder = border;
            }
            else if (this.AllowSlotMultiselect) {
                if (tbObj.oIChartSlot.EnableSlotSelect) {
                    border.BorderBrush = this.SlotSelectedBorder;
                    border.Background = this.SlotSelectedBG;
                    tbObj.IsSelected = true;
                    tbObj.oIChartSlot.IsSelected = true;
                }
                else {
                    border.BorderBrush = new SolidColorBrush(Colors.Black).color.color;
                    this.oCommonBorder = border;
                }
            }
        }
    }
    @Input() DSTDateTime: string;
    // @Input() ChartRows: ObservableCollection<ChartRow>;
    public get ChartRows(): ObservableCollection<ChartRow> {
    //     return <ObservableCollection<ChartRow>> ObjectHelper.GetValue(iMedicationChart,"ChartRowsProperty");
        return this._chartrows;
    }

    @Input() set ChartRows(value: ObservableCollection<ChartRow>) {
    //    ObjectHelper.SetValue(iMedicationChart,"ChartRowsProperty", value);
    this._chartrows = value;
    this.GridControl.SetBinding('data', this.ChartRows);
    if(value != null)
    this.ReassignChartRowEvent();
    }
    // // //Sangeetha - Start
    // public _ChartRows: boolean;
    // static ChartRowsProperty = "ChartRowsProperty";

    // public get ChartRowsProperty(): boolean {
    //     return ObjectHelper.GetValue(this,iMedicationChart.ChartRowsProperty)
    //     //return <boolean>GetValue(InfusionChartCell.HighlightReviewSlotProperty);

    // }
    // public set ChartRowsProperty(value: boolean) {
    //     ObjectHelper.SetValue(this, iMedicationChart.ChartRowsProperty, value);
    //     //SetValue(InfusionChartCell.HighlightReviewSlotProperty, value);
    // }
    // public static ChartRowsProperty:  DependencyProperty = DependencyProperty.Register("ChartRows",/*typeof*/ObservableCollection,/*typeof*/iMedicationChart, new PropertyMetadata(new ObservableCollection<ChartRow>(), new PropertyChangedCallback(OnChartRowsChanged)));  //Sangeetha

    //Sangeetha - end
    // private static OnChartRowsChanged(d: DependencyObject, e: DependencyPropertyChangedEventArgs): void {
    //     let objMedChart: iMedicationChart = ObjectHelper.CreateType<iMedicationChart>(d, iMedicationChart);
    //     if (objMedChart.ChartColumns != null) {
    //         objMedChart.GridControl.ItemsSource = <ObservableCollection<ChartRow>>e.NewValue;
    //     }
    // }
    public get FrozenColumnCount(): number {
        return this.nFrozenColumnCount;
    }
    public set FrozenColumnCount(value: number) {
        this.nFrozenColumnCount = value;
        this.GridControl.FrozenColumnCount = this.FrozenColumnCount;
    }
    @Input() TodayBorderColor: SolidColorBrush;
    protected static TodayBorderColor_Changed(sender: DependencyObject, e: DependencyPropertyChangedEventArgs): void {
        let objMC: iMedicationChart = ObjectHelper.CreateType<iMedicationChart>(sender, iMedicationChart);
        objMC.TodayBorderColor = <SolidColorBrush>e.NewValue;
        objMC._HeaderBorder.SetValue(Border.BackgroundProperty, objMC.TodayBorderColor);
        objMC._HeaderBorder.SetValue(Border.BorderBrushProperty, objMC.TodayBorderColor);
    }
    public get ChartColumns(): List<ChartColumn> {
        return this.oChartColumns;
    }
    public set ChartColumns(value: List<ChartColumn>) {
        try {
            // if (!this.IsAutoGenerated) {
            //     this.GridControl.CanUserSelect = true;
            //     this.GridControl.SelectionMode = SelectionMode.Multiple;
            this.oChartColumns = value;
            if (this.oChartColumns != null) {
                this.GridControl.Width = this.Width;
                this.GridControl.Height = this.Height;
                let nColIndex: number = 0;
                this.oChartColumns.forEach((oColumn) => {
                    // if (this.CheckBoxColumn && oColumn.Index == 0) {
                        // let oSelectColumn: iGridViewSelectColumn = new iGridViewSelectColumn();
                        // oSelectColumn.ToolTipTemplateSelector = App.Current.Resources["tooltipSelector"];
                        // oSelectColumn.Width = 30;
                        // oSelectColumn.MinWidth = 30;
                        // this.GridControl.dColumns.Add(oSelectColumn);
                        // nColIndex += 1;
                    // }
                    // else {
                        let oDataColumn: iGridViewDataColumn = new iGridViewDataColumn();
                        oDataColumn.Header = oColumn.Caption;
                        if (this.DSTDateTime && this.DSTDateTime == oColumn.Caption)
                            oDataColumn.Header = String.Concat('*', oColumn.Caption);
                        oDataColumn.UniqueName = oColumn.Caption;
                        oDataColumn.IsReorderable = false;
                        oDataColumn.IsReadOnly = true;
                        if (oColumn.Index == nColIndex) {
                            oDataColumn.Width = new GridViewLength(1, GridViewLengthUnitType.Star);
                            if (this.AutoGenerateColumn) {
                                if (this.GridControl.Width as number <= (this.ChartColumns.Sum(s => s.Width) + 20)) {
                                    oDataColumn.MinWidth = this.ColWidth;
                                }
                                else {
                                    oDataColumn.MinWidth = this.GridControl.Width.Value - (this.ChartColumns.Sum(s => s.Width) + 25);
                                }
                            }
                            else {
                                oDataColumn.MinWidth = oColumn.Width;
                            }
                        }
                        else {
                            oDataColumn.MinWidth = oColumn.Width;
                            oDataColumn.Width = oColumn.Width;
                        }
                        if (oColumn.IsToday) {
                            if (oColumn.Width > 0.0) {
                                oDataColumn.MinWidth = oColumn.Width;
                                oDataColumn.Width = oColumn.Width;
                            }
                            else {
                                oDataColumn.MinWidth = oColumn.Width + 10;
                                oDataColumn.Width = oColumn.Width;
                            }
                        }
                        else {
                            oDataColumn.HeaderCellStyle = 'HeaderCellStyle';
                            oDataColumn.CellStyle = 'CellStyle';
                        }
                        oDataColumn.HeaderTextAlignment = TextAlignment.Center;
                        oDataColumn.IsHeaderWordWrap = true;
                        this.GridControl.dColumns.Add(oDataColumn);
                    // }
                });
            }
            // {
            this.GridControl.SetBinding('data', this.ChartRows);
                // set the MouseLeftButtonDown in chartIcon
            this.GridControl.ItemsSource?.array.forEach((element: ChartRow) => {
                if (element.DrugItem) {
                    if (element.DrugItem.MultiComponentIcon) {
                        element.DrugItem.MultiComponentIcon.MouseLeftButtonDown = this.Drug_MouseEvent;
                    }
                    else if (element.DrugItem.CriticalIcon) {
                        element.DrugItem.CriticalIcon.MouseLeftButtonDown = this.Drug_MouseEvent;
                    }
                    else if (element.DrugItem.DrugPropertyIcon) {
                        element.DrugItem.DrugPropertyIcon.MouseLeftButtonDown = this.Drug_MouseEvent;
                    }
                    if (element.DrugItem.MultiComponentIcon1) {
                        element.DrugItem.MultiComponentIcon1.MouseLeftButtonDown = this.Drug_MouseEvent;
                    }
                    else if (element.DrugItem.FluidDrugPropertyIcon) {
                        element.DrugItem.FluidDrugPropertyIcon.MouseLeftButtonDown = this.Drug_MouseEvent;
                    }
                    else if (element.DrugItem.DrugPropertyIcon) {
                        element.DrugItem.DrugPropertyIcon.MouseLeftButtonDown = this.Drug_MouseEvent;
                    }
                    if (element.DrugItem.ComponenetPropertyIcon1) {
                        element.DrugItem.ComponenetPropertyIcon1.MouseLeftButtonDown = this.Drug_MouseEvent;
                    }
                    else if (element.DrugItem.ComponenetPropertyIcon2) {
                        element.DrugItem.ComponenetPropertyIcon2.MouseLeftButtonDown = this.Drug_MouseEvent;
                    }
                    else if (element.DrugItem.MultiComponentIcon2) {
                        element.DrugItem.MultiComponentIcon2.MouseLeftButtonDown = this.Drug_MouseEvent;
                    }
                    if (element.DrugItem.ComponenetPropertyIcon3) {
                        element.DrugItem.ComponenetPropertyIcon3.MouseLeftButtonDown = this.Drug_MouseEvent;
                    }
                    else if (element.DrugItem.MultiComponentIcon3) {
                        element.DrugItem.MultiComponentIcon3.MouseLeftButtonDown = this.Drug_MouseEvent;
                    }
                    else if (element.DrugItem.ComponenetPropertyIcon4) {
                        element.DrugItem.ComponenetPropertyIcon4.MouseLeftButtonDown = this.Drug_MouseEvent;
                    }
                    else if (element.DrugItem.MultiComponentIcon4) {
                        element.DrugItem.MultiComponentIcon4.MouseLeftButtonDown = this.Drug_MouseEvent;
                    }
                }
            });
            // }
            // }
        }
        catch (err) {
            console.log(err);
        }

    }
    public ReassignChartRowEvent(){
    this.GridControl.ItemsSource?.array.forEach((element: ChartRow) => {
        if (element.DrugItem) {
            if (element.DrugItem.MultiComponentIcon) {
                element.DrugItem.MultiComponentIcon.MouseLeftButtonDown = this.Drug_MouseEvent;
            }
            else if (element.DrugItem.CriticalIcon) {
                element.DrugItem.CriticalIcon.MouseLeftButtonDown = this.Drug_MouseEvent;
            }
            else if (element.DrugItem.DrugPropertyIcon) {
                element.DrugItem.DrugPropertyIcon.MouseLeftButtonDown = this.Drug_MouseEvent;
            }
            if (element.DrugItem.MultiComponentIcon1) {
                element.DrugItem.MultiComponentIcon1.MouseLeftButtonDown = this.Drug_MouseEvent;
            }
            else if (element.DrugItem.FluidDrugPropertyIcon) {
                element.DrugItem.FluidDrugPropertyIcon.MouseLeftButtonDown = this.Drug_MouseEvent;
            }
            else if (element.DrugItem.DrugPropertyIcon) {
                element.DrugItem.DrugPropertyIcon.MouseLeftButtonDown = this.Drug_MouseEvent;
            }
            if (element.DrugItem.ComponenetPropertyIcon1) {
                element.DrugItem.ComponenetPropertyIcon1.MouseLeftButtonDown = this.Drug_MouseEvent;
            }
            else if (element.DrugItem.ComponenetPropertyIcon2) {
                element.DrugItem.ComponenetPropertyIcon2.MouseLeftButtonDown = this.Drug_MouseEvent;
            }
            else if (element.DrugItem.MultiComponentIcon2) {
                element.DrugItem.MultiComponentIcon2.MouseLeftButtonDown = this.Drug_MouseEvent;
            }
            if (element.DrugItem.ComponenetPropertyIcon3) {
                element.DrugItem.ComponenetPropertyIcon3.MouseLeftButtonDown = this.Drug_MouseEvent;
            }
            else if (element.DrugItem.MultiComponentIcon3) {
                element.DrugItem.MultiComponentIcon3.MouseLeftButtonDown = this.Drug_MouseEvent;
            }
            else if (element.DrugItem.ComponenetPropertyIcon4) {
                element.DrugItem.ComponenetPropertyIcon4.MouseLeftButtonDown = this.Drug_MouseEvent;
            }
            else if (element.DrugItem.MultiComponentIcon4) {
                element.DrugItem.MultiComponentIcon4.MouseLeftButtonDown = this.Drug_MouseEvent;
            }
        }
    });
    }
    @Input() get Format(): string {
        return this._Format;
    }
    public set Format(value: string) {
        this._Format = value;
    }
    public get TimeFormat(): string {
        return this._TimeFormat;
    }
    @Input() set TimeFormat(value: string) {
        this._TimeFormat = value;
    }
    @Input() AutoGenerateColumn: boolean = false;
    @Input() StartDate: DateTime;
    @Input() EndDate: DateTime;
    @Input() TodayDate: DateTime;
    public get DrugHeader(): string {
        return this._DrugHeader;
    }
    @Input() set DrugHeader(value: string) {
        this._DrugHeader = value;
    }
    @Input() ColWidth: number;
    @Input() TodayColWidth: number;
    private AllowSlotMultiselectProperty:boolean;
    public get AllowSlotMultiselect(): boolean {
       // return <boolean>ObjectHelper.GetValue(iMedicationChart, "AllowSlotMultiselectProperty");
       return this.AllowSlotMultiselectProperty;
    }
    @Input() set AllowSlotMultiselect(value: boolean) {
        //ObjectHelper.SetValue(iMedicationChart, "AllowSlotMultiselectProperty", value);
        this.AllowSlotMultiselectProperty = value;
    }
    @Input() ShowSlotTiminings: boolean;
    //Sangeetha
    // public static AllowSlotMultiselectProperty: DependencyProperty = DependencyProperty.Register("AllowSlotMultiselect",/*typeof*/Boolean,/*typeof*/iMedicationChart, new PropertyMetadata(false));
    // public get ShowSlotTiminings(): boolean {
    //     return <boolean>ObjectHelper.GetValue(iMedicationChart,"ShowSlotTiminingsProperty");
    // }
    // public set ShowSlotTiminings(value: boolean) {
    //     ObjectHelper.SetValue(iMedicationChart,"ShowSlotTiminingsProperty", value);

    // }
    //Sangeetha
    // public static ShowSlotTiminingsProperty: DependencyProperty = DependencyProperty.Register("ShowSlotTiminings",/*typeof*/Boolean,/*typeof*/iMedicationChart, new PropertyMetadata(false));
    // public get SlotSelectedBG(): SolidColorBrush {
    //     return <SolidColorBrush>ObjectHelper.GetValue(iMedicationChart, "SlotSelectedBGProperty");
    // }
    // public set SlotSelectedBG(value: SolidColorBrush) {
    //     ObjectHelper.SetValue(iMedicationChart, "SlotSelectedBGProperty", value);
    // }
    // Suresh to be revisit
    SlotSelectedBG =ObjectHelper.CreateType<SolidColorBrush>(new SolidColorBrush(Colors.White), SolidColorBrush);
    //Sangeetha
    // public static SlotSelectedBGProperty: DependencyProperty = DependencyProperty.Register("SlotSelectedBG",/*typeof*/SolidColorBrush,/*typeof*/iMedicationChart, new PropertyMetadata(new SolidColorBrush(Colors.White), ));
    private static OnSlotSelectedBGChanged(sender: DependencyObject, e: DependencyPropertyChangedEventArgs): void {
        let objIMC: iMedicationChart = ObjectHelper.CreateType<iMedicationChart>(sender, iMedicationChart);
        objIMC.SlotSelectedBG = ObjectHelper.CreateType<SolidColorBrush>(e.NewValue, SolidColorBrush);
        objIMC.UpDateSelectedSlots();
    }
    public get SlotSelectedBorder(): SolidColorBrush {
        return <SolidColorBrush>ObjectHelper.GetValue(iMedicationChart, "SlotSelectedBorderProperty");
    }
    public set SlotSelectedBorder(value: SolidColorBrush) {
        ObjectHelper.SetValue(iMedicationChart, "SlotSelectedBorderProperty", value);
    }
    // Suresh to be revisit
    //SlotSelectedBorder =ObjectHelper.CreateType<SolidColorBrush>(new SolidColorBrush(Colors.Black), SolidColorBrush);
    //Sangeetha
    // public static SlotSelectedBorderProperty: DependencyProperty = DependencyProperty.Register("SlotSelectedBorder",/*typeof*/SolidColorBrush,/*typeof*/iMedicationChart, new PropertyMetadata(new SolidColorBrush(Colors.Black), OnSlotSelectedBorderChanged));
    private static OnSlotSelectedBorderChanged(sender: DependencyObject, e: DependencyPropertyChangedEventArgs): void {
        let objIMC: iMedicationChart = ObjectHelper.CreateType<iMedicationChart>(sender, iMedicationChart);
        objIMC.SlotSelectedBorder = ObjectHelper.CreateType<SolidColorBrush>(e.NewValue, SolidColorBrush);
        objIMC.UpDateSelectedSlots();
    }
    public get SelectedSlots(): List<TagObject> {
        // let dt: List<TagObject> = (from dicObs in this.DicSelectedSlots
        //     select new { bord = (dicObs.Value as Border) }).Select(tobj => ObjectHelper.CreateType<TagObject>(tobj.bord.Tag, TagObject)).ToList();

        let dt: List<TagObject> = new List();
        this.DicSelectedSlots.forEach(dicObs => {
            let data = dicObs.Value as Border;
            dt.Add(data.Tag);
        });
        return dt;
    }
    @Input() get SlotTimeHeader(): string {
        return <string>ObjectHelper.GetValue(iMedicationChart, "SlotTimeHeaderProperty");
    }
    public set SlotTimeHeader(value: string) {
        ObjectHelper.SetValue(iMedicationChart, "SlotTimeHeaderProperty", value);
    }
    @Input() SlotTimeWidth: number;
    @Input() NoRecordsDisplayText: string;
    //Sangeetha
    // public static SlotTimeHeaderProperty: DependencyProperty = DependencyProperty.Register("SlotTimeHeader",/*typeof*/String,/*typeof*/iMedicationChart, new PropertyMetadata("Slot timing"));
    // public get SlotTimeWidth(): number {
    //     return <number>ObjectHelper.GetValue(iMedicationChart,"SlotTimeWidthProperty");
    // }
    // public set SlotTimeWidth(value: number) {
    //     ObjectHelper.SetValue(iMedicationChart,"SlotTimeWidthProperty", value);
    // }
    //Sangeetha
    // public static SlotTimeWidthProperty: DependencyProperty = DependencyProperty.Register("SlotTimeWidth",/*typeof*/Number,/*typeof*/iMedicationChart, new PropertyMetadata(<number>36));
    // public get NoRecordsDisplayText(): string {
    //     return <string>ObjectHelper.GetValue(iMedicationChart, "NoRecordsDisplayTextProperty");
    // }
    // @Input() set NoRecordsDisplayText(value: string) {
    //     ObjectHelper.SetValue(iMedicationChart, "NoRecordsDisplayTextProperty", value);
    //     {
    //         // Handle from HTML Template
    //         // this.GridControl.NoRecordsText = <string>value;
    //     }
    // }
    //Sangeetha
    // public static NoRecordsDisplayTextProperty: DependencyProperty = DependencyProperty.Register("NoRecordsDisplayText",/*typeof*/String,/*typeof*/iMedicationChart, new PropertyMetadata(<string>String.Empty,
    //     new PropertyChangedCallback(OnNoRecordsDisplayTextChanged)));
    private static OnNoRecordsDisplayTextChanged(d: DependencyObject, e: DependencyPropertyChangedEventArgs): void {
        let objMedChart: iMedicationChart = ObjectHelper.CreateType<iMedicationChart>(d, iMedicationChart);
        objMedChart.NoRecordsDisplayText = <string>e.NewValue;
    }
    public EnableDST: boolean;
    public get CheckBoxColumn(): boolean {
        return this._CheckboxColumn;
    }
    @Input() set CheckBoxColumn(value: boolean) {
        this._CheckboxColumn = value;
    }
    private UpDateSelectedSlots(): void {
        if (this.DicSelectedSlots.Count() > 0 && this.AllowSlotMultiselect) {
            this.DicSelectedSlots.forEach((selBrd) => {
                (<Border>selBrd.Value).Background = this.SlotSelectedBG;
                (<Border>selBrd.Value).BorderBrush = this.SlotSelectedBorder;
            });
        }
    }
    private GetTemplate<T = unknown>(TemplateKey: string, dataContext?: any,timeFormat?: string): any {
        try {
            let oFrameworkElement;
            let template: TemplateLoader = new TemplateLoader();
            let dataTemplate: DataTemplate | any;
            switch (TemplateKey) {
                case 'TimeSlot': {
                    dataTemplate = template.timeSlot(dataContext);
                    break;
                }
                case 'BlankSlot': {
                    dataTemplate = template.blankSlot();
                    break;
                }
                case 'NormalDefaultSlot': {
                    dataTemplate = template.normalDefaultSlot(dataContext,timeFormat);
                    break;
                }
                case 'TodayMultiSlot':{
                    dataTemplate = template.todayMultiSlot(dataContext);
                    break;
                }
                case 'AdministratedSlot':{
                    dataTemplate = template.administratedSlot(dataContext);
                    break;
                }
                case 'AsRequiredSlot':{
                    dataTemplate = template.asRequiredSlot(dataContext);
                    break;
                }
                case 'TodayAsRequiredSlot':{
                    dataTemplate = template.todayAsRequiredSlot(dataContext);
                    break;
                }
                case 'OverviewSlot':{
                    dataTemplate = template.overViewSlot(dataContext);
                    break;
                }
                case 'DoseOverviewSlot':{
                    dataTemplate = template.DoseOverviewSlot(dataContext);
                    break;
                }

            }
            if (dataTemplate == null)
                return null;
            oFrameworkElement = ObjectHelper.CreateType<FrameworkElement>(dataTemplate, FrameworkElement);

            return oFrameworkElement;
        }
        catch (err) {
            console.log("GetTemplate", err);
            return null;
        }

    }

    private GetChildren(parent: UIElement, children: List<UIElement>): void {
        let count: number = VisualTreeHelper.GetChildrenCount(parent);
        if (count > 0) {
            for (let i: number = 0; i < count; i++) {
                let child: UIElement = <UIElement>VisualTreeHelper.GetChild(parent, i);
                children.Add(child);
                this.GetChildren(child, children);
            }
        }
    }
    private IsValidDate(date: DateTime): boolean {
        let isvalid: boolean = false;
        try {
            if (date != DateTime.MinValue || date != DateTime.MaxValue) {
                isvalid = true;
                return isvalid;
            }
            else return isvalid;
        }
        catch (ex: any) {
            return isvalid;
        }

    }
   
    private ImageSlotSelection(sender,e){
        if (this.oCommonBorder == null) {
            if ((ObjectHelper.CreateType<TagObject>((<Border>(sender)).Tag, TagObject)).oIChartSlot.EnableSlotClick)
                this.oCommonBorder = <Border>(sender);
        }
        if (this.oCommonBorder != null || (this.oCommonBorder != null && this.oCommonBorder.BorderBrush != null)) {
            if (!this.AllowSlotMultiselect) {
                let clickedBrder: Border = ObjectHelper.CreateType<Border>(sender, Border);
                let oComBordTagObjNew: TagObject = ObjectHelper.CreateType<TagObject>(clickedBrder.Tag, TagObject);
                if (oComBordTagObjNew.oIChartSlot.EnableSlotClick) {
                    this.DicSelectedSlots.Clear();
                    // this.oCommonBorder.SetValue(Border.BorderBrushProperty, this.DefaultSlotBrdColor);
                    this.oCommonBorder.BorderBrush = this.DefaultSlotBrdColor;
                    let oComBordTagObj: TagObject = ObjectHelper.CreateType<TagObject>(this.oCommonBorder.Tag, TagObject);
                    oComBordTagObj.IsSelected = false;
                    oComBordTagObj.oIChartSlot.IsSelected = false;
                    if (oComBordTagObj.oIChartSlot.HighlightReviewSlot) {
                        // this.oCommonBorder.SetValue(Border.BorderBrushProperty, new SolidColorBrush(Colors.Red));
                        this.oCommonBorder.BorderBrush = "#FF0000";
                        this.oCommonBorder.BorderThickness = new Thickness(2);
                        // this.oCommonBorder.SetValue(Border.BorderThicknessProperty, new Thickness(2));
                    }
                    this.oCommonBorder = (<Border>(sender));
                    oComBordTagObjNew.IsSelected = true;
                    oComBordTagObjNew.oIChartSlot.IsSelected = true;
                    // this.oCommonBorder.SetValue(Border.BorderBrushProperty, new SolidColorBrush(Colors.Black));
                    this.oCommonBorder.BorderThickness = new Thickness(1);
                    this.oCommonBorder.BorderBrush = "#000000";
                    let slotKey: string = oComBordTagObjNew.oIChartSlot.Key;
                    this.DicSelectedSlots.Add(slotKey, this.oCommonBorder);
                }
            }
            else {
                let selBorder: Border = (<Border>(sender));
                this.oCommonBorder = selBorder;
                let selbordTagObj: TagObject = ObjectHelper.CreateType<TagObject>(selBorder.Tag, TagObject);
                let slotKey: string = selbordTagObj.oIChartSlot.Key;
                if (selbordTagObj.oIChartSlot.EnableSlotSelect) {
                    if (!this.DicSelectedSlots.ContainsKey(slotKey)) {
                        if (selbordTagObj.oIChartSlot.EnableSlotClick) {
                            selBorder.SetValue(Border.BorderBrushProperty, this.SlotSelectedBorder);
                            selBorder.SetValue(Border.BackgroundProperty, this.SlotSelectedBG);
                            selbordTagObj.IsSelected = true;
                            selbordTagObj.oIChartSlot.IsSelected = true;
                            selbordTagObj.oIChartSlot.EnableSlotSelect = true;
                            this.DicSelectedSlots.Add(slotKey, selBorder);
                        }
                    }
                    else {
                        selbordTagObj.IsSelected = false;
                        selbordTagObj.oIChartSlot.IsSelected = false;
                        selbordTagObj.oIChartSlot.EnableSlotSelect = true;
                        selBorder.SetValue(Border.BorderBrushProperty, this.DefaultSlotBrdColor);
                        if (selbordTagObj.oIChartSlot.HighlightReviewSlot) {
                            // selBorder.SetValue(Border.BorderBrushProperty, new SolidColorBrush(Colors.Red));
                            selBorder.BorderBrush = new SolidColorBrush(Colors.Red).color.color;
                            selBorder.SetValue(Border.BorderThicknessProperty, new Thickness(2));
                        }
                        selBorder.SetBinding(Border.BackgroundProperty, new Binding("BackGroundColor"));
                        this.DicSelectedSlots.Remove(slotKey);
                    }
                }
                else {
                    selbordTagObj.IsSelected = false;
                    selbordTagObj.oIChartSlot.IsSelected = false;
                    selBorder.SetValue(Border.BorderBrushProperty, this.DefaultSlotBrdColor);
                    if (selbordTagObj.oIChartSlot.HighlightReviewSlot) {
                        selBorder.SetValue(Border.BorderBrushProperty, new SolidColorBrush(Colors.Red).color.color);
                        selBorder.BorderThickness = ControlStyles.ReviewBorderWidth;
                    }
                    selBorder.SetBinding(Border.BackgroundProperty, new Binding("BackGroundColor"));
                }
            }
        }
    }
    private senderHistoryIcon: object;
    private eHistoryIcon: MouseButtonEventArgs;
    public FireImageClickHistoryIcon(sender: Object, e: MouseButtonEventArgs): void {
        this.senderHistoryIcon = sender;
        this.eHistoryIcon = e;
    }
    public FireImageClick(sender: Object, e: MouseButtonEventArgs): void {
        try {
            if (this.CheckBoxColumn) {
                let selBorder: Border = (<Border>(sender));
                let selbordTagObj: TagObject = ObjectHelper.CreateType<TagObject>(selBorder.Tag, TagObject);
                let slotKey: string = selbordTagObj['Key'];
                if(slotKey!='HistoryIcon')
                this.ImageSlotSelection(sender,e);
            }
            if(this.isOverviewChart){
                e.mouseEvent.cancelBubble = false;
            }
            else{
                e.mouseEvent.cancelBubble = true;
            }
            
            let oImage: Image = <Image>sender;
            let objChartSlot: IChartSlot = oImage.DataContext;

            let oCells = this.ChartRows.Where(vChartRows => vChartRows.ChartCells.Any(cCell => cCell.Slots.Any(oSlot => oSlot.Key == objChartSlot.Key)))
                .Select(vChartRows => vChartRows.ChartCells.Where(cCell => cCell.Slots.Any(oSlot => oSlot.Key.Equals(objChartSlot.Key))).First());

            let vChartCell: ChartCell = new ChartCell();
            if (oCells.Count() > 0) {
                vChartCell = oCells.First();
            }

            let vChartRow: ChartRow = this.ChartRows.Where(vChartRows => vChartRows.ChartCells.Any(cCell => cCell.Key.Equals(vChartCell.Key))).Select(s => s).First();

            let vChartCol: ChartColumn = this.ChartColumns.Where(chartCols => chartCols.Index == vChartCell.ColIndex).Select(s => s).First();
            let objTagCon: TagObject = new TagObject();
            objTagCon.IsSelected = objChartSlot.IsSelected;
            objTagCon.oDrugItem = vChartRow.DrugItem;
            objTagCon.oIChartSlot = oImage.DataContext;
            objTagCon.oChartColumn = vChartCol;
            objTagCon.oChartCell = vChartCell;
            objTagCon.oChartIcon = ObjectHelper.CreateType<ChartIcon>(oImage.Tag, ChartIcon);
            if (this.OnHotSpotClick != null)
                this.OnHotSpotClick(sender, objTagCon, this.GridControl);
        }
        catch (err) {

        }

    }
    public DrugItemFireImageClick(sender: Object, e: MouseButtonEventArgs): void {
        try {
            let oImage: Image = <Image>sender;
            let objChartSlot: DrugItem = ObjectHelper.CreateType<DrugItem>(oImage.DataContext, DrugItem);

            let vChartCol: ChartColumn;
            if (this.CheckBoxColumn) {
                if(this.ChartColumns[0].Index==0){
                    vChartCol = this.ChartColumns.Where(chartCols => chartCols.Index == 0).Select(s => s).First();
                }else{
                     vChartCol = this.ChartColumns.Where(chartCols => chartCols.Index == 1).Select(s => s).First();
                }
            }else{
                    vChartCol = this.ChartColumns.Where(chartCols => chartCols.Index == 0).Select(s => s).First();
            }

            let objTagCon: TagObject = new TagObject();
            objTagCon.oDrugItem = ObjectHelper.CreateType<DrugItem>(oImage.DataContext.DrugItem, DrugItem);
            objTagCon.oChartIcon = ObjectHelper.CreateType<ChartIcon>(oImage.Tag, ChartIcon);
            objTagCon.oChartColumn = vChartCol;
            if (this.OnDrugHotSpotClick != null)
                this.OnDrugHotSpotClick(sender, objTagCon);
        }
        catch (err) {

        }

    }
    public SlotClick(sender: Object, e: MouseButtonEventArgs): void {
        let oBorder: Border = <Border>sender;
        let objTagCon: TagObject = ObjectHelper.CreateType<TagObject>(oBorder.Tag, TagObject);
        if (this.OnSlotHotSpotClick != null) {
            if (objTagCon.oIChartSlot.EnableSlotClick) {
                if (this.CheckBoxColumn) {
                    this.OnSlotHotSpotClick(sender, objTagCon, this.DicSelectedSlots);
                } else {
                    this.OnSlotHotSpotClick(sender, objTagCon, this.GridControl);
                }
            }
        }
    }
    public CheckboxClick(sender: Object, e: SelectionChangeEventArgs): void {
        // let oselc: ChartRow[] = (from dicObs in this.GridControl.GetSelectedRows() select new { row = (dicObs as ChartRow) }).Select(erow => ObjectHelper.CreateType<ChartRow>(erow.row, ChartRow)).ToArray();
       let selectedRowArr = [];
        
       this.GridControl.GetSelectedRows().forEach(dicObs => {
            //let row = dicObs as ChartRow;
            selectedRowArr.push(ObjectHelper.CreateType<ChartRow>(dicObs, ChartRow));            
        });
        let oselc: ChartRow[]=selectedRowArr;
       // oselc = e.selectedRows && e.selectedRows.length > 0 ?e.selectedRows[0].dataItem : [];

        // let odselc: ChartRow[] = (from dicObs in this.DicUnSelectedItems select new { row = (dicObs.Value as ChartRow) }).Select(erow => ObjectHelper.CreateType<ChartRow>(erow.row, ChartRow)).ToArray();
        // let odselc: ChartRow[] = this.DicUnSelectedItems.Select(dicObs => new { row = (dicObs.Value as ChartRow) }).Select(erow => ObjectHelper.CreateType<ChartRow>(erow.row, ChartRow)).ToArray();
        let odselc: ChartRow[] = e.deselectedRows && e.deselectedRows.length > 0 ? e.deselectedRows[0].dataItem:[];
        //if(selectedRowArr.Count()==1 && odselc['Key']){
            if(selectedRowArr.length == 1 && odselc['Key']){
            if(selectedRowArr[0].Key==odselc['Key']){
                selectedRowArr = []; 
                oselc=[];
                this.GridControl.SelectedItems.Clear();
            }
        }
        if (this.OnRowSelectionChanged != null) {
            this.OnRowSelectionChanged(sender, oselc, odselc);
        }
    }
    Drug_MouseEvent = (s, e) => { this.Drug_MouseLeftButtonDown(s, e); };
    RowRefreshCellOmitUpdate = false;
    RowRefreshCellReInstateUpdate = false;
    private GridControl_RowLoaded(e: RowLoadedEventArgs,isFromRefresh?: boolean): void {
        try {
            if (this.ChartColumns != null) {
                if (this.ChartColumns.Count > 0) {
                    // let t: Type = typeof (iGridViewHeaderRow);
                    let iGridViewHeaderRow; //Sangeetha
                    if (this.ChartRows && this.ChartRows[this.RowCount]) {
                        if (this.ChartRows.IndexOf(<ChartRow>e.DataElement) == 0) {
                            this.RowCount = 0;
                            this.DicSelectedSlots = new Dictionary<string, Border>();
                        }
                        if (this.ChartRows[this.RowCount] && this.ChartRows[this.RowCount].DrugItem == null)
                            return
                        if (this.ChartRows[this.RowCount] && this.ChartRows[this.RowCount].RowBackground && this.ChartRows[this.RowCount].RowBackground.color.color != Colors.Transparent.color) {
                            this.GridControl.SetRowStyle(e, this.ChartRows[this.RowCount].RowBackground.color.color, 'Background')
                        }
                        const rows = document.querySelectorAll('.iMedicationChart.k-grid tr');
                        rows.forEach((row, index) => {
                            if (index % 2 !== 0) {
                                row.classList.add('k-tr');
                            }
                            else {
                                row.classList.add("k-alt");
                            }
                        });
                        if (this.ChartRows[this.RowCount].RowHeight > 0.0)
                            e.Row.Height = this.ChartRows[this.RowCount].RowHeight;
                        e.Row.Tag = this.ChartRows[this.RowCount];
                        let drg = this.objDrugDetails_SizeChanged(e.Row, null,isFromRefresh);
                        if(this.ChartRows[this.RowCount].TimeSlots.Length > 2){
                            this.RowRefreshCellReInstateUpdate = false;
                            this.RowRefreshCellOmitUpdate = false;
                        }
                        if(this.RowRefreshCellReInstateUpdate){
                            drg = drg - 20;
                        }
                        if(this.RowRefreshCellOmitUpdate){
                            drg = drg + 20;
                        }
                        let property = 'HorizontalGridLinesBrush';
                        let rowBorder = {};
                        this.GridControl.SetRowStyle(e, rowBorder, property); 

                        if (this.ChartRows[this.RowCount].OrderSetStart && this.ChartRows[this.RowCount].RowBorderColor.color.color != Colors.Transparent.color) {
                            let property = 'PART_RowBordeTOP';
                            let rowBorder = {
                                BorderBrush: this.ChartRows[this.RowCount].RowBorderColor,
                                BorderThickness: new Thickness(2, 0, 0, 0)
                            }
                            this.GridControl.SetRowStyle(e, rowBorder, property);
                        }
                        else if(this.ChartRows[this.RowCount].RowBorderColor.color.color != Colors.Transparent.color){
                            let property = 'PART_RowBorderBottom';
                            let rowBorder = {
                                Visibility: Visibility.Visible,
                                BorderBrush: this.ChartRows[this.RowCount].RowBorderColor,
                                BorderThickness: new Thickness(0, 2, 0, 0)
                            }
                            this.GridControl.SetRowStyle(e, rowBorder, property);
                        }
                        if (this.ChartRows[this.RowCount].OrderSetEnd && this.ChartRows[this.RowCount].RowBorderColor.color.color != Colors.Transparent.color) {
                            let property = 'PART_RowBorderBottom';
                            let rowBorder = {
                                Visibility: Visibility.Visible,
                                BorderBrush: this.ChartRows[this.RowCount].RowBorderColor,
                                BorderThickness: new Thickness(0, 2, 0, 0)
                            }
                            this.GridControl.SetRowStyle(e, rowBorder, property);
                        }
                        if (this.ShowSlotTiminings) {
                            let parentGridSlot: Grid = new Grid();
                            parentGridSlot.VerticalAlignment = VerticalAlignment.Stretch;
                            parentGridSlot.HorizontalAlignment = HorizontalAlignment.Stretch;
                            let CellGridSlot: StackPanel = new StackPanel();
                            CellGridSlot.Orientation = 'Vertical';
                            CellGridSlot.HorizontalAlignment = HorizontalAlignment.Stretch;
                            parentGridSlot.Children.Add(CellGridSlot);

                            if (this.ChartRows[this.RowCount].TimeSlots != null) {
                                for (let i: number = 0; i < this.ChartRows[this.RowCount].TimeSlots.Count; i++) {
                                    let oChartSlotType: IChartSlot = this.ChartRows[this.RowCount].TimeSlots[i];
                                    CellGridSlot.HorizontalAlignment = HorizontalAlignment.Stretch;

                                    let oChartCol: ChartColumn = this.ChartColumns[1];
                                    let oTimeSlot: TimeSlot = ObjectHelper.CreateType<TimeSlot>(oChartSlotType, TimeSlot);

                                    let objTimeSlot: any = this.GetTemplate("TimeSlot", oTimeSlot);
                                    if (objTimeSlot == null)
                                        return
                                    if(this.RowRefreshCellOmitUpdate){
                                        oTimeSlot.SlotHeight = oTimeSlot.SlotHeight + 20;
                                    }
                                    if(this.RowRefreshCellReInstateUpdate){
                                        oTimeSlot.SlotHeight = oTimeSlot.SlotHeight - 20;
                                    }
                                    objTimeSlot.Height = oTimeSlot.SlotHeight > 0 ? oTimeSlot.SlotHeight : 30;
                                    objTimeSlot.Child.Height = oTimeSlot.SlotHeight > 0 ? oTimeSlot.SlotHeight : 30;
                                    // objTimeSlot.Height = 100 / this.ChartRows[this.RowCount].TimeSlots.Count;

                                    let objTagcon: TagObject = new TagObject();
                                    objTagcon.oDrugItem = this.ChartRows[this.RowCount].DrugItem;
                                    objTagcon.oIChartSlot = oTimeSlot;
                                    objTagcon.oChartColumn = oChartCol;
                                    let tagBind: Binding = new Binding();
                                    tagBind.Source = objTagcon;

                                    objTimeSlot.BorderBrush = "#7090A5";
                                    objTimeSlot.BorderThickness = new Thickness(1, 0, 1, 0);
                                    objTimeSlot.VerticalAlignment = VerticalAlignment.Stretch;
                                    objTimeSlot.HorizontalAlignment = HorizontalAlignment.Stretch;
                                    objTimeSlot.Height = e.Row.Height;
                                    (objTimeSlot).SetBinding(Border.TagProperty, tagBind);
                                    (objTimeSlot).SetBinding(Border.BackgroundProperty, new Binding("BackGroundColor"));
                                    CellGridSlot.Children.Add(objTimeSlot as any as DataTemplate);
                                }
                            }
                            if (!this.CheckBoxColumn) {
                                let cell0: GridViewCell = e.Row.Cells[1];
                                (<DataTemplate>cell0.dataTemplates).Content = parentGridSlot;
                            }
                            else {
                                let cell0: GridViewCell = e.Row.Cells[2];
                                (<DataTemplate>cell0.dataTemplates).Content = parentGridSlot;
                            }
                        }
                        let index: number = this.CheckBoxColumn ? 1 : 0;
                        for (let i: number = 0; i < this.ChartRows[this.RowCount].ChartCells.Count; i++) {                           
                            let parentGrid: Grid = new Grid();
                            let objBrd: Border = new Border();
                            if (this.CheckBoxColumn) {
                                let objDrugitem: DrugItem = this.ChartRows[this.RowCount].DrugItem;
                                // let cb: CheckBox = e.Row.Cells[0].FindChildByType<CheckBox>();
                                let cb: CheckBox = e.Row.Cells[0];
                                if (objDrugitem.AllowSelect) {

                                    cb.MouseLeftButtonDown = (s, e) => (this.cb_MouseLeftButtonDown(s, e));
                                    // cb.AddHandler(FrameworkElement.MouseLeftButtonDownEvent, new MouseButtonEventHandler(this.cb_MouseLeftButtonDown), true);
                                }
                                else {
                                    cb.IsEnabled = false;
                                }
                            }
                            parentGrid.VerticalAlignment = VerticalAlignment.Stretch;
                            parentGrid.HorizontalAlignment = HorizontalAlignment.Stretch;
                            let CellGrid: StackPanel = new StackPanel();
                            CellGrid.VerticalAlignment = VerticalAlignment.Top;
                            // CellGrid.VerticalAlignment = VerticalAlignment.Stretch;
                            CellGrid.HorizontalAlignment = HorizontalAlignment.Stretch;
                            CellGrid.Orientation = 'Vertical';
                            parentGrid.Children.Add(CellGrid);
                            for (let j: number = 0; j < this.ChartRows[this.RowCount].ChartCells[i].Slots.Count; j++) {
                                let oChartSlotType: IChartSlot = this.ChartRows[this.RowCount].ChartCells[i].Slots[j];
                                // CellGrid.VerticalAlignment = VerticalAlignment.Stretch;
                                CellGrid.HorizontalAlignment = HorizontalAlignment.Stretch;
                                let colIndex: number = this.ChartRows[this.RowCount].ChartCells[i].ColIndex;
                                let oChartCol: ChartColumn = this.ChartColumns.Where(obj => obj.Index == colIndex).First();
                                if (this.RowCount == this.ChartRows.Count - 1 && oChartCol.IsToday && (j + 1 == this.ChartRows[this.RowCount].ChartCells[i].Slots.Count)
                                    && !isFromRefresh) {
                                    oChartSlotType.SlotHeight = oChartSlotType.SlotHeight - 3;
                                }                                   
                                if (!oChartCol.IsToday)
                                    parentGrid.Margin = new Thickness(0, 0, 0, 1);
                                switch (ObjectHelper.GetType(oChartSlotType)) {
                                    case "AdministratedSlot":
                                        {
                                            let oAdminSlot: AdministratedSlot = ObjectHelper.CreateType<AdministratedSlot>(oChartSlotType, AdministratedSlot);
                                            oAdminSlot.IsChartAdminSlotLastColumn = i == this.ChartRows[this.RowCount].ChartCells.Count - 1 ? true : false;
                                            let objAdministratedSlot: Border = this.GetTemplate<Border>("AdministratedSlot", oAdminSlot);
                                            if (objAdministratedSlot == null)
                                                return
                                            if (oAdminSlot.SlotHeight > 0.0) {
                                                if(this.RowRefreshCellOmitUpdate){
                                                    oAdminSlot.SlotHeight = oAdminSlot.SlotHeight + 20;
                                                }
                                                if(this.RowRefreshCellReInstateUpdate){
                                                    oAdminSlot.SlotHeight = oAdminSlot.SlotHeight - 20;
                                                }
                                                objAdministratedSlot.SetBinding(FrameworkElement.HeightProperty, new Binding("SlotHeight"));
                                                objAdministratedSlot.Height = oAdminSlot.SlotHeight;
                                                objAdministratedSlot.Child.Height = oAdminSlot.SlotHeight;
                                            }
                                            let objTagcon: TagObject = new TagObject();
                                            objTagcon.oDrugItem = this.ChartRows[this.RowCount].DrugItem;
                                            objTagcon.oIChartSlot = oAdminSlot;
                                            objTagcon.oChartColumn = oChartCol;
                                            objTagcon.oChartCell = this.ChartRows[this.RowCount].ChartCells[i];
                                            let tagBind: Binding = new Binding();
                                            tagBind.Source = objTagcon;
                                            (<Border>(objAdministratedSlot)).SetBinding(Border.TagProperty, tagBind);
                                            
                                            objAdministratedSlot.MouseLeftButtonDown = (s, e) => this.Slot_MouseLeftButtonDown(s, e);
                                            objAdministratedSlot.noDefaultStyle = true;
                                            if (oAdminSlot.HighlightReviewSlot) {
                                                (<Border>(objAdministratedSlot)).BorderThickness = ControlStyles.ReviewBorderWidth;
                                                (<Border>(objAdministratedSlot)).BorderBrush = new SolidColorBrush(Colors.Red).color.color;
                                            }
                                            objAdministratedSlot.Background = oAdminSlot.BackGroundColor.color.color;
                                            objAdministratedSlot.DataContext = oAdminSlot;
                                            objAdministratedSlot.SetValue(Grid.RowProperty, j);
                                            CellGrid.Children.Add(objAdministratedSlot);
                                            break;
                                        }
                                    case "DefaultSlot":
                                        {
                                            let oDefaultSlot: DefaultSlot = ObjectHelper.CreateType<DefaultSlot>(oChartSlotType, DefaultSlot);
                                            oDefaultSlot.IsChartDefaultSlotLastColumn = i == this.ChartRows[this.RowCount].ChartCells.Count - 1 ? true : false;
                                            let objNormalDefaultSlot: Border = this.GetTemplate("NormalDefaultSlot", oDefaultSlot, this.TimeFormat);
                                            if (objNormalDefaultSlot == null)
                                                return
                                            if (oDefaultSlot.SlotHeight > 0.0) {
                                                if(this.RowRefreshCellOmitUpdate){
                                                    oDefaultSlot.SlotHeight = oDefaultSlot.SlotHeight + 20;
                                                }
                                                if(this.RowRefreshCellReInstateUpdate){
                                                    oDefaultSlot.SlotHeight = oDefaultSlot.SlotHeight - 20;
                                                }
                                                objNormalDefaultSlot.SetBinding(FrameworkElement.HeightProperty, new Binding("SlotHeight"));
                                                objNormalDefaultSlot.Height = oDefaultSlot.SlotHeight;
                                                objNormalDefaultSlot.Child.Height = oDefaultSlot.SlotHeight;
                                            }
                                            objNormalDefaultSlot.noDefaultStyle = true;
                                            let objTagcon: TagObject = new TagObject();
                                            objTagcon.oDrugItem = this.ChartRows[this.RowCount].DrugItem;
                                            objTagcon.oIChartSlot = oDefaultSlot;
                                            objTagcon.oChartColumn = oChartCol;
                                            objTagcon.oChartCell = this.ChartRows[this.RowCount].ChartCells[i];
                                            let tagBind: Binding = new Binding();
                                            tagBind.Source = objTagcon;
                                            (<Border>(objNormalDefaultSlot)).SetBinding(Border.TagProperty, tagBind);
                                            if (oDefaultSlot.HighlightReviewSlot) {
                                                objNormalDefaultSlot.BorderThickness = ControlStyles.ReviewBorderWidth;
                                                objNormalDefaultSlot.BorderBrush = new SolidColorBrush(Colors.Red).color.color;
                                            }
                                            objNormalDefaultSlot.Background = oDefaultSlot.BackGroundColor.color.color;
                                            objNormalDefaultSlot.MouseLeftButtonDown = (s, e) => this.Slot_MouseLeftButtonDown(s, e);

                                            objNormalDefaultSlot.DataContext = oDefaultSlot;
                                            objNormalDefaultSlot.SetValue(Grid.RowProperty, j);
                                            CellGrid.Children.Add(objNormalDefaultSlot);
                                            break;
                                        }
                                    case "AsRequiredSlot":
                                        {
                                            let oAsRequiredSlot: AsRequiredSlot = ObjectHelper.CreateType<AsRequiredSlot>(oChartSlotType, AsRequiredSlot);
                                            oAsRequiredSlot.IsChartAsRequiredSlotLastColumn = i == this.ChartRows[this.RowCount].ChartCells.Count - 1 ? true : false;
                                            let objAsRequiredSlot: Border = this.GetTemplate<Border>("AsRequiredSlot", oAsRequiredSlot);
                                            if (objAsRequiredSlot == null)
                                                return
                                            if (oAsRequiredSlot.SlotHeight > 0.0) {
                                                if(this.RowRefreshCellOmitUpdate){
                                                    oAsRequiredSlot.SlotHeight = oAsRequiredSlot.SlotHeight + 20;
                                                }
                                                if(this.RowRefreshCellReInstateUpdate){
                                                    oAsRequiredSlot.SlotHeight = oAsRequiredSlot.SlotHeight - 20;
                                                }
                                                objAsRequiredSlot.SetBinding(FrameworkElement.HeightProperty, new Binding("SlotHeight"));
                                                objAsRequiredSlot.Height = oAsRequiredSlot.SlotHeight;
                                                objAsRequiredSlot.Child.Height = oAsRequiredSlot.SlotHeight;
                                            }
                                            if (oAsRequiredSlot != null && oAsRequiredSlot.AdminSummary != null) {
                                                while (oAsRequiredSlot.AdminSummary.Count < 4) {
                                                    let oChartIcon: ChartStringIcon = new ChartStringIcon();
                                                    oChartIcon.StringData = String.Empty;
                                                    oChartIcon.Tooltip = String.Empty;
                                                    oChartIcon.EnableOnHotSpotClick = false;
                                                    oChartIcon.UriString = String.Empty;
                                                    oAsRequiredSlot.AdminSummary.Add(oChartIcon);
                                                }
                                            }
                                            let objTagcon: TagObject = new TagObject();
                                            objTagcon.oDrugItem = this.ChartRows[this.RowCount].DrugItem;
                                            objTagcon.oIChartSlot = oAsRequiredSlot;
                                            objTagcon.oChartColumn = oChartCol;
                                            objTagcon.oChartCell = this.ChartRows[this.RowCount].ChartCells[i];
                                            let tagBind: Binding = new Binding();
                                            tagBind.Source = objTagcon;
                                            (<Border>(objAsRequiredSlot)).SetBinding(Border.TagProperty, tagBind);
                                            objAsRequiredSlot.Background = oAsRequiredSlot.BackGroundColor.color.color;
                                            objAsRequiredSlot.MouseLeftButtonDown = (s, e) => this.Slot_MouseLeftButtonDown(s, e);
                                            if (oAsRequiredSlot.HighlightReviewSlot) {
                                                (<Border>(objAsRequiredSlot)).BorderThickness = ControlStyles.ReviewBorderWidth;
                                                (<Border>(objAsRequiredSlot)).BorderBrush = new SolidColorBrush(Colors.Red).color.color;
                                            }
                                            objAsRequiredSlot.DataContext = oAsRequiredSlot;
                                            objAsRequiredSlot.SetValue(Grid.RowProperty, j);
                                            CellGrid.Children.Add(objAsRequiredSlot);
                                            break;
                                        }
                                    case "TodayAsRequiredSlot":
                                        {
                                            let oTodayAsRequiredSlot: TodayAsRequiredSlot = ObjectHelper.CreateType<TodayAsRequiredSlot>(oChartSlotType, TodayAsRequiredSlot);
                                            oTodayAsRequiredSlot.IsChartTodayAsRequiredSlotLastColumn = i == this.ChartRows[this.RowCount].ChartCells.Count - 1 ? true : false;
                                            let objTodayAsRequiredSlot: Border = this.GetTemplate<Border>("TodayAsRequiredSlot", oTodayAsRequiredSlot);
                                            if (objTodayAsRequiredSlot == null)
                                                return
                                            if (oTodayAsRequiredSlot.SlotHeight > 0.0) {
                                                if(this.RowRefreshCellOmitUpdate){
                                                    oTodayAsRequiredSlot.SlotHeight = oTodayAsRequiredSlot.SlotHeight + 20;
                                                }
                                                if(this.RowRefreshCellReInstateUpdate){
                                                    oTodayAsRequiredSlot.SlotHeight = oTodayAsRequiredSlot.SlotHeight - 20;
                                                }
                                                objTodayAsRequiredSlot.SetBinding(FrameworkElement.HeightProperty, new Binding("SlotHeight"));
                                                objTodayAsRequiredSlot.Height = oTodayAsRequiredSlot.SlotHeight;
                                                objTodayAsRequiredSlot.Child.Height = oTodayAsRequiredSlot.SlotHeight;
                                            }
                                            let objTagcon: TagObject = new TagObject();
                                            objTagcon.oDrugItem = this.ChartRows[this.RowCount].DrugItem;
                                            objTagcon.oIChartSlot = oTodayAsRequiredSlot;
                                            objTagcon.oChartColumn = oChartCol;
                                            objTagcon.oChartCell = this.ChartRows[this.RowCount].ChartCells[i];
                                            if (oTodayAsRequiredSlot.HighlightReviewSlot) {
                                                (<Border>(objTodayAsRequiredSlot)).BorderThickness = ControlStyles.ReviewBorderWidth;
                                                (<Border>(objTodayAsRequiredSlot)).BorderBrush = new SolidColorBrush(Colors.Red).color.color;
                                            }
                                            let tagBind: Binding = new Binding();
                                            tagBind.Source = objTagcon;
                                            (<Border>(objTodayAsRequiredSlot)).SetBinding(Border.TagProperty, tagBind);
                                            objTodayAsRequiredSlot.Background = oTodayAsRequiredSlot.BackGroundColor.color.color;
                                            objTodayAsRequiredSlot.MouseLeftButtonDown = (s, e) => this.Slot_MouseLeftButtonDown(s, e);

                                            objTodayAsRequiredSlot.DataContext = oTodayAsRequiredSlot;
                                            objTodayAsRequiredSlot.SetValue(Grid.RowProperty, j);
                                            CellGrid.Children.Add(objTodayAsRequiredSlot);
                                            break;
                                        }
                                    case "TodayMultiSlot":
                                        {
                                            let oTodayMultiSlot: TodayMultiSlot = ObjectHelper.CreateType<TodayMultiSlot>(oChartSlotType, TodayMultiSlot);
                                            if (oTodayMultiSlot != null && oTodayMultiSlot.AdminSummary != null) {
                                                while (oTodayMultiSlot.AdminSummary.Count < 4) {
                                                    let oChartIcon: ChartStringIcon = new ChartStringIcon();
                                                    oChartIcon.StringData = String.Empty;
                                                    oChartIcon.Tooltip = String.Empty;
                                                    oChartIcon.EnableOnHotSpotClick = false;
                                                    oChartIcon.UriString = String.Empty;
                                                    oTodayMultiSlot.AdminSummary.Add(oChartIcon);
                                                }
                                            }
                                            oTodayMultiSlot.IsChartTodayMultiSlotLastColumn = i == this.ChartRows[this.RowCount].ChartCells.Count - 1 ? true : false;
                                            let objTodayMultiSlot: Border = this.GetTemplate("TodayMultiSlot", oTodayMultiSlot);
                                            if (objTodayMultiSlot == null)
                                                return
                                            if (oTodayMultiSlot.SlotHeight > 0.0) {
                                                if(this.RowRefreshCellOmitUpdate){
                                                    oTodayMultiSlot.SlotHeight = oTodayMultiSlot.SlotHeight + 20;
                                                }
                                                if(this.RowRefreshCellReInstateUpdate){
                                                    oTodayMultiSlot.SlotHeight = oTodayMultiSlot.SlotHeight - 20;
                                                }
                                                objTodayMultiSlot.SetBinding(FrameworkElement.HeightProperty, new Binding("SlotHeight"));
                                                objTodayMultiSlot.Height = oTodayMultiSlot.SlotHeight;
                                                objTodayMultiSlot.Child.Height = oTodayMultiSlot.SlotHeight;
                                            }
                                            let objTagcon: TagObject = new TagObject();
                                            objTagcon.oDrugItem = this.ChartRows[this.RowCount].DrugItem;
                                            objTagcon.oIChartSlot = oTodayMultiSlot;
                                            objTagcon.oChartColumn = oChartCol;
                                            objTagcon.oChartCell = this.ChartRows[this.RowCount].ChartCells[i];
                                            let tagBind: Binding = new Binding();
                                            tagBind.Source = objTagcon;
                                            (<Border>(objTodayMultiSlot)).SetBinding(Border.TagProperty, tagBind);
                                            if (oTodayMultiSlot.HighlightReviewSlot) {
                                                (<Border>(objTodayMultiSlot)).BorderThickness = ControlStyles.ReviewBorderWidth;
                                                (<Border>(objTodayMultiSlot)).BorderBrush = new SolidColorBrush(Colors.Red).color.color;
                                            }
                                            objTodayMultiSlot.Background = oTodayMultiSlot.BackGroundColor.color.color;
                                            objTodayMultiSlot.MouseLeftButtonDown = (s, e) => this.Slot_MouseLeftButtonDown(s, e);

                                            objTodayMultiSlot.DataContext = oTodayMultiSlot;
                                            objTodayMultiSlot.SetValue(Grid.RowProperty, j);
                                            CellGrid.Children.Add(objTodayMultiSlot);
                                            break;
                                        }
                                    case "BlankSlot":
                                        {
                                            let oBlankSlot: BlankSlot = ObjectHelper.CreateType<BlankSlot>(oChartSlotType, BlankSlot);
                                            let objBlankSlot: any = this.GetTemplate("BlankSlot");
                                            if (objBlankSlot == null)
                                                return
                                            if (oBlankSlot.SlotHeight > 0.0) {
                                                if(this.RowRefreshCellOmitUpdate){
                                                    oBlankSlot.SlotHeight = oBlankSlot.SlotHeight + 20;
                                                }
                                                if(this.RowRefreshCellReInstateUpdate){
                                                    oBlankSlot.SlotHeight = oBlankSlot.SlotHeight - 20;
                                                }
                                                objBlankSlot.SetBinding(FrameworkElement.HeightProperty, new Binding("SlotHeight"));
                                                objBlankSlot.Height = oBlankSlot.SlotHeight;
                                            }
                                            let objTagcon: TagObject = new TagObject();
                                            objTagcon.oDrugItem = this.ChartRows[this.RowCount].DrugItem;
                                            objTagcon.oIChartSlot = oBlankSlot;
                                            objTagcon.oChartColumn = oChartCol;
                                            objTagcon.oChartCell = this.ChartRows[this.RowCount].ChartCells[i];
                                            let tagBind: Binding = new Binding();
                                            tagBind.Source = objTagcon;
                                            (<Border>(objBlankSlot)).SetBinding(Border.TagProperty, tagBind);
                                            objBlankSlot.Background = oBlankSlot.BackGroundColor.color.color;
                                            objBlankSlot.MouseLeftButtonDown = (s, e) => this.Slot_MouseLeftButtonDown(s, e);
                                            if (oBlankSlot.HighlightReviewSlot) {
                                                (<Border>(objBlankSlot)).BorderThickness = ControlStyles.ReviewBorderWidth;
                                                (<Border>(objBlankSlot)).BorderBrush = new SolidColorBrush(Colors.Red).color.color;
                                            }
                                            objBlankSlot.DataContext = oBlankSlot;
                                            objBlankSlot.SetValue(Grid.RowProperty, j);
                                            CellGrid.Children.Add(objBlankSlot);
                                            break;
                                        }
                                    case "OverviewSlot":
                                        {
                                            let oOverViewSlot: OverviewSlot = ObjectHelper.CreateType<OverviewSlot>(oChartSlotType, OverviewSlot);
                                            let objOverViewSlot: Border = this.GetTemplate<Border>("OverviewSlot", oOverViewSlot);
                                            if (objOverViewSlot == null)
                                                return
                                            if (oOverViewSlot.SlotHeight > 0.0) {
                                                if(this.RowRefreshCellOmitUpdate){
                                                    oOverViewSlot.SlotHeight = oOverViewSlot.SlotHeight + 20;
                                                }
                                                if(this.RowRefreshCellReInstateUpdate){
                                                    oOverViewSlot.SlotHeight = oOverViewSlot.SlotHeight - 20;
                                                }
                                                objOverViewSlot.SetBinding(FrameworkElement.HeightProperty, new Binding("SlotHeight"));
                                                objOverViewSlot.Height = oOverViewSlot.SlotHeight;
                                                objOverViewSlot.Child.Height = oOverViewSlot.SlotHeight;
                                            }
                                            let objTagcon: TagObject = new TagObject();
                                            objTagcon.oDrugItem = this.ChartRows[this.RowCount].DrugItem;
                                            objTagcon.oIChartSlot = oOverViewSlot;
                                            objTagcon.oChartColumn = oChartCol;
                                            objTagcon.oChartCell = this.ChartRows[this.RowCount].ChartCells[i];
                                            let tagBind: Binding = new Binding();
                                            tagBind.Source = objTagcon;
                                            (<Border>(objOverViewSlot)).SetBinding(Border.TagProperty, tagBind);
                                            objOverViewSlot.Background = oOverViewSlot.BackGroundColor.color.color;
                                            objOverViewSlot.MouseLeftButtonDown = (s, e) => this.Slot_MouseLeftButtonDown(s, e);
                                            if (oOverViewSlot.HighlightReviewSlot) {
                                                (<Border>(objOverViewSlot)).BorderThickness = ControlStyles.ReviewBorderWidth;
                                                (<Border>(objOverViewSlot)).BorderBrush = new SolidColorBrush(Colors.Red).color.color;
                                            }
                                            objOverViewSlot.DataContext = oOverViewSlot;
                                            objOverViewSlot.SetValue(Grid.RowProperty, j);
                                            CellGrid.Children.Add(objOverViewSlot);
                                            break;
                                        }
                                    case "DoseOverviewSlot":
                                        {
                                            let oDoseOverViewSlot: DoseOverviewSlot = ObjectHelper.CreateType<DoseOverviewSlot>(oChartSlotType, DoseOverviewSlot);
                                            oDoseOverViewSlot.IsLastColumn = i == this.ChartRows[this.RowCount].ChartCells.Count -1 ? true : false;
                                            let objDoseOverViewSlot: Border = this.GetTemplate<Border>("DoseOverviewSlot", oDoseOverViewSlot);
                                            if (objDoseOverViewSlot == null)
                                                return
                                            if (oDoseOverViewSlot.SlotHeight > 0.0) {
                                                if(this.RowRefreshCellOmitUpdate){
                                                    oDoseOverViewSlot.SlotHeight = oDoseOverViewSlot.SlotHeight + 20;
                                                }
                                                if(this.RowRefreshCellReInstateUpdate){
                                                    oDoseOverViewSlot.SlotHeight = oDoseOverViewSlot.SlotHeight - 20;
                                                }
                                                objDoseOverViewSlot.SetBinding(FrameworkElement.HeightProperty, new Binding("SlotHeight"));
                                                objDoseOverViewSlot.Height = oDoseOverViewSlot.SlotHeight;
                                                objDoseOverViewSlot.Child.Height = oDoseOverViewSlot.SlotHeight;
                                            }
                                            let objTagcon: TagObject = new TagObject();
                                            objTagcon.oDrugItem = this.ChartRows[this.RowCount].DrugItem;
                                            objTagcon.oIChartSlot = oDoseOverViewSlot;
                                            objTagcon.oChartColumn = oChartCol;
                                            objTagcon.oChartCell = this.ChartRows[this.RowCount].ChartCells[i];
                                            let tagBind: Binding = new Binding();
                                            tagBind.Source = objTagcon;
                                            (<Border>(objDoseOverViewSlot)).SetBinding(Border.TagProperty, tagBind);

                                            objDoseOverViewSlot.MouseLeftButtonDown = (s, e) => this.Slot_MouseLeftButtonDown(s, e);
                                            if (oDoseOverViewSlot.HighlightReviewSlot) {
                                                (<Border>(objDoseOverViewSlot)).BorderThickness = ControlStyles.ReviewBorderWidth;
                                                (<Border>(objDoseOverViewSlot)).BorderBrush = new SolidColorBrush(Colors.Red).color.color;
                                            }
                                            objDoseOverViewSlot.Background = oDoseOverViewSlot.BackGroundColor.color.color;
                                            objDoseOverViewSlot.DataContext = oDoseOverViewSlot;
                                            objDoseOverViewSlot.SetValue(Grid.RowProperty, j);
                                            CellGrid.Children.Add(objDoseOverViewSlot);
                                            //53541
                                            if (this.enterDoseKey != undefined && this.enterDoseKey != '' ) {
                                                if (oChartSlotType.Key == this.enterDoseKey) {
                                                    this.borders = [];
                                                    this.borders.push(objDoseOverViewSlot);
                                                    this.borders[0].Background = "#FFFFFF";
                                                    this.DicSelectedSlots.Clear();
                                                    this.DicSelectedSlots.Add(this.enterDoseKey, objDoseOverViewSlot);
                                                    this.enterDoseKey = '';
                                                }
                                            }
                                            //end
                                            break;
                                        }
                                }
                            }                          
                            if (this.ChartRows[this.RowCount].ChartCells[i].Slots.Count == 0) {
                                let emptySlot: Border = new Border();                               
                                let fe: any = ObjectHelper.CreateType<Border>(e.Row, Border);
                                emptySlot.Style = this.Styles.BorderWidth;
                                emptySlot.VerticalAlignment = 'Stretch';
                                emptySlot.VerticalAlignment = 'Stretch';
                                emptySlot.Height = drg;
                                emptySlot.BorderBrush = "#7090A5";
                                emptySlot.BorderThickness = new Thickness(1, 0, 1, 0);
                                CellGrid.Children.Add(emptySlot);
                            }
                            let cell0: GridViewCell = e.Row.Cells[this.ChartRows[this.RowCount].ChartCells[i].ColIndex];
                            if( this.RowCount > this.loadedCount && !isFromRefresh){
                                (<DataTemplate>cell0.dataTemplates).render = false;
                            }
                            (<DataTemplate>cell0.dataTemplates).Content = parentGrid;
                        }
                        if (drg){
                            // if(isFromRefresh){
                            //     this.GridControl.Rows[this.RowCount].Cells[index].iStyle = { 'height': 'inherit' };
                            // }
                            // else{
                                this.GridControl.Rows[this.RowCount].Cells[index].iStyle = { 'height': `${drg}`+'px' };
                            // }
                        }
                        if(this.RowRefreshCellOmitUpdate){
                            this.RowRefreshCellOmitUpdate = false;
                        }
                        if(this.RowRefreshCellReInstateUpdate){
                            this.RowRefreshCellReInstateUpdate = false;
                        }
                        let column = this.ChartColumns.Where(CharColus => CharColus.IsToday).Select(CharColus => CharColus);
                        if (column.Count() > 0) {
                            let col: ChartColumn = <ChartColumn>column.First();
                            if (this.RowCount == this.ChartRows.Count - 1) {
                                this.GridControl.Rows[this.ChartRows.Count - 1].Cells[col.Index].iStyle = { 'border': `solid ${this.TodayBorderColor.color.color}`, 'border-width': '0px 4px 4px 4px' };
                            }
                            else {
                                this.GridControl.Rows[this.RowCount].Cells[col.Index].iStyle = { 'border': `solid ${this.TodayBorderColor.color.color}`, 'border-width': '0px 4px 0px 4px' };
                            }
                        }
                        this.RowCount += 1;
                    }
                }
            }
        }
        catch (err) {
            console.log("ChartError", err);
        }

    }
    objDrugDetails_SizeChanged(sender: Object, e: SizeChangedEventArgs,isFromRefresh?: boolean): any {
        try {
            let fe: any = ObjectHelper.CreateType<Border>(sender, Border);
            let index: number = this.CheckBoxColumn ? 1 : 0;
            let drg;
            let drgele = document.getElementById(fe.Cells[index].dataTemplates.GUID);
            if (drgele != undefined && drgele != null) {
                drg = drgele.offsetHeight;
                drg = this.calculateDRG(drg, isFromRefresh, fe);
                console.log('working objDrugDetails_SizeChanged methods');
            } else {
                setTimeout(() => {
                    drgele = document.getElementById(fe.Cells[index].dataTemplates.GUID);
                    if (drgele != undefined && drgele != null) {
                        console.log('working settimeout');
                        drg = drgele.offsetHeight;
                        drg = this.calculateDRG(drg, isFromRefresh, fe);
                    }
                }, 300);
            }
            return drg;
        }
        catch (er) {
        }
    }
    calculateDRG(drg, isFromRefresh, fe) {
        let totSlotHt: number = 0.0;
        let IsChange: boolean = false;
        let pChartRow: ChartRow = ObjectHelper.CreateType<ChartRow>(fe.Tag, ChartRow);
            let index:number = this.CheckBoxColumn ? 1 : 0;
        if (this.ShowSlotTiminings) {
            if (pChartRow.TimeSlots != null && pChartRow.TimeSlots.Count > 0) {
                    drg += 10;
                    totSlotHt = pChartRow.TimeSlots.Sum(tot => tot.SlotHeight);
                    if (drg > totSlotHt) {
                        IsChange = true;
                    }
                    else if(isFromRefresh && !this.rowIndexArray.find(x=>x == this.RowCount)){
                        this.rowIndexArray.push(this.RowCount);
                        // drg += 10;
                        if (drg > totSlotHt) {
                            IsChange = true;
                        }
                    }
                }
                else
                    pChartRow.TimeSlots[0].SlotHeight = drg
            }
            else if (pChartRow.ChartCells != null && pChartRow.ChartCells.Count > 0) {
                for (let indx: number = 0; indx < pChartRow.ChartCells.Count; indx++) {
                    if (pChartRow.ChartCells[indx].Slots != null) {
                        if (pChartRow.ChartCells[indx].Slots.Sum(tot => tot.SlotHeight) > totSlotHt)
                            totSlotHt = pChartRow.ChartCells[indx].Slots.Sum(tot => tot.SlotHeight);
                        if (totSlotHt >= drg) {
                            IsChange = false;
                            break;
                        }
                        IsChange = true;
                    }
                }
            }
            if (IsChange) {
                let slotNewHt: number = 0.0;
                let reduceTodayHt: boolean = false;
                let colIndx: number = 0;
                let AdjustHt: boolean = false;
                for (; colIndx < this.ChartColumns.Count; colIndx++) {
                    if (this.ChartColumns[colIndx].IsToday) {
                        AdjustHt = true;
                        if (this.ChartRows.IndexOf(pChartRow) == this.ChartRows.Count - 1)
                            reduceTodayHt = true;
                        if (this.ShowSlotTiminings)
                            colIndx -= 1;
                        break;
                    }
                }
                for (let chartIndx: number = 0; chartIndx < pChartRow.ChartCells.Count; chartIndx++) {
                    if (pChartRow.ChartCells[chartIndx].Slots != null) {
                        if (pChartRow.ChartCells[chartIndx].Slots.Count == 1) {
                            pChartRow.ChartCells[chartIndx].Slots[0].SlotHeight = drg;
                            if (AdjustHt && !reduceTodayHt && pChartRow.ChartCells[chartIndx].Slots.Count == 1)
                                pChartRow.ChartCells[chartIndx].Slots[0].SlotHeight -= 1;
                        }
                        else {
                            if (pChartRow.ChartCells[chartIndx].Slots.Count == 0)
                                slotNewHt = drg;
                            else
                            slotNewHt = drg / pChartRow.ChartCells[chartIndx].Slots.Count;
                            pChartRow.ChartCells[chartIndx].Slots.ToList().ForEach(slHt => slHt.SlotHeight = slotNewHt);
                        }
                        if (reduceTodayHt) {
                            if (chartIndx == (colIndx - 1)) {
                                if (pChartRow.ChartCells[chartIndx].Slots != null) {
                                    if (pChartRow.ChartCells[chartIndx].Slots.Count > 0)
                                        pChartRow.ChartCells[chartIndx].Slots[pChartRow.ChartCells[chartIndx].Slots.Count-1].SlotHeight -= 3;
                                }
                            }
                        }
                        if (pChartRow.ChartCells[chartIndx].Slots.Count > 0 && drg > pChartRow.ChartCells[chartIndx].Slots.Sum(tot => tot.SlotHeight) && !pChartRow.ChartCells[chartIndx].Slots[pChartRow.ChartCells[chartIndx].Slots.Count-1].SlotHeight)
                            drg = pChartRow.ChartCells[chartIndx].Slots.Sum(tot => tot.SlotHeight);
                    }
                }
                if (this.ShowSlotTiminings) {
                    if (pChartRow.TimeSlots != null && pChartRow.TimeSlots.Count > 0) {
                        slotNewHt = drg / pChartRow.TimeSlots.Count;
                        pChartRow.TimeSlots.ToList().ForEach(slHt => slHt.SlotHeight = slotNewHt);
                    }
                }
            }
            return drg;
        }

    oCommonBorder: Border;
    Slot_MouseLeftButtonDown(sender: Object, e: MouseButtonEventArgs): void {
        try {
            if (this.oCommonBorder == null) {
                if ((ObjectHelper.CreateType<TagObject>((<Border>(sender)).Tag, TagObject)).oIChartSlot.EnableSlotClick)
                    this.oCommonBorder = <Border>(sender);
            }
            if (this.oCommonBorder != null || (this.oCommonBorder != null && this.oCommonBorder.BorderBrush != null)) {
                if (!this.AllowSlotMultiselect) {
                    let clickedBrder: Border = ObjectHelper.CreateType<Border>(sender, Border);
                    let oComBordTagObjNew: TagObject = ObjectHelper.CreateType<TagObject>(clickedBrder.Tag, TagObject);
                    if (oComBordTagObjNew.oIChartSlot.EnableSlotClick) {
                        this.DicSelectedSlots.Clear();
                        // this.oCommonBorder.SetValue(Border.BorderBrushProperty, this.DefaultSlotBrdColor);
                        this.oCommonBorder.BorderBrush = this.DefaultSlotBrdColor;
                        let oComBordTagObj: TagObject = ObjectHelper.CreateType<TagObject>(this.oCommonBorder.Tag, TagObject);
                        oComBordTagObj.IsSelected = false;
                        oComBordTagObj.oIChartSlot.IsSelected = false;
                        if (oComBordTagObj.oIChartSlot.HighlightReviewSlot) {
                            // this.oCommonBorder.SetValue(Border.BorderBrushProperty, new SolidColorBrush(Colors.Red));
                            this.oCommonBorder.BorderBrush = "#FF0000";
                            this.oCommonBorder.BorderThickness = new Thickness(2);
                            // this.oCommonBorder.SetValue(Border.BorderThicknessProperty, new Thickness(2));
                        }
                        this.oCommonBorder = (<Border>(sender));
                        oComBordTagObjNew.IsSelected = true;
                        oComBordTagObjNew.oIChartSlot.IsSelected = true;
                        // this.oCommonBorder.SetValue(Border.BorderBrushProperty, new SolidColorBrush(Colors.Black));
                        this.oCommonBorder.BorderThickness = new Thickness(1);
                        this.oCommonBorder.BorderBrush = "#000000";
                        let slotKey: string = oComBordTagObjNew.oIChartSlot.Key;
                        this.DicSelectedSlots.Add(slotKey, this.oCommonBorder);
                    }
                }
                else {
                    let selBorder: Border = (<Border>(sender));
                    this.oCommonBorder = selBorder;
                    let selbordTagObj: TagObject = ObjectHelper.CreateType<TagObject>(selBorder.Tag, TagObject);
                    let slotKey: string = selbordTagObj.oIChartSlot.Key;
                    if (selbordTagObj.oIChartSlot.EnableSlotSelect) {
                        if (!this.DicSelectedSlots.ContainsKey(slotKey)) {
                            if (selbordTagObj.oIChartSlot.EnableSlotClick) {
                                selBorder.SetValue(Border.BorderBrushProperty, this.SlotSelectedBorder);
                                //selBorder.SetValue(Border.BorderBrushProperty,new SolidColorBrush(Colors.Black))
                                selBorder.SetValue(Border.BackgroundProperty, this.SlotSelectedBG);
                                
                                //selBorder.SetValue(Border.BackgroundProperty, "#ffffff");
                                selbordTagObj.IsSelected = true;
                                selbordTagObj.oIChartSlot.IsSelected = true;
                                selbordTagObj.oIChartSlot.EnableSlotSelect = true;
                                this.DicSelectedSlots.Add(slotKey, selBorder);
                                //this.UpDateSelectedSlots(); // to be revisit suresh
                            }
                        }
                        else {
                            selbordTagObj.IsSelected = false;
                            selbordTagObj.oIChartSlot.IsSelected = false;
                            selbordTagObj.oIChartSlot.EnableSlotSelect = true;
                            selBorder.SetValue(Border.BorderBrushProperty, this.DefaultSlotBrdColor);
                            if (selbordTagObj.oIChartSlot.HighlightReviewSlot) {
                                // selBorder.SetValue(Border.BorderBrushProperty, new SolidColorBrush(Colors.Red));
                                selBorder.BorderBrush = new SolidColorBrush(Colors.Red).color.color;
                                selBorder.SetValue(Border.BorderThicknessProperty, new Thickness(2));
                            }
                            //selBorder.SetBinding(Border.BackgroundProperty, new Binding("BackGroundColor")); 
                            //selBorder.SetValue(Border.BackgroundProperty, Colors.Transparent.color);  // to be revisit
                           // selBorder.SetValue(Border.BackgroundProperty, selBorder.Tag.oIChartSlot.BackGroundColor.color.color); 


                           let omittedSlot = "";
                            if (selbordTagObj != null && selbordTagObj.oIChartSlot['_Tag'] != null && selbordTagObj.oIChartSlot['_Tag'].SlotStatus != null) {
                                omittedSlot = selbordTagObj.oIChartSlot['_Tag'].SlotStatus.toLowerCase();
                            }
                            if (omittedSlot.includes("omitted")) {
                                selBorder.SetValue(Border.BackgroundProperty, selbordTagObj.oIChartSlot.BackGroundColor);
                                selBorder.SetValue(Border.BorderThicknessProperty, '1');
                            }
                            else {
                                let SlotunSelectedBG = ObjectHelper.CreateType<SolidColorBrush>(new SolidColorBrush(Colors.Transparent), SolidColorBrush)
                                selBorder.SetValue(Border.BackgroundProperty, SlotunSelectedBG);
                                selBorder.SetValue(Border.BorderThicknessProperty, '1'); // to be revisit
                            }
                           
                           // this.UpDateSelectedSlots();                         
                            this.DicSelectedSlots.Remove(slotKey);
                             // to be revisit Suresh
                        }
                    }
                    else {
                        selbordTagObj.IsSelected = false;
                        selbordTagObj.oIChartSlot.IsSelected = false;
                        selBorder.SetValue(Border.BorderBrushProperty, this.DefaultSlotBrdColor);
                        if (selbordTagObj.oIChartSlot.HighlightReviewSlot) {
                            selBorder.SetValue(Border.BorderBrushProperty, new SolidColorBrush(Colors.Red).color.color);
                            selBorder.BorderThickness = ControlStyles.ReviewBorderWidth;
                        }
                        selBorder.SetBinding(Border.BackgroundProperty, new Binding("BackGroundColor"));
                        selBorder.SetValue(Border.BorderThicknessProperty, '1'); 
                    }
                }
            }
            // if (ObjectHelper.GetType(e.OriginalSource) == typeof (Image)) {                
            //     this.FireImageClick(e.OriginalSource, e);
            // }
            // else {
                this.SlotClick(sender, e);
            // }
            if(this.senderHistoryIcon != null && this.senderHistoryIcon != undefined)
            {
                this.FireImageClick(this.senderHistoryIcon, this.eHistoryIcon);
                this.senderHistoryIcon = null; this.eHistoryIcon = null;
            }
        }
        catch (err) {

        }

    }
    Drug_MouseLeftButtonDown(sender: Object, e: MouseButtonEventArgs): void {
        try {
            // if (e.OriginalSource.GetType() == typeof (Image))
	    
            if (e.OriginalSource instanceof(Image)){
                this.DrugItemFireImageClick(e.OriginalSource, e);
            }
        }
        catch (err) {

        }

    }
    bClick: boolean = false;
    cb_MouseLeftButtonDown(sender: Object, e: MouseButtonEventArgs): void {
        try {
            this.bClick = true;
        }
        catch (err) {

        }

    }
    public GridControl_SelectionChanging(sender: Object, e: SelectionChangingEventArgs): void {
        if (this.bClick) {
            this.bClick = false;
        }
        else {
            e.Cancel = true;
        }
    }
    private Border_Loaded(sender: Object, e: RoutedEventArgs): void {
        let brd: Border = <Border>sender;
        brd.DataContext = this;
        brd.SetBinding(Border.BorderBrushProperty, new Binding("TodayBorderColor"));
    }
    private HeaderBorder_Loaded(sender: Object, e: RoutedEventArgs): void {
        let brd: Border = <Border>sender;
        this._HeaderBorder = brd;
        brd.Background = this.TodayBorderColor;
        brd.BorderBrush = this.TodayBorderColor;
    }
    //public delegate void OnHotSpotClickhandler(object sender, TagObject TagObject);
    @Input() OnHotSpotClick: Function;
    //public delegate void OnDrugHotSpotClickhandler(object sender, TagObject TagObject);
    @Input() OnDrugHotSpotClick: Function;
    //public delegate void OnSlotHotSpotClickhandler(object sender, TagObject TagObject);
    @Input() OnSlotHotSpotClick: Function;
    //public delegate void OnRowSelectionChangedhandler(object sender, ChartRow[] SelectedItem, ChartRow[] UnselectedItem);
    @Input() OnRowSelectionChanged: Function;
    public ClearAllSlotSelection(): void {
        this.borders = [];
        this.DicSelectedSlots.forEach((brs) => {
            let oldBrd: Border = ObjectHelper.CreateType<Border>(brs.Value, Border);
            let objOldBrdTag: TagObject = ObjectHelper.CreateType<TagObject>(oldBrd.Tag, TagObject);
            
            (<Border>(brs.Value)).BorderBrush = this.DefaultSlotBrdColor; 
            (<Border>(brs.Value)).SetBinding(Border.BackgroundProperty, new Binding("BackGroundColor"));

            (<Border>(brs.Value)).SetValue(Border.BackgroundProperty, objOldBrdTag.oIChartSlot.BackGroundColor.color.color); 
            (<Border>(brs.Value)).SetValue(Border.BorderThicknessProperty, '1'); 
            let objBrdTag: TagObject = ObjectHelper.CreateType<TagObject>((<Border>(brs.Value)).Tag, TagObject);
            objBrdTag.IsSelected = false;
            objBrdTag.oIChartSlot.IsSelected = false;
            if (objBrdTag.oIChartSlot.HighlightReviewSlot) {
                (<Border>(brs.Value)).BorderThickness = ControlStyles.ReviewBorderWidth;
                (<Border>(brs.Value)).BorderBrush = new SolidColorBrush(Colors.Red).color.color;
            }
        });
        if (this.oCommonBorder != null && !this.AllowSlotMultiselect) {
            this.oCommonBorder = null;
        }
        this.DicSelectedSlots.Clear();
        this.changeDetectionRef.detectChanges();
    }
    public GetSelectedRows(): List<ChartRow> {
        let SelecetdChartRows: List<ChartRow> = new List<ChartRow>();
        this.GridControl.GetSelectedRows().forEach((row) => {
            SelecetdChartRows.Add(row);
        });
        return SelecetdChartRows;
    }
    public ClearAllSelectedRows(): void {
        
        let rowIndx: number = 0;
        if (this.CheckBoxColumn) {
            let SelecetdChartRows: List<ChartRow> = new List<ChartRow>();
            this.GridControl.GetSelectedRows().forEach((row) => {
                SelecetdChartRows.Add(row);
            });
            SelecetdChartRows.forEach((row) => {
                if (row != null) {
                    rowIndx = this.ChartRows.IndexOf(row);
                    let gdrow: GridViewRow = (<GridViewRow>this.GridControl.ItemContainerGenerator.ContainerFromItem(this.GridControl.Items[rowIndx]));
                    if (gdrow != null) {
                        if (row.DrugItem.AllowSelect) {
                            this.bClick = true;
                            gdrow.IsSelected = false;
                        }
                    }
                }
            });
// to be revisit bug id: 48042
this.GridControl.UnselectAll();
let selectedRowArr = [];
            this.SelectCheckbox.forEach(row => {
                if(row.IsChecked){
                row.IsChecked = false; 
                let oselc: ChartRow = ObjectHelper.CreateType<ChartRow>(row, ChartRow);
                this.OnRowSelectionChanged(oselc, selectedRowArr);  
            }     
               });
        }
    }
    public DeSelectRowByKey(sKey: string): number {
        let lResult: number = 0;
        let rowIndx: number = 0;
        if (this.CheckBoxColumn) {
            let objRow: ChartRow = this.ChartRows.Where(dicObs => dicObs.Key == sKey).Select(s => s as ChartRow).First();
            if (objRow != null) {
                rowIndx = this.ChartRows.IndexOf(objRow);
            }
            try {
                let row: GridViewRow = (<GridViewRow>this.GridControl.ItemContainerGenerator.ContainerFromItem(this.GridControl.Items[rowIndx]));
                if (row != null) {
                    if (objRow.DrugItem.AllowSelect) {
                        this.bClick = true;
                        row.IsSelected = false;
                    }
                }
            }
            catch (exp) {
                lResult = -1;
                return lResult;
            }

        }
        return lResult;
    }
    public SelectedRowByKey(sKey: string): number {
        let lResult: number = 0;
        let rowIndx: number = 0;
        if (this.CheckBoxColumn) {

            let objRow: ChartRow = this.ChartRows.Where(dicObs => dicObs.Key == sKey).Select(s => s as ChartRow).First();
            if (objRow != null) {
                rowIndx = this.ChartRows.IndexOf(objRow);
            }
            try {
                let row: GridViewRow = (<GridViewRow>this.GridControl.ItemContainerGenerator.ContainerFromItem(this.GridControl.Items[rowIndx]));
                if (row != null) {
                    if (objRow.DrugItem.AllowSelect) {
                        this.bClick = true;
                        row.IsSelected = true;
                    }
                }
            }
            catch (exp) {
                lResult = -1;
                return lResult;
            }

        }
        return lResult;
    }
    //public SelectSlot(SlotKey: string): void {
        public SelectSlot(sender: any): void {
        let rowIndx: number = 0;
        let cellIndex: number = 0;
        let slotIndex: number = 0;
        try {
            /* to be revisit */
            let selBorder: Border = (<Border>(sender));
            this.oCommonBorder = selBorder;
            let selbordTagObj: TagObject = ObjectHelper.CreateType<TagObject>(selBorder.Tag, TagObject);
            let SlotKey: string = selbordTagObj.oIChartSlot.Key;
            /* end to be revisit */

            let objChartRow: ChartRow = this.ChartRows.Where(vChartRows => vChartRows.ChartCells.Any(cCell => cCell.Slots.Any(oSlot => oSlot.Key == SlotKey))).Select(s => s).First();
                if (objChartRow != null) {
                    rowIndx = this.ChartRows.IndexOf(objChartRow);
                }
                let objChartCell: ChartCell = objChartRow.ChartCells.Where(vChartCells => vChartCells.Slots.Any(oSlot => oSlot.Key == SlotKey)).Select(vChartCells => vChartCells).First();

                if (objChartCell != null) {
                    cellIndex = objChartCell.ColIndex;
                }
                let objSlot: IChartSlot = objChartCell.Slots.Where(vSlots => vSlots.Key == SlotKey).Select(vSlots => vSlots).First();

                if (objSlot != null) {
                    slotIndex = objChartCell.Slots.IndexOf(objSlot);
                }
                if (objSlot != null && objSlot.EnableSlotClick) {
                    // console.log("childrenofType-grid",this.GridControl.Rows[rowIndx + 1].Cells[cellIndex].Content);
                    // let objCellGrid: Grid = ObjectHelper.CreateType<Grid>(this.GridControl.Rows[rowIndx + 1].Cells[cellIndex].Content, Grid);
                    /*let selBorder: Border;
                    //let name:string = 'StackPanel';
                    selBorder = ObjectHelper.CreateType<Border>((objCellGrid.ChildrenOfType<StackPanel>(StackPanel)).First().Children[slotIndex], Border);
                    let selbordTagObj: TagObject = ObjectHelper.CreateType<TagObject>(selBorder.Tag, TagObject);
                    let slotKey: string = selbordTagObj.oIChartSlot.Key;*/ // to be revisit suresh
                    let slotKey:string = SlotKey;
                    if (!this.DicSelectedSlots.ContainsKey(slotKey)) {
                        if (this.DicSelectedSlots.Count() > 0 && !this.AllowSlotMultiselect) {
                            let oldBrd: Border = ObjectHelper.CreateType<Border>(this.DicSelectedSlots.First().Value, Border);
                            let objOldBrdTag: TagObject = ObjectHelper.CreateType<TagObject>(oldBrd.Tag, TagObject);
                            objOldBrdTag.IsSelected = false;
                            objOldBrdTag.oIChartSlot.IsSelected = false;
                            if (objOldBrdTag.oIChartSlot.HighlightReviewSlot) {
                                oldBrd.SetValue(Border.BorderBrushProperty, new SolidColorBrush(Colors.Red)).color.color;
                                oldBrd.BorderThickness = ControlStyles.ReviewBorderWidth;
                            }
                            oldBrd.BorderBrush = this.DefaultSlotBrdColor;
                            this.DicSelectedSlots.Clear();
                            selbordTagObj.IsSelected = true;
                            selbordTagObj.oIChartSlot.IsSelected = true;
                            this.DicSelectedSlots.Add(slotKey, selBorder);
                        }
                        if (this.AllowSlotMultiselect && selbordTagObj.oIChartSlot.EnableSlotSelect) {
                            selBorder.BorderBrush = this.SlotSelectedBorder;
                            selBorder.Background = this.SlotSelectedBG;
                            selbordTagObj.IsSelected = true;
                            selbordTagObj.oIChartSlot.IsSelected = true;
                            this.DicSelectedSlots.Add(slotKey, selBorder);
                        }
                        else {
                            selbordTagObj.oIChartSlot.IsSelected = false;
                            selbordTagObj.IsSelected = false;
                            selBorder.BorderBrush = new SolidColorBrush(Colors.Black).color.color;
                            this.oCommonBorder = selBorder;
                        }
                    }
                }
            
        }
        catch (err) {

        }

    }
    public ClearSlots(SlotKeys: List<string>): void {
        SlotKeys.forEach((sKey) => {
            if (this.DicSelectedSlots.ContainsKey(sKey)) {
                let brs: Border = ObjectHelper.CreateType<Border>(this.DicSelectedSlots[sKey], Border);
                brs.BorderBrush = this.DefaultSlotBrdColor;
                brs.SetBinding(Border.BackgroundProperty, new Binding("BackGroundColor"));
                let objBrdTag: TagObject = ObjectHelper.CreateType<TagObject>(brs.Tag, TagObject);
                objBrdTag.IsSelected = false;
                objBrdTag.oIChartSlot.IsSelected = false;
                if (objBrdTag.oIChartSlot.HighlightReviewSlot) {
                    brs.SetValue(Border.BorderBrushProperty, new SolidColorBrush(Colors.Red)).color.color;
                    brs.SetValue(Border.BorderThicknessProperty, ControlStyles.ReviewBorderWidth);
                }
                this.DicSelectedSlots.Remove(sKey);
            }
        });
        if (this.oCommonBorder != null && !this.AllowSlotMultiselect) {
            this.oCommonBorder = null;
        }
    }
    public GridControl_SelectionChanged(sender: Object, e: SelectionChangeEventArgs): void {
        let PrescriptionStatus:any;
        if (e.selectedRows.length > 0) {
            PrescriptionStatus = e.selectedRows[0].dataItem;
        }
        if (e.deselectedRows.length > 0) {
            PrescriptionStatus = e.deselectedRows[0].dataItem;
        }   
        if (this.checkDiscontinuedCompleted(PrescriptionStatus)=='True'){
            let sAddKey: string = String.Empty;
            let sRemoveKey: string = String.Empty;
            if (e.selectedRows.length > 0) {
                sAddKey = (<ChartRow>(e.selectedRows[0].dataItem)).Key;
                if (this.DicUnSelectedItems.ContainsKey(sAddKey))
                    this.DicUnSelectedItems.Remove(sAddKey);                
            }
            if (e.deselectedRows.length > 0) { 
                sRemoveKey = (<ChartRow>(e.deselectedRows[0].dataItem)).Key;
                this.DicUnSelectedItems.Add(sRemoveKey, <ChartRow>e.deselectedRows[0].dataItem);              
            }
            this.CheckboxClick(sender, e);
        }else{
            let afterRemoval = this.GridControl.selectedRowsIndex.filter(item => item != e.selectedRows[0].index);
            this.GridControl.selectedRowsIndex = afterRemoval;
        }
    }

    cursorImage(icon: string){
        if(icon == "assets/images/idiscontinuedrugnor16.png"){
            return "Auto"
        }
        else
            return "Hand";
    }

    checkDiscontinuedCompleted(dataItem) {
        let status = dataItem.DrugItem?.PrescriptionStatus;
        if (status!='' && status!=undefined) {
            if (status.toLowerCase().includes('completed') || status.toLowerCase().includes('discontinued')){
                return 'False';
            } else {
                return 'True';
            }
        } else {
            return 'True';
        }
    }
}
// export class MyToolTipTemplateSelector extends DataTemplateSelector { //Sangeetha
export class MyToolTipTemplateSelector {
    public SelectTemplate(item: Object, container: DependencyObject): DataTemplate {
        let cell: GridViewCell = ObjectHelper.CreateType<GridViewCell>(container, GridViewCell);
        if (cell != null && cell.Content != null) {
            if ((ObjectHelper.CreateType<CheckBox>(cell.Content, CheckBox)).IsChecked == true) {
                return this.UnCheckedTooltipTemplate;
            }
        }
        return this.CheckedTooltipTemplate;
    }
    public CheckedTooltipTemplate: DataTemplate;
    public UnCheckedTooltipTemplate: DataTemplate;
}
