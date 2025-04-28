import {
  StringBuilder,
  ProfileFactoryType,
  Convert,
  ProcessRTE,
  MessageBoxButton,
  AppLoadService,
} from 'epma-platform/services';
import {
  CListItem,
  IProfileProp,
  List,
  ObservableCollection,
  RTEEventargs,
  StringComparison,
  Visibility,
} from 'epma-platform/models';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import { iMessageBox, MessageBoxType } from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
import { ViewModelBase } from 'src/app/lorappcommonbb/viewmodelbase';
import { MedicationPrescriptionHelper } from '../utilities/medicationprescriptionhelper';
import { MedChartData } from '../utilities/globalvariable';
import { MedicationCommonBB } from '../utilities/medicationcommonbb';
import * as IPPMAManagePrescSer from '../../shared/epma-platform/soap-client/IPPMAManagePrescriptionWS';
import { MedicationCommonProfileData } from '../utilities/profiledata';
import {
  ClerkFormViewDeftBehaviour,
  PatientContext,
} from 'src/app/lorappcommonbb/utilities/globalvariable';
import {
  CConstants,
  InfusionTypeCode,
  PrescriptionTypes,
} from '../utilities/constants';
import { CommonBB } from 'src/app/lorappcommonbb/utilities/common';
import { AMSHelper } from 'src/app/lorappcommonbb/amshelper';
import {
  ArrayOfLong,
  ChkResultAssociationCompletedEventArgs,
  CReqMsgChkResultAssociation,
  CReqMsgGetRequestId,
  CReqMsgGetResultsView,
  CResMsgChkResultAssociation,
  CResMsgGetDrugBasicInfo,
  CResMsgGetRequestId,
  CResMsgGetResultsView,
  GetDrugBasicInfoCompletedEventArgs,
  GetRequestIdCompletedEventArgs,
  GetResultsViewCompletedEventArgs,
  ManagePrescriptionWSSoapClient,
  ResultComponentValue,
} from 'src/app/shared/epma-platform/soap-client/ManagePrescriptionWS';
import { Environment } from '../../product/shared/models/Common';
import { Busyindicator } from 'src/app/lorappcommonbb/busyindicator';
import { ChildWizardCloseEventargs } from 'src/app/shared/epma-platform/models/appdialog.type';
import {
  FontWeight,
  FontWeights,
} from 'src/app/shared/epma-platform/controls/Control';
import {
  CSlotCharacteristicsConfig,
  MedicationResultsViewCount,
  PrescribingConfigData,
} from 'src/app/lorappslprofiletypes/medication';
import { LaunchWizard } from 'src/app/shared/epma-platform/models/launchwizard';
import 'epma-platform/booleanextension';
import 'epma-platform/numberextension';
import 'epma-platform/stringextension';
import {iMath} from 'epma-platform/mathextension';
import 'epma-platform/arrayextension';

