import { DoseCalculator } from "src/app/lorappmedicationcommonbb/resource/dosecalculator.designer";
import { MedScanRecAdmin } from "./MedScanRecAdmin.Designer";
import { OverrideBarcodeScan } from "./OverrideBarcodeScan.Designer";
import { AdministrableQtyView } from "./administrableqtyview.designer";
import { ConditionalRegime } from "./conditionalregime.designer";
import { DrugPreparationDetails } from "./drugpreparationdetails.designer";
import { EnterTitratedDose } from "./entertitrateddose.designer";
import { InfRecAdministartion } from "./infrecadministartion.designer";
import { InfusionChart } from "./infusionchart.designer";
import { ManageSelfAdministration } from "./manageselfadministration.designer";
import { MedAmendMessage } from "./medamendmessage.designer";
import { MedicationAdministrator } from "./medicationadministrator.designer";
import { MedicationChart } from "./medicationchart.designer";
import { MedicationRequest } from "./medicationrequest.designer";
import { MedsAdminChartOverview } from "./medsadminchartoverview.designer";
import { MedsAdminChartToolTip } from "./medsadmincharttooltip.designer";
import { MedsAdminOmitSlots } from "./medsadminomitslots.designer";
import { MedsAdminPrescChartView } from "./medsadminprescchartview.designer";
import { MedsAdminReinstateslots } from "./medsadminreinstateslots.designer";
import { MedSortFilterbyOptionsDesign } from "./medsortfilterbyoptions.designer";
import { ObservationChartResource } from "./observationchartresource.designer";
import { RecordPGD } from "./recordpgd.designer";
import { Strikethrough } from "./strikethrough.designer";
import { ResourceManagement } from "../utilities/ResourceManagement";
import { RecalcEstCompTimeConverter } from "../converter/medadminconverter";

export const Resource = {
    AdministrableQtyView: AdministrableQtyView,
    ConditionalRegime: ConditionalRegime,
    DrugPreparationDetails: DrugPreparationDetails,
    EnterTitratedDose: EnterTitratedDose,
    InfRecAdministartion: InfRecAdministartion,
    InfusionChart: InfusionChart,
    ManageSelfAdministration: ManageSelfAdministration,
    MedAmendMessage: MedAmendMessage,
    MedicationAdministrator: MedicationAdministrator,
    MedicationChart: MedicationChart,
    MedicationRequest: MedicationRequest,
    MedsAdminChartOverview: MedsAdminChartOverview,
    MedsAdminChartToolTip: MedsAdminChartToolTip,
    MedsAdminOmitSlots: MedsAdminOmitSlots,
    MedsAdminPrescChartView: MedsAdminPrescChartView,
    MedsAdminReinstateslots: MedsAdminReinstateslots,
    MedScanRecAdmin: MedScanRecAdmin,
    MedSortFilterbyOptionsDesign: MedSortFilterbyOptionsDesign,
    ObservationChartResource: ObservationChartResource,
    OverrideBarcodeScan: OverrideBarcodeScan,
    RecordPGD: RecordPGD,
    Strikethrough: Strikethrough,
    DoseCalculator: DoseCalculator,
    ResourceManagement: ResourceManagement,
    RecalcEstCompTimeConverter:RecalcEstCompTimeConverter
}