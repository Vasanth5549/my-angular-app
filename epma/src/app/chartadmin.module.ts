import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ChartadminRoutingModule } from './chartadmin-routing.module';
import { SharedModule } from './epma-shared.module';

// import { MedsAdminMainView } from './lorappmedicationadminbbui/view/MedsAdminMainView';
import { MedsAdminObservationView } from './lorappmedicationadminbbui/view/MedsAdminObservationView';
import { MedsRecordAdminstrator } from './lorappmedicationadminbbui/child/medsadminrecordadmin';
import { MedsAdminChartView } from './lorappmedicationadminbbui/view/MedsAdminChartView';
// import { InfRecAdmBagDetails } from './lorappmedicationadminbbui/child/InfRecAdmBagDetails';
import { DrugHeader } from './lorappmedicationadminbbui/common/drugheader';
import { InfusionChartView } from './lorappmedicationadminbbui/view/InfusionChartView';
import { MedsAdminPrescChartView } from './lorappmedicationadminbbui/view/medsadminprescchartview';
import { MedScanRecordAdministration } from './lorappmedicationadminbbui/child/MedScanRecordadministration';
import { MedAmendMessage } from './lorappmedicationadminbbui/view/MedAmendMessage';
import { ConditionalDoseRegimeView } from './lorappmedicationadminbbui/view/ConditionalDoseRegimeView';
import { MedRequestCA } from './lorappmedicationadminbbui/view/MedRequestCA';
import { InfRecAdmMainView } from './lorappmedicationadminbbui/child/InfRecAdmMainView';
import { InfRecAdmContBegun } from './lorappmedicationadminbbui/child/InfRecAdmContBegun';
import { InfRecAdmContStop } from './lorappmedicationadminbbui/child/InfRecAdmContStop';
import { InfRecAdmContDefer } from './lorappmedicationadminbbui/child/InfRecAdmContDefer';
import { InfRecAdmContResume } from './lorappmedicationadminbbui/child/InfRecAdmContResume';
import { InfRecAdmCSFStopComplete } from './lorappmedicationadminbbui/child/InfRecAdmCSFStopCompleted';
import { InfRecAdmConditionalDose } from './lorappmedicationadminbbui/child/InfRecAdmConditionalDose';
import { InfRecAdmContChangeFlowRate } from './lorappmedicationadminbbui/child/InfRecAdmContChangeFlowRate';
import { ConditionalDoseChildView } from './lorappmedicationadminbbui/child/ConditionalDoseChildView';
import { InfRecAdmCSFChangeBag } from './lorappmedicationadminbbui/child/InfRecAdmCSFChangeBag';
import { TestInfRecAdminManiView } from './lorappmedicationadminbbui/child/TestInfRecAdmin-ManiView';
import { MedsAdminDoseDiscrepancyReason } from './lorappmedicationadminbbui/child/medsadmindosediscrepancyreason';
import { InfRecAdmPCASummaryView } from './lorappmedicationadminbbui/child/InfRecAdmPCASummaryView';
import { InfRecAdmGasSummaryView } from './lorappmedicationadminbbui/child/InfRecAdmGasSummaryView';
import { MedicationAdminView } from './lorappmedicationadminbbui/ca/medicationadmin/medicationadminview';
import { MedsAdminDischgPrescriptions } from './lorappmedicationadminbbui/child/medsadmindischgprescriptions.component';
import { MedsAdminPRNSlot } from './lorappmedicationadminbbui/child/MedsAdminPRNSlot';
import { MedsAdminMultiSlot } from './lorappmedicationadminbbui/child/MedsAdminMultiSlot';
import { InfRecAdmContSummaryView } from './lorappmedicationadminbbui/child/InfRecAdmContSummaryView';
import { InfRecAdmGasBegun } from './lorappmedicationadminbbui/child/InfRecAdmGasBegun';
import { InfRecAdmPCAChangeBag } from './lorappmedicationadminbbui/child/InfRecAdmPCAChangeBag';
import { MedsAdminManageSelfAdminChild } from './lorappmedicationadminbbui/child/MedsAdminManageSelfAdminChild';
import { MixedMultiRouteAdminSelection } from './lorappmedicationadminbbui/child/MixedMultiRouteAdminSelection';
import { RecordPGD } from './lorappmedicationadminbbui/child/recordpgd';
import { MedsAdminModifyOrStrikethrough } from './lorappmedicationadminbbui/child/MedsAdminModifyOrStrikethrough';
import { ModifyStrikethroughLink } from './lorappmedicationadminbbui/child/ModifyStrikethroughLink';
import { OverrideBarcodeScan } from './lorappmedicationadminbbui/child/OverrideBarcodeScan';
import { InfRecAdmStrikeThrough } from './lorappmedicationadminbbui/child/InfRecAdmStrikeThrough';
import { MedsAdminModifyAdministration } from './lorappmedicationadminbbui/child/MedsAdminModifyAdministration';
import { MedsAdminChartOverView } from './lorappmedicationadminbbui/view/MedsAdminChartOverView';
import { MedSortFilterbyOptions } from './lorappmedicationadminbbui/child/MedSortFilterbyOptions';
import { OmitIndefinite } from './lorappmedicationadminbbui/child/OmitIndefinite';
import { MedsadminOmitslots } from './lorappmedicationadminbbui/child/medsadminomitslots';
import { OmitSelectedSlots } from './lorappmedicationadminbbui/child/OmitSelectedSlots';
import { OmitUntil } from './lorappmedicationadminbbui/child/OmitUntil';
import { MedsAdminReinstateslots } from './lorappmedicationadminbbui/child/MedsAdminReinstateslots';
import { EnterTitratedDose } from './lorappmedicationadminbbui/child/EnterTitratedDose';
import { MedsAdminStrikethrough } from './lorappmedicationadminbbui/child/MedsAdminStrikethrough';
import { ObservationResultTextChild } from './lorappmedicationadminbbui/child/observationresulttextchild';
import { MedsAdminObservationTooltip } from './lorappmedicationadminbbui/child/MedsAdminObservationTooltip';


