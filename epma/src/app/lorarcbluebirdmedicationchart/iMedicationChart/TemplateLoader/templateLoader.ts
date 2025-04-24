import * as ControlStyles from '../../../shared/epma-platform/controls/ControlStyles';
import { Grid,Border,DataTemplate, TextBlock, Binding, StackPanel, Image,Color, Thickness } from 'epma-platform/controls';
import { RowDefinition,ColumnDefinition } from '../../../shared/epma-platform/controls/epma-grid/epma-grid.component';
import { BindingMode } from '../../../shared/epma-platform/controls/FrameworkElement';
import { ImageURIBitMapPipe, TimeConvertorPipe,StringTextPipe, VisibilityConvertorPipe } from 'src/app/lorarcbluebirdmedicationchart/converter/MedChartConverter.pipe';
import * as _ from 'lodash';
import { iMedicationChart } from '../iMedicationChart.component';
import { InjectorInstance } from 'src/app/app.module';
import { MediatorDataService } from 'epma-platform/services';

export class TemplateLoader{
    public Styles = ControlStyles;

    timeSlot(dataContext?: any): any {
        let timeSlot = new DataTemplate();

        let border: Border = new Border();
        border.Style = ControlStyles.BorderWidth;
        border.VerticalAlignment = 'Center';
        border.HorizontalAlignment = 'Center';
        let borderToolTipBinding = new Binding(dataContext,"StatusToolTip");
        borderToolTipBinding.Mode = BindingMode.OneTime;
        border.SetBinding(Border.ToolTipProperty, borderToolTipBinding);

        let grid: Grid = new Grid();
        grid.VerticalAlignment = 'Stretch';
        grid.HorizontalAlignment = 'Stretch';
        let rowDef: RowDefinition = new RowDefinition();
        rowDef.Height = '1fr';
        grid.RowDefinitions.Add(rowDef);

        let textBlock = new TextBlock();
        textBlock.Name = 'tbTime';
        textBlock.VerticalAlignment = 'Center';
        textBlock.HorizontalAlignment = 'Center';
        textBlock.textWrapping = 'Wrap';
        textBlock.style['white-space'] = 'normal';
        
        let bindtbtbDurationLabel: Binding = new Binding(dataContext,"SlotTime");
        bindtbtbDurationLabel.Source = dataContext.SlotTime;
        bindtbtbDurationLabel.Mode = BindingMode.OneTime;
        textBlock.SetBinding(TextBlock.TextProperty, bindtbtbDurationLabel);

        //Binding
        let textFontbind = new Binding(dataContext,"FontWeightTime");
        textFontbind.Mode = BindingMode.OneTime;
        // textFontbind.Path = 'FontWeightTime';
        // textFontbind.PathObject = dataContext.FontWeightTime;
        textFontbind.Source = dataContext.FontWeightTime;
        textBlock.SetBinding(TextBlock.FontWeightProperty, textFontbind);

        grid.Children.Add(textBlock);
        grid.SetGridRow(textBlock, 1);
        grid.SetGridColumn(textBlock, 1);
        let itemstyle = { 'display': `flex`, 'flex-direction': `column`, 'justify-content': `center` };
        grid.SetColumnRowStyle(itemstyle, 1, 1);
        border.Child = grid;//do
        // border.Content = textBlock;

        timeSlot.Content = border;

        return timeSlot.Content;
    }
    normalDefaultSlot(dataContext, timeFormat): any {
        let normalDefaultSlot = new DataTemplate();
        let border = new Border();
        border.noDefaultStyle = true;
        border.Style = ControlStyles.BorderWidth;
        border.VerticalAlignment = 'Stretch';
        border.BorderBrush = "#7090A5";
        border.BorderThickness = new Thickness(1, 0, 1, 0);
        let borderToolTipBinding = new Binding(dataContext, "StatusToolTip");
        borderToolTipBinding.Mode = BindingMode.OneTime;
        border.SetBinding(Border.ToolTipProperty, borderToolTipBinding);

        let grid = new Grid();
        grid.VerticalAlignment = 'Stretch';
        if(_.get(dataContext,'StatusToolTip'))
          grid.Tooltip=dataContext.StatusToolTip;
        let rowDef1: RowDefinition = new RowDefinition();
        let rowDef2: RowDefinition = new RowDefinition();
        rowDef1.Height = '18'
        rowDef2.Height = '1fr';
        grid.RowDefinitions.Add(rowDef1);
        grid.RowDefinitions.Add(rowDef2);
        let colDef1: ColumnDefinition = new ColumnDefinition();
        let colDef2: ColumnDefinition = new ColumnDefinition();
        colDef1.Width = 'Auto';
        colDef2.Width = '1fr';
        grid.ColumnDefinitions.Add(colDef1);
        grid.ColumnDefinitions.Add(colDef2);

        let textBlock = new TextBlock();
        textBlock.Margin = '1';
        textBlock.Name = 'tbTime';
        textBlock.VerticalAlignment = 'Top';
        textBlock.HorizontalAlignment = 'Left';
        //Binding
        let tbfontweight = new Binding(dataContext, "FontWeightTime");
        tbfontweight.Mode = BindingMode.OneTime;
        textBlock.SetBinding(TextBlock.FontWeightProperty, tbfontweight);

        let txtbbinding: Binding = new Binding(dataContext, "Time");
        let timeConverterpipe: TimeConvertorPipe = new TimeConvertorPipe();
        txtbbinding.Converter = timeConverterpipe;
        txtbbinding.ConverterParameter = String.Concat(timeFormat, "&", "TRUE");
        txtbbinding.Source = dataContext.Time;
        txtbbinding.Mode = BindingMode.OneTime;
        // txtbbinding.Path = 'Text';
        // txtbbinding.PathObject = 'Text';
        textBlock.SetBinding(TextBlock.TextProperty, txtbbinding);

        textBlock.TextWrapping = 'Wrap';
        grid.Children.Add(textBlock);

        let stackPanel = new StackPanel();
        stackPanel.Orientation = 'Horizontal';
        stackPanel.HorizontalAlignment = 'RightMiddle';

        let sptextblock = new TextBlock();
        sptextblock.Margin = '1';
        sptextblock.VerticalAlignment = 'Top';
        sptextblock.Name = 'tbSlotStatus';
        sptextblock.HorizontalAlignment = 'Right';

        //Binding
        let sptbtext = new Binding(dataContext, "SlotStatus");
        sptbtext.Mode = BindingMode.OneTime;
        sptextblock.SetBinding(TextBlock.TextProperty, sptbtext);
        let sptbfont = new Binding(dataContext, "FontWeightStatus");
        sptbfont.Mode = BindingMode.OneTime;
        sptextblock.SetBinding(TextBlock.FontWeightProperty, sptbfont);
        sptextblock.TextWrapping = 'Wrap';

        let spBorder1 = new Border();
        spBorder1.VerticalAlignment = 'Top';
        spBorder1.Margin = '1';
        spBorder1.Width = 'Auto';
        spBorder1.noDefaultStyle = true;
        spBorder1.Background = 'Transparent';
        spBorder1.BorderThickness = '0';
        // let spBorder1ToolTipBinding = new Binding(dataContext, "ConflictIcon.Tooltip");
        // spBorder1.SetBinding(Border.ToolTipProperty, spBorder1ToolTipBinding);

        let bor1Image = new Image();
        bor1Image.Name = 'imgConflictIcon';
        bor1Image.Cursor = 'Hand';
        bor1Image.Height = 'Auto';
        bor1Image.Width = 'Auto';

        if(dataContext.IsChartDefaultSlotLastColumn){
            bor1Image.TooltipPosition = "left";
          }

        //Binding
        let bor1imgHitTest = new Binding(dataContext, "ConflictIcon.EnableOnHotSpotClick");
        bor1imgHitTest.Mode = BindingMode.OneTime;
        bor1Image.SetBinding(Image.IsHitProperty, bor1imgHitTest);

        let bor1imgTooltip = new Binding(dataContext, "ConflictIcon.Tooltip");
        bor1imgTooltip.Mode = BindingMode.OneTime;
        bor1Image.SetBinding(Image.ToolTipProperty, bor1imgTooltip);

        let bor1imgTag = new Binding(dataContext, "ConflictIcon");
        bor1imgTag.Mode = BindingMode.OneTime;
        bor1Image.SetBinding(Image.TagProperty, bor1imgTag);

        let bor1imgbind: Binding = new Binding(dataContext, "ConflictIcon.UriString");
        bor1imgbind.Mode = BindingMode.OneTime;
        let bor1imgConvertpipe: ImageURIBitMapPipe = new ImageURIBitMapPipe();
        bor1imgbind.Converter = bor1imgConvertpipe;
        bor1Image.SetBinding(Image.SourceProperty, bor1imgbind);

        if (_.get(bor1Image, 'Source')) {
            spBorder1.Child = bor1Image;
        }

        let spBorder2 = new Border();
        spBorder2.VerticalAlignment = 'Top';
        spBorder2.Margin = '1';
        spBorder2.Width = 'Auto';
        spBorder2.noDefaultStyle = true;
        spBorder2.Background = 'Transparent';
        spBorder2.BorderThickness = '0';
        // let spBorder2ToolTipBinding = new Binding(dataContext, "CumulativeIcon.Tooltip");
        // spBorder2.SetBinding(Border.ToolTipProperty, spBorder2ToolTipBinding);

        let bor2Image = new Image();
        bor2Image.Name = 'imgCumulativeIcon';
        bor2Image.Cursor = 'Hand';
        bor2Image.Height = 'Auto';
        bor2Image.Width = 'Auto';
        if(dataContext.IsChartDefaultSlotLastColumn){
            bor2Image.TooltipPosition = "left";
          }
        //Binding
        let bor2imgHitTest = new Binding(dataContext, "CumulativeIcon.EnableOnHotSpotClick");
        bor2imgHitTest.Mode = BindingMode.OneTime;
        bor2Image.SetBinding(Image.IsHitProperty, bor2imgHitTest);

        let bor2imgTooltip = new Binding(dataContext, "CumulativeIcon.Tooltip");
        bor2imgTooltip.Mode = BindingMode.OneTime;
        bor2Image.SetBinding(Image.ToolTipProperty, bor2imgTooltip);

        let bor2imgTag = new Binding(dataContext, "CumulativeIcon");
        bor2imgTag.Mode = BindingMode.OneTime;
        bor2Image.SetBinding(Image.TagProperty, bor2imgTag);

        let bor2imgbind: Binding = new Binding(dataContext, "CumulativeIcon.UriString");
        bor2imgbind.Mode = BindingMode.OneTime;
        let bor2imgConvertpipe: ImageURIBitMapPipe = new ImageURIBitMapPipe();
        bor2imgbind.Converter = bor2imgConvertpipe;
        bor2Image.SetBinding(Image.SourceProperty, bor2imgbind);
        if (_.get(bor2Image, 'Source')) {
            spBorder2.Child = bor2Image;
        }
        let spBorder3 = new Border();
        spBorder3.VerticalAlignment = 'Top';
        spBorder3.Margin = '1';
        spBorder3.Width = 'Auto';
        spBorder3.noDefaultStyle = true;
        spBorder3.Background = 'Transparent';
        spBorder3.BorderThickness = '0';
        // let spBorder3ToolTipBinding = new Binding(dataContext, "HomeLeaveIcon.Tooltip");
        // spBorder3.SetBinding(Border.ToolTipProperty, spBorder3ToolTipBinding);

        let bor3Image = new Image();
        bor3Image.Name = 'imgHomeLeaveIcon';
        bor3Image.Cursor = 'Hand';
        bor3Image.MaxHeight = '16';
        bor3Image.MaxWidth = '16';
        if(dataContext.IsChartDefaultSlotLastColumn){
            bor3Image.TooltipPosition = "left";
          }
        //Binding
        let bor3imgHitTest = new Binding(dataContext, "HomeLeaveIcon.EnableOnHotSpotClick");
        bor3imgHitTest.Mode = BindingMode.OneTime;
        bor3Image.SetBinding(Image.IsHitProperty, bor3imgHitTest);

        let bor3imgTooltip = new Binding(dataContext, "HomeLeaveIcon.Tooltip");
        bor3imgTooltip.Mode = BindingMode.OneTime;
        bor3Image.SetBinding(Image.ToolTipProperty, bor3imgTooltip);

        let bor3imgTag = new Binding(dataContext, "HomeLeaveIcon");
        bor3imgTag.Mode = BindingMode.OneTime;
        bor3Image.SetBinding(Image.TagProperty, bor3imgTag);

        let bor3imgbind: Binding = new Binding(dataContext, "HomeLeaveIcon.UriString");
        bor3imgbind.Mode = BindingMode.OneTime;
        let bor3imgConvertpipe: ImageURIBitMapPipe = new ImageURIBitMapPipe();
        bor3imgbind.Converter = bor3imgConvertpipe;
        bor3Image.SetBinding(Image.SourceProperty, bor3imgbind);
        if (_.get(bor3Image, 'Source')) {
            spBorder3.Child = bor3Image;
        }
        stackPanel.Children.Add(sptextblock);
        stackPanel.Children.Add(spBorder1);
        stackPanel.Children.Add(spBorder2);
        stackPanel.Children.Add(spBorder3);

        grid.Children.Add(stackPanel);
        grid.SetGridColumn(stackPanel, 2);

        let innergrid = new Grid();
        let innerGridRowDef: RowDefinition = new RowDefinition();
        let innerGridColDef1: ColumnDefinition = new ColumnDefinition();
        let innerGridColDef2: ColumnDefinition = new ColumnDefinition();
        innerGridColDef1.Width = '1fr';
        innerGridColDef2.Width = 'auto';
        innergrid.RowDefinitions.Add(innerGridRowDef);
        innergrid.ColumnDefinitions.Add(innerGridColDef1);
        innergrid.ColumnDefinitions.Add(innerGridColDef2);

        let innergridtextblock = new TextBlock();
        innergridtextblock.Margin = '1';
        innergridtextblock.VerticalAlignment = 'Bottom';
        innergridtextblock.HorizontalAlignment = 'Left';
        innergridtextblock.Name = 'tbDose';
        innergridtextblock.style.whiteSpace = 'break-spaces';
        innergridtextblock.TextWrapping = 'Wrap';

        // //Binding
        let ingrdtbtext = new Binding(dataContext, "Dose");
        ingrdtbtext.Mode = BindingMode.OneTime;
        innergridtextblock.SetBinding(TextBlock.TextProperty, ingrdtbtext);

        innergrid.Children.Add(innergridtextblock);
        innergrid.SetGridRow(innergridtextblock, 1);
        innergrid.SetGridColumn(innergridtextblock, 1);

        let innergridStackPanel = new StackPanel();
        innergridStackPanel.Orientation = 'Horizontal';
        innergridStackPanel.HorizontalAlignment = 'Right';
        innergridStackPanel.Width = 'Auto';

        let ingrdspborder1 = new Border();
        ingrdspborder1.Margin = '1';
        ingrdspborder1.HorizontalAlignment = 'Right';
        ingrdspborder1.VerticalAlignment = 'Bottom';
        ingrdspborder1.noDefaultStyle = true;
        ingrdspborder1.Background = 'Transparent';
        ingrdspborder1.BorderThickness = '0';
        ingrdspborder1.Width = 'Auto';
        // let ingrdspborder1ToolTipBinding = new Binding(dataContext, "PrescriptionStatusIcon.Tooltip");
        // ingrdspborder1.SetBinding(Border.ToolTipProperty, ingrdspborder1ToolTipBinding);

        let ingrdspborder1VisibilityBinding = new Binding(dataContext, "PrescriptionStatusIcon.ImageVisiblity");
        ingrdspborder1VisibilityBinding.Mode = BindingMode.OneTime;
        let ingrdspborder1ConverterPipe = new VisibilityConvertorPipe();
        ingrdspborder1VisibilityBinding.Converter = ingrdspborder1ConverterPipe;
        ingrdspborder1.SetBinding(Border.VisibilityProperty, ingrdspborder1VisibilityBinding);

        let ingrdspbrimg = new Image();
        ingrdspbrimg.Name = 'imgPrescriptionStatusIcon';
        ingrdspbrimg.Cursor = 'Hand';
        ingrdspbrimg.HorizontalAlignment = 'Right';
        ingrdspbrimg.Height = '16';
        ingrdspbrimg.Width = '16';
        if(dataContext.IsChartDefaultSlotLastColumn){
            ingrdspbrimg.TooltipPosition = "left";
          }

        // //Binding
        let spbrdimgHitTest = new Binding(dataContext, "PrescriptionStatusIcon.EnableOnHotSpotClick");
        spbrdimgHitTest.Mode = BindingMode.OneTime;
        ingrdspbrimg.SetBinding(Image.IsHitProperty, spbrdimgHitTest);

        let spbrdimgToolTip = new Binding(dataContext, "PrescriptionStatusIcon.Tooltip");
        spbrdimgToolTip.Mode = BindingMode.OneTime;
        ingrdspbrimg.SetBinding(Image.ToolTipProperty, spbrdimgToolTip);

        let spbrdimgTag = new Binding(dataContext, "PrescriptionStatusIcon");
        spbrdimgTag.Mode = BindingMode.OneTime;
        ingrdspbrimg.SetBinding(Image.TagProperty, spbrdimgTag);

        let spbrdimgbind: Binding = new Binding(dataContext, "PrescriptionStatusIcon.UriString");
        spbrdimgbind.Mode = BindingMode.OneTime;
        let spbrdimgConvertpipe: ImageURIBitMapPipe = new ImageURIBitMapPipe();
        spbrdimgbind.Converter = spbrdimgConvertpipe;
        ingrdspbrimg.SetBinding(Image.SourceProperty, spbrdimgbind);
        if (_.get(ingrdspbrimg, 'Source')) {
            ingrdspborder1.Child = ingrdspbrimg;
        }
        let ingrdspborder2 = new Border();
        ingrdspborder2.Margin = '1,1,0,0';
        ingrdspborder2.noDefaultStyle = true;
        ingrdspborder2.Background = 'Transparent';
        ingrdspborder2.Width = 'Auto';
        ingrdspborder2.BorderThickness = '0';
        ingrdspborder2.VerticalAlignment = 'Bottom';
        ingrdspborder2.HorizontalAlignment = 'Right';

        // let ingrdspborder2ToolTipBinding = new Binding(dataContext, "AdministrationIcon.Tooltip");
        // ingrdspborder2.SetBinding(Border.ToolTipProperty, ingrdspborder2ToolTipBinding);

        let ingrdspborder2VisibilityBinding = new Binding(dataContext, "AdministrationIcon.ImageVisiblity");
        ingrdspborder2VisibilityBinding.Mode = BindingMode.OneTime;
        let ingrdspborder2ConverterPipe = new VisibilityConvertorPipe();
        ingrdspborder2VisibilityBinding.Converter = ingrdspborder2ConverterPipe;
        ingrdspborder2.SetBinding(Border.VisibilityProperty, ingrdspborder2VisibilityBinding);

        let ingrdspbr2img = new Image();
        ingrdspbr2img.Name = 'imgAdministrativeIcon';
        ingrdspbr2img.style.display='flex';
        ingrdspbr2img.HorizontalAlignment = 'Right';
        ingrdspbr2img.Cursor = 'Hand';
        ingrdspbr2img.VerticalAlignment = 'Bottom';
        ingrdspbr2img.Width = '10';
        ingrdspbr2img.Height = '10';
        if(dataContext.IsChartDefaultSlotLastColumn){
            ingrdspbr2img.TooltipPosition = "left";
          }

        //Binding
        let spbrd2imgHitTest = new Binding(dataContext, "AdministrationIcon.EnableOnHotSpotClick");
        spbrd2imgHitTest.Mode = BindingMode.OneTime;
        ingrdspbr2img.SetBinding(Image.IsHitProperty, spbrd2imgHitTest);

        let spbrd2imgToolTip = new Binding(dataContext, "AdministrationIcon.Tooltip");
        spbrd2imgToolTip.Mode = BindingMode.OneTime;
        ingrdspbr2img.SetBinding(Image.ToolTipProperty, spbrd2imgToolTip);

        let spbrd2imgTag = new Binding(dataContext, "AdministrationIcon");
        spbrd2imgTag.Mode = BindingMode.OneTime;
        ingrdspbr2img.SetBinding(Image.TagProperty, spbrd2imgTag);

        let spbrd2imgbind: Binding = new Binding(dataContext, "AdministrationIcon.UriString");
        spbrd2imgbind.Mode = BindingMode.OneTime;
        let spbrd2imgConvertpipe: ImageURIBitMapPipe = new ImageURIBitMapPipe();
        spbrd2imgbind.Converter = spbrd2imgConvertpipe;
        ingrdspbr2img.SetBinding(Image.SourceProperty, spbrd2imgbind);
        if (_.get(ingrdspbr2img, 'Source')) {
            ingrdspborder2.Child = ingrdspbr2img;
        }
        innergridStackPanel.Children.Add(ingrdspborder1);
        innergridStackPanel.Children.Add(ingrdspborder2);

        innergrid.Children.Add(innergridStackPanel);
        innergrid.SetGridRow(innergridStackPanel, 1);
        innergrid.SetGridColumn(innergridStackPanel, 2);
        let itemstyle1 = { 'display': `flex`, 'flex-direction': `column`, 'justify-content': `flex-end` };
        innergrid.SetColumnRowStyle(itemstyle1, 1, 2);

        grid.Children.Add(innergrid);
        grid.SetGridRow(innergrid, 2);
        grid.SetColumnSpan(innergrid, 3);
        let itemstyle = { 'display': `flex`, 'flex-direction': `column`, 'justify-content': `flex-end` };
        grid.SetColumnRowStyle(itemstyle, 2, 1);
        border.Child = grid;
        normalDefaultSlot.Content = border;
        return normalDefaultSlot.Content;
    }

    blankSlot(): any {
        let blankslot = new DataTemplate();
        let border = new Border();
        border.noDefaultStyle = true;
        border.Style = ControlStyles.BorderWidth;
        border.VerticalAlignment = 'Stretch';
        border.HorizontalAlignment = 'Stretch';
        border.BorderBrush = "#7090A5";
        border.BorderThickness = new Thickness(1, 0, 1, 0);        
        //border.ToolTipService.ToolTip//do

        let grid = new Grid();
        grid.VerticalAlignment = 'Stretch';
        grid.HorizontalAlignment = 'Stretch';
        let rowDef: RowDefinition = new RowDefinition();
        rowDef.Height = '1fr';
        grid.RowDefinitions.Add(rowDef);

        border.Child=grid;
        blankslot.Content = border;
        return blankslot.Content;

    }

