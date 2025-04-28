import { Component, OnInit } from '@angular/core';
import { StringBuilder,ProfileFactoryType,ContextManager,Convert,AppActivity} from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp,Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison,AppDialogEventargs, AppDialogResult, DelegateArgs, DialogComponentArgs, WindowButtonType } from 'epma-platform/models';
import { AppDialog, EventArgs } from 'epma-platform/controls';
import { HelperService} from 'epma-platform/soapclient';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
import { MedAmendMessageVM, SlotDetailVM } from '../viewmodel/MedicationChartVM';
import { AdministrationDetail, CReqMsgGetAmendedPresDetail, CReqMsgGetPresItemParentChildDetail, CReqMsgGetSlotInfoByOid, CReqMsgGetTitratedDoseDetail, CResMsgGetAmendedPresDetail, CResMsgGetPresItemParentChildDetail, CResMsgGetSlotInfoByOid, CResMsgGetTitratedDoseDetail, GetAmendedPresDetailCompletedEventArgs, GetPresItemParentChildDetailCompletedEventArgs, GetSlotInfoByOidCompletedEventArgs, GetTitratedDoseDetailCompletedEventArgs, IPPPresItemBasicProperties, MedicationAdministrationWSSoapClient } from 'src/app/shared/epma-platform/soap-client/MedicationAdministrationWS';
import { ChartContext, MedChartData, PresItemParentChildDetail, TagDrugHeaderDetail, ValueDomainValues } from '../utilities/globalvariable';
import { CConstants, CIngredientLorenzoID, DoseTypeCode, LaunchAdminType, SlotStatus } from '../utilities/CConstants';
import { PatientContext } from 'src/app/lorappcommonbb/utilities/globalvariable';
import { Common } from '../utilities/common';
import { IPPMAManagePrescriptionWSSoapClient } from 'src/app/product/shared/models/ippmamanageprescriptionws';
import { CommonBB } from 'src/app/lorappcommonbb/utilities/common';
import { Resource } from '../resource';
import { MedDoseTypeConceptCodeData } from 'src/app/lorappmedicationcommonbb/utilities/profiledata';
import { MedicationCommonBB } from 'src/app/lorappmedicationcommonbb/utilities/medicationcommonbb';
import { Busyindicator } from 'src/app/lorappcommonbb/busyindicator';
import * as IPPManagePrescSer from 'src/app/shared/epma-platform/soap-client/IPPMAManagePrescriptionWS';
import * as Application from 'src/app/lorappcommonbb/amshelper';
import { MedAmendMessage } from '../view/MedAmendMessage';


  
    export class SlotAdministrationHelper {
        oSlotVM: SlotDetailVM;
        objAdminDetail: AdministrationDetail;
        //public delegate void AmendDelegate(); 
        public AmendEvent: Function;
        //public delegate void TitratedDoseDelegate();
        public TitratedDoseEvent: Function;
        //public delegate void LaunchRecordAdmin(AdministrationDetail objAdminDetail);
        public LaunchRecordAdminEvent: Function;
        //public delegate void RefreshRecordAdmin(AdministrationDetail oAdminDetail, MedAmendMessageVM oAmendMsg);
        public RefreshRecordAdminEvent: Function;
        oMedAmendMessageVM: MedAmendMessageVM;
        objAmendmentmessage: MedAmendMessage;
        sDelimiter: string = "~";
        sReason: string = String.Empty;
        public static ThirdStepDoseRegimeIndex: number = 2;
        public static FourthStepDoseRegimeIndex: number = 3;
        //public delegate void WarningBeforeAdministrationCompleted(bool IsPGD, LaunchAdminType eWhatToLaunch);
        public WarningBeforeAdministrationCompletedEvent: Function;
        private bckUpTagObj: TagDrugHeaderDetail;
        private bckUpIsPGD: boolean;
        private bckUpWhatToLaunch: LaunchAdminType;
        oTagDrugHdr: TagDrugHeaderDetail;
        bckSlotOID: number;
        bckSlotStatus: string;
        //public delegate void TriggerParacetamolWarning(bool bParacetamolAdministered);
        public TriggerParacetamolWarningEvent: Function;
        public IsAnyParacetamolAdministered(dtAdministeredDTTM: DateTime, nScheduleOID: number): void {
            //TODO Revisit below commented lines of code bug #36092
            // let oReq: IPPManagePrescSer.IsAnyParacetamolAdministrationRequest = new IPPManagePrescSer.IsAnyParacetamolAdministrationRequest();
            //oReq.IngAdminParams = new IPPManagePrescSer.CReqMsgIsAnyParacetamolAdministration();

            let oReq = new IPPManagePrescSer.CReqMsgIsAnyParacetamolAdministration();
            let IngAdminParams: IPPManagePrescSer.IngredientAdminParams;
            IngAdminParams = ObjectHelper.CreateObject(new IPPManagePrescSer.IngredientAdminParams(), {
                MedChartOID: MedChartData.MedChartOID,
                PatientOID: PatientContext.PatientOID,
                IngredientLorenzoID: CIngredientLorenzoID.Paracetamol,
                DuenessWindowTimeMinutes: MedChartData.DuenessThreshold,
                RangeStartDttm: dtAdministeredDTTM.AddHours(-CConstants.AnyParacetamolAdministrationCheckInHours),
                RangeEndDttm: dtAdministeredDTTM.AddHours(CConstants.AnyParacetamolAdministrationCheckInHours),
                EncounterOID: PatientContext.EncounterOid,
                SlotOID: nScheduleOID
            });
            //TODO Revisit below commented lines of code bug #36092
            oReq.IngAdminParamsBC = IngAdminParams;
            oReq.oContextInformation = Common.FillContext();
            //let oServiceproxy: IPPMAManagePrescriptionWSSoapClient = new IPPMAManagePrescriptionWSSoapClient();
            //let oServiceproxy: IPPManagePrescSer.IPPMAManagePrescriptionWSSoapClient = new IPPManagePrescSer.IPPMAManagePrescriptionWSSoapClient();
            //TODO Revisit below commented lines of code bug #36092
            // oServiceproxy.IsAnyParacetamolAdministrationCompleted += oServiceproxy_IsAnyParacetamolAdministrationCompleted;
            // oServiceproxy.IsAnyParacetamolAdministrationAsync(oReq);

            let oServiceproxy: IPPManagePrescSer.IPPMAManagePrescriptionWSSoapClient = new IPPManagePrescSer.IPPMAManagePrescriptionWSSoapClient();
            oServiceproxy.IsAnyParacetamolAdministrationCompleted = (s, e) => {
                this.oServiceproxy_IsAnyParacetamolAdministrationCompleted(s, e);
            };
            oServiceproxy.IsAnyParacetamolAdministrationAsync(oReq);
        }
        oServiceproxy_IsAnyParacetamolAdministrationCompleted(sender: Object, e: IPPManagePrescSer.IsAnyParacetamolAdministrationCompletedEventArgs): void {
            if (e.Error == null) {

                //TODO Revisit below commented lines of code bug #36092
                //let oResponse: IPPManagePrescSer.IsAnyParacetamolAdministrationResponse = e.Result;
                /* if (oResponse != null && oResponse.IsAnyParacetamolAdministrationResult != null) {
                    if (this.TriggerParacetamolWarningEvent != null) {
                        this.TriggerParacetamolWarningEvent(oResponse.IsAnyParacetamolAdministrationResult.IsAnyParacetamolAdministered);
                    }
                } */
                let oResponse: IPPManagePrescSer.CResMsgIsAnyParacetamolAdministration = e.Result;
                if (oResponse != null && oResponse.IsAnyParacetamolAdministered != null) {
                    if (this.TriggerParacetamolWarningEvent != null) {
                        this.TriggerParacetamolWarningEvent(oResponse.IsAnyParacetamolAdministered);
                    }
                }
            }
            else {
                //TODO ask Siva
                //
                let lnReturn: number = Application.AMSHelper.PublicExceptionDetails(80000013, "LorAppMedicationAdminBBUI_P2.dll, SlotAdministrationHelper.oServiceproxy_IsAnyParacetamolAdministrationCompleted()", e.Error);
            }
        }
        public GetSlotDetails(oSlotRecordAdminVM: SlotDetailVM): void {
            let objService: MedicationAdministrationWSSoapClient = new MedicationAdministrationWSSoapClient();
            objService.GetSlotInfoByOidCompleted  = (s,e) => { this.objService_GetSlotInfoByOidCompleted(s,e); } ;
            let objReq: CReqMsgGetSlotInfoByOid = new CReqMsgGetSlotInfoByOid();
            this.oSlotVM = oSlotRecordAdminVM;
            objReq.oContextInformation = CommonBB.FillContext();
            objReq.prescriptionItemOidBC = this.oSlotVM.PrescriptionItemOID;
            objReq.patientOIDBC = ChartContext.PatientOID;
            objReq.ServiceOIDBC = MedChartData.ServiceOID;
            objReq.LocationOIDBC = MedChartData.LocationOID;
            objReq.LorenzoIDBC = this.oSlotVM.LorenzoID;
            objReq.SlotOIDBC = this.oSlotVM.PresScheduleOID;
            objReq.MCVersionBC = Number.Parse(this.oSlotVM.MCVersionNo);
            objService.GetSlotInfoByOidAsync(objReq);
        }
        objService_GetSlotInfoByOidCompleted(sender: Object, e: GetSlotInfoByOidCompletedEventArgs): void {
            let bTitrated: boolean = false;
            this.oSlotVM.IsPICompOrDiscAndScheduleDTTMBeyondPIStopDTTM = false;
            if (e.Result != null) {
                let objRes: CResMsgGetSlotInfoByOid = e.Result;
                if (objRes.objAdministrationDetail != null) {
                    if (this.objAdminDetail == null) {
                        this.objAdminDetail = new AdministrationDetail();
                        this.objAdminDetail = objRes.objAdministrationDetail;
                        this.oSlotVM.AlreadyRequestedDetails = String.IsNullOrEmpty(this.objAdminDetail.AlreadyRequestedDets) ? String.Empty : this.objAdminDetail.AlreadyRequestedDets;
                        let arrReqDet: string[] = this.oSlotVM.AlreadyRequestedDetails.Split('~');
                        for (let i: number = 0; i <= arrReqDet.Count() - 1; i++) {
                            if (String.Compare(arrReqDet[i], "Y") == 0) {
                                this.objAdminDetail.IsWardStock = true;
                            }
                        }
                    }
                    if (this.oSlotVM != null && this.oSlotVM.AdministrationDetail != null) {
                        this.oSlotVM.AdministrationDetail.IsHistoryExists = this.objAdminDetail.IsHistoryExists;
                        this.oSlotVM.AdministrationDetail.IsWardStock = this.objAdminDetail.IsWardStock;
                        this.oSlotVM.AdministrationDetail.IsCriticalMed = this.objAdminDetail.IsCriticalMed;
                        this.oSlotVM.AdministrationDetail.CriticalMedsRoutes = this.objAdminDetail.CriticalMedsRoutes;
                        this.oSlotVM.AdministrationDetail.CriticalMedsMsg = this.objAdminDetail.CriticalMedsMsg;
                        this.oSlotVM.AdministrationDetail.CriticalMedsURL = this.objAdminDetail.CriticalDrugSiteURL;
                    }
                    if (this.oSlotVM != null) {
                        this.oSlotVM.IsWardStock = this.objAdminDetail.IsWardStock;
                        this.oSlotVM.IsCustomiseMedScan = this.objAdminDetail.IsMedScanExcluded;
                    }
                    if (!String.IsNullOrEmpty(this.oSlotVM.PrescriptionItemStatus) && !String.IsNullOrEmpty(this.objAdminDetail.PresStatusCode) && (String.Equals(this.objAdminDetail.PresStatusCode, CConstants.CANCELLED, StringComparison.InvariantCultureIgnoreCase) || String.Equals(this.objAdminDetail.PresStatusCode, CConstants.DISCONTINUED, StringComparison.InvariantCultureIgnoreCase) || String.Equals(this.objAdminDetail.PresStatusCode, CConstants.COMPLETED, StringComparison.InvariantCultureIgnoreCase)) && !String.Equals(this.objAdminDetail.PresStatusCode, this.oSlotVM.PrescriptionItemStatus, StringComparison.InvariantCultureIgnoreCase) && DateTime.NotEquals(this.objAdminDetail.PresItemStatusModifiedAt, DateTime.MinValue) && ((DateTime.GreaterThan(this.oSlotVM.ScheduledDTTM, this.objAdminDetail.PresItemStatusModifiedAt) && DateTime.NotEquals(this.oSlotVM.ScheduledDTTM , DateTime.MinValue) && !this.oSlotVM.IsLastPRN) || (this.oSlotVM.IsLastPRN && DateTime.Equals(this.oSlotVM.ScheduledDTTM, DateTime.MinValue) && this.oSlotVM.AdministrationDetail != null && DateTime.GreaterThan(this.oSlotVM.AdministrationDetail.AdministeredDateTime, this.objAdminDetail.PresItemStatusModifiedAt)))) {
                        this.oSlotVM.IsPICompOrDiscAndScheduleDTTMBeyondPIStopDTTM = true;
                        let oMessageBox: iMessageBox = new iMessageBox();
                        if (String.Equals(this.objAdminDetail.PresStatusCode, CConstants.COMPLETED, StringComparison.InvariantCultureIgnoreCase)) {
                            let _PrescriberName: string = "Prescriber";
                            if (!String.IsNullOrEmpty(this.objAdminDetail.PresItemStatusModifiedBy)) {
                                let _ArrPrescriberName: string[] = this.objAdminDetail.PresItemStatusModifiedBy.Split('~');
                                if (_ArrPrescriberName != null && _ArrPrescriberName.length > 1) {
                                    _PrescriberName = _ArrPrescriberName[1];
                                    if (!String.IsNullOrEmpty(_ArrPrescriberName[1]) && !String.IsNullOrEmpty(_ArrPrescriberName[0])) {
                                        _PrescriberName += " ";
                                    }
                                    _PrescriberName += _ArrPrescriberName[0];
                                }
                            }
                            oMessageBox.Message = String.Format(Resource.MedicationAdministrator.PresItemCompleted_ErrMsg, _PrescriberName);
                        }
                        else if (String.Equals(this.objAdminDetail.PresStatusCode, CConstants.DISCONTINUED, StringComparison.InvariantCultureIgnoreCase)) {
                            oMessageBox.Message = Resource.MedicationAdministrator.PresItemDiscontinued_ErrMsg;
                        }
                        else {
                            oMessageBox.Message = Resource.MedicationAdministrator.PresItemCancelled_ErrMsg;
                        }
                        oMessageBox.IconType = MessageBoxType.Information;
                        oMessageBox.Title = "LORENZO";
                        oMessageBox.Width = 480;
                        oMessageBox.Height = 210;
                        oMessageBox.MessageButton = MessageBoxButton.OK;
                        oMessageBox.Closed  = (s,e) => { this.oMessageBox_Closed(s,e); } ;
                        oMessageBox.Show();
                    }
                    if (!this.oSlotVM.IsPICompOrDiscAndScheduleDTTMBeyondPIStopDTTM) {
                        if (String.Compare(this.oSlotVM.DoseType, DoseTypeCode.TITRATED, StringComparison.OrdinalIgnoreCase) == 0) {
                            if (this.objAdminDetail.AmendedPresOID == 0) {
                                this.TitratedDoseEvent  = (s,e) => { this.MedsRecordAdminstrator_AmendEvent(); } ;
                                bTitrated = true;
                            }
                            this.GetTitratedDoseDetails();
                        }
                        this.oSlotVM.IsConditionalExists = this.objAdminDetail.IsConditionalExists;
                        if (!bTitrated) {
                            if (this.objAdminDetail.AmendedPresOID > 0 && String.Compare(this.objAdminDetail.PresStatusCode, this.oSlotVM.PrescriptionItemStatus, StringComparison.OrdinalIgnoreCase) != 0 && this.objAdminDetail.AmendedPresOID != this.oSlotVM.AmendedPresOID && (!String.IsNullOrEmpty(this.oSlotVM.Status) && String.Compare(this.oSlotVM.Status, "CC_OVERDUE", StringComparison.InvariantCultureIgnoreCase) != 0 && String.Compare(this.oSlotVM.Status, "CC_NOTYETRECORDED", StringComparison.InvariantCultureIgnoreCase) != 0)) {
                            //if (1==1) {
                                this.oSlotVM.AmendedPresOID = this.objAdminDetail.AmendedPresOID;
                                //SYED - Hard coded
                                //this.oSlotVM.AmendedPresOID = 1000000043079;
                                this.AmendEvent  = (s,e) => { this.MedsRecordAdminstrator_AmendEvent(); } ;
                                this.GetAmendedDetails();
                            }
                            else {
                                if (this.oSlotVM.IsRecordAdmin && this.RefreshRecordAdminEvent != null) {
                                    this.RefreshRecordAdminEvent(this.objAdminDetail, this.oMedAmendMessageVM);
                                }
                                else if (this.LaunchRecordAdminEvent != null) {
                                    this.LaunchRecordAdminEvent(this.objAdminDetail);
                                }
                            }
                        }
                    }
                    if (this.objAdminDetail.CDWardRegItemOID > 0 || this.objAdminDetail.CDPatientRegItemOID > 0) {
                        this.oSlotVM.CDWardRegItemOID = this.objAdminDetail.CDWardRegItemOID;
                        this.oSlotVM.WardCurrentStock = this.objAdminDetail.WardCurrentStock;
                        this.oSlotVM.CDPatientRegItemOID = this.objAdminDetail.CDPatientRegItemOID;
                        this.oSlotVM.PatientCurrentStock = this.objAdminDetail.PatientCurrentStock;
                    }
                }
            }
        }
        oMessageBox_Closed(sender: Object, e: EventArgs): void {
            if (this.oSlotVM.IsRecordAdmin && this.RefreshRecordAdminEvent != null) {
                this.RefreshRecordAdminEvent(this.objAdminDetail, this.oMedAmendMessageVM);
            }
            else if (this.LaunchRecordAdminEvent != null) {
                this.LaunchRecordAdminEvent(this.objAdminDetail);
            }
        }
        private GetTitratedDoseDetails(): void {
            let objService: MedicationAdministrationWSSoapClient = new MedicationAdministrationWSSoapClient();
            objService.GetTitratedDoseDetailCompleted  = (s,e) => { this.objService_GetTitratedDoseDetailCompleted(s,e); } ;
            let objReq: CReqMsgGetTitratedDoseDetail = new CReqMsgGetTitratedDoseDetail();
            objReq.oContextInformation = CommonBB.FillContext();
            objReq.PresItemSchOIDBC = this.oSlotVM.PresScheduleOID;
            objReq.PatientOIDBC = ChartContext.PatientOID;
            objService.GetTitratedDoseDetailAsync(objReq);
        }
        objService_GetTitratedDoseDetailCompleted(sender: Object, e: GetTitratedDoseDetailCompletedEventArgs): void {
            let nDoseUOMOID: string = String.Empty;
            let strAmendedItems: StringBuilder = new StringBuilder();
            if (e.Result != null) {
                this.oMedAmendMessageVM = new MedAmendMessageVM();
                if (this.oSlotVM != null && this.oSlotVM.DrugDetail != null)
                    this.oMedAmendMessageVM.IdentifyingName = this.oSlotVM.DrugDetail.Drugname;
                let objRes: CResMsgGetTitratedDoseDetail = e.Result;
                if (objRes != null && objRes.oDoseDetail != null) {
                    nDoseUOMOID = objRes.oDoseDetail.OID.ToString();
                    if ((this.oSlotVM.AmendedDoseUOMOID != Convert.ToInt64(nDoseUOMOID)) && (String.Compare(this.oSlotVM.AmendedDoseVal, objRes.oDoseDetail.Code, StringComparison.CurrentCultureIgnoreCase) != 0)) {
                        if (this.objAdminDetail != null && this.objAdminDetail.DoseUOM == null) {
                            this.objAdminDetail.DoseUOM = objRes.oDoseDetail.Name;
                            this.objAdminDetail.DoseUOMOID = Convert.ToInt64(nDoseUOMOID);
                            this.oSlotVM.AmendedDoseUOMOID = Convert.ToInt64(nDoseUOMOID);
                            this.oSlotVM.AmendedDoseVal = objRes.oDoseDetail.Code;
                        }
                        let strDose: string = !String.IsNullOrEmpty(this.oSlotVM.Dose) && String.Compare(this.oSlotVM.Dose, "0", StringComparison.CurrentCultureIgnoreCase) != 0 ? this.oSlotVM.Dose : "0";
                        if (String.Compare(nDoseUOMOID, this.oSlotVM.DoseUOMOID.ToString(), StringComparison.OrdinalIgnoreCase) != 0 || String.Compare(objRes.oDoseDetail.Code, strDose, StringComparison.OrdinalIgnoreCase) != 0) {
                            strAmendedItems.Append("Dose");
                            strAmendedItems.Append(this.sDelimiter);
                            strAmendedItems.Append(objRes.oDoseDetail.Code);
                            strAmendedItems.Append(" ");
                            strAmendedItems.Append(objRes.oDoseDetail.Name);
                            strAmendedItems.Append("\n");
                            this.oMedAmendMessageVM.AmendMsg = strAmendedItems.ToString();
                        }
                    }
                }
            }
            if (this.TitratedDoseEvent != null) {
                this.TitratedDoseEvent();
            }
            // -= means unsubscribe, hence we can comment this line 
            //this.TitratedDoseEvent -= new TitratedDoseDelegate(this.MedsRecordAdminstrator_AmendEvent);
        }
        private GetAmendedDetails(): void {
            let objService: MedicationAdministrationWSSoapClient = new MedicationAdministrationWSSoapClient();
            objService.GetAmendedPresDetailCompleted  = (s,e) => { this.objService_GetAmendedPresDetailCompleted(s,e); } ;
            let objReq: CReqMsgGetAmendedPresDetail = new CReqMsgGetAmendedPresDetail();
            objReq.oContextInformation = CommonBB.FillContext();
            // SYED - HArdcoded
            //objReq.PrescriptionItemOIDBC = 1000000043079
            objReq.PrescriptionItemOIDBC = this.oSlotVM.PrescriptionItemOID;
            objReq.PatientOIDBC = ChartContext.PatientOID;
            objReq.MCVersionBC = this.oSlotVM.MCVersionNo;
            objService.GetAmendedPresDetailAsync(objReq);
        }
        objService_GetAmendedPresDetailCompleted(sender: Object, e: GetAmendedPresDetailCompletedEventArgs): void {
            let strAmendedItems: StringBuilder = new StringBuilder();
            if (e.Result != null) {
                let sDoseType: string = String.Empty;
                let sDoseTypeText: string = String.Empty;
                this.oMedAmendMessageVM = new MedAmendMessageVM();
                this.oMedAmendMessageVM.PrescriptionitemOID = this.oSlotVM.PrescriptionItemOID;
                this.oMedAmendMessageVM.AmendedPresOID = this.oSlotVM.AmendedPresOID;
                this.oMedAmendMessageVM.MCVersion = this.oSlotVM.MCVersionNo;
                this.oMedAmendMessageVM.UserName = String.Empty;
                let objRes: CResMsgGetAmendedPresDetail = e.Result;
                if (objRes.oBasicProperties != null && objRes.oBasicProperties.Count > 1) {
                    if (objRes.oBasicProperties[0] != null && objRes.oBasicProperties[1] != null) {
                        if (objRes.oBasicProperties[0].DrugProperties != null && !String.IsNullOrEmpty(objRes.oBasicProperties[0].DrugProperties[0].DrugName))
                            this.oMedAmendMessageVM.IdentifyingName = this.oSlotVM.DrugDetail.Drugname;
                        if (objRes.oBasicProperties[0].Route != null && ((objRes.oBasicProperties[1].Route != null && MedicationCommonBB.RouteOID(objRes.oBasicProperties[0].Route.Name) != MedicationCommonBB.RouteOID(objRes.oBasicProperties[1].Route.Name)) || objRes.oBasicProperties[1].Route == null) && !String.IsNullOrEmpty(objRes.oBasicProperties[0].Route.Name)) {
                            strAmendedItems.Append("Route");
                            strAmendedItems.Append(this.sDelimiter);
                            strAmendedItems.Append(objRes.oBasicProperties[0].Route.Name);
                            strAmendedItems.Append("\n");
                        }
                        if (objRes.oBasicProperties[0].Duration != null && ((objRes.oBasicProperties[1].Duration != null && objRes.oBasicProperties[0].Duration.Value != objRes.oBasicProperties[1].Duration.Value) || objRes.oBasicProperties[1].Duration == null) && objRes.oBasicProperties[0].Duration.Value > 0) {
                            strAmendedItems.Append("Duration");
                            strAmendedItems.Append(this.sDelimiter);
                            strAmendedItems.Append(objRes.oBasicProperties[0].Duration.Value);
                            strAmendedItems.Append(" ");
                            if (objRes.oBasicProperties[0].Duration.UOMName != null) {
                                if (ValueDomainValues.oDurationUOM != null) {
                                    this.sReason = CommonBB.GetText(objRes.oBasicProperties[0].Duration.UOMName, ValueDomainValues.oDurationUOM);
                                }
                            }
                            strAmendedItems.Append(this.sReason);
                            strAmendedItems.Append("\n");
                        }
                        if (objRes.oBasicProperties[0].Site != null && ((objRes.oBasicProperties[1].Site != null && objRes.oBasicProperties[0].Site.OID != objRes.oBasicProperties[1].Site.OID) || objRes.oBasicProperties[1].Site == null) && !String.IsNullOrEmpty(objRes.oBasicProperties[0].Site.Name)) {
                            strAmendedItems.Append("Site");
                            strAmendedItems.Append(this.sDelimiter);
                            strAmendedItems.Append(objRes.oBasicProperties[0].Site.Name);
                            strAmendedItems.Append("\n");
                        }
                        if (objRes.oBasicProperties[0].Form != null && ((objRes.oBasicProperties[1].Form != null && objRes.oBasicProperties[0].Form.OID != objRes.oBasicProperties[1].Form.OID) || objRes.oBasicProperties[1].Form == null) && !String.IsNullOrEmpty(objRes.oBasicProperties[0].Form.Name)) {
                            strAmendedItems.Append("Dosage form");
                            strAmendedItems.Append(this.sDelimiter);
                            strAmendedItems.Append(objRes.oBasicProperties[0].Form.Name);
                            strAmendedItems.Append("\n");
                        }
                        if (objRes.oBasicProperties[0].Dose != null) {
                            if (objRes.oBasicProperties[0].Dose.DoseType != null) {
                                if (objRes.oBasicProperties.Count > 1 && objRes.oBasicProperties[1] != null && objRes.oBasicProperties[1].Dose != null && objRes.oBasicProperties[1].Dose.DoseType != null) {
                                    sDoseType = objRes.oBasicProperties[1].Dose.DoseType.Code;
                                    sDoseTypeText = MedDoseTypeConceptCodeData.ConceptCodes[objRes.oBasicProperties[1].Dose.DoseType.Code];
                                    //sDoseTypeText = sDoseType + "_TEXT";
                                    this.oMedAmendMessageVM.DoseType = sDoseType;
                                }
                                else {
                                    sDoseType = objRes.oBasicProperties[0].Dose.DoseType.Code;
                                    sDoseTypeText = MedDoseTypeConceptCodeData.ConceptCodes[objRes.oBasicProperties[0].Dose.DoseType.Code];
                                    //sDoseTypeText = sDoseType + "_TEXT";
                                    this.oMedAmendMessageVM.DoseType = sDoseType;
                                }
                                if (objRes.oBasicProperties[1].Dose != null) {
                                    if (objRes.oBasicProperties.Count > 1 && objRes.oBasicProperties[1].Dose.DoseType != null && (objRes.oBasicProperties[0].Dose.DoseType.Code != objRes.oBasicProperties[1].Dose.DoseType.Code || objRes.oBasicProperties[0].Dose.DoseType.OID != objRes.oBasicProperties[1].Dose.DoseType.OID)) {
                                        strAmendedItems.Append("Dosetype");
                                        strAmendedItems.Append(this.sDelimiter);
                                        strAmendedItems.Append(sDoseTypeText);
                                        strAmendedItems.Append("\n");
                                    }
                                    if ((objRes.oBasicProperties[0].Dose.DoseRegime != null && objRes.oBasicProperties[1].Dose.DoseRegime != null) || (objRes.oBasicProperties[1].Dose.DoseRegime == null) || (objRes.oBasicProperties[0].Dose.DoseRegime[0].DoseUOM != null && objRes.oBasicProperties[0].Dose.DoseRegime[1].DoseUOM != null)) {
                                        if (String.Compare(sDoseType, DoseTypeCode.NORMAL, StringComparison.OrdinalIgnoreCase) == 0 || String.Compare(sDoseType, DoseTypeCode.DOSAGERANGE, StringComparison.OrdinalIgnoreCase) == 0) {
                                            if ((objRes.oBasicProperties[0].Dose.DoseRegime[0].LowerDose != objRes.oBasicProperties[1].Dose.DoseRegime[0].LowerDose) || (objRes.oBasicProperties[0].Dose.DoseRegime[0].UpperDose != objRes.oBasicProperties[1].Dose.DoseRegime[0].UpperDose) || (objRes.oBasicProperties[0].Dose.DoseRegime[0].DoseUOM.UOMName != objRes.oBasicProperties[1].Dose.DoseRegime[0].DoseUOM.UOMName)) {
                                                strAmendedItems.Append("Dose");
                                                strAmendedItems.Append(this.sDelimiter);
                                                strAmendedItems.Append(objRes.oBasicProperties[0].Dose.DoseRegime[0].LowerDose);
                                                if (objRes.oBasicProperties[0].Dose.DoseRegime[0].UpperDose > 0) {
                                                    strAmendedItems.Append(" - ");
                                                    strAmendedItems.Append(objRes.oBasicProperties[0].Dose.DoseRegime[0].UpperDose);
                                                }
                                                strAmendedItems.Append(" ");
                                                if (objRes.oBasicProperties[0].Dose.DoseRegime[0].DoseUOM != null)
                                                    strAmendedItems.Append(objRes.oBasicProperties[0].Dose.DoseRegime[0].DoseUOM.UOMName);
                                                strAmendedItems.Append("\n");
                                            }
                                        }
                                        else if ((String.Compare(sDoseType, DoseTypeCode.CONDITIONAL, StringComparison.OrdinalIgnoreCase) == 0 || String.Compare(sDoseType, DoseTypeCode.STEPPEDVARIABLE, StringComparison.OrdinalIgnoreCase) == 0)) {
                                            if (objRes.oBasicProperties.Count > 0) {
                                                if (objRes.oBasicProperties[SlotAdministrationHelper.ThirdStepDoseRegimeIndex] != null && objRes.oBasicProperties[SlotAdministrationHelper.FourthStepDoseRegimeIndex] != null && objRes.oBasicProperties[SlotAdministrationHelper.ThirdStepDoseRegimeIndex].Dose.DoseRegime.Count > objRes.oBasicProperties[SlotAdministrationHelper.FourthStepDoseRegimeIndex].Dose.DoseRegime.Count || (objRes.oBasicProperties[SlotAdministrationHelper.ThirdStepDoseRegimeIndex].Dose.DoseRegime[0].LowerDose > 0 || objRes.oBasicProperties[SlotAdministrationHelper.FourthStepDoseRegimeIndex].Dose.DoseRegime[0].LowerDose > 0 || objRes.oBasicProperties[SlotAdministrationHelper.ThirdStepDoseRegimeIndex].Dose.DoseRegime[0].UpperDose > 0 || objRes.oBasicProperties[SlotAdministrationHelper.FourthStepDoseRegimeIndex].Dose.DoseRegime[0].UpperDose > 0)) {
                                                    strAmendedItems.Append("Dose");
                                                    strAmendedItems.Append(this.sDelimiter);
                                                    strAmendedItems.Append("ICON");
                                                    strAmendedItems.Append("\n");
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        if (objRes.oBasicProperties[0].FrequencyDetails != null && objRes.oBasicProperties[0].FrequencyDetails.Frequency != null && objRes.oBasicProperties[1].FrequencyDetails != null && objRes.oBasicProperties[1].FrequencyDetails.Frequency != null && objRes.oBasicProperties[0].FrequencyDetails.Frequency.OID != objRes.oBasicProperties[1].FrequencyDetails.Frequency.OID && !String.IsNullOrEmpty(objRes.oBasicProperties[0].FrequencyDetails.Frequency.Name)) {
                            strAmendedItems.Append("Frequency");
                            strAmendedItems.Append(this.sDelimiter);
                            strAmendedItems.Append(objRes.oBasicProperties[0].FrequencyDetails.Frequency.Name);
                            strAmendedItems.Append("\n");
                        }
                        if (objRes.oBasicProperties[0].Quantity != null && ((objRes.oBasicProperties[1].Quantity != null && objRes.oBasicProperties[0].Quantity.QuantityUOMId != objRes.oBasicProperties[1].Quantity.QuantityUOMId) || objRes.oBasicProperties[1].Quantity == null) && !String.IsNullOrEmpty(objRes.oBasicProperties[0].Quantity.QuantityValue)) {
                            strAmendedItems.Append("Quantity");
                            strAmendedItems.Append(this.sDelimiter);
                            strAmendedItems.Append(objRes.oBasicProperties[0].Quantity.QuantityValue);
                            strAmendedItems.Append(" ");
                            strAmendedItems.Append(objRes.oBasicProperties[0].Quantity.QuantityUOMName);
                            strAmendedItems.Append("\n");
                        }
                        if (objRes.oBasicProperties[0].AdminInstruction != null && ((objRes.oBasicProperties[1].AdminInstruction != null && objRes.oBasicProperties[0].AdminInstruction.OID != objRes.oBasicProperties[1].AdminInstruction.OID) || objRes.oBasicProperties[1].AdminInstruction == null) && !String.IsNullOrEmpty(objRes.oBasicProperties[0].AdminInstruction.Name)) {
                            strAmendedItems.Append("Administration Instruction");
                            strAmendedItems.Append(this.sDelimiter);
                            strAmendedItems.Append(objRes.oBasicProperties[0].AdminInstruction.Name);
                            strAmendedItems.Append("\n");
                        }
                        if (objRes.oBasicProperties[0].Direction != null && ((objRes.oBasicProperties[1].Direction != null && objRes.oBasicProperties[0].Direction.Code != objRes.oBasicProperties[1].Direction.Code) || objRes.oBasicProperties[1].Direction == null) && !String.IsNullOrEmpty(objRes.oBasicProperties[0].Direction.Code)) {
                            strAmendedItems.Append("Direction");
                            strAmendedItems.Append(this.sDelimiter);
                            objRes.oBasicProperties[0].Direction.Code = "As needed";
                            strAmendedItems.Append(objRes.oBasicProperties[0].Direction.Code);
                            strAmendedItems.Append("\n");
                        }
                        if (objRes.oBasicProperties[0].PatientProblem != null && objRes.oBasicProperties[0].PatientProblem.Count > 0 && objRes.oBasicProperties[1].PatientProblem != null && objRes.oBasicProperties[1].PatientProblem.Count > 0 && objRes.oBasicProperties[0].PatientProblem[0].Code != objRes.oBasicProperties[1].PatientProblem[0].Code && !String.IsNullOrEmpty(objRes.oBasicProperties[0].PatientProblem[0].Code)) {
                            strAmendedItems.Append("Problem");
                            strAmendedItems.Append(this.sDelimiter);
                            let sPblm: string = objRes.oBasicProperties[0].PatientProblem[0].Code;
                            let sPblmSerialize: string[] = sPblm.Split('~');
                            if (sPblmSerialize != null && sPblmSerialize.length > 0) {
                                let sProblemName: StringBuilder = new StringBuilder();
                                let stmp: string[] = null;
                                for (let i: number = 0; i <= sPblmSerialize.length - 1; i++) {
                                    stmp = sPblmSerialize[i].Split('$');
                                    strAmendedItems.Append(stmp[0]);
                                }
                                strAmendedItems.Append("\n");
                            }
                        }
                        let strInst1: string, strInst2 = String.Empty;
                        if ((ObjectHelper.CreateType<IPPPresItemBasicProperties>(objRes.oBasicProperties[0], IPPPresItemBasicProperties)) != null) {
                            if ((ObjectHelper.CreateType<IPPPresItemBasicProperties>(objRes.oBasicProperties[0], IPPPresItemBasicProperties)).Instruction != null) {
                                strInst1 = (ObjectHelper.CreateType<IPPPresItemBasicProperties>(objRes.oBasicProperties[0], IPPPresItemBasicProperties)).Instruction.Name;
                                strInst2 = (ObjectHelper.CreateType<IPPPresItemBasicProperties>(objRes.oBasicProperties[1], IPPPresItemBasicProperties)).Instruction.Name;
                                if (strInst1 != strInst2) {
                                    strAmendedItems.Append("PRN instruction");
                                    strAmendedItems.Append(this.sDelimiter);
                                    if (!String.IsNullOrEmpty(strInst1))
                                        strAmendedItems.Append(strInst1);
                                    else strAmendedItems.Append("<Empty>");
                                    strAmendedItems.Append("\n");
                                }
                            }
                            strInst1 = (ObjectHelper.CreateType<IPPPresItemBasicProperties>(objRes.oBasicProperties[0], IPPPresItemBasicProperties)).StrengthText;
                            strInst2 = (ObjectHelper.CreateType<IPPPresItemBasicProperties>(objRes.oBasicProperties[1], IPPPresItemBasicProperties)).StrengthText;
                            if (strInst1 != strInst2) {
                                strAmendedItems.Append("Strength text");
                                strAmendedItems.Append(this.sDelimiter);
                                if (!String.IsNullOrEmpty(strInst1))
                                    strAmendedItems.Append(strInst1);
                                else strAmendedItems.Append("<Empty>");
                                strAmendedItems.Append("\n");
                            }
                        }
                    }
                    if (objRes.oAddProperties[0] != null && objRes.oAddProperties[1] != null) {
                        if (objRes.oAddProperties[0].StationeryType != null && ((objRes.oAddProperties[1].StationeryType != null && objRes.oAddProperties[0].StationeryType.OID != objRes.oAddProperties[1].StationeryType.OID) || objRes.oAddProperties[1].StationeryType == null) && !String.IsNullOrEmpty(objRes.oAddProperties[0].StationeryType.Name)) {
                            strAmendedItems.Append("StationeryType");
                            strAmendedItems.Append(this.sDelimiter);
                            strAmendedItems.Append(objRes.oAddProperties[0].StationeryType.Name);
                            strAmendedItems.Append("\n");
                        }
                        if (objRes.oAddProperties[0].AdditionalComments != objRes.oAddProperties[1].AdditionalComments && !String.IsNullOrEmpty(objRes.oAddProperties[0].AdditionalComments)) {
                            strAmendedItems.Append("Additional comments");
                            strAmendedItems.Append(this.sDelimiter);
                            strAmendedItems.Append(objRes.oAddProperties[0].AdditionalComments);
                            strAmendedItems.Append("\n");
                        }
                        if (objRes.oAddProperties[0].BatchNumber != objRes.oAddProperties[1].BatchNumber && !String.IsNullOrEmpty(objRes.oAddProperties[0].BatchNumber)) {
                            strAmendedItems.Append("BatchNumber");
                            strAmendedItems.Append(this.sDelimiter);
                            strAmendedItems.Append(objRes.oAddProperties[0].BatchNumber);
                            strAmendedItems.Append("\n");
                        }
                        if (DateTime.NotEquals(objRes.oAddProperties[0].ExpiryDate , objRes.oAddProperties[1].ExpiryDate)) {
                            strAmendedItems.Append("ExpiryDate");
                            strAmendedItems.Append(this.sDelimiter);
                            strAmendedItems.Append(objRes.oAddProperties[0].ExpiryDate);
                            strAmendedItems.Append("\n");
                        }
                        if (objRes.oAddProperties[0].AdminMethod != null && ((objRes.oAddProperties[1].AdminMethod != null && objRes.oAddProperties[0].AdminMethod.Code != objRes.oAddProperties[1].AdminMethod.Code) || objRes.oAddProperties[1].AdminMethod == null) && !String.IsNullOrEmpty(objRes.oAddProperties[0].AdminMethod.Code)) {
                            strAmendedItems.Append("Admin method");
                            strAmendedItems.Append(this.sDelimiter);
                            strAmendedItems.Append(objRes.oAddProperties[0].AdminMethod.Name);
                            strAmendedItems.Append("\n");
                        }
                        if (objRes.oAddProperties[0].NoOfInstallments != objRes.oAddProperties[1].NoOfInstallments && objRes.oAddProperties[0].NoOfInstallments > 0) {
                            strAmendedItems.Append("No of installments");
                            strAmendedItems.Append(this.sDelimiter);
                            strAmendedItems.Append(objRes.oAddProperties[0].NoOfInstallments);
                            strAmendedItems.Append("\n");
                        }
                    }
                }
                this.oMedAmendMessageVM.AmendMsgOkCancel = Resource.MedAmendMessage.lblAmendOk_Text;
                this.oMedAmendMessageVM.AmendMsg = strAmendedItems.ToString();
            }
            if (this.AmendEvent != null) {
                this.AmendEvent();
            }
           
            //this.AmendEvent -= new AmendDelegate(this.MedsRecordAdminstrator_AmendEvent);
        }
        MedsRecordAdminstrator_AmendEvent(): void {
            if (!String.IsNullOrEmpty(this.oMedAmendMessageVM.AmendMsg) && !this.oSlotVM.IsRecordAdmin) {
                this.objAmendmentmessage = new MedAmendMessage(this.oMedAmendMessageVM);
                AppActivity.OpenWindow("Amend", this.objAmendmentmessage, (s,e) => { this.objAmendmentmessage_Closed(s) }, "", false, 300, 400, false, WindowButtonType.Ok, null);
            }
            else {
                if (this.oSlotVM.IsRecordAdmin && this.RefreshRecordAdminEvent != null) {
                    this.oMedAmendMessageVM.AmendMsgOkCancel = Resource.MedAmendMessage.lblAmendOkCancel_Text;
                    this.RefreshRecordAdminEvent(this.objAdminDetail, this.oMedAmendMessageVM);
                }
                else if (this.LaunchRecordAdminEvent != null) {
                    this.LaunchRecordAdminEvent(this.objAdminDetail);
                }
            }
        }
        objAmendmentmessage_Closed(args: AppDialogEventargs): void {
            Busyindicator.SetStatusIdle("MedChart");
            if (args.Result == AppDialogResult.Cancel) {
                Busyindicator.SetStatusIdle("Administration");
                this.objAmendmentmessage.appDialog.DialogResult = false;
            }
            else {
                this.objAmendmentmessage.appDialog.DialogResult = true;
                this.oSlotVM.IsAmend = true;
                if (this.LaunchRecordAdminEvent != null)
                    this.LaunchRecordAdminEvent(this.objAdminDetail);
            }
        }
        public GetPresItemParentChildDetail(oTagDrugHdr: TagDrugHeaderDetail): void {
            let objService: MedicationAdministrationWSSoapClient = new MedicationAdministrationWSSoapClient();
            objService.GetPresItemParentChildDetailCompleted  = (s,e) => { this.objService_GetPresItemParentChildDetailCompleted(s,e); } ;
            let objReq: CReqMsgGetPresItemParentChildDetail = new CReqMsgGetPresItemParentChildDetail();
            objReq.oContextInformation = CommonBB.FillContext();
            objReq.PrescriptionItemOIDBC = oTagDrugHdr.PrescriptionItemOID;
            objReq.PatientOIDBC = ChartContext.PatientOID;
            objReq.PITSTCodeBC = oTagDrugHdr.PrescriptionItemStatus;
            objService.GetPresItemParentChildDetailAsync(objReq);
        }
        objService_GetPresItemParentChildDetailCompleted(sender: Object, e: GetPresItemParentChildDetailCompletedEventArgs): void {
            if (e.Result != null) {
                let objRes: CResMsgGetPresItemParentChildDetail = e.Result;
                let oPrescItemParentChildDetails: PresItemParentChildDetail = new PresItemParentChildDetail();
                if (objRes.oPrescScheAmendedDetail != null) {
                    oPrescItemParentChildDetails.ParentPrescriptionItemOID = objRes.oPrescScheAmendedDetail.ParentPrescriptionItemOID;
                    oPrescItemParentChildDetails.ChildPrescriptionItemOID = objRes.oPrescScheAmendedDetail.ChildPrescriptionItemOID;
                    oPrescItemParentChildDetails.FirstScheduleOID = objRes.oPrescScheAmendedDetail.FirstScheduleOID;
                    oPrescItemParentChildDetails.LastScheduleOID = objRes.oPrescScheAmendedDetail.LastScheduleOID;
                    this.oTagDrugHdr.PrescriptionItemParentChildDetails = new PresItemParentChildDetail();
                    this.oTagDrugHdr.PrescriptionItemParentChildDetails = oPrescItemParentChildDetails;
                    this.oTagDrugHdr.PrescriptionItemParentChildDetails.IsDetailsAlreadyRetreived = true;
                }
                if (this.WarningBeforeAdministrationCompletedEvent != null)
                    this.WarningBeforeAdministrationCompletedEvent(this.bckUpIsPGD, this.bckUpWhatToLaunch);
            }
        }
        public CheckDuplicateSlotWarningExists(oTagDrugHeaderDetailObject: TagDrugHeaderDetail, SlotOID: number, sSlotStatus: string, IsPGD: boolean, eWhatNeedsToLaunch: LaunchAdminType): void {
            this.bckUpTagObj = oTagDrugHeaderDetailObject;
            this.bckUpIsPGD = IsPGD;
            this.bckUpWhatToLaunch = eWhatNeedsToLaunch;
            this.bckSlotOID = SlotOID;
            this.bckSlotStatus = sSlotStatus;
            if (oTagDrugHeaderDetailObject != null) {
                this.oTagDrugHdr = oTagDrugHeaderDetailObject;
                if (oTagDrugHeaderDetailObject.PrescriptionItemParentChildDetails != null && oTagDrugHeaderDetailObject.PrescriptionItemParentChildDetails.IsDetailsAlreadyRetreived) {
                    if (this.WarningBeforeAdministrationCompletedEvent != null)
                        this.WarningBeforeAdministrationCompletedEvent(this.bckUpIsPGD, this.bckUpWhatToLaunch);
                }
                else {
                    if (!oTagDrugHeaderDetailObject.IsPRNWithSchedule && (((String.Equals(oTagDrugHeaderDetailObject.PrescriptionItemStatus, CConstants.COMPLETED, StringComparison.InvariantCultureIgnoreCase) || String.Equals(oTagDrugHeaderDetailObject.PrescriptionItemStatus, CConstants.DISCONTINUED, StringComparison.InvariantCultureIgnoreCase)) && String.Equals(sSlotStatus, SlotStatus.NOTKNOWN, StringComparison.InvariantCultureIgnoreCase)) || (!(String.Equals(oTagDrugHeaderDetailObject.PrescriptionItemStatus, CConstants.COMPLETED, StringComparison.InvariantCultureIgnoreCase) || String.Equals(oTagDrugHeaderDetailObject.PrescriptionItemStatus, CConstants.DISCONTINUED, StringComparison.InvariantCultureIgnoreCase)) && (String.Equals(sSlotStatus, SlotStatus.DUENOW, StringComparison.InvariantCultureIgnoreCase) || String.Equals(sSlotStatus, SlotStatus.OVERDUE, StringComparison.InvariantCultureIgnoreCase) || String.Equals(sSlotStatus, SlotStatus.NOTYETRECORDED, StringComparison.InvariantCultureIgnoreCase) || String.Equals(sSlotStatus, SlotStatus.PLANNED, StringComparison.InvariantCultureIgnoreCase))))) {
                        this.GetPresItemParentChildDetail(oTagDrugHeaderDetailObject);
                    }
                    else {
                        if (this.WarningBeforeAdministrationCompletedEvent != null)
                            this.WarningBeforeAdministrationCompletedEvent(this.bckUpIsPGD, this.bckUpWhatToLaunch);
                    }
                }
            }
        }
    }
