import { Component, Input, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { StringBuilder, ProfileFactoryType, Convert, SLQueryCollection } from 'epma-platform/services';
import { ProfileContext, StringComparison, iAppDialogWindow, ObservableCollection, List, Visibility } from 'epma-platform/models';
import { BitmapImage, Border, ContentPresenter, DataTemplate, Grid, Image, StackPanel, Stretch, TextBlock, Thickness, ToolTipService, Uri, UriKind, VerticalAlignment, iCheckedListbox, iComboBox, iDateTimePicker, iLabel, iTextBox } from 'epma-platform/controls';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType } from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
import { SupplyDispensingInstructionsVM } from '../viewmodel/SupplyDispensingInstructionsVM';
import { CConstants, MedImage, MedImages, PrescriptionTypes } from '../utilities/constants';
import { ClerkFormViewDeftBehaviour, PatientContext } from 'src/app/lorappcommonbb/utilities/globalvariable';
import { FormviewerDisplayHelper } from 'src/app/product/shared/convertor/medicationconverters.service';
import { RoutedEventArgs } from 'src/app/shared/epma-platform/controls/FrameworkElement';
import { MedicationCommonBB } from 'src/app/lorappmedicationcommonbb/utilities/medicationcommonbb';
import { CMedicationLineDisplayData, MedDrugDisplayConfigData, PrintConfigurationData } from 'src/app/lorappslprofiletypes/medication';
import { MedicationCommonProfileData } from 'src/app/lorappmedicationcommonbb/utilities/profiledata';
import { PrescriptionItemDetailsVM } from 'src/app/lorappmedicationcommonbb/viewmodel/prescriptionitemdetailsvm';
import { ProfileData } from '../utilities/profiledata';
import { LineDisplayHelper } from 'src/app/lorappmedicationcommonbb/converter/medicationconverters';
import { SupplyHistoryDetails } from 'src/app/shared/epma-platform/soap-client/IPPMAManagePrescriptionWS';
import { PrescriptionItemVM } from '../viewmodel/PrescriptionItemVM';
import { Environment } from 'src/app/product/shared/models/Common';
import { CommonBB } from 'src/app/lorappcommonbb/utilities/common';
import { DateChangeEventArgs } from 'src/app/shared/epma-platform/controls/epma-datetimepicker/epma-datetimepicker.component';
import { GridExtension, RowLoadedEventArgs } from 'src/app/shared/epma-platform/controls/epma-grid-helpers/grid-extension';
import { GridComponent, RowClassArgs } from '@progress/kendo-angular-grid';
import { Resource } from '../resource';
import * as ManagePrescSer from '../../shared/epma-platform/soap-client/ManagePrescriptionWS';
import * as ControlStyles from "../../shared/epma-platform/controls/ControlStyles";
import { CommonService } from 'src/app/product/shared/common.service';
import { QueryStringInfo } from '../utilities/globalvariable';
var that;
@Component({
  selector: 'medsupplydispensinginstructions',
  templateUrl: './medsupplydispensinginstructions.html',
  styleUrls: ['./medsupplydispensinginstructions.css']
})

export class medsupplydispensinginstructions extends iAppDialogWindow {

