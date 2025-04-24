import { Component, ViewChild, AfterViewInit, OnInit,EventEmitter } from '@angular/core';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, AppActivity, ObjectHelper } from "epma-platform/services";
import { CConstants, ValueDomain } from '../utilities/CConstants';
import { Resource } from 'src/app/lorappmedicationadminbbui/resource';
import { iTextBox, ToolTipService, iButton } from 'epma-platform/controls';
import { MedScanRecAdmin } from '../resource/MedScanRecAdmin.Designer';
import { iAppDialogWindow, ObservableCollection, Random, AppDialogResult, AppDialogEventargs, WindowButtonType, List } from 'epma-platform/models';
import { Visibility } from 'src/app/shared/epma-platform/controls-model/Visibility';
import { MedScanRecAdmVM, ProductDetailsGrid } from '../viewmodel/MedScanRecAdmVM';
import { OverrideBarcodeScanVM } from '../viewmodel/OverrideBarcodeScanVM';
import { WitnessHelper } from 'src/app/lorappmedicationcommonbb/utilities/witnesshelper';
import { OverrideBarcodeScan } from "../child/OverrideBarcodeScan";
import { MedicationAdministrationWSSoapClient, CResMsgMatchDrugEANCode, CMedBarcodeScanOverrideDetail, CReqMsgMatchDrugEANCode, MatchDrugEANCodeCompletedEventArgs, MatchEANCodeParams } from 'src/app/shared/epma-platform/soap-client/MedicationAdministrationWS';
import { ChartContext, MedChartData } from '../utilities/globalvariable';
import { CommonBB } from 'src/app/lorappcommonbb/utilities/common';
import { ManageBarcodeHelper } from '../common/ManageBarcodeHelper';
import { InfusionTypeCode } from 'src/app/lorappmedicationcommonbb/utilities/constants';
import { AppContextInfo, AppSessionInfo, PatientContext } from 'src/app/lorappcommonbb/utilities/globalvariable';
import DateTime from 'epma-platform/DateTime';
import { FrameworkElement } from "src/app/shared/epma-platform/controls/FrameworkElement";
import { GridComponent } from "@progress/kendo-angular-grid";
import { GridExtension, SelectionChangeEventArgs, SelectionMode } from "src/app/shared/epma-platform/controls/epma-grid-helpers/grid-extension";
import { MedScanProdDisplayPrescribedItemConverterPipe } from 'src/app/lorarcbluebirdmedicationchart/converter/MedChartConverter.pipe';

@Component({
  selector: 'MedScanRecordAdministration',
  templateUrl: 'MedScanRecordAdministration.html',
  styleUrls: ['MedScanRecordAdministration.css'],
})
export class MedScanRecordAdministration extends iAppDialogWindow  implements OnInit, AfterViewInit {
  
  oMedScanRecAdmin: MedScanRecAdmin;
  
  oMedScanRecAdmVM: MedScanRecAdmVM;
  objWitnessHelper: WitnessHelper;
  objScanRecordAdmin: iMessageBox = new iMessageBox();
  sParam: string = String.Empty;
  oOverrideBarcodeScan: OverrideBarcodeScan;
  lstCMedBarcodeScanOverrideDetail: ObservableCollection<CMedBarcodeScanOverrideDetail>  ;
  public OnCloseMedScanMezEvent: Function;
  ToAvoidRepeatCall: Boolean;
  oProductdtlgrd: ProductDetailsGrid;
  oSelectedPrescItem: ProductDetailsGrid;
  nSelectedRowIndex: number;
  ProdScanBackColor: string = "Transparent";

  MedScanProdDisplayPrescribedItem: MedScanProdDisplayPrescribedItemConverterPipe;
  dtpExpiryDate_OnDateValueChanged_Func: Function;

