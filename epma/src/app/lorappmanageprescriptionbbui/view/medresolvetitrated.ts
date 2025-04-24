import { Component, Input, OnInit, ViewChild,AfterViewInit } from '@angular/core';
import { StringBuilder, ProfileFactoryType, ContextManager, Convert, AppActivity } from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp, Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison, AppDialogEventargs, AppDialogResult, DelegateArgs, DialogComponentArgs, WindowButtonType, ObservableCollection, CListItem, ContentControl, SelectionChangedEventArgs } from 'epma-platform/models';
import { PatientContext } from 'src/app/lorappcommonbb/utilities/globalvariable';
import { AppDialog, Border, DataTemplate, Grid, StackPanel, TextAlignment, TextWrapping, UserControl, iButton, iComboBox, iLabel, iTextBox } from 'epma-platform/controls';
import { HelperService } from 'epma-platform/soapclient';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
import { medFormViewer } from './medformviewer';
import { PrescriptionItemVM } from '../viewmodel/PrescriptionItemVM';
import { TitratedDoseVM, TitratedScheduleDetails } from '../viewmodel/TitratedDoseDetailsVM';
import { ActivityTypes } from '../model/common';
import { CConstants, MedImage, PrescriptionTypes } from '../utilities/constants';
import { Environment, Type } from 'src/app/product/shared/models/Common';
import { ColumnResizeWidths, ContentLength, GridExtension, GridViewCellEditEndedEventArgs, GridViewCellValidatingEventArgs, GridViewLength, GridViewLengthUnitType, iGridViewDataColumn } from 'src/app/shared/epma-platform/controls/epma-grid-helpers/grid-extension';
import { Resource } from '../resource';
import { Binding, BindingMode, FrameworkElement, RoutedEventArgs, Thickness } from 'src/app/shared/epma-platform/controls/FrameworkElement';
import { Visibility } from 'src/app/shared/epma-platform/controls-model/Visibility';
import { TitratedDoseCommonVM } from 'src/app/lorappmedicationcommonbb/viewmodel/TitratedDoseDetailsCommonVM';
import { GridComponent } from "@progress/kendo-angular-grid";
import { CommonBB } from 'src/app/lorappcommonbb/utilities/common';
import { VisualTreeHelper } from 'src/app/shared/epma-platform/models/eppma-common-types';
import { Dictionary } from 'epma-platform/dictionary';
import * as IPPMAManagePrescSer from '../../shared/epma-platform/soap-client/IPPMAManagePrescriptionWS';
import { VerticalAlignment } from 'src/app/shared/epma-platform/controls-model/VerticalAlignment';
import { Orientation } from 'src/app/shared/epma-platform/controls-model/Orientation';
import { HorizontalAlignment } from 'src/app/shared/epma-platform/controls-model/HorizontalAlignment';
import { ColumnDefinition, RowDefinition } from 'src/app/shared/epma-platform/controls/epma-grid/epma-grid.component';
// import { BindingMode } from 'src/app/shared/epma-platform/controls/Control';
import { UIElement } from 'src/app/shared/epma-platform/controls/UIElement';
import { MedTitratedDoseChild } from 'src/app/lorappmedicationcommonbb/view/medtitrateddosechild';
import * as ControlStyles from "../../shared/epma-platform/controls/ControlStyles";
var that;
import { DayOfWeek } from 'epma-platform/services';

@Component({
    selector: 'medresolvetitrated',
    templateUrl: './medresolvetitrated.html',
    styleUrls: ['./medresolvetitrated.css'],

  })
export class medresolvetitrated extends UserControl implements  OnInit,AfterViewInit {
    private LayoutRoot: Grid;
    @ViewChild("LayoutRootTempRef", { read: Grid, static: false }) set _LayoutRoot(c: Grid) {
        if (c) { this.LayoutRoot = c; }
    };
    public lblFrequency: iLabel;
    @ViewChild("lblFrequencyTempRef", { read: iLabel, static: false }) set _lblFrequency(c: iLabel) {
        if (c) { this.lblFrequency = c; }
    };
    public cboFrequency: iComboBox;
    @ViewChild("cboFrequencyTempRef", { read: iComboBox, static: false }) set _cboFrequency(c: iComboBox) {
        if (c) { this.cboFrequency = c; }
    };
    private lblTitratedDoseInstruction: iLabel;
    @ViewChild("lblTitratedDoseInstructionTempRef", { read: iLabel, static: false }) set _lblTitratedDoseInstruction(c: iLabel) {
        if (c) { this.lblTitratedDoseInstruction = c; }
    };
    public cboTitratedDoseInstruction: iComboBox;
    @ViewChild("cboTitratedDoseInstructionTempRef", { read: iComboBox, static: false }) set _cboTitratedDoseInstruction(c: iComboBox) {
        if (c) { this.cboTitratedDoseInstruction = c; }
    };
    private brdDaysOfWeek: Border;
    @ViewChild("brdDaysOfWeekTempRef", { read: Border, static: false }) set _brdDaysOfWeek(c: Border) {
        if (c) { this.brdDaysOfWeek = c; }
    };
    private brdDaysOfWeekBG: Border;
    @ViewChild("brdDaysOfWeekBGTempRef", { read: Border, static: false }) set _brdDaysOfWeekBG(c: Border) {
        if (c) { this.brdDaysOfWeekBG = c; }
    };
    private lblVariable: iLabel;
    @ViewChild("lblVariableTempRef", { read: iLabel, static: false }) set _lblVariable(c: iLabel) {
        if (c) { this.lblVariable = c; }
    };
    private txtTitratedDoseComments: iTextBox;
    @ViewChild("txtTitratedDoseCommentsTempRef", { read: iTextBox, static: false }) set _txtTitratedDoseComments(c: iTextBox) {
        if (c) { this.txtTitratedDoseComments = c; }
    };
    private btnReviewcopieddoses: iButton;
    @ViewChild("btnReviewcopieddosesTempRef", { read: iButton, static: false }) set _btnReviewcopieddoses(c: iButton) {
        if (c) { this.btnReviewcopieddoses = c; }
    };
    public ContentCtrlMedResloveTitrated: ContentControl = new ContentControl();
    // @ViewChild("ContentCtrlMedResloveTitratedTempRef", { read: ContentControl, static: false }) set _ContentCtrlMedResloveTitrated(c: ContentControl) {
    //     if (c) { this.ContentCtrlMedResloveTitrated = c; }
    // };
    private lblClerkedDoses: iLabel;
    @ViewChild("lblClerkedDosesTempRef", { read: iLabel, static: false }) set _lblClerkedDoses(c: iLabel) {
        this.lblClerkedDoses = c; 
    };
    grdTitratedDose : GridExtension = new GridExtension();
  @ViewChild('grdTitratedDoseTempRef', { read: GridComponent, static: false }) set _grdItems(
    c: GridComponent
  ) {
    if (c) {
      this.grdTitratedDose.grid = c;
      this.grdTitratedDose.columns = c.columns;
     
      //this.grdItems.ItemsSourceData = c.data;
    }
  }
    private cmdClear: iButton;
    @ViewChild("cmdClearTempRef", { read: iButton, static: false }) set _cmdClear(c: iButton) {
        if (c) { this.cmdClear = c; }
    };
    public dtDoseDate1: string;
    public FreqDetails: IPPMAManagePrescSer.CResMsgGetAdministrationTimes;
    public FreqOnChange: IPPMAManagePrescSer.IPPMAManagePrescriptionWSSoapClient;
    public omedFormViewer: medFormViewer;
    public objfrm: PrescriptionItemVM;
    oMedTitratedDoseChild: MedTitratedDoseChild;
    dDoseWidth: number = 0;
    dTimeColumnWidth: number = 77;
    static nNumberOfColumns: number = 7;
    dct: Dictionary<string, string>;
    public Styles = ControlStyles;
    public resKey = Resource.MedicationForm;
  
