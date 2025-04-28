import { CListItem } from 'epma-platform/models'
import { DrugProperty } from './manageprescriptionws'
export class DrugData {
  public static IdentifyingType = '';
  public static IdentifyingName = '';
  public static DosageForm = '';
  public static Strength = '';
  public static DosageFormValue = '';
  public static FormularyNote = '';
  public static LorenzoID = '';
  public static MCVersion = '';
  public static MCIUoms = '';
  public static Isformulary = '';
  public static IdentifyingOID = 0;
  public static Prescribableitemlistoid = 0;
  public static AlreadyPrescribedOID = 0;
  public static IsIgnoreAdminMethod = false;
  public static IsAuthorise = false;
  public static DrugProperty: DrugProperty[] = [];
  public static Routes: CListItem[] = [];
}