  txtMedBarcode: iTextBox;
  @ViewChild('txtMedBarcodeTempRef', { read: iTextBox, static: false }) set _textbox(c: iTextBox) { if (c) { this.txtMedBarcode = c;}}
  cmdEnableBarCode: iButton;
  @ViewChild('cmdEnableBarCodeTempRef', { read: iButton, static: false }) set _button1(c: iButton) { if (c) { this.cmdEnableBarCode = c; }}
  cmdAdd: iButton;
  @ViewChild('cmdAddTempRef', { read: iButton, static: false }) set _button2(c: iButton) { if (c) { this.cmdAdd = c; }}
  grdProductDetailList: GridExtension = new GridExtension();;
  @ViewChild('grdProductDetailListTempRef', { read: GridComponent, static: false }) set _grid1(c: GridComponent) { if (c) { this.grdProductDetailList.grid = c; this.grdProductDetailList.columns = c.columns; }}
  public changeDetection = new EventEmitter(); // emit to run change detection cycle for onpush strategy
  constructor() { 
    super();
    this.DataContext = new MedScanRecAdmVM();
  }
  ngOnInit(): void {
    this.dtpExpiryDate_OnDateValueChanged_Func = (s, e) => { this.dtpExpiryDate_OnDateValueChanged(s, e)};
  }
  ngAfterViewInit(): void {
    this.grdProductDetailList.RowIndicatorVisibility = Visibility.Visible;
    this.grdProductDetailList.SelectionMode = SelectionMode.Single;

   this.DataContext = this.oMedScanRecAdmVM;
    
    this.MedScanRecAdmin_Loaded();
    this.DataContext = this.oMedScanRecAdmVM;

    this.txtMedBarcode.Focus();
    this.grdProductDetailList.GridSelectionChange = (s, e) => { this.grdProductDetailList_SelectionChanged(s, e) };
  }
  GetResourceString(sKey: string) {
    this.oMedScanRecAdmin = new MedScanRecAdmin();
    return this.oMedScanRecAdmin.GetResourceString(sKey);
  }
  private MedScanRecAdmin_Loaded(): void {
    this.oMedScanRecAdmVM = <MedScanRecAdmVM>(this.DataContext as MedScanRecAdmVM);
    if(this.oMedScanRecAdmVM != null) {
      if (this.oMedScanRecAdmVM.oProductDetailsInfo != null && this.oMedScanRecAdmVM.oProductDetailsInfo.Count > 0) {
          this.grdProductDetailList.ItemsSource = this.oMedScanRecAdmVM.oProductDetailsInfo;
          if (this.oMedScanRecAdmVM.IsProductScanned == 'S') {
              this.oMedScanRecAdmVM.IsbtnAddVisible = Visibility.Collapsed;
          }
          else if (this.oMedScanRecAdmVM.IsProductScanned == 'M') {
              this.ProdScanBackColor = "Grey";
          }
          if (this.grdProductDetailList.Rows.Count > 0) {
              this.grdProductDetailList.setSelectedItemByIndex(0);
              var oSelectPrescItem: ProductDetailsGrid = this.grdProductDetailList.Items[0];
              this.oSelectedPrescItem = oSelectPrescItem;
              if (oSelectPrescItem != null && this.grdProductDetailList.GetSelectedRowCount() > 0) {
                  this.oMedScanRecAdmVM.ProductScannedhdrValue = oSelectPrescItem.Productscanned;
                  if (this.grdProductDetailList.SelectedItem)
                    this.oMedScanRecAdmVM.IsDisEnableRemovebtn = true;
              }
          }
      }
      if (this.oMedScanRecAdmVM.IsMedicationReadOnly) {
          this.grdProductDetailList.IsReadOnly = true;
          this.oMedScanRecAdmVM.IsEnableTotalDoseValueAdmin = false;
          this.oMedScanRecAdmVM.IsbtnAddVisible = Visibility.Collapsed;
          this.oMedScanRecAdmVM.IsbtnRmvVisible = Visibility.Collapsed;
          this.oMedScanRecAdmVM.IsScanEnabledVis = Visibility.Collapsed;
          this.oMedScanRecAdmVM.IstxtBarcodeVis = Visibility.Collapsed;
      }
    }
  }
  cmdEnableBarCode_Click(e): void {
    this.txtMedBarcode.Focus();
  }
  txtMedBarcode_LostFocus(e): void {
    this.cmdEnableBarCode.Text = Resource.MedScanRecAdmin.Enable_scan;
    ToolTipService.SetToolTip(this.cmdEnableBarCode, Resource.MedScanRecAdmin.Enable_scan);
    this.cmdEnableBarCode.IsEnabled = true;
    this.txtMedBarcode.Text = String.Empty;
  }
  txtMedBarcode_GotFocus(e): void {
    this.cmdEnableBarCode.Text = Resource.MedScanRecAdmin.Scan_enabled;
    ToolTipService.SetToolTip(this.cmdEnableBarCode, Resource.MedScanRecAdmin.Scan_enabled);
    this.txtMedBarcode.Text = String.Empty;
  }
  txtMedBarcode_KeyDown(e): void {
    if (e.key == 'Enter' && !String.IsNullOrEmpty(this.txtMedBarcode.Text) && this.txtMedBarcode.Text.length > 0) {
      if (this.oMedScanRecAdmVM.IsProductScanned == 'M') {
        var oMsg: iMessageBox = new iMessageBox();
        oMsg.Title = CConstants.MSGTitleName;
        oMsg.Message = Resource.MedScanRecAdmin.ManualAdd_msg;
        oMsg.MessageButton = MessageBoxButton.OK;
        oMsg.IconType = MessageBoxType.Information;
        oMsg.MessageBoxClose = (s, e) => { this.ManualScannedProduct_MsgBoxClosed(s, e) };
        oMsg.Show();
        return
      }
      else {
        var sEANCode: string = String.Empty;
        sEANCode = this.txtMedBarcode.Text;
        this.txtMedBarcode.Text = String.Empty;
        this.oMedScanRecAdmVM.EANGTINCode = this.oMedScanRecAdmVM.GetScannedItemDetails(sEANCode);
        var objService: MedicationAdministrationWSSoapClient = new MedicationAdministrationWSSoapClient();
        objService.MatchDrugEANCodeCompleted = (s,e) => { this.objService_MatchDrugEANCodeCompleted(s,e) };
        var objReq: CReqMsgMatchDrugEANCode = new CReqMsgMatchDrugEANCode();
        objReq.oContextInformation = CommonBB.FillContext();
        objReq.oMatchEANCodeParamsBC = new MatchEANCodeParams();
        objReq.oMatchEANCodeParamsBC.EANCode = this.oMedScanRecAdmVM.EANGTINCode;
        objReq.oMatchEANCodeParamsBC.ActiveMCVersionNo = !String.IsNullOrEmpty(AppSessionInfo.AMCV) ? AppSessionInfo.AMCV : this.oMedScanRecAdmVM.MCVersion;
        objReq.oMatchEANCodeParamsBC.PrescriptionItemOID = this.oMedScanRecAdmVM.lnPrescriptionOID;
        objReq.oMatchEANCodeParamsBC.SlotDose = this.oMedScanRecAdmVM.SlotDose.ToString();
        objReq.oMatchEANCodeParamsBC.SlotDoseUOM = this.oMedScanRecAdmVM.sDoseValUOM;
        objReq.oMatchEANCodeParamsBC.SlotDoseUOMLzoID = this.oMedScanRecAdmVM.sDoseUOMLzoID;
        objReq.oMatchEANCodeParamsBC.PatientOID = ChartContext.PatientOID;
        objReq.oMatchEANCodeParamsBC.IsInfPrescribeWithFluid = this.oMedScanRecAdmVM.IsInfPrescribeWithFluid;
        objReq.oMatchEANCodeParamsBC.RecMedRouteOID = this.oMedScanRecAdmVM.RecMedRouteOID;
        objService.MatchDrugEANCodeAsync(objReq);
      }
    }
  }
  objService_MatchDrugEANCodeCompleted(sender: Object, e: MatchDrugEANCodeCompletedEventArgs): void {
    var sMessage: string = String.Empty;
    var oManageBarcodeHelper: ManageBarcodeHelper = new ManageBarcodeHelper();
    if(e.Result != null && this.oMedScanRecAdmVM != null && !String.IsNullOrEmpty(this.oMedScanRecAdmVM.EANGTINCode) && this.oMedScanRecAdmVM.EANGTINCode.Count() > 0) {
      var objRes: CResMsgMatchDrugEANCode = e.Result;
      if (objRes != null && objRes.oContextInformation != null && objRes.oContextInformation.Errors != null && objRes.oContextInformation.Errors.Count > 0) {
        if (objRes.oContextInformation.Errors[0].ErrorID == 8000001) {
            this.ShowInvalidProductIdentifierMsg();
            oManageBarcodeHelper.InsertMedBarcodeScanLog(CConstants.MEDCHART, CConstants.PATWBSCANINVALIDBARCODE, this.oMedScanRecAdmVM.EANGTINCode, this.oMedScanRecAdmVM.PresScheduleOID);
            return
        }
        else if (objRes.oContextInformation.Errors[0].ErrorID == 8000002 || objRes.oContextInformation.Errors[0].ErrorID == 8000003 || objRes.oContextInformation.Errors[0].ErrorID == 8000004) {
            var ScannedInvalidDrugName: string = objRes.oMatchEANCodeResult.ScannedDrugName;
            this.ShowInvalidProductSelectedMsg(ScannedInvalidDrugName);
            oManageBarcodeHelper.InsertMedBarcodeScanLog(CConstants.MEDCHART, CConstants.PATWBSCANINVALIDBARCODE, this.oMedScanRecAdmVM.EANGTINCode, this.oMedScanRecAdmVM.PresScheduleOID);
            return
        }
        else if (objRes.oContextInformation.Errors.Any(c => c.ErrorID > 0 && c.ErrorID == 80000013)) {
            this.ShownGTINCodelinkedMultipleproductMsg();
            oManageBarcodeHelper.InsertMedBarcodeScanLog(CConstants.MEDCHART, CConstants.PATWBSCANINVALIDBARCODE, this.oMedScanRecAdmVM.EANGTINCode, this.oMedScanRecAdmVM.PresScheduleOID);
            return
        }
        else if (((this.oMedScanRecAdmVM.oDrugHeader != null && this.oMedScanRecAdmVM.oDrugHeader.oDrugHdrBasicInfo != null && !String.IsNullOrEmpty(this.oMedScanRecAdmVM.oDrugHeader.oDrugHdrBasicInfo.INFTYCODE) && (String.Equals(this.oMedScanRecAdmVM.oDrugHeader.oDrugHdrBasicInfo.INFTYCODE, InfusionTypeCode.CONTINUOUS) || String.Equals(this.oMedScanRecAdmVM.oDrugHeader.oDrugHdrBasicInfo.INFTYCODE, InfusionTypeCode.FLUID) || String.Equals(this.oMedScanRecAdmVM.oDrugHeader.oDrugHdrBasicInfo.INFTYCODE, InfusionTypeCode.PCA))) || (objRes.oContextInformation.Errors.Any(c => c.ErrorID > 0 && (c.ErrorID == 8000012 || c.ErrorID == 8000014 || c.ErrorID == 8000016))))) {
            this.oProductdtlgrd = new ProductDetailsGrid();
            this.oProductdtlgrd = this.FillScanProductDetail(objRes);
            if (this.oProductdtlgrd != null) {
                this.AddScanProductDetail(this.oProductdtlgrd);
                this.oMedScanRecAdmVM.EANGTINCode = String.Empty;
            }
        }
        else {
            var bErrorID: boolean = objRes.oContextInformation.Errors.Any(c => c.ErrorID > 0 && (c.ErrorID == 8000015 || c.ErrorID == 8000017 || c.ErrorID == 8000018));
            if (bErrorID) {
                this.oProductdtlgrd = new ProductDetailsGrid();
                this.oProductdtlgrd = this.FillScanProductDetail(objRes);
                this.ShownStrengthNotMatchMsg();
            }
        }
        this.oMedScanRecAdmVM.BatchNumber = String.Empty;
        this.oMedScanRecAdmVM.SerialNumber = String.Empty;
      }
      else {
        oManageBarcodeHelper.InsertMedBarcodeScanLog(CConstants.MEDCHART, CConstants.PATWBSCANFAILURE, this.oMedScanRecAdmVM.EANGTINCode, this.oMedScanRecAdmVM.PresScheduleOID);
        this.oMedScanRecAdmVM.EANGTINCode = String.Empty;
      }
    }
  }
  ManualScannedProduct_MsgBoxClosed(s, e): void {
    this.cmdAdd.Focus();
  }
  private FillScanProductDetail(objRes: CResMsgMatchDrugEANCode): ProductDetailsGrid {
    var objProductdetailgrd: ProductDetailsGrid = new ProductDetailsGrid();
    if (objRes != null) {
      objProductdetailgrd.Productscanned = objRes.oMatchEANCodeResult.ScannedDrugName;
      objProductdetailgrd.Productcode = this.oMedScanRecAdmVM.EANGTINCode;
      objProductdetailgrd.Expirydate = (this.oMedScanRecAdmVM.ExpiryDate != null && DateTime.NotEquals(this.oMedScanRecAdmVM.ExpiryDate, DateTime.MinValue)) ? this.oMedScanRecAdmVM.ExpiryDate : DateTime.MinValue;
      objProductdetailgrd.Batchnumber = !String.IsNullOrEmpty(this.oMedScanRecAdmVM.BatchNumber) ? this.oMedScanRecAdmVM.BatchNumber : String.Empty;
      objProductdetailgrd.Serialnumber = !String.IsNullOrEmpty(this.oMedScanRecAdmVM.SerialNumber) ? this.oMedScanRecAdmVM.SerialNumber : String.Empty;
      objProductdetailgrd.IsPresFluidProduct = objRes.oMatchEANCodeResult.IsInfusionFluid;
      objProductdetailgrd.IsExpiryDateEnabled =(DateTime.Equals(this.oMedScanRecAdmVM.ExpiryDate , null)) || (DateTime.Equals(this.oMedScanRecAdmVM.ExpiryDate , DateTime.MinValue)) ? true : false;
      objProductdetailgrd.IsBatchNumberEnabled = String.IsNullOrEmpty(this.oMedScanRecAdmVM.BatchNumber) ? true : false;
      objProductdetailgrd.IsSerialNumberEnabled = String.IsNullOrEmpty(this.oMedScanRecAdmVM.SerialNumber) ? true : false;
      objProductdetailgrd.PackageUOM = objRes.oMatchEANCodeResult.PackageUOM;
      objProductdetailgrd.PacKageUOMLZOID = objRes.oMatchEANCodeResult.PacKageUOMLZOID;
      objProductdetailgrd.PresItemStrengthUOM = objRes.oMatchEANCodeResult.PresItemStrengthUOM;
      if (objRes.oMatchEANCodeResult.PresItemStrengthValue > 0) {
          objProductdetailgrd.PresItemStrengthValue = objRes.oMatchEANCodeResult.PresItemStrengthValue;
      }
      else {
          objProductdetailgrd.PresItemStrengthValue = 1;
      }
      if (objRes.oMatchEANCodeResult.PresItemDoseMultiplier > 0) {
          objProductdetailgrd.PresItemDoseMultiplier = objRes.oMatchEANCodeResult.PresItemDoseMultiplier;
      }
      else {
          objProductdetailgrd.PresItemDoseMultiplier = 1;
      }
      if (objRes.oMatchEANCodeResult.PresItemDoseDivider > 0) {
          objProductdetailgrd.PresItemDoseDivider = objRes.oMatchEANCodeResult.PresItemDoseDivider;
      }
      else {
          objProductdetailgrd.PresItemDoseDivider = 1;
      }
      objProductdetailgrd.IsProductEnabled = false;
      objProductdetailgrd.ScanProductLZOID = objRes.oMatchEANCodeResult.ScanProductLZOID;
      var UnqID: Random = new Random();
      objProductdetailgrd.UniqueID = UnqID.Next();
    }

    this.oMedScanRecAdmVM.ProductScannedhdrValue = objProductdetailgrd.Productscanned;

    return objProductdetailgrd;
  }
  private AddScanProductDetail(oProductdtlgrd: ProductDetailsGrid): void {
    var oManageBarcodeHelper: ManageBarcodeHelper = new ManageBarcodeHelper();
    if(oProductdtlgrd != null) {
      this.oMedScanRecAdmVM.oProductDetailsInfo.Add(oProductdtlgrd);
      this.grdProductDetailList.ItemsSource = this.oMedScanRecAdmVM.oProductDetailsInfo;
      if (this.oMedScanRecAdmVM != null && this.oMedScanRecAdmVM.oProductDetailsInfo != null && this.oMedScanRecAdmVM.oProductDetailsInfo.Count > 0) {
        this.ProdScanBackColor = "Transparent";
      }
      this.oMedScanRecAdmVM.IsbtnAddVisible = Visibility.Collapsed;
      this.ValidateExpiryDTTM();
      oManageBarcodeHelper.InsertMedBarcodeScanLog(CConstants.MEDCHART, CConstants.PATWBSCANSUCCESS, this.oMedScanRecAdmVM.EANGTINCode, this.oMedScanRecAdmVM.PresScheduleOID);
      if (this.oMedScanRecAdmVM.oProductDetailsInfo != null && this.oMedScanRecAdmVM.oProductDetailsInfo.Count > 0) {
        this.oMedScanRecAdmVM.IsProductScanned = 'S';
      }

      this.nSelectedRowIndex = this.grdProductDetailList.GetLastRowIndex();
      this.grdProductDetailList.UnselectAll();
      this.grdProductDetailList.setSelectedItemByIndex(this.nSelectedRowIndex);
      this.oSelectedPrescItem = this.grdProductDetailList.SelectedItem;
      if (this.grdProductDetailList.SelectedItem)
        this.oMedScanRecAdmVM.IsDisEnableRemovebtn = true;
        this.changeDetection.emit();  
    }
  }
  cmdAdd_Click(e): void {
    var objgrddata: ProductDetailsGrid = new ProductDetailsGrid();
    objgrddata.IsEnabledisableAdminAmt = false;
    objgrddata.IsProductEnabled = true;
    objgrddata.IsExpiryDateEnabled = true;
    objgrddata.IsBatchNumberEnabled = true;
    objgrddata.IsSerialNumberEnabled = true;
    var UnqID: Random = new Random();
    objgrddata.UniqueID = UnqID.Next();
    this.ProdScanBackColor = "Grey";
    this.oMedScanRecAdmVM.oProductDetailsInfo.Add(objgrddata);
    this.grdProductDetailList.ItemsSource = this.oMedScanRecAdmVM.oProductDetailsInfo;
    this.grdProductDetailList.ScrollIntoView(objgrddata);
    if(this.oMedScanRecAdmVM.oProductDetailsInfo != null && this.oMedScanRecAdmVM.oProductDetailsInfo.Count > 0) {
      this.oMedScanRecAdmVM.IsProductScanned = 'M';
    }

    this.oSelectedPrescItem = this.grdProductDetailList.SelectedItem;
    if (this.grdProductDetailList.SelectedItem)
      this.oMedScanRecAdmVM.IsDisEnableRemovebtn = true;
  }
  cmdRemove_Click(e): void {
    this.RemoveRowFromGrdProductDetail(this.grdProductDetailList,true);
  }

