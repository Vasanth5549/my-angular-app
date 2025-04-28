import { Component, OnInit } from '@angular/core';
import {
  StringBuilder,
  ProfileFactoryType,
  ContextManager,
  Convert,
  AppActivity,
  ProcessRTE,
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
  ObservableCollection,
  List,
  CListItem,
  RTEEventargs,
  HtmlPage,
  Visibility,
  CultureInfo,
  Uri,
  UriKind,
  BitmapImage,
  ContentControl,
} from 'epma-platform/models';
import {
  AppDialog,
  Binding,
  Border,
  Color,
  Colors,
  Cursors,
  FontFamily,
  FontStyles,
  FontWeights,
  GridLength,
  HorizontalAlignment,
  iLabel,
  iLabelInLineElement,
  Image,
  RichTextBox,
  Run,
  SolidColorBrush,
  StackPanel,
  Stretch,
  TextAlignment,
  TextBlock,
  TextWrapping,
  Thickness,
  ToolTipService,
  VerticalAlignment,
  WrapPanel,
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
import { MedicationCommonBB } from '../utilities/medicationcommonbb';
import * as ManagePrescSer from '../../shared/epma-platform/soap-client/ManagePrescriptionWS';
import { Orientation } from 'src/app/shared/epma-platform/controls-model/Orientation';
import {
  CConstants,
  DoseTypeCode,
  DrugItemSubTypeCode,
  InfusionTypeCode,
  MedImage,
  MedImages,
  PrescriptionTypes,
} from '../utilities/constants';
import {
  DispenseStatusListConceptCodeData,
  InfHumdificationConceptCodeData,
  InfusionTypeConceptCodeData,
  MedDoseTypeConceptCodeData,
  MedicationCommonConceptCodeData,
  MedicationCommonProfileData,
  RequestUrgency,
  WarningConceptCode,
} from '../utilities/profiledata';
import {
  CMedicationLineDisplayData,
  LineDisplayConfigurations,
} from 'src/app/lorappslprofiletypes/medication';
import {
  InfusionLineItemVM,
  PrescriptionLineItemVM,
} from '../utilities/lineitemconstructor';
import { CommonBB } from 'src/app/lorappcommonbb/utilities/common';
import {
  AppSessionInfo,
  ContextInfo,
  PatientContext,
} from 'src/app/lorappcommonbb/utilities/globalvariable';
import { Environment, Type } from '../../product/shared/models/Common';
import { CommPrescriptionItemViewVM } from '../viewmodel/prescriptionitemviewvm';
import {
  AdminList,
  DrugDetailsOrderData,
  MedsScanProductDetailVM,
  MultipleDoseDetail,
  PrescriptionItemDetailsVM,
  SupplyDetails,
  SupplyDetailsMCIChild,
  TechnicalDetails,
} from '../viewmodel/prescriptionitemdetailsvm';
import { AMSHelper } from 'src/app/lorappcommonbb/amshelper';
import * as IPPManagePrescSer from '../../shared/epma-platform/soap-client/IPPMAManagePrescriptionWS';

import { MedicationPrescriptionHelper } from '../utilities/medicationprescriptionhelper';
import { Resource } from '../resource';
import { GridUnitType } from 'src/app/shared/epma-platform/controls/GridExt';
import {
  ArrayOfString,
  DrugDetail,
  SlotDetail,
} from 'src/app/shared/epma-platform/soap-client/MedicationAdministrationWS';
import { eActivityTypes, MCommonBB } from '../utilities/common';
import { iImage } from 'src/app/shared/epma-platform/controls/epma-iimage/epma-iimage.component';
import { ColumnDefinition, Grid, RowDefinition } from "src/app/shared/epma-platform/controls/epma-grid/epma-grid.component";
import { App, Style } from 'src/app/shared/epma-platform/controls/ResourceStyle';
import 'epma-platform/booleanextension';
import 'epma-platform/numberextension';
import 'epma-platform/stringextension';
import {iMath} from 'epma-platform/mathextension';
import 'epma-platform/arrayextension';
//Not Required for LHS. To be Re-Visited.
/*
export class DisplayOtherInformationLineItem  {
        public Convert(value: Object, targetType: Type, parameter: Object, culture: CultureInfo): Object {
            let cntControl: iLabel = new iLabel();
            let colWidth: number = Number.NaN;
            cntControl = LineDisplayHelper.GetOtherInformation(MedicationCommonBB.GetPrescriptionLineItemVMSeqMez(value), colWidth);
            return cntControl;
        }
        public ConvertBack(value: Object, targetType: Type, parameter: Object, culture: CultureInfo): Object {
            return value;
        }
    }
      

    export class BooleanToVisibilityConverter  {
        public Convert(value: Object, targetType: Type, parameter: Object, culture: CultureInfo): Object {
            return <boolean>value ? Visibility.Visible : Visibility.Collapsed;
        }
        public ConvertBack(value: Object, targetType: Type, parameter: Object, culture: CultureInfo): Object {
            return value;
        }
    }
    export class DTTMDisplay  {
        public Convert(value: Object, targetType: Type, parameter: Object, culture: CultureInfo): Object {
            let IsDST: boolean, IsAmbiguous, IsInvalid;
            let date: DateTime= <DateTime>value;
            if (date.Year >= 1753)
                return date.ConvertToUser((o1)=>{IsDST=o1}, (o2)=>{IsAmbiguous=o2}, (o3)=>{IsInvalid=o3}).ToDateTimeString(IsDST, IsAmbiguous, parameter.ToString());
            else return String.Empty;
        }
        public ConvertBack(value: Object, targetType: Type, parameter: Object, culture: CultureInfo): Object {
            return value;
        }
    }
    */
    export class ToolTipDisplayItem {
      public Convert(value: any): Object {
        let tooltipTextblock: TextBlock = new TextBlock();
        if (value != null) {
          tooltipTextblock.Text = value;
          tooltipTextblock.Width = 200;
          tooltipTextblock.TextWrapping = 'Wrap';
        }
        return tooltipTextblock;
      }
      public ConvertBack(value: any) {
        return value;
      }
    }
	
	export class ToolTipDisplaynew {
      public Convert(value: any): Object {
        let tooltipTextblock: TextBlock = new TextBlock();
        if (value != null) {
          tooltipTextblock.Text = value;
          tooltipTextblock.Width = 200;
          tooltipTextblock.TextWrapping = 'Wrap';
        }
        return tooltipTextblock;
      }
      public ConvertBack(value: any) {
        return value;
      }
    }

    export class CustomToolTipWidthItem {
      public Convert(value: any): Object {
        let tooltipTextblock:TextBlock = new TextBlock();
        if (value != null) {
          tooltipTextblock.Text = value;
          tooltipTextblock.Width = 400;
          tooltipTextblock.TextWrapping = 'Wrap';
        }
        return tooltipTextblock;
      }
      public ConvertBack(value: any) {
        return value;
      }
    }

    export class CustomWordWrapItem {
      public Convert(value: any, characterCount: number): string {
        let convertedValue = value;
        if (value) {
                    
          if (value.length > characterCount && value.split('/').length - 1 > 2) {
            let lastIndex = value.Substring(0, characterCount).lastIndexOf('/') + 1;
            let temp = value.Substring(0, lastIndex) + '\n' + value.Substring(lastIndex, value.length);
            convertedValue = temp;
          }
        }
        return convertedValue;
      }
    }

    export class SetAdministeredIcon {
        public Convert(value: Object, targetType: Type, parameter: Object, culture: CultureInfo): Object {
            if (value != null) {
                let oAdminList: AdminList = <AdminList>value;
                if (String.Compare(oAdminList.IsEarlyAdministeredModeVisibility, "Visible", StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(oAdminList.IsLateAdministeredModeVisibility, "Visible", StringComparison.CurrentCultureIgnoreCase) == 0) {
                    let img: Image = new Image();
                    img.Stretch = Stretch.None;
                    img.HorizontalAlignment = HorizontalAlignment.Left;
                    let sAdminOnTimeDiffValue: string = String.Empty;
                    let AdminOnTimeMode: string = '\0';
                    let span: TimeSpan = TimeSpan.MinValue;
                    if (String.Compare(oAdminList.IsEarlyAdministeredModeVisibility, "Visible", StringComparison.CurrentCultureIgnoreCase) == 0) {
                        AdminOnTimeMode = 'E';
                        img.Source = new BitmapImage(new Uri(MedImage.GetPath(MedImages.EarlyAdminIcon), UriKind.RelativeOrAbsolute));
                        span = oAdminList.ScheduleDTTM.ToUniversalTime().Subtract(oAdminList.AdministeredDate.ToUniversalTime());
                    }
                    else if (String.Compare(oAdminList.IsLateAdministeredModeVisibility, "Visible", StringComparison.CurrentCultureIgnoreCase) == 0) {
                        AdminOnTimeMode = 'L';
                        img.Source = new BitmapImage(new Uri(MedImage.GetPath(MedImages.LateAdminIcon), UriKind.RelativeOrAbsolute));
                        span = oAdminList.AdministeredDate.ToUniversalTime().Subtract(oAdminList.ScheduleDTTM.ToUniversalTime());
                    }
                    if (span != TimeSpan.MinValue) {
                        if (span.Days != 0) {
                            let TimeSplit: string = span.TotalHours.ToString();
                            let strArr: string[] = TimeSplit.Split('.');
                            sAdminOnTimeDiffValue = String.Format("{0}:{1} hr(s)", strArr[0], span.Minutes.ToString("00"));
                        }
                        if (sAdminOnTimeDiffValue == String.Empty) {
                            if (span.Hours == 0) {
                                if (span.Minutes < 10)
                                    sAdminOnTimeDiffValue = "0" + Math.abs(span.Minutes) + " min(s)";
                                else sAdminOnTimeDiffValue = Math.abs(span.Minutes) + " min(s)";
                            }
                            else if (span.Hours < 10) {
                                sAdminOnTimeDiffValue = "0" + Math.abs(span.Hours);
                            }
                            else if (span.Hours > 9) {
                                sAdminOnTimeDiffValue = Math.abs(span.Hours).ToString();
                            }
                            if (span.Hours > 0 && span.Minutes < 10) {
                                sAdminOnTimeDiffValue += ":0" + Math.abs(span.Minutes) + " hr(s)";
                            }
                            else if (span.Hours > 0 && span.Minutes > 9) {
                                sAdminOnTimeDiffValue += ":" + Math.abs(span.Minutes) + " hr(s)";
                            }
                        }
                    }
                    let sTip: string = String.Empty;
                    if (AdminOnTimeMode != '\0') {
                        if (AdminOnTimeMode == 'E') {
                            sTip = Resource.medsadmindetails.DoseIcon + " " + sAdminOnTimeDiffValue + " " + Resource.medsadmindetails.DoseEarly;
                            ToolTipService.SetToolTip(img, sTip);
                        }
                        else if (AdminOnTimeMode == 'L') {
                            sTip = Resource.medsadmindetails.DoseIcon + " " + sAdminOnTimeDiffValue + " " + Resource.medsadmindetails.DoseLate;
                            ToolTipService.SetToolTip(img, sTip);
                        }
                    }
                    return img;
                }
                else return String.Empty;
            }
            else return String.Empty;
        }
        public ConvertBack(value: Object, targetType: Type, parameter: Object, culture: CultureInfo): Object {
            return value;
        }
    }
    
    export class MedScanProdDisplayPrescribedItem  {
      public Convert(value: any, targetType: Type, parameter: any, culture: CultureInfo): any {
              let objFillMedsScanProductDetails: MedsScanProductDetailVM = ObjectHelper.CreateType<MedsScanProductDetailVM>(value, MedsScanProductDetailVM);
              let objWPanel: StackPanel = new StackPanel();
              objWPanel.Orientation = Orientation.Horizontal;
              if (objFillMedsScanProductDetails != null && objFillMedsScanProductDetails.oDrugDetail != null) {
                  let objMedAdminConverterHelper: MedAdminMedlineConverterHelper = new MedAdminMedlineConverterHelper();
                  objWPanel.Children.Add(objMedAdminConverterHelper.GetMedAdminDrugHeaderFirstRow(objFillMedsScanProductDetails.oDrugDetail).ChildrenElementArray[0].ChildrenElementArray[0]);
                  objWPanel.Children.Add(objMedAdminConverterHelper.GetDoseWrapPanel(objFillMedsScanProductDetails.oDrugDetail));
                  objMedAdminConverterHelper.GetRouteWrapPanel(objFillMedsScanProductDetails.oDrugDetail, objWPanel);
                  objWPanel.Children.Add(objMedAdminConverterHelper.GetTargetStrangePanel(objFillMedsScanProductDetails.oDrugDetail));
                  objWPanel.Children.Add(objMedAdminConverterHelper.GetHumidificationWrapPannel(objFillMedsScanProductDetails.oDrugDetail));
                  let dhItem: ObservableCollection<DrugDetail> = objFillMedsScanProductDetails != null ? objFillMedsScanProductDetails.oDrugDetail : null;
                  let ReviewAtLabel: string = String.Empty;
                  let BegunAtLabel: string = String.Empty;
                  let DueAtLabel: string = String.Empty;
                  if (!String.IsNullOrEmpty(dhItem[0].DrugHeader.AdministrationInstructions)) {
                  let tbDurationLabel: iLabel = new iLabel();
                      tbDurationLabel.Margin = new Thickness(2, 0, 3, 0);
                      let bindtbtbDurationLabel: Binding = new Binding();
                      bindtbtbDurationLabel.Source = dhItem[0].DrugHeader.AdministrationInstructions;
                  tbDurationLabel.SetBinding(iLabel.TextProperty, bindtbtbDurationLabel);
                      if (String.IsNullOrEmpty(dhItem[0].DrugHeader.InfusionType)) {
                         // tbDurationLabel.Style = ObjectHelper.CreateType<Style>(App.Current.Resources["DrugNonInfValue"], Style);
                      }
                      objWPanel.Children.Add(tbDurationLabel);
                  }
                  if (dhItem[0].DrugHeader.RecordedDTTM != DateTime.MinValue) {
                      if ((!String.IsNullOrEmpty(dhItem[0].DrugHeader.FormViewParameters.INFTYCODE) || (String.Compare(dhItem[0].DrugHeader.ItemSubType, DrugItemSubTypeCode.MEDICAL_GAS, StringComparison.CurrentCultureIgnoreCase) == 0)) && (String.Compare(dhItem[0].SlotDetails[0].Status, "NOTGIVEN", StringComparison.CurrentCultureIgnoreCase) == 0)) {
                          BegunAtLabel = Resource.InfusionChart.Recordat_text;
                      }
                      else {
                          DueAtLabel = Resource.InfusionChart.Dueat_text;
                          if ((!String.IsNullOrEmpty(dhItem[0].DrugHeader.InfusionType) || (String.Compare(dhItem[0].DrugHeader.ItemSubType, DrugItemSubTypeCode.MEDICAL_GAS, StringComparison.CurrentCultureIgnoreCase) == 0)) && (String.Compare(dhItem[0].SlotDetails[0].Status, "CC_INPROGRESS", StringComparison.CurrentCultureIgnoreCase) == 0) || (String.Compare(dhItem[0].SlotDetails[0].Status, "CC_PAUSED", StringComparison.CurrentCultureIgnoreCase) == 0) || (String.Compare(dhItem[0].SlotDetails[0].Status, "CC_RSSTOPPED", StringComparison.CurrentCultureIgnoreCase) == 0) || (String.Compare(dhItem[0].SlotDetails[0].Status, "CC_COMPLETED", StringComparison.CurrentCultureIgnoreCase) == 0))
                              BegunAtLabel = Resource.InfusionChart.Begunat_text;
                          else if (dhItem[0].SlotDetails[0].AdministrationDetail.AdministeredDate != DateTime.MinValue) {
                              BegunAtLabel = Resource.InfusionChart.Recordat_text;
                          }
                      }
                      if (!String.IsNullOrEmpty(BegunAtLabel)) {
                      let tbDurationLabel: iLabel = new iLabel();
                          tbDurationLabel.Margin = new Thickness(2, 0, 3, 0);
                          let bindtbtbDurationLabel: Binding = new Binding();
                          bindtbtbDurationLabel.Source = BegunAtLabel;
                      tbDurationLabel.SetBinding(iLabel.TextProperty, bindtbtbDurationLabel);
                          if (String.IsNullOrEmpty(dhItem[0].DrugHeader.InfusionType)) {
                             // tbDurationLabel.Style = ObjectHelper.CreateType<Style>(App.Current.Resources["DrugNonInfValue"], Style);
                          }
                          objWPanel.Children.Add(tbDurationLabel);
                      }
                      if (dhItem[0].DrugHeader.RecordedDTTM != DateTime.MinValue || dhItem[0].SlotDetails[0].AdministrationDetail.AdministeredDate != DateTime.MinValue) {
                          if ((String.Compare(dhItem[0].DrugHeader.InfusionType, InfusionTypeCode.CONTINUOUS, StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(dhItem[0].DrugHeader.InfusionType, InfusionTypeCode.SINGLEDOSEVOLUME, StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(dhItem[0].DrugHeader.InfusionType, InfusionTypeCode.FLUID, StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(dhItem[0].DrugHeader.InfusionType, InfusionTypeCode.INTERMITTENT, StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(dhItem[0].DrugHeader.InfusionType, InfusionTypeCode.PCA, StringComparison.CurrentCultureIgnoreCase) == 0)) {
                          let tbDurationLabel: iLabel = new iLabel();
                              tbDurationLabel.Margin = new Thickness(2, 0, 3, 0);
                              let bindtbtbDurationLabel: Binding = new Binding();
                              if (dhItem[0].SlotDetails[0].AdministrationDetail.AdministeredDate != DateTime.MinValue) {
                                  bindtbtbDurationLabel.Source = (dhItem[0].SlotDetails[0].AdministrationDetail.AdministeredDate.ToUserDateTimeString(CConstants.LongDateWithoutSecs));
                              }
                              else {
                                  bindtbtbDurationLabel.Source = String.Empty;
                              }
                          tbDurationLabel.SetBinding(iLabel.TextProperty, bindtbtbDurationLabel);
                              if (String.IsNullOrEmpty(dhItem[0].DrugHeader.InfusionType)) {
                                //  tbDurationLabel.Style = ObjectHelper.CreateType<Style>(App.Current.Resources["DrugNonInfValue"], Style);
                              }
                              objWPanel.Children.Add(tbDurationLabel);
                          }
                          else {
                              if ((String.Compare(dhItem[0].SlotDetails[0].Status, "CC_ADMINISTERED", StringComparison.CurrentCultureIgnoreCase) == 0) || (String.Compare(dhItem[0].SlotDetails[0].Status, "CC_SELFADMINISTERED", StringComparison.CurrentCultureIgnoreCase) == 0)) {
                          let tbDurationLabel: iLabel = new iLabel();
                                  tbDurationLabel.Margin = new Thickness(2, 0, 3, 0);
                                  let bindtbtbDurationLabel: Binding = new Binding();
                                  bindtbtbDurationLabel.Source = (dhItem[0].DrugHeader.RecordedDTTM.ToUserDateTimeString(CConstants.LongDateWithoutSecs)) + " (Due at " + dhItem[0].DrugHeader.ScheduleDTTM.ToUserDateTimeString(CConstants.Timeformat) + ")";
                          tbDurationLabel.SetBinding(iLabel.TextProperty, bindtbtbDurationLabel);
                                  if (String.IsNullOrEmpty(dhItem[0].DrugHeader.InfusionType)) {
                                     // tbDurationLabel.Style = ObjectHelper.CreateType<Style>(App.Current.Resources["DrugNonInfValue"], Style);
                                  }
                                  objWPanel.Children.Add(tbDurationLabel);
                              }
                              else {
                          let tbDurationLabel: iLabel = new iLabel();
                                  tbDurationLabel.Margin = new Thickness(2, 0, 3, 0);
                                  let bindtbtbDurationLabel: Binding = new Binding();
                                  bindtbtbDurationLabel.Source = ("Recorded at " + dhItem[0].DrugHeader.RecordedDTTM.ToUserDateTimeString(CConstants.LongDateWithoutSecs));
                          tbDurationLabel.SetBinding(iLabel.TextProperty, bindtbtbDurationLabel);
                                  if (String.IsNullOrEmpty(dhItem[0].DrugHeader.InfusionType)) {
                                     // tbDurationLabel.Style = ObjectHelper.CreateType<Style>(App.Current.Resources["DrugNonInfValue"], Style);
                                  }
                                  objWPanel.Children.Add(tbDurationLabel);
                              }
                          }
                      }
                  }
                  else if (dhItem[0].DrugHeader.ScheduleDTTM != DateTime.MinValue) {
                          let tbDurationLabel: iLabel = new iLabel();
                      tbDurationLabel.Margin = new Thickness(2, 0, 3, 0);
                      let bindtbtbDurationLabel: Binding = new Binding();
                      bindtbtbDurationLabel.Source = ("Due at " + dhItem[0].DrugHeader.ScheduleDTTM.ToUserDateTimeString(CConstants.LongDateWithoutSecs));
                      tbDurationLabel.SetBinding(iLabel.TextProperty, bindtbtbDurationLabel);
                      if (String.IsNullOrEmpty(dhItem[0].DrugHeader.InfusionType)) {
                         // tbDurationLabel.Style = ObjectHelper.CreateType<Style>(App.Current.Resources["DrugNonInfValue"], Style);
                      }
                      objWPanel.Children.Add(tbDurationLabel);
                  }
                  if ((dhItem[0].DrugHeader.ReviewDTTM != DateTime.MinValue)) {
                      if (!String.IsNullOrEmpty(dhItem[0].DrugHeader.FormViewParameters.ReviewAfterDTTM.ToString())) {
                          let tbDurationLabel: iLabel = new iLabel();
                          tbDurationLabel.Margin = new Thickness(2, 0, 3, 0);
                          let bindtbtbDurationLabel: Binding = new Binding();
                          ReviewAtLabel = Resource.InfusionChart.ReviewDue_text;
                          bindtbtbDurationLabel.Source = ReviewAtLabel;
                          tbDurationLabel.SetBinding(iLabel.TextProperty, bindtbtbDurationLabel);
                          if (String.IsNullOrEmpty(dhItem[0].DrugHeader.InfusionType)) {
                             // tbDurationLabel.Style = ObjectHelper.CreateType<Style>(App.Current.Resources["DrugNonInfValue"], Style);
                          }
                          objWPanel.Children.Add(tbDurationLabel);
                      }
                      if (!String.IsNullOrEmpty(dhItem[0].DrugHeader.ReviewDTTM.ToString())) {
                          let tbDurationLabel: iLabel = new iLabel();
                          tbDurationLabel.Margin = new Thickness(2, 0, 3, 0);
                          let bindtbtbDurationLabel: Binding = new Binding();
                          bindtbtbDurationLabel.Source = dhItem[0].DrugHeader.ReviewDTTM.ToString(CConstants.LongDateWithoutSecs);
                          tbDurationLabel.SetBinding(iLabel.TextProperty, bindtbtbDurationLabel);
                          if (String.IsNullOrEmpty(dhItem[0].DrugHeader.InfusionType)) {
                             // tbDurationLabel.Style = ObjectHelper.CreateType<Style>(App.Current.Resources["DrugNonInfValue"], Style);
                          }
                          objWPanel.Children.Add(tbDurationLabel);
                          if (dhItem[0].DrugHeader.ReviewDTTM.Date <= CommonBB.GetServerDateTime().Date) {
                              let sTip: string = MedAdminMedlineConverterHelper.GetReviewIconTooltip(dhItem[0].DrugHeader.ReviewType, dhItem[0].DrugHeader.ReviewDTTM, dhItem[0].DrugHeader.ReviewRequestedComments, dhItem[0].DrugHeader.ReviewedRequestedby);
                              let img1: Image = new Image();
                              img1.Margin = new Thickness(2, 0, 2, 0);
                              img1.Stretch = Stretch.None;
                              img1.Source = new BitmapImage(new Uri(MedImage.GetPath(MedImages.CC_REVIEW_ICO), UriKind.RelativeOrAbsolute));
                              ToolTipService.SetToolTip(img1, sTip);
                              objWPanel.Children.Add(img1);
                          }
                      }
                  }
              }
               // Additional logic to format the content label horizontally
              let objStackPanel: StackPanel = new StackPanel();
              objWPanel.Orientation = Orientation.Horizontal;
              let paraLineDisplay: iLabel = ObjectHelper.CreateObject(new iLabel(), { TextAlignment: TextAlignment.Left, IsWordwrap: true });
              for(let i = 0; i < objWPanel.ChildrenElementArray.Count(); i++) {
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
                          if (objWPanel.ChildrenElementArray[i].iLabelInLineElements[2]) {
                              let InLineRun: iLabelInLineElement = new iLabelInLineElement();
                              InLineRun.InLine = objWPanel.ChildrenElementArray[i].iLabelInLineElements[2].InLine;
                              paraLineDisplay.InLines.Add(InLineRun);
                          }
                          if (objWPanel.ChildrenElementArray[i].iLabelInLineElements[3]) {
                              let InLineRun: iLabelInLineElement = new iLabelInLineElement();
                              InLineRun.InLine = objWPanel.ChildrenElementArray[i].iLabelInLineElements[3].InLine;
                              paraLineDisplay.InLines.Add(InLineRun);
                          }
                          if (objWPanel.ChildrenElementArray[i].iLabelInLineElements[4]) {
                              let InLineRun: iLabelInLineElement = new iLabelInLineElement();
                              InLineRun.InLine = objWPanel.ChildrenElementArray[i].iLabelInLineElements[4].InLine;
                              paraLineDisplay.InLines.Add(InLineRun);
                          }
                          if (objWPanel.ChildrenElementArray[i].iLabelInLineElements[5]) {
                              let InLineRun: iLabelInLineElement = new iLabelInLineElement();
                              InLineRun.InLine = objWPanel.ChildrenElementArray[i].iLabelInLineElements[5].InLine;
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
                          if (objWPanel.ChildrenElementArray[i].ChildrenElementArray[2]) {
                            let InLineRun4: iLabelInLineElement = new iLabelInLineElement();
                            InLineRun4.InLine = objWPanel.ChildrenElementArray[i].ChildrenElementArray[2];
                            paraLineDisplay.InLines.Add(InLineRun4);
                        }
                        if (objWPanel.ChildrenElementArray[i].ChildrenElementArray[3]) {
                          if (objWPanel.ChildrenElementArray[i].ChildrenElementArray[3].iLabelInLineElements) {
                              let InLineRun1: iLabelInLineElement = new iLabelInLineElement();
                              InLineRun1.InLine = objWPanel.ChildrenElementArray[i].ChildrenElementArray[3].iLabelInLineElements[0].InLine;
                              paraLineDisplay.InLines.Add(InLineRun1);
  
                              let InLineRun2: iLabelInLineElement = new iLabelInLineElement();
                              InLineRun2.InLine = objWPanel.ChildrenElementArray[i].ChildrenElementArray[3].iLabelInLineElements[1].InLine;
                              paraLineDisplay.InLines.Add(InLineRun2);
                          }
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
        public GetMedAdminDrugHeaderFirstRow(dhItem: ObservableCollection<DrugDetail>): WrapPanel {
            let objWPanel: WrapPanel = new WrapPanel();
            objWPanel.Orientation = Orientation.Horizontal;
            if (dhItem != null && dhItem instanceof ObservableCollection) {
                if (dhItem != null && dhItem[0].DrugHeader != null && !String.IsNullOrEmpty(dhItem[0].DrugHeader.DrugName)) {
                    if (dhItem[0].SlotDetails != null) {
                        objWPanel.Children.Add(LineDisplayHelper.GetLineItemContentForDrugHeader("CC_MLDPRESITEM", dhItem, dhItem[0].SlotDetails));
                    }
                }
            }
            return objWPanel;
        }
        public GetDoseWrapPanel(dhItem: ObservableCollection<DrugDetail>): WrapPanel {
            let objWPanel: WrapPanel = new WrapPanel();
            objWPanel.Orientation = Orientation.Horizontal;
            if (dhItem != null && dhItem[0].DrugHeader != null) {
                let bInfRecordAdmin: boolean = ((dhItem[0].DrugHeader != null || (dhItem[0].SlotDetails[0] == null))) ? true : false;
                if (String.Compare(dhItem[0].DrugHeader.ItemSubType, DrugItemSubTypeCode.MEDICAL_GAS, StringComparison.CurrentCultureIgnoreCase) == 0 && bInfRecordAdmin) {
                    if (!String.IsNullOrEmpty(dhItem[0].DrugHeader.FormViewParameters.IntravenousInfusionData.Rate) && !String.Equals(dhItem[0].DrugHeader.ItemType, CConstants.Appliance, StringComparison.CurrentCultureIgnoreCase)) {
                        let tbRateLbl: TextBlock = new TextBlock();
                        tbRateLbl.Margin = new Thickness(2, 0, 3, 0);
                        tbRateLbl.FontWeight = FontWeights.Bold;
                        tbRateLbl.TextWrapping = TextWrapping.Wrap;
                        tbRateLbl.Foreground = new SolidColorBrush(CommonBB.ToColor("#006dec"));
                        let bindRateLbl: Binding = new Binding();
                        if (!String.IsNullOrEmpty(dhItem[0].DrugHeader.FormViewParameters.IntravenousInfusionData.Rate)) {
                            bindRateLbl.Source = "RATE";
                        }
                        else {
                            bindRateLbl.Source = String.Empty;
                        }
                        tbRateLbl.SetBinding(TextBlock.TextProperty, bindRateLbl);
                        objWPanel.Children.Add(tbRateLbl);
                        let tbRate: TextBlock = new TextBlock();
                        tbRate.Margin = new Thickness(2, 0, 3, 0);
                        tbRate.TextWrapping = TextWrapping.Wrap;
                        let bindRate: Binding = new Binding();
                        bindRate.Source = dhItem[0].DrugHeader.FormViewParameters.IntravenousInfusionData.Rate;
                        tbRate.SetBinding(TextBlock.TextProperty, bindRate);
                        objWPanel.Children.Add(tbRate);
                    }
                }
                else if (String.Compare(dhItem[0].DrugHeader.InfusionType, InfusionTypeCode.PCA, StringComparison.CurrentCultureIgnoreCase) == 0 && bInfRecordAdmin) {
                    if (!String.IsNullOrEmpty(dhItem[0].DrugHeader.FormViewParameters.AdminDeviceData.BoosterDose) && !String.IsNullOrEmpty(dhItem[0].DrugHeader.FormViewParameters.AdminDeviceData.BoosterDoseUOM.UOMName)) {
                        let tbBolusLbl: TextBlock = new TextBlock();
                        tbBolusLbl.Margin = new Thickness(2, 0, 3, 0);
                        tbBolusLbl.FontWeight = FontWeights.Bold;
                        tbBolusLbl.TextWrapping = TextWrapping.Wrap;
                        tbBolusLbl.Foreground = new SolidColorBrush(CommonBB.ToColor("#006dec"));
                        let bindBolusLbl: Binding = new Binding();
                        if (!String.IsNullOrEmpty(dhItem[0].DrugHeader.FormViewParameters.AdminDeviceData.BoosterDose)) {
                            bindBolusLbl.Source = "Bolus";
                        }
                        else {
                            bindBolusLbl.Source = String.Empty;
                        }
                        tbBolusLbl.SetBinding(TextBlock.TextProperty, bindBolusLbl);
                        objWPanel.Children.Add(tbBolusLbl);
                        let tbBoosterDose: TextBlock = new TextBlock();
                        tbBoosterDose.Margin = new Thickness(2, 0, 3, 0);
                        tbBoosterDose.TextWrapping = TextWrapping.Wrap;
                        let bindBoosterDose: Binding = new Binding();
                        bindBoosterDose.Source = (dhItem[0].DrugHeader.FormViewParameters.AdminDeviceData.BoosterDose + " " + dhItem[0].DrugHeader.FormViewParameters.AdminDeviceData.BoosterDoseUOM.UOMName);
                        tbBoosterDose.SetBinding(TextBlock.TextProperty, bindBoosterDose);
                        objWPanel.Children.Add(tbBoosterDose);
                    }
                    if (!String.IsNullOrEmpty(dhItem[0].DrugHeader.FormViewParameters.AdminDeviceData.LockOutPeriod.ToString()) && !String.IsNullOrEmpty(dhItem[0].DrugHeader.FormViewParameters.AdminDeviceData.LockOutPeriodUOM.UOMName)) {
                        let tbLockOutPeriodLbl: TextBlock = new TextBlock();
                        tbLockOutPeriodLbl.Margin = new Thickness(2, 0, 3, 0);
                        tbLockOutPeriodLbl.FontWeight = FontWeights.Bold;
                        tbLockOutPeriodLbl.TextWrapping = TextWrapping.Wrap;
                        tbLockOutPeriodLbl.Foreground = new SolidColorBrush(CommonBB.ToColor("#006dec"));
                        let bindLockOutPeriodLbl: Binding = new Binding();
                        if (!String.IsNullOrEmpty(dhItem[0].DrugHeader.FormViewParameters.AdminDeviceData.LockOutPeriod.ToString())) {
                            bindLockOutPeriodLbl.Source = "LockOut";
                        }
                        else {
                            bindLockOutPeriodLbl.Source = String.Empty;
                        }
                        tbLockOutPeriodLbl.SetBinding(TextBlock.TextProperty, bindLockOutPeriodLbl);
                        objWPanel.Children.Add(tbLockOutPeriodLbl);
                        let tbLockOutPeriod: TextBlock = new TextBlock();
                        tbLockOutPeriod.Margin = new Thickness(2, 0, 3, 0);
                        tbLockOutPeriod.TextWrapping = TextWrapping.Wrap;
                        let bindLockOutPeriod: Binding = new Binding();
                        bindLockOutPeriod.Source = (dhItem[0].DrugHeader.FormViewParameters.AdminDeviceData.LockOutPeriod + " " + dhItem[0].DrugHeader.FormViewParameters.AdminDeviceData.LockOutPeriodUOM.UOMName);
                        tbLockOutPeriod.SetBinding(TextBlock.TextProperty, bindLockOutPeriod);
                        objWPanel.Children.Add(tbLockOutPeriod);
                    }
                    if (!String.IsNullOrEmpty(dhItem[0].DrugHeader.FormViewParameters.IntravenousInfusionData.MaxDose)) {
                        let tMaxDoseLbl: TextBlock = new TextBlock();
                        tMaxDoseLbl.Margin = new Thickness(2, 0, 3, 0);
                        tMaxDoseLbl.FontWeight = FontWeights.Bold;
                        tMaxDoseLbl.TextWrapping = TextWrapping.Wrap;
                        tMaxDoseLbl.Foreground = new SolidColorBrush(CommonBB.ToColor("#006dec"));
                        let bindMaxDoseLbl: Binding = new Binding();
                        if (!String.IsNullOrEmpty(dhItem[0].DrugHeader.FormViewParameters.IntravenousInfusionData.MaxDose)) {
                            bindMaxDoseLbl.Source = "MaxDose";
                        }
                        else {
                            bindMaxDoseLbl.Source = String.Empty;
                        }
                        tMaxDoseLbl.SetBinding(TextBlock.TextProperty, bindMaxDoseLbl);
                        objWPanel.Children.Add(tMaxDoseLbl);
                        let tbMaxDose: TextBlock = new TextBlock();
                        tbMaxDose.Margin = new Thickness(2, 0, 3, 0);
                        tbMaxDose.TextWrapping = TextWrapping.Wrap;
                        let bindMaxDose: Binding = new Binding();
                        bindMaxDose.Source = dhItem[0].DrugHeader.FormViewParameters.IntravenousInfusionData.MaxDose;
                        tbMaxDose.SetBinding(TextBlock.TextProperty, bindMaxDose);
                        objWPanel.Children.Add(tbMaxDose);
                    }
                    if (!String.IsNullOrEmpty(dhItem[0].DrugHeader.ConcentrationVolume)) {
                        let tConcentrationLbl: TextBlock = new TextBlock();
                        tConcentrationLbl.Margin = new Thickness(2, 0, 3, 0);
                        tConcentrationLbl.FontWeight = FontWeights.Bold;
                        tConcentrationLbl.TextWrapping = TextWrapping.Wrap;
                        tConcentrationLbl.Foreground = new SolidColorBrush(CommonBB.ToColor("#006dec"));
                        let bindConcentrationLbl: Binding = new Binding();
                        if (!String.IsNullOrEmpty(dhItem[0].DrugHeader.ConcentrationVolume)) {
                            bindConcentrationLbl.Source = "Concentration";
                        }
                        else {
                            bindConcentrationLbl.Source = String.Empty;
                        }
                        tConcentrationLbl.SetBinding(TextBlock.TextProperty, bindConcentrationLbl);
                        objWPanel.Children.Add(tConcentrationLbl);
                        let tbConcentration: TextBlock = new TextBlock();
                        tbConcentration.Margin = new Thickness(2, 0, 3, 0);
                        tbConcentration.TextWrapping = TextWrapping.Wrap;
                        let bindConcentration: Binding = new Binding();
                        bindConcentration.Source = dhItem[0].DrugHeader.ConcentrationVolume;
                        tbConcentration.SetBinding(TextBlock.TextProperty, bindConcentration);
                        objWPanel.Children.Add(tbConcentration);
                    }
                    if (!String.IsNullOrEmpty(dhItem[0].DrugHeader.FormViewParameters.IntravenousInfusionData.Rate)) {
                        let tbRateLbl: TextBlock = new TextBlock();
                        tbRateLbl.Margin = new Thickness(2, 0, 3, 0);
                        tbRateLbl.FontWeight = FontWeights.Bold;
                        tbRateLbl.TextWrapping = TextWrapping.Wrap;
                        tbRateLbl.Foreground = new SolidColorBrush(CommonBB.ToColor("#006dec"));
                        let bindRateLbl: Binding = new Binding();
                        if (!String.IsNullOrEmpty(dhItem[0].DrugHeader.FormViewParameters.IntravenousInfusionData.Rate)) {
                            bindRateLbl.Source = "RATE";
                        }
                        else {
                            bindRateLbl.Source = String.Empty;
                        }
                        tbRateLbl.SetBinding(TextBlock.TextProperty, bindRateLbl);
                        objWPanel.Children.Add(tbRateLbl);
                        let tbRate: TextBlock = new TextBlock();
                        tbRate.Margin = new Thickness(2, 0, 3, 0);
                        tbRate.TextWrapping = TextWrapping.Wrap;
                        let bindRate: Binding = new Binding();
                        bindRate.Source = dhItem[0].DrugHeader.FormViewParameters.IntravenousInfusionData.Rate;
                        tbRate.SetBinding(TextBlock.TextProperty, bindRate);
                        objWPanel.Children.Add(tbRate);
                    }
                }
                else if ((String.Compare(dhItem[0].DrugHeader.InfusionType, InfusionTypeCode.CONTINUOUS, StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(dhItem[0].DrugHeader.InfusionType, InfusionTypeCode.SINGLEDOSEVOLUME, StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(dhItem[0].DrugHeader.InfusionType, InfusionTypeCode.FLUID, StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(dhItem[0].DrugHeader.InfusionType, InfusionTypeCode.INTERMITTENT, StringComparison.CurrentCultureIgnoreCase) == 0)) {
                    if (!String.IsNullOrEmpty(dhItem[0].DrugHeader.LowerDose)) {
                      let paraLineDisplay: iLabel = ObjectHelper.CreateObject(new iLabel(), { TextAlignment: TextAlignment.Left, IsWordwrap: true });                   
                      let InLineRun1: iLabelInLineElement = new iLabelInLineElement();
                      let tbDoseLbl: iLabel = new iLabel();
                       // let tbDoseLbl: TextBlock = new TextBlock();
                        tbDoseLbl.Margin = new Thickness(2, 0, 3, 0);
                        tbDoseLbl.FontWeight = FontWeights.Bold;
                        tbDoseLbl.TextWrapping = TextWrapping.Wrap;
                        tbDoseLbl.Foreground = new SolidColorBrush(CommonBB.ToColor("#006dec"));
                        let bindDoseLbl: Binding = new Binding();
                        if (!String.IsNullOrEmpty(dhItem[0].DrugHeader.LowerDose)) {
                            bindDoseLbl.Source = "DOSE";
                        }
                        else {
                            bindDoseLbl.Source = String.Empty;
                        }
                        tbDoseLbl.SetBinding(TextBlock.TextProperty, bindDoseLbl);
                        InLineRun1.InLine = tbDoseLbl;
                        paraLineDisplay.InLines.Add(InLineRun1);
                       // objWPanel.Children.Add(paraLineDisplay);
 
                        let InLineRun2: iLabelInLineElement = new iLabelInLineElement();
                        let tbDose: iLabel = new iLabel();
                        tbDose.Margin = new Thickness(2, 0, 3, 0);
                        tbDose.TextWrapping = TextWrapping.Wrap;
                        let bindDose: Binding = new Binding();
                        bindDose.Source = dhItem[0].DrugHeader.LowerDose + " " + dhItem[0].DrugHeader.DoseUOM;
                        tbDose.SetBinding(TextBlock.TextProperty, bindDose);
                        InLineRun2.InLine = tbDose;
                        paraLineDisplay.InLines.Add(InLineRun2);
                        objWPanel.Children.Add(paraLineDisplay);
                    }
                    if (!String.IsNullOrEmpty(dhItem[0].DrugHeader.FormViewParameters.AdminDeviceData.BoosterDose) && !String.Equals(dhItem[0].DrugHeader.InfusionType, InfusionTypeCode.INTERMITTENT, StringComparison.CurrentCultureIgnoreCase)) {
                        let tbBoosterDoseLbl: TextBlock = new TextBlock();
                        tbBoosterDoseLbl.Margin = new Thickness(2, 0, 3, 0);
                        tbBoosterDoseLbl.FontWeight = FontWeights.Bold;
                        tbBoosterDoseLbl.TextWrapping = TextWrapping.Wrap;
                        tbBoosterDoseLbl.Foreground = new SolidColorBrush(CommonBB.ToColor("#006dec"));
                        let bindBoosterDoseLbl: Binding = new Binding();
                        if (!String.IsNullOrEmpty(dhItem[0].DrugHeader.FormViewParameters.AdminDeviceData.BoosterDose)) {
                            bindBoosterDoseLbl.Source = "BoosterDose";
                        }
                        else {
                            bindBoosterDoseLbl.Source = String.Empty;
                        }
                        tbBoosterDoseLbl.SetBinding(TextBlock.TextProperty, bindBoosterDoseLbl);
                        objWPanel.Children.Add(tbBoosterDoseLbl);
                        let tbBoosterDose: TextBlock = new TextBlock();
                        tbBoosterDose.Margin = new Thickness(2, 0, 3, 0);
                        tbBoosterDose.TextWrapping = TextWrapping.Wrap;
                        let bindBoosterDose: Binding = new Binding();
                        bindBoosterDose.Source = dhItem[0].DrugHeader.FormViewParameters.AdminDeviceData.BoosterDose;
                        tbBoosterDose.SetBinding(TextBlock.TextProperty, bindBoosterDose);
                        objWPanel.Children.Add(tbBoosterDose);
                    }
                    if (dhItem[0].DrugHeader.FormViewParameters != null && dhItem[0].DrugHeader.FormViewParameters.IntravenousInfusionData != null && !String.IsNullOrEmpty(dhItem[0].DrugHeader.FormViewParameters.IntravenousInfusionData.LowConcentration)) {
                        let ConcentrationValue: string = String.Empty;
                        if (dhItem[0].DrugHeader.FormViewParameters.IntravenousInfusionData.LowConcentrationUOMOID != null && !String.IsNullOrEmpty(dhItem[0].DrugHeader.FormViewParameters.IntravenousInfusionData.LowConcentrationUOMOID.UOMName) && dhItem[0].DrugHeader.FormViewParameters.IntravenousInfusionData.UpperConcentrationUOMOID != null && !String.IsNullOrEmpty(dhItem[0].DrugHeader.FormViewParameters.IntravenousInfusionData.UpperConcentrationUOMOID.UOMName)) {
                            ConcentrationValue = dhItem[0].DrugHeader.FormViewParameters.IntravenousInfusionData.LowConcentration + " " + dhItem[0].DrugHeader.FormViewParameters.IntravenousInfusionData.LowConcentrationUOMOID.UOMName + " / " + dhItem[0].DrugHeader.FormViewParameters.IntravenousInfusionData.UpperConcentration + " " + dhItem[0].DrugHeader.FormViewParameters.IntravenousInfusionData.UpperConcentrationUOMOID.UOMName;
                        }
                        let tConcentrationLbl: TextBlock = new TextBlock();
                        tConcentrationLbl.Margin = new Thickness(2, 0, 3, 0);
                        tConcentrationLbl.FontWeight = FontWeights.Bold;
                        tConcentrationLbl.TextWrapping = TextWrapping.Wrap;
                        tConcentrationLbl.Foreground = new SolidColorBrush(CommonBB.ToColor("#006dec"));
                        let bindConcentrationLbl: Binding = new Binding();
                        bindConcentrationLbl.Source = "CONCENTRATION";
                        tConcentrationLbl.SetBinding(TextBlock.TextProperty, bindConcentrationLbl);
                        objWPanel.Children.Add(tConcentrationLbl);
                        let tbConcentration: TextBlock = new TextBlock();
                        tbConcentration.Margin = new Thickness(2, 0, 3, 0);
                        tbConcentration.TextWrapping = TextWrapping.Wrap;
                        let bindConcentration: Binding = new Binding();
                        bindConcentration.Source = ConcentrationValue;
                        tbConcentration.SetBinding(TextBlock.TextProperty, bindConcentration);
                        objWPanel.Children.Add(tbConcentration);
                    }
                    if (dhItem[0].DrugHeader.FormViewParameters != null && dhItem[0].DrugHeader.FormViewParameters.IntravenousInfusionData != null && !String.IsNullOrEmpty(dhItem[0].DrugHeader.FormViewParameters.IntravenousInfusionData.InfusionPeriod)) {
                        let tInfusionPeriodLbl: TextBlock = new TextBlock();
                        tInfusionPeriodLbl.Margin = new Thickness(2, 0, 3, 0);
                        tInfusionPeriodLbl.TextWrapping = TextWrapping.Wrap;
                        let bindInfusionPeriodLbl: Binding = new Binding();
                        bindInfusionPeriodLbl.Source = "- over";
                        tInfusionPeriodLbl.SetBinding(TextBlock.TextProperty, bindInfusionPeriodLbl);
                        objWPanel.Children.Add(tInfusionPeriodLbl);
                        let tbInfusionPeriod: TextBlock = new TextBlock();
                        tbInfusionPeriod.Margin = new Thickness(2, 0, 3, 0);
                        tbInfusionPeriod.TextWrapping = TextWrapping.Wrap;
                        let bindInfusionPeriod: Binding = new Binding();
                        bindInfusionPeriod.Source = dhItem[0].DrugHeader.FormViewParameters.IntravenousInfusionData.InfusionPeriod + " " + dhItem[0].DrugHeader.FormViewParameters.IntravenousInfusionData.InfusionPeriodUOM.UOMName;
                        tbInfusionPeriod.SetBinding(TextBlock.TextProperty, bindInfusionPeriod);
                        objWPanel.Children.Add(tbInfusionPeriod);
                    }
                    if (dhItem[0].DrugHeader.FormViewParameters != null && dhItem[0].DrugHeader.FormViewParameters.IntravenousInfusionData != null && !String.IsNullOrEmpty(dhItem[0].DrugHeader.FormViewParameters.IntravenousInfusionData.Rate)) {
                      let paraLineDisplay: iLabel = ObjectHelper.CreateObject(new iLabel(), { TextAlignment: TextAlignment.Left, IsWordwrap: true });                   
                      let InLineRun1: iLabelInLineElement = new iLabelInLineElement();
                      let tbRateLbl: iLabel = new iLabel();
                        tbRateLbl.Margin = new Thickness(2, 0, 3, 0);
                        tbRateLbl.FontWeight = FontWeights.Bold;
                        tbRateLbl.TextWrapping = TextWrapping.Wrap;
                        tbRateLbl.Foreground = new SolidColorBrush(CommonBB.ToColor("#006dec"));
                        let bindRateLbl: Binding = new Binding();
                        if (!String.IsNullOrEmpty(dhItem[0].DrugHeader.FormViewParameters.IntravenousInfusionData.Rate)) {
                            bindRateLbl.Source = "RATE";
                        }
                        else {
                            bindRateLbl.Source = String.Empty;
                        }
                        tbRateLbl.SetBinding(TextBlock.TextProperty, bindRateLbl);
                        InLineRun1.InLine = tbRateLbl;
                        paraLineDisplay.InLines.Add(InLineRun1);
                       // objWPanel.Children.Add(paraLineDisplay);

                        let InLineRun2: iLabelInLineElement = new iLabelInLineElement();
                        let tbRate: iLabel = new iLabel();
                        tbRate.Margin = new Thickness(2, 0, 3, 0);
                        tbRate.TextWrapping = TextWrapping.Wrap;
                        let bindRate: Binding = new Binding();
                        let Rate: string = String.Empty;
                        if (!String.IsNullOrEmpty(dhItem[0].DrugHeader.FormViewParameters.IntravenousInfusionData.Rate) && !String.IsNullOrEmpty(dhItem[0].DrugHeader.FormViewParameters.IntravenousInfusionData.RateUOM.UOMName) && !String.IsNullOrEmpty(dhItem[0].DrugHeader.FormViewParameters.IntravenousInfusionData.RateDenominatorUOM.UOMName)) {
                            if (!String.IsNullOrEmpty(dhItem[0].DrugHeader.FormViewParameters.IntravenousInfusionData.Rate))
                                Rate = dhItem[0].DrugHeader.FormViewParameters.IntravenousInfusionData.Rate;
                            if (!String.IsNullOrEmpty(dhItem[0].DrugHeader.FormViewParameters.IntravenousInfusionData.UpperRate))
                                Rate += " - " + dhItem[0].DrugHeader.FormViewParameters.IntravenousInfusionData.UpperRate;
                            Rate += " " + dhItem[0].DrugHeader.FormViewParameters.IntravenousInfusionData.RateUOM.UOMName + "/" + dhItem[0].DrugHeader.FormViewParameters.IntravenousInfusionData.RateDenominatorUOM.UOMName;
                        }
                        bindRate.Source = Rate;
                        tbRate.SetBinding(TextBlock.TextProperty, bindRate);
                        InLineRun2.InLine = tbRate;
                        paraLineDisplay.InLines.Add(InLineRun2);
                        objWPanel.Children.Add(paraLineDisplay);
                    }
                    if (!String.IsNullOrEmpty(dhItem[0].DrugHeader.AmendedAsRequired)) {
                        let tbAsReq: TextBlock = new TextBlock();
                        tbAsReq.TextWrapping = TextWrapping.Wrap;
                        tbAsReq.Margin = new Thickness(2, 0, 3, 0);
                        let bindAsReq: Binding = new Binding();
                        if (!String.IsNullOrEmpty(dhItem[0].DrugHeader.AmendedAsRequired)) {
                            bindAsReq.Source = "RequiredText";
                        }
                        else {
                            bindAsReq.Source = String.Empty;
                        }
                        tbAsReq.SetBinding(TextBlock.TextProperty, bindAsReq);
                        if (!String.IsNullOrEmpty(dhItem[0].DrugHeader.DrugFrequency) || !String.IsNullOrEmpty(dhItem[0].DrugHeader.LowerDose)) {
                            let objHypAsReq: TextBlock = ObjectHelper.CreateObject(new TextBlock(), { Text: " " });
                            let objStackAsReq: Grid = new Grid();
                            objStackAsReq.HorizontalAlignment = HorizontalAlignment.Left;
                           // let col1: ColumnDefinition = new Controls.ColumnDefinition();
                            // col1.Width = new GridLength(1, GridUnitType.Auto);
                            // let col2: ColumnDefinition = new ColumnDefinition();
                            // objStackAsReq.ColumnDefinitions.Add(col1);
                            // objStackAsReq.ColumnDefinitions.Add(col2);
                            Grid.SetColumn(objHypAsReq, 0);
                            Grid.SetColumn(tbAsReq, 1);
                            objStackAsReq.Children.Add(objHypAsReq);
                            objStackAsReq.Children.Add(tbAsReq);
                            objWPanel.Children.Add(objStackAsReq);
                        }
                        else {
                            objWPanel.Children.Add(tbAsReq);
                        }
                    }
                }
                else {
                    if (!String.IsNullOrEmpty(dhItem[0].DrugHeader.LowerDose) || String.Equals(dhItem[0].DrugHeader.DoseType, DoseTypeCode.STEPPEDVARIABLE, StringComparison.CurrentCultureIgnoreCase) || String.Equals(dhItem[0].DrugHeader.DoseType, DoseTypeCode.CONDITIONAL, StringComparison.CurrentCultureIgnoreCase) || String.Equals(dhItem[0].DrugHeader.DoseType, DoseTypeCode.TITRATED, StringComparison.CurrentCultureIgnoreCase)) {
                      let paraLineDisplay: iLabel = ObjectHelper.CreateObject(new iLabel(), { TextAlignment: TextAlignment.Left, IsWordwrap: true });
                    
                      let InLineRun1: iLabelInLineElement = new iLabelInLineElement();
                      let tbDoseLbl: iLabel = new iLabel();
                        tbDoseLbl.Margin = new Thickness(2, 0, 3, 0);
                        tbDoseLbl.FontWeight = FontWeights.Bold;
                        tbDoseLbl.TextWrapping = TextWrapping.Wrap;
                        tbDoseLbl.Foreground = new SolidColorBrush(CommonBB.ToColor("#006dec"));
                        //tbDoseLbl.Style = ObjectHelper.CreateType<Style>(App.Current.Resources["DrugNonInflbl"], Style);
                        let bindDoseLbl: Binding = new Binding();
                        bindDoseLbl.Source = "DOSE";
                        tbDoseLbl.SetBinding(TextBlock.TextProperty, bindDoseLbl);
                        InLineRun1.InLine = tbDoseLbl;
                        paraLineDisplay.InLines.Add(InLineRun1);
    
                        let InLineRun2: iLabelInLineElement = new iLabelInLineElement();
                        //objWPanel.Children.Add(tbDoseLbl);
                        let tbDose: iLabel = new iLabel();
                        tbDose.Margin = new Thickness(2, 0, 3, 0);
                        tbDose.TextWrapping = TextWrapping.Wrap;
                       // tbDose.Style = ObjectHelper.CreateType<Style>(App.Current.Resources["DrugNonInfValue"], Style);
                        let bindDose: Binding = new Binding();
                        if (dhItem[0] != null && dhItem[0].DrugHeader != null && !String.IsNullOrEmpty(dhItem[0].DrugHeader.DoseType) && String.Equals(dhItem[0].DrugHeader.DoseType, DoseTypeCode.STEPPEDVARIABLE, StringComparison.CurrentCultureIgnoreCase) || String.Equals(dhItem[0].DrugHeader.DoseType, DoseTypeCode.CONDITIONAL, StringComparison.CurrentCultureIgnoreCase) || String.Equals(dhItem[0].DrugHeader.DoseType, DoseTypeCode.TITRATED, StringComparison.CurrentCultureIgnoreCase)) {
                            let DoseType = String.Empty;
                            if (String.Equals(dhItem[0].DrugHeader.DoseType, DoseTypeCode.STEPPEDVARIABLE, StringComparison.CurrentCultureIgnoreCase)) {
                                DoseType = DoseTypeCode.sSTEPPEDVARDsplyTxt;
                            }
                            else if (String.Equals(dhItem[0].DrugHeader.DoseType, DoseTypeCode.CONDITIONAL, StringComparison.CurrentCultureIgnoreCase)) {
                                DoseType = DoseTypeCode.sCONDITIONALDsplyTxt;
                            }
                            else if (String.Equals(dhItem[0].DrugHeader.DoseType, DoseTypeCode.TITRATED, StringComparison.CurrentCultureIgnoreCase)) {
                                DoseType = DoseTypeCode.sTITRATEDDsplyTxt;
                            }
                            if (!String.IsNullOrEmpty(dhItem[0].DrugHeader.LowerDose) && !String.Equals(dhItem[0].DrugHeader.LowerDose, "0") && !String.IsNullOrEmpty(dhItem[0].DrugHeader.UpperDose) && !String.Equals(dhItem[0].DrugHeader.UpperDose, "0") && !String.IsNullOrEmpty(dhItem[0].DrugHeader.DoseUOM)) {
                                bindDose.Source = String.Format("{0} ({1}-{2} {3})", DoseType, dhItem[0].DrugHeader.LowerDose, dhItem[0].DrugHeader.UpperDose, dhItem[0].DrugHeader.DoseUOM);
                            }
                            else {
                                bindDose.Source = DoseType;
                            }
                        }
                        else if (String.Equals(dhItem[0].DrugHeader.DoseType, DoseTypeCode.NORMAL, StringComparison.CurrentCultureIgnoreCase) || String.Equals(dhItem[0].DrugHeader.DoseType, DoseTypeCode.DOSAGERANGE, StringComparison.CurrentCultureIgnoreCase)) {
                            if (!String.IsNullOrEmpty(dhItem[0].DrugHeader.LowerDose) && !String.Equals(dhItem[0].DrugHeader.LowerDose, "0") && !String.IsNullOrEmpty(dhItem[0].DrugHeader.UpperDose) && !String.Equals(dhItem[0].DrugHeader.UpperDose, "0") && !String.IsNullOrEmpty(dhItem[0].DrugHeader.DoseUOM)) {
                                bindDose.Source = String.Format("{0}-{1} {2}", dhItem[0].DrugHeader.LowerDose, dhItem[0].DrugHeader.UpperDose, dhItem[0].DrugHeader.DoseUOM);
                            }
                            else {
                                bindDose.Source = dhItem[0].DrugHeader.LowerDose + " " + dhItem[0].DrugHeader.DoseUOM;
                            }
                        }
                        else {
                            bindDose.Source = String.Empty;
                        }
                        tbDose.SetBinding(TextBlock.TextProperty, bindDose);
                        InLineRun2.InLine = tbDose;
                        paraLineDisplay.InLines.Add(InLineRun2);

                        objWPanel.Children.Add(paraLineDisplay);
                    }
                    if (!String.IsNullOrEmpty(dhItem[0].DrugHeader.StrengthText)) {
                        let tbStrengthLbl: TextBlock = new TextBlock();
                        tbStrengthLbl.Margin = new Thickness(2, 0, 3, 0);
                        tbStrengthLbl.Style = ObjectHelper.CreateType<Style>(App.Current.Resources["DrugNonInflbl"], Style);
                        let bindStrengthLbl: Binding = new Binding();
                        if (!String.IsNullOrEmpty(dhItem[0].DrugHeader.StrengthText)) {
                            bindStrengthLbl.Source = "STRENGTH";
                        }
                        else {
                            bindStrengthLbl.Source = String.Empty;
                        }
                        tbStrengthLbl.SetBinding(TextBlock.TextProperty, bindStrengthLbl);
                        objWPanel.Children.Add(tbStrengthLbl);
                        let tbStrength: TextBlock = new TextBlock();
                        tbStrength.Margin = new Thickness(2, 0, 3, 0);
                        tbStrength.TextWrapping = TextWrapping.Wrap;
                        tbStrength.Style = ObjectHelper.CreateType<Style>(App.Current.Resources["DrugNonInfValue"], Style);
                        let bindStrength: Binding = new Binding();
                        if (!String.IsNullOrEmpty(dhItem[0].DrugHeader.StrengthText)) {
                            bindStrength.Source = dhItem[0].DrugHeader.StrengthText;
                        }
                        else {
                            bindStrength.Source = String.Empty;
                        }
                        tbStrength.SetBinding(TextBlock.TextProperty, bindStrength);
                        objWPanel.Children.Add(tbStrength);
                    }
                    let tbFreq: TextBlock = new TextBlock();
                    tbFreq.TextWrapping = TextWrapping.Wrap;
                    tbFreq.Margin = new Thickness(2, 0, 3, 0);
                    let bindFreq: Binding = new Binding();
                    if (String.IsNullOrEmpty(dhItem[0].DrugHeader.DrugFrequency)) {
                        bindFreq.Source = dhItem[0].DrugHeader.DrugFrequency;
                    }
                    else {
                        bindFreq.Source = String.Empty;
                    }
                    tbFreq.SetBinding(TextBlock.TextProperty, bindFreq);
                    let tbAsReq: TextBlock = new TextBlock();
                    tbAsReq.TextWrapping = TextWrapping.Wrap;
                    tbAsReq.Margin = new Thickness(2, 0, 3, 0);
                    let bindAsReq: Binding = new Binding();
                    if (!String.IsNullOrEmpty(dhItem[0].DrugHeader.AmendedAsRequired)) {
                        bindAsReq.Source = dhItem[0].DrugHeader.AmendedAsRequired;
                    }
                    else {
                        bindAsReq.Source = String.Empty;
                    }
                    tbAsReq.SetBinding(TextBlock.TextProperty, bindAsReq);
                    if (!String.IsNullOrEmpty(dhItem[0].DrugHeader.AmendedAsRequired)) {
                        if (!String.IsNullOrEmpty(dhItem[0].DrugHeader.DrugFrequency) || !String.IsNullOrEmpty(dhItem[0].DrugHeader.LowerDose)) {
                            let objHypAsReq: TextBlock = ObjectHelper.CreateObject(new TextBlock(), { Text: " " });
                            let objStackAsReq: Grid = new Grid();
                            objStackAsReq.HorizontalAlignment = HorizontalAlignment.Left;
                            let col1: ColumnDefinition = new ColumnDefinition();
                            col1.Width = new GridLength(1, GridUnitType.Auto);
                            let col2: ColumnDefinition = new ColumnDefinition();
                            objStackAsReq.ColumnDefinitions.Add(col1);
                            objStackAsReq.ColumnDefinitions.Add(col2);
                            Grid.SetColumn(objHypAsReq, 0);
                            Grid.SetColumn(tbAsReq, 1);
                            objStackAsReq.Children.Add(objHypAsReq);
                            objStackAsReq.Children.Add(tbAsReq);
                            objWPanel.Children.Add(objStackAsReq);
                        }
                        else {
                            objWPanel.Children.Add(tbAsReq);
                        }
                    }
                }
            }
            return objWPanel;
        }
        public GetRouteWrapPanel(dhItem: ObservableCollection<DrugDetail>, objParentPanel: StackPanel): void {
            objParentPanel.Orientation = Orientation.Horizontal;
            let Routes: string = String.Empty;
            if (dhItem != null && dhItem[0].DrugHeader != null) {
                let bInfRecordAdmin: boolean = ((dhItem[0].DrugHeader != null || (dhItem[0].SlotDetails[0] == null))) ? true : false;
                if (String.Compare(dhItem[0].DrugHeader.ItemSubType, DrugItemSubTypeCode.MEDICAL_GAS, StringComparison.CurrentCultureIgnoreCase) == 0 && bInfRecordAdmin) {
                    if (!String.IsNullOrEmpty(dhItem[0].DrugHeader.Route)) {
                        let tbRouteLbl: TextBlock = new TextBlock();
                        tbRouteLbl.Margin = new Thickness(2, 0, 3, 0);
                        tbRouteLbl.FontWeight = FontWeights.Bold;
                        let bindtbRoutelblForeGrnd: Binding = new Binding();
                        bindtbRoutelblForeGrnd.Source = new SolidColorBrush(CommonBB.ToColor("#006dec"));
                        tbRouteLbl.SetBinding(TextBlock.ForegroundProperty, bindtbRoutelblForeGrnd);
                        let bindRouteLbl: Binding = new Binding();
                        bindRouteLbl.Source = "ROUTE";
                        tbRouteLbl.SetBinding(TextBlock.TextProperty, bindRouteLbl);
                        objParentPanel.Children.Add(tbRouteLbl);
                    }
                    if (!String.IsNullOrEmpty(dhItem[0].DrugHeader.Route)) {
                        Routes = MedicationCommonBB.RouteName(dhItem[0].DrugHeader.Route);
                        let routeArray: string[] = Routes.Split(' ');
                        for (let indx: number = 0; indx < routeArray.length; indx++) {
                            let tbRoute: TextBlock = new TextBlock();
                            tbRoute.Margin = new Thickness(2, 0, 3, 0);
                            tbRoute.TextWrapping = TextWrapping.Wrap;
                            let bindRoute: Binding = new Binding();
                            bindRoute.Source = routeArray[indx];
                            tbRoute.SetBinding(TextBlock.TextProperty, bindRoute);
                            objParentPanel.Children.Add(tbRoute);
                        }
                    }
                    if (dhItem[0].DrugHeader.FormViewParameters != null && !String.IsNullOrEmpty(dhItem[0].DrugHeader.FormViewParameters.AdminDevice) && !String.Equals(dhItem[0].DrugHeader.ItemType, CConstants.Appliance, StringComparison.CurrentCultureIgnoreCase)) {
                        let tbDeliveryDevice: TextBlock = new TextBlock();
                        tbDeliveryDevice.Margin = new Thickness(2, 0, 3, 0);
                        tbDeliveryDevice.TextWrapping = TextWrapping.Wrap;
                        let bindDeliveryDevice: Binding = new Binding();
                        bindDeliveryDevice.Source = "- " + dhItem[0].DrugHeader.FormViewParameters.AdminDevice;
                        tbDeliveryDevice.SetBinding(TextBlock.TextProperty, bindDeliveryDevice);
                        objParentPanel.Children.Add(tbDeliveryDevice);
                    }
                }
                else if ((String.Compare(dhItem[0].DrugHeader.InfusionType, InfusionTypeCode.PCA, StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(dhItem[0].DrugHeader.InfusionType, InfusionTypeCode.CONTINUOUS, StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(dhItem[0].DrugHeader.InfusionType, InfusionTypeCode.INTERMITTENT, StringComparison.CurrentCultureIgnoreCase) == 0 || String.Equals(dhItem[0].DrugHeader.InfusionType, InfusionTypeCode.SINGLEDOSEVOLUME, StringComparison.CurrentCultureIgnoreCase) || String.Equals(dhItem[0].DrugHeader.InfusionType, InfusionTypeCode.FLUID, StringComparison.CurrentCultureIgnoreCase)) && bInfRecordAdmin) {
                    if (!String.IsNullOrEmpty(dhItem[0].DrugHeader.Route)) {
                      let tbRouteLbl: iLabel = new iLabel();
                        tbRouteLbl.Margin = new Thickness(2, 0, 3, 0);
                        tbRouteLbl.FontWeight = FontWeights.Bold;
                        let bindtbRoutelblForeGrnd: Binding = new Binding();
                        bindtbRoutelblForeGrnd.Source = new SolidColorBrush(CommonBB.ToColor("#006dec"));
                        tbRouteLbl.SetBinding(TextBlock.ForegroundProperty, bindtbRoutelblForeGrnd);
                        let bindRouteLbl: Binding = new Binding();
                        bindRouteLbl.Source = "ROUTE";
                        tbRouteLbl.SetBinding(TextBlock.TextProperty, bindRouteLbl);
                        objParentPanel.Children.Add(tbRouteLbl);
                        Routes = MedicationCommonBB.RouteName(dhItem[0].DrugHeader.Route);
                        let routeArray: string[] = Routes.Split(' ');
                        for (let indx: number = 0; indx < routeArray.length; indx++) {
                            let tbRoute: iLabel = new iLabel();
                            tbRoute.Margin = new Thickness(2, 0, 3, 0);
                            tbRoute.TextWrapping = TextWrapping.Wrap;
                            let bindRoute: Binding = new Binding();
                            bindRoute.Source = routeArray[indx];
                            tbRoute.SetBinding(TextBlock.TextProperty, bindRoute);
                            objParentPanel.Children.Add(tbRoute);
                        }
                    }
                    if (!String.IsNullOrEmpty(dhItem[0].DrugHeader.Site)) {
                        let tbSiteLbl: TextBlock = new TextBlock();
                        tbSiteLbl.Margin = new Thickness(2, 0, 3, 0);
                        tbSiteLbl.FontWeight = FontWeights.Bold;
                        let bindDoseForeGrnd: Binding = new Binding();
                        bindDoseForeGrnd.Source = new SolidColorBrush(CommonBB.ToColor("#006dec"));
                        tbSiteLbl.SetBinding(TextBlock.ForegroundProperty, bindDoseForeGrnd);
                        let bindSiteLbl: Binding = new Binding();
                        if (!String.IsNullOrEmpty(dhItem[0].DrugHeader.Site)) {
                            bindSiteLbl.Source = "SITE";
                        }
                        else {
                            bindSiteLbl.Source = String.Empty;
                        }
                        tbSiteLbl.SetBinding(TextBlock.TextProperty, bindSiteLbl);
                        objParentPanel.Children.Add(tbSiteLbl);
                        let routeArray: string[] = dhItem[0].DrugHeader.Site.Split(' ');
                        for (let indx: number = 0; indx < routeArray.length; indx++) {
                            let tbSite: TextBlock = new TextBlock();
                            tbSite.Margin = new Thickness(2, 0, 3, 0);
                            tbSite.TextWrapping = TextWrapping.Wrap;
                            let bindSite: Binding = new Binding();
                            if (!String.IsNullOrEmpty(dhItem[0].DrugHeader.Site)) {
                                bindSite.Source = routeArray[indx];
                            }
                            else {
                                bindSite.Source = String.Empty;
                            }
                            tbSite.SetBinding(TextBlock.TextProperty, bindSite);
                            objParentPanel.Children.Add(tbSite);
                        }
                    }
                    if (dhItem[0].DrugHeader.FormViewParameters != null && dhItem[0].DrugHeader.FormViewParameters.IntravenousInfusionData != null && !String.IsNullOrEmpty(dhItem[0].DrugHeader.FormViewParameters.IntravenousInfusionData.Lumen)) {
                        let tbLumen: TextBlock = new TextBlock();
                        tbLumen.Margin = new Thickness(2, 0, 3, 0);
                        tbLumen.TextWrapping = TextWrapping.Wrap;
                        let bindLumen: Binding = new Binding();
                        bindLumen.Source = "- " + dhItem[0].DrugHeader.FormViewParameters.IntravenousInfusionData.Lumen;
                        tbLumen.SetBinding(TextBlock.TextProperty, bindLumen);
                        objParentPanel.Children.Add(tbLumen);
                    }
                    if (dhItem[0].DrugHeader.FormViewParameters != null && !String.IsNullOrEmpty(dhItem[0].DrugHeader.FormViewParameters.AdminDevice)) {
                        let tbDeliveryDevice: TextBlock = new TextBlock();
                        tbDeliveryDevice.Margin = new Thickness(2, 0, 3, 0);
                        tbDeliveryDevice.TextWrapping = TextWrapping.Wrap;
                        let bindDeliveryDevice: Binding = new Binding();
                        bindDeliveryDevice.Source = "- " + dhItem[0].DrugHeader.FormViewParameters.AdminDevice;
                        tbDeliveryDevice.SetBinding(TextBlock.TextProperty, bindDeliveryDevice);
                        objParentPanel.Children.Add(tbDeliveryDevice);
                    }
                }
                else {
                    if (!String.IsNullOrEmpty(dhItem[0].DrugHeader.Route)) {
                        let tbRouteLbl: iLabel = new iLabel();
                        tbRouteLbl.Margin = new Thickness(2, 0, 3, 0);
                        tbRouteLbl.FontWeight = FontWeights.Bold;
                        let bindtbRoutelblForeGrnd: Binding = new Binding();
                        bindtbRoutelblForeGrnd.Source = new SolidColorBrush(CommonBB.ToColor("#006dec"));
                        tbRouteLbl.SetBinding(TextBlock.ForegroundProperty, bindtbRoutelblForeGrnd);
                       // tbRouteLbl.Style = ObjectHelper.CreateType<Style>(App.Current.Resources["DrugNonInflbl"], Style);
                        let bindRouteLbl: Binding = new Binding();
                        bindRouteLbl.Source = "ROUTE";
                        tbRouteLbl.SetBinding(TextBlock.TextProperty, bindRouteLbl);
                        objParentPanel.Children.Add(tbRouteLbl);
                    }
                    if (!String.IsNullOrEmpty(dhItem[0].DrugHeader.Route)) {
                        Routes = MedicationCommonBB.RouteName(dhItem[0].DrugHeader.Route);
                        let routeArray: string[] = Routes.Split(' ');
                        for (let indx: number = 0; indx < routeArray.length; indx++) {
                            let tbRoute: iLabel = new iLabel();
                            tbRoute.Margin = new Thickness(2, 0, 3, 0);
                            tbRoute.TextWrapping = TextWrapping.Wrap;
                            //tbRoute.Style = ObjectHelper.CreateType<Style>(App.Current.Resources["DrugNonInfValue"], Style);
                            let bindRoute: Binding = new Binding();
                            bindRoute.Source = routeArray[indx];
                            tbRoute.SetBinding(TextBlock.TextProperty, bindRoute);
                            objParentPanel.Children.Add(tbRoute);
                        }
                    }
                    if (!String.IsNullOrEmpty(dhItem[0].SlotDetails[0].AdministrationDetail.Site)) {
                        let tbSiteLbl: TextBlock = new TextBlock();
                        tbSiteLbl.Margin = new Thickness(2, 0, 3, 0);
                        tbSiteLbl.FontWeight = FontWeights.Bold;
                        let bindDoseForeGrnd: Binding = new Binding();
                        bindDoseForeGrnd.Source = new SolidColorBrush(CommonBB.ToColor("#006dec"));
                        tbSiteLbl.SetBinding(TextBlock.ForegroundProperty, bindDoseForeGrnd);
                        let bindSiteLbl: Binding = new Binding();
                        if (!String.IsNullOrEmpty(dhItem[0].DrugHeader.Site)) {
                            bindSiteLbl.Source = "SITE";
                        }
                        else {
                            bindSiteLbl.Source = String.Empty;
                        }
                        tbSiteLbl.SetBinding(TextBlock.TextProperty, bindSiteLbl);
                        objParentPanel.Children.Add(tbSiteLbl);
                    }
                    if (!String.IsNullOrEmpty(dhItem[0].DrugHeader.Site)) {
                        let routeArray: string[] = dhItem[0].DrugHeader.Site.Split(' ');
                        for (let indx: number = 0; indx < routeArray.length; indx++) {
                            let tbSite: TextBlock = new TextBlock();
                            tbSite.Margin = new Thickness(2, 0, 3, 0);
                            tbSite.TextWrapping = TextWrapping.Wrap;
                            let bindSite: Binding = new Binding();
                            if (!String.IsNullOrEmpty(dhItem[0].DrugHeader.Site)) {
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
        public GetTargetStrangePanel(dhItem: ObservableCollection<DrugDetail>): WrapPanel {
            let objParentPanel: WrapPanel = new WrapPanel();
            objParentPanel.Orientation = Orientation.Horizontal;
            if (dhItem[0] != null && dhItem[0].DrugHeader != null) {
                if (String.Compare(dhItem[0].DrugHeader.ItemSubType, DrugItemSubTypeCode.MEDICAL_GAS, StringComparison.CurrentCultureIgnoreCase) == 0) {
                    if (dhItem[0].DrugHeader.FormViewParameters.IntravenousInfusionData.TargetSaturationUpper > 0) {
                        let tbTargetSatLbl: TextBlock = new TextBlock();
                        tbTargetSatLbl.Margin = new Thickness(2, 0, 3, 0);
                        tbTargetSatLbl.FontWeight = FontWeights.Bold;
                        let bindtbTargetSatlblForeGrnd: Binding = new Binding();
                        bindtbTargetSatlblForeGrnd.Source = new SolidColorBrush(CommonBB.ToColor("#006dec"));
                        tbTargetSatLbl.SetBinding(TextBlock.ForegroundProperty, bindtbTargetSatlblForeGrnd);
                        let bindTargetsatLbl: Binding = new Binding();
                        bindTargetsatLbl.Source = "TARGET SATURATION RANGE";
                        tbTargetSatLbl.SetBinding(TextBlock.TextProperty, bindTargetsatLbl);
                        objParentPanel.Children.Add(tbTargetSatLbl);
                        let TargetSaturationRange: string = String.Empty;
                        TargetSaturationRange = dhItem[0].DrugHeader.FormViewParameters.IntravenousInfusionData.TargetSaturationLower.ToString() + " - " + dhItem[0].DrugHeader.FormViewParameters.IntravenousInfusionData.TargetSaturationUpper.ToString() + "%";
                        let TargetSatRangeArray: string[] = TargetSaturationRange.Split(' ');
                        let nCount: number = TargetSatRangeArray.length;
                        for (let indx: number = 0; indx < nCount; indx++) {
                            let tbTargetSat: TextBlock = new TextBlock();
                            tbTargetSat.Margin = new Thickness(2, 0, 3, 0);
                            tbTargetSat.TextWrapping = TextWrapping.Wrap;
                            let bindTargetsat: Binding = new Binding();
                            bindTargetsat.Source = TargetSatRangeArray[indx];
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
        public GetHumidificationWrapPannel(dhItem: ObservableCollection<DrugDetail>): WrapPanel {
            let objParentPanel: WrapPanel = new WrapPanel();
            objParentPanel.Orientation = Orientation.Horizontal;
            if (dhItem[0] != null && dhItem[0].DrugHeader != null) {
                if (String.Compare(dhItem[0].DrugHeader.ItemSubType, DrugItemSubTypeCode.MEDICAL_GAS, StringComparison.CurrentCultureIgnoreCase) == 0) {
                    if (!String.IsNullOrEmpty(dhItem[0].DrugHeader.FormViewParameters.IntravenousInfusionData.HUMIDCode) && InfHumdificationConceptCodeData.ConceptCodes != null) {
                        let tbHumidificationLbl: TextBlock = new TextBlock();
                        tbHumidificationLbl.Margin = new Thickness(2, 0, 3, 0);
                        tbHumidificationLbl.FontWeight = FontWeights.Bold;
                        let bindtbHumidificationlblForeGrnd: Binding = new Binding();
                        bindtbHumidificationlblForeGrnd.Source = new SolidColorBrush(CommonBB.ToColor("#006dec"));
                        tbHumidificationLbl.SetBinding(TextBlock.ForegroundProperty, bindtbHumidificationlblForeGrnd);
                        let bindHumidificationLbl: Binding = new Binding();
                        bindHumidificationLbl.Source = "HUMIDIFICATION";
                        tbHumidificationLbl.SetBinding(TextBlock.TextProperty, bindHumidificationLbl);
                        objParentPanel.Children.Add(tbHumidificationLbl);
                        let Humdification: string = String.Empty;
                        Humdification = InfHumdificationConceptCodeData.ConceptCodes.Where(c => c.Value == dhItem[0].DrugHeader.FormViewParameters.IntravenousInfusionData.HUMIDCode.ToString()).Select(s => s.DisplayText).FirstOrDefault();
                        let tbHumidification: TextBlock = new TextBlock();
                        tbHumidification.Margin = new Thickness(2, 0, 3, 0);
                        tbHumidification.TextWrapping = TextWrapping.Wrap;
                        let bindHumidification: Binding = new Binding();
                        bindHumidification.Source = Humdification;
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
        public static GetReviewIconTooltip(ReviewType: string, ReviewDTTM: DateTime, ReviewRequestedComments: string, ReviewedRequestedby: string): string {
            let Reviewtooltip: string = String.Empty;
            if (String.Equals(ReviewType, CConstants.ReviewGeneralType)) {
                Reviewtooltip = Resource.InfusionChart.ReviewGeneralIcon_Tooltip + " " + ReviewDTTM.ToString(CConstants.LongDateWithoutSecs) + Environment.NewLine;
            }
            else {
                Reviewtooltip = Resource.InfusionChart.ReviewOmittedIcon_Tooltip + " " + ReviewDTTM.ToString(CConstants.LongDateWithoutSecs) + Environment.NewLine;
            }
            if (!String.IsNullOrEmpty(ReviewRequestedComments)) {
                Reviewtooltip += ReviewRequestedComments + Environment.NewLine;
            }
            if (!String.IsNullOrEmpty(ReviewedRequestedby)) {
                Reviewtooltip += Resource.InfusionChart.ReviewReqby + ": " + ReviewedRequestedby;
            }
            return Reviewtooltip;
        }
      }
    /*
    export class DisplayAcknowledgeStatus  {
        public Convert(value: Object, targetType: Type, parameter: Object, culture: CultureInfo): Object {
            let img: Image = new Image();
            img.Stretch = Stretch.None;
            img.HorizontalAlignment = HorizontalAlignment.Center;
            if (value != null) {
                if (ObjectHelper.CreateType<string>(value, "string") == "1") {
                    img.Source = new BitmapImage(new Uri(MedImage.GetPath(MedImages.CheckedReadCheckIcon), UriKind.RelativeOrAbsolute));
                    ToolTipService.SetToolTip(img, Resource.prescribedrugs.Checkreadonlycheck_Tooltip);
                }
                else {
                    img.Source = new BitmapImage(new Uri(MedImage.GetPath(MedImages.CheckedReadUnCheckIcon), UriKind.RelativeOrAbsolute));
                    ToolTipService.SetToolTip(img, Resource.prescribedrugs.CheckreadonlyUncheck_Tooltip);
                }
            }
            return img;
        }
        public ConvertBack(value: Object, targetType: Type, parameter: Object, culture: CultureInfo): Object {
            return value;
        }
    }
    export class WarningType  {
        public Convert(value: Object, targetType: Type, parameter: Object, culture: CultureInfo): Object {
            let dMaxWidth: number;
            if (!(parameter != null && Number.TryParse(parameter.ToString(), (o1) => {dMaxWidth=o1})))
                dMaxWidth = Number.NaN;
            let oVM: ManagePrescSer.WarningDetails = ObjectHelper.CreateType<ManagePrescSer.WarningDetails>(value, ManagePrescSer.WarningDetails);
            let lblWarningType: iLabel = new iLabel();
            if (oVM != null) {
                lblWarningType.Text = oVM.WarningType;
                lblWarningType.IsWordwrap = true;
                if (!Number.isNaN(dMaxWidth))
                    lblWarningType.MaxWidth = dMaxWidth;
            }
            return lblWarningType;
        }
        public ConvertBack(value: Object, targetType: Type, parameter: Object, culture: CultureInfo): Object {
            return value;
        }
    }
    export class ShowStarImages  {
        public Convert(value: Object, targetType: Type, parameter: Object, culture: CultureInfo): Object {
            let sWarningType: string = String.Empty;
            let oVM: ManagePrescSer.WarningDetails = ObjectHelper.CreateType<ManagePrescSer.WarningDetails>(value, ManagePrescSer.WarningDetails);
            sWarningType = oVM.WarningType;
            let sWarSubType: string = String.Empty;
            let rtb: RichTextBox = ObjectHelper.CreateObject(new RichTextBox(), {
                BorderBrush: null,
                IsReadOnly: true,
                Background: new SolidColorBrush(Colors.Transparent),
                BorderThickness: new Thickness(0),
                AcceptsReturn: false
            });
            let sWarnData: string[] = sWarningType.Split('-');
            rtb.Margin = new Thickness(2);
            let para: Paragraph = new Paragraph();
            para.Inlines.Add(sWarnData[0]);
            if (String.Equals(sWarnData[0].Trim(), "Warning")) {
                let sWarSubTypes: string[] = !String.IsNullOrEmpty(oVM.WarningSubType) ? oVM.WarningSubType.Split(',') : null;
                if (sWarSubTypes != null && sWarSubTypes.length > 0) {
                    para.Inlines.Add(" - ");
                    for (let i: number = 0; i < sWarSubTypes.length; i++) {
                        if (!String.IsNullOrEmpty(sWarSubTypes[i])) {
                            sWarSubType = CommonBB.GetText(sWarSubTypes[i], WarningConceptCode.WarningCategoriesData);
                            if (i == 0) {
                                para.Inlines.Add(sWarSubType);
                            }
                            else {
                                para.Inlines.Add(",");
                                para.Inlines.Add(sWarSubType);
                            }
                        }
                    }
                }
            }
            let inLineCont: InlineUIContainer = new InlineUIContainer();
            if (sWarnData.length > 1 && !String.Equals(sWarnData[0], "Warning ") && sWarnData[1] != null) {
                para.Inlines.Add(" - " + sWarnData[1]);
                switch (sWarnData[1].Trim().ToUpper()) {
                    case "LOW":
                        para.Inlines.Add(ObjectHelper.CreateObject(new InlineUIContainer(), { Child: this.GetImage() }));
                        break;
                    case "MODERATE":
                        para.Inlines.Add(ObjectHelper.CreateObject(new InlineUIContainer(), { Child: this.GetImage() }));
                        para.Inlines.Add(" ");
                        para.Inlines.Add(ObjectHelper.CreateObject(new InlineUIContainer(), { Child: this.GetImage() }));
                        break;
                    case "SIGNIFICANT":
                        para.Inlines.Add(ObjectHelper.CreateObject(new InlineUIContainer(), { Child: this.GetImage() }));
                        para.Inlines.Add(" ");
                        para.Inlines.Add(ObjectHelper.CreateObject(new InlineUIContainer(), { Child: this.GetImage() }));
                        para.Inlines.Add(" ");
                        para.Inlines.Add(ObjectHelper.CreateObject(new InlineUIContainer(), { Child: this.GetImage() }));
                        break;
                    case "HIGH":
                        para.Inlines.Add(ObjectHelper.CreateObject(new InlineUIContainer(), { Child: this.GetImage() }));
                        para.Inlines.Add(" ");
                        para.Inlines.Add(ObjectHelper.CreateObject(new InlineUIContainer(), { Child: this.GetImage() }));
                        para.Inlines.Add(" ");
                        para.Inlines.Add(ObjectHelper.CreateObject(new InlineUIContainer(), { Child: this.GetImage() }));
                        para.Inlines.Add(" ");
                        para.Inlines.Add(ObjectHelper.CreateObject(new InlineUIContainer(), { Child: this.GetImage() }));
                        break;
                }
            }
            rtb.Selection.Insert(para);
            return rtb;
        }
        public ConvertBack(value: Object, targetType: Type, parameter: Object, culture: CultureInfo): Object {
            throw new NotImplementedException();
        }
        private GetImage(): Image {
            let img1: Image = new Image();
            img1.Stretch = Stretch.None;
            img1.Source = new BitmapImage(new Uri(MedImage.GetPath(MedImages.Star), UriKind.RelativeOrAbsolute));
            return img1;
        }
    }
    export class FormatConflicts  {
        public Convert(value: Object, targetType: Type, parameter: Object, culture: CultureInfo): Object {
            let sWarningMsg: string = String.Empty;
            let dMaxWidth: number;
            if (!(parameter != null && Number.TryParse(parameter.ToString(), (o1) => { dMaxWidth = o1})))
                dMaxWidth = Number.NaN;
            let oVM: ManagePrescSer.WarningDetails = ObjectHelper.CreateType<ManagePrescSer.WarningDetails>(value, ManagePrescSer.WarningDetails);
            ;
            sWarningMsg = oVM.WarningMessage.Replace("<BR>", "\n").Replace("<br />", "\n").Replace("&amp;", "&");
            return this.ConflictsFormatting(sWarningMsg, dMaxWidth);
        }
        public ConvertBack(value: Object, targetType: Type, parameter: Object, culture: CultureInfo): Object {
            return value;
        }
        public ConflictsFormatting(sWarningMsg: string, dMaxWidth: number): Object {
            let para: Paragraph = new Paragraph();
            para.Inlines.Add(sWarningMsg);
            let rtb: RichTextBox = ObjectHelper.CreateObject(new RichTextBox(), {
                BorderBrush: null,
                IsReadOnly: true,
                Background: new SolidColorBrush(Colors.Transparent),
                BorderThickness: new Thickness(0),
                AcceptsReturn: false,
                IsEnabled: true,
                Margin: new Thickness(2),
                TextWrapping: TextWrapping.Wrap
            });
            if (!Number.isNaN(dMaxWidth))
                rtb.MaxWidth = dMaxWidth;
            rtb.Selection.Insert(para);
            return rtb;
        }
    }
    export class DisplayDrugOrderDetails  {
        public Convert(value: Object, targetType: Type, parameter: Object, culture: CultureInfo): Object {
            let spResult: StackPanel = ObjectHelper.CreateObject(new StackPanel(), { Orientation: Orientation.Vertical, HorizontalAlignment: HorizontalAlignment.Left });
            if (value != null && value instanceof DrugDetailsOrderData) {
                let objDrugDetailsOrderData: DrugDetailsOrderData = ObjectHelper.CreateType<DrugDetailsOrderData>(value, DrugDetailsOrderData);
                let tb: TextBlock = new TextBlock();
                tb.TextWrapping = TextWrapping.Wrap;
                tb.Text = objDrugDetailsOrderData.OrderPriscribedName;
                spResult.Children.Add(tb);
                if (!String.IsNullOrEmpty(objDrugDetailsOrderData.DrugPropertyCode)) {
                    let spImages: StackPanel = this.GetDrugPropertiesForLineItem(objDrugDetailsOrderData.DrugPropertyCode, objDrugDetailsOrderData.IdentifyingType, objDrugDetailsOrderData.HighRiskMsg);
                    spResult.Children.Add(spImages);
                }
            }
            return spResult;
        }
        public ConvertBack(value: Object, targetType: Type, parameter: Object, culture: CultureInfo): Object {
            return value;
        }
        public GetDrugPropertiesForLineItem(sDrugPropery: string, IdentType: string, sHighRiskMsg: string): StackPanel {
            let stpImages: StackPanel = ObjectHelper.CreateObject(new StackPanel(), { Orientation: Orientation.Horizontal, HorizontalAlignment: HorizontalAlignment.Left });
            let sDrugProperties: string[] = sDrugPropery.Split(',');
            for (let j: number = 0; j < sDrugProperties.length; j++) {
                let img1: Image = ObjectHelper.CreateObject(new Image(), { Margin: new Thickness(2) });
                img1.Stretch = Stretch.None;
                switch (sDrugProperties[j]) {
                    case "CC_CNTRLDDRUG":
                        img1.Source = new BitmapImage(new Uri(MedImage.GetPath(MedImages.CC_CNTRLDDRUG), UriKind.RelativeOrAbsolute));
                        if (String.Compare(IdentType, "CATALOGUEITEM", StringComparison.OrdinalIgnoreCase) == 0 || String.Compare(IdentType, CConstants.ACTUALMOIETY, StringComparison.OrdinalIgnoreCase) == 0) {
                            ToolTipService.SetToolTip(img1, Resource.prescribedrugs.CC_CNTRLDDRUGif_Tooltip);
                        }
                        else {
                            ToolTipService.SetToolTip(img1, Resource.prescribedrugs.CC_CNTRLDDRUGelse_Tooltip);
                        }
                        stpImages.Children.Add(img1);
                        break;
                    case "CC_UNLICENSED":
                        img1.Source = new BitmapImage(new Uri(MedImage.GetPath(MedImages.CC_UNLICENSED), UriKind.RelativeOrAbsolute));
                        if (String.Compare(IdentType, "CATALOGUEITEM", StringComparison.OrdinalIgnoreCase) == 0 || String.Compare(IdentType, CConstants.ACTUALMOIETY, StringComparison.OrdinalIgnoreCase) == 0) {
                            ToolTipService.SetToolTip(img1, Resource.prescribedrugs.CC_UNLICENSEDif_Tooltip);
                        }
                        else {
                            ToolTipService.SetToolTip(img1, Resource.prescribedrugs.CC_UNLICENSEDelse_Tooltip);
                        }
                        stpImages.Children.Add(img1);
                        break;
                    case "CC_HIGHRISK":
                        img1.Source = new BitmapImage(new Uri(MedImage.GetPath(MedImages.CC_HIGHRISK), UriKind.RelativeOrAbsolute));
                        if (String.Compare(IdentType, "CATALOGUEITEM", StringComparison.OrdinalIgnoreCase) == 0 || String.Compare(IdentType, CConstants.ACTUALMOIETY, StringComparison.OrdinalIgnoreCase) == 0) {
                            if (!String.IsNullOrEmpty(sHighRiskMsg))
                                ToolTipService.SetToolTip(img1, Resource.prescribedrugs.CC_HIGHRISKif_Tooltip + " - " + sHighRiskMsg + " - " + Resource.prescribedrugs.CC_HIGHRISKelse_Tooltip);
                            else ToolTipService.SetToolTip(img1, Resource.prescribedrugs.CC_HIGHRISKif_Tooltip + " - " + Resource.prescribedrugs.CC_HIGHRISKelse_Tooltip);
                        }
                        else {
                            ToolTipService.SetToolTip(img1, Resource.prescribedrugs.CC_HIGHRISKif_Tooltip + " - " + sHighRiskMsg);
                        }
                        stpImages.Children.Add(img1);
                        break;
                    case "CC_NEWLY":
                        img1.Source = new BitmapImage(new Uri(MedImage.GetPath(MedImages.CC_NEWLY), UriKind.RelativeOrAbsolute));
                        if (String.Compare(IdentType, "CATALOGUEITEM", StringComparison.OrdinalIgnoreCase) == 0 || String.Compare(IdentType, CConstants.ACTUALMOIETY, StringComparison.OrdinalIgnoreCase) == 0) {
                            ToolTipService.SetToolTip(img1, Resource.prescribedrugs.CC_NEWLYif_Tooltip);
                        }
                        else {
                            ToolTipService.SetToolTip(img1, Resource.prescribedrugs.CC_NEWLYelse_Tooltip);
                        }
                        stpImages.Children.Add(img1);
                        break;
                    case "CC_NAMEDRUG":
                        img1.Source = new BitmapImage(new Uri(MedImage.GetPath(MedImages.CC_NAMEDRUG), UriKind.RelativeOrAbsolute));
                        if (String.Compare(IdentType, "CATALOGUEITEM", StringComparison.OrdinalIgnoreCase) == 0 || String.Compare(IdentType, CConstants.ACTUALMOIETY, StringComparison.OrdinalIgnoreCase) == 0) {
                            ToolTipService.SetToolTip(img1, Resource.prescribedrugs.CC_NAMEDRUGif_Tooltip);
                        }
                        else {
                            ToolTipService.SetToolTip(img1, Resource.prescribedrugs.CC_NAMEDRUGelse_Tooltip);
                        }
                        stpImages.Children.Add(img1);
                        break;
                }
            }
            return stpImages;
        }
    }
    export class DisplaySteppedDose  {
        public Convert(value: Object, targetType: Type, parameter: Object, culture: CultureInfo): Object {
            let cntControl: ContentControl = new ContentControl();
            if (value instanceof MultipleDoseDetail) {
                let oTextBlk: TextBlock = new TextBlock();
                let oMultiDose: MultipleDoseDetail = ObjectHelper.CreateType<MultipleDoseDetail>(value, MultipleDoseDetail);
                if (oMultiDose.UpperDose > 0) {
                    if (oMultiDose.DoseUOM != null)
                        oTextBlk.Text = oMultiDose.LowerDose.ToString() + "-" + oMultiDose.UpperDose.ToString() + " " + oMultiDose.DoseUOM.DisplayText;
                }
                else {
                    if (oMultiDose.DoseUOM != null)
                        oTextBlk.Text = oMultiDose.LowerDose.ToString() + oMultiDose.DoseUOM.DisplayText;
                }
                cntControl.Content = oTextBlk;
            }
            return cntControl;
        }
        public ConvertBack(value: Object, targetType: Type, parameter: Object, culture: CultureInfo): Object {
            return value;
        }
    }
    */
export class LineDisplayHelper {
  static lnDisFilter: ObservableCollection<LineDisplayConfigurations>;
  static lnDisFilterOther: ObservableCollection<LineDisplayConfigurations>;
  constructor() {
    if (
      MedicationCommonProfileData.MedLineDisplay != null &&
      MedicationCommonProfileData.MedLineDisplay.objLineDisConfig != null
    ) {
      let lnDis: ObservableCollection<LineDisplayConfigurations> =
        MedicationCommonProfileData.MedLineDisplay.objLineDisConfig;
      let PRESITEM = lnDis
        .Where(
          (LineDisplayElement) =>
            LineDisplayElement.IsSelected == 1 &&
            String.Compare(
              LineDisplayElement.ColCode,
              'CC_MLDPRESITEM',
              StringComparison.OrdinalIgnoreCase
            ) == 0
        )
        .Select((LineDisplayElement) => LineDisplayElement);
      let OTHINFO = lnDis
        .Where(
          (LineDisplayElement) =>
            LineDisplayElement.IsSelected == 1 &&
            String.Compare(
              LineDisplayElement.ColCode,
              'CC_MLDOTHINFO',
              StringComparison.OrdinalIgnoreCase
            ) == 0
        )
        .Select((LineDisplayElement) => LineDisplayElement);
      LineDisplayHelper.lnDisFilter =
        new ObservableCollection<LineDisplayConfigurations>(PRESITEM);
      LineDisplayHelper.lnDisFilterOther =
        new ObservableCollection<LineDisplayConfigurations>(OTHINFO);
    }
  }
  public static SupplylineitemInit(): void {
    if (
      MedicationCommonProfileData.MedLineDisplay != null &&
      MedicationCommonProfileData.MedLineDisplay.objLineDisConfig != null
    ) {
      let lnDis: ObservableCollection<LineDisplayConfigurations> =
        MedicationCommonProfileData.MedLineDisplay.objLineDisConfig;
      let PRESITEM = lnDis
        .Where(
          (LineDisplayElement) =>
            LineDisplayElement.IsSelected == 1 &&
            String.Compare(
              LineDisplayElement.ColCode,
              'CC_MLDPRESITEM',
              StringComparison.OrdinalIgnoreCase
            ) == 0
        )
        .Select((LineDisplayElement) => LineDisplayElement);
      let OTHINFO = lnDis
        .Where(
          (LineDisplayElement) =>
            LineDisplayElement.IsSelected == 1 &&
            String.Compare(
              LineDisplayElement.ColCode,
              'CC_MLDOTHINFO',
              StringComparison.OrdinalIgnoreCase
            ) == 0
        )
        .Select((LineDisplayElement) => LineDisplayElement);
      LineDisplayHelper.lnDisFilter =
        new ObservableCollection<LineDisplayConfigurations>(PRESITEM);
      LineDisplayHelper.lnDisFilterOther =
        new ObservableCollection<LineDisplayConfigurations>(OTHINFO);
    }
  }
  public static GetPrescriptionItem(
    objResponse: PrescriptionLineItemVM,
    colWidth: number,
    sFromPage: string,
    out1: (tbToolTip: TextBlock) => void,
    isGPConnectItem: boolean = false
  ): iLabel {
    let rtbLineDisplay: iLabel = ObjectHelper.CreateObject(new iLabel(), {
      BorderBrush: null,      
      Background: new SolidColorBrush(Colors.Transparent),
      BorderThickness: new Thickness(0),
      IsWordwrap: true,
      Cursor: Cursors.Arrow,
    });
    let txbToolTip: TextBlock = null;
    let tbToolTip: TextBlock = null;
    // Revisit Required
    if (
      MedicationCommonProfileData.MedLineDisplay != null &&
      MedicationCommonProfileData.MedLineDisplay.objLineDisConfig != null
    ) {
      let lnDis: ObservableCollection<LineDisplayConfigurations> =
        MedicationCommonProfileData.MedLineDisplay.objLineDisConfig;
      let PRESITEM = lnDis
        .Where(
          (LineDisplayElement) =>
            LineDisplayElement.IsSelected == 1 &&
            String.Compare(
              LineDisplayElement.ColCode,
              'CC_MLDPRESITEM',
              StringComparison.OrdinalIgnoreCase
            ) == 0
        )
        .Select((LineDisplayElement) => LineDisplayElement);
      let OTHINFO = lnDis
        .Where(
          (LineDisplayElement) =>
            LineDisplayElement.IsSelected == 1 &&
            String.Compare(
              LineDisplayElement.ColCode,
              'CC_MLDOTHINFO',
              StringComparison.OrdinalIgnoreCase
            ) == 0
        )
        .Select((LineDisplayElement) => LineDisplayElement);
      LineDisplayHelper.lnDisFilter =
        new ObservableCollection<LineDisplayConfigurations>(PRESITEM);
      LineDisplayHelper.lnDisFilterOther =
        new ObservableCollection<LineDisplayConfigurations>(OTHINFO);
    }

    if (objResponse != null && LineDisplayHelper.lnDisFilter != null) {
      if (!objResponse.IsOther) {
        let tmpStopDate: string;
        tmpStopDate = null;
        let PresTypeIP: string =
          MedicationPrescriptionHelper.GetPrescriptionType(
            PrescriptionTypes.Inpatient
          );
        let temp: string;
        if (
          String.Compare(
            objResponse.PrescriptionItemStatus,
            CConstants.CANCELLED
          ) == 0
        )
          rtbLineDisplay.IsStrike = true;
        if (objResponse.FormViewerDetails.BasicDetails.StartDTTM.Year > 1753) {
          if (
            String.Compare(
              objResponse.PrescriptionType,
              PresTypeIP,
              StringComparison.InvariantCultureIgnoreCase
            ) == 0 ||
            String.Compare(
              objResponse.PrescriptionTypeInPatientContext,
              PrescriptionTypes.Inpatient,
              StringComparison.InvariantCultureIgnoreCase
            ) == 0
          ) {
            objResponse.FormViewerDetails.BasicDetails.StartDTTM =
              Convert.ToDateTime(
                objResponse.FormViewerDetails.BasicDetails.StartDTTM.ToString(
                  CConstants.LongDateListFormat
                )
              );
          } else {
            objResponse.FormViewerDetails.BasicDetails.StartDTTM =
              Convert.ToDateTime(
                objResponse.FormViewerDetails.BasicDetails.StartDTTM.ToString(
                  CConstants.LongDateFormat
                )
              );
          }
        }
        if (objResponse.FormViewerDetails.BasicDetails.EndDTTM != null)
          tmpStopDate =
            objResponse.FormViewerDetails.BasicDetails.EndDTTM.ToString(
              CConstants.LongDateFormat
            );
        if (
          !String.IsNullOrEmpty(objResponse.PrescriptionType) &&
          CommonBB.IsConceptCodeExists(
            objResponse.PrescriptionType,
            MedicationCommonConceptCodeData.ConceptCodes,
            (o1) => {
              temp = o1;
            }
          ) != false
        )
          objResponse.PrescriptionType = temp;
        if (
          objResponse.FormViewerDetails.BasicDetails.Site != null &&
          !String.IsNullOrEmpty(
            objResponse.FormViewerDetails.BasicDetails.Site.DisplayText
          ) &&
          CommonBB.IsConceptCodeExists(
            objResponse.FormViewerDetails.BasicDetails.Site.DisplayText,
            MedicationCommonConceptCodeData.ConceptCodes,
            (o1) => {
              temp = o1;
            }
          ) != false
        )
          objResponse.FormViewerDetails.BasicDetails.Site.DisplayText = temp;
        if (
          objResponse.FormViewerDetails.BasicDetails.TreatmentToContinue !=
            null &&
          objResponse.FormViewerDetails.BasicDetails.TreatmentToContinue
            .Tag instanceof ManagePrescSer.ObjectInfo
        ) {
          if (
            CommonBB.IsConceptCodeExists(
              (<ManagePrescSer.ObjectInfo>(
                objResponse.FormViewerDetails.BasicDetails.TreatmentToContinue
                  .Tag
              )).Code,
              MedicationCommonConceptCodeData.ConceptCodes,
              (o1) => {
                temp = o1;
              }
            ) != false
          ) {
            objResponse.FormViewerDetails.BasicDetails.TreatmentToContinue.DisplayText =
              temp;
          }
        } else if (
          objResponse.FormViewerDetails.BasicDetails.TreatmentToContinue !=
            null &&
          objResponse.FormViewerDetails.BasicDetails.TreatmentToContinue
            .Tag instanceof IPPManagePrescSer.ObjectInfo
        ) {
          if (
            CommonBB.IsConceptCodeExists(
              (<IPPManagePrescSer.ObjectInfo>(
                objResponse.FormViewerDetails.BasicDetails.TreatmentToContinue
                  .Tag
              )).Code,
              MedicationCommonConceptCodeData.ConceptCodes,
              (o1) => {
                temp = o1;
              }
            ) != false
          ) {
            objResponse.FormViewerDetails.BasicDetails.TreatmentToContinue.DisplayText =
              temp;
          }
        } else if (
          objResponse.FormViewerDetails.BasicDetails.TreatmentToContinue !=
            null &&
          objResponse.FormViewerDetails.BasicDetails.TreatmentToContinue.Tag !=
            null &&
          !String.IsNullOrEmpty(
            (<IPPManagePrescSer.ObjectInfo>(
              objResponse.FormViewerDetails.BasicDetails.TreatmentToContinue.Tag
            )).Code
          ) &&
          CommonBB.IsConceptCodeExists(
            (<IPPManagePrescSer.ObjectInfo>(
              objResponse.FormViewerDetails.BasicDetails.TreatmentToContinue.Tag
            )).Code,
            MedicationCommonConceptCodeData.ViewConceptCodes,
            (o1) => {
              temp = o1;
            }
          ) != false
        )
          objResponse.FormViewerDetails.BasicDetails.TreatmentToContinue.DisplayText =
            temp;
        if (
          objResponse.FormViewerDetails.BasicDetails.MedClerkModifyReason !=
            null &&
          objResponse.FormViewerDetails.BasicDetails.MedClerkModifyReason.Tag !=
            null &&
          !String.IsNullOrEmpty(
            (<IPPManagePrescSer.ObjectInfo>(
              objResponse.FormViewerDetails.BasicDetails.MedClerkModifyReason
                .Tag
            )).Code
          ) &&
          CommonBB.IsConceptCodeExists(
            (<IPPManagePrescSer.ObjectInfo>(
              objResponse.FormViewerDetails.BasicDetails.MedClerkModifyReason
                .Tag
            )).Code,
            MedicationCommonConceptCodeData.ConceptCodes,
            (o1) => {
              temp = o1;
            }
          ) != false
        )
          objResponse.FormViewerDetails.BasicDetails.MedClerkModifyReason.DisplayText =
            temp;
        LineDisplayHelper.SetLineItemContent(
          objResponse,
          'CC_MLDPRESITEM',
          colWidth,
          rtbLineDisplay,
          (o) => { txbToolTip = o; }
          //txbToolTip
        );
        tbToolTip = txbToolTip;
        if (
          objResponse.IsCriticalMed &&
          (String.Equals(
            objResponse.PrescriptionType,
            PrescriptionTypes.Foradministration,
            StringComparison.InvariantCultureIgnoreCase
          ) ||
            String.Equals(
              objResponse.PrescriptionType,
              PrescriptionTypes.Inpatient,
              StringComparison.InvariantCultureIgnoreCase
            ))
        ) {
          let img1: Image = new Image();
          img1.Stretch = Stretch.None;
          img1.Source = new BitmapImage(
            new Uri(
              MedImage.GetPath(MedImages.CriticalMeds),
              UriKind.RelativeOrAbsolute
            )
          );
          ToolTipService.SetToolTip(
            img1,
            ObjectHelper.CreateObject(new iLabel(), {
              Text: 'This drug has been configured as a critical medication by your organisation',
              MaxWidth: 'auto',
              IsWordwrap: true,
            })
          );
          rtbLineDisplay.InLines.Add(
            ObjectHelper.CreateObject(new iLabelInLineElement(), {
              InLine: img1,
            })
          );
        }
        if (
          String.Compare(
            sFromPage,
            CConstants.SecondaryScreen,
            StringComparison.CurrentCultureIgnoreCase
          ) != 0
        ) {
          if (
            objResponse.FormViewerDetails.BasicDetails.DrugProperties != null &&
            objResponse.FormViewerDetails.BasicDetails.DrugProperties.Count >
              0 &&
            objResponse.FormViewerDetails.BasicDetails.DrugProperties[0] !=
              null &&
            objResponse.FormViewerDetails.BasicDetails.DrugProperties[0]
              .DrugPropertyCode != null
          ) {
            let sTooltip: string[] = null;
            if (
              !String.IsNullOrEmpty(
                objResponse.FormViewerDetails.BasicDetails.MCIItemDisplay
              )
            ) {
              sTooltip =
                objResponse.FormViewerDetails.BasicDetails.MCIItemDisplay.Split(
                  '^'
                );
            }
            if (
              (String.Compare(
                objResponse.FormViewerDetails.BasicDetails.Itemsubtype,
                CConstants.SUBTYPE,
                StringComparison.OrdinalIgnoreCase
              ) == 0 &&
                sTooltip != null &&
                sTooltip.length > 5 &&
                objResponse.FormViewerDetails.BasicDetails.MCILoerenzoID ==
                  CConstants.ADHOC_ITEM_LORENZOID) ||
              (String.Compare(
                objResponse.FormViewerDetails.BasicDetails.Itemsubtype,
                CConstants.SUBTYPE,
                StringComparison.OrdinalIgnoreCase
              ) == 0 &&
                objResponse.FormViewerDetails.BasicDetails.MCILoerenzoID !=
                  CConstants.ADHOC_ITEM_LORENZOID) ||
              String.Compare(
                objResponse.FormViewerDetails.BasicDetails.Itemsubtype,
                CConstants.SUBTYPE,
                StringComparison.OrdinalIgnoreCase
              ) != 0 ||
              String.IsNullOrEmpty(
                objResponse.FormViewerDetails.BasicDetails.Itemsubtype
              )
            )
              LineDisplayHelper.SetDrugProperty(
                objResponse.FormViewerDetails.BasicDetails.DrugProperties,
                objResponse.FormViewerDetails.BasicDetails.IdentifyingType,
                rtbLineDisplay,
                objResponse.FormViewerDetails.BasicDetails.Itemsubtype
              );
          }
        }
        if (
          objResponse.IsParacetamolIngredient &&
          objResponse.ParacetamolAdministeredCount > 3
        ) {
          let img1: Image = new Image();
          img1.Stretch = Stretch.None;
          img1.Source = new BitmapImage(
            new Uri(
              MedImage.GetPath(MedImages.CumulativeWarningIcon),
              UriKind.RelativeOrAbsolute
            )
          );
          //Bug 55367 - CumulativeIcon have lengthy tooltip, so not need this class (Commented line 1925)
          // img1.AltImageTooltip = 'newMedlinClass';
          ToolTipService.SetToolTip(
            img1,
            ObjectHelper.CreateObject(new iLabel(), {
              Text: Resource.prescribedrugs.CumulativeIcon_Tooltip,
              MaxWidth: 250,
              IsWordwrap: true,
            })
          );
          rtbLineDisplay.InLines.Add(
            ObjectHelper.CreateObject(new iLabelInLineElement(), {
              InLine: img1,
            })
          );
        }
        if (
          String.Equals(
            sFromPage,
            CConstants.Ordersetmezzanine,
            StringComparison.CurrentCultureIgnoreCase
          ) &&
          objResponse != null &&
          objResponse.FormViewerDetails != null &&
          objResponse.FormViewerDetails.BasicDetails != null &&
          !String.IsNullOrEmpty(
            objResponse.FormViewerDetails.BasicDetails.PrescribingComments
          )
        ) {
          let img2: iImage = new iImage();
          img2.Margin = new Thickness(2, 0, 2, 0);
          img2.MaxWidth = '16';
          img2.MaxHeight = '16';
          img2.isToolTip = true;
          img2.Source = new BitmapImage(
            new Uri(
              MedImage.GetPath(MedImages.NoteIcon),
              UriKind.RelativeOrAbsolute
            )
          );
          img2.AltImageTooltip = 'newMedlinClass';
          img2.TextData =
            objResponse.FormViewerDetails.BasicDetails.PrescribingComments;
          img2.ToolTip =
            objResponse.FormViewerDetails.BasicDetails.PrescribingComments_ToolTip;
          rtbLineDisplay.InLines.Add(
            ObjectHelper.CreateObject(new iLabelInLineElement(), {
              InLine: img2,
            })
          );
        }
      } else {
        let txbOtherText: TextBlock = new TextBlock();
        txbOtherText.FontFamily = new FontFamily('Verdana');
        txbOtherText.Text = 'Other...';
        txbToolTip = new TextBlock();
        txbToolTip.Text = 'Other...';
        rtbLineDisplay.InLines.Add(
          ObjectHelper.CreateObject(new iLabelInLineElement(), {
            InLine: txbOtherText,
          })
        );
      }
    }
    rtbLineDisplay.SetValue(ToolTipService.ToolTipProperty, txbToolTip);
    out1(tbToolTip);
    return rtbLineDisplay;
  }
  public static GetOtherInformation(
    objResponse: PrescriptionLineItemVM,
    colWidth: number
  ): iLabel {
    let rtbOtherLineDisplay: iLabel = ObjectHelper.CreateObject(new iLabel(), {
      BorderBrush: null,      
      Background: new SolidColorBrush(Colors.Transparent),
      BorderThickness: new Thickness(0),
      IsWordwrap: true,
      Cursor: Cursors.Arrow,
    });
    let txbToolTip: TextBlock = null;
    // Revisit Required
    if (
      MedicationCommonProfileData.MedLineDisplay != null &&
      MedicationCommonProfileData.MedLineDisplay.objLineDisConfig != null
    ) {
      let lnDis: ObservableCollection<LineDisplayConfigurations> =
        MedicationCommonProfileData.MedLineDisplay.objLineDisConfig;
      let PRESITEM = lnDis
        .Where(
          (LineDisplayElement) =>
            LineDisplayElement.IsSelected == 1 &&
            String.Compare(
              LineDisplayElement.ColCode,
              'CC_MLDPRESITEM',
              StringComparison.OrdinalIgnoreCase
            ) == 0
        )
        .Select((LineDisplayElement) => LineDisplayElement);
      let OTHINFO = lnDis
        .Where(
          (LineDisplayElement) =>
            LineDisplayElement.IsSelected == 1 &&
            String.Compare(
              LineDisplayElement.ColCode,
              'CC_MLDOTHINFO',
              StringComparison.OrdinalIgnoreCase
            ) == 0
        )
        .Select((LineDisplayElement) => LineDisplayElement);
      LineDisplayHelper.lnDisFilter =
        new ObservableCollection<LineDisplayConfigurations>(PRESITEM);
      LineDisplayHelper.lnDisFilterOther =
        new ObservableCollection<LineDisplayConfigurations>(OTHINFO);
    }

    if (objResponse != null && LineDisplayHelper.lnDisFilterOther != null) {
      let tmpStopDate: string;
      tmpStopDate = null;
      if (
        objResponse != null &&
        objResponse.FormViewerDetails != null &&
        objResponse.FormViewerDetails.BasicDetails != null
      ) {
        let temp: string;
        let PresTypeIP: string =
          MedicationPrescriptionHelper.GetPrescriptionType(
            PrescriptionTypes.Inpatient
          );
        if (
          objResponse.FormViewerDetails.BasicDetails.StartDTTM.ToString() !=
          '01/01/0001 00:00:00'
        ) {
          if (
            String.Compare(
              objResponse.PrescriptionType,
              PresTypeIP,
              StringComparison.InvariantCultureIgnoreCase
            ) == 0 ||
            String.Compare(
              PatientContext.PrescriptionType,
              PrescriptionTypes.Inpatient,
              StringComparison.InvariantCultureIgnoreCase
            ) == 0
          ) {
            objResponse.FormViewerDetails.BasicDetails.StartDTTM =
              Convert.ToDateTime(
                objResponse.FormViewerDetails.BasicDetails.StartDTTM.ToString(
                  CConstants.LongDateListFormat
                )
              );
          } else
            objResponse.FormViewerDetails.BasicDetails.StartDTTM =
              Convert.ToDateTime(
                objResponse.FormViewerDetails.BasicDetails.StartDTTM.ToString(
                  CConstants.LongDateFormat
                )
              );
        }
        if (objResponse.FormViewerDetails.BasicDetails.EndDTTM != null)
          tmpStopDate =
            objResponse.FormViewerDetails.BasicDetails.EndDTTM.ToString(
              CConstants.LongDateFormat
            );
        if (
          !String.IsNullOrEmpty(objResponse.PrescriptionType) &&
          CommonBB.IsConceptCodeExists(
            objResponse.PrescriptionType,
            MedicationCommonConceptCodeData.ConceptCodes,
            (o1) => {
              temp = o1;
            }
          ) != false
        )
          objResponse.PrescriptionType = temp;
        if (
          objResponse.FormViewerDetails.BasicDetails.Site != null &&
          !String.IsNullOrEmpty(
            objResponse.FormViewerDetails.BasicDetails.Site.DisplayText
          ) &&
          CommonBB.IsConceptCodeExists(
            objResponse.FormViewerDetails.BasicDetails.Site.DisplayText,
            MedicationCommonConceptCodeData.ConceptCodes,
            (o1) => {
              temp = o1;
            }
          ) != false
        )
          objResponse.FormViewerDetails.BasicDetails.Site.DisplayText = temp;
        if (
          objResponse.FormViewerDetails.BasicDetails.TreatmentToContinue !=
            null &&
          objResponse.FormViewerDetails.BasicDetails.TreatmentToContinue
            .Tag instanceof ManagePrescSer.ObjectInfo
        ) {
          if (
            CommonBB.IsConceptCodeExists(
              (<ManagePrescSer.ObjectInfo>(
                objResponse.FormViewerDetails.BasicDetails.TreatmentToContinue
                  .Tag
              )).Code,
              MedicationCommonConceptCodeData.ConceptCodes,
              (o1) => {
                temp = o1;
              }
            ) != false
          ) {
            objResponse.FormViewerDetails.BasicDetails.TreatmentToContinue.DisplayText =
              temp;
          }
        } else if (
          objResponse.FormViewerDetails.BasicDetails.TreatmentToContinue !=
            null &&
          objResponse.FormViewerDetails.BasicDetails.TreatmentToContinue
            .Tag instanceof IPPManagePrescSer.ObjectInfo
        ) {
          if (
            CommonBB.IsConceptCodeExists(
              (<IPPManagePrescSer.ObjectInfo>(
                objResponse.FormViewerDetails.BasicDetails.TreatmentToContinue
                  .Tag
              )).Code,
              MedicationCommonConceptCodeData.ConceptCodes,
              (o1) => {
                temp = o1;
              }
            ) != false
          ) {
            objResponse.FormViewerDetails.BasicDetails.TreatmentToContinue.DisplayText =
              temp;
          }
        } else if (
          objResponse.FormViewerDetails.BasicDetails.TreatmentToContinue !=
            null &&
          objResponse.FormViewerDetails.BasicDetails.TreatmentToContinue.Tag !=
            null &&
          !String.IsNullOrEmpty(
            (<IPPManagePrescSer.ObjectInfo>(
              objResponse.FormViewerDetails.BasicDetails.TreatmentToContinue.Tag
            )).Code
          ) &&
          CommonBB.IsConceptCodeExists(
            (<IPPManagePrescSer.ObjectInfo>(
              objResponse.FormViewerDetails.BasicDetails.TreatmentToContinue.Tag
            )).Code,
            MedicationCommonConceptCodeData.ViewConceptCodes,
            (o1) => {
              temp = o1;
            }
          ) != false
        )
          objResponse.FormViewerDetails.BasicDetails.TreatmentToContinue.DisplayText =
            temp;
        if (
          objResponse.FormViewerDetails.BasicDetails.MedClerkModifyReason !=
            null &&
          objResponse.FormViewerDetails.BasicDetails.MedClerkModifyReason.Tag !=
            null &&
          !String.IsNullOrEmpty(
            (<IPPManagePrescSer.ObjectInfo>(
              objResponse.FormViewerDetails.BasicDetails.MedClerkModifyReason
                .Tag
            )).Code
          ) &&
          CommonBB.IsConceptCodeExists(
            (<IPPManagePrescSer.ObjectInfo>(
              objResponse.FormViewerDetails.BasicDetails.MedClerkModifyReason
                .Tag
            )).Code,
            MedicationCommonConceptCodeData.ConceptCodes,
            (o1) => {
              temp = o1;
            }
          ) != false
        )
          objResponse.FormViewerDetails.BasicDetails.MedClerkModifyReason.DisplayText =
            temp;
        LineDisplayHelper.SetLineItemContent(
          objResponse,
          'CC_MLDOTHINFO',
          colWidth,
          rtbOtherLineDisplay,
          (o) => { txbToolTip = o; }
        );        
      }
    }
    rtbOtherLineDisplay.SetValue(ToolTipService.ToolTipProperty, txbToolTip);
    return rtbOtherLineDisplay;
  }
  private static SetLineItemContent(
    oPrescription: PrescriptionLineItemVM,
    sType: string,
    colWidth: number,
    paraLineDisplay: iLabel,
    out: (tbLineDisplay: TextBlock) => void
    //tbLineDisplay: TextBlock
  ): void {
    let tbLineDisplay = ObjectHelper.CreateObject(new TextBlock(), {
      TextWrapping: TextWrapping.Wrap,
      MaxWidth: 220,
    });
    let oMLD: CMedicationLineDisplayData = null;
    if (
      String.Compare(
        sType,
        'CC_MLDPRESITEM',
        StringComparison.OrdinalIgnoreCase
      ) == 0
    ) {
      oMLD = new CMedicationLineDisplayData();
      oMLD.sColorCode = MedicationCommonProfileData.MedLineDisplay.sColorCode;
      oMLD.objLineDisConfig = LineDisplayHelper.lnDisFilter;
    } else if (
      String.Compare(
        sType,
        'CC_MLDOTHINFO',
        StringComparison.OrdinalIgnoreCase
      ) == 0
    ) {
      oMLD = new CMedicationLineDisplayData();
      oMLD.sColorCode = MedicationCommonProfileData.MedLineDisplay.sColorCode;
      if (
        oPrescription != null &&
        (oPrescription.IsMCIChildcomponent || oPrescription.IsFluid) &&
        oPrescription.FormViewerDetails != null &&
        oPrescription.FormViewerDetails.BasicDetails != null &&
        ((oPrescription.FormViewerDetails.BasicDetails.SupplyInstructionText !=
          null &&
          !String.IsNullOrEmpty(
            oPrescription.FormViewerDetails.BasicDetails.SupplyInstructionText
              .Value
          )) ||
          !String.IsNullOrEmpty(
            oPrescription.FormViewerDetails.BasicDetails.SupplyComments
          ) ||
          oPrescription.IsProdAvailForChild) &&
        LineDisplayHelper.lnDisFilterOther
          .Where((c) =>
            String.Equals(
              c.FieldCode,
              'CC_SUPINS_ICO',
              StringComparison.InvariantCultureIgnoreCase
            )
          )
          .Count() == 0
      ) {
        oMLD.objLineDisConfig =
          new ObservableCollection<LineDisplayConfigurations>();
        oMLD.objLineDisConfig.Add(
          ObjectHelper.CreateObject(new LineDisplayConfigurations(), {
            CaseCode: 'CC_MLDLOWER',
            ColCode: 'CC_MLDOTHINFO',
            DisPosCode: 'CC_MLDROWONE',
            FieldCode: 'CC_SUPINS_ICO',
            FontStyleCode: 'CC_MLDBOLD',
            IsSelected: 1,
            Order: '1',
            Qualifier: '',
          })
        );
      } else {
        oMLD.objLineDisConfig = LineDisplayHelper.lnDisFilterOther;
      }
    }
    let temp: string = String.Empty;
    if (
      oPrescription != null &&
      oMLD != null &&
      oMLD.objLineDisConfig != null
    ) {
      let sTmpDate: string = String.Empty;
      let sImagePath: string = String.Empty;
      let sImageToolTip: string = String.Empty;
      // let iCnt: number = 0;
      let TCnt = oMLD.objLineDisConfig.Count;
      if (
        String.Compare(
          sType,
          'CC_MLDOTHINFO',
          StringComparison.OrdinalIgnoreCase
        ) == 0
      ) {
        if (
          !oPrescription.IsDoseCalcPerformed &&
          oPrescription.IsDoseCalcInfo &&
          String.Equals(
            sType,
            'CC_MLDOTHINFO',
            StringComparison.OrdinalIgnoreCase
          )
        ) {
          let img1: Image = new Image();
          img1.Name = 'Dosecalrb';
          img1.Stretch = Stretch.None;
          img1.Tag = oPrescription;
          img1.Source = new BitmapImage(
            new Uri(
              MedImage.GetPath(MedImages.DoseCalculator),
              UriKind.RelativeOrAbsolute
            )
          );
          ToolTipService.SetToolTip(
            img1,
            ObjectHelper.CreateObject(new iLabel(), {
              Text: 'Click to view dose calculation details',
              MaxWidth: 250,
              IsWordwrap: true,
            })
          );
          paraLineDisplay.InLines.Add(
            ObjectHelper.CreateObject(new iLabelInLineElement(), {
              InLine: img1,
            })
          );
          //oPrescription.SubscribeClickEvent(img1);
          img1.MouseLeftButtonUp = (s,e) => { oPrescription.imgSteppedVariable_MouseLeftButtonUp(s,e)}
        } else if (
          MedicationCommonProfileData.PrescribeConfig != null &&
          MedicationCommonProfileData.PrescribeConfig.EnableDoseCalc &&
          String.Equals(
            sType,
            'CC_MLDOTHINFO',
            StringComparison.InvariantCultureIgnoreCase
          ) &&
          (oPrescription.FormViewerDetails.BasicDetails.isDoseCalcExist ||
            oPrescription.IsDoseCalcPerformed)
        ) {
          let img1: Image = new Image();
          img1.Name = Resource.DoseCalculator.DoseCalci_Tooltip;
          img1.Tag = oPrescription;
          img1.Margin = new Thickness(2, 0, 2, 0);
          img1.Stretch = Stretch.None;
          if (!PatientContext.IsFromEPR) {
            //oPrescription.SubscribeClickEvent(img1);
            img1.MouseLeftButtonUp = (s,e) => { oPrescription.imgSteppedVariable_MouseLeftButtonUp(s,e)}
            ToolTipService.SetToolTip(
              img1,
              ObjectHelper.CreateObject(new iLabel(), {
                Text: Resource.DoseCalculator.DoseCalci_Tooltip,
                IsWordwrap: true,
                MaxWidth: 250,
              })
            );
          } else {
            ToolTipService.SetToolTip(
              img1,
              ObjectHelper.CreateObject(new iLabel(), {
                Text: String.Empty,
                MaxWidth: 1,
              })
            );
          }
          if (
            String.Equals(
              oPrescription.FormViewerDetails.BasicDetails.DoseCalcExist,
              '2'
            ) &&
            MedicationCommonProfileData.PrescribeConfig.HeightWeightChangeAlert
          ) {
            img1.Source = new BitmapImage(
              new Uri(
                MedImage.GetPath(MedImages.DoseCalculatorWithAlert),
                UriKind.RelativeOrAbsolute
              )
            );
          } else {
            img1.Source = new BitmapImage(
              new Uri(
                MedImage.GetPath(MedImages.DoseCalculator),
                UriKind.RelativeOrAbsolute
              )
            );
          }
          paraLineDisplay.InLines.Add(
            ObjectHelper.CreateObject(new iLabelInLineElement(), {
              InLine: img1,
            })
          );
        }
        let RequestImagePath: string =
          LineDisplayHelper.GetReqeustUrgencyIcon(oPrescription);
        if (!String.IsNullOrEmpty(RequestImagePath)) {
          let sTip: string = String.Empty;
          let IsFluidOrMCI: boolean = false;
          if (
            String.Equals(
              ContextInfo.MenuCode,
              CConstants.ClinicallyVerifyMenuCode,
              StringComparison.InvariantCultureIgnoreCase
            ) &&
            oPrescription != null &&
            oPrescription.FormViewerDetails != null &&
            oPrescription.FormViewerDetails.BasicDetails != null &&
            ((oPrescription.FormViewerDetails.BasicDetails.InfusionDetails !=
              null &&
              oPrescription.FormViewerDetails.BasicDetails.InfusionDetails
                .FluidSelectvalue != null &&
              !String.IsNullOrEmpty(
                oPrescription.FormViewerDetails.BasicDetails.InfusionDetails
                  .FluidSelectvalue.Value
              )) ||
              oPrescription.FormViewerDetails.BasicDetails.Itemsubtype ==
                'CC_MULCMPNTITM')
          ) {
            IsFluidOrMCI = true;
          }
          if (
            String.Equals(
              ContextInfo.MenuCode,
              CConstants.TechnicallyValidateMenuCode,
              StringComparison.InvariantCultureIgnoreCase
            )
          ) {
            IsFluidOrMCI = false;
          }
          if (!IsFluidOrMCI) {
            let lstUrgencyText: string =
              !String.IsNullOrEmpty(
                oPrescription.FormViewerDetails.BasicDetails.RequestUrgency
              ) &&
              RequestUrgency.ConceptCodes != null &&
              RequestUrgency.ConceptCodes.Count() > 0
                ? RequestUrgency.ConceptCodes[
                    oPrescription.FormViewerDetails.BasicDetails.RequestUrgency
                  ]
                : String.Empty;
            sTip += !String.IsNullOrEmpty(
              oPrescription.FormViewerDetails.BasicDetails.RequestedBy
            )
              ? CConstants.RequestedBy +
                oPrescription.FormViewerDetails.BasicDetails.RequestedBy
              : String.Empty;
            sTip +=
              oPrescription.FormViewerDetails.BasicDetails.RequestedDTTM !=
              DateTime.MinValue
                ? Environment.NewLine +
                  CConstants.On +
                  oPrescription.FormViewerDetails.BasicDetails.RequestedDTTM.ToString(
                    CConstants.LongDateWithoutSecs
                  )
                : String.Empty;
            sTip +=
              lstUrgencyText != null &&
              !String.IsNullOrEmpty(
                oPrescription.FormViewerDetails.BasicDetails.RequestUrgency
              )
                ? Environment.NewLine + CConstants.Urgency + lstUrgencyText
                : String.Empty;
            sTip += !String.IsNullOrEmpty(
              oPrescription.FormViewerDetails.BasicDetails.RequestedComments
            )
              ? Environment.NewLine +
                CConstants.Requestcomments +
                oPrescription.FormViewerDetails.BasicDetails.RequestedComments
              : String.Empty;
          } else {
            sTip += Resource.DrugDetails.ReqMedIconToolTip;
          }
          let img1: Image = new Image();
          img1.Margin = new Thickness(2, 0, 2, 0);
          img1.Stretch = Stretch.None;
          img1.Source = new BitmapImage(
            new Uri(
              MedImage.GetPath(RequestImagePath),
              UriKind.RelativeOrAbsolute
            )
          );
          ToolTipService.SetToolTip(
            img1,
            ObjectHelper.CreateObject(new iLabel(), {
              Text: sTip,
              IsWordwrap: true,
              MaxWidth: 250,
            })
          );
          paraLineDisplay.InLines.Add(
            ObjectHelper.CreateObject(new iLabelInLineElement(), {
              InLine: img1,
            })
          );
        }
      }
      for (let iCnt = 0; iCnt < TCnt; iCnt++) {
        let isRowSlectd: number = oMLD.objLineDisConfig[iCnt].IsSelected;
        if (String.Compare(sType, oMLD.objLineDisConfig[iCnt].ColCode) == 0) {
          switch (oMLD.objLineDisConfig[iCnt].FieldCode) {
            case 'CC_DRUGNAME':
              if (isRowSlectd == 1) {
                if (
                  oPrescription.FormViewerDetails.BasicDetails.Itemsubtype !=
                    null &&
                  String.Compare(
                    oPrescription.FormViewerDetails.BasicDetails.Itemsubtype,
                    CConstants.SUBTYPE,
                    StringComparison.OrdinalIgnoreCase
                  ) == 0
                ) {
                  let sTooltip: string[] = null;
                  let sMCTooltips: string[] = null;
                  let MCtooltip: string = String.Empty;
                  let nLength: number = 0;
                  let sTip: StringBuilder = new StringBuilder();
                  if (
                    !String.IsNullOrEmpty(
                      oPrescription.FormViewerDetails.BasicDetails
                        .MCIItemDrugprop
                    ) ||
                    !String.IsNullOrEmpty(
                      oPrescription.FormViewerDetails.BasicDetails
                        .MCIItemDisplay
                    )
                  ) {
                    if (
                      !String.IsNullOrEmpty(
                        oPrescription.FormViewerDetails.BasicDetails
                          .MCIItemDrugprop
                      )
                    ) {
                      sTooltip =
                        oPrescription.FormViewerDetails.BasicDetails.MCIItemDrugprop.Split(
                          '^'
                        );
                      nLength = sTooltip.length;
                      for (let i: number = 0; i < nLength; i++) {
                        sMCTooltips = sTooltip[i].Split('~');
                        sTip.Append(sMCTooltips[0]);
                        sTip.Append(Environment.NewLine);
                      }
                    } else if (
                      !String.IsNullOrEmpty(
                        oPrescription.FormViewerDetails.BasicDetails
                          .MCIItemDisplay
                      )
                    ) {
                      sTooltip =
                        oPrescription.FormViewerDetails.BasicDetails.MCIItemDisplay.Split(
                          '^'
                        );
                      nLength = sTooltip.length;
                      for (let i: number = 0; i < nLength; i++) {
                        sMCTooltips = sTooltip[i].Split('~');
                        sTip.Append(sMCTooltips[0]);
                        sTip.Append(Environment.NewLine);
                      }
                    } else {
                      sTooltip =
                        oPrescription.FormViewerDetails.BasicDetails.MCIItemDisplay.Split(
                          '^'
                        );
                      nLength = sTooltip.length;
                      for (let i: number = 0; i < nLength; i++) {
                        sTip.Append(sTooltip[i]);
                        sTip.Append(Environment.NewLine);
                      }
                    }
                    MCtooltip = sTip.ToString();
                    MCtooltip = MCtooltip.TrimEnd('\n');
                    MCtooltip = MCtooltip.TrimEnd('\r');
                    if (
                      !String.IsNullOrEmpty(
                        oPrescription.FormViewerDetails.BasicDetails
                          .MCILoerenzoID
                      ) &&
                      String.Compare(
                        oPrescription.FormViewerDetails.BasicDetails
                          .MCILoerenzoID,
                        CConstants.ADHOC_ITEM_LORENZOID
                      ) == 0
                    ) {
                      if (sTooltip != null && sTooltip.length > 5) {
                        LineDisplayHelper.SetQualifierAndText(
                          oPrescription.FormViewerDetails.BasicDetails
                            .IdentifyingName,
                          oMLD.objLineDisConfig[iCnt].CaseCode,
                          oMLD.objLineDisConfig[iCnt].FontStyleCode,
                          oMLD.objLineDisConfig[iCnt].Qualifier.Trim(),
                          oMLD.sColorCode,
                          tbLineDisplay,
                          paraLineDisplay
                        );
                      } else {
                        let sTitleHeading: string =
                          oPrescription.FormViewerDetails.BasicDetails
                            .IdentifyingName;
                        for (let i: number = 0; i < nLength; i++) {
                          let Prop: string = String.Empty;
                          if (sMCTooltips != null) {
                            sMCTooltips = sTooltip[i].Split('~');
                            oPrescription.FormViewerDetails.BasicDetails.IdentifyingName =
                              sMCTooltips[0];
                            if (sMCTooltips.length > 1) Prop = sMCTooltips[1];
                          } else {
                            oPrescription.FormViewerDetails.BasicDetails.IdentifyingName =
                              sTooltip[i];
                          }
                          LineDisplayHelper.SetMCQualifierAndText(
                            oPrescription.FormViewerDetails.BasicDetails
                              .IdentifyingName,
                            oPrescription.FormViewerDetails.BasicDetails
                              .Itemsubtype,
                            String.Empty,
                            oMLD.objLineDisConfig[iCnt].CaseCode,
                            oMLD.objLineDisConfig[iCnt].FontStyleCode,
                            oMLD.objLineDisConfig[iCnt].Qualifier.Trim(),
                            oMLD.sColorCode,
                            Prop,
                            tbLineDisplay,
                            paraLineDisplay,
                            i == nLength-1
                          );
                        }
                        oPrescription.FormViewerDetails.BasicDetails.IdentifyingName =
                          sTitleHeading;
                        LineDisplayHelper.SetMCQualifierAndText(
                          oPrescription.FormViewerDetails.BasicDetails
                            .IdentifyingName,
                          oPrescription.FormViewerDetails.BasicDetails
                            .Itemsubtype,
                          MCtooltip,
                          oMLD.objLineDisConfig[iCnt].CaseCode,
                          oMLD.objLineDisConfig[iCnt].FontStyleCode,
                          oMLD.objLineDisConfig[iCnt].Qualifier.Trim(),
                          oMLD.sColorCode,
                          String.Empty,
                          tbLineDisplay,
                          paraLineDisplay,
                          true
                        );
                      }
                    } else {
                      LineDisplayHelper.SetQualifierAndText(
                        oPrescription.FormViewerDetails.BasicDetails
                          .IdentifyingName,
                        oMLD.objLineDisConfig[iCnt].CaseCode,
                        oMLD.objLineDisConfig[iCnt].FontStyleCode,
                        oMLD.objLineDisConfig[iCnt].Qualifier.Trim(),
                        oMLD.sColorCode,
                        tbLineDisplay,
                        paraLineDisplay
                      );
                    }
                    if (
                      oPrescription != null &&
                      oPrescription.FormViewerDetails != null &&
                      oPrescription.FormViewerDetails.BasicDetails != null &&
                      !String.IsNullOrEmpty(
                        oPrescription.FormViewerDetails.BasicDetails.Itemsubtype
                      ) &&
                      String.Equals(
                        oPrescription.FormViewerDetails.BasicDetails
                          .Itemsubtype,
                        DrugItemSubTypeCode.MULTI_COMPONENT,
                        StringComparison.CurrentCultureIgnoreCase
                      )
                    ) {
                      let MCItooltip: string =
                        'Select to view multi component item details';
                      let img1: Image = new Image();
                      img1.Name = 'MultiComponent';
                      img1.Margin = new Thickness(2, 0, 2, 0);
                      img1.Stretch = Stretch.None;
                      img1.Source = new BitmapImage(
                        new Uri(
                          MedImage.GetPath(MedImages.ImgMltcmpnt),
                          UriKind.RelativeOrAbsolute
                        )
                      );
                      img1.Tag = oPrescription;
                      //oPrescription.SubscribeClickEvent(img1);
                      img1.MouseLeftButtonUp = (s,e) => { oPrescription.imgSteppedVariable_MouseLeftButtonUp(s,e)}
                      ToolTipService.SetToolTip(
                        img1,
                        ObjectHelper.CreateObject(new iLabel(), {
                          Text: MCItooltip,
                          IsWordwrap: true,
                          MaxWidth: 275,
                        })
                      );
                      paraLineDisplay.InLines.Add(
                        ObjectHelper.CreateObject(new iLabelInLineElement(), {
                          InLine: img1,
                        })
                      );
                    } else {
                      let img1: Image = new Image();
                      img1.Margin = new Thickness(2, 0, 2, 0);
                      img1.Stretch = Stretch.None;
                      img1.Source = new BitmapImage(
                        new Uri(
                          MedImage.GetPath(MedImages.ImgMltcmpnt),
                          UriKind.RelativeOrAbsolute
                        )
                      );
                      ToolTipService.SetToolTip(
                        img1,
                        ObjectHelper.CreateObject(new iLabel(), {
                          Text: MCtooltip,
                          IsWordwrap: true,
                          MaxWidth: 275,
                        })
                      );
                      paraLineDisplay.InLines.Add(
                        ObjectHelper.CreateObject(new iLabelInLineElement(), {
                          InLine: img1,
                        })
                      );
                    }
                  }
                } else {
                  LineDisplayHelper.SetQualifierAndText(
                    oPrescription.FormViewerDetails.BasicDetails
                      .IdentifyingName,
                    oMLD.objLineDisConfig[iCnt].CaseCode,
                    oMLD.objLineDisConfig[iCnt].FontStyleCode,
                    oMLD.objLineDisConfig[iCnt].Qualifier.Trim(),
                    oMLD.sColorCode,
                    tbLineDisplay,
                    paraLineDisplay
                  );
                }
              }
              break;
            case 'DURON':
              if (
                isRowSlectd == 1 &&
                oPrescription != null &&
                oPrescription.FormViewerDetails != null &&
                oPrescription.FormViewerDetails.BasicDetails != null &&
                ((oPrescription.FormViewerDetails.BasicDetails.Duration !=
                  null &&
                  oPrescription.FormViewerDetails.BasicDetails.Duration.ToUpper().Contains(
                    'ONGOING'
                  )) ||
                  (oPrescription.FormViewerDetails.BasicDetails
                    .InfusionDetails != null &&
                    oPrescription.FormViewerDetails.BasicDetails.InfusionDetails
                      .IsOnGoing != null &&
                    String.Compare(
                      oPrescription.FormViewerDetails.BasicDetails
                        .InfusionDetails.IsOnGoing,
                      'Y',
                      StringComparison.CurrentCultureIgnoreCase
                    ) == 0 &&
                    ((oPrescription.FormViewerDetails.BasicDetails
                      .InfusionDetails != null &&
                      oPrescription.FormViewerDetails.BasicDetails
                        .InfusionDetails.InfusionPeriod == 0) ||
                      (oPrescription.FormViewerDetails.BasicDetails != null &&
                        String.IsNullOrEmpty(
                          oPrescription.FormViewerDetails.BasicDetails.Duration
                        )))))
              ) {
                LineDisplayHelper.SetQualifierAndText(
                  'Ongoing',
                  oMLD.objLineDisConfig[iCnt].CaseCode,
                  oMLD.objLineDisConfig[iCnt].FontStyleCode,
                  '-',
                  oMLD.sColorCode,
                  tbLineDisplay,
                  paraLineDisplay
                );
              } else if (
                isRowSlectd == 1 &&
                !String.IsNullOrEmpty(
                  oPrescription.FormViewerDetails.BasicDetails.Duration
                ) &&
                String.Compare(
                  oPrescription.FormViewerDetails.BasicDetails.Duration,
                  '0'
                ) != 0
              ) {
                let sDoseType: string =
                  oPrescription.FormViewerDetails.BasicDetails.DoseType != null
                    ? oPrescription.FormViewerDetails.BasicDetails.DoseType
                        .Value
                    : String.Empty;
                if (
                  !String.Equals(
                    sDoseType,
                    'CC_STEPPEDVARIABLE',
                    StringComparison.CurrentCultureIgnoreCase
                  ) &&
                  !String.Equals(
                    sDoseType,
                    'Stepped/Variable',
                    StringComparison.CurrentCultureIgnoreCase
                  )
                ) {
                  let sDur: string =
                    oPrescription.FormViewerDetails.BasicDetails.Duration;
                  let nDur: number = 0;
                  if (
                    Number.TryParse(
                      oPrescription.FormViewerDetails.BasicDetails.Duration,
                      (o1) => {
                        nDur = o1;
                      }
                    ) &&
                    nDur > 0
                  ) {
                    sDur = nDur.ToString();
                  }
                  if (
                    oPrescription.FormViewerDetails.BasicDetails.DurationUOM !=
                      null &&
                    !String.IsNullOrEmpty(
                      oPrescription.FormViewerDetails.BasicDetails.DurationUOM
                        .DisplayText
                    )
                  ) {
                    sDur +=
                      ' ' +
                      oPrescription.FormViewerDetails.BasicDetails.DurationUOM
                        .DisplayText;
                  }
                  LineDisplayHelper.SetQualifierAndText(
                    sDur,
                    oMLD.objLineDisConfig[iCnt].CaseCode,
                    oMLD.objLineDisConfig[iCnt].FontStyleCode,
                    oMLD.objLineDisConfig[iCnt].Qualifier,
                    oMLD.sColorCode,
                    tbLineDisplay,
                    paraLineDisplay
                  );
                }
              }
              break;
            case 'CC_MED_GRP_STATYP':
              if (
                isRowSlectd == 1 &&
                oPrescription.FormViewerDetails.BasicDetails.StationaryType !=
                  null &&
                !String.IsNullOrEmpty(
                  oPrescription.FormViewerDetails.BasicDetails.StationaryType
                    .DisplayText
                )
              ) {
                LineDisplayHelper.SetQualifierAndText(
                  oPrescription.FormViewerDetails.BasicDetails.StationaryType
                    .DisplayText,
                  oMLD.objLineDisConfig[iCnt].CaseCode,
                  oMLD.objLineDisConfig[iCnt].FontStyleCode,
                  oMLD.objLineDisConfig[iCnt].Qualifier,
                  oMLD.sColorCode,
                  tbLineDisplay,
                  paraLineDisplay
                );
              }
              break;
            case 'ROUTE':
              if (
                isRowSlectd == 1 &&
                oPrescription.FormViewerDetails.BasicDetails.Route != null &&
                !String.IsNullOrEmpty(
                  oPrescription.FormViewerDetails.BasicDetails.Route.DisplayText
                )
              ) {
                LineDisplayHelper.SetQualifierAndText(
                  oPrescription.FormViewerDetails.BasicDetails.Route
                    .DisplayText,
                  oMLD.objLineDisConfig[iCnt].CaseCode,
                  oMLD.objLineDisConfig[iCnt].FontStyleCode,
                  oMLD.objLineDisConfig[iCnt].Qualifier,
                  oMLD.sColorCode,
                  tbLineDisplay,
                  paraLineDisplay
                );
              }
              break;
            case 'CC_SITE':
              if (
                isRowSlectd == 1 &&
                oPrescription.FormViewerDetails.BasicDetails.Site != null &&
                !String.IsNullOrEmpty(
                  oPrescription.FormViewerDetails.BasicDetails.Site.DisplayText
                )
              ) {
                LineDisplayHelper.SetQualifierAndText(
                  oPrescription.FormViewerDetails.BasicDetails.Site.DisplayText,
                  oMLD.objLineDisConfig[iCnt].CaseCode,
                  oMLD.objLineDisConfig[iCnt].FontStyleCode,
                  oMLD.objLineDisConfig[iCnt].Qualifier,
                  oMLD.sColorCode,
                  tbLineDisplay,
                  paraLineDisplay
                );
              }
              break;
            case 'CC_FORM':
              if (
                isRowSlectd == 1 &&
                oPrescription.FormViewerDetails.BasicDetails.DosageForm !=
                  null &&
                !String.IsNullOrEmpty(
                  oPrescription.FormViewerDetails.BasicDetails.DosageForm
                    .DisplayText
                ) &&
                String.Compare(
                  oPrescription.FormViewerDetails.BasicDetails.Itemsubtype,
                  DrugItemSubTypeCode.MEDICAL_GAS,
                  StringComparison.CurrentCultureIgnoreCase
                ) == 0
              ) {
                LineDisplayHelper.SetQualifierAndText(
                  oPrescription.FormViewerDetails.BasicDetails.DosageForm
                    .DisplayText,
                  oMLD.objLineDisConfig[iCnt].CaseCode,
                  oMLD.objLineDisConfig[iCnt].FontStyleCode,
                  oMLD.objLineDisConfig[iCnt].Qualifier,
                  oMLD.sColorCode,
                  tbLineDisplay,
                  paraLineDisplay
                );
              } else if (
                isRowSlectd == 1 &&
                oPrescription.FormViewerDetails.BasicDetails.DosageForm !=
                  null &&
                !String.IsNullOrEmpty(
                  oPrescription.FormViewerDetails.BasicDetails.DosageForm
                    .DisplayText
                ) &&
                (String.Compare(
                  oPrescription.FormViewerDetails.BasicDetails.IdentifyingType,
                  CConstants.CATALOGUEITEM,
                  StringComparison.OrdinalIgnoreCase
                ) == 0 ||
                  String.Compare(
                    oPrescription.FormViewerDetails.BasicDetails
                      .IdentifyingType,
                    CConstants.ACTUALMOIETY,
                    StringComparison.OrdinalIgnoreCase
                  ) == 0) &&
                oPrescription.FormViewerDetails.BasicDetails.InfusionDetails !=
                  null &&
                oPrescription.FormViewerDetails.BasicDetails.InfusionDetails
                  .InfusionType != null &&
                !String.IsNullOrEmpty(
                  oPrescription.FormViewerDetails.BasicDetails.InfusionDetails
                    .InfusionType.Value
                ) &&
                String.Compare(
                  oPrescription.FormViewerDetails.BasicDetails.Itemsubtype,
                  DrugItemSubTypeCode.MULTI_COMPONENT,
                  StringComparison.CurrentCultureIgnoreCase
                ) == 0
              ) {
                LineDisplayHelper.SetQualifierAndText(
                  oPrescription.FormViewerDetails.BasicDetails.DosageForm
                    .DisplayText,
                  oMLD.objLineDisConfig[iCnt].CaseCode,
                  oMLD.objLineDisConfig[iCnt].FontStyleCode,
                  oMLD.objLineDisConfig[iCnt].Qualifier,
                  oMLD.sColorCode,
                  tbLineDisplay,
                  paraLineDisplay
                );
              } else if (
                isRowSlectd == 1 &&
                oPrescription.FormViewerDetails.BasicDetails.DosageForm !=
                  null &&
                !String.IsNullOrEmpty(
                  oPrescription.FormViewerDetails.BasicDetails.DosageForm
                    .DisplayText
                ) &&
                (String.Compare(
                  oPrescription.FormViewerDetails.BasicDetails.IdentifyingType,
                  CConstants.CATALOGUEITEM,
                  StringComparison.OrdinalIgnoreCase
                ) == 0 ||
                  String.Compare(
                    oPrescription.FormViewerDetails.BasicDetails
                      .IdentifyingType,
                    CConstants.ACTUALMOIETY,
                    StringComparison.OrdinalIgnoreCase
                  ) == 0 ||
                  String.Equals(
                    oPrescription.FormViewerDetails.BasicDetails
                      .IdentifyingType,
                    CConstants.NONCATALOGUEITEM
                  ) ||
                  String.Equals(
                    oPrescription.FormViewerDetails.BasicDetails
                      .IdentifyingType,
                    CConstants.Precatalog
                  )) &&
                (!(
                  oPrescription.FormViewerDetails.BasicDetails
                    .InfusionDetails != null &&
                  ((oPrescription.FormViewerDetails.BasicDetails.InfusionDetails
                    .InfusionType != null &&
                    !String.IsNullOrEmpty(
                      oPrescription.FormViewerDetails.BasicDetails
                        .InfusionDetails.InfusionType.Value
                    )) ||
                    oPrescription.FormViewerDetails.BasicDetails.InfusionDetails
                      .IsInfContiniousFormLoaded)
                ) ||
                  oPrescription.FormViewerDetails.BasicDetails
                    .InfusionDetails == null ||
                  (oPrescription.FormViewerDetails.BasicDetails
                    .InfusionDetails != null &&
                    (oPrescription.FormViewerDetails.BasicDetails
                      .InfusionDetails.InfusionType == null ||
                      (oPrescription.FormViewerDetails.BasicDetails
                        .InfusionDetails.InfusionType != null &&
                        String.IsNullOrEmpty(
                          oPrescription.FormViewerDetails.BasicDetails
                            .InfusionDetails.InfusionType.Value
                        ))) &&
                    !oPrescription.FormViewerDetails.BasicDetails
                      .InfusionDetails.IsInfContiniousFormLoaded) ||
                  (oPrescription.FormViewerDetails.BasicDetails
                    .InfusionDetails != null &&
                    oPrescription.FormViewerDetails.BasicDetails.InfusionDetails
                      .InfusionType == null &&
                    !oPrescription.FormViewerDetails.BasicDetails
                      .InfusionDetails.IsInfContiniousFormLoaded))
              ) {
                LineDisplayHelper.SetQualifierAndText(
                  oPrescription.FormViewerDetails.BasicDetails.DosageForm
                    .DisplayText,
                  oMLD.objLineDisConfig[iCnt].CaseCode,
                  oMLD.objLineDisConfig[iCnt].FontStyleCode,
                  oMLD.objLineDisConfig[iCnt].Qualifier,
                  oMLD.sColorCode,
                  tbLineDisplay,
                  paraLineDisplay
                );
              }
              break;
            case 'CC_DOSE':
              if (isRowSlectd == 1) {
                let isInfusion: boolean = false;
                let IsIntermittent: boolean = false;
                if (
                  String.Compare(
                    oPrescription.FormViewerDetails.BasicDetails.Itemsubtype,
                    DrugItemSubTypeCode.MEDICAL_GAS,
                    StringComparison.CurrentCultureIgnoreCase
                  ) == 0 ||
                  (oPrescription.FormViewerDetails.BasicDetails
                    .InfusionDetails != null &&
                    oPrescription.FormViewerDetails.BasicDetails.InfusionDetails
                      .InfusionType != null &&
                    !String.IsNullOrEmpty(
                      oPrescription.FormViewerDetails.BasicDetails
                        .InfusionDetails.InfusionType.Value
                    ))
                ) {
                  isInfusion = true;
                }
                if (
                  oPrescription.FormViewerDetails.BasicDetails
                    .InfusionDetails != null &&
                  oPrescription.FormViewerDetails.BasicDetails.InfusionDetails
                    .InfusionType != null &&
                  !String.IsNullOrEmpty(
                    oPrescription.FormViewerDetails.BasicDetails.InfusionDetails
                      .InfusionType.Value
                  ) &&
                  String.Compare(
                    oPrescription.FormViewerDetails.BasicDetails.InfusionDetails
                      .InfusionType.Value,
                    InfusionTypeCode.INTERMITTENT
                  ) == 0
                ) {
                  IsIntermittent = true;
                }
                let sDose: string = String.Empty;
                let sDoseUOM: string = String.Empty;
                let doseType: string = String.Empty;
                if (
                  oPrescription.FormViewerDetails.BasicDetails.DoseType !=
                    null &&
                  String.IsNullOrEmpty(
                    oPrescription.FormViewerDetails.BasicDetails.DoseType
                      .DisplayText
                  )
                ) {
                  if (
                    !String.IsNullOrEmpty(
                      oPrescription.FormViewerDetails.BasicDetails.DoseType
                        .Value
                    ) &&
                    MedDoseTypeConceptCodeData.ConceptCodes.ContainsKey(
                      oPrescription.FormViewerDetails.BasicDetails.DoseType
                        .Value
                    )
                  ) {
                    doseType =
                      MedDoseTypeConceptCodeData.ConceptCodes[
                        oPrescription.FormViewerDetails.BasicDetails.DoseType
                          .Value
                      ];
                    if (!String.IsNullOrEmpty(doseType))
                      oPrescription.FormViewerDetails.BasicDetails.DoseType.DisplayText =
                        doseType;
                  }
                }
                if (
                  oPrescription.FormViewerDetails.BasicDetails.DoseType !=
                    null &&
                  !String.IsNullOrEmpty(
                    oPrescription.FormViewerDetails.BasicDetails.DoseType
                      .DisplayText
                  ) &&
                  MedDoseTypeConceptCodeData.ConceptCodes != null &&
                  ((MedDoseTypeConceptCodeData.ConceptCodes.ContainsKey(
                    'MEDDOSE1'
                  ) &&
                    String.Compare(
                      oPrescription.FormViewerDetails.BasicDetails.DoseType
                        .DisplayText,
                      MedDoseTypeConceptCodeData.ConceptCodes['MEDDOSE1'],
                      StringComparison.CurrentCultureIgnoreCase
                    ) == 0) ||
                    (MedDoseTypeConceptCodeData.ConceptCodes.ContainsKey(
                      'MEDDOSE2'
                    ) &&
                      String.Compare(
                        oPrescription.FormViewerDetails.BasicDetails.DoseType
                          .DisplayText,
                        MedDoseTypeConceptCodeData.ConceptCodes['MEDDOSE2'],
                        StringComparison.CurrentCultureIgnoreCase
                      ) == 0) ||
                    (MedDoseTypeConceptCodeData.ConceptCodes.ContainsKey(
                      'CC_CONDNLDSNG'
                    ) &&
                      String.Compare(
                        oPrescription.FormViewerDetails.BasicDetails.DoseType
                          .DisplayText,
                        MedDoseTypeConceptCodeData.ConceptCodes[
                          'CC_CONDNLDSNG'
                        ],
                        StringComparison.CurrentCultureIgnoreCase
                      ) == 0) ||
                    (MedDoseTypeConceptCodeData.ConceptCodes.ContainsKey(
                      'CC_TITRATED'
                    ) &&
                      String.Compare(
                        oPrescription.FormViewerDetails.BasicDetails.DoseType
                          .DisplayText,
                        MedDoseTypeConceptCodeData.ConceptCodes['CC_TITRATED'],
                        StringComparison.CurrentCultureIgnoreCase
                      ) == 0) ||
                    (MedDoseTypeConceptCodeData.ConceptCodes.ContainsKey(
                      'CC_STEPPEDVARIABLE'
                    ) &&
                      String.Compare(
                        oPrescription.FormViewerDetails.BasicDetails.DoseType
                          .DisplayText,
                        MedDoseTypeConceptCodeData.ConceptCodes[
                          'CC_STEPPEDVARIABLE'
                        ],
                        StringComparison.CurrentCultureIgnoreCase
                      ) == 0))
                ) {
                  if (
                    isInfusion &&
                    !IsIntermittent &&
                    MedDoseTypeConceptCodeData.ConceptCodes.ContainsKey(
                      'CC_CONDNLDSNG'
                    ) &&
                    String.Compare(
                      oPrescription.FormViewerDetails.BasicDetails.DoseType
                        .DisplayText,
                      MedDoseTypeConceptCodeData.ConceptCodes['CC_CONDNLDSNG'],
                      StringComparison.CurrentCultureIgnoreCase
                    ) == 0
                  ) {
                    if (
                      !String.IsNullOrEmpty(
                        oPrescription.FormViewerDetails.BasicDetails.Dose
                      ) &&
                      oPrescription.FormViewerDetails.BasicDetails.Dose != '0'
                    ) {
                      let sUDose: string;
                      sDose =
                        oPrescription.FormViewerDetails.BasicDetails.Dose.Replace(
                          ' ',
                          Convert.ToChar(160)
                        );
                      let dUDose: number;
                      if (
                        !String.IsNullOrEmpty(
                          oPrescription.FormViewerDetails.BasicDetails.UpperDose
                        ) &&
                        Number.TryParse(
                          oPrescription.FormViewerDetails.BasicDetails
                            .UpperDose,
                          (o1) => {
                            dUDose = o1;
                          }
                        ) &&
                        dUDose > 0
                      ) {
                        let dLDose: number;
                        if (
                          Number.TryParse(sDose, (o1) => {
                            dLDose = o1;
                          }) &&
                          dUDose > dLDose
                        ) {
                          sUDose = dLDose.ToString();
                          sDose +=
                            Convert.ToChar(160).ToString() +
                            '-' +
                            Convert.ToChar(160).ToString();
                          sDose += dUDose;
                        }
                      }
                      if (!String.IsNullOrEmpty(sDose)) {
                        LineDisplayHelper.SetQualifierAndText(
                          sDose,
                          oMLD.objLineDisConfig[iCnt].CaseCode,
                          oMLD.objLineDisConfig[iCnt].FontStyleCode,
                          oMLD.objLineDisConfig[iCnt].Qualifier,
                          oMLD.sColorCode,
                          tbLineDisplay,
                          paraLineDisplay
                        );
                        sDose = String.Empty;
                      }
                      if (
                        oPrescription.FormViewerDetails.BasicDetails.DoseUOM !=
                          null &&
                        !String.IsNullOrEmpty(
                          oPrescription.FormViewerDetails.BasicDetails.DoseUOM
                            .DisplayText
                        )
                      ) {
                        sDoseUOM =
                          oPrescription.FormViewerDetails.BasicDetails.DoseUOM
                            .DisplayText;
                        if (!String.IsNullOrEmpty(sDoseUOM)) {
                          LineDisplayHelper.SetQualifierAndText(
                            sDoseUOM,
                            oMLD.objLineDisConfig[iCnt].CaseCode,
                            oMLD.objLineDisConfig[iCnt].FontStyleCode,
                            '',
                            oMLD.sColorCode,
                            tbLineDisplay,
                            paraLineDisplay
                          );
                        }
                      }
                    }
                  } else {
                    sDose =
                      oPrescription.FormViewerDetails.BasicDetails.DoseType
                        .DisplayText;
                  }
                } else if (
                  oPrescription.FormViewerDetails.BasicDetails.DoseType !=
                    null &&
                  !String.IsNullOrEmpty(
                    oPrescription.FormViewerDetails.BasicDetails.DoseType.Value
                  ) &&
                  MedDoseTypeConceptCodeData.ConceptCodes != null &&
                  (String.Compare(
                    oPrescription.FormViewerDetails.BasicDetails.DoseType.Value,
                    'CC_STEPPEDVARIABLE',
                    StringComparison.CurrentCultureIgnoreCase
                  ) == 0 ||
                    String.Compare(
                      oPrescription.FormViewerDetails.BasicDetails.DoseType
                        .Value,
                      'CC_CONDNLDSNG',
                      StringComparison.CurrentCultureIgnoreCase
                    ) == 0 ||
                    String.Compare(
                      oPrescription.FormViewerDetails.BasicDetails.DoseType
                        .Value,
                      'CC_TITRATED',
                      StringComparison.CurrentCultureIgnoreCase
                    ) == 0) &&
                  MedDoseTypeConceptCodeData.ConceptCodes.ContainsKey(
                    oPrescription.FormViewerDetails.BasicDetails.DoseType.Value
                  )
                ) {
                  sDose =
                    MedDoseTypeConceptCodeData.ConceptCodes[
                      oPrescription.FormViewerDetails.BasicDetails.DoseType
                        .Value
                    ];
                } else if (
                  !String.IsNullOrEmpty(
                    oPrescription.FormViewerDetails.BasicDetails.Dose
                  ) &&
                  (oPrescription.FormViewerDetails.BasicDetails.Dose != '0' ||
                    !String.IsNullOrEmpty(
                      oPrescription.FormViewerDetails.BasicDetails.UpperDose
                    ))
                ) {
                  let sUDose: string;
                  sDose =
                    oPrescription.FormViewerDetails.BasicDetails.Dose.Replace(
                      ' ',
                      Convert.ToChar(160)
                    );
                  let dUDose: number;
                  if (
                    !String.IsNullOrEmpty(
                      oPrescription.FormViewerDetails.BasicDetails.UpperDose
                    ) &&
                    Number.TryParse(
                      oPrescription.FormViewerDetails.BasicDetails.UpperDose,
                      (o1) => {
                        dUDose = o1;
                      }
                    ) &&
                    dUDose > 0
                  ) {
                    let dLDose: number;
                    if (
                      Number.TryParse(sDose, (o1) => {
                        dLDose = o1;
                      }) &&
                      dUDose > dLDose
                    ) {
                      sUDose = dLDose.ToString();
                      sDose +=
                        Convert.ToChar(160).ToString() +
                        '-' +
                        Convert.ToChar(160).ToString();
                      sDose += dUDose;
                    }
                  }
                  if (!String.IsNullOrEmpty(sDose)) {
                    LineDisplayHelper.SetQualifierAndText(
                      sDose,
                      oMLD.objLineDisConfig[iCnt].CaseCode,
                      oMLD.objLineDisConfig[iCnt].FontStyleCode,
                      oMLD.objLineDisConfig[iCnt].Qualifier,
                      oMLD.sColorCode,
                      tbLineDisplay,
                      paraLineDisplay
                    );
                    sDose = String.Empty;
                  }
                  if (
                    oPrescription.FormViewerDetails.BasicDetails.DoseUOM !=
                      null &&
                    !String.IsNullOrEmpty(
                      oPrescription.FormViewerDetails.BasicDetails.DoseUOM
                        .DisplayText
                    )
                  ) {
                    sDoseUOM =
                      oPrescription.FormViewerDetails.BasicDetails.DoseUOM
                        .DisplayText;
                    if (!String.IsNullOrEmpty(sDoseUOM)) {
                      LineDisplayHelper.SetQualifierAndText(
                        sDoseUOM,
                        oMLD.objLineDisConfig[iCnt].CaseCode,
                        oMLD.objLineDisConfig[iCnt].FontStyleCode,
                        '',
                        oMLD.sColorCode,
                        tbLineDisplay,
                        paraLineDisplay
                      );
                    }
                  }
                } else if (
                  !isInfusion &&
                  oPrescription.FormViewerDetails.BasicDetails.AdminMethod !=
                    null &&
                  !String.IsNullOrEmpty(
                    oPrescription.FormViewerDetails.BasicDetails.AdminMethod
                      .DisplayText
                  )
                ) {
                  sDose =
                    oPrescription.FormViewerDetails.BasicDetails.AdminMethod
                      .DisplayText;
                } else if (
                  String.IsNullOrEmpty(
                    oPrescription.FormViewerDetails.BasicDetails.Dose
                  ) &&
                  oPrescription.FormViewerDetails.BasicDetails.DoseUOM !=
                    null &&
                  !String.IsNullOrEmpty(
                    oPrescription.FormViewerDetails.BasicDetails.DoseUOM
                      .DisplayText
                  )
                ) {
                  sDoseUOM =
                    oPrescription.FormViewerDetails.BasicDetails.DoseUOM
                      .DisplayText;
                  if (!String.IsNullOrEmpty(sDoseUOM)) {
                    LineDisplayHelper.SetQualifierAndText(
                      sDoseUOM,
                      oMLD.objLineDisConfig[iCnt].CaseCode,
                      oMLD.objLineDisConfig[iCnt].FontStyleCode,
                      oMLD.objLineDisConfig[iCnt].Qualifier,
                      oMLD.sColorCode,
                      tbLineDisplay,
                      paraLineDisplay
                    );
                  }
                }
                if (!String.IsNullOrEmpty(sDose))
                  LineDisplayHelper.SetQualifierAndText(
                    sDose,
                    oMLD.objLineDisConfig[iCnt].CaseCode,
                    oMLD.objLineDisConfig[iCnt].FontStyleCode,
                    oMLD.objLineDisConfig[iCnt].Qualifier,
                    oMLD.sColorCode,
                    tbLineDisplay,
                    paraLineDisplay
                  );
              }
              break;
            case 'CC_DIRECTION':
              if (
                isRowSlectd == 1 &&
                !String.IsNullOrEmpty(
                  oPrescription.FormViewerDetails.BasicDetails.Direction
                )
              ) {
                let sPRNText: string =
                  oPrescription.FormViewerDetails.BasicDetails.Direction;
                if (
                  oPrescription.FormViewerDetails.BasicDetails.PRNInstruction !=
                    null &&
                  !String.IsNullOrEmpty(
                    oPrescription.FormViewerDetails.BasicDetails.PRNInstruction
                      .DisplayText
                  )
                ) {
                  sPRNText +=
                    ' ' +
                    oPrescription.FormViewerDetails.BasicDetails.PRNInstruction
                      .DisplayText;
                }
                LineDisplayHelper.SetQualifierAndText(
                  sPRNText,
                  oMLD.objLineDisConfig[iCnt].CaseCode,
                  oMLD.objLineDisConfig[iCnt].FontStyleCode,
                  oMLD.objLineDisConfig[iCnt].Qualifier,
                  oMLD.sColorCode,
                  tbLineDisplay,
                  paraLineDisplay
                );
              }
              break;
            case 'CC_FREQUENCY':
              if (
                isRowSlectd == 1 &&
                oPrescription.FormViewerDetails != null &&
                oPrescription.FormViewerDetails.BasicDetails != null &&
                ((oPrescription.FormViewerDetails.BasicDetails.Frequency !=
                  null &&
                  !String.IsNullOrEmpty(
                    oPrescription.FormViewerDetails.BasicDetails.Frequency
                      .DisplayText
                  ) &&
                  (oPrescription.FormViewerDetails.BasicDetails
                    .InfusionDetails == null ||
                    (oPrescription.FormViewerDetails.BasicDetails
                      .InfusionDetails != null &&
                      oPrescription.FormViewerDetails.BasicDetails
                        .InfusionDetails.InfusionType == null) ||
                    (oPrescription.FormViewerDetails.BasicDetails
                      .InfusionDetails != null &&
                      oPrescription.FormViewerDetails.BasicDetails
                        .InfusionDetails.InfusionType != null &&
                      String.IsNullOrEmpty(
                        oPrescription.FormViewerDetails.BasicDetails
                          .InfusionDetails.InfusionType.Value
                      )))) ||
                  (oPrescription.FormViewerDetails.BasicDetails
                    .InfusionDetails != null &&
                    oPrescription.FormViewerDetails.BasicDetails.InfusionDetails
                      .InfusionType != null &&
                    !String.IsNullOrEmpty(
                      oPrescription.FormViewerDetails.BasicDetails
                        .InfusionDetails.InfusionType.Value
                    ) &&
                    String.Compare(
                      oPrescription.FormViewerDetails.BasicDetails
                        .InfusionDetails.InfusionType.Value,
                      InfusionTypeCode.INTERMITTENT,
                      StringComparison.CurrentCultureIgnoreCase
                    ) == 0 &&
                    oPrescription.FormViewerDetails.BasicDetails.Frequency !=
                      null &&
                    !String.IsNullOrEmpty(
                      oPrescription.FormViewerDetails.BasicDetails.Frequency
                        .DisplayText
                    )))
              ) {
                LineDisplayHelper.SetQualifierAndText(
                  oPrescription.FormViewerDetails.BasicDetails.Frequency
                    .DisplayText,
                  oMLD.objLineDisConfig[iCnt].CaseCode,
                  oMLD.objLineDisConfig[iCnt].FontStyleCode,
                  oMLD.objLineDisConfig[iCnt].Qualifier,
                  oMLD.sColorCode,
                  tbLineDisplay,
                  paraLineDisplay
                );
                if (
                  !String.IsNullOrEmpty(
                    oPrescription.FormViewerDetails.BasicDetails.DaysOfWeeks
                  )
                ) {
                  LineDisplayHelper.SetQualifierAndText(
                    oPrescription.FormViewerDetails.BasicDetails.DaysOfWeeks,
                    'CC_MLDUPPERCC_MLDLOWER',
                    oMLD.objLineDisConfig[iCnt].FontStyleCode,
                    ' on ',
                    oMLD.sColorCode,
                    tbLineDisplay,
                    paraLineDisplay
                  );
                }
              }
              break;
            case 'CC_ADMININSTR':
              if (
                isRowSlectd == 1 &&
                oPrescription.FormViewerDetails.BasicDetails.AdminInstruction !=
                  null &&
                !String.IsNullOrEmpty(
                  oPrescription.FormViewerDetails.BasicDetails.AdminInstruction
                    .DisplayText
                )
              ) {
                if (
                  oPrescription.FormViewerDetails.BasicDetails.AdminInstruction.DisplayText.Contains(
                    '\n'
                  ) ||
                  oPrescription.FormViewerDetails.BasicDetails.AdminInstruction.DisplayText.Contains(
                    '\r'
                  )
                ) {
                  LineDisplayHelper.SetQualifierAndText(
                    oPrescription.FormViewerDetails.BasicDetails
                      .AdminInstruction.DisplayText,
                    oMLD.objLineDisConfig[iCnt].CaseCode,
                    oMLD.objLineDisConfig[iCnt].FontStyleCode,
                    oMLD.objLineDisConfig[iCnt].Qualifier,
                    oMLD.sColorCode,
                    tbLineDisplay,
                    paraLineDisplay,
                    true
                  );
                } else {
                  LineDisplayHelper.SetQualifierAndText(
                    oPrescription.FormViewerDetails.BasicDetails
                      .AdminInstruction.DisplayText,
                    oMLD.objLineDisConfig[iCnt].CaseCode,
                    oMLD.objLineDisConfig[iCnt].FontStyleCode,
                    oMLD.objLineDisConfig[iCnt].Qualifier,
                    oMLD.sColorCode,
                    tbLineDisplay,
                    paraLineDisplay
                  );
                }
              }
              break;
            case 'CC_DISPINSTR':
              break;
            case 'CC_USEDWITH':
              if (isRowSlectd == 1 && !String.IsNullOrEmpty(String.Empty)) {
                LineDisplayHelper.SetQualifierAndText(
                  String.Empty,
                  oMLD.objLineDisConfig[iCnt].CaseCode,
                  oMLD.objLineDisConfig[iCnt].FontStyleCode,
                  oMLD.objLineDisConfig[iCnt].Qualifier,
                  oMLD.sColorCode,
                  tbLineDisplay,
                  paraLineDisplay
                );
              }
              break;
            case 'CC_TRTMNT':
              if (
                isRowSlectd == 1 &&
                oPrescription.FormViewerDetails.BasicDetails
                  .TreatmentToContinue != null &&
                !String.IsNullOrEmpty(
                  oPrescription.FormViewerDetails.BasicDetails
                    .TreatmentToContinue.DisplayText
                )
              ) {
                LineDisplayHelper.SetQualifierAndText(
                  oPrescription.FormViewerDetails.BasicDetails
                    .TreatmentToContinue.DisplayText,
                  oMLD.objLineDisConfig[iCnt].CaseCode,
                  oMLD.objLineDisConfig[iCnt].FontStyleCode,
                  oMLD.objLineDisConfig[iCnt].Qualifier,
                  oMLD.sColorCode,
                  tbLineDisplay,
                  paraLineDisplay
                );
              }
              break;
            case 'CC_SUPLYINSTR':
              break;
            case 'CC_NOINSTL':
              if (
                isRowSlectd == 1 &&
                oPrescription.FormViewerDetails.BasicDetails.NoOfInstallments >
                  0
              ) {
                LineDisplayHelper.SetQualifierAndText(
                  oPrescription.FormViewerDetails.BasicDetails.NoOfInstallments.ToString(),
                  oMLD.objLineDisConfig[iCnt].CaseCode,
                  oMLD.objLineDisConfig[iCnt].FontStyleCode,
                  oMLD.objLineDisConfig[iCnt].Qualifier,
                  oMLD.sColorCode,
                  tbLineDisplay,
                  paraLineDisplay
                );
              }
              break;
            case 'CC_MEDCLERK':
              if (
                isRowSlectd == 1 &&
                oPrescription.FormViewerDetails.BasicDetails
                  .MedClerkModifyReason != null &&
                !String.IsNullOrEmpty(
                  oPrescription.FormViewerDetails.BasicDetails
                    .MedClerkModifyReason.DisplayText
                )
              ) {
                LineDisplayHelper.SetQualifierAndText(
                  oPrescription.FormViewerDetails.BasicDetails
                    .MedClerkModifyReason.DisplayText,
                  oMLD.objLineDisConfig[iCnt].CaseCode,
                  oMLD.objLineDisConfig[iCnt].FontStyleCode,
                  oMLD.objLineDisConfig[iCnt].Qualifier,
                  oMLD.sColorCode,
                  tbLineDisplay,
                  paraLineDisplay
                );
              }
              break;
            case 'CC_BATCHNO':
              if (
                isRowSlectd == 1 &&
                !String.IsNullOrEmpty(
                  oPrescription.FormViewerDetails.BasicDetails.BatchNumber
                )
              ) {
                LineDisplayHelper.SetQualifierAndText(
                  oPrescription.FormViewerDetails.BasicDetails.BatchNumber,
                  oMLD.objLineDisConfig[iCnt].CaseCode,
                  oMLD.objLineDisConfig[iCnt].FontStyleCode,
                  oMLD.objLineDisConfig[iCnt].Qualifier,
                  oMLD.sColorCode,
                  tbLineDisplay,
                  paraLineDisplay
                );
              }
              break;
            case 'CC_EXPIRYDT':
              if (
                isRowSlectd == 1 &&
                oPrescription.FormViewerDetails.BasicDetails.ExpiryDate !=
                  Convert.ToDateTime(null)
              ) {
                sTmpDate = String.Empty;
                sTmpDate =
                  oPrescription.FormViewerDetails.BasicDetails.ExpiryDate.ToString(
                    CConstants.LongDateFormat
                  );
                LineDisplayHelper.SetQualifierAndText(
                  sTmpDate,
                  oMLD.objLineDisConfig[iCnt].CaseCode,
                  oMLD.objLineDisConfig[iCnt].FontStyleCode,
                  oMLD.objLineDisConfig[iCnt].Qualifier,
                  oMLD.sColorCode,
                  tbLineDisplay,
                  paraLineDisplay
                );
              }
              break;
            case 'CC_ADNALCMNT':
              if (
                isRowSlectd == 1 &&
                !String.IsNullOrEmpty(
                  oPrescription.FormViewerDetails.BasicDetails
                    .AdditionalComments
                )
              ) {
                if (
                  oPrescription.FormViewerDetails.BasicDetails.AdditionalComments.Contains(
                    '\n'
                  ) ||
                  oPrescription.FormViewerDetails.BasicDetails.AdditionalComments.Contains(
                    '\r'
                  )
                ) {
                  LineDisplayHelper.SetQualifierAndText(
                    oPrescription.FormViewerDetails.BasicDetails
                      .AdditionalComments,
                    oMLD.objLineDisConfig[iCnt].CaseCode,
                    oMLD.objLineDisConfig[iCnt].FontStyleCode,
                    oMLD.objLineDisConfig[iCnt].Qualifier,
                    oMLD.sColorCode,
                    tbLineDisplay,
                    paraLineDisplay,
                    true
                  );
                } else {
                  LineDisplayHelper.SetQualifierAndText(
                    oPrescription.FormViewerDetails.BasicDetails
                      .AdditionalComments,
                    oMLD.objLineDisConfig[iCnt].CaseCode,
                    oMLD.objLineDisConfig[iCnt].FontStyleCode,
                    oMLD.objLineDisConfig[iCnt].Qualifier,
                    oMLD.sColorCode,
                    tbLineDisplay,
                    paraLineDisplay
                  );
                }
              }
              break;
            case 'CC_QUANTITY':
              if (
                isRowSlectd == 1 &&
                !String.IsNullOrEmpty(
                  oPrescription.FormViewerDetails.BasicDetails.QuantityUOMName
                ) &&
                (String.IsNullOrEmpty(
                  oPrescription.FormViewerDetails.BasicDetails.Quantity
                ) ||
                  String.Compare(
                    oPrescription.FormViewerDetails.BasicDetails.Quantity,
                    '0'
                  ) != 0)
              ) {
                let sQV: string = String.Empty;
                if (
                  String.Compare(
                    oPrescription.FormViewerDetails.BasicDetails.Quantity,
                    '0'
                  ) != 0
                ) {
                  sQV =
                    oPrescription.FormViewerDetails.BasicDetails.Quantity +
                    ' ' +
                    oPrescription.FormViewerDetails.BasicDetails
                      .QuantityUOMName;
                } else {
                  sQV =
                    oPrescription.FormViewerDetails.BasicDetails
                      .QuantityUOMName;
                }
                LineDisplayHelper.SetQualifierAndText(
                  sQV,
                  oMLD.objLineDisConfig[iCnt].CaseCode,
                  oMLD.objLineDisConfig[iCnt].FontStyleCode,
                  oMLD.objLineDisConfig[iCnt].Qualifier,
                  oMLD.sColorCode,
                  tbLineDisplay,
                  paraLineDisplay
                );
              }
              break;
            case 'CC_LEGALCAT':
              if (isRowSlectd == 1 && !String.IsNullOrEmpty(String.Empty)) {
                LineDisplayHelper.SetQualifierAndText(
                  String.Empty,
                  oMLD.objLineDisConfig[iCnt].CaseCode,
                  oMLD.objLineDisConfig[iCnt].FontStyleCode,
                  oMLD.objLineDisConfig[iCnt].Qualifier,
                  oMLD.sColorCode,
                  tbLineDisplay,
                  paraLineDisplay
                );
              }
              break;
            case 'CC_ADMN_METHOD':
              if (
                isRowSlectd == 1 &&
                oPrescription.FormViewerDetails.BasicDetails.AdminMethod !=
                  null &&
                !String.IsNullOrEmpty(
                  oPrescription.FormViewerDetails.BasicDetails.AdminMethod
                    .DisplayText
                )
              ) {
                LineDisplayHelper.SetQualifierAndText(
                  oPrescription.FormViewerDetails.BasicDetails.AdminMethod
                    .DisplayText,
                  oMLD.objLineDisConfig[iCnt].CaseCode,
                  oMLD.objLineDisConfig[iCnt].FontStyleCode,
                  oMLD.objLineDisConfig[iCnt].Qualifier,
                  oMLD.sColorCode,
                  tbLineDisplay,
                  paraLineDisplay
                );
              }
              break;
            case 'CC_ENDRSMNT_PROPTY':
              if (isRowSlectd == 1 && !String.IsNullOrEmpty(String.Empty)) {
                LineDisplayHelper.SetQualifierAndText(
                  String.Empty,
                  oMLD.objLineDisConfig[iCnt].CaseCode,
                  oMLD.objLineDisConfig[iCnt].FontStyleCode,
                  oMLD.objLineDisConfig[iCnt].Qualifier,
                  oMLD.sColorCode,
                  tbLineDisplay,
                  paraLineDisplay
                );
              }
              break;
            case 'CC_INSTLMNT_INSTCS':
              if (isRowSlectd == 1 && !String.IsNullOrEmpty(String.Empty)) {
                LineDisplayHelper.SetQualifierAndText(
                  String.Empty,
                  oMLD.objLineDisConfig[iCnt].CaseCode,
                  oMLD.objLineDisConfig[iCnt].FontStyleCode,
                  oMLD.objLineDisConfig[iCnt].Qualifier,
                  oMLD.sColorCode,
                  tbLineDisplay,
                  paraLineDisplay
                );
              }
              break;
            case 'CC_PRESTYPE':
              if (
                isRowSlectd == 1 &&
                !String.IsNullOrEmpty(oPrescription.PrescriptionType)
              ) {
                LineDisplayHelper.SetQualifierAndText(
                  oPrescription.PrescriptionType,
                  oMLD.objLineDisConfig[iCnt].CaseCode,
                  oMLD.objLineDisConfig[iCnt].FontStyleCode,
                  oMLD.objLineDisConfig[iCnt].Qualifier,
                  oMLD.sColorCode,
                  tbLineDisplay,
                  paraLineDisplay
                );
              }
              break;
            case 'CC_PRESBY':
              if (
                isRowSlectd == 1 &&
                oPrescription.PrescriberDetails != null &&
                !String.IsNullOrEmpty(oPrescription.PrescriberDetails.Name)
              ) {
                LineDisplayHelper.SetQualifierAndText(
                  oPrescription.PrescriberDetails.Name,
                  oMLD.objLineDisConfig[iCnt].CaseCode,
                  oMLD.objLineDisConfig[iCnt].FontStyleCode,
                  oMLD.objLineDisConfig[iCnt].Qualifier,
                  oMLD.sColorCode,
                  tbLineDisplay,
                  paraLineDisplay
                );
              }
              break;
            case 'CC_STARTDTTM':
              break;
            case 'CC_STOPDTTM':
              if (
                isRowSlectd == 1 &&
                oPrescription.FormViewerDetails.BasicDetails.EndDTTM !=
                  Convert.ToDateTime(null)
              ) {
                sTmpDate = String.Empty;
                if (
                  !String.IsNullOrEmpty(oPrescription.PrescriptionType) &&
                  !String.Equals(
                    oPrescription.PrescriptionType,
                    PrescriptionTypes.Clerking
                  ) &&
                  !String.Equals(
                    oPrescription.PrescriptionType,
                    'Medication clerking'
                  )
                ) {
                  sTmpDate = oPrescription.FormViewerDetails.BasicDetails.EndDTTM ?
                    oPrescription.FormViewerDetails.BasicDetails.EndDTTM.ToString(
                      CConstants.LongDateWithoutSecs
                    ) : '';
                } else {
                  sTmpDate = oPrescription.FormViewerDetails.BasicDetails.EndDTTM ?
                    oPrescription.FormViewerDetails.BasicDetails.EndDTTM.ToString(
                      CConstants.ShortDateFormat
                    ) : '';
                }
                LineDisplayHelper.SetQualifierAndText(
                  sTmpDate,
                  oMLD.objLineDisConfig[iCnt].CaseCode,
                  oMLD.objLineDisConfig[iCnt].FontStyleCode,
                  oMLD.objLineDisConfig[iCnt].Qualifier,
                  oMLD.sColorCode,
                  tbLineDisplay,
                  paraLineDisplay
                );
              }
              break;
            case 'CC_STATUS':
              if (
                isRowSlectd == 1 &&
                !String.IsNullOrEmpty(oPrescription.PrescriptionItemStatus)
              ) {
                let sStatus: string = String.Empty;
                if (
                  CommonBB.IsConceptCodeExists(
                    oPrescription.PrescriptionItemStatus,
                    MedicationCommonConceptCodeData.ConceptCodes,
                    (o1) => {
                      temp = o1;
                    }
                  ) != false
                ) {
                  sStatus = temp;
                } else {
                  sStatus = oPrescription.PrescriptionItemStatus;
                }
                if (
                  oPrescription.IsPGD == '1' &&
                  oPrescription.PrescriptionItemStatus != null &&
                  !String.IsNullOrEmpty(oPrescription.PrescriptionItemStatus)
                ) {
                  if (
                    String.Equals(
                      oPrescription.PrescriptionItemStatus,
                      CConstants.CANCELLED,
                      StringComparison.InvariantCultureIgnoreCase
                    )
                  ) {
                    sStatus = Resource.prescribedrugs.PGDCancelled;
                  }
                  if (
                    String.Equals(
                      oPrescription.PrescriptionItemStatus,
                      CConstants.COMPLETED,
                      StringComparison.InvariantCultureIgnoreCase
                    )
                  ) {
                    sStatus = Resource.prescribedrugs.PGDCompleted;
                  }
                }
                LineDisplayHelper.SetQualifierAndText(
                  sStatus,
                  oMLD.objLineDisConfig[iCnt].CaseCode,
                  oMLD.objLineDisConfig[iCnt].FontStyleCode,
                  oMLD.objLineDisConfig[iCnt].Qualifier,
                  oMLD.sColorCode,
                  tbLineDisplay,
                  paraLineDisplay
                );
              }
              break;
            case 'CC_STRENGTH':
              if (
                isRowSlectd == 1 &&
                oPrescription.FormViewerDetails.BasicDetails.Strength != null &&
                !String.IsNullOrEmpty(
                  oPrescription.FormViewerDetails.BasicDetails.Strength
                    .DisplayText
                ) &&
                (!(
                  oPrescription.FormViewerDetails.BasicDetails
                    .InfusionDetails != null &&
                  ((oPrescription.FormViewerDetails.BasicDetails.InfusionDetails
                    .InfusionType != null &&
                    !String.IsNullOrEmpty(
                      oPrescription.FormViewerDetails.BasicDetails
                        .InfusionDetails.InfusionType.Value
                    )) ||
                    oPrescription.FormViewerDetails.BasicDetails.InfusionDetails
                      .IsInfContiniousFormLoaded)
                ) ||
                  oPrescription.FormViewerDetails.BasicDetails
                    .InfusionDetails == null ||
                  (oPrescription.FormViewerDetails.BasicDetails
                    .InfusionDetails != null &&
                    oPrescription.FormViewerDetails.BasicDetails.InfusionDetails
                      .InfusionType != null &&
                    String.IsNullOrEmpty(
                      oPrescription.FormViewerDetails.BasicDetails
                        .InfusionDetails.InfusionType.Value
                    )) ||
                  (oPrescription.FormViewerDetails.BasicDetails
                    .InfusionDetails != null &&
                    oPrescription.FormViewerDetails.BasicDetails.InfusionDetails
                      .InfusionType == null))
              ) {
                LineDisplayHelper.SetQualifierAndText(
                  oPrescription.FormViewerDetails.BasicDetails.Strength
                    .DisplayText,
                  oMLD.objLineDisConfig[iCnt].CaseCode,
                  oMLD.objLineDisConfig[iCnt].FontStyleCode,
                  oMLD.objLineDisConfig[iCnt].Qualifier,
                  oMLD.sColorCode,
                  tbLineDisplay,
                  paraLineDisplay
                );
              }
              break;
            case 'CC_DOSE_ICO':
              if (
                isRowSlectd == 1 &&
                oPrescription.FormViewerDetails.BasicDetails.DoseType != null &&
                !String.IsNullOrEmpty(
                  oPrescription.FormViewerDetails.BasicDetails.DoseType
                    .DisplayText
                )
              ) {
                let sDoseTypeName: string =
                  oPrescription.FormViewerDetails.BasicDetails.DoseType
                    .DisplayText;
                if (
                  String.Compare(
                    sDoseTypeName,
                    'STEPPED',
                    StringComparison.OrdinalIgnoreCase
                  ) == 0 ||
                  String.Compare(
                    sDoseTypeName,
                    'VARIABLE',
                    StringComparison.OrdinalIgnoreCase
                  ) == 0 ||
                  String.Compare(
                    sDoseTypeName,
                    'Stepped/Variable',
                    StringComparison.OrdinalIgnoreCase
                  ) == 0 ||
                  String.Compare(
                    sDoseTypeName,
                    'Conditional',
                    StringComparison.OrdinalIgnoreCase
                  ) == 0 ||
                  String.Compare(
                    sDoseTypeName,
                    'Titrated',
                    StringComparison.OrdinalIgnoreCase
                  ) == 0
                ) {
                  let sPrescriptionItemOId: string =
                    oPrescription.PrescriptionItemOID.ToString();
                  if (
                    !String.IsNullOrEmpty(
                      oPrescription.FormViewerDetails.BasicDetails
                        .IdentifyingName
                    ) &&
                    !String.IsNullOrEmpty(oPrescription.PrescriptionType)
                  ) {
                    sPrescriptionItemOId =
                      oPrescription.PrescriptionItemOID.ToString() +
                      '*' +
                      oPrescription.FormViewerDetails.BasicDetails
                        .IdentifyingName +
                      '*' +
                      AppSessionInfo.AMCV +
                      '*' +
                      'EPR' +
                      '*' +
                      (oPrescription.IsResolveGrid ? 'RHS' : 'LHS');
                  } else if (
                    !String.IsNullOrEmpty(
                      oPrescription.FormViewerDetails.BasicDetails
                        .IdentifyingName
                    ) &&
                    String.IsNullOrEmpty(oPrescription.PrescriptionType)
                  ) {
                    if (
                      String.Compare(
                        oPrescription.FormViewerDetails.BasicDetails.DoseType
                          .Value,
                        'CC_TITRATED',
                        StringComparison.OrdinalIgnoreCase
                      ) == 0
                    ) {
                      sPrescriptionItemOId =
                        oPrescription.FormViewerDetails.BasicDetails
                          .IdentifyingName +
                        '*' +
                        oPrescription.FormViewerDetails.BasicDetails.Dose +
                        '*' +
                        (oPrescription.FormViewerDetails.BasicDetails.DoseUOM !=
                        null
                          ? oPrescription.FormViewerDetails.BasicDetails.DoseUOM
                              .DisplayText
                          : String.Empty) +
                        '*' +
                        'SYS';
                    } else {
                      sPrescriptionItemOId =
                        oPrescription.PrescribableItemDetailOID.ToString() +
                        '*' +
                        oPrescription.FormViewerDetails.BasicDetails
                          .IdentifyingName +
                        '*' +
                        AppSessionInfo.AMCV +
                        '*' +
                        'SYS';
                    }
                  }
                  let sTip: string =
                    Resource.prescribedrugs.CC_DOSE_ICO_Tooltip;
                  let imgSteppedVariable: Image = new Image();
                  imgSteppedVariable.Margin = new Thickness(2, 0, 2, 0);
                  imgSteppedVariable.Name = sDoseTypeName;
                  imgSteppedVariable.Cursor = Cursors.Hand;
                  imgSteppedVariable.Stretch = Stretch.None;
                  imgSteppedVariable.Source = new BitmapImage(
                    new Uri(
                      MedImage.GetPath(MedImages.SteppedVariable),
                      UriKind.RelativeOrAbsolute
                    )
                  );
                  if (
                    (String.Compare(
                      oPrescription.FormViewerDetails.BasicDetails.DoseType
                        .Value,
                      'Conditional',
                      StringComparison.OrdinalIgnoreCase
                    ) == 0 ||
                      String.Compare(
                        oPrescription.FormViewerDetails.BasicDetails.DoseType
                          .Value,
                        'CC_CONDNLDSNG',
                        StringComparison.OrdinalIgnoreCase
                      ) == 0 ||
                      String.Compare(
                        oPrescription.FormViewerDetails.BasicDetails.DoseType
                          .Value,
                        'Titrated',
                        StringComparison.OrdinalIgnoreCase
                      ) == 0 ||
                      String.Compare(
                        oPrescription.FormViewerDetails.BasicDetails.DoseType
                          .Value,
                        'CC_TITRATED',
                        StringComparison.OrdinalIgnoreCase
                      ) == 0 ||
                      String.Compare(
                        oPrescription.FormViewerDetails.BasicDetails.DoseType
                          .Value,
                        'CC_STEPPEDVARIABLE',
                        StringComparison.OrdinalIgnoreCase
                      ) == 0 ||
                      String.Compare(
                        oPrescription.FormViewerDetails.BasicDetails.DoseType
                          .Value,
                        'Stepped/Variable',
                        StringComparison.OrdinalIgnoreCase
                      ) == 0) &&
                    (String.Compare(
                      oPrescription.OperationMode,
                      'N',
                      StringComparison.OrdinalIgnoreCase
                    ) == 0 ||
                      (oPrescription.IsUnHoldDrug &&
                        String.Compare(
                          oPrescription.OperationMode,
                          'U',
                          StringComparison.OrdinalIgnoreCase
                        ) == 0))
                  ) {
                    imgSteppedVariable.Tag = oPrescription;
                  } else {
                    imgSteppedVariable.Tag = sPrescriptionItemOId;
                  }
                  if (
                    oPrescription.FormViewerDetails.BasicDetails.DoseType !=
                      null &&
                    oPrescription.oDoseRegime != null &&
                    oPrescription.oDoseRegime.Count > 0 &&
                    oPrescription.FormViewerDetails.BasicDetails
                      .IsConditionalExists &&
                    (String.Compare(
                      oPrescription.FormViewerDetails.BasicDetails.DoseType
                        .Value,
                      'CC_CONDNLDSNG',
                      StringComparison.OrdinalIgnoreCase
                    ) == 0 ||
                      String.Compare(
                        oPrescription.FormViewerDetails.BasicDetails.DoseType
                          .Value,
                        'Conditional',
                        StringComparison.OrdinalIgnoreCase
                      ) == 0) &&
                    oPrescription.PrescriptionItemOID == 0 &&
                    String.IsNullOrEmpty(oPrescription.OperationMode) &&
                    oPrescription.ActionCode == eActivityTypes.Prescribe
                  ) {
                    imgSteppedVariable.Tag = oPrescription;
                  }
                  if (
                    (String.Compare(
                      oPrescription.FormViewerDetails.BasicDetails.DoseType
                        .Value,
                      'Conditional',
                      StringComparison.OrdinalIgnoreCase
                    ) == 0 ||
                      String.Compare(
                        oPrescription.FormViewerDetails.BasicDetails.DoseType
                          .Value,
                        'CC_CONDNLDSNG',
                        StringComparison.OrdinalIgnoreCase
                      ) == 0) &&
                    oPrescription.FormViewerDetails.BasicDetails
                      .IsConditionalExists
                  ) {
                    //oPrescription.SubscribeClickEvent(imgSteppedVariable);
                    imgSteppedVariable.MouseLeftButtonUp = (s,e) => { oPrescription.imgSteppedVariable_MouseLeftButtonUp(s,e)}
                    ToolTipService.SetToolTip(imgSteppedVariable, sTip);
                    paraLineDisplay.InLines.Add(
                      ObjectHelper.CreateObject(new iLabelInLineElement(), {
                        InLine: imgSteppedVariable,
                      })
                    );
                  } else if (
                    String.Compare(
                      oPrescription.FormViewerDetails.BasicDetails.DoseType
                        .Value,
                      'Stepped/Variable',
                      StringComparison.OrdinalIgnoreCase
                    ) == 0 ||
                    String.Compare(
                      oPrescription.FormViewerDetails.BasicDetails.DoseType
                        .Value,
                      'CC_STEPPEDVARIABLE',
                      StringComparison.OrdinalIgnoreCase
                    ) == 0 ||
                    String.Compare(
                      oPrescription.FormViewerDetails.BasicDetails.DoseType
                        .Value,
                      'Titrated',
                      StringComparison.OrdinalIgnoreCase
                    ) == 0 ||
                    String.Compare(
                      oPrescription.FormViewerDetails.BasicDetails.DoseType
                        .Value,
                      'CC_TITRATED',
                      StringComparison.OrdinalIgnoreCase
                    ) == 0
                  ) {
                    //oPrescription.SubscribeClickEvent(imgSteppedVariable);
                    imgSteppedVariable.MouseLeftButtonUp = (s,e) => { oPrescription.imgSteppedVariable_MouseLeftButtonUp(s,e)}
                    ToolTipService.SetToolTip(imgSteppedVariable, sTip);
                    paraLineDisplay.InLines.Add(
                      ObjectHelper.CreateObject(new iLabelInLineElement(), {
                        InLine: imgSteppedVariable,
                      })
                    );
                  }
                }
              } else if (
                isRowSlectd == 1 &&
                oPrescription.FormViewerDetails.BasicDetails.DoseType != null &&
                !String.IsNullOrEmpty(
                  oPrescription.FormViewerDetails.BasicDetails.DoseType.Value
                )
              ) {
                let sDoseTypeName: string = String.Empty;
                if (
                  oPrescription.FormViewerDetails.BasicDetails.DoseType !=
                    null &&
                  !String.IsNullOrEmpty(
                    oPrescription.FormViewerDetails.BasicDetails.DoseType.Value
                  ) &&
                  MedDoseTypeConceptCodeData.ConceptCodes != null &&
                  String.Compare(
                    oPrescription.FormViewerDetails.BasicDetails.DoseType.Value,
                    'CC_STEPPEDVARIABLE',
                    StringComparison.CurrentCultureIgnoreCase
                  ) == 0 &&
                  MedDoseTypeConceptCodeData.ConceptCodes.ContainsKey(
                    oPrescription.FormViewerDetails.BasicDetails.DoseType.Value
                  )
                ) {
                  sDoseTypeName =
                    MedDoseTypeConceptCodeData.ConceptCodes[
                      oPrescription.FormViewerDetails.BasicDetails.DoseType
                        .Value
                    ];
                }
                if (
                  String.Compare(
                    sDoseTypeName,
                    'Stepped/Variable',
                    StringComparison.OrdinalIgnoreCase
                  ) == 0
                ) {
                  let sPrescriptionItemOId: string =
                    oPrescription.PrescriptionItemOID.ToString();
                  if (
                    !String.IsNullOrEmpty(
                      oPrescription.FormViewerDetails.BasicDetails
                        .IdentifyingName
                    ) &&
                    !String.IsNullOrEmpty(oPrescription.PrescriptionType)
                  ) {
                    sPrescriptionItemOId =
                      oPrescription.PrescriptionItemOID.ToString() +
                      '*' +
                      oPrescription.FormViewerDetails.BasicDetails
                        .IdentifyingName +
                      '*' +
                      AppSessionInfo.AMCV +
                      '*' +
                      'EPR' +
                      '*' +
                      (oPrescription.IsResolveGrid ? 'RHS' : 'LHS');
                  } else if (
                    !String.IsNullOrEmpty(
                      oPrescription.FormViewerDetails.BasicDetails
                        .IdentifyingName
                    ) &&
                    String.IsNullOrEmpty(oPrescription.PrescriptionType)
                  ) {
                    sPrescriptionItemOId =
                      oPrescription.PrescribableItemDetailOID.ToString() +
                      '*' +
                      oPrescription.FormViewerDetails.BasicDetails
                        .IdentifyingName +
                      '*' +
                      AppSessionInfo.AMCV +
                      '*' +
                      'SYS';
                  }
                  let sTip: string =
                    Resource.prescribedrugs.CC_DOSE_ICO_Tooltip;
                  let imgSteppedVariable: Image = new Image();
                  imgSteppedVariable.Margin = new Thickness(2, 0, 2, 0);
                  imgSteppedVariable.Name = sDoseTypeName;
                  imgSteppedVariable.Cursor = Cursors.Hand;
                  imgSteppedVariable.Stretch = Stretch.None;
                  imgSteppedVariable.Source = new BitmapImage(
                    new Uri(
                      MedImage.GetPath(MedImages.SteppedVariable),
                      UriKind.RelativeOrAbsolute
                    )
                  );
                  imgSteppedVariable.Tag = sPrescriptionItemOId;
                  if (
                    String.Compare(
                      oPrescription.FormViewerDetails.BasicDetails.DoseType
                        .Value,
                      'CC_STEPPEDVARIABLE',
                      StringComparison.OrdinalIgnoreCase
                    ) == 0
                  )
                  //oPrescription.SubscribeClickEvent(imgSteppedVariable);
                  imgSteppedVariable.MouseLeftButtonUp = (s,e) => { oPrescription.imgSteppedVariable_MouseLeftButtonUp(s,e)}
                  ToolTipService.SetToolTip(imgSteppedVariable, sTip);
                  paraLineDisplay.InLines.Add(
                    ObjectHelper.CreateObject(new iLabelInLineElement(), {
                      InLine: imgSteppedVariable,
                    })
                  );
                }
                if (
                  oPrescription.FormViewerDetails.BasicDetails.DoseType !=
                    null &&
                  !String.IsNullOrEmpty(
                    oPrescription.FormViewerDetails.BasicDetails.DoseType.Value
                  ) &&
                  MedDoseTypeConceptCodeData.ConceptCodes != null &&
                  (String.Compare(
                    oPrescription.FormViewerDetails.BasicDetails.DoseType.Value,
                    'Conditional',
                    StringComparison.OrdinalIgnoreCase
                  ) == 0 ||
                    String.Compare(
                      oPrescription.FormViewerDetails.BasicDetails.DoseType
                        .Value,
                      'CC_CONDNLDSNG',
                      StringComparison.OrdinalIgnoreCase
                    ) == 0 ||
                    String.Compare(
                      oPrescription.FormViewerDetails.BasicDetails.DoseType
                        .Value,
                      'Titrated',
                      StringComparison.OrdinalIgnoreCase
                    ) == 0 ||
                    (String.Compare(
                      oPrescription.FormViewerDetails.BasicDetails.DoseType
                        .Value,
                      'CC_TITRATED',
                      StringComparison.OrdinalIgnoreCase
                    ) == 0 &&
                      MedDoseTypeConceptCodeData.ConceptCodes.ContainsKey(
                        oPrescription.FormViewerDetails.BasicDetails.DoseType
                          .Value
                      )))
                ) {
                  sDoseTypeName =
                    MedDoseTypeConceptCodeData.ConceptCodes[
                      oPrescription.FormViewerDetails.BasicDetails.DoseType
                        .Value
                    ];
                  if (
                    String.Compare(
                      sDoseTypeName,
                      'STEPPED',
                      StringComparison.OrdinalIgnoreCase
                    ) == 0 ||
                    String.Compare(
                      sDoseTypeName,
                      'VARIABLE',
                      StringComparison.OrdinalIgnoreCase
                    ) == 0 ||
                    String.Compare(
                      sDoseTypeName,
                      'Stepped/Variable',
                      StringComparison.OrdinalIgnoreCase
                    ) == 0 ||
                    String.Compare(
                      sDoseTypeName,
                      'Conditional',
                      StringComparison.OrdinalIgnoreCase
                    ) == 0 ||
                    String.Compare(
                      sDoseTypeName,
                      'Titrated',
                      StringComparison.OrdinalIgnoreCase
                    ) == 0
                  ) {
                    let sPrescriptionItemOId: string =
                      oPrescription.PrescriptionItemOID.ToString();
                    if (
                      !String.IsNullOrEmpty(
                        oPrescription.FormViewerDetails.BasicDetails
                          .IdentifyingName
                      ) &&
                      !String.IsNullOrEmpty(oPrescription.PrescriptionType)
                    ) {
                      sPrescriptionItemOId =
                        oPrescription.PrescriptionItemOID.ToString() +
                        '*' +
                        oPrescription.FormViewerDetails.BasicDetails
                          .IdentifyingName +
                        '*' +
                        AppSessionInfo.AMCV +
                        '*' +
                        'EPR' +
                        '*' +
                        (oPrescription.IsResolveGrid ? 'RHS' : 'LHS');
                    } else if (
                      !String.IsNullOrEmpty(
                        oPrescription.FormViewerDetails.BasicDetails
                          .IdentifyingName
                      ) &&
                      String.IsNullOrEmpty(oPrescription.PrescriptionType)
                    ) {
                      if (
                        String.Compare(
                          oPrescription.FormViewerDetails.BasicDetails.DoseType
                            .Value,
                          'CC_TITRATED',
                          StringComparison.OrdinalIgnoreCase
                        ) == 0
                      ) {
                        sPrescriptionItemOId =
                          oPrescription.FormViewerDetails.BasicDetails
                            .IdentifyingName +
                          '*' +
                          oPrescription.FormViewerDetails.BasicDetails.Dose +
                          '*' +
                          (oPrescription.FormViewerDetails.BasicDetails
                            .DoseUOM != null
                            ? oPrescription.FormViewerDetails.BasicDetails
                                .DoseUOM.DisplayText
                            : String.Empty) +
                          '*' +
                          'SYS';
                      } else {
                        sPrescriptionItemOId =
                          oPrescription.PrescriptionItemOID.ToString() +
                          '*' +
                          oPrescription.FormViewerDetails.BasicDetails
                            .IdentifyingName +
                          '*' +
                          AppSessionInfo.AMCV +
                          '*' +
                          'SYS';
                      }
                    }
                    let sTip: string =
                      Resource.prescribedrugs.CC_DOSE_ICO_Tooltip;
                    let imgSteppedVariable: Image = new Image();
                    imgSteppedVariable.Margin = new Thickness(2, 0, 2, 0);
                    imgSteppedVariable.Name = sDoseTypeName;
                    imgSteppedVariable.Cursor = Cursors.Hand;
                    imgSteppedVariable.Stretch = Stretch.None;
                    imgSteppedVariable.Source = new BitmapImage(
                      new Uri(
                        MedImage.GetPath(MedImages.SteppedVariable),
                        UriKind.RelativeOrAbsolute
                      )
                    );
                    if (
                      (String.Compare(
                        oPrescription.FormViewerDetails.BasicDetails.DoseType
                          .Value,
                        'Conditional',
                        StringComparison.OrdinalIgnoreCase
                      ) == 0 ||
                        String.Compare(
                          oPrescription.FormViewerDetails.BasicDetails.DoseType
                            .Value,
                          'CC_CONDNLDSNG',
                          StringComparison.OrdinalIgnoreCase
                        ) == 0 ||
                        String.Compare(
                          oPrescription.FormViewerDetails.BasicDetails.DoseType
                            .Value,
                          'Titrated',
                          StringComparison.OrdinalIgnoreCase
                        ) == 0 ||
                        String.Compare(
                          oPrescription.FormViewerDetails.BasicDetails.DoseType
                            .Value,
                          'CC_TITRATED',
                          StringComparison.OrdinalIgnoreCase
                        ) == 0 ||
                        String.Compare(
                          oPrescription.FormViewerDetails.BasicDetails.DoseType
                            .Value,
                          'CC_STEPPEDVARIABLE',
                          StringComparison.OrdinalIgnoreCase
                        ) == 0 ||
                        String.Compare(
                          oPrescription.FormViewerDetails.BasicDetails.DoseType
                            .Value,
                          'Stepped/Variable',
                          StringComparison.OrdinalIgnoreCase
                        ) == 0) &&
                      String.Compare(
                        oPrescription.OperationMode,
                        'N',
                        StringComparison.OrdinalIgnoreCase
                      ) == 0
                    ) {
                      imgSteppedVariable.Tag = oPrescription;
                    } else {
                      if (
                        String.Compare(
                          oPrescription.FormViewerDetails.BasicDetails.DoseType
                            .Value,
                          'CC_CONDNLDSNG',
                          StringComparison.OrdinalIgnoreCase
                        ) == 0
                      ) {
                        imgSteppedVariable.Tag = oPrescription;
                      } else {
                        imgSteppedVariable.Tag = sPrescriptionItemOId;
                      }
                    }
                    if (
                      (String.Compare(
                        oPrescription.FormViewerDetails.BasicDetails.DoseType
                          .Value,
                        'Conditional',
                        StringComparison.OrdinalIgnoreCase
                      ) == 0 ||
                        String.Compare(
                          oPrescription.FormViewerDetails.BasicDetails.DoseType
                            .Value,
                          'CC_CONDNLDSNG',
                          StringComparison.OrdinalIgnoreCase
                        ) == 0) &&
                      oPrescription.FormViewerDetails.BasicDetails
                        .IsConditionalExists
                    ) {
                      //oPrescription.SubscribeClickEvent(imgSteppedVariable);
                      imgSteppedVariable.MouseLeftButtonUp = (s,e) => { oPrescription.imgSteppedVariable_MouseLeftButtonUp(s,e)}
                      ToolTipService.SetToolTip(imgSteppedVariable, sTip);
                      paraLineDisplay.InLines.Add(
                        ObjectHelper.CreateObject(new iLabelInLineElement(), {
                          InLine: imgSteppedVariable,
                        })
                      );
                    } else if (
                      String.Compare(
                        oPrescription.FormViewerDetails.BasicDetails.DoseType
                          .Value,
                        'Stepped/Variable',
                        StringComparison.OrdinalIgnoreCase
                      ) == 0 ||
                      String.Compare(
                        oPrescription.FormViewerDetails.BasicDetails.DoseType
                          .Value,
                        'CC_STEPPEDVARIABLE',
                        StringComparison.OrdinalIgnoreCase
                      ) == 0 ||
                      String.Compare(
                        oPrescription.FormViewerDetails.BasicDetails.DoseType
                          .Value,
                        'Titrated',
                        StringComparison.OrdinalIgnoreCase
                      ) == 0 ||
                      String.Compare(
                        oPrescription.FormViewerDetails.BasicDetails.DoseType
                          .Value,
                        'CC_TITRATED',
                        StringComparison.OrdinalIgnoreCase
                      ) == 0
                    ) {
                      //oPrescription.SubscribeClickEvent(imgSteppedVariable);
                      imgSteppedVariable.MouseLeftButtonUp = (s,e) => { oPrescription.imgSteppedVariable_MouseLeftButtonUp(s,e)}
                      ToolTipService.SetToolTip(imgSteppedVariable, sTip);
                      paraLineDisplay.InLines.Add(
                        ObjectHelper.CreateObject(new iLabelInLineElement(), {
                          InLine: imgSteppedVariable,
                        })
                      );
                    }
                  }
                }
              }
              break;
            case 'CC_CARESET_ICO':
              let IsCareset: boolean = false;
              if (IsCareset) {
                if (
                  (isRowSlectd == 1 &&
                    oPrescription.FormViewerDetails.BasicDetails.DoseType !=
                      null &&
                    String.Compare(
                      oPrescription.FormViewerDetails.BasicDetails.DoseType
                        .Value,
                      'MEDDOSE2',
                      StringComparison.OrdinalIgnoreCase
                    ) == 0) ||
                  String.Compare(
                    oPrescription.FormViewerDetails.BasicDetails.DoseType.Value,
                    'MEDDOSE1',
                    StringComparison.OrdinalIgnoreCase
                  ) == 0
                ) {
                  let sTip: string =
                    Resource.prescribedrugs.CC_CARESET_ICO_Tooltip;
                  let img1: Image = new Image();
                  img1.Margin = new Thickness(2, 0, 2, 0);
                  img1.Stretch = Stretch.None;
                  img1.Source = new BitmapImage(
                    new Uri(
                      MedImage.GetPath(MedImages.CC_CARESET_ICO),
                      UriKind.RelativeOrAbsolute
                    )
                  );
                  ToolTipService.SetToolTip(img1, sTip);
                  paraLineDisplay.InLines.Add(
                    ObjectHelper.CreateObject(new iLabelInLineElement(), {
                      InLine: img1,
                    })
                  );
                }
              }
              break;
            case 'CC_SUPINS_ICO':
              if (
                (oPrescription.FormViewerDetails.BasicDetails
                  .SupplyInstructionText != null ||
                  oPrescription.FormViewerDetails.BasicDetails
                    .TechValSupplyInstructionText != null) &&
                !(
                  String.Equals(
                    sType,
                    'CC_MLDPRESITEM',
                    StringComparison.OrdinalIgnoreCase
                  ) && oPrescription.IsFluid
                )
              ) {
                let IsExceptOneStopSuppInstCnt: number = 0;
                let sTechnicalvaldateAT: string = String.Empty;
                let SToolTip: string = String.Empty;
                let sTipSupinst: string = String.Empty;
                let bInPatient: boolean = false;
                let bSupplyInstResolved: boolean = false;
                let UnresolvedSupInst: StringBuilder = new StringBuilder();
                if (
                  !oPrescription.FormViewerDetails.BasicDetails
                    .IsMedsAdminDischargePrescription &&
                  !String.IsNullOrEmpty(oPrescription.PrescriptionType) &&
                  (oPrescription.PrescriptionType ==
                    PrescriptionTypes.Inpatient ||
                    oPrescription.PrescriptionType ==
                      PrescriptionTypes.Foradministration)
                ) {
                  bInPatient = true;
                }
                if (
                  oPrescription.FormViewerDetails.BasicDetails.TechSupplyDTTM !=
                    null &&
                  oPrescription.FormViewerDetails.BasicDetails.TechSupplyDTTM !=
                    DateTime.MinValue
                ) {
                  sTechnicalvaldateAT =
                    Resource.medlistdetails.Techvalat_Header +
                    ':' +
                    oPrescription.FormViewerDetails.BasicDetails.TechSupplyDTTM.ToString(
                      CConstants.LongDateWithoutSecs
                    );
                }
                if (
                  isRowSlectd == 1 &&
                  oPrescription.FormViewerDetails.BasicDetails
                    .TechValSupplyInstructionText != null
                ) {
                  if (
                    !String.IsNullOrEmpty(
                      oPrescription.FormViewerDetails.BasicDetails.Itemsubtype
                    )
                  ) {
                    let SupplyInst: StringBuilder = new StringBuilder();
                    let sChdSupplyInst: StringBuilder = new StringBuilder();
                    let sSupplyInst: string = String.Empty;
                    oPrescription.FormViewerDetails.BasicDetails.TechValSupplyInstructionText.forEach(
                      (SupplyInstructionText) => {
                        let sTemp: string = String.Empty;
                        if (
                          SupplyInstructionText != null &&
                          !String.IsNullOrEmpty(
                            SupplyInstructionText.DisplayText
                          )
                        ) {
                          let arrSupInstText: string[] =
                            SupplyInstructionText.DisplayText.Split('^');
                          if (
                            arrSupInstText != null &&
                            arrSupInstText.length > 0
                          ) {
                            IsExceptOneStopSuppInstCnt =
                              IsExceptOneStopSuppInstCnt + 1;
                            SupplyInst.Append(arrSupInstText[0]);
                            SupplyInst.Append(';');
                          }
                          if (
                            arrSupInstText != null &&
                            arrSupInstText.length > 1
                          ) {
                            if (!String.IsNullOrEmpty(arrSupInstText[1])) {
                              IsExceptOneStopSuppInstCnt =
                                IsExceptOneStopSuppInstCnt + 1;
                              SupplyInst.Append(arrSupInstText[1]);
                            }
                          }
                        } else if (
                          !String.IsNullOrEmpty(SupplyInstructionText.Value)
                        ) {
                          let arrSupInstValue: string[] =
                            SupplyInstructionText.Value.Split('^');
                          if (
                            arrSupInstValue != null &&
                            arrSupInstValue.length > 0
                          ) {
                            if (
                              !String.IsNullOrEmpty(arrSupInstValue[0]) &&
                              (arrSupInstValue[0].Contains('CC_') ||
                                arrSupInstValue[0].Contains('TC_'))
                            ) {
                              if (
                                CommonBB.IsConceptCodeExists(
                                  arrSupInstValue[0],
                                  MedicationCommonConceptCodeData.ViewConceptCodes,
                                  (o1) => {
                                    sTemp = o1;
                                  }
                                )
                              ) {
                                IsExceptOneStopSuppInstCnt =
                                  IsExceptOneStopSuppInstCnt + 1;
                                SupplyInst.Append(sTemp);
                                SupplyInst.Append(' ');
                              }
                            }
                            if (SupplyInst.Length > 0) SupplyInst.Append(';');
                          }
                          if (
                            arrSupInstValue != null &&
                            arrSupInstValue.length > 1
                          ) {
                            let arrSupInstValue1: string[] =
                              arrSupInstValue[1].Split(',');
                            for (
                              let i: number = 0;
                              i < arrSupInstValue1.length;
                              i++
                            ) {
                              let arrChldSupInstValue: string[] =
                                arrSupInstValue1[i].Split(':');
                              if (
                                arrChldSupInstValue != null &&
                                arrChldSupInstValue.length > 0
                              ) {
                                if (
                                  !String.IsNullOrEmpty(
                                    arrChldSupInstValue[0]
                                  ) &&
                                  (arrChldSupInstValue[0].Contains('CC_') ||
                                    arrChldSupInstValue[0].Contains('TC_'))
                                ) {
                                  if (
                                    CommonBB.IsConceptCodeExists(
                                      arrChldSupInstValue[0].Trim(),
                                      MedicationCommonConceptCodeData.ViewConceptCodes,
                                      (o1) => {
                                        sTemp = o1;
                                      }
                                    )
                                  ) {
                                    IsExceptOneStopSuppInstCnt =
                                      IsExceptOneStopSuppInstCnt + 1;
                                    sChdSupplyInst.Append(sTemp);
                                    sChdSupplyInst.Append(',');
                                  }
                                } else {
                                  IsExceptOneStopSuppInstCnt =
                                    IsExceptOneStopSuppInstCnt + 1;
                                  sChdSupplyInst.Append(
                                    arrChldSupInstValue[0].ToString()
                                  );
                                  sChdSupplyInst.Append(': ');
                                }
                              }
                              if (
                                arrChldSupInstValue != null &&
                                arrChldSupInstValue.length > 1
                              ) {
                                if (
                                  !String.IsNullOrEmpty(
                                    arrChldSupInstValue[1]
                                  ) &&
                                  (arrChldSupInstValue[1].Contains('CC_') ||
                                    arrChldSupInstValue[1].Contains('TC_'))
                                ) {
                                  if (
                                    CommonBB.IsConceptCodeExists(
                                      arrChldSupInstValue[1],
                                      MedicationCommonConceptCodeData.ViewConceptCodes,
                                      (o1) => {
                                        sTemp = o1;
                                      }
                                    )
                                  ) {
                                    IsExceptOneStopSuppInstCnt =
                                      IsExceptOneStopSuppInstCnt + 1;
                                    sChdSupplyInst.Append(sTemp);
                                    sChdSupplyInst.Append(',');
                                  }
                                }
                              }
                            }
                            SupplyInst.Append(sChdSupplyInst.ToString());
                          }
                        }
                      }
                    );
                    if (SupplyInst != null && SupplyInst.Length > 0) {
                      sTipSupinst = SupplyInst.Remove(
                        SupplyInst.Length - 1,
                        1
                      ).ToString();
                      sTipSupinst = sTipSupinst.EndsWith(';')
                        ? sTipSupinst.Remove(sTipSupinst.length - 1)
                        : sTipSupinst;
                      sTipSupinst = sTipSupinst.StartsWith(';')
                        ? sTipSupinst.Remove(0, 1)
                        : sTipSupinst;
                    }
                    if (
                      !String.IsNullOrEmpty(sTipSupinst) &&
                      !String.IsNullOrEmpty(SToolTip)
                    ) {
                      SToolTip = SToolTip + sTipSupinst;
                    } else if (!String.IsNullOrEmpty(sTipSupinst)) {
                      SToolTip = sTipSupinst;
                    }
                  } else {
                    if (
                      oPrescription.FormViewerDetails.BasicDetails
                        .TechValSupplyInstructionText != null
                    ) {
                      let SupplyInst: StringBuilder = new StringBuilder();
                      oPrescription.FormViewerDetails.BasicDetails.TechValSupplyInstructionText.forEach(
                        (SupplyInstructionText) => {
                          let sTemp: string = String.Empty;
                          bSupplyInstResolved = false;
                          if (
                            SupplyInstructionText != null &&
                            !String.IsNullOrEmpty(
                              SupplyInstructionText.DisplayText
                            )
                          ) {
                            IsExceptOneStopSuppInstCnt =
                              IsExceptOneStopSuppInstCnt + 1;
                            SupplyInst.Append(
                              SupplyInstructionText.DisplayText
                            );
                            SupplyInst.Append(';');
                          } else if (
                            !String.IsNullOrEmpty(
                              SupplyInstructionText.Value
                            ) &&
                            (SupplyInstructionText.Value.Contains('CC_') ||
                              SupplyInstructionText.Value.Contains('TC_'))
                          ) {
                            if (
                              CommonBB.IsConceptCodeExists(
                                SupplyInstructionText.Value,
                                MedicationCommonConceptCodeData.ConceptCodes,
                                (o1) => {
                                  sTemp = o1;
                                }
                              )
                            ) {
                              IsExceptOneStopSuppInstCnt =
                                IsExceptOneStopSuppInstCnt + 1;
                              SupplyInst.Append(sTemp);
                              SupplyInst.Append(';');
                            } else if (
                              CommonBB.IsConceptCodeExists(
                                SupplyInstructionText.Value,
                                MedicationCommonConceptCodeData.ViewConceptCodes,
                                (o1) => {
                                  sTemp = o1;
                                }
                              )
                            ) {
                              IsExceptOneStopSuppInstCnt =
                                IsExceptOneStopSuppInstCnt + 1;
                              SupplyInst.Append(sTemp);
                              SupplyInst.Append(';');
                            } else {
                              SupplyInst.Append(SupplyInstructionText.Value);
                              SupplyInst.Append(';');
                              bSupplyInstResolved = true;
                            }
                          }
                          if (bSupplyInstResolved) {
                            UnresolvedSupInst.Append(
                              SupplyInstructionText.Value
                            );
                            {
                              UnresolvedSupInst.Append('~^~');
                            }
                          }
                        }
                      );
                      let ResolvedSupplyTermText: StringBuilder =
                        new StringBuilder();
                      if (
                        UnresolvedSupInst != null &&
                        UnresolvedSupInst.Length > 0
                      ) {
                        ResolvedSupplyTermText =
                          MCommonBB.GetSupplyInstructionTermText(
                            UnresolvedSupInst,
                            SupplyInst
                          );
                      }
                      if (
                        ResolvedSupplyTermText != null &&
                        ResolvedSupplyTermText.Length > 0
                      ) {
                        SupplyInst = ResolvedSupplyTermText;
                      }
                      if (SupplyInst != null && SupplyInst.Length > 0) {
                        sTipSupinst = SupplyInst.ToString();
                        sTipSupinst = sTipSupinst.EndsWith(';')
                          ? sTipSupinst.Remove(sTipSupinst.length - 1)
                          : sTipSupinst;
                        sTipSupinst = sTipSupinst.StartsWith(';')
                          ? sTipSupinst.Remove(0, 1)
                          : sTipSupinst;
                      }
                      if (
                        !String.IsNullOrEmpty(sTipSupinst) &&
                        !String.IsNullOrEmpty(SToolTip)
                      ) {
                        SToolTip = SToolTip + sTipSupinst;
                      } else if (!String.IsNullOrEmpty(sTipSupinst)) {
                        SToolTip = sTipSupinst;
                      }
                    }
                  }
                } else if (
                  isRowSlectd == 1 &&
                  oPrescription.FormViewerDetails.BasicDetails
                    .SupplyInstructionText != null
                ) {
                  let SupplyInsts: StringBuilder = new StringBuilder();
                  if (
                    !String.IsNullOrEmpty(
                      oPrescription.FormViewerDetails.BasicDetails
                        .SupplyInstructionText.Value
                    )
                  ) {
                    let arrSupInstValuees: string[] =
                      oPrescription.FormViewerDetails.BasicDetails.SupplyInstructionText.Value.Split(
                        ';'
                      );
                    let arrSupInsttext: string[] = null;
                    if (
                      !String.IsNullOrEmpty(
                        oPrescription.FormViewerDetails.BasicDetails
                          .SupplyInstructionText.DisplayText
                      )
                    ) {
                      arrSupInsttext =
                        oPrescription.FormViewerDetails.BasicDetails.SupplyInstructionText.DisplayText.Split(
                          ';'
                        );
                    }
                    let nCount: number = arrSupInstValuees.length;
                    for (let i: number = 0; i < nCount; i++) {
                      bSupplyInstResolved = false;
                      let sTemp: string = String.Empty;
                      if (
                        CommonBB.IsConceptCodeExists(
                          arrSupInstValuees[i],
                          MedicationCommonConceptCodeData.ConceptCodes,
                          (o1) => {
                            sTemp = o1;
                          }
                        )
                      ) {
                        IsExceptOneStopSuppInstCnt =
                          IsExceptOneStopSuppInstCnt + 1;
                        SupplyInsts.Append(sTemp);
                        SupplyInsts.Append(';');
                      } else if (
                        CommonBB.IsConceptCodeExists(
                          arrSupInstValuees[i],
                          MedicationCommonConceptCodeData.ViewConceptCodes,
                          (o1) => {
                            sTemp = o1;
                          }
                        )
                      ) {
                        IsExceptOneStopSuppInstCnt =
                          IsExceptOneStopSuppInstCnt + 1;
                        SupplyInsts.Append(sTemp);
                        SupplyInsts.Append(';');
                      } else if (
                        arrSupInsttext != null &&
                        arrSupInsttext.length > 0 &&
                        arrSupInsttext[i] != null &&
                        !String.IsNullOrEmpty(arrSupInsttext[i])
                      ) {
                        SupplyInsts.Append(arrSupInsttext[i]);
                        SupplyInsts.Append(';');
                      }
                    }
                  }
                  if (SupplyInsts != null && SupplyInsts.Length > 0) {
                    sTipSupinst = SupplyInsts.ToString();
                    sTipSupinst = sTipSupinst.EndsWith(';')
                      ? sTipSupinst.Remove(sTipSupinst.length - 1)
                      : sTipSupinst;
                    sTipSupinst = sTipSupinst.StartsWith(';')
                      ? sTipSupinst.Remove(0, 1)
                      : sTipSupinst;
                  }
                  if (
                    !String.IsNullOrEmpty(sTipSupinst) &&
                    !String.IsNullOrEmpty(SToolTip)
                  ) {
                    SToolTip = SToolTip + sTipSupinst;
                  } else if (!String.IsNullOrEmpty(sTipSupinst)) {
                    SToolTip = sTipSupinst;
                  }
                }
                if (
                  oPrescription.FormViewerDetails.BasicDetails
                    .FluidSupplyInstructionText != null &&
                  !String.IsNullOrEmpty(
                    oPrescription.FormViewerDetails.BasicDetails
                      .FluidSupplyInstructionText.Value
                  ) &&
                  !String.IsNullOrEmpty(
                    oPrescription.FormViewerDetails.BasicDetails
                      .FluidSupplyInstructionText.DisplayText
                  )
                ) {
                  let fluidSupplyInst: StringBuilder = new StringBuilder();
                  let arrFluidSupInstValuees: string[] =
                    oPrescription.FormViewerDetails.BasicDetails.FluidSupplyInstructionText.Value.Split(
                      ';'
                    );
                  let arrFluidSupInsttext: string[] =
                    oPrescription.FormViewerDetails.BasicDetails.FluidSupplyInstructionText.DisplayText.Split(
                      ';'
                    );
                  let nCount: number = arrFluidSupInsttext.length;
                  for (let i: number = 0; i < nCount; i++) {
                    bSupplyInstResolved = false;
                    let sTemp: string = String.Empty;
                    if (
                      CommonBB.IsConceptCodeExists(
                        arrFluidSupInstValuees[i],
                        MedicationCommonConceptCodeData.ConceptCodes,
                        (o1) => {
                          sTemp = o1;
                        }
                      )
                    ) {
                      IsExceptOneStopSuppInstCnt =
                        IsExceptOneStopSuppInstCnt + 1;
                      fluidSupplyInst.Append(sTemp);
                      fluidSupplyInst.Append(';');
                    } else if (
                      CommonBB.IsConceptCodeExists(
                        arrFluidSupInstValuees[i],
                        MedicationCommonConceptCodeData.ViewConceptCodes,
                        (o1) => {
                          sTemp = o1;
                        }
                      )
                    ) {
                      IsExceptOneStopSuppInstCnt =
                        IsExceptOneStopSuppInstCnt + 1;
                      fluidSupplyInst.Append(sTemp);
                      fluidSupplyInst.Append(';');
                    } else if (
                      arrFluidSupInstValuees[i] != null &&
                      !String.IsNullOrEmpty(arrFluidSupInstValuees[i])
                    ) {
                      fluidSupplyInst.Append(arrFluidSupInstValuees[i]);
                      fluidSupplyInst.Append(';');
                    }
                  }
                  if (fluidSupplyInst != null && fluidSupplyInst.Length > 0) {
                    sTipSupinst = fluidSupplyInst
                      .Remove(fluidSupplyInst.Length - 1, 1)
                      .ToString();
                    sTipSupinst = sTipSupinst.EndsWith(';')
                      ? sTipSupinst.Remove(sTipSupinst.length - 1)
                      : sTipSupinst;
                    sTipSupinst = sTipSupinst.StartsWith(';')
                      ? sTipSupinst.Remove(0, 1)
                      : sTipSupinst;
                  }
                  if (
                    !String.IsNullOrEmpty(sTipSupinst) &&
                    !String.IsNullOrEmpty(SToolTip)
                  ) {
                    SToolTip = SToolTip + sTipSupinst;
                  } else if (!String.IsNullOrEmpty(sTipSupinst)) {
                    SToolTip = sTipSupinst;
                  }
                }
                if (
                  !String.IsNullOrEmpty(
                    oPrescription.FormViewerDetails.BasicDetails.SupplyComments
                  )
                ) {
                  if (!String.IsNullOrEmpty(SToolTip)) {
                    SToolTip = SToolTip + Environment.NewLine;
                  }
                  SToolTip =
                    SToolTip +
                    Resource.medlistdetails.SupplyComments_Tooltip +
                    oPrescription.FormViewerDetails.BasicDetails.SupplyComments;
                }
                if (!String.IsNullOrEmpty(sTechnicalvaldateAT)) {
                  if (!String.IsNullOrEmpty(SToolTip)) {
                    SToolTip =
                      sTechnicalvaldateAT + Environment.NewLine + SToolTip;
                  } else if (
                    oPrescription.FormViewerDetails.BasicDetails.IsProdOption
                  ) {
                    SToolTip = sTechnicalvaldateAT;
                  }
                }
                if (
                  IsExceptOneStopSuppInstCnt > 0 ||
                  !String.IsNullOrEmpty(SToolTip) ||
                  oPrescription.FormViewerDetails.BasicDetails.IsProdOption ||
                  oPrescription.IsProdAvailForChild
                ) {
                  let img1: Image = new Image();
                  img1.Name = 'Supplyinstr';
                  img1.Tag = oPrescription;
                  img1.Cursor="Hand";
                  img1.Margin = new Thickness(2, 0, 2, 0);
                  img1.Stretch = Stretch.None;
                  img1.Source = new BitmapImage(
                    new Uri(
                      MedImage.GetPath(MedImages.CC_SUPINS_ICO),
                      UriKind.RelativeOrAbsolute
                    )
                  );
                  if (
                    !String.IsNullOrEmpty(SToolTip) &&
                    oPrescription.FormViewerDetails.BasicDetails
                      .RHSSupplyInstrIconTooltip
                  ) {
                    SToolTip =
                      SToolTip +
                      Environment.NewLine +
                      'View supply history for full details';
                    if (oPrescription.PrescriptionItemOID > 0) {
                      //oPrescription.SubscribeClickEvent(img1);
                      img1.MouseLeftButtonUp = (s,e) => { oPrescription.imgSteppedVariable_MouseLeftButtonUp(s,e)}
                    }
                  } else if (
                    String.IsNullOrEmpty(SToolTip) &&
                    oPrescription.FormViewerDetails.BasicDetails
                      .RHSSupplyInstrIconTooltip
                  ) {
                    SToolTip = 'View supply history for full details';
                    if (oPrescription.PrescriptionItemOID > 0) {
                      //oPrescription.SubscribeClickEvent(img1);
                      img1.MouseLeftButtonUp = (s,e) => { oPrescription.imgSteppedVariable_MouseLeftButtonUp(s,e)}
                    }
                  } else if (
                    !String.IsNullOrEmpty(SToolTip) &&
                    !oPrescription.FormViewerDetails.BasicDetails
                      .RHSSupplyInstrIconTooltip
                  ) {
                    SToolTip =
                      SToolTip +
                      Environment.NewLine +
                      'Click to view full details';
                    if (oPrescription.PrescriptionItemOID > 0) {
                      //oPrescription.SubscribeClickEvent(img1);
                      img1.MouseLeftButtonUp = (s,e) => { oPrescription.imgSteppedVariable_MouseLeftButtonUp(s,e)}
                    }
                  } else if (
                    String.IsNullOrEmpty(SToolTip) &&
                    oPrescription.FormViewerDetails.BasicDetails.IsProdOption &&
                    !oPrescription.FormViewerDetails.BasicDetails
                      .RHSSupplyInstrIconTooltip
                  ) {
                    SToolTip = 'Click to view full details';
                    //oPrescription.SubscribeClickEvent(img1);
                    img1.MouseLeftButtonUp = (s,e) => { oPrescription.imgSteppedVariable_MouseLeftButtonUp(s,e)}
                  }
                  if (
                    oPrescription != null &&
                    oPrescription.FormViewerDetails != null &&
                    oPrescription.FormViewerDetails.BasicDetails != null &&
                    ((oPrescription.FormViewerDetails.BasicDetails
                      .Itemsubtype != null &&
                      String.Equals(
                        oPrescription.FormViewerDetails.BasicDetails
                          .Itemsubtype,
                        CConstants.SUBTYPE,
                        StringComparison.OrdinalIgnoreCase
                      )) ||
                      oPrescription.IsMCIChildcomponent ||
                      (oPrescription.FormViewerDetails.BasicDetails
                        .MCILoerenzoID != null &&
                        String.Equals(
                          oPrescription.FormViewerDetails.BasicDetails
                            .MCILoerenzoID,
                          CConstants.ADHOC_ITEM_LORENZOID,
                          StringComparison.CurrentCultureIgnoreCase
                        )) ||
                      (oPrescription.FormViewerDetails.BasicDetails
                        .InfusionDetails != null &&
                        oPrescription.FormViewerDetails.BasicDetails
                          .InfusionDetails.InfusionType != null &&
                        !String.IsNullOrEmpty(
                          oPrescription.FormViewerDetails.BasicDetails
                            .InfusionDetails.InfusionType.Value
                        ) &&
                        (String.Equals(
                          oPrescription.FormViewerDetails.BasicDetails
                            .InfusionDetails.InfusionType.Value,
                          InfusionTypeCode.CONTINUOUS,
                          StringComparison.CurrentCultureIgnoreCase
                        ) ||
                          String.Equals(
                            oPrescription.FormViewerDetails.BasicDetails
                              .InfusionDetails.InfusionType.Value,
                            InfusionTypeCode.INTERMITTENT,
                            StringComparison.CurrentCultureIgnoreCase
                          ) ||
                          String.Equals(
                            oPrescription.FormViewerDetails.BasicDetails
                              .InfusionDetails.InfusionType.Value,
                            InfusionTypeCode.PCA,
                            StringComparison.CurrentCultureIgnoreCase
                          ) ||
                          String.Equals(
                            oPrescription.FormViewerDetails.BasicDetails
                              .InfusionDetails.InfusionType.Value,
                            InfusionTypeCode.SINGLEDOSEVOLUME,
                            StringComparison.CurrentCultureIgnoreCase
                          )) &&
                        oPrescription.FormViewerDetails.BasicDetails
                          .InfusionDetails.FluidSelectvalue != null))
                  ) {
                    oPrescription.UnSubscribeClickEvent(img1);
                    if (
                      ((!String.IsNullOrEmpty(SToolTip) ||
                        oPrescription.IsProdAvailForChild) &&
                        oPrescription.FormViewerDetails.BasicDetails
                          .RHSSupplyInstrIconTooltip) ||
                      ((String.IsNullOrEmpty(SToolTip) ||
                        oPrescription.IsProdAvailForChild) &&
                        oPrescription.FormViewerDetails.BasicDetails
                          .RHSSupplyInstrIconTooltip)
                    ) {
                      SToolTip = 'View supply history for full details';
                      if (oPrescription.PrescriptionItemOID > 0) {
                        //oPrescription.SubscribeClickEvent(img1);
                        img1.MouseLeftButtonUp = (s,e) => { oPrescription.imgSteppedVariable_MouseLeftButtonUp(s,e)}
                      }
                    } else if (
                      (!String.IsNullOrEmpty(SToolTip) ||
                        oPrescription.IsProdAvailForChild) &&
                      !oPrescription.FormViewerDetails.BasicDetails
                        .RHSSupplyInstrIconTooltip
                    ) {
                      SToolTip = 'Click to view full details';
                      if (oPrescription.PrescriptionItemOID > 0) {
                        //oPrescription.SubscribeClickEvent(img1);
                        img1.MouseLeftButtonUp = (s,e) => { oPrescription.imgSteppedVariable_MouseLeftButtonUp(s,e)}
                      }
                    } else if (
                      (String.IsNullOrEmpty(SToolTip) ||
                        oPrescription.IsProdAvailForChild) &&
                      oPrescription.FormViewerDetails.BasicDetails
                        .IsProdOption &&
                      !oPrescription.FormViewerDetails.BasicDetails
                        .RHSSupplyInstrIconTooltip
                    ) {
                      SToolTip = 'Click to view full details';
                      oPrescription.SubscribeClickEvent(img1);
                    }
                  }
                  ToolTipService.SetToolTip(
                    img1,
                    ObjectHelper.CreateObject(new iLabel(), {
                      Text: SToolTip,
                      IsWordwrap: true,
                      MaxWidth: 250,
                    })
                  );
                  paraLineDisplay.InLines.Add(
                    ObjectHelper.CreateObject(new iLabelInLineElement(), {
                      InLine: img1,
                    })
                  );
                }
              }
              break;
            case 'CC_ADDCOM_ICO':
              if (
                isRowSlectd == 1 &&
                !String.IsNullOrEmpty(
                  oPrescription.FormViewerDetails.BasicDetails
                    .AdditionalComments
                )
              ) {
                let img1: Image = new Image();
                img1.Margin = new Thickness(2, 0, 2, 0);
                img1.Stretch = Stretch.None;
                img1.Source = new BitmapImage(
                  new Uri(
                    MedImage.GetPath(MedImages.CC_ADDCOM_ICO),
                    UriKind.RelativeOrAbsolute
                  )
                );
                ToolTipService.SetToolTip(
                  img1,
                  ObjectHelper.CreateObject(new iLabel(), {
                    Text: oPrescription.FormViewerDetails.BasicDetails
                      .AdditionalComments,
                    IsWordwrap: true,
                    MaxWidth: 250,
                  })
                );
                paraLineDisplay.InLines.Add(
                  ObjectHelper.CreateObject(new iLabelInLineElement(), {
                    InLine: img1,
                  })
                );
              }
              break;
            case 'CC_OMIT_ICO':
              if (oPrescription != null) {
                if (
                  !String.IsNullOrEmpty(oPrescription.PrescriptionItemStatus) &&
                  !String.Equals(
                    oPrescription.PrescriptionItemStatus,
                    CConstants.COMPLETED
                  ) &&
                  !String.Equals(
                    oPrescription.PrescriptionItemStatus,
                    CConstants.CANCELLED
                  ) &&
                  !String.Equals(
                    oPrescription.PrescriptionItemStatus,
                    CConstants.DISCONTINUED
                  ) &&
                  String.Compare(
                    CConstants.CancelledStatusTermText,
                    oPrescription.PrescriptionItemStatus,
                    StringComparison.CurrentCultureIgnoreCase
                  ) != 0 &&
                  String.Compare(
                    CConstants.CompletedStatusTermText,
                    oPrescription.PrescriptionItemStatus,
                    StringComparison.CurrentCultureIgnoreCase
                  ) != 0 &&
                  String.Compare(
                    CConstants.DiscontinueStatusTermText,
                    oPrescription.PrescriptionItemStatus,
                    StringComparison.CurrentCultureIgnoreCase
                  ) != 0 &&
                  (!String.Equals(
                    oPrescription.PrescriptionItemStatus,
                    CConstants.Precatalog
                  ) ||
                    !String.Equals(
                      oPrescription.PrescriptionItemStatus,
                      CConstants.NONCATALOGUEITEM
                    ))
                ) {
                  if (isRowSlectd == 1) {
                    if (
                      oPrescription.FormViewerDetails != null &&
                      oPrescription.FormViewerDetails.BasicDetails != null &&
                      !String.IsNullOrEmpty(
                        oPrescription.FormViewerDetails.BasicDetails
                          .OmitComments
                      )
                    ) {
                      let IsDST: boolean, IsAmbiguous, IsInvalid;
                      let ToolTip: string = String.Empty;
                      if (
                        oPrescription.FormViewerDetails.BasicDetails
                          .IsinDefiniteOmit &&
                        oPrescription.FormViewerDetails.BasicDetails
                          .IsinDefiniteOmitDTTM != DateTime.MinValue
                      ) {
                        ToolTip =
                          Resource.DrugDetails.IsOmitIndefinite_Tooltip +
                          Environment.NewLine;
                        ToolTip =
                          ToolTip +
                          CConstants.TooltipFrom +
                          ' ' +
                          oPrescription.FormViewerDetails.BasicDetails.IsinDefiniteOmitDTTM.ConvertToUser(
                            (o1) => {
                              IsDST = o1;
                            },
                            (o2) => {
                              IsAmbiguous = o2;
                            },
                            (o3) => {
                              IsInvalid = o3;
                            }
                          ).ToDateTimeString(
                            IsDST,
                            IsAmbiguous,
                            CConstants.LongDateWithoutSecs
                          ) +
                          Environment.NewLine;
                      } else {
                        ToolTip =
                          Resource.DrugDetails.FutureOmitSlots_Tooltip +
                          Environment.NewLine;
                      }
                      if (
                        !String.IsNullOrEmpty(
                          oPrescription.FormViewerDetails.BasicDetails
                            .OmitComments
                        ) &&
                        !String.IsNullOrEmpty(
                          oPrescription.FormViewerDetails.BasicDetails.OmittedBy
                        )
                      ) {
                        ToolTip =
                          ToolTip +
                          CConstants.TooltipComments +
                          ' ' +
                          oPrescription.FormViewerDetails.BasicDetails
                            .OmitComments +
                          Environment.NewLine;
                        ToolTip =
                          ToolTip +
                          CConstants.TooltipOmittedBy +
                          ' ' +
                          oPrescription.FormViewerDetails.BasicDetails
                            .OmittedBy;
                      }
                      let img1: Image = new Image();
                      img1.Margin = new Thickness(2, 0, 2, 0);
                      img1.Stretch = Stretch.None;
                      img1.Source = new BitmapImage(
                        new Uri(
                          MedImage.GetPath(MedImages.CC_OMIT_ICO),
                          UriKind.RelativeOrAbsolute
                        )
                      );
                      ToolTipService.SetToolTip(
                        img1,
                        ObjectHelper.CreateObject(new iLabel(), {
                          Text: ToolTip,
                          IsWordwrap: true,
                          MaxWidth: 250,
                        })
                      );
                      paraLineDisplay.InLines.Add(
                        ObjectHelper.CreateObject(new iLabelInLineElement(), {
                          InLine: img1,
                        })
                      );
                    }
                  }
                }
              }
              break;
            case 'CC_REVIEW_ICO':
              if (oPrescription != null) {
                if (
                  (!String.IsNullOrEmpty(
                    oPrescription.PrescriptionItemStatus
                  ) &&
                    !String.Equals(
                      oPrescription.PrescriptionItemStatus,
                      CConstants.COMPLETED
                    ) &&
                    !String.Equals(
                      oPrescription.PrescriptionItemStatus,
                      CConstants.CANCELLED
                    ) &&
                    !String.Equals(
                      oPrescription.PrescriptionItemStatus,
                      CConstants.DISCONTINUED
                    ) &&
                    (!String.Equals(
                      oPrescription.PrescriptionItemStatus,
                      CConstants.Precatalog
                    ) ||
                      !String.Equals(
                        oPrescription.PrescriptionItemStatus,
                        CConstants.NONCATALOGUEITEM
                      ))) ||
                  oPrescription.PrescriptionItemOID == 0
                ) {
                  if (isRowSlectd == 1) {
                    if (
                      oPrescription.FormViewerDetails != null &&
                      oPrescription.FormViewerDetails.BasicDetails != null &&
                      oPrescription.FormViewerDetails.BasicDetails
                        .InfusionDetails != null
                    ) {

                      if (oPrescription.FormViewerDetails.BasicDetails.InfusionDetails.ReviewafterDTTM != null &&
                        !DateTime.Equals(oPrescription.FormViewerDetails.BasicDetails.InfusionDetails.ReviewafterDTTM, DateTime.MinValue)) {
                        let IsDST: boolean, IsAmbiguous, IsInvalid;
                        let Tooltip: string = String.Empty;
                        if (
                          !String.IsNullOrEmpty(
                            oPrescription.FormViewerDetails.BasicDetails
                              .ReviewType
                          ) &&
                          String.Equals(
                            oPrescription.FormViewerDetails.BasicDetails
                              .ReviewType,
                            CConstants.ReviewGeneralType
                          )
                        ) {
                          Tooltip = Resource.DrugDetails.ReviewMedline_Tooltip;
                        } else if (
                          !String.IsNullOrEmpty(
                            oPrescription.FormViewerDetails.BasicDetails
                              .ReviewType
                          ) &&
                          String.Equals(
                            oPrescription.FormViewerDetails.BasicDetails
                              .ReviewType,
                            CConstants.ReviewOmittedType
                          )
                        ) {
                          Tooltip =
                            Resource.DrugDetails.OmittedDoseReview_Tooltip;
                        }
                        Tooltip =
                          Tooltip +
                          ' ' +
                          oPrescription.FormViewerDetails.BasicDetails.InfusionDetails.ReviewafterDTTM.ConvertToUser(
                            (o1) => {
                              IsDST = o1;
                            },
                            (o2) => {
                              IsAmbiguous = o2;
                            },
                            (o3) => {
                              IsInvalid = o3;
                            }
                          ).ToDateTimeString(
                            IsDST,
                            IsAmbiguous,
                            CConstants.LongDateWithoutSecs
                          ) +
                          Environment.NewLine;
                        if (
                          !String.IsNullOrEmpty(
                            oPrescription.FormViewerDetails.BasicDetails
                              .ReviewComments
                          )
                        ) {
                          Tooltip =
                            Tooltip +
                            oPrescription.FormViewerDetails.BasicDetails
                              .ReviewComments +
                            Environment.NewLine;
                        }
                        Tooltip =
                          Tooltip + CConstants.TooltipReviewRequestedBy + ' ';
                        if (
                          !String.IsNullOrEmpty(
                            oPrescription.FormViewerDetails.BasicDetails
                              .ReviewRequestedBy
                          )
                        ) {
                          Tooltip =
                            Tooltip +
                            oPrescription.FormViewerDetails.BasicDetails
                              .ReviewRequestedBy;
                        }
                        if (
                          oPrescription.FormViewerDetails.BasicDetails
                            .InfusionDetails.ReviewafterDTTM.Date <=
                          CommonBB.GetServerDateTime().Date
                        ) {
                          let img1: Image = new Image();
                          img1.Margin = new Thickness(2, 0, 2, 0);
                          img1.Stretch = Stretch.None;
                          img1.Source = new BitmapImage(
                            new Uri(
                              MedImage.GetPath(MedImages.CC_REVIEW_ICO),
                              UriKind.RelativeOrAbsolute
                            )
                          );
                          ToolTipService.SetToolTip(
                            img1,
                            ObjectHelper.CreateObject(new iLabel(), {
                              Text: Tooltip,
                              IsWordwrap: true,
                              MaxWidth: 'auto',
                            })
                          );
                          paraLineDisplay.InLines.Add(
                            ObjectHelper.CreateObject(
                              new iLabelInLineElement(),
                              { InLine: img1 }
                            )
                          );
                        }
                      }
                    }
                  }
                }
              }
              break;
            case 'CC_OMITSTATUSTEXT':
              if (oPrescription != null) {
                let Omittedstatus: string = String.Empty;
                if (
                  !String.IsNullOrEmpty(oPrescription.PrescriptionItemStatus) &&
                  !String.Equals(
                    oPrescription.PrescriptionItemStatus,
                    CConstants.COMPLETED
                  ) &&
                  !String.Equals(
                    oPrescription.PrescriptionItemStatus,
                    CConstants.CANCELLED
                  ) &&
                  !String.Equals(
                    oPrescription.PrescriptionItemStatus,
                    CConstants.DISCONTINUED
                  ) &&
                  String.Compare(
                    CConstants.CancelledStatusTermText,
                    oPrescription.PrescriptionItemStatus,
                    StringComparison.CurrentCultureIgnoreCase
                  ) != 0 &&
                  String.Compare(
                    CConstants.CompletedStatusTermText,
                    oPrescription.PrescriptionItemStatus,
                    StringComparison.CurrentCultureIgnoreCase
                  ) != 0 &&
                  String.Compare(
                    CConstants.DiscontinueStatusTermText,
                    oPrescription.PrescriptionItemStatus,
                    StringComparison.CurrentCultureIgnoreCase
                  ) != 0 &&
                  (!String.Equals(
                    oPrescription.PrescriptionItemStatus,
                    CConstants.Precatalog
                  ) ||
                    !String.Equals(
                      oPrescription.PrescriptionItemStatus,
                      CConstants.NONCATALOGUEITEM
                    ))
                ) {
                  if (isRowSlectd == 1) {
                    if (
                      oPrescription.FormViewerDetails != null &&
                      oPrescription.FormViewerDetails.BasicDetails != null &&
                      !String.IsNullOrEmpty(
                        oPrescription.FormViewerDetails.BasicDetails
                          .OmitComments
                      )
                    ) {
                      if (
                        oPrescription.FormViewerDetails.BasicDetails
                          .IsinDefiniteOmit &&
                        oPrescription.FormViewerDetails.BasicDetails
                          .IsinDefiniteOmitDTTM != DateTime.MinValue
                      ) {
                        Omittedstatus =
                          Resource.DrugDetails.IsOmitIndefinite_Tooltip;
                      } else {
                        Omittedstatus =
                          Resource.DrugDetails.FutureOmitSlots_Tooltip;
                      }
                    }
                  }
                }
                LineDisplayHelper.SetQualifierAndText(
                  Omittedstatus,
                  oMLD.objLineDisConfig[iCnt].CaseCode,
                  oMLD.objLineDisConfig[iCnt].FontStyleCode,
                  oMLD.objLineDisConfig[iCnt].Qualifier,
                  oMLD.sColorCode,
                  tbLineDisplay,
                  paraLineDisplay
                );
              }
              break;
            case 'CC_FLUID':
              if (
                isRowSlectd == 1 &&
                oPrescription.FormViewerDetails.BasicDetails.InfusionDetails !=
                  null &&
                ((oPrescription.FormViewerDetails.BasicDetails.InfusionDetails
                  .FluidSelectvalue != null &&
                  !String.IsNullOrEmpty(
                    oPrescription.FormViewerDetails.BasicDetails.InfusionDetails
                      .FluidSelectvalue.DisplayText
                  )) ||
                  !String.IsNullOrEmpty(
                    oPrescription.FormViewerDetails.BasicDetails.InfusionDetails
                      .FluidFreetext
                  ))
              ) {
                if (
                  !String.IsNullOrEmpty(
                    oPrescription.FormViewerDetails.BasicDetails.InfusionDetails
                      .FluidFreetext
                  )
                )
                  temp =
                    oPrescription.FormViewerDetails.BasicDetails.InfusionDetails
                      .FluidFreetext;
                else
                  temp =
                    oPrescription.FormViewerDetails.BasicDetails.InfusionDetails
                      .FluidSelectvalue.DisplayText;
                LineDisplayHelper.SetQualifierAndText(
                  temp,
                  oMLD.objLineDisConfig[iCnt].CaseCode,
                  oMLD.objLineDisConfig[iCnt].FontStyleCode,
                  oMLD.objLineDisConfig[iCnt].Qualifier,
                  oMLD.sColorCode,
                  tbLineDisplay,
                  paraLineDisplay
                );
              }
              break;
            case 'CC_VOLUME':
              if (
                isRowSlectd == 1 &&
                oPrescription.FormViewerDetails.BasicDetails.InfusionDetails !=
                  null &&
                !String.IsNullOrEmpty(
                  oPrescription.FormViewerDetails.BasicDetails.InfusionDetails
                    .FluidVolume
                ) &&
                oPrescription.FormViewerDetails.BasicDetails.InfusionDetails
                  .VolumeUOM != null &&
                !String.IsNullOrEmpty(
                  oPrescription.FormViewerDetails.BasicDetails.InfusionDetails
                    .VolumeUOM.DisplayText
                )
              ) {
                temp =
                  oPrescription.FormViewerDetails.BasicDetails.InfusionDetails
                    .FluidVolume +
                  Convert.ToChar(160).ToString() +
                  oPrescription.FormViewerDetails.BasicDetails.InfusionDetails
                    .VolumeUOM.DisplayText;
                LineDisplayHelper.SetQualifierAndText(
                  temp,
                  oMLD.objLineDisConfig[iCnt].CaseCode,
                  oMLD.objLineDisConfig[iCnt].FontStyleCode,
                  oMLD.objLineDisConfig[iCnt].Qualifier,
                  oMLD.sColorCode,
                  tbLineDisplay,
                  paraLineDisplay
                );
              }
              break;
            case 'CC_INFUSNPERIOD':
              if (
                isRowSlectd == 1 &&
                oPrescription.FormViewerDetails.BasicDetails.InfusionDetails !=
                  null &&
                oPrescription.FormViewerDetails.BasicDetails.InfusionDetails
                  .InfusionPeriod > 0 &&
                oPrescription.FormViewerDetails.BasicDetails.InfusionDetails
                  .InfusionPeriodUom != null &&
                !String.IsNullOrEmpty(
                  oPrescription.FormViewerDetails.BasicDetails.InfusionDetails
                    .InfusionPeriodUom.DisplayText
                )
              ) {
                temp =
                  oPrescription.FormViewerDetails.BasicDetails.InfusionDetails
                    .InfusionPeriod +
                  Convert.ToChar(160).ToString() +
                  oPrescription.FormViewerDetails.BasicDetails.InfusionDetails
                    .InfusionPeriodUom.DisplayText;
                LineDisplayHelper.SetQualifierAndText(
                  temp,
                  oMLD.objLineDisConfig[iCnt].CaseCode,
                  oMLD.objLineDisConfig[iCnt].FontStyleCode,
                  oMLD.objLineDisConfig[iCnt].Qualifier,
                  oMLD.sColorCode,
                  tbLineDisplay,
                  paraLineDisplay
                );
              } else if (
                isRowSlectd == 1 &&
                oPrescription.FormViewerDetails.BasicDetails.InfusionDetails !=
                  null &&
                oPrescription.FormViewerDetails.BasicDetails.InfusionDetails
                  .InfusionPeriod == 0 &&
                oPrescription.FormViewerDetails.BasicDetails.InfusionDetails
                  .InfusionPeriodUom != null &&
                !String.IsNullOrEmpty(
                  oPrescription.FormViewerDetails.BasicDetails.InfusionDetails
                    .InfusionPeriodUom.DisplayText
                )
              ) {
                temp =
                  Convert.ToChar(160).ToString() +
                  oPrescription.FormViewerDetails.BasicDetails.InfusionDetails
                    .InfusionPeriodUom.DisplayText;
                LineDisplayHelper.SetQualifierAndText(
                  temp,
                  oMLD.objLineDisConfig[iCnt].CaseCode,
                  oMLD.objLineDisConfig[iCnt].FontStyleCode,
                  oMLD.objLineDisConfig[iCnt].Qualifier,
                  oMLD.sColorCode,
                  tbLineDisplay,
                  paraLineDisplay
                );
              }
              break;
            case 'CC_INFUSIONRATE':
              if (isRowSlectd == 1) {
                if (
                  (String.Compare(
                    oPrescription.FormViewerDetails.BasicDetails.Itemsubtype,
                    DrugItemSubTypeCode.MEDICAL_GAS,
                    StringComparison.CurrentCultureIgnoreCase
                  ) == 0 ||
                    (oPrescription.FormViewerDetails.BasicDetails
                      .InfusionDetails != null &&
                      oPrescription.FormViewerDetails.BasicDetails
                        .InfusionDetails.InfusionType != null &&
                      !String.IsNullOrEmpty(
                        oPrescription.FormViewerDetails.BasicDetails
                          .InfusionDetails.InfusionType.Value
                      ) &&
                      (String.Compare(
                        oPrescription.FormViewerDetails.BasicDetails
                          .InfusionDetails.InfusionType.Value,
                        InfusionTypeCode.CONTINUOUS
                      ) == 0 ||
                        String.Compare(
                          oPrescription.FormViewerDetails.BasicDetails
                            .InfusionDetails.InfusionType.Value,
                          InfusionTypeCode.SINGLEDOSEVOLUME
                        ) == 0 ||
                        String.Compare(
                          oPrescription.FormViewerDetails.BasicDetails
                            .InfusionDetails.InfusionType.Value,
                          InfusionTypeCode.FLUID
                        ) == 0))) &&
                  oPrescription.FormViewerDetails.BasicDetails.DoseType !=
                    null &&
                  !String.IsNullOrEmpty(
                    oPrescription.FormViewerDetails.BasicDetails.DoseType
                      .DisplayText
                  ) &&
                  MedDoseTypeConceptCodeData.ConceptCodes != null &&
                  MedDoseTypeConceptCodeData.ConceptCodes.ContainsKey(
                    'CC_CONDNLDSNG'
                  ) &&
                  String.Compare(
                    oPrescription.FormViewerDetails.BasicDetails.DoseType
                      .DisplayText,
                    MedDoseTypeConceptCodeData.ConceptCodes['CC_CONDNLDSNG'],
                    StringComparison.CurrentCultureIgnoreCase
                  ) == 0
                ) {
                  LineDisplayHelper.SetQualifierAndText(
                    oPrescription.FormViewerDetails.BasicDetails.DoseType
                      .DisplayText,
                    oMLD.objLineDisConfig[iCnt].CaseCode,
                    oMLD.objLineDisConfig[iCnt].FontStyleCode,
                    oMLD.objLineDisConfig[iCnt].Qualifier,
                    oMLD.sColorCode,
                    tbLineDisplay,
                    paraLineDisplay
                  );
                } else {
                  if (
                    String.Compare(
                      oPrescription.FormViewerDetails.BasicDetails.Itemsubtype,
                      DrugItemSubTypeCode.MEDICAL_GAS,
                      StringComparison.CurrentCultureIgnoreCase
                    ) == 0 &&
                    oPrescription.FormViewerDetails.BasicDetails
                      .InfusionDetails != null &&
                    !String.IsNullOrEmpty(
                      oPrescription.FormViewerDetails.BasicDetails
                        .InfusionDetails.Rate
                    ) &&
                    oPrescription.FormViewerDetails.BasicDetails.InfusionDetails
                      .InfRateNumeratorUom != null &&
                    !String.IsNullOrEmpty(
                      oPrescription.FormViewerDetails.BasicDetails
                        .InfusionDetails.InfRateNumeratorUom.DisplayText
                    ) &&
                    oPrescription.FormViewerDetails.BasicDetails.InfusionDetails
                      .InfRateDinominatorUom != null &&
                    !String.IsNullOrEmpty(
                      oPrescription.FormViewerDetails.BasicDetails
                        .InfusionDetails.InfRateDinominatorUom.DisplayText
                    )
                  ) {
                    if (
                      !String.IsNullOrEmpty(
                        oPrescription.FormViewerDetails.BasicDetails
                          .InfusionDetails.UpperRate
                      )
                    ) {
                      temp =
                        oPrescription.FormViewerDetails.BasicDetails
                          .InfusionDetails.Rate +
                        ' - ' +
                        oPrescription.FormViewerDetails.BasicDetails
                          .InfusionDetails.UpperRate +
                        Convert.ToChar(160).ToString() +
                        oPrescription.FormViewerDetails.BasicDetails
                          .InfusionDetails.InfRateNumeratorUom.DisplayText +
                        '/' +
                        oPrescription.FormViewerDetails.BasicDetails
                          .InfusionDetails.InfRateDinominatorUom.DisplayText;
                    } else {
                      temp =
                        oPrescription.FormViewerDetails.BasicDetails
                          .InfusionDetails.Rate +
                        Convert.ToChar(160).ToString() +
                        oPrescription.FormViewerDetails.BasicDetails
                          .InfusionDetails.InfRateNumeratorUom.DisplayText +
                        '/' +
                        oPrescription.FormViewerDetails.BasicDetails
                          .InfusionDetails.InfRateDinominatorUom.DisplayText;
                    }
                    LineDisplayHelper.SetQualifierAndText(
                      temp,
                      oMLD.objLineDisConfig[iCnt].CaseCode,
                      oMLD.objLineDisConfig[iCnt].FontStyleCode,
                      oMLD.objLineDisConfig[iCnt].Qualifier,
                      oMLD.sColorCode,
                      tbLineDisplay,
                      paraLineDisplay
                    );
                  } else if (
                    (oPrescription.FormViewerDetails.BasicDetails
                      .InfusionDetails != null &&
                      oPrescription.FormViewerDetails.BasicDetails
                        .InfusionDetails.InfusionType != null &&
                      !String.IsNullOrEmpty(
                        oPrescription.FormViewerDetails.BasicDetails
                          .InfusionDetails.InfusionType.Value
                      )) ||
                    oPrescription.IsPGD == '1'
                  ) {
                    if (
                      oPrescription != null &&
                      oPrescription.FormViewerDetails != null &&
                      oPrescription.FormViewerDetails.BasicDetails != null &&
                      oPrescription.FormViewerDetails.BasicDetails
                        .InfusionDetails != null &&
                      oPrescription.FormViewerDetails.BasicDetails
                        .InfusionDetails.InfusionType != null &&
                      !String.IsNullOrEmpty(
                        oPrescription.FormViewerDetails.BasicDetails
                          .InfusionDetails.InfusionType.Value
                      ) &&
                      String.Compare(
                        oPrescription.FormViewerDetails.BasicDetails
                          .InfusionDetails.InfusionType.Value,
                        InfusionTypeCode.PCA,
                        StringComparison.CurrentCultureIgnoreCase
                      ) == 0 &&
                      !String.IsNullOrEmpty(
                        oPrescription.FormViewerDetails.BasicDetails
                          .InfusionDetails.BackgroundRate
                      ) &&
                      oPrescription.FormViewerDetails.BasicDetails
                        .InfusionDetails.BackgroundRateNumeratorUom != null &&
                      !String.IsNullOrEmpty(
                        oPrescription.FormViewerDetails.BasicDetails
                          .InfusionDetails.BackgroundRateNumeratorUom
                          .DisplayText
                      ) &&
                      oPrescription.FormViewerDetails.BasicDetails
                        .InfusionDetails.BackgroundRateDinominatorUom != null &&
                      !String.IsNullOrEmpty(
                        oPrescription.FormViewerDetails.BasicDetails
                          .InfusionDetails.BackgroundRateDinominatorUom
                          .DisplayText
                      )
                    ) {
                      temp =
                        oPrescription.FormViewerDetails.BasicDetails
                          .InfusionDetails.BackgroundRate +
                        Convert.ToChar(160).ToString() +
                        oPrescription.FormViewerDetails.BasicDetails
                          .InfusionDetails.BackgroundRateNumeratorUom
                          .DisplayText +
                        '/' +
                        oPrescription.FormViewerDetails.BasicDetails
                          .InfusionDetails.BackgroundRateDinominatorUom
                          .DisplayText;
                      LineDisplayHelper.SetQualifierAndText(
                        temp,
                        oMLD.objLineDisConfig[iCnt].CaseCode,
                        oMLD.objLineDisConfig[iCnt].FontStyleCode,
                        oMLD.objLineDisConfig[iCnt].Qualifier,
                        oMLD.sColorCode,
                        tbLineDisplay,
                        paraLineDisplay
                      );
                    } else {
                      if (
                        !String.IsNullOrEmpty(
                          oPrescription.FormViewerDetails.BasicDetails
                            .InfusionDetails.Rate
                        ) &&
                        oPrescription.FormViewerDetails.BasicDetails
                          .InfusionDetails.InfRateNumeratorUom != null &&
                        !String.IsNullOrEmpty(
                          oPrescription.FormViewerDetails.BasicDetails
                            .InfusionDetails.InfRateNumeratorUom.DisplayText
                        ) &&
                        oPrescription.FormViewerDetails.BasicDetails
                          .InfusionDetails.InfRateDinominatorUom != null &&
                        !String.IsNullOrEmpty(
                          oPrescription.FormViewerDetails.BasicDetails
                            .InfusionDetails.InfRateDinominatorUom.DisplayText
                        )
                      ) {
                        if (
                          !String.IsNullOrEmpty(
                            oPrescription.FormViewerDetails.BasicDetails
                              .InfusionDetails.UpperRate
                          )
                        ) {
                          temp =
                            oPrescription.FormViewerDetails.BasicDetails
                              .InfusionDetails.Rate +
                            ' - ' +
                            oPrescription.FormViewerDetails.BasicDetails
                              .InfusionDetails.UpperRate +
                            Convert.ToChar(160).ToString() +
                            oPrescription.FormViewerDetails.BasicDetails
                              .InfusionDetails.InfRateNumeratorUom.DisplayText +
                            '/' +
                            oPrescription.FormViewerDetails.BasicDetails
                              .InfusionDetails.InfRateDinominatorUom
                              .DisplayText;
                        } else {
                          temp =
                            oPrescription.FormViewerDetails.BasicDetails
                              .InfusionDetails.Rate +
                            Convert.ToChar(160).ToString() +
                            oPrescription.FormViewerDetails.BasicDetails
                              .InfusionDetails.InfRateNumeratorUom.DisplayText +
                            '/' +
                            oPrescription.FormViewerDetails.BasicDetails
                              .InfusionDetails.InfRateDinominatorUom
                              .DisplayText;
                        }
                        LineDisplayHelper.SetQualifierAndText(
                          temp,
                          oMLD.objLineDisConfig[iCnt].CaseCode,
                          oMLD.objLineDisConfig[iCnt].FontStyleCode,
                          oMLD.objLineDisConfig[iCnt].Qualifier,
                          oMLD.sColorCode,
                          tbLineDisplay,
                          paraLineDisplay
                        );
                      }
                    }
                  } else if (
                    oPrescription.FormViewerDetails.BasicDetails
                      .InfusionDetails != null &&
                    PatientContext.PrescriptionType ==
                      PrescriptionTypes.Clerking &&
                    oPrescription.FormViewerDetails.BasicDetails.InfusionDetails
                      .IsInfContiniousFormLoaded
                  ) {
                    if (
                      !String.IsNullOrEmpty(
                        oPrescription.FormViewerDetails.BasicDetails
                          .InfusionDetails.Rate
                      ) &&
                      oPrescription.FormViewerDetails.BasicDetails
                        .InfusionDetails.InfRateNumeratorUom != null &&
                      !String.IsNullOrEmpty(
                        oPrescription.FormViewerDetails.BasicDetails
                          .InfusionDetails.InfRateNumeratorUom.DisplayText
                      ) &&
                      oPrescription.FormViewerDetails.BasicDetails
                        .InfusionDetails.InfRateDinominatorUom != null &&
                      !String.IsNullOrEmpty(
                        oPrescription.FormViewerDetails.BasicDetails
                          .InfusionDetails.InfRateDinominatorUom.DisplayText
                      )
                    ) {
                      if (
                        !String.IsNullOrEmpty(
                          oPrescription.FormViewerDetails.BasicDetails
                            .InfusionDetails.UpperRate
                        )
                      ) {
                        temp =
                          oPrescription.FormViewerDetails.BasicDetails
                            .InfusionDetails.Rate +
                          ' - ' +
                          oPrescription.FormViewerDetails.BasicDetails
                            .InfusionDetails.UpperRate +
                          Convert.ToChar(160).ToString() +
                          oPrescription.FormViewerDetails.BasicDetails
                            .InfusionDetails.InfRateNumeratorUom.DisplayText +
                          '/' +
                          oPrescription.FormViewerDetails.BasicDetails
                            .InfusionDetails.InfRateDinominatorUom.DisplayText;
                      } else {
                        temp =
                          oPrescription.FormViewerDetails.BasicDetails
                            .InfusionDetails.Rate +
                          Convert.ToChar(160).ToString() +
                          oPrescription.FormViewerDetails.BasicDetails
                            .InfusionDetails.InfRateNumeratorUom.DisplayText +
                          '/' +
                          oPrescription.FormViewerDetails.BasicDetails
                            .InfusionDetails.InfRateDinominatorUom.DisplayText;
                      }
                      LineDisplayHelper.SetQualifierAndText(
                        temp,
                        oMLD.objLineDisConfig[iCnt].CaseCode,
                        oMLD.objLineDisConfig[iCnt].FontStyleCode,
                        oMLD.objLineDisConfig[iCnt].Qualifier,
                        oMLD.sColorCode,
                        tbLineDisplay,
                        paraLineDisplay
                      );
                    }
                  }
                }
              }
              break;
            case 'CC_INFUSNTYP':
              let _oInfusionLineItemVM: InfusionLineItemVM =
                oPrescription.FormViewerDetails.BasicDetails.InfusionDetails;
              if (
                isRowSlectd == 1 &&
                _oInfusionLineItemVM != null &&
                _oInfusionLineItemVM.InfusionType != null
              ) {
                let _InfusionType: string = String.Empty;
                if (
                  !String.IsNullOrEmpty(
                    _oInfusionLineItemVM.InfusionType.DisplayText
                  )
                ) {
                  _InfusionType =
                    _oInfusionLineItemVM.InfusionType.DisplayText.Trim();
                } else if (
                  !String.IsNullOrEmpty(_oInfusionLineItemVM.InfusionType.Value)
                ) {
                  _InfusionType =
                    InfusionTypeConceptCodeData.ConceptCodes.Where(
                      (x) => x.csCode == _oInfusionLineItemVM.InfusionType.Value
                    ).FirstOrDefault().csDescription;
                }
                LineDisplayHelper.SetQualifierAndText(
                  _InfusionType,
                  oMLD.objLineDisConfig[iCnt].CaseCode,
                  oMLD.objLineDisConfig[iCnt].FontStyleCode,
                  oMLD.objLineDisConfig[iCnt].Qualifier,
                  oMLD.sColorCode,
                  tbLineDisplay,
                  paraLineDisplay
                );
              }
              break;
            case 'CC_LUMEN':
              if (
                isRowSlectd == 1 &&
                oPrescription.FormViewerDetails.BasicDetails.InfusionDetails !=
                  null &&
                !String.IsNullOrEmpty(
                  oPrescription.FormViewerDetails.BasicDetails.InfusionDetails
                    .Lumen
                )
              ) {
                LineDisplayHelper.SetQualifierAndText(
                  oPrescription.FormViewerDetails.BasicDetails.InfusionDetails
                    .Lumen,
                  oMLD.objLineDisConfig[iCnt].CaseCode,
                  oMLD.objLineDisConfig[iCnt].FontStyleCode,
                  oMLD.objLineDisConfig[iCnt].Qualifier,
                  oMLD.sColorCode,
                  tbLineDisplay,
                  paraLineDisplay
                );
              }
              break;
            case 'CC_BOOSTERDOSE':
              if (
                isRowSlectd == 1 &&
                oPrescription.FormViewerDetails != null &&
                oPrescription.FormViewerDetails.BasicDetails != null &&
                oPrescription.FormViewerDetails.BasicDetails.InfusionDetails !=
                  null &&
                (oPrescription.FormViewerDetails.BasicDetails.InfusionDetails
                  .InfusionType != null ||
                  oPrescription.FormViewerDetails.BasicDetails.InfusionDetails
                    .IsInfContiniousFormLoaded)
              ) {
                if (
                  oPrescription.FormViewerDetails.BasicDetails
                    .InfusionDetails != null
                ) {
                  temp =
                    (oPrescription.FormViewerDetails.BasicDetails
                      .InfusionDetails.Boosterdose != null
                      ? oPrescription.FormViewerDetails.BasicDetails
                          .InfusionDetails.Boosterdose
                      : String.Empty) +
                    Convert.ToChar(160).ToString() +
                    (oPrescription.FormViewerDetails.BasicDetails
                      .InfusionDetails.Boosterdoseuom != null &&
                    !String.IsNullOrEmpty(
                      oPrescription.FormViewerDetails.BasicDetails
                        .InfusionDetails.Boosterdoseuom.DisplayText
                    )
                      ? oPrescription.FormViewerDetails.BasicDetails
                          .InfusionDetails.Boosterdoseuom.DisplayText
                      : String.Empty);
                  if (
                    !String.IsNullOrEmpty(temp) &&
                    !String.IsNullOrWhiteSpace(temp)
                  ) {
                    LineDisplayHelper.SetQualifierAndText(
                      temp,
                      oMLD.objLineDisConfig[iCnt].CaseCode,
                      oMLD.objLineDisConfig[iCnt].FontStyleCode,
                      oMLD.objLineDisConfig[iCnt].Qualifier,
                      oMLD.sColorCode,
                      tbLineDisplay,
                      paraLineDisplay
                    );
                  }
                }
              }
              break;
            case 'CC_BOLUS':
              if (
                isRowSlectd == 1 &&
                oPrescription.FormViewerDetails.BasicDetails.InfusionDetails !=
                  null &&
                oPrescription.FormViewerDetails.BasicDetails.InfusionDetails
                  .InfusionType != null &&
                String.Compare(
                  oPrescription.FormViewerDetails.BasicDetails.InfusionDetails
                    .InfusionType.Value,
                  InfusionTypeCode.PCA,
                  StringComparison.CurrentCultureIgnoreCase
                ) == 0 &&
                !String.IsNullOrEmpty(
                  oPrescription.FormViewerDetails.BasicDetails.InfusionDetails
                    .Bolus
                ) &&
                oPrescription.FormViewerDetails.BasicDetails.InfusionDetails
                  .BolusUOM != null &&
                !String.IsNullOrEmpty(
                  oPrescription.FormViewerDetails.BasicDetails.InfusionDetails
                    .BolusUOM.DisplayText
                )
              ) {
                temp =
                  oPrescription.FormViewerDetails.BasicDetails.InfusionDetails
                    .Bolus +
                  Convert.ToChar(160).ToString() +
                  oPrescription.FormViewerDetails.BasicDetails.InfusionDetails
                    .BolusUOM.DisplayText;
                LineDisplayHelper.SetQualifierAndText(
                  temp,
                  oMLD.objLineDisConfig[iCnt].CaseCode,
                  oMLD.objLineDisConfig[iCnt].FontStyleCode,
                  oMLD.objLineDisConfig[iCnt].Qualifier,
                  oMLD.sColorCode,
                  tbLineDisplay,
                  paraLineDisplay
                );
              }
              break;
            case 'CC_LOCKOUTPERIOD':
              if (
                isRowSlectd == 1 &&
                oPrescription.FormViewerDetails.BasicDetails.InfusionDetails !=
                  null &&
                oPrescription.FormViewerDetails.BasicDetails.InfusionDetails
                  .LockOutPeriod > 0 &&
                oPrescription.FormViewerDetails.BasicDetails.InfusionDetails
                  .LockoutDuration != null &&
                !String.IsNullOrEmpty(
                  oPrescription.FormViewerDetails.BasicDetails.InfusionDetails
                    .LockoutDuration.DisplayText
                ) &&
                oPrescription.FormViewerDetails.BasicDetails.InfusionDetails
                  .InfusionType != null &&
                String.Compare(
                  oPrescription.FormViewerDetails.BasicDetails.InfusionDetails
                    .InfusionType.Value,
                  InfusionTypeCode.PCA,
                  StringComparison.CurrentCultureIgnoreCase
                ) == 0
              ) {
                temp =
                  oPrescription.FormViewerDetails.BasicDetails.InfusionDetails
                    .LockOutPeriod +
                  Convert.ToChar(160).ToString() +
                  oPrescription.FormViewerDetails.BasicDetails.InfusionDetails
                    .LockoutDuration.DisplayText;
                LineDisplayHelper.SetQualifierAndText(
                  temp,
                  oMLD.objLineDisConfig[iCnt].CaseCode,
                  oMLD.objLineDisConfig[iCnt].FontStyleCode,
                  oMLD.objLineDisConfig[iCnt].Qualifier,
                  oMLD.sColorCode,
                  tbLineDisplay,
                  paraLineDisplay
                );
              }
              break;
            case 'CC_MAXDOSE':
              if (
                isRowSlectd == 1 &&
                oPrescription.FormViewerDetails.BasicDetails.InfusionDetails !=
                  null &&
                !String.IsNullOrEmpty(
                  oPrescription.FormViewerDetails.BasicDetails.InfusionDetails
                    .MaxDose
                ) &&
                oPrescription.FormViewerDetails.BasicDetails.InfusionDetails
                  .InfusionType != null &&
                String.Compare(
                  oPrescription.FormViewerDetails.BasicDetails.InfusionDetails
                    .InfusionType.Value,
                  InfusionTypeCode.PCA,
                  StringComparison.CurrentCultureIgnoreCase
                ) == 0
              ) {
                LineDisplayHelper.SetQualifierAndText(
                  oPrescription.FormViewerDetails.BasicDetails.InfusionDetails
                    .MaxDose,
                  oMLD.objLineDisConfig[iCnt].CaseCode,
                  oMLD.objLineDisConfig[iCnt].FontStyleCode,
                  oMLD.objLineDisConfig[iCnt].Qualifier,
                  oMLD.sColorCode,
                  tbLineDisplay,
                  paraLineDisplay
                );
              }
              break;
            case 'CC_DELVRYDEVICE':
              if (
                isRowSlectd == 1 &&
                oPrescription.FormViewerDetails.BasicDetails.InfusionDetails !=
                  null &&
                ((oPrescription.FormViewerDetails.BasicDetails.InfusionDetails
                  .DeliveryDevice != null &&
                  !String.IsNullOrEmpty(
                    oPrescription.FormViewerDetails.BasicDetails.InfusionDetails
                      .DeliveryDevice.DisplayText
                  )) ||
                  !String.IsNullOrEmpty(
                    oPrescription.FormViewerDetails.BasicDetails.InfusionDetails
                      .DeliveryDeviceFreetext
                  ))
              ) {
                if (
                  !String.IsNullOrEmpty(
                    oPrescription.FormViewerDetails.BasicDetails.InfusionDetails
                      .DeliveryDeviceFreetext
                  )
                )
                  temp =
                    oPrescription.FormViewerDetails.BasicDetails.InfusionDetails
                      .DeliveryDeviceFreetext;
                else
                  temp =
                    oPrescription.FormViewerDetails.BasicDetails.InfusionDetails
                      .DeliveryDevice.DisplayText;
                LineDisplayHelper.SetQualifierAndText(
                  temp,
                  oMLD.objLineDisConfig[iCnt].CaseCode,
                  oMLD.objLineDisConfig[iCnt].FontStyleCode,
                  oMLD.objLineDisConfig[iCnt].Qualifier,
                  oMLD.sColorCode,
                  tbLineDisplay,
                  paraLineDisplay
                );
              }
              break;
            case 'CC_CONCENTRATION':
              if (
                isRowSlectd == 1 &&
                oPrescription.FormViewerDetails.BasicDetails.InfusionDetails !=
                  null &&
                String.Compare(
                  oPrescription.FormViewerDetails.BasicDetails.Itemsubtype,
                  DrugItemSubTypeCode.MEDICAL_GAS,
                  StringComparison.CurrentCultureIgnoreCase
                ) == 0 &&
                ((oPrescription.FormViewerDetails.BasicDetails.InfusionDetails
                  .Concentration != null &&
                  !String.IsNullOrEmpty(
                    oPrescription.FormViewerDetails.BasicDetails.InfusionDetails
                      .Concentration.DisplayText
                  )) ||
                  (!String.IsNullOrEmpty(
                    oPrescription.FormViewerDetails.BasicDetails.InfusionDetails
                      .ConcentrationFreeText
                  ) &&
                    oPrescription.FormViewerDetails.BasicDetails.InfusionDetails
                      .ConcentrationFreeText != '0'))
              ) {
                if (
                  !String.IsNullOrEmpty(
                    oPrescription.FormViewerDetails.BasicDetails.InfusionDetails
                      .ConcentrationFreeText
                  )
                )
                  temp =
                    oPrescription.FormViewerDetails.BasicDetails.InfusionDetails
                      .ConcentrationFreeText + '%';
                else
                  temp =
                    oPrescription.FormViewerDetails.BasicDetails.InfusionDetails
                      .Concentration.DisplayText + '%';
                LineDisplayHelper.SetQualifierAndText(
                  temp,
                  oMLD.objLineDisConfig[iCnt].CaseCode,
                  oMLD.objLineDisConfig[iCnt].FontStyleCode,
                  oMLD.objLineDisConfig[iCnt].Qualifier,
                  oMLD.sColorCode,
                  tbLineDisplay,
                  paraLineDisplay
                );
              } else if (
                isRowSlectd == 1 &&
                oPrescription.FormViewerDetails.BasicDetails.InfusionDetails !=
                  null &&
                ((oPrescription.FormViewerDetails.BasicDetails.InfusionDetails
                  .InfusionType != null &&
                  !String.IsNullOrEmpty(
                    oPrescription.FormViewerDetails.BasicDetails.InfusionDetails
                      .InfusionType.Value
                  )) ||
                  oPrescription.FormViewerDetails.BasicDetails.InfusionDetails
                    .IsInfContiniousFormLoaded ||
                  (PatientContext.IsINFUSIONON &&
                    oPrescription.FormViewerDetails.BasicDetails.Route !=
                      null &&
                    oPrescription.FormViewerDetails.BasicDetails.Route.Tag !=
                      null &&
                    String.Equals(
                      oPrescription.FormViewerDetails.BasicDetails.Route.Tag.ToString(),
                      '1'
                    ) &&
                    oPrescription.FormViewerDetails.BasicDetails.InfusionDetails
                      .InfusionType == null)) &&
                !String.IsNullOrEmpty(
                  oPrescription.FormViewerDetails.BasicDetails.InfusionDetails
                    .LowConcentration
                ) &&
                oPrescription.FormViewerDetails.BasicDetails.InfusionDetails
                  .LowConcentrationUOM != null &&
                !String.IsNullOrEmpty(
                  oPrescription.FormViewerDetails.BasicDetails.InfusionDetails
                    .LowConcentrationUOM.DisplayText
                )
              ) {
                let StrCon: StringBuilder = new StringBuilder();
                StrCon.Append(
                  oPrescription.FormViewerDetails.BasicDetails.InfusionDetails
                    .LowConcentration
                );
                StrCon.Append(' ');
                StrCon.Append(
                  oPrescription.FormViewerDetails.BasicDetails.InfusionDetails
                    .LowConcentrationUOM.DisplayText
                );
                if (
                  !String.IsNullOrEmpty(
                    oPrescription.FormViewerDetails.BasicDetails.InfusionDetails
                      .UpperConcentration
                  ) &&
                  oPrescription.FormViewerDetails.BasicDetails.InfusionDetails
                    .UpperConcentrationUOM != null &&
                  !String.IsNullOrEmpty(
                    oPrescription.FormViewerDetails.BasicDetails.InfusionDetails
                      .UpperConcentrationUOM.DisplayText
                  )
                ) {
                  StrCon.Append('/');
                  StrCon.Append(
                    oPrescription.FormViewerDetails.BasicDetails.InfusionDetails
                      .UpperConcentration
                  );
                  StrCon.Append(' ');
                  StrCon.Append(
                    oPrescription.FormViewerDetails.BasicDetails.InfusionDetails
                      .UpperConcentrationUOM.DisplayText
                  );
                }
                if (StrCon != null && StrCon.Length > 0)
                  temp = StrCon.ToString();
                else temp = String.Empty;
                LineDisplayHelper.SetQualifierAndText(
                  temp,
                  oMLD.objLineDisConfig[iCnt].CaseCode,
                  oMLD.objLineDisConfig[iCnt].FontStyleCode,
                  oMLD.objLineDisConfig[iCnt].Qualifier,
                  oMLD.sColorCode,
                  tbLineDisplay,
                  paraLineDisplay
                );
              }
              break;
            case 'CC_TRGTSATURATIONRNG':
              if (
                isRowSlectd == 1 &&
                oPrescription.FormViewerDetails.BasicDetails.InfusionDetails !=
                  null &&
                String.Compare(
                  oPrescription.FormViewerDetails.BasicDetails.Itemsubtype,
                  DrugItemSubTypeCode.MEDICAL_GAS,
                  StringComparison.CurrentCultureIgnoreCase
                ) == 0 &&
                (oPrescription.FormViewerDetails.BasicDetails.InfusionDetails
                  .TargetLowerSatRange > 0 ||
                  (oPrescription.FormViewerDetails.BasicDetails.InfusionDetails
                    .TargetLowerSatRange == 0 &&
                    oPrescription.FormViewerDetails.BasicDetails.InfusionDetails
                      .TargetUpperSatRange > 0))
              ) {
                if (
                  oPrescription.FormViewerDetails.BasicDetails.InfusionDetails
                    .TargetUpperSatRange > 0
                )
                  temp =
                    oPrescription.FormViewerDetails.BasicDetails.InfusionDetails.TargetLowerSatRange.ToString() +
                    Convert.ToChar(160).ToString() +
                    '-' +
                    Convert.ToChar(160).ToString() +
                    oPrescription.FormViewerDetails.BasicDetails.InfusionDetails.TargetUpperSatRange.ToString() +
                    '%';
                else
                  temp =
                    oPrescription.FormViewerDetails.BasicDetails.InfusionDetails.TargetLowerSatRange.ToString() +
                    '%';
                LineDisplayHelper.SetQualifierAndText(
                  temp,
                  oMLD.objLineDisConfig[iCnt].CaseCode,
                  oMLD.objLineDisConfig[iCnt].FontStyleCode,
                  oMLD.objLineDisConfig[iCnt].Qualifier,
                  oMLD.sColorCode,
                  tbLineDisplay,
                  paraLineDisplay
                );
              }
              break;
            case 'CC_HUMDIFCTIN':
              if (
                isRowSlectd == 1 &&
                oPrescription.FormViewerDetails.BasicDetails.InfusionDetails !=
                  null &&
                String.Compare(
                  oPrescription.FormViewerDetails.BasicDetails.Itemsubtype,
                  DrugItemSubTypeCode.MEDICAL_GAS,
                  StringComparison.CurrentCultureIgnoreCase
                ) == 0 &&
                !String.IsNullOrEmpty(
                  oPrescription.FormViewerDetails.BasicDetails.InfusionDetails
                    .Humidification
                )
              ) {
                let _Humdification: string = String.Empty;
                if (
                  !String.IsNullOrEmpty(
                    oPrescription.FormViewerDetails.BasicDetails.InfusionDetails
                      .Humidification
                  ) &&
                  InfHumdificationConceptCodeData.ConceptCodes != null
                ) {
                  _Humdification =
                    InfHumdificationConceptCodeData.ConceptCodes.Where(
                      (c) =>
                        c.Value ==
                        oPrescription.FormViewerDetails.BasicDetails.InfusionDetails.Humidification.ToString()
                    )
                      .Select((s) => s.DisplayText)
                      .FirstOrDefault();
                  if (!String.IsNullOrEmpty(_Humdification)) {
                    LineDisplayHelper.SetQualifierAndText(
                      _Humdification,
                      oMLD.objLineDisConfig[iCnt].CaseCode,
                      oMLD.objLineDisConfig[iCnt].FontStyleCode,
                      oMLD.objLineDisConfig[iCnt].Qualifier,
                      oMLD.sColorCode,
                      tbLineDisplay,
                      paraLineDisplay
                    );
                  }
                }
              }
              break;
            case 'CC_MONITORINGPERIOD':
              if (
                isRowSlectd == 1 &&
                oPrescription.FormViewerDetails.BasicDetails.InfusionDetails !=
                  null &&
                oPrescription.FormViewerDetails.BasicDetails.DoseType != null &&
                oPrescription.FormViewerDetails.BasicDetails.InfusionDetails
                  .InfusionType != null &&
                (String.Compare(
                  oPrescription.FormViewerDetails.BasicDetails.InfusionDetails
                    .InfusionType.Value,
                  InfusionTypeCode.CONTINUOUS,
                  StringComparison.CurrentCultureIgnoreCase
                ) == 0 ||
                  String.Compare(
                    oPrescription.FormViewerDetails.BasicDetails.InfusionDetails
                      .InfusionType.Value,
                    InfusionTypeCode.SINGLEDOSEVOLUME,
                    StringComparison.CurrentCultureIgnoreCase
                  ) == 0 ||
                  String.Compare(
                    oPrescription.FormViewerDetails.BasicDetails.InfusionDetails
                      .InfusionType.Value,
                    InfusionTypeCode.FLUID,
                    StringComparison.CurrentCultureIgnoreCase
                  ) == 0) &&
                (String.Compare(
                  oPrescription.FormViewerDetails.BasicDetails.DoseType.Value,
                  'Conditional',
                  StringComparison.OrdinalIgnoreCase
                ) == 0 ||
                  String.Compare(
                    oPrescription.FormViewerDetails.BasicDetails.DoseType.Value,
                    'CC_CONDNLDSNG',
                    StringComparison.OrdinalIgnoreCase
                  ) == 0) &&
                !String.IsNullOrEmpty(
                  oPrescription.FormViewerDetails.BasicDetails.InfusionDetails
                    .MonitoringPeriod
                ) &&
                oPrescription.FormViewerDetails.BasicDetails.InfusionDetails
                  .MonitoringPeriodUOM != null &&
                !String.IsNullOrEmpty(
                  oPrescription.FormViewerDetails.BasicDetails.InfusionDetails
                    .MonitoringPeriodUOM.DisplayText
                )
              ) {
                temp =
                  oPrescription.FormViewerDetails.BasicDetails.InfusionDetails
                    .MonitoringPeriod +
                  Convert.ToChar(160).ToString() +
                  oPrescription.FormViewerDetails.BasicDetails.InfusionDetails
                    .MonitoringPeriodUOM.DisplayText;
                LineDisplayHelper.SetQualifierAndText(
                  temp,
                  oMLD.objLineDisConfig[iCnt].CaseCode,
                  oMLD.objLineDisConfig[iCnt].FontStyleCode,
                  oMLD.objLineDisConfig[iCnt].Qualifier,
                  oMLD.sColorCode,
                  tbLineDisplay,
                  paraLineDisplay
                );
              }
              break;
            case 'CC_REVIEWAFTER':
              let IsDSTReview: boolean, IsAmbiguousReview, IsInvalidReview;
              if (
                (!String.IsNullOrEmpty(oPrescription.PrescriptionItemStatus) &&
                  !String.Equals(
                    oPrescription.PrescriptionItemStatus,
                    CConstants.COMPLETED
                  ) &&
                  !String.Equals(
                    oPrescription.PrescriptionItemStatus,
                    CConstants.CANCELLED
                  ) &&
                  !String.Equals(
                    oPrescription.PrescriptionItemStatus,
                    CConstants.DISCONTINUED
                  ) &&
                  (!String.Equals(
                    oPrescription.PrescriptionItemStatus,
                    CConstants.Precatalog
                  ) ||
                    !String.Equals(
                      oPrescription.PrescriptionItemStatus,
                      CConstants.NONCATALOGUEITEM
                    ))) ||
                oPrescription.PrescriptionItemOID == 0
              ) {
                if (isRowSlectd == 1 && oPrescription.FormViewerDetails.BasicDetails.InfusionDetails != null
                    && oPrescription.FormViewerDetails.BasicDetails.InfusionDetails.ReviewafterDTTM != null
                    && !DateTime.Equals(oPrescription.FormViewerDetails.BasicDetails.InfusionDetails.ReviewafterDTTM, DateTime.MinValue)) {
                  temp =
                    oPrescription.FormViewerDetails.BasicDetails.InfusionDetails.ReviewafterDTTM.ConvertToUser(
                      (o1) => {
                        IsDSTReview = o1;
                      },
                      (o2) => {
                        IsAmbiguousReview = o2;
                      },
                      (o3) => {
                        IsInvalidReview = o3;
                      }
                    ).ToDateTimeString(
                      IsDSTReview,
                      IsAmbiguousReview,
                      CConstants.LongDateWithoutSecs
                    );
                  LineDisplayHelper.SetQualifierAndText(
                    temp,
                    oMLD.objLineDisConfig[iCnt].CaseCode,
                    oMLD.objLineDisConfig[iCnt].FontStyleCode,
                    oMLD.objLineDisConfig[iCnt].Qualifier,
                    oMLD.sColorCode,
                    tbLineDisplay,
                    paraLineDisplay
                  );
                }
              }
              break;
          }
        }
      }
    }
    out(tbLineDisplay);
  }
  private static SetQualifierAndText(
    sItemValue: string,
    sCaseCode: string,
    sFontStyleCode: string,
    sQualifier: string,
    sColor: string,
    tbLineDisplay: TextBlock | iLabel,
    paraLineDisplay?: iLabel,
    MultiLine?: boolean
  ): void {
    if (tbLineDisplay instanceof iLabel) {
      this.SetQualifierAndText6(
        sItemValue,
        sCaseCode,
        sFontStyleCode,
        sQualifier,
        sColor,
        <iLabel>tbLineDisplay
      );
    } else {
      if (MultiLine != undefined && MultiLine != null) {
        this.SetQualifierAndText8(
          sItemValue,
          sCaseCode,
          sFontStyleCode,
          sQualifier,
          sColor,
          <TextBlock>tbLineDisplay,
          paraLineDisplay,
          MultiLine
        );
      } else {
        this.SetQualifierAndText7(
          sItemValue,
          sCaseCode,
          sFontStyleCode,
          sQualifier,
          sColor,
          <TextBlock>tbLineDisplay,
          paraLineDisplay
        );
      }
    }
  }

  private static SetQualifierAndText7(
    sItemValue: string,
    sCaseCode: string,
    sFontStyleCode: string,
    sQualifier: string,
    sColor: string,
    tbLineDisplay: TextBlock,
    paraLineDisplay: iLabel
  ): void {
    LineDisplayHelper.SetQualifierAndText(
      sItemValue,
      sCaseCode,
      sFontStyleCode,
      sQualifier,
      sColor,
      tbLineDisplay,
      paraLineDisplay,
      false
    );
  }
  private static SetQualifierAndText8(
    sItemValue: string,
    sCaseCode: string,
    sFontStyleCode: string,
    sQualifier: string,
    sColor: string,
    tbLineDisplay: TextBlock,
    paraLineDisplay: iLabel,
    MultiLine: boolean
  ): void {
    if (!String.IsNullOrEmpty(sItemValue)) {
      if (!String.IsNullOrEmpty(sQualifier) && sQualifier != ' ') {
        let rnQualifier: TextBlock = new TextBlock();
        rnQualifier.FontFamily = new FontFamily('Verdana');
        if (!String.IsNullOrEmpty(sColor)) {
          rnQualifier.Foreground = new SolidColorBrush(
            MedicationCommonBB.hexToColor(sColor)
          );
          rnQualifier.Text = sQualifier;
        } else {
          rnQualifier.Foreground = new SolidColorBrush(Colors.Black);
          rnQualifier.Text = sQualifier;
        }
        tbLineDisplay.Inlines.Add(
          ObjectHelper.CreateObject(new Run(), {
            FontFamily: rnQualifier.FontFamily,
            // Text: rnQualifier.Text + Convert.ToChar(160).ToString(),
            Text: rnQualifier.Text + ' ',
            Foreground: rnQualifier.Foreground,
          })
        );
        paraLineDisplay.InLines.Add(
          ObjectHelper.CreateObject(new iLabelInLineElement(), {
            InLine: rnQualifier,
          })
        );
      }
      let sRun: TextBlock = new TextBlock();
      sRun.FontFamily = new FontFamily('Verdana');
      sRun.Foreground = new SolidColorBrush(Colors.Black);
      let sValue: string = String.Empty;
      if (!String.IsNullOrEmpty(sCaseCode)) {
        if (String.Compare(sCaseCode, 'CC_MLDUPPER') == 0)
          sValue = sItemValue.ToUpper();
        else if (String.Compare(sCaseCode, 'CC_MLDLOWER') == 0)
          sValue = sItemValue.ToLower();
        else sValue = sItemValue;
      } else sValue = sItemValue;
      if (!String.IsNullOrEmpty(sFontStyleCode)) {
        switch (sFontStyleCode) {
          case 'CC_MLDNORMAL':
            sRun.Text = sRun.Text + sValue;
            break;
          case 'CC_MLDBOLD': {
            sRun.Text = sValue;
            sRun.FontStyle = FontStyles.Normal;
            sRun.FontWeight = FontWeights.Bold;
            break;
          }
          case 'CC_MLDITALIC': {
            sRun.Text = sValue;
            sRun.FontStyle = FontStyles.Italic;
            break;
          }
        }
      } else {
        sRun.Text = sValue;
      }
      sRun.Text += '';
      tbLineDisplay.Inlines.Add(
        ObjectHelper.CreateObject(new Run(), {
          FontFamily: sRun.FontFamily,
          Text: sRun.Text + ' ',
          FontStyle: sRun.FontStyle,
          FontWeight: sRun.FontWeight,
          Foreground: sRun.Foreground,
        })
      );
      if (MultiLine) {
        let StSplit: string[] = null;
        let StText: string = '';
        // let StText: string = null;
        if (!String.IsNullOrEmpty(sRun.Text)) {
          StSplit = sRun.Text.Split('\r', '\n');
          StSplit = StSplit.Where((x) => !String.IsNullOrEmpty(x)).ToArray();
        }
        for (let i: number = 0; i < StSplit.length; i++) {
          if (StSplit.length != i + 1) {
            if (!String.IsNullOrEmpty(StSplit[i])) {
              StText += StSplit[i] + ', ';
            }
          } else {
            StText += StSplit[i];
          }
        }
        if (!String.IsNullOrEmpty(StText)) {
          sRun.Text = StText;
        }
      }
      paraLineDisplay.InLines.Add(
        ObjectHelper.CreateObject(new iLabelInLineElement(), { InLine: sRun })
      );
    }
  }
  private static SetQualifierAndText6(
    sItemValue: string,
    sCaseCode: string,
    sFontStyleCode: string,
    sQualifier: string,
    sColor: string,
    paraLineDisplay: iLabel
  ): void {
    if (!String.IsNullOrEmpty(sItemValue)) {
      if (!String.IsNullOrEmpty(sQualifier) && sQualifier != ' ') {
        let InLineQualifier: iLabelInLineElement = new iLabelInLineElement();
        let tbQualifier: iLabel = new iLabel();
        tbQualifier.FontFamily = new FontFamily('Verdana');
        if (!String.IsNullOrEmpty(sColor)) {
          tbQualifier.Foreground = new SolidColorBrush(
            LineDisplayHelper.hexToColor(sColor)
          );
          tbQualifier.Text = sQualifier + ' ';
        } else {
          tbQualifier.Foreground = new SolidColorBrush(Colors.Black);
          tbQualifier.Text = ' ' + sQualifier + ' ';
        }
        InLineQualifier.InLine = tbQualifier;
        paraLineDisplay.InLines.Add(InLineQualifier);
      }
      let InLineRun: iLabelInLineElement = new iLabelInLineElement();
      let sRun: iLabel = new iLabel();
      // sRun.Style = ObjectHelper.CreateType<Style>(
      //   App.Current.Resources['DrugName'],
      //   Style
      // );
      sRun.Margin = new Thickness(0,0,3,0);
      let sValue: string = String.Empty;
      if (!String.IsNullOrEmpty(sCaseCode)) {
        if (String.Compare(sCaseCode, 'CC_MLDUPPER') == 0)
          sValue = sItemValue.ToUpper();
        else if (String.Compare(sCaseCode, 'CC_MLDLOWER') == 0)
          sValue = sItemValue.ToLower();
        else sValue = sItemValue;
      } else sValue = sItemValue;
      if (!String.IsNullOrEmpty(sFontStyleCode)) {
        switch (sFontStyleCode) {
          case 'CC_MLDNORMAL': {
            sRun.Text = sRun.Text + sValue;
            break;
          }
          case 'CC_MLDBOLD': {
            sRun.Text = sValue;
            sRun.FontStyle = FontStyles.Normal;
            sRun.FontWeight = FontWeights.Bold;
            break;
          }
          case 'CC_MLDITALIC': {
            sRun.Text = sValue;
            sRun.FontStyle = FontStyles.Italic;
            break;
          }
        }
      } else {
        sRun.Text = sValue;
      }
      InLineRun.InLine = sRun;
      paraLineDisplay.InLines.Add(InLineRun);
    }
  }
  private static SetMCQualifierAndText(
    sItemValue: string,
    sitemsubtype: string,
    stooltip: string,
    sCaseCode: string,
    sFontStyleCode: string,
    sQualifier: string,
    sColor: string,
    sDrugprop: string,
    tbLineDisplay: TextBlock,
    paraLineDisplay: iLabel,
    isLastItemValue:boolean
  ): void {
    let sRun: iLabel = new iLabel();
    if (!String.IsNullOrEmpty(sItemValue)) {
      if (!String.IsNullOrEmpty(sQualifier) && sQualifier != ' ') {
        let rnQualifier: iLabel = new iLabel();
        rnQualifier.FontFamily = new FontFamily('Verdana');
        if (!String.IsNullOrEmpty(sColor)) {
          rnQualifier.Foreground = new SolidColorBrush(
            MedicationCommonBB.hexToColor(sColor)
          );
          rnQualifier.Text = sQualifier;
        } else {
          rnQualifier.Foreground = new SolidColorBrush(Colors.Black);
          rnQualifier.Text = sQualifier;
        }
        if (!String.IsNullOrEmpty(stooltip))
          tbLineDisplay.Inlines.Add(ObjectHelper.CreateObject(new Run(), {
              FontFamily: rnQualifier.FontFamily,
              Text: rnQualifier.Text + Convert.ToChar(160).ToString(),
              Foreground: rnQualifier.Foreground,
            })
          );
        else
          paraLineDisplay.InLines.Add(
            ObjectHelper.CreateObject(new iLabelInLineElement(), {
              InLine: rnQualifier,
            })
          );
      }
      sRun.FontFamily = new FontFamily('Verdana');
      sRun.Foreground = new SolidColorBrush(Colors.Black);
      let sValue: string = String.Empty;
      if (!String.IsNullOrEmpty(sCaseCode)) {
        if (String.Compare(sCaseCode, 'CC_MLDUPPER') == 0)
          sValue = sItemValue.ToUpper();
        else if (String.Compare(sCaseCode, 'CC_MLDLOWER') == 0)
          sValue = sItemValue.ToLower();
        else sValue = sItemValue.Trim();
      } else sValue = sItemValue;
      if (!String.IsNullOrEmpty(sFontStyleCode)) {
        switch (sFontStyleCode) {
          case 'CC_MLDNORMAL':
            sRun.Text = sRun.Text + sValue;
            break;
          case 'CC_MLDBOLD': {
            sRun.Text = sValue;
            sRun.FontStyle = FontStyles.Normal;
            sRun.FontWeight = FontWeights.Bold;
            break;
          }
          case 'CC_MLDITALIC': {
            sRun.Text = sValue;
            sRun.FontStyle = FontStyles.Italic;
            break;
          }
        }
      } else {
        sRun.Text = sValue;
      }
      if (String.IsNullOrEmpty(stooltip)) {
        paraLineDisplay.IsParagraph = true;
        if (sValue != null) {
          let Testinline: iLabelInLineElement = new iLabelInLineElement();
          Testinline.IsWordwrap = true;
          Testinline.InLine = sRun;
          paraLineDisplay.InLines.Add(Testinline);
          if (!String.IsNullOrEmpty(sDrugprop)) {
            let sprop: string[] = null;
            let sPrprty: string = String.Empty;
            sprop = sDrugprop.Split(',');
            let nlength: number = sprop.length;
            for (let i: number = 0; i < nlength; i++) {
              sPrprty = sprop[i];
              LineDisplayHelper.SetMCDrugProperty(sPrprty, paraLineDisplay);
            }
          }
        }
      }
      sRun.Text += '';
      if (!String.IsNullOrEmpty(stooltip)) {
        tbLineDisplay.style['white-space'] = 'pre-line';
        tbLineDisplay.Inlines.Add(ObjectHelper.CreateObject(new Run(), {
            FontFamily: sRun.FontFamily,
            Text: stooltip,
            FontStyle: sRun.FontStyle,
            FontWeight: sRun.FontWeight,
            Foreground: sRun.Foreground,
          })
        );
      }
      if(!isLastItemValue){
        paraLineDisplay.InLines.Add(
          ObjectHelper.CreateObject(new iLabelInLineElement(), { InLine: {},IsLineBreak:true })
        ); 
      }
    }
  }
  public static SetDrugProperty(
    DrugProps: ObservableCollection<ManagePrescSer.DrugProperty>,
    IdentType: string,
    stpImages: iLabel,
    ItemSubType: string
  ): void {
    //revisit required
    // let DistinctDrugprop = DrugProps.GroupBy((x) => x.DrugPropertyCode).Select(
    //   (y) => y.First()
    // );
    //let DistinctDrugprop = DrugProps.GroupBy((x) => x.DrugPropertyCode).Select((y) => y).First().val;
    let DistinctDrugprop = DrugProps.GroupBy((x) => x.DrugPropertyCode).Select((y) => y)
    DistinctDrugprop.forEach((ele) => {
    for (let i: number = 0; i < 1; i++) {
      let dProp: ManagePrescSer.DrugProperty = ele.val[0]; //DistinctDrugprop[i];
      if (!(dProp instanceof ManagePrescSer.DrugProperty)) continue;
      let sDrugPropCode: string[] = null;
      let sVMChildCode: string[] = null;
      if (
        dProp.DrugPropertyCode != null &&
        dProp.DrugPropertyCode.Contains(',')
      ) {
        sDrugPropCode = dProp.DrugPropertyCode.Split(',');
      }
      if (dProp.VMChildCode != null && dProp.VMChildCode.Contains(',')) {
        sVMChildCode = dProp.VMChildCode.Split(',');
      }
      if (
        sDrugPropCode != null &&
        (sVMChildCode == null || sVMChildCode.length == 0)
      ) {
        sVMChildCode = new Array(1);
        sVMChildCode[0] = CConstants.AllChild_CC;
      }
      if (
        sDrugPropCode != null &&
        sDrugPropCode.length > 0 &&
        sVMChildCode != null &&
        sVMChildCode.length > 0 &&
        sDrugPropCode.length == sVMChildCode.length
      ) {
        let nDrgLength: number = sDrugPropCode.length;
        DrugProps.Clear();
        for (let DPCnt: number = 0; DPCnt < nDrgLength; DPCnt++) {
          DrugProps.Add(
            ObjectHelper.CreateObject(new ManagePrescSer.DrugProperty(), {
              DrugPropertyCode: sDrugPropCode[DPCnt],
              VMChildCode: sVMChildCode[DPCnt],
              HighRiskMsg: dProp.HighRiskMsg,
            })
          );
        }
      } else if (
        sDrugPropCode != null &&
        sDrugPropCode.length > 0 &&
        sVMChildCode != null &&
        sVMChildCode.length > 0 &&
        sDrugPropCode.length != sVMChildCode.length
      ) {
        let nDrgLength: number = sDrugPropCode.length;
        DrugProps.Clear();
        for (let DPCnt: number = 0; DPCnt < nDrgLength; DPCnt++) {
          DrugProps.Add(
            ObjectHelper.CreateObject(new ManagePrescSer.DrugProperty(), {
              DrugPropertyCode: sDrugPropCode[DPCnt],
              VMChildCode: CConstants.AllChild_CC,
              HighRiskMsg: dProp.HighRiskMsg,
            })
          );
        }
      }
    }
  })
    //revisit required
    // let DistinctDrugprops = DrugProps.GroupBy((x) => x.DrugPropertyCode).Select(
    //   (y) => y.First()
    // );
    //let DistinctDrugprops = DrugProps.GroupBy((x) => x.DrugPropertyCode).Select((y) => y).First().val;
    let DistinctDrugprops1 = DrugProps.GroupBy((x) => x.DrugPropertyCode).Select((y) => y)
    DistinctDrugprops1.forEach((ele1) => {
    for (let i: number = 0; i < 1; i++) {
      let drugProp: ManagePrescSer.DrugProperty = ele1.val[0]; //DistinctDrugprops1[i];
      if (!(drugProp instanceof ManagePrescSer.DrugProperty)) continue;
      let sImagePath: string = String.Empty;
      let sImageToolTip: string = String.Empty;
      switch (drugProp.DrugPropertyCode) {
        case 'CC_CNTRLDDRUG':
          if (
            String.Compare(
              IdentType,
              'CATALOGUEITEM',
              StringComparison.OrdinalIgnoreCase
            ) == 0 ||
            String.Compare(
              IdentType,
              CConstants.ACTUALMOIETY,
              StringComparison.OrdinalIgnoreCase
            ) == 0
          ) {
            if (
              String.Compare(
                drugProp.VMChildCode,
                'CC_OCCRALLCHILD',
                StringComparison.OrdinalIgnoreCase
              ) == 0
            ) {
              sImagePath = MedImage.GetPath(MedImages.CC_CNTRLDDRUG);
              sImageToolTip = Resource.prescribedrugs.CC_CNTRLDDRUGif_Tooltip;
            }
          } else {
            sImagePath = MedImage.GetPath(MedImages.CC_CNTRLDDRUG);
            sImageToolTip = Resource.prescribedrugs.CC_CNTRLDDRUGelse_Tooltip;
          }
          if (!String.IsNullOrEmpty(sImagePath)) {
            stpImages.InLines.Add(
              ObjectHelper.CreateObject(new iLabelInLineElement(), {
                InLine: LineDisplayHelper.GetImage(sImagePath, sImageToolTip),
              })
            );
          }
          break;
        case 'CC_UNLICENSED':
          if (
            String.Compare(
              IdentType,
              'CATALOGUEITEM',
              StringComparison.OrdinalIgnoreCase
            ) == 0 ||
            String.Compare(
              IdentType,
              CConstants.ACTUALMOIETY,
              StringComparison.OrdinalIgnoreCase
            ) == 0
          ) {
            if (
              String.Compare(
                drugProp.VMChildCode,
                'CC_OCCRALLCHILD',
                StringComparison.OrdinalIgnoreCase
              ) == 0
            ) {
              sImagePath = MedImage.GetPath(MedImages.CC_UNLICENSED);
              sImageToolTip = Resource.prescribedrugs.CC_UNLICENSEDif_Tooltip;
            }
          } else {
            sImagePath = MedImage.GetPath(MedImages.CC_UNLICENSED);
            sImageToolTip = Resource.prescribedrugs.CC_UNLICENSEDelse_Tooltip;
          }
          if (!String.IsNullOrEmpty(sImagePath)) {
            stpImages.InLines.Add(
              ObjectHelper.CreateObject(new iLabelInLineElement(), {
                InLine: LineDisplayHelper.GetImage(sImagePath, sImageToolTip),
              })
            );
          }
          break;
        case 'CC_HIGHRISK':
          if (
            !String.IsNullOrEmpty(ItemSubType) &&
            String.Equals(ItemSubType, CConstants.SUBTYPE)
          ) {
            sImagePath = MedImage.GetPath(MedImages.CC_HIGHRISK);
            sImageToolTip = Resource.prescribedrugs.CC_HIGHRISKif_Tooltip;
          } else {
            let sHighRiskMsg: string = drugProp.HighRiskMsg;
            if (
              String.Compare(
                IdentType,
                'CATALOGUEITEM',
                StringComparison.OrdinalIgnoreCase
              ) == 0 ||
              String.Compare(
                IdentType,
                CConstants.ACTUALMOIETY,
                StringComparison.OrdinalIgnoreCase
              ) == 0
            ) {
              sHighRiskMsg = !String.IsNullOrEmpty(sHighRiskMsg)
                ? ' - ' + sHighRiskMsg + ' - '
                : ' - ';
              if (
                String.Compare(
                  drugProp.VMChildCode,
                  'CC_OCCRALLCHILD',
                  StringComparison.OrdinalIgnoreCase
                ) == 0
              ) {
                sImagePath = MedImage.GetPath(MedImages.CC_HIGHRISK);
                sImageToolTip =
                  Resource.prescribedrugs.CC_HIGHRISKif_Tooltip +
                  sHighRiskMsg +
                  Resource.prescribedrugs.CC_HIGHRISKelse_Tooltip;
              } else if (
                String.Equals(drugProp.VMChildCode, CConstants.SomeChild_CC)
              ) {
                sImagePath = MedImage.GetPath(MedImages.CC_HIGHRISK);
                sImageToolTip =
                  Resource.prescribedrugs.CC_HIGHRISKif_Tooltip +
                  sHighRiskMsg +
                  Resource.prescribedrugs.CC_HIGHRISKSomePrd_Tooltip;
              }
              if (
                !String.IsNullOrEmpty(drugProp.OccuranceCode) &&
                String.Compare(
                  drugProp.OccuranceCode,
                  'CC_OCCRALLCHILD',
                  StringComparison.OrdinalIgnoreCase
                ) == 0
              ) {
                sImagePath = MedImage.GetPath(MedImages.CC_HIGHRISK);
                sImageToolTip =
                  Resource.prescribedrugs.CC_HIGHRISKif_Tooltip +
                  sHighRiskMsg +
                  Resource.prescribedrugs.CC_HIGHRISKelse_Tooltip;
              } else if (
                !String.IsNullOrEmpty(drugProp.OccuranceCode) &&
                String.Equals(drugProp.OccuranceCode, CConstants.SomeChild_CC)
              ) {
                sImagePath = MedImage.GetPath(MedImages.CC_HIGHRISK);
                sImageToolTip =
                  Resource.prescribedrugs.CC_HIGHRISKif_Tooltip +
                  sHighRiskMsg +
                  Resource.prescribedrugs.CC_HIGHRISKSomePrd_Tooltip;
              }
            } else {
              sImagePath = MedImage.GetPath(MedImages.CC_HIGHRISK);
              sImageToolTip = !String.IsNullOrEmpty(sHighRiskMsg)
                ? Resource.prescribedrugs.CC_HIGHRISKif_Tooltip +
                  ' - ' +
                  sHighRiskMsg
                : Resource.prescribedrugs.CC_HIGHRISKif_Tooltip;
            }
          }
          if (!String.IsNullOrEmpty(sImagePath)) {
            stpImages.InLines.Add(
              ObjectHelper.CreateObject(new iLabelInLineElement(), {
                InLine: LineDisplayHelper.GetImage(sImagePath, sImageToolTip),
              })
            );
          }
          break;
        case 'CC_NEWLY':
          if (
            String.Compare(
              IdentType,
              'CATALOGUEITEM',
              StringComparison.OrdinalIgnoreCase
            ) == 0 ||
            String.Compare(
              IdentType,
              CConstants.ACTUALMOIETY,
              StringComparison.OrdinalIgnoreCase
            ) == 0
          ) {
            if (
              String.Compare(
                drugProp.VMChildCode,
                'CC_OCCRALLCHILD',
                StringComparison.OrdinalIgnoreCase
              ) == 0
            ) {
              sImagePath = MedImage.GetPath(MedImages.CC_NEWLY);
              sImageToolTip = Resource.prescribedrugs.CC_NEWLYif_Tooltip;
            }
          } else {
            sImagePath = MedImage.GetPath(MedImages.CC_NEWLY);
            sImageToolTip = Resource.prescribedrugs.CC_NEWLYelse_Tooltip;
          }
          if (!String.IsNullOrEmpty(sImagePath)) {
            stpImages.InLines.Add(
              ObjectHelper.CreateObject(new iLabelInLineElement(), {
                InLine: LineDisplayHelper.GetImage(sImagePath, sImageToolTip),
              })
            );
          }
          break;
        case 'CC_NAMEDRUG':
          if (
            String.Compare(
              IdentType,
              'CATALOGUEITEM',
              StringComparison.OrdinalIgnoreCase
            ) == 0 ||
            String.Compare(
              IdentType,
              CConstants.ACTUALMOIETY,
              StringComparison.OrdinalIgnoreCase
            ) == 0
          ) {
            if (
              String.Compare(
                drugProp.VMChildCode,
                'CC_OCCRALLCHILD',
                StringComparison.OrdinalIgnoreCase
              ) == 0
            ) {
              sImagePath = MedImage.GetPath(MedImages.CC_NAMEDRUG);
              sImageToolTip = Resource.prescribedrugs.CC_NAMEDRUGif_Tooltip;
            }
          } else {
            sImagePath = MedImage.GetPath(MedImages.CC_NAMEDRUG);
            sImageToolTip = Resource.prescribedrugs.CC_NAMEDRUGelse_Tooltip;
          }
          if (!String.IsNullOrEmpty(sImagePath)) {
            stpImages.InLines.Add(
              ObjectHelper.CreateObject(new iLabelInLineElement(), {
                InLine: LineDisplayHelper.GetImage(sImagePath, sImageToolTip),
              })
            );
          }
          break;
      }
    }
  })
  }
  public static SetMCDrugProperty(
    DrugProps: string,
    paraLineDisplay: iLabel
  ): void {
    switch (DrugProps) {
      case 'CC_CNTRLDDRUG':
        let sTip: string = Resource.prescribedrugs.CC_CNTRLDDRUGelse_Tooltip;
        let img1: Image = new Image();
        img1.Margin = new Thickness(2, 0, 2, 0);
        img1.Stretch = Stretch.None;
        img1.Source = new BitmapImage(
          new Uri(
            MedImage.GetPath(MedImages.CC_CNTRLDDRUG),
            UriKind.RelativeOrAbsolute
          )
        );
        ToolTipService.SetToolTip(img1, sTip);
        paraLineDisplay.InLines.Add(
          ObjectHelper.CreateObject(new iLabelInLineElement(), { InLine: img1 })
        );
        break;
      case 'CC_UNLICENSED':
        let sTip2: string = Resource.prescribedrugs.CC_UNLICENSEDelse_Tooltip;
        let img3: Image = new Image();
        img3.Margin = new Thickness(2, 0, 2, 0);
        img3.Stretch = Stretch.None;
        img3.Source = new BitmapImage(
          new Uri(
            MedImage.GetPath(MedImages.CC_UNLICENSED),
            UriKind.RelativeOrAbsolute
          )
        );
        ToolTipService.SetToolTip(img3, sTip2);
        paraLineDisplay.InLines.Add(
          ObjectHelper.CreateObject(new iLabelInLineElement(), { InLine: img3 })
        );
        break;
      case 'CC_HIGHRISK':
        let sTip1: string = Resource.prescribedrugs.CC_HIGHRISKif_Tooltip;
        let img2: Image = new Image();
        img2.Margin = new Thickness(2, 0, 2, 0);
        img2.Stretch = Stretch.None;
        img2.Source = new BitmapImage(
          new Uri(
            MedImage.GetPath(MedImages.CC_HIGHRISK),
            UriKind.RelativeOrAbsolute
          )
        );
        ToolTipService.SetToolTip(img2, sTip1);
        paraLineDisplay.InLines.Add(
          ObjectHelper.CreateObject(new iLabelInLineElement(), { InLine: img2 })
        );
        break;
      case 'CC_NEWLY':
        let sTip3: string = Resource.prescribedrugs.CC_NEWLYelse_Tooltip;
        let img4: Image = new Image();
        img4.Margin = new Thickness(2, 0, 2, 0);
        img4.Stretch = Stretch.None;
        img4.Source = new BitmapImage(
          new Uri(
            MedImage.GetPath(MedImages.CC_NEWLY),
            UriKind.RelativeOrAbsolute
          )
        );
        ToolTipService.SetToolTip(img4, sTip3);
        paraLineDisplay.InLines.Add(
          ObjectHelper.CreateObject(new iLabelInLineElement(), { InLine: img4 })
        );
        break;
      case 'CC_NAMEDRUG':
        let sTip4: string = Resource.prescribedrugs.CC_NAMEDRUGelse_Tooltip;
        let img5: Image = new Image();
        img5.Margin = new Thickness(2, 0, 2, 0);
        img5.Stretch = Stretch.None;
        img5.Source = new BitmapImage(
          new Uri(
            MedImage.GetPath(MedImages.CC_NAMEDRUG),
            UriKind.RelativeOrAbsolute
          )
        );
        ToolTipService.SetToolTip(img5, sTip4);
        paraLineDisplay.InLines.Add(
          ObjectHelper.CreateObject(new iLabelInLineElement(), { InLine: img5 })
        );
        break;
    }
  }
  private static GetImage(sImagePath: string, sImageToolTip: string): Image {
    let img1: Image = ObjectHelper.CreateObject(new Image(), {
      Margin: new Thickness(0, 0, 1, 0),
      VerticalAlignment: VerticalAlignment.Bottom,
    });
    img1.Stretch = Stretch.None;
    img1.Source = new BitmapImage(
      new Uri(sImagePath, UriKind.RelativeOrAbsolute)
    );
    img1.AltImageTooltip = 'newImageLineClass';
    ToolTipService.SetToolTip(
      img1,
      ObjectHelper.CreateObject(new iLabel(), {
        MaxWidth: 300,
        IsWordwrap: true,
        Text: sImageToolTip,
      })
    );
    return img1;
  }

        public static GetScheduleTimes(objPresItemDetailsVM: PrescriptionItemDetailsVM): Grid {
            let oLayout: Grid = new Grid();
            let oColumnDefinition: ColumnDefinition = new ColumnDefinition();
            //Re-visit - NPK
            //oColumnDefinition.MinWidth = 500;
            oLayout.ColumnDefinitions.Add(oColumnDefinition);
            oLayout.ColumnDefinitions.Add(new ColumnDefinition());
            //let tbScheduletimes: iLabel = ObjectHelper.CreateObject(new iLabel(), { Name: "lblScheduleTimes", IsWordwrap: true, TextAlignment: TextAlignment.Left, VerticalAlignment: VerticalAlignment.Center, Margin: new Thickness(2), Width: 500 });
            let tbScheduletimes: iLabel = new iLabel();
            tbScheduletimes.Name= "lblScheduleTimes";
            tbScheduletimes.IsWordwrap= true;
            tbScheduletimes.TextAlignment= TextAlignment.Left;
            //Re-Visit - NPK
            //tbScheduletimes.VerticalAlignment= VerticalAlignment.Center;
            tbScheduletimes.Margin =  new Thickness(2);
            tbScheduletimes.Width= 500;
            //let spImages: StackPanel = ObjectHelper.CreateObject(new StackPanel(), { Orientation: Orientation.Horizontal, Margin: new Thickness(5), Name: "ImagePanel", HorizontalAlignment: HorizontalAlignment.Right });
            let spImages: StackPanel = new StackPanel();
            spImages.Orientation= Orientation.Horizontal;
            spImages.Margin= new Thickness(5);
            spImages.Name= "ImagePanel";
            spImages.HorizontalAlignment= HorizontalAlignment.Right;
            oLayout.Children.Add(tbScheduletimes);
            oLayout.Children.Add(spImages);
    Grid.SetColumn(tbScheduletimes, 1);
    Grid.SetColumn(spImages, 2);
            if (objPresItemDetailsVM != null && objPresItemDetailsVM.DrugDetails != null) {
                tbScheduletimes.Text = objPresItemDetailsVM.DrugDetails.ScheduleTime;
                let sDoseType: string = objPresItemDetailsVM.DrugDetails.DoseType;
                if ((String.Compare(sDoseType, DoseTypeCode.CONDITIONAL, StringComparison.OrdinalIgnoreCase) == 0) && objPresItemDetailsVM.DrugDetails.IsConditionalExists) {
                    let img1: Image = new Image();
                    img1.Stretch = Stretch.None;
        img1.Cursor ="Hand";
        img1.Margin ="170,0,0,0";
                    img1.Source = new BitmapImage(new Uri(MedImage.GetPath(MedImages.SteppedVariable), UriKind.RelativeOrAbsolute));
       // objPresItemDetailsVM.SubscribeDoseTypeClickEvent(img1);
        img1.MouseLeftButtonUp = (s, e) => { objPresItemDetailsVM.imgType_MouseLeftButtonDown(s, e) }
                    img1.Tag = objPresItemDetailsVM.DrugDetails.DoseType;
                    img1.AltImageTooltip = 'newMedlinClass';
                    ToolTipService.SetToolTip(img1, Resource.DrugDetails.DoseType_tooltip);
                    spImages.Children.Add(img1);
                }
                else if ((String.Compare(sDoseType, DoseTypeCode.STEPPEDVARIABLE, StringComparison.OrdinalIgnoreCase) == 0) || (String.Compare(sDoseType, DoseTypeCode.STEPPED, StringComparison.OrdinalIgnoreCase) == 0) || (String.Compare(sDoseType, DoseTypeCode.VARIABLE, StringComparison.OrdinalIgnoreCase) == 0) || (String.Compare(sDoseType, DoseTypeCode.TITRATED, StringComparison.OrdinalIgnoreCase) == 0)) {
                    let img1: Image = new Image();
                    img1.Stretch = Stretch.None;
        img1.Cursor ="Hand";
        img1.Margin ="170,0,0,0";
                    img1.Source = new BitmapImage(new Uri(MedImage.GetPath(MedImages.SteppedVariable), UriKind.RelativeOrAbsolute));
        img1.MouseLeftButtonUp = (s, e) => { objPresItemDetailsVM.imgType_MouseLeftButtonDown(s, e) }
                    img1.Tag = objPresItemDetailsVM.DrugDetails.DoseType;
                    img1.AltImageTooltip = 'newMedlinClass';
                    ToolTipService.SetToolTip(img1, Resource.DrugDetails.DoseType_tooltip);
                    spImages.Children.Add(img1);
                }
                if (MedicationCommonProfileData.PrescribeConfig != null && MedicationCommonProfileData.PrescribeConfig.EnableDoseCalc && objPresItemDetailsVM.DrugDetails.DoesCalcExist == "Yes") {
                    let img2: Image = new Image();
                    img2.Stretch = Stretch.None;
        img2.Cursor ="Hand";
        img2.Margin ="170,0,0,0";
                    if (objPresItemDetailsVM.DrugDetails.IsDoseCalcExists.Equals('2') && MedicationCommonProfileData.PrescribeConfig.HeightWeightChangeAlert && !String.IsNullOrEmpty(objPresItemDetailsVM.DrugDetails.Status) && !String.Equals(objPresItemDetailsVM.DrugDetails.Status, CConstants.CompletedStatusTermText, StringComparison.InvariantCultureIgnoreCase) && !String.Equals(objPresItemDetailsVM.DrugDetails.Status, CConstants.CancelledStatusTermText, StringComparison.InvariantCultureIgnoreCase) && !String.Equals(objPresItemDetailsVM.DrugDetails.Status, CConstants.DiscontinueStatusTermText, StringComparison.InvariantCultureIgnoreCase)) {
                        img2.Source = new BitmapImage(new Uri(MedImage.GetPath(MedImages.DoseCalculatorWithAlert), UriKind.RelativeOrAbsolute));
                    }
                    else {
                        img2.Source = new BitmapImage(new Uri(MedImage.GetPath(MedImages.DoseCalculator), UriKind.RelativeOrAbsolute));
                    }
        img2.MouseLeftButtonUp = (s, e) => { objPresItemDetailsVM.imgDose_MouseLeftButtonUp(s, e) }
        img2.AltImageTooltip = 'newMedlinClass';
                    ToolTipService.SetToolTip(img2, Resource.DrugDetails.DoseCalculator_tooltip);
                    spImages.Children.Add(img2);
                }
            }
            return oLayout;
        }
       
  public static GetReqeustUrgencyIcon(
    oPrescription: PrescriptionLineItemVM
  ): string {
    let sUrgencyImage: string = String.Empty;
    if (
      oPrescription != null &&
      oPrescription.FormViewerDetails != null &&
      oPrescription.FormViewerDetails.BasicDetails != null &&
      oPrescription.FormViewerDetails.BasicDetails.IsSupplyRequestedforReqMed &&
      !String.IsNullOrEmpty(
        oPrescription.FormViewerDetails.BasicDetails.RequestUrgency
      )
    ) {
      if (
        String.Equals(
          ContextInfo.MenuCode,
          CConstants.TechnicallyValidateMenuCode,
          StringComparison.InvariantCultureIgnoreCase
        )
      ) {
        if (
          String.Equals(
            oPrescription.FormViewerDetails.BasicDetails.RequestUrgency,
            CConstants.High
          )
        ) {
          sUrgencyImage = MedImages.HighUrgency;
        } else if (
          String.Equals(
            oPrescription.FormViewerDetails.BasicDetails.RequestUrgency,
            CConstants.Medium
          )
        ) {
          sUrgencyImage = MedImages.MediumUrgency;
        } else if (
          String.Equals(
            oPrescription.FormViewerDetails.BasicDetails.RequestUrgency,
            CConstants.Low
          )
        ) {
          sUrgencyImage = MedImages.LowUrgency;
        } else if (
          String.Equals(
            oPrescription.FormViewerDetails.BasicDetails.RequestUrgency,
            CConstants.NoUrgency
          )
        ) {
          sUrgencyImage = MedImages.NoUrgency;
        }
      } else if (
        String.Equals(
          ContextInfo.MenuCode,
          CConstants.ClinicallyVerifyMenuCode,
          StringComparison.InvariantCultureIgnoreCase
        )
      ) {
        sUrgencyImage = MedImages.NoUrgency;
      }
    } else if (
      String.Equals(
        ContextInfo.MenuCode,
        CConstants.ClinicallyVerifyMenuCode,
        StringComparison.InvariantCultureIgnoreCase
      ) &&
      oPrescription != null &&
      oPrescription.FormViewerDetails != null &&
      oPrescription.FormViewerDetails.BasicDetails != null &&
      !String.Equals(
        ContextInfo.MenuCode,
        CConstants.TechnicallyValidateMenuCode,
        StringComparison.InvariantCultureIgnoreCase
      ) &&
      oPrescription.FormViewerDetails.BasicDetails.IsSupplyRequestedforReqMed &&
      ((oPrescription.FormViewerDetails.BasicDetails.InfusionDetails != null &&
        oPrescription.FormViewerDetails.BasicDetails.InfusionDetails
          .FluidSelectvalue != null &&
        !String.IsNullOrEmpty(
          oPrescription.FormViewerDetails.BasicDetails.InfusionDetails
            .FluidSelectvalue.Value
        )) ||
        oPrescription.FormViewerDetails.BasicDetails.Itemsubtype ==
          'CC_MULCMPNTITM')
    ) {
      sUrgencyImage = MedImages.NoUrgency;
    }
    return sUrgencyImage;
  }
  public static GetLineItemContentForDrugHeader(
    sType: string,
    oDrgHeader: ObservableCollection<DrugDetail>,
    oSlotDetail: ObservableCollection<SlotDetail>
  ): StackPanel {
    let Content: StackPanel = new StackPanel();
    let paraLineDisplay: iLabel = ObjectHelper.CreateObject(new iLabel(), {
      TextAlignment: TextAlignment.Left,
      IsWordwrap: true,
    });
    let lnDis: ObservableCollection<LineDisplayConfigurations> =
      MedicationCommonProfileData.MedLineDisplay.objLineDisConfig;
    let PRESITEM = lnDis
      .Where(
        (LineDisplayElement) =>
          LineDisplayElement.IsSelected == 1 &&
          String.Compare(
            LineDisplayElement.ColCode,
            'CC_MLDPRESITEM',
            StringComparison.OrdinalIgnoreCase
          ) == 0
      )
      .Select((LineDisplayElement) => LineDisplayElement);
    LineDisplayHelper.lnDisFilter =
      new ObservableCollection<LineDisplayConfigurations>(PRESITEM);
    let oMLD: CMedicationLineDisplayData = null;
    if (
      String.Compare(
        sType,
        'CC_MLDPRESITEM',
        StringComparison.OrdinalIgnoreCase
      ) == 0
    ) {
      oMLD = new CMedicationLineDisplayData();
      oMLD.sColorCode = MedicationCommonProfileData.MedLineDisplay.sColorCode;
      oMLD.objLineDisConfig = LineDisplayHelper.lnDisFilter;
    }
    let iCnt: number;
    if (
      String.Compare(
        oDrgHeader[0].DrugHeader.ItemSubType,
        CConstants.SUBTYPE,
        StringComparison.CurrentCultureIgnoreCase
      ) == 0 &&
      oDrgHeader[0].DrugHeader.MultiComponentItems != null
    ) {
      if (oDrgHeader[0].DrugHeader.MultiComponentItems.Count > 5) {
        if (
          String.Compare(
            oDrgHeader[0].DrugHeader.LorenzoID,
            CConstants.ADHOC_ITEM_LORENZOID,
            StringComparison.CurrentCultureIgnoreCase
          ) == 0
        ) {
        } else
          LineDisplayHelper.GetDrugDetailByProfileConfig(
            oMLD,
            oDrgHeader,
            oDrgHeader[0].DrugHeader.DrugName,
            oDrgHeader[0].DrugHeader.DosageForm,
            sType,
            true,
            0,
            paraLineDisplay
          );
      } else {
        if (
          String.Compare(
            oDrgHeader[0].DrugHeader.LorenzoID,
            CConstants.ADHOC_ITEM_LORENZOID,
            StringComparison.CurrentCultureIgnoreCase
          ) == 0
        ) {
          oDrgHeader[0].DrugHeader.IsInfusionFluid = false;
          for (
            ;
            iCnt < oDrgHeader[0].DrugHeader.MultiComponentItems.Count;
            iCnt++
          ) {
            let paraLineDisplayMCI: iLabel = ObjectHelper.CreateObject(
              new iLabel(),
              { TextAlignment: TextAlignment.Left, IsWordwrap: true }
            );
            if (iCnt == oDrgHeader[0].DrugHeader.MultiComponentItems.Count - 1)
              LineDisplayHelper.GetDrugDetailByProfileConfig(
                oMLD,
                oDrgHeader,
                oDrgHeader[0].DrugHeader.MultiComponentItems[iCnt],
                oDrgHeader[0].DrugHeader.DosageForm,
                sType,
                true,
                iCnt,
                paraLineDisplayMCI
              );
            else
              LineDisplayHelper.GetDrugDetailByProfileConfig(
                oMLD,
                oDrgHeader,
                oDrgHeader[0].DrugHeader.MultiComponentItems[iCnt],
                String.Empty,
                sType,
                false,
                iCnt,
                paraLineDisplayMCI
              );
            Content.Children.Add(paraLineDisplayMCI);
          }
          return Content;
        } else {
          LineDisplayHelper.GetDrugDetailByProfileConfig(
            oMLD,
            oDrgHeader,
            oDrgHeader[0].DrugHeader.DrugName,
            oDrgHeader[0].DrugHeader.DosageForm,
            sType,
            true,
            0,
            paraLineDisplay
          );
        }
      }
    } else {
      LineDisplayHelper.GetDrugDetailByProfileConfig(
        oMLD,
        oDrgHeader,
        oDrgHeader[0].DrugHeader.DrugName,
        oDrgHeader[0].DrugHeader.DosageForm,
        sType,
        true,
        0,
        paraLineDisplay
      );
    }
    Content.Children.Add(paraLineDisplay);
    return Content;
  }
  private static GetDrugDetailByProfileConfig(
    oMLD: CMedicationLineDisplayData,
    oDrgHeader: ObservableCollection<DrugDetail>,
    sDrugName: string,
    sProductForm: string,
    sType: string,
    bTypeShown: boolean,
    MCICnt: number,
    paraLineDisplay: iLabel
  ): void {
    if (oMLD != null && oMLD.objLineDisConfig != null) {
      let sTmpDrugName: string[] = sDrugName.Split('~');
      let sTmpDrugProp: string[];
      let iCnt: number,
        TCnt = oMLD.objLineDisConfig.Count;
      let iCounter: number = 0;
      let IsControlDrug: boolean = false;
      let isProductFormExist: boolean = false;
      let sCaseCode: string = String.Empty,
        sFontStyleCode = String.Empty,
        sQualifier = String.Empty,
        sColorCode = String.Empty;
      let TmpMultiComponentItems: ArrayOfString = new ArrayOfString();
      for (iCnt = 0; iCnt < TCnt; iCnt++) {
        let isRowSlectd: number = oMLD.objLineDisConfig[iCnt].IsSelected;
        if (String.Compare(sType, oMLD.objLineDisConfig[iCnt].ColCode) == 0) {
          switch (oMLD.objLineDisConfig[iCnt].FieldCode) {
            case 'CC_DRUGNAME':
              if (
                isRowSlectd == 1 &&
                !String.IsNullOrEmpty(sTmpDrugName[0].Trim())
              ) {
                LineDisplayHelper.SetQualifierAndText(
                  sTmpDrugName[0].Trim(),
                  oMLD.objLineDisConfig[iCnt].CaseCode,
                  oMLD.objLineDisConfig[iCnt].FontStyleCode,
                  oMLD.objLineDisConfig[iCnt].Qualifier.Trim(),
                  oMLD.sColorCode,
                  paraLineDisplay
                );
                if (!String.IsNullOrEmpty(sTmpDrugName[0].Trim())) {
                  if (
                    String.Compare(
                      oDrgHeader[0].DrugHeader.ItemSubType,
                      CConstants.SUBTYPE,
                      StringComparison.CurrentCultureIgnoreCase
                    ) == 0
                  ) {
                    for (
                      let nCnt: number = 0;
                      nCnt < oDrgHeader[0].DrugHeader.MultiComponentItems.Count;
                      nCnt++
                    ) {
                      if (
                        !String.IsNullOrEmpty(
                          oDrgHeader[0].DrugHeader.MultiComponentItems[
                            nCnt
                          ].Trim()
                        )
                      )
                        TmpMultiComponentItems.Add(
                          oDrgHeader[0].DrugHeader.MultiComponentItems[
                            nCnt
                          ].Substring(
                            0,
                            oDrgHeader[0].DrugHeader.MultiComponentItems[
                              nCnt
                            ].IndexOf('~')
                          )
                        );
                      if (
                        !IsControlDrug &&
                        !String.Equals(
                          oDrgHeader[0].DrugHeader.LorenzoID,
                          CConstants.ADHOC_ITEM_LORENZOID
                        ) &&
                        oDrgHeader[0].DrugHeader.MultiComponentItems.Count <= 5
                      ) {
                        sTmpDrugProp =
                          oDrgHeader[0].DrugHeader.MultiComponentItems[
                            nCnt
                          ].Split('~');
                        if (
                          sTmpDrugProp != null &&
                          sTmpDrugProp.length >= 2 &&
                          !String.IsNullOrEmpty(sTmpDrugProp[1].Trim()) &&
                          String.Compare(
                            sTmpDrugProp[1].Trim(),
                            'CC_CNTRLDDRUG',
                            StringComparison.CurrentCultureIgnoreCase
                          ) == 0
                        ) {
                          IsControlDrug = true;
                        }
                      }
                    }
                  }
                }
              }
              iCounter++;
              break;
            case 'CC_FORM':
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
          if (iCounter == 2) break;
        }
      }
      if (!String.IsNullOrEmpty(sTmpDrugName[0].Trim())) {
        if (
          oDrgHeader[0].DrugHeader.IsControlledDrug ||
          IsControlDrug ||
          (sTmpDrugName.length >= 2 &&
            !String.IsNullOrEmpty(sTmpDrugName[1].Trim()) &&
            String.Compare(
              sTmpDrugName[1].Trim(),
              'CC_CNTRLDDRUG',
              StringComparison.CurrentCultureIgnoreCase
            ) == 0)
        ) {
          let img1: Image = new Image();
          img1.Margin = new Thickness(2, 0, 2, 0);
          img1.Stretch = Stretch.None;
          img1.Source = new BitmapImage(
            new Uri(
              MedImage.GetPath(MedImages.CC_CNTRLDDRUG),
              UriKind.RelativeOrAbsolute
            )
          );
          ToolTipService.SetToolTip(
            img1,
            ObjectHelper.CreateObject(new iLabel(), {
              Text: 'Controlled drug',
              IsWordwrap: true,
              MaxWidth: 250,
            })
          );
          paraLineDisplay.InLines.Add(
            ObjectHelper.CreateObject(new iLabelInLineElement(), {
              InLine: img1,
            })
          );
        }
      }
      if (
        (String.IsNullOrEmpty(oDrgHeader[0].DrugHeader.InfusionType) ||
          String.Equals(
            oDrgHeader[0].DrugHeader.ItemSubType,
            CConstants.SUBTYPE,
            StringComparison.CurrentCultureIgnoreCase
          )) &&
        isProductFormExist
      ) {
        LineDisplayHelper.SetQualifierAndText(
          sProductForm,
          sCaseCode,
          sFontStyleCode,
          sQualifier,
          sColorCode,
          paraLineDisplay
        );
      }
      LineDisplayHelper.SetInfusionDrugLineItem(
        oDrgHeader,
        bTypeShown,
        paraLineDisplay
      );
    }
  }
  private static SetInfusionDrugLineItem(
    oDrgHeader: ObservableCollection<DrugDetail>,
    bTypeShown: boolean,
    paraLineDisplay: iLabel
  ): void {
    if (
      !String.IsNullOrEmpty(
        oDrgHeader[0].DrugHeader.FormViewParameters.IntravenousInfusionData
          .Fluid.Name
      )
    ) {
      let InLineRun: iLabelInLineElement = new iLabelInLineElement();
      let sRun: TextBlock = new TextBlock();
      sRun.Style = ObjectHelper.CreateType<Style>(
        App.Current.Resources['DrugFluidName'],
        Style
      );
      sRun.Text = String.Format(
        Resource.InfusionChart.InFluid_text,
        oDrgHeader[0].DrugHeader.FormViewParameters.IntravenousInfusionData
          .Fluid.Name
      );
      InLineRun.InLine = sRun;
      paraLineDisplay.InLines.Add(InLineRun);
    }
    if (!String.IsNullOrEmpty(oDrgHeader[0].DrugHeader.InfusionType)) {
      let InLineRun1: iLabelInLineElement = new iLabelInLineElement();
      let sRun1: TextBlock = new TextBlock();
      sRun1.Style = ObjectHelper.CreateType<Style>(
        App.Current.Resources['DrugInfusionType'],
        Style
      );
      sRun1.Text =
        '- ' +
        CommonBB.GetText(
          oDrgHeader[0].DrugHeader.InfusionType,
          InfusionTypeConceptCodeData.ConceptCodes
        );
      InLineRun1.InLine = sRun1;
      paraLineDisplay.InLines.Add(InLineRun1);
    }
  }

  private static hexToColor(hexValue: string): Color {
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
}
//Not Required for LHS. To be Re-Visited.
/*
    export class DisplayPrescriptionLineItem  {
        public Convert(value: Object, targetType: Type, parameter: Object, culture: CultureInfo): Object {
            let cntControl: iLabel = null;
            try {
                if (value instanceof PrescriptionItemDetailsVM) {
                    let colWidth: number = Number.NaN;
                    let tbToolTip: TextBlock = null;
                    cntControl = LineDisplayHelper.GetPrescriptionItem(MedicationCommonBB.GetPrescriptionLineItemVM(ObjectHelper.CreateType<PrescriptionItemDetailsVM>(value, PrescriptionItemDetailsVM)), colWidth, parameter.ToString(), tbToolTip);
                }
                else if (value instanceof CommPrescriptionItemViewVM) {
                    let oVM: CommPrescriptionItemViewVM = ObjectHelper.CreateType<CommPrescriptionItemViewVM>(value, CommPrescriptionItemViewVM);
                    let colWidth: number = Number.NaN;
                    let tbToolTip: TextBlock = null;
                    cntControl = LineDisplayHelper.GetPrescriptionItem(MedicationCommonBB.GetPrescriptionLineItemVMSeqMez(ObjectHelper.CreateType<CommPrescriptionItemViewVM>(value, CommPrescriptionItemViewVM)), colWidth, parameter.ToString(), tbToolTip);
                    if (oVM != null && oVM.GroupSequenceNo > 0 && oVM.ItemSequenceNo > 0 && !oVM.IsLastItem && !String.Equals(oVM.PrescriptionItemStatus, CConstants.DISCONTINUED, StringComparison.InvariantCultureIgnoreCase) && !String.Equals(oVM.PrescriptionItemStatus, CConstants.CANCELLED, StringComparison.InvariantCultureIgnoreCase)) {
                        let sRun: TextBlock = new TextBlock();
                        sRun.FontFamily = new FontFamily("Verdana");
                        sRun.Foreground = new SolidColorBrush(Colors.Black);
                        sRun.Text = " " + "AND THEN";
                        sRun.FontStyle = FontStyles.Normal;
                        cntControl.InLines.Add(ObjectHelper.CreateObject(new iLabelInLineElement(), { InLine: sRun }));
                    }
                    else if (oVM != null && oVM.GroupSequenceNo > 0 && oVM.ItemSequenceNo == 1 && oVM.MedsResolve.Count > 0) {
                        let MaxItemsequence: number = -1;
                        MaxItemsequence = oVM.MedsResolve.Where(c => c.GroupSequenceNo == oVM.GroupSequenceNo).Max(s => s.ItemSequenceNo);
                        if (MaxItemsequence == 1) {
                            let sRun: TextBlock = new TextBlock();
                            sRun.FontFamily = new FontFamily("Verdana");
                            sRun.Foreground = new SolidColorBrush(Colors.Black);
                            sRun.Text = " " + "AND THEN";
                            sRun.FontStyle = FontStyles.Normal;
                            cntControl.InLines.Add(ObjectHelper.CreateObject(new iLabelInLineElement(), { InLine: sRun }));
                        }
                    }
                }
            }
           catch(ex:any)  {
                AMSHelper.PublicExceptionDetails(80000023, "LorAppMedicationCommonBB.dll, Class:DisplayPrescriptionLineItem, Method:Convert()", ex);
            }

            return cntControl;
        }
        public ConvertBack(value: Object, targetType: Type, parameter: Object, culture: CultureInfo): Object {
            return value;
        }
    }
    export class DisplayChangingDose  {
        public Convert(value: Object, targetType: Type, parameter: Object, culture: CultureInfo): Object {
            let oVM: MultipleDoseDetail = ObjectHelper.CreateType<MultipleDoseDetail>(value, MultipleDoseDetail);
            let txtChangingDose: iLabel = new iLabel();
            if (oVM != null) {
                if (oVM.ScheduleDetailsData != null && oVM.LowerDose == 0 && oVM.UpperDose == 0) {
                    txtChangingDose.Text = oVM.HyperlinkText;
                    txtChangingDose.FontWeight = FontWeights.Normal;
                }
                else {
                    if (!String.IsNullOrEmpty(oVM.DoseValueDisplay) && !String.Equals(oVM.DoseValueDisplay, "0", StringComparison.CurrentCultureIgnoreCase)) {
                        txtChangingDose.Text = oVM.DoseValueDisplay + " ";
                    }
                    if (oVM.DoseUOM != null) {
                        txtChangingDose.Text += oVM.DoseUOM.DisplayText;
                    }
                    ToolTipService.SetToolTip(txtChangingDose, oVM.HyperlinkText);
                }
                txtChangingDose.IsWordwrap = true;
            }
            return txtChangingDose;
        }
        public ConvertBack(value: Object, targetType: Type, parameter: Object, culture: CultureInfo): Object {
            return value;
        }
    }
    export class DisplayInfusionRate  {
        public Convert(value: Object, targetType: Type, parameter: Object, culture: CultureInfo): Object {
            let oVM: MultipleDoseDetail = ObjectHelper.CreateType<MultipleDoseDetail>(value, MultipleDoseDetail);
            let txtInfusionRate: iLabel = new iLabel();
            if (oVM != null) {
                let strBuild: StringBuilder = new StringBuilder();
                if (!String.IsNullOrEmpty(oVM.InfusionRate)) {
                    strBuild.Append(Convert.ToChar(160));
                    strBuild.Append(oVM.InfusionRate);
                }
                if (!String.IsNullOrEmpty(oVM.InfusionUpperrate)) {
                    strBuild.Append(Convert.ToChar(160));
                    strBuild.Append("-");
                    strBuild.Append(Convert.ToChar(160));
                    strBuild.Append(oVM.InfusionUpperrate);
                }
                if (oVM.Infratenumeratoruom != null && !String.IsNullOrEmpty(oVM.Infratenumeratoruom.DisplayText)) {
                    strBuild.Append(Convert.ToChar(160));
                    strBuild.Append(oVM.Infratenumeratoruom.DisplayText);
                }
                if (oVM.InfrateDenominatoruom != null && !String.IsNullOrEmpty(oVM.InfrateDenominatoruom.DisplayText)) {
                    strBuild.Append(Convert.ToChar(47));
                    strBuild.Append(oVM.InfrateDenominatoruom.DisplayText);
                }
                txtInfusionRate.Text = strBuild.ToString();
                ToolTipService.SetToolTip(txtInfusionRate, strBuild.ToString());
                txtInfusionRate.IsWordwrap = true;
            }
            return txtInfusionRate;
        }
        public ConvertBack(value: Object, targetType: Type, parameter: Object, culture: CultureInfo): Object {
            return value;
        }
    }
    export class DisplayFrequency  {
        public Convert(value: Object, targetType: Type, parameter: Object, culture: CultureInfo): Object {
            let oVM: MultipleDoseDetail = ObjectHelper.CreateType<MultipleDoseDetail>(value, MultipleDoseDetail);
            let txtChangingFrequency: iLabel = new iLabel();
            if (oVM != null && oVM.Frequency != null && !(String.IsNullOrEmpty(oVM.Frequency.DisplayText))) {
                txtChangingFrequency.Text = oVM.Frequency.DisplayText;
                ToolTipService.SetToolTip(txtChangingFrequency, oVM.HyperlinkText);
                txtChangingFrequency.IsWordwrap = true;
            }
            return txtChangingFrequency;
        }
        public ConvertBack(value: Object, targetType: Type, parameter: Object, culture: CultureInfo): Object {
            return value;
        }
    }
    export class DisplayDuration  {
        public Convert(value: Object, targetType: Type, parameter: Object, culture: CultureInfo): Object {
            let oVM: MultipleDoseDetail = ObjectHelper.CreateType<MultipleDoseDetail>(value, MultipleDoseDetail);
            let txtDuration: iLabel = new iLabel();
            if (oVM != null) {
                txtDuration.Text = oVM.DurationValueDisplay;
                ToolTipService.SetToolTip(txtDuration, oVM.HyperlinkText);
                txtDuration.IsWordwrap = true;
            }
            return txtDuration;
        }
        public ConvertBack(value: Object, targetType: Type, parameter: Object, culture: CultureInfo): Object {
            return value;
        }
    }
    export class DisplayVariableDoseInst  {
        public Convert(value: Object, targetType: Type, parameter: Object, culture: CultureInfo): Object {
            let oVM: MultipleDoseDetail = ObjectHelper.CreateType<MultipleDoseDetail>(value, MultipleDoseDetail);
            let txtVariableDoseInst: iLabel = new iLabel();
            let lbltoolTip: iLabel = new iLabel();
            lbltoolTip.MaxWidth = 200;
            lbltoolTip.MaxHeight = 200;
            if (oVM != null) {
                txtVariableDoseInst.Text = oVM.DoseInstructions;
                lbltoolTip.Text = oVM.DoseInstructions;
                lbltoolTip.IsWordwrap = true;
                ToolTipService.SetToolTip(txtVariableDoseInst, lbltoolTip);
                txtVariableDoseInst.IsWordwrap = true;
            }
            return txtVariableDoseInst;
        }
        public ConvertBack(value: Object, targetType: Type, parameter: Object, culture: CultureInfo): Object {
            return value;
        }
    }
    export class DisplayAdminTimes  {
        public Convert(value: Object, targetType: Type, parameter: Object, culture: CultureInfo): Object {
            let oVM: MultipleDoseDetail = ObjectHelper.CreateType<MultipleDoseDetail>(value, MultipleDoseDetail);
            let txtAdminTimes: iLabel = new iLabel();
            if (oVM != null) {
                txtAdminTimes.Text = oVM.AdministrationTimes;
                ToolTipService.SetToolTip(txtAdminTimes, oVM.HyperlinkText);
                txtAdminTimes.IsWordwrap = true;
            }
            return txtAdminTimes;
        }
        public ConvertBack(value: Object, targetType: Type, parameter: Object, culture: CultureInfo): Object {
            return value;
        }
    }
    */
    export class SupplyHistory  {
        public Convert(value: Object, targetType: Type, parameter: Object, culture: CultureInfo): Object {
            let oVM: SupplyDetails = ObjectHelper.CreateType<SupplyDetails>(value, SupplyDetails);
            let cntControl: iLabel = new iLabel();
            cntControl.IsWordwrap = true;
            cntControl.IsParagraph = true;
            let sParameter: string = ObjectHelper.CreateType<string>(parameter, "string");
            let Testinline: iLabelInLineElement = new iLabelInLineElement();
            if (oVM != null) {
                if (String.Equals(oVM.PresItemstatusCode, CConstants.CANCELLED)) {
                    cntControl.IsStrike = true;
                }
                if (!String.IsNullOrEmpty(sParameter) && String.Equals(sParameter, "Medicationitem")) {
                    cntControl.IsWordwrap = true;
                    cntControl.style["white-space"] = "normal";
                    let DrugName: TextBlock = new TextBlock();
                    DrugName.Text = oVM.Drugname;
                    Testinline.IsWordwrap = true;
                    Testinline.InLine = DrugName;
                    cntControl.SetValue(ToolTipService.ToolTipProperty, DrugName);
                }
                else if (!String.IsNullOrEmpty(sParameter) && String.Equals(sParameter, "SupplystatusCode")) {
                    let sSupplystatusCode: TextBlock = new TextBlock();
                    sSupplystatusCode.Text = oVM.SupplystatusCode;
                    Testinline.IsWordwrap = true;
                    Testinline.InLine = sSupplystatusCode;
                    cntControl.SetValue(ToolTipService.ToolTipProperty, sSupplystatusCode);
                }
                else if (!String.IsNullOrEmpty(sParameter) && String.Equals(sParameter, "SupplieddBy")) {
	                  let dt: iLabel = new iLabel();
	                  dt.MaxWidth = 100;
	                  dt.IsWordwrap = true;
	                  if (String.Equals(oVM.PresItemstatusCode, CConstants.CANCELLED)) {
	                      dt.IsStrike = true;
	                  }
	                  let tb3: TextBlock = new TextBlock();
	                  tb3.Text = oVM.SupplieddBy;
	                  let ilb3: iLabelInLineElement = new iLabelInLineElement();
	                  ilb3.IsWordwrap = true;
	                  ilb3.InLine = tb3;
                    ilb3.IsLineBreak = true;
	                  dt.InLines.Add(ilb3);
	                  let tb4: TextBlock = new TextBlock();
	                  tb4.Text = oVM.SuppliedDTTM.ToString();
	                  let ilb4: iLabelInLineElement = new iLabelInLineElement();
	                  ilb4.IsWordwrap = true;
	                  ilb4.InLine = tb4;
	                  dt.InLines.Add(ilb4);
	                  Testinline.IsWordwrap = true;
	                  Testinline.InLine = dt;
                }
                else if (!String.IsNullOrEmpty(sParameter) && (String.Equals(sParameter, "Supplyinstruction") || String.Equals(sParameter, "SupplyinstructionToolTip"))) {
                    let sSupplyinstruction: TextBlock = new TextBlock();
                    if (oVM.Supplyinstruction != null && oVM.Supplyinstruction.Contains("\r\n")) {
                        let drugType: string = "0,1,2,3,4,5,6,7,8,9";
                        let myData: string[] = drugType.Split(',');
                        let st1: string = String.Empty;
                        for (let dnt: number = 0; dnt < myData.length; dnt++) {
                            let st: string = " " + myData[dnt] + " ";
                            if (!oVM.Supplyinstruction.Contains(st)) {
                                st1 = oVM.Supplyinstruction.Replace("\r\n", "   ");
                                if (!String.IsNullOrEmpty(st1) && st1.Contains('\n')) {
                                    let newlinesplit: string[] = st1.Split('\n');
                                    if (newlinesplit != null) {
                                        st1 = String.Empty;
                                        for (let i: number = 0; i < newlinesplit.Count(); i++) {
                                            st1 = st1 + " " + newlinesplit[i];
                                        }
                                    }
                                }
                            }
                        }
                        sSupplyinstruction.Text = st1;
                        ToolTipService.SetToolTip(cntControl,ObjectHelper.CreateObject(new iLabel(),{
                          Text: st1,
                          MaxWidth: 230,
                          IsWordwrap: true,
                      }));
                    }
                    else if (!String.IsNullOrEmpty(oVM.Supplyinstruction) && oVM.Supplyinstruction.Contains("\n")) {
                        let drugType: string = "0,1,2,3,4,5,6,7,8,9";
                        let myData: string[] = drugType.Split(',');
                        let st1: string = String.Empty;
                        for (let dnt: number = 0; dnt < myData.length; dnt++) {
                            let st: string = " " + myData[dnt] + " ";
                            if (!oVM.Supplyinstruction.Contains(st)) {
                                st1 = oVM.Supplyinstruction.Replace("\n", " ");
                            }
                        }
                        sSupplyinstruction.Text = st1;
                        ToolTipService.SetToolTip(cntControl,ObjectHelper.CreateObject(new iLabel(),{
                          Text: st1,
                          MaxWidth: 230,
                          IsWordwrap: true,
                      }));
                    }
                    else if (oVM.Supplyinstruction != null) {
                        sSupplyinstruction.Text = oVM.Supplyinstruction;
                        ToolTipService.SetToolTip(cntControl,ObjectHelper.CreateObject(new iLabel(),{
                          Text: sSupplyinstruction.Text,
                          MaxWidth: 230,
                          IsWordwrap: true,
                      }));
                    }
                    if (!String.IsNullOrEmpty(sSupplyinstruction.Text) && String.Equals(sParameter, "SupplyinstructionToolTip")) {
                        let whitespace: string[] = [];
                        let str = sSupplyinstruction.Text.Split(whitespace);
                        let stooltip: StringBuilder = new StringBuilder();
                        str.forEach( (i)=> {
                            let iterator: string = i;
                            let max_Char: number = 33;
                            let quotient: number = i.length / max_Char;
                            if (i.length > max_Char) {
                                for (let m: number = 1; m <= quotient; m++) {
                                    let index: number = m * max_Char;
                                    if (index <= i.length) {
                                        iterator = iterator.Insert(index, " ");
                                    }
                                }
                                stooltip.Append(iterator);
                            }
                            else {
                                stooltip.Append(i);
                                stooltip.Append(" ");
                            }
                        });
                        sSupplyinstruction.Text = stooltip.ToString();
                        sSupplyinstruction.TextWrapping = TextWrapping.Wrap;
                        sSupplyinstruction.MaxWidth = Number.Parse("250");
                        cntControl.MaxWidth = Number.Parse("250");
                        cntControl.IsWordwrap = true;
                    }
                    Testinline.IsWordwrap = true;
                    Testinline.InLine = sSupplyinstruction;
                    cntControl.SetValue(ToolTipService.ToolTipProperty, sSupplyinstruction);
                    ToolTipService.SetToolTip(cntControl,ObjectHelper.CreateObject(new iLabel(),{
                      Text: oVM.Supplyinstruction,
                      MaxWidth: 230,
                      IsWordwrap: true,
                  }));
                }
                else if (!String.IsNullOrEmpty(sParameter) && String.Equals(sParameter, "LocationName")) {
                    let sLocationName: TextBlock = new TextBlock();
                    sLocationName.Text = oVM.LocationName;
                    Testinline.IsWordwrap = true;
                    Testinline.InLine = sLocationName;
                    cntControl.SetValue(ToolTipService.ToolTipProperty, sLocationName);
                }
                else if (!String.IsNullOrEmpty(sParameter) && String.Equals(sParameter, "NextSupplyDttm")) {
                    let sNextsupply: TextBlock = new TextBlock();
                    sNextsupply.Text = oVM.NextSupplyDttm;
                    Testinline.IsWordwrap = true;
                    Testinline.InLine = sNextsupply;
                    cntControl.SetValue(ToolTipService.ToolTipProperty, sNextsupply);
                }
                else if (!String.IsNullOrEmpty(sParameter) && (String.Equals(sParameter, "DispensingDetail") || String.Equals(sParameter, "DispensingDetailTooltip"))) {
                    if (oVM.DispensingDetail != null) {
                        let layout: Grid = new Grid();
                        let oColumnDefinition: ColumnDefinition = new ColumnDefinition();
                        oColumnDefinition.Width = GridLength.Auto;
                        layout.ColumnDefinitions.Add(oColumnDefinition);
                        let oColumnDefinition1: ColumnDefinition = new ColumnDefinition();
                        oColumnDefinition1.Width = GridLength.Auto;
                        layout.ColumnDefinitions.Add(oColumnDefinition1);
                        let cnt: number = oVM.DispensingDetail.Count;
                        for (let i: number = 0; i <= cnt - 1; i++) {
                            let Dispstatus: string = CommonBB.GetText(oVM.DispensingDetail[i].Status, DispenseStatusListConceptCodeData.ConceptCodes);
                            layout.RowDefinitions.Add(new RowDefinition());
                            let status: iLabel = ObjectHelper.CreateObject(new iLabel(), { Text: Dispstatus, VerticalAlignment: VerticalAlignment.Top });
                            //status.Margin = new Thickness(5);
                            if (String.Equals(oVM.PresItemstatusCode, CConstants.CANCELLED)) {
                                status.IsStrike = true;
                            }
                            let brdr1: Border = new Border();
                            brdr1.BorderBrush = Colors.LightGray.color;
                            //brdr1.BorderThickness = new Thickness(1);
                            brdr1.BorderThickness= "1";
                            brdr1.isContent=true
                            brdr1.Child = status;
                            layout.Children.Add(brdr1);
                            layout.SetGridColumn(brdr1, 1);
                            layout.SetGridRow(brdr1, i+1);
                            let dt: iLabel = new iLabel();
                            dt.TextAlignment = TextAlignment.Left;
                            //dt.Margin = new Thickness(5);
                            dt.IsWordwrap = true;
                            dt.IsParagraph = true;
                            dt.MaxWidth = 360;
                            if (String.Equals(oVM.PresItemstatusCode, CConstants.CANCELLED)) {
                                dt.IsStrike = true;
                            }
                            let sb: StringBuilder = new StringBuilder();
                            sb.Append(oVM.DispensingDetail[i].ResponseDTTM.ToString(CConstants.LongDateWithoutSecs));
                            let tb1: TextBlock = new TextBlock();
                            tb1.Text = sb.ToString();
                            let ilb1: iLabelInLineElement = new iLabelInLineElement();
                            ilb1.IsWordwrap = true;
                            ilb1.InLine = tb1;
                            dt.InLines.Add(ilb1);
                            if (!String.Equals(oVM.DispensingDetail[i].Status, CConstants.DispStRequestSent, StringComparison.InvariantCultureIgnoreCase) && !String.Equals(oVM.DispensingDetail[i].Status, CConstants.DispStCancelledEPR, StringComparison.InvariantCultureIgnoreCase)) {
                                if (String.Equals(oVM.DispensingDetail[i].Status, CConstants.DispStIssued, StringComparison.InvariantCultureIgnoreCase)) {
                                    if (!String.IsNullOrEmpty(oVM.DispensingDetail[i].DispensedDrugName)) {
                                        sb = new StringBuilder();
                                        sb.Append(oVM.DispensingDetail[i].DispensedDrugName);
                                        let tb2: TextBlock = new TextBlock();
                                        tb2.Text = sb.ToString();
                                        let ilb2: iLabelInLineElement = new iLabelInLineElement();
                                        ilb2.IsWordwrap = true;
                                        ilb2.InLine = tb2;
                                        dt.InLines.Add(ilb2);
                                    }
                                    if (!String.IsNullOrEmpty(oVM.DispensingDetail[i].Servicename) && !String.IsNullOrEmpty(oVM.DispensingDetail[i].Locationname)) {
                                        sb = new StringBuilder();
                                        sb.Append(oVM.DispensingDetail[i].Servicename + "-" + oVM.DispensingDetail[i].Locationname);
                                        let tb3: TextBlock = new TextBlock();
                                        tb3.Text = sb.ToString();
                                        let ilb3: iLabelInLineElement = new iLabelInLineElement();
                                        ilb3.IsWordwrap = true;
                                        ilb3.InLine = tb3;
                                        dt.InLines.Add(ilb3);
                                    }
                                    else if (!String.IsNullOrEmpty(oVM.DispensingDetail[i].Servicename)) {
                                        sb = new StringBuilder();
                                        sb.Append(oVM.DispensingDetail[i].Servicename);
                                        let tb3: TextBlock = new TextBlock();
                                        tb3.Text = sb.ToString();
                                        let ilb3: iLabelInLineElement = new iLabelInLineElement();
                                        ilb3.IsWordwrap = true;
                                        ilb3.InLine = tb3;
                                        dt.InLines.Add(ilb3);
                                    }
                                    else if (!String.IsNullOrEmpty(oVM.DispensingDetail[i].Locationname)) {
                                        sb = new StringBuilder();
                                        sb.Append(oVM.DispensingDetail[i].Locationname);
                                        let tb3: TextBlock = new TextBlock();
                                        tb3.Text = sb.ToString();
                                        let ilb3: iLabelInLineElement = new iLabelInLineElement();
                                        ilb3.IsWordwrap = true;
                                        ilb3.InLine = tb3;
                                        dt.InLines.Add(ilb3);
                                    }
                                    if (!String.IsNullOrEmpty(oVM.DispensingDetail[i].Name)) {
                                        sb = new StringBuilder();
                                        sb.Append(oVM.DispensingDetail[i].Name);
                                        let tb4: TextBlock = new TextBlock();
                                        tb4.Text = sb.ToString();
                                        let ilb4: iLabelInLineElement = new iLabelInLineElement();
                                        ilb4.IsWordwrap = true;
                                        ilb4.InLine = tb4;
                                        dt.InLines.Add(ilb4);
                                    }
                                }
                                else {
                                    if (!String.IsNullOrEmpty(oVM.DispensingDetail[i].Name)) {
                                        sb = new StringBuilder();
                                        sb.Append(oVM.DispensingDetail[i].Name);
                                        let tb2: TextBlock = new TextBlock();
                                        tb2.Text = sb.ToString();
                                        let ilb2: iLabelInLineElement = new iLabelInLineElement();
                                        ilb2.IsWordwrap = true;
                                        ilb2.InLine = tb2;
                                        dt.InLines.Add(ilb2);
                                    }
                                    if (!String.IsNullOrEmpty(oVM.DispensingDetail[i].Reason)) {
                                        sb = new StringBuilder();
                                        sb.Append(oVM.DispensingDetail[i].Reason);
                                        let tb3: TextBlock = new TextBlock();
                                        tb3.Text = sb.ToString();
                                        let ilb3: iLabelInLineElement = new iLabelInLineElement();
                                        ilb3.IsWordwrap = true;
                                        ilb3.InLine = tb3;
                                        dt.InLines.Add(ilb3);
                                    }
                                }
                            }
                            let brdr2: Border = new Border();
                            brdr2.BorderBrush = Colors.LightGray.color;
                            //brdr2.BorderThickness = new Thickness(0, 1, 1, 1);
                            brdr2.BorderThickness= "1";
                            brdr2.isContent=true
                            brdr2.Child = dt;
                            layout.Children.Add(brdr2);
                            layout.SetGridColumn(brdr2, 2);
                            layout.SetGridRow(brdr2, i+1);
                        }
                        if (String.Equals(sParameter, "DispensingDetailTooltip")) {
                            layout.MaxWidth = Number.Parse("450");
                        }
                        Testinline.InLine = layout;
                    }
                }
                else if (!String.IsNullOrEmpty(sParameter) && String.Equals(sParameter, "Prescriptiontype")) {
                    let sPrescriptiontype: TextBlock = new TextBlock();
                    sPrescriptiontype.Text = oVM.Prescriptiontype;
                    Testinline.IsWordwrap = true;
                    Testinline.InLine = sPrescriptiontype;
                }
            }
            cntControl.InLines.Add(Testinline);
            return cntControl;
        }
        public ConvertBack(value: Object, targetType: Type, parameter: Object, culture: CultureInfo): Object {
            return value;
        }
    }
    export class SupplyHistoryForMCI  {
        public Convert(value: Object, targetType: Type, parameter: Object, culture: CultureInfo): Object {
            let oVM: SupplyDetailsMCIChild = ObjectHelper.CreateType<SupplyDetailsMCIChild>(value, SupplyDetailsMCIChild);
            let cntControl: iLabel = new iLabel();
            cntControl.IsWordwrap = true;
            cntControl.IsParagraph = true;
            let sParameter: string = ObjectHelper.CreateType<string>(parameter, "string");
            let Testinline: iLabelInLineElement = new iLabelInLineElement();
            if (oVM != null) {
                if (String.Equals(oVM.PresItemstatusCode, CConstants.CANCELLED)) {
                    cntControl.IsStrike = true;
                }
                if (!String.IsNullOrEmpty(sParameter) && String.Equals(sParameter, "Medicationitem")) {
                    cntControl.IsWordwrap = true;
                    let DrugName: TextBlock = new TextBlock();
                    DrugName.Text = oVM.Drugname;
                    Testinline.IsWordwrap = true;
                    Testinline.InLine = DrugName;
                }
                else if (!String.IsNullOrEmpty(sParameter) && String.Equals(sParameter, "SupplystatusCode")) {
                    let sSupplystatusCode: TextBlock = new TextBlock();
                    sSupplystatusCode.Text = oVM.SupplystatusCode;
                    Testinline.IsWordwrap = true;
                    Testinline.InLine = sSupplystatusCode;
                }
                else if (!String.IsNullOrEmpty(sParameter) && String.Equals(sParameter, "SupplieddBy")) {
                    let dt: iLabel = new iLabel();
                    dt.MaxWidth = 100;
                    dt.IsWordwrap = true;
                    if (String.Equals(oVM.PresItemstatusCode, CConstants.CANCELLED)) {
                        dt.IsStrike = true;
                    }
                    let tb3: TextBlock = new TextBlock();
                    tb3.Text = oVM.SupplieddBy;
                    let ilb3: iLabelInLineElement = new iLabelInLineElement();
                    ilb3.IsWordwrap = true;
                    ilb3.InLine = tb3;
                    dt.InLines.Add(ilb3);
                    let tb4: TextBlock = new TextBlock();
                    tb4.Text = oVM.SuppliedDTTM.ToString();
                    let ilb4: iLabelInLineElement = new iLabelInLineElement();
                    ilb4.IsWordwrap = true;
                    ilb4.InLine = tb4;
                    dt.InLines.Add(ilb4);
                    Testinline.IsWordwrap = true;
                    Testinline.InLine = dt;
                }
                else if (!String.IsNullOrEmpty(sParameter) && (String.Equals(sParameter, "Supplyinstruction") || String.Equals(sParameter, "SupplyinstructionToolTip"))) {
                    let sSupplyinstruction: TextBlock = new TextBlock();
                    if (oVM.Supplyinstruction != null && oVM.Supplyinstruction.Contains("\r\n")) {
                        let drugType: string = "0,1,2,3,4,5,6,7,8,9";
                        let myData: string[] = drugType.Split(',');
                        let st1: string = String.Empty;
                        for (let dnt: number = 0; dnt < myData.length; dnt++) {
                            let st: string = " " + myData[dnt] + " ";
                            if (!oVM.Supplyinstruction.Contains(st)) {
                                st1 = oVM.Supplyinstruction.Replace("\r\n", "   ");
                                if (!String.IsNullOrEmpty(st1) && st1.Contains('\n')) {
                                    let newlinesplit: string[] = st1.Split('\n');
                                    if (newlinesplit != null) {
                                        st1 = String.Empty;
                                        for (let i: number = 0; i < newlinesplit.Count(); i++) {
                                            st1 = st1 + " " + newlinesplit[i];
                                        }
                                    }
                                }
                            }
                        }
                        sSupplyinstruction.Text = st1;
                    }
                    else if (!String.IsNullOrEmpty(oVM.Supplyinstruction) && oVM.Supplyinstruction.Contains("\n")) {
                        let drugType: string = "0,1,2,3,4,5,6,7,8,9";
                        let myData: string[] = drugType.Split(',');
                        let st1: string = String.Empty;
                        for (let dnt: number = 0; dnt < myData.length; dnt++) {
                            let st: string = " " + myData[dnt] + " ";
                            if (!oVM.Supplyinstruction.Contains(st)) {
                                st1 = oVM.Supplyinstruction.Replace("\n", " ");
                            }
                        }
                        sSupplyinstruction.Text = st1;
                    }
                    else if (oVM.Supplyinstruction != null) {
                        sSupplyinstruction.Text = oVM.Supplyinstruction;
                    }
                    if (!String.IsNullOrEmpty(sSupplyinstruction.Text) && String.Equals(sParameter, "SupplyinstructionToolTip")) {
                        let whitespace: string[] = [];
                        let str = sSupplyinstruction.Text.Split(whitespace);
                        let stooltip: StringBuilder = new StringBuilder();
                        str.forEach( (i)=> {
                            let iterator: string = i;
                            let max_Char: number = 33;
                            let quotient: number = i.length / max_Char;
                            if (i.length > max_Char) {
                                for (let m: number = 1; m <= quotient; m++) {
                                    let index: number = m * max_Char;
                                    if (index <= i.length) {
                                        iterator = iterator.Insert(index, " ");
                                    }
                                }
                                stooltip.Append(iterator);
                            }
                            else {
                                stooltip.Append(i);
                                stooltip.Append(" ");
                            }
                        });
                        sSupplyinstruction.Text = stooltip.ToString();
                        sSupplyinstruction.TextWrapping = TextWrapping.Wrap;
                        sSupplyinstruction.MaxWidth = Number.Parse("250");
                        cntControl.MaxWidth = Number.Parse("250");
                        cntControl.IsWordwrap = true;
                    }
                    Testinline.IsWordwrap = true;
                    Testinline.InLine = sSupplyinstruction;
                }
                else if (!String.IsNullOrEmpty(sParameter) && String.Equals(sParameter, "LocationName")) {
                    let sLocationName: TextBlock = new TextBlock();
                    sLocationName.Text = oVM.LocationName;
                    Testinline.IsWordwrap = true;
                    Testinline.InLine = sLocationName;
                }
                else if (!String.IsNullOrEmpty(sParameter) && String.Equals(sParameter, "NextSupplyDttm")) {
                    let sNextsupply: TextBlock = new TextBlock();
                    sNextsupply.Text = oVM.NextSupplyDttm;
                    Testinline.IsWordwrap = true;
                    Testinline.InLine = sNextsupply;
                }
                else if (!String.IsNullOrEmpty(sParameter) && String.Equals(sParameter, "Prescriptiontype")) {
                    let sPrescriptiontype: TextBlock = new TextBlock();
                    sPrescriptiontype.Text = oVM.Prescriptiontype;
                    Testinline.IsWordwrap = true;
                    Testinline.InLine = sPrescriptiontype;
                }
                else if (!String.IsNullOrEmpty(sParameter) && (String.Equals(sParameter, "DispensingDetail") || String.Equals(sParameter, "DispensingDetailTooltip"))) {
                    if (oVM.DispensingDetail != null) {
                        let layout: Grid = new Grid();
                        let oColumnDefinition: ColumnDefinition = new ColumnDefinition();
                        oColumnDefinition.Width = GridLength.Auto;
                        layout.ColumnDefinitions.Add(oColumnDefinition);
                        let oColumnDefinition1: ColumnDefinition = new ColumnDefinition();
                        oColumnDefinition1.Width = GridLength.Auto;
                        layout.ColumnDefinitions.Add(oColumnDefinition1);
                        let cnt: number = oVM.DispensingDetail.Count;
                        for (let i: number = 0; i <= cnt - 1; i++) {
                            let Dispstatus: string = CommonBB.GetText(oVM.DispensingDetail[i].Status, DispenseStatusListConceptCodeData.ConceptCodes);
                            layout.RowDefinitions.Add(new RowDefinition());
                            let status: iLabel = ObjectHelper.CreateObject(new iLabel(), { Text: Dispstatus, VerticalAlignment: VerticalAlignment.Top });
                            //status.Margin = new Thickness(5);
                            if (String.Equals(oVM.PresItemstatusCode, CConstants.CANCELLED)) {
                                status.IsStrike = true;
                            }
                            let brdr1: Border = new Border();
                            brdr1.BorderBrush = Colors.LightGray.color;
                            //brdr1.BorderThickness = new Thickness(1);
                            brdr1.BorderThickness= "1";
                            brdr1.isContent=true
                            brdr1.Child = status;
                            layout.Children.Add(brdr1);
                            layout.SetGridColumn(brdr1, 1);
                            layout.SetGridRow(brdr1, i+1);
                            let dt: iLabel = new iLabel();
                            dt.TextAlignment = TextAlignment.Left;
                            //dt.Margin = new Thickness(5);
                            dt.IsWordwrap = true;
                            dt.IsParagraph = true;
                            dt.MaxWidth = 360;
                            if (String.Equals(oVM.PresItemstatusCode, CConstants.CANCELLED)) {
                                dt.IsStrike = true;
                            }
                            let sb: StringBuilder = new StringBuilder();
                            sb.Append(oVM.DispensingDetail[i].ResponseDTTM.ToString(CConstants.LongDateWithoutSecs));
                            let tb1: TextBlock = new TextBlock();
                            tb1.Text = sb.ToString();
                            let ilb1: iLabelInLineElement = new iLabelInLineElement();
                            ilb1.IsWordwrap = true;
                            ilb1.InLine = tb1;
                            dt.InLines.Add(ilb1);
                            if (!String.Equals(oVM.DispensingDetail[i].Status, CConstants.DispStRequestSent, StringComparison.InvariantCultureIgnoreCase) && !String.Equals(oVM.DispensingDetail[i].Status, CConstants.DispStCancelledEPR, StringComparison.InvariantCultureIgnoreCase)) {
                                if (String.Equals(oVM.DispensingDetail[i].Status, CConstants.DispStIssued, StringComparison.InvariantCultureIgnoreCase)) {
                                    if (!String.IsNullOrEmpty(oVM.DispensingDetail[i].DispensedDrugName)) {
                                        sb = new StringBuilder();
                                        sb.Append(oVM.DispensingDetail[i].DispensedDrugName);
                                        let tb2: TextBlock = new TextBlock();
                                        tb2.Text = sb.ToString();
                                        let ilb2: iLabelInLineElement = new iLabelInLineElement();
                                        ilb2.IsWordwrap = true;
                                        ilb2.InLine = tb2;
                                        dt.InLines.Add(ilb2);
                                    }
                                    if (!String.IsNullOrEmpty(oVM.DispensingDetail[i].Servicename) && !String.IsNullOrEmpty(oVM.DispensingDetail[i].Locationname)) {
                                        sb = new StringBuilder();
                                        sb.Append(oVM.DispensingDetail[i].Servicename + "-" + oVM.DispensingDetail[i].Locationname);
                                        let tb3: TextBlock = new TextBlock();
                                        tb3.Text = sb.ToString();
                                        let ilb3: iLabelInLineElement = new iLabelInLineElement();
                                        ilb3.IsWordwrap = true;
                                        ilb3.InLine = tb3;
                                        dt.InLines.Add(ilb3);
                                    }
                                    else if (!String.IsNullOrEmpty(oVM.DispensingDetail[i].Servicename)) {
                                        sb = new StringBuilder();
                                        sb.Append(oVM.DispensingDetail[i].Servicename);
                                        let tb3: TextBlock = new TextBlock();
                                        tb3.Text = sb.ToString();
                                        let ilb3: iLabelInLineElement = new iLabelInLineElement();
                                        ilb3.IsWordwrap = true;
                                        ilb3.InLine = tb3;
                                        dt.InLines.Add(ilb3);
                                    }
                                    else if (!String.IsNullOrEmpty(oVM.DispensingDetail[i].Locationname)) {
                                        sb = new StringBuilder();
                                        sb.Append(oVM.DispensingDetail[i].Locationname);
                                        let tb3: TextBlock = new TextBlock();
                                        tb3.Text = sb.ToString();
                                        let ilb3: iLabelInLineElement = new iLabelInLineElement();
                                        ilb3.IsWordwrap = true;
                                        ilb3.InLine = tb3;
                                        dt.InLines.Add(ilb3);
                                    }
                                    if (!String.IsNullOrEmpty(oVM.DispensingDetail[i].Name)) {
                                        sb = new StringBuilder();
                                        sb.Append(oVM.DispensingDetail[i].Name);
                                        let tb4: TextBlock = new TextBlock();
                                        tb4.Text = sb.ToString();
                                        let ilb4: iLabelInLineElement = new iLabelInLineElement();
                                        ilb4.IsWordwrap = true;
                                        ilb4.InLine = tb4;
                                        dt.InLines.Add(ilb4);
                                    }
                                }
                                else {
                                    if (!String.IsNullOrEmpty(oVM.DispensingDetail[i].Name)) {
                                        sb = new StringBuilder();
                                        sb.Append(oVM.DispensingDetail[i].Name);
                                        let tb2: TextBlock = new TextBlock();
                                        tb2.Text = sb.ToString();
                                        let ilb2: iLabelInLineElement = new iLabelInLineElement();
                                        ilb2.IsWordwrap = true;
                                        ilb2.InLine = tb2;
                                        dt.InLines.Add(ilb2);
                                    }
                                    if (!String.IsNullOrEmpty(oVM.DispensingDetail[i].Reason)) {
                                        sb = new StringBuilder();
                                        sb.Append(oVM.DispensingDetail[i].Reason);
                                        let tb3: TextBlock = new TextBlock();
                                        tb3.Text = sb.ToString();
                                        let ilb3: iLabelInLineElement = new iLabelInLineElement();
                                        ilb3.IsWordwrap = true;
                                        ilb3.InLine = tb3;
                                        dt.InLines.Add(ilb3);
                                    }
                                }
                            }
                            let brdr2: Border = new Border();
                            brdr2.BorderBrush =  Colors.LightGray.color;
                            //brdr2.BorderThickness = new Thickness(0, 1, 1, 1);
                            brdr2.BorderThickness= "1";
                            brdr2.isContent=true
                            brdr2.Child = dt;
                            layout.Children.Add(brdr2);
			    layout.SetGridColumn(brdr2, 2);
                            layout.SetGridRow(brdr2, i+1);
                        }
                        if (String.Equals(sParameter, "DispensingDetailTooltip")) {
                            layout.MaxWidth = Number.Parse("450");
                        }
                        Testinline.InLine = layout;
                    }
                }
            }
            cntControl.InLines.Add(Testinline);
            return cntControl;
        }
        public ConvertBack(value: Object, targetType: Type, parameter: Object, culture: CultureInfo): Object {
            return value;
        }
    }
    export class TechnicalDetailsHistory  {
        public Convert(value: Object, targetType: Type, parameter: Object, culture: CultureInfo): Object {
            let oVM: TechnicalDetails = ObjectHelper.CreateType<TechnicalDetails>(value, TechnicalDetails);
            let cntControl: iLabel = new iLabel();
            cntControl.IsWordwrap = true;
            cntControl.IsParagraph = true;
            let sParameter: string = ObjectHelper.CreateType<string>(parameter, "string");
            let wardIcon: Image = null;
            let Testinline: iLabelInLineElement = new iLabelInLineElement();
            if (oVM != null) {
                if (oVM.IsCancelled) {
                    cntControl.IsStrike = true;
                }
                if (!String.IsNullOrEmpty(sParameter) && String.Equals(sParameter, "IdentityfyingName")) {
                    cntControl.IsWordwrap = true;
                    let IdentityfyingName: iLabel = new iLabel();
                    IdentityfyingName.Text = oVM.IdentifyingName;
                    IdentityfyingName.IsWordwrap = true;
                    IdentityfyingName.MaxWidth = 220;
                    if (oVM.IsCancelled) {
                        IdentityfyingName.IsStrike = true;
                    }
                    Testinline.IsWordwrap = true;
                    if (MedicationCommonProfileData.AddPrescribingConfig != null && MedicationCommonProfileData.AddPrescribingConfig.EnableWardStockConfig && oVM.IsWardStock) {
                        wardIcon = this.GetImage("Ward", MedImage.GetPath(MedImages.WardStockIcon), "Item is stocked at this location");
                        IdentityfyingName.InLines.Add(ObjectHelper.CreateObject(new iLabelInLineElement(), { InLine: wardIcon }));
                    }
                    Testinline.InLine = IdentityfyingName;
                }
                else if (!String.IsNullOrEmpty(sParameter) && String.Equals(sParameter, "QuantityPerDoseWithUOM")) {
                    cntControl.IsWordwrap = true;
                    let QuantityPerDoseWithUOM: TextBlock = new TextBlock();
                    QuantityPerDoseWithUOM.Text = oVM.QuantityPerDoseWithUOM;
                    Testinline.IsWordwrap = true;
                    Testinline.InLine = QuantityPerDoseWithUOM;
                }
                else if (!String.IsNullOrEmpty(sParameter) && String.Equals(sParameter, "TotalQuantityWithUOM")) {
                    cntControl.IsWordwrap = true;
                    let TotalQuantityWithUOM: TextBlock = new TextBlock();
                    TotalQuantityWithUOM.Text = oVM.TotalQuantityWithUOM;
                    Testinline.IsWordwrap = true;
                    Testinline.InLine = TotalQuantityWithUOM;
                }
                else if (!String.IsNullOrEmpty(sParameter) && (String.Equals(sParameter, "DispensingDetail") || String.Equals(sParameter, "DispensingDetailTooltip"))) {
                    if (oVM.DispensingDetail != null) {
                        let layout: Grid = new Grid();
                        let oColumnDefinition: ColumnDefinition = new ColumnDefinition();
                        oColumnDefinition.Width = GridLength.Auto;
                        layout.ColumnDefinitions.Add(oColumnDefinition);
                        let oColumnDefinition1: ColumnDefinition = new ColumnDefinition();
                        oColumnDefinition1.Width = GridLength.Auto;
                        layout.ColumnDefinitions.Add(oColumnDefinition1);
                        let cnt: number = oVM.DispensingDetail.Count;
                        for (let i: number = 0; i <= cnt - 1; i++) {
                            let Dispstatus: string = CommonBB.GetText(oVM.DispensingDetail[i].Status, DispenseStatusListConceptCodeData.ConceptCodes);
                            layout.RowDefinitions.Add(new RowDefinition());
                            let status: iLabel = ObjectHelper.CreateObject(new iLabel(), { Text: Dispstatus, VerticalAlignment: VerticalAlignment.Top });
                            //status.Margin = new Thickness(5);
                            if (oVM.IsCancelled) {
                                status.IsStrike = true;
                            }
                            let brdr1: Border = new Border();
                            brdr1.BorderBrush = Colors.LightGray.color;
                            //brdr1.BorderThickness = new Thickness(1);
                            brdr1.BorderThickness= "1";
                            brdr1.isContent=true
                            brdr1.Child = status;
                            layout.Children.Add(brdr1);
                            layout.SetGridColumn(brdr1, 1);
                            layout.SetGridRow(brdr1, i+1);
                            let dt: iLabel = new iLabel();
                            dt.TextAlignment = TextAlignment.Left;
                            //dt.Margin = new Thickness(5);
                            dt.IsWordwrap = true;
                            dt.IsParagraph = true;
                            dt.MaxWidth = 360;
                            if (oVM.IsCancelled) {
                                dt.IsStrike = true;
                            }
                            let sb: StringBuilder = new StringBuilder();
                            sb.Append(oVM.DispensingDetail[i].ResponseDTTM.ToString(CConstants.LongDateWithoutSecs));
                            let tb1: TextBlock = new TextBlock();
                            tb1.Text = sb.ToString();
                            let ilb1: iLabelInLineElement = new iLabelInLineElement();
                            ilb1.IsWordwrap = true;
                            ilb1.InLine = tb1;
                            dt.InLines.Add(ilb1);
                            if (!String.Equals(oVM.DispensingDetail[i].Status, CConstants.DispStRequestSent, StringComparison.InvariantCultureIgnoreCase) && !String.Equals(oVM.DispensingDetail[i].Status, CConstants.DispStCancelledEPR, StringComparison.InvariantCultureIgnoreCase)) {
                                if (String.Equals(oVM.DispensingDetail[i].Status, CConstants.DispStIssued, StringComparison.InvariantCultureIgnoreCase)) {
                                    if (!String.IsNullOrEmpty(oVM.DispensingDetail[i].DispensedDrugName)) {
                                        sb = new StringBuilder();
                                        sb.Append(oVM.DispensingDetail[i].DispensedDrugName);
                                        let tb2: TextBlock = new TextBlock();
                                        tb2.Text = sb.ToString();
                                        let ilb2: iLabelInLineElement = new iLabelInLineElement();
                                        ilb2.IsWordwrap = true;
                                        ilb2.InLine = tb2;
                                        dt.InLines.Add(ilb2);
                                    }
                                    if (!String.IsNullOrEmpty(oVM.DispensingDetail[i].Servicename) && !String.IsNullOrEmpty(oVM.DispensingDetail[i].Locationname)) {
                                        sb = new StringBuilder();
                                        sb.Append(oVM.DispensingDetail[i].Servicename + "-" + oVM.DispensingDetail[i].Locationname);
                                        let tb3: TextBlock = new TextBlock();
                                        tb3.Text = sb.ToString();
                                        let ilb3: iLabelInLineElement = new iLabelInLineElement();
                                        ilb3.IsWordwrap = true;
                                        ilb3.InLine = tb3;
                                        dt.InLines.Add(ilb3);
                                    }
                                    else if (!String.IsNullOrEmpty(oVM.DispensingDetail[i].Servicename)) {
                                        sb = new StringBuilder();
                                        sb.Append(oVM.DispensingDetail[i].Servicename);
                                        let tb3: TextBlock = new TextBlock();
                                        tb3.Text = sb.ToString();
                                        let ilb3: iLabelInLineElement = new iLabelInLineElement();
                                        ilb3.IsWordwrap = true;
                                        ilb3.InLine = tb3;
                                        dt.InLines.Add(ilb3);
                                    }
                                    else if (!String.IsNullOrEmpty(oVM.DispensingDetail[i].Locationname)) {
                                        sb = new StringBuilder();
                                        sb.Append(oVM.DispensingDetail[i].Locationname);
                                        let tb3: TextBlock = new TextBlock();
                                        tb3.Text = sb.ToString();
                                        let ilb3: iLabelInLineElement = new iLabelInLineElement();
                                        ilb3.IsWordwrap = true;
                                        ilb3.InLine = tb3;
                                        dt.InLines.Add(ilb3);
                                    }
                                    if (!String.IsNullOrEmpty(oVM.DispensingDetail[i].Name)) {
                                        sb = new StringBuilder();
                                        sb.Append(oVM.DispensingDetail[i].Name);
                                        let tb4: TextBlock = new TextBlock();
                                        tb4.Text = sb.ToString();
                                        let ilb4: iLabelInLineElement = new iLabelInLineElement();
                                        ilb4.IsWordwrap = true;
                                        ilb4.InLine = tb4;
                                        dt.InLines.Add(ilb4);
                                    }
                                }
                                else {
                                    if (!String.IsNullOrEmpty(oVM.DispensingDetail[i].Name)) {
                                        sb = new StringBuilder();
                                        sb.Append(oVM.DispensingDetail[i].Name);
                                        let tb2: TextBlock = new TextBlock();
                                        tb2.Text = sb.ToString();
                                        let ilb2: iLabelInLineElement = new iLabelInLineElement();
                                        ilb2.IsWordwrap = true;
                                        ilb2.InLine = tb2;
                                        dt.InLines.Add(ilb2);
                                    }
                                    if (!String.IsNullOrEmpty(oVM.DispensingDetail[i].Reason)) {
                                        sb = new StringBuilder();
                                        sb.Append(oVM.DispensingDetail[i].Reason);
                                        let tb3: TextBlock = new TextBlock();
                                        tb3.Text = sb.ToString();
                                        let ilb3: iLabelInLineElement = new iLabelInLineElement();
                                        ilb3.IsWordwrap = true;
                                        ilb3.InLine = tb3;
                                        dt.InLines.Add(ilb3);
                                    }
                                }
                            }
                            let brdr2: Border = new Border();
                            brdr2.BorderBrush = Colors.LightGray.color;
                            //brdr2.BorderThickness = new Thickness(0, 1, 1, 1);
                            brdr2.BorderThickness= "1";
                            brdr2.isContent=true
                            brdr2.Child = dt;
                            layout.Children.Add(brdr2);
                            layout.SetGridColumn(brdr2, 2);
                            layout.SetGridRow(brdr2, i+1);
                        }
                        if (String.Equals(sParameter, "DispensingDetailTooltip")) {
                            layout.MaxWidth = Number.Parse("450");
                        }
                        Testinline.InLine = layout;
                    }
                }
                else if (!String.IsNullOrEmpty(sParameter) && (String.Equals(sParameter, "SupplyInstructionDesc") || String.Equals(sParameter, "SupplyinstructionToolTip"))) {
                    let SupplyInstructionDesc: TextBlock = new TextBlock();
                    if (oVM.SupplyInstructionDesc != null && oVM.SupplyInstructionDesc.Contains("\r\n")) {
                        let drugType: string = "0,1,2,3,4,5,6,7,8,9";
                        let myData: string[] = drugType.Split(',');
                        let st1: string = String.Empty;
                        for (let dnt: number = 0; dnt < myData.length; dnt++) {
                            let st: string = " " + myData[dnt] + " ";
                            if (!oVM.SupplyInstructionDesc.Contains(st)) {
                                st1 = oVM.SupplyInstructionDesc.Replace("\r\n", "   ");
                                if (!String.IsNullOrEmpty(st1) && st1.Contains('\n')) {
                                    let newlinesplit: string[] = st1.Split('\n');
                                    if (newlinesplit != null) {
                                        st1 = String.Empty;
                                        for (let i: number = 0; i < newlinesplit.Count(); i++) {
                                            st1 = st1 + " " + newlinesplit[i];
                                        }
                                    }
                                }
                            }
                        }
                        SupplyInstructionDesc.Text = st1;
                        ToolTipService.SetToolTip(cntControl,ObjectHelper.CreateObject(new iLabel(),{
                          Text: st1,
                          MaxWidth: 225,
                          IsWordwrap: true,
                      }));
                    }
                    else if (!String.IsNullOrEmpty(oVM.SupplyInstructionDesc) && oVM.SupplyInstructionDesc.Contains("\n")) {
                        let drugType: string = "0,1,2,3,4,5,6,7,8,9";
                        let myData: string[] = drugType.Split(',');
                        let st1: string = String.Empty;
                        for (let dnt: number = 0; dnt < myData.length; dnt++) {
                            let st: string = " " + myData[dnt] + " ";
                            if (!oVM.SupplyInstructionDesc.Contains(st)) {
                                st1 = oVM.SupplyInstructionDesc.Replace("\n", " ");
                            }
                        }
                        SupplyInstructionDesc.Text = st1;
                        ToolTipService.SetToolTip(cntControl,ObjectHelper.CreateObject(new iLabel(),{
                          Text: st1,
                          MaxWidth: 225,
                          IsWordwrap: true,
                      }));   
                    }
                    else if (oVM.SupplyInstructionDesc != null) {
                        SupplyInstructionDesc.Text = oVM.SupplyInstructionDesc;
                        ToolTipService.SetToolTip(cntControl,ObjectHelper.CreateObject(new iLabel(),{
                          Text: SupplyInstructionDesc.Text,
                          MaxWidth: 225,
                          IsWordwrap: true,
                      }));
                    }
                    if (!String.IsNullOrEmpty(SupplyInstructionDesc.Text) && String.Equals(sParameter, "SupplyinstructionToolTip")) {
                        let whitespace: string[] = [];
                        let str = SupplyInstructionDesc.Text.Split(whitespace);
                        let stooltip: StringBuilder = new StringBuilder();
                        str.forEach( (i)=> {
                            let iterator: string = i;
                            let max_Char: number = 33;
                            let quotient: number = i.length / max_Char;
                            if (i.length > max_Char) {
                                for (let m: number = 1; m <= quotient; m++) {
                                    let index: number = m * max_Char;
                                    if (index <= i.length) {
                                        iterator = iterator.Insert(index, " ");
                                    }
                                }
                                stooltip.Append(iterator);
                            }
                            else {
                                stooltip.Append(i);
                                stooltip.Append(" ");
                            }
                        });
                        SupplyInstructionDesc.Text = stooltip.ToString();
                        SupplyInstructionDesc.TextWrapping = TextWrapping.Wrap;
                        SupplyInstructionDesc.MaxWidth = Number.Parse("250");
                        cntControl.MaxWidth = Number.Parse("250");
                        cntControl.IsWordwrap = true;
                        ToolTipService.SetToolTip(cntControl,ObjectHelper.CreateObject(new iLabel(),{
                               Text: oVM.SupplyInstructionDesc,
                               MaxWidth: 225,
                               IsWordwrap: true,
                           }));
                    }
                    Testinline.IsWordwrap = true;
                    Testinline.InLine = SupplyInstructionDesc;
                }
            }
            cntControl.InLines.Add(Testinline);
            return cntControl;
        }
        public ConvertBack(value: Object, targetType: Type, parameter: Object, culture: CultureInfo): Object {
            return value;
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
    }

    /*
    export class BoolVisibilityConverter  {
        public Convert(value: Object, targetType: Type, parameter: Object, culture: CultureInfo): Object {
            if (value != null) {
                if (<boolean>value)
                    return Visibility.Visible;
            }
            return Visibility.Collapsed;
        }
        public ConvertBack(value: Object, targetType: Type, parameter: Object, culture: CultureInfo): Object {
            return null;
        }
    }
    export class FalseToVisibilityConverter  {
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
*/
