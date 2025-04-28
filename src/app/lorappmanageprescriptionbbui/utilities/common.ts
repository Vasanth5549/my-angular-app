import { Component, OnInit } from '@angular/core';
import {
  StringBuilder,
  ProfileFactoryType,
  ContextManager,
  Convert,
  AppActivity,
  ScriptObject,
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
  ObservableCollection,
  CListItem,
  List,
  CSlotCharacteristicsConfig,
  CChartDisplayConfig,
  MedDrugDisplayConfigData,
  PrescribingConfigData,
  ScheduleConfig,
  CClinicalIncidentConfig,
  AddPrescribingConfigData,
  MedicationSearchConfigData,
  CValuesetTerm,
  CContextInformation,
  IEnumerable,
  Visibility,
  ArrayOfString,
  StringSplitOptions
} from 'epma-platform/models';
import {
  AppDialog,
  Color,
  iMultiSelectDropdown,
  iTab,
  iTabItem,
  UserControl,
} from 'epma-platform/controls';
import { HelperService } from 'epma-platform/soapclient';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
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
import {
  DiscontinueCancelVM,
  SelectedPrescriptionItemVM,
} from 'src/app/lorappmedicationcommonbb/viewmodel/discontinuecancelvm';
import {
  DoseFormulaDef,
  PrescriptionItemVM,
} from '../viewmodel/PrescriptionItemVM';
import {
  CConstants,
  ConstDurationUOM,
  DoseTypeCode,
  InfusionTypesCode,
  PrescriptionTypes,
} from './constants';
import { CConstants as Common_CConstants } from 'src/app/lorappmedicationcommonbb/utilities/constants';
import { GlobalVariable, WebServiceURL } from './globalvariable';
import * as Application from 'src/app/lorappcommonbb/amshelper';
import * as ManagePrescSer from '../../shared/epma-platform/soap-client/ManagePrescriptionWS';
import * as IPPManagePrescSer from 'src/app/shared/epma-platform/soap-client/IPPMAManagePrescriptionWS';
import * as IPPMAManagePrescSer from '../../shared/epma-platform/soap-client/IPPMAManagePrescriptionWS';
import { ProfileData } from './profiledata';
import {
  AppContextInfo,
  ClerkFormViewDeftBehaviour,
  ContextInfo,
  PatientContext,
} from 'src/app/lorappcommonbb/utilities/globalvariable';
import {
  DCOverridereasonConceptCodes,
  DCReqDoseSecondUOMConceptCodes,
  MedicationCommonConceptCodeData,
  MedicationCommonProfileData,
} from 'src/app/lorappmedicationcommonbb/utilities/profiledata';
import { IPPMABaseVM } from '../viewmodel/ippmabasevm';
import {
  FieldNames,
  InfusionTypeCode,
} from 'src/app/lorappmedicationcommonbb/utilities/constants';
import { ActivityTypes } from '../model/common';
import { Dictionary } from 'epma-platform/dictionary';
import { CustomTechValidatedItem } from '../viewmodel/customtechvalidateditem';
import { Resource } from '../resource';
import {
  CommonDomainValues,
  MedChartData,
} from 'src/app/lorappmedicationcommonbb/utilities/globalvariable';
import { BasicDetailsVM } from '../viewmodel/BasicDetailsVM';
import {
  BasicDetailsLineItemVM,
  FormViewerLineItemVM,
  InfusionLineItemVM,
  PrescriptionLineItemVM,
} from 'src/app/lorappmedicationcommonbb/utilities/lineitemconstructor';
import { MedicationCommonBB } from 'src/app/lorappmedicationcommonbb/utilities/medicationcommonbb';
import { DoseDetailsdata } from 'src/app/lorappmedicationcommonbb/viewmodel/prescriptionitemdetailsvm';
import { PrescriptionItemAssociations } from '../viewmodel/ordersetsecmezzanineVM';
import { GPConnectItemVM } from '../viewmodel/GPConnectItemVM';
import { CommonBB } from 'src/app/lorappcommonbb/utilities/common';
import { DoseCalculator } from 'src/app/lorappmedicationcommonbb/resource/dosecalculator.designer';
import { MedicationErrors } from '../resource/medicationerrors.designer';
import { Environment } from '../../product/shared/models/Common';
import { ObjectInfo } from '../../shared/epma-platform/soap-client/ManagePrescriptionWS';
import { PropertyChangedEventHandler } from 'src/app/shared/epma-platform/controls/epma-tab/epma-tab.component';
import { CValuesetCollection } from 'src/app/shared/epma-platform/soap-client/CReferenceWS';
import { DataItemDetails, SubsetDetails } from '../model/conditionaldose';
import { BusyMessageWindow } from 'src/app/shared/epma-platform/services/busyMessageWindow.service';
import 'epma-platform/booleanextension';
import 'epma-platform/numberextension';
import 'epma-platform/stringextension';
import {iMath as Math} from 'epma-platform/mathextension';
import 'epma-platform/arrayextension';
import { medFormViewer } from '../view/medformviewer';
import { OrderSetSecMezzanine } from '../view/OrderSetSecMezzanine';
import * as _ from 'lodash';
import { eActivityTypes } from 'src/app/lorappmedicationcommonbb/utilities/common';

export class Common {
  public static ConvertToSelectedPrescriptionItemVM(
    oPrescriptionItemVM: ObservableCollection<Object>
  ): ObservableCollection<SelectedPrescriptionItemVM> {
    let oSelectedPrescriptionItemVM: ObservableCollection<SelectedPrescriptionItemVM> =
      new ObservableCollection<SelectedPrescriptionItemVM>();
    (oPrescriptionItemVM as ObservableCollection<PrescriptionItemVM>).forEach(
      (obj) => {
        if (!obj.IsGroupHeader) {
          let sMCIComponents: string[] = null;
          let sPrescriptionItem: string = String.Empty;
          let nLength: number = 0;
          let sADHOCMCIComponents: StringBuilder = new StringBuilder();
          if (
            obj != null &&
            obj.FormViewerDetails != null &&
            obj.FormViewerDetails.BasicDetails != null
          ) {
            if (
              !String.IsNullOrEmpty(obj.VMVPLorenzoID) &&
              !String.IsNullOrEmpty(obj.VMVPIdentifyingName) &&
              !String.IsNullOrEmpty(obj.PrescriptionItem) &&
              !obj.PrescriptionItem.Contains(obj.VMVPIdentifyingName)
            ) {
              obj.PrescriptionItem =
                obj.VMVPIdentifyingName + ' - ' + obj.PrescriptionItem;
            }
            if (
              !String.IsNullOrEmpty(
                obj.FormViewerDetails.BasicDetails.mCIItemDisplay
              ) &&
              !String.IsNullOrEmpty(
                obj.FormViewerDetails.BasicDetails.MCILorenzoID
              ) &&
              String.Equals(
                obj.FormViewerDetails.BasicDetails.MCILorenzoID,
                CConstants.ADHOC_ITEM_LORENZOID
              )
            ) {
              sMCIComponents =
                obj.FormViewerDetails.BasicDetails.mCIItemDisplay.Split('^');
              if (sMCIComponents != null) {
                nLength = sMCIComponents.length;
                if (nLength > 0) {
                  let MCCnt: number = 0;
                  for (let i: number = 0; i < nLength; i++) {
                    if (!String.IsNullOrEmpty(sMCIComponents[i])) {
                      MCCnt = MCCnt + 1;
                    }
                  }
                  if (MCCnt <= 5) {
                    for (let i: number = 0; i < MCCnt; i++) {
                      if (!String.IsNullOrEmpty(sMCIComponents[i])) {
                        sADHOCMCIComponents.Append(sMCIComponents[i]);
                        if (i != MCCnt - 1)
                          sADHOCMCIComponents.Append(Environment.NewLine);
                      }
                    }
                    sPrescriptionItem = Convert.ToString(sADHOCMCIComponents);
                  } else sPrescriptionItem = obj.PrescriptionItem;
                }
              }
            } else {
              if (!String.IsNullOrEmpty(obj.PrescriptionItem)) {
                sPrescriptionItem = obj.PrescriptionItem;
              } else if (!String.IsNullOrEmpty(obj.MCIItemDisplay)) {
                sPrescriptionItem = obj.MCIItemDisplay;
              } else {
                sPrescriptionItem =
                  obj.FormViewerDetails.BasicDetails.mCIItemDisplay;
              }
            }
          }
          if (obj != null && obj.PrescriberOBOUserOID != 0) {
            Common.PrescriberOBOUserOID = obj.PrescriberOBOUserOID;
          } else {
            Common.PrescriberOBOUserOID =
              obj.PrescriberDetails != null ? obj.PrescriberDetails.OID : 0;
          }
          oSelectedPrescriptionItemVM.Add(
            ObjectHelper.CreateObject(new SelectedPrescriptionItemVM(), {
              IsHold: obj.IsHold,
              PrescriptionItem: sPrescriptionItem,
              PrescriptionItemOID: obj.PrescriptionItemOID,
              PrescriberOBHName:
                obj.PrescriberDetails != null &&
                !String.IsNullOrEmpty(obj.PrescriberDetails.Name)
                  ? obj.PrescriberDetails.Name
                  : String.Empty,
              PrescriberOBHOID: Common.PrescriberOBOUserOID,
              IsSeqInfusion:
                obj.FormViewerDetails.BasicDetails != null &&
                ((obj.FormViewerDetails.BasicDetails.InfusionDetails != null &&
                  obj.FormViewerDetails.BasicDetails.InfusionDetails
                    .GroupSequenceNo > 0) ||
                  (obj.FormViewerDetails.BasicDetails.SequenceInfo != null &&
                    obj.FormViewerDetails.BasicDetails.SequenceInfo
                      .GroupSequenceNo > 0))
                  ? true
                  : false,
              IsInfusion:
                obj.FormViewerDetails.BasicDetails != null &&
                !String.IsNullOrEmpty(
                  obj.FormViewerDetails.BasicDetails.Infused
                ) &&
                String.Compare(
                  obj.FormViewerDetails.BasicDetails.Infused,
                  '1',
                  StringComparison.CurrentCultureIgnoreCase
                ) == 0
                  ? true
                  : false,
              ItemSubType:
                obj.FormViewerDetails.BasicDetails != null &&
                !String.IsNullOrEmpty(
                  obj.FormViewerDetails.BasicDetails.itemSubType
                )
                  ? obj.FormViewerDetails.BasicDetails.itemSubType
                  : String.Empty,
              InfusionType:
                obj.FormViewerDetails.BasicDetails != null &&
                obj.FormViewerDetails.BasicDetails.InfusionType != null &&
                !String.IsNullOrEmpty(
                  obj.FormViewerDetails.BasicDetails.InfusionType.Value
                )
                  ? obj.FormViewerDetails.BasicDetails.InfusionType.Value
                  : String.Empty,
              StartDTTM:
                DateTime.NotEquals(obj.FormViewerDetails.BasicDetails.StartDTTM,
                DateTime.MinValue)
                  ? obj.FormViewerDetails.BasicDetails.StartDTTM
                  : DateTime.MinValue,
              InfInterMitScheduleDTTMs:
                obj.FormViewerDetails.BasicDetails != null &&
                obj.FormViewerDetails.BasicDetails.InfusionDetails != null &&
                obj.FormViewerDetails.BasicDetails.InfusionDetails
                  .InfInterMitScheduleDTTMs != null &&
                obj.FormViewerDetails.BasicDetails.InfusionDetails
                  .InfInterMitScheduleDTTMs.Count > 0
                  ? obj.FormViewerDetails.BasicDetails.InfusionDetails
                      .InfInterMitScheduleDTTMs
                  : null,
              mCIItemDisplay:
                obj.FormViewerDetails.BasicDetails != null &&
                !String.IsNullOrEmpty(
                  obj.FormViewerDetails.BasicDetails.itemSubType
                )
                  ? obj.FormViewerDetails.BasicDetails.mCIItemDisplay
                  : String.Empty,
              ParentprescriptionItemOID:
                obj.FormViewerDetails.BasicDetails != null &&
                obj.FormViewerDetails.BasicDetails.InfusionDetails != null
                  ? obj.FormViewerDetails.BasicDetails.InfusionDetails
                      .ParentPrescriptionItemOID
                  : 0,
              GPConnectID:
                obj.GpConnectMedicationItem != null &&
                !String.IsNullOrEmpty(obj.GpConnectMedicationItem.GPConnectID)
                  ? obj.GpConnectMedicationItem.GPConnectID
                  : String.Empty,
              NonIVGroupSequenceNo:
                obj.FormViewerDetails.BasicDetails != null &&
                obj.FormViewerDetails.BasicDetails.SequenceInfo != null &&
                obj.FormViewerDetails.BasicDetails.SequenceInfo
                  .GroupSequenceNo > 0
                  ? obj.FormViewerDetails.BasicDetails.SequenceInfo
                      .GroupSequenceNo
                  : 0,
              NonIVItemSequenceNo:
                obj.FormViewerDetails.BasicDetails != null &&
                obj.FormViewerDetails.BasicDetails.SequenceInfo != null &&
                obj.FormViewerDetails.BasicDetails.SequenceInfo.ItemSequenceNo >
                  0
                  ? obj.FormViewerDetails.BasicDetails.SequenceInfo
                      .ItemSequenceNo
                  : 0,
            })
          );
        }
      }
    );
    return oSelectedPrescriptionItemVM;
  }
  public static GetConflictConfig(): void {
    if (WebServiceURL.IPPMAManagePrescriptionWS != null) {
      let objService: IPPMAManagePrescSer.IPPMAManagePrescriptionWSSoapClient =
        new IPPMAManagePrescSer.IPPMAManagePrescriptionWSSoapClient();
      let objReqConfig: IPPMAManagePrescSer.CReqMsgGetMedicationConfilictConfig =
        new IPPMAManagePrescSer.CReqMsgGetMedicationConfilictConfig();
      objReqConfig.IsMainAppConflictsBC = '1';
      objReqConfig.oContextInformation = Common.FillContext();
      objService.GetMedicationConfilictConfigCompleted = (s, e) => {
        Common.ConflictsConfig_Completed(s, e);
      };
      objService.GetMedicationConfilictConfigAsync(objReqConfig);
    }
  }
  static ConflictsConfig_Completed(
    sender: Object,
    e: IPPMAManagePrescSer.GetMedicationConfilictConfigCompletedEventArgs
  ): void {
    if (e.Error != null) return;
    let objResConfig: IPPMAManagePrescSer.CResMsgGetMedicationConfilictConfig =
      e.Result;
    if (objResConfig != null) {
      ProfileData.MedConflictConfig = e.Result.oMedicationConflictConfig;
      if (
        (ProfileData.MedConflictConfig != null &&
          ProfileData.MedConflictConfig.TurnOnDRC != null &&
          ProfileData.MedConflictConfig.TurnOnDRC == '1') ||
        (ProfileData.MedConflictConfig == null && PatientContext.IsTurnONDRC)
      ) {
        PatientContext.IsTurnONDRC = true;
      }
    }
  }
  public static GetProfileConfigData(
    oProfileFactory_OnProfileListLoaded: Function
  ): void {
    let oProfileFactory: ProfileFactoryType = new ProfileFactoryType();
    let lstProfileReq: List<ProfileContext> = new List<ProfileContext>();
    let objReq: ProfileContext = null;
    if (MedicationCommonProfileData.SlotCharacteristicsConfig == null) {
      objReq = new ProfileContext();
      objReq.ContextCode = 'MA_ADMINSETTING';
      objReq.ProfileItemKey = 'MASLOTCHARCONFIG';
      objReq.ProfileLevel = ProfileFactoryType.Level.Organisation;
      objReq.ProfileType = typeof CSlotCharacteristicsConfig;
      lstProfileReq.Add(objReq);
    }
    if (ProfileData.ChartDisplayConfig == null) {
      objReq = new ProfileContext();
      objReq.ContextCode = 'MA_ADMINSETTING';
      objReq.ProfileItemKey = 'MACHARTDISPLAYCONFIG';
      objReq.ProfileLevel = ProfileFactoryType.Level.Organisation;
      objReq.ProfileType = typeof CChartDisplayConfig;
      lstProfileReq.Add(objReq);
    }
    if (ProfileData.MedDrugDisplayConfig == null) {
      objReq = new ProfileContext();
      objReq.ContextCode = 'VW_MEDICONFIG';
      objReq.ProfileItemKey = 'DRUGDISPCONFIG';
      objReq.ProfileLevel = ProfileFactoryType.Level.Organisation;
      objReq.ProfileType = typeof MedDrugDisplayConfigData;
      lstProfileReq.Add(objReq);
    }
    if (MedicationCommonProfileData.PrescribeConfig == null) {
      objReq = new ProfileContext();
      objReq.ContextCode = 'VW_MEDICONFIG';
      objReq.ProfileItemKey = 'PRESCONFIG';
      objReq.ProfileLevel = ProfileFactoryType.Level.Organisation;
      objReq.ProfileType = typeof PrescribingConfigData;
      lstProfileReq.Add(objReq);
    }
    if (ProfileData.ScheduleConfig == null) {
      objReq = new ProfileContext();
      objReq.ContextCode = 'VW_MEDICONFIG';
      objReq.ProfileItemKey = 'MEDSCHEDULECONFIG';
      objReq.ProfileLevel = ProfileFactoryType.Level.Organisation;
      objReq.ProfileType = typeof ScheduleConfig;
      lstProfileReq.Add(objReq);
    }
    if (ProfileData.ClinicalIncidentConfig == null) {
      objReq = new ProfileContext();
      objReq.ContextCode = 'MA_ADMINSETTING';
      objReq.ProfileItemKey = 'MACLINICALINCFRMCFG';
      objReq.ProfileLevel = ProfileFactoryType.Level.Organisation;
      objReq.ProfileType = typeof CClinicalIncidentConfig;
      lstProfileReq.Add(objReq);
    }
    objReq = new ProfileContext();
    objReq.ContextCode = 'VW_MEDICONFIG';
    objReq.ProfileItemKey = 'ADDPRESCRIBINGCONFIG';
    objReq.ProfileLevel = ProfileFactoryType.Level.Organisation;
    objReq.ProfileType = typeof AddPrescribingConfigData;
    lstProfileReq.Add(objReq);
    objReq = new ProfileContext();
    objReq.ContextCode = 'VW_MEDICONFIG';
    objReq.ProfileItemKey = 'MEDSEARCHCONFIG';
    objReq.ProfileType = typeof MedicationSearchConfigData;
    objReq.ProfileLevel = ProfileFactoryType.Level.User;
    lstProfileReq.Add(objReq);
    oProfileFactory.OnProfileListLoaded = (s,e) =>{ oProfileFactory_OnProfileListLoaded(s,e)};
    oProfileFactory.GetProfilesData(lstProfileReq.ToArray());
  }
  public static oCValuesetCollection: ObservableCollection<CValuesetCollection>;
  public static sFormStyle: string;
  public static sNonFormStyle: string;
  public static LHSEncounterOID: string;
  public static LHSEncounterType: string;
  public static PrescriberOBOUserOID: number;
  public static LHSiTab: iTab;
  public static oIPPMABaseVM: IPPMABaseVM;
  public static ConceptCodes: ObservableCollection<CValuesetTerm>;
  public static IsClosedEncounter(): boolean {
    if (
      !String.IsNullOrEmpty(PatientContext.EncounterStatusCode) &&
      String.Equals(
        PatientContext.EncounterStatusCode,
        CConstants.ClosedEncounterCode,
        StringComparison.InvariantCultureIgnoreCase
      )
    ) {
      return true;
    }
    return false;
  }
  public static IsWrongAdminTime(
    dtPreviousSchDTTM: DateTime,
    dtLatestSchDTTM: DateTime
  ): boolean {
    let isWrongTime: boolean = false;
    let ts: TimeSpan = TimeSpan.Parse(
      dtPreviousSchDTTM.Subtract(dtLatestSchDTTM).ToString('HH:mm')
    );
    if (ts.TotalMinutes < 120) {
      isWrongTime = true;
    }
    return isWrongTime;
  }
  // The below method is not in used.
  /*
        public static GetConceptDetailsById(sConceptCode: string, GetTermsByCodesCompletedEvent: Function): void {
            if (!String.IsNullOrEmpty(sConceptCode) && GetTermsByCodesCompletedEvent != null) {
                let objTermWS: CTerminologyWSWSSoapClient = new CTerminologyWSWSSoapClient();
                let objReq: CReqMsgGetTermsByCodes = new CReqMsgGetTermsByCodes();
                let objConcept: CQConcepts = new CQConcepts();
                objConcept.csCodingSchemeName = CConstants.CodingSchemeName;
                objConcept.csVersion = CConstants.Version;
                objConcept.csFilterType = null;
                objConcept.csConceptCode = sConceptCode;
                objReq.objConceptsBC = objConcept;
                objReq.oContextInformation = Common.FillContext();
                objTermWS.GetTermsByCodesAsync(objReq);
            }
        }
        */
  public static GetConceptText(
    Type: string,
    ConceptCode: string,
    oTerm: ObservableCollection<CValuesetTerm>
  ): string {
    if (String.Equals(Type, CConstants.sWarning)) {
      return String.Empty;
    }
    if (oTerm == null) {
      return ConceptCode;
    } else {
      return Common.GetText(ConceptCode, oTerm);
    }
  }
  public static GetReferenceValues(
    sConceptCode: string,
    objCValuesetCollection: ObservableCollection<CValuesetCollection>
  ): string {
    let sDisplayText: string = String.Empty;
    if (objCValuesetCollection != null) {
      objCValuesetCollection.forEach((oCValuesetCollection) => {
        if (
          oCValuesetCollection != null &&
          oCValuesetCollection.arrValuesetTerm != null &&
          oCValuesetCollection.arrValuesetTerm.Count > 0
        ) {
          let nLen: number = oCValuesetCollection.arrValuesetTerm.Count;
          for (let nIdx: number = 0; nIdx < nLen; nIdx++) {
            if (
              oCValuesetCollection.arrValuesetTerm[nIdx] != null &&
              !String.IsNullOrEmpty(
                oCValuesetCollection.arrValuesetTerm[nIdx].csCode
              ) &&
              String.Compare(
                oCValuesetCollection.arrValuesetTerm[nIdx].csCode,
                sConceptCode,
                StringComparison.InvariantCultureIgnoreCase
              ) == 0
            ) {
              sDisplayText =
                oCValuesetCollection.arrValuesetTerm[nIdx].csDescription;
              break;
            }
          }
        }
      });
    }
    if (String.IsNullOrEmpty(sDisplayText)) return sConceptCode;
    else return sDisplayText;
  }
  public static GetConceptCode(
    sTermText: string,
    oTerm: ObservableCollection<CValuesetTerm>
  ): string {
    let sConceptCode: string = String.Empty;
    let tmpConceptCode: string = String.Empty;
    if (
      Common.IsTermTextExists(sTermText.Trim(), oTerm, (o) => {
        tmpConceptCode = o;
      }) != false
    )
      sConceptCode = tmpConceptCode;
    else sConceptCode = sTermText;
    return sConceptCode;
  }
  public static IsTermTextExists(
    sTermText: string,
    objConceptCodes: ObservableCollection<CValuesetTerm>,
    out1: (sResultDetails: string) => void
  ): boolean {
    let sResultDetails: string;

    let bResult: boolean = false;
    sResultDetails = String.Empty;
    if (!String.IsNullOrEmpty(sTermText) && objConceptCodes != null) {
      let Results = objConceptCodes
        .Where((term) => term.csDescription == sTermText)
        .Select((term) => term.csCode);
      if (Results != null && Results.Count() > 0)
        sResultDetails = Results.First();
      bResult = !String.IsNullOrEmpty(sResultDetails);
    }
    out1(sResultDetails);
    return bResult;
  }

  public static IsInfusionMultiRoutes(
    Routes: ObservableCollection<CListItem>
  ): boolean {
    let SelMutiRoutes = Routes.Where(
      (SelRoutes) => SelRoutes.IsSelected
    ).Select((SelRoutes) => SelRoutes);
    let SelInfMultiRoutes = Routes.Where(
      (SelInfRoutes) =>
        SelInfRoutes.IsSelected &&
        SelInfRoutes.Tag != null &&
        String.Compare(
          SelInfRoutes.Tag.ToString(),
          '1',
          StringComparison.CurrentCultureIgnoreCase
        ) == 0
    ).Select((SelInfRoutes) => SelInfRoutes);
    if (
      SelMutiRoutes != null &&
      SelInfMultiRoutes != null &&
      SelMutiRoutes.Count() > 0 &&
      SelInfMultiRoutes.Count() > 0 &&
      SelMutiRoutes.Count() == SelInfMultiRoutes.Count()
    ) {
      return true;
    }
    return false;
  }
  public static IsNonInfusionMultiRoutes(
    Routes: ObservableCollection<CListItem>
  ): boolean {
    let SelMutiRoutes = Routes.Where(
      (SelRoutes) => SelRoutes.IsSelected
    ).Select((SelRoutes) => SelRoutes);
    let SelnonInfMultiRoutes = Routes.Where(
      (SelInfRoutes) =>
        SelInfRoutes.IsSelected &&
        ((SelInfRoutes.Tag != null &&
          String.Compare(
            SelInfRoutes.Tag.ToString(),
            '0',
            StringComparison.CurrentCultureIgnoreCase
          ) == 0) ||
          SelInfRoutes.Tag == null)
    ).Select((SelInfRoutes) => SelInfRoutes);
    if (
      SelMutiRoutes != null &&
      SelnonInfMultiRoutes != null &&
      SelMutiRoutes.Count() > 0 &&
      SelnonInfMultiRoutes.Count() > 0 &&
      SelMutiRoutes.Count() == SelnonInfMultiRoutes.Count()
    ) {
      return true;
    }
    return false;
  }
  public static IntervalFreqBlankStartdate(
    lowPeriod: number,
    FreqPeriodCode: string
  ): boolean {
    let IsStartDateBlank: boolean = false;
    if (!String.IsNullOrEmpty(FreqPeriodCode)) {
      let HoursInperiod: number = 0;
      switch (FreqPeriodCode) {
        case 'CC_MINUTES':
          HoursInperiod = lowPeriod / CConstants.NO_OF_MINUTESPER_HOUR;
          break;
        case 'CC_HOURS':
          HoursInperiod = lowPeriod;
          break;
        case 'CC_MEDDRSN1':
          HoursInperiod = lowPeriod * CConstants.NO_OF_HOURSPER_DAY;
          break;
        case 'CC_MEDDRSN2':
          HoursInperiod =
            lowPeriod *
            CConstants.NO_OF_HOURSPER_DAY *
            CConstants.NO_OF_DAYSPER_WEEK;
          break;
        case 'CC_MEDRSN3':
          HoursInperiod =
            lowPeriod *
            CConstants.NO_OF_HOURSPER_DAY *
            CConstants.NO_OF_DAYSPER_MONTH;
          break;
        case 'CC_MEDRSN4':
          HoursInperiod =
            lowPeriod *
            CConstants.NO_OF_HOURSPER_DAY *
            CConstants.NO_OF_DAYSPER_YEAR;
          break;
      }
      if (HoursInperiod >= CConstants.NO_OF_HOURSPER_DAY) {
        IsStartDateBlank = true;
      }
    }
    return IsStartDateBlank;
  }
  public static FillContext(): CContextInformation {
    let obj: CContextInformation = new CContextInformation();
    obj.ReleaseVersion = ContextInfo.ReleaseVersion;
    obj.UserID = ContextInfo.UserOID;
    obj.SecurityToken = ContextInfo.SecurityToken;
    obj.PatientID = PatientContext.PatientOID.ToString();
    obj.OrganizationID = AppContextInfo.OrganisationOID;
    return obj;
  }
  public static IsConceptCodeExists(
    sConceptCode: string,
    objConceptCodes: ObservableCollection<CValuesetTerm>,
    out1: (sResultDetails: string) => void
  ): boolean {
    let sResultDetails: string;

    let bResult: boolean = false;
    sResultDetails = String.Empty;
    if (!String.IsNullOrEmpty(sConceptCode) && objConceptCodes != null) {
      let Results = objConceptCodes
        .Where((term) => term.csCode == sConceptCode)
        .Select((term) => term.csDescription);
      if (Results != null && Results.Count() > 0)
        sResultDetails = Results.First();
      bResult = !String.IsNullOrEmpty(sResultDetails);
    } else {
      let Result = MedicationCommonConceptCodeData.ViewConceptCodes.Where(
        (term) => term.csCode == sConceptCode
      ).Select((term) => term.csDescription);
      if (Result != null && Result.Count() > 0) sResultDetails = Result.First();
    }
    out1(sResultDetails);
    return bResult;
  }

