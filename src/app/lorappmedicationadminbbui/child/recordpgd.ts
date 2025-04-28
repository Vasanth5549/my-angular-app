import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Inject, OnInit, Output, QueryList, ViewChild, ViewChildren, ViewEncapsulation } from '@angular/core';
import { StringBuilder,ProfileFactoryType,ContextManager,Convert,AppActivity, iBusyIndicator, SLQueryCollection, ScriptObject} from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp,Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison,AppDialogEventargs, AppDialogResult, DelegateArgs, DialogComponentArgs, WindowButtonType, iAppDialogWindow, ObservableCollection, ChildWindow, CListItem, List, IEnumerable, Visibility, HtmlPage } from 'epma-platform/models';
import { AppDialog, Border, DataTemplate, EventArgs, Grid, SolidColorBrush, StackPanel, iCheckBox, iDateTimePicker, iLabel, iTextBox, iTimeBox } from 'epma-platform/controls';
import { HelperService} from 'epma-platform/soapclient';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
import { PGDAdminstrationVM, PGDListVM } from 'src/app/lorappmedicationadminbbui/viewmodel/pgdvm';
import { CDrugHdrAddnlInfo, DrugHeader } from '../common/drugheader';
import * as IPPManagePrescSer from 'src/app/shared/epma-platform/soap-client/IPPMAManagePrescriptionWS';
import { CommonBB } from 'src/app/lorappcommonbb/utilities/common';
import { SelectedUserType, WitnessHelper } from 'src/app/lorappmedicationcommonbb/utilities/witnesshelper';
import { Busyindicator } from 'src/app/lorappcommonbb/busyindicator';
import { Resource } from 'src/app/lorappmedicationadminbbui/resource';
import { CConstants } from 'src/app/lorappmedicationadminbbui/utilities/CConstants';
import { SlotAdministrationHelper } from 'src/app/lorappmedicationadminbbui/common/slotadministrationhelper';
import { MedsAdminChartToolTip } from 'src/app/lorappmedicationadminbbui/resource/medsadmincharttooltip.designer';
import { CReqMsgGetUser, CResMsgGetUser, CSecurityManagementServiceWSSoapClient, GetUserCompletedEventArgs } from 'src/app/shared/epma-platform/soap-client/CSecurityManagementServiceWS';
import { AppContextInfo, PatientContext } from 'src/app/lorappcommonbb/utilities/globalvariable';
import { MedChartData, TagDrugHeaderDetail } from 'src/app/lorappmedicationadminbbui/utilities/globalvariable';
import { ProfileData } from 'src/app/lorappmedicationadminbbui/utilities/ProfileData';
import { Common, MedsAdminCommonData } from 'src/app/lorappmedicationadminbbui/utilities/common';
import { ConflictAcknowledge, ConflictsHelper } from 'src/app/lorappmedicationcommonbb/utilities/ConflictsHelper';
import { GridExtension, GridViewCellClickEventArgs, RowLoadedEventArgs } from 'src/app/shared/epma-platform/controls/epma-grid-helpers/grid-extension';
import { AuthResult } from 'src/app/lorappmedicationcommonbb/viewmodel/UserAuthenticateVM';
import { CReqMsgIsWitnessRequired, CResMsgIsWitnessRequired, IPPMAPrescribableDefnWSSoapClient, IsWitnessRequiredCompletedEventArgs, ObjectInfo, WitnessCriteria } from 'src/app/shared/epma-platform/soap-client/IPPMAPrescribableDefnWS';
import { AdministrationDetailVM } from 'src/app/lorappmedicationadminbbui/viewmodel/MedicationChartVM';
import { MedicationCommonBB } from 'src/app/lorappmedicationcommonbb/utilities/medicationcommonbb';
import { DateChangedArgs, RoutedEventArgs, RoutedPropertyChangedEventArgs } from 'src/app/shared/epma-platform/controls/Control';
import { Type } from 'src/app/product/shared/models/Common';
import { ChartIcon } from 'src/app/lorarcbluebirdmedicationchart/common/ChartIcon';
import { WarningDetails } from 'src/app/shared/epma-platform/soap-client/MedicationAdministrationWS';
import { PGDConflictsChild } from 'src/app/lorappmedicationadminbbui/child/pgdconflictschild';
import { GridComponent, RowClassArgs } from '@progress/kendo-angular-grid';
import { DrugItem } from 'src/app/lorarcbluebirdmedicationchart/common/DrugItem';
import { iSFS } from 'src/app/shared/epma-platform/controls/epma-isfs/epma-isfs.component';
import { SLSFSItem } from 'src/app/shared/epma-platform/models/model';
import { iPanelBar } from 'src/app/shared/epma-platform/controls/epma-ipanelbar/epma-ipanelbar.component';
import * as ControlStyles from "src/app/shared/epma-platform/controls/ControlStyles";
import * as RecordPGD_Designer from '../resource/recordpgd.designer';
import { medfrmconflictsCA } from 'src/app/lorappmanageprescriptionbbui/view/medfrmconflictsCA';
import { DateChangeEventArgs } from 'src/app/shared/epma-platform/controls/epma-datetimepicker/epma-datetimepicker.component';
import { FormatTextPipe } from 'src/app/product/shared/pipes/medicationconverters.pipe';
import { DisplayPrescriptionLineMedsItemPipe } from 'src/app/lorarcbluebirdmedicationchart/converter/MedChartConverter.pipe';

