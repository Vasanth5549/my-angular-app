import { AfterViewInit, Component, OnInit, QueryList, ViewChild, ViewChildren, ViewEncapsulation, ElementRef } from '@angular/core';
import { Convert, iBusyIndicator } from 'epma-platform/services';
//StringBuilder,ProfileFactoryType,ContextManager,AppActivity,
import { StringComparison, Visibility, Binding } from 'epma-platform/models';
//Level, ProfileContext, OnProfileResult, IProfileProp,Byte, Decimal, decimal, Double, Float, Int64, long, Long,AppDialogEventargs, AppDialogResult, DelegateArgs, DialogComponentArgs, WindowButtonType,
import { DataTemplate, FontStyles, FontWeights, SolidColorBrush, ToolTipService, UserControl, iCheckBox, iLabel, } from 'epma-platform/controls';
import 'epma-platform/stringextension';
import { BitmapImage, Uri, UriKind } from 'src/app/shared/epma-platform/controls/Control';
import { ObjectHelper } from 'epma-platform/helper';
import { RelateItem } from '../viewmodel/RelateItem';
import { MedSecondaryTabChild } from './medsecondarytabchild';
import { IPPMABaseVM, Indicationdtl } from '../viewmodel/ippmabasevm';
import { DrugItemInputData } from 'src/app/shared/epma-platform/soap-client/ManagePrescriptionWS';
import { Grid, GridExtension, RowLoadedEventArgs, SelectionChangeEventArgs,GridViewCellClickEventArgs } from 'src/app/shared/epma-platform/controls/epma-grid-helpers/grid-extension';
import { RoutedEventArgs } from 'src/app/shared/epma-platform/controls/FrameworkElement';
import { Common } from '../utilities/common';
import { CConstants, MedImage, MedImages } from '../utilities/constants';
import { AppSessionInfo } from 'src/app/lorappcommonbb/utilities/globalvariable';
import { GridComponent } from '@progress/kendo-angular-grid';
import { Resource } from '../resource';
import * as ControlStyles from "../../shared/epma-platform/controls/ControlStyles";
//import { StackPanel } from 'src/app/shared/epma-platform/controls-model/StackPanel';
import { StackPanel } from 'src/app/shared/epma-platform/controls/epma-stackpanel/epma-stackpanel.component';
import { Image } from 'epma-platform/controls';
import { DrugItemSubTypeCode } from 'src/app/lorappmedicationcommonbb/utilities/constants';
import { MedicationOptionVM } from '../viewmodel/medicationoptionvm';
import { CommonBB } from 'src/app/lorappcommonbb/utilities/common';
@Component({
    selector: 'MedRelatedOption',
    templateUrl: './medrelatedoption.html',
    styleUrls: ['./medrelatedoption.css'],
    encapsulation: ViewEncapsulation.None,
})

export class MedRelatedOption extends UserControl implements OnInit, AfterViewInit {
    public objResMedRelatedOption = Resource.ResMedRelatedOption;
    public objResMedAlternateOption = Resource.ResMedAlternateOption;
    public Styles = ControlStyles;
    public objRelateItem: RelateItem;
    public objSecTab: MedSecondaryTabChild;
    public DynamicHeight: number;

    calcHeight = 100;
    @ViewChild("divGrid", { static: false }) divGrid: ElementRef;

    objVM: IPPMABaseVM;
    objDrugItemInputData: DrugItemInputData;
    isLoaded: boolean = false;
    RelatedOptions: MedicationOptionVM = new MedicationOptionVM();

    public LayoutRoot: Grid;
    @ViewChild("LayoutRootTempRef", { read: Grid, static: false }) set _LayoutRoot(c: Grid) {
        if (c) { this.LayoutRoot = c; }
    };

    chkInclNonFor: iCheckBox;
    @ViewChild("chkInclNonForTempRef", { read: iCheckBox, static: false }) set _chkInclNonFor(c: iCheckBox) {
        if (c) { this.chkInclNonFor = c; }
    };