  public static GetText(
    sCCode: string,
    oTerm: ObservableCollection<CValuesetTerm>
  ): string {
    let sText: string = String.Empty;
    let tmpText: string = String.Empty;
    if (
      Common.IsConceptCodeExists(sCCode, oTerm, (o) => {
        tmpText = o;
      }) != false
    )
      sText = tmpText;
    else sText = sCCode;
    return sText;
  }
  public static ConvertHourstoMinutes(nHours: number): number {
    let nMaxMinutes: number = 60;
    let nMinutes: number = 0;
    nMinutes = <number>nHours * nMaxMinutes;
    nMinutes += <number>((nHours - Math.Floor(nHours)) * nMaxMinutes);
    return nMinutes;
  }
  public static SetColorConfigCSS(): void {
    let sTmp: string[] = null;
    let sFormularyColor: string = '#000002';
    let sNonFormularyColor: string = '#000002';
    let sConfigString: string = String.Empty;
    let sFormularyStyle: string = 'normal';
    let sNonFormularyStyle: string = 'normal';
    let sFormularyCase: string = 'lowercase';
    let sNonFormularyCase: string = 'lowercase';
    let sFormularyFontWt: string = 'normal';
    let sNonFormularyFontWt: string = 'normal';
    if (ProfileData.MedDrugDisplayConfig != null) {
      sConfigString = "<style type='text/css'>";
      if (ProfileData.MedDrugDisplayConfig.Formulary != null) {
        sTmp = ProfileData.MedDrugDisplayConfig.Formulary.Split(',');
        if (sTmp != null && sTmp.length > 0) {
          switch (sTmp[0]) {
            case 'BoldItalic': {
              sFormularyFontWt = 'bold';
              sFormularyStyle = 'italic';
              break;
            }
            case 'Bold': {
              sFormularyFontWt = 'bold';
              sFormularyStyle = 'normal';
              break;
            }
            case 'Regular': {
              sFormularyFontWt = 'normal';
              sFormularyStyle = 'normal';
              break;
            }
            case 'Italic': {
              sFormularyFontWt = 'normal';
              sFormularyStyle = 'italic';
              break;
            }
          }
          if (String.Compare(sTmp[1], 'true') == 0)
            sFormularyCase = 'uppercase';
          sFormularyColor = sTmp[2];
        }
      }
      if (ProfileData.MedDrugDisplayConfig.NonFormulary != null) {
        sTmp = ProfileData.MedDrugDisplayConfig.NonFormulary.Split(',');
        if (sTmp != null && sTmp.length > 0) {
          switch (sTmp[0]) {
            case 'BoldItalic': {
              sNonFormularyFontWt = 'bold';
              sNonFormularyStyle = 'italic';
              break;
            }
            case 'Bold': {
              sNonFormularyFontWt = 'bold';
              sNonFormularyStyle = 'normal';
              break;
            }
            case 'Regular': {
              sNonFormularyFontWt = 'normal';
              sNonFormularyStyle = 'normal';
              break;
            }
            case 'Italic': {
              sNonFormularyFontWt = 'normal';
              sNonFormularyStyle = 'italic';
              break;
            }
          }
          if (String.Compare(sTmp[1], 'true') == 0)
            sNonFormularyCase = 'uppercase';
          sNonFormularyColor = sTmp[2];
        }
      }
      sConfigString =
        sFormularyColor +
        '~' +
        sFormularyCase +
        '~' +
        sFormularyStyle +
        '~' +
        sFormularyFontWt;
      Common.sFormStyle = sConfigString;
      sConfigString =
        sNonFormularyColor +
        '~' +
        sNonFormularyCase +
        '~' +
        sNonFormularyStyle +
        '~' +
        sNonFormularyFontWt;
      Common.sNonFormStyle = sConfigString;
    }
  }
  public static hexToColor(hexValue: string): Color {
    try {
      // hexValue = hexValue.Replace("#", "");
      // let position: number = 0;
      let alpha: number = Convert.ToByte('ff', 16);
      // if (hexValue.length == 8) {
      //     alpha = Convert.ToByte(hexValue.Substring(position, 2), 16);
      //     position = 2;
      // }
      // let red: number = Convert.ToByte(hexValue.Substring(position, 2), 16);
      // position += 2;
      // let green: number = Convert.ToByte(hexValue.Substring(position, 2), 16);
      // position += 2;
      // let blue: number = Convert.ToByte(hexValue.Substring(position, 2), 16);
      // let color: Color = Color.FromArgb(alpha, red, green, blue);
      // return color;
      let hexColor = Convert.hexToRgb(hexValue);
      let color: Color = Color.FromArgb(
        alpha,
        hexColor.red,
        hexColor.green,
        hexColor.blue
      );
      return color;
    } catch (err) {
      return Color.FromArgb(255, 251, 237, 187);
    }
  }
  public static GetPrescriptionLineItemVM(
    objPrescriptionItemVM: PrescriptionItemVM
  ): PrescriptionLineItemVM {
    let objPrescriptionLineItemVM: PrescriptionLineItemVM = null;
    if (objPrescriptionItemVM != null) {
      let oTechValSuplyInst: Dictionary<string, string> = null;
      let sParentSuppItem: string = String.Empty;
      objPrescriptionLineItemVM = new PrescriptionLineItemVM();
      objPrescriptionItemVM.oPrescriptionLineItemVM = objPrescriptionLineItemVM;
      objPrescriptionLineItemVM.PrescribableItemDetailOID =
        objPrescriptionItemVM.PrescribableItemDetailOID;
      objPrescriptionLineItemVM.FormViewerDetails = new FormViewerLineItemVM();
      objPrescriptionLineItemVM.IsResolveGrid =
        objPrescriptionItemVM.IsResolveGrid;
      objPrescriptionLineItemVM.IsCriticalMed =
        objPrescriptionItemVM.IsCriticalMed;
      objPrescriptionLineItemVM.IsDoseCalcInfo =
        objPrescriptionItemVM.IsDoseCalcInfo;
      if (objPrescriptionItemVM.ActionCode == ActivityTypes.Prescribe) {
        objPrescriptionLineItemVM.ActionCode = eActivityTypes.Prescribe;
      }
      else {
        objPrescriptionLineItemVM.ActionCode =
          objPrescriptionLineItemVM.ActionCode;
      }
      objPrescriptionLineItemVM.FormViewerDetails.BasicDetails =
        new BasicDetailsLineItemVM();
      if (
        objPrescriptionItemVM.FormViewerDetails != null &&
        objPrescriptionItemVM.FormViewerDetails.BasicDetails != null
      ) {
        if (
          !String.IsNullOrEmpty(
            objPrescriptionItemVM.FormViewerDetails.BasicDetails.MCILorenzoID
          )
        )
          objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.MCILoerenzoID =
            objPrescriptionItemVM.FormViewerDetails.BasicDetails.MCILorenzoID;
        objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.Itemsubtype =
          objPrescriptionItemVM.FormViewerDetails.BasicDetails.itemSubType;
        objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.MCIItemDisplay =
          objPrescriptionItemVM.FormViewerDetails.BasicDetails.mCIItemDisplay;
        objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.MCIItemDrugprop =
          objPrescriptionItemVM.FormViewerDetails.BasicDetails.MCIItemDrugprop;
        objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.MCIIdentifyingName =
          objPrescriptionItemVM.FormViewerDetails.BasicDetails.MCIIdentifyingName;
        objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.isNewmeds =
          objPrescriptionItemVM.FormViewerDetails.BasicDetails.IsIDSNewmeds;
        objPrescriptionLineItemVM.IsUnHoldDrug =
          objPrescriptionItemVM.IsUnholddrug;
        objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.AdditionalComments =
          objPrescriptionItemVM.FormViewerDetails.BasicDetails.AdditionalComments;
        if (
          objPrescriptionItemVM.FormViewerDetails.BasicDetails.ParentMCIItem !=
            null &&
          objPrescriptionItemVM.FormViewerDetails.BasicDetails.ParentMCIItem
            .ItemSubType != null &&
          objPrescriptionItemVM.FormViewerDetails.BasicDetails.ParentMCIItem
            .ItemSubType == 'CC_MULCMPNTITM' &&
          objPrescriptionLineItemVM != null
        ) {
          objPrescriptionLineItemVM.IsMCIChildcomponent =
            objPrescriptionItemVM.FormViewerDetails.BasicDetails.IsMCIChildcomponent;
        }
        objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.isDoseCalcExist =
          objPrescriptionItemVM.FormViewerDetails.BasicDetails.IsDoseCalcExist;
        objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.DoseCalcExist =
          objPrescriptionItemVM.FormViewerDetails.BasicDetails.DoseCalcExist;
        if (objPrescriptionItemVM.FluidPrescribableItemListOID > 0) {
          objPrescriptionLineItemVM.IsFluid = true;
        } else {
          objPrescriptionLineItemVM.IsFluid = false;
        }
        if (
          objPrescriptionLineItemVM.IsMCIChildcomponent ||
          objPrescriptionLineItemVM.IsFluid
        ) {
          if (objPrescriptionItemVM.IsProdAvailForChild) {
            objPrescriptionLineItemVM.IsProdAvailForChild = true;
          } else {
            objPrescriptionLineItemVM.IsProdAvailForChild = false;
          }
        }
        if (
          !String.IsNullOrEmpty(
            objPrescriptionItemVM.FormViewerDetails.BasicDetails.PrescribingNote
          )
        ) {
          objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.PrescribingComments =
            objPrescriptionItemVM.FormViewerDetails.BasicDetails.PrescribingNote;
        }
        objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.IsinDefiniteOmit =
          objPrescriptionItemVM.FormViewerDetails.BasicDetails.IsinDefiniteOmit;
        if (
          DateTime.NotEquals(objPrescriptionItemVM.FormViewerDetails.BasicDetails
            .IsinDefiniteOmitDTTM, DateTime.MinValue)
        ) {
          objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.IsinDefiniteOmitDTTM =
            objPrescriptionItemVM.FormViewerDetails.BasicDetails.IsinDefiniteOmitDTTM;
        }
        if (
          !String.IsNullOrEmpty(
            objPrescriptionItemVM.FormViewerDetails.BasicDetails.OmitComments
          )
        ) {
          objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.OmitComments =
            objPrescriptionItemVM.FormViewerDetails.BasicDetails.OmitComments;
        }
        if (
          !String.IsNullOrEmpty(
            objPrescriptionItemVM.FormViewerDetails.BasicDetails.OmittedBy
          )
        ) {
          objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.OmittedBy =
            objPrescriptionItemVM.FormViewerDetails.BasicDetails.OmittedBy;
        }
        if (
          !String.IsNullOrEmpty(
            objPrescriptionItemVM.FormViewerDetails.BasicDetails
              .OtherAdminiInstruction
          )
        ) {
          objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.AdminInstruction =
            ObjectHelper.CreateObject(new CListItem(), {
              DisplayText:
                objPrescriptionItemVM.FormViewerDetails.BasicDetails
                  .OtherAdminiInstruction,
            });
        } else if (
          objPrescriptionItemVM.FormViewerDetails.BasicDetails
            .AdminInstruction != null &&
          !String.IsNullOrEmpty(
            objPrescriptionItemVM.FormViewerDetails.BasicDetails
              .AdminInstruction.DisplayText
          )
        ) {
          objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.AdminInstruction =
            objPrescriptionItemVM.FormViewerDetails.BasicDetails.AdminInstruction;
        }
        objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.AdminMethod =
          objPrescriptionItemVM.FormViewerDetails.BasicDetails.AdminMethod;
        objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.BatchNumber =
          objPrescriptionItemVM.FormViewerDetails.BasicDetails.AdditionalComments;
        if (
          objPrescriptionItemVM.FormViewerDetails.BasicDetails.Route != null &&
          objPrescriptionItemVM.FormViewerDetails.BasicDetails.Route.Tag !=
            null &&
          objPrescriptionItemVM.FormViewerDetails.BasicDetails.Infusions &&
          String.Equals(
            objPrescriptionItemVM.FormViewerDetails.BasicDetails.Route.Tag.ToString(),
            '1',
            StringComparison.CurrentCultureIgnoreCase
          ) &&
          objPrescriptionItemVM.FormViewerDetails.BasicDetails
            .InfusionDetails != null &&
          ((objPrescriptionItemVM.FormViewerDetails.BasicDetails.InfusionType !=
            null &&
            (String.IsNullOrEmpty(
              objPrescriptionItemVM.FormViewerDetails.BasicDetails.InfusionType
                .Value
            ) ||
              String.Equals(
                objPrescriptionItemVM.FormViewerDetails.BasicDetails
                  .InfusionType.Value,
                InfusionTypeCode.CONTINUOUS,
                StringComparison.CurrentCultureIgnoreCase
              ) ||
              String.Equals(
                objPrescriptionItemVM.FormViewerDetails.BasicDetails
                  .InfusionType.Value,
                InfusionTypeCode.SINGLEDOSEVOLUME,
                StringComparison.CurrentCultureIgnoreCase
              ) ||
              String.Equals(
                objPrescriptionItemVM.FormViewerDetails.BasicDetails
                  .InfusionType.Value,
                InfusionTypeCode.FLUID,
                StringComparison.CurrentCultureIgnoreCase
              ) ||
              String.Equals(
                objPrescriptionItemVM.FormViewerDetails.BasicDetails
                  .InfusionType.Value,
                InfusionTypeCode.PCA,
                StringComparison.CurrentCultureIgnoreCase
              ))) ||
            objPrescriptionItemVM.FormViewerDetails.BasicDetails.InfusionType ==
              null)
        ) {
          objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.Direction =
            null;
          objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.Frequency =
            null;
          objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.PRNInstruction =
            null;
        } else {
          objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.Direction =
            objPrescriptionItemVM.FormViewerDetails.BasicDetails.Direction;
          objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.Frequency =
            objPrescriptionItemVM.FormViewerDetails.BasicDetails.Frequency;
          if (
            !String.IsNullOrEmpty(
              objPrescriptionItemVM.FormViewerDetails.BasicDetails
                .PRNInstructionFreeText
            )
          ) {
            objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.PRNInstruction =
              ObjectHelper.CreateObject(new CListItem(), {
                DisplayText:
                  objPrescriptionItemVM.FormViewerDetails.BasicDetails
                    .PRNInstructionFreeText,
              });
          } else if (
            objPrescriptionItemVM.FormViewerDetails.BasicDetails
              .PRNInstruction != null
          ) {
            objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.PRNInstruction =
              objPrescriptionItemVM.FormViewerDetails.BasicDetails.PRNInstruction;
          }
        }
        objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.DosageForm =
          objPrescriptionItemVM.FormViewerDetails.BasicDetails.DosageForm;
        if (
          !String.IsNullOrEmpty(
            objPrescriptionItemVM.FormViewerDetails.BasicDetails.Dose
          ) &&
          (objPrescriptionItemVM.FormViewerDetails.BasicDetails.InfusionType ==
            null ||
            (objPrescriptionItemVM.FormViewerDetails.BasicDetails
              .InfusionType != null &&
              String.IsNullOrEmpty(
                objPrescriptionItemVM.FormViewerDetails.BasicDetails
                  .InfusionType.Value
              )) ||
            (objPrescriptionItemVM.FormViewerDetails.BasicDetails
              .InfusionType != null &&
              !String.IsNullOrEmpty(
                objPrescriptionItemVM.FormViewerDetails.BasicDetails
                  .InfusionType.Value
              ) &&
              !String.Equals(
                objPrescriptionItemVM.FormViewerDetails.BasicDetails
                  .InfusionType.Value,
                InfusionTypeCode.CONTINUOUS
              )))
        ) {
          let s: string = String.Empty;
          // s = new string(objPrescriptionItemVM.FormViewerDetails.BasicDetails.Dose.Where(String.IsLetter).ToArray());
          s = objPrescriptionItemVM.FormViewerDetails.BasicDetails.Dose.split(
            ''
          )
            .Where((c) => c.HasValue(String.IsLetter))
            .ToArray()
            .join('');
          if (
            String.IsNullOrEmpty(s) &&
            !objPrescriptionItemVM.FormViewerDetails.BasicDetails.Dose.Trim().Contains(
              ' '
            )
          ) {
            objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.Dose =
              Convert.ToDouble(
                objPrescriptionItemVM.FormViewerDetails.BasicDetails.Dose
              ).ToString();
          } else {
            objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.Dose =
              objPrescriptionItemVM.FormViewerDetails.BasicDetails.Dose;
          }
        }
        objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.DoseType =
          objPrescriptionItemVM.FormViewerDetails.BasicDetails.DoseType;
        if (
          objPrescriptionItemVM.FormViewerDetails.BasicDetails.InfusionType ==
            null ||
          (objPrescriptionItemVM.FormViewerDetails.BasicDetails.InfusionType !=
            null &&
            String.IsNullOrEmpty(
              objPrescriptionItemVM.FormViewerDetails.BasicDetails.InfusionType
                .Value
            )) ||
          (objPrescriptionItemVM.FormViewerDetails.BasicDetails.InfusionType !=
            null &&
            !String.IsNullOrEmpty(
              objPrescriptionItemVM.FormViewerDetails.BasicDetails.InfusionType
                .Value
            ) &&
            !String.Equals(
              objPrescriptionItemVM.FormViewerDetails.BasicDetails.InfusionType
                .Value,
              InfusionTypeCode.CONTINUOUS
            ))
        ) {
          objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.DoseUOM =
            objPrescriptionItemVM.FormViewerDetails.BasicDetails.DoseUOM;
        }
        if (
          objPrescriptionItemVM.PrescriptionItemOID == 0 &&
          objPrescriptionItemVM.FormViewerDetails.BasicDetails
            .ConditionalDosingDetails != null &&
          objPrescriptionItemVM.FormViewerDetails.BasicDetails
            .ConditionalDosingDetails.DoseDetails != null &&
          objPrescriptionItemVM.FormViewerDetails.BasicDetails
            .ConditionalDosingDetails.DoseDetails.Count > 0
        ) {
          objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.IsConditionalExists =
            true;
        } else if (
          objPrescriptionItemVM.PrescriptionItemOID == 0 &&
          (objPrescriptionItemVM.FormViewerDetails.BasicDetails
            .ConditionalDosingDetails == null ||
            objPrescriptionItemVM.FormViewerDetails.BasicDetails
              .ConditionalDosingDetails.DoseDetails == null ||
            objPrescriptionItemVM.FormViewerDetails.BasicDetails
              .ConditionalDosingDetails.DoseDetails.Count == 0)
        ) {
          objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.IsConditionalExists =
            false;
        } else {
          objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.IsConditionalExists =
            objPrescriptionItemVM.FormViewerDetails.BasicDetails.IsConditionalExists;
        }
        if (
          objPrescriptionItemVM.FormViewerDetails.BasicDetails.DrugProperties !=
            null &&
          objPrescriptionItemVM.FormViewerDetails.BasicDetails.DrugProperties
            .Count > 0
        ) {
          if (
            objPrescriptionItemVM.FormViewerDetails.BasicDetails.DrugProperties
              .Count == 1 &&
            objPrescriptionItemVM.FormViewerDetails.BasicDetails
              .DrugProperties[0] != null &&
            !String.IsNullOrEmpty(
              objPrescriptionItemVM.FormViewerDetails.BasicDetails
                .DrugProperties[0].DrugPropertyCode
            ) &&
            objPrescriptionItemVM.FormViewerDetails.BasicDetails.DrugProperties[0].DrugPropertyCode.Contains(
              '~'
            )
          ) {
            let objDrugProperty: ObservableCollection<ManagePrescSer.DrugProperty> =
              new ObservableCollection<ManagePrescSer.DrugProperty>();
            let sDrugPropertyCode: string[] = null;
            let sDrugPropertyOccrCode: string[] = null;
            if (
              objPrescriptionItemVM.FormViewerDetails.BasicDetails.DrugProperties[0].DrugPropertyCode.Contains(
                ','
              )
            ) {
              sDrugPropertyCode =
                objPrescriptionItemVM.FormViewerDetails.BasicDetails.DrugProperties[0].DrugPropertyCode.Split(
                  ','
                );
              if (sDrugPropertyCode != null && sDrugPropertyCode.length > 0) {
                let nDrgLength: number = sDrugPropertyCode.length;
                for (let DPCnt: number = 0; DPCnt < nDrgLength; DPCnt++) {
                  if (sDrugPropertyCode[DPCnt].Contains('~')) {
                    sDrugPropertyOccrCode = sDrugPropertyCode[DPCnt].Split('~');
                    objDrugProperty.Add(
                      ObjectHelper.CreateObject(
                        new ManagePrescSer.DrugProperty(),
                        {
                          DrugPropertyCode: sDrugPropertyOccrCode[0],
                          VMChildCode: sDrugPropertyOccrCode[1],
                          HighRiskMsg:
                            objPrescriptionItemVM.FormViewerDetails.BasicDetails
                              .DrugProperties[0].HighRiskMsg,
                        }
                      )
                    );
                  }
                }
              }
            } else {
              if (
                objPrescriptionItemVM.FormViewerDetails.BasicDetails.DrugProperties[0].DrugPropertyCode.Contains(
                  '~'
                )
              ) {
                sDrugPropertyOccrCode =
                  objPrescriptionItemVM.FormViewerDetails.BasicDetails.DrugProperties[0].DrugPropertyCode.Split(
                    '~'
                  );
                objDrugProperty.Add(
                  ObjectHelper.CreateObject(new ManagePrescSer.DrugProperty(), {
                    DrugPropertyCode: sDrugPropertyOccrCode[0],
                    VMChildCode: sDrugPropertyOccrCode[1],
                    HighRiskMsg:
                      objPrescriptionItemVM.FormViewerDetails.BasicDetails
                        .DrugProperties[0].HighRiskMsg,
                  })
                );
              }
            }
            if (objDrugProperty != null && objDrugProperty.Count > 0) {
              objPrescriptionItemVM.FormViewerDetails.BasicDetails.DrugProperties =
                objDrugProperty;
            }
          } else if (
            objPrescriptionItemVM.FormViewerDetails.BasicDetails.DrugProperties
              .Count == 1 &&
            objPrescriptionItemVM.FormViewerDetails.BasicDetails
              .DrugProperties[0] != null &&
            !String.IsNullOrEmpty(
              objPrescriptionItemVM.FormViewerDetails.BasicDetails
                .DrugProperties[0].DrugPropertyCode
            ) &&
            objPrescriptionItemVM.FormViewerDetails.BasicDetails.DrugProperties[0].DrugPropertyCode.Contains(
              ','
            )
          ) {
            let objDrugProperty: ObservableCollection<ManagePrescSer.DrugProperty> =
              new ObservableCollection<ManagePrescSer.DrugProperty>();
            let sDrugPropertyCode: string[] = null;
            sDrugPropertyCode =
              objPrescriptionItemVM.FormViewerDetails.BasicDetails.DrugProperties[0].DrugPropertyCode.Split(
                ','
              );
            if (sDrugPropertyCode != null && sDrugPropertyCode.length > 0) {
              for (
                let DPCnt: number = 0;
                DPCnt < sDrugPropertyCode.length;
                DPCnt++
              ) {
                objDrugProperty.Add(
                  ObjectHelper.CreateObject(new ManagePrescSer.DrugProperty(), {
                    DrugPropertyCode: sDrugPropertyCode[DPCnt],
                    VMChildCode:
                      objPrescriptionItemVM.FormViewerDetails.BasicDetails
                        .DrugProperties[0].VMChildCode,
                    HighRiskMsg:
                      objPrescriptionItemVM.FormViewerDetails.BasicDetails
                        .DrugProperties[0].HighRiskMsg,
                  })
                );
              }
            }
            if (objDrugProperty != null && objDrugProperty.Count > 0) {
              objPrescriptionItemVM.FormViewerDetails.BasicDetails.DrugProperties =
                objDrugProperty;
            }
          }
          objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.DrugProperties =
            new ObservableCollection<ManagePrescSer.DrugProperty>();
          objPrescriptionItemVM.FormViewerDetails.BasicDetails.DrugProperties.forEach(
            (oDrugProperty) => {
              objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.DrugProperties.Add(
                ObjectHelper.CreateObject(new ManagePrescSer.DrugProperty(), {
                  DrugName: oDrugProperty.DrugName,
                  DrugPropertyCode: oDrugProperty.DrugPropertyCode,
                  HighRiskMsg: oDrugProperty.HighRiskMsg,
                  IdentifyingOID: oDrugProperty.IdentifyingOID,
                  IdentifyingType: oDrugProperty.IdentifyingType,
                  OccuranceCode: oDrugProperty.OccuranceCode,
                  VMChildCode: oDrugProperty.VMChildCode,
                })
              );
            }
          );
        }
        objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.Duration =
          objPrescriptionItemVM.FormViewerDetails.BasicDetails.Duration;
        objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.DurationUOM =
          objPrescriptionItemVM.FormViewerDetails.BasicDetails.DurationUOM;
        if (
          DateTime.NotEquals(objPrescriptionItemVM.FormViewerDetails.BasicDetails.EndDTTM,
            DateTime.MinValue) &&
          objPrescriptionItemVM.FormViewerDetails.BasicDetails.EndDTTM.Year >
            CConstants.DateTimeMinYear
        ) {
          objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.EndDTTM =
            objPrescriptionItemVM.FormViewerDetails.BasicDetails.EndDTTM;
        }
        objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.ExpiryDate =
          objPrescriptionItemVM.FormViewerDetails.BasicDetails.ExpiryDate;
        if (
          !String.IsNullOrEmpty(
            objPrescriptionItemVM.FormViewerDetails.BasicDetails.DaysOfWeeks
          )
        ) {
          objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.DaysOfWeeks =
            objPrescriptionItemVM.FormViewerDetails.BasicDetails.DaysOfWeeks;
        } else if (
          PatientContext.PrescriptionType !=
            PrescriptionTypes.ForAdministration &&
          !String.IsNullOrEmpty(
            objPrescriptionItemVM.FormViewerDetails.BasicDetails.DrugFreqUOMCode
          ) &&
          String.Equals(
            objPrescriptionItemVM.FormViewerDetails.BasicDetails
              .DrugFreqUOMCode,
            'CC_MEDDRSN2',
            StringComparison.CurrentCultureIgnoreCase
          )
        ) {
          let St: ArrayOfString = new ArrayOfString();
          St.Add(
            objPrescriptionItemVM.FormViewerDetails.BasicDetails.IsSun
              ? 'T'
              : 'F'
          );
          St.Add(
            objPrescriptionItemVM.FormViewerDetails.BasicDetails.IsMon
              ? 'T'
              : 'F'
          );
          St.Add(
            objPrescriptionItemVM.FormViewerDetails.BasicDetails.IsTue
              ? 'T'
              : 'F'
          );
          St.Add(
            objPrescriptionItemVM.FormViewerDetails.BasicDetails.IsWed
              ? 'T'
              : 'F'
          );
          St.Add(
            objPrescriptionItemVM.FormViewerDetails.BasicDetails.IsThu
              ? 'T'
              : 'F'
          );
          St.Add(
            objPrescriptionItemVM.FormViewerDetails.BasicDetails.IsFri
              ? 'T'
              : 'F'
          );
          St.Add(
            objPrescriptionItemVM.FormViewerDetails.BasicDetails.IsSat
              ? 'T'
              : 'F'
          );
          objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.DaysOfWeeks =
            MedicationCommonBB.ConstructDaysOfWeek(St);
        } else if (
          PatientContext.PrescriptionType ==
            PrescriptionTypes.ForAdministration &&
          objPrescriptionItemVM.FormViewerDetails.BasicDetails.AdminTimes !=
            null &&
          objPrescriptionItemVM.FormViewerDetails.BasicDetails.AdminTimes
            .FreqDetails != null &&
          objPrescriptionItemVM.FormViewerDetails.BasicDetails.AdminTimes
            .FreqDetails.oFrequency != null &&
          !String.IsNullOrEmpty(
            objPrescriptionItemVM.FormViewerDetails.BasicDetails.AdminTimes
              .FreqDetails.oFrequency.UOM
          ) &&
          String.Equals(
            objPrescriptionItemVM.FormViewerDetails.BasicDetails.AdminTimes
              .FreqDetails.oFrequency.UOM,
            'CC_MEDDRSN2',
            StringComparison.CurrentCultureIgnoreCase
          )
        ) {
          let St: ArrayOfString = new ArrayOfString();
          St.Add(
            objPrescriptionItemVM.FormViewerDetails.BasicDetails.AdminTimes
              .IsSun
              ? 'T'
              : 'F'
          );
          St.Add(
            objPrescriptionItemVM.FormViewerDetails.BasicDetails.AdminTimes
              .IsMon
              ? 'T'
              : 'F'
          );
          St.Add(
            objPrescriptionItemVM.FormViewerDetails.BasicDetails.AdminTimes
              .IsTue
              ? 'T'
              : 'F'
          );
          St.Add(
            objPrescriptionItemVM.FormViewerDetails.BasicDetails.AdminTimes
              .IsWed
              ? 'T'
              : 'F'
          );
          St.Add(
            objPrescriptionItemVM.FormViewerDetails.BasicDetails.AdminTimes
              .IsThu
              ? 'T'
              : 'F'
          );
          St.Add(
            objPrescriptionItemVM.FormViewerDetails.BasicDetails.AdminTimes
              .IsFri
              ? 'T'
              : 'F'
          );
          St.Add(
            objPrescriptionItemVM.FormViewerDetails.BasicDetails.AdminTimes
              .IsSat
              ? 'T'
              : 'F'
          );
          objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.DaysOfWeeks =
            MedicationCommonBB.ConstructDaysOfWeek(St);
        }
        if (
          objPrescriptionItemVM.FluidPrescribableItemListOID == 0 ||
          objPrescriptionItemVM.IsFormViewerFluidItem
        ) {
          objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.IdentifyingName =
            objPrescriptionItemVM.FormViewerDetails.BasicDetails.IdentifyingName;
        }
        objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.IdentifyingType =
          objPrescriptionItemVM.FormViewerDetails.BasicDetails.IdentifyingType;
        objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.MedClerkModifyReason =
          objPrescriptionItemVM.FormViewerDetails.BasicDetails.MedClerkModifyReason;
        if (
          objPrescriptionItemVM.FormViewerDetails.BasicDetails
            .MedClerkModifyReason != null &&
          objPrescriptionItemVM.FormViewerDetails.BasicDetails
            .MedClerkModifyReason.Tag instanceof ManagePrescSer.ObjectInfo
        ) {
          let oObjectInfo: ManagePrescSer.ObjectInfo =
            ObjectHelper.CreateType<ManagePrescSer.ObjectInfo>(
              objPrescriptionItemVM.FormViewerDetails.BasicDetails
                .MedClerkModifyReason.Tag,
              ManagePrescSer.ObjectInfo
            );
          objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.MedClerkModifyReason.Tag =
            ObjectHelper.CreateObject(new ManagePrescSer.ObjectInfo(), {
              Code: oObjectInfo.Code,
              Name: oObjectInfo.Name,
              OID: oObjectInfo.OID,
            });
        } else if (
          objPrescriptionItemVM.FormViewerDetails.BasicDetails
            .MedClerkModifyReason != null &&
          objPrescriptionItemVM.FormViewerDetails.BasicDetails
            .MedClerkModifyReason.Tag instanceof IPPManagePrescSer.ObjectInfo
        ) {
          let oObjectInfo: IPPManagePrescSer.ObjectInfo =
            ObjectHelper.CreateType<IPPManagePrescSer.ObjectInfo>(
              objPrescriptionItemVM.FormViewerDetails.BasicDetails
                .MedClerkModifyReason.Tag,
              IPPManagePrescSer.ObjectInfo
            );
          objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.MedClerkModifyReason.Tag =
            ObjectHelper.CreateObject(new ManagePrescSer.ObjectInfo(), {
              Code: oObjectInfo.Code,
              Name: oObjectInfo.Name,
              OID: oObjectInfo.OID,
            });
        }
        objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.NoOfInstallments =
          objPrescriptionItemVM.FormViewerDetails.BasicDetails.NoOfInstallments;
        objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.Quantity =
          objPrescriptionItemVM.FormViewerDetails.BasicDetails.Quantity;
        let strQnty: string = String.Empty;
        if (
          objPrescriptionItemVM.FormViewerDetails.BasicDetails.QuantityUOM !=
            null &&
          !String.IsNullOrEmpty(
            objPrescriptionItemVM.FormViewerDetails.BasicDetails.QuantityUOM
              .Value
          )
        )
          strQnty =
            objPrescriptionItemVM.FormViewerDetails.BasicDetails.QuantityUOM
              .DisplayText;
        else if (
          !String.IsNullOrEmpty(
            objPrescriptionItemVM.FormViewerDetails.BasicDetails.QuantityUOMName
          )
        )
          strQnty =
            objPrescriptionItemVM.FormViewerDetails.BasicDetails
              .QuantityUOMName;
        objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.QuantityUOMName =
          strQnty;
        if (
          objPrescriptionItemVM.FormViewerDetails != null &&
          objPrescriptionItemVM.FormViewerDetails.BasicDetails != null &&
          objPrescriptionItemVM.FormViewerDetails.BasicDetails.DefaultDetails !=
            null &&
          objPrescriptionItemVM.FormViewerDetails.BasicDetails
            .IsAllowMultiRoute &&
          objPrescriptionItemVM.FormViewerDetails.BasicDetails.DefaultDetails
            .Routes != null &&
          objPrescriptionItemVM.FormViewerDetails.BasicDetails.DefaultDetails
            .Routes.Count > 0 &&
          PatientContext.PrescriptionType ==
            PrescriptionTypes.ForAdministration &&
          objPrescriptionItemVM.FormViewerDetails.BasicDetails
            .IsMultiRouteChecked
        ) {
          let selectedrouteClistitem: CListItem[] =
            objPrescriptionItemVM.FormViewerDetails.BasicDetails.DefaultDetails.Routes.Where(
              (cl) => cl.IsSelected == true
            ).ToArray();
          if (
            selectedrouteClistitem != null &&
            selectedrouteClistitem.length > 0
          ) {
            objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.Route =
              ObjectHelper.CreateObject(new CListItem(), {
                DisplayText: MedicationCommonBB.RouteName(
                  selectedrouteClistitem
                ),
                Value: MedicationCommonBB.RouteOID(selectedrouteClistitem),
              });
          }
          if (
            objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.Route ==
              null &&
            objPrescriptionItemVM.FormViewerDetails.BasicDetails.Route != null
          ) {
            objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.Route =
              objPrescriptionItemVM.FormViewerDetails.BasicDetails.Route;
          }
        } else {
          objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.Route =
            objPrescriptionItemVM.FormViewerDetails.BasicDetails.Route;
        }
        objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.Site =
          objPrescriptionItemVM.FormViewerDetails.BasicDetails.Site;
        if (
          !String.IsNullOrEmpty(
            objPrescriptionItemVM.FormViewerDetails.BasicDetails.SiteFreeText
          )
        ) {
          objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.Site =
            ObjectHelper.CreateObject(new CListItem(), {
              DisplayText:
                objPrescriptionItemVM.FormViewerDetails.BasicDetails
                  .SiteFreeText,
            });
        } else if (
          objPrescriptionItemVM.FormViewerDetails.BasicDetails.Site != null
        ) {
          objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.Site =
            objPrescriptionItemVM.FormViewerDetails.BasicDetails.Site;
        }
        objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.StartDTTM =
          objPrescriptionItemVM.FormViewerDetails.BasicDetails.StartDTTM;
        if (
          objPrescriptionItemVM.FormViewerDetails.BasicDetails.StationaryType !=
            null &&
          !String.IsNullOrEmpty(
            objPrescriptionItemVM.FormViewerDetails.BasicDetails.StationaryType
              .DisplayText
          ) &&
          !String.IsNullOrEmpty(
            objPrescriptionItemVM.FormViewerDetails.BasicDetails.StationaryType
              .Value
          ) &&
          objPrescriptionItemVM.FormViewerDetails.BasicDetails.StationaryType
            .Tag != null
        ) {
          objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.StationaryType =
            objPrescriptionItemVM.FormViewerDetails.BasicDetails.StationaryType;
        } else
          objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.StationaryType =
            null;
        objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.Strength =
          objPrescriptionItemVM.FormViewerDetails.BasicDetails.Strength;
        if (
          !objPrescriptionItemVM.FormViewerDetails.BasicDetails.IsAuthorise ||
          (objPrescriptionItemVM.FormViewerDetails.BasicDetails.IsAuthorise &&
            !String.IsNullOrEmpty(
              objPrescriptionItemVM.PrescriptionItemStatus
            ) &&
            !String.Equals(
              objPrescriptionItemVM.PrescriptionItemStatus,
              CConstants.AWAITINGAUTHORISE,
              StringComparison.InvariantCultureIgnoreCase
            ))
        ) {
          if (
            !String.IsNullOrEmpty(
              objPrescriptionItemVM.FormViewerDetails.BasicDetails
                .TechsupplyInstText
            ) &&
            String.Compare(
              objPrescriptionItemVM.FormViewerDetails.BasicDetails
                .TechsupplyInstText,
              'N'
            ) != 0
          ) {
            if (
              objPrescriptionItemVM.FormViewerDetails.BasicDetails
                .SupplyInstructionfromTV != null
            ) {
              let osuptext: string = String.Empty;
              let osuppval: string = String.Empty;
              if (
                objPrescriptionItemVM.FormViewerDetails.BasicDetails
                  .SelectedsupplyInstruction != null
              ) {
                objPrescriptionItemVM.FormViewerDetails.BasicDetails.SelectedsupplyInstruction.Where(
                  (x) =>
                    !objPrescriptionItemVM.FormViewerDetails.BasicDetails.SupplyInstructionfromTV.Contains(
                      x
                    )
                ).forEach((i) => {
                  objPrescriptionItemVM.FormViewerDetails.BasicDetails.SupplyInstructionfromTV.Add(
                    i
                  );
                });

                objPrescriptionItemVM.FormViewerDetails.BasicDetails.TechValiadteSupplyInstWithConactSemiColon(
                  objPrescriptionItemVM.FormViewerDetails.BasicDetails
                    .SupplyInstructionfromTV,
                  (o1) => {
                    osuptext = o1;
                  },
                  (o2) => {
                    osuppval = o2;
                  }
                );
                objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.SupplyInstructionText =
                  ObjectHelper.CreateObject(new CListItem(), {
                    DisplayText: osuptext,
                    Value: osuppval,
                  });
              }
            } else {
              objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.SupplyInstructionText =
                ObjectHelper.CreateObject(new CListItem(), {
                  DisplayText:
                    objPrescriptionItemVM.FormViewerDetails.BasicDetails
                      .SupplyInsText,
                  Value:
                    objPrescriptionItemVM.FormViewerDetails.BasicDetails
                      .SupplyInsVal,
                });
            }
          } else {
            objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.SupplyInstructionText =
              ObjectHelper.CreateObject(new CListItem(), {
                DisplayText:
                  objPrescriptionItemVM.FormViewerDetails.BasicDetails
                    .SupplyInsText,
                Value:
                  objPrescriptionItemVM.FormViewerDetails.BasicDetails
                    .SupplyInsVal,
              });
          }
        }
        if (
          objPrescriptionLineItemVM != null &&
          objPrescriptionLineItemVM.FormViewerDetails != null &&
          objPrescriptionLineItemVM.FormViewerDetails.BasicDetails != null &&
          !String.IsNullOrEmpty(
            objPrescriptionItemVM.FormViewerDetails.BasicDetails
              .FluidSupplyInstrText
          )
        ) {
          let oFluidSupplyValue: StringBuilder = new StringBuilder();
          let oFluidSupplyText: StringBuilder = new StringBuilder();
          if (
            objPrescriptionLineItemVM != null &&
            objPrescriptionLineItemVM.FormViewerDetails != null &&
            objPrescriptionLineItemVM.FormViewerDetails.BasicDetails
              .FluidSupplyInstructionText == null
          ) {
            objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.FluidSupplyInstructionText =
              new CListItem();
          }
          let oSupplyValue: string[] =
            objPrescriptionItemVM.FormViewerDetails.BasicDetails.FluidSupplyInstrText.Split(
              ';'
            );
          let SupplyComments: string[] =
            objPrescriptionItemVM.FormViewerDetails.BasicDetails.FluidSupplyInstrText.Split(
              '~~',
              StringSplitOptions.None
            );
          if (
            SupplyComments.length > 1 &&
            !String.IsNullOrEmpty(SupplyComments[1])
          ) {
            objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.SupplyComments =
              SupplyComments[1];
            oSupplyValue = SupplyComments[0].Split(';');
            let suppCnt: number = oSupplyValue.length;
          }
          if (MedicationCommonConceptCodeData.ViewConceptCodes != null) {
            let nSupplyInstCnt: number = oSupplyValue.Count();
            for (let i: number = 0; i < nSupplyInstCnt; i++) {
              let lstTermtext: IEnumerable<CValuesetTerm> = null;
              lstTermtext =
                MedicationCommonConceptCodeData.ViewConceptCodes.Where(
                  (x) => x.csCode == oSupplyValue[i]
                );
              if (lstTermtext != null && lstTermtext.Count() > 0) {
                oFluidSupplyValue.Append(oSupplyValue);
                oFluidSupplyValue.Append(';');
                if (oFluidSupplyText != null && oFluidSupplyText.Length > 0) {
                  oFluidSupplyText.Append(';');
                }
                oFluidSupplyText.Append(lstTermtext.First().csDescription);
              }
            }
          }
          if (
            oFluidSupplyValue != null &&
            oFluidSupplyValue.Length > 0 &&
            oFluidSupplyText != null &&
            oFluidSupplyText.Length > 0
          ) {
            objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.FluidSupplyInstructionText =
              ObjectHelper.CreateObject(new CListItem(), {
                DisplayText: oFluidSupplyText.ToString(),
                Value: oFluidSupplyValue.ToString(),
              });
          }
        }
        if (
          objPrescriptionItemVM.FormViewerDetails.TechValidateDetails != null &&
          objPrescriptionItemVM.FormViewerDetails.TechValidateDetails
            .SelectedPrescItem != null &&
          objPrescriptionItemVM.FormViewerDetails.TechValidateDetails
            .SelectedPrescItem.PresTechValidatedItemsChild != null &&
          objPrescriptionItemVM.FormViewerDetails.TechValidateDetails
            .SelectedPrescItem.PresTechValidatedItemsChild.Count > 0
        ) {
          for (
            let i: number = 0;
            i <
            objPrescriptionItemVM.FormViewerDetails.TechValidateDetails
              .SelectedPrescItem.PresTechValidatedItemsChild.Count -
              1;
            i++
          ) {
            if (
              !String.IsNullOrEmpty(
                objPrescriptionItemVM.FormViewerDetails.TechValidateDetails
                  .SelectedPrescItem.PresTechValidatedItemsChild[i]
                  .FormViewerDetails.BasicDetails.TechsupplyInstText
              ) &&
              String.Compare(
                objPrescriptionItemVM.FormViewerDetails.TechValidateDetails
                  .SelectedPrescItem.PresTechValidatedItemsChild[i]
                  .FormViewerDetails.BasicDetails.TechsupplyInstText,
                'N'
              ) != 0
            ) {
              if (
                objPrescriptionItemVM.FormViewerDetails.TechValidateDetails
                  .SelectedPrescItem.PresTechValidatedItemsChild[i]
                  .FormViewerDetails.BasicDetails.SupplyInstructionfromTV !=
                null
              ) {
                let osuptext: string = String.Empty;
                let osuppval: string = String.Empty;
                if (
                  objPrescriptionItemVM.FormViewerDetails.TechValidateDetails
                    .SelectedPrescItem.PresTechValidatedItemsChild[i]
                    .FormViewerDetails.BasicDetails.SelectedsupplyInstruction !=
                  null
                ) {
                  objPrescriptionItemVM.FormViewerDetails.TechValidateDetails.SelectedPrescItem.PresTechValidatedItemsChild[
                    i
                  ].FormViewerDetails.BasicDetails.SelectedsupplyInstruction.Where(
                    (x) =>
                      !objPrescriptionItemVM.FormViewerDetails.TechValidateDetails.SelectedPrescItem.PresTechValidatedItemsChild[
                        i
                      ].FormViewerDetails.BasicDetails.SupplyInstructionfromTV.Contains(
                        x
                      )
                  ).forEach((j) => {
                    objPrescriptionItemVM.FormViewerDetails.TechValidateDetails.SelectedPrescItem.PresTechValidatedItemsChild[
                      i
                    ].FormViewerDetails.BasicDetails.SupplyInstructionfromTV.Add(
                      j
                    );
                  });
                  objPrescriptionItemVM.FormViewerDetails.TechValidateDetails.SelectedPrescItem.PresTechValidatedItemsChild[
                    i
                  ].FormViewerDetails.BasicDetails.TechValiadteSupplyInstWithConactSemiColon(
                    objPrescriptionItemVM.FormViewerDetails.TechValidateDetails
                      .SelectedPrescItem.PresTechValidatedItemsChild[i]
                      .FormViewerDetails.BasicDetails.SupplyInstructionfromTV,
                    (o1) => {
                      osuptext = o1;
                    },
                    (o2) => {
                      osuppval = o2;
                    }
                  );
                  objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.SupplyInstructionText =
                    ObjectHelper.CreateObject(new CListItem(), {
                      DisplayText: osuptext,
                      Value: osuppval,
                    });
                }
              } else {
                objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.SupplyInstructionText =
                  ObjectHelper.CreateObject(new CListItem(), {
                    DisplayText:
                      objPrescriptionItemVM.FormViewerDetails
                        .TechValidateDetails.SelectedPrescItem
                        .PresTechValidatedItemsChild[i].FormViewerDetails
                        .BasicDetails.SupplyInsText,
                    Value:
                      objPrescriptionItemVM.FormViewerDetails
                        .TechValidateDetails.SelectedPrescItem
                        .PresTechValidatedItemsChild[i].FormViewerDetails
                        .BasicDetails.SupplyInsVal,
                  });
              }
            } else {
              if (
                objPrescriptionLineItemVM.FormViewerDetails.BasicDetails
                  .SupplyInstructionText == null
              )
                objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.SupplyInstructionText =
                  ObjectHelper.CreateObject(new CListItem(), {
                    DisplayText:
                      objPrescriptionItemVM.FormViewerDetails
                        .TechValidateDetails.SelectedPrescItem
                        .PresTechValidatedItemsChild[i].FormViewerDetails
                        .BasicDetails.SupplyInsText,
                    Value:
                      objPrescriptionItemVM.FormViewerDetails
                        .TechValidateDetails.SelectedPrescItem
                        .PresTechValidatedItemsChild[i].FormViewerDetails
                        .BasicDetails.SupplyInsVal,
                  });
            }
          }
        }
        objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.TechSupplyDTTM =
          objPrescriptionItemVM.FormViewerDetails.BasicDetails.TechSupplyDTTM;
        objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.TreatmentToContinue =
          objPrescriptionItemVM.FormViewerDetails.BasicDetails.TreatmentToContinue;
        if (
          objPrescriptionItemVM.FormViewerDetails.BasicDetails
            .TreatmentToContinue != null &&
          objPrescriptionItemVM.FormViewerDetails.BasicDetails
            .TreatmentToContinue.Tag instanceof ManagePrescSer.ObjectInfo
        ) {
          if (
            !String.Equals(
              objPrescriptionItemVM.PrescriptionType,
              PrescriptionTypes.Inpatient
            ) ||
            (String.Equals(
              objPrescriptionItemVM.PrescriptionType,
              PrescriptionTypes.Inpatient
            ) &&
              objPrescriptionItemVM.FormViewerDetails.BHasFormViewParams)
          ) {
            let oObjectInfo: ManagePrescSer.ObjectInfo =
              ObjectHelper.CreateType<ManagePrescSer.ObjectInfo>(
                objPrescriptionItemVM.FormViewerDetails.BasicDetails
                  .TreatmentToContinue.Tag,
                ManagePrescSer.ObjectInfo
              );
            objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.TreatmentToContinue.Tag =
              ObjectHelper.CreateObject(new ManagePrescSer.ObjectInfo(), {
                Code: oObjectInfo.Code,
                Name: oObjectInfo.Name,
                OID: oObjectInfo.OID,
              });
          } else
            objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.TreatmentToContinue =
              null;
        } else if (
          objPrescriptionItemVM.FormViewerDetails.BasicDetails
            .TreatmentToContinue != null &&
          objPrescriptionItemVM.FormViewerDetails.BasicDetails
            .TreatmentToContinue.Tag instanceof IPPManagePrescSer.ObjectInfo
        ) {
          objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.TreatmentToContinue =
            objPrescriptionItemVM.FormViewerDetails.BasicDetails.TreatmentToContinue;
          if (
            !String.Equals(
              objPrescriptionItemVM.PrescriptionType,
              PrescriptionTypes.Inpatient
            ) ||
            (String.Equals(
              objPrescriptionItemVM.PrescriptionType,
              PrescriptionTypes.Inpatient
            ) &&
              objPrescriptionItemVM.FormViewerDetails.BHasFormViewParams)
          ) {
            let oObjectInfo: IPPManagePrescSer.ObjectInfo =
              ObjectHelper.CreateType<IPPManagePrescSer.ObjectInfo>(
                objPrescriptionItemVM.FormViewerDetails.BasicDetails
                  .TreatmentToContinue.Tag,
                IPPManagePrescSer.ObjectInfo
              );
            objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.TreatmentToContinue.Tag =
              ObjectHelper.CreateObject(new ManagePrescSer.ObjectInfo(), {
                Code: oObjectInfo.Code,
                Name: oObjectInfo.Name,
                OID: oObjectInfo.OID,
              });
          } else
            objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.TreatmentToContinue =
              null;
        } else if (
          objPrescriptionItemVM.FormViewerDetails.BasicDetails
            .TreatmentToContinue != null &&
          objPrescriptionItemVM.FormViewerDetails.BasicDetails
            .TreatmentToContinue.Tag == null
        ) {
          if (
            String.Equals(
              objPrescriptionItemVM.PrescriptionType,
              PrescriptionTypes.Inpatient
            ) &&
            !objPrescriptionItemVM.FormViewerDetails.BHasFormViewParams
          ) {
            objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.TreatmentToContinue =
              null;
          }
        }
        if (
          !String.IsNullOrEmpty(
            objPrescriptionItemVM.FormViewerDetails.BasicDetails.UpperDose
          ) &&
          objPrescriptionItemVM.FormViewerDetails.BasicDetails.DoseType !=
            null &&
          String.Compare(
            objPrescriptionItemVM.FormViewerDetails.BasicDetails.DoseType.Value,
            'CC_MEDDOSE4',
            StringComparison.CurrentCultureIgnoreCase
          ) != 0
        ) {
          let s: string = String.Empty;
          s =
            objPrescriptionItemVM.FormViewerDetails.BasicDetails.UpperDose.split(
              ''
            )
              .Where((c) => c.HasValue(String.IsLetter))
              .ToArray()
              .join('');
          //s = new string(objPrescriptionItemVM.FormViewerDetails.BasicDetails.UpperDose.Where(String.IsLetter).ToArray());
          if (
            String.IsNullOrEmpty(s) &&
            !objPrescriptionItemVM.FormViewerDetails.BasicDetails.UpperDose.Trim().Contains(
              ' '
            )
          ) {
            objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.UpperDose =
              Convert.ToDouble(
                objPrescriptionItemVM.FormViewerDetails.BasicDetails.UpperDose
              ).ToString();
          } else {
            objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.UpperDose =
              objPrescriptionItemVM.FormViewerDetails.BasicDetails.UpperDose;
          }
        }
        objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.RequestUrgency =
          objPrescriptionItemVM.RequestUrgency;
        objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.RequestedBy =
          objPrescriptionItemVM.RequestedBy;
        objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.RequestedDTTM =
          objPrescriptionItemVM.RequestedDTTM;
        objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.RequestedComments =
          objPrescriptionItemVM.RequestedComments;
        objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.IsSupplyRequestedforReqMed =
          objPrescriptionItemVM.IsSupplyRequestedforReqMed;
        objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.ServiceOID =
          MedChartData.ServiceOID;
        objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.LocationOID =
          MedChartData.LocationOID;
      }
      objPrescriptionLineItemVM.IsOther = objPrescriptionItemVM.IsOther;
      objPrescriptionLineItemVM.IsPGD = objPrescriptionItemVM.IsPGD;
      if (objPrescriptionItemVM.PrescriberDetails != null) {
        objPrescriptionLineItemVM.PrescriberDetails = ObjectHelper.CreateObject(
          new ManagePrescSer.ObjectInfo(),
          {
            Code: objPrescriptionItemVM.PrescriberDetails.Code,
            EPRFilterList:
              objPrescriptionItemVM.PrescriberDetails.EPRFilterList,
            LastModifiedAt:
              objPrescriptionItemVM.PrescriberDetails.LastModifiedAt,
            Name:
              objPrescriptionItemVM.IsClinicallyVerifyEnable == true &&
              objPrescriptionItemVM.PrescriberDetails.Code != null
                ? objPrescriptionItemVM != null &&
                  (objPrescriptionItemVM.ActionCode ==
                    ActivityTypes.Prescribe ||
                    objPrescriptionItemVM.ActionCode == ActivityTypes.Reorder)
                  ? objPrescriptionItemVM.PrescriberDetails.Name
                  : objPrescriptionItemVM.PrescriberDetails.Code
                : objPrescriptionItemVM.PrescriberDetails.Name,
            OID: objPrescriptionItemVM.PrescriberDetails.OID,
            OperationMode:
              objPrescriptionItemVM.PrescriberDetails.OperationMode,
            RoleProfileOID:
              objPrescriptionItemVM.PrescriberDetails.RoleProfileOID,
          }
        );
      }
      objPrescriptionLineItemVM.PrescriptionItemOID =
        objPrescriptionItemVM.PrescriptionItemOID;
      objPrescriptionLineItemVM.PrescriptionItemStatus =
        objPrescriptionItemVM.PrescriptionItemStatus;
      if (objPrescriptionItemVM.PrescriptionType) {
        objPrescriptionLineItemVM.PrescriptionTypeCode =
          objPrescriptionItemVM.PrescriptionType;
      }
      objPrescriptionLineItemVM.PrescriptionType =
        objPrescriptionItemVM.PrescriptionType;
      objPrescriptionLineItemVM.PrescriptionTypeInPatientContext =
        PatientContext.PrescriptionType;
      objPrescriptionLineItemVM.OperationMode =
        objPrescriptionItemVM.OperationMode;
      if (
        (objPrescriptionLineItemVM.OperationMode != null &&
          String.Compare(
            objPrescriptionLineItemVM.OperationMode,
            'N',
            StringComparison.OrdinalIgnoreCase
          ) == 0) ||
        (objPrescriptionLineItemVM.IsUnHoldDrug &&
          objPrescriptionLineItemVM.OperationMode != null &&
          String.Compare(
            objPrescriptionLineItemVM.OperationMode,
            'U',
            StringComparison.OrdinalIgnoreCase
          ) == 0)
      ) {
        if (
          objPrescriptionItemVM.FormViewerDetails != null &&
          objPrescriptionItemVM.FormViewerDetails.BasicDetails != null &&
          !objPrescriptionItemVM.FormViewerDetails.BasicDetails
            .IsFilledDoseRegime
        ) {
          objPrescriptionItemVM.oDoseRegime =
            objPrescriptionItemVM.FillDoseRegime(
              objPrescriptionItemVM.FormViewerDetails.BasicDetails
            );
          if (
            objPrescriptionItemVM.oDoseRegime != null &&
            objPrescriptionItemVM.oDoseRegime.Count > 0 &&
            objPrescriptionItemVM.FormViewerDetails.BasicDetails
              .IsClearlstAmendList &&
            objPrescriptionItemVM.ActionCode == ActivityTypes.Amend
          ) {
            objPrescriptionItemVM.FormViewerDetails.BasicDetails.IsFilledDoseRegime =
              true;
          }
          objPrescriptionLineItemVM.oDoseRegime =
            objPrescriptionItemVM.oDoseRegime;
          if (
            objPrescriptionItemVM.oDoseRegime != null &&
            objPrescriptionItemVM.oDoseRegime.Count > 0 &&
            objPrescriptionItemVM.oDoseRegime[0] != null
          ) {
            let oIPPDoseRegime: IPPMAManagePrescSer.IPPDoseRegime = <
              IPPMAManagePrescSer.IPPDoseRegime
            >objPrescriptionItemVM.oDoseRegime[0];
            if (oIPPDoseRegime != null) {
              objPrescriptionLineItemVM.oTitratedDoseRegime =
                oIPPDoseRegime.oTitratedDoseRegime;
              objPrescriptionLineItemVM.IsHavingAdminTime =
                oIPPDoseRegime.IsHavingAdminTime;
              objPrescriptionLineItemVM.TitratedAdminInstruction =
                oIPPDoseRegime.TitratedDoseInstruction != null
                  ? oIPPDoseRegime.TitratedDoseInstruction.Code
                  : String.Empty;
              objPrescriptionLineItemVM.TitratedComments =
                oIPPDoseRegime.TitratedDoseAdtnlComments;
            }
            if (
              objPrescriptionItemVM.FormViewerDetails.BasicDetails.DoseUOM !=
              null
            )
              objPrescriptionLineItemVM.ScheduleDoseUOM =
                objPrescriptionItemVM.FormViewerDetails.BasicDetails.DoseUOM.DisplayText;
          }
        } else if (
          objPrescriptionItemVM.oDoseRegime != null &&
          objPrescriptionItemVM.oDoseRegime.Count > 0
        ) {
          objPrescriptionLineItemVM.oDoseRegime =
            objPrescriptionItemVM.oDoseRegime;
          if (
            !String.Equals(
              objPrescriptionItemVM.PrescriptionType,
              PrescriptionTypes.Inpatient,
              StringComparison.OrdinalIgnoreCase
            ) &&
            objPrescriptionItemVM.FormViewerDetails != null &&
            objPrescriptionItemVM.FormViewerDetails.BasicDetails != null &&
            objPrescriptionItemVM.FormViewerDetails.BasicDetails.DoseType !=
              null &&
            String.Equals(
              objPrescriptionItemVM.FormViewerDetails.BasicDetails.DoseType
                .Value,
              DoseTypeCode.TITRATED,
              StringComparison.OrdinalIgnoreCase
            ) &&
            objPrescriptionItemVM.oDoseRegime != null &&
            objPrescriptionItemVM.oDoseRegime.Count > 0 &&
            objPrescriptionItemVM.oDoseRegime[0] != null
          ) {
            let oIPPDoseRegime: IPPMAManagePrescSer.IPPDoseRegime =
              ObjectHelper.CreateType<IPPMAManagePrescSer.IPPDoseRegime>(
                objPrescriptionItemVM.oDoseRegime[0],
                IPPMAManagePrescSer.IPPDoseRegime
              );
            if (oIPPDoseRegime != null) {
              objPrescriptionLineItemVM.oTitratedDoseRegime =
                oIPPDoseRegime.oTitratedDoseRegime;
              objPrescriptionLineItemVM.TitratedAdminInstruction =
                oIPPDoseRegime.TitratedDoseInstruction != null
                  ? oIPPDoseRegime.TitratedDoseInstruction.Code
                  : String.Empty;
              objPrescriptionLineItemVM.TitratedComments =
                oIPPDoseRegime.TitratedDoseAdtnlComments;
            }
            if (
              objPrescriptionItemVM.FormViewerDetails.BasicDetails.DoseUOM !=
              null
            )
              objPrescriptionLineItemVM.ScheduleDoseUOM =
                objPrescriptionItemVM.FormViewerDetails.BasicDetails.DoseUOM.DisplayText;
          }
        }
      } else {
        if (objPrescriptionItemVM.oDoseRegime != null) {
          if (
            objPrescriptionLineItemVM.OperationMode != null &&
            String.Equals(objPrescriptionLineItemVM.OperationMode, 'U') &&
            !objPrescriptionItemVM.FormViewerDetails.BasicDetails
              .IsFilledDoseRegime
          ) {
            objPrescriptionItemVM.oDoseRegime =
              objPrescriptionItemVM.FillDoseRegime(
                objPrescriptionItemVM.FormViewerDetails.BasicDetails
              );
            if (
              objPrescriptionItemVM.oDoseRegime != null &&
              objPrescriptionItemVM.oDoseRegime.Count > 0 &&
              objPrescriptionItemVM.FormViewerDetails.BasicDetails
                .IsClearlstAmendList &&
              objPrescriptionItemVM.ActionCode == ActivityTypes.Amend
            ) {
              objPrescriptionItemVM.FormViewerDetails.BasicDetails.IsFilledDoseRegime =
                true;
            }
            objPrescriptionLineItemVM.oDoseRegime =
              objPrescriptionItemVM.oDoseRegime;
          } else {
            objPrescriptionLineItemVM.oDoseRegime =
              objPrescriptionItemVM.oDoseRegime;
          }
        }
      }
      if (
        !String.Equals(
          PatientContext.PrescriptionType,
          PrescriptionTypes.Clerking
        ) &&
        PatientContext.ClerkFormViewDefaultBehavior !=
          ClerkFormViewDeftBehaviour.LaunchFormMandatory &&
        objPrescriptionLineItemVM.FormViewerDetails.BasicDetails != null &&
        objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.DoseType !=
          null &&
        (String.Equals(
          objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.DoseType
            .Value,
          DoseTypeCode.STEPPEDVARIABLE
        ) ||
          String.Equals(
            objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.DoseType
              .Value,
            DoseTypeCode.STEPPED
          ) ||
          String.Equals(
            objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.DoseType
              .Value,
            DoseTypeCode.VARIABLE
          ))
      ) {
        if (
          objPrescriptionLineItemVM.OperationMode != null &&
          String.Equals(
            objPrescriptionLineItemVM.OperationMode,
            'N',
            StringComparison.OrdinalIgnoreCase
          ) &&
          objPrescriptionItemVM.oDoseRegime != null &&
          objPrescriptionItemVM.oDoseRegime.Count > 0 &&
          objPrescriptionItemVM.oDoseRegime.Count == 1
        ) {
          objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.Frequency =
            new CListItem();
          objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.Frequency.DisplayText =
            this.ConstructStepAdminTimesDoseDet(
              objPrescriptionItemVM.oDoseRegime[0]
            );
        } else if (
          objPrescriptionLineItemVM.OperationMode != null &&
          String.Equals(
            objPrescriptionLineItemVM.OperationMode,
            'UA',
            StringComparison.OrdinalIgnoreCase
          ) &&
          objPrescriptionItemVM.oDoseRegime != null &&
          objPrescriptionItemVM.oDoseRegime.Count > 0 &&
          objPrescriptionItemVM.oDoseRegime.Count == 1
        ) {
          objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.Frequency =
            new CListItem();
          objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.Frequency.DisplayText =
            this.ConstructStepAdminTimesDoseDet(
              objPrescriptionItemVM.oDoseRegime[0]
            );
        } else if (
          objPrescriptionItemVM.isTechVldLod &&
          objPrescriptionItemVM.OperationMode == null &&
          objPrescriptionItemVM.ActionCode == ActivityTypes.Amend &&
          objPrescriptionItemVM.oDoseRegime == null &&
          objPrescriptionItemVM.FormViewerDetails != null &&
          objPrescriptionItemVM.FormViewerDetails.BasicDetails != null &&
          objPrescriptionItemVM.FormViewerDetails.BasicDetails
            .MultiDoseDetails != null &&
          objPrescriptionItemVM.FormViewerDetails.BasicDetails.MultiDoseDetails
            .Count > 0 &&
          objPrescriptionItemVM.FormViewerDetails.BasicDetails.MultiDoseDetails
            .Count == 1
        ) {
          let oDoseRegime: ObservableCollection<IPPMAManagePrescSer.DoseRegime> =
            new ObservableCollection<IPPMAManagePrescSer.DoseRegime>();
          if (
            !objPrescriptionItemVM.FormViewerDetails.BasicDetails
              .IsFilledDoseRegime
          ) {
            oDoseRegime = objPrescriptionItemVM.FillDoseRegime(
              objPrescriptionItemVM.FormViewerDetails.BasicDetails
            );
          } else {
            oDoseRegime = objPrescriptionItemVM.oDoseRegime;
          }
          objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.Frequency =
            new CListItem();
          objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.Frequency.DisplayText =
            this.ConstructStepAdminTimesDoseDet(oDoseRegime.First());
        } else if (
          (objPrescriptionItemVM.FormViewerDetails.BasicDetails
            .MultiDoseDetails == null || (objPrescriptionItemVM.FormViewerDetails.BasicDetails
            .MultiDoseDetails != null && objPrescriptionItemVM.FormViewerDetails.BasicDetails
            .MultiDoseDetails.Length == 0)) &&
          objPrescriptionItemVM.oDoseRegime == null &&
          String.IsNullOrEmpty(objPrescriptionItemVM.OperationMode) &&
          objPrescriptionItemVM.PrescriptionItemOID > 0
        ) {
          if (
            objPrescriptionItemVM != null &&
            objPrescriptionItemVM.FormViewerDetails != null &&
            objPrescriptionItemVM.FormViewerDetails.BasicDetails != null &&
            !String.IsNullOrEmpty(
              objPrescriptionItemVM.FormViewerDetails.BasicDetails
                .SteppedDoseAdminTimes
            )
          ) {
            objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.Frequency =
              ObjectHelper.CreateObject(new CListItem(), {
                DisplayText:
                  objPrescriptionItemVM.FormViewerDetails.BasicDetails
                    .SteppedDoseAdminTimes,
              });
          }
        }
      }
      if (
        objPrescriptionItemVM.FormViewerDetails != null &&
        objPrescriptionItemVM.FormViewerDetails.BasicDetails != null &&
        (!String.IsNullOrEmpty(
          objPrescriptionItemVM.FormViewerDetails.BasicDetails.itemSubType
        ) ||
          (objPrescriptionItemVM.PresTechValidatedItemsChild != null &&
            objPrescriptionItemVM.PresTechValidatedItemsChild.Count > 0 &&
            objPrescriptionItemVM.PresTechValidatedItemsChild[0]
              .FluidPrescribableItemListOID > 0))
      ) {
        let sChildSuppItem: StringBuilder = new StringBuilder();
        if (oTechValSuplyInst == null)
          oTechValSuplyInst = new Dictionary<string, string>();
        if (
          objPrescriptionItemVM.FormViewerDetails.TechValidateDetails != null &&
          objPrescriptionItemVM.FormViewerDetails.TechValidateDetails
            .PresTechValidatedItems != null &&
          objPrescriptionItemVM.FormViewerDetails.TechValidateDetails
            .PresTechValidatedItems.Count > 0
        ) {
          let nPrescItemsCount: number =
            objPrescriptionItemVM.FormViewerDetails.TechValidateDetails
              .PresTechValidatedItems.Count;
          for (let i: number = 0; i < nPrescItemsCount; i++) {
            if (
              objPrescriptionItemVM.FormViewerDetails.TechValidateDetails
                .PresTechValidatedItems[i].FormViewerDetails != null &&
              objPrescriptionItemVM.FormViewerDetails.TechValidateDetails
                .PresTechValidatedItems[i].FormViewerDetails.BasicDetails !=
                null &&
              !String.IsNullOrEmpty(
                objPrescriptionItemVM.FormViewerDetails.TechValidateDetails
                  .PresTechValidatedItems[i].FormViewerDetails.BasicDetails
                  .TechsupplyInstText
              )
            ) {
              if (
                objPrescriptionItemVM.FormViewerDetails.BasicDetails != null &&
                !String.IsNullOrEmpty(
                  objPrescriptionItemVM.FormViewerDetails.BasicDetails
                    .SupplyInsVal
                ) &&
                !String.IsNullOrEmpty(
                  objPrescriptionItemVM.FormViewerDetails.BasicDetails
                    .SupplyInsText
                )
              ) {
                if (oTechValSuplyInst == null)
                  oTechValSuplyInst = new Dictionary<string, string>();
                if (
                  objPrescriptionLineItemVM.FormViewerDetails.BasicDetails
                    .TechValSupplyInstructionText == null
                ) {
                  objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.TechValSupplyInstructionText =
                    new ObservableCollection<CListItem>();
                }
                let oSupplyValue: string[] =
                  objPrescriptionItemVM.FormViewerDetails.BasicDetails.SupplyInsVal.Split(
                    ';'
                  );
                let oSupplyText: string[] =
                  objPrescriptionItemVM.FormViewerDetails.BasicDetails.SupplyInsText.Split(
                    ';'
                  );
                if (oSupplyValue.length == oSupplyText.length) {
                  for (let k: number = 0; k < oSupplyValue.length; k++) {
                    objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.TechValSupplyInstructionText.Add(
                      ObjectHelper.CreateObject(new CListItem(), {
                        DisplayText: oSupplyText[k],
                        Value: oSupplyValue[k],
                      })
                    );
                    oTechValSuplyInst.Add(oSupplyValue[k], oSupplyText[k]);
                  }
                }
              }
              if (
                objPrescriptionItemVM.FormViewerDetails.TechValidateDetails
                  .PresTechValidatedItems[i].FormViewerDetails.BasicDetails
                  .TechValSupplyInst != null &&
                !String.IsNullOrEmpty(
                  objPrescriptionItemVM.FormViewerDetails.TechValidateDetails
                    .PresTechValidatedItems[i].FormViewerDetails.BasicDetails
                    .TechValSupplyInst.DisplayText
                )
              ) {
                sParentSuppItem =
                  objPrescriptionItemVM.FormViewerDetails.TechValidateDetails
                    .PresTechValidatedItems[i].FormViewerDetails.BasicDetails
                    .TechValSupplyInst.DisplayText;
              }
            }
            if (
              objPrescriptionItemVM.FormViewerDetails.TechValidateDetails
                .PresTechValidatedItems[i].PresTechValidatedItemsChild !=
                null &&
              objPrescriptionItemVM.FormViewerDetails.TechValidateDetails
                .PresTechValidatedItems[i].PresTechValidatedItemsChild.Count > 0
            ) {
              for (
                let j: number = 0;
                j <
                objPrescriptionItemVM.FormViewerDetails.TechValidateDetails
                  .PresTechValidatedItems[i].PresTechValidatedItemsChild.Count;
                j++
              ) {
                if (
                  objPrescriptionItemVM.FormViewerDetails.TechValidateDetails
                    .PresTechValidatedItems[i].PresTechValidatedItemsChild[j]
                    .FormViewerDetails != null &&
                  objPrescriptionItemVM.FormViewerDetails.TechValidateDetails
                    .PresTechValidatedItems[i].PresTechValidatedItemsChild[j]
                    .FormViewerDetails.TechValidateDetails != null &&
                  objPrescriptionItemVM.FormViewerDetails.TechValidateDetails
                    .PresTechValidatedItems[i].PresTechValidatedItemsChild[j]
                    .FormViewerDetails.TechValidateDetails.TechValidatedItems !=
                    null &&
                  objPrescriptionItemVM.FormViewerDetails.TechValidateDetails
                    .PresTechValidatedItems[i].PresTechValidatedItemsChild[j]
                    .FormViewerDetails.TechValidateDetails.TechValidatedItems
                    .Count > 0
                ) {
                  sChildSuppItem.Append(
                    objPrescriptionItemVM.FormViewerDetails.TechValidateDetails
                      .PresTechValidatedItems[i].PresTechValidatedItemsChild[j]
                      .FormViewerDetails.BasicDetails.IdentifyingName
                  );
                  sChildSuppItem.Append(':');
                  let TechItemCountSupply: number = 0;
                  let objCustomTechValidatedItem: ObservableCollection<CustomTechValidatedItem> =
                    objPrescriptionItemVM.FormViewerDetails.TechValidateDetails
                      .PresTechValidatedItems[i].PresTechValidatedItemsChild[j]
                      .FormViewerDetails.TechValidateDetails.TechValidatedItems;
                  let nCntSupplyInst: number = 0;
                  let nTechValItemCnt: number =
                    objCustomTechValidatedItem.Count;
                  objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.TechValSupplyInstructionText =
                    new ObservableCollection<CListItem>();
                  for (let Cnt: number = 0; Cnt < nTechValItemCnt; Cnt++) {
                    if (
                      objCustomTechValidatedItem[Cnt].SupplyInstruction != null
                    ) {
                      let oSupplyInstruction: ObservableCollection<ObjectInfo> =
                        objCustomTechValidatedItem[Cnt].SupplyInstruction;
                      nCntSupplyInst = oSupplyInstruction.Count;
                      if (nCntSupplyInst > 0) {
                        TechItemCountSupply++;
                        for (
                          let CntSply: number = 0;
                          CntSply < nCntSupplyInst;
                          CntSply++
                        ) {
                          if (
                            !String.IsNullOrEmpty(
                              oSupplyInstruction[CntSply].Code
                            )
                          ) {
                            if (oTechValSuplyInst == null)
                              oTechValSuplyInst = new Dictionary<
                                string,
                                string
                              >();
                            if (
                              !oTechValSuplyInst.ContainsKey(
                                oSupplyInstruction[CntSply].Code
                              )
                            ) {
                              sChildSuppItem.Append(
                                oSupplyInstruction[CntSply].Name
                              );
                              sChildSuppItem.Append(',');
                              oTechValSuplyInst.Add(
                                oSupplyInstruction[CntSply].Code,
                                oSupplyInstruction[CntSply].Name
                              );
                            }
                          }
                        }
                      }
                    }
                  }
                } else if (
                  objPrescriptionItemVM.FormViewerDetails.TechValidateDetails
                    .PresTechValidatedItems[i].PresTechValidatedItemsChild[j]
                    .FormViewerDetails != null &&
                  objPrescriptionItemVM.FormViewerDetails.TechValidateDetails
                    .PresTechValidatedItems[i].PresTechValidatedItemsChild[j]
                    .FormViewerDetails.BasicDetails != null &&
                  !String.IsNullOrEmpty(
                    objPrescriptionItemVM.FormViewerDetails.TechValidateDetails
                      .PresTechValidatedItems[i].PresTechValidatedItemsChild[j]
                      .FormViewerDetails.BasicDetails.TechsupplyInstText
                  )
                ) {
                  if (
                    objPrescriptionItemVM.FormViewerDetails.TechValidateDetails
                      .PresTechValidatedItems[i].PresTechValidatedItemsChild[j]
                      .FormViewerDetails.BasicDetails.TechValSupplyInst !=
                      null &&
                    !String.IsNullOrEmpty(
                      objPrescriptionItemVM.FormViewerDetails
                        .TechValidateDetails.PresTechValidatedItems[i]
                        .PresTechValidatedItemsChild[j].FormViewerDetails
                        .BasicDetails.TechValSupplyInst.DisplayText
                    )
                  ) {
                    sChildSuppItem.Append(
                      objPrescriptionItemVM.FormViewerDetails
                        .TechValidateDetails.PresTechValidatedItems[i]
                        .PresTechValidatedItemsChild[j].FormViewerDetails
                        .BasicDetails.IdentifyingName
                    );
                    sChildSuppItem.Append(':');
                    sChildSuppItem.Append(
                      objPrescriptionItemVM.FormViewerDetails
                        .TechValidateDetails.PresTechValidatedItems[i]
                        .PresTechValidatedItemsChild[j].FormViewerDetails
                        .BasicDetails.TechValSupplyInst.DisplayText
                    );
                    sChildSuppItem.Append(',');
                  }
                }
              }
            }
          }
          if (sChildSuppItem != null && sChildSuppItem.Length > 0) {
            if (
              objPrescriptionLineItemVM.FormViewerDetails.BasicDetails
                .TechValSupplyInstructionText == null
            ) {
              objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.TechValSupplyInstructionText =
                new ObservableCollection<CListItem>();
            }
            objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.TechValSupplyInstructionText.Add(
              ObjectHelper.CreateObject(new CListItem(), {
                DisplayText:
                  sParentSuppItem.ToString() + '^' + sChildSuppItem.ToString(),
                Value: '',
              })
            );
          } else if (!String.IsNullOrEmpty(sParentSuppItem)) {
            if (
              objPrescriptionLineItemVM.FormViewerDetails.BasicDetails
                .TechValSupplyInstructionText == null
            ) {
              objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.TechValSupplyInstructionText =
                new ObservableCollection<CListItem>();
            }
            objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.TechValSupplyInstructionText.Add(
              ObjectHelper.CreateObject(new CListItem(), {
                DisplayText: sParentSuppItem.ToString() + '^',
                Value: '',
              })
            );
          }
        }
        if (
          objPrescriptionItemVM.FormViewerDetails.TechValidateDetails != null &&
          objPrescriptionItemVM.FormViewerDetails.TechValidateDetails
            .PresTechValidatedItems != null &&
          objPrescriptionItemVM.FormViewerDetails.TechValidateDetails
            .PresTechValidatedItems.Count > 0 &&
          objPrescriptionItemVM.FormViewerDetails.TechValidateDetails
            .SelectedPrescItem != null &&
          objPrescriptionItemVM.FormViewerDetails.TechValidateDetails
            .SelectedPrescItem.PresTechValidatedItemsChild != null &&
          objPrescriptionItemVM.FormViewerDetails.TechValidateDetails
            .SelectedPrescItem.PresTechValidatedItemsChild.Count > 0
        ) {
          let nPrescItemsCount: number =
            objPrescriptionItemVM.FormViewerDetails.TechValidateDetails
              .SelectedPrescItem.PresTechValidatedItemsChild.Count;
          for (let i: number = 0; i < nPrescItemsCount; i++) {
            if (
              objPrescriptionItemVM.FormViewerDetails.TechValidateDetails
                .SelectedPrescItem.PresTechValidatedItemsChild[i]
                .FormViewerDetails != null &&
              objPrescriptionItemVM.FormViewerDetails.TechValidateDetails
                .SelectedPrescItem.PresTechValidatedItemsChild[i]
                .FormViewerDetails.BasicDetails != null
            ) {
              if (
                objPrescriptionItemVM.FormViewerDetails.TechValidateDetails
                  .SelectedPrescItem.PresTechValidatedItemsChild[i]
                  .FormViewerDetails.BasicDetails != null &&
                !String.IsNullOrEmpty(
                  objPrescriptionItemVM.FormViewerDetails.TechValidateDetails
                    .SelectedPrescItem.PresTechValidatedItemsChild[i]
                    .FormViewerDetails.BasicDetails.SupplyInsVal
                ) &&
                !String.IsNullOrEmpty(
                  objPrescriptionItemVM.FormViewerDetails.TechValidateDetails
                    .SelectedPrescItem.PresTechValidatedItemsChild[i]
                    .FormViewerDetails.BasicDetails.SupplyInsText
                )
              ) {
                if (oTechValSuplyInst == null)
                  oTechValSuplyInst = new Dictionary<string, string>();
                if (
                  objPrescriptionLineItemVM.FormViewerDetails.BasicDetails
                    .TechValSupplyInstructionText == null
                ) {
                  objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.TechValSupplyInstructionText =
                    new ObservableCollection<CListItem>();
                }
                let oSupplyValue: string[] =
                  objPrescriptionItemVM.FormViewerDetails.TechValidateDetails.SelectedPrescItem.PresTechValidatedItemsChild[
                    i
                  ].FormViewerDetails.BasicDetails.SupplyInsVal.Split(';');
                let oSupplyText: string[] =
                  objPrescriptionItemVM.FormViewerDetails.TechValidateDetails.SelectedPrescItem.PresTechValidatedItemsChild[
                    i
                  ].FormViewerDetails.BasicDetails.SupplyInsText.Split(';');
                if (oSupplyValue.length == oSupplyText.length) {
                  for (let k: number = 0; k < oSupplyValue.length; k++) {
                    objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.TechValSupplyInstructionText.Add(
                      ObjectHelper.CreateObject(new CListItem(), {
                        DisplayText: oSupplyText[k],
                        Value: oSupplyValue[k],
                      })
                    );
                    if (
                      oTechValSuplyInst != null &&
                      !oTechValSuplyInst.ContainsKey(oSupplyValue[k])
                    ) {
                      oTechValSuplyInst.Add(oSupplyValue[k], oSupplyText[k]);
                    }
                  }
                }
              }
              if (
                objPrescriptionItemVM.FormViewerDetails.TechValidateDetails
                  .SelectedPrescItem.PresTechValidatedItemsChild[i]
                  .FormViewerDetails.BasicDetails.TechValSupplyInst != null &&
                !String.IsNullOrEmpty(
                  objPrescriptionItemVM.FormViewerDetails.TechValidateDetails
                    .SelectedPrescItem.PresTechValidatedItemsChild[i]
                    .FormViewerDetails.BasicDetails.TechValSupplyInst
                    .DisplayText
                )
              ) {
                sParentSuppItem =
                  objPrescriptionItemVM.FormViewerDetails.TechValidateDetails
                    .SelectedPrescItem.PresTechValidatedItemsChild[i]
                    .FormViewerDetails.BasicDetails.TechValSupplyInst
                    .DisplayText;
              }
            }
            if (
              objPrescriptionItemVM.FormViewerDetails.TechValidateDetails
                .SelectedPrescItem.PresTechValidatedItemsChild[i]
                .PresTechValidatedItemsChild != null &&
              objPrescriptionItemVM.FormViewerDetails.TechValidateDetails
                .SelectedPrescItem.PresTechValidatedItemsChild[i]
                .PresTechValidatedItemsChild.Count > 0
            ) {
              for (
                let j: number = 0;
                j <
                objPrescriptionItemVM.FormViewerDetails.TechValidateDetails
                  .SelectedPrescItem.PresTechValidatedItemsChild[i]
                  .PresTechValidatedItemsChild.Count;
                j++
              ) {
                if (
                  objPrescriptionItemVM.FormViewerDetails.TechValidateDetails
                    .SelectedPrescItem.PresTechValidatedItemsChild[i]
                    .PresTechValidatedItemsChild[j].FormViewerDetails != null &&
                  objPrescriptionItemVM.FormViewerDetails.TechValidateDetails
                    .SelectedPrescItem.PresTechValidatedItemsChild[i]
                    .PresTechValidatedItemsChild[j].FormViewerDetails
                    .TechValidateDetails != null &&
                  objPrescriptionItemVM.FormViewerDetails.TechValidateDetails
                    .SelectedPrescItem.PresTechValidatedItemsChild[i]
                    .PresTechValidatedItemsChild[j].FormViewerDetails
                    .TechValidateDetails.TechValidatedItems != null &&
                  objPrescriptionItemVM.FormViewerDetails.TechValidateDetails
                    .SelectedPrescItem.PresTechValidatedItemsChild[i]
                    .PresTechValidatedItemsChild[j].FormViewerDetails
                    .TechValidateDetails.TechValidatedItems.Count > 0
                ) {
                  sChildSuppItem.Append(
                    objPrescriptionItemVM.FormViewerDetails.TechValidateDetails
                      .SelectedPrescItem.PresTechValidatedItemsChild[i]
                      .PresTechValidatedItemsChild[j].FormViewerDetails
                      .BasicDetails.IdentifyingName
                  );
                  sChildSuppItem.Append(':');
                  let TechItemCountSupply: number = 0;
                  let objCustomTechValidatedItem: ObservableCollection<CustomTechValidatedItem> =
                    objPrescriptionItemVM.FormViewerDetails.TechValidateDetails
                      .SelectedPrescItem.PresTechValidatedItemsChild[i]
                      .PresTechValidatedItemsChild[j].FormViewerDetails
                      .TechValidateDetails.TechValidatedItems;
                  let nCntSupplyInst: number = 0;
                  let nTechValItemCnt: number =
                    objCustomTechValidatedItem.Count;
                  objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.TechValSupplyInstructionText =
                    new ObservableCollection<CListItem>();
                  for (let Cnt: number = 0; Cnt < nTechValItemCnt; Cnt++) {
                    if (
                      objCustomTechValidatedItem[Cnt].SupplyInstruction != null
                    ) {
                      let oSupplyInstruction: ObservableCollection<ObjectInfo> =
                        objCustomTechValidatedItem[Cnt].SupplyInstruction;
                      nCntSupplyInst = oSupplyInstruction.Count;
                      if (nCntSupplyInst > 0) {
                        TechItemCountSupply++;
                        for (
                          let CntSply: number = 0;
                          CntSply < nCntSupplyInst;
                          CntSply++
                        ) {
                          if (
                            !String.IsNullOrEmpty(
                              oSupplyInstruction[CntSply].Code
                            )
                          ) {
                            if (oTechValSuplyInst == null)
                              oTechValSuplyInst = new Dictionary<
                                string,
                                string
                              >();
                            if (
                              !oTechValSuplyInst.ContainsKey(
                                oSupplyInstruction[CntSply].Code
                              )
                            ) {
                              sChildSuppItem.Append(
                                oSupplyInstruction[CntSply].Name
                              );
                              sChildSuppItem.Append(',');
                              oTechValSuplyInst.Add(
                                oSupplyInstruction[CntSply].Code,
                                oSupplyInstruction[CntSply].Name
                              );
                            }
                          }
                        }
                      }
                    }
                  }
                } else if (
                  objPrescriptionItemVM.FormViewerDetails.TechValidateDetails
                    .SelectedPrescItem.PresTechValidatedItemsChild[i]
                    .PresTechValidatedItemsChild[j].FormViewerDetails != null &&
                  objPrescriptionItemVM.FormViewerDetails.TechValidateDetails
                    .SelectedPrescItem.PresTechValidatedItemsChild[i]
                    .PresTechValidatedItemsChild[j].FormViewerDetails
                    .BasicDetails != null &&
                  !String.IsNullOrEmpty(
                    objPrescriptionItemVM.FormViewerDetails.TechValidateDetails
                      .SelectedPrescItem.PresTechValidatedItemsChild[i]
                      .PresTechValidatedItemsChild[j].FormViewerDetails
                      .BasicDetails.TechsupplyInstText
                  )
                ) {
                  if (
                    objPrescriptionItemVM.FormViewerDetails.TechValidateDetails
                      .SelectedPrescItem.PresTechValidatedItemsChild[i]
                      .PresTechValidatedItemsChild[j].FormViewerDetails
                      .BasicDetails.TechValSupplyInst != null &&
                    !String.IsNullOrEmpty(
                      objPrescriptionItemVM.FormViewerDetails
                        .TechValidateDetails.SelectedPrescItem
                        .PresTechValidatedItemsChild[i]
                        .PresTechValidatedItemsChild[j].FormViewerDetails
                        .BasicDetails.TechValSupplyInst.DisplayText
                    )
                  ) {
                    sChildSuppItem.Append(
                      objPrescriptionItemVM.FormViewerDetails
                        .TechValidateDetails.SelectedPrescItem
                        .PresTechValidatedItemsChild[i]
                        .PresTechValidatedItemsChild[j].FormViewerDetails
                        .BasicDetails.IdentifyingName
                    );
                    sChildSuppItem.Append(':');
                    sChildSuppItem.Append(
                      objPrescriptionItemVM.FormViewerDetails
                        .TechValidateDetails.SelectedPrescItem
                        .PresTechValidatedItemsChild[i]
                        .PresTechValidatedItemsChild[j].FormViewerDetails
                        .BasicDetails.TechValSupplyInst.DisplayText
                    );
                    sChildSuppItem.Append(',');
                  }
                }
              }
            }
          }
          if (sChildSuppItem != null && sChildSuppItem.Length > 0) {
            if (
              objPrescriptionLineItemVM.FormViewerDetails.BasicDetails
                .TechValSupplyInstructionText == null
            ) {
              objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.TechValSupplyInstructionText =
                new ObservableCollection<CListItem>();
            }
            objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.TechValSupplyInstructionText.Add(
              ObjectHelper.CreateObject(new CListItem(), {
                DisplayText:
                  sParentSuppItem.ToString() + '^' + sChildSuppItem.ToString(),
                Value: '',
              })
            );
          } else if (!String.IsNullOrEmpty(sParentSuppItem)) {
            if (
              objPrescriptionLineItemVM.FormViewerDetails.BasicDetails
                .TechValSupplyInstructionText == null
            ) {
              objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.TechValSupplyInstructionText =
                new ObservableCollection<CListItem>();
            }
            objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.TechValSupplyInstructionText.Add(
              ObjectHelper.CreateObject(new CListItem(), {
                DisplayText: sParentSuppItem.ToString() + '^',
                Value: '',
              })
            );
          }
        }
      }
      if (
        objPrescriptionItemVM.FormViewerDetails != null &&
        objPrescriptionItemVM.FormViewerDetails.BasicDetails != null &&
        !String.IsNullOrEmpty(
          objPrescriptionItemVM.FormViewerDetails.BasicDetails
            .TechSupplyInstrItemLevel
        ) &&
        String.Compare(
          objPrescriptionItemVM.FormViewerDetails.BasicDetails
            .TechSupplyInstrItemLevel,
          'N'
        ) != 0
      ) {
        if (
          !String.IsNullOrEmpty(
            objPrescriptionItemVM.FormViewerDetails.BasicDetails
              .TechSupplyInstrItemLevel
          ) &&
          String.IsNullOrEmpty(sParentSuppItem.ToString())
        ) {
          let objTechValSuplyInst: string[] =
            objPrescriptionItemVM.FormViewerDetails.BasicDetails.TechSupplyInstrItemLevel.Split(
              ';'
            );
          let TechCnt: number = objTechValSuplyInst.length;
          let SupplyComments: string[] =
            objPrescriptionItemVM.FormViewerDetails.BasicDetails.TechSupplyInstrItemLevel.Split(
              '~~',
              StringSplitOptions.None
            );
          if (
            SupplyComments.length > 1 &&
            !String.IsNullOrEmpty(SupplyComments[1])
          ) {
            objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.SupplyComments =
              SupplyComments[1];
            objTechValSuplyInst = SupplyComments[0].Split(';');
            TechCnt = objTechValSuplyInst.length;
          }
          if (
            objPrescriptionItemVM.FormViewerDetails.BasicDetails != null &&
            !String.IsNullOrEmpty(
              objPrescriptionItemVM.FormViewerDetails.BasicDetails.SupplyInsVal
            )
          ) {
            objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.TechValSupplyInstructionText =
              new ObservableCollection<CListItem>();
            if (oTechValSuplyInst == null)
              oTechValSuplyInst = new Dictionary<string, string>();
            let oSupplyValue: string[] =
              objPrescriptionItemVM.FormViewerDetails.BasicDetails.SupplyInsVal.Split(
                ';'
              );
            let oSupplyText: string[] =
              objPrescriptionItemVM.FormViewerDetails.BasicDetails.SupplyInsText.Split(
                ';'
              );
            if (oSupplyValue.length == oSupplyText.length) {
              for (let k: number = 0; k < oSupplyValue.length; k++) {
                if (
                  objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.TechValSupplyInstructionText.Where(
                    (x) => x.Value == oSupplyValue[k]
                  ).Count() == 0
                ) {
                  objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.TechValSupplyInstructionText.Add(
                    ObjectHelper.CreateObject(new CListItem(), {
                      DisplayText: oSupplyText[k],
                      Value: oSupplyValue[k],
                    })
                  );
                }
                if (!oTechValSuplyInst.ContainsKey(oSupplyValue[k])) {
                  oTechValSuplyInst.Add(oSupplyValue[k], oSupplyText[k]);
                }
              }
            }
          }
        }
      }
      if (
        objPrescriptionItemVM.FormViewerDetails != null &&
        objPrescriptionItemVM.FormViewerDetails.TechValidateDetails != null &&
        objPrescriptionItemVM.FormViewerDetails.TechValidateDetails
          .TechValidatedItems != null &&
        objPrescriptionItemVM.FormViewerDetails.TechValidateDetails
          .TechValidatedItems.Count > 0 &&
        (!objPrescriptionItemVM.bIsSupplyDispensingInstructionSet ||
          (objPrescriptionItemVM.bIsSupplyDispensingInstructionSet &&
            objPrescriptionItemVM.ActionCode == ActivityTypes.Amend &&
            !String.Equals(objPrescriptionItemVM.OperationMode, 'N')) ||
          (objPrescriptionItemVM.bIsSupplyDispensingInstructionSet &&
            objPrescriptionItemVM.ActionCode != ActivityTypes.Amend))
      ) {
        let TechItemCountSupply: number = 0;
        let objCustomTechValidatedItem: ObservableCollection<CustomTechValidatedItem> =
          objPrescriptionItemVM.FormViewerDetails.TechValidateDetails
            .TechValidatedItems;
        let nCntSupplyInst: number = 0;
        let nTechValItemCnt: number = objCustomTechValidatedItem.Count;
        if (
          objPrescriptionLineItemVM.FormViewerDetails.BasicDetails
            .TechValSupplyInstructionText == null
        ) {
          objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.TechValSupplyInstructionText =
            new ObservableCollection<CListItem>();
        }
        if (
          objPrescriptionItemVM.FormViewerDetails.BasicDetails != null &&
          !String.IsNullOrEmpty(
            objPrescriptionItemVM.FormViewerDetails.BasicDetails.SupplyInsVal
          )
        ) {
          if (oTechValSuplyInst == null)
            oTechValSuplyInst = new Dictionary<string, string>();
          let oSupplyValue: string[] =
            objPrescriptionItemVM.FormViewerDetails.BasicDetails.SupplyInsVal.Split(
              ';'
            );
          let oSupplyText: string[] =
            objPrescriptionItemVM.FormViewerDetails.BasicDetails.SupplyInsText.Split(
              ';'
            );
          if (oSupplyValue.length == oSupplyText.length) {
            for (let k: number = 0; k < oSupplyValue.length; k++) {
              if (
                objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.TechValSupplyInstructionText.Where(
                  (x) => x.Value == oSupplyValue[k]
                ).Count() == 0
              ) {
                objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.TechValSupplyInstructionText.Add(
                  ObjectHelper.CreateObject(new CListItem(), {
                    DisplayText: oSupplyText[k],
                    Value: oSupplyValue[k],
                  })
                );
              }
              if (!oTechValSuplyInst.ContainsKey(oSupplyValue[k])) {
                oTechValSuplyInst.Add(oSupplyValue[k], oSupplyText[k]);
              }
            }
          }
        }
        for (let Cnt: number = 0; Cnt < nTechValItemCnt; Cnt++) {
          if (
            !objPrescriptionItemVM.bIsSupplyDispensingInstructionSet &&
            objCustomTechValidatedItem[Cnt].IsDoseCombinationsDefined == '1' &&
            ((objCustomTechValidatedItem[Cnt].selectedSupplyInstruction != null &&
              objCustomTechValidatedItem[Cnt].selectedSupplyInstruction.Count > 0) ||
              !String.IsNullOrEmpty(objCustomTechValidatedItem[Cnt].SupComments))
          ) {
            objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.IsProdOption =
              true;
            break;
          }
        }
      }
      if (
        objPrescriptionItemVM != null &&
        objPrescriptionItemVM.FormViewerDetails != null &&
        objPrescriptionItemVM.FormViewerDetails.BasicDetails != null &&
        (!objPrescriptionItemVM.FormViewerDetails.BasicDetails.IsAuthorise ||
          (objPrescriptionItemVM.FormViewerDetails.BasicDetails.IsAuthorise &&
            !String.IsNullOrEmpty(
              objPrescriptionItemVM.PrescriptionItemStatus
            ) &&
            !String.Equals(
              objPrescriptionItemVM.PrescriptionItemStatus,
              CConstants.AWAITINGAUTHORISE,
              StringComparison.InvariantCultureIgnoreCase
            )))
      ) {
        if (
          objPrescriptionItemVM != null &&
          objPrescriptionLineItemVM != null &&
          objPrescriptionItemVM.FormViewerDetails != null &&
          objPrescriptionLineItemVM.FormViewerDetails != null &&
          objPrescriptionItemVM.FormViewerDetails.BasicDetails != null &&
          objPrescriptionLineItemVM.FormViewerDetails.BasicDetails != null
        ) {
          objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.SupplyComments =
            objPrescriptionItemVM.FormViewerDetails.BasicDetails.Supplycomments;
        }
      }
      if (
        objPrescriptionItemVM != null &&
        objPrescriptionLineItemVM != null &&
        objPrescriptionItemVM.FormViewerDetails != null &&
        objPrescriptionLineItemVM.FormViewerDetails != null &&
        objPrescriptionItemVM.FormViewerDetails.BasicDetails != null &&
        objPrescriptionLineItemVM.FormViewerDetails.BasicDetails != null &&
        objPrescriptionItemVM.FormViewerDetails.TechValidateDetails != null &&
        objPrescriptionItemVM.FormViewerDetails.TechValidateDetails
          .SelectedPrescItem != null &&
        objPrescriptionItemVM.FormViewerDetails.TechValidateDetails
          .SelectedPrescItem.PresTechValidatedItemsChild != null &&
        objPrescriptionItemVM.FormViewerDetails.TechValidateDetails
          .SelectedPrescItem.PresTechValidatedItemsChild.Count > 0
      ) {
        let ChildSupplyComments: StringBuilder = new StringBuilder();
        for (
          let i: number = 0;
          i <=
          objPrescriptionItemVM.FormViewerDetails.TechValidateDetails
            .SelectedPrescItem.PresTechValidatedItemsChild.Count -
            1;
          i++
        ) {
          if (
            !String.IsNullOrEmpty(
              objPrescriptionItemVM.FormViewerDetails.TechValidateDetails
                .SelectedPrescItem.PresTechValidatedItemsChild[i]
                .FormViewerDetails.BasicDetails.Supplycomments
            )
          ) {
            ChildSupplyComments.Append(
              objPrescriptionItemVM.FormViewerDetails.TechValidateDetails
                .SelectedPrescItem.PresTechValidatedItemsChild[i]
                .FormViewerDetails.BasicDetails.Supplycomments
            );
            ChildSupplyComments.Append('~');
          }
        }
        if (
          String.IsNullOrEmpty(
            objPrescriptionLineItemVM.FormViewerDetails.BasicDetails
              .SupplyComments
          )
        ) {
          objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.SupplyComments =
            ChildSupplyComments.ToString();
        }
      }
      if (
        objPrescriptionItemVM != null &&
        objPrescriptionItemVM.FormViewerDetails != null &&
        objPrescriptionItemVM.FormViewerDetails.BasicDetails != null &&
        !String.IsNullOrEmpty(
          objPrescriptionItemVM.FormViewerDetails.BasicDetails
            .TechsupplyInstText
        )
      ) {
        objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.IsProdOption =
          true;
      }
      if (
        objPrescriptionItemVM != null &&
        objPrescriptionItemVM.FormViewerDetails != null &&
        objPrescriptionItemVM.FormViewerDetails.BasicDetails != null
      ) {
        objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.RHSSupplyInstrIconTooltip =
          objPrescriptionItemVM.FormViewerDetails.BasicDetails.RHSSupplyInstrIconTooltip;
      }
      let IsMultiInfusionRoutes: boolean = false;
      if (
        objPrescriptionItemVM.FormViewerDetails != null &&
        objPrescriptionItemVM.FormViewerDetails.BasicDetails != null &&
        objPrescriptionItemVM.FormViewerDetails.BasicDetails
          .IsAllowMultiRoute &&
        objPrescriptionItemVM.FormViewerDetails.BasicDetails.DefaultDetails !=
          null &&
        objPrescriptionItemVM.FormViewerDetails.BasicDetails.DefaultDetails
          .Routes != null &&
        PatientContext.IsINFUSIONON
      ) {
        IsMultiInfusionRoutes = !Common.IsNonInfusionMultiRoutes(
          objPrescriptionItemVM.FormViewerDetails.BasicDetails.DefaultDetails
            .Routes
        );
      } else if (
        objPrescriptionItemVM.FormViewerDetails != null &&
        objPrescriptionItemVM.FormViewerDetails.BasicDetails != null &&
        objPrescriptionItemVM.FormViewerDetails.BasicDetails
          .IsAllowMultiRoute &&
        objPrescriptionItemVM.FormViewerDetails.BasicDetails.Route != null &&
        objPrescriptionItemVM.FormViewerDetails.BasicDetails.Route.Tag !=
          null &&
        objPrescriptionItemVM.FormViewerDetails.BasicDetails.Route.Tag.ToString().Contains(
          '1'
        ) &&
        PatientContext.IsINFUSIONON
      ) {
        IsMultiInfusionRoutes = true;
      }
      objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.InfusionDetails =
        new InfusionLineItemVM();
      if (
        objPrescriptionItemVM.FormViewerDetails != null &&
        objPrescriptionItemVM.FormViewerDetails.BasicDetails != null
      ) {
        objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.InfusionDetails.Reviewafter =
          objPrescriptionItemVM.FormViewerDetails.BasicDetails.ReviewAfter;
        if (
          objPrescriptionItemVM.FormViewerDetails.BasicDetails.ReviewafterUOM !=
          null
        ) {
          objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.InfusionDetails.ReviewafterUOM =
            objPrescriptionItemVM.FormViewerDetails.BasicDetails.ReviewafterUOM;
        }
        if (
          DateTime.NotEquals(objPrescriptionItemVM.FormViewerDetails.BasicDetails
            .ReviewAfterDTTM, DateTime.MinValue)
        ) {
          objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.InfusionDetails.ReviewafterDTTM =
            objPrescriptionItemVM.FormViewerDetails.BasicDetails.ReviewAfterDTTM;
        }
        if (
          !String.IsNullOrEmpty(
            objPrescriptionItemVM.FormViewerDetails.BasicDetails
              .ReviewRequestComments
          )
        ) {
          objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.ReviewComments =
            objPrescriptionItemVM.FormViewerDetails.BasicDetails.ReviewRequestComments;
        }
        if (
          !String.IsNullOrEmpty(
            objPrescriptionItemVM.FormViewerDetails.BasicDetails
              .ReviewRequestedBy
          )
        ) {
          objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.ReviewRequestedBy =
            objPrescriptionItemVM.FormViewerDetails.BasicDetails.ReviewRequestedBy;
        } else {
          if (ContextManager.Instance['UserName'] != null) {
            objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.ReviewRequestedBy =
              ContextManager.Instance['UserName'].ToString();
          }
        }
        if (
          !String.IsNullOrEmpty(
            objPrescriptionItemVM.FormViewerDetails.BasicDetails.ReviewType
          )
        ) {
          objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.ReviewType =
            objPrescriptionItemVM.FormViewerDetails.BasicDetails.ReviewType;
        } else {
          objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.ReviewType =
            CConstants.GenReview;
        }
      }
      if (
        objPrescriptionItemVM.FormViewerDetails != null &&
        objPrescriptionItemVM.FormViewerDetails.BasicDetails != null &&
        objPrescriptionItemVM.FormViewerDetails.BasicDetails.InfusionDetails !=
          null &&
        ((objPrescriptionItemVM.FormViewerDetails.BasicDetails.Route != null &&
          objPrescriptionItemVM.FormViewerDetails.BasicDetails.Route.Tag !=
            null &&
          String.Compare(
            objPrescriptionItemVM.FormViewerDetails.BasicDetails.Route.Tag.ToString(),
            '1'
          ) == 0) ||
          IsMultiInfusionRoutes ||
          (!String.IsNullOrEmpty(objPrescriptionItemVM.ItemSubType) &&
            String.Compare(
              objPrescriptionItemVM.ItemSubType,
              CConstants.SUBTYPE_GAS
            ) == 0) ||
          String.Compare(
            objPrescriptionItemVM.ItemSubType,
            CConstants.SUBTYPE_BLOOD
          ) == 0)
      ) {
        objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.InfusionDetails.IsOxygen =
          objPrescriptionItemVM.FormViewerDetails.BasicDetails.InfusionDetails.IsOxygen;
        objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.InfusionDetails.TargetUpperSatRange =
          !String.IsNullOrEmpty(
            objPrescriptionItemVM.FormViewerDetails.BasicDetails.InfusionDetails
              .TargetUpperSatRange
          )
            ? Convert.ToInt32(
                objPrescriptionItemVM.FormViewerDetails.BasicDetails
                  .InfusionDetails.TargetUpperSatRange
              )
            : 0;
        objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.InfusionDetails.TargetLowerSatRange =
          !String.IsNullOrEmpty(
            objPrescriptionItemVM.FormViewerDetails.BasicDetails.InfusionDetails
              .TargetLowerSatRange
          )
            ? Convert.ToInt32(
                objPrescriptionItemVM.FormViewerDetails.BasicDetails
                  .InfusionDetails.TargetLowerSatRange
              )
            : 0;
        objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.InfusionDetails.MaxDose =
          objPrescriptionItemVM.FormViewerDetails.BasicDetails.InfusionDetails.MaxDose;
        objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.InfusionDetails.Lumen =
          objPrescriptionItemVM.FormViewerDetails.BasicDetails.InfusionDetails.Lumen;
        objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.InfusionDetails.IsOnGoing =
          objPrescriptionItemVM.FormViewerDetails.BasicDetails.InfusionDetails.IsOnGoing;
        objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.InfusionDetails.ReviewafterDTTM =
          objPrescriptionItemVM.FormViewerDetails.BasicDetails.ReviewAfterDTTM;
        if (
          objPrescriptionItemVM.FormViewerDetails.BasicDetails
            .InfusionDetails != null &&
          objPrescriptionItemVM.FormViewerDetails.BasicDetails.InfusionDetails
            .Humidification != null
        ) {
          objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.InfusionDetails.Humidification =
            !String.IsNullOrEmpty(
              objPrescriptionItemVM.FormViewerDetails.BasicDetails
                .InfusionDetails.Humidification.Value
            )
              ? objPrescriptionItemVM.FormViewerDetails.BasicDetails
                  .InfusionDetails.Humidification.Value
              : String.Empty;
        }
        objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.InfusionDetails.Concentration =
          objPrescriptionItemVM.FormViewerDetails.BasicDetails.InfusionDetails.Concentration;
        objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.InfusionDetails.ConcentrationFreeText =
          objPrescriptionItemVM.FormViewerDetails.BasicDetails.InfusionDetails.ConcentrationFreeText;
        objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.InfusionDetails.DeliveryDevice =
          objPrescriptionItemVM.FormViewerDetails.BasicDetails.InfusionDetails.DeliveryDevice;
        objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.InfusionDetails.DeliveryDeviceFreetext =
          objPrescriptionItemVM.FormViewerDetails.BasicDetails.InfusionDetails.DeliveryDeviceFreetext;
        if (
          !String.IsNullOrEmpty(
            objPrescriptionItemVM.FormViewerDetails.BasicDetails.InfusionDetails
              .InfusionPeriod
          )
        ) {
          objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.InfusionDetails.InfusionPeriod =
            Convert.ToInt64(
              objPrescriptionItemVM.FormViewerDetails.BasicDetails
                .InfusionDetails.InfusionPeriod
            );
        }
        objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.InfusionDetails.InfusionPeriodUom =
          objPrescriptionItemVM.FormViewerDetails.BasicDetails.InfusionDetails.InfusionPeriodUom;
        objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.InfusionDetails.FluidSelectvalue =
          objPrescriptionItemVM.FormViewerDetails.BasicDetails.InfusionDetails.FluidSelectvalue;
        objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.InfusionDetails.FluidFreetext =
          objPrescriptionItemVM.FormViewerDetails.BasicDetails.InfusionDetails.FluidFreetext;
        if (
          String.IsNullOrEmpty(
            objPrescriptionLineItemVM.FormViewerDetails.BasicDetails
              .InfusionDetails.FluidFreetext
          ) &&
          objPrescriptionLineItemVM.FormViewerDetails.BasicDetails
            .InfusionDetails.FluidSelectvalue != null
        ) {
          if (!objPrescriptionItemVM.IsClinicallyVerifyEnable) {
          }
        }
        let fParValue: number = 0;
        if (
          !String.IsNullOrEmpty(
            objPrescriptionItemVM.FormViewerDetails.BasicDetails.InfusionDetails
              .FluidVolume
          ) &&
          objPrescriptionItemVM.FormViewerDetails.BasicDetails.InfusionDetails.FluidVolume.toString().IndexOf(
            '.'
          ) != -1 &&
          Double.TryParse(
            objPrescriptionItemVM.FormViewerDetails.BasicDetails.InfusionDetails
              .FluidVolume,
            (o) => {
              fParValue = o;
            }
          ) &&
          fParValue != 0 &&
          fParValue % 1 == 0
        ) {
          objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.InfusionDetails.FluidVolume =
            Convert.ToString(fParValue);
        } else {
          objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.InfusionDetails.FluidVolume =
            objPrescriptionItemVM.FormViewerDetails.BasicDetails.InfusionDetails.FluidVolume;
        }
        objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.InfusionDetails.VolumeUOM =
          objPrescriptionItemVM.FormViewerDetails.BasicDetails.InfusionDetails.VolumeUOM;
        if (
          objPrescriptionItemVM.FormViewerDetails.BasicDetails.InfusionType !=
          null
        )
          objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.InfusionDetails.InfusionType =
            objPrescriptionItemVM.FormViewerDetails.BasicDetails.InfusionType;
        let sSpecialChar: string = String.Empty;
        if (
          !String.IsNullOrEmpty(
            objPrescriptionItemVM.FormViewerDetails.BasicDetails.InfusionDetails
              .Rate
          )
        ) {
          //sSpecialChar = new string(objPrescriptionItemVM.FormViewerDetails.BasicDetails.InfusionDetails.Rate.Where(String.IsLetter).ToArray());
          sSpecialChar =
            objPrescriptionItemVM.FormViewerDetails.BasicDetails.InfusionDetails.Rate.toString().split(
              ''
            )
              .Where((c) => c.HasValue(String.IsLetter))
              .ToArray()
              .join('');
          if (
            String.IsNullOrEmpty(sSpecialChar) &&
            !objPrescriptionItemVM.FormViewerDetails.BasicDetails.InfusionDetails.Rate.toString().Trim().Contains(
              ' '
            )
          ) {
            objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.InfusionDetails.Rate =
              Convert.ToDouble(
                objPrescriptionItemVM.FormViewerDetails.BasicDetails
                  .InfusionDetails.Rate
              ).ToString();
          } else {
            objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.InfusionDetails.Rate =
              objPrescriptionItemVM.FormViewerDetails.BasicDetails.InfusionDetails.Rate;
          }
        }
        if (
          !String.IsNullOrEmpty(
            objPrescriptionItemVM.FormViewerDetails.BasicDetails.InfusionDetails
              .UpperRate
          )
        ) {
          // sSpecialChar = new string(objPrescriptionItemVM.FormViewerDetails.BasicDetails.InfusionDetails.UpperRate.Where(String.IsLetter).ToArray());
          sSpecialChar =
            objPrescriptionItemVM.FormViewerDetails.BasicDetails.InfusionDetails.UpperRate.toString().split(
              ''
            )
              .Where((c) => c.HasValue(String.IsLetter))
              .ToArray()
              .join('');
          if (
            String.IsNullOrEmpty(sSpecialChar) &&
            !objPrescriptionItemVM.FormViewerDetails.BasicDetails.InfusionDetails.UpperRate.Trim().Contains(
              ' '
            )
          ) {
            objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.InfusionDetails.UpperRate =
              Convert.ToDouble(
                objPrescriptionItemVM.FormViewerDetails.BasicDetails
                  .InfusionDetails.UpperRate
              ).ToString();
          } else {
            objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.InfusionDetails.UpperRate =
              objPrescriptionItemVM.FormViewerDetails.BasicDetails.InfusionDetails.UpperRate;
          }
        }
        objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.InfusionDetails.InfRateNumeratorUom =
          objPrescriptionItemVM.FormViewerDetails.BasicDetails.InfusionDetails.InfRateNumeratorUom;
        objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.InfusionDetails.InfRateDinominatorUom =
          objPrescriptionItemVM.FormViewerDetails.BasicDetails.InfusionDetails.InfRateDinominatorUom;
        if (
          !String.IsNullOrEmpty(
            objPrescriptionItemVM.FormViewerDetails.BasicDetails.InfusionDetails
              .BackgroundRate
          )
        ) {
          // sSpecialChar = new string(objPrescriptionItemVM.FormViewerDetails.BasicDetails.InfusionDetails.BackgroundRate.Where(String.IsLetter).ToArray());
          sSpecialChar =
            objPrescriptionItemVM.FormViewerDetails.BasicDetails.InfusionDetails.BackgroundRate.split(
              ''
            )
              .Where((c) => c.HasValue(String.IsLetter))
              .ToArray()
              .join('');
          if (
            String.IsNullOrEmpty(sSpecialChar) &&
            !objPrescriptionItemVM.FormViewerDetails.BasicDetails.InfusionDetails.BackgroundRate.Trim().Contains(
              ' '
            )
          ) {
            objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.InfusionDetails.BackgroundRate =
              Convert.ToDouble(
                objPrescriptionItemVM.FormViewerDetails.BasicDetails
                  .InfusionDetails.BackgroundRate
              ).ToString();
          } else {
            objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.InfusionDetails.BackgroundRate =
              objPrescriptionItemVM.FormViewerDetails.BasicDetails.InfusionDetails.BackgroundRate;
          }
        }
        objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.InfusionDetails.BackgroundRateNumeratorUom =
          objPrescriptionItemVM.FormViewerDetails.BasicDetails.InfusionDetails.BackgroundRateNumeratorUom;
        objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.InfusionDetails.BackgroundRateDinominatorUom =
          objPrescriptionItemVM.FormViewerDetails.BasicDetails.InfusionDetails.BackgroundRateDinominatorUom;
        if (
          !(
            objPrescriptionItemVM.FormViewerDetails.BasicDetails.InfusionType !=
              null &&
            !String.IsNullOrEmpty(
              objPrescriptionItemVM.FormViewerDetails.BasicDetails.InfusionType
                .Value
            ) &&
            String.Compare(
              objPrescriptionItemVM.FormViewerDetails.BasicDetails.InfusionType
                .Value,
              InfusionTypesCode.INTERMITTENT
            ) == 0
          )
        ) {
          objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.InfusionDetails.LowConcentration =
            objPrescriptionItemVM.FormViewerDetails.BasicDetails.InfusionDetails.LowConcentration;
          objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.InfusionDetails.UpperConcentration =
            objPrescriptionItemVM.FormViewerDetails.BasicDetails.InfusionDetails.UpperConcentration;
          objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.InfusionDetails.LowConcentrationUOM =
            objPrescriptionItemVM.FormViewerDetails.BasicDetails.InfusionDetails.LowConcentrationUOM;
          objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.InfusionDetails.UpperConcentrationUOM =
            objPrescriptionItemVM.FormViewerDetails.BasicDetails.InfusionDetails.UpperConcentrationUOM;
        }
        let bParValue: number = 0;
        if (
          !String.IsNullOrEmpty(
            objPrescriptionItemVM.FormViewerDetails.BasicDetails.InfusionDetails
              .Bolus
          ) &&
          objPrescriptionItemVM.FormViewerDetails.BasicDetails.InfusionDetails.Bolus.toString().IndexOf(
            '.'
          ) != -1 &&
          Double.TryParse(
            objPrescriptionItemVM.FormViewerDetails.BasicDetails.InfusionDetails
              .Bolus,
            (o) => {
              bParValue = o;
            }
          ) &&
          bParValue != 0 &&
          bParValue % 1 == 0
        ) {
          objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.InfusionDetails.Bolus =
            Convert.ToString(bParValue);
        } else {
          objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.InfusionDetails.Bolus =
            objPrescriptionItemVM.FormViewerDetails.BasicDetails.InfusionDetails.Bolus;
        }
        objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.InfusionDetails.BolusUOM =
          objPrescriptionItemVM.FormViewerDetails.BasicDetails.InfusionDetails.BolusUOM;
        if (
          !String.IsNullOrEmpty(
            objPrescriptionItemVM.FormViewerDetails.BasicDetails.InfusionDetails
              .Boosterdose
          )
        ) {
          sSpecialChar = String.Empty;
          // sSpecialChar = new string(objPrescriptionItemVM.FormViewerDetails.BasicDetails.InfusionDetails.Boosterdose.Where(String.IsLetter).ToArray());
          sSpecialChar =
            objPrescriptionItemVM.FormViewerDetails.BasicDetails.InfusionDetails.Boosterdose.toString().split(
              ''
            )
              .Where((c) => c.HasValue(String.IsLetter))
              .ToArray()
              .join('');
          if (
            String.IsNullOrEmpty(sSpecialChar) &&
            !objPrescriptionItemVM.FormViewerDetails.BasicDetails.InfusionDetails.Boosterdose.toString().Trim().Contains(
              ' '
            )
          ) {
            objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.InfusionDetails.Boosterdose =
              Convert.ToDouble(
                objPrescriptionItemVM.FormViewerDetails.BasicDetails
                  .InfusionDetails.Boosterdose
              ).ToString();
          } else {
            objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.InfusionDetails.Boosterdose =
              objPrescriptionItemVM.FormViewerDetails.BasicDetails.InfusionDetails.Boosterdose;
          }
        }
        objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.InfusionDetails.Boosterdoseuom =
          objPrescriptionItemVM.FormViewerDetails.BasicDetails.InfusionDetails.Boosterdoseuom;
        if (
          PatientContext.IsINFUSIONON &&
          objPrescriptionItemVM.FormViewerDetails.BasicDetails.Route != null &&
          !String.IsNullOrEmpty(
            objPrescriptionItemVM.FormViewerDetails.BasicDetails.Route.Value
          ) &&
          objPrescriptionItemVM.FormViewerDetails.BasicDetails.Route.Tag !=
            null &&
          String.Equals(
            objPrescriptionItemVM.FormViewerDetails.BasicDetails.Route.Tag.ToString(),
            '1'
          ) &&
          objPrescriptionItemVM.FormViewerDetails.BasicDetails.InfusionType ==
            null &&
          objPrescriptionItemVM.FormViewerDetails.BasicDetails.InfusionDetails
            .Boosterdoseuom != null &&
          !String.IsNullOrEmpty(
            objPrescriptionItemVM.FormViewerDetails.BasicDetails.InfusionDetails
              .Boosterdoseuom.Value
          )
        ) {
          objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.InfusionDetails.IsInfContiniousFormLoaded =
            true;
        }
        if (
          !String.IsNullOrEmpty(
            objPrescriptionItemVM.FormViewerDetails.BasicDetails.InfusionDetails
              .MonitoringPeriod
          )
        ) {
          objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.InfusionDetails.MonitoringPeriod =
            objPrescriptionItemVM.FormViewerDetails.BasicDetails.InfusionDetails.MonitoringPeriod;
        }
        if (
          objPrescriptionItemVM.FormViewerDetails.BasicDetails.InfusionDetails
            .MonitoringPeriodUOM != null
        ) {
          objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.InfusionDetails.MonitoringPeriodUOM =
            objPrescriptionItemVM.FormViewerDetails.BasicDetails.InfusionDetails.MonitoringPeriodUOM;
        }
        if (
          !String.IsNullOrEmpty(
            objPrescriptionItemVM.FormViewerDetails.BasicDetails.InfusionDetails
              .LockOutPeriod
          )
        ) {
          objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.InfusionDetails.LockOutPeriod =
            Convert.ToInt64(
              objPrescriptionItemVM.FormViewerDetails.BasicDetails
                .InfusionDetails.LockOutPeriod
            );
        }
        objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.InfusionDetails.LockoutDuration =
          objPrescriptionItemVM.FormViewerDetails.BasicDetails.InfusionDetails.LockoutDuration;
        if (
          objPrescriptionItemVM.FormViewerDetails.BasicDetails
            .IsInfContiniousFormLoaded
        )
          objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.InfusionDetails.IsInfContiniousFormLoaded =
            true;
        if (
          PatientContext.IsINFUSIONON &&
          !String.IsNullOrEmpty(objPrescriptionItemVM.ItemSubType) &&
          objPrescriptionItemVM.ItemSubType.Equals(CConstants.SUBTYPE_BLOOD)
        ) {
          objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.InfusionDetails.IsInfContiniousFormLoaded =
            true;
        }
        if (
          PatientContext.IsINFUSIONON &&
          PatientContext.PrescriptionType == PrescriptionTypes.Clerking &&
          objPrescriptionItemVM.FormViewerDetails.BasicDetails.Route != null &&
          objPrescriptionItemVM.FormViewerDetails.BasicDetails.Route.Tag !=
            null &&
          String.Compare(
            objPrescriptionItemVM.FormViewerDetails.BasicDetails.Route.Tag.ToString(),
            '1'
          ) == 0 &&
          objPrescriptionItemVM.FormViewerDetails.BasicDetails.InfusionType ==
            null &&
          !(
            (!String.IsNullOrEmpty(objPrescriptionItemVM.ItemSubType) &&
              String.Compare(
                objPrescriptionItemVM.ItemSubType,
                CConstants.SUBTYPE_GAS
              ) == 0) ||
            String.Compare(
              objPrescriptionItemVM.ItemSubType,
              CConstants.SUBTYPE_BLOOD
            ) == 0
          )
        ) {
          objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.InfusionDetails.IsInfContiniousFormLoaded =
            true;
        }
      }
      sParentSuppItem = String.Empty;
      if (objPrescriptionItemVM.objDoseFormulaDef != null) {
        objPrescriptionLineItemVM.objDoseFormulaDef = new DoseFormulaDef();
        objPrescriptionLineItemVM.objDoseFormulaDef.IsDoseCalcAlwaysUse =
          objPrescriptionItemVM.objDoseFormulaDef.IsDoseCalcAlwaysUse;
        objPrescriptionLineItemVM.objDoseFormulaDef.CalculationFor =
          objPrescriptionItemVM.objDoseFormulaDef.CalculationFor;
        objPrescriptionLineItemVM.objDoseFormulaDef.FrequencyName =
          objPrescriptionItemVM.objDoseFormulaDef.FrequencyName;
        objPrescriptionLineItemVM.objDoseFormulaDef.DoseCalcBasedOn =
          objPrescriptionItemVM.objDoseFormulaDef.DoseCalcBasedOn;
        objPrescriptionLineItemVM.objDoseFormulaDef.BSAFormula =
          objPrescriptionItemVM.objDoseFormulaDef.BSAFormula;
        objPrescriptionLineItemVM.objDoseFormulaDef.DefaultWeightType =
          objPrescriptionItemVM.objDoseFormulaDef.DefaultWeightType;
        objPrescriptionLineItemVM.objDoseFormulaDef.RequestedDose =
          objPrescriptionItemVM.objDoseFormulaDef.RequestedDose;
        objPrescriptionLineItemVM.objDoseFormulaDef.RequestedUOMName =
          objPrescriptionItemVM.objDoseFormulaDef.RequestedUOMName;
        objPrescriptionLineItemVM.objDoseFormulaDef.RequestDosePerUOM =
          objPrescriptionItemVM.objDoseFormulaDef.RequestDosePerUOM;
        objPrescriptionLineItemVM.objDoseFormulaDef.RequestDosePer2UOMName =
          objPrescriptionItemVM.objDoseFormulaDef.RequestDosePer2UOMName;
      }
      objPrescriptionLineItemVM.IsDoseCalcPerformed =
        objPrescriptionItemVM.IsDoseCalcPerformed;
      if (objPrescriptionItemVM.DoseCalculationDetails != null) {
        let sBSA: number = 0;
        let sIBWt: number = 0;
        let sAjBWt: number = 0;
        let sRecWt: number = 0;
        let scalVal: string = String.Empty;
        let sLowEvent: string = String.Empty;
        let sReqDoseUOM: string = String.Empty;
        let sReqDoseThirdUOM: string = String.Empty;
        let sReqDoseForDetails: string = String.Empty;
        if (
          objPrescriptionItemVM.FormViewerDetails.BasicDetails.DoseUOM !=
            null &&
          !String.IsNullOrEmpty(
            objPrescriptionItemVM.FormViewerDetails.BasicDetails.DoseUOM
              .DisplayText
          )
        ) {
          sReqDoseUOM =
            objPrescriptionItemVM.FormViewerDetails.BasicDetails.DoseUOM
              .DisplayText;
        } else if (
          objPrescriptionItemVM.FormViewerDetails.BasicDetails
            .InfusionDetails != null &&
          objPrescriptionItemVM.FormViewerDetails.BasicDetails.InfusionDetails
            .InfRateNumeratorUom != null &&
          !String.IsNullOrEmpty(
            objPrescriptionItemVM.FormViewerDetails.BasicDetails.InfusionDetails
              .InfRateNumeratorUom.DisplayText
          )
        ) {
          sReqDoseUOM =
            objPrescriptionItemVM.FormViewerDetails.BasicDetails.InfusionDetails
              .InfRateNumeratorUom.DisplayText;
        }
        if (
          !String.IsNullOrEmpty(
            objPrescriptionItemVM.DoseCalculationDetails
              .RequestDoseThirdUOMLzoID
          )
        ) {
          if (
            !String.IsNullOrEmpty(
              objPrescriptionItemVM.DoseCalculationDetails
                .RequestDoseThirdUOMLzoID
            )
          ) {
            if (
              objPrescriptionItemVM.FormViewerDetails.BasicDetails
                .InfusionDetails != null &&
              objPrescriptionItemVM.FormViewerDetails.BasicDetails
                .InfusionDetails.InfRateDenominatorUOM != null &&
              objPrescriptionItemVM.FormViewerDetails.BasicDetails
                .InfusionDetails.InfRateDenominatorUOM.Count > 0
            ) {
              let litmReqDoseThirdUOM: CListItem =
                objPrescriptionItemVM.FormViewerDetails.BasicDetails.InfusionDetails.InfRateDenominatorUOM.Where(
                  (s) =>
                    s.Value ==
                    objPrescriptionItemVM.DoseCalculationDetails
                      .RequestDoseThirdUOMLzoID
                ).First();
              if (
                litmReqDoseThirdUOM != null &&
                !String.IsNullOrEmpty(litmReqDoseThirdUOM.DisplayText)
              ) {
                sReqDoseThirdUOM = litmReqDoseThirdUOM.DisplayText;
              }
            }
          }
        }
        objPrescriptionLineItemVM.oDoseCalcData = new DoseDetailsdata();
        if (
          !String.IsNullOrEmpty(
            objPrescriptionItemVM.DoseCalculationDetails.Height
          ) &&
          !String.Equals(
            objPrescriptionItemVM.DoseCalculationDetails.Height,
            '0'
          )
        ) {
          objPrescriptionLineItemVM.oDoseCalcData.HeightVal =
            CommonBB.ConvertHeightIntoMeters(
              objPrescriptionItemVM.DoseCalculationDetails.HeightUOM,
              Convert.ToDouble(
                objPrescriptionItemVM.DoseCalculationDetails.Height
              )
            ).ToString();
          if (
            !String.IsNullOrEmpty(
              objPrescriptionItemVM.DoseCalculationDetails.HeightUOM
            )
          )
            objPrescriptionLineItemVM.oDoseCalcData.HeightVal +=
              ' ' + Common_CConstants.Meter;
          if (objPrescriptionItemVM.DoseCalculationDetails.IsHeightEstimated) {
            objPrescriptionLineItemVM.oDoseCalcData.HeightVal +=
              ' ' + DoseCalculator.IsEstimated_Text;
            if (
              objPrescriptionItemVM.DoseCalculationDetails.RecordedHeightDTTM !=
              null
            )
              objPrescriptionLineItemVM.oDoseCalcData.HeightVal +=
                '\n on ' +
                objPrescriptionItemVM.DoseCalculationDetails.RecordedHeightDTTM.ToString(
                  CConstants.DateHMFormat
                );
          } else if (
            objPrescriptionItemVM.DoseCalculationDetails.RecordedHeightDTTM !=
            null
          )
            objPrescriptionLineItemVM.oDoseCalcData.HeightVal +=
              ' on ' +
              objPrescriptionItemVM.DoseCalculationDetails.RecordedHeightDTTM.ToString(
                CConstants.DateHMFormat
              );
        }
        if (
          !String.IsNullOrEmpty(
            objPrescriptionItemVM.DoseCalculationDetails.Weight
          ) &&
          !String.Equals(
            objPrescriptionItemVM.DoseCalculationDetails.Weight,
            '0'
          )
        ) {
          sRecWt = 1;
          objPrescriptionLineItemVM.oDoseCalcData.RecBdyWeight =
            CommonBB.ConvertWeightIntoKg(
              objPrescriptionItemVM.DoseCalculationDetails.WeightUOM,
              Convert.ToDouble(
                objPrescriptionItemVM.DoseCalculationDetails.Weight
              )
            ).ToString();
          if (
            !String.IsNullOrEmpty(
              objPrescriptionItemVM.DoseCalculationDetails.WeightUOM
            )
          )
            objPrescriptionLineItemVM.oDoseCalcData.RecBdyWeight +=
              ' ' + Common_CConstants.KG;
          if (objPrescriptionItemVM.DoseCalculationDetails.IsWeightEstimated) {
            objPrescriptionLineItemVM.oDoseCalcData.RecBdyWeight +=
              ' ' + DoseCalculator.IsEstimated_Text;
            if (
              objPrescriptionItemVM.DoseCalculationDetails.RecordedWeightDTTM !=
              null
            )
              objPrescriptionLineItemVM.oDoseCalcData.RecBdyWeight +=
                '\n on ' +
                objPrescriptionItemVM.DoseCalculationDetails.RecordedWeightDTTM.ToString(
                  CConstants.DateHMFormat
                );
          } else if (
            objPrescriptionItemVM.DoseCalculationDetails.RecordedWeightDTTM !=
            null
          )
            objPrescriptionLineItemVM.oDoseCalcData.RecBdyWeight +=
              ' on ' +
              objPrescriptionItemVM.DoseCalculationDetails.RecordedWeightDTTM.ToString(
                CConstants.DateHMFormat
              );
        }
        if (
          objPrescriptionItemVM.DoseCalculationDetails.IBWWeight > 0 &&
          !String.IsNullOrEmpty(
            objPrescriptionItemVM.DoseCalculationDetails.DoseCalcBasedOn
          ) &&
          objPrescriptionItemVM.DoseCalculationDetails.DoseCalcBasedOn.Equals(
            CConstants.WeightCode
          ) &&
          !String.IsNullOrEmpty(
            objPrescriptionItemVM.DoseCalculationDetails.WeightOption
          ) &&
          objPrescriptionItemVM.DoseCalculationDetails.WeightOption.Equals(
            CConstants.IBWConceptCode
          )
        ) {
          sIBWt = 1;
          objPrescriptionLineItemVM.oDoseCalcData.IdealWeight =
            objPrescriptionItemVM.DoseCalculationDetails.IBWWeight.ToString();
          if (
            !String.IsNullOrEmpty(
              objPrescriptionItemVM.DoseCalculationDetails.RequestDoseSecondUOM
            )
          )
            objPrescriptionLineItemVM.oDoseCalcData.IdealWeight +=
              ' ' +
              CommonBB.GetText(
                objPrescriptionItemVM.DoseCalculationDetails
                  .RequestDoseSecondUOM,
                DCReqDoseSecondUOMConceptCodes.ConceptCodes
              );
        }
        if (
          objPrescriptionItemVM.DoseCalculationDetails.ABWWeight > 0 &&
          !String.IsNullOrEmpty(
            objPrescriptionItemVM.DoseCalculationDetails.DoseCalcBasedOn
          ) &&
          objPrescriptionItemVM.DoseCalculationDetails.DoseCalcBasedOn.Equals(
            CConstants.WeightCode
          ) &&
          !String.IsNullOrEmpty(
            objPrescriptionItemVM.DoseCalculationDetails.WeightOption
          ) &&
          objPrescriptionItemVM.DoseCalculationDetails.WeightOption.Equals(
            CConstants.ABWConceptCode
          )
        ) {
          sAjBWt = 1;
          objPrescriptionLineItemVM.oDoseCalcData.AdjBdyWeight =
            objPrescriptionItemVM.DoseCalculationDetails.ABWWeight.ToString();
          if (
            !String.IsNullOrEmpty(
              objPrescriptionItemVM.DoseCalculationDetails.RequestDoseSecondUOM
            )
          )
            objPrescriptionLineItemVM.oDoseCalcData.AdjBdyWeight +=
              ' ' +
              CommonBB.GetText(
                objPrescriptionItemVM.DoseCalculationDetails
                  .RequestDoseSecondUOM,
                DCReqDoseSecondUOMConceptCodes.ConceptCodes
              );
        }
        if (
          !String.IsNullOrEmpty(
            objPrescriptionItemVM.DoseCalculationDetails.BSA
          ) &&
          !String.IsNullOrEmpty(
            objPrescriptionItemVM.DoseCalculationDetails.DoseCalcBasedOn
          ) &&
          objPrescriptionItemVM.DoseCalculationDetails.DoseCalcBasedOn.Equals(
            Common_CConstants.BSACode
          )
        ) {
          sBSA = 1;
          objPrescriptionLineItemVM.oDoseCalcData.BSA =
            objPrescriptionItemVM.DoseCalculationDetails.BSA;
          objPrescriptionLineItemVM.oDoseCalcData.BSA +=
            ' ' +
            CommonBB.GetText(
              objPrescriptionItemVM.DoseCalculationDetails.RequestDoseSecondUOM,
              DCReqDoseSecondUOMConceptCodes.ConceptCodes
            );
          objPrescriptionLineItemVM.oDoseCalcData.BSA +=
            '(' +
            CommonBB.GetText(
              objPrescriptionItemVM.DoseCalculationDetails.BSAFormula,
              CommonDomainValues.BSAFormula
            ) +
            ')';
        }
        if (
          !String.IsNullOrEmpty(
            objPrescriptionItemVM.DoseCalculationDetails.RequestDose
          ) &&
          !String.Equals(
            objPrescriptionItemVM.DoseCalculationDetails.RequestDose,
            '0'
          )
        ) {
          objPrescriptionLineItemVM.oDoseCalcData.Reqdose =
            objPrescriptionItemVM.DoseCalculationDetails.RequestDose;
          if (objPrescriptionLineItemVM.oDoseCalcData.Reqdose.toString().StartsWith('.')) {
            objPrescriptionLineItemVM.oDoseCalcData.Reqdose =
              '0' + objPrescriptionLineItemVM.oDoseCalcData.Reqdose;
          }
          if (!String.IsNullOrEmpty(sReqDoseUOM))
            objPrescriptionLineItemVM.oDoseCalcData.Reqdose +=
              ' ' + sReqDoseUOM;
          sReqDoseForDetails = objPrescriptionLineItemVM.oDoseCalcData.Reqdose;
          if (
            !String.IsNullOrEmpty(
              objPrescriptionItemVM.DoseCalculationDetails.RequestDoseSecondUOM
            )
          )
            objPrescriptionLineItemVM.oDoseCalcData.Reqdose +=
              '/' +
              CommonBB.GetText(
                objPrescriptionItemVM.DoseCalculationDetails
                  .RequestDoseSecondUOM,
                DCReqDoseSecondUOMConceptCodes.ConceptCodes
              );
          if (
            !String.IsNullOrEmpty(
              objPrescriptionItemVM.DoseCalculationDetails
                .RequestDoseThirdUOMLzoID
            ) &&
            String.IsNullOrEmpty(sReqDoseThirdUOM)
          ) {
            objPrescriptionLineItemVM.oDoseCalcData.Reqdose +=
              '/' + sReqDoseThirdUOM;
            sReqDoseForDetails += '/' + sReqDoseThirdUOM;
          }
        }
        if (
          !String.IsNullOrEmpty(
            objPrescriptionItemVM.DoseCalculationDetails.TotalDailyDose
          ) &&
          objPrescriptionItemVM.DoseCalculationDetails.FrequencyOID > 0
        ) {
          objPrescriptionLineItemVM.oDoseCalcData.IndivDose = CommonBB.GetText(
            Common_CConstants.TotDailydose,
            MedicationCommonConceptCodeData.ConceptCodes
          );
        } else {
          objPrescriptionLineItemVM.oDoseCalcData.IndivDose = CommonBB.GetText(
            Common_CConstants.IndDose,
            MedicationCommonConceptCodeData.ConceptCodes
          );
        }
        if (
          objPrescriptionItemVM.DoseCalculationDetails.FrequencyOID > 0 &&
          objPrescriptionItemVM.FormViewerDetails.BasicDetails.Frequency !=
            null &&
          !String.IsNullOrEmpty(
            objPrescriptionItemVM.FormViewerDetails.BasicDetails.Frequency
              .DisplayText
          )
        ) {
          objPrescriptionLineItemVM.oDoseCalcData.Freq =
            objPrescriptionItemVM.FormViewerDetails.BasicDetails.Frequency.DisplayText;
          if (
            objPrescriptionItemVM.FormViewerDetails.BasicDetails.Frequency
              .Tag != null
          ) {
            let FreqTagdetail: string[] = ObjectHelper.CreateType<string[]>(
              objPrescriptionItemVM.FormViewerDetails.BasicDetails.Frequency
                .Tag,
              'string[]'
            );
            if (
              FreqTagdetail != null &&
              FreqTagdetail.length > 0 &&
              FreqTagdetail.length > 6
            ) {
              sLowEvent = FreqTagdetail[6];
            }
          }
        }
        if (
          !String.IsNullOrEmpty(
            objPrescriptionItemVM.DoseCalculationDetails.CalculatedDose
          ) ||
          !String.IsNullOrEmpty(
            objPrescriptionItemVM.DoseCalculationDetails.CalculatedPerDose
          )
        ) {
          objPrescriptionLineItemVM.oDoseCalcData.Caldose =
            objPrescriptionItemVM.DoseCalculationDetails.CalculatedDose;
          if (
            String.IsNullOrEmpty(
              objPrescriptionLineItemVM.oDoseCalcData.Caldose
            )
          ) {
            objPrescriptionLineItemVM.oDoseCalcData.Caldose =
              objPrescriptionItemVM.DoseCalculationDetails.CalculatedPerDose;
          }
          objPrescriptionLineItemVM.oDoseCalcData.Caldose += ' ' + sReqDoseUOM;
          if (
            !String.IsNullOrEmpty(
              objPrescriptionItemVM.DoseCalculationDetails
                .RequestDoseThirdUOMLzoID
            ) &&
            !String.IsNullOrEmpty(sReqDoseThirdUOM)
          ) {
            objPrescriptionLineItemVM.oDoseCalcData.Caldose +=
              '/' + sReqDoseThirdUOM;
          }
        }
        if (
          !String.IsNullOrEmpty(
            objPrescriptionItemVM.DoseCalculationDetails.TotalDailyDose
          ) &&
          objPrescriptionItemVM.DoseCalculationDetails.FrequencyOID > 0
        ) {
          objPrescriptionLineItemVM.oDoseCalcData.TotDailyDose =
            objPrescriptionItemVM.DoseCalculationDetails.TotalDailyDose;
          objPrescriptionLineItemVM.oDoseCalcData.TotDailyDose +=
            ' ' + sReqDoseUOM;
        }
        if (
          !String.IsNullOrEmpty(
            objPrescriptionItemVM.DoseCalculationDetails.OrderedAmount
          ) &&
          !String.Equals(
            objPrescriptionItemVM.DoseCalculationDetails.OrderedAmount,
            '0'
          )
        ) {
          objPrescriptionLineItemVM.oDoseCalcData.OrdAmtDse =
            objPrescriptionItemVM.DoseCalculationDetails.OrderedAmount;
          if (
            objPrescriptionLineItemVM.oDoseCalcData.OrdAmtDse.ToString().StartsWith('.')
          ) {
            objPrescriptionLineItemVM.oDoseCalcData.OrdAmtDse =
              '0' + objPrescriptionLineItemVM.oDoseCalcData.OrdAmtDse;
          }
          objPrescriptionLineItemVM.oDoseCalcData.OrdAmtDse +=
            ' ' + sReqDoseUOM;
          if (
            !String.IsNullOrEmpty(
              objPrescriptionItemVM.DoseCalculationDetails
                .RequestDoseThirdUOMLzoID
            ) &&
            !String.IsNullOrEmpty(sReqDoseThirdUOM)
          ) {
            objPrescriptionLineItemVM.oDoseCalcData.OrdAmtDse +=
              '/' + sReqDoseThirdUOM;
          }
        }
        if (
          !String.IsNullOrEmpty(
            objPrescriptionItemVM.DoseCalculationDetails.OverrideReason
          )
        ) {
          objPrescriptionLineItemVM.oDoseCalcData.Reasonforoverride =
            CommonBB.GetText(
              objPrescriptionItemVM.DoseCalculationDetails.OverrideReason,
              DCOverridereasonConceptCodes.ConceptCodes
            );
        }
        objPrescriptionLineItemVM.oDoseCalcData.FreqVisible =
          Visibility.Collapsed;
        objPrescriptionLineItemVM.oDoseCalcData.TotDailyDseVisible =
          Visibility.Collapsed;
        if (sBSA == 1) {
          objPrescriptionLineItemVM.oDoseCalcData.DoseCalTxt1 =
            CommonBB.GetText(
              objPrescriptionItemVM.DoseCalculationDetails.BSAFormula,
              CommonDomainValues.BSAFormula
            );
          objPrescriptionLineItemVM.oDoseCalcData.DoseCalTxt1 +=
            ' BSA(' +
            CommonBB.GetText(
              objPrescriptionItemVM.DoseCalculationDetails.RequestDoseSecondUOM,
              DCReqDoseSecondUOMConceptCodes.ConceptCodes
            ) +
            ')';
          scalVal =
            objPrescriptionItemVM.DoseCalculationDetails.BSA +
            ' ' +
            CommonBB.GetText(
              objPrescriptionItemVM.DoseCalculationDetails.RequestDoseSecondUOM,
              DCReqDoseSecondUOMConceptCodes.ConceptCodes
            );
          objPrescriptionLineItemVM.oDoseCalcData.DoseCalVal1 = '= ' + scalVal;
        } else if (sAjBWt == 1) {
          objPrescriptionLineItemVM.oDoseCalcData.DoseCalTxt1 =
            DoseCalculator.cmdCalcAJBW_Text;
          objPrescriptionLineItemVM.oDoseCalcData.DoseCalVal1 =
            '= ' + objPrescriptionLineItemVM.oDoseCalcData.AdjBdyWeight;
          scalVal = objPrescriptionLineItemVM.oDoseCalcData.AdjBdyWeight;
        } else if (sIBWt == 1) {
          objPrescriptionLineItemVM.oDoseCalcData.DoseCalTxt1 =
            DoseCalculator.cmdCalcIBW_Text;
          objPrescriptionLineItemVM.oDoseCalcData.DoseCalVal1 =
            '= ' + objPrescriptionLineItemVM.oDoseCalcData.IdealWeight;
          scalVal = objPrescriptionLineItemVM.oDoseCalcData.IdealWeight;
        } else if (sRecWt == 1) {
          objPrescriptionLineItemVM.oDoseCalcData.DoseCalTxt1 =
            DoseCalculator.cmdCalcEBW_Text;
          objPrescriptionLineItemVM.oDoseCalcData.DoseCalVal1 =
            '= ' +
            CommonBB.ConvertWeightIntoKg(
              objPrescriptionItemVM.DoseCalculationDetails.WeightUOM,
              Convert.ToDouble(
                objPrescriptionItemVM.DoseCalculationDetails.Weight
              )
            ).ToString();
          if (
            !String.IsNullOrEmpty(
              objPrescriptionItemVM.DoseCalculationDetails.WeightUOM
            )
          ) {
            objPrescriptionLineItemVM.oDoseCalcData.DoseCalVal1 +=
              ' ' + Common_CConstants.KG;
          }
          scalVal =
            objPrescriptionLineItemVM.oDoseCalcData.DoseCalVal1.Split('=')[1];
          if (objPrescriptionItemVM.DoseCalculationDetails.IsWeightEstimated) {
            objPrescriptionLineItemVM.oDoseCalcData.DoseCalVal1 +=
              ' ' + DoseCalculator.IsEstimated_Text;
          }
        }
        if (
          !String.IsNullOrEmpty(
            objPrescriptionItemVM.DoseCalculationDetails.TotalDailyDose
          ) &&
          objPrescriptionItemVM.DoseCalculationDetails.FrequencyOID > 0
        ) {
          objPrescriptionLineItemVM.oDoseCalcData.FreqVisible =
            Visibility.Visible;
          objPrescriptionLineItemVM.oDoseCalcData.TotDailyDseVisible =
            Visibility.Visible;
          objPrescriptionLineItemVM.oDoseCalcData.DoseCalTxt2 =
            DoseCalculator.lblTotalDailyDose_Text;
          objPrescriptionLineItemVM.oDoseCalcData.DoseCalVal2 =
            '= ' +
            sReqDoseForDetails +
            ' X ' +
            scalVal +
            '\n= ' +
            objPrescriptionLineItemVM.oDoseCalcData.TotDailyDose;
          objPrescriptionLineItemVM.oDoseCalcData.DoseCalTxt3 =
            DoseCalculator.lblFrequency_Text;
          objPrescriptionLineItemVM.oDoseCalcData.DoseCalVal3 =
            '= ' + objPrescriptionLineItemVM.oDoseCalcData.Freq;
          objPrescriptionLineItemVM.oDoseCalcData.DoseCalTxt4 =
            DoseCalculator.lblCalcAmtPerDose_Text;
          objPrescriptionLineItemVM.oDoseCalcData.DoseCalVal4 =
            '= ' +
            objPrescriptionLineItemVM.oDoseCalcData.TotDailyDose +
            '/' +
            sLowEvent +
            '\n= ' +
            objPrescriptionLineItemVM.oDoseCalcData.Caldose;
          objPrescriptionLineItemVM.oDoseCalcData.DoseCalTxt5 =
            DoseCalculator.lblOrderedAmtPerDose_Text;
          objPrescriptionLineItemVM.oDoseCalcData.DoseCalVal5 =
            '= ' + objPrescriptionLineItemVM.oDoseCalcData.OrdAmtDse;
          if (
            !String.IsNullOrEmpty(
              objPrescriptionLineItemVM.oDoseCalcData.Reasonforoverride
            )
          ) {
            objPrescriptionLineItemVM.oDoseCalcData.DoseCalVal5 +=
              '\n (' +
              objPrescriptionLineItemVM.oDoseCalcData.Reasonforoverride +
              ')';
          }
        } else {
          if (
            !String.IsNullOrEmpty(
              objPrescriptionLineItemVM.oDoseCalcData.Reqdose
            )
          ) {
            objPrescriptionLineItemVM.oDoseCalcData.DoseCalTxt4 =
              DoseCalculator.lblCalcAmtPerDose_Text;
            objPrescriptionLineItemVM.oDoseCalcData.DoseCalVal4 =
              '= ' +
              sReqDoseForDetails +
              ' X ' +
              scalVal +
              '\n= ' +
              objPrescriptionLineItemVM.oDoseCalcData.Caldose;
          }
          objPrescriptionLineItemVM.oDoseCalcData.DoseCalTxt5 =
            DoseCalculator.lblOrderedAmtPerDose_Text;
          objPrescriptionLineItemVM.oDoseCalcData.DoseCalVal5 =
            '= ' + objPrescriptionLineItemVM.oDoseCalcData.OrdAmtDse;
          if (
            !String.IsNullOrEmpty(
              objPrescriptionLineItemVM.oDoseCalcData.Reasonforoverride
            )
          ) {
            objPrescriptionLineItemVM.oDoseCalcData.DoseCalVal5 +=
              '\n (' +
              objPrescriptionLineItemVM.oDoseCalcData.Reasonforoverride +
              ')';
          }
        }
      }
    }
    return objPrescriptionLineItemVM;
  }
  public static ConstructStepAdminTimesDoseDet(
    oDoseRegime: IPPMAManagePrescSer.DoseRegime
  ): string {
    let SVAdminDoseDetails: string = String.Empty;
    let FrequencyName: string = String.Empty;
    if (oDoseRegime != null) {
      let oScheduleDoseDet: StringBuilder = new StringBuilder();
      if (
        oDoseRegime.FrequencyDetails != null &&
        oDoseRegime.FrequencyDetails.Frequency != null &&
        oDoseRegime.FrequencyDetails.Frequency.OID > 0
      ) {
        let IsDayView: boolean = false;
        if (
          oDoseRegime instanceof IPPMAManagePrescSer.IPPDoseRegime &&
          ObjectHelper.CreateType<IPPMAManagePrescSer.IPPDoseRegime>(
            oDoseRegime,
            IPPMAManagePrescSer.IPPDoseRegime
          ) != null
        ) {
          IsDayView =
            ObjectHelper.CreateType<IPPMAManagePrescSer.IPPDoseRegime>(
              oDoseRegime,
              IPPMAManagePrescSer.IPPDoseRegime
            ).IsDaywise.Equals('1')
              ? true
              : false;
          if (IsDayView) {
            oScheduleDoseDet.Append(CConstants.Changingdose);
          }
        }
        FrequencyName = oDoseRegime.FrequencyDetails.Frequency.Name;
        if (
          !IsDayView &&
          oDoseRegime.FrequencyDetails.ScheduledTimes != null &&
          oDoseRegime.FrequencyDetails.ScheduledTimes.Count > 0
        ) {
          let objScheduleDet: Dictionary<string, number> = new Dictionary<
            string,
            number
          >();
          let SLotDTTM: DateTime = DateTime.MinValue;
          let sDoseUOM: string = String.Empty;
          if (
            oDoseRegime.DoseUOM != null &&
            !String.IsNullOrEmpty(oDoseRegime.DoseUOM.UOMName)
          ) {
            sDoseUOM = oDoseRegime.DoseUOM.UOMName;
          }
          oDoseRegime.FrequencyDetails.ScheduledTimes.forEach(
            (oScheduledetails) => {
              if (
                oScheduledetails instanceof
                  IPPManagePrescSer.IPPScheduledetails &&
                ObjectHelper.CreateType<IPPManagePrescSer.IPPScheduledetails>(
                  oScheduledetails,
                  IPPManagePrescSer.IPPScheduledetails
                ) != null
              ) {
                let tmpIPPScheduledetails: IPPManagePrescSer.IPPScheduledetails =
                  ObjectHelper.CreateType<IPPManagePrescSer.IPPScheduledetails>(
                    oScheduledetails,
                    IPPManagePrescSer.IPPScheduledetails
                  );
                if (
                  !objScheduleDet.ContainsKey(
                    tmpIPPScheduledetails.ScheduledTime
                  ) &&
                  tmpIPPScheduledetails.Dose > 0
                ) {
                  if (oScheduleDoseDet != null && oScheduleDoseDet.Length > 0) {
                    oScheduleDoseDet.Append(', ');
                  }
                  objScheduleDet.Add(
                    tmpIPPScheduledetails.ScheduledTime,
                    tmpIPPScheduledetails.Dose
                  );
                  oScheduleDoseDet.Append(
                    tmpIPPScheduledetails.Dose.ToString()
                  );
                  oScheduleDoseDet.Append(' ');
                  oScheduleDoseDet.Append(sDoseUOM);
                  oScheduleDoseDet.Append(' at ');
                  oScheduleDoseDet.Append(tmpIPPScheduledetails.ScheduledTime);
                } else if (
                  !objScheduleDet.ContainsKey(
                    tmpIPPScheduledetails.ScheduledTime
                  ) &&
                  oDoseRegime.LowerDose > 0
                ) {
                  if (oScheduleDoseDet != null && oScheduleDoseDet.Length > 0) {
                    oScheduleDoseDet.Append(', ');
                  }
                  objScheduleDet.Add(
                    tmpIPPScheduledetails.ScheduledTime,
                    oDoseRegime.LowerDose
                  );
                  oScheduleDoseDet.Append(oDoseRegime.LowerDose.ToString());
                  if (oDoseRegime.UpperDose > 0) {
                    oScheduleDoseDet.Append(' - ');
                    oScheduleDoseDet.Append(oDoseRegime.UpperDose.ToString());
                  }
                  oScheduleDoseDet.Append(' ');
                  oScheduleDoseDet.Append(sDoseUOM);
                  oScheduleDoseDet.Append(' at ');
                  oScheduleDoseDet.Append(tmpIPPScheduledetails.ScheduledTime);
                }
              }
            }
          );
        }
        if (oScheduleDoseDet != null && oScheduleDoseDet.Length > 0) {
          SVAdminDoseDetails =
            FrequencyName + ', ' + oScheduleDoseDet.ToString();
        }
      }
    }
    return SVAdminDoseDetails;
  }
  public static Frc001Childs: string = null;
  public static Frc002Childs: string = null;
  public static Frc003Childs: string = null;
  public static Frq88Childs: string = null;
  public static SetDUAvaliable(): void {
    let IsIPPMA_TTO: string = String.Empty;
    if (
      ContextManager.Instance['IPPMADU_P2'] != null &&
      !String.IsNullOrEmpty(ContextManager.Instance['IPPMADU_P2'].ToString())
    ) {
      IsIPPMA_TTO = ContextManager.Instance['IPPMADU_P2'].ToString();
      if (
        !String.IsNullOrEmpty(IsIPPMA_TTO) &&
        String.Equals(
          IsIPPMA_TTO,
          'True',
          StringComparison.CurrentCultureIgnoreCase
        )
      ) {
        PatientContext.IPPMADU_P2 = true;
      }
    } else if (
      ContextManager.Instance['TTOPBB_P2'] != null &&
      !String.IsNullOrEmpty(ContextManager.Instance['TTOPBB_P2'].ToString())
    ) {
      IsIPPMA_TTO = ContextManager.Instance['TTOPBB_P2'].ToString();
      if (
        !String.IsNullOrEmpty(IsIPPMA_TTO) &&
        String.Equals(
          IsIPPMA_TTO,
          'True',
          StringComparison.CurrentCultureIgnoreCase
        )
      ) {
        PatientContext.TTOPBBDU_P2 = true;
      }
    }
  }
  public static GetPatientAgeGenderDetails(): void {
    if (ContextManager.Instance['Sgestationreq'].ToString() == '-1') {
      let sPatientAge: number = 0;
      let Sgestationreq: string = String.Empty;
      if (!String.IsNullOrEmpty(PatientContext.DOB)) {
        sPatientAge = Common.DateDiffInDays(
          Convert.ToDateTime(PatientContext.DOB)
        );
        if (sPatientAge > 0 && sPatientAge <= 90) {
          Sgestationreq = '1';
        } else {
          Sgestationreq = '0';
        }
      }
      ContextManager.Instance['Sgestationreq'] = Sgestationreq;
    }
  }
  public static DateDiffInDays(fromDate: DateTime): number {
    let toDate: DateTime;
    toDate = DateTime.Now;
    return toDate.Subtract(fromDate).Days;
  }
  public static GetMCIToolTip(MCIToolTip: string): string {
    let sMCIToolTip: string = String.Empty;
    if (!String.IsNullOrEmpty(MCIToolTip)) {
      let sTooltip: string[] = null;
      let nLength: number;
      let sTip: StringBuilder = new StringBuilder();
      sTooltip = MCIToolTip.Split('^');
      if (sTooltip != null) {
        nLength = sTooltip.length;
        for (let i: number = 0; i < nLength; i++) {
          sTip.Append(sTooltip[i]);
          sTip.Append(Environment.NewLine);
        }
        sMCIToolTip = Convert.ToString(sTip);
        sMCIToolTip = sMCIToolTip.TrimEnd('\n');
        sMCIToolTip = sMCIToolTip.TrimEnd('\r');
      }
    }
    return sMCIToolTip;
  }

