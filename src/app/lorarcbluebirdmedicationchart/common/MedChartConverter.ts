import { Component, OnInit } from '@angular/core';
import { StringBuilder, ProfileFactoryType, ContextManager, Convert, AppActivity } from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp, Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison, AppDialogEventargs, AppDialogResult, DelegateArgs, DialogComponentArgs, WindowButtonType, CultureInfo, ObservableCollection, Visibility } from 'epma-platform/models';
import { AppDialog,  BitmapImage, Border, Color, Colors, Cursors, FontWeights, Grid, GridLength, HorizontalAlignment, Image, MouseButtonEventArgs, Run, SolidColorBrush, StackPanel, TextBlock, TextWrapping, Thickness, ToolTipService, Uri, UriKind, VerticalAlignment, WrapPanel } from 'epma-platform/controls';
import { HelperService } from 'epma-platform/soapclient';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
import { ChartIcon } from './ChartIcon';
import { NotImplementedException, Type } from 'src/app/product/shared/models/Common';
import { ChartStringIcon } from './ChartStringIcon';
import { Orientation } from 'src/app/shared/epma-platform/controls-model/Orientation';
import { DrugItem } from './DrugItem';
import { AdministratedSlot } from './AdministratedSlot';
import { ColumnDefinition, RowDefinition } from 'src/app/shared/epma-platform/controls/epma-grid/epma-grid.component';
import { AsRequiredSlot } from './AsRequiredSlot';
import { TodayMultiSlot } from './TodayMultiSlot';
import { SLDateUtility } from 'src/app/shared/epma-platform/services/sLDateUtility.service';
import { GridUnitType } from 'src/app/shared/epma-platform/controls/GridExt';
import { iMedicationChart } from '../iMedicationChart/iMedicationChart.component';
import { ImageURIBitMapPipe } from 'src/app/lorarcbluebirdmedicationchart/converter/MedChartConverter.pipe';
import { Binding } from 'src/app/shared/epma-platform/controls/FrameworkElement';
import { FontWeight } from 'src/app/shared/epma-platform/controls/Control';

