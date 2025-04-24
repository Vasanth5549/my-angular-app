import DateTime, { DateTimeStyles } from 'epma-platform/DateTime';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate, ContextManager, Convert, ProcessRTE, MediatorDataService } from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
import { IViewModelBase } from 'src/app/lorappcommonbb/viewmodelbase';
import { Dictionary } from 'epma-platform/dictionary';
import { MedicationCommonConceptCodeData } from 'src/app/lorappmedicationcommonbb/utilities/profiledata';
import { ConflictsVM } from 'src/app/lorappmedicationcommonbb/viewmodel/conflictsvm';
import { WarningDetails } from 'src/app/shared/epma-platform/soap-client/IPPMAManagePrescriptionWS';
import { Resource } from '../../resource';
import { Common } from '../../utilities/common';
import { CConstants,ValueDomain } from '../../utilities/constants';
import { CPremission, GlobalVariable, QueryStringInfo, WebServiceURL } from '../../utilities/globalvariable';
import { ProfileData, WarningConceptCode } from '../../utilities/profiledata'; 
import * as IPPMAManagePrescSer from '../../../shared/epma-platform/soap-client/IPPMAManagePrescriptionWS';
import { LzoWizardVmbaseService as LzoWizardVMBase } from 'src/app/shared/epma-platform/services/lzo-wizard-vmbase.service';
import * as Application from 'src/app/lorappcommonbb/amshelper';
import { AppContextInfo, AppSessionInfo,ContextInfo, PatientContext } from 'src/app/lorappcommonbb/utilities/globalvariable';
import {  Byte, Int64, StringComparison, ObservableCollection, CListItem, CValuesetTerm,   List,  RTEEventargs, int64 } from 'epma-platform/models';
import { InjectorInstance } from 'src/app/app.module';


export class ResolveConflictVM extends LzoWizardVMBase implements IViewModelBase {
    objWarningDetails: ObservableCollection<WarningDetails> = null;
    oAddGrid: ObservableCollection<ConflictsVM> = null;
    public _conflictDetails: ObservableCollection<ConflictsVM> = new ObservableCollection<ConflictsVM>();
    public get ConflictDetails(): ObservableCollection<ConflictsVM> {
        return this._conflictDetails;
    }
    public set ConflictDetails(value: ObservableCollection<ConflictsVM>) {
        if (this._conflictDetails != value) {
            this._conflictDetails.CopyFrom(value);
        }
    }
    public _mediatorDataService: MediatorDataService;
    public ConflictsReason: ObservableCollection<CListItem>;
    constructor() {
        super();
        this.OnInitComplete();
        this._mediatorDataService = InjectorInstance.get<MediatorDataService>(MediatorDataService);
        this._mediatorDataService.listenFor(6).subscribe((data:any) => {
          if(data){
           let contextData = data.context;
           switch (contextData.context.event) {
            case 'Discard_Click': this.OnCancel();
                       break;
            case 'Finish_Click':
              this.OnFinish();  
              break;
            case 'FinishNow_Click':             
                this.OnFinishNow();  
                        break;
           }
          }
        })
    }
    public override OnInitialize(): void {
        super.OnInitialize();
    }
    
