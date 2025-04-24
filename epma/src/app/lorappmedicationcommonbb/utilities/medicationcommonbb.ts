import {
  ClerkFormViewDeftBehaviour,
  PatientContext,
} from 'src/app/lorappcommonbb/utilities/globalvariable';

import { Dictionary } from 'src/app/shared/epma-platform/index.dictionary';
import {  
  ChildWizardCloseEventargs,
  WindowButtonType,
} from 'src/app/shared/epma-platform/models/appdialog.type';

import { IEnumerable } from 'src/app/shared/epma-platform/models/ienumerable';
import { List } from 'src/app/shared/epma-platform/models/list';
import {
  CListItem,
  IProfileProp,
  RTEEventargs,
} from 'src/app/shared/epma-platform/models/model';
import { ObservableCollection } from 'src/app/shared/epma-platform/models/observable-collection';
import {
  CChartDisplayConfig,
  CMedicationLineDisplayData,
  CSlotCharacteristicsConfig,
  MedicationViewConfigData,
  PrescribingConfigData,
} from 'src/app/lorappslprofiletypes/medication';
import { Convert } from 'src/app/shared/epma-platform/services/convert.service';
import { ObjectHelper } from 'src/app/shared/epma-platform/services/objecthelper.service';
import { ProcessRTE } from 'src/app/shared/epma-platform/services/processRTE.service';
import { ProfileFactoryType } from 'src/app/shared/epma-platform/services/profileFactory.service';
import { StringBuilder } from 'src/app/shared/epma-platform/services/stringbuilder.service';
import {
  CConstants,
  DaysOfWeek,
  PrescriptionTypes,
  ValueDomain,
} from './constants';
import {
  CommonDomainValues,
  WebServiceURLMedicationCommonBB,
} from './globalvariable';
import {
  MedDoseTypeConceptCodeData,
  MedicationCommonProfileData,
  WarningConceptCode,
} from './profiledata';
import * as Application from 'src/app/lorappcommonbb/amshelper';
import { PrescriptionItemDetailsVM } from '../viewmodel/prescriptionitemdetailsvm';
import {
  BasicDetailsLineItemVM,
  FormViewerLineItemVM,
  InfusionLineItemVM,
  PrescriptionLineItemVM,
} from './lineitemconstructor';
import { CommonBB } from 'src/app/lorappcommonbb/utilities/common';
import DateTime from 'epma-platform/DateTime';
import { CommPrescriptionItemViewVM } from '../viewmodel/prescriptionitemviewvm';
import {
    AppActivity,
    AppLoadService,
  ContextManager,
  DayOfWeek,
  ScriptObject,
} from 'epma-platform/services';
import {
  AppDialogEventargs,
  AppDialogResult,
  CContextInformation,
  Double,  
  StringSplitOptions
} from 'src/app/shared/epma-platform/models/eppma-common-types';
import {
  AppContextInfo,
  AppSessionInfo,
  ContextInfo,
} from 'src/app/shared/epma-platform/models/globalvariable.type';
import { MonoGraphVM } from '../viewmodel/MonographVM';
import { MCommonBB } from './common';

import * as ManagePrescSer from '../../shared/epma-platform/soap-client/ManagePrescriptionWS';
import * as IPPManagePrescSer from '../../shared/epma-platform/soap-client/IPPMAManagePrescriptionWS';
import {
  CValuesetCollection,
  CValuesetTerm,
} from 'src/app/shared/epma-platform/soap-client/CReferenceWS';
import { TimeZoneInfo } from 'src/app/shared/epma-platform/models/time-zone-info';
import { Color } from 'epma-platform/controls';
import { LaunchWizard } from 'src/app/shared/epma-platform/models/launchwizard';
import 'epma-platform/booleanextension';
import 'epma-platform/numberextension';
import 'epma-platform/stringextension';
import {iMath} from 'epma-platform/mathextension';
import 'epma-platform/arrayextension';
import { ChildWindow } from 'src/app/shared/epma-platform/controls/ChildWindow';
import { HtmlPage } from 'src/app/shared/epma-platform/services/htmlpage.service';
import { meddrugmonographChild } from '../view/meddrugmonographchild';
//import { AppDialogEventargs, AppDialogResult } from 'src/app/shared/epma-platform/controls/iAppDialogWindow';