    //   @Input() name: string;
    @Input() MedResolveTitratedLoadedFunc: Function;
    override _DataContext: any;
    override get DataContext() {
        return this._DataContext;
    }
    public oPrescriptionItemVM: PrescriptionItemVM;
    @Input() override set DataContext(value: any) {
        console.log("Medipresolve.DataContextSetter ",this._DataContext,value);
        this._DataContext = value;
    }
    constructor() {
        super();
        that = this;
    }
    ngOnInit(): void {
        this.grdTitratedDose.isTabKeyPress = true;
        this.grdTitratedDose.EnableCellValidating = true;
        this.grdTitratedDose.EnableCellEditEnded = true;
        this.grdTitratedDose.EnableCellEditStarted = true;
        this.grdTitratedDose.onCellValidating = (s, e) => {
            this.grdTitratedDose_CellValidating(s, e); }
        this.grdTitratedDose.onCellEditEnded = (s, e) => { 
            this.grdTitratedDose_CellEditEnded(s, e); }
        this.grdTitratedDose.onCellEditStarted = (s, e) => {
            this.grdTitratedDose_CellEditStarted(s, e); }
        
        this.oPrescriptionItemVM = ObjectHelper.CreateType<PrescriptionItemVM>(this.DataContext, PrescriptionItemVM);
        this.objfrm = this.oPrescriptionItemVM;
        this.UserControl_Loaded(null,null);
    }

    
    ngAfterViewInit(): void {
        this.oPrescriptionItemVM = ObjectHelper.CreateType<PrescriptionItemVM>(this.DataContext, PrescriptionItemVM);
    
        this.dtDoseDate1 = DateTime.Today.ToShortDateString();
        this.objfrm = this.oPrescriptionItemVM;
        if (this.objfrm != null && this.objfrm.formViewerDetails != null && this.objfrm.formViewerDetails.BasicDetails != null && this.objfrm.formViewerDetails.BasicDetails.TitratedDoseDetails == null) {
            this.objfrm.formViewerDetails.BasicDetails.TitratedDoseDetails = new TitratedDoseVM();
            this.objfrm.formViewerDetails.BasicDetails.TitratedDoseDetails.GrdTitrated = new ObservableCollection<TitratedScheduleDetails>();
            this.objfrm.formViewerDetails.BasicDetails.TitratedDoseDetails.ReBindTitratedGRIDEvent = (s, e) => {    
                Object.keys(that).forEach((prop) => (this[prop] = that[prop]));
                this.RebindTitrated_GridEvent(); };
            this.objfrm.formViewerDetails.BasicDetails.TitratedDoseDetails.ReBindTitratedHeaderEvent = (s, e) => {
                Object.keys(that).forEach((prop) => (this[prop] = that[prop]));
                this.RebindTitrated_HeaderEvent(); };
        }
        if (this.objfrm != null && this.objfrm.ActionCode == ActivityTypes.Amend && this.objfrm.formViewerDetails != null && this.objfrm.formViewerDetails.BasicDetails != null && this.objfrm.formViewerDetails.BasicDetails.TitratedDoseDetails != null && !this.objfrm.formViewerDetails.BasicDetails.TitratedDoseDetails.IsLoaded) {
            this.objfrm.formViewerDetails.BasicDetails.TitratedDoseDetails.ReBindTitratedGRIDEvent = (s, e) => { 
                Object.keys(that).forEach((prop) => (this[prop] = that[prop]));
                this.RebindTitrated_GridEvent(); };
            this.objfrm.formViewerDetails.BasicDetails.TitratedDoseDetails.ReBindTitratedHeaderEvent = (s, e) => { 
                Object.keys(that).forEach((prop) => (this[prop] = that[prop]));
                this.RebindTitrated_HeaderEvent(); };
            this.objfrm.formViewerDetails.BasicDetails.TitratedDoseDetails.IsLoaded = true;
            this.objfrm.formViewerDetails.BasicDetails.TitratedDoseDetails.FillExistingTitratedSchDtl(this.objfrm.formViewerDetails.BasicDetails.TitratedDoseDetails.GrdTitrated);
        }
        this.DataContext = this.objfrm;
        if (this.objfrm.formViewerDetails.BasicDetails.Frequency != null) {
            this.objfrm.formViewerDetails.BasicDetails.TitratedDoseDetails.Frequencytext = this.objfrm.formViewerDetails.BasicDetails.Frequency.DisplayText;
        }
        else {
            this.objfrm.formViewerDetails.BasicDetails.TitratedDoseDetails.Frequencytext = String.Empty;
            this.objfrm.formViewerDetails.BasicDetails.TitratedDoseDetails.GrdTitrated = new ObservableCollection<TitratedScheduleDetails>();
        }
        if (this.objfrm != null && this.objfrm.ActionCode != ActivityTypes.Amend && this.objfrm.formViewerDetails.BasicDetails.StartDTTM != DateTime.MinValue && PatientContext.PrescriptionType != PrescriptionTypes.Clerking && !String.IsNullOrEmpty(this.objfrm.OperationMode)) {
            this.objfrm.formViewerDetails.BasicDetails.TitratedDoseDetails.Stardate = this.objfrm.formViewerDetails.BasicDetails.StartDTTM;
        }
        else if (this.objfrm.formViewerDetails.BasicDetails.TitratedDoseDetails.Stardate == DateTime.MinValue) {
            this.objfrm.formViewerDetails.BasicDetails.TitratedDoseDetails.Stardate = (PatientContext.PrescriptionType == PrescriptionTypes.Clerking) ? CommonBB.GetServerDateTime() : this.objfrm.formViewerDetails.BasicDetails.StartDTTM;
        }
        if (this.objfrm.formViewerDetails.BasicDetails.DoseUOM != null) {
            this.objfrm.formViewerDetails.BasicDetails.TitratedDoseDetails.DoseUOM = this.objfrm.formViewerDetails.BasicDetails.DoseUOM.DisplayText;
        }
        else {
            if(this.objfrm.formViewerDetails.BasicDetails.TitratedDoseDetails.GrdTitrated ){
                this.objfrm.formViewerDetails.BasicDetails.TitratedDoseDetails.GrdTitrated.ForEach(ReInsert => {
                    ReInsert.ScheduleDoseValue = new Array(CConstants.TitratedgridSize);
                });
            }
           
            this.objfrm.formViewerDetails.BasicDetails.TitratedDoseDetails.DoseUOM = String.Empty;
        }
        if (this.objfrm != null && this.objfrm.ActionCode == ActivityTypes.Amend && this.FreqDetails == null && this.objfrm.formViewerDetails.BasicDetails != null && (this.objfrm.formViewerDetails.BasicDetails.TitratedDoseDetails == null || (this.objfrm.formViewerDetails.BasicDetails.TitratedDoseDetails != null && this.objfrm.formViewerDetails.BasicDetails.TitratedDoseDetails.GrdTitrated == null) || (this.objfrm.formViewerDetails.BasicDetails.TitratedDoseDetails.GrdTitrated != null && this.objfrm.formViewerDetails.BasicDetails.TitratedDoseDetails.GrdTitrated.Count == 0))) {
            let lnFreqOID: number;
            if (this.cboFrequency.SelectedItem != null) {
                let objFreq: CListItem = ObjectHelper.CreateType<CListItem>(this.cboFrequency.SelectedItem, CListItem);
                if (Number.TryParse(objFreq.Value, (o) => {
                    lnFreqOID = o;
                  })) {
                    if (lnFreqOID > 0) {
                        this.objfrm.formViewerDetails.BasicDetails.TitratedDoseDetails.getAdministrationtimes(lnFreqOID);
                    }
                }
            }
            this.objfrm.formViewerDetails.BasicDetails.TitratedDoseDetails.IsTitClearEnabled = true;
        }
        else if (this.objfrm.formViewerDetails.BasicDetails.Frequency != null) {
            this.objfrm.formViewerDetails.BasicDetails.TitratedDoseDetails.LoadData(this.objfrm.formViewerDetails.BasicDetails.StartDTTM, this.objfrm.formViewerDetails.BasicDetails.TitratedDoseDetails.DoseUOM);
            this.objfrm.formViewerDetails.BasicDetails.TitratedDoseDetails.IsTitClearEnabled = true;
        }
        else {
            this.objfrm.formViewerDetails.BasicDetails.TitratedDoseDetails.IsTitClearEnabled = false;
        }
        if (this.objfrm.formViewerDetails.BasicDetails.TitratedDoseInstruction != null) {
            this.objfrm.formViewerDetails.BasicDetails.TitratedDoseInstructions = this.objfrm.formViewerDetails.BasicDetails.TitratedDoseInstruction.DisplayText;
        }
        this.objfrm.formViewerDetails.BasicDetails.TitratedDoseDetails.ActionCode = this.objfrm.ActionCode;
        this.dct = new Dictionary<string, string>();
        if (this.oPrescriptionItemVM != null && this.oPrescriptionItemVM.FormViewerDetails != null && this.oPrescriptionItemVM.FormViewerDetails.BasicDetails != null && this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.TitratedDoseDetails != null && this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.TitratedDoseDetails.GrdTitrated != null && this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.TitratedDoseDetails.GrdTitrated.Count > 0)
            this.oPrescriptionItemVM.FormViewerDetails.BasicDetails.TitratedDoseDetails.GrdTitrated.forEach((v) => {
                if (v.ScheduledDate != null && v.ScheduledDate.Length > 0) {
                    for (let i: number = 0; i < v.ScheduledDate.Length; i++) {
                        let key: string = v.ScheduledDate[i].ToString("dd-MM-yyyy") + v.ScheduleTime;
                        let value: string = v.ScheduleDoseValue[i];
                        if (!String.IsNullOrEmpty(key)) {
                            this.dct[key] = value;
                        }
                    }
                }
            });
        this.GenerateColumn();   
    
        // this.grdTitratedDose.GenerateColumns();
        this.dtDoseDate1 = DateTime.Today.ToShortDateString();
        let _tmpPrescripriptionType: string = String.Empty;
        let _tmpTitratedgrdcolumnName: string = CConstants.sTitratedgrdcolumnName;
        if (!String.IsNullOrEmpty(PatientContext.PrescriptionType)) {
            switch (PatientContext.PrescriptionType) {
                case PrescriptionTypes.Discharge:
                    _tmpPrescripriptionType = CConstants.DischargeDsplyTxt;
                    break;
                case PrescriptionTypes.Clerking:
                    _tmpPrescripriptionType = CConstants.clerkDsplyTxt;
                    _tmpTitratedgrdcolumnName = CConstants.sTitratedgrdcolumnNamefrClk;
                    break;
                case PrescriptionTypes.Leave:
                    _tmpPrescripriptionType = CConstants.leaveDsplyTxt;
                    break;
                case PrescriptionTypes.Outpatient:
                    _tmpPrescripriptionType = CConstants.OPDsplyTxt;
                    break;
            }
        }
        this.lblClerkedDoses.Text = String.Format(_tmpTitratedgrdcolumnName, _tmpPrescripriptionType);
       
        // this.UserControl_Loaded(null,null);
        setTimeout(() => {
            if (this.omedFormViewer != null) {
                this.omedFormViewer.AutoScrollView();
            }
        },0);
        if(this.btnReviewcopieddoses)
            this.btnReviewcopieddoses.Text = Resource.MedicationForm.lblTitratedReviewCopiesdoses;

        if(this.objfrm != null && this.objfrm.ActionCode == ActivityTypes.Amend)
        {
            this.objfrm.formViewerDetails.BasicDetails.IsMandatoryRSNFORMOD = false;
            this.objfrm.formViewerDetails.BasicDetails.IsenableRSNFORMOD = false;
            this.objfrm.FormViewerDetails.BasicDetails.IsenableModificationcomments = false;
        }
    }
   