  public LayoutRoot: Grid;
  @ViewChild("LayoutRootTempRef", { read: Grid, static: false }) set _LayoutRoot(c: Grid) {
    if (c) { this.LayoutRoot = c; }
  };
  private DrugIcons: StackPanel;
  @ViewChild("DrugIconsTempRef", { read: StackPanel, static: false }) set _DrugIcons(c: StackPanel) {
    if (c) { this.DrugIcons = c; }
  };
  private MedLineDisplay: ContentPresenter;
  @ViewChild("MedLineDisplayTempRef", { read: ContentPresenter, static: false }) set _MedLineDisplay(c: ContentPresenter) {
    if (c) { this.MedLineDisplay = c; }
  };
  public txtSupplyComments: iTextBox;
  @ViewChild("txtSupplyCommentsTempRef", { read: iTextBox, static: false }) set _txtSupplyComments(c: iTextBox) {
    if (c) { this.txtSupplyComments = c; }
  };
  private dtpNextSupDate: iDateTimePicker;
  @ViewChild("dtpNextSupDateTempRef", { read: iDateTimePicker, static: false }) set _dtpNextSupDate(c: iDateTimePicker) {
    if (c) { this.dtpNextSupDate = c; }
  };
  private lblNote: iLabel;
  @ViewChild("lblNoteTempRef", { read: iLabel, static: false }) set _lblNote(c: iLabel) {
    if (c) { this.lblNote = c; }
  };
  private lblNextSupplyDTTM: iLabel;
  @ViewChild("lblNextSupplyDTTMTempRef", { read: iLabel, static: false }) set _lblNextSupplyDTTM(c: iLabel) {
    if (c) { this.lblNextSupplyDTTM = c; }
  };
  public grdSupplyHistorya: GridExtension = new GridExtension();
  @ViewChild("grdSupplyHistoryaTempRef", { read: GridComponent, static: false }) set _grdSupplyHistorya(c: GridComponent) {
    if (c) {
      this.grdSupplyHistorya.grid = c;
      this.grdSupplyHistorya.columns = c.columns;
    }
  };
  icmbSupplyReq: iComboBox
  @ViewChild("icmbSupplyReqTempRef", { read: iComboBox, static: false }) set _icmbSupplyReq(c: iComboBox) {
    if (c) { 
      this.icmbSupplyReq = c; 
      this.icmbSupplyReq.Focus();
    }
  };

  grdData: GridExtension = new GridExtension();
  @ViewChildren('grdSupplyHistoryaDT') dataTemplates: QueryList<DataTemplate>;

  public mulsel = Resource.multilist;
  public Supplyhistory = Resource.Supplyhistory;
  public Styles = ControlStyles;
  public oVM: SupplyDispensingInstructionsVM;
  public localPresItemVM: PrescriptionItemVM;
  public localosupplyVM: SupplyDispensingInstructionsVM;
  constructor() {
    super();
    that = this
  }

  override _DataContext: any;
  override get DataContext() {
    return this._DataContext;
  }
  @Input() override set DataContext(value: any) {
    this._DataContext = value;
  }
  
  public HideHorizontalScrollBar: boolean = false;
  public EncounterType;
  public isLargeScreen =false;
  ngOnInit(): void {
    this.EncounterType = PatientContext.EncounterType.toLowerCase();
    
  }
  
  public maxScrollContentHeight;
  public maxGridHeight = 245;
  public maxscrollheight;
  ngAfterViewInit(): void {
    this.maxscrollheight = (window.devicePixelRatio == 1) ? "auto" : 456;
    if (((!String.IsNullOrEmpty(QueryStringInfo.IsLaunchformMedchart) &&
      String.Equals(
        QueryStringInfo.IsLaunchformMedchart,
        'True',
        StringComparison.InvariantCultureIgnoreCase
      )) || (!String.IsNullOrEmpty(QueryStringInfo.IsClinicalNote) &&
        String.Equals(
          QueryStringInfo.IsClinicalNote,
          'Yes',
          StringComparison.InvariantCultureIgnoreCase
        )) || (!String.IsNullOrEmpty(QueryStringInfo.FromPreschart) &&
          String.Equals(
            QueryStringInfo.FromPreschart,
            'True',
            StringComparison.InvariantCultureIgnoreCase
          )) || (!String.IsNullOrEmpty(QueryStringInfo.IsLaunchformPreschartReview) &&
          String.Equals(
            QueryStringInfo.IsLaunchformPreschartReview,
            'True',
            StringComparison.InvariantCultureIgnoreCase
          )) || (!String.IsNullOrEmpty(QueryStringInfo.FromClinicalNote) &&
          String.Equals(
            QueryStringInfo.FromClinicalNote,
            'True',
            StringComparison.InvariantCultureIgnoreCase
          ))) && window.devicePixelRatio == 1.25) {
      this.maxscrollheight = 456 - 33;
    }
    this.grdSupplyHistorya.GenerateColumns();
    this.iAppDialogWindow_Loaded(null, null);   
    if(this.localPresItemVM instanceof PrescriptionItemVM)
    {
      this.constructorPICtrlsAccess(this.localPresItemVM);
    }
    else
    {
      this.constructorSICtrlsAccess();  
    }
    this.grdSupplyHistorya.SetBinding('data', this.DataContext.SupplyHistoryList);
    /* Code is for logically show and hide the grid horizontal scrollbar based on its content */
    setTimeout(() => {
      const GridWidth = document.getElementById('grdSupplyHistorya').offsetWidth;
      const GridContentWidth = this.grdSupplyHistorya.grid.columnsContainer.unlockedWidth;
      if (GridContentWidth <= GridWidth) {
        this.HideHorizontalScrollBar = true;
      }
    })
    this.maxScrollContentHeight = CommonService.setDynamicScrollHeight_MedSupplyInstructions("#medsupplydispensinginstructions");
    if(this.maxScrollContentHeight){
      this.maxGridHeight = (this.maxScrollContentHeight - 285); // supply status, instructions, 285
      if(window.devicePixelRatio != 1){
        this.maxGridHeight = (this.maxScrollContentHeight - 185);
      }
    }
    if(window.screen.height < 1000 && window.devicePixelRatio != 1.25 ){
      this.isLargeScreen = true;
    }
    else{
      this.isLargeScreen = false;
    }
  }

