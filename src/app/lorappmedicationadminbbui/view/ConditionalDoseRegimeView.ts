import { Component, Input, OnInit,QueryList,ViewChild, ViewChildren } from '@angular/core';

import { StringBuilder, ProfileFactoryType, ContextManager, Convert, AppActivity, MessageEventArgs } from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp, Byte, Decimal, decimal, Double, Float, Int64, long, Long,ObservableCollection,CListItem, StringComparison, AppDialogEventargs, AppDialogResult, DelegateArgs, DialogComponentArgs, WindowButtonType, iAppDialogWindow, HtmlPage, Visibility, ChildWizardCloseEventargs } from 'epma-platform/models';
import { AppDialog, Colors, DataTemplate, Grid, KeyEventArgs, MouseButtonEventArgs, SolidColorBrush, iButton, iCheckBox, iComboBox, iLabel, iTextBox } from 'epma-platform/controls';
import { HelperService } from 'epma-platform/soapclient';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
import { ConditionalDoseVM } from 'src/app/lorappmedicationcommonbb/viewmodel/ConditionalDoseVM';
import { GridExtension, RowLoadedEventArgs, SelectionChangeEventArgs, SelectionMode } from 'src/app/shared/epma-platform/controls/epma-grid-helpers/grid-extension';
import { Type } from '@angular/compiler';
import { PatientContext } from 'src/app/lorappcommonbb/utilities/globalvariable';
import { CPatLatestObsResParams, CReqMsgGetLatestObsOrResultDetails, CResMsgGetLatestObsOrResultDetails, GetLatestObsOrResultDetailsCompletedEventArgs, MedicationAdministrationWSSoapClient } from 'src/app/shared/epma-platform/soap-client/MedicationAdministrationWS';
import { WebServiceURLMedicationCommonBB } from 'src/app/lorappmedicationcommonbb/utilities/globalvariable';
import { GridComponent } from '@progress/kendo-angular-grid';
import { RoutedEventArgs } from 'src/app/shared/epma-platform/controls/FrameworkElement';
import { CellStyle } from 'src/app/shared/epma-platform/controls/epma-grid-helpers/cell-style.component';
import { IPPMABaseVM } from 'src/app/lorappmanageprescriptionbbui/viewmodel/ippmabasevm';
import { Resource } from '../resource';
import { CConstants } from '../utilities/CConstants';
import { ProfileData } from '../utilities/ProfileData';
import { Common } from '../utilities/common';

@Component({
  selector: 'ConditionalDoseRegimeView',
  templateUrl: './ConditionalDoseRegimeView.html',
  styleUrls: ['./ConditionalDoseRegimeView.css']
})

export class ConditionalDoseRegimeView extends iAppDialogWindow {
  CondVM: ConditionalDoseVM;
  lblConditionalRegime_Text: any;
  private ConditionalErrorEvent: Function;
 // public objObsResultVM: ObservationChartVM;
  private bLoaded: boolean = false;
  public Drugname: string = String.Empty;
  @Input() bIsPRN: boolean = false;
  @Input() IdentifyingOID: number;
  @Input() IdentifyingType: string;
  @Input() MCVersionNo: string;
  @Input() PrescriptionItemOID: number;
  @Input() sObsDrugName: string;
  @Input() sitemsubtype: string;
  @Input() slorenzoid: string;
  @Input() mcitemname: string;
  private oMsgBox: iMessageBox = ObjectHelper.CreateObject(new iMessageBox(), { Title: "Lorenzo" });
  public CondRes = Resource.ConditionalRegime;
  lnPrescriptionOID: number = 0;
  lnPrescriptionSchOID: number = 0;
  sDrugName: string = String.Empty;
  oSelectedConditionalDose: ConditionalDoseVM;
  _cellStyle = {};
  oMsg: iMessageBox = new iMessageBox();
  lblClinicalIncidentValue_MouseLeftButtonUp_Func:Function;
  chkOtherDose_Checked_Func: Function;
  chkOtherDose_Unchecked_Func: Function;
  isRowSelectable:boolean = true;
  isGridEnable:boolean = true;
  @Input() CellClick: Function;


@ViewChild('CellTemplateStyle', { read: CellStyle, static: false })
  set cellTemplateStyle(value: CellStyle) {
    this._cellStyle = this.grdConditionalDose.setCellStyle(
      value,
      this.grdConditionalDose.columns
    );
  }