export class ImageConverter {
    public Convert(value: Object, targetType: Type, parameter: Object, culture: CultureInfo): Object {
        if (value == null)
            return null;
        let oChartIcon: ChartIcon = <ChartIcon>value;
        if (!String.IsNullOrEmpty(oChartIcon.UriString)) {
            let oImage: Image = new Image();
            oImage.Cursor = Cursors.Hand;
            oImage.Width = Double.NaN; //number.NaN; To be revisited if any futher problem
            oImage.Height = Double.NaN; //number.NaN; To be revisited if any futher problem

            oImage.Margin = new Thickness(2, 0, 0, 0);
            oImage.HorizontalAlignment = HorizontalAlignment.Center;
            oImage.VerticalAlignment = VerticalAlignment.Bottom;
            oImage.IsHitTestVisible = oChartIcon.EnableOnHotSpotClick; /**TEMPORARY FIX - NEED TO DEVELOP/IMPLEMENT BY PLATFORM TEAM (IsHitTestVisible variable) */
            oImage.Tag = oChartIcon;
            ToolTipService.SetToolTip(oImage, oChartIcon.Tooltip);/**TEMPORARY FIX - NEED TO DEVELOP/IMPLEMENT BY PLATFORM TEAM (added object has as type) */
            let objBitMap: BitmapImage = new BitmapImage(new Uri(oChartIcon.UriString, UriKind.RelativeOrAbsolute));
            oImage.Source = objBitMap;
            return oImage;
        }
        else return null;
    }
    public ConvertBack(value: Object, targetType: Type, parameter: Object, culture: CultureInfo): Object {
        throw new NotImplementedException();
    }
}
export class StringTextConverter {
    public Convert(value: Object, targetType: Type, parameter: Object, culture: CultureInfo): Object {
        if (value == null)
            return String.Empty;
        let oChartIcon: ChartStringIcon = <ChartStringIcon>value;
        if (!String.IsNullOrEmpty(oChartIcon.StringData))
            return oChartIcon.StringData;
        else return String.Empty;
    }
    public ConvertBack(value: Object, targetType: Type, parameter: Object, culture: CultureInfo): Object {
        throw new NotImplementedException();
    }
}
export class StringImageConverter {
    public Convert(value: Object, targetType: Type, parameter: Object, culture: CultureInfo): Object {
        if (value == null)
            return String.Empty;
        let oChartIcon: ChartStringIcon = <ChartStringIcon>value;
        if (!String.IsNullOrEmpty(oChartIcon.UriString))
            return oChartIcon.UriString;
        else return String.Empty;
    }
    public ConvertBack(value: Object, targetType: Type, parameter: Object, culture: CultureInfo): Object {
        throw new NotImplementedException();
    }
}
export class ImageURIBitMapConverter {
    public Convert(value: Object, targetType: Type, culture: CultureInfo): BitmapImage | string {
        if (value == null)
            return String.Empty;
        let strURI: string = <string>value;
        if (!String.IsNullOrEmpty(strURI)) {
            let objBitMap: BitmapImage = new BitmapImage(new Uri(strURI, UriKind.RelativeOrAbsolute));
            return objBitMap;
        }
        else return String.Empty;
    }
    public ConvertBack(value: Object, targetType: Type, parameter: Object, culture: CultureInfo): Object {
        throw new NotImplementedException();
    }
    public transform(value: Object, targetType?: Type, parameter?: Object, culture?: CultureInfo): Object {
        return value
    }
}
export class AdminSummaryConverter {
    public Convert(value: Object, targetType: Type, parameter: Object, culture: CultureInfo): Object {
        let oAdminSummaryGrid: Grid = new Grid();
        try {
            if (value == null)
                return oAdminSummaryGrid;
            let ColumnCount: number = 0;
            let objAsRequired: AsRequiredSlot = <AsRequiredSlot>value;
            let oChartIcon: ObservableCollection<ChartStringIcon> = objAsRequired.AdminSummary;
            if (oChartIcon == null)
                return oAdminSummaryGrid;
            oAdminSummaryGrid.RowDefinitions.Add(new RowDefinition());
            for (let i: number = oChartIcon.Count - 1; i >= 0; i--) {
                oAdminSummaryGrid.ColumnDefinitions.Add(new ColumnDefinition());
            }
            for (let j: number = oChartIcon.Count - 1; j >= 0; j--) {
                let oStack: StackPanel = new StackPanel();
                oStack.DataContext = oChartIcon[j];
                oStack.Orientation = Orientation.Horizontal;
                let oBlock: TextBlock = new TextBlock();
                oBlock.TextWrapping = TextWrapping.Wrap;
                oBlock.SetBinding(TextBlock.TextProperty, new Binding("StringData"));
                let oImage: Image = new Image();
                oImage.Cursor = Cursors.Hand;
                oImage.Height = 16;
                oImage.Width = 16;
                let bind: Binding = new Binding("UriString");
                let imgConvertpipe: ImageURIBitMapPipe = new ImageURIBitMapPipe();
                bind.Converter = imgConvertpipe;
                oImage.SetBinding(Image.SourceProperty, bind);/**TEMPORARY FIX - NEED TO DEVELOP/IMPLEMENT BY PLATFORM TEAM (for image,sourceproperty added) */
                let tagBind: Binding = new Binding();
                tagBind.Source = oChartIcon[j];
                oImage.SetBinding(Image.TagProperty, tagBind);/**TEMPORARY FIX - NEED TO DEVELOP/IMPLEMENT BY PLATFORM TEAM (for image,TagProperty added) */
                let bindIsHitVis: Binding = new Binding();
                bindIsHitVis.Source = oChartIcon[j].EnableOnHotSpotClick;
                oImage.SetBinding(Image.IsHitTestVisibleProperty, bindIsHitVis);
                oImage.MouseLeftButtonUp = (s, e) => { this.oImage_MouseLeftButtonUp(s, e); };
                let bindToolTip: Binding = new Binding();
                bindToolTip.Source = oChartIcon[j].Tooltip;
                oImage.SetBinding(ToolTipService.ToolTipProperty, bindToolTip);
                let renderer, element;   /**TEMPORARY FIX - NEED TO DEVELOP/IMPLEMENT BY PLATFORM TEAM (params added) */
                let oBrder: Border = new Border();   /**TEMPORARY FIX - NEED TO DEVELOP/IMPLEMENT BY PLATFORM TEAM (params added) */
                oBrder.Width = 16;  /**TEMPORARY FIX - NEED TO DEVELOP/IMPLEMENT BY PLATFORM TEAM (number type included) */
                oBrder.Height = 16;  /**TEMPORARY FIX - NEED TO DEVELOP/IMPLEMENT BY PLATFORM TEAM (number type included) */
                oBrder.Background = new SolidColorBrush(Colors.Transparent);
                oBrder.SetBinding(ToolTipService.ToolTipProperty, bindToolTip);/**TEMPORARY FIX - NEED TO DEVELOP/IMPLEMENT BY PLATFORM TEAM (dummy definition provided for method SetBinding()) */
                oBrder.Child = oImage;  /**TEMPORARY FIX - NEED TO DEVELOP/IMPLEMENT BY PLATFORM TEAM (Child property included) */
                oStack.Children.Add(oBlock);
                oStack.Children.Add(oBrder);
                oStack.SetValue(Grid.ColumnProperty, ColumnCount); /**TEMPORARY FIX - NEED TO DEVELOP/IMPLEMENT BY PLATFORM TEAM (Grid.ColumnProperty Added / Stack.SetValue method declared) */
                oStack.SetValue(Grid.RowProperty, 0);/**TEMPORARY FIX - NEED TO DEVELOP/IMPLEMENT BY PLATFORM TEAM (Grid.RowProperty Added / Stack.SetValue method declared) */
                oAdminSummaryGrid.Children.Add(oStack);
                ColumnCount += 1;
            }
        }
        catch (err) {
            let sdf: string;
        }

        return oAdminSummaryGrid;
    }
    oImage_MouseLeftButtonUp(sender: Object, e: MouseButtonEventArgs): void {
        iMedicationChart.oMedicationChart.FireImageClick(sender, e);
    }
    public ConvertBack(value: Object, targetType: Type, parameter: Object, culture: CultureInfo): Object {
        throw new NotImplementedException();
    }
}
export class MultiIconConverter {
    public Convert(value: Object, targetType: Type, parameter: Object, culture: CultureInfo): Object {
        let oAdminSummaryGrid: Grid = new Grid();
        try {
            if (value == null)
                return oAdminSummaryGrid;
            let Column: number = 1;
            let Row: number = 1;
            let Count: number = 0;
            let objTodayMulti: TodayMultiSlot = <TodayMultiSlot>value;
            let oChartIcon: ObservableCollection<ChartStringIcon> = objTodayMulti.AdminSummary;
            if (oChartIcon == null)
                return oAdminSummaryGrid;
            oAdminSummaryGrid.RowDefinitions.Add(new RowDefinition());
            oAdminSummaryGrid.ColumnDefinitions.Add(new ColumnDefinition());
            oAdminSummaryGrid.ColumnDefinitions.Add(new ColumnDefinition());
            if (oChartIcon.Count > 2)
                oAdminSummaryGrid.RowDefinitions.Add(new RowDefinition());
            for (let j: number = 0; j < oChartIcon.Count; j++) {
                let oStack: StackPanel = new StackPanel();
                oStack.DataContext = oChartIcon[j];
                oStack.Orientation = Orientation.Horizontal;
                let oBlock: TextBlock = new TextBlock();
                oBlock.TextWrapping = TextWrapping.Wrap;
                oBlock.SetBinding(TextBlock.TextProperty, new Binding("StringData"));
                let oImage: Image = new Image();
                oImage.Cursor = Cursors.Hand;
                oImage.Height = 16;
                oImage.Width = 16;
                let bind: Binding = new Binding("UriString");
                let imgConvertpipe: ImageURIBitMapPipe = new ImageURIBitMapPipe();
                bind.Converter = imgConvertpipe;
                oImage.SetBinding(Image.SourceProperty, bind);
                let tagBind: Binding = new Binding();
                tagBind.Source = oChartIcon[j];
                oImage.SetBinding(Image.TagProperty, tagBind);/**TEMPORARY FIX - NEED TO DEVELOP/IMPLEMENT BY PLATFORM TEAM (for image,TagProperty added) */
                let bindIsHitVis: Binding = new Binding();
                bindIsHitVis.Source = oChartIcon[j].EnableOnHotSpotClick;
                oImage.SetBinding(Image.IsHitTestVisibleProperty, bindIsHitVis);/**TEMPORARY FIX - NEED TO DEVELOP/IMPLEMENT BY PLATFORM TEAM (IsHitTestVisibleProperty method declared) */
                //oImage.MouseLeftButtonUp += oImage_MouseLeftButtonUp; /**TEMPORARY FIX - Need to confirm */
                oImage.MouseLeftButtonUp = (s, e) => { this.oImage_MouseLeftButtonUp(s, e); }; // FIX NEEDS TO BE CONFIRMED
                let bindToolTip: Binding = new Binding();
                bindToolTip.Source = oChartIcon[j].Tooltip;
                oImage.SetBinding(ToolTipService.ToolTipProperty, bindToolTip);
                let renderer, element;   /**TEMPORARY FIX - NEED TO DEVELOP/IMPLEMENT BY PLATFORM TEAM (params added) */
                let oBrder: Border = new Border();   /**TEMPORARY FIX - NEED TO DEVELOP/IMPLEMENT BY PLATFORM TEAM (params added) */
                oBrder.Width = 16;
                oBrder.Height = 16;
                oBrder.Background = new SolidColorBrush(Colors.Transparent);

                oBrder.SetBinding(ToolTipService.ToolTipProperty, bindToolTip);
                oBrder.Child = oImage;
                oStack.Children.Add(oBlock);
                oStack.Children.Add(oBrder);
                oStack.SetValue(Grid.ColumnProperty, Column);/**TEMPORARY FIX - NEED TO DEVELOP/IMPLEMENT BY PLATFORM TEAM (Grid.ColumnProperty Added / Stack.SetValue method declared) */
                oStack.SetValue(Grid.RowProperty, Row);/**TEMPORARY FIX - NEED TO DEVELOP/IMPLEMENT BY PLATFORM TEAM (Grid.RowProperty Added / Stack.SetValue method declared) */
                oAdminSummaryGrid.Children.Add(oStack);
                switch (Count) {
                    case 0:
                        {
                            Column = 0;
                            Count = 1;
                            break;
                        }
                    case 1:
                        {
                            Column = 1;
                            Row = 0;
                            Count = 2;
                            break;
                        }
                    case 2:
                        {
                            Column = 0;
                            Count = 3;
                            break;
                        }
                    default:
                        break;
                }
            }
        }
        catch (err) {

        }

        return oAdminSummaryGrid;
    }
    public oImage_MouseLeftButtonUp(sender: Object, e: MouseButtonEventArgs): void {
        iMedicationChart.oMedicationChart.FireImageClick(sender, e);
    }
    public ConvertBack(value: Object, targetType: Type, parameter: Object, culture: CultureInfo): Object {
        throw new NotImplementedException();
    }
}
export class ImageKeyConverter {
    public Convert(value: Object, targetType: Type, parameter: Object, culture: CultureInfo): Object {
        if (value == null)
            return String.Empty;
        let oChartIcon: ChartIcon = <ChartIcon>value;
        if (!String.IsNullOrEmpty(oChartIcon.Key))
            return oChartIcon.Key;
        else return String.Empty;
    }
    public ConvertBack(value: Object, targetType: Type, parameter: Object, culture: CultureInfo): Object {
        throw new NotImplementedException();
    }
}
export class StringImageKeyConverter {
    public Convert(value: Object, targetType: Type, parameter: Object, culture: CultureInfo): Object {
        if (value == null)
            return String.Empty;
        let oChartIcon: ChartStringIcon = <ChartStringIcon>value;
        if (!String.IsNullOrEmpty(oChartIcon.Key))
            return oChartIcon.Key;
        else return String.Empty;
    }
    public ConvertBack(value: Object, targetType: Type, parameter: Object, culture: CultureInfo): Object {
        throw new NotImplementedException();
    }
}
export class TooltipImageConverter {
    public Convert(value: Object, targetType: Type, parameter: Object, culture: CultureInfo): Object {
        if (<ChartIcon>value != null) {
            let oChartIcon: ChartIcon = <ChartIcon>value;
            return oChartIcon.Tooltip;
        }
        else return null;
    }
    public ConvertBack(value: Object, targetType: Type, parameter: Object, culture: CultureInfo): Object {
        throw new NotImplementedException();
    }
}
export class EnableHotSpotImageConverter {
    public Convert(value: Object, targetType: Type, parameter: Object, culture: CultureInfo): Object {
        if (<ChartIcon>value != null) {
            let oChartIcon: ChartIcon = <ChartIcon>value;
            return oChartIcon.EnableOnHotSpotClick;
        }
        else return true;
    }
    public ConvertBack(value: Object, targetType: Type, parameter: Object, culture: CultureInfo): Object {
        throw new NotImplementedException();
    }
}
export class DoseWrapConverter {
    public Convert(value: Object, targetType: Type, parameter: Object, culture: CultureInfo): Object {
        let objWPanel: WrapPanel = new WrapPanel();
        objWPanel.Orientation = Orientation.Horizontal;
        if (value != null) {
            let objDrugItem: DrugItem = <DrugItem>value;
            let tbDoseWrapLbl: TextBlock = new TextBlock();
        //    tbDoseWrapLbl.Margin = new Thickness(0, 0, 5, 0);
            tbDoseWrapLbl.FontSize = 10;
            tbDoseWrapLbl.HorizontalAlignment = HorizontalAlignment.Center;
            tbDoseWrapLbl.VerticalAlignment = VerticalAlignment.Center;
            tbDoseWrapLbl.TextWrapping = TextWrapping.Wrap;
            if (!String.IsNullOrEmpty(objDrugItem.DoseLabel)) {
                let rnDoseLbl: Run = new Run();
                let bindDoseForeGrnd: Binding = new Binding();
                if (objDrugItem.DRSForecolor != null)
                    rnDoseLbl.Foreground = objDrugItem.DRSForecolor;
                rnDoseLbl.FontWeight = FontWeights.Bold;
                rnDoseLbl.FontSize = 11;
                rnDoseLbl.Text = objDrugItem.DoseLabel + " ";
                tbDoseWrapLbl.Inlines.Add(rnDoseLbl);
                let rnDoseVal: Run = new Run();
                rnDoseVal.Foreground = new SolidColorBrush(Color.FromArgb(255, 0, 0, 0));
                rnDoseVal.FontWeight = FontWeights.Medium;
                rnDoseVal.FontSize = 11;
                if (!String.IsNullOrEmpty(objDrugItem.Dose))
                    rnDoseVal.Text = objDrugItem.Dose + " ";
                tbDoseWrapLbl.Inlines.Add(rnDoseVal);
            }
            if (!String.IsNullOrEmpty(objDrugItem.StrengthLabel)) {
                let rnStrengthLbl: Run = new Run();
                let bindDoseForeGrnd: Binding = new Binding();
                if (objDrugItem.DRSForecolor != null)
                    rnStrengthLbl.Foreground = objDrugItem.DRSForecolor;
                rnStrengthLbl.FontWeight = FontWeights.Bold;
                rnStrengthLbl.FontSize = 10;
                rnStrengthLbl.Text = objDrugItem.StrengthLabel + " ";
                tbDoseWrapLbl.Inlines.Add(rnStrengthLbl);
                let rnStrengthVal: Run = new Run();
                rnStrengthVal.Foreground = new SolidColorBrush(Color.FromArgb(255, 0, 0, 0));
                rnStrengthVal.FontWeight = FontWeights.Medium;
                rnStrengthVal.FontSize = 11;
                if (!String.IsNullOrEmpty(objDrugItem.Strength))
                    rnStrengthVal.Text = objDrugItem.Strength + " ";
                tbDoseWrapLbl.Inlines.Add(rnStrengthVal);
            }
            if (!String.IsNullOrEmpty(objDrugItem.FrequencyText)) {
                let rnFrequencyText1: Run = new Run();
                rnFrequencyText1.Foreground = new SolidColorBrush(Color.FromArgb(255, 0, 0, 0));
                rnFrequencyText1.FontWeight = FontWeights.Medium;
                rnFrequencyText1.FontSize = 11;
                if (!String.IsNullOrEmpty(objDrugItem.Dose)) {
                    rnFrequencyText1.Text = " - ";
                }
                rnFrequencyText1.Text += objDrugItem.FrequencyText + " ";
                tbDoseWrapLbl.Inlines.Add(rnFrequencyText1);
            }
            if (!String.IsNullOrEmpty(objDrugItem.AsRequiredText)) {
                let rnAsRequiredText1: Run = new Run();
                rnAsRequiredText1.Foreground = new SolidColorBrush(Color.FromArgb(255, 0, 0, 0));
                rnAsRequiredText1.FontWeight = FontWeights.Medium;
                rnAsRequiredText1.FontSize = 11;
                if (!String.IsNullOrEmpty(objDrugItem.FrequencyText) || !String.IsNullOrEmpty(objDrugItem.Dose)) {
                    rnAsRequiredText1.Text = " ";
                }
                rnAsRequiredText1.Text += objDrugItem.AsRequiredText + " ";
                tbDoseWrapLbl.Inlines.Add(rnAsRequiredText1);
            }
            if (!String.IsNullOrEmpty(objDrugItem.FrequencyWeeklyLabel)) {
                let rnFrequencyWeeklyLbl: Run = new Run();
                let bindDoseForeGrnd: Binding = new Binding();
                if (objDrugItem.DRSForecolor != null)
                    rnFrequencyWeeklyLbl.Foreground = objDrugItem.DRSForecolor;
                rnFrequencyWeeklyLbl.FontWeight = FontWeights.Bold;
                rnFrequencyWeeklyLbl.FontSize = 10;
                rnFrequencyWeeklyLbl.Text = objDrugItem.FrequencyWeeklyLabel + " ";
                tbDoseWrapLbl.Inlines.Add(rnFrequencyWeeklyLbl);
                let rnFrequencyWeeklyVal: Run = new Run();
                rnFrequencyWeeklyVal.Foreground = new SolidColorBrush(Color.FromArgb(255, 0, 0, 0));
                rnFrequencyWeeklyVal.FontWeight = FontWeights.Medium;
                rnFrequencyWeeklyVal.FontSize = 11;
                if (!String.IsNullOrEmpty(objDrugItem.FrequencyWeeklyValue))
                    rnFrequencyWeeklyVal.Text = objDrugItem.FrequencyWeeklyValue + " ";
                tbDoseWrapLbl.Inlines.Add(rnFrequencyWeeklyVal);
            }
            objWPanel.Children.Add(tbDoseWrapLbl);
        }
        return objWPanel;
    }
    public ConvertBack(value: Object, targetType: Type, parameter: Object, culture: CultureInfo): Object {
        throw new NotImplementedException();
    }
}
export class RouteWrapConverter1 {
    public Convert(value: Object, targetType: Type, parameter: Object, culture: CultureInfo): Object {
        let objWPanel: WrapPanel = new WrapPanel();
        objWPanel.Orientation = Orientation.Horizontal;
        if (value != null) {
            let objDrugItem: DrugItem = <DrugItem>value;
            if (!String.IsNullOrEmpty(objDrugItem.RouteLabel)) {
                let tbDoseLbl: TextBlock = new TextBlock();
                tbDoseLbl.Margin = new Thickness(0, 0, 5, 0);
                tbDoseLbl.FontWeight = FontWeights.Bold;
                tbDoseLbl.FontSize = 10;
                tbDoseLbl.HorizontalAlignment = HorizontalAlignment.Center;
                tbDoseLbl.VerticalAlignment = VerticalAlignment.Center;
                let bindDoseForeGrnd: Binding = new Binding();
                if (objDrugItem.DRSForecolor != null)
                    bindDoseForeGrnd.Source = objDrugItem.DRSForecolor;
                tbDoseLbl.SetBinding(TextBlock.ForegroundProperty, bindDoseForeGrnd);
                let bindDoseLbl: Binding = new Binding();
                bindDoseLbl.Source = objDrugItem.RouteLabel;
                tbDoseLbl.SetBinding(TextBlock.TextProperty, bindDoseLbl);
                objWPanel.Children.Add(tbDoseLbl);
            }
            if (!String.IsNullOrEmpty(objDrugItem.Route)) {
                let routeArray: string[] = objDrugItem.Route.Split(' ');
                for (let indx: number = 0; indx < routeArray.length; indx++) {
                    let tbDoseLbl: TextBlock = new TextBlock();
                    tbDoseLbl.Margin = new Thickness(0, 0, 5, 0);
                    let bindDoseForeGrnd: Binding = new Binding();
                    let bindDoseLbl: Binding = new Binding();
                    bindDoseLbl.Source = routeArray[indx];
                    tbDoseLbl.SetBinding(TextBlock.TextProperty, bindDoseLbl);
                    objWPanel.Children.Add(tbDoseLbl);
                }
            }
            let ObjSiteWrap: WrapPanel = new WrapPanel();
            ObjSiteWrap.Orientation = Orientation.Horizontal;
            objWPanel.Children.Add(ObjSiteWrap);
            if (!String.IsNullOrEmpty(objDrugItem.SiteLabel)) {
                let tbDoseLbl: TextBlock = new TextBlock();
                tbDoseLbl.Margin = new Thickness(0, 0, 5, 0);
                tbDoseLbl.FontWeight = FontWeights.Bold;
                tbDoseLbl.FontSize = 10;
                tbDoseLbl.HorizontalAlignment = HorizontalAlignment.Center;
                tbDoseLbl.VerticalAlignment = VerticalAlignment.Center;
                let bindDoseForeGrnd: Binding = new Binding();
                if (objDrugItem.DRSForecolor != null)
                    bindDoseForeGrnd.Source = objDrugItem.DRSForecolor;
                tbDoseLbl.SetBinding(TextBlock.ForegroundProperty, bindDoseForeGrnd);
                let bindDoseLbl: Binding = new Binding();
                bindDoseLbl.Source = objDrugItem.SiteLabel;
                tbDoseLbl.SetBinding(TextBlock.TextProperty, bindDoseLbl);
                ObjSiteWrap.Children.Add(tbDoseLbl);
            }
            if (!String.IsNullOrEmpty(objDrugItem.Site)) {
                let routeArray: string[] = objDrugItem.Site.Split(' ');
                for (let indx: number = 0; indx < routeArray.length; indx++) {
                    let tbDoseLbl: TextBlock = new TextBlock();
                    tbDoseLbl.Margin = new Thickness(0, 0, 5, 0);
                    tbDoseLbl.TextWrapping = TextWrapping.Wrap;
                    let bindDoseLbl: Binding = new Binding();
                    bindDoseLbl.Source = routeArray[indx];
                    tbDoseLbl.SetBinding(TextBlock.TextProperty, bindDoseLbl);
                    ObjSiteWrap.Children.Add(tbDoseLbl);
                }
            }
        }
        return objWPanel;
    }
    public ConvertBack(value: Object, targetType: Type, parameter: Object, culture: CultureInfo): Object {
        throw new NotImplementedException();
    }
}
export class RouteWrapConverter {
    public Convert(value: Object, targetType: Type, parameter: Object, culture: CultureInfo): Object {
        let objWPanel: WrapPanel = new WrapPanel();
        objWPanel.Orientation = Orientation.Horizontal;
        if (value != null) {
            let objDrugItem: DrugItem = <DrugItem>value;
            let tbDoseLbl: TextBlock = new TextBlock();
        //    tbDoseLbl.Margin = new Thickness(0, 0, 5, 0);
            tbDoseLbl.FontWeight = FontWeights.Bold;
            tbDoseLbl.FontSize = 10;
            tbDoseLbl.HorizontalAlignment = HorizontalAlignment.Center;
            tbDoseLbl.VerticalAlignment = VerticalAlignment.Center;
            if (!String.IsNullOrEmpty(objDrugItem.RouteLabel)) {
                let rnrouteLbl: Run = new Run();
                let bindDoseForeGrnd: Binding = new Binding();
                if (objDrugItem.DRSForecolor != null)
                    bindDoseForeGrnd.Source = objDrugItem.DRSForecolor;
                rnrouteLbl.SetBinding(TextBlock.ForegroundProperty, bindDoseForeGrnd);
                let bindDoseLbl: Binding = new Binding();
                bindDoseLbl.Source = objDrugItem.RouteLabel;
                rnrouteLbl.SetBinding(TextBlock.TextProperty, bindDoseLbl);
                tbDoseLbl.Inlines.Add(rnrouteLbl);
            }
            if (!String.IsNullOrEmpty(objDrugItem.Route)) {
                let routeArray: string[] = objDrugItem.Route.Split(' ');
                for (let indx: number = 0; indx < routeArray.length; indx++) {
                    let rnStrengthLbl: Run = new Run();
                    rnStrengthLbl.FontWeight = FontWeights.Medium;
                    rnStrengthLbl.FontSize = 11;
                    let bindDoseForeGrnd: Binding = new Binding();
                    let bindDoseLbl: Binding = new Binding();
                    bindDoseLbl.Source = routeArray[indx];
                    rnStrengthLbl.SetBinding(TextBlock.TextProperty, bindDoseLbl);
                    tbDoseLbl.Inlines.Add(rnStrengthLbl);
                }
            }
            if (!String.IsNullOrEmpty(objDrugItem.SiteLabel)) {
                let siteLbl: Run = new Run();
                siteLbl.Margin = new Thickness(0, 0, 0, 0);
                siteLbl.FontWeight = FontWeights.Bold;
                siteLbl.FontSize = 10;
                let bindDoseForeGrnd: Binding = new Binding();
                if (objDrugItem.DRSForecolor != null)
                    bindDoseForeGrnd.Source = objDrugItem.DRSForecolor;
                siteLbl.SetBinding(TextBlock.ForegroundProperty, bindDoseForeGrnd);
                let bindDoseLbl: Binding = new Binding();
                bindDoseLbl.Source = objDrugItem.SiteLabel;
                siteLbl.SetBinding(TextBlock.TextProperty, bindDoseLbl);
                tbDoseLbl.Inlines.Add(siteLbl);
            }
            if (!String.IsNullOrEmpty(objDrugItem.Site)) {
                let routeArray: string[] = objDrugItem.Site.Split(' ');
                for (let indx: number = 0; indx < routeArray.length; indx++) {
                    let siteval: Run = new Run();
                    siteval.Margin = new Thickness(0, 0, 0, 0);
                    siteval.TextWrapping = TextWrapping.Wrap;
                    siteval.FontWeight = FontWeights.Medium;
                    siteval.FontSize = 11;
                    let bindDoseLbl: Binding = new Binding();
                    bindDoseLbl.Source = routeArray[indx];
                    siteval.SetBinding(TextBlock.TextProperty, bindDoseLbl);
                    tbDoseLbl.Inlines.Add(siteval);
                }
            }
            objWPanel.Children.Add(tbDoseLbl)
        }
        return objWPanel;
    }
    public ConvertBack(value: Object, targetType: Type, parameter: Object, culture: CultureInfo): Object {
        throw new NotImplementedException();
    }
}
export class LineBreakWrapConverter {
    public Convert(value: Object, targetType: Type, parameter: Object, culture: CultureInfo): Visibility {
        let result: Visibility = Visibility.Collapsed;
        let objDrugItem: DrugItem = <DrugItem>value;
        if ((!String.IsNullOrEmpty(objDrugItem.StartDTLbl) && !String.IsNullOrEmpty(objDrugItem.StartDTVal)) || (!String.IsNullOrEmpty(objDrugItem.StopDTLbl) && !String.IsNullOrEmpty(objDrugItem.StopDTVal)) || (!String.IsNullOrEmpty(objDrugItem.PrescribedByLbl) && !String.IsNullOrEmpty(objDrugItem.PrescribedByVal)) || (!String.IsNullOrEmpty(objDrugItem.ActionByLbl) && !String.IsNullOrEmpty(objDrugItem.ActionByVal)) || (!String.IsNullOrEmpty(objDrugItem.ReasonLbl) && !String.IsNullOrEmpty(objDrugItem.ReasonVal)) || (!String.IsNullOrEmpty(objDrugItem.CommentsLbl) && !String.IsNullOrEmpty(objDrugItem.CommentsVal)))
            result = Visibility.Visible;
        return result;
    }
    public ConvertBack(value: Object, targetType: Type, parameter: Object, culture: CultureInfo): Object {
        return value;
    }
}
export class StartDTWrapConverter {
    public Convert(value: Object, targetType: Type, parameter: Object, culture: CultureInfo): Visibility {
        let result: Visibility = Visibility.Collapsed;
        let objDrugItem: DrugItem = <DrugItem>value;
        if (!String.IsNullOrEmpty(objDrugItem.StartDTLbl) && !String.IsNullOrEmpty(objDrugItem.StartDTVal))
            result = Visibility.Visible;
        return result;
    }
    public ConvertBack(value: Object, targetType: Type, parameter: Object, culture: CultureInfo): Object {
        return value;
    }
}
export class StopDTWrapConverter {
    public Convert(value: Object, targetType: Type, parameter: Object, culture: CultureInfo): Visibility {
        let result: Visibility = Visibility.Collapsed;
        let objDrugItem: DrugItem = <DrugItem>value;
        if (!String.IsNullOrEmpty(objDrugItem.StopDTLbl) && !String.IsNullOrEmpty(objDrugItem.StopDTVal))
            result = Visibility.Visible;
        return result;
    }
    public ConvertBack(value: Object, targetType: Type, parameter: Object, culture: CultureInfo): Object {
        return value;
    }
}
export class PrescribedByWrapConverter {
    public Convert(value: Object, targetType: Type, parameter: Object, culture: CultureInfo): Visibility {
        let result: Visibility = Visibility.Collapsed;
        let objDrugItem: DrugItem = <DrugItem>value;
        if (!String.IsNullOrEmpty(objDrugItem.PrescribedByLbl) && !String.IsNullOrEmpty(objDrugItem.PrescribedByVal))
            result = Visibility.Visible;
        return result;
    }
    public ConvertBack(value: Object, targetType: Type, parameter: Object, culture: CultureInfo): Object {
        return value;
    }
}
export class ActionByWrapConverter {
    public Convert(value: Object, targetType: Type, parameter: Object, culture: CultureInfo): Visibility {
        let result: Visibility = Visibility.Collapsed;
        let objDrugItem: DrugItem = <DrugItem>value;
        if (!String.IsNullOrEmpty(objDrugItem.ActionByLbl) && !String.IsNullOrEmpty(objDrugItem.ActionByVal))
            result = Visibility.Visible;
        return result;
    }
    public ConvertBack(value: Object, targetType: Type, parameter: Object, culture: CultureInfo): Object {
        return value;
    }
}
export class ReasonWrapConverter {
    public Convert(value: Object, targetType: Type, parameter: Object, culture: CultureInfo): Visibility {
        let result: Visibility = Visibility.Collapsed;
        let objDrugItem: DrugItem = <DrugItem>value;
        if (!String.IsNullOrEmpty(objDrugItem.ReasonLbl) && !String.IsNullOrEmpty(objDrugItem.ReasonVal))
            result = Visibility.Visible;
        return result;
    }
    public ConvertBack(value: Object, targetType: Type, parameter: Object, culture: CultureInfo): Object {
        return value;
    }
}
export class CommentsWrapConverter {
    public Convert(value: Object, targetType: Type, parameter: Object, culture: CultureInfo): Visibility {
        let result: Visibility = Visibility.Collapsed;
        let objDrugItem: DrugItem = <DrugItem>value;
        if (!String.IsNullOrEmpty(objDrugItem.CommentsLbl) && !String.IsNullOrEmpty(objDrugItem.CommentsVal))
            result = Visibility.Visible;
        return result;
    }
    public ConvertBack(value: Object, targetType: Type, parameter: Object, culture: CultureInfo): Object {
        return value;
    }
}
export class OmittedWrapConverter {
    public Convert(value: Object, targetType: Type, parameter: Object, culture: CultureInfo): Object {
        let result: Visibility = Visibility.Collapsed;
        let objAdminSlot: AdministratedSlot = <AdministratedSlot>value;
        if (!String.IsNullOrEmpty(objAdminSlot.OmittedMessage))
            result = Visibility.Visible;
        return result;
    }
    public ConvertBack(value: Object, targetType: Type, parameter: Object, culture: CultureInfo): Object {
        return value;
    }
}
export class InfusionDoseWrapConverter {
    public Convert(value: Object, targetType: Type, parameter: Object, culture: CultureInfo): Object {
        let objWPanel: WrapPanel = new WrapPanel();
        objWPanel.Orientation = Orientation.Horizontal;
        if (value != null) {
            let objDrugItem: DrugItem = <DrugItem>value;
            let tbDoseWrapLbl: TextBlock = new TextBlock();
           // tbDoseWrapLbl.Margin = new Thickness(0, 0, 0, 5);
            tbDoseWrapLbl.FontSize = 10;
            tbDoseWrapLbl.HorizontalAlignment = HorizontalAlignment.Center;
            tbDoseWrapLbl.VerticalAlignment = VerticalAlignment.Center;
            tbDoseWrapLbl.TextWrapping = TextWrapping.Wrap;
            if (!String.IsNullOrEmpty(objDrugItem.DoseLabel)) {
                let rnDoseLbl: Run = new Run();
                let bindDoseForeGrnd: Binding = new Binding();
                if (objDrugItem.DRSForecolor != null)
                    rnDoseLbl.Foreground = objDrugItem.DRSForecolor;
                rnDoseLbl.FontWeight = FontWeights.Bold;
                rnDoseLbl.FontSize = 11;
                rnDoseLbl.Text = objDrugItem.DoseLabel + " ";
                tbDoseWrapLbl.Inlines.Add(rnDoseLbl);
                let rnDoseVal: Run = new Run();
                rnDoseVal.Foreground = new SolidColorBrush(Color.FromArgb(255, 0, 0, 0));
                rnDoseVal.FontWeight = FontWeights.Medium;
                rnDoseVal.FontSize = 11;
                if (!String.IsNullOrEmpty(objDrugItem.Dose))
                    rnDoseVal.Text = objDrugItem.Dose + " ";
                tbDoseWrapLbl.Inlines.Add(rnDoseVal);
            }
            if (!String.IsNullOrEmpty(objDrugItem.BoosterDoseLabel)) {
                let rnBoosterDoseLbl: Run = new Run();
                if (objDrugItem.DRSForecolor != null)
                    rnBoosterDoseLbl.Foreground = objDrugItem.DRSForecolor;
                rnBoosterDoseLbl.FontWeight = FontWeights.Bold;
                rnBoosterDoseLbl.FontSize = 10;
                rnBoosterDoseLbl.Text = objDrugItem.BoosterDoseLabel + " ";
                tbDoseWrapLbl.Inlines.Add(rnBoosterDoseLbl);
                let rnBoosterDoseVal: Run = new Run();
                rnBoosterDoseVal.Foreground = new SolidColorBrush(Color.FromArgb(255, 0, 0, 0));
                rnBoosterDoseVal.FontWeight = FontWeights.Medium;
                rnBoosterDoseVal.FontSize = 11;
                if (!String.IsNullOrEmpty(objDrugItem.BoosterDose))
                    rnBoosterDoseVal.Text = objDrugItem.BoosterDose + " ";
                tbDoseWrapLbl.Inlines.Add(rnBoosterDoseVal);
            }
            if (!String.IsNullOrEmpty(objDrugItem.VolumeLabel)) {
                let rnVolumeLbl: Run = new Run();
                if (objDrugItem.DRSForecolor != null)
                    rnVolumeLbl.Foreground = objDrugItem.DRSForecolor;
                rnVolumeLbl.FontWeight = FontWeights.Bold;
                rnVolumeLbl.FontSize = 10;
                rnVolumeLbl.Text = objDrugItem.VolumeLabel + " ";
                tbDoseWrapLbl.Inlines.Add(rnVolumeLbl);
                let rnVolumeVal: Run = new Run();
                rnVolumeVal.Foreground = new SolidColorBrush(Color.FromArgb(255, 0, 0, 0));
                rnVolumeVal.FontWeight = FontWeights.Medium;
                rnVolumeVal.FontSize = 11;
                if (!String.IsNullOrEmpty(objDrugItem.Volume))
                    rnVolumeVal.Text = objDrugItem.Volume + " ";
                tbDoseWrapLbl.Inlines.Add(rnVolumeVal);
            }
            if (!String.IsNullOrEmpty(objDrugItem.ConcentrationLabel)) {
                let rnVolumeLbl: Run = new Run();
                if (objDrugItem.DRSForecolor != null)
                    rnVolumeLbl.Foreground = objDrugItem.DRSForecolor;
                rnVolumeLbl.FontWeight = FontWeights.Bold;
                rnVolumeLbl.FontSize = 10;
                rnVolumeLbl.Text = objDrugItem.ConcentrationLabel + " ";
                tbDoseWrapLbl.Inlines.Add(rnVolumeLbl);
                let rnVolumeVal: Run = new Run();
                rnVolumeVal.Foreground = new SolidColorBrush(Color.FromArgb(255, 0, 0, 0));
                rnVolumeVal.FontWeight = FontWeights.Medium;
                rnVolumeVal.FontSize = 11;
                if (!String.IsNullOrEmpty(objDrugItem.DrugConcentration))
                    rnVolumeVal.Text = objDrugItem.DrugConcentration + " ";
                tbDoseWrapLbl.Inlines.Add(rnVolumeVal);
            }
            if (!String.IsNullOrEmpty(objDrugItem.InfusionPeriod)) {
                let rnInfusion: Run = new Run();
                rnInfusion.Foreground = new SolidColorBrush(Color.FromArgb(255, 0, 0, 0));
                rnInfusion.FontWeight = FontWeights.Medium;
                rnInfusion.FontSize = 11;
                rnInfusion.Text = "over " + objDrugItem.InfusionPeriod + " ";
                tbDoseWrapLbl.Inlines.Add(rnInfusion);
            }
            if (!String.IsNullOrEmpty(objDrugItem.BolusLabel)) {
                let rnBolusLbl: Run = new Run();
                if (objDrugItem.DRSForecolor != null)
                    rnBolusLbl.Foreground = objDrugItem.DRSForecolor;
                rnBolusLbl.FontWeight = FontWeights.Bold;
                rnBolusLbl.FontSize = 11;
                rnBolusLbl.Text = objDrugItem.BolusLabel + " ";
                tbDoseWrapLbl.Inlines.Add(rnBolusLbl);
                let rnBolusVal: Run = new Run();
                rnBolusVal.Foreground = new SolidColorBrush(Color.FromArgb(255, 0, 0, 0));
                rnBolusVal.FontWeight = FontWeights.Medium;
                rnBolusVal.FontSize = 11;
                if (!String.IsNullOrEmpty(objDrugItem.Bolus))
                    rnBolusVal.Text = objDrugItem.Bolus + " ";
                tbDoseWrapLbl.Inlines.Add(rnBolusVal);
            }
            if (!String.IsNullOrEmpty(objDrugItem.LockoutLabel)) {
                let rnLockoutLbl: Run = new Run();
                if (objDrugItem.DRSForecolor != null)
                    rnLockoutLbl.Foreground = objDrugItem.DRSForecolor;
                rnLockoutLbl.FontWeight = FontWeights.Bold;
                rnLockoutLbl.FontSize = 11;
                rnLockoutLbl.Text = objDrugItem.LockoutLabel.Trim() + " - ";
                tbDoseWrapLbl.Inlines.Add(rnLockoutLbl);
                let rnLockoutVal: Run = new Run();
                rnLockoutVal.Foreground = new SolidColorBrush(Color.FromArgb(255, 0, 0, 0));
                rnLockoutVal.FontWeight = FontWeights.Medium;
                rnLockoutVal.FontSize = 11;
                if (!String.IsNullOrEmpty(objDrugItem.Lockout))
                    rnLockoutVal.Text = objDrugItem.Lockout.Trim() + " ";
                tbDoseWrapLbl.Inlines.Add(rnLockoutVal);
            }
            if (!String.IsNullOrEmpty(objDrugItem.MaxdoseLabel)) {
                let rnMaxdoseLbl: Run = new Run();
                if (objDrugItem.DRSForecolor != null)
                    rnMaxdoseLbl.Foreground = objDrugItem.DRSForecolor;
                rnMaxdoseLbl.FontWeight = FontWeights.Bold;
                rnMaxdoseLbl.FontSize = 10;
                rnMaxdoseLbl.Text = objDrugItem.MaxdoseLabel + " ";
                tbDoseWrapLbl.Inlines.Add(rnMaxdoseLbl);
                let rnMaxdoseVal: Run = new Run();
                rnMaxdoseVal.Foreground = new SolidColorBrush(Color.FromArgb(255, 0, 0, 0));
                rnMaxdoseVal.FontWeight = FontWeights.Medium;
                rnMaxdoseVal.FontSize = 11;
                if (!String.IsNullOrEmpty(objDrugItem.Maxdose))
                    rnMaxdoseVal.Text = objDrugItem.Maxdose + " ";
                tbDoseWrapLbl.Inlines.Add(rnMaxdoseVal);
            }
            if (!String.IsNullOrEmpty(objDrugItem.RateLabel)) {
                let rnRateLbl: Run = new Run();
                if (objDrugItem.DRSForecolor != null)
                    rnRateLbl.Foreground = objDrugItem.DRSForecolor;
                rnRateLbl.FontWeight = FontWeights.Bold;
                rnRateLbl.Text = objDrugItem.RateLabel + " ";
                rnRateLbl.FontSize = 11;
                tbDoseWrapLbl.Inlines.Add(rnRateLbl);
                let rnRateVal: Run = new Run();
                rnRateVal.Foreground = new SolidColorBrush(Color.FromArgb(255, 0, 0, 0));
                rnRateVal.FontWeight = FontWeights.Medium;
                rnRateVal.FontSize = 11;
                if (!String.IsNullOrEmpty(objDrugItem.Rate))
                    rnRateVal.Text = objDrugItem.Rate + " ";
                tbDoseWrapLbl.Inlines.Add(rnRateVal);
            }
            if (!String.IsNullOrEmpty(objDrugItem.Duration)) {
                let rnDuration: Run = new Run();
                rnDuration.Foreground = new SolidColorBrush(Color.FromArgb(255, 0, 0, 0));
                rnDuration.FontWeight = FontWeights.Medium;
                rnDuration.FontSize = 11;
                if (String.IsNullOrEmpty(objDrugItem.RateLabel))
                    rnDuration.Text = "for " + objDrugItem.Duration + " ";
                else rnDuration.Text = " - for " + objDrugItem.Duration + " ";
                tbDoseWrapLbl.Inlines.Add(rnDuration);
            }
            if (objDrugItem.Ongoing) {
                let rnOngoing: Run = new Run();
                rnOngoing.Foreground = new SolidColorBrush(Color.FromArgb(255, 0, 0, 0));
                rnOngoing.FontWeight = FontWeights.Medium;
                rnOngoing.FontSize = 11;
                rnOngoing.Text = " - Ongoing ";
                tbDoseWrapLbl.Inlines.Add(rnOngoing);
            }
            if (!String.IsNullOrEmpty(objDrugItem.FrequencyText)) {
                let rnFrequencyText1: Run = new Run();
                rnFrequencyText1.Foreground = new SolidColorBrush(Color.FromArgb(255, 0, 0, 0));
                rnFrequencyText1.FontWeight = FontWeights.Medium;
                rnFrequencyText1.FontSize = 11;
                if (!String.IsNullOrEmpty(objDrugItem.Dose)) {
                    rnFrequencyText1.Text = " - ";
                }
                rnFrequencyText1.Text += objDrugItem.FrequencyText + " ";
                tbDoseWrapLbl.Inlines.Add(rnFrequencyText1);
            }
            if (!String.IsNullOrEmpty(objDrugItem.AsRequiredText)) {
                let rnAsRequiredText1: Run = new Run();
                rnAsRequiredText1.Foreground = new SolidColorBrush(Color.FromArgb(255, 0, 0, 0));
                rnAsRequiredText1.FontWeight = FontWeights.Medium;
                rnAsRequiredText1.FontSize = 11;
                if (!String.IsNullOrEmpty(objDrugItem.FrequencyText) || !String.IsNullOrEmpty(objDrugItem.Dose)) {
                    rnAsRequiredText1.Text = " ";
                }
                rnAsRequiredText1.Text += objDrugItem.AsRequiredText + " ";
                tbDoseWrapLbl.Inlines.Add(rnAsRequiredText1);
            }
            if (!String.IsNullOrEmpty(objDrugItem.FrequencyWeeklyLabel)) {
                let rnFrequencyWeeklyLbl: Run = new Run();
                let bindDoseForeGrnd: Binding = new Binding();
                if (objDrugItem.DRSForecolor != null)
                    rnFrequencyWeeklyLbl.Foreground = objDrugItem.DRSForecolor;
                rnFrequencyWeeklyLbl.FontWeight = FontWeights.Bold;
                rnFrequencyWeeklyLbl.FontSize = 10;
                rnFrequencyWeeklyLbl.Text = objDrugItem.FrequencyWeeklyLabel + " ";
                tbDoseWrapLbl.Inlines.Add(rnFrequencyWeeklyLbl);
                let rnFrequencyWeeklyVal: Run = new Run();
                rnFrequencyWeeklyVal.Foreground = new SolidColorBrush(Color.FromArgb(255, 0, 0, 0));
                rnFrequencyWeeklyVal.FontWeight = FontWeights.Medium;
                rnFrequencyWeeklyVal.FontSize = 11;
                if (!String.IsNullOrEmpty(objDrugItem.FrequencyWeeklyValue))
                    rnFrequencyWeeklyVal.Text = objDrugItem.FrequencyWeeklyValue + " ";
                tbDoseWrapLbl.Inlines.Add(rnFrequencyWeeklyVal);
            }
            objWPanel.Children.Add(tbDoseWrapLbl);
        }
        return objWPanel;
    }
    public ConvertBack(value: Object, targetType: Type, parameter: Object, culture: CultureInfo): Object {
        throw new NotImplementedException();
    }
}
export class InfusionRouteWrapConverter1 {
    public Convert(value: Object, targetType: Type, parameter: Object, culture: CultureInfo): Object {
        let objWPanel: WrapPanel = new WrapPanel();
        objWPanel.Orientation = Orientation.Horizontal;
        if (value != null) {
            let objDrugItem: DrugItem = <DrugItem>value;
            if (!String.IsNullOrEmpty(objDrugItem.RouteLabel)) {
                let tbDoseLbl: TextBlock = new TextBlock();
                tbDoseLbl.Margin = new Thickness(0, 0, 5, 0);
                tbDoseLbl.FontWeight = FontWeights.Bold;
                tbDoseLbl.FontSize = 10;
                tbDoseLbl.HorizontalAlignment = HorizontalAlignment.Center;
                tbDoseLbl.VerticalAlignment = VerticalAlignment.Center;
                let bindDoseForeGrnd: Binding = new Binding();
                if (objDrugItem.DRSForecolor != null)
                    bindDoseForeGrnd.Source = objDrugItem.DRSForecolor;
                tbDoseLbl.SetBinding(TextBlock.ForegroundProperty, bindDoseForeGrnd);
                let bindDoseLbl: Binding = new Binding();
                bindDoseLbl.Source = objDrugItem.RouteLabel;
                tbDoseLbl.SetBinding(TextBlock.TextProperty, bindDoseLbl);
               
                objWPanel.Children.Add(tbDoseLbl);
            }
            if (!String.IsNullOrEmpty(objDrugItem.Route)) {
                let routeArray: string[] = objDrugItem.Route.Split(' ');
                for (let indx: number = 0; indx < routeArray.length; indx++) {
                    let tbDoseLbl: TextBlock = new TextBlock();
                    tbDoseLbl.Margin = new Thickness(0, 0, 5, 0);
                    let bindDoseForeGrnd: Binding = new Binding();
                    let bindDoseLbl: Binding = new Binding();
                    bindDoseLbl.Source = routeArray[indx];
                    tbDoseLbl.SetBinding(TextBlock.TextProperty, bindDoseLbl);
                    objWPanel.Children.Add(tbDoseLbl);
                }
            }
            let ObjSiteWrap: WrapPanel = new WrapPanel();
            ObjSiteWrap.Orientation = Orientation.Horizontal;
            objWPanel.Children.Add(ObjSiteWrap);
            if (!String.IsNullOrEmpty(objDrugItem.SiteLabel)) {
                let tbDoseLbl: TextBlock = new TextBlock();
                tbDoseLbl.Margin = new Thickness(0, 0, 5, 0);
                tbDoseLbl.FontWeight = FontWeights.Bold;
                tbDoseLbl.FontSize = 10;
                tbDoseLbl.HorizontalAlignment = HorizontalAlignment.Center;
                tbDoseLbl.VerticalAlignment = VerticalAlignment.Center;
                let bindDoseForeGrnd: Binding = new Binding();
                if (objDrugItem.DRSForecolor != null)
                    bindDoseForeGrnd.Source = objDrugItem.DRSForecolor;
                tbDoseLbl.SetBinding(TextBlock.ForegroundProperty, bindDoseForeGrnd);
                let bindDoseLbl: Binding = new Binding();
                bindDoseLbl.Source = objDrugItem.SiteLabel;
                tbDoseLbl.SetBinding(TextBlock.TextProperty, bindDoseLbl);
                ObjSiteWrap.Children.Add(tbDoseLbl);
            }
            if (!String.IsNullOrEmpty(objDrugItem.Site)) {
                let routeArray: string[] = objDrugItem.Site.Split(' ');
                for (let indx: number = 0; indx < routeArray.length; indx++) {
                    let tbDoseLbl: TextBlock = new TextBlock();
                    tbDoseLbl.Margin = new Thickness(0, 0, 5, 0);
                    tbDoseLbl.TextWrapping = TextWrapping.Wrap;
                    let bindDoseLbl: Binding = new Binding();
                    bindDoseLbl.Source = routeArray[indx];
                    tbDoseLbl.SetBinding(TextBlock.TextProperty, bindDoseLbl);
                    ObjSiteWrap.Children.Add(tbDoseLbl);
                }
            }
            if (!String.IsNullOrEmpty(objDrugItem.Lumen)) {
                let tblumen: TextBlock = new TextBlock();
                tblumen.TextWrapping = TextWrapping.Wrap;
                let bindtblumen: Binding = new Binding();
                if (!String.IsNullOrEmpty(objDrugItem.Lumen)) {
                    bindtblumen.Source = objDrugItem.Lumen;
                }
                else {
                    bindtblumen.Source = String.Empty;
                }
                tblumen.SetBinding(TextBlock.TextProperty, bindtblumen);
                let objtblumen: TextBlock = ObjectHelper.CreateObject(new TextBlock(), { Text: " - " });
                let objStackFreq: Grid = new Grid();
                objStackFreq.HorizontalAlignment = HorizontalAlignment.Left;
                let col1: ColumnDefinition = new ColumnDefinition();
                col1.Width = new GridLength(1, GridUnitType.Auto);
                let col2: ColumnDefinition = new ColumnDefinition();
                objStackFreq.ColumnDefinitions.Add(col1);
                objStackFreq.ColumnDefinitions.Add(col2);
                Grid.SetColumn(objtblumen, 0);
                Grid.SetColumn(tblumen, 1);
                objStackFreq.Children.Add(objtblumen);
                objStackFreq.Children.Add(tblumen);
                objWPanel.Children.Add(objStackFreq);
            }
            if (!String.IsNullOrEmpty(objDrugItem.Deliverydevice)) {
                let tbDeldevice: TextBlock = new TextBlock();
                tbDeldevice.TextWrapping = TextWrapping.Wrap;
                let bindtblumen: Binding = new Binding();
                if (!String.IsNullOrEmpty(objDrugItem.Deliverydevice)) {
                    bindtblumen.Source = objDrugItem.Deliverydevice;
                }
                else {
                    bindtblumen.Source = String.Empty;
                }
                tbDeldevice.SetBinding(TextBlock.TextProperty, bindtblumen);
                let objdeldevice: TextBlock = ObjectHelper.CreateObject(new TextBlock(), { Text: " - " });
                let objStackFreq: Grid = new Grid();
                objStackFreq.HorizontalAlignment = HorizontalAlignment.Left;
                let col1: ColumnDefinition = new ColumnDefinition();
                col1.Width = new GridLength(1, GridUnitType.Auto);
                let col2: ColumnDefinition = new ColumnDefinition();
                objStackFreq.ColumnDefinitions.Add(col1);
                objStackFreq.ColumnDefinitions.Add(col2);
                Grid.SetColumn(objdeldevice, 0);
                Grid.SetColumn(tbDeldevice, 1);
                objStackFreq.Children.Add(objdeldevice);
                objStackFreq.Children.Add(tbDeldevice);
                objWPanel.Children.Add(objStackFreq);
            }
        }
        return objWPanel;
    }
    public ConvertBack(value: Object, targetType: Type, parameter: Object, culture: CultureInfo): Object {
        throw new NotImplementedException();
    }
}
export class InfusionRouteWrapConverter {
    public Convert(value: Object, targetType: Type, parameter: Object, culture: CultureInfo): Object {
        let objWPanel: WrapPanel = new WrapPanel();
        objWPanel.Orientation = Orientation.Horizontal;
        if (value != null) {
            let objDrugItem: DrugItem = <DrugItem>value;
              let tbDoseLbl: TextBlock = new TextBlock();
              //  tbDoseLbl.Margin = new Thickness(0, 0, 0, 5);
                tbDoseLbl.FontWeight = FontWeights.Bold;
                tbDoseLbl.FontSize = 10;
                tbDoseLbl.HorizontalAlignment = HorizontalAlignment.Center;
                tbDoseLbl.VerticalAlignment = VerticalAlignment.Center;
            if (!String.IsNullOrEmpty(objDrugItem.RouteLabel)) {
                let rnrouteLbl: Run = new Run();
                let bindDoseForeGrnd: Binding = new Binding();
                if (objDrugItem.DRSForecolor != null)
                    bindDoseForeGrnd.Source = objDrugItem.DRSForecolor;
                rnrouteLbl.SetBinding(TextBlock.ForegroundProperty, bindDoseForeGrnd);
                let bindDoseLbl: Binding = new Binding();
                bindDoseLbl.Source = objDrugItem.RouteLabel;
                rnrouteLbl.SetBinding(TextBlock.TextProperty, bindDoseLbl);
                tbDoseLbl.Inlines.Add(rnrouteLbl);
            }
            if (!String.IsNullOrEmpty(objDrugItem.Route)) {
                let routeArray: string[] = objDrugItem.Route.Split(' ');
                for (let indx: number = 0; indx < routeArray.length; indx++) {
                   let rnStrengthLbl: Run = new Run();
                   rnStrengthLbl.FontWeight = FontWeights.Medium;
                   rnStrengthLbl.FontSize = 11;
                    let bindDoseForeGrnd: Binding = new Binding();
                    let bindDoseLbl: Binding = new Binding();
                    bindDoseLbl.Source = routeArray[indx];
                    rnStrengthLbl.SetBinding(TextBlock.TextProperty, bindDoseLbl);
                    tbDoseLbl.Inlines.Add(rnStrengthLbl);
                }
            }
            // objWPanel.Children.Add(tbDoseLbl)
            // let ObjSiteWrap: WrapPanel = new WrapPanel();
            // ObjSiteWrap.Orientation = Orientation.Horizontal;
            // objWPanel.Children.Add(ObjSiteWrap);
            if (!String.IsNullOrEmpty(objDrugItem.SiteLabel)) {
                let siteLbl: Run = new Run();
                siteLbl.Margin = new Thickness(0, 0, 0, 0);
                siteLbl.FontWeight = FontWeights.Bold;
                siteLbl.FontSize = 10;
                let bindDoseForeGrnd: Binding = new Binding();
                if (objDrugItem.DRSForecolor != null)
                    bindDoseForeGrnd.Source = objDrugItem.DRSForecolor;
                siteLbl.SetBinding(TextBlock.ForegroundProperty, bindDoseForeGrnd);
                let bindDoseLbl: Binding = new Binding();
                bindDoseLbl.Source = objDrugItem.SiteLabel;
                siteLbl.SetBinding(TextBlock.TextProperty, bindDoseLbl);
                tbDoseLbl.Inlines.Add(siteLbl);
            }
            if (!String.IsNullOrEmpty(objDrugItem.Site)) {
                let routeArray: string[] = objDrugItem.Site.Split(' ');
                for (let indx: number = 0; indx < routeArray.length; indx++) {
                    let siteval: Run = new Run();
                    siteval.Margin = new Thickness(0, 0, 0, 0);
                    siteval.TextWrapping = TextWrapping.Wrap;
                    siteval.FontWeight = FontWeights.Medium;
                    siteval.FontSize = 11;
                    let bindDoseLbl: Binding = new Binding();
                    bindDoseLbl.Source = routeArray[indx];
                    siteval.SetBinding(TextBlock.TextProperty, bindDoseLbl);
                    tbDoseLbl.Inlines.Add(siteval);
                }
            }
            if (!String.IsNullOrEmpty(objDrugItem.Lumen)) {
                let tblumen: Run = new Run();
                tblumen.TextWrapping = TextWrapping.Wrap;
                tblumen.FontWeight = FontWeights.Medium;
                tblumen.FontSize = 11;
                let bindtblumen: Binding = new Binding();
                if (!String.IsNullOrEmpty(objDrugItem.Lumen)) {
                    bindtblumen.Source = objDrugItem.Lumen;
                }
                else {
                    bindtblumen.Source = String.Empty;
                }
                tblumen.SetBinding(TextBlock.TextProperty, bindtblumen);
                let objtblumen: Run = ObjectHelper.CreateObject(new Run(), { Text: " - " });
                // let objStackFreq: Grid = new Grid();
                // objStackFreq.HorizontalAlignment = HorizontalAlignment.Left;
                // let col1: ColumnDefinition = new ColumnDefinition();
                // col1.Width = new GridLength(1, GridUnitType.Auto);
                // let col2: ColumnDefinition = new ColumnDefinition();
                // objStackFreq.ColumnDefinitions.Add(col1);
                // objStackFreq.ColumnDefinitions.Add(col2);
                // Grid.SetColumn(objtblumen, 0);
                // Grid.SetColumn(tblumen, 1);
                // objStackFreq.Children.Add(objtblumen);
                // objStackFreq.Children.Add(tblumen);
                tbDoseLbl.Inlines.Add(objtblumen);
                tbDoseLbl.Inlines.Add(tblumen);
                // objWPanel.Children.Add(objStackFreq);
            }
            if (!String.IsNullOrEmpty(objDrugItem.Deliverydevice)) {
                let tbDeldevice: Run = new Run();
                tbDeldevice.TextWrapping = TextWrapping.Wrap;
                tbDeldevice.FontWeight = FontWeights.Medium;
                tbDeldevice.FontSize=11;
                let bindtblumen: Binding = new Binding();
                if (!String.IsNullOrEmpty(objDrugItem.Deliverydevice)) {
                    bindtblumen.Source = objDrugItem.Deliverydevice;
                }
                else {
                    bindtblumen.Source = String.Empty;
                }
                tbDeldevice.SetBinding(TextBlock.TextProperty, bindtblumen);
                let objdeldevice: Run = ObjectHelper.CreateObject(new Run(), { Text: " - " });
                // let objStackFreq: Grid = new Grid();
                // objStackFreq.HorizontalAlignment = HorizontalAlignment.Left;
                // let col1: ColumnDefinition = new ColumnDefinition();
                // col1.Width = new GridLength(1, GridUnitType.Auto);
                // let col2: ColumnDefinition = new ColumnDefinition();
                // objStackFreq.ColumnDefinitions.Add(col1);
                // objStackFreq.ColumnDefinitions.Add(col2);
                // Grid.SetColumn(objdeldevice, 0);
                // Grid.SetColumn(tbDeldevice, 1);
                // objStackFreq.Children.Add(objdeldevice);
                // objStackFreq.Children.Add(tbDeldevice);
                tbDoseLbl.Inlines.Add(objdeldevice);
                tbDoseLbl.Inlines.Add(tbDeldevice);
                // objWPanel.Children.Add(objStackFreq);
            }
            objWPanel.Children.Add(tbDoseLbl)
        }
        return objWPanel;
    }
    public ConvertBack(value: Object, targetType: Type, parameter: Object, culture: CultureInfo): Object {
        throw new NotImplementedException();
    }
}
export class TimeConvertor {
    public Convert(value: Object,targetType: Type,  parameter?: Object): Object {
        let sTime: string = String.Empty;
        if (value != null) {
            let _IsDST: boolean;
            let _IsAmbiguous: boolean;
            let _IsInvalid: boolean;
            let parameters: string[] = null;
            let parameterString: string = ObjectHelper.CreateType<string>(parameter, 'string');
            parameters = parameterString.Split('&');
            let dtContent: DateTime = (value as DateTime).ConvertToUser((o1) => { _IsDST = o1; }, (o2) => { _IsAmbiguous = o2; }, (o3) => { _IsInvalid = o3; });
            sTime = dtContent.ToString(parameters[0].ToString());
            if (_IsDST == true && _IsAmbiguous == true && !String.IsNullOrEmpty(sTime) && String.Compare(parameters[1].ToUpper(), "TRUE") == 0)
                sTime = String.Concat(sTime, " ", SLDateUtility.GetDSTString()); /**TEMPORARY FIX - NEED TO DEVELOP/IMPLEMENT BY PLATFORM TEAM (GetDSTString method added) */
        }
        return sTime;
    }
    public ConvertBack(value: Object, targetType: Type, parameter: Object, culture: CultureInfo): Object {
        return null;
    }
}
export class VisibilityConvertor {
    public Convert(value: Object, targetType: Type, parameter: Object, culture: CultureInfo): Object {
        if (value != null) {
            let Value: boolean = <boolean>value;
            return Value ? Visibility.Visible : Visibility.Collapsed;
        }
        return null;
    }
    public ConvertBack(value: Object, targetType: Type, parameter: Object, culture: CultureInfo): Object {
        return null;
    }
}
export class OmitWrapConverter {
    public Convert(value: Object, targetType: Type, parameter: Object, culture: CultureInfo): Visibility {
        let result: Visibility = Visibility.Collapsed;
        let objDrugItem: DrugItem = <DrugItem>value;
        if (!String.IsNullOrEmpty(objDrugItem.OmitLabel))
            result = Visibility.Visible;
        return result;
    }
    public ConvertBack(value: Object, targetType: Type, parameter: Object, culture: CultureInfo): Object {
        return value;
    }
}
export class ReviewWrapConverter {
    public Convert(value: Object, targetType: Type, parameter: Object, culture: CultureInfo): Visibility {
        let result: Visibility = Visibility.Collapsed;
        let objDrugItem: DrugItem = <DrugItem>value;
        if (!String.IsNullOrEmpty(objDrugItem.ReviewLabel) && !String.IsNullOrEmpty(objDrugItem.ReviewVal))
            result = Visibility.Visible;
        return result;
    }
    public ConvertBack(value: Object, targetType: Type, parameter: Object, culture: CultureInfo): Object {
        return value;
    }
}
