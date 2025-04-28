import { Component, OnInit, QueryList, ViewChild, ViewChildren, ViewEncapsulation, AfterViewInit, ElementRef } from '@angular/core';
import { Convert, iBusyIndicator } from 'epma-platform/services';
import { StringComparison, Visibility } from 'epma-platform/models';
import { DataTemplate, FontStyles, FontWeights, SolidColorBrush, ToolTipService, UserControl, iCheckBox, iLabel, iTab, iTabItem } from 'epma-platform/controls';
import 'epma-platform/stringextension';
import { ObjectHelper } from 'epma-platform/helper';
import { Grid, GridExtension, RowLoadedEventArgs, SelectionChangeEventArgs, GridViewCellClickEventArgs } from 'src/app/shared/epma-platform/controls/epma-grid-helpers/grid-extension';
import { GridComponent } from '@progress/kendo-angular-grid';
import { RoutedEventArgs } from 'src/app/shared/epma-platform/controls/FrameworkElement';
import { MedSecondaryTabChild } from './medsecondarytabchild';
import { IPPMABaseVM, Indicationdtl } from '../viewmodel/ippmabasevm';
import { Common } from '../utilities/common';
import { AlternateItem } from '../viewmodel/alternateitem';
import { DrugItemInputData } from 'src/app/shared/epma-platform/soap-client/ManagePrescriptionWS';
import { CConstants, DrugItemSubTypeCode } from 'src/app/lorappmedicationcommonbb/utilities/constants';
import { CommonVariables } from 'src/app/lorappcommonbb/utilities/common';
import { AppSessionInfo } from 'src/app/lorappcommonbb/utilities/globalvariable';
import { Image } from 'epma-platform/controls';
import { StackPanel } from 'src/app/shared/epma-platform/controls/epma-stackpanel/epma-stackpanel.component';
import { Resource } from '../resource';
import * as ControlStyles from "../../shared/epma-platform/controls/ControlStyles";
import { MedicationOptionVM } from '../viewmodel/medicationoptionvm';
@Component({
    selector: 'MedAlternateOption',
    templateUrl: './medalternateoption.html',
    styleUrls: ['./medalternateoption.css'],
    encapsulation: ViewEncapsulation.None
})
export class MedAlternateOption extends UserControl implements OnInit, AfterViewInit {
    public objResMedAlternateOption = Resource.ResMedAlternateOption;
    public Styles = ControlStyles;
    public objAlternateItem: AlternateItem;
    public objSecTab: MedSecondaryTabChild;
    public DynamicgridHeight: number;
    objVM: IPPMABaseVM;
    objDrugItemInputData: DrugItemInputData;
    isLoaded: boolean = false;
    AlternateOptions: MedicationOptionVM = new MedicationOptionVM();
    public LayoutRoot: Grid;
    @ViewChild("LayoutRootTempRef", { read: Grid, static: false }) set _LayoutRoot(c: Grid) {
        if (c) { this.LayoutRoot = c; }
    };
    chkInclNonFor: iCheckBox;
    @ViewChild("chkInclNonForTempRef", { read: iCheckBox, static: false }) set _chkInclNonFor(c: iCheckBox) {
        if (c) { this.chkInclNonFor = c; }
    };
    public grdAlternates: GridExtension = new GridExtension();
    @ViewChild('grdAlternatesTempRef', { read: GridComponent, static: false }) set _grdAlternates(c: GridComponent) {
        if (c) {
            this.grdAlternates.grid = c;
            this.grdAlternates.columns = c.columns;
        }
    };
    _contentLoaded: Boolean;
    @ViewChild("_contentLoadedTempRef", { read: Boolean, static: false }) set __contentLoaded(c: Boolean) {
        if (c) { this._contentLoaded = c; }
    };
    // newly added
    
    private _dataTemplates :QueryList<DataTemplate>;
    get dataTemplates()
    {
      return this._dataTemplates;
    }
     @ViewChildren(DataTemplate)  set dataTemplates( val: QueryList<DataTemplate>)
     {
        if (val)
        {
         this._dataTemplates = val;
         this.grdAlternates.dataTemplates = val;
        }
    }
    grdData: GridExtension = new GridExtension();

    calcHeight = 100;
    @ViewChild("divGrid", { static: false }) divGrid: ElementRef;

