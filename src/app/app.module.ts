import {
  APP_INITIALIZER,
  Injector,
  NgModule,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DefaultUrlSerializer, RouterModule, Routes, UrlSerializer, UrlTree } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { IconsModule, SVGIconModule } from '@progress/kendo-angular-icons';
import { MediatorDataService } from './shared/epma-platform/services/mediator-data.service';
import { Observable } from 'rxjs';
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
// import { IMessageBoxComponent } from './shared/epma-platform/controls/iMessageBox/imessagebox.component';
// import { AppDialog } from './shared/epma-platform/controls/app-dialog/app-dialog.component';
// import { iBusyIndicatorDialog } from './shared/epma-platform/controls/iBusyIndicator-dialog/iBusyIndicator-dialog.component';
import { BusyIndicator } from 'epma-platform/services';
// import { iMedicationChart } from './lorarcbluebirdmedicationchart/iMedicationChart/iMedicationChart.component';

import {
  // Border,
  // iButton,
  // iCheckBox,
  // CheckBox,
  // iComboBox,
  // iLabel,
  // iRadioButton,
  // iTextBox,
  // TextBlock,
  // Image,
  // RichTextBox,
  // Grid,
  // iTimeBox,
  // ContentPresenter,
  // iMultiSelectDropdown,
  // iPowerSearch,
  // StackPanel,
  // iTab,
  // iTabItem, iDateTimePicker, iHyperlinkButton, iCheckedListbox, 
  ScrollViewer,
  //  iUpDownBox,
  // WrapPanel,
  // iTreeViewControl,
  // DataTemplate,
  // iImage,
  // iBookMark,
  // iTerminologyBrowser,
  // iToggleDropDown,
  // iListBox,
  // Run,
  // GridItem,
  // Ellipse,
} from 'epma-platform/controls';

import {
  
  CListItemsDisplayPipe,
  DisplayOtherInformationLineItemPipe,
  DisplayOtherInformationLineItemTVCAPipe,
  DisplayPrescriptionLineItemPipe,
  DisplayPrescriptionLineItemTVCAPipe,
  DisplayOtherInformationLineItemPipe1,
  DisplayPrescriptionLineItemPipe1,
  DTTMDisplayPipe,
  FormatConflictsDisplayPipe,
  DisplayAcknowledgeStatusDisplayPipe,
  FormViewerImagePipe,
  MCconflicticonPipe,
  GPConnectLineItemDisplayPipe,
  GpConnectWarningDisplayPipe,
  InfoIconPipe,
  ShowStarImagesPipe,
  StartDTTMDisplayPipe,
  WrapToolTipPipe,
  PrescribingNotePipe,
  GPConnectPresItemDetailPipe,
  DisplayChangingDosePipe,
  DisplayChangingDoseMedStpPipe,
  DisplayInfusionRatePipe,
  DisplayDurationPipe,
  DisplayFrequencyPipe,
  DisplayOperationModePipe,
  DisplayVariableDoseInstPipe,
  DisplayVarInstTooltipPipe,
  DisplayAdminTimesPipe,
  RemoveDoseUOMPipe,
  MCItemDisplayPipe,
  MedMCIOtherDisplayPipe,
  DoseCombinationPipe,
  TechValidateTabPipe,
  SupplyHistoryPipe,
  SupplyHistoryPipe1,
  TechnicalDetailsHistoryPipe,
  SupplyHistoryForMCIPipe,
  SetAdministeredIconPipe,
  MedScanProdDisplayIconPipe,
  ToolTipDisplayPipe,
  // CustomToolTipWidthPipe,
  ToolTipDisplayPipe2,
  CustomWordWrapPipe,
  MedMCIOtherDisplayChildTVCAPipe
} from './product/shared/pipes/medicationconverters.pipe';
// import { BoxmodelDirective } from './shared/epma-platform/controls/Directives/boxmodel.directive';
// import {
//   FontSizeDirective,
//   FontWeightDirective,
// } from './shared/epma-platform/controls/Directives/fonts.directive';
// import { CommonDirective, GridLayoutDirective, VisibilityWidthDirective, containerStyleDirective } from './shared/epma-platform/controls/Directives/common.directive';

