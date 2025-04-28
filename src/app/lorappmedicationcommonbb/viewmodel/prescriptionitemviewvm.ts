import { Convert, ProcessRTE } from 'epma-platform/services';
import { CListItem, CValuesetTerm, List, ObservableCollection, RTEEventargs, StringComparison } from 'epma-platform/models';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import { ObjectHelper } from 'epma-platform/helper';
import { ViewModelBase } from 'src/app/lorappcommonbb/viewmodelbase';
import * as IPPManagePrescSer from '../../shared/epma-platform/soap-client/IPPMAManagePrescriptionWS';
import { InfusionLineItemVM } from '../utilities/lineitemconstructor';
import { DoseCalcConceptCodeData, InfusionTypeConceptCodeData, MedicationCommonConceptCodeData, MedicationCommonProfileData } from '../utilities/profiledata';
import { Dictionary } from 'epma-platform/dictionary';
import { CConstants, PrescriptionTypes, ValueDomain } from '../utilities/constants';
import { AppSessionInfo, ContextInfo, PatientContext } from 'src/app/lorappcommonbb/utilities/globalvariable';
import { AMSHelper } from 'src/app/lorappcommonbb/amshelper';
import { CommonBB } from 'src/app/lorappcommonbb/utilities/common';

export class CommPrescriptionItemViewVM extends ViewModelBase {
  //public delegate void GetMedicationsDelegate(CommPrescriptionItemViewVM PresItems);
  public GetMedicationsEvent: Function;
  private _sEncounterHeader: string;
  private sEncStatus: string;
  public get sEncounterHeader(): string {
    return this._sEncounterHeader;
  }
  public set sEncounterHeader(value: string) {
    this._sEncounterHeader = value;
    //NotifyPropertyChanged("sEncounterHeader");
  }
  private _prescriptionItemOID: number = 0;
  public get PrescriptionItemOID(): number {
    return this._prescriptionItemOID;
  }
  public set PrescriptionItemOID(value: number) {
    if (this._prescriptionItemOID != value) {
      this._prescriptionItemOID = value;
      //super.NotifyPropertyChanged("PrescriptionItemOID");
    }
  }
  private _prescriptionItemName: string;
  public get PrescriptionItemName(): string {
    return this._prescriptionItemName;
  }
  public set PrescriptionItemName(value: string) {
    if (this._prescriptionItemName != value) {
      this._prescriptionItemName = value;
      //super.NotifyPropertyChanged("PrescriptionItemName");
    }
  }
  private _prescriptionItem: string;
  public get PrescriptionItem(): string {
    return this._prescriptionItem;
  }
  public set PrescriptionItem(value: string) {
    if (this._prescriptionItem != value) {
      this._prescriptionItem = value;
      //super.NotifyPropertyChanged("PrescriptionItem");
    }
  }
  private _otherInformation: string;
  public get OtherInformation(): string {
    return this._otherInformation;
  }
  public set OtherInformation(value: string) {
    if (this._otherInformation != value) {
      this._otherInformation = value;
      //super.NotifyPropertyChanged("OtherInformation");
    }
  }
  private _PrescriptionItemViewDetails: IPPManagePrescSer.PrescriptionItemView;
  public get PrescriptionItemViewDetails(): IPPManagePrescSer.PrescriptionItemView {
    return this._PrescriptionItemViewDetails;
  }
  public set PrescriptionItemViewDetails(
    value: IPPManagePrescSer.PrescriptionItemView
  ) {
    if (this._PrescriptionItemViewDetails != value) {
      this._PrescriptionItemViewDetails = value;
      //super.NotifyPropertyChanged("PrescriptionItemViewDetails");
    }
  }
  public PrescriptionType: string;
  private _prescriptionStartDTTM: DateTime = DateTime.MinValue;
  public get PrescriptionStartDTTM(): DateTime {
    return this._prescriptionStartDTTM;
  }
  public set PrescriptionStartDTTM(value: DateTime) {
    if (this._prescriptionStartDTTM != value) {
      this._prescriptionStartDTTM = value;
      //super.NotifyPropertyChanged("PrescriptionStartDTTM");
    }
  }
  private _StartPrescriptionTime: DateTime = DateTime.MinValue;
  public get StartPrescriptionTime(): DateTime {
    return this._StartPrescriptionTime;
  }
  public set StartPrescriptionTime(value: DateTime) {
    if (this._StartPrescriptionTime != value) {
      this._StartPrescriptionTime = value;
      //super.NotifyPropertyChanged("StartPrescriptionTime");
    }
  }
  private _endDTTM: DateTime = DateTime.MinValue;
  public get EndDTTM(): DateTime {
    return this._endDTTM;
  }
  public set EndDTTM(value: DateTime) {
    if (ObjectHelper.ReferenceEquals(this._endDTTM, value) != true) {
      this._endDTTM = value;
      //NotifyPropertyChanged("EndDTTM");
    }
  }
  private _dateCommenced: string;
  public get DateCommenced(): string {
    return this._dateCommenced;
  }
  public set DateCommenced(value: string) {
    if (ObjectHelper.ReferenceEquals(this._dateCommenced, value) != true) {
      this._dateCommenced = value;
      //NotifyPropertyChanged("DateCommenced");
    }
  }
  private _prescriptionItemStatus: string;
  public get PrescriptionItemStatus(): string {
    return this._prescriptionItemStatus;
  }
  public set PrescriptionItemStatus(value: string) {
    if (ObjectHelper.ReferenceEquals(this._prescriptionItemStatus, value) != true) {
      this._prescriptionItemStatus = value;
      //NotifyPropertyChanged("PrescriptionItemStatus");
    }
  }
  private _Itemsubtype: string;
  public get Itemsubtype(): string {
    return this._Itemsubtype;
  }
  public set Itemsubtype(value: string) {
    if (ObjectHelper.ReferenceEquals(this._Itemsubtype, value) != true) {
      this._Itemsubtype = value;
      //NotifyPropertyChanged("Itemsubtype");
    }
  }
  private _Lorenzoid: string;
  public get lorenzoid(): string {
    return this._Lorenzoid;
  }
  public set lorenzoid(value: string) {
    if (ObjectHelper.ReferenceEquals(this._Lorenzoid, value) != true) {
      this._Lorenzoid = value;
      //NotifyPropertyChanged("lorenzoid");
    }
  }
  private _MCIItemDisplay: string;
  public get MCIItemDisplay(): string {
    return this._MCIItemDisplay;
  }
  public set MCIItemDisplay(value: string) {
    if (ObjectHelper.ReferenceEquals(this._MCIItemDisplay, value) != true) {
      this._MCIItemDisplay = value;
      //NotifyPropertyChanged("MCIItemDisplay");
    }
  }
  private _GroupSequenceNo: number = 0;
  public get GroupSequenceNo(): number {
    return this._GroupSequenceNo;
  }
  public set GroupSequenceNo(value: number) {
    this._GroupSequenceNo = value;
  }
  private _ItemSequenceNo: number = 0;
  public get ItemSequenceNo(): number {
    return this._ItemSequenceNo;
  }
  public set ItemSequenceNo(value: number) {
    this._ItemSequenceNo = value;
  }
  private _IsLastItem: boolean = false;
  public get IsLastItem(): boolean {
    return this._IsLastItem;
  }
  public set IsLastItem(value: boolean) {
    this._IsLastItem = value;
  }
  private sourcePrescriptionOid: number = 0;
  public get SourcePrescriptionOid(): number {
    return this.sourcePrescriptionOid;
  }
  public set SourcePrescriptionOid(value: number) {
    this.sourcePrescriptionOid = value;
  }
  private parentPrescriptionItemOID: number = 0;
  public get ParentPrescriptionItemOID(): number {
    return this.parentPrescriptionItemOID;
  }
  public set ParentPrescriptionItemOID(value: number) {
    this.parentPrescriptionItemOID = value;
  }
  private _InfusionDetails: InfusionLineItemVM;
  public get InfusionDetails(): InfusionLineItemVM {
    return this._InfusionDetails;
  }
  public set InfusionDetails(value: InfusionLineItemVM) {
    if (ObjectHelper.ReferenceEquals(this._InfusionDetails, value) != true) {
      this._InfusionDetails = value;
      //NotifyPropertyChanged("InfusionDetails");
    }
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
  private _medsResolve: ObservableCollection<CommPrescriptionItemViewVM>;
  public get MedsResolve(): ObservableCollection<CommPrescriptionItemViewVM> {
    return this._medsResolve;
  }
  public set MedsResolve(
    value: ObservableCollection<CommPrescriptionItemViewVM>
  ) {
    if (this._medsResolve != value) {
      this._medsResolve = value;
      //super.NotifyPropertyChanged("MedsResolve");
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
    if (ObjectHelper.ReferenceEquals(this._fluiddirection, value) != true) {
      this._fluiddirection = value;
      //NotifyPropertyChanged("FluidDirection");
    }
  }
  private identifyingName: string;
  public get IdentifyingName(): string {
    return this.identifyingName;
  }
  public set IdentifyingName(value: string) {
    if (ObjectHelper.ReferenceEquals(this.identifyingName, value) != true) {
      this.identifyingName = value;
      //NotifyPropertyChanged("IdentifyingName");
    }
  }
  private _PresMultiCompitemOID: number = 0;
  public get PresMultiCompitemOID(): number {
    return this._PresMultiCompitemOID;
  }
  public set PresMultiCompitemOID(value: number) {
    this._PresMultiCompitemOID = value;
  }
  private _PresMultiCompDisplayOrder: number = 0;
  public get PresMultiCompDisplayOrder(): number {
    return this._PresMultiCompDisplayOrder;
  }
  public set PresMultiCompDisplayOrder(value: number) {
    this._PresMultiCompDisplayOrder = value;
  }
  private _IsAmendCompletedStatus: boolean = false;
  public get IsAmendCompletedStatus(): boolean {
    return this._IsAmendCompletedStatus;
  }
  public set IsAmendCompletedStatus(value: boolean) {
    if (this._IsAmendCompletedStatus != value) {
      this._IsAmendCompletedStatus = value;
      //NotifyPropertyChanged("IsAmendCompletedStatus");
    }
  }
  private _IsinDefiniteOmit: boolean = false;
  private _OmittedBy: string;
  private _OmitComments: string;
  private _IsinDefiniteOmitDTTM: DateTime = DateTime.MinValue;
  public get IsinDefiniteOmit(): boolean {
    return this._IsinDefiniteOmit;
  }
  public set IsinDefiniteOmit(value: boolean) {
    if (this._IsinDefiniteOmit != value) {
      this._IsinDefiniteOmit = value;
      //super.NotifyPropertyChanged("IsinDefiniteOmit");
    }
  }
  public get OmittedBy(): string {
    return this._OmittedBy;
  }
  public set OmittedBy(value: string) {
    if (this._OmittedBy != value) {
      this._OmittedBy = value;
      //super.NotifyPropertyChanged("OmittedBy");
    }
  }
  public get OmitComments(): string {
    return this._OmitComments;
  }
  public set OmitComments(value: string) {
    if (this._OmitComments != value) {
      this._OmitComments = value;
      //super.NotifyPropertyChanged("OmitComments");
    }
  }
  public get IsinDefiniteOmitDTTM(): DateTime {
    return this._IsinDefiniteOmitDTTM;
  }
  public set IsinDefiniteOmitDTTM(value: DateTime) {
    if (this._IsinDefiniteOmitDTTM != value) {
      this._IsinDefiniteOmitDTTM = value;
      //super.NotifyPropertyChanged("IsinDefiniteOmitDTTM");
    }
  }
  public DCCalDTTM: DateTime = DateTime.MinValue;
  private _IsDoseCalcExist: boolean = false;
  public get IsDoseCalcExist(): boolean {
    return this._IsDoseCalcExist;
  }
  public set IsDoseCalcExist(value: boolean) {
    this._IsDoseCalcExist = value;
    //NotifyPropertyChanged("IsDoseCalcExist");
  }
  private _DoseCalcExist: string;
  public get DoseCalcExist(): string {
    return this._DoseCalcExist;
  }
  public set DoseCalcExist(value: string) {
    this._DoseCalcExist = value;
    //NotifyPropertyChanged("DoseCalcExist");
  }
  public GetPatientMedications(
    PresType: string,
    cDisCancel: string,
    EncounterOID: number
  ): void {
    let objServiceProxy: IPPManagePrescSer.IPPMAManagePrescriptionWSSoapClient =
      new IPPManagePrescSer.IPPMAManagePrescriptionWSSoapClient();
    objServiceProxy.GetPatientMedicationListCompleted = (s, e) => {
      this.Resolve_GetPatientMedicationListCompleted(s, e);
    }
    let objReqList: IPPManagePrescSer.CReqMsgGetPatientMedicationList =
      new IPPManagePrescSer.CReqMsgGetPatientMedicationList();
    objReqList.oMedicationListCriteriaBC =
      new IPPManagePrescSer.MedicationListCriteria();
    objReqList.oMedicationListCriteriaBC.PatientOID = PatientContext.PatientOID;
    objReqList.oMedicationListCriteriaBC.CAPresType =
      PatientContext.PrescriptionType;
    objReqList.oMedicationListCriteriaBC.McVersion = AppSessionInfo.AMCV;
    objReqList.oMedicationListCriteriaBC.EncounterOID = EncounterOID;
    objReqList.oMedicationListCriteriaBC.PrescriptionType = PresType;
    objReqList.oMedicationListCriteriaBC.ProfileDiscontinuedDrugFlag =
      cDisCancel;
    objReqList.oContextInformation = CommonBB.FillContext();
    objServiceProxy.GetPatientMedicationListAsync(objReqList);
  }
  public Resolve_GetPatientMedicationListCompleted(
    sender: Object,
    e: IPPManagePrescSer.GetPatientMedicationListCompletedEventArgs
  ): void {
    let _ErrorID: number = 80000072;
    let _ErrorSource: string =
      'LorAppMedicationCommonBB_P2.dll, Class:CommPrescriptionItemViewVM, Method:Resolve_GetPatientMedicationListCompleted()';
    if (e.Error == null) {
      try {
        let objResList: IPPManagePrescSer.CResMsgGetPatientMedicationList =
          e.Result;
        let oResponse: ObservableCollection<IPPManagePrescSer.PrescriptionItemView> =
          objResList.oPrescriptionItemView;
        if (oResponse != null) {
          let oPresItem: ObservableCollection<CommPrescriptionItemViewVM> =
            new ObservableCollection<CommPrescriptionItemViewVM>();
          oResponse.forEach((oItemView) => {
            if (oItemView instanceof IPPManagePrescSer.PrescriptionItemView) {
              let oItemVM: CommPrescriptionItemViewVM =
                new CommPrescriptionItemViewVM();
              oItemVM.FillPrescriptionItemVM(oItemView);
              oPresItem.Add(oItemVM);
            }
          });
          this.MedsResolve = oPresItem;
        }
      } catch (ex: any) {
        let lnReturn: number = AMSHelper.PublicExceptionDetails(
          _ErrorID,
          _ErrorSource,
          ex
        );
      }
    } else {
      let lnReturn: number = AMSHelper.PublicExceptionDetails(
        _ErrorID,
        _ErrorSource,
        e.Error
      );
    }
    if (this.GetMedicationsEvent != null) {
      this.GetMedicationsEvent(this);
    }
  }
  public FillPrescriptionItemVM(
    oPrescription: IPPManagePrescSer.PrescriptionItemView
  ): CommPrescriptionItemViewVM {
    let sPrescriptionItem: string = String.Empty;
    if (oPrescription != null) {
      if (oPrescription.oPrescriptionItem != null) {
        this.PrescriptionItemOID = oPrescription.oPrescriptionItem.OID;
        if (
          !String.IsNullOrEmpty(
            oPrescription.oPrescriptionItem.PrescriptionItemStatus
          )
        ) {
          this.PrescriptionItemStatus =
            oPrescription.oPrescriptionItem.PrescriptionItemStatus;
        }
        if (
          !String.IsNullOrEmpty(oPrescription.oPrescriptionItem.IdentifyingName)
        ) {
          this.PrescriptionItemName =
            oPrescription.oPrescriptionItem.IdentifyingName;
        }
        if (
          !String.IsNullOrEmpty(
            oPrescription.oPrescriptionItem.VMVPIdentifyingName
          )
        ) {
          this.VMVPIdentifyingName =
            oPrescription.oPrescriptionItem.VMVPIdentifyingName;
        }
        {
          this.PrescriptionStartDTTM =
            oPrescription.oPrescriptionItem.StartDTTM;
          this.StartDTTMText = this.StartDTTMDisplay();
        }
        this.EndDTTM = oPrescription.oPrescriptionItem.EndDTTM;
        this.Itemsubtype = oPrescription.oPrescriptionItem.ITMSUBTYP;
        this.MCIItemDisplay = oPrescription.oPrescriptionItem.MCIItemDisplay;
        this.lorenzoid = oPrescription.oPrescriptionItem.LorenzoID;
        this.GroupSequenceNo =
          oPrescription.oPrescriptionItem.InfusionGroupSequenceNo;
        this.ItemSequenceNo = oPrescription.oPrescriptionItem.InfusionSeqOrder;
        this.SourcePrescriptionOid = oPrescription.oPrescriptionItem.OID;
        this.ParentPrescriptionItemOID =
          oPrescription.oPrescriptionItem.ParentPrescriptionItemOID;
        this.IsAmendCompletedStatus =
          oPrescription.oPrescriptionItem.IsAmendCompletedStatus;
        if (
          oPrescription.oPrescriptionItem.PrescriptionBasicData != null &&
          !String.IsNullOrEmpty(
            oPrescription.oPrescriptionItem.PrescriptionBasicData
              .PrescriptionType
          )
        ) {
          this.PrescriptionType =
            oPrescription.oPrescriptionItem.PrescriptionBasicData.PrescriptionType;
        }
      }
      if (
        !String.IsNullOrEmpty(this.PrescriptionItemName) &&
        oPrescription.oPresItemBasicPropertiesView != null
      ) {
        sPrescriptionItem = this.PrescriptionItemName;
        if (
          oPrescription.oPresItemBasicPropertiesView.Form != null &&
          !String.IsNullOrEmpty(
            oPrescription.oPresItemBasicPropertiesView.Form.Name
          )
        ) {
          sPrescriptionItem +=
            ' - ' + oPrescription.oPresItemBasicPropertiesView.Form.Name;
        }
        if (
          !String.IsNullOrEmpty(oPrescription.oPresItemBasicPropertiesView.Dose)
        ) {
          sPrescriptionItem +=
            ' - DOSE ' + oPrescription.oPresItemBasicPropertiesView.Dose;
        }
        if (
          oPrescription.oPresItemBasicPropertiesView.Route != null &&
          !String.IsNullOrEmpty(
            oPrescription.oPresItemBasicPropertiesView.Route.Name
          )
        ) {
          sPrescriptionItem +=
            ' - ' + oPrescription.oPresItemBasicPropertiesView.Route.Name;
        }
        if (
          !String.IsNullOrEmpty(
            oPrescription.oPresItemBasicPropertiesView.Frequency
          )
        ) {
          sPrescriptionItem +=
            ' - ' + oPrescription.oPresItemBasicPropertiesView.Frequency;
        }
        if (
          !String.IsNullOrEmpty(
            oPrescription.oPresItemBasicPropertiesView.Direction
          )
        ) {
          sPrescriptionItem +=
            ' - ' + oPrescription.oPresItemBasicPropertiesView.Direction;
        }
        this.IsDoseCalcExist =
          oPrescription.oPresItemBasicPropertiesView.isDoseCalcExist;
        this.DCCalDTTM = oPrescription.oPresItemBasicPropertiesView.DCCalDTTM;
        if (
          this.IsDoseCalcExist &&
          MedicationCommonProfileData.PrescribeConfig != null &&
          MedicationCommonProfileData.PrescribeConfig.EnableDoseCalc
        ) {
          this.DoseCalcExist = '1';
          if (
            (DateTime.GreaterThan(PatientContext.PatientHeightDTTM, this.DCCalDTTM) ||
              DateTime.GreaterThan(PatientContext.PatientWeightDTTM, this.DCCalDTTM)) &&
            !String.Equals(
              this.PrescriptionItemStatus,
              CConstants.CANCELLED,
              StringComparison.InvariantCultureIgnoreCase
            ) &&
            !String.Equals(
              this.PrescriptionItemStatus,
              CConstants.DISCONTINUED,
              StringComparison.InvariantCultureIgnoreCase
            ) &&
            !String.Equals(
              this.PrescriptionItemStatus,
              CConstants.COMPLETED,
              StringComparison.InvariantCultureIgnoreCase
            )
          ) {
            this.DoseCalcExist = '2';
          }
        }
      }
      this.PrescriptionItem = sPrescriptionItem;
      if (oPrescription.oPresItemAdditionalProperties != null) {
        if (
          !String.IsNullOrEmpty(
            oPrescription.oPresItemAdditionalProperties.DateCommenced
          )
        ) {
          this.DateCommenced =
            oPrescription.oPresItemAdditionalProperties.DateCommenced;
        }
      }
      if (oPrescription.oPresItemBasicPropertiesView != null) {
        if (
          oPrescription.oPresItemBasicPropertiesView.DrugProperties != null &&
          oPrescription.oPresItemBasicPropertiesView.DrugProperties.Count > 0
        ) {
          if (
            !String.IsNullOrEmpty(
              oPrescription.oPresItemBasicPropertiesView.DrugProperties[0]
                .DrugPropertyCode
            )
          ) {
            let sDrugCode: string[] =
              oPrescription.oPresItemBasicPropertiesView.DrugProperties[0].DrugPropertyCode.Split(
                ','
              );
            oPrescription.oPresItemBasicPropertiesView.DrugProperties =
              new ObservableCollection<IPPManagePrescSer.DrugProperty>();
            for (let i: number = 0; i < sDrugCode.Length; i++) {
              let sDRugProp: string[] = sDrugCode[i].Split('~');
              let objDrug: IPPManagePrescSer.DrugProperty =
                ObjectHelper.CreateObject(
                  new IPPManagePrescSer.DrugProperty(),
                  { DrugPropertyCode: sDRugProp[0].TrimEnd('~') }
                );
              oPrescription.oPresItemBasicPropertiesView.DrugProperties.Add(
                objDrug
              );
            }
          }
        }
        this.IsinDefiniteOmit =
          oPrescription.oPresItemBasicPropertiesView.IsinDefiniteOmit;
        if (
          DateTime.NotEquals(oPrescription.oPresItemBasicPropertiesView.IsinDefiniteOmitDTTM,
          DateTime.MinValue)
        ) {
          this.IsinDefiniteOmitDTTM =
            oPrescription.oPresItemBasicPropertiesView.IsinDefiniteOmitDTTM;
        }
        if (
          !String.IsNullOrEmpty(
            oPrescription.oPresItemBasicPropertiesView.OmitComments
          )
        ) {
          this.OmitComments =
            oPrescription.oPresItemBasicPropertiesView.OmitComments;
        }
        if (
          !String.IsNullOrEmpty(
            oPrescription.oPresItemBasicPropertiesView.OmittedBy
          )
        ) {
          this.OmittedBy = oPrescription.oPresItemBasicPropertiesView.OmittedBy;
        }
      }
      if (
        oPrescription.oPresItemBasicPropertiesView != null &&
        oPrescription.oPresItemBasicPropertiesView.FormViewParameters != null
      ) {
        this.InfusionDetails = new InfusionLineItemVM();
        this.InfusionDetails.InfusionType = new CListItem();
        this.InfusionDetails.InfusionType.Value =
          oPrescription.oPresItemBasicPropertiesView.FormViewParameters.INFTYCODE;
        this.InfusionDetails.InfusionType.DisplayText = CommonBB.GetText(
          oPrescription.oPresItemBasicPropertiesView.FormViewParameters
            .INFTYCODE,
          InfusionTypeConceptCodeData.ConceptCodes
        );
        this.InfusionDetails.DeliveryDeviceFreetext =
          oPrescription.oPresItemBasicPropertiesView.FormViewParameters.AdminDevice;
        if (
          PatientContext.PrescriptionType == PrescriptionTypes.ForAdministration
        ) {
          this.InfusionDetails.Reviewafter =
            oPrescription.oPresItemBasicPropertiesView.FormViewParameters.ReviewAfterDTTM.ToString();
        }
        if (
          oPrescription.oPresItemBasicPropertiesView.FormViewParameters
            .AdminDeviceData != null
        ) {
          this.InfusionDetails.BackgroundRate =
            oPrescription.oPresItemBasicPropertiesView.FormViewParameters.AdminDeviceData.BackgroundRate;
          if (
            oPrescription.oPresItemBasicPropertiesView.FormViewParameters
              .AdminDeviceData.BackgroundRateUOM != null &&
            !String.IsNullOrEmpty(
              oPrescription.oPresItemBasicPropertiesView.FormViewParameters
                .AdminDeviceData.BackgroundRateUOM.UOMName
            )
          ) {
            this.InfusionDetails.BackgroundRateNumeratorUom =
              ObjectHelper.CreateObject(new CListItem(), {
                DisplayText:
                  oPrescription.oPresItemBasicPropertiesView.FormViewParameters
                    .AdminDeviceData.BackgroundRateUOM.UOMName,
                Value:
                  oPrescription.oPresItemBasicPropertiesView.FormViewParameters.AdminDeviceData.BackgroundRateUOM.UOMId.ToString(),
              });
          }
          if (
            oPrescription.oPresItemBasicPropertiesView.FormViewParameters
              .AdminDeviceData.BackgroundRateDenaminatorUOM != null &&
            !String.IsNullOrEmpty(
              oPrescription.oPresItemBasicPropertiesView.FormViewParameters
                .AdminDeviceData.BackgroundRateDenaminatorUOM.UOMName
            )
          ) {
            this.InfusionDetails.BackgroundRateDinominatorUom =
              ObjectHelper.CreateObject(new CListItem(), {
                DisplayText:
                  oPrescription.oPresItemBasicPropertiesView.FormViewParameters.AdminDeviceData.BackgroundRateDenaminatorUOM.UOMName.ToString(),
                Value:
                  oPrescription.oPresItemBasicPropertiesView.FormViewParameters.AdminDeviceData.BackgroundRateDenaminatorUOM.UOMId.ToString(),
              });
          }
          if (
            !String.IsNullOrEmpty(
              oPrescription.oPresItemBasicPropertiesView.FormViewParameters
                .AdminDeviceData.TopUpDose
            ) &&
            oPrescription.oPresItemBasicPropertiesView.FormViewParameters
              .AdminDeviceData.TopUpDoseUOM != null
          ) {
            this.InfusionDetails.Bolus =
              oPrescription.oPresItemBasicPropertiesView.FormViewParameters.AdminDeviceData.TopUpDose;
            this.InfusionDetails.BolusUOM = ObjectHelper.CreateObject(
              new CListItem(),
              {
                DisplayText:
                  oPrescription.oPresItemBasicPropertiesView.FormViewParameters
                    .AdminDeviceData.TopUpDoseUOM.UOMName,
                Value:
                  oPrescription.oPresItemBasicPropertiesView.FormViewParameters.AdminDeviceData.TopUpDoseUOM.UOMId.ToString(),
              }
            );
          }
          if (
            !String.IsNullOrEmpty(
              oPrescription.oPresItemBasicPropertiesView.FormViewParameters
                .AdminDeviceData.BoosterDose
            ) &&
            oPrescription.oPresItemBasicPropertiesView.FormViewParameters
              .AdminDeviceData.BoosterDoseUOM != null
          ) {
            this.InfusionDetails.Boosterdose =
              oPrescription.oPresItemBasicPropertiesView.FormViewParameters.AdminDeviceData.BoosterDose;
            this.InfusionDetails.Boosterdoseuom = ObjectHelper.CreateObject(
              new CListItem(),
              {
                DisplayText:
                  oPrescription.oPresItemBasicPropertiesView.FormViewParameters
                    .AdminDeviceData.BoosterDoseUOM.UOMName,
                Value:
                  oPrescription.oPresItemBasicPropertiesView.FormViewParameters.AdminDeviceData.BoosterDoseUOM.UOMId.ToString(),
              }
            );
          }
          if (
            oPrescription.oPresItemBasicPropertiesView.FormViewParameters
              .AdminDeviceData.LockOutPeriod > 0 &&
            oPrescription.oPresItemBasicPropertiesView.FormViewParameters
              .AdminDeviceData.LockOutPeriodUOM != null
          ) {
            this.InfusionDetails.LockOutPeriod =
              oPrescription.oPresItemBasicPropertiesView.FormViewParameters.AdminDeviceData.LockOutPeriod;
            this.InfusionDetails.LockoutDuration = ObjectHelper.CreateObject(
              new CListItem(),
              {
                DisplayText:
                  oPrescription.oPresItemBasicPropertiesView.FormViewParameters
                    .AdminDeviceData.LockOutPeriodUOM.UOMName,
                Value:
                  oPrescription.oPresItemBasicPropertiesView.FormViewParameters.AdminDeviceData.LockOutPeriodUOM.UOMId.ToString(),
              }
            );
          }
        }
        if (
          oPrescription.oPresItemBasicPropertiesView.FormViewParameters
            .IntravenousInfusionData != null
        ) {
          this.InfusionDetails.TargetUpperSatRange =
            oPrescription.oPresItemBasicPropertiesView.FormViewParameters.IntravenousInfusionData.TargetSaturationUpper;
          this.InfusionDetails.TargetLowerSatRange =
            oPrescription.oPresItemBasicPropertiesView.FormViewParameters.IntravenousInfusionData.TargetSaturationLower;
          this.InfusionDetails.MaxDose =
            oPrescription.oPresItemBasicPropertiesView.FormViewParameters.IntravenousInfusionData.MaxDose;
          this.InfusionDetails.Lumen =
            oPrescription.oPresItemBasicPropertiesView.FormViewParameters.IntravenousInfusionData.Lumen;
          this.InfusionDetails.Humidification =
            oPrescription.oPresItemBasicPropertiesView.FormViewParameters.IntravenousInfusionData.HUMIDCode;
          if (
            !String.IsNullOrEmpty(
              oPrescription.oPresItemBasicPropertiesView.FormViewParameters
                .IntravenousInfusionData.DeliveryDevice
            )
          ) {
            this.InfusionDetails.DeliveryDevice = ObjectHelper.CreateObject(
              new CListItem(),
              {
                DisplayText:
                  oPrescription.oPresItemBasicPropertiesView.FormViewParameters
                    .IntravenousInfusionData.DeliveryDevice,
                Value: String.Empty,
              }
            );
          }
          if (
            oPrescription.oPresItemBasicPropertiesView.FormViewParameters
              .IntravenousInfusionData.IsOxygen == '1'
          )
            this.InfusionDetails.IsOxygen = true;
          else this.InfusionDetails.IsOxygen = false;
          if (
            !String.IsNullOrEmpty(
              oPrescription.oPresItemBasicPropertiesView.FormViewParameters
                .IntravenousInfusionData.IsOnGoing
            )
          )
            this.InfusionDetails.IsOnGoing =
              oPrescription.oPresItemBasicPropertiesView.FormViewParameters.IntravenousInfusionData.IsOnGoing;
          else this.InfusionDetails.IsOnGoing = String.Empty;
          if (
            PatientContext.PrescriptionType ==
            PrescriptionTypes.ForAdministration
          ) {
            this.InfusionDetails.Reviewafter =
              oPrescription.oPresItemBasicPropertiesView.FormViewParameters.ReviewAfterDTTM.ToString();
          }
          this.InfusionDetails.ConcentrationFreeText =
            oPrescription.oPresItemBasicPropertiesView.FormViewParameters.IntravenousInfusionData.Concentration.ToString();
          if (
            !String.IsNullOrEmpty(
              oPrescription.oPresItemBasicPropertiesView.FormViewParameters
                .IntravenousInfusionData.LowConcentration
            )
          )
            this.InfusionDetails.LowConcentration =
              oPrescription.oPresItemBasicPropertiesView.FormViewParameters.IntravenousInfusionData.LowConcentration;
          if (
            !String.IsNullOrEmpty(
              oPrescription.oPresItemBasicPropertiesView.FormViewParameters
                .IntravenousInfusionData.UpperConcentration
            )
          )
            this.InfusionDetails.UpperConcentration =
              oPrescription.oPresItemBasicPropertiesView.FormViewParameters.IntravenousInfusionData.UpperConcentration;
          if (
            oPrescription.oPresItemBasicPropertiesView.FormViewParameters
              .IntravenousInfusionData.LowConcentrationUOMOID != null &&
            !String.IsNullOrEmpty(
              oPrescription.oPresItemBasicPropertiesView.FormViewParameters
                .IntravenousInfusionData.LowConcentrationUOMOID.UOMName
            )
          ) {
            this.InfusionDetails.LowConcentrationUOM =
              ObjectHelper.CreateObject(new CListItem(), {
                DisplayText:
                  oPrescription.oPresItemBasicPropertiesView.FormViewParameters
                    .IntravenousInfusionData.LowConcentrationUOMOID.UOMName,
                Value:
                  oPrescription.oPresItemBasicPropertiesView.FormViewParameters.IntravenousInfusionData.LowConcentrationUOMOID.UOMId.ToString(),
              });
          }
          if (
            oPrescription.oPresItemBasicPropertiesView.FormViewParameters
              .IntravenousInfusionData.UpperConcentrationUOMOID != null &&
            !String.IsNullOrEmpty(
              oPrescription.oPresItemBasicPropertiesView.FormViewParameters
                .IntravenousInfusionData.UpperConcentrationUOMOID.UOMName
            )
          ) {
            this.InfusionDetails.UpperConcentrationUOM =
              ObjectHelper.CreateObject(new CListItem(), {
                DisplayText:
                  oPrescription.oPresItemBasicPropertiesView.FormViewParameters.IntravenousInfusionData.UpperConcentrationUOMOID.UOMName.ToString(),
                Value:
                  oPrescription.oPresItemBasicPropertiesView.FormViewParameters.IntravenousInfusionData.UpperConcentrationUOMOID.UOMId.ToString(),
              });
          }
          this.InfusionDetails.Rate =
            oPrescription.oPresItemBasicPropertiesView.FormViewParameters.IntravenousInfusionData.Rate;
          this.InfusionDetails.UpperRate =
            oPrescription.oPresItemBasicPropertiesView.FormViewParameters.IntravenousInfusionData.UpperRate;
          if (
            oPrescription.oPresItemBasicPropertiesView.FormViewParameters
              .IntravenousInfusionData.RateUOM != null &&
            !String.IsNullOrEmpty(
              oPrescription.oPresItemBasicPropertiesView.FormViewParameters
                .IntravenousInfusionData.RateUOM.UOMName
            )
          ) {
            this.InfusionDetails.InfRateNumeratorUom =
              ObjectHelper.CreateObject(new CListItem(), {
                DisplayText:
                  oPrescription.oPresItemBasicPropertiesView.FormViewParameters
                    .IntravenousInfusionData.RateUOM.UOMName,
                Value:
                  oPrescription.oPresItemBasicPropertiesView.FormViewParameters.IntravenousInfusionData.RateUOM.UOMId.ToString(),
              });
          }
          if (
            oPrescription.oPresItemBasicPropertiesView.FormViewParameters
              .IntravenousInfusionData.RateDenominatorUOM != null &&
            !String.IsNullOrEmpty(
              oPrescription.oPresItemBasicPropertiesView.FormViewParameters
                .IntravenousInfusionData.RateDenominatorUOM.UOMName
            )
          ) {
            this.InfusionDetails.InfRateDinominatorUom =
              ObjectHelper.CreateObject(new CListItem(), {
                DisplayText:
                  oPrescription.oPresItemBasicPropertiesView.FormViewParameters.IntravenousInfusionData.RateDenominatorUOM.UOMName.ToString(),
                Value:
                  oPrescription.oPresItemBasicPropertiesView.FormViewParameters.IntravenousInfusionData.RateDenominatorUOM.UOMId.ToString(),
              });
          }
          if (
            !String.IsNullOrEmpty(
              oPrescription.oPresItemBasicPropertiesView.FormViewParameters
                .IntravenousInfusionData.InfusionPeriod
            )
          )
            this.InfusionDetails.InfusionPeriod = Convert.ToInt64(
              oPrescription.oPresItemBasicPropertiesView.FormViewParameters
                .IntravenousInfusionData.InfusionPeriod
            );
          if (
            oPrescription.oPresItemBasicPropertiesView.FormViewParameters
              .IntravenousInfusionData.InfusionPeriodUOM != null &&
            !String.IsNullOrEmpty(
              oPrescription.oPresItemBasicPropertiesView.FormViewParameters
                .IntravenousInfusionData.InfusionPeriodUOM.UOMName
            )
          ) {
            this.InfusionDetails.InfusionPeriodUom = ObjectHelper.CreateObject(
              new CListItem(),
              {
                DisplayText:
                  oPrescription.oPresItemBasicPropertiesView.FormViewParameters
                    .IntravenousInfusionData.InfusionPeriodUOM.UOMName,
                Value:
                  oPrescription.oPresItemBasicPropertiesView.FormViewParameters.IntravenousInfusionData.InfusionPeriodUOM.UOMId.ToString(),
              }
            );
          }
          if (
            oPrescription.oPresItemBasicPropertiesView.FormViewParameters
              .IntravenousInfusionData.Fluid != null &&
            oPrescription.oPresItemBasicPropertiesView.FormViewParameters
              .IntravenousInfusionData.Fluid.OID > 0
          ) {
            this.InfusionDetails.FluidSelectvalue = ObjectHelper.CreateObject(
              new CListItem(),
              {
                DisplayText:
                  oPrescription.oPresItemBasicPropertiesView.FormViewParameters
                    .IntravenousInfusionData.Fluid.Name,
                Value:
                  oPrescription.oPresItemBasicPropertiesView.FormViewParameters.IntravenousInfusionData.Fluid.OID.ToString(),
              }
            );
          } else {
            this.InfusionDetails.FluidFreetext =
              oPrescription.oPresItemBasicPropertiesView.FormViewParameters.IntravenousInfusionData.Fluid.Name;
          }
          this.InfusionDetails.FluidVolume =
            oPrescription.oPresItemBasicPropertiesView.FormViewParameters.IntravenousInfusionData.Volume;
          if (
            oPrescription.oPresItemBasicPropertiesView.FormViewParameters
              .IntravenousInfusionData.VolumeUOM != null &&
            !String.IsNullOrEmpty(
              oPrescription.oPresItemBasicPropertiesView.FormViewParameters
                .IntravenousInfusionData.VolumeUOM.UOMName
            )
          ) {
            this.InfusionDetails.VolumeUOM = ObjectHelper.CreateObject(
              new CListItem(),
              {
                DisplayText:
                  oPrescription.oPresItemBasicPropertiesView.FormViewParameters
                    .IntravenousInfusionData.VolumeUOM.UOMName,
                Value:
                  oPrescription.oPresItemBasicPropertiesView.FormViewParameters.IntravenousInfusionData.VolumeUOM.UOMId.ToString(),
              }
            );
          }
          this.IsLastItem =
            oPrescription.oPresItemBasicPropertiesView.FormViewParameters.IntravenousInfusionData.IsLastItem;
        }
        if (
          oPrescription != null &&
          oPrescription.oPresItemBasicPropertiesView != null &&
          oPrescription.oPresItemBasicPropertiesView.FormViewParameters !=
            null &&
          oPrescription.oPresItemBasicPropertiesView.FormViewParameters
            .SequenceData != null
        ) {
          this.ParentPrescriptionItemOID =
            oPrescription.oPresItemBasicPropertiesView.FormViewParameters
              .SequenceData.ParentPrescriptionItemOID > 0
              ? oPrescription.oPresItemBasicPropertiesView.FormViewParameters
                  .SequenceData.ParentPrescriptionItemOID
              : 0;
          this.IsLastItem =
            oPrescription.oPresItemBasicPropertiesView.FormViewParameters.SequenceData.IsLastItem;
        }
      }
      this.PrescriptionItemViewDetails = oPrescription;
    }
    return this;
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
    if (DateTime.Equals(StartDate.Date, DateTime.MinValue.Date)) return String.Empty;
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
  public GetDomainValuesForSeqMez(): void {
    let sDomainCodes: string = String.Empty;
    sDomainCodes =
      ValueDomain.MedicationAdministrationSlotStatus +
      ',' +
      ValueDomain.INFUSIONTYPE +
      ',' +
      ValueDomain.PrescriptionItmStatus;
    ProcessRTE.GetHierarchicalValuesByDomains(
      CConstants.CodingSchemeName,
      CConstants.Version,
      CConstants.FilterType,
      ContextInfo.Culture,
      sDomainCodes,
      (s,e) => {this.OnRTEResultSeqMez(s);}
    );
  }
  OnRTEResultSeqMez(args: RTEEventargs): void {
    if (String.IsNullOrEmpty(args.Request) || args.Result == null) return;
    if (args.Result instanceof Dictionary) {
      let objResult: Dictionary<string, List<CListItem>> = <
        Dictionary<string, List<CListItem>>
      >args.Result;
      if (
        String.Equals(
          args.Request,
          ValueDomain.MedicationAdministrationSlotStatus +
            ',' +
            ValueDomain.INFUSIONTYPE +
            ',' +
            ValueDomain.PrescriptionItmStatus
        )
      ) {
        DoseCalcConceptCodeData.ConceptCodes =
          new ObservableCollection<CValuesetTerm>();
        objResult.forEach((objDomainDetail) => {
          if (
            objDomainDetail.Value != null &&
            objDomainDetail.Value.Count > 0
          ) {
            switch (objDomainDetail.Key) {
              case ValueDomain.MedicationAdministrationSlotStatus: {
                MedicationCommonConceptCodeData.MedAdminSlotStatus =
                  new ObservableCollection<CValuesetTerm>();
                if (
                  objDomainDetail.Value != null &&
                  objDomainDetail.Value.Count > 0
                ) {
                  objDomainDetail.Value.forEach((oCListItem) => {
                    MedicationCommonConceptCodeData.MedAdminSlotStatus.Add(
                      ObjectHelper.CreateObject(new CValuesetTerm(), {
                        csCode: oCListItem.Value,
                        csDescription: oCListItem.DisplayText,
                      })
                    );
                  });
                }
                break;
              }
              case ValueDomain.INFUSIONTYPE:
                InfusionTypeConceptCodeData.ConceptCodes =
                  new ObservableCollection<CValuesetTerm>();
                objDomainDetail.Value.forEach((oCListItem) => {
                  InfusionTypeConceptCodeData.ConceptCodes.Add(
                    ObjectHelper.CreateObject(new CValuesetTerm(), {
                      csCode: oCListItem.Value,
                      csDescription: oCListItem.DisplayText,
                    })
                  );
                });
                break;
              case ValueDomain.PrescriptionItmStatus:
                MedicationCommonConceptCodeData.ConceptCodes =
                  new ObservableCollection<CValuesetTerm>();
                objDomainDetail.Value.forEach((oCListItem) => {
                  MedicationCommonConceptCodeData.ConceptCodes.Add(
                    ObjectHelper.CreateObject(new CValuesetTerm(), {
                      csCode: oCListItem.Value,
                      csDescription: oCListItem.DisplayText,
                    })
                  );
                });
                break;
            }
          }
        });
      }
    }
  }
}
export module CommPrescriptionItemViewVM {
  export enum EnumVals {
    CC_EXPJAN = 1,
    CC_EXPFEB = 2,
    CC_EXPMAR = 3,
    CC_EXPAPR = 4,
    CC_EXPMAY = 5,
    CC_EXPJUNE = 6,
    CC_EXPJULY = 7,
    CC_EXPAUG = 8,
    CC_EXPSEP = 9,
    CC_EXPOCT = 10,
    CC_EXPNOV = 11,
    CC_EXPDEC = 12,
  }
}