    overViewSlot(dataContext:any): any {
        let overViewSlot = new DataTemplate();

        let border = new Border();
        border.noDefaultStyle = true;
        border.Style = ControlStyles.BorderWidth;
        border.VerticalAlignment = 'Stretch';
        border.Background = 'Transparent';
        border.HorizontalAlignment = 'Stretch';
        border.BorderBrush = "#7090A5";
        border.BorderThickness = new Thickness(1, 0, 1, 0);

        let borderToolTipBinding = new Binding(dataContext,"Tooltip");
        borderToolTipBinding.Mode = BindingMode.OneTime;
        border.SetBinding(Border.ToolTipProperty, borderToolTipBinding);

        let grid = new Grid();
        let rowDef: RowDefinition = new RowDefinition();
        rowDef.Height = '1fr';
        grid.RowDefinitions.Add(rowDef);

        let stackpanel = new StackPanel();
        stackpanel.Orientation = 'Horizontal';
        stackpanel.VerticalAlignment = 'Center';
        stackpanel.HorizontalAlignment = 'Center';

        let border1 = new Border();
        border1.noDefaultStyle = true;
        border1.VerticalAlignment = 'Center';
        border1.HorizontalAlignment = 'Left';
        border1.Margin = '1';
        border1.Background = 'Transparent';
        border1.BorderThickness = '0';

        // let border1ToolTipBinding = new Binding(dataContext,"HistoryIcon.Tooltip");
        // border1.SetBinding(Border.ToolTipProperty, border1ToolTipBinding);

        let image1 = new Image();
        image1.Name = 'imgHistoryIcon';
        image1.Cursor = 'Hand';

        //binding

        let image1HitPropertyBind = new Binding(dataContext, "HistoryIcon.EnableOnHotSpotClick");
        image1HitPropertyBind.Mode = BindingMode.OneTime;
        image1.SetBinding(Image.IsHitProperty, image1HitPropertyBind);

        let image1ToolTipService = new Binding(dataContext, "HistoryIcon.Tooltip");
        image1ToolTipService.Mode = BindingMode.OneTime;
        image1.SetBinding(Image.ToolTipProperty, image1ToolTipService);


        let image1Width = new Binding(dataContext, "HistoryIconWdth");
        image1Width.Mode = BindingMode.OneTime;
        image1.SetBinding(Image.WidthProperty, image1Width);


        let image1Height = new Binding(dataContext, "HistoryIconHght");
        image1Height.Mode = BindingMode.OneTime;
        image1.SetBinding(Image.HeightProperty, image1Height);

        let image1Tag = new Binding(dataContext, "HistoryIcon");
        image1Tag.Mode = BindingMode.OneTime;
        image1.SetBinding(Image.TagProperty, image1Tag);

        let image1bind: Binding = new Binding(dataContext, "HistoryIcon.UriString");
        image1bind.Mode = BindingMode.OneTime;
        let image1imgConvertpipe: ImageURIBitMapPipe = new ImageURIBitMapPipe();
        image1bind.Converter = image1imgConvertpipe;
        image1.SetBinding(Image.SourceProperty, image1bind);
        image1.DataContext = dataContext;
        if (_.get(dataContext, 'HistoryIcon.EnableOnHotSpotClick'))
            image1.MouseLeftButtonDown = (s, e) => { iMedicationChart.oMedicationChart.FireImageClick(s, e) };
        if (_.get(image1, 'Source')) {
            border1.Child = image1;
        }
        stackpanel.Children.Add(border1);

        let border2 = new Border();
        border2.noDefaultStyle = true;
        border2.Margin = '2,1,1,1';
        border2.Width = 'Auto';
        border2.VerticalAlignment = 'Center';
        border2.HorizontalAlignment = 'Center';
        border2.Background = 'Transparent';
        border2.BorderThickness = '0';

        // let border2ToolTipBinding = new Binding(dataContext,"StatusIcon.Tooltip");
        // border2.SetBinding(Border.ToolTipProperty, border2ToolTipBinding);

        let border2Image1 = new Image();
        border2Image1.Height = '16';
        border2Image1.Width = '16';
        border2Image1.Cursor = 'Hand';

        //binding

        let border2Image1ToolTipService = new Binding(dataContext, "StatusIcon.Tooltip");
        border2Image1ToolTipService.Mode = BindingMode.OneTime;
        border2Image1.SetBinding(Image.ToolTipProperty, border2Image1ToolTipService);

        let border2Image1Tag = new Binding(dataContext, "StatusIcon");
        border2Image1Tag.Mode = BindingMode.OneTime;
        border2Image1.SetBinding(Image.TagProperty, border2Image1Tag);

        let border2Image1HitTestVisible = new Binding(dataContext, "StatusIcon.EnableOnHotSpotClick");
        border2Image1HitTestVisible.Mode = BindingMode.OneTime;
        border2Image1.SetBinding(Image.IsHitProperty, border2Image1HitTestVisible);

        let border2Image1bind: Binding = new Binding(dataContext, "StatusIcon.UriString");
        border2Image1bind.Mode = BindingMode.OneTime;
        let border2Image1imgConvertpipe: ImageURIBitMapPipe = new ImageURIBitMapPipe();
        border2Image1bind.Converter = border2Image1imgConvertpipe;
        border2Image1.SetBinding(Image.SourceProperty, border2Image1bind);
        border2Image1.DataContext = dataContext;
        if (_.get(dataContext,'StatusIcon.EnableOnHotSpotClick'))
            border2Image1.MouseLeftButtonDown = (s, e) => iMedicationChart.oMedicationChart.FireImageClick(s, e);
        if (_.get(border2Image1, 'Source')) {
            border2.Child = border2Image1;
        }
        stackpanel.Children.Add(border2);

        let border3 = new Border();
        border3.noDefaultStyle = true;
        border3.VerticalAlignment = 'Bottom';
        border3.HorizontalAlignment = 'Right';
        border3.Margin = '0';
        border3.Background = 'Transparent';
        border3.BorderThickness = '0';

        // let border3ToolTipBinding = new Binding("AdministrationIcon.Tooltip");
        // border3.SetBinding(Border.ToolTipProperty, border3ToolTipBinding);


        let border3Image1 = new Image();
        border3Image1.Name = 'imgAdministrativeIcon';
        border3Image1.HorizontalAlignment = 'Right';
        border3Image1.VerticalAlignment = 'Bottom';
        border3Image1.Cursor = 'Hand';
        border3Image1.Width = '10';
        border3Image1.Height = '10';

        //binding

        let border3Image1HitTestVisible = new Binding(dataContext, "AdministrationIcon.EnableOnHotSpotClick");
        border3Image1HitTestVisible.Mode = BindingMode.OneTime;
        border3Image1.SetBinding(Image.IsHitProperty, border3Image1HitTestVisible);


        let border3Image1ToolTipService = new Binding(dataContext, "AdministrationIcon.Tooltip");
        border3Image1ToolTipService.Mode = BindingMode.OneTime;
        border3Image1.SetBinding(Image.ToolTipProperty, border3Image1ToolTipService);

        let border3Image1Tag = new Binding(dataContext, "AdministrationIcon");
        border3Image1Tag.Mode = BindingMode.OneTime;
        border3Image1.SetBinding(Image.TagProperty, border3Image1Tag);

        let border3Image1bind: Binding = new Binding(dataContext, "AdministrationIcon.UriString");
        border3Image1bind.Mode = BindingMode.OneTime;
        let border3Image1imgConvertpipe: ImageURIBitMapPipe = new ImageURIBitMapPipe();
        border3Image1bind.Converter = border3Image1imgConvertpipe;
        border3Image1.SetBinding(Image.SourceProperty, border3Image1bind);
        border3Image1.DataContext = dataContext;
        if (_.get(dataContext, 'AdministrationIcon.EnableOnHotSpotClick'))
            border3Image1.MouseLeftButtonDown = (s, e) => iMedicationChart.oMedicationChart.FireImageClick(s, e);
        if (_.get(border3Image1, 'Source')) {
            border3.Child = border3Image1;
        }

        let border4 = new Border();
        border4.noDefaultStyle = true;
        border4.VerticalAlignment = 'Top';
        border4.Margin = '1';
        border4.Width = 'Auto';
        border4.Background = 'Transparent';
        border4.BorderThickness = '0';

        // let border4ToolTipBinding = new Binding(dataContext,"HomeLeaveIcon.Tooltip");
        // border4.SetBinding(Border.ToolTipProperty, border4ToolTipBinding);


        let border4Image1 = new Image();
        border4Image1.Name = 'imgHomeLeaveIcon';
        border4Image1.Cursor = 'Hand';
        border4Image1.MaxHeight = '16';
        border4Image1.MaxWidth = '16';

        //binding
        let border4Image1HitTestVisible = new Binding(dataContext, "HomeLeaveIcon.EnableOnHotSpotClick");
        border4Image1HitTestVisible.Mode = BindingMode.OneTime;
        border4Image1.SetBinding(Image.IsHitProperty, border4Image1HitTestVisible);

        let border4Image1ToolTipService = new Binding(dataContext, "HomeLeaveIcon.ToolTip");
        border4Image1ToolTipService.Mode = BindingMode.OneTime;
        border4Image1.SetBinding(Image.ToolTipProperty, border4Image1ToolTipService);

        let border4Image1Tag = new Binding(dataContext, "HomeLeaveIcon");
        border4Image1Tag.Mode = BindingMode.OneTime;
        border4Image1.SetBinding(Image.TagProperty, border4Image1Tag);

        let border4Image1bind: Binding = new Binding(dataContext, "HomeLeaveIcon.UriString");
        border4Image1bind.Mode = BindingMode.OneTime;
        let border4Image1imgConvertpipe: ImageURIBitMapPipe = new ImageURIBitMapPipe();
        border4Image1bind.Converter = border4Image1imgConvertpipe;
        border4Image1.SetBinding(Image.SourceProperty, border4Image1bind);
        border4Image1.DataContext = dataContext;
        if (_.get(dataContext, 'HomeLeaveIcon.EnableOnHotSpotClick'))
            border4Image1.MouseLeftButtonDown = (s, e) => iMedicationChart.oMedicationChart.FireImageClick(s, e);
        if (_.get(border4Image1, 'Source')) {
            border4.Child = border4Image1;
        }

        grid.Children.Add(stackpanel);
        grid.Children.Add(border3);
        grid.Children.Add(border4);
        border.Child = grid;
        overViewSlot.Content = border;
        return overViewSlot.Content;

    }
    todayMultiSlot(dataContext): any {
        let todayMultiSlot = new DataTemplate();
        let Border1 = new Border();
        Border1.noDefaultStyle = true;
        Border1.Style = ControlStyles.BorderWidth;
        Border1.Background = "Transparent";
        let Border1ToolTipBinding = new Binding(dataContext, "StatusToolTip");
        Border1ToolTipBinding.Mode = BindingMode.OneTime;
        Border1.SetBinding(Border.ToolTipProperty, Border1ToolTipBinding);
        Border1.BorderBrush = "#7090A5";
        Border1.BorderThickness = new Thickness(1, 0, 1, 0);

        let grid = new Grid();
        grid.HorizontalAlignment = 'Stretch';
        // grid.style['justify-content']=`space-between`;

        let rowDef1: RowDefinition = new RowDefinition();
        let rowDef2: RowDefinition = new RowDefinition();
        let colDef1: ColumnDefinition = new ColumnDefinition();
        let colDef2: ColumnDefinition = new ColumnDefinition();
        colDef1.Width='90';
        colDef2.Width='auto';
        grid.RowDefinitions.Add(rowDef1);
        grid.RowDefinitions.Add(rowDef2);
        grid.ColumnDefinitions.Add(colDef1);
        grid.ColumnDefinitions.Add(colDef2);

        let tbLastGivenTime = new TextBlock();
        tbLastGivenTime.Margin = "1";
        tbLastGivenTime.VerticalAlignment = "Top";
        tbLastGivenTime.Name = "tbLastGivenTime";
        tbLastGivenTime.style.whiteSpace = 'break-spaces';
        tbLastGivenTime.TextWrapping = "Wrap";
        tbLastGivenTime.HorizontalAlignment = "Left";
        //Binding
        let tbLastGivenTimeTextBinding = new Binding(dataContext, "LastGivenTime");
        tbLastGivenTimeTextBinding.Mode = BindingMode.OneTime;
        tbLastGivenTime.SetBinding(TextBlock.TextProperty, tbLastGivenTimeTextBinding);
        // console.log(tbLastGivenTime.Text)

        let tbLastGivenTimeFontWeightBinding = new Binding(dataContext, "FontWeightTime");
        tbLastGivenTimeFontWeightBinding.Mode = BindingMode.OneTime;
        tbLastGivenTime.SetBinding(TextBlock.FontWeightProperty, tbLastGivenTimeFontWeightBinding);

        let grid1 = new Grid();
        let grd1colDef1 = new ColumnDefinition();
        let grd1colDef2 = new ColumnDefinition();
        grd1colDef2.Width = 'auto';
        grid1.ColumnDefinitions.Add(grd1colDef1);
        grid1.ColumnDefinitions.Add(grd1colDef2);

        let tbSlotStatus = new TextBlock();
        tbSlotStatus.Margin = "1";
        // tbSlotStatus.Grid.Column = "0";
        tbSlotStatus.HorizontalAlignment = "Right";
        tbSlotStatus.VerticalAlignment = "Top";
        tbSlotStatus.Name = "tbSlotStatus";
        tbSlotStatus.style.whiteSpace = 'break-spaces';
        tbSlotStatus.TextWrapping = "Wrap";

        //Binding
        if (_.get(dataContext, "SlotStatus")) {
            let slotstaus = _.get(dataContext, "SlotStatus")
            dataContext.SlotStatus = slotstaus.Contains('\n') ? slotstaus : slotstaus.replace(/(.*?\s.*?\s)/g, '$1' + '\n');
            let tbSlotStatusTextBinding = new Binding(dataContext, "SlotStatus");
            tbSlotStatusTextBinding.Mode = BindingMode.OneTime;
            tbSlotStatus.SetBinding(TextBlock.TextProperty, tbSlotStatusTextBinding);
        }
        //console.log("Slotstatus",dataContext?.SlotStatus)
        let tbSlotStatusFontWeightBinding = new Binding(dataContext, "FontWeightStatus");
        tbSlotStatusFontWeightBinding.Mode = BindingMode.OneTime;
        tbSlotStatus.SetBinding(TextBlock.FontWeightProperty, tbSlotStatusFontWeightBinding);

        grid1.Children.Add(tbSlotStatus);
        grid1.SetGridColumn(tbSlotStatus, 1);

        let StackPanel1 = new StackPanel();
        StackPanel1.Orientation = "Horizontal";
        //  StackPanel1.Grid.Column = "2";

        let SPBorder1 = new Border();
        SPBorder1.VerticalAlignment = "Top";
        SPBorder1.Margin = "1";
        SPBorder1.Width = "Auto";
        SPBorder1.noDefaultStyle = true;
        SPBorder1.Background = "Transparent";
        SPBorder1.BorderThickness = "0";
        // let SPBorder1ToolTipBinding = new Binding(dataContext, "ConflictIcon.Tooltip");
        // SPBorder1.SetBinding(Border.ToolTipProperty, SPBorder1ToolTipBinding);

        let imgConflictIcon = new Image();
        imgConflictIcon.Name = "imgConflictIcon";
        imgConflictIcon.Cursor = "Hand";

        if(dataContext.IsChartTodayMultiSlotLastColumn){
            imgConflictIcon.TooltipPosition = "left";
          }

        let imgConflictIconIsHitTestVisibleBinding = new Binding(dataContext, "ConflictIcon.EnableOnHotSpotClick");
        imgConflictIconIsHitTestVisibleBinding.Mode = BindingMode.OneTime;
        imgConflictIcon.SetBinding(Image.IsHitTestVisibleProperty, imgConflictIconIsHitTestVisibleBinding);

        let imgConflictIconToolTipBinding = new Binding(dataContext, "ConflictIcon.Tooltip");
        imgConflictIconToolTipBinding.Mode = BindingMode.OneTime;
        imgConflictIcon.SetBinding(Image.ToolTipProperty, imgConflictIconToolTipBinding);

        imgConflictIcon.MaxHeight = "16";
        imgConflictIcon.MaxWidth = "16";

        let imgConflictIconTagBinding = new Binding(dataContext, "ConflictIcon");
        imgConflictIconTagBinding.Mode = BindingMode.OneTime;
        imgConflictIcon.SetBinding(Image.TagProperty, imgConflictIconTagBinding);

        let imgConflictIconSourceBinding = new Binding(dataContext, "ConflictIcon.UriString");
        imgConflictIconSourceBinding.Mode = BindingMode.OneTime;
        let imgConflictIconConverterPipe = new ImageURIBitMapPipe();
        imgConflictIconSourceBinding.Converter = imgConflictIconConverterPipe;
        imgConflictIcon.SetBinding(Image.SourceProperty, imgConflictIconSourceBinding);

        if (_.get(imgConflictIcon, 'Source')) {
            SPBorder1.Child = imgConflictIcon;
        }

        let SPBorder2 = new Border();
        SPBorder2.VerticalAlignment = "Top";
        SPBorder2.Margin = "1";
        SPBorder2.Width = "Auto";
        SPBorder2.noDefaultStyle = true;
        SPBorder2.Background = "Transparent";
        SPBorder2.BorderThickness = "0";
        // let SPBorder2ToolTipBinding = new Binding(dataContext, "CumulativeIcon.Tooltip");
        // SPBorder2.SetBinding(Border.ToolTipProperty, SPBorder2ToolTipBinding);

        let imgCumulativeIcon = new Image();
        imgCumulativeIcon.Name = "imgCumulativeIcon";
        imgCumulativeIcon.Cursor = "Hand";

        if(dataContext.IsChartTodayMultiSlotLastColumn){
            imgCumulativeIcon.TooltipPosition = "left";
          }
        //Binding
        let imgCumulativeIconIsHitTestVisibleBinding = new Binding(dataContext, "CumulativeIcon.EnableOnHotSpotClick");
        imgCumulativeIconIsHitTestVisibleBinding.Mode = BindingMode.OneTime;
        imgCumulativeIcon.SetBinding(Image.IsHitTestVisibleProperty, imgCumulativeIconIsHitTestVisibleBinding);

        let imgCumulativeIconToolTipBinding = new Binding(dataContext, "CumulativeIcon.Tooltip");
        imgCumulativeIconToolTipBinding.Mode = BindingMode.OneTime;
        imgCumulativeIcon.SetBinding(Image.ToolTipProperty, imgCumulativeIconToolTipBinding);

        imgCumulativeIcon.MaxHeight = "16";
        imgCumulativeIcon.MaxWidth = "16";

        let imgCumulativeIconTagBinding = new Binding(dataContext, "CumulativeIcon");
        imgCumulativeIconTagBinding.Mode = BindingMode.OneTime;
        imgCumulativeIcon.SetBinding(Image.TagProperty, imgCumulativeIconTagBinding);

        let imgCumulativeIconSourceBinding = new Binding(dataContext, "CumulativeIcon.UriString");
        imgCumulativeIconSourceBinding.Mode = BindingMode.OneTime;
        let imgCumulativeIconConverterPipe = new ImageURIBitMapPipe();
        imgCumulativeIconSourceBinding.Converter = imgCumulativeIconConverterPipe;
        imgCumulativeIcon.SetBinding(Image.SourceProperty, imgCumulativeIconSourceBinding);

        if (_.get(imgCumulativeIcon, 'Source')) {
            SPBorder2.Child = imgCumulativeIcon;
        }

        let SPBorder3 = new Border();
        SPBorder3.VerticalAlignment = "Top";
        SPBorder3.Margin = "1";
        SPBorder3.Width = "Auto";
        SPBorder3.noDefaultStyle = true;
        SPBorder3.Background = "Transparent";
        SPBorder3.BorderThickness = "0";
        // let SPBorder3ToolTipBinding = new Binding(dataContext, "HomeLeaveIcon.Tooltip");
        // SPBorder3.SetBinding(Border.ToolTipProperty, SPBorder3ToolTipBinding);

        let imgHomeLeaveIcon = new Image();
        imgHomeLeaveIcon.Name = "imgHomeLeaveIcon";
        imgHomeLeaveIcon.Cursor = "Hand";

        if(dataContext.IsChartTodayMultiSlotLastColumn){
            imgHomeLeaveIcon.TooltipPosition = "left";
          }

        //Binding
        let imgHomeLeaveIconIsHitTestVisibleBinding = new Binding(dataContext, "HomeLeaveIcon.EnableOnHotSpotClick");
        imgHomeLeaveIconIsHitTestVisibleBinding.Mode = BindingMode.OneTime;
        imgHomeLeaveIcon.SetBinding(Image.IsHitTestVisibleProperty, imgHomeLeaveIconIsHitTestVisibleBinding);

        let imgHomeLeaveIconToolTipBinding = new Binding(dataContext, "HomeLeaveIcon.Tooltip");
        imgHomeLeaveIconToolTipBinding.Mode = BindingMode.OneTime;
        imgHomeLeaveIcon.SetBinding(Image.ToolTipProperty, imgHomeLeaveIconToolTipBinding);

        imgHomeLeaveIcon.MaxHeight = "16";
        imgHomeLeaveIcon.MaxWidth = "16";

        let imgHomeLeaveIconTagBinding = new Binding(dataContext, "HomeLeaveIcon");
        imgHomeLeaveIconTagBinding.Mode = BindingMode.OneTime;
        imgHomeLeaveIcon.SetBinding(Image.TagProperty, imgHomeLeaveIconTagBinding);

        let imgHomeLeaveIconSourceBinding = new Binding(dataContext, "HomeLeaveIcon.UriString");
        imgHomeLeaveIconSourceBinding.Mode = BindingMode.OneTime;
        let imgHomeLeaveIconConverterPipe = new ImageURIBitMapPipe();
        imgHomeLeaveIconSourceBinding.Converter = imgHomeLeaveIconConverterPipe;
        imgHomeLeaveIcon.SetBinding(Image.SourceProperty, imgHomeLeaveIconSourceBinding);
        if (_.get(imgHomeLeaveIcon, 'Source')) {
            SPBorder3.Child = imgHomeLeaveIcon;
        }
        StackPanel1.Children.Add(SPBorder1);
        StackPanel1.Children.Add(SPBorder2);
        StackPanel1.Children.Add(SPBorder3);

        grid1.Children.Add(StackPanel1);
        grid1.SetGridColumn(StackPanel1, 2);

        let Border2 = new Border();
        Border2.Margin = "1";
        Border2.VerticalAlignment = "Center";
        Border2.Width = "Auto";
        Border2.noDefaultStyle = true;
        Border2.Background = "Transparent";
        Border2.BorderThickness = "0";
        Border2.HorizontalAlignment = "Left";
        //Border2.Grid.Row = "1";
        // let Border2ToolTipBinding = new Binding(dataContext, "MultiIcon.Tooltip");
        // Border2.SetBinding(Border.ToolTipProperty, Border2ToolTipBinding);

        let imgMultiIcon = new Image();
        imgMultiIcon.Name = "imgMultiIcon";
        imgMultiIcon.Cursor = "Hand";
        // imgMultiIcon.Grid.Row = "1";//do
        imgMultiIcon.Height = "16";
        imgMultiIcon.HorizontalAlignment = "Left";

        if(dataContext.IsChartTodayMultiSlotLastColumn){
            imgMultiIcon.TooltipPosition = "left";
          }
        //Binding
        let imgMultiIconToolTipBinding = new Binding(dataContext, "MultiIcon.Tooltip");
        imgMultiIconToolTipBinding.Mode = BindingMode.OneTime;
        imgMultiIcon.SetBinding(Image.ToolTipProperty, imgMultiIconToolTipBinding);

        let imgMultiIconIsHitTestVisibleBinding = new Binding(dataContext, "MultiIcon.EnableOnHotSpotClick");
        imgMultiIconIsHitTestVisibleBinding.Mode = BindingMode.OneTime;
        imgMultiIcon.SetBinding(Image.IsHitTestVisibleProperty, imgMultiIconIsHitTestVisibleBinding);

        let imgMultiIconTagBinding = new Binding(dataContext, "MultiIcon");
        imgMultiIconTagBinding.Mode = BindingMode.OneTime;
        imgMultiIcon.SetBinding(Image.TagProperty, imgMultiIconTagBinding);

        let imgMultiIconSourceBinding = new Binding(dataContext, "MultiIcon.UriString");
        imgMultiIconSourceBinding.Mode = BindingMode.OneTime;
        let imgMultiIconConverterPipe = new ImageURIBitMapPipe();
        imgMultiIconSourceBinding.Converter = imgMultiIconConverterPipe;
        imgMultiIcon.SetBinding(Image.SourceProperty, imgMultiIconSourceBinding);

        if (_.get(imgMultiIcon, 'Source')) {
            Border2.Child = imgMultiIcon;
        }

        let grid2 = new Grid();
        grid2.HorizontalAlignment = 'Right';
        grid2.VerticalAlignment = 'Stretch';
        grid2.style['justify-content'] = `flex-end`;
        // grid2.style['grid-gap'] = `5`;
        let grd2rowDef1: RowDefinition = new RowDefinition();
        let grd2rowDef2: RowDefinition = new RowDefinition();
        let grd2colDef1: ColumnDefinition = new ColumnDefinition();
        let grd2colDef2: ColumnDefinition = new ColumnDefinition();
        // grd2colDef1.Width=''
        // grd2colDef2.Width=''
        grid2.RowDefinitions.Add(grd2rowDef1);
        grid2.RowDefinitions.Add(grd2rowDef2);
        grid2.ColumnDefinitions.Add(grd2colDef1);
        grid2.ColumnDefinitions.Add(grd2colDef2);


        let grd2StackPanel1 = new StackPanel();
        grd2StackPanel1.Margin = "1";
        grd2StackPanel1.Orientation = "Horizontal";
        // grd2StackPanel1.Grid.Column = "1";
        // grd2StackPanel1.Grid.Row = "1";
        grd2StackPanel1.HorizontalAlignment = "Right";

        let grd2SP1TextBlock1 = new TextBlock();
        grd2SP1TextBlock1.TextWrapping = "Wrap";
        grd2SP1TextBlock1.VerticalAlignment = "Center";
        grd2SP1TextBlock1.Margin='1';
        if (_.get(dataContext, 'AdminSummary') && dataContext.AdminSummary.Length >= 1 && _.get(dataContext, 'AdminSummary[0]')) {
            let grd2SP1TextBlock1TextBinding = new Binding(dataContext, "AdminSummary[0].StringData");
            grd2SP1TextBlock1TextBinding.Mode = BindingMode.OneTime;
            grd2SP1TextBlock1.SetBinding(TextBlock.TextProperty, grd2SP1TextBlock1TextBinding);
        }
        let grd2SP1Border1 = new Border();
        grd2SP1Border1.noDefaultStyle = true;
        grd2SP1Border1.Background = "Transparent";
        grd2SP1Border1.BorderThickness = "0";
        // if (_.get(dataContext, 'AdminSummary') && dataContext.AdminSummary.Length >= 1 && _.get(dataContext, 'AdminSummary[0]')) {
        //     let grd2SP1Border1ToolTipBinding = new Binding(dataContext, "AdminSummary[0].Tooltip");
        //     grd2SP1Border1.SetBinding(Border.ToolTipProperty, grd2SP1Border1ToolTipBinding);
        // }
        let imgTodayAsRequired1 = new Image();
        imgTodayAsRequired1.Name = "imgTodayAsRequired1";
        imgTodayAsRequired1.Cursor = "Hand";
        imgTodayAsRequired1.Height = "16";
        imgTodayAsRequired1.Width = "16";

        if(dataContext.IsChartTodayMultiSlotLastColumn){
            imgTodayAsRequired1.TooltipPosition = "left";
          }
        //Binding
        if (_.get(dataContext, 'AdminSummary') && dataContext.AdminSummary.Length >= 1 && _.get(dataContext, 'AdminSummary[0]')) {
            let imgTodayAsRequired1IsHitTestVisibleBinding = new Binding(dataContext, "AdminSummary[0].EnableOnHotSpotClick");
            imgTodayAsRequired1IsHitTestVisibleBinding.Mode = BindingMode.OneTime;
            imgTodayAsRequired1.SetBinding(Image.IsHitTestVisibleProperty, imgTodayAsRequired1IsHitTestVisibleBinding);

            let imgTodayAsRequired1ToolTipBinding = new Binding(dataContext, "AdminSummary[0].Tooltip");
            imgTodayAsRequired1ToolTipBinding.Mode = BindingMode.OneTime;
            imgTodayAsRequired1.SetBinding(Image.ToolTipProperty, imgTodayAsRequired1ToolTipBinding);

            let imgTodayAsRequired1TagBinding = new Binding(dataContext, "AdminSummary[0]");
            imgTodayAsRequired1TagBinding.Mode = BindingMode.OneTime;
            imgTodayAsRequired1.SetBinding(Image.TagProperty, imgTodayAsRequired1TagBinding);

            let imgTodayAsRequired1SourceBinding = new Binding(dataContext, "AdminSummary[0].UriString");
            imgTodayAsRequired1SourceBinding.Mode = BindingMode.OneTime;
            let imgTodayAsRequired1ConverterPipe = new ImageURIBitMapPipe();
            imgTodayAsRequired1SourceBinding.Converter = imgTodayAsRequired1ConverterPipe;
            imgTodayAsRequired1.SetBinding(Image.SourceProperty, imgTodayAsRequired1SourceBinding);

        }
        if (_.get(imgTodayAsRequired1, 'Source')) {
            grd2SP1Border1.Child = imgTodayAsRequired1;
        }
        grd2StackPanel1.Children.Add(grd2SP1TextBlock1);
        grd2StackPanel1.Children.Add(grd2SP1Border1);

        let grd2StackPanel2 = new StackPanel();
        grd2StackPanel2.Margin = "1";
        grd2StackPanel2.Orientation = "Horizontal";
        // grd2StackPanel2.Grid.Column = "0";
        // grd2StackPanel2.Grid.Row = "1";
        grd2StackPanel2.HorizontalAlignment = "Left";

        let grd2SP2TextBlock1 = new TextBlock();
        grd2SP2TextBlock1.VerticalAlignment = "Center";
        grd2SP2TextBlock1.Margin='1';
        //Binding
        if (_.get(dataContext, 'AdminSummary') && dataContext.AdminSummary.Length >= 2 && _.get(dataContext, 'AdminSummary[1]')) {
            let grd2SP2TextBlock1TextBinding = new Binding(dataContext, "AdminSummary[1].StringData");
            grd2SP2TextBlock1TextBinding.Mode = BindingMode.OneTime;
            grd2SP2TextBlock1.SetBinding(TextBlock.TextProperty, grd2SP2TextBlock1TextBinding);
        }
        grd2SP2TextBlock1.TextWrapping = "Wrap";
        let grd2SP2Border1 = new Border();
        grd2SP2Border1.noDefaultStyle = true;
        grd2SP2Border1.Background = "Transparent";
        grd2SP2Border1.BorderThickness = "0";
        // if (_.get(dataContext, 'AdminSummary') && dataContext.AdminSummary.Length >= 2 && _.get(dataContext, 'AdminSummary[1]')) {
        //     let grd2SP2Border1ToolTipBinding = new Binding(dataContext, "AdminSummary[1].Tooltip");
        //     grd2SP2Border1.SetBinding(Border.ToolTipProperty, grd2SP2Border1ToolTipBinding);
        // }
        let imgTodayAsRequired2 = new Image();
        imgTodayAsRequired2.Name = "imgTodayAsRequired2";
        imgTodayAsRequired2.Cursor = "Hand";
        imgTodayAsRequired2.Height = "16";
        imgTodayAsRequired2.Width = "16";

        if(dataContext.IsChartTodayMultiSlotLastColumn){
            imgTodayAsRequired2.TooltipPosition = "left";
          }
        //Binding
        if (_.get(dataContext, 'AdminSummary') && dataContext.AdminSummary.Length >= 2 && _.get(dataContext, 'AdminSummary[1]')) {
            let imgTodayAsRequired2IsHitTestVisibleBinding = new Binding(dataContext, "AdminSummary[1].EnableOnHotSpotClick");
            imgTodayAsRequired2IsHitTestVisibleBinding.Mode = BindingMode.OneTime;
            imgTodayAsRequired2.SetBinding(Image.IsHitTestVisibleProperty, imgTodayAsRequired2IsHitTestVisibleBinding);

            let imgTodayAsRequired2ToolTipBinding = new Binding(dataContext, "AdminSummary[1].Tooltip");
            imgTodayAsRequired2ToolTipBinding.Mode = BindingMode.OneTime;
            imgTodayAsRequired2.SetBinding(Image.ToolTipProperty, imgTodayAsRequired2ToolTipBinding);

            let imgTodayAsRequired2TagBinding = new Binding(dataContext, "AdminSummary[1]");
            imgTodayAsRequired2TagBinding.Mode = BindingMode.OneTime;
            imgTodayAsRequired2.SetBinding(Image.TagProperty, imgTodayAsRequired2TagBinding);

            let imgTodayAsRequired2SourceBinding = new Binding(dataContext, "AdminSummary[1].UriString");
            imgTodayAsRequired2SourceBinding.Mode = BindingMode.OneTime;
            let imgTodayAsRequired2ConverterPipe = new ImageURIBitMapPipe();
            imgTodayAsRequired2SourceBinding.Converter = imgTodayAsRequired2ConverterPipe;
            imgTodayAsRequired2.SetBinding(Image.SourceProperty, imgTodayAsRequired2SourceBinding);
        }
        if (_.get(imgTodayAsRequired2, 'Source')) {
            grd2SP2Border1.Child = imgTodayAsRequired2;
        }
        grd2StackPanel2.Children.Add(grd2SP2TextBlock1);
        grd2StackPanel2.Children.Add(grd2SP2Border1);

        let grd2StackPanel3 = new StackPanel();
        grd2StackPanel3.Margin = "1";
        grd2StackPanel3.Orientation = "Horizontal";
        // grd2StackPanel3.Grid.Column = "1";
        // grd2StackPanel3.Grid.Row = "0";
        grd2StackPanel3.HorizontalAlignment = "Right";
        let grd2SP3TextBlock1 = new TextBlock();
        grd2SP3TextBlock1.VerticalAlignment = "Center";
        grd2SP3TextBlock1.Margin='1';
        //Binding
        if (_.get(dataContext, 'AdminSummary') && dataContext.AdminSummary.Length >= 3 && _.get(dataContext, 'AdminSummary[2]')) {
            let grd2SP3TextBlock1TextBinding = new Binding(dataContext, "AdminSummary[2].StringData");
            grd2SP3TextBlock1TextBinding.Mode = BindingMode.OneTime;
            grd2SP3TextBlock1.SetBinding(TextBlock.TextProperty, grd2SP3TextBlock1TextBinding);
        }
        grd2SP3TextBlock1.TextWrapping = "Wrap";
        let grd2SP3Border1 = new Border();
        grd2SP3Border1.noDefaultStyle = true;
        grd2SP3Border1.Background = "Transparent";
        grd2SP3Border1.BorderThickness = "0";
        // if (_.get(dataContext, 'AdminSummary') && dataContext.AdminSummary.Length >= 3 && _.get(dataContext, 'AdminSummary[2]')) {
        //     let grd2SP3Border1ToolTipBinding = new Binding(dataContext, "AdminSummary[2].Tooltip");
        //     grd2SP3Border1.SetBinding(Border.ToolTipProperty, grd2SP3Border1ToolTipBinding);
        // }
        let imgTodayAsRequired3 = new Image();
        imgTodayAsRequired3.Name = "imgTodayAsRequired3";
        imgTodayAsRequired3.Cursor = "Hand";
        imgTodayAsRequired3.Height = "16";
        imgTodayAsRequired3.Width = "16";

        if(dataContext.IsChartTodayMultiSlotLastColumn){
            imgTodayAsRequired3.TooltipPosition = "left";
          }
        //Binding
        if (_.get(dataContext, 'AdminSummary') && dataContext.AdminSummary.Length >= 3 && _.get(dataContext, 'AdminSummary[2]')) {
            let imgTodayAsRequired3IsHitTestVisibleBinding = new Binding(dataContext, "AdminSummary[2].EnableOnHotSpotClick");
            imgTodayAsRequired3IsHitTestVisibleBinding.Mode = BindingMode.OneTime;
            imgTodayAsRequired3.SetBinding(Image.IsHitTestVisibleProperty, imgTodayAsRequired3IsHitTestVisibleBinding);

            let imgTodayAsRequired3ToolTipBinding = new Binding(dataContext, "AdminSummary[2].Tooltip");
            imgTodayAsRequired3ToolTipBinding.Mode = BindingMode.OneTime;
            imgTodayAsRequired3.SetBinding(Image.ToolTipProperty, imgTodayAsRequired3ToolTipBinding);

            let imgTodayAsRequired3TagBinding = new Binding(dataContext, "AdminSummary[2]");
            imgTodayAsRequired3TagBinding.Mode = BindingMode.OneTime;
            imgTodayAsRequired3.SetBinding(Image.TagProperty, imgTodayAsRequired3TagBinding);

            let imgTodayAsRequired3SourceBinding = new Binding(dataContext, "AdminSummary[2].UriString");
            imgTodayAsRequired3SourceBinding.Mode = BindingMode.OneTime;
            let imgTodayAsRequired3ConverterPipe = new ImageURIBitMapPipe();
            imgTodayAsRequired3SourceBinding.Converter = imgTodayAsRequired3ConverterPipe;
            imgTodayAsRequired3.SetBinding(Image.SourceProperty, imgTodayAsRequired3SourceBinding);
        }
        if (_.get(imgTodayAsRequired3, 'Source')) {
            grd2SP3Border1.Child = imgTodayAsRequired3;
        }
        grd2StackPanel3.Children.Add(grd2SP3TextBlock1);
        grd2StackPanel3.Children.Add(grd2SP3Border1);

        let grd2StackPanel4 = new StackPanel();
        grd2StackPanel4.Margin = "1";
        grd2StackPanel4.Orientation = "Horizontal";
        // grd2StackPanel4.Grid.Column = "0";
        // grd2StackPanel4.Grid.Row = "0";
        grd2StackPanel4.HorizontalAlignment = "Left";
        let grd2SP4TextBlock1 = new TextBlock();
        grd2SP4TextBlock1.VerticalAlignment = "Center";
        grd2SP4TextBlock1.Margin='1';
        //Binding
        if (_.get(dataContext, 'AdminSummary') && dataContext.AdminSummary.Length >= 4 && _.get(dataContext, 'AdminSummary[3]')) {
            let grd2SP4TextBlock1TextBinding = new Binding(dataContext, "AdminSummary[3].StringData");
            grd2SP4TextBlock1TextBinding.Mode = BindingMode.OneTime;
            grd2SP4TextBlock1.SetBinding(TextBlock.TextProperty, grd2SP4TextBlock1TextBinding);
        }
        grd2SP4TextBlock1.TextWrapping = "Wrap";
        let grd2SP4Border1 = new Border();
        grd2SP4Border1.noDefaultStyle = true;
        grd2SP4Border1.Background = "Transparent";
        grd2SP4Border1.BorderThickness = "0";
        // if (_.get(dataContext, 'AdminSummary') && dataContext.AdminSummary.Length >= 4 && _.get(dataContext, 'AdminSummary[3]')) {
        //     let grd2SP4Border1ToolTipBinding = new Binding(dataContext, "AdminSummary[3].Tooltip");
        //     grd2SP4Border1.SetBinding(Border.ToolTipProperty, grd2SP4Border1ToolTipBinding);
        // }
        let imgTodayAsRequired4 = new Image();
        imgTodayAsRequired4.Name = "imgTodayAsRequired4";
        imgTodayAsRequired4.Cursor = "Hand";
        imgTodayAsRequired4.Height = "16";
        imgTodayAsRequired4.Width = "16";

        if(dataContext.IsChartTodayMultiSlotLastColumn){
            imgTodayAsRequired4.TooltipPosition = "left";
          }
        //Binding
        if (_.get(dataContext, 'AdminSummary') && dataContext.AdminSummary.Length >= 4 && _.get(dataContext, 'AdminSummary[3]')) {
            let imgTodayAsRequired4IsHitTestVisibleBinding = new Binding(dataContext, "AdminSummary[3].EnableOnHotSpotClick");
            imgTodayAsRequired4IsHitTestVisibleBinding.Mode = BindingMode.OneTime;
            imgTodayAsRequired4.SetBinding(Image.IsHitTestVisibleProperty, imgTodayAsRequired4IsHitTestVisibleBinding);

            let imgTodayAsRequired4ToolTipBinding = new Binding(dataContext, "AdminSummary[3].Tooltip");
            imgTodayAsRequired4ToolTipBinding.Mode = BindingMode.OneTime;
            imgTodayAsRequired4.SetBinding(Image.ToolTipProperty, imgTodayAsRequired4ToolTipBinding);

            let imgTodayAsRequired4TagBinding = new Binding(dataContext, "AdminSummary[3]");
            imgTodayAsRequired4TagBinding.Mode = BindingMode.OneTime;
            imgTodayAsRequired4.SetBinding(Image.TagProperty, imgTodayAsRequired4TagBinding);

            let imgTodayAsRequired4SourceBinding = new Binding(dataContext, "AdminSummary[3].UriString");
            imgTodayAsRequired4SourceBinding.Mode = BindingMode.OneTime;
            let imgTodayAsRequired4ConverterPipe = new ImageURIBitMapPipe();
            imgTodayAsRequired4SourceBinding.Converter = imgTodayAsRequired4ConverterPipe;
            imgTodayAsRequired4.SetBinding(Image.SourceProperty, imgTodayAsRequired4SourceBinding);
        }
        if (_.get(imgTodayAsRequired4, 'Source')) {
            grd2SP4Border1.Child = imgTodayAsRequired4;
        }

        grd2StackPanel4.Children.Add(grd2SP4TextBlock1);
        grd2StackPanel4.Children.Add(grd2SP4Border1);

        grid2.Children.Add(grd2StackPanel1);
        grid2.SetGridRow(grd2StackPanel1, 2);
        grid2.SetGridColumn(grd2StackPanel1, 2);

        grid2.Children.Add(grd2StackPanel2);
        grid2.SetGridRow(grd2StackPanel2, 2);
        grid2.SetGridColumn(grd2StackPanel2, 1);

        grid2.Children.Add(grd2StackPanel3);
        grid2.SetGridRow(grd2StackPanel3, 1);
        grid2.SetGridColumn(grd2StackPanel3, 2);

        grid2.Children.Add(grd2StackPanel4);
        grid2.SetGridRow(grd2StackPanel4, 1);
        grid2.SetGridColumn(grd2StackPanel4, 1);

        grid.Children.Add(tbLastGivenTime);//do
        grid.SetGridRow(tbLastGivenTime, 1);
        grid.SetGridColumn(tbLastGivenTime, 1);

        grid.Children.Add(grid1);
        grid.SetGridColumn(grid1, 2);
        let itemstyle3 = { 'display': `flex`, 'flex-direction': `row`, 'justify-content': `flex-end` };
        grid.SetColumnRowStyle(itemstyle3, 1, 2);

        grid.Children.Add(Border2);
        grid.SetGridRow(Border2, 2)//do
        let itemstyle1 = { 'display': `flex`, 'flex-direction': `column`, 'justify-content': `flex-end` };
        grid.SetColumnRowStyle(itemstyle1, 2, 1);

        grid.Children.Add(grid2);
        grid.SetGridRow(grid2, 2);
        grid.SetGridColumn(grid2, 2);
        let itemstyle2 = { 'display': `flex`, 'flex-direction': `column`, 'justify-content': `flex-end` };
        grid.SetColumnRowStyle(itemstyle2, 2, 2);
        Border1.Child = grid;
        todayMultiSlot.Content = Border1;
        //console.log(todayMultiSlot.Content);
        return todayMultiSlot.Content;

    }
    todayAsRequiredSlot(dataContext): any {
        let todayAsRequiredSlot = new DataTemplate();
        let Border1 = new Border();
        Border1.noDefaultStyle = true;
        Border1.Style = ControlStyles.BorderWidth;
        Border1.VerticalAlignment = "Stretch";
        Border1.HorizontalAlignment = "Stretch";
        Border1.Background = "Transparent";
        Border1.BorderBrush = "#7090A5";
        Border1.BorderThickness = new Thickness(1, 0, 1, 0);
        let Border1ToolTipBinding = new Binding(dataContext, "StatusToolTip");
        Border1ToolTipBinding.Mode = BindingMode.OneTime;
        Border1.SetBinding(Border.ToolTipProperty, Border1ToolTipBinding);

        let grid = new Grid();
        grid.VerticalAlignment = "Stretch";
        let colDef1: ColumnDefinition = new ColumnDefinition();
        let colDef2: ColumnDefinition = new ColumnDefinition();
        colDef2.Width = "Auto"
        let rowDef1: RowDefinition = new RowDefinition();
        let rowDef2: RowDefinition = new RowDefinition();
        let rowDef3: RowDefinition = new RowDefinition();
        grid.ColumnDefinitions.Add(colDef1);
        grid.ColumnDefinitions.Add(colDef2);
        grid.RowDefinitions.Add(rowDef1);
        grid.RowDefinitions.Add(rowDef2);
        grid.RowDefinitions.Add(rowDef3);

        let spTodayAsRequiredSlot0 = new Grid();
        spTodayAsRequiredSlot0.Name = "spTodayAsRequiredSlot0";
        spTodayAsRequiredSlot0.VerticalAlignment = "Top";
        spTodayAsRequiredSlot0.HorizontalAlignment = "Left";
        let spTodayAsRequiredSlot0colDef1: ColumnDefinition = new ColumnDefinition();
        let spTodayAsRequiredSlot0colDef2: ColumnDefinition = new ColumnDefinition();
        spTodayAsRequiredSlot0colDef1.Width = "Auto";
        spTodayAsRequiredSlot0colDef2.Width = "Auto";
        spTodayAsRequiredSlot0.ColumnDefinitions.Add(spTodayAsRequiredSlot0colDef1);
        spTodayAsRequiredSlot0.ColumnDefinitions.Add(spTodayAsRequiredSlot0colDef2);

        let tbTodayAsRequired = new TextBlock();
        tbTodayAsRequired.Margin = "1";
        tbTodayAsRequired.Name = "tbTodayAsRequired";
        tbTodayAsRequired.TextWrapping = "Wrap";
        tbTodayAsRequired.HorizontalAlignment = "Left";
        //Binding //Do
        let tbTodayAsRequiredTextBinding = new Binding(dataContext, "AsRequired");
        let tbTodayAsRequiredConverterPipe = new StringTextPipe();
        tbTodayAsRequiredTextBinding.Converter = tbTodayAsRequiredConverterPipe;
        tbTodayAsRequiredTextBinding.Mode = BindingMode.OneTime;
        tbTodayAsRequired.SetBinding(TextBlock.TextProperty, tbTodayAsRequiredTextBinding);

        let spTodayAsRequiredSlot0Border1 = new Border();
        spTodayAsRequiredSlot0Border1.Margin = "1";
        // spTodayAsRequiredSlot0Border1.Grid.Column = "1";
        spTodayAsRequiredSlot0Border1.Width = "Auto";
        spTodayAsRequiredSlot0Border1.HorizontalAlignment = "Left";
        spTodayAsRequiredSlot0Border1.noDefaultStyle = true;
        spTodayAsRequiredSlot0Border1.Background = "Transparent";
        spTodayAsRequiredSlot0Border1.BorderThickness = "0";
        spTodayAsRequiredSlot0Border1.noflexStyle = true;
        spTodayAsRequiredSlot0Border1.VerticalAlignment = "Top";
        // let spTodayAsRequiredSlot0Border1ToolTipBinding = new Binding(dataContext, "AsRequired.Tooltip");
        // spTodayAsRequiredSlot0Border1.SetBinding(Border.ToolTipProperty, spTodayAsRequiredSlot0Border1ToolTipBinding);

        let imgTodayAsRequired = new Image();
        imgTodayAsRequired.Name = "imgTodayAsRequired";
        imgTodayAsRequired.Cursor = "Hand";

        if(dataContext.IsChartTodayAsRequiredSlotLastColumn){
            imgTodayAsRequired.TooltipPosition = "left";
          }
        //Binding
        let imgTodayAsRequiredIsHitTestVisibleBinding = new Binding(dataContext, "AsRequired.EnableOnHotSpotClick");
        imgTodayAsRequiredIsHitTestVisibleBinding.Mode = BindingMode.OneTime;
        imgTodayAsRequired.SetBinding(Image.IsHitTestVisibleProperty, imgTodayAsRequiredIsHitTestVisibleBinding);
        let imgTodayAsRequiredToolTipBinding = new Binding(dataContext, "AsRequired.Tooltip");
        imgTodayAsRequiredToolTipBinding.Mode = BindingMode.OneTime;
        imgTodayAsRequired.SetBinding(Image.ToolTipProperty, imgTodayAsRequiredToolTipBinding);
        imgTodayAsRequired.Height = "16";
        imgTodayAsRequired.Width = "16";
        let imgTodayAsRequiredTagBinding = new Binding(dataContext, "AsRequired");
        imgTodayAsRequiredTagBinding.Mode = BindingMode.OneTime;
        imgTodayAsRequired.SetBinding(Image.TagProperty, imgTodayAsRequiredTagBinding);
        let imgTodayAsRequiredSourceBinding = new Binding(dataContext, "AsRequired.UriString");
        imgTodayAsRequiredSourceBinding.Mode = BindingMode.OneTime;
        let imgTodayAsRequiredConverterPipe = new ImageURIBitMapPipe();
        imgTodayAsRequiredSourceBinding.Converter = imgTodayAsRequiredConverterPipe;
        imgTodayAsRequired.SetBinding(Image.SourceProperty, imgTodayAsRequiredSourceBinding);
        if (_.get(imgTodayAsRequired, 'Source'))
            spTodayAsRequiredSlot0Border1.Child = imgTodayAsRequired;
        spTodayAsRequiredSlot0.Children.Add(tbTodayAsRequired);
        spTodayAsRequiredSlot0.SetGridRow(tbTodayAsRequired, 1);
        spTodayAsRequiredSlot0.SetGridColumn(tbTodayAsRequired, 1);
        spTodayAsRequiredSlot0.Children.Add(spTodayAsRequiredSlot0Border1);
        spTodayAsRequiredSlot0.SetGridColumn(spTodayAsRequiredSlot0Border1, 2);
        let StackPanel1 = new StackPanel();
        StackPanel1.Orientation = "Horizontal";
        StackPanel1.HorizontalAlignment = "Right";
        //StackPanel1.Grid.Column = "2";
        let SPBorder1 = new Border();
        SPBorder1.VerticalAlignment = "Top";
        SPBorder1.Margin = "1";
        SPBorder1.Width = "Auto";
        SPBorder1.noDefaultStyle = true;
        SPBorder1.Background = "Transparent";
        SPBorder1.BorderThickness = "0";

        // let SPBorder1ToolTipBinding = new Binding(dataContext, "ConflictIcon.Tooltip");
        // SPBorder1.SetBinding(Border.ToolTipProperty, SPBorder1ToolTipBinding);

        let imgConflictIcon = new Image();
        imgConflictIcon.Name = "imgConflictIcon";
        imgConflictIcon.Cursor = "Hand";
        if(dataContext.IsChartTodayAsRequiredSlotLastColumn){
            imgConflictIcon.TooltipPosition = "left";
          }
        //Binding
        let imgConflictIconIsHitTestVisibleBinding = new Binding(dataContext, "ConflictIcon.EnableOnHotSpotClick");
        imgConflictIconIsHitTestVisibleBinding.Mode = BindingMode.OneTime;
        imgConflictIcon.SetBinding(Image.IsHitTestVisibleProperty, imgConflictIconIsHitTestVisibleBinding);
        let imgConflictIconToolTipBinding = new Binding(dataContext, "ConflictIcon.Tooltip");
        imgConflictIconToolTipBinding.Mode = BindingMode.OneTime;
        imgConflictIcon.SetBinding(Image.ToolTipProperty, imgConflictIconToolTipBinding);
        imgConflictIcon.MaxHeight = "16";
        imgConflictIcon.MaxWidth = "16";
        let imgConflictIconTagBinding = new Binding(dataContext, "ConflictIcon");
        imgConflictIconTagBinding.Mode = BindingMode.OneTime;
        imgConflictIcon.SetBinding(Image.TagProperty, imgConflictIconTagBinding);
        let imgConflictIconSourceBinding = new Binding(dataContext, "ConflictIcon.UriString");
        imgConflictIconSourceBinding.Mode = BindingMode.OneTime;
        let imgConflictIconConverterPipe = new ImageURIBitMapPipe();
        imgConflictIconSourceBinding.Converter = imgConflictIconConverterPipe;
        imgConflictIcon.SetBinding(Image.SourceProperty, imgConflictIconSourceBinding);
        if (_.get(imgConflictIcon, 'Source')) {
            SPBorder1.Child = imgConflictIcon;
        }
        StackPanel1.Children.Add(SPBorder1);
        let SPBorder2 = new Border();
        SPBorder2.VerticalAlignment = "Top";
        SPBorder2.Margin = "1";
        SPBorder2.Width = "Auto";
        SPBorder2.noDefaultStyle = true;
        SPBorder2.Background = "Transparent";
        SPBorder2.BorderThickness = "0";
        // let SPBorder2ToolTipBinding = new Binding(dataContext, "CumulativeIcon.Tooltip");
        // SPBorder2.SetBinding(Border.ToolTipProperty, SPBorder2ToolTipBinding);

        let imgCumulativeIcon = new Image();
        imgCumulativeIcon.Name = "imgCumulativeIcon";
        imgCumulativeIcon.Cursor = "Hand";

        if(dataContext.IsChartTodayAsRequiredSlotLastColumn){
            imgCumulativeIcon.TooltipPosition = "left";
          }
        //Binding
        let imgCumulativeIconIsHitTestVisibleBinding = new Binding(dataContext, "CumulativeIcon.EnableOnHotSpotClick");
        imgCumulativeIconIsHitTestVisibleBinding.Mode = BindingMode.OneTime;
        imgCumulativeIcon.SetBinding(Image.IsHitTestVisibleProperty, imgCumulativeIconIsHitTestVisibleBinding);
        let imgCumulativeIconToolTipBinding = new Binding(dataContext, "CumulativeIcon.Tooltip");
        imgCumulativeIconToolTipBinding.Mode = BindingMode.OneTime;
        imgCumulativeIcon.SetBinding(Image.ToolTipProperty, imgCumulativeIconToolTipBinding);
        imgCumulativeIcon.MaxHeight = "16";
        imgCumulativeIcon.MaxWidth = "16";
        let imgCumulativeIconTagBinding = new Binding(dataContext, "CumulativeIcon");
        imgCumulativeIconTagBinding.Mode = BindingMode.OneTime;
        imgCumulativeIcon.SetBinding(Image.TagProperty, imgCumulativeIconTagBinding);
        let imgCumulativeIconSourceBinding = new Binding(dataContext, "CumulativeIcon.UriString");
        imgCumulativeIconSourceBinding.Mode = BindingMode.OneTime;
        let imgCumulativeIconConverterPipe = new ImageURIBitMapPipe();
        imgCumulativeIconSourceBinding.Converter = imgCumulativeIconConverterPipe;
        imgCumulativeIcon.SetBinding(Image.SourceProperty, imgCumulativeIconSourceBinding);
        if (_.get(imgCumulativeIcon, 'Source')) {
            SPBorder2.Child = imgCumulativeIcon;
        }
        StackPanel1.Children.Add(SPBorder2);
        let SPBorder3 = new Border();
        SPBorder3.VerticalAlignment = "Top";
        SPBorder3.Margin = "1";
        SPBorder3.Width = "Auto";
        SPBorder3.noDefaultStyle = true;
        SPBorder3.Background = "Transparent";
        SPBorder3.BorderThickness = "0";
        // let SPBorder3ToolTipBinding = new Binding(dataContext, "HomeLeaveIcon.Tooltip");
        // SPBorder3.SetBinding(Border.ToolTipProperty, SPBorder3ToolTipBinding);
        let imgHomeLeaveIcon = new Image();
        imgHomeLeaveIcon.Name = "imgHomeLeaveIcon";
        imgHomeLeaveIcon.Cursor = "Hand";

        if(dataContext.IsChartTodayAsRequiredSlotLastColumn){
            imgHomeLeaveIcon.TooltipPosition = "left";
          }
        //Binding
        let imgHomeLeaveIconIsHitTestVisibleBinding = new Binding(dataContext, "HomeLeaveIcon.EnableOnHotSpotClick");
        imgHomeLeaveIconIsHitTestVisibleBinding.Mode = BindingMode.OneTime;
        imgHomeLeaveIcon.SetBinding(Image.IsHitTestVisibleProperty, imgHomeLeaveIconIsHitTestVisibleBinding);
        let imgHomeLeaveIconToolTipBinding = new Binding(dataContext, "HomeLeaveIcon.Tooltip");
        imgHomeLeaveIconToolTipBinding.Mode = BindingMode.OneTime;
        imgHomeLeaveIcon.SetBinding(Image.ToolTipProperty, imgHomeLeaveIconToolTipBinding);
        imgHomeLeaveIcon.MaxHeight = "16";
        imgHomeLeaveIcon.MaxWidth = "16";
        let imgHomeLeaveIconTagBinding = new Binding(dataContext, "HomeLeaveIcon");
        imgHomeLeaveIconTagBinding.Mode = BindingMode.OneTime;
        imgHomeLeaveIcon.SetBinding(Image.TagProperty, imgHomeLeaveIconTagBinding);
        let imgHomeLeaveIconSourceBinding = new Binding(dataContext, "HomeLeaveIcon.UriString");
        imgHomeLeaveIconSourceBinding.Mode = BindingMode.OneTime;
        let imgHomeLeaveIconConverterPipe = new ImageURIBitMapPipe();
        imgHomeLeaveIconSourceBinding.Converter = imgHomeLeaveIconConverterPipe;
        imgHomeLeaveIcon.SetBinding(Image.SourceProperty, imgHomeLeaveIconSourceBinding);
        if (_.get(imgHomeLeaveIcon, 'Source')) {
            SPBorder3.Child = imgHomeLeaveIcon;
        }
        StackPanel1.Children.Add(SPBorder3);
        let tbLastGivenTime = new TextBlock();
        tbLastGivenTime.Margin = "1";
        tbLastGivenTime.Name = "tbLastGivenTime";
        // tbLastGivenTime.Grid.ColumnSpan = "2";
        // tbLastGivenTime.Grid.Row = "1";
        let tbLastGivenTimeTextBinding = new Binding(dataContext, "LastGivenTime");
        tbLastGivenTimeTextBinding.Mode = BindingMode.OneTime;
        tbLastGivenTime.SetBinding(TextBlock.TextProperty, tbLastGivenTimeTextBinding);
        let tbLastGivenTimeFontWeightBinding = new Binding(dataContext, "FontWeightTime");
        tbLastGivenTimeFontWeightBinding.Mode = BindingMode.OneTime;
        tbLastGivenTime.SetBinding(TextBlock.FontWeightProperty, tbLastGivenTimeFontWeightBinding);
        tbLastGivenTime.TextWrapping = "Wrap";
        //tbLastGivenTime.VerticalAlignment = "Center";
        let Grid1 = new Grid();
        // Grid1.Grid.Row = "2";
        // Grid1.Grid.ColumnSpan = "2";
        Grid1.HorizontalAlignment = "Right";
        Grid1.VerticalAlignment = "Bottom";
        let Grid1colDef1: ColumnDefinition = new ColumnDefinition();
        let Grid1colDef2: ColumnDefinition = new ColumnDefinition();
        let Grid1colDef3: ColumnDefinition = new ColumnDefinition();
        let Grid1colDef4: ColumnDefinition = new ColumnDefinition();
        Grid1.ColumnDefinitions.Add(Grid1colDef1);
        Grid1.ColumnDefinitions.Add(Grid1colDef2);
        Grid1.ColumnDefinitions.Add(Grid1colDef3);
        Grid1.ColumnDefinitions.Add(Grid1colDef4);
        let Grid1StackPanel1 = new StackPanel();
        Grid1StackPanel1.Margin = "1";
        Grid1StackPanel1.Orientation = "Horizontal";
        //Grid1StackPanel1.grid.Column = "3";
        Grid1StackPanel1.HorizontalAlignment = "Right";
        let Grd1sp1TextBlock1 = new TextBlock();
        if (_.get(dataContext, 'AdminSummary') && dataContext.AdminSummary.Length >= 1 && _.get(dataContext, 'AdminSummary[0]')) {
            let Grd1sp1TextBlock1TextBinding = new Binding(dataContext, "AdminSummary[0].StringData");
            Grd1sp1TextBlock1TextBinding.Mode = BindingMode.OneTime;
            Grd1sp1TextBlock1.SetBinding(TextBlock.TextProperty, Grd1sp1TextBlock1TextBinding);
        }
        Grd1sp1TextBlock1.TextWrapping = "Wrap";
        let Grd1sp1Border1 = new Border();
        Grd1sp1Border1.noDefaultStyle = true;
        Grd1sp1Border1.Background = "Transparent";
        Grd1sp1Border1.BorderThickness = "0";
        // if (_.get(dataContext, 'AdminSummary') && dataContext.AdminSummary.Length >= 1 && _.get(dataContext, 'AdminSummary[0]')) {
        //     let Grd1sp1Border1ToolTipBinding = new Binding(dataContext, "AdminSummary[0].Tooltip");
        //     Grd1sp1Border1.SetBinding(Border.ToolTipProperty, Grd1sp1Border1ToolTipBinding);
        // }
        let imgTodayAsRequired1 = new Image();
        imgTodayAsRequired1.Name = "imgTodayAsRequired1";
        imgTodayAsRequired1.Cursor = "Hand";
        imgTodayAsRequired1.Height = "16";
        imgTodayAsRequired1.Width = "16";

        if(dataContext.IsChartTodayAsRequiredSlotLastColumn){
            imgTodayAsRequired1.TooltipPosition = "left";
          }
        //Binding
        if (_.get(dataContext, 'AdminSummary') && dataContext.AdminSummary.Length >= 1 && _.get(dataContext, 'AdminSummary[0]')) {
            let imgTodayAsRequired1IsHitTestVisibleBinding = new Binding(dataContext, "AdminSummary[0].EnableOnHotSpotClick");
            imgTodayAsRequired1IsHitTestVisibleBinding.Mode = BindingMode.OneTime;
            imgTodayAsRequired1.SetBinding(Image.IsHitTestVisibleProperty, imgTodayAsRequired1IsHitTestVisibleBinding);
            let imgTodayAsRequired1ToolTipBinding = new Binding(dataContext, "AdminSummary[0].Tooltip");
            imgTodayAsRequired1ToolTipBinding.Mode = BindingMode.OneTime;
            imgTodayAsRequired1.SetBinding(Image.ToolTipProperty, imgTodayAsRequired1ToolTipBinding);
            let imgTodayAsRequired1TagBinding = new Binding(dataContext, "AdminSummary[0]");
            imgTodayAsRequired1TagBinding.Mode = BindingMode.OneTime;
            imgTodayAsRequired1.SetBinding(Image.TagProperty, imgTodayAsRequired1TagBinding);
            let imgTodayAsRequired1SourceBinding = new Binding(dataContext, "AdminSummary[0].UriString");
            imgTodayAsRequired1SourceBinding.Mode = BindingMode.OneTime;
            let imgTodayAsRequired1ConverterPipe = new ImageURIBitMapPipe();
            imgTodayAsRequired1SourceBinding.Converter = imgTodayAsRequired1ConverterPipe;
            imgTodayAsRequired1.SetBinding(Image.SourceProperty, imgTodayAsRequired1SourceBinding);
        }
        if (_.get(imgTodayAsRequired1, 'Source')) {
            Grd1sp1Border1.Child = imgTodayAsRequired1;
        }
        Grid1StackPanel1.Children.Add(Grd1sp1TextBlock1);
        Grid1StackPanel1.Children.Add(Grd1sp1Border1);
        let Grid1StackPanel2 = new StackPanel();
        Grid1StackPanel2.Margin = "1";
        Grid1StackPanel2.Orientation = "Horizontal";
        // Grid1StackPanel2.grid.Column = "2";
        Grid1StackPanel2.HorizontalAlignment = "Right";
        let Grd1sp2TextBlock1 = new TextBlock();
        if (_.get(dataContext, 'AdminSummary') && dataContext.AdminSummary.Length >= 2 && _.get(dataContext, 'AdminSummary[1]')) {
            let Grd1sp2TextBlock1TextBinding = new Binding(dataContext, "AdminSummary[1].StringData");
            Grd1sp2TextBlock1TextBinding.Mode = BindingMode.OneTime;
            Grd1sp2TextBlock1.SetBinding(TextBlock.TextProperty, Grd1sp2TextBlock1TextBinding);
        }
        Grd1sp2TextBlock1.TextWrapping = "Wrap";
        let Grd1sp2Border1 = new Border();
        Grd1sp2Border1.noDefaultStyle = true;
        Grd1sp2Border1.Background = "Transparent";
        Grd1sp2Border1.BorderThickness = "0";
        // if (_.get(dataContext, 'AdminSummary') && dataContext.AdminSummary.Length >= 2 && _.get(dataContext, 'AdminSummary[1]')) {
        //     let Grd1sp2Border1ToolTipBinding = new Binding(dataContext, "AdminSummary[1].Tooltip");
        //     Grd1sp2Border1.SetBinding(Border.ToolTipProperty, Grd1sp2Border1ToolTipBinding);
        // }
        let imgTodayAsRequired2 = new Image();
        imgTodayAsRequired2.Name = "imgTodayAsRequired2";
        imgTodayAsRequired2.Cursor = "Hand";
        imgTodayAsRequired2.Height = "16";
        imgTodayAsRequired2.Width = "16";

        if(dataContext.IsChartTodayAsRequiredSlotLastColumn){
            imgTodayAsRequired2.TooltipPosition = "left";
          }
        if (_.get(dataContext, 'AdminSummary') && dataContext.AdminSummary.Length >= 2 && _.get(dataContext, 'AdminSummary[1]')) {
            let imgTodayAsRequired2IsHitTestVisibleBinding = new Binding(dataContext, "AdminSummary[1].EnableOnHotSpotClick");
            imgTodayAsRequired2IsHitTestVisibleBinding.Mode = BindingMode.OneTime;
            imgTodayAsRequired2.SetBinding(Image.IsHitTestVisibleProperty, imgTodayAsRequired2IsHitTestVisibleBinding);
            let imgTodayAsRequired2ToolTipBinding = new Binding(dataContext, "AdminSummary[1].Tooltip");
            imgTodayAsRequired2ToolTipBinding.Mode = BindingMode.OneTime;
            imgTodayAsRequired2.SetBinding(Image.ToolTipProperty, imgTodayAsRequired2ToolTipBinding);
            let imgTodayAsRequired2TagBinding = new Binding(dataContext, "AdminSummary[1]");
            imgTodayAsRequired2TagBinding.Mode = BindingMode.OneTime;
            imgTodayAsRequired2.SetBinding(Image.TagProperty, imgTodayAsRequired2TagBinding);
            let imgTodayAsRequired2SourceBinding = new Binding(dataContext, "AdminSummary[1].UriString");
            imgTodayAsRequired2SourceBinding.Mode = BindingMode.OneTime;
            let imgTodayAsRequired2ConverterPipe = new ImageURIBitMapPipe();
            imgTodayAsRequired2SourceBinding.Converter = imgTodayAsRequired2ConverterPipe;
            imgTodayAsRequired2.SetBinding(Image.SourceProperty, imgTodayAsRequired2SourceBinding);
        }
        if (_.get(imgTodayAsRequired2, 'Source')) {
            Grd1sp2Border1.Child = imgTodayAsRequired2;
        }
        Grid1StackPanel2.Children.Add(Grd1sp2TextBlock1);
        Grid1StackPanel2.Children.Add(Grd1sp2Border1);
        let Grid1StackPanel3 = new StackPanel();
        Grid1StackPanel3.Margin = "1";
        Grid1StackPanel3.Orientation = "Horizontal";
        //Grid1StackPanel3.grid.Column = "1";
        Grid1StackPanel3.HorizontalAlignment = "Right";
        let Grd1sp3TextBlock1 = new TextBlock();
        if (_.get(dataContext, 'AdminSummary') && dataContext.AdminSummary.Length >= 3 && _.get(dataContext, 'AdminSummary[2]')) {
            let Grd1sp3TextBlock1TextBinding = new Binding(dataContext, "AdminSummary[2].StringData");
            Grd1sp3TextBlock1TextBinding.Mode = BindingMode.OneTime;
            Grd1sp3TextBlock1.SetBinding(TextBlock.TextProperty, Grd1sp3TextBlock1TextBinding);
        }
        Grd1sp3TextBlock1.TextWrapping = "Wrap";
        let Grd1sp3Border1 = new Border();
        Grd1sp3Border1.noDefaultStyle = true;
        Grd1sp3Border1.Background = "Transparent";
        Grd1sp3Border1.BorderThickness = "0";
        // if (_.get(dataContext, 'AdminSummary') && dataContext.AdminSummary.Length >= 3 && _.get(dataContext, 'AdminSummary[2]')) {
        //     let Grd1sp3Border1ToolTipBinding = new Binding(dataContext, "AdminSummary[2].Tooltip");
        //     Grd1sp3Border1.SetBinding(Border.ToolTipProperty, Grd1sp3Border1ToolTipBinding);
        // }

        let imgTodayAsRequired3 = new Image();
        imgTodayAsRequired3.Name = "imgTodayAsRequired3";
        imgTodayAsRequired3.Cursor = "Hand";
        imgTodayAsRequired3.Height = "16";
        imgTodayAsRequired3.Width = "16";

        if(dataContext.IsChartTodayAsRequiredSlotLastColumn){
            imgTodayAsRequired3.TooltipPosition = "left";
          }
        if (_.get(dataContext, 'AdminSummary') && dataContext.AdminSummary.Length >= 3 && _.get(dataContext, 'AdminSummary[2]')) {
            let imgTodayAsRequired3IsHitTestVisibleBinding = new Binding(dataContext, "AdminSummary[2].EnableOnHotSpotClick");
            imgTodayAsRequired3IsHitTestVisibleBinding.Mode = BindingMode.OneTime;
            imgTodayAsRequired3.SetBinding(Image.IsHitTestVisibleProperty, imgTodayAsRequired3IsHitTestVisibleBinding);

            let imgTodayAsRequired3ToolTipBinding = new Binding(dataContext, "AdminSummary[2].Tooltip");
            imgTodayAsRequired3ToolTipBinding.Mode = BindingMode.OneTime;
            imgTodayAsRequired3.SetBinding(Image.ToolTipProperty, imgTodayAsRequired3ToolTipBinding);

            let imgTodayAsRequired3TagBinding = new Binding(dataContext, "AdminSummary[2]");
            imgTodayAsRequired3TagBinding.Mode = BindingMode.OneTime;
            imgTodayAsRequired3.SetBinding(Image.TagProperty, imgTodayAsRequired3TagBinding);

            let imgTodayAsRequired3SourceBinding = new Binding(dataContext, "AdminSummary[2].UriString");
            imgTodayAsRequired3SourceBinding.Mode = BindingMode.OneTime;
            let imgTodayAsRequired3ConverterPipe = new ImageURIBitMapPipe();
            imgTodayAsRequired3SourceBinding.Converter = imgTodayAsRequired3ConverterPipe;
            imgTodayAsRequired3.SetBinding(Image.SourceProperty, imgTodayAsRequired3SourceBinding);
        }
        if (_.get(imgTodayAsRequired3, 'Source')) {
            Grd1sp3Border1.Child = imgTodayAsRequired3;
        }
        Grid1StackPanel3.Children.Add(Grd1sp3TextBlock1);
        Grid1StackPanel3.Children.Add(Grd1sp3Border1);
        let Grid1StackPanel4 = new StackPanel();
        Grid1StackPanel4.Margin = "1";
        Grid1StackPanel4.Orientation = "Horizontal";
        // Grid1StackPanel4.grid.Column = "0";
        Grid1StackPanel4.HorizontalAlignment = "Right";

        let Grd1sp4TextBlock1 = new TextBlock();
        if (_.get(dataContext, 'AdminSummary') && dataContext.AdminSummary.Length >= 4 && _.get(dataContext, 'AdminSummary[3]')) {
            let Grd1sp4TextBlock1TextBinding = new Binding(dataContext, "AdminSummary[3].StringData");
            Grd1sp4TextBlock1TextBinding.Mode = BindingMode.OneTime;
            Grd1sp4TextBlock1.SetBinding(TextBlock.TextProperty, Grd1sp4TextBlock1TextBinding);
        }
        Grd1sp4TextBlock1.TextWrapping = "Wrap";
        let Grd1sp4Border1 = new Border();
        Grd1sp4Border1.noDefaultStyle = true;
        Grd1sp4Border1.Background = "Transparent";
        Grd1sp4Border1.BorderThickness = "0";
        // if (_.get(dataContext, 'AdminSummary') && dataContext.AdminSummary.Length >= 4 && _.get(dataContext, 'AdminSummary[3]')) {
        //     let Grd1sp4Border1ToolTipBinding = new Binding(dataContext, "AdminSummary[3].Tooltip");
        //     Grd1sp4Border1.SetBinding(Border.ToolTipProperty, Grd1sp4Border1ToolTipBinding);
        // }
        let imgTodayAsRequired4 = new Image();
        imgTodayAsRequired4.Name = "imgTodayAsRequired4";
        imgTodayAsRequired4.Cursor = "Hand";
        imgTodayAsRequired4.Height = "16";
        imgTodayAsRequired4.Width = "16";

        if(dataContext.IsChartTodayAsRequiredSlotLastColumn){
            imgTodayAsRequired4.TooltipPosition = "left";
          }
        if (_.get(dataContext, 'AdminSummary') && dataContext.AdminSummary.Length >= 4 && _.get(dataContext, 'AdminSummary[3]')) {
            let imgTodayAsRequired4IsHitTestVisibleBinding = new Binding(dataContext, "AdminSummary[3].EnableOnHotSpotClick");
            imgTodayAsRequired4IsHitTestVisibleBinding.Mode = BindingMode.OneTime;
            imgTodayAsRequired4.SetBinding(Image.IsHitTestVisibleProperty, imgTodayAsRequired4IsHitTestVisibleBinding);

            let imgTodayAsRequired4ToolTipBinding = new Binding(dataContext, "AdminSummary[3].Tooltip");
            imgTodayAsRequired4ToolTipBinding.Mode = BindingMode.OneTime;
            imgTodayAsRequired4.SetBinding(Image.ToolTipProperty, imgTodayAsRequired4ToolTipBinding);

            let imgTodayAsRequired4TagBinding = new Binding(dataContext, "AdminSummary[3]");
            imgTodayAsRequired4TagBinding.Mode = BindingMode.OneTime;
            imgTodayAsRequired4.SetBinding(Image.TagProperty, imgTodayAsRequired4TagBinding);

            let imgTodayAsRequired4SourceBinding = new Binding(dataContext, "AdminSummary[3].UriString");
            imgTodayAsRequired4SourceBinding.Mode = BindingMode.OneTime;
            let imgTodayAsRequired4ConverterPipe = new ImageURIBitMapPipe();
            imgTodayAsRequired4SourceBinding.Converter = imgTodayAsRequired4ConverterPipe;
            imgTodayAsRequired4.SetBinding(Image.SourceProperty, imgTodayAsRequired4SourceBinding);
        }
        if (_.get(imgTodayAsRequired4, 'Source')) {
            Grd1sp4Border1.Child = imgTodayAsRequired4;
        }
        Grid1StackPanel4.Children.Add(Grd1sp4TextBlock1);
        Grid1StackPanel4.Children.Add(Grd1sp4Border1);
        Grid1.Children.Add(Grid1StackPanel1);
        Grid1.SetGridColumn(Grid1StackPanel1, 4);
        Grid1.Children.Add(Grid1StackPanel2);
        Grid1.SetGridColumn(Grid1StackPanel2, 3);
        Grid1.Children.Add(Grid1StackPanel3);
        Grid1.SetGridColumn(Grid1StackPanel3, 2);
        Grid1.Children.Add(Grid1StackPanel4);
        Grid1.SetGridColumn(Grid1StackPanel4, 1);
        grid.Children.Add(spTodayAsRequiredSlot0);
        grid.SetGridRow(spTodayAsRequiredSlot0, 1);
        grid.SetGridColumn(spTodayAsRequiredSlot0, 1);
        grid.Children.Add(StackPanel1);
        grid.SetGridColumn(StackPanel1, 3);
        grid.Children.Add(tbLastGivenTime);
        grid.SetColumnSpan(tbLastGivenTime, 3);
        grid.SetGridRow(tbLastGivenTime, 2);
        let itemstyle1 = { 'display': `flex`, 'flex-direction': `column`, 'justify-content': `center` };
        grid.SetColumnRowStyle(itemstyle1, 2, 1);
        grid.Children.Add(Grid1);
        grid.SetGridRow(Grid1, 3);
        grid.SetGridColumn(Grid1, 3);
        let itemstyle2 = { 'display': `flex`, 'flex-direction': `column`, 'justify-content': `flex-end` };
        grid.SetColumnRowStyle(itemstyle2, 3, 3);

        Border1.Child = grid;
        todayAsRequiredSlot.Content = Border1;
        return todayAsRequiredSlot.Content;
    }