  constructorPresItemVM(PresItemVM?: PrescriptionItemVM) {
    this.oVM = new SupplyDispensingInstructionsVM(PresItemVM);
    this.oVM.OnValidationError = (s, e) => { this.ShowMandatoryMsg(); };
    this.DataContext = this.oVM;
    this.localPresItemVM = PresItemVM;    
  }
  constructorPICtrlsAccess(PresItemVM: PrescriptionItemVM){
    if (PresItemVM != null && PresItemVM.FormViewerDetails != null && PresItemVM.FormViewerDetails.BasicDetails != null) {
      if (!PresItemVM.FormViewerDetails.BasicDetails.DisplayFlag) {
        this.SetDrugHeaderContent(PresItemVM);
      }
    }
    if (ProfileData.AdditionalPrescConfig != null && ProfileData.AdditionalPrescConfig.EnableWardStockConfig && (String.Equals(PatientContext.PrescriptionType, PrescriptionTypes.ForAdministration) || String.Equals(PatientContext.PrescriptionType, PrescriptionTypes.Inpatient)) && !(PatientContext.ClerkFormViewDefaultBehavior == ClerkFormViewDeftBehaviour.LaunchFormMandatory)) {
      this.grdSupplyHistorya.Columns["NextSupplyDTTM"].IsVisible = true;
    }
    else {
      this.grdSupplyHistorya.Columns["NextSupplyDTTM"].IsVisible = false;
    }
    if (ProfileData.AdditionalPrescConfig != null && !ProfileData.AdditionalPrescConfig.EnableWardStockConfig) {
      this.grdSupplyHistorya.Columns["Dispensingrequestdetailsdatetime"].IsVisible = false;
    }
    else if (String.Equals(PatientContext.PrescriptionType, PrescriptionTypes.Clerking) || (String.Equals(PatientContext.PrescriptionType, PrescriptionTypes.ForAdministration, StringComparison.InvariantCultureIgnoreCase) && PatientContext.ClerkFormViewDefaultBehavior == ClerkFormViewDeftBehaviour.LaunchFormMandatory)) {
      this.grdSupplyHistorya.Columns["Dispensingrequestdetailsdatetime"].IsVisible = false;
    }    
    if (String.Equals(PatientContext.PrescriptionType, PrescriptionTypes.ForAdministration, StringComparison.OrdinalIgnoreCase) && PatientContext.ClerkFormViewDefaultBehavior != ClerkFormViewDeftBehaviour.LaunchFormMandatory && String.Equals(SLQueryCollection.GetQueryStringValue("MenuCode"), CConstants.ClinicallyVerifyMenuSL, StringComparison.CurrentCultureIgnoreCase)) {
      this.lblNote.Visibility = Visibility.Collapsed; // Visibility.Visible 
    }
    this.grdSupplyHistorya.UpdateColumns();
  }