enum  StringComparison {
  CurrentCulture = 0,
  CurrentCultureIgnoreCase = 1,
  InvariantCulture = 2,
  InvariantCultureIgnoreCase = 3,
  Ordinal = 4,
  OrdinalIgnoreCase = 5
}
export class MedicationCommonBB {
  //public delegate void ProfileCompletedEventHandler();
  public static ProfileCompletedEvent: Function;
  //public delegate void ConceptCodesCompletedEventHandler();
  public static ConceptCodesCompletedEvent: Function;
  private static profile: ProfileFactoryType = new ProfileFactoryType();
  public static oChildWindow: ChildWindow;
  public static IsCalledFromWeb: boolean = false;
  public static IsAvoidDoubleClick: boolean = false;
  constructor() {
    MedicationCommonBB.profile.OnProfileLoaded = (s, e) => {
      MedicationCommonBB.profile_OnProfileLoaded(s, e);
    };
  }
  static GetPrescriptionTypeForPGDSupply(): string {
    let sPrescriptionType: string = String.Empty;
    switch (PatientContext.EncounterCode) {
      case 'CC_INPAT':
      case 'Inpatient': {
        sPrescriptionType = PrescriptionTypes.Discharge;
        break;
      }
      case 'CC_OUTPAT':
      case 'CC_CONT':
      case 'CC_ACCEM':
      case 'CC_WARDATT': {
        sPrescriptionType = PrescriptionTypes.Outpatient;
        break;
      }
    }
    return sPrescriptionType;
  }
  public GetConflictSealDetails(
    oSealingDetails: ObservableCollection<ManagePrescSer.SealingDetails>,
    HealthIssueCode: string,
    HealthIssueType: string
  ): ManagePrescSer.SealingDetails {
    let objConflictSealDetails: ManagePrescSer.SealingDetails = null;
    let oMedconflictSealData: IEnumerable<ManagePrescSer.SealingDetails>;
    if (oSealingDetails != null && oSealingDetails.Count > 0) {
      oMedconflictSealData = oSealingDetails
        .Where(
          (HCodeType) =>
            HCodeType != null &&
            String.Compare(HCodeType.IdentifyingCode, HealthIssueCode) == 0 &&
            String.Compare(HCodeType.IdentifyingType, HealthIssueType) == 0
        )
        .Select((HCodeType) => HCodeType);
      if (oMedconflictSealData != null && oMedconflictSealData.Count() > 0) {
        objConflictSealDetails = new ManagePrescSer.SealingDetails();
        oMedconflictSealData.forEach((obj) => {
          objConflictSealDetails = obj;
        });
      }
    }
    return objConflictSealDetails;
  }
  public static ConstructDaysOfWeek(
    sDaysOfWeek: IPPManagePrescSer.ArrayOfString
  ): string {
    let DaysOfWeekText: string = String.Empty;
    let sDaysofWeek: StringBuilder = new StringBuilder();
    if (
      !String.IsNullOrEmpty(sDaysOfWeek[0].ToString()) &&
      String.Equals(
        sDaysOfWeek[0],
        'T',
        StringComparison.CurrentCultureIgnoreCase
      )
    ) {
      sDaysofWeek.Append(DaysOfWeek.IsSunday);
    }
    if (
      !String.IsNullOrEmpty(sDaysOfWeek[1].ToString()) &&
      String.Equals(
        sDaysOfWeek[1],
        'T',
        StringComparison.CurrentCultureIgnoreCase
      )
    ) {
      if (sDaysofWeek != null && sDaysofWeek.Length > 0) {
        sDaysofWeek.Append(',');
      }
      sDaysofWeek.Append(DaysOfWeek.IsMonday);
    }
    if (
      !String.IsNullOrEmpty(sDaysOfWeek[2].ToString()) &&
      String.Equals(
        sDaysOfWeek[2],
        'T',
        StringComparison.CurrentCultureIgnoreCase
      )
    ) {
      if (sDaysofWeek != null && sDaysofWeek.Length > 0) {
        sDaysofWeek.Append(',');
      }
      sDaysofWeek.Append(DaysOfWeek.IsTuesday);
    }
    if (
      !String.IsNullOrEmpty(sDaysOfWeek[3].ToString()) &&
      String.Equals(
        sDaysOfWeek[3],
        'T',
        StringComparison.CurrentCultureIgnoreCase
      )
    ) {
      if (sDaysofWeek != null && sDaysofWeek.Length > 0) {
        sDaysofWeek.Append(',');
      }
      sDaysofWeek.Append(DaysOfWeek.IsWednesday);
    }
    if (
      !String.IsNullOrEmpty(sDaysOfWeek[4].ToString()) &&
      String.Equals(
        sDaysOfWeek[4],
        'T',
        StringComparison.CurrentCultureIgnoreCase
      )
    ) {
      if (sDaysofWeek != null && sDaysofWeek.Length > 0) {
        sDaysofWeek.Append(',');
      }
      sDaysofWeek.Append(DaysOfWeek.IsThursday);
    }
    if (
      !String.IsNullOrEmpty(sDaysOfWeek[5].ToString()) &&
      String.Equals(
        sDaysOfWeek[5],
        'T',
        StringComparison.CurrentCultureIgnoreCase
      )
    ) {
      if (sDaysofWeek != null && sDaysofWeek.Length > 0) {
        sDaysofWeek.Append(',');
      }
      sDaysofWeek.Append(DaysOfWeek.IsFriday);
    }
    if (
      !String.IsNullOrEmpty(sDaysOfWeek[6].ToString()) &&
      String.Equals(
        sDaysOfWeek[6],
        'T',
        StringComparison.CurrentCultureIgnoreCase
      )
    ) {
      if (sDaysofWeek != null && sDaysofWeek.Length > 0) {
        sDaysofWeek.Append(',');
      }
      sDaysofWeek.Append(DaysOfWeek.IsSaturday);
    }
    if (sDaysofWeek != null && sDaysofWeek.Length > 0) {
      DaysOfWeekText = sDaysofWeek.ToString();
    }
    return DaysOfWeekText;
  }
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
      case 'MN_RECORDPGDSUPLY_P2':
        return MedicationCommonBB.GetPrescriptionTypeForPGDSupply();
      default:
        return String.Empty;
    }
  }
  public static GetSlotCharacteristicsConfig(
    profile_OnProfileLoaded: Function
  ): void {
    let profile: ProfileFactoryType = new ProfileFactoryType();
    profile.OnProfileLoaded = (s, e) => {
      profile_OnProfileLoaded(s, e);
    };
    profile.GetProfile<CSlotCharacteristicsConfig>(
      'MA_ADMINSETTING',
      'MASLOTCHARCONFIG'
    );
  }
  public static GetChartDisplayConfigProfileData(
    profile_OnProfileLoaded: Function
  ): void {
    let profile: ProfileFactoryType = new ProfileFactoryType();
    profile.OnProfileLoaded = (s, e) => {
      profile_OnProfileLoaded(s, e);
    };
    profile.GetProfile<CChartDisplayConfig>(
      'MA_ADMINSETTING',
      'MACHARTDISPLAYCONFIG'
    );
  }
  //revisitmeyasik
  // public static GetSnomedTerm(SnomedCode: string): string {
  //   let oParam: string[] = new Array(1);
  //   oParam[0] = SnomedCode;
  //   let objterm: Object = HtmlPage.Window.Invoke('GetSnomedTerm', oParam);
  //   return Convert.ToString(objterm);
  // }

  public static GetSnomedTerm(SnomedCode: string): string {
    let oParam: string[] = new Array(1);
    oParam[0] = SnomedCode;
    // let objterm: Object = HtmlPage.Window.Invoke('GetSnomedTerm', oParam);
    // return Convert.ToString(objterm);

    let objterm: any = HtmlPage.Window.Invoke('GetSnomedTerm', oParam);
    return (objterm.returnData);
  }
  public static GetMedLineConfigProfileData(): void {
    MedicationCommonBB.profile.GetProfile<CMedicationLineDisplayData>(
      'VW_MEDICONFIG',
      'MEDLINEDISPLAY'
    );
    MedicationCommonBB.profile.GetProfile<MedicationViewConfigData>(
      'VW_MEDICONFIG',
      'MEDVIEWCONFIG'
    );
    MedicationCommonBB.profile.GetProfile<MedicationViewConfigData>(
      'VW_MEDICONFIG',
      'PRESCONFIG'
    );
  }
  private static profile_OnProfileLoaded(
    sender: Object,
    Result: IProfileProp
  ): void {
    if (Result == null) return;
    if (Result.Profile instanceof CMedicationLineDisplayData) {
      MedicationCommonProfileData.MedLineDisplay =
        ObjectHelper.CreateType<CMedicationLineDisplayData>(
          Result.Profile,
          CMedicationLineDisplayData
        );
    } else if (Result.Profile instanceof MedicationViewConfigData) {
      MedicationCommonProfileData.MedViewConfig =
        ObjectHelper.CreateType<MedicationViewConfigData>(
          Result.Profile,
          MedicationViewConfigData
        );
    } else if (Result.Profile instanceof PrescribingConfigData) {
      let objPrescribeConfigData: PrescribingConfigData =
        ObjectHelper.CreateType<PrescribingConfigData>(
          Result.Profile,
          PrescribingConfigData
        );
      if (objPrescribeConfigData != null)
        MedicationCommonProfileData.PrescribeConfig = objPrescribeConfigData;
    }
    if (
      MedicationCommonProfileData.MedLineDisplay != null &&
      MedicationCommonProfileData.MedViewConfig != null
    ) {
      if (this.ProfileCompletedEvent != null) {
        this.ProfileCompletedEvent();
      }
    }
  }
  public static GetConceptCodeValuesByDomains(): void {
    let sDomainCodes: string =
      'MEDPITSTC,IPPMAPRCTYP,MEDICATIONSITE,MedAdMhd,MEDDRSN,MEDCLERKING,MEDSUPPLYIN,MEDDOSEFRM,MEDTRTCONTINUE,ENTYP,ENSTATUS,MEDDOSE,MEDDBSAFR';
    if (
      String.Compare(
        PatientContext.PrescriptionType,
        PrescriptionTypes.Clerking,
        StringComparison.OrdinalIgnoreCase
      ) == 0
    ) {
      sDomainCodes += ',' + ValueDomain.MedicationClerking;
    }
    ProcessRTE.GetValuesByDomainCodes(sDomainCodes);
  }
  OnRTEResult(args: RTEEventargs): void {
    if (String.IsNullOrEmpty(args.Request) || args.Result == null) return;
    if (args.Result instanceof Dictionary) {
      let objResult: Dictionary<string, List<CListItem>> = <
        Dictionary<string, List<CListItem>>
      >args.Result;
      if (
        String.Compare(
          args.Request,
          'CNFTY,SUBAG,SUBCI,SUBINT,SUBDP,BHVTY,MEDSVRTY'
        ) == 0
      ) {
        objResult.forEach((objDomainDetail) => {
          switch (objDomainDetail.Key) {
            case 'MEDDOSE': {
              if (
                objDomainDetail.Value != null &&
                objDomainDetail.Value.Count > 0
              ) {
                MedDoseTypeConceptCodeData.ConceptCodes = new Dictionary<
                  string,
                  string
                >();
                objDomainDetail.Value.forEach((oCListItem) => {
                  MedDoseTypeConceptCodeData.ConceptCodes.Add(
                    oCListItem.Value.ToUpper(),
                    oCListItem.DisplayText
                  );
                });
              }
              break;
            }
            case 'MEDDBSAFR': {
              if (
                objDomainDetail.Value != null &&
                objDomainDetail.Value.Count > 0
              ) {
                CommonDomainValues.BSAFormula =
                  new ObservableCollection<CValuesetTerm>();
                objDomainDetail.Value.forEach((oCListItem) => {
                  CommonDomainValues.BSAFormula.Add(
                    ObjectHelper.CreateObject(new CValuesetTerm(), {
                      csCode: oCListItem.Value.ToUpper(),
                      csDescription: oCListItem.DisplayText,
                    })
                  );
                });
              }
              break;
            }
            case ValueDomain.MedicationClerking: {
              if (
                objDomainDetail.Value != null &&
                objDomainDetail.Value.Count > 0
              ) {
                CommonDomainValues.MedicationClerking =
                  new ObservableCollection<CValuesetTerm>();
                objDomainDetail.Value.forEach((oCListItem) => {
                  CommonDomainValues.MedicationClerking.Add(
                    ObjectHelper.CreateObject(new CValuesetTerm(), {
                      csCode: oCListItem.Value.ToUpper(),
                      csDescription: oCListItem.DisplayText,
                    })
                  );
                });
              }
              break;
            }
            default: {
              if (
                objDomainDetail.Value != null &&
                objDomainDetail.Value.Count > 0
              ) {
                MedDoseTypeConceptCodeData.ConceptCodes = new Dictionary<
                  string,
                  string
                >();
                objDomainDetail.Value.forEach((oCListItem) => {
                  MedDoseTypeConceptCodeData.ConceptCodes.Add(
                    oCListItem.Value.ToUpper(),
                    oCListItem.DisplayText
                  );
                });
              }
              break;
            }
          }
        });
      }
      if (MedicationCommonBB.ConceptCodesCompletedEvent != null) {
        MedicationCommonBB.ConceptCodesCompletedEvent();
      }
    }
  }
  public static hexToColor(hexValue: string): Color {
    let _ErrorID: number = 80000055;
    let _ErrorSource: string =
      'LorAppMedicationCommonBB.dll, Class:MedicationCommonBB, Method:hexToColor';
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
    } catch (ex: any) {
      Application.AMSHelper.PublicExceptionDetails(_ErrorID, _ErrorSource, ex);
      return Color.FromArgb(255, 251, 237, 187);
    }
  }
  public static GetPrescriptionLineItemVM(
    objPrescriptionItemVM: PrescriptionItemDetailsVM
  ): PrescriptionLineItemVM {
    let objPrescriptionLineItemVM: PrescriptionLineItemVM = null;
    objPrescriptionLineItemVM = new PrescriptionLineItemVM();
    objPrescriptionLineItemVM.FormViewerDetails = new FormViewerLineItemVM();
    objPrescriptionLineItemVM.FormViewerDetails.BasicDetails =
      new BasicDetailsLineItemVM();
    objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.InfusionDetails =
      new InfusionLineItemVM();
    if (
      objPrescriptionItemVM != null &&
      objPrescriptionItemVM.DrugDetails != null
    ) {
      objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.AdditionalComments =
        objPrescriptionItemVM.DrugDetails.Addition;
      objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.AdminInstruction =
        ObjectHelper.CreateObject(new CListItem(), {
          DisplayText: objPrescriptionItemVM.DrugDetails.AdminInsturction,
        });
      objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.AdminMethod =
        ObjectHelper.CreateObject(new CListItem(), {
          DisplayText: objPrescriptionItemVM.DrugDetails.AdminMethod,
        });
      objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.BatchNumber =
        objPrescriptionItemVM.AdditionalDetails.Batch;
      objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.Direction =
        objPrescriptionItemVM.DrugDetails.Direction;
      objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.DosageForm =
        ObjectHelper.CreateObject(new CListItem(), {
          DisplayText: objPrescriptionItemVM.DrugDetails.Form,
        });
      objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.Dose =
        objPrescriptionItemVM.DrugDetails.Dose;
      objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.DoseType =
        ObjectHelper.CreateObject(new CListItem(), {
          DisplayText: CommonBB.GetText(
            objPrescriptionItemVM.DrugDetails.DoseType,
            objPrescriptionItemVM.MedDoseTypeConceptCodes
          ),
          Value: objPrescriptionItemVM.DrugDetails.DoseType,
        });
      objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.DoseUOM =
        new CListItem();
      objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.MCVersion =
        objPrescriptionItemVM.MCVersion;
      objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.Itemsubtype =
        objPrescriptionItemVM.DrugDetails.ItemSubType;
      objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.MCIItemDisplay =
        objPrescriptionItemVM.DrugDetails.MCItemDisplay;
      objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.MCILoerenzoID =
        objPrescriptionItemVM.DrugDetails.MCLorenzoid;
      objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.MCIIdentifyingName =
        objPrescriptionItemVM.DrugDetails.MCIIdentifyingName;
      objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.isNewmeds =
        objPrescriptionItemVM.DrugDetails.ISnewmeds;
      objPrescriptionLineItemVM.IsCriticalMed =
        objPrescriptionItemVM.DrugDetails.IsCriticalMed;
      if (
        objPrescriptionLineItemVM != null &&
        objPrescriptionLineItemVM.FormViewerDetails != null &&
        objPrescriptionLineItemVM.FormViewerDetails.BasicDetails != null
      ) {
        objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.IsinDefiniteOmit =
          objPrescriptionItemVM.DrugDetails.IsinDefiniteOmit;
        if (
          DateTime.NotEquals(objPrescriptionItemVM.DrugDetails.IsinDefiniteOmitDTTM,
          DateTime.MinValue)
        ) {
          objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.IsinDefiniteOmitDTTM =
            objPrescriptionItemVM.DrugDetails.IsinDefiniteOmitDTTM;
        }
        if (
          !String.IsNullOrEmpty(objPrescriptionItemVM.DrugDetails.OmitComments)
        ) {
          objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.OmitComments =
            objPrescriptionItemVM.DrugDetails.OmitComments;
        }
        if (
          !String.IsNullOrEmpty(objPrescriptionItemVM.DrugDetails.OmittedBy)
        ) {
          objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.OmittedBy =
            objPrescriptionItemVM.DrugDetails.OmittedBy;
        }
        if (
          objPrescriptionLineItemVM.FormViewerDetails.BasicDetails
            .InfusionDetails != null
        ) {
          if (
            DateTime.NotEquals(objPrescriptionItemVM.DrugDetails.ReviewPeriodDTTM,
            DateTime.MinValue)
          ) {
            objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.InfusionDetails.ReviewafterDTTM =
              objPrescriptionItemVM.DrugDetails.ReviewPeriodDTTM;
          }
        }
        if (
          !String.IsNullOrEmpty(
            objPrescriptionItemVM.DrugDetails.ReviewComments
          )
        ) {
          objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.ReviewComments =
            objPrescriptionItemVM.DrugDetails.ReviewComments;
        }
        if (
          !String.IsNullOrEmpty(
            objPrescriptionItemVM.DrugDetails.ReviewRequestedBy
          )
        ) {
          objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.ReviewRequestedBy =
            objPrescriptionItemVM.DrugDetails.ReviewRequestedBy;
        }
        if (
          !String.IsNullOrEmpty(objPrescriptionItemVM.DrugDetails.ReviewType)
        ) {
          objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.ReviewType =
            objPrescriptionItemVM.DrugDetails.ReviewType;
        }
      }
      if (
        objPrescriptionItemVM.DrugDetails.DrugProperty != null &&
        objPrescriptionItemVM.DrugDetails.DrugProperty.Count > 0
      ) {
        objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.DrugProperties =
          new ObservableCollection<ManagePrescSer.DrugProperty>();
        objPrescriptionItemVM.DrugDetails.DrugProperty.forEach(
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
        objPrescriptionItemVM.DrugDetails.Duration;
      objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.DurationUOM =
        new CListItem();
      if (!String.IsNullOrEmpty(objPrescriptionItemVM.DrugDetails.StopDate))
        objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.EndDTTM =
          Convert.ToDateTime(
            objPrescriptionItemVM.DrugDetails.StopDate.Replace(' DST', '')
          );
      objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.ExpiryDate =
        objPrescriptionItemVM.DrugDetails.Expiredttm;
      if (
        !String.IsNullOrEmpty(objPrescriptionItemVM.DrugDetails.DaysOfweekText)
      ) {
        objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.DaysOfWeeks =
          objPrescriptionItemVM.DrugDetails.DaysOfweekText;
      }
      objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.Frequency =
        ObjectHelper.CreateObject(new CListItem(), {
          DisplayText: objPrescriptionItemVM.DrugDetails.Frequency,
        });
      if (
        !String.IsNullOrEmpty(objPrescriptionItemVM.DrugDetails.VMVPLzoID) &&
        !String.IsNullOrEmpty(
          objPrescriptionItemVM.DrugDetails.VMVPIdentifyingName
        )
      ) {
        objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.IdentifyingName =
          objPrescriptionItemVM.DrugDetails.VMVPIdentifyingName +
          ' - ' +
          objPrescriptionItemVM.DrugDetails.IdentifyingName;
      } else {
        objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.IdentifyingName =
          objPrescriptionItemVM.DrugDetails.IdentifyingName;
      }
      objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.IdentifyingType =
        objPrescriptionItemVM.DrugDetails.IdentifyingType;
      objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.MedClerkModifyReason =
        ObjectHelper.CreateObject(new CListItem(), {
          DisplayText: objPrescriptionItemVM.DrugDetails.MedicationClerking,
        });
      objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.NoOfInstallments =
        Convert.ToInt64(objPrescriptionItemVM.DrugDetails.NoInstalments);
      if (objPrescriptionItemVM.DrugDetails.PRNInstruction != null) {
        objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.PRNInstruction =
          ObjectHelper.CreateObject(new CListItem(), {
            DisplayText: objPrescriptionItemVM.DrugDetails.PRNInstruction,
          });
      }
      objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.Quantity =
        objPrescriptionItemVM.DrugDetails.QuantityVal;
      objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.QuantityUOMName =
        objPrescriptionItemVM.DrugDetails.QuantityUOM;
      objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.Route =
        ObjectHelper.CreateObject(new CListItem(), {
          DisplayText: objPrescriptionItemVM.DrugDetails.Route,
        });
      objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.Site =
        ObjectHelper.CreateObject(new CListItem(), {
          DisplayText: objPrescriptionItemVM.DrugDetails.Site,
        });
      if (
        objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.StartDTTM
          .Year > 1753
      ) {
        objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.StartDTTM =
          Convert.ToDateTime(
            objPrescriptionItemVM.DrugDetails.StartDate.Replace('(DST)', '')
          );
      } else if (
        DateTime.NotEquals(objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.StartDTTM,
        DateTime.MinValue)
      ) {
        objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.StartDTTM =
          Convert.ToDateTime(objPrescriptionItemVM.DrugDetails.StartDate);
      }
      if (objPrescriptionItemVM.DrugDetails.TreatmentCont != null) {
        objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.TreatmentToContinue =
          ObjectHelper.CreateObject(new CListItem(), {
            DisplayText: objPrescriptionItemVM.DrugDetails.TreatmentCont,
          });
      }
      objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.StationaryType =
        ObjectHelper.CreateObject(new CListItem(), {
          DisplayText: objPrescriptionItemVM.DrugDetails.StationryType,
        });
      objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.Strength =
        ObjectHelper.CreateObject(new CListItem(), {
          DisplayText: objPrescriptionItemVM.DrugDetails.Strength,
        });
      objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.SupplyInstructionText =
        ObjectHelper.CreateObject(new CListItem(), {
          DisplayText: objPrescriptionItemVM.DrugDetails.SupplyInstruction,
        });
      if (
        objPrescriptionItemVM.DrugDetails != null &&
        objPrescriptionItemVM.DrugDetails.TechValSupplyInstructionText != null
      ) {
        objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.TechValSupplyInstructionText =
          objPrescriptionItemVM.DrugDetails.TechValSupplyInstructionText;
      }
      objPrescriptionLineItemVM.IsOther = false;
      objPrescriptionLineItemVM.IsPGD =
        objPrescriptionItemVM.AdditionalDetails.IsPGD;
      if (
        !String.IsNullOrEmpty(
          objPrescriptionItemVM.AdditionalDetails.PrescribedBy
        )
      ) {
        objPrescriptionLineItemVM.PrescriberDetails = ObjectHelper.CreateObject(
          new ManagePrescSer.ObjectInfo(),
          {
            Name: objPrescriptionItemVM.AdditionalDetails.PrescribedBy,
            OID: 0,
          }
        );
      } else {
        objPrescriptionLineItemVM.PrescriberDetails = ObjectHelper.CreateObject(
          new ManagePrescSer.ObjectInfo(),
          {
            Name: String.Empty,
            OID: 0,
          }
        );
      }
      objPrescriptionLineItemVM.PrescriptionItemOID =
        objPrescriptionItemVM.PrescriptionItemOID;
      objPrescriptionLineItemVM.PrescriptionItemStatus =
        objPrescriptionItemVM.DrugDetails.Status;
      objPrescriptionLineItemVM.PrescriptionType =
        objPrescriptionItemVM.DrugDetails.PresType;
      objPrescriptionLineItemVM.PrescriptionTypeInPatientContext =
        PatientContext.PrescriptionType;
      objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.IsConditionalExists =
        objPrescriptionItemVM.DrugDetails.IsConditionalExists;
    }
    if (
      objPrescriptionItemVM != null &&
      objPrescriptionItemVM.objDrugDetailsData != null &&
      objPrescriptionItemVM.objDrugDetailsData.InfusionDetails != null
    ) {
      objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.InfusionDetails =
        objPrescriptionItemVM.objDrugDetailsData.InfusionDetails;
    }
    return objPrescriptionLineItemVM;
  }
  public static GetPrescriptionLineItemVMSeqMez(
    objPrescriptionItem: Object
  ): PrescriptionLineItemVM {
    let objPrescriptionLineItemVM: PrescriptionLineItemVM =
      new PrescriptionLineItemVM();
    objPrescriptionLineItemVM.FormViewerDetails = new FormViewerLineItemVM();
    objPrescriptionLineItemVM.FormViewerDetails.BasicDetails =
      new BasicDetailsLineItemVM();
    let oTechValSuplyInst: Dictionary<string, string> = null;
    if (objPrescriptionItem != null) {
      if (objPrescriptionItem instanceof CommPrescriptionItemViewVM) {
        let objPrescriptionItemVM: CommPrescriptionItemViewVM =
          new CommPrescriptionItemViewVM();
        if (objPrescriptionItem instanceof CommPrescriptionItemViewVM) {
          objPrescriptionItemVM =
            ObjectHelper.CreateType<CommPrescriptionItemViewVM>(
              objPrescriptionItem,
              CommPrescriptionItemViewVM
            );
        }
        if (objPrescriptionItemVM.PrescriptionItemViewDetails != null) {
          objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.IsMedsAdminDischargePrescription =
            true;
          if (
            objPrescriptionItemVM.PrescriptionItemViewDetails
              .oPresItemAdditionalProperties != null
          ) {
            objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.AdditionalComments =
              objPrescriptionItemVM.PrescriptionItemViewDetails.oPresItemAdditionalProperties.AdditionalComments;
            if (
              objPrescriptionItemVM.PrescriptionItemViewDetails
                .oPresItemAdditionalProperties.AdminMethod != null &&
              !String.IsNullOrEmpty(
                objPrescriptionItemVM.PrescriptionItemViewDetails
                  .oPresItemAdditionalProperties.AdminMethod.Name
              )
            ) {
              objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.AdminMethod =
                ObjectHelper.CreateObject(new CListItem(), {
                  DisplayText:
                    objPrescriptionItemVM.PrescriptionItemViewDetails
                      .oPresItemAdditionalProperties.AdminMethod.Name,
                  Value:
                    objPrescriptionItemVM.PrescriptionItemViewDetails.oPresItemAdditionalProperties.AdminMethod.OID.ToString(),
                });
            }
            objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.BatchNumber =
              objPrescriptionItemVM.PrescriptionItemViewDetails.oPresItemAdditionalProperties.BatchNumber;
          }
          if (
            objPrescriptionItemVM.PrescriptionItemViewDetails
              .oPresItemBasicPropertiesView != null
          ) {
            if (
              objPrescriptionItemVM.PrescriptionItemViewDetails
                .oPresItemBasicPropertiesView.AdminInstruction != null &&
              !String.IsNullOrEmpty(
                objPrescriptionItemVM.PrescriptionItemViewDetails
                  .oPresItemBasicPropertiesView.AdminInstruction.Name
              )
            ) {
              objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.AdminInstruction =
                ObjectHelper.CreateObject(new CListItem(), {
                  DisplayText:
                    objPrescriptionItemVM.PrescriptionItemViewDetails
                      .oPresItemBasicPropertiesView.AdminInstruction.Name,
                  Value:
                    objPrescriptionItemVM.PrescriptionItemViewDetails.oPresItemBasicPropertiesView.AdminInstruction.OID.ToString(),
                });
            }
            if (
              objPrescriptionItemVM.PrescriptionItemViewDetails
                .oPresItemBasicPropertiesView.AdminInstruction != null &&
              objPrescriptionLineItemVM.FormViewerDetails.BasicDetails
                .AdminInstruction == null &&
              !String.IsNullOrEmpty(
                objPrescriptionItemVM.PrescriptionItemViewDetails
                  .oPresItemBasicPropertiesView.OtherAdminInstruction
              )
            ) {
              objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.AdminInstruction =
                ObjectHelper.CreateObject(new CListItem(), {
                  DisplayText:
                    objPrescriptionItemVM.PrescriptionItemViewDetails
                      .oPresItemBasicPropertiesView.OtherAdminInstruction,
                  Value: String.Empty,
                });
            }
            objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.Direction =
              objPrescriptionItemVM.PrescriptionItemViewDetails.oPresItemBasicPropertiesView.Direction;
            if (
              objPrescriptionItemVM.PrescriptionItemViewDetails
                .oPresItemBasicPropertiesView.Form != null &&
              !String.IsNullOrEmpty(
                objPrescriptionItemVM.PrescriptionItemViewDetails
                  .oPresItemBasicPropertiesView.Form.Name
              )
            ) {
              objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.DosageForm =
                ObjectHelper.CreateObject(new CListItem(), {
                  DisplayText:
                    objPrescriptionItemVM.PrescriptionItemViewDetails
                      .oPresItemBasicPropertiesView.Form.Name,
                  Value:
                    objPrescriptionItemVM.PrescriptionItemViewDetails.oPresItemBasicPropertiesView.Form.OID.ToString(),
                });
            }
            objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.Dose =
              objPrescriptionItemVM.PrescriptionItemViewDetails.oPresItemBasicPropertiesView.Dose;
            if (
              !String.IsNullOrEmpty(
                objPrescriptionItemVM.PrescriptionItemViewDetails
                  .oPresItemBasicPropertiesView.DoseType
              )
            ) {
              objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.DoseType =
                ObjectHelper.CreateObject(new CListItem(), {
                  DisplayText:
                    objPrescriptionItemVM.PrescriptionItemViewDetails
                      .oPresItemBasicPropertiesView.DoseType,
                  Value:
                    objPrescriptionItemVM.PrescriptionItemViewDetails
                      .oPresItemBasicPropertiesView.DoseType,
                });
            }
            if (
              objPrescriptionItemVM.PrescriptionItemViewDetails
                .oPresItemBasicPropertiesView.DrugProperties != null &&
              objPrescriptionItemVM.PrescriptionItemViewDetails
                .oPresItemBasicPropertiesView.DrugProperties.Count > 0
            ) {
              objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.DrugProperties =
                new ObservableCollection<ManagePrescSer.DrugProperty>();
              objPrescriptionItemVM.PrescriptionItemViewDetails.oPresItemBasicPropertiesView.DrugProperties.forEach(
                (oDrugProp) => {
                  objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.DrugProperties.Add(
                    ObjectHelper.CreateObject(
                      new ManagePrescSer.DrugProperty(),
                      {
                        DrugName: oDrugProp.DrugName,
                        DrugPropertyCode: oDrugProp.DrugPropertyCode,
                        HighRiskMsg: oDrugProp.HighRiskMsg,
                        IdentifyingOID: oDrugProp.IdentifyingOID,
                        IdentifyingType: oDrugProp.IdentifyingType,
                        OccuranceCode: oDrugProp.OccuranceCode,
                        VMChildCode: 'CC_OCCRALLCHILD',
                      }
                    )
                  );
                }
              );
            }
            objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.Duration =
              objPrescriptionItemVM.PrescriptionItemViewDetails.oPresItemBasicPropertiesView.Duration;
            objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.EndDTTM =
              objPrescriptionItemVM.PrescriptionItemViewDetails.oPrescriptionItem.EndDTTM;
            objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.ExpiryDate =
              objPrescriptionItemVM.PrescriptionItemViewDetails.oPresItemAdditionalProperties.ExpiryDate;
            let IPPPresItem: IPPManagePrescSer.IPPPrescriptionItem =
              ObjectHelper.CreateType<IPPManagePrescSer.IPPPrescriptionItem>(
                objPrescriptionItemVM.PrescriptionItemViewDetails
                  .oPrescriptionItem,
                IPPManagePrescSer.IPPPrescriptionItem
              );
            if (IPPPresItem != null) {
              if (IPPPresItem.Instruction != null) {
                objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.PRNInstruction =
                  ObjectHelper.CreateObject(new CListItem(), {
                    DisplayText: IPPPresItem.Instruction.Name,
                  });
              }
              if (!String.IsNullOrEmpty(IPPPresItem.StrengthText)) {
                objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.Strength =
                  ObjectHelper.CreateObject(new CListItem(), {
                    DisplayText: IPPPresItem.StrengthText,
                    Value: IPPPresItem.StrengthText,
                  });
              }
              if (
                !String.IsNullOrEmpty(IPPPresItem.DrugFrequencyUOMCode) &&
                String.Equals(
                  IPPPresItem.DrugFrequencyUOMCode,
                  'CC_MEDDRSN2',
                  StringComparison.CurrentCultureIgnoreCase
                ) &&
                IPPPresItem.FrequencyDetails != null &&
                IPPPresItem.FrequencyDetails.DaysOfWeek != null &&
                IPPPresItem.FrequencyDetails.DaysOfWeek.Count > 0
              ) {
                objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.DaysOfWeeks =
                  MedicationCommonBB.ConstructDaysOfWeek(
                    IPPPresItem.FrequencyDetails.DaysOfWeek
                  );
              }
            }
            if (
              !String.IsNullOrEmpty(
                objPrescriptionItemVM.PrescriptionItemViewDetails
                  .oPresItemBasicPropertiesView.Frequency
              )
            ) {
              objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.Frequency =
                ObjectHelper.CreateObject(new CListItem(), {
                  DisplayText:
                    objPrescriptionItemVM.PrescriptionItemViewDetails
                      .oPresItemBasicPropertiesView.Frequency,
                  Value:
                    objPrescriptionItemVM.PrescriptionItemViewDetails
                      .oPresItemBasicPropertiesView.Frequency,
                });
            } else if (
              !String.IsNullOrEmpty(
                objPrescriptionItemVM.PrescriptionItemViewDetails
                  .oPresItemBasicPropertiesView.SteppedDoseAdminTimes
              )
            ) {
              objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.Frequency =
                ObjectHelper.CreateObject(new CListItem(), {
                  DisplayText:
                    objPrescriptionItemVM.PrescriptionItemViewDetails
                      .oPresItemBasicPropertiesView.SteppedDoseAdminTimes,
                  Value:
                    objPrescriptionItemVM.PrescriptionItemViewDetails
                      .oPresItemBasicPropertiesView.SteppedDoseAdminTimes,
                });
            }
            if (
              !String.IsNullOrEmpty(
                objPrescriptionItemVM.PrescriptionItemViewDetails
                  .oPrescriptionItem.VMVPLorenzoID
              ) &&
              !String.IsNullOrEmpty(
                objPrescriptionItemVM.PrescriptionItemViewDetails
                  .oPrescriptionItem.VMVPIdentifyingName
              )
            ) {
              objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.IdentifyingName =
                objPrescriptionItemVM.PrescriptionItemViewDetails
                  .oPrescriptionItem.VMVPIdentifyingName +
                ' - ' +
                objPrescriptionItemVM.PrescriptionItemViewDetails
                  .oPrescriptionItem.IdentifyingName;
            } else {
              objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.IdentifyingName =
                objPrescriptionItemVM.PrescriptionItemViewDetails.oPrescriptionItem.IdentifyingName;
            }
            objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.IdentifyingType =
              objPrescriptionItemVM.PrescriptionItemViewDetails.oPrescriptionItem.IdentifyingType;
            if (
              objPrescriptionItemVM.PrescriptionItemViewDetails
                .oPresItemAdditionalProperties.MedClerkModifyReason != null
            ) {
              objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.MedClerkModifyReason =
                ObjectHelper.CreateObject(new CListItem(), {
                  DisplayText:
                    objPrescriptionItemVM.PrescriptionItemViewDetails
                      .oPresItemAdditionalProperties.MedClerkModifyReason.Name,
                  Value:
                    objPrescriptionItemVM.PrescriptionItemViewDetails.oPresItemAdditionalProperties.MedClerkModifyReason.OID.ToString(),
                  Tag: ObjectHelper.CreateObject(
                    new ManagePrescSer.ObjectInfo(),
                    {
                      Code: objPrescriptionItemVM.PrescriptionItemViewDetails
                        .oPresItemAdditionalProperties.MedClerkModifyReason
                        .Code,
                      Name: objPrescriptionItemVM.PrescriptionItemViewDetails
                        .oPresItemAdditionalProperties.MedClerkModifyReason
                        .Name,
                      OID: objPrescriptionItemVM.PrescriptionItemViewDetails
                        .oPresItemAdditionalProperties.MedClerkModifyReason.OID,
                    }
                  ),
                });
            }
            objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.NoOfInstallments =
              objPrescriptionItemVM.PrescriptionItemViewDetails.oPresItemAdditionalProperties.NoOfInstallments;
            objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.Quantity =
              objPrescriptionItemVM.PrescriptionItemViewDetails.oPresItemBasicPropertiesView.Quantity;
            objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.QuantityUOMName =
              objPrescriptionItemVM.PrescriptionItemViewDetails.oPresItemBasicPropertiesView.QuantityUOMName;
            if (
              objPrescriptionItemVM.PrescriptionItemViewDetails
                .oPresItemBasicPropertiesView.Route != null &&
              !String.IsNullOrEmpty(
                objPrescriptionItemVM.PrescriptionItemViewDetails
                  .oPresItemBasicPropertiesView.Route.Name
              )
            ) {
              objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.Route =
                ObjectHelper.CreateObject(new CListItem(), {
                  DisplayText: MedicationCommonBB.RouteName(
                    objPrescriptionItemVM.PrescriptionItemViewDetails
                      .oPresItemBasicPropertiesView.Route.Name
                  ),
                  Value: MedicationCommonBB.RouteOID(
                    objPrescriptionItemVM.PrescriptionItemViewDetails.oPresItemBasicPropertiesView.Route.OID.ToString()
                  ),
                });
            }
            if (
              !String.IsNullOrEmpty(
                objPrescriptionItemVM.PrescriptionItemViewDetails
                  .oPresItemBasicPropertiesView.Site
              )
            ) {
              objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.Site =
                ObjectHelper.CreateObject(new CListItem(), {
                  DisplayText:
                    objPrescriptionItemVM.PrescriptionItemViewDetails
                      .oPresItemBasicPropertiesView.SealImageList,
                  Value:
                    objPrescriptionItemVM.PrescriptionItemViewDetails
                      .oPresItemBasicPropertiesView.SealImageList,
                });
            }
            objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.StartDTTM =
              objPrescriptionItemVM.PrescriptionItemViewDetails.oPrescriptionItem.StartDTTM;
            if (
              objPrescriptionItemVM.PrescriptionItemViewDetails
                .oPresItemAdditionalProperties.StationeryType != null &&
              !String.IsNullOrEmpty(
                objPrescriptionItemVM.PrescriptionItemViewDetails
                  .oPresItemAdditionalProperties.StationeryType.Name
              )
            ) {
              objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.StationaryType =
                ObjectHelper.CreateObject(new CListItem(), {
                  DisplayText:
                    objPrescriptionItemVM.PrescriptionItemViewDetails
                      .oPresItemAdditionalProperties.StationeryType.Code,
                  Value:
                    objPrescriptionItemVM.PrescriptionItemViewDetails.oPresItemAdditionalProperties.StationeryType.OID.ToString(),
                  Tag: objPrescriptionItemVM.PrescriptionItemViewDetails
                    .oPresItemAdditionalProperties.StationeryType,
                });
            }
            objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.TechSupplyDTTM =
              objPrescriptionItemVM.PrescriptionItemViewDetails.oPresItemBasicPropertiesView.SupplyDTTM;
            if (
              !String.IsNullOrEmpty(
                objPrescriptionItemVM.PrescriptionItemViewDetails
                  .oPresItemBasicPropertiesView.TechSupplyInstruction
              )
            ) {
              let objTechValSuplyInst: string[] =
                objPrescriptionItemVM.PrescriptionItemViewDetails.oPresItemBasicPropertiesView.TechSupplyInstruction.Split(
                  ';'
                );
              let TechCnt: number = objTechValSuplyInst.length;
              let SupplyComments: string[] =
                objPrescriptionItemVM.PrescriptionItemViewDetails.oPresItemBasicPropertiesView.TechSupplyInstruction.Split(
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
            }
            if (
              objPrescriptionItemVM.PrescriptionItemViewDetails
                .oPresItemBasicPropertiesView.TreatmentToCont != null
            ) {
              objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.TreatmentToContinue =
                ObjectHelper.CreateObject(new CListItem(), {
                  DisplayText:
                    objPrescriptionItemVM.PrescriptionItemViewDetails
                      .oPresItemBasicPropertiesView.TreatmentToCont.Name,
                  Value:
                    objPrescriptionItemVM.PrescriptionItemViewDetails.oPresItemBasicPropertiesView.TreatmentToCont.OID.ToString(),
                  Tag: ObjectHelper.CreateObject(
                    new ManagePrescSer.ObjectInfo(),
                    {
                      Code: objPrescriptionItemVM.PrescriptionItemViewDetails
                        .oPresItemBasicPropertiesView.TreatmentToCont.Code,
                      Name: objPrescriptionItemVM.PrescriptionItemViewDetails
                        .oPresItemBasicPropertiesView.TreatmentToCont.Name,
                      OID: objPrescriptionItemVM.PrescriptionItemViewDetails
                        .oPresItemBasicPropertiesView.TreatmentToCont.OID,
                    }
                  ),
                });
            }
            objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.IsinDefiniteOmit =
              objPrescriptionItemVM.IsinDefiniteOmit;
            if (
              DateTime.NotEquals(objPrescriptionItemVM.IsinDefiniteOmitDTTM, DateTime.MinValue)
            ) {
              objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.IsinDefiniteOmitDTTM =
                objPrescriptionItemVM.IsinDefiniteOmitDTTM;
            }
            if (!String.IsNullOrEmpty(objPrescriptionItemVM.OmitComments)) {
              objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.OmitComments =
                objPrescriptionItemVM.OmitComments;
            }
            if (!String.IsNullOrEmpty(objPrescriptionItemVM.OmittedBy)) {
              objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.OmittedBy =
                objPrescriptionItemVM.OmittedBy;
            }
          }
        }
        if (
          objPrescriptionItemVM.PrescriptionItemViewDetails != null &&
          objPrescriptionItemVM.PrescriptionItemViewDetails.oPrescriptionItem !=
            null &&
          objPrescriptionItemVM.PrescriptionItemViewDetails.oPrescriptionItem
            .PrescriberDetails != null
        ) {
          objPrescriptionLineItemVM.IsPGD =
            objPrescriptionItemVM.PrescriptionItemViewDetails.oPrescriptionItem.IsPGD;
          objPrescriptionLineItemVM.PrescriberDetails =
            ObjectHelper.CreateObject(new ManagePrescSer.ObjectInfo(), {
              Code: objPrescriptionItemVM.PrescriptionItemViewDetails
                .oPrescriptionItem.PrescriberDetails.Code,
              Name: objPrescriptionItemVM.PrescriptionItemViewDetails
                .oPrescriptionItem.PrescriberDetails.Name,
              OID: objPrescriptionItemVM.PrescriptionItemViewDetails
                .oPrescriptionItem.PrescriberDetails.OID,
              RoleProfileOID:
                objPrescriptionItemVM.PrescriptionItemViewDetails
                  .oPrescriptionItem.PrescriberDetails.RoleProfileOID,
            });
          objPrescriptionLineItemVM.PrescriptionItemOID =
            objPrescriptionItemVM.PrescriptionItemViewDetails.oPrescriptionItem.OID;
          objPrescriptionLineItemVM.PrescriptionItemStatus =
            objPrescriptionItemVM.PrescriptionItemViewDetails.oPrescriptionItem.PrescriptionItemStatus;
          if (
            objPrescriptionItemVM.PrescriptionItemViewDetails.oPrescriptionItem
              .PrescriptionBasicData != null
          ) {
            objPrescriptionLineItemVM.PrescriptionType =
              objPrescriptionItemVM.PrescriptionItemViewDetails.oPrescriptionItem.PrescriptionBasicData.PrescriptionType;
            objPrescriptionLineItemVM.PrescriptionTypeCode =
              objPrescriptionItemVM.PrescriptionItemViewDetails.oPrescriptionItem.PrescriptionBasicData.PrescriptionType;
          }
        }
        objPrescriptionLineItemVM.PrescriptionTypeInPatientContext =
          PatientContext.PrescriptionType;
        objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.Itemsubtype =
          objPrescriptionItemVM.Itemsubtype;
        objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.MCIItemDisplay =
          objPrescriptionItemVM.MCIItemDisplay;
        objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.MCIItemDrugprop =
          objPrescriptionItemVM.MCIItemDisplay;
        objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.InfusionDetails =
          objPrescriptionItemVM.InfusionDetails;
        objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.MCILoerenzoID =
          objPrescriptionItemVM.lorenzoid;
        objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.isDoseCalcExist =
          objPrescriptionItemVM.IsDoseCalcExist;
        objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.DoseCalcExist =
          objPrescriptionItemVM.DoseCalcExist;
        if (
          objPrescriptionItemVM.PrescriptionItemViewDetails != null &&
          objPrescriptionItemVM.PrescriptionItemViewDetails.oPrescriptionItem !=
            null
        ) {
          objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.IsConditionalExists =
            objPrescriptionItemVM.PrescriptionItemViewDetails.oPrescriptionItem.IsConditionalExists;
        }
      }
    }
    return objPrescriptionLineItemVM;
  }
  public static RouteName(
    Route: ManagePrescSer.ObjectInfo[] | string | CListItem[]
  ): string {
    let RteName: string = String.Empty;
    if (ObjectHelper.isElementInstanceOfArray(Route,"ObjectInfo") )   {
      RteName = this.RouteName1(Route as ManagePrescSer.ObjectInfo[]);
    } else if (typeof Route == 'string') {
      RteName = this.RouteName2(Route as string);
    } else {
      RteName = this.RouteName3(Route as CListItem[]);
    }
    return RteName;
  }

  public static RouteOID(
    sRoute: ManagePrescSer.ObjectInfo[] | string | CListItem[]
  ): string {
    let RteOID: string = String.Empty;
    if (ObjectHelper.isElementInstanceOfArray(sRoute,"ObjectInfo") ) {
      RteOID = this.RouteOID1(sRoute as ManagePrescSer.ObjectInfo[]);
    } else if (typeof sRoute == 'string') {
      RteOID = this.RouteOID2(sRoute as string);
    } else {
      RteOID = this.RouteOID3(sRoute as CListItem[]);
    }
    return RteOID;
  }

  public static RouteTag(Router: string | CListItem[]): string {
    let RteTag: string = String.Empty;
    if (typeof Router == 'string') {
      RteTag = this.RouteTag1(Router as string);
    } else if (Router instanceof (Array<CListItem> as typeof Array<CListItem>)) {
      RteTag = this.RouteTag2(Router as CListItem[]);
    }
    return RteTag;
  }

  public static RouteName1(Routes: ManagePrescSer.ObjectInfo[]): string {
    let srouteName: string = String.Empty;
    let vRoles = Routes.Select((x) => x.Name);
    let s: string[] = vRoles.ToArray();
    srouteName = String.Join(CConstants.MULTIROUTEDILIMITER, s);
    return srouteName;
  }
  public static RouteOID1(Routes: ManagePrescSer.ObjectInfo[]): string {
    let srouteOID: string = String.Empty;
    let vRoles = Routes.Select((x) => x.OID);
    let s: number[] = vRoles.ToArray();
    srouteOID = String.Join(CConstants.MULTIROUTEDILIMITER, s);
    return srouteOID;
  }
  public static RouteName2(sRoutes: string): string {
    let srouteName: string = sRoutes;
    if (
      !String.IsNullOrEmpty(sRoutes) &&
      sRoutes.Contains(CConstants.MULTIROUTE_ROUTE)
    ) {
      let RouteDetail: ManagePrescSer.ObjectInfo[] =
        MedicationCommonBB.RouteConvention(sRoutes);
      srouteName = String.Empty;
      if (RouteDetail != null && RouteDetail.Count() > 0) {
        let vRoles = RouteDetail.OrderBy((x) => x.Name).Select((x) => x.Name);
        let s: string[] = vRoles.ToArray();
        srouteName = String.Join(CConstants.MULTIROUTEDILIMITER, s);
      }
    }
    return srouteName;
  }
  public static RouteOID2(sRoutes: string): string {
    let srouteOID: string = sRoutes;
    if (
      !String.IsNullOrEmpty(sRoutes) &&
      sRoutes.Contains(CConstants.MULTIROUTE_ROUTE)
    ) {
      let RouteDetail: ManagePrescSer.ObjectInfo[] =
        MedicationCommonBB.RouteConvention(sRoutes);
      srouteOID = String.Empty;
      if (RouteDetail != null && RouteDetail.Count() > 0) {
        let vRoles = RouteDetail.Select((x) => x.OID);
        let s: number[] = vRoles.ToArray();
        srouteOID = String.Join(CConstants.MULTIROUTEOIDDILIMITER, s);
      }
    }
    return srouteOID;
  }
  public static RouteTag1(sRoutes: string): string {
    let srouteTag: string = sRoutes;
    if (
      !String.IsNullOrEmpty(sRoutes) &&
      sRoutes.Contains(CConstants.MULTIROUTE_ROUTE)
    ) {
      let RouteDetail: ManagePrescSer.ObjectInfo[] =
        MedicationCommonBB.RouteConvention(sRoutes);
      srouteTag = String.Empty;
      if (RouteDetail != null && RouteDetail.Count() > 0) {
        let vRoles = RouteDetail.Select((x) => x.Code);
        let s: string[] = vRoles.ToArray();
        srouteTag = String.Join(CConstants.MULTIROUTEOIDDILIMITER, s);
      }
    }
    return srouteTag;
  }
  public static Routes(sRoutes: string): ObservableCollection<CListItem> {
    let routes: ObservableCollection<CListItem> =
      new ObservableCollection<CListItem>();
    let RouteDetail: ManagePrescSer.ObjectInfo[] =
      MedicationCommonBB.RouteConvention(sRoutes);
    let route: CListItem;
    if (RouteDetail != null && RouteDetail.Count() > 0) {
      for (let idx: number = 0; idx < RouteDetail.Count(); idx++) {
        route = new CListItem();
        route.Value = RouteDetail[idx].OID.ToString();
        route.DisplayText = RouteDetail[idx].Name;
        route.Tag = RouteDetail[idx].Code;
        routes.Add(route);
      }
    }
    return routes;
  }
  public static DeactivateRouteList(
    sRoutes: string
  ): ObservableCollection<CListItem> {
    let routes: ObservableCollection<CListItem> =
      new ObservableCollection<CListItem>();
    let RouteDetail: ManagePrescSer.ObjectInfo[] =
      MedicationCommonBB.SpilitRouteConvention(sRoutes);
    let route: CListItem;
    if (RouteDetail != null && RouteDetail.Count() > 0) {
      for (let idx: number = 0; idx < RouteDetail.Count(); idx++) {
        route = new CListItem();
        route.Value = RouteDetail[idx].OID.ToString();
        route.DisplayText = RouteDetail[idx].Name;
        route.Tag = RouteDetail[idx].Code;
        routes.Add(route);
      }
    }
    return routes;
  }
  public static SpilitRouteConvention(
    sRouteDetail: string
  ): ManagePrescSer.ObjectInfo[] {
    let RouteDetail: ManagePrescSer.ObjectInfo[] = null;
    if (!String.IsNullOrEmpty(sRouteDetail)) {
      let sRoute: string[] = sRouteDetail.Split(CConstants.MULTIROUTE_ROUTES);
      RouteDetail = new Array(sRoute.length);
      let route: string[];
      for (let ncnt: number = 0; ncnt < sRoute.length; ncnt++) {
        RouteDetail[ncnt] = new ManagePrescSer.ObjectInfo();
        route = sRoute[ncnt].Split(CConstants.MULTIROUTE_ROUTE);
        RouteDetail[ncnt].OID = Convert.ToInt64(route[0]);
        RouteDetail[ncnt].Name = route[1];
      }
    }
    return RouteDetail;
  }
  public static SpilitDeactivatedList(
    sForms: string
  ): ObservableCollection<CListItem> {
    let forms: ObservableCollection<CListItem> =
      new ObservableCollection<CListItem>();
    let form: CListItem;
    let sForm: string[] = sForms.Split(CConstants.MULTIROUTE_ROUTE);
    form = new CListItem();
    if (sForm[0] != null && sForm[1] != null) {
      form.Value = sForm[0];
      form.DisplayText = sForm[1];
      forms.Add(form);
    }
    return forms;
  }
  public static ReturnDeactivatedList(sForms: string): CListItem {
    let form: CListItem;
    let sForm: string[] = sForms.Split(CConstants.MULTIROUTE_ROUTE);
    form = new CListItem();
    if (sForm[0] != null && sForm[1] != null) {
      form.Value = sForm[0];
      form.DisplayText = sForm[1];
    }
    return form;
  }
  public static RouteName3(sRoutes: CListItem[]): string {
    let srouteName: string = String.Empty;
    if (sRoutes != null && sRoutes.Count() > 0) {
      let vRoles = sRoutes
        .OrderBy((x) => x.DisplayText)
        .Select((x) => x.DisplayText);
      let s: string[] = vRoles.ToArray();
      srouteName = String.Join(CConstants.MULTIROUTEDILIMITER, s);
    }
    return srouteName;
  }
  public static RouteOID3(sRoutes: CListItem[]): string {
    let srouteName: string = String.Empty;
    if (sRoutes != null && sRoutes.Count() > 0) {
      let vRoles = sRoutes.Select((x) => x.Value);
      let s: string[] = vRoles.ToArray();
      srouteName = String.Join(CConstants.MULTIROUTEOIDDILIMITER, s);
    }
    return srouteName;
  }
  public static RouteTag2(sRoutes: CListItem[]): string {
    let srouteTag: string = String.Empty;
    if (sRoutes != null && sRoutes.Count() > 0) {
      let vRoles = sRoutes
        .Where((x) => x.Tag != null)
        .Select((x) => x.Tag.ToString());
      let s: string[] = vRoles.ToArray();
      srouteTag = String.Join(CConstants.MULTIROUTEOIDDILIMITER, s);
    }
    return srouteTag;
  }
  public static RouteConvention(
    sRouteDetail: string
  ): ManagePrescSer.ObjectInfo[] {
    let RouteDetail: ManagePrescSer.ObjectInfo[] = null;
    if (!String.IsNullOrEmpty(sRouteDetail)) {
      let sRoute: string[] = sRouteDetail.Split(CConstants.MULTIROUTE_ROUTES);
      RouteDetail = new Array(sRoute.length);
      let route: string[];
      for (let ncnt: number = 0; ncnt < sRoute.length; ncnt++) {
        RouteDetail[ncnt] = new ManagePrescSer.ObjectInfo();
        route = sRoute[ncnt].Split(CConstants.MULTIROUTE_ROUTE);
        if (route.Count() >= 2) {
          RouteDetail[ncnt].OID = Convert.ToInt64(route[0]);
          RouteDetail[ncnt].Name = route[1];
          if (route.Count() > 2) {
            RouteDetail[ncnt].Code = route[2].ToString();
          }
        }
      }
    }
    return RouteDetail;
  }
  public static GetPatientAgeGenderDetails(): void {
    if (ContextManager.Instance['Sgestationreq'].ToString() == '-1') {
      let nAge: number = 0;
      let returnValue: ScriptObject = ObjectHelper.CreateType<ScriptObject>(
        HtmlPage.Window.Invoke('GetAgeGenderForConflicts'),
        'ScriptObject'
      );
      if (returnValue != null) {
        PatientContext.Sex = returnValue.GetProperty('SEX').ToString();
        PatientContext.DOB = returnValue.GetProperty('DOB').ToString();

        if (
          returnValue.GetProperty('Age') != null &&
          Number.TryParse(returnValue.GetProperty('Age').ToString(), (o) => {
            nAge = o;
          })
        )
          PatientContext.Age = nAge;
      }
      let sPatientAge: number = 0;
      let Sgestationreq: string = String.Empty;
      if (!String.IsNullOrEmpty(PatientContext.DOB)) {
        sPatientAge = MedicationCommonBB.DateDiffInDays(
          Convert.ToDateTime(PatientContext.DOB)
        );
        if (sPatientAge >= 0 && sPatientAge <= 90) {
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
  public static oCValuesetCollection: ObservableCollection<CValuesetCollection>;
  public static sFormStyle: string;
  public static sNonFormStyle: string;
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
    }
    out1(sResultDetails);
    return bResult;
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
    if (MedicationCommonProfileData.MedDrugDisplayConfig != null) {
      sConfigString = "<style type='text/css'>";
      if (MedicationCommonProfileData.MedDrugDisplayConfig.Formulary != null) {
        sTmp =
          MedicationCommonProfileData.MedDrugDisplayConfig.Formulary.Split(',');
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
      if (
        MedicationCommonProfileData.MedDrugDisplayConfig.NonFormulary != null
      ) {
        sTmp =
          MedicationCommonProfileData.MedDrugDisplayConfig.NonFormulary.Split(
            ','
          );
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
      MedicationCommonBB.sFormStyle = sConfigString;
      sConfigString =
        sNonFormularyColor +
        '~' +
        sNonFormularyCase +
        '~' +
        sNonFormularyStyle +
        '~' +
        sNonFormularyFontWt;
      MedicationCommonBB.sNonFormStyle = sConfigString;
    }
  }
  public static OnMonographLinkClick(
    MonographParams: ObservableCollection<CListItem>
  ): void {
    
            let objMedMonographChild: meddrugmonographChild = new meddrugmonographChild();
            let objMonoGraphVM: MonoGraphVM = new MonoGraphVM();
            let sWindowTitle: string = "";
            objMonoGraphVM.MonographParams = MonographParams;
            objMedMonographChild.DataContext = objMonoGraphVM;
            objMedMonographChild.onDialogClose = MedicationCommonBB.MeddrugmonographChild_Close;
            // ObjectHelper.stopFinishAndCancelEvent(true);
            if (MonographParams.Count > 0) {
                sWindowTitle = MonographParams[0].DisplayText + " - LORENZO -- Webpage Dialog";
            }
            AppActivity.OpenWindow(sWindowTitle, objMedMonographChild,(s,e)=>{ MedicationCommonBB.MeddrugmonographChild_Close(s);}, "Links", false, 520, 600, false, WindowButtonType.Close, null);
          
  }
  public static MeddrugmonographChild_Close(args: AppDialogEventargs): void {
    MedicationCommonBB.oChildWindow = args.AppChildWindow;
    if (args.Result == AppDialogResult.Close||args.Result == AppDialogResult.Cancel) {
      MedicationCommonBB.oChildWindow.DialogResult = true;
      // ObjectHelper.stopFinishAndCancelEvent(false);
    } else {
      MedicationCommonBB.oChildWindow.DialogResult = false;
    }
  }
  public static OnChildWizardClose(args: ChildWizardCloseEventargs){
   
  }
  //Not Required for LHS. To be Re-Visited.

       //  private static OnMedChartWizardClose: OnChildWizardClose;
        public static LaunchMedChart(PatientOID: number, EncOID: number, EncType: string, LaunchingCACode: string): void {
            let sArgs = String.Empty;
            sArgs = "PATIENTOID=" + PatientOID + "&ENCOUNTEROID=" + EncOID + "&EncType=" + EncType + "&IsOpenReadOnly=" + true + "&IsLaunchFrmPrescribe=" + true + "&MedchartLaunchLoc=" + LaunchingCACode + "&ISFULLSIZE=" + "true";
            AppLoadService.LaunchWizard(this.OnChildWizardClose, "MN_MEDCHART_P2",sArgs);
        }
       
  public static GetFormatLockKeys(skey: string): string {
    let sLockKeys: string = String.Empty;
    if (
      String.Equals(
        skey,
        'MedPrescribeInpatient',
        StringComparison.InvariantCultureIgnoreCase
      ) ||
      String.Equals(
        skey,
        'MedDiscontinueCancel',
        StringComparison.InvariantCultureIgnoreCase
      ) ||
      String.Equals(
        skey,
        'MAOmit',
        StringComparison.InvariantCultureIgnoreCase
      ) ||
      String.Equals(
        skey,
        'MAReinstate',
        StringComparison.InvariantCultureIgnoreCase
      ) ||
      String.Equals(
        skey,
        'MAEnterTitratedDose',
        StringComparison.InvariantCultureIgnoreCase
      ) ||
      String.Equals(
        skey,
        'MedCVInpatient',
        StringComparison.InvariantCultureIgnoreCase
      ) ||
      String.Equals(
        skey,
        'MEDAuthInpatient',
        StringComparison.InvariantCultureIgnoreCase
      ) ||
      String.Equals(
        skey,
        'MAReview',
        StringComparison.InvariantCultureIgnoreCase
      )
    ) {
      sLockKeys =
        'MedPrescribeInpatient~MedDiscontinueCancel~MAOmit~MAReinstate~MAEnterTitratedDose~MedCVInpatient~MEDAuthInpatient~MAReview';
    } else if (
      String.Equals(
        skey,
        'MedPrescribeDischarge',
        StringComparison.InvariantCultureIgnoreCase
      ) ||
      String.Equals(
        skey,
        'MedCVDischarge',
        StringComparison.InvariantCultureIgnoreCase
      )
    ) {
      sLockKeys = 'MedPrescribeDischarge~MedCVDischarge';
    } else if (
      String.Equals(
        skey,
        'MedPrescribeClerking',
        StringComparison.InvariantCultureIgnoreCase
      ) ||
      String.Equals(
        skey,
        'MedCVClerking',
        StringComparison.InvariantCultureIgnoreCase
      )
    ) {
      sLockKeys = 'MedPrescribeClerking~MedCVClerking';
    } else if (
      String.Equals(
        skey,
        'MedPrescribeLeave',
        StringComparison.InvariantCultureIgnoreCase
      ) ||
      String.Equals(
        skey,
        'MedCVLeave',
        StringComparison.InvariantCultureIgnoreCase
      )
    ) {
      sLockKeys = 'MedPrescribeLeave~MedCVLeave';
    } else if (
      String.Equals(
        skey,
        'MedPrescribeOutpatient',
        StringComparison.InvariantCultureIgnoreCase
      ) ||
      String.Equals(
        skey,
        'MedCVOutpatient',
        StringComparison.InvariantCultureIgnoreCase
      )
    ) {
      sLockKeys = 'MedPrescribeOutpatient~MedCVOutpatient';
    } else if (
      String.Equals(
        skey,
        'MedTVClerking',
        StringComparison.InvariantCultureIgnoreCase
      ) ||
      String.Equals(
        skey,
        'MedTVInpatient',
        StringComparison.InvariantCultureIgnoreCase
      ) ||
      String.Equals(
        skey,
        'MedTVOutpatient',
        StringComparison.InvariantCultureIgnoreCase
      ) ||
      String.Equals(
        skey,
        'MedTVDischarge',
        StringComparison.InvariantCultureIgnoreCase
      ) ||
      String.Equals(
        skey,
        'MedTVLeave',
        StringComparison.InvariantCultureIgnoreCase
      )
    ) {
      sLockKeys = skey;
    } else if (
      String.Equals(
        skey,
        'MAMedChart',
        StringComparison.InvariantCultureIgnoreCase
      )
    ) {
      sLockKeys = '';
    } else if (
      String.Equals(
        skey,
        'MAPrescriptionChart',
        StringComparison.InvariantCultureIgnoreCase
      )
    ) {
      sLockKeys = '';
    }
    return sLockKeys;
  }
  public static GetFormatReadonlyKeys(skey: string): string {
    let sReadonlyKeysKeys: string = String.Empty;
    if (
      String.Equals(
        skey,
        'MAMedChart',
        StringComparison.InvariantCultureIgnoreCase
      )
    ) {
      sReadonlyKeysKeys = 'MAMedChart';
    } else if (
      String.Equals(
        skey,
        'MAPrescriptionChart',
        StringComparison.InvariantCultureIgnoreCase
      )
    ) {
      sReadonlyKeysKeys = 'MAPrescriptionChart';
    } else {
      return '';
    }
    return sReadonlyKeysKeys;
  }
  public static GetFormatWarningKeys(skey: string): string {
    let sWarningkeys: string = String.Empty;
    if (
      String.Equals(
        skey,
        'MedPrescribeInpatient',
        StringComparison.InvariantCultureIgnoreCase
      ) ||
      String.Equals(
        skey,
        'MedDiscontinueCancel',
        StringComparison.InvariantCultureIgnoreCase
      ) ||
      String.Equals(
        skey,
        'MAOmit',
        StringComparison.InvariantCultureIgnoreCase
      ) ||
      String.Equals(
        skey,
        'MAReinstate',
        StringComparison.InvariantCultureIgnoreCase
      ) ||
      String.Equals(
        skey,
        'MAEnterTitratedDose',
        StringComparison.InvariantCultureIgnoreCase
      ) ||
      String.Equals(
        skey,
        'MedCVInpatient',
        StringComparison.InvariantCultureIgnoreCase
      ) ||
      String.Equals(
        skey,
        'MEDAuthInpatient',
        StringComparison.InvariantCultureIgnoreCase
      ) ||
      String.Equals(
        skey,
        'MAReview',
        StringComparison.InvariantCultureIgnoreCase
      )
    ) {
      sWarningkeys =
        'MedPrescribeDischarge~MedCVDischarge~MedPrescribeLeave~MedCVLeave~MAMedChart';
    } else if (
      String.Equals(
        skey,
        'MedPrescribeDischarge',
        StringComparison.InvariantCultureIgnoreCase
      ) ||
      String.Equals(
        skey,
        'MedCVDischarge',
        StringComparison.InvariantCultureIgnoreCase
      ) ||
      String.Equals(
        skey,
        'MedPrescribeLeave',
        StringComparison.InvariantCultureIgnoreCase
      ) ||
      String.Equals(
        skey,
        'MedCVLeave',
        StringComparison.InvariantCultureIgnoreCase
      )
    ) {
      sWarningkeys =
        'MedPrescribeInpatient~MedDiscontinueCancel~MAOmit~MAReinstate~MAEnterTitratedDose~MedCVInpatient~MEDAuthInpatient~MAReview';
    } else if (
      String.Equals(
        skey,
        'MedPrescribeClerking',
        StringComparison.InvariantCultureIgnoreCase
      ) ||
      String.Equals(
        skey,
        'MedCVClerking',
        StringComparison.InvariantCultureIgnoreCase
      )
    ) {
      sWarningkeys = '';
    } else if (
      String.Equals(
        skey,
        'MedPrescribeOutpatient',
        StringComparison.InvariantCultureIgnoreCase
      ) ||
      String.Equals(
        skey,
        'MedCVOutpatient',
        StringComparison.InvariantCultureIgnoreCase
      )
    ) {
      sWarningkeys = '';
    } else if (
      String.Equals(
        skey,
        'MedTVClerking',
        StringComparison.InvariantCultureIgnoreCase
      ) ||
      String.Equals(
        skey,
        'MedTVInpatient',
        StringComparison.InvariantCultureIgnoreCase
      ) ||
      String.Equals(
        skey,
        'MedTVOutpatient',
        StringComparison.InvariantCultureIgnoreCase
      ) ||
      String.Equals(
        skey,
        'MedTVDischarge',
        StringComparison.InvariantCultureIgnoreCase
      ) ||
      String.Equals(
        skey,
        'MedTVLeave',
        StringComparison.InvariantCultureIgnoreCase
      )
    ) {
      sWarningkeys = '';
    } else if (
      String.Equals(
        skey,
        'MAMedChart',
        StringComparison.InvariantCultureIgnoreCase
      )
    ) {
      sWarningkeys =
        'MedPrescribeInpatient~MedDiscontinueCancel~MAOmit~MAReinstate~MAEnterTitratedDose~MedCVInpatient~MEDAuthInpatient~MAReview';
    } else if (
      String.Equals(
        skey,
        'MAPrescriptionChart',
        StringComparison.InvariantCultureIgnoreCase
      )
    ) {
      sWarningkeys = '';
    }
    return sWarningkeys;
  }
  public static FetchKeyCodeForCA(sMenuCode: string): string {
    let sCACode: string = String.Empty;
    let sPrescType: string = PatientContext.PrescriptionType;
    if (
      !String.IsNullOrEmpty(sMenuCode) &&
      !String.Equals(
        sMenuCode,
        'MN_MED_VERIFY_SL_P2',
        StringComparison.InvariantCultureIgnoreCase
      ) &&
      !String.Equals(
        sMenuCode,
        'MN_MED_VALIDATE_S_P2',
        StringComparison.InvariantCultureIgnoreCase
      ) &&
      !String.Equals(
        sMenuCode,
        'MN_MEDCHART_P2',
        StringComparison.InvariantCultureIgnoreCase
      ) &&
      !String.Equals(
        sMenuCode,
        'MN_PRESCCHART_P2',
        StringComparison.InvariantCultureIgnoreCase
      )
    ) {
      switch (sMenuCode) {
        case 'MN_MEDINPATSL_P2':
        case 'MN_MEDADMINISTRAT_P2':
          sCACode = 'MedPrescribeInpatient';
          break;
        case 'MN_MEDDISCHRGESL_P2':
          sCACode = 'MedPrescribeDischarge';
          break;
        case 'MN_MEDLEAVESL_P2':
          sCACode = 'MedPrescribeLeave';
          break;
        case 'MN_MEDCLERKSL_P2':
          sCACode = 'MedPrescribeClerking';
          break;
        case 'MN_MEDOUTPATSL_P2':
          sCACode = 'MedPrescribeOutpatient';
          break;
      }
    } else if (
      !String.IsNullOrEmpty(sPrescType) &&
      String.Equals(
        sMenuCode,
        'MN_MED_VERIFY_SL_P2',
        StringComparison.InvariantCultureIgnoreCase
      )
    ) {
      switch (sPrescType) {
        case PrescriptionTypes.ForAdministration:
          sCACode = 'MedCVInpatient';
          break;
        case PrescriptionTypes.Discharge:
          sCACode = 'MedCVDischarge';
          break;
        case PrescriptionTypes.Leave:
          sCACode = 'MedCVLeave';
          break;
        case PrescriptionTypes.Clerking:
          sCACode = 'MedCVClerking';
          break;
        case PrescriptionTypes.Outpatient:
          sCACode = 'MedCVOutpatient';
          break;
      }
    } else if (
      !String.IsNullOrEmpty(sPrescType) &&
      String.Equals(
        sMenuCode,
        'MN_MED_VALIDATE_S_P2',
        StringComparison.InvariantCultureIgnoreCase
      )
    ) {
      switch (sPrescType) {
        case PrescriptionTypes.ForAdministration:
          sCACode = 'MedTVInpatient';
          break;
        case PrescriptionTypes.Discharge:
          sCACode = 'MedTVDischarge';
          break;
        case PrescriptionTypes.Leave:
          sCACode = 'MedTVLeave';
          break;
        case PrescriptionTypes.Clerking:
          sCACode = 'MedTVClerking';
          break;
        case PrescriptionTypes.Outpatient:
          sCACode = 'MedTVOutpatient';
          break;
      }
    } else if (sMenuCode == 'MN_MEDCHART_P2') {
      sCACode = 'MAMedChart';
    } else if (sMenuCode == 'MN_PRESCCHART_P2') {
      sCACode = 'MAPrescriptionChart';
    }
    return sCACode;
  }

  public static IsLockStillValid(
    EntityOID: number,
    sMenuCode: string,
    out1: (_LockedUsersDetails: LockedUsersDetails) => void
  ): boolean {
    let _LockedUsersDetails: LockedUsersDetails;

    let bRetValue: boolean = true;
    _LockedUsersDetails = new LockedUsersDetails();
    let ContextPresType: string = PatientContext.PrescriptionType;
    if (
      PatientContext.ClerkFormViewDefaultBehavior ==
      ClerkFormViewDeftBehaviour.LaunchFormMandatory
    ) {
      ContextPresType = PrescriptionTypes.Clerking;
    }
    let objLockStillValid: ScriptObject = ObjectHelper.CreateType<ScriptObject>(
      HtmlPage.Window.Invoke(
        'IsLockStillValid',
        EntityOID,
        PatientContext.EncounterOid,
        sMenuCode,
        ContextPresType
      ),
      'ScriptObject'
    );
    if (objLockStillValid != null) {
      if (
        objLockStillValid.GetProperty('IsLockValid') != null &&
        String.Equals(
          objLockStillValid.GetProperty('IsLockValid').ToString(),
          'FALSE',
          StringComparison.CurrentCultureIgnoreCase
        )
      ) {
        bRetValue = false;
        if (objLockStillValid.GetProperty('LockedUserName') != null) {
          _LockedUsersDetails.LockedUserName = objLockStillValid
            .GetProperty('LockedUserName')
            .ToString();
        }
        if (objLockStillValid.GetProperty('ActivityLock') != null) {
          _LockedUsersDetails.ActivityLock = objLockStillValid
            .GetProperty('ActivityLock')
            .ToString();
        }
        if (objLockStillValid.GetProperty('CareActivityName') != null) {
          _LockedUsersDetails.CareActivityName = objLockStillValid
            .GetProperty('CareActivityName')
            .ToString();
        }
      }
    }
    out1(_LockedUsersDetails);
    return bRetValue;
  }

  public static IsLockedByAnotherUser(
    _MenuCode: string,
    _IsFindLockKeys: boolean,
    out1: (_LockedUsersDetails: LockedUsersDetails) => void
  ): boolean {
    let _LockedUsersDetails: LockedUsersDetails;

    let _ReturnValue: boolean = false;
    _LockedUsersDetails = new LockedUsersDetails();
    if (_IsFindLockKeys) {
      let sCurrentActivity: string =
        MedicationCommonBB.FetchKeyCodeForCA(_MenuCode);
      _LockedUsersDetails.LockKeyOfGivenMenuCode =
        MedicationCommonBB.GetFormatLockKeys(sCurrentActivity);
      _LockedUsersDetails.ReadonlyKeyofGivenMenuCode =
        MedicationCommonBB.GetFormatReadonlyKeys(sCurrentActivity);
      _LockedUsersDetails.WarningKeyOfGivenMenuCode =
        MedicationCommonBB.GetFormatWarningKeys(sCurrentActivity);
    } else {
      _LockedUsersDetails.LockKeyOfGivenMenuCode = _MenuCode;
    }
    let objLockedUsersDet: ScriptObject = ObjectHelper.CreateType<ScriptObject>(
      HtmlPage.Window.Invoke(
        'GetLockedUsersDetails',
        PatientContext.PatientOID.ToString(),
        PatientContext.EncounterOid.ToString(),
        0,
        0,
        _LockedUsersDetails.LockKeyOfGivenMenuCode,
        _LockedUsersDetails.ReadonlyKeyofGivenMenuCode,
        _LockedUsersDetails.WarningKeyOfGivenMenuCode
      ),
      'ScriptObject'
    );
    if (objLockedUsersDet != null) {
      if (objLockedUsersDet.GetProperty('ActivityLock') != null) {
        _LockedUsersDetails.ActivityLock = objLockedUsersDet
          .GetProperty('ActivityLock')
          .ToString();
      }
      if (objLockedUsersDet.GetProperty('CareActivityName') != null) {
        _LockedUsersDetails.CareActivityName = objLockedUsersDet
          .GetProperty('CareActivityName')
          .ToString();
      }
      if (objLockedUsersDet.GetProperty('ErrorCode') != null) {
        _LockedUsersDetails.ErrorCode = objLockedUsersDet
          .GetProperty('ErrorCode')
          .ToString();
        if (
          !String.IsNullOrEmpty(_LockedUsersDetails.ErrorCode) &&
          String.Equals(_LockedUsersDetails.ErrorCode, CConstants.LockErrorcode)
        ) {
          _ReturnValue = true;
        }
      }
      if (objLockedUsersDet.GetProperty('LockedUserName') != null) {
        _LockedUsersDetails.LockedUserName = objLockedUsersDet
          .GetProperty('LockedUserName')
          .ToString();
      }
      if (objLockedUsersDet.GetProperty('WarningMessage') != null) {
        _LockedUsersDetails.WarningMessage = objLockedUsersDet
          .GetProperty('WarningMessage')
          .ToString();
      }
      if (objLockedUsersDet.GetProperty('MedChartOID') != null) {
        _LockedUsersDetails.MedChartOID = objLockedUsersDet
          .GetProperty('MedChartOID')
          .ToString();
      }
    }
    out1(_LockedUsersDetails);
    return _ReturnValue;
  }

  public static GetScheduleDatesForDoseDuration(
    dtStartDTTM: DateTime,
    currentDateTime: DateTime,
    Duration: Double,
    FreqDetails: IPPManagePrescSer.CResMsgGetAdministrationTimes
  ): List<DateTime> {
    let oIPPFrequency: IPPManagePrescSer.IPPFrequency = null;
    let oAdminTimesData: ObservableCollection<IPPManagePrescSer.IPPScheduledetails> =
      null;
    let lstScheduleDate: List<DateTime> = new List<DateTime>();
    let StartDTTM: DateTime = DateTime.MinValue;
    let EndDTTM: DateTime = DateTime.MinValue;
    let NoOfSchedules: Double = 0;
    let PresStartDTTM: DateTime = dtStartDTTM;
    NoOfSchedules = Duration;
    if (DateTime.LessThan(dtStartDTTM.ToUniversalTime(), currentDateTime.ToUniversalTime())) {
      dtStartDTTM = currentDateTime;
    }
    if (
      DateTime.NotEquals(dtStartDTTM, DateTime.MinValue) &&
      FreqDetails != null &&
      FreqDetails.oFrequency != null
    ) {
      oIPPFrequency = FreqDetails.oFrequency;
      let LowPeriod: number = oIPPFrequency.LowPeriod;
      let HighPeriod: number = oIPPFrequency.HighPeriod;
      let HighEvent: number = oIPPFrequency.HighEvent;
      let LowEvent: number = oIPPFrequency.LowEvent;
      let EventToConsider: number = HighEvent > 0 ? HighEvent : LowEvent;
      let PeriodToConsider: number = HighPeriod > 0 ? HighPeriod : LowPeriod;
      let MinTimeToPrescribe: number = 0;
      if (
        String.Compare(
          oIPPFrequency.Type,
          'CC_INTERVAL',
          StringComparison.CurrentCultureIgnoreCase
        ) == 0
      ) {
        StartDTTM = PresStartDTTM;
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
        if (DateTime.Equals(StartDTTM.ToUniversalTime(), EndDTTM.ToUniversalTime())) {
          lstScheduleDate.Add(StartDTTM);
        } else {
          if ((NoOfSchedules as number) > 0) {
            let nCount: number = 0;
            while (nCount < (NoOfSchedules as number)) {
              if (
                DateTime.GreaterThanOrEqualTo(StartDTTM.ToUniversalTime(), dtStartDTTM.ToUniversalTime()) &&
                nCount < (NoOfSchedules as number)
              ) {
                if (
                  TimeZoneInfo.Local.IsDaylightSavingTime(StartDTTM) &&
                  TimeZoneInfo.Local.IsAmbiguousTime(StartDTTM) &&
                  DateTime.NotEquals(StartDTTM.ToUniversalTime(), dtStartDTTM.ToUniversalTime())
                ) {
                } else {
                  lstScheduleDate.Add(StartDTTM);
                  nCount++;
                }
              }
              let DSTOffsetInMinutes: number =
                TimeZoneInfo.Local.GetUtcOffset(StartDTTM.ToLocalTime())
                  .TotalMinutes - TimeZoneInfo.Local.BaseUtcOffset.TotalMinutes;
              if (DSTOffsetInMinutes >= MinTimeToPrescribe) {
                StartDTTM = StartDTTM.ToUniversalTime()
                  .AddMinutes(MinTimeToPrescribe)
                  .ToLocalTime();
              } else {
                StartDTTM = StartDTTM.AddMinutes(MinTimeToPrescribe);
              }
            }
          }
        }
      } else {
        if ((NoOfSchedules as number) > 0) {
          let _TmpSceduleCount: number = 0;
          let oTempStartDttm: DateTime = PresStartDTTM.Date;
          let oTempEndDttm: DateTime = EndDTTM;
          if (FreqDetails.oFixedTimes != null)
            oAdminTimesData =
              new ObservableCollection<IPPManagePrescSer.IPPScheduledetails>(
                FreqDetails.oFixedTimes
              );
          else if (FreqDetails.oDrugRoundTimes != null)
            oAdminTimesData =
              new ObservableCollection<IPPManagePrescSer.IPPScheduledetails>(
                FreqDetails.oDrugRoundTimes
              );
          if (oAdminTimesData != null) {
            while (_TmpSceduleCount < (NoOfSchedules as number)) {
              if (oAdminTimesData != null && oAdminTimesData.Count > 0) {
                for (let i: number = 0; i < oAdminTimesData.Count; i++) {
                  let oSlotDTTM: DateTime = DateTime.MinValue;
                  let sSlotTime: string = oAdminTimesData[i].ScheduledTime;
                  oSlotDTTM = oTempStartDttm.DateTime.AddMinutes(
                    Convert.ToInt32(sSlotTime)
                  );
                  if (
                    TimeZoneInfo.Local.IsDaylightSavingTime(oSlotDTTM) &&
                    TimeZoneInfo.Local.IsAmbiguousTime(oSlotDTTM)
                  ) {
                    let DSTOffsetInMinutes: number =
                      TimeZoneInfo.Local.GetUtcOffset(oSlotDTTM.ToLocalTime())
                        .TotalMinutes -
                      TimeZoneInfo.Local.BaseUtcOffset.TotalMinutes;
                    oSlotDTTM = oSlotDTTM
                      .ToUniversalTime()
                      .AddMinutes(DSTOffsetInMinutes)
                      .ToLocalTime();
                  }
                  if (!String.IsNullOrEmpty(sSlotTime)) {
                    if (
                      oIPPFrequency != null &&
                      String.Equals(oIPPFrequency.UOM, 'CC_MEDDRSN2')
                    ) {
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
                        if (
                          DateTime.GreaterThanOrEqualTo(oSlotDTTM.ToUniversalTime(),
                            dtStartDTTM.ToUniversalTime()) &&
                          _TmpSceduleCount < (NoOfSchedules as number)
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
                        if (
                          DateTime.GreaterThanOrEqualTo(oSlotDTTM.ToUniversalTime(),
                            dtStartDTTM.ToUniversalTime()) &&
                          _TmpSceduleCount < (NoOfSchedules as number)
                        ) {
                          lstScheduleDate.Add(oSlotDTTM);
                          _TmpSceduleCount++;
                        }
                      } else if (
                        oIPPFrequency != null &&
                        oIPPFrequency.LowPeriod > oIPPFrequency.LowEvent
                      ) {
                        if (
                          lstScheduleDate != null &&
                          lstScheduleDate.Count == 0
                        ) {
                          let FirstDateOfweek: DateTime =
                            MCommonBB.GetFirstDateOfweek(
                              oTempStartDttm,
                              oTempEndDttm,
                              oIPPFrequency,
                              null
                            );
                          if (DateTime.Equals(FirstDateOfweek, DateTime.MinValue)) {
                            break;
                          }
                          oTempStartDttm = FirstDateOfweek;
                        }
                        oSlotDTTM = oTempStartDttm.DateTime.AddMinutes(
                          Convert.ToInt32(sSlotTime)
                        );
                        if (
                          DateTime.GreaterThanOrEqualTo(oSlotDTTM.ToUniversalTime(),
                            dtStartDTTM.ToUniversalTime()) &&
                          _TmpSceduleCount < (NoOfSchedules as number)
                        ) {
                          lstScheduleDate.Add(oSlotDTTM);
                          _TmpSceduleCount++;
                        }
                      }
                    } else {
                      if (
                        DateTime.GreaterThanOrEqualTo(oSlotDTTM.ToUniversalTime(),
                          dtStartDTTM.ToUniversalTime()) &&
                        _TmpSceduleCount < (NoOfSchedules as number)
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
  public static GetWarningCategories(): void {
    if (WebServiceURLMedicationCommonBB.IPPMAManagePrescriptionWS != null) {
      let objService: IPPManagePrescSer.IPPMAManagePrescriptionWSSoapClient =
        new IPPManagePrescSer.IPPMAManagePrescriptionWSSoapClient();
      let objReqGetWarningCategories: IPPManagePrescSer.CReqMsgGetWarningCategories =
        new IPPManagePrescSer.CReqMsgGetWarningCategories();
      objReqGetWarningCategories.MCVersionBC = AppSessionInfo.AMCV;
      objReqGetWarningCategories.oContextInformation = CommonBB.FillContext();
      objService.GetWarningCategoriesCompleted = (s, e) => {
        MedicationCommonBB.GetWarningCategories_Completed(s, e);
      };
      objService.GetWarningCategoriesAsync(objReqGetWarningCategories);
    }
  }
  static GetWarningCategories_Completed(
    sender: Object,
    e: IPPManagePrescSer.GetWarningCategoriesCompletedEventArgs
  ): void {
    if (e.Error != null) {
      let _ErrorID: number = 80000038;
      let _ErrorSource: string =
        'lorappmedicationcommonbb_p2.dll, Class:IPPMABaseVM, Method:GetWarningCategories_Completed()';
      let lnReturn: number = Application.AMSHelper.PublicExceptionDetails(
        _ErrorID,
        _ErrorSource,
        e.Error
      );
    } else {
      let objResGetWarningCategories: IPPManagePrescSer.CResMsgGetWarningCategories =
        e.Result;
      if (
        objResGetWarningCategories != null &&
        objResGetWarningCategories.objWarningCategories != null
      ) {
        WarningConceptCode.WarningCategoriesData =
          new ObservableCollection<CValuesetTerm>();
        objResGetWarningCategories.objWarningCategories.forEach((oWarnCat) => {
          WarningConceptCode.WarningCategoriesData.Add(
            ObjectHelper.CreateObject(new CValuesetTerm(), {
              csCode: oWarnCat.UOMCode,
              csDescription: oWarnCat.UOMName,
            })
          );
        });
      }
    }
  }
}
export class LockedUsersDetails {
  public ActivityLock: string;
  public CareActivityName: string;
  public ErrorCode: string;
  public LockedUserName: string;
  public LockKeyOfGivenMenuCode: string;
  public MedChartOID: string;
  public WarningMessage: string;
  public WarningKeyOfGivenMenuCode: string;
  public ReadonlyKeyofGivenMenuCode: string;
}
