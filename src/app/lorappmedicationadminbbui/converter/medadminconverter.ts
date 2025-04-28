import { Component, OnInit } from '@angular/core';
import { StringBuilder, ProfileFactoryType, ContextManager, Convert, AppActivity } from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp, Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison, AppDialogEventargs, AppDialogResult, DelegateArgs, DialogComponentArgs, WindowButtonType, ObservableCollection, CultureInfo, Visibility } from 'epma-platform/models';
import { AppDialog, BitmapImage, Color, Colors, Cursors, FontFamily, FontStyles, FontWeights, Grid, HorizontalAlignment, Image, SolidColorBrush, StackPanel, Stretch, Style, TextAlignment, TextBlock, TextWrapping, Thickness, ToolTipService, Uri, UriKind, VerticalAlignment, WrapPanel, iLabel, iLabelInLineElement } from 'epma-platform/controls';
import { HelperService } from 'epma-platform/soapclient';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
import { CConstants, DoseTypeCode, MedImage, MedImages, MultiRouteType, PrescriptionItmTyp, RecordAdminType, SlotStatus, SlotStatusText } from '../utilities/CConstants';
import { MedsAdminChartToolTip } from '../resource/medsadmincharttooltip.designer';
import { SlotDetailVM } from '../viewmodel/MedicationChartVM';
import { ColumnDefinition, RowDefinition } from 'src/app/shared/epma-platform/controls/epma-grid/epma-grid.component';
import { Orientation } from 'src/app/shared/epma-platform/controls-model/Orientation';
import { TagDrugHeaderDetail, ValueDomainValues } from '../utilities/globalvariable';
import { CommonBB } from 'src/app/lorappcommonbb/utilities/common';
import { Common } from '../utilities/common';
import { CMedicationLineDisplayData, LineDisplayConfigurations } from 'src/app/lorappslprofiletypes/medication';
import { CDrugHdrAddnlInfo, CDrugHeader, DrugHeaderItem } from '../common/drugheader';
import { InfusionTypeConceptCodeData, MedicationCommonProfileData } from 'src/app/lorappmedicationcommonbb/utilities/profiledata';
import { Environment, NotImplementedException, Type } from 'src/app/product/shared/models/Common';
import { DrugItemSubTypeCode, InfusionTypeCode } from 'src/app/lorappmedicationcommonbb/utilities/constants';
import { ArrayOfString } from 'src/app/shared/epma-platform/soap-client/MedicationAdministrationWS';
import { App } from 'src/app/shared/epma-platform/controls/ResourceStyle';
import { Resource } from '../resource';
import { GridLength, GridUnitType } from 'src/app/shared/epma-platform/controls/GridExt';
import { PrescriptionItemViewVM } from '../viewmodel/PrescriptionItemViewVM';
import { MedRequestVM } from '../viewmodel/MedicationRequestVM';
import { PGDListVM } from '../viewmodel/pgdvm';
import { prescribedrugs } from 'src/app/lorappmedicationcommonbb/resource/prescribedrugs.designer';
import { MedScanRecAdmVM } from '../viewmodel/MedScanRecAdmVM';
import * as CommonMedicationConvertor from 'src/app/lorappmedicationcommonbb/converter/medicationconverters';
import { Inline } from 'src/app/shared/epma-platform/index.chart';
import { Binding } from 'src/app/shared/epma-platform/controls/FrameworkElement';
import { InfrecordadminVM } from '../viewmodel/InfrecordadminVM';
//import { InfrecordadminVM } from '../viewmodel/InfrecordadminVM';