    constructor() {
        super();
    }
    MouseLeftButtonDown_FuncNew($event, rowIndex, columnIndex) {
        columnIndex = this.grdAlternates.GetColumnIndexForCellClick(columnIndex);
        let args: GridViewCellClickEventArgs = { ColumnIndex: columnIndex, RowIndex: rowIndex, ColumnCell: undefined };
        this.grdAlternates.onCellClick($event, args);
    }
    ngOnInit(): void {
        this.grdAlternates.onCellClick = (s, e) => { this.grdAlternates_onCellClick(s, e); };
        this.grdAlternates.GridSelectionChange = (s, e) => { this.grdAlternates_SelectionChanged(s, e) };
        this.grdAlternates.RowIndicatorVisibility = Visibility.Visible;
    }
    ngAfterViewInit(): void {

        setTimeout(() => {
            if(window.screen.height < 1000 && window.devicePixelRatio != 1.25){
                this.calcHeight = window.innerHeight - 210;
              }
              else{
                this.calcHeight = this.divGrid.nativeElement.clientHeight;    

              }        }, 0);

        this.grdAlternates.GenerateColumns();
        this.MedAlternateOption_Loaded(null, null);
       }
    
    MedAlternateOption_Loaded(sender: Object, e: RoutedEventArgs): void {
        this.isLoaded = false;
        if (this.DataContext != null) {
            this.objVM = ObjectHelper.CreateType<IPPMABaseVM>(this.DataContext, IPPMABaseVM);
            this.DynamicgridHeight = this.objVM.DialogHeight - 190;
            if ( this.objVM.AlternateOptions == null) {
                this.objVM.AlternateOptions = new MedicationOptionVM(this.objVM);                
            }
            this.objVM.AlternateOptions.AlternateoptionChangedEvent = (s,e) => { this.AlternateoptionItem_AlternateoptionChangedEvent()};
            console.log('this.objVM ===>', this.objVM);
            if (this.objVM != null) {
                this.grdAlternates.RowIndicatorVisibility = Visibility.Visible;
                console.log('this.objVM.IsFormularyCheckedAlternativeOption===>', this.objVM.IsFormularyCheckedAlternativeOption);
                this.objVM.IsFormularyCheckedAlternativeOption = this.objVM.IsFormularyCheckedAlternativeOption;
                this.objVM.PrescribingOptionsIsEnabled = true;
                if (this.DataContext.AlternateOptions != null && this.DataContext.AlternateOptions.ARelateList != null) {
                    ObjectHelper.CreateObject(this.AlternateOptions.ARelateList, this.objVM.AlternateOptions.ARelateList);
                    this.grdAlternates.SetBinding('data', this.DataContext.AlternateOptions.ARelateList);
                }

            }
            //   Common.SetColorConfigCSS(); moved to line no 111
        }
        // added reference to med related 19-06
        this.isLoaded = true;
        Common.SetColorConfigCSS();
        // till here
    }
    AlternateoptionItem_AlternateoptionChangedEvent(): void {
        if (this.objVM != null && this.objVM.AlternateOptions != null && this.objVM.AlternateOptions.ARelateList != null && this.objVM.AlternateOptions.ARelateList.Count > 0) {           
            this.grdAlternates.SetBinding('data',this.objVM.AlternateOptions.ARelateList);
            this.grdAlternates.Rebind();           
        }
        else 
        this.grdAlternates.ItemsSource.Clear();
        //this.grdAlternates.ItemsSource = null; 
        if(this.grdAlternates.selectedRowsIndex.length==0){
            this.objVM.LinksIsEnabled = false;
            this.objVM.PackOptionsIsEnabled = false;
        }       
    }
    rowLoaded(context: any) {
     
        let rowEventArgs = this.grdAlternates.GetRowEventArgs(
            this.dataTemplates,
            context
        );
        this.grdAlternates_RowLoaded({}, rowEventArgs);
        if(rowEventArgs.index == this.grdAlternates.ItemsSource?.Count-1){
        this.grdAlternates.ClearDataTemplateCells();
        }
    }
    checkboxClicked(e: any )
    {
        this.grdAlternates.selectedRowsIndex =[];
    }
    grdAlternates_RowLoaded(sender: Object, e: RowLoadedEventArgs): void {
        this.grdAlternates.selectedRowsIndex =[];
        this.grdAlternates.SelectedItem = null;
        if (e.Row != null && e.Row.Item != null) {
            e.Row.IsSelected = false;
            if (!String.IsNullOrEmpty(Common.sFormStyle) || !String.IsNullOrEmpty(Common.sNonFormStyle)) {
                //let sStackPanel: StackPanel = (<StackPanel>e.Row.Cells[1].Content);
                let sStackPanel: StackPanel = (<StackPanel>e.Row.Cells[1].dataTemplates.stkpnl);
                if (sStackPanel.Children[0] != null) {
                    let sLabel: iLabel = <iLabel>sStackPanel.Children[0];
                    let sImage: Image = <Image>sStackPanel.Children[1];
                    let oItemVM: AlternateItem = ObjectHelper.CreateType<AlternateItem>(e.Row.Item, AlternateItem);
                    if (oItemVM instanceof AlternateItem) {
                        let sMCIToolTip: string = "";
                        if (!String.IsNullOrEmpty(oItemVM.ItemsubType) && String.Equals(oItemVM.ItemsubType, DrugItemSubTypeCode.MULTI_COMPONENT)) {
                            if (!String.IsNullOrEmpty(oItemVM.mcitemdisplay))
                                sMCIToolTip = Common.GetMCIToolTip(oItemVM.mcitemdisplay);
                            sImage.Visibility = Visibility.Visible;
                            ToolTipService.SetToolTip(sImage, sMCIToolTip);
                        }
                        if (Convert.ToInt64(oItemVM.IsFormulary) > 0) {
                            this.SetStyle(Common.sFormStyle, sLabel);
                        }
                        else {
                            this.SetStyle(Common.sNonFormStyle, sLabel);
                        }
                    }
                }
            }
        }
    }
    private SetStyle(sData: string, sLabel: iLabel): void {
        let data: string[];
        if (sData != null) {
            data = sData.Split('~');
            sLabel.Foreground = new SolidColorBrush(Common.hexToColor(data[0]));
            if (String.Compare(data[3].ToString(), "bold") == 0)
                sLabel.FontWeight = FontWeights.Bold;
            else sLabel.FontWeight = FontWeights.Normal;
            if (String.Compare(data[2].ToString(), "italic") == 0)
                sLabel.FontStyle = FontStyles.Italic;
            else sLabel.FontStyle = FontStyles.Normal;
            if (String.Compare(data[1].ToString(), "uppercase") == 0)
                sLabel.Text = sLabel.Text.ToUpper();
            else if (String.Compare(data[1].ToString(), "lowercase") == 0)
                sLabel.Text = sLabel.Text.ToLower();
        }
    }
    grdAlternates_SelectionChanged(sender: Object, e: SelectionChangeEventArgs): void {
        if (this.objVM != null) {
            if (this.grdAlternates.SelectedItem != null) {
                this.objVM.LinksIsEnabled = true;
                this.objAlternateItem = ObjectHelper.CreateType<AlternateItem>(this.grdAlternates.GetCurrentRowData(), AlternateItem);
                if (this.isLoaded) {
                    if ((String.Compare(this.objAlternateItem.IdentifyingType, CConstants.ACTUALPRODUCT, StringComparison.InvariantCultureIgnoreCase) == 0) || (String.Compare(this.objAlternateItem.IdentifyingType, CConstants.VIRTUALPRODUCT, StringComparison.InvariantCultureIgnoreCase) == 0)) {
                        this.objVM.PackOptionsIsEnabled = true;
                    }
                    else {
                        this.objVM.PackOptionsIsEnabled = false;
                    }
                }
                else this.isLoaded = true;
            }
            else {
                this.objVM.LinksIsEnabled = false;
                this.objVM.PackOptionsIsEnabled = false;
            }
        }
    }
    grdAlternates_onCellClick(sender: Object, args: GridViewCellClickEventArgs): void {
        console.log('GridViewCellClick,this.grdAlternates.GetColumnIndexByName("PrescriptionItem")', this.grdAlternates.GetColumnIndexByName("PrescriptionItem"))
        console.log('args.ColumnIndex', args.ColumnIndex)
        if (this.grdAlternates.GetColumnIndexByName("PrescriptionItem") == args.ColumnIndex) {
            iBusyIndicator.Start("FormViewer", true);
            CommonVariables.FormViewerIsInProgress = true;
            this.objAlternateItem = ObjectHelper.CreateType<AlternateItem>(this.grdAlternates.GetRowData(args.RowIndex), AlternateItem);
            this.objDrugItemInputData = new DrugItemInputData();
            this.objDrugItemInputData.IdentifyingName = this.objAlternateItem.IdentifyingName;
            this.objDrugItemInputData.IdentifyingOID = Convert.ToInt64(this.objAlternateItem.IdentifyingOID);
            this.objDrugItemInputData.IdentifyingType = this.objAlternateItem.IdentifyingType;
            this.objDrugItemInputData.MCVersionNo = AppSessionInfo.AMCV;
            this.objDrugItemInputData.IsFormulary = (this.objAlternateItem.IsFormulary == "0") ? false : true;
            this.objDrugItemInputData.FavouritesDetailOID = 0;
            this.objDrugItemInputData.IsAccessContraint = this.objAlternateItem.IsAccessConstraint;
            this.objDrugItemInputData.IsPrescribeByBrand = this.objAlternateItem.IsByBrand;
            this.objDrugItemInputData.ItemType = this.objAlternateItem.ItemType;
            this.objDrugItemInputData.LorenzoID = this.objAlternateItem.LorenzoID;
            this.objDrugItemInputData.FormularyNote = this.objAlternateItem.FormularyNotes;
            this.objDrugItemInputData.ITMSUBTYP = this.objAlternateItem.ItemsubType;
            this.objDrugItemInputData.MCIItemDisplay = this.objAlternateItem.mcitemdisplay;
            this.objDrugItemInputData.IsIndicationRequired = this.objAlternateItem.IsIndicationRequired;
            this.objDrugItemInputData.SourceDataProviderType = this.objAlternateItem.SourceDataProviderType;
            this.objDrugItemInputData.IsAuthorise = this.objAlternateItem.IsAuthorise;
            if (this.objDrugItemInputData != null && (String.Equals(this.objDrugItemInputData.IsAccessContraint, "1", StringComparison.CurrentCultureIgnoreCase) || String.Equals(this.objDrugItemInputData.IsIndicationRequired, "1", StringComparison.CurrentCultureIgnoreCase))) {
                this.objVM.oIndicationdtl = new Indicationdtl();
                this.objVM.oIndicationdtl.IsAccessConstriant = this.objDrugItemInputData.IsAccessContraint;
                this.objVM.oIndicationdtl.IsIndicationRequired = this.objDrugItemInputData.IsIndicationRequired;
                this.objVM.oIndicationdtl.IsPrescribeByBrand = this.objDrugItemInputData.IsPrescribeByBrand;
                this.objVM.oIndicationdtl.ItemType = this.objDrugItemInputData.ItemType;
                this.objVM.oIndicationdtl.IsFormulary = this.objDrugItemInputData.IsFormulary;
                this.objVM.oIndicationdtl.LorenzoID = this.objDrugItemInputData.LorenzoID;
                this.objVM.oIndicationdtl.ITMSUBTYP = this.objDrugItemInputData.ITMSUBTYP;
                this.objVM.oIndicationdtl.SourceDataProviderType = this.objDrugItemInputData.SourceDataProviderType;
                this.objVM.PrescribeNewItemEvent = (s, e) => { this.objVM_PrescribeNewItemEvent(s); };
                this.objVM.LaunchAccessConstraint(this.objDrugItemInputData.IdentifyingOID.ToString(), this.objDrugItemInputData.IdentifyingType, this.objDrugItemInputData.IdentifyingName, this.objDrugItemInputData.FormularyNote, null, null, null, this.objVM.oIndicationdtl, this.objDrugItemInputData.IsAuthorise);
            }
            else {
                this.objVM.PrescribeNewItemEvent = (s, e) => { this.objVM_PrescribeNewItemEvent(s); };
                this.objVM.PrescribeNewItem(this.objDrugItemInputData);
            }
        }
    }

    public dialog: MedSecondaryTabChild; // fixed using reference medPrescribedoption.ts
    public objVM_PrescribeNewItemEvent(IsChildWindowClosed: boolean): void {
        //(<MedSecondaryTabChild>(<Grid>(<iTab>(<iTabItem>this.Parent).Parent).Parent).Parent).appDialog.DialogResult = IsChildWindowClosed;
        // this.dialog.appDialog.DialogResult = IsChildWindowClosed;
        this.objVM.oSecChild.dupDialogRef.close();// used like this in medprescription
    }


    private DisposeFormEvents(): void {
        if (this.objVM != null) {
            //this.objVM.PrescribeNewItemEvent -= objVM_PrescribeNewItemEvent;
        }
    }
    MedAlternateOption_Unloaded(sender: Object, e: RoutedEventArgs): void {
        this.DisposeFormEvents();
    }
}
