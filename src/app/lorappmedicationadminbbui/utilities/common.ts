import { Component, OnInit } from '@angular/core';
import { StringBuilder,ProfileFactoryType,ContextManager,Convert,AppActivity, Regex, ProcessRTE, ScriptObject, SLQueryCollection} from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp,Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison,AppDialogEventargs, AppDialogResult, DelegateArgs, DialogComponentArgs, WindowButtonType, Visibility, CContextInformation, ObservableCollection, ChildWizardCloseEventargs, HtmlPage, List, CListItem, RTEEventargs, TimeZoneInfo, iAppDialogWindow} from 'epma-platform/models';
import { AppDialog, Colors, SolidColorBrush, iLabel } from 'epma-platform/controls';
import { HelperService} from 'epma-platform/soapclient';
import 'epma-platform/stringextension';
import DateTime, { DateTimeKind } from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
import { LockedUsersDetails, MedicationCommonBB } from 'src/app/lorappmedicationcommonbb/utilities/medicationcommonbb';
import { ChartContext, MedChartData, MedChartDefaultData, TagDrugHeaderDetail, TagSlotDetail, ValueDomainValues } from './globalvariable';
import { CConstants, ChartType, InfusionTypesCode, MedImage, MedImages, PrescriptionTypes, PrescriptionTypesMenuCode, SlotStatus, ValueDomain } from './CConstants';
import { Resource } from '../resource';
import { Environment } from 'src/app/product/shared/models/Common';
import * as MedicationConstants from 'src/app/lorappmedicationcommonbb/utilities/constants';
import {
    CConstants as CommConstants
  } from 'src/app/lorappmedicationcommonbb/utilities/constants';
import { DrugItem } from 'src/app/lorarcbluebirdmedicationchart/common/DrugItem';
import { CDrugHdrAddnlInfo, CDrugHeader, DrugHeader, DrugHeaderItem } from '../common/drugheader';
import { StackPanel } from 'src/app/shared/epma-platform/controls-model/StackPanel';
import { MedsAdminChartToolTip } from '../resource/medsadmincharttooltip.designer';
import { AppContextInfo, ContextInfo, PatientContext } from 'src/app/lorappcommonbb/utilities/globalvariable';
import { PGDListVM } from '../viewmodel/pgdvm';
import * as ManagePrescSer from '../../shared/epma-platform/soap-client/ManagePrescriptionWS';
import { BasicDetailsLineItemVM, FormViewerLineItemVM, InfusionLineItemVM, PrescriptionLineItemVM } from 'src/app/lorappmedicationcommonbb/utilities/lineitemconstructor';
import { Dictionary } from 'epma-platform/dictionary';
import { PrescriptionItemViewVM } from '../viewmodel/PrescriptionItemViewVM';
import { MedRequestVM } from '../viewmodel/MedicationRequestVM';
import { ProfileData, UserPermissions } from './ProfileData';
import { PrescriptionHelper } from './PrescriptionHelper';
import { CReqMsgGetDataItem, CResMsgGetDataItem, GetDataItemCompletedEventArgs, IPPMAPrescribableDefnWSSoapClient } from 'src/app/shared/epma-platform/soap-client/IPPMAPrescribableDefnWS';
import * as IPPMAManagePrescSer from '../../shared/epma-platform/soap-client/IPPMAManagePrescriptionWS';
import { CMedStatusInClinicalIndicatorParams, CReqMsgUpdateDueOverStatusForClinicalIndicator, IPPMAManagePrescriptionWSSoapClient, IPPPrescriptionItem, UpdateDueOverStatusForClinicalIndicatorCompletedEventArgs } from '../../shared/epma-platform/soap-client/IPPMAManagePrescriptionWS';
import { CommonBB } from 'src/app/lorappcommonbb/utilities/common';
import { AddPrescribingConfigData, CChartDisplayConfig, CChartSettingsConfig, CClinicalIncidentConfig, CMedicationLineDisplayData, CSlotCharacteristicsConfig, InfusionPresConfigData, MedicationViewConfigData, PrescribingConfigData } from 'src/app/lorappslprofiletypes/medication';
import { InfActionsConceptCodeData, InfusionTypeConceptCodeData, MedDoseTypeConceptCodeData, MedicationCommonConceptCodeData, MedicationCommonProfileData, RequestUrgency, TitratedDoseInstructions } from 'src/app/lorappmedicationcommonbb/utilities/profiledata';
import { CommonDomainValues } from 'src/app/lorappmedicationcommonbb/utilities/globalvariable';
import { CValuesetTerm } from 'src/app/shared/epma-platform/soap-client/CReferenceWS';
import { App, Style } from 'src/app/shared/epma-platform/controls/ResourceStyle';
import { ChartIcon } from 'src/app/lorarcbluebirdmedicationchart/common/ChartIcon';
import { InfusionTagObject } from 'src/app/lorarcbluebirdmedicationchart/common/InfusionTagObject';
import { IChartSlot } from 'src/app/lorarcbluebirdmedicationchart/common/IChartSlot';
import { DoseOverviewSlot } from 'src/app/lorarcbluebirdmedicationchart/common/DoseOverViewSlot';
import { AdministratedSlot } from 'src/app/lorarcbluebirdmedicationchart/common/AdministratedSlot';
import { DefaultSlot } from 'src/app/lorarcbluebirdmedicationchart/common/DefaultSlot';
import { TodayMultiSlot } from 'src/app/lorarcbluebirdmedicationchart/common/TodayMultiSlot';
import { TodayAsRequiredSlot } from 'src/app/lorarcbluebirdmedicationchart/common/TodayAsRequiredSlot';
import { CReqMsgGetMedChartInfoByPatOrEnc, CResMsgGetMedChartInfoByPatOrEnc, DrugDetail, DrugProperty, GetMedChartInfoByPatOrEncCompletedEventArgs, MedicationAdministrationWSSoapClient, SelfAdminDrug } from 'src/app/shared/epma-platform/soap-client/MedicationAdministrationWS';
import { AppLoadService }from "epma-platform/services";
import { MedicationAdminVM } from '../ca/medicationadmin/medicationadminvm';
import { PrescriptionChartVM } from '../ca/prescriptionchart/prescriptionchartvm';
import { INFRecordAdminParams } from './InfusionChartHelper';
import { ObservationChartVM } from '../ca/observationchart/ObservationChartVM';
import { SLSFSItem } from 'src/app/shared/epma-platform/models/model';
import { iSFS } from 'src/app/shared/epma-platform/controls/epma-isfs/epma-isfs.component';
import { IsolatedStorageSettings } from 'src/app/shared/epma-platform/index.dictionary';