import { iInfusionChart } from './lorarcbluebirdmedicationchart/iInfusionChart/iInfusionChart';
import { ActionByWrapConverterPipe, CommentsWrapConverterPipe, DisplayMultiSlotDetailPipe, DisplayOtherInformationLineItemMedPipe, DisplayPrescriptionLineItemMedPipe, DisplayPrescriptionLineMedsItemPipe, DoseWrapConverterPipe, DoseWrapMedConverterPipe, FalseToVisibilityConverterPipe, FontWeightConvPipe, HumidificationConverterPipe, ImageURIBitMapPipe, InfoMedIconPipe, InfusionDoseWrapConverterPipe, InfusionRouteWrapConverterPipe, LineBreakWrapConverterPipe, MCItemDisplayMedsItemPipe, MedScanProdDisplayPrescribedItemConverterPipe, OmitWrapConverterPipe, PrescribedByWrapConverterPipe, ReasonWrapConverterPipe, ReviewWrapConverterPipe, RouteWrapConverterPipe, RouteWrapMedConverterPipe, StartDTWrapConverterPipe, StatusIconPipe, StopDTWrapConverterPipe, TargetsatrangeConverterPipe, TimeConvertorPipe, TypeIconPipe, VisibilityConvertorPipe } from './lorarcbluebirdmedicationchart/converter/MedChartConverter.pipe';
import { InfusionCell } from './lorarcbluebirdmedicationchart/iInfusionChart/infusion-cell/infusion-cell.component';
import { iMedicationChart } from './lorarcbluebirdmedicationchart/iMedicationChart/iMedicationChart.component';
import { GridModule } from '@progress/kendo-angular-grid';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IconsModule, SVGIconModule } from '@progress/kendo-angular-icons';
import { ButtonModule, ButtonsModule } from '@progress/kendo-angular-buttons';
import { DialogsModule, WindowModule } from '@progress/kendo-angular-dialog';
import { IndicatorsModule } from '@progress/kendo-angular-indicators';
import { ListBoxModule } from '@progress/kendo-angular-listbox';
import { KendoModule } from './modules/kendo.module';
import { PopoverModule, TooltipsModule } from '@progress/kendo-angular-tooltip';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { LabelModule } from '@progress/kendo-angular-label';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { TreeViewModule } from '@progress/kendo-angular-treeview';
import { PopupModule } from '@progress/kendo-angular-popup';
import { NotificationModule } from '@progress/kendo-angular-notification';
import { ChartsModule } from '@progress/kendo-angular-charts';
import { MenusModule } from '@progress/kendo-angular-menu';
// import { medbagdetails } from './lorappmedicationcommonbb/view/medbagdetails/medbagdetails.component';
import { MedsAdminMainView } from './lorappmedicationadminbbui/view/MedsAdminMainView';
import { SlotDetailVM } from './lorappmedicationadminbbui/viewmodel/MedicationChartVM';