import { GpConnectListView } from './lorappmanageprescriptionbbui/view/gpconnectlistview';
import { MedListView } from './lorappmanageprescriptionbbui/view/medlistview';
// import { GridBorderComponent } from './shared/epma-platform/controls/epma-grid-helpers/grid-border.component';
// import { ControlTemplate } from './shared/epma-platform/controls/epma-grid-helpers/control-template.component';
import { PopupModule } from '@progress/kendo-angular-popup';
import { MedTabs } from './lorappmanageprescriptionbbui/view/medtabs';
import { CellStyle } from './shared/epma-platform/controls/epma-grid-helpers/cell-style.component';
import { medprescribedrugs } from './lorappmanageprescriptionbbui/view/medprescribedrugs';
import { AppRoutingModule } from './app-routing.module';
import { medQuickselect } from './lorappmanageprescriptionbbui/view/medquickselect';
// import { PowercardComponent } from './shared/epma-platform/controls/epma-ipowersearchcontrol/power-search-card/power-search-card.component';
import { MultiSelectListView } from './lorappmanageprescriptionbbui/view/MultiSelectListView';
// import { epmaMarginDirective } from './shared/epma-platform/controls/Directives/margin.directive';
import { FormViewForAdmin } from './lorappmanageprescriptionbbui/view/frmformviewforadmin';
import { frmAdminSlotTimes } from './lorappmanageprescriptionbbui/view/frmadminslottimes';
import { medipresolvestepped } from './lorappmanageprescriptionbbui/view/medipresolvestepped'
// import { ContentControl } from './shared/epma-platform/controls/ContentControl';
import { medFormViewer } from './lorappmanageprescriptionbbui/view/medformviewer';
import { medNonFormulary } from './lorappmanageprescriptionbbui/view/mednonformulary';
import { MedicationPrescriptionCA } from './lorappmanageprescriptionbbui/ca/prescribe/medicationprescriptionview';
// import { MedfrmconflictsCA } from './lorappmanageprescriptionbbui/view/medfrmconflictsCA/medfrmconflictsCA.component';
// import { Medsupplydispensinginstructionstab } from './lorappmanageprescriptionbbui/view/medsupplydispensinginstructionstab/medsupplydispensinginstructionstab.component';
// import { MedTechvalidateCA } from './lorappmanageprescriptionbbui/view/medTechvalidateCA/medTechvalidateca.component';
import { MenuLandingPage } from './shared/epma-platform/local-connect/components/landing/landing.component';