  public static GetHIMSubsetIDORDataItemOID(
    oReturn: ScriptObject,
    out1: (oSubsetDetailst: List<SubsetDetails>) => void,
    out2: (oLaunchfrmIDs: string) => void,
    out3: (oDataItemDetailst: List<DataItemDetails>) => void
  ): void {
    let oSubsetDetailst: List<SubsetDetails>;
    let oLaunchfrmIDs: string;
    let oDataItemDetailst: List<DataItemDetails>;

    oSubsetDetailst = new List<SubsetDetails>();
    oDataItemDetailst = new List<DataItemDetails>();
    oLaunchfrmIDs = String.Empty;
    let HIMSubsets: string = String.Empty;
    let AttributeOID: string = String.Empty;
    let DataitemOID: string = String.Empty;
    let sbLaunchfrm: StringBuilder;
    let oSubsets: string[];
    let oSubsetDetail: SubsetDetails;
    if (oReturn != null) {
      if (oReturn.GetProperty('SubsetIDs') != null) {
        HIMSubsets = oReturn.GetProperty('SubsetIDs').ToString();
      }
      if (oReturn.GetProperty('AttributeOID') != null) {
        AttributeOID = oReturn.GetProperty('AttributeOID').ToString();
      }
      if (oReturn.GetProperty('DataItemOID') != null) {
        DataitemOID = oReturn.GetProperty('DataItemOID').ToString();
      }
    }
    if (!String.IsNullOrEmpty(HIMSubsets)) {
      oSubsets = HIMSubsets.Split('#');
      let nLen: number = oSubsets.length;
      sbLaunchfrm = new StringBuilder();
      for (let i: number = 0; i < nLen; i++) {
        let SubsetID: string[];
        oSubsetDetail = new SubsetDetails();
        if (!String.IsNullOrEmpty(oSubsets[i])) {
          SubsetID = oSubsets[i].Split(',');
          if (SubsetID != null && SubsetID.length > 0) {
            oSubsetDetail.SubsetID = SubsetID[1].ToString();
            sbLaunchfrm.Append(SubsetID[1].ToString());
            Array.Clear(SubsetID, 0, SubsetID.length);
            if (i != nLen - 1) {
              sbLaunchfrm.Append(',');
            }
            oSubsetDetailst.Add(oSubsetDetail);
          }
        }
      }
      oLaunchfrmIDs = sbLaunchfrm.ToString();
    } else {
      if (!String.IsNullOrEmpty(AttributeOID)) {
        oSubsetDetail = new SubsetDetails();
        oSubsetDetail.SubsetID = AttributeOID;
        oSubsetDetailst.Add(oSubsetDetail);
      }
    }
    if (!String.IsNullOrEmpty(DataitemOID)) {
      let oDataItemDetail: DataItemDetails = new DataItemDetails();
      oDataItemDetail.DataitemOID = Convert.ToInt64(DataitemOID);
      oDataItemDetailst.Add(oDataItemDetail);
    }

    out1(oSubsetDetailst);
    out2(oLaunchfrmIDs);
    out3(oDataItemDetailst);
  }
  public static ConvertDurationToMinutes(
    DurationUOM: string,
    Duration: number
  ): number {
    let _TmpDuration: number = 0;
    switch (DurationUOM) {
      case ConstDurationUOM.Days:
        _TmpDuration = TimeSpan.FromDays(Duration).TotalMinutes;
        break;
      case ConstDurationUOM.Weeks:
        _TmpDuration = TimeSpan.FromDays(Duration * 7).TotalMinutes;
        break;
      case ConstDurationUOM.Months:
        _TmpDuration = TimeSpan.FromDays(Duration * 28).TotalMinutes;
        break;
      case ConstDurationUOM.Years:
        _TmpDuration = TimeSpan.FromDays(Duration * 365).TotalMinutes;
        break;
      case ConstDurationUOM.Hours:
        _TmpDuration = TimeSpan.FromHours(Duration).TotalMinutes;
        break;
      case ConstDurationUOM.Minutes:
        _TmpDuration = Duration;
        break;
    }
    return _TmpDuration;
  }
  public static IsDurationIsOneDayOrLesser(
    StartDate: DateTime,
    EndDate: DateTime,
    DurationUOM: string,
    Duration: number
  ): boolean {
    let bResult: boolean = false;
    if (Duration > 0 && !String.IsNullOrEmpty(DurationUOM)) {
      if (
        String.Equals(
          DurationUOM,
          ConstDurationUOM.Doses,
          StringComparison.InvariantCultureIgnoreCase
        )
      ) {
        if (DateTime.NotEquals(StartDate, DateTime.MinValue) && DateTime.NotEquals(EndDate, DateTime.MinValue)) {
          bResult =
            EndDate.Subtract(StartDate).TotalMinutes <=
            CConstants.NO_OF_MINUTESPER_DAY;
        }
      } else {
        let _DurationInMintues: number = Common.ConvertDurationToMinutes(
          DurationUOM,
          Duration
        );
        bResult = _DurationInMintues <= CConstants.NO_OF_MINUTESPER_DAY;
      }
    }
    return bResult;
  }
  public static CheckClinicalEncounterType(EncounterTypeCode: string): boolean {
    if (
      String.Equals(
        EncounterTypeCode,
        CConstants.InpatientEncounter,
        StringComparison.InvariantCultureIgnoreCase
      )
    ) {
      return true;
    } else if (
      String.Equals(
        EncounterTypeCode,
        CConstants.OutPatientEncounter,
        StringComparison.InvariantCultureIgnoreCase
      )
    ) {
      return true;
    } else if (
      String.Equals(
        EncounterTypeCode,
        CConstants.EmergencyEncounter,
        StringComparison.InvariantCultureIgnoreCase
      )
    ) {
      return true;
    }
    return false;
  }
  public static UpdateOldValues(
    prescriptionItem: PrescriptionItemVM,
    oResResolve: IPPMAManagePrescSer.CResMsgGetIPPPrescriptionDetails
  ): void {
    if (
      prescriptionItem != null &&
      prescriptionItem.PrescriptionItemOID > 0 &&
      prescriptionItem.DbValues == null
    ) {
      let dct: Dictionary<string, string> = new Dictionary<string, string>();
      if (
        oResResolve != null &&
        oResResolve.oPrescriptionItemDetails != null &&
        oResResolve.oPrescriptionItemDetails.Count > 0
      ) {
        let isInfusion: boolean =
          prescriptionItem.formViewerDetails != null &&
          prescriptionItem.formViewerDetails.BasicDetails != null &&
          prescriptionItem.formViewerDetails.BasicDetails.Route != null &&
          prescriptionItem.formViewerDetails.BasicDetails.Route.Tag != null &&
          prescriptionItem.formViewerDetails.BasicDetails.Route.Tag.ToString() ==
            '1';
        let isGas: boolean =
          prescriptionItem.formViewerDetails != null &&
          prescriptionItem.formViewerDetails.BasicDetails != null &&
          prescriptionItem.formViewerDetails.BasicDetails.itemSubType != null &&
          prescriptionItem.formViewerDetails.BasicDetails.itemSubType.Equals(
            CConstants.SUBTYPE_GAS,
            StringComparison.OrdinalIgnoreCase
          );
        let isBloodProduct: boolean =
          prescriptionItem.formViewerDetails != null &&
          prescriptionItem.formViewerDetails.BasicDetails != null &&
          prescriptionItem.formViewerDetails.BasicDetails.itemSubType != null &&
          prescriptionItem.formViewerDetails.BasicDetails.itemSubType.Equals(
            CConstants.SUBTYPE_BLOOD,
            StringComparison.OrdinalIgnoreCase
          );
        {
          let oldDuration: string = String.Empty,
            oldDurationUom = String.Empty;
          if (
            oResResolve.oPrescriptionItemDetails[0].BasicProperties != null &&
            oResResolve.oPrescriptionItemDetails[0].BasicProperties.Duration !=
              null
          ) {
            if (
              oResResolve.oPrescriptionItemDetails[0].BasicProperties.Duration
                .Value != 0
            ) {
              oldDuration =
                oResResolve.oPrescriptionItemDetails[0].BasicProperties.Duration.Value.ToString();
              oldDurationUom =
                oResResolve.oPrescriptionItemDetails[0].BasicProperties.Duration
                  .UOMName != null
                  ? oResResolve.oPrescriptionItemDetails[0].BasicProperties
                      .Duration.UOMName
                  : String.Empty;
              dct[FieldNames.DurationUom] = oldDuration + ' ' + oldDurationUom;
            }
          }
        }
        {
          let oldQuantity: string = String.Empty,
            oldQuantityUom = String.Empty;
          if (oResResolve.oPrescriptionItemDetails[0].BasicProperties != null) {
            if (
              oResResolve.oPrescriptionItemDetails[0].BasicProperties
                .Quantity != null
            ) {
              if (
                !String.IsNullOrEmpty(
                  oResResolve.oPrescriptionItemDetails[0].BasicProperties
                    .Quantity.QuantityValue
                )
              )
                oldQuantity =
                  oResResolve.oPrescriptionItemDetails[0].BasicProperties
                    .Quantity.QuantityValue;
              if (
                !String.IsNullOrEmpty(
                  oResResolve.oPrescriptionItemDetails[0].BasicProperties
                    .Quantity.QuantityUOMName
                )
              )
                oldQuantityUom =
                  oResResolve.oPrescriptionItemDetails[0].BasicProperties
                    .Quantity.QuantityUOMName != null
                    ? oResResolve.oPrescriptionItemDetails[0].BasicProperties
                        .Quantity.QuantityUOMName
                    : String.Empty;
              if (
                !String.IsNullOrEmpty(oldQuantity) ||
                !String.IsNullOrEmpty(oldQuantityUom)
              )
                dct[FieldNames.QuantityUom] =
                  oldQuantity + ' ' + oldQuantityUom;
            }
          }
        }
        {
          let oldStopDatetime: string = String.Empty;
          if (
            DateTime.NotEquals(oResResolve.oPrescriptionItemDetails[0].EndDTTM, DateTime.MinValue)
          ) {
            oldStopDatetime =
              oResResolve.oPrescriptionItemDetails[0].EndDTTM.ToUserDateTimeString(
                CConstants.DateHMFormat
              );
            dct[FieldNames.StopDatetime] = oldStopDatetime;
          }
        }
        {
          let oldOnAdmission: string = 'No';
          if (
            oResResolve.oPrescriptionItemDetails[0].BasicProperties != null &&
            oResResolve.oPrescriptionItemDetails[0].BasicProperties
              .ExistsOnAdmission != '\0'
          ) {
            oldOnAdmission =
              oResResolve.oPrescriptionItemDetails[0].BasicProperties
                .ExistsOnAdmission == '1'
                ? 'Yes'
                : 'No';
            dct[FieldNames.OnAdmission] = oldOnAdmission;
          }
        }
        {
          let oldProblemIndication: string = String.Empty;
          if (
            oResResolve.oPrescriptionItemDetails[0].BasicProperties != null &&
            oResResolve.oPrescriptionItemDetails[0].BasicProperties
              .PatientProblem != null &&
            oResResolve.oPrescriptionItemDetails[0].BasicProperties
              .PatientProblem.Count > 0 &&
            !String.IsNullOrEmpty(
              oResResolve.oPrescriptionItemDetails[0].BasicProperties
                .PatientProblem[0].Code
            )
          ) {
            oldProblemIndication = String.Join(
              ', ',
              oResResolve.oPrescriptionItemDetails[0].BasicProperties.PatientProblem[0].Code.Split(
                '~'
              )
                .Select((x) =>
                  x
                    .Replace('$PROBLEMSFS', '')
                    .Replace('$INDICATION', '')
                    .Replace('$SNOMED CT$ $', '')
                    .Replace('$SNOMED CT$', '')
                    .Trim()
                )
                .ToArray()
            );
            dct[FieldNames.ProblemIndication] = oldProblemIndication;
          }
        }
        {
          let oldAdditionalComments: string = String.Empty;
          if (
            oResResolve.oPrescriptionItemDetails[0].AdditionalProperties !=
              null &&
            !String.IsNullOrEmpty(
              oResResolve.oPrescriptionItemDetails[0].AdditionalProperties
                .AdditionalComments
            )
          ) {
            oldAdditionalComments =
              oResResolve.oPrescriptionItemDetails[0].AdditionalProperties
                .AdditionalComments;
            dct[FieldNames.AdditionalComment] = oldAdditionalComments;
          }
        }
        {
          let oldInstructions: string = String.Empty;
          if (
            oResResolve.oPrescriptionItemDetails[0].BasicProperties != null &&
            !String.IsNullOrEmpty(
              oResResolve.oPrescriptionItemDetails[0].BasicProperties
                .OtherAdminInstruction
            )
          ) {
            oldInstructions =
              oResResolve.oPrescriptionItemDetails[0].BasicProperties
                .OtherAdminInstruction;
          } else if (
            oResResolve.oPrescriptionItemDetails[0].BasicProperties != null &&
            oResResolve.oPrescriptionItemDetails[0].BasicProperties
              .AdminInstruction != null &&
            oResResolve.oPrescriptionItemDetails[0].BasicProperties
              .AdminInstruction.OID > 0
          ) {
            oldInstructions =
              oResResolve.oPrescriptionItemDetails[0].BasicProperties
                .AdminInstruction.Name != null
                ? oResResolve.oPrescriptionItemDetails[0].BasicProperties
                    .AdminInstruction.Name
                : String.Empty;
          }
          dct[FieldNames.AdministrationInstruction] = oldInstructions;
        }
        if (
          ((isInfusion || isBloodProduct) &&
            prescriptionItem.formViewerDetails != null &&
            prescriptionItem.formViewerDetails.BasicDetails != null &&
            prescriptionItem.formViewerDetails.BasicDetails.InfusionType !=
              null &&
            (prescriptionItem.formViewerDetails.BasicDetails.InfusionType
              .Value == InfusionTypesCode.CONTINUOUS ||
              prescriptionItem.formViewerDetails.BasicDetails.InfusionType
                .Value == InfusionTypesCode.INTERMITTENT)) ||
          (prescriptionItem.formViewerDetails.BasicDetails.itemSubType !=
            null &&
            prescriptionItem.formViewerDetails.BasicDetails.itemSubType.Equals(
              CConstants.SUBTYPE_GAS,
              StringComparison.OrdinalIgnoreCase
            ))
        ) {
          let oldRate: string = String.Empty,
            oldUpperRate = String.Empty,
            oldRateUom = String.Empty,
            oldRateUomDenom = String.Empty;
          if (
            oResResolve.oPrescriptionItemDetails[0].FormViewParameters !=
              null &&
            oResResolve.oPrescriptionItemDetails[0].FormViewParameters
              .IntravenousInfusionData != null
          ) {
            if (
              !String.IsNullOrEmpty(
                oResResolve.oPrescriptionItemDetails[0].FormViewParameters
                  .IntravenousInfusionData.Rate
              )
            )
              oldRate =
                oResResolve.oPrescriptionItemDetails[0].FormViewParameters
                  .IntravenousInfusionData.Rate;
            if (
              !String.IsNullOrEmpty(
                oResResolve.oPrescriptionItemDetails[0].FormViewParameters
                  .IntravenousInfusionData.UpperRate
              )
            )
              oldUpperRate =
                oResResolve.oPrescriptionItemDetails[0].FormViewParameters
                  .IntravenousInfusionData.UpperRate;
            if (
              oResResolve.oPrescriptionItemDetails[0].FormViewParameters
                .IntravenousInfusionData.RateUOM != null &&
              !String.IsNullOrEmpty(
                oResResolve.oPrescriptionItemDetails[0].FormViewParameters
                  .IntravenousInfusionData.RateUOM.UOMName
              )
            )
              oldRateUom =
                oResResolve.oPrescriptionItemDetails[0].FormViewParameters
                  .IntravenousInfusionData.RateUOM.UOMName;
            if (
              oResResolve.oPrescriptionItemDetails[0].FormViewParameters
                .IntravenousInfusionData.RateDenominatorUOM != null &&
              !String.IsNullOrEmpty(
                oResResolve.oPrescriptionItemDetails[0].FormViewParameters
                  .IntravenousInfusionData.RateDenominatorUOM.UOMName
              )
            )
              oldRateUomDenom =
                oResResolve.oPrescriptionItemDetails[0].FormViewParameters
                  .IntravenousInfusionData.RateDenominatorUOM.UOMName;
          }
          if (
            !String.IsNullOrEmpty(oldRate) ||
            !String.IsNullOrEmpty(oldRateUom) ||
            !String.IsNullOrEmpty(oldRateUomDenom)
          ) {
            dct[FieldNames.FlowRate] =
              oldRate +
              (!String.IsNullOrEmpty(oldUpperRate)
                ? '-' + oldUpperRate
                : String.Empty) +
              ' ' +
              oldRateUom +
              '/' +
              oldRateUomDenom;
          }
        }
        if (
          (isInfusion || isBloodProduct) &&
          prescriptionItem.formViewerDetails != null &&
          prescriptionItem.formViewerDetails.BasicDetails != null &&
          prescriptionItem.formViewerDetails.BasicDetails.InfusionType !=
            null &&
          (prescriptionItem.formViewerDetails.BasicDetails.InfusionType.Value ==
            InfusionTypesCode.CONTINUOUS ||
            prescriptionItem.formViewerDetails.BasicDetails.InfusionType
              .Value == InfusionTypesCode.INTERMITTENT ||
            prescriptionItem.formViewerDetails.BasicDetails.InfusionType
              .Value == InfusionTypesCode.PCA)
        ) {
          let oldPeriod: string = String.Empty,
            oldPeriodUom = String.Empty;
          if (
            oResResolve.oPrescriptionItemDetails[0].FormViewParameters !=
              null &&
            oResResolve.oPrescriptionItemDetails[0].FormViewParameters
              .IntravenousInfusionData != null
          ) {
            if (
              !String.IsNullOrEmpty(
                oResResolve.oPrescriptionItemDetails[0].FormViewParameters
                  .IntravenousInfusionData.InfusionPeriod
              )
            )
              oldPeriod =
                oResResolve.oPrescriptionItemDetails[0].FormViewParameters
                  .IntravenousInfusionData.InfusionPeriod;
            if (
              oResResolve.oPrescriptionItemDetails[0].FormViewParameters
                .IntravenousInfusionData.InfusionPeriodUOM != null &&
              !String.IsNullOrEmpty(
                oResResolve.oPrescriptionItemDetails[0].FormViewParameters
                  .IntravenousInfusionData.InfusionPeriodUOM.UOMName
              )
            )
              oldPeriodUom =
                oResResolve.oPrescriptionItemDetails[0].FormViewParameters
                  .IntravenousInfusionData.InfusionPeriodUOM.UOMName;
          }
          if (
            !String.IsNullOrEmpty(oldPeriod) ||
            !String.IsNullOrEmpty(oldPeriodUom)
          )
            dct[FieldNames.InfusionPeriod] = oldPeriod + ' ' + oldPeriodUom;
        }
        if (
          (isInfusion || isBloodProduct) &&
          prescriptionItem.formViewerDetails != null &&
          prescriptionItem.formViewerDetails.BasicDetails != null &&
          prescriptionItem.formViewerDetails.BasicDetails.InfusionType !=
            null &&
          prescriptionItem.formViewerDetails.BasicDetails.InfusionType.Value ==
            InfusionTypesCode.PCA
        ) {
          let oldMaxDose: string = String.Empty;
          if (
            oResResolve.oPrescriptionItemDetails[0].FormViewParameters !=
              null &&
            oResResolve.oPrescriptionItemDetails[0].FormViewParameters
              .IntravenousInfusionData != null &&
            !String.IsNullOrEmpty(
              oResResolve.oPrescriptionItemDetails[0].FormViewParameters
                .IntravenousInfusionData.MaxDose
            )
          ) {
            oldMaxDose =
              oResResolve.oPrescriptionItemDetails[0].FormViewParameters
                .IntravenousInfusionData.MaxDose;
            dct[FieldNames.MaxDose] = oldMaxDose;
          }
        }
        if (
          prescriptionItem.formViewerDetails != null &&
          prescriptionItem.formViewerDetails.BasicDetails != null &&
          prescriptionItem.formViewerDetails.BasicDetails.itemSubType != null &&
          prescriptionItem.formViewerDetails.BasicDetails.itemSubType.Equals(
            CConstants.SUBTYPE_GAS,
            StringComparison.OrdinalIgnoreCase
          )
        ) {
          let oldDeliveryDevice: string = String.Empty;
          if (
            oResResolve.oPrescriptionItemDetails[0].FormViewParameters !=
              null &&
            oResResolve.oPrescriptionItemDetails[0].FormViewParameters
              .IntravenousInfusionData != null &&
            !String.IsNullOrEmpty(
              oResResolve.oPrescriptionItemDetails[0].FormViewParameters
                .IntravenousInfusionData.DeliveryDevice
            )
          ) {
            oldDeliveryDevice =
              oResResolve.oPrescriptionItemDetails[0].FormViewParameters
                .IntravenousInfusionData.DeliveryDevice;
            dct[FieldNames.DeliveryDevice] = oldDeliveryDevice;
          }
        }
        if (
          prescriptionItem.formViewerDetails != null &&
          prescriptionItem.formViewerDetails.BasicDetails != null &&
          prescriptionItem.formViewerDetails.BasicDetails.itemSubType != null &&
          prescriptionItem.formViewerDetails.BasicDetails.itemSubType.Equals(
            CConstants.SUBTYPE_GAS,
            StringComparison.OrdinalIgnoreCase
          )
        ) {
          let oldSaturationLow: string = String.Empty,
            oldSaturationUpper = String.Empty;
          if (
            oResResolve.oPrescriptionItemDetails[0].FormViewParameters !=
              null &&
            oResResolve.oPrescriptionItemDetails[0].FormViewParameters
              .IntravenousInfusionData != null
          ) {
            if (
              oResResolve.oPrescriptionItemDetails[0].FormViewParameters
                .IntravenousInfusionData.TargetSaturationLower != 0 ||
              oResResolve.oPrescriptionItemDetails[0].FormViewParameters
                .IntravenousInfusionData.TargetSaturationUpper != 0
            ) {
              oldSaturationLow =
                oResResolve.oPrescriptionItemDetails[0].FormViewParameters.IntravenousInfusionData.TargetSaturationLower.ToString();
              oldSaturationUpper =
                oResResolve.oPrescriptionItemDetails[0].FormViewParameters.IntravenousInfusionData.TargetSaturationUpper.ToString();
              dct[FieldNames.TargetSaturationRange] =
                oldSaturationLow + '-' + oldSaturationUpper + '%';
            }
          }
        }
      }
      prescriptionItem.DbValues = dct;
    }
  }
  public static GetOsValues(
    prescriptionItem: PrescriptionItemVM
  ): Dictionary<string, string> {
    let dct: Dictionary<string, string> = new Dictionary<string, string>();
    if (prescriptionItem.formViewerDetails.BasicDetails.InfusionType != null) {
      dct[FieldNames.OsInfusionType] =
        prescriptionItem.formViewerDetails.BasicDetails.InfusionType.Value;
    }
    let isIntermittent: boolean =
      prescriptionItem.FormViewerDetails != null &&
      prescriptionItem.FormViewerDetails.BasicDetails != null &&
      prescriptionItem.FormViewerDetails.BasicDetails.InfusionType != null &&
      String.Compare(
        prescriptionItem.FormViewerDetails.BasicDetails.InfusionType.Value,
        InfusionTypesCode.INTERMITTENT
      ) == 0;
    let havingInfusionPeriod: boolean =
      prescriptionItem.FormViewerDetails != null &&
      prescriptionItem.FormViewerDetails.BasicDetails != null &&
      prescriptionItem.FormViewerDetails.BasicDetails.InfusionDetails != null &&
      !String.IsNullOrEmpty(
        prescriptionItem.FormViewerDetails.BasicDetails.InfusionDetails
          .InfusionPeriod
      );
    let havingDuration: boolean =
      prescriptionItem.FormViewerDetails != null &&
      prescriptionItem.FormViewerDetails.BasicDetails != null &&
      (!String.IsNullOrEmpty(
        prescriptionItem.FormViewerDetails.BasicDetails.Duration
      ) ||
        (prescriptionItem.FormViewerDetails.BasicDetails.DoseType != null &&
          String.Equals(
            prescriptionItem.FormViewerDetails.BasicDetails.DoseType.Value,
            DoseTypeCode.STEPPEDVARIABLE
          ) &&
          prescriptionItem.FormViewerDetails.BasicDetails.MultiDoseDetails !=
            null &&
          prescriptionItem.FormViewerDetails.BasicDetails.MultiDoseDetails
            .Count > 0 &&
          prescriptionItem.FormViewerDetails.BasicDetails.MultiDoseDetails[
            prescriptionItem.FormViewerDetails.BasicDetails.MultiDoseDetails
              .Count - 1
          ].Duration != 0));
    if (
      PatientContext.IsINFUSIONON &&
      prescriptionItem.FormViewerDetails.BasicDetails != null &&
      prescriptionItem.FormViewerDetails.BasicDetails.Route != null &&
      prescriptionItem.FormViewerDetails.BasicDetails.Route.Tag != null &&
      (String.Equals(
        prescriptionItem.FormViewerDetails.BasicDetails.Route.Tag.ToString(),
        '1',
        StringComparison.OrdinalIgnoreCase
      ) ||
        (!String.IsNullOrEmpty(
          prescriptionItem.FormViewerDetails.BasicDetails.Route.Tag.ToString()
        ) &&
          !prescriptionItem.FormViewerDetails.BasicDetails.Route.Tag.ToString().Contains(
            '0'
          ))) &&
      (!isIntermittent ||
        !prescriptionItem.FormViewerDetails.BasicDetails.InfusionDetails
          .ChckSingleActionMedChart)
    ) {
      dct[FieldNames.OsIsInfusion] = '1';
      dct[FieldNames.OsDurationInfusionPeriod] = (
        isIntermittent ? havingDuration : havingInfusionPeriod
      )
        ? '1'
        : '0';
    } else {
      dct[FieldNames.OsIsInfusion] = '0';
      dct[FieldNames.OsDurationInfusionPeriod] = havingDuration ? '1' : '0';
    }
    return dct;
  }
  public static UpdateOldOsValues(prescriptionItem: PrescriptionItemVM): void {
    if (prescriptionItem != null && prescriptionItem.DbOsValues == null) {
      prescriptionItem.DbOsValues = Common.GetOsValues(prescriptionItem);
    }
  }
  public static UpdateChanges(prescriptionItem: PrescriptionItemVM): void {
    if (
      prescriptionItem != null &&
      prescriptionItem.PrescriptionItemOID > 0 &&
      prescriptionItem.DbValues != null &&
      prescriptionItem.PrescriptionItemStatus != 'MEDStatus2' &&
      prescriptionItem.PrescriptionItemStatus != 'MEDStatus3' &&
      prescriptionItem.PrescriptionItemStatus != 'MEDStatus14'
    ) {
      let oldValues: Dictionary<string, string> = prescriptionItem.DbValues;
      let _l: number = 0;
      let liChanges: List<IPPMAManagePrescSer.PresItemAuditHistory> =
        new List<IPPMAManagePrescSer.PresItemAuditHistory>();
      {
        let isInfusion: boolean =
          prescriptionItem.formViewerDetails != null &&
          prescriptionItem.formViewerDetails.BasicDetails != null &&
          prescriptionItem.formViewerDetails.BasicDetails.Route != null &&
          prescriptionItem.formViewerDetails.BasicDetails.Route.Tag != null &&
          prescriptionItem.formViewerDetails.BasicDetails.Route.Tag.ToString() ==
            '1';
        let isGas: boolean =
          prescriptionItem.formViewerDetails != null &&
          prescriptionItem.formViewerDetails.BasicDetails != null &&
          prescriptionItem.formViewerDetails.BasicDetails.itemSubType != null &&
          prescriptionItem.formViewerDetails.BasicDetails.itemSubType.Equals(
            CConstants.SUBTYPE_GAS,
            StringComparison.OrdinalIgnoreCase
          );
        let isBloodProduct: boolean =
          prescriptionItem.formViewerDetails != null &&
          prescriptionItem.formViewerDetails.BasicDetails != null &&
          prescriptionItem.formViewerDetails.BasicDetails.itemSubType != null &&
          prescriptionItem.formViewerDetails.BasicDetails.itemSubType.Equals(
            CConstants.SUBTYPE_BLOOD,
            StringComparison.OrdinalIgnoreCase
          );
        {
          let oldValue: string = oldValues.ContainsKey(FieldNames.DurationUom)
            ? oldValues[FieldNames.DurationUom] ?? String.Empty
            : String.Empty;
          let newDuration: string = String.Empty,
            newDurationUom = String.Empty;
          let newValue: string = String.Empty;
          if (
            prescriptionItem.formViewerDetails != null &&
            prescriptionItem.formViewerDetails.BasicDetails != null
          ) {
            if (
              !String.IsNullOrEmpty(
                prescriptionItem.formViewerDetails.BasicDetails.Duration
              ) &&
              Number.TryParse(
                prescriptionItem.formViewerDetails.BasicDetails.Duration,
                (o) => {
                  _l = o;
                }
              ) &&
              _l > 0
            )
              newDuration = _l.ToString();
            if (
              prescriptionItem.formViewerDetails.BasicDetails.DurationUOM !=
                null &&
              !String.IsNullOrEmpty(
                prescriptionItem.formViewerDetails.BasicDetails.DurationUOM
                  .DisplayText
              )
            )
              newDurationUom =
                prescriptionItem.formViewerDetails.BasicDetails.DurationUOM
                  .DisplayText;
            if (
              !String.IsNullOrEmpty(newDuration) ||
              !String.IsNullOrEmpty(newDurationUom)
            )
              newValue = newDuration + ' ' + newDurationUom;
          }
          if (!oldValue.Equals(newValue, StringComparison.OrdinalIgnoreCase)) {
            liChanges.Add(
              ObjectHelper.CreateObject(
                new IPPMAManagePrescSer.PresItemAuditHistory(),
                {
                  FieldName: FieldNames.DurationUom,
                  OldValue: oldValue,
                  NewValue: newValue,
                }
              )
            );
          }
        }
        {
          let oldValue: string = oldValues.ContainsKey(FieldNames.QuantityUom)
            ? oldValues[FieldNames.QuantityUom] ?? String.Empty
            : String.Empty;
          let newQuantity: string = String.Empty,
            newQuantityUom = String.Empty;
          let newValue: string = String.Empty;
          if (
            prescriptionItem.formViewerDetails != null &&
            prescriptionItem.formViewerDetails.BasicDetails != null
          ) {
            if (
              !String.IsNullOrEmpty(
                prescriptionItem.formViewerDetails.BasicDetails.Quantity
              )
            )
              newQuantity =
                prescriptionItem.formViewerDetails.BasicDetails.Quantity;
            if (
              prescriptionItem.formViewerDetails.BasicDetails.QuantityUOM !=
              null
            ) {
              if (
                !String.IsNullOrEmpty(
                  prescriptionItem.formViewerDetails.BasicDetails.QuantityUOM
                    .DisplayText
                )
              )
                newQuantityUom =
                  prescriptionItem.formViewerDetails.BasicDetails.QuantityUOM
                    .DisplayText;
            }
            if (
              !String.IsNullOrEmpty(newQuantity) ||
              !String.IsNullOrEmpty(newQuantityUom)
            )
              newValue = newQuantity + ' ' + newQuantityUom;
          }
          if (!oldValue.Equals(newValue, StringComparison.OrdinalIgnoreCase)) {
            liChanges.Add(
              ObjectHelper.CreateObject(
                new IPPMAManagePrescSer.PresItemAuditHistory(),
                {
                  FieldName: FieldNames.QuantityUom,
                  OldValue: oldValue,
                  NewValue: newValue,
                }
              )
            );
          }
        }
        {
          let oldValue: string = oldValues.ContainsKey(FieldNames.StopDatetime)
            ? oldValues[FieldNames.StopDatetime] ?? String.Empty
            : String.Empty;
          let newStopDatetime: string = String.Empty;
          let newValue: string = String.Empty;
          if (
            prescriptionItem.formViewerDetails != null &&
            prescriptionItem.formViewerDetails.BasicDetails != null &&
            ObjectHelper.HasValue(
              prescriptionItem.formViewerDetails.BasicDetails
                .StopPrescriptionTime
            ) &&
            DateTime.NotEquals(prescriptionItem.formViewerDetails.BasicDetails.StopPrescriptionTime
              .Value, DateTime.MinValue)
          )
            newStopDatetime =
              prescriptionItem.formViewerDetails.BasicDetails.StopPrescriptionTime.Value.ToUserDateTimeString(
                CConstants.DateHMFormat
              );
          if (
            !oldValue.Equals(
              newStopDatetime,
              StringComparison.OrdinalIgnoreCase
            )
          ) {
            liChanges.Add(
              ObjectHelper.CreateObject(
                new IPPMAManagePrescSer.PresItemAuditHistory(),
                {
                  FieldName: FieldNames.StopDatetime,
                  OldValue: oldValue,
                  NewValue: newStopDatetime,
                }
              )
            );
          }
        }
        {
          let oldValue: string = oldValues.ContainsKey(FieldNames.OnAdmission)
            ? oldValues[FieldNames.OnAdmission] ?? 'No'
            : 'No';
          let newOnAdmission: string = 'No';
          if (
            prescriptionItem.FormViewerDetails != null &&
            prescriptionItem.FormViewerDetails.BasicDetails != null &&
            prescriptionItem.FormViewerDetails.BasicDetails
              .IsExistsOnAdmission != '\0'
          )
            newOnAdmission =
              prescriptionItem.FormViewerDetails.BasicDetails
                .IsExistsOnAdmission == '1'
                ? 'Yes'
                : 'No';
          if (
            !oldValue.Equals(newOnAdmission, StringComparison.OrdinalIgnoreCase)
          ) {
            liChanges.Add(
              ObjectHelper.CreateObject(
                new IPPMAManagePrescSer.PresItemAuditHistory(),
                {
                  FieldName: FieldNames.OnAdmission,
                  OldValue: oldValue,
                  NewValue: newOnAdmission,
                }
              )
            );
          }
        }
        {
          let oldValue: string = oldValues.ContainsKey(
            FieldNames.ProblemIndication
          )
            ? oldValues[FieldNames.ProblemIndication] ?? String.Empty
            : String.Empty;
          let newProblemIndication: string = String.Empty;
          if (
            prescriptionItem.FormViewerDetails != null &&
            prescriptionItem.FormViewerDetails.BasicDetails != null &&
            !String.IsNullOrEmpty(
              prescriptionItem.FormViewerDetails.BasicDetails.ProblemIndication
            )
          )
            newProblemIndication =
              prescriptionItem.FormViewerDetails.BasicDetails.ProblemIndication;
          if (
            !oldValue.Equals(
              newProblemIndication,
              StringComparison.OrdinalIgnoreCase
            )
          ) {
            liChanges.Add(
              ObjectHelper.CreateObject(
                new IPPMAManagePrescSer.PresItemAuditHistory(),
                {
                  FieldName: FieldNames.ProblemIndication,
                  OldValue: oldValue,
                  NewValue: newProblemIndication,
                }
              )
            );
          }
        }
        {
          let oldValue: string = oldValues.ContainsKey(
            FieldNames.AdditionalComment
          )
            ? oldValues[FieldNames.AdditionalComment] ?? String.Empty
            : String.Empty;
          let newAdditionalComments: string = String.Empty;
          if (
            prescriptionItem.FormViewerDetails != null &&
            prescriptionItem.FormViewerDetails.BasicDetails != null &&
            !String.IsNullOrEmpty(
              prescriptionItem.formViewerDetails.BasicDetails.AdditionalComments
            )
          )
            newAdditionalComments =
              prescriptionItem.formViewerDetails.BasicDetails
                .AdditionalComments;
          if (
            !oldValue.Equals(
              newAdditionalComments,
              StringComparison.OrdinalIgnoreCase
            )
          ) {
            liChanges.Add(
              ObjectHelper.CreateObject(
                new IPPMAManagePrescSer.PresItemAuditHistory(),
                {
                  FieldName: 'Additional comments',
                  OldValue: oldValue,
                  NewValue: newAdditionalComments,
                }
              )
            );
          }
        }
        {
          let oldValue: string = oldValues.ContainsKey(
            FieldNames.AdministrationInstruction
          )
            ? oldValues[FieldNames.AdministrationInstruction] ?? String.Empty
            : String.Empty;
          let newInstructions: string = String.Empty;
          if (
            prescriptionItem.FormViewerDetails != null &&
            prescriptionItem.FormViewerDetails.BasicDetails != null &&
            !String.IsNullOrEmpty(
              prescriptionItem.FormViewerDetails.BasicDetails
                .OtherAdminiInstruction
            )
          ) {
            newInstructions =
              prescriptionItem.FormViewerDetails.BasicDetails
                .OtherAdminiInstruction;
          } else if (
            prescriptionItem.FormViewerDetails != null &&
            prescriptionItem.FormViewerDetails.BasicDetails != null &&
            prescriptionItem.FormViewerDetails.BasicDetails.AdminInstruction !=
              null
          ) {
            newInstructions =
              prescriptionItem.FormViewerDetails.BasicDetails.AdminInstruction
                .DisplayText != null
                ? prescriptionItem.FormViewerDetails.BasicDetails
                    .AdminInstruction.DisplayText
                : String.Empty;
          }
          if (
            !oldValue.Equals(
              newInstructions,
              StringComparison.OrdinalIgnoreCase
            )
          ) {
            liChanges.Add(
              ObjectHelper.CreateObject(
                new IPPMAManagePrescSer.PresItemAuditHistory(),
                {
                  FieldName: FieldNames.AdministrationInstruction,
                  OldValue: oldValue,
                  NewValue: newInstructions,
                }
              )
            );
          }
        }
        if (
          ((isInfusion || isBloodProduct) &&
            prescriptionItem.formViewerDetails != null &&
            prescriptionItem.formViewerDetails.BasicDetails != null &&
            prescriptionItem.formViewerDetails.BasicDetails.InfusionType !=
              null &&
            (prescriptionItem.formViewerDetails.BasicDetails.InfusionType
              .Value == InfusionTypesCode.CONTINUOUS ||
              prescriptionItem.formViewerDetails.BasicDetails.InfusionType
                .Value == InfusionTypesCode.INTERMITTENT)) ||
          (prescriptionItem.formViewerDetails.BasicDetails.itemSubType !=
            null &&
            prescriptionItem.formViewerDetails.BasicDetails.itemSubType.Equals(
              CConstants.SUBTYPE_GAS,
              StringComparison.OrdinalIgnoreCase
            ))
        ) {
          let oldValue: string = oldValues.ContainsKey(FieldNames.FlowRate)
            ? oldValues[FieldNames.FlowRate] ?? String.Empty
            : String.Empty;
          let newValue: string = String.Empty;
          let newRate: string = String.Empty,
            newUpperRate = String.Empty,
            newRateUom = String.Empty,
            newRateUomDenom = String.Empty;
          if (
            prescriptionItem.FormViewerDetails.BasicDetails.InfusionDetails !=
            null
          ) {
            if (
              !String.IsNullOrEmpty(
                prescriptionItem.FormViewerDetails.BasicDetails.InfusionDetails
                  .Rate
              )
            )
              newRate =
                prescriptionItem.FormViewerDetails.BasicDetails.InfusionDetails
                  .Rate;
            if (
              !String.IsNullOrEmpty(
                prescriptionItem.FormViewerDetails.BasicDetails.InfusionDetails
                  .UpperRate
              )
            )
              newUpperRate =
                prescriptionItem.FormViewerDetails.BasicDetails.InfusionDetails
                  .UpperRate;
            if (
              prescriptionItem.FormViewerDetails.BasicDetails.InfusionDetails
                .InfRateNumeratorUom != null &&
              !String.IsNullOrEmpty(
                prescriptionItem.FormViewerDetails.BasicDetails.InfusionDetails
                  .InfRateNumeratorUom.DisplayText
              )
            )
              newRateUom =
                prescriptionItem.FormViewerDetails.BasicDetails.InfusionDetails
                  .InfRateNumeratorUom.DisplayText;
            if (
              prescriptionItem.FormViewerDetails.BasicDetails.InfusionDetails
                .InfRateDinominatorUom != null &&
              !String.IsNullOrEmpty(
                prescriptionItem.FormViewerDetails.BasicDetails.InfusionDetails
                  .InfRateDinominatorUom.DisplayText
              )
            )
              newRateUomDenom =
                prescriptionItem.FormViewerDetails.BasicDetails.InfusionDetails
                  .InfRateDinominatorUom.DisplayText;
            if (
              !String.IsNullOrEmpty(newRate) ||
              !String.IsNullOrEmpty(newRateUom) ||
              !String.IsNullOrEmpty(newRateUomDenom)
            ) {
              newValue =
                newRate +
                (!String.IsNullOrEmpty(newUpperRate)
                  ? '-' + newUpperRate
                  : String.Empty) +
                ' ' +
                newRateUom +
                '/' +
                newRateUomDenom;
            }
          }
          if (!oldValue.Equals(newValue, StringComparison.OrdinalIgnoreCase)) {
            liChanges.Add(
              ObjectHelper.CreateObject(
                new IPPMAManagePrescSer.PresItemAuditHistory(),
                {
                  FieldName: FieldNames.FlowRate,
                  OldValue: oldValue,
                  NewValue: newValue,
                }
              )
            );
          }
        }
        if (
          (isInfusion || isBloodProduct) &&
          prescriptionItem.formViewerDetails != null &&
          prescriptionItem.formViewerDetails.BasicDetails != null &&
          prescriptionItem.formViewerDetails.BasicDetails.InfusionType !=
            null &&
          (prescriptionItem.formViewerDetails.BasicDetails.InfusionType.Value ==
            InfusionTypesCode.CONTINUOUS ||
            prescriptionItem.formViewerDetails.BasicDetails.InfusionType
              .Value == InfusionTypesCode.INTERMITTENT ||
            prescriptionItem.formViewerDetails.BasicDetails.InfusionType
              .Value == InfusionTypesCode.PCA)
        ) {
          let oldValue: string = oldValues.ContainsKey(
            FieldNames.InfusionPeriod
          )
            ? oldValues[FieldNames.InfusionPeriod] ?? String.Empty
            : String.Empty;
          let newPeriod: string = String.Empty,
            newPeriodUom = String.Empty;
          let newValue: string = String.Empty;
          if (
            prescriptionItem.FormViewerDetails.BasicDetails.InfusionDetails !=
              null &&
            !String.IsNullOrEmpty(
              prescriptionItem.FormViewerDetails.BasicDetails.InfusionDetails
                .InfusionPeriod
            )
          )
            newPeriod =
              prescriptionItem.FormViewerDetails.BasicDetails.InfusionDetails
                .InfusionPeriod;
          if (
            prescriptionItem.FormViewerDetails.BasicDetails.InfusionDetails !=
              null &&
            prescriptionItem.FormViewerDetails.BasicDetails.InfusionDetails
              .InfusionPeriodUom != null &&
            !String.IsNullOrEmpty(
              prescriptionItem.FormViewerDetails.BasicDetails.InfusionDetails
                .InfusionPeriodUom.DisplayText
            )
          )
            newPeriodUom =
              prescriptionItem.FormViewerDetails.BasicDetails.InfusionDetails
                .InfusionPeriodUom.DisplayText;
          if (
            !String.IsNullOrEmpty(newPeriod) ||
            !String.IsNullOrEmpty(newPeriodUom)
          ) {
            newValue = newPeriod + ' ' + newPeriodUom;
          }
          if (!oldValue.Equals(newValue, StringComparison.OrdinalIgnoreCase)) {
            liChanges.Add(
              ObjectHelper.CreateObject(
                new IPPMAManagePrescSer.PresItemAuditHistory(),
                {
                  FieldName: FieldNames.InfusionPeriod,
                  OldValue: oldValue,
                  NewValue: newValue,
                }
              )
            );
          }
        }
        if (
          (isInfusion || isBloodProduct) &&
          prescriptionItem.formViewerDetails != null &&
          prescriptionItem.formViewerDetails.BasicDetails != null &&
          prescriptionItem.formViewerDetails.BasicDetails.InfusionType !=
            null &&
          prescriptionItem.formViewerDetails.BasicDetails.InfusionType.Value ==
            InfusionTypesCode.PCA
        ) {
          let oldValue: string = oldValues.ContainsKey(FieldNames.MaxDose)
            ? oldValues[FieldNames.MaxDose] ?? String.Empty
            : String.Empty;
          let newMaxDose: string = String.Empty;
          if (
            prescriptionItem.FormViewerDetails.BasicDetails.InfusionDetails !=
              null &&
            !String.IsNullOrEmpty(
              prescriptionItem.FormViewerDetails.BasicDetails.InfusionDetails
                .MaxDose
            )
          )
            newMaxDose =
              prescriptionItem.FormViewerDetails.BasicDetails.InfusionDetails
                .MaxDose;
          if (
            !oldValue.Equals(newMaxDose, StringComparison.OrdinalIgnoreCase)
          ) {
            liChanges.Add(
              ObjectHelper.CreateObject(
                new IPPMAManagePrescSer.PresItemAuditHistory(),
                {
                  FieldName: FieldNames.MaxDose,
                  OldValue: oldValue,
                  NewValue: newMaxDose,
                }
              )
            );
          }
        }
        if (
          prescriptionItem.formViewerDetails != null &&
          prescriptionItem.formViewerDetails.BasicDetails != null &&
          prescriptionItem.formViewerDetails.BasicDetails.itemSubType != null &&
          prescriptionItem.formViewerDetails.BasicDetails.itemSubType.Equals(
            CConstants.SUBTYPE_GAS,
            StringComparison.OrdinalIgnoreCase
          )
        ) {
          let oldValue: string = oldValues.ContainsKey(
            FieldNames.DeliveryDevice
          )
            ? oldValues[FieldNames.DeliveryDevice] ?? String.Empty
            : String.Empty;
          let newDeliveryDevice: string = String.Empty;
          if (
            prescriptionItem.FormViewerDetails.BasicDetails.InfusionDetails !=
              null &&
            prescriptionItem.FormViewerDetails.BasicDetails.InfusionDetails
              .DeliveryDevice != null &&
            !String.IsNullOrEmpty(
              prescriptionItem.FormViewerDetails.BasicDetails.InfusionDetails
                .DeliveryDevice.DisplayText
            )
          )
            newDeliveryDevice =
              prescriptionItem.FormViewerDetails.BasicDetails.InfusionDetails
                .DeliveryDevice.DisplayText;
          else if (
            prescriptionItem.FormViewerDetails.BasicDetails.InfusionDetails !=
              null &&
            !String.IsNullOrEmpty(
              prescriptionItem.FormViewerDetails.BasicDetails.InfusionDetails
                .DeliveryDeviceFreetext
            )
          )
            newDeliveryDevice =
              prescriptionItem.FormViewerDetails.BasicDetails.InfusionDetails
                .DeliveryDeviceFreetext;
          if (
            !oldValue.Equals(
              newDeliveryDevice,
              StringComparison.OrdinalIgnoreCase
            )
          ) {
            liChanges.Add(
              ObjectHelper.CreateObject(
                new IPPMAManagePrescSer.PresItemAuditHistory(),
                {
                  FieldName: FieldNames.DeliveryDevice,
                  OldValue: oldValue,
                  NewValue: newDeliveryDevice,
                }
              )
            );
          }
        }
        if (
          prescriptionItem.formViewerDetails != null &&
          prescriptionItem.formViewerDetails.BasicDetails != null &&
          prescriptionItem.formViewerDetails.BasicDetails.itemSubType != null &&
          prescriptionItem.formViewerDetails.BasicDetails.itemSubType.Equals(
            CConstants.SUBTYPE_GAS,
            StringComparison.OrdinalIgnoreCase
          ) &&
          prescriptionItem.formViewerDetails.BasicDetails.InfusionDetails !=
            null &&
          prescriptionItem.formViewerDetails.BasicDetails.InfusionDetails
            .IsOxygen
        ) {
          let oldValue: string = oldValues.ContainsKey(
            FieldNames.TargetSaturationRange
          )
            ? oldValues[FieldNames.TargetSaturationRange] ?? String.Empty
            : String.Empty;
          let newSaturationLow: string = String.Empty,
            newSaturationUpper = String.Empty;
          let newValue: string = String.Empty;
          if (
            prescriptionItem.FormViewerDetails.BasicDetails.InfusionDetails !=
              null &&
            (!String.IsNullOrEmpty(
              prescriptionItem.FormViewerDetails.BasicDetails.InfusionDetails
                .TargetLowerSatRange
            ) ||
              !String.IsNullOrEmpty(
                prescriptionItem.FormViewerDetails.BasicDetails.InfusionDetails
                  .TargetUpperSatRange
              ))
          ) {
            newSaturationLow =
              prescriptionItem.FormViewerDetails.BasicDetails.InfusionDetails
                .TargetLowerSatRange;
            newSaturationUpper =
              prescriptionItem.FormViewerDetails.BasicDetails.InfusionDetails
                .TargetUpperSatRange;
            if (
              !String.IsNullOrEmpty(newSaturationLow) ||
              !String.IsNullOrEmpty(newSaturationUpper)
            ) {
              newValue = newSaturationLow + '-' + newSaturationUpper + '%';
            }
          }
          if (!oldValue.Equals(newValue, StringComparison.OrdinalIgnoreCase)) {
            liChanges.Add(
              ObjectHelper.CreateObject(
                new IPPMAManagePrescSer.PresItemAuditHistory(),
                {
                  FieldName: FieldNames.TargetSaturationRange,
                  OldValue: oldValue,
                  NewValue: newValue,
                }
              )
            );
          }
        }
      }
      prescriptionItem.HistoryOfAmend = liChanges;
    }
  }
  //Not Required for LHS. To be Re-Visited.
  