  RowSelectionChanged({trigger, selectedRowIndex}) {
    if (trigger && selectedRowIndex != undefined) {
        let e: SelectionChangeEventArgs = {};
        let addedItems: List = new List();
        addedItems.Add(this.oMedScanRecAdmVM.oProductDetailsInfo[selectedRowIndex]);
        e.AddedItems = addedItems;
        this.grdProductDetailList.selectedRowsIndex = [selectedRowIndex];
        e['index']= selectedRowIndex;
        this.grdProductDetailList_SelectionChanged({}, e);
    }
} 
  public grdProductDetailList_SelectionChanged(sender: Object, e: SelectionChangeEventArgs): void {
    this.oSelectedPrescItem = e.AddedItems[0];
    this.nSelectedRowIndex = e['index'];

    if(this.oSelectedPrescItem != null && e.AddedItems.Count > 0) {
      this.oMedScanRecAdmVM.ProductScannedhdrValue = this.oSelectedPrescItem.Productscanned;
      this.oMedScanRecAdmVM.IsDisEnableRemovebtn = true;
    }
  }
  grdProductDetailList_RowLoaded(e): void {
    if(e.Row != null && e.Row.Item != null && this.oMedScanRecAdmVM != null) {
      var oProdDetailsGrid: ProductDetailsGrid = <ProductDetailsGrid>(e.Row.Item as ProductDetailsGrid);
      if (oProdDetailsGrid instanceof ProductDetailsGrid && oProdDetailsGrid != null && String.Equals(this.oMedScanRecAdmVM.IsProductScanned, 'S')) {
        e.Row.IsSelected = true;
      }
    }
  }
  private ValidateExpiryDTTM(): void {
    if(this.oMedScanRecAdmVM.oProductDetailsInfo != null && this.oMedScanRecAdmVM.ExpiryDate != null) {
      if (DateTime.NotEquals(this.oMedScanRecAdmVM.ExpiryDate , DateTime.MinValue) && (DateTime.LessThan(this.oMedScanRecAdmVM.ExpiryDate.Date , DateTime.Now.Date))) {
        var oMsg: iMessageBox = new iMessageBox();
        oMsg.Title = CConstants.MSGTitleName;
        oMsg.Message = Resource.MedScanRecAdmin.ExpiryDTTM_Msg;
        oMsg.MessageButton = MessageBoxButton.YesNo;
        oMsg.IconType = MessageBoxType.Question;
        if (this.grdProductDetailList.SelectedItem != null) {
            var oSelectPrescItem: ProductDetailsGrid = <ProductDetailsGrid>(this.grdProductDetailList.SelectedItem as ProductDetailsGrid);
            if (oSelectPrescItem != null && this.oMedScanRecAdmVM.oProductDetailsInfo != null && this.oMedScanRecAdmVM.oProductDetailsInfo.Count > 0) {
                this.oMedScanRecAdmVM.oProductDetailsInfo.ForEach(ReInsert => {
                    if (ReInsert != null && ReInsert.UniqueID == oSelectPrescItem.UniqueID) {
                        ReInsert.IsPastExpiryDTTM = true;
                    }
                });
            }
        }
        oMsg.MessageBoxClose = (s,e) => { this.oMsg_DatePromptClose(s,e) };
        oMsg.Show();
      }
    }
  }
  private dtpExpiryDate_OnDateValueChanged(sender, e): void {
    var dt: DateTime = DateTime.MinValue;
    if(!this.ToAvoidRepeatCall && sender != null && DateTime.NotEquals(sender._SelectedDateTime , DateTime.MinValue)) {
      dt = sender._SelectedDateTime;
      if (DateTime.NotEquals(dt , DateTime.MinValue) && DateTime.LessThan(dt.Date , DateTime.Now.Date)) {
        this.ToAvoidRepeatCall = true;
        this.oMedScanRecAdmVM.IsExpiryDTMsgShown = true;
        var oMsg: iMessageBox = new iMessageBox();
        oMsg.Title = CConstants.MSGTitleName;
        oMsg.Message = Resource.MedScanRecAdmin.ExpiryDTTM_Msg;
        oMsg.MessageButton = MessageBoxButton.YesNo;
        oMsg.IconType = MessageBoxType.Question;
        if (<FrameworkElement>(sender as FrameworkElement) != null) {
            var oProdDtlsGrid: ProductDetailsGrid = <ProductDetailsGrid>((<FrameworkElement>(sender as FrameworkElement)).DataContext as ProductDetailsGrid);
            if (oProdDtlsGrid != null && this.oMedScanRecAdmVM.oProductDetailsInfo != null && this.oMedScanRecAdmVM.oProductDetailsInfo.Count > 0) {
                this.oMedScanRecAdmVM.oProductDetailsInfo.ForEach(ReInsert => {
                    if (ReInsert != null && ReInsert.UniqueID == oProdDtlsGrid.UniqueID) {
                        if (ReInsert.IsAllowOverideExpiryDTTM) {
                            ReInsert.IsAllowOverideExpiryDTTM = false;
                        }
                        ReInsert.IsPastExpiryDTTM = true;
                    }
                });
            }
        }
        oMsg.MessageBoxClose = (s,e) => { this.oMsg_DatePromptClose(s, e) };
        oMsg.Show();
      }
    }
  }
  oMsg_DatePromptClose(sender: Object, e: MessageEventArgs): void {
    this.ToAvoidRepeatCall = false;
    this.oMedScanRecAdmVM.IsExpiryDTMsgShown = false;
    if(e.MessageBoxResult == MessageBoxResult.Yes) {
      this.LaunchMedsOverrideMezzanine("ExpiryDTTM", "Product", Resource.MedScanRecAdmin.ExpiryDTTM_Msg);
    }
    else if (e.MessageBoxResult == MessageBoxResult.No) {
      this.RemoveRowFromGrdProductDetail(this.grdProductDetailList, false);
      this.txtMedBarcode.Focus();
    }
  }
  private RemoveRowFromGrdProductDetail(grdProdDtlst: GridExtension, IsAllowRemoveitem: boolean): void {
    if(grdProdDtlst != null && grdProdDtlst.Rows != null && grdProdDtlst.Rows.Count > 0) {
      //this.oMedScanRecAdmVM.IsDisEnableRemovebtn = true;
      if (this.oSelectedPrescItem != null) {
        if (this.nSelectedRowIndex != -1 && ((IsAllowRemoveitem) || (!IsAllowRemoveitem && !this.oSelectedPrescItem.IsAllowOverideExpiryDTTM && DateTime.NotEquals(this.oSelectedPrescItem.Expirydate , DateTime.MinValue) && DateTime.LessThan(this.oSelectedPrescItem.Expirydate.Date , DateTime.Now.Date)))) {

          if(this.nSelectedRowIndex == null)
          {
            this.nSelectedRowIndex = grdProdDtlst.GetCurrentRowIndex();
          }

            this.oMedScanRecAdmVM.oProductDetailsInfo.RemoveAt(this.nSelectedRowIndex);

            if (this.grdProductDetailList.GetLastRowIndex() < this.nSelectedRowIndex) {
              this.nSelectedRowIndex = this.nSelectedRowIndex - 1
              this.grdProductDetailList.UnselectAll();
              this.grdProductDetailList.setSelectedItemByIndex(this.nSelectedRowIndex);
              this.oSelectedPrescItem = this.grdProductDetailList.SelectedItem;

              if (this.nSelectedRowIndex < 0)
                this.oMedScanRecAdmVM.IsDisEnableRemovebtn = false;
            }
        }
        else {
            if (!IsAllowRemoveitem && this.oMedScanRecAdmVM.oProductDetailsInfo != null && this.oMedScanRecAdmVM.oProductDetailsInfo.Count > 0) {
                var nCount: number = this.oMedScanRecAdmVM.oProductDetailsInfo.Count;
                for (var i: number = 0; i < nCount; i++) {
                    if (!this.oMedScanRecAdmVM.oProductDetailsInfo[i].IsAllowOverideExpiryDTTM && DateTime.NotEquals(this.oMedScanRecAdmVM.oProductDetailsInfo[i].Expirydate , DateTime.MinValue) && DateTime.LessThan(this.oMedScanRecAdmVM.oProductDetailsInfo[i].Expirydate.Date , DateTime.Now.Date)) {
                        this.oMedScanRecAdmVM.oProductDetailsInfo.Remove(this.oMedScanRecAdmVM.oProductDetailsInfo[i]);
                        break;
                    }
                }
            }
        }
        this.grdProductDetailList.ItemsSource = this.oMedScanRecAdmVM.oProductDetailsInfo;
        if (this.oSelectedPrescItem)
          this.oMedScanRecAdmVM.ProductScannedhdrValue = this.oSelectedPrescItem.Productscanned;
      }
    }
    if (this.oMedScanRecAdmVM.oProductDetailsInfo == null || (this.oMedScanRecAdmVM.oProductDetailsInfo != null && this.oMedScanRecAdmVM.oProductDetailsInfo.Count == 0)) {
      this.oMedScanRecAdmVM.IsDisEnableRemovebtn = false;
      this.oMedScanRecAdmVM.ProductScannedhdrValue = String.Empty;
      this.oMedScanRecAdmVM.IsbtnAddVisible = Visibility.Visible;
      this.oMedScanRecAdmVM.IsProductScanned = 'N';
      this.txtMedBarcode.Focus();
    }
  }
  private MedScanRecAdmin_Unloaded(e): void {

  }
  private LaunchMedsOverrideMezzanine(OverrideReasonType: string, OverrideIdentifyngType: string, MessageText: string): void {
    this.oOverrideBarcodeScan = new OverrideBarcodeScan();
    this.oMedScanRecAdmVM.OverrideReasonType = OverrideReasonType;
    this.oMedScanRecAdmVM.OverrideIdentifyngType = OverrideIdentifyngType;
    this.oMedScanRecAdmVM.MessageTxt = MessageText;
    this.oOverrideBarcodeScan.DataContext = new OverrideBarcodeScanVM(ValueDomain.SCANMEDS, this.oMedScanRecAdmVM.MessageTxt, this.oMedScanRecAdmVM.PresScheduleOID);
    this.oOverrideBarcodeScan.onDialogClose = this.oOverrideMedBarcodeScan_Closed;
    let Callback = (s, e) => {
      if (s != null && e != null) {
          this.oOverrideBarcodeScan = s;
      }
  }
    AppActivity.OpenWindow(CConstants.OVERRIDESCANTITLE, this.oOverrideBarcodeScan, (s) => { this.oOverrideMedBarcodeScan_Closed(s) }, String.Empty, false, 300, 420, false, WindowButtonType.OkCancel, null, null, null, Callback);
  }