  constructorosupplyVM(osupplyVM?: SupplyDispensingInstructionsVM) {    
    this.oVM = osupplyVM;
    this.oVM.OnValidationError = (s, e) => { this.ShowMandatoryMsg(); };
    this.DataContext = this.oVM;
    if (MedicationCommonProfileData.MedLineDisplay == null || ProfileData.PrintConfig == null || ProfileData.MedDrugDisplayConfig == null) {
      this.GetProfileData();
    }
    else {
      this.GetSupplyInfo();
    }    
  }

  constructorSICtrlsAccess(){
    if (ProfileData.AdditionalPrescConfig != null && ProfileData.AdditionalPrescConfig.EnableWardStockConfig && (String.Equals(PatientContext.PrescriptionType, PrescriptionTypes.ForAdministration) || String.Equals(PatientContext.PrescriptionType, PrescriptionTypes.Inpatient)) && !(PatientContext.ClerkFormViewDefaultBehavior == ClerkFormViewDeftBehaviour.LaunchFormMandatory)) {
      this.grdSupplyHistorya.Columns["NextSupplyDTTM"].IsVisible = true;
    }
    else {
      this.grdSupplyHistorya.Columns["NextSupplyDTTM"].IsVisible = false;
    }
    if (ProfileData.AdditionalPrescConfig != null && !ProfileData.AdditionalPrescConfig.EnableWardStockConfig) {
      this.grdSupplyHistorya.Columns["Dispensingrequestdetailsdatetime"].IsVisible = false;
    }
    else if (String.Equals(PatientContext.PrescriptionType, PrescriptionTypes.Clerking) || (String.Equals(PatientContext.PrescriptionType, PrescriptionTypes.ForAdministration, StringComparison.InvariantCultureIgnoreCase) && PatientContext.ClerkFormViewDefaultBehavior == ClerkFormViewDeftBehaviour.LaunchFormMandatory)) {
      this.grdSupplyHistorya.Columns["Dispensingrequestdetailsdatetime"].IsVisible = false;
    }
    if (String.Equals(PatientContext.PrescriptionType, PrescriptionTypes.ForAdministration, StringComparison.OrdinalIgnoreCase) && PatientContext.ClerkFormViewDefaultBehavior != ClerkFormViewDeftBehaviour.LaunchFormMandatory && String.Equals(SLQueryCollection.GetQueryStringValue("MenuCode"), "MN_SUPINSTR_P2", StringComparison.CurrentCultureIgnoreCase)) {
      this.lblNote.Visibility = Visibility.Collapsed; // Visibility.Visible;
    }
  }

  rowLoaded(context: any) {
    let rowEventArgs = this.grdSupplyHistorya.GetRowEventArgs(this.dataTemplates, context);
    this.grdData_RowLoaded({}, rowEventArgs);
  }

  rowCallback = (context: RowClassArgs) => {
    let rowStyles = this.grdSupplyHistorya.getRowStyles(context);
    return rowStyles;
  };

  private iAppDialogWindow_Loaded(sender: Object, e: RoutedEventArgs): void {
    this.oVM = ObjectHelper.CreateType<SupplyDispensingInstructionsVM>(this.DataContext, SupplyDispensingInstructionsVM);
    if (MedicationCommonProfileData.MedLineDisplay != null || ProfileData.PrintConfig != null || ProfileData.MedDrugDisplayConfig != null) {
      this.GetSupplyInfo();
    }
    else{
      this.GetProfileData();
    }
  }

  public GetSupplyInfo(): void {
    if (!String.IsNullOrEmpty(PatientContext.PrescriptionOID)) {
      let P: string[] = PatientContext.PrescriptionOID.Split(',');
      if (P.length == 1 && this.oVM != null && !String.IsNullOrEmpty(this.oVM.IdentifyingType)) {
        this.oVM.MedlineVisibility = Visibility.Visible;
        this.GetLineItem(Convert.ToInt64(PatientContext.PrescriptionOID));
      }
    }
  }

  public oMsg_AlertBoxPromtNextClose(sender: Object, e: MessageEventArgs): void {
    if (e.MessageBoxResult == MessageBoxResult.OK) {
      if (this.oVM != null) {
        this.oVM.IsNextSupply = false;
        this.oVM.NextSupDTTM = DateTime.MinValue;
      }
    }
  }

