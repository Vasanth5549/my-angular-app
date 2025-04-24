import { Component, EventEmitter, OnInit } from '@angular/core';
import { StringBuilder,ProfileFactoryType,ContextManager,Convert,AppActivity, ProcessRTE, CommonBB} from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp,Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison,AppDialogEventargs, AppDialogResult, DelegateArgs, DialogComponentArgs, WindowButtonType, ObservableCollection, RTEEventargs, CListItem, List, PatientContext } from 'epma-platform/models';
import { AppDialog } from 'epma-platform/controls';
import { HelperService} from 'epma-platform/soapclient';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { AMSHelper } from 'src/app/lorappcommonbb/amshelper';
import { ObjectHelper as Helper, ObjectHelper } from 'epma-platform/helper';
import { Dictionary } from 'epma-platform/dictionary';
import { ViewModelBase } from 'src/app/lorappcommonbb/viewmodelbase';
import { CReqMsgGetEncounter, CResMsgGetEncounter, Encounter, EncounterWSWSSoapClient, GetEncounterCompletedEventArgs } from 'src/app/shared/epma-platform/soap-client/EncounterWS';
import { CConstants, PrescriptionTypes, ValueDomain } from '../utilities/CConstants';
import { ChartContext, ValueDomainValues } from '../utilities/globalvariable';
import { Common } from '../utilities/common';
import * as IPPMAManagePrescSer from 'src/app/shared/epma-platform/soap-client/IPPMAManagePrescriptionWS';
import { PrescriptionHelper } from '../utilities/PrescriptionHelper';
import { InfusionTypeConceptCodeData, MedicationCommonProfileData } from 'src/app/lorappmedicationcommonbb/utilities/profiledata';
import { AppSessionInfo } from 'src/app/lorappcommonbb/utilities/globalvariable';
import { InfusionLineItemVM } from 'src/app/lorappmedicationcommonbb/utilities/lineitemconstructor';

    export class PrescriptionItemViewVM extends ViewModelBase {
        private _sEncounterHeader: string;
        private sEncStatus: string;
        public get sEncounterHeader(): string {
            return this._sEncounterHeader;
        }
        public set sEncounterHeader(value: string) {
            this._sEncounterHeader = value;
            // NotifyPropertyChanged("sEncounterHeader");
        }
        private _sEncounterHeaderTooltip: string;
        public get sEncounterHeaderTooltip(): string {
            return this._sEncounterHeaderTooltip;
        }
        public set sEncounterHeaderTooltip(value: string) {
            this._sEncounterHeaderTooltip = value;
        }
        private _prescriptionItemOID: number;
        public get PrescriptionItemOID(): number {
            return this._prescriptionItemOID;
        }
        public set PrescriptionItemOID(value: number) {
            if (this._prescriptionItemOID != value) {
                this._prescriptionItemOID = value;
                // NotifyPropertyChanged("PrescriptionItemOID");
            }
        }
        private _prescriptionItemName: string;
        public get PrescriptionItemName(): string {
            return this._prescriptionItemName;
        }
        public set PrescriptionItemName(value: string) {
            if (this._prescriptionItemName != value) {
                this._prescriptionItemName = value;
                // NotifyPropertyChanged("PrescriptionItemName");
            }
        }
        private _prescriptionItem: string;
        public get PrescriptionItem(): string {
            return this._prescriptionItem;
        }
        public set PrescriptionItem(value: string) {
            if (this._prescriptionItem != value) {
                this._prescriptionItem = value;
                // NotifyPropertyChanged("PrescriptionItem");
            }
        }
        private _otherInformation: string;
        public get OtherInformation(): string {
            return this._otherInformation;
        }
        public set OtherInformation(value: string) {
            if (this._otherInformation != value) {
                this._otherInformation = value;
                // NotifyPropertyChanged("OtherInformation");
            }
        }
        private _PrescriptionItemViewDetails: IPPMAManagePrescSer.PrescriptionItemView;
        public get PrescriptionItemViewDetails(): IPPMAManagePrescSer.PrescriptionItemView {
            return this._PrescriptionItemViewDetails;
        }
        public set PrescriptionItemViewDetails(value: IPPMAManagePrescSer.PrescriptionItemView) {
            if (this._PrescriptionItemViewDetails != value) {
                this._PrescriptionItemViewDetails = value;
                // NotifyPropertyChanged("PrescriptionItemViewDetails");
            }
        }
        public PrescriptionType: string;
        private _prescriptionStartDTTM: DateTime;
        public get PrescriptionStartDTTM(): DateTime{
            return this._prescriptionStartDTTM;
        }
        public set PrescriptionStartDTTM(value: DateTime) {
            if (this._prescriptionStartDTTM != value) {
                this._prescriptionStartDTTM = value;
                // NotifyPropertyChanged("PrescriptionStartDTTM");
            }
        }
        private _dateCommenced: string;
        public get DateCommenced(): string {
            return this._dateCommenced;
        }
        public set DateCommenced(value: string) {
            if (Helper.ReferenceEquals(this._dateCommenced, value) != true) {
                this._dateCommenced = value;
                // NotifyPropertyChanged("DateCommenced");
            }
        }
        private _prescriptionItemStatus: string;
        public get PrescriptionItemStatus(): string {
            return this._prescriptionItemStatus;
        }
        public set PrescriptionItemStatus(value: string) {
            if (Helper.ReferenceEquals(this._prescriptionItemStatus, value) != true) {
                this._prescriptionItemStatus = value;
                // NotifyPropertyChanged("PrescriptionItemStatus");
            }
        }
        private _Itemsubtype: string;
        public get Itemsubtype(): string {
            return this._Itemsubtype;
        }
        public set Itemsubtype(value: string) {
            if (Helper.ReferenceEquals(this._Itemsubtype, value) != true) {
                this._Itemsubtype = value;
                // NotifyPropertyChanged("Itemsubtype");
            }
        }
        private _Lorenzoid: string;
        public get lorenzoid(): string {
            return this._Lorenzoid;
        }
        public set lorenzoid(value: string) {
            if (Helper.ReferenceEquals(this._Lorenzoid, value) != true) {
                this._Lorenzoid = value;
                // NotifyPropertyChanged("lorenzoid");
            }
        }
        private _MCIItemDisplay: string;
        public get MCIItemDisplay(): string {
            return this._MCIItemDisplay;
        }
        public set MCIItemDisplay(value: string) {
            if (Helper.ReferenceEquals(this._MCIItemDisplay, value) != true) {
                this._MCIItemDisplay = value;
                // NotifyPropertyChanged("MCIItemDisplay");
            }
        }
        private _InfusionDetails: InfusionLineItemVM;
        public get InfusionDetails(): InfusionLineItemVM {
            return this._InfusionDetails;
        }
        public set InfusionDetails(value: InfusionLineItemVM) {
            if (Helper.ReferenceEquals(this._InfusionDetails, value) != true) {
                this._InfusionDetails = value;
                // NotifyPropertyChanged("InfusionDetails");
            }
        }
        private _medsResolve: ObservableCollection<PrescriptionItemViewVM>;
        public get MedsResolve(): ObservableCollection<PrescriptionItemViewVM> {
            return this._medsResolve;
        }
        public set MedsResolve(value: ObservableCollection<PrescriptionItemViewVM>) {
            if (this._medsResolve != value) {
                this._medsResolve = value;
                // NotifyPropertyChanged("MedsResolve");
            }
        }
        private _VMVPIdentifyingName: string;
        public get VMVPIdentifyingName(): string {
            return this._VMVPIdentifyingName;
        }
        public set VMVPIdentifyingName(value: string) {
            this._VMVPIdentifyingName = value;
        }
        private _fluiddirection: string;
        public get FluidDirection(): string {
            return this._fluiddirection;
        }
        public set FluidDirection(value: string) {
            if (Helper.ReferenceEquals(this._fluiddirection, value) != true) {
                this._fluiddirection = value;
                // NotifyPropertyChanged("FluidDirection");
            }
        }        
      GetPatientMedicationListCompleted = new EventEmitter();

       public GetPatientMedications(PresType: string, cDisCancel: string, EncounterOID: number, oGetPatientMedicationListCompleted: Function): void {
            let objServiceProxy: IPPMAManagePrescSer.IPPMAManagePrescriptionWSSoapClient = new IPPMAManagePrescSer.IPPMAManagePrescriptionWSSoapClient();
            objServiceProxy.GetPatientMedicationListCompleted = (s,e) => { this.Resolve_GetPatientMedicationListCompleted(s, e); };
            let objReqList: IPPMAManagePrescSer.CReqMsgGetPatientMedicationList = new IPPMAManagePrescSer.CReqMsgGetPatientMedicationList();
            objReqList.oMedicationListCriteriaBC = new IPPMAManagePrescSer.MedicationListCriteria();
            objReqList.oMedicationListCriteriaBC.PatientOID = ChartContext.PatientOID;
            objReqList.oMedicationListCriteriaBC.CAPresType = PatientContext.PrescriptionType;
            objReqList.oMedicationListCriteriaBC.McVersion = AppSessionInfo.AMCV;
            objReqList.oMedicationListCriteriaBC.EncounterOID = EncounterOID;
            objReqList.oMedicationListCriteriaBC.PrescriptionType = PresType;
            objReqList.oMedicationListCriteriaBC.ProfileDiscontinuedDrugFlag = cDisCancel;
            let sImageList: string;
            objReqList.oMedicationListCriteriaBC.SealRecordList = Common.GetSealDrugs((o)=>{
                sImageList=o
            });
            objReqList.oMedicationListCriteriaBC.SealImageList = sImageList;
            let nDrugsExpDuration: number = 0;
            if (MedicationCommonProfileData.MedViewConfig != null)
                nDrugsExpDuration = Convert.ToInt32(PrescriptionHelper.GetDuration(MedicationCommonProfileData.MedViewConfig.DrugsExpiryDuration));
            objReqList.oMedicationListCriteriaBC.ProfileHoldDuration = nDrugsExpDuration;
            objReqList.oContextInformation = CommonBB.FillContext();
            objServiceProxy.GetPatientMedicationListAsync(objReqList);
        }
        public Resolve_GetPatientMedicationListCompleted(sender: Object, e: IPPMAManagePrescSer.GetPatientMedicationListCompletedEventArgs): void {
            let _ErrorID: number = 80000072;
            let _ErrorSource: string = "LorAppMedicationAdminBBUI_P2.dll, Class:PrescriptionItemViewVM, Method:Resolve_GetPatientMedicationListCompleted()";
            if (e.Error == null) {
                try {
                    let objResList: IPPMAManagePrescSer.CResMsgGetPatientMedicationList = e.Result;
                    let oResponse: ObservableCollection<IPPMAManagePrescSer.PrescriptionItemView> = objResList.oPrescriptionItemView;
                    if (oResponse != null) {
                        let oPresItem: ObservableCollection<PrescriptionItemViewVM> = new ObservableCollection<PrescriptionItemViewVM>();
                        oResponse.forEach( (oItemView)=> {
                            if (oItemView instanceof IPPMAManagePrescSer.PrescriptionItemView) {
                                let oItemVM: PrescriptionItemViewVM = new PrescriptionItemViewVM();
                                oItemVM.FillPrescriptionItemVM(oItemView);
                                oPresItem.Add(oItemVM);
                            }
                        });
                        this.MedsResolve = oPresItem;
                    }
                }
               catch(ex:any)  {
                    let lnReturn: number = AMSHelper.PublicExceptionDetails(_ErrorID, _ErrorSource, ex);
                }

            }
            else {
                let lnReturn: number = AMSHelper.PublicExceptionDetails(_ErrorID, _ErrorSource, e.Error);
            }
        this.GetPatientMedicationListCompleted.emit(true);
        }
        public FillPrescriptionItemVM(oPrescription: IPPMAManagePrescSer.PrescriptionItemView): PrescriptionItemViewVM {
            let sPrescriptionItem: string = String.Empty;
            if (oPrescription != null) {
                if (oPrescription.oPrescriptionItem != null) {
                    this.PrescriptionItemOID = oPrescription.oPrescriptionItem.OID;
                    if (!String.IsNullOrEmpty(oPrescription.oPrescriptionItem.PrescriptionItemStatus)) {
                        this.PrescriptionItemStatus = oPrescription.oPrescriptionItem.PrescriptionItemStatus;
                    }
                    if (!String.IsNullOrEmpty(oPrescription.oPrescriptionItem.IdentifyingName)) {
                        this.PrescriptionItemName = oPrescription.oPrescriptionItem.IdentifyingName;
                    }
                    if (!String.IsNullOrEmpty(oPrescription.oPrescriptionItem.VMVPIdentifyingName)) {
                        this.VMVPIdentifyingName = oPrescription.oPrescriptionItem.VMVPIdentifyingName;
                    }
                    if(DateTime.NotEquals(oPrescription.oPrescriptionItem.StartDTTM , DateTime.MinValue)){
                        this.PrescriptionStartDTTM = oPrescription.oPrescriptionItem.StartDTTM;
                	this.StartDTTMText = this.StartDTTMDisplay();
                    }
                    this.Itemsubtype = oPrescription.oPrescriptionItem.ITMSUBTYP;
                    this.MCIItemDisplay = oPrescription.oPrescriptionItem.MCIItemDisplay;
                    this.lorenzoid = oPrescription.oPrescriptionItem.LorenzoID;
                }
                if (!String.IsNullOrEmpty(this.PrescriptionItemName) && oPrescription.oPresItemBasicPropertiesView != null) {
                    sPrescriptionItem = this.PrescriptionItemName;
                    if (oPrescription.oPresItemBasicPropertiesView.Form != null && !String.IsNullOrEmpty(oPrescription.oPresItemBasicPropertiesView.Form.Name)) {
                        sPrescriptionItem += " - " + oPrescription.oPresItemBasicPropertiesView.Form.Name;
                    }
                    if (!String.IsNullOrEmpty(oPrescription.oPresItemBasicPropertiesView.Dose)) {
                        sPrescriptionItem += " - DOSE " + oPrescription.oPresItemBasicPropertiesView.Dose;
                    }
                    if (oPrescription.oPresItemBasicPropertiesView.Route != null && !String.IsNullOrEmpty(oPrescription.oPresItemBasicPropertiesView.Route.Name)) {
                        sPrescriptionItem += " - " + oPrescription.oPresItemBasicPropertiesView.Route.Name;
                    }
                    if (!String.IsNullOrEmpty(oPrescription.oPresItemBasicPropertiesView.Frequency)) {
                        sPrescriptionItem += " - " + oPrescription.oPresItemBasicPropertiesView.Frequency;
                    }
                    if (!String.IsNullOrEmpty(oPrescription.oPresItemBasicPropertiesView.Direction)) {
                        sPrescriptionItem += " - " + oPrescription.oPresItemBasicPropertiesView.Direction;
                    }
                }
                this.PrescriptionItem = sPrescriptionItem;
                if (oPrescription.oPresItemAdditionalProperties != null) {
                    if (!String.IsNullOrEmpty(oPrescription.oPresItemAdditionalProperties.DateCommenced)) {
                        this.DateCommenced = oPrescription.oPresItemAdditionalProperties.DateCommenced;
                    }
                }
                if (oPrescription.oPresItemBasicPropertiesView != null) {
                    if (oPrescription.oPresItemBasicPropertiesView.DrugProperties != null && oPrescription.oPresItemBasicPropertiesView.DrugProperties.Count > 0) {
                        if (!String.IsNullOrEmpty(oPrescription.oPresItemBasicPropertiesView.DrugProperties[0].DrugPropertyCode)) {
                            let sDrugCode: string[] = oPrescription.oPresItemBasicPropertiesView.DrugProperties[0].DrugPropertyCode.Split(',');
                            oPrescription.oPresItemBasicPropertiesView.DrugProperties = new ObservableCollection<IPPMAManagePrescSer.DrugProperty>();
                            for (let i: number = 0; i < sDrugCode.length; i++) {
                                let sDRugProp: string[] = sDrugCode[i].Split('~');
                                let objDrug: IPPMAManagePrescSer.DrugProperty = ObjectHelper.CreateObject(new IPPMAManagePrescSer.DrugProperty(), { DrugPropertyCode: sDRugProp[0].TrimEnd('~') });
                                oPrescription.oPresItemBasicPropertiesView.DrugProperties.Add(objDrug);
                            }
                        }
                    }
                    if (oPrescription.oPresItemBasicPropertiesView.TreatmentToCont != null) {
                        if (ValueDomainValues.oMedTreatCont != null && ValueDomainValues.oMedTreatCont.Count > 0) {
                            ValueDomainValues.oMedTreatCont.forEach( (item)=> {
                                if (String.Equals(item.csCode, oPrescription.oPresItemBasicPropertiesView.TreatmentToCont.Code, StringComparison.InvariantCultureIgnoreCase)) {
                                    oPrescription.oPresItemBasicPropertiesView.TreatmentToCont.Name = item.csDescription;
                                }
                            });
                        }
                    }
                }
                if (oPrescription.oPresItemBasicPropertiesView != null && oPrescription.oPresItemBasicPropertiesView.FormViewParameters != null) {
                    this.InfusionDetails = new InfusionLineItemVM();
                    this.InfusionDetails.InfusionType = new CListItem();
                    this.InfusionDetails.InfusionType.Value = oPrescription.oPresItemBasicPropertiesView.FormViewParameters.INFTYCODE;
                    this.InfusionDetails.InfusionType.DisplayText = CommonBB.GetText(oPrescription.oPresItemBasicPropertiesView.FormViewParameters.INFTYCODE, InfusionTypeConceptCodeData.ConceptCodes);
                    this.InfusionDetails.DeliveryDeviceFreetext = oPrescription.oPresItemBasicPropertiesView.FormViewParameters.AdminDevice;
                    if (PatientContext.PrescriptionType == PrescriptionTypes.ForAdministration) {
                        this.InfusionDetails.Reviewafter = oPrescription.oPresItemBasicPropertiesView.FormViewParameters.ReviewAfterDTTM.ToString();
                    }
                    if (oPrescription.oPresItemBasicPropertiesView.FormViewParameters.AdminDeviceData != null) {
                        this.InfusionDetails.BackgroundRate = oPrescription.oPresItemBasicPropertiesView.FormViewParameters.AdminDeviceData.BackgroundRate;
                        if (oPrescription.oPresItemBasicPropertiesView.FormViewParameters.AdminDeviceData.BackgroundRateUOM != null && !String.IsNullOrEmpty(oPrescription.oPresItemBasicPropertiesView.FormViewParameters.AdminDeviceData.BackgroundRateUOM.UOMName)) {
                            this.InfusionDetails.BackgroundRateNumeratorUom = ObjectHelper.CreateObject(new CListItem(), {
                                DisplayText: oPrescription.oPresItemBasicPropertiesView.FormViewParameters.AdminDeviceData.BackgroundRateUOM.UOMName,
                                Value: oPrescription.oPresItemBasicPropertiesView.FormViewParameters.AdminDeviceData.BackgroundRateUOM.UOMId.ToString()
                            });
                        }
                        if (oPrescription.oPresItemBasicPropertiesView.FormViewParameters.AdminDeviceData.BackgroundRateDenaminatorUOM != null && !String.IsNullOrEmpty(oPrescription.oPresItemBasicPropertiesView.FormViewParameters.AdminDeviceData.BackgroundRateDenaminatorUOM.UOMName)) {
                            this.InfusionDetails.BackgroundRateDinominatorUom = ObjectHelper.CreateObject(new CListItem(), {
                                DisplayText: oPrescription.oPresItemBasicPropertiesView.FormViewParameters.AdminDeviceData.BackgroundRateDenaminatorUOM.UOMName.ToString(),
                                Value: oPrescription.oPresItemBasicPropertiesView.FormViewParameters.AdminDeviceData.BackgroundRateDenaminatorUOM.UOMId.ToString()
                            });
                        }
                        if (!String.IsNullOrEmpty(oPrescription.oPresItemBasicPropertiesView.FormViewParameters.AdminDeviceData.TopUpDose) && oPrescription.oPresItemBasicPropertiesView.FormViewParameters.AdminDeviceData.TopUpDoseUOM != null) {
                            this.InfusionDetails.Bolus = oPrescription.oPresItemBasicPropertiesView.FormViewParameters.AdminDeviceData.TopUpDose;
                            this.InfusionDetails.BolusUOM = ObjectHelper.CreateObject(new CListItem(), {
                                DisplayText: oPrescription.oPresItemBasicPropertiesView.FormViewParameters.AdminDeviceData.TopUpDoseUOM.UOMName,
                                Value: oPrescription.oPresItemBasicPropertiesView.FormViewParameters.AdminDeviceData.TopUpDoseUOM.UOMId.ToString()
                            });
                        }
                        if (!String.IsNullOrEmpty(oPrescription.oPresItemBasicPropertiesView.FormViewParameters.AdminDeviceData.BoosterDose) && oPrescription.oPresItemBasicPropertiesView.FormViewParameters.AdminDeviceData.BoosterDoseUOM != null) {
                            this.InfusionDetails.Boosterdose = oPrescription.oPresItemBasicPropertiesView.FormViewParameters.AdminDeviceData.BoosterDose;
                            this.InfusionDetails.Boosterdoseuom = ObjectHelper.CreateObject(new CListItem(), {
                                DisplayText: oPrescription.oPresItemBasicPropertiesView.FormViewParameters.AdminDeviceData.BoosterDoseUOM.UOMName,
                                Value: oPrescription.oPresItemBasicPropertiesView.FormViewParameters.AdminDeviceData.BoosterDoseUOM.UOMId.ToString()
                            });
                        }
                        if (oPrescription.oPresItemBasicPropertiesView.FormViewParameters.AdminDeviceData.LockOutPeriod > 0 && oPrescription.oPresItemBasicPropertiesView.FormViewParameters.AdminDeviceData.LockOutPeriodUOM != null) {
                            this.InfusionDetails.LockOutPeriod = oPrescription.oPresItemBasicPropertiesView.FormViewParameters.AdminDeviceData.LockOutPeriod;
                            this.InfusionDetails.LockoutDuration = ObjectHelper.CreateObject(new CListItem(), {
                                DisplayText: oPrescription.oPresItemBasicPropertiesView.FormViewParameters.AdminDeviceData.LockOutPeriodUOM.UOMName,
                                Value: oPrescription.oPresItemBasicPropertiesView.FormViewParameters.AdminDeviceData.LockOutPeriodUOM.UOMId.ToString()
                            });
                        }
                    }
                    if (oPrescription.oPresItemBasicPropertiesView.FormViewParameters.IntravenousInfusionData != null) {
                        this.InfusionDetails.TargetUpperSatRange = oPrescription.oPresItemBasicPropertiesView.FormViewParameters.IntravenousInfusionData.TargetSaturationUpper;
                        this.InfusionDetails.TargetLowerSatRange = oPrescription.oPresItemBasicPropertiesView.FormViewParameters.IntravenousInfusionData.TargetSaturationLower;
                        this.InfusionDetails.MaxDose = oPrescription.oPresItemBasicPropertiesView.FormViewParameters.IntravenousInfusionData.MaxDose;
                        this.InfusionDetails.Lumen = oPrescription.oPresItemBasicPropertiesView.FormViewParameters.IntravenousInfusionData.Lumen;
                        this.InfusionDetails.Humidification = oPrescription.oPresItemBasicPropertiesView.FormViewParameters.IntravenousInfusionData.HUMIDCode;
                        if (!String.IsNullOrEmpty(oPrescription.oPresItemBasicPropertiesView.FormViewParameters.IntravenousInfusionData.DeliveryDevice)) {
                            this.InfusionDetails.DeliveryDevice = ObjectHelper.CreateObject(new CListItem(), {
                                DisplayText: oPrescription.oPresItemBasicPropertiesView.FormViewParameters.IntravenousInfusionData.DeliveryDevice,
                                Value: String.Empty
                            });
                        }
                        if (oPrescription.oPresItemBasicPropertiesView.FormViewParameters.IntravenousInfusionData.IsOxygen == '1')
                            this.InfusionDetails.IsOxygen = true;
                        else this.InfusionDetails.IsOxygen = false;
                        if (!String.IsNullOrEmpty(oPrescription.oPresItemBasicPropertiesView.FormViewParameters.IntravenousInfusionData.IsOnGoing))
                            this.InfusionDetails.IsOnGoing = oPrescription.oPresItemBasicPropertiesView.FormViewParameters.IntravenousInfusionData.IsOnGoing;
                        else this.InfusionDetails.IsOnGoing = String.Empty;
                        if (PatientContext.PrescriptionType == PrescriptionTypes.ForAdministration) {
                            this.InfusionDetails.Reviewafter = oPrescription.oPresItemBasicPropertiesView.FormViewParameters.ReviewAfterDTTM.ToString();
                        }
                        this.InfusionDetails.ConcentrationFreeText = oPrescription.oPresItemBasicPropertiesView.FormViewParameters.IntravenousInfusionData.Concentration.ToString();
                        if (!String.IsNullOrEmpty(oPrescription.oPresItemBasicPropertiesView.FormViewParameters.IntravenousInfusionData.LowConcentration))
                            this.InfusionDetails.LowConcentration = oPrescription.oPresItemBasicPropertiesView.FormViewParameters.IntravenousInfusionData.LowConcentration;
                        if (!String.IsNullOrEmpty(oPrescription.oPresItemBasicPropertiesView.FormViewParameters.IntravenousInfusionData.UpperConcentration))
                            this.InfusionDetails.UpperConcentration = oPrescription.oPresItemBasicPropertiesView.FormViewParameters.IntravenousInfusionData.UpperConcentration;
                        if (oPrescription.oPresItemBasicPropertiesView.FormViewParameters.IntravenousInfusionData.LowConcentrationUOMOID != null && !String.IsNullOrEmpty(oPrescription.oPresItemBasicPropertiesView.FormViewParameters.IntravenousInfusionData.LowConcentrationUOMOID.UOMName)) {
                            this.InfusionDetails.LowConcentrationUOM = ObjectHelper.CreateObject(new CListItem(), {
                                DisplayText: oPrescription.oPresItemBasicPropertiesView.FormViewParameters.IntravenousInfusionData.LowConcentrationUOMOID.UOMName,
                                Value: oPrescription.oPresItemBasicPropertiesView.FormViewParameters.IntravenousInfusionData.LowConcentrationUOMOID.UOMId.ToString()
                            });
                        }
                        if (oPrescription.oPresItemBasicPropertiesView.FormViewParameters.IntravenousInfusionData.UpperConcentrationUOMOID != null && !String.IsNullOrEmpty(oPrescription.oPresItemBasicPropertiesView.FormViewParameters.IntravenousInfusionData.UpperConcentrationUOMOID.UOMName)) {
                            this.InfusionDetails.UpperConcentrationUOM = ObjectHelper.CreateObject(new CListItem(), {
                                DisplayText: oPrescription.oPresItemBasicPropertiesView.FormViewParameters.IntravenousInfusionData.UpperConcentrationUOMOID.UOMName.ToString(),
                                Value: oPrescription.oPresItemBasicPropertiesView.FormViewParameters.IntravenousInfusionData.UpperConcentrationUOMOID.UOMId.ToString()
                            });
                        }
                        this.InfusionDetails.Rate = oPrescription.oPresItemBasicPropertiesView.FormViewParameters.IntravenousInfusionData.Rate;
                        this.InfusionDetails.UpperRate = oPrescription.oPresItemBasicPropertiesView.FormViewParameters.IntravenousInfusionData.UpperRate;
                        if (oPrescription.oPresItemBasicPropertiesView.FormViewParameters.IntravenousInfusionData.RateUOM != null && !String.IsNullOrEmpty(oPrescription.oPresItemBasicPropertiesView.FormViewParameters.IntravenousInfusionData.RateUOM.UOMName)) {
                            this.InfusionDetails.InfRateNumeratorUom = ObjectHelper.CreateObject(new CListItem(), {
                                DisplayText: oPrescription.oPresItemBasicPropertiesView.FormViewParameters.IntravenousInfusionData.RateUOM.UOMName,
                                Value: oPrescription.oPresItemBasicPropertiesView.FormViewParameters.IntravenousInfusionData.RateUOM.UOMId.ToString()
                            });
                        }
                        if (oPrescription.oPresItemBasicPropertiesView.FormViewParameters.IntravenousInfusionData.RateDenominatorUOM != null && !String.IsNullOrEmpty(oPrescription.oPresItemBasicPropertiesView.FormViewParameters.IntravenousInfusionData.RateDenominatorUOM.UOMName)) {
                            this.InfusionDetails.InfRateDinominatorUom = ObjectHelper.CreateObject(new CListItem(), {
                                DisplayText: oPrescription.oPresItemBasicPropertiesView.FormViewParameters.IntravenousInfusionData.RateDenominatorUOM.UOMName.ToString(),
                                Value: oPrescription.oPresItemBasicPropertiesView.FormViewParameters.IntravenousInfusionData.RateDenominatorUOM.UOMId.ToString()
                            });
                        }
                        if (!String.IsNullOrEmpty(oPrescription.oPresItemBasicPropertiesView.FormViewParameters.IntravenousInfusionData.InfusionPeriod))
                            this.InfusionDetails.InfusionPeriod = Convert.ToInt64(oPrescription.oPresItemBasicPropertiesView.FormViewParameters.IntravenousInfusionData.InfusionPeriod);
                        if (oPrescription.oPresItemBasicPropertiesView.FormViewParameters.IntravenousInfusionData.InfusionPeriodUOM != null && !String.IsNullOrEmpty(oPrescription.oPresItemBasicPropertiesView.FormViewParameters.IntravenousInfusionData.InfusionPeriodUOM.UOMName)) {
                            this.InfusionDetails.InfusionPeriodUom = ObjectHelper.CreateObject(new CListItem(), {
                                DisplayText: oPrescription.oPresItemBasicPropertiesView.FormViewParameters.IntravenousInfusionData.InfusionPeriodUOM.UOMName,
                                Value: oPrescription.oPresItemBasicPropertiesView.FormViewParameters.IntravenousInfusionData.InfusionPeriodUOM.UOMId.ToString()
                            });
                        }
                        if (oPrescription.oPresItemBasicPropertiesView.FormViewParameters.IntravenousInfusionData.Fluid != null && oPrescription.oPresItemBasicPropertiesView.FormViewParameters.IntravenousInfusionData.Fluid.OID > 0) {
                            this.InfusionDetails.FluidSelectvalue = ObjectHelper.CreateObject(new CListItem(), {
                                DisplayText: oPrescription.oPresItemBasicPropertiesView.FormViewParameters.IntravenousInfusionData.Fluid.Name,
                                Value: oPrescription.oPresItemBasicPropertiesView.FormViewParameters.IntravenousInfusionData.Fluid.OID.ToString()
                            });
                        }
                        else {
                            this.InfusionDetails.FluidFreetext = oPrescription.oPresItemBasicPropertiesView.FormViewParameters.IntravenousInfusionData.Fluid.Name;
                        }
                        this.InfusionDetails.FluidVolume = oPrescription.oPresItemBasicPropertiesView.FormViewParameters.IntravenousInfusionData.Volume;
                        if (oPrescription.oPresItemBasicPropertiesView.FormViewParameters.IntravenousInfusionData.VolumeUOM != null && !String.IsNullOrEmpty(oPrescription.oPresItemBasicPropertiesView.FormViewParameters.IntravenousInfusionData.VolumeUOM.UOMName)) {
                            this.InfusionDetails.VolumeUOM = ObjectHelper.CreateObject(new CListItem(), {
                                DisplayText: oPrescription.oPresItemBasicPropertiesView.FormViewParameters.IntravenousInfusionData.VolumeUOM.UOMName,
                                Value: oPrescription.oPresItemBasicPropertiesView.FormViewParameters.IntravenousInfusionData.VolumeUOM.UOMId.ToString()
                            });
                        }
                    }
                }
                this.PrescriptionItemViewDetails = oPrescription;
            }
            return this;
        }
        public GetEncounterDescription(): void {
           // let objServiceProxy: EncounterWS.QueryCareEventsWSSoapClient = new EncounterWS.QueryCareEventsWSSoapClient(); 
             let objServiceProxy: EncounterWSWSSoapClient = new EncounterWSWSSoapClient();
            let objReqEnc: CReqMsgGetEncounter = new CReqMsgGetEncounter();
            objReqEnc.oContextInformation = Common.FillContext();
            objReqEnc.objEncounterBC = new Encounter();
            objReqEnc.objEncounterBC.PatientOID = Convert.ToString(ChartContext.PatientOID);
            objReqEnc.objEncounterBC.EncounterID = Convert.ToString(ChartContext.EncounterOID);
            objReqEnc.objEncounterBC.EncounterStatus = "CC_ENCOPEN";
            objReqEnc.objEncounterBC.EncounterType = ChartContext.EncounterType;
            objServiceProxy.GetEncounterCompleted  = (s,e) => { this.objServiceProxy_GetEncounterCompleted(s,e); } ;
            objServiceProxy.GetEncounterAsync(objReqEnc);
        }
        objServiceProxy_GetEncounterCompleted(sender: Object, e: GetEncounterCompletedEventArgs): void {
            let _ErrorID: number = 80000071;
            let _ErrorSource: string = "LorAppMedicationAdminBBUI_P2.dll, Class:PrescriptionItemViewVM, Method:objServiceProxy_GetEncounterCompleted()";
            if (e.Error == null) {
                try {
                    let objEncounters: CResMsgGetEncounter = ObjectHelper.CreateType<CResMsgGetEncounter>(e.Result, CResMsgGetEncounter);
                    if (objEncounters != null && objEncounters.oEncounter != null && objEncounters.oEncounter.Count > 0) {
                        let objEncounter: Encounter = objEncounters.oEncounter[0];
                        this.sEncounterHeader = " Encounter - Start date: ";
                        this.sEncounterHeader += objEncounter.CreatedDttm.ToString(CConstants.ShortDateFormat);
                        this.sEncounterHeader += " - ";
                        if (!String.IsNullOrEmpty(objEncounter.SpecialtyName))
                            this.sEncounterHeader += objEncounter.SpecialtyName + " - ";
                        if (!String.IsNullOrEmpty(objEncounter.CurrentCareProviderName))
                            this.sEncounterHeader += objEncounter.CurrentCareProviderName + " - ";
                        let DomainCodes: string = ValueDomain.ENCTYPEVALUEDOMAINCODE + "," + ValueDomain.ENCSTATUSVALUEDOMAINCODE;
                        let a = (s,e)=>{
                            this.OnRTEResult(s,e);
                        }
                        ProcessRTE.GetValuesByDomainCodes(DomainCodes,a);
                    }
                }
               catch(ex:any)  {
                    let lnReturn: number = AMSHelper.PublicExceptionDetails(_ErrorID, _ErrorSource, ex);
                }

            }
            else {
                let lnReturn: number = AMSHelper.PublicExceptionDetails(_ErrorID, _ErrorSource, e.Error);
            }
        }
        OnRTEResult(args: RTEEventargs,e: any): void {
            if (String.IsNullOrEmpty(args.Request) || args.Result == null)
                return
                try{
            // if (String.Compare(args.Request, ValueDomain.ENCTYPEVALUEDOMAINCODE + "," + ValueDomain.ENCSTATUSVALUEDOMAINCODE, StringComparison.CurrentCultureIgnoreCase) == 0) {
                if (args.Result instanceof Dictionary) {
                    let objResult: Dictionary<string, List<CListItem>> = <Dictionary<string, List<CListItem>>>args.Result;
                    objResult.forEach( (objDomainDetail)=> {
                        switch (objDomainDetail.Key) {
                            case ValueDomain.ENCTYPEVALUEDOMAINCODE:
                            case ValueDomain.ENCSTATUSVALUEDOMAINCODE:
                                {
                                    if (objDomainDetail.Value.Count != null && objDomainDetail.Value.Count > 0) {
                                        let MatchedTerms = objDomainDetail.Value.Where(o =>o.Value== ValueDomain.ENCOPENCONCEPTCODE).Select(o => o.DisplayText);
                                        if (MatchedTerms != null && MatchedTerms.Count() > 0)
                                            this.sEncounterHeader += MatchedTerms.Single().ToString();
                                        MatchedTerms = null;
                                        MatchedTerms = objDomainDetail.Value.Where(o =>o.Value==ChartContext.EncounterType).Select(o => o.DisplayText);
                                        if (MatchedTerms != null && MatchedTerms.Count() > 0)
                                            this.sEncounterHeader = MatchedTerms.Single().ToString() + this.sEncounterHeader;
                                        MatchedTerms = null;
                                    }
                                }
                                break;
                        }
                    });
                    this.sEncounterHeaderTooltip = this.sEncounterHeader;
                    this.sEncounterHeader = this.sEncounterHeader.length > 102 ? this.sEncounterHeader.substring(0,102)+"..." : this.sEncounterHeader;
                }
            // }
            }
        catch(err){
            console.log(err);
        }
        }
        private identifyingName: string;
        public get IdentifyingName(): string {
            return this.identifyingName;
        }
        public set IdentifyingName(value: string) {
            if (Helper.ReferenceEquals(this.identifyingName, value) != true) {
                this.identifyingName = value;
                // NotifyPropertyChanged("IdentifyingName");
            }
        }
        private _PresMultiCompitemOID: number = 0;
        public get PresMultiCompitemOID(): number {
            return this._PresMultiCompitemOID;
        }
        public set PresMultiCompitemOID(value: number) {
            this._PresMultiCompitemOID = value;
        }
        private _PresMultiCompDisplayOrder: number;
        public get PresMultiCompDisplayOrder(): number {
            return this._PresMultiCompDisplayOrder;
        }
        public set PresMultiCompDisplayOrder(value: number) {
            this._PresMultiCompDisplayOrder = value;
        }
      private _startDTTMText: string;
      public get StartDTTMText(): string {
        return this._startDTTMText;
      }
      public set StartDTTMText(value: string) {
        if (this._startDTTMText != value) {
          this._startDTTMText = value;
          //super.NotifyPropertyChanged("StartDTTMText");
        }
      }
      public StartDTTMDisplay(): string {
        let Months: string[] = [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ];
        let sDTTM: string = String.Empty;
        let StartDate: DateTime = this.PrescriptionStartDTTM;
        if (StartDate.Date == DateTime.MinValue.Date) return String.Empty;
        if (
          String.Compare(
            this.DateCommenced,
            'CC_Month',
            StringComparison.OrdinalIgnoreCase
          ) == 0 ||
          String.Compare(
            this.DateCommenced,
            'CC_Year',
            StringComparison.OrdinalIgnoreCase
          ) == 0 ||
          String.Compare(
            this.DateCommenced,
            'CC_Complete',
            StringComparison.OrdinalIgnoreCase
          ) == 0
        ) {
          if (
            String.Compare(
              this.DateCommenced,
              'CC_Month',
              StringComparison.OrdinalIgnoreCase
            ) == 0
          ) {
            return StartDate.ToString('MMM-yyyy');
          } else if (
            String.Compare(
              this.DateCommenced,
              'CC_Year',
              StringComparison.OrdinalIgnoreCase
            ) == 0
          ) {
            return StartDate.ToString('yyyy');
          } else if (
            String.Compare(
              this.DateCommenced,
              'CC_Complete',
              StringComparison.OrdinalIgnoreCase
            ) == 0
          ) {
            return StartDate.ToString(CConstants.ShortDateFormat);
          } else return String.Empty;
        } else return StartDate.ToString(CConstants.ShortDateFormat);
      }
    }
