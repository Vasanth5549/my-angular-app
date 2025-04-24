import { Convert } from 'epma-platform/services';
import { StringComparison, ObservableCollection, CultureInfo, Visibility } from 'epma-platform/models';
import { BitmapImage, Color, Colors, FontFamily, FontStyles, FontWeights, Grid, HorizontalAlignment, Image, SolidColorBrush, StackPanel, Stretch, Style, TextAlignment, TextBlock, TextWrapping, Thickness, ToolTipService, Uri, UriKind, VerticalAlignment, WrapPanel, iLabel, iLabelInLineElement } from 'epma-platform/controls';
import 'epma-platform/stringextension';
import { ObjectHelper } from 'epma-platform/helper';
import { CConstants, MedImage, MedImages, RecordAdminType, SlotStatus } from '../utilities/CConstants';
import { MedsAdminChartToolTip } from '../resource/medsadmincharttooltip.designer';
import { ColumnDefinition } from 'src/app/shared/epma-platform/controls/epma-grid/epma-grid.component';
import { Orientation } from 'src/app/shared/epma-platform/controls-model/Orientation';
import { CommonBB } from 'src/app/lorappcommonbb/utilities/common';
import { CMedicationLineDisplayData, LineDisplayConfigurations } from 'src/app/lorappslprofiletypes/medication';
import { CDrugHdrAddnlInfo, CDrugHeader, DrugHeaderItem } from '../common/drugheader';
import { InfusionTypeConceptCodeData, MedicationCommonProfileData } from 'src/app/lorappmedicationcommonbb/utilities/profiledata';
import { Environment, Type } from 'src/app/product/shared/models/Common';
import { DrugItemSubTypeCode, InfusionTypeCode } from 'src/app/lorappmedicationcommonbb/utilities/constants';
import { ArrayOfString } from 'src/app/shared/epma-platform/soap-client/MedicationAdministrationWS';
import { App } from 'src/app/shared/epma-platform/controls/ResourceStyle';
import { Resource } from '../resource';
import { GridLength, GridUnitType } from 'src/app/shared/epma-platform/controls/GridExt';
import { MedScanRecAdmVM } from '../viewmodel/MedScanRecAdmVM';
import { Binding } from 'src/app/shared/epma-platform/controls/FrameworkElement';