  dtpDate_OnDateChange_Func = (s, e) => { 
    this.dtpNextSupDate = that.dtpNextSupDate;
    this.dtpDate_OnDateChange(s, e); 
  }
  private dtpDate_OnDateChange(sender: Object, e: DateChangeEventArgs): void {
    if (this.oVM != null && this.oVM.bAvoidNextSupplyFirsttime) {
      let dt: DateTime = DateTime.MinValue;
      if (sender != null && !String.IsNullOrEmpty(e.DateValue.ToString()) &&
        DateTime.TryParse(e.DateValue.ToString(), (o1) => {
          dt = o1;
        })) {
        if (dt.NotEquals(DateTime.MinValue) && dt.Date < CommonBB.GetServerDateTime().Date) {
          let oMsg: iMessageBox = new iMessageBox();
          oMsg.Title = Resource.multilist.lblNextSupplyDTTM_Text;
          oMsg.Message = Resource.TechValidate.TVCurrentDateMSG;
          oMsg.MessageButton = MessageBoxButton.OK;
          oMsg.IconType = MessageBoxType.Information;
          oMsg.MessageBoxClose = (s, e) => { this.oMsg_AlertBoxPromtNextClose(s, e); };
          oMsg.Show();
          this.dtpNextSupDate.SetDateValue(DateTime.MinValue);
          //e.DateValue = "";
          if (this.oVM != null) {
            this.oVM.IsNextSupply = true;
          }
          this.dtpNextSupDate.Focus();
          this.dtpNextSupDate.IsFocus = true;
        }
      }
    }
  }

  private GetProfileData(): void {
    let profile: ProfileFactoryType = new ProfileFactoryType();
    profile.OnProfileListLoaded = (s, e) => { this.profile_OnProfileLoaded(s, e); };
    let lstProfileReq: List<ProfileContext> = new List<ProfileContext>();
    let objReq: ProfileContext = new ProfileContext();
    objReq.ContextCode = "VW_MEDICONFIG";
    objReq.ProfileItemKey = "MEDLINEDISPLAY";
    objReq.ProfileType = typeof (CMedicationLineDisplayData);
    objReq.ProfileLevel = ProfileFactoryType.Level.User;
    lstProfileReq.Add(objReq);
    objReq = new ProfileContext();
    objReq.ContextCode = "VW_MEDICONFIG";
    objReq.ProfileItemKey = "PRINTCFG";
    objReq.ProfileType = typeof (PrintConfigurationData);
    objReq.ProfileLevel = ProfileFactoryType.Level.User;
    lstProfileReq.Add(objReq);
    objReq = new ProfileContext();
    objReq.ContextCode = "VW_MEDICONFIG";
    objReq.ProfileItemKey = "DRUGDISPCONFIG";
    objReq.ProfileType = typeof (MedDrugDisplayConfigData);
    objReq.ProfileLevel = ProfileFactoryType.Level.User;
    lstProfileReq.Add(objReq);
    profile.GetProfilesData(lstProfileReq);
  }

  profile_OnProfileLoaded(sender: Object, Result: List<ProfileContext>): void {
    Result.forEach((oProfileContext) => {
      if (String.Compare(oProfileContext.ContextCode, "VW_MEDICONFIG") == 0 && String.Compare(oProfileContext.ProfileItemKey, "MEDLINEDISPLAY") == 0) {
        if (oProfileContext.ProfileData instanceof CMedicationLineDisplayData) {
          MedicationCommonProfileData.MedLineDisplay = ObjectHelper.CreateType<CMedicationLineDisplayData>(oProfileContext.ProfileData, CMedicationLineDisplayData);
        }
      }
      if (String.Compare(oProfileContext.ContextCode, "VW_MEDICONFIG") == 0 && String.Compare(oProfileContext.ProfileItemKey, "PRINTCFG") == 0) {
        if (oProfileContext.ProfileData instanceof PrintConfigurationData) {
          ProfileData.PrintConfig = ObjectHelper.CreateType<PrintConfigurationData>(oProfileContext.ProfileData, PrintConfigurationData);
        }
      }
      if (String.Compare(oProfileContext.ContextCode, "VW_MEDICONFIG") == 0 && String.Compare(oProfileContext.ProfileItemKey, "DRUGDISPCONFIG") == 0) {
        if (oProfileContext.ProfileData instanceof MedDrugDisplayConfigData) {
          ProfileData.MedDrugDisplayConfig = ObjectHelper.CreateType<MedDrugDisplayConfigData>(oProfileContext.ProfileData, MedDrugDisplayConfigData);
        }
      }
    });
    this.GetSupplyInfo();   
  }

