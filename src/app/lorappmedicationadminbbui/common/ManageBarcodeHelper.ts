import { Component, OnInit } from '@angular/core';
import { StringBuilder,ProfileFactoryType,ContextManager,Convert,AppActivity, Regex, ToasterMessageService} from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp,Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison,AppDialogEventargs, AppDialogResult, DelegateArgs, DialogComponentArgs, WindowButtonType, List, ObservableCollection } from 'epma-platform/models';
import { AppDialog, FontFamily, Run, Color, Colors, SolidColorBrush, FontStyles, FontWeights, ImageSource, BitmapImage, UriKind, Uri, } from 'epma-platform/controls';
import { HelperService} from 'epma-platform/soapclient';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
import { MedChartData } from '../utilities/globalvariable';
import { CConstants, MedImage, ValueDomain } from '../utilities/CConstants';
import { AppContextInfo, PatientContext } from 'src/app/lorappcommonbb/utilities/globalvariable';
import { CReqMsgGetPatientQuickSearchDetails, CResMsgGetPatientQuickSearchDetails, GetPatientQuickSearchDetailsCompletedEventArgs, PatientQuickSearch, QueryPatientRecordWSSoapClient } from 'src/app/shared/epma-platform/soap-client/QueryPatientRecordWS';
import { CommonBB } from 'src/app/lorappcommonbb/utilities/common';
import { CMedBarcodeScanOverrideDetail, CReqMsgGetMedicationScanDetails, CReqMsgInsertMedBarcodeScanLog, CResMsgGetMedicationScanDetails, CResMsgInsertMedBarcodeScanLog, GetMedicationScanDetailsCompletedEventArgs, InsertMedBarcodeScanLogCompletedEventArgs, MedBarcodeScanLogRequest, MedicationAdministrationWSSoapClient, MedicationScanDetailsRequest, MedicationScanDetailsResponse, MedsScanProductDetails } from 'src/app/shared/epma-platform/soap-client/MedicationAdministrationWS';
import { MedScanRecAdmVM } from '../viewmodel/MedScanRecAdmVM';
import { Inline, LineBreak } from 'src/app/shared/epma-platform/index.chart';
import { ToastNotification } from 'src/app/lorappmedicationcommonbb/child/toastNotification';

    export class ManageBarcodeHelper {
    //sample code given by siva, will have to delete
        showtoaster(): void {
            let fontSize: number = CConstants.TOASTERFONTSIZE;
            let fontFamily: string = CConstants.TOASTERFONTFAMILY;
            let Inlines: List<Inline> = new List<Inline>();
        
            Inlines.Add(ObjectHelper.CreateObject(new Run(), {
              Text: CConstants.TOASTERPATIENTCONFIRMEDAS,
              FontStyle: FontStyles.Normal,
              FontFamily: new FontFamily(fontFamily),
              Foreground: new SolidColorBrush(Colors.Black),
              FontSize: fontSize,
              FontWeight: FontWeights.Bold
            }));
        
        
          Inlines.Add(ObjectHelper.CreateObject(new LineBreak(), {
              FontFamily: new FontFamily(fontFamily),
              FontSize: fontSize
          }));
          Inlines.Add(ObjectHelper.CreateObject(new Run(), {
              Text: CConstants.TOASTERPATIENTPASIDTITLE,
              FontStyle: FontStyles.Normal,
              FontFamily: new FontFamily(fontFamily),
              Foreground: new SolidColorBrush(Colors.Red),
              FontSize: fontSize,
              FontWeight: FontWeights.Normal
          }));
          Inlines.Add(ObjectHelper.CreateObject(new Run(), {
            Text:'Run',
            FontStyle: FontStyles.Normal,
            FontFamily: new FontFamily(fontFamily),
            Foreground: new SolidColorBrush(Colors.Red),
            FontSize: fontSize,
            FontWeight: FontWeights.Normal
        }));
          Inlines.Add(ObjectHelper.CreateObject(new LineBreak(), {    
              FontFamily: new FontFamily(fontFamily),
              FontSize: fontSize
          }));
        
          Inlines.Add(ObjectHelper.CreateObject(new LineBreak(), {
              FontFamily: new FontFamily(fontFamily),
              FontSize: fontSize
          }));
          Inlines.Add(ObjectHelper.CreateObject(new Run(), {
            Text:'Line Break',
            FontStyle: FontStyles.Normal,
            FontFamily: new FontFamily(fontFamily),
            Foreground: new SolidColorBrush(Colors.Red),
            FontSize: fontSize,
            FontWeight: FontWeights.Normal
        }));  
          ToasterMessageService.ShowMessage('./assets/images/icopyacrossdis24.png', Inlines);
          
          }

        public ShowSuccessToasterMessage(PatientSurname: string, PatientForename: string, PatientPASID: string): void {
            MedChartData.IsPatWBScanSuccess = true;
            let fontSize: number = CConstants.TOASTERFONTSIZE;
            let fontFamily: string = CConstants.TOASTERFONTFAMILY;
            let Inlines: List<Inline> = new List<Inline>();
            Inlines.Add(ObjectHelper.CreateObject(new Run(), {
                Text: CConstants.TOASTERSUCCESSHEADER,
                FontStyle: FontStyles.Normal,
                FontFamily: new FontFamily(fontFamily),
                Foreground: new SolidColorBrush(Colors.Black),
                FontSize: fontSize,
                FontWeight: FontWeights.Bold
            }));
            Inlines.Add(ObjectHelper.CreateObject(new LineBreak(), { 
                FontFamily: new FontFamily(fontFamily),
                FontSize: fontSize 
            }));
            Inlines.Add(ObjectHelper.CreateObject(new LineBreak(), {
                FontFamily: new FontFamily(fontFamily),
                FontSize: fontSize 
            }));
            Inlines.Add(ObjectHelper.CreateObject(new Run(), {
                Text: CConstants.TOASTERPATIENTCONFIRMEDAS,
                FontStyle: FontStyles.Normal,
                FontFamily: new FontFamily(fontFamily),
                Foreground: new SolidColorBrush(Colors.Black),
                FontSize: fontSize,
                FontWeight: FontWeights.Normal
            }));
            Inlines.Add(ObjectHelper.CreateObject(new Run(), {
                Text: this.GetPatientName(PatientSurname, PatientForename),
                FontStyle: FontStyles.Normal,
                FontFamily: new FontFamily(fontFamily),
                Foreground: new SolidColorBrush(Colors.Black),
                FontSize: fontSize,
                FontWeight: FontWeights.Bold
            }));
            Inlines.Add(ObjectHelper.CreateObject(new LineBreak(), {
                FontFamily: new FontFamily(fontFamily),
                FontSize: fontSize
            }));
            Inlines.Add(ObjectHelper.CreateObject(new Run(), {
                Text: CConstants.TOASTERPATIENTPASIDTITLE,
                FontStyle: FontStyles.Normal,
                FontFamily: new FontFamily(fontFamily),
                Foreground: new SolidColorBrush(Colors.Black),
                FontSize: fontSize,
                FontWeight: FontWeights.Normal
            }));
            Inlines.Add(ObjectHelper.CreateObject(new Run(), {
                Text: !String.IsNullOrEmpty(PatientPASID) ? PatientPASID : String.Empty,
                FontStyle: FontStyles.Normal,
                FontFamily: new FontFamily(fontFamily),
                Foreground: new SolidColorBrush(Colors.Black),
                FontSize: fontSize,
                FontWeight: FontWeights.Bold
            }));
            Inlines.Add(ObjectHelper.CreateObject(new LineBreak(), {
                FontFamily: new FontFamily(fontFamily),
                FontSize: fontSize
            }));
            Inlines.Add(ObjectHelper.CreateObject(new Run(), {
                Text: this.GetUserAndJobRoleName(),
                FontStyle: FontStyles.Normal,
                FontFamily: new FontFamily(fontFamily),
                Foreground: new SolidColorBrush(Colors.Black),
                FontSize: fontSize,
                FontWeight: FontWeights.Normal
            }));
            Inlines.Add(ObjectHelper.CreateObject(new LineBreak(), {
                FontFamily: new FontFamily(fontFamily),
                FontSize: fontSize
            }));
            Inlines.Add(ObjectHelper.CreateObject(new Run(), {
                Text: this.GetDateAndTime(),
                FontStyle: FontStyles.Normal,
                FontFamily: new FontFamily(fontFamily),
                Foreground: new SolidColorBrush(Colors.Black),
                FontSize: fontSize,
                FontWeight: FontWeights.Normal
            }));
            //TODO ask Siva create component and use angular toast notification inside
            //let toaster: ToastNotification = ToastNotification.CreateToast(TimeSpan.FromSeconds(5));
            let src: ImageSource = new BitmapImage(new Uri(MedImage.GetPath("ToastMedBarcodeSuccess.png"), UriKind.RelativeOrAbsolute));
            ToasterMessageService.ShowMessage("./assets/images/ToastMedBarcodeSuccess.png", Inlines);
        }
        public ShowFailureToasterMessage(): void {
            MedChartData.IsPatWBScanSuccess = false;
            let fontSize: number = CConstants.TOASTERFONTSIZE;
            let fontFamily: string = CConstants.TOASTERFONTFAMILY;
            let Inlines: List<Inline> = new List<Inline>();
            Inlines.Add(ObjectHelper.CreateObject(new Run(), {
                Text: CConstants.BARCODENOTRECOGNIZED,
                FontStyle: FontStyles.Normal,
                FontFamily: new FontFamily(fontFamily),
                Foreground: new SolidColorBrush(Colors.Black),
                FontSize: fontSize,
                FontWeight: FontWeights.Bold
            }));
            //let toaster: ToastNotification = ToastNotification.CreateToast(TimeSpan.FromSeconds(5));
            //let imgsrc: ImageSource = new BitmapImage(new Uri(MedImage.GetPath("ToastMedBarcodeError.png"), UriKind.RelativeOrAbsolute));
            ToasterMessageService.ShowMessage("./assets/images/ToastMedBarcodeError.png", Inlines);
        }
        public ShowFailureMessageBox(PatientSurname: string, PatientForename: string, PatientPASID: string): void {
            MedChartData.IsPatWBScanSuccess = false;
            let sb: StringBuilder = new StringBuilder();
            sb.Append(CConstants.TOASTERPATIENTSCANNED);
            sb.Append(this.GetPatientName(PatientSurname, PatientForename));
            sb.Append("/ ");
            sb.Append(!String.IsNullOrEmpty(PatientPASID) ? PatientPASID : String.Empty);
            sb.Append("\n");
            sb.Append(CConstants.TOASTERPATIENTDOESNTMATCH);
            let msg: iMessageBox = new iMessageBox();
            msg.Title = CConstants.Lorenzo;
            msg.MessageButton = MessageBoxButton.OK;
            msg.IconType = MessageBoxType.Critical;
            msg.Message = sb.ToString();
            msg.Show();
        }
        public GetUserAndJobRoleName(): string {
            let sb: StringBuilder = new StringBuilder();
            sb.Append("by ");
            sb.Append(AppContextInfo.UserName);
            sb.Append(", ");
            sb.Append(AppContextInfo.JobRoleName);
            return sb.ToString();
        }
        public GetDateAndTime(): string {
            let sb: StringBuilder = new StringBuilder();
            sb.Append("on ");
            sb.Append(DateTime.Now.ToString("dd-MMM-yyyy HH:mm"));
            return sb.ToString();
        }
        public GetPatientName(PatientSurname: string, PatientForename: string): string {
            let sb: StringBuilder = new StringBuilder();
            if (!String.IsNullOrEmpty(PatientSurname)) {
                sb.Append(PatientSurname);
                if (!String.IsNullOrEmpty(PatientForename))
                    sb.Append(", ");
            }
            if (!String.IsNullOrEmpty(PatientForename)) {
                sb.Append(PatientForename);
            }
            return sb.ToString();
        }
        public GetPasId(wristbandtext: string): string {
            if (String.IsNullOrEmpty(wristbandtext))
                return null;
            if (wristbandtext.IndexOf(',') >= 0) {
                let textArray: string[] = wristbandtext.Split(',');
                if (textArray.length >= 2) {
                    return textArray[1];
                }
                else {
                    return wristbandtext;
                }
            }
            else {
                return wristbandtext;
            }
        }
        //public delegate void GetPatientQuickSearchDetailsDelegate(bool isMandateScan);
        public GetPatientQuickSearchDetailsEvent: Function;
        strPatWBBarCode: string = String.Empty;
        lnPrescriptionItemScheduleOID: number = 0;
        public GetPatientQuickSearchDetails(sBarcode: string, lPrescriptionItemScheduleOID: number): void {
            if (!String.IsNullOrEmpty(sBarcode)) {
                let strBarcode: string = this.GetPasId(sBarcode);
                let objQPRService: QueryPatientRecordWSSoapClient = new QueryPatientRecordWSSoapClient();
                objQPRService.GetPatientQuickSearchDetailsCompleted  = (s,e) => { this.objService_GetPatientQuickSearchDetailsCompleted(s,e); } ;
                let objQPRReq: CReqMsgGetPatientQuickSearchDetails = new CReqMsgGetPatientQuickSearchDetails();
                objQPRReq.oContextInformation = CommonBB.FillContext();
                objQPRReq.oPatientSearchBC = new PatientQuickSearch();
                objQPRReq.oPatientSearchBC.PatientIdentifier = strBarcode;
                this.strPatWBBarCode = strBarcode;
                this.lnPrescriptionItemScheduleOID = lPrescriptionItemScheduleOID;
                objQPRReq.oPatientSearchBC.PageSize = 1;
                objQPRReq.oPatientSearchBC.CurrentPageNo = -1;
                objQPRReq.oPatientSearchBC.PatientStatus = "CC_NOTAPP,CC_ANY,CC_LOCAL_SECURE,Null";
                objQPRReq.oPatientSearchBC.PrimIDType = "CC_IDTYPASNBR";
                objQPRReq.oPatientSearchBC.SecIDType = "CC_NATNLID";
                objQPRService.GetPatientQuickSearchDetailsAsync(objQPRReq);
                this.RemoveOverrideBarcodeScanReasonContext();
            }
        }
        objService_GetPatientQuickSearchDetailsCompleted(sender: Object, e: GetPatientQuickSearchDetailsCompletedEventArgs): void {
            if (e.Error != null)
                return
            let objRes: CResMsgGetPatientQuickSearchDetails = e.Result;
            if (objRes != null && objRes.oPatient != null && objRes.oPatient.Count > 0) {
                if (objRes.oPatient[0] != null && objRes.oPatient[0].Patient != null) {
                    if ((!String.IsNullOrEmpty(objRes.oPatient[0].Patient.PatientIdentifier) ? objRes.oPatient[0].Patient.PatientIdentifier : String.Empty).ToUpper() == PatientContext.PatientOID.ToString()) {
                        this.InsertMedBarcodeScanLog(CConstants.PATIENT, CConstants.PATWBSCANSUCCESS, this.strPatWBBarCode, this.lnPrescriptionItemScheduleOID);
                        this.ShowSuccessToasterMessage(objRes.oPatient[0].Patient.Surname, objRes.oPatient[0].Patient.Forename, objRes.oPatient[0].Patient.PatientID);
                        //this.showtoaster()
                        if (this.GetPatientQuickSearchDetailsEvent != null) {
                            this.GetPatientQuickSearchDetailsEvent(true);
                        }
                    }
                    else {
                        this.InsertMedBarcodeScanLog(CConstants.PATIENT, CConstants.PATWBSCANFAILURE, this.strPatWBBarCode, this.lnPrescriptionItemScheduleOID);
                        this.ShowFailureMessageBox(objRes.oPatient[0].Patient.Surname, objRes.oPatient[0].Patient.Forename, objRes.oPatient[0].Patient.PatientID);
                    }
                }
            }
            else {
                this.InsertMedBarcodeScanLog(CConstants.PATIENT, CConstants.PATWBSCANINVALIDBARCODE, this.strPatWBBarCode, this.lnPrescriptionItemScheduleOID);
                this.ShowFailureToasterMessage();
                //this.showtoaster();
            }
            this.strPatWBBarCode = String.Empty;
        }
        public InsertMedBarcodeScanLog(sIdentifyingType: string, sActionStatus: string, sScanCode: string, lPrescriptionItemScheduleOID: number): void {
            let objService: MedicationAdministrationWSSoapClient = new MedicationAdministrationWSSoapClient();
            objService.InsertMedBarcodeScanLogCompleted  = (s,e) => { this.objService_InsertMedBarcodeScanLog(s,e); } ;
            let objReq: CReqMsgInsertMedBarcodeScanLog = new CReqMsgInsertMedBarcodeScanLog();
            objReq.oContextInformation = CommonBB.FillContext();
            objReq.oMedBarcodeScanLogRequestBC = new MedBarcodeScanLogRequest();
            if (String.Equals(CConstants.PATIENT, sIdentifyingType))
                objReq.oMedBarcodeScanLogRequestBC.IdentifyingOID = PatientContext.PatientOID;
            else if (String.Equals(CConstants.MEDCHART, sIdentifyingType))
                objReq.oMedBarcodeScanLogRequestBC.IdentifyingOID = MedChartData.MedChartOID;
            objReq.oMedBarcodeScanLogRequestBC.IdentifyingType = sIdentifyingType;
            objReq.oMedBarcodeScanLogRequestBC.EncounterOID = PatientContext.EncounterOid;
            objReq.oMedBarcodeScanLogRequestBC.ActionStatus = sActionStatus;
            objReq.oMedBarcodeScanLogRequestBC.ScanCode = sScanCode;
            objReq.oMedBarcodeScanLogRequestBC.PrescriptionItemScheduleOID = lPrescriptionItemScheduleOID;
            objService.InsertMedBarcodeScanLogAsync(objReq);
        }
        objService_InsertMedBarcodeScanLog(sender: Object, e: InsertMedBarcodeScanLogCompletedEventArgs): void {
            let lMedBarcodeScanLogOID: number = 0;
            if (e.Result != null) {
                let objRes: CResMsgInsertMedBarcodeScanLog = e.Result;
                if (objRes != null && objRes.oMedBarcodeScanLogResponse != null) {
                    lMedBarcodeScanLogOID = objRes.oMedBarcodeScanLogResponse.MedBarcodeScanLogOID;
                }
            }
        }
        //public delegate void GetMedicationScanDetailsDelegate(ObservableCollection < MedicationScanDetailsResponse > oMedicationScanDetailsResponse);
        public GetMedicationScanDetailsEvent: Function;
        public GetMedicationScanDetails(lMedAdminOID: number): void {
            let objService: MedicationAdministrationWSSoapClient = new MedicationAdministrationWSSoapClient();
            objService.GetMedicationScanDetailsCompleted  = (s,e) => { this.objService_GetMedicationScanDetails(s,e); } ;
            let objReq: CReqMsgGetMedicationScanDetails = new CReqMsgGetMedicationScanDetails();
            objReq.oContextInformation = CommonBB.FillContext();
            objReq.oMedicationScanDetailsRequestBC = new MedicationScanDetailsRequest();
            objReq.oMedicationScanDetailsRequestBC.MedAdminOID = lMedAdminOID;
            objService.GetMedicationScanDetailsAsync(objReq);
        }
        objService_GetMedicationScanDetails(sender: Object, e: GetMedicationScanDetailsCompletedEventArgs): void {
            if (e.Result != null) {
                let objRes: CResMsgGetMedicationScanDetails = e.Result;
                if (objRes != null && objRes.oMedicationScanDetailsResponse != null) {
                    if (this.GetMedicationScanDetailsEvent != null) {
                        this.GetMedicationScanDetailsEvent(objRes.oMedicationScanDetailsResponse);
                    }
                }
            }
        }
        oMedScanDetails: ObservableCollection<MedicationScanDetailsResponse>;
        private GetMedicationScanDetailsEvent_Callback(oMedicationScanDetailsResponse: ObservableCollection<MedicationScanDetailsResponse>): void {
            this.oMedScanDetails = oMedicationScanDetailsResponse;
        }
        public RemoveOverrideBarcodeScanReasonContext(): void {
            MedChartData.IsMedBarcodeScanOverriden = false;
            MedChartData.MedScanOverrideReason = String.Empty;
            MedChartData.MedScanOverrideComments = String.Empty;
            MedChartData.IsPatWBBarcodeScanOverriden = false;
            MedChartData.PatWBScanOverrideReason = String.Empty;
            MedChartData.PatWBScanOverrideComments = String.Empty;
        }
        public SetOverrideBarcodeScanReasonContext(sIdentifyingType: string, sComments: string, sOverrideReason: string): void {
            if (String.Equals(sOverrideReason, CConstants.BARCODESCANNERNOTAVAILABLE, StringComparison.InvariantCultureIgnoreCase) || String.Equals(sOverrideReason, CConstants.BARCODESCANNERNOTWORKING, StringComparison.InvariantCultureIgnoreCase)) {
                MedChartData.IsMedBarcodeScanOverriden = true;
                MedChartData.MedScanOverrideReason = sOverrideReason;
                MedChartData.MedScanOverrideComments = sComments;
                MedChartData.IsPatWBBarcodeScanOverriden = false;
                MedChartData.PatWBScanOverrideReason = String.Empty;
                MedChartData.PatWBScanOverrideComments = String.Empty;
            }
            else if (String.Equals(sIdentifyingType, ValueDomain.SCANPATWBD, StringComparison.InvariantCultureIgnoreCase) && (String.Equals(sOverrideReason, CConstants.PATIENTWRISTBANDNOTAVAILABLE, StringComparison.InvariantCultureIgnoreCase) || String.Equals(sOverrideReason, CConstants.COULDNOTSCANPATIENTWRISTBAND, StringComparison.InvariantCultureIgnoreCase) || String.Equals(sOverrideReason, CConstants.PATIENTWRISTBAND_AMENDINGADMINISTRATIONEVENTPATIENTNOTAVAILABLE, StringComparison.InvariantCultureIgnoreCase) || String.Equals(sOverrideReason, CConstants.PATIENTWRISTBAND_OTHER, StringComparison.InvariantCultureIgnoreCase))) {
                MedChartData.IsPatWBBarcodeScanOverriden = true;
                MedChartData.PatWBScanOverrideReason = sOverrideReason;
                MedChartData.PatWBScanOverrideComments = sComments;
            }
        }
        public SetOverrideReason(sIdentifyingType: string, sOverrideReason: string, sComments: string): CMedBarcodeScanOverrideDetail {
            let oCMedBarcodeScanOverrideDetail: CMedBarcodeScanOverrideDetail = new CMedBarcodeScanOverrideDetail();
            if (String.Equals(sIdentifyingType, ValueDomain.SCANPATWBD)) {
                oCMedBarcodeScanOverrideDetail.IdentifyingType = CConstants.MedIdentifyingType;
                oCMedBarcodeScanOverrideDetail.OverrideReasonType = CConstants.PATIENTWRISTBAND;
            }
            else if (String.Equals(sIdentifyingType, ValueDomain.SCANMEDS)) {
                oCMedBarcodeScanOverrideDetail.IdentifyingType = CConstants.MedIdentifyingType;
                oCMedBarcodeScanOverrideDetail.OverrideReasonType = CConstants.MedReasonType;
            }
            oCMedBarcodeScanOverrideDetail.EncounterOID = PatientContext.EncounterOid;
            oCMedBarcodeScanOverrideDetail.ServiceOID = MedChartData.ServiceOID;
            if (!String.IsNullOrEmpty(AppContextInfo.UserOID)) {
                let lUserOID: number = 0;
                Number.TryParse(AppContextInfo.UserOID, (o) => { lUserOID = o; });
                oCMedBarcodeScanOverrideDetail.OverrideByUserOID = lUserOID;
            }
            oCMedBarcodeScanOverrideDetail.OverrideDTTM = CommonBB.GetServerDateTime();
            oCMedBarcodeScanOverrideDetail.OverrideScanReason = sOverrideReason;
            oCMedBarcodeScanOverrideDetail.Comments = sComments;
            return oCMedBarcodeScanOverrideDetail;
        }
        public FillScanedProductDetails(oMedScanRecAdmVM: MedScanRecAdmVM): ObservableCollection<MedsScanProductDetails> {
            let lstMedProdDetail: ObservableCollection<MedsScanProductDetails> = new ObservableCollection<MedsScanProductDetails>();
            let objMedProdDetail: MedsScanProductDetails;
            if (oMedScanRecAdmVM != null && oMedScanRecAdmVM.oProductDetailsInfo != null && oMedScanRecAdmVM.oProductDetailsInfo.Count > 0) {
                let OwnerOrganisationOID: number = Convert.ToInt64(AppContextInfo.OrganisationOID);
                let nCount: number = oMedScanRecAdmVM.oProductDetailsInfo.Count;
                for (let i: number = 0; i < nCount; i++) {
                    let IsStruckOut: string;
                    objMedProdDetail = new MedsScanProductDetails();
                    objMedProdDetail.ExpiryDTTM = oMedScanRecAdmVM.oProductDetailsInfo[i].Expirydate;
                    objMedProdDetail.IsProductScanned = oMedScanRecAdmVM.IsProductScanned;
                    objMedProdDetail.BatchNumber = oMedScanRecAdmVM.oProductDetailsInfo[i].Batchnumber;
                    objMedProdDetail.SerialNumber = oMedScanRecAdmVM.oProductDetailsInfo[i].Serialnumber;
                    if (oMedScanRecAdmVM.oProductDetailsInfo[i].IsStruckout == true) {
                        IsStruckOut = '1';
                    }
                    else {
                        IsStruckOut = '0';
                    }
                    objMedProdDetail.IsStruckout = IsStruckOut;
                    objMedProdDetail.ProductCode = oMedScanRecAdmVM.oProductDetailsInfo[i].Productcode;
                    objMedProdDetail.OwnerOrganisationOID = OwnerOrganisationOID;
                    objMedProdDetail.ScanProductLZOID = oMedScanRecAdmVM.oProductDetailsInfo[i].ScanProductLZOID;
                    objMedProdDetail.Comments = oMedScanRecAdmVM.oProductDetailsInfo[i].Comments;
                    objMedProdDetail.TotalDoseAdministered = oMedScanRecAdmVM.TotaldoseadministeredAmt;
                    objMedProdDetail.TotalDoseAdministeredUOMLZOID = oMedScanRecAdmVM.TotalDoseAdministeredUOMLZOID;
                    objMedProdDetail.MedBarCodeOverrideDetails = oMedScanRecAdmVM.oProductDetailsInfo[i].lstCMedBarcodeScanOverrideDetail;
                    lstMedProdDetail.Add(objMedProdDetail);
                }
            }
            return lstMedProdDetail;
        }
        public static GetMedication(barcodeText: string): MedicationBarcode {
            //TODO add guideline remove @
            let ex1: RegExp = new RegExp("01(?<GTIN>\d{14})17(?<EXPDATE>\d{6})10(?<BATLOT>[\x21-\x22\x25-\x2F\x30-\x39\x3A-\x3F\x41-\x5A\x5F\x61-\x7A]{0,20})21(?<SLNO>[\x21-\x22\x25-\x2F\x30-\x39\x3A-\x3F\x41-\x5A\x5F\x61-\x7A]{0,20})");
            let ex2: RegExp = new RegExp("17(?<EXPDATE>\d{6})01(?<GTIN>\d{14})10(?<BATLOT>[\x21-\x22\x25-\x2F\x30-\x39\x3A-\x3F\x41-\x5A\x5F\x61-\x7A]{0,20})21(?<SLNO>[\x21-\x22\x25-\x2F\x30-\x39\x3A-\x3F\x41-\x5A\x5F\x61-\x7A]{0,20})");
            let res: MedicationBarcode = new MedicationBarcode();
            let match: RegExpExecArray = ex1.exec(barcodeText);
            if (!match) {
                match = ex2.exec(barcodeText);
            }
            if (match) {
                //create a test page and ensure that , we have to go with the angular way. not a platform item
                res.GTIN = match["GTIN"].Value;
                let expDateVal: string = match["EXPDATE"].Value;
                let _year: number = Number.Parse(expDateVal.Substring(0, 2)), _month = Number.Parse(expDateVal.Substring(2, 2)), _day = Number.Parse(expDateVal.Substring(4, 2));
                let _diff: number = _year - (DateTime.Today.Year % 100);
                if (_diff >= 51 && _diff <= 99) {
                    _year = _year + ((DateTime.Today.Year / 100) - 1) * 100;
                }
                else if (_diff >= -99 && _diff <= -50) {
                    _year = _year + ((DateTime.Today.Year / 100) + 1) * 100;
                }
                else {
                    _year = _year + (DateTime.Today.Year / 100) * 100;
                }
                if (_day == 0) {
                    res.EXPDATE = new DateTime(_year, _month, 1).AddMonths(1).AddDays(-1);
                }
                else {
                    res.EXPDATE = new DateTime(_year, _month, _day);
                }
                res.BATLOT = match["BATLOT"].Value;
                res.SLNO = match["SLNO"].Value;
            }
            else if (barcodeText.length >= 16 && barcodeText.StartsWith("01")) {
                res.GTIN = barcodeText.Substring(2, 14);
            }
            else {
                res.GTIN = barcodeText;
            }
            return res;
        }

        //TODO ask Siva if the below method needs to be replaced with lodash deepclone: yes we can use lodash. Zero references, just comment it
        /* public static DeepCopy<T>(objSource: T): T {
            let content: number[];
            let xs: System.Runtime.Serialization.DataContractSerializer = new System.Runtime.Serialization.DataContractSerializer(objSource.GetType());
            let stream: MemoryStream = new MemoryStream()
            try {
                xs.WriteObject(stream, objSource);
                content = stream.ToArray();
            }
            finally {
                if (stream != null) stream.Dispose();
            }
            let stream: MemoryStream = new MemoryStream(content)
            try {
                let objNew: T = <T>xs.ReadObject(stream);
                return objNew;
            }
            finally {
                if (stream != null) stream.Dispose();
            }
        } */
    }
    export class MedicationBarcode {
        public GTIN: string;
        public EXPDATE: DateTime;
        public BATLOT: string;
        public SLNO: string;
    }