@Component({
    selector: 'RecordPGD',
    templateUrl: './recordpgd.html',
    styleUrls: ['./recordpgd.css'],
  encapsulation: ViewEncapsulation.None,
  })

  export class RecordPGD extends iAppDialogWindow implements AfterViewInit, OnInit{
    // public afterLoad = new EventEmitter();+
    objPGDAdminstrationVM: PGDAdminstrationVM;
    objPGDConflictsChildWindow: PGDConflictsChild; //xaml file
    objPGDListVM: PGDListVM;
    oDrugItem: DrugItem;
    oHdrAddnlInfo: CDrugHdrAddnlInfo;
    nLocalMedCharOID: number;
    private oChildWindow: ChildWindow;
    nPrescriptionOID: number;
    CurrentDTTM: DateTime= CommonBB.GetServerDateTime();
    oParam: string = String.Empty;
    private static CONTS_ADMINISTEREDBY: string = "Administeredby";
    private static CONTS_DATETIMEGIVEN: string = "Date/Time given";
    strLoggedOnUserName: string;
    objWitnessHelper: WitnessHelper;
    bIsWitnessReqd: boolean = false;
    strLorenzoID: string = String.Empty;
    lnRouteOID: number = 0;
    bIsControlledDrug: boolean = false;
    private IsWitnessOverrideAllowed: boolean;
    ParacetamolAlreadyAdministeredWarning_Displayed: boolean = false;
    ParacetamolPGDadminOkClickBeingValidated: number = 0;

    public objRecordPGD = Resource.RecordPGD;
    public Styles = ControlStyles;

    private LayoutRoot: Grid;
    PGDListNameServicePoint: string;
    chkNoWitness_Checked_Func: Function;
    chkNoWitness_Unchecked_Func: Function;
    IsPatientTransferd: Visibility;
    omedfrmconflictsCA: medfrmconflictsCA;
    dtpGivenDate_OnDateChange_Func: Function;
    FormatText: FormatTextPipe;
    

    @ViewChild("LayoutRootTempRef", { read: Grid, static: false }) set _LayoutRoot(c: Grid) {
        if (c) { this.LayoutRoot = c; }
    };
    private PGDMaxAdminAlert: Border;
    @ViewChild("PGDMaxAdminAlertTempRef", { read: Border, static: false }) set _PGDMaxAdminAlert(c: Border) {
        if (c) { this.PGDMaxAdminAlert = c; }
    };
    private lblPGDWarning: iLabel;
    @ViewChild("lblPGDWarningTempRef", { read: iLabel, static: false }) set _lblPGDWarning(c: iLabel) {
        if (c) { this.lblPGDWarning = c; }
    };
    private pnlBar: iPanelBar;
    @ViewChild("pnlBarTempRef", { read: iPanelBar, static: false }) set _pnlBar(c: iPanelBar) {
        if (c) { this.pnlBar = c; }
    };
    private lblPGDListName: iLabel;
    @ViewChild("lblPGDListNameTempRef", { read: iLabel, static: false }) set _lblPGDListName(c: iLabel) {
        if (c) { this.lblPGDListName = c; }
    };
    public grdPGDListServicePoint: GridExtension = new GridExtension();
    // private grdPGDListServicePoint: GridComponent;
    @ViewChild("grdPGDListServicePointTempRef", { read: GridComponent, static: false }) set _grdPGDListServicePoint(comp: GridComponent) {
        if (comp) { 
            // this.grdPGDListServicePointData.ItemSource = comp.data;
            this.grdPGDListServicePoint.grid = comp;
            this.grdPGDListServicePoint.columns = comp.columns;
        }
    };
    // private grdPGDListRole: iGrid;
    public grdPGDListRole: GridExtension = new GridExtension();
    @ViewChild("grdPGDListRoleTempRef", { read: GridComponent, static: false }) set _grdPGDListRole(comp: GridComponent) {
        if (comp) { 
            this.grdPGDListRole.grid = comp;
            this.grdPGDListRole.columns = comp.columns;
        }
    };
    private spDetails: StackPanel;
    @ViewChild("spDetailsTempRef", { read: StackPanel, static: false }) set _spDetails(c: StackPanel) {
        if (c) { this.spDetails = c; }
    };
    drgHeader: DrugHeader;
    @ViewChild("drgHeaderTempRef", { read: DrugHeader, static: false }) set _drgHeader(c: DrugHeader) {
        if (c) { this.drgHeader = c; }
    };
    private brdHeader: Border;
    @ViewChild("brdHeaderTempRef", { read: Border, static: false }) set _brdHeader(c: Border) {
        if (c) { this.brdHeader = c; }
    };
    private lblIngredientWarnMsg: iLabel;
    @ViewChild("lblIngredientWarnMsgTempRef", { read: iLabel, static: false }) set _lblIngredientWarnMsg(c: iLabel) {
        if (c) { this.lblIngredientWarnMsg = c; }
    };
    private grdMedicationAndMore: Grid;
    @ViewChild("grdMedicationAndMoreTempRef", { read: Grid, static: false }) set _grdMedicationAndMore(c: Grid) {
        if (c) { this.grdMedicationAndMore = c; }
    };
    private BrdrRate: Border;
    @ViewChild("BrdrRateTempRef", { read: Border, static: false }) set _BrdrRate(c: Border) {
        if (c) { this.BrdrRate = c; }
    };
    private lblMedicationAction: iLabel;
    @ViewChild("lblMedicationActionTempRef", { read: iLabel, static: false }) set _lblMedicationAction(c: iLabel) {
        if (c) { this.lblMedicationAction = c; }
    };
    private lblGiven: iLabel;
    @ViewChild("lblGivenTempRef", { read: iLabel, static: false }) set _lblGiven(c: iLabel) {
        if (c) { this.lblGiven = c; }
    };
    private lblDose: iLabel;
    @ViewChild("lblDoseTempRef", { read: iLabel, static: false }) set _lblDose(c: iLabel) {
        if (c) { this.lblDose = c; }
    };
    private txtDose: iTextBox;
    @ViewChild("txtDoseTempRef", { read: iTextBox, static: false }) set _txtDose(c: iTextBox) {
        if (c) { this.txtDose = c; }
    };
    private lblDoseUOM: iLabel;
    @ViewChild("lblDoseUOMTempRef", { read: iLabel, static: false }) set _lblDoseUOM(c: iLabel) {
        if (c) { this.lblDoseUOM = c; }
    };
    private lblRate: iLabel;
    @ViewChild("lblRateTempRef", { read: iLabel, static: false }) set _lblRate(c: iLabel) {
        if (c) { this.lblRate = c; }
    };
    private txtRate: iTextBox;
    @ViewChild("txtRateTempRef", { read: iTextBox, static: false }) set _txtRate(c: iTextBox) {
        if (c) { this.txtRate = c; }
    };
    private lblRateUOM: iLabel;
    @ViewChild("lblRateUOMTempRef", { read: iLabel, static: false }) set _lblRateUOM(c: iLabel) {
        if (c) { this.lblRateUOM = c; }
    };
    private lblBatchNo: iLabel;
    @ViewChild("lblBatchNoTempRef", { read: iLabel, static: false }) set _lblBatchNo(c: iLabel) {
        if (c) { this.lblBatchNo = c; }
    };
    private txtBatchNo: iTextBox;
    @ViewChild("txtBatchNoTempRef", { read: iTextBox, static: false }) set _txtBatchNo(c: iTextBox) {
        if (c) { this.txtBatchNo = c; }
    };
    private lblExpiryDate: iLabel;
    @ViewChild("lblExpiryDateTempRef", { read: iLabel, static: false }) set _lblExpiryDate(c: iLabel) {
        if (c) { this.lblExpiryDate = c; }
    };
    private dtpExpiryDate: iDateTimePicker;
    @ViewChild("dtpExpiryDateTempRef", { read: iDateTimePicker, static: false }) set _dtpExpiryDate(c: iDateTimePicker) {
        if (c) { this.dtpExpiryDate = c; }
    };
    private grdMedicationGiven: Grid;
    @ViewChild("grdMedicationGivenTempRef", { read: Grid, static: false }) set _grdMedicationGiven(c: Grid) {
        if (c) { this.grdMedicationGiven = c; }
    };
    private lblGivenDateTime: iLabel;
    @ViewChild("lblGivenDateTimeTempRef", { read: iLabel, static: false }) set _lblGivenDateTime(c: iLabel) {
        if (c) { this.lblGivenDateTime = c; }
    };
    private dtpGivenDate: iDateTimePicker;
    @ViewChild("dtpGivenDateTempRef", { read: iDateTimePicker, static: false }) set _dtpGivenDate(c: iDateTimePicker) {
        if (c) { this.dtpGivenDate = c; }
    };
    private tbGivenTime: iTimeBox;
    @ViewChild("tbGivenTimeTempRef", { read: iTimeBox, static: false }) set _tbGivenTime(c: iTimeBox) {
        if (c) { this.tbGivenTime = c; }
    };
    private lblAdministeredby: iLabel;
    @ViewChild("lblAdministeredbyTempRef", { read: iLabel, static: false }) set _lblAdministeredby(c: iLabel) {
        if (c) { this.lblAdministeredby = c; }
    };
    private iSFSAdministeredby: iSFS;
    @ViewChild("iSFSAdministeredbyTempRef", { read: iSFS, static: false }) set _iSFSAdministeredby(c: iSFS) {
        if (c) { this.iSFSAdministeredby = c; }
    };
    private chkNoWitness: iCheckBox;
    @ViewChild("chkNoWitnessTempRef", { read: iCheckBox, static: false }) set _chkNoWitness(c: iCheckBox) {
        if (c) { this.chkNoWitness = c; }
    };
    private lblWitnessedBy: iLabel;
    @ViewChild("lblWitnessedByTempRef", { read: iLabel, static: false }) set _lblWitnessedBy(c: iLabel) {
        if (c) { this.lblWitnessedBy = c; }
    };
    private sfsWitnessedby: iSFS;
    @ViewChild("sfsWitnessedbyTempRef", { read: iSFS, static: false }) set _sfsWitnessedby(c: iSFS) {
        if (c) { this.sfsWitnessedby = c; }
    };
    private lblComments: iLabel;
    @ViewChild("lblCommentsTempRef", { read: iLabel, static: false }) set _lblComments(c: iLabel) {
        if (c) { this.lblComments = c; }
    };
    private txtComments: iTextBox;
    @ViewChild("txtCommentsTempRef", { read: iTextBox, static: false }) set _txtComments(c: iTextBox) {
        if (c) { this.txtComments = c; }
    };
    private grdPrpStatus: Grid;
    @ViewChild("grdPrpStatusTempRef", { read: Grid, static: false }) set _grdPrpStatus(c: Grid) {
        if (c) { this.grdPrpStatus = c; }
    };
    MedAdminLineDisplay: DisplayPrescriptionLineMedsItemPipe;
    
    constructor(private changeDetectorRef?: ChangeDetectorRef){
        super();
    }
    public constructorImpl(nMedCharOId: number) {
        switch (arguments.length) {
            case 0:
                //this.RecordPGDInitializeComponent();
                break;
            case 1:
               // this.RecordPGDInitializeComponent();
               this.nLocalMedCharOID = nMedCharOId;
                break;
        }
    }

    ngOnInit(): void{
        this.chkNoWitness_Checked_Func = (s, e) => { this.chkNoWitness_Checked(e); };
        this.chkNoWitness_Unchecked_Func = (s, e) => { this.chkNoWitness_Unchecked(e); };
        this.dtpGivenDate_OnDateChange_Func = (s, e) => { this.dtpGivenDate_OnDateChange(s, e) }
    }
    public windowpix; 
        ngAfterViewInit(): void {
        this.windowpix = (window.devicePixelRatio ==1) ?true : false;
        this.grdPGDListServicePoint.GenerateColumns();
        if (this.objPGDAdminstrationVM == null)
        this.objPGDAdminstrationVM = ObjectHelper.CreateType<PGDAdminstrationVM>(this.DataContext, PGDAdminstrationVM);
        this.RecordPGD_Loaded();
        this.RecordPGDInitializeComponent();
        this.grdPGDListServicePoint.changeDetectionRef = this.changeDetectorRef; 
        if (this.objPGDAdminstrationVM != null && (DateTime.NotEquals(this.objPGDAdminstrationVM.AdministrationDate,DateTime.MinValue))) {
            this.objPGDAdminstrationVM.AdministrationDate = DateTime.MinValue;
        }       
        if (this.dtpGivenDate != null && DateTime.NotEquals(this.dtpGivenDate.SelectedDateTime, DateTime.MinValue)) {
            this.dtpGivenDate.SelectedDateTime = DateTime.MinValue;
        }      
 	if (this.objPGDAdminstrationVM != null) {
            this.objPGDAdminstrationVM.IsDoseEnabled = false; 
	  }
        this.HelpCode = CConstants.MedChart;       
    }

    private RecordPGDInitializeComponent(): void {
        this.iSFSAdministeredby.OnGetItems  = (s,e) => { this.iSFSAdministeredby_OnGetItems(s,e) } ;
        this.sfsWitnessedby.OnGetItems  = (s,e) => { this.sfsWitnessedby_OnGetItems(s,e) } ;
        this.iSFSAdministeredby.ItemsSource = new ObservableCollection<CListItem>();
        this.sfsWitnessedby.ItemsSource = new ObservableCollection<CListItem>();
        if (this.objPGDAdminstrationVM != null) {
            this.objPGDAdminstrationVM.dataLoadEvent.subscribe(data => {
                this.grdPGDListServicePoint.SetBinding('data', this.objPGDAdminstrationVM.PgdListDetailsServicePoint);
                this.PGDListNameServicePoint = this.objPGDAdminstrationVM.PGDListNameServicePoint;
                this.IsPatientTransferd = this.objPGDAdminstrationVM.IsPatientTransferd;
            })
        }
        //this.grdPGDListRole.SetBinding(GridExtension.ItemsSourceProperty, ObjectHelper.CreateObject(new Binding("PgdListDetailsRole"), { Mode: BindingMode.OneWay }));
        this.iSFSAdministeredby.GetSFSItems("cp");
        this.sfsWitnessedby.GetSFSItems("cp");
        //moved to MedsAdminChartView.ts
        //Triggering point of recordpg in emergency department
        this.oDrugItem = new DrugItem();
        this.oHdrAddnlInfo = new CDrugHdrAddnlInfo();
        this.oDrugItem.DoseLabel = MedsAdminChartToolTip.DoseText;
        this.oDrugItem.RouteLabel = MedsAdminChartToolTip.ROUTEText;
        this.oDrugItem.Route = " ";
        this.drgHeader.DataContext = Common.SetDrugHeaderContent(this.oDrugItem, this.oHdrAddnlInfo, this.drgHeader);
        this.lblGiven.Visibility = Visibility.Collapsed;
        this.dtpGivenDate.OnDateValueChanged  = (s,e) => { this.dtpGivenDate_OnDateValueChanged(s,e); } ;
        this.tbGivenTime.ValueChanged  = (s,e) => { this.tbGivenTime_ValueChanged(s,e); } ;
    }
    tbGivenTime_ValueChanged(sender: Object, e: RoutedPropertyChangedEventArgs<DateTime>): void {       
        // if (this.dtpGivenDate != null && DateTime.NotEquals(this.dtpGivenDate.SelectedDateTime, DateTime.MinValue)) {
        //     this.dtpGivenDate.SelectedDateTime = DateTime.MinValue;
        // }        
         if (this.objPGDAdminstrationVM != null && (DateTime.Equals(this.dtpGivenDate.SelectedDateTime?.Date, this.CurrentDTTM.Date))) {
            if (DateTime.GreaterThan(this.tbGivenTime.Value, this.CurrentDTTM)) {
                this.tbGivenTime.Maximum = this.CurrentDTTM;
            }
        }
    }

    grdPGDListServicePoint_onCellClick(event): void {
        this.txtComments.Height = 100;
        
        if (this.grdPGDListServicePoint.GetColumnIndexByName("SlctColumn") == event.columnIndex) {
            this.brdHeader.Visibility = Visibility.Collapsed;
            this.objPGDListVM = ObjectHelper.CreateType<PGDListVM>(this.grdPGDListServicePoint.GetRowData(event.rowIndex), PGDListVM);
            if (this.objPGDListVM.IsCopyAcross && this.objPGDListVM != null) {
                iBusyIndicator.Start("ConflictHelper", true);
               // this.objPGDAdminstrationVM.OnWitnessUserSelected -= ValidateUser;
                this.objPGDAdminstrationVM.OnWitnessUserSelected  = (s) => { this.ValidateUser(s); } ;
              //  this.objPGDAdminstrationVM.OnAdministratedUserSelectedEvent -= ValidateUser;
                this.objPGDAdminstrationVM.OnAdministratedUserSelectedEvent  = (s) => { this.ValidateUser(s); } ;
                this.objPGDAdminstrationVM.IsUpdatedWarning = false;
                if (this.objPGDListVM != null) {
                    this.ParacetamolAlreadyAdministeredWarning_Displayed = false;
                    this.ParacetamolPGDadminOkClickBeingValidated = 0;
                    if (this.objPGDListVM.IsParacetamolIngredient) {
                        let oSlotHelper: SlotAdministrationHelper = new SlotAdministrationHelper();
                       // oSlotHelper.TriggerParacetamolWarningEvent -= oSlotHelper_TriggerParacetamolWarningEvent;
                        oSlotHelper.TriggerParacetamolWarningEvent  = (s) => { this.oSlotHelper_TriggerParacetamolWarningEvent(s); } ;
                        oSlotHelper.IsAnyParacetamolAdministered(CommonBB.GetServerDateTime(), 0);
                        Busyindicator.SetStatusBusy("CheckParaAdministered");
                        this.ParacetamolPGDadminOkClickBeingValidated = 1;
                        if (this.objPGDListVM.IngredientWarning != null && this.objPGDListVM.IngredientWarning.Count > 0) {
                            this.lblIngredientWarnMsg.Text = String.Join("\n", this.objPGDListVM.IngredientWarning.ToArray());
                            this.brdHeader.Visibility = Visibility.Visible;
                            this.txtComments.Height = 90;
                        }
                    }
                    else {
                        if (this.objPGDListVM.IngredientWarning != null && this.objPGDListVM.IngredientWarning.Count > 0) {
                            this.lblIngredientWarnMsg.Text = String.Join("\n", this.objPGDListVM.IngredientWarning.ToArray());
                            this.brdHeader.Visibility = Visibility.Visible;
                            this.txtComments.Height = 90;
                        }
                      //  this.objPGDAdminstrationVM.CurrentMedicationCompleted -= objPGDAdminstrationVM_GetCurrentMedicationCompleted_ServicePoint;
                        this.objPGDAdminstrationVM.CurrentMedicationCompleted  = () => { this.objPGDAdminstrationVM_GetCurrentMedicationCompleted_ServicePoint(); } ;
                        this.objPGDAdminstrationVM.GetCurrentMedication();
                      //  this.objPGDAdminstrationVM.WarningsGenerationCompleted -= WarningGeneration_Completed;
                        this.objPGDAdminstrationVM.WarningsGenerationCompleted  = (s,e) => { this.WarningGeneration_Completed(s,e); } ;
                      //  this.objPGDAdminstrationVM.OnErrorEvent -= Pgdlist_OnErrorEvent;
                        this.objPGDAdminstrationVM.OnErrorEvent  = (s) => { this.Pgdlist_OnErrorEvent(s); } ;
                    }
                    this.lnRouteOID = this.objPGDListVM.RouteOID;
                    this.strLorenzoID = this.objPGDListVM.LorenzoID;
                }
            }
            else {
                this.ClearAll();
                this.objPGDAdminstrationVM.AdministrationTime = DateTime.MinValue;
                this.objPGDAdminstrationVM.AdministrationDate = DateTime.MinValue;
                this.objPGDAdminstrationVM.ExpiryDate = DateTime.MinValue;
                this.objPGDAdminstrationVM.Dose = String.Empty;
                this.objPGDAdminstrationVM.DoseUOM = String.Empty;
                this.objPGDAdminstrationVM.IsDoseMandatory = false;
                this.objPGDAdminstrationVM.IsRateMandatory = false;
                this.objPGDAdminstrationVM.WitnessBy = String.Empty;
                this.objPGDAdminstrationVM.WitnessByOID = String.Empty;
                this.objPGDAdminstrationVM.AdministeredBy = String.Empty;
                this.objPGDAdminstrationVM.AdministeredByOID = String.Empty;
                this.chkNoWitness.IsChecked = false;
                this.sfsWitnessedby.ClearAll();
                this.iSFSAdministeredby.ClearAll();
                this.txtDose.IsEnabled = false;
                this.SetEnableDisable(false);
            }
            iBusyIndicator.Stop("ConflictHelper");
        }
    }
    ShowParacetamolCumulativeWarning(msgEventHandler: Function): void {
        let errMsg: string = String.Format(Resource.RecordPGD.CumulativeIconErrMsg1, this.objPGDListVM.ParacetamolAdministeredCount.ToString()) + "\n\n" + Resource.RecordPGD.CumulativeIconErrMsg2;
        let iMsgBoxParaCumulative: iMessageBox = new iMessageBox();
        iMsgBoxParaCumulative.Title = "Lorenzo";
        iMsgBoxParaCumulative.IconType = MessageBoxType.Exclamation;
        iMsgBoxParaCumulative.MessageBoxClose  = (s,e) => { msgEventHandler(s,e); } ;
        iMsgBoxParaCumulative.Message = errMsg;
        iMsgBoxParaCumulative.PlaceIconCenter = true;
        // iMsgBoxParaCumulative.Width = 420;
        iMsgBoxParaCumulative.Height = 200;
        iMsgBoxParaCumulative.MessageButton = MessageBoxButton.YesNo;
        iMsgBoxParaCumulative.Show();
        this.ParacetamolPGDadminOkClickBeingValidated = 0;
    }
    iMsgBoxServicePoint_MessageBoxClose(sender: Object, e: MessageEventArgs): void {
        if (e.MessageBoxResult == MessageBoxResult.Yes) {
            this.ParacetamolAlreadyAdministeredWarning_Displayed = true;
            if (this.ParacetamolPGDadminOkClickBeingValidated > 0) {
                this.ParacetamolPGDadminOkClickBeingValidated = 0;
                if (this.objPGDListVM.IsParacetamolIngredient && this.objPGDListVM.ParacetamolAdministeredCount > 3) {
                   // this.ShowParacetamolCumulativeWarning(new EventHandler<MessageEventArgs>(this.iMsgBoxRole_MessageBoxClose));
                      this.ShowParacetamolCumulativeWarning((o,e)=>{
                        this.iMsgBoxServicePoint_MessageBoxClose(o,e)
                      });
                return
                }
            }
            if (this.objPGDListVM.IngredientWarning != null && this.objPGDListVM.IngredientWarning.Count > 0) {
                this.lblIngredientWarnMsg.Text = String.Join("\n", this.objPGDListVM.IngredientWarning.ToArray());
                this.brdHeader.Visibility = Visibility.Visible;
                this.txtComments.Height = 90;
            }
           // this.objPGDAdminstrationVM.CurrentMedicationCompleted -= new PGDAdminstrationVM.delgCurrentMedication(objPGDAdminstrationVM_GetCurrentMedicationCompleted_ServicePoint);
            this.objPGDAdminstrationVM.CurrentMedicationCompleted  = (s,e) => { this.objPGDAdminstrationVM_GetCurrentMedicationCompleted_ServicePoint(); } ;
            this.objPGDAdminstrationVM.GetCurrentMedication();
          //  this.objPGDAdminstrationVM.WarningsGenerationCompleted -= new PGDAdminstrationVM.WarningsGenerated(WarningGeneration_Completed);
            this.objPGDAdminstrationVM.WarningsGenerationCompleted  = (s,e) => { this.WarningGeneration_Completed(s,e); } ;
        }
        else {
            iBusyIndicator.Stop("ConflictHelper");
            this.ClearAll();
        }
    }
    private ClearAll(): void {
        this.oDrugItem = new DrugItem();
        this.oHdrAddnlInfo = new CDrugHdrAddnlInfo();
        this.oDrugItem.Drugname = String.Empty;
        this.oDrugItem.Dose = String.Empty;
        this.oDrugItem.DoseLabel = MedsAdminChartToolTip.DoseText;
        this.oDrugItem.RouteLabel = CConstants.PGDDrug;
        this.objPGDAdminstrationVM.AdministrationDate = DateTime.MinValue;
        this.objPGDAdminstrationVM.AdministrationTime = this.CurrentDTTM.Date;
        this.objPGDAdminstrationVM.Comments = String.Empty;
        this.objPGDAdminstrationVM.BatchNo = String.Empty;
        this.tbGivenTime.Value = this.CurrentDTTM.Date;
        this.dtpGivenDate.IsEnabled = false;
        this.lblDose.IsEnabled = false;
        this.tbGivenTime.IsEnabled = false;
        this.lblGiven.Visibility = Visibility.Collapsed;
        this.oDrugItem.Route = String.Empty;
        this.oDrugItem.Tag = null;
        this.drgHeader.DataContext = Common.SetDrugHeaderContent(this.oDrugItem, this.oHdrAddnlInfo, this.drgHeader);
        this.nPrescriptionOID = 0;
        this.brdHeader.Visibility = Visibility.Collapsed;
        this.txtComments.Text = String.Empty;
        this.txtComments.Height = 100;
        this.ParacetamolAlreadyAdministeredWarning_Displayed = false;
        this.ParacetamolPGDadminOkClickBeingValidated = 0;
        this.objPGDAdminstrationVM.Rate = String.Empty;
        this.objPGDAdminstrationVM.RateUOM = String.Empty;
        this.objPGDAdminstrationVM.RateVisible = Visibility.Collapsed;
    }
    private ClearSFSAdm(): void {
        let oSelectedItems: List<CListItem> = new List<CListItem>();
        // let oItem: CListItem = new CListItem();
        // oItem.DisplayText = String.Empty;
        // oItem.Value = "0";
        // oSelectedItems.Add(oItem);
        this.iSFSAdministeredby.ItemsSource = oSelectedItems;
        this.iSFSAdministeredby.SelectedText = "";
        this.iSFSAdministeredby.SelectedValue = "0";
        this.objPGDAdminstrationVM.ExpiryDate = DateTime.MinValue.Date;
        this.dtpExpiryDate.IsEnabled = false;
        this.objPGDAdminstrationVM.AdministrationDate = DateTime.MinValue;
        this.objPGDAdminstrationVM.AdministrationTime = this.CurrentDTTM.Date;
        this.tbGivenTime.Value = this.CurrentDTTM.Date;
        this.chkNoWitness.IsChecked = false;
        this.sfsWitnessedby.SelectedText = "";
        this.sfsWitnessedby.SelectedValue = "0";
        this.txtDose.IsEnabled = false;
        this.txtDose.Text = String.Empty;
        this.lblDose.IsEnabled = false;
        this.lblDoseUOM.Text = String.Empty;
        this.txtRate.Text = String.Empty;
        this.lblRateUOM.Text = String.Empty;
        this.txtBatchNo.IsEnabled = false;
        this.dtpGivenDate.SetDateString(String.Empty);
        this.iSFSAdministeredby.IsEnabled = false;
        this.chkNoWitness.IsEnabled = false;
        this.sfsWitnessedby.IsEnabled = false;
        this.txtComments.IsEnabled = false;
        this.txtComments.Text = String.Empty;
    }
    objPGDAdminstrationVM_GetCurrentMedicationCompleted_ServicePoint(): void {
        let objAddedMed: ObservableCollection<IPPManagePrescSer.DecisionSupportBasicCriteria> = new ObservableCollection<IPPManagePrescSer.DecisionSupportBasicCriteria>();
        let dsCurrItem: IPPManagePrescSer.DecisionSupportBasicCriteria = new IPPManagePrescSer.DecisionSupportBasicCriteria();
        dsCurrItem.DrugItem = new IPPManagePrescSer.DrugBasicData();
        dsCurrItem.DrugItem.IdentifyingName = (!String.IsNullOrEmpty(this.objPGDListVM.PrescribableItem)) ? this.objPGDListVM.PrescribableItem : String.Empty;
        dsCurrItem.DrugItem.IdentifyingOID = (this.objPGDListVM.IdentifyingOID > 0) ? this.objPGDListVM.IdentifyingOID : 0;
        dsCurrItem.DrugItem.IdentifyingType = (!String.IsNullOrEmpty(this.objPGDListVM.IdentifyingType)) ? this.objPGDListVM.IdentifyingType : String.Empty;
        dsCurrItem.DrugItem.MCVersionNo = (!String.IsNullOrEmpty(this.objPGDListVM.McVersionNo)) ? this.objPGDListVM.McVersionNo : String.Empty;
        dsCurrItem.DrugItem.ItemType = (!String.IsNullOrEmpty(this.objPGDListVM.ItemType)) ? this.objPGDListVM.ItemType : String.Empty;
        dsCurrItem.DrugItem.LorenzoID = (!String.IsNullOrEmpty(this.objPGDListVM.LorenzoID)) ? this.objPGDListVM.LorenzoID : String.Empty;
        dsCurrItem.DrugItem.ITMSUBTYP = (!String.IsNullOrEmpty(this.objPGDListVM.ItemSubType)) ? this.objPGDListVM.ItemSubType : String.Empty;
        this.CurrentDTTM = CommonBB.GetServerDateTime();
        dsCurrItem.StartDate = this.CurrentDTTM;
        dsCurrItem.EndDate = this.CurrentDTTM;
        dsCurrItem.RowID = "0";
        dsCurrItem.PrescriptionType = "CC_FOR_ADMIN";
        dsCurrItem.PrescriptionDTTM = this.CurrentDTTM;
        objAddedMed.Add(dsCurrItem);
        if (String.Compare(this.objPGDListVM.ItemSubType, CConstants.ItemSubType, StringComparison.OrdinalIgnoreCase) == 0) {
            if (this.objPGDListVM.Multicompoentndetails != null) {
                if (this.objPGDListVM.Multicompoentndetails.Count > 0) {
                    for (let ncount: number = 0; ncount < this.objPGDListVM.Multicompoentndetails.Count; ncount++) {
                        let dsCurrItems: IPPManagePrescSer.DecisionSupportBasicCriteria = new IPPManagePrescSer.DecisionSupportBasicCriteria();
                        dsCurrItems.DrugItem = new IPPManagePrescSer.DrugBasicData();
                        dsCurrItems.DrugItem.IdentifyingOID = this.objPGDListVM.Multicompoentndetails[ncount].IdentifyingOID;
                        dsCurrItems.DrugItem.IdentifyingType = this.objPGDListVM.Multicompoentndetails[ncount].IdentifyingType;
                        dsCurrItems.DrugItem.LorenzoID = this.objPGDListVM.Multicompoentndetails[ncount].LorenzoID;
                        dsCurrItems.DrugItem.IdentifyingName = this.objPGDListVM.Multicompoentndetails[ncount].ComponentName;
                        dsCurrItems.DrugItem.ConflictUniqueId = "CC_UNIQUEID";
                        dsCurrItems.DrugItem.ITMSUBTYP = this.objPGDListVM.ItemSubType;
                        dsCurrItems.DrugItem.PrescribableItemListOID = this.objPGDListVM.Multicompoentndetails[ncount].PrescribableItemListOID;
                        dsCurrItems.DrugItem.UniqueMCRowID = this.objPGDListVM.Multicompoentndetails[ncount].UniqueMCRowID;
                        dsCurrItems.DrugItem.NonCatItemReason = this.objPGDListVM.PrescribableItem;
                        objAddedMed.Add(dsCurrItems);
                    }
                }
            }
        }
        if (this.objPGDAdminstrationVM != null) {
            this.objPGDAdminstrationVM.GetWarningsForCurrentItem(objAddedMed);
        }
    }
    objPGDConflictsChildWindow_Closed(args: AppDialogEventargs): void {
        this.oChildWindow = args.AppChildWindow;
        if (args.Content != null)
            this.objPGDConflictsChildWindow = ObjectHelper.CreateType<PGDConflictsChild>(args.Content, PGDConflictsChild); // xaml file dependency
        if (args.Result == AppDialogResult.Ok) {
            this.oChildWindow.DialogResult = true;
        }
        else if (args.Result == AppDialogResult.Cancel) {
            this.ClearAll();
            this.ClearSFSAdm();
            this.oChildWindow.DialogResult = true;
        }
    }
    private SetDefaultValues(): void {
        this.iSFSAdministeredby.GetSFSItems("cp");
        this.GetLoggedOnUser();
        this.objPGDAdminstrationVM.AdministrationTime = this.CurrentDTTM;
        this.tbGivenTime.Value = this.objPGDAdminstrationVM.AdministrationTime;
        this.dtpExpiryDate.SelectedDateTime = DateTime.MinValue;
        this.dtpExpiryDate.IsConstrainEntry = false;
        this.dtpExpiryDate.RangeStartDate = this.CurrentDTTM.Date;
        this.dtpExpiryDate.RangeEndDate = DateTime.MaxValue.DateTime.AddDays(-1);
        this.dtpExpiryDate.IsConstrainEntry = true;
        this.lblGiven.Visibility = Visibility.Visible;
        this.chkNoWitness.IsChecked = false;
        this.sfsWitnessedby.SelectedText = "";
        this.sfsWitnessedby.SelectedValue = "0";
        this.txtBatchNo.Text = String.Empty;
        this.txtComments.Text = String.Empty;
        if (this.objPGDListVM != null) {
            if (!String.IsNullOrEmpty(this.objPGDListVM.Comments)) {
                this.txtComments.Text = this.objPGDListVM.Comments;
                this.objPGDAdminstrationVM.Comments = this.objPGDListVM.Comments;
            }
            else {
                this.txtComments.Text = String.Empty;
                this.objPGDAdminstrationVM.Comments = String.Empty;
            }
        }
    }
    private GetLoggedOnUser(): void {
        Busyindicator.SetStatusBusy("LoadUser");
        let objService: CSecurityManagementServiceWSSoapClient = new CSecurityManagementServiceWSSoapClient();
        objService.GetUserCompleted  = (s,e) => { this.objService_GetUserCompleted(s,e); } ;
        let objReq: CReqMsgGetUser = new CReqMsgGetUser();
        objReq.oContextInformation = CommonBB.FillContext();
        objReq.lUserOIDBC = Convert.ToInt64(AppContextInfo.UserOID);
        objService.GetUserAsync(objReq);
    }
    objService_GetUserCompleted(sender: Object, e: GetUserCompletedEventArgs): void {
        if (e.Result != null) {
            let objRes: CResMsgGetUser = e.Result;
            if (objRes != null && objRes.objEnterpriseObject != null && !String.IsNullOrEmpty(objRes.objEnterpriseObject.SurName)) {
                this.strLoggedOnUserName = objRes.objEnterpriseObject.SurName;
                if (!String.IsNullOrEmpty(objRes.objEnterpriseObject.ForeName)) {
                    this.strLoggedOnUserName += " ";
                    this.strLoggedOnUserName += objRes.objEnterpriseObject.ForeName;
                }
                if (this.iSFSAdministeredby.ItemsSource != null) {
                    // this.objPGDAdminstrationVM.AdministeredByList = (<List<CListItem>>this.iSFSAdministeredby.ItemsSource).ToList();
                    this.objPGDAdminstrationVM.AdministeredByList = new ObservableCollection<CListItem>((<List<CListItem>>this.iSFSAdministeredby.ItemsSource).ToList());
                    this.objPGDAdminstrationVM._AdministeredList = new ObservableCollection<CListItem>((<List<CListItem>>this.iSFSAdministeredby.ItemsSource).ToList());
                }
                if (this.objPGDAdminstrationVM.AdministeredByList == null) {
                    this.objPGDAdminstrationVM.AdministeredByList = new ObservableCollection<CListItem>();
                    this.objPGDAdminstrationVM._AdministeredList = new ObservableCollection<CListItem>();
                }
                let _IsExist: boolean = this.objPGDAdminstrationVM.AdministeredByList.Any(x => x.Value == AppContextInfo.UserOID);
                if (!_IsExist) {
                    this.objPGDAdminstrationVM.AdministeredByList.Add(ObjectHelper.CreateObject(new CListItem(), { DisplayText: this.strLoggedOnUserName, Value: AppContextInfo.UserOID }));
                    // this.objPGDAdminstrationVM.AdministeredBy = this.strLoggedOnUserName;
                    // this.objPGDAdminstrationVM.AdministeredByOID = AppContextInfo.UserOID;
                    this.objPGDAdminstrationVM._AdministeredList.Add(ObjectHelper.CreateObject(new CListItem(), { DisplayText: this.strLoggedOnUserName, Value: AppContextInfo.UserOID }));
                }
                this.objPGDAdminstrationVM.AdministeredBy = this.strLoggedOnUserName;
                this.objPGDAdminstrationVM.AdministeredByOID = AppContextInfo.UserOID;
                this.objPGDAdminstrationVM.WitnessByList = new ObservableCollection<CListItem>(this.objPGDAdminstrationVM.AdministeredByList);
                this.iSFSAdministeredby.ItemsSource = this.objPGDAdminstrationVM.AdministeredByList;
                this.iSFSAdministeredby.SelectedText = this.objPGDAdminstrationVM.AdministeredBy;
                this.iSFSAdministeredby.SelectedValue = this.objPGDAdminstrationVM.AdministeredByOID;
                this.iSFSAdministeredby.GetSFSItems("cp");
                this.sfsWitnessedby.GetSFSItems("cp");
            }
        }
        this.GetWitnessRequired();
        Busyindicator.SetStatusIdle("LoadUser");
    }
    grdPGDListRole_onCellClick(sender: Object, args: GridViewCellClickEventArgs): void {
        this.brdHeader.Visibility = Visibility.Collapsed;
        this.txtComments.Height = 100;
        if (this.grdPGDListRole.GetColumnIndexByName("SlctColumn") == args.ColumnIndex) {
            //this.objPGDAdminstrationVM.OnWitnessUserSelected -= new PGDAdminstrationVM.WitnessUserSelectedDlgt(ValidateUser);
            this.objPGDAdminstrationVM.OnWitnessUserSelected  = (s) => { this.ValidateUser(s); } ;
            //this.objPGDAdminstrationVM.OnAdministratedUserSelectedEvent -= ValidateUser;
            this.objPGDAdminstrationVM.OnAdministratedUserSelectedEvent  = (s) => { this.ValidateUser(s); } ;
            this.objPGDAdminstrationVM.IsUpdatedWarning = false;
            this.objPGDListVM = ObjectHelper.CreateType<PGDListVM>(this.grdPGDListRole.GetRowData(args.RowIndex), PGDListVM);
            if (this.objPGDListVM != null) {
                this.ParacetamolPGDadminOkClickBeingValidated = 0;
                this.ParacetamolAlreadyAdministeredWarning_Displayed = false;
                if (this.objPGDListVM.IsParacetamolIngredient) {
                    let oSlotHelper: SlotAdministrationHelper = new SlotAdministrationHelper();
                    //oSlotHelper.TriggerParacetamolWarningEvent -= oSlotHelper_TriggerParacetamolWarningEvent;
                    oSlotHelper.TriggerParacetamolWarningEvent  = (s) => { this.oSlotHelper_TriggerParacetamolWarningEvent(s); } ;
                    oSlotHelper.IsAnyParacetamolAdministered(CommonBB.GetServerDateTime(), 0);
                    Busyindicator.SetStatusBusy("CheckParaAdministered");
                    this.ParacetamolPGDadminOkClickBeingValidated = 2;
                }
                else {
                    if (this.objPGDListVM.IngredientWarning != null && this.objPGDListVM.IngredientWarning.Count > 0) {
                        this.lblIngredientWarnMsg.Text = String.Join("\n", this.objPGDListVM.IngredientWarning.ToArray());
                        this.brdHeader.Visibility = Visibility.Visible;
                        this.txtComments.Height = 90;
                    }
                   // this.objPGDAdminstrationVM.CurrentMedicationCompleted -= new PGDAdminstrationVM.delgCurrentMedication(objPGDAdminstrationVM_GetCurrentMedicationCompleted_Role);
                    this.objPGDAdminstrationVM.CurrentMedicationCompleted  = () => { this.objPGDAdminstrationVM_GetCurrentMedicationCompleted_Role(); } ;
                    this.objPGDAdminstrationVM.GetCurrentMedication();
                   // this.objPGDAdminstrationVM.WarningsGenerationCompleted -= new PGDAdminstrationVM.WarningsGenerated(WarningGeneration_Completed);
                    this.objPGDAdminstrationVM.WarningsGenerationCompleted  = (s,e) => { this.WarningGeneration_Completed(s,e); } ;
                   // this.objPGDAdminstrationVM.OnErrorEvent -= new PGDAdminstrationVM.ErrorEventArgs(Pgdlist_OnErrorEvent);
                    this.objPGDAdminstrationVM.OnErrorEvent  = (s) => { this.Pgdlist_OnErrorEvent(s); } ;
                }
                this.lnRouteOID = this.objPGDListVM.RouteOID;
                this.strLorenzoID = this.objPGDListVM.LorenzoID;
            }
        }
    }
    iMsgBoxRole_MessageBoxClose(sender: Object, e: MessageEventArgs): void {
        if (e.MessageBoxResult == MessageBoxResult.Yes) {
            this.ParacetamolAlreadyAdministeredWarning_Displayed = true;
            if (this.ParacetamolPGDadminOkClickBeingValidated > 0) {
                this.ParacetamolPGDadminOkClickBeingValidated = 0;
                if (this.objPGDListVM.IsParacetamolIngredient && this.objPGDListVM.ParacetamolAdministeredCount > 3) {
                 //  this.ShowParacetamolCumulativeWarning(new EventHandler<MessageEventArgs>(this.iMsgBoxRole_MessageBoxClose));
                    this.ShowParacetamolCumulativeWarning((o,e)=>((sender: any, e: MessageEventArgs)=>{this.iMsgBoxRole_MessageBoxClose(o,e)}))
                    return
                }
            }
            if (this.objPGDListVM.IngredientWarning != null && this.objPGDListVM.IngredientWarning.Count > 0) {
                this.lblIngredientWarnMsg.Text = String.Join("\n", this.objPGDListVM.IngredientWarning.ToArray());
                this.brdHeader.Visibility = Visibility.Visible;
                this.txtComments.Height = 90;
            }
           // this.objPGDAdminstrationVM.CurrentMedicationCompleted -= new PGDAdminstrationVM.delgCurrentMedication(objPGDAdminstrationVM_GetCurrentMedicationCompleted_Role);
            this.objPGDAdminstrationVM.CurrentMedicationCompleted  = (s,e) => { this.objPGDAdminstrationVM_GetCurrentMedicationCompleted_Role(); } ;
            this.objPGDAdminstrationVM.GetCurrentMedication();
            //this.objPGDAdminstrationVM.WarningsGenerationCompleted -= new PGDAdminstrationVM.WarningsGenerated(WarningGeneration_Completed);
            this.objPGDAdminstrationVM.WarningsGenerationCompleted  = (s,e) => { this.WarningGeneration_Completed(s,e); } ;
        }
        else {
            iBusyIndicator.Stop("ConflictHelper");
            this.ClearAll();
        }
    }
    objPGDAdminstrationVM_GetCurrentMedicationCompleted_Role(): void {
        let objAddedMed: ObservableCollection<IPPManagePrescSer.DecisionSupportBasicCriteria> = new ObservableCollection<IPPManagePrescSer.DecisionSupportBasicCriteria>();
        let dsCurrItem: IPPManagePrescSer.DecisionSupportBasicCriteria = new IPPManagePrescSer.DecisionSupportBasicCriteria();
        dsCurrItem.DrugItem = new IPPManagePrescSer.DrugBasicData();
        dsCurrItem.DrugItem.IdentifyingName = (!String.IsNullOrEmpty(this.objPGDListVM.PrescribableItem)) ? this.objPGDListVM.PrescribableItem : String.Empty;
        dsCurrItem.DrugItem.IdentifyingOID = (this.objPGDListVM.IdentifyingOID > 0) ? this.objPGDListVM.IdentifyingOID : 0;
        dsCurrItem.DrugItem.IdentifyingType = (!String.IsNullOrEmpty(this.objPGDListVM.IdentifyingType)) ? this.objPGDListVM.IdentifyingType : String.Empty;
        dsCurrItem.DrugItem.MCVersionNo = (!String.IsNullOrEmpty(this.objPGDListVM.McVersionNo)) ? this.objPGDListVM.McVersionNo : String.Empty;
        dsCurrItem.DrugItem.ItemType = (!String.IsNullOrEmpty(this.objPGDListVM.ItemType)) ? this.objPGDListVM.ItemType : String.Empty;
        dsCurrItem.DrugItem.LorenzoID = (!String.IsNullOrEmpty(this.objPGDListVM.LorenzoID)) ? this.objPGDListVM.LorenzoID : String.Empty;
        dsCurrItem.DrugItem.ITMSUBTYP = (!String.IsNullOrEmpty(this.objPGDListVM.ItemSubType)) ? this.objPGDListVM.ItemSubType : String.Empty;
        this.CurrentDTTM = CommonBB.GetServerDateTime();
        dsCurrItem.StartDate = this.CurrentDTTM;
        dsCurrItem.EndDate = this.CurrentDTTM;
        dsCurrItem.RowID = "0";
        dsCurrItem.PrescriptionType = "CC_FOR_ADMIN";
        dsCurrItem.PrescriptionDTTM = this.CurrentDTTM;
        objAddedMed.Add(dsCurrItem);
        if (String.Compare(this.objPGDListVM.ItemSubType, CConstants.ItemSubType, StringComparison.OrdinalIgnoreCase) == 0) {
            if (this.objPGDListVM.Multicompoentndetails != null) {
                if (this.objPGDListVM.Multicompoentndetails.Count > 0) {
                    for (let ncount: number = 0; ncount < this.objPGDListVM.Multicompoentndetails.Count; ncount++) {
                        let dsCurrItems: IPPManagePrescSer.DecisionSupportBasicCriteria = new IPPManagePrescSer.DecisionSupportBasicCriteria();
                        dsCurrItems.DrugItem = new IPPManagePrescSer.DrugBasicData();
                        dsCurrItems.DrugItem.IdentifyingOID = this.objPGDListVM.Multicompoentndetails[ncount].IdentifyingOID;
                        dsCurrItems.DrugItem.IdentifyingType = this.objPGDListVM.Multicompoentndetails[ncount].IdentifyingType;
                        dsCurrItems.DrugItem.LorenzoID = this.objPGDListVM.Multicompoentndetails[ncount].LorenzoID;
                        dsCurrItems.DrugItem.IdentifyingName = this.objPGDListVM.Multicompoentndetails[ncount].ComponentName;
                        dsCurrItems.DrugItem.ConflictUniqueId = "CC_UNIQUEID";
                        dsCurrItems.DrugItem.ITMSUBTYP = this.objPGDListVM.ItemSubType;
                        dsCurrItems.DrugItem.PrescribableItemListOID = this.objPGDListVM.Multicompoentndetails[ncount].PrescribableItemListOID;
                        dsCurrItems.DrugItem.UniqueMCRowID = this.objPGDListVM.Multicompoentndetails[ncount].UniqueMCRowID;
                        dsCurrItems.DrugItem.NonCatItemReason = this.objPGDListVM.PrescribableItem;
                        objAddedMed.Add(dsCurrItems);
                    }
                }
            }
        }
        if (this.objPGDAdminstrationVM != null) {
            this.objPGDAdminstrationVM.GetWarningsForCurrentItem(objAddedMed);
        }
    }
    private WarningGeneration_Completed(objWarningItem: IPPManagePrescSer.WarningItems, warningDetails: ObservableCollection<WarningDetails>): void {
        if (this.objPGDListVM != null) {
            this.oDrugItem = new DrugItem();
            this.oHdrAddnlInfo = new CDrugHdrAddnlInfo();
            this.oDrugItem.Drugname = this.objPGDListVM.PrescribableItem;
            if (!String.IsNullOrEmpty(this.objPGDListVM.PrescribableItem) && !String.IsNullOrEmpty(this.objPGDListVM.DosageForm)) {
                this.oDrugItem.Drugname = this.objPGDListVM.PrescribableItem + " - " + this.objPGDListVM.DosageForm;
            }
            this.oDrugItem.Dose = this.GetDoseDetails();
            this.oDrugItem.DoseLabel = MedsAdminChartToolTip.DoseText;
            this.oDrugItem.RouteLabel = MedsAdminChartToolTip.ROUTEText;
            if (String.Compare(this.objPGDListVM.IsControlledDrug, "1", StringComparison.InvariantCultureIgnoreCase) == 0) {
                this.oDrugItem.DrugPropertyIcon = new ChartIcon();
                this.oDrugItem.DrugPropertyIcon.Key = "Controlled Drug";
            }
            this.oDrugItem.Route = (this.objPGDListVM.Route != null) ? this.objPGDListVM.Route : String.Empty;
            let oTagDrugHeaderDetail: TagDrugHeaderDetail = new TagDrugHeaderDetail();
            oTagDrugHeaderDetail.DrugName = this.objPGDListVM.PrescribableItem;
            oTagDrugHeaderDetail.ProductForm = this.objPGDListVM.DosageForm;
            oTagDrugHeaderDetail.ItemSubType = this.objPGDListVM.ItemSubType;
            oTagDrugHeaderDetail.MultiComponentItems = this.objPGDListVM.MultiComponentItems;
            if ((ProfileData.InfusionPresConfig != null && ProfileData.InfusionPresConfig.IsEnablePrescInfus) && this.objPGDListVM.InfusionDetails != null && this.objPGDListVM.InfusionDetails.IsInfusion) {
                oTagDrugHeaderDetail.Rate = this.objPGDListVM.InfusionDetails.Rate;
                if (this.objPGDListVM.InfusionDetails.InfRateNumeratorUom != null && !String.IsNullOrEmpty(this.objPGDListVM.InfusionDetails.InfRateNumeratorUom.DisplayText))
                    oTagDrugHeaderDetail.RateNumeratorUOM = this.objPGDListVM.InfusionDetails.InfRateNumeratorUom.DisplayText;
                if (this.objPGDListVM.InfusionDetails.InfRateNumeratorUom != null && !String.IsNullOrEmpty(this.objPGDListVM.InfusionDetails.InfRateNumeratorUom.Value)) {
                    oTagDrugHeaderDetail.RateNumeratorUOMOID = Convert.ToInt64(this.objPGDListVM.InfusionDetails.InfRateNumeratorUom.Value);
                }
                if (this.objPGDListVM.InfusionDetails.InfRateDinominatorUom != null && !String.IsNullOrEmpty(this.objPGDListVM.InfusionDetails.InfRateDinominatorUom.DisplayText))
                    oTagDrugHeaderDetail.RateDinominatorUOM = this.objPGDListVM.InfusionDetails.InfRateDinominatorUom.DisplayText;
                if (this.objPGDListVM.InfusionDetails.InfRateDinominatorUom != null && !String.IsNullOrEmpty(this.objPGDListVM.InfusionDetails.InfRateDinominatorUom.Value)) {
                    oTagDrugHeaderDetail.RateDinominatorUOMOID = Convert.ToInt64(this.objPGDListVM.InfusionDetails.InfRateDinominatorUom.Value);
                }
            }
            oTagDrugHeaderDetail.IsPGD = true;
            if (String.Compare(this.objPGDListVM.IsControlledDrug, "1", StringComparison.InvariantCultureIgnoreCase) == 0) {
                oTagDrugHeaderDetail.IsControlDrug = true;
            }
            this.oDrugItem.Tag = oTagDrugHeaderDetail;
            this.drgHeader.DataContext = Common.SetDrugHeaderContent(this.oDrugItem, this.oHdrAddnlInfo, this.drgHeader);
            this.nPrescriptionOID = this.objPGDListVM.PgdListDetailOID;
            if (this.objPGDAdminstrationVM != null)
                this.objPGDAdminstrationVM.nPrescriptionOID = this.nPrescriptionOID;
            this.SetEnableDisable(true);
            this.objPGDAdminstrationVM.DoseUOM = this.objPGDListVM.DoseUOM.Name;
            let UDose: number = 0;
            let LDose: number = 0;
            if (!String.IsNullOrEmpty(this.objPGDListVM.UpperDose)) {
                Number.TryParse(this.objPGDListVM.UpperDose, (o)=>{
                    UDose=o;
                });
            }
            if (!String.IsNullOrEmpty(this.objPGDListVM.DoseValue)) {
                Number.TryParse(this.objPGDListVM.DoseValue, (o)=>{
                    LDose=o;
                });
            }
            if (UDose > 0) {
                this.lblDose.IsEnabled = true;
                this.txtDose.IsEnabled = true;
                if (this.objPGDListVM != null) {
                    if (!String.IsNullOrEmpty(this.objPGDListVM.DoseUOM.Name)) {
                        this.lblDoseUOM.Text = this.objPGDListVM.DoseUOM.Name;
                    }
                    else {
                        this.lblDoseUOM.Text = String.Empty;
                    }
                }
                this.objPGDAdminstrationVM.IsDoseEnabled = true;
                this.objPGDAdminstrationVM.IsDoseMandatory = true;
                this.objPGDAdminstrationVM.Dose = String.Empty;
                this.objPGDAdminstrationVM.LowerDose = this.objPGDListVM.DoseValue;
                this.objPGDAdminstrationVM.UpperDose = this.objPGDListVM.UpperDose;
            }
            else if (LDose > 0) {
                this.lblDose.IsEnabled = false;
                if (this.objPGDListVM != null) {
                    if (!String.IsNullOrEmpty(this.objPGDListVM.DoseValue)) {
                        this.txtDose.Text = this.objPGDListVM.DoseValue;
                    }
                    else {
                        this.txtDose.Text = String.Empty;
                    }
                    if (!String.IsNullOrEmpty(this.objPGDListVM.DoseUOM.Name)) {
                        this.lblDoseUOM.Text = this.objPGDListVM.DoseUOM.Name;
                    }
                    else {
                        this.lblDoseUOM.Text = String.Empty;
                    }
                }
                this.objPGDAdminstrationVM.IsDoseEnabled = false;
                this.objPGDAdminstrationVM.IsDoseMandatory = false;
                this.objPGDAdminstrationVM.Dose = this.objPGDListVM.DoseValue;
                this.objPGDAdminstrationVM.LowerDose = this.objPGDListVM.DoseValue;
                this.objPGDAdminstrationVM.UpperDose = "0";
            }
            if ((this.objPGDListVM.ObjAdminMethod != null) && !String.IsNullOrEmpty(this.objPGDListVM.ObjAdminMethod.Name)) {
                this.lblDose.IsEnabled = false;
                this.objPGDAdminstrationVM.IsDoseEnabled = false;
                this.objPGDAdminstrationVM.IsDoseMandatory = false;
                this.objPGDAdminstrationVM.Dose = String.Empty;
            }
            this.objPGDAdminstrationVM.IsRateEnabled = false;
            this.objPGDAdminstrationVM.IsSingleActionChecked = this.objPGDListVM.IsSingleActionMedChart;
            this.objPGDAdminstrationVM.Rate = String.Empty;
            this.objPGDAdminstrationVM.RateUOM = String.Empty;
            this.objPGDAdminstrationVM.RateVisible = Visibility.Collapsed;
            if ((ProfileData.InfusionPresConfig != null && ProfileData.InfusionPresConfig.IsEnablePrescInfus)) {
                if (this.objPGDListVM.InfusionDetails != null && this.objPGDListVM.InfusionDetails.IsInfusion && !String.IsNullOrEmpty(this.objPGDListVM.InfusionDetails.Rate)) {
                    this.objPGDAdminstrationVM.RateVisible = Visibility.Visible;
                    this.objPGDAdminstrationVM.Rate = this.objPGDListVM.InfusionDetails.Rate;
                    let InfRateUOM: string = String.Empty;
                    if (this.objPGDListVM.InfusionDetails.InfRateNumeratorUom != null && !String.IsNullOrEmpty(this.objPGDListVM.InfusionDetails.InfRateNumeratorUom.DisplayText)) {
                        InfRateUOM = this.objPGDListVM.InfusionDetails.InfRateNumeratorUom.DisplayText;
                        if (this.objPGDListVM.InfusionDetails.InfRateDinominatorUom != null && !String.IsNullOrEmpty(this.objPGDListVM.InfusionDetails.InfRateDinominatorUom.DisplayText)) {
                            if(InfRateUOM.Contains("/")){
                                InfRateUOM = InfRateUOM + "/" + "\n" + this.objPGDListVM.InfusionDetails.InfRateDinominatorUom.DisplayText;
                                this.objPGDAdminstrationVM.RateUOM = InfRateUOM;
                            }else{
                                InfRateUOM = InfRateUOM + "/" + this.objPGDListVM.InfusionDetails.InfRateDinominatorUom.DisplayText;
                                this.objPGDAdminstrationVM.RateUOM = InfRateUOM;
                            }                           
                        }
                    }
                    this.objPGDAdminstrationVM.IsRateEnabled = false;
                    this.objPGDAdminstrationVM.IsRateMandatory = false;
                }
                else {
                    this.objPGDAdminstrationVM.RateUOM = String.Empty;
                    this.objPGDAdminstrationVM.Rate = String.Empty;
                    this.objPGDAdminstrationVM.RateVisible = Visibility.Collapsed;
                }
            }
            else {
                this.objPGDAdminstrationVM.IsSingleActionChecked = this.objPGDListVM.IsSingleActionMedChart = true;
            }
            if (this.objPGDAdminstrationVM != null && this.objPGDAdminstrationVM.AdministrationDate != null) {
                 this.objPGDAdminstrationVM.AdministrationDate = this.CurrentDTTM;
            }
            this.SetDefaultValues();
            if (this.objPGDAdminstrationVM.IsType) {
                this.conflictHelper = new ConflictsHelper();
                this.conflictHelper.OnConflictsAcknowledged = (s,e) => {
                    this.conflictHelper_OnConflictsAcknowledged(s,e);
                };
                this.conflictHelper.ShowConflicts(objWarningItem, warningDetails);
                this.ParacetamolAlreadyAdministeredWarning_Displayed = true;
            }
            else {
                iBusyIndicator.Stop("ConflictHelper");
            }
        }
    }
    conflictHelper: ConflictsHelper;
    conflictHelper_OnConflictsAcknowledged(IsOkClicked: boolean, conflicts: ConflictAcknowledge[]): void {
      //  this.conflictHelper.OnConflictsAcknowledged -= conflictHelper_OnConflictsAcknowledged;
        let currentConflicts = IsOkClicked.HasValue && IsOkClicked.Value ? conflicts : null;
        this.objPGDAdminstrationVM.ConflictAck = currentConflicts;
        if (!IsOkClicked.HasValue || !IsOkClicked.Value) {
            this.objPGDAdminstrationVM.IsDoseMandatory = false;
            this.ClearAll();
            this.ClearSFSAdm();
        }
    }
    RecordPGD_Loaded(): void {
        if (this.appDialog == null) {
            this.pnlBar.Width = (this.LayoutRoot.ActualWidth - 16) * 0.6;
            this.spDetails.Width = (this.LayoutRoot.ActualWidth - 16) * 0.35;
            this.grdPGDListServicePoint.Columns["PrescribableItem"].Width = this.pnlBar.Width - 163;
        }
        Busyindicator.SetStatusBusy("MN_RECORDPGD_P2");
        if (!String.IsNullOrEmpty(SLQueryCollection.GetQueryStringValue("MenuCode")) && String.Compare(SLQueryCollection.GetQueryStringValue("MenuCode"), "MN_RECORDPGD_P2", StringComparison.CurrentCultureIgnoreCase) == 0) {
            let objMedsAdminCommonData: MedsAdminCommonData = new MedsAdminCommonData();
            objMedsAdminCommonData.MedsAdminCommonDataCompleted  = () => { this.objMedsAdminCommonData_MedsAdminCommonDataCompleted(); } ;
            objMedsAdminCommonData.GetProfileConfigData();
        }
        else {
            this.objMedsAdminCommonData_MedsAdminCommonDataCompleted();
        }
        
    }
    private Pgdlist_OnErrorEvent(ContronID: string): void {
        if (String.IsNullOrEmpty(ContronID))
            return
        let ctrlToSetFocus: Object = this.FindName(ContronID);
        if (ctrlToSetFocus != null) {
            let ctrlType: Type = ObjectHelper.GetType(ctrlToSetFocus);
            if (ctrlType.Equals(/*typeof*/iTextBox)) {
                (ObjectHelper.CreateType<iTextBox>(ctrlToSetFocus, iTextBox)).Text = "";
                (ObjectHelper.CreateType<iTextBox>(ctrlToSetFocus, iTextBox)).Focus();
            }
            else if (ctrlType.Equals(/*typeof*/iSFS)) {
                (ObjectHelper.CreateType<iSFS>(ctrlToSetFocus, iSFS)).Focus();
            }
            else if (ctrlType.Equals(/*typeof*/iDateTimePicker)) {
                (ObjectHelper.CreateType<iDateTimePicker>(ctrlToSetFocus, iDateTimePicker)).Focus();
            }
        }
    }
    objMedsAdminCommonData_MedsAdminCommonDataCompleted(): void {
        this.brdHeader.Visibility = Visibility.Collapsed;
        this.txtComments.Height = 100;
        // if (this.objPGDAdminstrationVM == null)
        //     this.objPGDAdminstrationVM = ObjectHelper.CreateType<PGDAdminstrationVM>(this.DataContext, PGDAdminstrationVM);
        this.objPGDAdminstrationVM.GetAssociatedPGDListItem();
        if (!String.IsNullOrEmpty(SLQueryCollection.GetQueryStringValue("MenuCode")) && String.Compare(SLQueryCollection.GetQueryStringValue("MenuCode"), "MN_RECORDPGD_P2", StringComparison.CurrentCultureIgnoreCase) == 0) {
            this.objPGDAdminstrationVM.AdministrationDate = this.CurrentDTTM.Date;
        }
        else {
             this.dtpGivenDate.OnDateChangeEvent(this.CurrentDTTM.Date);
             this.tbGivenTime.onChange(this.CurrentDTTM.Date);             
             //this.dtpGivenDate.SelectedDateTime = this.CurrentDTTM.Date;
        }
        this.dtpGivenDate.IsConstrainEntry = true;
        this.dtpGivenDate.RangeStartDate = this.CurrentDTTM.DateTime.AddDays(-1).Date;
        this.dtpGivenDate.RangeEndDate = this.CurrentDTTM.Date;
        this.SetEnableDisable(false);
    }
   
    // iSFSAdministeredby_OnSFSOpen(sender: Object, e: RoutedEventArgs): void {
    //     this.objPGDAdminstrationVM.AdministeredByList = this.CPSFSOpen();
    //     this.objPGDAdminstrationVM._AdministeredList = new ObservableCollection<CListItem>(this.objPGDAdminstrationVM.AdministeredByList);
    //     if (this.objPGDAdminstrationVM.AdministeredByList != null && this.objPGDAdminstrationVM.AdministeredByList.Count > 0) {
    //         this.objPGDAdminstrationVM.AdministeredBy = this.objPGDAdminstrationVM.AdministeredByList[0].DisplayText;
    //         this.objPGDAdminstrationVM.AdministeredByOID = this.objPGDAdminstrationVM.AdministeredByList[0].Value;
    //         let lstItems: List<SLSFSItem> = new List<SLSFSItem>();
    //         this.objPGDAdminstrationVM.AdministeredByList.forEach( (lstItem)=> {
    //             lstItems.Add(ObjectHelper.CreateObject(new SLSFSItem(), { DisplayText: lstItem.DisplayText, DisplayValue: lstItem.Value, Sfskey: lstItem.Value, Sfstype: "cp" }));
    //             this.iSFSAdministeredby.AddSFSItems(lstItems);
    //         });
    //     }
    //     this.iSFSAdministeredby.GetSFSItems("cp");
    // }
    // private CPSFSOpen(): List<CListItem> {
    //     this.oParam = AppContextInfo.OrganisationName;
    //     let oSelectedItems: List<CListItem> = new List<CListItem>();
    //     let returnValue: ScriptObject = ObjectHelper.CreateType<ScriptObject>(HtmlPage.Window.Invoke("SFSCareProvider", this.oParam), ScriptObject);
    //     if (returnValue != null && returnValue.GetProperty("length") != null) {
    //         let nSelectCnt: number = Convert.ToInt32(returnValue.GetProperty("length"));
    //         let selectedValue: ScriptObject = ObjectHelper.CreateType<ScriptObject>(returnValue.GetProperty(0), ScriptObject);
    //         let oItem: CListItem = new CListItem();
    //         oItem.DisplayText = ObjectHelper.CreateType<string>(selectedValue.GetProperty("SurName"), 'string');
    //         if (!String.IsNullOrEmpty(ObjectHelper.CreateType<string>(selectedValue.GetProperty("ForeName"), 'string'))) {
    //             oItem.DisplayText += " ";
    //             oItem.DisplayText += selectedValue.GetProperty("ForeName");
    //         }
    //         oItem.Value = ObjectHelper.CreateType<string>(selectedValue.GetProperty("OId"), 'string');
    //         oSelectedItems.Add(oItem);
    //     }
    //     return oSelectedItems;
    // }
    //  sfsWitnessedby_OnSFSOpen(sender: Object, e: RoutedEventArgs): void {
    //     let objListItem: List<CListItem> = this.CPSFSOpen();
    //     if (objListItem != null && objListItem.Count > 0) {
    //         Common.AddSelItemIntoSFSQuickList(this.objPGDAdminstrationVM.WitnessByList, objListItem[0].Value, objListItem[0].DisplayText.Trim(), "cp", this.sfsWitnessedby);
    //         this.objPGDAdminstrationVM.WitnessByList = new ObservableCollection<CListItem>(this.objPGDAdminstrationVM.WitnessByList.OrderBy(oItem => oItem.DisplayText));
    //         this.objPGDAdminstrationVM.WitnessBy = objListItem[0].DisplayText.Trim();
    //         this.objPGDAdminstrationVM.WitnessByOID = objListItem[0].Value;
    //     }
    // }
    async iSFSAdministeredby_OnSFSOpen(e): Promise<void> {
        this.oParam = AppContextInfo.OrganisationName;
        var oSelectedItems: ObservableCollection<CListItem>  = new ObservableCollection<CListItem>();
        var returnValue: ScriptObject = <ScriptObject>(await HtmlPage.Window.InvokeAsync("SFSCareProvider", this.oParam) as ScriptObject);
        
        if(returnValue != null && returnValue.GetProperty("length") != null) {
            var nSelectCnt: number = Convert.ToInt32(returnValue.GetProperty("length"));
            var selectedValue: ScriptObject = <ScriptObject>(returnValue.GetProperty("0") as ScriptObject);
            var oItem: CListItem = new CListItem();
            oItem.DisplayText = <string>(selectedValue["SurName"] as string);
            if (!String.IsNullOrEmpty(<string>(selectedValue["ForeName"] as string))) {
                oItem.DisplayText += " ";
                oItem.DisplayText += selectedValue["ForeName"];
            }
            oItem.Value = <string>(selectedValue["OId"] as string);
            oSelectedItems.Add(oItem);
        }
  
        if(oSelectedItems != null && oSelectedItems.Count > 0) {
            Common.AddSelItemIntoSFSQuickList(this.objPGDAdminstrationVM.AdministeredByList, oSelectedItems[0].Value, oSelectedItems[0].DisplayText.Trim(), "cp", this.iSFSAdministeredby);
            this.objPGDAdminstrationVM.AdministeredByList = new ObservableCollection<CListItem>(this.objPGDAdminstrationVM.AdministeredByList.OrderBy(oItem => oItem.DisplayText));
            this.objPGDAdminstrationVM.AdministeredBy = oSelectedItems[0].DisplayText.Trim();
            this.objPGDAdminstrationVM.AdministeredByOID = oSelectedItems[0].Value;
        }
    }
    async sfsWitnessedby_OnSFSOpen(e): Promise<void> {
        this.oParam = AppContextInfo.OrganisationName;
        var oSelectedItems: ObservableCollection<CListItem>  = new ObservableCollection<CListItem>();
        var returnValue: ScriptObject = <ScriptObject>(await HtmlPage.Window.InvokeAsync("SFSCareProvider", this.oParam) as ScriptObject);
        
        if(returnValue != null && returnValue.GetProperty("length") != null) {
            var nSelectCnt: number = Convert.ToInt32(returnValue.GetProperty("length"));
            var selectedValue: ScriptObject = <ScriptObject>(returnValue.GetProperty("0") as ScriptObject);
            var oItem: CListItem = new CListItem();
            oItem.DisplayText = <string>(selectedValue["SurName"] as string);
            if (!String.IsNullOrEmpty(<string>(selectedValue["ForeName"] as string))) {
                oItem.DisplayText += " ";
                oItem.DisplayText += selectedValue["ForeName"];
            }
            oItem.Value = <string>(selectedValue["OId"] as string);
            oSelectedItems.Add(oItem);
        }
  
        if(oSelectedItems != null && oSelectedItems.Count > 0) {
            if (this.objPGDAdminstrationVM.WitnessByList == null)
              this.objPGDAdminstrationVM.WitnessByList = new ObservableCollection<CListItem>();
            Common.AddSelItemIntoSFSQuickList(this.objPGDAdminstrationVM.WitnessByList, oSelectedItems[0].Value, oSelectedItems[0].DisplayText.Trim(), "cp", this.sfsWitnessedby);
            this.objPGDAdminstrationVM.WitnessByList = new ObservableCollection<CListItem>(this.objPGDAdminstrationVM.WitnessByList.OrderBy(oItem => oItem.DisplayText));
            this.objPGDAdminstrationVM.WitnessBy = oSelectedItems[0].DisplayText.Trim();
            this.objPGDAdminstrationVM.WitnessByOID = oSelectedItems[0].Value;
        }
    } 
    private iSFSAdministeredby_OnGetItems(sender: Object, Result: ObservableCollection<CListItem>): void {
        this.iSFSAdministeredby.ItemsSource = Result;
        if (Result != null && this.objPGDAdminstrationVM != null) {
            this.objPGDAdminstrationVM.AdministeredList = Result;
        }
        if (this.objPGDAdminstrationVM != null && this.objPGDAdminstrationVM.AdministeredList != null && !String.IsNullOrEmpty(this.objPGDAdminstrationVM.AdministeredByOID)) {
            this.objPGDAdminstrationVM._IsSFSValueSetFromOnGetSFSItems = true;
            if (this.objPGDAdminstrationVM.AdministeredList == null)
                this.objPGDAdminstrationVM.AdministeredList = new ObservableCollection<CListItem>();
            let _IsExist: boolean = this.objPGDAdminstrationVM.AdministeredList.Any(x => x.Value == this.objPGDAdminstrationVM.AdministeredByOID);
            if (!_IsExist) {
                let oItem: CListItem = new CListItem();
                oItem.DisplayText = this.objPGDAdminstrationVM.AdministeredBy;
                oItem.Value = this.objPGDAdminstrationVM.AdministeredByOID;
                this.objPGDAdminstrationVM.AdministeredList.Add(oItem);
            }
            let sTemp: string = this.objPGDAdminstrationVM.AdministeredByOID;
            this.iSFSAdministeredby.SelectedValue = String.Empty;
            this.iSFSAdministeredby.SetSelectedItem(ObjectHelper.CreateObject(new CListItem(), { Value: sTemp }));
            this.objPGDAdminstrationVM._IsSFSValueSetFromOnGetSFSItems = false;
        }
    }
    private sfsWitnessedby_OnGetItems(sender: Object, Result: ObservableCollection<CListItem>): void {
        if (this.objPGDAdminstrationVM != null && this.objPGDAdminstrationVM.AdministeredByList != null) {
            this.objPGDAdminstrationVM.WitnessByList = Result;
            let lWitnessByOID: number = !String.IsNullOrEmpty(this.objPGDAdminstrationVM.WitnessByOID) ? Convert.ToInt64(this.objPGDAdminstrationVM.WitnessByOID) : 0;
            if (this.objPGDAdminstrationVM != null && this.objPGDAdminstrationVM.WitnessByList != null && lWitnessByOID > 0) {
                this.objPGDAdminstrationVM._IsSFSValueSetFromOnGetSFSItems = true;
                if (this.objPGDAdminstrationVM.WitnessByList == null)
                    this.objPGDAdminstrationVM.WitnessByList = new ObservableCollection<CListItem>();
                let sWitnessedOID: string = this.objPGDAdminstrationVM.WitnessByOID.ToString();
                let _IsExist: boolean = this.objPGDAdminstrationVM.WitnessByList.Any(x => x.Value == sWitnessedOID);
                if (!_IsExist) {
                    let oItem: CListItem = new CListItem();
                    oItem.DisplayText = this.objPGDAdminstrationVM.WitnessBy;
                    oItem.Value = this.objPGDAdminstrationVM.WitnessByOID.ToString();
                    this.objPGDAdminstrationVM.WitnessByList.Add(oItem);
                }
                let sTemp: string = this.objPGDAdminstrationVM.WitnessByOID.ToString();
                this.sfsWitnessedby.SelectedValue = String.Empty;
                this.sfsWitnessedby.SetSelectedItem(ObjectHelper.CreateObject(new CListItem(), { Value: sTemp }));
                this.objPGDAdminstrationVM._IsSFSValueSetFromOnGetSFSItems = false;
            }
        }
    }
    private ValidateUser(_SelectedUserType: SelectedUserType): void {
        if (!String.IsNullOrEmpty(this.objPGDAdminstrationVM.AdministeredByOID) && !String.IsNullOrEmpty(this.objPGDAdminstrationVM.WitnessByOID)) {
            let _MsgResxKey: string;
            if (_SelectedUserType == SelectedUserType.WitnessingUser) {
                _MsgResxKey = "WitnessAdminBy_Message";
            }
            else {
                _MsgResxKey = "AdminByWitness_Message";
            }
            if (this.objWitnessHelper == null) {
                this.objWitnessHelper = new WitnessHelper();
            }
            this.objWitnessHelper.AuthenticateUser(Convert.ToInt64((String.IsNullOrEmpty(this.objPGDAdminstrationVM.AdministeredByOID) ? "0" : this.objPGDAdminstrationVM.AdministeredByOID)),
                Convert.ToInt64((String.IsNullOrEmpty(this.objPGDAdminstrationVM.WitnessByOID) ? "0" : this.objPGDAdminstrationVM.WitnessByOID)), this.objPGDAdminstrationVM.WitnessBy,
                _SelectedUserType, (s,e) => { this.OnUserAuthCompleted(s,e) }, _MsgResxKey);
        }
    }
    public OnUserAuthCompleted(oAuthResult: AuthResult, _SelectedUserType: SelectedUserType): void {
        if (_SelectedUserType == SelectedUserType.WitnessingUser && (oAuthResult == AuthResult.FailedSinceSameUser || oAuthResult == AuthResult.Cancelled)) {
            this.sfsWitnessedby.ClearAll();
            this.objPGDAdminstrationVM.WitnessByOID = String.Empty;
            this.objPGDAdminstrationVM.WitnessBy = String.Empty;
            this.sfsWitnessedby.SelectedText = String.Empty;
            this.sfsWitnessedby.SelectedValue = String.Empty;
            this.sfsWitnessedby.Focus();
        }
        else if (_SelectedUserType == SelectedUserType.AdministeringUser && oAuthResult == AuthResult.FailedSinceSameUser) {
            this.iSFSAdministeredby.ClearAll();
            this.objPGDAdminstrationVM.AdministeredByOID = String.Empty;
            this.objPGDAdminstrationVM.AdministeredBy = String.Empty;
            this.iSFSAdministeredby.SelectedText = String.Empty;
            this.iSFSAdministeredby.SelectedValue = String.Empty;
            this.iSFSAdministeredby.Focus();
        }
    }
    private chkNoWitness_Checked(e): void {
        this.sfsWitnessedby.IsEnabled = false;
        this.objPGDAdminstrationVM.IsWitnessMandatory = false;
        this.lblWitnessedBy.IsEnabled = false;
        this.sfsWitnessedby.ClearAll();
        this.objPGDAdminstrationVM.blnIsNoWitnessAvailable = true;
        this.objPGDAdminstrationVM.WitnessByOID = String.Empty;
        this.objPGDAdminstrationVM.WitnessBy = String.Empty;
    }
    private chkNoWitness_Unchecked(e): void {
        if (this.bIsWitnessReqd) {
            this.objPGDAdminstrationVM.IsWitnessMandatory = true;
            this.sfsWitnessedby.IsEnabled = true;
            this.lblWitnessedBy.IsEnabled = true;
            this.chkNoWitness.IsEnabled = true;
            this.objPGDAdminstrationVM.blnIsNoWitnessAvailable = false;
        }
        else {
            this.sfsWitnessedby.IsEnabled = false;
            this.objPGDAdminstrationVM.IsWitnessMandatory = false;
            this.lblWitnessedBy.IsEnabled = false;
            this.objPGDAdminstrationVM.blnIsNoWitnessAvailable = false;
        }
    }
    private GetWitnessRequired(): void {
        let objService: IPPMAPrescribableDefnWSSoapClient = new IPPMAPrescribableDefnWSSoapClient();
        objService.IsWitnessRequiredCompleted  = (s,e) => { this.objService_IsWitnessReqdCompleted(s,e); } ;
        let objReq: CReqMsgIsWitnessRequired = new CReqMsgIsWitnessRequired();
        objReq.oContextInformation = CommonBB.FillContext();
        objReq.CriteriaBC = new WitnessCriteria();
        objReq.CriteriaBC.ServicePoints = new ObservableCollection<ObjectInfo>();
        objReq.CriteriaBC.ServicePoints.Add(ObjectHelper.CreateObject(new ObjectInfo(), { OID: MedChartData.ServiceOID }));
        objReq.CriteriaBC.Drugs = new ObservableCollection<ObjectInfo>();
        objReq.CriteriaBC.Drugs.Add(ObjectHelper.CreateObject(new ObjectInfo(), { Code: this.strLorenzoID }));
        objReq.CriteriaBC.Roles = new ObservableCollection<ObjectInfo>();
        objReq.CriteriaBC.Roles.Add(ObjectHelper.CreateObject(new ObjectInfo(), { OID: Convert.ToInt64(AppContextInfo.JobRoleOID) }));
        objReq.CriteriaBC.Routes = new ObservableCollection<ObjectInfo>();
        objReq.CriteriaBC.Routes.Add(ObjectHelper.CreateObject(new ObjectInfo(), { OID: this.lnRouteOID }));
        if (!String.IsNullOrEmpty(PatientContext.DOB) && (DateTime.LessThanOrEqualTo(Convert.ToDateTime(PatientContext.DOB), CommonBB.GetServerDateTime())) && !String.IsNullOrEmpty(PatientContext.PatientAge))
            objReq.CriteriaBC.AgeFrom = Convert.ToInt16(PatientContext.PatientAge);
        else objReq.CriteriaBC.AgeFrom = -1;
        if (this.objPGDListVM != null && !String.IsNullOrEmpty(this.objPGDListVM.IsControlledDrug) && String.Compare(this.objPGDListVM.IsControlledDrug, "1", StringComparison.InvariantCultureIgnoreCase) == 0) {
            this.bIsControlledDrug = true;
        }
        else {
            this.bIsControlledDrug = false;
        }
        objReq.CriteriaBC.IsControlledDrugIncluded = this.bIsControlledDrug;
        objService.IsWitnessRequiredAsync(objReq);
    }
    objService_IsWitnessReqdCompleted(sender: Object, e: IsWitnessRequiredCompletedEventArgs): void {
        if (e.Result != null) {
            let objRes: CResMsgIsWitnessRequired = e.Result;
            if (objRes != null && objRes.owitnessCriteriaresult != null) {
                if (objRes.owitnessCriteriaresult.Flag) {
                    this.bIsWitnessReqd = true;
                }
                else {
                    this.bIsWitnessReqd = false;
                }
                if (objRes.owitnessCriteriaresult.Isnowitnessoverride) {
                    this.chkNoWitness.IsChecked = false;
                    this.chkNoWitness.Visibility = Visibility.Collapsed;
                    this.IsWitnessOverrideAllowed = false;
                }
                else {
                    if (this.sfsWitnessedby.Visibility == Visibility.Visible) {
                        this.chkNoWitness.Visibility = Visibility.Visible;
                    }
                    this.IsWitnessOverrideAllowed = true;
                }
            }
        }
        if (this.objPGDAdminstrationVM == null) {
            this.objPGDAdminstrationVM.AdministrationDetail = new AdministrationDetailVM();
        }
        this.chkNoWitness.IsEnabled = this.bIsWitnessReqd;
        if (this.chkNoWitness.IsChecked == true) {
            this.sfsWitnessedby.IsEnabled = false;
            this.lblWitnessedBy.IsEnabled = false;
        }
        else {
            this.sfsWitnessedby.IsEnabled = this.bIsWitnessReqd;
            this.lblWitnessedBy.IsEnabled = this.bIsWitnessReqd;
            this.objPGDAdminstrationVM.IsWitnessMandatory = this.bIsWitnessReqd;
        }
    }
    dtpExpiryDate_OnDateValueChanged(sender: Object, e: DateChangedArgs): void {
        if (DateTime.LessThan(e.ModifiedDate , CommonBB.GetServerDateTime().Date)) {
            if (DateTime.NotEquals(e.ModifiedDate , DateTime.MinValue.Date))
                this.objPGDAdminstrationVM.ExpiryDate = CommonBB.GetServerDateTime().DateTime.AddDateAdjustment();
        }
    }
    dtpGivenDate_OnDateValueChanged(sender: Object, e: DateChangedArgs): void {
        if (this.objPGDAdminstrationVM != null) {
            if (DateTime.Compare(e.ModifiedDate.Date, this.CurrentDTTM.AddDays(-1).Date) == 0) {
                this.objPGDAdminstrationVM.AdministrationDate = this.CurrentDTTM.AddDays(-1).DateTime.AddDateAdjustment();
            }
            else if (DateTime.Compare(e.ModifiedDate.Date, this.CurrentDTTM.Date) == 0) {
                this.objPGDAdminstrationVM.AdministrationDate = this.dtpGivenDate.SelectedDateTime.DateTime.AddDateAdjustment();
            }
        }
    }
    dtpGivenDate_OnDateChange(sender: Object, e: DateChangeEventArgs): void {
        var dt: DateTime = DateTime.MinValue;
        if((e != null) && (DateTime.TryParse(e.DateValue, (o) => { dt = o; })))
        this.SetTimeBoxValue(dt);
    }
    SetTimeBoxValue(SelectedDate: DateTime): void {
        if(SelectedDate != null) {
            if (SelectedDate < this.CurrentDTTM.Date) {
                this.tbGivenTime.Minimum = null;
                this.tbGivenTime.Maximum = null;
            }
            else {
                if (this.objPGDAdminstrationVM != null && this.objPGDAdminstrationVM.AdministrationDetail != null && this.objPGDAdminstrationVM.AdministrationDetail.AdministeredDateTime != null) {
                    this.tbGivenTime.Minimum = new DateTime(this.CurrentDTTM.Year, this.CurrentDTTM.Month, this.CurrentDTTM.Day, 0, 0, 0);
                }
            }
        }
    }
    public cmdOkClick(): boolean {
        if (!this.CheckMandatoryFields()) {
            this.objPGDAdminstrationVM = ObjectHelper.CreateType<PGDAdminstrationVM>(this.DataContext, PGDAdminstrationVM);
            if (this.objPGDAdminstrationVM != null) {
                //PAN 215
                this.objPGDAdminstrationVM.TempOID = this.nPrescriptionOID;
                this.objPGDAdminstrationVM.RecordPGD(this.nPrescriptionOID);
            }
            return true;
        }
        else {
            return false;
        }
    }
    private CheckMandatoryFields(): boolean {
        let objiMessageBox: iMessageBox = new iMessageBox();
        objiMessageBox.Title = "Information - Lorenzo";
        objiMessageBox.IconType = MessageBoxType.Information;
        objiMessageBox.Closed  = (s,e) => { this.objiMessageBox_Closed(objiMessageBox,e); } ;
        if (this.dtpGivenDate.IsOpenError) {
            this.dtpGivenDate.IsOpenError = false;
            return true;
        }
        else if (this.dtpExpiryDate.IsOpenError) {
            this.dtpExpiryDate.IsOpenError = false;
            return true;
        }
        let UDose: number = 0;
        let LDose: number = 0;
        let Dose: number = 0;
        if (this.objPGDListVM != null) {
            if (!String.IsNullOrEmpty(this.objPGDListVM.UpperDose)) {
                Number.TryParse(this.objPGDListVM.UpperDose, (o)=>{
                    UDose = o;
                });
            }
            if (!String.IsNullOrEmpty(this.objPGDListVM.DoseValue)) {
                Number.TryParse(this.objPGDListVM.DoseValue, (o)=>{
                    LDose = o;
                });
            }
        }
        if (!String.IsNullOrEmpty(this.objPGDAdminstrationVM.Dose)) {
            Number.TryParse(this.objPGDAdminstrationVM.Dose, (o)=>{
                Dose = o;
            });
        }
        if (UDose > 0 && this.objPGDAdminstrationVM.IsDoseMandatory) {
            if (String.IsNullOrEmpty(this.objPGDAdminstrationVM.Dose) || String.Compare(this.objPGDAdminstrationVM.Dose, "0", StringComparison.InvariantCultureIgnoreCase) == 0 || (!String.IsNullOrEmpty(this.objPGDAdminstrationVM.Dose) && Convert.ToDecimal(this.objPGDAdminstrationVM.Dose) <= 0)) {
                Busyindicator.SetStatusIdle("Administration");
                objiMessageBox.Message = "Enter Dose value. This field is mandatory";
                objiMessageBox.MessageButton = MessageBoxButton.OK;
                objiMessageBox.Show();
                this.txtDose.Text = String.Empty;
                this.objPGDAdminstrationVM.Dose = String.Empty;
                this.txtDose.Focus();
                return true;
            }
            else if (!String.IsNullOrEmpty(this.objPGDAdminstrationVM.Dose) && this.objPGDAdminstrationVM.Dose.ToString().StartsWith(".")) {
                Busyindicator.SetStatusIdle("Administration");
                objiMessageBox.Message = "Please enter an appropriate dose in its entirety without a leading decimal point.";
                objiMessageBox.MessageButton = MessageBoxButton.OK;
                objiMessageBox.Show();
                this.txtDose.Focus();
                return true;
            }
            else if (Dose < LDose || Dose > UDose) {
                Busyindicator.SetStatusIdle("Administration");
                objiMessageBox.Message = "The Dose value you have entered is outside the prescribed Dose range. Please enter an appropriate Dose";
                objiMessageBox.MessageButton = MessageBoxButton.OK;
                objiMessageBox.Show();
                this.txtDose.Text = String.Empty;
                this.objPGDAdminstrationVM.Dose = String.Empty;
                this.txtDose.Focus();
                return true;
            }
        }
        if (!this.dtpGivenDate.SelectedDateTime) {
            Busyindicator.SetStatusIdle("Administration");
            objiMessageBox.Message = Resource.RecordPGD.ErrMsg_EnterGivenDate;
            objiMessageBox.IconType = MessageBoxType.Information;
            objiMessageBox.Tag = RecordPGD.CONTS_DATETIMEGIVEN;
            objiMessageBox.MessageButton = MessageBoxButton.OK;
            objiMessageBox.Show();
            this.dtpGivenDate.Focus();
            return true;
        }
        else if (String.IsNullOrEmpty(this.iSFSAdministeredby.SelectedText)) {
            Busyindicator.SetStatusIdle("Administration");
            objiMessageBox.Message = Resource.RecordPGD.ErrMsg_AdministeredBy;
            objiMessageBox.Tag = RecordPGD.CONTS_ADMINISTEREDBY;
            objiMessageBox.MessageButton = MessageBoxButton.OK;
            objiMessageBox.Show();
            this.iSFSAdministeredby.Focus();
            return true;
        }
        if (this.chkNoWitness.IsEnabled && this.objPGDAdminstrationVM.IsWitnessMandatory && String.IsNullOrEmpty(this.sfsWitnessedby.searchText)) {
            Busyindicator.SetStatusIdle("Administration");
            objiMessageBox.Message = "Please enter the witness for PGD administered.";
            objiMessageBox.MessageButton = MessageBoxButton.OK;
            objiMessageBox.Show();
            this.sfsWitnessedby.Focus();
            return true;
        }
        let dtAdministeredDTTM: DateTime= this.objPGDAdminstrationVM.AdministrationDate.DateTime.AddTime(this.objPGDAdminstrationVM.AdministrationTime);
        if (this.objPGDListVM != null && this.objPGDListVM.IsParacetamolIngredient && (DateTime.NotEquals(dtAdministeredDTTM , DateTime.MinValue)) && !this.ParacetamolAlreadyAdministeredWarning_Displayed) {
            let oSlotHelper: SlotAdministrationHelper = new SlotAdministrationHelper();
            // oSlotHelper.TriggerParacetamolWarningEvent -= oSlotHelper_TriggerParacetamolWarningEvent;
            oSlotHelper.TriggerParacetamolWarningEvent  = (s,e) => { this.oSlotHelper_TriggerParacetamolWarningEvent(s); } ;
            oSlotHelper.IsAnyParacetamolAdministered(dtAdministeredDTTM, 0);
            Busyindicator.SetStatusBusy("CheckParaAdministered");
            this.ParacetamolPGDadminOkClickBeingValidated = 3;
            return true;
        }
        return false;
    }
    oSlotHelper_TriggerParacetamolWarningEvent(bDisplayWarning: boolean): void {
        Busyindicator.SetStatusIdle("CheckParaAdministered");
        Busyindicator.SetStatusIdle("Administration");
        if (bDisplayWarning) {
            let objDisplayParacetamolWarning: iMessageBox = new iMessageBox();
            objDisplayParacetamolWarning.Title = "Lorenzo";
            objDisplayParacetamolWarning.MessageButton = MessageBoxButton.YesNo;
            objDisplayParacetamolWarning.IconType = MessageBoxType.Question;
            objDisplayParacetamolWarning.Width = 420;
            objDisplayParacetamolWarning.Height = 180;
            //objDisplayParacetamolWarning.MessageBoxClose -= objDisplayParacetamolWarning_MessageBoxClose;
            switch (this.ParacetamolPGDadminOkClickBeingValidated) {
                case 1:
                    objDisplayParacetamolWarning.MessageBoxClose  = (s,e) => { this.iMsgBoxServicePoint_MessageBoxClose(s,e); } ;
                    break;
                case 2:
                    objDisplayParacetamolWarning.MessageBoxClose  = (s,e) => { this.iMsgBoxRole_MessageBoxClose(s,e); } ;
                    break;
                case 3:
                    objDisplayParacetamolWarning.MessageBoxClose  = (s,e) => { this.objDisplayParacetamolWarning_MessageBoxClose(s,e); } ;
                    break;
            }
            objDisplayParacetamolWarning.Message = Resource.MedicationAdministrator.ParacetamolAdministration_WarningMsg;
            objDisplayParacetamolWarning.Tag = CConstants.ParacetamolRecentlyAdministered;
            objDisplayParacetamolWarning.Show();
        }
        else {
            switch (this.ParacetamolPGDadminOkClickBeingValidated) {
                case 1:
                    this.iMsgBoxServicePoint_MessageBoxClose(null, new MessageEventArgs(MessageBoxResult.Yes));
                    break;
                case 2:
                    this.iMsgBoxRole_MessageBoxClose(null, new MessageEventArgs(MessageBoxResult.Yes));
                    break;
                case 3:
                    this.objDisplayParacetamolWarning_MessageBoxClose(null, new MessageEventArgs(MessageBoxResult.Yes));
                    break;
            }
            this.ParacetamolAlreadyAdministeredWarning_Displayed = false;
        }
    }
    objDisplayParacetamolWarning_MessageBoxClose(sender: Object, e: MessageEventArgs): void {
        if (e.MessageBoxResult == MessageBoxResult.No) {
            this.ParacetamolAlreadyAdministeredWarning_Displayed = false;
        }
        else {
            this.ParacetamolAlreadyAdministeredWarning_Displayed = true;
            if (this.ParacetamolPGDadminOkClickBeingValidated == 3) {
                if (this.onDialogClose != null) {
                    this.onDialogClose(ObjectHelper.CreateObject(new AppDialogEventargs(), { Content: this, Result: AppDialogResult.Ok, AppChildWindow: super.appDialog }));
                }
            }
        }
        this.ParacetamolPGDadminOkClickBeingValidated = 0;
    }
    objiMessageBox_Closed(sender: Object, e: EventArgs): void {
        let oiMessageBox: iMessageBox = ObjectHelper.CreateType<iMessageBox>(sender, iMessageBox);
        if (oiMessageBox != null && oiMessageBox.Tag != null) {
            switch (oiMessageBox.Tag.ToString()) {
                case RecordPGD.CONTS_ADMINISTEREDBY:
                    this.iSFSAdministeredby.Focus();
                    break;
            }
        }
        Busyindicator.SetStatusIdle("Administration");
    }
    private GetDoseDetails(): string {
        let UDose: number = 0;
        let objStringBuilder: StringBuilder = new StringBuilder();
        if (this.objPGDListVM != null) {
            if ((this.objPGDListVM.ObjAdminMethod != null) && String.IsNullOrEmpty(this.objPGDListVM.ObjAdminMethod.Name)) {
                if (!String.IsNullOrEmpty(this.objPGDListVM.UpperDose)) {
                    Number.TryParse(this.objPGDListVM.UpperDose, (o)=>{
                        UDose=o
                    });
                }
                if (UDose > 0) {
                    objStringBuilder.Append((this.objPGDListVM.DoseValue != null) ? "(" + this.objPGDListVM.DoseValue : String.Empty);
                    objStringBuilder.Append(" - ");
                    objStringBuilder.Append(this.objPGDListVM.UpperDose);
                    objStringBuilder.Append(")");
                }
                else {
                    objStringBuilder.Append((this.objPGDListVM.DoseValue != null) ? this.objPGDListVM.DoseValue : String.Empty);
                }
            }
            if ((this.objPGDListVM.DoseUOM != null) && this.objPGDListVM.DoseUOM.Name != null) {
                objStringBuilder.Append(" ");
                objStringBuilder.Append(this.objPGDListVM.DoseUOM.Name);
            }
            if ((this.objPGDListVM.ObjAdminMethod != null) && this.objPGDListVM.ObjAdminMethod.Name != null) {
                objStringBuilder.Append(" ");
                objStringBuilder.Append(this.objPGDListVM.ObjAdminMethod.Name);
            }
            objStringBuilder.Append(" ");
            objStringBuilder.Append((this.objPGDListVM.Frequency != null) ? this.objPGDListVM.Frequency : String.Empty);
        }
        return objStringBuilder.ToString();
    }
    private SetEnableDisable(bFlag: boolean): void {      
        this.txtBatchNo.IsEnabled = bFlag;
        this.txtComments.IsEnabled = bFlag;
        this.dtpExpiryDate.IsEnabled = bFlag;
        this.dtpGivenDate.IsEnabled = bFlag;
        this.tbGivenTime.IsEnabled = bFlag;
        this.iSFSAdministeredby.IsEnabled = bFlag && MedChartData.AllowAnyUserForAdministration;
        this.sfsWitnessedby.IsEnabled = bFlag;
        this.chkNoWitness.IsEnabled = bFlag;
    }
    //@ViewChildren('temp', { read: DataTemplate }) dataTemplates: QueryList<DataTemplate>;
    public dataTemplates: QueryList<DataTemplate>;
    @ViewChildren(DataTemplate) set _dataTemplates(c: QueryList<DataTemplate>) {
        if (c) {
            this.dataTemplates = c;
            this.grdPGDListServicePoint.dataTemplates = c;            
        }
    }

    rowCallback = (context: RowClassArgs) => {
        let rowStyles = this.grdPGDListServicePoint.getRowStyles(context);
        
        let isMax = context.dataItem.IsMaxAdministrationReached ? true : false;
        rowStyles["isMax"] = isMax;
        
        return rowStyles;
      };

    rowLoaded(context: any) {
        let rowEventArgs = this.grdPGDListServicePoint.GetRowEventArgs(this.dataTemplates, context);
        this.grdPGDListServicePoint_RowLoaded({}, rowEventArgs);
      }

    private grdPGDListServicePoint_RowLoaded(sender: Object,e: RowLoadedEventArgs): void {
        if (e.Row != null) {
            let objPGDListVM: PGDListVM = ObjectHelper.CreateType<PGDListVM>(e.Row.Item, PGDListVM);
            if (objPGDListVM != null && objPGDListVM.IsMaxAdministrationReached) {
                let bgColor:string = new SolidColorBrush(MedicationCommonBB.hexToColor("#32CD32")).color.color;
                //if (e.Row.Cells != null && e.Row.Cells.Count > 0) {
                    //for (let icnt: number = 0; icnt < e.Row.Cells.Count; icnt++) {
                        if (e.Row.Cells[1] && e.Row.Cells[2] && (e.Row.Cells[this.grdPGDListServicePoint.GetColumnIndexByName('PrescribableItem')] || e.Row.Cells[this.grdPGDListServicePoint.GetColumnIndexByName('PGDUsed')])) {
                            this.grdPGDListServicePoint.Rows[e.Row.Index].Cells[1].iStyle = { 'background': ` ${bgColor}`};
                            this.grdPGDListServicePoint.Rows[e.Row.Index].Cells[2].iStyle = { 'background': ` ${bgColor}`};
                            //e.Row.Cells[1].Background = new SolidColorBrush(MedicationCommonBB.hexToColor("#32CD32")).color.color;
                            //e.Row.Cells[2].Background = new SolidColorBrush(MedicationCommonBB.hexToColor("#32CD32")).color.color;
                        }
                    //}
                //}
            }
        }
    }

    getResource(sKey: string) {
        // if (sResource == 'MedAdmin') {
            let oRecordPGD: RecordPGD_Designer.RecordPGD = new RecordPGD_Designer.RecordPGD();
            return oRecordPGD.GetResourceString(sKey);
        // }
        // return null;
    }
}
