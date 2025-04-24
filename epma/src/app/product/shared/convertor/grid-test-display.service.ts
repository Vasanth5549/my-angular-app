import { Color, Colors, FontFamily, FontStyles, FontWeights, GridLength, iLabel, Run, SolidColorBrush, TextAlignment, TextBlock, TextWrapping, Thickness, ToolTipService } from "epma-platform/controls";
import { ObjectHelper } from "epma-platform/helper";
import { CultureInfo } from "epma-platform/models";
import { IPPMABaseVM } from "src/app/lorappmanageprescriptionbbui/viewmodel/ippmabasevm";
import { ColumnDefinition, Grid, RowDefinition } from "src/app/shared/epma-platform/controls/epma-grid/epma-grid.component";
import { Type } from "../models/Common";

export class GridTestDisplay { // public class GpConnectWarningDisplay
    public Convert(value: Object, targetType: any, parameter: Object, culture: any): Object {
        let vm: IPPMABaseVM = ObjectHelper.CreateType<IPPMABaseVM>(value, IPPMABaseVM);
        let grid : Grid = ObjectHelper.CreateObject(new Grid(), { 
            Background : new SolidColorBrush(Color.FromArgb(255,247,234,206)), 
            Margin : new Thickness(0) 
        });
       

        let txtBox : TextBlock = new TextBlock();
        txtBox.FontFamily = new FontFamily("Verdana");
        txtBox.Foreground = new SolidColorBrush(Colors.Brown);
        txtBox.FontStyle = FontStyles.Normal;
        txtBox.FontWeight = FontWeights.Normal;
        txtBox.TextWrapping = TextWrapping.Wrap;
        txtBox.TextAlignment = TextAlignment.Left;

        txtBox.Inlines.Add(ObjectHelper.CreateObject(new Run(), { Text : 'Test Purpose' }))
       
        grid.Children.Add(txtBox);
        return grid;
    }
}

export class GridTestDisplay1 { // public class GPConnectPresItemDetail
    public Convert(value: Object, targetType: any, parameter: Object, culture: any): Object {
        let vm: IPPMABaseVM = ObjectHelper.CreateType<IPPMABaseVM>(value, IPPMABaseVM);
        let mainGrid : Grid = ObjectHelper.CreateObject(new Grid(), { 
            Background : new SolidColorBrush(Color.FromArgb(255, 106, 160, 160)),
            Margin : new Thickness(0, 0, 10, 0)
        });
       

        let mainBlock : TextBlock = new TextBlock();
        mainBlock.TextWrapping = TextWrapping.Wrap;
        // mainBlock.Padding = new Thickness(10, 10, 10, 10);

        let tbToolTip : TextBlock = new TextBlock();
        tbToolTip.MaxWidth = 300;

        mainBlock.Inlines.Add(ObjectHelper.CreateObject(new Run(), { 
            Text : "GPConnectDetails", 
            FontStyle : FontStyles.Normal,
            FontFamily : new FontFamily("Verdana"),
            Foreground : new SolidColorBrush(Colors.Black),
            FontWeight : FontWeights.Bold
        }));

        mainBlock.Inlines.Add(ObjectHelper.CreateObject(new Run(), { 
            Text : "MedicationItemDetail", 
            FontStyle : FontStyles.Normal,
            FontFamily : new FontFamily("Verdana"),
            Foreground : new SolidColorBrush(Colors.White),
            FontWeight : FontWeights.Bold
        }));

        tbToolTip.Inlines.Add(ObjectHelper.CreateObject(new Run(), { 
            Text : "MedicationItemDetail", 
            FontStyle : FontStyles.Normal,
            FontFamily : new FontFamily("Verdana"),
            Foreground : new SolidColorBrush(Colors.Black),
            FontWeight : FontWeights.Bold
        }));
       
        mainGrid.Children.Add(mainBlock);
        mainGrid.SetValue(ToolTipService.ToolTipProperty, tbToolTip);
        return mainGrid;
    }
}

export class GridTestDisplay2 { // public class SupplyHistory
    public Convert(value: Object, targetType: any, parameter: Object, culture: any): Object {
        let layout : Grid = new Grid();
        let oColumnDefinition : ColumnDefinition = new ColumnDefinition();
        oColumnDefinition.Width = GridLength.Auto;
        layout.ColumnDefinitions.Add(oColumnDefinition);
        let oColumnDefinition1 : ColumnDefinition = new ColumnDefinition();
        oColumnDefinition1.Width = GridLength.Auto;
        layout.ColumnDefinitions.Add(oColumnDefinition1);

        layout.RowDefinitions.Add(new RowDefinition());

        let status : iLabel = new iLabel();
        status.Text = "Dispstatus";
        status.Margin = new Thickness(5);

        status.Name = "test";
       
        layout.Children.Add(status);

        Grid.SetColumn(status, 0);
        Grid.SetRow(status, 1);


        let status1 : iLabel = new iLabel();
        status1.Text = "Dispstatus - 2";
        status1.Margin = new Thickness(5);

        status1.Name = "test1";

        layout.Children.Add(status1);

        Grid.SetColumn(status1, 1);
        Grid.SetRow(status, 1);
       
        return layout;
    }
}
export class TestDisplay {
    public Convert(value: Object, targetType: Type, parameter: Object, culture: CultureInfo): Object {
        let vm: IPPMABaseVM = ObjectHelper.CreateType<IPPMABaseVM>(value, IPPMABaseVM);
        let layout: Grid = ObjectHelper.CreateObject(new Grid(), { Background: new SolidColorBrush(Color.FromArgb(255, 247, 234, 206)), Margin: new Thickness(0) });
        let oColumnDefinition = new ColumnDefinition();
        oColumnDefinition.Width = GridLength.Auto;
        layout.ColumnDefinitions.Add(oColumnDefinition);
        let oColumnDefinition1 = new ColumnDefinition();
        oColumnDefinition1.Width = GridLength.Auto;
        layout.ColumnDefinitions.Add(oColumnDefinition1);

        layout.RowDefinitions.Add(new RowDefinition());
        return layout;
    }
}
export module StartDTTMDisplay {
    export enum EnumVals {
        CC_EXPJAN = 1,
        CC_EXPFEB = 2,
        CC_EXPMAR = 3,
        CC_EXPAPR = 4,
        CC_EXPMAY = 5,
        CC_EXPJUNE = 6,
        CC_EXPJULY = 7,
        CC_EXPAUG = 8,
        CC_EXPSEP = 9,
        CC_EXPOCT = 10,
        CC_EXPNOV = 11,
        CC_EXPDEC = 12
    }
}