// import { convertertestPipes } from './product/shared/covnertorpipes.declarations';
// import { EpmaTestComponents } from './epma-platform-test-components/component.declarations';
// import { PowerSearchComponent } from './power-search/power-search.component';
import { KendoModule } from './modules/kendo.module';
import { MedSecondaryTabChild } from './lorappmanageprescriptionbbui/view/medsecondarytabchild';
import { MedPrescribedOption } from './lorappmanageprescriptionbbui/view/medprescribedoption';
import { frmFVFooter } from './lorappmanageprescriptionbbui/common/frmFVFooter';
// import { UniqueNameDirective } from './shared/epma-platform/controls/epma-grid-helpers/grid-extension';
//import { Datacolumncontentpresenter } from './shared/epma-platform/controls/epma-dc-contentpresenter/epma-dc-contentpresenter.component';
import { medMCItems } from './lorappmedicationcommonbb/view/medmcitems';
import { medDoseCalculatorMezzanineDetails } from './lorappmedicationcommonbb/child/medDoseCalculatorMezzanineDetails';
import { MedDoseDetails } from './lorappmedicationcommonbb/view/meddosedetails';
import { medddetails } from './lorappmedicationcommonbb/view/medddetails';
import { MedDrugDetails } from './lorappmedicationcommonbb/view/meddrugdetails';
import { MedAdditionalDetails } from './lorappmedicationcommonbb/view/medadditionaldetails';
import { MedPGDforAdmin } from './lorappmedicationcommonbb/view/medpgdforadmin';
import { medreviewhistorydetails } from './lorappmedicationcommonbb/view/medreviewhistorydetails';
import { MedsAdminEventDetails } from './lorappmedicationcommonbb/view/medsadmineventdetails';
import { medvalidations } from './lorappmedicationcommonbb/view/medvalidations';
import { medddetailsChild } from './lorappmedicationcommonbb/child/medddetailschild';
import { ClinicalVerhislink} from './lorappmedicationcommonbb/child/ClinicalVerhislink';
import { PresItemModificationHistory} from './lorappmedicationcommonbb/child/PresItemModificationHistory';
import { MedsAdminSlotHistory} from './lorappmedicationcommonbb/child/medsadminslothistory';
import { meddispensingsupply} from './lorappmedicationcommonbb/child/meddispensingsupply';
import { MedConditionalDose } from './lorappmedicationcommonbb/view/medconditionaldose';
import { MedTitratedDose } from './lorappmedicationcommonbb/view/medtitrateddose';
import { MedTitratedDoseView } from './lorappmedicationcommonbb/view/medtitrateddoseview';
import { MedTitratedDoseChild } from './lorappmedicationcommonbb/view/medtitrateddosechild';
// import { RadExpander } from './shared/epma-platform/controls/epma-radExpander/epma-radExpander.component';
// import { EpmaDcStackpanelComponent } from './shared/epma-platform/controls/epma-dc-stackpanel/epma-dc-stackpanel.component';
// import { GridDataTemplate } from './shared/epma-platform/controls/epma-grid-datatemplate/epma-grid-datatemplate.component';
import { TitratedDoseCommonVM } from './lorappmedicationcommonbb/viewmodel/TitratedDoseDetailsCommonVM';
// import { iSFS } from './shared/epma-platform/controls/epma-isfs/epma-isfs.component';
import { medconflicts } from './lorappmanageprescriptionbbui/view/medconflicts';
import { medFrmviewtechvalidate } from './lorappmanageprescriptionbbui/view/medfrmviewtechvalidate';
// import { AddtoFavoritesBottomComponent } from './epma-test-components/open_window/addto-favorites-bottom/addto-favorites-bottom.component';
// import { DialogTestIppmabasevmComponent } from './epma-test-components/dialog-test-ippmabasevm/dialog-test-ippmabasevm.component';
// import { MedFormViewerComponent } from './epma-test-components/open_window/med-form-viewer/med-form-viewer.component';
// import { FrmFVFooterComponent } from './epma-test-components/open_window/frm-fvfooter/frm-fvfooter.component';
// import { MedfluidSearchComponent } from './epma-test-components/open_window/medfluid-search/medfluid-search.component';
// import { ObservableCollectionTestComponent } from './epma-test-components/observable-collection-test/observable-collection-test.component';
// import { ListTestComponent } from './epma-test-components/list-test/list-test.component';
// import { GridCellTemplateComponent } from './shared/epma-platform/controls/epma-grid-helpers/grid-cell-template/grid-cell-template.component';
// import { GridCellEditTemplateComponent } from './shared/epma-platform/controls/epma-grid-helpers/grid-cell-edit-template/grid-cell-edit-template.component';
// import { GridProperties } from './shared/epma-platform/controls/epma-grid-helpers/grid.directive';
// import { GridColumnProperties } from './shared/epma-platform/controls/epma-grid-helpers/grid-column.directive';
import { ChangeDose } from './lorappmanageprescriptionbbui/view/changedose';
import { ChangeDoseFooter } from './lorappmanageprescriptionbbui/view/changedosefooter';
import { RemoveDoseUOM } from './product/shared/convertor/medicationconverters.service';
// import { ScrollBarViewer } from './shared/epma-platform/controls/epma-grid-helpers/scroll-viewer.directive';
// import { iActivityConsideration } from './shared/epma-platform/controls/epma-iactivityconsideration/epma-iactivityconsideration.component';
import { frmBasicFormViewer } from './lorappmanageprescriptionbbui/view/frmbasicformviewer';
// import { MedsAdminMainView } from "src/app/lorappmedicationadminbbui/view/MedsAdminMainView";
// import { MedsAdminPrescChartView } from "src/app/lorappmedicationadminbbui/view/medsadminprescchartview";
// import { MedsAdminObservationView } from "src/app/lorappmedicationadminbbui/view/MedsAdminObservationView";
// import { MedsRecordAdminstrator } from 'src/app/lorappmedicationadminbbui/child/medsadminrecordadmin';
// import { MedsAdminChartView } from 'src/app/lorappmedicationadminbbui/view/MedsAdminChartView';
// import { DrugHeader, CDrugHeader } from 'src/app/lorappmedicationadminbbui/common/drugheader';
import { meddrugprescriptionpackoptionChild } from './lorappmanageprescriptionbbui/view/meddrugprescriptionpackoptionchild';
import { PackOptionChildfooter } from './lorappmanageprescriptionbbui/view/packoptionchildfooter';
import { meddrugprescriptionoptionChild } from './lorappmanageprescriptionbbui/view/meddrugprescriptionoptionchild';
import { meddrugindicationChild } from './lorappmanageprescriptionbbui/view/meddrugindicationchild';
// import { InfRecAdmBagDetails } from 'src/app/lorappmedicationadminbbui/child/InfRecAdmBagDetails';
// import { medbagdetails } from 'src/app/lorappmedicationcommonbb/view/medbagdetails/medbagdetails.component';
import { frmformviewForAdminConInfusions } from './lorappmanageprescriptionbbui/view/frmformviewforadminconinfusions';
import { SecondaryScreenLinkPanel } from './lorappmanageprescriptionbbui/view/secondaryscreenlinkpanel';
import { MedRelatedOption } from './lorappmanageprescriptionbbui/view/medrelatedoption';
import { medbrandconstraintschild } from './lorappmanageprescriptionbbui/view/medbrandconstraintschild';
import { MedAccessConstraints } from './lorappmanageprescriptionbbui/view/medaccessconstraints';
import { GridHeight } from './product/shared/pipes/grid-height-converter.pipe';
// import { InfusionChartView } from 'src/app/lorappmedicationadminbbui/view/InfusionChartView';
// import { MedScanRecordAdministration } from 'src/app/lorappmedicationadminbbui/child/MedScanRecordadministration';
// import { MedAmendMessage } from 'src/app/lorappmedicationadminbbui/view/MedAmendMessage';
// import { ConditionalDoseRegimeView } from 'src/app/lorappmedicationadminbbui/view/ConditionalDoseRegimeView';
// import { SlotDetailVM, MedAmendMessageVM } from './lorappmedicationadminbbui/viewmodel/MedicationChartVM';
import { FormViewForAdminAppliance } from './lorappmanageprescriptionbbui/view/frmformviewforadminappliance';
import { frmformviewClerkinginfusions } from './lorappmanageprescriptionbbui/view/frmformviewclerkinginfusions';
import { frmviewInfClerkGasOxygn } from './lorappmanageprescriptionbbui/view/frmviewinfclerkgasoxygn';
import { frmWeekdays } from './lorappmanageprescriptionbbui/view/frmweekdays';
import { FormViewLeave } from './lorappmanageprescriptionbbui/view/frmformviewleave';
import { TypeinFormViewAppliance } from './lorappmanageprescriptionbbui/view/frmformviewmedclrkappliance.component';
// import { MedRequestCA } from './lorappmedicationadminbbui/view/MedRequestCA';
import { formViewIntermittent } from './lorappmanageprescriptionbbui/view/frmformViewIntermittent';
// import { InfRecAdmMainView } from './lorappmedicationadminbbui/child/InfRecAdmMainView';
import { InfDripRateCalculator } from './lorappmedicationcommonbb/child/InfDripRateCalculator';
// import { InfRecAdmContBegun } from './lorappmedicationadminbbui/child/InfRecAdmContBegun';
// import { InfRecAdmContStop } from './lorappmedicationadminbbui/child/InfRecAdmContStop';
// import { InfRecAdmContDefer } from './lorappmedicationadminbbui/child/InfRecAdmContDefer';
// import { InfrecordadminVM } from './lorappmedicationadminbbui/viewmodel/InfrecordadminVM';
import { MedAlternateOption } from './lorappmanageprescriptionbbui/view/medalternateoption';
// import { InfRecAdmContResume } from './lorappmedicationadminbbui/child/InfRecAdmContResume';
// import { InfRecAdmCSFStopComplete } from './lorappmedicationadminbbui/child/InfRecAdmCSFStopCompleted';
// import { InfRecAdmConditionalDose } from './lorappmedicationadminbbui/child/InfRecAdmConditionalDose';
// import { InfRecAdmContChangeFlowRate } from './lorappmedicationadminbbui/child/InfRecAdmContChangeFlowRate';
import { medDRC } from './lorappmanageprescriptionbbui/view/meddrc';
// import { ConditionalDoseChildView } from './lorappmedicationadminbbui/child/ConditionalDoseChildView';
// import { InfRecAdmCSFChangeBag } from './lorappmedicationadminbbui/child/InfRecAdmCSFChangeBag'
// import { TestInfRecAdminManiView } from './lorappmedicationadminbbui/child/TestInfRecAdmin-ManiView';
import { FormViewAppliance} from './lorappmanageprescriptionbbui/view/frmformviewappliance';
// import { Canvas } from './shared/epma-platform/controls/epma-canvas/epma-canvas.component';
// import { Line } from './shared/epma-platform/controls/line.component/line.component';
// import { CanvasImage } from './shared/epma-platform/controls/epma-canvas-image/epma-canvas-image.component';
import { frmInfusionratecalculator } from './lorappmanageprescriptionbbui/view/frminfusionratecalculator';
import { frmformviewForAdminPCAInfusions } from './lorappmanageprescriptionbbui/view/frmformviewForAdminPCAInfusions';
import { MedsAdminUserAuthenticate } from './lorappmedicationcommonbb/view/medsadminuserauthenticate';
// import { MedsAdminDoseDiscrepancyReason } from './lorappmedicationadminbbui/child/medsadmindosediscrepancyreason';
// import { InfRecAdmPCASummaryView } from './lorappmedicationadminbbui/child/InfRecAdmPCASummaryView';
import { FormViewOPDschg } from './lorappmanageprescriptionbbui/view/frmformviewopdschg';
 