  public GetLineItem(lPrescriptionItemOID: number): void {
    let oMedicationDrugDetailsVM: PrescriptionItemDetailsVM = new PrescriptionItemDetailsVM();
    oMedicationDrugDetailsVM.PrescriptionItemOID = lPrescriptionItemOID;
    // oMedicationDrugDetailsVM.MedLineItemEvent = (s, e) => { this.oMedicationDrugDetailsVM_MedLineItemEvent(s, e); };
    oMedicationDrugDetailsVM.MedLineItemEvent = (s, e) => { Object.keys(that).forEach((prop) => (this[prop] = that[prop])); this.oMedicationDrugDetailsVM_MedLineItemEvent(s,e); };
    oMedicationDrugDetailsVM.GetDrugDetailsWithDomainCodeValues();
  }

  private oMedicationDrugDetailsVM_MedLineItemEvent(PresItemDetails: PrescriptionItemDetailsVM,e): void {
    if (MedicationCommonProfileData.MedLineDisplay != null) {
      let tbTextBlock: TextBlock = null;
      this.MedLineDisplay.Content = LineDisplayHelper.GetPrescriptionItem(MedicationCommonBB.GetPrescriptionLineItemVM(PresItemDetails), 200, String.Empty, (o) => { tbTextBlock = o; });
    }
  }

  public ShowMandatoryMsg(): void {
    let msgBox: iMessageBox = ObjectHelper.CreateObject(new iMessageBox(), { Title: "Lorenzo", Message: "The other instruction(s) cannot be blank.", IconType: MessageBoxType.Information, MessageButton: MessageBoxButton.OK });
    msgBox.MessageBoxClose = (s, e) => { this.msgBox_MessageBoxClose(s, e); };
    msgBox.Show();
  }

  msgBox_MessageBoxClose(sender: Object, e: MessageEventArgs): void {}

  private DisposeFormEvents(): void {
    if (this.oVM != null) {
      this.oVM.DoCleanup();
    }
  }

  private DisposeFormObject(): void {
    this.appDialog = null;
  }

  private iAppDialogWindow_Unloaded(sender: Object, e: RoutedEventArgs): void {
    this.DisposeFormEvents();
    this.DisposeFormObject();
  }

  public CancelButtonClick(): void {
    let iMsgBox: iMessageBox = ObjectHelper.CreateObject(new iMessageBox(), {
      Title: Resource.medauthorise.MessageBox_Title,
      Message: Resource.medauthorise.CancelCA_validation,
      MessageButton: MessageBoxButton.YesNo,
      IconType: MessageBoxType.Question
    });
    iMsgBox.MessageBoxClose = (s, e) => { this.iMsgBox_MessageBoxClose(s, e); };
    iMsgBox.Show();
  }

  iMsgBox_MessageBoxClose(sender: Object, e: MessageEventArgs): void {
    if (e.MessageBoxResult == MessageBoxResult.Yes) {
      this.appDialog.DialogResult = false;
    }
  }

