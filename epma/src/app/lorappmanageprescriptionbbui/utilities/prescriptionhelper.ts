import { Component, OnInit } from '@angular/core';
import {
  StringBuilder,
  ProfileFactoryType,
  ContextManager,
  Convert,
  AppActivity,
  SLQueryCollection,
  DayOfWeek,
} from 'epma-platform/services';
import {
  Level,
  ProfileContext,
  OnProfileResult,
  IProfileProp,
  Byte,
  Decimal,
  decimal,
  Double,
  Float,
  Int64,
  long,
  Long,
  StringComparison,
  AppDialogEventargs,
  AppDialogResult,
  DelegateArgs,
  DialogComponentArgs,
  WindowButtonType,
  CListItem,
  ObservableCollection,
  List,
  Visibility,
  HtmlPage,
  enmMultiCampusPattern,
} from 'epma-platform/models';
import { AppDialog } from 'epma-platform/controls';
import { HelperService } from '../../shared/epma-platform/soap-client/helper.service';
import 'epma-platform/stringextension';
import DateTime, { DateTimeKind } from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import {
  MessageEventArgs,
  MessageBoxResult,
  iMessageBox,
  MessageBoxButton,
  MessageBoxType,
  MessageBoxDelegate,
} from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
import { PrescriptionItemVM } from '../viewmodel/PrescriptionItemVM';
import {
  CConstants,
  ConstDurationUOM,
  DoseTypeCode,
  PrescriptionItemStatusCodes,
  PrescriptionTypes,
} from './constants';
import {
  AppSessionInfo,
  ClerkFormViewDeftBehaviour,
  ContextInfo,
  PatientContext,
} from 'src/app/lorappcommonbb/utilities/globalvariable';
import { MedChartData } from 'src/app/lorappmedicationcommonbb/utilities/globalvariable';
import { MedicationPrescriptionHelper } from 'src/app/lorappmedicationcommonbb/utilities/medicationprescriptionhelper';
import { MedicationCommonProfileData } from 'src/app/lorappmedicationcommonbb/utilities/profiledata';
import { Common } from './common';
import * as IPPMAManagePrescSer from '../../shared/epma-platform/soap-client/IPPMAManagePrescriptionWS';
import { IPPMABaseVM } from '../viewmodel/ippmabasevm';
import {
  FormviewerCommonData,
  GlobalVariable,
  WebServiceURL,
} from './globalvariable';
import { Resource } from '../resource';
import { Busyindicator } from 'src/app/lorappcommonbb/busyindicator';
import { CommonBB } from 'src/app/lorappcommonbb/utilities/common';
import {
  BasicDetailsVM,
  InfusionVM,
  SequenceDetail,
} from '../viewmodel/BasicDetailsVM';
import { ProfileData } from './profiledata';
import {
  CReqMsgGetPatientMedicationCount,
  DrugItemInputData,
  GetPatientMedicationCountCompletedEventArgs,
  ManagePrescriptionWSSoapClient,
} from 'src/app/shared/epma-platform/soap-client/ManagePrescriptionWS';
import {
  GrdAdminstrativeTimesCols,
  ScheduleDetailsCols,
} from 'src/app/lorappmedicationcommonbb/viewmodel/prescriptionitemdetailsvm';
import { MCommonBB } from 'src/app/lorappmedicationcommonbb/utilities/common';
import { ScheduleDetailsSteppedVM } from 'src/app/lorappmedicationcommonbb/viewmodel/scheduledetailsvm';
import { MedicationCommonBB } from 'src/app/lorappmedicationcommonbb/utilities/medicationcommonbb';
import { FormViewerVM } from '../viewmodel/formviewervm';
import { PresItemDRCVM } from '../viewmodel/PresItemDRCVM';
import { MultipleDoseDetail } from '../viewmodel/MultipleDoseDetail';
import { EnumDrugOptions } from '../../shared/epma-platform/soap-client/IPPMAManagePrescriptionWS';
import { DoseCalculation } from '../model/common';
import {
  CReqMsgGetEncountersPaging,
  Encounter,
  EncounterWSWSSoapClient,
  GetEncountersPagingCompletedEventArgs,
  PagingDynamicSQL,
} from 'src/app/shared/epma-platform/soap-client/EncounterWS';
import { WizardContextCollection } from 'src/app/shared/epma-platform/services/ContextCollection.service';
import 'epma-platform/booleanextension';
import 'epma-platform/numberextension';
import 'epma-platform/stringextension';
import {iMath} from 'epma-platform/mathextension';
import 'epma-platform/arrayextension';
import { HghtWghtPrompt } from 'src/app/lorappslprofiletypes/medication';
export class PrescriptionHelper {
  public static GetDoseCalulatorDetails(
    oSelectedItem: PrescriptionItemVM
  ): Object {
    if (oSelectedItem != null) {
      let oParam: string[] = new Array(7);
      oParam[0] =
        oSelectedItem.FormViewerDetails.BasicDetails.IdentifyingOID.ToString();
      oParam[1] = oSelectedItem.FormViewerDetails.BasicDetails.IdentifyingType;
      oParam[2] = oSelectedItem.PrescribableItemOID.ToString();
      oParam[3] = oSelectedItem.FormViewerDetails.BasicDetails.Dose;
      if (oSelectedItem.FormViewerDetails.BasicDetails.DoseUOM != null) {
        oParam[4] = oSelectedItem.FormViewerDetails.BasicDetails.DoseUOM.Value;
        oParam[5] =
          oSelectedItem.FormViewerDetails.BasicDetails.DoseUOM.DisplayText;
      } else {
        oParam[4] = String.Empty;
        oParam[5] = String.Empty;
      }
      oParam[6] =
        oSelectedItem.FormViewerDetails.BasicDetails.DoseType != null
          ? oSelectedItem.FormViewerDetails.BasicDetails.DoseType.Value
          : String.Empty;
      let returnValue: Object = HtmlPage.Window.Invoke(
        'OpenDoseCalculator',
        oParam
      );
      if (
        String.Compare(
          oSelectedItem.FormViewerDetails.BasicDetails.DoseType.Value,
          DoseTypeCode.NORMAL
        ) == 0 &&
        returnValue != null
      ) {
        let arrReturnValue: string[] = ObjectHelper.ToString(returnValue).Split(';');
        if (arrReturnValue.length > 0) {
          oSelectedItem.FormViewerDetails.BasicDetails.bDoseChange = false;
          oSelectedItem.FormViewerDetails.BasicDetails.Dose =
            arrReturnValue[11];
          oSelectedItem.FormViewerDetails.BasicDetails.DoseUOM =
            ObjectHelper.CreateObject(new CListItem(), {
              DisplayText: arrReturnValue[8],
              Value: arrReturnValue[7],
            });
          oSelectedItem.FormViewerDetails.BasicDetails.bDoseFromCal = true;
          if (oSelectedItem.DoseCalculationDetails == null)
            oSelectedItem.DoseCalculationDetails = new DoseCalculation();
          oSelectedItem.DoseCalculationDetails.Height = arrReturnValue[0];
          oSelectedItem.DoseCalculationDetails.Weight = arrReturnValue[1];
          oSelectedItem.DoseCalculationDetails.BSAFormula = arrReturnValue[2];
          oSelectedItem.DoseCalculationDetails.BSA = arrReturnValue[3];
          oSelectedItem.DoseCalculationDetails.RequestDose = arrReturnValue[6];
          oSelectedItem.DoseCalculationDetails.ReqDoseUOMOID = Convert.ToInt64(
            arrReturnValue[7]
          );
          oSelectedItem.DoseCalculationDetails.ReqDoseUOMName =
            arrReturnValue[8];
          oSelectedItem.DoseCalculationDetails.RequestDosePer =
            arrReturnValue[9];
          oSelectedItem.FormViewerDetails.BasicDetails.OldDose =
            oSelectedItem.DoseCalculationDetails.CalculatedDose =
              arrReturnValue[10];
          oSelectedItem.DoseCalculationDetails.OrderedAmount =
            arrReturnValue[11];
          oSelectedItem.DoseCalculationDetails.RoundedTo = arrReturnValue[12];
          oSelectedItem.DoseCalculationDetails.OverrideReason =
            arrReturnValue[15];
          if (
            !String.IsNullOrEmpty(arrReturnValue[16]) &&
            !String.IsNullOrEmpty(arrReturnValue[17])
          ) {
            let nGestationdays: number =
              Convert.ToInt16(arrReturnValue[16]) * 7 +
              Convert.ToInt16(arrReturnValue[17]);
            oSelectedItem.DoseCalculationDetails.USSGestationDays =
              nGestationdays.ToString();
          } else if (
            !String.IsNullOrEmpty(arrReturnValue[16]) &&
            String.IsNullOrEmpty(arrReturnValue[17])
          ) {
            oSelectedItem.DoseCalculationDetails.USSGestationDays =
              arrReturnValue[16];
          }
        }
      }
      returnValue = HtmlPage.Window.Invoke('GetDataItemRecordedDate', null);
      if (returnValue != null)
        returnValue =  ObjectHelper.ToString(<Object>returnValue).Replace(',', ';');
      return returnValue;
    }
    return null;
  }
  public static GetFBDetails(PatientOID: number, EncounerOID: number): void {
    let oParam: string[] = new Array(2);
    oParam[0] = PatientOID.ToString();
    oParam[1] = EncounerOID.ToString();
    //HtmlPage.Window.Invoke('OpenFBChartView', oParam);
    HtmlPage.Window.Invoke('OpenFBChartView', oParam[0],oParam[1]);
  }
  public static GetPatientMedications(
    PresType: string,
    cDisCancel: string,
    EncounterOID: number,
    objBaseVm: IPPMABaseVM,
    oGetPatientMedicationListCompleted: Function
  ): void {
    let objServiceProxy: IPPMAManagePrescSer.IPPMAManagePrescriptionWSSoapClient =
      new IPPMAManagePrescSer.IPPMAManagePrescriptionWSSoapClient();
    objServiceProxy.GetPatientMedicationListCompleted = (s, e) => {
      oGetPatientMedicationListCompleted(s, e);
    };
    let objReqList: IPPMAManagePrescSer.CReqMsgGetPatientMedicationList =
      new IPPMAManagePrescSer.CReqMsgGetPatientMedicationList();
    objReqList.oMedicationListCriteriaBC =
      new IPPMAManagePrescSer.MedicationListCriteria();
    objReqList.oMedicationListCriteriaBC.PatientOID = PatientContext.PatientOID;
    if (
      PatientContext.ClerkFormViewDefaultBehavior ==
      ClerkFormViewDeftBehaviour.LaunchFormMandatory
    ) {
      objReqList.oMedicationListCriteriaBC.CAPresType =
        PrescriptionTypes.Clerking;
    } else {
      objReqList.oMedicationListCriteriaBC.CAPresType =
        PatientContext.PrescriptionType = PatientContext.PrescriptionType == ""?PatientContext.PType : PatientContext.PrescriptionType;
    }
    objReqList.oMedicationListCriteriaBC.McVersion = AppSessionInfo.AMCV;
    objReqList.oMedicationListCriteriaBC.EncounterOID = EncounterOID;
    objReqList.oMedicationListCriteriaBC.ServiceOID = MedChartData.ServiceOID;
    objReqList.oMedicationListCriteriaBC.LocationOID = MedChartData.LocationOID;
    objReqList.oMedicationListCriteriaBC.sMenuCode = !String.IsNullOrEmpty(
      SLQueryCollection.GetQueryStringValue('MenuCode')
    )
      ? SLQueryCollection.GetQueryStringValue('MenuCode')
      : String.Empty;
    // objReqList.oMedicationListCriteriaBC.sMenuCode = 'MN_MEDOUTPATSL_P2';
    if (
      String.Compare(
        PresType,
        'CC_FRADMINSTN',
        StringComparison.InvariantCultureIgnoreCase
      ) == 0
    )
      PresType = 'CC_FOR_ADMIN';
    objReqList.oMedicationListCriteriaBC.PrescriptionType = PresType;
    objReqList.oMedicationListCriteriaBC.ProfileDiscontinuedDrugFlag =
      cDisCancel;
    if (objBaseVm.HitCount == 0) {
      let sImageList: string;
      objReqList.oMedicationListCriteriaBC.SealRecordList =
        MedicationPrescriptionHelper.GetSealDrugs(
          CConstants.PatConf_Pres,
          (o) => {
            sImageList = o;
          }
        );
      objReqList.oMedicationListCriteriaBC.SealImageList = sImageList;
      objBaseVm.IppSealRecordList =
        objReqList.oMedicationListCriteriaBC.SealRecordList;
      objBaseVm.IppSealImageList =
        objReqList.oMedicationListCriteriaBC.SealImageList;
      objBaseVm.HitCount += 1;
    } else {
      objReqList.oMedicationListCriteriaBC.SealRecordList =
        objBaseVm.IppSealRecordList;
      objReqList.oMedicationListCriteriaBC.SealImageList =
        objBaseVm.IppSealImageList;
    }
    let nDrugsExpDuration: number = 0;
    if (MedicationCommonProfileData.MedViewConfig != null)
      nDrugsExpDuration = Convert.ToInt32(
        PrescriptionHelper.GetDuration(
          MedicationCommonProfileData.MedViewConfig.DrugsExpiryDuration
        )
      );
    objReqList.oMedicationListCriteriaBC.ProfileHoldDuration =
      nDrugsExpDuration;
    objReqList.oMedicationListCriteriaBC.currentEncounterOID =
      PatientContext.EncounterOid;
     objReqList.oMedicationListCriteriaBC.IsResolutionGird = 0;    
    if (
      PatientContext.IsINFUSIONON &&
      ((objBaseVm != null &&
        objBaseVm.IsResolutionGirdLoading &&
        !String.IsNullOrEmpty(PresType) &&
        String.Equals(
          PatientContext.PrescriptionType == ""?PatientContext.PType : PatientContext.PrescriptionType,
          PresType,
          StringComparison.InvariantCultureIgnoreCase
        )) ||
        (String.Equals(
          PatientContext.PrescriptionType == ""?PatientContext.PType : PatientContext.PrescriptionType,
          PrescriptionTypes.Clerking,
          StringComparison.InvariantCultureIgnoreCase
        ) &&
          MedicationCommonProfileData.PrescribeConfig != null &&
          !String.IsNullOrEmpty(
            MedicationCommonProfileData.PrescribeConfig.ClerkFormViewDefautCode
          ) &&
          String.Equals(
            MedicationCommonProfileData.PrescribeConfig.ClerkFormViewDefautCode,
            ClerkFormViewDeftBehaviour.LaunchFormMandatory.ToString(),
            StringComparison.InvariantCultureIgnoreCase
          )))
    ) {
      objReqList.oMedicationListCriteriaBC.IsResolutionGird = 1;
      objBaseVm.IsResolutionGirdLoading = false;
    }
    objReqList.oContextInformation = Common.FillContext();
    objServiceProxy.GetPatientMedicationListAsync(objReqList);
  }
  public static GetGPConnectMedications(
    objBaseVm: IPPMABaseVM,
    oGetGPConnectAdministrationCompleted: Function
  ): void {
    if (PatientContext.IsPDSTraced) {
      let objServiceProxy: IPPMAManagePrescSer.IPPMAManagePrescriptionWSSoapClient =
        new IPPMAManagePrescSer.IPPMAManagePrescriptionWSSoapClient();
      objServiceProxy.GetGPConnectAdministrationCompleted = (s, e) => {
        oGetGPConnectAdministrationCompleted(s, e);
      };
      let objReqList: IPPMAManagePrescSer.CReqMsgGetGPConnectAdministration =
        new IPPMAManagePrescSer.CReqMsgGetGPConnectAdministration();
      objReqList.patientOidBC = PatientContext.PatientOID;
      objReqList.nhsNumberBC = GlobalVariable.NhsNumber;
      objReqList.encounterOidBC = PatientContext.EncounterOid;
      objReqList.prescriptionTypeBC =
        String.Equals(
          PatientContext.PrescriptionType == ""?PatientContext.PType : PatientContext.PrescriptionType,
          PrescriptionTypes.ForAdministration,
          StringComparison.CurrentCultureIgnoreCase
        ) &&
        PatientContext.ClerkFormViewDefaultBehavior ==
          ClerkFormViewDeftBehaviour.LaunchFormMandatory
          ? PrescriptionTypes.Clerking
          : PatientContext.PrescriptionType == ""?PatientContext.PType : PatientContext.PrescriptionType;
      objReqList.oContextInformation = Common.FillContext();
      objServiceProxy.GetGPConnectAdministrationAsync(objReqList);
    } else {
      if (objBaseVm != null) {
        objBaseVm.GPConnectGridNoRecordsText =
          Resource.MedicationForm.NotTracedMessage;
      }
      Busyindicator.SetStatusIdle('GpConnectList');
    }
  }
  public static GetGPConnectAdditionalDetail(
    medicationStatementid: string,
    oGetGPConnectAdditionalDetailCompleted: Function
  ): void {
    let objServiceProxy: IPPMAManagePrescSer.IPPMAManagePrescriptionWSSoapClient =
      new IPPMAManagePrescSer.IPPMAManagePrescriptionWSSoapClient();
    objServiceProxy.GetGPConnectAdditionalDetailCompleted = (s, e) => {
      oGetGPConnectAdditionalDetailCompleted(s, e);
    };
    let objReqList: IPPMAManagePrescSer.CReqMsgGetGPConnectAdditionalDetail =
      new IPPMAManagePrescSer.CReqMsgGetGPConnectAdditionalDetail();
    objReqList.patientOidBC = PatientContext.PatientOID;
    objReqList.nhsNumberBC = GlobalVariable.NhsNumber;
    objReqList.medicationStatementIdBC = medicationStatementid;
    objReqList.oContextInformation = Common.FillContext();
    objServiceProxy.GetGPConnectAdditionalDetailAsync(objReqList);
  }
  public static GetIPPMADrugInputData(
    oDrugItemInputData: DrugItemInputData
  ): IPPMAManagePrescSer.DrugItemInputData {
    let IPPDrugItemInputDataBC: IPPMAManagePrescSer.DrugItemInputData =
      ObjectHelper.CreateObject(new IPPMAManagePrescSer.DrugItemInputData(), {
        AliasName: oDrugItemInputData.AliasName,
        EPRFilterList: oDrugItemInputData.EPRFilterList,
        FavouritesDetailOID: oDrugItemInputData.FavouritesDetailOID,
        FormOID: oDrugItemInputData.FormOID,
        FormularyNote: oDrugItemInputData.FormularyNote,
        IdentifyingName: oDrugItemInputData.IdentifyingName,
        IdentifyingOID: oDrugItemInputData.IdentifyingOID,
        IdentifyingType: oDrugItemInputData.IdentifyingType,
        IsAccessContraint: oDrugItemInputData.IsAccessContraint,
        IsControllDrug: oDrugItemInputData.IsControllDrug,
        IsFormulary: oDrugItemInputData.IsFormulary,
        IsPrescribeByBrand: oDrugItemInputData.IsPrescribeByBrand,
        IsTechValidateCA: oDrugItemInputData.IsTechValidateCA,
        ItemType: oDrugItemInputData.ItemType,
        ITMSUBTYP: oDrugItemInputData.ITMSUBTYP,
        LastModifiedAt: oDrugItemInputData.LastModifiedAt,
        LorenzoID: oDrugItemInputData.LorenzoID,
        MCVersionNo: oDrugItemInputData.MCVersionNo,
        nMAXRows: oDrugItemInputData.nMAXRows,
        NonCatItemReason: oDrugItemInputData.NonCatItemReason,
        nPageNo: oDrugItemInputData.nPageNo,
        nPageSize: oDrugItemInputData.nPageSize,
        OperationMode: oDrugItemInputData.OperationMode,
        p: oDrugItemInputData.p,
        PageIndex: oDrugItemInputData.PageIndex,
        PrescribableItemListOID: oDrugItemInputData.PrescribableItemListOID,
        q: oDrugItemInputData.q,
        r: oDrugItemInputData.r,
        RouteOID: oDrugItemInputData.RouteOID,
        s: oDrugItemInputData.s,
        SealImage: oDrugItemInputData.SealImage,
        SealImageList: oDrugItemInputData.SealImageList,
        SealRecordList: oDrugItemInputData.SealRecordList,
        SealType: oDrugItemInputData.SealType,
        SourceDataProviderType: oDrugItemInputData.SourceDataProviderType,
        TechQtyUomName: oDrugItemInputData.TechQtyUomName,
        IndicationOverrideReson: oDrugItemInputData.IndicationOverrideReson,
      });
    if (oDrugItemInputData.Options == EnumDrugOptions.ALL) {
      IPPDrugItemInputDataBC.Options = IPPMAManagePrescSer.EnumDrugOptions.ALL;
    } else if (
      oDrugItemInputData.Options == EnumDrugOptions.ALTERNATE_OPTIONS
    ) {
      IPPDrugItemInputDataBC.Options =
        IPPMAManagePrescSer.EnumDrugOptions.ALTERNATE_OPTIONS;
    } else if (
      oDrugItemInputData.Options == EnumDrugOptions.PRESCRIBING_OPTIONS
    ) {
      IPPDrugItemInputDataBC.Options =
        IPPMAManagePrescSer.EnumDrugOptions.PRESCRIBING_OPTIONS;
    } else if (oDrugItemInputData.Options == EnumDrugOptions.RELATED_OPTIONS) {
      IPPDrugItemInputDataBC.Options =
        IPPMAManagePrescSer.EnumDrugOptions.RELATED_OPTIONS;
    }
    if (oDrugItemInputData.MatchIdentifyingTypes != null) {
      IPPDrugItemInputDataBC.MatchIdentifyingTypes =
        new IPPMAManagePrescSer.ArrayOfString();
      oDrugItemInputData.MatchIdentifyingTypes.forEach(
        (sMatchIdentifyingTypes) => {
          IPPDrugItemInputDataBC.MatchIdentifyingTypes.Add(
            sMatchIdentifyingTypes
          );
        }
      );
    }
    return IPPDrugItemInputDataBC;
  }
  public static GetDuration(period: string): number {
    let duration: number = 0;
    if (period != null) {
      let sSplit: string[] = period.Split('~');
      if (sSplit.length == 2) {
        let sPeriod: string = sSplit[1];
        if (
          Number.TryParse(sSplit[0], (o) => {
            duration = o;
          })
        ) {
          return PrescriptionHelper.GetDurtion(sPeriod, duration);
        }
      }
    }
    return 100;
  }
  private static GetDurtion(period: string, periodValue: number): number {
    let curDate: DateTime = CommonBB.GetServerDateTime().Date;
    let newDate: DateTime = CommonBB.GetServerDateTime().Date;
    let days: number = 0;
    switch (period) {
      case 'CC_MEDDRSN1':
        days = periodValue;
        break;
      case 'CC_MEDDRSN2':
        days = periodValue * 7;
        break;
      case 'CC_MEDRSN3':
        newDate = curDate.AddMonths(periodValue * -1);
        days = (<TimeSpan>curDate.Subtract(newDate)).Days;
        break;
      case 'CC_MEDRSN4':
        newDate = curDate.AddYears(periodValue * -1);
        days = (<TimeSpan>curDate.Subtract(newDate)).Days;
        break;
    }
    return days;
  }
  public static FillPrescriptionItemVM(
    oResponse: ObservableCollection<IPPMAManagePrescSer.PrescriptionItemView>,
    _IsClosedEncounter: boolean = false
  ): ObservableCollection<PrescriptionItemVM> {
    let oPresItem: ObservableCollection<PrescriptionItemVM> =
      new ObservableCollection<PrescriptionItemVM>();
    if (oResponse != null) {
      let Addedheader: List<string> = new List<string>();
      let oORSHelper: OrderSetHelper = new OrderSetHelper();
      let firstheader: boolean = true;
      oResponse.array.forEach((oItemView) => {
        // Revisit Required
        //if (oItemView instanceof IPPMAManagePrescSer.PrescriptionItemView) {
        let oItemVM: PrescriptionItemVM = new PrescriptionItemVM(null);
        oItemVM.FillPrescriptionItemVM(oItemView, false, _IsClosedEncounter);
        if (
          oItemVM.FormViewerDetails != null &&
          oItemVM.FormViewerDetails.BasicDetails != null &&
          oItemVM.FormViewerDetails.BasicDetails.InfusionDetails != null
        ) {
          if (
            !String.IsNullOrEmpty(
              oItemVM.FormViewerDetails.BasicDetails.GroupHeaderName
            ) &&
            !Addedheader.Contains(
              oItemVM.FormViewerDetails.BasicDetails.GroupHeaderName
            )
          ) {
            oPresItem.Add(
              oORSHelper.GetGropingHeader(
                oItemVM.FormViewerDetails.BasicDetails.GroupHeaderName,
                oItemVM.PrescriptionOID,
                oItemVM.PrescriptionType,
                oItemVM.FormViewerDetails.BasicDetails.Firstscheduledatetime,
                firstheader
              )
            );
            Addedheader.Add(
              oItemVM.FormViewerDetails.BasicDetails.GroupHeaderName
            );
            firstheader = false;
          }
          if (
            !String.Equals(
              oItemVM.FormViewerDetails.BasicDetails.GroupHeaderName,
              CConstants.sawaitingauthHeader,
              StringComparison.InvariantCultureIgnoreCase
            ) &&
            oItemVM.FormViewerDetails.BasicDetails.InfusionDetails
              .GroupSequenceNo > 0 &&
            oItemVM.FormViewerDetails.BasicDetails.InfusionDetails.IsFirstItem
          ) {
            if (
              oItemVM != null &&
              !oItemVM.PrescriptionItemStatusCode.Equals(
                CConstants.CANCELLED,
                StringComparison.OrdinalIgnoreCase
              ) &&
              !oItemVM.PrescriptionItemStatusCode.Equals(
                CConstants.DISCONTINUED,
                StringComparison.OrdinalIgnoreCase
              ) &&
              !oItemVM.PrescriptionItemStatusCode.Equals(
                CConstants.COMPLETED,
                StringComparison.OrdinalIgnoreCase
              )
            ) {
              let oGroupHeader: PrescriptionItemVM =
                oORSHelper.GetGropingHeader(
                  '\t' +
                    String.Format(
                      Resource.Infusion.SequenceGroupHeader_Text,
                      oItemVM.FormViewerDetails.BasicDetails.InfusionDetails
                        .GroupSequenceNo
                    ),
                  oItemVM.PrescriptionOID,
                  oItemVM.PrescriptionType,
                  oItemVM.FormViewerDetails.BasicDetails.Firstscheduledatetime,
                  firstheader
                );
              oGroupHeader.FormViewerDetails.BasicDetails.InfusionDetails.GroupSequenceNo =
                oItemVM.FormViewerDetails.BasicDetails.InfusionDetails.GroupSequenceNo;
              oPresItem.Add(oGroupHeader);
              firstheader = false;
            }
          }
        }
        if (
          oItemVM.FormViewerDetails != null &&
          oItemVM.FormViewerDetails.BasicDetails != null &&
          oItemVM.FormViewerDetails.BasicDetails.SequenceInfo != null
        ) {
          if (
            !String.IsNullOrEmpty(
              oItemVM.FormViewerDetails.BasicDetails.GroupHeaderName
            ) &&
            !Addedheader.Contains(
              oItemVM.FormViewerDetails.BasicDetails.GroupHeaderName
            )
          ) {
            oPresItem.Add(
              oORSHelper.GetGropingHeader(
                oItemVM.FormViewerDetails.BasicDetails.GroupHeaderName,
                oItemVM.PrescriptionOID,
                oItemVM.PrescriptionType,
                oItemVM.FormViewerDetails.BasicDetails.Firstscheduledatetime,
                firstheader
              )
            );
            Addedheader.Add(
              oItemVM.FormViewerDetails.BasicDetails.GroupHeaderName
            );
            firstheader = false;
          }
          if (
            oItemVM.FormViewerDetails.BasicDetails.SequenceInfo
              .GroupSequenceNo > 0 &&
            oItemVM.FormViewerDetails.BasicDetails.SequenceInfo.IsFirstItem
          ) {
            if (
              oItemVM != null &&
              !oItemVM.PrescriptionItemStatusCode.Equals(
                CConstants.CANCELLED,
                StringComparison.OrdinalIgnoreCase
              ) &&
              !oItemVM.PrescriptionItemStatusCode.Equals(
                CConstants.DISCONTINUED,
                StringComparison.OrdinalIgnoreCase
              ) &&
              !oItemVM.PrescriptionItemStatusCode.Equals(
                CConstants.COMPLETED,
                StringComparison.OrdinalIgnoreCase
              )
            ) {
              let oGroupHeader: PrescriptionItemVM =
                oORSHelper.GetGropingHeader(
                  '\t' +
                    String.Format(
                      Resource.Infusion.SequenceGroupHeader_Text,
                      oItemVM.FormViewerDetails.BasicDetails.SequenceInfo
                        .GroupSequenceNo
                    ),
                  oItemVM.PrescriptionOID,
                  oItemVM.PrescriptionType,
                  oItemVM.FormViewerDetails.BasicDetails.Firstscheduledatetime,
                  firstheader
                );
              oGroupHeader.FormViewerDetails.BasicDetails.SequenceInfo =
                new SequenceDetail();
              oGroupHeader.FormViewerDetails.BasicDetails.SequenceInfo.GroupSequenceNo =
                oItemVM.FormViewerDetails.BasicDetails.SequenceInfo.GroupSequenceNo;
              oPresItem.Add(oGroupHeader);
              firstheader = false;
            }
          }
        }
        oPresItem.Add(oItemVM);
        //}
      });
    }
    return oPresItem;
  }
  public static GetPrescriptionType(Code: string): string {
    switch (Code) {
      case 'MN_MEDCLR':
      case 'MN_MEDCLERKSL_P2':
      case 'CC_MEDCLERK1':
        return 'Medication clerking';
      case 'MN_MEDLEAVE_P2':
      case 'MN_MEDLEAVESL_P2':
      case 'CC_Patientleave':
        return 'Patient leave';
      case 'MN_MEDDISCHARGE_P2':
      case 'MN_MEDDISCHRGESL_P2':
      case 'CC_DSCHRG':
        return 'Discharge';
      case 'MN_MEDOUTPAT_P2':
      case 'MN_MEDOUTPATSL_P2':
      case 'CC_MED_TYP_OP':
        return 'Outpatient';
      case 'MN_MEDINPAT':
      case 'MN_MEDINPATSL_P2':
      case 'CC_FRADMINSTN':
        return 'Inpatient';
      case 'MN_MEDADMINISTRAT_P2':
      case 'CC_FOR_ADMIN':
        return PrescriptionTypes.Foradministration;
      case 'MN_RECORDPGDSUPLY_P2':
        if (String.Compare(PatientContext.EncounterType, 'CC_INPAT') == 0) {
          return 'Discharge';
        } else {
          return 'Outpatient';
        }
      default:
        return String.Empty;
    }
  }
  public static GetPrescriptionItemStatus(
    lStatOID: number,
    sStationaryCode: string,
    IsAuthorise: boolean
  ): string {
    let sPresItemStatus: string = PrescriptionItemStatusCodes.AUTOVERIFIED;
    if (IsAuthorise) {
      sPresItemStatus = PrescriptionItemStatusCodes.AWAITINGAUTHORISE;
    } else {
      if (
        ProfileData.ClinicalVerifyConfig != null &&
        !String.IsNullOrEmpty(ProfileData.ClinicalVerifyConfig.StationaryTypes)
      ) {
        let arrClinical: string[] =
          ProfileData.ClinicalVerifyConfig.StationaryTypes.Split('~');
        if (arrClinical.length > 0 && lStatOID > 0) {
          let statOIDs = arrClinical
            .Where(
              (statOID) => String.Compare(statOID, lStatOID.ToString()) == 0
            )
            .Select((statOID) => statOID);
          if (statOIDs != null && statOIDs.Count() > 0) {
            sPresItemStatus = PrescriptionItemStatusCodes.SUBMITTED;
          }
        }
      }
      if (
        !sPresItemStatus.Equals(PrescriptionItemStatusCodes.SUBMITTED) &&
        ProfileData.ClinicalVerifyConfig != null &&
        !String.IsNullOrEmpty(
          ProfileData.ClinicalVerifyConfig.StationaryTypeCode
        )
      ) {
        let arrClinicalCode: string[] =
          ProfileData.ClinicalVerifyConfig.StationaryTypeCode.Split('~');
        if (
          arrClinicalCode.length > 0 &&
          !String.IsNullOrEmpty(sStationaryCode)
        ) {
          let statCodes = arrClinicalCode
            .Where((statOID) => String.Compare(statOID, sStationaryCode) == 0)
            .Select((statOID) => statOID);
          if (statCodes != null && statCodes.Count() > 0) {
            sPresItemStatus = PrescriptionItemStatusCodes.SUBMITTED;
          }
        }
      }
    }
    return sPresItemStatus;
  }
  public static CheckPermission(
    PermissionCode?: string,
    PermissionDescription?: string
  ): boolean;
  public static CheckPermission(
    ResourceType?: string,
    ResourceCode?: string,
    ActivityCode?: string
  ): boolean;
  public static CheckPermission(
    ResourceType?: string,
    ResourceCode?: string,
    ActivityCode?: string
  ): boolean {
    let sHasRights: string = '';
    switch (arguments.length) {
      case 2:
        sHasRights = ObjectHelper.CreateType<string>(
          HtmlPage.Window.Invoke('CheckPermission', ResourceType, ResourceCode),
          'string'
        );
        break;
      case 3:
        sHasRights = ObjectHelper.CreateType<string>(
          HtmlPage.Window.Invoke(
            'CheckAccessRights',
            ResourceType,
            ResourceCode,
            ActivityCode
          ),
          'string'
        );
        break;
    }
    return (
      !String.IsNullOrEmpty(sHasRights) && String.Compare(sHasRights, '1') == 0
    );
  }
  public static GetMedCount(
    EncOID: number,
    sPresType: string,
    oGetPatientMedicationCount: Function
  ): void {
    let objServiceProxy: IPPMAManagePrescSer.IPPMAManagePrescriptionWSSoapClient =
      new IPPMAManagePrescSer.IPPMAManagePrescriptionWSSoapClient();
    objServiceProxy.GetIPPPatientMedicationCountCompleted = (s, e) => {
      oGetPatientMedicationCount(s, e);
    };
    let objReq: IPPMAManagePrescSer.CReqMsgGetIPPPatientMedicationCount =
      new IPPMAManagePrescSer.CReqMsgGetIPPPatientMedicationCount();
    objReq.PatientOIDBC = PatientContext.PatientOID;
    objReq.PrescriptionTypeBC = sPresType;
    objReq.EncounterOIDBC = EncOID;
    objReq.oContextInformation = Common.FillContext();
    objServiceProxy.GetIPPPatientMedicationCountAsync(objReq);
  }
  public static GetEncounterGrid(
    oGetEncountersPaging: Function,
    CurrentPageIndex: number
  ): void {
    if (WebServiceURL.QueryCareEventsWS != null) {
      //let objServiceProxy: QueryCareEventsWSSoapClient = new QueryCareEventsWSSoapClient();
      let objServiceProxy: EncounterWSWSSoapClient =
        new EncounterWSWSSoapClient();
      objServiceProxy.GetEncountersPagingCompleted = (s, e) => {
        oGetEncountersPaging(s, e);
      };
      let objReqList: CReqMsgGetEncountersPaging =
        new CReqMsgGetEncountersPaging();
      objReqList.objEncounterBC = new Encounter();
      objReqList.objEncounterBC.PatientOID =
        PatientContext.PatientOID.ToString();
      objReqList.objEncounterBC.EncounterType = String.Empty;
      objReqList.objEncounterBC.EncounterID =
        PatientContext.EncounterOid.ToString();
      objReqList.objEncounterBC.IsSimple = '2';
      objReqList.oContextInformation = Common.FillContext();
      objReqList.pElementBC = new PagingDynamicSQL();
      objReqList.pElementBC.ChildPagination = true;
      objReqList.pElementBC.PageIndex = CurrentPageIndex;
      //re-visite required for page size
      objReqList.pElementBC.PageSize = 100; //CConstants.EncountersPageSize;
      objReqList.pElementBC.RecTo =
        objReqList.pElementBC.PageIndex * objReqList.pElementBC.PageSize;
      objReqList.pElementBC.RecFrm =
        objReqList.pElementBC.RecTo - (objReqList.pElementBC.PageSize - 1);
      objReqList.oContextInformation.MultiCampusPattern =
        enmMultiCampusPattern.GLOBAL;
      objServiceProxy.GetEncountersPagingAsync(objReqList);
    }
  }
  public static GetMedicationCount(
    EncOID: number,
    sPresType: string,
    oGetPatientMedicationCount: Function
  ): void {
    let objServiceProxy: ManagePrescriptionWSSoapClient =
      new ManagePrescriptionWSSoapClient();
    objServiceProxy.GetPatientMedicationCountCompleted = (s, e) => {
      oGetPatientMedicationCount(s, e);
    };
    let objReq: CReqMsgGetPatientMedicationCount =
      new CReqMsgGetPatientMedicationCount();
    objReq.PatientOIDBC = PatientContext.PatientOID;
    objReq.PrescriptionTypeBC = sPresType;
    objReq.EncounterOIDBC = EncOID;
    objReq.oContextInformation = Common.FillContext();
    objServiceProxy.GetPatientMedicationCountAsync(objReq);
  }
  public static GetPatientMedDisconItems(
    PresType: string,
    EncounterOID: number,
    objBaseVm: IPPMABaseVM,
    oGetPatientMedDisContItemsCompleted: Function
  ): void {
    let objServiceProxy: IPPMAManagePrescSer.IPPMAManagePrescriptionWSSoapClient =
      new IPPMAManagePrescSer.IPPMAManagePrescriptionWSSoapClient();
    objServiceProxy.GetPatientMedDisContItemsCompleted = (s, e) => {
      oGetPatientMedDisContItemsCompleted(s, e);
    };
    let objReqList: IPPMAManagePrescSer.CReqMsgGetPatientMedDisContItems =
      new IPPMAManagePrescSer.CReqMsgGetPatientMedDisContItems();
    objReqList.oMedicationListCriteriaBC =
      new IPPMAManagePrescSer.MedicationListCriteria();
    objReqList.oMedicationListCriteriaBC.PatientOID = PatientContext.PatientOID;
    objReqList.oMedicationListCriteriaBC.CAPresType =
      PatientContext.PrescriptionType;
    objReqList.oMedicationListCriteriaBC.McVersion = AppSessionInfo.AMCV;
    objReqList.oMedicationListCriteriaBC.EncounterOID = EncounterOID;
    if (
      String.Compare(
        PresType,
        'CC_FRADMINSTN',
        StringComparison.InvariantCultureIgnoreCase
      ) == 0
    )
      PresType = 'CC_FOR_ADMIN';
    objReqList.oMedicationListCriteriaBC.PrescriptionType = PresType;
    let nDrugsExpDuration: number = 0;
    if (MedicationCommonProfileData.MedViewConfig != null)
      nDrugsExpDuration = Convert.ToInt32(
        PrescriptionHelper.GetDuration(
          MedicationCommonProfileData.MedViewConfig.DrugsExpiryDuration
        )
      );
    objReqList.oMedicationListCriteriaBC.ProfileHoldDuration =
      nDrugsExpDuration;
    objReqList.oContextInformation = Common.FillContext();
    objServiceProxy.GetPatientMedDisContItemsAsync(objReqList);
  }