    public grdRelated: GridExtension = new GridExtension();
    @ViewChild('grdRelatedTempRef', { read: GridComponent, static: false }) set _grdRelated(
        c: GridComponent
    ) {
        if (c) {
            this.grdRelated.grid = c;
            this.grdRelated.columns = c.columns;
        }
    }
    _contentLoaded: Boolean;
    @ViewChild("_contentLoadedTempRef", { read: Boolean, static: false }) set __contentLoaded(c: Boolean) {
        if (c) { this._contentLoaded = c; }
    };
    
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
        this.grdRelated.dataTemplates = val;
       }
    }
    grdData: GridExtension = new GridExtension();

    constructor() {
        super();
    }
    MouseLeftButtonDown_FuncNew($event, rowIndex, columnIndex) {
        columnIndex = this.grdRelated.GetColumnIndexForCellClick(columnIndex);
        let args: GridViewCellClickEventArgs = { ColumnIndex: columnIndex, RowIndex: rowIndex, ColumnCell: undefined };
        this.grdRelated.onCellClick($event, args);
    }
    ngOnInit(): void {
        this.grdRelated.onCellClick = (s, e) => { this.grdRelated_onCellClick(s, e); };
        this.grdRelated.GridSelectionChange = (s, e) => { this.grdRelated_SelectionChanged(s, e) };
        this.grdRelated.RowIndicatorVisibility = Visibility.Visible;
    }
    ngAfterViewInit(): void {

        setTimeout(() => {
            if(window.screen.height < 1000 && window.devicePixelRatio != 1.25){
                this.calcHeight = window.innerHeight - 210;
              }
              else{
                this.calcHeight = this.divGrid.nativeElement.clientHeight;    

              }
        }, 0);

        this.grdRelated.GenerateColumns();
        this.MedRelatedOption_Loaded(null, null);
       
    }
    MedRelatedOption_Loaded(sender: Object, e: RoutedEventArgs): void {
        this.isLoaded = false;
        if (this.DataContext != null) {
            this.objVM = ObjectHelper.CreateType<IPPMABaseVM>(this.DataContext, IPPMABaseVM);
            this.DynamicHeight = this.objVM.DialogHeight - 190;
            if ( this.objVM.RelatedOptions == null) {
                this.objVM.RelatedOptions = new MedicationOptionVM(this.objVM);                
            }
            this.objVM.RelatedOptions.RelatedoptionChangedEvent = (s,e) => { this.RelatedoptionItem_RelatedoptionChangedEvent()};
            console.log('this.objVM ===>', this.objVM);
            if (this.objVM != null) {
                this.grdRelated.RowIndicatorVisibility = Visibility.Visible;
                if(this.objVM.oSecChild.R_Name != null){
                this.objVM.oSecChild.R_Name.Visibility = Visibility.Collapsed;
            }
                this.objVM.IsFormularyCheckedRelated = this.objVM.IsFormularyCheckedRelated;
                this.objVM.PrescribingOptionsIsEnabled = true;
                this.objVM.LinksIsEnabled = true;
                this.objVM.PackOptionsIsEnabled = false;
                if(this.DataContext.RelatedOptions!=null && this.DataContext.RelatedOptions.medRelateList !=null)
                {
                    ObjectHelper.CreateObject(this.RelatedOptions.MedRelateList,this.objVM.RelatedOptions.MedRelateList);
                    this.grdRelated.SetBinding('data',this.DataContext.RelatedOptions.MedRelateList);
                }
            }
        }
        this.isLoaded = true;
        Common.SetColorConfigCSS();
    }

    RelatedoptionItem_RelatedoptionChangedEvent(): void {
        if (this.objVM != null && this.objVM.RelatedOptions != null && this.objVM.RelatedOptions.MedRelateList != null && this.objVM.RelatedOptions.MedRelateList.Count > 0) {           
            this.grdRelated.SetBinding('data',this.objVM.RelatedOptions.MedRelateList);
            this.grdRelated.Rebind();           
        }
        else 
        //this.grdRelated.ItemsSource = null;  
        this.grdRelated.ItemsSource.Clear();      
    }

    public objMedSecondaryTabChild: MedSecondaryTabChild;
    grdRelated_SelectionChanged(sender: Object, e: SelectionChangeEventArgs): void {
        console.log(sender, e);// need to check if called properly
        if (this.objVM != null) {
            if (this.grdRelated.SelectedItem != null) {

                this.objRelateItem = ObjectHelper.CreateType<RelateItem>(this.grdRelated.GetCurrentRowData(), RelateItem);
                if (this.objMedSecondaryTabChild == null) {
                    this.objMedSecondaryTabChild = CommonBB.FindParent<MedSecondaryTabChild>(this);
                    this.objMedSecondaryTabChild = this.objSecTab;
                }
                if (this.grdRelated.GetSelectedRowCount() > 0 && !(String.IsNullOrEmpty(this.objRelateItem.PrescribingNote))) {
                    //   (<MedSecondaryTabChild>(<Grid>(<iTab>(<iTabItem>this.Parent).Parent).Parent).Parent).R_Name.Source = new BitmapImage(new Uri(MedImage.GetPath(MedImages.NoteIcon), UriKind.Relative));
                    //   (<MedSecondaryTabChild>(<Grid>(<iTab>(<iTabItem>this.Parent).Parent).Parent).Parent).R_Name.TextData = this.objRelateItem.PrescribingNote;
                    if(this.objMedSecondaryTabChild.R_Name)
                    {
                    this.objMedSecondaryTabChild.R_Name.Source = new BitmapImage(new Uri(MedImage.GetPath(MedImages.NoteIcon), UriKind.Relative));
                    this.objMedSecondaryTabChild.R_Name.Source =  "~/../" + this.objMedSecondaryTabChild.R_Name.Source;
                   // this.objMedSecondaryTabChild.R_Name.TextData = this.objRelateItem.PrescribingNote;
                   this.objMedSecondaryTabChild.R_Name.Visibility = Visibility.Visible;
                  
                        let sToolTip: string = String.Empty;
                        if (this.objRelateItem.PrescribingNote.length > 200) {
                            //  (<MedSecondaryTabChild>(<Grid>(<iTab>(<iTabItem>this.Parent).Parent).Parent).Parent).R_Name.ToolTip = sToolTip;
                            sToolTip = this.objRelateItem.PrescribingNote.Substring(0, 199) + "...";
                            this.objMedSecondaryTabChild.R_Name.ToolTip = sToolTip;
                        }
                        else {
                            //(<MedSecondaryTabChild>(<Grid>(<iTab>(<iTabItem>this.Parent).Parent).Parent).Parent).R_Name.ToolTip = this.objRelateItem.PrescribingNote;
                            this.objMedSecondaryTabChild.R_Name.ToolTip = this.objRelateItem.PrescribingNote;
                        }
                    }
                }
                else {
                    if(this.objMedSecondaryTabChild.R_Name != null)
                    {
                        this.objMedSecondaryTabChild.R_Name.Visibility = Visibility.Collapsed;
                        this.objMedSecondaryTabChild.R_Name.Source = null;
                        this.objMedSecondaryTabChild.R_Name.TextData = String.Empty;
                        this.objMedSecondaryTabChild.R_Name.ToolTip = String.Empty;
                        this.objMedSecondaryTabChild.R_Name=null;
                    }
                
                }
                if (this.isLoaded) {
                    if ((String.Compare(this.objRelateItem.IdentifyingType, CConstants.ACTUALPRODUCT, StringComparison.InvariantCultureIgnoreCase) == 0) || (String.Compare(this.objRelateItem.IdentifyingType, CConstants.VIRTUALPRODUCT, StringComparison.InvariantCultureIgnoreCase) == 0)) {
                        this.objVM.PackOptionsIsEnabled = true;
                    }
                    else {
                        this.objVM.PackOptionsIsEnabled = false;
                    }
                }
                else this.isLoaded = true;
            }
            else {
                this.objVM.PackOptionsIsEnabled = false;
            }
        }
    }
    grdRelated_onCellClick(sender: Object, args: GridViewCellClickEventArgs): void {
        if (this.grdRelated.GetColumnIndexByName("PrescriptionItem") == args.ColumnIndex) {
            iBusyIndicator.Start("PrescribeProductOption", true);
            this.objRelateItem = ObjectHelper.CreateType<RelateItem>(this.grdRelated.GetRowData(args.RowIndex), RelateItem);
            this.objDrugItemInputData = new DrugItemInputData();
            this.objDrugItemInputData.IdentifyingName = this.objRelateItem.IdentifyingName;
            this.objDrugItemInputData.IdentifyingOID = Convert.ToInt64(this.objRelateItem.IdentifyingOID);
            this.objDrugItemInputData.IdentifyingType = this.objRelateItem.IdentifyingType;
            this.objDrugItemInputData.MCVersionNo = AppSessionInfo.AMCV;
            let lnFormularyOID: any = 0;
            // Number.TryParse(this.objRelateItem.IsFormulary, lnFormularyOID);//initially this was used
            lnFormularyOID = BigInt(this.objRelateItem.IsFormulary);
            this.objDrugItemInputData.IsFormulary = lnFormularyOID > 0 ? true : false;
            this.objDrugItemInputData.FavouritesDetailOID = 0;
            this.objDrugItemInputData.IsAccessContraint = this.objRelateItem.IsAccessConstraint;
            this.objDrugItemInputData.IsPrescribeByBrand = this.objRelateItem.IsByBrand;
            this.objDrugItemInputData.FormularyNote = this.objRelateItem.FormularyNotes;
            this.objDrugItemInputData.ItemType = this.objRelateItem.ItemType;
            this.objDrugItemInputData.LorenzoID = this.objRelateItem.LorenzoID;
            this.objDrugItemInputData.ITMSUBTYP = this.objRelateItem.ItemSubType;
            this.objDrugItemInputData.IsIndicationRequired = this.objRelateItem.IsIndicationRequired;
            this.objDrugItemInputData.SourceDataProviderType = this.objRelateItem.SourceDataProviderType;
            this.objDrugItemInputData.IsAuthorise = this.objRelateItem.IsAuthorise;
            if (this.objDrugItemInputData != null && (String.Compare(this.objDrugItemInputData.IsAccessContraint, "1") == 0 || String.Compare(this.objDrugItemInputData.IsIndicationRequired, "1") == 0)) {
                this.objVM.oIndicationdtl = new Indicationdtl();
                this.objVM.oIndicationdtl.IsAccessConstriant = this.objDrugItemInputData.IsAccessContraint;
                this.objVM.oIndicationdtl.IsIndicationRequired = this.objDrugItemInputData.IsIndicationRequired;
                this.objVM.oIndicationdtl.IsPrescribeByBrand = this.objDrugItemInputData.IsPrescribeByBrand;
                this.objVM.oIndicationdtl.ItemType = this.objDrugItemInputData.ItemType;
                this.objVM.oIndicationdtl.IsFormulary = this.objDrugItemInputData.IsFormulary;
                this.objVM.oIndicationdtl.LorenzoID = this.objDrugItemInputData.LorenzoID;
                this.objVM.oIndicationdtl.ITMSUBTYP = this.objDrugItemInputData.ITMSUBTYP;
                this.objVM.oIndicationdtl.SourceDataProviderType = this.objDrugItemInputData.SourceDataProviderType;
                this.objVM.LaunchAccessConstraint(this.objDrugItemInputData.IdentifyingOID.ToString(), this.objDrugItemInputData.IdentifyingType, this.objDrugItemInputData.IdentifyingName, this.objDrugItemInputData.FormularyNote, null, null, (this.objSecTab != null ? this.objSecTab.appDialog : null), this.objVM.oIndicationdtl, this.objDrugItemInputData.IsAuthorise);
            }
            else {
                this.objVM.PrescribeNewItemEvent = (s, e) => { this.objMPVM_PrescribeNewItemEvent(s); };
                this.objVM.IsOtherClick = true;
                this.objVM.PrescribeNewItem(this.objDrugItemInputData);
            }
        }
    }
    public dialog: MedSecondaryTabChild;
    objMPVM_PrescribeNewItemEvent(IsChildWindowClosed: boolean): void {
      
        //this.dialog.appDialog.DialogResult = IsChildWindowClosed;
       // this.objVM.oSecChild.appDialog.DialogResult = IsChildWindowClosed;
        this.objVM.oSecChild.dupDialogRef.close();// referred medprescription
      
        
    }
    rowLoaded(context: any) {
        let rowEventArgs = this.grdData.GetRowEventArgs(
            this.dataTemplates,
            context
        );
        this.grdRelated_RowLoaded({}, rowEventArgs);
    }

    //To be revisited - For adding click event
    checkboxClicked(e: any )
    {
        this.grdRelated.selectedRowsIndex =[];
        if(this.grdRelated.selectedRowsIndex.length == 0)
        {            
            this.objVM.PackOptionsIsEnabled = false;            
        }
    }
    grdRelated_RowLoaded(sender: Object, e: RowLoadedEventArgs): void {
        this.grdRelated.selectedRowsIndex =[];        
        //this.grdRelated.SelectedItem = null;
        if (e.Row != null && e.Row.Item != null) {
            //  let sStackPanel: StackPanel = (<StackPanel>e.Row.Cells[1].Content);
            let sStackPanel: StackPanel = (<StackPanel>e.Row.Cells[1].dataTemplates.stkpnl);
            if (sStackPanel.Children[0] != null) { //changed from 1 to 0 because one ele added initially in stack panel
                let sLabel: iLabel = <iLabel>sStackPanel.Children[0];
                 let sImage: Image = <Image>sStackPanel.Children[1];
                let oItemVM: RelateItem = ObjectHelper.CreateType<RelateItem>(e.Row.Item, RelateItem);
                if (oItemVM instanceof RelateItem) {
                    let sMCIToolTip: string = "";
                    if (!String.IsNullOrEmpty(oItemVM.ItemSubType) && String.Equals(oItemVM.ItemSubType, DrugItemSubTypeCode.MULTI_COMPONENT)) {
                        if (!String.IsNullOrEmpty(oItemVM.MCItemdisplay))
                            sMCIToolTip = Common.GetMCIToolTip(oItemVM.MCItemdisplay);
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
    SetStyle(sData: string, sLabel: iLabel): void {
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

    public DisposeFormObjects(): void {
        this.objSecTab = null;
    }

    public DisposeFormEvents(): void {
        if (this.objVM != null) {
           
        }
    }

        MedRelatedOption_Unloaded(sender: Object, e: RoutedEventArgs): void {
            this.DisposeFormEvents();
            this.DisposeFormObjects();
        }
       
        
    }