  oOverrideMedBarcodeScan_Closed(args: AppDialogEventargs): void
  {
    if (args.Result == AppDialogResult.Ok) {
      this.oOverrideBarcodeScan = ObjectHelper.CreateType<OverrideBarcodeScan>(args.Content.Component, OverrideBarcodeScan);
      var bOverridedialogresult: boolean = this.oOverrideBarcodeScan.cmdOk_Click();
      var bIsOverrideReason: boolean;
      bIsOverrideReason = (this.oOverrideBarcodeScan != null && this.oOverrideBarcodeScan.oOverrideBarcodeScanVM.IsOverrideScan) ? true : false;
      if (bOverridedialogresult && bIsOverrideReason && this.oOverrideBarcodeScan != null && this.oOverrideBarcodeScan.oOverrideBarcodeScanVM.OverrideScanSelected != null && !String.IsNullOrEmpty(this.oOverrideBarcodeScan.oOverrideBarcodeScanVM.OverrideScanSelected.Value)) {
        var sIdentifyingType: string = String.Empty;
        sIdentifyingType = (!String.IsNullOrEmpty(this.oMedScanRecAdmVM.OverrideReasonType) && String.Equals(this.oMedScanRecAdmVM.OverrideReasonType, "ProductCode")) ? CConstants.MedIdentifyingType : CConstants.MedPresItemScannedDetail;
        this.SetOverrideReason(this.oOverrideBarcodeScan.oOverrideBarcodeScanVM.OverrideScanSelected.Value, this.oOverrideBarcodeScan.oOverrideBarcodeScanVM.OverrideComments, sIdentifyingType);
        args.AppChildWindow.DialogResult = true;
        if (String.Equals(this.oMedScanRecAdmVM.OverrideReasonType, "ProductCode")) {
          if (this.OnCloseMedScanMezEvent != null) {
            this.OnCloseMedScanMezEvent();
          }
          this.dupDialogRef.close();
        }
      }

    }
    else if (args.Result == AppDialogResult.Cancel) {
      if (!String.IsNullOrEmpty(this.oMedScanRecAdmVM.OverrideReasonType) && String.Equals(this.oMedScanRecAdmVM.OverrideReasonType, "ExpiryDTTM")) {
        this.RemoveRowFromGrdProductDetail(this.grdProductDetailList, false);
      }
      args.AppChildWindow.DialogRef.close();
    }
    this.oMedScanRecAdmVM.OverrideIdentifyngType = String.Empty;
    this.oMedScanRecAdmVM.OverrideReasonType = String.Empty;
    this.oMedScanRecAdmVM.MessageTxt = String.Empty;
  }
  private SetOverrideReason(sOverrideReason: string, sComments: string, IdentifyingType: string): void {
    if(this.lstCMedBarcodeScanOverrideDetail == null)
      this.lstCMedBarcodeScanOverrideDetail = new ObservableCollection<CMedBarcodeScanOverrideDetail>();
    var oCMedBarcodeScanOverrideDetail: CMedBarcodeScanOverrideDetail = new CMedBarcodeScanOverrideDetail();
    oCMedBarcodeScanOverrideDetail.IdentifyingType = IdentifyingType;
    oCMedBarcodeScanOverrideDetail.OverrideReasonType = this.oMedScanRecAdmVM.OverrideReasonType;
    oCMedBarcodeScanOverrideDetail.EncounterOID = PatientContext.EncounterOid;
    oCMedBarcodeScanOverrideDetail.ServiceOID = MedChartData.ServiceOID;
    oCMedBarcodeScanOverrideDetail.OverrideScanReason = sOverrideReason;
    oCMedBarcodeScanOverrideDetail.Comments = sComments;
    if (!String.IsNullOrEmpty(AppContextInfo.UserOID)) {
      var lUserOID: number = 0;
      Number.TryParse(AppContextInfo.UserOID, (o) => { lUserOID });
      oCMedBarcodeScanOverrideDetail.OverrideByUserOID = lUserOID;
    }
    oCMedBarcodeScanOverrideDetail.OverrideDTTM = CommonBB.GetServerDateTime();
    if (String.Equals(this.oMedScanRecAdmVM.OverrideReasonType, "ExpiryDTTM")) {
      var oTempCMedBarcodeScanOverridedtl: ObservableCollection<CMedBarcodeScanOverrideDetail> = new ObservableCollection<CMedBarcodeScanOverrideDetail>();
      oTempCMedBarcodeScanOverridedtl.Add(oCMedBarcodeScanOverrideDetail);
      if (this.oMedScanRecAdmVM.oProductDetailsInfo != null && this.oMedScanRecAdmVM.oProductDetailsInfo.Count > 0 && oTempCMedBarcodeScanOverridedtl != null && oTempCMedBarcodeScanOverridedtl.Count > 0) {
        this.oMedScanRecAdmVM.oProductDetailsInfo.ForEach(Re => {
            if (Re != null && Re.IsPastExpiryDTTM) {
                Re.lstCMedBarcodeScanOverrideDetail = new ObservableCollection<CMedBarcodeScanOverrideDetail>();
                Re.lstCMedBarcodeScanOverrideDetail = oTempCMedBarcodeScanOverridedtl;
                Re.IsAllowOverideExpiryDTTM = true;
                Re.IsPastExpiryDTTM = false;
            }
        });
      }
    }
    else {
      this.oMedScanRecAdmVM.oMedBarScanOverideForInvalidORNotMatchProd = oCMedBarcodeScanOverrideDetail;
    }
  }
  ShowInvalidProductIdentifierMsg(): void {
    var oMsg: iMessageBox = new iMessageBox();
    oMsg.Title = CConstants.MSGTitleName;
    oMsg.Message = Resource.MedScanRecAdmin.ProductIdentifier_Msg;
    oMsg.MessageButton = MessageBoxButton.YesNo;
    oMsg.IconType = MessageBoxType.Question;
    oMsg.Height = 200;
    oMsg.Width = 400;
    oMsg.MessageBoxClose = (s,e) => { this.oMsg_ProductPromptClose(s, e) };
    oMsg.Show();
    return;
  }
  ShownGTINCodelinkedMultipleproductMsg(): void {
    var oMsg: iMessageBox = new iMessageBox();
    oMsg.Title = CConstants.MSGTitleName;
    oMsg.Message = Resource.MedScanRecAdmin.GTINCodeLinkedMultiple_Msg;
    oMsg.MessageButton = MessageBoxButton.OK;
    oMsg.IconType = MessageBoxType.Question;
    oMsg.MessageBoxClose = (s,e) => { this.oMsg_MultipleGTINPromptClose (s,e) };
    oMsg.Show();
    return
  }
  oMsg_MultipleGTINPromptClose(sender: Object, e: MessageEventArgs): void
  {
    this.txtMedBarcode.Focus();
  }
  oMsg_ProductPromptClose(sender: Object, e: MessageEventArgs): void
  {
    if(e.MessageBoxResult == MessageBoxResult.Yes){
      this.LaunchMedsOverrideMezzanine("ProductCode", "Medication", Resource.MedScanRecAdmin.ProdCode_Msg);
    }
    else {
      this.txtMedBarcode.Focus();
    }
  }
  ShowInvalidProductSelectedMsg(ScannedInvalidDrugName: string): void
  {
    var oMsg: iMessageBox = new iMessageBox();
    oMsg.Title = CConstants.MSGTitleName;
    oMsg.MessageButton = MessageBoxButton.YesNo;
    oMsg.IconType = MessageBoxType.Question;
    oMsg.MessageBoxClose = (s,e) => { this.oMsg_ProductSelectionInvalidPromptClose(s,e) };
    if(this.oMedScanRecAdmVM != null && this.oMedScanRecAdmVM.oProductDetailsInfo != null && this.oMedScanRecAdmVM.oProductDetailsInfo.Count > 0) {
      oMsg.Height = 220;
      oMsg.Width = 400;
      oMsg.Message = "Product Selected : " + ScannedInvalidDrugName + Resource.MedScanRecAdmin.Invalidprodselcnote_msg;
    }
    else {
      oMsg.Message = "Product Selected : " + ScannedInvalidDrugName + Resource.MedScanRecAdmin.Invalidprodselected_msg;
    }
    oMsg.Show();
    return;
  }
  oMsg_ProductSelectionInvalidPromptClose(sender: Object, e: MessageEventArgs): void {
    if(e.MessageBoxResult == MessageBoxResult.Yes) {
      this.LaunchMedsOverrideMezzanine("ProductCode", "Medication", Resource.MedScanRecAdmin.Invalidproductseloverride_msg);
    }
    else {
      this.txtMedBarcode.Focus();
    }
  }
  ShownStrengthNotMatchMsg(): void {
    var oMsg: iMessageBox = new iMessageBox();
    oMsg.Title = CConstants.MSGTitleName;
    var strProductScanned: string = String.Empty;
    var dHeight: number = 0;
    if(this.oProductdtlgrd != null && !String.IsNullOrEmpty(this.oProductdtlgrd.Productscanned)) {
      strProductScanned = this.oProductdtlgrd.Productscanned;
    }
    dHeight = (!String.IsNullOrEmpty(strProductScanned) && strProductScanned.length > 90) ? 225 : 200;
    oMsg.Message = String.Format(Resource.MedScanRecAdmin.DoseORStrengthNotMatch_Msg, strProductScanned);
    oMsg.MessageButton = MessageBoxButton.YesNo;
    oMsg.IconType = MessageBoxType.Question;
    oMsg.Height = dHeight;
    oMsg.Width = 827;
    oMsg.MessageBoxClose = (s ,e) => { this.oMsg_StrengthNotMatchClose(e) };
    oMsg.Show();
    return
  }
  oMsg_StrengthNotMatchClose(e: MessageEventArgs): void {
    if(e.MessageBoxResult == MessageBoxResult.Yes) {
      this.AddScanProductDetail(this.oProductdtlgrd);
    }
    else {
      var oManageBarcodeHelper: ManageBarcodeHelper = new ManageBarcodeHelper();
      oManageBarcodeHelper.InsertMedBarcodeScanLog(CConstants.MEDCHART, CConstants.PATWBSCANINVALIDBARCODE, this.oMedScanRecAdmVM.EANGTINCode, this.oMedScanRecAdmVM.PresScheduleOID);
      this.txtMedBarcode.Focus();
    }
    this.oMedScanRecAdmVM.EANGTINCode = String.Empty;
  }
}