  public static CheckIsDueNow(
    dtStartDTTM?: DateTime | BasicDetailsVM,
    AdminTimesData?: ObservableCollection<GrdAdminstrativeTimesCols>,
    out1?: (sTime: string) => void,
    out2?: (DueNowDTTM: DateTime) => void
  ): boolean {
    if (dtStartDTTM instanceof BasicDetailsVM) {
      return this.CheckIsDueNow1(dtStartDTTM, out1, out2);
    } else {
      return this.CheckIsDueNow2(dtStartDTTM, AdminTimesData, out1);
    }
  }

  private static CheckIsDueNow2(
    dtStartDTTM: DateTime,
    AdminTimesData: ObservableCollection<GrdAdminstrativeTimesCols>,
    out1: (sTime: string) => void
  ): boolean {
    let sTime: string;

    let IsDueNow: boolean = false;
    sTime = String.Empty;
    let SlotScheduleDTTM: DateTime = DateTime.MinValue;
    let dtCurrentDate: DateTime = CommonBB.GetServerDateTime();
    let arrTimes: string[] = null;
    if (AdminTimesData.Count > 0) {
      if (String.Compare(AdminTimesData[0].FrequencyType, 'CC_PERIOD') == 0) {
        let item : GrdAdminstrativeTimesCols;
        for (let i = 0 ; i < AdminTimesData.Count ; i++ ){
          let item : GrdAdminstrativeTimesCols = AdminTimesData[i];
          sTime = String.Empty;
          arrTimes = null;
          if (item.IsFixedEnabled) {
            arrTimes = item.FixedTimes.Split(':');
          } else {
            arrTimes = item.DruRoundTimes.Split(':');
          }
          if (arrTimes != null && arrTimes.length == 2) {
            SlotScheduleDTTM = dtStartDTTM
              .AddHours(Convert.ToInt32(arrTimes[0]))
              .AddMinutes(Convert.ToInt32(arrTimes[1]));
            if (
              DateTime.GreaterThanOrEqualTo(dtCurrentDate,
                SlotScheduleDTTM.AddMinutes(-MedChartData.DuenessThreshold)) &&
              DateTime.LessThanOrEqualTo(dtCurrentDate,
                SlotScheduleDTTM.AddMinutes(MedChartData.DuenessThreshold))
            ) {
              IsDueNow = true;
              sTime = SlotScheduleDTTM.ToString('HH:mm');
              break;
            }
          }
        }      
      } else {
        sTime = AdminTimesData[0].DruRoundTimes;
        IsDueNow = true;
      }
    }
    out1(sTime);
    return IsDueNow;

  }
  private static CheckIsDueNow1(
    BasicDetails: BasicDetailsVM,
    out1: (sTime: string) => void,
    out2: (DueNowDTTM: DateTime) => void
  ): boolean {
    let sTime: string;
    let DueNowDTTM: DateTime;

    let IsDueNow: boolean = false;
    sTime = String.Empty;
    DueNowDTTM = DateTime.MinValue;
    let sDose: string = String.Empty;
    let sDoseUOM: string = String.Empty;
    for (let i = 0; i < BasicDetails.MultiDoseDetails.Count; i++ ) 
    {
      let itemDoseDetails : MultipleDoseDetail = BasicDetails.MultiDoseDetails[i];
    
      if (
        DateTime.NotEquals(itemDoseDetails.StartDTTM, DateTime.MinValue) &&
        itemDoseDetails.ScheduleDetailsData != null &&
        itemDoseDetails.ScheduleDetailsData.Count > 0
      ) {
        DueNowDTTM = PrescriptionHelper.GetDueNowDTTM(
          itemDoseDetails.StartDTTM,
          itemDoseDetails.EndDTTM,
          itemDoseDetails.ScheduleDetailsData,
          undefined,
          (o1) => {
            sDose = o1;
          },
          (o2) => {
            sDoseUOM = o2;
          }
        );
        if (DateTime.NotEquals(DueNowDTTM, DateTime.MinValue)) {
          itemDoseDetails.DueDTTM = DueNowDTTM;
          itemDoseDetails.DueDose = !String.IsNullOrEmpty(sDose)
            ? Convert.ToDouble(sDose)
            : 0;
          if (
            !String.IsNullOrEmpty(sDoseUOM) &&
            BasicDetails.DefaultDetails != null &&
            BasicDetails.DefaultDetails.Uoms != null &&
            BasicDetails.DefaultDetails.Uoms.Count > 0
          ) {
            let qryUOMs = BasicDetails.DefaultDetails.Uoms.Where(
              (x) => x != null && x.DisplayText == sDoseUOM.Trim()
            ).Select((x) => x);
            qryUOMs.forEach((item) => {
              if (item != null) itemDoseDetails.DueDoseUOM = item;
            });
          }
          sTime = DueNowDTTM.ToString('HH:mm');
          IsDueNow = true;
          break;
        } else {
          itemDoseDetails.DueDTTM = DateTime.MinValue;
          itemDoseDetails.DueDose = 0;
          itemDoseDetails.DueDoseUOM = null;
        }
      } else if (
        DateTime.NotEquals(itemDoseDetails.StartDTTM, DateTime.MinValue) &&
        itemDoseDetails.AdminTimesData != null &&
        itemDoseDetails.AdminTimesData.Count > 0
      ) {
        let sFreqUOM: string = String.Empty;
        if (
          itemDoseDetails.FreqDetails != null &&
          itemDoseDetails.FreqDetails.oFrequency != null
        )
          sFreqUOM = itemDoseDetails.FreqDetails.oFrequency.UOM;
        DueNowDTTM = PrescriptionHelper.GetDueNowDTTM(
          itemDoseDetails.StartDTTM,
          itemDoseDetails.EndDTTM,
          sFreqUOM,
          itemDoseDetails.AdminTimesData
        );
        if (DateTime.NotEquals(DueNowDTTM, DateTime.MinValue)) {
          itemDoseDetails.DueDTTM = DueNowDTTM;
          itemDoseDetails.DueDose = itemDoseDetails.LowerDose;
          itemDoseDetails.DueDoseUOM = itemDoseDetails.DoseUOM;
          sTime = DueNowDTTM.ToString('HH:mm');
          IsDueNow = true;
          break;
        } else {
          itemDoseDetails.DueDTTM = DateTime.MinValue;
          itemDoseDetails.DueDose = 0;
          itemDoseDetails.DueDoseUOM = null;
        }
      }
    }
    out1(sTime);
    out2(DueNowDTTM);
    return IsDueNow;
  }

