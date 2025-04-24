import { NgModule } from '@angular/core';
import {
    Border,
    iButton,
    iCheckBox,
    CheckBox,
    iComboBox,
    iLabel,
    iRadioButton,
    iTextBox,
    TextBlock,
    Image,
    RichTextBox,
    Grid,
    iTimeBox,
    ContentPresenter,
    iMultiSelectDropdown,
    iPowerSearch,
    StackPanel,
    iTab,
    iTabItem, iDateTimePicker, iHyperlinkButton, iCheckedListbox, ScrollViewer, iUpDownBox,
    WrapPanel,
    iTreeViewControl,
    DataTemplate,
    iImage,
    iBookMark,
    iTerminologyBrowser,
    iToggleDropDown,
    iListBox,
    Run,
    GridItem,
    Ellipse,
    AppDialog,
    IMessageBoxComponent,
    iActivityConsideration,
    InlineUIContainer,
    iBusyIndicatorDialog,
    ContentControl,
  } from 'epma-platform/controls';

  import { IndicatorsModule } from '@progress/kendo-angular-indicators';
import { ListBoxModule } from '@progress/kendo-angular-listbox';

import { TooltipsModule, PopoverModule } from '@progress/kendo-angular-tooltip';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { ButtonModule, ButtonsModule } from '@progress/kendo-angular-buttons';
import { LabelModule } from '@progress/kendo-angular-label';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { DialogsModule, WindowModule } from '@progress/kendo-angular-dialog';
import { GridModule } from '@progress/kendo-angular-grid';
import { TreeViewModule } from '@progress/kendo-angular-treeview';
import { NotificationModule } from '@progress/kendo-angular-notification';

import { IconsModule, SVGIconModule } from '@progress/kendo-angular-icons';
import { KendoModule } from './modules/kendo.module';

import { ChartsModule } from '@progress/kendo-angular-charts';
import 'hammerjs';

import { MenusModule } from '@progress/kendo-angular-menu';
import { PopupModule } from '@progress/kendo-angular-popup';
import { GridBorderComponent } from './shared/epma-platform/controls/epma-grid-helpers/grid-border.component';
import { ControlTemplate } from './shared/epma-platform/controls/epma-grid-helpers/control-template.component';
import { Line } from './shared/epma-platform/controls/line.component/line.component';
import { CanvasImage } from './shared/epma-platform/controls/epma-canvas-image/epma-canvas-image.component';
import { Canvas } from './shared/epma-platform/controls/epma-canvas/epma-canvas.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RadExpander } from './shared/epma-platform/controls/epma-radExpander/epma-radExpander.component';

import { EpmaDcStackpanelComponent } from './shared/epma-platform/controls/epma-dc-stackpanel/epma-dc-stackpanel.component';
import { GridDataTemplate } from './shared/epma-platform/controls/epma-grid-datatemplate/epma-grid-datatemplate.component';

import { iSFS } from './shared/epma-platform/controls/epma-isfs/epma-isfs.component';
import { PowerSearchComponent } from './power-search/power-search.component';
import { PowercardComponent } from './shared/epma-platform/controls/epma-ipowersearchcontrol/power-search-card/power-search-card.component';
import { epmaMarginDirective } from './shared/epma-platform/controls/Directives/margin.directive';
import { GridCellTemplateComponent } from './shared/epma-platform/controls/epma-grid-helpers/grid-cell-template/grid-cell-template.component';
import { GridCellEditTemplateComponent } from './shared/epma-platform/controls/epma-grid-helpers/grid-cell-edit-template/grid-cell-edit-template.component';

import { BoxmodelDirective } from './shared/epma-platform/controls/Directives/boxmodel.directive';
import {
  FontSizeDirective,
  FontWeightDirective,
} from './shared/epma-platform/controls/Directives/fonts.directive';
import { CommonDirective, CommonGridLayoutDirective, GridLayoutDirective, VisibilityWidthDirective, containerStyleDirective } from './shared/epma-platform/controls/Directives/common.directive';
import { GridProperties } from './shared/epma-platform/controls/epma-grid-helpers/grid.directive';
import { GridColumnProperties } from './shared/epma-platform/controls/epma-grid-helpers/grid-column.directive';
import { ScrollBarViewer } from './shared/epma-platform/controls/epma-grid-helpers/scroll-viewer.directive';
import { CommonModule } from '@angular/common';
import { CellStyle } from './shared/epma-platform/controls/epma-grid-helpers/cell-style.component';
import { CustomToolTipWidthPipe, FormatTextPipe } from './product/shared/pipes/medicationconverters.pipe';
import { UniqueNameDirective } from './shared/epma-platform/controls/epma-grid-helpers/grid-extension';