export class LineDisplayHelper {
    static lnDisFilter: ObservableCollection<LineDisplayConfigurations>;
    public static GetLineItemContent(sType: string, oDrgHeader: DrugHeaderItem, oDrugAddnlInfo: CDrugHdrAddnlInfo): iLabel {
        let paraLineDisplay: iLabel = ObjectHelper.CreateObject(new iLabel(), { TextAlignment: TextAlignment.Left, IsWordwrap: true });
        let lnDis: ObservableCollection<LineDisplayConfigurations> = MedicationCommonProfileData.MedLineDisplay.objLineDisConfig;
        // let PRESITEM = from LineDisplayElement in lnDis
        // where LineDisplayElement.IsSelected == 1 && String.Compare(LineDisplayElement.ColCode, "CC_MLDPRESITEM", StringComparison.OrdinalIgnoreCase) == 0
        // select LineDisplayElement;
        let PRESITEM = lnDis.Where(LineDisplayElement =>LineDisplayElement.IsSelected==1&&String.Compare(LineDisplayElement.ColCode,"CC_MLDPRESITEM",StringComparison.OrdinalIgnoreCase)==0).Select(LineDisplayElement => LineDisplayElement);
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
        let paraLineDisplay: iLabel = ObjectHelper.CreateObject(new iLabel(), { TextAlignment: TextAlignment.Left, IsWordwrap: true });
        let lnDis: ObservableCollection<LineDisplayConfigurations> = MedicationCommonProfileData.MedLineDisplay.objLineDisConfig;
        // let PRESITEM = from LineDisplayElement in lnDis
        // where LineDisplayElement.IsSelected == 1 && String.Compare(LineDisplayElement.ColCode, "CC_MLDPRESITEM", StringComparison.OrdinalIgnoreCase) == 0
        // select LineDisplayElement;
        let PRESITEM = lnDis.Where(LineDisplayElement =>LineDisplayElement.IsSelected==1&&String.Compare(LineDisplayElement.ColCode,"CC_MLDPRESITEM",StringComparison.OrdinalIgnoreCase)==0).Select(LineDisplayElement => LineDisplayElement);
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
                    for (; iCnt < oDrgHeader.MultiComponentItems.Count; iCnt++) {
                        let paraLineDisplayMCI: iLabel = ObjectHelper.CreateObject(new iLabel(), { TextAlignment: TextAlignment.Left, IsWordwrap: true });
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
                img1.Margin = new Thickness(2, 0, 2, 0);
                img1.Stretch = Stretch.None;
                img1.VerticalAlignment = 'Middle'
                img1.Source = new BitmapImage(new Uri(MedImage.GetPath(MedImages.MultiComponentItemIcon), UriKind.RelativeOrAbsolute));
                ToolTipService.SetToolTip(img1, ObjectHelper.CreateObject(new iLabel(), { Text: String.Join("\n", TmpMultiComponentItems.ToArray()), IsWordwrap: true, MaxWidth: 250 }));
                paraLineDisplay.InLines.Add(ObjectHelper.CreateObject(new iLabelInLineElement(), { InLine: img1 }));
            }
            if (!String.IsNullOrEmpty(sTmpDrugName[0].Trim())) {
                if (oDrgHeader.bIsControlDrug || IsControlDrug || (sTmpDrugName.length >= 2 && !String.IsNullOrEmpty(sTmpDrugName[1].Trim()) && String.Compare(sTmpDrugName[1].Trim(), "CC_CNTRLDDRUG", StringComparison.CurrentCultureIgnoreCase) == 0)) {
                    let img1: Image = new Image();
                    img1.Margin = new Thickness(2, 0, 2, 0);
                    img1.Stretch = Stretch.None;
                    img1.VerticalAlignment = 'Middle'
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
                let sRun: TextBlock = new TextBlock();
                sRun.Style = ObjectHelper.CreateType<Style>(App.Current.Resources["DrugFluidName"], Style);
                sRun.Text = String.Format(Resource.InfusionChart.InFluid_text, oDrgHeader.Fluid);
                InLineRun.InLine = sRun;
                paraLineDisplay.InLines.Add(InLineRun);
            }
            if (oDrgHeader.bIsControlDrugICON == false && oDrgHeader.bIsFluidControlDrug) {
                let img1: Image = new Image();
                img1.Margin = new Thickness(2, 0, 2, 0);
                img1.Stretch = Stretch.None;
                img1.VerticalAlignment = 'Middle'
                img1.Source = new BitmapImage(new Uri(MedImage.GetPath(MedImages.ControlledDrugIcon), UriKind.RelativeOrAbsolute));
                ToolTipService.SetToolTip(img1, ObjectHelper.CreateObject(new iLabel(), { Text: MedsAdminChartToolTip.ControlledDrug, IsWordwrap: true, MaxWidth: 250 }));
                paraLineDisplay.InLines.Add(ObjectHelper.CreateObject(new iLabelInLineElement(), { InLine: img1 }));
            }
            if (bTypeShown) {
                let InLineRun1: iLabelInLineElement = new iLabelInLineElement();
                let sRun1: TextBlock = new TextBlock();
                sRun1.Style = ObjectHelper.CreateType<Style>(App.Current.Resources["DrugInfusionType"], Style);
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
                tbDurationLabel.Margin = new Thickness(2, 0, 3, 0);
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
                    tbDurationLabel.Margin = new Thickness(2, 0, 3, 0);
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
                        let tbDurationLabel: iLabel = new iLabel();
                        tbDurationLabel.Margin = new Thickness(2, 0, 3, 0);
                        let bindtbtbDurationLabel: Binding = new Binding();
                        bindtbtbDurationLabel.Source = dhItem.oDrugHdrAddnlInfo.BegunAtLabel;
                        tbDurationLabel.SetBinding(iLabel.TextProperty, bindtbtbDurationLabel);
                        if (String.IsNullOrEmpty(oMedScanRecVM.oDrugHeader.oDrugHdrBasicInfo.INFTYCODE)) {
                            //tbDurationLabel.Style = ObjectHelper.CreateType<Style>(App.Current.Resources["DrugNonInfValue"], Style);
                        }
                        objWPanel.Children.Add(tbDurationLabel);
                    }
                    if (!String.IsNullOrEmpty(dhItem.oDrugHdrAddnlInfo.RecordedAt)) {
                        let tbDurationLabel: iLabel = new iLabel();
                        tbDurationLabel.Margin = new Thickness(2, 0, 3, 0);
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
                        let tbDurationLabel: iLabel = new iLabel();
                        tbDurationLabel.Margin = new Thickness(2, 0, 3, 0);
                        let bindtbtbDurationLabel: Binding = new Binding();
                        bindtbtbDurationLabel.Source = dhItem.oDrugHdrAddnlInfo.DueAtLabel;
                        tbDurationLabel.SetBinding(iLabel.TextProperty, bindtbtbDurationLabel);
                        if (String.IsNullOrEmpty(oMedScanRecVM.oDrugHeader.oDrugHdrBasicInfo.INFTYCODE)) {
                            //tbDurationLabel.Style = ObjectHelper.CreateType<Style>(App.Current.Resources["DrugNonInfValue"], Style);
                        }
                        objWPanel.Children.Add(tbDurationLabel);
                    }
                    if (!String.IsNullOrEmpty(dhItem.oDrugHdrAddnlInfo.DueAt)) {
                        let tbDurationLabel: iLabel = new iLabel();
                        tbDurationLabel.Margin = new Thickness(2, 0, 3, 0);
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
                        let tbDurationLabel: iLabel = new iLabel();
                        tbDurationLabel.Margin = new Thickness(2, 0, 3, 0);
                        let bindtbtbDurationLabel: Binding = new Binding();
                        bindtbtbDurationLabel.Source = dhItem.oDrugHdrAddnlInfo.ReviewAtLabel;
                        tbDurationLabel.SetBinding(iLabel.TextProperty, bindtbtbDurationLabel);
                        if (String.IsNullOrEmpty(oMedScanRecVM.oDrugHeader.oDrugHdrBasicInfo.INFTYCODE)) {
                            //tbDurationLabel.Style = ObjectHelper.CreateType<Style>(App.Current.Resources["DrugNonInfValue"], Style);
                        }
                        objWPanel.Children.Add(tbDurationLabel);
                    }
                    if (!String.IsNullOrEmpty(dhItem.oDrugHdrAddnlInfo.ReviewAt)) {
                        let tbDurationLabel: iLabel = new iLabel();
                        tbDurationLabel.Margin = new Thickness(2, 0, 3, 0);
                        let bindtbtbDurationLabel: Binding = new Binding();
                        bindtbtbDurationLabel.Source = dhItem.oDrugHdrAddnlInfo.ReviewAt;
                        tbDurationLabel.SetBinding(iLabel.TextProperty, bindtbtbDurationLabel);
                        if (String.IsNullOrEmpty(oMedScanRecVM.oDrugHeader.oDrugHdrBasicInfo.INFTYCODE)) {
                            //tbDurationLabel.Style = ObjectHelper.CreateType<Style>(App.Current.Resources["DrugNonInfValue"], Style);
                        }
                        objWPanel.Children.Add(tbDurationLabel);
                        if (dhItem.oDrugHdrAddnlInfo.ReviewAtVisibility == Visibility.Visible) {
                            let sTip: string = dhItem.oDrugHdrAddnlInfo.ReviewIconTooltip;
                            let img1: Image = new Image();
                            img1.Stretch = Stretch.None;
                            img1.VerticalAlignment = 'Middle'
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
    public GetMedAdminDrugHeaderFirstRow(dhItem: CDrugHeader): WrapPanel {
        let objWPanel: WrapPanel = new WrapPanel();
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
    public GetDoseWrapPanel(dhItem: CDrugHeader): WrapPanel {
        let objWPanel: WrapPanel = new WrapPanel();
        objWPanel.Orientation = Orientation.Horizontal;
        if (dhItem != null && dhItem.oDrugHdrBasicInfo != null) {
            let bInfRecordAdmin: boolean = ((dhItem.oDrugHdrAddnlInfo != null && dhItem.oDrugHdrAddnlInfo.RecordAdminViewed != RecordAdminType.RecordAdmin) || (dhItem.oDrugHdrAddnlInfo == null)) ? true : false;
            if (String.Compare(dhItem.oDrugHdrBasicInfo.ItemSubType, DrugItemSubTypeCode.MEDICAL_GAS, StringComparison.CurrentCultureIgnoreCase) == 0 && bInfRecordAdmin) {
                if (dhItem.oDrugHdrBasicInfo.IsPGD && !String.IsNullOrEmpty(dhItem.oDrugHdrBasicInfo.Dose)) {
                    let tbDoseLbl: TextBlock = new TextBlock();
                    tbDoseLbl.Margin = new Thickness(2, 0, 3, 0);
                    tbDoseLbl.FontWeight = FontWeights.Bold;
                    tbDoseLbl.TextWrapping = TextWrapping.Wrap;
                    tbDoseLbl.Foreground = new SolidColorBrush(CommonBB.ToColor("#006dec"));
                    let bindDoseLbl: Binding = new Binding();
                    if (!String.IsNullOrEmpty(dhItem.oDrugHdrBasicInfo.DoseLabel)) {
                        bindDoseLbl.Source = dhItem.oDrugHdrBasicInfo.DoseLabel;
                    }
                    else bindDoseLbl.Source = String.Empty;
                    tbDoseLbl.SetBinding(TextBlock.TextProperty, bindDoseLbl);
                    objWPanel.Children.Add(tbDoseLbl);
                    let tbDose: TextBlock = new TextBlock();
                    tbDose.Margin = new Thickness(2, 0, 3, 0);
                    tbDose.TextWrapping = TextWrapping.Wrap;
                    let bindDose: Binding = new Binding();
                    bindDose.Source = dhItem.oDrugHdrBasicInfo.Dose;
                    tbDose.SetBinding(TextBlock.TextProperty, bindDose);
                    objWPanel.Children.Add(tbDose);
                }
                if (!String.IsNullOrEmpty(dhItem.oDrugHdrBasicInfo.Rate)) {
                    let tbRateLbl: TextBlock = new TextBlock();
                    tbRateLbl.Margin = new Thickness(2, 0, 3, 0);
                    tbRateLbl.FontWeight = FontWeights.Bold;
                    tbRateLbl.TextWrapping = TextWrapping.Wrap;
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
                    tbRate.Margin = new Thickness(2, 0, 3, 0);
                    tbRate.TextWrapping = TextWrapping.Wrap;
                    let bindRate: Binding = new Binding();
                    bindRate.Source = dhItem.oDrugHdrBasicInfo.Rate;
                    tbRate.SetBinding(TextBlock.TextProperty, bindRate);
                    objWPanel.Children.Add(tbRate);
                }
                if (!String.IsNullOrEmpty(dhItem.oDrugHdrBasicInfo.Duration)) {
                    let tbDurationLbl: TextBlock = new TextBlock();
                    tbDurationLbl.Margin = new Thickness(2, 0, 3, 0);
                    tbDurationLbl.TextWrapping = TextWrapping.Wrap;
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
                    tbDuration.Margin = new Thickness(2, 0, 3, 0);
                    tbDuration.TextWrapping = TextWrapping.Wrap;
                    let bindDuration: Binding = new Binding();
                    bindDuration.Source = dhItem.oDrugHdrBasicInfo.Duration;
                    tbDuration.SetBinding(TextBlock.TextProperty, bindDuration);
                    objWPanel.Children.Add(tbDuration);
                }
                if (!String.IsNullOrEmpty(dhItem.oDrugHdrBasicInfo.Ongoingvalue)) {
                    let tbOngoing: TextBlock = new TextBlock();
                    tbOngoing.Margin = new Thickness(2, 0, 3, 0);
                    tbOngoing.TextWrapping = TextWrapping.Wrap;
                    let bindOngoing: Binding = new Binding();
                    bindOngoing.Source = dhItem.oDrugHdrBasicInfo.Ongoingvalue;
                    tbOngoing.SetBinding(TextBlock.TextProperty, bindOngoing);
                    objWPanel.Children.Add(tbOngoing);
                }
                if (dhItem.oDrugHdrBasicInfo.bShowAsrequired && !String.IsNullOrEmpty(dhItem.oDrugHdrBasicInfo.AsRequiredText)) {
                    let tbAsReq: TextBlock = new TextBlock();
                    tbAsReq.TextWrapping = TextWrapping.Wrap;
                    tbAsReq.Margin = new Thickness(2, 0, 3, 0);
                    let bindAsReq: Binding = new Binding();
                    if (!String.IsNullOrEmpty(dhItem.oDrugHdrBasicInfo.AsRequiredText) && dhItem.oDrugHdrBasicInfo.bShowAsrequired) {
                        bindAsReq.Source = dhItem.oDrugHdrBasicInfo.AsRequiredText;
                    }
                    else {
                        bindAsReq.Source = String.Empty;
                    }
                    tbAsReq.SetBinding(TextBlock.TextProperty, bindAsReq);
                    if (tbAsReq != null) {
                        let objHypAsReq: TextBlock = new TextBlock();
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
            else if (String.Compare(dhItem.oDrugHdrBasicInfo.INFTYCODE, InfusionTypeCode.PCA, StringComparison.CurrentCultureIgnoreCase) == 0 && bInfRecordAdmin) {
                if (!String.IsNullOrEmpty(dhItem.oDrugHdrBasicInfo.BoosterDose)) {
                    let tbBolusLbl: TextBlock = new TextBlock();
                    tbBolusLbl.Margin = new Thickness(2, 0, 3, 0);
                    tbBolusLbl.FontWeight = FontWeights.Bold;
                    tbBolusLbl.TextWrapping = TextWrapping.Wrap;
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
                    tbBoosterDose.Margin = new Thickness(2, 0, 3, 0);
                    tbBoosterDose.TextWrapping = TextWrapping.Wrap;
                    let bindBoosterDose: Binding = new Binding();
                    bindBoosterDose.Source = dhItem.oDrugHdrBasicInfo.BoosterDose;
                    tbBoosterDose.SetBinding(TextBlock.TextProperty, bindBoosterDose);
                    objWPanel.Children.Add(tbBoosterDose);
                }
                if (!String.IsNullOrEmpty(dhItem.oDrugHdrBasicInfo.LockOutPeriod)) {
                    let tbLockOutPeriodLbl: TextBlock = new TextBlock();
                    tbLockOutPeriodLbl.Margin = new Thickness(2, 0, 3, 0);
                    tbLockOutPeriodLbl.FontWeight = FontWeights.Bold;
                    tbLockOutPeriodLbl.TextWrapping = TextWrapping.Wrap;
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
                    tbLockOutPeriod.Margin = new Thickness(2, 0, 3, 0);
                    tbLockOutPeriod.TextWrapping = TextWrapping.Wrap;
                    let bindLockOutPeriod: Binding = new Binding();
                    bindLockOutPeriod.Source = dhItem.oDrugHdrBasicInfo.LockOutPeriod;
                    tbLockOutPeriod.SetBinding(TextBlock.TextProperty, bindLockOutPeriod);
                    objWPanel.Children.Add(tbLockOutPeriod);
                }
                if (!String.IsNullOrEmpty(dhItem.oDrugHdrBasicInfo.MaxDose)) {
                    let tMaxDoseLbl: TextBlock = new TextBlock();
                    tMaxDoseLbl.Margin = new Thickness(2, 0, 3, 0);
                    tMaxDoseLbl.FontWeight = FontWeights.Bold;
                    tMaxDoseLbl.TextWrapping = TextWrapping.Wrap;
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
                    tbMaxDose.Margin = new Thickness(2, 0, 3, 0);
                    tbMaxDose.TextWrapping = TextWrapping.Wrap;
                    let bindMaxDose: Binding = new Binding();
                    bindMaxDose.Source = dhItem.oDrugHdrBasicInfo.MaxDose;
                    tbMaxDose.SetBinding(TextBlock.TextProperty, bindMaxDose);
                    objWPanel.Children.Add(tbMaxDose);
                }
                if (!String.IsNullOrEmpty(dhItem.oDrugHdrBasicInfo.Concentrationvalue)) {
                    let tConcentrationLbl: TextBlock = new TextBlock();
                    tConcentrationLbl.Margin = new Thickness(2, 0, 3, 0);
                    tConcentrationLbl.FontWeight = FontWeights.Bold;
                    tConcentrationLbl.TextWrapping = TextWrapping.Wrap;
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
                    tbConcentration.Margin = new Thickness(2, 0, 3, 0);
                    tbConcentration.TextWrapping = TextWrapping.Wrap;
                    let bindConcentration: Binding = new Binding();
                    bindConcentration.Source = dhItem.oDrugHdrBasicInfo.Concentrationvalue;
                    tbConcentration.SetBinding(TextBlock.TextProperty, bindConcentration);
                    objWPanel.Children.Add(tbConcentration);
                }
                if (!String.IsNullOrEmpty(dhItem.oDrugHdrBasicInfo.Rate)) {
                    let tbRateLbl: TextBlock = new TextBlock();
                    tbRateLbl.Margin = new Thickness(2, 0, 3, 0);
                    tbRateLbl.FontWeight = FontWeights.Bold;
                    tbRateLbl.TextWrapping = TextWrapping.Wrap;
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
                    tbRate.Margin = new Thickness(2, 0, 3, 0);
                    tbRate.TextWrapping = TextWrapping.Wrap;
                    let bindRate: Binding = new Binding();
                    bindRate.Source = dhItem.oDrugHdrBasicInfo.Rate;
                    tbRate.SetBinding(TextBlock.TextProperty, bindRate);
                    objWPanel.Children.Add(tbRate);
                }
                if (!String.IsNullOrEmpty(dhItem.oDrugHdrBasicInfo.Duration)) {
                    let tbDurationLbl: TextBlock = new TextBlock();
                    tbDurationLbl.Margin = new Thickness(2, 0, 3, 0);
                    tbDurationLbl.TextWrapping = TextWrapping.Wrap;
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
                    tbDuration.Margin = new Thickness(2, 0, 3, 0);
                    tbDuration.TextWrapping = TextWrapping.Wrap;
                    let bindDuration: Binding = new Binding();
                    bindDuration.Source = dhItem.oDrugHdrBasicInfo.Duration;
                    tbDuration.SetBinding(TextBlock.TextProperty, bindDuration);
                    objWPanel.Children.Add(tbDuration);
                }
                if (!String.IsNullOrEmpty(dhItem.oDrugHdrBasicInfo.Ongoingvalue)) {
                    let tbOngoing: TextBlock = new TextBlock();
                    tbOngoing.Margin = new Thickness(2, 0, 3, 0);
                    tbOngoing.TextWrapping = TextWrapping.Wrap;
                    let bindOngoing: Binding = new Binding();
                    bindOngoing.Source = dhItem.oDrugHdrBasicInfo.Ongoingvalue;
                    tbOngoing.SetBinding(TextBlock.TextProperty, bindOngoing);
                    objWPanel.Children.Add(tbOngoing);
                }
            }
            else if ((String.Compare(dhItem.oDrugHdrBasicInfo.INFTYCODE, InfusionTypeCode.CONTINUOUS, StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(dhItem.oDrugHdrBasicInfo.INFTYCODE, InfusionTypeCode.SINGLEDOSEVOLUME, StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(dhItem.oDrugHdrBasicInfo.INFTYCODE, InfusionTypeCode.FLUID, StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(dhItem.oDrugHdrBasicInfo.INFTYCODE, InfusionTypeCode.INTERMITTENT, StringComparison.CurrentCultureIgnoreCase) == 0) || dhItem.oDrugHdrBasicInfo.IsPGD) {
                if (!String.IsNullOrEmpty(dhItem.oDrugHdrBasicInfo.Dose)) {
                    let paraLineDisplay: iLabel = ObjectHelper.CreateObject(new iLabel(), { TextAlignment: TextAlignment.Left, IsWordwrap: true });
                    
                    let InLineRun1: iLabelInLineElement = new iLabelInLineElement();
                    let tbDoseLbl: iLabel = new iLabel();
                    //let tbDoseLbl: TextBlock = new TextBlock();
                    tbDoseLbl.Margin = new Thickness(2, 0, 3, 0);
                    tbDoseLbl.FontWeight = FontWeights.Bold;
                    tbDoseLbl.TextWrapping = TextWrapping.Wrap;
                    tbDoseLbl.Foreground = new SolidColorBrush(CommonBB.ToColor("#006dec"));
                    let bindDoseLbl: Binding = new Binding();
                    if (!String.IsNullOrEmpty(dhItem.oDrugHdrBasicInfo.DoseLabel)) {
                        bindDoseLbl.Source = dhItem.oDrugHdrBasicInfo.DoseLabel;
                    }
                    else {
                        bindDoseLbl.Source = String.Empty;
                    }
                    tbDoseLbl.SetBinding(TextBlock.TextProperty, bindDoseLbl);
                    InLineRun1.InLine = tbDoseLbl;
                    paraLineDisplay.InLines.Add(InLineRun1);
                    //objWPanel.Children.Add(tbDoseLbl);

                    let InLineRun2: iLabelInLineElement = new iLabelInLineElement();
                    let tbDose: iLabel = new iLabel();
                    //let tbDose: TextBlock = new TextBlock();
                    tbDose.Margin = new Thickness(2, 0, 3, 0);
                    tbDose.TextWrapping = TextWrapping.Wrap;
                    let bindDose: Binding = new Binding();
                    bindDose.Source = dhItem.oDrugHdrBasicInfo.Dose;
                    tbDose.SetBinding(TextBlock.TextProperty, bindDose);
                    InLineRun2.InLine = tbDose;
                    paraLineDisplay.InLines.Add(InLineRun2);
                    objWPanel.Children.Add(paraLineDisplay);
                }
                if (!String.IsNullOrEmpty(dhItem.oDrugHdrBasicInfo.BoosterDose) && !String.Equals(dhItem.oDrugHdrBasicInfo.INFTYCODE, InfusionTypeCode.INTERMITTENT, StringComparison.CurrentCultureIgnoreCase)) {
                    let tbBoosterDoseLbl: TextBlock = new TextBlock();
                    tbBoosterDoseLbl.Margin = new Thickness(2, 0, 3, 0);
                    tbBoosterDoseLbl.FontWeight = FontWeights.Bold;
                    tbBoosterDoseLbl.TextWrapping = TextWrapping.Wrap;
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
                    tbBoosterDose.Margin = new Thickness(2, 0, 3, 0);
                    tbBoosterDose.TextWrapping = TextWrapping.Wrap;
                    let bindBoosterDose: Binding = new Binding();
                    bindBoosterDose.Source = dhItem.oDrugHdrBasicInfo.BoosterDose;
                    tbBoosterDose.SetBinding(TextBlock.TextProperty, bindBoosterDose);
                    objWPanel.Children.Add(tbBoosterDose);
                }
                if (!String.IsNullOrEmpty(dhItem.oDrugHdrBasicInfo.Volume)) {
                    let paraLineDisplay: iLabel = ObjectHelper.CreateObject(new iLabel(), { TextAlignment: TextAlignment.Left, IsWordwrap: true });
                    
                    let InLineRun1: iLabelInLineElement = new iLabelInLineElement();
                    let tVolumeLbl: iLabel = new iLabel();
                    tVolumeLbl.Margin = new Thickness(2, 0, 3, 0);
                    tVolumeLbl.FontWeight = FontWeights.Bold;
                    tVolumeLbl.TextWrapping = TextWrapping.Wrap;
                    tVolumeLbl.Foreground = new SolidColorBrush(CommonBB.ToColor("#006dec"));
                    let bindVolumeLbl: Binding = new Binding();
                    if (!String.IsNullOrEmpty(dhItem.oDrugHdrBasicInfo.VolumeLabel)) {
                        bindVolumeLbl.Source = dhItem.oDrugHdrBasicInfo.VolumeLabel;
                    }
                    else {
                        bindVolumeLbl.Source = String.Empty;
                    }
                    tVolumeLbl.SetBinding(TextBlock.TextProperty, bindVolumeLbl);
                    InLineRun1.InLine = tVolumeLbl;
                    paraLineDisplay.InLines.Add(InLineRun1);
                   // objWPanel.Children.Add(tVolumeLbl);

                   let InLineRun2: iLabelInLineElement = new iLabelInLineElement();
                    let tbVolume: iLabel = new iLabel();
                    tbVolume.Margin = new Thickness(2, 0, 3, 0);
                    tbVolume.TextWrapping = TextWrapping.Wrap;
                    let bindVolume: Binding = new Binding();
                    bindVolume.Source = dhItem.oDrugHdrBasicInfo.Volume;
                    tbVolume.SetBinding(TextBlock.TextProperty, bindVolume);
                    InLineRun2.InLine = tbVolume;
                    paraLineDisplay.InLines.Add(InLineRun2);
                    objWPanel.Children.Add(paraLineDisplay);
                }
                if (!String.IsNullOrEmpty(dhItem.oDrugHdrBasicInfo.Concentrationvalue)) {
                    let tConcentrationLbl: TextBlock = new TextBlock();
                    tConcentrationLbl.Margin = new Thickness(2, 0, 3, 0);
                    tConcentrationLbl.FontWeight = FontWeights.Bold;
                    tConcentrationLbl.TextWrapping = TextWrapping.Wrap;
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
                    tbConcentration.Margin = new Thickness(2, 0, 3, 0);
                    tbConcentration.TextWrapping = TextWrapping.Wrap;
                    let bindConcentration: Binding = new Binding();
                    bindConcentration.Source = dhItem.oDrugHdrBasicInfo.Concentrationvalue;
                    tbConcentration.SetBinding(TextBlock.TextProperty, bindConcentration);
                    objWPanel.Children.Add(tbConcentration);
                }
                if (!String.IsNullOrEmpty(dhItem.oDrugHdrBasicInfo.InfusionPeriod)) {
                    let paraLineDisplay: iLabel = ObjectHelper.CreateObject(new iLabel(), { TextAlignment: TextAlignment.Left, IsWordwrap: true });
                    
                    let InLineRun1: iLabelInLineElement = new iLabelInLineElement();
                    let tInfusionPeriodLbl: iLabel = new iLabel();
                    tInfusionPeriodLbl.Margin = new Thickness(2, 0, 3, 0);
                    tInfusionPeriodLbl.TextWrapping = TextWrapping.Wrap;
                    let bindInfusionPeriodLbl: Binding = new Binding();
                    if (!String.IsNullOrEmpty(dhItem.oDrugHdrBasicInfo.InfusionPeriodLabel)) {
                        if (objWPanel.Children != null && objWPanel.Children.Count > 0) {
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
                    InLineRun1.InLine = tInfusionPeriodLbl;
                    paraLineDisplay.InLines.Add(InLineRun1);
                    //objWPanel.Children.Add(tInfusionPeriodLbl);
                    
                    let InLineRun2: iLabelInLineElement = new iLabelInLineElement();
                    let tbInfusionPeriod: iLabel = new iLabel();
                    tbInfusionPeriod.Margin = new Thickness(2, 0, 3, 0);
                    tbInfusionPeriod.TextWrapping = TextWrapping.Wrap;
                    let bindInfusionPeriod: Binding = new Binding();
                    bindInfusionPeriod.Source = dhItem.oDrugHdrBasicInfo.InfusionPeriod;
                    tbInfusionPeriod.SetBinding(TextBlock.TextProperty, bindInfusionPeriod);
                    InLineRun2.InLine = tbInfusionPeriod;
                    paraLineDisplay.InLines.Add(InLineRun2);
                    objWPanel.Children.Add(paraLineDisplay);
                }
                if (!String.IsNullOrEmpty(dhItem.oDrugHdrBasicInfo.Rate)) {
                    let paraLineDisplay: iLabel = ObjectHelper.CreateObject(new iLabel(), { TextAlignment: TextAlignment.Left, IsWordwrap: true });
                    
                    let InLineRun1: iLabelInLineElement = new iLabelInLineElement();
                    let tbRateLbl: iLabel = new iLabel();
                    tbRateLbl.Margin = new Thickness(2, 0, 3, 0);
                    tbRateLbl.FontWeight = FontWeights.Bold;
                    tbRateLbl.TextWrapping = TextWrapping.Wrap;
                    tbRateLbl.Foreground = new SolidColorBrush(CommonBB.ToColor("#006dec"));
                    let bindRateLbl: Binding = new Binding();
                    if (!String.IsNullOrEmpty(dhItem.oDrugHdrBasicInfo.RateLabel)) {
                        bindRateLbl.Source = dhItem.oDrugHdrBasicInfo.RateLabel;
                    }
                    else {
                        bindRateLbl.Source = String.Empty;
                    }
                    tbRateLbl.SetBinding(TextBlock.TextProperty, bindRateLbl);
                    InLineRun1.InLine = tbRateLbl;
                    paraLineDisplay.InLines.Add(InLineRun1);
                    //objWPanel.Children.Add(tbRateLbl);
                    let InLineRun2: iLabelInLineElement = new iLabelInLineElement();
                    let tbRate: iLabel = new iLabel();
                    tbRate.Margin = new Thickness(2, 0, 3, 0);
                    tbRate.TextWrapping = TextWrapping.Wrap;
                    let bindRate: Binding = new Binding();
                    bindRate.Source = dhItem.oDrugHdrBasicInfo.Rate;
                    tbRate.SetBinding(TextBlock.TextProperty, bindRate);
                    InLineRun2.InLine = tbRate;
                    paraLineDisplay.InLines.Add(InLineRun2);
                    objWPanel.Children.Add(paraLineDisplay);
                }
                if (!String.IsNullOrEmpty(dhItem.oDrugHdrBasicInfo.Duration) && !String.Equals(dhItem.oDrugHdrBasicInfo.INFTYCODE, InfusionTypeCode.INTERMITTENT, StringComparison.CurrentCultureIgnoreCase)) {
                    let tbDurationLbl: TextBlock = new TextBlock();
                    tbDurationLbl.Margin = new Thickness(2, 0, 3, 0);
                    tbDurationLbl.TextWrapping = TextWrapping.Wrap;
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
                    tbDuration.Margin = new Thickness(2, 0, 3, 0);
                    tbDuration.TextWrapping = TextWrapping.Wrap;
                    let bindDuration: Binding = new Binding();
                    bindDuration.Source = dhItem.oDrugHdrBasicInfo.Duration;
                    tbDuration.SetBinding(TextBlock.TextProperty, bindDuration);
                    objWPanel.Children.Add(tbDuration);
                }
                if (!String.IsNullOrEmpty(dhItem.oDrugHdrBasicInfo.Ongoingvalue) && !String.Equals(dhItem.oDrugHdrBasicInfo.INFTYCODE, InfusionTypeCode.INTERMITTENT, StringComparison.CurrentCultureIgnoreCase)) {
                    let tbOngoing: TextBlock = new TextBlock();
                    tbOngoing.Margin = new Thickness(2, 0, 3, 0);
                    tbOngoing.TextWrapping = TextWrapping.Wrap;
                    let bindOngoing: Binding = new Binding();
                    bindOngoing.Source = dhItem.oDrugHdrBasicInfo.Ongoingvalue;
                    tbOngoing.SetBinding(TextBlock.TextProperty, bindOngoing);
                    objWPanel.Children.Add(tbOngoing);
                }
                if (!String.IsNullOrEmpty(dhItem.oDrugHdrBasicInfo.FrequencyText)) {
                    let tbFreq: TextBlock = new TextBlock();
                    tbFreq.TextWrapping = TextWrapping.Wrap;
                    tbFreq.Margin = new Thickness(2, 0, 3, 0);
                    let bindFreq: Binding = new Binding();
                    if (!String.IsNullOrEmpty(dhItem.oDrugHdrBasicInfo.FrequencyText) && dhItem.oDrugHdrBasicInfo.bShowFrequency) {
                        bindFreq.Source = dhItem.oDrugHdrBasicInfo.FrequencyText;
                    }
                    else {
                        bindFreq.Source = String.Empty;
                    }
                    tbFreq.SetBinding(TextBlock.TextProperty, bindFreq);
                    if (!String.IsNullOrEmpty(dhItem.oDrugHdrBasicInfo.Dose)) {
                        let objHypFreq: TextBlock = ObjectHelper.CreateObject(new TextBlock(), { Text: " - " });
                        let objStackFreq: Grid = new Grid();
                        objStackFreq.HorizontalAlignment = HorizontalAlignment.Left;
                        let col1: ColumnDefinition = new ColumnDefinition();
                        col1.Width = new GridLength(1, GridUnitType.Auto);
                        let col2: ColumnDefinition = new ColumnDefinition();
                        objStackFreq.ColumnDefinitions.Add(col1);
                        objStackFreq.ColumnDefinitions.Add(col2);
                        Grid.SetColumn(objHypFreq, 0);
                        Grid.SetColumn(tbFreq, 1);
                        objStackFreq.Children.Add(objHypFreq);
                        objStackFreq.Children.Add(tbFreq);
                        objWPanel.Children.Add(objStackFreq);
                    }
                    else {
                        objWPanel.Children.Add(tbFreq);
                    }
                }
                if (!String.IsNullOrEmpty(dhItem.oDrugHdrBasicInfo.AsRequiredText)) {
                    let tbAsReq: TextBlock = new TextBlock();
                    tbAsReq.TextWrapping = TextWrapping.Wrap;
                    tbAsReq.Margin = new Thickness(2, 0, 3, 0);
                    let bindAsReq: Binding = new Binding();
                    if (!String.IsNullOrEmpty(dhItem.oDrugHdrBasicInfo.AsRequiredText) && dhItem.oDrugHdrBasicInfo.bShowAsrequired) {
                        bindAsReq.Source = dhItem.oDrugHdrBasicInfo.AsRequiredText;
                    }
                    else {
                        bindAsReq.Source = String.Empty;
                    }
                    tbAsReq.SetBinding(TextBlock.TextProperty, bindAsReq);
                    if (!String.IsNullOrEmpty(dhItem.oDrugHdrBasicInfo.FrequencyText) || !String.IsNullOrEmpty(dhItem.oDrugHdrBasicInfo.Dose)) {
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
            else {
                if (!String.IsNullOrEmpty(dhItem.oDrugHdrBasicInfo.DoseLabel)) {
                    let paraLineDisplay: iLabel = ObjectHelper.CreateObject(new iLabel(), { TextAlignment: TextAlignment.Left, IsWordwrap: true });
                    
                    let InLineRun1: iLabelInLineElement = new iLabelInLineElement();
                    let tbDoseLbl: iLabel = new iLabel();
                    tbDoseLbl.Margin = new Thickness(0, 0, 3, 0);
                    tbDoseLbl.TextWrapping = TextWrapping.Wrap;
                    tbDoseLbl.FontWeight = FontWeights.Bold;
                    tbDoseLbl.Foreground = new SolidColorBrush(Colors.Blue);
                    //tbDoseLbl.Style = ObjectHelper.CreateType<Style>(App.Current.Resources["DrugNonInflbl"], Style);
                    let bindDoseLbl: Binding = new Binding();
                    if (!String.IsNullOrEmpty(dhItem.oDrugHdrBasicInfo.DoseLabel)) {
                        bindDoseLbl.Source = dhItem.oDrugHdrBasicInfo.DoseLabel;
                    }
                    else {
                        bindDoseLbl.Source = String.Empty;
                    }
                    tbDoseLbl.SetBinding(TextBlock.TextProperty, bindDoseLbl);
                    InLineRun1.InLine = tbDoseLbl;
                    paraLineDisplay.InLines.Add(InLineRun1);

                    let InLineRun2: iLabelInLineElement = new iLabelInLineElement();
                    let tbDose: iLabel = new iLabel();
                    tbDose.Margin = new Thickness(2, 0, 3, 0);
                    tbDose.TextWrapping = TextWrapping.Wrap;
                    //tbDose.Style = ObjectHelper.CreateType<Style>(App.Current.Resources["DrugNonInfValue"], Style);
                    let bindDose: Binding = new Binding();
                    if (!String.IsNullOrEmpty(dhItem.oDrugHdrBasicInfo.Dose)) {
                        bindDose.Source = dhItem.oDrugHdrBasicInfo.Dose;
                    }
                    else {
                        bindDose.Source = String.Empty;
                    }
                    tbDose.SetBinding(TextBlock.TextProperty, bindDose);
                    InLineRun2.InLine = tbDose;
                    paraLineDisplay.InLines.Add(InLineRun2);

                    objWPanel.Children.Add(paraLineDisplay);
                }
                if (!String.IsNullOrEmpty(dhItem.oDrugHdrBasicInfo.Strength)) {
                    let paraLineDisplay: iLabel = ObjectHelper.CreateObject(new iLabel(), { TextAlignment: TextAlignment.Left, IsWordwrap: true });
                    
                    let InLineRun1: iLabelInLineElement = new iLabelInLineElement();
                    let tbStrengthLbl: iLabel = new iLabel();
                    tbStrengthLbl.Margin = new Thickness(2, 0, 3, 0);
                    tbStrengthLbl.FontWeight = FontWeights.Bold;
                    tbStrengthLbl.Foreground = new SolidColorBrush(Colors.Blue);
                    //tbStrengthLbl.Style = ObjectHelper.CreateType<Style>(App.Current.Resources["DrugNonInflbl"], Style);
                    let bindStrengthLbl: Binding = new Binding();
                    if (!String.IsNullOrEmpty(dhItem.oDrugHdrBasicInfo.StrengthLabel)) {
                        bindStrengthLbl.Source = dhItem.oDrugHdrBasicInfo.StrengthLabel;
                    }
                    else {
                        bindStrengthLbl.Source = String.Empty;
                    }
                    tbStrengthLbl.SetBinding(TextBlock.TextProperty, bindStrengthLbl);
                    InLineRun1.InLine = tbStrengthLbl;
                    paraLineDisplay.InLines.Add(InLineRun1);

                    let InLineRun2: iLabelInLineElement = new iLabelInLineElement();
                    //objWPanel.Children.Add(tbStrengthLbl);
                    let tbStrength: iLabel = new iLabel();
                    tbStrength.Margin = new Thickness(2, 0, 3, 0);
                    tbStrength.TextWrapping = TextWrapping.Wrap;
                   // tbStrength.Style = ObjectHelper.CreateType<Style>(App.Current.Resources["DrugNonInfValue"], Style);
                    let bindStrength: Binding = new Binding();
                    if (!String.IsNullOrEmpty(dhItem.oDrugHdrBasicInfo.Strength)) {
                        bindStrength.Source = dhItem.oDrugHdrBasicInfo.Strength;
                    }
                    else {
                        bindStrength.Source = String.Empty;
                    }
                    tbStrength.SetBinding(TextBlock.TextProperty, bindStrength);
                    InLineRun2.InLine = tbStrength;
                    paraLineDisplay.InLines.Add(InLineRun2);
                    objWPanel.Children.Add(paraLineDisplay);
                }
                let tbFreq: TextBlock = new TextBlock();
                tbFreq.TextWrapping = TextWrapping.Wrap;
                tbFreq.Margin = new Thickness(2, 0, 3, 0);
                let bindFreq: Binding = new Binding();
                if (!String.IsNullOrEmpty(dhItem.oDrugHdrBasicInfo.FrequencyText) && dhItem.oDrugHdrBasicInfo.bShowFrequency) {
                    bindFreq.Source = dhItem.oDrugHdrBasicInfo.FrequencyText;
                }
                else {
                    bindFreq.Source = String.Empty;
                }
                tbFreq.SetBinding(TextBlock.TextProperty, bindFreq);
                let tbAsReq: TextBlock = new TextBlock();
                tbAsReq.TextWrapping = TextWrapping.Wrap;
                tbAsReq.Margin = new Thickness(2, 0, 3, 0);
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
                        let objHypFreq: TextBlock = ObjectHelper.CreateObject(new TextBlock(), { Text: " - " });
                        let objStackFreq: Grid = new Grid();
                        objStackFreq.HorizontalAlignment = HorizontalAlignment.Left;
                        let col1: ColumnDefinition = new ColumnDefinition();
                        col1.Width = new GridLength(1, GridUnitType.Auto);
                        let col2: ColumnDefinition = new ColumnDefinition();
                        objStackFreq.ColumnDefinitions.Add(col1);
                        objStackFreq.ColumnDefinitions.Add(col2);
                        Grid.SetColumn(objHypFreq, 0);
                        Grid.SetColumn(tbFreq, 1);
                        objStackFreq.Children.Add(objHypFreq);
                        objStackFreq.Children.Add(tbFreq);
                        objWPanel.Children.Add(objStackFreq);
                    }
                    else {
                        objWPanel.Children.Add(tbFreq);
                    }
                }
                if (!String.IsNullOrEmpty(dhItem.oDrugHdrBasicInfo.AsRequiredText)) {
                    if (!String.IsNullOrEmpty(dhItem.oDrugHdrBasicInfo.FrequencyText) || !String.IsNullOrEmpty(dhItem.oDrugHdrBasicInfo.Dose)) {
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
    public ScanRecRouteWrapPanel(objDrugItem: CDrugHeader, objParentPanel: StackPanel): void {
        objParentPanel.Orientation = Orientation.Horizontal;
        if (objDrugItem != null && objDrugItem.oDrugHdrBasicInfo != null) {
            let bInfRecordAdmin: boolean = ((objDrugItem.oDrugHdrAddnlInfo != null && objDrugItem.oDrugHdrAddnlInfo.RecordAdminViewed != RecordAdminType.RecordAdmin) || (objDrugItem.oDrugHdrAddnlInfo == null)) ? true : false;
            if (String.Compare(objDrugItem.oDrugHdrBasicInfo.ItemSubType, DrugItemSubTypeCode.MEDICAL_GAS, StringComparison.CurrentCultureIgnoreCase) == 0 && bInfRecordAdmin) {
                if (!String.IsNullOrEmpty(objDrugItem.oDrugHdrBasicInfo.RouteLabel)) {
                    let tbRouteLbl: TextBlock = new TextBlock();
                    tbRouteLbl.Margin = new Thickness(2, 0, 3, 0);
                    tbRouteLbl.FontWeight = FontWeights.Bold;
                    let bindtbRoutelblForeGrnd: Binding = new Binding();
                    bindtbRoutelblForeGrnd.Source = new SolidColorBrush(Colors.Blue);
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
                        tbRoute.Margin = new Thickness(2, 0, 3, 0);
                        tbRoute.TextWrapping = TextWrapping.Wrap;
                        let bindRoute: Binding = new Binding();
                        bindRoute.Source = routeArray[indx];
                        tbRoute.SetBinding(TextBlock.TextProperty, bindRoute);
                        objParentPanel.Children.Add(tbRoute);
                    }
                }
                if (!String.IsNullOrEmpty(objDrugItem.oDrugHdrBasicInfo.DeliveryDevice)) {
                    let tbDeliveryDevice: TextBlock = new TextBlock();
                    tbDeliveryDevice.Margin = new Thickness(2, 0, 3, 0);
                    tbDeliveryDevice.TextWrapping = TextWrapping.Wrap;
                    let bindDeliveryDevice: Binding = new Binding();
                    bindDeliveryDevice.Source = objDrugItem.oDrugHdrBasicInfo.DeliveryDevice;
                    tbDeliveryDevice.SetBinding(TextBlock.TextProperty, bindDeliveryDevice);
                    objParentPanel.Children.Add(tbDeliveryDevice);
                }
            }
            else if ((String.Compare(objDrugItem.oDrugHdrBasicInfo.INFTYCODE, InfusionTypeCode.PCA, StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(objDrugItem.oDrugHdrBasicInfo.INFTYCODE, InfusionTypeCode.CONTINUOUS, StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(objDrugItem.oDrugHdrBasicInfo.INFTYCODE, InfusionTypeCode.INTERMITTENT, StringComparison.CurrentCultureIgnoreCase) == 0 || String.Equals(objDrugItem.oDrugHdrBasicInfo.INFTYCODE, InfusionTypeCode.SINGLEDOSEVOLUME, StringComparison.CurrentCultureIgnoreCase) || String.Equals(objDrugItem.oDrugHdrBasicInfo.INFTYCODE, InfusionTypeCode.FLUID, StringComparison.CurrentCultureIgnoreCase)) && bInfRecordAdmin) {
                if (!String.IsNullOrEmpty(objDrugItem.oDrugHdrBasicInfo.RouteLabel)) {
                    let tbRouteLbl: iLabel = new iLabel();
                    tbRouteLbl.Margin = new Thickness(2, 0, 3, 0);
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
                        let tbRoute: iLabel = new iLabel();
                        tbRoute.Margin = new Thickness(2, 0, 3, 0);
                        tbRoute.TextWrapping = TextWrapping.Wrap;
                        let bindRoute: Binding = new Binding();
                        bindRoute.Source = routeArray[indx];
                        tbRoute.SetBinding(TextBlock.TextProperty, bindRoute);
                        objParentPanel.Children.Add(tbRoute);
                    }
                }
                if (!String.IsNullOrEmpty(objDrugItem.oDrugHdrBasicInfo.SiteLabel)) {
                    let tbSiteLbl: TextBlock = new TextBlock();
                    tbSiteLbl.Margin = new Thickness(2, 0, 3, 0);
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
                        tbSite.Margin = new Thickness(2, 0, 3, 0);
                        tbSite.TextWrapping = TextWrapping.Wrap;
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
                    tbLumen.Margin = new Thickness(2, 0, 3, 0);
                    tbLumen.TextWrapping = TextWrapping.Wrap;
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
                    tbDeliveryDevice.Margin = new Thickness(2, 0, 3, 0);
                    tbDeliveryDevice.TextWrapping = TextWrapping.Wrap;
                    let bindDeliveryDevice: Binding = new Binding();
                    bindDeliveryDevice.Source = objDrugItem.oDrugHdrBasicInfo.DeliveryDevice;
                    tbDeliveryDevice.SetBinding(TextBlock.TextProperty, bindDeliveryDevice);
                    objParentPanel.Children.Add(tbDeliveryDevice);
                }
            }
            else {
                if (!String.IsNullOrEmpty(objDrugItem.oDrugHdrBasicInfo.RouteLabel)) {
                    let tbRouteLbl: iLabel = new iLabel();
                    tbRouteLbl.Margin = new Thickness(2, 0, 3, 0);
                    tbRouteLbl.Foreground = new SolidColorBrush(Colors.Blue);
                    tbRouteLbl.FontWeight = FontWeights.Bold;
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
                        tbRoute.Margin = new Thickness(2, 0, 3, 0);
                        tbRoute.TextWrapping = TextWrapping.Wrap;
                        //tbRoute.Style = ObjectHelper.CreateType<Style>(App.Current.Resources["DrugNonInfValue"], Style);
                        let bindRoute: Binding = new Binding();
                        bindRoute.Source = routeArray[indx];
                        tbRoute.SetBinding(TextBlock.TextProperty, bindRoute);
                        objParentPanel.Children.Add(tbRoute);
                    }
                }
                if (!String.IsNullOrEmpty(objDrugItem.oDrugHdrBasicInfo.SiteLabel)) {
                    let tbSiteLbl: TextBlock = new TextBlock();
                    tbSiteLbl.Margin = new Thickness(2, 0, 3, 0);
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
                        tbSite.Margin = new Thickness(2, 0, 3, 0);
                        tbSite.TextWrapping = TextWrapping.Wrap;
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
                    tbTargetSatLbl.Margin = new Thickness(2, 0, 3, 0);
                    tbTargetSatLbl.FontWeight = FontWeights.Bold;
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
                        tbTargetSat.Margin = new Thickness(2, 0, 3, 0);
                        tbTargetSat.TextWrapping = TextWrapping.Wrap;
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
                    tbHumidificationLbl.Margin = new Thickness(2, 0, 3, 0);
                    tbHumidificationLbl.FontWeight = FontWeights.Bold;
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
                    tbHumidification.Margin = new Thickness(2, 0, 3, 0);
                    tbHumidification.TextWrapping = TextWrapping.Wrap;
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
