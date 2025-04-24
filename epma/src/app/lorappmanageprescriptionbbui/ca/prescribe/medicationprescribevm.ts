import { StringBuilder, ContextManager, Convert, MediatorDataService } from 'epma-platform/services';
import {
  Byte,
  Int64,
  StringComparison,
  ObservableCollection,
  CultureInfo,
  WizardAction,
  int64,
  byte
} from 'epma-platform/models';
import 'epma-platform/stringextension';
import DateTime, { DateTimeStyles } from 'epma-platform/DateTime';
import {
  MessageEventArgs,
  MessageBoxResult,
  iMessageBox,
  MessageBoxButton,
  MessageBoxType,
} from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
import {
  AppContextInfo,
  AppSessionInfo,
  ClerkFormViewDeftBehaviour,
  ContextInfo,
  PatientContext
} from 'src/app/lorappcommonbb/utilities/globalvariable';
import { ProfileData } from '../../utilities/profiledata';
import {
  CPremission,
  GlobalVariable,
  QueryStringInfo,
} from '../../utilities/globalvariable';
import {
  CAActivity,
  CConstants,
  InfusionTypesCode,
  PrescriptionTypes,
} from '../../utilities/constants';
import { Resource } from '../../resource';
import { IPPMABaseVM } from '../../viewmodel/ippmabasevm';
import * as IPPMAManagePrescSer from '../../../shared/epma-platform/soap-client/IPPMAManagePrescriptionWS';
import {
  InfContinousSequentail,
  PrescriptionItemVM,
} from '../../viewmodel/PrescriptionItemVM';
import { MedicationPrescriptionHelper } from 'src/app/lorappmedicationcommonbb/utilities/medicationprescriptionhelper';
import { Common } from '../../utilities/common';
import { Busyindicator } from 'src/app/lorappcommonbb/busyindicator';
import {
  MedChartData,
  WebServiceURLMedicationCommonBB,
} from 'src/app/lorappmedicationcommonbb/utilities/globalvariable';
import { MedicationCommonProfileData } from 'src/app/lorappmedicationcommonbb/utilities/profiledata';
import { MedQuickSelectVM } from '../../viewmodel/medquickselectvm';
import { MulticomponentVM } from '../../viewmodel/MulticomponentVM';
import { GPConnectItemVM } from '../../viewmodel/GPConnectItemVM';
import {
  LockedUsersDetails,
  MedicationCommonBB,
} from 'src/app/lorappmedicationcommonbb/utilities/medicationcommonbb';
import { CSequentialHelper } from '../../utilities/CSequentialHelper';
import { ActivityTypes } from '../../model/common';
import { Environment } from '../../../product/shared/models/Common';
import { iActivityConsideration, iTabItem } from 'epma-platform/controls';
import { CRole, GetRoleCompletedEventArgs } from 'src/app/shared/epma-platform/soap-client/CSecurityManagementServiceWS';
import { AppSession } from 'src/app/shared/epma-platform/services/appSession.service';
import 'epma-platform/booleanextension';
import 'epma-platform/numberextension';
import 'epma-platform/stringextension';
import 'epma-platform/arrayextension';
import { DrugItemInputData } from 'src/app/shared/epma-platform/soap-client/ManagePrescriptionWS';
import { InjectorInstance } from 'src/app/app.module';

