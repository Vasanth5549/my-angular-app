import { Component, OnInit } from '@angular/core';
import {
  StringBuilder,
  ProfileFactoryType,
  ContextManager,
  Convert,
  AppActivity,
  OnCheckAccessEventArgs,
  SLSecurityAccess,
  ProcessRTE,
  MediatorDataService,
  AppLoadService,
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
  Visibility,
  int64,
  byte,
  List,
  CListItem,
  ObservableCollection,
  HtmlPage,
  ChildWizardCloseEventargs,
  RTEEventargs,
  CValuesetTerm,
} from 'epma-platform/models';
import { AppDialog, EventArgs } from 'epma-platform/controls';
import { HelperService } from 'epma-platform/soapclient';
import 'epma-platform/stringextension';
import DateTime, { DateTimeStyles } from 'epma-platform/DateTime';
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
import { LzoWizardVmbaseService as LzoWizardVMBase } from 'src/app/shared/epma-platform/services/lzo-wizard-vmbase.service';
import { Resource } from '../../resource';
import { UserPermissions } from '../../utilities/ProfileData';
import { PrescriptionHelper } from '../../utilities/PrescriptionHelper';
import { MedicationCommonBB } from 'src/app/lorappmedicationcommonbb/utilities/medicationcommonbb';
import {
  MedicationCommonConceptCodeData,
  MedicationCommonProfileData,
} from 'src/app/lorappmedicationcommonbb/utilities/profiledata';
import { ChartContext, MedChartData } from '../../utilities/globalvariable';
import { MedChartData as CommMedChartData } from 'src/app/lorappmedicationcommonbb/utilities/globalvariable';
import {
  CConstants,
  PrescriptionTypes,
  PrescriptionTypesMenuCode,
} from '../../utilities/CConstants';
import { MedicationPrescriptionHelper } from 'src/app/lorappmedicationcommonbb/utilities/medicationprescriptionhelper';
import {
  AppContextInfo,
  AppSessionInfo,
  ContextInfo,
  PatientContext,
} from 'src/app/lorappcommonbb/utilities/globalvariable';
import { Common } from '../../utilities/common';
import {
  CommonDomainValues,
  WebServiceURLMedicationCommonBB,
} from 'src/app/lorappmedicationcommonbb/utilities/globalvariable';
import { CommonBB } from 'src/app/lorappcommonbb/utilities/common';

import * as ManageAllergy from '../../../shared/epma-platform/soap-client/ManageAllergyWS';
import * as ManagePrescSer from 'src/app/shared/epma-platform/soap-client/ManagePrescriptionWS';
import * as ManageProblem from '../../../shared/epma-platform/soap-client/ManageProblemWS';
import * as QueryInpatient from 'src/app/shared/epma-platform/soap-client/QueryInpatientWS';
import * as IPPMAManagePrescSer from '../../../shared/epma-platform/soap-client/IPPMAManagePrescriptionWS';
import { AMSHelper } from 'src/app/lorappcommonbb/amshelper';
import { ACNode } from 'src/app/shared/epma-platform/controls/epma-iactivityconsideration/epma-iactivityconsideration.component';
import { InjectorInstance } from 'src/app/app.module';

export class PrescriptionChartVM extends LzoWizardVMBase {
  IsActivityConsiderationOpened: boolean = false;
  private sDischargeDTTM: string;
  private sLeaveDTTM: string;
  private sPatientHtWtBSAText: string = String.Empty;
  //public delegate void ReviewInitiateOutcomeDelegate();
  public ReviewInitiateOutcomeCompleted: Function;
  //public delegate void ActivityConsiderationUpdatedDelegate();
  public ActivityConsiderationUpdatedCompleted: Function;
  public _mediatorDataService: MediatorDataService;
  constructor();
  constructor(sTaskOID: string);