// import { iInfusionChart } from './lorarcbluebirdmedicationchart/iInfusionChart/iInfusionChart'
// import { InfRecAdmGasSummaryView } from './lorappmedicationadminbbui/child/InfRecAdmGasSummaryView'
// import { MedicationAdminView } from './lorappmedicationadminbbui/ca/medicationadmin/medicationadminview';
// import { DisplayPrescriptionLineMedsItemPipe, DoseWrapConverterPipe, HumidificationConverterPipe, RouteWrapConverterPipe, TargetsatrangeConverterPipe, MedScanProdDisplayPrescribedItemConverterPipe, DisplayOtherInformationLineItemMedPipe, DisplayMultiSlotDetailPipe, DisplayPrescriptionLineItemMedPipe, ImageURIBitMapPipe, VisibilityConvertorPipe, StartDTWrapConverterPipe, StopDTWrapConverterPipe, ReviewWrapConverterPipe, CommentsWrapConverterPipe, ReasonWrapConverterPipe, ActionByWrapConverterPipe, PrescribedByWrapConverterPipe, InfusionRouteWrapConverterPipe, OmitWrapConverterPipe, LineBreakWrapConverterPipe, InfusionDoseWrapConverterPipe,TimeConvertorPipe,TypeIconPipe, StatusIconPipe, FalseToVisibilityConverterPipe, InfoMedIconPipe,RouteWrapMedConverterPipe,DoseWrapMedConverterPipe, FontWeightConvPipe, MCItemDisplayMedsItemPipe } from './lorarcbluebirdmedicationchart/converter/MedChartConverter.pipe';
import { FormViewForAdminOxygen } from './lorappmanageprescriptionbbui/view/frmformviewforadminoxygen';
// import { MedsAdminDischgPrescriptions } from './lorappmedicationadminbbui/child/medsadmindischgprescriptions.component';
import { OnBehalfOflink } from './lorappmedicationcommonbb/child/OnBehalfOflink';
import { MedAccessConstraintsChild } from './lorappmanageprescriptionbbui/view/medaccessconstraintschild';
// import { MedsAdminPRNSlot } from './lorappmedicationadminbbui/child/MedsAdminPRNSlot';
// import { MedsAdminMultiSlot } from './lorappmedicationadminbbui/child/MedsAdminMultiSlot';
// import { InfusionCell } from './lorarcbluebirdmedicationchart/iInfusionChart/infusion-cell/infusion-cell.component';
// import { InlineUIContainer } from './shared/epma-platform/controls/epma-inline-uicontainer/epma-inline-uicontainer.component';
// import { InfRecAdmContSummaryView } from './lorappmedicationadminbbui/child/InfRecAdmContSummaryView';
// import { InfRecAdmGasBegun } from './lorappmedicationadminbbui/child/InfRecAdmGasBegun';
// import { InfRecAdmPCAChangeBag } from './lorappmedicationadminbbui/child/InfRecAdmPCAChangeBag';
// import { MedsAdminManageSelfAdminChild } from './lorappmedicationadminbbui/child/MedsAdminManageSelfAdminChild';
import { FormViewMedClerk } from './lorappmanageprescriptionbbui/view/frmformviewmedclerk';
import { DripRateCalcVM } from './lorappmedicationcommonbb/viewmodel/dripratecalcvm';
import { meddrc } from './lorappmedicationcommonbb/view/meddrc';
// import { MixedMultiRouteAdminSelection } from './lorappmedicationadminbbui/child/MixedMultiRouteAdminSelection';
// import { RecordPGD } from './lorappmedicationadminbbui/child/recordpgd';
// import { MedsAdminModifyOrStrikethrough } from './lorappmedicationadminbbui/child/MedsAdminModifyOrStrikethrough';
// import { ModifyStrikethroughLink } from './lorappmedicationadminbbui/child/ModifyStrikethroughLink';
// import { OverrideBarcodeScan } from './lorappmedicationadminbbui/child/OverrideBarcodeScan';
import { RePresConfirmMezzanine } from './lorappmanageprescriptionbbui/view/RePresConfirmMezzanine';
// import { InfRecAdmStrikeThrough } from './lorappmedicationadminbbui/child/InfRecAdmStrikeThrough';
import { medtechvalProdOpt } from './lorappmanageprescriptionbbui/view/medtechvalprodopt';
import { meddispensinginstructions } from './lorappmanageprescriptionbbui/view/dispensinginstruction';
import { MultiSelectListWindow } from './lorappmanageprescriptionbbui/view/multiSelectListWindow';
import { medsupplyhistory } from './lorappmanageprescriptionbbui/view/medsupplyhistory';
import { medrecordadmin } from './lorappmanageprescriptionbbui/view/medrecordadmin';
import { medsystitrateddose } from './lorappmedicationcommonbb/view/medsystitrateddose';
import { ChartsModule } from '@progress/kendo-angular-charts';
import 'hammerjs';
import { medTechvalidateCA } from './lorappmanageprescriptionbbui/view/medtechvalidateCA';
import { medsupplydispensinginstructionstab } from './lorappmanageprescriptionbbui/view/medsupplydispensinginstructionstab';
import { medsupplydispensinginstructions } from './lorappmanageprescriptionbbui/view/medsupplydispensinginstructions';
import { medinfusionstrikehistory } from './lorappmedicationcommonbb/child/medInfusionStrikeHistory';
import {GPConnectAddlDtls} from './lorappmanageprescriptionbbui/view/GPConnectAddlDtls';
import { MedAuthorise } from './lorappmanageprescriptionbbui/view/medauthorise';
// import { MedsAdminModifyAdministration } from './lorappmedicationadminbbui/child/MedsAdminModifyAdministration';
import { medreprint } from './lorappmanageprescriptionbbui/view/medreprint';
// import { MedsAdminChartOverView } from './lorappmedicationadminbbui/view/MedsAdminChartOverView';
// import { MedSortFilterbyOptions } from './lorappmedicationadminbbui/child/MedSortFilterbyOptions';
import { MedReconcileChild } from './lorappmanageprescriptionbbui/view/medreconcilechild';
import { ReconcileComments } from './lorappmanageprescriptionbbui/view/reconcilecomments';
import { medrequisitionhistory } from './lorappmanageprescriptionbbui/view/medrequisitionhistory';
// import { OmitIndefinite } from './lorappmedicationadminbbui/child/OmitIndefinite';