  private LayoutRoot: Grid;
  @ViewChild("LayoutRootTempRef", { read: Grid, static: false }) set _LayoutRoot(c: Grid) {
      if (c) { this.LayoutRoot = c; }
  };
  private lblConditionalRegime: iLabel;
  @ViewChild("lblConditionalRegimeTempRef", { read: iLabel, static: false }) set _lblConditionalRegime(c: iLabel) {
      if (c) { this.lblConditionalRegime = c; }
  };
  private lblObsOrResultValue: iLabel;
  @ViewChild("lblObsOrResultValueTempRef", { read: iLabel, static: false }) set _lblObsOrResultValue(c: iLabel) {
      if (c) { this.lblObsOrResultValue = c; }
  };
  private lblObsOrResultDetails: iLabel;
  @ViewChild("lblObsOrResultDetailsTempRef", { read: iLabel, static: false }) set _lblObsOrResultDetails(c: iLabel) {
      if (c) { this.lblObsOrResultDetails = c; }
  };
  grdConditionalDose: GridExtension = new GridExtension();
  @ViewChild("grdConditionalDoseTempRef", { read: GridComponent, static: false }) set _grdConditionalDose(c: GridComponent) {
      if (c) { this.grdConditionalDose.grid = c;
          this.grdConditionalDose.columns = c.columns;
      }
  };
  private OtherDose: Grid;
  @ViewChild("OtherDoseTempRef", { read: Grid, static: false }) set _OtherDose(c: Grid) {
      if (c) { this.OtherDose = c; }
  };
  private lblOtherDose: iLabel;
  @ViewChild("lblOtherDoseTempRef", { read: iLabel, static: false }) set _lblOtherDose(c: iLabel) {
      if (c) { this.lblOtherDose = c; }
  };
  private chkOtherDose: iCheckBox;
  @ViewChild("chkOtherDoseTempRef", { read: iCheckBox, static: false }) set _chkOtherDose(c: iCheckBox) {
      if (c) { this.chkOtherDose = c; }
  };
  private lblOtherDoseValue: iLabel;
  @ViewChild("lblOtherDoseValueTempRef", { read: iLabel, static: false }) set _lblOtherDoseValue(c: iLabel) {
      if (c) { this.lblOtherDoseValue = c; }
  };
  private OtherDoseLayout: Grid;
  @ViewChild("OtherDoseLayoutTempRef", { read: Grid, static: false }) set _OtherDoseLayout(c: Grid) {
      if (c) { this.OtherDoseLayout = c; }
  };
  private txtOtherDoseValue: iTextBox;
  @ViewChild("txtOtherDoseValueTempRef", { read: iTextBox, static: false }) set _txtOtherDoseValue(c: iTextBox) {
      if (c) { this.txtOtherDoseValue = c; }
  };
  private lblOtherDoseUoM: iLabel;
  @ViewChild("lblOtherDoseUoMTempRef", { read: iLabel, static: false }) set _lblOtherDoseUoM(c: iLabel) {
      if (c) { this.lblOtherDoseUoM = c; }
  };
  private lblDiscrepancyReason: iLabel;
  @ViewChild("lblDiscrepancyReasonTempRef", { read: iLabel, static: false }) set _lblDiscrepancyReason(c: iLabel) {
      if (c) { this.lblDiscrepancyReason = c; }
  };
  private cboDiscrepancyReason: iComboBox;
  @ViewChild("cboDiscrepancyReasonTempRef", { read: iComboBox, static: false }) set _cboDiscrepancyReason(c: iComboBox) {
      if (c) { this.cboDiscrepancyReason = c; }
  };
  private lblClinicalIncident: iLabel;
  @ViewChild("lblClinicalIncidentTempRef", { read: iLabel, static: false }) set _lblClinicalIncident(c: iLabel) {
      if (c) { this.lblClinicalIncident = c; }
  };
  private lblClinicalIncidentValue: iLabel;
  @ViewChild("lblClinicalIncidentValueTempRef", { read: iLabel, static: false }) set _lblClinicalIncidentValue(c: iLabel) {
      if (c) { this.lblClinicalIncidentValue = c; }
  };
  private cmdObservationsResults: iButton;
  @ViewChild("cmdObservationsResultsTempRef", { read: iButton, static: false }) set _cmdObservationsResults(c: iButton) {
      if (c) { this.cmdObservationsResults = c; }
  };
  private lblConditionName: iLabel = new iLabel();
  @ViewChild("lblConditionNameTempRef", { read: iLabel, static: false }) set _lblConditionName(c: iLabel) {
      if (c) { this.lblConditionName = c; }
  };
  @ViewChildren('temp') dataTemplates: QueryList<DataTemplate>;
  oVM:ConditionalDoseVM =new ConditionalDoseVM();