        public static OssOkClick(objmezz: OrderSetSecMezzanine): boolean {
            if (objmezz.objOrderSetSecMezzanineVM != null && objmezz.objOrderSetSecMezzanineVM.PrescriptionItemList != null) {
                let pItemList: ObservableCollection<PrescriptionItemAssociations> = objmezz.objOrderSetSecMezzanineVM.PrescriptionItemList;
                let isClearking: boolean = (String.Compare(PatientContext.PrescriptionType, PrescriptionTypes.Clerking, StringComparison.OrdinalIgnoreCase) == 0 || PatientContext.ClerkFormViewDefaultBehavior == ClerkFormViewDeftBehaviour.LaunchFormMandatory);
                if (isClearking) {
                    pItemList.Where(x => x != null && x.PrescrptionItem != null && x.PrescrptionItem.OsInstance != null && x.PrescrptionItem.OsInstance.OsSeqGroupNo > 0).ForEach(x => {
                        x.PrescrptionItem.OsInstance.OsIsGroupHeader = false;
                        x.PrescrptionItem.OsInstance.OsGroupHeaderName = null;
                        x.PrescrptionItem.OsInstance.OsSeqGroupNo = 0;
                        x.PrescrptionItem.OsInstance.OsIsSequential = false;
                        x.PrescrptionItem.OsInstance.OsIsProtected = false;
                        x.PrescrptionItem.OsInstance.OsDisplayOrder = 0;
                        x.PrescrptionItem.OsInstance.OsIsFirstItem = false;
                        x.PrescrptionItem.OsInstance.OsIsLastItem = false;
                    });
                }
                else {
                    pItemList.Where(x => x != null && x.PrescrptionItem != null && x.PrescrptionItem.OsInstance != null && x.PrescrptionItem.OsInstance.OsSeqGroupNo != 0).ForEach(x => {
                        x.PrescrptionItem.OsInstance.OsIsInfusion = PatientContext.IsINFUSIONON && x.PrescrptionItem.FormViewerDetails.BasicDetails != null && x.PrescrptionItem.FormViewerDetails.BasicDetails.Route != null && x.PrescrptionItem.FormViewerDetails.BasicDetails.Route.Tag != null && (String.Equals(x.PrescrptionItem.FormViewerDetails.BasicDetails.Route.Tag.ToString(), "1", StringComparison.OrdinalIgnoreCase) || !String.IsNullOrEmpty(x.PrescrptionItem.FormViewerDetails.BasicDetails.Route.Tag.ToString()) && !x.PrescrptionItem.FormViewerDetails.BasicDetails.Route.Tag.ToString().Contains("0"));
                        if (!x.PrescrptionItem.OsInstance.OsIsInfusion.Value && x.PrescrptionItem.formViewerDetails != null && x.PrescrptionItem.formViewerDetails.BasicDetails != null && x.PrescrptionItem.formViewerDetails.BasicDetails.Route != null) {
                            x.PrescrptionItem.OsInstance.OsRouteOids = !String.IsNullOrEmpty(x.PrescrptionItem.formViewerDetails.BasicDetails.Route.Value) ? x.PrescrptionItem.formViewerDetails.BasicDetails.Route.Value : String.Empty;
                        }
                        x.PrescrptionItem.DbOsValues = null;
                        Common.UpdateOldOsValues(x.PrescrptionItem);
                    });
                    let itemWithIndex = pItemList.Select((x) => {
                      return { Row: x, Position: pItemList.IndexOf(x as PrescriptionItemAssociations) }
                    });
                    let grped = itemWithIndex.Where(x => x.Row != null && x.Row.PrescrptionItem != null && x.Row.PrescrptionItem.OsInstance.OsIsSequential).GroupBy(x => x.Row.PrescrptionItem.OsInstance.OsSeqGroupNo);
                    grped.forEach( (v)=> {
                        let minPos: number = v.Where(x => x.Row.PrescrptionItem.OsInstance.OsSeqGroupNo == v.key).Min(x => x.Position);
                        let maxPos: number = v.Where(x => x.Row.PrescrptionItem.OsInstance.OsSeqGroupNo == v.key).Max(x => x.Position);
                        if (itemWithIndex.Any(x => x.Position >= minPos && x.Position <= maxPos && x.Row.PrescrptionItem.OsInstance.OsIsGroupHeader)) {
                            let errorMessage: string = MedicationErrors.HeaderInMiddleOfOrderSet;
                            iMessageBox.Show("LORENZO", errorMessage, MessageBoxType.Information, MessageBoxButton.OK);
                            return false;
                        }
                        else {
                          return true;
                        }
                    });
                }
            }
            return true;
        }
        