import {iMath as Math} from 'epma-platform/mathextension'
import { GetMedsChartData } from '../common/getmedschartdata';


    export class Common {
        public static Asterisk: string = "*";
        public static nLockDuration: number = MedicationConstants.CConstants.LockDuration;
        public static ValidateURL(url: string): boolean {
            url = url.Trim().ToLowerInvariant();
            if (url == "http://") {
                return false;
            }
            let RgxUrl: RegExp = new RegExp("^(ht|f)tp(s?)\:\/\/[0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*(:(0-9)*)*(\/?)([a-zA-Z0-9\-\.\?\,\'\/\\\+&amp;%\$#_]*)?$");
            return RgxUrl.test(url);
        }
        public static LaunchStrikeThroughWindow(PageContent: Object, OnbtnClick: Function, Height: number, Width: number, InfusionRecordDttm: string, DrugName: string,Callback?:any): void {
            let dialogWindowHeight = (Height/window.devicePixelRatio);
            // ObjectHelper.stopFinishAndCancelEvent(true);
            AppActivity.OpenWindow("Strikethrough administration",
                PageContent,
                OnbtnClick,
                "Strikethrough administration",
                true,
                dialogWindowHeight,
                Width,
                true, WindowButtonType.OkCancel, null,null,null,Callback);
            return
        }
        public static CheckIfLockingDurationElapsed(Msg_Close: Function = null): boolean {
            let bDurationElapsed: boolean = false;
            let _lockedUserDetails: LockedUsersDetails;
            if (DateTime.GreaterThan(DateTime.Now , ChartContext.ChartLaunchDTTM.AddMinutes(Common.nLockDuration)) && !MedicationCommonBB.IsLockStillValid(MedChartData.MedChartOID, CConstants.MedChart, (o) => { _lockedUserDetails = o; })) {
                let iMsgBox: iMessageBox = ObjectHelper.CreateObject(new iMessageBox(), {
                    Title: "LORENZO",
                    Height: 160,
                    MessageButton: MessageBoxButton.OK,
                    IconType: MessageBoxType.Information
                });
                if (!String.IsNullOrEmpty(_lockedUserDetails.LockedUserName)) {
                    iMsgBox.Message = String.Format(Resource.MedsAdminPrescChartView.LockMsg_Commenced, _lockedUserDetails.LockedUserName);
                }
                else {
                    iMsgBox.Message = String.Format(Resource.MedsAdminPrescChartView.LockMsg_Abort);
                }
                if (Msg_Close != null) {
                    iMsgBox.MessageBoxClose = (s,e) => { Msg_Close(s,e) };
                }
                iMsgBox.Show();
                bDurationElapsed = true;
            }
            return bDurationElapsed;
        }
        public static CADataContext: MedicationAdminVM;
        public static IsCanLaunchIPFromClerkPrompt: boolean;
        public static Frc001Childs: string = null;
        public static Frc002Childs: string = null;
        public static Frc003Childs: string = null;
        public static Frq88Childs: string = null;
        public static GPCConsentVerifyStatus: string = String.Empty;
        // public static CheckOpenSectionExists(bIsOpenSecExists: boolean, sLockingMessage: string): void {
        //     sLockingMessage = String.Empty;
        //     bIsOpenSecExists = false;
        //     let objIsOpenSecExists: ScriptObject = ObjectHelper.CreateType<ScriptObject>(HtmlPage.Window.Invoke("IsOpenSecExist", null, null, 5), ScriptObject);
        //     if (objIsOpenSecExists != null && objIsOpenSecExists.GetProperty("IsOpenSecExists") != null && !String.IsNullOrEmpty(objIsOpenSecExists.GetProperty("IsOpenSecExists").ToString())) {
        //         bIsOpenSecExists = Convert.ToBoolean(objIsOpenSecExists.GetProperty("IsOpenSecExists").ToString());
        //         if (bIsOpenSecExists) {
        //             sLockingMessage = String.Format(Resource.MedsAdminChartToolTip.IsOpenSectionToolTip, bIsOpenSecExists);
        //         }
        //     }
        // }
        public static CheckOpenSectionExists(out1: (bIsOpenSecExists: boolean) => void, out2: (sLockingMessage: string) => void): void {
            let bIsOpenSecExists: boolean;
            let sLockingMessage: string;
            sLockingMessage = String.Empty;
            bIsOpenSecExists = false;
            let objIsOpenSecExists: ScriptObject = ObjectHelper.CreateType<ScriptObject>(HtmlPage.Window.Invoke("IsOpenSecExist", null, null, 5), ScriptObject);
            if (objIsOpenSecExists != null && objIsOpenSecExists.GetProperty("IsOpenSecExists") != null && !String.IsNullOrEmpty(objIsOpenSecExists.GetProperty("IsOpenSecExists").ToString())) {
                bIsOpenSecExists = Convert.ToBoolean(objIsOpenSecExists.GetProperty("IsOpenSecExists").ToString());
                if (bIsOpenSecExists) {
                    sLockingMessage = String.Format(Resource.MedsAdminChartToolTip.IsOpenSectionToolTip, bIsOpenSecExists);
                }
            }
            out1(bIsOpenSecExists);
            out2(sLockingMessage);
        }
        private static lnPrescriptionOID: number ;
        private static lnIdentifyingOID: number ;
        private static sIdentifyingType: string ;
        private static sMCVersion: string ;
        private static sDrugName: string ;
        private static sMCitemName: string ;
        private static sItemSubtype: string ;
        private static sLorenzoID: string ;
        public static objObsResultVM: ObservationChartVM;
        public static GBLoMedicationAdminVM: MedicationAdminVM;
        public static GBLoPrescriptionChartVM: PrescriptionChartVM;
        private static bIsShowMessage: boolean;
        public static GetReviewIconTooltip(ReviewType: string, ReviewDTTM: DateTime, ReviewRequestedComments: string, ReviewedRequestedby: string): string {
            let Reviewtooltip: string = String.Empty;
            if (String.Equals(ReviewType, CConstants.GeneralisedReview)) {
                Reviewtooltip = Resource.MedsAdminPrescChartView.ReviewGeneralIcon_Tooltip + ReviewDTTM.ToString(CConstants.DateTimeFormat) + Environment.NewLine;
            }
            else {
                Reviewtooltip = Resource.MedsAdminPrescChartView.ReviewOmittedIcon_Tooltip + ReviewDTTM.ToString(CConstants.DateTimeFormat) + Environment.NewLine;
            }
            if (!String.IsNullOrEmpty(ReviewRequestedComments)) {
                Reviewtooltip += ReviewRequestedComments + Environment.NewLine;
            }
            if (!String.IsNullOrEmpty(ReviewedRequestedby)) {
                Reviewtooltip += CConstants.ReviewReqby + ": " + ReviewedRequestedby;
            }
            return Reviewtooltip;
        }
        public static SetDrugHeaderContent(oDrugItem: DrugItem, oHdrAddnlInfo: CDrugHdrAddnlInfo, oDrugHdr: DrugHeader): CDrugHeader {
            let oDrugHeader: CDrugHeader = new CDrugHeader();
            oDrugHeader.oDrugHdrBasicInfo = new DrugHeaderItem();
            if (oDrugHdr != null && oDrugHdr.oDrugHeader != null && oDrugHdr.oDrugHeader.oDrugHdrBasicInfo != null) {
                oDrugHeader.oDrugHdrBasicInfo.bShowAsrequired = oDrugHdr.oDrugHeader.oDrugHdrBasicInfo.bShowAsrequired;
                oDrugHeader.oDrugHdrBasicInfo.bShowFrequency = oDrugHdr.oDrugHeader.oDrugHdrBasicInfo.bShowFrequency;
                oDrugHeader.oDrugHdrBasicInfo.bShowSite = oDrugHdr.oDrugHeader.oDrugHdrBasicInfo.bShowSite;
            }
            if (oDrugItem != null) {
                if (oHdrAddnlInfo != null)
                {
                    oDrugHeader.oDrugHdrAddnlInfo = new CDrugHdrAddnlInfo();
                    oDrugHeader.oDrugHdrAddnlInfo = oHdrAddnlInfo;
                }
                oDrugHdr.oDrugHeader.oDrugHdrBasicInfo = oDrugHeader.oDrugHdrBasicInfo = oDrugHeader.ConvertDrugItemToDrugHeaderItem(oDrugItem, oDrugHeader, oDrugHdr);
                if (!String.IsNullOrEmpty(oDrugHeader.oDrugHdrBasicInfo.AdministrationInst)) {
                    // oDrugHdr.lblInstructions.Visibility = Visibility.Visible;
                    oDrugHeader.oDrugHdrBasicInfo.AdministrationInstlblVisibility = Visibility.Visible;
                }
                else
                {
                    oDrugHeader.oDrugHdrBasicInfo.AdministrationInstlblVisibility = Visibility.Collapsed;
                    
                }
            }
            if (oHdrAddnlInfo != null) {
                oDrugHeader.IsVisible = Visibility.Collapsed;
                oDrugHeader.oDrugHdrAddnlInfo = oHdrAddnlInfo;
                if (oDrugHeader.oDrugHdrAddnlInfo != null) {
                    if (!String.IsNullOrEmpty(oDrugHeader.oDrugHdrAddnlInfo.RecordedAt)) {
                        // oDrugHdr.lblRec1At.Visibility = oDrugHdr.lblRec1AtValue.Visibility = Visibility.Visible;
                        oDrugHeader.oDrugHdrAddnlInfo.RecordedAtlblVisibility =  Visibility.Visible;
                        if (!oDrugItem.IsInfusion) {
                            oDrugHdr.lblRec1At.style = ObjectHelper.CreateType<Style>(App.Current.Resources["DrugDueRecordAt"], Style);
                            oDrugHdr.lblRec1AtValue.style = ObjectHelper.CreateType<Style>(App.Current.Resources["DrugDueRecordAt"], Style);
                        }
                    }
                    else if (!String.IsNullOrEmpty(oDrugHeader.oDrugHdrAddnlInfo.DueAt)) {
                        // oDrugHdr.lblDueAt.Visibility = oDrugHdr.lblDueAtValue.Visibility = Visibility.Visible;
                        oDrugHeader.oDrugHdrAddnlInfo.DueAtlblVisibility = Visibility.Visible;
                        if (!oDrugItem.IsInfusion) {
                            oDrugHdr.lblDueAt.style = ObjectHelper.CreateType<Style>(App.Current.Resources["DrugDueRecordAt"], Style);
                            oDrugHdr.lblDueAtValue.style = ObjectHelper.CreateType<Style>(App.Current.Resources["DrugDueRecordAt"], Style);
                        }
                    }
                    if (!String.IsNullOrEmpty(oDrugHeader.oDrugHdrAddnlInfo.ReviewAt)) {
                        // oDrugHdr.lblReviewAt.Visibility = oDrugHdr.lblReviewAtValue.Visibility = Visibility.Visible;
                        oDrugHeader.oDrugHdrAddnlInfo.ReviewAtlblVisibility= Visibility.Visible;
                        if (!oDrugItem.IsInfusion) {
                            oDrugHdr.lblReviewAt.style = ObjectHelper.CreateType<Style>(App.Current.Resources["DrugDueRecordAt"], Style);
                            oDrugHdr.lblReviewAtValue.style = ObjectHelper.CreateType<Style>(App.Current.Resources["DrugDueRecordAt"], Style);
                        }
                    }
                }
            }
            else {
                if (!String.IsNullOrEmpty(oDrugHeader.oDrugHdrBasicInfo.AdministrationInst)) {
                    oDrugHeader.IsVisible = Visibility.Visible;
                }
                else {
                    oDrugHeader.IsVisible = Visibility.Collapsed;
                }
            }
            return oDrugHeader;
        }
        public static GetWrappedToolTipContent(sToolTip: string, sAdminCommentsToolTip: string): StackPanel {
            let oStackPanel: StackPanel = new StackPanel();
            oStackPanel.Children.Add(ObjectHelper.CreateObject(new iLabel(), { Text: sToolTip, IsWordwrap: true, Width: 250 }));
            oStackPanel.Children.Add(ObjectHelper.CreateObject(new iLabel(), { Text: MedsAdminChartToolTip.CommentsToolTip + ": " + sAdminCommentsToolTip, IsWordwrap: true, Width: 250 }));
            return oStackPanel;
        }
        public static GetAdminCommentsIcon(sAdminComments: string): ChartIcon {
            let oChartIcon: ChartIcon = new ChartIcon();
            oChartIcon.EnableOnHotSpotClick = false;
            oChartIcon.Key = "AdminCommentsIcon";
            oChartIcon.UriString = MedImage.GetPath(MedImages.AdminCommentsIcon);
            oChartIcon.Tooltip = ObjectHelper.CreateObject(new iLabel(), { Text: sAdminComments, IsWordwrap: true, Width: 250 });
            return oChartIcon;
        }
        public static AdminDiffValue(dtSchDate: DateTime, dtAdminDate: DateTime, sAdminOnTimeMode: string): string {
            let sAdminOnTimeDiffValue: string = "";
            let span: TimeSpan = TimeSpan.MinValue;
            switch (sAdminOnTimeMode) {
                case 'E':
                    span = dtSchDate.ToUniversalTime().Subtract(dtAdminDate.ToUniversalTime());
                    break;
                case 'L':
                    span = dtAdminDate.ToUniversalTime().Subtract(dtSchDate.ToUniversalTime());
                    break;
            }
            if (span != TimeSpan.MinValue) {
                if (span.Days != 0) {
                    let TimeSplit: string = ((span.Days*24) + span.Hours).ToString();
                    let strArr: string[] = TimeSplit.Split('.');
                    sAdminOnTimeDiffValue = String.Format("{0}:{1} hr(s)", strArr[0], span.Minutes.ToString("00"));
                    return sAdminOnTimeDiffValue;
                }
                if (span.Hours == 0) {
                    if (span.Minutes < 10)
                        sAdminOnTimeDiffValue = "0" + Math.Abs(span.Minutes) + " min(s)";
                    else sAdminOnTimeDiffValue = Math.Abs(span.Minutes) + " min(s)";
                }
                else if (span.Hours < 10) {
                    sAdminOnTimeDiffValue = "0" + Math.Abs(span.Hours);
                }
                else if (span.Hours > 9) {
                    sAdminOnTimeDiffValue = Math.Abs(span.Hours).ToString();
                }
                if (span.Hours > 0 && span.Minutes < 10) {
                    sAdminOnTimeDiffValue += ":0" + Math.Abs(span.Minutes) + " hr(s)";
                }
                else if (span.Hours > 0 && span.Minutes > 9) {
                    sAdminOnTimeDiffValue += ":" + Math.Abs(span.Minutes) + " hr(s)";
                }
            }
            return sAdminOnTimeDiffValue;
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
        // public static SetAdminTimeMode(IsPRN: boolean, SlotsTimeIntervalAvg: number, SlotTime: DateTime, AdminTime: DateTime, cAdministeredTimeMode: string): string {
        //     cAdministeredTimeMode = 'N';
        //     if (!IsPRN) {
        //         if (SlotTime > DateTime.MinValue && AdminTime > DateTime.MinValue) {
        //             AdminTime = AdminTime.AddTicks(-(AdminTime.Ticks % TimeSpan.TicksPerMinute));
        //             let nDiffMins: number = Convert.ToInt32(AdminTime.ToUniversalTime().Subtract(SlotTime.ToUniversalTime()).TotalMinutes);
        //             let DuenessWindowTimeMinutes: number = MedChartData.DuenessThreshold;
        //             let AvgSlotTimeP: DateTime= SlotTime.AddMinutes(SlotsTimeIntervalAvg);
        //             let AvgSlotTimeM: DateTime= SlotTime.AddMinutes(-SlotsTimeIntervalAvg);
        //             if (AdminTime.ToUniversalTime() > AvgSlotTimeP.ToUniversalTime() && nDiffMins > DuenessWindowTimeMinutes)
        //                 cAdministeredTimeMode = 'L';
        //             else if (AdminTime.ToUniversalTime() < AvgSlotTimeM.ToUniversalTime() && nDiffMins < -DuenessWindowTimeMinutes)
        //                 cAdministeredTimeMode = 'E';
        //             else cAdministeredTimeMode = 'N';
        //         }
        //     }
        //     return cAdministeredTimeMode;
        // }
        public static SetAdminTimeMode(IsPRN: boolean, SlotsTimeIntervalAvg: number, SlotTime: DateTime, AdminTime: DateTime): string {
            let cAdministeredTimeMode: string;
            cAdministeredTimeMode = 'N';
            if (!IsPRN) {
                if (DateTime.GreaterThan(SlotTime , DateTime.MinValue) && DateTime.GreaterThan(AdminTime , DateTime.MinValue)) {
                    AdminTime = AdminTime.AddTicks(-(AdminTime.Ticks % TimeSpan.TicksPerMinute));
                    let nDiffMins: number = Convert.ToInt32(AdminTime.ToUniversalTime().Subtract(SlotTime.ToUniversalTime()).TotalMinutes);
                    let DuenessWindowTimeMinutes: number = MedChartData.DuenessThreshold;
                    let AvgSlotTimeP: DateTime = SlotTime.AddMinutes(SlotsTimeIntervalAvg);
                    let AvgSlotTimeM: DateTime = SlotTime.AddMinutes(-SlotsTimeIntervalAvg);
                    if (AdminTime.ToUniversalTime() > AvgSlotTimeP.ToUniversalTime() && nDiffMins > DuenessWindowTimeMinutes)
                        cAdministeredTimeMode = 'L';
                    else if (AdminTime.ToUniversalTime() < AvgSlotTimeM.ToUniversalTime() && nDiffMins < -DuenessWindowTimeMinutes)
                        cAdministeredTimeMode = 'E';
                    else cAdministeredTimeMode = 'N';
                }
            }
            return cAdministeredTimeMode;
        }
        public static GetPrescriptionLineItemVM(objPrescriptionItem: Object): PrescriptionLineItemVM {
            let objPrescriptionLineItemVM: PrescriptionLineItemVM = new PrescriptionLineItemVM();
            objPrescriptionLineItemVM.FormViewerDetails = new FormViewerLineItemVM();
            objPrescriptionLineItemVM.FormViewerDetails.BasicDetails = new BasicDetailsLineItemVM();
            objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.InfusionDetails = new InfusionLineItemVM();
            let oTechValSuplyInst: Dictionary<string, string> = null;
            if (objPrescriptionItem != null) {
                if (objPrescriptionItem instanceof PGDListVM) {
                    let objPrescriptionItemVM: PGDListVM = ObjectHelper.CreateType<PGDListVM>(objPrescriptionItem, PGDListVM);
                    objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.DosageForm = ObjectHelper.CreateObject(new CListItem(), { DisplayText: objPrescriptionItemVM.DosageForm, Value: objPrescriptionItemVM.DosageForm });
                    if(objPrescriptionItemVM && objPrescriptionItemVM.ObjAdminMethod && objPrescriptionItemVM.ObjAdminMethod.OID){
                        objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.AdminMethod = ObjectHelper.CreateObject(new CListItem(), { DisplayText: objPrescriptionItemVM.ObjAdminMethod.Name, Value: objPrescriptionItemVM.ObjAdminMethod.OID.ToString() });
                    }
                    if (objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.AdminMethod == null || objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.AdminMethod == undefined || (objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.AdminMethod != null && String.IsNullOrEmpty(objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.AdminMethod.DisplayText))) {
                        objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.Dose = objPrescriptionItemVM.DoseValue;
                        objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.UpperDose = objPrescriptionItemVM.UpperDose;
                        if (objPrescriptionItemVM.DoseUOM.Name && objPrescriptionItemVM.DoseUOM.OID) {
                            objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.DoseUOM = ObjectHelper.CreateObject(new CListItem(), { DisplayText: objPrescriptionItemVM.DoseUOM.Name, Value: objPrescriptionItemVM.DoseUOM.OID.ToString() });
                        }
                    }
                    objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.DoseType = ObjectHelper.CreateObject(new CListItem(), { DisplayText: objPrescriptionItemVM.DoseTye, Value: objPrescriptionItemVM.DoseTye });
                    objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.AdditionalComments = objPrescriptionItemVM.Comments;
                    objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.DrugProperties = new ObservableCollection<ManagePrescSer.DrugProperty>();
                    objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.DrugProperties.Add(ObjectHelper.CreateObject(new ManagePrescSer.DrugProperty(), {
                        DrugName: objPrescriptionItemVM.PrescribableItem,
                        IdentifyingOID: objPrescriptionItemVM.IdentifyingOID,
                        IdentifyingType: objPrescriptionItemVM.IdentifyingType
                    }));
                    objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.Frequency = ObjectHelper.CreateObject(new CListItem(), { DisplayText: objPrescriptionItemVM.Frequency, Value: objPrescriptionItemVM.FrequencyOID.ToString() });
                    objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.IdentifyingType = objPrescriptionItemVM.IdentifyingType;
                    objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.IdentifyingName = objPrescriptionItemVM.PrescribableItem;
                    objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.Route = ObjectHelper.CreateObject(new CListItem(), { DisplayText: objPrescriptionItemVM.Route, Value: objPrescriptionItemVM.RouteOID.ToString() });
                    objPrescriptionLineItemVM.PrescriptionItemOID = objPrescriptionItemVM.PDGListItemOID;
                    objPrescriptionLineItemVM.PrescriptionTypeInPatientContext = PatientContext.PrescriptionType;
                    objPrescriptionLineItemVM.IsParacetamolIngredient = objPrescriptionItemVM.IsParacetamolIngredient;
                    objPrescriptionLineItemVM.ParacetamolAdministeredCount = objPrescriptionItemVM.ParacetamolAdministeredCount;
                    objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.Itemsubtype = objPrescriptionItemVM.ItemSubType;
                    if (objPrescriptionItemVM.MultiComponentItems != null && objPrescriptionItemVM.MultiComponentItems.Count > 0) {
                        objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.MCIItemDisplay = String.Join("^", objPrescriptionItemVM.MultiComponentItems.ToArray());
                        objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.MCIItemDrugprop = String.Join("^", objPrescriptionItemVM.MultiComponentItems.ToArray());
                    }
                    objPrescriptionLineItemVM.IsPGD = '1';
                    objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.InfusionDetails = objPrescriptionItemVM.InfusionDetails;
                }
                else if (objPrescriptionItem instanceof SelfAdminDrug) {
                    let objPrescriptionItemVM: SelfAdminDrug = ObjectHelper.CreateType<SelfAdminDrug>(objPrescriptionItem, SelfAdminDrug);
                    if (objPrescriptionItemVM.oPrescriptionItemView != null) {
                        if (objPrescriptionItemVM.oPrescriptionItemView.oPresItemAdditionalProperties != null) {
                            objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.AdditionalComments = objPrescriptionItemVM.oPrescriptionItemView.oPresItemAdditionalProperties.AdditionalComments;
                            if (objPrescriptionItemVM.oPrescriptionItemView.oPresItemAdditionalProperties.AdminMethod != null && !String.IsNullOrEmpty(objPrescriptionItemVM.oPrescriptionItemView.oPresItemAdditionalProperties.AdminMethod.Code)) {
                                objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.AdminMethod = ObjectHelper.CreateObject(new CListItem(), {
                                    DisplayText: objPrescriptionItemVM.oPrescriptionItemView.oPresItemAdditionalProperties.AdminMethod.Code,
                                    Value: objPrescriptionItemVM.oPrescriptionItemView.oPresItemAdditionalProperties.AdminMethod.OID.ToString()
                                });
                            }
                            objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.BatchNumber = objPrescriptionItemVM.oPrescriptionItemView.oPresItemAdditionalProperties.BatchNumber;
                        }
                        if (objPrescriptionItemVM.oPrescriptionItemView.oPresItemBasicPropertiesView != null) {
                            if (objPrescriptionItemVM.oPrescriptionItemView.oPresItemBasicPropertiesView.AdminInstruction != null && !String.IsNullOrEmpty(objPrescriptionItemVM.oPrescriptionItemView.oPresItemBasicPropertiesView.AdminInstruction.Name)) {
                                objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.AdminInstruction = ObjectHelper.CreateObject(new CListItem(), {
                                    DisplayText: objPrescriptionItemVM.oPrescriptionItemView.oPresItemBasicPropertiesView.AdminInstruction.Name,
                                    Value: objPrescriptionItemVM.oPrescriptionItemView.oPresItemBasicPropertiesView.AdminInstruction.OID.ToString()
                                });
                            }
                            objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.Direction = objPrescriptionItemVM.oPrescriptionItemView.oPresItemBasicPropertiesView.Direction;
                            if (objPrescriptionItemVM.oPrescriptionItemView.oPresItemBasicPropertiesView.Form != null && !String.IsNullOrEmpty(objPrescriptionItemVM.oPrescriptionItemView.oPresItemBasicPropertiesView.Form.Name)) {
                                objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.DosageForm = ObjectHelper.CreateObject(new CListItem(), {
                                    DisplayText: objPrescriptionItemVM.oPrescriptionItemView.oPresItemBasicPropertiesView.Form.Name,
                                    Value: objPrescriptionItemVM.oPrescriptionItemView.oPresItemBasicPropertiesView.Form.OID.ToString()
                                });
                            }
                            objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.Dose = objPrescriptionItemVM.oPrescriptionItemView.oPresItemBasicPropertiesView.Dose;
                            if (!String.IsNullOrEmpty(objPrescriptionItemVM.oPrescriptionItemView.oPresItemBasicPropertiesView.DoseType)) {
                                objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.DoseType = ObjectHelper.CreateObject(new CListItem(), {
                                    DisplayText: objPrescriptionItemVM.oPrescriptionItemView.oPresItemBasicPropertiesView.DoseType,
                                    Value: objPrescriptionItemVM.oPrescriptionItemView.oPresItemBasicPropertiesView.DoseType
                                });
                            }
                            objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.MCILoerenzoID = objPrescriptionItemVM.LorenzoID;
                            if (String.Compare(objPrescriptionItemVM.ItemSubType, CConstants.ItemSubType) == 0) {
                                let nDrugPrepLength: number = 0;
                                if (objPrescriptionItemVM.MultiComponentItems != null && objPrescriptionItemVM.MultiComponentItems.Count > 0) {
                                    nDrugPrepLength = objPrescriptionItemVM.MultiComponentItems.Count;
                                    for (let i: number = 0; i < nDrugPrepLength; i++) {
                                        let sDrugProperty: string[];
                                        ;
                                        if (objPrescriptionItemVM.MultiComponentItems[i] != null) {
                                            sDrugProperty = objPrescriptionItemVM.MultiComponentItems[i].Split('~');
                                            if (sDrugProperty != null && sDrugProperty.length > 1 && !String.IsNullOrEmpty(sDrugProperty[0]) && !String.IsNullOrEmpty(sDrugProperty[1])) {
                                                if (objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.DrugProperties == null)
                                                    objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.DrugProperties = new ObservableCollection<ManagePrescSer.DrugProperty>();
                                                objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.DrugProperties.Add(ObjectHelper.CreateObject(new ManagePrescSer.DrugProperty(), {
                                                    DrugName: sDrugProperty[0],
                                                    DrugPropertyCode: sDrugProperty[1],
                                                    VMChildCode: "CC_OCCRALLCHILD"
                                                }));
                                            }
                                        }
                                    }
                                }
                            }
                            else {
                                if (objPrescriptionItemVM.oPrescriptionItemView.oPresItemBasicPropertiesView.DrugProperties != null && objPrescriptionItemVM.oPrescriptionItemView.oPresItemBasicPropertiesView.DrugProperties.Count > 0) {
                                    if (objPrescriptionItemVM.oPrescriptionItemView.oPresItemBasicPropertiesView.DrugProperties.Count == 1 && objPrescriptionItemVM.oPrescriptionItemView.oPresItemBasicPropertiesView.DrugProperties[0] != null && !String.IsNullOrEmpty(objPrescriptionItemVM.oPrescriptionItemView.oPresItemBasicPropertiesView.DrugProperties[0].DrugPropertyCode) && objPrescriptionItemVM.oPrescriptionItemView.oPresItemBasicPropertiesView.DrugProperties[0].DrugPropertyCode.Contains('~')) {
                                        let objDrugProperty: ObservableCollection<DrugProperty> = new ObservableCollection<DrugProperty>();
                                        let sDrugPropertyCode: string[] = null;
                                        let sDrugPropertyOccrCode: string[] = null;
                                        if (objPrescriptionItemVM.oPrescriptionItemView.oPresItemBasicPropertiesView.DrugProperties[0].DrugPropertyCode.Contains(',')) {
                                            sDrugPropertyCode = objPrescriptionItemVM.oPrescriptionItemView.oPresItemBasicPropertiesView.DrugProperties[0].DrugPropertyCode.Split(',');
                                            if (sDrugPropertyCode != null && sDrugPropertyCode.length > 0) {
                                                let nDrgLength: number = sDrugPropertyCode.length;
                                                for (let DPCnt: number = 0; DPCnt < nDrgLength; DPCnt++) {
                                                    if (sDrugPropertyCode[DPCnt].Contains('~')) {
                                                        sDrugPropertyOccrCode = sDrugPropertyCode[DPCnt].Split('~');
                                                        objDrugProperty.Add(ObjectHelper.CreateObject(new DrugProperty(), { DrugPropertyCode: sDrugPropertyOccrCode[0], VMChildCode: sDrugPropertyOccrCode[1], HighRiskMsg: objPrescriptionItemVM.oPrescriptionItemView.oPresItemBasicPropertiesView.DrugProperties[0].HighRiskMsg }));
                                                    }
                                                }
                                            }
                                        }
                                        else {
                                            if (objPrescriptionItemVM.oPrescriptionItemView.oPresItemBasicPropertiesView.DrugProperties[0].DrugPropertyCode.Contains('~')) {
                                                sDrugPropertyOccrCode = objPrescriptionItemVM.oPrescriptionItemView.oPresItemBasicPropertiesView.DrugProperties[0].DrugPropertyCode.Split('~');
                                                objDrugProperty.Add(ObjectHelper.CreateObject(new DrugProperty(), { DrugPropertyCode: sDrugPropertyOccrCode[0], VMChildCode: sDrugPropertyOccrCode[1], HighRiskMsg: objPrescriptionItemVM.oPrescriptionItemView.oPresItemBasicPropertiesView.DrugProperties[0].HighRiskMsg }));
                                            }
                                        }
                                        if (objDrugProperty != null && objDrugProperty.Count > 0) {
                                            objPrescriptionItemVM.oPrescriptionItemView.oPresItemBasicPropertiesView.DrugProperties = objDrugProperty;
                                        }
                                    }
                                    else if (objPrescriptionItemVM.oPrescriptionItemView.oPresItemBasicPropertiesView.DrugProperties.Count == 1 && objPrescriptionItemVM.oPrescriptionItemView.oPresItemBasicPropertiesView.DrugProperties[0] != null && !String.IsNullOrEmpty(objPrescriptionItemVM.oPrescriptionItemView.oPresItemBasicPropertiesView.DrugProperties[0].DrugPropertyCode) && objPrescriptionItemVM.oPrescriptionItemView.oPresItemBasicPropertiesView.DrugProperties[0].DrugPropertyCode.Contains(',')) {
                                        let objDrugProperty: ObservableCollection<DrugProperty> = new ObservableCollection<DrugProperty>();
                                        let sDrugPropertyCode: string[] = null;
                                        sDrugPropertyCode = objPrescriptionItemVM.oPrescriptionItemView.oPresItemBasicPropertiesView.DrugProperties[0].DrugPropertyCode.Split(',');
                                        if (sDrugPropertyCode != null && sDrugPropertyCode.length > 0) {
                                            for (let DPCnt: number = 0; DPCnt < sDrugPropertyCode.length; DPCnt++) {
                                                objDrugProperty.Add(ObjectHelper.CreateObject(new DrugProperty(), { DrugPropertyCode: sDrugPropertyCode[DPCnt], VMChildCode: objPrescriptionItemVM.oPrescriptionItemView.oPresItemBasicPropertiesView.DrugProperties[0].VMChildCode, HighRiskMsg: objPrescriptionItemVM.oPrescriptionItemView.oPresItemBasicPropertiesView.DrugProperties[0].HighRiskMsg }));
                                            }
                                        }
                                        if (objDrugProperty != null && objDrugProperty.Count > 0) {
                                            objPrescriptionItemVM.oPrescriptionItemView.oPresItemBasicPropertiesView.DrugProperties = objDrugProperty;
                                        }
                                    }
                                    objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.DrugProperties = new ObservableCollection<ManagePrescSer.DrugProperty>();
                                    objPrescriptionItemVM.oPrescriptionItemView.oPresItemBasicPropertiesView.DrugProperties.forEach( (oDrugProp)=> {
                                        objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.DrugProperties.Add(ObjectHelper.CreateObject(new ManagePrescSer.DrugProperty(), {
                                            DrugName: oDrugProp.DrugName,
                                            DrugPropertyCode: oDrugProp.DrugPropertyCode,
                                            HighRiskMsg: oDrugProp.HighRiskMsg,
                                            IdentifyingOID: oDrugProp.IdentifyingOID,
                                            IdentifyingType: oDrugProp.IdentifyingType,
                                            OccuranceCode: oDrugProp.OccuranceCode,
                                            VMChildCode: oDrugProp.VMChildCode
                                        }));
                                    });
                                }
                            }
                            objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.Duration = objPrescriptionItemVM.oPrescriptionItemView.oPresItemBasicPropertiesView.Duration;
                            objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.EndDTTM = objPrescriptionItemVM.oPrescriptionItemView.oPrescriptionItem.EndDTTM;
                            objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.ExpiryDate = objPrescriptionItemVM.oPrescriptionItemView.oPresItemAdditionalProperties.ExpiryDate;
                            let IPPPresItem: IPPPrescriptionItem = ObjectHelper.CreateType<IPPPrescriptionItem>(objPrescriptionItemVM.oPrescriptionItemView.oPrescriptionItem, IPPPrescriptionItem);
                            if (IPPPresItem != null) {
                                if (IPPPresItem.Instruction != null) {
                                    objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.PRNInstruction = ObjectHelper.CreateObject(new CListItem(), { DisplayText: IPPPresItem.Instruction.Name });
                                }
                                if (!String.IsNullOrEmpty(IPPPresItem.StrengthText)) {
                                    objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.Strength = ObjectHelper.CreateObject(new CListItem(), {
                                        DisplayText: IPPPresItem.StrengthText,
                                        Value: IPPPresItem.StrengthText
                                    });
                                }
                                if (!String.IsNullOrEmpty(IPPPresItem.DrugFrequencyUOMCode) && String.Equals(IPPPresItem.DrugFrequencyUOMCode, "CC_MEDDRSN2", StringComparison.CurrentCultureIgnoreCase) && IPPPresItem.FrequencyDetails != null && IPPPresItem.FrequencyDetails.DaysOfWeek != null && IPPPresItem.FrequencyDetails.DaysOfWeek.Count > 0) {
                                    objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.DaysOfWeeks = MedicationCommonBB.ConstructDaysOfWeek(IPPPresItem.FrequencyDetails.DaysOfWeek);
                                }
                            }
                            if (!String.IsNullOrEmpty(objPrescriptionItemVM.oPrescriptionItemView.oPresItemBasicPropertiesView.Frequency)) {
                                objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.Frequency = ObjectHelper.CreateObject(new CListItem(), {
                                    DisplayText: objPrescriptionItemVM.oPrescriptionItemView.oPresItemBasicPropertiesView.Frequency,
                                    Value: objPrescriptionItemVM.oPrescriptionItemView.oPresItemBasicPropertiesView.Frequency
                                });
                            }
                            objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.IdentifyingName = objPrescriptionItemVM.oPrescriptionItemView.oPrescriptionItem.IdentifyingName;
                            objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.IdentifyingType = objPrescriptionItemVM.oPrescriptionItemView.oPrescriptionItem.IdentifyingType;
                            if (objPrescriptionItemVM.oPrescriptionItemView.oPresItemAdditionalProperties.MedClerkModifyReason != null) {
                                objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.MedClerkModifyReason = ObjectHelper.CreateObject(new CListItem(), {
                                    DisplayText: objPrescriptionItemVM.oPrescriptionItemView.oPresItemAdditionalProperties.MedClerkModifyReason.Name,
                                    Value: objPrescriptionItemVM.oPrescriptionItemView.oPresItemAdditionalProperties.MedClerkModifyReason.OID.ToString(),
                                    Tag: ObjectHelper.CreateObject(new ManagePrescSer.ObjectInfo(), {
                                        Code: objPrescriptionItemVM.oPrescriptionItemView.oPresItemAdditionalProperties.MedClerkModifyReason.Code,
                                        Name: objPrescriptionItemVM.oPrescriptionItemView.oPresItemAdditionalProperties.MedClerkModifyReason.Name,
                                        OID: objPrescriptionItemVM.oPrescriptionItemView.oPresItemAdditionalProperties.MedClerkModifyReason.OID
                                    })
                                });
                            }
                            objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.NoOfInstallments = objPrescriptionItemVM.oPrescriptionItemView.oPresItemAdditionalProperties.NoOfInstallments;
                            objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.Quantity = objPrescriptionItemVM.oPrescriptionItemView.oPresItemBasicPropertiesView.Quantity;
                            objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.QuantityUOMName = objPrescriptionItemVM.oPrescriptionItemView.oPresItemBasicPropertiesView.QuantityUOMName;
                            if (objPrescriptionItemVM.oPrescriptionItemView.oPresItemBasicPropertiesView.Route != null && !String.IsNullOrEmpty(objPrescriptionItemVM.oPrescriptionItemView.oPresItemBasicPropertiesView.Route.Name)) {
                                objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.Route = ObjectHelper.CreateObject(new CListItem(), {
                                    DisplayText: objPrescriptionItemVM.oPrescriptionItemView.oPresItemBasicPropertiesView.Route.Name,
                                    Value: objPrescriptionItemVM.oPrescriptionItemView.oPresItemBasicPropertiesView.Route.OID.ToString()
                                });
                            }
                            if (!String.IsNullOrEmpty(objPrescriptionItemVM.oPrescriptionItemView.oPresItemBasicPropertiesView.Site)) {
                                objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.Site = ObjectHelper.CreateObject(new CListItem(), {
                                    DisplayText: objPrescriptionItemVM.oPrescriptionItemView.oPresItemBasicPropertiesView.Site,
                                    Value: objPrescriptionItemVM.oPrescriptionItemView.oPresItemBasicPropertiesView.Site
                                });
                            }
                            objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.StartDTTM = objPrescriptionItemVM.oPrescriptionItemView.oPrescriptionItem.StartDTTM;
                            if (objPrescriptionItemVM.oPrescriptionItemView.oPresItemAdditionalProperties.StationeryType != null && !String.IsNullOrEmpty(objPrescriptionItemVM.oPrescriptionItemView.oPresItemAdditionalProperties.StationeryType.Name)) {
                                objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.StationaryType = ObjectHelper.CreateObject(new CListItem(), {
                                    DisplayText: objPrescriptionItemVM.oPrescriptionItemView.oPresItemAdditionalProperties.StationeryType.Name,
                                    Value: objPrescriptionItemVM.oPrescriptionItemView.oPresItemAdditionalProperties.StationeryType.OID.ToString(),
                                    Tag: objPrescriptionItemVM.oPrescriptionItemView.oPresItemAdditionalProperties.StationeryType
                                });
                            }
                            if (objPrescriptionItemVM.oPrescriptionItemView.oPresItemBasicPropertiesView.SupplyInstruction != null && objPrescriptionItemVM.oPrescriptionItemView.oPresItemBasicPropertiesView.SupplyInstruction.Count > 0) {
                                objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.SupplyInstructionText = ObjectHelper.CreateObject(new CListItem(), {
                                    DisplayText: objPrescriptionItemVM.oPrescriptionItemView.oPresItemBasicPropertiesView.SupplyInstruction[0].Name,
                                    Value: objPrescriptionItemVM.oPrescriptionItemView.oPresItemBasicPropertiesView.SupplyInstruction[0].Code
                                });
                            }
                            if (objPrescriptionItemVM.oPrescriptionItemView.oPresItemBasicPropertiesView.TreatmentToCont != null) {
                                objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.TreatmentToContinue = ObjectHelper.CreateObject(new CListItem(), {
                                    DisplayText: objPrescriptionItemVM.oPrescriptionItemView.oPresItemBasicPropertiesView.TreatmentToCont.Name,
                                    Value: objPrescriptionItemVM.oPrescriptionItemView.oPresItemBasicPropertiesView.TreatmentToCont.OID.ToString(),
                                    Tag: ObjectHelper.CreateObject(new ManagePrescSer.ObjectInfo(), {
                                        Code: objPrescriptionItemVM.oPrescriptionItemView.oPresItemBasicPropertiesView.TreatmentToCont.Code,
                                        Name: objPrescriptionItemVM.oPrescriptionItemView.oPresItemBasicPropertiesView.TreatmentToCont.Name,
                                        OID: objPrescriptionItemVM.oPrescriptionItemView.oPresItemBasicPropertiesView.TreatmentToCont.OID
                                    })
                                });
                            }
                        }
                        objPrescriptionLineItemVM.IsPGD = objPrescriptionItemVM.oPrescriptionItemView.oPrescriptionItem.IsPGD;
                        objPrescriptionLineItemVM.PrescriberDetails = ObjectHelper.CreateObject(new ManagePrescSer.ObjectInfo(), {
                            Code: objPrescriptionItemVM.oPrescriptionItemView.oPrescriptionItem.PrescriberDetails.Code,
                            Name: objPrescriptionItemVM.oPrescriptionItemView.oPrescriptionItem.PrescriberDetails.Name,
                            OID: objPrescriptionItemVM.oPrescriptionItemView.oPrescriptionItem.PrescriberDetails.OID,
                            RoleProfileOID: objPrescriptionItemVM.oPrescriptionItemView.oPrescriptionItem.PrescriberDetails.RoleProfileOID
                        });
                        objPrescriptionLineItemVM.PrescriptionItemOID = objPrescriptionItemVM.oPrescriptionItemView.oPrescriptionItem.OID;
                        objPrescriptionLineItemVM.PrescriptionItemStatus = objPrescriptionItemVM.oPrescriptionItemView.oPrescriptionItem.PrescriptionItemStatus;
                        if (objPrescriptionItemVM.oPrescriptionItemView.oPrescriptionItem.PrescriptionBasicData != null) {
                            objPrescriptionLineItemVM.PrescriptionType = objPrescriptionItemVM.oPrescriptionItemView.oPrescriptionItem.PrescriptionBasicData.PrescriptionType;
                        }
                        objPrescriptionLineItemVM.PrescriptionTypeInPatientContext = PatientContext.PrescriptionType;
                        objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.Itemsubtype = objPrescriptionItemVM.ItemSubType;
                        if (objPrescriptionItemVM.MultiComponentItems != null && objPrescriptionItemVM.MultiComponentItems.Count > 0) {
                            objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.MCIItemDisplay = String.Join("^", objPrescriptionItemVM.MultiComponentItems.ToArray());
                            objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.MCIItemDrugprop = String.Join("^", objPrescriptionItemVM.MultiComponentItems.ToArray());
                        }
                    }
                }
                else if (objPrescriptionItem instanceof PrescriptionItemViewVM || objPrescriptionItem instanceof MedRequestVM) {
                    let objPrescriptionItemVM: PrescriptionItemViewVM = new PrescriptionItemViewVM();
                    if (objPrescriptionItem instanceof PrescriptionItemViewVM) {
                        objPrescriptionItemVM = ObjectHelper.CreateType<PrescriptionItemViewVM>(objPrescriptionItem, PrescriptionItemViewVM);
                    }
                    else if (objPrescriptionItem instanceof MedRequestVM) {
                        let oMedRequestVM: MedRequestVM = new MedRequestVM();
                        oMedRequestVM = ObjectHelper.CreateType<MedRequestVM>(objPrescriptionItem, MedRequestVM);
                        if (oMedRequestVM != null && oMedRequestVM.oPrescriptionItemViewVM != null) {
                            objPrescriptionItemVM = oMedRequestVM.oPrescriptionItemViewVM;
                        }
                        if (oMedRequestVM != null) {
                            objPrescriptionLineItemVM.IsCriticalMed = oMedRequestVM.IsCriticalMed;
                        }
                        if (oMedRequestVM != null) {
                            objPrescriptionLineItemVM.IsDoseCalculatedByDC = oMedRequestVM.IsDoseCalculatedByDC;
                        }
                    }
                    if (objPrescriptionItemVM.PrescriptionItemViewDetails != null) {
                        objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.IsMedsAdminDischargePrescription = true;
                        if (objPrescriptionItemVM.PrescriptionItemViewDetails.oPresItemAdditionalProperties != null) {
                            objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.AdditionalComments = objPrescriptionItemVM.PrescriptionItemViewDetails.oPresItemAdditionalProperties.AdditionalComments;
                            if (objPrescriptionItemVM.PrescriptionItemViewDetails.oPresItemAdditionalProperties.AdminMethod != null && !String.IsNullOrEmpty(objPrescriptionItemVM.PrescriptionItemViewDetails.oPresItemAdditionalProperties.AdminMethod.Name)) {
                                objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.AdminMethod = ObjectHelper.CreateObject(new CListItem(), {
                                    DisplayText: objPrescriptionItemVM.PrescriptionItemViewDetails.oPresItemAdditionalProperties.AdminMethod.Name,
                                    Value: objPrescriptionItemVM.PrescriptionItemViewDetails.oPresItemAdditionalProperties.AdminMethod.OID.ToString()
                                });
                            }
                            objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.BatchNumber = objPrescriptionItemVM.PrescriptionItemViewDetails.oPresItemAdditionalProperties.BatchNumber;
                        }
                        if (objPrescriptionItemVM.PrescriptionItemViewDetails.oPresItemBasicPropertiesView != null) {
                            if (objPrescriptionItemVM.PrescriptionItemViewDetails.oPresItemBasicPropertiesView.AdminInstruction != null && !String.IsNullOrEmpty(objPrescriptionItemVM.PrescriptionItemViewDetails.oPresItemBasicPropertiesView.AdminInstruction.Name)) {
                                objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.AdminInstruction = ObjectHelper.CreateObject(new CListItem(), {
                                    DisplayText: objPrescriptionItemVM.PrescriptionItemViewDetails.oPresItemBasicPropertiesView.AdminInstruction.Name,
                                    Value: objPrescriptionItemVM.PrescriptionItemViewDetails.oPresItemBasicPropertiesView.AdminInstruction.OID.ToString()
                                });
                            }
                            if (objPrescriptionItemVM.PrescriptionItemViewDetails.oPresItemBasicPropertiesView.AdminInstruction != null && objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.AdminInstruction == null && !String.IsNullOrEmpty(objPrescriptionItemVM.PrescriptionItemViewDetails.oPresItemBasicPropertiesView.OtherAdminInstruction)) {
                                objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.AdminInstruction = ObjectHelper.CreateObject(new CListItem(), {
                                    DisplayText: objPrescriptionItemVM.PrescriptionItemViewDetails.oPresItemBasicPropertiesView.OtherAdminInstruction,
                                    Value: String.Empty
                                });
                            }
                            objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.Direction = objPrescriptionItemVM.PrescriptionItemViewDetails.oPresItemBasicPropertiesView.Direction;
                            if (objPrescriptionItemVM.PrescriptionItemViewDetails.oPresItemBasicPropertiesView.Form != null && !String.IsNullOrEmpty(objPrescriptionItemVM.PrescriptionItemViewDetails.oPresItemBasicPropertiesView.Form.Name)) {
                                objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.DosageForm = ObjectHelper.CreateObject(new CListItem(), {
                                    DisplayText: objPrescriptionItemVM.PrescriptionItemViewDetails.oPresItemBasicPropertiesView.Form.Name,
                                    Value: objPrescriptionItemVM.PrescriptionItemViewDetails.oPresItemBasicPropertiesView.Form.OID.ToString()
                                });
                            }
                            objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.Dose = objPrescriptionItemVM.PrescriptionItemViewDetails.oPresItemBasicPropertiesView.Dose;
                            if (!String.IsNullOrEmpty(objPrescriptionItemVM.PrescriptionItemViewDetails.oPresItemBasicPropertiesView.DoseType)) {
                                objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.DoseType = ObjectHelper.CreateObject(new CListItem(), {
                                    DisplayText: objPrescriptionItemVM.PrescriptionItemViewDetails.oPresItemBasicPropertiesView.DoseType,
                                    Value: objPrescriptionItemVM.PrescriptionItemViewDetails.oPresItemBasicPropertiesView.DoseType
                                });
                            }
                            if (objPrescriptionItemVM.PrescriptionItemViewDetails.oPresItemBasicPropertiesView.DrugProperties != null && objPrescriptionItemVM.PrescriptionItemViewDetails.oPresItemBasicPropertiesView.DrugProperties.Count > 0) {
                                objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.DrugProperties = new ObservableCollection<ManagePrescSer.DrugProperty>();
                                objPrescriptionItemVM.PrescriptionItemViewDetails.oPresItemBasicPropertiesView.DrugProperties.forEach( (oDrugProp)=> {
                                    objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.DrugProperties.Add(ObjectHelper.CreateObject(new ManagePrescSer.DrugProperty(), {
                                        DrugName: oDrugProp.DrugName,
                                        DrugPropertyCode: oDrugProp.DrugPropertyCode,
                                        HighRiskMsg: oDrugProp.HighRiskMsg,
                                        IdentifyingOID: oDrugProp.IdentifyingOID,
                                        IdentifyingType: oDrugProp.IdentifyingType,
                                        OccuranceCode: oDrugProp.OccuranceCode,
                                        VMChildCode: "CC_OCCRALLCHILD"
                                    }));
                                });
                            }
                            objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.Duration = objPrescriptionItemVM.PrescriptionItemViewDetails.oPresItemBasicPropertiesView.Duration;
                            objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.EndDTTM = objPrescriptionItemVM.PrescriptionItemViewDetails.oPrescriptionItem.EndDTTM.toISOString() && objPrescriptionItemVM.PrescriptionItemViewDetails.oPrescriptionItem.EndDTTM.toISOString() !='0001-01-01T00:00:00.000Z' ? objPrescriptionItemVM.PrescriptionItemViewDetails.oPrescriptionItem.EndDTTM : null;
                            objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.ExpiryDate = objPrescriptionItemVM.PrescriptionItemViewDetails.oPresItemAdditionalProperties.ExpiryDate;
                            let IPPPresItem: IPPMAManagePrescSer.IPPPrescriptionItem = ObjectHelper.CreateType<IPPMAManagePrescSer.IPPPrescriptionItem>(objPrescriptionItemVM.PrescriptionItemViewDetails.oPrescriptionItem, IPPMAManagePrescSer.IPPPrescriptionItem);
                            if (IPPPresItem != null) {
                                if (IPPPresItem.Instruction != null) {
                                    objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.PRNInstruction = ObjectHelper.CreateObject(new CListItem(), { DisplayText: IPPPresItem.Instruction.Name });
                                }
                                if (!String.IsNullOrEmpty(IPPPresItem.StrengthText)) {
                                    objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.Strength = ObjectHelper.CreateObject(new CListItem(), {
                                        DisplayText: IPPPresItem.StrengthText,
                                        Value: IPPPresItem.StrengthText
                                    });
                                }
                                if (!String.IsNullOrEmpty(IPPPresItem.DrugFrequencyUOMCode) && String.Equals(IPPPresItem.DrugFrequencyUOMCode, "CC_MEDDRSN2", StringComparison.CurrentCultureIgnoreCase) && IPPPresItem.FrequencyDetails != null && IPPPresItem.FrequencyDetails.DaysOfWeek != null && IPPPresItem.FrequencyDetails.DaysOfWeek.Count > 0) {
                                    objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.DaysOfWeeks = MedicationCommonBB.ConstructDaysOfWeek(IPPPresItem.FrequencyDetails.DaysOfWeek);
                                }
                            }
                            if (!String.IsNullOrEmpty(objPrescriptionItemVM.PrescriptionItemViewDetails.oPresItemBasicPropertiesView.Frequency)) {
                                objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.Frequency = ObjectHelper.CreateObject(new CListItem(), {
                                    DisplayText: objPrescriptionItemVM.PrescriptionItemViewDetails.oPresItemBasicPropertiesView.Frequency,
                                    Value: objPrescriptionItemVM.PrescriptionItemViewDetails.oPresItemBasicPropertiesView.Frequency
                                });
                            }
                            else if (!String.IsNullOrEmpty(objPrescriptionItemVM.PrescriptionItemViewDetails.oPresItemBasicPropertiesView.SteppedDoseAdminTimes)) {
                                objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.Frequency = ObjectHelper.CreateObject(new CListItem(), {
                                    DisplayText: objPrescriptionItemVM.PrescriptionItemViewDetails.oPresItemBasicPropertiesView.SteppedDoseAdminTimes,
                                    Value: objPrescriptionItemVM.PrescriptionItemViewDetails.oPresItemBasicPropertiesView.SteppedDoseAdminTimes
                                });
                            }
                            if (!String.IsNullOrEmpty(objPrescriptionItemVM.PrescriptionItemViewDetails.oPrescriptionItem.VMVPLorenzoID) && !String.IsNullOrEmpty(objPrescriptionItemVM.PrescriptionItemViewDetails.oPrescriptionItem.VMVPIdentifyingName)) {
                                objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.IdentifyingName = objPrescriptionItemVM.PrescriptionItemViewDetails.oPrescriptionItem.VMVPIdentifyingName + " - " + objPrescriptionItemVM.PrescriptionItemViewDetails.oPrescriptionItem.IdentifyingName;
                            }
                            else {
                                objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.IdentifyingName = objPrescriptionItemVM.PrescriptionItemViewDetails.oPrescriptionItem.IdentifyingName;
                            }
                            objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.IdentifyingType = objPrescriptionItemVM.PrescriptionItemViewDetails.oPrescriptionItem.IdentifyingType;
                            if (objPrescriptionItemVM.PrescriptionItemViewDetails.oPresItemAdditionalProperties.MedClerkModifyReason != null) {
                                objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.MedClerkModifyReason = ObjectHelper.CreateObject(new CListItem(), {
                                    DisplayText: objPrescriptionItemVM.PrescriptionItemViewDetails.oPresItemAdditionalProperties.MedClerkModifyReason.Name,
                                    Value: objPrescriptionItemVM.PrescriptionItemViewDetails.oPresItemAdditionalProperties.MedClerkModifyReason.OID.ToString(),
                                    Tag: ObjectHelper.CreateObject(new ManagePrescSer.ObjectInfo(), {
                                        Code: objPrescriptionItemVM.PrescriptionItemViewDetails.oPresItemAdditionalProperties.MedClerkModifyReason.Code,
                                        Name: objPrescriptionItemVM.PrescriptionItemViewDetails.oPresItemAdditionalProperties.MedClerkModifyReason.Name,
                                        OID: objPrescriptionItemVM.PrescriptionItemViewDetails.oPresItemAdditionalProperties.MedClerkModifyReason.OID
                                    })
                                });
                            }
                            objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.NoOfInstallments = objPrescriptionItemVM.PrescriptionItemViewDetails.oPresItemAdditionalProperties.NoOfInstallments;
                            objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.Quantity = objPrescriptionItemVM.PrescriptionItemViewDetails.oPresItemBasicPropertiesView.Quantity;
                            objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.QuantityUOMName = objPrescriptionItemVM.PrescriptionItemViewDetails.oPresItemBasicPropertiesView.QuantityUOMName;
                            if (objPrescriptionItemVM.PrescriptionItemViewDetails.oPresItemBasicPropertiesView.Route != null && !String.IsNullOrEmpty(objPrescriptionItemVM.PrescriptionItemViewDetails.oPresItemBasicPropertiesView.Route.Name)) {
                                objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.Route = ObjectHelper.CreateObject(new CListItem(), {
                                    DisplayText: MedicationCommonBB.RouteName(objPrescriptionItemVM.PrescriptionItemViewDetails.oPresItemBasicPropertiesView.Route.Name),
                                    Value: MedicationCommonBB.RouteOID(objPrescriptionItemVM.PrescriptionItemViewDetails.oPresItemBasicPropertiesView.Route.OID.ToString())
                                });
                            }
                            if (!String.IsNullOrEmpty(objPrescriptionItemVM.PrescriptionItemViewDetails.oPresItemBasicPropertiesView.Site)) {
                                objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.Site = ObjectHelper.CreateObject(new CListItem(), {
                                    DisplayText: objPrescriptionItemVM.PrescriptionItemViewDetails.oPresItemBasicPropertiesView.SealImageList,
                                    Value: objPrescriptionItemVM.PrescriptionItemViewDetails.oPresItemBasicPropertiesView.SealImageList
                                });
                            }
                            objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.StartDTTM = objPrescriptionItemVM.PrescriptionItemViewDetails.oPrescriptionItem.StartDTTM;
                            if (objPrescriptionItemVM.PrescriptionItemViewDetails.oPresItemAdditionalProperties.StationeryType != null && !String.IsNullOrEmpty(objPrescriptionItemVM.PrescriptionItemViewDetails.oPresItemAdditionalProperties.StationeryType.Name)) {
                                objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.StationaryType = ObjectHelper.CreateObject(new CListItem(), {
                                    DisplayText: objPrescriptionItemVM.PrescriptionItemViewDetails.oPresItemAdditionalProperties.StationeryType.Name,
                                    Value: objPrescriptionItemVM.PrescriptionItemViewDetails.oPresItemAdditionalProperties.StationeryType.OID.ToString(),
                                    Tag: objPrescriptionItemVM.PrescriptionItemViewDetails.oPresItemAdditionalProperties.StationeryType
                                });
                            }
                            if (objPrescriptionItemVM.PrescriptionItemViewDetails.oPresItemBasicPropertiesView.SupplyInstruction != null && objPrescriptionItemVM.PrescriptionItemViewDetails.oPresItemBasicPropertiesView.SupplyInstruction.Count > 0) {
                                let oSupplyValue: StringBuilder = new StringBuilder();
                                let oSupplyText: StringBuilder = new StringBuilder();
                                let sCnt: number = objPrescriptionItemVM.PrescriptionItemViewDetails.oPresItemBasicPropertiesView.SupplyInstruction.Count;
                                for (let i: number = 0; i < sCnt; i++) {
                                    oSupplyValue.Append(objPrescriptionItemVM.PrescriptionItemViewDetails.oPresItemBasicPropertiesView.SupplyInstruction[i].Code);
                                    oSupplyValue.Append(";");
                                    oSupplyText.Append(CommonBB.GetText(objPrescriptionItemVM.PrescriptionItemViewDetails.oPresItemBasicPropertiesView.SupplyInstruction[i].Code, ValueDomainValues.oMedSupp));
                                    oSupplyText.Append(";");
                                }
                                objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.SupplyInstructionText = ObjectHelper.CreateObject(new CListItem(), {
                                    DisplayText: oSupplyText.ToString().TrimEnd(';'),
                                    Value: oSupplyValue.ToString().TrimEnd(';')
                                });
                            }
                            objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.TechSupplyDTTM = objPrescriptionItemVM.PrescriptionItemViewDetails.oPresItemBasicPropertiesView.SupplyDTTM;
                            if (!String.IsNullOrEmpty(objPrescriptionItemVM.PrescriptionItemViewDetails.oPresItemBasicPropertiesView.TechSupplyInstruction)) {
                                let objTechValSuplyInst: string[] = objPrescriptionItemVM.PrescriptionItemViewDetails.oPresItemBasicPropertiesView.TechSupplyInstruction.Split(';');
                                let TechCnt: number = objTechValSuplyInst.length;
                                let SupplyComments: string[] = objPrescriptionItemVM.PrescriptionItemViewDetails.oPresItemBasicPropertiesView.TechSupplyInstruction.Split("~~");
                                if ((SupplyComments.length > 1) && (!String.IsNullOrEmpty(SupplyComments[1]))) {
                                    objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.SupplyComments = SupplyComments[1];
                                    objTechValSuplyInst = SupplyComments[0].Split(';');
                                    TechCnt = objTechValSuplyInst.length;
                                }
                                if (objPrescriptionItemVM.PrescriptionItemViewDetails.oPresItemBasicPropertiesView != null && objPrescriptionItemVM.PrescriptionItemViewDetails.oPresItemBasicPropertiesView.SupplyInstruction != null && objPrescriptionItemVM.PrescriptionItemViewDetails.oPresItemBasicPropertiesView.SupplyInstruction.Count > 0) {
                                    objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.TechValSupplyInstructionText = new ObservableCollection<CListItem>();
                                    if (oTechValSuplyInst == null) {
                                        oTechValSuplyInst = new Dictionary<string, string>();
                                    }
                                    let sCount: number = objPrescriptionItemVM.PrescriptionItemViewDetails.oPresItemBasicPropertiesView.SupplyInstruction.Count;
                                    for (let i: number = 0; i < sCount; i++) {
                                        if (!oTechValSuplyInst.ContainsKey(objPrescriptionItemVM.PrescriptionItemViewDetails.oPresItemBasicPropertiesView.SupplyInstruction[i].Code)) {
                                            objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.TechValSupplyInstructionText.Add(ObjectHelper.CreateObject(new CListItem(), {
                                                DisplayText: CommonBB.GetText(objPrescriptionItemVM.PrescriptionItemViewDetails.oPresItemBasicPropertiesView.SupplyInstruction[i].Code, ValueDomainValues.oMedSupp).ToLower(),
                                                Value: objPrescriptionItemVM.PrescriptionItemViewDetails.oPresItemBasicPropertiesView.SupplyInstruction[i].Code
                                            }));
                                            oTechValSuplyInst.Add(objPrescriptionItemVM.PrescriptionItemViewDetails.oPresItemBasicPropertiesView.SupplyInstruction[i].Code, CommonBB.GetText(objPrescriptionItemVM.PrescriptionItemViewDetails.oPresItemBasicPropertiesView.SupplyInstruction[i].Code, ValueDomainValues.oMedSupp).ToLower());
                                        }
                                    }
                                }
                                if (TechCnt > 0) {
                                    if (objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.TechValSupplyInstructionText == null) {
                                        objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.TechValSupplyInstructionText = new ObservableCollection<CListItem>();
                                    }
                                    for (let cnt: number = 0; cnt < TechCnt; cnt++) {
                                        if (oTechValSuplyInst == null) {
                                            oTechValSuplyInst = new Dictionary<string, string>();
                                        }
                                        if (!String.Equals(objTechValSuplyInst[cnt], CConstants.Supplycomments)) {
                                            if (!oTechValSuplyInst.ContainsKey(objTechValSuplyInst[cnt])) {
                                                objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.TechValSupplyInstructionText.Add(ObjectHelper.CreateObject(new CListItem(), {
                                                    DisplayText: CommonBB.GetText(objTechValSuplyInst[cnt], ValueDomainValues.oMedSupp).ToLower(),
                                                    Value: objTechValSuplyInst[cnt]
                                                }));
                                                oTechValSuplyInst.Add(objTechValSuplyInst[cnt], objTechValSuplyInst[cnt]);
                                            }
                                        }
                                    }
                                }
                            }
                            if (objPrescriptionItemVM.PrescriptionItemViewDetails.oPresItemBasicPropertiesView.TreatmentToCont != null) {
                                objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.TreatmentToContinue = ObjectHelper.CreateObject(new CListItem(), {
                                    DisplayText: objPrescriptionItemVM.PrescriptionItemViewDetails.oPresItemBasicPropertiesView.TreatmentToCont.Name,
                                    Value: objPrescriptionItemVM.PrescriptionItemViewDetails.oPresItemBasicPropertiesView.TreatmentToCont.OID.ToString(),
                                    Tag: ObjectHelper.CreateObject(new ManagePrescSer.ObjectInfo(), {
                                        Code: objPrescriptionItemVM.PrescriptionItemViewDetails.oPresItemBasicPropertiesView.TreatmentToCont.Code,
                                        Name: objPrescriptionItemVM.PrescriptionItemViewDetails.oPresItemBasicPropertiesView.TreatmentToCont.Name,
                                        OID: objPrescriptionItemVM.PrescriptionItemViewDetails.oPresItemBasicPropertiesView.TreatmentToCont.OID
                                    })
                                });
                            }
                        }
                    }
                    if (objPrescriptionItemVM.PrescriptionItemViewDetails != null && objPrescriptionItemVM.PrescriptionItemViewDetails.oPrescriptionItem != null && objPrescriptionItemVM.PrescriptionItemViewDetails.oPrescriptionItem.PrescriberDetails != null) {
                        objPrescriptionLineItemVM.IsPGD = objPrescriptionItemVM.PrescriptionItemViewDetails.oPrescriptionItem.IsPGD;
                        objPrescriptionLineItemVM.PrescriberDetails = ObjectHelper.CreateObject(new ManagePrescSer.ObjectInfo(), {
                            Code: objPrescriptionItemVM.PrescriptionItemViewDetails.oPrescriptionItem.PrescriberDetails.Code,
                            Name: objPrescriptionItemVM.PrescriptionItemViewDetails.oPrescriptionItem.PrescriberDetails.Name,
                            OID: objPrescriptionItemVM.PrescriptionItemViewDetails.oPrescriptionItem.PrescriberDetails.OID,
                            RoleProfileOID: objPrescriptionItemVM.PrescriptionItemViewDetails.oPrescriptionItem.PrescriberDetails.RoleProfileOID
                        });
                        objPrescriptionLineItemVM.PrescriptionItemOID = objPrescriptionItemVM.PrescriptionItemViewDetails.oPrescriptionItem.OID;
                        objPrescriptionLineItemVM.PrescriptionItemStatus = objPrescriptionItemVM.PrescriptionItemViewDetails.oPrescriptionItem.PrescriptionItemStatus;
                        if (objPrescriptionItemVM.PrescriptionItemViewDetails.oPrescriptionItem.PrescriptionBasicData != null) {
                            objPrescriptionLineItemVM.PrescriptionType = objPrescriptionItemVM.PrescriptionItemViewDetails.oPrescriptionItem.PrescriptionBasicData.PrescriptionType;
                            objPrescriptionLineItemVM.PrescriptionTypeCode = objPrescriptionItemVM.PrescriptionItemViewDetails.oPrescriptionItem.PrescriptionBasicData.PrescriptionType;
                        }
                    }
                    objPrescriptionLineItemVM.PrescriptionTypeInPatientContext = PatientContext.PrescriptionType;
                    objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.Itemsubtype = objPrescriptionItemVM.Itemsubtype;
                    objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.MCIItemDisplay = objPrescriptionItemVM.MCIItemDisplay;
                    objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.MCIItemDrugprop = objPrescriptionItemVM.MCIItemDisplay;
                    objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.InfusionDetails = objPrescriptionItemVM.InfusionDetails;
                    objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.MCILoerenzoID = objPrescriptionItemVM.lorenzoid;
                    if (objPrescriptionItemVM.PrescriptionItemViewDetails != null && objPrescriptionItemVM.PrescriptionItemViewDetails.oPrescriptionItem != null) {
                        objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.IsConditionalExists = objPrescriptionItemVM.PrescriptionItemViewDetails.oPrescriptionItem.IsConditionalExists;
                    }
                    if (objPrescriptionItem instanceof MedRequestVM) {
                        let ovm: MedRequestVM = ObjectHelper.CreateType<MedRequestVM>(objPrescriptionItem, MedRequestVM);
                        
                        objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.IsinDefiniteOmit = ovm.IsinDefiniteOmit;
                        if (DateTime.NotEquals(ovm.ReviewafterDTTM , DateTime.MinValue)) {
                            objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.InfusionDetails.ReviewafterDTTM = ovm.ReviewafterDTTM;
                        }
                        if (!String.IsNullOrEmpty(ovm.ReviewType)) {
                            objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.ReviewType = ovm.ReviewType;
                        }
                        if (!String.IsNullOrEmpty(ovm.ReviewRequestedBy)) {
                            objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.ReviewRequestedBy = ovm.ReviewRequestedBy;
                        }
                        if (!String.IsNullOrEmpty(ovm.ReviewComments)) {
                            objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.ReviewComments = ovm.ReviewComments;
                        }
                        if (!String.IsNullOrEmpty(ovm.OmittedBy)) {
                            objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.OmittedBy = ovm.OmittedBy;
                        }
                        if (!String.IsNullOrEmpty(ovm.OmitComments)) {
                            objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.OmitComments = ovm.OmitComments;
                        }
                        if (DateTime.NotEquals(ovm.IsinDefiniteOmitDTTM , DateTime.MinValue)) {
                            objPrescriptionLineItemVM.FormViewerDetails.BasicDetails.IsinDefiniteOmitDTTM = ovm.IsinDefiniteOmitDTTM;
                        }
                    }
                }
            }
            return objPrescriptionLineItemVM;
        }
        // public static IsConceptCodeExists(sConceptCode: string, objConceptCodes: ObservableCollection<CValuesetTerm>, sResultDetails: string): boolean {
        //     let bResult: boolean = false;
        //     sResultDetails = String.Empty;
        //     if (!String.IsNullOrEmpty(sConceptCode) && objConceptCodes != null) {
        //         let Results = from term in objConceptCodes
        //         where term.csCode == sConceptCode
        //         select term.csDescription;
        //         if (Results != null && Results.Count() > 0)
        //             sResultDetails = Results.First();
        //         bResult = !String.IsNullOrEmpty(sResultDetails);
        //     }
        //     return bResult;
        // }
        public static IsConceptCodeExists(sConceptCode: string, objConceptCodes: ObservableCollection<CValuesetTerm>, out1: (sResultDetails: string) => void): boolean {
            let sResultDetails: string;
            let bResult: boolean = false;
            sResultDetails = String.Empty;
            if (!String.IsNullOrEmpty(sConceptCode) && objConceptCodes != null) {
                // let Results = from term in objConceptCodes
                //             where term.csCode == sConceptCode
                //             select term.csDescription;
                let Results = objConceptCodes.Where(term =>term.csCode==sConceptCode).Select(term => term.csDescription);
                if (Results != null && Results.Count() > 0)
                    sResultDetails = Results.First();
                bResult = !String.IsNullOrEmpty(sResultDetails);
            }
            out1(sResultDetails);
            return bResult;
        }
        public static GetText(sCCode: string, oTerm: ObservableCollection<CValuesetTerm>): string {
            let sText: string = String.Empty;
            let tmpText: string = String.Empty;
            if (Common.IsConceptCodeExists(sCCode, oTerm, (o) => { tmpText = o; }) != false)
                sText = tmpText;
            else sText = sCCode;
            return sText;
        }
        public static LaunchReqMed(): boolean {
        //    if (!MedChartData.IsReqMedCAlaunched)
            {
                let pHeight = 809;
                let pWidth = 1920;
                MedChartData.IsReqMedCAlaunched = true;
                let CACode: string = CConstants.NonInfRecAdminCACode;
                let sMenuCode: string = CConstants.RequestMedication;
                let sQuery: string = "&MenuCode=" + sMenuCode;
                sQuery += "&PATIENTOID=" + PatientContext.PatientOID;
                if (PatientContext.EncounterOid > 0)
                    sQuery += "&EncounterOID=" + PatientContext.EncounterOid;
                else sQuery += "&EncounterOID=" + ChartContext.EncounterOID;
                sQuery += "&ChartPatientOID=" + ChartContext.PatientOID;
                sQuery += "&PrescType=" + PrescriptionTypes.ForAdministration;
                sQuery += "&PRESCRIPTIONOID=" + "";
                sQuery += "&LaunchFrom=" + CACode;
                sQuery += "&ENCTYPE=" + PatientContext.EncounterType;
                sQuery += "&SRVCPOINTOID=" + MedChartData.ServiceOID.ToString();
                sQuery += "&LocationOID=" + MedChartData.LocationOID.ToString();
                if (!String.IsNullOrEmpty(AppContextInfo.JobRoleOID)) {
                    sQuery += "&JobRoleOID=" + AppContextInfo.JobRoleOID;
                }
                if (Common.GBLoMedicationAdminVM != null) {
                    Common.GBLoMedicationAdminVM.sLastCACode = sMenuCode;
                    Common.GBLoMedicationAdminVM.LaunchWizard(sMenuCode, sQuery,2, pHeight, pWidth);
                }
                else {
                    let objMedAdminVM: MedicationAdminVM = new MedicationAdminVM();
                    objMedAdminVM.sLastCACode = sMenuCode;
                    objMedAdminVM.LaunchWizard(sMenuCode, sQuery,2, pHeight, pWidth);
                }
            }
            return true;
        }
        private static _OnObsWizardClose: Function;
        public static LaunchObservation(prescriptionitemOID: number, IdentifyingType: string, IdentifyingOID: number, MCVersion: string, sDrugname: string, sItemsubtype: string, sMCitemname: string, sLorenzoid: string, _ParamOnObsWizardClose: Function = null): boolean {
            UserPermissions.CanViewResults = null;
            if (!Common.bIsShowMessage) {
                Common.bIsShowMessage = true;
                UserPermissions.CanViewObservations = PrescriptionHelper.CheckPermission("IPP_CAN_VIEW_OBSERVATIONS", "Can view Observations");
                UserPermissions.CanViewResults = PrescriptionHelper.CheckPermission("RM_TABULAR_VIEW", "Can View Tabular View"); 
                
                if (!UserPermissions.CanViewObservations && UserPermissions.CanViewResults != true) {
                    iMessageBox.Show("LORENZO", "You do not have rights to view observation/results.", MessageBoxType.Information, MessageBoxButton.OK);
                    return false;
                }
                else {
                    if (_ParamOnObsWizardClose == null)
                        Common._OnObsWizardClose =(s) =>{ 
                            let top:any = window.top;
                            if (top.msgAlert == false) {
                                // ObjectHelper.stopFinishAndCancelEvent(true);
                            }
                            Common.ObservationCommonFinished(s);
                        } 
                    else Common._OnObsWizardClose = _ParamOnObsWizardClose;
                    if (!String.IsNullOrEmpty(sItemsubtype) && (String.Compare(sLorenzoid, CConstants.ADHOC_ITEM_LORENZOID, StringComparison.CurrentCultureIgnoreCase) == 0)) {
                        let oReq: CReqMsgGetDataItem = new CReqMsgGetDataItem();
                        oReq.oContextInformation = Common.FillContext();
                        oReq.IdentifyingOIDBC = Common.lnIdentifyingOID = IdentifyingOID;
                        oReq.IdentifyingTypeBC = Common.sIdentifyingType = IdentifyingType;
                        oReq.MCVersionNoBC = Common.sMCVersion = MCVersion;
                        oReq.PrescriptionitemoidBC = Common.lnPrescriptionOID = prescriptionitemOID;
                        Common.sDrugName = sDrugname;
                        Common.sMCitemName = sMCitemname;
                        Common.sItemSubtype = sItemsubtype;
                        Common.sLorenzoID = sLorenzoid;
                        let serviceProxy: IPPMAPrescribableDefnWSSoapClient = new IPPMAPrescribableDefnWSSoapClient();
                        serviceProxy.GetDataItemCompleted  = (s,e) => { Common.serviceProxy_GetDataItemCompleted(s,e); } ;
                        serviceProxy.GetDataItemAsync(oReq);
                        return true;
                    }
                    else {
                        let oReq: CReqMsgGetDataItem = new CReqMsgGetDataItem();
                        oReq.oContextInformation = Common.FillContext();
                        oReq.IdentifyingOIDBC = Common.lnIdentifyingOID = IdentifyingOID;
                        oReq.IdentifyingTypeBC = Common.sIdentifyingType = IdentifyingType;
                        oReq.MCVersionNoBC = Common.sMCVersion = MCVersion;
                        Common.lnPrescriptionOID = prescriptionitemOID;
                        Common.sDrugName = sDrugname;
                        Common.sMCitemName = sMCitemname;
                        Common.sItemSubtype = sItemsubtype;
                        Common.sLorenzoID = sLorenzoid;
                        let serviceProxy: IPPMAPrescribableDefnWSSoapClient = new IPPMAPrescribableDefnWSSoapClient();
                        serviceProxy.GetDataItemCompleted  = (s,e) => { Common.serviceProxy_GetDataItemCompleted(s,e); } ;
                        serviceProxy.GetDataItemAsync(oReq);
                        return true;
                    }
                }
            }
            else {
                return false;
            }
        }
        static serviceProxy_GetDataItemCompleted(sender: Object, e: GetDataItemCompletedEventArgs): void {
            let dataItemCodes: StringBuilder = new StringBuilder();
            let RdataItemCodes: StringBuilder = new StringBuilder();
            let RequestItemCodes: StringBuilder = new StringBuilder();
            let oNoObservationandResultMsg: iMessageBox = new iMessageBox();
            oNoObservationandResultMsg.Title = CConstants.MSGTitleName;
            oNoObservationandResultMsg.Message = CConstants.NOObservationandResult + Common.sDrugName;
            oNoObservationandResultMsg.IconType = MessageBoxType.Information;
            oNoObservationandResultMsg.MessageButton = MessageBoxButton.OK;
            let oRes: CResMsgGetDataItem = e.Result;
            if (oRes != null && oRes.oObservationResult != null && oRes.oObservationResult.Count > 0) {
                let CanlaunchChart: boolean = false;
                oRes.oObservationResult.forEach( (obsResItem)=> {
                    if (String.Compare(obsResItem.ItemType, "Observation", StringComparison.InvariantCultureIgnoreCase) == 0) {
                        if (dataItemCodes.Length == 0) {
                            dataItemCodes.Append(obsResItem.ItemCode);
                            dataItemCodes.Append("~" + obsResItem.ItemName);
                            dataItemCodes.Append("~" + obsResItem.Version);
                            dataItemCodes.Append("~" + obsResItem.ItemOID);
                            dataItemCodes.Append("~" + obsResItem.ItemType);
                        }
                        else {
                            dataItemCodes.Append("^");
                            dataItemCodes.Append(obsResItem.ItemCode);
                            dataItemCodes.Append("~" + obsResItem.ItemName);
                            dataItemCodes.Append("~" + obsResItem.Version);
                            dataItemCodes.Append("~" + obsResItem.ItemOID);
                            dataItemCodes.Append("~" + obsResItem.ItemType);
                        }
                    }
                    else if (String.Compare(obsResItem.ItemType, "Result", StringComparison.InvariantCultureIgnoreCase) == 0) {
                        if (RdataItemCodes.Length == 0) {
                            RdataItemCodes.Append(obsResItem.ItemOID);
                        }
                        else {
                            RdataItemCodes.Append("^");
                            RdataItemCodes.Append(obsResItem.ItemOID);
                        }
                    }
                    else {
                        if (RequestItemCodes.Length == 0) {
                            RequestItemCodes.Append(obsResItem.ItemOID);
                            RequestItemCodes.Append("~" + obsResItem.ItemName);
                            RequestItemCodes.Append("~" + obsResItem.Version);
                            RequestItemCodes.Append("~" + obsResItem.ItemOID);
                            RequestItemCodes.Append("~" + obsResItem.ItemType);
                        }
                        else {
                            RequestItemCodes.Append("^");
                            RequestItemCodes.Append(obsResItem.ItemOID);
                            RequestItemCodes.Append("~" + obsResItem.ItemName);
                            RequestItemCodes.Append("~" + obsResItem.Version);
                            RequestItemCodes.Append("~" + obsResItem.ItemOID);
                            RequestItemCodes.Append("~" + obsResItem.ItemType);
                        }
                    }
                });
                if ((RequestItemCodes != null && RequestItemCodes.Length > 0) || (RdataItemCodes != null && RdataItemCodes.Length > 0) || (dataItemCodes != null && dataItemCodes.Length > 0))
                    CanlaunchChart = true;
                if (CanlaunchChart) {
                    let sArgs = String.Empty;
                    let itemname: string = String.Empty;
                    let itemSubType: string = String.Empty;
                    let itemToolTip: string = String.Empty;
                    let MCICompCnt: number = 0;
                    let sMCIComp: string[] = null;
                    if (!String.IsNullOrEmpty(Common.sMCitemName)) {
                        sMCIComp = Common.sMCitemName.Split('^');
                        if (sMCIComp != null && sMCIComp.length > 0)
                            MCICompCnt = sMCIComp.length;
                    }
                    if (!String.IsNullOrEmpty(Common.sItemSubtype) && String.Equals(Common.sItemSubtype, CConstants.ItemSubType)) {
                        itemname = Common.sDrugName;
                        itemToolTip = Common.sMCitemName;
                        itemSubType = Common.sItemSubtype;
                    }
                    else {
                        itemname = Common.sDrugName;
                    }
                    sArgs = "&PrescriptionItemOID=" + Common.lnPrescriptionOID + "&IdentifyingOID=" + Common.lnIdentifyingOID + "&IdentifyingType=" + Common.sIdentifyingType + "&MCVersionNo=" + Common.sMCVersion + "&PrescribedItem=" + itemname + "&ItemToolTip=" + itemToolTip + "&ItemSubType=" + itemSubType + "&PrescriptionType = ADMIN" + "&Observation=" + dataItemCodes.ToString() + "&Result=" + RdataItemCodes.ToString() + "&Request=" + RequestItemCodes.ToString();
                    Common.objObsResultVM = new ObservationChartVM();
                    let top:any = window.top;
                    if (top.msgAlert == true) {
                        ObjectHelper.stopFinishAndCancelEvent(false);
                    }
                    AppLoadService.LaunchWizard(Common._OnObsWizardClose, "MN_OBSERESULTCHAR_P2", sArgs, 2);
                }
                else {
                    oNoObservationandResultMsg.Show();
                    //oNoObservationandResultMsg.MessageBoxClose -= new EventHandler<MessageEventArgs>(Common.oNoObservationandResultMsg_MessageBoxClose);
                    oNoObservationandResultMsg.MessageBoxClose  = (s,e) => { Common.oNoObservationandResultMsg_MessageBoxClose(s,e); } ;
                    return
                }
            }
            else {
                oNoObservationandResultMsg.Show();
                //oNoObservationandResultMsg.MessageBoxClose -= new EventHandler<MessageEventArgs>(Common.oNoObservationandResultMsg_MessageBoxClose);
                oNoObservationandResultMsg.MessageBoxClose  = (s,e) => { Common.oNoObservationandResultMsg_MessageBoxClose(s,e); } ;
                return
            }
            Common.bIsShowMessage = false;
        }
        static ObservationCommonFinished(args: ChildWizardCloseEventargs): void {

        }
        static oNoObservationandResultMsg_MessageBoxClose(sender: Object, e: MessageEventArgs): void {
            if (e.MessageBoxResult == MessageBoxResult.OK) {
                Common.bIsShowMessage = false;
            }
        }
        public static IsRetrospectiveSlot(arg1 : InfusionTagObject | IChartSlot |  DateTime, sSlotStatus?: string): boolean{
            let ret_value: boolean = false;
            if(arguments.length ==2){
                if(arg1 instanceof DateTime && sSlotStatus){
                    ret_value = this.IsRetrospectiveSlot3(arg1,sSlotStatus);
                }

            }
            else if(arguments.length==1){
                if(arg1 instanceof InfusionTagObject){
                    ret_value = this.IsRetrospectiveSlot1(arg1);
                }
                else if(!(arg1 instanceof DateTime)){
                    ret_value = this.IsRetrospectiveSlot2(arg1);
                }
            }
            return ret_value;  
        }

        public static IsRetrospectiveSlot1(oInfusionTagObject: InfusionTagObject): boolean {
            let bResult: boolean = false;
            if (oInfusionTagObject != null) {
                let oINFRecordAdminParams: INFRecordAdminParams = ObjectHelper.CreateType<INFRecordAdminParams>(oInfusionTagObject.oChartCell.Tag, INFRecordAdminParams);
                if (oINFRecordAdminParams instanceof INFRecordAdminParams) {
                    bResult = this.IsRetrospectiveSlot(oINFRecordAdminParams.ScheduledDTTM, oINFRecordAdminParams.SlotStatus);
                }
            }
            return bResult;
        }
        public static IsRetrospectiveSlot2(oIChartSlot: IChartSlot): boolean {
            let bResult: boolean = false;
            if (oIChartSlot != null) {
                let oTagSlotDetail: TagSlotDetail = null;
                if (oIChartSlot instanceof DoseOverviewSlot) {
                    let oOverviewSlot: DoseOverviewSlot = ObjectHelper.CreateType<DoseOverviewSlot>(oIChartSlot, DoseOverviewSlot);
                    oTagSlotDetail = ObjectHelper.CreateType<TagSlotDetail>(oOverviewSlot.Tag, TagSlotDetail);
                    if (oTagSlotDetail instanceof TagSlotDetail) {
                        bResult = this.IsRetrospectiveSlot(oTagSlotDetail.SlotDateTime, oTagSlotDetail.SlotStatus);
                    }
                }
                else if (oIChartSlot instanceof AdministratedSlot) {
                    let oAdministratedSlot: AdministratedSlot = ObjectHelper.CreateType<AdministratedSlot>(oIChartSlot, AdministratedSlot);
                    oTagSlotDetail = ObjectHelper.CreateType<TagSlotDetail>(oAdministratedSlot.Tag, TagSlotDetail);
                    if (oTagSlotDetail instanceof TagSlotDetail) {
                        bResult = this.IsRetrospectiveSlot(oTagSlotDetail.SlotDateTime, oTagSlotDetail.SlotStatus);
                    }
                }
                else if (oIChartSlot instanceof DefaultSlot) {
                    let oDefaultSlot: DefaultSlot = ObjectHelper.CreateType<DefaultSlot>(oIChartSlot, DefaultSlot);
                    oTagSlotDetail = ObjectHelper.CreateType<TagSlotDetail>(oDefaultSlot.Tag, TagSlotDetail);
                    if (oTagSlotDetail instanceof TagSlotDetail) {
                        bResult = this.IsRetrospectiveSlot(oTagSlotDetail.SlotDateTime, oTagSlotDetail.SlotStatus);
                    }
                }
                else if (oIChartSlot instanceof TodayMultiSlot) {
                    bResult = true;
                }
                else if (oIChartSlot instanceof TodayAsRequiredSlot) {
                    bResult = true;
                }
            }
            return bResult;
        }
        public static IsRetrospectiveSlot3(dSlotDateTime: DateTime, sSlotStatus: string): boolean {
            if (String.Equals(sSlotStatus, SlotStatus.HOMELEAVE, StringComparison.CurrentCultureIgnoreCase)) {
                return false;
            }
            else if (String.IsNullOrEmpty(sSlotStatus) || String.Equals(sSlotStatus, SlotStatus.PLANNED, StringComparison.CurrentCultureIgnoreCase)) {
                if (MedChartData.SuspendedOn != DateTime.MinValue && dSlotDateTime <= MedChartData.SuspendedOn) {
                    return true;
                }
                return false;
            }
            else {
                if (MedChartData.SuspendedOn != DateTime.MinValue && dSlotDateTime <= MedChartData.SuspendedOn.AddMinutes(Convert.ToDouble(MedChartData.DuenessThreshold))) {
                    return true;
                }
                return false;
            }
        }
        public static AddSelItemIntoSFSQuickList(QuickListItemSrc: ObservableCollection<CListItem>, sValue: string, sDisplayText: string, sSFSType: string, SFSCtrl: iSFS): void {
            let nCount: number = QuickListItemSrc.Count;
            let IsItemExist: boolean = false;
            for (let i: number = 0; i < nCount; i++) {
                if (QuickListItemSrc.array[i].Value == sValue) {
                    IsItemExist = true;
                    break;
                }
            }
            if (!IsItemExist) {
                if (QuickListItemSrc.Count == SFSCtrl.MaxSize) {
                    QuickListItemSrc.RemoveAt(SFSCtrl.MaxSize - 1);
                }
                //QuickListItemSrc.Add(ObjectHelper.CreateObject(new CListItem(), { Value: sValue, DisplayText: sDisplayText }));
                let lstItems: List<SLSFSItem> = new List<SLSFSItem>();
                lstItems.Add(ObjectHelper.CreateObject(new SLSFSItem(), { DisplayText: sDisplayText, DisplayValue: sValue, Sfskey: sValue, Sfstype: sSFSType, Value: sValue}));
                // The below is not required. Adding item into QuickListItemSrc is enough and that will add 
                // the item into SFS control.
                SFSCtrl.AddSFSItems(lstItems);
            }
        }
        public static GetConceptCode(sTermText: string, oTerm: ObservableCollection<CValuesetTerm>): string {
            let sConceptCode: string = String.Empty;
            let tmpConceptCode: string = String.Empty;
            if (Common.IsTermTextExists(sTermText.Trim(), oTerm, (o) => { tmpConceptCode = o; }) != false)
                sConceptCode = tmpConceptCode;
            else sConceptCode = sTermText;
            return sConceptCode;
        }
        // public static IsTermTextExists(sTermText: string, objConceptCodes: ObservableCollection<CValuesetTerm>, sResultDetails: string): boolean {
        //     let bResult: boolean = false;
        //     sResultDetails = String.Empty;
        //     if (!String.IsNullOrEmpty(sTermText) && objConceptCodes != null) {
        //         let Results = from term in objConceptCodes
        //         where term.csDescription == sTermText
        //         select term.csCode;
        //         if (Results != null && Results.Count() > 0)
        //             sResultDetails = Results.First();
        //         bResult = !String.IsNullOrEmpty(sResultDetails);
        //     }
        //     return bResult;
        // }
        public static IsTermTextExists(sTermText: string, objConceptCodes: ObservableCollection<CValuesetTerm>, out1: (sResultDetails: string) => void): boolean {
            let sResultDetails: string;
            let bResult: boolean = false;
            sResultDetails = String.Empty;
            if (!String.IsNullOrEmpty(sTermText) && objConceptCodes != null) {
                // let Results = from term in objConceptCodes
                //             where term.csDescription == sTermText
                //             select term.csCode;
                let Results = objConceptCodes.Where(term =>term.csDescription==sTermText).Select(term => term.csCode);
                if (Results != null && Results.Count() > 0)
                    sResultDetails = Results.First();
                bResult = !String.IsNullOrEmpty(sResultDetails);
            }
            out1(sResultDetails);
            return bResult;
        }
        public static GetMedChartByPatorEnc(PatientOID: number, EncounterOID: number, GetMedChartInfoByPatOrEncCompleted: Function, IPlock: boolean): void {
            let objService: MedicationAdministrationWSSoapClient = new MedicationAdministrationWSSoapClient();
            objService.GetMedChartInfoByPatOrEncCompleted = (s,e)=>{GetMedChartInfoByPatOrEncCompleted(s,e)};
            let objReq: CReqMsgGetMedChartInfoByPatOrEnc = new CReqMsgGetMedChartInfoByPatOrEnc();
            objReq.oContextInformation = CommonBB.FillContext();
            objReq.oContextInformation.PageInfo = (IPlock != null && IPlock.HasValue && IPlock.Value) ? "1" : "0";
            objReq.lnPatinetOIDBC = PatientOID;
            objReq.lnEncounterOIDBC = EncounterOID;
            objService.GetMedChartInfoByPatOrEncAsync(objReq);
        }
        public static GetPatientInfo(): PatientObservationData {
            let oPatientObservationData: PatientObservationData = new PatientObservationData();
            let sHValue: string = String.Empty;
            let sFinalWTDate: string = String.Empty;
            let sWValue: string = String.Empty;
            let sFinalHTDate: string = String.Empty;
            let IsEstWT: boolean = false;
            let IsEstHT: boolean = false;
            PatientContext.BSA = String.Empty;
            PatientContext.BSAFormula = String.Empty;
            let WTValue: DateTime= DateTime.MinValue;
            let HTValue: DateTime= DateTime.MinValue;
            let oReturn: Object = HtmlPage.Window.Invoke("GetDataItemRecordedDateAdmin", null);
            if (oReturn != null && oReturn.ToString().length > 0) {
                let arrValues: string[] = oReturn.ToString().Split(',');
                if (arrValues.length > 1 && !String.IsNullOrEmpty(arrValues[0])) {
                    sWValue = arrValues[0];
                }
                if (arrValues.length > 1 && !String.IsNullOrEmpty(arrValues[1])) {
                    WTValue = Convert.ToDateTime(arrValues[1].trim());
                    sFinalWTDate = WTValue.ToString("dd-MMM-yyyy");
                    oPatientObservationData.DCWTRecordDTTM = new DateTime(WTValue.Year, WTValue.Month, WTValue.Day, WTValue.Hour, WTValue.Minute, 0);
                }
                if (arrValues.length > 1 && !String.IsNullOrEmpty(arrValues[2])) {
                    sHValue = arrValues[2];
                }
                if (arrValues.length > 1 && !String.IsNullOrEmpty(arrValues[3])) {
                    HTValue = Convert.ToDateTime(arrValues[3].trim());
                    sFinalHTDate = HTValue.ToString("dd-MMM-yyyy");
                    oPatientObservationData.DCHTRecordDTTM = new DateTime(HTValue.Year, HTValue.Month, HTValue.Day, HTValue.Hour, HTValue.Minute, 0);
                }
                if (DateTime.GreaterThan(oPatientObservationData.DCWTRecordDTTM , oPatientObservationData.DCHTRecordDTTM)) {
                    oPatientObservationData.LatHWUpdatedDTTM = oPatientObservationData.DCWTRecordDTTM;
                }
                else {
                    oPatientObservationData.LatHWUpdatedDTTM = oPatientObservationData.DCHTRecordDTTM;
                }
                if (arrValues.length > 1 && !String.IsNullOrEmpty(arrValues[4])) {
                    IsEstWT = Convert.ToBoolean(arrValues[4]);
                }
                if (arrValues.length > 1 && !String.IsNullOrEmpty(arrValues[5])) {
                    IsEstHT = Convert.ToBoolean(arrValues[5]);
                }
                if (String.IsNullOrEmpty(sWValue) && String.IsNullOrEmpty(sHValue)) {
                    let sbPatientInfo: StringBuilder = new StringBuilder();
                    sbPatientInfo.Append(MedsAdminChartToolTip.PatientWeightText);
                    sbPatientInfo.Append(" ");
                    sbPatientInfo.Append(MedsAdminChartToolTip.NotRecorded);
                    sbPatientInfo.Append(" ");
                    sbPatientInfo.Append(MedsAdminChartToolTip.PatientHeightText);
                    sbPatientInfo.Append(" ");
                    sbPatientInfo.Append(MedsAdminChartToolTip.NotRecorded);
                    sbPatientInfo.Append(" ");
                    sbPatientInfo.Append(MedsAdminChartToolTip.PatientBSAText);
                    oPatientObservationData.Observation = Convert.ToString(sbPatientInfo);
                }
                else if (!String.IsNullOrEmpty(sWValue) || !String.IsNullOrEmpty(sHValue)) {
                    let sbPatientInfo: StringBuilder = new StringBuilder();
                    sbPatientInfo.Append(MedsAdminChartToolTip.PatientWeightText);
                    sbPatientInfo.Append(" ");
                    sbPatientInfo.Append(sWValue);
                    if (IsEstWT) {
                        sbPatientInfo.Append("(Estimated)");
                    }
                    if (!String.IsNullOrEmpty(sFinalWTDate)) {
                        sbPatientInfo.Append("(");
                        sbPatientInfo.Append(sFinalWTDate);
                        sbPatientInfo.Append(") ");
                    }
                    else {
                        sbPatientInfo.Append(" ");
                        sbPatientInfo.Append(MedsAdminChartToolTip.NotRecorded);
                        sbPatientInfo.Append(" ");
                    }
                    sbPatientInfo.Append(MedsAdminChartToolTip.PatientHeightText);
                    sbPatientInfo.Append(" ");
                    sbPatientInfo.Append(sHValue);
                    if (IsEstHT) {
                        sbPatientInfo.Append("(Estimated)");
                    }
                    if (!String.IsNullOrEmpty(sFinalHTDate)) {
                        sbPatientInfo.Append("(");
                        sbPatientInfo.Append(sFinalHTDate);
                        sbPatientInfo.Append(") ");
                    }
                    else {
                        sbPatientInfo.Append(" ");
                        sbPatientInfo.Append(MedsAdminChartToolTip.NotRecorded);
                        sbPatientInfo.Append(" ");
                    }
                    sbPatientInfo.Append(MedsAdminChartToolTip.PatientBSAText);
                    let nPatientAge: number = 0;
                    Number.TryParse(PatientContext.PatientAge, (o) => { nPatientAge = o; });
                    if ((!IsEstHT && !IsEstWT) || (!String.IsNullOrEmpty(sWValue) && !IsEstWT)) {
                        if (IsEstHT && !IsEstWT) {
                            CommonBB.GetPatientBSA_ChartHeader(PatientContext.PatientOID, nPatientAge, String.Empty, sWValue);
                        }
                        else {
                            CommonBB.GetPatientBSA_ChartHeader(PatientContext.PatientOID, nPatientAge, sHValue, sWValue);
                        }
                    }
                    else {
                        if (Common.GBLoMedicationAdminVM != null) {
                            Common.GBLoMedicationAdminVM.ActivityConsideration.UpdateNode("SectionConsideration", "BSA", "BSA:", String.Empty, String.Empty, false, false, String.Empty, String.Empty);
                        }
                        if (Common.GBLoPrescriptionChartVM != null) {
                            Common.GBLoPrescriptionChartVM.ActivityConsideration.UpdateNode("SectionConsideration", "BSA", "BSA:", String.Empty, String.Empty, false, false, String.Empty, String.Empty);
                        }
                    }
                    oPatientObservationData.Observation = Convert.ToString(sbPatientInfo);
                }
                else if (!String.IsNullOrEmpty(sWValue)) {
                    let sbPatientInfo: StringBuilder = new StringBuilder();
                    sbPatientInfo.Append(MedsAdminChartToolTip.PatientWeightText);
                    sbPatientInfo.Append(" ");
                    sbPatientInfo.Append(sWValue);
                    sbPatientInfo.Append("(");
                    sbPatientInfo.Append(sFinalWTDate);
                    sbPatientInfo.Append(") ");
                    sbPatientInfo.Append(MedsAdminChartToolTip.PatientHeightText);
                    sbPatientInfo.Append(" ");
                    sbPatientInfo.Append(MedsAdminChartToolTip.NotRecorded);
                    sbPatientInfo.Append(" ");
                    sbPatientInfo.Append(MedsAdminChartToolTip.PatientBSAText);
                    oPatientObservationData.Observation = Convert.ToString(sbPatientInfo);
                }
                else if (!String.IsNullOrEmpty(sHValue)) {
                    let sbPatientInfo: StringBuilder = new StringBuilder();
                    sbPatientInfo.Append(MedsAdminChartToolTip.PatientWeightText);
                    sbPatientInfo.Append(" ");
                    sbPatientInfo.Append(MedsAdminChartToolTip.NotRecorded);
                    sbPatientInfo.Append(" ");
                    sbPatientInfo.Append(MedsAdminChartToolTip.PatientHeightText);
                    sbPatientInfo.Append(" ");
                    sbPatientInfo.Append(sHValue);
                    sbPatientInfo.Append("(");
                    sbPatientInfo.Append(sFinalHTDate);
                    sbPatientInfo.Append(") ");
                    sbPatientInfo.Append(MedsAdminChartToolTip.PatientBSAText);
                    oPatientObservationData.Observation = Convert.ToString(sbPatientInfo);
                }
            }
            return oPatientObservationData;
        }
        //TODO Gradient-Revisit
        public static SetSlotColorWithStripedLines(ScaleX: number, ScaleY: number) {
            // let oSlotColor: LinearGradientBrush = new LinearGradientBrush();
            // oSlotColor.StartPoint = new Point(0, 0);
            // oSlotColor.EndPoint = new Point(1, 1);
            // oSlotColor.SpreadMethod = GradientSpreadMethod.Repeat;
            // let GS1: GradientStop = new GradientStop();
            // GS1.Color = Color.FromArgb(255, 0, 255, 255);
            // GS1.Offset = 0;
            // let GS2: GradientStop = new GradientStop();
            // GS2.Color = Color.FromArgb(255, 0, 255, 255);
            // GS2.Offset = 0.5;
            // let GS3: GradientStop = new GradientStop();
            // GS3.Color = Colors.White;
            // GS3.Offset = 0.5;
            // let GS4: GradientStop = new GradientStop();
            // GS4.Color = Colors.White;
            // GS4.Offset = 1;
            // oSlotColor.GradientStops.Add(GS1);
            // oSlotColor.GradientStops.Add(GS2);
            // oSlotColor.GradientStops.Add(GS3);
            // oSlotColor.GradientStops.Add(GS4);
            // oSlotColor.RelativeTransform = ObjectHelper.CreateObject(new ScaleTransform(), { ScaleX: ScaleX, ScaleY: ScaleY });
            // return oSlotColor;
        }
        public static SetSlotColor(sSlotStatus: string, IsGreyedOut: boolean): SolidColorBrush {
            let oSlotColor: SolidColorBrush = new SolidColorBrush(Colors.Transparent);
            if (IsGreyedOut) {
                oSlotColor = new SolidColorBrush(Colors.Grey);
            }
            else {
                if (!String.IsNullOrEmpty(sSlotStatus)) {
                    switch (sSlotStatus) {
                        case SlotStatus.OVERDUE:
                        case SlotStatus.DEFEROVERDUE:
                        case SlotStatus.NOTYETRECORDED:
                            oSlotColor = new SolidColorBrush(MedChartData.OverDueSlotsColor);
                            break;
                        case SlotStatus.DUENOW:
                        case SlotStatus.DEFERDUENOW:
                            oSlotColor = new SolidColorBrush(MedChartData.DueSlotsColor);
                            break;
                    }
                }
            }
            return oSlotColor;
        }
        // public static GetSealDrugs(sSealImageList: string): string {
        //     let sSealRecordList: string = String.Empty;
        //     sSealImageList = String.Empty;
        //     let sDrugs: ScriptObject = ObjectHelper.CreateType<ScriptObject>(HtmlPage.Window.Invoke("GetSealDrugsData", null), ScriptObject);
        //     if (sDrugs != null) {
        //         sSealRecordList = sDrugs.GetProperty("SealRecordList").ToString();
        //         sSealImageList = sDrugs.GetProperty("SealImageList").ToString();
        //     }
        //     return sSealRecordList;
        // }
        public static GetSealDrugs(out1: (sSealImageList: string) => void): string {
            let sSealImageList: string;
            let sSealRecordList: string = String.Empty;
            sSealImageList = String.Empty;
            let sDrugs: ScriptObject = ObjectHelper.CreateType<ScriptObject>(HtmlPage.Window.Invoke("GetSealDrugsData", null), ScriptObject);
            if (sDrugs != null) {
                //sSealRecordList = sDrugs.GetProperty("SealRecordList").ToString();
                //sSealImageList = sDrugs.GetProperty("SealImageList").ToString();
            }
            out1(sSealImageList);
            return sSealRecordList;
        }
        public static GetSelectedItem(CListItemValue: string, CListItemList: ObservableCollection<CListItem>): CListItem {
            let oCListItem: CListItem = null;
            if (CListItemList != null && CListItemList.Count > 0 && !String.IsNullOrEmpty(CListItemValue)) {
                // let oSelectedItem = from oItem in CListItemList
                // where oItem.Value == CListItemValue
                // select oItem;
                let oSelectedItem = CListItemList.Where(oItem =>oItem.Value==CListItemValue).Select(oItem => oItem);
                if (oSelectedItem != null && oSelectedItem.Count() > 0) {
                    oCListItem = oSelectedItem.First();
                }
            }
            return oCListItem;
        }
         public static async LaunchFBChart(): Promise<void> {
            let EncounerOID: number = 0;
            let PatientOID: number = PatientContext.PatientOID;
            if (PatientContext.EncounterOid > 0)
                EncounerOID = PatientContext.EncounterOid;
            else EncounerOID = ChartContext.EncounterOID;
            let oParam: string[] = new Array(2);
            oParam[0] = PatientOID.ToString();
            oParam[1] = EncounerOID.ToString();
            await HtmlPage.Window.InvokeAsync("OpenFBChartView", oParam[0],oParam[1]);
        }
        public static IsPreviousSeqPresItemInprogress(oTagDrugHeaderDetail: TagDrugHeaderDetail, oDrugDetail: ObservableCollection<DrugDetail>): boolean {
            let _IsPreviousSeqInProgress: boolean = false;
            if ((String.Equals(oTagDrugHeaderDetail.INFTYCODE, InfusionTypesCode.CONTINUOUS) || String.Equals(oTagDrugHeaderDetail.INFTYCODE, InfusionTypesCode.FLUID) || String.Equals(oTagDrugHeaderDetail.INFTYCODE, InfusionTypesCode.SINGLEDOSEVOLUME)) && oTagDrugHeaderDetail.ParentPrescriptionItemOID > 0) {
                let _ParentPrescriptionOID = oTagDrugHeaderDetail.ParentPrescriptionItemOID;
                let _CurrentPrescriptionItemOID: number = oTagDrugHeaderDetail.PrescriptionItemOID;
                let _InfusionsPartOfSequence = oDrugDetail.Where(x => x.DrugHeader.FormViewParameters.IntravenousInfusionData.ParentPrescriptionItemOID == _ParentPrescriptionOID);
                if (_InfusionsPartOfSequence != null && _InfusionsPartOfSequence.Count() > 0) {
                    let _CurrentItemSequenceOrder: number = _InfusionsPartOfSequence.Where(x => x.DrugHeader.PrescriptionItemOID == _CurrentPrescriptionItemOID).FirstOrDefault().DrugHeader.FormViewParameters.IntravenousInfusionData.SeqInfOrderForPervImmediateItm;
                    let _PreviousImmediateItem: DrugDetail = null;
                    let _TmpPreviousImmediateItem = _InfusionsPartOfSequence.Where(x => x.DrugHeader.FormViewParameters.IntravenousInfusionData.SeqInfOrderForPervImmediateItm <= _CurrentItemSequenceOrder - 1 && x.SlotDetails != null && x.SlotDetails.Count > 0).OrderByDescending(x => x.DrugHeader.FormViewParameters.IntravenousInfusionData.SeqInfOrderForPervImmediateItm);
                    if (_TmpPreviousImmediateItem != null && _TmpPreviousImmediateItem.Count() > 0) {
                        _PreviousImmediateItem = _TmpPreviousImmediateItem.FirstOrDefault();
                    }
                    if (_PreviousImmediateItem != null && _PreviousImmediateItem.SlotDetails != null && _PreviousImmediateItem.SlotDetails.Count > 0) {
                        _IsPreviousSeqInProgress = _PreviousImmediateItem.SlotDetails.Any(slot => !String.IsNullOrEmpty(slot.Status) && (String.Equals(slot.Status, SlotStatus.DEFERADMIN, StringComparison.CurrentCultureIgnoreCase) || String.Equals(slot.Status, SlotStatus.DEFERDUENOW, StringComparison.CurrentCultureIgnoreCase) || String.Equals(slot.Status, SlotStatus.DEFEROVERDUE, StringComparison.CurrentCultureIgnoreCase) || String.Equals(slot.Status, SlotStatus.DUENOW, StringComparison.CurrentCultureIgnoreCase) || String.Equals(slot.Status, SlotStatus.OVERDUE, StringComparison.CurrentCultureIgnoreCase) || String.Equals(slot.Status, SlotStatus.NOTYETRECORDED, StringComparison.CurrentCultureIgnoreCase) || String.Equals(slot.Status, SlotStatus.PLANNED, StringComparison.CurrentCultureIgnoreCase) || String.Equals(slot.Status, SlotStatus.PAUSED, StringComparison.CurrentCultureIgnoreCase) || String.Equals(slot.Status, SlotStatus.INPROGRESS, StringComparison.CurrentCultureIgnoreCase) || String.Equals(slot.Status, SlotStatus.NOTKNOWN, StringComparison.CurrentCultureIgnoreCase) || String.Equals(slot.Status, SlotStatus.HOMELEAVE, StringComparison.CurrentCultureIgnoreCase)));
                    }
                }
            }
            return _IsPreviousSeqInProgress;
        }
        public static DSTTimeInChart(ChartStartDateTime: DateTime, ChartEndDateTime: DateTime, CurrentChart: ChartType): DateTime{
            let dtDST: DateTime= DateTime.MinValue;
            if (DateTime.LessThanOrEqualTo(ChartStartDateTime , ChartEndDateTime)) {
                let PreviousDay: DateTime= new DateTime(ChartStartDateTime.AddDays(-1).Ticks, DateTimeKind.Local);
                let NextDay: DateTime= new DateTime(ChartEndDateTime.AddDays(1).Ticks, DateTimeKind.Local);
                let IsInsideDSTZone: boolean = TimeZoneInfo.Local.IsDaylightSavingTime(PreviousDay);
                while (PreviousDay <= NextDay) {
                    if (TimeZoneInfo.Local.IsDaylightSavingTime(PreviousDay) != IsInsideDSTZone) {
                        PreviousDay = PreviousDay.AddDays(-1);
                        while (TimeZoneInfo.Local.IsDaylightSavingTime(PreviousDay) == IsInsideDSTZone) {
                            PreviousDay = PreviousDay.AddHours(1);
                        }
                        switch (CurrentChart) {
                            case ChartType.Medication_Chart:
                            case ChartType.Medication_Overview_Chart:
                            case ChartType.Prescription_Chart:
                                dtDST = (DateTime.GreaterThanOrEqualTo(PreviousDay.Date , ChartStartDateTime.Date) && DateTime.LessThanOrEqualTo(PreviousDay.Date , ChartEndDateTime.Date)) ? new DateTime(PreviousDay.Year, PreviousDay.Month, PreviousDay.Day, PreviousDay.Hour, PreviousDay.Minute, PreviousDay.Second, DateTimeKind.Unspecified) : DateTime.MinValue;
                                dtDST = (DateTime.GreaterThanOrEqualTo(PreviousDay.Date , ChartStartDateTime.Date) && DateTime.LessThanOrEqualTo(PreviousDay.Date , ChartEndDateTime.Date)) ? ((IsInsideDSTZone) ? dtDST.AddHours(1) : dtDST.AddHours(-1)) : DateTime.MinValue;
                                break;
                            case ChartType.Infusion_Chart:
                                ChartEndDateTime = ChartEndDateTime.AddSeconds(1);
                                dtDST = DateTime.GreaterThanOrEqualTo(PreviousDay , ChartStartDateTime) && DateTime.LessThanOrEqualTo(PreviousDay , ChartEndDateTime) ? new DateTime(PreviousDay.Year, PreviousDay.Month, PreviousDay.Day, PreviousDay.Hour, PreviousDay.Minute, PreviousDay.Second, DateTimeKind.Unspecified) : DateTime.MinValue;
                                dtDST = DateTime.GreaterThanOrEqualTo(PreviousDay , ChartStartDateTime) && DateTime.LessThanOrEqualTo(PreviousDay , ChartEndDateTime) ? ((IsInsideDSTZone) ? dtDST.AddHours(1) : dtDST.AddHours(-1)) : DateTime.MinValue;
                                break;
                            default:
                                dtDST = DateTime.MinValue;
                                break;
                        }
                        break;
                    }
                    else {
                        PreviousDay = PreviousDay.AddDays(1);
                    }
                }
            }
            return dtDST;
        }
        _CallbackMethod: Function;
        public InvokeDueAndOverDueStatusForClIndicator(CallbackMethod: Function): void {
            this._CallbackMethod = CallbackMethod;
            let oService: IPPMAManagePrescriptionWSSoapClient = new IPPMAManagePrescriptionWSSoapClient();
            let oParams: CMedStatusInClinicalIndicatorParams = new CMedStatusInClinicalIndicatorParams();
            oParams.PatientOID = PatientContext.PatientOID;
            oParams.EncounterOID = PatientContext.EncounterOid;
            oService.UpdateDueOverStatusForClinicalIndicatorCompleted  = (s,e) => { this.oService_UpdateDueOverStatusForClinicalIndicatorCompleted(s,e); } ;
            let oReq: CReqMsgUpdateDueOverStatusForClinicalIndicator = new CReqMsgUpdateDueOverStatusForClinicalIndicator();
            oReq.oContextInformation = CommonBB.FillContext();
            oReq.oCMedInClinicalIndicParamsBC = oParams;
            oService.UpdateDueOverStatusForClinicalIndicatorAsync(oReq);
        }
        oService_UpdateDueOverStatusForClinicalIndicatorCompleted(sender: Object, e: UpdateDueOverStatusForClinicalIndicatorCompletedEventArgs): void {
            if (this._CallbackMethod != null) {
                this._CallbackMethod(sender,e);
            }
        }
        public static IsLockedByAnyUser(): boolean {
            let _IscheckLocked: boolean = false;
            let _LockedUsersDetails: LockedUsersDetails;
            let IsLocked: boolean = MedicationCommonBB.IsLockedByAnotherUser(PrescriptionTypesMenuCode.Clerking, true, (o) => { _LockedUsersDetails = o; });
            if (_LockedUsersDetails != null && !String.IsNullOrEmpty(_LockedUsersDetails.WarningMessage)) {
                if (!String.IsNullOrEmpty(_LockedUsersDetails.ErrorCode) && String.Equals(_LockedUsersDetails.ErrorCode, CConstants.LockErrorcode, StringComparison.InvariantCultureIgnoreCase)) {
                    let msg: iMessageBox = new iMessageBox();
                    msg.Title = "Lorenzo";
                    msg.MessageButton = MessageBoxButton.OK;
                    msg.Message = _LockedUsersDetails.WarningMessage;
                    msg.Show();
                    _IscheckLocked = true;
                }
                else if (!String.IsNullOrEmpty(_LockedUsersDetails.ErrorCode) && String.Equals(_LockedUsersDetails.ErrorCode, CConstants.ReadOnlyErrorcode, StringComparison.InvariantCultureIgnoreCase)) {

                }
                else if (!String.IsNullOrEmpty(_LockedUsersDetails.ErrorCode) && String.Equals(_LockedUsersDetails.ErrorCode, CConstants.WarningErrorcode, StringComparison.InvariantCultureIgnoreCase)) {

                }
            }
            return _IscheckLocked;
        }
        public static GetInpatientMedMenucode(): string {
            let sMenuCode: string = String.Empty;
            if ((String.Compare(ChartContext.EncounterType, CConstants.OutpatientEncValue) == 0 || String.Compare(ChartContext.EncounterType, CConstants.AccAndEmerEncValue) == 0 || String.Compare(ChartContext.EncounterType, CConstants.ContactEncValue) == 0) || (String.Compare(ChartContext.EncounterType, CConstants.OutpatientEncText) == 0 || String.Compare(ChartContext.EncounterType, CConstants.AccAndEmerEncText) == 0 || String.Compare(ChartContext.EncounterType, CConstants.ContactEncText) == 0)) {
                sMenuCode = PrescriptionTypesMenuCode.ForAdministration;
            }
            else if ((String.Compare(ChartContext.EncounterType, CConstants.InpatientEncValue) == 0) || (String.Compare(ChartContext.EncounterType, CConstants.InaptientEncText) == 0)) {
                sMenuCode = PrescriptionTypesMenuCode.Inpatient;
            }
            return sMenuCode;
        }
    }
    export class MedsAdminCommonData {
        //public delegate void MedsAdminCommonDataDelegate();
        public MedsAdminCommonDataCompleted: Function;
        public CAMenucode: string = String.Empty;
        public sReviewPeriodListValue: string = String.Empty;
        IsStatOnceOnlyMessageFired: boolean = false;
        
        constructor() {

        }
        public GetProfileConfigData(): void {
            let oProfileFactory: ProfileFactoryType = new ProfileFactoryType();
            let lstProfileReq: List<ProfileContext> = new List<ProfileContext>();
            let objReq: ProfileContext = new ProfileContext();
            objReq.ContextCode = "VW_MEDICONFIG";
            objReq.ProfileItemKey = "MEDLINEDISPLAY";
            objReq.ProfileLevel = ProfileFactoryType.Level.Organisation;
            objReq.ProfileType = typeof(CMedicationLineDisplayData);
            lstProfileReq.Add(objReq);
            objReq = new ProfileContext();
            objReq.ContextCode = "MA_ADMINSETTING";
            objReq.ProfileItemKey = "MACLINICALINCFRMCFG";
            objReq.ProfileLevel = ProfileFactoryType.Level.Organisation;
            objReq.ProfileType = typeof(CClinicalIncidentConfig);
            lstProfileReq.Add(objReq);
            objReq = new ProfileContext();
            objReq.ContextCode = "MA_ADMINSETTING";
            objReq.ProfileItemKey = "MASLOTCHARCONFIG";
            objReq.ProfileLevel = ProfileFactoryType.Level.Organisation;
            objReq.ProfileType = typeof(CSlotCharacteristicsConfig);
            lstProfileReq.Add(objReq);
            objReq = new ProfileContext();
            objReq.ContextCode = "MA_ADMINSETTING";
            objReq.ProfileItemKey = "MACHARTDISPLAYCONFIG";
            objReq.ProfileLevel = ProfileFactoryType.Level.Organisation;
            objReq.ProfileType = typeof(CChartDisplayConfig);
            lstProfileReq.Add(objReq);
            objReq = new ProfileContext();
            objReq.ContextCode = "VW_MEDICONFIG";
            objReq.ProfileItemKey = "MEDVIEWCONFIG";
            objReq.ProfileLevel = ProfileFactoryType.Level.Organisation;
            objReq.ProfileType = typeof(MedicationViewConfigData);
            lstProfileReq.Add(objReq);
            objReq = new ProfileContext();
            objReq.ContextCode = "MA_ADMINSETTING";
            objReq.ProfileItemKey = "MACHARTSETTINGS";
            objReq.ProfileLevel = ProfileFactoryType.Level.Organisation;
            objReq.ProfileType = typeof(CChartSettingsConfig);
            lstProfileReq.Add(objReq);
            objReq = new ProfileContext();
            objReq.ContextCode = "VW_MEDICONFIG";
            objReq.ProfileItemKey = "INFUSIONPRESCONFIG";
            objReq.ProfileLevel = ProfileFactoryType.Level.User;
            objReq.ProfileType = typeof(InfusionPresConfigData);
            lstProfileReq.Add(objReq);
            objReq = new ProfileContext();
            objReq.ContextCode = "VW_MEDICONFIG";
            objReq.ProfileItemKey = "ADDPRESCRIBINGCONFIG";
            objReq.ProfileType = typeof(AddPrescribingConfigData);
            objReq.ProfileLevel = ProfileFactoryType.Level.Organisation;
            lstProfileReq.Add(objReq);
            objReq = new ProfileContext();
            objReq.ContextCode = "VW_MEDICONFIG";
            objReq.ProfileItemKey = "PRESCONFIG";
            objReq.ProfileType = typeof(PrescribingConfigData);
            objReq.ProfileLevel = ProfileFactoryType.Level.Organisation;
            lstProfileReq.Add(objReq);
            oProfileFactory.OnProfileListLoaded  = (s,e) => { this.oProfileFactory_OnProfileListLoaded(s,e); } ;
            oProfileFactory.GetProfilesData(lstProfileReq);
        }
        oProfileFactory_OnProfileListLoaded(sender: Object, Result: List<ProfileContext>): void {
            if (Result != null) {
                Result.forEach( (oProfileContext)=> {
                    if (oProfileContext.ContextCode == "VW_MEDICONFIG" && oProfileContext.ProfileItemKey == "MEDLINEDISPLAY") {
                        if (oProfileContext.ProfileData instanceof CMedicationLineDisplayData) {
                            MedicationCommonProfileData.MedLineDisplay = ObjectHelper.CreateType<CMedicationLineDisplayData>(oProfileContext.ProfileData, CMedicationLineDisplayData);
                        }
                    }
                    else if (oProfileContext.ContextCode == "MA_ADMINSETTING" && oProfileContext.ProfileItemKey == "MACLINICALINCFRMCFG") {
                        if (oProfileContext.ProfileData instanceof CClinicalIncidentConfig) {
                            ProfileData.ClinicalIncidentConfig = ObjectHelper.CreateType<CClinicalIncidentConfig>(oProfileContext.ProfileData, CClinicalIncidentConfig);
                        }
                    }
                    else if (oProfileContext.ContextCode == "MA_ADMINSETTING" && oProfileContext.ProfileItemKey == "MASLOTCHARCONFIG") {
                        if (oProfileContext.ProfileData instanceof CSlotCharacteristicsConfig) {
                            ProfileData.SlotCharacteristicsConfig = ObjectHelper.CreateType<CSlotCharacteristicsConfig>(oProfileContext.ProfileData, CSlotCharacteristicsConfig);
                            if (ProfileData.SlotCharacteristicsConfig != null) {
                                if (ProfileData.SlotCharacteristicsConfig.AdvDurationForRecording > 0) {
                                    MedChartData.AdvDurationForRecording = CommonBB.ConvertHourstoMinutes(ProfileData.SlotCharacteristicsConfig.AdvDurationForRecording);
                                }
                                if (ProfileData.SlotCharacteristicsConfig.DuenessThreshold > 0) {
                                    MedChartData.DuenessThreshold = CommonBB.ConvertHourstoMinutes(ProfileData.SlotCharacteristicsConfig.DuenessThreshold);
                                }
                                if (ProfileData.SlotCharacteristicsConfig.SlotModificationTime > 0) {
                                    MedChartData.SlotModificationTime = CommonBB.ConvertDaystoMinutes(ProfileData.SlotCharacteristicsConfig.SlotModificationTime);
                                }
                            }
                        }
                    }
                    else if (oProfileContext.ContextCode == "MA_ADMINSETTING" && oProfileContext.ProfileItemKey == "MACHARTDISPLAYCONFIG") {
                        if (oProfileContext.ProfileData instanceof CChartDisplayConfig) {
                            ProfileData.ChartDisplayConfig = ObjectHelper.CreateType<CChartDisplayConfig>(oProfileContext.ProfileData, CChartDisplayConfig);
                        }
                        if (ProfileData.ChartDisplayConfig != null) {
                            if (!String.IsNullOrEmpty(ProfileData.ChartDisplayConfig.AsRequiredSlotsColor)) {
                                MedChartData.AsRequiredSlotsColor = CommonBB.ToColor(ProfileData.ChartDisplayConfig.AsRequiredSlotsColor);
                            }
                            if (!String.IsNullOrEmpty(ProfileData.ChartDisplayConfig.DueSlotsColor)) {
                                MedChartData.DueSlotsColor = CommonBB.ToColor(ProfileData.ChartDisplayConfig.DueSlotsColor);
                            }
                            if (!String.IsNullOrEmpty(ProfileData.ChartDisplayConfig.OmittedSlotsColor)) {
                                MedChartData.OmittedSlotsColor = CommonBB.ToColor(ProfileData.ChartDisplayConfig.OmittedSlotsColor);
                            }
                            if (!String.IsNullOrEmpty(ProfileData.ChartDisplayConfig.OverDueSlotsColor)) {
                                MedChartData.OverDueSlotsColor = CommonBB.ToColor(ProfileData.ChartDisplayConfig.OverDueSlotsColor);
                            }
                            if (!String.IsNullOrEmpty(ProfileData.ChartDisplayConfig.TodayOutlineColor)) {
                                MedChartData.TodayOutlineColor = CommonBB.ToColor(ProfileData.ChartDisplayConfig.TodayOutlineColor);
                            }
                        }
                    }
                    else if (oProfileContext.ContextCode == "VW_MEDICONFIG" && oProfileContext.ProfileItemKey == "MEDVIEWCONFIG") {
                        if (oProfileContext.ProfileData instanceof MedicationViewConfigData) {
                            MedicationCommonProfileData.MedViewConfig = ObjectHelper.CreateType<MedicationViewConfigData>(oProfileContext.ProfileData, MedicationViewConfigData);
                        }
                    }
                    else if (oProfileContext.ContextCode == "MA_ADMINSETTING" && oProfileContext.ProfileItemKey == "MACHARTSETTINGS") {
                        if (oProfileContext.ProfileData instanceof CChartSettingsConfig) {
                            ProfileData.ChartSettingsConfig = ObjectHelper.CreateType<CChartSettingsConfig>(oProfileContext.ProfileData, CChartSettingsConfig);
                            if (ProfileData.ChartSettingsConfig != null && (ProfileData.ChartSettingsConfig.IvAdminAlertAfter > 0)) {
                                MedChartData.AdminIVAlertInHrs = (ProfileData.ChartSettingsConfig.IvAdminAlertAfter);
                            }
                            MedChartData.bAllowStockRequestByNurse = ProfileData.ChartSettingsConfig != null && ProfileData.ChartSettingsConfig.IsAllowSupplyReq;
                            MedChartData.AllowAnyUserForAdministration = ProfileData.ChartSettingsConfig == null || String.IsNullOrEmpty(ProfileData.ChartSettingsConfig.AllowAnyUserForAdministration) || ProfileData.ChartSettingsConfig.AllowAnyUserForAdministration.Equals("1", StringComparison.OrdinalIgnoreCase);
                        }
                        else MedChartData.AllowAnyUserForAdministration = true;
                    }
                    else if (String.Compare(oProfileContext.ContextCode, "VW_MEDICONFIG") == 0 && String.Compare(oProfileContext.ProfileItemKey, "INFUSIONPRESCONFIG") == 0) {
                        if (oProfileContext.ProfileData instanceof InfusionPresConfigData) {
                            ProfileData.InfusionPresConfig = ObjectHelper.CreateType<InfusionPresConfigData>(oProfileContext.ProfileData, InfusionPresConfigData);
                        }
                    }
                    else if (String.Compare(oProfileContext.ContextCode, "VW_MEDICONFIG") == 0 && String.Compare(oProfileContext.ProfileItemKey, "ADDPRESCRIBINGCONFIG") == 0) {
                        if (oProfileContext.ProfileData instanceof AddPrescribingConfigData) {
                            MedicationCommonProfileData.AddPrescribingConfig = ObjectHelper.CreateType<AddPrescribingConfigData>(oProfileContext.ProfileData, AddPrescribingConfigData);
                        }
                    }
                    else if (String.Compare(oProfileContext.ContextCode, "VW_MEDICONFIG") == 0 && String.Compare(oProfileContext.ProfileItemKey, "PRESCONFIG") == 0) {
                        if (oProfileContext.ProfileData instanceof PrescribingConfigData) {
                            MedicationCommonProfileData.PrescribeConfig = ObjectHelper.CreateType<PrescribingConfigData>(oProfileContext.ProfileData, PrescribingConfigData);
                        }
                    }
                });
            }
            let ConceptCodeValues: string = ValueDomain.PrescriptionItemStatus + "," + ValueDomain.DoseType + "," + ValueDomain.SlotStatus + "," + ValueDomain.ChartStatus + "," + ValueDomain.ReasonForNotDefer + "," + ValueDomain.ReasonforRecord + "," + ValueDomain.ReasonforModification + "," + ValueDomain.ReasonforDiscrepancy + "," + ValueDomain.IPPMAPrscTy + "," + ValueDomain.MedSite + "," + ValueDomain.MedAdmnMthd + "," + ValueDomain.MedClerk + "," + ValueDomain.MedSupp + "," + ValueDomain.MedDoseForm + "," + ValueDomain.MedTreatCont + "," + ValueDomain.EncTyp + "," + ValueDomain.ENCSTATUSVALUEDOMAINCODE + "," + ValueDomain.MedDbSa + "," + ValueDomain.MeddurationUOM + "," + ValueDomain.INFUSIONTYPE + "," + ValueDomain.ReasonforStop + "," + ValueDomain.ReasonforPause + "," + ValueDomain.INFUSIONACTIONS + "," + ValueDomain.Humidification + "," + ValueDomain.TITRATEDDOSEINSTRUCTION + "," + ValueDomain.MEDURGENCY;
            if (String.Compare(PatientContext.PrescriptionType, PrescriptionTypes.Clerking, StringComparison.OrdinalIgnoreCase) == 0) {
                ConceptCodeValues += "," + ValueDomain.MedClerk;
            }

            ProcessRTE.GetValuesByDomainCodes(ConceptCodeValues, (s,e)=>{this.OnRTEResult(s)});
            let DomainCodes: string = ValueDomain.SCANPATWBD + "," + ValueDomain.SCANMEDS;
            ProcessRTE.GetHierarchicalValuesByDomains(CConstants.CodingSchemeName, CConstants.Version, CConstants.FilterType, ContextInfo.Culture, DomainCodes, (s,e)=>{this.OnRTEResultForDomainsCodes(s)});
        }
        objService_GetMedChartInfoByPatOrEncCompleted(sender: Object, e: GetMedChartInfoByPatOrEncCompletedEventArgs): void {
            if (e.Error != null)
                return
            let objRes: CResMsgGetMedChartInfoByPatOrEnc = e.Result;
            if (objRes != null && objRes.MedChartData != null) {
                MedChartData.MedChartOID = objRes.MedChartData.OID;
                MedChartData.ChartStatus = objRes.MedChartData.ChartStatus;
                MedChartData.ServiceOID = objRes.MedChartData.ServiceOID;
                MedChartData.ActiveFrom = objRes.MedChartData.ActiveFrom.Date;
                MedChartData.ActiveTo = objRes.MedChartData.ActiveTo.Date;
                MedChartData.SuspendedOn = objRes.MedChartData.ActiveTo;
                MedChartData.bRequestMedicationEnable = objRes.MedChartData.IsReqMedEnable.Equals(CConstants.one);
                ChartContext.PatientOID = objRes.MedChartData.PatientOID > 0 ? objRes.MedChartData.PatientOID : PatientContext.PatientOID;
                if (objRes.MedChartData.MergedPatientOID > 0 && PatientContext.PatientOID > 0 && PatientContext.PatientOID != objRes.MedChartData.MergedPatientOID)
                    PatientContext.MergedPatientOID = objRes.MedChartData.MergedPatientOID;
                if (PatientContext.EncounterOid > 0) {
                    ChartContext.EncounterOID = PatientContext.EncounterOid;
                    ChartContext.EncounterType = PatientContext.EncounterType;
                }
                else {
                    ChartContext.EncounterOID = objRes.MedChartData.EncounterOID;
                    ChartContext.EncounterType = objRes.MedChartData.EncounterType;
                }
                MedChartData.LocationOID = objRes.MedChartData.LocationOID;
                if (!String.IsNullOrEmpty(objRes.MedChartData.EncounterStatus))
                    PatientContext.EncounterCode = objRes.MedChartData.EncounterStatus;
                if (String.Equals(MedChartData.ChartStatus, "CC_MACLOSED", StringComparison.InvariantCultureIgnoreCase)) {
                    PatientContext.EncounterCode = CConstants.ENCstatus;
                }
                if (objRes != null && objRes.MedChartData.ParentMedicationChart != null) {
                    MedChartDefaultData.MedChartOID = objRes.MedChartData.ParentMedicationChart.OID;
                    MedChartDefaultData.ChartStatus = objRes.MedChartData.ParentMedicationChart.ChartStatus;
                    MedChartDefaultData.ServiceOID = objRes.MedChartData.ParentMedicationChart.ServiceOID;
                    MedChartDefaultData.ActiveFrom = objRes.MedChartData.ParentMedicationChart.ActiveFrom.Date;
                    MedChartDefaultData.ActiveTo = objRes.MedChartData.ParentMedicationChart.ActiveTo.Date;
                    MedChartDefaultData.SuspendedOn = objRes.MedChartData.ParentMedicationChart.ActiveTo;
                    ChartContext.DefaultDataPatientOID = objRes.MedChartData.ParentMedicationChart.PatientOID;
                    MedChartDefaultData.MergedPatientOID = (objRes.MedChartData.ParentMedicationChart.MergedPatientOID > 0 && PatientContext.PatientOID > 0 && PatientContext.PatientOID != objRes.MedChartData.ParentMedicationChart.MergedPatientOID) ? objRes.MedChartData.ParentMedicationChart.MergedPatientOID : PatientContext.MergedPatientOID;
                    ChartContext.DefaultDataEncounterOID = objRes.MedChartData.ParentMedicationChart.EncounterOID;
                    ChartContext.DefaultDataEncounterType = objRes.MedChartData.ParentMedicationChart.EncounterType;
                    MedChartDefaultData.EncounterStatus = objRes.MedChartData.ParentMedicationChart.EncounterStatus;
                    MedChartDefaultData.LocationOID = objRes.MedChartData.ParentMedicationChart.LocationOID;
                }
                if (!String.IsNullOrEmpty(objRes.MedChartData.ReviewPeriodAletItems)) {
                    this.sReviewPeriodListValue = objRes.MedChartData.ReviewPeriodAletItems;
                }
                MedsAdminCommonData.FillEventsWithNotKnownStatus(objRes.MedChartData.EventsInNotKnownStatus);
                GetMedsChartData.InvokeWarning.subscribe(item => {
                    if (!MedChartData.IsMedChartReadOnly && !ChartContext.IsPrescribeLaunchFromChart) {
                        GetMedsChartData.bInvokeWarningUnsubscribe = false;
                        this.ShowEventsMessageBox();
                    }
                })
            }
            if (objRes != null && objRes.oContextInformation != null && objRes.oContextInformation.PageInfo.Equals("1") && MedChartData.MedChartOID > 0) {
                if (!String.IsNullOrEmpty(SLQueryCollection.GetQueryStringValue("MenuCode")) && String.Equals(SLQueryCollection.GetQueryStringValue("MenuCode"), "MN_MEDCHART_P2", StringComparison.InvariantCultureIgnoreCase)) {
                    let sResult: string = ObjectHelper.CreateType<string>(HtmlPage.Window.Invoke("CreatePessimisticLock", MedChartData.MedChartOID, "MAMedChart", Common.nLockDuration), 'string');
                }
                else if (!String.IsNullOrEmpty(SLQueryCollection.GetQueryStringValue("MenuCode")) && String.Equals(SLQueryCollection.GetQueryStringValue("MenuCode"), "MN_PRESCCHART_P2", StringComparison.InvariantCultureIgnoreCase)) {
                    let sResult: string = ObjectHelper.CreateType<string>(HtmlPage.Window.Invoke("CreatePessimisticLock", MedChartData.MedChartOID, "MAPrescriptionChart", Common.nLockDuration), 'string');
                }
            }
            if(AppLoadService.isChildWizard){
              MedChartData.PatinetInfo = Common.GetPatientInfo();
            }
            if (this.MedsAdminCommonDataCompleted != null)
                    this.MedsAdminCommonDataCompleted();
            GetMedsChartData.InvokeWarning.subscribe(item => {
                if (!String.IsNullOrEmpty(this.sReviewPeriodListValue) && !this.IsStatOnceOnlyMessageFired) {
                    GetMedsChartData.bInvokeWarningUnsubscribe = false;
                    this.ShowReviewAfterMessage(this.sReviewPeriodListValue); 
                }
            })
            let result: string = ObjectHelper.CreateType<string>(HtmlPage.Window.Invoke("ChkPatientTransferActivity", PatientContext.PatientOID, PatientContext.EncounterOid, MedChartData.MedChartOID), 'string');
            PatientContext.IsPatientTranferAct = result;
        
        }
        OnRTEResultForDomainsCodes(args: RTEEventargs): void {
            if (String.IsNullOrEmpty(args.Request) || args.Result == null)
                return
            if (args.Result instanceof Dictionary) {
                let objResult: Dictionary<string, List<CListItem>> = <Dictionary<string, List<CListItem>>>args.Result;
                objResult.forEach( (objDomainDetail)=> {
                    if (objDomainDetail.Value != null && objDomainDetail.Value.Count > 0) {
                        switch (objDomainDetail.Key) {
                            case ValueDomain.SCANPATWBD:
                                {
                                    ValueDomainValues.ScanPatWBOverrideReasons = new ObservableCollection<CListItem>();
                                    (<List<CListItem>>objDomainDetail.Value).forEach( (oCListItem)=> {
                                        ValueDomainValues.ScanPatWBOverrideReasons.Add(ObjectHelper.CreateObject(new CListItem(), { Value: oCListItem.Value, DisplayText: oCListItem.DisplayText, ConceptProperties: oCListItem.ConceptProperties }));
                                    });
                                    break;
                                }
                            case ValueDomain.SCANMEDS:
                                {
                                    ValueDomainValues.ScanMedOverrideReasons = new ObservableCollection<CListItem>();
                                    (<List<CListItem>>objDomainDetail.Value).forEach( (oCListItem)=> {
                                        ValueDomainValues.ScanMedOverrideReasons.Add(ObjectHelper.CreateObject(new CListItem(), { Value: oCListItem.Value, DisplayText: oCListItem.DisplayText, ConceptProperties: oCListItem.ConceptProperties }));
                                    });
                                    break;
                                }
                        }
                    }
                });
            }
        }
        OnRTEResult(args: RTEEventargs): void {
            if (String.IsNullOrEmpty(args.Request) || args.Result == null)
                return
            if (args.Result instanceof Dictionary) {
                let objResult: Dictionary<string, List<CListItem>> = <Dictionary<string, List<CListItem>>>args.Result;
                objResult.forEach( (objDomainDetail)=> {
                    if (objDomainDetail.Value != null && objDomainDetail.Value.Count > 0) {
                        switch (objDomainDetail.Key) {
                            case ValueDomain.PrescriptionItemStatus:
                                {
                                    ValueDomainValues.oPrescriptionItemStatus = new ObservableCollection<CValuesetTerm>();
                                    let nowInitialized: boolean = false;
                                    if (MedicationCommonConceptCodeData.ConceptCodes == null) {
                                        nowInitialized = true;
                                        MedicationCommonConceptCodeData.ConceptCodes = new ObservableCollection<CValuesetTerm>();
                                    }
                                    (<List<CListItem>>objDomainDetail.Value).forEach( (oCListItem)=> {
                                        let obj = ObjectHelper.CreateObject(new CValuesetTerm(), { csCode: oCListItem.Value, csDescription: oCListItem.DisplayText });
                                        ValueDomainValues.oPrescriptionItemStatus.Add(obj);
                                        if (nowInitialized)
                                            MedicationCommonConceptCodeData.ConceptCodes.Add(obj);
                                    });
                                    break;
                                }
                            case ValueDomain.DoseType:
                                {
                                    ValueDomainValues.oDoseType = new ObservableCollection<CValuesetTerm>();
                                    MedDoseTypeConceptCodeData.ConceptCodes = new Dictionary<string, string>();
                                    (<List<CListItem>>objDomainDetail.Value).forEach( (oCListItem)=> {
                                        ValueDomainValues.oDoseType.Add(ObjectHelper.CreateObject(new CValuesetTerm(), { csCode: oCListItem.Value, csDescription: oCListItem.DisplayText }));
                                        MedDoseTypeConceptCodeData.ConceptCodes.Add(oCListItem.Value.ToUpper(), oCListItem.DisplayText);
                                    });
                                    break;
                                }
                            case ValueDomain.SlotStatus:
                                {
                                    ValueDomainValues.oSlotStatus = new ObservableCollection<CValuesetTerm>();
                                    MedicationCommonConceptCodeData.MedAdminSlotStatus = new ObservableCollection<CValuesetTerm>();
                                    (<List<CListItem>>objDomainDetail.Value).forEach( (oCListItem)=> {
                                        ValueDomainValues.oSlotStatus.Add(ObjectHelper.CreateObject(new CValuesetTerm(), { csCode: oCListItem.Value, csDescription: oCListItem.DisplayText }));
                                        MedicationCommonConceptCodeData.MedAdminSlotStatus.Add(ObjectHelper.CreateObject(new CValuesetTerm(), { csCode: oCListItem.Value, csDescription: oCListItem.DisplayText }));
                                    });
                                    break;
                                }
                            case ValueDomain.ChartStatus:
                                {
                                    ValueDomainValues.oChartStatus = new ObservableCollection<CValuesetTerm>();
                                    (<List<CListItem>>objDomainDetail.Value).forEach( (oCListItem)=> {
                                        ValueDomainValues.oChartStatus.Add(ObjectHelper.CreateObject(new CValuesetTerm(), { csCode: oCListItem.Value, csDescription: oCListItem.DisplayText }));
                                    });
                                    break;
                                }
                            case ValueDomain.IPPMAPrscTy:
                                {
                                    ValueDomainValues.oIPPMAPrscTy = new ObservableCollection<CValuesetTerm>();
                                    (<List<CListItem>>objDomainDetail.Value).forEach( (oCListItem)=> {
                                        ValueDomainValues.oIPPMAPrscTy.Add(ObjectHelper.CreateObject(new CValuesetTerm(), { csCode: oCListItem.Value, csDescription: oCListItem.DisplayText }));
                                    });
                                    break;
                                }
                            case ValueDomain.MedSite:
                                {
                                    ValueDomainValues.oMedSite = new ObservableCollection<CValuesetTerm>();
                                    (<List<CListItem>>objDomainDetail.Value).forEach( (oCListItem)=> {
                                        ValueDomainValues.oMedSite.Add(ObjectHelper.CreateObject(new CValuesetTerm(), { csCode: oCListItem.Value, csDescription: oCListItem.DisplayText }));
                                    });
                                    break;
                                }
                            case ValueDomain.MedAdmnMthd:
                                {
                                    ValueDomainValues.oMedAdmnMthd = new ObservableCollection<CValuesetTerm>();
                                    (<List<CListItem>>objDomainDetail.Value).forEach( (oCListItem)=> {
                                        ValueDomainValues.oMedAdmnMthd.Add(ObjectHelper.CreateObject(new CValuesetTerm(), { csCode: oCListItem.Value, csDescription: oCListItem.DisplayText }));
                                    });
                                    break;
                                }
                            case ValueDomain.MedSupp:
                                {
                                    ValueDomainValues.oMedSupp = new ObservableCollection<CValuesetTerm>();
                                    (<List<CListItem>>objDomainDetail.Value).forEach( (oCListItem)=> {
                                        ValueDomainValues.oMedSupp.Add(ObjectHelper.CreateObject(new CValuesetTerm(), { csCode: oCListItem.Value, csDescription: oCListItem.DisplayText }));
                                    });
                                    break;
                                }
                            case ValueDomain.MedDoseForm:
                                {
                                    ValueDomainValues.oMedDoseForm = new ObservableCollection<CValuesetTerm>();
                                    (<List<CListItem>>objDomainDetail.Value).forEach( (oCListItem)=> {
                                        ValueDomainValues.oMedDoseForm.Add(ObjectHelper.CreateObject(new CValuesetTerm(), { csCode: oCListItem.Value, csDescription: oCListItem.DisplayText }));
                                    });
                                    break;
                                }
                            case ValueDomain.MedTreatCont:
                                {
                                    ValueDomainValues.oMedTreatCont = new ObservableCollection<CValuesetTerm>();
                                    (<List<CListItem>>objDomainDetail.Value).forEach( (oCListItem)=> {
                                        ValueDomainValues.oMedTreatCont.Add(ObjectHelper.CreateObject(new CValuesetTerm(), { csCode: oCListItem.Value, csDescription: oCListItem.DisplayText }));
                                    });
                                    break;
                                }
                            case ValueDomain.EncTyp:
                                {
                                    ValueDomainValues.oEncTyp = new ObservableCollection<CValuesetTerm>();
                                    (<List<CListItem>>objDomainDetail.Value).forEach( (oCListItem)=> {
                                        ValueDomainValues.oEncTyp.Add(ObjectHelper.CreateObject(new CValuesetTerm(), { csCode: oCListItem.Value, csDescription: oCListItem.DisplayText }));
                                    });
                                    break;
                                }
                            case ValueDomain.ENCSTATUSVALUEDOMAINCODE:
                                {
                                    ValueDomainValues.oENCSTATUSVALUEDOMAINCODE = new ObservableCollection<CValuesetTerm>();
                                    (<List<CListItem>>objDomainDetail.Value).forEach( (oCListItem)=> {
                                        ValueDomainValues.oENCSTATUSVALUEDOMAINCODE.Add(ObjectHelper.CreateObject(new CValuesetTerm(), { csCode: oCListItem.Value, csDescription: oCListItem.DisplayText }));
                                    });
                                    break;
                                }
                            case ValueDomain.MeddurationUOM:
                                {
                                    ValueDomainValues.oDurationUOM = new ObservableCollection<CValuesetTerm>();
                                    (<List<CListItem>>objDomainDetail.Value).forEach( (oCListItem)=> {
                                        ValueDomainValues.oDurationUOM.Add(ObjectHelper.CreateObject(new CValuesetTerm(), { csCode: oCListItem.Value, csDescription: oCListItem.DisplayText }));
                                    });
                                    break;
                                }
                            case ValueDomain.ReasonForNotDefer:
                            case ValueDomain.ReasonforRecord:
                            case ValueDomain.ReasonforModification:
                            case ValueDomain.ReasonforStop:
                            case ValueDomain.ReasonforPause:
                            case ValueDomain.ReasonforDiscrepancy:
                                {
                                    if (String.Compare(objDomainDetail.Key, ValueDomain.ReasonforDiscrepancy) == 0) {
                                        ValueDomainValues.oRecordAdminDoseDiscrepancyReasons = new ObservableCollection<CValuesetTerm>();
                                        (<List<CListItem>>objDomainDetail.Value).forEach( (oCListItem)=> {
                                            ValueDomainValues.oRecordAdminDoseDiscrepancyReasons.Add(ObjectHelper.CreateObject(new CValuesetTerm(), { csCode: oCListItem.Value, csDescription: oCListItem.DisplayText }));
                                        });
                                    }
                                    if (ValueDomainValues.oRecordAdminReasons == null) {
                                        ValueDomainValues.oRecordAdminReasons = new ObservableCollection<CValuesetTerm>();
                                        (<List<CListItem>>objDomainDetail.Value).forEach( (oCListItem)=> {
                                            ValueDomainValues.oRecordAdminReasons.Add(ObjectHelper.CreateObject(new CValuesetTerm(), { csCode: oCListItem.Value, csDescription: oCListItem.DisplayText }));
                                        });
                                    }
                                    else {
                                        (<List<CListItem>>objDomainDetail.Value).forEach( (oCListItem)=> {
                                            ValueDomainValues.oRecordAdminReasons.Add(ObjectHelper.CreateObject(new CValuesetTerm(), { csCode: oCListItem.Value, csDescription: oCListItem.DisplayText }));
                                        });
                                    }
                                    if (String.Equals(objDomainDetail.Key, ValueDomain.ReasonforRecord)) {
                                        ValueDomainValues.oReasonForNotGiven = new Dictionary<string, number>();
                                        let reasonNotGivenNumber: number = 0;
                                        (<List<CListItem>>objDomainDetail.Value).forEach( (oCListItem)=> {
                                            ValueDomainValues.oReasonForNotGiven.Add(oCListItem.Value, ++reasonNotGivenNumber);
                                        });
                                    }
                                    break;
                                }
                            case ValueDomain.MedDbSa:
                                {
                                    CommonDomainValues.BSAFormula = new ObservableCollection<CValuesetTerm>();
                                    objDomainDetail.Value.forEach( (oCListItem)=> {
                                        CommonDomainValues.BSAFormula.Add(ObjectHelper.CreateObject(new CValuesetTerm(), { csCode: oCListItem.Value, csDescription: oCListItem.DisplayText }));
                                    });
                                    break;
                                }
                            case ValueDomain.MedClerk:
                                {
                                    ValueDomainValues.MedicationClerking = new ObservableCollection<CValuesetTerm>();
                                    (<List<CListItem>>objDomainDetail.Value).forEach( (oCListItem)=> {
                                        ValueDomainValues.MedicationClerking.Add(ObjectHelper.CreateObject(new CValuesetTerm(), { csCode: oCListItem.Value, csDescription: oCListItem.DisplayText }));
                                    });
                                    break;
                                }
                            case ValueDomain.INFUSIONTYPE:
                                {
                                    if (InfusionTypeConceptCodeData.ConceptCodes == null) {
                                        InfusionTypeConceptCodeData.ConceptCodes = new ObservableCollection<CValuesetTerm>();
                                    }
                                    InfusionTypeConceptCodeData.ConceptCodes.Clear();
                                    (<List<CListItem>>objDomainDetail.Value).forEach( (oCListItem)=> {
                                        InfusionTypeConceptCodeData.ConceptCodes.Add(ObjectHelper.CreateObject(new CValuesetTerm(), { csCode: oCListItem.Value, csDescription: oCListItem.DisplayText }));
                                    });
                                    break;
                                }
                            case ValueDomain.INFUSIONACTIONS:
                                {
                                    if (InfActionsConceptCodeData.ConceptCodes == null)
                                        InfActionsConceptCodeData.ConceptCodes = new ObservableCollection<CValuesetTerm>();
                                    (<List<CListItem>>objDomainDetail.Value).forEach( (oCListItem)=> {
                                        InfActionsConceptCodeData.ConceptCodes.Add(ObjectHelper.CreateObject(new CValuesetTerm(), { csCode: oCListItem.Value, csDescription: oCListItem.DisplayText }));
                                    });
                                    break;
                                }
                            case ValueDomain.Humidification:
                                {
                                    if (ValueDomainValues.oHumidification == null)
                                        ValueDomainValues.oHumidification = new ObservableCollection<CValuesetTerm>();
                                    (<List<CListItem>>objDomainDetail.Value).forEach( (oCListItem)=> {
                                        ValueDomainValues.oHumidification.Add(ObjectHelper.CreateObject(new CValuesetTerm(), { csCode: oCListItem.Value, csDescription: oCListItem.DisplayText }));
                                    });
                                    break;
                                }
                            case ValueDomain.TITRATEDDOSEINSTRUCTION:
                                {
                                    if (TitratedDoseInstructions.ConceptCodes == null) {
                                        TitratedDoseInstructions.ConceptCodes = new ObservableCollection<CListItem>();
                                    }
                                    TitratedDoseInstructions.ConceptCodes.Clear();
                                    (<List<CListItem>>objDomainDetail.Value).forEach( (oCListItem)=> {
                                        TitratedDoseInstructions.ConceptCodes.Add(ObjectHelper.CreateObject(new CListItem(), { Value: oCListItem.Value, DisplayText: oCListItem.DisplayText }));
                                    });
                                    break;
                                }
                            case ValueDomain.MEDURGENCY:
                                {
                                    RequestUrgency.ConceptCodes = new Dictionary<string, string>();
                                    (<List<CListItem>>objDomainDetail.Value).forEach( (oCListItem)=> {
                                        RequestUrgency.ConceptCodes.Add(oCListItem.Value, oCListItem.DisplayText);
                                    });
                                    break;
                                }
                        }
                    }
                });
            }
            if (String.Equals(this.CAMenucode, "MN_OBSERESULTCHAR_P2", StringComparison.CurrentCultureIgnoreCase)) {
                if (this.MedsAdminCommonDataCompleted != null)
                    this.MedsAdminCommonDataCompleted();
            }
            else {
                Common.GetMedChartByPatorEnc(PatientContext.PatientOID, PatientContext.EncounterOid , (s,e) =>{ this.objService_GetMedChartInfoByPatOrEncCompleted(s,e) }, false);      
            }
        }
        public GetMedChartOID(IPlock: boolean): void {
            Common.GetMedChartByPatorEnc(PatientContext.PatientOID, PatientContext.EncounterOid , (s,e) =>{ this.objService_GetMedChartInfoByPatOrEncCompleted(s,e)}  , IPlock);
        }
        public static FillEventsWithNotKnownStatus(EventsInNotKnownStatus: ObservableCollection<string>): void {
            MedChartData.ListOfEventsWithNotKnownStatus = new List<EventsWithNotKnownStatus>();
            if (EventsInNotKnownStatus != null) {
                EventsInNotKnownStatus.forEach( (_item)=> {
                    let ResponseItem: string[] = _item.Split('~');
                    if (ResponseItem != null && ResponseItem.length > 2) {
                        let oEventsWithNotKnownStatus: EventsWithNotKnownStatus = new EventsWithNotKnownStatus(Convert.ToInt64(ResponseItem[1]), Convert.ToInt32(ResponseItem[0]), ResponseItem[2]);
                        MedChartData.ListOfEventsWithNotKnownStatus.Add(oEventsWithNotKnownStatus);
                    }
                });
            }
        }
        ShowReviewAfterMessage(sListValue: string): void {
            if (!String.IsNullOrEmpty(sListValue)) {
                if (sListValue.Contains(",*~")) {
                   let items :string[]= sListValue.Split(",*~");
                   sListValue = String.Join("\n -",items );
                    sListValue = "\n\n - " + sListValue;
                }
                else {
                    sListValue = "\n\n - " + sListValue;
                }
            }
            let reviewmsgBox: iMessageBox = new iMessageBox();
            reviewmsgBox.Height = 170;
            reviewmsgBox.Width = 350;
            reviewmsgBox.Title = "LORENZO";
            let suffixMsg: string = String.Empty;
            if (this.CAMenucode == "MN_PRESCCHART_P2")
                suffixMsg = Resource.MedicationChart.ReviewItemsSufmsg;
            else suffixMsg = Resource.MedicationChart.ReviewItemsMedChartSufmsg;
            reviewmsgBox.Message = Resource.MedicationChart.ReviewItemsMedChartPrefmsg + suffixMsg + " " + sListValue;
            reviewmsgBox.IconType = MessageBoxType.Exclamation;
            reviewmsgBox.MessageButton = MessageBoxButton.OK;
            reviewmsgBox.MessageBoxClose = (s,e) =>{this.reviewmsgBox_msgboxclose(s,e);}
            reviewmsgBox.Show();
            // ObjectHelper.stopFinishAndCancelEvent(true);
            GetMedsChartData.bInvokeWarningUnsubscribe = true;
            GetMedsChartData.InvokeWarning.unsubscribe();
        
        }
        reviewmsgBox_msgboxclose(
            sender: Object,
            e: MessageEventArgs
          ): void {
            // ObjectHelper.stopFinishAndCancelEvent(false);
          }
        ShowEventsMessageBox(): void {
            let _OnceOnly: string = "FRC-002";
            if (!String.IsNullOrEmpty(Common.Frc002Childs))
                _OnceOnly = Common.Frc002Childs;
            let _StatOnly: string = "FRC-003";
            if (!String.IsNullOrEmpty(Common.Frc003Childs))
                _StatOnly = Common.Frc003Childs;
            if (MedChartData.ListOfEventsWithNotKnownStatus != null && MedChartData.ListOfEventsWithNotKnownStatus.Where(x => !String.IsNullOrEmpty(x.DrugFrequency) && (_OnceOnly.Contains(x.DrugFrequency) || _StatOnly.Contains(x.DrugFrequency))).Count() > 0) {
                // let _StoreToken: string = "AppMedNotKnownAlertInstance";
                let _CurrentSecurityToken: string = ContextInfo.SecurityToken;
                let _CurrentPatientOID: number = PatientContext.PatientOID;
                let keyToken = _CurrentSecurityToken + '~~' + _CurrentPatientOID + '|';
                let top:any = window.top;
                let tokenValue = top.GetMainApp().ippmatokenlist;
                if (tokenValue == undefined || tokenValue == null) {
                    tokenValue = "";
                }
                console.log('tokenvalue',tokenValue,keyToken);
                
                if (tokenValue.indexOf(keyToken) > -1) {
                    return 
                }else{
                    tokenValue = tokenValue + keyToken; 
                    top.GetMainApp().ippmatokenlist = tokenValue;
                }
                // let app: IsolatedStorageSettings = IsolatedStorageSettings.ApplicationSettings;
                // let _oDictionary: Dictionary<string, List<number>> = new Dictionary<string, List<number>>();
                // if (app.Contains(_StoreToken)) {
                //     let CheckStoreToken: boolean = app.TryGetValue(_StoreToken, (o) => { _oDictionary = o; });
                //     if (CheckStoreToken) {
                //         if (_oDictionary.ContainsKey(_CurrentSecurityToken)) {
                //             if (_oDictionary.Any(x => x.Value.Contains(_CurrentPatientOID))) {
                //                 return
                //             }
                //             else {
                //                 _oDictionary[_CurrentSecurityToken].Add(_CurrentPatientOID);
                //                 app.Remove(_StoreToken);
                //                 app.Add(_StoreToken, _oDictionary);
                //             }
                //         }
                //         else {
                //             let _lstPatientOID: List<number> = new List<number>();
                //             _lstPatientOID.Add(_CurrentPatientOID);
                //             _oDictionary.Add(_CurrentSecurityToken, _lstPatientOID);
                //             app.Remove(_StoreToken);
                //             app.Add(_StoreToken, _oDictionary);
                //         }
                //     }
                // }
                // else {
                //     let _lstPatientOID: List<number> = new List<number>();
                //     _lstPatientOID.Add(_CurrentPatientOID);
                //     _oDictionary.Add(_CurrentSecurityToken, _lstPatientOID);
                //     app.Add(_StoreToken, _oDictionary);
                // }
                let EventsWithUnKnownStatusNotificationWindow: iMessageBox = new iMessageBox();
                EventsWithUnKnownStatusNotificationWindow.Height = 170;
                EventsWithUnKnownStatusNotificationWindow.Width = 350;
                EventsWithUnKnownStatusNotificationWindow.Title = "LORENZO";
                let _message: StringBuilder = new StringBuilder();
                _message.Append("This patient has one or more STAT/Once only prescriptions that have not been recorded as administered or not. Please review these medications and update as necessary.");
                this.IsStatOnceOnlyMessageFired = true;
                EventsWithUnKnownStatusNotificationWindow.Message = _message.ToString();
                EventsWithUnKnownStatusNotificationWindow.IconType = MessageBoxType.Exclamation;
                EventsWithUnKnownStatusNotificationWindow.MessageButton = MessageBoxButton.OK;
                EventsWithUnKnownStatusNotificationWindow.MessageBoxClose  = (s,e) => { this.EventsWithUnKnownStatusNotificationWindow_MessageBoxClose(s,e); } ;
                EventsWithUnKnownStatusNotificationWindow.Show();
            }
        }
        EventsWithUnKnownStatusNotificationWindow_MessageBoxClose(sender: Object, e: MessageEventArgs): void {
            if (!String.IsNullOrEmpty(this.sReviewPeriodListValue)) {
                this.ShowReviewAfterMessage(this.sReviewPeriodListValue);
            }
        }
    }
    export class PatientObservationData {
        public Weight: number;
        public WeightUOM: string;
        public WeightRecordDTTM: DateTime;
        public Height: number;
        public HeightUOM: string;
        public HeightRecordDTTM: DateTime;
        public Observation: string;
        public LatHWUpdatedDTTM: DateTime;
        public DCWTRecordDTTM: DateTime;
        public DCHTRecordDTTM: DateTime;
        public LeastPresIemDCRecordedDTTM: DateTime;
    }
    export enum ActivityCode {
        None,

        RecordAdmin
    }
    export class EventsWithNotKnownStatus {
        public PrescriptionItemOID: number;
        public STCode: number;
        public DrugFrequency: string;
        constructor(PrescriptionItemOID: number, STCode: number, DrugFrequency: string) {
            this.PrescriptionItemOID = PrescriptionItemOID;
            this.STCode = STCode;
            this.DrugFrequency = DrugFrequency;
        }
    }