  private grdData_RowLoaded(sender: Object, e: RowLoadedEventArgs): void {
    if (e.Row != null && e.Row.Item != null) {
      let oSupplyHistoryDetails: SupplyHistoryDetails = ObjectHelper.CreateType<SupplyHistoryDetails>(e.Row.Item, SupplyHistoryDetails);
      if (oSupplyHistoryDetails != null) {
        if (String.Equals(oSupplyHistoryDetails.PresItemstatusCode, CConstants.DISCONTINUED)) {
          e.dataItem['RowStyles'].push('Background_DISCONTINUED');
          // e.Row.Background = new SolidColorBrush(Colors.Grey);
        }
      }
    }
  }
  public SetDrugHeaderContent(PresItemVM: PrescriptionItemVM): void {
    if (this.DrugIcons != null && this.DrugIcons.Children != null) {
      this.DrugIcons.Children.Clear();
      let sTooltip: string[] = null;
      if (!String.IsNullOrEmpty(PresItemVM.ItemSubType) && (String.Compare(PresItemVM.ItemSubType, CConstants.SUBTYPE, StringComparison.OrdinalIgnoreCase) == 0)) {
        let MCtooltip: string = String.Empty;
        let sTip: StringBuilder = new StringBuilder();
        if (!String.IsNullOrEmpty(PresItemVM.FormViewerDetails.BasicDetails.mCIItemDisplay)) {
          sTooltip = PresItemVM.FormViewerDetails.BasicDetails.mCIItemDisplay.Split('^');
          let nLength: number = sTooltip.length;
          for (let i: number = 0; i < nLength; i++) {
            sTip.Append(sTooltip[i]);
            sTip.Append(Environment.NewLine);
          }
        }
        MCtooltip = sTip.ToString();
        MCtooltip = MCtooltip.TrimEnd('\n');
        MCtooltip = MCtooltip.TrimEnd('\r');
        let img1: Image = ObjectHelper.CreateObject(new Image(), { Margin: new Thickness(2, 0, 2, 0) });
        img1.Stretch = Stretch.None;
        img1.Source = new BitmapImage(new Uri(MedImage.GetPath(MedImages.ImgMltcmpnt), UriKind.RelativeOrAbsolute));
        ToolTipService.SetToolTip(img1, ObjectHelper.CreateObject(new iLabel(), { MaxWidth: 275, IsWordwrap: true, Text: MCtooltip }));
        img1.VerticalAlignment = VerticalAlignment.Bottom;
        this.DrugIcons.Children.Add(img1);
      }
      if ((PresItemVM.FormViewerDetails.BasicDetails.DrugProperties != null && PresItemVM.FormViewerDetails.BasicDetails.DrugProperties.Count > 0) && ((String.Compare(PresItemVM.ItemSubType, CConstants.SUBTYPE, StringComparison.OrdinalIgnoreCase) != 0) || (String.Compare(PresItemVM.ItemSubType, CConstants.SUBTYPE, StringComparison.OrdinalIgnoreCase) == 0))) {
        FormviewerDisplayHelper.GetDrugProperties(PresItemVM.FormViewerDetails.BasicDetails.DrugProperties, PresItemVM.FormViewerDetails.BasicDetails.IdentifyingType, this.DrugIcons, PresItemVM.FormViewerDetails.BasicDetails.itemSubType);
        if (String.Compare(PresItemVM.FormViewerDetails.BasicDetails.IdentifyingType, CConstants.CATALOGUEITEM) != 0 && String.Compare(PresItemVM.FormViewerDetails.BasicDetails.IdentifyingType, CConstants.ACTUALMOIETY) != 0) {
          let obsProp: ObservableCollection<ManagePrescSer.DrugProperty> = PresItemVM.FormViewerDetails.BasicDetails.DrugProperties;
          let CntrlDrugs = obsProp.Where(obj => String.Compare(obj.DrugPropertyCode, "CC_CNTRLDDRUG") == 0);
          if (CntrlDrugs != null && CntrlDrugs.Count() > 0) {
            if ((PresItemVM.ItemSubType != CConstants.SUBTYPE)) {
              if ((String.Compare(PatientContext.PrescriptionType, CConstants.Clerking) == 0 || String.Compare(PatientContext.PrescriptionType, PrescriptionTypes.ForAdministration) == 0)) {
                if (PresItemVM.FormViewerDetails.BHasFormViewParams && PresItemVM.FormViewerDetails.BasicDetails.IsQuantityMandatory) {
                  PresItemVM.FormViewerDetails.BasicDetails.IsQuantityMandatory = true;
                }
                else PresItemVM.FormViewerDetails.BasicDetails.IsQuantityMandatory = false;
              }
              else {
                PresItemVM.FormViewerDetails.BasicDetails.IsQuantityMandatory = true;
              }
            }
          }
        }
      }
    }
  }
}
