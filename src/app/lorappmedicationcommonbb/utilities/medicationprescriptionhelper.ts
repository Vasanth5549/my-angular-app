import {
  AppContextInfo,
  PatientContext,
} from 'src/app/lorappcommonbb/utilities/globalvariable';
//import { CommonBB } from 'src/app/shared/epma-platform/services/common.service';
import { Convert } from 'src/app/shared/epma-platform/services/convert.service';
import { ObjectHelper } from 'src/app/shared/epma-platform/services/objecthelper.service';
import {
  CReqMsgGetDrugBasicInfo,
  ManagePrescriptionWSSoapClient,
} from 'src/app/shared/epma-platform/soap-client/ManagePrescriptionWS';
import { CConstants, PrescriptionTypes } from './constants';
import * as ManagePrescSer from '../../shared/epma-platform/soap-client/ManagePrescriptionWS';
import { HtmlPage } from 'epma-platform/models';
import {
  CReqMsgGetProblemByCriteria,
  HealthIssueContext,
  ProblemSearchCriteria,
  SearchCriteria,
} from 'src/app/shared/epma-platform/soap-client/ManageProblemWS';
import * as ManageProblem from '../../shared/epma-platform/soap-client/ManageProblemWS';
import * as ManageAllergy from '../../shared/epma-platform/soap-client/ManageAllergyWS';
import {
  CReqMsgGetRole,
  CSecurityManagementServiceWSSoapClient,
} from 'src/app/shared/epma-platform/soap-client/CSecurityManagementServiceWS';
import {
  CReqMsgGetPatientLeaveByPatDet,
  QueryInpatientWSSoapClient,
} from 'src/app/shared/epma-platform/soap-client/QueryInpatientWS';
import { ScriptObject } from 'epma-platform/services';
import { CommonBB } from 'src/app/lorappcommonbb/utilities/common';
export class MedicationPrescriptionHelper {
  public static GetPrescriptionTypeCode(Code: string): string {
    switch (Code) {
      case 'MN_MEDCLR':
      case 'MN_MEDCLERKSL_P2':
        return PrescriptionTypes.Clerking;
      case 'MN_MEDLEAVE_P2':
      case 'MN_MEDLEAVESL_P2':
        return PrescriptionTypes.Leave;
      case 'MN_MEDOUTPAT_P2':
      case 'MN_MEDOUTPATSL_P2':
        return PrescriptionTypes.Outpatient;
      case 'MN_MEDDISCHARGE_P2':
      case 'MN_MEDDISCHRGESL_P2':
        return PrescriptionTypes.Discharge;
      case 'MN_MEDINPATSL_P2':
      case 'MN_MEDADMINISTRAT_P2':
        return 'CC_FOR_ADMIN';
      default:
        return String.Empty;
    }
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
      default:
        return String.Empty;
    }
  }
  public static GetRoleDetails(oGetRoleCompleted: Function): void {
    let objService: CSecurityManagementServiceWSSoapClient =
      new CSecurityManagementServiceWSSoapClient();
    objService.GetRoleCompleted = (s, e) => {
      oGetRoleCompleted(s, e);
    };
    let objReq: CReqMsgGetRole = new CReqMsgGetRole();
    objReq.oContextInformation = CommonBB.FillContext();
    objReq.sNameBC = AppContextInfo.JobRoleName;
    objService.GetRoleAsync(objReq);
  }
  public static GetProblemByCriteria(
    oGetProblemByCriteriaCompleted: Function
  ): void {
    let sImageList: string = String.Empty;
    let oProbReq: CReqMsgGetProblemByCriteria =
      new CReqMsgGetProblemByCriteria();
    oProbReq.oProblemSearchBC = new ProblemSearchCriteria();
    oProbReq.oProblemSearchBC.oProblemCriteria = new SearchCriteria();
    oProbReq.oContextInformation = CommonBB.FillContext();
    oProbReq.oContextBC = new HealthIssueContext();
    oProbReq.oContextBC.PatientOID = oProbReq.oContextInformation.PatientID;
    oProbReq.oContextBC.HOOId = Convert.ToInt64(
      oProbReq.oContextInformation.OrganizationID
    );
    oProbReq.oProblemSearchBC.oProblemCriteria.PageNo = 1;
    oProbReq.oProblemSearchBC.oProblemCriteria.PageSize = 20;
    oProbReq.oProblemSearchBC.oProblemCriteria.IncludeInactiveHI = '0';
    oProbReq.oProblemSearchBC.oProblemCriteria.IncludeStruckOutHI = '0';
    oProbReq.pageElementBC = new ManageProblem.PagingDynamicSQL();
    oProbReq.pageElementBC.SortingColumns = 'RecordedDTTM=0';

    oProbReq.oProblemSearchBC.SealRecordList =
      MedicationPrescriptionHelper.GetSealDrugs(
        CConstants.PatConf_Problem,
        (o) => {
          sImageList = o;
        }
      );
    oProbReq.oProblemSearchBC.SealImageList = sImageList;
    let probproxy: ManageProblem.ManageProblemWSSoapClient =
      new ManageProblem.ManageProblemWSSoapClient();
    probproxy.GetProblemByCriteriaCompleted = (s, e) => {
      oGetProblemByCriteriaCompleted(s, e);
    };
    probproxy.GetProblemByCriteriaAsync(oProbReq);
  }
  public static GetPatientAllergies(
    oGetPatientAllergiesCompleted: Function
  ): void {
    let sImageList: string = String.Empty;
    let AllergyReq: ManageAllergy.CReqMsgGetPatientAllergies =
      new ManageAllergy.CReqMsgGetPatientAllergies();
    AllergyReq.oAllergySearchCriteriaBC =
      new ManageAllergy.AllergySearchCriteria();
    AllergyReq.oContextInformation = CommonBB.FillContext();
    AllergyReq.oContextBC = new ManageAllergy.HealthIssueContext();
    AllergyReq.oContextBC.PatientOID = AllergyReq.oContextInformation.PatientID;
    AllergyReq.oContextBC.HOOId = Convert.ToInt64(
      AllergyReq.oContextInformation.OrganizationID
    );
    AllergyReq.oAllergySearchCriteriaBC.oHealthIssueCriteria =
      new ManageAllergy.SearchCriteria();
    AllergyReq.oAllergySearchCriteriaBC.oHealthIssueCriteria.PageNo = 1;
    AllergyReq.oAllergySearchCriteriaBC.oHealthIssueCriteria.PageSize = 20;
    AllergyReq.oAllergySearchCriteriaBC.oHealthIssueCriteria.IncludeInactiveHI =
      '0';
    AllergyReq.oAllergySearchCriteriaBC.oHealthIssueCriteria.IncludeStruckOutHI =
      '0';

    AllergyReq.oAllergySearchCriteriaBC.SealRecordList =
      MedicationPrescriptionHelper.GetSealDrugs(
        CConstants.PatConf_Allergy,
        (o) => {
          sImageList = o;
        }
      );
    AllergyReq.oAllergySearchCriteriaBC.SealImageList = sImageList;
    AllergyReq.pageElementBC = new ManageAllergy.PagingDynamicSQL();
    AllergyReq.pageElementBC.SortingColumns = 'Recorded on=0';
    let allergyproxy: ManageAllergy.ManageAllergyWSSoapClient =
      new ManageAllergy.ManageAllergyWSSoapClient();
    allergyproxy.GetPatientAllergiesCompleted = (s, e) => {
      oGetPatientAllergiesCompleted(s, e);
    };
    allergyproxy.GetPatientAllergiesAsync(AllergyReq);
  }
  public static GetPatientLeaveByPatDet(
    LeaveDate_GetPatientLeaveByPatDetCompleted: Function
  ): void {
    let objReq: CReqMsgGetPatientLeaveByPatDet =
      new CReqMsgGetPatientLeaveByPatDet();
    objReq.sPatientOIDBC = PatientContext.PatientOID.ToString();
    objReq.oContextInformation = CommonBB.FillContext();
    let LeaveDate: QueryInpatientWSSoapClient =
      new QueryInpatientWSSoapClient();
    LeaveDate.GetPatientLeaveByPatDetCompleted = (s, e) => {
      LeaveDate_GetPatientLeaveByPatDetCompleted(s, e);
    };
    LeaveDate.GetPatientLeaveByPatDetAsync(objReq);
  }
  public static GetDischargeDate(
    PatientDischargeDate_GetDischargeDateCompleted: Function
  ): void {
    let oReq: ManagePrescSer.CReqMsgGetDischargeDate =
      new ManagePrescSer.CReqMsgGetDischargeDate();
    oReq.EncounterOIDBC = PatientContext.EncounterOid;
    oReq.oContextInformation = CommonBB.FillContext();
    let PatientDischargeDate: ManagePrescSer.ManagePrescriptionWSSoapClient =
      new ManagePrescSer.ManagePrescriptionWSSoapClient();
    PatientDischargeDate.GetDischargeDateCompleted = (s, e) => {
      PatientDischargeDate_GetDischargeDateCompleted(s, e);
    };
    PatientDischargeDate.GetDischargeDateAsync(oReq);
  }

  public static GetSealDrugs(
    PatConfdltyTypeCode: string,
    out1: (sSealImageList: string) => void
  ): string {
    let sSealImageList: string;

    let sSealRecordList: string = String.Empty;
    sSealImageList = String.Empty;
    let sDrugs: ScriptObject = ObjectHelper.CreateType<ScriptObject>(
      HtmlPage.Window.Invoke('GetSealDrugsData', PatConfdltyTypeCode),
      'ScriptObject'
    );
    if (sDrugs != null) {
      if (sDrugs.GetProperty('SealRecordList') != null) {
        sSealRecordList = sDrugs.GetProperty('SealRecordList').ToString();
      }
      if (sDrugs.GetProperty('SealImageList') != null) {
        sSealImageList = sDrugs.GetProperty('SealImageList').ToString();
      }
    }
    out1(sSealImageList);
    return sSealRecordList;
  }

  public static GetDrugBasicInfo(
    PresItemOIDs: ManagePrescSer.ArrayOfLong,
    objService_GetDrugBasicInfoCompleted: Function
  ): void {
    if (PresItemOIDs != null && PresItemOIDs.Count > 0) {
      let objService: ManagePrescriptionWSSoapClient =
        new ManagePrescriptionWSSoapClient();
      objService.GetDrugBasicInfoCompleted = (s, e) => {
        objService_GetDrugBasicInfoCompleted(s, e);
      };
      let objRequest: CReqMsgGetDrugBasicInfo = new CReqMsgGetDrugBasicInfo();
      objRequest.oContextInformation = CommonBB.FillContext();
      objRequest.OIDsBC = PresItemOIDs;
      objService.GetDrugBasicInfoAsync(objRequest);
    }
  }

  public static GetWizardData(
    sData: string,
    out1: (sAllergyIDs: string) => void,
    out2: (WizardAction: string) => void
  ): void {
    let sAllergyIDs: string;
    let WizardAction: string;

    sAllergyIDs = String.Empty;
    WizardAction = String.Empty;
    let arrReturnData: string[] = sData.Split('&');
    if (arrReturnData.length > 0) {
      for (let i: number = 0; i < arrReturnData.length; i++) {
        let arrDataValue: string[] = arrReturnData[i].Split('=');
        if (arrDataValue.length == 2) {
          if (
            String.Compare(arrDataValue[0], 'AllergyID') == 0 &&
            sAllergyIDs == String.Empty
          ) {
            sAllergyIDs = arrDataValue[1];
          }
          if (
            String.Compare(arrDataValue[0], 'WIZ_Status') == 0 &&
            WizardAction == String.Empty
          ) {
            WizardAction = arrDataValue[1];
          }
        }
      }
    }
    out1(sAllergyIDs);
    out2(WizardAction);
  }
}