// import { MedsadminOmitslots } from './lorappmedicationadminbbui/child/medsadminomitslots';
// import { OmitSlotsVM } from './lorappmedicationadminbbui/viewmodel/MedsAdminVM';
// import { OmitSelectedSlots } from './lorappmedicationadminbbui/child/OmitSelectedSlots';
// import { OmitUntil } from './lorappmedicationadminbbui/child/OmitUntil';
import { medReviewChild } from './lorappmedicationcommonbb/child/medReviewChild';
import { ReviewOutcome } from './lorappmedicationcommonbb/child/reviewoutcome';
// import { MedsAdminReinstateslots } from './lorappmedicationadminbbui/child/MedsAdminReinstateslots';
// import { EnterTitratedDose } from './lorappmedicationadminbbui/child/EnterTitratedDose';
import { MedReplacementDrugsChild } from './lorappmanageprescriptionbbui/view/medreplacementdrugschild';
import { MedSequentialPrescription } from './lorappmanageprescriptionbbui/view/medsequentialprescription';
import { medfluidSearch } from './lorappmedicationcommonbb/child/medfluidsearch';
import { medonbehalfof } from './lorappmedicationcommonbb/view/medonbehalfof';
import { meddiscontinuecancelChild } from './lorappmedicationcommonbb/child/meddiscontinuecancelchild';
import { medConditionalDose } from './lorappmanageprescriptionbbui/view/medconditionaldose';
import { medContConditionalDose } from './lorappmanageprescriptionbbui/view/medcontconditionaldose';
import { medresolvetitrated } from './lorappmanageprescriptionbbui/view/medresolvetitrated';
import { meddrugmonographChild } from './lorappmedicationcommonbb/view/meddrugmonographchild';
import { ManageSquenceLink } from './lorappmedicationcommonbb/child/medsequentialprescription';
import { medfrmconflictsCA } from './lorappmanageprescriptionbbui/view/medfrmconflictsCA';
//  import { MedsAdminStrikethrough } from './lorappmedicationadminbbui/child/MedsAdminStrikethrough';
import { MenusModule } from '@progress/kendo-angular-menu';
import { TypeinFormViewForAdmin } from './lorappmanageprescriptionbbui/view/typeinformviewforadmin';
import { MedSteppedFullPrescriptionVW } from './lorappmedicationcommonbb/view/medSteppedFullPrescriptionVW';
import { MedTechnicalDetails } from './lorappmedicationcommonbb/view/medtechnicaldetails';
import { TypeinFormViewLeave } from './lorappmanageprescriptionbbui/view/typeinformviewpatleave';
import { TypeinFormViewOPDschg } from './lorappmanageprescriptionbbui/view/Typeinformviewopdschg';
// import { ObservationResultTextChild } from './lorappmedicationadminbbui/child/observationresulttextchild';
import { medConflictsPGD } from './lorappmedicationcommonbb/child/medConflictsPGD/medConflictsPGD';
import { OrderSetSecMezzanine } from './lorappmanageprescriptionbbui/view/OrderSetSecMezzanine';
import { OrderSetsLinks } from './lorappmanageprescriptionbbui/view/OrderSetsLinks';
import { OrderSetChildfooter } from './lorappmanageprescriptionbbui/view/OrderSetChildfooter';
import { OrderSetGuidanceSecMezzanine } from './lorappmanageprescriptionbbui/view/OrderSetGuidanceSecMezzanine';
import { PopUpGridForOrderset } from './lorappmanageprescriptionbbui/view/PopUpGridForOrderset';
import { MedAdminDetails } from './lorappmedicationcommonbb/view/medadmindetails';
import { ScanRecMedicationMezzanineCa } from './lorappmedicationcommonbb/child/ScanRecMedicationMezzanine';
import { DoseCalculator } from './lorappmedicationcommonbb/child/dosecalculator';
import { Typeinformviewmedclerk } from './lorappmanageprescriptionbbui/view/Typeinformviewmedclerk';
import { Multicomponent } from './lorappmanageprescriptionbbui/view/multicomponent';
import { Commonviewpage } from './lorappmedicationcommonbb/view/commonviewpage';
// import { MedsAdminObservationTooltip } from './lorappmedicationadminbbui/child/MedsAdminObservationTooltip';
import { CustomDatePipe } from './product/shared/pipes/custumdatepipewithdst.pipe';
import { SharedModule } from './epma-shared.module';
 export function initAppWizard(_mediatorDataService: MediatorDataService) {
   return (): Observable<any> => {
    if(window.location.pathname.includes("View.html") || window.location.pathname.includes("LBMePMACommonView.aspx" )){
      return _mediatorDataService.initView();
   }
    else{
     return _mediatorDataService.initWizard();
    }
   };
 }