  public static ShowBusyAlert(): void {
    GlobalVariable.MessageWin = new BusyMessageWindow();
    GlobalVariable.MessageWin.Show();
  }
  public static HideBusyAlert(): void {
    if (GlobalVariable.MessageWin != null) {
      GlobalVariable.MessageWin.DialogResult = false;
    }
  }
  public static EnableGPCConnectLHSArrows(args: AppDialogEventargs): void {
    //Not Required for LHS. To be Re-Visited.
    /*
            if (args != null && args.Content != null && args.Content instanceof meddiscontinuecancelChild && Common.oIPPMABaseVM != null && Common.oIPPMABaseVM.MedsGPConnect != null && Common.oIPPMABaseVM.MedsGPConnect.Count > 0) {
                let oDiscontinueCancelView: meddiscontinuecancelChild = ObjectHelper.CreateType<meddiscontinuecancelChild>(args.Content, meddiscontinuecancelChild);
                if (oDiscontinueCancelView != null) {
                    let oDiscontinueCancelVM: DiscontinueCancelVM = ObjectHelper.CreateType<DiscontinueCancelVM>(oDiscontinueCancelView.DataContext, DiscontinueCancelVM);
                    if (oDiscontinueCancelVM != null && oDiscontinueCancelVM.GrdData != null && oDiscontinueCancelVM.GrdData.Count() > 0 && oDiscontinueCancelVM.GrdData.Any(a => !String.IsNullOrEmpty(a.GPConnectID))) {
                        let nCount: number = oDiscontinueCancelVM.GrdData.Count;
                        for (let i: number = 0; i < nCount; i++) {
                            if (oDiscontinueCancelVM.GrdData[i] != null && !String.IsNullOrEmpty(oDiscontinueCancelVM.GrdData[i].GPConnectID) && (String.Equals(oDiscontinueCancelVM.GrdData[i].() => void,"Discontinue", StringComparison.InvariantCultureIgnoreCase) || String.Equals(oDiscontinueCancelVM.GrdData[i].() => void,"Cancel", StringComparison.InvariantCultureIgnoreCase))) {
                                let oGPItemvm: GPConnectItemVM = Common.oIPPMABaseVM.MedsGPConnect.Where(x => String.Equals(x.GPConnectID, oDiscontinueCancelVM.GrdData[i].GPConnectID, StringComparison.InvariantCultureIgnoreCase)).FirstOrDefault();
                                if (oGPItemvm != null) {
                                    oGPItemvm.IsClerked = false;
                                }
                            }
                        }
                    }
                }
            }
            */
  }
}
export class MedsPrescribeUtility {
  public static GetMultiComponentItems(sMultiCompList: string): string[] {
    let sResult: string[] = [];
    let MultiCompItemsSplitter: string = '^';
    if (!String.IsNullOrEmpty(sMultiCompList)) {
      sResult = sMultiCompList
        .TrimEnd(MultiCompItemsSplitter)
        .Split(MultiCompItemsSplitter);
    }
    return sResult;
  }
}
// export class InvokeCheckBoxEventMethods extends TriggerAction<FrameworkElement>
// {
//     private _element: CheckBox = null;
//     public get Method(): string {
//         return <string>GetValue(InvokeCheckBoxEventMethods.MethodProperty);
//     }
//     public set Method(value: string) {
//         SetValue(InvokeCheckBoxEventMethods.MethodProperty, value);
//     }
//     public static MethodProperty: DependencyProperty = DependencyProperty.Register("Method",typeof(string),typeof(InvokeCheckBoxEventMethods), null);
//     protected OnAttached(): void {
//         super.OnAttached();
//     }
//     protected Invoke(parameter: Object): void {
//         this._element = ObjectHelper.CreateType<CheckBox>(this.AssociatedObject, CheckBox);
//         if (this._element != null) {
//             let oBasicDetailsVM: BasicDetailsVM = ObjectHelper.CreateType<BasicDetailsVM>(this._element.Tag, BasicDetailsVM);
//             if (oBasicDetailsVM != null) {
//                 oBasicDetailsVM.IsClinicallyVerifiedUserChecked = true;
//             }
//         }
//     }
// }
// export class InvokeTextBoxEventMethods extends TriggerAction<FrameworkElement>
// {
//     public get Method(): string {
//         return <string>GetValue(InvokeTextBoxEventMethods.MethodProperty);
//     }
//     public set Method(value: string) {
//         SetValue(InvokeTextBoxEventMethods.MethodProperty, value);
//     }
//     public static MethodProperty: DependencyProperty = DependencyProperty.Register("Method",typeof(string),typeof(InvokeTextBoxEventMethods), null);
//     protected OnAttached(): void {
//         super.OnAttached();
//     }
//     protected Invoke(parameter: Object): void {
//         let kEA: KeyEventArgs = ObjectHelper.CreateType<KeyEventArgs>(parameter, KeyEventArgs);
//         if (kEA.PlatformKeyCode == 189 || kEA.PlatformKeyCode == 109) {
//             kEA.Handled = true;
//         }
//     }
// }
//Not Required for LHS. To be Re-Visited.
export class CommonClo {
  public static Clone<T>(Original: T): any {
  return _.cloneDeep(Original);
  }
   /* static IsPrimitiveEx(member: MemberInfo): boolean {
        if (member.MemberType == MemberTypes.Field)
            return (ObjectHelper.CreateType<FieldInfo>(member, FieldInfo)).FieldType.IsPrimitive;
        else if (member.MemberType == MemberTypes.Property)
            return (ObjectHelper.CreateType<PropertyInfo>(member, PropertyInfo)).PropertyType.IsPrimitive;
        else return false;
    }
    static GetValueEx(member: MemberInfo, obj: Object): Object {
        if (member.MemberType == MemberTypes.Field)
            return (ObjectHelper.CreateType<FieldInfo>(member, FieldInfo)).GetValue(obj);
        else if (member.MemberType == MemberTypes.Property && (ObjectHelper.CreateType<PropertyInfo>(member, PropertyInfo)).CanRead)
            return (ObjectHelper.CreateType<PropertyInfo>(member, PropertyInfo)).GetValue(obj, null);
        else return null;
    }
    static SetValueEx(member: MemberInfo, copy: Object, value: Object): void {
        if (member.MemberType == MemberTypes.Field)
            (ObjectHelper.CreateType<FieldInfo>(member, FieldInfo)).SetValue(copy, value);
        else if (member.MemberType == MemberTypes.Property && (ObjectHelper.CreateType<PropertyInfo>(member, PropertyInfo)).CanWrite)
            (ObjectHelper.CreateType<PropertyInfo>(member, PropertyInfo)).SetValue(copy, value, null);
    }
    static TypeEx(member: MemberInfo): Type {
        if (member.MemberType == MemberTypes.Field)
            return (ObjectHelper.CreateType<FieldInfo>(member, FieldInfo)).FieldType;
        else if (member.MemberType == MemberTypes.Property)
            return (ObjectHelper.CreateType<PropertyInfo>(member, PropertyInfo)).PropertyType;
        else return null;
    }
    private static objDict: Dictionary<Object, Object> = new Collections.Generic.Dictionary<Object, Object>();
    public static Clone<T>(Original: T): T {
        CommonClo.objDict.Clear();
        let copy: T = Activator.CreateInstance<T>();
        if (typeof(T).IsPrimitive || typeof(T) == typeof(String))
            return Original;
        CommonClo.objDict.Add(Original, copy);
        let mi: List<MemberInfo> = typeof(T.GetProperties)(BindingFlags.Public | BindingFlags.Instance).ToList<MemberInfo>();
        mi.AddRange(typeof(T.GetFields(BindingFlags.Public | BindingFlags.Instance)).ToList<MemberInfo>());
        CommonClo.CommonClone(mi.ToArray(), <Object>Original, <Object>copy);
        CommonClo.objDict.Clear();
        return copy;
    }
    public static CopyTo<T>(Original: T, Copy: T): void {
        CommonClo.objDict.Clear();
        if (!(typeof(T).IsPrimitive || typeof(T) == typeof(String) || Copy == null)) {
            CommonClo.objDict.Add(Original, Copy);
            let mi: List<MemberInfo> = typeof(T.GetProperties)(BindingFlags.Public | BindingFlags.Instance).ToList<MemberInfo>();
            mi.AddRange(typeof(T.GetFields(BindingFlags.Public | BindingFlags.Instance)).ToList<MemberInfo>());
            CommonClo.CommonClone(mi.ToArray(), <Object>Original, <Object>Copy);
            CommonClo.objDict.Clear();
        }
    }
    private static Clone(Original: Object): Object {
        let type = Original.GetType();
        if (type.IsPrimitive || type == typeof(String))
            return Original;
        let copy = CommonClo.objDict.Where(a => a.Key.Equals(Original)).Select(b => b.Value).FirstOrDefault();
        if (copy == null) {
            copy = Activator.CreateInstance(type);
            CommonClo.objDict.Add(Original, copy);
        }
        let mi: List<MemberInfo> = type.GetProperties(BindingFlags.Public | BindingFlags.Instance).ToList<MemberInfo>();
        mi.AddRange(type.GetFields(BindingFlags.Public | BindingFlags.Instance).ToList<MemberInfo>());
        CommonClone(mi.ToArray(), Original, copy);
        return copy;
    }
    private static CommonClone(mi: MemberInfo[], Original: Object, copy: Object): void {
        mi.forEach( (m)=> {
            let obj = m.GetValueEx(Original);
            if (obj == null)
                continue;
            if (m.IsPrimitiveEx() || m.TypeEx() == typeof(String))
                m.SetValueEx(copy, m.GetValueEx(Original));
            else if (typeof(DateTime.IsAssignableFrom(m.TypeEx()))) {
                let dt = <DateTime.obj;
                let z = CommonClo.objDict.ContainsKey(obj) ? CommonClo.objDict[obj] : new DateTime(dt.Ticks);
                if (!CommonClo.objDict.ContainsKey(obj))
                    CommonClo.objDict.Add(obj, z);
                m.SetValueEx(copy, z);
            }
            else if (m.TypeEx() != null && m.TypeEx().IsGenericType && !m.TypeEx().IsArray && typeof(IList.IsAssignableFrom(m.TypeEx()))) {
                let listType: Type = m.TypeEx().GetGenericTypeDefinition();
                let listTypeGenericRuntime: Type = listType.MakeGenericType(m.TypeEx().GetGenericArguments()[0]);
                let copyCollection = Activator.CreateInstance(listTypeGenericRuntime);
                let objCount = listTypeGenericRuntime.InvokeMember("Count", BindingFlags.GetProperty, null, obj, null);
                let nCount: number = 0;
                if (objCount != null)

                Number.TryParse(objCount.ToString(), (o) => { nCount = o; });
                for (let i = 0; i < nCount; i++) {
                    let item = listTypeGenericRuntime.InvokeMember("Item", BindingFlags.GetProperty, null, obj, i);
                    listTypeGenericRuntime.InvokeMember("Add", BindingFlags.InvokeMethod, null, copyCollection, CommonClo.Clone(item));
                }
                m.SetValueEx(copy, copyCollection);
            }
            else if (m.TypeEx() != null && m.TypeEx().IsArray) {
                let arr = ObjectHelper.CreateType<Array>(obj, Array);
                let nCount: number = arr.length;
                let copyArray: Array = Array.CreateInstance(m.TypeEx().GetElementType(), nCount);
                for (let i = 0; i < nCount; i++)
                    copyArray.SetValue(CommonClo.Clone(arr.GetValue(i)), i);
            }
            else {
                let z = CommonClo.objDict.ContainsKey(obj) ? CommonClo.objDict[obj] : CommonClo.Clone(obj);
                if (!CommonClo.objDict.ContainsKey(obj))
                    CommonClo.objDict.Add(obj, z);
                m.SetValueEx(copy, z);
            }
        });
    }*/
}
export class Extension {
  public static NullifyiTabItemContentReference(
    _Tab: iTab,
    TabItemKey: string
  ): void {
    if (
      !String.IsNullOrEmpty(TabItemKey) &&
      _Tab.Items != null &&
      _Tab.Items.Count > 0
    ) {
      let _TabItem: iTabItem = _Tab.GetItem(TabItemKey);
      if (_TabItem != null) {
        _TabItem.Content = null;
      }
    }
  }
}
export class OsValidation {
  public IsInfusion: boolean;
  public IsStatOnceOnlyOrPrn: boolean;
  public IsApplianceMedGasSVOrPCA: boolean;
  public HavingDuration: boolean;
  public HavingInfusionPeriod: boolean;
  public IsIntermittend: boolean;
  public IsTitrated: boolean;