  constructor() {   
    super();
    this.CondVM = new ConditionalDoseVM();
    this.ConditionalErrorEvent =  (s, e,n) =>{this.ConditionalDosingDetails_OnErrorEvent(s,e,n)};
    this.oMsgBox.MessageBoxClose = (s, e) => { this.oMsgBox_MessageBoxClose(s, e); };
   }

   public regimeView_Click(){
    let objAdminDetail: RowLoadedEventArgs;

    this.ConditionalDosingDetails_OnErrorEvent;
    
  }
  public cmdOk_Click(): void {
    this.oMsg.Message = "Administrator record has been recorded.";
    this.oMsg.IconType = MessageBoxType.Information;
    this.oMsg.Title = CConstants.MSGTitleName;
    this.oMsg.Tag = "exclude";
    this.oMsg.MessageButton = MessageBoxButton.OK;
    this.oMsg.Show();
    this.appDialog.DialogResult = true;
  }
  ngOnInit(): void {
    this.lblClinicalIncidentValue_MouseLeftButtonUp_Func = (s,e)=>{this.lblClinicalIncidentValue_MouseLeftButtonUp(s,e)};
    this.chkOtherDose_Checked_Func = (s, e) => { this.chkOtherDose_Checked(s); };   
    this.chkOtherDose_Unchecked_Func = (s, e) => { this.chkOtherDose_Unchecked(s); }
    this.UserControl_Loaded(null, null);
    this.grdConditionalDose.RowIndicatorVisibility = Visibility.Collapsed;
    this.grdConditionalDose.onCellClick = (s, e) => {
        this.CellClick(s, e);
      };
  }
  ngAfterViewInit(): void {
      this.grdConditionalDose.GenerateColumns();
      this.grdConditionalDose.SetBinding('data', this.DataContext.DefinedConditions);
      this.grdConditionalDose.SelectedItem = this.DataContext.SelectedConditionalDose;
      this.oSelectedConditionalDose = this.DataContext.SelectedConditionalDose;
      this.grdConditionalDose.SelectionMode = SelectionMode.Single;
  }    

