import { Convert} from 'epma-platform/services';
import { StringComparison,ObservableCollection, PatientContext } from 'epma-platform/models';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import { InfRecAdmBase } from './InfRecAdmBase';
import { CConstants, InfusionRecordAdminTypeCodes, MedicationAction, PrescriptionTypes } from '../utilities/CConstants';
import { AdministrationDetail, InfusionAdminDetail, InfusionBagDetail, SlotDetail, UOM } from 'src/app/shared/epma-platform/soap-client/MedicationAdministrationWS';

  export class InfRecAdmGas extends InfRecAdmBase {
      public override ValidateForBegun(): boolean {
          if (!String.IsNullOrEmpty(this.oRecAdminVM.ItemSubType) && String.Compare(this.oRecAdminVM.ItemSubType, "CC_MEDGAS", StringComparison.CurrentCultureIgnoreCase) == 0) {
              if (DateTime.Equals(this.oRecAdminVM.AdministeredDate.Date , DateTime.MinValue)) {
                  this.RaisedValidationFailed("InfRecMandMsg_BegunDate", "dtpDatebegun", null);
                  return false;
              }
              else if (this.oRecAdminVM.SelectedRoute == null || (String.IsNullOrEmpty(this.oRecAdminVM.SelectedRoute.DisplayText) && String.IsNullOrEmpty(this.oRecAdminVM.SelectedRoute.Value))) {
                  this.RaisedValidationFailed("InfRecMandMsg_Route", "cboRoute", null);
                  return false;
              }
              else if (!this.ValidateForPrescDTTM("timeDateTimeGivenText"))
                  return false;
              else if (this.oRecAdminVM.IsMandatoryInfusionrate && String.IsNullOrEmpty(this.oRecAdminVM.InfusionRate)) {
                  this.RaisedValidationFailed("InfRecErrMsg_FlowRate", "txtFlowrate", null);
                  return false;
              }
              else if (this.oRecAdminVM.IsMandatoryInfusionrate && !String.IsNullOrEmpty(this.oRecAdminVM.InfusionRate) && String.Compare(this.oRecAdminVM.InfusionRate, "0") == 0) {
                  this.RaisedValidationFailed("InfRecErrMsg_FlowRateValue", "txtFlowrate", null);
                  return false;
              }
              else if (this.oRecAdminVM.IsMandatoryInfusionrate && this.oRecAdminVM.FlowrateNumUOM == null) {
                  this.RaisedValidationFailed("InfRecErrMsg_FlowRateUOM", "cboinfucon", null);
                  return false;
              }
              else if (this.oRecAdminVM.IsMandatoryInfusionrate && this.oRecAdminVM.FlowrateDenUOM == null) {
                  this.RaisedValidationFailed("InfRecErrMsg_FlowRateUOM", "cboinfuconcent", null);
                  return false;
              }
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
                  this.RaisedValidationFailed("InfRecMandMsg_Comments", "txtGasComments", null);
                  return false;
              }
          }
          return true;
      }
      public override ValidateForChangeFlowRate(): boolean {
          if (String.Compare(this.oRecAdminVM.InfusionAction, MedicationAction.CHANGEFLOWRATE, StringComparison.CurrentCultureIgnoreCase) == 0) {
              if (String.IsNullOrEmpty(this.oRecAdminVM.ChangedInfusionRate)) {
                  this.RaisedValidationFailed("InfRecMandMsg_ChngInfRate", "txtinfucon", null);
                  return false;
              }
              else if (!String.IsNullOrEmpty(this.oRecAdminVM.ChangedInfusionRate) && String.Compare(this.oRecAdminVM.ChangedInfusionRate, "0") == 0) {
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
            //   else if (this.oRecAdminVM.AdministeredDate.Date == DateTime.MinValue) {
              else if (DateTime.Equals(this.oRecAdminVM.AdministeredDate.Date , DateTime.MinValue)) {
                  this.RaisedValidationFailed("InfRecMandMsg_ChngDate", "dtpchangeDate", null);
                  return false;
              }
              else if (this.oRecAdminVM.IsClinicalRSNMand && String.IsNullOrEmpty(this.oRecAdminVM.ChangedFloWRateComments)) {
                  this.RaisedValidationFailed("InfRecMandMsg_Comments", "txtComments", null);
                  return false;
              }
              else if (!this.ValidateForLastDTTM("iTimedchangeTime", this.oRecAdminVM.AdministeredDateTime, "InfRecMsg_FlowrateDateTime"))
                  return false;
          }
          return true;
      }
      public override ValidateForStop(): boolean {
          if (DateTime.Equals(this.oRecAdminVM.AdministeredstopDate.Date , DateTime.MinValue)) {
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
          return true;
      }
      public override ValidateForComplete(): boolean {
          if (String.Compare(this.oRecAdminVM.InfusionAction, MedicationAction.COMPLETE, StringComparison.CurrentCultureIgnoreCase) == 0 || String.Compare(this.oRecAdminVM.InfusionPastAction, MedicationAction.COMPLETE, StringComparison.CurrentCultureIgnoreCase) == 0) {
              if (DateTime.Equals(this.oRecAdminVM.AdministeredstopDate.Date , DateTime.MinValue)) {
                  this.RaisedValidationFailed("InfRecMandMsg_Enddate", "dtpendDate", null);
                  return false;
              }
              else if (!this.ValidateForLastDTTM("iTimedendTime", this.oRecAdminVM.AdministeredstopDateTime, "InfRecMsg_StopCompleteDateTime"))
                  return false;
          }
          return true;
      }
      public override FillRequestForBegun(): void {
          if (this.oRecAdminVM.InfusionAction != null && String.Compare(this.oRecAdminVM.InfusionAction, MedicationAction.BEGUN, StringComparison.InvariantCultureIgnoreCase) == 0) {
              this.objReq.objSlotDetailBC = new SlotDetail();
              this.objReq.objSlotDetailBC.AdministrationDetail = new AdministrationDetail();
              let objInfusionAdminDetail: InfusionAdminDetail = new InfusionAdminDetail();
              objInfusionAdminDetail.oInfusionBagDetail = new InfusionBagDetail();
              let enddt: DateTime= DateTime.MinValue;
              this.objReq.objSlotDetailBC.AdministrationDetail.oInfusionAdminDetail = new ObservableCollection<InfusionAdminDetail>();
              this.objReq.objSlotDetailBC.AdministrationDetail.MedicationAction = this.oRecAdminVM.InfusionAction;
              this.objReq.objSlotDetailBC.AdministrationDetail.MedAdminOID = this.oRecAdminVM.MedAdminOID;
              if (!String.IsNullOrEmpty(this.oRecAdminVM.ItemSubType) && String.Compare(this.oRecAdminVM.ItemSubType, "CC_MEDGAS", StringComparison.CurrentCultureIgnoreCase) == 0) {
                  this.objReq.objSlotDetailBC.InfusionPeriod = this.oRecAdminVM.PrescriptionDuration > 0 ? Convert.ToDouble(this.oRecAdminVM.PrescriptionDuration) : 0;
                  this.objReq.objSlotDetailBC.InfusionPeriodLorenzoID = this.oRecAdminVM.PrescriptionDuration > 0 ? "CC_MINUTES" : String.Empty;
              }
              objInfusionAdminDetail.ActionCode = this.oRecAdminVM.InfusionAction;
              objInfusionAdminDetail.ActionStartDate = this.oRecAdminVM.AdministeredDate.AddTime(this.oRecAdminVM.AdministeredDateTime);
              this.objReq.objSlotDetailBC.OID = this.oRecAdminVM.PresScheduleOID;
              objInfusionAdminDetail.INFTYCode = this.oRecAdminVM.ItemSubType;
              this.objReq.objSlotDetailBC.AdministrationDetail.RouteOID = this.oRecAdminVM.SelectedRoute.Value;
              if (!String.IsNullOrEmpty(this.oRecAdminVM.InfusionRate) && this.oRecAdminVM.FlowrateNumUOM != null && this.oRecAdminVM.FlowrateDenUOM != null) {
                  objInfusionAdminDetail.InfusionRate = this.oRecAdminVM.InfusionRate;
                  objInfusionAdminDetail.InfusionRateUOM = new UOM();
                  objInfusionAdminDetail.InfusionRateUOM.UOMId = Convert.ToInt64(this.oRecAdminVM.FlowrateNumUOM.Value);
                  objInfusionAdminDetail.InfusionRateUOM.UOMCode = this.oRecAdminVM.FlowrateNumUOM.Tag.ToString();
                  objInfusionAdminDetail.InfusionRatePerUOM = new UOM();
                  objInfusionAdminDetail.InfusionRatePerUOM.UOMId = Convert.ToInt64(this.oRecAdminVM.FlowrateDenUOM.Value);
                  objInfusionAdminDetail.InfusionRatePerUOM.UOMCode = this.oRecAdminVM.FlowrateDenUOM.Tag.ToString();
              }
              this.objReq.objSlotDetailBC.AdministrationDetail.AdministeredByOID = String.IsNullOrEmpty(this.oRecAdminVM.AdministeredByOID) ? 0 : Convert.ToInt64(this.oRecAdminVM.AdministeredByOID);
              this.objReq.objSlotDetailBC.AdministrationDetail.WitnessedByOID = !String.IsNullOrEmpty(this.oRecAdminVM.WitnessByOID) ? Number.Parse(this.oRecAdminVM.WitnessByOID) : 0;
              objInfusionAdminDetail.oInfusionBagDetail.IsWitnessNotAvailable = this.oRecAdminVM.IsNoWitnessAvialable;
              if (!String.IsNullOrEmpty(this.oRecAdminVM.Comments))
                  this.objReq.objSlotDetailBC.AdministrationDetail.AdminComments = this.oRecAdminVM.Comments;
              objInfusionAdminDetail.oInfusionBagDetail.AdminStartTime = this.oRecAdminVM.AdministeredDate.AddTime(this.oRecAdminVM.AdministeredDateTime);
              objInfusionAdminDetail.oInfusionBagDetail.AdminEndTime = DateTime.MinValue;
              this.objReq.objSlotDetailBC.AdministrationDetail.InfusionEndDate = DateTime.MinValue;
              objInfusionAdminDetail.oInfusionBagDetail.ExpiryDate = this.oRecAdminVM.ExpiryDate;
              objInfusionAdminDetail.oInfusionBagDetail.BatchNumber = this.oRecAdminVM.BatchNumber;
              objInfusionAdminDetail.oInfusionBagDetail.BagSequence = 1;
              if (this.oRecAdminVM.DeliveryDevice != null && !String.IsNullOrEmpty(this.oRecAdminVM.DeliveryDevice.Value)) {
                  this.objReq.objSlotDetailBC.AdministrationDetail.DeliveryDevice = this.oRecAdminVM.DeliveryDevice.Value;
              }
              else if (!String.IsNullOrEmpty(this.oRecAdminVM.DeliveryDeviceText)) {
                  this.objReq.objSlotDetailBC.AdministrationDetail.DeliveryDevice = this.oRecAdminVM.DeliveryDeviceText;
              }
              if (this.oRecAdminVM.InfusionRecordAdminTypeCode == InfusionRecordAdminTypeCodes.AsRequiredAdministration) {
                  this.objReq.objSlotDetailBC.ScheduleGenerationPresItemOID = this.oRecAdminVM.PrescriptionItemOID;
                  this.objReq.objSlotDetailBC.InfusionRecordAdminTypeCode = this.oRecAdminVM.InfusionRecordAdminTypeCode;
                  this.objReq.bIsPRNBC = true;
              }
              else if (this.oRecAdminVM.InfusionRecordAdminTypeCode == InfusionRecordAdminTypeCodes.IsRetrospectivePRN) {
                  this.objReq.objSlotDetailBC.ScheduleGenerationPresItemOID = this.oRecAdminVM.PrescriptionItemOID;
                  this.objReq.objSlotDetailBC.InfusionRecordAdminTypeCode = InfusionRecordAdminTypeCodes.AsRequiredAdministration;
                  this.objReq.bIsPRNBC = true;
              }
              objInfusionAdminDetail.Humidification = (this.oRecAdminVM.Humidification != null && !String.IsNullOrEmpty(this.oRecAdminVM.Humidification.Value)) ? this.oRecAdminVM.Humidification.Value : String.Empty;
              this.objReq.objSlotDetailBC.AdministrationDetail.oInfusionAdminDetail.Add(objInfusionAdminDetail);
              if (this.oRecAdminVM.InfusionPastAction != null && (String.Equals(this.oRecAdminVM.InfusionPastAction, MedicationAction.STOP, StringComparison.InvariantCultureIgnoreCase) || String.Equals(this.oRecAdminVM.InfusionPastAction, MedicationAction.COMPLETE, StringComparison.InvariantCultureIgnoreCase))) {
                  let oInfusionPastAdminDetail: InfusionAdminDetail = new InfusionAdminDetail();
                  oInfusionPastAdminDetail.oInfusionBagDetail = new InfusionBagDetail();
                  this.objReq.objSlotDetailBC.AdministrationDetail.MedicationPastAction = this.oRecAdminVM.InfusionPastAction;
                  oInfusionPastAdminDetail.INFTYCode = this.oRecAdminVM.ItemSubType;
                  oInfusionPastAdminDetail.ActionCode = this.oRecAdminVM.InfusionPastAction;
                  oInfusionPastAdminDetail.ActionStartDate = this.oRecAdminVM.AdministeredDate.AddTime(this.oRecAdminVM.AdministeredDateTime);
                  oInfusionPastAdminDetail.oInfusionBagDetail.AdminEndTime = this.oRecAdminVM.AdministeredstopDate.AddTime(this.oRecAdminVM.AdministeredstopDateTime);
                  if (this.oRecAdminVM.ReasonforStop != null && !String.IsNullOrEmpty(this.oRecAdminVM.ReasonforStop.Value) && (String.Equals(this.oRecAdminVM.InfusionPastAction, MedicationAction.STOP, StringComparison.InvariantCultureIgnoreCase))) {
                      this.objReq.objSlotDetailBC.AdministrationDetail.AdminReasonCode = this.oRecAdminVM.ReasonforStop.Value;
                  }
                  if (!String.IsNullOrEmpty(this.oRecAdminVM.StopComments))
                      oInfusionPastAdminDetail.AdminComments = this.oRecAdminVM.StopComments;
                  this.objReq.objSlotDetailBC.AdministrationDetail.oInfusionAdminDetail.Add(oInfusionPastAdminDetail);
              }
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
              objInfusionAdminDetail.INFTYCode = this.oRecAdminVM.ItemSubType;
              objInfusionAdminDetail.ActionCode = this.oRecAdminVM.InfusionAction;
              objInfusionAdminDetail.ActionStartDate = this.oRecAdminVM.AdministeredDate.AddTime(this.oRecAdminVM.AdministeredDateTime);
              if (!String.IsNullOrEmpty(this.oRecAdminVM.ChangedFloWRateComments))
                  this.objReq.objSlotDetailBC.AdministrationDetail.AdminComments = this.oRecAdminVM.ChangedFloWRateComments;
              objInfusionAdminDetail.oInfusionBagDetail.AdminStartTime = this.oRecAdminVM.AdministeredDate.AddTime(this.oRecAdminVM.AdministeredDateTime);
              objInfusionAdminDetail.InfusionRate = this.oRecAdminVM.ChangedInfusionRate;
              if (this.oRecAdminVM.InfusionRateUOMNumerator != null && !String.IsNullOrEmpty(this.oRecAdminVM.InfusionRateUOMNumerator.Value)) {
                  objInfusionAdminDetail.InfusionRateUOM = new UOM();
                  objInfusionAdminDetail.InfusionRateUOM.UOMId = Convert.ToInt64(this.oRecAdminVM.ChangedInfRateNumUOM.Value);
              }
              if (this.oRecAdminVM.InfusionRateUOMDenominator != null && !String.IsNullOrEmpty(this.oRecAdminVM.InfusionRateUOMDenominator.Value)) {
                  objInfusionAdminDetail.InfusionRatePerUOM = new UOM();
                  objInfusionAdminDetail.InfusionRatePerUOM.UOMId = Convert.ToInt64(this.oRecAdminVM.ChangedInfRateDinUOM.Value);
              }
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
              if (!String.IsNullOrEmpty(this.oRecAdminVM.AmendedAsRequired) && String.Equals(this.oRecAdminVM.AmendedAsRequired, CConstants.AsRequired, StringComparison.CurrentCultureIgnoreCase) && this.oRecAdminVM.InfusionRecordAdminTypeCode == InfusionRecordAdminTypeCodes.AmendmentAlertAdministration) {
                  objInfusionAdminDetail.ActionStartDate = DateTime.MinValue;
              }
              else {
                  objInfusionAdminDetail.ActionStartDate = this.oRecAdminVM.AdministeredDate.AddTime(this.oRecAdminVM.AdministeredstopDateTime);
              }
              objInfusionAdminDetail.oInfusionBagDetail.AdminEndTime = this.oRecAdminVM.AdministeredstopDate.AddTime(this.oRecAdminVM.AdministeredstopDateTime);
              if (!String.IsNullOrEmpty(this.oRecAdminVM.ReasonforStop.Value))
                  this.objReq.objSlotDetailBC.AdministrationDetail.AdminReasonCode = this.oRecAdminVM.ReasonforStop.Value;
              if (!String.IsNullOrEmpty(this.oRecAdminVM.StopComments)) {
                  objInfusionAdminDetail.AdminComments = this.oRecAdminVM.StopComments;
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
              this.objReq.objSlotDetailBC.MCVersion = this.oRecAdminVM.MCVersionNo;
              this.objReq.objSlotDetailBC.PrescriptionType = (PatientContext.PrescriptionType != null && PatientContext.PrescriptionType.Trim().length > 0) ? PatientContext.PrescriptionType : PrescriptionTypes.ForAdministration;
              this.objReq.objSlotDetailBC.AdministrationDetail = new AdministrationDetail();
              let objInfusionAdminDetail: InfusionAdminDetail = new InfusionAdminDetail();
              objInfusionAdminDetail.oInfusionBagDetail = new InfusionBagDetail();
              this.objReq.objSlotDetailBC.AdministrationDetail.oInfusionAdminDetail = new ObservableCollection<InfusionAdminDetail>();
              this.objReq.objSlotDetailBC.AdministrationDetail.MedAdminOID = this.oRecAdminVM.MedAdminOID;
              this.objReq.objSlotDetailBC.AdministrationDetail.MedicationAction = this.oRecAdminVM.InfusionAction;
              objInfusionAdminDetail.INFTYCode = this.oRecAdminVM.ItemSubType;
              objInfusionAdminDetail.ActionCode = this.oRecAdminVM.InfusionAction;
              if (!String.IsNullOrEmpty(this.oRecAdminVM.AmendedAsRequired) && String.Equals(this.oRecAdminVM.AmendedAsRequired, CConstants.AsRequired, StringComparison.CurrentCultureIgnoreCase) && this.oRecAdminVM.InfusionRecordAdminTypeCode == InfusionRecordAdminTypeCodes.AmendmentAlertAdministration) {
                  objInfusionAdminDetail.ActionStartDate = DateTime.MinValue;
              }
              else {
                  objInfusionAdminDetail.ActionStartDate = this.oRecAdminVM.AdministeredDate.AddTime(this.oRecAdminVM.AdministeredstopDateTime);
              }
              objInfusionAdminDetail.oInfusionBagDetail.AdminEndTime = this.oRecAdminVM.AdministeredstopDate.AddTime(this.oRecAdminVM.AdministeredstopDateTime);
              if (!String.IsNullOrEmpty(this.oRecAdminVM.StopComments))
                  objInfusionAdminDetail.AdminComments = this.oRecAdminVM.StopComments;
              this.objReq.objSlotDetailBC.AdministrationDetail.oInfusionAdminDetail.Add(objInfusionAdminDetail);
          }
      }
  }