// import { medbagdetails } from './lorappmedicationcommonbb/view/medbagdetails/medbagdetails.component';
// import { CellStyle } from './shared/epma-platform/controls/epma-grid-helpers/cell-style.component';

@NgModule({
  declarations: [    
  
    MedsAdminPrescChartView,
    MedsAdminObservationView,
    MedsRecordAdminstrator,
    MedsAdminChartView,
    DrugHeader,
    // InfRecAdmBagDetails,
    InfusionChartView,
    MedScanRecordAdministration,
    MedAmendMessage,
    ConditionalDoseRegimeView,
    MedRequestCA,
    InfRecAdmMainView,
    InfRecAdmContBegun,
    InfRecAdmContStop,
    InfRecAdmContDefer,
    InfRecAdmContResume,
    InfRecAdmCSFStopComplete,
    InfRecAdmConditionalDose,
    InfRecAdmContChangeFlowRate,
    ConditionalDoseChildView,
    InfRecAdmCSFChangeBag,
    TestInfRecAdminManiView,
    MedsAdminDoseDiscrepancyReason,
    InfRecAdmPCASummaryView,
    InfRecAdmGasSummaryView,
    MedicationAdminView,
    MedsAdminDischgPrescriptions,
    MedsAdminPRNSlot,
    MedsAdminMultiSlot,
    InfRecAdmContSummaryView,
    InfRecAdmGasBegun,
    InfRecAdmPCAChangeBag,
    MedsAdminManageSelfAdminChild,
    MixedMultiRouteAdminSelection,
    RecordPGD,
    MedsAdminModifyOrStrikethrough,
    ModifyStrikethroughLink,
    OverrideBarcodeScan,
    InfRecAdmStrikeThrough,
    MedsAdminModifyAdministration,
    MedsAdminChartOverView,
    MedSortFilterbyOptions,
    OmitIndefinite,
    MedsadminOmitslots,
    OmitSelectedSlots,
    OmitUntil,
    MedsAdminReinstateslots,
    EnterTitratedDose,
    MedsAdminStrikethrough,
    ObservationResultTextChild,
    MedsAdminObservationTooltip,

    // medbagdetails,
    // CellStyle,
    MedsAdminMainView,
    iInfusionChart,
    DisplayPrescriptionLineMedsItemPipe,
    DoseWrapConverterPipe,
    HumidificationConverterPipe,
    RouteWrapConverterPipe,
    TargetsatrangeConverterPipe,
    MedScanProdDisplayPrescribedItemConverterPipe,
    DisplayOtherInformationLineItemMedPipe,
    DisplayMultiSlotDetailPipe,
    DisplayPrescriptionLineItemMedPipe,
    ImageURIBitMapPipe,
    VisibilityConvertorPipe,
    StartDTWrapConverterPipe,
    StopDTWrapConverterPipe,
    ReviewWrapConverterPipe,
    CommentsWrapConverterPipe,
    ReasonWrapConverterPipe,
    ActionByWrapConverterPipe,
    PrescribedByWrapConverterPipe,
    InfusionRouteWrapConverterPipe,
    OmitWrapConverterPipe,
    LineBreakWrapConverterPipe,
    InfusionDoseWrapConverterPipe,
    TimeConvertorPipe,
    TypeIconPipe,
    StatusIconPipe,
    FalseToVisibilityConverterPipe,
    InfoMedIconPipe,
    RouteWrapMedConverterPipe,
    DoseWrapMedConverterPipe,
    FontWeightConvPipe,
    MCItemDisplayMedsItemPipe,
    InfusionCell,
    iMedicationChart,

    
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
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
    ChartadminRoutingModule,
    SharedModule,
  ]
})
export class ChartadminModule { }
