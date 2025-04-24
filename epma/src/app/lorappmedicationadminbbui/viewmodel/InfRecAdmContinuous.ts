
import { Convert} from 'epma-platform/services';
import { Int64, StringComparison,Visibility, ObservableCollection, PatientContext } from 'epma-platform/models';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import { InfRecAdmBase } from './InfRecAdmBase';
import { InfusionRecordAdminTypeCodes, MedicationAction, PrescriptionTypes } from '../utilities/CConstants';
import { CInfusionHelper } from 'src/app/lorappmedicationcommonbb/utilities/csinfusionhelper';
import { AdministrationDetail, InfusionAdminDetail, InfusionBagDetail, ObjectInfo, SlotDetail, UOM } from 'src/app/shared/epma-platform/soap-client/MedicationAdministrationWS';
import { InfrecordadminVM } from './InfrecordadminVM';

  export class InfRecAdmContinuous extends InfRecAdmBase {
    
  public override ValidateForBegun(): boolean {
        
          if (String.Compare(this.oRecAdminVM.InfusionAction, MedicationAction.BEGUN, StringComparison.CurrentCultureIgnoreCase) == 0) {
              if (this.oRecAdminVM.SelectedRoute == null || (String.IsNullOrEmpty(this.oRecAdminVM.SelectedRoute.DisplayText) && String.IsNullOrEmpty(this.oRecAdminVM.SelectedRoute.Value))) {
                  this.RaisedValidationFailed("InfRecMandMsg_Route", "cboRoute", null);
                  return false;
              }
              else if (this.oRecAdminVM.IsDose == Visibility.Visible && this.oRecAdminVM.IsEnableDose && !String.IsNullOrEmpty(this.oRecAdminVM.DoseUOMName) && (String.IsNullOrEmpty(this.oRecAdminVM.Dose) || String.Equals(this.oRecAdminVM.Dose, "0", StringComparison.CurrentCultureIgnoreCase))) {
                  this.RaisedValidationFailed("InfRecErrMsg_DoseValue", "txtDoseValue", null);
                  return false;
              }
              else if (this.oRecAdminVM.IsMandatoryForBegunConcentration && this.oRecAdminVM.IsEnableConcentration && String.IsNullOrEmpty(this.oRecAdminVM.ConcentrationStrength) || String.Equals(this.oRecAdminVM.ConcentrationStrength, "0")) {
                  this.RaisedValidationFailed("InfRecMandMsg_Concentration", "txtConStrengthValue", null);
                  return false;
              }
              else if (this.oRecAdminVM.IsMandatoryForBegunConcentration && this.oRecAdminVM.IsEnableConcentration && this.oRecAdminVM.ConcentrationStrengthUOM == null) {
                  this.RaisedValidationFailed("InfRecMandMsg_Concentration", "cboConStrengthUoMValue", null);
                  return false;
              }
              else if (this.oRecAdminVM.IsMandatoryForBegunConcentration && this.oRecAdminVM.IsEnableConcentration && String.IsNullOrEmpty(this.oRecAdminVM.ConcentrationVolume) || String.Equals(this.oRecAdminVM.ConcentrationVolume, "0")) {
                  this.RaisedValidationFailed("InfRecMandMsg_Concentration", "txtConVolumeValue", null);
                  return false;
              }
              else if (this.oRecAdminVM.IsMandatoryForBegunConcentration && this.oRecAdminVM.IsEnableConcentration && this.oRecAdminVM.ConcentrationVolumeUOM == null) {
                  this.RaisedValidationFailed("InfRecMandMsg_Concentration", "cboConVolumeUoMValue", null);
                  return false;
              }
              else if (!this.ValidateDoseInfRate())
                  return false;
              else if (!this.ValidationInfusionPeriod())
                  return false;
              else if (!this.ValidateInfusionRate())
                  return false;
              else if (!this.ValidateBagVolume())
                  return false;
              else if (DateTime.Equals(this.oRecAdminVM.AdministeredDate.Date , DateTime.MinValue)) {
                  this.RaisedValidationFailed("InfRecMandMsg_BegunDate", "dtpDateTimeGivenText", null);
                  return false;
              }
              else if (!this.ValidateForPrescDTTM("timeDateTimeGivenText"))
                  return false;
              else if (!this.ValidationAdministeredBy())
                  return false;
              else if (!this.ValidationWitnessMandatory())
                  return false;
              if (this.oRecAdminVM.InfusionPastAction != null) {
                  if (!this.validateForStartAdminTime(this.oRecAdminVM.AdministeredDate, this.oRecAdminVM.AdministeredDateTime) && this.oRecAdminVM.IsRetrospective)
                      return false;
                  if ((String.Compare(this.oRecAdminVM.InfusionPastAction, MedicationAction.STOP, StringComparison.InvariantCultureIgnoreCase) == 0))
                      return this.ValidateForStop();
                  else if ((String.Compare(this.oRecAdminVM.InfusionPastAction, MedicationAction.COMPLETE, StringComparison.InvariantCultureIgnoreCase) == 0))
                      return this.ValidateForComplete();
              }
              if (this.oRecAdminVM.IsClinicalRSNMand && String.IsNullOrEmpty(this.oRecAdminVM.Comments)) {
                  this.RaisedValidationFailed("InfRecMandMsg_Comments", "txtAdminComments", null);
                  return false;
              }
              if (!this.ValidateConcentrationRatio())
                  return false;
              if (!this.ValidateConcentrationAndInfrateUOMs())
                  return false;
          }
          return true;
      }
      public override ValidateForChangeBag(): boolean {
          if (String.Compare(this.oRecAdminVM.InfusionAction, MedicationAction.CHANGEBAG, StringComparison.CurrentCultureIgnoreCase) == 0) {
              if (this.oRecAdminVM.InfusionType != null) {
                  if (!this.ValidationVolumeInfused())
                      return false;
                  if (!this.ValidationConcentrationAllFieldsAvailable())
                      return false;
                  else if (DateTime.Equals(this.oRecAdminVM.EndDate.Date , DateTime.MinValue)) {
                      this.RaisedValidationFailed("InfRecMandMsg_Enddate", "dtpendDateChngBag", null);
                      return false;
                  }
                  else if (!this.ValidateForLastDTTM("iTimedendTime", this.oRecAdminVM.EnddateTime, "InfRecMsg_ChangeBagEndDateTime"))
                      return false;
                  else if (!String.IsNullOrEmpty(this.oRecAdminVM.Dose) && String.Compare(this.oRecAdminVM.Dose, "0") == 0) {
                      this.RaisedValidationFailed("InfRecErrMsg_DoseValue", "txtDoseValue", null);
                      return false;
                  }
                  else if ((this.oRecAdminVM.IsDoseMandatory) && (String.IsNullOrEmpty(this.oRecAdminVM.Dose))) {
                      this.RaisedValidationFailed("InfRecMandMsg_Dose", "txtDoseValue", null);
                      return false;
                  }
                  else if (this.oRecAdminVM.IsDoseVisible == Visibility.Visible && this.oRecAdminVM.IsEnableDose && (String.IsNullOrEmpty(this.oRecAdminVM.Dose) || String.Compare(this.oRecAdminVM.Dose, "0", StringComparison.CurrentCultureIgnoreCase) == 0)) {
                      this.RaisedValidationFailed("InfRecErrMsg_DoseValue", "txtDoseValue", null);
                      return false;
                  }
                  else if (this.oRecAdminVM.SelectedRoute == null || (String.IsNullOrEmpty(this.oRecAdminVM.SelectedRoute.DisplayText) && String.IsNullOrEmpty(this.oRecAdminVM.SelectedRoute.Value))) {
                      this.RaisedValidationFailed("InfRecMandMsg_Route", "cboRoute", null);
                      return false;
                  }
                  else if (!this.ValidateInfusionRate())
                      return false;
                  else if (!this.ValidateBagVolume())
                      return false;
                  else if (DateTime.Equals(this.oRecAdminVM.AdministeredDate , DateTime.MinValue)) {
                      this.RaisedValidationFailed("InfRecMandMsg_BegunDate", "dtpAdminDate", null);
                      return false;
                  }
                  else if (!this.ValidateForNextChngBagDTTM("iTimedtpAdminTime"))
                      return false;
                  else if (!this.ValidationAdministeredBy())
                      return false;
                  else if (!this.ValidationWitnessMandatory())
                      return false;
                  else if (!this.ValidateForInfusedvolume())
                      return false;
                  if (this.oRecAdminVM.IsClinicalRSNMand && String.IsNullOrEmpty(this.oRecAdminVM.Comments)) {
                      this.RaisedValidationFailed("InfRecMandMsg_Comments", "txtAdminComments", null);
                      return false;
                  }
              }
          }
          return true;
      }
      public override ValidateForChangeFlowRate(): boolean {
          if (String.Compare(this.oRecAdminVM.InfusionAction, MedicationAction.CHANGEFLOWRATE, StringComparison.CurrentCultureIgnoreCase) == 0) {
              if (this.oRecAdminVM.PrevConcentrationVisible == Visibility.Visible || this.oRecAdminVM.IsMandatoryConcentration) {
                  if (String.IsNullOrEmpty(this.oRecAdminVM.ConcentrationStrength) || String.Equals(this.oRecAdminVM.ConcentrationStrength, "0")) {
                      this.RaisedValidationFailed("InfRecMsg_EnterChangedConcentration", "txtConStrengthValue", null);
                      return false;
                  }
                  else if (this.oRecAdminVM.ConcentrationStrengthUOM == null) {
                      this.RaisedValidationFailed("InfRecMsg_EnterChangedConcentration", "cboConStrengthUoMValue", null);
                      return false;
                  }
                  else if (String.IsNullOrEmpty(this.oRecAdminVM.ConcentrationVolume) || String.Equals(this.oRecAdminVM.ConcentrationVolume, "0")) {
                      this.RaisedValidationFailed("InfRecMsg_EnterChangedConcentration", "txtConVolumeValue", null);
                      return false;
                  }
                  else if (this.oRecAdminVM.ConcentrationVolumeUOM == null) {
                      this.RaisedValidationFailed("InfRecMsg_EnterChangedConcentration", "cboConVolumeUoMValue", null);
                      return false;
                  }
              }
              if (!this.ValidationConcentrationAllFieldsAvailable())
                  return false;
              let dInfuedRate: number = 0.0;
              if (this.oRecAdminVM.IsMandatoryInfusionrate) {
                  if (String.IsNullOrEmpty(this.oRecAdminVM.ChangedInfusionRate)) {
                      this.RaisedValidationFailed("InfRecMandMsg_ChngInfRate", "txtinfucon", null);
                      return false;
                  }
                  else if (!String.IsNullOrEmpty(this.oRecAdminVM.ChangedInfusionRate) && (Number.TryParse(this.oRecAdminVM.ChangedInfusionRate, (o)=>{dInfuedRate=o}) && dInfuedRate <= 0)) {
                      this.RaisedValidationFailed("InfRecErrMsg_ChngInfRatZro", "txtinfucon", null);
                      return false;
                  }
                  else if (this.oRecAdminVM.ChangedInfRateNumUOM == null) {
                      this.RaisedValidationFailed("InfRecMandMsg_ChngInfRateUOM", "cboinfucon", null);
                      return false;
                  }
                  else if (this.oRecAdminVM.ChangedInfRateDinUOM == null) {
                      this.RaisedValidationFailed("InfRecMandMsg_ChngInfRatePUOM", "cboinfuconcent", null);
                      return false;
                  }
              }
              if (DateTime.Equals(this.oRecAdminVM.AdministeredDate.Date , DateTime.MinValue)) {
                  this.RaisedValidationFailed("InfRecMandMsg_ChngDate", "dtpchangeDate", null);
                  return false;
              }
              if (!this.ValidateForLastDTTM("iTimedchangeTime", this.oRecAdminVM.AdministeredDateTime, "InfRecMsg_FlowrateDateTime"))
                  return false;
              if (this.oRecAdminVM.IsClinicalRSNMand && String.IsNullOrEmpty(this.oRecAdminVM.ChangedFloWRateComments)) {
                  this.RaisedValidationFailed("InfRecMandMsg_Comments", "txtAdminComments", null);
                  return false;
              }
          }
          return true;
      }
      public override ValidateForStop(): boolean {
          if ((this.oRecAdminVM.Isdoseadministered) && (String.IsNullOrEmpty(this.oRecAdminVM.DoseAdministered))) {
              this.RaisedValidationFailed("InfRecMandMsg_DoseAdmin", "txtdoseadmin", null);
              return false;
          }
          else if (this.oRecAdminVM.IsEnableStopDose && !String.IsNullOrEmpty(this.oRecAdminVM.DoseUOMName) && (String.IsNullOrEmpty(this.oRecAdminVM.DoseAdministered) || String.Equals(this.oRecAdminVM.DoseAdministered, "0", StringComparison.CurrentCultureIgnoreCase))) {
              this.RaisedValidationFailed("InfRecErrMsg_DoseAdminValue", "txtdoseadmin", null);
              return false;
          }
          else if (this.oRecAdminVM.IsVisibleDoseUOM == Visibility.Visible && ((String.IsNullOrEmpty(this.oRecAdminVM.DoseAdministered) || String.Equals(this.oRecAdminVM.DoseAdministered, "0")) && (this.oRecAdminVM.lstStopDoseUOM != null && !String.IsNullOrEmpty(this.oRecAdminVM.lstStopDoseUOM.Value)))) {
              this.RaisedValidationFailed("InfRecErrMsg_DoseAdminValue", "txtdoseadmin", null);
              return false;
          }
          else if (this.oRecAdminVM.IsVisibleDoseUOM == Visibility.Visible && ((!String.IsNullOrEmpty(this.oRecAdminVM.DoseAdministered) && !String.Equals(this.oRecAdminVM.DoseAdministered, "0")) && (this.oRecAdminVM.lstStopDoseUOM == null || String.IsNullOrEmpty(this.oRecAdminVM.lstStopDoseUOM.Value)))) {
              this.RaisedValidationFailed("InfRecMandMsg_DoseUOM", "txtdoseadmin", null);
              return false;
          }
          else if (this.oRecAdminVM.IsEnableDose && this.oRecAdminVM.Isdoseadministered && (String.IsNullOrEmpty(this.oRecAdminVM.DoseAdministered) || String.Compare(this.oRecAdminVM.DoseAdministered, "0", StringComparison.CurrentCultureIgnoreCase) == 0)) {
              this.RaisedValidationFailed("InfRecErrMsg_DoseAdminValue", "txtdoseadmin", null);
              return false;
          }
          else if (!this.ValidateForVolumeInfusedCompleteness())
              return false;
          else if (DateTime.Equals(this.oRecAdminVM.AdministeredstopDate.Date , DateTime.MinValue)) {
              this.RaisedValidationFailed("InfRecMandMsg_Enddate", "dtpendDate", null);
              return false;
          }
          else if (!this.ValidateForLastDTTM("iTimedendTime", this.oRecAdminVM.AdministeredstopDateTime, "InfRecMsg_StopCompleteDateTime"))
              return false;
          else if (!this.validateForEndAdminTime(this.oRecAdminVM.AdministeredstopDate, this.oRecAdminVM.AdministeredstopDateTime))
              return false;
          else if (this.oRecAdminVM.ReasonforStop == null) {
              this.RaisedValidationFailed("InfRecMandMsg_RsnStop", "cboResForstopping", null);
              return false;
          }
          else if (this.oRecAdminVM.IsStopClinicalRSNMand && String.IsNullOrEmpty(this.oRecAdminVM.StopComments)) {
              this.RaisedValidationFailed("InfRecMandMsg_Comments", "txtComments", null);
              return false;
          }
          else if (!this.ValidateForInfusedvolume())
              return false;
          return true;
      }
      public override ValidateForComplete(): boolean {
    let adminStopdateHolder;
    if (String.Compare(this.oRecAdminVM.InfusionAction, MedicationAction.COMPLETE, StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(this.oRecAdminVM.InfusionPastAction, MedicationAction.COMPLETE, StringComparison.CurrentCultureIgnoreCase) == 0) {
        if (DateTime.Equals(this.oRecAdminVM.AdministeredstopDate, DateTime.MinValue)) {
            adminStopdateHolder = this.oRecAdminVM.AdministeredstopDate;
        } else {
            adminStopdateHolder = this.oRecAdminVM.AdministeredstopDateTime;
        }
        if (this.oRecAdminVM.IsRetrospective) {
            if (DateTime.NotEquals(this.oRecAdminVM.AdministeredDate, DateTime.MinValue)) {
                this.oRecAdminVM.AdministeredDateTime = this.oRecAdminVM.AdministeredDate.DateTime.AddTime(this.oRecAdminVM.AdministeredDateTime);
            }
        }
              if ((this.oRecAdminVM.Isdoseadministered) && (String.IsNullOrEmpty(this.oRecAdminVM.DoseAdministered))) {
                  this.RaisedValidationFailed("InfRecMandMsg_DoseAdmin", "txtdoseadmin", null);
                  return false;
              }
              else if (this.oRecAdminVM.IsEnableStopDose && !String.IsNullOrEmpty(this.oRecAdminVM.DoseUOMName) && (String.IsNullOrEmpty(this.oRecAdminVM.DoseAdministered) || String.Equals(this.oRecAdminVM.DoseAdministered, "0", StringComparison.CurrentCultureIgnoreCase))) {
                  this.RaisedValidationFailed("InfRecErrMsg_DoseAdminValue", "txtdoseadmin", null);
                  return false;
              }
              else if (this.oRecAdminVM.IsVisibleDoseUOM == Visibility.Visible && ((String.IsNullOrEmpty(this.oRecAdminVM.DoseAdministered) || String.Equals(this.oRecAdminVM.DoseAdministered, "0")) && (this.oRecAdminVM.lstStopDoseUOM != null && !String.IsNullOrEmpty(this.oRecAdminVM.lstStopDoseUOM.Value)))) {
                  this.RaisedValidationFailed("InfRecErrMsg_DoseAdminValue", "txtdoseadmin", null);
                  return false;
              }
              else if (this.oRecAdminVM.IsVisibleDoseUOM == Visibility.Visible && ((!String.IsNullOrEmpty(this.oRecAdminVM.DoseAdministered) && !String.Equals(this.oRecAdminVM.DoseAdministered, "0")) && (this.oRecAdminVM.lstStopDoseUOM == null || String.IsNullOrEmpty(this.oRecAdminVM.lstStopDoseUOM.Value)))) {
                  this.RaisedValidationFailed("InfRecMandMsg_DoseUOM", "txtdoseadmin", null);
                  return false;
              }
              else if (this.oRecAdminVM.IsEnableDose && this.oRecAdminVM.Isdoseadministered && (String.IsNullOrEmpty(this.oRecAdminVM.DoseAdministered) || String.Compare(this.oRecAdminVM.DoseAdministered, "0", StringComparison.CurrentCultureIgnoreCase) == 0)) {
                  this.RaisedValidationFailed("InfRecErrMsg_DoseAdminValue", "txtdoseadmin", null);
                  return false;
              }
              else if (!this.ValidateForVolumeInfusedCompleteness())
                  return false;
              else if (DateTime.Equals(this.oRecAdminVM.AdministeredDate.Date , DateTime.MinValue)) {
                  this.RaisedValidationFailed("InfRecMandMsg_Enddate", "dtpendDate", null);
                  return false;
              }
              else if (!this.ValidateForLastDTTM("iTimedendTime", adminStopdateHolder, "InfRecMsg_StopCompleteDateTime"))
                  return false;
              else if (!this.validateForEndAdminTime(this.oRecAdminVM.AdministeredstopDate, this.oRecAdminVM.AdministeredstopDateTime))
                  return false;
              else if (!this.ValidateForInfusedvolume())
                  return false;
          }
          return true;
      }
      public override FillRequestForBegun(): void {
          if (this.oRecAdminVM.InfusionAction != null && String.Compare(this.oRecAdminVM.InfusionAction, MedicationAction.BEGUN, StringComparison.InvariantCultureIgnoreCase) == 0) {
              let sInfType: string = String.Empty;
              if (this.oRecAdminVM.InfusionType != null && this.oRecAdminVM.InfusionType.Value != null) {
                  sInfType = this.oRecAdminVM.InfusionType.Value;
              }
              this.objReq.objSlotDetailBC = new SlotDetail();
              this.objReq.objSlotDetailBC.AdministrationDetail = new AdministrationDetail();
              let objInfusionAdminDetail: InfusionAdminDetail = new InfusionAdminDetail();
              objInfusionAdminDetail.oInfusionBagDetail = new InfusionBagDetail();
              this.objReq.objSlotDetailBC.AdministrationDetail.oInfusionAdminDetail = new ObservableCollection<InfusionAdminDetail>();
              let enddt: DateTime= DateTime.MinValue;
              this.objReq.objSlotDetailBC.AdministrationDetail.Dose = (this.oRecAdminVM.Dose != String.Empty && this.oRecAdminVM.Dose != null) ? this.oRecAdminVM.Dose : String.Empty;
              this.objReq.objSlotDetailBC.AdministrationDetail.DoseUOMOID = this.oRecAdminVM.DoseUOMOID;
              this.objReq.objSlotDetailBC.AdministrationDetail.RouteOID = this.oRecAdminVM.SelectedRoute.Value;
              if (!String.IsNullOrEmpty(this.oRecAdminVM.InfusionPeriod) && this.oRecAdminVM.InfusionPeriodUomOID > 0) {
                this.objReq.objSlotDetailBC.InfusionPeriod = Convert.ToDouble(this.oRecAdminVM.InfusionPeriod);
                this.objReq.objSlotDetailBC.InfusionPeriodLorenzoID = this.TimeBaseUOMCode(Convert.ToString(this.oRecAdminVM.InfusionPeriodUomOID));
              }
              if (!String.IsNullOrEmpty(this.oRecAdminVM.InfusionPeriodMedAdmin) && this.oRecAdminVM.InfusionPeriodMedAdmin != "0" && this.oRecAdminVM.InfusionPeriodMedAdminUOM != null && !String.IsNullOrEmpty(this.oRecAdminVM.InfusionPeriodMedAdminUOM.Value)) {
                  this.objReq.objSlotDetailBC.AdministrationDetail.InfusionPeriodforMedAdmin = Convert.ToInt32(this.oRecAdminVM.InfusionPeriodMedAdmin);
                  this.objReq.objSlotDetailBC.AdministrationDetail.InfusionPeriodUOMforMedAdmin = new UOM();
                  let periodUOMId: number = 0;
                  if (Number.TryParse(this.oRecAdminVM.InfusionPeriodMedAdminUOM.Value, (o)=>{periodUOMId=o})) {
                      this.objReq.objSlotDetailBC.AdministrationDetail.InfusionPeriodUOMforMedAdmin.UOMId = periodUOMId;
                  }
              }
              this.FillCommonInfusionDetails(objInfusionAdminDetail);
              objInfusionAdminDetail.DripRateUOM = new UOM();
              objInfusionAdminDetail.DripRate = this.oRecAdminVM.DripRate;
              if (this.oRecAdminVM.DripRateUOMID > 0) {
                  objInfusionAdminDetail.DripRateUOM.UOMId = this.oRecAdminVM.DripRateUOMID;
              }
              if (this.oRecAdminVM.DripRatePerUOMID > 0) {
                  objInfusionAdminDetail.DripRatePerUOM = new UOM();
                  objInfusionAdminDetail.DripRatePerUOM.UOMId = this.oRecAdminVM.DripRatePerUOMID;
              }
              objInfusionAdminDetail.oInfusionBagDetail.BagVolume = this.oRecAdminVM.BagVolume;
              if (this.oRecAdminVM.BagVolumeUOM != null && !String.IsNullOrEmpty(this.oRecAdminVM.BagVolumeUOM.Value)) {
                  objInfusionAdminDetail.oInfusionBagDetail.BagVolumeUOM = new UOM();
                  objInfusionAdminDetail.oInfusionBagDetail.BagVolumeUOM.UOMId = Convert.ToInt64(this.oRecAdminVM.BagVolumeUOM.Value);
                  objInfusionAdminDetail.oInfusionBagDetail.BagVolumeUOM.UOMCode = this.oRecAdminVM.BagVolumeUOM.Tag.ToString();
              }
              objInfusionAdminDetail.oInfusionBagDetail.ExpiryDate = this.oRecAdminVM.ExpiryDate;
              objInfusionAdminDetail.oInfusionBagDetail.BatchNumber = this.oRecAdminVM.BatchNumber;
              objInfusionAdminDetail.oInfusionBagDetail.BagSequence = 1;
              if (this.oRecAdminVM.Site != null && !String.IsNullOrEmpty(this.oRecAdminVM.Site.Value)) {
                  this.objReq.objSlotDetailBC.AdministrationDetail.SiteOID = this.oRecAdminVM.Site.Value;
              }
              if (!String.IsNullOrEmpty(this.oRecAdminVM.Lumen)) {
                  this.objReq.objSlotDetailBC.AdministrationDetail.Lumen = this.oRecAdminVM.Lumen;
              }
              if (this.oRecAdminVM.DeliveryDevice != null && !String.IsNullOrEmpty(this.oRecAdminVM.DeliveryDevice.Value)) {
                  this.objReq.objSlotDetailBC.AdministrationDetail.DeliveryDevice = this.oRecAdminVM.DeliveryDevice.Value;
              }
              else if (!String.IsNullOrEmpty(this.oRecAdminVM.DeliveryDeviceText)) {
                  this.objReq.objSlotDetailBC.AdministrationDetail.DeliveryDevice = this.oRecAdminVM.DeliveryDeviceText;
              }
              objInfusionAdminDetail.oInfusionBagDetail.AdminStartTime = this.oRecAdminVM.AdministeredDate.AddTime(this.oRecAdminVM.AdministeredDateTime);
              this.objReq.objSlotDetailBC.AdministrationDetail.AdministeredByOID = String.IsNullOrEmpty(this.oRecAdminVM.AdministeredByOID) ? 0 : Convert.ToInt64(this.oRecAdminVM.AdministeredByOID);
              this.objReq.objSlotDetailBC.AdministrationDetail.WitnessedByOID = !String.IsNullOrEmpty(this.oRecAdminVM.WitnessByOID) ? Number.Parse(this.oRecAdminVM.WitnessByOID) : 0;
              objInfusionAdminDetail.oInfusionBagDetail.IsWitnessNotAvailable = this.oRecAdminVM.IsNoWitnessAvialable;
              if (!String.IsNullOrEmpty(this.oRecAdminVM.Comments))
                  this.objReq.objSlotDetailBC.AdministrationDetail.AdminComments = this.oRecAdminVM.Comments;
              this.objReq.objSlotDetailBC.AdministrationDetail.MedicationAction = this.oRecAdminVM.InfusionAction;
              this.objReq.objSlotDetailBC.AdministrationDetail.MedAdminOID = this.oRecAdminVM.MedAdminOID;
              this.objReq.objSlotDetailBC.OID = this.oRecAdminVM.PresScheduleOID;
              objInfusionAdminDetail.INFTYCode = sInfType;
              if (this.oRecAdminVM.InfusionRecordAdminTypeCode == InfusionRecordAdminTypeCodes.AsRequiredAdministration) {
                  this.objReq.objSlotDetailBC.ScheduleGenerationPresItemOID = this.oRecAdminVM.PrescriptionItemOID;
                  this.objReq.objSlotDetailBC.InfusionRecordAdminTypeCode = this.oRecAdminVM.InfusionRecordAdminTypeCode;
                  this.objReq.bIsPRNBC = true;
              }
              else if (this.oRecAdminVM.InfusionRecordAdminTypeCode == InfusionRecordAdminTypeCodes.IsRetrospectivePRN && this.oRecAdminVM.PresScheduleOID == 0 && !this.oRecAdminVM.IsPRNWithSchedule) {
                  this.objReq.objSlotDetailBC.ScheduleGenerationPresItemOID = this.oRecAdminVM.PrescriptionItemOID;
                  this.objReq.objSlotDetailBC.InfusionRecordAdminTypeCode = InfusionRecordAdminTypeCodes.AsRequiredAdministration;
                  this.objReq.bIsPRNBC = true;
              }
              objInfusionAdminDetail.ActionCode = this.oRecAdminVM.InfusionAction;
              objInfusionAdminDetail.ActionStartDate = this.oRecAdminVM.AdministeredDate.AddTime(this.oRecAdminVM.AdministeredDateTime);
              this.objReq.objSlotDetailBC.MCVersion = this.oRecAdminVM.MCVersionNo;
              if (!String.IsNullOrEmpty(this.oRecAdminVM.PresVolme) && !String.IsNullOrEmpty(this.oRecAdminVM.PresVolmeUOM)) {
                  this.objReq.objSlotDetailBC.AdministrationDetail.PlannedInfusionVolume = this.oRecAdminVM.PresVolme;
                  this.objReq.objSlotDetailBC.AdministrationDetail.PlannedInfusionVolumeUOMOID = this.oRecAdminVM.PresVolmeUOMOID;
              }
              this.objReq.objSlotDetailBC.AdministrationDetail.oInfusionAdminDetail.Add(objInfusionAdminDetail);
              if (this.oRecAdminVM.InfusionPastAction != null && (String.Compare(this.oRecAdminVM.InfusionPastAction, MedicationAction.STOP, StringComparison.InvariantCultureIgnoreCase) == 0) || (String.Compare(this.oRecAdminVM.InfusionPastAction, MedicationAction.COMPLETE, StringComparison.InvariantCultureIgnoreCase) == 0)) {
                  if (this.oRecAdminVM.InfusionRecordAdminTypeCode == InfusionRecordAdminTypeCodes.AmendmentAlertAdministration) {
                      this.objReq.objSlotDetailBC.ScheduleGenerationPresItemOID = this.oRecAdminVM.AmendedPrescriptionItemOID;
                      this.objReq.objSlotDetailBC.InfusionRecordAdminTypeCode = this.oRecAdminVM.InfusionRecordAdminTypeCode;
                  }
                  else if (this.oRecAdminVM.InfusionRecordAdminTypeCode == InfusionRecordAdminTypeCodes.ContinuousSequentialAdministration) {
                      this.objReq.objSlotDetailBC.ScheduleGenerationPresItemOID = this.oRecAdminVM.SequentialPrescItemOID;
                      this.objReq.objSlotDetailBC.InfusionRecordAdminTypeCode = this.oRecAdminVM.InfusionRecordAdminTypeCode;
                  }
                  let oInfusionPastAdminDetail: InfusionAdminDetail = new InfusionAdminDetail();
                  oInfusionPastAdminDetail = this.FillRequestForPastRecAdmin(this.objReq.objSlotDetailBC.AdministrationDetail);
                  if (oInfusionPastAdminDetail != null) {
                      this.objReq.objSlotDetailBC.AdministrationDetail.oInfusionAdminDetail.Add(oInfusionPastAdminDetail);
                  }
              }
          }
      }
      public override FillRequestForChangeBag(): void {
          if (String.Compare(this.oRecAdminVM.InfusionAction, MedicationAction.CHANGEBAG, StringComparison.InvariantCultureIgnoreCase) == 0) {
              this.objReq.objSlotDetailBC = new SlotDetail();
              this.objReq.objSlotDetailBC.AdministrationDetail = new AdministrationDetail();
              let objInfusionAdminDetail: InfusionAdminDetail = new InfusionAdminDetail();
              objInfusionAdminDetail.oInfusionBagDetail = new InfusionBagDetail();
              objInfusionAdminDetail.oInfusionBagDetail.AdministeredBy = new ObjectInfo();
              this.objReq.objSlotDetailBC.AdministrationDetail.oInfusionAdminDetail = new ObservableCollection<InfusionAdminDetail>();
              objInfusionAdminDetail.DripRateUOM = new UOM();
              objInfusionAdminDetail.DripRatePerUOM = new UOM();
              this.objReq.objSlotDetailBC.AdministrationDetail.MedAdminOID = this.oRecAdminVM.MedAdminOID;
              this.objReq.objSlotDetailBC.AdministrationDetail.MedicationAction = this.oRecAdminVM.InfusionAction;
              objInfusionAdminDetail.INFTYCode = this.oRecAdminVM.InfusionType.Value;
              this.objReq.objSlotDetailBC.AdministrationDetail.RouteOID = this.oRecAdminVM.SelectedRoute.Value;
              objInfusionAdminDetail.ActionCode = this.oRecAdminVM.InfusionAction;
              objInfusionAdminDetail.ActionStartDate = this.oRecAdminVM.AdministeredDate.AddTime(this.oRecAdminVM.AdministeredDateTime);
              objInfusionAdminDetail.oInfusionBagDetail.InfusedVolume = !String.IsNullOrEmpty(this.oRecAdminVM.VolumeInfused) ? this.oRecAdminVM.VolumeInfused : String.Empty;
              objInfusionAdminDetail.oInfusionBagDetail.InfusedVolumeUOM = new UOM();
              let VolumeInfusedUOMobj;
              Int64.TryParse(this.oRecAdminVM.VolumeInfusedUOM.Value, (o)=>{VolumeInfusedUOMobj=o})
              objInfusionAdminDetail.oInfusionBagDetail.InfusedVolumeUOM.UOMId = (this.oRecAdminVM.VolumeInfusedUOM != null && !String.IsNullOrEmpty(this.oRecAdminVM.VolumeInfusedUOM.Value)) ? VolumeInfusedUOMobj : 0;
              objInfusionAdminDetail.oInfusionBagDetail.AdminEndTime = this.oRecAdminVM.EndDate.AddTime(this.oRecAdminVM.EnddateTime);
              this.objReq.objSlotDetailBC.AdministrationDetail.Dose = this.oRecAdminVM.Dose;
              this.objReq.objSlotDetailBC.AdministrationDetail.DoseUOMOID = this.oRecAdminVM.DoseUOMOID;
              this.FillCommonInfusionDetails(objInfusionAdminDetail);
              objInfusionAdminDetail.DripRate = this.oRecAdminVM.DripRate;
              if (this.oRecAdminVM.DripRateUOMID > 0) {
                  objInfusionAdminDetail.DripRateUOM.UOMId = this.oRecAdminVM.DripRateUOMID;
              }
              if (this.oRecAdminVM.DripRatePerUOMID > 0) {
                  objInfusionAdminDetail.DripRatePerUOM.UOMId = this.oRecAdminVM.DripRatePerUOMID;
              }
              objInfusionAdminDetail.oInfusionBagDetail.BagVolume = this.oRecAdminVM.BagVolume;
              if (this.oRecAdminVM.BagVolumeUOM != null && !String.IsNullOrEmpty(this.oRecAdminVM.BagVolumeUOM.Value)) {
                  objInfusionAdminDetail.oInfusionBagDetail.BagVolumeUOM = new UOM();
                  objInfusionAdminDetail.oInfusionBagDetail.BagVolumeUOM.UOMId = Convert.ToInt64(this.oRecAdminVM.BagVolumeUOM.Value);
              }
              objInfusionAdminDetail.oInfusionBagDetail.ExpiryDate = this.oRecAdminVM.ExpiryDate;
              objInfusionAdminDetail.oInfusionBagDetail.BatchNumber = this.oRecAdminVM.BatchNumber;
              objInfusionAdminDetail.oInfusionBagDetail.AdminStartTime = this.oRecAdminVM.AdministeredDate.AddTime(this.oRecAdminVM.AdministeredDateTime);
              this.objReq.objSlotDetailBC.AdministrationDetail.AdministeredByOID = String.IsNullOrEmpty(this.oRecAdminVM.AdministeredByOID) ? 0 : Convert.ToInt64(this.oRecAdminVM.AdministeredByOID);
              this.objReq.objSlotDetailBC.AdministrationDetail.WitnessedByOID = !String.IsNullOrEmpty(this.oRecAdminVM.WitnessByOID) ? Number.Parse(this.oRecAdminVM.WitnessByOID) : 0;
              objInfusionAdminDetail.oInfusionBagDetail.IsWitnessNotAvailable = this.oRecAdminVM.IsNoWitnessAvialable;
              if (!String.IsNullOrEmpty(this.oRecAdminVM.Comments))
                  this.objReq.objSlotDetailBC.AdministrationDetail.AdminComments = this.oRecAdminVM.Comments;
              if (this.oRecAdminVM.VolumeInfusedUOM != null && !String.IsNullOrEmpty(this.oRecAdminVM.VolumeInfused) && this.oRecAdminVM.VolumeInfusedUOM.Tag != null)
                  this.objReq.objSlotDetailBC.AdministrationDetail.TotalVolumeInfused = Convert.ToString(CInfusionHelper.Convertml(Number.Parse(this.oRecAdminVM.VolumeInfused), this.oRecAdminVM.VolumeInfusedUOM.Tag.ToString()));
              this.objReq.objSlotDetailBC.AdministrationDetail.TotalVolumeInfusedUOMName = this.UOMValue();
              objInfusionAdminDetail.oInfusionBagDetail.BagSequence = this.oRecAdminVM.prevBagSeqNumber + 1;
              objInfusionAdminDetail.oInfusionBagDetail.PrevBagSequence = this.oRecAdminVM.prevBagSeqNumber;
              this.objReq.objSlotDetailBC.AdministrationDetail.oInfusionAdminDetail.Add(objInfusionAdminDetail);
          }
      }
      public override FillRequestForChangeFlowRate(): void {
          if (String.Compare(this.oRecAdminVM.InfusionAction, MedicationAction.CHANGEFLOWRATE, StringComparison.InvariantCultureIgnoreCase) == 0) {
              this.objReq.objSlotDetailBC = new SlotDetail();
              this.objReq.objSlotDetailBC.AdministrationDetail = new AdministrationDetail();
              let objInfusionAdminDetail: InfusionAdminDetail = new InfusionAdminDetail();
              objInfusionAdminDetail.oInfusionBagDetail = new InfusionBagDetail();
              this.objReq.objSlotDetailBC.AdministrationDetail.oInfusionAdminDetail = new ObservableCollection<InfusionAdminDetail>();
              this.objReq.objSlotDetailBC.AdministrationDetail.MedicationAction = this.oRecAdminVM.InfusionAction;
              this.objReq.objSlotDetailBC.AdministrationDetail.MedAdminOID = this.oRecAdminVM.MedAdminOID;
              objInfusionAdminDetail.INFTYCode = this.oRecAdminVM.InfusionType.Value;
              objInfusionAdminDetail.ActionCode = this.oRecAdminVM.InfusionAction;
              objInfusionAdminDetail.ActionStartDate = this.oRecAdminVM.AdministeredDate.AddTime(this.oRecAdminVM.AdministeredDateTime);
              if (!String.IsNullOrEmpty(this.oRecAdminVM.ChangedFloWRateComments))
                  this.objReq.objSlotDetailBC.AdministrationDetail.AdminComments = this.oRecAdminVM.ChangedFloWRateComments;
              objInfusionAdminDetail.oInfusionBagDetail.AdminStartTime = this.oRecAdminVM.AdministeredDate.AddTime(this.oRecAdminVM.AdministeredDateTime);
              objInfusionAdminDetail.DripRateUOM = new UOM();
              objInfusionAdminDetail.DripRatePerUOM = new UOM();
              if (this.oRecAdminVM.IsDontChangeInfusionRate && this.oRecAdminVM.DontChangeInfRateVisi == Visibility.Visible) {
                  objInfusionAdminDetail.DripRate = this.oRecAdminVM.DontChangeDripRateDefValue;
                  if (this.oRecAdminVM.DontChangeDripRateDefUOMOID > 0) {
                      objInfusionAdminDetail.DripRateUOM.UOMId = this.oRecAdminVM.DontChangeDripRateDefUOMOID;
                  }
                  if (this.oRecAdminVM.DontChangeDripRateDefPerUOMOID > 0) {
                      objInfusionAdminDetail.DripRatePerUOM.UOMId = this.oRecAdminVM.DontChangeDripRateDefPerUOMOID;
                  }
              }
              else {
                  objInfusionAdminDetail.DripRate = this.oRecAdminVM.DripRate;
                  if (this.oRecAdminVM.DripRateUOMID > 0) {
                      objInfusionAdminDetail.DripRateUOM.UOMId = this.oRecAdminVM.DripRateUOMID;
                  }
                  if (this.oRecAdminVM.DripRatePerUOMID > 0) {
                      objInfusionAdminDetail.DripRatePerUOM.UOMId = this.oRecAdminVM.DripRatePerUOMID;
                  }
              }
              if (this.oRecAdminVM.IsDontChangeInfusionRate && this.oRecAdminVM.DontChangeInfRateVisi == Visibility.Visible) {
                  objInfusionAdminDetail.InfusionRate = this.oRecAdminVM.DontChangeInfRateDefValue;
                  objInfusionAdminDetail.InfusionRateUOM = new UOM();
                  objInfusionAdminDetail.InfusionRateUOM.UOMId = this.oRecAdminVM.DontChangeInfRateDefUOMOID;
                  objInfusionAdminDetail.InfusionRatePerUOM = new UOM();
                  objInfusionAdminDetail.InfusionRatePerUOM.UOMId = this.oRecAdminVM.DontChangeInfRateDefPerUOMOID;
              }
              else {
                  objInfusionAdminDetail.InfusionRate = this.oRecAdminVM.ChangedInfusionRate;
                  if (this.oRecAdminVM.ChangedInfRateNumUOM != null && !String.IsNullOrEmpty(this.oRecAdminVM.ChangedInfRateNumUOM.Value)) {
                      objInfusionAdminDetail.InfusionRateUOM = new UOM();
                      objInfusionAdminDetail.InfusionRateUOM.UOMId = Convert.ToInt64(this.oRecAdminVM.ChangedInfRateNumUOM.Value);
                  }
                  if (this.oRecAdminVM.ChangedInfRateDinUOM != null && !String.IsNullOrEmpty(this.oRecAdminVM.ChangedInfRateDinUOM.Value)) {
                      objInfusionAdminDetail.InfusionRatePerUOM = new UOM();
                      objInfusionAdminDetail.InfusionRatePerUOM.UOMId = Convert.ToInt64(this.oRecAdminVM.ChangedInfRateDinUOM.Value);
                  }
              }
              this.FillCommonInfusionDetails(objInfusionAdminDetail);
              this.objReq.objSlotDetailBC.AdministrationDetail.oInfusionAdminDetail.Add(objInfusionAdminDetail);
          }
      }
      public override FillRequestForStop(): void {
          if (String.Compare(this.oRecAdminVM.InfusionAction, MedicationAction.STOP, StringComparison.InvariantCultureIgnoreCase) == 0) {
              this.objReq.objSlotDetailBC = new SlotDetail();
              if (this.oRecAdminVM.InfusionRecordAdminTypeCode == InfusionRecordAdminTypeCodes.AmendmentAlertAdministration) {
                  this.objReq.objSlotDetailBC.ScheduleGenerationPresItemOID = this.oRecAdminVM.AmendedPrescriptionItemOID;
                  this.objReq.objSlotDetailBC.InfusionRecordAdminTypeCode = this.oRecAdminVM.InfusionRecordAdminTypeCode;
              }
              else if (this.oRecAdminVM.InfusionRecordAdminTypeCode == InfusionRecordAdminTypeCodes.ContinuousSequentialAdministration) {
                  this.objReq.objSlotDetailBC.ScheduleGenerationPresItemOID = this.oRecAdminVM.SequentialPrescItemOID;
                  this.objReq.objSlotDetailBC.InfusionRecordAdminTypeCode = this.oRecAdminVM.InfusionRecordAdminTypeCode;
              }
              this.objReq.objSlotDetailBC.MCVersion = this.oRecAdminVM.MCVersionNo;
              this.objReq.objSlotDetailBC.PrescriptionType = (PatientContext.PrescriptionType != null && PatientContext.PrescriptionType.Trim().length > 0) ? PatientContext.PrescriptionType : PrescriptionTypes.ForAdministration;
              this.objReq.objSlotDetailBC.AdministrationDetail = new AdministrationDetail();
              let objInfusionAdminDetail: InfusionAdminDetail = new InfusionAdminDetail();
              objInfusionAdminDetail.oInfusionBagDetail = new InfusionBagDetail();
              this.objReq.objSlotDetailBC.AdministrationDetail.oInfusionAdminDetail = new ObservableCollection<InfusionAdminDetail>();
              this.objReq.objSlotDetailBC.AdministrationDetail.MedAdminOID = this.oRecAdminVM.MedAdminOID;
              this.objReq.objSlotDetailBC.AdministrationDetail.MedicationAction = this.oRecAdminVM.InfusionAction;
              objInfusionAdminDetail.INFTYCode = this.oRecAdminVM.InfusionType.Value;
              objInfusionAdminDetail.ActionCode = this.oRecAdminVM.InfusionAction;
              objInfusionAdminDetail.ActionStartDate = this.oRecAdminVM.AdministeredstopDate.AddTime(this.oRecAdminVM.AdministeredstopDateTime);
              this.objReq.objSlotDetailBC.AdministrationDetail.Dose = !String.IsNullOrEmpty(this.oRecAdminVM.DoseAdministered) ? this.oRecAdminVM.DoseAdministered : this.oRecAdminVM.Dose;
              this.objReq.objSlotDetailBC.AdministrationDetail.DoseUOMOID = this.oRecAdminVM.DoseUOMOID;
              objInfusionAdminDetail.oInfusionBagDetail.InfusedVolume = !String.IsNullOrEmpty(this.oRecAdminVM.VolumeInfused) ? this.oRecAdminVM.VolumeInfused : String.Empty;
              objInfusionAdminDetail.oInfusionBagDetail.InfusedVolumeUOM = new UOM();
              let VolumeInfusedUOMobj;
              if (this.oRecAdminVM.VolumeInfusedUOM) {
                Int64.TryParse(this.oRecAdminVM.VolumeInfusedUOM.Value, (o) => { VolumeInfusedUOMobj = o });  
            }        
            //  Int64.TryParse(this.oRecAdminVM.VolumeInfusedUOM.Value, (o)=>{VolumeInfusedUOMobj=o})
              objInfusionAdminDetail.oInfusionBagDetail.InfusedVolumeUOM.UOMId = ((this.oRecAdminVM.VolumeInfusedUOM != null) && !String.IsNullOrEmpty(this.oRecAdminVM.VolumeInfusedUOM.Value)) ? VolumeInfusedUOMobj : 0;
              objInfusionAdminDetail.oInfusionBagDetail.AdminEndTime = this.oRecAdminVM.AdministeredstopDate.AddTime(this.oRecAdminVM.AdministeredstopDateTime);
              if (this.oRecAdminVM.VolumeInfusedUOM != null && !String.IsNullOrEmpty(this.oRecAdminVM.VolumeInfused) && this.oRecAdminVM.VolumeInfusedUOM.Tag != null)
                  this.objReq.objSlotDetailBC.AdministrationDetail.TotalVolumeInfused = Convert.ToString(CInfusionHelper.Convertml(Number.Parse(this.oRecAdminVM.VolumeInfused), this.oRecAdminVM.VolumeInfusedUOM.Tag.ToString()));
              this.objReq.objSlotDetailBC.AdministrationDetail.TotalVolumeInfusedUOMName = this.UOMValue();
              if (!String.IsNullOrEmpty(this.oRecAdminVM.ReasonforStop.Value))
                  this.objReq.objSlotDetailBC.AdministrationDetail.AdminReasonCode = this.oRecAdminVM.ReasonforStop.Value;
              if (!String.IsNullOrEmpty(this.oRecAdminVM.StopComments)) {
                  objInfusionAdminDetail.AdminComments = this.oRecAdminVM.StopComments;
              }
              objInfusionAdminDetail.oInfusionBagDetail.PrevBagSequence = this.oRecAdminVM.prevBagSeqNumber;
              if (this.objVm != null && this.objVm.AdministrationDetail != null && this.objVm.AdministrationDetail.DoseDiscReasonCode != null && this.objVm.AdministrationDetail.DoseDiscReasonCode.Value != null && !String.IsNullOrEmpty(this.oRecAdminVM.DoseAdministered) && !String.IsNullOrEmpty(this.oRecAdminVM.Dose) && (this.oRecAdminVM.DoseAdministered != this.oRecAdminVM.Dose)) {
                  this.objReq.objSlotDetailBC.AdministrationDetail.DoseDiscReasonCode = this.objVm.AdministrationDetail.DoseDiscReasonCode.Value;
                  this.objReq.objSlotDetailBC.AdministrationDetail.Dose = this.oRecAdminVM.DoseAdministered;
                  this.objReq.objSlotDetailBC.AdministrationDetail.DoseDiscComments = this.objVm.AdministrationDetail.DoseDiscComments;
              }
              this.objReq.objSlotDetailBC.AdministrationDetail.oInfusionAdminDetail.Add(objInfusionAdminDetail);
          }
      }
      public override FillRequestForComplete(): void {
          if (String.Compare(this.oRecAdminVM.InfusionAction, MedicationAction.COMPLETE, StringComparison.InvariantCultureIgnoreCase) == 0) {
              this.objReq.objSlotDetailBC = new SlotDetail();
              if (this.oRecAdminVM.InfusionRecordAdminTypeCode == InfusionRecordAdminTypeCodes.AmendmentAlertAdministration) {
                  this.objReq.objSlotDetailBC.ScheduleGenerationPresItemOID = this.oRecAdminVM.AmendedPrescriptionItemOID;
                  this.objReq.objSlotDetailBC.InfusionRecordAdminTypeCode = this.oRecAdminVM.InfusionRecordAdminTypeCode;
              }
              else if (this.oRecAdminVM.InfusionRecordAdminTypeCode == InfusionRecordAdminTypeCodes.ContinuousSequentialAdministration) {
                  this.objReq.objSlotDetailBC.ScheduleGenerationPresItemOID = this.oRecAdminVM.SequentialPrescItemOID;
                  this.objReq.objSlotDetailBC.InfusionRecordAdminTypeCode = this.oRecAdminVM.InfusionRecordAdminTypeCode;
              }
              this.objReq.objSlotDetailBC.MCVersion = this.oRecAdminVM.MCVersionNo;
              this.objReq.objSlotDetailBC.PrescriptionType = (PatientContext.PrescriptionType != null && PatientContext.PrescriptionType.Trim().length > 0) ? PatientContext.PrescriptionType : PrescriptionTypes.ForAdministration;
              this.objReq.objSlotDetailBC.AdministrationDetail = new AdministrationDetail();
              let objInfusionAdminDetail: InfusionAdminDetail = new InfusionAdminDetail();
              objInfusionAdminDetail.oInfusionBagDetail = new InfusionBagDetail();
              this.objReq.objSlotDetailBC.AdministrationDetail.oInfusionAdminDetail = new ObservableCollection<InfusionAdminDetail>();
              this.objReq.objSlotDetailBC.AdministrationDetail.MedAdminOID = this.oRecAdminVM.MedAdminOID;
              this.objReq.objSlotDetailBC.AdministrationDetail.MedicationAction = this.oRecAdminVM.InfusionAction;
              objInfusionAdminDetail.INFTYCode = this.oRecAdminVM.InfusionType.Value;
              objInfusionAdminDetail.ActionCode = this.oRecAdminVM.InfusionAction;
              objInfusionAdminDetail.ActionStartDate = this.oRecAdminVM.AdministeredstopDate.AddTime(this.oRecAdminVM.AdministeredstopDateTime);
              objInfusionAdminDetail.oInfusionBagDetail.AdminEndTime = this.oRecAdminVM.AdministeredstopDate.AddTime(this.oRecAdminVM.AdministeredstopDateTime);
              if (!String.IsNullOrEmpty(this.oRecAdminVM.StopComments)) {
                  objInfusionAdminDetail.AdminComments = this.oRecAdminVM.StopComments;
              }
              this.objReq.objSlotDetailBC.AdministrationDetail.Dose = !String.IsNullOrEmpty(this.oRecAdminVM.DoseAdministered) ? this.oRecAdminVM.DoseAdministered : this.oRecAdminVM.Dose;
              this.objReq.objSlotDetailBC.AdministrationDetail.DoseUOMOID = this.oRecAdminVM.DoseUOMOID;
              objInfusionAdminDetail.oInfusionBagDetail.InfusedVolume = !String.IsNullOrEmpty(this.oRecAdminVM.VolumeInfused) ? this.oRecAdminVM.VolumeInfused : String.Empty;
              objInfusionAdminDetail.oInfusionBagDetail.InfusedVolumeUOM = new UOM();
              let VolumeInfusedUOMobj;
              if (this.oRecAdminVM.VolumeInfusedUOM) {
              Int64.TryParse(this.oRecAdminVM.VolumeInfusedUOM.Value, (o)=>{VolumeInfusedUOMobj=o})}
              objInfusionAdminDetail.oInfusionBagDetail.InfusedVolumeUOM.UOMId = ((this.oRecAdminVM.VolumeInfusedUOM != null) && (!String.IsNullOrEmpty(this.oRecAdminVM.VolumeInfusedUOM.Value))) ? VolumeInfusedUOMobj : 0;
              if (this.oRecAdminVM.VolumeInfusedUOM != null && !String.IsNullOrEmpty(this.oRecAdminVM.VolumeInfused) && this.oRecAdminVM.VolumeInfusedUOM.Tag != null)
                  this.objReq.objSlotDetailBC.AdministrationDetail.TotalVolumeInfused = Convert.ToString(CInfusionHelper.Convertml(Number.Parse(this.oRecAdminVM.VolumeInfused), this.oRecAdminVM.VolumeInfusedUOM.Tag.ToString()));
              this.objReq.objSlotDetailBC.AdministrationDetail.TotalVolumeInfusedUOMName = this.UOMValue();
              if (this.objVm != null && this.objVm.AdministrationDetail != null && this.objVm.AdministrationDetail.DoseDiscReasonCode != null && this.objVm.AdministrationDetail.DoseDiscReasonCode.Value != null && !String.IsNullOrEmpty(this.oRecAdminVM.DoseAdministered) && !String.IsNullOrEmpty(this.oRecAdminVM.Dose) && (this.oRecAdminVM.DoseAdministered != this.oRecAdminVM.Dose)) {
                  this.objReq.objSlotDetailBC.AdministrationDetail.DoseDiscReasonCode = this.objVm.AdministrationDetail.DoseDiscReasonCode.Value;
                  this.objReq.objSlotDetailBC.AdministrationDetail.Dose = this.oRecAdminVM.DoseAdministered;
                  this.objReq.objSlotDetailBC.AdministrationDetail.DoseDiscComments = this.objVm.AdministrationDetail.DoseDiscComments;
              }
              objInfusionAdminDetail.oInfusionBagDetail.PrevBagSequence = this.oRecAdminVM.prevBagSeqNumber;
              this.objReq.objSlotDetailBC.AdministrationDetail.oInfusionAdminDetail.Add(objInfusionAdminDetail);
          }
      }
  }