  rowLoaded(context: any) {
    let rowEventArgs = this.grdConditionalDose.GetRowEventArgs(this.dataTemplates, context);
        this.grdConditionalDose_RowLoaded({}, rowEventArgs);
    }
  grdConditionalDose_RowLoaded(sender: Object, e: RowLoadedEventArgs): void {

  }
  private ConditionalDosingDetails_OnErrorEvent(ErrorNumber: number, ErrorMessage: string, ContronID: string): void {
      switch (ErrorNumber) {
          case 1:
              ErrorMessage = Resource.ConditionalRegime.OtherDoseMandatory_Msg;
              break;
          case 2:
              ErrorMessage = Resource.ConditionalRegime.DoseDiscrepancy_Msg;
              break;
          case 3:
              ErrorMessage = Resource.ConditionalRegime.DoseMandatory_Msg;
              break;
          default:
              break;
      }
      this.oMsgBox.Message = ErrorMessage;
      this.oMsgBox.IconType = MessageBoxType.Critical;
      this.oMsgBox.MessageButton = MessageBoxButton.OK;
      this.oMsgBox.Tag = ContronID;
      this.oMsgBox.OverlayBrush = new SolidColorBrush(Colors.Transparent);
      this.oMsgBox.Show();
  }
    oMsgBox_MessageBoxClose(sender: Object, e: MessageEventArgs): void {
        let sCtrlID: string = ObjectHelper.CreateType<string>(this.oMsgBox.Tag, String);
        if (String.IsNullOrEmpty(sCtrlID))
            return
        let ctrlToSetFocus: any = this.FindName(sCtrlID);
        if (ctrlToSetFocus != null) {
            if (sCtrlID == "txtOtherDoseValue") {
                this.txtOtherDoseValue.Focus();
            }
            else if (sCtrlID == "cboDiscrepancyReason") {
                this.cboDiscrepancyReason.Focus();
            }
            else if (sCtrlID == "grdConditionalDose") {
                this.grdConditionalDose.Focus();
            }
        }
    }
  public ValidateURL(url: string): boolean {
      let RgxUrl: RegExp = new RegExp("^(ht|f)tp(s?)\:\/\/[0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*(:(0-9)*)*(\/?)([a-zA-Z0-9\-\.\?\,\'\/\\\+&amp;%\$#_]*)?$");
      return RgxUrl.test(url);
  }
 lblClinicalIncidentValue_MouseLeftButtonUp(sender: Object, e: MouseButtonEventArgs): void {
      if (ProfileData.ClinicalIncidentConfig != null && !String.IsNullOrEmpty(ProfileData.ClinicalIncidentConfig.Address) && this.ValidateURL(ProfileData.ClinicalIncidentConfig.Address)) {
          HtmlPage.Window.Invoke("LaunchClinicalIncidentForm", ProfileData.ClinicalIncidentConfig.Address);
        }
  }
  lblObservationsResults_MouseLeftButtonUp(sender: Object, e: MouseButtonEventArgs): void {

  }
  public grdConditionalDose_SelectionChanged(e: SelectionChangeEventArgs): void {
    if(this.chkOtherDose.IsChecked){
        this.DataContext.SelectedConditionalDose = null;   
    }
    else{
        this.DataContext.SelectedConditionalDose = e.selectedRows[0].dataItem;
        this.oSelectedConditionalDose = e.selectedRows[0].dataItem;
    }
  }
  chkOtherDose_Checked(e): void {
    this.isGridEnable = false;
   this.DataContext.SelectedConditionalDose = null;
   this.lblClinicalIncidentValue.Foreground = "#0000C8";
  }
  chkOtherDose_Unchecked(e):void{     
    this.isGridEnable = true;
    this.DataContext.SelectedConditionalDose = this.oSelectedConditionalDose;
  }

