import { AfterViewInit,Component,QueryList, ViewChild,ViewChildren } from "@angular/core";
import { PrescriptionItemVM } from "../viewmodel/PrescriptionItemVM";
import { DataTemplate, FontStyles, FontWeights, Grid, iCheckBox, iLabel, SolidColorBrush } from "epma-platform/controls";
import { FormViewerVM } from "../viewmodel/formviewervm";
import { ObjectHelper } from "epma-platform/helper";
import { RelatedOptions } from "../model/common";
import { Common } from "../utilities/common";
import { GridViewCellClickEventArgs, RoutedEventArgs } from "src/app/shared/epma-platform/controls/Control";
import { PresItemDRCVM } from "../viewmodel/PresItemDRCVM";
import { AppDialogEventargs, AppDialogResult, CListItem,  ObservableCollection, Visibility,  StringComparison } from "epma-platform/models";
import { BasicDetailsVM } from "../viewmodel/BasicDetailsVM";
import { ClerkFormViewDeftBehaviour, PatientContext } from "src/app/lorappcommonbb/utilities/globalvariable";
import { CConstants, PrescriptionTypes } from "../utilities/constants";
import { DrugProperty } from "src/app/shared/epma-platform/soap-client/ManagePrescriptionWS";
import { FormViewerDefaultsVM } from "../viewmodel/formviewerdefaultsvm";
import { Convert } from "epma-platform/services";
import { GridExtension, RowLoadedEventArgs } from "src/app/shared/epma-platform/controls/epma-grid-helpers/grid-extension";
import { MedBrandConstraintsVM } from "../viewmodel/medbrandconstraintsvm";
import { IPPMABaseVM } from "../viewmodel/ippmabasevm";
import { Resource } from "../resource";
import { GridComponent } from "@progress/kendo-angular-grid";
import { iAppDialogWindow } from "src/app/shared/epma-platform/controls/iAppDialogWindow";
import { WrapToolTip } from "src/app/product/shared/convertor/medicationconverters.service";
import { StackPanel } from 'src/app/shared/epma-platform/controls/epma-stackpanel/epma-stackpanel.component';
@Component({
    selector: 'medbrandconstraintschild',
    templateUrl: './medbrandconstraintschild.html',
    styleUrls: ['./medbrandconstraintschild.css'],
  })


    export class medbrandconstraintschild extends iAppDialogWindow {
        objResMedBrandConstraints=Resource.ResMedBrandConstraints;
        objResMedAlternateOption = Resource.ResMedAlternateOption;
        NoteToolTip:WrapToolTip
        oMedBrandConst: MedBrandConstraintsVM;
        oRelatedOptions: RelatedOptions;
        public objPresItemVM: PrescriptionItemVM;
        oIppmabasevm: IPPMABaseVM;

        private MainLayoutRoot: Grid;
@ViewChild("MainLayoutRootTempRef", {read:Grid, static: false }) set _MainLayoutRoot(c: Grid){
 if(c){ this.MainLayoutRoot = c; }
};
private lblCaptionName: iLabel;
@ViewChild("lblCaptionNameTempRef", {read:iLabel, static: false }) set _lblCaptionName(c: iLabel){
 if(c){ this.lblCaptionName = c; }
};
private grdMedicationItems: Grid;
@ViewChild("grdMedicationItemsTempRef", {read:Grid, static: false }) set _grdMedicationItems(c: Grid){
 if(c){ this.grdMedicationItems = c; }
};
private lblIndications: iLabel;
@ViewChild("lblIndicationsTempRef", {read:iLabel, static: false }) set _lblIndications(c: iLabel){
 if(c){ this.lblIndications = c; }
};
private chkInclNonFor: iCheckBox;
@ViewChild("chkInclNonForTempRef", {read:iCheckBox, static: false }) set _chkInclNonFor(c: iCheckBox){
 if(c){ this.chkInclNonFor = c; }
};
    
    private _dataTemplates: QueryList<DataTemplate>;
    get dataTemplates() {
        return this._dataTemplates;
    }
    @ViewChildren(DataTemplate) set dataTemplates(val: QueryList<DataTemplate>) {
        if (val) {
            this._dataTemplates = val;
            this.grdItems.dataTemplates = val;
        }
    }

grdItems : GridExtension = new GridExtension();
  @ViewChild('grdItemsTempRef', { read: GridComponent, static: false }) set _grdItems(
    c: GridComponent
  ) {
    if (c) {
      this.grdItems.grid = c;
      this.grdItems.columns = c.columns;
   
    }
  }


    private _contentLoaded: Boolean;
    @ViewChild("_contentLoadedTempRef", { read: Boolean, static: false }) set __contentLoaded(c: Boolean) {
        if (c) { this._contentLoaded = c; }
    };
    constructor() {
        super();
        //  this.oIppmabasevm = ovm;
    }
    public constructorIMPL(ovm: IPPMABaseVM) {
        this.oIppmabasevm = ovm;
    }
    MouseLeftButtonDown_FuncNew($event, rowIndex, columnIndex) {
        if ($event.button === 0) {
            //sender: Object, args: GridViewCellClickEventArgs
            columnIndex = this.grdItems.GetColumnIndexForCellClick(columnIndex);
            let args:GridViewCellClickEventArgs= {ColumnIndex:columnIndex,RowIndex:rowIndex,ColumnCell:undefined};
            this.grdItems.onCellClick($event,args);
            }
          }

        ngOnInit(): void {
            this.grdItems.RowIndicatorVisibility = Visibility.Visible;
            this.grdItems.onCellClick = (s, e) => { this.grdItems_onCellClick(s, e); };
          //  this.grdPrescribe.onCellClick = (s, e) => { this.grdPrescribe_onCellClick(s, e); };
        }
    ngAfterViewInit(): void {
        this.grdItems.GenerateColumns();
        this.MedBrandConstrainsts_loaded(null, null);
        this.chkInclNonFor.style['border'] = '1px dotted';
        this.chkInclNonFor.Focus();
    }
        private MedBrandConstrainsts_loaded(sender: Object, e: RoutedEventArgs): void {
            this.oMedBrandConst = ObjectHelper.CreateType<MedBrandConstraintsVM>(this.DataContext, MedBrandConstraintsVM);
            this.grdItems.RowIndicatorVisibility = Visibility.Visible;
        this.oMedBrandConst.MedBrandConstraintChildChangedEvent = (s,e) => { this.BrandConstraintChildItem_BrandConstraintChildChangedEvent()};
            if (this.oMedBrandConst.IsForSelectProduct) {
                this.lblCaptionName.Text = Resource.ResMedBrandConstraints.lblSelProductText;
                this.oMedBrandConst.GetSelectProduct();
            }
            else if ((!String.IsNullOrEmpty(this.oMedBrandConst.ItemsubType) && (String.Compare(this.oMedBrandConst.ItemsubType, CConstants.SUBTYPE, StringComparison.InvariantCultureIgnoreCase) == 0))) {
                if (this.oMedBrandConst.IsBrand) {
                    this.oMedBrandConst.GetBrandOptions(false);
                }
                else {
                    this.lblCaptionName.Text = Resource.ResMedBrandConstraints.lblProductCaption;
                    this.oMedBrandConst.GetSelectProduct();
                }
            }
            else {
                this.oMedBrandConst.GetBrandOptions(true);
            }
            Common.SetColorConfigCSS();
            this.grdItems.SetBinding('data',this.oMedBrandConst.BrandItems);
           // this.grdItems.SetBinding(GridExtension.ItemsSourceProperty, ObjectHelper.CreateObject(new Binding("BrandItems"), { Mode: BindingMode.TwoWay }));
        }
    BrandConstraintChildItem_BrandConstraintChildChangedEvent():void{
        if (this.oMedBrandConst != null && this.oMedBrandConst.BrandItems != null && this.oMedBrandConst.BrandItems.Count > 0) {           
            this.grdItems.SetBinding('data',this.oMedBrandConst.BrandItems);
            this.grdItems.Rebind();           
        }
        else 
       {
        this.grdItems.ItemsSource.Clear();      
       }
    }
        private grdItems_onCellClick(sender: Object, args: GridViewCellClickEventArgs): void {
            if (this.grdItems.GetColumnIndexByName("IdentifyingName") == args.ColumnIndex && args.MouseEvents.originalEvent.button === 0) {
                this.oRelatedOptions = ObjectHelper.CreateType<RelatedOptions>(this.grdItems.GetRowData(args.RowIndex), RelatedOptions);
                this.objPresItemVM = new PrescriptionItemVM(this.oIppmabasevm);
                this.objPresItemVM.FormViewerDetails = new FormViewerVM();
                this.objPresItemVM.FormViewerDetails.PresItemDRCVM = new PresItemDRCVM();
                this.objPresItemVM.FormViewerDetails.BasicDetails = new BasicDetailsVM(this.objPresItemVM);
                this.objPresItemVM.FormViewerDetails.BasicDetails.IdentifyingOID = this.oRelatedOptions.IdentifyingOID;
                this.objPresItemVM.FormViewerDetails.BasicDetails.IdentifyingName = this.oRelatedOptions.IdentifyingName;
                this.objPresItemVM.FormViewerDetails.BasicDetails.IdentifyingType = this.oRelatedOptions.IdentifyingType;
                this.objPresItemVM.FormViewerDetails.BasicDetails.DosageForm = new CListItem();
                this.objPresItemVM.FormViewerDetails.BasicDetails.DosageForm.DisplayText = this.oRelatedOptions.DosageForm;
                this.objPresItemVM.FormViewerDetails.BasicDetails.DosageForm.Value = this.oRelatedOptions.DosageFormID?.ToString();
                this.objPresItemVM.FormViewerDetails.BasicDetails.Strength = new CListItem();
                this.objPresItemVM.FormViewerDetails.BasicDetails.Strength.DisplayText = this.oRelatedOptions.Strength;
                this.objPresItemVM.FormViewerDetails.BasicDetails.Strength.Value = this.oRelatedOptions.Strength;
                this.objPresItemVM.FormViewerDetails.BasicDetails.IsFormulary = this.oRelatedOptions.IsFormulary;
                this.objPresItemVM.FormularyNote = this.oRelatedOptions.FormularyNote;
                this.objPresItemVM.LorenzoID = this.oRelatedOptions.LorenzoID;
                this.objPresItemVM.FormViewerDetails.BasicDetails.MCVersion = this.oRelatedOptions.MCVersion;
                this.objPresItemVM.FormViewerDetails.BasicDetails.MCIUoms = this.oRelatedOptions.MCQuantityUomcol;
                this.objPresItemVM.FormViewerDetails.BasicDetails.PrescibableItemOID = this.oRelatedOptions.PrescribableitemlistOID;
                this.objPresItemVM.FormViewerDetails.BasicDetails.IsCondDoseMonitoringPeriodReq = this.oRelatedOptions.IsMonPeriodMand;
                this.objPresItemVM.FormViewerDetails.BasicDetails.IsInfusionFluid = this.oRelatedOptions.IsInfusionFluid;
                if (String.Equals(PatientContext.PrescriptionType, PrescriptionTypes.ForAdministration) && PatientContext.ClerkFormViewDefaultBehavior != ClerkFormViewDeftBehaviour.LaunchFormMandatory) {
                    this.objPresItemVM.FormViewerDetails.BasicDetails.IsAuthorise = this.oRelatedOptions.IsAuthorise;
                }
                if (this.oRelatedOptions.DrugProperties != null && this.oRelatedOptions.DrugProperties.Count > 0) {
                    this.objPresItemVM.FormViewerDetails.BasicDetails.DrugProperties = new ObservableCollection<DrugProperty>();
                    this.oRelatedOptions.DrugProperties.forEach( (oDrugProperty)=> {
                        this.objPresItemVM.FormViewerDetails.BasicDetails.DrugProperties.Add(ObjectHelper.CreateObject(new DrugProperty(), {
                            DrugName: oDrugProperty.DrugName,
                            DrugPropertyCode: oDrugProperty.DrugPropertyCode,
                            HighRiskMsg: oDrugProperty.HighRiskMsg,
                            IdentifyingOID: oDrugProperty.IdentifyingOID,
                            IdentifyingType: oDrugProperty.IdentifyingType,
                            OccuranceCode: oDrugProperty.OccuranceCode,
                            VMChildCode: oDrugProperty.VMChildCode
                        }));
                    });
                }
                this.objPresItemVM.FormViewerDetails.BasicDetails.IsAllowMultiRoute = (String.Equals(this.oRelatedOptions.IsAllowMultipleRoute, "1")) ? true : false;
                this.objPresItemVM.FormViewerDetails.BasicDetails.IsIgnoreAdminMethod = this.oRelatedOptions.IsIgnoreEPresRuleAdminMethod;
                if (this.oRelatedOptions.Routes != null && this.oRelatedOptions.Routes.Count > 0) {
                    if (this.objPresItemVM.FormViewerDetails.BasicDetails.DefaultDetails == null)
                        this.objPresItemVM.FormViewerDetails.BasicDetails.DefaultDetails = new FormViewerDefaultsVM();
                    this.objPresItemVM.FormViewerDetails.BasicDetails.DefaultDetails.Routes = new ObservableCollection<CListItem>();
                    this.oRelatedOptions.Routes.forEach( (ItmRoute)=> {
                        this.objPresItemVM.FormViewerDetails.BasicDetails.DefaultDetails.Routes.Add(ObjectHelper.CreateObject(new CListItem(), {
                            Value: ItmRoute.RouteId.ToString(), DisplayText: ItmRoute.RouteName,
                            Tag: ItmRoute.bInfusion,
                            Level: (!String.IsNullOrEmpty(ItmRoute.IsStrengthReqd) ? Convert.ToInt32(ItmRoute.IsStrengthReqd) : 0)
                        }));
                    });
                }
                if (super.onDialogClose != null)
                    super.onDialogClose(ObjectHelper.CreateObject(new AppDialogEventargs(), { Content: this, Result: AppDialogResult.Ok, AppChildWindow: super.appDialog }));
            }
        } 
    checkboxClicked(e: any )
    {
        this.grdItems.selectedRowsIndex =[];
        if(this.DataContext.IsFormularyChecked){
            this.chkInclNonFor.style['border'] = '1px dotted';
        }else{
            this.chkInclNonFor.style['border'] = '';
        }      
    }
    rowLoaded(context: any) {
        //grdData removed from here
        let rowEventArgs = this.grdItems.GetRowEventArgs(
            this.dataTemplates,
            context
        );
        this.grdItems_RowLoaded({}, rowEventArgs);
    }

    private grdItems_RowLoaded(sender: Object, e: RowLoadedEventArgs): void {
        if (e.Row != null && e.Row.Item != null) {
            e.Row.IsSelected = false;
            if (!String.IsNullOrEmpty(Common.sFormStyle) || !String.IsNullOrEmpty(Common.sNonFormStyle)) {
                let sStackPanel: StackPanel = (<StackPanel>e.Row.Cells[0].dataTemplates.stkpnl);
                let sLabel: iLabel = <iLabel>sStackPanel.Children[0];
                let oItemVM: RelatedOptions = ObjectHelper.CreateType<RelatedOptions>(e.Row.Item, RelatedOptions);
                if (oItemVM instanceof RelatedOptions) {
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
    private SetStyle(sData: string, sLabel: iLabel): void {
        if (sData != null) {
            let data: string[] = sData.Split('~');
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
}