    asRequiredSlot(dataContext):any{
        let AsRequiredSlot = new DataTemplate();

        let Border1 = new Border();
        Border1.Style = ControlStyles.BorderWidth;
        Border1.BorderBrush = "#7090A5";
        Border1.BorderThickness = new Thickness(1, 0, 1, 0);
        let Border1ToolTipBinding = new Binding(dataContext, "StatusToolTip");
        Border1ToolTipBinding.Mode = BindingMode.OneTime;
        Border1.SetBinding(Border.ToolTipProperty, Border1ToolTipBinding);

        let grid = new Grid();
        grid.HorizontalAlignment = "Stretch";
        let colDef1: ColumnDefinition = new ColumnDefinition();
        let colDef2: ColumnDefinition = new ColumnDefinition();
        colDef2.Width = "Auto";
        let rowDef1: RowDefinition = new RowDefinition();
        let rowDef2: RowDefinition = new RowDefinition();
        grid.ColumnDefinitions.Add(colDef1);
        grid.ColumnDefinitions.Add(colDef2);
        grid.RowDefinitions.Add(rowDef1);
        grid.RowDefinitions.Add(rowDef2);


        let spAsRequiredSlot = new Grid();
        spAsRequiredSlot.Name = "spAsRequiredSlot";
        spAsRequiredSlot.HorizontalAlignment = "Left";
        spAsRequiredSlot.VerticalAlignment = "Top";
        let spAsRequiredSlotcolDef1: ColumnDefinition = new ColumnDefinition();
        let spAsRequiredSlotcolDef2: ColumnDefinition = new ColumnDefinition();
        spAsRequiredSlotcolDef2.Width = "Auto";
        spAsRequiredSlot.ColumnDefinitions.Add(spAsRequiredSlotcolDef1);
        spAsRequiredSlot.ColumnDefinitions.Add(spAsRequiredSlotcolDef2);


        let tbAsRequired = new TextBlock();
        tbAsRequired.Margin = "1";
        tbAsRequired.Name = "tbAsRequired";
        tbAsRequired.HorizontalAlignment = "Left";
        tbAsRequired.TextWrapping = "Wrap";

        let tbAsRequiredTextBinding = new Binding(dataContext, "AsRequired");
        tbAsRequiredTextBinding.Mode = BindingMode.OneTime;
        let tbAsRequiredConverterPipe = new StringTextPipe();
        tbAsRequiredTextBinding.Converter = tbAsRequiredConverterPipe;
        tbAsRequired.SetBinding(TextBlock.TextProperty, tbAsRequiredTextBinding);



        let spAsRequiredSlotBorder1 = new Border();
        spAsRequiredSlotBorder1.Margin = "1";
        // spAsRequiredSlotBorder1.Grid.Column = "1"
        spAsRequiredSlotBorder1.Width = "Auto";
        spAsRequiredSlotBorder1.noDefaultStyle = true;
        spAsRequiredSlotBorder1.Background = "Transparent";
        spAsRequiredSlotBorder1.BorderThickness = "0";
        spAsRequiredSlotBorder1.noflexStyle = true;
        spAsRequiredSlotBorder1.VerticalAlignment = "Top";
        // let spAsRequiredSlotBorder1ToolTipBinding = new Binding(dataContext, "AsRequired.Tooltip");
        // spAsRequiredSlotBorder1.SetBinding(Border.ToolTipProperty, spAsRequiredSlotBorder1ToolTipBinding);


        let imgAsRequired = new Image();
        imgAsRequired.Name = "imgAsRequired";
        imgAsRequired.Cursor = "Hand";
        imgAsRequired.Height = "16";
        imgAsRequired.Width = "16";
        if(dataContext.IsChartAsRequiredSlotLastColumn){
            imgAsRequired.TooltipPosition = "left";
          }

        let imgAsRequiredToolTipBinding = new Binding(dataContext, "AsRequired.Tooltip");
        imgAsRequiredToolTipBinding.Mode = BindingMode.OneTime;
        imgAsRequired.SetBinding(Image.ToolTipProperty, imgAsRequiredToolTipBinding);


        let imgAsRequiredIsHitTestVisibleBinding = new Binding(dataContext, "AsRequired.EnableOnHotSpotClick");
        imgAsRequiredIsHitTestVisibleBinding.Mode = BindingMode.OneTime;
        imgAsRequired.SetBinding(Image.IsHitTestVisibleProperty, imgAsRequiredIsHitTestVisibleBinding);


        let imgAsRequiredTagBinding = new Binding(dataContext, "AsRequired");
        imgAsRequiredTagBinding.Mode = BindingMode.OneTime;
        imgAsRequired.SetBinding(Image.TagProperty, imgAsRequiredTagBinding);

        let imgAsRequiredSourceBinding = new Binding(dataContext, "AsRequired.UriString");
        imgAsRequiredSourceBinding.Mode = BindingMode.OneTime;
        let imgAsRequiredConverterPipe = new ImageURIBitMapPipe();
        imgAsRequiredSourceBinding.Converter = imgAsRequiredConverterPipe;
        imgAsRequired.SetBinding(Image.SourceProperty, imgAsRequiredSourceBinding);
        if (_.get(imgAsRequired, 'Source'))
        spAsRequiredSlotBorder1.Child = imgAsRequired;
        if (_.get(tbAsRequired, 'Text') && _.get(tbAsRequired, 'Text') != '') {
        spAsRequiredSlot.Children.Add(tbAsRequired);
            spAsRequiredSlot.SetGridRow(tbAsRequired, 1);
            spAsRequiredSlot.SetGridColumn(tbAsRequired, 1);
        }
        if (_.get(spAsRequiredSlotBorder1, 'Child')) {
        spAsRequiredSlot.Children.Add(spAsRequiredSlotBorder1);
        spAsRequiredSlot.SetGridColumn(spAsRequiredSlotBorder1, 2);
        }

        let StackPanel1 = new StackPanel();
        StackPanel1.Orientation = "Horizontal";
        // StackPanel1.Grid.Column = "2";

        let SPBorder1 = new Border();
        SPBorder1.VerticalAlignment = "Top";
        SPBorder1.Margin = "1";
        SPBorder1.Width = "Auto";
        SPBorder1.noDefaultStyle = true;
        SPBorder1.Background = "Transparent";
        SPBorder1.BorderThickness = "0";

        // let SPBorder1ToolTipBinding = new Binding(dataContext, "ConflictIcon.Tooltip");
        // SPBorder1.SetBinding(Border.ToolTipProperty, SPBorder1ToolTipBinding);


        let imgConflictIcon = new Image();
        imgConflictIcon.Name = "imgConflictIcon";
        imgConflictIcon.Cursor = "Hand";
        if(dataContext.IsChartAsRequiredSlotLastColumn){
            imgConflictIcon.TooltipPosition = "left";
          }

        let imgConflictIconIsHitTestVisibleBinding = new Binding(dataContext, "ConflictIcon.EnableOnHotSpotClick");
        imgConflictIconIsHitTestVisibleBinding.Mode = BindingMode.OneTime;
        imgConflictIcon.SetBinding(Image.IsHitTestVisibleProperty, imgConflictIconIsHitTestVisibleBinding);


        let imgConflictIconToolTipBinding = new Binding(dataContext, "ConflictIcon.Tooltip");
        imgConflictIconToolTipBinding.Mode = BindingMode.OneTime;
        imgConflictIcon.SetBinding(Image.ToolTipProperty, imgConflictIconToolTipBinding);

        imgConflictIcon.MaxHeight = "16";
        imgConflictIcon.MaxWidth = "16";

        let imgConflictIconTagBinding = new Binding(dataContext, "ConflictIcon");
        imgConflictIconTagBinding.Mode = BindingMode.OneTime;
        imgConflictIcon.SetBinding(Image.TagProperty, imgConflictIconTagBinding);


        let imgConflictIconSourceBinding = new Binding(dataContext, "ConflictIcon.UriString");
        imgConflictIconSourceBinding.Mode = BindingMode.OneTime;
        let imgConflictIconConverterPipe = new ImageURIBitMapPipe();
        imgConflictIconSourceBinding.Converter = imgConflictIconConverterPipe;
        imgConflictIcon.SetBinding(Image.SourceProperty, imgConflictIconSourceBinding);
        if (_.get(imgConflictIcon, 'Source')) {
        SPBorder1.Child = imgConflictIcon;
        }
        if (_.get(SPBorder1, 'Child')) {
            StackPanel1.Children.Add(SPBorder1);
        }

        let SPBorder2 = new Border();
        SPBorder2.VerticalAlignment = "Top";
        SPBorder2.Margin = "1";
        SPBorder2.Width = "Auto";
        SPBorder2.noDefaultStyle = true;
        SPBorder2.Background = "Transparent";
        SPBorder2.BorderThickness = "0";

        // let SPBorder2ToolTipBinding = new Binding(dataContext, "CumulativeIcon.Tooltip");
        // SPBorder2.SetBinding(Border.ToolTipProperty, SPBorder2ToolTipBinding);

        let imgCumulativeIcon = new Image();
        imgCumulativeIcon.Name = "imgCumulativeIcon";
        imgCumulativeIcon.Cursor = "Hand";
        if(dataContext.IsChartAsRequiredSlotLastColumn){
            imgCumulativeIcon.TooltipPosition = "left";
          }

        let imgCumulativeIconIsHitTestVisibleBinding = new Binding(dataContext, "CumulativeIcon.EnableOnHotSpotClick");
        imgCumulativeIconIsHitTestVisibleBinding.Mode = BindingMode.OneTime;
        imgCumulativeIcon.SetBinding(Image.IsHitTestVisibleProperty, imgCumulativeIconIsHitTestVisibleBinding);


        let imgCumulativeIconToolTipBinding = new Binding(dataContext, "CumulativeIcon.Tooltip");
        imgCumulativeIconToolTipBinding.Mode = BindingMode.OneTime;
        imgCumulativeIcon.SetBinding(Image.ToolTipProperty, imgCumulativeIconToolTipBinding);

        imgCumulativeIcon.MaxHeight = "16";
        imgCumulativeIcon.MaxWidth = "16";

        let imgCumulativeIconTagBinding = new Binding(dataContext, "CumulativeIcon");
        imgCumulativeIconTagBinding.Mode = BindingMode.OneTime;
        imgCumulativeIcon.SetBinding(Image.TagProperty, imgCumulativeIconTagBinding);


        let imgCumulativeIconSourceBinding = new Binding(dataContext, "CumulativeIcon.UriString");
        imgCumulativeIconSourceBinding.Mode = BindingMode.OneTime;
        let imgCumulativeIconConverterPipe = new ImageURIBitMapPipe();
        imgCumulativeIconSourceBinding.Converter = imgCumulativeIconConverterPipe;
        imgCumulativeIcon.SetBinding(Image.SourceProperty, imgCumulativeIconSourceBinding);
        if (_.get(imgCumulativeIcon, 'Source')) {
        SPBorder2.Child = imgCumulativeIcon;
        }
        if (_.get(SPBorder2, 'Child')) {
            StackPanel1.Children.Add(SPBorder2);
        }

        let SPBorder3 = new Border();
        SPBorder3.VerticalAlignment = "Top";
        SPBorder3.Margin = "1";
        SPBorder3.Width = "Auto";
        SPBorder3.noDefaultStyle = true;
        SPBorder3.Background = "Transparent";
        SPBorder3.BorderThickness = "0";

        // let SPBorder3ToolTipBinding = new Binding(dataContext, "HomeLeaveIcon.Tooltip");
        // SPBorder3.SetBinding(Border.ToolTipProperty, SPBorder3ToolTipBinding);

        let imgHomeLeaveIcon = new Image();
        imgHomeLeaveIcon.Name = "imgHomeLeaveIcon";
        imgHomeLeaveIcon.Cursor = "Hand";
        if(dataContext.IsChartAsRequiredSlotLastColumn){
            imgHomeLeaveIcon.TooltipPosition = "left";
          }
        

        let imgHomeLeaveIconIsHitTestVisibleBinding = new Binding(dataContext, "HomeLeaveIcon.EnableOnHotSpotClick");
        imgHomeLeaveIconIsHitTestVisibleBinding.Mode = BindingMode.OneTime;
        imgHomeLeaveIcon.SetBinding(Image.IsHitTestVisibleProperty, imgHomeLeaveIconIsHitTestVisibleBinding);

        let imgHomeLeaveIconToolTipBinding = new Binding(dataContext, "HomeLeaveIcon.Tooltip");
        imgHomeLeaveIconToolTipBinding.Mode = BindingMode.OneTime;
        imgHomeLeaveIcon.SetBinding(Image.ToolTipProperty, imgHomeLeaveIconToolTipBinding);


        imgHomeLeaveIcon.MaxHeight = "16";
        imgHomeLeaveIcon.MaxWidth = "16";

        let imgHomeLeaveIconTagBinding = new Binding(dataContext, "HomeLeaveIcon");
        imgHomeLeaveIconTagBinding.Mode = BindingMode.OneTime;
        imgHomeLeaveIcon.SetBinding(Image.TagProperty, imgHomeLeaveIconTagBinding);


        let imgHomeLeaveIconSourceBinding = new Binding(dataContext, "HomeLeaveIcon.UriString");
        imgHomeLeaveIconSourceBinding.Mode = BindingMode.OneTime;
        let imgHomeLeaveIconConverterPipe = new ImageURIBitMapPipe();
        imgHomeLeaveIconSourceBinding.Converter = imgHomeLeaveIconConverterPipe;
        imgHomeLeaveIcon.SetBinding(Image.SourceProperty, imgHomeLeaveIconSourceBinding);
        if (_.get(imgHomeLeaveIcon, 'Source')) {

        SPBorder3.Child = imgHomeLeaveIcon;
        }
        if (_.get(SPBorder3, 'Child')) {
        StackPanel1.Children.Add(SPBorder3);
        }

        let Grid1 = new Grid();
        // Grid1.Grid.Row = "1";
        // Grid1.Grid.ColumnSpan = "2";
        Grid1.HorizontalAlignment = "Right";
        Grid1.VerticalAlignment = "Bottom";
        Grid1.Height = "Auto";
        let grd1colDef1: ColumnDefinition = new ColumnDefinition();
        let grd1colDef2: ColumnDefinition = new ColumnDefinition();
        let grd1colDef3: ColumnDefinition = new ColumnDefinition();
        let grd1colDef4: ColumnDefinition = new ColumnDefinition();
        Grid1.ColumnDefinitions.Add(grd1colDef1);
        Grid1.ColumnDefinitions.Add(grd1colDef2);
        Grid1.ColumnDefinitions.Add(grd1colDef3);
        Grid1.ColumnDefinitions.Add(grd1colDef4);

        let grd1StackPanel1 = new StackPanel();
        grd1StackPanel1.Margin = "1";
        grd1StackPanel1.Orientation = "Horizontal";
        // grd1StackPanel1.Grid.Column = "3";
        grd1StackPanel1.HorizontalAlignment = "Right";

        //setbinding
        let SP1TextBlock1 = new TextBlock();
        if (_.get(dataContext, 'AdminSummary') && dataContext.AdminSummary.length >= 1 && _.get(dataContext, 'AdminSummary[0]')) {
            let SP1TextBlock1TextBinding = new Binding(dataContext, "AdminSummary[0].StringData");
            SP1TextBlock1TextBinding.Mode = BindingMode.OneTime;
            SP1TextBlock1.SetBinding(TextBlock.TextProperty, SP1TextBlock1TextBinding);
        }

        SP1TextBlock1.TextWrapping = "Wrap";
        SP1TextBlock1.VerticalAlignment = "Center";


        let SP1Border1 = new Border();
        SP1Border1.noDefaultStyle = true;
        SP1Border1.Background = "Transparent";
        SP1Border1.BorderThickness = "0";
        // if (_.get(dataContext, 'AdminSummary') && dataContext.AdminSummary.length >= 1 && _.get(dataContext, 'AdminSummary[0]')) {
        // let SP1Border1ToolTipBinding = new Binding(dataContext,"AdminSummary[0].Tooltip");
        // SP1Border1.SetBinding(Border.ToolTipProperty, SP1Border1ToolTipBinding);
        // }

        let imgTodayAsRequired1 = new Image();
        imgTodayAsRequired1.Name = "imgTodayAsRequired1";
        imgTodayAsRequired1.Cursor = "Hand";
        imgTodayAsRequired1.Height = "16";
        imgTodayAsRequired1.Width = "16";
        if(dataContext.IsChartAsRequiredSlotLastColumn){
            imgTodayAsRequired1.TooltipPosition = "left";
          }
        if (_.get(dataContext, 'AdminSummary') && dataContext.AdminSummary.length >= 1 && _.get(dataContext, 'AdminSummary[0]')) {
            let imgTodayAsRequired1IsHitTestVisibleBinding = new Binding(dataContext, "AdminSummary[0].EnableOnHotSpotClick");
            imgTodayAsRequired1IsHitTestVisibleBinding.Mode = BindingMode.OneTime;
            imgTodayAsRequired1.SetBinding(Image.IsHitTestVisibleProperty, imgTodayAsRequired1IsHitTestVisibleBinding);


            let imgTodayAsRequired1ToolTipBinding = new Binding(dataContext, "AdminSummary[0].Tooltip");
            imgTodayAsRequired1ToolTipBinding.Mode = BindingMode.OneTime;
            imgTodayAsRequired1.SetBinding(Image.ToolTipProperty, imgTodayAsRequired1ToolTipBinding);

            let imgTodayAsRequired1TagBinding = new Binding(dataContext, "AdminSummary[0]");
            imgTodayAsRequired1TagBinding.Mode = BindingMode.OneTime;
            imgTodayAsRequired1.SetBinding(Image.TagProperty, imgTodayAsRequired1TagBinding);


            let imgTodayAsRequired1SourceBinding = new Binding(dataContext, "AdminSummary[0].UriString");
            imgTodayAsRequired1SourceBinding.Mode = BindingMode.OneTime;
            let imgTodayAsRequired1ConverterPipe = new ImageURIBitMapPipe();
            imgTodayAsRequired1SourceBinding.Converter = imgTodayAsRequired1ConverterPipe;
            imgTodayAsRequired1.SetBinding(Image.SourceProperty, imgTodayAsRequired1SourceBinding);
        }
        if (_.get(imgTodayAsRequired1, 'Source')) {
        SP1Border1.Child = imgTodayAsRequired1;
        }
        if (_.get(SP1TextBlock1, 'Text') && _.get(SP1TextBlock1, 'Text') != '') {
        grd1StackPanel1.Children.Add(SP1TextBlock1);
        }
        if (_.get(SP1Border1, 'Child')) {
        grd1StackPanel1.Children.Add(SP1Border1);
        }
        let grd1StackPanel2 = new StackPanel();
        grd1StackPanel2.Margin = "1";
        grd1StackPanel2.Orientation = "Horizontal";
        // grd1StackPanel2.Grid.Column = "2";
        grd1StackPanel2.HorizontalAlignment = "Right";


        let SP2TextBlock1 = new TextBlock();
        SP2TextBlock1.VerticalAlignment = "Center";
        if (_.get(dataContext, 'AdminSummary') && dataContext.AdminSummary.length >= 2 && _.get(dataContext, 'AdminSummary[1]')) {
            let SP2TextBlock1TextBinding = new Binding(dataContext, "AdminSummary[1].StringData");
            SP2TextBlock1TextBinding.Mode = BindingMode.OneTime;
            SP2TextBlock1.SetBinding(TextBlock.TextProperty, SP2TextBlock1TextBinding);
        }
        SP2TextBlock1.TextWrapping = "Wrap";


        let SP2Border1 = new Border();
        SP2Border1.noDefaultStyle = true;
        SP2Border1.Background = "Transparent";
        SP2Border1.BorderThickness = "0";
        // if (_.get(dataContext, 'AdminSummary') && dataContext.AdminSummary.length >= 2 && _.get(dataContext, 'AdminSummary[1]')) {
        //     let SP2Border1ToolTipBinding = new Binding(dataContext, "AdminSummary[1].Tooltip");
        //     SP2Border1.SetBinding(Border.ToolTipProperty, SP2Border1ToolTipBinding);
        // }

        let imgTodayAsRequired2 = new Image();
        imgTodayAsRequired2.Name = "imgTodayAsRequired2";
        imgTodayAsRequired2.Cursor = "Hand";
        imgTodayAsRequired2.Height = "16";
        imgTodayAsRequired2.Width = "16";
        if(dataContext.IsChartAsRequiredSlotLastColumn){
            imgTodayAsRequired2.TooltipPosition = "left";
          }
        if (_.get(dataContext, 'AdminSummary') && dataContext.AdminSummary.length >= 2 && _.get(dataContext, 'AdminSummary[1]')) {
            let imgTodayAsRequired2IsHitTestVisibleBinding = new Binding(dataContext, "AdminSummary[1].EnableOnHotSpotClick");
            imgTodayAsRequired2IsHitTestVisibleBinding.Mode = BindingMode.OneTime;
            imgTodayAsRequired2.SetBinding(Image.IsHitTestVisibleProperty, imgTodayAsRequired2IsHitTestVisibleBinding);

            let imgTodayAsRequired2ToolTipBinding = new Binding(dataContext, "AdminSummary[1].Tooltip");
            imgTodayAsRequired2ToolTipBinding.Mode = BindingMode.OneTime;
            imgTodayAsRequired2.SetBinding(Image.ToolTipProperty, imgTodayAsRequired2ToolTipBinding);

            let imgTodayAsRequired2TagBinding = new Binding(dataContext, "AdminSummary[1]");
            imgTodayAsRequired2TagBinding.Mode = BindingMode.OneTime;
            imgTodayAsRequired2.SetBinding(Image.TagProperty, imgTodayAsRequired2TagBinding);

            let imgTodayAsRequired2SourceBinding = new Binding(dataContext, "AdminSummary[1].UriString");
            imgTodayAsRequired2SourceBinding.Mode = BindingMode.OneTime;
            let imgTodayAsRequired2ConverterPipe = new ImageURIBitMapPipe();
            imgTodayAsRequired2SourceBinding.Converter = imgTodayAsRequired2ConverterPipe;
            imgTodayAsRequired2.SetBinding(Image.SourceProperty, imgTodayAsRequired2SourceBinding);
        }
        if (_.get(imgTodayAsRequired2, 'Source')) {
        SP2Border1.Child = imgTodayAsRequired2;
        }
        if (_.get(SP2TextBlock1, 'Text') && _.get(SP2TextBlock1, 'Text') != '') {
        grd1StackPanel2.Children.Add(SP2TextBlock1);
        }
        if (_.get(SP2Border1, 'Child')) {
        grd1StackPanel2.Children.Add(SP2Border1);
        }

        let grd1StackPanel3 = new StackPanel();
        grd1StackPanel3.Margin = "1";
        grd1StackPanel3.Orientation = "Horizontal";
        // grd1StackPanel3.Grid.Column = "1";
        grd1StackPanel3.HorizontalAlignment = "Right";


        let SP3TextBlock1 = new TextBlock();
        SP3TextBlock1.VerticalAlignment = "Center";
        if (_.get(dataContext, 'AdminSummary') && dataContext.AdminSummary.length >= 3 && _.get(dataContext, 'AdminSummary[2]')) {
            let SP3TextBlock1TextBinding = new Binding(dataContext, "AdminSummary[2].StringData");
            SP3TextBlock1TextBinding.Mode = BindingMode.OneTime;
            SP3TextBlock1.SetBinding(TextBlock.TextProperty, SP3TextBlock1TextBinding);
        }
        SP3TextBlock1.TextWrapping = "Wrap";

        let SP3Border1 = new Border();
        SP3Border1.noDefaultStyle = true;
        SP3Border1.Background = "Transparent";
        SP3Border1.BorderThickness = "0";
        // if (_.get(dataContext, 'AdminSummary') && dataContext.AdminSummary.length >= 3 && _.get(dataContext, 'AdminSummary[2]')) {
        //     let SP3Border1ToolTipBinding = new Binding(dataContext, "AdminSummary[2].Tooltip");
        //     SP3Border1.SetBinding(Border.ToolTipProperty, SP3Border1ToolTipBinding);
        // }

        let imgTodayAsRequired3 = new Image();
        imgTodayAsRequired3.Name = "imgTodayAsRequired3";
        imgTodayAsRequired3.Cursor = "Hand";
        imgTodayAsRequired3.Height = "16";
        imgTodayAsRequired3.Width = "16";
        if(dataContext.IsChartAsRequiredSlotLastColumn){
            imgTodayAsRequired3.TooltipPosition = "left";
          }
        if (_.get(dataContext, 'AdminSummary') && dataContext.AdminSummary.length >= 3 && _.get(dataContext, 'AdminSummary[2]')) {
            let imgTodayAsRequired3IsHitTestVisibleBinding = new Binding(dataContext, "AdminSummary[2].EnableOnHotSpotClick");
            imgTodayAsRequired3IsHitTestVisibleBinding.Mode = BindingMode.OneTime;
            imgTodayAsRequired3.SetBinding(Image.IsHitTestVisibleProperty, imgTodayAsRequired3IsHitTestVisibleBinding);


            let imgTodayAsRequired3ToolTipBinding = new Binding(dataContext, "AdminSummary[2].Tooltip");
            imgTodayAsRequired3ToolTipBinding.Mode = BindingMode.OneTime;
            imgTodayAsRequired3.SetBinding(Image.ToolTipProperty, imgTodayAsRequired3ToolTipBinding);

            let imgTodayAsRequired3TagBinding = new Binding(dataContext, "AdminSummary[2]");
            imgTodayAsRequired3TagBinding.Mode = BindingMode.OneTime;
            imgTodayAsRequired3.SetBinding(Image.TagProperty, imgTodayAsRequired3TagBinding);

            let imgTodayAsRequired3SourceBinding = new Binding(dataContext, "AdminSummary[2].UriString");
            imgTodayAsRequired3SourceBinding.Mode = BindingMode.OneTime;
            let imgTodayAsRequired3ConverterPipe = new ImageURIBitMapPipe();
            imgTodayAsRequired3SourceBinding.Converter = imgTodayAsRequired3ConverterPipe;
            imgTodayAsRequired3.SetBinding(Image.SourceProperty, imgTodayAsRequired3SourceBinding);

        }
        if (_.get(imgTodayAsRequired3, 'Source')) {
        SP3Border1.Child = imgTodayAsRequired3;
        }
        if (_.get(SP3TextBlock1, 'Text') && _.get(SP3TextBlock1, 'Text') != '') {
        grd1StackPanel3.Children.Add(SP3TextBlock1);
        }
        if (_.get(SP3Border1, 'Child')) {
        grd1StackPanel3.Children.Add(SP3Border1);
        }
        let grd1StackPanel4 = new StackPanel();
        grd1StackPanel4.Margin = "1";
        grd1StackPanel4.Orientation = "Horizontal";
        // grd1StackPanel4.Grid.Column = "0";
        grd1StackPanel4.HorizontalAlignment = "Right";


        let SP4TextBlock1 = new TextBlock();
        SP4TextBlock1.VerticalAlignment = "Center";
        if (_.get(dataContext, 'AdminSummary') && dataContext.AdminSummary.length >= 4 && _.get(dataContext, 'AdminSummary[3]')) {
            let SP4TextBlock1TextBinding = new Binding(dataContext, "AdminSummary[3].StringData");
            SP4TextBlock1TextBinding.Mode = BindingMode.OneTime;
            SP4TextBlock1.SetBinding(TextBlock.TextProperty, SP4TextBlock1TextBinding);
        }

        SP4TextBlock1.TextWrapping = "Wrap";


        let SP4Border1 = new Border();
        SP4Border1.noDefaultStyle = true;
        SP4Border1.Background = "Transparent";
        SP4Border1.BorderThickness = "0";
        // if (_.get(dataContext, 'AdminSummary') && dataContext.AdminSummary.length >= 4 && _.get(dataContext, 'AdminSummary[3]')) {
        //     let SP4Border1ToolTipBinding = new Binding(dataContext, "AdminSummary[3].Tooltip");
        //     SP4Border1.SetBinding(Border.ToolTipProperty, SP4Border1ToolTipBinding);
        // }

        let imgTodayAsRequired4 = new Image();
        imgTodayAsRequired4.Name = "imgTodayAsRequired4";
        imgTodayAsRequired4.Cursor = "Hand";
        imgTodayAsRequired4.Height = "16";
        imgTodayAsRequired4.Width = "16";
        if(dataContext.IsChartAsRequiredSlotLastColumn){
            imgTodayAsRequired4.TooltipPosition = "left";
          }
        if (_.get(dataContext, 'AdminSummary') && dataContext.AdminSummary.length >= 4 && _.get(dataContext, 'AdminSummary[3]')) {
            let imgTodayAsRequired4IsHitTestVisibleBinding = new Binding(dataContext, "AdminSummary[3].EnableOnHotSpotClick");
            imgTodayAsRequired4IsHitTestVisibleBinding.Mode = BindingMode.OneTime;
            imgTodayAsRequired4.SetBinding(Image.IsHitTestVisibleProperty, imgTodayAsRequired4IsHitTestVisibleBinding);

            let imgTodayAsRequired4ToolTipBinding = new Binding(dataContext, "AdminSummary[3].Tooltip");
            imgTodayAsRequired4ToolTipBinding.Mode = BindingMode.OneTime;
            imgTodayAsRequired4.SetBinding(Image.ToolTipProperty, imgTodayAsRequired4ToolTipBinding);

            let imgTodayAsRequired4TagBinding = new Binding(dataContext, "AdminSummary[3]");
            imgTodayAsRequired4TagBinding.Mode = BindingMode.OneTime;
            imgTodayAsRequired4.SetBinding(Image.TagProperty, imgTodayAsRequired4TagBinding);

            let imgTodayAsRequired4SourceBinding = new Binding(dataContext, "AdminSummary[3].UriString");
            imgTodayAsRequired4SourceBinding.Mode = BindingMode.OneTime;
            let imgTodayAsRequired4ConverterPipe = new ImageURIBitMapPipe();
            imgTodayAsRequired4SourceBinding.Converter = imgTodayAsRequired4ConverterPipe;
            imgTodayAsRequired4.SetBinding(Image.SourceProperty, imgTodayAsRequired4SourceBinding);

        }
        if (_.get(imgTodayAsRequired4, 'Source')) {
        SP4Border1.Child = imgTodayAsRequired4;
        }
        if (_.get(SP4TextBlock1, 'Text') && _.get(SP4TextBlock1, 'Text') != '') {
        grd1StackPanel4.Children.Add(SP4TextBlock1);
        }
        if (_.get(SP4Border1, 'Child')) {
        grd1StackPanel4.Children.Add(SP4Border1);
        }
        if (_.get(grd1StackPanel1, 'ChildrenElementArray') && grd1StackPanel1.ChildrenElementArray.length > 0) {
        Grid1.Children.Add(grd1StackPanel1);
        Grid1.SetGridColumn(grd1StackPanel1, 4);
        }
        if (_.get(grd1StackPanel2, 'ChildrenElementArray') && grd1StackPanel2.ChildrenElementArray.length > 0) {
        Grid1.Children.Add(grd1StackPanel2);
        Grid1.SetGridColumn(grd1StackPanel2, 3);
        }
        if (_.get(grd1StackPanel3, 'ChildrenElementArray') && grd1StackPanel3.ChildrenElementArray.length > 0) {
        Grid1.Children.Add(grd1StackPanel3);
        Grid1.SetGridColumn(grd1StackPanel2, 2);
        }
        if (_.get(grd1StackPanel4, 'ChildrenElementArray') && grd1StackPanel4.ChildrenElementArray.length > 0) {
        Grid1.Children.Add(grd1StackPanel4);
        Grid1.SetGridColumn(grd1StackPanel4, 1);
        }
        if (_.get(spAsRequiredSlot, 'ChildrenArr') && spAsRequiredSlot.ChildrenArr.length > 0) {
        grid.Children.Add(spAsRequiredSlot);
            grid.SetGridRow(spAsRequiredSlot, 1);
            grid.SetGridColumn(spAsRequiredSlot, 1);
        }
        if (_.get(StackPanel1, 'ChildrenElementArray') && StackPanel1.ChildrenElementArray.length > 0) {
        grid.Children.Add(StackPanel1);
        grid.SetGridColumn(StackPanel1, 3)
        }
        if (_.get(Grid1, 'ChildrenArr') && Grid1.ChildrenArr.length > 0) {
        grid.Children.Add(Grid1);
        grid.SetGridRow(Grid1, 2);
        grid.SetColumnSpan(Grid1, 3);
            let itemstyle = { 'display': `flex`, 'flex-direction': `column`, 'justify-content': `flex-end` };
            grid.SetColumnRowStyle(itemstyle, 2, 1);
            // let itestyle = grid.ChildrenArr.find((item) => {
            //     if (item.row == 2 && item.col == 3) {
            //         return item.control;
            //     }
            // })
            // itestyle.style = { 'display': `flex`, 'flex-direction': `column`, 'justify-content': `flex-end` };
        }
        Border1.Child = grid;
        AsRequiredSlot.Content=Border1;
        return AsRequiredSlot.Content;
    }
    //binding
    administratedSlot(dataContext): any {
        let AdministratedSlot = new DataTemplate();
        let Border1 = new Border();
        Border1.Style = ControlStyles.BorderWidth;
        Border1.BorderBrush = "#7090A5";
        Border1.BorderThickness = new Thickness(1, 0, 1, 0);
        let Border1ToolTipBinding = new Binding(dataContext, "StatusToolTip");
        Border1ToolTipBinding.Mode = BindingMode.OneTime;
        Border1.SetBinding(Border.ToolTipProperty, Border1ToolTipBinding);
        let grid1 = new Grid();
        let rowDef1: RowDefinition = new RowDefinition();
        let rowDef2: RowDefinition = new RowDefinition();
        let colDef1: ColumnDefinition = new ColumnDefinition();
        let colDef2: ColumnDefinition = new ColumnDefinition();
        let colDef3: ColumnDefinition = new ColumnDefinition();
        let colDef4: ColumnDefinition = new ColumnDefinition();
        let colDef5: ColumnDefinition = new ColumnDefinition();
        let colDef6: ColumnDefinition = new ColumnDefinition();
        rowDef1.Height = '1fr';
        rowDef2.Height = '12';
        colDef1.Width = 'auto';
        colDef2.Width = 'auto';
        colDef3.Width = '1fr';
        colDef4.Width = '18';
        colDef5.Width = 'auto';
        colDef6.Width = 'auto';
        grid1.RowDefinitions.Add(rowDef1);
        grid1.RowDefinitions.Add(rowDef2);
        grid1.ColumnDefinitions.Add(colDef1);
        grid1.ColumnDefinitions.Add(colDef2);
        grid1.ColumnDefinitions.Add(colDef3);
        grid1.ColumnDefinitions.Add(colDef4);
        grid1.ColumnDefinitions.Add(colDef5);
        grid1.ColumnDefinitions.Add(colDef6);
        let tbTime = new TextBlock();
        tbTime.Margin = "1";
        tbTime.VerticalAlignment = "Top";
        tbTime.Name = "tbTime";
        //tbTime.MinWidth="120";
        // tbTime.Grid.Row = "0";
        tbTime.HorizontalAlignment = "Left";
        let tbTimeFontWeightBinding = new Binding(dataContext, "FontWeightTime");
        tbTimeFontWeightBinding.Mode = BindingMode.OneTime;
        tbTime.SetBinding(TextBlock.FontWeightProperty, tbTimeFontWeightBinding);
        let txtbbinding: Binding = new Binding(dataContext, "Time");
        txtbbinding.Mode = BindingMode.OneTime;
        let timeConverterpipe: TimeConvertorPipe = new TimeConvertorPipe();
        txtbbinding.Converter = timeConverterpipe;
        txtbbinding.ConverterParameter = String.Concat(dataContext.AdministratedTmFrmt, "&", "TRUE");
        txtbbinding.Source = dataContext.Time;
        tbTime.SetBinding(TextBlock.TextProperty, txtbbinding);
        let tbBlank = new TextBlock();
        tbBlank.VerticalAlignment = "Center";
        tbBlank.Name = "tbBlank";
        // tbBlank.Grid.Row = "0";
        // tbBlank.Grid.Column = "2";
        let Border2 = new Border();
        Border2.noflexStyle = true;
        Border2.VerticalAlignment = "Top";
        Border2.Margin = "1";
        // Border2.Grid.Column = "3";
        // Border2.Grid.Row = "0";
        Border2.Width = "Auto";
        Border2.noDefaultStyle = true;
        Border2.Background = "Transparent";
        Border2.BorderThickness = "0";
        // let Border2ToolTipBinding = new Binding(dataContext, "HistoryIcon.Tooltip");
        // Border2.SetBinding(Border.ToolTipProperty, Border2ToolTipBinding);
        let imgHistoryIcon = new Image();
        imgHistoryIcon.Name = "imgHistoryIcon";
        imgHistoryIcon.Cursor = "Hand";
        if(dataContext.IsChartAdminSlotLastColumn){
            imgHistoryIcon.TooltipPosition = "left";
          }
        let imgHistoryIconIsHitTestVisibleBinding = new Binding(dataContext, "HistoryIcon.EnableOnHotSpotClick");
        imgHistoryIconIsHitTestVisibleBinding.Mode = BindingMode.OneTime;
        imgHistoryIcon.SetBinding(Image.IsHitTestVisibleProperty, imgHistoryIconIsHitTestVisibleBinding);
        let imgHistoryIconToolTipBinding = new Binding(dataContext, "HistoryIcon.Tooltip");
        imgHistoryIconToolTipBinding.Mode = BindingMode.OneTime;
        imgHistoryIcon.SetBinding(Image.ToolTipProperty, imgHistoryIconToolTipBinding);
        imgHistoryIcon.Height = "16";
        imgHistoryIcon.Width = "16";
        // imgHistoryIcon.Grid.Column = "3";
        // imgHistoryIcon.Grid.Row = "0";
        let imgHistoryIconTagBinding = new Binding(dataContext, "HistoryIcon");
        imgHistoryIconTagBinding.Mode = BindingMode.OneTime;
        imgHistoryIcon.SetBinding(Image.TagProperty, imgHistoryIconTagBinding);
        let imgHistoryIconSourceBinding = new Binding(dataContext, "HistoryIcon.UriString");
        imgHistoryIconSourceBinding.Mode = BindingMode.OneTime;
        let imgHistoryIconConverterPipe = new ImageURIBitMapPipe();
        imgHistoryIconSourceBinding.Converter = imgHistoryIconConverterPipe;
        imgHistoryIcon.SetBinding(Image.SourceProperty, imgHistoryIconSourceBinding);
        imgHistoryIcon.DataContext = dataContext;
        if (_.get(dataContext, 'HistoryIcon.EnableOnHotSpotClick'))
            imgHistoryIcon.MouseLeftButtonDown = (s, e) => { iMedicationChart.oMedicationChart.FireImageClick(s, e) };
        if (_.get(imgHistoryIcon, 'Source')) {
            Border2.Child = imgHistoryIcon;
        }
        let StackPanel1 = new StackPanel();
        StackPanel1.Orientation = "Horizontal";
        // StackPanel1.Grid.Column = "4";
        // StackPanel1.Grid.Row = "0";
        let tbomitted = new TextBlock();
        tbomitted.VerticalAlignment = "Top";
        tbomitted.HorizontalAlignment = "Right";
        tbomitted.Name = "tbomitted";
        let tbomittedTextBinding = new Binding(dataContext, "OmittedMessage");
        tbomittedTextBinding.Mode = BindingMode.OneTime;
        tbomitted.SetBinding(TextBlock.TextProperty, tbomittedTextBinding);
        let tbomittedFontWeightBinding = new Binding(dataContext, "OmittedMessageWeight");
        tbomittedFontWeightBinding.Mode = BindingMode.OneTime;
        tbomitted.SetBinding(TextBlock.FontWeightProperty, tbomittedFontWeightBinding);
        let SP1Border1 = new Border();
        SP1Border1.VerticalAlignment = "Top";
        SP1Border1.Margin = "1";
        SP1Border1.Width = "Auto";
        SP1Border1.noDefaultStyle = true;
        SP1Border1.Background = "Transparent";
        SP1Border1.BorderThickness = "0";
        // let SP1Border1ToolTipBinding = new Binding(dataContext, "StatusIcon.Tooltip");
        // SP1Border1.SetBinding(Border.ToolTipProperty, SP1Border1ToolTipBinding);
        let imgStatusIcon = new Image();
        imgStatusIcon.Name = "imgStatusIcon";
        imgStatusIcon.Cursor = "Hand";
        imgStatusIcon.Height = "16";
        imgStatusIcon.Width = "16";
        if(dataContext.IsChartAdminSlotLastColumn){
            imgStatusIcon.TooltipPosition = "left";
          }
        let imgStatusIconIsHitTestVisibleBinding = new Binding(dataContext, "StatusIcon.EnableOnHotSpotClick");
        imgStatusIconIsHitTestVisibleBinding.Mode = BindingMode.OneTime;
        imgStatusIcon.SetBinding(Image.IsHitTestVisibleProperty, imgStatusIconIsHitTestVisibleBinding);
        let imgStatusIconToolTipBinding = new Binding(dataContext, "StatusIcon.Tooltip");
        imgStatusIconToolTipBinding.Mode = BindingMode.OneTime;
        imgStatusIcon.SetBinding(Image.ToolTipProperty, imgStatusIconToolTipBinding);
        let imgStatusIconTagBinding = new Binding(dataContext, "StatusIcon");
        imgStatusIconTagBinding.Mode = BindingMode.OneTime;
        imgStatusIcon.SetBinding(Image.TagProperty, imgStatusIconTagBinding);
        let imgStatusIconSourceBinding = new Binding(dataContext, "StatusIcon.UriString");
        imgStatusIconSourceBinding.Mode = BindingMode.OneTime;
        let imgStatusIconConverterPipe = new ImageURIBitMapPipe();
        imgStatusIconSourceBinding.Converter = imgStatusIconConverterPipe;
        imgStatusIcon.SetBinding(Image.SourceProperty, imgStatusIconSourceBinding);
        if (_.get(imgStatusIcon, 'Source'))
            SP1Border1.Child = imgStatusIcon;
        StackPanel1.Children.Add(tbomitted);
        StackPanel1.Children.Add(SP1Border1);
        let StackPanel2 = new StackPanel();
        StackPanel2.Orientation = "Horizontal";
        // StackPanel2.Grid.Column = "5";
        // StackPanel2.Grid.Row = "0";
        let tbReasonForNotGiven = new TextBlock();
        // tbReasonForNotGiven.Margin = "1";
        tbReasonForNotGiven.VerticalAlignment = "Top";
        // tbReasonForNotGiven.Grid.Row = "0";
        // tbReasonForNotGiven.Grid.Column = "5";
        tbReasonForNotGiven.HorizontalAlignment = "Right";
        tbReasonForNotGiven.Name = "tbReasonForNotGiven";
        if(dataContext.IsChartAdminSlotLastColumn){
            tbReasonForNotGiven.TooltipPosition = "left";
          }
        let tbReasonForNotGivenTextBinding = new Binding(dataContext, "ReasonForNotGiven");
        tbReasonForNotGivenTextBinding.Mode = BindingMode.OneTime;
        tbReasonForNotGiven.SetBinding(TextBlock.TextProperty, tbReasonForNotGivenTextBinding);
        let tbReasonForNotGivenFontWeightBinding = new Binding(dataContext, "ReasonFontWeight");
        tbReasonForNotGivenFontWeightBinding.Mode = BindingMode.OneTime;
        tbReasonForNotGiven.SetBinding(TextBlock.FontWeightProperty, tbReasonForNotGivenFontWeightBinding);
        let tbReasonForNotGivenFontSizeBinding = new Binding(dataContext, "ReasonFontSize");
        tbReasonForNotGivenFontSizeBinding.Mode = BindingMode.OneTime;
        tbReasonForNotGiven.SetBinding(TextBlock.FontSizeProperty, tbReasonForNotGivenFontSizeBinding);
        // let tbReasonForNotGivenForegroundBinding = new Binding(dataContext, "ReasonFontColor");
        // tbReasonForNotGiven.SetBinding(TextBlock.ForegroundProperty, tbReasonForNotGivenForegroundBinding);
        let forecolor: Color = JSON.parse(dataContext.ReasonFontColor);
        let c: Color = Color.FromArgb(forecolor.A, forecolor.R, forecolor.G, forecolor.B)
        tbReasonForNotGiven.Foreground = c;
        tbReasonForNotGiven.TextWrapping = "Wrap";
        //code to be revisited for tbReasonToolTip
        let tbReasonToolTip = new TextBlock();
        tbReasonToolTip.TextWrapping = "Wrap";
        tbReasonToolTip.MaxWidth = "381";
        let tbReasonToolTipTextBinding = new Binding(dataContext, "ReasonToolTip")
        tbReasonToolTipTextBinding.Mode = BindingMode.OneTime;
        tbReasonToolTip.SetBinding(TextBlock.TextProperty, tbReasonToolTipTextBinding);
        tbReasonForNotGiven.ToolTip = tbReasonToolTip;
        // let tbReasonToolTipTextBinding = new Binding(dataContext, "ReasonToolTip")
        // tbReasonForNotGiven.SetBinding(TextBlock.ToolTipProperty, tbReasonToolTipTextBinding);
        if (_.get(tbReasonForNotGiven, 'Text') == '') {
            tbReasonForNotGiven.Margin = "1";
        }
        //Border is not required
        //     <ToolTipService.ToolTip>
        //     <Border MaxWidth="400">
        //     <TextBlock Text="{Binding ReasonToolTip}" TextWrapping="Wrap"/>
        //     </Border>
        //   </ToolTipService.ToolTip> 
        let SP3Border1 = new Border();
        SP3Border1.VerticalAlignment = "Top";
        SP3Border1.Margin = "1";
        // SP3Border1.Grid.Column = "5";
        // SP3Border1.Grid.Row = "0";
        SP3Border1.Width = "Auto";
        SP3Border1.noDefaultStyle = true;
        SP3Border1.Background = "Transparent";
        SP3Border1.BorderThickness = "0";
        // let SP3Border1ToolTipBinding = new Binding(dataContext, "HomeLeaveIcon.Tooltip");
        // SP3Border1.SetBinding(Border.ToolTipProperty, SP3Border1ToolTipBinding);
        let imgHomeLeaveIcon = new Image();
        imgHomeLeaveIcon.Name = "imgHomeLeaveIcon";
        imgHomeLeaveIcon.Cursor = "Hand";
        if(dataContext.IsChartAdminSlotLastColumn){
            imgHomeLeaveIcon.TooltipPosition = "left";
          }
        let imgHomeLeaveIconIsHitTestVisibleBinding = new Binding(dataContext, "HomeLeaveIcon.EnableOnHotSpotClick");
        imgHomeLeaveIconIsHitTestVisibleBinding.Mode = BindingMode.OneTime;
        imgHomeLeaveIcon.SetBinding(Image.IsHitTestVisibleProperty, imgHomeLeaveIconIsHitTestVisibleBinding);
        let imgHomeLeaveIconToolTipBinding = new Binding(dataContext, "HomeLeaveIcon.Tooltip");
        imgHomeLeaveIconToolTipBinding.Mode = BindingMode.OneTime;
        imgHomeLeaveIcon.SetBinding(Image.ToolTipProperty, imgHomeLeaveIconToolTipBinding);
        imgHomeLeaveIcon.MaxHeight = "16";
        imgHomeLeaveIcon.MaxWidth = "16";
        let imgHomeLeaveIconTagBinding = new Binding(dataContext, "HomeLeaveIcon");
        imgHomeLeaveIconTagBinding.Mode = BindingMode.OneTime;
        imgHomeLeaveIcon.SetBinding(Image.TagProperty, imgHomeLeaveIconTagBinding);
        let imgHomeLeaveIconSourceBinding = new Binding(dataContext, "HomeLeaveIcon.UriString");
        imgHomeLeaveIconSourceBinding.Mode = BindingMode.OneTime;
        let imgHomeLeaveIconConverterPipe = new ImageURIBitMapPipe();
        imgHomeLeaveIconSourceBinding.Converter = imgHomeLeaveIconConverterPipe;
        imgHomeLeaveIcon.SetBinding(Image.SourceProperty, imgHomeLeaveIconSourceBinding);
        if (_.get(imgHomeLeaveIcon, 'Source'))
            SP3Border1.Child = imgHomeLeaveIcon;
        StackPanel2.Children.Add(tbReasonForNotGiven);
        StackPanel2.Children.Add(SP3Border1);

        let SP2Border1 = new Border();
        SP2Border1.VerticalAlignment = "Top";
        SP2Border1.Margin = "1";
        SP2Border1.Width = "Auto";
        SP2Border1.noDefaultStyle = true;
        SP2Border1.Background = "Transparent";
        SP2Border1.BorderThickness = "0";
        // let SP2Border1ToolTipBinding = new Binding(dataContext, "ConflictIcon.Tooltip");
        // SP2Border1.SetBinding(Border.ToolTipProperty, SP2Border1ToolTipBinding);
        let imgConflictIcon = new Image();
        imgConflictIcon.Name = "imgConflictIcon";
        imgConflictIcon.Cursor = "Hand";
        if(dataContext.IsChartAdminSlotLastColumn){
            imgConflictIcon.TooltipPosition = "left";
          }
        let imgConflictIconIsHitTestVisibleBinding = new Binding(dataContext, "ConflictIcon.EnableOnHotSpotClick");
        imgConflictIconIsHitTestVisibleBinding.Mode = BindingMode.OneTime;
        imgConflictIcon.SetBinding(Image.IsHitTestVisibleProperty, imgConflictIconIsHitTestVisibleBinding);
        let imgConflictIconToolTipBinding = new Binding(dataContext, "ConflictIcon.Tooltip");
        imgConflictIconToolTipBinding.Mode = BindingMode.OneTime;
        imgConflictIcon.SetBinding(Image.ToolTipProperty, imgConflictIconToolTipBinding);
        imgConflictIcon.MaxHeight = "16";
        imgConflictIcon.MaxWidth = "16";
        let imgConflictIconTagBinding = new Binding(dataContext, "ConflictIcon");
        imgConflictIconTagBinding.Mode = BindingMode.OneTime;
        imgConflictIcon.SetBinding(Image.TagProperty, imgConflictIconTagBinding);
        let imgConflictIconSourceBinding = new Binding(dataContext, "ConflictIcon.UriString");
        imgConflictIconSourceBinding.Mode = BindingMode.OneTime;
        let imgConflictIconConverterPipe = new ImageURIBitMapPipe();
        imgConflictIconSourceBinding.Converter = imgConflictIconConverterPipe;
        imgConflictIcon.SetBinding(Image.SourceProperty, imgConflictIconSourceBinding);
        if (_.get(imgConflictIcon, 'Source')) {
            SP2Border1.Child = imgConflictIcon;
        }
        let SP2Border2 = new Border();
        SP2Border2.VerticalAlignment = "Top";
        SP2Border2.Margin = "1";
        SP2Border2.Width = "Auto";
        SP2Border2.noDefaultStyle = true;
        SP2Border2.Background = "Transparent";
        SP2Border2.BorderThickness = "0";
        // let SP2Border2ToolTipBinding = new Binding(dataContext, "CumulativeIcon.Tooltip");
        // SP2Border2.SetBinding(Border.ToolTipProperty, SP2Border2ToolTipBinding);
        let imgCumulativeIcon = new Image();
        imgCumulativeIcon.Name = "imgCumulativeIcon";
        imgCumulativeIcon.Cursor = "Hand";
        if(dataContext.IsChartAdminSlotLastColumn){
            imgCumulativeIcon.TooltipPosition = "left";
          }
        
        let imgCumulativeIconIsHitTestVisibleBinding = new Binding(dataContext, "CumulativeIcon.EnableOnHotSpotClick");
        imgCumulativeIconIsHitTestVisibleBinding.Mode = BindingMode.OneTime;
        imgCumulativeIcon.SetBinding(Image.IsHitTestVisibleProperty, imgCumulativeIconIsHitTestVisibleBinding);
        let imgCumulativeIconToolTipBinding = new Binding(dataContext, "CumulativeIcon.Tooltip");
        imgCumulativeIconToolTipBinding.Mode = BindingMode.OneTime;
        imgCumulativeIcon.SetBinding(Image.ToolTipProperty, imgCumulativeIconToolTipBinding);
        imgCumulativeIcon.MaxHeight = "16";
        imgCumulativeIcon.MaxWidth = "16";
        let imgCumulativeIconTagBinding = new Binding(dataContext, "CumulativeIcon");
        imgCumulativeIconTagBinding.Mode = BindingMode.OneTime;
        imgCumulativeIcon.SetBinding(Image.TagProperty, imgCumulativeIconTagBinding);
        let imgCumulativeIconSourceBinding = new Binding(dataContext, "CumulativeIcon.UriString");
        imgCumulativeIconSourceBinding.Mode = BindingMode.OneTime;
        let imgCumulativeIconConverterPipe = new ImageURIBitMapPipe();
        imgCumulativeIconSourceBinding.Converter = imgCumulativeIconConverterPipe;
        imgCumulativeIcon.SetBinding(Image.SourceProperty, imgCumulativeIconSourceBinding);
        if (_.get(imgCumulativeIcon, 'Source')) {
            SP2Border2.Child = imgCumulativeIcon;
        }
        StackPanel2.Children.Add(SP2Border1);
        StackPanel2.Children.Add(SP2Border2);

        let Border3 = new Border();
        Border3.VerticalAlignment = "Bottom";
        Border3.HorizontalAlignment = "Right";
        Border3.Margin = "0";
        Border3.noDefaultStyle = true;
        Border3.Background = "Transparent";
        Border3.BorderThickness = "0";
        // Border3.Grid.Row = "1";
        // Border3.Grid.Column = "5";
        // let Border3ToolTipBinding = new Binding(dataContext, "AdministrationIcon.Tooltip");
        // Border3.SetBinding(Border.ToolTipProperty, Border3ToolTipBinding);
        let imgAdministrativeIcon = new Image();
        imgAdministrativeIcon.Name = "imgAdministrativeIcon";
        imgAdministrativeIcon.VerticalAlignment = "Bottom";
        imgAdministrativeIcon.HorizontalAlignment = "Right";
        if(dataContext.IsChartAdminSlotLastColumn){
            imgAdministrativeIcon.TooltipPosition = "left";
          }
        let imgAdministrativeIconIsHitTestVisibleBinding = new Binding(dataContext, "AdministrationIcon.EnableOnHotSpotClick");
        imgAdministrativeIconIsHitTestVisibleBinding.Mode = BindingMode.OneTime;
        imgAdministrativeIcon.SetBinding(Image.IsHitTestVisibleProperty, imgAdministrativeIconIsHitTestVisibleBinding);
        let imgAdministrativeIconToolTipBinding = new Binding(dataContext, "AdministrationIcon.Tooltip");
        imgAdministrativeIconToolTipBinding.Mode = BindingMode.OneTime;
        imgAdministrativeIcon.SetBinding(Image.ToolTipProperty, imgAdministrativeIconToolTipBinding);
        imgAdministrativeIcon.Cursor = "Hand";
        imgAdministrativeIcon.Width = "10";
        imgAdministrativeIcon.Height = "10";
        let imgAdministrativeIconTagBinding = new Binding(dataContext, "AdministrationIcon");
        imgAdministrativeIconTagBinding.Mode = BindingMode.OneTime;
        imgAdministrativeIcon.SetBinding(Image.TagProperty, imgAdministrativeIconTagBinding);
        let imgAdministrativeIconSourceBinding = new Binding(dataContext, "AdministrationIcon.UriString");
        imgAdministrativeIconSourceBinding.Mode = BindingMode.OneTime;
        let imgAdministrativeIconConverterPipe = new ImageURIBitMapPipe();
        imgAdministrativeIconSourceBinding.Converter = imgAdministrativeIconConverterPipe;
        imgAdministrativeIcon.SetBinding(Image.SourceProperty, imgAdministrativeIconSourceBinding);
        if (_.get(imgAdministrativeIcon, 'Source'))
            Border3.Child = imgAdministrativeIcon;
        grid1.Children.Add(tbTime);
        grid1.SetGridRow(tbTime, 1);
        grid1.Children.Add(tbBlank);
        grid1.SetGridRow(tbBlank, 1);
        grid1.SetGridColumn(tbBlank, 3);
        grid1.Children.Add(Border2);
        grid1.SetGridColumn(Border2, 4);
        grid1.SetGridRow(Border2, 1);
        grid1.Children.Add(StackPanel1);
        grid1.SetGridColumn(StackPanel1, 5);
        grid1.SetGridRow(StackPanel1, 1);
        grid1.Children.Add(StackPanel2);
        grid1.SetGridColumn(StackPanel2, 6);
        grid1.SetGridRow(StackPanel2, 1);
        grid1.Children.Add(Border3);
        grid1.SetGridColumn(Border3, 6);
        grid1.SetGridRow(Border3, 2);
        let itemstyle = { 'display': `flex`, 'flex-direction': `row`, 'justify-content': `flex-end` };
        grid1.SetColumnRowStyle(itemstyle, 2, 6);
        //UI check
        // grid1.Children.Add(SP3Border1);
        // grid1.SetGridColumn(SP3Border1, 6);
        // grid1.SetGridRow(SP3Border1, 1);

        // //UI check
        // grid1.Children.Add(tbReasonForNotGiven);
        // grid1.SetGridColumn(tbReasonForNotGiven, 6);
        // grid1.SetGridRow(tbReasonForNotGiven, 1);
        Border1.Child = grid1;
        AdministratedSlot.Content = Border1;
        return AdministratedSlot.Content;
    }