import { InfRecAdmBagDetails } from './lorappmedicationadminbbui/child/InfRecAdmBagDetails';
import { medbagdetails } from './lorappmedicationcommonbb/view/medbagdetails/medbagdetails.component';
@NgModule({
    imports: [
        // BrowserModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        IconsModule,
        ButtonModule,
        DialogsModule,
        SVGIconModule,
        IndicatorsModule,
        ListBoxModule,
        KendoModule,
        PopoverModule,
        DateInputsModule,
        ButtonsModule,
        LabelModule,
        GridModule,
        LayoutModule,
        DropDownsModule,
        InputsModule,
        WindowModule,
        TooltipsModule,
        TreeViewModule,
        PopupModule,
        InputsModule,
        NotificationModule,
        ChartsModule,
        MenusModule,
     ],
    declarations: [
        BoxmodelDirective,
        FontSizeDirective,
        FontWeightDirective,
        CommonDirective,
        GridLayoutDirective,
        CommonGridLayoutDirective,
        VisibilityWidthDirective,
        containerStyleDirective,
        Border,
        iButton,
        iCheckBox,
        CheckBox,
        iComboBox,
        iLabel,
        iRadioButton,
        iTextBox,
        TextBlock,
        Image,
        RichTextBox,
        Grid,
        iTimeBox,
        ContentPresenter,
        iMultiSelectDropdown,
        iPowerSearch,
        StackPanel,
        iTab,
        iTabItem, iDateTimePicker, iHyperlinkButton, iCheckedListbox, ScrollViewer, iUpDownBox,
        WrapPanel,
        iTreeViewControl,
        DataTemplate,
        iImage,
        iBookMark,
        iTerminologyBrowser,
        iToggleDropDown,
        iListBox,
        Run,
        GridItem,
        Ellipse,
        AppDialog,
        IMessageBoxComponent,
        GridBorderComponent,
        ControlTemplate,
        Canvas,
        Line,
        CanvasImage,
        RadExpander,
        EpmaDcStackpanelComponent,
        GridDataTemplate,
        iSFS,
        PowerSearchComponent,
        PowercardComponent,
        epmaMarginDirective,
        iActivityConsideration,
        GridCellTemplateComponent,
        GridCellEditTemplateComponent,
        InlineUIContainer,
        iBusyIndicatorDialog,
        ContentControl,
        GridProperties,
        GridColumnProperties,
        ScrollBarViewer,
        CellStyle,
        FormatTextPipe,
        CustomToolTipWidthPipe,
        UniqueNameDirective,
        InfRecAdmBagDetails,
        medbagdetails
    ],
    exports: [
        BoxmodelDirective,
        FontSizeDirective,
        FontWeightDirective,
        CommonDirective,
        UniqueNameDirective,
        GridLayoutDirective,
        CommonGridLayoutDirective,
        VisibilityWidthDirective,
        containerStyleDirective,
        Border,
        iButton,
        iCheckBox,
        CheckBox,
        iComboBox,
        iLabel,
        iRadioButton,
        iTextBox,
        TextBlock,
        Image,
        RichTextBox,
        Grid,
        iTimeBox,
        ContentPresenter,
        iMultiSelectDropdown,
        iPowerSearch,
        StackPanel,
        iTab,
        iTabItem, iDateTimePicker, iHyperlinkButton, iCheckedListbox, ScrollViewer, iUpDownBox,
        WrapPanel,
        iTreeViewControl,
        DataTemplate,
        iImage,
        iBookMark,
        iTerminologyBrowser,
        iToggleDropDown,
        iListBox,
        Run,
        GridItem,
        Ellipse,
        AppDialog,
        IMessageBoxComponent,
        GridBorderComponent,
        ControlTemplate,
        Canvas,
        Line,
        CanvasImage,
        RadExpander,
        EpmaDcStackpanelComponent,
        GridDataTemplate,
        iSFS,
        PowerSearchComponent,
        PowercardComponent,
        epmaMarginDirective,
        iActivityConsideration,
        GridCellTemplateComponent,
        GridCellEditTemplateComponent,
        InlineUIContainer,
        iBusyIndicatorDialog,
        ContentControl,
        GridProperties,
        GridColumnProperties,
        ScrollBarViewer,
        CellStyle,
        FormatTextPipe,
        CustomToolTipWidthPipe,
        InfRecAdmBagDetails,
        medbagdetails
    ]
})
 
export class SharedModule {}