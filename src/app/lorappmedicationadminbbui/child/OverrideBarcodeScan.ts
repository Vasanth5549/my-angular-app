import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { iAppDialogWindow, WindowButtonType, AppDialogResult, AppDialogEventargs, ChildWizardCloseEventargs, ObservableCollection, CListItem, HtmlPage, Visibility, SelectionChangedEventArgs } from 'epma-platform/models';
import { OverrideBarcodeScanVM } from '../viewmodel/OverrideBarcodeScanVM';
import { ManageBarcodeHelper } from '../common/ManageBarcodeHelper';
import { MessageBoxButton, MessageBoxType, iMessageBox } from 'epma-platform/services';
import { CConstants, ValueDomain } from '../utilities/CConstants';
import { iButton, iCheckBox, iComboBox, iImage, iLabel, iTextBox } from 'epma-platform/controls';
import { Resource } from '../resource';
import { OverrideBarcodeScan as OverrideBarcodeScanRes } from '../resource/OverrideBarcodeScan.Designer';
import { ObjectHelper } from 'epma-platform/helper';
@Component({
  selector: 'OverrideBarcodeScan',
  templateUrl: './OverrideBarcodeScan.html'
})
export class OverrideBarcodeScan extends iAppDialogWindow implements OnInit, AfterViewInit {

  txtBarcodeOverride: iTextBox;
  @ViewChild('txtBarcodeOverrideTempRef', { read: iTextBox, static: false }) set _textbox1(c: iTextBox) { if (c) { this.txtBarcodeOverride = c; } }
  txtComments: iTextBox;
  @ViewChild('txtCommentsTempRef', { read: iTextBox, static: false }) set _textbox2(c: iTextBox) { if (c) { this.txtComments = c; } }
  iChkOverrideScan: iCheckBox;
  @ViewChild('iChkOverrideScanTempRef', { read: iCheckBox, static: false }) set _checkbox1(c: iCheckBox) { if (c) { this.iChkOverrideScan = c; } }
  lblResNotScan: iLabel;
  @ViewChild('lblResNotScanTempRef', { read: iLabel, static: false }) set _label1(c: iLabel) { if (c) { this.lblResNotScan = c; } }
  lblComments: iLabel;
  @ViewChild('lblCommentsTempRef', { read: iLabel, static: false }) set _label2(c: iLabel) { if (c) { this.lblComments = c; } }
  public cboResNotScan: iComboBox;
  @ViewChild('cboResNotScanTempRef', { read: iComboBox, static: false }) set _combobox1(c: iComboBox) { if (c) { this.cboResNotScan = c; } }
  cmdWristbandScan: iButton;
  @ViewChild('cmdWristbandScanTempRef', { read: iButton, static: false }) set _button1(c: iButton) { if (c) { this.cmdWristbandScan = c; } }
  lblAuditText: iLabel;
  @ViewChild('lblAuditTextTempRef', { read: iLabel, static: false }) set _label3(c: iLabel) { if (c) { this.lblAuditText = c; } }
  imgMsgIcon: iImage;
  @ViewChild('imgMsgIconTempRef', { read: iImage, static: false }) set _image1(c: iImage) { if (c) { this.imgMsgIcon = c; } }

  
  public oOverrideBarcodeScanVM: OverrideBarcodeScanVM;
  dblgrdOverrideScanHeight: number;
  isPatWBOverride: boolean = false;
  isMedicationOverride: boolean = false;
  oManageBarcodeHelper: ManageBarcodeHelper;
  objiMessageBox: iMessageBox;
  public oMedsAdministrator=Resource.MedicationAdministrator;
  cboResNotScan_SelectionChanged_Func:Function;

  iChkOverrideScan_Unchecked_Func: Function;
  iChkOverrideScan_Checked_Func: Function;