    public RebindTitrated_GridEvent(): void {
        Object.keys(that).forEach((prop) => (this[prop] = that[prop]));
        this.RebindTitrated_HeaderEvent();
    }
    public RebindTitrated_HeaderEvent(): void {
        if (this.objfrm != null && this.objfrm.formViewerDetails != null && this.objfrm.formViewerDetails.BasicDetails != null && this.objfrm.formViewerDetails.BasicDetails.TitratedDoseDetails != null) {
            if (this.grdTitratedDose.dColumns != null && this.grdTitratedDose.dColumns.Count > 0) {
                this.grdTitratedDose.dColumns.Clear();
            }
            this.GenerateColumn();
            if (this.objfrm != null && this.objfrm.ActionCode == ActivityTypes.Amend) {
                this.objfrm.formViewerDetails.BasicDetails.TitratedDoseDetails.UpdateHeader(this.objfrm.formViewerDetails.BasicDetails, this.objfrm.formViewerDetails.BasicDetails.TitratedDoseDetails.Stardate);
            }
            else if (PatientContext.PrescriptionType != PrescriptionTypes.Clerking) {
                this.objfrm.formViewerDetails.BasicDetails.TitratedDoseDetails.UpdateHeader(this.objfrm.formViewerDetails.BasicDetails, this.objfrm.formViewerDetails.BasicDetails.StartDTTM);
            }
            if (this.objfrm.FormViewerDetails.BasicDetails.TitratedDoseDetails.Stardate == DateTime.MinValue && this.objfrm.FormViewerDetails.BasicDetails.StartDTTM != DateTime.MinValue) {
                this.objfrm.formViewerDetails.BasicDetails.TitratedDoseDetails.LoadData(this.objfrm.FormViewerDetails.BasicDetails.StartDTTM, this.objfrm.FormViewerDetails.BasicDetails.TitratedDoseDetails.DoseUOM);
            }
            this.SetNewColumnWidthOnUOMChange(this.objfrm.FormViewerDetails.BasicDetails.TitratedDoseDetails.GrdTitrated[0])
        }
    //    this.grdTitratedDose.Rebind();
    }
    private AddGridColumns(i: number, ScheduledDate: DateTime[]): number {
       
        let _GridColumnWidth: number = 116;
        let _GridHeaderWidth: number = 76;
        let celltemplate: DataTemplate;
        let edittemplate: DataTemplate;
        let grdData = this.objfrm.FormViewerDetails.BasicDetails.TitratedDoseDetails.GrdTitrated;
        if (i != 0) {
            celltemplate = new DataTemplate();
            let stackpanel = new StackPanel();
            let lblDose = new iLabel();
            lblDose.isAfterViewInitRequired = false;
            lblDose.Name = "lblDoseValue";
            let bindLbl = new Binding();
            bindLbl.Mode = BindingMode.TwoWay;
            bindLbl.Path = `ScheduleDoseValue[${i-1}]`;
            bindLbl.PathObject = undefined;
            lblDose.VerticalAlignment = VerticalAlignment.Center;
            lblDose.SetBinding(iLabel.TextProperty, bindLbl);
            if(grdData.Length>0){
            lblDose.Text = grdData[0];
            }
            stackpanel.Orientation = Orientation.Horizontal;
            let lblDoseUom = new iLabel();
            lblDoseUom.isAfterViewInitRequired = false;
            lblDoseUom.Name = "lblDoseUOM";
            lblDoseUom.HorizontalAlignment = HorizontalAlignment.Right;
            lblDoseUom.VerticalAlignment = VerticalAlignment.Center;
            lblDoseUom.Width = "auto";    
            // let bindLb2 = new Binding();
            // bindLb2.Mode = BindingMode.TwoWay;
            // bindLb2.Path = `ScheduleDoseUOM`;
            // bindLb2.PathObject = undefined;
            lblDoseUom.IsWordwrap = true;
            if(grdData.Length>0){
                lblDoseUom.Text = grdData[0].ScheduleDoseUOM;
            }
            // lblDose.SetBinding(iLabel.TextProperty, bindLb2);    
            // console.log("lblDose.BindingPath",lblDoseUom.Text);
            stackpanel.Children.Add(lblDose);
            stackpanel.Children.Add(lblDoseUom);
            celltemplate.Content = stackpanel;



            edittemplate = new DataTemplate();
            let grdEdit : Grid= new Grid();
            grdEdit.Name = "grdEdit";
            let RowDef : RowDefinition = new RowDefinition();
            RowDef.Height = 17;
            that = this;
            grdEdit.RowDefinitions.Add(RowDef);
            let ColDef1 : ColumnDefinition = new ColumnDefinition();
            let ColDef2 : ColumnDefinition = new ColumnDefinition();
            ColDef1.Width = "auto";
            ColDef2.Width = "auto";
            grdEdit.ColumnDefinitions.Add(ColDef1);
            grdEdit.ColumnDefinitions.Add(ColDef2);
            
            
            let textbox1 : iTextBox = new iTextBox();
            this.grdTitratedDose.isTabKeyPress = true;
            textbox1.Name = "txtDoseValue";             
            let bind=new Binding();
            bind.Mode = BindingMode.TwoWay;
            bind.PathObject = undefined;
            bind.Path = `ScheduleDoseValue[${i-1}]`;
            // if(this.objfrm.FormViewerDetails.BasicDetails.TitratedDoseDetails.GrdTitrated.Length>0)
            // textbox1.Text =this.objfrm.FormViewerDetails.BasicDetails.TitratedDoseDetails.GrdTitrated[i];
            textbox1.Minimum = 0;
            textbox1.VerticalAlignment= VerticalAlignment.Center;
            // textbox1.Width= "auto";
            textbox1.Type= "Numeric";
            textbox1.Nonnegative="True";
            textbox1.Scale= 7 ;
            textbox1.Precision= 3;
            textbox1.MaxLength= 11;
            textbox1.Height = "18";
            textbox1.MinWidth= "45";
            textbox1.Width= "43";            // textbox1.restrictEvent(this.objfrm.FormViewerDetails.BasicDetails.TitratedDoseDetails.GrdTitrated[0].ScheduleDoseValue[i-1]);
            textbox1.SetBinding(iTextBox.TextProperty, bind);
            //Revisit Required
            //Keydown event needs to be handled
            grdEdit.Children.Add(textbox1);
            grdEdit.SetGridRow(textbox1,1);
            grdEdit.SetGridColumn(textbox1,1);

            let lblDoseUOM1 = new iLabel();
            lblDoseUOM1.isAfterViewInitRequired = false;
            lblDoseUOM1.Name = "lblDoseUOM";
            // let bindUom = new Binding();
            // bindUom.Mode = BindingMode.TwoWay;
            // bindUom.Path = `ScheduleDoseUOM`;
            // bindUom.PathObject = undefined;
            // lblDoseUOM1.VerticalAlignment = VerticalAlignment.Center;
            // lblDoseUOM1.HorizontalAlignment = HorizontalAlignment.Right;
            // lblDoseUOM1.Width = "auto";
            lblDoseUOM1.TextAlignment = "Right";
            lblDoseUOM1.style['width']="100%";
            lblDoseUOM1.IsWordwrap = true;
            if(grdData.Length>0  ){
                lblDoseUOM1.Text = grdData[0].ScheduleDoseUOM;
            }  
            // lblDose.SetBinding(iLabel.TextProperty, bindUom);          
            grdEdit.Children.Add(lblDoseUOM1);
            grdEdit.SetGridRow(lblDoseUOM1,1);
            grdEdit.SetGridColumn(lblDoseUOM1,2);

            edittemplate.Content = grdEdit;
                        
            // celltemplate = @"<DataTemplate xmlns=""http://schemas.microsoft.com/winfx/2006/xaml/presentation"" xmlns:x=""http://schemas.microsoft.com/winfx/2006/xaml"" xmlns:iSOFT=""clr-namespace:assembly=LorArcBlueBirdInput"" xmlns:ConClass=""clr-namespace:assembly=LorAppManagePrescriptionBBUI_P2"">
            //     < StackPanel Orientation = "Horizontal" >
            //         <StackPanel.Resources>
            //         <ConClass:RemoveDoseUOM x: Key = ""RemoveDoseUOM"" />
            //             </StackPanel.Resources>
            //             < iSOFT:iLabel Name = ""lblDoseValue"" VerticalAlignment = ""Center"" Text = ""{Binding ScheduleDoseValue[" + (i - 1) + @"] } "" />
            //                 <iSOFT:iLabel Name = ""lblDoseUOM"" Grid.Row = ""0"" Grid.Column = ""1"" HorizontalAlignment = ""Right""   IsWordwrap = ""true""  VerticalAlignment = ""Center"" Text = ""{Binding ScheduleDoseUOM } "" > </iSOFT:iLabel>
            //                     < /StackPanel>
            //                     < /DataTemplate>";
            // edittemplate = @"<DataTemplate xmlns=""http://schemas.microsoft.com/winfx/2006/xaml/presentation"" xmlns:x=""http://schemas.microsoft.com/winfx/2006/xaml"" xmlns:iSOFT=""clr-namespace:assembly=LorArcBlueBirdInput"" xmlns:my1=""clr-namespace:assembly=LorAppManagePrescriptionBBUI_P2"" xmlns:interactivity=""clr-namespace:System.Windows.Interactivity;assembly=System.Windows.Interactivity"">
            //     < Grid x: Name = ""grdEdit"" >
            //         <Grid.RowDefinitions>
            //         <RowDefinition Height=""25"" />
            //             </Grid.RowDefinitions>
            //             < Grid.ColumnDefinitions >
            //             <ColumnDefinition />
            //             < ColumnDefinition />
            //             </Grid.ColumnDefinitions>
            //             < iSOFT:iTextBox Name = ""txtDoseValue"" Grid.Row = ""0"" Grid.Column = ""0"" Minimum = ""0"" VerticalAlignment = ""Center"" Text = ""{Binding ScheduleDoseValue[" + (i - 1) + @"],
            //                 Mode = TwoWay
            // } ""   Type = ""Numeric"" Scale = ""7"" Precision = ""3"" MaxLength = ""11""   Width = ""43"" >
            //     <interactivity: Interaction.Triggers >
            //         <interactivity:EventTrigger EventName = ""KeyDown"" >
            //             <my1: InvokeTextBoxEventMethods />
            //                 </interactivity:EventTrigger>
            //                 < /interactivity:Interaction.Triggers>
            //                 < /iSOFT:iTextBox>
            //                 < iSOFT:iLabel Name = ""lblDoseUOM"" Grid.Row = ""0"" Grid.Column = ""1"" HorizontalAlignment = ""Right""     IsWordwrap = ""true"" VerticalAlignment = ""Center"" Text = ""{Binding ScheduleDoseUOM } "" > </iSOFT:iLabel>
            //                     < /Grid>
            //                     < /DataTemplate>";
        }
        else {
            celltemplate = new DataTemplate();
            let stackpanel = new StackPanel();            
            let lblTime = new iLabel();
            lblTime.isAfterViewInitRequired = false;
            let bind=new Binding();
            bind.Mode = BindingMode.TwoWay;
            bind.Path = `ScheduleTime`;
            lblTime.Name = "lblTime";
            bind.PathObject = undefined;   
            lblTime.SetBinding(iLabel.TextProperty, bind);
            lblTime.VerticalAlignment = VerticalAlignment.Center;
            if(grdData.Length > 0 ){
            lblTime.Text =grdData[i];
            }
         
      
            stackpanel.Orientation = Orientation.Horizontal;
           
            stackpanel.Children.Add(lblTime);
            celltemplate.Content = stackpanel;

            edittemplate = new DataTemplate();
            let stackpane2 = new StackPanel(); 
            let lblTime1 = new iLabel();
            lblTime1.isAfterViewInitRequired = false;
            lblTime1.Name = "lblTime1";
            let bind1=new Binding();
            bind1.Mode = BindingMode.TwoWay;
            bind1.Path = `ScheduleTime`;
            bind1.PathObject = undefined;
            lblTime1.SetBinding(iLabel.TextProperty, bind1);              
            lblTime1.VerticalAlignment = VerticalAlignment.Center;
            if(grdData.Length > 0 ){
            lblTime1.Text =grdData[i] }    
            stackpane2.Orientation = Orientation.Horizontal;
            stackpane2.Children.Add(lblTime1);
            edittemplate.Content = stackpane2;

//             celltemplate = @"<DataTemplate xmlns=""http://schemas.microsoft.com/winfx/2006/xaml/presentation"" xmlns:x=""http://schemas.microsoft.com/winfx/2006/xaml"" xmlns:iSOFT=""clr-namespace:iSOFT.LORENZO.BlueBird.Controls;assembly=LorArcBlueBirdInput"" xmlns:ConClass=""clr-namespace:iSOFT.LORENZO.ManagePrescription.BlueBird.WebUI;assembly=LorAppManagePrescriptionBBUI_P2"">
//             <StackPanel Orientation=""Horizontal"">
//             <StackPanel.Resources>
//                 <ConClass:RemoveDoseUOM x:Key=""RemoveDoseUOM"" />
//             </StackPanel.Resources>
//             <iSOFT:iLabel Name=""lblTime"" VerticalAlignment=""Center""  Text=""{Binding ScheduleTime}""      />

//             </StackPanel>
//             </DataTemplate>";
// edittemplate = @"<DataTemplate xmlns=""http://schemas.microsoft.com/winfx/2006/xaml/presentation"" xmlns:x=""http://schemas.microsoft.com/winfx/2006/xaml"" xmlns:iSOFT=""clr-namespace:iSOFT.LORENZO.BlueBird.Controls;assembly=LorArcBlueBirdInput""  xmlns:ConClass=""clr-namespace:iSOFT.LORENZO.ManagePrescription.BlueBird.WebUI;assembly=LorAppManagePrescriptionBBUI_P2"">
//             <StackPanel Orientation=""Horizontal"">                                   
//                 <iSOFT:iLabel Name=""lblTime1"" VerticalAlignment=""Center"" Text=""{Binding ScheduleTime}""  />                                      
//              </StackPanel>
//             </DataTemplate>";
//                                    </DataTemplate>";
        }
        let dtCellTemplate: DataTemplate = celltemplate;
        let dtEditTemplate: DataTemplate = edittemplate;
        let icolumn: iGridViewDataColumn = new iGridViewDataColumn();
        icolumn['iGridViewDataColumnIndex'] = i;
        if (i != 0) {
            icolumn.Header = ScheduledDate[i - 1].ToString(CConstants.DateFormat) + Environment.NewLine + DayOfWeek[ScheduledDate[i - 1].DayOfWeek];
            icolumn.MinWidth = _GridColumnWidth;
            // icolumn.Width = new GridViewLength(1, GridViewLengthUnitType.Auto);
            icolumn.Width = 117;
        }
        else {
            icolumn.Header = CConstants.sTimeHeaderName;
            // icolumn.Width = _GridHeaderWidth;
            icolumn.Width = 80;
        }
        icolumn.IsVisible = true;
        icolumn.IsFilterable = false;
        icolumn.CellTemplate = dtCellTemplate;
        // icolumn.TextAlignment = TextAlignment.Center;
        // icolumn.TextWrapping = TextWrapping.Wrap;
        if (dtEditTemplate != null) {
            icolumn.CellEditTemplate = dtEditTemplate;
        }
        this.grdTitratedDose.SetBinding('data', this.objfrm.FormViewerDetails.BasicDetails.TitratedDoseDetails.GrdTitrated);
        this.grdTitratedDose.dColumns.Add(icolumn);
        if (i != 0) {
            if(this.objfrm.FormViewerDetails.BasicDetails.TitratedDoseDetails.GrdTitrated.Length > 0 && this.objfrm.FormViewerDetails.BasicDetails.TitratedDoseDetails.GrdTitrated[0].ScheduleDoseUOM){
            let longestUOMValueLength = 0; 
            this.objfrm.FormViewerDetails.BasicDetails.TitratedDoseDetails.GrdTitrated.forEach((dose)=>{
                if(dose.ScheduleDoseValue[i-1] && (dose.ScheduleDoseValue[i-1].toString()).length > longestUOMValueLength){
                    longestUOMValueLength = (dose.ScheduleDoseValue[i-1].toString()).length;
                }
            });
            let SelectedUOMLength = this.objfrm.FormViewerDetails.BasicDetails.TitratedDoseDetails.GrdTitrated[0].ScheduleDoseUOM.length + (longestUOMValueLength == 0 ? 0 : longestUOMValueLength+1);
            this.grdTitratedDose.AutoFitColumnWidthForContent(SelectedUOMLength, 'U', icolumn);
            }
        }
        console.log("Medipresolve.DataContextSetter ",this.grdTitratedDose);
        return i;
    }
    cboFrequency_SelectionChanged_Func = (s,e)  => {
        Object.keys(that).forEach((prop) => (this[prop] = that[prop]));
        this.cboFrequency_SelectionChanged(s,e)
    };
    public cboFrequency_SelectionChanged(sender: Object, e: SelectionChangedEventArgs): void {
        if (this.objfrm == null && this.DataContext != null && this.DataContext instanceof PrescriptionItemVM) {
            this.objfrm = ObjectHelper.CreateType<PrescriptionItemVM>(this.DataContext, PrescriptionItemVM);
        }
        if (this.objfrm != null) {
            if (this.objfrm.formViewerDetails.BasicDetails.TitratedDoseDetails != null && this.objfrm.FormViewerDetails.BasicDetails.Frequency != null && !String.Equals(this.objfrm.formViewerDetails.BasicDetails.TitratedDoseDetails.Frequencytext, this.objfrm.FormViewerDetails.BasicDetails.Frequency.DisplayText)) {
                let lnFreqOID: number;
                if (this.cboFrequency.SelectedItem != null) {
                    let objFreq: CListItem = ObjectHelper.CreateType<CListItem>(this.cboFrequency.SelectedItem, CListItem);
                    if (Number.TryParse(objFreq.Value, (o) => {
                        lnFreqOID = o;
                      })) {
                        if (lnFreqOID > 0 && !this.objfrm.formViewerDetails.BasicDetails.IsRestoreOldValues) {
                            this.objfrm.formViewerDetails.BasicDetails.TitratedDoseDetails.getAdministrationtimes(lnFreqOID);
                        }
                        if (this.objfrm.FormViewerDetails.BasicDetails.Frequency != null) {
                            this.objfrm.formViewerDetails.BasicDetails.TitratedDoseDetails.Frequencytext = this.objfrm.FormViewerDetails.BasicDetails.Frequency.DisplayText;
                        }
                        this.objfrm.formViewerDetails.BasicDetails.TitratedDoseDetails.IsTitClearEnabled = true;
                    }
                    else if (String.Equals(objFreq.Value, CConstants.CONST_MORE, StringComparison.CurrentCultureIgnoreCase)) {
                        if (this.objfrm != null && this.objfrm.FormViewerDetails != null && this.objfrm.FormViewerDetails.BasicDetails != null) {
                            this.objfrm.FormViewerDetails.BasicDetails.Frequency = objFreq;
                        }
                    }
                }

            }
        //   this.UserControl_Loaded(null,null)
           
        }
    }
    private GenerateColumn(): void {
	  if (this.grdTitratedDose?.dColumns != null && this.grdTitratedDose?.dColumns?.Count > 0) {
            this.grdTitratedDose.dColumns.Clear();
        }
        let dtStartDate: DateTime = DateTime.MinValue;
        if (this.objfrm != null && this.objfrm.ActionCode == ActivityTypes.Amend) {
            dtStartDate = this.objfrm.FormViewerDetails.BasicDetails.TitratedDoseDetails.Stardate;
        }
        else {
            dtStartDate = PatientContext.PrescriptionType == PrescriptionTypes.Clerking ? CommonBB.GetServerDateTime() : this.objfrm.formViewerDetails.BasicDetails.StartDTTM;
        }
        if (dtStartDate != DateTime.MinValue) {
            let dtScheduledDTTM: DateTime[] = this.objfrm.formViewerDetails.BasicDetails.TitratedDoseDetails.CalculateDates(dtStartDate);
            for (let iCntr: number = 0; iCntr < 8; iCntr++) {
                this.AddGridColumns(iCntr, dtScheduledDTTM);
            }
        }
        else {
            this.AddGridColumns(0, null);
        }
        
    }
    private UserControl_Loaded(sender: Object, e: RoutedEventArgs): void {
        // if (this.omedFormViewer != null) {
        //     this.omedFormViewer.AutoScrollView();
        // }
        if (this.objfrm != null && this.objfrm.formViewerDetails != null && this.objfrm.formViewerDetails.BasicDetails != null) {
            if (this.objfrm.formViewerDetails.BasicDetails.TitratedDoseDetails == null) {
                this.objfrm.formViewerDetails.BasicDetails.TitratedDoseDetails = new TitratedDoseVM();
            }
            this.objfrm.formViewerDetails.BasicDetails.TitratedDoseDetails.ReBindTitratedHeaderEvent = (s, e) => {
                Object.keys(that).forEach((prop) => (this[prop] = that[prop]));
                this.RebindTitrated_HeaderEvent(); };
            this.objfrm.formViewerDetails.BasicDetails.TitratedDoseDetails.ReBindTitratedGRIDEvent = (s, e) => { 
                Object.keys(that).forEach((prop) => (this[prop] = that[prop]));
                this.RebindTitrated_GridEvent(); };
            
        }
        // if(this.btnReviewcopieddoses)
        //     this.btnReviewcopieddoses.Text = Resource.MedicationForm.lblTitratedReviewCopiesdoses;    
        
    

        // this.grdTitratedDose.SetBinding('data', this.objfrm.FormViewerDetails.BasicDetails.TitratedDoseDetails.GrdTitrated);
    }
    private Validate(): boolean {
        let _result: boolean = false;
        let _ValidationMessage: string = String.Empty;
        return _result;
    }
    btnReviewcopieddoses_Click_Func = (s, e) => { this.btnReviewcopieddoses_Click(s, e); }