    DoseOverviewSlot(dataContext):any{
        let doseOverViewSlot = new DataTemplate();

        let Border1 = new Border();
        Border1.noDefaultStyle = true;
        Border1.Style = ControlStyles.BorderWidth;
        Border1.VerticalAlignment = "Stretch";
        Border1.Background = "Transparent";
        Border1.HorizontalAlignment = "Stretch";
        Border1.style = ControlStyles.BorderWidth;
        Border1.BorderBrush = "#7090A5";
        Border1.BorderThickness = new Thickness(1, 0, 1, 0);


        let Border1ToolTipBinding = new Binding(dataContext,"Tooltip");
        Border1ToolTipBinding.Mode = BindingMode.OneTime;
        Border1.SetBinding(Border.ToolTipProperty, Border1ToolTipBinding);
        let Grid1 = new Grid();
        let rowDef1: RowDefinition = new RowDefinition();
        rowDef1.Height = "Auto";
        let rowDef2: RowDefinition = new RowDefinition();
        rowDef2.Height = "1fr";
        let rowDef3: RowDefinition = new RowDefinition();
        rowDef3.Height = "Auto";
        let rowDef4: RowDefinition = new RowDefinition();
        rowDef4.Height = "Auto";
        Grid1.RowDefinitions.Add(rowDef1);
        Grid1.RowDefinitions.Add(rowDef2);
        Grid1.RowDefinitions.Add(rowDef3);
        Grid1.RowDefinitions.Add(rowDef4);

        let StackPanel1 = new StackPanel();
        StackPanel1.VerticalAlignment = "Top";
        StackPanel1.Orientation = "Horizontal";
        StackPanel1.HorizontalAlignment = "Right";


        let SP1Border1 = new Border();
        SP1Border1.noDefaultStyle = true;
        SP1Border1.noflexStyle = true;
        SP1Border1.VerticalAlignment = "Top";
        SP1Border1.HorizontalAlignment = "Right";
        SP1Border1.Margin = "1";
        SP1Border1.Background = "Transparent";
        SP1Border1.BorderThickness = "0";

        // let SP1Border1ToolTipBinding = new Binding(dataContext,"HistoryIcon.Tooltip");
        // SP1Border1.SetBinding(Border.ToolTipProperty, SP1Border1ToolTipBinding);

        let imgHistoryIcon = new Image();
        imgHistoryIcon.Name = "imgHistoryIcon";
        imgHistoryIcon.Cursor = "Hand";

        let imgHistoryIconIsHitTestVisibleBinding = new Binding(dataContext, "HistoryIcon.EnableOnHotSpotClick");
        imgHistoryIconIsHitTestVisibleBinding.Mode = BindingMode.OneTime;
        imgHistoryIcon.SetBinding(Image.IsHitTestVisibleProperty, imgHistoryIconIsHitTestVisibleBinding);

        let imgHistoryIconToolTipBinding = new Binding(dataContext, "HistoryIcon.Tooltip");
        imgHistoryIconToolTipBinding.Mode = BindingMode.OneTime;
        imgHistoryIcon.SetBinding(Image.ToolTipProperty, imgHistoryIconToolTipBinding);

        let imgHistoryIconWidthBinding = new Binding(dataContext, "HistoryIconWdth");
        imgHistoryIconWidthBinding.Mode = BindingMode.OneTime;
        imgHistoryIcon.SetBinding(Image.WidthProperty, imgHistoryIconWidthBinding);

        let imgHistoryIconHeightBinding = new Binding(dataContext, "HistoryIconHght");
        imgHistoryIconHeightBinding.Mode = BindingMode.OneTime;
        imgHistoryIcon.SetBinding(Image.HeightProperty, imgHistoryIconHeightBinding);


        let imgHistoryIconTagBinding = new Binding(dataContext, "HistoryIcon");
        imgHistoryIconTagBinding.Mode = BindingMode.OneTime;
        imgHistoryIcon.SetBinding(Image.TagProperty, imgHistoryIconTagBinding);

        let imgHistoryIconSourceBinding = new Binding(dataContext, "HistoryIcon.UriString");
        imgHistoryIconSourceBinding.Mode = BindingMode.OneTime;
        let imgHistoryIconConverterPipe = new ImageURIBitMapPipe();
        imgHistoryIconSourceBinding.Converter = imgHistoryIconConverterPipe;
        imgHistoryIcon.SetBinding(Image.SourceProperty, imgHistoryIconSourceBinding);
        imgHistoryIcon.DataContext = dataContext;
        if (_.get(dataContext, 'HistoryIcon.EnableOnHotSpotClick'))
            imgHistoryIcon.MouseLeftButtonDown = (s, e) => iMedicationChart.oMedicationChart.FireImageClickHistoryIcon(s, e);
        if (_.get(imgHistoryIcon, 'Source')) {
            SP1Border1.Child = imgHistoryIcon;
        }

        let SP1Border2 = new Border();
        SP1Border2.noDefaultStyle = true;
        SP1Border2.noflexStyle = true;
        SP1Border2.VerticalAlignment = "Top";
        SP1Border2.Margin = "1";
        SP1Border2.Width = "Auto";
        SP1Border2.Background = "Transparent";
        SP1Border2.BorderThickness = "0";

        // let SP1Border2ToolTipBinding = new Binding(dataContext,"HomeLeaveIcon.Tooltip");
        // SP1Border2.SetBinding(Border.ToolTipProperty, SP1Border2ToolTipBinding);


        let imgHomeLeaveIcon = new Image();
        imgHomeLeaveIcon.Name = "imgHomeLeaveIcon";
        imgHomeLeaveIcon.Cursor = "Hand";

        let imgHomeLeaveIconIsHitTestVisibleBinding = new Binding(dataContext, "HomeLeaveIcon.EnableOnHotSpotClick");
        imgHomeLeaveIconIsHitTestVisibleBinding.Mode = BindingMode.OneTime;
        imgHomeLeaveIcon.SetBinding(Image.IsHitTestVisibleProperty, imgHomeLeaveIconIsHitTestVisibleBinding);

        let imgHomeLeaveIconToolTipBinding = new Binding(dataContext, "HomeLeaveIcon.Tooltip");
        imgHomeLeaveIconToolTipBinding.Mode = BindingMode.OneTime;
        imgHomeLeaveIcon.SetBinding(Image.ToolTipProperty, imgHomeLeaveIconToolTipBinding);

        imgHomeLeaveIcon.MaxHeight = "16";
        imgHomeLeaveIcon.MaxWidth = "16";

        let imgHomeLeaveIconTagBinding = new Binding(dataContext, "HomeLeaveIcon");
        imgHomeLeaveIconTagBinding.Mode = BindingMode.OneTime;
        imgHomeLeaveIcon.SetBinding(Image.TagProperty, imgHomeLeaveIconTagBinding);

        let imgHomeLeaveIconSourceBinding = new Binding(dataContext, "HomeLeaveIcon.UriString");
        imgHomeLeaveIconSourceBinding.Mode = BindingMode.OneTime;
        let imgHomeLeaveIconConverterPipe = new ImageURIBitMapPipe();
        imgHomeLeaveIconSourceBinding.Converter = imgHomeLeaveIconConverterPipe;
        imgHomeLeaveIcon.SetBinding(Image.SourceProperty, imgHomeLeaveIconSourceBinding);
        imgHomeLeaveIcon.DataContext = dataContext;
        if (_.get(dataContext, 'HomeLeaveIcon.EnableOnHotSpotClick'))
            imgHomeLeaveIcon.MouseLeftButtonDown = (s, e) => iMedicationChart.oMedicationChart.FireImageClick(s, e);
        if (_.get(imgHomeLeaveIcon, 'Source')) {
            SP1Border2.Child = imgHomeLeaveIcon;
        }

        StackPanel1.Children.Add(SP1Border1);
        StackPanel1.Children.Add(SP1Border2);

        let StackPanel2 = new StackPanel();
        // StackPanel2.Grid.Row = "1";
        StackPanel2.VerticalAlignment = "Center";
        StackPanel2.Orientation = "Vertical";
        StackPanel2.HorizontalAlignment = "Center";


        let tbAdministerationCount = new TextBlock();
        //tbAdministerationCount.Grid.Row = "1";
        tbAdministerationCount.Name = "tbAdministerationCount";

        let tbAdministerationCountTextBinding = new Binding(dataContext, "AdministerationCount");
        tbAdministerationCountTextBinding.Mode = BindingMode.OneTime;
        tbAdministerationCount.SetBinding(TextBlock.TextProperty, tbAdministerationCountTextBinding);

        tbAdministerationCount.TextWrapping = "Wrap";

        let tbAdministerationCountToolTipBinding = new Binding(dataContext, "ACToolTip");
        tbAdministerationCountToolTipBinding.Mode = BindingMode.OneTime;
        tbAdministerationCount.SetBinding(TextBlock.ToolTipProperty, tbAdministerationCountToolTipBinding);

        let tbAdministerationCountFontSizeBinding = new Binding(dataContext, "ACFontSize");
        tbAdministerationCountFontSizeBinding.Mode = BindingMode.OneTime;
        tbAdministerationCount.SetBinding(TextBlock.FontSizeProperty, tbAdministerationCountFontSizeBinding);

        let tbAdministerationCountFontWeightBinding = new Binding(dataContext, "ACFontWeight");
        tbAdministerationCountFontWeightBinding.Mode = BindingMode.OneTime;
        tbAdministerationCount.SetBinding(TextBlock.FontWeightProperty, tbAdministerationCountFontWeightBinding);

        let tbAdministerationCountForegroundBinding = new Binding(dataContext, "ACFontColor");
        tbAdministerationCountForegroundBinding.Mode = BindingMode.OneTime;
        tbAdministerationCount.SetBinding(TextBlock.ForegroundProperty, tbAdministerationCountForegroundBinding);


        let SP2Border1 = new Border();
        SP2Border1.noDefaultStyle = true;
        SP2Border1.Width = "Auto";
        SP2Border1.Background = "Transparent";
        SP2Border1.BorderThickness = "0";

        // let SP2Border1ToolTipBinding = new Binding(dataContext,"StatusIcon.Tooltip");
        // SP2Border1.SetBinding(Border.ToolTipProperty, SP2Border1ToolTipBinding);

        let Image1 = new Image();
        Image1.Cursor = "Arrow";
        Image1.Width = "16";
        Image1.Height = "16";

      

        let Image1ToolTipBinding = new Binding(dataContext, "StatusIcon.Tooltip");
        Image1ToolTipBinding.Mode = BindingMode.OneTime;
        Image1.SetBinding(Image.ToolTipProperty, Image1ToolTipBinding);
        if(dataContext.IsLastColumn){
            Image1.TooltipPosition = "left";
          }

        let Image1TagBinding = new Binding(dataContext, "StatusIcon");
        Image1TagBinding.Mode = BindingMode.OneTime;
        Image1.SetBinding(Image.TagProperty, Image1TagBinding);


        let Image1IsHitTestVisibleBinding = new Binding(dataContext, "StatusIcon.EnableOnHotSpotClick");
        Image1IsHitTestVisibleBinding.Mode = BindingMode.OneTime;
        Image1.SetBinding(Image.IsHitTestVisibleProperty, Image1IsHitTestVisibleBinding);

        let Image1SourceBinding = new Binding(dataContext, "StatusIcon.UriString");
        Image1SourceBinding.Mode = BindingMode.OneTime;
        let Image1ConverterPipe = new ImageURIBitMapPipe();
        Image1SourceBinding.Converter = Image1ConverterPipe;
        Image1.SetBinding(Image.SourceProperty, Image1SourceBinding);
        Image1.DataContext = dataContext;
        if (_.get(dataContext, 'StatusIcon.EnableOnHotSpotClick'))
            Image1.MouseLeftButtonDown = (s, e) => iMedicationChart.oMedicationChart.FireImageClick(s, e);
        if (_.get(Image1, 'Source')) {
            SP2Border1.Child = Image1;
        }

        let tbReasonForNotGiven = new TextBlock();
        //tbReasonForNotGiven.Grid.Row = "1";
        tbReasonForNotGiven.Name = "tbReasonForNotGiven";

        let tbReasonForNotGivenTextBinding = new Binding(dataContext, "ReasonForNotGiven");
        tbReasonForNotGivenTextBinding.Mode = BindingMode.OneTime;
        tbReasonForNotGiven.SetBinding(TextBlock.TextProperty, tbReasonForNotGivenTextBinding);

        let tbReasonForNotGivenFontWeightBinding = new Binding(dataContext, "ReasonFontWeight");
        tbReasonForNotGivenFontWeightBinding.Mode = BindingMode.OneTime;
        tbReasonForNotGiven.SetBinding(TextBlock.FontWeightProperty, tbReasonForNotGivenFontWeightBinding);

        let tbReasonForNotGivenFontSizeBinding = new Binding(dataContext, "ReasonFontSize");
        tbReasonForNotGivenFontSizeBinding.Mode = BindingMode.OneTime;
        tbReasonForNotGiven.SetBinding(TextBlock.FontSizeProperty, tbReasonForNotGivenFontSizeBinding);

        let tbReasonForNotGivenForegroundBinding = new Binding(dataContext, "ReasonFontColor");
        tbReasonForNotGivenForegroundBinding.Mode = BindingMode.OneTime;
        tbReasonForNotGiven.SetBinding(TextBlock.ForegroundProperty, tbReasonForNotGivenForegroundBinding);

        tbReasonForNotGiven.TextWrapping = "Wrap";

        let tbReasonToolTip = new TextBlock();
        tbReasonToolTip.TextWrapping = "Wrap";
        let tbReasonToolTipTextBinding = new Binding(dataContext, "ReasonToolTip")
        tbReasonToolTipTextBinding.Mode = BindingMode.OneTime;
        tbReasonToolTip.SetBinding(TextBlock.TextProperty, tbReasonToolTipTextBinding);

        tbReasonForNotGiven.ToolTip = tbReasonToolTip;
        //     <ToolTipService.ToolTip>
        //     <Border MaxWidth="400">
        //     <TextBlock Text="{Binding ReasonToolTip}" TextWrapping="Wrap"/>
        //     </Border>
        //   </ToolTipService.ToolTip> 

        StackPanel2.Children.Add(tbAdministerationCount);
        StackPanel2.Children.Add(SP2Border1);
        StackPanel2.Children.Add(tbReasonForNotGiven);

        let tbDose = new TextBlock();
        tbDose.Margin = "1";
        tbDose.VerticalAlignment = "Top";
        // tbDose.Grid.Row = "2";
        tbDose.HorizontalAlignment = "Center";
        tbDose.Name = "tbDose";

        let tbDoseTextBinding = new Binding(dataContext, "Dose");
        tbDoseTextBinding.Mode = BindingMode.OneTime;
        tbDose.SetBinding(TextBlock.TextProperty, tbDoseTextBinding);

        tbDose.TextWrapping = "Wrap";
        tbDose.IsWordwrap = true;
        tbDose.style.whiteSpace = 'normal';
        let tbDoseToolTipBinding = new Binding(dataContext, "Dose");
        tbDoseToolTipBinding.Mode = BindingMode.OneTime;
        tbDose.SetBinding(TextBlock.ToolTipProperty, tbDoseToolTipBinding);


        let Border2 = new Border();
        Border2.noDefaultStyle = true;
        Border2.VerticalAlignment = "Bottom";
        // Border2.Grid.Row = "3";
        Border2.HorizontalAlignment = "Right";
        Border2.Margin = "0";
        Border2.Background = "Transparent";
        Border2.BorderThickness = "0";


        // let Border2ToolTipBinding = new Binding(dataContext,"AdministrationIcon.Tooltip");
        // Border2.SetBinding(Border.ToolTipProperty, Border2ToolTipBinding);

        let Border2VisibilityBinding = new Binding(dataContext,"AdministrationIcon.ImageVisiblity");
        Border2VisibilityBinding.Mode = BindingMode.OneTime;
        let Border2ConverterPipe = new VisibilityConvertorPipe();
        Border2VisibilityBinding.Converter = Border2ConverterPipe;
        Border2.SetBinding(Border.VisibilityProperty, Border2VisibilityBinding);

        Border2.Width = "Auto";

        let imgAdministrativeIcon = new Image();
        imgAdministrativeIcon.Name = "imgAdministrativeIcon";

        let imgAdministrativeIconIsHitTestVisibleBinding = new Binding(dataContext, "AdministrationIcon.EnableOnHotSpotClick");
        imgAdministrativeIconIsHitTestVisibleBinding.Mode = BindingMode.OneTime;
        imgAdministrativeIcon.SetBinding(Image.IsHitTestVisibleProperty, imgAdministrativeIconIsHitTestVisibleBinding);

        let imgAdministrativeIconToolTipBinding = new Binding(dataContext, "AdministrationIcon.Tooltip");
        imgAdministrativeIconToolTipBinding.Mode = BindingMode.OneTime;
        imgAdministrativeIcon.SetBinding(Image.ToolTipProperty, imgAdministrativeIconToolTipBinding);

        imgAdministrativeIcon.HorizontalAlignment = "Right";
        imgAdministrativeIcon.VerticalAlignment = "Bottom";
        imgAdministrativeIcon.Cursor = "Hand";
        imgAdministrativeIcon.Width = "10";
        imgAdministrativeIcon.Height = "10";
        imgAdministrativeIcon.Margin = '0,0,0,-3'; // need to test for bugid 47780

        let imgAdministrativeIconTagBinding = new Binding(dataContext, "AdministrationIcon");
        imgAdministrativeIconTagBinding.Mode = BindingMode.OneTime;
        imgAdministrativeIcon.SetBinding(Image.TagProperty, imgAdministrativeIconTagBinding);


        let imgAdministrativeIconSourceBinding = new Binding(dataContext, "AdministrationIcon.UriString");
        imgAdministrativeIconSourceBinding.Mode = BindingMode.OneTime;
        let imgAdministrativeIconConverterPipe = new ImageURIBitMapPipe();
        imgAdministrativeIconSourceBinding.Converter = imgAdministrativeIconConverterPipe;
        imgAdministrativeIcon.SetBinding(Image.SourceProperty, imgAdministrativeIconSourceBinding);
        imgAdministrativeIcon.DataContext = dataContext;
        if (_.get(dataContext, 'AdministrationIcon.EnableOnHotSpotClick'))
            imgAdministrativeIcon.MouseLeftButtonDown = (s, e) => iMedicationChart.oMedicationChart.FireImageClick(s, e);
        if (_.get(imgAdministrativeIcon, 'Source')) {
            console.log("imgAdministrativeIcon", imgAdministrativeIcon);
            Border2.Child = imgAdministrativeIcon;
        }

        Grid1.Children.Add(StackPanel1);
        Grid1.SetGridRow(StackPanel1, 1);

        Grid1.Children.Add(StackPanel2);
        Grid1.SetGridRow(StackPanel2, 2);

        let itemStyle2 = { 'display': `flex`, 'flex-direction': `row`, 'justify-content': `center`, 'align-items': `center`};
        Grid1.SetColumnRowStyle(itemStyle2, 2, 1);

        //UI Check

        // Grid1.Children.Add(tbAdministerationCount);
        // Grid1.SetGridRow(tbAdministerationCount, 2);

        // Grid1.Children.Add(tbReasonForNotGiven);
        // Grid1.SetGridRow(tbReasonForNotGiven, 2);

        Grid1.Children.Add(tbDose);
        Grid1.SetGridRow(tbDose, 3);

        Grid1.Children.Add(Border2);
        Grid1.SetGridRow(Border2, 4);

        let itemStyle = { 'display': `flex`, 'flex-direction': `row`, 'justify-content': `flex-end`, 'align-items': `flex-end`};
        Grid1.SetColumnRowStyle(itemStyle, 4, 1);

        Border1.Child = Grid1;
    let _mediatorDataService = InjectorInstance.get<MediatorDataService>(MediatorDataService);
        
        Border1.isControlRendered = _mediatorDataService.rowVirtualization;
        doseOverViewSlot.Content = Border1;
        return doseOverViewSlot.Content;
    }
}