  constructor() {
      super();
  }
  GetResourceString(sKey: string) {
      let oOverrideBarcodeScanRes: OverrideBarcodeScanRes = new OverrideBarcodeScanRes();
      return oOverrideBarcodeScanRes.GetResourceString(sKey);
  }
  ngOnInit(): void {
    this.iChkOverrideScan_Unchecked_Func = (s, e) => { this.iChkOverrideScan_Unchecked(s); };
    this.iChkOverrideScan_Checked_Func = (s, e) => { this.iChkOverrideScan_Checked(s); };
    this.cboResNotScan_SelectionChanged_Func = (s, e) => { this.cboResNotScan_SelectionChanged(s, e) };
    this.cboResNotScan.IsDropDownStretch = false;
  }
  ngAfterViewInit(): void {
      this.iAppDialogWindow_Loaded();
  }
  private iAppDialogWindow_Loaded(): void {
      this.oOverrideBarcodeScanVM = <OverrideBarcodeScanVM>(this.DataContext as OverrideBarcodeScanVM);
      this.VisibileInvisibleScan();
  }
  private iAppDialogWindow_UnLoaded(): void {
      this.oOverrideBarcodeScanVM = null;
      if (this.objiMessageBox != null) {
          //this.objiMessageBox.Closed -= objiMessageBox_Closed;
          this.objiMessageBox = null;
      }
      if (this.oManageBarcodeHelper != null) {
          //this.oManageBarcodeHelper.GetPatientQuickSearchDetailsEvent -= GetPatientQuickSearchDetailsEvent;
          this.oManageBarcodeHelper = null;
      }
  }
  private VisibileInvisibleScan(): void {
      if (String.Equals(this.oOverrideBarcodeScanVM.OverrideDomain, ValueDomain.SCANPATWBD)) {
          this.isPatWBOverride = true;
      }
      else if (String.Equals(this.oOverrideBarcodeScanVM.OverrideDomain, ValueDomain.SCANMEDS)) {
          this.isMedicationOverride = true;
      }
      this.iChkOverrideScan.IsChecked = false;
      this.EnableDisableOverrideReason(false);
  }
  private EnableDisableOverrideReason(isEnable: boolean): void {
      this.lblResNotScan.IsEnabled = isEnable;
      this.cboResNotScan.IsEnabled = isEnable;
      this.lblComments.IsEnabled = isEnable;
      this.txtComments.IsEnabled = isEnable;
      var btnOk: iButton = this.GetOkButton(this);
      if (btnOk != null) {
          if (!isEnable) {
              btnOk.IsEnabled = false;
          }
          else {
              btnOk.IsEnabled = true;
          }
      }
      if (!isEnable) {
          if (this.isPatWBOverride) {
              this.cmdWristbandScan.Visibility = Visibility.Visible;
              this.txtBarcodeOverride.Visibility = Visibility.Visible;
              this.txtBarcodeOverride.Focus();
          }
          else {
              this.txtBarcodeOverride.Visibility = Visibility.Collapsed;
              this.cmdWristbandScan.Visibility = Visibility.Collapsed;
          }
          //this.dblgrdOverrideScanHeight = this.grdOverrideScan.ActualHeight;
          this.appDialog.Height = 250;
          this.lblAuditText.Visibility = Visibility.Collapsed;
      }
      else {
          this.appDialog.Height = 320;
          this.txtBarcodeOverride.Visibility = Visibility.Collapsed;
          this.cmdWristbandScan.Visibility = Visibility.Collapsed;
          this.lblAuditText.Visibility = Visibility.Visible;
      }
      this.imgMsgIcon.IsEnabled = false;

      if (isEnable) {
        this.ShowDivElement("divResNotScan");
        this.ShowDivElement("divAuditTxt");
      }
      else {
        this.HideDivElement("divResNotScan");
        this.HideDivElement("divAuditTxt");
      }
      // this.appDialog.UpdateLayout();
  }
  iChkOverrideScan_Unchecked(e): void {
      this.EnableDisableOverrideReason(false);
  }
  iChkOverrideScan_Checked(e): void {
      this.EnableDisableOverrideReason(true);
  }
  private IsReasonMandatory(sReasonCode: string): boolean {
      if (!String.IsNullOrEmpty(sReasonCode)) {
          for(let i=0; i<this.oOverrideBarcodeScanVM.OverrideScan.Count; i++) {
              let oCListItem: CListItem = this.oOverrideBarcodeScanVM.OverrideScan[i];
              if (String.Equals(sReasonCode, oCListItem.Value)) {
                  if (oCListItem.ConceptProperties != null && oCListItem.ConceptProperties.Any) {
                      if (this.isPatWBOverride) {
                          return oCListItem.ConceptProperties.Where(y => (y.Name.Equals("PAT_WRSTOTHER") && y.Value.Equals("PAT_WRST_OTHER"))).Any();
                      }
                      else if (this.isMedicationOverride) {
                          return oCListItem.ConceptProperties.Where(y => (y.Name.Equals("MEDS_BARCODEOVERIDE") && y.Value.Equals("MEDS_BARCODEOVERIDE"))).Any();
                      }
                      return false;
                  }
                  else {
                      return false;
                  }
              }
          }
      }
      return false;
  }
  cboResNotScan_SelectionChanged(sender: Object, e: SelectionChangedEventArgs): void {
      if (this.IsReasonMandatory(this.cboResNotScan.GetValue()))
          this.lblComments.Mandatory = true;
      else 
          this.lblComments.Mandatory = false;
  }
  public cmdOk_Click(): boolean {
      var validate_status: boolean = true;
      validate_status = this.CheckMandatoryFields();
      return validate_status;
  }
  private CheckMandatoryFields(): boolean {
    if (this.iChkOverrideScan&&this.iChkOverrideScan.IsChecked&&this.iChkOverrideScan.IsChecked == true) {
                this.objiMessageBox = new iMessageBox();
                this.objiMessageBox.Closed = (s,e) => { this.objiMessageBox_Closed(this.objiMessageBox) };
                 if(this.cboResNotScan.SelectedValue == null) {
                    this.objiMessageBox.Message = Resource.OverrideBarcodeScan.ReasonMandatoryMessage;
                    this.objiMessageBox.IconType = MessageBoxType.Information;
                    this.objiMessageBox.Title = CConstants.MSGTitleName;
                    this.objiMessageBox.MessageButton = MessageBoxButton.OK;
                    this.objiMessageBox.Tag= new String();
                    this.objiMessageBox.Tag = "Reason";
                    this.objiMessageBox.Show();
                }
                else if (String.IsNullOrEmpty(this.txtComments.Text) && this.IsReasonMandatory(this.cboResNotScan.GetValue())) {
                    this.objiMessageBox.Message = Resource.OverrideBarcodeScan.CommentsMandatoryMessage;
                    this.objiMessageBox.Title = CConstants.MSGTitleName;
                    this.objiMessageBox.IconType = MessageBoxType.Information;
                    this.objiMessageBox.MessageButton = MessageBoxButton.OK;
                    this.objiMessageBox.Tag = "Comments";
                    this.objiMessageBox.Show();
                }
                else {
                    return true;
                }
             return false;
         }
         else {
             return false;
         }
  }
  objiMessageBox_Closed(sender: Object): void {
      this.objiMessageBox = <iMessageBox>(sender as iMessageBox);
      if (String.Equals(this.objiMessageBox.Tag.ToString(), "Reason"))
          this.cboResNotScan.Focus();
      else if (String.Equals(this.objiMessageBox.Tag.ToString(), "Comments"))
          this.txtComments.Focus();
      if (this.objiMessageBox != null) {
          //this.objiMessageBox.Closed -= objiMessageBox_Closed;
      }
  }
  cmdWristbandScan_Click(e): void {
      this.txtBarcodeOverride.Focus();
  }
  txtBarcode_KeyDown(e): void {
      if (e.key == 'Enter') {
          this.oManageBarcodeHelper = new ManageBarcodeHelper();
          this.oManageBarcodeHelper.GetPatientQuickSearchDetailsEvent = (s) => { this.GetPatientQuickSearchDetailsEvent(s) };
          this.oManageBarcodeHelper.GetPatientQuickSearchDetails(this.txtBarcodeOverride.Text, this.oOverrideBarcodeScanVM.PrescriptionItemScheduleOID);
          this.txtBarcodeOverride.Text = String.Empty;
      }
  }
  private GetPatientQuickSearchDetailsEvent(isPatientWBScanSucess: boolean): void {
      if (isPatientWBScanSucess && super.onDialogClose != null) {
        super.onDialogClose(ObjectHelper.CreateObject(new AppDialogEventargs(), { Content: this, Result: AppDialogResult.Ok, AppChildWindow: super.appDialog }));
          //super.onDialogClose((new AppDialogEventargs() as { Content: this, Result: AppDialogResult.Ok, AppChildWindow: super.appDialog }));
      }
  }
  txtBarcode_LostFocus(e): void {
      this.txtBarcodeOverride.Text = String.Empty;
  }
  txtBarcode_GotFocus(e): void {
      this.txtBarcodeOverride.Text = String.Empty;
  }

  ShowDivElement(divName: string) {
    let div = <HTMLElement>document.getElementById(divName);
    div.style.display = 'block';
  }
  HideDivElement(divName: string) {
    let div = <HTMLElement>document.getElementById(divName);
    div.style.display = 'none';
  }
}
