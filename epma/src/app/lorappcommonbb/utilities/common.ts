import { Component, OnInit } from '@angular/core';
import {
  StringBuilder,
  ProfileFactoryType,
  ContextManager,
  Convert,
  AppActivity,
  ApplicationHelper,
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
  HtmlPage,
  CContextInformation,
  StringSplitOptions
} from 'epma-platform/models';
import { AppDialog, UserControl } from 'epma-platform/controls';
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
import { AppContextInfo, ContextInfo, PatientContext } from './globalvariable';
import {
  Color,
  Colors,
  Uri,
} from 'src/app/shared/epma-platform/controls/Control';
import { CConstants } from './cconstants';
import {
  DayOfWeek,
  SLDateUtility,
} from 'src/app/shared/epma-platform/services/sLDateUtility.service';
import { ProfileData } from 'src/app/lorappmanageprescriptionbbui/utilities/profiledata';

import { CValuesetTerm } from 'src/app/shared/epma-platform/soap-client/CReferenceWS';
import {
  CReqMsgGetPatientInfo,
  QueryPatientRecordWSSoapClient,
  GetPatientInfoCompletedEventArgs,
  CResMsgGetPatientInfo,
} from 'src/app/shared/epma-platform/soap-client/QueryPatientRecordWS';
import { BSAFormulaConfigData } from 'src/app/lorappslprofiletypes/medication';
import {
  DependencyObject,
  VisualTreeHelper,
} from 'src/app/shared/epma-platform/models/eppma-common-types';
import { NumberStyles } from 'src/app/shared/epma-platform/models/system.types';
import 'epma-platform/booleanextension';
import 'epma-platform/numberextension';
import 'epma-platform/stringextension';
import {iMath} from 'epma-platform/mathextension';
import 'epma-platform/arrayextension';

export class CommonBB {
  public static CHRDOLLARSYL: string = '$';
  static PatientAge: number = 0;
  static sWValue: string = String.Empty;
  static sHValue: string = String.Empty;
  static sBSA: string = String.Empty;
  //public delegate void PatientBSADataDelegate();
  //public delegate void PatientBSADataEventArgs(string Formula, string BSA);
  public static PatientBSADataCompleted: Function;
  public static PatientBSADataCompletedEvent: Function;
  public static PatientBSADataCompletedEvent_chart: Function;
  public static FillContext(): CContextInformation {
    let obj: CContextInformation = new CContextInformation();
    obj.ReleaseVersion = ContextInfo.ReleaseVersion;
    obj.UserID = ContextInfo.UserOID;
    obj.SecurityToken = ContextInfo.SecurityToken;
    obj.PatientID = PatientContext.PatientOID?.ToString();
    obj.OrganizationID = AppContextInfo.OrganisationOID;
    return obj;
  }
  public static IsHTTPS: boolean = null;