  constructor(sTaskOID?: string) {
    super();
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
    switch (arguments.length) {
      case 1:
        super(sTaskOID);
        break;
    }
    this.OnInitialize();
    this.OnInitComplete();
  }
  private _sLastCACode: string = String.Empty;
  public get sLastCACode(): string {
    return this._sLastCACode;
  }
  public set sLastCACode(value: string) {
    this._sLastCACode = value;
  }
  private _sWizardData: string = String.Empty;
  public get sWizardData(): string {
    return this._sWizardData;
  }
  public set sWizardData(value: string) {
    this._sWizardData = value;
    // OnPropertyChanged("sWizardData");
  }
  public iIndex: number;
  public nPatTotCount: number;
  public sTypeExist: string;
  public sPrescriptionDetails: string;
  public sPrinterPolicyValue: string;
  public OnChildWizardClose(args: ChildWizardCloseEventargs): void {
    if (
      !String.IsNullOrEmpty(this.sLastCACode) &&
      String.Compare(this.sLastCACode, 'CNS_PRINT_DOCUMENT') == 0
    ) {
      if (this.nPatTotCount == 0) {
        this.nPatTotCount = this.GetPatTotCount(args.ContextData);
      }
      this.LanuchPrint(args.ContextData);
    }
  }
  public LanuchPrint(sData: string): void {
    if (!String.IsNullOrEmpty(sData)) {
      if (this.iIndex == 1 || this.iIndex <= this.nPatTotCount) {
        sData += '&PrintFromPresChart=TRUE';
        let sReturnData = ObjectHelper.CreateType<string>(
          HtmlPage.Window.Invoke('ManageDocProduction', sData),
          'string'
        );
        this.sLastCACode = 'CNS_PRINT_DOCUMENT';
        this.iIndex++;
        // App.LaunchWizard(this.OnChildWizardClose, "MN_DOC_PRINT", sReturnData);
      }
    }
  }
  public GetDischargeWizardData(): void {
    this.sTypeExist = String.Empty;
    this.sPrescriptionDetails = String.Empty;
    this.sPrinterPolicyValue = String.Empty;
    let arrReturnData: string[] = this.sWizardData.Split('&');
    if (arrReturnData.length > 0) {
      for (let i: number = 0; i < arrReturnData.length; i++) {
        let arrDataValue: string[] = arrReturnData[i].Split('=');
        if (arrDataValue.length == 2) {
          if (
            String.Compare(arrDataValue[0], 'TypeExist') == 0 &&
            !String.IsNullOrEmpty(arrDataValue[1])
          ) {
            this.sTypeExist = arrDataValue[1];
          } else if (
            String.Compare(arrDataValue[0], 'PrescriptionDetails') == 0 &&
            !String.IsNullOrEmpty(arrDataValue[1])
          ) {
            this.sPrescriptionDetails = arrDataValue[1];
          } else if (
            String.Compare(arrDataValue[0], 'PrinterPolicy') == 0 &&
            !String.IsNullOrEmpty(arrDataValue[1])
          ) {
            this.sPrinterPolicyValue = arrDataValue[1];
          }
        }
        if (
          !String.IsNullOrEmpty(this.sTypeExist) &&
          !String.IsNullOrEmpty(this.sPrescriptionDetails) &&
          !String.IsNullOrEmpty(this.sPrinterPolicyValue)
        )
          break;
      }
    }
  }
  public GetPatTotCount(sData: string): number {
    let nPatTotCount: number = 0;
    let arrReturnData: string[] = sData.Split('&');
    if (arrReturnData.length > 0) {
      for (let i: number = 0; i < arrReturnData.length; i++) {
        let arrDataValue: string[] = arrReturnData[i].Split('=');
        if (arrDataValue.length == 2) {
          if (
            String.Compare(arrDataValue[0], 'DTMPatTotCount') == 0 &&
            !String.IsNullOrEmpty(arrDataValue[1])
          ) {
            Number.TryParse(arrDataValue[1], (o) => {
              nPatTotCount = o;
            });
            return nPatTotCount;
          }
        }
      }
    }
    return nPatTotCount;
  }
  public ManageDocProductionInput(): string {
    let sData: string = String.Empty;
    if (!String.IsNullOrEmpty(this.sPrescriptionDetails)) {
      let sPrescriptionArray: string[] = this.sPrescriptionDetails.Split('^');
      let sPrinterPolicy: string = String.Empty;
      let sStationaryType: string = String.Empty;
      let sPresItemOIDs: string = String.Empty;
      let sSectionOID: string = String.Empty;
      let sPrinterOPTS: string = String.Empty;
      let sEncOID: string = String.Empty;
      let sPatOID: string = String.Empty;
      for (let i = 0; i < sPrescriptionArray.length; i++) {
        let sPresItemArray: string[] = sPrescriptionArray[i].Split('~');
        if (
          !String.IsNullOrEmpty(this.sPrinterPolicyValue) &&
          String.Compare(
            this.sPrinterPolicyValue,
            'BOTH',
            StringComparison.CurrentCultureIgnoreCase
          ) == 0 &&
          String.Compare(
            this.sPrinterPolicyValue,
            'MAIN',
            StringComparison.CurrentCultureIgnoreCase
          ) == 0
        ) {
          if (sPrinterPolicy == '') sPrinterPolicy = 'MAINB';
          else sPrinterPolicy += '#' + 'MAINB';
        } else {
          if (sPrinterPolicy == '') sPrinterPolicy = sPresItemArray[0];
          else sPrinterPolicy += '#' + sPresItemArray[0];
        }
        if (sStationaryType == '') sStationaryType = sPresItemArray[1];
        else sStationaryType += '#' + sPresItemArray[1];
        if (sPresItemOIDs == '') sPresItemOIDs = sPresItemArray[2];
        else sPresItemOIDs += '#' + sPresItemArray[2];
        if (sSectionOID == '') sSectionOID = sPresItemArray[2];
        else sSectionOID += '#' + sPresItemArray[2];
        if (sEncOID == '') sEncOID = PatientContext.EncounterOid.ToString();
        else sEncOID += '#' + PatientContext.EncounterOid.ToString();
        if (sPatOID == '') sPatOID = PatientContext.PatientOID.ToString();
        else sPatOID += '#' + PatientContext.PatientOID.ToString();
      }
      sPrinterOPTS = 'True';
      sData +=
        'MenuCode=MN_MEDDISCHRGESL_P2' +
        '&WIZ_Status=FINISH&Prescription=' +
        sPresItemOIDs +
        '&EncounterOID=' +
        sEncOID +
        '&DOCPATOIDS=' +
        sPatOID +
        '&PrinterPolicy=' +
        sPrinterPolicy +
        '&DTMCodes=' +
        sStationaryType +
        '&SECTIONOID=' +
        sSectionOID +
        ' &CngPrnOpt=' +
        sPrinterOPTS;
    }
    return sData;
  }
  public override OnInitialize(): void {
    super.IsButtonCancelVisible = Visibility.Collapsed;
    let arrResourceNames: string[] = [
      'MN_OMIT_SLOT_P2',
      'MN_REINSTATE_SLOT_P2',
      'CA_IPP_ENTER_TITR_P2',
      'MED_BUT_DISCONDRG_P2',
      'MED_BUT_DISCON_OW_P2',
      'MED_BUT_AMEND_P2',
      'MN_MEDINPATSL_P2',
      'MN_MEDDISCHRGESL_P2',
      'MN_MED_VALIDATE_S_P2',
      'MN_MED_VERIFY_SL_P2',
    ];
    SLSecurityAccess.CheckAccess('CA', arrResourceNames, this.MyHandler);
    super.OnInitialize();
  }
  private MyHandler(sender: Object, Result: OnCheckAccessEventArgs): void {
    if (Result.AccResources != null) {
      let nCount: number = Result.AccResources.Length;
      for (let i: number = 0; i < nCount; i++) {
        switch (Result.AccResources[i]) {
          case 'MN_OMIT_SLOT_P2':
            UserPermissions.CanOmitSlots = true;
            break;
          case 'MN_REINSTATE_SLOT_P2':
            UserPermissions.CanReinstateSlots = true;
            break;
          case 'CA_IPP_ENTER_TITR_P2':
            UserPermissions.CanEnterTitratedDose = true;
            break;
          case 'MED_BUT_DISCONDRG_P2':
            UserPermissions.Cancanceldiscontinuedrugs = true;
            break;
          case 'MED_BUT_DISCON_OW_P2':
            UserPermissions.CancanceldiscontinuedOwnrugs = true;
            break;
          case 'MED_BUT_AMEND_P2':
            UserPermissions.CanAmend = true;
            break;
          case 'MN_MEDINPATSL_P2':
            UserPermissions.CanPrescribeInpatient = true;
            UserPermissions.CanReview = true;
            break;
          case 'MN_MEDDISCHRGESL_P2':
            UserPermissions.CanPrescribeDischarge = true;
            break;
          case PrescriptionTypesMenuCode.TechValidate:
            UserPermissions.CanTechnicallyValidate = true;
            break;
          case PrescriptionTypesMenuCode.ClicallyVerifyMenuCode:
            UserPermissions.CanClinicallyVerfiy = true;
            break;
        }
      }
    }
  }
  public override OnInitComplete(): void {
      super.OnInitComplete();
    if (ContextManager.Instance['FRC-001-CHILD'] != null)
      Common.Frc001Childs = ContextManager.Instance['FRC-001-CHILD'].ToString();
    if (ContextManager.Instance['FRC-002-CHILD'] != null)
      Common.Frc002Childs = ContextManager.Instance['FRC-002-CHILD'].ToString();
    if (ContextManager.Instance['FRC-003-CHILD'] != null)
      Common.Frc003Childs = ContextManager.Instance['FRC-003-CHILD'].ToString();
    if (ContextManager.Instance['FRQ-88-CHILD'] != null)
      Common.Frq88Childs = ContextManager.Instance['FRQ-88-CHILD'].ToString();
    let lnPatOID: number, lnEncOID;
    let bFBDUAvailable: boolean = false;
    if (
      !String.IsNullOrEmpty(this.WizardContext['IsOpenReadOnly']) &&
      this.WizardContext['IsOpenReadOnly'] == 'True'
    ) {
      MedChartData.IsPresChartReadOnly = true;
    } else {
      MedChartData.IsPresChartReadOnly = false;
    }
    if (
      !String.IsNullOrEmpty(this.WizardContext['IsDrugRound']) &&
      this.WizardContext['IsDrugRound'] == 'True'
    ) {
      if (
        Number.TryParse(this.WizardContext['PATIENTOID'].ToString(), (o) => {
          lnPatOID = o;
        })
      )
        PatientContext.PatientOID = lnPatOID;
      PatientContext.PatientAge = this.WizardContext['PatientAge'].ToString();
    } else {
      if (
        Number.TryParse(
          ContextManager.Instance['PatientID'].ToString(),
          (o) => {
            lnPatOID = o;
          }
        )
      )
        PatientContext.PatientOID = lnPatOID;
      PatientContext.PatientAge =
        ContextManager.Instance['PatientAge'].ToString();
    }
    if (ContextManager.Instance['IsInfusionON'] != null) {
      PatientContext.IsINFUSIONON = Convert.ToBoolean(
        ContextManager.Instance['IsInfusionON'].ToString()
      );
    } else {
      PatientContext.IsINFUSIONON = true;
    }
    if (
      Number.TryParse(
        ContextManager.Instance['EncounterOID'].ToString(),
        (o) => {
          lnEncOID = o;
        }
      )
    )
      PatientContext.EncounterOid = lnEncOID;
    PatientContext.DOB = ContextManager.Instance['DOB'].ToString();
    PatientContext.Sex = ContextManager.Instance['Sex'].ToString();
    PatientContext.EncounterType =
      ContextManager.Instance['EncounterType'].ToString();
    if (
      PatientContext.EncounterType == String.Empty &&
      !String.IsNullOrEmpty(this.WizardContext['QEncounterType'])
    ) {
      PatientContext.EncounterType = this.WizardContext['QEncounterType'];
    }
    PatientContext.PrescriptionType = this.WizardContext['PrescType'];
    AppContextInfo.OrganisationName =
      ContextManager.Instance['OrganisationName'].ToString();
    AppContextInfo.JobRoleOID =
      ContextManager.Instance['JobRoleOID'].ToString();
    AppContextInfo.RoleProfileName =
      ContextManager.Instance['RoleProfileName'].ToString();
    AppSessionInfo.AMCV = ContextManager.Instance['AMCV'].ToString();
    if (ContextManager.Instance['TeamNames'] != null)
      AppContextInfo.TeamNames =
        ContextManager.Instance['TeamNames'].ToString();
    if (ContextManager.Instance['TeamOIDs'] != null)
      AppContextInfo.TeamOIDs = ContextManager.Instance['TeamOIDs'].ToString();
    ContextInfo.SecurityToken = this.AppContext.SecurityToken;
    AppContextInfo.JobRoleName =
      ContextManager.Instance['JobRoleName'].ToString();
    AppContextInfo.UserName = ContextManager.Instance['UserName'].ToString();
    AppContextInfo.UserOID = ContextManager.Instance['UserOID'].ToString();
    let objUserOid: int64;
    Int64.TryParse(this.AppContext.UserOID, (o) => {
      objUserOid = o;
    });
    ContextInfo.UserOID = objUserOid;
    AppContextInfo.OrganisationOID = this.AppContext.OrganisationOID;
    let objReleaseVer: byte;
    Byte.TryParse(this.AppContext.ReleaseVersion, (o) => {
      objReleaseVer = o;
    });
    ContextInfo.ReleaseVersion = objReleaseVer;
    PatientContext.EncounterCode = this.WizardContext['EncStatus'];
    //MedicationCommonBB.GetConceptCodeValuesByDomains();
    if (
      ContextManager.Instance['FBDU'] != null &&
      String.Compare(ContextManager.Instance['FBDU'].ToString(), 'TRUE') == 0
    )
      bFBDUAvailable = true;
    if (
      bFBDUAvailable &&
        PrescriptionHelper.CheckPermission(
            'OBS_FBView',
            'Can view fluid balance charts'
      )
    )
      UserPermissions.CanViewFBChart = true;
    else UserPermissions.CanViewFBChart = false;
    ProcessRTE.GetValuesByDomainCode('MedSupplystatus', this.OnRTEResult);
  }
  OnRTEResult(args: RTEEventargs): void {
    if (String.IsNullOrEmpty(args.Request) || args.Result == null) return;
    if (
      String.Compare(
        args.Request,
        'MedSupplystatus',
        StringComparison.CurrentCultureIgnoreCase
      ) == 0
    ) {
      if (MedicationCommonConceptCodeData.ViewConceptCodes == null)
        MedicationCommonConceptCodeData.ViewConceptCodes =
          new ObservableCollection<CValuesetTerm>();
      (<List<CListItem>>args.Result).forEach((oCListItem) => {
        MedicationCommonConceptCodeData.ViewConceptCodes.Add(
          ObjectHelper.CreateObject(new CValuesetTerm(), {
            csCode: oCListItem.Value,
            csDescription: oCListItem.DisplayText,
          })
        );
      });
    }
  }
  public override OnFinish(): void {
    this.WizardContext['RequestLockOID'] = MedChartData.MedChartOID > 0 ? Convert.ToString(MedChartData.MedChartOID): Convert.ToString(ChartContext.EncounterOID);
    if (
      !String.IsNullOrEmpty(this.WizardContext['PrintFromPresChart']) && String.Compare(this.WizardContext['PrintFromPresChart'],'TRUE',StringComparison.CurrentCultureIgnoreCase) == 0
    ) {
      this.WizardContext['PrintFromPresChart'] = 'FALSE';
    }
    if (CommMedChartData.IsAllergyRecorded) {
      this.WizardContext['RecAllergy'] = Convert.ToString(
        CommMedChartData.IsAllergyRecorded
      );
      CommMedChartData.IsAllergyRecorded = false;
    }
    if (
      !MedChartData.IsMedChartReadOnly && !String.IsNullOrEmpty(ChartContext.MedchartLaunchLoc) &&
      String.Equals(ChartContext.MedchartLaunchLoc, CConstants.ClinicalIndicator,StringComparison.InvariantCultureIgnoreCase)
    ) {
      let oCommon: Common = new Common();
      oCommon.InvokeDueAndOverDueStatusForClIndicator(
        this.ClinicalIndicatorUpdateSvcCallback
      );
    } else {
      //super.OnCloseCA();
      super.OnFinish(this.WizardContext);
    }
  }
  public ClinicalIndicatorUpdateSvcCallback(): void {
    super.OnCloseCA(); // to be revisit OnFinish
  }
  private _PatientHtWtBSAText: string;
  public get PatientHtWtBSAText(): string {
    return this._PatientHtWtBSAText;
  }
  public set PatientHtWtBSAText(value: string) {
    if (this._PatientHtWtBSAText != value) {
      this._PatientHtWtBSAText = value;
      // OnPropertyChanged("PatientHtWtBSAText");
    }
  }
  private _HeightWeightIndText: string;
  public get HeightWeightIndText(): string {
    return this._HeightWeightIndText;
  }
  public set HeightWeightIndText(value: string) {
    if (this._HeightWeightIndText != value) {
      this._HeightWeightIndText = value;
      // OnPropertyChanged("HeightWeightIndText");
    }
  }
  private _IsVisibleHWIndicator: Visibility = Visibility.Collapsed;
  public get IsVisibleHWIndicator(): Visibility {
    return this._IsVisibleHWIndicator;
  }
  public set IsVisibleHWIndicator(value: Visibility) {
    if (this._IsVisibleHWIndicator != value) {
      this._IsVisibleHWIndicator = value;
      // OnPropertyChanged("IsVisibleHWIndicator");
    }
  }
  public SetHeightweightPopUp(): void {
    if (
      MedicationCommonProfileData.PrescribeConfig != null &&
      MedicationCommonProfileData.PrescribeConfig.EnableDoseCalc &&
      MedicationCommonProfileData.PrescribeConfig.HeightWeightChangeAlert
    ) {
      let result: string;
      let Encounterid: number = PatientContext.EncounterOid;
      let Pationtid: number = PatientContext.PatientOID;
      let dtRecordHWDTTM: DateTime = DateTime.MinValue;
      let dtLeastPresItemDCDTTM: DateTime = DateTime.MinValue;
      result = ObjectHelper.CreateType<string>(
        HtmlPage.Window.Invoke(
          'GetDoseCalcDateTime',
          Pationtid,
          Encounterid,
          'CC_FOR_ADMIN'
        ),
        'string'
      );
      if (!String.IsNullOrEmpty(result)) {
        DateTime.TryParseExact(
          result,
          'dd/MM/yyyy',
          'en_GB',
          DateTimeStyles.None,
          (o) => { dtLeastPresItemDCDTTM = o; }
          );
          
        if (MedChartData.PatinetInfo != null) {
          dtRecordHWDTTM =
            // MedChartData.PatinetInfo.DCHTRecordDTTM >=MedChartData.PatinetInfo.DCWTRecordDTTM? MedChartData.PatinetInfo.DCHTRecordDTTM : MedChartData.PatinetInfo.DCWTRecordDTTM;
            DateTime.GreaterThanOrEqualTo(MedChartData.PatinetInfo.DCHTRecordDTTM ,MedChartData.PatinetInfo.DCWTRecordDTTM)? MedChartData.PatinetInfo.DCHTRecordDTTM : MedChartData.PatinetInfo.DCWTRecordDTTM;
          }
        if (
          // dtRecordHWDTTM != DateTime.MinValue &&
          DateTime.NotEquals(dtRecordHWDTTM , DateTime.MinValue) &&

          // dtLeastPresItemDCDTTM != DateTime.MinValue &&
         DateTime.NotEquals (dtLeastPresItemDCDTTM , DateTime.MinValue) &&

          // (dtLeastPresItemDCDTTM < dtRecordHWDTTM)
         DateTime.LessThan(dtLeastPresItemDCDTTM , dtRecordHWDTTM)

        ) {
          this.IsVisibleHWIndicator = Visibility.Visible;
          this.HeightWeightIndText =
            Resource.MedsAdminPrescChartView.HTwtupdate_text +
            ' ' +
            dtRecordHWDTTM.ToString(CConstants.DateTimeFormat) +
            Resource.MedsAdminPrescChartView.Htwtpleasereview;
          if (MedChartData.PatinetInfo != null) {
            MedChartData.PatinetInfo.LatHWUpdatedDTTM = dtRecordHWDTTM;
          }
        } else {
          this.IsVisibleHWIndicator = Visibility.Collapsed;
        }
      } else {
        this.IsVisibleHWIndicator = Visibility.Collapsed;
      }
    }
  }
  public DischargeDTTM: DateTime;
  public LeaveDTTM: DateTime;
  public FillActivityConsideration(): void {
    if (
      this.ActivityConsideration != null &&
      String.Compare(
        PatientContext.PrescriptionType,
        PrescriptionTypes.Clerking,
        StringComparison.OrdinalIgnoreCase
      ) != 0
    ) {
      AppLoadService.activityConsiderationArrowClick.subscribe(val=>{
        if (val) {
          this.ActivityConsideration_OnPopupOpen({},{});
        }
      });
      AppLoadService.nodeClick.subscribe(val=>{
        if (val) {
          this.ActivityConsideration_OnNodeItemClick({});
        }
      });

      // Application.CommonBB.PatientBSADataCompletedEvent -= new Bluebird.Common.Application.CommonBB.PatientBSADataEventArgs(this.CommonBB_PatientBSADataCompletedEvent);
      CommonBB.PatientBSADataCompletedEvent = (s, e) => {
        this.CommonBB_PatientBSADataCompletedEvent(s, e);
      };
      this.ActivityConsideration.ActivityConsiderationCaption =
        'Prescribing considerations';
      this.ActivityConsideration.AddSection(
        'SectionConsideration',
        'Considerations',
        String.Empty,
        Resource.MedicationChart.SectionConsideration_Tooltip
      );
      this.ActivityConsideration.AddSection(
        'SectionAllergy',
        'Allergies/ADRs',
        String.Empty,
        Resource.MedicationChart.SectionAllergy_Tooltip
      );
      this.ActivityConsideration.AddSection(
        'SectionProblem',
        'Problems',
        String.Empty,
        Resource.MedicationChart.SectionProblems_Tooltip
      );
    }
  }
  ActivityConsideration_OnPopupOpen(sender: Object, e: EventArgs): void {
    this.IsActivityConsiderationOpened = true;
    let sImageList: string = String.Empty;
    let oReturn: Object = HtmlPage.Window.Invoke(
      'GetDataItemRecordedDate',
      null
    );
    this.UpdateActivityConsideration(false, oReturn);
    this.ActivityConsideration.AddNode(
      'SectionConsideration',
      'DischargeDTTM',
      'Expected date of discharge:',
      String.Empty,
      String.Empty,
      false,
      false,
      String.Empty,
      String.Empty
    );
    this.ActivityConsideration.AddNode(
      'SectionConsideration',
      'LeaveDTTM',
      'Expected date of patient leave:',
      String.Empty,
      String.Empty,
      false,
      false,
      String.Empty,
      String.Empty
    );
    AppLoadService.activityConsiderationEVT.next(this.ActivityConsideration);
    if (this.ActivityConsideration.lstSection[2].Nodes.Count == 0) {
      if (
        !String.IsNullOrEmpty(WebServiceURLMedicationCommonBB.ManageProblemWS)
      ) {
        // MedicationPrescriptionHelper.GetProblemByCriteria(new EventHandler<ManageProblem.GetProblemByCriteriaCompletedEventArgs>(this.probproxy_GetProblemByCriteriaCompleted));
        MedicationPrescriptionHelper.GetProblemByCriteria((s, e) => {
          this.probproxy_GetProblemByCriteriaCompleted(s, e);
        });
      }
    }
    if (this.ActivityConsideration.lstSection[1].Nodes.Count == 0) {
      if (
        !String.IsNullOrEmpty(WebServiceURLMedicationCommonBB.ManageAllergyWS)
      ) {
        // MedicationPrescriptionHelper.GetPatientAllergies(new EventHandler<ManageAllergy.GetPatientAllergiesCompletedEventArgs>(this.allergyproxy_GetPatientAllergiesCompleted));
        MedicationPrescriptionHelper.GetPatientAllergies((s, e) => {
          this.allergyproxy_GetPatientAllergiesCompleted(s, e);
        });
      }
    }
    if (this.ActivityConsideration != null) {
      if (String.IsNullOrEmpty(this.sDischargeDTTM)) {
        // MedicationPrescriptionHelper.GetDischargeDate(new EventHandler<ManagePrescSer.GetDischargeDateCompletedEventArgs>(this.PatientDischargeDate_GetDischargeDateCompleted));
        MedicationPrescriptionHelper.GetDischargeDate((s, e) => {
          this.PatientDischargeDate_GetDischargeDateCompleted(s, e);
        });
      } else {
        this.SetActivityConsiderationDischargeDTTM();
      }
      if (String.IsNullOrEmpty(this.sLeaveDTTM)) {
        // MedicationPrescriptionHelper.GetPatientLeaveByPatDet(new EventHandler<QueryInpatient.GetPatientLeaveByPatDetCompletedEventArgs>(this.LeaveDate_GetPatientLeaveByPatDetCompleted));
        MedicationPrescriptionHelper.GetPatientLeaveByPatDet((s, e) => {
          this.LeaveDate_GetPatientLeaveByPatDetCompleted(s, e);
        });
      } else {
        this.SetActivityConsiderationLeaveDTTM();
      }
    }
  }
  SetActivityConsiderationDischargeDTTM(): void {
    this.ActivityConsideration.UpdateNode(
      'SectionConsideration',
      'DischargeDTTM',
      'Expected date of discharge:',
      this.sDischargeDTTM,
      String.Empty,
      false,
      false,
      String.Empty,
      this.sDischargeDTTM
    );
    AppLoadService.activityConsiderationEVT.next(this.ActivityConsideration);
  }
  SetActivityConsiderationLeaveDTTM(): void {
    this.ActivityConsideration.UpdateNode(
      'SectionConsideration',
      'LeaveDTTM',
      'Expected date of patient leave:',
      this.sLeaveDTTM,
      String.Empty,
      false,
      false,
      String.Empty,
      this.sLeaveDTTM
    );
    AppLoadService.activityConsiderationEVT.next(this.ActivityConsideration);
  }
  public UpdateActivityConsideration(
    IsDoseCalc: boolean,
    oReturn: Object
  ): void {
    let sHName: string = 'Height:';
    let sWName: string = 'Weight:';
    let sGestationAge: string = 'Gestational age:';
    let sHValue: string = 'NOT RECORDED';
    let sWValue: string = 'NOT RECORDED';
    let sGestationAgeValue: string = 'NOT RECORDED';
    let sHeight: string;
    let sWeight: string;
    let sGestation: string;
    let sGestationreq: string = String.Empty;
    if (oReturn != null && oReturn.ToString().length > 0) {
      let arrValues: string[];
      if (IsDoseCalc) {
        arrValues = oReturn.ToString().Split(';');
        if (arrValues.length > 0 && !String.IsNullOrEmpty(arrValues[0])) {
          sWValue = arrValues[0].Replace('  ', ' ');
        }
        if (arrValues.length > 1 && !String.IsNullOrEmpty(arrValues[1])) {
          sHValue = arrValues[1].Replace('  ', ' ');
        }
        if (arrValues.length > 2 && !String.IsNullOrEmpty(arrValues[2])) {
          sGestationAgeValue = arrValues[2].Replace('  ', ' ');
        }
        sWValue = sWValue.Replace(':Recorded', ': Recorded');
        sHValue = sHValue.Replace(':Recorded', ': Recorded');
        sGestationAgeValue = sGestationAgeValue.Replace(
          ':Recorded',
          ': Recorded'
        );
        sWeight =
          arrValues.length > 3 && !String.IsNullOrEmpty(arrValues[3])
            ? arrValues[3].Trim()
            : String.Empty;
        sHeight =
          arrValues.length > 4 && !String.IsNullOrEmpty(arrValues[4])
            ? arrValues[4].Trim()
            : String.Empty;
        sGestation =
          arrValues.length > 5 && !String.IsNullOrEmpty(arrValues[5])
            ? arrValues[5].Trim()
            : String.Empty;
        this.ActivityConsideration.UpdateNode(
          'SectionConsideration',
          sWName,
          sWName,
          sWValue,
          String.Empty,
          false,
          true,
          String.Empty,
          Resource.MedicationChart.PatientWeight_Tooltip + sWValue
        );
        this.ActivityConsideration.UpdateNode(
          'SectionConsideration',
          sHName,
          sHName,
          sHValue,
          String.Empty,
          false,
          true,
          String.Empty,
          Resource.MedicationChart.PatientHeight_Tooltip + sHValue
        );
        AppLoadService.activityConsiderationEVT.next(this.ActivityConsideration);
        MedicationCommonBB.GetPatientAgeGenderDetails();
        if (ContextManager.Instance.NameExists('Sgestationreq')) {
          if (ContextManager.Instance['Sgestationreq'] != null) {
            sGestationreq = ContextManager.Instance['Sgestationreq'].ToString();
          }
        }
        if (sGestationreq == '1') {
          this.ActivityConsideration.UpdateNode(
            'SectionConsideration',
            sGestationAge,
            sGestationAge,
            sGestationAgeValue,
            String.Empty,
            false,
            true,
            String.Empty,
            sGestationAgeValue
          );
          AppLoadService.activityConsiderationEVT.next(this.ActivityConsideration);
        }
      } else {
        arrValues = oReturn.ToString().Split(',');
        if (arrValues.length > 0 && !String.IsNullOrEmpty(arrValues[0])) {
          sWValue = arrValues[0].Replace('  ', ' ');
        }
        if (arrValues.length > 1 && !String.IsNullOrEmpty(arrValues[1])) {
          sHValue = arrValues[1].Replace('  ', ' ');
        }
        if (arrValues.length > 2 && !String.IsNullOrEmpty(arrValues[2])) {
          sGestationAgeValue = arrValues[2].Replace('  ', ' ');
        }
        sWValue = sWValue.Replace(':Recorded', ': Recorded');
        sHValue = sHValue.Replace(':Recorded', ': Recorded');
        sGestationAgeValue = sGestationAgeValue.Replace(
          ':Recorded',
          ': Recorded'
        );
        sWeight =
          arrValues.length > 3 && !String.IsNullOrEmpty(arrValues[3])
            ? arrValues[3].Trim()
            : String.Empty;
        sHeight =
          arrValues.length > 4 && !String.IsNullOrEmpty(arrValues[4])
            ? arrValues[4].Trim()
            : String.Empty;
        sGestation =
          arrValues.length > 5 && !String.IsNullOrEmpty(arrValues[5])
            ? arrValues[5].Trim()
            : String.Empty;
        if (
          this.ActivityConsideration.lstSection != null &&
          this.ActivityConsideration.lstSection[0].Nodes != null &&
          this.ActivityConsideration.lstSection[0].Nodes.Count == 0
        ) {
          this.ActivityConsideration.AddNode(
            'SectionConsideration',
            sWName,
            sWName,
            sWValue,
            String.Empty,
            false,
            true,
            String.Empty,
            Resource.MedicationChart.PatientWeight_Tooltip + sWValue
          );
          this.ActivityConsideration.AddNode(
            'SectionConsideration',
            sHName,
            sHName,
            sHValue,
            String.Empty,
            false,
            true,
            String.Empty,
            Resource.MedicationChart.PatientHeight_Tooltip + sHValue
          );
          AppLoadService.activityConsiderationEVT.next(this.ActivityConsideration);
        } else {
          this.ActivityConsideration.UpdateNode(
            'SectionConsideration',
            sWName,
            sWName,
            sWValue,
            String.Empty,
            false,
            true,
            String.Empty,
            Resource.MedicationChart.PatientWeight_Tooltip + sWValue
          );
          this.ActivityConsideration.UpdateNode(
            'SectionConsideration',
            sHName,
            sHName,
            sHValue,
            String.Empty,
            false,
            true,
            String.Empty,
            Resource.MedicationChart.PatientHeight_Tooltip + sHValue
          );
          AppLoadService.activityConsiderationEVT.next(this.ActivityConsideration);
        }
        MedicationCommonBB.GetPatientAgeGenderDetails();
        if (ContextManager.Instance.NameExists('Sgestationreq')) {
          if (ContextManager.Instance['Sgestationreq'] != null) {
            sGestationreq = ContextManager.Instance['Sgestationreq'].ToString();
          }
        }
        if (sGestationreq == '1') {
          this.ActivityConsideration.AddNode(
            'SectionConsideration',
            sGestationAge,
            sGestationAge,
            sGestationAgeValue,
            String.Empty,
            false,
            true,
            String.Empty,
            sGestationAgeValue
          );
          AppLoadService.activityConsiderationEVT.next(this.ActivityConsideration);
        }
      }
      this.ActivityConsideration.AddNode(
        'SectionConsideration',
        'BSA',
        'BSA:',
        String.Empty,
        String.Empty,
        false,
        false,
        String.Empty,
        String.Empty
      );
      AppLoadService.activityConsiderationEVT.next(this.ActivityConsideration);
      if (
        (!String.IsNullOrEmpty(sHeight) && !String.IsNullOrEmpty(sWeight)) ||
        !String.IsNullOrEmpty(sWeight)
      ) {
        CommonBB.GetPatientBSA(
          PatientContext.PatientOID,
          PatientContext.Age,
          sHeight,
          sWeight
        );
      }
    }
  }
  private BSAFormula: string;
  private BSAValue: string;
  CommonBB_PatientBSADataCompletedEvent(Formula: string, BSA: string): void {
    if (!String.IsNullOrEmpty(BSA)) {
      this.BSAValue = BSA;
      this.BSAFormula = Formula;
      if (CommonDomainValues.BSAFormula != null) {
        let sBSAFormulaDisplay: string = this.BSAFormula;
        let sDisplay: string;
        // let BSADisplayText = from CCBSA in CommonDomainValues.BSAFormula
        // where String.Compare(CCBSA.csCode, BSAFormula, StringComparison.OrdinalIgnoreCase) == 0
        // select CCBSA.csDescription;

        let BSADisplayText = CommonDomainValues.BSAFormula.Where(
          (CCBSA) =>
            String.Compare(
              CCBSA.csCode,
              this.BSAFormula,
              StringComparison.OrdinalIgnoreCase
            ) == 0
        ).Select((CCBSA) => CCBSA.csDescription);

        if (BSADisplayText != null && BSADisplayText.Count() > 0) {
          sBSAFormulaDisplay = BSADisplayText.ElementAt(0);
        }
        sDisplay = this.BSAValue + ' m^2 (' + sBSAFormulaDisplay + ')';
        this.ActivityConsideration.UpdateNode(
          'SectionConsideration',
          'BSA',
          'BSA:',
          sDisplay,
          String.Empty,
          false,
          false,
          String.Empty,
          sDisplay
        );
        AppLoadService.activityConsiderationEVT.next(this.ActivityConsideration);
      }
    }
    if (
      String.IsNullOrEmpty(this.sPatientHtWtBSAText) ||
      String.IsNullOrEmpty(this.PatientHtWtBSAText) ||
      (!String.IsNullOrEmpty(this.sPatientHtWtBSAText) &&
        !String.IsNullOrEmpty(this.PatientHtWtBSAText) &&
        String.Compare(this.sPatientHtWtBSAText, this.PatientHtWtBSAText) != 0)
    ) {
      MedChartData.PatinetInfo = Common.GetPatientInfo();
      if (
        MedChartData.PatinetInfo != null &&
        !String.IsNullOrEmpty(MedChartData.PatinetInfo.Observation)
      ) {
        let sHtWtBSA: string = MedChartData.PatinetInfo.Observation;
        if (!String.IsNullOrEmpty(BSA) && !String.IsNullOrEmpty(this.BSAValue))
          sHtWtBSA +=' ' +this.BSAValue + Resource.MedsAdminChartToolTip.PatientBSAUOMText;
        this.PatientHtWtBSAText = sHtWtBSA;
      } else {
        this.PatientHtWtBSAText = String.Empty;
      }
    }
  }
  allergyproxy_GetPatientAllergiesCompleted(
    sender: Object,
    e: ManageAllergy.GetPatientAllergiesCompletedEventArgs
  ): void {
    let _ErrorID: number = 80000027;
    let _ErrorSource: string =
      'LorAppMedicationAdminBBUI_P2.dll, Class:MedicationAdminVM, Method:allergyproxy_GetPatientAllergiesCompleted()';
    if (e.Error == null) {
      try {
        let AllergyRes: ManageAllergy.CResMsgGetPatientAllergies = e.Result;
        if (
          AllergyRes instanceof ManageAllergy.CResMsgGetPatientAllergies &&
          AllergyRes.oPatientAllergyDet != null
        ) {
          for (
            let i: number = 0;
            i < AllergyRes.oPatientAllergyDet.Length;
            i++
          ) {
            if (i >= 10) {
              this.ActivityConsideration.AddNode(
                'SectionAllergy',
                String.Empty,
                Resource.MedicationChart.More_Allergies_Exist,
                String.Empty,
                String.Empty,
                false,
                false,
                Resource.MedicationChart.sectionallergyif_Tooltip,
                Resource.MedicationChart.sectionallergyif_Tooltip
              );
              AppLoadService.activityConsiderationEVT.next(this.ActivityConsideration);
              break;
            } else {
              this.ActivityConsideration.AddNode(
                'SectionAllergy',
                AllergyRes.oPatientAllergyDet[i].AllergyID,
                AllergyRes.oPatientAllergyDet[i].Allergen,
                String.Empty,
                String.Empty,
                false,
                false,
                AllergyRes.oPatientAllergyDet[i].Allergen,
                Resource.MedicationChart.sectionallergyielse_Tooltip
              );
              AppLoadService.activityConsiderationEVT.next(this.ActivityConsideration);
            }
          }
        } else {
          this.ActivityConsideration.AddNode(
            'SectionAllergy',
            String.Empty,
            'None recorded',
            String.Empty,
            String.Empty,
            false,
            false,
            Resource.MedicationChart.Sectionallergyelse1_Tooltip,
            Resource.MedicationChart.sectionallergyelse2_Tooltip
          );
          AppLoadService.activityConsiderationEVT.next(this.ActivityConsideration);
        }
        for (
          let vSectionCntr: number = 0;
          vSectionCntr < this.ActivityConsideration.lstSection.Count;
          vSectionCntr++
        ) {
          if (
            String.Compare(
              this.ActivityConsideration.lstSection[vSectionCntr].SectionKey,
              'SectionAllergy'
            ) == 0
          ) {
            for (
              let vLoop: number = 0;
              vLoop <
              this.ActivityConsideration.lstSection[vSectionCntr].Nodes.Count;
              vLoop++
            )
              this.ActivityConsideration.lstSection[vSectionCntr].Nodes[
                vLoop
              ].NodeWidth = 300;
            break;
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
    if (
      String.Compare(
        PatientContext.PrescriptionType,
        PrescriptionTypes.Clerking,
        StringComparison.OrdinalIgnoreCase
      ) != 0
    )
      this.ActivityConsideration.lstSection[0].Nodes[4].NodeWidth = 175;
  }
  probproxy_GetProblemByCriteriaCompleted(
    sender: Object,
    e: ManageProblem.GetProblemByCriteriaCompletedEventArgs
  ): void {
    let _ErrorID: number = 80000023;
    let _ErrorSource: string =
      'LorAppMedicationAdminBBUI_P2.dll, Class:MedicationAdminVM, Method:probproxy_GetProblemByCriteriaCompleted()';
    if (e.Error == null) {
      try {
        let oProbRes: ManageProblem.CResMsgGetProblemByCriteria = e.Result;
        if (
          oProbRes instanceof ManageProblem.CResMsgGetProblemByCriteria &&
          oProbRes.oProblemView != null
        ) {
          for (let i: number = 0; i < oProbRes.oProblemView.Count; i++) {
            if (i >= 5) {
              this.ActivityConsideration.AddNode(
                'SectionProblem',
                String.Empty,
                Resource.MedicationChart.More_Problem_Exist,
                String.Empty,
                String.Empty,
                false,
                false,
                Resource.MedicationChart.sectionallergyif_Tooltip,
                Resource.MedicationChart.sectionallergyif_Tooltip
              );
              AppLoadService.activityConsiderationEVT.next(this.ActivityConsideration);
              break;
            } else {
              this.ActivityConsideration.AddNode(
                'SectionProblem',
                oProbRes.oProblemView[i].ProblemOID,
                oProbRes.oProblemView[i].ProblemName,
                String.Empty,
                String.Empty,
                false,
                false,
                oProbRes.oProblemView[i].ProblemName,
                Resource.MedicationChart.Sectionproblemielse_Tooltip
              );
            }
            AppLoadService.activityConsiderationEVT.next(this.ActivityConsideration);
          }
          for (
            let vSectionCntr: number = 0;
            vSectionCntr < this.ActivityConsideration.lstSection.Count;
            vSectionCntr++
          ) {
            if (
              String.Compare(
                this.ActivityConsideration.lstSection[vSectionCntr].SectionKey,
                'SectionProblem'
              ) == 0
            ) {
              for (
                let vLoop: number = 0;
                vLoop <
                this.ActivityConsideration.lstSection[vSectionCntr].Nodes.Count;
                vLoop++
              )
                this.ActivityConsideration.lstSection[vSectionCntr].Nodes[
                  vLoop
                ].NodeWidth = 300;
              break;
            }
          }
        } else {
          this.ActivityConsideration.AddNode(
            'SectionProblem',
            String.Empty,
            'None recorded',
            String.Empty,
            String.Empty,
            false,
            false,
            Resource.MedicationChart.Sectionproblemielse_Tooltip,
            Resource.MedicationChart.sectionallergyelse2_Tooltip
          );
          AppLoadService.activityConsiderationEVT.next(this.ActivityConsideration);
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
  PatientDischargeDate_GetDischargeDateCompleted(
    sender: Object,
    e: ManagePrescSer.GetDischargeDateCompletedEventArgs
  ): void {
    let _ErrorID: number = 80000038;
    let _ErrorSource: string =
      'LorAppMedicationAdminBBUI_P2.dll, Class:MedicationAdminVM, Method:PatientDischargeDate_GetDischargeDateCompleted()';
    if (e.Error == null && e.Result != null) {
      try {
        this.DischargeDTTM = e.Result.DischargeDate;
        this.sDischargeDTTM =
          // this.DischargeDTTM != DateTime.MinValue &&
          DateTime.NotEquals(this.DischargeDTTM , DateTime.MinValue )&&
          this.DischargeDTTM.Year < DateTime.MaxValue.Year
            ? this.DischargeDTTM.ToString('dd-MMM-yyyy')
            : String.Empty;
        if (this.IsActivityConsiderationOpened) {
          this.SetActivityConsiderationDischargeDTTM();
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
  LeaveDate_GetPatientLeaveByPatDetCompleted(
    sender: Object,
    e: QueryInpatient.GetPatientLeaveByPatDetCompletedEventArgs
  ): void {
    let _ErrorID: number = 80000037;
    let _ErrorSource: string =
      'LorAppMedicationAdminBBUI_P2.dll, Class:MedicationAdminVM, Method:LeaveDate_GetPatientLeaveByPatDetCompleted()';
    if (e.Error == null) {
      try {
        let objRes: QueryInpatient.CResMsgGetPatientLeaveByPatDet = e.Result;
        if (objRes != null && objRes.oPatientLeave != null) {
          this.LeaveDTTM = objRes.oPatientLeave.ActualStartDttm;
          this.sLeaveDTTM =
            // this.LeaveDTTM != DateTime.MinValue
            DateTime.NotEquals(this.LeaveDTTM , DateTime.MinValue)
              ? this.LeaveDTTM.ToString('dd-MMM-yyyy')
              : String.Empty;
          if (this.IsActivityConsiderationOpened) {
            this.SetActivityConsiderationLeaveDTTM();
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
  async ActivityConsideration_OnNodeItemClick(objRLNode: any) {
    let sHName: string = 'Height:';
    let sWName: string = 'Weight:';
    let sGestationAge: string = 'Gestational age:';
    let sGestationAgeValue: string = 'NOT RECORDED';
    let sHValue: string = 'NOT RECORDED';
    let sWValue: string = 'NOT RECORDED';
    let sWeight: string = String.Empty;
    let sHeight: string = String.Empty;
    let sGestation: string = String.Empty;
    let sGestationreq: string = String.Empty;
    let oReturn = await HtmlPage.Window.InvokeAsync(
      'ActivityConsideration',
      null,
      PatientContext.PatientOID
    );
    if (oReturn != null && oReturn.length > 0) {
      let arrValues: string[] = oReturn.ToString().Split(',');
      if (arrValues.length > 0 && !String.IsNullOrEmpty(arrValues[0])) {
        sWValue = arrValues[0].Replace('  ', ' ');
      }
      if (arrValues.length > 1 && !String.IsNullOrEmpty(arrValues[1])) {
        sHValue = arrValues[1].Replace('  ', ' ');
      }
      if (arrValues.length > 2 && !String.IsNullOrEmpty(arrValues[2])) {
        sGestationAgeValue = arrValues[2].Replace('  ', ' ');
      }
      sWeight =
        arrValues.length > 3 && !String.IsNullOrEmpty(arrValues[3])
          ? arrValues[3].Trim()
          : String.Empty;
      sHeight =
        arrValues.length > 4 && !String.IsNullOrEmpty(arrValues[4])
          ? arrValues[4].Trim()
          : String.Empty;
      sGestation =
        arrValues.length > 5 && !String.IsNullOrEmpty(arrValues[5])
          ? arrValues[5].Trim()
          : String.Empty;
      let _isHaveHTDDTM: boolean = false;
      if (!String.IsNullOrEmpty(sHeight)) {
        _isHaveHTDDTM = true;
        let sHeightRecordedOnWithTime: string = String.Empty;
        if (arrValues != null && arrValues.length > 1) {
          if (
            !String.IsNullOrEmpty(arrValues[1]) &&
            arrValues[1].Contains(':')
          ) {
            sHeightRecordedOnWithTime =
              arrValues[1].Split(':')[2] + ':' + arrValues[1].Split(':')[3];
          }
        }
        PatientContext.PatientHeightDTTM = Convert.ToDateTime(
          sHeightRecordedOnWithTime
        );
        if (MedChartData.PatinetInfo != null) {
          MedChartData.PatinetInfo.DCHTRecordDTTM =
            PatientContext.PatientHeightDTTM;
        }
      }
      if (!String.IsNullOrEmpty(sWeight)) {
        _isHaveHTDDTM = true;
        let sWeightRecordedOnWithTime: string = String.Empty;
        if (arrValues != null && arrValues.length > 0) {
          if (
            !String.IsNullOrEmpty(arrValues[0]) &&
            arrValues[0].Contains(':')
          ) {
            sWeightRecordedOnWithTime =
              arrValues[0].Split(':')[2] + ':' + arrValues[0].Split(':')[3];
          }
        }
        PatientContext.PatientWeightDTTM = Convert.ToDateTime(
          sWeightRecordedOnWithTime
        );
        if (MedChartData.PatinetInfo != null) {
          MedChartData.PatinetInfo.DCWTRecordDTTM =
            PatientContext.PatientWeightDTTM;
        }
      }
      if (!_isHaveHTDDTM) {
        MedChartData.PatinetInfo = Common.GetPatientInfo();
      }
      this.SetHeightweightPopUp();
      if (this.ActivityConsiderationUpdatedCompleted != null) {
        this.ActivityConsiderationUpdatedCompleted();
      }
    }
    this.ActivityConsideration.UpdateNode(
      'SectionConsideration',
      sWName,
      sWName,
      sWValue,
      String.Empty,
      false,
      true,
      'Patient Weight',
      Resource.MedicationChart.PatientWeight_Tooltip + sWValue
    );
    this.ActivityConsideration.UpdateNode(
      'SectionConsideration',
      sHName,
      sHName,
      sHValue,
      String.Empty,
      false,
      true,
      'Patient Height',
      Resource.MedicationChart.PatientHeight_Tooltip + sHValue
    );
    AppLoadService.activityConsiderationEVT.next(this.ActivityConsideration);
    MedicationCommonBB.GetPatientAgeGenderDetails();
    if (ContextManager.Instance.NameExists('Sgestationreq')) {
      if (ContextManager.Instance['Sgestationreq'] != null) {
        sGestationreq = ContextManager.Instance['Sgestationreq'].ToString();
      }
    }
    if (sGestationreq == '1') {
      this.ActivityConsideration.UpdateNode(
        'SectionConsideration',
        sGestationAge,
        sGestationAge,
        sGestationAgeValue,
        String.Empty,
        false,
        true,
        'Gestational age',
        sGestationAgeValue
      );
      AppLoadService.activityConsiderationEVT.next(this.ActivityConsideration);
    }
    CommonBB.GetPatientBSA(
      PatientContext.PatientOID,
      PatientContext.Age,
      sHeight,
      sWeight
    );
  }
  public ReviewAndOutcomeDetails(
    oManageReviewPeriod: IPPMAManagePrescSer.ManageReviewPeriod
  ): void {
    let objreq: IPPMAManagePrescSer.CReqMsgManageReviewAfterPeriod =
      new IPPMAManagePrescSer.CReqMsgManageReviewAfterPeriod();
    objreq.objManageReviewPeriodBC =
      new IPPMAManagePrescSer.ManageReviewPeriod();
    objreq.objManageReviewPeriodBC.oReviewAfterDetail =
      new IPPMAManagePrescSer.ReviewAfterDetail();
    objreq.lnPatientoidBC = PatientContext.PatientOID;
    objreq.oContextInformation = CommonBB.FillContext();
    if (
      objreq != null &&
      objreq.objManageReviewPeriodBC != null &&
      objreq.objManageReviewPeriodBC.oReviewAfterDetail != null
    ) {
      if (oManageReviewPeriod != null) {
        if (!String.IsNullOrEmpty(oManageReviewPeriod.NewReviewAfter)) {
          objreq.objManageReviewPeriodBC.NewReviewAfter =
            oManageReviewPeriod.NewReviewAfter;
        }
        // if (oManageReviewPeriod.NewReviewAfterDTTM != DateTime.MinValue) 
        if(DateTime.NotEquals (oManageReviewPeriod.NewReviewAfterDTTM , DateTime.MinValue))
          {
          objreq.objManageReviewPeriodBC.NewReviewAfterDTTM =
            oManageReviewPeriod.NewReviewAfterDTTM;
        }
        if (oManageReviewPeriod.NewReviewAfterUOM != null) {
          objreq.objManageReviewPeriodBC.NewReviewAfterUOM =
            oManageReviewPeriod.NewReviewAfterUOM;
        }
        if (
          !String.IsNullOrEmpty(oManageReviewPeriod.NewReviewRequestComments)
        ) {
          objreq.objManageReviewPeriodBC.NewReviewRequestComments =
            oManageReviewPeriod.NewReviewRequestComments;
        }
        if (oManageReviewPeriod.NewReviewType != null) {
          objreq.objManageReviewPeriodBC.NewReviewType =
            oManageReviewPeriod.NewReviewType;
        }
        if (
          oManageReviewPeriod.PrescriptionItemOID != null &&
          oManageReviewPeriod.PrescriptionItemOID > 0
        ) {
          objreq.objManageReviewPeriodBC.PrescriptionItemOID =
            oManageReviewPeriod.PrescriptionItemOID;
        }
        if (ChartContext.EncounterOID > 0) {
          objreq.objManageReviewPeriodBC.EncounterOID =
            ChartContext.EncounterOID;
        }
        if (oManageReviewPeriod.oReviewAfterDetail != null) {
          if (oManageReviewPeriod.oReviewAfterDetail.ReviewOutcome != null) {
            objreq.objManageReviewPeriodBC.oReviewAfterDetail.ReviewOutcome =
              oManageReviewPeriod.oReviewAfterDetail.ReviewOutcome;
          }
          if (
            !String.IsNullOrEmpty(
              oManageReviewPeriod.oReviewAfterDetail.ReviewRequestedBy
            )
          ) {
            objreq.objManageReviewPeriodBC.oReviewAfterDetail.ReviewRequestedBy =
              oManageReviewPeriod.oReviewAfterDetail.ReviewRequestedBy;
          }
          if (
            !String.IsNullOrEmpty(
              oManageReviewPeriod.oReviewAfterDetail.DiscontinueReason
            )
          ) {
            objreq.objManageReviewPeriodBC.oReviewAfterDetail.DiscontinueReason =
              oManageReviewPeriod.oReviewAfterDetail.DiscontinueReason;
          }
          if (
            !String.IsNullOrEmpty(
              oManageReviewPeriod.oReviewAfterDetail.ReinstateReason
            )
          ) {
            objreq.objManageReviewPeriodBC.oReviewAfterDetail.ReinstateReason =
              oManageReviewPeriod.oReviewAfterDetail.ReinstateReason;
          }
          if (
            !String.IsNullOrEmpty(
              oManageReviewPeriod.oReviewAfterDetail.ReviewOutcomeComments
            )
          ) {
            objreq.objManageReviewPeriodBC.oReviewAfterDetail.ReviewOutcomeComments =
              oManageReviewPeriod.oReviewAfterDetail.ReviewOutcomeComments;
          }
          if (oManageReviewPeriod.oReviewAfterDetail.PrescriptionItemOID > 0) {
            objreq.objManageReviewPeriodBC.PrescriptionItemOID =
              oManageReviewPeriod.oReviewAfterDetail.PrescriptionItemOID;
          }
        }
      }
    }
    let objServiceProxy: IPPMAManagePrescSer.IPPMAManagePrescriptionWSSoapClient =
      new IPPMAManagePrescSer.IPPMAManagePrescriptionWSSoapClient();
    objServiceProxy.ManageReviewAfterPeriodCompleted = (s, e) => {
      this.objService_ManageReviewAfterPeriodCompleted(s, e);
    };
    if (oManageReviewPeriod.oReviewAfterDetail.ReviewOutcome == null) {
      objreq.objManageReviewPeriodBC.OperationMode = 'INITIATE';
    }
    objServiceProxy.ManageReviewAfterPeriodAsync(objreq);
  }
  private objService_ManageReviewAfterPeriodCompleted(
    sender: Object,
    e: IPPMAManagePrescSer.ManageReviewAfterPeriodCompletedEventArgs
  ): void {
    let _ErrorID: number = 80000113;
    let _ErrorSource: string =
      'LorAppMedicationAdmin_P2.dll, Class:PrescriptionChartVM, Method:objService_ManageReviewAfterPeriodCompleted()';
    if (e.Error == null && e.Result != null) {
      if (this.ReviewInitiateOutcomeCompleted != null) {
        this.ReviewInitiateOutcomeCompleted();
      }
      try {
        let objResManageReviewAfterPeriod: IPPMAManagePrescSer.CResMsgManageReviewAfterPeriod =
          e.Result;
        if (
          objResManageReviewAfterPeriod != null &&
          objResManageReviewAfterPeriod.oContextInformation != null &&
          objResManageReviewAfterPeriod.oContextInformation.Errors.Count == 0
        ) {
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
}
