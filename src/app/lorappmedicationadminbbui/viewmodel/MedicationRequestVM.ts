import { Component, EventEmitter, OnInit } from '@angular/core';
import { StringBuilder,ProfileFactoryType,ContextManager,Convert,AppActivity, ProcessRTE, MediatorDataService} from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp,Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison,AppDialogEventargs, AppDialogResult, DelegateArgs, DialogComponentArgs, WindowButtonType, ObservableCollection, CListItem, List, AppSessionInfo, AppContextInfo,  RTEEventargs, CValuesetTerm, WizardAction, int64, byte, Visibility } from 'epma-platform/models';
import { AppDialog } from 'epma-platform/controls';
import { HelperService} from 'epma-platform/soapclient';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
import { PatientContext,ContextInfo } from 'src/app/lorappcommonbb/utilities/globalvariable';
import { CancelledPresReqHistoryDetails, CReqMsgSubmitMedRequests, MedicationAdministrationWSSoapClient, RequisitionHistoryDetails, SubmitMedRequestsCompletedEventArgs } from 'src/app/shared/epma-platform/soap-client/MedicationAdministrationWS';
import { PrescriptionItemViewVM } from './PrescriptionItemViewVM';
import { ViewModelBase } from 'src/app/lorappcommonbb/viewmodelbase';
import { InfHumdificationConceptCodeData, InfusionTypeConceptCodeData, MedDoseTypeConceptCodeData, MedicationCommonConceptCodeData, MedicationCommonProfileData } from 'src/app/lorappmedicationcommonbb/utilities/profiledata';
import { ChartContext, MedChartData, ValueDomainValues } from '../utilities/globalvariable';
import { CommonBB } from 'src/app/lorappcommonbb/utilities/common';
import { Busyindicator } from 'src/app/lorappcommonbb/busyindicator';
import { CConstants, PrescriptionItmTyp, PrescriptionTypes, UrgencyCode, ValueDomain, ValueSet } from '../utilities/CConstants';
import { MedicationRequest } from '../resource/medicationrequest.designer';
import { MedRequestDetail } from 'src/app/shared/epma-platform/soap-client/IPPMAManagePrescriptionWS';
import { Dictionary } from 'epma-platform/dictionary';
import { MedicationAdministrator } from '../resource/medicationadministrator.designer';
import { AMSHelper } from 'src/app/lorappcommonbb/amshelper';
import * as IPPMAManagePrescSer from 'src/app/shared/epma-platform/soap-client/IPPMAManagePrescriptionWS';
import { AddPrescribingConfigData, CChartDisplayConfig, CChartSettingsConfig, CClinicalIncidentConfig, CMedicationLineDisplayData, CSlotCharacteristicsConfig, InfusionPresConfigData, MedicationViewConfigData } from 'src/app/lorappslprofiletypes/medication';
import { DrugItemSubTypeCode } from 'src/app/lorappmedicationcommonbb/utilities/constants';
import { ProfileData } from '../utilities/ProfileData';
import { LzoWizardVmbaseService as LzoWizardVMBase } from 'src/app/shared/epma-platform/services/lzo-wizard-vmbase.service';
import { InfusionLineItemVM } from 'src/app/lorappmedicationcommonbb/utilities/lineitemconstructor';
import { InjectorInstance } from 'src/app/app.module';
import { GridExtension } from 'src/app/shared/epma-platform/controls/epma-grid-helpers/grid-extension';
import { PropertyChangedEventArgs } from 'src/app/shared/epma-platform/controls/epma-tab/epma-tab.component';

    export class MedicationRequestVM extends LzoWizardVMBase {
        
        GetRequestMedicationDetailsCompleted = new EventEmitter();
        public _mediatorDataService: MediatorDataService;

        constructor() {
            super()
            this._mediatorDataService = InjectorInstance.get<MediatorDataService>(MediatorDataService);
            this._mediatorDataService.listenFor(6).subscribe((data: any) => {
                if (data) {
                    let contextData = data.context;
                    switch (contextData.context.event) {
                        case 'Discard_Click': this.OnCancel();
                            break;
                        case 'Finish_Click':
                            HelperService.windowCloseFlag = "Finish";
                            this.OnFinish();
                            break;
                        case 'FinishNow_Click':
                            HelperService.windowCloseFlag = "FinishNow";
                            this.OnFinishNow();
                            break;
                    }
                }
            })
            this.OnInitialize();
            this.OnInitComplete();
        }
        ExistingMessage: boolean = false;
        FinishClickCnt: number = 0;
        //public delegate void MedReqProfileDelegate();
        public MedReqProfileCompleted: Function;
        private _MedRequestlist: ObservableCollection<MedRequestVM>;
        public get MedRequestlist(): ObservableCollection<MedRequestVM> {
            return this._MedRequestlist;
        }
        public set MedRequestlist(value: ObservableCollection<MedRequestVM>) {
            this._MedRequestlist = value;
            // OnPropertyChanged("MedRequestlist");
        }
        MedRequestlistAddCompleted()
        {
            this.NotifyPropertyChanged("MedRequestlist");
        }
        private NotifyPropertyChanged(prop: string) {
            let e:PropertyChangedEventArgs = { PropertyName: prop};
              if (this.PropertyChanged)
                this.PropertyChanged({},e);
          }
        public override OnInitialize(): void {
            super.OnInitialize();
        }
        public override OnInitComplete(): void {
            this.FillContextData();
            this.GetDomainValues();
            super.OnInitComplete();
        }
        
        private LoadMedicationrequest(): void {
            Busyindicator.SetStatusBusy("RequestMedication");
            this.MedRequestlist = new ObservableCollection<MedRequestVM>();
            let objServiceProxy: IPPMAManagePrescSer.IPPMAManagePrescriptionWSSoapClient = new IPPMAManagePrescSer.IPPMAManagePrescriptionWSSoapClient();
            objServiceProxy.GetRequestMedicationDetailsCompleted = (s, e) => {
                this.Resolve_GetRequestMedicationListCompleted(s, e);
            };
            let objReqList: IPPMAManagePrescSer.CReqMsgGetRequestMedicationDetails = new IPPMAManagePrescSer.CReqMsgGetRequestMedicationDetails();
            objReqList.oMedicationListCriteriaBC = new IPPMAManagePrescSer.MedicationListCriteria();
            objReqList.oMedicationListCriteriaBC.PatientOID = PatientContext.PatientOID;
            objReqList.oMedicationListCriteriaBC.CAPresType = PrescriptionTypes.ForAdministration;
            objReqList.oMedicationListCriteriaBC.McVersion = AppSessionInfo.AMCV;
            objReqList.oMedicationListCriteriaBC.EncounterOID = PatientContext.EncounterOid;
            objReqList.oMedicationListCriteriaBC.PrescriptionType = PrescriptionTypes.ForAdministration;
            objReqList.oMedicationListCriteriaBC.ProfileDiscontinuedDrugFlag = CConstants.DrugFlag;
            objReqList.oMedicationListCriteriaBC.sMenuCode = CConstants.RequestMedication;
            objReqList.oMedicationListCriteriaBC.ServiceOID = MedChartData.ServiceOID;
            objReqList.oMedicationListCriteriaBC.LocationOID = MedChartData.LocationOID;
            objReqList.oContextInformation = CommonBB.FillContext();
            objServiceProxy.GetRequestMedicationDetailsAsync(objReqList);
        }
        public FillContextData(): void {
            if (this.WizardContext != null) {
                let lnPatOID: number;
                let lnEncOID: number;
                let lnLocationOID: number;
                let lnServiceOID: number;
                let lnChartPatOID: number;
                if (Number.TryParse(this.WizardContext["PATIENTOID"],(o) => {
                    lnPatOID = o;
                  })) {
                    PatientContext.PatientOID = lnPatOID;
                }
                AppContextInfo.OrganisationOID = !String.IsNullOrEmpty(this.AppContext.OrganisationOID) ? this.AppContext.OrganisationOID : String.Empty;
                if (Number.TryParse(this.WizardContext["EncounterOID"], (o) => {
                    lnEncOID = o;
                  })) {
                    PatientContext.EncounterOid = lnEncOID;
                }
                if (Number.TryParse(this.WizardContext["ChartPatientOID"], (o) => {
                    lnChartPatOID = o;
                  })) {
                    ChartContext.PatientOID = lnChartPatOID;
                }
                if (Number.TryParse(this.WizardContext["SRVCPOINTOID"], (o) => {
                    lnServiceOID = o;
                  })) {
                    MedChartData.ServiceOID = lnServiceOID;
                }
                if (Number.TryParse(this.WizardContext["LocationOID"],(o) => {
                    lnLocationOID = o;
                  } )) {
                    MedChartData.LocationOID = lnLocationOID;
                }
                if (ContextManager.Instance["JobRoleOID"] != null) {
                    AppContextInfo.JobRoleOID = ContextManager.Instance["JobRoleOID"].ToString();
                }
                if (ContextManager.Instance["AMCV"] != null) {
                    AppSessionInfo.AMCV = ContextManager.Instance["AMCV"].ToString();
                }
                if (ContextManager.Instance["SecurityToken"] != null && !String.IsNullOrEmpty(ContextManager.Instance["SecurityToken"].ToString())) {
                    ContextInfo.SecurityToken = ContextManager.Instance["SecurityToken"].ToString();
                }
                if (ContextManager.Instance["UserOID"] != null && !String.IsNullOrEmpty(ContextManager.Instance["UserOID"].ToString())) {
                    let objUserOid: int64;
                    Int64.TryParse(ContextManager.Instance["UserOID"].ToString(), (o) => {
                        objUserOid = o;
                      });
                    ContextInfo.UserOID = objUserOid;
                }
                if (ContextManager.Instance["ReleaseVersion"] != null && !String.IsNullOrEmpty(ContextManager.Instance["ReleaseVersion"].ToString())) {
                    let objReleaseVer: byte;
                    Byte.TryParse(ContextManager.Instance["ReleaseVersion"].ToString(), (o) => {
                        objReleaseVer = o;
                      });
                    ContextInfo.ReleaseVersion = objReleaseVer;
                }
            }
        }
        public GetDomainValues(): void {
            this.GetProfileConfigData();
        }
        OnRTEViewResult(args: RTEEventargs): void {
            if (String.IsNullOrEmpty(args.Request) || args.Result == null)
                return
            if (String.Compare(args.Request, ValueDomain.PrescriptionItemStatus + "," + ValueDomain.INFUSIONTYPE + "," + ValueDomain.MedSupp + "," + ValueDomain.MedSupplyStatus + "," + ValueDomain.DoseType + "," + ValueDomain.Humidification + "," + ValueDomain.MedTreatCont) == 0) {
                if (args.Result instanceof Dictionary) {
                    if (MedicationCommonConceptCodeData.ConceptCodes == null)
                        MedicationCommonConceptCodeData.ConceptCodes = new ObservableCollection<CValuesetTerm>();
                    let objResult: Dictionary<string, List<CListItem>> =  ObjectHelper.CreateType<Dictionary<string, List<CListItem>>>(args.Result,Dictionary<string, List<CListItem>>);
                    objResult.forEach( (objDomainDetail)=> {
                        switch (objDomainDetail.Key) {
                            case ValueDomain.PrescriptionItemStatus:
                                {
                                    ValueDomainValues.oPrescriptionItemStatus = new ObservableCollection<CValuesetTerm>();
                                    (<List<CListItem>>objDomainDetail.Value).forEach( (oCListItem)=> {
                                        MedicationCommonConceptCodeData.ConceptCodes.Add(ObjectHelper.CreateObject(new CValuesetTerm(), { csCode: oCListItem.Value, csDescription: oCListItem.DisplayText }));
                                    });
                                    break;
                                }
                            case ValueDomain.MedSupp:
                                {
                                    ValueDomainValues.oMedSupp = new ObservableCollection<CValuesetTerm>();
                                    (<List<CListItem>>objDomainDetail.Value).forEach( (oCListItem)=> {
                                        ValueDomainValues.oMedSupp.Add(ObjectHelper.CreateObject(new CValuesetTerm(), { csCode: oCListItem.Value, csDescription: oCListItem.DisplayText }));
                                    });
                                    break;
                                }
                            case ValueDomain.MedSupplyStatus:
                                {
                                    ValueDomainValues.oMedSupplyStatus = new ObservableCollection<CValuesetTerm>();
                                   (<List<CListItem>>objDomainDetail.Value).forEach( (oCListItem)=> {
                                        ValueDomainValues.oMedSupplyStatus.Add(ObjectHelper.CreateObject(new CValuesetTerm(), { csCode: oCListItem.Value, csDescription: oCListItem.DisplayText }));
                                    });
                                    break;
                                }
                            case ValueDomain.INFUSIONTYPE:
                                {
                                    if (InfusionTypeConceptCodeData.ConceptCodes == null) {
                                        InfusionTypeConceptCodeData.ConceptCodes = new ObservableCollection<CValuesetTerm>();
                                    }
                                    InfusionTypeConceptCodeData.ConceptCodes.Clear();
                                    (<List<CListItem>>objDomainDetail.Value).forEach( (oCListItem)=> {
                                        InfusionTypeConceptCodeData.ConceptCodes.Add(ObjectHelper.CreateObject(new CValuesetTerm(), { csCode: oCListItem.Value, csDescription: oCListItem.DisplayText }));
                                    });
                                    break;
                                }
                            case ValueDomain.DoseType:
                                {
                                    MedDoseTypeConceptCodeData.ConceptCodes = new Dictionary<string, string>();
                                    (<List<CListItem>>objDomainDetail.Value).forEach( (oCListItem)=> {
                                        MedDoseTypeConceptCodeData.ConceptCodes.Add(oCListItem.Value.ToUpper(), oCListItem.DisplayText);
                                    });
                                    break;
                                }
                            case ValueDomain.Humidification:
                                InfHumdificationConceptCodeData.ConceptCodes = new ObservableCollection<CListItem>();
                                (<List<CListItem>>objDomainDetail.Value).forEach( (oCListItem)=> {
                                    InfHumdificationConceptCodeData.ConceptCodes.Add(ObjectHelper.CreateObject(new CListItem(), { Value: oCListItem.Value, DisplayText: oCListItem.DisplayText }));
                                });
                                break;
                            case ValueDomain.MedTreatCont:
                                {
                                    ValueDomainValues.oMedTreatCont = new ObservableCollection<CValuesetTerm>();
                                    (<List<CListItem>>objDomainDetail.Value).forEach( (oCListItem)=> {
                                        ValueDomainValues.oMedTreatCont.Add(ObjectHelper.CreateObject(new CValuesetTerm(), { csCode: oCListItem.Value, csDescription: oCListItem.DisplayText }));
                                    });
                                    break;
                                }
                        }
                    });
                }
            }
            ProcessRTE.GetAllReferenceCodesByDomain(ValueDomain.MEDURGENCY, ValueSet.ReqMedGroup, (s, e) => { this.OnRTEResultReqMedGroup(s); });
        }
        OnRTEResultReqMedGroup(args: RTEEventargs): void {
            if (String.IsNullOrEmpty(args.Request) || args.Result == null)
                return
            if (String.Equals(args.Request, (ValueDomain.MEDURGENCY + "," + ValueSet.ReqMedGroup))) {
                if (args.Result instanceof Dictionary) {
                    if (MedicationCommonConceptCodeData.ViewConceptCodes == null)
                        MedicationCommonConceptCodeData.ViewConceptCodes = new ObservableCollection<CValuesetTerm>();
                    let objResult: Dictionary<string, List<CListItem>> =  ObjectHelper.CreateType<Dictionary<string, List<CListItem>>>(args.Result,Dictionary<string, List<CListItem>>);
                    if (ValueDomainValues.UrgencyDomain == null) {
                        objResult.forEach( (objDomainDetail)=> {
                            switch (objDomainDetail.Key) {
                                case ValueDomain.MEDURGENCY:
                                    {
                                        if (ValueDomainValues.UrgencyDomain == null) {
                                            ValueDomainValues.UrgencyDomain = new ObservableCollection<CListItem>();
                                        }
                                        (<List<CListItem>>objDomainDetail.Value).forEach( (oCListItem)=> {
                                            ValueDomainValues.UrgencyDomain.Add(ObjectHelper.CreateObject(new CListItem(), { Value: oCListItem.Value, DisplayText: oCListItem.DisplayText }));
                                        });
                                        ValueDomainValues.UrgencyDomain.Add(ObjectHelper.CreateObject(new CListItem(), { Value: UrgencyCode.Normal, DisplayText: String.Empty }));
                                        break;
                                    }
                            }
                        });
                    }
                    this.LoadMedicationrequest();
                }
            }
        }
        public override OnValidate(action: WizardAction): boolean {
            return super.OnValidate(action);
        }
        public override OnNext(): void {
            super.OnNext();
        }
        public override OnPrevious(): void {
            super.OnPrevious();
        }
        oCancelledPresReqHistoryDetails: CancelledPresReqHistoryDetails[] = null;
        public override OnFinish(): void {
            let ShowMessage: boolean = false;
            let ShowIndiChild: boolean = false;
            let ShowParent: boolean = false;
            let ShowChild: boolean = false;
            let MCIList: ObservableCollection<MedRequestVM> = new ObservableCollection<MedRequestVM>();
            let top: any = window.top;
            if (top.msgAlert == false && String.Equals(this.WizardContext["LaunchFrom"], CConstants.NonInfRecAdminCACode)) {
                ObjectHelper.stopFinishAndCancelEvent(true);
            }

            this.FinishClickCnt++;
            if (this.MedRequestlist != null && this.FinishClickCnt == 1) {
                ShowMessage = (this.MedRequestlist.Any(a => (a.IsSupplyRequestExist || a.IsCancelReqEnabled) && a.IsUrgencyChecked));
                MCIList = new ObservableCollection<MedRequestVM>(this.MedRequestlist.Where(b => b.oPrescriptionItemViewVM.Itemsubtype == "CC_MULCMPNTITM"));
                if (MCIList != null) {
                    MCIList.forEach( (item)=> {
                        if (!ShowIndiChild) {
                            ShowIndiChild = item.ReqMedPresItemsList.Any(x => (x.IsSupplyRequestExist || x.IsCancelReqEnabled) && x.IsUrgencyChecked);
                        }
                        if (!ShowParent && item.IsUrgencyChecked) {
                            ShowParent = item.ReqMedPresItemsList.Any(x => (x.IsSupplyRequestExist || x.IsCancelReqEnabled) && (!String.IsNullOrEmpty(x.LastRequestdBy) || !String.IsNullOrEmpty(x.LastRequestdDTTM)));
                        }
                        if (!ShowChild && DateTime.NotEquals(item.LastReqLongDTTM , DateTime.MinValue)) {
                            ShowChild = item.ReqMedPresItemsList.Any(x => x.IsUrgencyChecked);
                        }
                    });
                }
            }
            this.oCancelledPresReqHistoryDetails = this.GetCancelledPresReqHistory();
            if ((ShowMessage || ShowIndiChild || ShowParent || ShowChild) && !this.ExistingMessage) {
                let errMsg: string = String.Empty;
                let liPrescriptionItems: List<string>;
                this.GetPrescriptionItemNameForNewlyRequested((o) => { liPrescriptionItems = o; });
                errMsg = String.Format(MedicationRequest.ResentRequestMessage, String.Join("\n\n\t", liPrescriptionItems.ToArray()));
                let iMsgBoxRole: iMessageBox = new iMessageBox();
                iMsgBoxRole.Title = MedicationAdministrator.MessageBoxTitle;
                iMsgBoxRole.MessageBoxClose  = (s,e) => { this.iMsgBoxServicePoint_MessageBoxClose(s,e); } ;
                iMsgBoxRole.IconType = MessageBoxType.Question;
                iMsgBoxRole.Height = 290;
                iMsgBoxRole.Width = 420;
                iMsgBoxRole.Message = errMsg;
                iMsgBoxRole.MessageButton = MessageBoxButton.YesNoCancel;
                iMsgBoxRole.Show();
                this.ExistingMessage = true;
                this.FinishClickCnt = 0;
                MedChartData.IsReqMedCAlaunched = false;
                let top:any = window.top;
                if (HelperService.windowCloseFlag == "Finish" || HelperService.windowCloseFlag == 'FinishNow')
                {
                    top.oScreen.UnFreeze();
                }
            }
            else if (!this.ExistingMessage && this.FinishClickCnt == 1) {
                let MedNewlyRequestedList: ObservableCollection<MedRequestVM> = new ObservableCollection<MedRequestVM>();
                this.GetChildMCISubmit((o) => { MedNewlyRequestedList = o; });
                if (MedNewlyRequestedList.Count > 0 || (this.oCancelledPresReqHistoryDetails != null && this.oCancelledPresReqHistoryDetails.length > 0)) {
                    this.SubmitMedicationRequest(MedNewlyRequestedList);
                }
                else {
                     super.OnFinish();                    
                    //super.OnCloseCA();
                }
            }

        }
        private GetPrescriptionItemNameForNewlyRequested(out1: (liPrescriptionItems: List<string>) => void): void {
            let liPrescriptionItems: List<string>; 
             
                        liPrescriptionItems = new List<string>();
                        if (this.MedRequestlist != null) {
                            this.MedRequestlist.forEach( (obj)=> {
                                if (obj != null && !String.IsNullOrEmpty(obj.PrescriptionItemName)) {
                                    if (obj.IsUrgencyChecked && (obj.IsSupplyRequestExist || obj.IsCancelReqEnabled)) {
                                        if (obj.oPrescriptionItemViewVM != null && obj.oPrescriptionItemViewVM.Itemsubtype == "CC_MULCMPNTITM" && obj.oPrescriptionItemViewVM.lorenzoid == "PI-001") {
                                            liPrescriptionItems.Add(obj.PrescriptionItemName + " (" + obj.PrescriptionItemStartDTTM.ToString(CConstants.DateTimeFormat) + ")");
                                        }
                                        else if (obj.oPrescriptionItemViewVM != null && obj.oPrescriptionItemViewVM.InfusionDetails != null && obj.oPrescriptionItemViewVM.InfusionDetails.FluidSelectvalue != null) {
                                            liPrescriptionItems.Add(obj.oPrescriptionItemViewVM.InfusionDetails.FluidSelectvalue.DisplayText);
                                        }
                                        else {
                                            liPrescriptionItems.Add(obj.PrescriptionItemName);
                                        }
                                        //continue;
                                    }
                                    let cnt: number;
                                    if (obj.ReqMedPresItemsList != null && obj.ReqMedPresItemsList.Count > 0) {
                                        cnt = obj.ReqMedPresItemsList.Count;
                                        for (let i: number = 0; i < cnt; i++) {
                                            if (obj.ReqMedPresItemsList[i].IsUrgencyChecked) {
                                                if ((obj.ReqMedPresItemsList[i].IsSupplyRequestExist || obj.ReqMedPresItemsList[i].IsCancelReqEnabled) || (obj.IsSupplyRequestExist || obj.IsCancelReqEnabled)) {
                                                    if (obj.oPrescriptionItemViewVM != null && obj.oPrescriptionItemViewVM.Itemsubtype == "CC_MULCMPNTITM" && obj.oPrescriptionItemViewVM.lorenzoid == "PI-001") {
                                                        liPrescriptionItems.Add(obj.PrescriptionItemName + " (" + obj.PrescriptionItemStartDTTM.ToString(CConstants.DateTimeFormat) + ")");
                                                    }
                                                    else {
                                                        liPrescriptionItems.Add(obj.PrescriptionItemName);
                                                    }
                                                    break;
                                                }
                                            }
                                            else if (obj.IsUrgencyChecked) {
                                                if (obj.ReqMedPresItemsList[i].IsSupplyRequestExist || obj.ReqMedPresItemsList[i].IsCancelReqEnabled) {
                                                    if (obj.oPrescriptionItemViewVM != null && obj.oPrescriptionItemViewVM.Itemsubtype == "CC_MULCMPNTITM" && obj.oPrescriptionItemViewVM.lorenzoid == "PI-001") {
                                                        liPrescriptionItems.Add(obj.PrescriptionItemName + " (" + obj.PrescriptionItemStartDTTM.ToString(CConstants.DateTimeFormat) + ")");
                                                    }
                                                    else {
                                                        liPrescriptionItems.Add(obj.PrescriptionItemName);
                                                    }
                                                    break;
                                                }
                                            }
                                        }
                                    }
                                }
                            });
                            if (liPrescriptionItems.Count > 0) {
                                liPrescriptionItems = liPrescriptionItems.ToList();
                            }
                        }
                     
             out1(liPrescriptionItems); 
             
            }
        private GetChildMCISubmit(out1: (MedNewlyRequestedList: ObservableCollection<MedRequestVM>) => void): void {
            let MedNewlyRequestedList: ObservableCollection<MedRequestVM>;

            MedNewlyRequestedList = new ObservableCollection<MedRequestVM>(this.MedRequestlist.Where(a => a.IsUrgencyChecked).Select(s => s));
            if (MedNewlyRequestedList != null) {
                this.MedRequestlist.forEach((obj) => {
                    let cnt: number;
                    if (obj != null && obj.ReqMedPresItemsList != null) {
                        cnt = obj.ReqMedPresItemsList.Count;
                        for (let i: number = 0; i < cnt; i++) {
                            if (obj.ReqMedPresItemsList[i].IsUrgencyChecked) {
                                let ChildVM: MedRequestVM = new MedRequestVM();
                                ChildVM.oPrescriptionItemViewVM = new PrescriptionItemViewVM();
                                ChildVM.RequestComments = obj.ReqMedPresItemsList[i].RequestComments;
                                if (obj.ReqMedPresItemsList[i].oPrescriptionItemViewVM != null) {
                                    ChildVM.oPrescriptionItemViewVM.PrescriptionItemOID = obj.ReqMedPresItemsList[i].oPrescriptionItemViewVM.PrescriptionItemOID;
                                    ChildVM.oPrescriptionItemViewVM.PresMultiCompitemOID = obj.ReqMedPresItemsList[i].oPrescriptionItemViewVM.PresMultiCompitemOID;
                                }
                                ChildVM.UrgencyLevel = new CListItem();
                                ChildVM.UrgencyLevel.Value = obj.ReqMedPresItemsList[i].UrgencyLevel.Value;
                                ChildVM.oPrescriptionItemViewVM.lorenzoid = obj.ReqMedPresItemsList[i].oPrescriptionItemViewVM.lorenzoid;
                                ChildVM.IsWardStockExist = obj.ReqMedPresItemsList[i].IsWardStockExist;
                                ChildVM.EncounterOID = obj.ReqMedPresItemsList[i].EncounterOID;
                                ChildVM.IsUrgencyChecked = obj.ReqMedPresItemsList[i].IsUrgencyChecked;
                                ChildVM.IsSupplyRequestExist = obj.ReqMedPresItemsList[i].IsSupplyRequestExist;
                                ChildVM.IsCancelReqEnabled = obj.ReqMedPresItemsList[i].IsCancelReqEnabled;
                                MedNewlyRequestedList.Add(ChildVM);
                            }
                        }
                    }
                });

                out1(MedNewlyRequestedList);

            }
        }
        public override OnFinishNow(): void {
            super.OnFinishNow();
        }
        public override OnCancel(): void {
            MedChartData.IsReqMedCAlaunched = false;
            let top:any = window.top;
            if (top.msgAlert == false && String.Equals(this.WizardContext["LaunchFrom"], CConstants.NonInfRecAdminCACode)) {
                ObjectHelper.stopFinishAndCancelEvent(true);
            }
            super.OnCancel();
        }
        public Resolve_GetRequestMedicationListCompleted(sender: Object, e: IPPMAManagePrescSer.GetRequestMedicationDetailsCompletedEventArgs): void {
            let _ErrorID: number = 80000072;
            let bIsBolus: boolean = false;
            let lastDispensed: string = String.Empty;
            let ProductOptionsCnt: number = 0;
            let ProductOptionsCntWithPRHOID: number = 0;
            let _ErrorSource: string = "LorAppMedicationAdminBBUI_P2.dll, Class:MedicationRequestVM, Method:Resolve_GetRequestMedicationListCompleted()";
            if (e.Error == null) {
                let objResList: IPPMAManagePrescSer.CResMsgGetRequestMedicationDetails = e.Result;
                let oResponse: ObservableCollection<IPPMAManagePrescSer.MedRequestDetail> = null;
                if (objResList != null && objResList.oMedRequestDetail != null) {
                    oResponse = objResList.oMedRequestDetail;
                }
                if (oResponse != null) {
                    if (oResponse.Count > 0) {
                        oResponse = new ObservableCollection<MedRequestDetail>(oResponse.OrderBy(x => x.oPrescriptionItemView.oPrescriptionItem.IdentifyingName).ThenByDescending(y => y.oPrescriptionItemView.oPrescriptionItem.StartDTTM).ToList());
                    }
                    oResponse.forEach( (oItemView)=> {
                        if (oItemView != null && oItemView.FluidPrescribableItemListOID == 0 && oItemView.PrescMultiCompOID == 0) {
                            bIsBolus = false;
                            let MedReqVM: MedRequestVM = new MedRequestVM();
                            if (oItemView.oPrescriptionItemView != null && oItemView.oPrescriptionItemView.oPrescriptionItem != null) {
                                let sDrugName: string = String.Empty;
                                if (!String.IsNullOrEmpty(oItemView.oPrescriptionItemView.oPrescriptionItem.IdentifyingName)) {
                                    sDrugName = oItemView.oPrescriptionItemView.oPrescriptionItem.IdentifyingName;
                                }
                                if (String.IsNullOrEmpty(oItemView.oPrescriptionItemView.oPrescriptionItem.VMVPIdentifyingName)) {
                                    MedReqVM.PrescriptionItemName = sDrugName;
                                }
                                else {
                                    MedReqVM.PrescriptionItemName = oItemView.oPrescriptionItemView.oPrescriptionItem.VMVPIdentifyingName + " - " + sDrugName;
                                }
                            }
                            if (oItemView.oPrescriptionItemView != null && oItemView.oPrescriptionItemView.oPresItemBasicPropertiesView != null) {
                                MedReqVM.IsinDefiniteOmit = oItemView.oPrescriptionItemView.oPresItemBasicPropertiesView.IsinDefiniteOmit;
                                if (DateTime.NotEquals(oItemView.oPrescriptionItemView.oPresItemBasicPropertiesView.IsinDefiniteOmitDTTM , DateTime.MinValue)) {
                                    MedReqVM.IsinDefiniteOmitDTTM = oItemView.oPrescriptionItemView.oPresItemBasicPropertiesView.IsinDefiniteOmitDTTM;
                                }
                                if (!String.IsNullOrEmpty(oItemView.oPrescriptionItemView.oPresItemBasicPropertiesView.OmitComments)) {
                                    MedReqVM.OmitComments = oItemView.oPrescriptionItemView.oPresItemBasicPropertiesView.OmitComments;
                                }
                                if (!String.IsNullOrEmpty(oItemView.oPrescriptionItemView.oPresItemBasicPropertiesView.OmittedBy)) {
                                    MedReqVM.OmittedBy = oItemView.oPrescriptionItemView.oPresItemBasicPropertiesView.OmittedBy;
                                }
                                if (DateTime.NotEquals(oItemView.oPrescriptionItemView.oPresItemBasicPropertiesView.FormViewParameters.ReviewAfterDTTM , DateTime.MinValue)) {
                                    MedReqVM.ReviewafterDTTM = oItemView.oPrescriptionItemView.oPresItemBasicPropertiesView.FormViewParameters.ReviewAfterDTTM;
                                }
                                if (!String.IsNullOrEmpty(oItemView.oPrescriptionItemView.oPresItemBasicPropertiesView.FormViewParameters.ReviewComments)) {
                                    MedReqVM.ReviewComments = oItemView.oPrescriptionItemView.oPresItemBasicPropertiesView.FormViewParameters.ReviewComments;
                                }
                                if (!String.IsNullOrEmpty(oItemView.oPrescriptionItemView.oPresItemBasicPropertiesView.FormViewParameters.ReviewRequestedBy)) {
                                    MedReqVM.ReviewRequestedBy = oItemView.oPrescriptionItemView.oPresItemBasicPropertiesView.FormViewParameters.ReviewRequestedBy;
                                }
                                if (!String.IsNullOrEmpty(oItemView.oPrescriptionItemView.oPresItemBasicPropertiesView.FormViewParameters.ReviewType)) {
                                    MedReqVM.ReviewType = oItemView.oPrescriptionItemView.oPresItemBasicPropertiesView.FormViewParameters.ReviewType;
                                }
                                MedReqVM.IsCriticalMed = oItemView.oPrescriptionItemView.oPresItemBasicPropertiesView.IsCriticalMed;
                                MedReqVM.oPrescriptionItemViewVM = new PrescriptionItemViewVM();
                                MedReqVM.UrgencyLevelcombo = ValueDomainValues.UrgencyDomain;
                                if (oItemView.oPrescriptionItemView.oPresItemBasicPropertiesView.FormViewParameters != null && oItemView.oPrescriptionItemView.oPresItemBasicPropertiesView.FormViewParameters.IntravenousInfusionData != null && !String.IsNullOrEmpty(oItemView.oPrescriptionItemView.oPresItemBasicPropertiesView.FormViewParameters.IntravenousInfusionData.IsBolusInfusion) && String.Equals(oItemView.oPrescriptionItemView.oPresItemBasicPropertiesView.FormViewParameters.IntravenousInfusionData.IsBolusInfusion, "1")) {
                                    bIsBolus = true;
                                }
                                let oIPPPrescriptionItem: IPPMAManagePrescSer.IPPPrescriptionItem = new IPPMAManagePrescSer.IPPPrescriptionItem();
                                oIPPPrescriptionItem = (ObjectHelper.CreateType<IPPMAManagePrescSer.IPPPrescriptionItem>(oItemView.oPrescriptionItemView.oPrescriptionItem, IPPMAManagePrescSer.IPPPrescriptionItem));
                                if (oIPPPrescriptionItem != null) {
                                    MedReqVM.IsSupplyRequestExist = (oIPPPrescriptionItem.IsSupplyRequested == '1' || oIPPPrescriptionItem.IsSupplyRequested == '2') ? true : false;
                                    MedReqVM.IsWardStockExist = oIPPPrescriptionItem.IsWardStock;
                                    MedReqVM.IsWardStockForFluidExist = oIPPPrescriptionItem.IsWardStockForFluid;
                                }
                                if (oItemView.oPrescriptionItemView.oPresItemBasicPropertiesView.MultipleRouteType == 3) {
                                    MedReqVM.PrescriptionItemType = PrescriptionItmTyp.MixedRoutes;
                                }
                                else if ((oItemView.oPrescriptionItemView.oPrescriptionItem != null && !String.IsNullOrEmpty(oItemView.oPrescriptionItemView.oPrescriptionItem.IsInfusion) && oItemView.oPrescriptionItemView.oPrescriptionItem.IsInfusion.Equals("1")) && !bIsBolus) {
                                    MedReqVM.PrescriptionItemType = PrescriptionItmTyp.Infusion;
                                }
                                else {
                                    MedReqVM.PrescriptionItemType = PrescriptionItmTyp.NonInfusion;
                                }
                                this.ReqMedFill(MedReqVM, oItemView, false);
                                MedReqVM.ReqMedPresItemsList = new ObservableCollection<MedRequestVM>();
                                if (oItemView != null && oItemView.oPrescriptionItemView != null && oItemView.oPrescriptionItemView.oPrescriptionItem != null && oItemView.oPrescriptionItemView.oPrescriptionItem.ITMSUBTYP != null && oItemView.oPrescriptionItemView.oPrescriptionItem.LorenzoID != null && (oItemView.oPrescriptionItemView.oPrescriptionItem.ITMSUBTYP.Equals(DrugItemSubTypeCode.MULTI_COMPONENT)) || (oItemView.oPrescriptionItemView.oPrescriptionItem.LorenzoID.Equals(CConstants.ADHOC_ITEM_LORENZOID))) {
                                    oResponse.Where(x => x.PrescriptionItemOID == MedReqVM.oPrescriptionItemViewVM.PrescriptionItemOID && x.PrescMultiCompOID > 0).forEach( (obj)=> {
                                        let objChildFill: MedRequestVM = new MedRequestVM();
                                        if (MedReqVM != null && MedReqVM.oPrescriptionItemViewVM != null && obj != null && obj.oPrescriptionItemView != null && obj.oPrescriptionItemView.oPrescriptionItem != null) {
                                            objChildFill.UrgencyLevelcombo = ValueDomainValues.UrgencyDomain;
                                            objChildFill.oPrescriptionItemViewVM = new PrescriptionItemViewVM();
                                            objChildFill.oPrescriptionItemViewVM.PrescriptionItemViewDetails = new IPPMAManagePrescSer.PrescriptionItemView();
                                            objChildFill.oPrescriptionItemViewVM.PrescriptionItemViewDetails.oPrescriptionItem = new IPPMAManagePrescSer.PrescriptionItem();
                                            objChildFill.oPrescriptionItemViewVM.PrescriptionItemOID = MedReqVM.oPrescriptionItemViewVM.PrescriptionItemOID;
                                            objChildFill.oPrescriptionItemViewVM.PresMultiCompitemOID = obj.PrescMultiCompOID;
                                            this.ReqMedFill(objChildFill, obj, false);
                                            objChildFill.oPrescriptionItemViewVM.PresMultiCompDisplayOrder = obj.MCIDisplayOrder;
                                            objChildFill.oPrescriptionItemViewVM.IdentifyingName = obj.oPrescriptionItemView.oPrescriptionItem.IdentifyingName;
                                            objChildFill.oPrescriptionItemViewVM.lorenzoid = obj.oPrescriptionItemView.oPrescriptionItem.LorenzoID;
                                            objChildFill.IsWardStockExist = obj.oPrescriptionItemView.oPrescriptionItem.IsWardStockForChildMCI;
                                            objChildFill.UrgencyLevel = new CListItem();
                                            objChildFill.UrgencyLevel.DisplayText = UrgencyCode.dis_Normal;
                                            objChildFill.UrgencyLevel.Value = UrgencyCode.Normal;
                                            objChildFill.UrgencyLevelToolTip = MedicationRequest.cmdChooseUrgency_Tooltip;
                                            objChildFill.PrescriptionItemType = PrescriptionItmTyp.None;
                                            objChildFill.IsSupplyRequestExist = obj.IsSupplied;
                                            objChildFill.PrescriptionItemName = MedReqVM.PrescriptionItemName;
                                            let ObjParent: MedRequestDetail = new MedRequestDetail();
                                            ObjParent = oResponse.Where(x => x.PrescriptionItemOID == MedReqVM.oPrescriptionItemViewVM.PrescriptionItemOID && x.FluidPrescribableItemListOID == 0 && x.PrescMultiCompOID == 0).FirstOrDefault();
                                            if (ObjParent != null) {
                                                MedReqVM.IsSupplyRequestExist = ObjParent.IsSupplied;
                                            }
                                            if (objResList != null && objResList.oMedDispensingDetail != null && objResList.oMedDispensingDetail.Length > 0) {
                                                lastDispensed = String.Empty;
                                                ProductOptionsCnt = 0;
                                                objChildFill.IsCancelReqEnabled = false;
                                                lastDispensed = String.Join("\r\n",
                                                    objResList.oMedDispensingDetail.Where(x => x.PrescriptionItemOID == objChildFill.oPrescriptionItemViewVM.PrescriptionItemOID && x.PrescriptionMulticomponentOID > 0 && x.PrescriptionMulticomponentOID == objChildFill.oPrescriptionItemViewVM.PresMultiCompitemOID).Select(x => x.LastDispensingText).ToArray());
                                                ProductOptionsCnt = objResList.oMedDispensingDetail.Where(x => x.PrescriptionItemOID == objChildFill.oPrescriptionItemViewVM.PrescriptionItemOID && x.PrescriptionMulticomponentOID > 0 && x.PrescriptionMulticomponentOID == objChildFill.oPrescriptionItemViewVM.PresMultiCompitemOID).Select(x => x.PrescriptionItemTechOID).Distinct().Count();
                                                objChildFill.LastDispensing = (!String.IsNullOrEmpty(lastDispensed) && ProductOptionsCnt == 1) ? lastDispensed : String.Empty;
                                                objChildFill.IsLastDispensingLink = ProductOptionsCnt > 1 ? true : false;
                                                objChildFill.IsLastDispensingLinklblVisibility = objChildFill.IsLastDispensingLink ? Visibility.Visible : Visibility.Collapsed;
                                                let IsRecdExists: boolean = objResList.oMedDispensingDetail.Where(x => x.PresRequisitionHistoryOID > 0 && objChildFill.PresReqHistoryOID > 0 && x.PresRequisitionHistoryOID == objChildFill.PresReqHistoryOID && x.PrescriptionItemOID == objChildFill.oPrescriptionItemViewVM.PrescriptionItemOID && x.PrescriptionMulticomponentOID > 0 && x.PrescriptionMulticomponentOID == objChildFill.oPrescriptionItemViewVM.PresMultiCompitemOID).All(x => String.Equals(x.DispenseStatus, CConstants.MedDispenseRequestSent, StringComparison.CurrentCultureIgnoreCase));
                                                ProductOptionsCntWithPRHOID = objResList.oMedDispensingDetail.Where(x => x.PresRequisitionHistoryOID > 0 && objChildFill.PresReqHistoryOID > 0 && x.PresRequisitionHistoryOID == objChildFill.PresReqHistoryOID && x.PrescriptionItemOID == objChildFill.oPrescriptionItemViewVM.PrescriptionItemOID && x.PrescriptionMulticomponentOID > 0 && x.PrescriptionMulticomponentOID == objChildFill.oPrescriptionItemViewVM.PresMultiCompitemOID).Select(x => x.PrescriptionItemTechOID).Distinct().Count();
                                                if (IsRecdExists && ProductOptionsCntWithPRHOID > 0)
                                                    objChildFill.IsCancelReqEnabled = true;
                                            }
                                            MedReqVM.ReqMedPresItemsList.Add(objChildFill);
                                        }
                                    });
                                }
                                if (MedReqVM != null && MedReqVM.ReqMedPresItemsList != null && MedReqVM.ReqMedPresItemsList.Count > 0) {
                                    MedReqVM.ReqMedPresItemsList = new ObservableCollection<MedRequestVM>(MedReqVM.ReqMedPresItemsList.OrderBy(x => x.oPrescriptionItemViewVM.PresMultiCompitemOID));
                                }
                            }
                            let FluidReq: MedRequestVM = new MedRequestVM();
                            if (MedReqVM != null && MedReqVM.oPrescriptionItemViewVM != null && MedReqVM.oPrescriptionItemViewVM.InfusionDetails != null && MedReqVM.oPrescriptionItemViewVM.InfusionDetails.FluidSelectvalue != null) {
                                FluidReq.UrgencyLevelcombo = ValueDomainValues.UrgencyDomain;
                                FluidReq.oPrescriptionItemViewVM = new PrescriptionItemViewVM();
                                FluidReq.oPrescriptionItemViewVM.PrescriptionItemOID = MedReqVM.oPrescriptionItemViewVM.PrescriptionItemOID;
                                FluidReq.oPrescriptionItemViewVM.lorenzoid = MedReqVM.oPrescriptionItemViewVM.lorenzoid;
                                FluidReq.UrgencyLevel = new CListItem();
                                FluidReq.UrgencyLevel.DisplayText = UrgencyCode.dis_Normal;
                                FluidReq.UrgencyLevel.Value = UrgencyCode.Normal;
                                FluidReq.UrgencyLevelToolTip = MedicationRequest.cmdChooseUrgency_Tooltip;
                                FluidReq.PrescriptionItemType = PrescriptionItmTyp.None;
                                FluidReq.oPrescriptionItemViewVM.InfusionDetails = new InfusionLineItemVM();
                                FluidReq.oPrescriptionItemViewVM.InfusionDetails.FluidSelectvalue = MedReqVM.oPrescriptionItemViewVM.InfusionDetails.FluidSelectvalue;
                                FluidReq.oPrescriptionItemViewVM.InfusionDetails.FluidSelectvalue.DisplayText = FluidReq.oPrescriptionItemViewVM.InfusionDetails.FluidSelectvalue.DisplayText + " (Fluid for infusions)";
                                FluidReq.IsWardStockExist = MedReqVM.IsWardStockForFluidExist;
                                if (MedReqVM.oPrescriptionItemViewVM.PrescriptionItemViewDetails != null && MedReqVM.oPrescriptionItemViewVM.PrescriptionItemViewDetails.oPresItemBasicPropertiesView != null) {
                                    FluidReq.oPrescriptionItemViewVM.FluidDirection = MedReqVM.oPrescriptionItemViewVM.PrescriptionItemViewDetails.oPresItemBasicPropertiesView.Direction;
                                }
                                MedReqVM.oPrescriptionItemViewVM.InfusionDetails.FluidSelectvalue = null;
                                if (!String.IsNullOrEmpty(FluidReq.oPrescriptionItemViewVM.InfusionDetails.FluidSelectvalue.Value) && oResponse.Any(x => x.PrescriptionItemOID == MedReqVM.oPrescriptionItemViewVM.PrescriptionItemOID && x.FluidPrescribableItemListOID == Convert.ToInt64(FluidReq.oPrescriptionItemViewVM.InfusionDetails.FluidSelectvalue.Value))) {
                                    let FluidMedReq: MedRequestDetail = new MedRequestDetail();
                                    FluidMedReq = oResponse.Where(x => x.PrescriptionItemOID == MedReqVM.oPrescriptionItemViewVM.PrescriptionItemOID && x.FluidPrescribableItemListOID == Convert.ToInt64(FluidReq.oPrescriptionItemViewVM.InfusionDetails.FluidSelectvalue.Value)).FirstOrDefault();
                                    this.ReqMedFill(FluidReq, FluidMedReq, true);
                                    FluidReq.IsSupplyRequestExist = FluidMedReq.IsSupplied;
                                    let ObjParent: MedRequestDetail = new MedRequestDetail();
                                    ObjParent = oResponse.Where(x => x.PrescriptionItemOID == MedReqVM.oPrescriptionItemViewVM.PrescriptionItemOID && x.FluidPrescribableItemListOID == 0 && x.PrescMultiCompOID == 0).FirstOrDefault();
                                    if (ObjParent != null) {
                                        MedReqVM.IsSupplyRequestExist = ObjParent.IsSupplied;
                                    }
                                }
                                FluidReq.PrescriptionItemOID = MedReqVM.PrescriptionItemOID;
                                FluidReq.EncounterOID = MedReqVM.EncounterOID;
                                FluidReq.MCVersionNumber = MedReqVM.MCVersionNumber;
                                FluidReq.LorenzoID = MedReqVM.LorenzoID;
                                FluidReq.PrescriptionItemName = MedReqVM.PrescriptionItemName;
                            }
                            if (objResList != null && objResList.oMedDispensingDetail != null && objResList.oMedDispensingDetail.Length > 0) {
                                lastDispensed = String.Empty;
                                ProductOptionsCnt = 0;
                                MedReqVM.IsCancelReqEnabled = false;
                                lastDispensed = String.Join("\r\n",
                                    objResList.oMedDispensingDetail.Where(x => x.PrescriptionItemOID == MedReqVM.oPrescriptionItemViewVM.PrescriptionItemOID && x.PrescriptionMulticomponentOID == 0 && x.FluidPrescribableItemListOID == 0).Select(x => x.LastDispensingText).ToArray());
                                ProductOptionsCnt = objResList.oMedDispensingDetail.Where(x => x.PrescriptionItemOID == MedReqVM.oPrescriptionItemViewVM.PrescriptionItemOID && x.PrescriptionMulticomponentOID == 0 && x.FluidPrescribableItemListOID == 0).Select(x => x.PrescriptionItemTechOID).Distinct().Count();
                                MedReqVM.LastDispensing = (!String.IsNullOrEmpty(lastDispensed) && ProductOptionsCnt == 1) ? lastDispensed : String.Empty;
                                MedReqVM.IsLastDispensingLink = ProductOptionsCnt > 1 ? true : false;
                                MedReqVM.IsLastDispensingLinklblVisibility = MedReqVM.IsLastDispensingLink ? Visibility.Visible : Visibility.Collapsed;
                                let IsRecdExists: boolean = objResList.oMedDispensingDetail.Where(x => x.PresRequisitionHistoryOID > 0 && MedReqVM.PresReqHistoryOID > 0 && x.PresRequisitionHistoryOID == MedReqVM.PresReqHistoryOID && x.PrescriptionItemOID == MedReqVM.oPrescriptionItemViewVM.PrescriptionItemOID && x.PrescriptionMulticomponentOID == 0 && x.FluidPrescribableItemListOID == 0).All(x => String.Equals(x.DispenseStatus, CConstants.MedDispenseRequestSent, StringComparison.CurrentCultureIgnoreCase));
                                ProductOptionsCntWithPRHOID = objResList.oMedDispensingDetail.Where(x => x.PresRequisitionHistoryOID > 0 && MedReqVM.PresReqHistoryOID > 0 && x.PresRequisitionHistoryOID == MedReqVM.PresReqHistoryOID && x.PrescriptionItemOID == MedReqVM.oPrescriptionItemViewVM.PrescriptionItemOID && x.PrescriptionMulticomponentOID == 0 && x.FluidPrescribableItemListOID == 0).Select(x => x.PrescriptionItemTechOID).Distinct().Count();
                                if (IsRecdExists && ProductOptionsCntWithPRHOID > 0)
                                    MedReqVM.IsCancelReqEnabled = true;
                            }
                            this.MedRequestlist.Add(MedReqVM);
                            if (FluidReq.oPrescriptionItemViewVM != null && FluidReq.oPrescriptionItemViewVM.InfusionDetails != null && FluidReq.oPrescriptionItemViewVM.InfusionDetails.FluidSelectvalue != null) {
                                let lFluidPrescribableItemListOID: number = Convert.ToInt64(FluidReq.oPrescriptionItemViewVM.InfusionDetails.FluidSelectvalue.Value);
                                if (objResList != null && objResList.oMedDispensingDetail != null && objResList.oMedDispensingDetail.Length > 0 && lFluidPrescribableItemListOID > 0) {
                                    lastDispensed = String.Empty;
                                    ProductOptionsCnt = 0;
                                    FluidReq.IsCancelReqEnabled = false;
                                    lastDispensed = String.Join("\r\n",
                                        objResList.oMedDispensingDetail.Where(x => x.PrescriptionItemOID == FluidReq.oPrescriptionItemViewVM.PrescriptionItemOID && x.FluidPrescribableItemListOID > 0 && x.FluidPrescribableItemListOID == lFluidPrescribableItemListOID).Select(x => x.LastDispensingText).ToArray());
                                    ProductOptionsCnt = objResList.oMedDispensingDetail.Where(x => x.PrescriptionItemOID == FluidReq.oPrescriptionItemViewVM.PrescriptionItemOID && x.FluidPrescribableItemListOID > 0 && x.FluidPrescribableItemListOID == lFluidPrescribableItemListOID).Select(x => x.PrescriptionItemTechOID).Distinct().Count();
                                    FluidReq.LastDispensing = (!String.IsNullOrEmpty(lastDispensed) && ProductOptionsCnt == 1) ? lastDispensed : String.Empty;
                                    FluidReq.IsLastDispensingLink = ProductOptionsCnt > 1 ? true : false;
                                    FluidReq.IsLastDispensingLinklblVisibility = FluidReq.IsLastDispensingLink ? Visibility.Visible : Visibility.Collapsed;
                                    let IsRecdExists: boolean = objResList.oMedDispensingDetail.Where(x => x.PresRequisitionHistoryOID > 0 && FluidReq.PresReqHistoryOID > 0 && x.PresRequisitionHistoryOID == FluidReq.PresReqHistoryOID && x.PrescriptionItemOID == FluidReq.oPrescriptionItemViewVM.PrescriptionItemOID && x.FluidPrescribableItemListOID > 0 && x.FluidPrescribableItemListOID == lFluidPrescribableItemListOID).All(x => String.Equals(x.DispenseStatus, CConstants.MedDispenseRequestSent, StringComparison.CurrentCultureIgnoreCase));
                                    ProductOptionsCntWithPRHOID = objResList.oMedDispensingDetail.Where(x => x.PresRequisitionHistoryOID > 0 && FluidReq.PresReqHistoryOID > 0 && x.PresRequisitionHistoryOID == FluidReq.PresReqHistoryOID && x.PrescriptionItemOID == FluidReq.oPrescriptionItemViewVM.PrescriptionItemOID && x.FluidPrescribableItemListOID > 0 && x.FluidPrescribableItemListOID == lFluidPrescribableItemListOID).Select(x => x.PrescriptionItemTechOID).Distinct().Count();
                                    if (IsRecdExists && ProductOptionsCntWithPRHOID > 0)
                                        FluidReq.IsCancelReqEnabled = true;
                                }
                                this.MedRequestlist.Add(FluidReq);
                            }
                        }
                    });

                    if (this.MedRequestlist.Count > 0) {
                        this.MedRequestlistAddCompleted();
                    }
                }
                let MCIList: ObservableCollection<MedRequestVM> = new ObservableCollection<MedRequestVM>();
                let AdhocList: ObservableCollection<MedRequestVM> = new ObservableCollection<MedRequestVM>();
                let AdhocListGR5: ObservableCollection<MedRequestVM> = new ObservableCollection<MedRequestVM>();
                let AdhocListLess5: ObservableCollection<MedRequestVM> = new ObservableCollection<MedRequestVM>();
                if (this.MedRequestlist != null && this.MedRequestlist.Count > 0) {
                    MCIList = new ObservableCollection<MedRequestVM>(this.MedRequestlist.Where(x => x.oPrescriptionItemViewVM.Itemsubtype == "CC_MULCMPNTITM" && x.oPrescriptionItemViewVM.lorenzoid != "PI-001"));
                    AdhocList = new ObservableCollection<MedRequestVM>(this.MedRequestlist.Where(x => x.oPrescriptionItemViewVM.Itemsubtype == "CC_MULCMPNTITM" && x.oPrescriptionItemViewVM.lorenzoid == "PI-001"));
                    if (MCIList != null && MCIList.Count > 0) {
                        MCIList = new ObservableCollection<MedRequestVM>(MCIList.OrderBy(x => x.oPrescriptionItemViewVM.PrescriptionItemViewDetails.oPrescriptionItem.IdentifyingName).ThenByDescending(y => y.oPrescriptionItemViewVM.PrescriptionStartDTTM).ToList());
                        this.MedRequestlist.Where(x => x.oPrescriptionItemViewVM.Itemsubtype == "CC_MULCMPNTITM" && x.oPrescriptionItemViewVM.lorenzoid != "PI-001").ToList().forEach(i => this.MedRequestlist.Remove(i));
                        // MCIList.ToList().ForEach(this.MedRequestlist.Add);
                        MCIList.ToList().ForEach(x => this.MedRequestlist.Add(x));
                    }
                    if (AdhocList != null && AdhocList.Count > 0) {
                        AdhocList.forEach( (item)=> {
                            if (item.ReqMedPresItemsList != null) {
                                if (item.ReqMedPresItemsList.Count > 5) {
                                    AdhocListGR5.Add(item);
                                }
                                else {
                                    AdhocListLess5.Add(item);
                                }
                            }
                        });
                        this.MedRequestlist.Where(x => x.oPrescriptionItemViewVM.Itemsubtype == "CC_MULCMPNTITM" && x.oPrescriptionItemViewVM.lorenzoid == "PI-001").ToList().forEach(i => this.MedRequestlist.Remove(i));
                        if (AdhocListGR5 != null && AdhocListGR5.Count > 0) {
                            AdhocListGR5 = new ObservableCollection<MedRequestVM>(AdhocListGR5.OrderByDescending(y => y.oPrescriptionItemViewVM.PrescriptionStartDTTM));
                            // AdhocListGR5.ToList().ForEach(this.MedRequestlist.Add);
                            AdhocListGR5.ToList().ForEach(c => this.MedRequestlist.Add(c));
                        }
                        if (AdhocListLess5 != null && AdhocListLess5.Count > 0) {
                            AdhocListLess5 = new ObservableCollection<MedRequestVM>(AdhocListLess5.OrderByDescending(y => y.oPrescriptionItemViewVM.PrescriptionStartDTTM));
                            // AdhocListLess5.ToList().ForEach(this.MedRequestlist.Add);
                            AdhocListLess5.ToList().ForEach(c => this.MedRequestlist.Add(c));
                        }
                        if ((AdhocListGR5.Count <= 0 && AdhocListLess5.Count <= 0) || (AdhocListGR5 == null && AdhocListGR5 == null)) {
                            // AdhocList.ToList().ForEach(this.MedRequestlist.Add);
                            AdhocList.ToList().ForEach(c => this.MedRequestlist.Add(c));
                        }
                    }
                    if (MCIList.Count > 0 || AdhocList.Count > 0) {
                        let TotalCount: number = this.MedRequestlist.Count;
                        this.MedRequestlist[TotalCount - 1].IsLastReqMedMCI = true;
                    }
                }
            }
            else {
                let lnReturn: number =  AMSHelper.PublicExceptionDetails(_ErrorID, _ErrorSource, e.Error);
            }
            this.GetRequestMedicationDetailsCompleted.emit(true);
            Busyindicator.SetStatusIdle("RequestMedication");
        }
        private ReqMedFill(MedReqVM: MedRequestVM, oItemView: MedRequestDetail, IsFluid: boolean): void {
            MedReqVM.LastRequestdBy = !String.IsNullOrEmpty(oItemView.LastRequestedBy) ? oItemView.LastRequestedBy : String.Empty;
            MedReqVM.LastRequestdDTTM = DateTime.NotEquals(oItemView.LastRequestedDateTime, DateTime.MinValue) ? oItemView.LastRequestedDateTime.ToString(CConstants.DateTimeFormat) : String.Empty;
            MedReqVM.LastReqLongDTTM = DateTime.NotEquals(oItemView.LastRequestedDateTime, DateTime.MinValue) ? oItemView.LastRequestedDateTime : DateTime.MinValue;
            MedReqVM.LasttechnicallyValidatedBy = !String.IsNullOrEmpty(oItemView.LastTechValBy) ? oItemView.LastTechValBy : String.Empty;
            MedReqVM.LasttechnicallyValidatedDTTM = DateTime.NotEquals(oItemView.LastTechValDateTime, DateTime.MinValue) ? oItemView.LastTechValDateTime.ToString(CConstants.DateTimeFormat) : String.Empty;
            MedReqVM.UrgencyLevel = new CListItem();
            MedReqVM.UrgencyLevel.DisplayText = UrgencyCode.dis_Normal;
            MedReqVM.UrgencyLevel.Value = UrgencyCode.Normal;
            MedReqVM.UrgencyLevelToolTip = MedicationRequest.cmdChooseUrgency_Tooltip;
            MedReqVM.RequestComments = String.Empty;
            MedReqVM.SupplyStatus = !String.IsNullOrEmpty(oItemView.SupplyStutus) ? CommonBB.GetText(oItemView.SupplyStutus, ValueDomainValues.oMedSupplyStatus) : String.Empty;
            MedReqVM.LastDispensing = String.Empty;
            MedReqVM.IsLastDispensingLink = false;
            MedReqVM.IsLastDispensingLinklblVisibility = Visibility.Collapsed;
            MedReqVM.IsCancelReqEnabled = false;
            MedReqVM.MCVersionNumber = oItemView.MCVersionNumber;
            MedReqVM.LorenzoID = oItemView.LorenzoID;
            MedReqVM.PrescriptionItemOID = oItemView.PrescriptionItemOID;
            MedReqVM.EncounterOID = oItemView.EncounterOID;
            MedReqVM.PresReqHistoryOID = oItemView.PresReqHistoryOID;
            MedReqVM.EncounterType = oItemView.EncounterType;
            MedReqVM.PrescriptionItemStartDTTM = oItemView.PrescriptionItemStartDTTM;
            let ssupplyinstruction: StringBuilder = new StringBuilder();
            if (!String.IsNullOrEmpty(oItemView.SupplyInstructions)) {
                let _arrSupplyInstruction: string[] = oItemView.SupplyInstructions.Split(';');
                let nSeparatorCount: number = _arrSupplyInstruction.length;
                if (nSeparatorCount > 0) {
                    let _sbSupplyInstructionsText: StringBuilder = new StringBuilder();
                    for (let _i: number = 0; _i < nSeparatorCount; _i++) {
                        _sbSupplyInstructionsText.Append(CommonBB.GetText(_arrSupplyInstruction[_i], ValueDomainValues.oMedSupp));
                        if (_i < nSeparatorCount - 1) {
                            _sbSupplyInstructionsText.Append(";");
                        }
                    }
                    ssupplyinstruction.Append(_sbSupplyInstructionsText.ToString());
                }
                MedReqVM.SupplyInstruction = ssupplyinstruction.ToString();
            }
            MedReqVM.SupplyComments = !String.IsNullOrEmpty(oItemView.SupplyComments) ? oItemView.SupplyComments : String.Empty;
            if (!IsFluid && (MedReqVM.oPrescriptionItemViewVM.PresMultiCompitemOID == 0)) {
                MedReqVM.oPrescriptionItemViewVM.FillPrescriptionItemVM(oItemView.oPrescriptionItemView);
            }
            MedReqVM.EncounterOID = oItemView.EncounterOID;
        }
        iMsgBoxServicePoint_MessageBoxClose(sender: Object, e: MessageEventArgs): void {
            let MedNewlyRequestedList: ObservableCollection<MedRequestVM> = new ObservableCollection<MedRequestVM>();
            if (e.MessageBoxResult == MessageBoxResult.Yes) {
                this.GetChildMCISubmit((o) => { MedNewlyRequestedList = o; });
            }
            else if (e.MessageBoxResult == MessageBoxResult.No) {
                this.GetChildMCISubmit((o) => { MedNewlyRequestedList = o; });
                MedNewlyRequestedList = new ObservableCollection<MedRequestVM>(MedNewlyRequestedList.Where(a => a.IsUrgencyChecked && !a.IsSupplyRequestExist && !a.IsCancelReqEnabled));
                this.MedRequestlist.Where(x => x.ReqMedPresItemsList != null).forEach( (item)=> {
                    if (item.ReqMedPresItemsList.Count > 0 && (item.IsUrgencyChecked && !item.IsSupplyRequestExist && !item.IsCancelReqEnabled) || (item.ReqMedPresItemsList.Any(y => !y.IsSupplyRequestExist && !y.IsCancelReqEnabled && y.IsUrgencyChecked))) {
                        MedNewlyRequestedList = new ObservableCollection<MedRequestVM>(MedNewlyRequestedList.Where(x => x.oPrescriptionItemViewVM.PrescriptionItemOID != item.oPrescriptionItemViewVM.PrescriptionItemOID));
                    }
                });
            }
            else if (e.MessageBoxResult == MessageBoxResult.Cancel) {
                this.ExistingMessage = false;
                return
            }
            if (MedNewlyRequestedList.Count > 0 || (this.oCancelledPresReqHistoryDetails != null && this.oCancelledPresReqHistoryDetails.length > 0)) {
                this.SubmitMedicationRequest(MedNewlyRequestedList);
            }
            else {
                // super.OnFinish();
                super.OnCloseCA();
            }
            this.ExistingMessage = false;
        }
        public SubmitMedicationRequest(MedNewlyRequestedList: ObservableCollection<MedRequestVM>): void {
            let objService: MedicationAdministrationWSSoapClient = new MedicationAdministrationWSSoapClient();
            let objReq: CReqMsgSubmitMedRequests = new CReqMsgSubmitMedRequests();
            objReq.oContextInformation = CommonBB.FillContext();
            objReq.oContextInformation.UserID = !String.IsNullOrEmpty(super.AppContext.UserOID) ? Convert.ToInt64(super.AppContext.UserOID) : 0;
            objReq.nPatientOIDBC = ChartContext.PatientOID;
            objReq.nEncounterOIDBC = PatientContext.EncounterOid;
            objReq.sPresTypeBC = PrescriptionTypes.Inpatient;
            let JobRoleOID: int64 = 0;
            Int64.TryParse(AppContextInfo.JobRoleOID, (o) => {
                JobRoleOID = o;
              });
            if (this.oCancelledPresReqHistoryDetails != null && this.oCancelledPresReqHistoryDetails.length > 0) {
                objReq.oCancelledPresReqHistoryDetailsBC = new ObservableCollection<CancelledPresReqHistoryDetails>(this.oCancelledPresReqHistoryDetails);
            }
            objReq.nJobRoleOIDBC = JobRoleOID;
            objReq.oRequisitionHistoryDetailsBC = new ObservableCollection<RequisitionHistoryDetails>();
            let objRequisitionHistoryDetails1: RequisitionHistoryDetails;
            if (MedNewlyRequestedList != null && MedNewlyRequestedList.Count > 0) {
                MedNewlyRequestedList.forEach( (MedRequestVM)=> {
                    objRequisitionHistoryDetails1 = new RequisitionHistoryDetails();
                    objRequisitionHistoryDetails1.Comments = MedRequestVM.RequestComments;
                    if (MedRequestVM.oPrescriptionItemViewVM != null) {
                        objRequisitionHistoryDetails1.PresItemOID = MedRequestVM.oPrescriptionItemViewVM.PrescriptionItemOID;
                        objRequisitionHistoryDetails1.PrescriptionMultiComponentOID = MedRequestVM.oPrescriptionItemViewVM.PresMultiCompitemOID;
                    }
                    objRequisitionHistoryDetails1.RoleOID = JobRoleOID;
                    objRequisitionHistoryDetails1.ServiceOID = MedChartData.ServiceOID;
                    objRequisitionHistoryDetails1.LocationOID = MedChartData.LocationOID;
                    objRequisitionHistoryDetails1.URGNCCode = MedRequestVM.UrgencyLevel.Value;
                    objRequisitionHistoryDetails1.LorenzoID = MedRequestVM.oPrescriptionItemViewVM.lorenzoid;
                    objRequisitionHistoryDetails1.LocationName = MedRequestVM.IsWardStockExist ? "1" : "0";
                    objRequisitionHistoryDetails1.ServicePointName = CConstants.MedChart;
                    objRequisitionHistoryDetails1.LocationName = "0";
                    objRequisitionHistoryDetails1.EncounterOID = MedRequestVM.EncounterOID;
                    if (MedRequestVM.oPrescriptionItemViewVM != null && MedRequestVM.oPrescriptionItemViewVM.InfusionDetails != null && MedRequestVM.oPrescriptionItemViewVM.InfusionDetails.FluidSelectvalue != null && !String.IsNullOrEmpty(MedRequestVM.oPrescriptionItemViewVM.InfusionDetails.FluidSelectvalue.Value)) {
                        objRequisitionHistoryDetails1.FluidPrescribableItemListOID = Convert.ToInt64(MedRequestVM.oPrescriptionItemViewVM.InfusionDetails.FluidSelectvalue.Value);
                    }
                    objReq.oRequisitionHistoryDetailsBC.Add(objRequisitionHistoryDetails1);
                });
            }
            objService.SubmitMedRequestsCompleted  = (s,e) => { this.objService_SubmitMedRequestCompleted(s,e); } ;
            objService.SubmitMedRequestsAsync(objReq);
        }
        private GetCancelledPresReqHistory(): CancelledPresReqHistoryDetails[] {
            let lstCancelledPresReqHistoryDetails: List<CancelledPresReqHistoryDetails> = new List<CancelledPresReqHistoryDetails>();
            if (this.MedRequestlist != null) {
                this.MedRequestlist.forEach( (obj)=> {
                    if (obj != null) {
                        if (obj.IsCancelReqChecked && obj.PresReqHistoryOID != 0) {
                            let oCancelledPresReqHistoryDetails: CancelledPresReqHistoryDetails = new CancelledPresReqHistoryDetails();
                            oCancelledPresReqHistoryDetails.PresRequisitionHistoryOID = obj.PresReqHistoryOID;
                            oCancelledPresReqHistoryDetails.PrescriptionItemOID = obj.PrescriptionItemOID;
                            if (obj.oPrescriptionItemViewVM != null && obj.oPrescriptionItemViewVM.InfusionDetails != null && obj.oPrescriptionItemViewVM.InfusionDetails.FluidSelectvalue != null && !String.IsNullOrEmpty(obj.oPrescriptionItemViewVM.InfusionDetails.FluidSelectvalue.Value)) {
                                oCancelledPresReqHistoryDetails.FluidPrescribableItemListOID = Convert.ToInt64(obj.oPrescriptionItemViewVM.InfusionDetails.FluidSelectvalue.Value);
                            }
                            oCancelledPresReqHistoryDetails.EncounterOID = obj.EncounterOID;
                            oCancelledPresReqHistoryDetails.EncounterType = obj.EncounterType;
                            oCancelledPresReqHistoryDetails.IsMessageTrigger = obj.IsCancelReqEnabled;
                            lstCancelledPresReqHistoryDetails.Add(oCancelledPresReqHistoryDetails);
                        }
                        let cnt: number;
                        if (obj.ReqMedPresItemsList != null && obj.ReqMedPresItemsList.Count > 0) {
                            cnt = obj.ReqMedPresItemsList.Count;
                            for (let i: number = 0; i < cnt; i++) {
                                if (obj.ReqMedPresItemsList[i].IsCancelReqChecked && obj.ReqMedPresItemsList[i].PresReqHistoryOID > 0 && obj.ReqMedPresItemsList[i].oPrescriptionItemViewVM != null) {
                                    let oCancelledPresReqHistoryDetails: CancelledPresReqHistoryDetails = new CancelledPresReqHistoryDetails();
                                    oCancelledPresReqHistoryDetails.PresRequisitionHistoryOID = obj.ReqMedPresItemsList[i].PresReqHistoryOID;
                                    oCancelledPresReqHistoryDetails.PrescriptionItemOID = obj.ReqMedPresItemsList[i].PrescriptionItemOID;
                                    oCancelledPresReqHistoryDetails.PrescriptionMultiComponentOID = obj.ReqMedPresItemsList[i].oPrescriptionItemViewVM.PresMultiCompitemOID;
                                    oCancelledPresReqHistoryDetails.EncounterOID = obj.ReqMedPresItemsList[i].EncounterOID;
                                    oCancelledPresReqHistoryDetails.EncounterType = obj.ReqMedPresItemsList[i].EncounterType;
                                    oCancelledPresReqHistoryDetails.IsMessageTrigger = obj.ReqMedPresItemsList[i].IsCancelReqEnabled;
                                    lstCancelledPresReqHistoryDetails.Add(oCancelledPresReqHistoryDetails);
                                }
                            }
                        }
                    }
                });
                if (lstCancelledPresReqHistoryDetails != null && lstCancelledPresReqHistoryDetails.Count > 0)
                    return lstCancelledPresReqHistoryDetails.ToArray();
            }
            return null;
        }
        objService_SubmitMedRequestCompleted(sender: Object, e: SubmitMedRequestsCompletedEventArgs): void {
            {
                super.OnFinish();
            }
        }
        public GetProfileConfigData(): void {
            let oProfileFactory: ProfileFactoryType = new ProfileFactoryType();
            let lstProfileReq: List<ProfileContext> = new List<ProfileContext>();
            let objReq: ProfileContext = new ProfileContext();
            objReq.ContextCode = "VW_MEDICONFIG";
            objReq.ProfileItemKey = "MEDLINEDISPLAY";
            objReq.ProfileLevel = ProfileFactoryType.Level.Organisation;
            objReq.ProfileType = typeof(CMedicationLineDisplayData);
            lstProfileReq.Add(objReq);
            objReq = new ProfileContext();
            objReq.ContextCode = "VW_MEDICONFIG";
            objReq.ProfileItemKey = "ADDPRESCRIBINGCONFIG";
            objReq.ProfileType = typeof(AddPrescribingConfigData);
            objReq.ProfileLevel = ProfileFactoryType.Level.Organisation;
            lstProfileReq.Add(objReq);
            objReq = new ProfileContext();
            objReq.ContextCode = "MA_ADMINSETTING";
            objReq.ProfileItemKey = "MACLINICALINCFRMCFG";
            objReq.ProfileLevel = ProfileFactoryType.Level.Organisation;
            objReq.ProfileType = typeof(CClinicalIncidentConfig);
            lstProfileReq.Add(objReq);
            objReq = new ProfileContext();
            objReq.ContextCode = "MA_ADMINSETTING";
            objReq.ProfileItemKey = "MASLOTCHARCONFIG";
            objReq.ProfileLevel = ProfileFactoryType.Level.Organisation;
            objReq.ProfileType = typeof(CSlotCharacteristicsConfig);
            lstProfileReq.Add(objReq);
            objReq = new ProfileContext();
            objReq.ContextCode = "MA_ADMINSETTING";
            objReq.ProfileItemKey = "MACHARTDISPLAYCONFIG";
            objReq.ProfileLevel = ProfileFactoryType.Level.Organisation;
            objReq.ProfileType = typeof(CChartDisplayConfig);
            lstProfileReq.Add(objReq);
            objReq = new ProfileContext();
            objReq.ContextCode = "VW_MEDICONFIG";
            objReq.ProfileItemKey = "MEDVIEWCONFIG";
            objReq.ProfileLevel = ProfileFactoryType.Level.Organisation;
            objReq.ProfileType = typeof(MedicationViewConfigData);
            lstProfileReq.Add(objReq);
            objReq = new ProfileContext();
            objReq.ContextCode = "MA_ADMINSETTING";
            objReq.ProfileItemKey = "MACHARTSETTINGS";
            objReq.ProfileLevel = ProfileFactoryType.Level.Organisation;
            objReq.ProfileType = typeof(CChartSettingsConfig);
            lstProfileReq.Add(objReq);
            objReq = new ProfileContext();
            objReq.ContextCode = "VW_MEDICONFIG";
            objReq.ProfileItemKey = "INFUSIONPRESCONFIG";
            objReq.ProfileLevel = ProfileFactoryType.Level.User;
            objReq.ProfileType = typeof(InfusionPresConfigData);
            lstProfileReq.Add(objReq);
            oProfileFactory.OnProfileListLoaded  = (s,e) => { this.oProfileFactory_OnProfileListLoaded(s,e); } ;
            oProfileFactory.GetProfilesData(lstProfileReq);
        }
        oProfileFactory_OnProfileListLoaded(sender: Object, Result: List<ProfileContext>): void {
            if (Result != null) {
                Result.forEach( (oProfileContext)=> {
                    if (oProfileContext.ContextCode == "VW_MEDICONFIG" && oProfileContext.ProfileItemKey == "MEDLINEDISPLAY") {
                        if (oProfileContext.ProfileData instanceof CMedicationLineDisplayData) {
                            MedicationCommonProfileData.MedLineDisplay = ObjectHelper.CreateType<CMedicationLineDisplayData>(oProfileContext.ProfileData, CMedicationLineDisplayData);
                        }
                    }
                    else if (oProfileContext.ContextCode == "MA_ADMINSETTING" && oProfileContext.ProfileItemKey == "MACLINICALINCFRMCFG") {
                        if (oProfileContext.ProfileData instanceof CClinicalIncidentConfig) {
                            ProfileData.ClinicalIncidentConfig = ObjectHelper.CreateType<CClinicalIncidentConfig>(oProfileContext.ProfileData, CClinicalIncidentConfig);
                        }
                    }
                    else if (oProfileContext.ContextCode == "MA_ADMINSETTING" && oProfileContext.ProfileItemKey == "MASLOTCHARCONFIG") {
                        if (oProfileContext.ProfileData instanceof CSlotCharacteristicsConfig) {
                            ProfileData.SlotCharacteristicsConfig = ObjectHelper.CreateType<CSlotCharacteristicsConfig>(oProfileContext.ProfileData, CSlotCharacteristicsConfig);
                            if (ProfileData.SlotCharacteristicsConfig != null) {
                                if (ProfileData.SlotCharacteristicsConfig.AdvDurationForRecording > 0) {
                                    MedChartData.AdvDurationForRecording = CommonBB.ConvertHourstoMinutes(ProfileData.SlotCharacteristicsConfig.AdvDurationForRecording);
                                }
                                if (ProfileData.SlotCharacteristicsConfig.DuenessThreshold > 0) {
                                    MedChartData.DuenessThreshold = CommonBB.ConvertHourstoMinutes(ProfileData.SlotCharacteristicsConfig.DuenessThreshold);
                                }
                                if (ProfileData.SlotCharacteristicsConfig.SlotModificationTime > 0) {
                                    MedChartData.SlotModificationTime = CommonBB.ConvertDaystoMinutes(ProfileData.SlotCharacteristicsConfig.SlotModificationTime);
                                }
                            }
                        }
                    }
                    else if (oProfileContext.ContextCode == "MA_ADMINSETTING" && oProfileContext.ProfileItemKey == "MACHARTDISPLAYCONFIG") {
                        if (oProfileContext.ProfileData instanceof CChartDisplayConfig) {
                            ProfileData.ChartDisplayConfig = ObjectHelper.CreateType<CChartDisplayConfig>(oProfileContext.ProfileData, CChartDisplayConfig);
                        }
                        if (ProfileData.ChartDisplayConfig != null) {
                            if (!String.IsNullOrEmpty(ProfileData.ChartDisplayConfig.AsRequiredSlotsColor)) {
                                MedChartData.AsRequiredSlotsColor = CommonBB.ToColor(ProfileData.ChartDisplayConfig.AsRequiredSlotsColor);
                            }
                            if (!String.IsNullOrEmpty(ProfileData.ChartDisplayConfig.DueSlotsColor)) {
                                MedChartData.DueSlotsColor = CommonBB.ToColor(ProfileData.ChartDisplayConfig.DueSlotsColor);
                            }
                            if (!String.IsNullOrEmpty(ProfileData.ChartDisplayConfig.OmittedSlotsColor)) {
                                MedChartData.OmittedSlotsColor = CommonBB.ToColor(ProfileData.ChartDisplayConfig.OmittedSlotsColor);
                            }
                            if (!String.IsNullOrEmpty(ProfileData.ChartDisplayConfig.OverDueSlotsColor)) {
                                MedChartData.OverDueSlotsColor = CommonBB.ToColor(ProfileData.ChartDisplayConfig.OverDueSlotsColor);
                            }
                            if (!String.IsNullOrEmpty(ProfileData.ChartDisplayConfig.TodayOutlineColor)) {
                                MedChartData.TodayOutlineColor = CommonBB.ToColor(ProfileData.ChartDisplayConfig.TodayOutlineColor);
                            }
                        }
                    }
                    else if (oProfileContext.ContextCode == "VW_MEDICONFIG" && oProfileContext.ProfileItemKey == "MEDVIEWCONFIG") {
                        if (oProfileContext.ProfileData instanceof MedicationViewConfigData) {
                            MedicationCommonProfileData.MedViewConfig = ObjectHelper.CreateType<MedicationViewConfigData>(oProfileContext.ProfileData, MedicationViewConfigData);
                        }
                    }
                    else if (oProfileContext.ContextCode == "MA_ADMINSETTING" && oProfileContext.ProfileItemKey == "MACHARTSETTINGS") {
                        if (oProfileContext.ProfileData instanceof CChartSettingsConfig) {
                            ProfileData.ChartSettingsConfig = ObjectHelper.CreateType<CChartSettingsConfig>(oProfileContext.ProfileData, CChartSettingsConfig);
                            if (ProfileData.ChartSettingsConfig != null && (ProfileData.ChartSettingsConfig.IvAdminAlertAfter > 0)) {
                                MedChartData.AdminIVAlertInHrs = (ProfileData.ChartSettingsConfig.IvAdminAlertAfter);
                            }
                            MedChartData.bAllowStockRequestByNurse = ProfileData.ChartSettingsConfig != null && ProfileData.ChartSettingsConfig.IsAllowSupplyReq;
                            MedChartData.AllowAnyUserForAdministration = ProfileData.ChartSettingsConfig == null || String.IsNullOrEmpty(ProfileData.ChartSettingsConfig.AllowAnyUserForAdministration) || ProfileData.ChartSettingsConfig.AllowAnyUserForAdministration.Equals("1", StringComparison.OrdinalIgnoreCase);
                        }
                        else MedChartData.AllowAnyUserForAdministration = true;
                    }
                    else if (String.Compare(oProfileContext.ContextCode, "VW_MEDICONFIG") == 0 && String.Compare(oProfileContext.ProfileItemKey, "INFUSIONPRESCONFIG") == 0) {
                        if (oProfileContext.ProfileData instanceof InfusionPresConfigData) {
                            ProfileData.InfusionPresConfig = ObjectHelper.CreateType<InfusionPresConfigData>(oProfileContext.ProfileData, InfusionPresConfigData);
                        }
                    }
                    else if (String.Compare(oProfileContext.ContextCode, "VW_MEDICONFIG") == 0 && String.Compare(oProfileContext.ProfileItemKey, "ADDPRESCRIBINGCONFIG") == 0) {
                        if (oProfileContext.ProfileData instanceof AddPrescribingConfigData) {
                            MedicationCommonProfileData.AddPrescribingConfig = ObjectHelper.CreateType<AddPrescribingConfigData>(oProfileContext.ProfileData, AddPrescribingConfigData);
                        }
                    }
                });
            }
            let ViewDomainCodes: string = String.Empty;
            ViewDomainCodes = ValueDomain.PrescriptionItemStatus + "," + ValueDomain.INFUSIONTYPE + "," + ValueDomain.MedSupp + "," + ValueDomain.MedSupplyStatus + "," + ValueDomain.DoseType + "," + ValueDomain.Humidification + "," + ValueDomain.MedTreatCont;
            ProcessRTE.GetValuesByDomainCodes(ViewDomainCodes, (s, e) => { this.OnRTEViewResult(s); });
            if (this.MedReqProfileCompleted != null)
                this.MedReqProfileCompleted();
        }
    }
    export class MedRequestVM extends ViewModelBase {
        private _isWardStockExist: boolean;
        private _isWardStockforFluidExist: boolean;
        private _isSupplyRequestExist: boolean;
        private _prescriptionitemtype: PrescriptionItmTyp;
        private _isUrgencyChecked: boolean = false;
        private _UrgencyLevel: CListItem;
        private _UrgencyLevelcombo: ObservableCollection<CListItem>;
        public oPrescriptionItemViewVM: PrescriptionItemViewVM;
        private _RequestComments: string;
        private _lastRequestdBy: string = String.Empty;
        private _lastRequestdDTTM: string = String.Empty;
        private _lasttechnicallyValidatedBy: string = String.Empty;
        private __lasttechnicallyValidatedDTTM: string = String.Empty;
        private _supplyStatus: string;
        private _SupplyInstruction: string;
        private _SupplyComments: string;
        private _UrgencyLevelToolTip: string;
        private _RequestCommentsToolTip: string;
        private _IsinDefiniteOmit: boolean;
        private _IsinDefiniteOmitDTTM: DateTime;
        private _OmitComments: string;
        private _OmittedBy: string;
        public _ReviewComments: string;
        public _ReviewRequestedBy: string;
        public _ReviewType: string;
        public _ReviewafterDTTM: DateTime;
        private _EncounterOID: number;
        ChildGridExtension = new GridExtension();
        SelectedChildGridIndex: number[] = [];
        PropertyChanged: (s: any, e: any) => void;  
        
        public get IsWardStockExist(): boolean {
            return this._isWardStockExist;
        }
        public set IsWardStockExist(value: boolean) {
            this._isWardStockExist = value;
        }
        public get IsWardStockForFluidExist(): boolean {
            return this._isWardStockforFluidExist;
        }
        public set IsWardStockForFluidExist(value: boolean) {
            this._isWardStockforFluidExist = value;
        }
        public get IsSupplyRequestExist(): boolean {
            return this._isSupplyRequestExist;
        }
        public set IsSupplyRequestExist(value: boolean) {
            this._isSupplyRequestExist = value;
        }
        public get PrescriptionItemType(): PrescriptionItmTyp {
            return this._prescriptionitemtype;
        }
        public set PrescriptionItemType(value: PrescriptionItmTyp) {
            this._prescriptionitemtype = value;
        }
        public get IsUrgencyChecked(): boolean {
            return this._isUrgencyChecked;
        }
        public set IsUrgencyChecked(value: boolean) {
            this._isUrgencyChecked = value;
            if (!this._isUrgencyChecked) {
                this.UrgencyLevel = new CListItem();
                this.UrgencyLevel.DisplayText = UrgencyCode.dis_Normal;
                this.RequestComments = String.Empty;
            }
            this.UrgencyLevelToolTip = MedicationRequest.cmdChooseUrgency_Tooltip;
             this.NotifyPropertyChanged("IsUrgencyChecked");
        }

        private NotifyPropertyChanged(prop: string) {
            let e: PropertyChangedEventArgs = { PropertyName: prop };
            if (this.PropertyChanged)
                this.PropertyChanged(this, e);
        }
        
        private _IsLastReqMedMCI: boolean;
        public get IsLastReqMedMCI(): boolean {
            return this._IsLastReqMedMCI;
        }
        public set IsLastReqMedMCI(value: boolean) {
            this._IsLastReqMedMCI = value;
        }
        public get UrgencyLevel(): CListItem {
            return this._UrgencyLevel;
        }
        public set UrgencyLevel(value: CListItem) {
            if (value != null) {
                this._UrgencyLevel = value;
                if (!String.IsNullOrEmpty(value.DisplayText)) {
                    this.IsUrgencyChecked = true;
                    if (value.DisplayText == UrgencyCode.dis_Normal) {
                        this.UrgencyLevelToolTip = MedicationRequest.cmdChooseUrgency_Tooltip;
                    }
                    else {
                        this.UrgencyLevelToolTip = value.DisplayText;
                    }
                }
            }
            // NotifyPropertyChanged("UrgencyLevel");
        }
        public get UrgencyLevelcombo(): ObservableCollection<CListItem> {
            return this._UrgencyLevelcombo;
        }
        public set UrgencyLevelcombo(value: ObservableCollection<CListItem>) {
            if (this._UrgencyLevelcombo != value) {
                this._UrgencyLevelcombo = value;
            }
        }
        public get RequestComments(): string {
            return this._RequestComments;
        }
        public set RequestComments(value: string) {
            this._RequestComments = value;
            this.RequestCommentsToolTip = value;
            if (!String.IsNullOrEmpty(this._RequestComments) && this._RequestComments.length > 0) {
                this.IsUrgencyChecked = true;
            }
            else if (String.IsNullOrEmpty(this._RequestComments)) {
                this.RequestCommentsToolTip = CConstants.RequestcommentsTooltip;
            }
            // NotifyPropertyChanged("RequestComments");
        }
        public get LastRequestdBy(): string {
            return this._lastRequestdBy;
        }
        public set LastRequestdBy(value: string) {
            this._lastRequestdBy = value;
        }
        public get LastRequestdDTTM(): string {
            return this._lastRequestdDTTM;
        }
        public set LastRequestdDTTM(value: string) {
            this._lastRequestdDTTM = value;
        }
        public get LastRequestedByText(): string {
            return this._lastRequestdBy + "\n" + this._lastRequestdDTTM;
        }
        private _LastReqLongDTTM: DateTime;
        public get LastReqLongDTTM(): DateTime{
            return this._LastReqLongDTTM;
        }
        public set LastReqLongDTTM(value: DateTime) {
            this._LastReqLongDTTM = value;
        }
        public get LasttechnicallyValidatedBy(): string {
            return this._lasttechnicallyValidatedBy;
        }
        public set LasttechnicallyValidatedBy(value: string) {
            this._lasttechnicallyValidatedBy = value;
        }
        public get LasttechnicallyValidatedDTTM(): string {
            return this.__lasttechnicallyValidatedDTTM;
        }
        public set LasttechnicallyValidatedDTTM(value: string) {
            this.__lasttechnicallyValidatedDTTM = value;
        }
        public get LastTVByText(): string {
            return this._lasttechnicallyValidatedBy + "\n" + this.__lasttechnicallyValidatedDTTM;
        }
        public get SupplyStatus(): string {
            return this._supplyStatus;
        }
        public set SupplyStatus(value: string) {
            this._supplyStatus = value;
        }
        public get SupplyInstruction(): string {
            return this._SupplyInstruction;
        }
        public set SupplyInstruction(value: string) {
            this._SupplyInstruction = value;
        }
        public get SupplyComments(): string {
            return this._SupplyComments;
        }
        public set SupplyComments(value: string) {
            this._SupplyComments = value;
        }
        public get SupplyInstructionComments(): string {
            return (!String.IsNullOrEmpty(this._SupplyInstruction) && !String.IsNullOrEmpty(this._SupplyComments)) ? this._SupplyInstruction + "/" + "\n" + this._SupplyComments : ((!String.IsNullOrEmpty(this._SupplyInstruction)) ? this._SupplyInstruction : String.Empty) + (!String.IsNullOrEmpty(this._SupplyComments) ? this._SupplyComments : String.Empty);
        }
        private _lastDispensing: string;
        public get LastDispensing(): string {
            return this._lastDispensing;
        }
        public set LastDispensing(value: string) {
            this._lastDispensing = value;
        }
        private _IsCancelReqEnabled: boolean;
        public get IsCancelReqEnabled(): boolean {
            return this._IsCancelReqEnabled;
        }
        public set IsCancelReqEnabled(value: boolean) {
            this._IsCancelReqEnabled = value;
        }
        public get LastDispensingText(): string {
            return this._lastDispensing;
        }
        private _mCVersionNumber: string;
        public get MCVersionNumber(): string {
            return this._mCVersionNumber;
        }
        public set MCVersionNumber(value: string) {
            this._mCVersionNumber = value;
        }
        private _lorenzoID: string;
        public get LorenzoID(): string {
            return this._lorenzoID;
        }
        public set LorenzoID(value: string) {
            this._lorenzoID = value;
        }
        private _prescriptionItemOID: number;
        public get PrescriptionItemOID(): number {
            return this._prescriptionItemOID;
        }
        public set PrescriptionItemOID(value: number) {
            this._prescriptionItemOID = value;
        }
        private _prescriptionItemName: string;
        public get PrescriptionItemName(): string {
            return this._prescriptionItemName;
        }
        public set PrescriptionItemName(value: string) {
            this._prescriptionItemName = value;
        }
        private _isCancelReqChecked: boolean;
        public get IsCancelReqChecked(): boolean {
            return this._isCancelReqChecked;
        }
        public set IsCancelReqChecked(value: boolean) {
            this._isCancelReqChecked = value;
            // NotifyPropertyChanged("IsCancelReqChecked");
        }
        public get UrgencyLevelToolTip(): string {
            return this._UrgencyLevelToolTip;
        }
        public set UrgencyLevelToolTip(value: string) {
            this._UrgencyLevelToolTip = value;
            // NotifyPropertyChanged("UrgencyLevelToolTip");
        }
        public get RequestCommentsToolTip(): string {
            return this._RequestCommentsToolTip;
        }
        public set RequestCommentsToolTip(value: string) {
            this._RequestCommentsToolTip = value;
        }
        public get IsinDefiniteOmit(): boolean {
            return this._IsinDefiniteOmit;
        }
        public set IsinDefiniteOmit(value: boolean) {
            this._IsinDefiniteOmit = value;
        }
        public get OmitComments(): string {
            return this._OmitComments;
        }
        public set OmitComments(value: string) {
            this._OmitComments = value;
        }
        public get OmittedBy(): string {
            return this._OmittedBy;
        }
        public set OmittedBy(value: string) {
            this._OmittedBy = value;
        }
        public get ReviewComments(): string {
            return this._ReviewComments;
        }
        public set ReviewComments(value: string) {
            this._ReviewComments = value;
        }
        public get ReviewRequestedBy(): string {
            return this._ReviewRequestedBy;
        }
        public set ReviewRequestedBy(value: string) {
            this._ReviewRequestedBy = value;
        }
        public get ReviewType(): string {
            return this._ReviewType;
        }
        public set ReviewType(value: string) {
            this._ReviewType = value;
        }
        public get ReviewafterDTTM(): DateTime{
            return this._ReviewafterDTTM;
        }
        public set ReviewafterDTTM(value: DateTime) {
            this._ReviewafterDTTM = value;
        }
        public get IsinDefiniteOmitDTTM(): DateTime{
            return this._IsinDefiniteOmitDTTM;
        }
        public set IsinDefiniteOmitDTTM(value: DateTime) {
            this._IsinDefiniteOmitDTTM = value;
        }
        public get EncounterOID(): number {
            return this._EncounterOID;
        }
        public set EncounterOID(value: number) {
            this._EncounterOID = value;
        }
        private _ReqMedPresItemsList: ObservableCollection<MedRequestVM>;
        public get ReqMedPresItemsList(): ObservableCollection<MedRequestVM> {
            return this._ReqMedPresItemsList;
        }
        public set ReqMedPresItemsList(value: ObservableCollection<MedRequestVM>) {
            this._ReqMedPresItemsList = value;
            // NotifyPropertyChanged("ReqMedPresItemsList");
        }
        private _IsLastDispensingLink: boolean;
        public get IsLastDispensingLink(): boolean {
            return this._IsLastDispensingLink;
        }
        public set IsLastDispensingLink(value: boolean) {
            this._IsLastDispensingLink = value;
        }

        private _IsLastDispensingLinkVisibility: Visibility = Visibility.Collapsed;
        public get IsLastDispensingLinklblVisibility(): Visibility {
            return this._IsLastDispensingLinkVisibility;
        }
        public set IsLastDispensingLinklblVisibility(value: Visibility) {
            this._IsLastDispensingLinkVisibility = value;
        }
        private _PresReqHistoryOID: number;
        public get PresReqHistoryOID(): number {
            return this._PresReqHistoryOID;
        }
        public set PresReqHistoryOID(value: number) {
            this._PresReqHistoryOID = value;
        }
        private _EncounterType: string;
        public get EncounterType(): string {
            return this._EncounterType;
        }
        public set EncounterType(value: string) {
            this._EncounterType = value;
        }
        private _PrescriptionItemStartDTTM: DateTime;
        public get PrescriptionItemStartDTTM(): DateTime{
            return this._PrescriptionItemStartDTTM;
        }
        public set PrescriptionItemStartDTTM(value: DateTime) {
            this._PrescriptionItemStartDTTM = value;
        }
        private _IsCriticalMed: boolean;
        public get IsCriticalMed(): boolean {
            return this._IsCriticalMed;
        }
        public set IsCriticalMed(value: boolean) {
            this._IsCriticalMed = value;
        }
        private _IsDoseCalculatedByDC: boolean;
        public get IsDoseCalculatedByDC(): boolean {
            return this._IsDoseCalculatedByDC;
        }
        public set IsDoseCalculatedByDC(value: boolean) {
            this._IsDoseCalculatedByDC = value;
        }
    }