var that;
export class DiscontinueCancelVM extends ViewModelBase {
  public oGrdDiscontinueCancelCols: ObservableCollection<GrdDiscontinueCancelCols>;
  public iIndex: number = 0;
  PropertyChanged: (s: any, e: any) => void;  
  public OnChildWizardClose = (args: ChildWizardCloseEventargs): void => {
    Object.keys(that).forEach((prop) => (this[prop] = that[prop]));
    if (this.oGrdDiscontinueCancelCols != null) {
      let sAllergyID: string = String.Empty;
      let Wizardaction: string = String.Empty;
      MedicationPrescriptionHelper.GetWizardData(
        args.ContextData,
        (o1) => {
          sAllergyID = o1;
        },
        (o2) => {
          Wizardaction = o2;
        }
      );
      this.sAllergyDetails.Append('sAllergyIDs=' + sAllergyID);
      if (!String.IsNullOrEmpty(sAllergyID)) {
        MedChartData.IsAllergyRecorded = true;
      }
      this.WindowClosed = sAllergyID;
      this.sAllergyDetails.Clear();
      if (this.iIndex < this.oGrdDiscontinueCancelCols.Count) {
        this.sAllergyDetails.Append(
          'PrescriptionItemOID=' +
            this.oGrdDiscontinueCancelCols[this.iIndex].PrescriptionItemOID +
            '~'
        );
        let SNOMEDTerm: string = MedicationCommonBB.GetSnomedTerm(
          this.oGrdDiscontinueCancelCols[this.iIndex].SNOMEDCode
        );
        let SNOMEDCode: string =
          this.oGrdDiscontinueCancelCols[this.iIndex].SNOMEDCode;
        let AllergyType = 'CC_ALGDA';
        let sArgs =
          '&AllergenText=' +
          SNOMEDTerm +
          '&ALLERGYTYPE=' +
          AllergyType +
          '&AllergenCode=' +
          SNOMEDCode +
          '&MenuCodeForAllergy=MN_RECALRGY';
        this.iIndex++;
        //LaunchWizard(this.OnChildWizardClose, 'MN_HI_RECALRGY', sArgs);
        AppLoadService.LaunchWizard(this.OnChildWizardClose, "MN_HI_RECALRGY", sArgs);
      }
    }
  }
  public sAllergyDetails: StringBuilder = new StringBuilder();
  private _WindowClosed: string;
  public get WindowClosed(): string {
    return this._WindowClosed;
  }
  public set WindowClosed(value: string) {
    this._WindowClosed = value;
    //NotifyPropertyChanged("WindowClosed");
    this.PropertyChanged({}, {PropertyName: "WindowClosed"});
  }
  private lstDrugItemAdminStatus: ObservableCollection<IPPMAManagePrescSer.DrugAdminStatus>;
  private isSelected: boolean = false;
  public get IsSelected(): boolean {
    return this.isSelected;
  }
  public set IsSelected(value: boolean) {
    this.isSelected = value;
    //NotifyPropertyChanged("IsSelected");
  }
  private _IsAlreadyDispensed: boolean = false;
  public get IsAlreadyDispensed(): boolean {
    return this._IsAlreadyDispensed;
  }
  public set IsAlreadyDispensed(value: boolean) {
    this._IsAlreadyDispensed = value;
  }
  _reasonMandatory: boolean = false;
  public get ReasonMandatory(): boolean {
    return this._reasonMandatory;
  }
  public set ReasonMandatory(value: boolean) {
    this._reasonMandatory = value;
  }
  _selectedData: ObservableCollection<SelectedPrescriptionItemVM>;
  public get objSelectedData(): ObservableCollection<SelectedPrescriptionItemVM> {
    return this._selectedData;
  }
  public set objSelectedData(
    value: ObservableCollection<SelectedPrescriptionItemVM>
  ) {
    this._selectedData = value;
  }
  private _grdData: ObservableCollection<GrdDiscontinueCancelCols> = new ObservableCollection<GrdDiscontinueCancelCols>();
  public get GrdData(): ObservableCollection<GrdDiscontinueCancelCols> {
    return this._grdData;
  }
  public set GrdData(value: ObservableCollection<GrdDiscontinueCancelCols>) {
    this._grdData.CopyFrom(value);
    //NotifyPropertyChanged("GrdData");
  }
  _selectedDisData: Object;
  public get objSelectedDisData(): Object {
    return this._selectedDisData;
  }
  public set objSelectedDisData(value: Object) {
    this._selectedDisData = value;
    this.IsSelected = this._selectedDisData != null;
  }
  SetProfileData(): void {
    if (MedicationCommonProfileData.PrescribeConfig.ReasonMandatory) {
      this.ReasonMandatory = true;
    } else {
      this.ReasonMandatory = true;
    }
    if (
      String.Compare(
        PatientContext.PrescriptionType,
        PrescriptionTypes.Inpatient,
        StringComparison.InvariantCultureIgnoreCase
      ) == 0 ||
      String.Compare(
        PatientContext.PrescriptionType,
        PrescriptionTypes.ForAdministration,
        StringComparison.InvariantCultureIgnoreCase
      ) == 0
    ) {
      MedicationCommonBB.GetSlotCharacteristicsConfig((s, e) => {
        this.SlotCharacteristicsConfig_OnProfileLoaded(s, e);
      });
    } else {
      ProcessRTE.GetValuesByDomainCode('MEDCANDISCNTRSN', (s, e) => {
        this.OnRTEResult(s);
      });
    }
  }
  OnRTEResult(args: RTEEventargs): void {
    if (String.IsNullOrEmpty(args.Request) || args.Result == null) return;
    if (this.objSelectedData != null && this.objSelectedData.Count > 0) {
      this.GrdData = new ObservableCollection<GrdDiscontinueCancelCols>();
      let objDiscontinueReason: ObservableCollection<CListItem> = null;
      let objCancelReason: ObservableCollection<CListItem> = null;
      let objDiscontinueCancelReason: ObservableCollection<CListItem> = null;
      this.getDomainComboValues(
        <List<CListItem>>args.Result,
        (o1) => {
          objDiscontinueReason = o1;
        },
        (o2) => {
          objCancelReason = o2;
        },
        (o3) => {
          objDiscontinueCancelReason = o3;
        }
      );
      this.objSelectedData.forEach((oSelectedItem) => {
        this.GrdData.Add(
          this.getDisCancelReason(
            oSelectedItem,
            objDiscontinueReason,
            objCancelReason,
            objDiscontinueCancelReason
          )
        );
      });
      let SUPPLEMENTFLAG: string = String.Empty;
      MedicationPrescriptionHelper.GetDrugBasicInfo(
        this.getSelectedManagePrescItemOIDs(),
        (s, e) => {
          this.objService_GetDrugBasicInfoCompleted(s, e);
        }
      );
    }
  }
  constructor(objData: ObservableCollection<SelectedPrescriptionItemVM>) {
    super();
    that = this;
    this.objSelectedData = objData;
    let profile: ProfileFactoryType = new ProfileFactoryType();
    if (MedicationCommonProfileData.PrescribeConfig == null) {
      profile.OnProfileLoaded = (s, e) => {
        this.profile_OnProfileLoaded(s, e);
      };
      profile.GetProfile<PrescribingConfigData>('VW_MEDICONFIG', 'PRESCONFIG');
    } else {
      this.SetProfileData();
    }
  }
  profile_OnProfileLoaded(sender: Object, Result: IProfileProp): void {
    if (Result != null) {
      if (Result.Profile instanceof PrescribingConfigData) {
        MedicationCommonProfileData.PrescribeConfig =
          ObjectHelper.CreateType<PrescribingConfigData>(
            Result.Profile,
            PrescribingConfigData
          );
        if (MedicationCommonProfileData.PrescribeConfig != null)
          this.SetProfileData();
      }
    }
  }
  SlotCharacteristicsConfig_OnProfileLoaded(
    sender: Object,
    Result: IProfileProp
  ): void {
    if (Result != null) {
      if (Result.Profile instanceof CSlotCharacteristicsConfig) {
        MedicationCommonProfileData.SlotCharacteristicsConfig =
          ObjectHelper.CreateType<CSlotCharacteristicsConfig>(
            Result.Profile,
            CSlotCharacteristicsConfig
          );
      }
      if (
        MedicationCommonProfileData.SlotCharacteristicsConfig instanceof
          CSlotCharacteristicsConfig &&
        MedicationCommonProfileData.SlotCharacteristicsConfig != null
      ) {
        if (
          MedicationCommonProfileData.SlotCharacteristicsConfig
            .DuenessThreshold > 0
        ) {
          MedChartData.DuenessThreshold = CommonBB.ConvertHourstoMinutes(
            MedicationCommonProfileData.SlotCharacteristicsConfig
              .DuenessThreshold
          );
        }
      }
      this.GetDrugAdminStatus();
    }
  }
  GetDrugAdminStatus(): void {
    let objService: IPPMAManagePrescSer.IPPMAManagePrescriptionWSSoapClient =
      new IPPMAManagePrescSer.IPPMAManagePrescriptionWSSoapClient();
    objService.IsDrugAdminStartedCompleted = (s, e) => {
      this.objService_IsDrugAdminStartedCompleted(s, e);
    };
    let objRequest: IPPMAManagePrescSer.CReqMsgIsDrugAdminStarted =
      new IPPMAManagePrescSer.CReqMsgIsDrugAdminStarted();
    objRequest.oContextInformation = CommonBB.FillContext();
    objRequest.DrugItemOIDsBC = this.getSelectedIPPMAManagePrescItemOIDs();
    objRequest.DuenessThresholdBC = MedChartData.DuenessThreshold;
    objRequest.ActionCACodeBC = String.Empty;
    objRequest.nPatientOIDBC = PatientContext.PatientOID;
    objService.IsDrugAdminStartedAsync(objRequest);
  }
  objService_IsDrugAdminStartedCompleted(
    sender: Object,
    e: IPPMAManagePrescSer.IsDrugAdminStartedCompletedEventArgs
  ): void {
    let _ErrorID: number = 80000050;
    let _ErrorSource: string =
      'LorAppManagePrescriptionBBUi.dll, Class:DiscontinuecancelVM, Method:objService_IsDrugAdminStartedCompleted()';
    let objResponse: IPPMAManagePrescSer.CResMsgIsDrugAdminStarted = e.Result;
    if (objResponse != null && e.Error == null) {
      try {
        if (
          objResponse.oDrugAdminStatusOuputData != null &&
          objResponse.oDrugAdminStatusOuputData.Count > 0
        ) {
          this.lstDrugItemAdminStatus = objResponse.oDrugAdminStatusOuputData;
          ProcessRTE.GetValuesByDomainCode('MEDCANDISCNTRSN', (s, e) => {
            this.OnRTEResult(s);
          });
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
  }
  objService_GetDrugBasicInfoCompleted(
    sender: Object,
    e: GetDrugBasicInfoCompletedEventArgs
  ): void {
    let _ErrorID: number = 80000049;
    let _ErrorSource: string =
      'LorAppManagePrescriptionBBUi.dll, Class:Discontinuecancelvm, Method:objService_GetDrugBasicInfoCompleted()';
    let objResponse: CResMsgGetDrugBasicInfo = e.Result;
    if (objResponse != null && e.Error == null) {
      try {
        if (objResponse.ItemDetail != null) {
          for (
            let nCnt: number = 0;
            nCnt < objResponse.ItemDetail.Count;
            nCnt++
          ) {
            for(let i=0; i< this.GrdData.Count; i++){
              let oSelectedItem: GrdDiscontinueCancelCols = this.GrdData[i];
           
              if (
                objResponse.ItemDetail[nCnt].OID ==
                oSelectedItem.PrescriptionItemOID
              ) {
                oSelectedItem.SNOMEDCode =
                  objResponse.ItemDetail[nCnt].SNOMEDCode;
                oSelectedItem.SNOMEDTerm = MedicationCommonBB.GetSnomedTerm(
                  oSelectedItem.SNOMEDCode
                );
                break;
              }
              }
          }
          let cnt = objResponse.ItemDetail.Where((x) =>
            String.Equals(
              x.CurrentDispenseStatus,
              CConstants.DispStIssued,
              StringComparison.InvariantCultureIgnoreCase
            )
          ).ToList();
          if (
            String.Equals(
              PatientContext.PrescriptionType,
              PrescriptionTypes.Outpatient,
              StringComparison.InvariantCultureIgnoreCase
            ) &&
            cnt != null &&
            cnt.Count > 0
          ) {
            this.IsAlreadyDispensed = true;
          }
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
  }
  getDisCancelReason(
    oSelectedItem: SelectedPrescriptionItemVM,
    objDiscontinueReason: ObservableCollection<CListItem>,
    objCancelReason: ObservableCollection<CListItem>,
    objDiscontinueCancelReason: ObservableCollection<CListItem>
  ): GrdDiscontinueCancelCols {
    let _ClrkFrmVwrDefBehr:ClerkFormViewDeftBehaviour = ClerkFormViewDeftBehaviour.None;
	if(String.Compare(
            PatientContext.PrescriptionType,
            PrescriptionTypes.Clerking,
            StringComparison.OrdinalIgnoreCase
          )==0)
	{
		_ClrkFrmVwrDefBehr = PatientContext.ClerkFormViewDefaultBehavior;
	}
    let grdDisCancel: GrdDiscontinueCancelCols = new GrdDiscontinueCancelCols();
    if (oSelectedItem != null) {
      grdDisCancel.PrescriptionItemOID = oSelectedItem.PrescriptionItemOID;
      grdDisCancel.PrescriptionItemName = oSelectedItem.PrescriptionItem;
      grdDisCancel.PrescriberOBHName = oSelectedItem.PrescriberOBHName;
      grdDisCancel.PrescriberOBHOID = oSelectedItem.PrescriberOBHOID;
      grdDisCancel.ParentPrescriptionItemOID =
        oSelectedItem.ParentprescriptionItemOID;
      grdDisCancel.InfusionItemsequenceNo = oSelectedItem.InfusionItemSeqNo;
      grdDisCancel.GPConnectID = oSelectedItem.GPConnectID;
      grdDisCancel.StartDTTM = oSelectedItem.StartDTTM;
      if (oSelectedItem.ItemSubType == 'CC_MULCMPNTITM') {
        let sMCIToolTip: string = '';
        grdDisCancel.IsMciEnable = Visibility.Visible;
        if (!String.IsNullOrEmpty(oSelectedItem.mCIItemDisplay))
          sMCIToolTip = DiscontinueCancelVM.GetMCIToolTip(
            oSelectedItem.mCIItemDisplay
          );
        grdDisCancel.strMciTooltip = sMCIToolTip;
      } else {
        grdDisCancel.IsMciEnable = Visibility.Collapsed;
      }
      if (oSelectedItem.IsHold == true) {
        grdDisCancel.Reason = objCancelReason;
      } else if (

        _ClrkFrmVwrDefBehr !=
          ClerkFormViewDeftBehaviour.LaunchFormMandatory &&
        (String.Compare(
          PatientContext.PrescriptionType,
          PrescriptionTypes.Inpatient,
          StringComparison.InvariantCultureIgnoreCase
        ) == 0 ||
          String.Compare(
            PatientContext.PrescriptionType,
            PrescriptionTypes.ForAdministration,
            StringComparison.InvariantCultureIgnoreCase
          ) == 0)
      ) {
        let isAdminStart: boolean = false;
        let IsInfusionStartDTTMReached: boolean = false;
        if (
          this.lstDrugItemAdminStatus != null &&
          this.lstDrugItemAdminStatus.Count > 0
        ) {
          let oDrugItemAdmins = this.lstDrugItemAdminStatus
            .Where(
              (oDrugItem) => oDrugItem.OID == oSelectedItem.PrescriptionItemOID
            )
            .Select((oDrugItem) => oDrugItem);
          if (oDrugItemAdmins != null && oDrugItemAdmins.Count() > 0) {
            let oDrugItemAdmin = oDrugItemAdmins.First();
            if (oDrugItemAdmin != null && oDrugItemAdmin.IsAdministered) {
              isAdminStart = true;
              grdDisCancel.IsAdminiStrated = true;
            } else {
              grdDisCancel.IsAdminiStrated = false;
            }
          }
        }
        if (
          !String.IsNullOrEmpty(oSelectedItem.InfusionType) &&
          String.Compare(
            oSelectedItem.InfusionType,
            InfusionTypeCode.INTERMITTENT,
            StringComparison.CurrentCultureIgnoreCase
          ) == 0 &&
          oSelectedItem.InfInterMitScheduleDTTMs != null &&
          oSelectedItem.InfInterMitScheduleDTTMs.Count > 0 &&
          this.CanDisDueNowSlotForInfIntermittent(
            oSelectedItem.InfInterMitScheduleDTTMs
          )
        ) {
          IsInfusionStartDTTMReached = true;
        }
        if (isAdminStart || IsInfusionStartDTTMReached)
          grdDisCancel.Reason = objDiscontinueReason;
        else grdDisCancel.Reason = objDiscontinueCancelReason;
      } else {
        grdDisCancel.Reason = objDiscontinueCancelReason;
      }
    }
    return grdDisCancel;
  }
  CanDisDueNowSlotForInfIntermittent(
    oAdminScheduleTime: ObservableCollection<DateTime>
  ): boolean {
    let dtCurrent: DateTime = CommonBB.GetServerDateTime();
    if (oAdminScheduleTime != null && oAdminScheduleTime.Count > 0) {
      let DataDueNowSlot = oAdminScheduleTime
        .Where(
          (oSlotDateTime) =>
            oSlotDateTime.AddMinutes(-MedChartData.DuenessThreshold) <=
              dtCurrent ||
            dtCurrent >= oSlotDateTime.AddMinutes(MedChartData.DuenessThreshold)
        )
        .Select((oSlotDateTime) => oSlotDateTime);
      if (DataDueNowSlot != null && DataDueNowSlot.Count() > 0) {
        return true;
      }
    }
    return false;
  }
  // getDomainComboValues(
  //   oResponseoObject: List<CListItem>,
  //   out1: (objDiscontinueReason: ObservableCollection<CListItem>) => void,
  //   out2: (objCancelReason: ObservableCollection<CListItem>) => void,
  //   out3: (objDiscontinueCancelReason: ObservableCollection<CListItem>) => void
  // ): void {
  //   let objDiscontinueReason: ObservableCollection<CListItem>;
  //   let objCancelReason: ObservableCollection<CListItem>;
  //   let objDiscontinueCancelReason: ObservableCollection<CListItem>;
  //   objDiscontinueReason = new ObservableCollection<CListItem>();
  //   objCancelReason = new ObservableCollection<CListItem>();
  //   objDiscontinueCancelReason = new ObservableCollection<CListItem>();
  //   oResponseoObject.forEach((oCListItem) => {
  //     if (
  //       (PatientContext.ClerkFormViewDefaultBehavior !=
  //         ClerkFormViewDeftBehaviour.LaunchFormMandatory &&
  //         String.Compare(
  //           PatientContext.PrescriptionType,
  //           PrescriptionTypes.ForAdministration,
  //           StringComparison.OrdinalIgnoreCase
  //         ) == 0) ||
  //       String.Compare(
  //         PatientContext.PrescriptionType,
  //         PrescriptionTypes.Outpatient,
  //         StringComparison.OrdinalIgnoreCase
  //       ) == 0 ||
  //       (PatientContext.ClerkFormViewDefaultBehavior !=
  //         ClerkFormViewDeftBehaviour.LaunchFormMandatory &&
  //         String.Compare(
  //           PatientContext.PrescriptionType,
  //           PrescriptionTypes.Inpatient,
  //           StringComparison.OrdinalIgnoreCase
  //         ) == 0) ||
  //       String.Compare(
  //         PatientContext.PrescriptionType,
  //         PrescriptionTypes.Leave,
  //         StringComparison.OrdinalIgnoreCase
  //       ) == 0
  //     ) {
  //       if (
  //         String.Compare(
  //           oCListItem.Value,
  //           'CC_WTHOLDUNTLDSCHRG',
  //           StringComparison.OrdinalIgnoreCase
  //         ) != 0 &&
  //         String.Compare(
  //           oCListItem.Value,
  //           'CC_MEDTEMPLYSUSPEND',
  //           StringComparison.OrdinalIgnoreCase
  //         ) != 0 &&
  //         String.Compare(
  //           oCListItem.Value,
  //           'CC_MEDPATDIFFICULTY',
  //           StringComparison.OrdinalIgnoreCase
  //         ) != 0
  //       ){
  //         objDiscontinueCancelReason.Add(oCListItem);
  //       }
  //     }
  //     if (
  //       String.Compare(
  //         oCListItem.Value,
  //         'CC_PRESINERR',
  //         StringComparison.InvariantCultureIgnoreCase
  //       ) == 0 ||
  //       String.Compare(
  //         oCListItem.Value,
  //         'CC_MEDENTEREDINERROR',
  //         StringComparison.InvariantCultureIgnoreCase
  //       ) == 0
  //     ) {
  //       if (
  //         String.Compare(oCListItem.Value,'CC_WTHOLDUNTLDSCHRG',StringComparison.OrdinalIgnoreCase) != 0 &&
  //         String.Compare(oCListItem.Value,'CC_MEDTEMPLYSUSPEND',
  //           StringComparison.OrdinalIgnoreCase
  //         ) != 0 &&
  //         String.Compare(
  //           oCListItem.Value,
  //           'CC_MEDPATDIFFICULTY',
  //           StringComparison.OrdinalIgnoreCase
  //         ) != 0
  //       ){
  //         objCancelReason.Add(oCListItem);
  //       }
  //       if (
  //         PatientContext.ClerkFormViewDefaultBehavior ==
  //           ClerkFormViewDeftBehaviour.LaunchFormMandatory ||
  //         String.Compare(
  //           PatientContext.PrescriptionType,
  //           PrescriptionTypes.Clerking,
  //           StringComparison.OrdinalIgnoreCase
  //         ) == 0 ||
  //         String.Compare(
  //           PatientContext.PrescriptionType,
  //           PrescriptionTypes.Discharge,
  //           StringComparison.OrdinalIgnoreCase
  //         ) == 0
  //       ) {
  //         if (
  //           String.Compare(
  //             oCListItem.Value,
  //             'CC_WTHOLDUNTLDSCHRG',
  //             StringComparison.OrdinalIgnoreCase
  //           ) != 0 &&
  //           String.Compare(
  //             oCListItem.Value,
  //             'CC_MEDTEMPLYSUSPEND',
  //             StringComparison.OrdinalIgnoreCase
  //           ) != 0 &&
  //           String.Compare(
  //             oCListItem.Value,
  //             'CC_MEDPATDIFFICULTY',
  //             StringComparison.OrdinalIgnoreCase
  //           ) != 0
  //         ){
  //           objDiscontinueCancelReason.Add(oCListItem);
  //         }
  //       }
  //     } else {
  //       if (
  //         (PatientContext.ClerkFormViewDefaultBehavior !=
  //           ClerkFormViewDeftBehaviour.LaunchFormMandatory &&
  //           String.Compare(
  //             PatientContext.PrescriptionType,
  //             PrescriptionTypes.ForAdministration,
  //             StringComparison.OrdinalIgnoreCase
  //           ) == 0) ||
  //         String.Compare(
  //           PatientContext.PrescriptionType,
  //           PrescriptionTypes.Outpatient,
  //           StringComparison.OrdinalIgnoreCase
  //         ) == 0 ||
  //         (PatientContext.ClerkFormViewDefaultBehavior !=
  //           ClerkFormViewDeftBehaviour.LaunchFormMandatory &&
  //           String.Compare(
  //             PatientContext.PrescriptionType,
  //             PrescriptionTypes.Inpatient,
  //             StringComparison.OrdinalIgnoreCase
  //           ) == 0) ||
  //         String.Compare(
  //           PatientContext.PrescriptionType,
  //           PrescriptionTypes.Leave,
  //           StringComparison.OrdinalIgnoreCase
  //         ) == 0
  //       )
  //         if (
  //           String.Compare(
  //             oCListItem.Value,
  //             'CC_WTHOLDUNTLDSCHRG',
  //             StringComparison.OrdinalIgnoreCase
  //           ) != 0 &&
  //           String.Compare(
  //             oCListItem.Value,
  //             'CC_MEDTEMPLYSUSPEND',
  //             StringComparison.OrdinalIgnoreCase
  //           ) != 0 &&
  //           String.Compare(
  //             oCListItem.Value,
  //             'CC_MEDPATDIFFICULTY',
  //             StringComparison.OrdinalIgnoreCase
  //           ) != 0
  //         ){
  //           objDiscontinueReason.Add(oCListItem);
  //         }
  //     }
  //   });

  //   out1(objDiscontinueReason);
  //   out2(objCancelReason);
  //   out3(objDiscontinueCancelReason);
  // }

  getDomainComboValues(
    oResponseoObject: List<CListItem>,
    out1: (objDiscontinueReason: ObservableCollection<CListItem>) => void,
    out2: (objCancelReason: ObservableCollection<CListItem>) => void,
    out3: (objDiscontinueCancelReason: ObservableCollection<CListItem>) => void
  ): void {
    let objDiscontinueReason: ObservableCollection<CListItem>;
    let objCancelReason: ObservableCollection<CListItem>;
    let objDiscontinueCancelReason: ObservableCollection<CListItem>;
    objDiscontinueReason = new ObservableCollection<CListItem>();
    objCancelReason = new ObservableCollection<CListItem>();
    objDiscontinueCancelReason = new ObservableCollection<CListItem>();
	//Mani - Reason combo values issue
	let _ClrkFrmVwrDefBehr:ClerkFormViewDeftBehaviour = ClerkFormViewDeftBehaviour.None;
	if(String.Compare(
            PatientContext.PrescriptionType,
            PrescriptionTypes.Clerking,
            StringComparison.OrdinalIgnoreCase
          )==0)
	{
		_ClrkFrmVwrDefBehr = PatientContext.ClerkFormViewDefaultBehavior;
	}

    oResponseoObject.forEach((oCListItem) => {
      if (
        (_ClrkFrmVwrDefBehr !=
          ClerkFormViewDeftBehaviour.LaunchFormMandatory &&
          String.Compare(
            PatientContext.PrescriptionType,
            PrescriptionTypes.ForAdministration,
            StringComparison.OrdinalIgnoreCase
          ) == 0) ||
        String.Compare(
          PatientContext.PrescriptionType,
          PrescriptionTypes.Outpatient,
          StringComparison.OrdinalIgnoreCase
        ) == 0 ||
        (_ClrkFrmVwrDefBehr !=
          ClerkFormViewDeftBehaviour.LaunchFormMandatory &&
          String.Compare(
            PatientContext.PrescriptionType,
            PrescriptionTypes.Inpatient,
            StringComparison.OrdinalIgnoreCase
          ) == 0) ||
        String.Compare(
          PatientContext.PrescriptionType,
          PrescriptionTypes.Leave,
          StringComparison.OrdinalIgnoreCase
        ) == 0
      ) {
        if (
          String.Compare(
            oCListItem.Value,
            'CC_WTHOLDUNTLDSCHRG',
            StringComparison.OrdinalIgnoreCase
          ) != 0 &&
          String.Compare(
            oCListItem.Value,
            'CC_MEDTEMPLYSUSPEND',
            StringComparison.OrdinalIgnoreCase
          ) != 0 &&
          String.Compare(
            oCListItem.Value,
            'CC_MEDPATDIFFICULTY',
            StringComparison.OrdinalIgnoreCase
          ) != 0
        )
          objDiscontinueCancelReason.Add(oCListItem);
      }
      if (
        String.Compare(
          oCListItem.Value,
          'CC_PRESINERR',
          StringComparison.InvariantCultureIgnoreCase
        ) == 0 ||
        String.Compare(
          oCListItem.Value,
          'CC_MEDENTEREDINERROR',
          StringComparison.InvariantCultureIgnoreCase
        ) == 0
      ) {
        if (
          String.Compare(
            oCListItem.Value,
            'CC_WTHOLDUNTLDSCHRG',
            StringComparison.OrdinalIgnoreCase
          ) != 0 &&
          String.Compare(
            oCListItem.Value,
            'CC_MEDTEMPLYSUSPEND',
            StringComparison.OrdinalIgnoreCase
          ) != 0 &&
          String.Compare(
            oCListItem.Value,
            'CC_MEDPATDIFFICULTY',
            StringComparison.OrdinalIgnoreCase
          ) != 0
        )
          objCancelReason.Add(oCListItem);
        if (
          _ClrkFrmVwrDefBehr ==
            ClerkFormViewDeftBehaviour.LaunchFormMandatory ||
          String.Compare(
            PatientContext.PrescriptionType,
            PrescriptionTypes.Clerking,
            StringComparison.OrdinalIgnoreCase
          ) == 0 ||
          String.Compare(
            PatientContext.PrescriptionType,
            PrescriptionTypes.Discharge,
            StringComparison.OrdinalIgnoreCase
          ) == 0
        ) {
          if (
            String.Compare(
              oCListItem.Value,
              'CC_WTHOLDUNTLDSCHRG',
              StringComparison.OrdinalIgnoreCase
            ) != 0 &&
            String.Compare(
              oCListItem.Value,
              'CC_MEDTEMPLYSUSPEND',
              StringComparison.OrdinalIgnoreCase
            ) != 0 &&
            String.Compare(
              oCListItem.Value,
              'CC_MEDPATDIFFICULTY',
              StringComparison.OrdinalIgnoreCase
            ) != 0
          )
            objDiscontinueCancelReason.Add(oCListItem);
        }
      } else {
        if (
          (_ClrkFrmVwrDefBehr !=
            ClerkFormViewDeftBehaviour.LaunchFormMandatory &&
            String.Compare(
              PatientContext.PrescriptionType,
              PrescriptionTypes.ForAdministration,
              StringComparison.OrdinalIgnoreCase
            ) == 0) ||
          String.Compare(
            PatientContext.PrescriptionType,
            PrescriptionTypes.Outpatient,
            StringComparison.OrdinalIgnoreCase
          ) == 0 ||
          (_ClrkFrmVwrDefBehr !=
            ClerkFormViewDeftBehaviour.LaunchFormMandatory &&
            String.Compare(
              PatientContext.PrescriptionType,
              PrescriptionTypes.Inpatient,
              StringComparison.OrdinalIgnoreCase
            ) == 0) ||
          String.Compare(
            PatientContext.PrescriptionType,
            PrescriptionTypes.Leave,
            StringComparison.OrdinalIgnoreCase
          ) == 0
        )
          if (
            String.Compare(
              oCListItem.Value,
              'CC_WTHOLDUNTLDSCHRG',
              StringComparison.OrdinalIgnoreCase
            ) != 0 &&
            String.Compare(
              oCListItem.Value,
              'CC_MEDTEMPLYSUSPEND',
              StringComparison.OrdinalIgnoreCase
            ) != 0 &&
            String.Compare(
              oCListItem.Value,
              'CC_MEDPATDIFFICULTY',
              StringComparison.OrdinalIgnoreCase
            ) != 0
          )
            objDiscontinueReason.Add(oCListItem);
      }
      
    });
      out1(objDiscontinueReason);
    out2(objCancelReason);
    out3(objDiscontinueCancelReason);
  }

 

    
  getSelectedManagePrescItemOIDs(): ArrayOfLong {
    let nDrugOID: ArrayOfLong = new ArrayOfLong();
    let PRESCRIPTIONITEMOIDS: string = String.Empty;
    this.objSelectedData.forEach((oSelectedItem) => {
      PRESCRIPTIONITEMOIDS =
        PRESCRIPTIONITEMOIDS +
        oSelectedItem.PrescriptionItemOID.ToString() +
        ',';
    });
    PRESCRIPTIONITEMOIDS = PRESCRIPTIONITEMOIDS.TrimEnd(',');
    let sDrugOID: string[] = PRESCRIPTIONITEMOIDS.Split(',');
    if (sDrugOID.length > 0) {
      let nValidOID: number = 0;
      sDrugOID.forEach((sOID) => {
        let isValid: boolean = Number.TryParse(sOID, (o) => {
          nValidOID = o;
        });
        if (isValid) {
          if (!nDrugOID.Contains(nValidOID)) nDrugOID.Add(nValidOID);
        }
      });
    }
    return nDrugOID;
  }
  getSelectedIPPMAManagePrescItemOIDs(): IPPMAManagePrescSer.ArrayOfLong {
    let nDrugOID: IPPMAManagePrescSer.ArrayOfLong =
      new IPPMAManagePrescSer.ArrayOfLong();
    let PRESCRIPTIONITEMOIDS: string = String.Empty;
    this.objSelectedData.forEach((oSelectedItem) => {
      PRESCRIPTIONITEMOIDS =
        PRESCRIPTIONITEMOIDS +
        oSelectedItem.PrescriptionItemOID.ToString() +
        ',';
    });
    PRESCRIPTIONITEMOIDS = PRESCRIPTIONITEMOIDS.TrimEnd(',');
    let sDrugOID: string[] = PRESCRIPTIONITEMOIDS.Split(',');
    if (sDrugOID.length > 0) {
      let nValidOID: number = 0;
      sDrugOID.forEach((sOID) => {
        let isValid: boolean = Number.TryParse(sOID, (o) => {
          nValidOID = o;
        });
        if (isValid) {
          if (!nDrugOID.Contains(nValidOID)) nDrugOID.Add(nValidOID);
        }
      });
    }
    return nDrugOID;
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
  public GetOmittedItemInOSS(): void {
    if (
      this.objSelectedData != null &&
      this.objSelectedData.Count > 0 &&
      this.objSelectedData.Any(
        (x) => x.NonIVGroupSequenceNo > 0 && x.NonIVItemSequenceNo > 0
      )
    ) {
      let objService: IPPMAManagePrescSer.IPPMAManagePrescriptionWSSoapClient =
        new IPPMAManagePrescSer.IPPMAManagePrescriptionWSSoapClient();
      // objService.GetOmittedItemsListCompleted -= objService_GetOmittedItemsListCompleted;
      objService.GetOmittedItemsListCompleted = (s, e) => {
        this.objService_GetOmittedItemsListCompleted(s, e);
      };
      let objRequest: IPPMAManagePrescSer.CReqMsgGetOmittedItemsList =
        new IPPMAManagePrescSer.CReqMsgGetOmittedItemsList();
      objRequest.oContextInformation = CommonBB.FillContext();
      let sPresItemOIDs: string = String.Join(
        ',',
        this.objSelectedData.Select((c) => c.PrescriptionItemOID).ToArray()
      );
      objRequest.sPrescriptionItemOIDsBC = sPresItemOIDs;
      objService.GetOmittedItemsListAsync(objRequest);
      Busyindicator.SetStatusBusy('OmittedItems');
    }
  }
  private objService_GetOmittedItemsListCompleted(
    sender: Object,
    e: IPPMAManagePrescSer.GetOmittedItemsListCompletedEventArgs
  ): void {
    let _ErrorID: number = 80000050;
    let _ErrorSource: string =
      'LorAppManagePrescriptionBBUi.dll, Class:DiscontinuecancelVM, Method:objService_GetOmittedItemsListCompleted()';
    let objResponse: IPPMAManagePrescSer.CResMsgGetOmittedItemsList =
      e != null && e.Result != null ? e.Result : null;
    if (objResponse != null && e.Error == null) {
      try {
        if (
          objResponse.oIPPPresItemOmittedInfo != null &&
          objResponse.oIPPPresItemOmittedInfo.Count > 0
        ) {
          let oIPPPresItemOmittedInfo: IPPMAManagePrescSer.IPPPresItemOmittedInfo[] =
            objResponse.oIPPPresItemOmittedInfo.ToArray();
          this.ProcessingOSSSequentialOmitMsg(oIPPPresItemOmittedInfo);
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
    Busyindicator.SetStatusIdle('OmittedItems');
  }
  public ProcessingOSSSequentialOmitMsg(
    oIPPPresItemOmittedInfo: IPPMAManagePrescSer.IPPPresItemOmittedInfo[]
  ): void {
    let lstPresOmittedItemInfo: List<PresOmittedItemInfo> =
      new List<PresOmittedItemInfo>();
    if (
      oIPPPresItemOmittedInfo != null &&
      oIPPPresItemOmittedInfo.Count() > 0 &&
      this.objSelectedData != null &&
      this.objSelectedData.Count > 0
    ) {
      let nCount: number = oIPPPresItemOmittedInfo.Count();
      for (let i: number = 0; i < nCount; i++) {
        let oPresOmittedItemInfo: PresOmittedItemInfo =
          new PresOmittedItemInfo();
        oPresOmittedItemInfo.GroupSequenceNo =
          oIPPPresItemOmittedInfo[i].GroupSequenceNo;
        oPresOmittedItemInfo.ItemSequenceNo =
          oIPPPresItemOmittedInfo[i].ItemSequenceNo;
        oPresOmittedItemInfo.OmittedPresItemOID =
          oIPPPresItemOmittedInfo[i].OmittedPresItemOID;
        lstPresOmittedItemInfo.Add(oPresOmittedItemInfo);
      }
      if (lstPresOmittedItemInfo != null && lstPresOmittedItemInfo.Count > 0) {
        this.objSelectedData.ForEach((ReInsert) => {
          if (
            ReInsert.NonIVGroupSequenceNo > 0 &&
            lstPresOmittedItemInfo.Any(
              (a) => a.GroupSequenceNo == ReInsert.NonIVGroupSequenceNo
            )
          ) {
            if (!ReInsert.IsOmittedSeqItem) {
              ReInsert.IsOmittedSeqItem = lstPresOmittedItemInfo.Any(
                (x) => x.OmittedPresItemOID == ReInsert.PrescriptionItemOID
              );
            }
            if (!ReInsert.IsOmittedSeqItem) {
              ReInsert.IsShowOmitMessageInSeq = lstPresOmittedItemInfo.Any(
                (c) => c.ItemSequenceNo > ReInsert.NonIVItemSequenceNo
              );
            }
            lstPresOmittedItemInfo.ForEach((ReAssign) => {
              if (ReAssign.OmittedPresItemOID == ReInsert.PrescriptionItemOID) {
                ReAssign.DisCancelOmitPrescItem = true;
              }
            });
          }
        });
        let UnselectPrescOmittedItems = lstPresOmittedItemInfo
          .Where((o) => !o.DisCancelOmitPrescItem)
          .Select((s) => s)
          .ToList();
        if (
          UnselectPrescOmittedItems != null &&
          UnselectPrescOmittedItems.Count > 0
        ) {
          let PrescOmittedItemgrps = UnselectPrescOmittedItems.GroupBy(
            (g) => g.GroupSequenceNo
          ).ToList();
          if (PrescOmittedItemgrps != null && PrescOmittedItemgrps.Count > 0) {
            let nPrescOmitItemCount: number = PrescOmittedItemgrps.Count;
            for (let j: number = 0; j < nPrescOmitItemCount; j++) {
              this.objSelectedData.ForEach((OmitItem) => {
                if (
                  OmitItem.IsOmittedSeqItem &&
                  OmitItem.NonIVGroupSequenceNo == PrescOmittedItemgrps[j].Key
                ) {
                  OmitItem.IsOmittedSeqItem = false;
                  OmitItem.IsShowOmitMessageInSeq = true;
                }
              });
            }
          }
        }
      }
    }
  }
}
export class GrdDiscontinueCancelCols extends ViewModelBase {
  public PrescriptionItemOID: number = 0;
  public PrescriptionItemName: string;
  public PrescriberOBHName: string;
  public PrescriberOBHOID: number = 0;
  public ParentPrescriptionItemOID: number = 0;
  private _isMciEnable: Visibility = Visibility.Collapsed;
  public get IsMciEnable(): Visibility {
    return this._isMciEnable;
  }
  public set IsMciEnable(value: Visibility) {
    this._isMciEnable = value;
    //NotifyPropertyChanged("IsMciEnable");
  }
  private _strTooltip: string;
  public get strMciTooltip(): string {
    return this._strTooltip;
  }
  public set strMciTooltip(value: string) {
    this._strTooltip = value;
    //super.NotifyPropertyChanged("strMciTooltip");
  }
  public sAllergyIDs: string;
  private _strreason: string = 'Select reason';
  public get strReason(): string {
    return this._strreason;
  }
  public set strReason(value: string) {
    this._strreason = value;
    //super.NotifyPropertyChanged("strReason");
  }
  private _reason: ObservableCollection<CListItem>;
  public get Reason(): ObservableCollection<CListItem> {
    return this._reason;
  }
  public set Reason(value: ObservableCollection<CListItem>) {
    this._reason = value;
    //super.NotifyPropertyChanged("Reason");
  }
  public OnBehalfOf: CListItem;
  public OnBehalfOfReason: CListItem;
  public CommunicationMode: CListItem;
  private _selectedReason: CListItem;
  public get SelectedReason(): CListItem {
    return this._selectedReason;
  }
  public set SelectedReason(value: CListItem) {
    this._selectedReason = value;
    //super.NotifyPropertyChanged("SelectedReason");
    if (this._selectedReason != null) {
      if (
        (String.Compare(
          PatientContext.PrescriptionType,
          PrescriptionTypes.ForAdministration,
          StringComparison.OrdinalIgnoreCase
        ) == 0 ||
          String.Compare(
            PatientContext.PrescriptionType,
            PrescriptionTypes.Inpatient,
            StringComparison.OrdinalIgnoreCase
          ) == 0) &&
        !String.Equals(
          this._selectedReason.Value,
          'CC_PRESINERR',
          StringComparison.InvariantCultureIgnoreCase
        ) &&
        !String.Equals(
          this._selectedReason.Value,
          'CC_MEDENTEREDINERROR',
          StringComparison.InvariantCultureIgnoreCase
        )
      ) {
        this.Action = 'Discontinue';
      } else {
        this.Action = 'Cancel';
      }
      this.strReason = this._selectedReason.DisplayText;
      if (this.strReason == 'Select reason*') {
        this.ReasonMandatory = true;
      } else if (this.strReason != 'Select reason*') {
        this.ReasonMandatory = false;
      }
    }
  }
  private _reasonMand: boolean = true;
  public get ReasonMandatory(): boolean {
    return this._reasonMand;
  }
  public set ReasonMandatory(value: boolean) {
    if (this._reasonMand != value) {
      this._reasonMand = value;
      if (value) {
        this.ReasonFontSize = 13;
        this.ReasonFontWeight = FontWeights.ExtraBold;
        this.IsMandatoryStarVisible = 'Visible';
      } else {
        this.ReasonFontSize = 11;
        this.ReasonFontWeight = FontWeights.Normal;
        this.IsMandatoryStarVisible = 'Collapsed';
      }
      //NotifyPropertyChanged("ReasonMandatory");
    }
  }
  private _ReasonFontSize: number = 13;
  public get ReasonFontSize(): number {
    return this._ReasonFontSize;
  }
  public set ReasonFontSize(value: number) {
    if (this._ReasonFontSize != value) {
      this._ReasonFontSize = value;
      //NotifyPropertyChanged("ReasonFontSize");
    }
  }
  private _ReasonFontWeight: FontWeight = FontWeights.ExtraBold;
  public get ReasonFontWeight(): FontWeight {
    return this._ReasonFontWeight;
  }
  public set ReasonFontWeight(value: FontWeight) {
    if (this._ReasonFontWeight != value) {
      this._ReasonFontWeight = value;
      //NotifyPropertyChanged("ReasonFontWeight");
    }
  }
  private _IsMandatoryStarVisible: string = 'Visible';
  public get IsMandatoryStarVisible(): string {
    return this._IsMandatoryStarVisible;
  }
  public set IsMandatoryStarVisible(value: string) {
    if (this._IsMandatoryStarVisible != value) {
      this._IsMandatoryStarVisible = value;
      //NotifyPropertyChanged("IsMandatoryStarVisible");
    }
  }
  private _action: string;
  public get Action(): string {
    return this._action;
  }
  public set Action(value: string) {
    this._action = value;
    //super.NotifyPropertyChanged("Action");
  }
  private _snomedterm: string;
  public get SNOMEDTerm(): string {
    return this._snomedterm;
  }
  public set SNOMEDTerm(value: string) {
    this._snomedterm = value;
    //super.NotifyPropertyChanged("SNOMEDTerm");
  }
  private _snomedcode: string;
  public get SNOMEDCode(): string {
    return this._snomedcode;
  }
  public set SNOMEDCode(value: string) {
    this._snomedcode = value;
    //super.NotifyPropertyChanged("SNOMEDCode");
  }
  public InfusionItemsequenceNo: number = 0;
  private _GPConnectID: string;
  public get GPConnectID(): string {
    return this._GPConnectID;
  }
  public set GPConnectID(value: string) {
    this._GPConnectID = value;
  }
  private _IsAdminiStrated: boolean = false;
  public get IsAdminiStrated(): boolean {
    return this._IsAdminiStrated;
  }
  public set IsAdminiStrated(value: boolean) {
    this._IsAdminiStrated = value;
  }
  private _StartDTTM: DateTime = DateTime.MinValue;
  public get StartDTTM(): DateTime {
    return this._StartDTTM;
  }
  public set StartDTTM(value: DateTime) {
    this._StartDTTM = value;
  }
}
export class SelectedPrescriptionItemVM extends ViewModelBase {
  prescriptionItemOID: number = 0;
  public get PrescriptionItemOID(): number {
    return this.prescriptionItemOID;
  }
  public set PrescriptionItemOID(value: number) {
    if (this.prescriptionItemOID != value) {
      this.prescriptionItemOID = value;
      //super.NotifyPropertyChanged("PrescriptionItemOID");
    }
  }
  prescriptionItem: string;
  public get PrescriptionItem(): string {
    return this.prescriptionItem;
  }
  public set PrescriptionItem(value: string) {
    if (this.prescriptionItem != value) {
      this.prescriptionItem = value;
      //super.NotifyPropertyChanged("PrescriptionItem");
    }
  }
  parentprescriptionItemOID: number = 0;
  public get ParentprescriptionItemOID(): number {
    return this.parentprescriptionItemOID;
  }
  public set ParentprescriptionItemOID(value: number) {
    if (this.parentprescriptionItemOID != value) {
      this.parentprescriptionItemOID = value;
      //super.NotifyPropertyChanged("ParentprescriptionItemOID");
    }
  }
  private _isHold: boolean = false;
  public get IsHold(): boolean {
    return this._isHold;
  }
  public set IsHold(value: boolean) {
    if (!ObjectHelper.ReferenceEquals(this._isHold, value)) {
      this._isHold = value;
      //NotifyPropertyChanged("IsHold");
    }
  }
  private _isSeqInfusion: boolean = false;
  public get IsSeqInfusion(): boolean {
    return this._isSeqInfusion;
  }
  public set IsSeqInfusion(value: boolean) {
    if (!ObjectHelper.ReferenceEquals(this._isSeqInfusion, value)) {
      this._isSeqInfusion = value;
      //NotifyPropertyChanged("IsSeqInfusion");
    }
  }
  private _IsInfusion: boolean = false;
  public get IsInfusion(): boolean {
    return this._isSeqInfusion;
  }
  public set IsInfusion(value: boolean) {
    if (!ObjectHelper.ReferenceEquals(this._IsInfusion, value)) {
      this._IsInfusion = value;
      //NotifyPropertyChanged("IsInfusion");
    }
  }
  _InfusionType: string;
  public get InfusionType(): string {
    return this._InfusionType;
  }
  public set InfusionType(value: string) {
    if (this._InfusionType != value) {
      this._InfusionType = value;
      //super.NotifyPropertyChanged("InfusionType");
    }
  }
  _ItemSubType: string;
  public get ItemSubType(): string {
    return this._ItemSubType;
  }
  public set ItemSubType(value: string) {
    if (this._ItemSubType != value) {
      this._ItemSubType = value;
      //super.NotifyPropertyChanged("ItemSubType");
    }
  }
  _StartDTTM: DateTime = DateTime.MinValue;
  public get StartDTTM(): DateTime {
    return this._StartDTTM;
  }
  public set StartDTTM(value: DateTime) {
    if (this._StartDTTM != value) {
      this._StartDTTM = value;
      //super.NotifyPropertyChanged("StartDTTM");
    }
  }
  private _InfInterMitScheduleDTTMs: ObservableCollection<DateTime>;
  public get InfInterMitScheduleDTTMs(): ObservableCollection<DateTime> {
    return this._InfInterMitScheduleDTTMs;
  }
  public set InfInterMitScheduleDTTMs(value: ObservableCollection<DateTime>) {
    this._InfInterMitScheduleDTTMs = value;
    //NotifyPropertyChanged("InfInterMitScheduleDTTMs");
  }
  private _MCIItemDisplay: string;
  public get mCIItemDisplay(): string {
    return this._MCIItemDisplay;
  }
  public set mCIItemDisplay(value: string) {
    if (this._MCIItemDisplay != value) {
      this._MCIItemDisplay = value;
      //super.NotifyPropertyChanged("mCIItemDisplay");
    }
  }
  public InfusionItemSeqNo: number = 0;
  private _GPConnectID: string;
  public get GPConnectID(): string {
    return this._GPConnectID;
  }
  public set GPConnectID(value: string) {
    this._GPConnectID = value;
  }
  private _prescriberOBHName: string;
  public get PrescriberOBHName(): string {
    return this._prescriberOBHName;
  }
  public set PrescriberOBHName(value: string) {
    this._prescriberOBHName = value;
  }
  private _prescriberOBHOID: number = 0;
  public get PrescriberOBHOID(): number {
    return this._prescriberOBHOID;
  }
  public set PrescriberOBHOID(value: number) {
    this._prescriberOBHOID = value;
  }
  private _IsShowOmitMessageInSeq: boolean = false;
  public get IsShowOmitMessageInSeq(): boolean {
    return this._IsShowOmitMessageInSeq;
  }
  public set IsShowOmitMessageInSeq(value: boolean) {
    this._IsShowOmitMessageInSeq = value;
  }
  private _IsOmittedSeqItem: boolean = false;
  public get IsOmittedSeqItem(): boolean {
    return this._IsOmittedSeqItem;
  }
  public set IsOmittedSeqItem(value: boolean) {
    this._IsOmittedSeqItem = value;
  }
  private _NonIVGroupSequenceNo: number = 0;
  public get NonIVGroupSequenceNo(): number {
    return this._NonIVGroupSequenceNo;
  }
  public set NonIVGroupSequenceNo(value: number) {
    this._NonIVGroupSequenceNo = value;
  }
  private _NonIVItemSequenceNo: number = 0;
  public get NonIVItemSequenceNo(): number {
    return this._NonIVItemSequenceNo;
  }
  public set NonIVItemSequenceNo(value: number) {
    this._NonIVItemSequenceNo = value;
  }
}
export class PresOmittedItemInfo {
  public GroupSequenceNo: number = 0;
  public ItemSequenceNo: number = 0;
  public OmittedPresItemOID: number = 0;
  public DisCancelOmitPrescItem: boolean = false;
}
export class RequestandResultVM extends ViewModelBase {
  private oResultInput: ResultInputData;
  //public delegate void CheckResultAssociationCompletedEventArgs(object sender, bool IsResultAssociated);
  public CheckResultAssociationCompletedEvent: Function;
  private objService: ManagePrescriptionWSSoapClient =
    new ManagePrescriptionWSSoapClient();
  private _ResultsView: CCResultMessages[];
  private _resultsTitle: string;
  public get ResultsView(): CCResultMessages[] {
    return this._ResultsView;
  }
  public set ResultsView(value: CCResultMessages[]) {
    this._ResultsView = value;
    //NotifyPropertyChanged("ResultView");
  }
  public get ResultsTitle(): string {
    return this._resultsTitle;
  }
  public set ResultsTitle(value: string) {
    this._resultsTitle = value;
    //NotifyPropertyChanged("ResultsTitle");
  }
  constructor(ResultInput: ResultInputData) {
    super();
    this.oResultInput = ResultInput;
    this._resultsTitle = 'View recent results';
    if (
      this.oResultInput != null &&
      !String.IsNullOrEmpty(this.oResultInput.IdentifyingName)
    ) {
      this.ResultsTitle = String.Concat(
        this._resultsTitle,
        ' of ',
        this.oResultInput.IdentifyingName
      );
    }
    this.GetMedResultConfig();
  }
  private GetMedResultConfig(): void {
    let profile: ProfileFactoryType = new ProfileFactoryType();
    profile.OnProfileLoaded = (s, e) => {
      this.profile_OnProfileLoaded(s, e);
    };
    profile.GetProfile<MedicationResultsViewCount>(
      'VW_MEDICONFIG',
      'MEDRESULTSCONFIG'
    );
  }
  profile_OnProfileLoaded(sender: Object, Result: IProfileProp): void {
    if (Result != null) {
      if (Result.Profile instanceof MedicationResultsViewCount) {
        MedicationCommonProfileData.MedResultConfig =
          ObjectHelper.CreateType<MedicationResultsViewCount>(
            Result.Profile,
            MedicationResultsViewCount
          );
      }
    }
    this.GetRequestandResults();
  }
  public GetRequestandResults(): void {
    let objGetRequestId: CReqMsgGetRequestId = new CReqMsgGetRequestId();
    this.objService.GetRequestIdCompleted = (s, e) => {
      this.objService_GetRequestIdCompleted(s, e);
    };
    this.objService.GetResultsViewCompleted = (s, e) => {
      this.objService_GetResultsViewCompleted(s, e);
    };
    if (
      this.oResultInput != null &&
      this.oResultInput.IdentifyingOID > 0 &&
      !String.IsNullOrEmpty(this.oResultInput.IdentifyingType)
    ) {
      objGetRequestId.IdentifyingIdBC = this.oResultInput.IdentifyingOID;
      objGetRequestId.IdentifyingTypeBC = this.oResultInput.IdentifyingType;
      objGetRequestId.MCVersionBC = this.oResultInput.MCVersion;
      objGetRequestId.oContextInformation = CommonBB.FillContext();
      this.objService.GetRequestIdAsync(objGetRequestId);
    }
  }
  private CreateGridData(
    observableCollection: ObservableCollection<ResultComponentValue>
  ): CCResultMessages[] {
    let result: List<CCResultMessages> = new List<CCResultMessages>();
    let resultdet: List<CCResultDetails> = new List<CCResultDetails>();
    let currentResult: CCResultMessages = null;
    for (
      let nIndex: number = 0;
      nIndex < observableCollection.Count;
      nIndex++
    ) {
      if (currentResult == null) {
        currentResult = new CCResultMessages();
        currentResult.Name = observableCollection[nIndex].ResultItemName;
        currentResult.OID = observableCollection[nIndex].ResultItemID;
        result.Add(currentResult);
      } else if (
        currentResult.OID != observableCollection[nIndex].ResultItemID
      ) {
        currentResult.Results = resultdet.ToArray();
        currentResult = new CCResultMessages();
        currentResult.Name = observableCollection[nIndex].ResultItemName;
        currentResult.OID = observableCollection[nIndex].ResultItemID;
        result.Add(currentResult);
        resultdet.Clear();
      }
      let objResultDetails: CCResultDetails = new CCResultDetails();
      objResultDetails.ParentOID = observableCollection[nIndex].ResultItemID;
      objResultDetails.ReferenceRange =
        observableCollection[nIndex].ReferenceRange;
      objResultDetails.RecordedDate =
        observableCollection[nIndex].ResultEnteredDate.ToShortDateString();
      objResultDetails.ResultValue = observableCollection[nIndex].ResultValue;
      resultdet.Add(objResultDetails);
    }
    if (currentResult != null) {
      currentResult.Results = resultdet.ToArray();
    }
    return result.ToArray();
  }
  objService_GetResultsViewCompleted(
    sender: Object,
    e: GetResultsViewCompletedEventArgs
  ): void {
    if (e.Error != null) return;
    let objGotResults: CResMsgGetResultsView = e.Result;
    if (objGotResults != null && objGotResults.Results != null)
      this.ResultsView = this.CreateGridData(objGotResults.Results);
  }
  objService_GetRequestIdCompleted(
    sender: Object,
    e: GetRequestIdCompletedEventArgs
  ): void {
    if (e.Error != null) return;
    let objGotRequestId: CResMsgGetRequestId = e.Result;
    if (
      objGotRequestId != null &&
      !String.IsNullOrEmpty(objGotRequestId.ResultsId)
    ) {
      this.GetResults(objGotRequestId.ResultsId);
    }
  }
  private GetResults(sResultsId: string): void {
    let objGetResults: CReqMsgGetResultsView = new CReqMsgGetResultsView();
    objGetResults.PatientIdBC = PatientContext.PatientOID.ToString();
    objGetResults.NoOfRowsBC =
      MedicationCommonProfileData.MedResultConfig != null &&
      MedicationCommonProfileData.MedResultConfig.nRecordsCount > 0
        ? MedicationCommonProfileData.MedResultConfig.nRecordsCount
        : 10;
    objGetResults.ResultsIdBC = sResultsId;
    objGetResults.oContextInformation = CommonBB.FillContext();
    this.objService.GetResultsViewAsync(objGetResults);
  }
  public CheckResultAssociation(): void {
    let objReqDrugAssociation: CReqMsgChkResultAssociation =
      new CReqMsgChkResultAssociation();
    let objMessages: CCResultMessages[];
    let objService: ManagePrescriptionWSSoapClient =
      new ManagePrescriptionWSSoapClient();
    objService.ChkResultAssociationCompleted = (s, e) => {
      this.objService_ChkResultAssociationCompleted(s, e);
    };
    if (
      this.oResultInput != null &&
      this.oResultInput.IdentifyingOID > 0 &&
      !String.IsNullOrEmpty(this.oResultInput.IdentifyingType)
    ) {
      objReqDrugAssociation.lnIdentifyingIdBC =
        this.oResultInput.IdentifyingOID;
      objReqDrugAssociation.sIdentifyingTypeBC =
        this.oResultInput.IdentifyingType;
      objReqDrugAssociation.sMCVersionBC = this.oResultInput.MCVersion;
      objReqDrugAssociation.oContextInformation = CommonBB.FillContext();
      objService.ChkResultAssociationAsync(objReqDrugAssociation);
    }
  }
  objService_ChkResultAssociationCompleted(
    sender: Object,
    e: ChkResultAssociationCompletedEventArgs
  ): void {
    if (e.Error != null) return;
    let objResDrugAssociation: CResMsgChkResultAssociation = e.Result;
    let bResult: boolean =
      objResDrugAssociation != null && objResDrugAssociation.bDrugAssociate;
    if (!bResult) {
      iMessageBox.Show(
        'LORENZO',
        'There are no configured result items for this medication item',
        MessageBoxType.Information,
        MessageBoxButton.OK
      );
    }
    if (this.CheckResultAssociationCompletedEvent != null)
      this.CheckResultAssociationCompletedEvent(this, bResult);
  }
}
export class CCResultMessages {
  public OID: number = 0;
  public Name: string;
  public Results: CCResultDetails[];
}
export class CCResultDetails {
  public ParentOID: number = 0;
  public ReferenceRange: string;
  public ResultValue: string;
  public RecordedDate: string;
}
export class ResultInputData {
  public IdentifyingOID: number = 0;
  public IdentifyingType: string;
  public IdentifyingName: string;
  public MCVersion: string;
}