export class MedicationPrescribeVM extends IPPMABaseVM {  
  public _mediatorDataService: MediatorDataService;
  constructor();
  constructor(sTaskOID?: string);
  constructor(sTaskOID?: string) {
    super(sTaskOID);
   // this._mediatorDataService = InjectorInstance.get<MediatorDataService>(MediatorDataService);
    // this._mediatorDataService.listenFor(6).subscribe((data:any) => {
    //   if(data){
    //    let contextData = data.context;
    //    switch (contextData.context.event) {
    //     case 'Discard_Click': this.OnCancel();
    //                break;
    //     case 'Finish_Click':
    //       this.OnFinish();  
    //       break;
    //     case 'FinishNow_Click':             
    //         this.OnFinishNow();  
    //                 break;
    //    }
    //   }
    // })
    if (arguments.length == 0) {
      //App Revisit Required
      //if (App.GetIsSuspendBufferVMCreation) {
        this.CreateVMobject();
        this.GetDomainComboValues();
     // }
      if (
        String.Equals(
          PatientContext.PrescriptionType,
          PrescriptionTypes.Clerking,
          StringComparison.InvariantCultureIgnoreCase
        ) ||
        PatientContext.ClerkFormViewDefaultBehavior ==
          ClerkFormViewDeftBehaviour.LaunchFormMandatory ||
          String.Equals(
            PatientContext.PrescriptionType,
            PrescriptionTypes.Discharge,
            StringComparison.InvariantCultureIgnoreCase
          ) ||
        ((String.Equals(
          PatientContext.PrescriptionType,
          PrescriptionTypes.Inpatient,
          StringComparison.InvariantCultureIgnoreCase
        ) ||
          String.Equals(
            PatientContext.PrescriptionType,
            PrescriptionTypes.ForAdministration,
            StringComparison.InvariantCultureIgnoreCase
          )) &&
          ProfileData.MedConflictConfig == null)
      ) {
        Common.GetConflictConfig();
      }
    } else {
      //super(sTaskOID);
    }
    // this.OnInitComplete();
  }
  public override OnInitialize(): void {
    super.OnInitialize();
  }
  public override OnInitComplete(): void {
    this.LoadClientHealthObjects();
    if (ContextManager.Instance['FRC-001-CHILD'] != null)
      Common.Frc001Childs = ContextManager.Instance['FRC-001-CHILD'].ToString();
    if (ContextManager.Instance['FRC-002-CHILD'] != null)
      Common.Frc002Childs = ContextManager.Instance['FRC-002-CHILD'].ToString();
    if (ContextManager.Instance['FRC-003-CHILD'] != null)
      Common.Frc003Childs = ContextManager.Instance['FRC-003-CHILD'].ToString();
    if (ContextManager.Instance['FRQ-88-CHILD'] != null)
      Common.Frq88Childs = ContextManager.Instance['FRQ-88-CHILD'].ToString();
    super.OnInitComplete();
  }
  public override OnValidate(action: WizardAction): boolean {
    return super.OnValidate(action);
  }
  public override OnNext(): void {
    Busyindicator.SetStatusBusy('Next');
    super.OnNext();
  }
  public override OnPrevious(): void {
    super.OnPrevious();
  }
  public override OnFinish(): void {
    if (!this.IsFinishClicked) {
      this.IsFinishClicked = true;
   
      this.IsFinishNow = false;
      this.IsFinish = true;
      // to be reviewed by PF added for validation check on Finish for all CA 13-09
      super.OnValidateAsync(WizardAction.Finish).subscribe((result=>{
        if(result){
           Busyindicator.SetStatusBusy('FINISH');
           super.SetWIZContextInormation('FINISH');
        this.CheckLaunchClrkCAAndSubmit();
       }else{
        this.IsFinishClicked=false;
        return;
        }
      
      }));
     }
  }
  public override OnFinishNow(): void {
    if (!this.IsFinishClicked) {
      this.IsFinishClicked = true;
      Busyindicator.SetStatusBusy('FINISHNOW');
      super.SetWIZContextInormation('FINISHNOW');
      this.IsFinishNow = true;
      this.IsFinish = false;
      this.CheckLaunchClrkCAAndSubmit();
    }
  }
  private CheckLaunchClrkCAAndSubmit(): void {
    if (
      !this.IsPrint &&
      !this.IsConsolidatedPrint &&
      PatientContext.PrescriptionType == PrescriptionTypes.ForAdministration
    ) {
      let oPrescribedGPData = this.MedsResolve.Where(
        (item) =>
          !String.IsNullOrEmpty(item.OperationMode) &&
          String.Equals(
            item.OperationMode,
            'N',
            StringComparison.InvariantCultureIgnoreCase
          ) &&
          item.IsGPConnectItem
      ).Select((item) => item);
      if (oPrescribedGPData != null && oPrescribedGPData.Count() > 0) {
        if (
          String.Equals(
            ContextInfo.MenuCode,
            CConstants.ForadminPrescribeMenuCode,
            StringComparison.InvariantCultureIgnoreCase
          ) ||
          String.Equals(
            ContextInfo.MenuCode,
            CConstants.InpatientPrescribeMenuCode,
            StringComparison.InvariantCultureIgnoreCase
          ) ||
          String.Equals(
            ContextInfo.MenuCode,
            CConstants.ClinicallyVerifyMenuCode,
            StringComparison.InvariantCultureIgnoreCase
          )
        ) {
          let strLaunchClrkMsg: string = Resource.MedicationForm.LaunchClrkMsg;
          let oMsgBox: iMessageBox = new iMessageBox();
          oMsgBox.MessageBoxClose = (s, e) => {
            this.oMsgLaunchClrk_MessageBoxClose(s, e);
          };
          oMsgBox.Height = 170;
          oMsgBox.Width = 420;
          oMsgBox.Title = "Question - LORENZO";
          oMsgBox.MessageButton = MessageBoxButton.YesNo;
          oMsgBox.IconType = MessageBoxType.Question;
          oMsgBox.Message = strLaunchClrkMsg.Replace(
            '\\r\\n',
            Environment.NewLine + Environment.NewLine
          );
          let _top: any = top;
          _top.oScreen.UnFreeze();
          oMsgBox.Show();
          ObjectHelper.stopScreenFreezeEvent(true);
        } else {
          this.CheckLockAndSubmit();
        }
      } else {
        this.CheckLockAndSubmit();
      }
    } else {
      this.CheckLockAndSubmit();
    }
  }
  oMsgLaunchClrk_MessageBoxClose(sender: Object, e: MessageEventArgs): void {
    if (e.MessageBoxResult == MessageBoxResult.Yes) {
      this.CanLaunchClerkPrescription = true;
    } else {
      this.CanLaunchClerkPrescription = false;
    }
    this.CheckLockAndSubmit();
  }
  private CheckLockAndSubmit(): void {
    let sMenuCode: string = this.AppContext.MenuCode;
    let sLockedUserName: string = String.Empty;
    let sActivitylock: string = String.Empty;
    let _lockedUserDetails: LockedUsersDetails;
    if (
      !MedicationCommonBB.IsLockStillValid(
        String.IsNullOrEmpty(QueryStringInfo.RequestLockOID)
          ? 0
          : Number.Parse(QueryStringInfo.RequestLockOID),
        sMenuCode,
        (o) => {
          _lockedUserDetails = o;
        }
      )
    ) {
      let oMsgBox: iMessageBox = new iMessageBox();
      oMsgBox.MessageBoxClose = (s, e) => {
        // ObjectHelper.stopFinishAndCancelEvent(false);
        this.oMsgBox_MessageBoxClose(s, e);
      };
      oMsgBox.Title = 'Information - Lorenzo';
      oMsgBox.Height = 160;
      oMsgBox.MessageButton = MessageBoxButton.OK;
      oMsgBox.IconType = MessageBoxType.Information;
      if (String.IsNullOrEmpty(_lockedUserDetails.LockedUserName)) {
        oMsgBox.Message = Resource.MedicationForm.LockMsg_Abort;
      } else {
        oMsgBox.Message = String.Format(
          Resource.MedicationForm.LockMsg,
          _lockedUserDetails.LockedUserName
        );
      }
      oMsgBox.Show();
      // ObjectHelper.stopFinishAndCancelEvent(true);
      ObjectHelper.stopScreenFreezeEvent(true);
    } else {
      super.PrescribeDrugs();
    }
  }
  override oMsgBox_MessageBoxClose(sender: Object, e: MessageEventArgs): void {
    super.OnFinishNow();
  }
  public override OnCancel(): void {
    if (
      this instanceof IPPMABaseVM &&
      ObjectHelper.CreateType<IPPMABaseVM>(this, IPPMABaseVM) != null
    ) {
      if (this.IsPatientHTWTUpdated) {
        this.WizardContext['IsPatientHTWTUpdated'] = '1';
      } else {
        this.WizardContext['IsPatientHTWTUpdated'] = '0';
      }
      if (
        ObjectHelper.CreateType<IPPMABaseVM>(this, IPPMABaseVM).objNewItemVM !=
        null
      ) {
        ObjectHelper.CreateType<IPPMABaseVM>(this, IPPMABaseVM).objNewItemVM =
          null;
      }
      if (
        ObjectHelper.CreateType<IPPMABaseVM>(this, IPPMABaseVM)
          .objProcessingItemVM != null
      ) {
        ObjectHelper.CreateType<IPPMABaseVM>(
          this,
          IPPMABaseVM
        ).objProcessingItemVM = null;
      }
    }
    super.OnCancel();
  }
  public override OnReassign(): void {
    super.OnReassign();
  }
  public override OnSuspend(): void {
    if (!this.IsSuspendClicked) {
      this.IsSuspendClicked = true;
      super.OnSuspend();
    }
  }
  public override GetContextInfoFromHtmlPage(): void {
    PatientContext.IsAgeSexFilledforConflict = false;
    let lnPatOID: number;
    let lnEncOID: number;
    let lnMergePatOID: number;
    QueryStringInfo.MedclerkPrompt = String.Empty;
    if (
      Number.TryParse(ContextManager.Instance['PatientID'].ToString(), (o) => {
        lnPatOID = o;
      })
    )
      PatientContext.PatientOID = lnPatOID;
    if (
      Number.TryParse(
        ContextManager.Instance['EncounterOID'].ToString(),
        (o) => {
          lnEncOID = o;
        }
      )
    )
      PatientContext.EncounterOid = lnEncOID;
    if (
      Number.TryParse(
        ContextManager.Instance['MergedPatientOID'].ToString(),
        (o) => {
          lnMergePatOID = o;
        }
      ) &&
      lnMergePatOID > 0
    )
      PatientContext.MergedPatientOID = lnMergePatOID;
    else if (
      ContextManager.Instance['PatientID'] != null &&
      Number.TryParse(ContextManager.Instance['PatientID'].ToString(), (o) => {
        lnMergePatOID = o;
      })
    ) {
      PatientContext.MergedPatientOID = lnMergePatOID;
    }
    if (ContextManager.Instance['IsMergedPatient'] != null) {
      PatientContext.IsMergedPatient =
        ContextManager.Instance['IsMergedPatient'].ToString();
    }
    let nAge: number;
    if (
      ContextManager.Instance['Age'] != null &&
      Number.TryParse(ContextManager.Instance['Age'].ToString(), (o) => {
        nAge = o;
      })
    )
      PatientContext.Age = nAge;
    let dtDOB: DateTime = DateTime.MinValue;
    PatientContext.DOB = String.Empty;
    if (ContextManager.Instance['DOB'] != null) {
      let sDOB: string = ContextManager.Instance['DOB'].ToString();
      if (!String.IsNullOrEmpty(sDOB)) {
        if (
          DateTime.TryParseExact(
            sDOB,
            'dd-MMM-yyyy',
            'en_GB',
            DateTimeStyles.None,
            (o) => {
              dtDOB = o;
            }
          )
        )
          PatientContext.DOB = dtDOB.ToString();
        else if (
          DateTime.TryParseExact(
            sDOB,
            'dd/MM/yyyy',
            'en_GB',
            DateTimeStyles.None,
            (o) => {
              dtDOB = o;
            }
          )
        )
          PatientContext.DOB = dtDOB.ToString();
      }
    }
    GlobalVariable.NhsNumber =
      ContextManager.Instance['NHSNumber'] != null
        ? ContextManager.Instance['NHSNumber'].ToString()
        : null;
    GlobalVariable.IsGPConnectEnabled =
      ContextManager.Instance['GpConnectEnabled'] != null &&
      ContextManager.Instance['GpConnectEnabled'].ToString() == '1';
    GlobalVariable.ApplicationPath =
      ContextManager.Instance['ApplicationPath'] != null
        ? ContextManager.Instance['ApplicationPath'].ToString()
        : String.Empty;
    if (ContextManager.Instance['IsPDSTraced'] != null) {
      let sIsPDSTraced: string =
        ContextManager.Instance['IsPDSTraced'].ToString();
      PatientContext.IsPDSTraced =
        !String.IsNullOrEmpty(sIsPDSTraced) &&
        String.Equals(
          sIsPDSTraced,
          '1',
          StringComparison.InvariantCultureIgnoreCase
        )
          ? true
          : false;
    }
    PatientContext.Sex = ContextManager.Instance['Sex'].ToString();
    PatientContext.EncounterType =
      ContextManager.Instance['EncounterType'].ToString();
    PatientContext.EncounterCode =
      ContextManager.Instance['EncounterType'].ToString();
    if (ContextManager.Instance['RoleprofileOID'] != null)
      PatientContext.RoleProfileOID =
        ContextManager.Instance['RoleprofileOID'].ToString();
    AppContextInfo.OrganisationName =
      ContextManager.Instance['OrganisationName'].ToString();
    AppContextInfo.JobRoleOID =
      ContextManager.Instance['JobRoleOID'].ToString();
    AppContextInfo.JobRoleName =
      ContextManager.Instance['JobRoleName'].ToString();
    AppContextInfo.RoleProfileName =
      ContextManager.Instance['RoleProfileName'].ToString();
    AppContextInfo.SpecialtyOID =
      ContextManager.Instance['SpecialtyOID'].ToString();
    AppSessionInfo.AMCV = ContextManager.Instance['AMCV'].ToString();
    if (ContextManager.Instance['TeamNames'] != null)
      AppContextInfo.TeamNames =
        ContextManager.Instance['TeamNames'].ToString();
    if (ContextManager.Instance['TeamOIDs'] != null)
      AppContextInfo.TeamOIDs = ContextManager.Instance['TeamOIDs'].ToString();
    AppContextInfo.UserOID = ContextManager.Instance['UserOID'].ToString();
    AppContextInfo.UserName = ContextManager.Instance['UserName'].ToString();
    CPremission.sPremission =
      ContextManager.Instance['PermissionDetails'].ToString();
    ContextInfo.SecurityToken =
      ContextManager.Instance['SecurityToken'].ToString();
    AppContextInfo.OrganisationOID =
      ContextManager.Instance['OrganisationOID'].ToString();
    let objUserOid: int64;
    Int64.TryParse(ContextManager.Instance['UserOID'].ToString(), (o) => {
      objUserOid = o;
    });
    ContextInfo.UserOID = objUserOid;
    let objReleaseVer: byte;
    Byte.TryParse(ContextManager.Instance['ReleaseVersion'].ToString(), (o) => {
      objReleaseVer = o;
    });
    ContextInfo.ReleaseVersion = objReleaseVer;
    ContextInfo.Culture = Convert.ToString(ContextManager.Instance['Culture']);
    if (ContextManager.Instance['IPPMADU_P2'] != null)
      PatientContext.IPPMADU_P2 = Convert.ToBoolean(
        ContextManager.Instance['IPPMADU_P2'].ToString()
      );
    if (ContextManager.Instance['TTOPBBDU'] != null)
      PatientContext.TTOPBBDU = Convert.ToBoolean(
        ContextManager.Instance['TTOPBBDU'].ToString()
      );
    if (ContextManager.Instance['TTOPBBDU_P2'] != null)
      PatientContext.TTOPBBDU_P2 = Convert.ToBoolean(
        ContextManager.Instance['TTOPBBDU_P2'].ToString()
      );
    if (ContextManager.Instance['IsInfusionON'] != null) {
      PatientContext.IsINFUSIONON = Convert.ToBoolean(
        ContextManager.Instance['IsInfusionON'].ToString()
      );
    } else {
      PatientContext.IsINFUSIONON = true;
    }
    if (ContextManager.Instance['IsTurnONDRC'] != null) {
      PatientContext.IsTurnONDRC = Convert.ToBoolean(
        ContextManager.Instance['IsTurnONDRC'].ToString()
      );
    } else {
      if (
        (ProfileData.MedConflictConfig != null &&
          ProfileData.MedConflictConfig.TurnOnDRC != null &&
          ProfileData.MedConflictConfig.TurnOnDRC == '1') ||
        (ProfileData.MedConflictConfig == null && PatientContext.IsTurnONDRC)
      ) {
        ContextManager.Instance['IsTurnONDRC'] = true;
        PatientContext.IsTurnONDRC = true;
      }
    }
    if (ContextManager.Instance['ServiceOID'] != null) {
      let ServiceOID: int64 = 0;
      Int64.TryParse(ContextManager.Instance['ServiceOID'].ToString(), (o) => {
        ServiceOID = o;
      });
      MedChartData.ServiceOID = ServiceOID;
    }
    if (ContextManager.Instance['LocationOID'] != null) {
      let LocationOID: int64 = 0;
      Int64.TryParse(ContextManager.Instance['LocationOID'].ToString(), (o) => {
        LocationOID = o;
      });
      MedChartData.LocationOID = LocationOID;
    }
    if (ContextManager.Instance['PatientSealBreakExists'] != null)
      PatientContext.PatientSealBreakExists = Convert.ToBoolean(
        ContextManager.Instance['PatientSealBreakExists'].ToString()
      );
    if (!String.IsNullOrEmpty(this.WizardContext['CDCFormCode'])) {
      QueryStringInfo.CDCFormCode = this.WizardContext['CDCFormCode'];
    }
    if (!String.IsNullOrEmpty(this.WizardContext['IsLaunchFromChart'])) {
      QueryStringInfo.IsLaunchformchart = this.WizardContext[
        'IsLaunchFromChart'
      ];
      QueryStringInfo.IsLaunchformInfchart = this.WizardContext[
        'IsLaunchFromChart'
      ];
      QueryStringInfo.IsLaunchformMedchart = this.WizardContext[
        'IsLaunchFromChart'
      ];
      if (!String.IsNullOrEmpty(this.WizardContext['IsLaunchFromPresChart']))
        QueryStringInfo.IsLaunchformPreschart = this.WizardContext[
          'IsLaunchFromPresChart'
        ];
    }
    if (!String.IsNullOrEmpty(this.WizardContext['MedclerkPrompt'])) {
      QueryStringInfo.MedclerkPrompt = this.WizardContext['MedclerkPrompt'];
    }
    if (!String.IsNullOrEmpty(this.WizardContext['SelPIOID'])) {
      Number.TryParse(this.WizardContext['SelPIOID'], (o) => {
        QueryStringInfo.SelPrescItemOID = o;
      });
    } else {
      QueryStringInfo.SelPrescItemOID = 0;
    }
    if (ContextManager.Instance['bDateOfBirthEstimated'] != null) {
      PatientContext.IsEstimatedDOB = Convert.ToBoolean(
        ContextManager.Instance['bDateOfBirthEstimated'].ToString()
      );
    }
    if (ContextManager.Instance['IsClinicalNote'] != null) {
      QueryStringInfo.IsClinicalNote =
        ContextManager.Instance['IsClinicalNote'].ToString();
    }
    if (ContextManager.Instance['RequestLockOID'] != null) {
      QueryStringInfo.RequestLockOID =
        ContextManager.Instance['RequestLockOID'].ToString();
    }
    if (
      !String.IsNullOrEmpty(WebServiceURLMedicationCommonBB.ManageSecurityWS)
    ) {
      MedicationPrescriptionHelper.GetRoleDetails(
        (s,e) => {this.ProxyService_GetRoleCompleted(s,e);}
      );
    }
    if (
      ContextManager.Instance['GPAutoSaveClerk'] != null &&
      String.Equals(
        ContextManager.Instance['GPAutoSaveClerk'].ToString(),
        'true',
        StringComparison.InvariantCultureIgnoreCase
      )
    ) {
      QueryStringInfo.IsGPAutoSaveClerk = true;
      if (ContextManager.Instance.NameExists('GPAutoSaveClerk')) {
        ContextManager.Instance.Remove('GPAutoSaveClerk');
      }
    } else {
      QueryStringInfo.IsGPAutoSaveClerk = false;
    }
    if (ContextManager.Instance['IsPatientTranferAct'] != null) {
      PatientContext.IsPatientTranferAct =
        ContextManager.Instance['IsPatientTranferAct'].ToString();
    }
  }
  ProxyService_GetRoleCompleted(
    sender: Object,
    e: GetRoleCompletedEventArgs
  ): void {
    if (
      e != null &&
      e.Result != null &&
      e.Result.objRoles != null &&
      e.Result.objRoles.Count > 0
    ) {
      let _Role: CRole = e.Result.objRoles.FirstOrDefault();
      if (_Role != null && _Role.OID > 0) {
        AppContextInfo.JobRoleOID = _Role.OID.ToString();
      }
    }
  }
  public override SubmitDrugs(): void {
    //R/f from PAN 216
    this.SubmitDrugsRetryCount = this.SubmitDrugsRetryCount + 1;

    let objReqFill: IPPMAManagePrescSer.CReqMsgSubmitDrugs =
      new IPPMAManagePrescSer.CReqMsgSubmitDrugs();
    let objReqFillClrk: IPPMAManagePrescSer.CReqMsgSubmitClerkMedDrugs;
    objReqFill.oContextInformation = Common.FillContext();
    objReqFill.oMedicationBC = new IPPMAManagePrescSer.Medication();
    objReqFill.oMedicationBC.CACode = this.CACode;
    objReqFill.oMedicationBC.EncounterType = PatientContext.EncounterType;
    super.FillPatientPrescription(objReqFill.oMedicationBC);
    objReqFill.oMedicationBC.PatientPrescription.PrescriptionItems =
      new ObservableCollection<IPPMAManagePrescSer.PrescriptionItemDetails>();
    objReqFill.oMedicationBC.TechnicalValidation =
      new ObservableCollection<IPPMAManagePrescSer.TechnicalValidationInfo>();
    objReqFill.oMedicationBC.PatientPrescription.MCVersionNo =
      AppSessionInfo.AMCV;
    objReqFill.oMedicationBC.PatientPrescription.TeamOID = this.TeamOId;
    if (String.Compare(this.CACode, 'MN_RECORDPGDSUPLY_P2') == 0) {
      objReqFill.oMedicationBC.PatientPrescription.IsPGD = '1';
    }
    if (this.TeamMembersOID != null && this.TeamMembersOID.Length > 0) {
      objReqFill.oMedicationBC.PatientPrescription.TeamMembersOID =
        new IPPMAManagePrescSer.ArrayOfLong();
      this.TeamMembersOID.forEach((lnTeamMemberOID) => {
        objReqFill.oMedicationBC.PatientPrescription.TeamMembersOID.Add(
          lnTeamMemberOID
        );
      });
    }
    if (this.SelectedPrescribeItem != null)
      objReqFill.oMedicationBC.PatientPrescription.IsIntray =
        this.SelectedPrescribeItem.IsexistAuthoriseOID;
    if (this.MedsResolve != null) {
      CSequentialHelper.CommonValidateSequence(
        this.MedsResolve,
        this.OriginalLastInfusionGroupSequence
      );
    }
    let oPrescribedData = this.MedsResolve.Where(
      (item) => !String.IsNullOrEmpty(item.OperationMode)
    ).Select((item) => item);
    if (
      this.IsPatientHeightWTUpdatedChecked &&
      MedicationCommonProfileData.PrescribeConfig != null &&
      MedicationCommonProfileData.PrescribeConfig.EnableDoseCalc
    ) {
      objReqFill.oMedicationBC.PresItemPatientAddnDetail =
        super.FillPresItemPatientAddnDetail();
    }
    oPrescribedData.forEach((oItemVM) => {
      if (
        String.Compare(
          oItemVM.OperationMode,
          'N',
          StringComparison.OrdinalIgnoreCase
        ) == 0 ||
        String.Compare(
          oItemVM.OperationMode,
          'CU',
          StringComparison.OrdinalIgnoreCase
        ) == 0 ||
        String.Compare(
          oItemVM.OperationMode,
          'DRCU',
          StringComparison.OrdinalIgnoreCase
        ) == 0 ||
        String.Compare(
          oItemVM.OperationMode,
          'U',
          StringComparison.OrdinalIgnoreCase
        ) == 0 ||
        String.Compare(
          oItemVM.OperationMode,
          'UA',
          StringComparison.OrdinalIgnoreCase
        ) == 0 ||
        String.Compare(
          oItemVM.OperationMode,
          'UI',
          StringComparison.OrdinalIgnoreCase
        ) == 0
      ) {
        let prsItem: IPPMAManagePrescSer.PrescriptionItemDetails =
          this.GetResolvePrscriptionItemDetails(oItemVM);
        if (
          !String.IsNullOrEmpty(oItemVM.SequentialActionPerfromCodeAEITS) &&
          !oItemVM.OperationMode.Equals(
            'UA',
            StringComparison.InvariantCultureIgnoreCase
          )
        ) {
          oItemVM.OperationMode = 'UI';
          prsItem.SequentialActionPerformCode =
            oItemVM.SequentialActionPerfromCodeAEITS;
        }
        if (
          String.Compare(oItemVM.OperationMode, 'N') == 0 &&
          oItemVM.PrescriptionItemOID > 0 &&
          oItemVM.ActionCode == ActivityTypes.UnHold
        )
          oItemVM.OperationMode = 'U';
        if (String.Compare(oItemVM.OperationMode, 'U') == 0)
          prsItem.ActionPerformedCode = CAActivity.CA_UNHOLD;
        if (String.Compare(oItemVM.OperationMode, 'UA') == 0) {
          prsItem.ActionPerformedCode = CAActivity.CA_UPDATEDRUGS;
          if (
            oItemVM != null &&
            oItemVM.FormViewerDetails != null &&
            oItemVM.FormViewerDetails.BasicDetails != null &&
            oItemVM.FormViewerDetails.BasicDetails.InfusionDetails != null &&
            oItemVM.FormViewerDetails.BasicDetails.InfusionDetails
              .GroupSequenceNo > 0 &&
            oItemVM.FormViewerDetails.BasicDetails.InfusionDetails
              .IsSequentialStartDTTMUpdated
          ) {
            prsItem.SequentialActionPerformCode =
              CAActivity.SequentialActionCodeAEITS;
          }
          if (
            oItemVM != null &&
            oItemVM.FormViewerDetails != null &&
            oItemVM.FormViewerDetails.BasicDetails != null &&
            oItemVM.FormViewerDetails.BasicDetails.SequenceInfo != null &&
            oItemVM.FormViewerDetails.BasicDetails.SequenceInfo
              .GroupSequenceNo > 0 &&
            oItemVM.FormViewerDetails.BasicDetails.SequenceInfo
              .IsSequentialStartDTTMUpdated
          ) {
            prsItem.SequentialActionPerformCode =
              CAActivity.NonIVSeqUpdForSubsequentItems;
          }
        }
        if (String.Compare(oItemVM.OperationMode, 'UI') == 0) {
          if (
            oItemVM != null &&
            oItemVM.FormViewerDetails != null &&
            oItemVM.FormViewerDetails.BasicDetails != null &&
            oItemVM.FormViewerDetails.BasicDetails.SequenceInfo != null &&
            oItemVM.FormViewerDetails.BasicDetails.SequenceInfo
              .GroupSequenceNo > 0
          ) {
            prsItem.ActionPerformedCode = CAActivity.CA_UPDATE_NONIVSEQ_DRUGS;
          } else {
            prsItem.ActionPerformedCode = CAActivity.CA_UPDATE_SEQ_DRUGS;
          }
        }
        if (
          !String.IsNullOrEmpty(oItemVM.OperationMode) &&
          String.Compare(oItemVM.OperationMode, 'CU') == 0 &&
          oItemVM.PrescriptionItemOID > 0 &&
          oItemVM.ActionCode == ActivityTypes.ConflictUpdate
        ) {
          prsItem.ActionPerformedCode = CAActivity.OnlyConflictsUpdate;
        }
        if (
          !String.IsNullOrEmpty(oItemVM.OperationMode) &&
          oItemVM.PrescriptionItemOID > 0 &&
          oItemVM.ActionCode == ActivityTypes.Amend &&
          (String.Compare(oItemVM.OperationMode, 'DRCU') == 0 ||
            (oItemVM.FormViewerDetails.PresItemDRCVM != null &&
              oItemVM.FormViewerDetails.PresItemDRCVM.IsAmendDRCRegenarated))
        ) {
          prsItem.OnlyDRCConflictsUpdate = true;
          if (
            String.IsNullOrEmpty(prsItem.ActionPerformedCode) ||
            (!String.Equals(
              prsItem.ActionPerformedCode,
              CAActivity.CA_UPDATEDRUGS,
              StringComparison.InvariantCultureIgnoreCase
            ) &&
              !String.Equals(
                prsItem.ActionPerformedCode,
                CAActivity.CA_UPDATE_SEQ_DRUGS,
                StringComparison.InvariantCultureIgnoreCase
              ) &&
              !String.Equals(
                prsItem.ActionPerformedCode,
                CAActivity.CA_UPDATE_NONIVSEQ_DRUGS,
                StringComparison.InvariantCultureIgnoreCase
              ) &&
              !String.Equals(
                prsItem.ActionPerformedCode,
                CAActivity.OnlyConflictsUpdate,
                StringComparison.InvariantCultureIgnoreCase
              ))
          ) {
            prsItem.ActionPerformedCode = CAActivity.OnlyDRCConflictsUpdate;
          }
        }
        prsItem.PrescriptionItemNumber = oItemVM.PrescriptionItemNumber;
        if (
          String.Compare(
            objReqFill.oMedicationBC.PatientPrescription.PrescriptionType,
            PrescriptionTypes.Clerking,
            StringComparison.OrdinalIgnoreCase
          ) == 0 ||
          PatientContext.ClerkFormViewDefaultBehavior ==
            ClerkFormViewDeftBehaviour.LaunchFormMandatory
        ) {
          if (
            objReqFill.oMedicationBC.PatientPrescription.PrescriptionItems !=
              null &&
            objReqFill.oMedicationBC.PatientPrescription.PrescriptionItems
              .Count > 0
          ) {
            let oDataFound =
              objReqFill.oMedicationBC.PatientPrescription.PrescriptionItems.Where(
                (item) =>
                  item.ReorderedFromclerkItemOID ==
                  prsItem.ReorderedFromclerkItemOID
              ).Select((item) => item);
            if (oDataFound != null && oDataFound.Count() > 0) {
              prsItem.ReorderedFromclerkItemOID = 0;
            }
          }
        }
        oItemVM.SetPrnScheduleDet(prsItem);
        if (!oItemVM.ClearAdminTimesForPRN(prsItem)) {
          prsItem.BasicProperties.Dose.DoseRegime[0].FrequencyDetails.ScheduledTimes =
            null;
        }
        objReqFill.oMedicationBC.PatientPrescription.PrescriptionItems.Add(
          prsItem
        );
        if (
          this.MedsPrint != null &&
          (this.CACode == 'MN_MEDDISCHRGESL_P2' ||
            (String.Compare(this.CACode, 'MN_RECORDPGDSUPLY_P2') == 0 &&
              String.Compare(PatientContext.PrescriptionType, 'CC_DSCHRG') ==
                0))
        ) {
          this.MedsPrint.forEach((oVM) => {
            objReqFill.oMedicationBC.PrintDispensingcomments =
              this.PrintDisInstComments;
            objReqFill.oMedicationBC.PrintDispensingInstruction =
              this.PrintDisInstruction;
            if (!String.IsNullOrEmpty(this.PrintDisInstruction))
              objReqFill.oMedicationBC.IsPresLvlDispense = '1';
            else objReqFill.oMedicationBC.IsPresLvlDispense = '0';
          });
        }
        if (
          prsItem.ActionPerformedCode == CAActivity.CA_UPDATEDRUGS &&
          String.IsNullOrEmpty(prsItem.ActionPerformed.ActionCode)
        ) {
          prsItem.ActionPerformed.ActionCode = 'CC_AMEND';
          if (
            oItemVM != null &&
            oItemVM.formViewerDetails != null &&
            oItemVM.formViewerDetails.BasicDetails != null &&
            oItemVM.formViewerDetails.BasicDetails.ReasonforModification != null
          ) {
            prsItem.ActionPerformed.ReasonForModification =
              oItemVM.formViewerDetails.BasicDetails.ReasonforModification.DisplayText;
          }
        }
      } else if (
        String.Compare(
          oItemVM.OperationMode,
          'M',
          StringComparison.OrdinalIgnoreCase
        ) == 0
      ) {
        let info: IPPMAManagePrescSer.DeletedItemsInfo =
          new IPPMAManagePrescSer.DeletedItemsInfo();
        info.PrescriptionItemData =
          new IPPMAManagePrescSer.PrescriptionItemInputData();
        info.PrescriptionItemData.OID = oItemVM.PrescriptionItemOID;
        info.IsPatMerged =
          PatientContext.PatientOID > 0 &&
          PatientContext.MergedPatientOID > 0 &&
          PatientContext.PatientOID != PatientContext.MergedPatientOID
            ? '1'
            : '0';
        info.PrescriptionItemData.PrescriptionItemStatus =
          oItemVM.PrescriptionItemStatus;
        if (
          PatientContext.ClerkFormViewDefaultBehavior ==
          ClerkFormViewDeftBehaviour.LaunchFormMandatory
        ) {
          info.PrescriptionItemData.PrescriptionType =
            PrescriptionTypes.Clerking;
        } else {
          info.PrescriptionItemData.PrescriptionType =
            PatientContext.PrescriptionType;
        }
        info.DeletedInfo = new IPPMAManagePrescSer.PrescriptionItemAction();
        info.DeletedInfo.ActionCode = oItemVM.PrescriptionItemStatus;
        if (oItemVM != null && oItemVM.DiscontinueCancelReason != null) {
          info.DeletedInfo.DirectDiscontinueReason =
            oItemVM.DiscontinueCancelReason.DisplayText;
          this.sPresOIDDisSum = oItemVM.PrescriptionOID;
        }
        if (
          oItemVM != null &&
          oItemVM.FormViewerDetails != null &&
          oItemVM.FormViewerDetails.BasicDetails != null &&
          oItemVM.FormViewerDetails.BasicDetails.ManageReviewDetail != null &&
          oItemVM.FormViewerDetails.BasicDetails.ManageReviewDetail
            .oReviewAfterDetail != null &&
          !String.IsNullOrEmpty(
            oItemVM.FormViewerDetails.BasicDetails.ManageReviewDetail
              .oReviewAfterDetail.ReviewOutcomeComments
          )
        ) {
          info.PrescriptionItemData.ReviewOutcomeComments =
            oItemVM.FormViewerDetails.BasicDetails.ManageReviewDetail.oReviewAfterDetail.ReviewOutcomeComments;
        }
        if (
          oItemVM.FormViewerDetails.BasicDetails.ReasonforModification !=
            null &&
          !String.IsNullOrEmpty(
            oItemVM.FormViewerDetails.BasicDetails.ReasonforModification
              .DisplayText
          )
        ) {
          info.DeletedInfo.ReasonForModification =
            oItemVM.FormViewerDetails.BasicDetails.ReasonforModification.DisplayText;
        }
        if (
          oItemVM.FormViewerDetails.BasicDetails.ModificationComments != null &&
          !String.IsNullOrEmpty(
            oItemVM.FormViewerDetails.BasicDetails.ModificationComments
          )
        ) {
          info.DeletedInfo.ModificationComments =
            oItemVM.FormViewerDetails.BasicDetails.ModificationComments;
        }
        if (!String.IsNullOrEmpty(oItemVM.sPatAllergyOIDs)) {
          let sPatAllergyOIDs: string[] = oItemVM.sPatAllergyOIDs.Split(',');
          info.PrescriptionItemData.PatientAllergyOID =
            new IPPMAManagePrescSer.ArrayOfString();
          for (let i: number = 0; i < sPatAllergyOIDs.length; i++) {
            info.PrescriptionItemData.PatientAllergyOID.Add(sPatAllergyOIDs[i]);
          }
        }
        info.DeletedInfo.LastModifiedAt = oItemVM.LastModifiedAt;
        if (
          oItemVM.FormViewerDetails.BasicDetails.InfusionDetails != null &&
          oItemVM.FormViewerDetails.BasicDetails.InfusionDetails
            .ItemSequenceNo > 0
        ) {
          info.PrescriptionItemData.InfusionSeqOrder =
            oItemVM.FormViewerDetails.BasicDetails.InfusionDetails.ItemSequenceNo;
          info.PrescriptionItemData.ParentPrescriptionItemOID =
            oItemVM.FormViewerDetails.BasicDetails.InfusionDetails.ParentPrescriptionItemOID;
        } else if (
          oItemVM.FormViewerDetails.BasicDetails.SequenceInfo != null &&
          oItemVM.FormViewerDetails.BasicDetails.SequenceInfo.ItemSequenceNo > 0
        ) {
          info.PrescriptionItemData.InfusionSeqOrder =
            oItemVM.FormViewerDetails.BasicDetails.SequenceInfo.ItemSequenceNo;
          info.PrescriptionItemData.ParentPrescriptionItemOID =
            oItemVM.FormViewerDetails.BasicDetails.SequenceInfo.ParentPrescriptionItemOID;
        }
        if (
          oItemVM.FormViewerDetails.BasicDetails != null &&
          oItemVM.FormViewerDetails.BasicDetails.InfusionDetails != null &&
          oItemVM.FormViewerDetails.BasicDetails.InfusionType != null &&
          (oItemVM.FormViewerDetails.BasicDetails.InfusionType.Value ==
            InfusionTypesCode.CONTINUOUS ||
            oItemVM.FormViewerDetails.BasicDetails.InfusionType.Value ==
              InfusionTypesCode.SINGLEDOSEVOLUME ||
            oItemVM.FormViewerDetails.BasicDetails.InfusionType.Value ==
              InfusionTypesCode.FLUID) &&
          oItemVM.FormViewerDetails.BasicDetails.InfusionDetails
            .IsDisCancelSequential
        ) {
          info.PrescriptionItemData.DiscontinouscancelSequential =
            oItemVM.FormViewerDetails.BasicDetails.InfusionDetails.IsDisCancelSequential;
        }
        if (oItemVM.IsInfInprogress) {
          info.PrescriptionItemData.IsInfusionInProgress =
            oItemVM.IsInfInprogress;
        } else if (oItemVM.IsAdministratedDiscontinue) {
          info.PrescriptionItemData.IsInfusionInProgress =
            oItemVM.IsAdministratedDiscontinue;
        }
        if (objReqFill.oMedicationBC.CancelledDrugs == null)
          objReqFill.oMedicationBC.CancelledDrugs =
            new ObservableCollection<IPPMAManagePrescSer.DeletedItemsInfo>();
        objReqFill.oMedicationBC.CancelledDrugs.Add(info);
      } else if (
        String.Compare(
          oItemVM.OperationMode,
          'TM',
          StringComparison.OrdinalIgnoreCase
        ) == 0
      ) {
        let oItemDetails: IPPMAManagePrescSer.PrescriptionItemDetails =
          this.GetResolvePrscriptionItemDetails(oItemVM);
        if (
          oItemDetails != null &&
          oItemDetails.TechValidateDetails != null &&
          oItemDetails.TechValidateDetails.Count > 0 &&
          oItemDetails.TechValidateDetails[0] != null &&
          oItemDetails.TechValidateDetails[0].TechValidatedItems != null &&
          oItemDetails.TechValidateDetails[0].TechValidatedItems.Count > 0
        ) {
          oItemDetails.TechValidateDetails[0].IsMergePatient =
            PatientContext.PatientOID > 0 &&
            PatientContext.MergedPatientOID > 0 &&
            PatientContext.PatientOID != PatientContext.MergedPatientOID
              ? '1'
              : '0';
          oItemDetails.TechValidateDetails[0].EncounterOID =
            PatientContext.EncounterOid;
          oItemDetails.TechValidateDetails[0].PrescriptionOID =
            oItemDetails.PrescriptionOID;
          if (oItemDetails.TechValidateDetails[0].Technicalvalidateupdate)
            objReqFill.oMedicationBC.TechnicalValidation.Add(
              oItemDetails.TechValidateDetails[0]
            );
        }
      }
    });

    //<PrescriptionItems />
    if  ((typeof(objReqFill.oMedicationBC.PatientPrescription.PrescriptionItems) == 'undefined') ||
        (objReqFill.oMedicationBC.PatientPrescription.PrescriptionItems && 
        objReqFill.oMedicationBC.PatientPrescription.PrescriptionItems.Length == 0))
        {
          objReqFill.oMedicationBC.PatientPrescription.PrescriptionItems = new ObservableCollection<IPPMAManagePrescSer.PrescriptionItemDetails>();
           ObjectHelper.SetNullforArray(objReqFill.oMedicationBC.PatientPrescription.PrescriptionItems);
        }
    if (this.MedsDeletedItemsResolve != null) {
      this.MedsDeletedItemsResolve.forEach((lnPrescriptionItemOID) => {
        if (objReqFill.oMedicationBC.BackedOutDrugs == null)
          objReqFill.oMedicationBC.BackedOutDrugs =
            new ObservableCollection<IPPMAManagePrescSer.PrescriptionItemInputData>();
        let oItem: IPPMAManagePrescSer.PrescriptionItemInputData =
          new IPPMAManagePrescSer.PrescriptionItemInputData();
        oItem.OID = lnPrescriptionItemOID;
        oItem.PatientOID = PatientContext.PatientOID;
        objReqFill.oMedicationBC.BackedOutDrugs.Add(oItem);
      });
    }
    if (
      (this.CACode == 'MN_MEDDISCHRGESL_P2' ||
        this.CACode == 'MN_MEDINPATSL_P2' ||
        this.CACode == 'MN_MEDADMINISTRAT_P2') &&
      this.MedsReconcile != null
    ) {
      if (objReqFill.oMedicationBC.ReconciledDrugs == null)
        objReqFill.oMedicationBC.ReconciledDrugs =
          new ObservableCollection<IPPMAManagePrescSer.ReconciledItems>();
      this.MedsReconcile.forEach((oVM) => {
        let oReconciledItems: IPPMAManagePrescSer.ReconciledItems =
          new IPPMAManagePrescSer.ReconciledItems();
        oReconciledItems.PrescriptionItemOID = oVM.PrescriptionItemOID;
        oReconciledItems.PrescriptionOID = oVM.PrescriptionOID;
        if (
          PatientContext.ClerkFormViewDefaultBehavior ==
          ClerkFormViewDeftBehaviour.LaunchFormMandatory
        ) {
          oReconciledItems.prescriptiontype = PrescriptionTypes.Clerking;
        } else {
          oReconciledItems.prescriptiontype = PatientContext.PrescriptionType;
        }
        oReconciledItems.EncounterOID = PatientContext.EncounterOid;
        oReconciledItems.MCVersionNo = AppSessionInfo.AMCV;
        oReconciledItems.IsMerged =
          PatientContext.PatientOID > 0 &&
          PatientContext.MergedPatientOID > 0 &&
          PatientContext.PatientOID != PatientContext.MergedPatientOID
            ? '1'
            : '0';
        oReconciledItems.ReconciledStatus =
          new IPPMAManagePrescSer.PrescriptionItemAction();
        if (
          PatientContext.PrescriptionType != PrescriptionTypes.ForAdministration
        ) {
          if (
            oVM.FormViewerDetails.BasicDetails.ReasonforModification != null &&
            !String.IsNullOrEmpty(
              oVM.FormViewerDetails.BasicDetails.ReasonforModification.Value
            )
          ) {
            oReconciledItems.ReconciledStatus.ReasonForModification =
              oVM.FormViewerDetails.BasicDetails.ReasonforModification.Value;
            oReconciledItems.ReconciledStatus.ActionCode =
              CConstants.RECONCILEDSTOPPED;
          } else
            oReconciledItems.ReconciledStatus.ActionCode =
              CConstants.NOTRECONCILED;
          if (
            oVM.FormViewerDetails.BasicDetails.ReasonforModificationIP != null
          )
            oReconciledItems.ReconciledStatus.IPReconcileReason =
              oVM.FormViewerDetails.BasicDetails.ReasonforModificationIP;
        } else {
          if (
            oVM.FormViewerDetails.BasicDetails.ReasonforModification != null &&
            !String.IsNullOrEmpty(
              oVM.FormViewerDetails.BasicDetails.ReasonforModification.Value
            )
          ) {
            oReconciledItems.ReconciledStatus.IPReconcileReason =
              oVM.FormViewerDetails.BasicDetails.ReasonforModification.Value;
            oReconciledItems.ReconciledStatus.ActionCode =
              CConstants.RECONCILEDSTOPPED;
          } else
            oReconciledItems.ReconciledStatus.ActionCode =
              CConstants.NOTRECONCILED;
          if (
            oVM.FormViewerDetails.BasicDetails.ReasonforModificationDis != null
          )
            oReconciledItems.ReconciledStatus.ReasonForModification =
              oVM.FormViewerDetails.BasicDetails.ReasonforModificationDis;
        }
        if (
          PatientContext.PrescriptionType != PrescriptionTypes.ForAdministration
        ) {
          if (!String.IsNullOrEmpty(oVM.ReconcileComments)) {
            oReconciledItems.ReconciledStatus.ReconcileComments =
              oVM.ReconcileComments;
            oReconciledItems.ReconciledStatus.ActionCode =
              CConstants.RECONCILEDSTOPPED;
          }
          if (!String.IsNullOrEmpty(oVM.ReconcilecommentsIP))
            oReconciledItems.ReconciledStatus.IPReconcileComments =
              oVM.ReconcilecommentsIP;
        } else {
          if (!String.IsNullOrEmpty(oVM.ReconcileComments)) {
            oReconciledItems.ReconciledStatus.IPReconcileComments =
              oVM.ReconcileComments;
            oReconciledItems.ReconciledStatus.ActionCode =
              CConstants.RECONCILEDSTOPPED;
          }
          if (!String.IsNullOrEmpty(oVM.ReconcilecmmentsDis))
            oReconciledItems.ReconciledStatus.ReconcileComments =
              oVM.ReconcilecmmentsDis;
        }
        objReqFill.oMedicationBC.ReconciledDrugs.Add(oReconciledItems);
      });
      if (this.MedsReorder != null) {
        this.MedsReorder.forEach((oVM) => {
          let oReconciledItems: IPPMAManagePrescSer.ReconciledItems =
            new IPPMAManagePrescSer.ReconciledItems();
          oReconciledItems.PrescriptionItemOID = oVM.SourcePrescriptionOid;
          oReconciledItems.PrescriptionOID = oVM.SourcePresOid;
          oReconciledItems.EncounterOID = PatientContext.EncounterOid;
          if (
            PatientContext.ClerkFormViewDefaultBehavior ==
            ClerkFormViewDeftBehaviour.LaunchFormMandatory
          ) {
            oReconciledItems.prescriptiontype = PrescriptionTypes.Clerking;
          } else {
            oReconciledItems.prescriptiontype = PatientContext.PrescriptionType;
          }
          oReconciledItems.MCVersionNo = AppSessionInfo.AMCV;
          oReconciledItems.IsMerged =
            PatientContext.PatientOID > 0 &&
            PatientContext.MergedPatientOID > 0 &&
            PatientContext.PatientOID != PatientContext.MergedPatientOID
              ? '1'
              : '0';
          oReconciledItems.ReconciledStatus =
            new IPPMAManagePrescSer.PrescriptionItemAction();
          oReconciledItems.ReconciledStatus.ActionCode = CConstants.RECONCILED;
          if (
            PatientContext.PrescriptionType !=
            PrescriptionTypes.ForAdministration
          ) {
            if (
              oVM.FormViewerDetails.BasicDetails.ReasonforModification !=
                null &&
              !String.IsNullOrEmpty(
                oVM.FormViewerDetails.BasicDetails.ReasonforModification.Value
              )
            ) {
              oReconciledItems.ReconciledStatus.ReasonForModification =
                oVM.FormViewerDetails.BasicDetails.ReasonforModification.Value;
            }
            if (
              oVM.FormViewerDetails.BasicDetails.ReasonforModificationIP != null
            )
              oReconciledItems.ReconciledStatus.IPReconcileReason =
                oVM.FormViewerDetails.BasicDetails.ReasonforModificationIP;
          } else if (
            PatientContext.PrescriptionType ==
            PrescriptionTypes.ForAdministration
          ) {
            if (
              oVM.FormViewerDetails.BasicDetails.ReasonforModification !=
                null &&
              !String.IsNullOrEmpty(
                oVM.FormViewerDetails.BasicDetails.ReasonforModification.Value
              )
            ) {
              oReconciledItems.ReconciledStatus.IPReconcileReason =
                oVM.FormViewerDetails.BasicDetails.ReasonforModification.Value;
              oReconciledItems.ReconciledStatus.ReasonForModification =
                oVM.FormViewerDetails.BasicDetails.ReasonforModificationDis;
            }
            if (
              oVM.FormViewerDetails.BasicDetails.ReasonforModificationDis !=
              null
            )
              oReconciledItems.ReconciledStatus.ReasonForModification =
                oVM.FormViewerDetails.BasicDetails.ReasonforModificationDis;
          }
          if (
            PatientContext.PrescriptionType !=
            PrescriptionTypes.ForAdministration
          ) {
            if (!String.IsNullOrEmpty(oVM.ReconcileComments)) {
              oReconciledItems.ReconciledStatus.ReconcileComments =
                oVM.ReconcileComments;
            }
            if (!String.IsNullOrEmpty(oVM.ReconcilecommentsIP))
              oReconciledItems.ReconciledStatus.IPReconcileComments =
                oVM.ReconcilecommentsIP;
          } else if (
            PatientContext.PrescriptionType ==
            PrescriptionTypes.ForAdministration
          ) {
            if (!String.IsNullOrEmpty(oVM.ReconcileComments)) {
              oReconciledItems.ReconciledStatus.IPReconcileComments =
                oVM.ReconcileComments;
            }
            if (!String.IsNullOrEmpty(oVM.ReconcilecmmentsDis))
              oReconciledItems.ReconciledStatus.ReconcileComments =
                oVM.ReconcilecmmentsDis;
          }
          objReqFill.oMedicationBC.ReconciledDrugs.Add(oReconciledItems);
        });
      }
    }
    this.StationaryTYPOIDs = this.sStatTypOIDs.ToString().TrimStart(',');
    this.StationaryTYPNames = this.sStatTypNames.ToString().TrimStart(',');
    this.sStatTypOIDs = new StringBuilder(',');
    this.sStatTypNames = new StringBuilder(',');
    AppSession.SetString('SUB_WIZ', this.AppContext.MenuCode);
    if (
      String.Equals(
        this.WizardContext['LaunchingCACode'],
        CConstants.Clerking,
        StringComparison.InvariantCultureIgnoreCase
      ) &&
      String.IsNullOrEmpty(QueryStringInfo.IsClinicalNote)
    ) {
      AppSession.SetString('SetIPTab', this.AppContext.MenuCode);
    }
    if (this.IsCompletedByPrescriberBoxChecked == true) {
      if (this.MedsResolve == null || this.MedsResolve.Count == 0) {
        objReqFill.oMedicationBC.PatientPrescription.CompletedStatus =
          String.Empty;
      } else {
        objReqFill.oMedicationBC.PatientPrescription.CompletedStatus =
          CConstants.CompletedByPrescriber;
      }
    } else {
      if (this.MedsResolve == null || this.MedsResolve.Count == 0) {
        objReqFill.oMedicationBC.PatientPrescription.CompletedStatus =
          String.Empty;
      } else {
        objReqFill.oMedicationBC.PatientPrescription.CompletedStatus =
          CConstants.InProgress;
      }
    }
    let objServiceProxy: IPPMAManagePrescSer.IPPMAManagePrescriptionWSSoapClient =
      new IPPMAManagePrescSer.IPPMAManagePrescriptionWSSoapClient();
    
      //Revisit Required - To be removed when permanent solution arrives.
      //revist required commented to check if the permanent solution works
     // this.PopulateShadowProperties(objReqFill.oMedicationBC.PatientPrescription.PrescriptionItems);

    if (
      !String.IsNullOrEmpty(this.CACode) &&
      String.Compare(this.CACode, 'MN_MEDCLERKSL_P2') == 0
    ) {
      objReqFillClrk = new IPPMAManagePrescSer.CReqMsgSubmitClerkMedDrugs();
      objReqFillClrk.oContextInformation = objReqFill.oContextInformation;
      objReqFillClrk.oMedicationBC = objReqFill.oMedicationBC;
      objServiceProxy.SubmitClerkMedDrugsCompleted = (s, e) => {
        this.objServiceProxy_SubmitClerkMedDrugsCompleted(s, e);
      };
      objServiceProxy.SubmitClerkMedDrugsAsync(objReqFillClrk);
    } else {
      objServiceProxy.SubmitDrugsCompleted = (s, e) => {
        this.objServiceProxy_SubmitDrugsCompleted(s, e);
      };
      objServiceProxy.SubmitDrugsAsync(objReqFill);
    }
    super.SubmitDrugs();
  }
//Revisit Required - To be removed when permanent solution arrives.
  public PopulateShadowProperties(ObjPresItemDetails : ObservableCollection<IPPMAManagePrescSer.PrescriptionItemDetails>) : void{
    for(let i=0; i< ObjPresItemDetails.Count; i++){
      if (ObjPresItemDetails[i].BasicProperties != null)
      {
        ObjPresItemDetails[i].IPPBasicProperties = ObjPresItemDetails[i].BasicProperties;
          if (ObjPresItemDetails[i].IPPBasicProperties.Dose != null && ObjPresItemDetails[i].IPPBasicProperties.Dose.DoseRegime != null)
          {
            ObjPresItemDetails[i].IPPBasicProperties.Dose.IPPDoseRegime = ObjPresItemDetails[i].IPPBasicProperties.Dose.DoseRegime;
            for(let j=0; j< ObjPresItemDetails[i].IPPBasicProperties.Dose.IPPDoseRegime.Count; j++ ){
              if(ObjPresItemDetails[i].IPPBasicProperties.Dose.IPPDoseRegime[j].FrequencyDetails != null){
              ObjPresItemDetails[i].IPPBasicProperties.Dose.IPPDoseRegime[j].IPPFrequencyDetails = ObjPresItemDetails[i].IPPBasicProperties.Dose.IPPDoseRegime[j].FrequencyDetails;
              if (ObjPresItemDetails[i].IPPBasicProperties.Dose.IPPDoseRegime[j].IPPFrequencyDetails.ScheduledTimes != null){
                ObjPresItemDetails[i].IPPBasicProperties.Dose.IPPDoseRegime[j].IPPFrequencyDetails.IPPScheduledTimes=ObjPresItemDetails[i].IPPBasicProperties.Dose.IPPDoseRegime[j].IPPFrequencyDetails.ScheduledTimes;
              }
            }
          }
        }
      }
    }
  }