export class FontWeightGridColumn {
    public Convert(value: any, targetType: Type, parameter: any, culture: CultureInfo): any {
        let date: DateTime = value;
        if (DateTime.GreaterThan(date.Date, CommonBB.GetServerDateTime().Date))
            return FontWeights.Normal;
        else return FontWeights.Bold;
    }
    public ConvertBack(value: any, targetType: Type, parameter: any, culture: CultureInfo): any {
        return null;
    }
}
export class DTTMDisplay {
    public Convert(value: any, targetType: Type, parameter: any, culture: CultureInfo): any {
        let date: DateTime = value;
        if (date.Year >= 1753)
            return date.ToString(parameter.ToString());
        else return String.Empty;
    }
    public ConvertBack(value: any, targetType: Type, parameter: any, culture: CultureInfo): any {
        if (value != null && !String.IsNullOrEmpty(value.ToString()))
            return DateTime.ParseExact(value.ToString(), parameter.ToString(), culture);
        else return DateTime.MinValue;
    }
}
export class DisplayMultiSlotDetail {
    public Convert(value: any, targetType: Type, parameter: any, culture: CultureInfo): any {
        let cntControl: Grid = null;
        if (value instanceof SlotDetailVM) {
            let objMultiSlotVM: SlotDetailVM = ObjectHelper.CreateType<SlotDetailVM>(value, SlotDetailVM);
            cntControl = MultiSlotDetail.GetMultiSlotData(objMultiSlotVM);
        }
        return cntControl;
    }
    public ConvertBack(value: any, targetType: Type, parameter: any, culture: CultureInfo): any {
        return value;
    }
}
export class MultiSlotDetail {
    private static GetMultiSlotAdminCommentIcon(sAdminComments: string): Image {
        let imgComment: Image = new Image();
        imgComment.Source = new BitmapImage(new Uri(MedImage.GetPath(MedImages.AdminCommentsIcon), UriKind.RelativeOrAbsolute));
        imgComment.Stretch = Stretch.None;
        imgComment.Margin = new Thickness(0, 0, -1, -1);
        ToolTipService.SetToolTip(imgComment, ObjectHelper.CreateObject(new iLabel(), { Text: MedsAdminChartToolTip.CommentsToolTip + ": " + sAdminComments, IsWordwrap: true, Width: 250 }));
        return imgComment;
    }
    private static GetMultiSlotWrappedContentTooltip(sToolTip: string, sAdminComments: string): iLabel {
        return ObjectHelper.CreateObject(new iLabel(), { Text: sToolTip + "\n" + MedsAdminChartToolTip.CommentsToolTip + ": " + sAdminComments, IsWordwrap: true, Width: 250 });
    }
    public static GetMultiSlotData(oSlotDetail: SlotDetailVM): Grid {
        let oLayout: Grid = new Grid();
        oLayout.RowDefinitions.Add(new RowDefinition());
        let tbDoseValue: iLabel = new iLabel();
        let oColumnDefinition: ColumnDefinition = new ColumnDefinition();
        // oColumnDefinition.MinWidth = 243;
        oLayout.ColumnDefinitions.Add(oColumnDefinition);
        if (oSlotDetail.IsLastPRN && oSlotDetail.AdministrationDetail == null) {
            oLayout.ColumnDefinitions.Add(new ColumnDefinition());
            let spImages: StackPanel = ObjectHelper.CreateObject(new StackPanel(), { Orientation: Orientation.Horizontal, Margin: new Thickness(2), Name: "ImagePanel", HorizontalAlignment: HorizontalAlignment.Right });
            oLayout.Children.Add(spImages);
            Grid.SetColumn(spImages, 2);
            let img1: Image = new Image();
            img1.Stretch = Stretch.None;
            let imgCumulative: Image = MultiSlotDetail.CheckAndLoadCumulativeIcon(oSlotDetail);
            if (imgCumulative != null)
                spImages.Children.Add(imgCumulative);
            if (DateTime.Equals(oSlotDetail.CurrentServerDate.Date, oSlotDetail.TodaySlotDate.Date) && !oSlotDetail.IsNextPRNAllowed) {
                img1.Source = new BitmapImage(new Uri(MedImage.GetPath(MedImages.PRNAdminTimeIcon), UriKind.RelativeOrAbsolute));
                ToolTipService.SetToolTip(img1, MedsAdminChartToolTip.LockPRNToolTip);
                oSlotDetail.SubscribeLockIconClickEvent(img1);
            }
            else {
                img1.Source = new BitmapImage(new Uri(MedImage.GetPath(MedImages.PRNSlotIcon), UriKind.RelativeOrAbsolute));
                ToolTipService.SetToolTip(img1, MedsAdminChartToolTip.RecordPRNAdminToolTip);
                oSlotDetail.SubscribeAddClickEvent(img1);
            }
            img1.Tag = oSlotDetail.DrugDetail;
            spImages.Children.Add(img1);
        }
        else {
            let strDose: string = String.Empty;
            let strDoseForPRN: string = String.Empty;
            if (!String.IsNullOrEmpty(oSlotDetail.AdminMethod)) {
                strDose = oSlotDetail.AdminMethod;
            }
            else if (oSlotDetail.AdministrationDetail != null && oSlotDetail.AdministrationDetail.MedAdminOID > 0) {
                if (!String.IsNullOrEmpty(oSlotDetail.AdministrationDetail.Dose) && !String.IsNullOrEmpty(oSlotDetail.AdministrationDetail.strDoseUOM)) {
                    strDose = oSlotDetail.AdministrationDetail.Dose + " " + oSlotDetail.AdministrationDetail.strDoseUOM;
                }
                else if (!String.IsNullOrEmpty(oSlotDetail.AdministrationDetail.Dose)) {
                    strDose = oSlotDetail.AdministrationDetail.Dose;
                }
                else if (!String.IsNullOrEmpty(oSlotDetail.AdministrationDetail.strDoseUOM)) {
                    strDose = oSlotDetail.AdministrationDetail.strDoseUOM;
                }
            }
            else {
                if (oSlotDetail.DrugDetail != null && !String.IsNullOrEmpty(oSlotDetail.DrugDetail.Dose)) {
                    strDose = oSlotDetail.DrugDetail.Dose;
                }
            }
            if (oSlotDetail.IsLaunchprnFromPresChart && oSlotDetail.AdministrationDetail != null && oSlotDetail.AdministrationDetail.MedAdminOID > 0 && !String.IsNullOrEmpty(oSlotDetail.AdministeredRoute)) {
                if (!String.IsNullOrEmpty(strDose)) {
                    strDoseForPRN = strDose + "  " + CConstants.RouteText + CConstants.sHyphen + oSlotDetail.AdministeredRoute;
                }
                else {
                    strDoseForPRN = CConstants.RouteText + CConstants.sHyphen + oSlotDetail.AdministeredRoute;
                }
            }
            let strDueAt: string = oSlotDetail.ScheduledDTTM.ToUserDateTimeString(CConstants.DateTimeFormat);
            let strAdminAt: string = oSlotDetail.AdministrationDetail.AdministeredDate.ToUserDateTimeString(CConstants.DateTimeFormat);
            let strAdminBy: string = oSlotDetail.AdministrationDetail.AdministeredBy;
            let strRelationshipToPatient: string = oSlotDetail.AdministrationDetail.PersonalCarerRelationship;
            let strRecordAt: string = oSlotDetail.AdministrationDetail.RecordedAt.ToUserDateTimeString(CConstants.DateTimeFormat);
            let strRecordBy: string = oSlotDetail.AdministrationDetail.RecordedBy;
            let strReason: string = String.Empty;
            let strReasonCode: string = String.Empty;
            if (oSlotDetail.AdministrationDetail.ReasonNotGiven != null) {
                strReason = oSlotDetail.AdministrationDetail.ReasonNotGiven.DisplayText;
                strReasonCode = oSlotDetail.AdministrationDetail.ReasonNotGiven.Value;
            }
            else if (oSlotDetail.AdministrationDetail.ReasonForNotDefer != null) {
                strReason = oSlotDetail.AdministrationDetail.ReasonForNotDefer.DisplayText;
            }
            let oColumnDefinition1: ColumnDefinition = new ColumnDefinition();
            // oColumnDefinition1.MinWidth = 40;
            oLayout.ColumnDefinitions.Add(oColumnDefinition1);
            let tbSlotStatus: iLabel = ObjectHelper.CreateObject(new iLabel(), { Name: "lblSlotStatus", IsWordwrap: true, TextAlignment: TextAlignment.Left, Margin: new Thickness(2) });
            tbSlotStatus.Width = 235;
            if (oSlotDetail != null && oSlotDetail.IsParacetamolIngredient && oSlotDetail.ParacetamolAdminCount > 3) {
                tbSlotStatus.Width = 215;
            }
            let spImages: StackPanel = ObjectHelper.CreateObject(new StackPanel(), { Orientation: Orientation.Horizontal, Margin: new Thickness(2), Name: "ImagePanel", HorizontalAlignment: HorizontalAlignment.Right });
            let spSlotStatus: StackPanel = ObjectHelper.CreateObject(new StackPanel(), { Orientation: Orientation.Horizontal, Margin: new Thickness(2), Name: "SlotStatusPanel", HorizontalAlignment: HorizontalAlignment.Left });
            spSlotStatus.Children.Add(tbSlotStatus);
            oLayout.Children.Add(spSlotStatus);
            oLayout.Children.Add(spImages);
            Grid.SetColumn(spSlotStatus, 1);
            Grid.SetColumn(spImages, 2);
            let oTagDrugHeaderDetail: TagDrugHeaderDetail = null;
            if (oSlotDetail != null && oSlotDetail.DrugDetail != null && oSlotDetail.DrugDetail.Tag != null) {
                oTagDrugHeaderDetail = (<TagDrugHeaderDetail>(oSlotDetail.DrugDetail.Tag));
                if (oTagDrugHeaderDetail != null && (String.Compare(oTagDrugHeaderDetail.DoseType, DoseTypeCode.STEPPEDVARIABLE) == 0) || (String.Compare(oTagDrugHeaderDetail.DoseType, DoseTypeCode.TITRATED) == 0)) {
                    tbDoseValue = ObjectHelper.CreateObject(new iLabel(), { Name: "lblDoseValue", IsWordwrap: true, TextAlignment: TextAlignment.Left, VerticalAlignment: VerticalAlignment.Center, Margin: new Thickness(2) });
                    let spDoseValue: StackPanel = ObjectHelper.CreateObject(new StackPanel(), { Orientation: Orientation.Horizontal, Margin: new Thickness(2), Name: "DosePanel", HorizontalAlignment: HorizontalAlignment.Left });
                    spDoseValue.Children.Add(tbDoseValue);
                    oLayout.RowDefinitions.Add(new RowDefinition());
                    oLayout.Children.Add(spDoseValue);
                    Grid.SetRow(spDoseValue, 2);
                    if (String.Compare(oTagDrugHeaderDetail.DoseType, DoseTypeCode.STEPPEDVARIABLE) == 0) {
                        if (oSlotDetail.AdministrationDetail != null && oSlotDetail.AdministrationDetail.MedAdminOID > 0 && !String.IsNullOrEmpty(oSlotDetail.AdministrationDetail.Dose)) {
                            strDose = oSlotDetail.AdministrationDetail.Dose;
                            strDose += " " + oSlotDetail.DoseUOM;
                        }
                        else if (!String.IsNullOrEmpty(oSlotDetail.Dose)) {
                            strDose = oSlotDetail.Dose;
                            if (!String.IsNullOrEmpty(oSlotDetail.UDose)) {
                                strDose += " - " + oSlotDetail.UDose;
                                oTagDrugHeaderDetail.UpperDose = oSlotDetail.UDose;
                            }
                            strDose += " " + oSlotDetail.DoseUOM;
                        }
                    }
                    else if (String.Compare(oTagDrugHeaderDetail.DoseType, DoseTypeCode.TITRATED) == 0) {
                        if (oSlotDetail.AdministrationDetail != null && oSlotDetail.AdministrationDetail.MedAdminOID > 0 && !String.IsNullOrEmpty(oSlotDetail.AdministrationDetail.Dose)) {
                            strDose = oSlotDetail.AdministrationDetail.Dose;
                            strDose += " " + oSlotDetail.DoseUOM;
                        }
                        else if (String.Compare(oSlotDetail.Dose, "0") == 0) {
                            strDose = CConstants.DoseTBD;
                        }
                        else if (String.Compare(oSlotDetail.Dose, CConstants.DoseTBD) != 0) {
                            strDose = oSlotDetail.Dose + " " + oSlotDetail.DoseUOM;
                        }
                        else {
                            strDose = oSlotDetail.Dose;
                        }
                    }
                    else if (!String.IsNullOrEmpty(oSlotDetail.AdminMethod)) {
                        strDose = oSlotDetail.AdminMethod;
                    }
                    else {
                        strDose = oSlotDetail.Dose + " " + oSlotDetail.DoseUOM;
                    }
                    if (oSlotDetail.IsLaunchprnFromPresChart && oSlotDetail.AdministrationDetail != null && oSlotDetail.AdministrationDetail.MedAdminOID > 0 && !String.IsNullOrEmpty(oSlotDetail.AdministeredRoute)) {
                        if (!String.IsNullOrEmpty(strDose)) {
                            strDoseForPRN = strDose + "  " + CConstants.RouteText + CConstants.sHyphen + oSlotDetail.AdministeredRoute;
                        }
                        else {
                            strDoseForPRN = CConstants.RouteText + CConstants.sHyphen + oSlotDetail.AdministeredRoute;
                        }
                    }
                }
            }
            let sSlotDetail: string = String.Empty;
            let IsBold: boolean = false;
            let sTip: string = String.Empty;
            let img1: Image = new Image();
            let img2: Image = new Image();
            if (oSlotDetail != null) {
                if (String.Compare(oSlotDetail.Status, SlotStatus.PLANNED, StringComparison.CurrentCultureIgnoreCase) != 0 && String.Compare(oSlotDetail.Status, SlotStatus.OVERDUE, StringComparison.CurrentCultureIgnoreCase) != 0 && String.Compare(oSlotDetail.Status, SlotStatus.DEFEROVERDUE, StringComparison.CurrentCultureIgnoreCase) != 0 && String.Compare(oSlotDetail.Status, SlotStatus.DUENOW, StringComparison.CurrentCultureIgnoreCase) != 0 && String.Compare(oSlotDetail.Status, SlotStatus.DEFERDUENOW, StringComparison.CurrentCultureIgnoreCase) != 0 && String.Compare(oSlotDetail.Status, SlotStatus.NOTYETRECORDED, StringComparison.CurrentCultureIgnoreCase) != 0)
                    if (oSlotDetail.AdministrationDetail != null && oSlotDetail.AdministrationDetail.IsHistoryExists && oSlotDetail.AdministrationDetail.MedAdminOID > 0) {
                        img2.Stretch = Stretch.None;
                        img2.Margin = new Thickness(2);
                        img2.Source = new BitmapImage(new Uri(MedImage.GetPath(MedImages.HistoryIcon), UriKind.RelativeOrAbsolute));
                        let sHistoryToolTip: string;
                        if (strAdminBy != null && strAdminBy.length > 0 && DateTime.NotEquals(oSlotDetail.AdministrationDetail.AdministeredDate, DateTime.MinValue)) {
                            sHistoryToolTip = MedsAdminChartToolTip.UpdatedByToolTip + ": " + strAdminBy;
                            sHistoryToolTip += "\n" + MedsAdminChartToolTip.UpdatedOnToolTip + ": " + strAdminAt;
                        }
                        else {
                            sHistoryToolTip = MedsAdminChartToolTip.UpdatedByToolTip + ": " + oSlotDetail.AdministrationDetail.LastAdministeredBy;
                            sHistoryToolTip += "\n" + MedsAdminChartToolTip.UpdatedOnToolTip + ": " + oSlotDetail.AdministrationDetail.LastAdministeredAt.ToUserDateTimeString(CConstants.DateTimeFormat);
                        }
                        ToolTipService.SetToolTip(img2, sHistoryToolTip);
                        oSlotDetail.SubscribeHistoryClickEvent(img2);
                        img2.Tag = oSlotDetail.AdministrationDetail.MedAdminOID;
                        spImages.Children.Add(img2);
                    }
                sSlotDetail = CommonBB.GetText(oSlotDetail.Status, ValueDomainValues.oSlotStatus);
                let sAdminComments: string = oSlotDetail.AdministrationDetail != null ? oSlotDetail.AdministrationDetail.AdminComments : String.Empty;
                switch (oSlotDetail.Status) {
                    case SlotStatus.PLANNED:
                        sSlotDetail = "";
                        tbDoseValue.Text = strDose;
                        break;
                    case SlotStatus.OVERDUE:
                    case SlotStatus.DUENOW:
                    case SlotStatus.NOTYETRECORDED:
                        IsBold = true;
                        let imgCumulative: Image = MultiSlotDetail.CheckAndLoadCumulativeIcon(oSlotDetail);
                        if (imgCumulative != null)
                            spSlotStatus.Children.Add(imgCumulative);
                        tbDoseValue.Text = strDose;
                        break;
                    case SlotStatus.NOTGIVEN:
                        if (oSlotDetail.AdministrationDetail.IsDuringHomeLeave) {
                            sTip = MedsAdminChartToolTip.NotGivenStatusToolTip + MedsAdminChartToolTip.DuringHomeLeaveTooltip + "\n" + MedsAdminChartToolTip.ReasonToolTip + ": " + strReason + "\n" + MedsAdminChartToolTip.DueAtTooltip + ": " + strDueAt + "\n" + MedsAdminChartToolTip.RecordedAtToolTip + ": " + strRecordAt + "\n" + MedsAdminChartToolTip.RecordedByToolTip + ": " + strRecordBy;
                        }
                        else {
                            sTip = MedsAdminChartToolTip.NotGivenStatusToolTip + "\n" + MedsAdminChartToolTip.ReasonToolTip + ": " + strReason + "\n" + MedsAdminChartToolTip.DueAtTooltip + ": " + strDueAt + "\n" + MedsAdminChartToolTip.RecordedAtToolTip + ": " + strRecordAt + "\n" + MedsAdminChartToolTip.RecordedByToolTip + ": " + strRecordBy;
                        }
                        img1.Stretch = Stretch.None;
                        img1.Source = new BitmapImage(new Uri(MedImage.GetPath(MedImages.NotGivenSlotIcon), UriKind.RelativeOrAbsolute));
                        if (!String.IsNullOrEmpty(sAdminComments))
                            ToolTipService.SetToolTip(img1, MultiSlotDetail.GetMultiSlotWrappedContentTooltip(sTip, sAdminComments));
                        else ToolTipService.SetToolTip(img1, sTip);
                        spImages.Children.Add(img1);
                        if (ValueDomainValues.oReasonForNotGiven != null && ValueDomainValues.oReasonForNotGiven.Count() > 0) {
                            let rsnLabel: iLabel = ObjectHelper.CreateObject(new iLabel(), {
                                Text: !String.IsNullOrEmpty(strReasonCode) ? ValueDomainValues.oReasonForNotGiven.First(a => a.Key == strReasonCode).Value.ToString() : String.Empty,
                                IsWordwrap: true,
                                Foreground: new SolidColorBrush(Colors.Red),
                                FontWeight: FontWeights.Bold,
                                FontSize: Convert.ToDouble(CConstants.Thirteen),
                                FontFamily: new FontFamily(CConstants.Verdana)
                            });
                            if (!String.IsNullOrEmpty(strReason)) {
                                let commentsToolTip: string = !String.IsNullOrEmpty(sAdminComments) ? "\n" + MedsAdminChartToolTip.CommentsToolTip + ": " + sAdminComments : String.Empty;
                                ToolTipService.SetToolTip(rsnLabel, ObjectHelper.CreateObject(new iLabel(), { Text: MedsAdminChartToolTip.ReasonToolTip + ": " + strReason + commentsToolTip, IsWordwrap: true, Width: 250 }));
                            }
                            spImages.Children.Add(rsnLabel);
                        }
                        if (!String.IsNullOrEmpty(sAdminComments))
                            spImages.Children.Add(MultiSlotDetail.GetMultiSlotAdminCommentIcon(sAdminComments));
                        break;
                    case SlotStatus.NOTKNOWN:
                        if (oSlotDetail.AdministrationDetail.IsDuringHomeLeave) {
                            sTip = MedsAdminChartToolTip.NotKnownStatusToolTip + MedsAdminChartToolTip.DuringHomeLeaveTooltip + "\n" + MedsAdminChartToolTip.DueAtTooltip + ": " + strDueAt + "\n" + MedsAdminChartToolTip.RecordedAtToolTip + ": " + strRecordAt + "\n" + MedsAdminChartToolTip.RecordedByToolTip + ": " + strRecordBy;
                        }
                        else {
                            sTip = MedsAdminChartToolTip.NotKnownStatusToolTip + "\n" + MedsAdminChartToolTip.DueAtTooltip + ": " + strDueAt + "\n" + MedsAdminChartToolTip.RecordedAtToolTip + ": " + strRecordAt + "\n" + MedsAdminChartToolTip.RecordedByToolTip + ": " + strRecordBy;
                        }
                        img1.Stretch = Stretch.None;
                        img1.Source = new BitmapImage(new Uri(MedImage.GetPath(MedImages.NotKnownSlotIcon), UriKind.RelativeOrAbsolute));
                        if (!String.IsNullOrEmpty(sAdminComments))
                            ToolTipService.SetToolTip(img1, MultiSlotDetail.GetMultiSlotWrappedContentTooltip(sTip, sAdminComments));
                        else ToolTipService.SetToolTip(img1, sTip);
                        spImages.Children.Add(img1);
                        if (!String.IsNullOrEmpty(sAdminComments))
                            spImages.Children.Add(MultiSlotDetail.GetMultiSlotAdminCommentIcon(sAdminComments));
                        break;
                    case SlotStatus.HOMELEAVE:
                        sSlotDetail = String.Empty;
                        sTip = MedsAdminChartToolTip.HomeLeaveToolTip;
                        img1.Stretch = Stretch.None;
                        img1.Source = new BitmapImage(new Uri(MedImage.GetPath(MedImages.HomeLeaveIcon), UriKind.RelativeOrAbsolute));
                        ToolTipService.SetToolTip(img1, sTip);
                        spImages.Children.Add(img1);
                        break;
                    case SlotStatus.DEFEROVERDUE:
                    case SlotStatus.DEFERDUENOW:
                    case SlotStatus.DEFERADMIN:
                        sSlotDetail = SlotStatusText.DEFERRED;
                        sTip = "Deferred at: " + oSlotDetail.AdministrationDetail.AdministeredDate.ToUserDateTimeString(CConstants.DateTimeFormat);
                        sTip += "\n" + "Deferred by: " + oSlotDetail.AdministrationDetail.RecordedBy;
                        sTip += "\n" + "Reason: " + strReason;
                        if (!String.IsNullOrEmpty(sAdminComments))
                            ToolTipService.SetToolTip(oLayout, MultiSlotDetail.GetMultiSlotWrappedContentTooltip(sTip, sAdminComments));
                        else ToolTipService.SetToolTip(oLayout, sTip);
                        if (!String.IsNullOrEmpty(sAdminComments))
                            spImages.Children.Add(MultiSlotDetail.GetMultiSlotAdminCommentIcon(sAdminComments));
                        let imgCumulative1: Image = MultiSlotDetail.CheckAndLoadCumulativeIcon(oSlotDetail);
                        if (imgCumulative1 != null)
                            spSlotStatus.Children.Add(imgCumulative1);
                        break;
                    case SlotStatus.GIVEN:
                        if (oSlotDetail.IsLastPRN) {
                            if (oSlotDetail.IsLaunchprnFromPresChart) {
                                sSlotDetail = (String.IsNullOrEmpty(strDoseForPRN)) ? String.Empty : MedsAdminChartToolTip.DoseTootip + CConstants.sHyphen + strDoseForPRN;
                            }
                            else {
                                sSlotDetail = (String.IsNullOrEmpty(strDose)) ? String.Empty : MedsAdminChartToolTip.DoseTootip + CConstants.sHyphen + strDose;
                            }
                        }
                        else {
                            sSlotDetail = CommonBB.GetText(oSlotDetail.Status, ValueDomainValues.oSlotStatus) + MedsAdminChartToolTip.GivenatToolTip + oSlotDetail.AdministrationDetail.AdministeredDate.ToUserDateTimeString(CConstants.DateTimeFormat);
                        }
                        if (oSlotDetail.AdministrationDetail.IsDuringHomeLeave) {
                            sTip = MedsAdminChartToolTip.GivenStatusToolTip + MedsAdminChartToolTip.DuringHomeLeaveTooltip + "\n" + ((String.IsNullOrEmpty(strDose)) ? String.Empty : (MedsAdminChartToolTip.DoseTootip + ": " + strDose + "\n")) + MedsAdminChartToolTip.DueAtTooltip + ": " + strDueAt + "\n" + MedsAdminChartToolTip.AdministeredAtToolTip + ": " + strAdminAt + "\n" + MedsAdminChartToolTip.AdministeredByToolTip + ": " + strAdminBy + "\n" + ((String.IsNullOrEmpty(strRelationshipToPatient)) ? String.Empty : (MedsAdminChartToolTip.RelationshipToPatientToolTip + ": " + strRelationshipToPatient + "\n")) + MedsAdminChartToolTip.RecordedAtToolTip + ": " + strRecordAt + "\n" + MedsAdminChartToolTip.RecordedByToolTip + ": " + strRecordBy;
                        }
                        else {
                            sTip = MedsAdminChartToolTip.GivenStatusToolTip + "\n" + ((String.IsNullOrEmpty(strDose)) ? String.Empty : (MedsAdminChartToolTip.DoseTootip + ": " + strDose + "\n")) + MedsAdminChartToolTip.DueAtTooltip + ": " + strDueAt + "\n" + MedsAdminChartToolTip.AdministeredAtToolTip + ": " + strAdminAt + "\n" + MedsAdminChartToolTip.AdministeredByToolTip + ": " + strAdminBy + "\n" + ((String.IsNullOrEmpty(strRelationshipToPatient)) ? String.Empty : (MedsAdminChartToolTip.RelationshipToPatientToolTip + ": " + strRelationshipToPatient + "\n")) + MedsAdminChartToolTip.RecordedAtToolTip + ": " + strRecordAt + "\n" + MedsAdminChartToolTip.RecordedByToolTip + ": " + strRecordBy;
                        }
                        img1.Stretch = Stretch.None;
                        if (oSlotDetail.AdministrationDetail != null && oSlotDetail.AdministrationDetail.DoseDiscReasonCode != null && !String.IsNullOrEmpty(oSlotDetail.AdministrationDetail.DoseDiscReasonCode.DisplayText))
                            img1.Source = new BitmapImage(new Uri(MedImage.GetPath(MedImages.DoseDiscrepancy), UriKind.RelativeOrAbsolute));
                        else {
                            let TagDoseVal: string = String.Empty;
                            let TagUpperDose: string = String.Empty;
                            if (oSlotDetail != null && oSlotDetail.DrugDetail != null && oSlotDetail.DrugDetail.Tag != null) {
                                TagDoseVal = (<TagDrugHeaderDetail>(oSlotDetail.DrugDetail.Tag)).LowerDose;
                                TagUpperDose = (<TagDrugHeaderDetail>(oSlotDetail.DrugDetail.Tag)).UpperDose;
                            }
                            if (oSlotDetail.AdministrationDetail.AdministeredOnTimeMode == 'E') {
                                if (oSlotDetail != null && oSlotDetail.AdministrationDetail != null && !String.IsNullOrEmpty(TagDoseVal) && !String.IsNullOrEmpty(TagUpperDose) && !String.IsNullOrEmpty(oSlotDetail.AdministrationDetail.Dose) && (Number.Parse(oSlotDetail.AdministrationDetail.Dose) > (Number.Parse(TagUpperDose)) || Number.Parse(oSlotDetail.AdministrationDetail.Dose) < (Number.Parse(TagDoseVal)))) {
                                    img1.Source = new BitmapImage(new Uri(MedImage.GetPath(MedImages.DoseDiscrepancy), UriKind.RelativeOrAbsolute));
                                }
                                else if (oSlotDetail != null && oSlotDetail.AdministrationDetail != null && !String.IsNullOrEmpty(TagDoseVal) && String.IsNullOrEmpty(TagUpperDose) && !String.IsNullOrEmpty(oSlotDetail.AdministrationDetail.Dose) && (Number.Parse(oSlotDetail.AdministrationDetail.Dose) > (Number.Parse(TagDoseVal)) || Number.Parse(oSlotDetail.AdministrationDetail.Dose) < (Number.Parse(TagDoseVal)))) {
                                    img1.Source = new BitmapImage(new Uri(MedImage.GetPath(MedImages.DoseDiscrepancy), UriKind.RelativeOrAbsolute));
                                }
                                else {
                                    img1.Source = new BitmapImage(new Uri(MedImage.GetPath(MedImages.EarlyAdminIcon), UriKind.RelativeOrAbsolute));
                                }
                            }
                            else if (oSlotDetail.AdministrationDetail.AdministeredOnTimeMode == 'L') {
                                if (oSlotDetail != null && oSlotDetail.AdministrationDetail != null && !String.IsNullOrEmpty(TagDoseVal) && !String.IsNullOrEmpty(TagUpperDose) && !String.IsNullOrEmpty(oSlotDetail.AdministrationDetail.Dose) && (Number.Parse(oSlotDetail.AdministrationDetail.Dose) > (Number.Parse(TagUpperDose)) || Number.Parse(oSlotDetail.AdministrationDetail.Dose) < (Number.Parse(TagDoseVal)))) {
                                    img1.Source = new BitmapImage(new Uri(MedImage.GetPath(MedImages.DoseDiscrepancy), UriKind.RelativeOrAbsolute));
                                }
                                else if (oSlotDetail != null && oSlotDetail.AdministrationDetail != null && !String.IsNullOrEmpty(TagDoseVal) && String.IsNullOrEmpty(TagUpperDose) && !String.IsNullOrEmpty(oSlotDetail.AdministrationDetail.Dose) && (Number.Parse(oSlotDetail.AdministrationDetail.Dose) > (Number.Parse(TagDoseVal)) || Number.Parse(oSlotDetail.AdministrationDetail.Dose) < (Number.Parse(TagDoseVal)))) {
                                    img1.Source = new BitmapImage(new Uri(MedImage.GetPath(MedImages.DoseDiscrepancy), UriKind.RelativeOrAbsolute));
                                }
                                else {
                                    img1.Source = new BitmapImage(new Uri(MedImage.GetPath(MedImages.LateAdminIcon), UriKind.RelativeOrAbsolute));
                                }
                            }
                            else img1.Source = new BitmapImage(new Uri(MedImage.GetPath(MedImages.GivenSlotIcon), UriKind.RelativeOrAbsolute));
                        }
                        if (oSlotDetail.AdministrationDetail != null && oSlotDetail.AdministrationDetail.DoseDiscReasonCode != null && !String.IsNullOrEmpty(oSlotDetail.AdministrationDetail.DoseDiscReasonCode.DisplayText)) {
                            if (oSlotDetail.AdministrationDetail.IsDuringHomeLeave) {
                                sTip = MedsAdminChartToolTip.GivenStatusToolTip + MedsAdminChartToolTip.DuringHomeLeaveTooltip + "\n" + MedsAdminChartToolTip.DoseTootip + ": " + strDose + "\n" + MedsAdminChartToolTip.DoseDiscrepancyReasonToolTip + ": " + oSlotDetail.AdministrationDetail.DoseDiscReasonCode.DisplayText + "\n" + MedsAdminChartToolTip.DueAtTooltip + ": " + strDueAt + "\n" + MedsAdminChartToolTip.AdministeredAtToolTip + ": " + strAdminAt + "\n" + MedsAdminChartToolTip.AdministeredByToolTip + ": " + strAdminBy + "\n" + ((String.IsNullOrEmpty(strRelationshipToPatient)) ? String.Empty : (MedsAdminChartToolTip.RelationshipToPatientToolTip + ": " + strRelationshipToPatient + "\n")) + MedsAdminChartToolTip.RecordedAtToolTip + ": " + strRecordAt + "\n" + MedsAdminChartToolTip.RecordedByToolTip + ": " + strRecordBy;
                            }
                            else {
                                sTip = MedsAdminChartToolTip.GivenStatusToolTip + "\n" + MedsAdminChartToolTip.DoseTootip + ": " + strDose + "\n" + MedsAdminChartToolTip.DoseDiscrepancyReasonToolTip + ": " + oSlotDetail.AdministrationDetail.DoseDiscReasonCode.DisplayText + "\n" + MedsAdminChartToolTip.DueAtTooltip + ": " + strDueAt + "\n" + MedsAdminChartToolTip.AdministeredAtToolTip + ": " + strAdminAt + "\n" + MedsAdminChartToolTip.AdministeredByToolTip + ": " + strAdminBy + "\n" + ((String.IsNullOrEmpty(strRelationshipToPatient)) ? String.Empty : (MedsAdminChartToolTip.RelationshipToPatientToolTip + ": " + strRelationshipToPatient + "\n")) + MedsAdminChartToolTip.RecordedAtToolTip + ": " + strRecordAt + "\n" + MedsAdminChartToolTip.RecordedByToolTip + ": " + strRecordBy;
                            }
                        }
                        else if (oSlotDetail.AdministrationDetail != null && oSlotDetail.AdministrationDetail.AdministeredOnTimeMode == 'L') {
                            sTip = sTip + "\n" + String.Format(CConstants.LATEADMINISTRATIONTEXT, Common.AdminDiffValue(oSlotDetail.ScheduledDTTM, oSlotDetail.AdministrationDetail.AdministeredDate, 'L'));
                        }
                        else if (oSlotDetail.AdministrationDetail != null && oSlotDetail.AdministrationDetail.AdministeredOnTimeMode == 'E') {
                            sTip = sTip + "\n" + String.Format(CConstants.EARLYADMINISTRATIONTEXT, Common.AdminDiffValue(oSlotDetail.ScheduledDTTM, oSlotDetail.AdministrationDetail.AdministeredDate, 'E'));
                        }
                        if (!String.IsNullOrEmpty(sAdminComments))
                            ToolTipService.SetToolTip(img1, MultiSlotDetail.GetMultiSlotWrappedContentTooltip(sTip, sAdminComments));
                        else ToolTipService.SetToolTip(img1, sTip);
                        spImages.Children.Add(img1);
                        if (!String.IsNullOrEmpty(sAdminComments))
                            spImages.Children.Add(MultiSlotDetail.GetMultiSlotAdminCommentIcon(sAdminComments));
                        break;
                    case SlotStatus.SELFADMINISTERED:
                        if (oSlotDetail.IsLastPRN) {
                            if (oSlotDetail.IsLaunchprnFromPresChart) {
                                sSlotDetail = (String.IsNullOrEmpty(strDoseForPRN)) ? String.Empty : MedsAdminChartToolTip.DoseTootip + CConstants.sHyphen + strDoseForPRN;
                            }
                            else {
                                sSlotDetail = (String.IsNullOrEmpty(strDose)) ? String.Empty : MedsAdminChartToolTip.DoseTootip + CConstants.sHyphen + strDose;
                            }
                        }
                        else {
                            sSlotDetail = CommonBB.GetText(oSlotDetail.Status, ValueDomainValues.oSlotStatus) + MedsAdminChartToolTip.GivenatToolTip + oSlotDetail.AdministrationDetail.AdministeredDate.ToUserDateTimeString(CConstants.DateTimeFormat);
                        }
                        if (oSlotDetail.AdministrationDetail.IsDuringHomeLeave) {
                            sTip = MedsAdminChartToolTip.SelfAdminStatusToolTip + MedsAdminChartToolTip.DuringHomeLeaveTooltip + "\n" + ((String.IsNullOrEmpty(strDose)) ? String.Empty : (MedsAdminChartToolTip.DoseTootip + ": " + strDose + "\n")) + MedsAdminChartToolTip.DueAtTooltip + ": " + strDueAt + "\n" + MedsAdminChartToolTip.AdministeredAtToolTip + ": " + strAdminAt + "\n" + MedsAdminChartToolTip.AdministeredByToolTip + ": " + strAdminBy + "\n" + ((String.IsNullOrEmpty(strRelationshipToPatient)) ? String.Empty : (MedsAdminChartToolTip.RelationshipToPatientToolTip + ": " + strRelationshipToPatient + "\n")) + MedsAdminChartToolTip.RecordedAtToolTip + ": " + strRecordAt + "\n" + MedsAdminChartToolTip.RecordedByToolTip + ": " + ((oSlotDetail.AdministrationDetail != null && !String.IsNullOrEmpty(oSlotDetail.AdministrationDetail.AdministeredBy)) ? oSlotDetail.AdministrationDetail.RecordedBy : String.Empty);
                        }
                        else {
                            sTip = MedsAdminChartToolTip.SelfAdminStatusToolTip + "\n" + ((String.IsNullOrEmpty(strDose)) ? String.Empty : (MedsAdminChartToolTip.DoseTootip + ": " + strDose + "\n")) + MedsAdminChartToolTip.DueAtTooltip + ": " + strDueAt + "\n" + MedsAdminChartToolTip.AdministeredAtToolTip + ": " + strAdminAt + "\n" + MedsAdminChartToolTip.AdministeredByToolTip + ": " + strAdminBy + "\n" + ((String.IsNullOrEmpty(strRelationshipToPatient)) ? String.Empty : (MedsAdminChartToolTip.RelationshipToPatientToolTip + ": " + strRelationshipToPatient + "\n")) + MedsAdminChartToolTip.RecordedAtToolTip + ": " + strRecordAt + "\n" + MedsAdminChartToolTip.RecordedByToolTip + ": " + ((oSlotDetail.AdministrationDetail != null && !String.IsNullOrEmpty(oSlotDetail.AdministrationDetail.AdministeredBy)) ? oSlotDetail.AdministrationDetail.RecordedBy : String.Empty);
                        }
                        img1.Stretch = Stretch.None;
                        let sTagDoseVal: string = String.Empty;
                        let sTagDoseType: string = String.Empty;
                        if (oSlotDetail != null && oSlotDetail.DrugDetail != null && oSlotDetail.DrugDetail.Tag != null) {
                            sTagDoseVal = (<TagDrugHeaderDetail>(oSlotDetail.DrugDetail.Tag)).LowerDose;
                            sTagDoseType = (<TagDrugHeaderDetail>(oSlotDetail.DrugDetail.Tag)).DoseType;
                        }
                        if (String.Compare(sTagDoseType, DoseTypeCode.CONDITIONAL, StringComparison.InvariantCultureIgnoreCase) != 0) {
                            if (oSlotDetail != null && oSlotDetail.AdministrationDetail != null && !String.IsNullOrEmpty(sTagDoseVal) && !String.IsNullOrEmpty(oSlotDetail.AdministrationDetail.Dose) && (Number.Parse(oSlotDetail.AdministrationDetail.Dose) > (Number.Parse(sTagDoseVal)) || Number.Parse(oSlotDetail.AdministrationDetail.Dose) < (Number.Parse(sTagDoseVal)))) {
                                img1.Source = new BitmapImage(new Uri(MedImage.GetPath(MedImages.DoseDiscrepancy), UriKind.RelativeOrAbsolute));
                            }
                            else {
                                if (oSlotDetail.AdministrationDetail != null && oSlotDetail.AdministrationDetail.AdministeredOnTimeMode == 'E')
                                    img1.Source = new BitmapImage(new Uri(MedImage.GetPath(MedImages.SelfAdminEarlyIcon), UriKind.RelativeOrAbsolute));
                                else if (oSlotDetail.AdministrationDetail != null && oSlotDetail.AdministrationDetail.AdministeredOnTimeMode == 'L')
                                    img1.Source = new BitmapImage(new Uri(MedImage.GetPath(MedImages.SelfAdminLateIcon), UriKind.RelativeOrAbsolute));
                                else img1.Source = new BitmapImage(new Uri(MedImage.GetPath(MedImages.SelfAdministeredIcon), UriKind.RelativeOrAbsolute));
                            }
                        }
                        else {
                            if (oSlotDetail != null && oSlotDetail.AdministrationDetail != null && oSlotDetail.AdministrationDetail.DoseDiscReasonCode != null)
                                img1.Source = new BitmapImage(new Uri(MedImage.GetPath(MedImages.DoseDiscrepancy), UriKind.RelativeOrAbsolute));
                            else {
                                if (oSlotDetail.AdministrationDetail != null && oSlotDetail.AdministrationDetail.AdministeredOnTimeMode == 'E')
                                    img1.Source = new BitmapImage(new Uri(MedImage.GetPath(MedImages.SelfAdminEarlyIcon), UriKind.RelativeOrAbsolute));
                                else if (oSlotDetail.AdministrationDetail != null && oSlotDetail.AdministrationDetail.AdministeredOnTimeMode == 'L')
                                    img1.Source = new BitmapImage(new Uri(MedImage.GetPath(MedImages.SelfAdminLateIcon), UriKind.RelativeOrAbsolute));
                                else img1.Source = new BitmapImage(new Uri(MedImage.GetPath(MedImages.SelfAdministeredIcon), UriKind.RelativeOrAbsolute));
                            }
                        }
                        if (oSlotDetail.AdministrationDetail != null && oSlotDetail.AdministrationDetail.DoseDiscReasonCode != null && !String.IsNullOrEmpty(oSlotDetail.AdministrationDetail.DoseDiscReasonCode.DisplayText)) {
                            sTip = MedsAdminChartToolTip.SelfAdminStatusToolTip + "\n" + MedsAdminChartToolTip.DoseTootip + ": " + strDose + "\n" + MedsAdminChartToolTip.DoseDiscrepancyReasonToolTip + ": " + oSlotDetail.AdministrationDetail.DoseDiscReasonCode.DisplayText + "\n" + MedsAdminChartToolTip.DueAtTooltip + ": " + strDueAt + "\n" + MedsAdminChartToolTip.AdministeredAtToolTip + ": " + strAdminAt + "\n" + MedsAdminChartToolTip.AdministeredByToolTip + ": " + strAdminBy + "\n" + ((String.IsNullOrEmpty(strRelationshipToPatient)) ? String.Empty : (MedsAdminChartToolTip.RelationshipToPatientToolTip + ": " + strRelationshipToPatient + "\n")) + MedsAdminChartToolTip.RecordedAtToolTip + ": " + strRecordAt + "\n" + MedsAdminChartToolTip.RecordedByToolTip + ": " + ((oSlotDetail.AdministrationDetail != null && !String.IsNullOrEmpty(oSlotDetail.AdministrationDetail.AdministeredBy)) ? oSlotDetail.AdministrationDetail.RecordedBy : String.Empty);
                        }
                        else if (oSlotDetail.AdministrationDetail != null && oSlotDetail.AdministrationDetail.AdministeredOnTimeMode == 'L') {
                            sTip = sTip + "\n" + String.Format(CConstants.LATEADMINISTRATIONTEXT, Common.AdminDiffValue(oSlotDetail.ScheduledDTTM, oSlotDetail.AdministrationDetail.AdministeredDate, 'L'));
                        }
                        else if (oSlotDetail.AdministrationDetail != null && oSlotDetail.AdministrationDetail.AdministeredOnTimeMode == 'E') {
                            sTip = sTip + "\n" + String.Format(CConstants.EARLYADMINISTRATIONTEXT, Common.AdminDiffValue(oSlotDetail.ScheduledDTTM, oSlotDetail.AdministrationDetail.AdministeredDate, 'E'));
                        }
                        if (!String.IsNullOrEmpty(sAdminComments))
                            ToolTipService.SetToolTip(img1, MultiSlotDetail.GetMultiSlotWrappedContentTooltip(sTip, sAdminComments));
                        else ToolTipService.SetToolTip(img1, sTip);
                        spImages.Children.Add(img1);
                        if (!String.IsNullOrEmpty(sAdminComments))
                            spImages.Children.Add(MultiSlotDetail.GetMultiSlotAdminCommentIcon(sAdminComments));
                        break;
                    case SlotStatus.PATIENTSELFADMIN:
                        sTip = sSlotDetail;
                        img1.Stretch = Stretch.None;
                        img1.Source = new BitmapImage(new Uri(MedImage.GetPath(MedImages.PatSelfAdmin), UriKind.RelativeOrAbsolute));
                        ToolTipService.SetToolTip(img1, sTip);
                        spImages.Children.Add(img1);
                        break;
                    case SlotStatus.OMITTED:
                        sTip = MedsAdminChartToolTip.OmittedStatusToolTip;
                        if (!String.IsNullOrEmpty(strAdminBy)) {
                            sTip += "\n" + MedsAdminChartToolTip.OmittedByToolTip + ": " + strAdminBy;
                        }
                        if (oSlotDetail.AdministrationDetail != null && !String.IsNullOrEmpty(oSlotDetail.AdministrationDetail.AdminComments)) {
                            sTip += "\n" + MedsAdminChartToolTip.ReasonToolTip + ": " + oSlotDetail.AdministrationDetail.AdminComments;
                        }
                        img1.Stretch = Stretch.None;
                        img1.Source = new BitmapImage(new Uri(MedImage.GetPath(MedImages.OmittedSlotIcon), UriKind.RelativeOrAbsolute));
                        if (!String.IsNullOrEmpty(sAdminComments) && (String.Compare(oSlotDetail.Status, SlotStatus.OMITTED, StringComparison.CurrentCultureIgnoreCase) != 0))
                            ToolTipService.SetToolTip(img1, MultiSlotDetail.GetMultiSlotWrappedContentTooltip(sTip, sAdminComments));
                        else ToolTipService.SetToolTip(img1, sTip);
                        spImages.Children.Add(img1);
                        break;
                }
                let img3: Image = new Image();
                if (!String.Equals(oSlotDetail.Status, SlotStatus.HOMELEAVE, StringComparison.CurrentCultureIgnoreCase) && oSlotDetail != null && oSlotDetail.AdministrationDetail != null && oSlotDetail.AdministrationDetail.IsDuringHomeLeave && DateTime.LessThanOrEqualTo(oSlotDetail.ScheduledDTTM, CommonBB.GetServerDateTime())) {
                    img3.Source = new BitmapImage(new Uri(MedImage.GetPath(MedImages.HomeLeaveIcon), UriKind.RelativeOrAbsolute));
                    sTip = MedsAdminChartToolTip.HomeLeaveToolTip;
                    ToolTipService.SetToolTip(img3, sTip);
                    spImages.Children.Add(img3);
                }
                if (String.Compare(oSlotDetail.Status, SlotStatus.OMITTED, StringComparison.CurrentCultureIgnoreCase) != 0) {
                    tbSlotStatus.Text = sSlotDetail;
                    if (String.Compare(oSlotDetail.Status, SlotStatus.OVERDUE, StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(oSlotDetail.Status, SlotStatus.DUENOW, StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(oSlotDetail.Status, SlotStatus.NOTYETRECORDED, StringComparison.CurrentCultureIgnoreCase) == 0) {
                        if (String.Compare(oSlotDetail.Status, SlotStatus.OVERDUE, StringComparison.CurrentCultureIgnoreCase) == 0) {
                            ToolTipService.SetToolTip(tbSlotStatus, "Drug overdue now - due at " + " " + oSlotDetail.ScheduledDTTM.ToString(CConstants.ShortDateFormat) + " " + oSlotDetail.ScheduledDTTM.ToUserDateTimeString(CConstants.Timeformat) + " hours");
                        }
                        else if (String.Compare(oSlotDetail.Status, SlotStatus.NOTYETRECORDED, StringComparison.CurrentCultureIgnoreCase) == 0) {
                            ToolTipService.SetToolTip(tbSlotStatus, MedsAdminChartToolTip.AdminNotyetRecordToolTip + oSlotDetail.ScheduledDTTM.ToString(CConstants.ShortDateFormat) + " " + oSlotDetail.ScheduledDTTM.ToUserDateTimeString(CConstants.Timeformat) + " hours");
                        }
                        else if (String.Compare(oSlotDetail.Status, SlotStatus.DUENOW, StringComparison.CurrentCultureIgnoreCase) == 0) {
                            ToolTipService.SetToolTip(tbSlotStatus, MedsAdminChartToolTip.DueNowToolTip);
                        }
                    }
                    else if (String.Compare(oSlotDetail.Status, SlotStatus.DEFEROVERDUE, StringComparison.InvariantCultureIgnoreCase) != 0 && String.Compare(oSlotDetail.Status, SlotStatus.DEFERDUENOW, StringComparison.InvariantCultureIgnoreCase) != 0 && String.Compare(oSlotDetail.Status, SlotStatus.DEFERADMIN, StringComparison.InvariantCultureIgnoreCase) != 0) {
                        ToolTipService.SetToolTip(tbSlotStatus, sSlotDetail);
                    }
                    if (oSlotDetail.MultiRoute_Type == MultiRouteType.Mixed_Routes && oSlotDetail.AdministrationDetail.IsAdministeredOnInfusionChart) {
                        ToolTipService.SetToolTip(tbSlotStatus, MedsAdminChartToolTip.AdministeredOnInfusionChartToolTip);
                    }
                }
                if (IsBold) {
                    tbSlotStatus.FontWeight = FontWeights.Bold;
                }
            }
        }
        // multislot empty row removal
        oLayout.ChildrenArr.forEach((child, i) => {
            let childElement = child.control.ChildrenElementArray;
            childElement.forEach(element => {
                if (element instanceof iLabel) {
                    if (element.Text == "" || !element.Text) {
                        oLayout.ChildrenArr.splice(i, 1);
                    } else {
                        return;
                    }
                }
            });
        })
        return oLayout;
    }
    private static CheckAndLoadCumulativeIcon(oSlotDetail: SlotDetailVM): Image {
        let imgCumulative: Image = null;
        let bIsToday: boolean = false;
        if (oSlotDetail.ScheduledDTTM != null && DateTime.NotEquals(oSlotDetail.ScheduledDTTM, DateTime.MinValue))
            bIsToday = DateTime.Equals(oSlotDetail.ScheduledDTTM.Date, CommonBB.GetServerDateTime().Date);
        else if (DateTime.NotEquals(oSlotDetail.TodaySlotDate, DateTime.MinValue))
            bIsToday = DateTime.Equals(oSlotDetail.TodaySlotDate.Date, CommonBB.GetServerDateTime().Date);
        if (oSlotDetail.IsParacetamolIngredient && oSlotDetail.ParacetamolAdminCount > 3 && bIsToday) {
            imgCumulative = ObjectHelper.CreateObject(new Image(), { Stretch: Stretch.None });
            imgCumulative.Source = new BitmapImage(new Uri(MedImage.GetPath(MedImages.CumulativeWarningIcon), UriKind.RelativeOrAbsolute));
            ToolTipService.SetToolTip(imgCumulative, ObjectHelper.CreateObject(new iLabel(), { Text: MedsAdminChartToolTip.CumulativeIcon, MaxWidth: 250, IsWordwrap: true }));
        }
        return imgCumulative;
    }
}
export class StartDTTMDisplay {
    public Convert(value: any, targetType: Type, parameter: any, culture: CultureInfo): any {
        let sDTTM: string = String.Empty;
        let oPrescDetails: PrescriptionItemViewVM = <PrescriptionItemViewVM>value;
        let StartDate: DateTime = oPrescDetails.PrescriptionStartDTTM;
        let CommencedDate: string = oPrescDetails.DateCommenced;
        if (StartDate.Year > 1753) {
            if (String.IsNullOrEmpty(CommencedDate)) {
                sDTTM = StartDate.ToString(parameter.ToString());
            }
            else {
                if (CommencedDate == "CC_Month") {
                    sDTTM = StartDate.ToString("MMM-yyyy");
                }
                else if (CommencedDate == "CC_Year") {
                    sDTTM = StartDate.ToString("yyyy");
                }
                else if (CommencedDate == "CC_Complete") {
                    sDTTM = StartDate.ToString(CConstants.ShortDateFormat);
                }
            }
        }
        return sDTTM;
    }
    public ConvertBack(value: any, targetType: Type, parameter: any, culture: CultureInfo): any {
        if (value != null && !String.IsNullOrEmpty(value.ToString()))
            return DateTime.ParseExact(value.ToString(), parameter.ToString(), culture);
        else return DateTime.MinValue;
    }
}
export class InfoIcon {
    public Convert(value: any, targetType: Type, parameter: any, culture: CultureInfo): any {
        let InformationIcon: StackPanel = new StackPanel();
        let oVM: PrescriptionItemViewVM = ObjectHelper.CreateType<PrescriptionItemViewVM>(value, PrescriptionItemViewVM);
        if (oVM instanceof PrescriptionItemViewVM) {
            let infoIcon: Image = null;
            let _prescriptionItemStatus: string = oVM.PrescriptionItemStatus;
            if (String.Compare(_prescriptionItemStatus, CConstants.CLINICALLYVERIFIED, StringComparison.InvariantCultureIgnoreCase) == 0) {
                infoIcon = this.GetImage("Verified", MedImage.GetPath(MedImages.Acknowledged), "Clinically verified item");
            }
            else if (String.Compare(_prescriptionItemStatus, CConstants.DISCONTINUED, StringComparison.InvariantCultureIgnoreCase) == 0) {
                infoIcon = this.GetImage("Discontinued", MedImage.GetPath(MedImages.DiscontinuedIcon), "Discontinued medication");
            }
            else if (String.Compare(_prescriptionItemStatus, CConstants.CANCELLED, StringComparison.InvariantCultureIgnoreCase) == 0) {
                infoIcon = this.GetImage("Cancelled", MedImage.GetPath(MedImages.CancelledIcon), "Cancelled medication");
            }
            else if (String.Compare(_prescriptionItemStatus, CConstants.COMPLETED, StringComparison.InvariantCultureIgnoreCase) == 0) {
                infoIcon = this.GetImage("Completed", MedImage.GetPath(MedImages.CompletedIcon), "Completed Prescription Item");
            }
            else if (String.Compare(_prescriptionItemStatus, CConstants.ONHOLD, StringComparison.InvariantCultureIgnoreCase) == 0) {
                infoIcon = this.GetImage("Hold", MedImage.GetPath(MedImages.OnHoldIcon), "Medication on Hold");
            }
            else if (String.Compare(_prescriptionItemStatus, CConstants.AWAITINGAUTHORISE, StringComparison.InvariantCultureIgnoreCase) == 0) {
                infoIcon = this.GetImage("PendingAuth", MedImage.GetPath(MedImages.AwaitingAuthoriseIcon), "Awaiting authorisation");
            }
            if (infoIcon != null) {
                InformationIcon.Children.Add(infoIcon);
            }
            if (oVM.PrescriptionItemViewDetails.oPrescriptionItem.IsAmendment == '1') {
                InformationIcon.Children.Add(this.GetImage("Amend", MedImage.GetPath(MedImages.CommentIcon), "Medication entry created due to an amendment"));
            }
        }
        return InformationIcon;
    }
    private GetImage(sName: string, sPath: string, sToolTip: string): Image {
        let infoIcon: Image = new Image();
        infoIcon.HorizontalAlignment = HorizontalAlignment.Center;
        infoIcon.VerticalAlignment = VerticalAlignment.Center;
        infoIcon.Name = sName;
        infoIcon.Margin = new Thickness(2);
        infoIcon.Source = new BitmapImage(new Uri(sPath, UriKind.Relative));
        if (!String.IsNullOrEmpty(sToolTip))
            ToolTipService.SetToolTip(infoIcon, sToolTip);
        return infoIcon;
    }
    public ConvertBack(value: any, targetType: Type, parameter: any, culture: CultureInfo): any {
        return value;
    }
}
export class StatusIcon {
    public Convert(value: any, targetType: Type, parameter: any, culture: CultureInfo): any {
        let cntControl: iLabel = new iLabel();
        cntControl = ObjectHelper.CreateObject(new iLabel(), {
            BorderBrush: null,
            Background: new SolidColorBrush(Colors.Transparent),
            BorderThickness: new Thickness(0),
            Cursor: Cursors.Arrow,
            TextAlignment: TextAlignment.Left,
            IsWordwrap: true
        });
        let oVM: MedRequestVM = ObjectHelper.CreateType<MedRequestVM>(value, MedRequestVM);
        let oVMChild: MedRequestVM = ObjectHelper.CreateType<MedRequestVM>(value, MedRequestVM);
        if (oVM instanceof MedRequestVM || oVMChild instanceof MedRequestVM) {
            let wardIcon: Image = null;
            let SupplyIcon: Image = null;
            let _wardstockStatus: boolean = false;
            let _Existingsupplyrequest: boolean = false;
            if (oVM instanceof MedRequestVM && oVM != null) {
                _wardstockStatus = oVM.IsWardStockExist;
                _Existingsupplyrequest = oVM.IsSupplyRequestExist;
            }
            else if (oVM == null && oVMChild != null && oVMChild.oPrescriptionItemViewVM != null && oVMChild.oPrescriptionItemViewVM.PrescriptionItemOID > 0 && oVMChild.oPrescriptionItemViewVM.PresMultiCompitemOID > 0) {
                _wardstockStatus = oVMChild.IsWardStockExist;
                _Existingsupplyrequest = oVMChild.IsSupplyRequestExist;
            }
            if (_wardstockStatus) {
                if (MedicationCommonProfileData.AddPrescribingConfig != null && MedicationCommonProfileData.AddPrescribingConfig.EnableWardStockConfig) {
                    wardIcon = this.GetImage("Ward", MedImage.GetPath(MedImages.Wardstockicon), "Item is stocked at this location");
                }
                else {
                    wardIcon = this.GetImage("Ward", MedImage.GetPath(MedImages.Wardstockicon), "Is ward stock");
                }
            }
            if (_Existingsupplyrequest) {
                SupplyIcon = this.GetImage("Supply", MedImage.GetPath(MedImages.SupplyRequesticon), "Has a supply request raised");
            }
            if (wardIcon != null) {
                cntControl.InLines.Add(ObjectHelper.CreateObject(new iLabelInLineElement(), { InLine: wardIcon }));
            }
            if (SupplyIcon != null) {
                cntControl.InLines.Add(ObjectHelper.CreateObject(new iLabelInLineElement(), { InLine: SupplyIcon }));
            }
        }
        return cntControl;
    }
    private GetImage(sName: string, sPath: string, sToolTip: string): Image {
        let StatusIcon: Image = new Image();
        StatusIcon.HorizontalAlignment = HorizontalAlignment.Center;
        StatusIcon.VerticalAlignment = VerticalAlignment.Stretch;
        StatusIcon.Name = sName;
        StatusIcon.Stretch = Stretch.None;
        StatusIcon.Margin = new Thickness(2);
        StatusIcon.Source = new BitmapImage(new Uri(sPath, UriKind.Relative));
        if (!String.IsNullOrEmpty(sToolTip))
            ToolTipService.SetToolTip(StatusIcon, sToolTip);
        return StatusIcon;
    }
    public ConvertBack(value: any, targetType: Type, parameter: any, culture: CultureInfo): any {
        return value;
    }
}
export class TypeIcon {
    public Convert(value: any, targetType: Type, parameter: any, culture: CultureInfo): any {
        let cntControl: iLabel = new iLabel();
        cntControl = ObjectHelper.CreateObject(new iLabel(), {
            BorderBrush: null,
            Background: new SolidColorBrush(Colors.Transparent),
            BorderThickness: new Thickness(0),
            Cursor: Cursors.Arrow,
            TextAlignment: TextAlignment.Center,
            IsWordwrap: true
        });
        let oVM: MedRequestVM = ObjectHelper.CreateType<MedRequestVM>(value, MedRequestVM);
        if (oVM instanceof MedRequestVM) {
            let TypeIcon: Image = null;
            if (oVM.PrescriptionItemType == PrescriptionItmTyp.Infusion) {
                TypeIcon = this.GetImage("Infusion", MedImage.GetPath(MedImages.Infusionicon), "Infusion");
            }
            else if (oVM.PrescriptionItemType == PrescriptionItmTyp.NonInfusion) {
                TypeIcon = this.GetImage("NonInfusion", MedImage.GetPath(MedImages.PlannedIcon), "Non-infusion");
            }
            else if (oVM.PrescriptionItemType == PrescriptionItmTyp.MixedRoutes) {
                TypeIcon = this.GetImage("MultiRoute", MedImage.GetPath(MedImages.MultiRouteIcon), "Multi-route");
            }
            if (TypeIcon != null) {
                cntControl.InLines.Add(ObjectHelper.CreateObject(new iLabelInLineElement(), { InLine: TypeIcon }));
            }
        }
        return cntControl;
    }
    private GetImage(sName: string, sPath: string, sToolTip: string): Image {
        let StatusIcon: Image = new Image();
        StatusIcon.HorizontalAlignment = HorizontalAlignment.Center;
        StatusIcon.VerticalAlignment = VerticalAlignment.Stretch;
        StatusIcon.Name = sName;
        StatusIcon.Stretch = Stretch.None;
        StatusIcon.Margin = new Thickness(2);
        StatusIcon.Source = new BitmapImage(new Uri(sPath, UriKind.Relative));
        if (!String.IsNullOrEmpty(sToolTip))
            ToolTipService.SetToolTip(StatusIcon, sToolTip);
        return StatusIcon;
    }
    public ConvertBack(value: any, targetType: Type, parameter: any, culture: CultureInfo): any {
        return value;
    }
}
export class DisplayPrescriptionLineItem {
    public Convert(value: any, targetType: Type, parameter: any, culture: CultureInfo): any {
        let cntControl: iLabel = null;
        if (value != null && value instanceof CDrugHeader) {
            cntControl = ObjectHelper.CreateObject(new iLabel(), {
                BorderBrush: null,
                Background: new SolidColorBrush(Colors.Transparent),
                BorderThickness: new Thickness(5, 0, 3, 0),
                Cursor: Cursors.Arrow,
                TextAlignment: TextAlignment.Left,
                IsWordwrap: true
            });
            let dhItem: CDrugHeader = ObjectHelper.CreateType<CDrugHeader>(value, CDrugHeader);
            if (dhItem != null && dhItem.oDrugHdrBasicInfo != null && !String.IsNullOrEmpty(dhItem.oDrugHdrBasicInfo.Drugname)) {
                if (dhItem.oDrugHdrAddnlInfo != null) {
                    if ((!String.IsNullOrEmpty(dhItem.oDrugHdrBasicInfo.INFTYCODE) || (String.Compare(dhItem.oDrugHdrBasicInfo.ItemSubType, DrugItemSubTypeCode.MEDICAL_GAS, StringComparison.CurrentCultureIgnoreCase) == 0)) && (String.Compare(dhItem.oDrugHdrBasicInfo.SlotStatus, SlotStatus.NOTGIVEN, StringComparison.CurrentCultureIgnoreCase) == 0)) {
                        dhItem.oDrugHdrAddnlInfo.BegunAtLabel = Resource.InfusionChart.Recordat_text;
                    }
                    else {
                        dhItem.oDrugHdrAddnlInfo.DueAtLabel = Resource.InfusionChart.Dueat_text;
                        if ((!String.IsNullOrEmpty(dhItem.oDrugHdrBasicInfo.INFTYCODE) || (String.Compare(dhItem.oDrugHdrBasicInfo.ItemSubType, DrugItemSubTypeCode.MEDICAL_GAS, StringComparison.CurrentCultureIgnoreCase) == 0)) && (String.Compare(dhItem.oDrugHdrBasicInfo.SlotStatus, SlotStatus.INPROGRESS, StringComparison.CurrentCultureIgnoreCase) == 0) || (String.Compare(dhItem.oDrugHdrBasicInfo.SlotStatus, SlotStatus.PAUSED, StringComparison.CurrentCultureIgnoreCase) == 0) || (String.Compare(dhItem.oDrugHdrBasicInfo.SlotStatus, SlotStatus.STOPPED, StringComparison.CurrentCultureIgnoreCase) == 0) || (String.Compare(dhItem.oDrugHdrBasicInfo.SlotStatus, SlotStatus.COMPLETED, StringComparison.CurrentCultureIgnoreCase) == 0))
                            dhItem.oDrugHdrAddnlInfo.BegunAtLabel = Resource.InfusionChart.Begunat_text;
                        else dhItem.oDrugHdrAddnlInfo.BegunAtLabel = Resource.InfusionChart.Recordat_text;
                    }
                    dhItem.oDrugHdrAddnlInfo.ReviewAtLabel = Resource.InfusionChart.ReviewDue_text;
                }
                return LineDisplayHelper.GetLineItemContentForDrugHeader("CC_MLDPRESITEM", dhItem.oDrugHdrBasicInfo, dhItem.oDrugHdrAddnlInfo);
            }
        }
        else {
            let colWidth: number = Number.NaN;
            let tbTextBlock: TextBlock = null;
            cntControl = CommonMedicationConvertor.LineDisplayHelper.GetPrescriptionItem(Common.GetPrescriptionLineItemVM(value), colWidth, parameter.ToString(), (o) => { tbTextBlock = o; });
        }
        let objpgdmlist: PGDListVM = ObjectHelper.CreateType<PGDListVM>(value, PGDListVM);
        let bAddlCmntsExist: boolean = false;
        if (MedicationCommonProfileData.MedLineDisplay != null && MedicationCommonProfileData.MedLineDisplay.objLineDisConfig != null && MedicationCommonProfileData.MedLineDisplay.objLineDisConfig.Count > 0) {
            bAddlCmntsExist = (MedicationCommonProfileData.MedLineDisplay.objLineDisConfig.Where(C => String.Equals(C.FieldCode, "CC_ADDCOM_ICO", StringComparison.InvariantCultureIgnoreCase) && String.Equals(C.ColCode, "CC_MLDPRESITEM", StringComparison.InvariantCultureIgnoreCase) && C.IsSelected == 1).ToList().Count == 0) ? false : true;
        }
        if (value != null && value instanceof PGDListVM && !String.IsNullOrEmpty(objpgdmlist.Comments) && !bAddlCmntsExist) {
            let img1: Image = new Image();
            img1.Margin = new Thickness(2, 0, 2, 0);
            img1.Stretch = Stretch.None;
            img1.Source = new BitmapImage(new Uri(MedImage.GetPath(MedImages.additionalcommentsicon), UriKind.RelativeOrAbsolute));
            ToolTipService.SetToolTip(img1, ObjectHelper.CreateObject(new iLabel(), { Text: objpgdmlist.Comments, IsWordwrap: true, MaxWidth: 250 }));
            cntControl.InLines.Add(ObjectHelper.CreateObject(new iLabelInLineElement(), { InLine: img1 }));
        }
        if (value != null && value instanceof PGDListVM && !String.IsNullOrEmpty(objpgdmlist.IsControlledDrug) && String.Compare(objpgdmlist.IsControlledDrug, "1", StringComparison.InvariantCultureIgnoreCase) == 0) {
            if (((String.Compare(objpgdmlist.ItemSubType, CConstants.ItemSubType, StringComparison.OrdinalIgnoreCase) == 0)) || (String.Compare(objpgdmlist.ItemSubType, CConstants.ItemSubType, StringComparison.OrdinalIgnoreCase) != 0) || String.IsNullOrEmpty(objpgdmlist.ItemSubType)) {
                let img1: Image = new Image();
                img1.Margin = new Thickness(2, 0, 2, 0);
                img1.Stretch = Stretch.None;
                img1.Source = new BitmapImage(new Uri(MedImage.GetPath(MedImages.ControlledDrugIcon), UriKind.RelativeOrAbsolute));
                ToolTipService.SetToolTip(img1, ObjectHelper.CreateObject(new iLabel(), { Text: MedsAdminChartToolTip.ControlledDrug, IsWordwrap: true, MaxWidth: 250 }));
                cntControl.InLines.Add(ObjectHelper.CreateObject(new iLabelInLineElement(), { InLine: img1 }));
            }
        }
        return cntControl;
    }
    public ConvertBack(value: any, targetType: Type, parameter: any, culture: CultureInfo): any {
        return value;
    }
}
export class DisplayOtherInformationLineItem {
    public Convert(value: any, targetType: Type, parameter: any, culture: CultureInfo): any {
        let cntControl: iLabel = new iLabel();
        let colWidth: number = Number.NaN;
        cntControl = CommonMedicationConvertor.LineDisplayHelper.GetOtherInformation(Common.GetPrescriptionLineItemVM(value), colWidth);
        return cntControl;
    }
    public ConvertBack(value: any, targetType: Type, parameter: any, culture: CultureInfo): any {
        return value;
    }
}
export class LineDisplayHelper {
    static lnDisFilter: ObservableCollection<LineDisplayConfigurations>;
    public static GetLineItemContent(sType: string, oDrgHeader: DrugHeaderItem, oDrugAddnlInfo: CDrugHdrAddnlInfo): iLabel {
        let paraLineDisplay: iLabel = ObjectHelper.CreateObject(new iLabel(), { TextAlignment: TextAlignment.Left, IsWordwrap: true });
        let lnDis: ObservableCollection<LineDisplayConfigurations> = MedicationCommonProfileData.MedLineDisplay.objLineDisConfig;
        // let PRESITEM = from LineDisplayElement in lnDis
        // where LineDisplayElement.IsSelected == 1 && String.Compare(LineDisplayElement.ColCode, "CC_MLDPRESITEM", StringComparison.OrdinalIgnoreCase) == 0
        // select LineDisplayElement;
        let PRESITEM = lnDis.Where(LineDisplayElement => LineDisplayElement.IsSelected == 1 && String.Compare(LineDisplayElement.ColCode, "CC_MLDPRESITEM", StringComparison.OrdinalIgnoreCase) == 0).Select(LineDisplayElement => LineDisplayElement);
        LineDisplayHelper.lnDisFilter = new ObservableCollection<LineDisplayConfigurations>(PRESITEM);
        let oMLD: CMedicationLineDisplayData = null;
        if (String.Compare(sType, "CC_MLDPRESITEM", StringComparison.OrdinalIgnoreCase) == 0) {
            oMLD = new CMedicationLineDisplayData();
            oMLD.sColorCode = MedicationCommonProfileData.MedLineDisplay.sColorCode;
            oMLD.objLineDisConfig = LineDisplayHelper.lnDisFilter;
        }
        let iCnt: number;
        if (String.Compare(oDrgHeader.ItemSubType, CConstants.ItemSubType, StringComparison.CurrentCultureIgnoreCase) == 0 && oDrgHeader.MultiComponentItems != null) {
            if (oDrgHeader.MultiComponentItems.Count > 5) {
                if (String.Compare(oDrgHeader.LorenzoID, CConstants.ADHOC_ITEM_LORENZOID, StringComparison.CurrentCultureIgnoreCase) == 0)
                    LineDisplayHelper.GetDrugDetailByProfileConfig(oMLD, oDrgHeader, oDrugAddnlInfo, oDrgHeader.AdhocItemCaption, oDrgHeader.ProductForm, sType, true, 0, paraLineDisplay);
                else LineDisplayHelper.GetDrugDetailByProfileConfig(oMLD, oDrgHeader, oDrugAddnlInfo, oDrgHeader.Drugname, oDrgHeader.ProductForm, sType, true, 0, paraLineDisplay);
            }
            else {
                for (; iCnt < oDrgHeader.MultiComponentItems.Count; iCnt++) {
                    LineDisplayHelper.GetDrugDetailByProfileConfig(oMLD, oDrgHeader, oDrugAddnlInfo, oDrgHeader.MultiComponentItems[iCnt], String.Empty, sType, true, iCnt, paraLineDisplay);
                    if (String.Compare(oDrgHeader.LorenzoID, CConstants.ADHOC_ITEM_LORENZOID, StringComparison.CurrentCultureIgnoreCase) == 0) {
                        let InLineRun: iLabelInLineElement = new iLabelInLineElement();
                        let sRun: TextBlock = new TextBlock();
                        sRun.Text = Environment.NewLine;
                        InLineRun.InLine = sRun;
                        paraLineDisplay.InLines.Add(InLineRun);
                    }
                }
                LineDisplayHelper.GetDrugDetailByProfileConfig(oMLD, oDrgHeader, oDrugAddnlInfo, String.Empty, oDrgHeader.ProductForm, sType, true, 0, paraLineDisplay);
            }
        }
        else {
            LineDisplayHelper.GetDrugDetailByProfileConfig(oMLD, oDrgHeader, oDrugAddnlInfo, oDrgHeader.Drugname, oDrgHeader.ProductForm, sType, true, 0, paraLineDisplay);
        }
        if (!String.IsNullOrEmpty(oDrgHeader.INFTYCODE) || String.Compare(oDrgHeader.ItemSubType, DrugItemSubTypeCode.MEDICAL_GAS, StringComparison.CurrentCultureIgnoreCase) == 0) {
            let iCounter: number = 0;
            let TCnt: number = oMLD.objLineDisConfig.Count;
            for (; iCnt < TCnt; iCnt++) {
                let isRowSlectd: number = oMLD.objLineDisConfig[iCnt].IsSelected;
                if (String.Compare(sType, oMLD.objLineDisConfig[iCnt].ColCode) == 0) {
                    switch (oMLD.objLineDisConfig[iCnt].FieldCode) {
                        case "CC_FLUID":
                            if (isRowSlectd == 1 && !String.IsNullOrEmpty(oDrgHeader.Fluid)) {
                                LineDisplayHelper.SetQualifierAndText(oDrgHeader.Fluid, oMLD.objLineDisConfig[iCnt].CaseCode, oMLD.objLineDisConfig[iCnt].FontStyleCode, oMLD.objLineDisConfig[iCnt].Qualifier, oMLD.sColorCode, paraLineDisplay);
                            }
                            iCounter++;
                            break;
                        case "CC_INFUSNTYP":
                            if (isRowSlectd == 1 && !String.IsNullOrEmpty(oDrgHeader.INFTYCODE)) {
                                LineDisplayHelper.SetQualifierAndText(CommonBB.GetText(oDrgHeader.INFTYCODE, InfusionTypeConceptCodeData.ConceptCodes), oMLD.objLineDisConfig[iCnt].CaseCode, oMLD.objLineDisConfig[iCnt].FontStyleCode, oMLD.objLineDisConfig[iCnt].Qualifier, oMLD.sColorCode, paraLineDisplay);
                            }
                            iCounter++;
                            break;
                        case "CC_CONCENTRATION":
                            if (isRowSlectd == 1 && String.Compare(oDrgHeader.ItemSubType, DrugItemSubTypeCode.MEDICAL_GAS, StringComparison.CurrentCultureIgnoreCase) == 0 && !String.IsNullOrEmpty(oDrgHeader.Concentration)) {
                                LineDisplayHelper.SetQualifierAndText(oDrgHeader.Concentration, oMLD.objLineDisConfig[iCnt].CaseCode, oMLD.objLineDisConfig[iCnt].FontStyleCode, oMLD.objLineDisConfig[iCnt].Qualifier, oMLD.sColorCode, paraLineDisplay);
                            }
                            iCounter++;
                            break;
                    }
                    if (iCounter == 3)
                        break;
                }
            }
        }
        return paraLineDisplay;
    }
    public static GetLineItemContentForDrugHeader(sType: string, oDrgHeader: DrugHeaderItem, oDrugAddnlInfo: CDrugHdrAddnlInfo): StackPanel {
        let Content: StackPanel = new StackPanel();
        let paraLineDisplay: iLabel = ObjectHelper.CreateObject(new iLabel(), { TextAlignment: TextAlignment.Left, IsWordwrapbreak: true });
        let lnDis: ObservableCollection<LineDisplayConfigurations> = MedicationCommonProfileData.MedLineDisplay.objLineDisConfig;
        // let PRESITEM = from LineDisplayElement in lnDis
        // where LineDisplayElement.IsSelected == 1 && String.Compare(LineDisplayElement.ColCode, "CC_MLDPRESITEM", StringComparison.OrdinalIgnoreCase) == 0
        // select LineDisplayElement;
        let PRESITEM = lnDis.Where(LineDisplayElement => LineDisplayElement.IsSelected == 1 && String.Compare(LineDisplayElement.ColCode, "CC_MLDPRESITEM", StringComparison.OrdinalIgnoreCase) == 0).Select(LineDisplayElement => LineDisplayElement);
        LineDisplayHelper.lnDisFilter = new ObservableCollection<LineDisplayConfigurations>(PRESITEM);
        let oMLD: CMedicationLineDisplayData = null;
        if (String.Compare(sType, "CC_MLDPRESITEM", StringComparison.OrdinalIgnoreCase) == 0) {
            oMLD = new CMedicationLineDisplayData();
            oMLD.sColorCode = MedicationCommonProfileData.MedLineDisplay.sColorCode;
            oMLD.objLineDisConfig = LineDisplayHelper.lnDisFilter;
        }
        let iCnt: number;
        if (String.Compare(oDrgHeader.ItemSubType, CConstants.ItemSubType, StringComparison.CurrentCultureIgnoreCase) == 0 && oDrgHeader.MultiComponentItems != null) {
            if (oDrgHeader.MultiComponentItems.Count > 5) {
                if (String.Compare(oDrgHeader.LorenzoID, CConstants.ADHOC_ITEM_LORENZOID, StringComparison.CurrentCultureIgnoreCase) == 0)
                    LineDisplayHelper.GetDrugDetailByProfileConfig(oMLD, oDrgHeader, oDrugAddnlInfo, oDrgHeader.AdhocItemCaption, oDrgHeader.ProductForm, sType, true, 0, paraLineDisplay);
                else LineDisplayHelper.GetDrugDetailByProfileConfig(oMLD, oDrgHeader, oDrugAddnlInfo, oDrgHeader.Drugname, oDrgHeader.ProductForm, sType, true, 0, paraLineDisplay);
            }
            else {
                if (String.Compare(oDrgHeader.LorenzoID, CConstants.ADHOC_ITEM_LORENZOID, StringComparison.CurrentCultureIgnoreCase) == 0) {
                    oDrgHeader.bIsFluidControlDrug = false;
                    let nCount: number = oDrgHeader.MultiComponentItems.Count;
                    for (let iCnt: number = 0; iCnt < nCount; iCnt++) {
                        let paraLineDisplayMCI: iLabel = ObjectHelper.CreateObject(new iLabel(), { TextAlignment: TextAlignment.Left, IsWordwrapbreak: true });
                        if (iCnt == oDrgHeader.MultiComponentItems.Count - 1)
                            LineDisplayHelper.GetDrugDetailByProfileConfig(oMLD, oDrgHeader, oDrugAddnlInfo, oDrgHeader.MultiComponentItems[iCnt], oDrgHeader.ProductForm, sType, true, iCnt, paraLineDisplayMCI);
                        else LineDisplayHelper.GetDrugDetailByProfileConfig(oMLD, oDrgHeader, oDrugAddnlInfo, oDrgHeader.MultiComponentItems[iCnt], String.Empty, sType, false, iCnt, paraLineDisplayMCI);
                        Content.Children.Add(paraLineDisplayMCI);
                    }
                    return Content;
                }
                else {
                    LineDisplayHelper.GetDrugDetailByProfileConfig(oMLD, oDrgHeader, oDrugAddnlInfo, oDrgHeader.Drugname, oDrgHeader.ProductForm, sType, true, 0, paraLineDisplay);
                }
            }
        }
        else {
            LineDisplayHelper.GetDrugDetailByProfileConfig(oMLD, oDrgHeader, oDrugAddnlInfo, oDrgHeader.Drugname, oDrgHeader.ProductForm, sType, true, 0, paraLineDisplay);
        }
        Content.Children.Add(paraLineDisplay);
        return Content;
    }
    private static GetDrugDetailByProfileConfig(oMLD: CMedicationLineDisplayData, oDrgHeader: DrugHeaderItem, oDrugAddnlInfo: CDrugHdrAddnlInfo, sDrugName: string, sProductForm: string, sType: string, bTypeShown: boolean, MCICnt: number, paraLineDisplay: iLabel): void {
        if (oMLD != null && oMLD.objLineDisConfig != null) {
            let sTmpDrugName: string[] = sDrugName.Split('~');
            let sTmpDrugProp: string[];
            let iCnt: number, TCnt = oMLD.objLineDisConfig.Count;
            let iCounter: number = 0;
            let IsControlDrug: boolean = false;
            let isProductFormExist: boolean = false;
            let sCaseCode: string = String.Empty, sFontStyleCode = String.Empty, sQualifier = String.Empty, sColorCode = String.Empty;
            let TmpMultiComponentItems: ArrayOfString = new ArrayOfString();
            for (iCnt = 0; iCnt < TCnt; iCnt++) {
                let isRowSlectd: number = oMLD.objLineDisConfig[iCnt].IsSelected;
                if (String.Compare(sType, oMLD.objLineDisConfig[iCnt].ColCode) == 0) {
                    switch (oMLD.objLineDisConfig[iCnt].FieldCode) {
                        case "CC_DRUGNAME":
                            if (isRowSlectd == 1 && !String.IsNullOrEmpty(sTmpDrugName[0].Trim())) {
                                LineDisplayHelper.SetQualifierAndText(sTmpDrugName[0].Trim(), oMLD.objLineDisConfig[iCnt].CaseCode, oMLD.objLineDisConfig[iCnt].FontStyleCode, oMLD.objLineDisConfig[iCnt].Qualifier, oMLD.sColorCode, paraLineDisplay);
                                if (!String.IsNullOrEmpty(sTmpDrugName[0].Trim())) {
                                    if (String.Compare(oDrgHeader.ItemSubType, CConstants.ItemSubType, StringComparison.CurrentCultureIgnoreCase) == 0) {
                                        for (let nCnt: number = 0; nCnt < oDrgHeader.MultiComponentItems.Count; nCnt++) {
                                            if (!String.IsNullOrEmpty(oDrgHeader.MultiComponentItems[nCnt].Trim()))
                                                TmpMultiComponentItems.Add(oDrgHeader.MultiComponentItems[nCnt].Substring(0, oDrgHeader.MultiComponentItems[nCnt].IndexOf('~')));
                                            if (!IsControlDrug && !String.Equals(oDrgHeader.LorenzoID, CConstants.ADHOC_ITEM_LORENZOID) && oDrgHeader.MultiComponentItems.Count <= 5) {
                                                sTmpDrugProp = oDrgHeader.MultiComponentItems[nCnt].Split('~');
                                                if (sTmpDrugProp != null && sTmpDrugProp.length >= 2 && !String.IsNullOrEmpty(sTmpDrugProp[1].Trim()) && String.Compare(sTmpDrugProp[1].Trim(), "CC_CNTRLDDRUG", StringComparison.CurrentCultureIgnoreCase) == 0) {
                                                    IsControlDrug = true;
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            iCounter++;
                            break;
                        case "CC_FORM":
                            if (isRowSlectd == 1 && !String.IsNullOrEmpty(sProductForm)) {
                                isProductFormExist = true;
                                sCaseCode = oMLD.objLineDisConfig[iCnt].CaseCode;
                                sFontStyleCode = oMLD.objLineDisConfig[iCnt].FontStyleCode;
                                sQualifier = oMLD.objLineDisConfig[iCnt].Qualifier;
                                sColorCode = oMLD.sColorCode;
                            }
                            iCounter++;
                            break;
                    }
                    if (iCounter == 2)
                        break;
                }
            }
            if (String.Equals(oDrgHeader.ItemSubType, CConstants.ItemSubType) && ((String.Equals(oDrgHeader.LorenzoID, CConstants.ADHOC_ITEM_LORENZOID) && oDrgHeader.MultiComponentItems.Count <= 5 && MCICnt == oDrgHeader.MultiComponentItems.Count - 1) || (String.Equals(oDrgHeader.LorenzoID, CConstants.ADHOC_ITEM_LORENZOID) && oDrgHeader.MultiComponentItems.Count > 5) || (!String.Equals(oDrgHeader.LorenzoID, CConstants.ADHOC_ITEM_LORENZOID)))) {
                let img1: Image = new Image();
                img1.Margin = new Thickness(2, 0, 2, -3);
                img1.Height = 16;
                img1.Width = 16;
                img1.Top = 4;
                img1.Stretch = Stretch.None;
                img1.Source = new BitmapImage(new Uri(MedImage.GetPath(MedImages.MultiComponentItemIcon), UriKind.RelativeOrAbsolute));
                ToolTipService.SetToolTip(img1, ObjectHelper.CreateObject(new iLabel(), { Text: String.Join("\n", TmpMultiComponentItems.ToArray()), IsWordwrap: true, IsWordwrapbreak: true, MaxWidth: 250 }));
                paraLineDisplay.InLines.Add(ObjectHelper.CreateObject(new iLabelInLineElement(), { InLine: img1 }));
            }
            if (!String.IsNullOrEmpty(sTmpDrugName[0].Trim())) {
                if (oDrgHeader.bIsControlDrug || IsControlDrug || (sTmpDrugName.length >= 2 && !String.IsNullOrEmpty(sTmpDrugName[1].Trim()) && String.Compare(sTmpDrugName[1].Trim(), "CC_CNTRLDDRUG", StringComparison.CurrentCultureIgnoreCase) == 0)) {
                    let img1: Image = new Image();
                    img1.Margin = new Thickness(2, 0, 0, -3);
                    img1.Stretch = Stretch.None;
                    img1.Source = new BitmapImage(new Uri(MedImage.GetPath(MedImages.ControlledDrugIcon), UriKind.RelativeOrAbsolute));
                    ToolTipService.SetToolTip(img1, ObjectHelper.CreateObject(new iLabel(), { Text: MedsAdminChartToolTip.ControlledDrug, IsWordwrap: true, MaxWidth: 250 }));
                    paraLineDisplay.InLines.Add(ObjectHelper.CreateObject(new iLabelInLineElement(), { InLine: img1 }));
                    oDrgHeader.bIsControlDrugICON = true;
                }
            }
            if ((String.IsNullOrEmpty(oDrgHeader.INFTYCODE) || String.Equals(oDrgHeader.ItemSubType, CConstants.ItemSubType, StringComparison.CurrentCultureIgnoreCase)) && isProductFormExist) {
                LineDisplayHelper.SetQualifierAndText(sProductForm, sCaseCode, sFontStyleCode, sQualifier, sColorCode, paraLineDisplay);
            }
            if ((oDrugAddnlInfo != null && (oDrugAddnlInfo.RecordAdminViewed != RecordAdminType.RecordAdmin || (!String.IsNullOrEmpty(oDrgHeader.INFTYCODE) && String.Equals(oDrgHeader.INFTYCODE, InfusionTypeCode.INTERMITTENT, StringComparison.InvariantCultureIgnoreCase)))) || (oDrugAddnlInfo == null))
                LineDisplayHelper.SetInfusionDrugLineItem(oDrgHeader, bTypeShown, paraLineDisplay);
        }
    }
    private static SetInfusionDrugLineItem(oDrgHeader: DrugHeaderItem, bTypeShown: boolean, paraLineDisplay: iLabel): void {
        if ((String.Compare(oDrgHeader.ItemSubType, DrugItemSubTypeCode.MEDICAL_GAS, StringComparison.CurrentCultureIgnoreCase) == 0) && !String.IsNullOrEmpty(oDrgHeader.Concentration)) {
            let InLineRun: iLabelInLineElement = new iLabelInLineElement();
            let sRun: TextBlock = new TextBlock();
            sRun.FontFamily = new FontFamily("Verdana");
            sRun.Foreground = new SolidColorBrush(Colors.Black);
            sRun.Text = "- " + oDrgHeader.Concentration;
            InLineRun.InLine = sRun;
            paraLineDisplay.InLines.Add(InLineRun);
        }
        else if (!String.IsNullOrEmpty(oDrgHeader.INFTYCODE)) {
            if (!String.IsNullOrEmpty(oDrgHeader.Fluid)) {
                let InLineRun: iLabelInLineElement = new iLabelInLineElement();
                let sRun: iLabel = new iLabel();
                sRun.FontWeight = FontWeights.Bold;
                sRun.FontFamily = new FontFamily("Verdana");
                if(oDrgHeader.INFTYCODE == "CC_IPPINFTYPCON") {
                    sRun.Margin = new Thickness(0, 2, 0, 0);
                }
                if (oDrgHeader.bIsControlDrugICON) {
                    sRun.Margin = new Thickness(2, 0, 0, 0);
                }
                // sRun.Style = ObjectHelper.CreateType<Style>(App.Current.Resources["DrugFluidName"], Style);
                sRun.Text = String.Format(Resource.InfusionChart.InFluid_text, oDrgHeader.Fluid);
                InLineRun.InLine = sRun;
                paraLineDisplay.InLines.Add(InLineRun);
            }
            if (oDrgHeader.bIsControlDrugICON == false && oDrgHeader.bIsFluidControlDrug) {
                let img1: Image = new Image();
                img1.Margin = new Thickness(2, 0, 2, 0);
                img1.Stretch = Stretch.None;
                img1.Source = new BitmapImage(new Uri(MedImage.GetPath(MedImages.ControlledDrugIcon), UriKind.RelativeOrAbsolute));
                ToolTipService.SetToolTip(img1, ObjectHelper.CreateObject(new iLabel(), { Text: MedsAdminChartToolTip.ControlledDrug, IsWordwrap: true, MaxWidth: 250 }));
                paraLineDisplay.InLines.Add(ObjectHelper.CreateObject(new iLabelInLineElement(), { InLine: img1 }));
            }
            if (bTypeShown) {
                let InLineRun1: iLabelInLineElement = new iLabelInLineElement();
                let sRun1: iLabel = new iLabel();
                sRun1.Margin = new Thickness(0, 2, 0, 0);
                sRun1.FontFamily = new FontFamily("Verdana");
                // sRun1.Style = ObjectHelper.CreateType<Style>(App.Current.Resources["DrugInfusionType"], Style);
                sRun1.Text = "- " + CommonBB.GetText(oDrgHeader.INFTYCODE, InfusionTypeConceptCodeData.ConceptCodes);
                InLineRun1.InLine = sRun1;
                paraLineDisplay.InLines.Add(InLineRun1);
            }
        }
    }
    private static SetQualifierAndText(sItemValue: string, sCaseCode: string, sFontStyleCode: string, sQualifier: string, sColor: string, paraLineDisplay: iLabel): void {
        if (!String.IsNullOrEmpty(sItemValue)) {
            if (!String.IsNullOrEmpty(sQualifier) && sQualifier != " ") {
                let InLineQualifier: iLabelInLineElement = new iLabelInLineElement();
                let tbQualifier: iLabel = new iLabel();
                tbQualifier.FontFamily = new FontFamily("Verdana");
                if (!String.IsNullOrEmpty(sColor)) {
                    tbQualifier.Foreground = new SolidColorBrush(LineDisplayHelper.hexToColor(sColor));
                    tbQualifier.Text = sQualifier + " ";
                }
                else {
                    tbQualifier.Foreground = new SolidColorBrush(Colors.Black);
                    tbQualifier.Text = " " + sQualifier + " ";
                }
                InLineQualifier.InLine = tbQualifier;
                paraLineDisplay.InLines.Add(InLineQualifier);
            }
            let InLineRun: iLabelInLineElement = new iLabelInLineElement();
            let sRun: iLabel = new iLabel();
            //sRun.Style = ObjectHelper.CreateType<Style>(App.Current.Resources["DrugName"], Style);
            sRun.Margin = new Thickness(0, 0, 3, 0);
            let sValue: string = String.Empty;
            if (!String.IsNullOrEmpty(sCaseCode)) {
                if (String.Compare(sCaseCode, "CC_MLDUPPER") == 0)
                    sValue = sItemValue.ToUpper();
                else if (String.Compare(sCaseCode, "CC_MLDLOWER") == 0)
                    sValue = sItemValue.ToLower();
                else sValue = sItemValue;
            }
            else sValue = sItemValue;
            if (!String.IsNullOrEmpty(sFontStyleCode)) {
                switch (sFontStyleCode) {
                    case "CC_MLDNORMAL":
                        {
                            sRun.Text = sRun.Text + sValue;
                            break;
                        }
                    case "CC_MLDBOLD":
                        {
                            sRun.Text = sValue;
                            sRun.FontStyle = FontStyles.Normal;
                            sRun.FontWeight = FontWeights.Bold;
                            break;
                        }
                    case "CC_MLDITALIC":
                        {
                            sRun.Text = sValue;
                            sRun.FontStyle = FontStyles.Italic;
                            break;
                        }
                }
            }
            else {
                sRun.Text = sValue;
            }
            InLineRun.InLine = sRun;
            paraLineDisplay.InLines.Add(InLineRun);
        }
    }
    private static hexToColor(hexValue: string): Color {
        try {
            // hexValue = hexValue.Replace("#", "");
            // let position: number = 0;
            let alpha: number = Convert.ToByte("ff", 16);
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
        }
        catch (err) {
            return Color.FromArgb(255, 251, 237, 187);
        }

    }
}
export class DoseWrapConverter {
    public Convert(value: any, targetType: Type, parameter: any, culture: CultureInfo): any {
        let objWPanel: WrapPanel = new WrapPanel();
        objWPanel.Orientation = Orientation.Horizontal;
        if (value != null) {
            if (value != null && value instanceof CDrugHeader) {
                let dhItem: CDrugHeader = ObjectHelper.CreateType<CDrugHeader>(value, CDrugHeader);
                if (dhItem != null && dhItem.oDrugHdrBasicInfo != null) {
                    objWPanel.Children.Add(new MedAdminMedlineConverterHelper().GetDoseWrapPanel(dhItem, parameter));
                }
            }
        }
        return objWPanel;
    }
    public ConvertBack(value: any, targetType: Type, parameter: any, culture: CultureInfo): any {
        throw new NotImplementedException();
    }
}
export class RouteWrapConverter {
    public Convert(value: any, targetType: Type, parameter: any, culture: CultureInfo): any {
        let objParentPanel: WrapPanel = new WrapPanel();
        objParentPanel.Orientation = Orientation.Horizontal;
        if (value != null && value instanceof CDrugHeader) {
            let objDrugItem: CDrugHeader = <CDrugHeader>value;
            if (objDrugItem != null && objDrugItem.oDrugHdrBasicInfo != null) {
                objParentPanel.Children.Add(new MedAdminMedlineConverterHelper().GetRouteWrapPanel(objDrugItem));
            }
        }
        return objParentPanel;
    }
    public ConvertBack(value: any, targetType: Type, parameter: any, culture: CultureInfo): any {
        throw new NotImplementedException();
    }
}
export class InfusionHeaderItem {
    public Convert(value: any, targetType: Type, parameter: any, culture: CultureInfo): any {
        let sDrugName: string = String.Empty;
        let sFluidName: string = String.Empty;
        let sInftype: string = String.Empty;
        let Content: StackPanel = new StackPanel();
        let cntControl: iLabel = ObjectHelper.CreateObject(new iLabel(), { TextAlignment: TextAlignment.Left, IsWordwrap: true });
        if (!String.IsNullOrEmpty((<InfrecordadminVM>(value)).DrugName)) {
            sDrugName = (<InfrecordadminVM>(value)).DrugName;
        }
        let rnText: iLabel = new iLabel();
        rnText.FontFamily = new FontFamily("Verdana");
        rnText.Margin = new Thickness(2, 0, 0, 0);
        rnText.FontWeight = FontWeights.Bold;
        rnText.Text = sDrugName;
        cntControl.InLines.Add(ObjectHelper.CreateObject(new iLabelInLineElement(), { InLine: rnText }));
        if ((<InfrecordadminVM>(value)).IsCDDrug) {
            let img1: Image = new Image();
            img1.Margin = new Thickness(6, 0, -1, -4);
            //  img1.Margin = new Thickness(2, 0, 2, 0);
            img1.Stretch = Stretch.None;
            img1.Source = new BitmapImage(new Uri(MedImage.GetPath(MedImages.ControlledDrugIcon), UriKind.RelativeOrAbsolute));
            ToolTipService.SetToolTip(img1, ObjectHelper.CreateObject(new iLabel(), { Text: MedsAdminChartToolTip.ControlledDrug, IsWordwrap: true, MaxWidth: 250 }));
            cntControl.InLines.Add(ObjectHelper.CreateObject(new iLabelInLineElement(), { InLine: img1 }));
        }
        if (!String.IsNullOrEmpty((<InfrecordadminVM>(value)).FluidName)) {
            sFluidName = "in " + (<InfrecordadminVM>(value)).FluidName;
            let rnFluidText: iLabel = new iLabel();
            rnFluidText.FontFamily = new FontFamily("Verdana");
            rnFluidText.Margin = new Thickness(2, 0, 0, 0);
            rnFluidText.FontWeight = FontWeights.Bold;
            rnFluidText.Text = sFluidName;
            cntControl.InLines.Add(ObjectHelper.CreateObject(new iLabelInLineElement(), { InLine: rnFluidText }));
            if ((<InfrecordadminVM>(value)).IsFluidCDDrug) {
                let img1: Image = new Image();
                img1.Margin = new Thickness(2, 0, 2, 0);
                img1.Stretch = Stretch.None;
                img1.Source = new BitmapImage(new Uri(MedImage.GetPath(MedImages.ControlledDrugIcon), UriKind.RelativeOrAbsolute));
                ToolTipService.SetToolTip(img1, ObjectHelper.CreateObject(new iLabel(), { Text: MedsAdminChartToolTip.ControlledDrug, IsWordwrap: true, MaxWidth: 250 }));
                cntControl.InLines.Add(ObjectHelper.CreateObject(new iLabelInLineElement(), { InLine: img1 }));
            }
        }
        if ((<InfrecordadminVM>(value)).InfusionType != null && !String.IsNullOrEmpty((<InfrecordadminVM>(value)).InfusionType.Value)) {
            sInftype = CommonBB.GetText((<InfrecordadminVM>(value)).InfusionType.Value, InfusionTypeConceptCodeData.ConceptCodes);
        }
        else {
            sInftype = CommonBB.GetText((<InfrecordadminVM>(value)).ItemSubType, InfusionTypeConceptCodeData.ConceptCodes);
        }
        if (!String.IsNullOrEmpty(sInftype)) {
            let rnText1: iLabel = new iLabel();
            rnText.Margin = new Thickness(2, 0, 0, 0);
            rnText1.FontFamily = new FontFamily("Verdana");
            rnText1.FontWeight = FontWeights.Bold;
            rnText1.Text = " - " + sInftype;
            cntControl.InLines.Add(ObjectHelper.CreateObject(new iLabelInLineElement(), { InLine: rnText1 }));
        }
        Content.Children.Add(cntControl);
        return Content;

    }
    public ConvertBack(value: any, targetType: Type, parameter: any, culture: CultureInfo): any {
        return value;
    }
}

export class TargetsatrangeConverter {
    public Convert(value: any, targetType: Type, parameter: any, culture: CultureInfo): any {
        let objParentPanel: WrapPanel = new WrapPanel();
        objParentPanel.Orientation = Orientation.Horizontal;
        if (value != null && value instanceof CDrugHeader) {
            let objDrugItem: CDrugHeader = <CDrugHeader>value;
            if (objDrugItem != null && objDrugItem.oDrugHdrBasicInfo != null) {
                objParentPanel.Children.Add(new MedAdminMedlineConverterHelper().GetTargetStrangePanel(objDrugItem));
            }
        }
        return objParentPanel;
    }
    public ConvertBack(value: any, targetType: Type, parameter: any, culture: CultureInfo): any {
        return value;
    }
}
export class HumidificationConverter {
    public Convert(value: any, targetType: Type, parameter: any, culture: CultureInfo): any {
        let objParentPanel: WrapPanel = new WrapPanel();
        objParentPanel.Orientation = Orientation.Horizontal;
        if (value != null && value instanceof CDrugHeader) {
            let objDrugItem: CDrugHeader = <CDrugHeader>value;
            if (objDrugItem != null && objDrugItem.oDrugHdrBasicInfo != null) {
                objParentPanel.Children.Add(new MedAdminMedlineConverterHelper().GetHumidificationWrapPannel(objDrugItem));
            }
        }
        return objParentPanel;
    }
    public ConvertBack(value: any, targetType: Type, parameter: any, culture: CultureInfo): any {
        return value;
    }
}
export class RecalcEstCompTimeConverter {
    public Convert(value: any, targetType: Type, parameter: any, culture: CultureInfo): any {
        if (value == null || parameter == null)
            return value;
        return Boolean.Parse(value.ToString()).Equals(Boolean.Parse(parameter.ToString()));
    }
    public ConvertBack(value: any, targetType: Type, parameter: any, culture: CultureInfo): any {
        if (value == null || parameter == null)
            return value;
        return Boolean.Parse(value.ToString()).Equals(Boolean.Parse(parameter.ToString()));

    }
}
export class MCItemDisplay {
    public Convert(value: any, targetType: Type, parameter: any, culture: CultureInfo): any {
        let cntControl: iLabel = new iLabel();
        let ObjPresItmVM: MedRequestVM = ObjectHelper.CreateType<MedRequestVM>(value, MedRequestVM);
        if (ObjPresItmVM != null && ObjPresItmVM.oPrescriptionItemViewVM != null && !String.IsNullOrEmpty(ObjPresItmVM.oPrescriptionItemViewVM.IdentifyingName)) {
            let sMCIName: string[] = null;
            cntControl.IsParagraph = true;
            cntControl.IsWordwrap = true;
            let Prop: string = String.Empty;
            let rnMCIName: TextBlock = new TextBlock();
            sMCIName = ObjPresItmVM.oPrescriptionItemViewVM.IdentifyingName.Split('~');
            rnMCIName.Text = sMCIName[0];
            if (!String.IsNullOrEmpty(ObjPresItmVM.oPrescriptionItemViewVM.VMVPIdentifyingName) && !rnMCIName.Text.Contains(" - ")) {
                rnMCIName.Text = ObjPresItmVM.oPrescriptionItemViewVM.VMVPIdentifyingName + " - " + rnMCIName.Text;
            }
            let Testinline: iLabelInLineElement = new iLabelInLineElement();
            Testinline.IsWordwrap = true;
            Testinline.InLine = rnMCIName;
            cntControl.InLines.Add(Testinline);
            if (sMCIName.length > 1)
                Prop = sMCIName[1];
            if (!String.IsNullOrEmpty(Prop)) {
                let sprop: string[] = null;
                let sPrprty: string = String.Empty;
                sprop = Prop.Split(',');
                let nlength: number = sprop.length;
                for (let j: number = 0; j < nlength; j++) {
                    sPrprty = sprop[j];
                    MCItemDisplay.SetMCDrugProperty(sPrprty, cntControl);
                }
            }
        }
        else {
            cntControl.Text = ObjPresItmVM.oPrescriptionItemViewVM.IdentifyingName;
        }
        return cntControl;
    }
    public ConvertBack(value: any, targetType: Type, parameter: any, culture: CultureInfo): any {
        return value;
    }
    public static SetMCDrugProperty(DrugProps: string, paraLineDisplay: iLabel): void {
        switch (DrugProps) {
            case "CC_CNTRLDDRUG":
                let sTip: string = prescribedrugs.CC_CNTRLDDRUGelse_Tooltip;
                let img1: Image = new Image();
                img1.Margin = new Thickness(2, 0, 2, 0);
                img1.Stretch = Stretch.None;
                img1.Source = new BitmapImage(new Uri(MedImage.GetPath(MedImages.ControlledDrugIcon), UriKind.RelativeOrAbsolute));
                ToolTipService.SetToolTip(img1, sTip);
                paraLineDisplay.InLines.Add(ObjectHelper.CreateObject(new iLabelInLineElement(), { InLine: img1 }));
                break;
            case "CC_UNLICENSED":
                let sTip2: string = prescribedrugs.CC_UNLICENSEDelse_Tooltip;
                let img2: Image = new Image();
                img2.Margin = new Thickness(2, 0, 2, 0);
                img2.Stretch = Stretch.None;
                img2.Source = new BitmapImage(new Uri(MedImage.GetPath(MedImages.CC_UNLICENSED), UriKind.RelativeOrAbsolute));
                ToolTipService.SetToolTip(img2, sTip2);
                paraLineDisplay.InLines.Add(ObjectHelper.CreateObject(new iLabelInLineElement(), { InLine: img2 }));
                break;
            case "CC_HIGHRISK":
                let sTip1: string = prescribedrugs.CC_HIGHRISKif_Tooltip;
                let img3: Image = new Image();
                img3.Margin = new Thickness(2, 0, 2, 0);
                img3.Stretch = Stretch.None;
                img3.Source = new BitmapImage(new Uri(MedImage.GetPath(MedImages.CC_HIGHRISK), UriKind.RelativeOrAbsolute));
                ToolTipService.SetToolTip(img3, sTip1);
                paraLineDisplay.InLines.Add(ObjectHelper.CreateObject(new iLabelInLineElement(), { InLine: img3 }));
                break;
            case "CC_NEWLY":
                let sTip3: string = prescribedrugs.CC_NEWLYelse_Tooltip;
                let img4: Image = new Image();
                img4.Margin = new Thickness(2, 0, 2, 0);
                img4.Stretch = Stretch.None;
                img4.Source = new BitmapImage(new Uri(MedImage.GetPath(MedImages.CC_NEWLY), UriKind.RelativeOrAbsolute));
                ToolTipService.SetToolTip(img4, sTip3);
                paraLineDisplay.InLines.Add(ObjectHelper.CreateObject(new iLabelInLineElement(), { InLine: img4 }));
                break;
            case "CC_NAMEDRUG":
                let sTip4: string = prescribedrugs.CC_NAMEDRUGelse_Tooltip;
                let img5: Image = new Image();
                img5.Margin = new Thickness(2, 0, 2, 0);
                img5.Stretch = Stretch.None;
                img5.Source = new BitmapImage(new Uri(MedImage.GetPath(MedImages.CC_NAMEDRUG), UriKind.RelativeOrAbsolute));
                ToolTipService.SetToolTip(img5, sTip4);
                paraLineDisplay.InLines.Add(ObjectHelper.CreateObject(new iLabelInLineElement(), { InLine: img5 }));
                break;
        }
    }
}
export class MedScanProdDisplayPrescribedItem {
    public Convert(value: any, targetType: Type, parameter: any, culture: CultureInfo): any {
        let oMedScanRecVM: MedScanRecAdmVM = ObjectHelper.CreateType<MedScanRecAdmVM>(value, MedScanRecAdmVM);
        let objWPanel: StackPanel = new StackPanel();
        objWPanel.Orientation = Orientation.Horizontal;
        if (oMedScanRecVM != null && oMedScanRecVM.oDrugHeader != null) {
            let objMedAdminConverterHelper: MedAdminMedlineConverterHelper = new MedAdminMedlineConverterHelper();
            objWPanel.Children.Add(objMedAdminConverterHelper.GetMedAdminDrugHeaderFirstRow(oMedScanRecVM.oDrugHeader).ChildrenElementArray[0].ChildrenElementArray[0]);
            objWPanel.Children.Add(objMedAdminConverterHelper.GetDoseWrapPanel(oMedScanRecVM.oDrugHeader));
            objMedAdminConverterHelper.ScanRecRouteWrapPanel(oMedScanRecVM.oDrugHeader, objWPanel);
            objWPanel.Children.Add(objMedAdminConverterHelper.GetTargetStrangePanel(oMedScanRecVM.oDrugHeader));
            objWPanel.Children.Add(objMedAdminConverterHelper.GetHumidificationWrapPannel(oMedScanRecVM.oDrugHeader));

            let dhItem: CDrugHeader = oMedScanRecVM.oDrugHeader;
            if (!String.IsNullOrEmpty(oMedScanRecVM.oDrugHeader.oDrugHdrBasicInfo.AdministrationInst)) {
                let tbDurationLabel: iLabel = new iLabel();
                tbDurationLabel.Margin = new Thickness(2, 0, 0, 0);
                let bindtbtbDurationLabel: Binding = new Binding();
                bindtbtbDurationLabel.Source = dhItem.oDrugHdrBasicInfo.AdministrationInst;
                tbDurationLabel.SetBinding(iLabel.TextProperty, bindtbtbDurationLabel);
                if (String.IsNullOrEmpty(oMedScanRecVM.oDrugHeader.oDrugHdrBasicInfo.INFTYCODE)) {
                    //tbDurationLabel.Style = ObjectHelper.CreateType<Style>(App.Current.Resources["DrugNonInfValue"], Style);
                }
                objWPanel.Children.Add(tbDurationLabel);
            }

            if (dhItem.oDrugHdrAddnlInfo != null) {
                if (!String.IsNullOrEmpty(dhItem.oDrugHdrAddnlInfo.IngredientAdminWarning)) {
                    let tbDurationLabel: iLabel = new iLabel();
                    tbDurationLabel.Margin = new Thickness(2, 0, 0, 0);
                    let bindtbtbDurationLabel: Binding = new Binding();
                    bindtbtbDurationLabel.Source = dhItem.oDrugHdrAddnlInfo.IngredientAdminWarning;
                    tbDurationLabel.SetBinding(iLabel.TextProperty, bindtbtbDurationLabel);
                    if (String.IsNullOrEmpty(oMedScanRecVM.oDrugHeader.oDrugHdrBasicInfo.INFTYCODE)) {
                        //tbDurationLabel.Style = ObjectHelper.CreateType<Style>(App.Current.Resources["DrugNonInfValue"], Style);
                    }
                    objWPanel.Children.Add(tbDurationLabel);
                }
                if (!String.IsNullOrEmpty(dhItem.oDrugHdrAddnlInfo.RecordedAt)) {
                    if (!String.IsNullOrEmpty(dhItem.oDrugHdrAddnlInfo.BegunAtLabel)) {
                        let tbDurationLabel: TextBlock = new TextBlock();
                        tbDurationLabel.Margin = new Thickness(2, 0, 0, 0);
                        let bindtbtbDurationLabel: Binding = new Binding();
                        bindtbtbDurationLabel.Source = dhItem.oDrugHdrAddnlInfo.BegunAtLabel;
                        tbDurationLabel.SetBinding(TextBlock.TextProperty, bindtbtbDurationLabel);
                        if (String.IsNullOrEmpty(oMedScanRecVM.oDrugHeader.oDrugHdrBasicInfo.INFTYCODE)) {
                            //tbDurationLabel.Style = ObjectHelper.CreateType<Style>(App.Current.Resources["DrugNonInfValue"], Style);
                        }
                        objWPanel.Children.Add(tbDurationLabel);
                    }
                    if (!String.IsNullOrEmpty(dhItem.oDrugHdrAddnlInfo.RecordedAt)) {
                        let tbDurationLabel: iLabel = new iLabel();
                        tbDurationLabel.Margin = new Thickness(2, 0, 0, 0);
                        let bindtbtbDurationLabel: Binding = new Binding();
                        bindtbtbDurationLabel.Source = dhItem.oDrugHdrAddnlInfo.RecordedAt;
                        tbDurationLabel.SetBinding(iLabel.TextProperty, bindtbtbDurationLabel);
                        if (String.IsNullOrEmpty(oMedScanRecVM.oDrugHeader.oDrugHdrBasicInfo.INFTYCODE)) {
                            //tbDurationLabel.Style = ObjectHelper.CreateType<Style>(App.Current.Resources["DrugNonInfValue"], Style);
                        }
                        objWPanel.Children.Add(tbDurationLabel);
                    }
                }
                else if (!String.IsNullOrEmpty(dhItem.oDrugHdrAddnlInfo.DueAt)) {
                    if (!String.IsNullOrEmpty(dhItem.oDrugHdrAddnlInfo.DueAtLabel)) {
                        let tbDurationLabel: TextBlock = new TextBlock();
                        tbDurationLabel.Margin = new Thickness(2, 0, 0, 0);
                        let bindtbtbDurationLabel: Binding = new Binding();
                        bindtbtbDurationLabel.Source = dhItem.oDrugHdrAddnlInfo.DueAtLabel;
                        tbDurationLabel.SetBinding(TextBlock.TextProperty, bindtbtbDurationLabel);
                        if (String.IsNullOrEmpty(oMedScanRecVM.oDrugHeader.oDrugHdrBasicInfo.INFTYCODE)) {
                            //tbDurationLabel.Style = ObjectHelper.CreateType<Style>(App.Current.Resources["DrugNonInfValue"], Style);
                        }
                        objWPanel.Children.Add(tbDurationLabel);
                    }
                    if (!String.IsNullOrEmpty(dhItem.oDrugHdrAddnlInfo.DueAt)) {
                        let tbDurationLabel: TextBlock = new TextBlock();
                        tbDurationLabel.Margin = new Thickness(2, 0, 0, 0);
                        let bindtbtbDurationLabel: Binding = new Binding();
                        bindtbtbDurationLabel.Source = dhItem.oDrugHdrAddnlInfo.DueAt;
                        tbDurationLabel.SetBinding(TextBlock.TextProperty, bindtbtbDurationLabel);
                        if (String.IsNullOrEmpty(oMedScanRecVM.oDrugHeader.oDrugHdrBasicInfo.INFTYCODE)) {
                            //tbDurationLabel.Style = ObjectHelper.CreateType<Style>(App.Current.Resources["DrugNonInfValue"], Style);
                        }
                        objWPanel.Children.Add(tbDurationLabel);
                    }
                }
                if (!String.IsNullOrEmpty(dhItem.oDrugHdrAddnlInfo.ReviewAt)) {
                    if (!String.IsNullOrEmpty(dhItem.oDrugHdrAddnlInfo.ReviewAtLabel)) {
                        let tbDurationLabel: TextBlock = new TextBlock();
                        tbDurationLabel.Margin = new Thickness(2, 0, 0, 0);
                        let bindtbtbDurationLabel: Binding = new Binding();
                        bindtbtbDurationLabel.Source = dhItem.oDrugHdrAddnlInfo.ReviewAtLabel;
                        tbDurationLabel.SetBinding(TextBlock.TextProperty, bindtbtbDurationLabel);
                        if (String.IsNullOrEmpty(oMedScanRecVM.oDrugHeader.oDrugHdrBasicInfo.INFTYCODE)) {
                            //tbDurationLabel.Style = ObjectHelper.CreateType<Style>(App.Current.Resources["DrugNonInfValue"], Style);
                        }
                        objWPanel.Children.Add(tbDurationLabel);
                    }
                    if (!String.IsNullOrEmpty(dhItem.oDrugHdrAddnlInfo.ReviewAt)) {
                        let tbDurationLabel: TextBlock = new TextBlock();
                        tbDurationLabel.Margin = new Thickness(2, 0, 0, 0);
                        let bindtbtbDurationLabel: Binding = new Binding();
                        bindtbtbDurationLabel.Source = dhItem.oDrugHdrAddnlInfo.ReviewAt;
                        tbDurationLabel.SetBinding(TextBlock.TextProperty, bindtbtbDurationLabel);
                        if (String.IsNullOrEmpty(oMedScanRecVM.oDrugHeader.oDrugHdrBasicInfo.INFTYCODE)) {
                            //tbDurationLabel.Style = ObjectHelper.CreateType<Style>(App.Current.Resources["DrugNonInfValue"], Style);
                        }
                        objWPanel.Children.Add(tbDurationLabel);
                        if (dhItem.oDrugHdrAddnlInfo.ReviewAtVisibility == Visibility.Visible) {
                            let sTip: string = dhItem.oDrugHdrAddnlInfo.ReviewIconTooltip;
                            let img1: Image = new Image();
                            img1.Stretch = Stretch.None;
                            img1.Source = new BitmapImage(new Uri(MedImage.GetPath(MedImages.ReviewIcon), UriKind.RelativeOrAbsolute));
                            ToolTipService.SetToolTip(img1, sTip);
                            objWPanel.Children.Add(img1);
                        }
                    }
                }
            }
        }

        // Additional logic to format the content label horizontally
        let objStackPanel: StackPanel = new StackPanel();
        objWPanel.Orientation = Orientation.Horizontal;
        let paraLineDisplay: iLabel = ObjectHelper.CreateObject(new iLabel(), { TextAlignment: TextAlignment.Left, IsWordwrap: true });
        for (let i = 0; i < objWPanel.ChildrenElementArray.Count(); i++) {
            switch (i) {
                case 0:
                    if (objWPanel.ChildrenElementArray[i].iLabelInLineElements[0]) {
                        let InLineRun: iLabelInLineElement = new iLabelInLineElement();
                        InLineRun.InLine = objWPanel.ChildrenElementArray[i].iLabelInLineElements[0].InLine;
                        paraLineDisplay.InLines.Add(InLineRun);
                    }
                    if (objWPanel.ChildrenElementArray[i].iLabelInLineElements[1]) {
                        let InLineRun: iLabelInLineElement = new iLabelInLineElement();
                        InLineRun.InLine = objWPanel.ChildrenElementArray[i].iLabelInLineElements[1].InLine;
                        paraLineDisplay.InLines.Add(InLineRun);
                    }
                    break;
                case 1:
                    if (objWPanel.ChildrenElementArray[i].ChildrenElementArray[0]) {
                        if (objWPanel.ChildrenElementArray[i].ChildrenElementArray[0].iLabelInLineElements) {
                            let InLineRun1: iLabelInLineElement = new iLabelInLineElement();
                            InLineRun1.InLine = objWPanel.ChildrenElementArray[i].ChildrenElementArray[0].iLabelInLineElements[0].InLine;
                            paraLineDisplay.InLines.Add(InLineRun1);

                            let InLineRun2: iLabelInLineElement = new iLabelInLineElement();
                            InLineRun2.InLine = objWPanel.ChildrenElementArray[i].ChildrenElementArray[0].iLabelInLineElements[1].InLine;
                            paraLineDisplay.InLines.Add(InLineRun2);
                        }
                    }
                    if (objWPanel.ChildrenElementArray[i].ChildrenElementArray[1]) {
                        let InLineRun3: iLabelInLineElement = new iLabelInLineElement();
                        InLineRun3.InLine = objWPanel.ChildrenElementArray[i].ChildrenElementArray[1];
                        paraLineDisplay.InLines.Add(InLineRun3);
                    }
                    break;
                default:
                    if (objWPanel.ChildrenElementArray[i] instanceof iLabel || objWPanel.ChildrenElementArray[i] instanceof Image) {
                        let InLineRun: iLabelInLineElement = new iLabelInLineElement();
                        InLineRun.InLine = objWPanel.ChildrenElementArray[i];
                        paraLineDisplay.InLines.Add(InLineRun);
                    }
                    break;
            }
        }

        objStackPanel.Children.Add(paraLineDisplay);
        return objStackPanel;
    }
    public ConvertBack(value: any, targetType: Type, parameter: any, culture: CultureInfo): any {
        return value;
    }
}
export class MedAdminMedlineConverterHelper {
    public GetMedAdminDrugHeaderFirstRow(dhItem: CDrugHeader): StackPanel {
        let objWPanel: StackPanel = new StackPanel();
        objWPanel.Orientation = Orientation.Horizontal;
        if (dhItem != null && dhItem instanceof CDrugHeader) {
            if (dhItem != null && dhItem.oDrugHdrBasicInfo != null && !String.IsNullOrEmpty(dhItem.oDrugHdrBasicInfo.Drugname)) {
                if (dhItem.oDrugHdrAddnlInfo != null) {
                    if ((!String.IsNullOrEmpty(dhItem.oDrugHdrBasicInfo.INFTYCODE) || (String.Compare(dhItem.oDrugHdrBasicInfo.ItemSubType, DrugItemSubTypeCode.MEDICAL_GAS, StringComparison.CurrentCultureIgnoreCase) == 0)) && (String.Compare(dhItem.oDrugHdrBasicInfo.SlotStatus, SlotStatus.NOTGIVEN, StringComparison.CurrentCultureIgnoreCase) == 0)) {
                        dhItem.oDrugHdrAddnlInfo.BegunAtLabel = Resource.InfusionChart.Recordat_text;
                    }
                    else {
                        dhItem.oDrugHdrAddnlInfo.DueAtLabel = Resource.InfusionChart.Dueat_text;
                        if ((!String.IsNullOrEmpty(dhItem.oDrugHdrBasicInfo.INFTYCODE) || (String.Compare(dhItem.oDrugHdrBasicInfo.ItemSubType, DrugItemSubTypeCode.MEDICAL_GAS, StringComparison.CurrentCultureIgnoreCase) == 0)) && (String.Compare(dhItem.oDrugHdrBasicInfo.SlotStatus, SlotStatus.INPROGRESS, StringComparison.CurrentCultureIgnoreCase) == 0) || (String.Compare(dhItem.oDrugHdrBasicInfo.SlotStatus, SlotStatus.PAUSED, StringComparison.CurrentCultureIgnoreCase) == 0) || (String.Compare(dhItem.oDrugHdrBasicInfo.SlotStatus, SlotStatus.STOPPED, StringComparison.CurrentCultureIgnoreCase) == 0) || (String.Compare(dhItem.oDrugHdrBasicInfo.SlotStatus, SlotStatus.COMPLETED, StringComparison.CurrentCultureIgnoreCase) == 0))
                            dhItem.oDrugHdrAddnlInfo.BegunAtLabel = Resource.InfusionChart.Begunat_text;
                        else dhItem.oDrugHdrAddnlInfo.BegunAtLabel = Resource.InfusionChart.Recordat_text;
                    }
                    dhItem.oDrugHdrAddnlInfo.ReviewAtLabel = Resource.InfusionChart.ReviewDue_text;
                }
                objWPanel.Children.Add(LineDisplayHelper.GetLineItemContentForDrugHeader("CC_MLDPRESITEM", dhItem.oDrugHdrBasicInfo, dhItem.oDrugHdrAddnlInfo));
            }
        }
        return objWPanel;
    }
    public GetDoseWrapPanel(dhItem: CDrugHeader, parameter?): StackPanel {
        let objWPanel: StackPanel = new StackPanel();
        objWPanel.Orientation = Orientation.Horizontal;
        if (dhItem != null && dhItem.oDrugHdrBasicInfo != null) {
            let bInfRecordAdmin: boolean = ((dhItem.oDrugHdrAddnlInfo != null && dhItem.oDrugHdrAddnlInfo.RecordAdminViewed != RecordAdminType.RecordAdmin) || (dhItem.oDrugHdrAddnlInfo == null)) ? true : false;
            if (String.Compare(dhItem.oDrugHdrBasicInfo.ItemSubType, DrugItemSubTypeCode.MEDICAL_GAS, StringComparison.CurrentCultureIgnoreCase) == 0 && bInfRecordAdmin) {
                if (dhItem.oDrugHdrBasicInfo.IsPGD && !String.IsNullOrEmpty(dhItem.oDrugHdrBasicInfo.Dose)) {
                    let tbDoseLbl: TextBlock = new TextBlock();
                    tbDoseLbl.Margin = new Thickness(2, 0, 0, 0);
                    tbDoseLbl.FontWeight = FontWeights.Bold;
                    tbDoseLbl.IsWordwrap = false;
                    tbDoseLbl.Foreground = new SolidColorBrush(CommonBB.ToColor("#006dec"));
                    let bindDoseLbl: Binding = new Binding();
                    if (!String.IsNullOrEmpty(dhItem.oDrugHdrBasicInfo.DoseLabel)) {
                        bindDoseLbl.Source = dhItem.oDrugHdrBasicInfo.DoseLabel;
                    }
                    else bindDoseLbl.Source = String.Empty;
                    tbDoseLbl.SetBinding(TextBlock.TextProperty, bindDoseLbl);
                    objWPanel.Children.Add(tbDoseLbl);
                    let tbDose: TextBlock = new TextBlock();
                    tbDose.IsWordwrap = false;
                    let bindDose: Binding = new Binding();
                    bindDose.Source = dhItem.oDrugHdrBasicInfo.Dose;
                    tbDose.SetBinding(TextBlock.TextProperty, bindDose);
                    objWPanel.Children.Add(tbDose);
                }
                if (!String.IsNullOrEmpty(dhItem.oDrugHdrBasicInfo.Rate)) {
                    let tbRateLbl: TextBlock = new TextBlock();
                    tbRateLbl.Margin = new Thickness(2, 0, 0, 0);
                    tbRateLbl.FontWeight = FontWeights.Bold;
                    tbRateLbl.IsWordwrap = false;
                    tbRateLbl.Foreground = new SolidColorBrush(CommonBB.ToColor("#006dec"));
                    let bindRateLbl: Binding = new Binding();
                    if (!String.IsNullOrEmpty(dhItem.oDrugHdrBasicInfo.RateLabel)) {
                        bindRateLbl.Source = dhItem.oDrugHdrBasicInfo.RateLabel;
                    }
                    else {
                        bindRateLbl.Source = String.Empty;
                    }
                    tbRateLbl.SetBinding(TextBlock.TextProperty, bindRateLbl);
                    objWPanel.Children.Add(tbRateLbl);
                    let tbRate: TextBlock = new TextBlock();
                    tbRate.Margin = new Thickness(2, 0, 0, 0);
                    tbRate.IsWordwrap = false;
                    let bindRate: Binding = new Binding();
                    bindRate.Source = dhItem.oDrugHdrBasicInfo.Rate;
                    tbRate.SetBinding(TextBlock.TextProperty, bindRate);
                    objWPanel.Children.Add(tbRate);
                }
                if (!String.IsNullOrEmpty(dhItem.oDrugHdrBasicInfo.Duration)) {
                    let tbDurationLbl: TextBlock = new TextBlock();
                    if (DrugItemSubTypeCode.MEDICAL_GAS == "CC_MEDGAS") {
                        tbDurationLbl.Margin = new Thickness(2, 0, 0, 0);
                    }
                    tbDurationLbl.IsWordwrap = false;
                    let bindDurationLbl: Binding = new Binding();
                    if (!String.IsNullOrEmpty(dhItem.oDrugHdrBasicInfo.DurationLabel)) {
                        if (!String.IsNullOrEmpty(dhItem.oDrugHdrBasicInfo.Rate)) {
                            dhItem.oDrugHdrBasicInfo.DurationLabel = " - " + dhItem.oDrugHdrBasicInfo.DurationLabel;
                        }
                        bindDurationLbl.Source = dhItem.oDrugHdrBasicInfo.DurationLabel;
                    }
                    else {
                        bindDurationLbl.Source = String.Empty;
                    }
                    tbDurationLbl.SetBinding(TextBlock.TextProperty, bindDurationLbl);
                    objWPanel.Children.Add(tbDurationLbl);
                    let tbDuration: TextBlock = new TextBlock();
                    tbDuration.IsWordwrap = false;
                    let bindDuration: Binding = new Binding();
                    bindDuration.Source = dhItem.oDrugHdrBasicInfo.Duration;
                    tbDuration.SetBinding(TextBlock.TextProperty, bindDuration);
                    objWPanel.Children.Add(tbDuration);
                }
                if (!String.IsNullOrEmpty(dhItem.oDrugHdrBasicInfo.Ongoingvalue)) {
                    let tbOngoing: TextBlock = new TextBlock();
                    tbOngoing.IsWordwrap = false;
                    let bindOngoing: Binding = new Binding();
                    bindOngoing.Source = dhItem.oDrugHdrBasicInfo.Ongoingvalue;
                    tbOngoing.SetBinding(TextBlock.TextProperty, bindOngoing);
                    objWPanel.Children.Add(tbOngoing);
                }
                if (dhItem.oDrugHdrBasicInfo.bShowAsrequired && !String.IsNullOrEmpty(dhItem.oDrugHdrBasicInfo.AsRequiredText)) {
                    let tbAsReq: TextBlock = new TextBlock();
                    tbAsReq.IsWordwrap = false;
                    tbAsReq.Margin = new Thickness(2, 0, 0, 0);
                    let bindAsReq: Binding = new Binding();
                    if (!String.IsNullOrEmpty(dhItem.oDrugHdrBasicInfo.AsRequiredText) && dhItem.oDrugHdrBasicInfo.bShowAsrequired) {
                        bindAsReq.Source = dhItem.oDrugHdrBasicInfo.AsRequiredText;
                    }
                    else {
                        bindAsReq.Source = String.Empty;
                    }
                    tbAsReq.SetBinding(TextBlock.TextProperty, bindAsReq);
                    objWPanel.Children.Add(tbAsReq);
                }
            }
            else if (String.Compare(dhItem.oDrugHdrBasicInfo.INFTYCODE, InfusionTypeCode.PCA, StringComparison.CurrentCultureIgnoreCase) == 0 && bInfRecordAdmin) {
                if (!String.IsNullOrEmpty(dhItem.oDrugHdrBasicInfo.BoosterDose)) {
                    let tbBolusLbl: TextBlock = new TextBlock();
                    tbBolusLbl.Margin = new Thickness(2, 0, 0, 0);
                    tbBolusLbl.FontWeight = FontWeights.Bold;
                    tbBolusLbl.IsWordwrap = false;
                    tbBolusLbl.Foreground = new SolidColorBrush(CommonBB.ToColor("#006dec"));
                    let bindBolusLbl: Binding = new Binding();
                    if (!String.IsNullOrEmpty(dhItem.oDrugHdrBasicInfo.BolusLabel)) {
                        bindBolusLbl.Source = dhItem.oDrugHdrBasicInfo.BolusLabel;
                    }
                    else {
                        bindBolusLbl.Source = String.Empty;
                    }
                    tbBolusLbl.SetBinding(TextBlock.TextProperty, bindBolusLbl);
                    objWPanel.Children.Add(tbBolusLbl);
                    let tbBoosterDose: TextBlock = new TextBlock();
                    tbBoosterDose.Margin = new Thickness(2, 0, 0, 0);
                    tbBoosterDose.IsWordwrap = false;
                    let bindBoosterDose: Binding = new Binding();
                    bindBoosterDose.Source = dhItem.oDrugHdrBasicInfo.BoosterDose;
                    tbBoosterDose.SetBinding(TextBlock.TextProperty, bindBoosterDose);
                    objWPanel.Children.Add(tbBoosterDose);
                }
                if (!String.IsNullOrEmpty(dhItem.oDrugHdrBasicInfo.LockOutPeriod)) {
                    let tbLockOutPeriodLbl: TextBlock = new TextBlock();
                    tbLockOutPeriodLbl.Margin = new Thickness(2, 0, 0, 0);
                    tbLockOutPeriodLbl.FontWeight = FontWeights.Bold;
                    tbLockOutPeriodLbl.IsWordwrap = false;
                    tbLockOutPeriodLbl.Foreground = new SolidColorBrush(CommonBB.ToColor("#006dec"));
                    let bindLockOutPeriodLbl: Binding = new Binding();
                    if (!String.IsNullOrEmpty(dhItem.oDrugHdrBasicInfo.LockOutPeriodLabel)) {
                        bindLockOutPeriodLbl.Source = dhItem.oDrugHdrBasicInfo.LockOutPeriodLabel;
                    }
                    else {
                        bindLockOutPeriodLbl.Source = String.Empty;
                    }
                    tbLockOutPeriodLbl.SetBinding(TextBlock.TextProperty, bindLockOutPeriodLbl);
                    objWPanel.Children.Add(tbLockOutPeriodLbl);
                    let tbLockOutPeriod: TextBlock = new TextBlock();
                    tbLockOutPeriod.Margin = new Thickness(2, 0, 0, 0);
                    tbLockOutPeriod.IsWordwrap = false;
                    let bindLockOutPeriod: Binding = new Binding();
                    bindLockOutPeriod.Source = dhItem.oDrugHdrBasicInfo.LockOutPeriod;
                    tbLockOutPeriod.SetBinding(TextBlock.TextProperty, bindLockOutPeriod);
                    objWPanel.Children.Add(tbLockOutPeriod);
                }
                if (!String.IsNullOrEmpty(dhItem.oDrugHdrBasicInfo.MaxDose)) {
                    let tMaxDoseLbl: TextBlock = new TextBlock();
                    tMaxDoseLbl.Margin = new Thickness(2, 0, 0, 0);
                    tMaxDoseLbl.FontWeight = FontWeights.Bold;
                    tMaxDoseLbl.IsWordwrap = false;
                    tMaxDoseLbl.Foreground = new SolidColorBrush(CommonBB.ToColor("#006dec"));
                    let bindMaxDoseLbl: Binding = new Binding();
                    if (!String.IsNullOrEmpty(dhItem.oDrugHdrBasicInfo.MaxDoseLabel)) {
                        bindMaxDoseLbl.Source = dhItem.oDrugHdrBasicInfo.MaxDoseLabel;
                    }
                    else {
                        bindMaxDoseLbl.Source = String.Empty;
                    }
                    tMaxDoseLbl.SetBinding(TextBlock.TextProperty, bindMaxDoseLbl);
                    objWPanel.Children.Add(tMaxDoseLbl);
                    let tbMaxDose: TextBlock = new TextBlock();
                    tbMaxDose.Margin = new Thickness(2, 0, 0, 0);
                    tbMaxDose.IsWordwrap = false;
                    let bindMaxDose: Binding = new Binding();
                    bindMaxDose.Source = dhItem.oDrugHdrBasicInfo.MaxDose;
                    tbMaxDose.SetBinding(TextBlock.TextProperty, bindMaxDose);
                    objWPanel.Children.Add(tbMaxDose);
                }
                if (!String.IsNullOrEmpty(dhItem.oDrugHdrBasicInfo.Concentrationvalue)) {
                    let tConcentrationLbl: TextBlock = new TextBlock();
                    tConcentrationLbl.Margin = new Thickness(2, 0, 0, 0);
                    tConcentrationLbl.FontWeight = FontWeights.Bold;
                    tConcentrationLbl.IsWordwrap = false;
                    tConcentrationLbl.Foreground = new SolidColorBrush(CommonBB.ToColor("#006dec"));
                    let bindConcentrationLbl: Binding = new Binding();
                    if (!String.IsNullOrEmpty(dhItem.oDrugHdrBasicInfo.Concentrationlbl)) {
                        bindConcentrationLbl.Source = dhItem.oDrugHdrBasicInfo.Concentrationlbl;
                    }
                    else {
                        bindConcentrationLbl.Source = String.Empty;
                    }
                    tConcentrationLbl.SetBinding(TextBlock.TextProperty, bindConcentrationLbl);
                    objWPanel.Children.Add(tConcentrationLbl);
                    let tbConcentration: TextBlock = new TextBlock();
                    tbConcentration.Margin = new Thickness(2, 0, 0, 0);
                    tbConcentration.IsWordwrap = false;
                    let bindConcentration: Binding = new Binding();
                    bindConcentration.Source = dhItem.oDrugHdrBasicInfo.Concentrationvalue;
                    tbConcentration.SetBinding(TextBlock.TextProperty, bindConcentration);
                    objWPanel.Children.Add(tbConcentration);
                }
                if (!String.IsNullOrEmpty(dhItem.oDrugHdrBasicInfo.Rate)) {
                    let tbRateLbl: TextBlock = new TextBlock();
                    tbRateLbl.Margin = new Thickness(2, 0, 0, 0);
                    tbRateLbl.FontWeight = FontWeights.Bold;
                    tbRateLbl.IsWordwrap = false;
                    tbRateLbl.Foreground = new SolidColorBrush(CommonBB.ToColor("#006dec"));
                    let bindRateLbl: Binding = new Binding();
                    if (!String.IsNullOrEmpty(dhItem.oDrugHdrBasicInfo.RateLabel)) {
                        bindRateLbl.Source = dhItem.oDrugHdrBasicInfo.RateLabel;
                    }
                    else {
                        bindRateLbl.Source = String.Empty;
                    }
                    tbRateLbl.SetBinding(TextBlock.TextProperty, bindRateLbl);
                    objWPanel.Children.Add(tbRateLbl);
                    let tbRate: TextBlock = new TextBlock();
                    tbRate.Margin = new Thickness(2, 0, 0, 0);
                    tbRate.IsWordwrap = false;
                    let bindRate: Binding = new Binding();
                    bindRate.Source = dhItem.oDrugHdrBasicInfo.Rate;
                    tbRate.SetBinding(TextBlock.TextProperty, bindRate);
                    objWPanel.Children.Add(tbRate);
                }
                if (!String.IsNullOrEmpty(dhItem.oDrugHdrBasicInfo.Duration)) {
                    let tbDurationLbl: TextBlock = new TextBlock();
                    tbDurationLbl.Margin = new Thickness(2, 0, 0, 0);
                    tbDurationLbl.IsWordwrap = false;
                    let bindDurationLbl: Binding = new Binding();
                    if (!String.IsNullOrEmpty(dhItem.oDrugHdrBasicInfo.DurationLabel)) {
                        bindDurationLbl.Source = dhItem.oDrugHdrBasicInfo.DurationLabel;
                    }
                    else {
                        bindDurationLbl.Source = String.Empty;
                    }
                    tbDurationLbl.SetBinding(TextBlock.TextProperty, bindDurationLbl);
                    objWPanel.Children.Add(tbDurationLbl);
                    let tbDuration: TextBlock = new TextBlock();
                    tbDuration.Margin = new Thickness(2, 0, 0, 0);
                    tbDuration.IsWordwrap = false;
                    let bindDuration: Binding = new Binding();
                    bindDuration.Source = dhItem.oDrugHdrBasicInfo.Duration;
                    tbDuration.SetBinding(TextBlock.TextProperty, bindDuration);
                    objWPanel.Children.Add(tbDuration);
                }
                if (!String.IsNullOrEmpty(dhItem.oDrugHdrBasicInfo.Ongoingvalue)) {
                    let tbOngoing: TextBlock = new TextBlock();
                    tbOngoing.Margin = new Thickness(2, 0, 0, 0);
                    tbOngoing.IsWordwrap = false;
                    let bindOngoing: Binding = new Binding();
                    bindOngoing.Source = dhItem.oDrugHdrBasicInfo.Ongoingvalue;
                    tbOngoing.SetBinding(TextBlock.TextProperty, bindOngoing);
                    objWPanel.Children.Add(tbOngoing);
                }
            }
            else if ((String.Compare(dhItem.oDrugHdrBasicInfo.INFTYCODE, InfusionTypeCode.CONTINUOUS, StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(dhItem.oDrugHdrBasicInfo.INFTYCODE, InfusionTypeCode.SINGLEDOSEVOLUME, StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(dhItem.oDrugHdrBasicInfo.INFTYCODE, InfusionTypeCode.FLUID, StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(dhItem.oDrugHdrBasicInfo.INFTYCODE, InfusionTypeCode.INTERMITTENT, StringComparison.CurrentCultureIgnoreCase) == 0) || dhItem.oDrugHdrBasicInfo.IsPGD) {
                if (!String.IsNullOrEmpty(dhItem.oDrugHdrBasicInfo.Dose)) {
                    let tbDoseLbl: TextBlock = new TextBlock();
                    tbDoseLbl.Margin = new Thickness(2, 0, 0, 0);
                    tbDoseLbl.FontWeight = FontWeights.Bold;
                    tbDoseLbl.IsWordwrap = false;
                    tbDoseLbl.Foreground = new SolidColorBrush(CommonBB.ToColor("#006dec"));
                    let bindDoseLbl: Binding = new Binding();
                    if (!String.IsNullOrEmpty(dhItem.oDrugHdrBasicInfo.DoseLabel)) {
                        bindDoseLbl.Source = dhItem.oDrugHdrBasicInfo.DoseLabel;
                    }
                    else {
                        bindDoseLbl.Source = String.Empty;
                    }
                    tbDoseLbl.SetBinding(TextBlock.TextProperty, bindDoseLbl);
                    objWPanel.Children.Add(tbDoseLbl);
                    let tbDose: TextBlock = new TextBlock();
                  //tbDose.Margin = new Thickness(2, 0, 0, 0);
                    tbDose.IsWordwrap = false;
                    tbDose.newLine = true;
                    let bindDose: Binding = new Binding();
                    if (parameter && parameter == "1") {
                        let doseValue = dhItem.oDrugHdrBasicInfo.Dose.split(" ").join("&nbsp;");
                        if (dhItem.oDrugHdrBasicInfo.Dose.length > 53) {
                            bindDose.Source = "<br>" + "&nbsp;" + doseValue;
                        } else {
                            bindDose.Source = doseValue;
                        }
                    } else {
                        bindDose.Source = dhItem.oDrugHdrBasicInfo.Dose;
                    }
                    tbDose.SetBinding(TextBlock.TextProperty, bindDose);
                    objWPanel.Children.Add(tbDose);
                }
                if (!String.IsNullOrEmpty(dhItem.oDrugHdrBasicInfo.BoosterDose) && !String.Equals(dhItem.oDrugHdrBasicInfo.INFTYCODE, InfusionTypeCode.INTERMITTENT, StringComparison.CurrentCultureIgnoreCase)) {
                    let tbBoosterDoseLbl: TextBlock = new TextBlock();
                    tbBoosterDoseLbl.Margin = new Thickness(2, 0, 0, 0);
                    tbBoosterDoseLbl.FontWeight = FontWeights.Bold;
                    tbBoosterDoseLbl.IsWordwrap = false;
                    tbBoosterDoseLbl.Foreground = new SolidColorBrush(CommonBB.ToColor("#006dec"));
                    let bindBoosterDoseLbl: Binding = new Binding();
                    if (!String.IsNullOrEmpty(dhItem.oDrugHdrBasicInfo.BoosterDoseLabel)) {
                        bindBoosterDoseLbl.Source = dhItem.oDrugHdrBasicInfo.BoosterDoseLabel;
                    }
                    else {
                        bindBoosterDoseLbl.Source = String.Empty;
                    }
                    tbBoosterDoseLbl.SetBinding(TextBlock.TextProperty, bindBoosterDoseLbl);
                    objWPanel.Children.Add(tbBoosterDoseLbl);
                    let tbBoosterDose: TextBlock = new TextBlock();
                    tbBoosterDose.IsWordwrap = false;
                    let bindBoosterDose: Binding = new Binding();
                    bindBoosterDose.Source = dhItem.oDrugHdrBasicInfo.BoosterDose;
                    tbBoosterDose.SetBinding(TextBlock.TextProperty, bindBoosterDose);
                    objWPanel.Children.Add(tbBoosterDose);
                }
                if (!String.IsNullOrEmpty(dhItem.oDrugHdrBasicInfo.Volume)) {
                    let tVolumeLbl: TextBlock = new TextBlock();
                    tVolumeLbl.Margin = new Thickness(2, 0, 0, 0);
                    tVolumeLbl.FontWeight = FontWeights.Bold;
                    tVolumeLbl.IsWordwrap = false;
                    tVolumeLbl.Foreground = new SolidColorBrush(CommonBB.ToColor("#006dec"));
                    let bindVolumeLbl: Binding = new Binding();
                    if (!String.IsNullOrEmpty(dhItem.oDrugHdrBasicInfo.VolumeLabel)) {
                        bindVolumeLbl.Source = dhItem.oDrugHdrBasicInfo.VolumeLabel;
                    }
                    else {
                        bindVolumeLbl.Source = String.Empty;
                    }
                    tVolumeLbl.SetBinding(TextBlock.TextProperty, bindVolumeLbl);
                    objWPanel.Children.Add(tVolumeLbl);
                    let tbVolume: TextBlock = new TextBlock();
                    // tbVolume.Margin = new Thickness(1, 0, 0, 0);
                    tbVolume.IsWordwrap = false;
                    let bindVolume: Binding = new Binding();
                    bindVolume.Source = dhItem.oDrugHdrBasicInfo.Volume;
                    tbVolume.SetBinding(TextBlock.TextProperty, bindVolume);
                    objWPanel.Children.Add(tbVolume);
                }
                if (!String.IsNullOrEmpty(dhItem.oDrugHdrBasicInfo.Concentrationvalue)) {
                    let tConcentrationLbl: TextBlock = new TextBlock();
                    tConcentrationLbl.Margin = new Thickness(2, 0, 0, 0);
                    tConcentrationLbl.FontWeight = FontWeights.Bold;
                    tConcentrationLbl.IsWordwrap = false;
                    tConcentrationLbl.Foreground = new SolidColorBrush(CommonBB.ToColor("#006dec"));
                    let bindConcentrationLbl: Binding = new Binding();
                    if (!String.IsNullOrEmpty(dhItem.oDrugHdrBasicInfo.Concentrationlbl)) {
                        bindConcentrationLbl.Source = dhItem.oDrugHdrBasicInfo.Concentrationlbl;
                    }
                    else {
                        bindConcentrationLbl.Source = String.Empty;
                    }
                    tConcentrationLbl.SetBinding(TextBlock.TextProperty, bindConcentrationLbl);
                    objWPanel.Children.Add(tConcentrationLbl);
                    let tbConcentration: TextBlock = new TextBlock();
                    tbConcentration.Margin = new Thickness(2, 0, 0, 0);
                    tbConcentration.IsWordwrap = false;
                    let bindConcentration: Binding = new Binding();
                    bindConcentration.Source = dhItem.oDrugHdrBasicInfo.Concentrationvalue;
                    tbConcentration.SetBinding(TextBlock.TextProperty, bindConcentration);
                    objWPanel.Children.Add(tbConcentration);
                }
                if (!String.IsNullOrEmpty(dhItem.oDrugHdrBasicInfo.InfusionPeriod)) {
                    let tInfusionPeriodLbl: TextBlock = new TextBlock();
                    tInfusionPeriodLbl.Margin = new Thickness(2, 0, 0, 0);
                    tInfusionPeriodLbl.IsWordwrap = false;
                    let bindInfusionPeriodLbl: Binding = new Binding();
                    if (!String.IsNullOrEmpty(dhItem.oDrugHdrBasicInfo.InfusionPeriodLabel)) {
                        if (objWPanel.Children != null && objWPanel.ChildrenElementArray.length > 0) {
                            bindInfusionPeriodLbl.Source = "- " + dhItem.oDrugHdrBasicInfo.InfusionPeriodLabel;
                        }
                        else {
                            bindInfusionPeriodLbl.Source = dhItem.oDrugHdrBasicInfo.InfusionPeriodLabel;
                        }
                    }
                    else {
                        bindInfusionPeriodLbl.Source = String.Empty;
                    }
                    tInfusionPeriodLbl.SetBinding(TextBlock.TextProperty, bindInfusionPeriodLbl);
                    objWPanel.Children.Add(tInfusionPeriodLbl);
                    let tbInfusionPeriod: TextBlock = new TextBlock();
                    tbInfusionPeriod.Margin = new Thickness(2, 0, 0, 0);
                    tbInfusionPeriod.IsWordwrap = true;
                    let bindInfusionPeriod: Binding = new Binding();
                    bindInfusionPeriod.Source = dhItem.oDrugHdrBasicInfo.InfusionPeriod;
                    tbInfusionPeriod.SetBinding(TextBlock.TextProperty, bindInfusionPeriod);
                    objWPanel.Children.Add(tbInfusionPeriod);
                }
                if (!String.IsNullOrEmpty(dhItem.oDrugHdrBasicInfo.Rate)) {
                    let tbRateLbl: TextBlock = new TextBlock();
                    tbRateLbl.Margin = new Thickness(2, 0, 0, 0);
                    tbRateLbl.FontWeight = FontWeights.Bold;
                    tbRateLbl.IsWordwrap = false;
                    tbRateLbl.newLine = true;
                    tbRateLbl.Foreground = new SolidColorBrush(CommonBB.ToColor("#006dec"));
                    let bindRateLbl: Binding = new Binding();
                    if (!String.IsNullOrEmpty(dhItem.oDrugHdrBasicInfo.RateLabel)) {
                        if (parameter && parameter == "1") {
                            if (dhItem.oDrugHdrBasicInfo.Dose.length > 40) {
                                bindRateLbl.Source = "<br>" + "&nbsp;" + dhItem.oDrugHdrBasicInfo.RateLabel;
                            } else {
                                bindRateLbl.Source = dhItem.oDrugHdrBasicInfo.RateLabel;
                            }
                        } else {
                            bindRateLbl.Source = dhItem.oDrugHdrBasicInfo.RateLabel;
                        }
                    }
                    else {
                        bindRateLbl.Source = String.Empty;
                    }
                    tbRateLbl.SetBinding(TextBlock.TextProperty, bindRateLbl);
                    objWPanel.Children.Add(tbRateLbl);
                    let tbRate: TextBlock = new TextBlock();
                    tbRate.Margin = new Thickness(2, 0, 0, 0);
                    tbRate.newLine = true;
                    tbRate.IsWordwrap = false;
                    let bindRate: Binding = new Binding();
                    if (parameter && parameter == "1") {
                        let rateValue = dhItem.oDrugHdrBasicInfo.Rate.split(" ").join("&nbsp;");
                        if (dhItem.oDrugHdrBasicInfo.Dose.length <= 30) {
                            if (rateValue.length <= 30) {
                                bindRate.Source = rateValue;
                            } else {
                                bindRate.Source = "<br>" + "&nbsp;" + rateValue;
                            }
                        } else if (dhItem.oDrugHdrBasicInfo.Dose.length >= 50) {
                            if (rateValue.length <= 30) {
                                bindRate.Source = rateValue;
                            } else {
                                bindRate.Source = "<br>" + "&nbsp;" + rateValue;
                            }
                        } else {
                            bindRate.Source = "<br>" + "&nbsp;" + rateValue;
                        }
                    } else {
                        bindRate.Source = dhItem.oDrugHdrBasicInfo.Rate;
                    }
                    tbRate.SetBinding(TextBlock.TextProperty, bindRate);
                    objWPanel.Children.Add(tbRate);
                }
                if (!String.IsNullOrEmpty(dhItem.oDrugHdrBasicInfo.Duration) && !String.Equals(dhItem.oDrugHdrBasicInfo.INFTYCODE, InfusionTypeCode.INTERMITTENT, StringComparison.CurrentCultureIgnoreCase)) {
                    let tbDurationLbl: TextBlock = new TextBlock();
                    tbDurationLbl.IsWordwrap = false;
                    let bindDurationLbl: Binding = new Binding();
                    if (!String.IsNullOrEmpty(dhItem.oDrugHdrBasicInfo.DurationLabel)) {
                        bindDurationLbl.Source = dhItem.oDrugHdrBasicInfo.DurationLabel;
                    }
                    else {
                        bindDurationLbl.Source = String.Empty;
                    }
                    tbDurationLbl.SetBinding(TextBlock.TextProperty, bindDurationLbl);
                    objWPanel.Children.Add(tbDurationLbl);
                    let tbDuration: TextBlock = new TextBlock();
                    tbDuration.IsWordwrap = false;
                    let bindDuration: Binding = new Binding();
                    bindDuration.Source = dhItem.oDrugHdrBasicInfo.Duration;
                    tbDuration.SetBinding(TextBlock.TextProperty, bindDuration);
                    objWPanel.Children.Add(tbDuration);
                }
                if (!String.IsNullOrEmpty(dhItem.oDrugHdrBasicInfo.Ongoingvalue) && !String.Equals(dhItem.oDrugHdrBasicInfo.INFTYCODE, InfusionTypeCode.INTERMITTENT, StringComparison.CurrentCultureIgnoreCase)) {
                    let tbOngoing: TextBlock = new TextBlock();
                    tbOngoing.IsWordwrap = false;
                    let bindOngoing: Binding = new Binding();
                    bindOngoing.Source = dhItem.oDrugHdrBasicInfo.Ongoingvalue;
                    tbOngoing.SetBinding(TextBlock.TextProperty, bindOngoing);
                    objWPanel.Children.Add(tbOngoing);
                }
                if (!String.IsNullOrEmpty(dhItem.oDrugHdrBasicInfo.FrequencyText)) {
                    let tbFreq: TextBlock = new TextBlock();
                    tbFreq.IsWordwrap = false;
                    let bindFreq: Binding = new Binding();
                    if (!String.IsNullOrEmpty(dhItem.oDrugHdrBasicInfo.FrequencyText) && dhItem.oDrugHdrBasicInfo.bShowFrequency) {
                        bindFreq.Source = "- " + dhItem.oDrugHdrBasicInfo.FrequencyText;
                    }
                    else {
                        bindFreq.Source = String.Empty;
                    }
                    tbFreq.SetBinding(TextBlock.TextProperty, bindFreq);
                    objWPanel.Children.Add(tbFreq);
                    // if (!String.IsNullOrEmpty(dhItem.oDrugHdrBasicInfo.Dose)) {
                    //     let objHypFreq: TextBlock = ObjectHelper.CreateObject(new TextBlock(), { Text: " - " });
                    //      objHypFreq.IsWordwrap=false;
                    //     let objStackFreq: Grid = new Grid();
                    //     objStackFreq.IsWordwrap = false;
                    //     objStackFreq.HorizontalAlignment = HorizontalAlignment.Left;
                    //     let col1: ColumnDefinition = new ColumnDefinition();
                    //     col1.Width = new GridLength(1, GridUnitType.Auto);
                    //     let col2: ColumnDefinition = new ColumnDefinition();
                    //     objStackFreq.ColumnDefinitions.Add(col1);
                    //     objStackFreq.ColumnDefinitions.Add(col2);
                    //     Grid.SetColumn(objHypFreq, 0);
                    //     Grid.SetColumn(tbFreq, 1);
                    //     objStackFreq.Children.Add(objHypFreq);
                    //     objStackFreq.Children.Add(tbFreq);
                    //     objWPanel.Children.Add(objStackFreq);
                    // }
                    // else {
                    //     objWPanel.Children.Add(tbFreq);
                    // }
                }
                if (!String.IsNullOrEmpty(dhItem.oDrugHdrBasicInfo.AsRequiredText)) {
                    let tbAsReq: TextBlock = new TextBlock();
                    tbAsReq.IsWordwrap = false;
                    tbAsReq.Margin = new Thickness(2, 0, 0, 0);
                    let bindAsReq: Binding = new Binding();
                    if (!String.IsNullOrEmpty(dhItem.oDrugHdrBasicInfo.AsRequiredText) && dhItem.oDrugHdrBasicInfo.bShowAsrequired) {
                        bindAsReq.Source = dhItem.oDrugHdrBasicInfo.AsRequiredText;
                    }
                    else {
                        bindAsReq.Source = String.Empty;
                    }
                    tbAsReq.SetBinding(TextBlock.TextProperty, bindAsReq);
                    objWPanel.Children.Add(tbAsReq);
                    // if (!String.IsNullOrEmpty(dhItem.oDrugHdrBasicInfo.FrequencyText) || !String.IsNullOrEmpty(dhItem.oDrugHdrBasicInfo.Dose)) {
                    //     let objHypAsReq: TextBlock = ObjectHelper.CreateObject(new TextBlock(), { Text: " " });
                    //     let objStackAsReq: Grid = new Grid();
                    //     objStackAsReq.HorizontalAlignment = HorizontalAlignment.Left;
                    //     let col1: ColumnDefinition = new ColumnDefinition();
                    //     col1.Width = new GridLength(1, GridUnitType.Auto);
                    //     let col2: ColumnDefinition = new ColumnDefinition();
                    //     objStackAsReq.ColumnDefinitions.Add(col1);
                    //     objStackAsReq.ColumnDefinitions.Add(col2);
                    //     Grid.SetColumn(objHypAsReq, 0);
                    //     Grid.SetColumn(tbAsReq, 1);
                    //     objStackAsReq.Children.Add(objHypAsReq);
                    //     objStackAsReq.Children.Add(tbAsReq);
                    //     objWPanel.Children.Add(objStackAsReq);
                    // }
                    // else {
                    //     objWPanel.Children.Add(tbAsReq);
                    // }
                }
            }
            else {
                if (!String.IsNullOrEmpty(dhItem.oDrugHdrBasicInfo.DoseLabel)) {
                    let tbDoseLbl: TextBlock = new TextBlock();
                    tbDoseLbl.Margin = new Thickness(2, 0, 0, 0);
                    tbDoseLbl.IsWordwrap = false;
                    tbDoseLbl.FontWeight = FontWeights.Bold;
                    tbDoseLbl.Foreground = new SolidColorBrush(CommonBB.ToColor("#006dec"));
                    //tbDoseLbl.Style = ObjectHelper.CreateType<Style>(App.Current.Resources["DrugNonInflbl"], Style);
                    let bindDoseLbl: Binding = new Binding();
                    if (!String.IsNullOrEmpty(dhItem.oDrugHdrBasicInfo.DoseLabel)) {
                        bindDoseLbl.Source = dhItem.oDrugHdrBasicInfo.DoseLabel;
                    }
                    else {
                        bindDoseLbl.Source = String.Empty;
                    }
                    tbDoseLbl.SetBinding(TextBlock.TextProperty, bindDoseLbl);
                    objWPanel.Children.Add(tbDoseLbl);

                    let tbDose: TextBlock = new TextBlock();
                    tbDose.Margin = new Thickness(2, 0, 0, 0);
                    tbDose.IsWordwrap = false;
                    //tbDose.Style = ObjectHelper.CreateType<Style>(App.Current.Resources["DrugNonInfValue"], Style);
                    let bindDose: Binding = new Binding();
                    if (!String.IsNullOrEmpty(dhItem.oDrugHdrBasicInfo.Dose)) {
                        bindDose.Source = dhItem.oDrugHdrBasicInfo.Dose;
                    }
                    else {
                        bindDose.Source = String.Empty;
                    }
                    tbDose.SetBinding(TextBlock.TextProperty, bindDose);
                    objWPanel.Children.Add(tbDose);
                }
                if (!String.IsNullOrEmpty(dhItem.oDrugHdrBasicInfo.Strength)) {
                    let tbStrengthLbl: TextBlock = new TextBlock();
                    tbStrengthLbl.Margin = new Thickness(2, 0, 0, 0);
                    tbStrengthLbl.IsWordwrap = false;
                    tbStrengthLbl.FontWeight = FontWeights.Bold;
                    tbStrengthLbl.newLine = true;
                    tbStrengthLbl.Margin = new Thickness(2);
                    tbStrengthLbl.Foreground = new SolidColorBrush(CommonBB.ToColor("#006dec"));
                    // tbStrengthLbl.Style = ObjectHelper.CreateType<Style>(App.Current.Resources["DrugNonInflbl"], Style);
                    let bindStrengthLbl: Binding = new Binding();
                    if (!String.IsNullOrEmpty(dhItem.oDrugHdrBasicInfo.StrengthLabel) &&
                        String.IsNullOrEmpty(dhItem.oDrugHdrBasicInfo.DoseLabel)) {
                        bindStrengthLbl.Source = dhItem.oDrugHdrBasicInfo.StrengthLabel;
                    } else if (!String.IsNullOrEmpty(dhItem.oDrugHdrBasicInfo.StrengthLabel)) {
                        bindStrengthLbl.Source = "<br>" + "&nbsp;" + dhItem.oDrugHdrBasicInfo.StrengthLabel;
                    }
                    else {
                        bindStrengthLbl.Source = String.Empty;
                    }
                    tbStrengthLbl.SetBinding(TextBlock.TextProperty, bindStrengthLbl);
                    objWPanel.Children.Add(tbStrengthLbl);
                    let tbStrength: TextBlock = new TextBlock();
                    tbStrength.IsWordwrap = false;
                    tbStrength.Style = ObjectHelper.CreateType<Style>(App.Current.Resources["DrugNonInfValue"], Style);
                    let bindStrength: Binding = new Binding();
                    if (!String.IsNullOrEmpty(dhItem.oDrugHdrBasicInfo.Strength)) {
                        bindStrength.Source = dhItem.oDrugHdrBasicInfo.Strength;
                    }
                    else {
                        bindStrength.Source = String.Empty;
                    }
                    tbStrength.SetBinding(TextBlock.TextProperty, bindStrength);
                    objWPanel.Children.Add(tbStrength);
                }
                let tbFreq: TextBlock = new TextBlock();
                tbFreq.IsWordwrap = false;
                let bindFreq: Binding = new Binding();
                if (!String.IsNullOrEmpty(dhItem.oDrugHdrBasicInfo.FrequencyText) && dhItem.oDrugHdrBasicInfo.bShowFrequency) {
                    bindFreq.Source = dhItem.oDrugHdrBasicInfo.FrequencyText;
                }
                else {
                    bindFreq.Source = String.Empty;
                }
                if (String.IsNullOrEmpty(dhItem.oDrugHdrBasicInfo.Dose)) {
                    tbFreq.Margin = new Thickness(3, 0, 0, 0);
                }
                tbFreq.SetBinding(TextBlock.TextProperty, bindFreq);
                let tbAsReq: TextBlock = new TextBlock();
                tbAsReq.IsWordwrap = false;
                let bindAsReq: Binding = new Binding();
                if (!String.IsNullOrEmpty(dhItem.oDrugHdrBasicInfo.AsRequiredText) && dhItem.oDrugHdrBasicInfo.bShowAsrequired) {
                    bindAsReq.Source = dhItem.oDrugHdrBasicInfo.AsRequiredText;
                }
                else {
                    bindAsReq.Source = String.Empty;
                }
                tbAsReq.SetBinding(TextBlock.TextProperty, bindAsReq);
                if (!String.IsNullOrEmpty(dhItem.oDrugHdrBasicInfo.FrequencyText)) {
                    if (!String.IsNullOrEmpty(dhItem.oDrugHdrBasicInfo.Dose)) {
                        let objHypFreq: TextBlock = ObjectHelper.CreateObject(new TextBlock(), { Text: "&nbsp;- " });
                        objHypFreq.HorizontalAlignment = HorizontalAlignment.Left;
                        objHypFreq.IsWordwrap = false;
                        objHypFreq.newLine = true;
                        objWPanel.Children.Add(objHypFreq);
                        objWPanel.Children.Add(tbFreq);
                    }
                    else {
                        objWPanel.Children.Add(tbFreq);
                    }
                }
                if (!String.IsNullOrEmpty(dhItem.oDrugHdrBasicInfo.AsRequiredText)) {
                    if (!String.IsNullOrEmpty(dhItem.oDrugHdrBasicInfo.FrequencyText) || !String.IsNullOrEmpty(dhItem.oDrugHdrBasicInfo.Dose)) {
                        let objHypAsReq: TextBlock = ObjectHelper.CreateObject(new TextBlock(), { Text: " " });
                        objHypAsReq.HorizontalAlignment = HorizontalAlignment.Left;
                        objHypAsReq.IsWordwrap = false;
                        objWPanel.Children.Add(tbAsReq);
                        objWPanel.Children.Add(objHypAsReq);
                    }
                    else {
                        objWPanel.Children.Add(tbAsReq);
                    }
                }
            }
        }
        return objWPanel;
    }
    public GetRouteWrapPanel(objDrugItem: CDrugHeader): StackPanel {
        let objParentPanel: StackPanel = new StackPanel();
        objParentPanel.Orientation = Orientation.Horizontal;
        if (objDrugItem != null && objDrugItem.oDrugHdrBasicInfo != null) {
            let bInfRecordAdmin: boolean = ((objDrugItem.oDrugHdrAddnlInfo != null && objDrugItem.oDrugHdrAddnlInfo.RecordAdminViewed != RecordAdminType.RecordAdmin) || (objDrugItem.oDrugHdrAddnlInfo == null)) ? true : false;
            if (String.Compare(objDrugItem.oDrugHdrBasicInfo.ItemSubType, DrugItemSubTypeCode.MEDICAL_GAS, StringComparison.CurrentCultureIgnoreCase) == 0 && bInfRecordAdmin) {
                if (!String.IsNullOrEmpty(objDrugItem.oDrugHdrBasicInfo.RouteLabel)) {
                    let tbRouteLbl: TextBlock = new TextBlock();
                    tbRouteLbl.Margin = new Thickness(2, 0, 0, 0);
                    tbRouteLbl.FontWeight = FontWeights.Bold;
                    tbRouteLbl.IsWordwrap = false;
                    let bindtbRoutelblForeGrnd: Binding = new Binding();
                    bindtbRoutelblForeGrnd.Source = new SolidColorBrush(CommonBB.ToColor("#006dec"));
                    tbRouteLbl.SetBinding(TextBlock.ForegroundProperty, bindtbRoutelblForeGrnd);
                    let bindRouteLbl: Binding = new Binding();
                    bindRouteLbl.Source = objDrugItem.oDrugHdrBasicInfo.RouteLabel;
                    tbRouteLbl.SetBinding(TextBlock.TextProperty, bindRouteLbl);
                    objParentPanel.Children.Add(tbRouteLbl);
                }
                if (!String.IsNullOrEmpty(objDrugItem.oDrugHdrBasicInfo.Route)) {
                    let routeArray: string[] = objDrugItem.oDrugHdrBasicInfo.Route.Split(' ');
                    for (let indx: number = 0; indx < routeArray.length; indx++) {
                        let tbRoute: TextBlock = new TextBlock();
                        tbRoute.IsWordwrap = false;
                        let bindRoute: Binding = new Binding();
                        bindRoute.Source = routeArray[indx];
                        tbRoute.SetBinding(TextBlock.TextProperty, bindRoute);
                        objParentPanel.Children.Add(tbRoute);
                    }
                }
                if (!String.IsNullOrEmpty(objDrugItem.oDrugHdrBasicInfo.DeliveryDevice)) {
                    let tbDeliveryDevice: TextBlock = new TextBlock();
                    tbDeliveryDevice.IsWordwrap = false;
                    let bindDeliveryDevice: Binding = new Binding();
                    bindDeliveryDevice.Source = objDrugItem.oDrugHdrBasicInfo.DeliveryDevice;
                    tbDeliveryDevice.SetBinding(TextBlock.TextProperty, bindDeliveryDevice);
                    objParentPanel.Children.Add(tbDeliveryDevice);
                }
            }
            else if ((String.Compare(objDrugItem.oDrugHdrBasicInfo.INFTYCODE, InfusionTypeCode.PCA, StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(objDrugItem.oDrugHdrBasicInfo.INFTYCODE, InfusionTypeCode.CONTINUOUS, StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(objDrugItem.oDrugHdrBasicInfo.INFTYCODE, InfusionTypeCode.INTERMITTENT, StringComparison.CurrentCultureIgnoreCase) == 0) && bInfRecordAdmin) {
                let OnChildPanel: WrapPanel = new WrapPanel();
                OnChildPanel.Orientation = Orientation.Horizontal;
                objParentPanel.Children.Add(OnChildPanel);
                if (!String.IsNullOrEmpty(objDrugItem.oDrugHdrBasicInfo.RouteLabel)) {
                    let tbRouteLbl: TextBlock = new TextBlock();
                    tbRouteLbl.Margin = new Thickness(2, 0, 0, 0);
                    tbRouteLbl.FontWeight = FontWeights.Bold;
                    let bindtbRoutelblForeGrnd: Binding = new Binding();
                    tbRouteLbl.IsWordwrap = false;
                    bindtbRoutelblForeGrnd.Source = new SolidColorBrush(CommonBB.ToColor("#006dec"));
                    tbRouteLbl.SetBinding(TextBlock.ForegroundProperty, bindtbRoutelblForeGrnd);
                    let bindRouteLbl: Binding = new Binding();
                    bindRouteLbl.Source = objDrugItem.oDrugHdrBasicInfo.RouteLabel;
                    tbRouteLbl.SetBinding(TextBlock.TextProperty, bindRouteLbl);
                    OnChildPanel.Children.Add(tbRouteLbl);
                }
                if (!String.IsNullOrEmpty(objDrugItem.oDrugHdrBasicInfo.Route)) {
                    let routeArray: string[] = objDrugItem.oDrugHdrBasicInfo.Route.Split(' ');
                    for (let indx: number = 0; indx < routeArray.length; indx++) {
                        let tbRoute: TextBlock = new TextBlock();
                        tbRoute.IsWordwrap = false;
                        let bindRoute: Binding = new Binding();
                        bindRoute.Source = routeArray[indx];
                        tbRoute.SetBinding(TextBlock.TextProperty, bindRoute);
                        OnChildPanel.Children.Add(tbRoute);
                    }
                }
                if (!String.IsNullOrEmpty(objDrugItem.oDrugHdrBasicInfo.SiteLabel)) {
                    let tbSiteLbl: TextBlock = new TextBlock();
                    tbSiteLbl.Margin = new Thickness(2, 0, 0, 0);
                    tbSiteLbl.FontWeight = FontWeights.Bold;
                    let bindDoseForeGrnd: Binding = new Binding();
                    bindDoseForeGrnd.Source = new SolidColorBrush(CommonBB.ToColor("#006dec"));
                    tbSiteLbl.SetBinding(TextBlock.ForegroundProperty, bindDoseForeGrnd);
                    tbSiteLbl.IsWordwrap = false;
                    let bindSiteLbl: Binding = new Binding();
                    if (!String.IsNullOrEmpty(objDrugItem.oDrugHdrBasicInfo.SiteLabel) && objDrugItem.oDrugHdrBasicInfo.bShowSite) {
                        bindSiteLbl.Source = objDrugItem.oDrugHdrBasicInfo.SiteLabel;
                        tbSiteLbl.SetBinding(TextBlock.TextProperty, bindSiteLbl);
                        OnChildPanel.Children.Add(tbSiteLbl);
                    }
                    else {
                        bindSiteLbl.Source = String.Empty;
                    }
                    
                }
                if (!String.IsNullOrEmpty(objDrugItem.oDrugHdrBasicInfo.Site)) {
                    let routeArray: string[] = objDrugItem.oDrugHdrBasicInfo.Site.Split(' ');
                    for (let indx: number = 0; indx < routeArray.length; indx++) {
                        let tbSite: TextBlock = new TextBlock();
                        tbSite.IsWordwrap = false;
                        let bindSite: Binding = new Binding();
                        if (!String.IsNullOrEmpty(objDrugItem.oDrugHdrBasicInfo.Site) && objDrugItem.oDrugHdrBasicInfo.bShowSite) {
                            bindSite.Source = routeArray[indx];
                        }
                        else {
                            bindSite.Source = String.Empty;
                        }
                        tbSite.SetBinding(TextBlock.TextProperty, bindSite);
                        OnChildPanel.Children.Add(tbSite);
                    }
                }
                if (!String.IsNullOrEmpty(objDrugItem.oDrugHdrBasicInfo.Lumen)) {
                    let tbLumen: TextBlock = new TextBlock();
                    tbLumen.IsWordwrap = true
                    tbLumen.Margin = new Thickness(2, 0, 0, 0);
                    let bindLumen: Binding = new Binding();
                    if (!String.IsNullOrEmpty(objDrugItem.oDrugHdrBasicInfo.Lumen)) {
                        bindLumen.Source = objDrugItem.oDrugHdrBasicInfo.Lumen;
                    }
                    else {
                        bindLumen.Source = String.Empty;
                    }
                    tbLumen.SetBinding(TextBlock.TextProperty, bindLumen);
                    OnChildPanel.Children.Add(tbLumen);
                }
                if (!String.IsNullOrEmpty(objDrugItem.oDrugHdrBasicInfo.DeliveryDevice)) {
                    let tbDeliveryDevice: TextBlock = new TextBlock();
                    tbDeliveryDevice.Margin = new Thickness(2, 0, 0, 0);
                    if (!String.IsNullOrEmpty(objDrugItem.oDrugHdrBasicInfo.Lumen))
                    {
                        if(objDrugItem.oDrugHdrBasicInfo.Lumen.length >= 102) {
                            tbDeliveryDevice.IsWordwrap = true;
                        } else {
                            tbDeliveryDevice.IsWordwrap = false;
                        }
                    }
                    else {
                        tbDeliveryDevice.IsWordwrap = false;
                    }
                    let bindDeliveryDevice: Binding = new Binding();
                    bindDeliveryDevice.Source = objDrugItem.oDrugHdrBasicInfo.DeliveryDevice;
                    tbDeliveryDevice.SetBinding(TextBlock.TextProperty, bindDeliveryDevice);
                    OnChildPanel.Children.Add(tbDeliveryDevice);
                }
            }
            else {
                if (!String.IsNullOrEmpty(objDrugItem.oDrugHdrBasicInfo.RouteLabel)) {
                    let tbRouteLbl: iLabel = new iLabel();
                    tbRouteLbl.Margin = new Thickness(5, 0, 3, 0);
                    tbRouteLbl.FontWeight = FontWeights.Bold;
                    tbRouteLbl.IsWordwrap = false;
                    tbRouteLbl.Foreground = new SolidColorBrush(CommonBB.ToColor("#006dec"));
                    //tbRouteLbl.Style = ObjectHelper.CreateType<Style>(App.Current.Resources["DrugNonInflbl"], Style);
                    let bindRouteLbl: Binding = new Binding();
                    bindRouteLbl.Source = objDrugItem.oDrugHdrBasicInfo.RouteLabel;
                    tbRouteLbl.SetBinding(TextBlock.TextProperty, bindRouteLbl);
                    objParentPanel.Children.Add(tbRouteLbl);
                }
                if (!String.IsNullOrEmpty(objDrugItem.oDrugHdrBasicInfo.Route)) {
                    let routeArray: string[] = objDrugItem.oDrugHdrBasicInfo.Route.Split(' ');
                    for (let indx: number = 0; indx < routeArray.length; indx++) {
                        let tbRoute: iLabel = new iLabel();
                        tbRoute.IsWordwrap = false;
                        //tbRoute.Style = ObjectHelper.CreateType<Style>(App.Current.Resources["DrugNonInfValue"], Style);
                        let bindRoute: Binding = new Binding();
                        bindRoute.Source = routeArray[indx];
                        tbRoute.SetBinding(TextBlock.TextProperty, bindRoute);
                        objParentPanel.Children.Add(tbRoute);
                    }
                }
                if (!String.IsNullOrEmpty(objDrugItem.oDrugHdrBasicInfo.SiteLabel) && objDrugItem.oDrugHdrBasicInfo.bShowSite) {
                    let tbSiteLbl: TextBlock = new TextBlock();
                    tbSiteLbl.Margin = new Thickness(2, 0, 2, 0);
                    tbSiteLbl.FontWeight = FontWeights.Bold;
                    tbSiteLbl.IsWordwrap = false;
                    let bindDoseForeGrnd: Binding = new Binding();
                    bindDoseForeGrnd.Source = new SolidColorBrush(CommonBB.ToColor("#006dec"));
                    tbSiteLbl.SetBinding(TextBlock.ForegroundProperty, bindDoseForeGrnd);
                    let bindSiteLbl: Binding = new Binding();
                    tbSiteLbl.IsWordwrap = false;
                    if (!String.IsNullOrEmpty(objDrugItem.oDrugHdrBasicInfo.SiteLabel) && objDrugItem.oDrugHdrBasicInfo.bShowSite) {
                        bindSiteLbl.Source = objDrugItem.oDrugHdrBasicInfo.SiteLabel;
                    }
                    else {
                        bindSiteLbl.Source = String.Empty;
                    }
                    tbSiteLbl.SetBinding(TextBlock.TextProperty, bindSiteLbl);
                    objParentPanel.Children.Add(tbSiteLbl);
                }
                if (!String.IsNullOrEmpty(objDrugItem.oDrugHdrBasicInfo.Site) && objDrugItem.oDrugHdrBasicInfo.bShowSite) {
                    let routeArray: string[] = objDrugItem.oDrugHdrBasicInfo.Site.Split(' ');
                    for (let indx: number = 0; indx < routeArray.length; indx++) {
                        let tbSite: TextBlock = new TextBlock();
                        tbSite.Margin = new Thickness(2, 0, 0, 0);
                        tbSite.IsWordwrap = false;
                        let bindSite: Binding = new Binding();
                        if (!String.IsNullOrEmpty(objDrugItem.oDrugHdrBasicInfo.Site) && objDrugItem.oDrugHdrBasicInfo.bShowSite) {
                            bindSite.Source = routeArray[indx] + " ";
                        }
                        else {
                            bindSite.Source = String.Empty;
                        }
                        tbSite.SetBinding(TextBlock.TextProperty, bindSite);
                        objParentPanel.Children.Add(tbSite);
                    }
                }
            }
        }
        return objParentPanel;
    }
    public ScanRecRouteWrapPanel(objDrugItem: CDrugHeader, objParentPanel: StackPanel): void {
        objParentPanel.Orientation = Orientation.Horizontal;
        if (objDrugItem != null && objDrugItem.oDrugHdrBasicInfo != null) {
            let bInfRecordAdmin: boolean = ((objDrugItem.oDrugHdrAddnlInfo != null && objDrugItem.oDrugHdrAddnlInfo.RecordAdminViewed != RecordAdminType.RecordAdmin) || (objDrugItem.oDrugHdrAddnlInfo == null)) ? true : false;
            if (String.Compare(objDrugItem.oDrugHdrBasicInfo.ItemSubType, DrugItemSubTypeCode.MEDICAL_GAS, StringComparison.CurrentCultureIgnoreCase) == 0 && bInfRecordAdmin) {
                if (!String.IsNullOrEmpty(objDrugItem.oDrugHdrBasicInfo.RouteLabel)) {
                    let tbRouteLbl: TextBlock = new TextBlock();
                    tbRouteLbl.Margin = new Thickness(2, 0, 0, 0);
                    tbRouteLbl.FontWeight = FontWeights.Bold;
                    let bindtbRoutelblForeGrnd: Binding = new Binding();
                    bindtbRoutelblForeGrnd.Source = new SolidColorBrush(CommonBB.ToColor("#006dec"));
                    tbRouteLbl.SetBinding(TextBlock.ForegroundProperty, bindtbRoutelblForeGrnd);
                    let bindRouteLbl: Binding = new Binding();
                    bindRouteLbl.Source = objDrugItem.oDrugHdrBasicInfo.RouteLabel;
                    tbRouteLbl.SetBinding(TextBlock.TextProperty, bindRouteLbl);
                    objParentPanel.Children.Add(tbRouteLbl);
                }
                if (!String.IsNullOrEmpty(objDrugItem.oDrugHdrBasicInfo.Route)) {
                    let routeArray: string[] = objDrugItem.oDrugHdrBasicInfo.Route.Split(' ');
                    for (let indx: number = 0; indx < routeArray.length; indx++) {
                        let tbRoute: TextBlock = new TextBlock();
                        tbRoute.Margin = new Thickness(2, 0, 0, 0);
                        tbRoute.IsWordwrap = false;
                        let bindRoute: Binding = new Binding();
                        bindRoute.Source = routeArray[indx];
                        tbRoute.SetBinding(TextBlock.TextProperty, bindRoute);
                        objParentPanel.Children.Add(tbRoute);
                    }
                }
                if (!String.IsNullOrEmpty(objDrugItem.oDrugHdrBasicInfo.DeliveryDevice)) {
                    let tbDeliveryDevice: TextBlock = new TextBlock();
                    tbDeliveryDevice.Margin = new Thickness(2, 0, 0, 0);
                    tbDeliveryDevice.IsWordwrap = false;
                    let bindDeliveryDevice: Binding = new Binding();
                    bindDeliveryDevice.Source = objDrugItem.oDrugHdrBasicInfo.DeliveryDevice;
                    tbDeliveryDevice.SetBinding(TextBlock.TextProperty, bindDeliveryDevice);
                    objParentPanel.Children.Add(tbDeliveryDevice);
                }
            }
            else if ((String.Compare(objDrugItem.oDrugHdrBasicInfo.INFTYCODE, InfusionTypeCode.PCA, StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(objDrugItem.oDrugHdrBasicInfo.INFTYCODE, InfusionTypeCode.CONTINUOUS, StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(objDrugItem.oDrugHdrBasicInfo.INFTYCODE, InfusionTypeCode.INTERMITTENT, StringComparison.CurrentCultureIgnoreCase) == 0 || String.Equals(objDrugItem.oDrugHdrBasicInfo.INFTYCODE, InfusionTypeCode.SINGLEDOSEVOLUME, StringComparison.CurrentCultureIgnoreCase) || String.Equals(objDrugItem.oDrugHdrBasicInfo.INFTYCODE, InfusionTypeCode.FLUID, StringComparison.CurrentCultureIgnoreCase)) && bInfRecordAdmin) {
                if (!String.IsNullOrEmpty(objDrugItem.oDrugHdrBasicInfo.RouteLabel)) {
                    let tbRouteLbl: TextBlock = new TextBlock();
                    tbRouteLbl.Margin = new Thickness(2, 0, 0, 0);
                    tbRouteLbl.FontWeight = FontWeights.Bold;
                    let bindtbRoutelblForeGrnd: Binding = new Binding();
                    bindtbRoutelblForeGrnd.Source = new SolidColorBrush(CommonBB.ToColor("#006dec"));
                    tbRouteLbl.SetBinding(TextBlock.ForegroundProperty, bindtbRoutelblForeGrnd);
                    let bindRouteLbl: Binding = new Binding();
                    bindRouteLbl.Source = objDrugItem.oDrugHdrBasicInfo.RouteLabel;
                    tbRouteLbl.SetBinding(TextBlock.TextProperty, bindRouteLbl);
                    objParentPanel.Children.Add(tbRouteLbl);
                }
                if (!String.IsNullOrEmpty(objDrugItem.oDrugHdrBasicInfo.Route)) {
                    let routeArray: string[] = objDrugItem.oDrugHdrBasicInfo.Route.Split(' ');
                    for (let indx: number = 0; indx < routeArray.length; indx++) {
                        let tbRoute: TextBlock = new TextBlock();
                        tbRoute.Margin = new Thickness(2, 0, 0, 0);
                        tbRoute.IsWordwrap = false;
                        let bindRoute: Binding = new Binding();
                        bindRoute.Source = routeArray[indx];
                        tbRoute.SetBinding(TextBlock.TextProperty, bindRoute);
                        objParentPanel.Children.Add(tbRoute);
                    }
                }
                if (!String.IsNullOrEmpty(objDrugItem.oDrugHdrBasicInfo.SiteLabel)) {
                    let tbSiteLbl: TextBlock = new TextBlock();
                    tbSiteLbl.Margin = new Thickness(2, 0, 0, 0);
                    tbSiteLbl.FontWeight = FontWeights.Bold;
                    tbSiteLbl.IsWordwrap = false;
                    let bindDoseForeGrnd: Binding = new Binding();
                    bindDoseForeGrnd.Source = new SolidColorBrush(CommonBB.ToColor("#006dec"));
                    tbSiteLbl.SetBinding(TextBlock.ForegroundProperty, bindDoseForeGrnd);
                    let bindSiteLbl: Binding = new Binding();
                    if (!String.IsNullOrEmpty(objDrugItem.oDrugHdrBasicInfo.SiteLabel) && objDrugItem.oDrugHdrBasicInfo.bShowSite) {
                        bindSiteLbl.Source = objDrugItem.oDrugHdrBasicInfo.SiteLabel;
                    }
                    else {
                        bindSiteLbl.Source = String.Empty;
                    }
                    tbSiteLbl.SetBinding(TextBlock.TextProperty, bindSiteLbl);
                    objParentPanel.Children.Add(tbSiteLbl);
                }
                if (!String.IsNullOrEmpty(objDrugItem.oDrugHdrBasicInfo.Site)) {
                    let routeArray: string[] = objDrugItem.oDrugHdrBasicInfo.Site.Split(' ');
                    for (let indx: number = 0; indx < routeArray.length; indx++) {
                        let tbSite: TextBlock = new TextBlock();
                        tbSite.Margin = new Thickness(2, 0, 0, 0);
                        tbSite.IsWordwrap = false;
                        let bindSite: Binding = new Binding();
                        if (!String.IsNullOrEmpty(objDrugItem.oDrugHdrBasicInfo.Site) && objDrugItem.oDrugHdrBasicInfo.bShowSite) {
                            bindSite.Source = routeArray[indx];
                        }
                        else {
                            bindSite.Source = String.Empty;
                        }
                        tbSite.SetBinding(TextBlock.TextProperty, bindSite);
                        objParentPanel.Children.Add(tbSite);
                    }
                }
                if (!String.IsNullOrEmpty(objDrugItem.oDrugHdrBasicInfo.Lumen)) {
                    let tbLumen: TextBlock = new TextBlock();
                    tbLumen.Margin = new Thickness(2, 0, 0, 0);
                    tbLumen.IsWordwrap = true;
                    let bindLumen: Binding = new Binding();
                    if (!String.IsNullOrEmpty(objDrugItem.oDrugHdrBasicInfo.Lumen)) {
                        bindLumen.Source = objDrugItem.oDrugHdrBasicInfo.Lumen;
                    }
                    else {
                        bindLumen.Source = String.Empty;
                    }
                    tbLumen.SetBinding(TextBlock.TextProperty, bindLumen);
                    objParentPanel.Children.Add(tbLumen);
                }
                if (!String.IsNullOrEmpty(objDrugItem.oDrugHdrBasicInfo.DeliveryDevice)) {
                    let tbDeliveryDevice: TextBlock = new TextBlock();
                    tbDeliveryDevice.Margin = new Thickness(2, 0, 0, 0);
                    tbDeliveryDevice.IsWordwrap = false;
                    let bindDeliveryDevice: Binding = new Binding();
                    bindDeliveryDevice.Source = objDrugItem.oDrugHdrBasicInfo.DeliveryDevice;
                    tbDeliveryDevice.SetBinding(TextBlock.TextProperty, bindDeliveryDevice);
                    objParentPanel.Children.Add(tbDeliveryDevice);
                }
            }
            else {
                if (!String.IsNullOrEmpty(objDrugItem.oDrugHdrBasicInfo.RouteLabel)) {
                    let tbRouteLbl: iLabel = new iLabel();
                    tbRouteLbl.Margin = new Thickness(2, 0, 0, 0);
                    tbRouteLbl.Foreground = new SolidColorBrush(CommonBB.ToColor("#006dec"));
                    //tbRouteLbl.Style = ObjectHelper.CreateType<Style>(App.Current.Resources["DrugNonInflbl"], Style);
                    let bindRouteLbl: Binding = new Binding();
                    bindRouteLbl.Source = objDrugItem.oDrugHdrBasicInfo.RouteLabel;
                    tbRouteLbl.SetBinding(TextBlock.TextProperty, bindRouteLbl);
                    objParentPanel.Children.Add(tbRouteLbl);
                }
                if (!String.IsNullOrEmpty(objDrugItem.oDrugHdrBasicInfo.Route)) {
                    let routeArray: string[] = objDrugItem.oDrugHdrBasicInfo.Route.Split(' ');
                    for (let indx: number = 0; indx < routeArray.length; indx++) {
                        let tbRoute: iLabel = new iLabel();
                        tbRoute.Margin = new Thickness(2, 0, 0, 0);
                        tbRoute.IsWordwrap = false;
                        //tbRoute.Style = ObjectHelper.CreateType<Style>(App.Current.Resources["DrugNonInfValue"], Style);
                        let bindRoute: Binding = new Binding();
                        bindRoute.Source = routeArray[indx];
                        tbRoute.SetBinding(TextBlock.TextProperty, bindRoute);
                        objParentPanel.Children.Add(tbRoute);
                    }
                }
                if (!String.IsNullOrEmpty(objDrugItem.oDrugHdrBasicInfo.SiteLabel)) {
                    let tbSiteLbl: TextBlock = new TextBlock();
                    tbSiteLbl.Margin = new Thickness(2, 0, 0, 0);
                    tbSiteLbl.FontWeight = FontWeights.Bold;
                    let bindDoseForeGrnd: Binding = new Binding();
                    bindDoseForeGrnd.Source = new SolidColorBrush(CommonBB.ToColor("#006dec"));
                    tbSiteLbl.SetBinding(TextBlock.ForegroundProperty, bindDoseForeGrnd);
                    let bindSiteLbl: Binding = new Binding();
                    if (!String.IsNullOrEmpty(objDrugItem.oDrugHdrBasicInfo.SiteLabel) && objDrugItem.oDrugHdrBasicInfo.bShowSite) {
                        bindSiteLbl.Source = objDrugItem.oDrugHdrBasicInfo.SiteLabel;
                    }
                    else {
                        bindSiteLbl.Source = String.Empty;
                    }
                    tbSiteLbl.SetBinding(TextBlock.TextProperty, bindSiteLbl);
                    objParentPanel.Children.Add(tbSiteLbl);
                }
                if (!String.IsNullOrEmpty(objDrugItem.oDrugHdrBasicInfo.Site)) {
                    let routeArray: string[] = objDrugItem.oDrugHdrBasicInfo.Site.Split(' ');
                    for (let indx: number = 0; indx < routeArray.length; indx++) {
                        let tbSite: TextBlock = new TextBlock();
                        tbSite.Margin = new Thickness(2, 0, 0, 0);
                        tbSite.IsWordwrap = false;
                        let bindSite: Binding = new Binding();
                        if (!String.IsNullOrEmpty(objDrugItem.oDrugHdrBasicInfo.Site) && objDrugItem.oDrugHdrBasicInfo.bShowSite) {
                            bindSite.Source = routeArray[indx];
                        }
                        else {
                            bindSite.Source = String.Empty;
                        }
                        tbSite.SetBinding(TextBlock.TextProperty, bindSite);
                        objParentPanel.Children.Add(tbSite);
                    }
                }
            }
        }
    }
    public GetTargetStrangePanel(objDrugItem: CDrugHeader): StackPanel {
        let objParentPanel: StackPanel = new StackPanel();
        objParentPanel.Orientation = Orientation.Horizontal;
        if (objDrugItem != null && objDrugItem.oDrugHdrBasicInfo != null) {
            if (String.Compare(objDrugItem.oDrugHdrBasicInfo.ItemSubType, DrugItemSubTypeCode.MEDICAL_GAS, StringComparison.CurrentCultureIgnoreCase) == 0) {
                if (!String.IsNullOrEmpty(objDrugItem.oDrugHdrBasicInfo.TargetSaturationRange)) {
                    let tbTargetSatLbl: TextBlock = new TextBlock();
                    tbTargetSatLbl.Margin = new Thickness(2, 0, 0, 0);
                    tbTargetSatLbl.FontWeight = FontWeights.Bold;
                    tbTargetSatLbl.IsWordwrap = false;
                    let bindtbTargetSatlblForeGrnd: Binding = new Binding();
                    bindtbTargetSatlblForeGrnd.Source = new SolidColorBrush(CommonBB.ToColor("#006dec"));
                    tbTargetSatLbl.SetBinding(TextBlock.ForegroundProperty, bindtbTargetSatlblForeGrnd);
                    let bindTargetsatLbl: Binding = new Binding();
                    bindTargetsatLbl.Source = objDrugItem.oDrugHdrBasicInfo.TargetSaturationRangelbl;
                    tbTargetSatLbl.SetBinding(TextBlock.TextProperty, bindTargetsatLbl);
                    objParentPanel.Children.Add(tbTargetSatLbl);
                }
                if (!String.IsNullOrEmpty(objDrugItem.oDrugHdrBasicInfo.TargetSaturationRange)) {
                    let routeArray: string[] = objDrugItem.oDrugHdrBasicInfo.TargetSaturationRange.Split(' ');
                    for (let indx: number = 0; indx < routeArray.length; indx++) {
                        let tbTargetSat: TextBlock = new TextBlock();
                        tbTargetSat.IsWordwrap = false;
                        let bindTargetsat: Binding = new Binding();
                        bindTargetsat.Source = routeArray[indx];
                        tbTargetSat.SetBinding(TextBlock.TextProperty, bindTargetsat);
                        objParentPanel.Children.Add(tbTargetSat);
                    }
                }
                let OnChildPanel: WrapPanel = new WrapPanel();
                OnChildPanel.Orientation = Orientation.Horizontal;
                objParentPanel.Children.Add(OnChildPanel);
            }
        }
        return objParentPanel;
    }
    public GetHumidificationWrapPannel(objDrugItem: CDrugHeader): StackPanel {
        let objParentPanel: StackPanel = new StackPanel();
        objParentPanel.Orientation = Orientation.Horizontal;
        if (objDrugItem != null && objDrugItem.oDrugHdrBasicInfo != null) {
            if (String.Compare(objDrugItem.oDrugHdrBasicInfo.ItemSubType, DrugItemSubTypeCode.MEDICAL_GAS, StringComparison.CurrentCultureIgnoreCase) == 0) {
                if (!String.IsNullOrEmpty(objDrugItem.oDrugHdrBasicInfo.Humidification)) {
                    let tbHumidificationLbl: TextBlock = new TextBlock();
                    tbHumidificationLbl.Margin = new Thickness(2, 0, 0, 0);
                    tbHumidificationLbl.FontWeight = FontWeights.Bold;
                    tbHumidificationLbl.IsWordwrap = false;
                    let bindtbHumidificationlblForeGrnd: Binding = new Binding();
                    bindtbHumidificationlblForeGrnd.Source = new SolidColorBrush(CommonBB.ToColor("#006dec"));
                    tbHumidificationLbl.SetBinding(TextBlock.ForegroundProperty, bindtbHumidificationlblForeGrnd);
                    let bindHumidificationLbl: Binding = new Binding();
                    bindHumidificationLbl.Source = objDrugItem.oDrugHdrBasicInfo.Humidificationlbl;
                    tbHumidificationLbl.SetBinding(TextBlock.TextProperty, bindHumidificationLbl);
                    objParentPanel.Children.Add(tbHumidificationLbl);
                }
                if (!String.IsNullOrEmpty(objDrugItem.oDrugHdrBasicInfo.Humidification)) {
                    let routeArray: string[] = objDrugItem.oDrugHdrBasicInfo.Humidification.Split(' ');
                    let tbHumidification: TextBlock = new TextBlock();
                    tbHumidification.Margin = new Thickness(2, 0, 0, 0);
                    tbHumidification.IsWordwrap = false;
                    let bindHumidification: Binding = new Binding();
                    bindHumidification.Source = objDrugItem.oDrugHdrBasicInfo.Humidification;
                    tbHumidification.SetBinding(TextBlock.TextProperty, bindHumidification);
                    objParentPanel.Children.Add(tbHumidification);
                }
                let OnChildPanel: WrapPanel = new WrapPanel();
                OnChildPanel.Orientation = Orientation.Horizontal;
                objParentPanel.Children.Add(OnChildPanel);
            }
        }
        return objParentPanel;
    }
}
export class FalseToVisibilityConverter {
    public Convert(value: Object, targetType: Type, parameter: Object, culture: CultureInfo): Object {
        if (parameter == null)
            return <boolean>value ? Visibility.Collapsed : Visibility.Visible;
        else {
            if (String.Compare(parameter.ToString(), "1", StringComparison.CurrentCultureIgnoreCase) == 0)
                return <boolean>value ? Visibility.Visible : Visibility.Collapsed;
            else return <boolean>value ? Visibility.Collapsed : Visibility.Visible;
        }
    }
    public ConvertBack(value: Object, targetType: Type, parameter: Object, culture: CultureInfo): Object {
        return null;
    }
}