 UserControl_Loaded(sender: Object, e: RoutedEventArgs): void {
      if (!this.bLoaded) {
        this.bLoaded = true;
          this.CondVM = ObjectHelper.CreateType<ConditionalDoseVM>(this.DataContext, ConditionalDoseVM);
          if (this.CondVM != null) {
              this.Drugname = this.CondVM.DrugName;
              this.CondVM.OnErrorEvent = this.ConditionalErrorEvent;
              if (ProfileData.ClinicalIncidentConfig != null && ProfileData.ClinicalIncidentConfig.isRecordAdminDoseDiscrepancy) {
                  this.CondVM.IsClinicalIncidentVisible = Visibility.Visible;
                  this.CondVM.ClinicalIncidentLinkText = ProfileData.ClinicalIncidentConfig.LinkTextToDisplay;
              }
              else {
                  this.CondVM.IsClinicalIncidentVisible = Visibility.Collapsed;
              }
          }
      }
  }
  UserControl_Unloaded(sender: Object, e: RoutedEventArgs): void {
      this.CondVM.OnErrorEvent = this.ConditionalErrorEvent;
  }
  txtOtherDoseValue_KeyDown(sender: Object, e: KeyEventArgs): void {
      if (e.PlatformKeyCode == 189) {
          e.Handled = true;
      }
  }
  cmdObservationsResults_Click(e: RoutedEventArgs): void {
      let bResult: boolean = Common.LaunchObservation(this.PrescriptionItemOID,
          this.IdentifyingType,
          this.IdentifyingOID,
          this.MCVersionNo, !String.IsNullOrEmpty(this.sObsDrugName) ? this.sObsDrugName : this.Drugname, this.sitemsubtype, this.mcitemname, this.slorenzoid, this.ObservationFinished);
  }
  public ObservationFinished(args: ChildWizardCloseEventargs): void {
      let sContData: string = String.Empty;
      if (args != null && !String.IsNullOrEmpty(args.ContextData))
          sContData = args.ContextData;
      if (this.CondVM != null && sContData.Contains("RECORDENTERED=True")) {
          let oReq: CReqMsgGetLatestObsOrResultDetails = new CReqMsgGetLatestObsOrResultDetails();
          oReq.oContextInformation = Common.FillContext();
          let oPatLatObsResParam: CPatLatestObsResParams = new CPatLatestObsResParams();
          oPatLatObsResParam.EncounterOID = PatientContext.EncounterOid;
          oPatLatObsResParam.PatientOID = PatientContext.PatientOID;
          oPatLatObsResParam.EntityType = this.CondVM.ItmType;
          oPatLatObsResParam.IdValue = this.CondVM.EntityCode;
          oReq.oPatLatObsResParamsBC = oPatLatObsResParam;
         //let serviceProxy: MedicationAdministrationWSSoapClient = new MedicationAdministrationWSSoapClient(BindingObject.GetBasicHttpBindingObject(), new EndpointAddress(WebServiceURLMedicationCommonBB.MedicationAdministrationWS));
          let serviceProxy: MedicationAdministrationWSSoapClient = new MedicationAdministrationWSSoapClient();
          serviceProxy.GetLatestObsOrResultDetailsCompleted = (s, e) => { this.serviceProxy_GetLatestObsOrResultDetailsCompleted(s, e); };
          serviceProxy.GetLatestObsOrResultDetailsAsync(oReq);
      }
  }
serviceProxy_GetLatestObsOrResultDetailsCompleted(sender: Object, e: GetLatestObsOrResultDetailsCompletedEventArgs): void {
      if (e.Error != null)
          return
      let oResGetLatestObsOrResultDetails: CResMsgGetLatestObsOrResultDetails = e.Result;
      if (oResGetLatestObsOrResultDetails != null && oResGetLatestObsOrResultDetails.oPatLatObsResVal != null && oResGetLatestObsOrResultDetails.oPatLatObsResVal.EntityDetails != null) {
          if (!String.IsNullOrEmpty(oResGetLatestObsOrResultDetails.oPatLatObsResVal.EntityDetails) && DateTime.NotEquals(oResGetLatestObsOrResultDetails.oPatLatObsResVal.RecordedDate , DateTime.MinValue) && DateTime.GreaterThanOrEqualTo(oResGetLatestObsOrResultDetails.oPatLatObsResVal.RecordedDate , this.CondVM.PresItemStartDTTM)) {
              this.CondVM.LatestObservationResultDetails = oResGetLatestObsOrResultDetails.oPatLatObsResVal.EntityDetails + " on " + oResGetLatestObsOrResultDetails.oPatLatObsResVal.RecordedDate.ToString(CConstants.DateTimeFormat);
              this.CondVM.CloneConditionalDose();
          }
      }
  }
  public OnRefreshCondMezzaine(isRequired: boolean): void {

  }
}