    public GetContextInfoFromHtmlPage(): void {
        PatientContext.IsAgeSexFilledforConflict = false;
        let lnPatOID: number;
        let lnEncOID: number;
        let lnMergePatOID: number;
        QueryStringInfo.MedclerkPrompt = String.Empty;
        if (
          Number.TryParse(ContextManager.Instance['PatientID'].ToString(), (o) => {
            lnPatOID = o;
          })
        )
          PatientContext.PatientOID = lnPatOID;
        if (
          Number.TryParse(
            ContextManager.Instance['EncounterOID'].ToString(),
            (o) => {
              lnEncOID = o;
            }
          )
        )
          PatientContext.EncounterOid = lnEncOID;
        if (
          Number.TryParse(
            ContextManager.Instance['MergedPatientOID'].ToString(),
            (o) => {
              lnMergePatOID = o;
            }
          ) &&
          lnMergePatOID > 0
        )
          PatientContext.MergedPatientOID = lnMergePatOID;
        else if (
          ContextManager.Instance['PatientID'] != null &&
          Number.TryParse(ContextManager.Instance['PatientID'].ToString(), (o) => {
            lnMergePatOID = o;
          })
        ) {
          PatientContext.MergedPatientOID = lnMergePatOID;
        }
        if (ContextManager.Instance['IsMergedPatient'] != null) {
          PatientContext.IsMergedPatient =
            ContextManager.Instance['IsMergedPatient'].ToString();
        }
        let nAge: number;
        if (
          ContextManager.Instance['Age'] != null &&
          Number.TryParse(ContextManager.Instance['Age'].ToString(), (o) => {
            nAge = o;
          })
        )
          PatientContext.Age = nAge;
        let dtDOB: DateTime = DateTime.MinValue;
        PatientContext.DOB = String.Empty;
        if (ContextManager.Instance['DOB'] != null) {
          let sDOB: string = ContextManager.Instance['DOB'].ToString();
          if (!String.IsNullOrEmpty(sDOB)) {
            if (
              DateTime.TryParseExact(
                sDOB,
                'dd-MMM-yyyy',
                'en_GB',
                DateTimeStyles.None,
                (o) => {
                  dtDOB = o;
                }
              )
            )
              PatientContext.DOB = dtDOB.ToString();
            else if (
              DateTime.TryParseExact(
                sDOB,
                'dd/MM/yyyy',
                'en_GB',
                DateTimeStyles.None,
                (o) => {
                  dtDOB = o;
                }
              )
            )
              PatientContext.DOB = dtDOB.ToString();
          }
        }
        GlobalVariable.NhsNumber =
          ContextManager.Instance['NHSNumber'] != null
            ? ContextManager.Instance['NHSNumber'].ToString()
            : null;
        GlobalVariable.IsGPConnectEnabled =
          ContextManager.Instance['GpConnectEnabled'] != null &&
          ContextManager.Instance['GpConnectEnabled'].ToString() == '1';
        GlobalVariable.ApplicationPath =
          ContextManager.Instance['ApplicationPath'] != null
            ? ContextManager.Instance['ApplicationPath'].ToString()
            : String.Empty;
        if (ContextManager.Instance['IsPDSTraced'] != null) {
          let sIsPDSTraced: string =
            ContextManager.Instance['IsPDSTraced'].ToString();
          PatientContext.IsPDSTraced =
            !String.IsNullOrEmpty(sIsPDSTraced) &&
            String.Equals(
              sIsPDSTraced,
              '1',
              StringComparison.InvariantCultureIgnoreCase
            )
              ? true
              : false;
        }
        PatientContext.Sex = ContextManager.Instance['Sex'].ToString();
        PatientContext.EncounterType =
          ContextManager.Instance['EncounterType'].ToString();
        PatientContext.EncounterCode =
          ContextManager.Instance['EncounterType'].ToString();
        if (ContextManager.Instance['RoleprofileOID'] != null)
          PatientContext.RoleProfileOID =
            ContextManager.Instance['RoleprofileOID'].ToString();
        AppContextInfo.OrganisationName =
          ContextManager.Instance['OrganisationName'].ToString();
        AppContextInfo.JobRoleOID =
          ContextManager.Instance['JobRoleOID'].ToString();
        AppContextInfo.JobRoleName =
          ContextManager.Instance['JobRoleName'].ToString();
        AppContextInfo.RoleProfileName =
          ContextManager.Instance['RoleProfileName'].ToString();
        AppContextInfo.SpecialtyOID =
          ContextManager.Instance['SpecialtyOID'].ToString();
        AppSessionInfo.AMCV = ContextManager.Instance['AMCV'].ToString();
        if (ContextManager.Instance['TeamNames'] != null)
          AppContextInfo.TeamNames =
            ContextManager.Instance['TeamNames'].ToString();
        if (ContextManager.Instance['TeamOIDs'] != null)
          AppContextInfo.TeamOIDs = ContextManager.Instance['TeamOIDs'].ToString();
        AppContextInfo.UserOID = ContextManager.Instance['UserOID'].ToString();
        AppContextInfo.UserName = ContextManager.Instance['UserName'].ToString();
        CPremission.sPremission =
          ContextManager.Instance['PermissionDetails'].ToString();
        ContextInfo.SecurityToken =
          ContextManager.Instance['SecurityToken'].ToString();
        super.AppContext.SecurityToken = ContextInfo.SecurityToken;
        AppContextInfo.OrganisationOID =
          ContextManager.Instance['OrganisationOID'].ToString();
        super.AppContext.OrganisationOID = AppContextInfo.OrganisationOID;
        let objUserOid: int64;
        Int64.TryParse(ContextManager.Instance['UserOID'].ToString(), (o) => {
          objUserOid = o;
        });
        ContextInfo.UserOID = objUserOid;
        super.AppContext.UserOID = String(ContextInfo.UserOID);
        let objReleaseVer: Byte | any;
        Byte.TryParse(ContextManager.Instance['ReleaseVersion'].ToString(), (o) => {
          objReleaseVer = o;
        });
        ContextInfo.ReleaseVersion = objReleaseVer;
        super.AppContext.ReleaseVersion = ContextInfo.ReleaseVersion.ToString();

        ContextInfo.Culture = Convert.ToString(ContextManager.Instance['Culture']);
        if (ContextManager.Instance['IPPMADU_P2'] != null)
          PatientContext.IPPMADU_P2 = Convert.ToBoolean(
            ContextManager.Instance['IPPMADU_P2'].ToString()
          );
        if (ContextManager.Instance['TTOPBBDU'] != null)
          PatientContext.TTOPBBDU = Convert.ToBoolean(
            ContextManager.Instance['TTOPBBDU'].ToString()
          );
        if (ContextManager.Instance['TTOPBBDU_P2'] != null)
          PatientContext.TTOPBBDU_P2 = Convert.ToBoolean(
            ContextManager.Instance['TTOPBBDU_P2'].ToString()
          );
        if (ContextManager.Instance['IsInfusionON'] != null) {
          PatientContext.IsINFUSIONON = Convert.ToBoolean(
            ContextManager.Instance['IsInfusionON'].ToString()
          );
        } else {
          PatientContext.IsINFUSIONON = true;
        }
        if (ContextManager.Instance['IsTurnONDRC'] != null) {
          PatientContext.IsTurnONDRC = Convert.ToBoolean(
            ContextManager.Instance['IsTurnONDRC'].ToString()
          );
        } else {
          if (
            (ProfileData.MedConflictConfig != null &&
              ProfileData.MedConflictConfig.TurnOnDRC != null &&
              ProfileData.MedConflictConfig.TurnOnDRC == '1') ||
            (ProfileData.MedConflictConfig == null && PatientContext.IsTurnONDRC)
          ) {
            ContextManager.Instance['IsTurnONDRC'] = true;
            PatientContext.IsTurnONDRC = true;
          }
        }
        if (ContextManager.Instance['PatientSealBreakExists'] != null)
          PatientContext.PatientSealBreakExists = Convert.ToBoolean(
            ContextManager.Instance['PatientSealBreakExists'].ToString()
          );
        if (!String.IsNullOrEmpty(this.WizardContext['CDCFormCode'])) {
          QueryStringInfo.CDCFormCode = this.WizardContext['CDCFormCode'];
        }
        if (!String.IsNullOrEmpty(this.WizardContext['IsLaunchFromChart'])) {
          QueryStringInfo.IsLaunchformchart = this.WizardContext[
            'IsLaunchFromChart'
          ];
          QueryStringInfo.IsLaunchformInfchart = this.WizardContext[
            'IsLaunchFromChart'
          ];
          QueryStringInfo.IsLaunchformMedchart = this.WizardContext[
            'IsLaunchFromChart'
          ];
          if (!String.IsNullOrEmpty(this.WizardContext['IsLaunchFromPresChart']))
            QueryStringInfo.IsLaunchformPreschart = this.WizardContext[
              'IsLaunchFromPresChart'
            ];
        }
        if (!String.IsNullOrEmpty(this.WizardContext['MedclerkPrompt'])) {
          QueryStringInfo.MedclerkPrompt = this.WizardContext['MedclerkPrompt'];
        }
        if (!String.IsNullOrEmpty(this.WizardContext['SelPIOID'])) {
          Number.TryParse(this.WizardContext['SelPIOID'], (o) => {
            QueryStringInfo.SelPrescItemOID = o;
          });
        } else {
          QueryStringInfo.SelPrescItemOID = 0;
        }
        if (ContextManager.Instance['bDateOfBirthEstimated'] != null) {
          PatientContext.IsEstimatedDOB = Convert.ToBoolean(
            ContextManager.Instance['bDateOfBirthEstimated'].ToString()
          );
        }
        if (ContextManager.Instance['IsClinicalNote'] != null) {
          QueryStringInfo.IsClinicalNote =
            ContextManager.Instance['IsClinicalNote'].ToString();
        }
        if (ContextManager.Instance['RequestLockOID'] != null) {
          QueryStringInfo.RequestLockOID =
            ContextManager.Instance['RequestLockOID'].ToString();
        }
        // if (
        //   !String.IsNullOrEmpty(WebServiceURLMedicationCommonBB.ManageSecurityWS)
        // ) {
        //   MedicationPrescriptionHelper.GetRoleDetails(
        //     (s,e) => {this.ProxyService_GetRoleCompleted(s,e);}
        //   );
        // }
        if (
          ContextManager.Instance['GPAutoSaveClerk'] != null &&
          String.Equals(
            ContextManager.Instance['GPAutoSaveClerk'].ToString(),
            'true',
            StringComparison.InvariantCultureIgnoreCase
          )
        ) {
          QueryStringInfo.IsGPAutoSaveClerk = true;
          if (ContextManager.Instance.NameExists('GPAutoSaveClerk')) {
            ContextManager.Instance.Remove('GPAutoSaveClerk');
          }
        } else {
          QueryStringInfo.IsGPAutoSaveClerk = false;
        }
        if (ContextManager.Instance['IsPatientTranferAct'] != null) {
          PatientContext.IsPatientTranferAct =
            ContextManager.Instance['IsPatientTranferAct'].ToString();
        }
      }
    public override OnInitComplete(): void {
        //re-visit
        this.WizardContext["CONFLICTSEXIST"] = "TRUE";
        this.GetContextInfoFromHtmlPage();

        //re-visit
        //let lnPatOID: number | any;
        //if (super.WizardContext != null && super.WizardContext["PATIENTOID"] != null && Number.TryParse(super.WizardContext["PATIENTOID"], lnPatOID))
        //    ContextManager.Instance.Add("PATIENTOID", lnPatOID);
        let objUserOid: Int64 | any;
        Int64.TryParse(super.AppContext.UserOID, (o) => {
            objUserOid = o;
        }); 
        ContextInfo.UserOID = objUserOid;
        if (ContextManager.Instance["FRC-001-CHILD"] != null)
            Common.Frc001Childs = ContextManager.Instance["FRC-001-CHILD"].ToString();
        if (ContextManager.Instance["FRC-002-CHILD"] != null)
            Common.Frc002Childs = ContextManager.Instance["FRC-002-CHILD"].ToString();
        if (ContextManager.Instance["FRC-003-CHILD"] != null)
            Common.Frc003Childs = ContextManager.Instance["FRC-003-CHILD"].ToString();
        if (ContextManager.Instance["FRQ-88-CHILD"] != null)
            Common.Frq88Childs = ContextManager.Instance["FRQ-88-CHILD"].ToString();
        let objReleaseVer: Byte | any;
        
        Byte.TryParse(super.AppContext.ReleaseVersion, (o) => {
            objReleaseVer = o;
        });

        ContextInfo.ReleaseVersion = objReleaseVer;
        ContextInfo.SecurityToken = super.AppContext.SecurityToken;
        AppContextInfo.OrganisationOID = super.AppContext.OrganisationOID;
        this.GetConflictConfig();
        super.OnInitComplete()
    }
    public override OnFinish(): void {
        if (!this.IsConflictsMandatory()) {
            let objMsg: iMessageBox = new iMessageBox();
            objMsg.Message = Resource.MedicationForm.ConflictCA_ValidateMsg;
            objMsg.Title = "Lorenzo - Resolve conflicts";
            objMsg.MessageButton = MessageBoxButton.OKCancel;
            objMsg.IconType = MessageBoxType.Question; 
            objMsg.MessageBoxClose = (s, e) => { this.oCheckMandConflict_MessageBoxClose(s, e) }
            objMsg.Show();
            ObjectHelper.stopScreenFreezeEvent(true);
        }
        else this.SaveConflicts();
    }
    public override OnCancel(): void {
      this.ContextPrep();
    }
    oCheckMandConflict_MessageBoxClose(sender: Object, e: MessageEventArgs): void {
        if (e.MessageBoxResult == MessageBoxResult.OK) {
            let UpdWarnings = this.ConflictDetails.Where(updItem =>updItem.AcknowledgeStatus||!String.Equals(updItem.PrescriberReason.DisplayText,CConstants.Selectreason,StringComparison.InvariantCultureIgnoreCase)).Select(updItem => updItem);
            if (UpdWarnings != null && UpdWarnings.Count() > 0) {
                this.SaveConflicts();
            }
            else {
                super.OnFinish();
            }
        }
    }
    public GetConflictsForPatient(): void {
        let objIPPSer: IPPMAManagePrescSer.IPPMAManagePrescriptionWSSoapClient = new IPPMAManagePrescSer.IPPMAManagePrescriptionWSSoapClient();
        let objReqGetConflicts: IPPMAManagePrescSer.CReqMsgGetUnresolvedConflicts = new IPPMAManagePrescSer.CReqMsgGetUnresolvedConflicts();
        objReqGetConflicts.oContextInformation = Common.FillContext();
        //re-visit
         //let lnPatOID: number | any;
        //if (ContextManager.Instance['PatientID'] != null && Number.TryParse(ContextManager.Instance['PatientID'].ToString(), lnPatOID))
            //objReqGetConflicts.PatientOIDBC = lnPatOID;
        objReqGetConflicts.PatientOIDBC = PatientContext.PatientOID;  
        objIPPSer.GetUnresolvedConflictsCompleted = (s, e) => { this.objSer_GetUnresolvedConflictsCompleted(s, e); };
        objIPPSer.GetUnresolvedConflictsAsync(objReqGetConflicts);
    }
    objSer_GetUnresolvedConflictsCompleted(sender: Object, e: IPPMAManagePrescSer.GetUnresolvedConflictsCompletedEventArgs): void {
        let objResponse: IPPMAManagePrescSer.CResMsgGetUnresolvedConflicts = e.Result;
        if (objResponse != null && objResponse.oWarningDetails != null && objResponse.oWarningDetails.Count > 0) {
            this.objWarningDetails = new ObservableCollection<WarningDetails>();
            objResponse.oWarningDetails.forEach((oWarningDetails) => {
                this.objWarningDetails.Add(oWarningDetails);
            });
            if (this.objWarningDetails != null && this.objWarningDetails.Count > 0)
                this.UpdateWarningSubType();
        }
    }
    public UpdateWarningSubType(): void {
        if (this.objWarningDetails != null && this.objWarningDetails.Count > 0) {
            this.oAddGrid = new ObservableCollection<ConflictsVM>();
            if (ProfileData.MedConflictConfig != null && ProfileData.MedConflictConfig.oMedicationConflictConfigData != null) {
                ProfileData.MedConflictConfig.oMedicationConflictConfigData.forEach((objConfig) => {
                    if (WarningConceptCode.ConceptData != null && !String.IsNullOrEmpty(objConfig.ConflictType)) {
                        let sRefConflictType: string = String.Empty;
                        if (!String.IsNullOrEmpty(objConfig.ConflictType)) {
                            sRefConflictType = Common.GetText(objConfig.ConflictType, WarningConceptCode.ConceptData);
                            if (String.Equals(objConfig.ConflictType, CConstants.DRUGDUPLICATION)) {
                                objConfig.ConflictType = CConstants.sDuplication;
                            }
                            else if (String.Equals(objConfig.ConflictType, CConstants.DRUGCONTRA)) {
                                objConfig.ConflictType = CConstants.sContraIndication;
                            }
                            else if (String.Equals(objConfig.ConflictType, CConstants.DRUGINTRACT)) {
                                objConfig.ConflictType = CConstants.sInteract;
                            }
                            else if (!String.IsNullOrEmpty(sRefConflictType)) {
                                objConfig.ConflictType = sRefConflictType;
                            }
                        }
                        if (!String.IsNullOrEmpty(objConfig.ConflictSubType)) {
                            let sRefConflictSubType: string = Common.GetText(objConfig.ConflictSubType, WarningConceptCode.ConceptData);
                            objConfig.ConflictSubType = sRefConflictSubType;
                        }
                    }
                });
                let lstMedCofCofigData: List<IPPMAManagePrescSer.MedConflictConfigData> = new List<IPPMAManagePrescSer.MedConflictConfigData>(ProfileData.MedConflictConfig.oMedicationConflictConfigData);
                this.objWarningDetails.forEach((objWarnDet) => {
                    if (!String.IsNullOrEmpty(objWarnDet.PrescriptionItem.Code)) {
                        let strRefPresType: string = String.Empty;
                        strRefPresType = Common.GetText(objWarnDet.PrescriptionItem.Code, MedicationCommonConceptCodeData.ConceptCodes);
                        if (!String.IsNullOrEmpty(strRefPresType))
                            objWarnDet.PrescriptionItem.Code = strRefPresType;
                    }
                    if (!String.IsNullOrEmpty(objWarnDet.WarningType)) {
                        let strRefWarnType: string = String.Empty;
                        strRefWarnType = Common.GetText(objWarnDet.WarningType, WarningConceptCode.ConceptData);
                        if (String.Equals(objWarnDet.WarningType, CConstants.DRUGCONTRA))
                            objWarnDet.WarningType = CConstants.sContraIndication;
                        else if (String.Equals(objWarnDet.WarningType, CConstants.DRUGINTRACT))
                            objWarnDet.WarningType = CConstants.sInteract;
                        else if (String.Equals(objWarnDet.WarningType, CConstants.DRUGDUPLICATION))
                            objWarnDet.WarningType = CConstants.sDuplication;
                        else if (!String.IsNullOrEmpty(strRefWarnType))
                            objWarnDet.WarningType = strRefWarnType;
                    }
                    if (!String.IsNullOrEmpty(objWarnDet.WarningSubType)) {
                        let sRefWarningSubType: string = String.Empty;
                        sRefWarningSubType = Common.GetText(objWarnDet.WarningSubType, WarningConceptCode.ConceptData);
                        if (!String.IsNullOrEmpty(sRefWarningSubType)) {
                            objWarnDet.WarningSubType = sRefWarningSubType;
                        }
                    }
                    let oDataFound = ProfileData.MedConflictConfig.oMedicationConflictConfigData.Where(oConfigData =>String.Equals(oConfigData.ConflictType,objWarnDet.WarningType,StringComparison.InvariantCultureIgnoreCase)&&String.Equals(oConfigData.ConflictSubType,objWarnDet.WarningSubType,StringComparison.InvariantCultureIgnoreCase)).Select(oConfigData => oConfigData);
                    if (oDataFound != null && oDataFound.Count() > 0) {
                        let oDataFoundItem = oDataFound.First();
                        this.ValidateBindDataToVM(oDataFoundItem, objWarnDet, objWarnDet.PrescriptionItem.Name, objWarnDet.PrescriptionItem.OperationMode, objWarnDet.PrescriptionItem.OID, objWarnDet.PrescriptionItem.Code);
                    }
                });
                let oGridAdd: ObservableCollection<ConflictsVM> = new ObservableCollection<ConflictsVM>(this.oAddGrid.OrderBy(AddGrid => AddGrid.WarningBehaviourType).ThenBy(AddGrid => AddGrid.DisplaySeqNumber));
                this.ConflictDetails = oGridAdd;
            }
        }
    }
    public ValidateBindDataToVM(oDataFound: IPPMAManagePrescSer.MedConflictConfigData, oDetails: WarningDetails, sDrugName: string, sDrugType: string, lnDrugOID: number, sPresType: string): void {
        let oVM: ConflictsVM = new ConflictsVM();
        oVM.DrugName = sDrugName;
        oVM.DrugType = sDrugType;
        oVM.DrugMonoInfoOID = lnDrugOID;
        oVM.PrescriptionType = sPresType;
        oVM.WarningOID = oDetails.WarningOID;
        oVM.IsAmend = true;
        oVM.EnableAcknowledgementDetails = true;
        if (this.ConflictsReason != null)
            oVM.PrescriberReasonCombo = this.ConflictsReason;
        if (oDetails != null && String.Equals(oDetails.PrescriberComments, "Select reason", StringComparison.InvariantCulture))
            oDetails.PrescriberComments = String.Empty;
        oVM.AcknowledgeStatus = false;
        oVM.AckstatusToolTip = "Select to acknowledge conflict";
        if (oDataFound != null && oDataFound.BehaviourType != null && (oDetails != null && String.IsNullOrEmpty(oDetails.AcknowledgeStatus))) {
            let sRefBehType: string = String.Empty;
            sRefBehType = Common.GetText(oDataFound.BehaviourType, WarningConceptCode.ConceptData);
            if (!String.IsNullOrEmpty(sRefBehType)) {
                oVM.WarningBehaviourType = sRefBehType;
            }
        }
        else if (!String.IsNullOrEmpty(oDetails.WarningBehaviourType)) {
            oVM.WarningBehaviourType = oDetails.WarningBehaviourType;
        }
        oVM.PrescriberReason = ObjectHelper.CreateObject(new CListItem(), {
            DisplayText: String.IsNullOrEmpty(oDetails.PrescriberComments) ? CConstants.Selectreason : oDetails.PrescriberComments,
            Value: String.IsNullOrEmpty(oDetails.PrescriberComments) ? oVM.ReasonMandatory ? CConstants.Selectreasonstar : CConstants.Selectreason : oDetails.PrescriberComments
        });
        if (!String.IsNullOrEmpty(oDetails.WarningMessage))
            oVM.WarningMessage = oDetails.WarningMessage.Replace("%2B", "+");
        if (String.Equals(oDetails.WarningType, CConstants.sDrugInt, StringComparison.InvariantCultureIgnoreCase)) {
            oVM.WarningMessage = oVM.WarningMessage.Replace("<BR>", "\n").Replace("<br />", "\n").Replace("&amp;", "&").Replace("monograph", "~monograph~");
        }
        if ((String.Equals(oDetails.WarningType, "Warning", StringComparison.InvariantCultureIgnoreCase))) {
            oVM.WarningType = oDetails.WarningType;
        }
        else if (!String.IsNullOrEmpty(oDetails.WarningSubType)) {
            oVM.WarningType = oDetails.WarningType + " - " + oDetails.WarningSubType;
        }
        if (oDataFound != null && oDataFound.BehaviourType != null) {
            let sRefBehType: string = String.Empty;
            sRefBehType = Common.GetText(oDataFound.BehaviourType, WarningConceptCode.ConceptData);
            if (!String.IsNullOrEmpty(sRefBehType)) {
                oVM.WarningBehaviourType = sRefBehType;
            }
        }
        else if (!String.IsNullOrEmpty(oDetails.WarningBehaviourType)) {
            oVM.WarningBehaviourType = oDetails.WarningBehaviourType;
        }
        if (oDataFound != null)
            oVM.DisplaySeqNumber = (oDataFound instanceof IPPMAManagePrescSer.MedConflictConfigData) ? oDataFound.DisplaySeqNumber : Number.MaxValue;
        else oVM.DisplaySeqNumber = oDetails.DisplaySequenceNumber;
        this.CommonConflictsFormatting(oVM);
        oVM.IsSeal = String.IsNullOrEmpty(oDetails.IsSeal) ? false : (String.Equals(oDetails.IsSeal, "0", StringComparison.CurrentCultureIgnoreCase)) ? false : true;
        oVM.SealType = oDetails.SealType;
        oVM.ConflictCode = oDetails.Code;
        oVM.ConflictType = oDetails.ConflictType;
        this.oAddGrid.Add(oVM);
    }
    public CommonConflictsFormatting(value: Object): void {
        let sWarningMsg: string = String.Empty;
        let oVM: ConflictsVM = ObjectHelper.CreateType<ConflictsVM>(value, ConflictsVM);
        if (!String.IsNullOrEmpty(oVM.WarningMessage)) {
            sWarningMsg = oVM.WarningMessage.Replace("<BR>", "\n").Replace("<br />", "\n").Replace("&amp;", "&").Replace("monograph", "~monograph~");
            oVM.WarningMessage = sWarningMsg;
        }
    }
    public GetConflictConfig(): void {
        if (WebServiceURL.IPPMAManagePrescriptionWS != null) {
            let objService: IPPMAManagePrescSer.IPPMAManagePrescriptionWSSoapClient = new IPPMAManagePrescSer.IPPMAManagePrescriptionWSSoapClient();
            let objReqConfig: IPPMAManagePrescSer.CReqMsgGetMedicationConfilictConfig = new IPPMAManagePrescSer.CReqMsgGetMedicationConfilictConfig();
            objReqConfig.IsMainAppConflictsBC = '1';
            objReqConfig.oContextInformation = Common.FillContext();
            objService.GetMedicationConfilictConfigCompleted = (s, e) => { this.ConflictsConfig_Completed(s, e); };
            objService.GetMedicationConfilictConfigAsync(objReqConfig);
        }
    }
    public ConflictsConfig_Completed(sender: Object, e: IPPMAManagePrescSer.GetMedicationConfilictConfigCompletedEventArgs): void {
        if (e.Error != null) {
            let _ErrorID: number = 80000038;
            let _ErrorSource: string = "LorAppManagePrescriptionBBUI_P2.dll, Class:ResolveConflictVM, Method:ConflictsConfig_Completed()";
            let lnReturn: number = Application.AMSHelper.PublicExceptionDetails(_ErrorID, _ErrorSource, e.Error);
        }
        else {
            let objResConfig: IPPMAManagePrescSer.CResMsgGetMedicationConfilictConfig = e.Result;
            let DomainCodes: string = String.Empty;
            if (objResConfig != null) {
                ProfileData.MedConflictConfig = e.Result.oMedicationConflictConfig;
                // revisit - issue starts from here :
                if (this.ConflictsReason == null) {
                    DomainCodes = ValueDomain.ConflictsReason;
                    DomainCodes += "," + ValueDomain.BHVTY + "," + ValueDomain.Contyp + "," + ValueDomain.DrugAllergy + "," + ValueDomain.DrugContra;
                    DomainCodes += "," + ValueDomain.DrugDuplication + "," + ValueDomain.Severity + "," + ValueDomain.SUBINT + "," + ValueDomain.PRESTYPE;
                    ProcessRTE.GetValuesByDomainCodes(DomainCodes, (s, e) => {this.OnRTEResult(s);});
                }
            }
        }
    }
    OnRTEResult(args: RTEEventargs): void {
        if (String.IsNullOrEmpty(args.Request) || args.Result == null) return;
        if (args.Result instanceof Dictionary) {
            let objResult: Dictionary<string, List<CListItem>> = ObjectHelper.CreateType<Dictionary<string, List<CListItem>>>(args.Result,Dictionary<string, List<CListItem>>);
            objResult.forEach((objDomainDetail) => {
            objDomainDetail.Value = new List<CListItem>(objDomainDetail.Value);
            switch (objDomainDetail.Key) {
                case ValueDomain.ConflictsReason:
                    this.LoadConflictsReason(objDomainDetail.Value, true);
                    break;
                case ValueDomain.BHVTY:
                case ValueDomain.Contyp:
                case ValueDomain.DrugAllergy:
                case ValueDomain.DrugContra:
                case ValueDomain.DrugDuplication:
                case ValueDomain.Severity:
                case ValueDomain.SUBINT:
                    this.LoadConflictsReason(objDomainDetail.Value, false);
                    break;
                case ValueDomain.PRESTYPE:
                    objDomainDetail.Value.forEach((oCListItem) => {
                        if (MedicationCommonConceptCodeData.ConceptCodes == null)
                            MedicationCommonConceptCodeData.ConceptCodes = new ObservableCollection<CValuesetTerm>();
                        MedicationCommonConceptCodeData.ConceptCodes.Add(ObjectHelper.CreateObject(new CValuesetTerm(), { csCode: oCListItem.Value, csDescription: oCListItem.DisplayText }));
                    });
                    break;
            }
        });
      }
        if (this.ConflictsReason != null && this.ConflictsReason.Count > 0){
           this.GetConflictsForPatient();
        }     
    }
    public LoadConflictsReason(lstCListItem: List<CListItem>, IsCnftRsn: boolean): void {
        if (IsCnftRsn) {
            if (lstCListItem != null && lstCListItem.Count > 0) {
                this.ConflictsReason = new ObservableCollection<CListItem>();
                lstCListItem.forEach((oCListItem) => {
                    this.ConflictsReason.Add(oCListItem);
                });
            }
        }
        else {
            if (WarningConceptCode.ConceptData == null)
                WarningConceptCode.ConceptData = new ObservableCollection<CValuesetTerm>();
            if (lstCListItem != null && lstCListItem.Count > 0) {
                lstCListItem.forEach((oCListItem) => {
                    WarningConceptCode.ConceptData.Add(ObjectHelper.CreateObject(new CValuesetTerm(), { csCode: oCListItem.Value, csDescription: oCListItem.DisplayText }));
                });
            }
        }
    }
    public SaveConflicts(): void {
        let lnPatOID: number | any;
        let objWarningDetails: ObservableCollection<WarningDetails> = new ObservableCollection<WarningDetails>();
        let UpdatedWarnings = this.ConflictDetails.Where(updItem =>(updItem.AcknowledgeStatus||!String.Equals(updItem.PrescriberReason.DisplayText,CConstants.Selectreason,StringComparison.InvariantCultureIgnoreCase))&&(updItem.AcknowledgeStatus&&!String.Equals(updItem.IsMandatoryStarVisible,CConstants.sVisible))).Select(updItem => updItem);
        if (UpdatedWarnings != null && UpdatedWarnings.Count() > 0) {
            UpdatedWarnings.forEach((oConDetail) => {
                let objWarDetails: WarningDetails = new WarningDetails();
                objWarDetails.AcknowledgeStatus = (oConDetail.AcknowledgeStatus) ? "1" : "0";
                objWarDetails.WarningOID = oConDetail.WarningOID;
                objWarDetails.PrescriberComments = oConDetail.PrescriberReason.DisplayText;
                objWarningDetails.Add(objWarDetails);
            });
            let objIPPSer: IPPMAManagePrescSer.IPPMAManagePrescriptionWSSoapClient = new IPPMAManagePrescSer.IPPMAManagePrescriptionWSSoapClient();
            let objReqGetConflicts: IPPMAManagePrescSer.CReqMsgUpdatePresItemConflicts = new IPPMAManagePrescSer.CReqMsgUpdatePresItemConflicts();
            objReqGetConflicts.oWarningDetailsBC = objWarningDetails;
            //re-visit
            //if (ContextManager.Instance["PATIENTOID"] != null && Number.TryParse(ContextManager.Instance["PATIENTOID"].ToString(), lnPatOID))
            //    objReqGetConflicts.PatientOIDBC = lnPatOID;
            objReqGetConflicts.PatientOIDBC = PatientContext.PatientOID;
            objReqGetConflicts.oContextInformation = Common.FillContext();
            objIPPSer.UpdatePresItemConflictsCompleted = (s, e) => { this.objSer_UpdatePresItemConflictsCompleted(s, e); };
            objIPPSer.UpdatePresItemConflictsAsync(objReqGetConflicts);
            if (this.ConflictDetails.Count  == UpdatedWarnings.Count() )
                this.WizardContext["CONFLICTSEXIST"] = "FALSE";
            else this.WizardContext["CONFLICTSEXIST"] = "TRUE";
        }
        else {
            super.OnFinish();
        }
        this.ContextPrep();
    }
    objSer_UpdatePresItemConflictsCompleted(sender: Object, e: IPPMAManagePrescSer.UpdatePresItemConflictsCompletedEventArgs): void {
        let objResponse: IPPMAManagePrescSer.CResMsgUpdatePresItemConflicts = e.Result;
        //re-visit - 
        //objResponse.oContextInformation.Errors - retruns '' - empty 
        // if (objResponse != null && objResponse.oContextInformation != null && objResponse.oContextInformation.Errors.Count == 0) {
        if (objResponse != null && objResponse.oContextInformation != null ) {
            super.OnFinish();
        }
    }
    public IsConflictsMandatory(): boolean {
        if (this.ConflictDetails != null) {
          let Isconflicts:boolean=true;
            this.ConflictDetails.forEach((oConf) => {
                if (!oConf.AcknowledgeStatus && (String.Equals(oConf.WarningBehaviourType, "Type 2") || String.Equals(oConf.WarningBehaviourType, "Type 3"))) {
                  Isconflicts=false;
                }
                else if (String.Equals(oConf.PrescriberReason.Value, "Select reason*") && String.Equals(oConf.WarningBehaviourType, "Type 2")) {
                  Isconflicts=false;
                }
            });
            return Isconflicts;
          }
          return true;  
    }
    public DoCleanUP(): void {

    }
}