export let InjectorInstance: Injector;
@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormsModule,
    RouterModule.forRoot([]),
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
    AppRoutingModule,
    NotificationModule,
    ChartsModule,
    MenusModule,
    SharedModule
  ],
  declarations: [
    AppComponent,
    // InfRecAdmContChangeFlowRate,
    // OmitIndefinite,
    // OmitSelectedSlots,
    // OmitUntil,
    // MedsadminOmitslots,
    medinfusionstrikehistory,
    // BoxmodelDirective,
    // FontSizeDirective,
    // FontWeightDirective,
    // CommonDirective,
    // GridLayoutDirective,
    // VisibilityWidthDirective,
    // containerStyleDirective,
    // Border,
    // iLabel,
    // iButton,
    // iCheckBox,
    // CheckBox,
    // iComboBox,
    // ContentPresenter,
    // iMultiSelectDropdown,
    // iPowerSearch,
    // iTextBox,
    // iTimeBox,
    // TextBlock,
    // iRadioButton,
    // StackPanel,
    // iTab,
    // iTabItem,
    // iUpDownBox,
    // WrapPanel,
    // iTreeViewControl,
    // DataTemplate,
    // Image,
    // iImage,
    // iHyperlinkButton,
    // iDateTimePicker,
    // iCheckedListbox,
    // ScrollViewer,
    // RichTextBox,
    // iBookMark,
    // RadExpander,
    // iTerminologyBrowser,
    // iToggleDropDown,
    // iListBox,
    // FormatTextPipe,
    CListItemsDisplayPipe,
    DisplayOtherInformationLineItemPipe,
    DisplayOtherInformationLineItemTVCAPipe,
    DisplayPrescriptionLineItemPipe,
    DisplayPrescriptionLineItemTVCAPipe,
    DisplayOtherInformationLineItemPipe1,
    DisplayPrescriptionLineItemPipe1,
    // DisplayPrescriptionLineItemMedPipe,
    DTTMDisplayPipe,
    FormatConflictsDisplayPipe,
    DisplayAcknowledgeStatusDisplayPipe,
    FormViewerImagePipe,
    MCconflicticonPipe,
    GPConnectLineItemDisplayPipe,
    GpConnectWarningDisplayPipe,
    InfoIconPipe,
    ShowStarImagesPipe,
    StartDTTMDisplayPipe,
    WrapToolTipPipe,
    MCItemDisplayPipe,
    MedMCIOtherDisplayPipe,
    MedMCIOtherDisplayChildTVCAPipe,
    DoseCombinationPipe,
    TechValidateTabPipe,
    RemoveDoseUOMPipe,
    GpConnectListView,
    MedListView,
    // iBusyIndicatorDialog,
    // IMessageBoxComponent,
    // AppDialog,
    // GridBorderComponent,
    // ControlTemplate,
    MedTabs,
    medQuickselect,
    // CellStyle,
    medonbehalfof,
    meddiscontinuecancelChild,
    medprescribedrugs,
    medreprint,
    MedTechnicalDetails,
    PrescribingNotePipe,
    GPConnectPresItemDetailPipe,
    DisplayChangingDosePipe,
    DisplayChangingDoseMedStpPipe,
    DisplayInfusionRatePipe,
    DisplayFrequencyPipe,
    DisplayDurationPipe,
    DisplayOperationModePipe,
    DisplayVariableDoseInstPipe,
    DisplayVarInstTooltipPipe,
    DisplayAdminTimesPipe,
    // ImageURIBitMapPipe,
    // PowercardComponent,
    // Grid,
    // GridItem,
    // epmaMarginDirective,
    medMCItems,
    medDoseCalculatorMezzanineDetails,
    MedDoseDetails,
    medddetails,
    MedDrugDetails,
    MedAdditionalDetails,
    MedPGDforAdmin,
    medreviewhistorydetails,
    MedsAdminEventDetails,
    medvalidations,
    medddetailsChild,
    ClinicalVerhislink,
    PresItemModificationHistory,
    MedsAdminSlotHistory,
    meddispensingsupply,
    MedConditionalDose,
    MedTitratedDose,
    FormViewForAdmin,
    frmAdminSlotTimes,
    MedicationPrescriptionCA,
    MenuLandingPage,
    // PowerSearchComponent,
    medipresolvestepped,
    ChangeDose,
    ChangeDoseFooter,
    // ContentControl,
    medFormViewer,
    FormViewLeave,
    TypeinFormViewAppliance,
    medNonFormulary,
    MedSecondaryTabChild,
    MedPrescribedOption,
    frmFVFooter,
    // UniqueNameDirective,
    // GridCellTemplateComponent,
    // GridCellEditTemplateComponent,
    MedTitratedDoseView,
    MedTitratedDoseChild,
    // EpmaDcStackpanelComponent,
    // GridDataTemplate,
    // GridProperties,
    // GridColumnProperties,
    // ScrollBarViewer,
    // iMedicationChart,
    // iActivityConsideration,
    // iSFS,
    medconflicts,
    medFrmviewtechvalidate,
    // MedsAdminMainView,
    // MedsAdminPrescChartView,
    // MedsAdminObservationView,
    // MedsAdminObservationTooltip,
    // InfRecAdmMainView,
    // MedsRecordAdminstrator,
    // MedsAdminChartView,
    // MedScanRecordAdministration,
    // DrugHeader,
    meddrugprescriptionpackoptionChild,
    PackOptionChildfooter,
    meddrugprescriptionoptionChild,
    meddrugindicationChild,
    // MedsAdminManageSelfAdminChild,
    // InfRecAdmBagDetails,
    // medbagdetails,
    frmformviewForAdminConInfusions,
    SecondaryScreenLinkPanel,
    MedRelatedOption,
    medbrandconstraintschild,
    MedAccessConstraints,
    GridHeight,
    // InfusionChartView,
    // MedAmendMessage,
    FormViewForAdminAppliance,
    // ConditionalDoseRegimeView,
    // ConditionalDoseChildView,
    // MedsAdminDoseDiscrepancyReason,
    frmformviewClerkinginfusions,
    frmviewInfClerkGasOxygn,
    frmInfusionratecalculator,
    frmWeekdays,
    // MedRequestCA,
    InfDripRateCalculator,
    // InfRecAdmContBegun,
    // InfRecAdmBagDetails,
    // InfRecAdmContStop,
    // InfRecAdmConditionalDose,
    formViewIntermittent,
    // InfRecAdmContDefer,
    // InfRecAdmContResume,
    // InfRecAdmCSFStopComplete,
    MedAlternateOption,
    medDRC,
    FormViewAppliance,
    // TestInfRecAdminManiView,
    // Canvas,
    // Line,
    // CanvasImage,
    frmformviewForAdminPCAInfusions,
    // InfRecAdmCSFChangeBag,
    // InfRecAdmGasSummaryView,
    // InfRecAdmPCASummaryView,
    FormViewOPDschg,
    MedsAdminUserAuthenticate,
    // iInfusionChart,
    // DoseWrapConverterPipe,
    // RouteWrapConverterPipe,
    // InfusionRouteWrapConverterPipe,
    // InfusionDoseWrapConverterPipe,
    // TargetsatrangeConverterPipe,
    // HumidificationConverterPipe,
    // DisplayPrescriptionLineMedsItemPipe,
    // LineBreakWrapConverterPipe,
    // OmitWrapConverterPipe,
    // MedicationAdminView,
    MultiSelectListView,
    FormViewForAdminOxygen,
    // MedScanProdDisplayPrescribedItemConverterPipe,
    OnBehalfOflink,
    // MedsAdminDischgPrescriptions,
    // DisplayOtherInformationLineItemMedPipe,
    MedAccessConstraintsChild,
    // MedsAdminPRNSlot,
    // DisplayMultiSlotDetailPipe,
    // FontWeightConvPipe,
    // VisibilityConvertorPipe,
    // StartDTWrapConverterPipe,
    // StopDTWrapConverterPipe,
    // ReviewWrapConverterPipe,
    // CommentsWrapConverterPipe,
    // ReasonWrapConverterPipe,
    // ActionByWrapConverterPipe,
    // PrescribedByWrapConverterPipe,
    CustomDatePipe,
    
    // MedsAdminMultiSlot,
    // InfusionCell,
    // InfRecAdmContSummaryView,
    // InfRecAdmGasBegun,
    // InfRecAdmPCAChangeBag,
    // InlineUIContainer,
    // OverrideBarcodeScan,
    MedSteppedFullPrescriptionVW,
    // Run,
    FormViewMedClerk,
    meddrc,
    // MixedMultiRouteAdminSelection,
    frmBasicFormViewer,
    // RecordPGD,
    // MedsAdminModifyOrStrikethrough,
    // MedsAdminModifyAdministration,
    // ModifyStrikethroughLink,
    RePresConfirmMezzanine,
    // InfRecAdmStrikeThrough,
    meddispensinginstructions,
    medtechvalProdOpt,
    MultiSelectListWindow,
    medsupplyhistory,
    medsystitrateddose,
    medTechvalidateCA,
    medsupplydispensinginstructionstab,
    medsupplydispensinginstructions,
    // TimeConvertorPipe,
    GPConnectAddlDtls,
    MedAuthorise,
    // TypeIconPipe,
    SupplyHistoryPipe,
    SupplyHistoryPipe1,
    SupplyHistoryForMCIPipe,
    TechnicalDetailsHistoryPipe,
    // StatusIconPipe,
    // FalseToVisibilityConverterPipe,
    medrecordadmin,
    //  MedsAdminChartOverView,
    //  MedSortFilterbyOptions,
    MedReconcileChild,
    ReconcileComments,
    medrequisitionhistory,
    // InfoMedIconPipe,
    // EnterTitratedDose,
    MedReplacementDrugsChild,
    MedSequentialPrescription,
    medReviewChild,
    ReviewOutcome,
    // MedsAdminReinstateslots,
    medfluidSearch,
    ReviewOutcome,
    medConditionalDose,
    medContConditionalDose,
    medresolvetitrated,
    meddrugmonographChild,
    ManageSquenceLink,
    medfrmconflictsCA,
    // MedsAdminStrikethrough,
    TypeinFormViewForAdmin,
     TypeinFormViewLeave,
	 TypeinFormViewOPDschg,
    // Ellipse,
    // ObservationResultTextChild,
    // RouteWrapMedConverterPipe,
    // DoseWrapMedConverterPipe,
    MedMCIOtherDisplayPipe,
    medConflictsPGD,
    OrderSetSecMezzanine,
    OrderSetsLinks,
    OrderSetChildfooter,
    OrderSetGuidanceSecMezzanine,
    PopUpGridForOrderset,
    MedAdminDetails,
    SetAdministeredIconPipe,
    MedScanProdDisplayIconPipe,
    ScanRecMedicationMezzanineCa,
    DoseCalculator,
    Typeinformviewmedclerk, 
    Multicomponent,
    Commonviewpage,
    // MCItemDisplayMedsItemPipe,
    ToolTipDisplayPipe,
    // CustomToolTipWidthPipe,
    ToolTipDisplayPipe2,
    CustomWordWrapPipe
  ],
  providers: [
    MediatorDataService,
    TitratedDoseCommonVM,
    // InfrecordadminVM,
    // OmitSlotsVM,
    // SlotDetailVM,
    DripRateCalcVM,
    // MedAmendMessageVM,
    // CDrugHeader,
    BusyIndicator,
    ScrollViewer,
     {
       provide: APP_INITIALIZER,
       useFactory: initAppWizard,
       deps: [MediatorDataService],
       multi: true,
     },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})

export class AppModule {
  constructor(injector: Injector) {
    InjectorInstance = injector;
  }
}