  private CreateVMobject(): void {
    this.ActivityConsideration = new iActivityConsideration();
    this.MedsClerked = new ObservableCollection<PrescriptionItemVM>();
    this.MedsDischarge = new ObservableCollection<PrescriptionItemVM>();
    this.MedsLeave = new ObservableCollection<PrescriptionItemVM>();
    this.MedsOutPatient = new ObservableCollection<PrescriptionItemVM>();
    this.MedsInPatient = new ObservableCollection<PrescriptionItemVM>();
    this.MedsResolve = new ObservableCollection<PrescriptionItemVM>();
    this.QuickSelectVM = new MedQuickSelectVM();
    this.DrugItem = new DrugItemInputData();
    this.MedsCopyReconcile = new ObservableCollection<PrescriptionItemVM>();
    this.MedsDeletedItemsResolve = new ObservableCollection<number>();
    this.MedsPrint = new ObservableCollection<PrescriptionItemVM>();
    this.MedsReconcile = new ObservableCollection<PrescriptionItemVM>();
    this.MedsReorder = new ObservableCollection<PrescriptionItemVM>();
    this.MedTabList = new ObservableCollection<iTabItem>();
    this.InfusionContinousSeq = new InfContinousSequentail();
    this.oMulticomponentVM = new MulticomponentVM();
    this.MedsGPConnect = new ObservableCollection<GPConnectItemVM>();
  }
  private LoadClientHealthObjects(): void {
    if (this.SuspendBuffer != null) {
      let objMedicationPrescribeVM: MedicationPrescribeVM = <
        MedicationPrescribeVM
      >this.SuspendBuffer;
      if (objMedicationPrescribeVM != null) {
        this.MedsClerked = objMedicationPrescribeVM.MedsClerked;
        this.MedsDischarge = objMedicationPrescribeVM.MedsDischarge;
        this.MedsLeave = objMedicationPrescribeVM.MedsLeave;
        this.MedsOutPatient = objMedicationPrescribeVM.MedsOutPatient;
        this.MedsInPatient = objMedicationPrescribeVM.MedsInPatient;
        this.MedsResolve = objMedicationPrescribeVM.MedsResolve;
        this.QuickSelectVM = objMedicationPrescribeVM.QuickSelectVM;
        this.DrugItem = objMedicationPrescribeVM.DrugItem;
        this.MedsCopyReconcile = objMedicationPrescribeVM.MedsCopyReconcile;
        this.MedsDeletedItemsResolve =
          objMedicationPrescribeVM.MedsDeletedItemsResolve;
        this.MedsPrint = objMedicationPrescribeVM.MedsPrint;
        this.MedsReconcile = objMedicationPrescribeVM.MedsReconcile;
        this.MedsReorder = objMedicationPrescribeVM.MedsReorder;
        this.MedTabList = objMedicationPrescribeVM.MedTabList;
        this.oMulticomponentVM = objMedicationPrescribeVM.oMulticomponentVM;
        this.InfusionContinousSeq =
          objMedicationPrescribeVM.InfusionContinousSeq;
        this.MedsGPConnect = objMedicationPrescribeVM.MedsGPConnect;
      }
    }
  }
  GetDomainComboValues(): void {
    let oPVM: PrescriptionItemVM = new PrescriptionItemVM();
    oPVM.GetDomainComboValues();
  }
}