  public static GetDueNowDTTM(
    dtStartDTTM: DateTime,
    dtEndDTTM: DateTime,
    sFreqUOM?: string | ObservableCollection<ScheduleDetailsCols>,
    AdminTimesData?: ObservableCollection<GrdAdminstrativeTimesCols>,
    out1?: (sDose: string) => void,
    out2?: (sDoseUOM: string) => void
  ): DateTime {
    if (sFreqUOM instanceof (ObservableCollection<ScheduleDetailsCols> as typeof ObservableCollection<ScheduleDetailsCols>)) {
      return this.GetDueNowDTTM3(dtStartDTTM, dtEndDTTM, sFreqUOM, out1, out2);
    } else {
      return this.GetDueNowDTTM4(
        dtStartDTTM,
        dtEndDTTM,
        sFreqUOM,
        AdminTimesData
      );
    }
  }

  private static GetDueNowDTTM4(
    dtStartDTTM: DateTime,
    dtEndDTTM: DateTime,
    sFreqUOM: string,
    AdminTimesData: ObservableCollection<GrdAdminstrativeTimesCols>
  ): DateTime {
    let tmpStartDTTM: DateTime = DateTime.MinValue;
    let tmpEndDTTM: DateTime = DateTime.MinValue;
    let arrDaysOfWeek: string[] = null;
    let arrTimes: string[] = null;
    let ScheduleDTTM: DateTime = DateTime.MinValue;
    let DueNowDTTM: DateTime = DateTime.MinValue;
    let dtCurrentDate: DateTime = FormviewerCommonData.ServerDateTime;
    if (
      String.Equals(
        sFreqUOM,
        'CC_MEDDRSN2',
        StringComparison.CurrentCultureIgnoreCase
      )
    ) {
      tmpStartDTTM = dtStartDTTM;
      tmpEndDTTM = dtStartDTTM.AddDays(6).DateTime.AddHours(23).AddMinutes(59);
      if (DateTime.LessThan(tmpStartDTTM.Date, dtCurrentDate.Date)) {
        let CurrDatePlus6: DateTime = dtCurrentDate.DateTime.AddDays(6)
          .DateTime.AddHours(23)
          .AddMinutes(59);
        if (
          DateTime.Equals(dtEndDTTM, DateTime.MinValue) ||
          DateTime.GreaterThan(dtEndDTTM.Date, CurrDatePlus6.Date)
        )
          tmpEndDTTM = CurrDatePlus6;
        else if (
          DateTime.NotEquals(dtEndDTTM, DateTime.MinValue) &&
          DateTime.LessThanOrEqualTo(dtEndDTTM.Date, CurrDatePlus6.Date)
        )
          tmpEndDTTM = dtEndDTTM;
      }
    }
    if (String.Compare(AdminTimesData[0].FrequencyType, 'CC_PERIOD') == 0) {
      if (
        AdminTimesData[0].oFrequency != null &&
        String.Equals(
          sFreqUOM,
          'CC_MEDDRSN2',
          StringComparison.CurrentCultureIgnoreCase
        )
      ) {
        arrDaysOfWeek = new Array(7);
        arrDaysOfWeek[0] = AdminTimesData[0].oFrequency.IsSunday.ToString();
        arrDaysOfWeek[1] = AdminTimesData[0].oFrequency.IsMonday.ToString();
        arrDaysOfWeek[2] = AdminTimesData[0].oFrequency.IsTuesday.ToString();
        arrDaysOfWeek[3] = AdminTimesData[0].oFrequency.IsWednesday.ToString();
        arrDaysOfWeek[4] = AdminTimesData[0].oFrequency.IsThursday.ToString();
        arrDaysOfWeek[5] = AdminTimesData[0].oFrequency.IsFriday.ToString();
        arrDaysOfWeek[6] = AdminTimesData[0].oFrequency.IsSaturday.ToString();
      }
      let nAdminTimesDatacnt: number = AdminTimesData.Count;
      for (let i: number = 0; i < nAdminTimesDatacnt; i++) {
        let item: GrdAdminstrativeTimesCols = AdminTimesData[i];
        // AdminTimesData.forEach( (item)=> {
        arrTimes = null;
        if (item.IsFixedEnabled && item.FixedTimes != null) {
          arrTimes = item.FixedTimes.Split(':');
        } else if (item.DruRoundTimes != null) {
          arrTimes = item.DruRoundTimes.Split(':');
        } else if (arrTimes == null && item.FixedTimes != null) {
          arrTimes = item.FixedTimes.Split(':');
        }
        if (arrTimes != null && arrTimes.length == 2) {
          if (
            AdminTimesData[0].oFrequency != null &&
            String.Equals(
              sFreqUOM,
              'CC_MEDDRSN2',
              StringComparison.CurrentCultureIgnoreCase
            )
          ) {
            let FirstDateOfWeek: DateTime =
              PrescriptionHelper.GetFirstDateOfweek(
                tmpStartDTTM,
                tmpEndDTTM,
                arrDaysOfWeek
              );
            if (DateTime.Equals(FirstDateOfWeek , DateTime.MinValue)) {
              tmpStartDTTM = tmpStartDTTM.AddDays(1);
              continue;
            }
            ScheduleDTTM = FirstDateOfWeek.DateTime.AddHours(
              Convert.ToInt32(arrTimes[0])
            ).AddMinutes(Convert.ToInt32(arrTimes[1]));
          } else {
            ScheduleDTTM = dtStartDTTM.DateTime.AddHours(
              Convert.ToInt32(arrTimes[0])
            ).AddMinutes(Convert.ToInt32(arrTimes[1]));
          }
          if (
            DateTime.GreaterThanOrEqualTo(ScheduleDTTM, dtStartDTTM) &&
            DateTime.GreaterThanOrEqualTo(dtCurrentDate,
              ScheduleDTTM.AddMinutes(-MedChartData.DuenessThreshold)) &&
            DateTime.LessThanOrEqualTo(dtCurrentDate,
              ScheduleDTTM.AddMinutes(MedChartData.DuenessThreshold))
          ) {
            DueNowDTTM = ScheduleDTTM;
            break;
          }
        }
        // });
      }
    } else {
      let tmpDueNowDTTM: DateTime = Convert.ToDateTime(
        AdminTimesData[0].FixedTimes +
          ' ' +
          AdminTimesData[0].DruRoundTimes.Substring(0, 5)
      );
      if (
        DateTime.GreaterThanOrEqualTo(tmpDueNowDTTM, dtStartDTTM) &&
        DateTime.GreaterThanOrEqualTo(dtCurrentDate,
          tmpDueNowDTTM.AddMinutes(-MedChartData.DuenessThreshold)) &&
        DateTime.LessThanOrEqualTo(dtCurrentDate, tmpDueNowDTTM.AddMinutes(MedChartData.DuenessThreshold))
      ) {
        DueNowDTTM = tmpDueNowDTTM;
      }
    }
    return DueNowDTTM;
  }
  private static GetDueNowDTTM3(
    StartDTTM: DateTime,
    EndDTTM: DateTime,
    ChangingDoseData: ObservableCollection<ScheduleDetailsCols>,
    out1: (sDose: string) => void,
    out2: (sDoseUOM: string) => void
  ): DateTime {
    let sDose: string;
    let sDoseUOM: string;

    sDose = sDoseUOM = String.Empty;
    let ScheduleDTTM: DateTime = DateTime.MinValue;
    let DueNowDTTM: DateTime = DateTime.MinValue;
    let dtCurrentDate: DateTime = FormviewerCommonData.ServerDateTime;
    let j: number = 0;
    let dtStartDTTM: DateTime = DateTime.MinValue;
    let oTimeSpan: List<TimeSpan> = new List<TimeSpan>();
    ChangingDoseData.forEach((item) => {
      if (item != null && item.ScheduleTime != null)
        oTimeSpan.Add(TimeSpan.Parse(item.ScheduleTime));
    });
    for (let i: number = 0; i < oTimeSpan.Count; i++) {
      let qry = ChangingDoseData.Where(
        (x) =>
          x.ScheduleTime == new DateTime(oTimeSpan[i].Ticks).ToString('HH:mm')
      ).Select((x) => x);
      qry.forEach((item) => {
        j = 0;
        dtStartDTTM = StartDTTM;
        while (DateTime.LessThan(dtStartDTTM, EndDTTM)) {
          ScheduleDTTM = StartDTTM.DateTime.Add(
            TimeSpan.Parse(item.ScheduleTime)
          );
          if (
            DateTime.GreaterThanOrEqualTo(ScheduleDTTM, StartDTTM) &&
            DateTime.GreaterThanOrEqualTo(dtCurrentDate,
              ScheduleDTTM.AddMinutes(-MedChartData.DuenessThreshold)) &&
            DateTime.LessThanOrEqualTo(dtCurrentDate,
              ScheduleDTTM.AddMinutes(MedChartData.DuenessThreshold))
          ) {
            DueNowDTTM = ScheduleDTTM;
            sDose = item.ScheduleDoseValue[j];
            sDoseUOM = item.ScheduleDoseUOM;
            break;
          }
          j++;
          dtStartDTTM = dtStartDTTM.AddDays(1);
        }
      });
    }
    out1(sDose);
    out2(sDoseUOM);
    return DueNowDTTM;
  }
  public static GetFirstDateOfweek(
    StartDTTM: DateTime,
    EndDTTM: DateTime,
    arrDaysOfWeek: string[]
  ): DateTime {
    let FirstDateOfWeek: DateTime = DateTime.MinValue;
    while (DateTime.LessThanOrEqualTo(StartDTTM, EndDTTM)) {
      let nWeekdayIndex: number = Convert.ToInt32(StartDTTM.DayOfWeek);
      if (
        String.Equals(
          arrDaysOfWeek[nWeekdayIndex],
          'True',
          StringComparison.CurrentCultureIgnoreCase
        )
      ) {
        FirstDateOfWeek = StartDTTM;
        break;
      }
      StartDTTM = StartDTTM.AddDays(1);
    }
    return FirstDateOfWeek;
  }
  public static GetDurationInMinutesByUOM(
    Duration: string,
    DurationUOMName: string
  ): number {
    let DurationInMinutes: number = 0;
    if (!String.IsNullOrEmpty(Duration)) {
      let nDuration: number = Convert.ToInt32(Duration);
      switch (DurationUOMName) {
        case 'minute':
        case 'CC_MINUTES':
          DurationInMinutes += nDuration;
          break;
        case 'hour':
        case 'CC_HOURS':
          DurationInMinutes += nDuration * 60;
          break;
        case 'day':
        case 'CC_MEDDRSN1':
          DurationInMinutes += nDuration * 24 * 60;
          break;
        case 'week':
        case 'CC_MEDDRSN2':
          DurationInMinutes += nDuration * 7 * 24 * 60;
          break;
        case 'month':
        case 'CC_MEDRSN3':
          DurationInMinutes += nDuration * 30 * 24 * 60;
          break;
        case 'year':
        case 'CC_MEDRSN4':
          DurationInMinutes += nDuration * 365 * 24 * 60;
          break;
      }
    }
    return DurationInMinutes;
  }
  public static GetScheduleDateTimes(
    SlotTimeMode: string,
    AdminTimes: ObservableCollection<GrdAdminstrativeTimesCols>,
    StartDTTM: DateTime,
    EndDTTM: DateTime,
    oIPPFrequency: IPPMAManagePrescSer.IPPFrequency
  ): List<DateTime> {
    if (DateTime.Equals(EndDTTM, DateTime.MinValue))
      EndDTTM = StartDTTM.AddDays(3).DateTime.AddHours(23).AddMinutes(59);
    let lstScheduleDates: List<DateTime> = PrescriptionHelper.GetScheduleDates(
      StartDTTM,
      EndDTTM,
      oIPPFrequency
    );
    if (
      String.Compare(
        oIPPFrequency.Type,
        'CC_INTERVAL',
        StringComparison.CurrentCultureIgnoreCase
      ) == 0
    ) {
      return lstScheduleDates;
    } else {
      let lstScheduleTime: List<TimeSpan> = new List<TimeSpan>();
      if (SlotTimeMode == 'F') {
        let j: number = AdminTimes.Count;
        for (let i: number = 0; i < j; i++) {
          lstScheduleTime.Add(TimeSpan.Parse(AdminTimes[i].FixedTimes));
        }
      } else if (SlotTimeMode == 'D') {
        let j: number = AdminTimes.Count;
        for (let i: number = 0; i < j; i++) {
          lstScheduleTime.Add(TimeSpan.Parse(AdminTimes[i].DruRoundTimes));
        }
      }
      let lstDates: List<DateTime> = new List<DateTime>();
      if (lstScheduleDates.Count > 0) {
        let lstDistinctScheduleDates = lstScheduleDates.GroupBy(
          (oSlotDate) => oSlotDate.Date
        );
        if (lstDistinctScheduleDates.Count() > 0) {
          lstDistinctScheduleDates.forEach((oGroupedDate) => {
            lstDates.Add(oGroupedDate.Key);
          });
        }
      }
      let lstScheduleDTTM: List<DateTime> = new List<DateTime>();
      lstDates.forEach((ScheduleDate) => {
        let oSchedDttm: DateTime;
        lstScheduleTime.forEach((objScheduleTime) => {
          oSchedDttm = new DateTime(
            ScheduleDate.DateTime.Year,
            ScheduleDate.DateTime.Month,
            ScheduleDate.DateTime.Day,
            0,
            0,
            0,
            DateTimeKind.Local
          );
          oSchedDttm = oSchedDttm.DateTime.Add(objScheduleTime);
          lstScheduleDTTM.Add(oSchedDttm);
        });
      });
      return lstScheduleDTTM;
    }
  }
  public static GetScheduleDates(
    StartDTTM: DateTime,
    EndDTTM: DateTime,
    oIPPFrequency: IPPMAManagePrescSer.IPPFrequency
  ): List<DateTime> {
    let lstScheduleDate: List<DateTime> = new List<DateTime>();
    let LowPeriod: number = oIPPFrequency.LowPeriod;
    let HighPeriod: number = oIPPFrequency.HighPeriod;
    let HighEvent: number = oIPPFrequency.HighEvent;
    let LowEvent: number = oIPPFrequency.LowEvent;
    let EventToConsider: number = HighEvent > 0 ? HighEvent : LowEvent;
    let PeriodToConsider: number = HighPeriod > 0 ? HighPeriod : LowPeriod;
    let MinTimeToPrescribe: number = 0;
    if (DateTime.NotEquals(StartDTTM, DateTime.MinValue)) {
      if (
        String.Compare(
          oIPPFrequency.Type,
          'CC_INTERVAL',
          StringComparison.CurrentCultureIgnoreCase
        ) == 0
      ) {
        switch (oIPPFrequency.UOM) {
          case 'CC_MINUTES':
            MinTimeToPrescribe = PeriodToConsider;
            break;
          case 'CC_HOURS':
            MinTimeToPrescribe = PeriodToConsider * 60;
            break;
          case 'CC_MEDDRSN1':
            MinTimeToPrescribe = (PeriodToConsider * 1440) / EventToConsider;
            break;
          case 'CC_MEDDRSN2':
            MinTimeToPrescribe =
              (PeriodToConsider * 1440 * 7) / EventToConsider;
            break;
          case 'CC_MEDRSN3':
            MinTimeToPrescribe =
              (PeriodToConsider * 1440 * 28) / EventToConsider;
            break;
          case 'CC_MEDRSN4':
            MinTimeToPrescribe =
              (PeriodToConsider * 1440 * 365) / EventToConsider;
            break;
          case 'CC_IPONCENLY':
            EndDTTM = StartDTTM;
            break;
        }
        if (DateTime.Equals(StartDTTM, EndDTTM)) {
          lstScheduleDate.Add(StartDTTM);
        } else {
          while (DateTime.LessThan(StartDTTM, EndDTTM)) {
            lstScheduleDate.Add(StartDTTM);
            StartDTTM = StartDTTM.AddMinutes(MinTimeToPrescribe);
          }
        }
      } else {
        while (DateTime.LessThan(StartDTTM, EndDTTM)) {
          if (oIPPFrequency.LowPeriod > oIPPFrequency.LowEvent) {
            switch (oIPPFrequency.UOM) {
              case 'CC_MEDDRSN1':
                StartDTTM = StartDTTM.AddDays(oIPPFrequency.LowPeriod);
                break;
              case 'CC_MEDDRSN2':
                StartDTTM = StartDTTM.AddDays(7 * oIPPFrequency.LowPeriod);
                break;
              case 'CC_MEDRSN3':
                StartDTTM = StartDTTM.AddDays(28 * oIPPFrequency.LowPeriod);
                break;
            }
            lstScheduleDate.Add(StartDTTM);
          } else {
            if (
              String.Compare(
                oIPPFrequency.UOM,
                'CC_MEDRSN3',
                StringComparison.CurrentCultureIgnoreCase
              ) == 0
            ) {
              StartDTTM = StartDTTM.AddDays(28);
              lstScheduleDate.Add(StartDTTM);
            } else {
              lstScheduleDate.Add(StartDTTM);
              StartDTTM = StartDTTM.AddDays(1);
            }
          }
        }
      }
    }
    return lstScheduleDate;
  }
  public static GetScheduleDatesForDoseDuration(
    oMultipleDoseDetail: MultipleDoseDetail,
    oScheduleDetailsVM: ScheduleDetailsSteppedVM
  ): List<DateTime> {
    let lstScheduleDate: List<DateTime> = new List<DateTime>();
    let StartDTTM: DateTime = DateTime.MinValue;
    let EndDTTM: DateTime = DateTime.MinValue;
    let oIPPFrequency: IPPMAManagePrescSer.IPPFrequency =
      new IPPMAManagePrescSer.IPPFrequency();
    let NoOfSchedules: number = 0;
    let bIsFixed: boolean = false;
    if (oMultipleDoseDetail != null) {
      StartDTTM = oMultipleDoseDetail.StartDTTM;
      EndDTTM = oMultipleDoseDetail.EndDTTM;
      if (oMultipleDoseDetail.FreqDetails != null)
        oIPPFrequency = oMultipleDoseDetail.FreqDetails.oFrequency;
      else if (
        oMultipleDoseDetail.AdminTimesData != null &&
        oMultipleDoseDetail.AdminTimesData.Count > 0 &&
        oMultipleDoseDetail.AdminTimesData[0].oFrequency != null
      )
        oIPPFrequency = oMultipleDoseDetail.AdminTimesData[0].oFrequency;
      NoOfSchedules = oMultipleDoseDetail.Duration;
      if (String.Equals(oMultipleDoseDetail.SlotTimeMode, 'F')) bIsFixed = true;
      else if (String.Equals(oMultipleDoseDetail.SlotTimeMode, 'D'))
        bIsFixed = false;
    } else if (oScheduleDetailsVM != null) {
      StartDTTM = oScheduleDetailsVM.StartDate;
      EndDTTM = oScheduleDetailsVM.EndDate;
      if (oScheduleDetailsVM.FreqDetails != null)
        oIPPFrequency = oScheduleDetailsVM.FreqDetails.oFrequency;
      NoOfSchedules = oScheduleDetailsVM.DurationValue;
      bIsFixed = oScheduleDetailsVM.IsFixedTime;
    }
    let LowPeriod: number = oIPPFrequency.LowPeriod;
    let HighPeriod: number = oIPPFrequency.HighPeriod;
    let HighEvent: number = oIPPFrequency.HighEvent;
    let LowEvent: number = oIPPFrequency.LowEvent;
    let EventToConsider: number = HighEvent > 0 ? HighEvent : LowEvent;
    let PeriodToConsider: number = HighPeriod > 0 ? HighPeriod : LowPeriod;
    let MinTimeToPrescribe: number = 0;
    if (DateTime.NotEquals(StartDTTM, DateTime.MinValue)) {
      if (
        String.Compare(
          oIPPFrequency.Type,
          'CC_INTERVAL',
          StringComparison.CurrentCultureIgnoreCase
        ) == 0
      ) {
        switch (oIPPFrequency.UOM) {
          case 'CC_MINUTES':
            MinTimeToPrescribe = PeriodToConsider;
            break;
          case 'CC_HOURS':
            MinTimeToPrescribe = PeriodToConsider * 60;
            break;
          case 'CC_MEDDRSN1':
            MinTimeToPrescribe = (PeriodToConsider * 1440) / EventToConsider;
            break;
          case 'CC_MEDDRSN2':
            MinTimeToPrescribe =
              (PeriodToConsider * 1440 * 7) / EventToConsider;
            break;
          case 'CC_MEDRSN3':
            MinTimeToPrescribe =
              (PeriodToConsider * 1440 * 28) / EventToConsider;
            break;
          case 'CC_MEDRSN4':
            MinTimeToPrescribe =
              (PeriodToConsider * 1440 * 365) / EventToConsider;
            break;
          case 'CC_IPONCENLY':
            EndDTTM = StartDTTM;
            break;
        }
        if (DateTime.Equals(StartDTTM, EndDTTM)) {
          lstScheduleDate.Add(StartDTTM);
        } else {
          if (NoOfSchedules > 0) {
            let nCount: number = 0;
            while (nCount < NoOfSchedules) {
              lstScheduleDate.Add(StartDTTM);
              StartDTTM = StartDTTM.AddMinutes(MinTimeToPrescribe);
              nCount++;
            }
          }
        }
      } else {
        if (NoOfSchedules > 0) {
          let _TmpSceduleCount: number = 0;
          let oTempStartDttm: DateTime = StartDTTM;
          let oTempEndDttm: DateTime = EndDTTM;
          let sSlotTime: string = String.Empty;
          let oAdminTimesData: ObservableCollection<GrdAdminstrativeTimesCols> =
            null;
          let oScheduleDetailsData: ObservableCollection<ScheduleDetailsCols> =
            null;
          let oScheduleDetails: ObservableCollection<IPPMAManagePrescSer.IPPScheduledetails> =
            null;
          if (
            oMultipleDoseDetail != null &&
            oMultipleDoseDetail.AdminTimesData != null &&
            oMultipleDoseDetail.AdminTimesData.Count > 0
          ) {
            if (bIsFixed) {
              oAdminTimesData =
                new ObservableCollection<GrdAdminstrativeTimesCols>(
                  oMultipleDoseDetail.AdminTimesData.OrderBy(
                    (x) => x.FixedTimes
                  )
                );
              if (
                oIPPFrequency != null &&
                NoOfSchedules < oIPPFrequency.LowEvent &&
                oMultipleDoseDetail.oAdminTimesVM != null &&
                oMultipleDoseDetail.oAdminTimesVM.GrdData != null &&
                oMultipleDoseDetail.oAdminTimesVM.GrdData.Count > 0
              ) {
                let _UniqueAdminTimes =
                  oMultipleDoseDetail.oAdminTimesVM.GrdData.Where(
                    (x) => x.FixedTimes != '00:00'
                  );
                if (_UniqueAdminTimes != null) {
                  let _UniqueTimesCount: number = _UniqueAdminTimes.Count();
                  if (_UniqueAdminTimes.Count() > 0) {
                    oAdminTimesData.Clear();
                    _UniqueAdminTimes.forEach((oTmp) => {
                      oAdminTimesData.Add(
                        ObjectHelper.CreateObject(
                          new GrdAdminstrativeTimesCols(),
                          { FixedTimes: oTmp.FixedTimes }
                        )
                      );
                    });
                    if (
                      oIPPFrequency != null &&
                      !String.Equals(oIPPFrequency.UOM, ConstDurationUOM.Weeks)
                    ) {
                      if (_UniqueTimesCount + 1 == NoOfSchedules) {
                        oAdminTimesData.Insert(
                          0,
                          ObjectHelper.CreateObject(
                            new GrdAdminstrativeTimesCols(),
                            { FixedTimes: '00:00' }
                          )
                        );
                      }
                    }
                  }
                }
              }
            } else {
              oAdminTimesData =
                new ObservableCollection<GrdAdminstrativeTimesCols>(
                  oMultipleDoseDetail.AdminTimesData.OrderBy(
                    (x) => x.DruRoundTimes
                  )
                );
            }
          } else if (
            oScheduleDetailsVM != null &&
            oScheduleDetailsVM.AdminTimeGrdData != null &&
            oScheduleDetailsVM.AdminTimeGrdData.Count > 0
          ) {
            if (bIsFixed)
              oAdminTimesData =
                new ObservableCollection<GrdAdminstrativeTimesCols>(
                  oScheduleDetailsVM.AdminTimeGrdData.OrderBy(
                    (x) => x.FixedTimes
                  )
                );
            else
              oAdminTimesData =
                new ObservableCollection<GrdAdminstrativeTimesCols>(
                  oScheduleDetailsVM.AdminTimeGrdData.OrderBy(
                    (x) => x.DruRoundTimes
                  )
                );
          } else if (
            oMultipleDoseDetail != null &&
            oMultipleDoseDetail.ScheduleDetailsData != null &&
            oMultipleDoseDetail.ScheduleDetailsData.Count > 0
          ) {
            oScheduleDetailsData =
              new ObservableCollection<ScheduleDetailsCols>(
                oMultipleDoseDetail.ScheduleDetailsData.OrderBy(
                  (x) => x.ScheduleTime
                )
              );
          } else if (
            oScheduleDetailsVM != null &&
            oScheduleDetailsVM.GrdData != null &&
            oScheduleDetailsVM.GrdData.Count > 0
          ) {
            oScheduleDetailsData =
              new ObservableCollection<ScheduleDetailsCols>(
                oScheduleDetailsVM.GrdData.OrderBy((x) => x.ScheduleTime)
              );
          } else if (
            oMultipleDoseDetail != null &&
            oMultipleDoseDetail.FreqDetails != null
          ) {
            if (bIsFixed && oMultipleDoseDetail.FreqDetails.oFixedTimes != null)
              oScheduleDetails =
                new ObservableCollection<IPPMAManagePrescSer.IPPScheduledetails>(
                  oMultipleDoseDetail.FreqDetails.oFixedTimes
                );
            else if (oMultipleDoseDetail.FreqDetails.oDrugRoundTimes != null)
              oScheduleDetails =
                new ObservableCollection<IPPMAManagePrescSer.IPPScheduledetails>(
                  oMultipleDoseDetail.FreqDetails.oDrugRoundTimes
                );
          } else if (
            oScheduleDetailsVM != null &&
            oScheduleDetailsVM.FreqDetails != null
          ) {
            if (bIsFixed && oScheduleDetailsVM.FreqDetails.oFixedTimes != null)
              oScheduleDetails =
                new ObservableCollection<IPPMAManagePrescSer.IPPScheduledetails>(
                  oScheduleDetailsVM.FreqDetails.oFixedTimes
                );
            else if (oScheduleDetailsVM.FreqDetails.oDrugRoundTimes != null)
              oScheduleDetails =
                new ObservableCollection<IPPMAManagePrescSer.IPPScheduledetails>(
                  oScheduleDetailsVM.FreqDetails.oDrugRoundTimes
                );
          }
          if (oAdminTimesData != null) {
            let breakLoop: boolean = false;
            while (_TmpSceduleCount < NoOfSchedules) {
              if (oAdminTimesData != null && oAdminTimesData.Count > 0) {
                for (let i: number = 0; i < oAdminTimesData.Count; i++) {
                  if (bIsFixed) sSlotTime = oAdminTimesData[i].FixedTimes;
                  else sSlotTime = oAdminTimesData[i].DruRoundTimes;
                  if (!String.IsNullOrEmpty(sSlotTime)) {
                    if (
                      oIPPFrequency != null &&
                      String.Equals(oIPPFrequency.UOM, 'CC_MEDDRSN2')
                    ) {
                      if (
                        lstScheduleDate != null &&
                        lstScheduleDate.Count == 0
                      ) {
                        oTempStartDttm = MCommonBB.GetFirstDateOfweek(
                          oTempStartDttm,
                          oMultipleDoseDetail.EndDTTM,
                          oIPPFrequency,
                          oMultipleDoseDetail.oAdminTimesVM
                        );
                        if (DateTime.Equals(oTempStartDttm, DateTime.MinValue)) {
                          breakLoop = true;
                          break;
                        }
                      }
                      if (
                        (oTempStartDttm.DayOfWeek == DayOfWeek.Sunday &&
                          oIPPFrequency.IsSunday) ||
                        (oTempStartDttm.DayOfWeek == DayOfWeek.Monday &&
                          oIPPFrequency.IsMonday) ||
                        (oTempStartDttm.DayOfWeek == DayOfWeek.Tuesday &&
                          oIPPFrequency.IsTuesday) ||
                        (oTempStartDttm.DayOfWeek == DayOfWeek.Wednesday &&
                          oIPPFrequency.IsWednesday) ||
                        (oTempStartDttm.DayOfWeek == DayOfWeek.Thursday &&
                          oIPPFrequency.IsThursday) ||
                        (oTempStartDttm.DayOfWeek == DayOfWeek.Friday &&
                          oIPPFrequency.IsFriday) ||
                        (oTempStartDttm.DayOfWeek == DayOfWeek.Saturday &&
                          oIPPFrequency.IsSaturday)
                      ) {
                        let oSlotDTTM: DateTime =
                          oTempStartDttm.DateTime.AddMinutes(
                            PrescriptionHelper.GetTimeInMinutes(sSlotTime)
                          );
                        if (
                          DateTime.GreaterThanOrEqualTo(oSlotDTTM, StartDTTM) &&
                          _TmpSceduleCount < NoOfSchedules
                        ) {
                          lstScheduleDate.Add(oSlotDTTM);
                          _TmpSceduleCount++;
                        }
                      } else if (
                        !oIPPFrequency.IsSunday &&
                        !oIPPFrequency.IsMonday &&
                        !oIPPFrequency.IsTuesday &&
                        !oIPPFrequency.IsWednesday &&
                        !oIPPFrequency.IsThursday &&
                        !oIPPFrequency.IsFriday &&
                        !oIPPFrequency.IsSaturday
                      ) {
                        let oSlotDTTM: DateTime =
                          oTempStartDttm.DateTime.AddMinutes(
                            PrescriptionHelper.GetTimeInMinutes(sSlotTime)
                          );
                        if (
                          DateTime.GreaterThanOrEqualTo(oSlotDTTM, StartDTTM) &&
                          _TmpSceduleCount < NoOfSchedules
                        ) {
                          lstScheduleDate.Add(oSlotDTTM);
                          _TmpSceduleCount++;
                        }
                      } else if (
                        oIPPFrequency != null &&
                        oIPPFrequency.LowPeriod > oIPPFrequency.LowEvent
                      ) {
                        let oSlotDTTM: DateTime =
                          oTempStartDttm.DateTime.AddMinutes(
                            PrescriptionHelper.GetTimeInMinutes(sSlotTime)
                          );
                        if (
                          DateTime.GreaterThanOrEqualTo(oSlotDTTM, StartDTTM) &&
                          _TmpSceduleCount < NoOfSchedules
                        ) {
                          lstScheduleDate.Add(oSlotDTTM);
                          _TmpSceduleCount++;
                        }
                      }
                    } else {
                      let oSlotDTTM: DateTime =
                        oTempStartDttm.DateTime.AddMinutes(
                          PrescriptionHelper.GetTimeInMinutes(sSlotTime)
                        );
                      if (
                        DateTime.GreaterThanOrEqualTo(oSlotDTTM, StartDTTM) &&
                        _TmpSceduleCount < NoOfSchedules
                      ) {
                        lstScheduleDate.Add(oSlotDTTM);
                        _TmpSceduleCount++;
                      }
                    }
                  }
                }
                if (breakLoop) break;
                if (
                  oIPPFrequency != null &&
                  oIPPFrequency.LowPeriod > oIPPFrequency.LowEvent
                ) {
                  switch (oIPPFrequency.UOM) {
                    case 'CC_MEDDRSN1':
                      oTempStartDttm = oTempStartDttm.AddDays(
                        oIPPFrequency.LowPeriod
                      );
                      break;
                    case 'CC_MEDDRSN2':
                      oTempStartDttm = oTempStartDttm.AddDays(
                        7 * oIPPFrequency.LowPeriod
                      );
                      break;
                    case 'CC_MEDRSN3':
                      oTempStartDttm = oTempStartDttm.AddDays(
                        28 * oIPPFrequency.LowPeriod
                      );
                      break;
                  }
                } else {
                  if (
                    oIPPFrequency != null &&
                    String.Equals(oIPPFrequency.UOM, 'CC_MEDRSN3')
                  ) {
                    oTempStartDttm = oTempStartDttm.AddDays(28);
                  } else {
                    oTempStartDttm = oTempStartDttm.AddDays(1);
                  }
                }
              }
            }
          } else if (oScheduleDetailsData != null) {
            while (_TmpSceduleCount < NoOfSchedules) {
              if (
                oScheduleDetailsData != null &&
                oScheduleDetailsData.Count > 0
              ) {
                for (let i: number = 0; i < oScheduleDetailsData.Count; i++) {
                  sSlotTime = oScheduleDetailsData[i].ScheduleTime;
                  if (!String.IsNullOrEmpty(sSlotTime)) {
                    if (
                      oIPPFrequency != null &&
                      String.Equals(oIPPFrequency.UOM, 'CC_MEDDRSN2')
                    ) {
                      if (
                        lstScheduleDate != null &&
                        lstScheduleDate.Count == 0
                      ) {
                        oTempStartDttm = MCommonBB.GetFirstDateOfweek(
                          oTempStartDttm,
                          oMultipleDoseDetail.EndDTTM,
                          oIPPFrequency,
                          oMultipleDoseDetail.oAdminTimesVM
                        );
                        if (DateTime.Equals(oTempStartDttm, DateTime.MinValue)) {
                          break;
                        }
                      }
                      if (
                        (oTempStartDttm.DayOfWeek == DayOfWeek.Sunday &&
                          oIPPFrequency.IsSunday) ||
                        (oTempStartDttm.DayOfWeek == DayOfWeek.Monday &&
                          oIPPFrequency.IsMonday) ||
                        (oTempStartDttm.DayOfWeek == DayOfWeek.Tuesday &&
                          oIPPFrequency.IsTuesday) ||
                        (oTempStartDttm.DayOfWeek == DayOfWeek.Wednesday &&
                          oIPPFrequency.IsWednesday) ||
                        (oTempStartDttm.DayOfWeek == DayOfWeek.Thursday &&
                          oIPPFrequency.IsThursday) ||
                        (oTempStartDttm.DayOfWeek == DayOfWeek.Friday &&
                          oIPPFrequency.IsFriday) ||
                        (oTempStartDttm.DayOfWeek == DayOfWeek.Saturday &&
                          oIPPFrequency.IsSaturday)
                      ) {
                        let oSlotDTTM: DateTime =
                          oTempStartDttm.DateTime.AddMinutes(
                            PrescriptionHelper.GetTimeInMinutes(sSlotTime)
                          );
                        if (
                          DateTime.GreaterThanOrEqualTo(oSlotDTTM, StartDTTM) &&
                          _TmpSceduleCount < NoOfSchedules
                        ) {
                          lstScheduleDate.Add(oSlotDTTM);
                          _TmpSceduleCount++;
                        }
                      } else if (
                        !oIPPFrequency.IsSunday &&
                        !oIPPFrequency.IsMonday &&
                        !oIPPFrequency.IsTuesday &&
                        !oIPPFrequency.IsWednesday &&
                        !oIPPFrequency.IsThursday &&
                        !oIPPFrequency.IsFriday &&
                        !oIPPFrequency.IsSaturday
                      ) {
                        let oSlotDTTM: DateTime =
                          oTempStartDttm.DateTime.AddMinutes(
                            PrescriptionHelper.GetTimeInMinutes(sSlotTime)
                          );
                        if (
                         DateTime.GreaterThanOrEqualTo( oSlotDTTM, StartDTTM) &&
                          _TmpSceduleCount < NoOfSchedules
                        ) {
                          lstScheduleDate.Add(oSlotDTTM);
                          _TmpSceduleCount++;
                        }
                      } else if (
                        oIPPFrequency != null &&
                        oIPPFrequency.LowPeriod > oIPPFrequency.LowEvent
                      ) {
                        let oSlotDTTM: DateTime =
                          oTempStartDttm.DateTime.AddMinutes(
                            PrescriptionHelper.GetTimeInMinutes(sSlotTime)
                          );
                        if (
                          DateTime.GreaterThanOrEqualTo(oSlotDTTM, StartDTTM) &&
                          _TmpSceduleCount < NoOfSchedules
                        ) {
                          lstScheduleDate.Add(oSlotDTTM);
                          _TmpSceduleCount++;
                        }
                      }
                    } else {
                      let oSlotDTTM: DateTime =
                        oTempStartDttm.DateTime.AddMinutes(
                          PrescriptionHelper.GetTimeInMinutes(sSlotTime)
                        );
                      if (
                        DateTime.GreaterThanOrEqualTo(oSlotDTTM, StartDTTM) &&
                        _TmpSceduleCount < NoOfSchedules
                      ) {
                        lstScheduleDate.Add(oSlotDTTM);
                        _TmpSceduleCount++;
                      }
                    }
                  }
                }
                if (
                  oIPPFrequency != null &&
                  oIPPFrequency.LowPeriod > oIPPFrequency.LowEvent
                ) {
                  switch (oIPPFrequency.UOM) {
                    case 'CC_MEDDRSN1':
                      oTempStartDttm = oTempStartDttm.AddDays(
                        oIPPFrequency.LowPeriod
                      );
                      break;
                    case 'CC_MEDDRSN2':
                      oTempStartDttm = oTempStartDttm.AddDays(
                        7 * oIPPFrequency.LowPeriod
                      );
                      break;
                    case 'CC_MEDRSN3':
                      oTempStartDttm = oTempStartDttm.AddDays(
                        28 * oIPPFrequency.LowPeriod
                      );
                      break;
                  }
                } else {
                  if (
                    oIPPFrequency != null &&
                    String.Equals(oIPPFrequency.UOM, 'CC_MEDRSN3')
                  ) {
                    oTempStartDttm = oTempStartDttm.AddDays(28);
                  } else {
                    oTempStartDttm = oTempStartDttm.AddDays(1);
                  }
                }
              }
            }
          } else if (oScheduleDetails != null) {
            while (_TmpSceduleCount < NoOfSchedules) {
              if (oScheduleDetails != null && oScheduleDetails.Count > 0) {
                for (let i: number = 0; i < oScheduleDetails.Count; i++) {
                  if (bIsFixed) sSlotTime = oScheduleDetails[i].ScheduledTime;
                  else sSlotTime = oScheduleDetails[i].ScheduledTime;
                  if (!String.IsNullOrEmpty(sSlotTime)) {
                    if (
                      oIPPFrequency != null &&
                      String.Equals(oIPPFrequency.UOM, 'CC_MEDDRSN2')
                    ) {
                      if (
                        lstScheduleDate != null &&
                        lstScheduleDate.Count == 0
                      ) {
                        oTempStartDttm = MCommonBB.GetFirstDateOfweek(
                          oTempStartDttm,
                          oMultipleDoseDetail.EndDTTM,
                          oIPPFrequency,
                          oMultipleDoseDetail.oAdminTimesVM
                        );
                        if (DateTime.Equals(oTempStartDttm, DateTime.MinValue)) {
                          break;
                        }
                      }
                      if (
                        (oTempStartDttm.DayOfWeek == DayOfWeek.Sunday &&
                          oIPPFrequency.IsSunday) ||
                        (oTempStartDttm.DayOfWeek == DayOfWeek.Monday &&
                          oIPPFrequency.IsMonday) ||
                        (oTempStartDttm.DayOfWeek == DayOfWeek.Tuesday &&
                          oIPPFrequency.IsTuesday) ||
                        (oTempStartDttm.DayOfWeek == DayOfWeek.Wednesday &&
                          oIPPFrequency.IsWednesday) ||
                        (oTempStartDttm.DayOfWeek == DayOfWeek.Thursday &&
                          oIPPFrequency.IsThursday) ||
                        (oTempStartDttm.DayOfWeek == DayOfWeek.Friday &&
                          oIPPFrequency.IsFriday) ||
                        (oTempStartDttm.DayOfWeek == DayOfWeek.Saturday &&
                          oIPPFrequency.IsSaturday)
                      ) {
                        let oSlotDTTM: DateTime =
                          oTempStartDttm.DateTime.AddMinutes(
                            Convert.ToInt32(sSlotTime)
                          );
                        if (
                          DateTime.GreaterThanOrEqualTo(oSlotDTTM, StartDTTM) &&
                          _TmpSceduleCount < NoOfSchedules
                        ) {
                          lstScheduleDate.Add(oSlotDTTM);
                          _TmpSceduleCount++;
                        }
                      } else if (
                        !oIPPFrequency.IsSunday &&
                        !oIPPFrequency.IsMonday &&
                        !oIPPFrequency.IsTuesday &&
                        !oIPPFrequency.IsWednesday &&
                        !oIPPFrequency.IsThursday &&
                        !oIPPFrequency.IsFriday &&
                        !oIPPFrequency.IsSaturday
                      ) {
                        let oSlotDTTM: DateTime =
                          oTempStartDttm.DateTime.AddMinutes(
                            Convert.ToInt32(sSlotTime)
                          );
                        if (
                          DateTime.GreaterThanOrEqualTo(oSlotDTTM, StartDTTM)&&
                          _TmpSceduleCount < NoOfSchedules
                        ) {
                          lstScheduleDate.Add(oSlotDTTM);
                          _TmpSceduleCount++;
                        }
                      } else if (
                        oIPPFrequency != null &&
                        oIPPFrequency.LowPeriod > oIPPFrequency.LowEvent
                      ) {
                        let oSlotDTTM: DateTime =
                          oTempStartDttm.DateTime.AddMinutes(
                            PrescriptionHelper.GetTimeInMinutes(sSlotTime)
                          );
                        if (
                          DateTime.GreaterThanOrEqualTo(oSlotDTTM, StartDTTM) &&
                          _TmpSceduleCount < NoOfSchedules
                        ) {
                          lstScheduleDate.Add(oSlotDTTM);
                          _TmpSceduleCount++;
                        }
                      }
                    } else {
                      let oSlotDTTM: DateTime =
                        oTempStartDttm.DateTime.AddMinutes(
                          Convert.ToInt32(sSlotTime)
                        );
                      if (
                        DateTime.GreaterThanOrEqualTo(oSlotDTTM, StartDTTM) &&
                        _TmpSceduleCount < NoOfSchedules
                      ) {
                        lstScheduleDate.Add(oSlotDTTM);
                        _TmpSceduleCount++;
                      }
                    }
                  }
                }
                if (
                  oIPPFrequency != null &&
                  oIPPFrequency.LowPeriod > oIPPFrequency.LowEvent
                ) {
                  switch (oIPPFrequency.UOM) {
                    case 'CC_MEDDRSN1':
                      oTempStartDttm = oTempStartDttm.AddDays(
                        oIPPFrequency.LowPeriod
                      );
                      break;
                    case 'CC_MEDDRSN2':
                      oTempStartDttm = oTempStartDttm.AddDays(
                        7 * oIPPFrequency.LowPeriod
                      );
                      break;
                    case 'CC_MEDRSN3':
                      oTempStartDttm = oTempStartDttm.AddDays(
                        28 * oIPPFrequency.LowPeriod
                      );
                      break;
                  }
                } else {
                  if (
                    oIPPFrequency != null &&
                    String.Equals(oIPPFrequency.UOM, 'CC_MEDRSN3')
                  ) {
                    oTempStartDttm = oTempStartDttm.AddDays(28);
                  } else {
                    oTempStartDttm = oTempStartDttm.AddDays(1);
                  }
                }
              }
            }
          }
        }
      }
    }
    return lstScheduleDate;
  }
  public static GetTimeInMinutes(time: string): number {
    let nMins: number = 0;
    let nHrs: number = 0;
    if (!String.IsNullOrEmpty(time)) {
      let arrTime: string[] = time.Split(':');
      if (arrTime instanceof Array && arrTime.length > 0) {
        Number.TryParse(arrTime[0], (o) => {
          nHrs = o;
        });
      }
      if (arrTime.length > 1) {
        Number.TryParse(arrTime[1], (o) => {
          nMins = o;
        });
      }
    }
    nMins += nHrs * 60;
    return nMins;
  }
  public static EndDTTMforDurationDose(
    objgrddata: MultipleDoseDetail,
    oScheduleDetailsVM: ScheduleDetailsSteppedVM
  ): DateTime {
    let oEndDTTM: DateTime = new DateTime();
    let lstScheduleDates: List<DateTime> =
      PrescriptionHelper.GetScheduleDatesForDoseDuration(
        objgrddata,
        oScheduleDetailsVM
      );
    if (lstScheduleDates != null && lstScheduleDates.Count > 0) {
      let tmpEndDateTime: DateTime = lstScheduleDates.Max((o) => o);
      oEndDTTM = tmpEndDateTime.AddMinutes(1);
    }
    else
    {
      oEndDTTM = DateTime.MinValue;
    }
    return oEndDTTM;
  }
  public static async PrintPrescription(
    wizardcontext: WizardContextCollection
  ): Promise<void> {
    if (wizardcontext != null) {
      // let oParam: string[] = new Array(11);
      // oParam[0] = ContextInfo.MenuCode;
      wizardcontext["MenuCode"] = ContextInfo.MenuCode;
      // oParam[1] = 'FINISH';
      wizardcontext["sWIZStatus"] = "FINISH";
      // oParam[2] = wizardcontext['DIS_SUM'];
      // oParam[3] = wizardcontext['TypeExist'];
      wizardcontext["PrescriptionDetails"] =  ContextInfo.MenuCode == 'MED_CA_CLN_VRFY_SL_P2'
      ? wizardcontext['PrintData']
      : wizardcontext['PrescriptionDetails'];;
      // oParam[4] =
      //   ContextInfo.MenuCode == 'MED_CA_CLN_VRFY_SL_P2'
      //     ? wizardcontext['PrintData']
      //     : wizardcontext['PrescriptionDetails'];
      // oParam[5] = wizardcontext['PrinterPolicy'];
      // oParam[6] = wizardcontext['IsSubmitPrint'];
      let lnPrimarypatOID: number = PatientContext.PatientOID;
      if (PatientContext.MergedPatientOID > 0) {
        // oParam[7] = PatientContext.MergedPatientOID.ToString();
        wizardcontext["sPatientOID"] = PatientContext.MergedPatientOID.ToString();
      } else {
        // oParam[7] = PatientContext.PatientOID.ToString();
        wizardcontext["sPatientOID"] = PatientContext.PatientOID.ToString();
      }
      // oParam[8] = PatientContext.EncounterOid.ToString();
      wizardcontext["sEncounter"] = PatientContext.EncounterOid.ToString();
      // oParam[9] = wizardcontext['IsClnicalNote'];
      // oParam[10] = wizardcontext['IPPALTLOCAL'];
      //let oReturn = HtmlPage.Window.Invoke('PrintPrescription', oParam);
      // let oReturn = await HtmlPage.Window.InvokeAsync("PrintPrescription", oParam);
      // window.parent.postMessage(JSON.stringify({RequestID : 'LbmSData', data: JSON.stringify(oParam)}), '*');
      if (
        PatientContext.MergedPatientOID > 0 &&
        !String.IsNullOrEmpty(PatientContext.IsMergedPatient) &&
        (PatientContext.IsMergedPatient == '1' ||
          PatientContext.IsMergedPatient == '2')
      ) {
        let oReturn1 = HtmlPage.Window.Invoke(
          'SetPrimaryPatientContext',
          lnPrimarypatOID.ToString()
        );
      }
      return wizardcontext as any;
    }
  }
  public static IsChangingDoseValuesGotChanged(
    oChangedDoseScheduleDetails: ScheduleDetailsSteppedVM,
    oSelectedDoseDetail: MultipleDoseDetail
  ): boolean {
    let isModified: boolean = false;
    if (
      oSelectedDoseDetail != null &&
      oSelectedDoseDetail.ScheduleDetailsData != null &&
      oChangedDoseScheduleDetails != null &&
      oChangedDoseScheduleDetails.GrdData != null
    ) {
      let nExistingDoseValueCount: number = 0;
      let nModifiedDoseValueCount: number = 0;
      let sExistingScheduleTime: string = String.Empty;
      let sModifiedScheduleTime: string = String.Empty;
      let nScheduleDetailsCount: number =
        oSelectedDoseDetail.ScheduleDetailsData.Count;
      for (let iCnt: number = 0; iCnt < nScheduleDetailsCount; iCnt++) {
        let oExistingScheduleDoseValueData: string[] =
          oSelectedDoseDetail.ScheduleDetailsData[iCnt].ScheduleDoseValue.Where(
            (oItem) => !String.IsNullOrEmpty(oItem)
          ).ToArray();
        let oModifiedScheduleDoseValueData: string[] =
          oChangedDoseScheduleDetails.GrdData[iCnt].ScheduleDoseValue.Where(
            (oItem) => !String.IsNullOrEmpty(oItem)
          ).ToArray();
        sExistingScheduleTime =
          oSelectedDoseDetail.ScheduleDetailsData[iCnt].ScheduleTime;
        sModifiedScheduleTime =
          oChangedDoseScheduleDetails.GrdData[iCnt].ScheduleTime;
        nExistingDoseValueCount = oExistingScheduleDoseValueData.length;
        nModifiedDoseValueCount = oModifiedScheduleDoseValueData.length;
        if (!String.Equals(sExistingScheduleTime, sModifiedScheduleTime)) {
          isModified = true;
          break;
        }
        if (nExistingDoseValueCount != nModifiedDoseValueCount) {
          isModified = true;
          break;
        }
        for (let jCnt: number = 0; jCnt < nExistingDoseValueCount; jCnt++) {
          if (
            !String.Equals(
              oExistingScheduleDoseValueData[jCnt],
              oModifiedScheduleDoseValueData[jCnt]
            )
          ) {
            isModified = true;
            break;
          }
        }
        if (isModified) break;
      }
    }
    return isModified;
  }
  public static ValidateAdminTimesAgainstGivenDTTM(
    _InputDTTM: DateTime,
    _AdminTimesList: ObservableCollection<GrdAdminstrativeTimesCols>,
    _IsFixedTime: boolean
  ): boolean {
    let _IsAnyAdminTimeEqualToGivenDTTM: boolean = false;
    let _IsAllAdminTimesLessThanGivenDTTM: boolean = false;
    if (
      DateTime.NotEquals(_InputDTTM, DateTime.MinValue) &&
      _AdminTimesList != null &&
      _AdminTimesList.Count > 0
    ) {
      let nAdminTimesCount: number = _AdminTimesList.Count;
      let nCountOfAdminTimesLessThanGivenDTTM: number = 0;
      for (
        let nAdminTimeIdx: number = 0;
        nAdminTimeIdx < nAdminTimesCount;
        nAdminTimeIdx++
      ) {
        let _bAdminTime: boolean;
        let ts: TimeSpan = new TimeSpan();
        if (_IsFixedTime) {
          _bAdminTime = TimeSpan.TryParse(
            _AdminTimesList[nAdminTimeIdx].FixedTimes,
            (o) => {
              ts = o;
            }
          );
        } else {
          _bAdminTime = TimeSpan.TryParse(
            _AdminTimesList[nAdminTimeIdx].DruRoundTimes,
            (o) => {
              ts = o;
            }
          );
        }
        if (_bAdminTime) {
          if (ts == _InputDTTM.TimeOfDay) {
            _IsAnyAdminTimeEqualToGivenDTTM = true;
          }
          if (ts <= _InputDTTM.TimeOfDay) {
            nCountOfAdminTimesLessThanGivenDTTM += 1;
          }
        }
      }
      _IsAllAdminTimesLessThanGivenDTTM =
        nCountOfAdminTimesLessThanGivenDTTM == nAdminTimesCount;
    }
    return _IsAnyAdminTimeEqualToGivenDTTM || _IsAllAdminTimesLessThanGivenDTTM;
  }
  public static CheckHeightOutOfDate(): boolean {
    let IsHeightOutdated: boolean = false;
    if (
      MedicationCommonProfileData.PrescribeConfig != null &&
      MedicationCommonProfileData.PrescribeConfig.HghtWghtPromptCriteria !=
        null &&
      MedicationCommonProfileData.PrescribeConfig.HghtWghtPromptCriteria.Count >
        0
    ) {
      let dtPatientHeightRecordedOn: DateTime = DateTime.MinValue;
      if (!String.IsNullOrEmpty(PatientContext.PatientHeightRecordedOn)) {
        dtPatientHeightRecordedOn = Convert.ToDateTime(
          PatientContext.PatientHeightRecordedOn
        );
      }
      let dtCurrentDate: DateTime = CommonBB.GetServerDateTime();
      let LatUpdateDayDiffForHeight: number = dtCurrentDate.Subtract(
        dtPatientHeightRecordedOn
      ).Days;
      let PatientAgeInDays: number = 0;
      if (!String.IsNullOrEmpty(PatientContext.DOB)) {
        PatientAgeInDays = dtCurrentDate.Subtract(
          Convert.ToDateTime(PatientContext.DOB)
        ).Days;
      }
      
      let HghtWghtPromptCriteria = MedicationCommonProfileData.PrescribeConfig.HghtWghtPromptCriteria.Where(
        (x) => String.Equals(x.HeightWeightCode, CConstants.HeightCode));
      for ( let i = 0; i < HghtWghtPromptCriteria.Count(); i++ ){
        let x : HghtWghtPrompt = HghtWghtPromptCriteria[i];
        if (
          ((String.Equals(x.AgeRangeUOMCode, CConstants.DayCode) &&
            PatientAgeInDays >=
              Convert.ToInt64(x.AgeRangeValue.Split('-')[0]) &&
            PatientAgeInDays <=
              Convert.ToInt64(x.AgeRangeValue.Split('-')[1])) ||
            (String.Equals(x.AgeRangeUOMCode, CConstants.MonthCode) &&
              PatientAgeInDays >=
                dtCurrentDate.Subtract(
                  dtCurrentDate.AddMonths(
                    -Convert.ToInt32(x.AgeRangeValue.Split('-')[0])
                  )
                ).Days &&
              PatientAgeInDays <=
                dtCurrentDate.Subtract(
                  dtCurrentDate.AddMonths(
                    -(Convert.ToInt32(x.AgeRangeValue.Split('-')[1]) + 1)
                  )
                ).Days -
                  1) ||
            (String.Equals(x.AgeRangeUOMCode, CConstants.YearCode) &&
              PatientAgeInDays >=
                dtCurrentDate.Subtract(
                  dtCurrentDate.AddYears(
                    -Convert.ToInt32(x.AgeRangeValue.Split('-')[0])
                  )
                ).Days &&
              PatientAgeInDays <=
                dtCurrentDate.Subtract(
                  dtCurrentDate.AddYears(
                    -(Convert.ToInt32(x.AgeRangeValue.Split('-')[1]) + 1)
                  )
                ).Days -
                  1) ||
            (String.Equals(x.AgeRangeUOMCode, CConstants.WeekCode) &&
              PatientAgeInDays >=
                dtCurrentDate.Subtract(
                  dtCurrentDate.AddDays(
                    -Convert.ToInt32(x.AgeRangeValue.Split('-')[0]) *
                      CConstants.WeekDuration
                  )
                ).Days &&
              PatientAgeInDays <=
                dtCurrentDate.Subtract(
                  dtCurrentDate.AddDays(
                    -(Convert.ToInt32(x.AgeRangeValue.Split('-')[1]) + 1) *
                      CConstants.WeekDuration
                  )
                ).Days -
                  1)) &&
          ((String.Equals(x.DurationCode, CConstants.DayCode) &&
            LatUpdateDayDiffForHeight >= x.Duration) ||
            (String.Equals(x.DurationCode, CConstants.MonthCode) &&
              LatUpdateDayDiffForHeight >=
                x.Duration * CConstants.MonthDuration) ||
            (String.Equals(x.DurationCode, CConstants.YearCode) &&
              LatUpdateDayDiffForHeight >=
                x.Duration * CConstants.YearDuration) ||
            (String.Equals(x.DurationCode, CConstants.WeekCode) &&
              LatUpdateDayDiffForHeight >=
                x.Duration * CConstants.WeekDuration))
        ) {
          IsHeightOutdated = true;
          break;
        }
      }
      return IsHeightOutdated;
    } else return IsHeightOutdated;
  }
  public static CheckWeightOutOfDate(): boolean {
    let IsWeightOutdated: boolean = false;
    if (
      MedicationCommonProfileData.PrescribeConfig != null &&
      MedicationCommonProfileData.PrescribeConfig.HghtWghtPromptCriteria !=
        null &&
      MedicationCommonProfileData.PrescribeConfig.HghtWghtPromptCriteria.Count >
        0
    ) {
      let dtPatientWeightRecordedOn: DateTime = DateTime.MinValue;
      if (!String.IsNullOrEmpty(PatientContext.PatientWeightRecordedOn)) {
        dtPatientWeightRecordedOn = Convert.ToDateTime(
          PatientContext.PatientWeightRecordedOn
        );
      }
      let dtCurrentDate: DateTime = CommonBB.GetServerDateTime();
      let LatUpdateDayDiffForWeight: number = dtCurrentDate.Subtract(
        dtPatientWeightRecordedOn
      ).Days;
      let PatientAgeInDays: number = 0;
      if (!String.IsNullOrEmpty(PatientContext.DOB)) {
        PatientAgeInDays = dtCurrentDate.Subtract(
          Convert.ToDateTime(PatientContext.DOB)
        ).Days;
      }
      let OutDatedWeightAvailable =
        MedicationCommonProfileData.PrescribeConfig.HghtWghtPromptCriteria.Where(
          (x) => String.Equals(x.HeightWeightCode, CConstants.WeightCode));
          for (let i = 0 ; i < OutDatedWeightAvailable.Count(); i++){
            let x : HghtWghtPrompt =  OutDatedWeightAvailable[i];
        
          if (
            ((String.Equals(x.AgeRangeUOMCode, CConstants.DayCode) &&
              PatientAgeInDays >=
                Convert.ToInt64(x.AgeRangeValue.Split('-')[0]) &&
              PatientAgeInDays <=
                Convert.ToInt64(x.AgeRangeValue.Split('-')[1])) ||
              (String.Equals(x.AgeRangeUOMCode, CConstants.MonthCode) &&
                PatientAgeInDays >=
                  dtCurrentDate.Subtract(
                    dtCurrentDate.AddMonths(
                      -Convert.ToInt32(x.AgeRangeValue.Split('-')[0])
                    )
                  ).Days &&
                PatientAgeInDays <=
                  dtCurrentDate.Subtract(
                    dtCurrentDate.AddMonths(
                      -(Convert.ToInt32(x.AgeRangeValue.Split('-')[1]) + 1)
                    )
                  ).Days -
                    1) ||
              (String.Equals(x.AgeRangeUOMCode, CConstants.YearCode) &&
                PatientAgeInDays >=
                  dtCurrentDate.Subtract(
                    dtCurrentDate.AddYears(
                      -Convert.ToInt32(x.AgeRangeValue.Split('-')[0])
                    )
                  ).Days &&
                PatientAgeInDays <=
                  dtCurrentDate.Subtract(
                    dtCurrentDate.AddYears(
                      -(Convert.ToInt32(x.AgeRangeValue.Split('-')[1]) + 1)
                    )
                  ).Days -
                    1) ||
              (String.Equals(x.AgeRangeUOMCode, CConstants.WeekCode) &&
                PatientAgeInDays >=
                  dtCurrentDate.Subtract(
                    dtCurrentDate.AddDays(
                      -Convert.ToInt32(x.AgeRangeValue.Split('-')[0]) *
                        CConstants.WeekDuration
                    )
                  ).Days &&
                PatientAgeInDays <=
                  dtCurrentDate.Subtract(
                    dtCurrentDate.AddDays(
                      -(Convert.ToInt32(x.AgeRangeValue.Split('-')[1]) + 1) *
                        CConstants.WeekDuration
                    )
                  ).Days -
                    1)) &&
            ((String.Equals(x.DurationCode, CConstants.DayCode) &&
              LatUpdateDayDiffForWeight >= x.Duration) ||
              (String.Equals(x.DurationCode, CConstants.MonthCode) &&
                LatUpdateDayDiffForWeight >=
                  x.Duration * CConstants.MonthDuration) ||
              (String.Equals(x.DurationCode, CConstants.YearCode) &&
                LatUpdateDayDiffForWeight >=
                  x.Duration * CConstants.YearDuration) ||
              (String.Equals(x.DurationCode, CConstants.WeekCode) &&
                LatUpdateDayDiffForWeight >=
                  x.Duration * CConstants.WeekDuration))
          ) {
            IsWeightOutdated = true;
            break;
          }
        }
      return IsWeightOutdated;
    } else return IsWeightOutdated;
  }
  public static GetStarDTTM4SequenceBasedOnDuration(
    objPresItemVm: PrescriptionItemVM
  ): DateTime {
    let _startDTTM: DateTime = DateTime.MinValue;
    let _duration: string = String.Empty,
      _durationUOM = String.Empty;
    let nDurVal: number;
    let sMinutes: string = String.Empty;
    let dtStopDTTM: DateTime = DateTime.MinValue;
    if (
      objPresItemVm != null &&
      objPresItemVm.FormViewerDetails != null &&
      objPresItemVm.FormViewerDetails.BasicDetails != null
    ) {
      if (objPresItemVm.FormViewerDetails.BasicDetails.DurationUOM != null) {
        if (
          !String.IsNullOrEmpty(
            objPresItemVm.FormViewerDetails.BasicDetails.Duration
          )
        ) {
          _duration = objPresItemVm.FormViewerDetails.BasicDetails.Duration;
        }
        if (
          objPresItemVm.FormViewerDetails.BasicDetails.DurationUOM != null &&
          !String.IsNullOrEmpty(
            objPresItemVm.FormViewerDetails.BasicDetails.DurationUOM.Value
          )
        ) {
          _durationUOM =
            objPresItemVm.FormViewerDetails.BasicDetails.DurationUOM.Value;
        }
      } else if (
        objPresItemVm.FormViewerDetails.BasicDetails.DurationInfo != null
      ) {
        if (
          !String.IsNullOrEmpty(
            objPresItemVm.FormViewerDetails.BasicDetails.DurationInfo.Value
          )
        ) {
          _duration =
            objPresItemVm.FormViewerDetails.BasicDetails.DurationInfo.Value;
        }
        if (
          objPresItemVm.FormViewerDetails.BasicDetails.DurationInfo.Tag !=
            null &&
          !String.IsNullOrEmpty(
            objPresItemVm.FormViewerDetails.BasicDetails.DurationInfo.Tag.ToString()
          )
        ) {
          _durationUOM =
            objPresItemVm.FormViewerDetails.BasicDetails.DurationInfo.Tag.ToString();
        }
      }
      _startDTTM =
        objPresItemVm.FormViewerDetails.BasicDetails.StartPrescriptionTime;
    }
    if (
      objPresItemVm != null &&
      Number.TryParse(_duration, (o) => {
        nDurVal = o;
      }) &&
      !String.IsNullOrEmpty(_durationUOM)
    ) {
      let dtStartDTTM: DateTime = _startDTTM;
      dtStopDTTM = PrescriptionHelper.GetetNonIVStopDTTMForGivenDuration(
        objPresItemVm,
        dtStartDTTM,
        _durationUOM,
        nDurVal
      );
    }
    return dtStopDTTM;
  }
  private static GetetNonIVStopDTTMForGivenDuration(
    objPresItemVm: PrescriptionItemVM,
    dtStartDTTM: DateTime,
    _durationUOM: string,
    nDurVal: number
  ): DateTime {
    let dtStopDTTM: DateTime = DateTime.MinValue;
    let sMinutes: string = String.Empty;
    switch (_durationUOM) {
      case 'CC_MINUTES':
        sMinutes = 'CC_MINUTES';
        dtStopDTTM = dtStartDTTM
          .ToUniversalTime()
          .AddMinutes(nDurVal)
          .ToLocalTime();
        break;
      case 'CC_HOURS':
        dtStopDTTM = dtStartDTTM
          .ToUniversalTime()
          .AddHours(nDurVal)
          .ToLocalTime();
        break;
      case 'CC_MEDDRSN1':
        dtStopDTTM = dtStartDTTM.AddDays(nDurVal);
        break;
      case 'CC_MEDDRSN2':
        dtStopDTTM = dtStartDTTM.AddDays(7 * nDurVal);
        break;
      case 'CC_MEDRSN3':
        dtStopDTTM = dtStartDTTM.AddDays(28 * nDurVal);
        break;
      case 'CC_MEDRSN4':
        dtStopDTTM = dtStartDTTM.AddYears(nDurVal);
        break;
      case 'CC_DOSES':
        if (
          String.Equals(
            PatientContext.PrescriptionType,
            PrescriptionTypes.Inpatient,
            StringComparison.CurrentCultureIgnoreCase
          )
        ) {
          dtStopDTTM = PrescriptionHelper.GetEnddatetimeforNonIVDoseDuration(
            objPresItemVm,
            dtStartDTTM,
            nDurVal
          );
        }
        break;
    }
    dtStopDTTM = PrescriptionHelper.CheckStopDTTMToHandleMinute(
      dtStartDTTM,
      dtStopDTTM,
      _durationUOM,
      sMinutes
    );
    return dtStopDTTM;
  }
  private static CheckStopDTTMToHandleMinute(
    dtStartDTTM: DateTime,
    dtStopDTTM: DateTime,
    _durationUOM: string,
    sMinutes: string
  ): DateTime {
    if (DateTime.NotEquals(dtStopDTTM, DateTime.MinValue)) {
      if (String.Equals(sMinutes, 'CC_MINUTES')) {
        dtStopDTTM =
          DateTime.GreaterThan(dtStopDTTM , dtStartDTTM)
            ? dtStopDTTM.ToUniversalTime().ToLocalTime()
            : dtStopDTTM;
      } else if (
        String.Equals(_durationUOM, 'CC_DOSES') &&
        String.Equals(
          PatientContext.PrescriptionType,
          PrescriptionTypes.Inpatient,
          StringComparison.CurrentCultureIgnoreCase
        )
      ) {
        dtStopDTTM =
          DateTime.GreaterThan(dtStopDTTM , dtStartDTTM)
            ? dtStopDTTM.ToUniversalTime().AddMinutes(1).ToLocalTime()
            : dtStopDTTM;
      } else {
        dtStopDTTM =
         DateTime.GreaterThan( dtStopDTTM , dtStartDTTM)
            ? dtStopDTTM.ToUniversalTime().AddMinutes(-1).ToLocalTime()
            : dtStopDTTM;
      }
      sMinutes = String.Empty;
    }
    return dtStopDTTM;
  }
  private static GetEnddatetimeforNonIVDoseDuration(
    oResolveItem: PrescriptionItemVM,
    dtStartDttm: DateTime,
    nDurationVal: number
  ): DateTime {
    let FreqDetail: IPPMAManagePrescSer.CResMsgGetAdministrationTimes =
      oResolveItem.GetCResMsgGetAdministrationTimes();
    if (
      (FreqDetail == null ||
        (FreqDetail != null && FreqDetail.oFrequency == null)) &&
      oResolveItem.FormViewerDetails.BasicDetails != null &&
      oResolveItem.FormViewerDetails.BasicDetails.SequenceInfo != null &&
      oResolveItem.FormViewerDetails.BasicDetails.SequenceInfo.FreqDetail !=
        null
    ) {
      FreqDetail =
        oResolveItem.FormViewerDetails.BasicDetails.SequenceInfo.FreqDetail;
    }
    let lDuration: number = 0;
    if (oResolveItem.FormViewerDetails.BasicDetails != null && nDurationVal > 0)
      lDuration = Convert.ToDouble(nDurationVal);
    let tmpEndDateTime: DateTime = DateTime.MinValue;
    let lstScheduleDates: List<DateTime> = new List<DateTime>();
    if (FreqDetail != null) {
      lstScheduleDates = MedicationCommonBB.GetScheduleDatesForDoseDuration(
        dtStartDttm,
        dtStartDttm,
        lDuration,
        FreqDetail
      );
    }
    if (lstScheduleDates != null && lstScheduleDates.Count > 0) {
      tmpEndDateTime = lstScheduleDates.Max((o) => o);
    }
    return tmpEndDateTime;
  }
}
export class OrderSetHelper {
  CurrOrderSetGroupOID: string;
  PrevOrderSetGroupOID: string;
  constructor() {}
  public GetOrderSetHeader(
    OrderSetName: string,
    PrescriptionOID: number,
    PrescriptionType: string,
    PrevScheduledDatetime: DateTime,
    OrderSetGroupID: string
  ): PrescriptionItemVM {
    let oOrderSetHeader: PrescriptionItemVM = new PrescriptionItemVM();
    oOrderSetHeader.ShowCells = false;
    oOrderSetHeader.IsOrderSetHeader = true;
    oOrderSetHeader.IsFormViewerIconVisible = Visibility.Collapsed;
    oOrderSetHeader.IsConflictsExists = false;
    oOrderSetHeader.FormViewerDetails = new FormViewerVM();
    oOrderSetHeader.FormViewerDetails.PresItemDRCVM = new PresItemDRCVM();
    oOrderSetHeader.FormViewerDetails.BasicDetails = new BasicDetailsVM(
      oOrderSetHeader
    );
    oOrderSetHeader.FormViewerDetails.BasicDetails.Firstscheduledatetime =
      PrevScheduledDatetime;
    oOrderSetHeader.FormViewerDetails.BasicDetails.InfusionDetails =
      new InfusionVM();
    oOrderSetHeader.FormViewerDetails.BasicDetails.InfusionDetails.IsSequentiallinkvisi =
      Visibility.Collapsed;
    oOrderSetHeader.FormViewerDetails.BasicDetails.IsSequentiallinkvisi =
      Visibility.Collapsed;
    oOrderSetHeader.PrescriptionItem = OrderSetName;
    oOrderSetHeader.PrescriptionOID = PrescriptionOID;
    oOrderSetHeader.PrescriptionType = PrescriptionType;
    oOrderSetHeader.OrderSetGroupID = OrderSetGroupID;
    return oOrderSetHeader;
  }
  public GetGropingHeader(
    HeaderName: string,
    PrescriptionOID: number,
    PrescriptionType: string,
    PrevScheduledDatetime: DateTime,
    isFirst: boolean
  ): PrescriptionItemVM {
    let oGroupHeader: PrescriptionItemVM = new PrescriptionItemVM();
    oGroupHeader.ShowCells = false;
    oGroupHeader.IsGroupHeader = true;
    oGroupHeader.IsFormViewerIconVisible = Visibility.Collapsed;
    oGroupHeader.IsConflictsExists = false;
    oGroupHeader.FormViewerDetails = new FormViewerVM();
    oGroupHeader.FormViewerDetails.PresItemDRCVM = new PresItemDRCVM();
    oGroupHeader.FormViewerDetails.BasicDetails = new BasicDetailsVM(
      oGroupHeader
    );
    oGroupHeader.FormViewerDetails.BasicDetails.InfusionDetails =
      new InfusionVM();
    oGroupHeader.FormViewerDetails.BasicDetails.InfusionDetails.IsSequentiallinkvisi =
      Visibility.Collapsed;
    oGroupHeader.FormViewerDetails.BasicDetails.IsSequentiallinkvisi =
      Visibility.Collapsed;
    oGroupHeader.PrescriptionItem = HeaderName;
    oGroupHeader.PrescriptionOID = PrescriptionOID;
    oGroupHeader.PrescriptionType = PrescriptionType;
    oGroupHeader.GroupHeaderName = HeaderName;
    oGroupHeader.IsFirstHeader = isFirst;
    oGroupHeader.FormViewerDetails.BasicDetails.IsDispalyOnadmission =
      Visibility.Collapsed;
    return oGroupHeader;
  }
  public GetSeqGropingHeader(
    HeaderName: string,
    PrescriptionOID: number,
    PrescriptionType: string,
    PrevScheduledDatetime: DateTime,
    isFirst: boolean
  ): PrescriptionItemVM {
    let oGroupHeader: PrescriptionItemVM = new PrescriptionItemVM();
    oGroupHeader.ShowCells = false;
    oGroupHeader.IsGroupHeader = true;
    oGroupHeader.IsFormViewerIconVisible = Visibility.Collapsed;
    oGroupHeader.IsConflictsExists = false;
    oGroupHeader.FormViewerDetails = new FormViewerVM();
    oGroupHeader.FormViewerDetails.PresItemDRCVM = new PresItemDRCVM();
    oGroupHeader.FormViewerDetails.BasicDetails = new BasicDetailsVM(
      oGroupHeader
    );
    oGroupHeader.FormViewerDetails.BasicDetails.SequenceInfo =
      new SequenceDetail();
    oGroupHeader.FormViewerDetails.BasicDetails.SequenceInfo.IsSequentiallinkvisi =
      Visibility.Collapsed;
    oGroupHeader.FormViewerDetails.BasicDetails.IsSequentiallinkvisi =
      Visibility.Collapsed;
    oGroupHeader.PrescriptionItem = HeaderName;
    oGroupHeader.PrescriptionOID = PrescriptionOID;
    oGroupHeader.PrescriptionType = PrescriptionType;
    oGroupHeader.GroupHeaderName = HeaderName;
    oGroupHeader.IsFirstHeader = isFirst;
    oGroupHeader.FormViewerDetails.BasicDetails.IsDispalyOnadmission =
      Visibility.Collapsed;
    return oGroupHeader;
  }
  public CheckForNewOrderSet(oVM: PrescriptionItemVM): boolean {
    let bNewOrderSet: boolean = false;
    if (
      oVM != null &&
      oVM.FormViewerDetails != null &&
      oVM.FormViewerDetails.BasicDetails != null &&
      oVM.FormViewerDetails.BasicDetails.Ordersets != null &&
      !String.IsNullOrEmpty(oVM.FormViewerDetails.BasicDetails.Ordersets.Value)
    ) {
      this.CurrOrderSetGroupOID = oVM.OrderSetGroupID;
      if (
        !String.IsNullOrEmpty(this.CurrOrderSetGroupOID) &&
        String.IsNullOrEmpty(this.PrevOrderSetGroupOID)
      ) {
        bNewOrderSet = true;
        this.PrevOrderSetGroupOID = this.CurrOrderSetGroupOID;
      } else if (
        !String.IsNullOrEmpty(this.CurrOrderSetGroupOID) &&
        !String.IsNullOrEmpty(this.PrevOrderSetGroupOID) &&
        this.CurrOrderSetGroupOID != this.PrevOrderSetGroupOID
      ) {
        bNewOrderSet = true;
        this.PrevOrderSetGroupOID = this.CurrOrderSetGroupOID;
      }
    } else {
      this.PrevOrderSetGroupOID = String.Empty;
    }
    return bNewOrderSet;
  }
  public CheckForLastItemOfOrderSet(
    oPresItem: ObservableCollection<PrescriptionItemVM>
  ): void {
    let GetTotalOrderSetDrugs = oPresItem.Where(
      (g) =>
        g.formViewerDetails != null &&
        g.formViewerDetails.BasicDetails != null &&
        g.formViewerDetails.BasicDetails.Ordersets != null &&
        g.formViewerDetails.BasicDetails.Ordersets.Value != '0'
    );
    let GetGroupOrderSetDrugs = GetTotalOrderSetDrugs.GroupBy(
      (g) => g.OrderSetGroupID
    );
    if (GetGroupOrderSetDrugs != null) {
      GetGroupOrderSetDrugs.forEach((OrderSetDrug) => {
        if (OrderSetDrug != null && OrderSetDrug.Key != null) {
          let GetOrderSetDrugs = oPresItem
            .Where((c) => c.OrderSetGroupID == OrderSetDrug.Key)
            .Select((s) => s)
            .ToList();
          if (GetOrderSetDrugs != null) {
            let lastitem = GetOrderSetDrugs.OrderBy(
              (c) => c.DisplayOrder
            ).Last();
            let lastitemindex: number = oPresItem.IndexOf(lastitem);
            if (lastitemindex == oPresItem.Count - 1) {
              lastitem.IsOrderSetLastItem = true;
            } else {
              if (!oPresItem.ElementAt(lastitemindex + 1).IsOrderSetHeader) {
                lastitem.IsOrderSetLastItem = true;
              }
            }
          }
        }
      });
    }
  }
}