  public static GetURLString(Result: string, sAbsoluteUri: string): string {
    let arstrQry: string[] = Result.Split(CommonBB.CHRDOLLARSYL);
    let sAppServer: string = String.Empty;
    if (!String.IsNullOrEmpty(sAbsoluteUri)) {
      sAppServer = sAbsoluteUri.Split('/')[2];
    }
    if (arstrQry.length > 0) {
      let ResultArr: string[] = arstrQry[0].Split('/');
      let sb: StringBuilder = new StringBuilder();
      for (let i: number = 0; i < ResultArr.length; i++) {
        if (i == 2) {
          sb.Append(sAppServer);
          sb.Append('/');
        } else {
          sb.Append(ResultArr[i]);
          if (i != ResultArr.length - 1) sb.Append('/');
        }
      }
      return CommonBB.GetCorrectURL(sb.ToString());
    }
    return String.Empty;
  }
  public static GetWizardAction(sData: string): LzoWizardAction {
    let _WizardAction: LzoWizardAction = LzoWizardAction.Cancel;
    let arrReturnData: string[] = sData.Split('&');
    if (arrReturnData.length > 0) {
      let nDataLen: number = arrReturnData.length;
      for (let i: number = 0; i < nDataLen; i++) {
        let arrDataValue: string[] = arrReturnData[i].Split('=');
        if (
          arrDataValue.length == 2 &&
          String.Compare(arrDataValue[0], 'WIZ_Status') == 0
        ) {
          if (String.Compare(arrDataValue[1], 'FINISH') == 0)
            _WizardAction = LzoWizardAction.Finish;
          else if (String.Compare(arrDataValue[1], 'FINISHNOW') == 0)
            _WizardAction = LzoWizardAction.FinishNow;
          else if (String.Compare(arrDataValue[1], 'CANCEL') == 0)
            _WizardAction = LzoWizardAction.Cancel;
          break;
        }
      }
    }
    return _WizardAction;
  }
  public static GetValueFromWizardContext(sData: string, sKey: string): string {
    let sValue: string = String.Empty;
    if (!String.IsNullOrEmpty(sData) && !String.IsNullOrEmpty(sKey)) {
      let arrReturnData: string[] = sData.Split('&');
      if (arrReturnData != null && arrReturnData.length > 0) {
        let nDataLen: number = arrReturnData.length;
        for (let i: number = 0; i < nDataLen; i++) {
          let arrDataValue: string[] = arrReturnData[i].Split('=');
          if (
            arrDataValue.length == 2 &&
            String.Equals(
              arrDataValue[0],
              sKey,
              StringComparison.InvariantCultureIgnoreCase
            )
          ) {
            sValue = arrDataValue[1];
            break;
          }
        }
      }
    }
    return sValue;
  }
  static GetCorrectURL(src: string): string {
    if (!ObjectHelper.HasValue(CommonBB.IsHTTPS)) {
      CommonBB.IsHTTPS = ApplicationHelper.AbsoluteUri.StartsWith(
        'https',
        StringComparison.InvariantCultureIgnoreCase
      );
    }
    if (
      CommonBB.IsHTTPS.Value &&
      !src.StartsWith('https', StringComparison.InvariantCultureIgnoreCase)
    ) {
      return src.ToLower().Replace('http:', 'https:');
    } else if (
      !CommonBB.IsHTTPS.Value &&
      src.StartsWith('https', StringComparison.InvariantCultureIgnoreCase)
    ) {
      return src.ToLower().Replace('https:', 'http:');
    }
    return src.ToLower();
  }
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
      return CommonBB.GetText(ConceptCode, oTerm);
    }
  }
  public static GetText(
    sCCode: string,
    oTerm: ObservableCollection<CValuesetTerm>
  ): string {
    let sText: string = String.Empty;
    let tmpText: string = String.Empty;
    if (
      CommonBB.IsConceptCodeExists(sCCode, oTerm, (o1) => {
        tmpText = o1;
      }) != false
    )
      sText = tmpText;
    else sText = sCCode;
    return sText;
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
        .Where(
          (term) =>
            String.Compare(
              term.csCode,
              sConceptCode,
              StringComparison.CurrentCultureIgnoreCase
            ) == 0
        )
        .Select((term) => term.csDescription);
      if (Results != null && Results.Count() > 0)
        sResultDetails = Results.First();
      bResult = !String.IsNullOrEmpty(sResultDetails);
    }
    out1(sResultDetails);
    return bResult;
  }
  public static SetTimeAdjustment(): TimeSpan {
    return SLDateUtility.GetLocalServerDateTime().Subtract(
      SLDateUtility.GetServerDateTime()
    );
  }
  public static GetServerDateTime(): DateTime {
    let CurrentDTTM: DateTime = SLDateUtility.GetLocalServerDateTime();
    return CurrentDTTM.AddSeconds(-CurrentDTTM.Second);
  }
  public static ToColor(value: string): Color {
    if (value == null) return Colors.Red;
    if (value[0] == '#') value = value.Remove(0, 1);
    let length: number = value.length;
    if ((length == 6 || length == 8) && CommonBB.IsHexColor(value)) {
      if (length == 8){
        let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(value);
        if(result){
        return Color.FromArgb(
          parseInt(result[4], NumberStyles.AllowParentheses),
          parseInt(result[1], NumberStyles.AllowParentheses),
          parseInt(result[2], NumberStyles.AllowParentheses),
          parseInt(result[3], NumberStyles.AllowParentheses)
        )}else{
          return Colors.Red;
        }
      }else if(length == 6){
        let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(value);
        if(result){
          return Color.FromArgb(
            0xff,
            parseInt(result[1], NumberStyles.AllowParentheses),
            parseInt(result[2], NumberStyles.AllowParentheses),
            parseInt(result[3], NumberStyles.AllowParentheses)
          )
        }else{
          return Colors.Red;
        }
      }
      /*if (length == 8)
        return Color.FromArgb(
          Number.Parse(
            value.Substring(0, 2),
            NumberStyles.HexNumber.toString()
          ),
          Number.Parse(
            value.Substring(2, 2),
            NumberStyles.HexNumber.toString()
          ),
          Number.Parse(value.Substring(4, 2)),
          Number.Parse(value.Substring(6, 2), NumberStyles.HexNumber.toString())
        );
      if (length == 6)
        return Color.FromArgb(
          0xff,
          Number.Parse(
            value.Substring(0, 2),
            NumberStyles.HexNumber.toString()
          ),
          Number.Parse(
            value.Substring(2, 2),
            NumberStyles.HexNumber.toString()
          ),
          Number.Parse(value.Substring(4, 2), NumberStyles.HexNumber.toString())
        );*/
    }
    let argb: string[] = value.Split(
      [',', ' '],
      StringSplitOptions.RemoveEmptyEntries
    );
    if (argb != null) {
      if (argb.length == 4)
        return Color.FromArgb(
          Number.Parse(argb[0]),
          Number.Parse(argb[1]),
          Number.Parse(argb[2]),
          Number.Parse(argb[3])
        );
      if (argb.length == 3)
        return Color.FromArgb(
          0xff,
          Number.Parse(argb[0]),
          Number.Parse(argb[1]),
          Number.Parse(argb[2])
        );
    }
    return Colors.Red;
  }
  static IsHexColor(value: string): boolean {
    if (value == null) return false;
    value.ToCharArray().forEach((c) => {
      if (!Uri.IsHexDigit(c)) return false;
      return false;
    });
    return true;
  }
  public static ConvertHourstoMinutes(nHours: number): number {
    let nMaxMinutes: number = 60;
    let nMinutes: number = 0;
    // nMinutes = <number>nHours * nMaxMinutes;
    nMinutes = Math.floor(nHours) * nMaxMinutes;
    nMinutes += <number>((nHours - iMath.Floor(nHours)) * nMaxMinutes);
    return nMinutes;
  }
  public static ConvertDaystoMinutes(nDays: number): number {
    let nMaxMinutes: number = 1440;
    return Convert.ToInt32(nMaxMinutes * 1.0 * nDays);
  }
  public static GetPatientBSA(
    PatientOID: number,
    nPatientAge: number,
    PatientHeight: string,
    PatientWeight: string
  ): void {
    CommonBB.PatientAge = nPatientAge;
    CommonBB.sWValue = String.Empty;
    CommonBB.sHValue = String.Empty;
    CommonBB.ConvertHeightAndWeight(PatientHeight, PatientWeight);
    if (CommonBB.PatientAge == 0) {
      let objService: QueryPatientRecordWSSoapClient =
        new QueryPatientRecordWSSoapClient();
      objService.GetPatientInfoCompleted = (s, e) => {
        CommonBB.objService_GetPatientInfoCompleted(s, e);
      };
      let objReq: CReqMsgGetPatientInfo = new CReqMsgGetPatientInfo();
      objReq.oContextInformation = CommonBB.FillContext();
      objReq.PatientOIDBC = PatientOID;
      objService.GetPatientInfoAsync(objReq);
    } else {
      CommonBB.getBSAFormulaConfig();
    }
  }
  static objService_GetPatientInfoCompleted(
    sender: Object,
    e: GetPatientInfoCompletedEventArgs
  ): void {
    if (e.Error != null) return;
    let objRes: CResMsgGetPatientInfo = e.Result;
    if (
      objRes != null &&
      objRes.oPatientBasicInfo != null &&
       DateTime.NotEquals(objRes.oPatientBasicInfo.DOB,DateTime.MinValue)
    ) {
      CommonBB.PatientAge = objRes.oPatientBasicInfo.Age;
    }
    CommonBB.getBSAFormulaConfig();
  }
  static getBSAFormulaConfig(): void {
    let profile: ProfileFactoryType = new ProfileFactoryType();
    profile.OnProfileLoaded = (s, e) => {
      CommonBB.profile_OnProfileLoaded(s, e);
    };
    profile.GetProfile<BSAFormulaConfigData>(
      'VW_MEDICONFIG',
      'BSAFORMULACONFIG'
    );
  }
  static profile_OnProfileLoaded(sender: Object, Result: IProfileProp): void {
    CommonBB.sBSA = String.Empty;
    PatientContext.BSA = String.Empty;
    let sFormula: string = String.Empty;
    if (Result != null && Result.Profile != null) {
      if (Result.Profile instanceof BSAFormulaConfigData) {
        ProfileData.BSAFormulaConfig =
          ObjectHelper.CreateType<BSAFormulaConfigData>(
            Result.Profile,
            BSAFormulaConfigData
          );
        if (ProfileData.BSAFormulaConfig != null) {
          let BSAFormulaConfig: BSAFormulaConfigData =
            ProfileData.BSAFormulaConfig;

          if (
            BSAFormulaConfig != null &&
            BSAFormulaConfig.FormulaConfig != null &&
            BSAFormulaConfig.FormulaConfig.Count > 0
          ) {
            let BSAFormula: string[] = null;
            let nCount: number = BSAFormulaConfig.FormulaConfig.Count;
            for (let Cnt: number = 0; Cnt < nCount; Cnt++) {
              BSAFormula = BSAFormulaConfig.FormulaConfig[Cnt].Split('~');
              if (
                BSAFormula.length > 2 &&
                BSAFormula[2].length > 0 &&
                BSAFormula[1].length > 0 &&
                BSAFormula[0].length > 0
              ) {
                switch (BSAFormula[2]) {
                  case '=':
                    if (CommonBB.PatientAge == Convert.ToInt32(BSAFormula[1]))
                      sFormula = BSAFormula[0];
                    break;
                  case '>=':
                    if (CommonBB.PatientAge >= Convert.ToInt32(BSAFormula[1]))
                      sFormula = BSAFormula[0];
                    break;
                  case '<=':
                    if (CommonBB.PatientAge <= Convert.ToInt32(BSAFormula[1]))
                      sFormula = BSAFormula[0];
                    break;
                  case '<':
                    if (CommonBB.PatientAge < Convert.ToInt32(BSAFormula[1]))
                      sFormula = BSAFormula[0];
                    break;
                  case '>':
                    if (CommonBB.PatientAge > Convert.ToInt32(BSAFormula[1]))
                      sFormula = BSAFormula[0];
                    break;
                  default:
                    sFormula = String.Empty;
                    break;
                }
              }
              if (!String.IsNullOrEmpty(sFormula)) {
                break;
              }
            }
          }
          let sDefaultBSA: string = sFormula;
          if (
            !String.IsNullOrEmpty(CommonBB.sWValue) &&
            !String.IsNullOrEmpty(CommonBB.sHValue) &&
            !String.IsNullOrEmpty(sDefaultBSA)
          ) {
            let fHt: number;
            let fWt: number;
            let Htinm: number = Convert.ToDouble(CommonBB.sHValue);
            let Wtinkg: number = Convert.ToDouble(CommonBB.sWValue);
            let dBSA: number;
            let nBSA: number;
            switch (sDefaultBSA) {
              case 'CC_MOSTELLER': {
                fHt = Htinm * 100;
                fWt = Wtinkg;
                dBSA = fHt * fWt;
                dBSA = dBSA / 3600;
                dBSA = iMath.Sqrt(dBSA);
                break;
              }
              case 'CC_DUBOIS': {
                fHt = Htinm * 100;
                fWt = Wtinkg;
                fHt = 0.007184 * iMath.Pow(fHt, 0.725);
                fWt = iMath.Pow(fWt, 0.425);
                dBSA = fHt * fWt;
                break;
              }
              case 'CC_HAYCOCK': {
                fHt = Htinm * 100;
                fWt = Wtinkg;
                fHt = 0.024265 * iMath.Pow(fHt, 0.3964);
                fWt = iMath.Pow(fWt, 0.5378);
                dBSA = fHt * fWt;
                break;
              }
              case 'CC_GEHANGRG':
              case 'CC_GEHAN': {
                fHt = Htinm * 100;
                fWt = Wtinkg;
                fHt = 0.0235 * iMath.Pow(fHt, 0.42246);
                fWt = iMath.Pow(fWt, 0.51456);
                dBSA = fHt * fWt;
                break;
              }
              case 'CC_BOYD': {
                fHt = Htinm * 100;
                fWt = Wtinkg * 1000;
                fHt = 0.0003207 * iMath.Pow(fHt, 0.3);
                fWt = iMath.Pow(fWt, 0.7285 - 0.0188 * iMath.Log10(fWt));
                dBSA = fHt * fWt;
                break;
              }
              case 'CC_BOYDWGT': {
                let dCalBodyWeight: number = 0;
                fWt = Wtinkg * 1000;
                dCalBodyWeight = 0.8168 - 0.0154 * iMath.Log10(fWt);
                fWt = 4.688 * iMath.Pow(fWt, dCalBodyWeight);
                dBSA = fWt / 10000;
                break;
              }
              default: {
                fHt = Htinm * 100;
                fWt = Wtinkg * 1000;
                fHt = 0.0003207 * iMath.Pow(fHt, 0.3);
                fWt = iMath.Pow(fWt, 0.7285 - 0.0188 * iMath.Log10(fWt));
                dBSA = fHt * fWt;
                break;
              }
            }
            nBSA = iMath.Round(dBSA, 2);
            PatientContext.BSA = nBSA.ToString() + '';
          } else if (
            !String.IsNullOrEmpty(CommonBB.sWValue) &&
            !String.IsNullOrEmpty(sDefaultBSA)
          ) {
            let fWt: number;
            let Wtinkg: number = Convert.ToDouble(CommonBB.sWValue);
            let dBSA: number;
            let nBSA: number;
            if (String.Equals(sDefaultBSA, 'CC_BOYDWGT')) {
              let dCalBodyWeight: number = 0;
              fWt = Wtinkg * 1000;
              dCalBodyWeight = 0.8168 - 0.0154 * iMath.Log10(fWt);
              fWt = 4.688 * iMath.Pow(fWt, dCalBodyWeight);
              dBSA = fWt / 10000;
              nBSA = iMath.Round(dBSA, 2);
              PatientContext.BSA = nBSA.ToString() + '';
            }
          }
        }
      }
    }
    if (CommonBB.PatientBSADataCompleted != null)
      CommonBB.PatientBSADataCompleted();
    if (CommonBB.PatientBSADataCompletedEvent != null)
      CommonBB.PatientBSADataCompletedEvent(sFormula, PatientContext.BSA);
  }
  public static GetPatientBSA_ChartHeader(
    PatientOID: number,
    nPatientAge: number,
    PatientHeight: string,
    PatientWeight: string
  ): void {
    CommonBB.PatientAge = nPatientAge;
    CommonBB.sWValue = PatientWeight.Split(' ')[0];
    CommonBB.sHValue = PatientHeight.Split(' ')[0];
    CommonBB.ConvertHeightAndWeight(PatientHeight, PatientWeight);
    if (CommonBB.PatientAge == 0) {
      let objService: QueryPatientRecordWSSoapClient =
        new QueryPatientRecordWSSoapClient();
      objService.GetPatientInfoCompleted = (s, e) => {
        CommonBB.objService_GetPatientInfoCompleted_ChartHeader(s, e);
      };
      let objReq: CReqMsgGetPatientInfo = new CReqMsgGetPatientInfo();
      objReq.oContextInformation = CommonBB.FillContext();
      objReq.PatientOIDBC = PatientOID;
      objService.GetPatientInfoAsync(objReq);
    } else {
      CommonBB.getBSAFormulaConfig_ChartHeader();
    }
  }
  static objService_GetPatientInfoCompleted_ChartHeader(
    sender: Object,
    e: GetPatientInfoCompletedEventArgs
  ): void {
    if (e.Error != null) return;
    let objRes: CResMsgGetPatientInfo = e.Result;
    if (
      objRes != null &&
      objRes.oPatientBasicInfo != null &&
      DateTime.NotEquals(objRes.oPatientBasicInfo.DOB, DateTime.MinValue)
    ) {
      CommonBB.PatientAge = objRes.oPatientBasicInfo.Age;
    }
    CommonBB.getBSAFormulaConfig_ChartHeader();
  }
  static getBSAFormulaConfig_ChartHeader(): void {
    let profile: ProfileFactoryType = new ProfileFactoryType();
    profile.OnProfileLoaded = (s, e) => {
      CommonBB.profile_OnProfileLoaded_ChartHeader(s, e);
    };
    profile.GetProfile<BSAFormulaConfigData>(
      'VW_MEDICONFIG',
      'BSAFORMULACONFIG'
    );
  }
  static profile_OnProfileLoaded_ChartHeader(
    sender: Object,
    Result: IProfileProp
  ): void {
    let sFormula: string = String.Empty;
    if (Result != null && Result.Profile != null) {
      if (Result.Profile instanceof BSAFormulaConfigData) {
        ProfileData.BSAFormulaConfig =
          ObjectHelper.CreateType<BSAFormulaConfigData>(
            Result.Profile,
            BSAFormulaConfigData
          );
        if (ProfileData.BSAFormulaConfig != null) {
          let BSAFormulaConfig: BSAFormulaConfigData =
            ProfileData.BSAFormulaConfig;
          if (
            BSAFormulaConfig != null &&
            BSAFormulaConfig.FormulaConfig != null &&
            BSAFormulaConfig.FormulaConfig.Count > 0
          ) {
            let BSAFormula: string[] = null;
            let nCount: number = BSAFormulaConfig.FormulaConfig.Count;
            for (let Cnt: number = 0; Cnt < nCount; Cnt++) {
              BSAFormula = BSAFormulaConfig.FormulaConfig[Cnt].Split('~');
              if (
                BSAFormula.length > 2 &&
                BSAFormula[2].length > 0 &&
                BSAFormula[1].length > 0 &&
                BSAFormula[0].length > 0
              ) {
                switch (BSAFormula[2]) {
                  case '=':
                    if (CommonBB.PatientAge == Convert.ToInt32(BSAFormula[1]))
                      sFormula = BSAFormula[0];
                    break;
                  case '>=':
                    if (CommonBB.PatientAge >= Convert.ToInt32(BSAFormula[1]))
                      sFormula = BSAFormula[0];
                    break;
                  case '<=':
                    if (CommonBB.PatientAge <= Convert.ToInt32(BSAFormula[1]))
                      sFormula = BSAFormula[0];
                    break;
                  case '<':
                    if (CommonBB.PatientAge < Convert.ToInt32(BSAFormula[1]))
                      sFormula = BSAFormula[0];
                    break;
                  case '>':
                    if (CommonBB.PatientAge > Convert.ToInt32(BSAFormula[1]))
                      sFormula = BSAFormula[0];
                    break;
                  default:
                    sFormula = String.Empty;
                    break;
                }
              }
              if (!String.IsNullOrEmpty(sFormula)) {
                break;
              }
            }
          }
          let sDefaultBSA: string = sFormula;
          if (
            !String.IsNullOrEmpty(CommonBB.sWValue) &&
            !String.IsNullOrEmpty(CommonBB.sHValue) &&
            !String.IsNullOrEmpty(sDefaultBSA)
          ) {
            let fHt: number;
            let fWt: number;
            let Htinm: number = Convert.ToDouble(CommonBB.sHValue);
            let Wtinkg: number = Convert.ToDouble(CommonBB.sWValue);
            let dBSA: number;
            let nBSA: number;
            switch (sDefaultBSA) {
              case 'CC_MOSTELLER': {
                fHt = Htinm * 100;
                fWt = Wtinkg;
                dBSA = fHt * fWt;
                dBSA = dBSA / 3600;
                dBSA = iMath.Sqrt(dBSA);
                break;
              }
              case 'CC_DUBOIS': {
                fHt = Htinm * 100;
                fWt = Wtinkg;
                fHt = 0.007184 * iMath.Pow(fHt, 0.725);
                fWt = iMath.Pow(fWt, 0.425);
                dBSA = fHt * fWt;
                break;
              }
              case 'CC_HAYCOCK': {
                fHt = Htinm * 100;
                fWt = Wtinkg;
                fHt = 0.024265 * iMath.Pow(fHt, 0.3964);
                fWt = iMath.Pow(fWt, 0.5378);
                dBSA = fHt * fWt;
                break;
              }
              case 'CC_GEHANGRG':
              case 'CC_GEHAN': {
                fHt = Htinm * 100;
                fWt = Wtinkg;
                fHt = 0.0235 * iMath.Pow(fHt, 0.42246);
                fWt = iMath.Pow(fWt, 0.51456);
                dBSA = fHt * fWt;
                break;
              }
              case 'CC_BOYD': {
                fHt = Htinm * 100;
                fWt = Wtinkg * 1000;
                fHt = 0.0003207 * iMath.Pow(fHt, 0.3);
                fWt = iMath.Pow(fWt, 0.7285 - 0.0188 * iMath.Log10(fWt));
                dBSA = fHt * fWt;
                break;
              }
              case 'CC_BOYDWGT': {
                let dCalBodyWeight: number = 0;
                fWt = Wtinkg * 1000;
                dCalBodyWeight = 0.8168 - 0.0154 * iMath.Log10(fWt);
                fWt = 4.688 * iMath.Pow(fWt, dCalBodyWeight);
                dBSA = fWt / 10000;
                break;
              }
              default: {
                fHt = Htinm * 100;
                fWt = Wtinkg * 1000;
                fHt = 0.0003207 * iMath.Pow(fHt, 0.3);
                fWt = iMath.Pow(fWt, 0.7285 - 0.0188 * iMath.Log10(fWt));
                dBSA = fHt * fWt;
                break;
              }
            }
            nBSA = iMath.Round(dBSA, 2);
            PatientContext.BSA = nBSA.ToString() + '';
          } else if (
            !String.IsNullOrEmpty(CommonBB.sWValue) &&
            !String.IsNullOrEmpty(sDefaultBSA)
          ) {
            let fWt: number;
            let Wtinkg: number = Convert.ToDouble(CommonBB.sWValue);
            let dBSA: number;
            let nBSA: number;
            if (String.Equals(sDefaultBSA, 'CC_BOYDWGT')) {
              let dCalBodyWeight: number = 0;
              fWt = Wtinkg * 1000;
              dCalBodyWeight = 0.8168 - 0.0154 * iMath.Log10(fWt);
              fWt = 4.688 * iMath.Pow(fWt, dCalBodyWeight);
              dBSA = fWt / 10000;
              nBSA = iMath.Round(dBSA, 2);
              PatientContext.BSA = nBSA.ToString() + '';
            }
          }
        }
      }
    }
    if (CommonBB.PatientBSADataCompletedEvent_chart != null)
       CommonBB.PatientBSADataCompletedEvent_chart(sFormula, PatientContext.BSA);
  }
  public static GetDateRangeForSelectedPeriod(
    PeriodCode: string,
    out1: (FromDate: DateTime) => void,
    out2: (ToDate: DateTime) => void
  ): void {
    let FromDate = DateTime.MinValue;
    let ToDate = DateTime.MinValue;
    let CurrentDate: DateTime = CommonBB.GetServerDateTime();
    ToDate = CurrentDate;
    switch (PeriodCode) {
      case 'CC_THISWEEK':
        let nDay: number = DayOfWeek.Monday - CurrentDate.DayOfWeek;
        FromDate = CurrentDate.AddDays(nDay);
        break;
      case 'CC_FROMLSTWEEK':
        FromDate = CurrentDate.AddDays(-(<number>CurrentDate.DayOfWeek) - 6);
        break;
      case 'CC_FROMLST2WEEKS':
        FromDate = CurrentDate.AddDays(-(<number>CurrentDate.DayOfWeek) - 13);
        break;
      case 'CC_FROMLSTMTH':
        let LastMonthLastDate: DateTime = CurrentDate.AddDays(
          0 - CurrentDate.Day
        );
        FromDate = LastMonthLastDate.AddDays(1 - LastMonthLastDate.Day);
        break;
      case 'CC_CUSTOM':
        FromDate = CurrentDate;
        break;
    }
    out1(FromDate);
    out2(ToDate);
  }
  public static ConvertHeightIntoCM(
    PatientHeightUOM: string,
    PatientHeight: number
  ): number {
    let PatHeightInCM: number = 0;
    if (!String.IsNullOrEmpty(PatientHeightUOM)) {
      if (String.Equals(PatientHeightUOM, CConstants.HeightCM)) {
        PatHeightInCM = PatientHeight;
      } else if (
        !String.IsNullOrEmpty(PatientHeightUOM) &&
        String.Equals(PatientHeightUOM, CConstants.HeightFeet)
      ) {
        PatHeightInCM = PatientHeight / CConstants.ConvertToCM;
      } else if (
        !String.IsNullOrEmpty(PatientHeightUOM) &&
        String.Equals(PatientHeightUOM, CConstants.HeightMetre)
      ) {
        PatHeightInCM = PatientHeight / CConstants.ConvertFromMetreToCM;
      }
    }
    return PatHeightInCM;
  }
  public static ConvertHeightIntoMeters(
    PatientHeightUOM: string,
    PatientHeight: number
  ): number {
    let PatHeightInM: number = 0;
    if (!String.IsNullOrEmpty(PatientHeightUOM)) {
      if (String.Equals(PatientHeightUOM, CConstants.HeightMetre)) {
        PatHeightInM = PatientHeight;
      } else if (String.Equals(PatientHeightUOM, CConstants.HeightFeet)) {
        PatHeightInM = PatientHeight * CConstants.ConvertToCM;
      } else if (String.Equals(PatientHeightUOM, CConstants.HeightCM)) {
        PatHeightInM = PatientHeight * CConstants.ConvertFromMetreToCM;
      }
    }
    return +PatHeightInM.toFixed(3);
  }
  public static ConvertWeightIntoKg(
    PatientWeightUOM: string,
    PatientWeight: number
  ): number {
    let PatWeightInKg: number = 0;
    if (!String.IsNullOrEmpty(PatientWeightUOM)) {
      if (String.Equals(PatientWeightUOM, CConstants.WeightKg)) {
        PatWeightInKg = PatientWeight;
      } else if (String.Equals(PatientWeightUOM, CConstants.WeightGram)) {
        PatWeightInKg = PatientWeight / 1000;
      } else if (String.Equals(PatientWeightUOM, CConstants.WeightPound)) {
        PatWeightInKg = PatientWeight / 2.2046;
      }
    }
    return PatWeightInKg;
  }
  public static ConvertWeightIntoGram(
    PatientWeightUOM: string,
    PatientWeight: number
  ): number {
    let PatWeightInGram: number = 0;
    if (!String.IsNullOrEmpty(PatientWeightUOM)) {
      if (String.Equals(PatientWeightUOM, CConstants.WeightKg)) {
        PatWeightInGram = PatientWeight / 0.001;
      } else if (String.Equals(PatientWeightUOM, CConstants.WeightGram)) {
        PatWeightInGram = PatientWeight;
      } else if (String.Equals(PatientWeightUOM, CConstants.WeightPound)) {
        PatWeightInGram = PatientWeight / 0.0022046;
      }
    }
    return PatWeightInGram;
  }
  public static ConvertHeightAndWeight(
    PatientHeight: string,
    PatientWeight: string
  ): void {
    if (PatientHeight != null && PatientHeight.length > 0) {
      let sHValues: string[] = PatientHeight.Split(' ');
      let PH: string = sHValues[0];
      let PatHeight: number;

      Number.TryParse(PH, (o) => {
        PatHeight = o;
      });
      if (sHValues != null && sHValues.length > 0) {
        if (sHValues.length >= 2) {
          let sPHUOM: string = sHValues[1];
          if (
            !String.IsNullOrEmpty(sPHUOM) &&
            String.Compare(
              sPHUOM,
              'CM',
              StringComparison.CurrentCultureIgnoreCase
            ) == 0 &&
            PatHeight > 0
          ) {
            let CalcPatHT: number = PatHeight / 100;
            if (CalcPatHT > 0) {
              CommonBB.sHValue = CalcPatHT.ToString();
            }
          } else {
            CommonBB.sHValue = PatientHeight.Split(' ')[0];
          }
        } else {
          CommonBB.sHValue = PatientHeight.Split(' ')[0];
        }
      }
    }
    if (PatientWeight != null && PatientWeight.length > 0) {
      let sWValues: string[] = PatientWeight.Split(' ');
      let PW: string = sWValues[0];
      let PatWeight: number;

      Number.TryParse(PW, (o) => {
        PatWeight = o;
      });
      if (sWValues != null && sWValues.length > 0) {
        if (sWValues.length >= 2) {
          let sPWUOM: string = sWValues[1];
          if (
            !String.IsNullOrEmpty(sPWUOM) &&
            String.Compare(
              sPWUOM,
              'g',
              StringComparison.CurrentCultureIgnoreCase
            ) == 0 &&
            PatWeight > 0
          ) {
            let CalcPatWT: number = PatWeight / 1000;
            if (CalcPatWT > 0) {
              CommonBB.sWValue = CalcPatWT.ToString();
            }
          } else {
            CommonBB.sWValue = PatientWeight.Split(' ')[0];
          }
        } else {
          CommonBB.sWValue = PatientWeight.Split(' ')[0];
        }
      }
    }
  }
  public static CalculatePatientBSA(
    PatientHeight: number,
    PatientHeightUOM: string,
    PatientWeight: number,
    PatientWeightUOM: string,
    BSAFormula: string
  ): void {
    let PatHeightInCM: number = 0;
    let PatWeightInKg: number = 0;
    let PatWeightInGram: number = 0;
    let CalculatedBSA: number = 0;
    if (PatientHeight > 0) {
      PatHeightInCM = CommonBB.ConvertHeightIntoCM(
        PatientHeightUOM,
        PatientHeight
      );
    }
    if (PatientWeight > 0) {
      PatWeightInKg = CommonBB.ConvertWeightIntoKg(
        PatientWeightUOM,
        PatientWeight
      );
      PatWeightInGram = CommonBB.ConvertWeightIntoGram(
        PatientWeightUOM,
        PatientWeight
      );
    }
    if (!String.IsNullOrEmpty(BSAFormula)) {
      switch (BSAFormula) {
        case 'CC_MOSTELLER': {
          CalculatedBSA = (PatHeightInCM * PatWeightInKg) / 3600;
          CalculatedBSA = iMath.Sqrt(CalculatedBSA);
          break;
        }
        case 'CC_DUBOIS': {
          PatHeightInCM = 0.007184 * iMath.Pow(PatHeightInCM, 0.725);
          PatWeightInKg = iMath.Pow(PatWeightInKg, 0.425);
          CalculatedBSA = PatHeightInCM * PatWeightInKg;
          break;
        }
        case 'CC_HAYCOCK': {
          PatHeightInCM = 0.024265 * iMath.Pow(PatHeightInCM, 0.3964);
          PatWeightInKg = iMath.Pow(PatWeightInKg, 0.5378);
          CalculatedBSA = PatHeightInCM * PatWeightInKg;
          break;
        }
        case 'CC_GEHAN':
        case 'CC_GEHANGRG': {
          PatHeightInCM = 0.0235 * iMath.Pow(PatHeightInCM, 0.42246);
          PatWeightInKg = iMath.Pow(PatWeightInKg, 0.51456);
          CalculatedBSA = PatHeightInCM * PatWeightInKg;
          break;
        }
        case 'CC_BOYD': {
          PatHeightInCM = 0.0003207 * iMath.Pow(PatHeightInCM, 0.3);
          PatWeightInGram = iMath.Pow(
            PatWeightInGram,
            0.7285 - 0.0188 * iMath.Log10(PatWeightInGram)
          );
          CalculatedBSA = PatHeightInCM * PatWeightInGram;
          break;
        }
        case 'CC_BOYDWGT': {
          let dCalBodyWeight: number = 0;
          dCalBodyWeight = 0.8168 - 0.0154 * iMath.Log10(PatWeightInGram);
          PatWeightInGram = 4.688 * iMath.Pow(PatWeightInGram, dCalBodyWeight);
          PatWeightInGram = PatWeightInGram / 10000;
          CalculatedBSA = iMath.Round(PatWeightInGram, 2);
          break;
        }
      }
      PatientContext.CalculatedBSA = iMath.Round(CalculatedBSA, 2);
    }
  }
  public static FindParent<T>(
    child: UserControl , ParentType?:string
  ): any {
    if(ParentType == undefined) return undefined;
    let parentObject: any = child.ParentRef;    
    if (parentObject.constructor.name == ParentType) return parentObject;
    else return CommonBB.FindParent<T>(parentObject,ParentType);
  }
}
export class CommonVariables {
  public static FormViewerIsInProgress: boolean;
}

export enum LzoWizardAction {
  Finish,

  FinishNow,

  Cancel,
}
