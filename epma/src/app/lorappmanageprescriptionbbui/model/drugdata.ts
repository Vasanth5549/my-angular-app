import { CListItem, ObservableCollection } from "epma-platform/models";
import { DrugProperty } from "src/app/shared/epma-platform/soap-client/ManagePrescriptionWS";
export class DrugData {
        public IdentifyingOID: number;
        public IdentifyingType: string;
        public IdentifyingName: string;
        public DosageForm: string;
        public Strength: string;
        public DosageFormValue: string;
        public FormularyNote: string;
        public LorenzoID: string;
        public MCVersion: string;
        public DrugProperty: ObservableCollection<DrugProperty>;
        public Prescribableitemlistoid: number;
        public MCIUoms: string;
        public Isformulary: string;
        public IsIgnoreAdminMethod: boolean;
        public IsAuthorise: boolean;
        public Routes: ObservableCollection<CListItem>;
        public AlreadyPrescribedOID: number;
    }