  public static GetOsValidation(
    assoc: PrescriptionItemAssociations | PrescriptionItemVM,
    isOssList: boolean
  ): OsValidation {
    if (assoc instanceof PrescriptionItemAssociations) {
      return this.GetOsValidation1(
        <PrescriptionItemAssociations>assoc,
        isOssList
      );
    } else {
      return this.GetOsValidation2(<PrescriptionItemVM>assoc, isOssList);
    }
  }

  private static GetOsValidation1(
    assoc: PrescriptionItemAssociations,
    isOssList: boolean
  ): OsValidation {
    if (assoc == null) return null;
    let oVM: PrescriptionItemVM = assoc.PrescrptionItem;
    if (oVM == null) return null;
    return OsValidation.GetOsValidation(oVM, isOssList);
  }
  private static GetOsValidation2(
    oVM: PrescriptionItemVM,
    isOssList: boolean
  ): OsValidation {
    if (oVM == null) return null;
    let isStatOnceOnlyOrPrn: boolean = false,
      isApplianceMedGasSVOrPCA = false,
      isInfusion = false,
      havingDuration = false,
      havingInfusionPeriod = false,
      isTitrated = false;
    if (
      oVM.FormViewerDetails != null &&
      oVM.FormViewerDetails.BasicDetails != null
    ) {
      if (
        isOssList &&
        oVM != null &&
        oVM.OsInstance != null &&
        !String.IsNullOrEmpty(oVM.OsInstance.FreqPeriodCode) &&
        oVM.OsInstance.FreqPeriodCode.Equals(
          'CC_IPONCENLY',
          StringComparison.OrdinalIgnoreCase
        )
      ) {
        isStatOnceOnlyOrPrn = true;
      } else if (
        oVM.FormViewerDetails.BasicDetails.Frequency != null &&
        oVM.FormViewerDetails.BasicDetails.Frequency.Tag != null
      ) {
        let tagValue: string[] = ObjectHelper.CreateType<string[]>(
          oVM.FormViewerDetails.BasicDetails.Frequency.Tag,
          'string[]'
        );
        if (
          tagValue != null &&
          tagValue.length >= 2 &&
          String.Equals(
            tagValue[1],
            'CC_IPONCENLY',
            StringComparison.OrdinalIgnoreCase
          )
        ) {
          isStatOnceOnlyOrPrn = true;
        }
        if (
          tagValue != null &&
          tagValue.length > 0 &&
          String.Equals(tagValue[0], '1', StringComparison.OrdinalIgnoreCase)
        ) {
          isStatOnceOnlyOrPrn = true;
        }
      }
      if (
        !isStatOnceOnlyOrPrn &&
        oVM.FormViewerDetails.BasicDetails.AsRequired
      ) {
        isStatOnceOnlyOrPrn = true;
      }
    }
    isApplianceMedGasSVOrPCA =
      String.Equals(
        oVM.ItemMainType,
        'CC_APPLIANCE',
        StringComparison.OrdinalIgnoreCase
      ) ||
      (oVM.FormViewerDetails != null &&
        oVM.FormViewerDetails.BasicDetails != null &&
        (String.Equals(
          oVM.FormViewerDetails.BasicDetails.itemSubType,
          'CC_MEDGAS',
          StringComparison.OrdinalIgnoreCase
        ) ||
          (oVM.formViewerDetails.BasicDetails.InfusionType != null &&
            !String.IsNullOrEmpty(
              oVM.formViewerDetails.BasicDetails.InfusionType.Value
            ) &&
            oVM.formViewerDetails.BasicDetails.InfusionType.Value.Equals(
              InfusionTypesCode.PCA,
              StringComparison.OrdinalIgnoreCase
            )) ||
          (oVM.FormViewerDetails.BasicDetails.DoseType != null &&
            String.Equals(
              oVM.FormViewerDetails.BasicDetails.DoseType.Value,
              DoseTypeCode.STEPPEDVARIABLE
            ))));
    let isIntermittent: boolean =
      oVM.FormViewerDetails != null &&
      oVM.FormViewerDetails.BasicDetails != null &&
      oVM.FormViewerDetails.BasicDetails.InfusionType != null &&
      String.Compare(
        oVM.FormViewerDetails.BasicDetails.InfusionType.Value,
        InfusionTypesCode.INTERMITTENT
      ) == 0;
    isInfusion =
      PatientContext.IsINFUSIONON &&
      oVM.FormViewerDetails != null &&
      oVM.FormViewerDetails.BasicDetails != null &&
      oVM.FormViewerDetails.BasicDetails.Route != null &&
      oVM.FormViewerDetails.BasicDetails.Route.Tag != null &&
      (String.Equals(
        oVM.FormViewerDetails.BasicDetails.Route.Tag.ToString(),
        '1',
        StringComparison.OrdinalIgnoreCase
      ) ||
        (!String.IsNullOrEmpty(
          oVM.FormViewerDetails.BasicDetails.Route.Tag.ToString()
        ) &&
          !oVM.FormViewerDetails.BasicDetails.Route.Tag.ToString().Contains(
            '0'
          ))) &&
      (!isIntermittent ||
        oVM.FormViewerDetails.BasicDetails.InfusionDetails == null ||
        !oVM.FormViewerDetails.BasicDetails.InfusionDetails
          .ChckSingleActionMedChart);
    havingInfusionPeriod =
      isInfusion &&
      !isIntermittent &&
      oVM.FormViewerDetails != null &&
      oVM.FormViewerDetails.BasicDetails != null &&
      oVM.FormViewerDetails.BasicDetails.InfusionDetails != null &&
      !String.IsNullOrEmpty(
        oVM.FormViewerDetails.BasicDetails.InfusionDetails.InfusionPeriod
      ) &&
      oVM.FormViewerDetails.BasicDetails.InfusionDetails.InfusionPeriodUom !=
        null &&
      !String.IsNullOrEmpty(
        oVM.FormViewerDetails.BasicDetails.InfusionDetails.InfusionPeriodUom
          .Value
      );
    havingDuration =
      (!isInfusion || isIntermittent) &&
      oVM.FormViewerDetails != null &&
      oVM.FormViewerDetails.BasicDetails != null &&
      ((!String.IsNullOrEmpty(oVM.FormViewerDetails.BasicDetails.Duration) &&
        oVM.FormViewerDetails.BasicDetails.DurationUOM != null &&
        !String.IsNullOrEmpty(
          oVM.FormViewerDetails.BasicDetails.DurationUOM.Value
        )) ||
        (oVM.FormViewerDetails.BasicDetails.DoseType != null &&
          String.Equals(
            oVM.FormViewerDetails.BasicDetails.DoseType.Value,
            DoseTypeCode.STEPPEDVARIABLE
          ) &&
          oVM.FormViewerDetails.BasicDetails.MultiDoseDetails != null &&
          oVM.FormViewerDetails.BasicDetails.MultiDoseDetails.Count > 0 &&
          oVM.FormViewerDetails.BasicDetails.MultiDoseDetails[
            oVM.FormViewerDetails.BasicDetails.MultiDoseDetails.Count - 1
          ].Duration != 0 &&
          oVM.FormViewerDetails.BasicDetails.MultiDoseDetails[
            oVM.FormViewerDetails.BasicDetails.MultiDoseDetails.Count - 1
          ].DurationUOM != null &&
          !String.IsNullOrEmpty(
            oVM.FormViewerDetails.BasicDetails.MultiDoseDetails[
              oVM.FormViewerDetails.BasicDetails.MultiDoseDetails.Count - 1
            ].DurationUOM.Value
          )));
    isTitrated =
      oVM.FormViewerDetails != null &&
      oVM.FormViewerDetails.BasicDetails != null &&
      oVM.FormViewerDetails.BasicDetails.DoseType != null &&
      String.Equals(
        oVM.FormViewerDetails.BasicDetails.DoseType.Value,
        DoseTypeCode.TITRATED,
        StringComparison.OrdinalIgnoreCase
      );
    let validation: OsValidation = ObjectHelper.CreateObject(
      new OsValidation(),
      {
        IsInfusion: isInfusion,
        IsStatOnceOnlyOrPrn: isStatOnceOnlyOrPrn,
        IsApplianceMedGasSVOrPCA: isApplianceMedGasSVOrPCA,
        HavingDuration: havingDuration,
        HavingInfusionPeriod: havingInfusionPeriod,
        IsIntermittend: isIntermittent,
        IsTitrated: isTitrated,
      }
    );
    return validation;
  }
}
export class MultiRouteEvents {
  private dlgtMultirouteChangeMethod: Function;
  public RegisterMultiRouteEvent(
    oForm: UserControl,
    oPresItemVM: PrescriptionItemVM,
    iMultiRoute: iMultiSelectDropdown,
    oMedFormviewer : medFormViewer
  ): void {
    if (iMultiRoute instanceof iMultiSelectDropdown) {
      if (
        oPresItemVM != null &&
        oPresItemVM.FormViewerDetails != null &&
        oPresItemVM.FormViewerDetails.BasicDetails != null &&
        oPresItemVM.FormViewerDetails.BasicDetails.DefaultDetails != null &&
        oPresItemVM.FormViewerDetails.BasicDetails.DefaultDetails.Routes !=
          null &&
        oPresItemVM.FormViewerDetails.BasicDetails.IsAllowMultiRoute &&
        PatientContext.PrescriptionType.Equals(
          PrescriptionTypes.ForAdministration
        )
      ) {

        oPresItemVM.FormViewerDetails.BasicDetails.DefaultDetails.Routes.forEach( (multiroutelistitem)=> {
                                    multiroutelistitem.PropertyChanged = (s,e) =>{ oMedFormviewer.MultiRoute_PropertyChanged(s,e);};
        });

        // if (
        //   ObjectHelper.CreateType<iTabItem>(oForm.Parent, iTabItem) != null &&
        //   ObjectHelper.CreateType<any>(
        //     ObjectHelper.CreateType<iTab>(
        //       ObjectHelper.CreateType<iTabItem>(oForm.Parent, iTabItem).Parent,
        //       iTab
        //     ).Parent,
        //     'Grid'
        //   ) != null
        // ) {
          
        //                     let omedFormViewer: medFormViewer = (ObjectHelper.CreateType<medFormViewer>((ObjectHelper.CreateType<any>((ObjectHelper.CreateType<iTab>((ObjectHelper.CreateType<iTabItem>(oForm.Parent, iTabItem)).Parent, iTab)).Parent, 'Grid')).Parent, medFormViewer));
        //                     if (omedFormViewer != null) {
        //                         this.dlgtMultirouteChangeMethod = omedFormViewer.MultiRoute_PropertyChanged;
        //                         oPresItemVM.FormViewerDetails.BasicDetails.DefaultDetails.Routes.forEach( (multiroutelistitem)=> {
        //                             multiroutelistitem.PropertyChanged = (s,e) =>{this.dlgtMultirouteChangeMethod(s,e);};
        //                         });
        //                     }
                            
        // }
      }
    }
  }
  public UnRegisterMultiRouteEvent(
    oForm: UserControl,
    oPresItemVM: PrescriptionItemVM,
    iMultiRoute: iMultiSelectDropdown
  ): void {
    if (iMultiRoute instanceof iMultiSelectDropdown) {
      if (
        oPresItemVM != null &&
        oPresItemVM.FormViewerDetails != null &&
        oPresItemVM.FormViewerDetails.BasicDetails != null &&
        oPresItemVM.FormViewerDetails.BasicDetails.DefaultDetails != null &&
        oPresItemVM.FormViewerDetails.BasicDetails.DefaultDetails.Routes !=
          null &&
        oPresItemVM.FormViewerDetails.BasicDetails.IsAllowMultiRoute &&
        PatientContext.PrescriptionType.Equals(
          PrescriptionTypes.ForAdministration
        )
      ) {
        if (this.dlgtMultirouteChangeMethod != null) {
          // oPresItemVM.FormViewerDetails.BasicDetails.DefaultDetails.Routes.forEach( (multiroutelistitem)=> {
          //     multiroutelistitem.PropertyChanged -= this.dlgtMultirouteChangeMethod;
          // });
        }
      }
      try {
        iMultiRoute.UnLoadEvents();
      } catch (err) {
        return;
      }
    }
  }
}