    oTitratedDoseCommonVM: TitratedDoseCommonVM;
    private btnReviewcopieddoses_Click(sender: Object, e: RoutedEventArgs): void {
        if (this.ContentCtrlMedResloveTitrated != null && this.objfrm.FormViewerDetails.BasicDetails.IsReviewtiratedosesVisibility == Visibility.Collapsed) {
            this.oTitratedDoseCommonVM = new TitratedDoseCommonVM();
            this.oTitratedDoseCommonVM.InputPrescriptionItemOID = this.objfrm.PrescriptionItemOID > 0 ? this.objfrm.PrescriptionItemOID : this.objfrm.SourcePrescriptionOid;
            this.oTitratedDoseCommonVM.PresType = (this.objfrm != null && !String.IsNullOrEmpty(this.objfrm.SourcePrescriptionType)) ? this.objfrm.SourcePrescriptionType : String.Empty;
            this.oMedTitratedDoseChild = new MedTitratedDoseChild(this.oTitratedDoseCommonVM);
            this.ContentCtrlMedResloveTitrated.Content = this.oMedTitratedDoseChild;
            let oMedTitrated: MedTitratedDoseChild = ObjectHelper.CreateType<MedTitratedDoseChild>(this.ContentCtrlMedResloveTitrated.Content, MedTitratedDoseChild);
            let oiGird: Grid = ObjectHelper.CreateType<Grid>(oMedTitrated.FindName("grdTitratedDose"), GridComponent);
            oiGird.Width = 890;
            oiGird.Margin = new Thickness(1, 1, 1, 1);
            // oiGird.MinHeight = 110;
            // oiGird.MaxHeight = 140;
            let oiLabel: iLabel = ObjectHelper.CreateType<iLabel>(oMedTitrated.FindName("lblTitrateddose"), iLabel);
            oiLabel.Text = Resource.MedicationForm.lblPerviousTitratedDose;
            setTimeout(() => {
                if(document.getElementsByName("lblTitrateddose").length > 0)
                document.getElementsByName("lblTitrateddose")[0].innerText = oiLabel.Text;
            }, 1);
            let strImagesource: string = MedImage.GetPath("icon_upsmall.png");
            this.btnReviewcopieddoses.Text = Resource.MedicationForm.lblTitratedHideCopiesdoses;
            this.btnReviewcopieddoses.ChangeImage(strImagesource, strImagesource, "");
            this.objfrm.FormViewerDetails.BasicDetails.IsReviewtiratedosesVisibility = Visibility.Visible;
        }
        else {
            let strImagesource: string = MedImage.GetPath("icon_downsmallhot.png");
            this.btnReviewcopieddoses.Text = Resource.MedicationForm.lblTitratedReviewCopiesdoses;
            this.btnReviewcopieddoses.ChangeImage(strImagesource, strImagesource, "");
            this.objfrm.FormViewerDetails.BasicDetails.IsReviewtiratedosesVisibility = Visibility.Collapsed;
        }
    }
    private medresolvetitrated_Unloaded(sender: Object, e: RoutedEventArgs): void {
        this.DisposeFormEvents();
    }
    private DisposeFormEvents(): void {
        this.omedFormViewer = null;
    }
    public ClearControls(): void {
        if (this.objfrm != null && this.objfrm.FormViewerDetails != null && this.objfrm.FormViewerDetails.BasicDetails != null && this.objfrm.formViewerDetails.BasicDetails.TitratedDoseDetails != null) {
            if (this.objfrm.formViewerDetails.BasicDetails.odefTitratedDoseInstruction != null && this.objfrm.formViewerDetails.BasicDetails.odefTitratedDoseInstruction.IsDefault) {
                this.txtTitratedDoseComments.Text = String.Empty;
                this.cboTitratedDoseInstruction.Text = this.objfrm.formViewerDetails.BasicDetails.odefTitratedDoseInstruction.DisplayText;
            }
            else {
                this.txtTitratedDoseComments.Text = String.Empty;
                this.cboTitratedDoseInstruction.SelectedIndex = -1;
            }
           // this.grdTitratedDose.Rebind();
        }
    }
    private grdTitratedDose_CellEditEnded(sender: Object, e: GridViewCellEditEndedEventArgs): void {
        this.SetNewColumnWidthOnCellEdit(e);
        if (this.grdTitratedDose != null && this.grdTitratedDose.ItemsSource != null && this.objfrm.formViewerDetails.BasicDetails.TitratedDoseDetails != null && this.objfrm.formViewerDetails.BasicDetails.TitratedDoseDetails.TempGrdTitrated != null && this.objfrm.formViewerDetails.BasicDetails.TitratedDoseDetails.TempGrdTitrated.Count > 0 && this.objfrm.formViewerDetails.BasicDetails.oPrescitemVM != null && this.objfrm.formViewerDetails.BasicDetails.oPrescitemVM.ActionCode == ActivityTypes.Amend && (String.Equals(PatientContext.PrescriptionType, PrescriptionTypes.Discharge, StringComparison.InvariantCultureIgnoreCase) || String.Equals(PatientContext.PrescriptionType, PrescriptionTypes.Leave, StringComparison.InvariantCultureIgnoreCase) || String.Equals(PatientContext.PrescriptionType, PrescriptionTypes.Outpatient, StringComparison.InvariantCultureIgnoreCase))) {
            let oTitratedSchDtls: ObservableCollection<TitratedScheduleDetails> = ObjectHelper.CreateType<ObservableCollection<TitratedScheduleDetails>>(this.grdTitratedDose.ItemsSource, ObservableCollection<TitratedScheduleDetails>);
            if (oTitratedSchDtls != null && oTitratedSchDtls.Count > 0) {
                let ScheduleTime: string[] = oTitratedSchDtls.Select(s => s.ScheduleTime).ToArray();
                let nScheduleTimeCount: number = ScheduleTime.Count();
                for (let i: number = 0; i < nScheduleTimeCount; i++) {
                    let ExistingSchDoseValue: string[] = this.objfrm.formViewerDetails.BasicDetails.TitratedDoseDetails.TempGrdTitrated.Where(c => c.ScheduleTime == ScheduleTime[i]).Select(s => s.ScheduleDoseValue).FirstOrDefault();
                    let CurrentSchDoseValue: string[] = oTitratedSchDtls.Where(c => c.ScheduleTime == ScheduleTime[i]).Select(s => s.ScheduleDoseValue).FirstOrDefault();
                    let nCurrentDoseVauleCount: number = CurrentSchDoseValue.Count();
                    for (let k: number = 0; k < nCurrentDoseVauleCount; k++) {
                        if (!String.Equals(ExistingSchDoseValue[k], CurrentSchDoseValue[k])) {
                            this.objfrm.formViewerDetails.BasicDetails.ClearPrescribedQuantity();
                            this.objfrm.formViewerDetails.BasicDetails.TitratedDoseDetails.TempGrdTitrated[i].ScheduleDoseValue[k] = CurrentSchDoseValue[k];
                        }
                    }
                }
            }
        }
    }
    private FindTextBox(parent: Grid): iTextBox {
        if (parent == null)
            return null;
        let targetType: Type = typeof (iTextBox);
        let count: number = VisualTreeHelper.GetChildrenCount(parent);
        for (let i: number = 0; i < count; i++) {
            let child: UIElement = <UIElement>VisualTreeHelper.GetChild(parent, i);
            
            if (ObjectHelper.GetType(child) == targetType) {
                return ObjectHelper.CreateType<iTextBox>(child, iTextBox);
            }
        }
        return null;
    }
    grdTitratedDose_CellValidating(sender: Object , e:GridViewCellValidatingEventArgs): void {
        let txtBox: iTextBox = this.FindTextBox(ObjectHelper.CreateType<Grid>(e.EditingElement, Grid));
        if (txtBox != null) {
            let row = ObjectHelper.CreateType<FrameworkElement>(e.Row, FrameworkElement);
            if (row != null) {
                let titsch = ObjectHelper.CreateType<TitratedScheduleDetails>(row.DataContext, TitratedScheduleDetails);
                if (titsch != null) {
                    let idx: number = e.Cell.Column.DisplayIndex - 1;
                    let key: string = titsch.ScheduledDate[idx].ToString("dd-MM-yyyy") + titsch.ScheduleTime;
                    let value: string = this.dct.ContainsKey(key) ? this.dct[key] : null;
                    this.dct[key] = txtBox.Text;
                    if (!String.Equals(value != null ? value : String.Empty, txtBox.Text != null ? txtBox.Text : String.Empty)) {
                        this.objfrm.TechnicallyValidateMessage();
                    }
                    e.Handled = true;
                }
            }
        }
    }
    grdTitratedDose_RowValidating(sender: Object): void {

    }
    private grdTitratedDose_CellEditStarted(s, e) { this.SetNewColumnWidthOnCellEdit(e, true);
        setTimeout(() => {
            this.scrollGridToEnd(e);            
        }, 0);
    }
    private SetNewColumnWidthOnCellEdit(e: GridViewCellEditEndedEventArgs, defaultWidth: boolean = false) {
        let SelectedUOMLength = e.NewData?.DataContext?.ScheduleDoseUOM?.length || 0;
        let NewDataLength = (e.NewData?.Text+'')?.length || 0;
        let ContentWidth = SelectedUOMLength;
        ContentWidth += defaultWidth ? 7: NewDataLength;
        this.grdTitratedDose.AutoFitColumnWidthForContent(ContentWidth, 'U', e.Cell.Column, defaultWidth );
    }
    private SetNewColumnWidthOnUOMChange(data) {
        let SelectedUOMLength = data.ScheduleDoseUOM?.length || 0;
        this.grdTitratedDose.AutoFitColumnWidthForContent(SelectedUOMLength, 'A');
    }
    private scrollGridToEnd(e){
        if(this.grdTitratedDose.EnableScrollBarVisibility)
        {
            var element = document.querySelector(".HorizontalScrollBarVisibility .k-grid-content");
            if(e.Cell.Column.iGridViewDataColumnIndex > 4)
                element.scrollTo({left:(e.Cell.Column.iGridViewDataColumnIndex * e.Cell.Column.Width)});
            else
                element.scrollTo({left:0});
        }
    }
}
