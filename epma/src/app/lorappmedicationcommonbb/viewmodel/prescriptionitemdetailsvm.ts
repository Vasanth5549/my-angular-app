import {
  StringBuilder,
  ProfileFactoryType,
  Convert,
  AppActivity,
  ProcessRTE,
  DayOfWeek,
  ScriptObject,
} from 'epma-platform/services';
import {
  ProfileContext,
  Double,
  Int64,
  StringComparison,
  AppDialogEventargs,
  WindowButtonType,
  CListItem,
  ObservableCollection,
  Visibility,
  RTEEventargs,
  List,
  IEnumerable,
  CultureInfo,
  ArrayOfString,
  ChildWindow,
  HtmlPage,
  StringSplitOptions
} from 'epma-platform/models';
import 'epma-platform/stringextension';
import DateTime, { DateTimeKind } from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import {
  IViewModelBase,
  ViewModelBase,
} from 'src/app/lorappcommonbb/viewmodelbase';
import { ManagePrescriptionWSSoapClient } from 'src/app/shared/epma-platform/soap-client/ManagePrescriptionWS';
import { DrugName, SchedDayOfWeek } from '../utilities/common';
import {
  AdministratorType,
  CConstants,
  CnstSlotStatus,
  ConstDurationUOM,
  DoseTypeCode,
  DrugItemSubTypeCode,
  FieldNames,
  InfusionTypeCode,
  PrescriptionTypes,
  SVIconLaunchFrom,
  ValueDomain,
  ValueSet,
} from '../utilities/constants';
import { Dictionary } from 'epma-platform/dictionary';
import {
  AppSessionInfo,
  ContextInfo,
  PatientContext,
} from 'src/app/lorappcommonbb/utilities/globalvariable';
import * as IPPManagePrescSer from '../../shared/epma-platform/soap-client/IPPMAManagePrescriptionWS';
import * as ManagePrescSer from '../../shared/epma-platform/soap-client/ManagePrescriptionWS';
import { ConditionalDoseVM, RequestSource } from './ConditionalDoseVM';
import {
  ConflictsReasonConceptCodeData,
  DispenseStatusListConceptCodeData,
  DoseCalcConceptCodeData,
  DRCErrorCodeConceptCodeData,
  InfActionsConceptCodeData,
  InfHumdificationConceptCodeData,
  InfStrikethroughConceptCodeData,
  InfStrikethroughReasonsConceptCodeData,
  InfusionTypeConceptCodeData,
  MedDoseTypeConceptCodeData,
  MedicationCommonConceptCodeData,
  MedicationCommonProfileData,
  TitratedDoseInstructions,
  WarningConceptCode,
} from '../utilities/profiledata';
import {
  CommonDomainValues,
  MedDrugDetailsInputParam,
  WebServiceURLMedicationCommonBB,
} from '../utilities/globalvariable';
import { Busyindicator } from 'src/app/lorappcommonbb/busyindicator';
import { MedicationCommonBB } from '../utilities/medicationcommonbb';
import { SLDateUtility } from 'src/app/shared/epma-platform/services/sLDateUtility.service';
import { ClonableViewModelBase } from '../model/cloneviewmodel';
import { prescribedrugs } from '../resource/prescribedrugs.designer';
import { AdminstrativeTimesVM } from './adminstrativetimesvm';
import { medsadmindetails } from '../resource/medsadmindetails.designer';
import { AMSHelper } from 'src/app/lorappcommonbb/amshelper';
import { TitratedDoseCommonVM } from './TitratedDoseDetailsCommonVM';
import {
  InfusionLineItemVM,
  PrescriptionLineItemVM,
} from '../utilities/lineitemconstructor';
import { MedicationPrescriptionHelper } from '../utilities/medicationprescriptionhelper';
import * as MedicationMgmtSer from '../../shared/epma-platform/soap-client/MedicationMgmtWS';
import * as MedicationMgmt from '../../shared/epma-platform/soap-client/MedicationAdministrationWS';
import { Resource } from 'src/app/lorappmedicationcommonbb/resource';
import { BagDetailsVM } from './BagDetailsVM';
import { CommonBB } from 'src/app/lorappcommonbb/utilities/common';
import { ObjectHelper } from 'src/app/shared/epma-platform/services/objecthelper.service';
import { Environment } from '../../product/shared/models/Common';
import { Image } from '../../shared/epma-platform/controls/epma-image/epma-image.component';
import { CValuesetTerm } from 'src/app/shared/epma-platform/soap-client/CReferenceWS';
import {
  AdminHistoryDetails,
  DrugDetail,
} from '../../shared/epma-platform/soap-client/MedicationAdministrationWS';
import {
  CReqMsgGetPatientPersonalCarer,
  CResMsgGetPatientPersonalCarer,
  GetPatientPersonalCarerCompletedEventArgs,
  QueryPatientRecordWSSoapClient,
} from 'src/app/shared/epma-platform/soap-client/QueryPatientRecordWS';
import { iTabItem } from 'epma-platform/controls';
import { MouseButtonEventArgs } from 'src/app/shared/epma-platform/controls/Control';
import {
  AddPrescribingConfigData,
  PrescribingConfigData,
} from 'src/app/lorappslprofiletypes/medication';
import 'epma-platform/booleanextension';
import 'epma-platform/numberextension';
import 'epma-platform/stringextension';
import {iMath} from 'epma-platform/mathextension';
import 'epma-platform/arrayextension';
import { PresItemModificationHistory } from '../child/PresItemModificationHistory';
import { ClinicalVerhislink } from '../child/ClinicalVerhislink';
import { MedConditionalDose } from '../view/medconditionaldose';
import { MedTitratedDoseView } from '../view/medtitrateddoseview';
import { MedDoseDetails } from '../view/meddosedetails';
import { MedTitratedDose } from '../view/medtitrateddose';
import { meddispensingsupply } from '../child/meddispensingsupply';
import { OnBehalfOflink } from '../child/OnBehalfOflink';
import { EventEmitter } from '@angular/core';
import { MedsAdminEventDetails } from '../view/medsadmineventdetails';
import { ScanRecMedicationMezzanineCa } from '../child/ScanRecMedicationMezzanine';
import { medbagdetails } from '../view/medbagdetails/medbagdetails.component';
import { MedSteppedFullPrescriptionVW } from '../view/medSteppedFullPrescriptionVW';
import { GridExtension } from 'src/app/shared/epma-platform/controls/epma-grid-helpers/grid-extension';

export class PrescriptionItemDetailsVM
  extends ViewModelBase
  implements IViewModelBase {
  public getdata: EventEmitter<any> = new EventEmitter();
  public getdataChild: EventEmitter<any> = new EventEmitter();
  objManagePrescriptionServiceProxy: ManagePrescriptionWSSoapClient;
  objIPPManagePresServiceProxy: IPPManagePrescSer.IPPMAManagePrescriptionWSSoapClient;
  objMedicationMgmtServiceProxy: MedicationMgmtSer.MedicationMgmtWSSoapClient;
  objMedicationAdministrationProxy: MedicationMgmt.MedicationAdministrationWSSoapClient;
  objQPServiceProxy: QueryPatientRecordWSSoapClient;
  private ConditionalVM: ConditionalDoseVM;
  private MultiDoseDetailVM: MultipleDoseDetail;
  public objDrugDetailsData: DrugDetailsData;
  objAdditionalDetails: MedicationAdditionalDetails;
  //Not Required for LHS. To be Re-Visited.
  /*omedinfusionstrikehistory: medinfusionstrikehistory;*/
  objStepped: MedSteppedFullPrescriptionVW;
  objTitrated: MedTitratedDose;
  objDoseCalc: MedDoseDetails;
  public IsMciChildSelected1: boolean = false;
  //public delegate void DlgtOnSelPrescItemChanged(PrescriptionItemDetailsVM oPrescItemVM);
  public OnSelectedPresItmChldChanged: Function;
  personalCarers: ObservableCollection<CListItem>;
  conceptCodes: StringBuilder = new StringBuilder();
  resolvedConceptCodes: ObservableCollection<CValuesetTerm>;
  public static NEW: string = 'ACT_NEW';
  public static UPDATE: string = 'ACT_UPDATE';
  public static COMPLETE: string = 'ACT_COMPLETE';
  public static DISCONTINUE: string = 'ACT_DISCONTINUE';
  public static CANCEL: string = 'ACT_CANCEL';
  private PresIdentifyingType: string;
  oDrugname: DrugName;
  //Not Required for LHS. To be Re-Visited.
  oMedTitratedDoseView: MedTitratedDoseView;
  public Iscancelled: boolean = false;
  public lPrescriptionItmOIDForDCDetails: number = 0;
  private _IsViewRecMedLinkExists: Visibility = Visibility.Collapsed;
  public SupplyHistoryservicedata:EventEmitter<any>=new EventEmitter();
  public TechnicalDetailsservicedata:EventEmitter<any>=new EventEmitter();
  public get IsViewRecMedLinkExists(): Visibility {
    return this._IsViewRecMedLinkExists;
  }
  public set IsViewRecMedLinkExists(value: Visibility) {
    if (this._IsViewRecMedLinkExists != value) {
      this._IsViewRecMedLinkExists = value;
      //NotifyPropertyChanged("IsViewRecMedLinkExists");
    }
  }
  constructor() {
    super();
    this.objManagePrescriptionServiceProxy =
      new ManagePrescriptionWSSoapClient();
    this.objIPPManagePresServiceProxy =
      new IPPManagePrescSer.IPPMAManagePrescriptionWSSoapClient();
    this.objMedicationMgmtServiceProxy =
      new MedicationMgmtSer.MedicationMgmtWSSoapClient();
    this.objMedicationAdministrationProxy =
      new MedicationMgmt.MedicationAdministrationWSSoapClient();
    let objQPServiceProxy: QueryPatientRecordWSSoapClient =
      new QueryPatientRecordWSSoapClient();
    this.objIPPManagePresServiceProxy.GetMedicationConfilictConfigCompleted = (
      s,
      e
    ) => {
      this.objMedicationMgmtServiceProxy_GetMedicationConfilictConfigCompleted(
        s,
        e
      );
    };
    this.objIPPManagePresServiceProxy.GetAdditionalDetailsCompleted = (
      s,
      e
    ) => {
      this.objManagePrescriptionServiceProxy_GetAdditionalDetailsCompleted(
        s,
        e
      );
    };
    this.objManagePrescriptionServiceProxy.GetDoseDetailsCompleted = (s, e) => {
      this.objManagePrescriptionServiceProxy_GetDoseDetailsCompleted(s, e);
    };
    this.objIPPManagePresServiceProxy.GetDrugDetailsCompleted = (s, e) => {
      this.objManagePrescriptionServiceProxy_GetDrugDetailsCompleted(s, e);
    };
    this.objManagePrescriptionServiceProxy.GetTechnicalDetailsCompleted = (
      s,
      e
    ) => {
      this.objManagePrescriptionServiceProxy_GetTechnicalDetailsCompleted(s, e);
    };
    this.objIPPManagePresServiceProxy.GetSupplyHistoryDetailsCompleted = (
      s,
      e
    ) => {
      this.objServiceProxy_GetSupplyHistoryDetailsCompleted(s, e);
    };
    this.objManagePrescriptionServiceProxy.GetValidationsDetailsCompleted = (
      s,
      e
    ) => {
      this.objManagePrescriptionServiceProxy_GetValidationsDetailsCompleted(
        s,
        e
      );
    };
    this.objIPPManagePresServiceProxy.GetDRCConflictsCompleted = (s, e) => {
      this.objIPPManagePresServiceProxy_GetDRCConflictsCompleted(s, e);
    };
    objQPServiceProxy.GetPatientPersonalCarerCompleted = (s, e) => {
      this.objService_GetPatientPersonalCarerCompleted(s, e);
    };
    let objReq: CReqMsgGetPatientPersonalCarer =
      new CReqMsgGetPatientPersonalCarer();
    objReq.oContextInformation = CommonBB.FillContext();
    objReq.PatientIDBC = Convert.ToString(PatientContext.PatientOID);
    objReq.CurrentBC = 'IncludeRemoved';
    objQPServiceProxy.GetPatientPersonalCarerAsync(objReq);
  }
  IsDST: boolean = false;
  IsAmbiguous: boolean = false;
  IsInvalid: boolean = false;
  public MedSupplyDetailOID: number = 0;
  public PrescriptionItemOID: number = 0;
  public DispenseStatus: string;
  public MCVersion: string;
  public MCLorenzoID: string;
  public itemsubtype: string;
  public MCIItemDisplay: string;
  public sDefaultTab: string;
  public oLaunchFrom: SVIconLaunchFrom;
  public PrescriptionType: string = String.Empty;
  public ServiceOID: number = 0;
  public LocationOID: number = 0;
  public IsDoseCalcExist: string;
  private supplyDetails: ObservableCollection<SupplyDetails>;
  public get SupplyDetails(): ObservableCollection<SupplyDetails> {
    return this.supplyDetails;
  }
  public set SupplyDetails(value: ObservableCollection<SupplyDetails>) {
    if (this.supplyDetails != value) {
      this.supplyDetails = value;
      //super.NotifyPropertyChanged("SupplyDetails");
    }
  }
  private _IsMCIComponent: boolean = false;
  public get IsMCIComponent(): boolean {
    return this._IsMCIComponent;
  }
  public set IsMCIComponent(value: boolean) {
    if (this._IsMCIComponent != value) {
      this._IsMCIComponent = value;
      //super.NotifyPropertyChanged("IsMCIComponent");
    }
  }
  private oSupplyHistory: ObservableCollection<SupplyDetails>;
  public get SupplyHistory(): ObservableCollection<SupplyDetails> {
    return this.oSupplyHistory;
  }
  public set SupplyHistory(value: ObservableCollection<SupplyDetails>) {
    if (this.oSupplyHistory != value) {
      this.oSupplyHistory = value;
      //super.NotifyPropertyChanged("SupplyHistory");
    }
  }
  private oDispensingdetail: ObservableCollection<SupplyDetails>;
  public get Dispensingdetail(): ObservableCollection<SupplyDetails> {
    return this.oDispensingdetail;
  }
  public set Dispensingdetail(value: ObservableCollection<SupplyDetails>) {
    if (this.oDispensingdetail != value) {
      this.oDispensingdetail = value;
      //super.NotifyPropertyChanged("dispensingdetail");
    }
  }
  private selectedSupplyItem: SupplyDetails;
  public get SelectedSupplyItem(): SupplyDetails {
    return this.selectedSupplyItem;
  }
  public set SelectedSupplyItem(value: SupplyDetails) {
    if (this.selectedSupplyItem != value) {
      this.selectedSupplyItem = value;
      //super.NotifyPropertyChanged("SelectedSupplyItem");
    }
  }
  private oReviewHistory: ObservableCollection<ReviewHistoryDetails> = new ObservableCollection<ReviewHistoryDetails>();
  public get ReviewHistory(): ObservableCollection<ReviewHistoryDetails> {
    return this.oReviewHistory;
  }
  public set ReviewHistory(value: ObservableCollection<ReviewHistoryDetails>) {
    if (this.oReviewHistory != value) {
      this.oReviewHistory.CopyFrom(value);
      //super.NotifyPropertyChanged("ReviewHistory");
    }
  }
  private _bAdditionalview: string = 'Visible';
  public get bAdditionalview(): string {
    return this._bAdditionalview;
  }
  public set bAdditionalview(value: string) {
    this._bAdditionalview = value;
    //NotifyPropertyChanged("bAdditionalview");
  }
  private _bsuppydispensingfields: string = 'Visible';
  public get bsuppydispensingfields(): string {
    return this._bsuppydispensingfields;
  }
  public set bsuppydispensingfields(value: string) {
    this._bsuppydispensingfields = value;
    //NotifyPropertyChanged("bsuppydispensingfields");
  }
  private _bMedClrSrc: string;
  public get MedClrSrcView(): string {
    return this._bMedClrSrc;
  }
  public set MedClrSrcView(value: string) {
    this._bMedClrSrc = value;
    //NotifyPropertyChanged("MedClrSrcView");
  }
  private _bMedClrSrcrsn: string;
  public get MedClrSrcRsn(): string {
    return this._bMedClrSrcrsn;
  }
  public set MedClrSrcRsn(value: string) {
    this._bMedClrSrcrsn = value;
    //NotifyPropertyChanged("MedClrSrcRsn");
  }
  private _bAuthoriseView: string;
  public get AuthoriseView(): string {
    return this._bAuthoriseView;
  }
  public set AuthoriseView(value: string) {
    this._bAuthoriseView = value;
    //NotifyPropertyChanged("AuthoriseView");
  }
  private _bOnBehalfView: string;
  public get OnBehalfView(): string {
    return this._bOnBehalfView;
  }
  public set OnBehalfView(value: string) {
    this._bOnBehalfView = value;
    //NotifyPropertyChanged("OnBehalfView");
  }
  private _bMedSeqNoShow: Visibility = Visibility.Collapsed;
  public get MedSeqNoVisible(): Visibility {
    return this._bMedSeqNoShow;
  }
  public set MedSeqNoVisible(value: Visibility) {
    this._bMedSeqNoShow = value;
    //NotifyPropertyChanged("MedSeqNoVisible");
  }
  public GetDrugDetailsWithDomainCodeValues(): void {
    let sDomainCodes: string =
      ValueDomain.SupplyInstruction + ',' + ValueDomain.DispensingInstruction;
    sDomainCodes += ',' + ValueDomain.Contyp;
    sDomainCodes += ',' + ValueDomain.DrugAllergy;
    sDomainCodes += ',' + ValueDomain.DrugContra;
    sDomainCodes += ',' + ValueDomain.ConDose;
    sDomainCodes += ',' + ValueDomain.InstallIns;
    sDomainCodes += ',' + ValueDomain.ReasonForOverride;
    sDomainCodes += ',' + ValueDomain.ReasonforModification;
    sDomainCodes += ',' + ValueDomain.ReqDosePerUOM;
    sDomainCodes += ',' + ValueDomain.RoundedDoseValue;
    sDomainCodes += ',' + ValueDomain.MedicationClerking;
    sDomainCodes += ',' + ValueDomain.MedicationEncounterPrep;
    sDomainCodes += ',' + ValueDomain.MedicationAdministrationSlotStatus;
    sDomainCodes += ',' + ValueDomain.ReasonForNotGivenDomainCode;
    sDomainCodes += ',' + ValueDomain.ReasonForGivenDomainCode;
    sDomainCodes += ',' + ValueDomain.DoseDiscrepancyValueDomainCode;
    sDomainCodes += ',' + ValueDomain.ReasonForDeferDomainCode;
    sDomainCodes += ',' + ValueDomain.NonformularyReason;
    sDomainCodes += ',' + ValueDomain.INFUSIONACTIONS;
    sDomainCodes += ',' + ValueDomain.MedDoseType;
    sDomainCodes += ',' + ValueDomain.INFUSIONTYPE;
    sDomainCodes += ',' + ValueDomain.InfStrikeThroughAction;
    sDomainCodes += ',' + ValueDomain.ReasonForPause;
    sDomainCodes += ',' + ValueDomain.ReasonForStop;
    sDomainCodes += ',' + ValueDomain.MedDoseFrm;
    sDomainCodes += ',' + ValueDomain.Humidification;
    sDomainCodes += ',' + ValueDomain.DRCErrorCode;
    sDomainCodes += ',' + ValueDomain.ConflictsReason;
    sDomainCodes += ',' + ValueDomain.DRCACKREASON;
    sDomainCodes += ',' + ValueDomain.TITRADMINSTRUCTION;
    sDomainCodes += ',' + ValueDomain.ReasonforReConcile;
    sDomainCodes += ',' + ValueDomain.DispenseStatus;
    sDomainCodes += ',' + ValueDomain.OnBehalfOfReason;
    sDomainCodes += ',' + ValueDomain.CommunicationMode;
    sDomainCodes += ',' + ValueDomain.MEDCATREASON;
    ProcessRTE.GetHierarchicalValuesByDomains(
      CConstants.CodingSchemeName,
      CConstants.Version,
      CConstants.FilterType,
      ContextInfo.Culture,
      sDomainCodes,
      (s, e) => {
        this.OnRTEResult(s);
      }
    );
    let DomainCodes: string =
      ValueDomain.DispensingInstruction +
      ',' +
      ValueDomain.SupplyInstruction +
      ',' +
      ValueDomain.DRCACKREASON +
      ',' +
      ValueDomain.SupplyStatus +
      ',' +
      ValueDomain.OnBehalfOfReason +
      ',' +
      ValueDomain.CommunicationMode;
    ProcessRTE.GetValuesByDomainCodes(DomainCodes, (s, e) => {
      this.OnRTEViewResult(s);
    });
  }
  OnRTEViewResult(args: RTEEventargs): void {
    if (String.IsNullOrEmpty(args.Request) || args.Result == null) return;
    if (
      String.Equals(
        args.Request,
        'DISPINS,MEDSUPPLYIN,DRCACKWRSN,MEDSUPPLYSTATUS,MEDONBHFRSN,COMMNMODE',
        StringComparison.InvariantCultureIgnoreCase
      )
    ) {
      if (args.Result instanceof Dictionary) {
        if (MedicationCommonConceptCodeData.ViewConceptCodes == null) {
          MedicationCommonConceptCodeData.ViewConceptCodes =
            new ObservableCollection<CValuesetTerm>();
        }
        let objResult: Dictionary<string, List<CListItem>> = <
          Dictionary<string, List<CListItem>>
          >args.Result;
        objResult.forEach((objDomainDetail) => {
          switch (objDomainDetail.Key.ToUpper()) {
            case 'DISPINS':
            case 'DRCACKWRSN':
            case 'MEDSUPPLYIN':
            case 'MEDSUPPLYSTATUS':
            case 'MEDONBHFRSN':
            case 'COMMNMODE':
              objDomainDetail.Value.forEach((oCListItem) => {
                MedicationCommonConceptCodeData.ViewConceptCodes.Add(
                  ObjectHelper.CreateObject(new CValuesetTerm(), {
                    csCode: oCListItem.Value,
                    csDescription: oCListItem.DisplayText,
                  })
                );
              });
              break;
          }
        });
      }
    }
  }
  OnRTEResultReln(args: RTEEventargs): void {
    if (String.IsNullOrEmpty(args.Request) || args.Result == null) return;
    if (args.Result instanceof Dictionary) {
      let objResult: Dictionary<string, List<CListItem>> = <
        Dictionary<string, List<CListItem>>
        >args.Result;
      if (this.resolvedConceptCodes == null)
        this.resolvedConceptCodes = new ObservableCollection<CValuesetTerm>();
      objResult.forEach((objDomainDetail) => {
        if (objDomainDetail.Value != null && objDomainDetail.Value.Count > 0) {
          objDomainDetail.Value.forEach((oCListItem) => {
            this.resolvedConceptCodes.Add(
              ObjectHelper.CreateObject(new CValuesetTerm(), {
                csCode: oCListItem.Value,
                csDescription: oCListItem.DisplayText,
              })
            );
          });
        }
      });
    }
  }
  OnRTEResultStrikeThruReason(args: RTEEventargs): void {
    if (String.IsNullOrEmpty(args.Request) || args.Result == null) return;
    if (args.Result instanceof Dictionary) {
      let objResult: Dictionary<string, List<CListItem>> = <
        Dictionary<string, List<CListItem>>
        >args.Result;
      if (
        String.Compare(
          args.Request,
          ValueDomain.StrikethruReason + ',' + ValueSet.StrikethruReason
        ) == 0
      ) {
        if (this.AllReasonConceptCodes == null)
          this.AllReasonConceptCodes =
            new ObservableCollection<CValuesetTerm>();
        if (this.MedDoseTypeConceptCodes == null)
          this.MedDoseTypeConceptCodes =
            new ObservableCollection<CValuesetTerm>();
        objResult.forEach((objDomainDetail) => {
          if (InfStrikethroughReasonsConceptCodeData.ConceptCodes == null)
            InfStrikethroughReasonsConceptCodeData.ConceptCodes =
              new ObservableCollection<CValuesetTerm>();
          this.StrikethruReasonConceptCodes =
            new ObservableCollection<CValuesetTerm>();
            //revisitmeyasik count not working so temp fix
          if (
              objDomainDetail.Value != null &&
              objDomainDetail.Value['length'] > 0
          ) 
         // if (
         //   objDomainDetail.Value != null
         //)
          {
            objDomainDetail.Value.forEach((oCListItem) => {
              this.StrikethruReasonConceptCodes.Add(
                ObjectHelper.CreateObject(new CValuesetTerm(), {
                  csCode: oCListItem.Value,
                  csDescription: oCListItem.DisplayText,
                })
              );
              this.AllReasonConceptCodes.Add(
                ObjectHelper.CreateObject(new CValuesetTerm(), {
                  csCode: oCListItem.Value,
                  csDescription: oCListItem.DisplayText,
                })
              );
              InfStrikethroughReasonsConceptCodeData.ConceptCodes.Add(
                ObjectHelper.CreateObject(new CValuesetTerm(), {
                  csCode: oCListItem.Value,
                  csDescription: oCListItem.DisplayText,
                })
              );
            });
          }
        });
      }
    }
    this.GetDrugDetails(this.PrescriptionItemOID, this.MCLorenzoID);
  }
  OnRTEResult(args: RTEEventargs): void {
    if (String.IsNullOrEmpty(args.Request) || args.Result == null) return;
    if (args.Result instanceof Dictionary) {
      let objResult: Dictionary<string, List<CListItem>> = <
        Dictionary<string, List<CListItem>>
        >args.Result;
      if (
        String.Compare(
          args.Request,
          'CNFTY,SUBAG,SUBCI,SUBINT,SUBDP,BHVTY,MEDSVRTY'
        ) == 0
      ) {
        WarningConceptCode.ConceptData =
          new ObservableCollection<CValuesetTerm>();
        objResult.forEach((objDomainDetail) => {
          if (
            objDomainDetail.Value != null &&
            objDomainDetail.Value.Count > 0
          ) {
            objDomainDetail.Value.forEach((oCListItem) => {
              WarningConceptCode.ConceptData.Add(
                ObjectHelper.CreateObject(new CValuesetTerm(), {
                  csCode: oCListItem.Value,
                  csDescription: oCListItem.DisplayText,
                })
              );
            });
          }
        });
        this.fillDataContext(this.objWarningDetail);
      } else {
        this.AllReasonConceptCodes = new ObservableCollection<CValuesetTerm>();
        this.MedDoseTypeConceptCodes =
          new ObservableCollection<CValuesetTerm>();
        objResult.forEach((objDomainDetail) => {
          switch (objDomainDetail.Key) {
            case ValueDomain.SupplyInstruction: {
              this.ConceptCodes = new ObservableCollection<CValuesetTerm>();
              if (MedicationCommonConceptCodeData.ConceptCodes == null)
                MedicationCommonConceptCodeData.ConceptCodes =
                  new ObservableCollection<CValuesetTerm>();
              if (
                objDomainDetail.Value != null &&
                objDomainDetail.Value.Count > 0
              ) {
                objDomainDetail.Value.forEach((oCListItem) => {
                  this.ConceptCodes.Add(
                    ObjectHelper.CreateObject(new CValuesetTerm(), {
                      csCode: oCListItem.Value,
                      csDescription: oCListItem.DisplayText,
                    })
                  );
                  MedicationCommonConceptCodeData.ConceptCodes.Add(
                    ObjectHelper.CreateObject(new CValuesetTerm(), {
                      csCode: oCListItem.Value,
                      csDescription: oCListItem.DisplayText,
                    })
                  );
                });
              }
              break;
            }
            case ValueDomain.DispensingInstruction: {
              this.ConceptCodedispense =
                new ObservableCollection<CValuesetTerm>();
              if (MedicationCommonConceptCodeData.ConceptCodedispense == null)
                MedicationCommonConceptCodeData.ConceptCodedispense =
                  new ObservableCollection<CValuesetTerm>();
              if (
                objDomainDetail.Value != null &&
                objDomainDetail.Value.Count > 0
              ) {
                objDomainDetail.Value.forEach((oCListItem) => {
                  this.ConceptCodedispense.Add(
                    ObjectHelper.CreateObject(new CValuesetTerm(), {
                      csCode: oCListItem.Value,
                      csDescription: oCListItem.DisplayText,
                    })
                  );
                  MedicationCommonConceptCodeData.ConceptCodedispense.Add(
                    ObjectHelper.CreateObject(new CValuesetTerm(), {
                      csCode: oCListItem.Value,
                      csDescription: oCListItem.DisplayText,
                    })
                  );
                });
              }
              break;
            }
            case ValueDomain.Contyp: {
              this.ContypCodes = new ObservableCollection<CValuesetTerm>();
              if (
                objDomainDetail.Value != null &&
                objDomainDetail.Value.Count > 0
              ) {
                objDomainDetail.Value.forEach((oCListItem) => {
                  this.ContypCodes.Add(
                    ObjectHelper.CreateObject(new CValuesetTerm(), {
                      csCode: oCListItem.Value,
                      csDescription: oCListItem.DisplayText,
                    })
                  );
                });
              }
              break;
            }
            case ValueDomain.DrugAllergy: {
              this.DrugAllergyCodes = new ObservableCollection<CValuesetTerm>();
              if (
                objDomainDetail.Value != null &&
                objDomainDetail.Value.Count > 0
              ) {
                objDomainDetail.Value.forEach((oCListItem) => {
                  this.DrugAllergyCodes.Add(
                    ObjectHelper.CreateObject(new CValuesetTerm(), {
                      csCode: oCListItem.Value,
                      csDescription: oCListItem.DisplayText,
                    })
                  );
                });
              }
              break;
            }
            case ValueDomain.DrugContra: {
              this.DrugContraCodes = new ObservableCollection<CValuesetTerm>();
              if (
                objDomainDetail.Value != null &&
                objDomainDetail.Value.Count > 0
              ) {
                objDomainDetail.Value.forEach((oCListItem) => {
                  this.DrugContraCodes.Add(
                    ObjectHelper.CreateObject(new CValuesetTerm(), {
                      csCode: oCListItem.Value,
                      csDescription: oCListItem.DisplayText,
                    })
                  );
                });
              }
              break;
            }
            case ValueDomain.ConDose: {
              this.ConDoseCodes = new ObservableCollection<CValuesetTerm>();
              if (
                objDomainDetail.Value != null &&
                objDomainDetail.Value.Count > 0
              ) {
                objDomainDetail.Value.forEach((oCListItem) => {
                  this.ConDoseCodes.Add(
                    ObjectHelper.CreateObject(new CValuesetTerm(), {
                      csCode: oCListItem.Value,
                      csDescription: oCListItem.DisplayText,
                    })
                  );
                });
              }
              break;
            }
            case ValueDomain.InstallIns: {
              this.InstallInstruction =
                new ObservableCollection<CValuesetTerm>();
              if (
                objDomainDetail.Value != null &&
                objDomainDetail.Value.Count > 0
              ) {
                objDomainDetail.Value.forEach((oCListItem) => {
                  this.InstallInstruction.Add(
                    ObjectHelper.CreateObject(new CValuesetTerm(), {
                      csCode: oCListItem.Value,
                      csDescription: oCListItem.DisplayText,
                    })
                  );
                });
              }
              break;
            }
            case ValueDomain.ReasonForOverride: {
              this.ReasonforOverRide =
                new ObservableCollection<CValuesetTerm>();
              if (
                objDomainDetail.Value != null &&
                objDomainDetail.Value.Count > 0
              ) {
                objDomainDetail.Value.forEach((oCListItem) => {
                  this.ReasonforOverRide.Add(
                    ObjectHelper.CreateObject(new CValuesetTerm(), {
                      csCode: oCListItem.Value,
                      csDescription: oCListItem.DisplayText,
                    })
                  );
                });
              }
              break;
            }
            case ValueDomain.ReasonforModification: {
              this.RsnForMod = new ObservableCollection<CValuesetTerm>();
              if (
                objDomainDetail.Value != null &&
                objDomainDetail.Value.Count > 0
              ) {
                objDomainDetail.Value.forEach((oCListItem) => {
                  this.RsnForMod.Add(
                    ObjectHelper.CreateObject(new CValuesetTerm(), {
                      csCode: oCListItem.Value,
                      csDescription: oCListItem.DisplayText,
                    })
                  );
                });
              }
              break;
            }
            case ValueDomain.ReqDosePerUOM: {
              this.ReqDoseperUOM = new ObservableCollection<CValuesetTerm>();
              if (
                objDomainDetail.Value != null &&
                objDomainDetail.Value.Count > 0
              ) {
                objDomainDetail.Value.forEach((oCListItem) => {
                  this.ReqDoseperUOM.Add(
                    ObjectHelper.CreateObject(new CValuesetTerm(), {
                      csCode: oCListItem.Value,
                      csDescription: oCListItem.DisplayText,
                    })
                  );
                });
              }
              break;
            }
            case ValueDomain.RoundedDoseValue: {
              this.RoundedDose = new ObservableCollection<CValuesetTerm>();
              if (
                objDomainDetail.Value != null &&
                objDomainDetail.Value.Count > 0
              ) {
                objDomainDetail.Value.forEach((oCListItem) => {
                  this.RoundedDose.Add(
                    ObjectHelper.CreateObject(new CValuesetTerm(), {
                      csCode: oCListItem.Value,
                      csDescription: oCListItem.DisplayText,
                    })
                  );
                });
              }
              break;
            }
            case ValueDomain.MedicationClerking: {
              this.MedicationClerking =
                new ObservableCollection<CValuesetTerm>();
              CommonDomainValues.MedicationClerking =
                new ObservableCollection<CValuesetTerm>();
              if (
                objDomainDetail.Value != null &&
                objDomainDetail.Value.Count > 0
              ) {
                objDomainDetail.Value.forEach((oCListItem) => {
                  this.MedicationClerking.Add(
                    ObjectHelper.CreateObject(new CValuesetTerm(), {
                      csCode: oCListItem.Value,
                      csDescription: oCListItem.DisplayText,
                    })
                  );
                  CommonDomainValues.MedicationClerking.Add(
                    ObjectHelper.CreateObject(new CValuesetTerm(), {
                      csCode: oCListItem.Value,
                      csDescription: oCListItem.DisplayText,
                    })
                  );
                });
              }
              break;
            }
            case ValueDomain.MedicationEncounterPrep: {
              this.MedicationEncounterPreparation =
                new ObservableCollection<CValuesetTerm>();
              if (
                objDomainDetail.Value != null &&
                objDomainDetail.Value.Count > 0
              ) {
                objDomainDetail.Value.forEach((oCListItem) => {
                  this.MedicationEncounterPreparation.Add(
                    ObjectHelper.CreateObject(new CValuesetTerm(), {
                      csCode: oCListItem.Value,
                      csDescription: oCListItem.DisplayText,
                    })
                  );
                });
              }
              break;
            }
            case ValueDomain.MedicationAdministrationSlotStatus: {
              this.MedicationAdministrationSlotStatus =
                new ObservableCollection<CValuesetTerm>();
              if (
                objDomainDetail.Value != null &&
                objDomainDetail.Value.Count > 0
              ) {
                objDomainDetail.Value.forEach((oCListItem) => {
                  this.MedicationAdministrationSlotStatus.Add(
                    ObjectHelper.CreateObject(new CValuesetTerm(), {
                      csCode: oCListItem.Value,
                      csDescription: oCListItem.DisplayText,
                    })
                  );
                });
                MedicationCommonConceptCodeData.MedAdminSlotStatus =
                  this.MedicationAdministrationSlotStatus;
              }
              break;
            }
            case ValueDomain.ReasonForNotGivenDomainCode: {
              this.ReasonForNotGivenConceptCodes =
                new ObservableCollection<CValuesetTerm>();
              if (
                objDomainDetail.Value != null &&
                objDomainDetail.Value.Count > 0
              ) {
                objDomainDetail.Value.forEach((oCListItem) => {
                  this.ReasonForNotGivenConceptCodes.Add(
                    ObjectHelper.CreateObject(new CValuesetTerm(), {
                      csCode: oCListItem.Value,
                      csDescription: oCListItem.DisplayText,
                    })
                  );
                  this.AllReasonConceptCodes.Add(
                    ObjectHelper.CreateObject(new CValuesetTerm(), {
                      csCode: oCListItem.Value,
                      csDescription: oCListItem.DisplayText,
                    })
                  );
                });
              }
              break;
            }
            case ValueDomain.ReasonForGivenDomainCode: {
              this.ReasonForGivenConceptCodes =
                new ObservableCollection<CValuesetTerm>();
              if (
                objDomainDetail.Value != null &&
                objDomainDetail.Value.Count > 0
              ) {
                objDomainDetail.Value.forEach((oCListItem) => {
                  this.ReasonForGivenConceptCodes.Add(
                    ObjectHelper.CreateObject(new CValuesetTerm(), {
                      csCode: oCListItem.Value,
                      csDescription: oCListItem.DisplayText,
                    })
                  );
                  this.AllReasonConceptCodes.Add(
                    ObjectHelper.CreateObject(new CValuesetTerm(), {
                      csCode: oCListItem.Value,
                      csDescription: oCListItem.DisplayText,
                    })
                  );
                });
              }
              break;
            }
            case ValueDomain.DoseDiscrepancyValueDomainCode: {
              this.DoseDiscrepancyConceptCodes =
                new ObservableCollection<CValuesetTerm>();
              if (
                objDomainDetail.Value != null &&
                objDomainDetail.Value.Count > 0
              ) {
                objDomainDetail.Value.forEach((oCListItem) => {
                  this.DoseDiscrepancyConceptCodes.Add(
                    ObjectHelper.CreateObject(new CValuesetTerm(), {
                      csCode: oCListItem.Value,
                      csDescription: oCListItem.DisplayText,
                    })
                  );
                });
              }
              break;
            }
            case ValueDomain.ReasonForDeferDomainCode: {
              this.ReasonForDeferConceptCodes =
                new ObservableCollection<CValuesetTerm>();
              if (
                objDomainDetail.Value != null &&
                objDomainDetail.Value.Count > 0
              ) {
                objDomainDetail.Value.forEach((oCListItem) => {
                  this.ReasonForDeferConceptCodes.Add(
                    ObjectHelper.CreateObject(new CValuesetTerm(), {
                      csCode: oCListItem.Value,
                      csDescription: oCListItem.DisplayText,
                    })
                  );
                  this.AllReasonConceptCodes.Add(
                    ObjectHelper.CreateObject(new CValuesetTerm(), {
                      csCode: oCListItem.Value,
                      csDescription: oCListItem.DisplayText,
                    })
                  );
                });
              }
              break;
            }
            case ValueDomain.NonformularyReason: {
              this.NonFormularyReasonConceptCodes =
                new ObservableCollection<CValuesetTerm>();
              if (
                objDomainDetail.Value != null &&
                objDomainDetail.Value.Count > 0
              ) {
                objDomainDetail.Value.forEach((oCListItem) => {
                  this.NonFormularyReasonConceptCodes.Add(
                    ObjectHelper.CreateObject(new CValuesetTerm(), {
                      csCode: oCListItem.Value,
                      csDescription: oCListItem.DisplayText,
                    })
                  );
                });
              }
              break;
            }
            case ValueDomain.INFUSIONACTIONS: {
              if (InfActionsConceptCodeData.ConceptCodes == null)
                InfActionsConceptCodeData.ConceptCodes =
                  new ObservableCollection<CValuesetTerm>();
              if (
                objDomainDetail.Value.Count > 0 &&
                InfActionsConceptCodeData.ConceptCodes.Count <= 0
              ) {
                (objDomainDetail.Value as List<CListItem>).forEach(
                  (oCListItem) => {
                    let objCValuesetTerm: CValuesetTerm =
                      ObjectHelper.CreateObject(new CValuesetTerm(), {
                        csCode: oCListItem.Value,
                        csDescription: oCListItem.DisplayText,
                      });
                    InfActionsConceptCodeData.ConceptCodes.Add(
                      objCValuesetTerm
                    );
                  }
                );
              }
              break;
            }
            case ValueDomain.MedDoseType: {
              if (
                objDomainDetail.Value != null &&
                objDomainDetail.Value.Count > 0
              ) {
                MedDoseTypeConceptCodeData.ConceptCodes = new Dictionary<
                  string,
                  string
                >();
                objDomainDetail.Value.forEach((oCListItem) => {
                  this.MedDoseTypeConceptCodes.Add(
                    ObjectHelper.CreateObject(new CValuesetTerm(), {
                      csCode: oCListItem.Value,
                      csDescription: oCListItem.DisplayText,
                    })
                  );
                  MedDoseTypeConceptCodeData.ConceptCodes.Add(
                    oCListItem.Value.ToUpper(),
                    oCListItem.DisplayText
                  );
                });
              }
              break;
            }
            case ValueDomain.MedDoseFrm: {
              if (
                objDomainDetail.Value != null &&
                objDomainDetail.Value.Count > 0
              ) {
                objDomainDetail.Value.forEach((oCListItem) => {
                  this.MedDoseTypeConceptCodes.Add(
                    ObjectHelper.CreateObject(new CValuesetTerm(), {
                      csCode: oCListItem.Value,
                      csDescription: oCListItem.DisplayText,
                    })
                  );
                });
              }
              break;
            }
            case ValueDomain.INFUSIONTYPE: {
              this.InfusionTypeConceptCodes =
                new ObservableCollection<CValuesetTerm>();
              if (
                objDomainDetail.Value != null &&
                objDomainDetail.Value.Count > 0
              ) {
                objDomainDetail.Value.forEach((oCListItem) => {
                  this.InfusionTypeConceptCodes.Add(
                    ObjectHelper.CreateObject(new CValuesetTerm(), {
                      csCode: oCListItem.Value,
                      csDescription: oCListItem.DisplayText,
                    })
                  );
                });
                if (
                  this.InfusionTypeConceptCodes != null &&
                  this.InfusionTypeConceptCodes.Count > 0
                ) {
                  if (InfusionTypeConceptCodeData.ConceptCodes == null) {
                    InfusionTypeConceptCodeData.ConceptCodes =
                      new ObservableCollection<CValuesetTerm>();
                  }
                  InfusionTypeConceptCodeData.ConceptCodes =
                    this.InfusionTypeConceptCodes;
                }
              }
              break;
            }
            case ValueDomain.InfStrikeThroughAction: {
              if (InfStrikethroughConceptCodeData.ConceptCodes == null)
                InfStrikethroughConceptCodeData.ConceptCodes =
                  new ObservableCollection<CValuesetTerm>();
              if (
                objDomainDetail.Value.Count > 0 &&
                InfStrikethroughConceptCodeData.ConceptCodes.Count <= 0
              ) {
                (<List<CListItem>>objDomainDetail.Value).forEach(
                  (oCListItem) => {
                    let objCValuesetTerm: CValuesetTerm =
                      ObjectHelper.CreateObject(new CValuesetTerm(), {
                        csCode: oCListItem.Value,
                        csDescription: oCListItem.DisplayText,
                      });
                    InfStrikethroughConceptCodeData.ConceptCodes.Add(
                      objCValuesetTerm
                    );
                  }
                );
              }
              break;
            }
            case ValueDomain.ReasonForPause: {
              this.ReasonForPauseConceptCodes =
                new ObservableCollection<CValuesetTerm>();
              if (
                objDomainDetail.Value != null &&
                objDomainDetail.Value.Count > 0
              ) {
                objDomainDetail.Value.forEach((oCListItem) => {
                  this.ReasonForPauseConceptCodes.Add(
                    ObjectHelper.CreateObject(new CValuesetTerm(), {
                      csCode: oCListItem.Value,
                      csDescription: oCListItem.DisplayText,
                    })
                  );
                  this.AllReasonConceptCodes.Add(
                    ObjectHelper.CreateObject(new CValuesetTerm(), {
                      csCode: oCListItem.Value,
                      csDescription: oCListItem.DisplayText,
                    })
                  );
                });
              }
              break;
            }
            case ValueDomain.ReasonForStop: {
              this.ReasonForStopConceptCodes =
                new ObservableCollection<CValuesetTerm>();
              if (
                objDomainDetail.Value != null &&
                objDomainDetail.Value.Count > 0
              ) {
                objDomainDetail.Value.forEach((oCListItem) => {
                  this.ReasonForStopConceptCodes.Add(
                    ObjectHelper.CreateObject(new CValuesetTerm(), {
                      csCode: oCListItem.Value,
                      csDescription: oCListItem.DisplayText,
                    })
                  );
                  this.AllReasonConceptCodes.Add(
                    ObjectHelper.CreateObject(new CValuesetTerm(), {
                      csCode: oCListItem.Value,
                      csDescription: oCListItem.DisplayText,
                    })
                  );
                });
              }
              break;
            }
            case ValueDomain.Humidification: {
              this.HumidificationCodes =
                new ObservableCollection<CValuesetTerm>();
              if (
                objDomainDetail.Value != null &&
                objDomainDetail.Value.Count > 0
              ) {
                InfHumdificationConceptCodeData.ConceptCodes =
                  new ObservableCollection<CListItem>();
                objDomainDetail.Value.forEach((oCListItem) => {
                  this.HumidificationCodes.Add(
                    ObjectHelper.CreateObject(new CValuesetTerm(), {
                      csCode: oCListItem.Value,
                      csDescription: oCListItem.DisplayText,
                    })
                  );
                  InfHumdificationConceptCodeData.ConceptCodes.Add(oCListItem);
                });
              }
              break;
            }
            case ValueDomain.DRCErrorCode: {
              this.DRCErrorConceptCodes =
                new ObservableCollection<CValuesetTerm>();
              if (
                objDomainDetail.Value != null &&
                objDomainDetail.Value.Count > 0
              ) {
                DRCErrorCodeConceptCodeData.ConceptCodes =
                  new ObservableCollection<CListItem>();
                objDomainDetail.Value.forEach((oCListItem) => {
                  this.DRCErrorConceptCodes.Add(
                    ObjectHelper.CreateObject(new CValuesetTerm(), {
                      csCode: oCListItem.Value,
                      csDescription: oCListItem.DisplayText,
                    })
                  );
                  DRCErrorCodeConceptCodeData.ConceptCodes.Add(oCListItem);
                });
              }
              break;
            }
            case ValueDomain.ConflictsReason: {
              this.ConflictsReasonConceptCodes =
                new ObservableCollection<CValuesetTerm>();
              if (
                objDomainDetail.Value != null &&
                objDomainDetail.Value.Count > 0
              ) {
                ConflictsReasonConceptCodeData.ConceptCodes =
                  new ObservableCollection<CListItem>();
                objDomainDetail.Value.forEach((oCListItem) => {
                  this.ConflictsReasonConceptCodes.Add(
                    ObjectHelper.CreateObject(new CValuesetTerm(), {
                      csCode: oCListItem.Value,
                      csDescription: oCListItem.DisplayText,
                    })
                  );
                  ConflictsReasonConceptCodeData.ConceptCodes.Add(oCListItem);
                });
              }
              break;
            }
            case ValueDomain.DRCACKREASON: {
              this.ConflictsReasonConceptCodes =
                new ObservableCollection<CValuesetTerm>();
              if (
                objDomainDetail.Value != null &&
                objDomainDetail.Value.Count > 0
              ) {
                ConflictsReasonConceptCodeData.ConceptCodes =
                  new ObservableCollection<CListItem>();
                objDomainDetail.Value.forEach((oCListItem) => {
                  this.ConflictsReasonConceptCodes.Add(
                    ObjectHelper.CreateObject(new CValuesetTerm(), {
                      csCode: oCListItem.Value,
                      csDescription: oCListItem.DisplayText,
                    })
                  );
                  ConflictsReasonConceptCodeData.ConceptCodes.Add(oCListItem);
                });
              }
              break;
            }
            case ValueDomain.TITRADMINSTRUCTION: {
              this.TitratedDoseInstruction =
                new ObservableCollection<CValuesetTerm>();
              if (
                objDomainDetail.Value != null &&
                objDomainDetail.Value.Count > 0
              ) {
                TitratedDoseInstructions.ConceptCodes =
                  new ObservableCollection<CListItem>();
                objDomainDetail.Value.forEach((oCListItem) => {
                  this.TitratedDoseInstruction.Add(
                    ObjectHelper.CreateObject(new CValuesetTerm(), {
                      csCode: oCListItem.Value,
                      csDescription: oCListItem.DisplayText,
                    })
                  );
                  TitratedDoseInstructions.ConceptCodes.Add(oCListItem);
                });
              }
              break;
            }
            case ValueDomain.ReasonforReConcile: {
              this.ReasonforReconcileConceptCodes =
                new ObservableCollection<CValuesetTerm>();
              if (
                objDomainDetail.Value != null &&
                objDomainDetail.Value.Count > 0
              ) {
                objDomainDetail.Value.forEach((oCListItem) => {
                  this.ReasonforReconcileConceptCodes.Add(
                    ObjectHelper.CreateObject(new CValuesetTerm(), {
                      csCode: oCListItem.Value,
                      csDescription: oCListItem.DisplayText,
                    })
                  );
                });
              }
              break;
            }
            case ValueDomain.DispenseStatus: {
              DispenseStatusListConceptCodeData.ConceptCodes =
                new ObservableCollection<CValuesetTerm>();
              if (
                objDomainDetail.Value != null &&
                objDomainDetail.Value.Count > 0
              ) {
                objDomainDetail.Value.forEach((oCListItem) => {
                  DispenseStatusListConceptCodeData.ConceptCodes.Add(
                    ObjectHelper.CreateObject(new CValuesetTerm(), {
                      csCode: oCListItem.Value,
                      csDescription: oCListItem.DisplayText,
                    })
                  );
                });
              }
              break;
            }
            case ValueDomain.CommunicationMode:
              {
                this.CommunicationModecode =
                  new ObservableCollection<CValuesetTerm>();
                if (
                  objDomainDetail.Value != null &&
                  objDomainDetail.Value.Count > 0
                ) {
                  objDomainDetail.Value.forEach((oCListItem) => {
                    this.CommunicationModecode.Add(
                      ObjectHelper.CreateObject(new CValuesetTerm(), {
                        csCode: oCListItem.Value,
                        csDescription: oCListItem.DisplayText,
                      })
                    );
                  });
                }
              }
              break;
            case ValueDomain.OnBehalfOfReason:
              {
                this.OnBehalfOfReasoncode =
                  new ObservableCollection<CValuesetTerm>();
                if (
                  objDomainDetail.Value != null &&
                  objDomainDetail.Value.Count > 0
                ) {
                  objDomainDetail.Value.forEach((oCListItem) => {
                    this.OnBehalfOfReasoncode.Add(
                      ObjectHelper.CreateObject(new CValuesetTerm(), {
                        csCode: oCListItem.Value,
                        csDescription: oCListItem.DisplayText,
                      })
                    );
                  });
                }
              }
              break;
            case ValueDomain.MEDCATREASON: {
              this.NONCatalogueReasons =
                new ObservableCollection<CValuesetTerm>();
              if (
                objDomainDetail.Value != null &&
                objDomainDetail.Value.Count > 0
              ) {
                objDomainDetail.Value.forEach((oCListItem) => {
                  this.NONCatalogueReasons.Add(
                    ObjectHelper.CreateObject(new CValuesetTerm(), {
                      csCode: oCListItem.Value,
                      csDescription: oCListItem.DisplayText,
                    })
                  );
                });
              }
              break;
            }
          }
        });
        ProcessRTE.GetAllReferenceCodesByDomain(
          ValueDomain.StrikethruReason,
          ValueSet.StrikethruReason,
          (s, e) => {
            this.OnRTEResultStrikeThruReason(s);
          }
        );
      }
    }
  }
  public ConceptCodes: ObservableCollection<CValuesetTerm>;
  public ConceptCodedispense: ObservableCollection<CValuesetTerm>;
  public ContypCodes: ObservableCollection<CValuesetTerm>;
  public ConDoseCodes: ObservableCollection<CValuesetTerm>;
  public DrugAllergyCodes: ObservableCollection<CValuesetTerm>;
  public DrugContraCodes: ObservableCollection<CValuesetTerm>;
  public InstallInstruction: ObservableCollection<CValuesetTerm>;
  public ReqDoseperUOM: ObservableCollection<CValuesetTerm>;
  public RsnForMod: ObservableCollection<CValuesetTerm>;
  public RoundedDose: ObservableCollection<CValuesetTerm>;
  public ReasonforOverRide: ObservableCollection<CValuesetTerm>;
  public MedicationClerking: ObservableCollection<CValuesetTerm>;
  public MedicationEncounterPreparation: ObservableCollection<CValuesetTerm>;
  public MedicationAdministrationSlotStatus: ObservableCollection<CValuesetTerm>;
  public DoseDiscrepancyConceptCodes: ObservableCollection<CValuesetTerm>;
  public ReasonForDeferConceptCodes: ObservableCollection<CValuesetTerm>;
  public ReasonForNotGivenConceptCodes: ObservableCollection<CValuesetTerm>;
  public ReasonForGivenConceptCodes: ObservableCollection<CValuesetTerm>;
  public NonFormularyReasonConceptCodes: ObservableCollection<CValuesetTerm>;
  public NONCatalogueReasons: ObservableCollection<CValuesetTerm>;
  public PreparationStatusConceptCodes: ObservableCollection<CValuesetTerm>;
  public StrikethruReasonConceptCodes: ObservableCollection<CValuesetTerm>;
  public ConflictConfig: IPPManagePrescSer.MedicationConflictConfig;
  public MedDoseTypeConceptCodes: ObservableCollection<CValuesetTerm>;
  public InfusionTypeConceptCodes: ObservableCollection<CValuesetTerm>;
  public AllReasonConceptCodes: ObservableCollection<CValuesetTerm>;
  public ReasonForPauseConceptCodes: ObservableCollection<CValuesetTerm>;
  public ReasonForStopConceptCodes: ObservableCollection<CValuesetTerm>;
  public HumidificationCodes: ObservableCollection<CValuesetTerm>;
  public DRCErrorConceptCodes: ObservableCollection<CValuesetTerm>;
  public ConflictsReasonConceptCodes: ObservableCollection<CValuesetTerm>;
  public TitratedDoseInstruction: ObservableCollection<CValuesetTerm>;
  public ReasonforReconcileConceptCodes: ObservableCollection<CValuesetTerm>;
  public CommunicationModecode: ObservableCollection<CValuesetTerm>;
  public OnBehalfOfReasoncode: ObservableCollection<CValuesetTerm>;
  private oAdminList: ObservableCollection<AdminList> = new ObservableCollection<AdminList>();
  public get AdminList(): ObservableCollection<AdminList> {
    return this.oAdminList;
  }
  public set AdminList(value: ObservableCollection<AdminList>) {
    if (this.oAdminList != value) {
      this.AdminList.CopyFrom(value);
      //this.oAdminList = value;
      //NotifyPropertyChanged("AdminList");
    }
  }
  private _SelectedSlot: AdminList;
  public get SelectedSlot(): AdminList {
    return this._SelectedSlot;
  }
  public set SelectedSlot(value: AdminList) {
    if (!ObjectHelper.ReferenceEquals(this._SelectedSlot, value)) {
      this._SelectedSlot = value;
      //NotifyPropertyChanged("SelectedSlot");
      this.LoadFauxTabData();
    }
  }
  private oAdditionalDetails: MedicationAdditionalDetails;
  public get AdditionalDetails(): MedicationAdditionalDetails {
    return this.oAdditionalDetails;
  }
  public set AdditionalDetails(value: MedicationAdditionalDetails) {
    if (this.oAdditionalDetails != value) {
      this.oAdditionalDetails = value;
      //NotifyPropertyChanged("AdditionalDetails");
    }
  }
  private oDoseDetailsData: DoseDetailsdata;
  public get DoseDetails(): DoseDetailsdata {
    return this.oDoseDetailsData;
  }
  public set DoseDetails(value: DoseDetailsdata) {
    if (this.oDoseDetailsData != value) {
      this.oDoseDetailsData = value;
      //NotifyPropertyChanged("DoseDetails");
    }
  }
  private oDrugDetailsData: DrugDetailsData;
  public get DrugDetails(): DrugDetailsData {
    return this.oDrugDetailsData;
  }
  public set DrugDetails(value: DrugDetailsData) {
    if (this.oDrugDetailsData != value) {
      this.oDrugDetailsData = value;
      //NotifyPropertyChanged("DrugDetails");
    }
  }
  private oTechnicalDetailsData: ObservableCollection<TechnicalDetails>;
  public get TechnicalDetails(): ObservableCollection<TechnicalDetails> {
    return this.oTechnicalDetailsData;
  }
  public set TechnicalDetails(value: ObservableCollection<TechnicalDetails>) {
    if (this.oTechnicalDetailsData != value) {
      this.oTechnicalDetailsData = value;
      //NotifyPropertyChanged("TechnicalDetails");
    }
  }
  private oValidationDetails: ObservableCollection<ManagePrescSer.WarningDetails> = new ObservableCollection<ManagePrescSer.WarningDetails>();
  public get ValidationDetails(): ObservableCollection<ManagePrescSer.WarningDetails> {
    return this.oValidationDetails;
  }
  public set ValidationDetails(
    value: ObservableCollection<ManagePrescSer.WarningDetails>
  ) {
    if (this.oValidationDetails != value) {
      this.oValidationDetails.CopyFrom(value);
      //this.oValidationDetails = value;
      //NotifyPropertyChanged("ValidationDetails");
    }
  }
  public oSupDispInst: ObservableCollection<SupDispInst> = new ObservableCollection<SupDispInst>();
  public get SupDispInst(): ObservableCollection<SupDispInst> {
    return this.oSupDispInst;
  }
  public set SupDispInst(value: ObservableCollection<SupDispInst>) {
    if (this.oSupDispInst != value) {
      //this.oSupDispInst = value;
      this.oSupDispInst.CopyFrom(value);
      //NotifyPropertyChanged("SupDispInst");
    }
  }
  //Not Required for LHS. To be Re-Visited.

  public SupplyInstruction_Click(): void {
    let omeddispensingsupply: meddispensingsupply = new meddispensingsupply();
    omeddispensingsupply.constructorImpl(this.PrescriptionItemOID);
    omeddispensingsupply.DataContext = this;
    AppActivity.OpenWindow("Supply instructions", omeddispensingsupply, (s, e) => { this.omeddispensingsupply_closed(s); }, "Supply instructions", false, 400, 630, true, WindowButtonType.Close, null);
  }
  omeddispensingsupply_closed(args: AppDialogEventargs): void {
    let oAppDialogWindow = args.AppChildWindow as ChildWindow;
    oAppDialogWindow.DialogResult = true;
    // args.AppChildWindow.DialogResult = true;
  }
  public GetAdministrationList(PrescriptionItmOID: number): void {
    if (
      this.personalCarers != null &&
      this.personalCarers.Count > 0 &&
      (this.resolvedConceptCodes == null ||
        this.resolvedConceptCodes.Count <= 0)
    ) {
      ProcessRTE.GetValuesByDomainCodes('RELN', (s, e) => {
        this.OnRTEResultReln(s);
      });
    }
    let oServiceProxy: MedicationMgmt.MedicationAdministrationWSSoapClient =
      new MedicationMgmt.MedicationAdministrationWSSoapClient();
    oServiceProxy.GetAdministrationListCompleted = (s, e) => {
      this.objMedicationAdministrationProxy_GetAdministrationListCompleted(
        s,
        e
      );
    };
    let objReqAdministration: MedicationMgmt.CReqMsgGetAdministrationList =
      new MedicationMgmt.CReqMsgGetAdministrationList();
    objReqAdministration.PrescriptionItemOIDBC = PrescriptionItmOID;
    objReqAdministration.oContextInformation = CommonBB.FillContext();
    oServiceProxy.GetAdministrationListAsync(objReqAdministration);
  }
  public objMedicationAdministrationProxy_GetAdministrationListCompleted(
    sender: Object,
    e: MedicationMgmt.GetAdministrationListCompletedEventArgs
  ): void {
    let _ErrorID: number = 80000113;
    let _ErrorSource: string =
      'LorAppMedicationCommonBB.dll, Class:Prescriptionitemdetailsvm, Method:objMedicationAdministrationProxy_GetAdministrationListCompleted()';
    if (e.Error == null && e.Result != null) {
      try {
        let objResAdministrationList: MedicationMgmt.CResMsgGetAdministrationList =
          e.Result;
        let objSlotDetails: ObservableCollection<MedicationMgmt.SlotDetail> =
          objResAdministrationList.oSlotDetails;
        let lstTemp: ObservableCollection<AdminList> =
          new ObservableCollection<AdminList>();
        if (
          objResAdministrationList != null &&
          objResAdministrationList.oSlotDetails != null &&
          objResAdministrationList.oSlotDetails.Count > 0 &&
          objResAdministrationList.oSlotDetails[0] != null
        ) {
          for (let objSlotDetail of objSlotDetails.array) {
            // objSlotDetails.forEach((objSlotDetail)=> {
            if (objSlotDetail == null) continue;
            let objSlot: AdminList = new AdminList();
            if (!String.IsNullOrEmpty(objSlotDetail.AdminMethod)) {
              objSlot.Dose = objSlotDetail.AdminMethod;
            } else {
              objSlot.Dose = objSlotDetail.Dose;
              if (!String.IsNullOrEmpty(objSlot.Dose))
                objSlot.Dose += ' ' + objSlotDetail.DoseUOM;
            }
            objSlot.PrescriptionItemOID = objSlotDetail.PrescriptionItemOID;
            objSlot.MedAdminOID =
              objSlotDetail.AdministrationDetail.MedAdminOID;
            objSlot.ScheduleDTTM = objSlotDetail.ScheduledDTTM;
            objSlot.IsInfusion = this.objAdditionalDetails.IsInfusion;
            objSlot.StatusCode = objSlotDetail.Status.ToUpper();
            objSlot.Status = CommonBB.GetText(
              objSlot.StatusCode,
              this.MedicationAdministrationSlotStatus
            );
            if (
              !String.Equals(
                objSlot.StatusCode,
                CnstSlotStatus.PLANNED,
                StringComparison.InvariantCultureIgnoreCase
              ) &&
              !String.Equals(
                objSlot.StatusCode,
                CnstSlotStatus.HOMELEAVE,
                StringComparison.InvariantCultureIgnoreCase
              ) &&
              objSlotDetail.AdministrationDetail.IsDuringHomeLeave
            ) {
              objSlot.SlotStatus =
                objSlot.Status + Resource.medsadmindetails.DuringHomeLeave;
            } else {
              objSlot.SlotStatus = objSlot.Status;
            }
            if (this.objAdditionalDetails.IsPGD == '1') {
              let sDuringHomeLeave: string = String.Empty;
              sDuringHomeLeave = objSlotDetail.AdministrationDetail
                .IsDuringHomeLeave
                ? medsadmindetails.DuringHomeLeave
                : String.Empty;
              objSlot.SlotStatus =
                prescribedrugs.PGDGiven + ' ' + sDuringHomeLeave;
            }
            objSlot.DateTimeGiven =
              objSlotDetail.AdministrationDetail.AdministeredDate ==
                DateTime.MinValue
                ? String.Empty
                : objSlotDetail.AdministrationDetail.AdministeredDate.ConvertToUser(
                  (o1) => {
                    this.IsDST;
                  },
                  (o2) => {
                    this.IsAmbiguous = o2;
                  },
                  (o3) => {
                    this.IsInvalid = o3;
                  }
                ).ToDateTimeString(
                  this.IsDST,
                  this.IsAmbiguous,
                  CConstants.LongDateWithoutSecs
                );
            objSlot.EntDoseRecordedBy = objSlotDetail.PreparedBy;
            objSlot.EntDoseRecordedAt =
              objSlotDetail.PreparedAt == DateTime.MinValue
                ? String.Empty
                : objSlotDetail.PreparedAt.ConvertToUser(
                  (o1) => {
                    this.IsDST;
                  },
                  (o2) => {
                    this.IsAmbiguous = o2;
                  },
                  (o3) => {
                    this.IsInvalid = o3;
                  }
                ).ToDateTimeString(
                  this.IsDST,
                  this.IsAmbiguous,
                  CConstants.LongDateWithoutSecs
                );
            if (
              String.Equals(
                objSlotDetail.AdministrationDetail.AdministratorType,
                AdministratorType.PersonalCarer,
                StringComparison.CurrentCultureIgnoreCase
              )
            )
              objSlot.AdministeredBy =
                Resource.MedicationAdministrator.rdbparent_text;
            else if (
              String.Equals(
                objSlotDetail.AdministrationDetail.AdministratorType,
                AdministratorType.Patient,
                StringComparison.CurrentCultureIgnoreCase
              )
            )
              objSlot.AdministeredBy =
                objSlotDetail.AdministrationDetail.AdministratorType;
            else if (
              String.Equals(
                objSlotDetail.AdministrationDetail.AdministratorType,
                AdministratorType.Users,
                StringComparison.CurrentCultureIgnoreCase
              )
            )
              objSlot.AdministeredBy =
                objSlotDetail.AdministrationDetail.AdministeredBy;
            objSlot.IsHistoryExists =
              objSlotDetail.AdministrationDetail.IsHistoryExists;
            objSlot.IsVisible = objSlot.IsHistoryExists
              ? 'Visible'
              : 'Collapsed';
            objSlot.ScheduleOID =
              objSlotDetail.AdministrationDetail.ScheduleOID;
            objSlot.IsEarlyAdministeredModeVisibility =
              objSlotDetail.AdministrationDetail.AdministeredOnTimeMode == 'E'
                ? 'Visible'
                : 'Collapsed';
            objSlot.IsLateAdministeredModeVisibility =
              objSlotDetail.AdministrationDetail.AdministeredOnTimeMode == 'L'
                ? 'Visible'
                : 'Collapsed';
            if (
              objSlotDetail.AdministrationDetail.AdministeredOnTimeMode ==
              'E' ||
              objSlotDetail.AdministrationDetail.AdministeredOnTimeMode == 'L'
            ) {
              objSlot.AdministeredDate =
                objSlotDetail.AdministrationDetail.AdministeredDate;
            }
            objSlot.DoseDiscrepancyVisibility =
              objSlotDetail.AdministrationDetail.DoseDiscrepancyExists == 1
                ? 'Visible'
                : 'Collapsed';
            if (
              String.Compare(
                objSlotDetail.Status,
                CnstSlotStatus.NOTGIVEN,
                StringComparison.CurrentCultureIgnoreCase
              ) == 0 ||
              String.Compare(
                objSlotDetail.Status,
                CnstSlotStatus.NOTKNOWN,
                StringComparison.CurrentCultureIgnoreCase
              ) == 0 ||
              String.Equals(
                objSlotDetail.Status,
                CnstSlotStatus.DEFERDUE,
                StringComparison.CurrentCultureIgnoreCase
              ) ||
              String.Equals(
                objSlotDetail.Status,
                CnstSlotStatus.DEFEROVERDUE,
                StringComparison.CurrentCultureIgnoreCase
              ) ||
              String.Equals(
                objSlotDetail.Status,
                CnstSlotStatus.DEFERADMINISTRATION,
                StringComparison.CurrentCultureIgnoreCase
              )
            ) {
              objSlot.Dose = String.Empty;
              objSlot.DateTimeGiven = String.Empty;
              objSlot.IsEarlyAdministeredModeVisibility = CConstants.Collapsed;
              objSlot.IsLateAdministeredModeVisibility = CConstants.Collapsed;
              objSlot.DoseDiscrepancyVisibility = CConstants.Collapsed;
              if (
                objSlotDetail.AdministrationDetail != null &&
                !String.IsNullOrEmpty(
                  objSlotDetail.AdministrationDetail.RecordedBy
                )
              ) {
                if (objSlot.AdminListDet == null)
                  objSlot.AdminListDet = new AdminListDetails();
                objSlot.RecordedBy =
                  objSlotDetail.AdministrationDetail.RecordedBy;
                objSlot.RecordedAt =
                  objSlotDetail.AdministrationDetail.RecordedAt ==
                    DateTime.MinValue
                    ? String.Empty
                    : objSlotDetail.AdministrationDetail.RecordedAt.ConvertToUser(
                      (o1) => {
                        this.IsDST;
                      },
                      (o2) => {
                        this.IsAmbiguous = o2;
                      },
                      (o3) => {
                        this.IsInvalid = o3;
                      }
                    ).ToDateTimeString(
                      this.IsDST,
                      this.IsAmbiguous,
                      CConstants.LongDateWithoutSecs
                    );
                objSlot.AdminListDet.RecordedByValue =
                  objSlotDetail.AdministrationDetail.RecordedBy;
                objSlot.AdminListDet.RecordedAtValue =
                  objSlotDetail.AdministrationDetail.RecordedAt ==
                    DateTime.MinValue
                    ? String.Empty
                    : objSlotDetail.AdministrationDetail.RecordedAt.ConvertToUser(
                      (o1) => {
                        this.IsDST;
                      },
                      (o2) => {
                        this.IsAmbiguous = o2;
                      },
                      (o3) => {
                        this.IsInvalid = o3;
                      }
                    ).ToDateTimeString(
                      this.IsDST,
                      this.IsAmbiguous,
                      CConstants.LongDateWithoutSecs
                    );
              }
            }
            if (
              String.Equals(
                objSlotDetail.Status,
                CnstSlotStatus.PATIENTSELFADMINISTERING,
                StringComparison.CurrentCultureIgnoreCase
              ) &&
              objSlotDetail.AdministrationDetail != null &&
              !String.IsNullOrEmpty(
                objSlotDetail.AdministrationDetail.RecordedBy
              )
            ) {
              if (objSlot.AdminListDet == null)
                objSlot.AdminListDet = new AdminListDetails();
              objSlot.RecordedBy =
                objSlotDetail.AdministrationDetail.RecordedBy;
              objSlot.RecordedAt =
                objSlotDetail.AdministrationDetail.RecordedAt ==
                  DateTime.MinValue
                  ? String.Empty
                  : objSlotDetail.AdministrationDetail.RecordedAt.ConvertToUser(
                    (o1) => {
                      this.IsDST;
                    },
                    (o2) => {
                      this.IsAmbiguous = o2;
                    },
                    (o3) => {
                      this.IsInvalid = o3;
                    }
                  ).ToDateTimeString(
                    this.IsDST,
                    this.IsAmbiguous,
                    CConstants.LongDateWithoutSecs
                  );
              objSlot.AdminListDet.RecordedByValue =
                objSlotDetail.AdministrationDetail.RecordedBy;
              objSlot.AdminListDet.RecordedAtValue =
                objSlotDetail.AdministrationDetail.RecordedAt ==
                  DateTime.MinValue
                  ? String.Empty
                  : objSlotDetail.AdministrationDetail.RecordedAt.ConvertToUser(
                    (o1) => {
                      this.IsDST;
                    },
                    (o2) => {
                      this.IsAmbiguous = o2;
                    },
                    (o3) => {
                      this.IsInvalid = o3;
                    }
                  ).ToDateTimeString(
                    this.IsDST,
                    this.IsAmbiguous,
                    CConstants.LongDateWithoutSecs
                  );
            }
            if (objSlot.IsInfusion) {
              objSlot.DateTimeGiven =
                objSlotDetail.AdministrationDetail.AdministeredDate ==
                  DateTime.MinValue
                  ? String.Empty
                  : objSlotDetail.AdministrationDetail.AdministeredDate.ConvertToUser(
                    (o1) => {
                      this.IsDST;
                    },
                    (o2) => {
                      this.IsAmbiguous = o2;
                    },
                    (o3) => {
                      this.IsInvalid = o3;
                    }
                  ).ToDateTimeString(
                    this.IsDST,
                    this.IsAmbiguous,
                    CConstants.LongDateWithoutSecs
                  );
              if (
                this.objAdditionalDetails != null &&
                this.objAdditionalDetails.IsPGD != '1' &&
                !this.objAdditionalDetails.IsInfusion
              ) {
                if (
                  String.Compare(
                    objSlotDetail.Status.ToUpper(),
                    CnstSlotStatus.STOPPED,
                    StringComparison.CurrentCultureIgnoreCase
                  ) == 0 ||
                  String.Compare(
                    objSlotDetail.Status.ToUpper(),
                    CnstSlotStatus.COMPLETED,
                    StringComparison.CurrentCultureIgnoreCase
                  ) == 0
                ) {
                  objSlot.DateTimeGiven =
                    objSlotDetail.AdministrationDetail.AdministeredDate.ConvertToUser(
                      (o1) => {
                        this.IsDST = o1;
                      },
                      (o2) => {
                        this.IsAmbiguous = o2;
                      },
                      (o3) => {
                        this.IsInvalid = o3;
                      }
                    ).ToDateTimeString(
                      this.IsDST,
                      this.IsAmbiguous,
                      CConstants.LongDateWithoutSecs
                    ) +
                    ' - ' +
                    Environment.NewLine +
                    objSlotDetail.AdministrationDetail.InfusionEndDate.ConvertToUser(
                      (o1) => {
                        this.IsDST = o1;
                      },
                      (o2) => {
                        this.IsAmbiguous = o2;
                      },
                      (o3) => {
                        this.IsInvalid = o3;
                      }
                    ).ToDateTimeString(
                      this.IsDST,
                      this.IsAmbiguous,
                      CConstants.LongDateWithoutSecs
                    );
                }
              }
              if (
                String.Compare(
                  objSlotDetail.Status.ToUpper(),
                  CnstSlotStatus.DEFERADMINISTRATION,
                  StringComparison.CurrentCultureIgnoreCase
                ) == 0 ||
                String.Compare(
                  objSlotDetail.Status.ToUpper(),
                  CnstSlotStatus.NOTGIVEN,
                  StringComparison.CurrentCultureIgnoreCase
                ) == 0 ||
                String.Compare(
                  objSlotDetail.Status.ToUpper(),
                  CnstSlotStatus.PLANNED,
                  StringComparison.CurrentCultureIgnoreCase
                ) == 0 ||
                String.Equals(
                  objSlotDetail.Status,
                  CnstSlotStatus.DEFERDUE,
                  StringComparison.CurrentCultureIgnoreCase
                ) ||
                String.Equals(
                  objSlotDetail.Status,
                  CnstSlotStatus.DEFEROVERDUE,
                  StringComparison.CurrentCultureIgnoreCase
                ) ||
                String.Equals(
                  objSlotDetail.Status,
                  CnstSlotStatus.NOTKNOWN,
                  StringComparison.CurrentCultureIgnoreCase
                )
              ) {
                objSlot.DateTimeGiven = String.Empty;
                objSlot.Dose = String.Empty;
              }
              if (
                this.DrugDetails != null &&
                this.DrugDetails.InfusionDetails != null &&
                (String.Compare(
                  this.DrugDetails.InfusionDetails.InfusionType.Value,
                  InfusionTypeCode.CONTINUOUS,
                  StringComparison.OrdinalIgnoreCase
                ) == 0 ||
                  String.Compare(
                    this.DrugDetails.InfusionDetails.InfusionType.Value,
                    InfusionTypeCode.SINGLEDOSEVOLUME,
                    StringComparison.OrdinalIgnoreCase
                  ) == 0 ||
                  String.Compare(
                    this.DrugDetails.InfusionDetails.InfusionType.Value,
                    InfusionTypeCode.FLUID,
                    StringComparison.OrdinalIgnoreCase
                  ) == 0 ||
                  String.Compare(
                    this.DrugDetails.InfusionDetails.InfusionType.Value,
                    InfusionTypeCode.PCA,
                    StringComparison.OrdinalIgnoreCase
                  ) == 0 ||
                  String.Compare(
                    this.DrugDetails.ItemSubType,
                    DrugItemSubTypeCode.MEDICAL_GAS,
                    StringComparison.CurrentCultureIgnoreCase
                  ) == 0)
              ) {
                objSlot.Dose = String.Empty;
              }
              if (
                objSlotDetail.AdministrationDetail != null &&
                String.Equals(
                  objSlot.Status,
                  CnstSlotStatus.NOTKNOWN,
                  StringComparison.CurrentCultureIgnoreCase
                )
              ) {
                objSlot.RecordedBy =
                  objSlotDetail.AdministrationDetail.RecordedBy;
                if (
                  objSlotDetail.AdministrationDetail.RecordedAt !=
                  DateTime.MinValue
                ) {
                  objSlot.RecordedAt =
                    objSlotDetail.AdministrationDetail.RecordedAt ==
                      DateTime.MinValue
                      ? String.Empty
                      : objSlotDetail.AdministrationDetail.RecordedAt.ConvertToUser(
                        (o1) => {
                          this.IsDST;
                        },
                        (o2) => {
                          this.IsAmbiguous = o2;
                        },
                        (o3) => {
                          this.IsInvalid = o3;
                        }
                      ).ToDateTimeString(
                        this.IsDST,
                        this.IsAmbiguous,
                        CConstants.LongDateWithoutSecs
                      );
                }
              }
              if (
                objSlotDetail.AdministrationDetail != null &&
                !String.IsNullOrEmpty(
                  objSlotDetail.AdministrationDetail.RecordedBy
                ) &&
                objSlotDetail.AdministrationDetail.RecordedBy.Equals('LORENZO')
              ) {
                if (objSlot.AdminListDet == null)
                  objSlot.AdminListDet = new AdminListDetails();
                objSlot.AdminListDet.RecordedByValue =
                  objSlotDetail.AdministrationDetail.RecordedBy;
                objSlot.AdminListDet.RecordedAtValue =
                  objSlotDetail.AdministrationDetail.RecordedAt ==
                    DateTime.MinValue
                    ? String.Empty
                    : objSlotDetail.AdministrationDetail.RecordedAt.ConvertToUser(
                      (o1) => {
                        this.IsDST;
                      },
                      (o2) => {
                        this.IsAmbiguous = o2;
                      },
                      (o3) => {
                        this.IsInvalid = o3;
                      }
                    ).ToDateTimeString(
                      this.IsDST,
                      this.IsAmbiguous,
                      CConstants.LongDateWithoutSecs
                    );
              }
            }
            if (
              String.Equals(
                objSlotDetail.Status,
                CnstSlotStatus.OMITTED,
                StringComparison.CurrentCultureIgnoreCase
              )
            ) {
              objSlot.DateTimeGiven = String.Empty;
            }
            lstTemp.Add(objSlot);
          }
          this.AdminList = lstTemp;

          this.getdata.emit(true);
        }
      } catch (ex: any) {
        let lnReturn: number = AMSHelper.PublicExceptionDetails(
          _ErrorID,
          _ErrorSource,
          ex
        );
      }
    } else {
      let lnReturn: number = AMSHelper.PublicExceptionDetails(
        _ErrorID,
        _ErrorSource,
        e.Error
      );
    }
  }

  public ClinicalVerHistLink_Click(): void {
    let oclinverhislink: ClinicalVerhislink = new ClinicalVerhislink();
    oclinverhislink.constructorImpl(this.lPrescriptionItemOID, this.MCVersion)
    AppActivity.OpenWindow("Clinical verification history", oclinverhislink, (s, e) => { this.oclinverhislink_closed(s); }, "", false, 450, 600, false, WindowButtonType.Close, null);
  }
  oclinverhislink_closed(args: AppDialogEventargs): void {
    let oAppDialogWindow = args.AppChildWindow as ChildWindow;
    oAppDialogWindow.DialogResult = true;
    // args.AppChildWindow.DialogResult = true;
  }
  isOnbehalfOfLaunched: boolean = false;
  public OnBehalfOfLink_Click(): void {
    if (!this.isOnbehalfOfLaunched) {
      this.isOnbehalfOfLaunched = true;
      let oonbehalflink: OnBehalfOflink = new OnBehalfOflink();
      oonbehalflink.constructorImpl(this.lPrescriptionItemOID);
      AppActivity.OpenWindow("On behalf of history", oonbehalflink, (s, e) => { this.oonbehalflink_closed(s); }, "", false, 350, 726, false, WindowButtonType.Close, null);

    }
  }
  oonbehalflink_closed(args: AppDialogEventargs): void {
    this.isOnbehalfOfLaunched = false;
    let oAppDialogWindow = args.AppChildWindow as ChildWindow;
    oAppDialogWindow.DialogResult = true;
    // args.AppChildWindow.DialogResult = true;
  }

  public PresModifyHistoryLink_Click(): void {
    let ohislink: PresItemModificationHistory = new PresItemModificationHistory();
    ohislink.constructorImpl(this.lPrescriptionItemOID, this);
    AppActivity.OpenWindow("Medication update history", ohislink, (s, e) => { this.presModifyHistory_closed(s); }, "", false, 460, 820, false, WindowButtonType.Close, null);
  }

  presModifyHistory_closed(args: AppDialogEventargs): void {
    let oAppDialogWindow = args.AppChildWindow as ChildWindow;
    oAppDialogWindow.DialogResult = true;
    // args.AppChildWindow.DialogResult = true;
  }
  public GetAdministrationDetails(
    MedAdminOID: number,
    sEntDoseRecordedAt: string,
    sEntDoseRecordedBy: string
  ): void {
    if (
      String.Equals(
        this.SelectedSlot.StatusCode,
        CnstSlotStatus.HOMELEAVE,
        StringComparison.InvariantCultureIgnoreCase
      )
    ) {
      this.SelectedSlot.AdminListDet = new AdminListDetails();
      this.SelectedSlot.AdminListDet.RecordedAtValue = String.Empty;
      this.SelectedSlot.AdminListDet.RecordedByValue = String.Empty;
      this.UpdateFauxTabDataContext('Administration');
    } else if (MedAdminOID > 0) {
      let oServiceProxy: MedicationMgmt.MedicationAdministrationWSSoapClient =
        new MedicationMgmt.MedicationAdministrationWSSoapClient();
      oServiceProxy.GetAdministrationListDetailsCompleted = (s, e) => {
        this.objMedicationAdministrationProxy_GetAdministrationListDetailsCompleted(
          s,
          e
        );
      };
      let objReqAdministrationDet: MedicationMgmt.CReqMsgGetAdministrationListDetails =
        new MedicationMgmt.CReqMsgGetAdministrationListDetails();
      objReqAdministrationDet.MedAdminOIDBC = MedAdminOID;
      objReqAdministrationDet.oContextInformation = CommonBB.FillContext();
      oServiceProxy.GetAdministrationListDetailsAsync(objReqAdministrationDet);
    } else {
      if (
        !String.IsNullOrEmpty(sEntDoseRecordedAt) &&
        !String.IsNullOrEmpty(sEntDoseRecordedBy)
      ) {
        this.SelectedSlot.AdminListDet = new AdminListDetails();
        this.SelectedSlot.AdminListDet.RecordedAtValue = sEntDoseRecordedAt;
        this.SelectedSlot.AdminListDet.RecordedByValue = sEntDoseRecordedBy;
        this.UpdateFauxTabDataContext('Administration');
      }
    }
  }
  public objMedicationAdministrationProxy_GetAdministrationListDetailsCompleted(
    sender: Object,
    e: MedicationMgmt.GetAdministrationListDetailsCompletedEventArgs
  ): void {
    let _ErrorID: number = 80000118;
    let _ErrorSource: string =
      'LorAppMedicationCommonBB.dll, Class:Prescriptionitemdetailsvm, Method:objMedicationAdministrationProxy_GetAdministrationListDetailsCompleted()';
    if (e.Error == null && e.Result != null) {
      try {
        this.SelectedSlot.AdminListDet = new AdminListDetails();
        let objResAdministrationDet: MedicationMgmt.CResMsgGetAdministrationListDetails =
          e.Result;
        if (
          objResAdministrationDet.oSlotDetails != null &&
          objResAdministrationDet.oSlotDetails != null &&
          objResAdministrationDet.oSlotDetails.Count > 0 &&
          objResAdministrationDet.oSlotDetails[0] != null
        ) {
          let nLen: number = objResAdministrationDet.oSlotDetails.Count;
          for (let i: number = 0; i < nLen; i++) {
            this.SelectedSlot.AdminListDet.Route =
              objResAdministrationDet.oSlotDetails[
                i
              ].AdministrationDetail.Route;
            this.SelectedSlot.AdminListDet.SiteName =
              objResAdministrationDet.oSlotDetails[i].AdministrationDetail.Site;
            this.SelectedSlot.AdminListDet.WitnessedBy =
              objResAdministrationDet.oSlotDetails[
                i
              ].AdministrationDetail.WitnessedBy;
            this.SelectedSlot.AdminListDet.RecordedByValue =
              objResAdministrationDet.oSlotDetails[
                i
              ].AdministrationDetail.RecordedBy;
            this.SelectedSlot.AdminListDet.DrugType =
              objResAdministrationDet.oSlotDetails[i].DoseUOM;
              this.SelectedSlot.AdminListDet.RecordedAtValue =
                objResAdministrationDet.oSlotDetails[i].AdministrationDetail
                  .RecordedAt == DateTime.MinValue
                  ? String.Empty
                  : objResAdministrationDet.oSlotDetails[
                    i
                  ].AdministrationDetail.RecordedAt.ConvertToUser(
                    (o) => {this.IsDST = o},
                    (o2) => {
                      this.IsAmbiguous = o2;
                    },
                    (o3) => {
                      this.IsInvalid = o3;
                    }
                  ).ToDateTimeString(
                    this.IsDST,
                    this.IsAmbiguous,
                    CConstants.LongDateWithoutSecs
                  );
            this.SelectedSlot.AdminListDet.AdministeredByValue =
              objResAdministrationDet.oSlotDetails[
                i
              ].AdministrationDetail.AdministeredBy;
            this.SelectedSlot.AdminListDet.RelationValue = String.Empty;
            if (
              String.Equals(
                objResAdministrationDet.oSlotDetails[i].AdministrationDetail
                  .AdministratorType,
                'PersonalCarer',
                StringComparison.CurrentCultureIgnoreCase
              ) &&
              objResAdministrationDet.oSlotDetails[i].AdministrationDetail
                .AdminByPersonalCarerOID > 0
            ) {
              if (
                this.personalCarers != null &&
                this.personalCarers.Count > 0
              ) {
                let relationCode: string = this.personalCarers
                  .Where(
                    (c) =>
                      c.Value ==
                      objResAdministrationDet.oSlotDetails[
                        i
                      ].AdministrationDetail.AdminByPersonalCarerOID.ToString()
                  )
                  .Select((s) => s.Tag)
                  .FirstOrDefault()
                  .ToString();
                if (!String.IsNullOrEmpty(relationCode)) {
                  if (
                    this.resolvedConceptCodes != null &&
                    this.resolvedConceptCodes.Count > 0
                  ) {
                    this.SelectedSlot.AdminListDet.RelationValue =
                      this.resolvedConceptCodes
                        .Where((c) => c.csCode == relationCode)
                        .Select((s) => s.csDescription)
                        .FirstOrDefault()
                        .ToString();
                  }
                }
              }
            }
            this.SelectedSlot.AdminListDet.BatchNumber =
              objResAdministrationDet.oSlotDetails[
                i
              ].AdministrationDetail.BatchNumber;
              this.SelectedSlot.AdminListDet.ExpiryDate =
                objResAdministrationDet.oSlotDetails[i].AdministrationDetail
                  .ExpiryDate == DateTime.MinValue
                  ? String.Empty
                  : objResAdministrationDet.oSlotDetails[
                    i
                  ].AdministrationDetail.ExpiryDate.ConvertToUser(
                    (o) => {this.IsDST=o},
                    (o2) => {
                      this.IsAmbiguous = o2;
                    },
                    (o3) => {
                      this.IsInvalid = o3;
                    }
                  ).ToDateTimeString(
                    this.IsDST,
                    this.IsAmbiguous,
                    CConstants.ShortDateFormat
                  );
            this.SelectedSlot.AdminListDet.DoseDiscReasonCode =
              CommonBB.GetText(
                objResAdministrationDet.oSlotDetails[i].AdministrationDetail
                  .DoseDiscReasonCode,
                this.DoseDiscrepancyConceptCodes
              );
            let sAdminReasonCode: string =
              objResAdministrationDet.oSlotDetails[i].AdministrationDetail
                .AdminReasonCode;
            this.SelectedSlot.AdminListDet.AdminReasonCode = CommonBB.GetText(
              sAdminReasonCode,
              this.AllReasonConceptCodes
            );
            this.SelectedSlot.AdminListDet.AdminComments =
              objResAdministrationDet.oSlotDetails[
                i
              ].AdministrationDetail.AdminComments;
            this.SelectedSlot.AdminListDet.DoseDiscComments =
              objResAdministrationDet.oSlotDetails[
                i
              ].AdministrationDetail.DoseDiscComments;
            if (
              !String.IsNullOrEmpty(
                objResAdministrationDet.oSlotDetails[
                  i
                ].AdministrationDetail.InfusionPeriodforMedAdmin.ToString()
              ) &&
              !String.IsNullOrEmpty(
                objResAdministrationDet.oSlotDetails[i].AdministrationDetail
                  .InfusionPeriodUOMforMedAdmin.UOMName
              )
            ) {
              this.SelectedSlot.AdminListDet.InfusionPeriodValue =
                objResAdministrationDet.oSlotDetails[
                  i
                ].AdministrationDetail.InfusionPeriodforMedAdmin.ToString() +
                ' ' +
                objResAdministrationDet.oSlotDetails[i].AdministrationDetail
                  .InfusionPeriodUOMforMedAdmin.UOMName;
            }
            if (
              !String.IsNullOrEmpty(
                objResAdministrationDet.oSlotDetails[i].AdministrationDetail
                  .ConcentrationStrength
              ) &&
              !String.IsNullOrEmpty(
                objResAdministrationDet.oSlotDetails[i].AdministrationDetail
                  .ConcentrationStrengthUOM.UOMName
              ) &&
              !String.IsNullOrEmpty(
                objResAdministrationDet.oSlotDetails[i].AdministrationDetail
                  .ConcentrationVolume
              ) &&
              !String.IsNullOrEmpty(
                objResAdministrationDet.oSlotDetails[i].AdministrationDetail
                  .ConcentrationVolumeUOM.UOMName
              )
            ) {
              this.SelectedSlot.AdminListDet.ConcentrationValue =
                objResAdministrationDet.oSlotDetails[i].AdministrationDetail
                  .ConcentrationStrength +
                CConstants.sspace +
                objResAdministrationDet.oSlotDetails[i].AdministrationDetail
                  .ConcentrationStrengthUOM.UOMName +
                '/' +
                objResAdministrationDet.oSlotDetails[i].AdministrationDetail
                  .ConcentrationVolume +
                CConstants.sspace +
                objResAdministrationDet.oSlotDetails[i].AdministrationDetail
                  .ConcentrationVolumeUOM.UOMName;
            }
            this.SelectedSlot.AdminListDet.IsMedScannedProduct =
              objResAdministrationDet.oSlotDetails[
                i
              ].AdministrationDetail.IsMedScannedProduct;
            this.SelectedSlot.MedAdminHistoryOID =
              objResAdministrationDet.oSlotDetails[
                i
              ].AdministrationDetail.MedAdminHistoryOID;
            if (
              (String.Equals(
                this.SelectedSlot.StatusCode,
                CnstSlotStatus.GIVEN,
                StringComparison.CurrentCultureIgnoreCase
              ) ||
                String.Equals(
                  this.SelectedSlot.StatusCode,
                  CnstSlotStatus.SELFADMINISTERED,
                  StringComparison.CurrentCultureIgnoreCase
                )) &&
              this.SelectedSlot.AdminListDet.IsMedScannedProduct == '1'
            ) {
              this.SelectedSlot.AdminListDet.IsViewRecMedLinkExists =
                Visibility.Visible;
            } else {
              this.SelectedSlot.AdminListDet.IsViewRecMedLinkExists =
                Visibility.Collapsed;
            }
          }
          this.UpdateFauxTabDataContext('Administration');
        } else if (
          this.SelectedSlot != null &&
          String.Compare(
            this.SelectedSlot.Status.ToUpper(),
            CnstSlotStatus.NOTKNOWN,
            StringComparison.CurrentCultureIgnoreCase
          ) == 0
        ) {
          this.SelectedSlot.AdminListDet.RecordedByValue =
            this.SelectedSlot.RecordedBy;
          this.SelectedSlot.AdminListDet.RecordedAtValue =
            this.SelectedSlot.RecordedAt;
          this.UpdateFauxTabDataContext('Administration');
        }
      } catch (ex: any) {
        let lnReturn: number = AMSHelper.PublicExceptionDetails(
          _ErrorID,
          _ErrorSource,
          ex
        );
      }
    } else {
      let lnReturn: number = AMSHelper.PublicExceptionDetails(
        _ErrorID,
        _ErrorSource,
        e.Error
      );
    }
  }
  public GetAdditionalDetails(lPrecriptionoid: number): void {
    let objReqAdditional: IPPManagePrescSer.CReqMsgGetAdditionalDetails =
      new IPPManagePrescSer.CReqMsgGetAdditionalDetails();
    objReqAdditional.PrescriptionItemOIDBC = lPrecriptionoid;
    objReqAdditional.oContextInformation = CommonBB.FillContext();
    this.objIPPManagePresServiceProxy.GetAdditionalDetailsAsync(
      objReqAdditional
    );
  }
  private objManagePrescriptionServiceProxy_GetAdditionalDetailsCompleted(
    sender: Object,
    e: IPPManagePrescSer.GetAdditionalDetailsCompletedEventArgs
  ): void {
    let _ErrorID: number = 80000114;
    let _ErrorSource: string =
      'LorAppMedicationCommonBB.dll, Class:Prescriptionitemdetailsvm, Method:objManagePrescriptionServiceProxy_GetAdditionalDetailsCompleted()';
    if (e.Error == null) {
      try {
        let objResAdditional: IPPManagePrescSer.CResMsgGetAdditionalDetails =
          e.Result;
        let oMedAdditionalDetails: MedicationAdditionalDetails =
          new MedicationAdditionalDetails();
        if (
          objResAdditional instanceof
          IPPManagePrescSer.CResMsgGetAdditionalDetails &&
          objResAdditional.oPrescriptionItemView instanceof
          IPPManagePrescSer.PrescriptionItemView
        ) {
          this.fillDataContext(objResAdditional.oPrescriptionItemView);
        }
      } catch (ex: any) {
        let lnReturn: number = AMSHelper.PublicExceptionDetails(
          _ErrorID,
          _ErrorSource,
          ex
        );
      }
    } else {
      let lnReturn: number = AMSHelper.PublicExceptionDetails(
        _ErrorID,
        _ErrorSource,
        e.Error
      );
    }
  }
  private fillDataContext(
    item:
      | IPPManagePrescSer.PrescriptionItemView
      | ManagePrescSer.CResMsgGetDoseDetails
      | ObservableCollection<ManagePrescSer.WarningDetails>
      | IPPManagePrescSer.CResMsgGetDrugDetails
      | ManagePrescSer.CResMsgGetTechnicalDetails
  ) {
    if (item instanceof IPPManagePrescSer.PrescriptionItemView) {
      this.fillDataContext1(item);
    } else if (item instanceof ManagePrescSer.CResMsgGetDoseDetails) {
      this.fillDataContext2(item);
    } else if (
      item instanceof (ObservableCollection<ManagePrescSer.WarningDetails> as typeof ObservableCollection<ManagePrescSer.WarningDetails>)
    ) {
      this.fillDataContext3(item);
    } else if (item instanceof IPPManagePrescSer.CResMsgGetDrugDetails) {
      this.fillDataContext4(item);
    } else if (item instanceof ManagePrescSer.CResMsgGetTechnicalDetails) {
      this.fillDataContext5(item);
    }
  }
  private fillDataContext1(
    oPrescriptionItemView: IPPManagePrescSer.PrescriptionItemView
  ): void {
    let isAddlObjNull: boolean = true;
    if (this.oAdditionalDetails == null)
      this.objAdditionalDetails = new MedicationAdditionalDetails();
    if (this.oDrugDetailsData == null)
      this.objDrugDetailsData = new DrugDetailsData();
    if (oPrescriptionItemView != null) {
      let nonFormularyDesc: string = String.Empty;
      let PrepStatusDesc: string = String.Empty;
      let nonFormularyMCI: string = String.Empty;
      if (oPrescriptionItemView.oPresItemAdditionalProperties != null)
        isAddlObjNull = false;
      this.objAdditionalDetails.NonFormulary = 'NA';
      if (
        oPrescriptionItemView.oPrescriptionItem != null &&
        oPrescriptionItemView.oPrescriptionItem.IsNonformulary == '1'
      ) {
        this.objAdditionalDetails.Formulary = 'Yes';
        this.objAdditionalDetails.DrugType = CConstants.Fordrug;
      } else {
        this.objAdditionalDetails.Formulary = 'No';
        if (
          oPrescriptionItemView != null &&
          oPrescriptionItemView.oPresItemAdditionalProperties != null &&
          oPrescriptionItemView.oPresItemAdditionalProperties
            .NonFormularyReason != null
        ) {
          if (
            this.IsConceptCodeExists(
              oPrescriptionItemView.oPresItemAdditionalProperties
                .NonFormularyReason,
              this.NonFormularyReasonConceptCodes,
              (o) => {
                nonFormularyDesc = o;
              }
            )
            ||
            this.IsConceptCodeExists(
              oPrescriptionItemView.oPresItemAdditionalProperties
                .NonFormularyReason,
              this.NONCatalogueReasons,
              (o) => {
                nonFormularyDesc = o;
              }
            )
          )
            this.objAdditionalDetails.NonFormulary = nonFormularyDesc;
        }
        this.objAdditionalDetails.DrugType = CConstants.NonCatitem;
      }
      if (oPrescriptionItemView.oPrescriptionItem != null)
        this.objAdditionalDetails.IsPGD =
          oPrescriptionItemView.oPrescriptionItem.IsPGD;
      else this.objAdditionalDetails.IsPGD = '0';
      if (
        oPrescriptionItemView.oPresItemAdditionalProperties != null &&
        oPrescriptionItemView.oPresItemAdditionalProperties
          .EndorsementProperties != null
      ) {
        this.objDrugDetailsData.Endorsementprop = String.Empty;
        for (
          let cnt: number = 0;
          cnt <
          oPrescriptionItemView.oPresItemAdditionalProperties
            .EndorsementProperties.Count;
          cnt++
        ) {
          if (this.MedicationEncounterPreparation != null) {
            this.MedicationEncounterPreparation.forEach((oCTerms) => {
              if (
                !String.IsNullOrEmpty(
                  oPrescriptionItemView.oPresItemAdditionalProperties
                    .EndorsementProperties[cnt].Code
                )
              ) {
                if (
                  oCTerms.csCode ==
                  oPrescriptionItemView.oPresItemAdditionalProperties
                    .EndorsementProperties[cnt].Code
                ) {
                  if (
                    String.IsNullOrEmpty(
                      this.objDrugDetailsData.Endorsementprop
                    )
                  ) {
                    this.objDrugDetailsData.Endorsementprop =
                      oCTerms.csDescription;
                  } else {
                    this.objDrugDetailsData.Endorsementprop +=
                      ';' + oCTerms.csDescription;
                  }
                }
              }
            });
          }
        }
      }
      let sPitstcode: string = String.Empty;
      if (oPrescriptionItemView.oPrescriptionItem != null) {
        this.objAdditionalDetails.Specialty =
          oPrescriptionItemView.oPrescriptionItem.Specialty;
        this.objAdditionalDetails.Prescriptionitemnumber =
          oPrescriptionItemView.oPrescriptionItem.PrescriptionItemNumber;
        if (
          String.IsNullOrEmpty(
            oPrescriptionItemView.oPresItemAdditionalProperties.HoldReason
          )
        )
          this.objAdditionalDetails.Prescriptionnumber =
            oPrescriptionItemView.oPrescriptionItem.PrescriptionNumber;
        if (oPrescriptionItemView.oPrescriptionItem.CareProvider != null)
          this.objAdditionalDetails.CareProvider =
            oPrescriptionItemView.oPrescriptionItem.CareProvider.Name;
        if (oPrescriptionItemView.oPrescriptionItem.HealthOrganisation != null)
          this.objAdditionalDetails.healthOrg =
            oPrescriptionItemView.oPrescriptionItem.HealthOrganisation.Name;
      }
      if (oPrescriptionItemView.oPresItemAdditionalProperties != null) {
        if (
          oPrescriptionItemView.oPresItemAdditionalProperties.NoOfInstallments >
          0
        )
          this.objDrugDetailsData.NoInstalments =
            oPrescriptionItemView.oPresItemAdditionalProperties.NoOfInstallments.ToString();
        if (
          oPrescriptionItemView.oPresItemAdditionalProperties
            .IntervalBtwnInstallment.Value > 0
        )
          this.objDrugDetailsData.IntervalInstalments =
            oPrescriptionItemView.oPresItemAdditionalProperties.IntervalBtwnInstallment.Value.ToString() +
            ' ' +
            oPrescriptionItemView.oPresItemAdditionalProperties
              .IntervalBtwnInstallment.UOMName;
        if (
          oPrescriptionItemView.oPresItemAdditionalProperties.StationeryType !=
          null
        )
          this.objDrugDetailsData.StationryType =
            oPrescriptionItemView.oPresItemAdditionalProperties.StationeryType.Name;
        if (
          oPrescriptionItemView.oPresItemAdditionalProperties.HoldReason != null
        )
          this.objAdditionalDetails.ReasonForHold =
            oPrescriptionItemView.oPresItemAdditionalProperties.HoldReason;
        if (
          oPrescriptionItemView.oPresItemAdditionalProperties
            .NonFormComponentItems != null
        ) {
          this.objAdditionalDetails.NonFormCompItems =
            oPrescriptionItemView.oPresItemAdditionalProperties.NonFormComponentItems;
          if (
            oPrescriptionItemView.oPresItemAdditionalProperties
              .NonFormComponents != null
          ) {
            if (
              this.IsConceptCodeExists(
                oPrescriptionItemView.oPresItemAdditionalProperties
                  .NonFormComponents,
                this.NonFormularyReasonConceptCodes,
                (o) => {
                  nonFormularyMCI = o;
                }
              )
            )
              this.objAdditionalDetails.NonFormComponents =
                this.objAdditionalDetails.NonFormCompItems +
                '\n' +
                'Reason : ' +
                nonFormularyMCI;
            if (
              oPrescriptionItemView.oPresItemAdditionalProperties
                .NonFormComponents == 'CC_OTHER'
            )
              this.objAdditionalDetails.NonFormComponents =
                this.objAdditionalDetails.NonFormComponents +
                ' - ' +
                oPrescriptionItemView.oPresItemAdditionalProperties
                  .NonFormCompReason;
          }
        } else {
          this.objAdditionalDetails.NonFormComponents = String.Empty;
        }
        if (
          oPrescriptionItemView.oPresItemAdditionalProperties != null &&
          oPrescriptionItemView.oPresItemAdditionalProperties
            .InstalmentInstructions != null
        ) {
          this.objDrugDetailsData.Insinstruction = String.Empty;
          for (
            let cnt: number = 0;
            cnt <
            oPrescriptionItemView.oPresItemAdditionalProperties
              .InstalmentInstructions.Count;
            cnt++
          ) {
            if (this.InstallInstruction != null) {
              this.InstallInstruction.forEach((oCTerms) => {
                if (
                  !String.IsNullOrEmpty(
                    oPrescriptionItemView.oPresItemAdditionalProperties
                      .InstalmentInstructions[cnt].Code
                  )
                ) {
                  if (
                    oCTerms.csCode ==
                    oPrescriptionItemView.oPresItemAdditionalProperties
                      .InstalmentInstructions[cnt].Code
                  ) {
                    if (
                      String.IsNullOrEmpty(
                        this.objDrugDetailsData.Insinstruction
                      )
                    ) {
                      this.objDrugDetailsData.Insinstruction =
                        oCTerms.csDescription;
                    } else {
                      this.objDrugDetailsData.Insinstruction +=
                        ';' + oCTerms.csDescription;
                    }
                  }
                }
              });
            }
          }
        }
        if (
          oPrescriptionItemView.oPresItemAdditionalProperties
            .SupplyInsChildExists != null &&
          oPrescriptionItemView.oPresItemAdditionalProperties
            .SupplyInsChildExists == '0'
        )
          this.objAdditionalDetails.IsSupDispInstforCompo = false;
        else this.objAdditionalDetails.IsSupDispInstforCompo = true;
        if (!isAddlObjNull) {
          let strBatch: string =
            oPrescriptionItemView.oPresItemAdditionalProperties.BatchNumber;
          if (
            oPrescriptionItemView.oPresItemAdditionalProperties.ExpiryDate !=
            null &&
            DateTime.NotEquals(oPrescriptionItemView.oPresItemAdditionalProperties.ExpiryDate,
            DateTime.MinValue) &&
            String.Compare(
              oPrescriptionItemView.oPresItemAdditionalProperties.BatchNumber,
              String.Empty
            ) != 0
          )
            strBatch =
              strBatch +
              ' , ' +
              oPrescriptionItemView.oPresItemAdditionalProperties.ExpiryDate.ConvertToUser(
                (o1) => {
                  this.IsDST = o1;
                },
                (o2) => {
                  this.IsAmbiguous = o2;
                },
                (o3) => {
                  this.IsInvalid = o3;
                }
              ).ToString(CConstants.ShortDateFormat);
          else if (
            oPrescriptionItemView.oPresItemAdditionalProperties.ExpiryDate !=
            null &&
            DateTime.NotEquals(oPrescriptionItemView.oPresItemAdditionalProperties.ExpiryDate,
            DateTime.MinValue) &&
            String.Compare(
              oPrescriptionItemView.oPresItemAdditionalProperties.BatchNumber,
              String.Empty
            ) == 0
          )
            strBatch =
              oPrescriptionItemView.oPresItemAdditionalProperties.ExpiryDate.ConvertToUser(
                (o1) => {
                  this.IsDST = o1;
                },
                (o2) => {
                  this.IsAmbiguous = o2;
                },
                (o3) => {
                  this.IsInvalid = o3;
                }
              ).ToString(CConstants.ShortDateFormat);
          this.objAdditionalDetails.Batch = strBatch;
        }
      }
      if (oPrescriptionItemView.oPresItemBasicPropertiesView != null) {
        if (
          oPrescriptionItemView.oPresItemBasicPropertiesView
            .DispensingInstruction != null &&
          oPrescriptionItemView.oPresItemBasicPropertiesView
            .DispensingInstruction.Count > 0
        ) {
          let nTotDis: number =
            oPrescriptionItemView.oPresItemBasicPropertiesView
              .DispensingInstruction.Count;
          this.objDrugDetailsData.DisInstruction = String.Empty;
          for (let ndln: number = 0; ndln < nTotDis; ndln++) {
            if (ndln == nTotDis - 1) {
              let desc: string = String.Empty;
              if (
                String.Compare(
                  oPrescriptionItemView.oPresItemBasicPropertiesView
                    .DispensingInstruction[ndln].Code,
                  'CC_OTHER'
                ) == 0 &&
                !String.IsNullOrEmpty(
                  oPrescriptionItemView.oPresItemBasicPropertiesView
                    .OtherDispensingInstruction
                )
              )
                this.objDrugDetailsData.DisInstruction +=
                  oPrescriptionItemView.oPresItemBasicPropertiesView.OtherDispensingInstruction;
              else if (
                this.IsConceptCodeExists(
                  oPrescriptionItemView.oPresItemBasicPropertiesView
                    .DispensingInstruction[ndln].Code,
                  this.ConceptCodedispense,
                  (o) => {
                    desc = o;
                  }
                )
              )
                this.objDrugDetailsData.DisInstruction += desc;
              else if (
                MedicationCommonConceptCodeData.ViewConceptCodes != null &&
                this.IsConceptCodeExists(
                  oPrescriptionItemView.oPresItemBasicPropertiesView
                    .DispensingInstruction[ndln].Code,
                  MedicationCommonConceptCodeData.ViewConceptCodes,
                  (o) => {
                    desc = o;
                  }
                )
              )
                this.objDrugDetailsData.DisInstruction += desc;
            } else {
              let desc: string = String.Empty;
              if (
                String.Compare(
                  oPrescriptionItemView.oPresItemBasicPropertiesView
                    .DispensingInstruction[ndln].Code,
                  'CC_OTHER'
                ) == 0 &&
                !String.IsNullOrEmpty(
                  oPrescriptionItemView.oPresItemBasicPropertiesView
                    .OtherDispensingInstruction
                )
              )
                this.objDrugDetailsData.DisInstruction +=
                  oPrescriptionItemView.oPresItemBasicPropertiesView
                    .OtherDispensingInstruction + ';';
              else if (
                this.IsConceptCodeExists(
                  oPrescriptionItemView.oPresItemBasicPropertiesView
                    .DispensingInstruction[ndln].Code,
                  this.ConceptCodedispense,
                  (o) => {
                    desc = o;
                  }
                )
              )
                this.objDrugDetailsData.DisInstruction += desc + ';';
              else if (
                MedicationCommonConceptCodeData.ViewConceptCodes != null &&
                this.IsConceptCodeExists(
                  oPrescriptionItemView.oPresItemBasicPropertiesView
                    .DispensingInstruction[ndln].Code,
                  MedicationCommonConceptCodeData.ViewConceptCodes,
                  (o) => {
                    desc = o;
                  }
                )
              )
                this.objDrugDetailsData.DisInstruction += desc + ';';
            }
          }
        }
        if (!String.IsNullOrEmpty(this.objDrugDetailsData.DisInstruction)) {
          this.objDrugDetailsData.DisInstruction =
            this.objDrugDetailsData.DisInstruction.TrimEnd(';');
        }
        if (
          oPrescriptionItemView.oPresItemBasicPropertiesView
            .SupplyInstruction != null &&
          oPrescriptionItemView.oPresItemBasicPropertiesView
            .SupplyInstruction != null &&
          oPrescriptionItemView.oPresItemBasicPropertiesView.SupplyInstruction
            .Count > 0
        ) {
          let ntotln: number =
            oPrescriptionItemView.oPresItemBasicPropertiesView.SupplyInstruction
              .Count;
          this.objDrugDetailsData.SupplyInstruction = String.Empty;
          for (let nln: number = 0; nln < ntotln; nln++) {
            if (nln == ntotln - 1) {
              this.objDrugDetailsData.SupplyInstruction +=
                oPrescriptionItemView.oPresItemBasicPropertiesView.SupplyInstruction[
                  nln
                ].Name;
            } else {
              this.objDrugDetailsData.SupplyInstruction +=
                oPrescriptionItemView.oPresItemBasicPropertiesView
                  .SupplyInstruction[nln].Name + ';';
            }
          }
          this.objDrugDetailsData.SupplyInstructionComments =
            oPrescriptionItemView.oPresItemBasicPropertiesView.SupplyInstructionCode;
        }
      }
      let st: StringBuilder = new StringBuilder();
      if (
        oPrescriptionItemView != null &&
        oPrescriptionItemView.oPresItemAdditionalProperties != null &&
        oPrescriptionItemView.oPresItemAdditionalProperties
          .ReviewAfterDetails != null &&
        oPrescriptionItemView.oPresItemAdditionalProperties.ReviewAfterDetails
          .Count > 0
      ) {
        let Count: number =
          oPrescriptionItemView.oPresItemAdditionalProperties.ReviewAfterDetails
            .Count;
        // for (let x: number = 0; x < Count; x++) {
        //   st.Append(
        //     oPrescriptionItemView.oPresItemAdditionalProperties.ReviewAfterDetails[
        //       x
        //     ].ReviewedDTTM.ToString(CConstants.ShortDateFormat) +
        //     ', ' +
        //     oPrescriptionItemView.oPresItemAdditionalProperties.ReviewAfterDetails[
        //       x
        //     ].ReviewedDTTM.ToString('HH:mm') +
        //     ' hrs ' +
        //     oPrescriptionItemView.oPresItemAdditionalProperties
        //       .ReviewAfterDetails[x].Reviewer
        //   );
        //   if (x < Count - 1) st.Append('\n');
        // }
        for (let x: number = 0; x < Count; x++) {

          const reviewAfterDetail = oPrescriptionItemView.oPresItemAdditionalProperties.ReviewAfterDetails[x];        
          if (DateTime.NotEquals(reviewAfterDetail.ReviewedDTTM, DateTime.MinValue)) {
              st.Append(
              reviewAfterDetail.ReviewedDTTM.ToString(CConstants.ShortDateFormat) +
              ', ' +
              reviewAfterDetail.ReviewedDTTM.ToString('HH:mm') +
              ' hrs ' +
              reviewAfterDetail.Reviewer
            );          

            if (x < Count - 1) {
              st.Append('\n');
            }
          }
        }
      }
      if (
        oPrescriptionItemView.oPrescriptionItem != null &&
        oPrescriptionItemView.oPrescriptionItem.GPConnectMedication != null &&
        !String.IsNullOrEmpty(
          oPrescriptionItemView.oPrescriptionItem.GPConnectMedication
            .GPConnectID
        )
      ) {
        this.objAdditionalDetails.GPConnectID =
          oPrescriptionItemView.oPrescriptionItem.GPConnectMedication.GPConnectID;
      }
      this.DrugDetails = this.objDrugDetailsData;
      this.AdditionalDetails = this.objAdditionalDetails;
      this.AdditionalDetails.ReviewDetails = st.ToString();
    }
  }
  public GetSupDispInst(lPrecriptionoid: number): void {
    this.objIPPManagePresServiceProxy =
      new IPPManagePrescSer.IPPMAManagePrescriptionWSSoapClient();
    this.objIPPManagePresServiceProxy.GetSupDispInstDetailsCompleted = (
      s,
      e
    ) => {
      this.objIPPManagePresServiceProxy_GetSupDispInstDetailsCompleted(s, e);
    };
    let objReqSupDispInst: IPPManagePrescSer.CReqMsgGetSupDispInstDetails =
      new IPPManagePrescSer.CReqMsgGetSupDispInstDetails();
    objReqSupDispInst.PrescriptionItemOIDBC = lPrecriptionoid;
    objReqSupDispInst.oContextInformation = CommonBB.FillContext();
    this.objIPPManagePresServiceProxy.GetSupDispInstDetailsAsync(
      objReqSupDispInst
    );
  }
  public objIPPManagePresServiceProxy_GetSupDispInstDetailsCompleted(
    sender: Object,
    e: IPPManagePrescSer.GetSupDispInstDetailsCompletedEventArgs
  ): void {
    let _ErrorID: number = 80000114;
    let _ErrorSource: string =
      'LorAppMedicationCommonBB.dll, Class:Prescriptionitemdetailsvm, Method:objIPPManagePresServiceProxy_GetSupDispInstDetailsCompleted()';
    if (e.Error == null) {
      try {
        let objResSupDispInst: IPPManagePrescSer.CResMsgGetSupDispInstDetails =
          e.Result;
        if (
          objResSupDispInst != null &&
          objResSupDispInst.oIPPSupDispInstView != null
        ) {
          this.SupDispInst = new ObservableCollection<SupDispInst>();
          let objSupDispInst: SupDispInst;
          for (
            let nCount: number = 0;
            nCount < objResSupDispInst.oIPPSupDispInstView.Count;
            nCount++
          ) {
            objSupDispInst = new SupDispInst();
            objSupDispInst.Componentname =
              objResSupDispInst.oIPPSupDispInstView[nCount].ComponentName;
            objSupDispInst.PresItemChildOID =
              objResSupDispInst.oIPPSupDispInstView[nCount].PresItemChildOID;
            if (
              objResSupDispInst.oIPPSupDispInstView[nCount]
                .DispensingInstruction != null
            ) {
              let nTotDis: number =
                objResSupDispInst.oIPPSupDispInstView[nCount]
                  .DispensingInstruction.Count;
              objSupDispInst.DispensingInstruction = String.Empty;
              for (let ndln: number = 0; ndln < nTotDis; ndln++) {
                if (ndln == nTotDis - 1) {
                  let desc: string = String.Empty;
                  if (
                    String.Compare(
                      objResSupDispInst.oIPPSupDispInstView[nCount]
                        .DispensingInstruction[ndln].Code,
                      'CC_OTHER'
                    ) == 0 &&
                    !String.IsNullOrEmpty(
                      objResSupDispInst.oIPPSupDispInstView[nCount]
                        .DispensingInst
                    )
                  )
                    objSupDispInst.DispensingInstruction +=
                      objResSupDispInst.oIPPSupDispInstView[
                        nCount
                      ].DispensingComments;
                  else if (
                    this.IsConceptCodeExists(
                      objResSupDispInst.oIPPSupDispInstView[nCount]
                        .DispensingInstruction[ndln].Code,
                      this.ConceptCodedispense,
                      (o) => {
                        desc = o;
                      }
                    )
                  )
                    objSupDispInst.DispensingInstruction += desc;
                } else {
                  let desc: string = String.Empty;
                  if (
                    String.Compare(
                      objResSupDispInst.oIPPSupDispInstView[nCount]
                        .DispensingInstruction[ndln].Code,
                      'CC_OTHER'
                    ) == 0 &&
                    !String.IsNullOrEmpty(
                      objResSupDispInst.oIPPSupDispInstView[nCount]
                        .DispensingInst
                    )
                  )
                    objSupDispInst.DispensingInstruction +=
                      objResSupDispInst.oIPPSupDispInstView[nCount]
                        .DispensingComments + ';';
                  if (
                    this.IsConceptCodeExists(
                      objResSupDispInst.oIPPSupDispInstView[nCount]
                        .DispensingInstruction[ndln].Code,
                      this.ConceptCodedispense,
                      (o) => {
                        desc = o;
                      }
                    )
                  )
                    objSupDispInst.DispensingInstruction += desc + ',';
                }
              }
            }
            objSupDispInst.SupplyInstruction =
              objResSupDispInst.oIPPSupDispInstView[nCount].SupplyInstruction;
            this.SupDispInst.Add(objSupDispInst);
          }
        }
      } catch (ex: any) {
        let lnReturn: number = AMSHelper.PublicExceptionDetails(
          _ErrorID,
          _ErrorSource,
          ex
        );
      }
    } else {
      let lnReturn: number = AMSHelper.PublicExceptionDetails(
        _ErrorID,
        _ErrorSource,
        e.Error
      );
    }
  }
  public GetDoseDeatils(lPrecriptionoid: number): void {
    this.lPrescriptionItmOIDForDCDetails = lPrecriptionoid;
    this.GetDoseCalcDomainValues();
  }
  public GetDoseDetailsAsync(): void {
    if (this.lPrescriptionItmOIDForDCDetails > 0) {
      let objReqDose: ManagePrescSer.CReqMsgGetDoseDetails =
        new ManagePrescSer.CReqMsgGetDoseDetails();
      objReqDose.PrescriptionItemOIDBC = this.lPrescriptionItmOIDForDCDetails;
      objReqDose.oContextInformation = CommonBB.FillContext();
      this.objManagePrescriptionServiceProxy.GetDoseDetailsAsync(objReqDose);
      this.lPrescriptionItmOIDForDCDetails = 0;
    }
  }
  private objManagePrescriptionServiceProxy_GetDoseDetailsCompleted(
    sender: Object,
    e: ManagePrescSer.GetDoseDetailsCompletedEventArgs
  ): void {
    let _ErrorID: number = 80000115;
    let _ErrorSource: string =
      'LorAppMedicationCommonBB.dll, Class:Prescriptionitemdetailsvm, Method:objManagePrescriptionServiceProxy_GetDoseDetailsCompleted()';
    if (e.Error == null) {
      try {
        let objResDose: ManagePrescSer.CResMsgGetDoseDetails = e.Result;
        this.fillDataContext(objResDose);
      } catch (ex: any) {
        let lnReturn: number = AMSHelper.PublicExceptionDetails(
          _ErrorID,
          _ErrorSource,
          ex
        );
      }
    } else {
      let lnReturn: number = AMSHelper.PublicExceptionDetails(
        _ErrorID,
        _ErrorSource,
        e.Error
      );
    }
    if (this.DoseDetailEvent != null) {
      this.DoseDetailEvent(this);
    }
  }
  private fillDataContext2(
    objResDose: ManagePrescSer.CResMsgGetDoseDetails
  ): void {
    let dHt: number = 0;
    let dWt: number = 0;
    let sBSA: number = 0;
    let sIBWt: number = 0;
    let sAjBWt: number = 0;
    let sRecWt: number = 0;
    let scalVal: string = String.Empty;
    let sReqDoseForDetails: string = String.Empty;
    let objdosedetails: DoseDetailsdata = new DoseDetailsdata();

    //Not Required for LHS. To be Re-Visited.
    //let objMedDoseDetails: MedDoseDetails = new MedDoseDetails();
    if (objResDose != null && objResDose.oDoseCalculatorDetails != null) {
      if (
        !String.IsNullOrEmpty(
          objResDose.oDoseCalculatorDetails.PatientHeight
        ) &&
        !String.Equals(objResDose.oDoseCalculatorDetails.PatientHeight, '0')
      ) {
        objdosedetails.HeightVal = CommonBB.ConvertHeightIntoMeters(
          objResDose.oDoseCalculatorDetails.HTUOMCode,
          Convert.ToDouble(objResDose.oDoseCalculatorDetails.PatientHeight)
        ).ToString();
        if (!String.IsNullOrEmpty(objResDose.oDoseCalculatorDetails.HTUOMCode))
          objdosedetails.HeightVal += ' ' + CConstants.Meter;
        if (
          String.Equals(
            objResDose.oDoseCalculatorDetails.IsEstimatedHeight,
            '1'
          )
        ) {
          objdosedetails.HeightVal +=
            ' ' + Resource.DoseCalculator.IsEstimated_Text;
          if (objResDose.oDoseCalculatorDetails.RecordedHightDTTM != null)
            objdosedetails.HeightVal +=
              '\n on ' +
              objResDose.oDoseCalculatorDetails.RecordedHightDTTM.ToString(
                CConstants.LongDateWithoutSecs
              );
        } else if (objResDose.oDoseCalculatorDetails.RecordedHightDTTM != null)
          objdosedetails.HeightVal +=
            ' on ' +
            objResDose.oDoseCalculatorDetails.RecordedHightDTTM.ToString(
              CConstants.LongDateWithoutSecs
            );
      }
      if (
        !String.IsNullOrEmpty(
          objResDose.oDoseCalculatorDetails.PatientWeight
        ) &&
        !String.Equals(objResDose.oDoseCalculatorDetails.PatientWeight, '0')
      ) {
        sRecWt = 1;
        objdosedetails.RecBdyWeight = CommonBB.ConvertWeightIntoKg(
          objResDose.oDoseCalculatorDetails.WTUOMCode,
          Convert.ToDouble(objResDose.oDoseCalculatorDetails.PatientWeight)
        ).ToString();
        if (!String.IsNullOrEmpty(objResDose.oDoseCalculatorDetails.WTUOMCode))
          objdosedetails.RecBdyWeight += ' ' + CConstants.KG;
        if (
          String.Equals(
            objResDose.oDoseCalculatorDetails.IsEstimatedWeight,
            '1'
          )
        ) {
          objdosedetails.RecBdyWeight +=
            ' ' + Resource.DoseCalculator.IsEstimated_Text;
          if (objResDose.oDoseCalculatorDetails.RecordedWeightDTTM != null)
            objdosedetails.RecBdyWeight +=
              '\n on ' +
              objResDose.oDoseCalculatorDetails.RecordedWeightDTTM.ToString(
                CConstants.LongDateWithoutSecs
              );
        } else if (objResDose.oDoseCalculatorDetails.RecordedWeightDTTM != null)
          objdosedetails.RecBdyWeight +=
            ' on ' +
            objResDose.oDoseCalculatorDetails.RecordedWeightDTTM.ToString(
              CConstants.LongDateWithoutSecs
            );
      }
      if (
        !String.IsNullOrEmpty(objResDose.oDoseCalculatorDetails.IBWWeight) &&
        !String.IsNullOrEmpty(objResDose.oDoseCalculatorDetails.DOSFRCode) &&
        objResDose.oDoseCalculatorDetails.DOSFRCode.Equals(
          CConstants.WeightCode
        ) &&
        !String.IsNullOrEmpty(objResDose.oDoseCalculatorDetails.WeightOption) &&
        objResDose.oDoseCalculatorDetails.WeightOption.Equals(
          CConstants.IBWConceptCode
        )
      ) {
        sIBWt = 1;
        objdosedetails.IdealWeight =
          objResDose.oDoseCalculatorDetails.IBWWeight;
        if (
          !String.IsNullOrEmpty(
            objResDose.oDoseCalculatorDetails.ReqDoseUOMSecondCompLzoID
          )
        )
          objdosedetails.IdealWeight +=
            ' ' +
            CommonBB.GetText(
              objResDose.oDoseCalculatorDetails.ReqDoseUOMSecondCompLzoID,
              DoseCalcConceptCodeData.ConceptCodes
            );
      }
      if (
        !String.IsNullOrEmpty(objResDose.oDoseCalculatorDetails.ABWWeight) &&
        !String.IsNullOrEmpty(objResDose.oDoseCalculatorDetails.DOSFRCode) &&
        objResDose.oDoseCalculatorDetails.DOSFRCode.Equals(
          CConstants.WeightCode
        ) &&
        !String.IsNullOrEmpty(objResDose.oDoseCalculatorDetails.WeightOption) &&
        objResDose.oDoseCalculatorDetails.WeightOption.Equals(
          CConstants.ABWConceptCode
        )
      ) {
        sAjBWt = 1;
        objdosedetails.AdjBdyWeight =
          objResDose.oDoseCalculatorDetails.ABWWeight;
        if (
          !String.IsNullOrEmpty(
            objResDose.oDoseCalculatorDetails.ReqDoseUOMSecondCompLzoID
          )
        )
          objdosedetails.AdjBdyWeight +=
            ' ' +
            CommonBB.GetText(
              objResDose.oDoseCalculatorDetails.ReqDoseUOMSecondCompLzoID,
              DoseCalcConceptCodeData.ConceptCodes
            );
      }
      if (
        !String.IsNullOrEmpty(objResDose.oDoseCalculatorDetails.BSAValue) &&
        !String.IsNullOrEmpty(objResDose.oDoseCalculatorDetails.DOSFRCode) &&
        objResDose.oDoseCalculatorDetails.DOSFRCode.Equals(CConstants.BSACode)
      ) {
        objdosedetails.BSA = objResDose.oDoseCalculatorDetails.BSAValue;
        if (
          !String.IsNullOrEmpty(
            objResDose.oDoseCalculatorDetails.ReqDoseUOMSecondCompLzoID
          )
        )
          objdosedetails.BSA +=
            ' ' +
            CommonBB.GetText(
              objResDose.oDoseCalculatorDetails.ReqDoseUOMSecondCompLzoID,
              DoseCalcConceptCodeData.ConceptCodes
            );
        objdosedetails.BSA +=
          '(' +
          CommonBB.GetText(
            objResDose.oDoseCalculatorDetails.BSAFormula,
            DoseCalcConceptCodeData.ConceptCodes
          ) +
          ')';
        sBSA = 1;
      }
      if (
        !String.IsNullOrEmpty(objResDose.oDoseCalculatorDetails.RequestDose) &&
        !String.Equals(objResDose.oDoseCalculatorDetails.RequestDose, '0')
      ) {
        objdosedetails.Reqdose = objResDose.oDoseCalculatorDetails.RequestDose;
        if (objdosedetails.Reqdose.StartsWith('.')) {
          objdosedetails.Reqdose = '0' + objdosedetails.Reqdose;
        }
        if (
          !String.IsNullOrEmpty(
            objResDose.oDoseCalculatorDetails.RequestDoseUOMName
          )
        )
          objdosedetails.Reqdose +=
            ' ' + objResDose.oDoseCalculatorDetails.RequestDoseUOMName;
        sReqDoseForDetails = objdosedetails.Reqdose;
        if (
          !String.IsNullOrEmpty(
            objResDose.oDoseCalculatorDetails.ReqDoseUOMSecondCompLzoID
          )
        )
          objdosedetails.Reqdose +=
            '/' +
            CommonBB.GetText(
              objResDose.oDoseCalculatorDetails.ReqDoseUOMSecondCompLzoID,
              DoseCalcConceptCodeData.ConceptCodes
            );
        if (
          !String.IsNullOrEmpty(
            objResDose.oDoseCalculatorDetails.ReqDoseUOMThirdCompLzoID
          )
        ) {
          objdosedetails.Reqdose +=
            '/' + objResDose.oDoseCalculatorDetails.ReqDoseUOMThirdCompLzoID;
          sReqDoseForDetails +=
            '/' + objResDose.oDoseCalculatorDetails.ReqDoseUOMThirdCompLzoID;
        }
      }
      if (String.Equals(objResDose.oDoseCalculatorDetails.IsDailyDose, '1')) {
        objdosedetails.IndivDose = CommonBB.GetText(
          CConstants.TotDailydose,
          DoseCalcConceptCodeData.ConceptCodes
        );
      } else {
        objdosedetails.IndivDose = CommonBB.GetText(
          CConstants.IndDose,
          DoseCalcConceptCodeData.ConceptCodes
        );
      }
      if (
        !String.IsNullOrEmpty(objResDose.oDoseCalculatorDetails.FrequencyName)
      )
        objdosedetails.Freq = objResDose.oDoseCalculatorDetails.FrequencyName;
      if (
        !String.IsNullOrEmpty(objResDose.oDoseCalculatorDetails.CalculatedDose)
      ) {
        objdosedetails.Caldose =
          objResDose.oDoseCalculatorDetails.CalculatedDose;
        objdosedetails.Caldose +=
          ' ' + objResDose.oDoseCalculatorDetails.RequestDoseUOMName;
        if (
          !String.IsNullOrEmpty(
            objResDose.oDoseCalculatorDetails.ReqDoseUOMThirdCompLzoID
          )
        )
          objdosedetails.Caldose +=
            '/' + objResDose.oDoseCalculatorDetails.ReqDoseUOMThirdCompLzoID;
      }
      if (
        !String.IsNullOrEmpty(
          objResDose.oDoseCalculatorDetails.TotalDailyDose
        ) &&
        !String.IsNullOrEmpty(objResDose.oDoseCalculatorDetails.FrequencyName)
      ) {
        objdosedetails.TotDailyDose =
          objResDose.oDoseCalculatorDetails.TotalDailyDose;
        objdosedetails.TotDailyDose +=
          ' ' + objResDose.oDoseCalculatorDetails.RequestDoseUOMName;
      }
      if (
        !String.IsNullOrEmpty(
          objResDose.oDoseCalculatorDetails.OrderedPerDose
        ) &&
        !String.Equals(objResDose.oDoseCalculatorDetails.OrderedPerDose, '0')
      ) {
        objdosedetails.OrdAmtDse =
          objResDose.oDoseCalculatorDetails.OrderedPerDose;
        if (objdosedetails.OrdAmtDse.StartsWith('.')) {
          objdosedetails.OrdAmtDse = '0' + objdosedetails.OrdAmtDse;
        }
        objdosedetails.OrdAmtDse +=
          ' ' + objResDose.oDoseCalculatorDetails.RequestDoseUOMName;
        if (
          !String.IsNullOrEmpty(
            objResDose.oDoseCalculatorDetails.ReqDoseUOMThirdCompLzoID
          )
        )
          objdosedetails.OrdAmtDse +=
            '/' + objResDose.oDoseCalculatorDetails.ReqDoseUOMThirdCompLzoID;
      }
      if (
        !String.IsNullOrEmpty(objResDose.oDoseCalculatorDetails.OverrideReason)
      ) {
        objdosedetails.Reasonforoverride = CommonBB.GetText(
          objResDose.oDoseCalculatorDetails.OverrideReason,
          DoseCalcConceptCodeData.ConceptCodes
        );
      }
      objdosedetails.FreqVisible = Visibility.Collapsed;
      objdosedetails.TotDailyDseVisible = Visibility.Collapsed;
      if (sBSA == 1) {
        objdosedetails.DoseCalTxt1 = CommonBB.GetText(
          objResDose.oDoseCalculatorDetails.BSAFormula,
          DoseCalcConceptCodeData.ConceptCodes
        );
        objdosedetails.DoseCalTxt1 +=
          ' BSA(' +
          CommonBB.GetText(
            objResDose.oDoseCalculatorDetails.ReqDoseUOMSecondCompLzoID,
            DoseCalcConceptCodeData.ConceptCodes
          ) +
          ')';
        scalVal =
          objResDose.oDoseCalculatorDetails.BSAValue +
          ' ' +
          CommonBB.GetText(
            objResDose.oDoseCalculatorDetails.ReqDoseUOMSecondCompLzoID,
            DoseCalcConceptCodeData.ConceptCodes
          );
        objdosedetails.DoseCalVal1 = '= ' + scalVal;
      } else if (sAjBWt == 1) {
        objdosedetails.DoseCalTxt1 = Resource.DoseCalculator.cmdCalcAJBW_Text;
        objdosedetails.DoseCalVal1 = '= ' + objdosedetails.AdjBdyWeight;
        scalVal = objdosedetails.AdjBdyWeight;
      } else if (sIBWt == 1) {
        objdosedetails.DoseCalTxt1 = Resource.DoseCalculator.cmdCalcIBW_Text;
        objdosedetails.DoseCalVal1 = '= ' + objdosedetails.IdealWeight;
        scalVal = objdosedetails.IdealWeight;
      } else if (sRecWt == 1) {
        objdosedetails.DoseCalTxt1 = Resource.DoseCalculator.cmdCalcEBW_Text;
        objdosedetails.DoseCalVal1 =
          '= ' +
          CommonBB.ConvertWeightIntoKg(
            objResDose.oDoseCalculatorDetails.WTUOMCode,
            Convert.ToDouble(objResDose.oDoseCalculatorDetails.PatientWeight)
          ).ToString();
        if (
          !String.IsNullOrEmpty(objResDose.oDoseCalculatorDetails.WTUOMCode)
        ) {
          objdosedetails.DoseCalVal1 += ' ' + CConstants.KG;
        }
        scalVal = objdosedetails.DoseCalVal1.Split('=')[1];
        if (
          String.Equals(
            objResDose.oDoseCalculatorDetails.IsEstimatedWeight,
            '1'
          )
        ) {
          objdosedetails.DoseCalVal1 +=
            ' ' + Resource.DoseCalculator.IsEstimated_Text;
        }
      }
      if (String.Equals(objResDose.oDoseCalculatorDetails.IsDailyDose, '1')) {
        objdosedetails.FreqVisible = Visibility.Visible;
        objdosedetails.TotDailyDseVisible = Visibility.Visible;
        objdosedetails.DoseCalTxt2 =
          Resource.DoseCalculator.lblTotalDailyDose_Text;
        objdosedetails.DoseCalVal2 =
          '= ' +
          sReqDoseForDetails +
          ' X ' +
          scalVal +
          '\n= ' +
          objdosedetails.TotDailyDose;
        objdosedetails.DoseCalTxt3 = Resource.DoseCalculator.lblFrequency_Text;
        objdosedetails.DoseCalVal3 = '= ' + objdosedetails.Freq;
        objdosedetails.DoseCalTxt4 =
          Resource.DoseCalculator.lblCalcAmtPerDose_Text;
        objdosedetails.DoseCalVal4 =
          '= ' +
          objdosedetails.TotDailyDose +
          '/' +
          objResDose.oDoseCalculatorDetails.LowEvent +
          '\n= ' +
          objdosedetails.Caldose;
        objdosedetails.DoseCalTxt5 =
          Resource.DoseCalculator.lblOrderedAmtPerDose_Text;
        objdosedetails.DoseCalVal5 = '= ' + objdosedetails.OrdAmtDse;
        if (!String.IsNullOrEmpty(objdosedetails.Reasonforoverride)) {
          objdosedetails.DoseCalVal5 +=
            '\n (' + objdosedetails.Reasonforoverride + ')';
        }
      } else {
        if (!String.IsNullOrEmpty(objdosedetails.Reqdose)) {
          objdosedetails.DoseCalTxt4 =
            Resource.DoseCalculator.lblCalcAmtPerDose_Text;
          objdosedetails.DoseCalVal4 =
            '= ' +
            sReqDoseForDetails +
            ' X ' +
            scalVal +
            '\n= ' +
            objdosedetails.Caldose;
        }
        objdosedetails.DoseCalTxt5 =
          Resource.DoseCalculator.lblOrderedAmtPerDose_Text;
        objdosedetails.DoseCalVal5 = '= ' + objdosedetails.OrdAmtDse;
        if (!String.IsNullOrEmpty(objdosedetails.Reasonforoverride)) {
          objdosedetails.DoseCalVal5 +=
            '\n (' + objdosedetails.Reasonforoverride + ')';
        }
      }
    }
    this.DoseDetails = objdosedetails;

    //Not Required for LHS. To be Re-Visited.
    //objMedDoseDetails.DataContext = this.DoseDetails;
  }
  public static CalculateBSA(
    Htinm: number,
    Wtinkg: number,
    sFormulaChoosen: string
  ): number {
    let fHt: number;
    let fWt: number;
    let dBSA: number;
    let nBSA: number = 0;
    switch (sFormulaChoosen) {
      case 'CC_MOSTELLER': {
        fHt = Htinm * 100;
        fWt = Wtinkg;
        dBSA = fHt * fWt;
        dBSA = dBSA / 3600;
        dBSA = iMath.Sqrt(dBSA);
        break;
      }
      case 'CC_DUBOIS': {
        fHt = Htinm * 100;
        fWt = Wtinkg;
        fHt = 0.007184 * iMath.Pow(fHt, 0.725);
        fWt = iMath.Pow(fWt, 0.425);
        dBSA = fHt * fWt;
        break;
      }
      case 'CC_HAYCOCK': {
        fHt = Htinm * 100;
        fWt = Wtinkg;
        fHt = 0.024265 * iMath.Pow(fHt, 0.3964);
        fWt = iMath.Pow(fWt, 0.5378);
        dBSA = fHt * fWt;
        break;
      }
      case 'CC_GEHANGRG': {
        fHt = Htinm * 100;
        fWt = Wtinkg;
        fHt = 0.0235 * iMath.Pow(fHt, 0.42246);
        fWt = iMath.Pow(fWt, 0.51456);
        dBSA = fHt * fWt;
        break;
      }
      case 'CC_BOYD': {
        fHt = Htinm * 100;
        fWt = Wtinkg * 1000;
        fHt = 0.0003207 * iMath.Pow(fHt, 0.3);
        fWt = iMath.Pow(fWt, 0.7285 - 0.0188 * iMath.Log10(fWt));
        dBSA = fHt * fWt;
        break;
      }
      default: {
        fHt = Htinm * 100;
        fWt = Wtinkg * 1000;
        fHt = 0.0003207 * iMath.Pow(fHt, 0.3);
        fWt = iMath.Pow(fWt, 0.7285 - 0.0188 * iMath.Log10(fWt));
        dBSA = fHt * fWt;
        break;
      }
    }
    nBSA = iMath.Round(dBSA, 2);
    return nBSA;
  }
  public oDRCConflicts: ObservableCollection<IPPManagePrescSer.DRCConflict>;
  public get DRCConflicts(): ObservableCollection<IPPManagePrescSer.DRCConflict> {
    return this.oDRCConflicts;
  }
  public set DRCConflicts(
    value: ObservableCollection<IPPManagePrescSer.DRCConflict>
  ) {
    if (this.oDRCConflicts != value) {
      this.oDRCConflicts = value;
      //NotifyPropertyChanged("DRCConflicts");
    }
  }
  public GetDRCConflictDetails(
    PrecriptionItemOID: number,
    PatientOID: number
  ): void {
    Busyindicator.SetStatusBusy('RxDRCConflictsTabView');
    let objReqDRC: IPPManagePrescSer.CReqMsgGetDRCConflicts =
      new IPPManagePrescSer.CReqMsgGetDRCConflicts();
    objReqDRC.PrescriptionItemOIDBC = PrecriptionItemOID;
    objReqDRC.PatientOIDBC = PatientOID;
    objReqDRC.oContextInformation = CommonBB.FillContext();
    if(this.objIPPManagePresServiceProxy.GetDRCConflictsCompleted == null){
      this.objIPPManagePresServiceProxy.GetDRCConflictsCompleted = (s, e) => {
        this.objIPPManagePresServiceProxy_GetDRCConflictsCompleted(s, e);
      };
    }
    this.objIPPManagePresServiceProxy.GetDRCConflictsAsync(objReqDRC);
  }
  private objIPPManagePresServiceProxy_GetDRCConflictsCompleted(
    sender: Object,
    e: IPPManagePrescSer.GetDRCConflictsCompletedEventArgs
  ): void {
    let _ErrorID: number = 80000116;
    let _ErrorSource: string =
      'LorAppMedicationCommonBB.dll, Class:Prescriptionitemdetailsvm, Method:objIPPManagePresServiceProxy_GetDRCConflictsCompleted()';
    this.oDRCConflicts = null;
    if (e.Error == null) {
      try {
        let objResDRC: IPPManagePrescSer.CResMsgGetDRCConflicts = e.Result;
        if (
          objResDRC != null &&
          objResDRC.oDRCConflict != null &&
          objResDRC.oDRCConflict.Count > 0
        ) {
          this.DRCConflicts =
            new ObservableCollection<IPPManagePrescSer.DRCConflict>(
              objResDRC.oDRCConflict
            );
          let strReason: string = String.Empty;
          if (
            this.DRCConflicts[0].ConflictDetails != null &&
            this.DRCConflicts[0].ConflictDetails.Count > 0 &&
            this.DRCConflicts[0].ConflictDetails[0] != null &&
            !String.IsNullOrEmpty(
              this.DRCConflicts[0].ConflictDetails[0].AcknowledgeReason
            )
          ) {
            strReason =
              this.DRCConflicts[0].ConflictDetails[0].AcknowledgeReason;
          }

          this.DRCConflicts.ForEach((ReInsert) => {
            if (
              ReInsert.ConflictDetails != null &&
              ReInsert.ConflictDetails.Count > 0
            ) {
              ReInsert.ConflictDetails.ForEach((oConflictDetail) => {
                if (
                  oConflictDetail != null &&
                  !String.IsNullOrEmpty(oConflictDetail.ErrorCode)
                ) {
                  oConflictDetail.ErrorCode =
                    DRCErrorCodeConceptCodeData.ConceptCodes.Where((c) =>
                      String.Equals(
                        c.Value,
                        oConflictDetail.ErrorCode,
                        StringComparison.CurrentCultureIgnoreCase
                      )
                    )
                      .Select((s) => s.DisplayText)
                      .FirstOrDefault();
                  oConflictDetail.AcknowledgeReason =
                    ConflictsReasonConceptCodeData.ConceptCodes.Where((c) =>
                      String.Equals(
                        c.Value,
                        oConflictDetail.AcknowledgeReason,
                        StringComparison.CurrentCultureIgnoreCase
                      )
                    )
                      .Select((s) => s.DisplayText)
                      .FirstOrDefault();
                  if (!String.IsNullOrEmpty(strReason)) {
                    //bug 44642
                    oConflictDetail.AcknowledgeReasonCode = strReason;
                  }
                  if (
                    String.IsNullOrEmpty(oConflictDetail.AcknowledgeReason) &&
                    MedicationCommonConceptCodeData.ViewConceptCodes != null &&
                    MedicationCommonConceptCodeData.ViewConceptCodes.Count > 0
                  ) {
                    oConflictDetail.AcknowledgeReason =
                      MedicationCommonConceptCodeData.ViewConceptCodes.Where(
                        (c) =>
                          String.Equals(
                            c.csCode,
                            strReason,
                            StringComparison.CurrentCultureIgnoreCase
                          )
                      )
                        .Select((s) => s.csDescription)
                        .FirstOrDefault();
                  }
                }
              });
            }
          });
          //bug 44642
          if (this.DRCConflictsEvent != null) {
            this.DRCConflictsEvent(this);
          }
        }
      } catch (ex: any) {
        let lnReturn: number = AMSHelper.PublicExceptionDetails(
          _ErrorID,
          _ErrorSource,
          ex
        );
      }
    } else {
      let lnReturn: number = AMSHelper.PublicExceptionDetails(
        _ErrorID,
        _ErrorSource,
        e.Error
      );
    }
    Busyindicator.SetStatusIdle('RxDRCConflictsTabView');
  }
  private GetMedicationConfilictConfig(): void {
    let objReqConfig: IPPManagePrescSer.CReqMsgGetMedicationConfilictConfig =
      new IPPManagePrescSer.CReqMsgGetMedicationConfilictConfig();
    objReqConfig.IsMainAppConflictsBC = '1';
    objReqConfig.oContextInformation = CommonBB.FillContext();
    this.objIPPManagePresServiceProxy.GetMedicationConfilictConfigAsync(
      objReqConfig
    );
  }
  private objMedicationMgmtServiceProxy_GetMedicationConfilictConfigCompleted(
    sender: Object,
    e: IPPManagePrescSer.GetMedicationConfilictConfigCompletedEventArgs
  ): void {
    let _ErrorID: number = 80000119;
    let _ErrorSource: string =
      'LorAppMedicationCommonBB.dll, Class:Prescriptionitemdetailsvm, Method:objMedicationMgmtServiceProxy_GetMedicationConfilictConfigCompleted()';
    if (e.Error == null) {
      try {
        let objResConfig: IPPManagePrescSer.CResMsgGetMedicationConfilictConfig =
          e.Result;
        if (
          objResConfig != null &&
          objResConfig.oMedicationConflictConfig != null
        ) {
          this.ConflictConfig = objResConfig.oMedicationConflictConfig;
        }
      } catch (ex: any) {
        let lnReturn: number = AMSHelper.PublicExceptionDetails(
          _ErrorID,
          _ErrorSource,
          ex
        );
      }
    } else {
      let lnReturn: number = AMSHelper.PublicExceptionDetails(
        _ErrorID,
        _ErrorSource,
        e.Error
      );
    }
    this.GetDrugDetails(this.PrescriptionItemOID, this.MCLorenzoID);
  }
  public GetConflictSealDetails(
    oSealingDetails: ObservableCollection<ManagePrescSer.SealingDetails>,
    HealthIssueCode: string,
    HealthIssueType: string
  ): ManagePrescSer.SealingDetails {
    let objConflictSealDetails: ManagePrescSer.SealingDetails = null;
    let oMedconflictSealData: IEnumerable<ManagePrescSer.SealingDetails>;
    if (oSealingDetails != null && oSealingDetails.Count > 0) {
      oMedconflictSealData = oSealingDetails.Where(
        (HCodeType) =>
          HCodeType != null &&
          String.Compare(HCodeType.IdentifyingCode, HealthIssueCode) == 0 &&
          String.Compare(HCodeType.IdentifyingType, HealthIssueType) == 0
      );
      if (oMedconflictSealData != null && oMedconflictSealData.Count() > 0) {
        objConflictSealDetails = new ManagePrescSer.SealingDetails();
        oMedconflictSealData.forEach((obj) => {
          objConflictSealDetails = obj;
        });
      }
    }
    return objConflictSealDetails;
  }
  public GetValidationDetails(pPrescriptionItemOID: number): void {
    Busyindicator.SetStatusBusy('RxConflictsTabView');
    let objReqValidation: ManagePrescSer.CReqMsgGetValidationsDetails =
      new ManagePrescSer.CReqMsgGetValidationsDetails();
    objReqValidation.oValidationDetailsBC =
      new ManagePrescSer.ValidationDetails();
    objReqValidation.oValidationDetailsBC.PrescriptionItemOid =
      pPrescriptionItemOID;
    objReqValidation.oValidationDetailsBC.IsBreak =
      PatientContext.PatientSealBreakExists ? '1' : '0';
    objReqValidation.oContextInformation = CommonBB.FillContext();
    this.objManagePrescriptionServiceProxy.GetValidationsDetailsAsync(
      objReqValidation
    );
  }
  objWarningDetail: ObservableCollection<ManagePrescSer.WarningDetails> = null;
  private objManagePrescriptionServiceProxy_GetValidationsDetailsCompleted(
    sender: Object,
    e: ManagePrescSer.GetValidationsDetailsCompletedEventArgs
  ): void {
    let _ErrorID: number = 80000116;
    let _ErrorSource: string =
      'LorAppMedicationCommonBB.dll, Class:Prescriptionitemdetailsvm, Method:objManagePrescriptionServiceProxy_GetValidationsDetailsCompleted()';
    this.objWarningDetail = null;
    if (e.Error == null) {
      try {
        let objResValidation: ManagePrescSer.CResMsgGetValidationsDetails =
          e.Result;
        if (
          objResValidation != null &&
          objResValidation.oWarningDetails != null &&
          objResValidation.oWarningDetails.Count > 0
        ) {
          this.ValidationDetails = new ObservableCollection<ManagePrescSer.WarningDetails>();
          objResValidation.oWarningDetails.forEach((oWarningDetails) => {
            let objConflictSealDetails: ManagePrescSer.SealingDetails =
              this.GetConflictSealDetails(
                objResValidation.oSealingDetails,
                oWarningDetails.Code,
                oWarningDetails.ConflictType
              );
            if (
              objConflictSealDetails == null ||
              (objConflictSealDetails != null &&
                String.Compare(objConflictSealDetails.SealType, 'CC_SEAL') !=
                0 &&
                String.Compare(
                  objConflictSealDetails.SealType,
                  'CC_SEALLOCK'
                ) != 0)
            ) {
              if (this.objWarningDetail == null)
                this.objWarningDetail =
                  new ObservableCollection<ManagePrescSer.WarningDetails>();
              if (
                oWarningDetails != null &&
                !String.IsNullOrEmpty(oWarningDetails.AcknowledgeStatus) &&
                String.Equals(oWarningDetails.AcknowledgeStatus, '3') &&
                !String.IsNullOrEmpty(oWarningDetails.ConflictType) &&
                !(
                  String.Equals(
                    oWarningDetails.WarningBehaviourType,
                    'Type 5'
                  ) &&
                  String.Equals(oWarningDetails.WarningBehaviourType, 'Type 4')
                )
              ) {
                oWarningDetails.AcknowledgeStatus = '1';
              }
              if (
                oWarningDetails != null &&
                !String.IsNullOrEmpty(
                  oWarningDetails.ClinicallVeriferComments
                ) &&
                String.Equals(
                  oWarningDetails.ClinicallVeriferComments,
                  CConstants.SelectReason,
                  StringComparison.InvariantCultureIgnoreCase
                )
              ) {
                oWarningDetails.ClinicallVeriferComments = String.Empty;
              }
              this.objWarningDetail.Add(oWarningDetails);
              this.ValidationDetails.Add(oWarningDetails);
            }
          });
          this.ShowDecisionSupport();
        }
      } catch (ex: any) {
        let lnReturn: number = AMSHelper.PublicExceptionDetails(
          _ErrorID,
          _ErrorSource,
          ex
        );
      }
    } else {
      let lnReturn: number = AMSHelper.PublicExceptionDetails(
        _ErrorID,
        _ErrorSource,
        e.Error
      );
    }
    Busyindicator.SetStatusIdle('RxConflictsTabView');
  }
  public GetConflictConfig(): void {
    if (WebServiceURLMedicationCommonBB.IPPMAManagePrescriptionWS != null) {
      let objService: IPPManagePrescSer.IPPMAManagePrescriptionWSSoapClient =
        new IPPManagePrescSer.IPPMAManagePrescriptionWSSoapClient();
      let objReqConfig: IPPManagePrescSer.CReqMsgGetMedicationConfilictConfig =
        new IPPManagePrescSer.CReqMsgGetMedicationConfilictConfig();
      objReqConfig.IsMainAppConflictsBC = '1';
      objReqConfig.oContextInformation = CommonBB.FillContext();
      objService.GetMedicationConfilictConfigCompleted = (s, e) => {
        this.ConflictsConfig_Completed(s, e);
      };
      objService.GetMedicationConfilictConfigAsync(objReqConfig);
    }
  }
  private ConflictsConfig_Completed(
    sender: Object,
    e: IPPManagePrescSer.GetMedicationConfilictConfigCompletedEventArgs
  ): void {
    if (e.Error != null) return;
    let objResConfig: IPPManagePrescSer.CResMsgGetMedicationConfilictConfig =
      e.Result;
    if (objResConfig != null) {
      MedicationCommonProfileData.MedConflictConfig =
        e.Result.oMedicationConflictConfig;
      this.ShowDecisionSupport();
    }
  }
  private ShowDecisionSupport(): void {
    ProcessRTE.GetValuesByDomainCodes(
      'CNFTY,SUBAG,SUBCI,SUBINT,SUBDP,BHVTY,MEDSVRTY',
      (s, e) => {
        this.OnRTEResult(s);
      }
    );
  }
  private fillDataContext3(
    objWarningDetail: ObservableCollection<ManagePrescSer.WarningDetails>
  ): void {
    let lstWarningDetails: ObservableCollection<ManagePrescSer.WarningDetails> =
      new ObservableCollection<ManagePrescSer.WarningDetails>();
    if (objWarningDetail != null && objWarningDetail.Count > 0) {
      objWarningDetail.forEach((objWarnDet) => {
        if (!String.IsNullOrEmpty(objWarnDet.WarningType)) {
          let strRefWarnType: string = String.Empty;
          strRefWarnType = CommonBB.GetText(
            objWarnDet.WarningType,
            WarningConceptCode.ConceptData
          );
          if (
            String.Compare(objWarnDet.WarningType, CConstants.DRUGCONTRA) == 0
          )
            objWarnDet.WarningType = CConstants.sContraIndication;
          else if (
            String.Compare(objWarnDet.WarningType, CConstants.DRUGINTRACT) ==
            0 ||
            String.Compare(
              objWarnDet.WarningType,
              CConstants.DRUG_INTERACTIONS
            ) == 0
          )
            objWarnDet.WarningType = CConstants.sInteract;
          else if (
            String.Compare(
              objWarnDet.WarningType,
              CConstants.DRUGDUPLICATION
            ) == 0 ||
            String.Compare(objWarnDet.WarningType, CConstants.DRUG_DUPL_CHK) ==
            0
          )
            objWarnDet.WarningType = CConstants.sDuplication;
          else if (!String.IsNullOrEmpty(strRefWarnType))
            objWarnDet.WarningType = strRefWarnType;
        }
        if (!String.IsNullOrEmpty(objWarnDet.WarningSubType)) {
          let sRefWarningSubType: string = String.Empty;
          sRefWarningSubType = CommonBB.GetText(
            objWarnDet.WarningSubType,
            WarningConceptCode.ConceptData
          );
          if (!String.IsNullOrEmpty(sRefWarningSubType)) {
            objWarnDet.WarningSubType = sRefWarningSubType;
          }
        }
        if (
          String.Compare(
            objWarnDet.WarningType,
            'Warning',
            StringComparison.InvariantCultureIgnoreCase
          ) == 0 &&
          String.IsNullOrEmpty(objWarnDet.WarningSubType)
        ) {
          objWarnDet.WarningType = objWarnDet.WarningType;
        } else if (!String.IsNullOrEmpty(objWarnDet.WarningSubType)) {
          objWarnDet.WarningType =
            objWarnDet.WarningType + ' - ' + objWarnDet.WarningSubType;
        }
        objWarnDet.WarningMessage = String.IsNullOrEmpty(
          objWarnDet.WarningMessage
        )
          ? String.Empty
          : objWarnDet.WarningMessage.Replace('<BR><BR>', '\n\n');
        lstWarningDetails.Add(objWarnDet);
      });
      this.ValidationDetails =
        new ObservableCollection<ManagePrescSer.WarningDetails>(
          lstWarningDetails.OrderBy((war) => war.WarningBehaviourType)
        );
    }
    if (this.ValidationEvent != null) {
      this.ValidationEvent(this);
    }
  }
  public lPrescriptionItemOID: number = 0;
  //public delegate void MedLineItemDisplayDelegate(PrescriptionItemDetailsVM PresItemDetails);
  public MedLineItemEvent: Function;
  //public delegate void DRCConflictsItemDelegate(PrescriptionItemDetailsVM PresItemDetails);
  public DRCConflictsEvent: Function;
  //public delegate void DoseDetailsDelegate(PrescriptionItemDetailsVM PresItemDetails);
  public DoseDetailEvent: Function;
  public ReviewHistoryEvent: Function;
  public ValidationEvent: Function;
  public sLorenzoID: string;
  public SubscribeDoseCalcClickEvent(imgDose: Image): void {
    imgDose.MouseLeftButtonUp = (s, e) => {
      this.imgDose_MouseLeftButtonUp(s, e);
    };
  }
  IsDCIconClickedAlready: boolean = false;
  imgDose_MouseLeftButtonUp(sender: Object, e: MouseButtonEventArgs): void {
    if (!this.IsDCIconClickedAlready) {
      this.IsDCIconClickedAlready = true;
      Busyindicator.SetStatusBusy('DCIconClicked');
      this.GetDoseDeatils(this.PrescriptionItemOID);
      this.DoseDetailEvent = (s, e) => {
        this.PrescriptionItemDetailsVM_DoseDetailEvent(s);
      };
    }
  }
  PrescriptionItemDetailsVM_DoseDetailEvent(
    PresItemDetails: PrescriptionItemDetailsVM
  ): void {
    //Not Required for LHS. To be Re-Visited.
    this.objDoseCalc = new MedDoseDetails();
    this.objDoseCalc.DataContext = this.DoseDetails;
    let stitle: string = "Dose calculation details - LORENZO -- Webpage Dialog";
    AppActivity.OpenWindow(stitle, this.objDoseCalc, (s, e) => { this.omedDoseDetails_Closed(s); }, "", false, 570, 820, false, WindowButtonType.Close, null);

  }
  omedDoseDetails_Closed(args: AppDialogEventargs): void {
    this.IsDCIconClickedAlready = false;
    Busyindicator.SetStatusIdle('DCIconClicked');
    let oAppDialogWindow = args.AppChildWindow as ChildWindow;
    oAppDialogWindow.DialogResult = true;
    // args.AppChildWindow.DialogResult = true;
    // this.DoseDetailEvent -= new DoseDetailsDelegate(this.PrescriptionItemDetailsVM_DoseDetailEvent);
  }
  public SubscribeDoseTypeClickEvent(imgType: Image): void {
    imgType.MouseLeftButtonDown = (s, e) => {
      this.imgType_MouseLeftButtonDown(s, e);
    };
  }
  imgType_MouseLeftButtonDown(sender: Object, e: MouseButtonEventArgs): void {
    let img: Image = ObjectHelper.CreateType<Image>(sender, Image);
    let sDoseType: string;
    sDoseType = Convert.ToString(img.Tag);
    if (
      String.Compare(
        sDoseType,
        DoseTypeCode.STEPPEDVARIABLE,
        StringComparison.OrdinalIgnoreCase
      ) == 0 ||
      String.Compare(
        sDoseType,
        DoseTypeCode.STEPPED,
        StringComparison.OrdinalIgnoreCase
      ) == 0 ||
      String.Compare(
        sDoseType,
        DoseTypeCode.VARIABLE,
        StringComparison.OrdinalIgnoreCase
      ) == 0
    ) {
      if (this.MultiDoseDetailVM == null) {
        this.MultiDoseDetailVM = new MultipleDoseDetail(
          this.PrescriptionItemOID,
          String.IsNullOrEmpty(this.MCVersion)
            ? AppSessionInfo.AMCV
            : this.MCVersion,
          sDoseType,
          'EPR',
          !String.IsNullOrEmpty(this.PrescriptionType)
            ? this.PrescriptionType
            : PatientContext.PrescriptionType
        );
        this.MultiDoseDetailVM.SteppedDoseCompleted = (s, e) => {
          this.MultiDoseDetailVM_SteppedDoseCompleted();
        };        
      } else {
        this.MultiDoseDetailVM.PresItemDoseInfoServicedata.emit();
      }
      this.MultiDoseDetailVM_SteppedDoseCompleted();
    } else if (
      String.Compare(
        sDoseType,
        DoseTypeCode.TITRATED,
        StringComparison.OrdinalIgnoreCase
      ) == 0 &&
      this.DrugDetails != null
    ) {
      Busyindicator.SetStatusBusy('Titratediconclick');
      if (
        !String.IsNullOrEmpty(this.DrugDetails.PresType) &&
        String.Equals(
          this.DrugDetails.PresType,
          PrescriptionTypes.ForAdministration,
          StringComparison.CurrentCultureIgnoreCase
        )
      ) {
        this.MultiDoseDetailVM = new MultipleDoseDetail(
          this.PrescriptionItemOID,
          String.IsNullOrEmpty(this.MCVersion)
            ? AppSessionInfo.AMCV
            : this.MCVersion,
          sDoseType,
          'EPR',
          PatientContext.PrescriptionType
        );
        this.MultiDoseDetailVM.TitratedDoseCompleted = (s, e) => {
          this.MultiDoseDetailVM_TitratedDoseCompleted();
        };
      } else {
        let oTitratedDoseCommonVM: TitratedDoseCommonVM =
          new TitratedDoseCommonVM();
        oTitratedDoseCommonVM.InputPrescriptionItemOID =
          this.PrescriptionItemOID;
        //Not Required for LHS. To be Re-Visited.
        this.oMedTitratedDoseView = new MedTitratedDoseView(oTitratedDoseCommonVM);
        this.oMedTitratedDoseView.onDialogClose = this.objTitrated_Closed;

        this.oDrugname = new DrugName();
        AppActivity.OpenWindow(this.oDrugname.IdentifyingName(this.DrugDetails.VMVPIdentifyingName, this.DrugDetails.IdentifyingName), this.oMedTitratedDoseView, (s, e) => { this.oMedTitratedDoseView_Closed(s); }, "", false, 400, 915, false, WindowButtonType.Close, null);

      }
    } else if (
      String.Compare(
        sDoseType,
        DoseTypeCode.CONDITIONAL,
        StringComparison.OrdinalIgnoreCase
      ) == 0
    ) {
      if (this.ConditionalVM == null) {
        // this.ConditionalVM = ObjectHelper.CreateObject(
        //   new ConditionalDoseVM(
        //     RequestSource.ViewDrugDetails,
        //     this.PrescriptionItemOID
        //   ),
        //   { DrugName: this.DrugDetails.IdentifyingName }
        // );
        this.ConditionalVM = new ConditionalDoseVM(RequestSource.ViewDrugDetails,this.PrescriptionItemOID,false);
        this.ConditionalVM.DrugName = this.DrugDetails.IdentifyingName;        
      }
      //Not Required for LHS. To be Re-Visited.
      let objConditional: MedConditionalDose = new MedConditionalDose();
      objConditional.DataContext = this.ConditionalVM;
      objConditional.InfusionType = this.DrugDetails.InfusionDetails.InfusionType.Value;
      objConditional.DoseType = this.DrugDetails.DoseType;
      this.oDrugname = new DrugName();
      AppActivity.OpenWindow((this.oDrugname.IdentifyingName(this.DrugDetails.VMVPIdentifyingName, this.DrugDetails.IdentifyingName) + " - LORENZO -- Webpage Dialog"), objConditional, (s, e) => { this.omedobjConditional_Closed(s); }, "", false, 300, 460, false, WindowButtonType.Close, null);

    }
  }
  omedobjConditional_Closed(args: AppDialogEventargs): void {
    let oAppDialogWindow = args.AppChildWindow as ChildWindow;
    oAppDialogWindow.DialogResult = true;
    // args.AppChildWindow.DialogResult = true;
  }
  MultiDoseDetailVM_TitratedDoseCompleted(): void {
    //Not Required for LHS. To be Re-Visited.
    this.objTitrated = new MedTitratedDose();
    this.objTitrated.DataContext = this.MultiDoseDetailVM;
    this.objTitrated.onDialogClose = this.objTitrated_Closed;
    this.oDrugname = new DrugName();
    AppActivity.OpenWindow(this.oDrugname.IdentifyingName(this.DrugDetails.VMVPIdentifyingName, this.DrugDetails.IdentifyingName), this.objTitrated, (s, e) => { this.objTitrated_Closed(s); }, "", false, 350, 480, false, WindowButtonType.Close, null);

  }
  private objTitrated_Closed(args: AppDialogEventargs): void {
    Busyindicator.SetStatusIdle('Titratediconclick');
    //Not Required for LHS. To be Re-Visited.
    this.objTitrated.appDialog.DialogResult = true;
  }
  MultiDoseDetailVM_SteppedDoseCompleted(): void {
    //Not Required for LHS. To be Re-Visited.
     this.objStepped = new MedSteppedFullPrescriptionVW();
            this.objStepped.oLaunchFrom = this.oLaunchFrom;

            let temp =  this.MultiDoseDetailVM.PresItemDoseInfoServicedata.subscribe(()=> {    
            	this.objStepped.DataContext = this.MultiDoseDetailVM;
            	this.objStepped.onDialogClose = this.MedSteppedDose_Closed;
            	if (this.DrugDetails != null && !String.IsNullOrEmpty(this.DrugDetails.PresType))
                	this.objStepped.sPrescriptionTypeCode = this.DrugDetails.PresType;
            	this.oDrugname = new DrugName();
            	AppActivity.OpenWindow(this.oDrugname.IdentifyingName(this.DrugDetails.VMVPIdentifyingName, this.DrugDetails.IdentifyingName), this.objStepped, (s,e)=>{this.MedSteppedDose_Closed(s);}, "", false, 640, 915, false, WindowButtonType.Close, null);
              temp.unsubscribe(); 
            });
  }
  private MedSteppedDose_Closed(args: AppDialogEventargs): void {
    //Not Required for LHS. To be Re-Visited.
    this.objStepped.appDialog.DialogResult = true;
  }
  private oMedTitratedDoseView_Closed(args: AppDialogEventargs): void {
    //Not Required for LHS. To be Re-Visited.
    this.oMedTitratedDoseView.appDialog.DialogResult = true;
    Busyindicator.SetStatusIdle('Titratediconclick');
  }
  public GetDrugDetails(
    pPrescriptionItemOID: number,
    sMCILorenzoID: string
  ): void {
    this.lPrescriptionItemOID = this.PrescriptionItemOID = pPrescriptionItemOID;
    this.sLorenzoID = sMCILorenzoID;
    if (MedicationCommonProfileData.AddPrescribingConfig == null) {
      this.GetProfileData();
    } else {
      this.GetDrugDetailsAsyncCall();
    }
  }
  private GetDrugDetailsAsyncCall(): void {
    if (
      !String.Equals(this.IsDoseCalcExist, '1') &&
      !String.Equals(this.IsDoseCalcExist, '2')
    ) {
      if (
        PatientContext.PatientHeightDTTM > DateTime.MinValue &&
        PatientContext.PatientWeightDTTM > DateTime.MinValue
      ) {
        PatientContext.PatLatHWDTTM =
          PatientContext.PatientHeightDTTM >= PatientContext.PatientWeightDTTM
            ? PatientContext.PatientHeightDTTM
            : PatientContext.PatientWeightDTTM;
      } else {
        let result: ScriptObject;
        result = ObjectHelper.CreateType<ScriptObject>(
          HtmlPage.Window.Invoke('GetLatestHTWTUpdatedDTTM'),
          'ScriptObject'
        );
        if (result.GetProperty('Dosecalcdate') != null) {
          let datevalue: Object = result.GetProperty('Dosecalcdate');
          if (datevalue != null) {
            PatientContext.PatLatHWDTTM = Convert.ToDateTime(datevalue);
          }
        }
      }
    }
    let objReqDrug: IPPManagePrescSer.CReqMsgGetDrugDetails =
      new IPPManagePrescSer.CReqMsgGetDrugDetails();
    objReqDrug.PrescriptionItemOIDBC = this.lPrescriptionItemOID;
    objReqDrug.oContextInformation = CommonBB.FillContext();
    objReqDrug.serviceoidBC = this.ServiceOID;
    objReqDrug.locationoidBC = this.LocationOID;
    if (
      MedicationCommonProfileData.AddPrescribingConfig != null &&
      !String.IsNullOrEmpty(
        MedicationCommonProfileData.AddPrescribingConfig.PresIdentifierType
      )
    ) {
      objReqDrug.PresIdentifyingTypeBC =
        MedicationCommonProfileData.AddPrescribingConfig.PresIdentifierType;
    }
    this.objIPPManagePresServiceProxy.GetDrugDetailsAsync(objReqDrug);
  }
  public GetProfileData(): void {
    let profile: ProfileFactoryType = new ProfileFactoryType();
    profile.OnProfileListLoaded = (s, e) => {
      this.profile_OnProfileLoaded(s, e);
    };
    let lstProfileReq: List<ProfileContext> = new List<ProfileContext>();
    let objReq: ProfileContext = new ProfileContext();
    objReq.ContextCode = 'VW_MEDICONFIG';
    objReq.ProfileItemKey = 'ADDPRESCRIBINGCONFIG';
    objReq.ProfileType = typeof AddPrescribingConfigData;
    objReq.ProfileLevel = ProfileFactoryType.Level.Organisation;
    lstProfileReq.Add(objReq);
    objReq = new ProfileContext();
    objReq.ContextCode = 'VW_MEDICONFIG';
    objReq.ProfileItemKey = 'PRESCONFIG';
    objReq.ProfileType = typeof PrescribingConfigData;
    objReq.ProfileLevel = ProfileFactoryType.Level.Organisation;
    lstProfileReq.Add(objReq);
    profile.GetProfilesData(lstProfileReq);
  }
  profile_OnProfileLoaded(sender: Object, Result: List<ProfileContext>): void {
    Result.forEach((oProfileContext) => {
      if (
        String.Compare(oProfileContext.ContextCode, 'VW_MEDICONFIG') == 0 &&
        String.Compare(
          oProfileContext.ProfileItemKey,
          'ADDPRESCRIBINGCONFIG'
        ) == 0
      ) {
        if (oProfileContext.ProfileData instanceof AddPrescribingConfigData) {
          MedicationCommonProfileData.AddPrescribingConfig =
            ObjectHelper.CreateType<AddPrescribingConfigData>(
              oProfileContext.ProfileData,
              AddPrescribingConfigData
            );
        }
      }
      if (
        String.Compare(oProfileContext.ContextCode, 'VW_MEDICONFIG') == 0 &&
        String.Compare(oProfileContext.ProfileItemKey, 'PRESCONFIG') == 0
      ) {
        if (oProfileContext.ProfileData instanceof PrescribingConfigData) {
          MedicationCommonProfileData.PrescribeConfig =
            ObjectHelper.CreateType<PrescribingConfigData>(
              oProfileContext.ProfileData,
              PrescribingConfigData
            );
        }
      }
    });
    this.GetDrugDetailsAsyncCall();
  }
  private objManagePrescriptionServiceProxy_GetDrugDetailsCompleted(
    sender: Object,
    e: IPPManagePrescSer.GetDrugDetailsCompletedEventArgs
  ): void {
    let _ErrorID: number = 80000120;
    let _ErrorSource: string =
      'LorAppMedicationCommonBB.dll, Class:Prescriptionitemdetailsvm, Method:objManagePrescriptionServiceProxy_GetDrugDetailsCompleted()';
    if (e.Error == null) {
      try {
        let objResDrug: IPPManagePrescSer.CResMsgGetDrugDetails = e.Result;
        this.fillDataContext(objResDrug);
        if (this.MedLineItemEvent != null) {
          this.MedLineItemEvent(this);
        }
      } catch (ex: any) {
        let lnReturn: number = AMSHelper.PublicExceptionDetails(
          _ErrorID,
          _ErrorSource,
          ex
        );
      }
    } else {
      let lnReturn: number = AMSHelper.PublicExceptionDetails(
        _ErrorID,
        _ErrorSource,
        e.Error
      );
    }
  }
  private fillDataContext4(
    objResDrug: IPPManagePrescSer.CResMsgGetDrugDetails
  ): void {
    let isCanDisObjNull: boolean = true,
      isAmendObjNull = true;
    if (this.oDrugDetailsData == null)
      this.objDrugDetailsData = new DrugDetailsData();
    if (this.oAdditionalDetails == null)
      this.objAdditionalDetails = new MedicationAdditionalDetails();
    if (this.objDrugDetailsData != null)
      this.objDrugDetailsData.MCLorenzoid = this.sLorenzoID;
    this.objAdditionalDetails.PresIdenTypeVisibility = Visibility.Collapsed;
    this.objAdditionalDetails.PresIdenVisibility = Visibility.Collapsed;
    this.objAdditionalDetails.DefCntBleepVisibility = Visibility.Collapsed;
    this.objAdditionalDetails.DefCntPhoneVisibility = Visibility.Collapsed;
    this.objAdditionalDetails.DefCntPagerVisibility = Visibility.Collapsed;
    if (
      MedicationCommonProfileData.AddPrescribingConfig != null &&
      !String.IsNullOrEmpty(
        MedicationCommonProfileData.AddPrescribingConfig.PresIdentifierName
      )
    ) {
      this.objAdditionalDetails.PresIdenTypeVisibility = Visibility.Visible;
      this.objAdditionalDetails.PrescriberIdentifierName =
        MedicationCommonProfileData.AddPrescribingConfig.PresIdentifierName;
    }
    if (
      objResDrug instanceof IPPManagePrescSer.CResMsgGetDrugDetails &&
      objResDrug.oPrescriptionItemView instanceof ObservableCollection &&
      objResDrug.oPrescriptionItemView != null &&
      objResDrug.oPrescriptionItemView.Count > 0
    ) {
      let nCnt: number = 0;
      let objDrugDetailsOrderData: DrugDetailsOrderData =
        new DrugDetailsOrderData();
      objResDrug.oPrescriptionItemView.forEach((oPrescriptionItemView) => {
        if (oPrescriptionItemView != null) {
          if (oPrescriptionItemView.oPrescriptionItem != null) {
            this.objDrugDetailsData.MCLorenzoid =
              oPrescriptionItemView.oPrescriptionItem.LorenzoID;
            if (oPrescriptionItemView.oPrescriptionItemAddnView != null) {
              if (
                oPrescriptionItemView.oPrescriptionItemAddnView.AmendDetails !=
                null
              )
                isAmendObjNull = false;
              if (
                oPrescriptionItemView.oPrescriptionItemAddnView
                  .CancelDiscontinueDetails != null
              )
                isCanDisObjNull = false;
            }
            if (
              oPrescriptionItemView.oPrescriptionItem.PrescriberDetails != null
            ) {
              this.objAdditionalDetails.PrescribedBy =
                oPrescriptionItemView.oPrescriptionItem.PrescriberDetails.Name;
            }
            this.objAdditionalDetails.IsPGD =
              oPrescriptionItemView.oPrescriptionItem.IsPGD;
            if (
              String.Compare(
                oPrescriptionItemView.oPrescriptionItem.IsInfusionitem,
                '1'
              ) == 0
            )
              this.objAdditionalDetails.IsInfusion = true;
            else this.objAdditionalDetails.IsInfusion = false;
            if (
              String.Compare(
                oPrescriptionItemView.oPrescriptionItem.IsBolus,
                '1'
              ) == 0
            )
              this.objAdditionalDetails.IsBolus = true;
            else this.objAdditionalDetails.IsBolus = false;
            if (
              oPrescriptionItemView.oPrescriptionItem.PrescriptionBasicData !=
              null
            ) {
              if (
                oPrescriptionItemView.oPrescriptionItem.PrescriptionBasicData
                  .PrescriptionType != null
              ) {
                this.objDrugDetailsData.PresType =
                  oPrescriptionItemView.oPrescriptionItem.PrescriptionBasicData.PrescriptionType;
              }
              if (
                oPrescriptionItemView.oPrescriptionItem.PrescriptionBasicData
                  .PrescriptionDTTM != null
              ) {
                this.objAdditionalDetails.PrescribedOn =
                  oPrescriptionItemView.oPrescriptionItem.PrescriptionBasicData.PrescriptionDTTM.ConvertToUser(
                    (o1) => {
                      this.IsDST = o1;
                    },
                    (o2) => {
                      this.IsAmbiguous = o2;
                    },
                    (o3) => {
                      this.IsInvalid = o3;
                    }
                  ).ToDateTimeString(
                    this.IsDST,
                    this.IsAmbiguous,
                    CConstants.LongDateWithoutSecs
                  );
              }
            }
            this.objDrugDetailsData.IsConditionalExists =
              oPrescriptionItemView.oPrescriptionItem.IsConditionalExists;
          }
          if (oPrescriptionItemView.oPresItemBasicPropertiesView != null) {
            if (
              !String.IsNullOrEmpty(
                oPrescriptionItemView.oPresItemBasicPropertiesView.OmittedBy
              )
            ) {
              this.objDrugDetailsData.OmittedBy =
                oPrescriptionItemView.oPresItemBasicPropertiesView.OmittedBy;
            }
            if (
              !String.IsNullOrEmpty(
                oPrescriptionItemView.oPresItemBasicPropertiesView.OmitComments
              )
            ) {
              this.objDrugDetailsData.OmitComments =
                oPrescriptionItemView.oPresItemBasicPropertiesView.OmitComments;
            }
            if (
              oPrescriptionItemView.oPresItemBasicPropertiesView
                .IsinDefiniteOmitDTTM != DateTime.MinValue
            ) {
              this.objDrugDetailsData.IsinDefiniteOmitDTTM =
                oPrescriptionItemView.oPresItemBasicPropertiesView.IsinDefiniteOmitDTTM;
            }
            this.objDrugDetailsData.IsinDefiniteOmit =
              oPrescriptionItemView.oPresItemBasicPropertiesView.IsinDefiniteOmit;
            this.objDrugDetailsData.IsWardStock =
              oPrescriptionItemView.oPresItemBasicPropertiesView.IsWardStock;
          }
          if (
            oPrescriptionItemView.oPresItemBasicPropertiesView != null &&
            oPrescriptionItemView.oPresItemBasicPropertiesView
              .FormViewParameters != null
          ) {
            if (
              !String.IsNullOrEmpty(
                oPrescriptionItemView.oPresItemBasicPropertiesView
                  .FormViewParameters.ReviewComments
              )
            ) {
              this.objDrugDetailsData.ReviewComments =
                oPrescriptionItemView.oPresItemBasicPropertiesView.FormViewParameters.ReviewComments;
            }
            if (
              !String.IsNullOrEmpty(
                oPrescriptionItemView.oPresItemBasicPropertiesView
                  .FormViewParameters.ReviewRequestedBy
              )
            ) {
              this.objDrugDetailsData.ReviewRequestedBy =
                oPrescriptionItemView.oPresItemBasicPropertiesView.FormViewParameters.ReviewRequestedBy;
            }
            if (
              !String.IsNullOrEmpty(
                oPrescriptionItemView.oPresItemBasicPropertiesView
                  .FormViewParameters.ReviewType
              )
            ) {
              this.objDrugDetailsData.ReviewType =
                oPrescriptionItemView.oPresItemBasicPropertiesView.FormViewParameters.ReviewType;
            }
            if (
              oPrescriptionItemView.oPresItemBasicPropertiesView
                .FormViewParameters.ReviewAfterDTTM != DateTime.MinValue
            ) {
              this.objDrugDetailsData.ReviewPeriodDTTM =
                oPrescriptionItemView.oPresItemBasicPropertiesView.FormViewParameters.ReviewAfterDTTM;
            }
          }
          if (
            oPrescriptionItemView.oPresItemAdditionalProperties != null &&
            oPrescriptionItemView.oPresItemAdditionalProperties
              .StationeryType != null &&
            !String.IsNullOrEmpty(
              oPrescriptionItemView.oPresItemAdditionalProperties.StationeryType
                .Code
            ) &&
            !String.IsNullOrEmpty(
              oPrescriptionItemView.oPresItemAdditionalProperties.StationeryType
                .Name
            ) &&
            oPrescriptionItemView.oPresItemAdditionalProperties.StationeryType
              .OID != null
          ) {
            this.objDrugDetailsData.StationryType =
              oPrescriptionItemView.oPresItemAdditionalProperties.StationeryType.Code;
          }
          if (oPrescriptionItemView.oPresItemAdditionalProperties != null) {
            this.objAdditionalDetails.CommentsForStopping =
              oPrescriptionItemView.oPresItemAdditionalProperties.ReasonOfStopping;
          }
          if (
            oPrescriptionItemView.oPresItemAdditionalProperties != null &&
            !String.IsNullOrEmpty(
              oPrescriptionItemView.oPresItemAdditionalProperties
                .ReasonforReconcile
            ) &&
            this.ReasonforReconcileConceptCodes != null
          ) {
            this.objAdditionalDetails.ReasonForReconcile = CommonBB.GetText(
              oPrescriptionItemView.oPresItemAdditionalProperties
                .ReasonforReconcile,
              this.ReasonforReconcileConceptCodes
            );
          }
          if (
            oPrescriptionItemView.oPrescriptionItem.PrescriberDetails != null &&
            !String.IsNullOrEmpty(
              oPrescriptionItemView.oPrescriptionItem.PrescriberDetails.Code
            )
          )
            this.objAdditionalDetails.PrescriberStatus =
              oPrescriptionItemView.oPrescriptionItem.PrescriberDetails.Code;
          if (
            oPrescriptionItemView.oPrescriptionItemAddnView != null &&
            oPrescriptionItemView.oPrescriptionItemAddnView
              .AdditionalProperties != null
          ) {
            if (
              oPrescriptionItemView.oPresItemAdditionalProperties != null &&
              !String.IsNullOrEmpty(
                oPrescriptionItemView.oPresItemAdditionalProperties
                  .PrescriberIdentifier
              )
            ) {
              this.objAdditionalDetails.PresIdenVisibility = Visibility.Visible;
              this.objAdditionalDetails.PrescriberIdentifier =
                oPrescriptionItemView.oPresItemAdditionalProperties.PrescriberIdentifier;
            }
            if (
              !String.IsNullOrEmpty(
                oPrescriptionItemView.oPrescriptionItemAddnView
                  .AdditionalProperties.PrescriberBleep
              )
            ) {
              if (
                oPrescriptionItemView.oPrescriptionItemAddnView.AdditionalProperties.PrescriberBleep.Contains(
                  '~'
                )
              ) {
                this.objAdditionalDetails.PrescriberBleep =
                  oPrescriptionItemView.oPrescriptionItemAddnView.AdditionalProperties.PrescriberBleep.Split(
                    '~'
                  )[0];
                this.objAdditionalDetails.IsDefaultContact = String.Equals(
                  oPrescriptionItemView.oPrescriptionItemAddnView.AdditionalProperties.PrescriberBleep.Split(
                    '~'
                  )[1],
                  '1'
                )
                  ? true
                  : false;
                this.objAdditionalDetails.DefCntBleepVisibility = this
                  .objAdditionalDetails.IsDefaultContact
                  ? Visibility.Visible
                  : Visibility.Collapsed;
              } else
                this.objAdditionalDetails.PrescriberBleep =
                  oPrescriptionItemView.oPrescriptionItemAddnView.AdditionalProperties.PrescriberBleep;
            }
            if (
              !String.IsNullOrEmpty(
                oPrescriptionItemView.oPrescriptionItemAddnView
                  .AdditionalProperties.PrescriberTelephone
              )
            ) {
              if (
                oPrescriptionItemView.oPrescriptionItemAddnView.AdditionalProperties.PrescriberTelephone.Contains(
                  '~'
                )
              ) {
                this.objAdditionalDetails.PrescriberTelephone =
                  oPrescriptionItemView.oPrescriptionItemAddnView.AdditionalProperties.PrescriberTelephone.Split(
                    '~'
                  )[0];
                this.objAdditionalDetails.IsDefaultContact = String.Equals(
                  oPrescriptionItemView.oPrescriptionItemAddnView.AdditionalProperties.PrescriberTelephone.Split(
                    '~'
                  )[1],
                  '1'
                )
                  ? true
                  : false;
                this.objAdditionalDetails.DefCntPhoneVisibility = this
                  .objAdditionalDetails.IsDefaultContact
                  ? Visibility.Visible
                  : Visibility.Collapsed;
              } else
                this.objAdditionalDetails.PrescriberTelephone =
                  oPrescriptionItemView.oPrescriptionItemAddnView.AdditionalProperties.PrescriberTelephone;
            }
            if (
              !String.IsNullOrEmpty(
                oPrescriptionItemView.oPrescriptionItemAddnView
                  .AdditionalProperties.PrescriberPager
              )
            ) {
              if (
                oPrescriptionItemView.oPrescriptionItemAddnView.AdditionalProperties.PrescriberPager.Contains(
                  '~'
                )
              ) {
                this.objAdditionalDetails.PrescriberPager =
                  oPrescriptionItemView.oPrescriptionItemAddnView.AdditionalProperties.PrescriberPager.Split(
                    '~'
                  )[0];
                this.objAdditionalDetails.IsDefaultContact = String.Equals(
                  oPrescriptionItemView.oPrescriptionItemAddnView.AdditionalProperties.PrescriberPager.Split(
                    '~'
                  )[1],
                  '1'
                )
                  ? true
                  : false;
                this.objAdditionalDetails.DefCntPagerVisibility = this
                  .objAdditionalDetails.IsDefaultContact
                  ? Visibility.Visible
                  : Visibility.Collapsed;
              } else
                this.objAdditionalDetails.PrescriberPager =
                  oPrescriptionItemView.oPrescriptionItemAddnView.AdditionalProperties.PrescriberPager;
            }
          }
          if (oPrescriptionItemView.oPresItemBasicPropertiesView != null) {
            if (
              oPrescriptionItemView.oPresItemBasicPropertiesView.StartDate !=
              null &&
              oPrescriptionItemView.oPresItemBasicPropertiesView.StartDate !=
              DateTime.MinValue
            )
              this.objDrugDetailsData.StartDate =
                oPrescriptionItemView.oPresItemBasicPropertiesView.StartDate.ConvertToUser(
                  (o1) => {
                    this.IsDST = o1;
                  },
                  (o2) => {
                    this.IsAmbiguous = o2;
                  },
                  (o3) => {
                    this.IsInvalid = o3;
                  }
                ).ToDateTimeString(
                  this.IsDST,
                  this.IsAmbiguous,
                  CConstants.LongDateWithoutSecs
                );
            if (
              oPrescriptionItemView.oPresItemAdditionalProperties != null &&
              !String.IsNullOrEmpty(
                oPrescriptionItemView.oPresItemAdditionalProperties
                  .DateCommenced
              ) &&
              String.Compare(
                oPrescriptionItemView.oPresItemAdditionalProperties
                  .DateCommenced,
                'CC_Month'
              ) == 0
            ) {
              this.objDrugDetailsData.StartDate =
                oPrescriptionItemView.oPresItemBasicPropertiesView.StartDate.ToString(
                  'MMM-yyyy'
                );
            } else if (
              oPrescriptionItemView.oPresItemAdditionalProperties != null &&
              !String.IsNullOrEmpty(
                oPrescriptionItemView.oPresItemAdditionalProperties
                  .DateCommenced
              ) &&
              String.Compare(
                oPrescriptionItemView.oPresItemAdditionalProperties
                  .DateCommenced,
                'CC_Year'
              ) == 0
            ) {
              this.objDrugDetailsData.StartDate =
                oPrescriptionItemView.oPresItemBasicPropertiesView.StartDate.ConvertToUser(
                  (o1) => {
                    this.IsDST = o1;
                  },
                  (o2) => {
                    this.IsAmbiguous = o2;
                  },
                  (o3) => {
                    this.IsInvalid = o3;
                  }
                ).ToDateTimeString(this.IsDST, this.IsAmbiguous, 'yyyy');
            } else if (
              oPrescriptionItemView.oPresItemBasicPropertiesView.StartDate !=
              null &&
              oPrescriptionItemView.oPresItemBasicPropertiesView.StartDate !=
              DateTime.MinValue
            ) {
              if (
                !String.Equals(
                  this.objDrugDetailsData.PresType,
                  PrescriptionTypes.Clerking
                )
              ) {
                this.objDrugDetailsData.StartDate =
                  oPrescriptionItemView.oPresItemBasicPropertiesView.StartDate.ConvertToUser(
                    (o1) => {
                      this.IsDST = o1;
                    },
                    (o2) => {
                      this.IsAmbiguous = o2;
                    },
                    (o3) => {
                      this.IsInvalid = o3;
                    }
                  ).ToDateTimeString(
                    this.IsDST,
                    this.IsAmbiguous,
                    CConstants.LongDateWithoutSecs
                  );
              } else if (
                String.Equals(
                  this.objDrugDetailsData.PresType,
                  PrescriptionTypes.Clerking,
                  StringComparison.CurrentCultureIgnoreCase
                ) &&
                String.IsNullOrEmpty(
                  oPrescriptionItemView.oPresItemAdditionalProperties
                    .DateCommenced
                )
              ) {
                this.objDrugDetailsData.StartDate = String.Empty;
              } else if (
                (!String.IsNullOrEmpty(
                  oPrescriptionItemView.oPrescriptionItem.IsInfusionitem
                ) &&
                  String.Compare(
                    oPrescriptionItemView.oPrescriptionItem.IsInfusionitem,
                    '1'
                  ) == 0) ||
                (!String.IsNullOrEmpty(
                  oPrescriptionItemView.oPrescriptionItem.ITMSUBTYP
                ) &&
                  String.Equals(
                    oPrescriptionItemView.oPrescriptionItem.ITMSUBTYP,
                    DrugItemSubTypeCode.MEDICAL_GAS,
                    StringComparison.CurrentCultureIgnoreCase
                  ))
              ) {
                this.objDrugDetailsData.StartDate =
                  oPrescriptionItemView.oPresItemBasicPropertiesView.StartDate.ConvertToUser(
                    (o1) => {
                      this.IsDST = o1;
                    },
                    (o2) => {
                      this.IsAmbiguous = o2;
                    },
                    (o3) => {
                      this.IsInvalid = o3;
                    }
                  ).ToDateTimeString(
                    this.IsDST,
                    this.IsAmbiguous,
                    CConstants.LongDateWithoutSecs
                  );
              } else {
                this.objDrugDetailsData.StartDate =
                  oPrescriptionItemView.oPresItemBasicPropertiesView.StartDate.ConvertToUser(
                    (o1) => {
                      this.IsDST = o1;
                    },
                    (o2) => {
                      this.IsAmbiguous = o2;
                    },
                    (o3) => {
                      this.IsInvalid = o3;
                    }
                  ).ToString(CConstants.ShortDateFormat);
              }
            } else {
              this.objDrugDetailsData.StartDate = String.Empty;
            }
            if (
              !String.IsNullOrEmpty(this.objDrugDetailsData.StartDate) &&
              (String.Equals(
                oPrescriptionItemView.oPresItemBasicPropertiesView
                  .ExistsOnAdmission,
                '1'
              ) ||
                String.Equals(
                  oPrescriptionItemView.oPresItemBasicPropertiesView
                    .ExistsOnAdmission,
                  '2'
                ))
            ) {
              this.objDrugDetailsData.StartDate =
                this.objDrugDetailsData.StartDate + '\n  ' + '(On admission)';
            }
            if (
              oPrescriptionItemView.oPresItemBasicPropertiesView.EndDate !=
              null &&
              // oPrescriptionItemView.oPresItemBasicPropertiesView.EndDate !=
              // DateTime.MinValue
               DateTime.NotEquals(oPrescriptionItemView.oPresItemBasicPropertiesView.EndDate,DateTime.MinValue)
            ) {
              if (
                !String.Equals(
                  this.objDrugDetailsData.PresType,
                  PrescriptionTypes.Clerking
                )
              ) {
                this.objDrugDetailsData.StopDate =
                  oPrescriptionItemView.oPresItemBasicPropertiesView.EndDate.ConvertToUser(
                    (o1) => {
                      this.IsDST = o1;
                    },
                    (o2) => {
                      this.IsAmbiguous = o2;
                    },
                    (o3) => {
                      this.IsInvalid = o3;
                    }
                  ).ToDateTimeString(
                    this.IsDST,
                    this.IsAmbiguous,
                    CConstants.LongDateWithoutSecs
                  );
              } else {
                this.objDrugDetailsData.StopDate =
                  oPrescriptionItemView.oPresItemBasicPropertiesView.EndDate.ConvertToUser(
                    (o1) => {
                      this.IsDST = o1;
                    },
                    (o2) => {
                      this.IsAmbiguous = o2;
                    },
                    (o3) => {
                      this.IsInvalid = o3;
                    }
                  ).ToString(CConstants.ShortDateFormat);
              }
            }
            if (
              String.Compare(this.objDrugDetailsData.StopDate, '01/01/0001') ==
              0
            )
              this.objDrugDetailsData.StopDate = String.Empty;
            if (
              oPrescriptionItemView.oPresItemBasicPropertiesView.EndDate ==
              DateTime.MinValue
            )
              this.objDrugDetailsData.StopDate = String.Empty;
            if (oPrescriptionItemView.oPresItemBasicPropertiesView.Dose != null)
              this.objDrugDetailsData.Dose =
                oPrescriptionItemView.oPresItemBasicPropertiesView.Dose;
            if (
              !String.IsNullOrEmpty(
                oPrescriptionItemView.oPresItemBasicPropertiesView.DoseType
              )
            ) {
              this.objDrugDetailsData.DoseType =
                oPrescriptionItemView.oPresItemBasicPropertiesView.DoseType;
            }
            if (
              oPrescriptionItemView.oPresItemBasicPropertiesView
                .TreatmentToCont != null
            )
              this.objDrugDetailsData.TreatmentCont =
                oPrescriptionItemView.oPresItemBasicPropertiesView.TreatmentToCont.Name;
            if (
              oPrescriptionItemView.oPresItemBasicPropertiesView.Quantity !=
              null
            )
              this.objDrugDetailsData.QuantityVal =
                oPrescriptionItemView.oPresItemBasicPropertiesView.Quantity;
            if (
              oPrescriptionItemView.oPresItemBasicPropertiesView
                .QuantityUOMName != null
            )
              this.objDrugDetailsData.QuantityUOM =
                oPrescriptionItemView.oPresItemBasicPropertiesView.QuantityUOMName;
            if (
              oPrescriptionItemView.oPresItemBasicPropertiesView
                .QuantityUOMName != null &&
              oPrescriptionItemView.oPresItemBasicPropertiesView.Route != null
            )
              this.objDrugDetailsData.Route = MedicationCommonBB.RouteName(
                oPrescriptionItemView.oPresItemBasicPropertiesView.Route.Name
              );
            if (
              oPrescriptionItemView.oPresItemBasicPropertiesView
                .QuantityUOMName != null &&
              oPrescriptionItemView.oPresItemBasicPropertiesView.Form != null
            )
              this.objDrugDetailsData.Form =
                oPrescriptionItemView.oPresItemBasicPropertiesView.Form.Name;
            if (
              oPrescriptionItemView.oPresItemBasicPropertiesView
                .QuantityUOMName != null
            )
              this.objDrugDetailsData.QuantityUOM =
                oPrescriptionItemView.oPresItemBasicPropertiesView.QuantityUOMName;
            if (
              oPrescriptionItemView.oPrescriptionItem 
            ) {
              let IPPPrescItem: IPPManagePrescSer.IPPPrescriptionItem =
                ObjectHelper.CreateType<IPPManagePrescSer.IPPPrescriptionItem>(
                  oPrescriptionItemView.oPrescriptionItem,
                  IPPManagePrescSer.IPPPrescriptionItem
                );
              if (
                IPPPrescItem != null &&
                !String.IsNullOrEmpty(IPPPrescItem.DrugFrequencyUOMCode) &&
                String.Equals(
                  IPPPrescItem.DrugFrequencyUOMCode,
                  'CC_MEDDRSN2',
                  StringComparison.CurrentCultureIgnoreCase
                ) &&
                IPPPrescItem.FrequencyDetails != null &&
                IPPPrescItem.FrequencyDetails.DaysOfWeek != null &&
                IPPPrescItem.FrequencyDetails.DaysOfWeek.Count > 0
              ) {
                this.objDrugDetailsData.DaysOfweekText =
                  MedicationCommonBB.ConstructDaysOfWeek(
                    IPPPrescItem.FrequencyDetails.DaysOfWeek
                  );
              }
            }
            if (
              !String.IsNullOrEmpty(
                oPrescriptionItemView.oPresItemBasicPropertiesView.Frequency
              )
            ) {
              this.objDrugDetailsData.Frequency =
                oPrescriptionItemView.oPresItemBasicPropertiesView.Frequency;
            } else if (
              !String.Equals(
                this.objDrugDetailsData.PresType,
                PrescriptionTypes.Clerking
              ) &&
              !String.IsNullOrEmpty(
                oPrescriptionItemView.oPresItemBasicPropertiesView
                  .SteppedDoseAdminTimes
              )
            ) {
              this.objDrugDetailsData.Frequency =
                oPrescriptionItemView.oPresItemBasicPropertiesView.SteppedDoseAdminTimes;
            }
            if (
              oPrescriptionItemView.oPresItemAdditionalProperties != null &&
              oPrescriptionItemView.oPresItemAdditionalProperties.AdminMethod !=
              null
            )
              this.objDrugDetailsData.AdminMethod =
                oPrescriptionItemView.oPresItemAdditionalProperties.AdminMethod.Name;
            if (
              oPrescriptionItemView.oPresItemAdditionalProperties != null &&
              oPrescriptionItemView.oPresItemAdditionalProperties.AdminMethod !=
              null
            )
              this.objDrugDetailsData.AdminMethod =
                oPrescriptionItemView.oPresItemAdditionalProperties.AdminMethod.Name;
            if (
              oPrescriptionItemView.oPrescriptionItem != null &&
              oPrescriptionItemView.oPrescriptionItem.IdentifyingName != null
            )
              this.objDrugDetailsData.IdentifyingName =
                oPrescriptionItemView.oPrescriptionItem.IdentifyingName;
            if (
              oPrescriptionItemView.oPrescriptionItem != null &&
              oPrescriptionItemView.oPrescriptionItem.IdentifyingType != null
            )
              this.objDrugDetailsData.IdentifyingType =
                oPrescriptionItemView.oPrescriptionItem.IdentifyingType;
            if (
              oPrescriptionItemView.oPrescriptionItem != null &&
              oPrescriptionItemView.oPrescriptionItem.ITMSUBTYP != null
            )
              this.objDrugDetailsData.ItemSubType =
                oPrescriptionItemView.oPrescriptionItem.ITMSUBTYP;
            if (
              oPrescriptionItemView.oPrescriptionItem != null &&
              oPrescriptionItemView.oPrescriptionItem.MCIItemDisplay != null
            )
              this.objDrugDetailsData.MCItemDisplay =
                oPrescriptionItemView.oPrescriptionItem.MCIItemDisplay;
            if (
              oPrescriptionItemView.oPresItemBasicPropertiesView.Direction !=
              null
            )
              this.objDrugDetailsData.Direction =
                oPrescriptionItemView.oPresItemBasicPropertiesView.Direction;
            if (
              oPrescriptionItemView.oPresItemAdditionalProperties != null &&
              oPrescriptionItemView.oPresItemAdditionalProperties.ExpiryDate !=
              null &&
              oPrescriptionItemView.oPresItemAdditionalProperties.ExpiryDate !=
              DateTime.MinValue
            )
              this.objDrugDetailsData.Expiredttm =
                oPrescriptionItemView.oPresItemAdditionalProperties.ExpiryDate;
            if (
              oPrescriptionItemView.oPresItemBasicPropertiesView
                .DrugProperties != null &&
              oPrescriptionItemView.oPresItemBasicPropertiesView.DrugProperties
                .Count > 0
            )
              this.objDrugDetailsData.DrugProperty =
                oPrescriptionItemView.oPresItemBasicPropertiesView.DrugProperties;
            if (
              oPrescriptionItemView.oPresItemBasicPropertiesView.Duration !=
              null
            )
              this.objDrugDetailsData.Duration =
                oPrescriptionItemView.oPresItemBasicPropertiesView.Duration;
            if (
              oPrescriptionItemView.oPresItemBasicPropertiesView.DrugStatus !=
              null
            )
              this.objDrugDetailsData.Status =
                oPrescriptionItemView.oPresItemBasicPropertiesView.DrugStatus;
            if (oPrescriptionItemView.oPresItemBasicPropertiesView.Site != null)
              this.objDrugDetailsData.Site =
                oPrescriptionItemView.oPresItemBasicPropertiesView.Site;
            if (
              oPrescriptionItemView.oPrescriptionItem != null &&
              !String.IsNullOrEmpty(
                oPrescriptionItemView.oPrescriptionItem.VMVPIdentifyingName
              )
            )
              this.objDrugDetailsData.VMVPIdentifyingName =
                oPrescriptionItemView.oPrescriptionItem.VMVPIdentifyingName;
            if (
              oPrescriptionItemView.oPrescriptionItem != null &&
              !String.IsNullOrEmpty(
                oPrescriptionItemView.oPrescriptionItem.VMVPLorenzoID
              )
            )
              this.objDrugDetailsData.VMVPLzoID =
                oPrescriptionItemView.oPrescriptionItem.VMVPLorenzoID;
            if (
              oPrescriptionItemView != null &&
              oPrescriptionItemView.oPresItemBasicPropertiesView != null
            ) {
              this.objDrugDetailsData.IsCriticalMed =
                oPrescriptionItemView.oPresItemBasicPropertiesView.IsCriticalMed;
            }
            if (
              oPrescriptionItemView.oPresItemBasicPropertiesView
                .FormViewParameters != null &&
              oPrescriptionItemView.oPresItemBasicPropertiesView
                .FormViewParameters.IntravenousInfusionData != null
            ) {
              this.objDrugDetailsData.SeqPItemOIDs =
                oPrescriptionItemView.oPresItemBasicPropertiesView.FormViewParameters.IntravenousInfusionData.SequentialPrescriptionItemOIDs;
              if (
                !String.IsNullOrEmpty(
                  oPrescriptionItemView.oPresItemBasicPropertiesView
                    .FormViewParameters.IntravenousInfusionData.IsOnGoing
                ) &&
                String.Compare(
                  oPrescriptionItemView.oPresItemBasicPropertiesView
                    .FormViewParameters.IntravenousInfusionData.IsOnGoing,
                  'Y'
                ) == 0
              )
                this.objDrugDetailsData.Duration = 'Ongoing';
              if (
                String.Compare(
                  this.objDrugDetailsData.PresType,
                  PrescriptionTypes.Inpatient,
                  StringComparison.InvariantCultureIgnoreCase
                ) == 0 ||
                String.Compare(
                  this.objDrugDetailsData.PresType,
                  PrescriptionTypes.Foradministration,
                  StringComparison.InvariantCultureIgnoreCase
                ) == 0
              ) {
                this.objDrugDetailsData.IsReviewAfterDetailsVisible =
                  Visibility.Visible;
              } else {
                this.objDrugDetailsData.IsReviewAfterDetailsVisible =
                  Visibility.Collapsed;
              }
              if (
                !String.IsNullOrEmpty(
                  oPrescriptionItemView.oPresItemBasicPropertiesView
                    .FormViewParameters.ReviewAfter
                ) &&
                oPrescriptionItemView.oPresItemBasicPropertiesView
                  .FormViewParameters.ReviewAfterUOM != null &&
                !String.IsNullOrEmpty(
                  oPrescriptionItemView.oPresItemBasicPropertiesView
                    .FormViewParameters.ReviewAfterUOM.Name
                ) &&
                oPrescriptionItemView.oPresItemBasicPropertiesView
                  .FormViewParameters.ReviewAfterDTTM != null
              ) {
                let DrugDetailReviewafterDTTM: string;
                if (
                  oPrescriptionItemView.oPresItemBasicPropertiesView
                    .FormViewParameters.ReviewAfterDTTM.Year >= 1753
                ) {
                  this.objDrugDetailsData.ReviewAfterDTTM =
                    oPrescriptionItemView.oPresItemBasicPropertiesView.FormViewParameters.ReviewAfterDTTM;
                  DrugDetailReviewafterDTTM =
                    '(' +
                    this.objDrugDetailsData.ReviewAfterDTTM.ToString(
                      CConstants.LongDateWithoutSecs
                    ) +
                    ')';
                } else {
                  DrugDetailReviewafterDTTM = String.Empty;
                }
                this.objDrugDetailsData.Review =
                  oPrescriptionItemView.oPresItemBasicPropertiesView
                    .FormViewParameters.ReviewAfter +
                  ' ' +
                  oPrescriptionItemView.oPresItemBasicPropertiesView
                    .FormViewParameters.ReviewAfterUOM.Name +
                  ' ' +
                  DrugDetailReviewafterDTTM;
              }
              if (
                !String.IsNullOrEmpty(
                  oPrescriptionItemView.oPresItemBasicPropertiesView
                    .FormViewParameters.ReviewComments
                )
              ) {
                this.objDrugDetailsData.ReviewAfterComments =
                  oPrescriptionItemView.oPresItemBasicPropertiesView.FormViewParameters.ReviewComments;
              }
              this.objDrugDetailsData.IsReviewExists =
                oPrescriptionItemView.oPresItemBasicPropertiesView.FormViewParameters.IsReviewExists;
              this.objDrugDetailsData.Deliverydevice = !String.IsNullOrEmpty(
                oPrescriptionItemView.oPresItemBasicPropertiesView
                  .FormViewParameters.IntravenousInfusionData.DeliveryDevice
              )
                ? oPrescriptionItemView.oPresItemBasicPropertiesView
                  .FormViewParameters.IntravenousInfusionData.DeliveryDevice
                : String.Empty;
              this.objDrugDetailsData.Lumen = !String.IsNullOrEmpty(
                oPrescriptionItemView.oPresItemBasicPropertiesView
                  .FormViewParameters.IntravenousInfusionData.Lumen
              )
                ? oPrescriptionItemView.oPresItemBasicPropertiesView
                  .FormViewParameters.IntravenousInfusionData.Lumen
                : String.Empty;
              this.objDrugDetailsData.Maxdose = !String.IsNullOrEmpty(
                oPrescriptionItemView.oPresItemBasicPropertiesView
                  .FormViewParameters.IntravenousInfusionData.MaxDose
              )
                ? oPrescriptionItemView.oPresItemBasicPropertiesView
                  .FormViewParameters.IntravenousInfusionData.MaxDose
                : String.Empty;
              if (
                oPrescriptionItemView.oPresItemBasicPropertiesView
                  .FormViewParameters.IntravenousInfusionData
                  .TargetSaturationUpper == 0
              )
                this.objDrugDetailsData.Targetrange =
                  oPrescriptionItemView.oPresItemBasicPropertiesView
                    .FormViewParameters.IntravenousInfusionData
                    .TargetSaturationLower != 0
                    ? oPrescriptionItemView.oPresItemBasicPropertiesView.FormViewParameters.IntravenousInfusionData.TargetSaturationLower.ToString() +
                    ' %'
                    : String.Empty;
              else
                this.objDrugDetailsData.Targetrange =
                  oPrescriptionItemView.oPresItemBasicPropertiesView
                    .FormViewParameters.IntravenousInfusionData
                    .TargetSaturationLower != 0 &&
                    oPrescriptionItemView.oPresItemBasicPropertiesView
                      .FormViewParameters.IntravenousInfusionData
                      .TargetSaturationUpper != 0
                    ? oPrescriptionItemView.oPresItemBasicPropertiesView.FormViewParameters.IntravenousInfusionData.TargetSaturationLower.ToString() +
                    ' - ' +
                    oPrescriptionItemView.oPresItemBasicPropertiesView.FormViewParameters.IntravenousInfusionData.TargetSaturationUpper.ToString() +
                    ' %'
                    : String.Empty;
              if (!String.IsNullOrEmpty(this.objDrugDetailsData.Site))
                this.objDrugDetailsData.Site = this.objDrugDetailsData.Site;
              this.objDrugDetailsData.IsVisiblePrevious = 'Collapsed';
              this.objDrugDetailsData.IsVisibleNext = 'Collapsed';
            }
            let oIPPPresItemBasicView: IPPManagePrescSer.IPPPresItemBasicPropertiesView =
              ObjectHelper.CreateType<IPPManagePrescSer.IPPPresItemBasicPropertiesView>(
                oPrescriptionItemView.oPresItemBasicPropertiesView,
                IPPManagePrescSer.IPPPresItemBasicPropertiesView
              );
            if (oIPPPresItemBasicView != null) {
              if (!String.IsNullOrEmpty(oIPPPresItemBasicView.Strength))
                this.objDrugDetailsData.Strength =
                  oIPPPresItemBasicView.Strength;
              if (this.objAdditionalDetails.IsInfusion == true) {
                if (
                  oIPPPresItemBasicView.Route != null &&
                  !String.IsNullOrEmpty(oIPPPresItemBasicView.Route.Name)
                ) {
                  let strRouteArray: string[] =
                    oIPPPresItemBasicView.Route.Name.Split('~');
                  if (
                    strRouteArray != null &&
                    strRouteArray.length > 2 &&
                    String.Compare(strRouteArray[2], '1') == 0 &&
                    String.Compare(
                      this.objDrugDetailsData.ItemSubType,
                      DrugItemSubTypeCode.MEDICAL_GAS,
                      StringComparison.CurrentCultureIgnoreCase
                    ) != 0
                  ) {
                    this.objDrugDetailsData.Strength = String.Empty;
                  }
                }
              }
              if (!String.IsNullOrEmpty(oIPPPresItemBasicView.ScheduleTime)) {
                let arrStrTime: string[] = null;
                let Min: number;
                let time: TimeSpan;
                let strTime: string = String.Empty;
                let strbldTime: StringBuilder = new StringBuilder();
                arrStrTime = oIPPPresItemBasicView.ScheduleTime.Split(';');
                strbldTime.Append('Scheduled administration times - ');
                let dt: DateTime = CommonBB.GetServerDateTime();
                for (let iCnt: number = 0; iCnt < arrStrTime.length; iCnt++) {
                  if (!String.IsNullOrEmpty(arrStrTime[iCnt])) {
                    Min = Convert.ToDouble(arrStrTime[iCnt]);
                   /* time = TimeSpan.FromMinutes(Min);
                    strTime = SLDateUtility.GetServerDateTime()
                      .DateTime.Add(time)
                      .ToString('HH:mm');*/
                      dt = dt.DateTime.AddMinutes(Min);
    
                      strTime=  dt.ToString('HH:mm');
                    strbldTime.Append(strTime);
                    strbldTime.Append(',');
                  }
                }
                this.objDrugDetailsData.ScheduleTime = strbldTime
                  .Remove(strbldTime.Length - 1, 1)
                  .ToString();
              }
              if (
                oIPPPresItemBasicView.PRNInstruction != null &&
                oIPPPresItemBasicView.PRNInstruction.Count > 0
              ) {
                let ntotln: number = oIPPPresItemBasicView.PRNInstruction.Count;
                for (let nln: number = 0; nln < ntotln; nln++) {
                  this.objDrugDetailsData.PRNInstruction =
                    oIPPPresItemBasicView.PRNInstruction[nln].Name;
                }
              }
            }
            if (
              oPrescriptionItemView.oPresItemBasicPropertiesView.Problem != null
            ) {
              this.objDrugDetailsData.Problem = String.Empty;
              let strProblem: string =
                oPrescriptionItemView.oPresItemBasicPropertiesView.Problem[0].ToString();
              if (!String.IsNullOrEmpty(strProblem))
                this.objDrugDetailsData.Problem = strProblem.Substring(
                  0,
                  strProblem.length - 1
                );
            }
            if (
              oPrescriptionItemView.oPresItemAdditionalProperties != null &&
              oPrescriptionItemView.oPresItemAdditionalProperties
                .AdditionalComments != null
            )
              this.objDrugDetailsData.Addition =
                oPrescriptionItemView.oPresItemAdditionalProperties.AdditionalComments;
            if (
              oPrescriptionItemView.oPresItemBasicPropertiesView
                .AdminInstruction != null
            )
              this.objDrugDetailsData.AdminInsturction =
                oPrescriptionItemView.oPresItemBasicPropertiesView.AdminInstruction.Name;
            if (
              !String.IsNullOrEmpty(
                oPrescriptionItemView.oPresItemBasicPropertiesView
                  .TechSupplyInstruction
              ) &&
              String.Compare(
                oPrescriptionItemView.oPresItemBasicPropertiesView
                  .TechSupplyInstruction,
                'N'
              ) != 0
            ) {
              let oTechValSuplyInst: Dictionary<string, string> = null;
              if (
                !String.IsNullOrEmpty(
                  oPrescriptionItemView.oPresItemBasicPropertiesView
                    .TechSupplyInstruction
                )
              ) {
                let objTechValSuplyInst: string[] =
                  oPrescriptionItemView.oPresItemBasicPropertiesView.TechSupplyInstruction.Split(
                    ';'
                  );
                let TechCnt: number = objTechValSuplyInst.length;
                if (
                  oPrescriptionItemView.oPresItemBasicPropertiesView != null &&
                  oPrescriptionItemView.oPresItemBasicPropertiesView
                    .SupplyInstruction != null &&
                  oPrescriptionItemView.oPresItemBasicPropertiesView
                    .SupplyInstruction.Count > 0
                ) {
                  this.objDrugDetailsData.TechValSupplyInstructionText =
                    new ObservableCollection<CListItem>();
                  let CntSupply: number =
                    oPrescriptionItemView.oPresItemBasicPropertiesView
                      .SupplyInstruction.Count;
                  for (let i: number = 0; i < CntSupply; i++) {
                    if (
                      oPrescriptionItemView.oPresItemBasicPropertiesView
                        .SupplyInstruction[i] != null &&
                      !String.IsNullOrEmpty(
                        oPrescriptionItemView.oPresItemBasicPropertiesView
                          .SupplyInstruction[i].Code
                      )
                    ) {
                      if (oTechValSuplyInst == null)
                        oTechValSuplyInst = new Dictionary<string, string>();
                      if (
                        !oTechValSuplyInst.ContainsKey(
                          oPrescriptionItemView.oPresItemBasicPropertiesView
                            .SupplyInstruction[i].Code
                        )
                      ) {
                        this.objDrugDetailsData.TechValSupplyInstructionText.Add(
                          ObjectHelper.CreateObject(new CListItem(), {
                            Value:
                              oPrescriptionItemView.oPresItemBasicPropertiesView
                                .SupplyInstruction[i].Code,
                          })
                        );
                        oTechValSuplyInst.Add(
                          oPrescriptionItemView.oPresItemBasicPropertiesView
                            .SupplyInstruction[i].Code,
                          oPrescriptionItemView.oPresItemBasicPropertiesView
                            .SupplyInstruction[i].Code
                        );
                      }
                    }
                  }
                }
                if (TechCnt > 0) {
                  if (
                    oPrescriptionItemView.oPresItemBasicPropertiesView
                      .TechSupplyInstruction == null ||
                    this.objDrugDetailsData.TechValSupplyInstructionText == null
                  ) {
                    this.objDrugDetailsData.TechValSupplyInstructionText =
                      new ObservableCollection<CListItem>();
                  }
                  for (let cnt: number = 0; cnt < TechCnt; cnt++) {
                    if (oTechValSuplyInst == null)
                      oTechValSuplyInst = new Dictionary<string, string>();
                    if (
                      oTechValSuplyInst != null &&
                      oTechValSuplyInst.Count() > 0
                    ) {
                      if (
                        !oTechValSuplyInst.ContainsKey(objTechValSuplyInst[cnt])
                      ) {
                        this.objDrugDetailsData.TechValSupplyInstructionText.Add(
                          ObjectHelper.CreateObject(new CListItem(), {
                            Value: objTechValSuplyInst[cnt],
                          })
                        );
                        oTechValSuplyInst.Add(
                          objTechValSuplyInst[cnt],
                          objTechValSuplyInst[cnt]
                        );
                      }
                    } else {
                      if (objTechValSuplyInst[cnt] != null)
                        oTechValSuplyInst.Add(
                          objTechValSuplyInst[cnt],
                          objTechValSuplyInst[cnt]
                        );
                    }
                  }
                }
              }
            } else if (
              oPrescriptionItemView.oPresItemBasicPropertiesView != null &&
              oPrescriptionItemView.oPresItemBasicPropertiesView
                .SupplyInstruction != null &&
              oPrescriptionItemView.oPresItemBasicPropertiesView
                .SupplyInstruction.Count > 0
            ) {
              let oTechValSuplyInst: Dictionary<string, string> = null;
              this.objDrugDetailsData.TechValSupplyInstructionText =
                new ObservableCollection<CListItem>();
              let CntSupply: number =
                oPrescriptionItemView.oPresItemBasicPropertiesView
                  .SupplyInstruction.Count;
              for (let i: number = 0; i < CntSupply; i++) {
                if (
                  oPrescriptionItemView.oPresItemBasicPropertiesView
                    .SupplyInstruction[i] != null &&
                  !String.IsNullOrEmpty(
                    oPrescriptionItemView.oPresItemBasicPropertiesView
                      .SupplyInstruction[i].Code
                  )
                ) {
                  if (oTechValSuplyInst == null)
                    oTechValSuplyInst = new Dictionary<string, string>();
                  if (
                    !oTechValSuplyInst.ContainsKey(
                      oPrescriptionItemView.oPresItemBasicPropertiesView
                        .SupplyInstruction[i].Code
                    )
                  ) {
                    this.objDrugDetailsData.TechValSupplyInstructionText.Add(
                      ObjectHelper.CreateObject(new CListItem(), {
                        Value:
                          oPrescriptionItemView.oPresItemBasicPropertiesView
                            .SupplyInstruction[i].Code,
                      })
                    );
                    oTechValSuplyInst.Add(
                      oPrescriptionItemView.oPresItemBasicPropertiesView
                        .SupplyInstruction[i].Code,
                      oPrescriptionItemView.oPresItemBasicPropertiesView
                        .SupplyInstruction[i].Code
                    );
                  }
                }
              }
            }
          }
          if (
            oPrescriptionItemView.oPresItemBasicPropertiesView != null &&
            oPrescriptionItemView.oPresItemBasicPropertiesView.Statusflags !=
            null &&
            String.Compare(
              oPrescriptionItemView.oPresItemBasicPropertiesView.Statusflags.HasDoseCalculation.ToString(),
              '0'
            ) != 0
          ) {
            this.objDrugDetailsData.DoesCalcExist = 'Yes';
            if (
              String.Equals(this.IsDoseCalcExist, '1') ||
              String.Equals(this.IsDoseCalcExist, '2')
            ) {
              this.objDrugDetailsData.IsDoseCalcExists = this.IsDoseCalcExist;
            } else {
              if (
                PatientContext.PatLatHWDTTM >
                oPrescriptionItemView.oPresItemBasicPropertiesView.DCCalDTTM
              ) {
                this.objDrugDetailsData.IsDoseCalcExists = '2';
              } else {
                this.objDrugDetailsData.IsDoseCalcExists = '1';
              }
            }
          } else {
            this.objDrugDetailsData.DoesCalcExist = 'No';
          }
          this.objDrugDetailsData.UpdateHistoryVisible =
            oPrescriptionItemView != null &&
              oPrescriptionItemView.HavingUpdationHistory
              ? Visibility.Visible
              : Visibility.Collapsed;
          if (
            oPrescriptionItemView.oPresItemBasicPropertiesView != null &&
            oPrescriptionItemView.oPresItemBasicPropertiesView.Statusflags !=
            null &&
            String.Compare(
              oPrescriptionItemView.oPresItemBasicPropertiesView.Statusflags.HasWarnings.ToString(),
              '0'
            ) != 0
          ) {
            this.objDrugDetailsData.ConflictsExist = 'Yes';
          } else {
            this.objDrugDetailsData.ConflictsExist = 'No';
          }
          if (
            oPrescriptionItemView.oPresItemAdditionalProperties != null &&
            oPrescriptionItemView.oPresItemAdditionalProperties
              .MedClerkModifyReason != null &&
            oPrescriptionItemView.oPresItemAdditionalProperties
              .MedClerkModifyReason.Name != null
          ) {
            this.objDrugDetailsData.MedicationClerking =
              oPrescriptionItemView.oPresItemAdditionalProperties.MedClerkModifyReason.Name;
          }
          if (
            oPrescriptionItemView.oPresItemAdditionalProperties != null &&
            oPrescriptionItemView.oPresItemAdditionalProperties
              .MedClerkSource != null &&
            oPrescriptionItemView.oPresItemAdditionalProperties.MedClerkSource
              .Count > 0
          ) {
            let ntotln: number =
              oPrescriptionItemView.oPresItemAdditionalProperties.MedClerkSource
                .Count;
            this.objDrugDetailsData.MedicationClerkingSource = String.Empty;
            for (let nln: number = 0; nln < ntotln; nln++) {
              let desc: string = String.Empty;
              if (
                nln == ntotln - 1 &&
                this.IsConceptCodeExists(
                  oPrescriptionItemView.oPresItemAdditionalProperties
                    .MedClerkSource[nln].Code,
                  this.MedicationClerking,
                  (o) => {
                    desc = o;
                  }
                )
              ) {
                this.objDrugDetailsData.MedicationClerkingSource += desc;
              } else if (
                this.IsConceptCodeExists(
                  oPrescriptionItemView.oPresItemAdditionalProperties
                    .MedClerkSource[nln].Code,
                  this.MedicationClerking,
                  (o) => {
                    desc = o;
                  }
                )
              ) {
                this.objDrugDetailsData.MedicationClerkingSource += desc + ';';
              }
            }
          }
          if (oPrescriptionItemView.oPrescriptionItemAddnView != null) {
            if (
              oPrescriptionItemView.oPrescriptionItemAddnView.AmendDetails !=
              null &&
              oPrescriptionItemView.oPrescriptionItemAddnView.AmendDetails
                .AmendOfItemNo != null
            )
              this.objAdditionalDetails.AmendmentOf =
                oPrescriptionItemView.oPrescriptionItemAddnView.AmendDetails.AmendOfItemNo;
            if (
              oPrescriptionItemView.oPrescriptionItemAddnView.AmendDetails !=
              null &&
              oPrescriptionItemView.oPrescriptionItemAddnView.AmendDetails
                .ModifiedItemOID > 0
            )
              this.objAdditionalDetails.ModifiedItemOID =
                oPrescriptionItemView.oPrescriptionItemAddnView.AmendDetails.ModifiedItemOID;
            if (
              oPrescriptionItemView.oPrescriptionItemAddnView
                .AuthorisationDetails != null &&
              oPrescriptionItemView.oPrescriptionItemAddnView
                .AuthorisationDetails != null
            ) {
              if (
                oPrescriptionItemView.oPrescriptionItemAddnView
                  .AuthorisationDetails != null &&
                oPrescriptionItemView.oPrescriptionItemAddnView
                  .AuthorisationDetails.PerformedBy != null &&
                oPrescriptionItemView.oPrescriptionItemAddnView
                  .AuthorisationDetails.PerformedBy.Name != null
              )
                this.objDrugDetailsData.AuthorisedBy =
                  oPrescriptionItemView.oPrescriptionItemAddnView.AuthorisationDetails.PerformedBy.Name;
              if (
                oPrescriptionItemView.oPrescriptionItemAddnView
                  .AuthorisationDetails != null &&
                oPrescriptionItemView.oPrescriptionItemAddnView
                  .AuthorisationDetails.PerformedDTTM != null
              )
                this.objDrugDetailsData.AuthorisedDate =
                  oPrescriptionItemView.oPrescriptionItemAddnView
                    .AuthorisationDetails.PerformedDTTM == DateTime.MinValue
                    ? String.Empty
                    : oPrescriptionItemView.oPrescriptionItemAddnView.AuthorisationDetails.PerformedDTTM.ToString(
                      CConstants.LongDateWithoutSecs
                    );
              if (
                oPrescriptionItemView != null &&
                oPrescriptionItemView.oPrescriptionItemAddnView
                  .AuthorisationDetails != null &&
                !String.IsNullOrEmpty(
                  oPrescriptionItemView.oPrescriptionItemAddnView
                    .AuthorisationDetails.Comments
                )
              )
                this.objDrugDetailsData.AuthoriseComment =
                  oPrescriptionItemView.oPrescriptionItemAddnView.AuthorisationDetails.Comments;
            }
            if (!String.IsNullOrEmpty(this.objDrugDetailsData.AuthorisedBy))
              this.AuthoriseView = 'Visible';
            else this.AuthoriseView = 'Collapsed';
            if (
              oPrescriptionItemView.oPrescriptionItemAddnView
                .ClinicalVerificationDetails != null
            ) {
              this.objAdditionalDetails.ClinicallyVerifyComments =
                String.IsNullOrEmpty(
                  oPrescriptionItemView.oPrescriptionItemAddnView
                    .ClinicalVerificationDetails.Comments
                )
                  ? String.Empty
                  : oPrescriptionItemView.oPrescriptionItemAddnView
                    .ClinicalVerificationDetails.Comments;
              if (
                oPrescriptionItemView.oPrescriptionItemAddnView
                  .ClinicalVerificationDetails.PerformedBy != null &&
                !String.IsNullOrEmpty(
                  oPrescriptionItemView.oPrescriptionItemAddnView
                    .ClinicalVerificationDetails.CVStatusCode
                ) &&
                String.Equals(
                  oPrescriptionItemView.oPrescriptionItemAddnView
                    .ClinicalVerificationDetails.CVStatusCode,
                  CConstants.CLINICALLYVERIFIED,
                  StringComparison.InvariantCultureIgnoreCase
                )
              ) {
                this.objAdditionalDetails.IsClinVerVerfied = Visibility.Visible;
                this.objAdditionalDetails.ClinicallyVerified =
                  String.IsNullOrEmpty(
                    oPrescriptionItemView.oPrescriptionItemAddnView
                      .ClinicalVerificationDetails.PerformedBy.Name
                  )
                    ? String.Empty
                    : oPrescriptionItemView.oPrescriptionItemAddnView
                      .ClinicalVerificationDetails.PerformedBy.Name;
                this.objAdditionalDetails.ClinicallyDate =
                  oPrescriptionItemView.oPrescriptionItemAddnView
                    .ClinicalVerificationDetails.PerformedDTTM ==
                    DateTime.MinValue
                    ? String.Empty
                    : oPrescriptionItemView.oPrescriptionItemAddnView.ClinicalVerificationDetails.PerformedDTTM.ConvertToUser(
                      (o1) => {
                        this.IsDST = o1;
                      },
                      (o2) => {
                        this.IsAmbiguous = o2;
                      },
                      (o3) => {
                        this.IsInvalid = o3;
                      }
                    ).ToDateTimeString(
                      this.IsDST,
                      this.IsAmbiguous,
                      CConstants.LongDateWithoutSecs
                    );
              } else {
                this.objAdditionalDetails.IsClinVerVerfied =
                  Visibility.Collapsed;
              }
              if (
                oPrescriptionItemView.oPrescriptionItemAddnView
                  .ClinicalVerificationDetails.IsClinicalVerHisLink
              )
                this.objAdditionalDetails.IsClinVerHisLinkExists =
                  Visibility.Visible;
              else
                this.objAdditionalDetails.IsClinVerHisLinkExists =
                  Visibility.Collapsed;
              if (
                oPrescriptionItemView.oPrescriptionItemAddnView
                  .ClinicalVerificationDetails.VerifyOnBehalf != null
              ) {
                if (
                  oPrescriptionItemView.oPrescriptionItemAddnView
                    .ClinicalVerificationDetails.VerifyOnBehalf
                    .OnBehalfOfUser != null
                ) {
                  this.objAdditionalDetails.OnBehalfOf =
                    oPrescriptionItemView.oPrescriptionItemAddnView.ClinicalVerificationDetails.VerifyOnBehalf.OnBehalfOfUser.Name;
                  this.objAdditionalDetails.CommunicationMode =
                    oPrescriptionItemView.oPrescriptionItemAddnView.ClinicalVerificationDetails.VerifyOnBehalf.CommunicationMode;
                  this.objAdditionalDetails.OnBehalfOfReason =
                    oPrescriptionItemView.oPrescriptionItemAddnView.ClinicalVerificationDetails.VerifyOnBehalf.OnBehalfOfUserReason;
                }
              }
            }
            if (!isAmendObjNull) {
              if (
                oPrescriptionItemView.oPrescriptionItemAddnView.AmendDetails !=
                null
              ) {
                if (
                  oPrescriptionItemView.oPrescriptionItemAddnView.AmendDetails
                    .PerformedBy != null &&
                  oPrescriptionItemView.oPrescriptionItemAddnView.AmendDetails
                    .PerformedBy.Name != null
                )
                  this.objAdditionalDetails.AmendmentBy =
                    oPrescriptionItemView.oPrescriptionItemAddnView.AmendDetails.PerformedBy.Name;
                if (
                  oPrescriptionItemView.oPrescriptionItemAddnView.AmendDetails
                    .PerformedDTTM != Convert.ToDateTime(null)
                )
                  this.objAdditionalDetails.AmendmentDate =
                    oPrescriptionItemView.oPrescriptionItemAddnView.AmendDetails
                      .PerformedDTTM == DateTime.MinValue
                      ? String.Empty
                      : oPrescriptionItemView.oPrescriptionItemAddnView.AmendDetails.PerformedDTTM.ConvertToUser(
                        (o1) => {
                          this.IsDST = o1;
                        },
                        (o2) => {
                          this.IsAmbiguous = o2;
                        },
                        (o3) => {
                          this.IsInvalid = o3;
                        }
                      ).ToDateTimeString(
                        this.IsDST,
                        this.IsAmbiguous,
                        CConstants.LongDateWithoutSecs
                      );
                this.objAdditionalDetails.AmendmentReason =
                  oPrescriptionItemView.oPrescriptionItemAddnView.AmendDetails.ReasonForModification;
                this.objAdditionalDetails.AmendmentComments =
                  oPrescriptionItemView.oPrescriptionItemAddnView.AmendDetails.Comments;
              }
            }
          }
          if (!isCanDisObjNull) {
            if (
              oPrescriptionItemView.oPrescriptionItemAddnView != null &&
              oPrescriptionItemView.oPrescriptionItemAddnView
                .CancelDiscontinueDetails != null
            ) {
              this.objAdditionalDetails.CancelReason =
                oPrescriptionItemView.oPrescriptionItemAddnView.CancelDiscontinueDetails.Comments;
              if (
                this.objAdditionalDetails != null &&
                !String.IsNullOrEmpty(this.objAdditionalDetails.CancelReason)
              ) {
                if (
                  oPrescriptionItemView.oPrescriptionItemAddnView
                    .CancelDiscontinueDetails.PerformedDTTM != null &&
                  oPrescriptionItemView.oPrescriptionItemAddnView
                    .CancelDiscontinueDetails.PerformedDTTM != DateTime.MinValue
                )
                  this.objAdditionalDetails.CancelDate =
                    oPrescriptionItemView.oPrescriptionItemAddnView.CancelDiscontinueDetails.PerformedDTTM.ConvertToUser(
                      (o1) => {
                        this.IsDST = o1;
                      },
                      (o2) => {
                        this.IsAmbiguous = o2;
                      },
                      (o3) => {
                        this.IsInvalid = o3;
                      }
                    ).ToDateTimeString(
                      this.IsDST,
                      this.IsAmbiguous,
                      CConstants.LongDateWithoutSecs
                    );
                if (
                  oPrescriptionItemView.oPrescriptionItemAddnView
                    .CancelDiscontinueDetails.PerformedBy != null
                )
                  this.objAdditionalDetails.CancelBy =
                    oPrescriptionItemView.oPrescriptionItemAddnView.CancelDiscontinueDetails.PerformedBy.Name;
              }
              if (
                oPrescriptionItemView.oPrescriptionItemAddnView
                  .CancelDiscontinueDetails.VerifyOnBehalf != null &&
                oPrescriptionItemView.oPrescriptionItemAddnView
                  .CancelDiscontinueDetails.VerifyOnBehalf.OnBehalfOfUser !=
                null
              ) {
                this.objAdditionalDetails.IsOnbehalfLinkExists =
                  Visibility.Visible;
                this.objAdditionalDetails.OnBehalfOf =
                  oPrescriptionItemView.oPrescriptionItemAddnView.CancelDiscontinueDetails.VerifyOnBehalf.OnBehalfOfUser.Name;
                if (
                  !String.IsNullOrEmpty(
                    oPrescriptionItemView.oPrescriptionItemAddnView
                      .CancelDiscontinueDetails.VerifyOnBehalf
                      .OnBehalfOfUserReason
                  )
                ) {
                  this.objAdditionalDetails.OnBehalfOfReason =
                    oPrescriptionItemView.oPrescriptionItemAddnView.CancelDiscontinueDetails.VerifyOnBehalf.OnBehalfOfUserReason;
                }
                this.objAdditionalDetails.CommunicationMode =
                  oPrescriptionItemView.oPrescriptionItemAddnView.CancelDiscontinueDetails.VerifyOnBehalf.CommunicationMode;
              }
            }
          }
          if (!String.IsNullOrEmpty(this.objAdditionalDetails.OnBehalfOf))
            this.objAdditionalDetails.IsOnbehalfLinkExists = Visibility.Visible;
          else
            this.objAdditionalDetails.IsOnbehalfLinkExists =
              Visibility.Collapsed;
          if (this.objAdditionalDetails.IsPGD == '1') {
            if (
              String.Equals(
                oPrescriptionItemView.oPresItemBasicPropertiesView.DrugStatus,
                'CANCELLED',
                StringComparison.InvariantCultureIgnoreCase
              )
            ) {
              this.objDrugDetailsData.Status = prescribedrugs.PGDCancelled;
            }
            if (
              String.Equals(
                oPrescriptionItemView.oPresItemBasicPropertiesView.DrugStatus,
                'completed',
                StringComparison.InvariantCultureIgnoreCase
              )
            ) {
              this.objDrugDetailsData.Status = prescribedrugs.PGDCompleted;
            }
          }
          if (
            String.Compare(
              this.objDrugDetailsData.Status,
              'DISCONTINUED',
              StringComparison.OrdinalIgnoreCase
            ) == 0
          )
            this.objAdditionalDetails.CancelDisconText =
              Resource.DrugDetails.Discontinuation_Header;
          else
            this.objAdditionalDetails.CancelDisconText =
              Resource.DrugDetails.Cancellation_Header;
          if (
            !String.IsNullOrEmpty(this.objDrugDetailsData.PresType) &&
            String.Compare(
              this.objDrugDetailsData.PresType,
              PrescriptionTypes.Clerking
            ) == 0
          ) {
            if (
              String.Compare(
                this.objDrugDetailsData.Status,
                'CANCELLED',
                StringComparison.OrdinalIgnoreCase
              ) == 0 ||
              (String.Compare(
                this.objDrugDetailsData.Status,
                'SUBMITTED',
                StringComparison.OrdinalIgnoreCase
              ) == 0 &&
                String.IsNullOrEmpty(this.objAdditionalDetails.CancelReason))
            )
              this.objAdditionalDetails.CancelDisconText =
                Resource.DrugDetails.Cancellation_Header;
            else
              this.objAdditionalDetails.CancelDisconText =
                Resource.DrugDetails.Discontinuation_Header;
          }
          if (
            oPrescriptionItemView.oPresItemBasicPropertiesView != null &&
            oPrescriptionItemView.oPresItemBasicPropertiesView
              .FormViewParameters != null
          ) {
            this.objDrugDetailsData.InfusionDetails = new InfusionLineItemVM();
            this.objDrugDetailsData.InfusionDetails.InfusionType =
              new CListItem();
            this.objDrugDetailsData.InfusionDetails.InfusionType.Value =
              oPrescriptionItemView.oPresItemBasicPropertiesView.FormViewParameters.INFTYCODE;
            this.objDrugDetailsData.InfusionDetails.InfusionType.DisplayText =
              CommonBB.GetText(
                oPrescriptionItemView.oPresItemBasicPropertiesView
                  .FormViewParameters.INFTYCODE,
                this.InfusionTypeConceptCodes
              );
            this.objDrugDetailsData.InfusionDetails.DeliveryDeviceFreetext =
              !String.IsNullOrEmpty(
                oPrescriptionItemView.oPresItemBasicPropertiesView
                  .FormViewParameters.IntravenousInfusionData.DeliveryDevice
              )
                ? oPrescriptionItemView.oPresItemBasicPropertiesView
                  .FormViewParameters.IntravenousInfusionData.DeliveryDevice
                : String.Empty;
            if (
              oPrescriptionItemView.oPresItemBasicPropertiesView
                .FormViewParameters.AdminDeviceData != null
            ) {
              this.objDrugDetailsData.InfusionDetails.BackgroundRate =
                oPrescriptionItemView.oPresItemBasicPropertiesView.FormViewParameters.AdminDeviceData.BackgroundRate;
              if (
                oPrescriptionItemView.oPresItemBasicPropertiesView
                  .FormViewParameters.AdminDeviceData.BackgroundRateUOM !=
                null &&
                !String.IsNullOrEmpty(
                  oPrescriptionItemView.oPresItemBasicPropertiesView
                    .FormViewParameters.AdminDeviceData.BackgroundRateUOM
                    .UOMName
                )
              ) {
                this.objDrugDetailsData.InfusionDetails.BackgroundRateNumeratorUom =
                  ObjectHelper.CreateObject(new CListItem(), {
                    DisplayText:
                      oPrescriptionItemView.oPresItemBasicPropertiesView
                        .FormViewParameters.AdminDeviceData.BackgroundRateUOM
                        .UOMName,
                    Value:
                      oPrescriptionItemView.oPresItemBasicPropertiesView.FormViewParameters.AdminDeviceData.BackgroundRateUOM.UOMId.ToString(),
                  });
              }
              if (
                oPrescriptionItemView.oPresItemBasicPropertiesView
                  .FormViewParameters.AdminDeviceData
                  .BackgroundRateDenaminatorUOM != null &&
                !String.IsNullOrEmpty(
                  oPrescriptionItemView.oPresItemBasicPropertiesView
                    .FormViewParameters.AdminDeviceData
                    .BackgroundRateDenaminatorUOM.UOMName
                )
              ) {
                this.objDrugDetailsData.InfusionDetails.BackgroundRateDinominatorUom =
                  ObjectHelper.CreateObject(new CListItem(), {
                    DisplayText:
                      oPrescriptionItemView.oPresItemBasicPropertiesView.FormViewParameters.AdminDeviceData.BackgroundRateDenaminatorUOM.UOMName.ToString(),
                    Value:
                      oPrescriptionItemView.oPresItemBasicPropertiesView.FormViewParameters.AdminDeviceData.BackgroundRateDenaminatorUOM.UOMId.ToString(),
                  });
              }
              this.objDrugDetailsData.InfusionDetails.MonitoringPeriod =
                oPrescriptionItemView.oPresItemBasicPropertiesView.FormViewParameters.AdminDeviceData.MonitorPeriod;
              if (
                oPrescriptionItemView.oPresItemBasicPropertiesView
                  .FormViewParameters.AdminDeviceData.MonitorPeriodUOM !=
                null &&
                !String.IsNullOrEmpty(
                  oPrescriptionItemView.oPresItemBasicPropertiesView
                    .FormViewParameters.AdminDeviceData.MonitorPeriodUOM.UOMName
                )
              ) {
                this.objDrugDetailsData.InfusionDetails.MonitoringPeriodUOM =
                  ObjectHelper.CreateObject(new CListItem(), {
                    DisplayText:
                      oPrescriptionItemView.oPresItemBasicPropertiesView
                        .FormViewParameters.AdminDeviceData.MonitorPeriodUOM
                        .UOMName,
                    Value:
                      oPrescriptionItemView.oPresItemBasicPropertiesView.FormViewParameters.AdminDeviceData.MonitorPeriodUOM.UOMId.ToString(),
                  });
              }
              if (
                !String.IsNullOrEmpty(
                  oPrescriptionItemView.oPresItemBasicPropertiesView
                    .FormViewParameters.AdminDeviceData.TopUpDose
                ) &&
                oPrescriptionItemView.oPresItemBasicPropertiesView
                  .FormViewParameters.AdminDeviceData.TopUpDoseUOM != null
              ) {
                this.objDrugDetailsData.InfusionDetails.Bolus =
                  oPrescriptionItemView.oPresItemBasicPropertiesView.FormViewParameters.AdminDeviceData.TopUpDose;
                this.objDrugDetailsData.InfusionDetails.BolusUOM =
                  ObjectHelper.CreateObject(new CListItem(), {
                    DisplayText:
                      oPrescriptionItemView.oPresItemBasicPropertiesView
                        .FormViewParameters.AdminDeviceData.TopUpDoseUOM
                        .UOMName,
                    Value:
                      oPrescriptionItemView.oPresItemBasicPropertiesView.FormViewParameters.AdminDeviceData.TopUpDoseUOM.UOMId.ToString(),
                  });
              }
              if (
                !String.IsNullOrEmpty(
                  oPrescriptionItemView.oPresItemBasicPropertiesView
                    .FormViewParameters.AdminDeviceData.BoosterDose
                ) &&
                oPrescriptionItemView.oPresItemBasicPropertiesView
                  .FormViewParameters.AdminDeviceData.BoosterDoseUOM != null
              ) {
                this.objDrugDetailsData.InfusionDetails.Boosterdose =
                  oPrescriptionItemView.oPresItemBasicPropertiesView.FormViewParameters.AdminDeviceData.BoosterDose;
                this.objDrugDetailsData.InfusionDetails.Boosterdoseuom =
                  ObjectHelper.CreateObject(new CListItem(), {
                    DisplayText:
                      oPrescriptionItemView.oPresItemBasicPropertiesView
                        .FormViewParameters.AdminDeviceData.BoosterDoseUOM
                        .UOMName,
                    Value:
                      oPrescriptionItemView.oPresItemBasicPropertiesView.FormViewParameters.AdminDeviceData.BoosterDoseUOM.UOMId.ToString(),
                  });
              }
              this.objDrugDetailsData.InfusionDetails.LockOutPeriod =
                oPrescriptionItemView.oPresItemBasicPropertiesView.FormViewParameters.AdminDeviceData.LockOutPeriod;
              this.objDrugDetailsData.InfusionDetails.LockoutDuration =
                ObjectHelper.CreateObject(new CListItem(), {
                  DisplayText:
                    oPrescriptionItemView.oPresItemBasicPropertiesView
                      .FormViewParameters.AdminDeviceData.LockOutPeriodUOM
                      .UOMName,
                  Value:
                    oPrescriptionItemView.oPresItemBasicPropertiesView.FormViewParameters.AdminDeviceData.LockOutPeriodUOM.UOMId.ToString(),
                });
            }
            let IsInfuroute: string = String.Empty;
            if (
              oPrescriptionItemView.oPresItemBasicPropertiesView != null &&
              oPrescriptionItemView.oPresItemBasicPropertiesView.Route !=
              null &&
              !String.IsNullOrEmpty(
                oPrescriptionItemView.oPresItemBasicPropertiesView.Route.Name
              )
            ) {
              IsInfuroute = MedicationCommonBB.RouteTag(
                oPrescriptionItemView.oPresItemBasicPropertiesView.Route.Name
              );
            }
            if (
              !String.IsNullOrEmpty(IsInfuroute) &&
              IsInfuroute.Contains('1') &&
              String.IsNullOrEmpty(
                oPrescriptionItemView.oPresItemBasicPropertiesView
                  .FormViewParameters.INFTYCODE
              )
            ) {
              this.objDrugDetailsData.InfusionDetails.IsInfContiniousFormLoaded =
                true;
            }
            if (
              oPrescriptionItemView.oPresItemBasicPropertiesView != null &&
              oPrescriptionItemView.oPresItemBasicPropertiesView
                .FormViewParameters != null &&
              oPrescriptionItemView.oPresItemBasicPropertiesView
                .FormViewParameters.IntravenousInfusionData != null
            ) {
              this.objDrugDetailsData.InfusionDetails.TargetUpperSatRange =
                oPrescriptionItemView.oPresItemBasicPropertiesView.FormViewParameters.IntravenousInfusionData.TargetSaturationUpper;
              this.objDrugDetailsData.InfusionDetails.TargetLowerSatRange =
                oPrescriptionItemView.oPresItemBasicPropertiesView.FormViewParameters.IntravenousInfusionData.TargetSaturationLower;
              this.objDrugDetailsData.InfusionDetails.MaxDose =
                oPrescriptionItemView.oPresItemBasicPropertiesView.FormViewParameters.IntravenousInfusionData.MaxDose;
              this.objDrugDetailsData.InfusionDetails.Lumen =
                oPrescriptionItemView.oPresItemBasicPropertiesView.FormViewParameters.IntravenousInfusionData.Lumen;
              if (
                oPrescriptionItemView.oPresItemBasicPropertiesView
                  .FormViewParameters.IntravenousInfusionData.IsOxygen == '1'
              )
                this.objDrugDetailsData.InfusionDetails.IsOxygen = true;
              else this.objDrugDetailsData.InfusionDetails.IsOxygen = false;
              if (
                !String.IsNullOrEmpty(
                  oPrescriptionItemView.oPresItemBasicPropertiesView
                    .FormViewParameters.IntravenousInfusionData.IsOnGoing
                )
              )
                this.objDrugDetailsData.InfusionDetails.IsOnGoing =
                  oPrescriptionItemView.oPresItemBasicPropertiesView.FormViewParameters.IntravenousInfusionData.IsOnGoing;
              else
                this.objDrugDetailsData.InfusionDetails.IsOnGoing =
                  String.Empty;
              this.objDrugDetailsData.InfusionDetails.ReviewafterDTTM =
                oPrescriptionItemView.oPresItemBasicPropertiesView.FormViewParameters.ReviewAfterDTTM;
              this.objDrugDetailsData.InfusionDetails.ConcentrationFreeText =
                oPrescriptionItemView.oPresItemBasicPropertiesView.FormViewParameters.IntravenousInfusionData.Concentration.ToString();
              this.objDrugDetailsData.InfusionDetails.Rate =
                oPrescriptionItemView.oPresItemBasicPropertiesView.FormViewParameters.IntravenousInfusionData.Rate;
              this.objDrugDetailsData.InfusionDetails.UpperRate =
                oPrescriptionItemView.oPresItemBasicPropertiesView.FormViewParameters.IntravenousInfusionData.UpperRate;
              if (
                oPrescriptionItemView.oPresItemBasicPropertiesView
                  .FormViewParameters.IntravenousInfusionData.RateUOM != null &&
                !String.IsNullOrEmpty(
                  oPrescriptionItemView.oPresItemBasicPropertiesView
                    .FormViewParameters.IntravenousInfusionData.RateUOM.UOMName
                )
              ) {
                this.objDrugDetailsData.InfusionDetails.InfRateNumeratorUom =
                  ObjectHelper.CreateObject(new CListItem(), {
                    DisplayText:
                      oPrescriptionItemView.oPresItemBasicPropertiesView
                        .FormViewParameters.IntravenousInfusionData.RateUOM
                        .UOMName,
                    Value:
                      oPrescriptionItemView.oPresItemBasicPropertiesView.FormViewParameters.IntravenousInfusionData.RateUOM.UOMId.ToString(),
                  });
              }
              if (
                oPrescriptionItemView.oPresItemBasicPropertiesView
                  .FormViewParameters.IntravenousInfusionData
                  .RateDenominatorUOM != null &&
                !String.IsNullOrEmpty(
                  oPrescriptionItemView.oPresItemBasicPropertiesView
                    .FormViewParameters.IntravenousInfusionData
                    .RateDenominatorUOM.UOMName
                )
              ) {
                this.objDrugDetailsData.InfusionDetails.InfRateDinominatorUom =
                  ObjectHelper.CreateObject(new CListItem(), {
                    DisplayText:
                      oPrescriptionItemView.oPresItemBasicPropertiesView.FormViewParameters.IntravenousInfusionData.RateDenominatorUOM.UOMName.ToString(),
                    Value:
                      oPrescriptionItemView.oPresItemBasicPropertiesView.FormViewParameters.IntravenousInfusionData.RateDenominatorUOM.UOMId.ToString(),
                  });
              }
              if (
                !String.IsNullOrEmpty(
                  oPrescriptionItemView.oPresItemBasicPropertiesView
                    .FormViewParameters.IntravenousInfusionData.LowConcentration
                )
              )
                this.objDrugDetailsData.InfusionDetails.LowConcentration =
                  oPrescriptionItemView.oPresItemBasicPropertiesView.FormViewParameters.IntravenousInfusionData.LowConcentration.ToString();
              if (
                !String.IsNullOrEmpty(
                  oPrescriptionItemView.oPresItemBasicPropertiesView
                    .FormViewParameters.IntravenousInfusionData
                    .UpperConcentration
                )
              )
                this.objDrugDetailsData.InfusionDetails.UpperConcentration =
                  oPrescriptionItemView.oPresItemBasicPropertiesView.FormViewParameters.IntravenousInfusionData.UpperConcentration.ToString();
              if (
                oPrescriptionItemView.oPresItemBasicPropertiesView
                  .FormViewParameters.IntravenousInfusionData
                  .LowConcentrationUOMOID != null &&
                !String.IsNullOrEmpty(
                  oPrescriptionItemView.oPresItemBasicPropertiesView
                    .FormViewParameters.IntravenousInfusionData
                    .LowConcentrationUOMOID.UOMName
                )
              ) {
                this.objDrugDetailsData.InfusionDetails.LowConcentrationUOM =
                  ObjectHelper.CreateObject(new CListItem(), {
                    DisplayText:
                      oPrescriptionItemView.oPresItemBasicPropertiesView
                        .FormViewParameters.IntravenousInfusionData
                        .LowConcentrationUOMOID.UOMName,
                    Value:
                      oPrescriptionItemView.oPresItemBasicPropertiesView.FormViewParameters.IntravenousInfusionData.LowConcentrationUOMOID.UOMId.ToString(),
                  });
              }
              if (
                oPrescriptionItemView.oPresItemBasicPropertiesView
                  .FormViewParameters.IntravenousInfusionData
                  .UpperConcentrationUOMOID != null &&
                !String.IsNullOrEmpty(
                  oPrescriptionItemView.oPresItemBasicPropertiesView
                    .FormViewParameters.IntravenousInfusionData
                    .UpperConcentrationUOMOID.UOMName
                )
              ) {
                this.objDrugDetailsData.InfusionDetails.UpperConcentrationUOM =
                  ObjectHelper.CreateObject(new CListItem(), {
                    DisplayText:
                      oPrescriptionItemView.oPresItemBasicPropertiesView.FormViewParameters.IntravenousInfusionData.UpperConcentrationUOMOID.UOMName.ToString(),
                    Value:
                      oPrescriptionItemView.oPresItemBasicPropertiesView.FormViewParameters.IntravenousInfusionData.UpperConcentrationUOMOID.UOMId.ToString(),
                  });
              }
              if (
                !String.IsNullOrEmpty(
                  oPrescriptionItemView.oPresItemBasicPropertiesView
                    .FormViewParameters.IntravenousInfusionData.InfusionPeriod
                )
              )
                this.objDrugDetailsData.InfusionDetails.InfusionPeriod =
                  Convert.ToInt64(
                    oPrescriptionItemView.oPresItemBasicPropertiesView
                      .FormViewParameters.IntravenousInfusionData.InfusionPeriod
                  );
              if (
                oPrescriptionItemView.oPresItemBasicPropertiesView
                  .FormViewParameters.IntravenousInfusionData
                  .InfusionPeriodUOM != null &&
                !String.IsNullOrEmpty(
                  oPrescriptionItemView.oPresItemBasicPropertiesView
                    .FormViewParameters.IntravenousInfusionData
                    .InfusionPeriodUOM.UOMName
                )
              ) {
                this.objDrugDetailsData.InfusionDetails.InfusionPeriodUom =
                  ObjectHelper.CreateObject(new CListItem(), {
                    DisplayText:
                      oPrescriptionItemView.oPresItemBasicPropertiesView
                        .FormViewParameters.IntravenousInfusionData
                        .InfusionPeriodUOM.UOMName,
                    Value:
                      oPrescriptionItemView.oPresItemBasicPropertiesView.FormViewParameters.IntravenousInfusionData.InfusionPeriodUOM.UOMId.ToString(),
                  });
              }
              if (
                oPrescriptionItemView.oPresItemBasicPropertiesView
                  .FormViewParameters.IntravenousInfusionData.Fluid != null &&
                oPrescriptionItemView.oPresItemBasicPropertiesView
                  .FormViewParameters.IntravenousInfusionData.Fluid.OID > 0
              ) {
                this.objDrugDetailsData.InfusionDetails.FluidSelectvalue =
                  ObjectHelper.CreateObject(new CListItem(), {
                    DisplayText:
                      oPrescriptionItemView.oPresItemBasicPropertiesView
                        .FormViewParameters.IntravenousInfusionData.Fluid.Name,
                    Value:
                      oPrescriptionItemView.oPresItemBasicPropertiesView.FormViewParameters.IntravenousInfusionData.Fluid.OID.ToString(),
                  });
              } else {
                this.objDrugDetailsData.InfusionDetails.FluidFreetext =
                  oPrescriptionItemView.oPresItemBasicPropertiesView.FormViewParameters.IntravenousInfusionData.Fluid.Name;
              }
              this.objDrugDetailsData.InfusionDetails.FluidVolume =
                oPrescriptionItemView.oPresItemBasicPropertiesView.FormViewParameters.IntravenousInfusionData.Volume;
              if (
                oPrescriptionItemView.oPresItemBasicPropertiesView
                  .FormViewParameters.IntravenousInfusionData.VolumeUOM !=
                null &&
                !String.IsNullOrEmpty(
                  oPrescriptionItemView.oPresItemBasicPropertiesView
                    .FormViewParameters.IntravenousInfusionData.VolumeUOM
                    .UOMName
                )
              ) {
                this.objDrugDetailsData.InfusionDetails.VolumeUOM =
                  ObjectHelper.CreateObject(new CListItem(), {
                    DisplayText:
                      oPrescriptionItemView.oPresItemBasicPropertiesView
                        .FormViewParameters.IntravenousInfusionData.VolumeUOM
                        .UOMName,
                    Value:
                      oPrescriptionItemView.oPresItemBasicPropertiesView.FormViewParameters.IntravenousInfusionData.VolumeUOM.UOMId.ToString(),
                  });
              }
              this.objDrugDetailsData.InfusionDetails.Humidification =
                oPrescriptionItemView.oPresItemBasicPropertiesView.FormViewParameters.IntravenousInfusionData.HUMIDCode;
              if (
                !String.IsNullOrEmpty(
                  oPrescriptionItemView.oPresItemBasicPropertiesView
                    .FormViewParameters.IntravenousInfusionData.Rate
                ) &&
                oPrescriptionItemView.oPresItemBasicPropertiesView
                  .FormViewParameters.IntravenousInfusionData.RateUOM != null &&
                !String.IsNullOrEmpty(
                  oPrescriptionItemView.oPresItemBasicPropertiesView
                    .FormViewParameters.IntravenousInfusionData.RateUOM.UOMName
                ) &&
                oPrescriptionItemView.oPresItemBasicPropertiesView
                  .FormViewParameters.IntravenousInfusionData
                  .RateDenominatorUOM != null &&
                !String.IsNullOrEmpty(
                  oPrescriptionItemView.oPresItemBasicPropertiesView
                    .FormViewParameters.IntravenousInfusionData
                    .RateDenominatorUOM.UOMName
                )
              ) {
                let upperVal;
                if (oPrescriptionItemView.oPresItemBasicPropertiesView
                  .FormViewParameters.IntravenousInfusionData.UpperRate!=undefined && oPrescriptionItemView.oPresItemBasicPropertiesView
                  .FormViewParameters.IntravenousInfusionData.UpperRate!="" && oPrescriptionItemView.oPresItemBasicPropertiesView
                  .FormViewParameters.IntravenousInfusionData.UpperRate!=null) {
                    upperVal = " - ";
                } else {
                  upperVal = "";
                }
                this.objDrugDetailsData.InfusionDetails.InfusionRate = `${oPrescriptionItemView.oPresItemBasicPropertiesView
                  .FormViewParameters.IntravenousInfusionData.Rate} ${upperVal} ${oPrescriptionItemView.oPresItemBasicPropertiesView
                    .FormViewParameters.IntravenousInfusionData.UpperRate} ${oPrescriptionItemView.oPresItemBasicPropertiesView
                      .FormViewParameters.IntravenousInfusionData.RateUOM
                      .UOMName}/${oPrescriptionItemView.oPresItemBasicPropertiesView
                        .FormViewParameters.IntravenousInfusionData
                        .RateDenominatorUOM.UOMName}`
              }
              if (
                !String.IsNullOrEmpty(
                  oPrescriptionItemView.oPresItemBasicPropertiesView
                    .FormViewParameters.IntravenousInfusionData.RoundOffText
                )
              ) {
                this.objDrugDetailsData.InfusionDetails.RoundedOffTo =
                  '(Rounded to ' +
                  oPrescriptionItemView.oPresItemBasicPropertiesView
                    .FormViewParameters.IntravenousInfusionData.RoundOffText +
                  ')';
              }
            }
          }
        }
        nCnt++;
      });
      if (
        !String.IsNullOrEmpty(this.objDrugDetailsData.PresType) &&
        String.Compare(
          this.objDrugDetailsData.PresType,
          PrescriptionTypes.Clerking
        ) == 0
      ) {
        this.objAdditionalDetails.PrescribedByText =
          Resource.DrugDetails.ClerkedBy_Header;
        this.objAdditionalDetails.PrescribedOnText =
          Resource.DrugDetails.RecordedAt_Header;
        this.objDrugDetailsData.StartDateText =
          Resource.DrugDetails.lblDateCommenced_Text;
        this.MedClrSrcView = 'Visible';
        this.MedClrSrcRsn = 'Collapsed';
        this.AuthoriseView = 'Collapsed';
      } else {
        this.objDrugDetailsData.StartDateText =
          Resource.DrugDetails.lblStartDateName_Text;
        if (this.objAdditionalDetails.IsPGD == '1') {
          this.objAdditionalDetails.PrescribedByText =
            Resource.DrugDetails.RecordedBy_Header;
          this.objAdditionalDetails.PrescribedOnText =
            Resource.DrugDetails.RecordedAt_Header;
          if (
            String.Compare(
              this.objDrugDetailsData.PresType,
              PrescriptionTypes.ForAdministration
            ) != 0
          ) {
            this.objAdditionalDetails.PrescriptionText =
              Resource.DrugDetails.PGDSupply_Header;
          } else {
            this.objAdditionalDetails.PrescriptionText =
              Resource.DrugDetails.PGDAdmin_Header;
            this.objDrugDetailsData.StartDateText = 'Administered on';
          }
        } else {
          this.objAdditionalDetails.PrescribedByText =
            Resource.DrugDetails.lblPrescribedBy_Text;
          this.objAdditionalDetails.PrescribedOnText =
            Resource.DrugDetails.lblPrescribedOn_Text;
        }
        this.MedClrSrcView = 'Collapsed';
        this.MedClrSrcRsn = 'Visible';
      }
      this.DrugDetails = this.objDrugDetailsData;
      this.AdditionalDetails = this.objAdditionalDetails;
    }
  }


  bIsSteepedWinOpen: boolean = false;
  img1_MouseLeftButtonUp(sender: Object, e: MouseButtonEventArgs): void {
    if (!this.bIsSteepedWinOpen) {
      //Not Required for LHS. To be Re-Visited.
       this.objStepped = new MedSteppedFullPrescriptionVW();
                this.bIsSteepedWinOpen = true;  
                let temp =  this.MultiDoseDetailVM.PresItemDoseInfoServicedata.subscribe(()=> {
                    this.objStepped.DataContext = this.MultiDoseDetailVM;  
                    this.objStepped.oLaunchFrom = this.oLaunchFrom; 
                    if (this.DrugDetails != null && !String.IsNullOrEmpty(this.DrugDetails.PresType))
                        this.objStepped.sPrescriptionTypeCode = this.DrugDetails.PresType;                       
                        this.objStepped.onDialogClose = this.oSDDet_Closed;
                AppActivity.OpenWindow(this.DrugDetails.IdentifyingName, this.objStepped, (s,e)=>{this.oSDDet_Closed(s);}, "", false, 600, 950, false, WindowButtonType.Close, null);
                temp.unsubscribe(); 
                });
    }
  }
  oSDDet_Closed(args: AppDialogEventargs): void {
    this.bIsSteepedWinOpen = false;
    //Not Required for LHS. To be Re-Visited.
    this.objStepped.appDialog.DialogResult = true;
  }
  public GetTechnicalDetails(
    pMedSupplyDetailOID: number,
    supplyDttm: DateTime,
    pPrescriptionItemOID: number
  ): void {
    let objReqTech: ManagePrescSer.CReqMsgGetTechnicalDetails =
      new ManagePrescSer.CReqMsgGetTechnicalDetails();
    objReqTech.SupplydetailOIDsBC = pMedSupplyDetailOID;
    objReqTech.PrescriptionItemOIDBC = pPrescriptionItemOID;
    objReqTech.ServiceOIDBC = this.ServiceOID;
    objReqTech.LocationOIDBC = this.LocationOID;
    if (supplyDttm != DateTime.MinValue) {
      objReqTech.SupplyDttmBC = supplyDttm;
    }
    objReqTech.oContextInformation = CommonBB.FillContext();
    this.objManagePrescriptionServiceProxy.GetTechnicalDetailsAsync(objReqTech);
  }
  private objManagePrescriptionServiceProxy_GetTechnicalDetailsCompleted(
    sender: Object,
    e: ManagePrescSer.GetTechnicalDetailsCompletedEventArgs
  ): void {
    let _ErrorID: number = 80000121;
    let _ErrorSource: string =
      'LorAppMedicationCommonBB.dll, Class:Prescriptionitemdetailsvm, Method:objManagePrescriptionServiceProxy_GetTechnicalDetailsCompleted()';
    if (e.Error == null) {
      try {
        let objResTech: ManagePrescSer.CResMsgGetTechnicalDetails = e.Result;
        this.fillDataContext(objResTech);
      } catch (ex: any) {
        let lnReturn: number = AMSHelper.PublicExceptionDetails(
          _ErrorID,
          _ErrorSource,
          ex
        );
      }
    } else {
      let lnReturn: number = AMSHelper.PublicExceptionDetails(
        _ErrorID,
        _ErrorSource,
        e.Error
      );
    }
  }
  public GetSupplyHistory(MCLorenzoid: string, IsMCIComp: boolean): void {
    let oReq: IPPManagePrescSer.CReqMsgGetSupplyHistoryDetails =
      new IPPManagePrescSer.CReqMsgGetSupplyHistoryDetails();
    oReq.sLorenzoIDBC = MCLorenzoid;
    oReq.oContextInformation = CommonBB.FillContext();
    oReq.lnPatientoidBC = PatientContext.PatientOID;
    oReq.lnEncounteroidBC = PatientContext.EncounterOid;
    oReq.IsMCICompBC = IsMCIComp;
    oReq.IsCallForFluidBC = false;
    oReq.IsCallFromCABC = false;
    if (
      (this.DrugDetails != null &&
        !String.IsNullOrEmpty(this.DrugDetails.IdentifyingType) &&
        (String.Equals(
          this.DrugDetails.IdentifyingType,
          CConstants.NONCATALOGUEITEM,
          StringComparison.InvariantCultureIgnoreCase
        ) ||
          String.Equals(
            this.DrugDetails.IdentifyingType,
            CConstants.Precatalog,
            StringComparison.InvariantCultureIgnoreCase
          ))) ||
      (this.DrugDetails != null &&
        !String.IsNullOrEmpty(this.DrugDetails.ItemSubType) &&
        String.Compare(
          this.DrugDetails.ItemSubType,
          'CC_MULCMPNTITM',
          StringComparison.OrdinalIgnoreCase
        ) == 0 &&
        String.Compare(
          this.DrugDetails.MCLorenzoid,
          'PI-001',
          StringComparison.OrdinalIgnoreCase
        ) == 0)
    ) {
      oReq.PrescriptionItemOIDBC = this.PrescriptionItemOID;
    }
    let objServiceProxy: IPPManagePrescSer.IPPMAManagePrescriptionWSSoapClient =
      new IPPManagePrescSer.IPPMAManagePrescriptionWSSoapClient();
    objServiceProxy.GetSupplyHistoryDetailsCompleted = (s, e) => {
      this.objServiceProxy_GetSupplyHistoryDetailsCompleted(s, e);
    };
    objServiceProxy.GetSupplyHistoryDetailsAsync(oReq);
  }
  private objServiceProxy_GetSupplyHistoryDetailsCompleted(
    sender: Object,
    e: IPPManagePrescSer.GetSupplyHistoryDetailsCompletedEventArgs
  ): void {
    if (e.Error == null) {
      let oRes: IPPManagePrescSer.CResMsgGetSupplyHistoryDetails = e.Result;
      this.SupplyDetails = new ObservableCollection<SupplyDetails>();
      if (
        oRes != null &&
        oRes.arrSupplyHistoryDetails != null &&
        oRes.arrSupplyHistoryDetails.Count > 0
      ) {


        let tempArry = [];
        oRes.arrSupplyHistoryDetails.forEach(x => tempArry.push({ PrescriptionItemOID: x.PrescriptionItemOID, SuppliedDTTM: x.SuppliedDTTM }));
        tempArry.sort((x, y) => {
          if (x.PrescriptionItemOID != y.PrescriptionItemOID) {
            return x.PrescriptionItemOID < y.PrescriptionItemOID ? -1 : 1;
          }
          if (x.SuppliedDTTM.getTime() != y.SuppliedDTTM.getTime()) {
            return x.SuppliedDTTM.getTime() < y.SuppliedDTTM.getTime() ? -1 : 1;
          }
          return 0;
        });

        let PresItmOIDs: List<any> = new List<any>();
        let lastPresItemOid = null;
        let lastSupplyDTTM = null;
        tempArry.forEach(x => {
          if (lastPresItemOid == null || lastPresItemOid != x.PrescriptionItemOID || lastSupplyDTTM != x.SuppliedDTTM.getTime()) {
            PresItmOIDs.Add(x);

          }
          lastPresItemOid = x.PrescriptionItemOID;
          lastSupplyDTTM = x.SuppliedDTTM.getTime();
        })

        let MCversion: string = oRes.arrSupplyHistoryDetails
          .Where((x) => x.MCVersion != null)
          .FirstOrDefault().MCVersion;
        if (PresItmOIDs.Count > 0) {
          for (let i: number = 0; i < PresItmOIDs.Count; i++) {
            if (
              !oRes.arrSupplyHistoryDetails.Any(
                (x) =>
                  x.PrescriptionItemOID == PresItmOIDs[i].PrescriptionItemOID &&
                  x.SuppliedDTTM == PresItmOIDs[i].SuppliedDTTM &&
                  x.PrescriptionMultiComponentOID == 0 &&
                  x.FluidPrescribableItemListOID == 0
              )
            ) {
              let ObjDetParent: IPPManagePrescSer.SupplyHistoryDetails =
                new IPPManagePrescSer.SupplyHistoryDetails();
              let IsDisCon: string = oRes.arrSupplyHistoryDetails
                .Where(
                  (x) =>
                    x.PrescriptionItemOID ==
                    PresItmOIDs[i].PrescriptionItemOID &&
                    x.SuppliedDTTM == PresItmOIDs[i].SuppliedDTTM
                )
                .FirstOrDefault().PresItemstatusCode;
              if (
                oRes.arrSupplyHistoryDetails.Any(
                  (x) =>
                    x.PrescriptionItemOID ==
                    PresItmOIDs[i].PrescriptionItemOID &&
                    x.SuppliedDTTM == PresItmOIDs[i].SuppliedDTTM &&
                    x.FluidPrescribableItemListOID > 0
                )
              ) {
                ObjDetParent.Drugname = oRes.arrSupplyHistoryDetails
                  .Where(
                    (x) =>
                      x.PrescriptionItemOID ==
                      PresItmOIDs[i].PrescriptionItemOID &&
                      x.SuppliedDTTM == PresItmOIDs[i].SuppliedDTTM &&
                      x.FluidPrescribableItemListOID > 0
                  )
                  .FirstOrDefault().ParentDrugname;
              } else {
                ObjDetParent.Drugname = this.objDrugDetailsData.IdentifyingName;
              }
              ObjDetParent.PrescriptionMultiComponentOID = 0;
              ObjDetParent.IsDoseCombinationsDefined = '0';
              ObjDetParent.PrescriptionItemOID =
                PresItmOIDs[i].PrescriptionItemOID;
              ObjDetParent.SuppliedDTTM = PresItmOIDs[i].SuppliedDTTM;
              ObjDetParent.MCVersion = MCversion;
              ObjDetParent.ItemSubType = this.objDrugDetailsData.ItemSubType;
              ObjDetParent.PresItemstatusCode = IsDisCon;
              if (
                this.objDrugDetailsData != null &&
                this.objDrugDetailsData.InfusionDetails != null &&
                this.objDrugDetailsData.InfusionDetails.FluidSelectvalue !=
                null &&
                !String.IsNullOrEmpty(
                  this.objDrugDetailsData.InfusionDetails.FluidSelectvalue.Value
                )
              ) {
                ObjDetParent.IsParent = 1;
              }
              if (
                this.objDrugDetailsData != null &&
                this.objDrugDetailsData.ItemSubType == 'CC_MULCMPNTITM' &&
                oRes.arrSupplyHistoryDetails.Any(
                  (x) =>
                    x.PrescriptionItemOID ==
                    PresItmOIDs[i].PrescriptionItemOID &&
                    x.SuppliedDTTM == PresItmOIDs[i].SuppliedDTTM &&
                    x.PrescriptionMultiComponentOID > 0
                )
              ) {
                oRes.arrSupplyHistoryDetails.Add(ObjDetParent);
              } else if (
                oRes.arrSupplyHistoryDetails.Any(
                  (x) =>
                    x.PrescriptionItemOID ==
                    PresItmOIDs[i].PrescriptionItemOID &&
                    x.SuppliedDTTM == PresItmOIDs[i].SuppliedDTTM &&
                    x.FluidPrescribableItemListOID > 0
                )
              ) {
                ObjDetParent.IsParent = 1;
                oRes.arrSupplyHistoryDetails.Add(ObjDetParent);
              }
            }
          }
        }
        let oFluidItm: Dictionary<
          string,
          IPPManagePrescSer.SupplyHistoryDetails
        > = new Dictionary<string, IPPManagePrescSer.SupplyHistoryDetails>();
        let _parentSupply: SupplyDetails = null;
        oRes.arrSupplyHistoryDetails.forEach((objSupplyHistoryDetails) => {
          if (String.IsNullOrEmpty(objSupplyHistoryDetails.SupplystatusCode))
            objSupplyHistoryDetails.SuppliedDTTM = DateTime.MinValue;
          if (objSupplyHistoryDetails.PrescriptionMultiComponentOID == 0) {
            if (_parentSupply != null) this.SupplyDetails.Add(_parentSupply);
            _parentSupply = new SupplyDetails();
            this.FillSupplyHistoryDet(objSupplyHistoryDetails, _parentSupply);
          } else {
            if (_parentSupply == null) _parentSupply = new SupplyDetails();
            if (_parentSupply.SupplyHistoryMCIChild == null)
              _parentSupply.SupplyHistoryMCIChild =
                new ObservableCollection<SupplyDetailsMCIChild>();
            let _oSupDet: SupplyDetails = new SupplyDetails();
            this.FillSupplyHistoryDet(objSupplyHistoryDetails, _oSupDet);
            let _objSupDetChild: SupplyDetailsMCIChild =
              ObjectHelper.CreateObject(new SupplyDetailsMCIChild(), {
                Drugname: _oSupDet.Drugname,
                PrescriptionItemOID: _oSupDet.PrescriptionItemOID,
                MedSupplyDetailOID: _oSupDet.MedSupplyDetailOID,
                IsDoseCombinationsDefined: _oSupDet.IsDoseCombinationsDefined,
                ServiceName: _oSupDet.ServiceName,
                LocationName: _oSupDet.LocationName,
                Prescriptiontype: _oSupDet.Prescriptiontype,
                PresItemstatusCode: _oSupDet.PresItemstatusCode,
                SupplieddBy: _oSupDet.SupplieddBy,
                SuppliedDTTM: _oSupDet.SuppliedDTTM,
                SupplyComments: _oSupDet.SupplyComments,
                Supplyinstruction: _oSupDet.Supplyinstruction,
                SupplystatusCode: _oSupDet.SupplystatusCode,
                ItemSubType: _oSupDet.ItemSubType,
                MCVersion: _oSupDet.MCVersion,
                NextSupplyDttm: _oSupDet.NextSupplyDttm,
                PrescriptionMultiComponentOID:
                  _oSupDet.PrescriptionMultiComponentOID,
                FluidPrescribableItemListOID:
                  _oSupDet.FluidPrescribableItemListOID,
                SortingDTTM: _oSupDet.SortingDTTM,
                DispensingDetail: _oSupDet.DispensingDetail,
              });
            if (
              !_parentSupply.SupplyHistoryMCIChild.Any(
                (x) =>
                  x.PrescriptionItemOID ==
                  _objSupDetChild.PrescriptionItemOID &&
                  x.MedSupplyDetailOID == _objSupDetChild.MedSupplyDetailOID &&
                  x.IsDoseCombinationsDefined ==
                  _objSupDetChild.IsDoseCombinationsDefined &&
                  x.NextSupplyDttm == _objSupDetChild.NextSupplyDttm &&
                  x.PrescriptionMultiComponentOID ==
                  _objSupDetChild.PrescriptionMultiComponentOID &&
                  x.FluidPrescribableItemListOID ==
                  _objSupDetChild.FluidPrescribableItemListOID
              )
            ) {
              _parentSupply.SupplyHistoryMCIChild.Add(_objSupDetChild);
            }
          }
        });
        if (_parentSupply != null) this.SupplyDetails.Add(_parentSupply);
        this.SupplyHistory = new ObservableCollection<SupplyDetails>(
          this.SupplyDetails.Where((c) =>
            c.IsDoseCombinationsDefined.Equals('0')
          )
        );
        if (this.SupplyHistory != null && this.SupplyHistory.Count > 0) {
          this.SelectedSupplyItem = this.SupplyHistory[0];
        }
      }
    }
    this.SupplyHistoryservicedata.emit(true);
  }
  private FillSupplyHistoryDet(
    objSupplyHistoryDetails: IPPManagePrescSer.SupplyHistoryDetails,
    oSupplyHistoryDetails: SupplyDetails
  ): void {
    oSupplyHistoryDetails.Drugname = objSupplyHistoryDetails.Drugname;
    oSupplyHistoryDetails.PrescriptionItemOID =
      objSupplyHistoryDetails.PrescriptionItemOID;
    oSupplyHistoryDetails.MedSupplyDetailOID =
      objSupplyHistoryDetails.MedSupplyDetailOID;
    oSupplyHistoryDetails.IsDoseCombinationsDefined =
      objSupplyHistoryDetails.IsDoseCombinationsDefined;
    oSupplyHistoryDetails.LocationName = objSupplyHistoryDetails.LocationName;
    oSupplyHistoryDetails.ServiceName = objSupplyHistoryDetails.ServiceName;
    oSupplyHistoryDetails.SupplieddBy = objSupplyHistoryDetails.SupplieddBy;
    if (objSupplyHistoryDetails.NextSupplyDTTM == DateTime.MinValue || objSupplyHistoryDetails.NextSupplyDTTM == undefined) {
      oSupplyHistoryDetails.NextSupplyDttm = String.Empty;
    } else {
      oSupplyHistoryDetails.NextSupplyDttm =
        objSupplyHistoryDetails.NextSupplyDTTM.ToString(
          CConstants.ShortDateFormat
        );
    }
    oSupplyHistoryDetails.SortingDTTM = objSupplyHistoryDetails.SortingDTTM;
    if (objSupplyHistoryDetails.SuppliedDTTM == DateTime.MinValue || objSupplyHistoryDetails.SuppliedDTTM == undefined) {
      oSupplyHistoryDetails.SuppliedDTTM = String.Empty;
    } else {
      oSupplyHistoryDetails.SuppliedDTTM =
        objSupplyHistoryDetails.SuppliedDTTM.ToString(
          CConstants.LongDateWithoutSecs
        );
    }
    oSupplyHistoryDetails.PresItemstatusCode =
      objSupplyHistoryDetails.PresItemstatusCode;
    oSupplyHistoryDetails.ItemSubType = objSupplyHistoryDetails.ItemSubType;
    oSupplyHistoryDetails.MCVersion = objSupplyHistoryDetails.MCVersion;
    oSupplyHistoryDetails.PrescriptionMultiComponentOID =
      objSupplyHistoryDetails.PrescriptionMultiComponentOID;
    oSupplyHistoryDetails.FluidPrescribableItemListOID =
      objSupplyHistoryDetails.FluidPrescribableItemListOID;
    if (objSupplyHistoryDetails.DispenseStatus != null) {
      oSupplyHistoryDetails.DispensingDetail =
        objSupplyHistoryDetails.DispenseStatus.ToList();
    }
    if (oSupplyHistoryDetails.FluidPrescribableItemListOID > 0) {
      oSupplyHistoryDetails.Drugname =
        objSupplyHistoryDetails.DrugFluidName + ' (Fluid for infusions) ';
    }
    oSupplyHistoryDetails.SupplystatusCode = CommonBB.GetText(
      objSupplyHistoryDetails.SupplystatusCode,
      MedicationCommonConceptCodeData.ViewConceptCodes
    );
    if (oSupplyHistoryDetails.SupplystatusCode == 'CC_SUPPLYEMPTY') {
      oSupplyHistoryDetails.SupplystatusCode = String.Empty;
    }
    if (!String.IsNullOrEmpty(objSupplyHistoryDetails.Prescriptiontype))
      oSupplyHistoryDetails.Prescriptiontype =
        MedicationPrescriptionHelper.GetPrescriptionType(
          objSupplyHistoryDetails.Prescriptiontype
        );
    let sSupplyinscomments: StringBuilder = new StringBuilder();
    if (
      !String.IsNullOrEmpty(objSupplyHistoryDetails.Supplyinstruction) &&
      !String.Equals(
        objSupplyHistoryDetails.Supplyinstruction,
        CConstants.Supplycomments
      )
    ) {
      let _arrSupplyInstruction: string =
        objSupplyHistoryDetails.Supplyinstruction;
      let nSeparatorCount: number = _arrSupplyInstruction.Split(';').length;
      if (nSeparatorCount > 0) {
        let _sbSupplyInstructionsText: StringBuilder = new StringBuilder();
        for (let _i: number = 0; _i < nSeparatorCount; _i++) {
          let sSupplyInstruction: string = String.Empty;
          if (MedicationCommonConceptCodeData.ViewConceptCodes != null) {
            sSupplyInstruction = CommonBB.GetText(
              _arrSupplyInstruction.Split(';')[_i],
              MedicationCommonConceptCodeData.ViewConceptCodes
            );
          }
          if (
            String.IsNullOrEmpty(sSupplyInstruction) &&
            MedicationCommonConceptCodeData.ConceptCodes != null
          ) {
            sSupplyInstruction = CommonBB.GetText(
              _arrSupplyInstruction.Split(';')[_i],
              MedicationCommonConceptCodeData.ConceptCodes
            );
          }
          _sbSupplyInstructionsText.Append(sSupplyInstruction);
          if (_i < nSeparatorCount - 1) {
            _sbSupplyInstructionsText.Append(';');
          }
        }
        sSupplyinscomments.Append(_sbSupplyInstructionsText.ToString());
      } else {
        sSupplyinscomments.Append(
          CommonBB.GetText(
            objSupplyHistoryDetails.Supplyinstruction,
            MedicationCommonConceptCodeData.ViewConceptCodes
          )
        );
      }
    }
    if (!String.IsNullOrEmpty(objSupplyHistoryDetails.SupplyComments)) {
      if (
        sSupplyinscomments != null &&
        !String.IsNullOrEmpty(sSupplyinscomments.ToString())
      )
        sSupplyinscomments.Append(Environment.NewLine);
      sSupplyinscomments.Append(
        Resource.medlistdetails.Comments +
        objSupplyHistoryDetails.SupplyComments
      );
    }
    oSupplyHistoryDetails.Supplyinstruction = sSupplyinscomments.ToString();
  }
  public GetReviewHistory(): void {
    let oReq: IPPManagePrescSer.CReqMsgGetReviewHistory =
      new IPPManagePrescSer.CReqMsgGetReviewHistory();
    oReq.oContextInformation = CommonBB.FillContext();
    oReq.lnPatientoidBC = PatientContext.PatientOID;
    oReq.lnPrescriptionItemOIDBC = this.lPrescriptionItemOID;
    let objServiceProxy: IPPManagePrescSer.IPPMAManagePrescriptionWSSoapClient =
      new IPPManagePrescSer.IPPMAManagePrescriptionWSSoapClient();
    objServiceProxy.GetReviewHistoryCompleted = (s, e) => {
      this.objServiceProxy_GetReviewHistoryCompleted(s, e);
    };
    objServiceProxy.GetReviewHistoryAsync(oReq);
  }
  private objServiceProxy_GetReviewHistoryCompleted(
    seder: Object,
    e: IPPManagePrescSer.GetReviewHistoryCompletedEventArgs
  ): void {
    if (e.Error == null) {
      let oRes: IPPManagePrescSer.CResMsgGetReviewHistory = e.Result;
      this.ReviewHistory = new ObservableCollection<ReviewHistoryDetails>();
      if (
        oRes != null &&
        oRes.ReviewAfterDetails != null &&
        oRes.ReviewAfterDetails.Count > 0
      ) {
        oRes.ReviewAfterDetails.forEach((objReviewHistoryDetails) => {
          let objReviewHistory: ReviewHistoryDetails =
            new ReviewHistoryDetails();
          objReviewHistory.ReviewDue = objReviewHistoryDetails.ReviewDueDTTM;
          objReviewHistory.ReviewedBy = objReviewHistoryDetails.Reviewer;
          objReviewHistory.ReviewedOn = objReviewHistoryDetails.ReviewedDTTM;
          objReviewHistory.ReviewOutcome =
            objReviewHistoryDetails.ReviewOutcome.Name;
          objReviewHistory.ReviewOutcomecomments =
            objReviewHistoryDetails.ReviewOutcomeComments;
          if (!String.IsNullOrEmpty(objReviewHistoryDetails.ReviewPeriod)) {
            let iReviewP: number = Number.Parse(
              objReviewHistoryDetails.ReviewPeriod
            );
            if (iReviewP > 0)
              objReviewHistory.ReviewPeriod =
                objReviewHistoryDetails.ReviewPeriod;
          }
          objReviewHistory.ReviewPeriodUOM =
            objReviewHistoryDetails.ReviewAfterUOM.Name;
          objReviewHistory.ReviewRequestComments =
            objReviewHistoryDetails.ReviewRequestComments;
          objReviewHistory.ReviewType = objReviewHistoryDetails.ReviewType.Name;
          objReviewHistory.ReviewRequestedBy =
            objReviewHistoryDetails.ReviewRequestedBy;
          objReviewHistory.ReviewRequestedOn =
            objReviewHistoryDetails.ReviewRequestedDTTM;
          this.ReviewHistory.Add(objReviewHistory);
        });
      }
      if (this.ReviewHistoryEvent != null) {
        this.ReviewHistoryEvent(this);
      }
    }
  }
  private fillDataContext5(
    objResTech: ManagePrescSer.CResMsgGetTechnicalDetails
  ): void {
    let objTechnicalValidationDetails: TechnicalValidationDetails =
      new TechnicalValidationDetails();
    let objTechValidatedItemData: ObservableCollection<TechValidatedItemData> =
      new ObservableCollection<TechValidatedItemData>();
    let objTechicalDetails: ObservableCollection<TechnicalDetails> =
      new ObservableCollection<TechnicalDetails>();
    this.TechnicalDetails = null;
    if (
      objResTech instanceof ManagePrescSer.CResMsgGetTechnicalDetails &&
      objResTech.oTechnicalValidationInfo != null &&
      objResTech.oTechnicalValidationInfo.Count > 0
    ) {
      let objTechnicalValidationInfo: ManagePrescSer.TechnicalValidationInfo =
        objResTech.oTechnicalValidationInfo[0];
      objTechnicalValidationDetails.MedSupplyDetailOID =
        objTechnicalValidationInfo.MedsupplydetailOID;
      objTechnicalValidationDetails.PrescriptionItemOID =
        objTechnicalValidationInfo.PrescriptionItemOID;
      objTechnicalValidationDetails.PrescriptionOID =
        objTechnicalValidationInfo.PrescriptionOID;
      if (objTechnicalValidationInfo.TechValidatedItems != null) {
        let nCount: number = 0;
        objTechnicalValidationInfo.TechValidatedItems.forEach(
          (objTechValidatedItem) => {
            let objNewTechValidatedItemData: TechValidatedItemData =
              new TechValidatedItemData();
            let objdetails: TechnicalDetails = new TechnicalDetails();
            if (this.Iscancelled) {
              objdetails.IsCancelled = true;
            } else {
              objdetails.IsCancelled = false;
            }
            if (objTechValidatedItem.FluidPrescribableItemListOID > 0) {
              objdetails.IdentifyingName =
                objTechValidatedItem.DrugItem.IdentifyingName +
                ' (Fluid for infusions) ';
            } else {
              objdetails.IdentifyingName =
                objTechValidatedItem.DrugItem.IdentifyingName;
            }
            if (
              this.oDrugDetailsData != null &&
              !String.IsNullOrEmpty(this.oDrugDetailsData.Status) &&
              !String.Equals(
                this.oDrugDetailsData.Status,
                CConstants.CompletedStatusTermText
              ) &&
              !String.Equals(
                this.oDrugDetailsData.Status,
                CConstants.CancelledStatusTermText
              ) &&
              !String.Equals(
                this.oDrugDetailsData.Status,
                CConstants.DiscontinueStatusTermText
              ) &&
              String.Equals(
                this.oDrugDetailsData.PresType,
                PrescriptionTypes.ForAdministration,
                StringComparison.InvariantCultureIgnoreCase
              )
            ) {
              objdetails.IsWardStock = objTechValidatedItem.IsWardStock;
            }
            objNewTechValidatedItemData.IdentifyingDomain =
              objTechValidatedItem.IdentifyingDomain;
            objNewTechValidatedItemData.OtherDispensingInstruction =
              objTechValidatedItem.OtherDispensingInstruction;
            if (objTechValidatedItem.DispenseStatus != null) {
              objNewTechValidatedItemData.DispenseStatus =
                objTechValidatedItem.DispenseStatus.ToList();
            }
            objdetails.QuantityPerDoseWithUOM =
              ((objTechValidatedItem.QuantityPerDose === null ? '' : objTechValidatedItem.QuantityPerDose) +
              ' ' +
              (objTechValidatedItem.QuantityPerDoseUOM.Name === null ? '' : objTechValidatedItem.QuantityPerDoseUOM.Name));
              
            objdetails.PrescriptionItemOID =
              objTechValidatedItem['PrescriptionItemOID'];
            objdetails.MedSupplyDetailOID = objTechValidatedItem.MedSupplyOID;
            if (objTechValidatedItem.DispenseStatus != null) {
              objdetails.DispensingDetail =
                objTechValidatedItem.DispenseStatus.ToList();
            }
            if (
              objTechValidatedItem.SupplyInstruction != null &&
              objTechValidatedItem.SupplyInstruction.Count > 0
            ) {
              let ntotln: number = objTechValidatedItem.SupplyInstruction.Count;
             if (objNewTechValidatedItemData && objNewTechValidatedItemData.SupplyInstructionDesc === undefined)
                objNewTechValidatedItemData.SupplyInstructionDesc = "";
              for (let nln: number = 0; nln < ntotln; nln++) {
                if (nln == ntotln - 1) {
                  objNewTechValidatedItemData.SupplyInstructionDesc +=
                    objTechValidatedItem.SupplyInstruction[nln].Name;
                } else {
                  objNewTechValidatedItemData.SupplyInstructionDesc +=
                    objTechValidatedItem.SupplyInstruction[nln].Name + ';';
                }
              }
              let _nSupplyInstructionDesc: string =
                objNewTechValidatedItemData.SupplyInstructionDesc;
              if (_nSupplyInstructionDesc.EndsWith(';')) {
                objNewTechValidatedItemData.SupplyInstructionDesc =
                  _nSupplyInstructionDesc.Substring(
                    0,
                    _nSupplyInstructionDesc.length - 1
                  );
              }
              objdetails.SupplyInstructionDesc =
                objNewTechValidatedItemData.SupplyInstructionDesc;
            }
            if (!String.IsNullOrEmpty(objdetails.SupplyInstructionDesc)) {
              if (
                !String.IsNullOrEmpty(
                  objNewTechValidatedItemData.OtherDispensingInstruction
                )
              )
                objdetails.SupplyInstructionDesc =
                  objdetails.SupplyInstructionDesc +
                  '\r\n' +
                  Resource.DrugDetails.Comments +
                  objNewTechValidatedItemData.OtherDispensingInstruction;
            } else if (
              !String.IsNullOrEmpty(
                objNewTechValidatedItemData.OtherDispensingInstruction
              )
            )
              objdetails.SupplyInstructionDesc =
                Resource.DrugDetails.Comments +
                objNewTechValidatedItemData.OtherDispensingInstruction;
            objNewTechValidatedItemData.TotalQuantity =
              objTechValidatedItem.TotalQuantity === null ? '' : objTechValidatedItem.TotalQuantity;
            objNewTechValidatedItemData.TotalQuantityUOM =
              objTechValidatedItem.TotalQuantityUOM.Name === null ? '' : objTechValidatedItem.TotalQuantityUOM.Name;
            objdetails.TotalQuantityWithUOM =
              ((objTechValidatedItem.TotalQuantity === null ? '' : objTechValidatedItem.TotalQuantity) +
              ' ' +
              (objTechValidatedItem.TotalQuantityUOM.Name === null ? '' : objTechValidatedItem.TotalQuantityUOM.Name));
            if (objTechValidatedItem.TotalQuantity == '0') {
              objdetails.QuantityPerDoseWithUOM = CConstants.ZeroQuantity;
              objdetails.TotalQuantityWithUOM = CConstants.ZeroQuantity;
            }
            if (objTechValidatedItem.IsDoseCombinationsDefined == '1') {
              objTechValidatedItemData.Add(objNewTechValidatedItemData);
              objTechicalDetails.Add(objdetails);
            }
            nCount++;
          }
        );
        objTechnicalValidationDetails.TechValidatedItems =
          objTechValidatedItemData;
      }
      if (objTechnicalValidationInfo.ValidatedBy != null)
        objTechnicalValidationDetails.ValidatedBy =
          objTechnicalValidationInfo.ValidatedBy.Name;
      if (
        objTechnicalValidationInfo.ValidatedDTTM != null &&
        objTechnicalValidationInfo.ValidatedDTTM != DateTime.MinValue
      )
        objTechnicalValidationDetails.ValidatedDTTMString =
          objTechnicalValidationInfo.ValidatedDTTM.ConvertToUser(
            (o1) => {
              this.IsDST = o1;
            },
            (o2) => {
              this.IsAmbiguous = o2;
            },
            (o3) => {
              this.IsInvalid = o3;
            }
          ).ToDateTimeString(
            this.IsDST,
            this.IsAmbiguous,
            CConstants.LongDateWithoutSecs
          );
      if (
        !String.IsNullOrEmpty(objTechnicalValidationInfo.SupplyStatus) &&
        MedicationCommonConceptCodeData.ViewConceptCodes != null &&
        MedicationCommonConceptCodeData.ViewConceptCodes.Count > 0
      ) {
        objTechnicalValidationDetails.TechValSupplyStatus = CommonBB.GetText(
          objTechnicalValidationInfo.SupplyStatus,
          MedicationCommonConceptCodeData.ViewConceptCodes
        );
      }
      this.TechnicalDetails = objTechicalDetails;
    }
    this.TechnicalDetailsservicedata.emit(true);
  }
  private IsConceptCodeExists(
    sConceptCode: string,
    objConceptCodes: ObservableCollection<CValuesetTerm>,
    out1: (sResultDetails: string) => void
  ): boolean {
    let sResultDetails: string;

    let bResult: boolean = false;
    sResultDetails = String.Empty;
    let ccother: string[] = new Array(2);
    if (sConceptCode.Contains('~?#$')) {
      ccother = sConceptCode.Split(new Array('~?#$'), StringSplitOptions.None);
      sConceptCode = ccother[0];
    }
    if (!String.IsNullOrEmpty(sConceptCode) && objConceptCodes != null) {
      for(let i=0; i< objConceptCodes.Count; i++){
        let oCTerms: CValuesetTerm = objConceptCodes[i];
        if (oCTerms.csCode == sConceptCode) {
          bResult = true;
          if (sConceptCode == 'CC_OTHER_FREETEXT') {
            if (String.IsNullOrEmpty(ccother[1].Trim())) {
              sResultDetails = oCTerms.csDescription;
            } else {
              sResultDetails = oCTerms.csDescription + ':' + ccother[1];
            }
          } else {
            sResultDetails = oCTerms.csDescription;
          }
          break;
          
        }
      }
    }
    out1(sResultDetails);
    return bResult;
  }
  private SeverityWarningTextWithIcons(
    Severity: string,
    DisplayText: string
  ): string {
    let Strsource: string = String.Empty;
    Severity = String.IsNullOrEmpty(Severity) ? String.Empty : Severity;
    DisplayText = String.IsNullOrEmpty(DisplayText)
      ? String.Empty
      : DisplayText;
    let header: string = `<DataTemplate  xmlns=""http://schemas.microsoft.com/winfx/2006/xaml/presentation""
            xmlns: x = ""http://schemas.microsoft.com/winfx/2006/xaml"">
            <StackPanel Orientation=""Vertical"">
                <TextBlock TextWrapping=""Wrap"" TextAlignment= ""Left"" VerticalAlignment= ""Center"" Margin= ""2"" Text= """ + DisplayText + @""" /> 
                    <StackPanel Orientation=""Horizontal"" Margin= ""2"">`;
    switch (Severity.ToUpper()) {
      case 'LOWWW':
      case 'LOW':
        Strsource =
          header +
          '<Image Source="../Images/star.png" Stretch="None" /></StackPanel></StackPanel></DataTemplate>';
        break;
      case 'Moderate':
      case 'CC_MODERATE':
        Strsource =
          header +
          '<Image Source="../Images/star.png" Stretch="None" /><Image Source="../Images/star.png" Stretch="None" /></StackPanel></StackPanel></DataTemplate>';
        break;
      case 'High':
      case 'HIGHH':
        Strsource =
          header +
          '<Image Source="../Images/star.png" Stretch="None" /><Image Source="../Images/star.png" Stretch="None" /><Image Source="../Images/star.png" Stretch="None" /><Image Source="../Images/star.png" Stretch="None" /></StackPanel></StackPanel></DataTemplate>';
        break;
      case 'CC_SIGNIFICANT':
      case 'SIGNIFICANT':
        Strsource =
          header +
          '<Image Source="../Images/star.png" Stretch="None" /><Image Source="../Images/star.png" Stretch="None" /><Image Source="../Images/star.png" Stretch="None" /></StackPanel></StackPanel></DataTemplate>';
        break;
      default:
        Strsource = header + '</StackPanel></StackPanel></DataTemplate>';
        break;
    }
    return Strsource;
  }
  public GetInfuactchldDetl(
    MedadminOid: number,
    MCVersion: string,
    IsFetchRecentActionOnly: number
  ): void {
    let objService: MedicationMgmt.MedicationAdministrationWSSoapClient =
      new MedicationMgmt.MedicationAdministrationWSSoapClient();
    let objReq: MedicationMgmt.CReqMsgGetAllinfuactchldDetl =
      new MedicationMgmt.CReqMsgGetAllinfuactchldDetl();
    objReq.oContextInformation = CommonBB.FillContext();
    objReq.MedAdminOIDBC = MedadminOid;
    objReq.MCVersionNumberBC = MCVersion;
    objReq.PatientOIDBC = PatientContext.PatientOID;
    objReq.IsFetchRecentActionOnlyBC = IsFetchRecentActionOnly;
    if (this.SelectedSlot != null) {
      this.SelectedSlot.OnInfActionRowChanged = (s, e) => {
        this.SelectedSlot_OnInfActionRowChanged();
      };
    }
    if (IsFetchRecentActionOnly == 1)
      objService.GetAllinfuactchldDetlCompleted = (s, e) => {
        this.LoadRecentInfusionOnly(s, e);
      };
    else
      objService.GetAllinfuactchldDetlCompleted = (s, e) => {
        this.LoadAllInfusionActions(s, e);
      };
    objService.GetAllinfuactchldDetlAsync(objReq);
  }
  SelectedSlot_OnInfActionRowChanged(): void {
    //Not Required for LHS. To be Re-Visited.

    let oDetailEventView: MedsAdminEventDetails = ObjectHelper.CreateType<MedsAdminEventDetails>(this.SelectedAdminDetailsFauxTab.Content, MedsAdminEventDetails);
    if (oDetailEventView != null && this.SelectedSlot != null && this.SelectedSlot.SelectedInfAction != null) {
      oDetailEventView.DataContext = this.SelectedSlot.SelectedInfAction.AdminListDet;
    }

  }
  LoadRecentInfusionOnly(
    sender: Object,
    e: MedicationMgmt.GetAllinfuactchldDetlCompletedEventArgs
  ): void {
    this.GetInfusionActionsFromWSResponse(e, 1);
  }
  LoadAllInfusionActions(
    sender: Object,
    e: MedicationMgmt.GetAllinfuactchldDetlCompletedEventArgs
  ): void {
    this.GetInfusionActionsFromWSResponse(e, 0);
  }
  private GetInfusionActionsFromWSResponse(
    e: MedicationMgmt.GetAllinfuactchldDetlCompletedEventArgs,
    IsFetchRecentActionOnly: number
  ): void {
    let _ErrorID: number = 80000084;
    let _ErrorSource: string =
      'LorAppMedicationCommonBB.dll, Class:Prescriptionitemdetailsvm, Method:GetInfusionActionsFromWSResponse()';
    if (e.Error == null) {
      try {
        let objResponse: MedicationMgmt.CResMsgGetAllinfuactchldDetl = e.Result;
        let oInfActionList: ObservableCollection<InfActionchildDetail> =
          new ObservableCollection<InfActionchildDetail>();
        if (
          objResponse.objAdministrationDetail != null &&
          objResponse.objAdministrationDetail.oInfusionAdminDetail != null
        ) {
          if (
            this.SelectedSlot.MedAdminOID ==
            objResponse.objAdministrationDetail.MedAdminOID
          ) {
            let oInfActionItem: InfActionchildDetail = null;
            let sInfusionAction: string;
            let nInfActionsCount: number =
              objResponse.objAdministrationDetail.oInfusionAdminDetail.Count;
            for (let idx: number = 0; idx < nInfActionsCount; idx++) {
              oInfActionItem = new InfActionchildDetail();
              oInfActionItem.MedAdminOID =
                objResponse.objAdministrationDetail.MedAdminOID;
              sInfusionAction = CommonBB.GetText(
                objResponse.objAdministrationDetail.oInfusionAdminDetail[idx]
                  .ActionCode,
                InfActionsConceptCodeData.ConceptCodes
              );
              oInfActionItem.ActionCode = sInfusionAction;
              oInfActionItem.AdministeredDate =
                objResponse.objAdministrationDetail.oInfusionAdminDetail[
                  idx
                ].ActionStartDate.ConvertToUser(
                  (o) => {this.IsDST =o},
                  (o2) => {
                    this.IsAmbiguous = o2;
                  },
                  (o3) => {
                    this.IsInvalid = o3;
                  }
                ).ToDateTimeString(
                  this.IsDST,
                  this.IsAmbiguous,
                  CConstants.LongDateWithoutSecs
                );
              oInfActionItem.AdminListDet = new AdminListDetails();
              oInfActionItem.AdminListDet.ActionCode = sInfusionAction;
              if (
                objResponse.objAdministrationDetail.oInfusionAdminDetail[idx]
                  .Route != null
              )
                oInfActionItem.AdminListDet.Route =
                  objResponse.objAdministrationDetail.oInfusionAdminDetail[
                    idx
                  ].Route.Name;
              oInfActionItem.AdminListDet.Bagvolume = this.ValidDecimal(
                objResponse.objAdministrationDetail.oInfusionAdminDetail[idx]
                  .oInfusionBagDetail.BagVolume
              );
              if (
                objResponse.objAdministrationDetail.oInfusionAdminDetail[idx]
                  .oInfusionBagDetail.BagVolumeUOM != null &&
                !String.IsNullOrEmpty(
                  objResponse.objAdministrationDetail.oInfusionAdminDetail[idx]
                    .oInfusionBagDetail.BagVolumeUOM.UOMName
                )
              ) {
                oInfActionItem.AdminListDet.Bagvolume +=
                  ' ' +
                  objResponse.objAdministrationDetail.oInfusionAdminDetail[idx]
                    .oInfusionBagDetail.BagVolumeUOM.UOMName;
              }
              let dVolumeInfused: number = 0.0;
              Number.TryParse(
                objResponse.objAdministrationDetail.oInfusionAdminDetail[idx]
                  .oInfusionBagDetail.InfusedVolume,
                (o) => {
                  dVolumeInfused = o;
                }
              );
              if (
                dVolumeInfused > 0.0 &&
                objResponse.objAdministrationDetail.oInfusionAdminDetail[idx]
                  .oInfusionBagDetail.InfusedVolumeUOM != null &&
                !String.IsNullOrEmpty(
                  objResponse.objAdministrationDetail.oInfusionAdminDetail[idx]
                    .oInfusionBagDetail.InfusedVolumeUOM.UOMName
                )
              ) {
                oInfActionItem.AdminListDet.VolumeInfused =
                  String.Format('{0}', dVolumeInfused) +
                  ' ' +
                  objResponse.objAdministrationDetail.oInfusionAdminDetail[idx]
                    .oInfusionBagDetail.InfusedVolumeUOM.UOMName;
              }
              if (
                !String.IsNullOrEmpty(
                  objResponse.objAdministrationDetail.oInfusionAdminDetail[idx]
                    .InfusionRate
                )
              ) {
                oInfActionItem.AdminListDet.InfusionRate =
                  objResponse.objAdministrationDetail.oInfusionAdminDetail[
                    idx
                  ].InfusionRate;
              }
              if (
                objResponse.objAdministrationDetail.oInfusionAdminDetail[idx]
                  .InfusionRateUOM != null &&
                !String.IsNullOrEmpty(
                  objResponse.objAdministrationDetail.oInfusionAdminDetail[idx]
                    .InfusionRateUOM.UOMName
                )
              ) {
                oInfActionItem.AdminListDet.InfusionRateUOM =
                  objResponse.objAdministrationDetail.oInfusionAdminDetail[
                    idx
                  ].InfusionRateUOM.UOMName;
              }
              if (
                objResponse.objAdministrationDetail.oInfusionAdminDetail[idx]
                  .InfusionRatePerUOM != null &&
                !String.IsNullOrEmpty(
                  objResponse.objAdministrationDetail.oInfusionAdminDetail[idx]
                    .InfusionRatePerUOM.UOMName
                )
              ) {
                oInfActionItem.AdminListDet.InfusionRatePerUOM =
                  objResponse.objAdministrationDetail.oInfusionAdminDetail[
                    idx
                  ].InfusionRatePerUOM.UOMName;
              }
              if (
                !String.IsNullOrEmpty(
                  oInfActionItem.AdminListDet.InfusionRate
                ) &&
                !String.IsNullOrEmpty(
                  oInfActionItem.AdminListDet.InfusionRateUOM
                )
              ) {
                oInfActionItem.AdminListDet.InfusionRateValue =
                  this.ValidDecimal(oInfActionItem.AdminListDet.InfusionRate) +
                  ' ' +
                  oInfActionItem.AdminListDet.InfusionRateUOM;
                if (
                  !String.IsNullOrEmpty(
                    oInfActionItem.AdminListDet.InfusionRatePerUOM
                  )
                ) {
                  oInfActionItem.AdminListDet.InfusionRateValue +=
                    '/' + oInfActionItem.AdminListDet.InfusionRatePerUOM;
                }
              }
              oInfActionItem.AdminListDet.AdministeredDate =
                objResponse.objAdministrationDetail.oInfusionAdminDetail[
                  idx
                ].ActionStartDate.ConvertToUser(
                  (o) => {this.IsDST =o},
                  (o2) => {
                    this.IsAmbiguous = o2;
                  },
                  (o3) => {
                    this.IsInvalid = o3;
                  }
                ).ToDateTimeString(
                  this.IsDST,
                  this.IsAmbiguous,
                  CConstants.LongDateWithoutSecs
                );
              oInfActionItem.AdminListDet.AdministeredBy =
                objResponse.objAdministrationDetail.oInfusionAdminDetail[
                  idx
                ].oInfusionBagDetail.AdministeredBy.Name;
              oInfActionItem.AdminListDet.WitnessedBy =
                objResponse.objAdministrationDetail.oInfusionAdminDetail[
                  idx
                ].oInfusionBagDetail.WitnessedBy.Name;
              oInfActionItem.AdminListDet.SiteName =
                objResponse.objAdministrationDetail.oInfusionAdminDetail[
                  idx
                ].Site;
              oInfActionItem.AdminListDet.LumenValue =
                objResponse.objAdministrationDetail.oInfusionAdminDetail[
                  idx
                ].Lumen;
              oInfActionItem.AdminListDet.DelDeviceValue =
                objResponse.objAdministrationDetail.oInfusionAdminDetail[
                  idx
                ].Deliverydevice;
              oInfActionItem.AdminListDet.BatchNumber =
                objResponse.objAdministrationDetail.oInfusionAdminDetail[
                  idx
                ].oInfusionBagDetail.BatchNumber;
              oInfActionItem.AdminListDet.ExpiryDate =
                objResponse.objAdministrationDetail.oInfusionAdminDetail[idx]
                  .oInfusionBagDetail.ExpiryDate == DateTime.MinValue
                  ? String.Empty
                  : objResponse.objAdministrationDetail.oInfusionAdminDetail[
                    idx
                  ].oInfusionBagDetail.ExpiryDate.ConvertToUser(
                    (o) => {this.IsDST =o},
                    (o2) => {
                      this.IsAmbiguous = o2;
                    },
                    (o3) => {
                      this.IsInvalid = o3;
                    }
                  ).ToDateTimeString(
                    this.IsDST,
                    this.IsAmbiguous,
                    CConstants.ShortDateFormat
                  );
              oInfActionItem.AdminListDet.RecordedAtValue =
                objResponse.objAdministrationDetail.oInfusionAdminDetail[idx]
                  .RecordedAt == DateTime.MinValue
                  ? String.Empty
                  : objResponse.objAdministrationDetail.oInfusionAdminDetail[
                    idx
                  ].RecordedAt.ConvertToUser(
                    (o) => {this.IsDST =o},
                    (o2) => {
                      this.IsAmbiguous = o2;
                    },
                    (o3) => {
                      this.IsInvalid = o3;
                    }
                  ).ToDateTimeString(
                    this.IsDST,
                    this.IsAmbiguous,
                    CConstants.LongDateWithoutSecs
                  );
              oInfActionItem.AdminListDet.RecordedByValue =
                objResponse.objAdministrationDetail.oInfusionAdminDetail[
                  idx
                ].RecordedBy.ToString();
              oInfActionItem.AdminListDet.DripRate =
                objResponse.objAdministrationDetail.oInfusionAdminDetail[
                  idx
                ].DripRate;
              oInfActionItem.AdminListDet.DripRateUOM =
                objResponse.objAdministrationDetail.oInfusionAdminDetail[
                  idx
                ].DripRateUOM.UOMName;
              oInfActionItem.AdminListDet.DripRatePerUOM =
                objResponse.objAdministrationDetail.oInfusionAdminDetail[
                  idx
                ].DripRatePerUOM.UOMName;
              if (
                objResponse.objAdministrationDetail.oInfusionAdminDetail[idx]
                  .oInfusionBagDetail != null &&
                objResponse.objAdministrationDetail.oInfusionAdminDetail[idx]
                  .oInfusionBagDetail.AdministeredBy != null &&
                !String.IsNullOrEmpty(
                  objResponse.objAdministrationDetail.oInfusionAdminDetail[idx]
                    .oInfusionBagDetail.AdministeredBy.Name
                )
              ) {
                oInfActionItem.AdminListDet.AdministeredByValue =
                  objResponse.objAdministrationDetail.oInfusionAdminDetail[
                    idx
                  ].oInfusionBagDetail.AdministeredBy.Name;
              }
              if (
                !String.IsNullOrEmpty(oInfActionItem.AdminListDet.DripRate) &&
                !String.IsNullOrEmpty(oInfActionItem.AdminListDet.DripRateUOM)
              ) {
                oInfActionItem.AdminListDet.DripRateValue =
                  oInfActionItem.AdminListDet.DripRate +
                  ' ' +
                  oInfActionItem.AdminListDet.DripRateUOM;
                if (
                  !String.IsNullOrEmpty(
                    oInfActionItem.AdminListDet.DripRatePerUOM
                  )
                ) {
                  oInfActionItem.AdminListDet.DripRateValue +=
                    '/' + oInfActionItem.AdminListDet.DripRatePerUOM;
                }
              }
              if (
                !String.IsNullOrEmpty(
                  objResponse.objAdministrationDetail.oInfusionAdminDetail[idx]
                    .infusionReasonCode
                )
              ) {
                oInfActionItem.AdminListDet.AdminReasonCode = CommonBB.GetText(
                  objResponse.objAdministrationDetail.oInfusionAdminDetail[idx]
                    .infusionReasonCode,
                  this.AllReasonConceptCodes
                );
              }
              oInfActionItem.AdminListDet.AdminComments =
                objResponse.objAdministrationDetail.oInfusionAdminDetail[
                  idx
                ].infusionComments;
              oInfActionItem.AdminListDet.DoseDiscReasonCode = CommonBB.GetText(
                objResponse.objAdministrationDetail.oInfusionAdminDetail[idx]
                  .DoseDiscReasonCode,
                this.DoseDiscrepancyConceptCodes
              );
              oInfActionItem.AdminListDet.DoseDiscComments =
                objResponse.objAdministrationDetail.oInfusionAdminDetail[
                  idx
                ].DoseDiscComments;
              oInfActionItem.AdminListDet.Humidification = CommonBB.GetText(
                objResponse.objAdministrationDetail.oInfusionAdminDetail[idx]
                  .Humidification,
                this.HumidificationCodes
              );
              if (
                !String.IsNullOrEmpty(
                  objResponse.objAdministrationDetail.InfusionPeriodforMedAdmin.ToString()
                ) &&
                !String.IsNullOrEmpty(
                  objResponse.objAdministrationDetail
                    .InfusionPeriodUOMforMedAdmin.UOMName
                )
              ) {
                oInfActionItem.AdminListDet.InfusionPeriodValue =
                  objResponse.objAdministrationDetail.InfusionPeriodforMedAdmin.ToString() +
                  ' ' +
                  objResponse.objAdministrationDetail
                    .InfusionPeriodUOMforMedAdmin.UOMName;
              }
              if (
                !String.IsNullOrEmpty(
                  objResponse.objAdministrationDetail.oInfusionAdminDetail[idx]
                    .ConcentrationStrength
                ) &&
                !String.IsNullOrEmpty(
                  objResponse.objAdministrationDetail.oInfusionAdminDetail[idx]
                    .ConcentrationStrengthUOM.UOMName
                ) &&
                !String.IsNullOrEmpty(
                  objResponse.objAdministrationDetail.oInfusionAdminDetail[idx]
                    .ConcentrationVolume
                ) &&
                !String.IsNullOrEmpty(
                  objResponse.objAdministrationDetail.oInfusionAdminDetail[idx]
                    .ConcentrationVolumeUOM.UOMName
                )
              ) {
                oInfActionItem.AdminListDet.ConcentrationValue =
                  objResponse.objAdministrationDetail.oInfusionAdminDetail[idx]
                    .ConcentrationStrength +
                  ' ' +
                  objResponse.objAdministrationDetail.oInfusionAdminDetail[idx]
                    .ConcentrationStrengthUOM.UOMName +
                  '/' +
                  objResponse.objAdministrationDetail.oInfusionAdminDetail[idx]
                    .ConcentrationVolume +
                  ' ' +
                  objResponse.objAdministrationDetail.oInfusionAdminDetail[idx]
                    .ConcentrationVolumeUOM.UOMName;
              }
              if (
                !String.IsNullOrEmpty(
                  objResponse.objAdministrationDetail.oInfusionAdminDetail[
                    idx
                  ].InfusionDose.ToString()
                ) &&
                !String.IsNullOrEmpty(
                  objResponse.objAdministrationDetail.oInfusionAdminDetail[idx]
                    .InfusionDoseUOMNumerator.UOMName
                ) &&
                !String.IsNullOrEmpty(
                  objResponse.objAdministrationDetail.oInfusionAdminDetail[idx]
                    .InfusionDoseUOMDenominator.UOMName
                )
              ) {
                oInfActionItem.AdminListDet.InfusionDoseValue =
                  objResponse.objAdministrationDetail.oInfusionAdminDetail[
                    idx
                  ].InfusionDose.ToString() +
                  ' ' +
                  objResponse.objAdministrationDetail.oInfusionAdminDetail[idx]
                    .InfusionDoseUOMNumerator.UOMName +
                  '/' +
                  objResponse.objAdministrationDetail.oInfusionAdminDetail[idx]
                    .InfusionDoseUOMDenominator.UOMName;
              }
              oInfActionItem.AdminListDet.IsMedScannedProduct =
                objResponse.objAdministrationDetail.oInfusionAdminDetail[
                  idx
                ].IsMedScannedProduct;
              oInfActionItem.MedInfusionOID =
                objResponse.objAdministrationDetail.oInfusionAdminDetail[
                  idx
                ].MedAdminInfusionOID;
              this.SelectedSlot.MedAdminInfusionOID =
                objResponse.objAdministrationDetail.oInfusionAdminDetail[
                  idx
                ].MedAdminInfusionOID;
              if (
                (oInfActionItem.ActionCode == 'Begun' ||
                  oInfActionItem.ActionCode == 'Change bag') &&
                oInfActionItem.AdminListDet.IsMedScannedProduct == '1'
              ) {
                oInfActionItem.AdminListDet.IsViewRecMedLinkExists =
                  Visibility.Visible;
              } else {
                oInfActionItem.AdminListDet.IsViewRecMedLinkExists =
                  Visibility.Collapsed;
              }
              oInfActionList.Add(oInfActionItem);
            }
            if (IsFetchRecentActionOnly == 0) {
              this.SelectedSlot.infuactchldDet = oInfActionList;
              this.SelectedSlot.SelectedInfAction = oInfActionList?.First();
            } else {
              if (oInfActionItem != null && oInfActionItem.AdminListDet != null)
                this.SelectedSlot.AdminListDet = oInfActionItem.AdminListDet;
            }
            this.UpdateFauxTabDataContext('Administration');
          }
        }
        this.getdataChild.emit(true);
      } catch (ex: any) {
        let lnReturn: number = AMSHelper.PublicExceptionDetails(
          _ErrorID,
          _ErrorSource,
          ex
        );
      }
    } else {
      let lnReturn: number = AMSHelper.PublicExceptionDetails(
        _ErrorID,
        _ErrorSource,
        e.Error
      );
    }
  }
  public ValidDecimal(sValue: string): string {
    let fParValue: number = 0;
    if (
      !String.IsNullOrEmpty(sValue) &&
      sValue.IndexOf('.') != -1 &&
      Double.TryParse(sValue, (o) => {
        fParValue = o;
      }) &&
      fParValue > 0
    ) {
      return Convert.ToString(fParValue);
    }
    return sValue;
  }
  private _SelectedAdminDetailsFauxTab: iTabItem;
  public get SelectedAdminDetailsFauxTab(): iTabItem {
    return this._SelectedAdminDetailsFauxTab;
  }
  public set SelectedAdminDetailsFauxTab(value: iTabItem) {
    if (
      !ObjectHelper.ReferenceEquals(this._SelectedAdminDetailsFauxTab, value)
    ) {
      this._SelectedAdminDetailsFauxTab = value;
      //NotifyPropertyChanged("SelectedAdminDetailsFauxTab");
      this.LoadFauxTabData();
    }
  }
  private DisposeVMEvents(): void {
    // this.DoseDetailEvent -= this.PrescriptionItemDetailsVM_DoseDetailEvent;
    // if (this.MultiDoseDetailVM != null) {
    //     this.MultiDoseDetailVM.SteppedDoseCompleted -= this.MultiDoseDetailVM_SteppedDoseCompleted;
    //     this.MultiDoseDetailVM.TitratedDoseCompleted -= this.MultiDoseDetailVM_TitratedDoseCompleted;
    // }
    // if (this.SelectedSlot != null) {
    //     this.SelectedSlot.OnInfActionRowChanged -= this.SelectedSlot_OnInfActionRowChanged;
    // }
  }
  public DoCleanUP(): void {
    this.DisposeVMEvents();
  }
  objService_GetPatientPersonalCarerCompleted(
    sender: Object,
    e: GetPatientPersonalCarerCompletedEventArgs
  ): void {
    if (e.Error != null) return;
    let objRes: CResMsgGetPatientPersonalCarer = e.Result;
    if (
      objRes != null &&
      objRes.oPersonalCarer != null &&
      objRes.oPersonalCarer.Count > 0
    ) {
      this.personalCarers = new ObservableCollection<CListItem>();
      objRes.oPersonalCarer.forEach((carer) => {
        let item: CListItem = new CListItem();
        item.DisplayText = String.Concat(carer.SurName, ' ', carer.ForeName);
        item.Value = carer.PersonalCarerOID;
        item.Tag = carer.Relationship;
        this.personalCarers.Add(item);
        this.conceptCodes.Append(carer.Relationship);
        this.conceptCodes.Append('~^~');
      });
    }
  }
  private LoadFauxTabData(): void {
    if (this.SelectedSlot != null && this.SelectedAdminDetailsFauxTab != null) {
      switch (this.SelectedAdminDetailsFauxTab.Key) {
        case 'Administration':
          if (!this.SelectedSlot.IsInfusion) {
            if (this.SelectedSlot.AdminListDet == null)
              this.GetAdministrationDetails(
                this.SelectedSlot.MedAdminOID,
                this.SelectedSlot.EntDoseRecordedAt,
                this.SelectedSlot.EntDoseRecordedBy
              );
            else this.UpdateFauxTabDataContext('Administration');
          } else {
            if (
              this.SelectedSlot.StatusCode ==
              CnstSlotStatus.DEFERADMINISTRATION ||
              this.SelectedSlot.StatusCode == CnstSlotStatus.DEFERDUE ||
              this.SelectedSlot.StatusCode == CnstSlotStatus.DEFEROVERDUE ||
              this.SelectedSlot.StatusCode == CnstSlotStatus.NOTGIVEN ||
              String.Equals(
                this.SelectedSlot.StatusCode,
                CnstSlotStatus.NOTKNOWN
              ) ||
              this.AdditionalDetails.IsBolus ||
              String.Equals(
                this.SelectedSlot.StatusCode,
                CnstSlotStatus.HOMELEAVE
              )
            ) {
              if (this.SelectedSlot.AdminListDet == null)
                this.GetAdministrationDetails(
                  this.SelectedSlot.MedAdminOID,
                  this.SelectedSlot.EntDoseRecordedAt,
                  this.SelectedSlot.EntDoseRecordedBy
                );
              else this.UpdateFauxTabDataContext('Administration');
            } else {
              if (this.SelectedSlot.SelectedInfAction == null)
                this.GetInfuactchldDetl(
                  this.SelectedSlot.MedAdminOID,
                  this.MCVersion,
                  1
                );
              else this.UpdateFauxTabDataContext('Administration');
            }
          }
          break;
        case 'Bagdetails':
          if (this.SelectedSlot.oBagDetailsVM == null) {
            this.SelectedSlot.oBagDetailsVM = new BagDetailsVM();
            this.SelectedSlot.oBagDetailsVM.InfustionType =
              this.objDrugDetailsData.InfusionDetails.InfusionType.Value;
            this.SelectedSlot.oBagDetailsVM.GetInfBagDetails(
              this.SelectedSlot.MedAdminOID,
              this.MCVersion
            );
            //Not Required for LHS. To be Re-Visited.
                            let oBagDetailsView: medbagdetails = ObjectHelper.CreateType<medbagdetails>(this.SelectedAdminDetailsFauxTab.Content, medbagdetails);
                            oBagDetailsView.DataContext = this.SelectedSlot.oBagDetailsVM;
                            
          } else {
            this.UpdateFauxTabDataContext('Bagdetails');
          }
          break;
      }
    }
  }
  public UpdateFauxTabDataContext(sTabKey: string): void {
    switch (sTabKey) {
      case 'Administration':
        //Not Required for LHS. To be Re-Visited.
        let oDetailEventView: MedsAdminEventDetails = ObjectHelper.CreateType<MedsAdminEventDetails>(this.SelectedAdminDetailsFauxTab.Content, MedsAdminEventDetails);
        if (oDetailEventView != null) {
          if (!this.AdditionalDetails.IsInfusion){
            oDetailEventView.DataContext = this.SelectedSlot.AdminListDet;
            oDetailEventView.objPrescriptionItemDetailsVM = this;
          }
          else {
            if (this.SelectedSlot.IsAdminRowExpanded) {
              if (this.SelectedSlot.SelectedInfAction != null) {
                oDetailEventView.DataContext = this.SelectedSlot.SelectedInfAction.AdminListDet;
              }
              else {
                oDetailEventView.DataContext = null;
              }
            }
            else {
              oDetailEventView.DataContext = this.SelectedSlot.AdminListDet;
            }
          }
        }
        break;
      case 'Bagdetails':
        //Not Required for LHS. To be Re-Visited.
        let oBagDetailsView: medbagdetails = ObjectHelper.CreateType<medbagdetails>(this.SelectedAdminDetailsFauxTab.Content, medbagdetails);
                    if (oBagDetailsView != null) {
                        oBagDetailsView.DataContext = this.SelectedSlot.oBagDetailsVM;
                    }
        break;
    }
  }
  public GetDoseCalcDomainValues(): void {
    let sDomainCodes: string = String.Empty;
    sDomainCodes = 'MEDDBSAFR,MEDDCALFOR,DSOVRACKWRSN,DEFWEIGHTTYPE,REQDOSE';
    ProcessRTE.GetHierarchicalValuesByDomains(
      CConstants.CodingSchemeName,
      CConstants.Version,
      CConstants.FilterType,
      ContextInfo.Culture,
      sDomainCodes,
      (s, e) => {
        this.OnRTEResultDC(s);
      }
    );
  }
  OnRTEResultDC(args: RTEEventargs): void {
    if (String.IsNullOrEmpty(args.Request) || args.Result == null) return;
    if (args.Result instanceof Dictionary) {
      let objResult: Dictionary<string, List<CListItem>> = <
        Dictionary<string, List<CListItem>>
        >args.Result;
      if (
        String.Compare(
          args.Request,
          'MEDDBSAFR,MEDDCALFOR,DSOVRACKWRSN,DEFWEIGHTTYPE,REQDOSE'
        ) == 0
      ) {
        DoseCalcConceptCodeData.ConceptCodes =
          new ObservableCollection<CValuesetTerm>();
        objResult.forEach((objDomainDetail) => {
          if (
            objDomainDetail.Value != null &&
            objDomainDetail.Value.Count > 0
          ) {
            objDomainDetail.Value.forEach((oCListItem) => {
              DoseCalcConceptCodeData.ConceptCodes.Add(
                ObjectHelper.CreateObject(new CValuesetTerm(), {
                  csCode: oCListItem.Value,
                  csDescription: oCListItem.DisplayText,
                })
              );
            });
          }
        });
      }
    }
    this.GetDoseDetailsAsync();
  }
}
export class DrugDetailsOrderData {
  private a: string;
  private b: string;
  private c: string;
  private d: string;
  public get DrugPropertyCode(): string {
    return this.a;
  }
  public set DrugPropertyCode(value: string) {
    this.a = value;
  }
  public get IdentifyingType(): string {
    return this.b;
  }
  public set IdentifyingType(value: string) {
    this.b = value;
  }
  public get HighRiskMsg(): string {
    return this.c;
  }
  public set HighRiskMsg(value: string) {
    this.c = value;
  }
  public get OrderPriscribedName(): string {
    return this.d;
  }
  public set OrderPriscribedName(value: string) {
    this.d = value;
  }
}
export class DrugDetailsData extends ViewModelBase {
  private a: string;
  private b: string;
  private c: string;
  private d: string;
  private f: string;
  private h: string;
  private i: string;
  private j: string;
  private k: string;
  private l: string;
  private m: string;
  private problem: string;
  private status: string;
  private n: string;
  private o: string;
  private p: string;
  private q: string;
  private r: string;
  private s: string;
  private t: string;
  private u: string;
  private v: string;
  private w: string;
  private ww: string = Resource.DrugDetails.lblStartDateName_Text;
  private x: string;
  private xx: string;
  private y: string;
  private yy: string;
  private z: string;
  private zz: string;
  private e: DrugDetailsOrderData;
  private g: Object;
  private strength: string;
  private prnInstruction: string;
  private expiredttm: DateTime = DateTime.MinValue;
  private direction: string;
  private doseType: string;
  private idenName: string;
  private idenType: string;
  private quantityVal: string;
  private quantityUOM: string;
  private ExistsOnAdmission: string;
  public DrugProperty: ObservableCollection<IPPManagePrescSer.DrugProperty>;
  public TechValSupplyInstructionText: ObservableCollection<CListItem>;
  private presType: string;
  private adminMethod: string;
  private scheduleTime: string;
  private itemsubtype: string;
  private mcitemdisplay: string;
  private mcIIdentifyingName: string;
  private mcLorenzoid: string;
  private isnewmeds: boolean = false;
  private vmvpIdentifyingName: string;
  private vmvpLzoID: string;
  private supplyInstructionComments: string;
  private _IsinDefiniteOmitDTTM: DateTime = DateTime.MinValue;
  private _IsinDefiniteOmit: boolean = false;
  private _OmittedBy: string;
  private _OmitComments: string;
  private _ReviewComments: string;
  private _ReviewRequestedBy: string;
  private _ReviewType: string;
  private _ReviewPeriodDTTM: DateTime = DateTime.MinValue;
  private _oReviewAfterDTTM: DateTime = DateTime.MinValue;
  public get ReviewAfterDTTM(): DateTime {
    return this._oReviewAfterDTTM;
  }
  public set ReviewAfterDTTM(value: DateTime) {
    this._oReviewAfterDTTM = value;
    //NotifyPropertyChanged("ReviewAfterDTTM");
  }
  private _oReviewAfterComments: string;
  public get ReviewAfterComments(): string {
    return this._oReviewAfterComments;
  }
  public set ReviewAfterComments(value: string) {
    this._oReviewAfterComments = value;
    //NotifyPropertyChanged("ReviewAfterComments");
  }
  private _oIsReviewExists: boolean = false;
  public get IsReviewExists(): boolean {
    return this._oIsReviewExists;
  }
  public set IsReviewExists(value: boolean) {
    this._oIsReviewExists = value;
    //NotifyPropertyChanged("IsReviewExists");
  }
  public get ScheduleTime(): string {
    return this.scheduleTime;
  }
  public set ScheduleTime(value: string) {
    this.scheduleTime = value;
    //NotifyPropertyChanged("ScheduleTime");
  }
  public get AdminMethod(): string {
    return this.adminMethod;
  }
  public set AdminMethod(value: string) {
    this.adminMethod = value;
    //NotifyPropertyChanged("AdminMethod");
  }
  public get PresType(): string {
    return this.presType;
  }
  public set PresType(value: string) {
    this.presType = value;
    //NotifyPropertyChanged("PresType");
  }
  public get QuantityUOM(): string {
    return this.quantityUOM;
  }
  public set QuantityUOM(value: string) {
    this.quantityUOM = value;
    //NotifyPropertyChanged("QuantityUOM");
  }
  public get QuantityVal(): string {
    return this.quantityVal;
  }
  public set QuantityVal(value: string) {
    this.quantityVal = value;
    //NotifyPropertyChanged("QuantityVal");
  }
  public get IdentifyingType(): string {
    return this.idenType;
  }
  public set IdentifyingType(value: string) {
    this.idenType = value;
    //NotifyPropertyChanged("IdentifyingType");
  }
  public get IdentifyingName(): string {
    return this.idenName;
  }
  public set IdentifyingName(value: string) {
    this.idenName = value;
    //NotifyPropertyChanged("IdentifyingName");
  }
  public get ItemSubType(): string {
    return this.itemsubtype;
  }
  public set ItemSubType(value: string) {
    this.itemsubtype = value;
    //NotifyPropertyChanged("ItemSubType");
  }
  public get MCItemDisplay(): string {
    return this.mcitemdisplay;
  }
  public set MCItemDisplay(value: string) {
    this.mcitemdisplay = value;
    //NotifyPropertyChanged("MCItemDisplay");
  }
  public get ISnewmeds(): boolean {
    return this.isnewmeds;
  }
  public set ISnewmeds(value: boolean) {
    this.isnewmeds = value;
    //NotifyPropertyChanged("ISnewmeds");
  }
  public get DoseType(): string {
    return this.doseType;
  }
  public set DoseType(value: string) {
    this.doseType = value;
    //NotifyPropertyChanged("DoseType");
  }
  public get Direction(): string {
    return this.direction;
  }
  public set Direction(value: string) {
    this.direction = value;
    //NotifyPropertyChanged("Direction");
  }
  public get VMVPIdentifyingName(): string {
    return this.vmvpIdentifyingName;
  }
  public set VMVPIdentifyingName(value: string) {
    this.vmvpIdentifyingName = value;
    //NotifyPropertyChanged("VMVPIdentifyingName");
  }
  public get VMVPLzoID(): string {
    return this.vmvpLzoID;
  }
  public set VMVPLzoID(value: string) {
    this.vmvpLzoID = value;
    //NotifyPropertyChanged("VMVPLzoID");
  }
  public get Expiredttm(): DateTime {
    return this.expiredttm;
  }
  public set Expiredttm(value: DateTime) {
    this.expiredttm = value;
    //NotifyPropertyChanged("Expiredttm");
  }
  public get PRNInstruction(): string {
    return this.prnInstruction;
  }
  public set PRNInstruction(value: string) {
    this.prnInstruction = value;
    //NotifyPropertyChanged("PRNInstruction");
  }
  public get Strength(): string {
    return this.strength;
  }
  public set Strength(value: string) {
    this.strength = value;
    //NotifyPropertyChanged("Strength");
  }
  public get DoseDetailsContent(): Object {
    return this.g;
  }
  public set DoseDetailsContent(value: Object) {
    this.g = value;
  }
  public get DrugOrderData(): DrugDetailsOrderData {
    return this.e;
  }
  public set DrugOrderData(value: DrugDetailsOrderData) {
    this.e = value;
  }
  public get OrderPriscribedName(): string {
    return this.a;
  }
  public set OrderPriscribedName(value: string) {
    this.a = value;
    //NotifyPropertyChanged("OrderPriscribedName");
  }
  public get Dose(): string {
    return this.b;
  }
  public set Dose(value: string) {
    this.b = value;
    //NotifyPropertyChanged("Dose");
  }
  public get Route(): string {
    return this.c;
  }
  public set Route(value: string) {
    this.c = value;
    //NotifyPropertyChanged("Route");
  }
  public get Form(): string {
    return this.d;
  }
  public set Form(value: string) {
    this.d = value;
    //NotifyPropertyChanged("Form");
  }
  public get Frequency(): string {
    return this.f;
  }
  public set Frequency(value: string) {
    this.f = value;
    //NotifyPropertyChanged("Frequency");
  }
  private _DaysOfweekText: string;
  public get DaysOfweekText(): string {
    return this._DaysOfweekText;
  }
  public set DaysOfweekText(value: string) {
    this._DaysOfweekText = value;
    //NotifyPropertyChanged("DaysOfweekText");
  }
  public get Site(): string {
    return this.h;
  }
  public set Site(value: string) {
    this.h = value;
    //NotifyPropertyChanged("Site");
  }
  public get StartDate(): string {
    return this.i;
  }
  public set StartDate(value: string) {
    this.i = value;
    //NotifyPropertyChanged("StartDate");
  }
  public get Duration(): string {
    return this.j;
  }
  public set Duration(value: string) {
    this.j = value;
    //NotifyPropertyChanged("Duration");
  }
  public get StopDate(): string {
    return this.k;
  }
  public set StopDate(value: string) {
    this.k = value;
    //NotifyPropertyChanged("StopDate");
  }
  public get Problem(): string {
    return this.problem;
  }
  public set Problem(value: string) {
    this.problem = value;
    //NotifyPropertyChanged("Problem");
  }
  public get Status(): string {
    return this.status;
  }
  public set Status(value: string) {
    this.status = value;
    //NotifyPropertyChanged("Status");
  }
  public get Supply(): string {
    return this.n;
  }
  public set Supply(value: string) {
    this.n = value;
    //NotifyPropertyChanged("Supply");
  }
  public get NoInstalments(): string {
    return this.o;
  }
  public set NoInstalments(value: string) {
    this.o = value;
    //NotifyPropertyChanged("NoInstalments");
  }
  public get IntervalInstalments(): string {
    return this.p;
  }
  public set IntervalInstalments(value: string) {
    this.p = value;
    //NotifyPropertyChanged("IntervalInstalments");
  }
  public get AdminInsturction(): string {
    return this.q;
  }
  public set AdminInsturction(value: string) {
    this.q = value;
    //NotifyPropertyChanged("AdminInsturction");
  }
  public get DisInstruction(): string {
    return this.r;
  }
  public set DisInstruction(value: string) {
    this.r = value;
    //NotifyPropertyChanged("DisInstruction");
  }
  public get SupplyInstruction(): string {
    return this.s;
  }
  public set SupplyInstruction(value: string) {
    this.s = value;
    //NotifyPropertyChanged("SupplyInstruction");
  }
  public get SupplyInstructionComments(): string {
    return this.supplyInstructionComments;
  }
  public set SupplyInstructionComments(value: string) {
    this.supplyInstructionComments = value;
    //NotifyPropertyChanged("SupplyInstructionComments");
  }
  public get UsedWith(): string {
    return this.t;
  }
  public set UsedWith(value: string) {
    this.t = value;
    //NotifyPropertyChanged("UsedWith");
  }
  public get TreatmentCont(): string {
    return this.u;
  }
  public set TreatmentCont(value: string) {
    this.u = value;
    //NotifyPropertyChanged("TreatmentCont");
  }
  public get StationryType(): string {
    return this.v;
  }
  public set StationryType(value: string) {
    this.v = value;
    //NotifyPropertyChanged("StationryType");
  }
  public get Addition(): string {
    return this.w;
  }
  public set Addition(value: string) {
    this.w = value;
  }
  public get MedicationClerking(): string {
    return this.x;
  }
  public set MedicationClerking(value: string) {
    this.x = value;
    //NotifyPropertyChanged("MedicationClerking");
  }
  public get MedicationClerkingSource(): string {
    return this.xx;
  }
  public set MedicationClerkingSource(value: string) {
    this.xx = value;
    //NotifyPropertyChanged("MedicationClerkingSource");
  }
  public get DoesCalcExist(): string {
    return this.y;
  }
  public set DoesCalcExist(value: string) {
    this.y = value;
    //NotifyPropertyChanged("DoesCalcExist");
  }
  public get ConflictsExist(): string {
    return this.z;
  }
  public set ConflictsExist(value: string) {
    this.z = value;
    //NotifyPropertyChanged("ConflictsExist");
  }
  public get Insinstruction(): string {
    return this.zz;
  }
  public set Insinstruction(value: string) {
    this.zz = value;
    //NotifyPropertyChanged("Insinstruction");
  }
  public get Endorsementprop(): string {
    return this.yy;
  }
  public set Endorsementprop(value: string) {
    this.yy = value;
    //NotifyPropertyChanged("Endorsementprop");
  }
  public get StartDateText(): string {
    return this.ww;
  }
  public set StartDateText(value: string) {
    this.ww = value;
    //NotifyPropertyChanged("StartDateText");
  }
  public get AuthorisedBy(): string {
    return this.l;
  }
  public set AuthorisedBy(value: string) {
    this.l = value;
    //NotifyPropertyChanged("AuthorisedBy");
  }
  public get AuthorisedDate(): string {
    return this.m;
  }
  public set AuthorisedDate(value: string) {
    this.m = value;
    //NotifyPropertyChanged("AuthorisedDate");
  }
  public get AuthoriseComment(): string {
    return this.n;
  }
  public set AuthoriseComment(value: string) {
    this.n = value;
    //NotifyPropertyChanged("AuthoriseComment");
  }
  private _InfusionDetails: InfusionLineItemVM;
  public get InfusionDetails(): InfusionLineItemVM {
    return this._InfusionDetails;
  }
  public set InfusionDetails(value: InfusionLineItemVM) {
    this._InfusionDetails = value;
    //NotifyPropertyChanged("InfusionDetails");
  }
  private review: string;
  public get Review(): string {
    return this.review;
  }
  public set Review(value: string) {
    this.review = value;
    //NotifyPropertyChanged("Review");
  }
  private seqno: string;
  public get Seqno(): string {
    return this.seqno;
  }
  public set Seqno(value: string) {
    this.seqno = value;
    //NotifyPropertyChanged("Seqno");
  }
  private seqPItemOIDs: IPPManagePrescSer.ArrayOfLong;
  public get SeqPItemOIDs(): IPPManagePrescSer.ArrayOfLong {
    return this.seqPItemOIDs;
  }
  public set SeqPItemOIDs(value: IPPManagePrescSer.ArrayOfLong) {
    this.seqPItemOIDs = value;
    //NotifyPropertyChanged("SeqPItemOIDs");
  }
  private deliverydevice: string;
  public get Deliverydevice(): string {
    return this.deliverydevice;
  }
  public set Deliverydevice(value: string) {
    this.deliverydevice = value;
    //NotifyPropertyChanged("Deliverydevice");
  }
  private lumen: string;
  public get Lumen(): string {
    return this.lumen;
  }
  public set Lumen(value: string) {
    this.lumen = value;
    //NotifyPropertyChanged("Lumen");
  }
  private maxdose: string;
  public get Maxdose(): string {
    return this.maxdose;
  }
  public set Maxdose(value: string) {
    this.maxdose = value;
    //NotifyPropertyChanged("Maxdose");
  }
  private targetrange: string;
  public get Targetrange(): string {
    return this.targetrange;
  }
  public set Targetrange(value: string) {
    this.targetrange = value;
    //NotifyPropertyChanged("Targetrange");
  }
  private isPrevious: boolean = false;
  public get IsPrevious(): boolean {
    return this.isPrevious;
  }
  public set IsPrevious(value: boolean) {
    this.isPrevious = value;
    //NotifyPropertyChanged("IsPrevious");
  }
  private isNext: boolean = false;
  public get IsNext(): boolean {
    return this.isNext;
  }
  public set IsNext(value: boolean) {
    this.isNext = value;
    //NotifyPropertyChanged("IsNext");
  }
  private isVisiblePrevious: string;
  public get IsVisiblePrevious(): string {
    return this.isVisiblePrevious;
  }
  public set IsVisiblePrevious(value: string) {
    this.isVisiblePrevious = value;
    //NotifyPropertyChanged("IsVisiblePrevious");
  }
  private isVisibleNext: string;
  public get IsVisibleNext(): string {
    return this.isVisibleNext;
  }
  public set IsVisibleNext(value: string) {
    this.isVisibleNext = value;
    //NotifyPropertyChanged("IsVisibleNext");
  }
  public get MCIIdentifyingName(): string {
    return this.mcIIdentifyingName;
  }
  public set MCIIdentifyingName(value: string) {
    this.mcIIdentifyingName = value;
    //NotifyPropertyChanged("MCIIdentifyingName");
  }
  public get MCLorenzoid(): string {
    return this.mcLorenzoid;
  }
  public set MCLorenzoid(value: string) {
    this.mcLorenzoid = value;
    //NotifyPropertyChanged("MCLorenzoid");
  }
  private isConditionalExists: boolean = false;
  public get IsConditionalExists(): boolean {
    return this.isConditionalExists;
  }
  public set IsConditionalExists(value: boolean) {
    this.isConditionalExists = value;
    //NotifyPropertyChanged("IsConditionalExists");
  }
  public get ExistsOnAdmissionField(): string {
    return this.ExistsOnAdmission;
  }
  public set ExistsOnAdmissionField(value: string) {
    this.ExistsOnAdmission = value;
    //NotifyPropertyChanged("ExistsOnAdmissionField");
  }
  public get IsinDefiniteOmit(): boolean {
    return this._IsinDefiniteOmit;
  }
  public set IsinDefiniteOmit(value: boolean) {
    this._IsinDefiniteOmit = value;
    //NotifyPropertyChanged("IsinDefiniteOmit");
  }
  public get OmittedBy(): string {
    return this._OmittedBy;
  }
  public set OmittedBy(value: string) {
    this._OmittedBy = value;
    //NotifyPropertyChanged("OmittedBy");
  }
  public get OmitComments(): string {
    return this._OmitComments;
  }
  public set OmitComments(value: string) {
    this._OmitComments = value;
    //NotifyPropertyChanged("OmitComments");
  }
  public get IsinDefiniteOmitDTTM(): DateTime {
    return this._IsinDefiniteOmitDTTM;
  }
  public set IsinDefiniteOmitDTTM(value: DateTime) {
    this._IsinDefiniteOmitDTTM = value;
    //NotifyPropertyChanged("IsinDefiniteOmitDTTM");
  }
  public get ReviewComments(): string {
    return this._ReviewComments;
  }
  public set ReviewComments(value: string) {
    this._ReviewComments = value;
    //NotifyPropertyChanged("ReviewComments");
  }
  public get ReviewRequestedBy(): string {
    return this._ReviewRequestedBy;
  }
  public set ReviewRequestedBy(value: string) {
    this._ReviewRequestedBy = value;
    //NotifyPropertyChanged("ReviewRequestedBy");
  }
  public get ReviewType(): string {
    return this._ReviewType;
  }
  public set ReviewType(value: string) {
    this._ReviewType = value;
    //NotifyPropertyChanged("ReviewType");
  }
  public get ReviewPeriodDTTM(): DateTime {
    return this._ReviewPeriodDTTM;
  }
  public set ReviewPeriodDTTM(value: DateTime) {
    this._ReviewPeriodDTTM = value;
    //NotifyPropertyChanged("ReviewPeriodDTTM");
  }
  private _isReviewAfterDetailsVisible: Visibility = Visibility.Collapsed;
  public get IsReviewAfterDetailsVisible(): Visibility {
    return this._isReviewAfterDetailsVisible;
  }
  public set IsReviewAfterDetailsVisible(value: Visibility) {
    this._isReviewAfterDetailsVisible = value;
    //NotifyPropertyChanged("IsReviewAfterDetailsVisible");
  }
  private _UpdateHistoryVisible: Visibility = Visibility.Collapsed;
  public get UpdateHistoryVisible(): Visibility {
    return this._UpdateHistoryVisible;
  }
  public set UpdateHistoryVisible(value: Visibility) {
    this._UpdateHistoryVisible = value;
    //NotifyPropertyChanged("UpdateHistoryVisible");
  }
  private _IsWardStock: boolean = false;
  public get IsWardStock(): boolean {
    return this._IsWardStock;
  }
  public set IsWardStock(value: boolean) {
    this._IsWardStock = value;
    //NotifyPropertyChanged("IsWardStock");
  }
  private _IsCriticalMed: boolean = false;
  public get IsCriticalMed(): boolean {
    return this._IsCriticalMed;
  }
  public set IsCriticalMed(value: boolean) {
    this._IsCriticalMed = value;
    //NotifyPropertyChanged("IsCriticalMed");
  }
  private _IsDoseCalcExists: string;
  public get IsDoseCalcExists(): string {
    return this._IsDoseCalcExists;
  }
  public set IsDoseCalcExists(value: string) {
    this._IsDoseCalcExists = value;
    //NotifyPropertyChanged("IsDoseCalcExists");
  }
}
export class TechnicalDetails extends ViewModelBase {
  private IdentifyingNameField: string;
  public get IdentifyingName(): string {
    return this.IdentifyingNameField;
  }
  public set IdentifyingName(value: string) {
    this.IdentifyingNameField = value;
    //NotifyPropertyChanged("IdentifyingName");
  }
  private QuantityPerDoseWithUOMField: string;
  public get QuantityPerDoseWithUOM(): string {
    return this.QuantityPerDoseWithUOMField;
  }
  public set QuantityPerDoseWithUOM(value: string) {
    this.QuantityPerDoseWithUOMField = value;
    //NotifyPropertyChanged("QuantityPerDoseWithUOM");
  }
  private TotalQuantityWithUOMField: string;
  public get TotalQuantityWithUOM(): string {
    return this.TotalQuantityWithUOMField;
  }
  public set TotalQuantityWithUOM(value: string) {
    this.TotalQuantityWithUOMField = value;
    //NotifyPropertyChanged("TotalQuantityWithUOM");
  }
  private SupplyInstructionDescField: string;
  public get SupplyInstructionDesc(): string {
    return this.SupplyInstructionDescField;
  }
  public set SupplyInstructionDesc(value: string) {
    this.SupplyInstructionDescField = value;
    //NotifyPropertyChanged("SupplyInstructionDesc");
  }
  private DispensingDetailField: List<IPPManagePrescSer.PresItemRequestDetails>;
  public get DispensingDetail(): List<IPPManagePrescSer.PresItemRequestDetails> {
    return this.DispensingDetailField;
  }
  public set DispensingDetail(
    value: List<IPPManagePrescSer.PresItemRequestDetails>
  ) {
    this.DispensingDetailField = value;
    //NotifyPropertyChanged("DispensingDetail");
  }
  private PrescriptionItemOIDField: number = 0;
  public get PrescriptionItemOID(): number {
    return this.PrescriptionItemOIDField;
  }
  public set PrescriptionItemOID(value: number) {
    this.PrescriptionItemOIDField = value;
    //NotifyPropertyChanged("PrescriptionItemOID");
  }
  private MedSupplyDetailOIDField: number = 0;
  public get MedSupplyDetailOID(): number {
    return this.MedSupplyDetailOIDField;
  }
  public set MedSupplyDetailOID(value: number) {
    this.MedSupplyDetailOIDField = value;
    //NotifyPropertyChanged("MedSupplyDetailOID");
  }
  private DispenseStatusField: number = 0;
  public get DispenseStatus(): number {
    return this.DispenseStatusField;
  }
  public set DispenseStatus(value: number) {
    this.DispenseStatusField = value;
    //NotifyPropertyChanged("DispenseStatus");
  }
  private OtherDispensingInstructionField: string;
  public get OtherDispensingInstruction(): string {
    return this.OtherDispensingInstructionField;
  }
  public set OtherDispensingInstruction(value: string) {
    this.OtherDispensingInstructionField = value;
    //NotifyPropertyChanged("OtherDispensingInstruction");
  }
  private _IsCancelledField: boolean = false;
  public get IsCancelled(): boolean {
    return this._IsCancelledField;
  }
  public set IsCancelled(value: boolean) {
    this._IsCancelledField = value;
    //NotifyPropertyChanged("IsCancelled");
  }
  private _IsWardStock: boolean = false;
  public get IsWardStock(): boolean {
    return this._IsWardStock;
  }
  public set IsWardStock(value: boolean) {
    this._IsWardStock = value;
    //NotifyPropertyChanged("IsWardStock");
  }
  private _PrescriptionItemStatus: string;
  public get PrescriptionItemStatus(): string {
    return this._PrescriptionItemStatus;
  }
  public set PrescriptionItemStatus(value: string) {
    this._PrescriptionItemStatus = value;
    //NotifyPropertyChanged("PrescriptionItemStatus");
  }
}
export class TechValidatedItemData extends ViewModelBase {
  private DrugItemField: string;
  private QuantityPerDoseField: string;
  private QuantityPerDoseUOMField: string;
  private TotalQuantityField: string;
  private TotalQuantityUOMField: string;
  private ClinicalVerifyCommentsField: string;
  private PrescriptionItemTechOIDField: number = 0;
  private IsTechnicalvalidateField: string;
  private IdentifyingDomainField: string;
  private OtherDispensingInstructionField: string;
  private DispensingInstructionDescField: string;
  private SupplyInstructionDescField: string;
  private SupplyCommentsField: string;
  private MedSupplyDetailOIDField: number = 0;
  private QuantityPerDoseWithUOMField: string;
  private TotalQuantityWithUOMField: string;
  public get DrugItem(): string {
    return this.DrugItemField;
  }
  public set DrugItem(value: string) {
    this.DrugItemField = value;
    //NotifyPropertyChanged("DrugItem");
  }
  public get QuantityPerDose(): string {
    return this.QuantityPerDoseField;
  }
  public set QuantityPerDose(value: string) {
    this.QuantityPerDoseField = value;
    //NotifyPropertyChanged("QuantityPerDose");
  }
  public get QuantityPerDoseUOM(): string {
    return this.QuantityPerDoseUOMField;
  }
  public set QuantityPerDoseUOM(value: string) {
    this.QuantityPerDoseUOMField = value;
    //NotifyPropertyChanged("QuantityPerDoseUOM");
  }
  public get TotalQuantity(): string {
    return this.TotalQuantityField;
  }
  public set TotalQuantity(value: string) {
    this.TotalQuantityField = value;
    //NotifyPropertyChanged("TotalQuantity");
  }
  public get TotalQuantityUOM(): string {
    return this.TotalQuantityUOMField;
  }
  public set TotalQuantityUOM(value: string) {
    this.TotalQuantityUOMField = value;
    //NotifyPropertyChanged("TotalQuantityUOM");
  }
  public get MedSupplyDetailOID(): number {
    return this.MedSupplyDetailOIDField;
  }
  public set MedSupplyDetailOID(value: number) {
    this.MedSupplyDetailOIDField = value;
    //NotifyPropertyChanged("MedSupplyDetailOID");
  }
  public get ClinicalVerifyComments(): string {
    return this.ClinicalVerifyCommentsField;
  }
  public set ClinicalVerifyComments(value: string) {
    this.ClinicalVerifyCommentsField = value;
    //NotifyPropertyChanged("ClinicalVerifyComments");
  }
  public get PrescriptionItemTechOID(): number {
    return this.PrescriptionItemTechOIDField;
  }
  public set PrescriptionItemTechOID(value: number) {
    this.PrescriptionItemTechOIDField = value;
    //NotifyPropertyChanged("PrescriptionItemTechOID");
  }
  public get IsTechnicalvalidate(): string {
    return this.IsTechnicalvalidateField;
  }
  public set IsTechnicalvalidate(value: string) {
    this.IsTechnicalvalidateField = value;
    //NotifyPropertyChanged("IsTechnicalvalidate");
  }
  public get IdentifyingDomain(): string {
    return this.IdentifyingDomainField;
  }
  public set IdentifyingDomain(value: string) {
    this.IdentifyingDomainField = value;
    //NotifyPropertyChanged("IdentifyingDomain");
  }
  public get OtherDispensingInstruction(): string {
    return this.OtherDispensingInstructionField;
  }
  public set OtherDispensingInstruction(value: string) {
    this.OtherDispensingInstructionField = value;
    //NotifyPropertyChanged("OtherDispensingInstruction");
  }
  public get DispensingInstructionDesc(): string {
    return this.DispensingInstructionDescField;
  }
  public set DispensingInstructionDesc(value: string) {
    this.DispensingInstructionDescField = value;
    //NotifyPropertyChanged("DispensingInstructionDesc");
  }
  public get SupplyInstructionDesc(): string {
    return this.SupplyInstructionDescField;
  }
  public set SupplyInstructionDesc(value: string) {
    this.SupplyInstructionDescField = value;
    //NotifyPropertyChanged("SupplyInstructionDesc");
  }
  public get SupplyComments(): string {
    return this.SupplyCommentsField;
  }
  public set SupplyComments(value: string) {
    this.SupplyCommentsField = value;
    //NotifyPropertyChanged("SupplyComments");
  }
  public get QuantityPerDoseWithUOM(): string {
    return this.QuantityPerDoseWithUOMField;
  }
  public set QuantityPerDoseWithUOM(value: string) {
    this.QuantityPerDoseWithUOMField = value;
    //NotifyPropertyChanged("QuantityPerDoseWithUOM");
  }
  public get TotalQuantityWithUOM(): string {
    return this.TotalQuantityWithUOMField;
  }
  public set TotalQuantityWithUOM(value: string) {
    this.TotalQuantityWithUOMField = value;
    //NotifyPropertyChanged("TotalQuantityWithUOM");
  }
  private DispenseStatusField: List<ManagePrescSer.PresItemRequestDetails>;
  public get DispenseStatus(): List<ManagePrescSer.PresItemRequestDetails> {
    return this.DispenseStatusField;
  }
  public set DispenseStatus(
    value: List<ManagePrescSer.PresItemRequestDetails>
  ) {
    this.DispenseStatusField = value;
    //NotifyPropertyChanged("DispenseStatus");
  }
}
export class TechnicalValidationDetails {
  private PrescriptionOIDField: number = 0;
  private PrescriptionItemOIDField: number = 0;
  private MedSupplyDetailOIDField: number = 0;
  private sValidatedDTTMField: string;
  private ValidatedByField: string;
  private TechValidatedItemsField: ObservableCollection<TechValidatedItemData> = new ObservableCollection<TechValidatedItemData>();
  private ValidatorRoleNameField: string;
  private IsTechnicalvalidateField: string;
  private TechValSupplyStatusField: string;
  public get PrescriptionOID(): number {
    return this.PrescriptionOIDField;
  }
  public set PrescriptionOID(value: number) {
    this.PrescriptionOIDField = value;
  }
  public get PrescriptionItemOID(): number {
    return this.PrescriptionItemOIDField;
  }
  public set PrescriptionItemOID(value: number) {
    this.PrescriptionItemOIDField = value;
  }
  public get MedSupplyDetailOID(): number {
    return this.MedSupplyDetailOIDField;
  }
  public set MedSupplyDetailOID(value: number) {
    this.MedSupplyDetailOIDField = value;
  }
  public get ValidatedDTTMString(): string {
    return this.sValidatedDTTMField;
  }
  public set ValidatedDTTMString(value: string) {
    this.sValidatedDTTMField = value;
  }
  public get ValidatedBy(): string {
    return this.ValidatedByField;
  }
  public set ValidatedBy(value: string) {
    this.ValidatedByField = value;
  }
  public get TechValidatedItems(): ObservableCollection<TechValidatedItemData> {
    return this.TechValidatedItemsField;
  }
  public set TechValidatedItems(
    value: ObservableCollection<TechValidatedItemData>
  ) {
    if (this.TechValidatedItemsField != value) {
      this.TechValidatedItemsField = value;
    }
  }
  public get ValidatorRoleName(): string {
    return this.ValidatorRoleNameField;
  }
  public set ValidatorRoleName(value: string) {
    this.ValidatorRoleNameField = value;
  }
  public get IsTechnicalvalidate(): string {
    return this.IsTechnicalvalidateField;
  }
  public set IsTechnicalvalidate(value: string) {
    this.IsTechnicalvalidateField = value;
  }
  public get TechValSupplyStatus(): string {
    return this.TechValSupplyStatusField;
  }
  public set TechValSupplyStatus(value: string) {
    this.TechValSupplyStatusField = value;
  }
}
export class DoseDetailsdata {
  private height: string;
  public get HeightVal(): string {
    return this.height;
  }
  public set HeightVal(value: string) {
    this.height = value;
  }
  private roundedDose: string;
  public get RoundedDose(): string {
    return this.roundedDose;
  }
  public set RoundedDose(value: string) {
    this.roundedDose = value;
  }
  private idealweight: string;
  public get IdealWeight(): string {
    return this.idealweight;
  }
  public set IdealWeight(value: string) {
    this.idealweight = value;
  }
  private caldose: string;
  public get Caldose(): string {
    return this.caldose;
  }
  public set Caldose(value: string) {
    this.caldose = value;
  }
  private reqDoseUOM: number = 0;
  public get ReqDoseUOM(): number {
    return this.reqDoseUOM;
  }
  public set ReqDoseUOM(value: number) {
    this.reqDoseUOM = value;
  }
  private requestDosePer: string;
  public get RequestDosePer(): string {
    return this.requestDosePer;
  }
  public set RequestDosePer(value: string) {
    this.requestDosePer = value;
  }
  private bSA: string;
  public get BSA(): string {
    return this.bSA;
  }
  public set BSA(value: string) {
    this.bSA = value;
  }
  private roundedto: string;
  public get Roundedto(): string {
    return this.roundedto;
  }
  public set Roundedto(value: string) {
    this.roundedto = value;
  }
  private bSAcalfor: string;
  public get BSAcalfor(): string {
    return this.bSAcalfor;
  }
  public set BSAcalfor(value: string) {
    this.bSAcalfor = value;
  }
  private roundeddose: string;
  public get Roundeddose(): string {
    return this.roundeddose;
  }
  public set Roundeddose(value: string) {
    this.roundeddose = value;
  }
  private reasonforoverride: string;
  public get Reasonforoverride(): string {
    return this.reasonforoverride;
  }
  public set Reasonforoverride(value: string) {
    this.reasonforoverride = value;
  }
  private uSSGestationDays: string;
  public get USSGestationDays(): string {
    return this.uSSGestationDays;
  }
  public set USSGestationDays(value: string) {
    this.uSSGestationDays = value;
  }
  private freq: string;
  public get Freq(): string {
    return this.freq;
  }
  public set Freq(value: string) {
    this.freq = value;
  }
  private recbdyweight: string;
  public get RecBdyWeight(): string {
    return this.recbdyweight;
  }
  public set RecBdyWeight(value: string) {
    this.recbdyweight = value;
  }
  private totdailydose: string;
  public get TotDailyDose(): string {
    return this.totdailydose;
  }
  public set TotDailyDose(value: string) {
    this.totdailydose = value;
  }
  private adjbdyweight: string;
  public get AdjBdyWeight(): string {
    return this.adjbdyweight;
  }
  public set AdjBdyWeight(value: string) {
    this.adjbdyweight = value;
  }
  private ordamtdse: string;
  public get OrdAmtDse(): string {
    return this.ordamtdse;
  }
  public set OrdAmtDse(value: string) {
    this.ordamtdse = value;
  }
  private bsaformula: string;
  public get BSAFormula(): string {
    return this.bsaformula;
  }
  public set BSAFormula(value: string) {
    this.bsaformula = value;
  }
  private reqdose: string;
  public get Reqdose(): string {
    return this.reqdose;
  }
  public set Reqdose(value: string) {
    this.reqdose = value;
  }
  private indivdose: string;
  public get IndivDose(): string {
    return this.indivdose;
  }
  public set IndivDose(value: string) {
    this.indivdose = value;
  }
  private dsecaldetails: string;
  public get DoseCalDetails(): string {
    return this.dsecaldetails;
  }
  public set DoseCalDetails(value: string) {
    this.dsecaldetails = value;
  }
  private dosecalTxt1: string;
  public get DoseCalTxt1(): string {
    return this.dosecalTxt1;
  }
  public set DoseCalTxt1(value: string) {
    this.dosecalTxt1 = value;
  }
  private dosecalTxt2: string;
  public get DoseCalTxt2(): string {
    return this.dosecalTxt2;
  }
  public set DoseCalTxt2(value: string) {
    this.dosecalTxt2 = value;
  }
  private dosecalTxt3: string;
  public get DoseCalTxt3(): string {
    return this.dosecalTxt3;
  }
  public set DoseCalTxt3(value: string) {
    this.dosecalTxt3 = value;
  }
  private dosecalTxt4: string;
  public get DoseCalTxt4(): string {
    return this.dosecalTxt4;
  }
  public set DoseCalTxt4(value: string) {
    this.dosecalTxt4 = value;
  }
  private dosecalTxt5: string;
  public get DoseCalTxt5(): string {
    return this.dosecalTxt5;
  }
  public set DoseCalTxt5(value: string) {
    this.dosecalTxt5 = value;
  }
  private dosecalVal1: string;
  public get DoseCalVal1(): string {
    return this.dosecalVal1;
  }
  public set DoseCalVal1(value: string) {
    this.dosecalVal1 = value;
  }
  private dosecalVal2: string;
  public get DoseCalVal2(): string {
    return this.dosecalVal2;
  }
  public set DoseCalVal2(value: string) {
    this.dosecalVal2 = value;
  }
  private dosecalVal3: string;
  public get DoseCalVal3(): string {
    return this.dosecalVal3;
  }
  public set DoseCalVal3(value: string) {
    this.dosecalVal3 = value;
  }
  private dosecalVal4: string;
  public get DoseCalVal4(): string {
    return this.dosecalVal4;
  }
  public set DoseCalVal4(value: string) {
    this.dosecalVal4 = value;
  }
  private dosecalVal5: string;
  public get DoseCalVal5(): string {
    return this.dosecalVal5;
  }
  public set DoseCalVal5(value: string) {
    this.dosecalVal5 = value;
  }
  private lowevent: string;
  public get LowEvent(): string {
    return this.lowevent;
  }
  public set LowEvent(value: string) {
    this.lowevent = value;
  }
  private _TotDailyDseVisible: Visibility;
  public get TotDailyDseVisible(): Visibility {
    return this._TotDailyDseVisible;
  }
  public set TotDailyDseVisible(value: Visibility) {
    this._TotDailyDseVisible = value;
  }
  private _FreqVisible: Visibility;
  public get FreqVisible(): Visibility {
    return this._FreqVisible;
  }
  public set FreqVisible(value: Visibility) {
    this._FreqVisible = value;
  }
}
export class MedicationAdditionalDetails extends ViewModelBase {
  private a: string;
  private b: string;
  private c: string;
  private d: string;
  private f: string;
  private g: string;
  private h: string;
  private i: string;
  private j: string;
  private k: string;
  private l: string;
  private m: string;
  private n: string;
  private o: string;
  private p: string;
  private q: string;
  private r: string;
  private s: string;
  private t: string;
  private u: string;
  private v: string;
  private w: string;
  private x: string;
  private y: string;
  private z: string;
  private ab: string;
  private ac: string;
  private cp: string;
  private ad: string;
  private ReasonForRec: string;
  private oo: string;
  private pp: string;
  private qq: string;
  private rr: string;
  private ff: string;
  private modifiedtemOID: number = 0;
  private al: string;
  private ae: string;
  private af: string;
  private ag: string;
  private ah: string;
  private ai: string;
  private am: string;
  private aj: Visibility;
  private ak: Visibility;
  private an: boolean = false;
  private ao: Visibility;
  private ap: Visibility;
  private aq: Visibility;
  private _ReviewDetails: string;
  public get ReviewDetails(): string {
    return this._ReviewDetails;
  }
  public set ReviewDetails(value: string) {
    if (this._ReviewDetails != value) {
      this._ReviewDetails = value;
      //NotifyPropertyChanged("ReviewDetails");
    }
  }
  public get DrugType(): string {
    return this.a;
  }
  public set DrugType(value: string) {
    if (this.a != value) {
      this.a = value;
      //NotifyPropertyChanged("DrugType");
    }
  }
  public get Formulary(): string {
    return this.ff;
  }
  public set Formulary(value: string) {
    this.ff = value;
    //NotifyPropertyChanged("Formulary");
  }
  public get NonFormulary(): string {
    return this.b;
  }
  public set NonFormulary(value: string) {
    this.b = value;
    //NotifyPropertyChanged("NonFormulary");
  }
  public get PrescribedBy(): string {
    return this.c;
  }
  public set PrescribedBy(value: string) {
    this.c = value;
    //NotifyPropertyChanged("PrescribedBy");
  }
  private prescribedByText: string = Resource.DrugDetails.lblPrescribedBy_Text;
  public get PrescribedByText(): string {
    return this.prescribedByText;
  }
  public set PrescribedByText(value: string) {
    this.prescribedByText = value;
    //NotifyPropertyChanged("PrescribedByText");
  }
  private isPGD: string;
  public get IsPGD(): string {
    return this.isPGD;
  }
  public set IsPGD(value: string) {
    this.isPGD = value;
    //NotifyPropertyChanged("IsPGD");
  }
  public get Consultant(): string {
    return this.d;
  }
  public set Consultant(value: string) {
    this.d = value;
    //NotifyPropertyChanged("Consultant");
  }
  public get healthOrg(): string {
    return this.f;
  }
  public set healthOrg(value: string) {
    this.f = value;
    //NotifyPropertyChanged("healthOrg");
  }
  public get Specialty(): string {
    return this.g;
  }
  public set Specialty(value: string) {
    this.g = value;
    //NotifyPropertyChanged("Specialty");
  }
  public get Prescriptionnumber(): string {
    return this.h;
  }
  public set Prescriptionnumber(value: string) {
    this.h = value;
    //NotifyPropertyChanged("Prescriptionnumber");
  }
  public get Prescriptionitemnumber(): string {
    return this.i;
  }
  public set Prescriptionitemnumber(value: string) {
    this.i = value;
    //NotifyPropertyChanged("Prescriptionitemnumber");
  }
  public get PrescribedOn(): string {
    return this.j;
  }
  public set PrescribedOn(value: string) {
    this.j = value;
    //NotifyPropertyChanged("PrescribedOn");
  }
  private prescribedOnText: string = Resource.DrugDetails.lblPrescribedOn_Text;
  public get PrescribedOnText(): string {
    return this.prescribedOnText;
  }
  public set PrescribedOnText(value: string) {
    this.prescribedOnText = value;
    //NotifyPropertyChanged("PrescribedOnText");
  }
  private _cancelDisconText: string = Resource.DrugDetails.Cancellation_Header;
  public get CancelDisconText(): string {
    return this._cancelDisconText;
  }
  public set CancelDisconText(value: string) {
    this._cancelDisconText = value;
    //NotifyPropertyChanged("CancelDisconText");
  }
  private _prescriptionText: string = Resource.DrugDetails.Prescription_Header;
  public get PrescriptionText(): string {
    return this._prescriptionText;
  }
  public set PrescriptionText(value: string) {
    this._prescriptionText = value;
    //NotifyPropertyChanged("PrescriptionText");
  }
  public get ReasonForHold(): string {
    return this.k;
  }
  public set ReasonForHold(value: string) {
    this.k = value;
    //NotifyPropertyChanged("ReasonForHold");
  }
  public get AuthorisedBy(): string {
    return this.l;
  }
  public set AuthorisedBy(value: string) {
    this.l = value;
    //NotifyPropertyChanged("AuthorisedBy");
  }
  public get AuthorisedDate(): string {
    return this.m;
  }
  public set AuthorisedDate(value: string) {
    this.m = value;
    //NotifyPropertyChanged("AuthorisedDate");
  }
  public get AuthoriseComment(): string {
    return this.n;
  }
  public set AuthoriseComment(value: string) {
    this.n = value;
    //NotifyPropertyChanged("AuthoriseComment");
  }
  public get CommentsForStopping(): string {
    return this.ad;
  }
  public set CommentsForStopping(value: string) {
    this.ad = value;
    //NotifyPropertyChanged("CommentsForStopping");
  }
  public get ReasonForReconcile(): string {
    return this.ReasonForRec;
  }
  public set ReasonForReconcile(value: string) {
    this.ReasonForRec = value;
    //NotifyPropertyChanged("ReasonForReconcile");
  }
  public get ClinicallyVerified(): string {
    return this.o;
  }
  public set ClinicallyVerified(value: string) {
    this.o = value;
    //NotifyPropertyChanged("ClinicallyVerified");
  }
  public get ClinicallyDate(): string {
    return this.p;
  }
  public set ClinicallyDate(value: string) {
    this.p = value;
    //NotifyPropertyChanged("ClinicallyDate");
  }
  public get ClinicallyVerifyComments(): string {
    return this.q;
  }
  public set ClinicallyVerifyComments(value: string) {
    this.q = value;
    //NotifyPropertyChanged("ClinicallyVerifyComments");
  }
  private _IsClinVerHisLinkExists: Visibility = Visibility.Collapsed;
  public get IsClinVerHisLinkExists(): Visibility {
    return this._IsClinVerHisLinkExists;
  }
  public set IsClinVerHisLinkExists(value: Visibility) {
    this._IsClinVerHisLinkExists = value;
    //NotifyPropertyChanged("IsClinVerHisLinkExists");
  }
  private _IsOnbehalfLinkExists: Visibility = Visibility.Collapsed;
  public get IsOnbehalfLinkExists(): Visibility {
    return this._IsOnbehalfLinkExists;
  }
  public set IsOnbehalfLinkExists(value: Visibility) {
    this._IsOnbehalfLinkExists = value;
    //NotifyPropertyChanged("IsOnbehalfLinkExists");
  }
  private _IsClinVerVerfied: Visibility = Visibility.Collapsed;
  public get IsClinVerVerfied(): Visibility {
    return this._IsClinVerVerfied;
  }
  public set IsClinVerVerfied(value: Visibility) {
    this._IsClinVerVerfied = value;
    //NotifyPropertyChanged("IsClinVerVerfied");
  }
  public get AmendmentBy(): string {
    return this.oo;
  }
  public set AmendmentBy(value: string) {
    this.oo = value;
    //NotifyPropertyChanged("AmendmentBy");
  }
  public get AmendmentDate(): string {
    return this.pp;
  }
  public set AmendmentDate(value: string) {
    this.pp = value;
    //NotifyPropertyChanged("AmendmentDate");
  }
  public get AmendmentReason(): string {
    return this.qq;
  }
  public set AmendmentReason(value: string) {
    this.qq = value;
    //NotifyPropertyChanged("AmendmentReason");
  }
  public get AmendmentComments(): string {
    return this.rr;
  }
  public set AmendmentComments(value: string) {
    this.rr = value;
    //NotifyPropertyChanged("AmendmentComments");
  }
  public get OnBehalfOf(): string {
    return this.r;
  }
  public set OnBehalfOf(value: string) {
    this.r = value;
    //NotifyPropertyChanged("OnBehalfOf");
  }
  public get OnBehalfOfReason(): string {
    return this.s;
  }
  public set OnBehalfOfReason(value: string) {
    this.s = value;
    //NotifyPropertyChanged("OnBehalfOfReason");
  }
  public get CommunicationMode(): string {
    return this.t;
  }
  public set CommunicationMode(value: string) {
    this.t = value;
    //NotifyPropertyChanged("CommunicationMode");
  }
  public get AmendmentOf(): string {
    return this.u;
  }
  public set AmendmentOf(value: string) {
    this.u = value;
    //NotifyPropertyChanged("AmendmentOf");
  }
  public get ModifiedItemOID(): number {
    return this.modifiedtemOID;
  }
  public set ModifiedItemOID(value: number) {
    this.modifiedtemOID = value;
    //NotifyPropertyChanged("ModifiedItemOID");
  }
  public get ReasonForModification(): string {
    return this.v;
  }
  public set ReasonForModification(value: string) {
    this.v = value;
    //NotifyPropertyChanged("ReasonForModification");
  }
  public get ModificationComments(): string {
    return this.w;
  }
  public set ModificationComments(value: string) {
    this.w = value;
    //NotifyPropertyChanged("ModificationComments");
  }
  public get CancelDate(): string {
    return this.x;
  }
  public set CancelDate(value: string) {
    this.x = value;
    //NotifyPropertyChanged("CancelDate");
  }
  public get CancelBy(): string {
    return this.y;
  }
  public set CancelBy(value: string) {
    this.y = value;
    //NotifyPropertyChanged("CancelBy");
  }
  public get CancelReason(): string {
    return this.z;
  }
  public set CancelReason(value: string) {
    this.z = value;
    //NotifyPropertyChanged("CancelReason");
  }
  public get ReprintReason(): string {
    return this.ab;
  }
  public set ReprintReason(value: string) {
    if (this.ab != value) {
      this.ab = value;
      //NotifyPropertyChanged("ReprintReason");
    }
  }
  public get Batch(): string {
    return this.ac;
  }
  public set Batch(value: string) {
    if (this.ac != value) {
      this.ac = value;
      //NotifyPropertyChanged("Batch");
    }
  }
  public get CareProvider(): string {
    return this.cp;
  }
  public set CareProvider(value: string) {
    if (this.cp != value) {
      this.cp = value;
      //NotifyPropertyChanged("CareProvider");
    }
  }
  private _IsSupDispInstforCompo: boolean = false;
  public get IsSupDispInstforCompo(): boolean {
    return this._IsSupDispInstforCompo;
  }
  public set IsSupDispInstforCompo(value: boolean) {
    this._IsSupDispInstforCompo = value;
    //NotifyPropertyChanged("IsSupDispInstforCompo");
  }
  private _NonFormComponents: string;
  public get NonFormComponents(): string {
    return this._NonFormComponents;
  }
  public set NonFormComponents(value: string) {
    this._NonFormComponents = value;
    //NotifyPropertyChanged("NonFormComponents");
  }
  private _NonFormCompReason: string;
  public get NonFormCompReason(): string {
    return this._NonFormCompReason;
  }
  public set NonFormCompReason(value: string) {
    this._NonFormCompReason = value;
    //NotifyPropertyChanged("NonFormCompReason");
  }
  private _NonFormCompItems: string;
  public get NonFormCompItems(): string {
    return this._NonFormCompItems;
  }
  public set NonFormCompItems(value: string) {
    this._NonFormCompItems = value;
    //NotifyPropertyChanged("NonFormCompItems");
  }
  private _IsInfusion: Boolean = false;
  public get IsInfusion(): Boolean {
    return this._IsInfusion;
  }
  public set IsInfusion(value: Boolean) {
    this._IsInfusion = value;
  }
  private _IsBolus: Boolean = false;
  public get IsBolus(): Boolean {
    return this._IsBolus;
  }
  public set IsBolus(value: Boolean) {
    this._IsBolus = value;
  }
  public get PrescriberIdentifierName(): string {
    return this.am;
  }
  public set PrescriberIdentifierName(value: string) {
    this.am = value;
    //NotifyPropertyChanged("PrescriberIdentifierName");
  }
  public get PrescriberIdentifierType(): string {
    return this.al;
  }
  public set PrescriberIdentifierType(value: string) {
    this.al = value;
    //NotifyPropertyChanged("PrescriberIdentifierType");
  }
  public get PrescriberIdentifier(): string {
    return this.ae;
  }
  public set PrescriberIdentifier(value: string) {
    this.ae = value;
    //NotifyPropertyChanged("PrescriberIdentifier");
  }
  public get PrescriberStatus(): string {
    return this.af;
  }
  public set PrescriberStatus(value: string) {
    this.af = value;
    //NotifyPropertyChanged("PrescriberStatus");
  }
  public get PrescriberBleep(): string {
    return this.ag;
  }
  public set PrescriberBleep(value: string) {
    this.ag = value;
    //NotifyPropertyChanged("PrescriberBleep");
  }
  public get PrescriberTelephone(): string {
    return this.ah;
  }
  public set PrescriberTelephone(value: string) {
    this.ah = value;
    //NotifyPropertyChanged("PrescriberTelephone");
  }
  public get PrescriberPager(): string {
    return this.ai;
  }
  public set PrescriberPager(value: string) {
    this.ai = value;
    //NotifyPropertyChanged("PrescriberPager");
  }
  public get PresIdenTypeVisibility(): Visibility {
    return this.aj;
  }
  public set PresIdenTypeVisibility(value: Visibility) {
    this.aj = value;
    //NotifyPropertyChanged("PresIdenTypeVisibility");
  }
  public get PresIdenVisibility(): Visibility {
    return this.ak;
  }
  public set PresIdenVisibility(value: Visibility) {
    this.ak = value;
    //NotifyPropertyChanged("PresIdenVisibility");
  }
  public get DefCntBleepVisibility(): Visibility {
    return this.ao;
  }
  public set DefCntBleepVisibility(value: Visibility) {
    this.ao = value;
    //NotifyPropertyChanged("DefCntBleepVisibility");
  }
  public get DefCntPhoneVisibility(): Visibility {
    return this.ap;
  }
  public set DefCntPhoneVisibility(value: Visibility) {
    this.ap = value;
    //NotifyPropertyChanged("DefCntPhoneVisibility");
  }
  public get DefCntPagerVisibility(): Visibility {
    return this.aq;
  }
  public set DefCntPagerVisibility(value: Visibility) {
    this.aq = value;
    //NotifyPropertyChanged("DefCntPagerVisibility");
  }
  public get IsDefaultContact(): boolean {
    return this.an;
  }
  public set IsDefaultContact(value: boolean) {
    this.an = value;
    //NotifyPropertyChanged("IsDefaultContact");
  }
  private _GPConnectID: string;
  public get GPConnectID(): string {
    return this._GPConnectID;
  }
  public set GPConnectID(value: string) {
    this._GPConnectID = value;
    //NotifyPropertyChanged("GPConnectID");
  }
}
export class PreparationDetails extends ViewModelBase {
  private _ComponentName: string;
  public get ComponentName(): string {
    return this._ComponentName;
  }
  public set ComponentName(value: string) {
    this._ComponentName = value;
    //NotifyPropertyChanged("ComponentName");
  }
  private _DisplacementVolume: string;
  public get DisplacementVolume(): string {
    return this._DisplacementVolume;
  }
  public set DisplacementVolume(value: string) {
    this._DisplacementVolume = value;
    //NotifyPropertyChanged("DisplacementVolume");
  }
  private _Quantity: string;
  public get Quantity(): string {
    return this._Quantity;
  }
  public set Quantity(value: string) {
    this._Quantity = value;
    //NotifyPropertyChanged("Quantity");
  }
  private _QuantityUOM: string;
  public get QuantityUOM(): string {
    return this._QuantityUOM;
  }
  public set QuantityUOM(value: string) {
    this._QuantityUOM = value;
    //NotifyPropertyChanged("QuantityUOM");
  }
  private _QuantityUOMOID: Int64;
  public get QuantityUOMOID(): Int64 {
    return this._QuantityUOMOID;
  }
  public set QuantityUOMOID(value: Int64) {
    this._QuantityUOMOID = value;
    //NotifyPropertyChanged("QuantityUOMOID");
  }
  private _QuantityValue: string;
  public get QuantityValue(): string {
    return this._QuantityValue;
  }
  public set QuantityValue(value: string) {
    this._QuantityValue = value;
    //NotifyPropertyChanged("QuantityValue");
  }
  private _BatchNumber: string;
  public get BatchNumber(): string {
    return this._BatchNumber;
  }
  public set BatchNumber(value: string) {
    this._BatchNumber = value;
    //NotifyPropertyChanged("BatchNumber");
  }
  private _ExpiryDttm: DateTime = DateTime.MinValue;
  public get ExpiryDttm(): DateTime {
    return this._ExpiryDttm;
  }
  public set ExpiryDttm(value: DateTime) {
    this._ExpiryDttm = value;
    //NotifyPropertyChanged("ExpiryDttm");
  }
  private _IsUpto: string;
  public get IsUpto(): string {
    return this._IsUpto;
  }
  public set IsUpto(value: string) {
    this._IsUpto = value;
    //NotifyPropertyChanged("IsUpto");
  }
}
export class MedPreparedByData extends ViewModelBase {
  private _Preparedby: string;
  public get Preparedby(): string {
    return this._Preparedby;
  }
  public set Preparedby(value: string) {
    this._Preparedby = value;
    //NotifyPropertyChanged("Preparedby");
  }
  private _PreparedbyOID: Int64;
  public get PreparedbyOID(): Int64 {
    return this._PreparedbyOID;
  }
  public set PreparedbyOID(value: Int64) {
    this._PreparedbyOID = value;
    //NotifyPropertyChanged("PreparedbyOID");
  }
  private _Witnessedby: string;
  public get Witnessedby(): string {
    return this._Witnessedby;
  }
  public set Witnessedby(value: string) {
    this._Witnessedby = value;
    //NotifyPropertyChanged("Witnessedby");
  }
  private _WitnessedbyOID: Int64;
  public get WitnessedbyOID(): Int64 {
    return this._WitnessedbyOID;
  }
  public set WitnessedbyOID(value: Int64) {
    this._WitnessedbyOID = value;
    //NotifyPropertyChanged("WitnessedbyOID");
  }
  private _Prepareddttm: DateTime = DateTime.MinValue;
  public get Prepareddttm(): DateTime {
    return this._Prepareddttm;
  }
  public set Prepareddttm(value: DateTime) {
    this._Prepareddttm = value;
    //NotifyPropertyChanged("Prepareddttm");
  }
}
export class DrugPreparationhistory extends ViewModelBase {
  private _ComponentName: string;
  public get ComponentName(): string {
    return this._ComponentName;
  }
  public set ComponentName(value: string) {
    this._ComponentName = value;
    //NotifyPropertyChanged("ComponentName");
  }
  private _AttributeName: string;
  public get AttributeName(): string {
    return this._AttributeName;
  }
  public set AttributeName(value: string) {
    this._AttributeName = value;
    //NotifyPropertyChanged("AttributeName");
  }
  private _AttributeValue: string;
  public get AttributeValue(): string {
    return this._AttributeValue;
  }
  public set AttributeValue(value: string) {
    this._AttributeValue = value;
    //NotifyPropertyChanged("AttributeValue");
  }
  private _FromValue: string;
  public get FromValue(): string {
    return this._FromValue;
  }
  public set FromValue(value: string) {
    this._FromValue = value;
    //NotifyPropertyChanged("FromValue");
  }
  private _ToValue: string;
  public get ToValue(): string {
    return this._ToValue;
  }
  public set ToValue(value: string) {
    this._ToValue = value;
    //NotifyPropertyChanged("ToValue");
  }
  private _Modifiedby: string;
  public get Modifiedby(): string {
    return this._Modifiedby;
  }
  public set Modifiedby(value: string) {
    this._Modifiedby = value;
    //NotifyPropertyChanged("Modifiedby");
  }
  private _Modifieddttm: DateTime = DateTime.MinValue;
  public get Modifieddttm(): DateTime {
    return this._Modifieddttm;
  }
  public set Modifieddttm(value: DateTime) {
    this._Modifieddttm = value;
    //NotifyPropertyChanged("Modifieddttm");
  }
}
export class AdminList extends ViewModelBase {

  ChildGridExtension = new GridExtension();
  SelectedChildGridIndex: number[] = [];

  public IsAdminRowExpanded: boolean = false;
  //public delegate void InfActionRowChanged();
  public OnInfActionRowChanged: Function;
  private _Dose: string;
  public get Dose(): string {
    return this._Dose;
  }
  public set Dose(value: string) {
    this._Dose = value;
    //NotifyPropertyChanged("Dose");
  }
  private _DoseUOM: string;
  public get DoseUOM(): string {
    return this._DoseUOM;
  }
  public set DoseUOM(value: string) {
    this._DoseUOM = value;
    //NotifyPropertyChanged("DoseUOM");
  }
  private _AdministeredBy: string;
  public get AdministeredBy(): string {
    return this._AdministeredBy;
  }
  public set AdministeredBy(value: string) {
    this._AdministeredBy = value;
    //NotifyPropertyChanged("AdministeredBy");
  }
  private _RelationValue: string;
  public get RelationValue(): string {
    return this._RelationValue;
  }
  public set RelationValue(value: string) {
    this._RelationValue = value;
    //NotifyPropertyChanged("RelationValue");
  }
  private _AdministeredDate: DateTime = DateTime.MinValue;
  public get AdministeredDate(): DateTime {
    return this._AdministeredDate;
  }
  public set AdministeredDate(value: DateTime) {
    this._AdministeredDate = value;
    //NotifyPropertyChanged("AdministeredDate");
  }
  private _DateTimeGiven: string;
  public get DateTimeGiven(): string {
    return this._DateTimeGiven;
  }
  public set DateTimeGiven(value: string) {
    this._DateTimeGiven = value;
    //NotifyPropertyChanged("DateTimeGiven");
  }
  private _IsEarlyAdministeredModeVisibility: string;
  public get IsEarlyAdministeredModeVisibility(): string {
    return this._IsEarlyAdministeredModeVisibility;
  }
  public set IsEarlyAdministeredModeVisibility(value: string) {
    this._IsEarlyAdministeredModeVisibility = value;
  }
  private _IsLateAdministeredModeVisibility: string;
  public get IsLateAdministeredModeVisibility(): string {
    return this._IsLateAdministeredModeVisibility;
  }
  public set IsLateAdministeredModeVisibility(value: string) {
    this._IsLateAdministeredModeVisibility = value;
  }
  private _DoseDiscrepancyVisibility: string;
  public get DoseDiscrepancyVisibility(): string {
    return this._DoseDiscrepancyVisibility;
  }
  public set DoseDiscrepancyVisibility(value: string) {
    this._DoseDiscrepancyVisibility = value;
  }
  private _PrescriptionItemOID: number = 0;
  public get PrescriptionItemOID(): number {
    return this._PrescriptionItemOID;
  }
  public set PrescriptionItemOID(value: number) {
    this._PrescriptionItemOID = value;
    //NotifyPropertyChanged("PrescriptionItemOID");
  }
  private _ScheduleDTTM: DateTime = DateTime.MinValue;
  public get ScheduleDTTM(): DateTime {
    return this._ScheduleDTTM;
  }
  public set ScheduleDTTM(value: DateTime) {
    this._ScheduleDTTM = value;
    //NotifyPropertyChanged("ScheduleDTTM");
  }
  private _Status: string;
  public get Status(): string {
    return this._Status;
  }
  public set Status(value: string) {
    this._Status = value;
    //NotifyPropertyChanged("Status");
  }
  private _SlotStatus: string;
  public get SlotStatus(): string {
    return this._SlotStatus;
  }
  public set SlotStatus(value: string) {
    this._SlotStatus = value;
    //NotifyPropertyChanged("SlotStatus");
  }
  private _StatusCode: string;
  public get StatusCode(): string {
    return this._StatusCode;
  }
  public set StatusCode(value: string) {
    this._StatusCode = value;
    //NotifyPropertyChanged("StatusCode");
  }
  private _MedAdminOID: number = 0;
  public get MedAdminOID(): number {
    return this._MedAdminOID;
  }
  public set MedAdminOID(value: number) {
    this._MedAdminOID = value;
    //NotifyPropertyChanged("MedAdminOID");
  }
  private _MedAdminHistoryOID: number = 0;
  public get MedAdminHistoryOID(): number {
    return this._MedAdminHistoryOID;
  }
  public set MedAdminHistoryOID(value: number) {
    this._MedAdminHistoryOID = value;
    //NotifyPropertyChanged("MedAdminHistoryOID");
  }
  private _MedAdminInfusionOID: number = 0;
  public get MedAdminInfusionOID(): number {
    return this._MedAdminInfusionOID;
  }
  public set MedAdminInfusionOID(value: number) {
    this._MedAdminInfusionOID = value;
    //NotifyPropertyChanged("MedAdminInfusionOID");
  }
  private _IsHistoryExists: Boolean = false;
  public get IsHistoryExists(): Boolean {
    return this._IsHistoryExists;
  }
  public set IsHistoryExists(value: Boolean) {
    this._IsHistoryExists = value;
    //NotifyPropertyChanged("IsHistoryExists");
  }
  private _IsInfusion: Boolean = false;
  public get IsInfusion(): Boolean {
    return this._IsInfusion;
  }
  public set IsInfusion(value: Boolean) {
    this._IsInfusion = value;
    //NotifyPropertyChanged("IsInfusion");
  }
  private _IsVisible: string;
  public get IsVisible(): string {
    return this._IsVisible;
  }
  public set IsVisible(value: string) {
    this._IsVisible = value;
    //NotifyPropertyChanged("IsVisible");
  }
  private _ScheduleOID: number = 0;
  public get ScheduleOID(): number {
    return this._ScheduleOID;
  }
  public set ScheduleOID(value: number) {
    this._ScheduleOID = value;
    //NotifyPropertyChanged("ScheduleOID");
  }
  private _RecordedAt: string;
  public get RecordedAt(): string {
    return this._RecordedAt;
  }
  public set RecordedAt(value: string) {
    this._RecordedAt = value;
    //NotifyPropertyChanged("RecordedAt");
  }
  private _RecordedBy: string;
  public get RecordedBy(): string {
    return this._RecordedBy;
  }
  public set RecordedBy(value: string) {
    this._RecordedBy = value;
    //NotifyPropertyChanged("RecordedBy");
  }
  private _EntDoseRecordedAt: string;
  public get EntDoseRecordedAt(): string {
    return this._EntDoseRecordedAt;
  }
  public set EntDoseRecordedAt(value: string) {
    this._EntDoseRecordedAt = value;
    //NotifyPropertyChanged("EntDoseRecordedAt");
  }
  private _EntDoseRecordedBy: string;
  public get EntDoseRecordedBy(): string {
    return this._EntDoseRecordedBy;
  }
  public set EntDoseRecordedBy(value: string) {
    this._EntDoseRecordedBy = value;
    //NotifyPropertyChanged("EntDoseRecordedBy");
  }
  private oinfuactchldDet: ObservableCollection<InfActionchildDetail>;
  public get infuactchldDet(): ObservableCollection<InfActionchildDetail> {
    return this.oinfuactchldDet;
  }
  public set infuactchldDet(value: ObservableCollection<InfActionchildDetail>) {
    if (this.oinfuactchldDet != value) {
      this.oinfuactchldDet = value;
      //NotifyPropertyChanged("infuactchldDet");
    }
  }
  private _SelectedInfAction: InfActionchildDetail;
  public get SelectedInfAction(): InfActionchildDetail {
    return this._SelectedInfAction;
  }
  public set SelectedInfAction(value: InfActionchildDetail) {
    if (!ObjectHelper.ReferenceEquals(this._SelectedInfAction, value)) {
      this._SelectedInfAction = value;
      //NotifyPropertyChanged("SelectedInfAction");
      if (this.OnInfActionRowChanged != null) this.OnInfActionRowChanged();
    }
  }
  private _oBagDetailsVM: BagDetailsVM;
  public get oBagDetailsVM(): BagDetailsVM {
    return this._oBagDetailsVM;
  }
  public set oBagDetailsVM(value: BagDetailsVM) {
    if (!ObjectHelper.ReferenceEquals(this._oBagDetailsVM, value)) {
      this._oBagDetailsVM = value;
      //NotifyPropertyChanged("oBagDetailsVM");
    }
  }
  private oPreparationDetails: ObservableCollection<PreparationDetails>;
  public get PreparationDetails(): ObservableCollection<PreparationDetails> {
    return this.oPreparationDetails;
  }
  public set PreparationDetails(
    value: ObservableCollection<PreparationDetails>
  ) {
    if (!ObjectHelper.ReferenceEquals(this.oPreparationDetails, value)) {
      this.oPreparationDetails = value;
      //NotifyPropertyChanged("PreparationDetails");
    }
  }
  private oMedPreparedBy: MedPreparedByData;
  public get MedPreparedBy(): MedPreparedByData {
    return this.oMedPreparedBy;
  }
  public set MedPreparedBy(value: MedPreparedByData) {
    if (this.oMedPreparedBy != value) {
      this.oMedPreparedBy = value;
      //NotifyPropertyChanged("MedPreparedBy");
    }
  }
  private _IsPrepHistoryExists: Visibility = Visibility.Collapsed;
  public get IsPrepHistoryExists(): Visibility {
    return this._IsPrepHistoryExists;
  }
  public set IsPrepHistoryExists(value: Visibility) {
    this._IsPrepHistoryExists = value;
    //NotifyPropertyChanged("IsPrepHistoryExists");
  }
  private oDrugPrephistory: ObservableCollection<DrugPreparationhistory>;
  public get DrugPrephistory(): ObservableCollection<DrugPreparationhistory> {
    return this.oDrugPrephistory;
  }
  public set DrugPrephistory(
    value: ObservableCollection<DrugPreparationhistory>
  ) {
    if (this.oDrugPrephistory != value) {
      this.oDrugPrephistory = value;
      //NotifyPropertyChanged("DrugPrephistory");
    }
  }
  private oAdminListDet: AdminListDetails;
  public get AdminListDet(): AdminListDetails {
    return this.oAdminListDet;
  }
  public set AdminListDet(value: AdminListDetails) {
    if (!ObjectHelper.ReferenceEquals(this.oAdminListDet, value)) {
      this.oAdminListDet = value;
      //super.NotifyPropertyChanged("AdminListDet");
    }
  }

  public ShowGridExpander: boolean = false;
}
export class InfActionchildDetail extends ViewModelBase {
  private _MedAdminOID: number = 0;
  public get MedAdminOID(): number {
    return this._MedAdminOID;
  }
  public set MedAdminOID(value: number) {
    this._MedAdminOID = value;
    //NotifyPropertyChanged("MedAdminOID");
  }
  private _MedInfusionOID: number = 0;
  public get MedInfusionOID(): number {
    return this._MedInfusionOID;
  }
  public set MedInfusionOID(value: number) {
    this._MedInfusionOID = value;
    //NotifyPropertyChanged("MedinfusionOID");
  }
  private _ActionCode: string;
  public get ActionCode(): string {
    return this._ActionCode;
  }
  public set ActionCode(value: string) {
    this._ActionCode = value;
    //NotifyPropertyChanged("ActionCode");
  }
  private _AdministeredDate: string;
  public get AdministeredDate(): string {
    return this._AdministeredDate;
  }
  public set AdministeredDate(value: string) {
    this._AdministeredDate = value;
    //NotifyPropertyChanged("AdministeredDate");
  }
  private oAdminListDet: AdminListDetails;
  public get AdminListDet(): AdminListDetails {
    return this.oAdminListDet;
  }
  public set AdminListDet(value: AdminListDetails) {
    if (!ObjectHelper.ReferenceEquals(this.oAdminListDet, value)) {
      this.oAdminListDet = value;
      //super.NotifyPropertyChanged("AdminListDet");
    }
  }
}
export class AdminListDetails extends ViewModelBase {
  private a: string;
  private b: string;
  private c: string;
  private d: string;
  private f: string;
  private g: string;
  private h: string;
  private i: string;
  private j: string;
  private k: string;
  private _SiteName: string;
  private _Humidification: string;
  public get Route(): string {
    return this.a;
  }
  public set Route(value: string) {
    this.a = value;
    //NotifyPropertyChanged("Route");
  }
  public get SiteName(): string {
    return this._SiteName;
  }
  public set SiteName(value: string) {
    this._SiteName = value;
    //NotifyPropertyChanged("SiteName");
  }
  public get BatchNumber(): string {
    return this.b;
  }
  public set BatchNumber(value: string) {
    this.b = value;
    //NotifyPropertyChanged("BatchNumber");
  }
  public get DrugType(): string {
    return this.c;
  }
  public set DrugType(value: string) {
    this.c = value;
    //NotifyPropertyChanged("DrugType");
  }
  public get ExpiryDate(): string {
    return this.d;
  }
  public set ExpiryDate(value: string) {
    this.d = value;
    //NotifyPropertyChanged("ExpiryDate");
  }
  public get WitnessedBy(): string {
    return this.f;
  }
  public set WitnessedBy(value: string) {
    this.f = value;
    //NotifyPropertyChanged("WitnessedBy");
  }
  public get DoseDiscReasonCode(): string {
    return this.g;
  }
  public set DoseDiscReasonCode(value: string) {
    this.g = value;
    //NotifyPropertyChanged("DoseDiscReasonCode");
  }
  public get AdministeredDate(): string {
    return this.h;
  }
  public set AdministeredDate(value: string) {
    this.h = value;
    //NotifyPropertyChanged("AdministeredDate");
  }
  public get AdministeredBy(): string {
    return this.i;
  }
  public set AdministeredBy(value: string) {
    this.i = value;
    //NotifyPropertyChanged("AdministeredBy");
  }
  public get AdminReasonCode(): string {
    return this.j;
  }
  public set AdminReasonCode(value: string) {
    this.j = value;
    //NotifyPropertyChanged("AdminReasonCode");
  }
  public get AdminComments(): string {
    return this.k;
  }
  public set AdminComments(value: string) {
    this.k = value;
    //NotifyPropertyChanged("AdminComments");
  }
  private _DoseDiscComments: string;
  public get DoseDiscComments(): string {
    return this._DoseDiscComments;
  }
  public set DoseDiscComments(value: string) {
    this._DoseDiscComments = value;
    //NotifyPropertyChanged("DoseDiscComments");
  }
  private _IsStruckout: string;
  public get IsStruckout(): string {
    return this._IsStruckout;
  }
  public set IsStruckout(value: string) {
    this._IsStruckout = value;
    //NotifyPropertyChanged("IsStruckout");
  }
  private _IsMedScannedProduct: string;
  public get IsMedScannedProduct(): string {
    return this._IsMedScannedProduct;
  }
  public set IsMedScannedProduct(value: string) {
    this._IsMedScannedProduct = value;
    //NotifyPropertyChanged("IsMedScannedProduct");
  }
  private _IsViewRecMedLinkExists: Visibility = Visibility.Collapsed;
  public get IsViewRecMedLinkExists(): Visibility {
    return this._IsViewRecMedLinkExists;
  }
  public set IsViewRecMedLinkExists(value: Visibility) {
    this._IsViewRecMedLinkExists = value;
    //NotifyPropertyChanged("IsViewRecMedLinkExists");
  }
  private _ActionCode: string;
  public get ActionCode(): string {
    return this._ActionCode;
  }
  public set ActionCode(value: string) {
    this._ActionCode = value;
    //NotifyPropertyChanged("ActionCode");
  }
  private _VolumeInfused: string;
  public get VolumeInfused(): string {
    return this._VolumeInfused;
  }
  public set VolumeInfused(value: string) {
    this._VolumeInfused = value;
    //NotifyPropertyChanged("VolumeInfused");
  }
  private _VolumeInfusedUOM: string;
  public get VolumeInfusedUOM(): string {
    return this._VolumeInfusedUOM;
  }
  public set VolumeInfusedUOM(value: string) {
    this._VolumeInfusedUOM = value;
    //NotifyPropertyChanged("VolumeInfusedUOM");
  }
  private _DripRate: string;
  public get DripRate(): string {
    return this._DripRate;
  }
  public set DripRate(value: string) {
    this._DripRate = value;
    //NotifyPropertyChanged("DripRate");
  }
  private _DripRateUOM: string;
  public get DripRateUOM(): string {
    return this._DripRateUOM;
  }
  public set DripRateUOM(value: string) {
    this._DripRateUOM = value;
    //NotifyPropertyChanged("DripRateUOM");
  }
  private _DripRatePerUOM: string;
  public get DripRatePerUOM(): string {
    return this._DripRatePerUOM;
  }
  public set DripRatePerUOM(value: string) {
    this._DripRatePerUOM = value;
    //NotifyPropertyChanged("DripRatePerUOM");
  }
  private _DripRateValue: string;
  public get DripRateValue(): string {
    return this._DripRateValue;
  }
  public set DripRateValue(value: string) {
    this._DripRateValue = value;
    //NotifyPropertyChanged("DripRateValue");
  }
  private _InfusionRate: string;
  public get InfusionRate(): string {
    return this._InfusionRate;
  }
  public set InfusionRate(value: string) {
    this._InfusionRate = value;
    //NotifyPropertyChanged("InfusionRate");
  }
  private _InfusionRateUOM: string;
  public get InfusionRateUOM(): string {
    return this._InfusionRateUOM;
  }
  public set InfusionRateUOM(value: string) {
    this._InfusionRateUOM = value;
    //NotifyPropertyChanged("InfusionRateUOM");
  }
  private _InfusionRatePerUOM: string;
  public get InfusionRatePerUOM(): string {
    return this._InfusionRatePerUOM;
  }
  public set InfusionRatePerUOM(value: string) {
    this._InfusionRatePerUOM = value;
    //NotifyPropertyChanged("InfusionRatePerUOM");
  }
  private _InfusionRateValue: string;
  public get InfusionRateValue(): string {
    return this._InfusionRateValue;
  }
  public set InfusionRateValue(value: string) {
    this._InfusionRateValue = value;
    //NotifyPropertyChanged("InfusionRateValue");
  }
  private _Bagvolume: string;
  public get Bagvolume(): string {
    return this._Bagvolume;
  }
  public set Bagvolume(value: string) {
    this._Bagvolume = value;
    //NotifyPropertyChanged("Bagvolume");
  }
  private _BagvolumeUOM: string;
  public get BagvolumeUOM(): string {
    return this._BagvolumeUOM;
  }
  public set BagvolumeUOM(value: string) {
    this._BagvolumeUOM = value;
    //NotifyPropertyChanged("BagvolumeUOM");
  }
  private _RecordedAtValue: string;
  public get RecordedAtValue(): string {
    return this._RecordedAtValue;
  }
  public set RecordedAtValue(value: string) {
    this._RecordedAtValue = value;
    //NotifyPropertyChanged("RecordedAtValue");
  }
  private _RecordedByValue: string;
  public get RecordedByValue(): string {
    return this._RecordedByValue;
  }
  public set RecordedByValue(value: string) {
    this._RecordedByValue = value;
    //NotifyPropertyChanged("RecordedByValue");
  }
  private _AdministeredByValue: string;
  public get AdministeredByValue(): string {
    return this._AdministeredByValue;
  }
  public set AdministeredByValue(value: string) {
    this._AdministeredByValue = value;
    //NotifyPropertyChanged("AdministeredByValue");
  }
  private _RelationValue: string;
  public get RelationValue(): string {
    return this._RelationValue;
  }
  public set RelationValue(value: string) {
    this._RelationValue = value;
    //NotifyPropertyChanged("RelationValue");
  }
  private _LumenValue: string;
  public get LumenValue(): string {
    return this._LumenValue;
  }
  public set LumenValue(value: string) {
    this._LumenValue = value;
    //NotifyPropertyChanged("LumenValue");
  }
  private _DelDeviceValue: string;
  public get DelDeviceValue(): string {
    return this._DelDeviceValue;
  }
  public set DelDeviceValue(value: string) {
    this._DelDeviceValue = value;
    //NotifyPropertyChanged("DelDeviceValue");
  }
  public get Humidification(): string {
    return this._Humidification;
  }
  public set Humidification(value: string) {
    this._Humidification = value;
    //NotifyPropertyChanged("Humidification");
  }
  private _InfusionPeriodValue: string;
  public get InfusionPeriodValue(): string {
    return this._InfusionPeriodValue;
  }
  public set InfusionPeriodValue(value: string) {
    this._InfusionPeriodValue = value;
    //NotifyPropertyChanged("InfusionPeriodValue");
  }
  private _ConcentrationValue: string;
  public get ConcentrationValue(): string {
    return this._ConcentrationValue;
  }
  public set ConcentrationValue(value: string) {
    this._ConcentrationValue = value;
    //NotifyPropertyChanged("ConcentrationValue");
  }
  private _InfusionDoseValue: string;
  public get InfusionDoseValue(): string {
    return this._InfusionDoseValue;
  }
  public set InfusionDoseValue(value: string) {
    this._InfusionDoseValue = value;
    //NotifyPropertyChanged("InfusionDoseValue");
  }
}
export class ClinicalVerificationHistoryDetails extends ViewModelBase {
  private _MCVersion: string;
  public get MCVersion(): string {
    return this._MCVersion;
  }
  public set MCVersion(value: string) {
    this._MCVersion = value;
    //NotifyPropertyChanged("MCVersion");
  }
  private _Actionby: string;
  public get Actionby(): string {
    return this._Actionby;
  }
  public set Actionby(value: string) {
    this._Actionby = value;
    //NotifyPropertyChanged("Actionby");
  }
  private _ActionOn: DateTime = DateTime.MinValue;
  public get ActionOn(): DateTime {
    return this._ActionOn;
  }
  public set ActionOn(value: DateTime) {
    this._ActionOn = value;
    //NotifyPropertyChanged("ActionOn");
  }
  private _Comments: string;
  public get Comments(): string {
    return this._Comments;
  }
  public set Comments(value: string) {
    this._Comments = value;
    //NotifyPropertyChanged("Comments");
  }
  private _Status: string;
  public get Status(): string {
    return this._Status;
  }
  public set Status(value: string) {
    this._Status = value;
    //NotifyPropertyChanged("Status");
  }
  private _lPrescriptionItemOid: number = 0;
  public get PrescriptionItemOid(): number {
    return this._lPrescriptionItemOid;
  }
  public set PrescriptionItemOid(value: number) {
    this._lPrescriptionItemOid = value;
    //NotifyPropertyChanged("PrescriptionItemOid");
  }
  constructor() {
    super();
    let objIPPManagePresServiceProxy: IPPManagePrescSer.IPPMAManagePrescriptionWSSoapClient;
    objIPPManagePresServiceProxy =
      new IPPManagePrescSer.IPPMAManagePrescriptionWSSoapClient();
    objIPPManagePresServiceProxy.GetClinicalVerificationDetailsCompleted = (
      s,
      e
    ) => {
      this.objServiceProxy_GetClinicalVerificationDetailsCompleted(s, e);
    };
  }
  private _objClinicalVerificationHistory: ObservableCollection<ClinicalVerificationHistoryDetails> =
    new ObservableCollection<ClinicalVerificationHistoryDetails>();
  public get ClinicalVHistoryLink(): ObservableCollection<ClinicalVerificationHistoryDetails> {
    return this._objClinicalVerificationHistory;
  }
  public set ClinicalVHistoryLink(
    value: ObservableCollection<ClinicalVerificationHistoryDetails>
  ) {
    if (this._objClinicalVerificationHistory != value) {
      this._objClinicalVerificationHistory = value;
      //NotifyPropertyChanged("ClinicalVHistoryLink");
    }
  }
  public GetClinicalVerHistory(): void {
    let oReq: IPPManagePrescSer.CReqMsgGetClinicalVerificationDetails =
      new IPPManagePrescSer.CReqMsgGetClinicalVerificationDetails();
    oReq.oContextInformation = CommonBB.FillContext();
    oReq.objIpBC = new IPPManagePrescSer.ClinicalVerificationHistoryIP();
    oReq.objIpBC.EncounterOid = PatientContext.EncounterOid;
    oReq.objIpBC.PatientOid = PatientContext.PatientOID;
    oReq.objIpBC.PrescriptionItemOid = this.PrescriptionItemOid;
    oReq.objIpBC.MCVersionNo = this.MCVersion;
    let objServiceProxy: IPPManagePrescSer.IPPMAManagePrescriptionWSSoapClient =
      new IPPManagePrescSer.IPPMAManagePrescriptionWSSoapClient();
    objServiceProxy.GetClinicalVerificationDetailsCompleted = (s, e) => {
      this.objServiceProxy_GetClinicalVerificationDetailsCompleted(s, e);
    };
    objServiceProxy.GetClinicalVerificationDetailsAsync(oReq);
  }
  private objServiceProxy_GetClinicalVerificationDetailsCompleted(
    sender: Object,
    e: IPPManagePrescSer.GetClinicalVerificationDetailsCompletedEventArgs
  ): void {
    if (e.Error == null) {
      let oRes: IPPManagePrescSer.CResMsgGetClinicalVerificationDetails =
        e.Result;
      if (oRes != null && oRes.objOP != null && oRes.objOP.Count > 0) {
        oRes.objOP.forEach((op) => {
          let obj: ClinicalVerificationHistoryDetails =
            new ClinicalVerificationHistoryDetails();
          obj.Actionby = op.ActionBy;
          obj.Status = obj.GetMedStatusHistory(op.Status);
          obj.Comments = op.Comments;
          obj.ActionOn = op.ActionOn;
          this.ClinicalVHistoryLink.Add(obj);
        });
      }
    }
  }
  private GetMedStatusHistory(statusCode: string): string {
    let status: string = String.Empty;
    switch (statusCode) {
      case 'MEDStatus1':
        status = 'Amended';
        break;
      case 'MEDStatus2':
        status = 'Cancelled';
        break;
      case 'MEDStatus3':
        status = 'Discontinued';
        break;
      case 'MEDStatus4':
        status = 'Issued';
        break;
      case 'MEDStatus5':
        status = 'Dispensed';
        break;
      case 'MEDStatus6':
        status = 'Submitted';
        break;
      case 'MEDStatus7':
        status = 'Awaiting authorise';
        break;
      case 'MEDStatus8':
        break;
      case 'MEDStatus9':
        status = 'Auto verified';
        break;
      case 'MEDStatus10':
        status = 'Clinically verified';
        break;
      case 'MEDStatus11':
        status = 'Technically validated';
        break;
      case 'MEDStatus12':
        status = 'Not authorised';
        break;
      case 'MEDStatus13':
        status = 'On hold';
        break;
      case 'MEDStatus14':
        status = 'Completed';
        break;
      default:
        status = 'Submitted';
        break;
    }
    return status;
  }
}
export class OnBehalfOfDetails extends ViewModelBase {
  private onBehalfDTTMField: DateTime = DateTime.MinValue;
  private onBehalfOfField: string;
  private onBehalfReasonField: string;
  private communicationModeField: string;
  private usersfield: string;
  private actionField: string;
  public get OnBehalfDTTM(): DateTime {
    return this.onBehalfDTTMField;
  }
  public set OnBehalfDTTM(value: DateTime) {
    this.onBehalfDTTMField = value;
    //NotifyPropertyChanged("OnBehalfDTTM");
  }
  public get OnBehalfOf(): string {
    return this.onBehalfOfField;
  }
  public set OnBehalfOf(value: string) {
    this.onBehalfOfField = value;
    //NotifyPropertyChanged("OnBehalfOf");
  }
  public get OnBehalfReason(): string {
    return this.onBehalfReasonField;
  }
  public set OnBehalfReason(value: string) {
    this.onBehalfReasonField = value;
    //NotifyPropertyChanged("OnBehalfReason");
  }
  public get CommunicationMode(): string {
    return this.communicationModeField;
  }
  public set CommunicationMode(value: string) {
    this.communicationModeField = value;
    //NotifyPropertyChanged("CommunicationMode");
  }
  public get Users(): string {
    return this.usersfield;
  }
  public set Users(value: string) {
    this.usersfield = value;
    //NotifyPropertyChanged("Users");
  }
  public get Action(): string {
    return this.actionField;
  }
  public set Action(value: string) {
    this.actionField = value;
    //NotifyPropertyChanged("Action");
  }
  private prescriptionItemOidField: number = 0;
  public get PrescriptionItemOid(): number {
    return this.prescriptionItemOidField;
  }
  public set PrescriptionItemOid(value: number) {
    this.prescriptionItemOidField = value;
    //NotifyPropertyChanged("PrescriptionItemOid");
  }
  constructor() {
    super();
    let objIPPManagePresServiceProxy: IPPManagePrescSer.IPPMAManagePrescriptionWSSoapClient;
    objIPPManagePresServiceProxy =
      new IPPManagePrescSer.IPPMAManagePrescriptionWSSoapClient();
    objIPPManagePresServiceProxy.GetOnBehalfOfDetailsCompleted = (s, e) => {
      this.objServiceProxy_GetOnBehalfOfDetailsCompleted(s, e);
    };
  }
  private _objonbehalfofdetails: ObservableCollection<OnBehalfOfDetails> =
    new ObservableCollection<OnBehalfOfDetails>();
  public get OnBehalfLink(): ObservableCollection<OnBehalfOfDetails> {
    return this._objonbehalfofdetails;
  }
  public set OnBehalfLink(value: ObservableCollection<OnBehalfOfDetails>) {
    if (this._objonbehalfofdetails != value) {
      this._objonbehalfofdetails.CopyFrom(value);
      //this._objonbehalfofdetails = value;
      //NotifyPropertyChanged("OnBehalfLink");
    }
  }
  public GetOnBehalfOfDetails(): void {
    let objServiceProxy: IPPManagePrescSer.IPPMAManagePrescriptionWSSoapClient =
      new IPPManagePrescSer.IPPMAManagePrescriptionWSSoapClient();
    objServiceProxy.GetOnBehalfOfDetailsCompleted = (s, e) => {
      this.objServiceProxy_GetOnBehalfOfDetailsCompleted(s, e);
    };
    let oReq: IPPManagePrescSer.CReqMsgGetOnBehalfOfDetails =
      new IPPManagePrescSer.CReqMsgGetOnBehalfOfDetails();
    oReq.oContextInformation = CommonBB.FillContext();
    oReq.objIbBC = new IPPManagePrescSer.OnBehalfDetailsIp();
    oReq.objIbBC.PrescriptionItemOid = this.prescriptionItemOidField;
    objServiceProxy.GetOnBehalfOfDetailsAsync(oReq);
  }
  objServiceProxy_GetOnBehalfOfDetailsCompleted(
    sender: Object,
    e: IPPManagePrescSer.GetOnBehalfOfDetailsCompletedEventArgs
  ): void {
    if (e.Error == null) {
      let oRes: IPPManagePrescSer.CResMsgGetOnBehalfOfDetails = e.Result;
      if (oRes != null && oRes.objOB != null && oRes.objOB.Count > 0) {
        oRes.objOB.forEach((ob) => {
          let obj: OnBehalfOfDetails = new OnBehalfOfDetails();
          obj.onBehalfDTTMField = ob.OnBehalfDTTM;
          obj.OnBehalfOf = ob.OnBehalfOf;
          obj.communicationModeField = CommonBB.GetText(
            ob.CommunicationMode,
            MedicationCommonConceptCodeData.ViewConceptCodes
          );
          obj.onBehalfReasonField = CommonBB.GetText(
            ob.OnBehalfReason,
            MedicationCommonConceptCodeData.ViewConceptCodes
          );
          obj.usersfield = ob.Users;
          obj.actionField = this.GetActionPerformedCode(ob.Action);
          this.OnBehalfLink.Add(obj);
        });
      }
    }
  }
  private GetActionPerformedCode(ActionPerformedCode: string): string {
    let ActionPerformed: string = String.Empty;
    switch (ActionPerformedCode) {
      case 'ACT_NEW':
        ActionPerformedCode = 'New';
        break;
      case 'ACT_UPDATE':
        ActionPerformedCode = 'Update';
        break;
      case 'ACT_COMPLETE':
        ActionPerformedCode = 'Completed';
        break;
      case 'ACT_DISCONTINUE':
        ActionPerformedCode = 'Discontinue';
        break;
      case 'ACT_CANCEL':
        ActionPerformedCode = 'Cancel';
        break;
      default:
        ActionPerformedCode = 'Completed';
        break;
    }
    return ActionPerformedCode;
  }
}
export class MedsScanProductDetailVM extends ViewModelBase {
  private medAdminOIDField: number = 0;
  private PrescriptionitemOIDField: number = 0;
  private MedAdminHistoryOIDField: number = 0;
  private MedAdminInfusionOIDField: number = 0;
  private MCVersionField: string;
  private _PrescriptionItemScheduleOID: number = 0;
  public get MedAdminOID(): number {
    return this.medAdminOIDField;
  }
  public set MedAdminOID(value: number) {
    this.medAdminOIDField = value;
    //NotifyPropertyChanged("MedAdminOID");
  }
  public get PrescriptionitemOID(): number {
    return this.PrescriptionitemOIDField;
  }
  public set PrescriptionitemOID(value: number) {
    this.PrescriptionitemOIDField = value;
    //NotifyPropertyChanged("PrescriptionitemOID");
  }
  public get MedAdminHistoryOID(): number {
    return this.MedAdminHistoryOIDField;
  }
  public set MedAdminHistoryOID(value: number) {
    this.MedAdminHistoryOIDField = value;
    //NotifyPropertyChanged("MedAdminHistoryOID");
  }
  public get MedAdminInfusionOID(): number {
    return this.MedAdminInfusionOIDField;
  }
  public set MedAdminInfusionOID(value: number) {
    this.MedAdminInfusionOIDField = value;
    //NotifyPropertyChanged("MedAdminInfusionOID");
  }
  public get MCVersion(): string {
    return this.MCVersionField;
  }
  public set MCVersion(value: string) {
    this.MCVersionField = value;
    //NotifyPropertyChanged("MCVersion");
  }
  public get PrescriptionItemScheduleOID(): number {
    return this._PrescriptionItemScheduleOID;
  }
  public set PrescriptionItemScheduleOID(value: number) {
    this._PrescriptionItemScheduleOID = value;
    //NotifyPropertyChanged("PrescriptionItemScheduleOID");
  }
  private _ProductScannedhdrValue: string;
  private IsProductScannedField: string = 'N';
  private _TotalDoseValueAdmin: string;
  private _IsVisibleTotalDoseValueAdmin: Visibility = Visibility.Visible;
  public get ProductScannedhdrValue(): string {
    return this._ProductScannedhdrValue;
  }
  public set ProductScannedhdrValue(value: string) {
    this._ProductScannedhdrValue = value;
    //NotifyPropertyChanged("ProductScannedhdrValue");
  }
  public get IsProductScanned(): string {
    return this.IsProductScannedField;
  }
  public set IsProductScanned(value: string) {
    this.IsProductScannedField = value;
    //NotifyPropertyChanged("IsProductScanned");
  }
  public get TotalDoseValueAdmin(): string {
    return this._TotalDoseValueAdmin;
  }
  public set TotalDoseValueAdmin(value: string) {
    this._TotalDoseValueAdmin = value;
  }
  public get IsVisibleTotalDoseValueAdmin(): Visibility {
    return this._IsVisibleTotalDoseValueAdmin;
  }
  public set IsVisibleTotalDoseValueAdmin(value: Visibility) {
    if (this._IsVisibleTotalDoseValueAdmin != value) {
      this._IsVisibleTotalDoseValueAdmin = value;
    }
  }
  public oDrugDetail: ObservableCollection<DrugDetail>;
  private _oScannedProductdetailInfo: ObservableCollection<ScannedProductdetailInfo>;
  public get oScannedProductdetailInfo(): ObservableCollection<ScannedProductdetailInfo> {
    return this._oScannedProductdetailInfo;
  }
  public set oScannedProductdetailInfo(
    value: ObservableCollection<ScannedProductdetailInfo>
  ) {
    if (this._oScannedProductdetailInfo != value) {
      this._oScannedProductdetailInfo = value;
      //NotifyPropertyChanged("oScannedProductdetailInfo");
    }
  }
  public GetScanRecordDetails(): void {
    let oServiceProxy: MedicationMgmt.MedicationAdministrationWSSoapClient =
      new MedicationMgmt.MedicationAdministrationWSSoapClient();
    oServiceProxy.GetMedicationScanDetailsCompleted = (s, e) => {
      this.objMedicationAdministrationProxy_GetMedicationScanDetailsCompleted(
        s,
        e
      );
    };
    let oReq: MedicationMgmt.CReqMsgGetMedicationScanDetails =
      new MedicationMgmt.CReqMsgGetMedicationScanDetails();
    oReq.oContextInformation = CommonBB.FillContext();
    oReq.oMedicationScanDetailsRequestBC =
      new MedicationMgmt.MedicationScanDetailsRequest();
    oReq.oMedicationScanDetailsRequestBC.MedAdminOID = this.medAdminOIDField;
    oReq.oMedicationScanDetailsRequestBC.MedAdminHistoryOID =
      this.MedAdminHistoryOIDField;
    oReq.oMedicationScanDetailsRequestBC.PrescriptionItemOID =
      this.PrescriptionitemOID;
    oReq.oMedicationScanDetailsRequestBC.PrescriptionItemScheduleOID =
      this.PrescriptionItemScheduleOID;
    oReq.oMedicationScanDetailsRequestBC.PatientOID = PatientContext.PatientOID;
    if (!String.IsNullOrEmpty(this.MCVersionField)) {
      oReq.oMedicationScanDetailsRequestBC.MCVersion = this.MCVersionField;
    } else {
      oReq.oMedicationScanDetailsRequestBC.MCVersion = AppSessionInfo.AMCV;
    }
    oReq.oMedicationScanDetailsRequestBC.MedAdminInfusionOID =
      this.MedAdminInfusionOIDField;
    oServiceProxy.GetMedicationScanDetailsAsync(oReq);
  }
  public objMedicationAdministrationProxy_GetMedicationScanDetailsCompleted(
    sender: Object,
    e: MedicationMgmt.GetMedicationScanDetailsCompletedEventArgs
  ): void {
    //Not Required for LHS. To be Re-Visited.
    let oScanRecMedicationMezzanine: ScanRecMedicationMezzanineCa = new ScanRecMedicationMezzanineCa();
    if (e.Error == null && e.Result != null) {
      let oRes: MedicationMgmt.CResMsgGetMedicationScanDetails = e.Result;
      if (
        oRes != null &&
        oRes.oMedicationScanDetailsResponse != null &&
        oRes.oMedicationScanDetailsResponse.Count > 0 &&
        oRes.oDrugDetail != null
      ) {
        let oMedsScanProdDtlVM: MedsScanProductDetailVM =
          new MedsScanProductDetailVM();
        oMedsScanProdDtlVM.oDrugDetail = oRes.oDrugDetail;
        oMedsScanProdDtlVM.oScannedProductdetailInfo =
          new ObservableCollection<ScannedProductdetailInfo>();
        oRes.oMedicationScanDetailsResponse.forEach((objRes) => {
          let oScannedProductdetailInfo: ScannedProductdetailInfo =
            new ScannedProductdetailInfo();
          oScannedProductdetailInfo.ProductCode = !String.IsNullOrEmpty(
            objRes.ProductCode
          )
            ? objRes.ProductCode
            : String.Empty;
          oScannedProductdetailInfo.Productscanned = !String.IsNullOrEmpty(
            objRes.ScanProductName
          )
            ? objRes.ScanProductName
            : String.Empty;
          oScannedProductdetailInfo.Batchnumber = !String.IsNullOrEmpty(
            objRes.BatchNumber
          )
            ? objRes.BatchNumber
            : String.Empty;
          oScannedProductdetailInfo.Serialnumber = !String.IsNullOrEmpty(
            objRes.Serialnumber
          )
            ? objRes.Serialnumber
            : String.Empty;
          oScannedProductdetailInfo.Expirydate =
            objRes.ExpiryDTTM != null ? objRes.ExpiryDTTM : DateTime.MinValue;
          oScannedProductdetailInfo.Comments = objRes.Comments;
          oMedsScanProdDtlVM.oScannedProductdetailInfo.Add(
            oScannedProductdetailInfo
          );
        });
        if (oRes.oMedicationScanDetailsResponse[0] != null) {
          oMedsScanProdDtlVM.IsProductScanned =
            oRes.oMedicationScanDetailsResponse[0].IsProductScanned;
          if (
            !String.IsNullOrEmpty(
              oRes.oMedicationScanDetailsResponse[0].TotaldoseadministeredAmt
            ) &&
            !String.IsNullOrEmpty(
              oRes.oMedicationScanDetailsResponse[0].TotalDoseAdministeredUOM
            )
          ) {
            oMedsScanProdDtlVM.TotalDoseValueAdmin =
              oRes.oMedicationScanDetailsResponse[0].TotaldoseadministeredAmt +
              ' ' +
              oRes.oMedicationScanDetailsResponse[0].TotalDoseAdministeredUOM;
          }
        }
        if (
          !String.IsNullOrEmpty(
            oMedsScanProdDtlVM.oDrugDetail[0].DrugHeader.AdminMethod
          ) ||
          (oMedsScanProdDtlVM.oDrugDetail[0].DrugHeader.InfusionType != null &&
            !String.IsNullOrEmpty(
              oMedsScanProdDtlVM.oDrugDetail[0].DrugHeader.InfusionType
            ) &&
            (String.Equals(
              oMedsScanProdDtlVM.oDrugDetail[0].DrugHeader.InfusionType,
              InfusionTypeCode.CONTINUOUS,
              StringComparison.CurrentCultureIgnoreCase
            ) ||
              String.Equals(
                oMedsScanProdDtlVM.oDrugDetail[0].DrugHeader.InfusionType,
                InfusionTypeCode.FLUID,
                StringComparison.CurrentCultureIgnoreCase
              ))) ||
          (!String.IsNullOrEmpty(
            oMedsScanProdDtlVM.oDrugDetail[0].DrugHeader.ItemType
          ) &&
            String.Equals(
              oMedsScanProdDtlVM.oDrugDetail[0].DrugHeader.ItemType,
              'CC_APPLIANCE',
              StringComparison.CurrentCultureIgnoreCase
            )) ||
          String.Equals(
            oMedsScanProdDtlVM.oDrugDetail[0].DrugHeader.InfusionType,
            InfusionTypeCode.PCA,
            StringComparison.CurrentCultureIgnoreCase
          )
        ) {
          oMedsScanProdDtlVM.IsVisibleTotalDoseValueAdmin =
            Visibility.Collapsed;
        }
        //Not Required for LHS. To be Re-Visited.
        oScanRecMedicationMezzanine.DataContext = oMedsScanProdDtlVM;
        let iWidth: number = 1100;
        if (MedicationCommonBB.IsCalledFromWeb) iWidth = 925;
        if (!MedicationCommonBB.IsAvoidDoubleClick) {
          MedicationCommonBB.IsAvoidDoubleClick = true;
          //Not Required for LHS. To be Re-Visited.
          AppActivity.OpenWindow("View scanned/Recorded medication", oScanRecMedicationMezzanine, (s,e)=>{this.ViewRecMed_closed(s);}, "", false, 430, iWidth, false, WindowButtonType.Close, null);
        }
      }
    }
  }
  ViewRecMed_closed(args: AppDialogEventargs): void {
    MedicationCommonBB.IsAvoidDoubleClick = false;
    let oAppDialogWindow = args.AppChildWindow as ChildWindow;
    oAppDialogWindow.DialogResult = true;
    // args.AppChildWindow.DialogResult = true;
  }
}
export class ScannedProductdetailInfo extends ViewModelBase {
  private ProductscannedField: string;
  private ProductCodeField: string;
  private ExpirydateField: DateTime = DateTime.MinValue;
  private BatchnumberField: string;
  private SerialnumberField: string;
  private _Comments: string;
  public get Productscanned(): string {
    return this.ProductscannedField;
  }
  public set Productscanned(value: string) {
    this.ProductscannedField = value;
    //NotifyPropertyChanged("Productscanned");
  }
  public get ProductCode(): string {
    return this.ProductCodeField;
  }
  public set ProductCode(value: string) {
    this.ProductCodeField = value;
    //NotifyPropertyChanged("ProductCode");
  }
  public get Expirydate(): DateTime {
    return this.ExpirydateField;
  }
  public set Expirydate(value: DateTime) {
    this.ExpirydateField = value;
    //NotifyPropertyChanged("Expirydate");
  }
  public get Batchnumber(): string {
    return this.BatchnumberField;
  }
  public set Batchnumber(value: string) {
    this.BatchnumberField = value;
    //NotifyPropertyChanged("Batchnumber");
  }
  public get Serialnumber(): string {
    return this.SerialnumberField;
  }
  public set Serialnumber(value: string) {
    this.SerialnumberField = value;
    //NotifyPropertyChanged("Serialnumber");
  }
  public get Comments(): string {
    return this._Comments;
  }
  public set Comments(value: string) {
    this._Comments = value;
  }
}
export class PresItemModifyHistory {
  public Attribute: string;
  public FromValue: string;
  public ToValue: string;
  public ModifiedAt: DateTime = DateTime.MinValue;
  public ModifiedBy: string;
  public ReasonForModification: string;
  public ModificationComments: string;
}
export class PresItemModifyHistoryDetails extends ViewModelBase {
  private PrescriptionItemOid: number = 0;
  private PItemDetails: PrescriptionItemDetailsVM;
  constructor(
    prescriptionItemOid: number,
    PItemDetails: PrescriptionItemDetailsVM
  ) {
    super();
    this.PrescriptionItemOid = prescriptionItemOid;
    this.PItemDetails = PItemDetails;
  }
  
    private _ModificationHistory: ObservableCollection<PresItemModifyHistory> = new ObservableCollection<PresItemModifyHistory>();
  public get ModificationHistory(): ObservableCollection<PresItemModifyHistory> {
    return this._ModificationHistory;
  }
  public set ModificationHistory(
    value: ObservableCollection<PresItemModifyHistory>
  ) {
    //this._ModificationHistory = value;
    this._ModificationHistory.CopyFrom(value);
    //NotifyPropertyChanged("ModificationHistory");
  }
  public UpdateHistory(): void {
    let oReq: IPPManagePrescSer.CReqMsgGetPresItemUpdateHistory =
      new IPPManagePrescSer.CReqMsgGetPresItemUpdateHistory();
    oReq.oContextInformation = CommonBB.FillContext();
    oReq.patientOidBC = PatientContext.PatientOID;
    oReq.presItemOidBC = this.PrescriptionItemOid;
    let objServiceProxy: IPPManagePrescSer.IPPMAManagePrescriptionWSSoapClient =
      new IPPManagePrescSer.IPPMAManagePrescriptionWSSoapClient();
    objServiceProxy.GetPresItemUpdateHistoryCompleted = (s, e) => {
      this.objServiceProxy_GetPresItemUpdateHistoryCompleted(s, e);
    };
    objServiceProxy.GetPresItemUpdateHistoryAsync(oReq);
  }
  objServiceProxy_GetPresItemUpdateHistoryCompleted(
    sender: Object,
    e: IPPManagePrescSer.GetPresItemUpdateHistoryCompletedEventArgs
  ): void {
    let liModificationHistory: List<PresItemModifyHistory> =
      new List<PresItemModifyHistory>();
    let dct: Dictionary<string, string> = new Dictionary<string, string>();
    dct[FieldNames.AdditionalComment] =
      Resource.presItemUpdateHistory.AdditionalComment_Field;
    dct[FieldNames.AdministrationInstruction] =
      Resource.presItemUpdateHistory.AdministrationInstruction_Field;
    dct[FieldNames.DeliveryDevice] =
      Resource.presItemUpdateHistory.DeliveryDevice_Field;
    dct[FieldNames.DurationUom] =
      Resource.presItemUpdateHistory.DurationUom_Field;
    dct[FieldNames.FlowRate] = Resource.presItemUpdateHistory.FlowRate_Field;
    dct[FieldNames.InfusionPeriod] =
      Resource.presItemUpdateHistory.InfusionPeriod_Field;
    dct[FieldNames.MaxDose] = Resource.presItemUpdateHistory.MaxDose_Field;
    dct[FieldNames.OnAdmission] =
      Resource.presItemUpdateHistory.OnAdmission_Field;
    dct[FieldNames.ProblemIndication] =
      Resource.presItemUpdateHistory.ProblemIndication_Field;
    dct[FieldNames.QuantityUom] =
      Resource.presItemUpdateHistory.QuantityUom_Field;
    dct[FieldNames.StopDatetime] =
      Resource.presItemUpdateHistory.StopDatetime_Field;
    dct[FieldNames.TargetSaturationRange] =
      Resource.presItemUpdateHistory.TargetSaturationRange_Field;
    if (e.Result != null && e.Result.objPrescResponse != null) {
      let incidents = e.Result.objPrescResponse.ModificationIncidents;
      for (let i: number = 0; i < incidents.Length; i++) {
        let reasonForModification: string = String.Empty;
        if (this.PItemDetails.RsnForMod != null) {
          let term: CValuesetTerm = this.PItemDetails.RsnForMod.Where(
            (x) => x.csCode == incidents[i].ReasonForModification
          ).FirstOrDefault();
          if (term != null) {
            reasonForModification = term.csDescription;
          }
        }
        for (let j: number = 0; j < incidents[i].AuditChanges.Length; j++) {
          let fieldName: string = incidents[i].AuditChanges[j].FieldName;
          if (dct.ContainsKey(fieldName)) fieldName = dct[fieldName];
          liModificationHistory.Add(
            ObjectHelper.CreateObject(new PresItemModifyHistory(), {
              ReasonForModification: reasonForModification,	            
              ModificationComments: incidents[i].ModificationComments,
              Attribute: fieldName,
              FromValue: incidents[i].AuditChanges[j].OldValue,
              ToValue: incidents[i].AuditChanges[j].NewValue,
              ModifiedAt: incidents[i].ModifiedAt,
              ModifiedBy: incidents[i].ModifiedBy,
            })
          );
        }
      }
      this.ModificationHistory =
        new ObservableCollection<PresItemModifyHistory>();
      liModificationHistory
        .OrderByDescending((x) => x.ModifiedAt)
        .ThenBy((x) => x.Attribute)
        .forEach((v) => {
          this.ModificationHistory.Add(v);
        });
    }
  }
}
export class AdminHistoryList extends ViewModelBase {
  private ga: string;
  public medadminslotservicedata:EventEmitter<any>=new EventEmitter();
  public medadminslotdetailservicedata:EventEmitter<any>=new EventEmitter();
  private gb: string;
  private _Status: string;
  private gc: DateTime = DateTime.MinValue;
  private gd: number = 0;
  private ge: string;
  private gf: string;
  private gg: string;
  private gh: string;
  private IsDST: boolean = false;
  private IsAmbiguous: boolean = false;
  private IsInvalid: boolean = false;
  constructor() {
    super();
  }
  OnRTEResult(args: RTEEventargs): void {
    if (
      args != null &&
      args.Result != null &&
      args.Result instanceof Dictionary
    ) {
      let objResult: Dictionary<
        string,
        List<CListItem>
      > = ObjectHelper.CreateType<Dictionary<string, List<CListItem>>>(
        args.Result,
        Dictionary<string, List<CListItem>>
      );
      if (objResult != null) {
        let _DomainCodes: string =
          ValueDomain.MedicationAdministrationSlotStatus +
          ',' +
          ValueDomain.ActionPerformed +
          ',' +
          ValueDomain.INFUSIONACTIONS +
          ',' +
          ValueDomain.InfStrikeThroughAction;
        if (String.Equals(args.Request, _DomainCodes)) {
          this.MedicationAdministrationSlotStatus =
            new ObservableCollection<CValuesetTerm>();
          this.ActionPerformedname = new ObservableCollection<CValuesetTerm>();
          objResult.forEach((objDomainDetail) => {
            if (
              String.Equals(
                objDomainDetail.Key,
                ValueDomain.MedicationAdministrationSlotStatus
              ) ||
              String.Equals(objDomainDetail.Key, ValueDomain.INFUSIONACTIONS)
            ) {
              objDomainDetail.Value.forEach((oCListItem) => {
                this.MedicationAdministrationSlotStatus.Add(
                  ObjectHelper.CreateObject(new CValuesetTerm(), {
                    csCode: oCListItem.Value,
                    csDescription: oCListItem.DisplayText,
                  })
                );
              });
            } else if (
              String.Equals(objDomainDetail.Key, ValueDomain.ActionPerformed) ||
              String.Equals(
                objDomainDetail.Key,
                ValueDomain.InfStrikeThroughAction
              )
            ) {
              objDomainDetail.Value.forEach((oCListItem) => {
                this.ActionPerformedname.Add(
                  ObjectHelper.CreateObject(new CValuesetTerm(), {
                    csCode: oCListItem.Value,
                    csDescription: oCListItem.DisplayText,
                  })
                );
              });
            }
          });
        }
      }
    }
    let oServiceProxy: MedicationMgmt.MedicationAdministrationWSSoapClient =
      new MedicationMgmt.MedicationAdministrationWSSoapClient();
    oServiceProxy.GetAdminHistoryListCompleted = (s, e) => {
      this.objMedicationAdministrationProxy_GetAdminHistoryListCompleted(s, e);
    };
    let objReqAdminHisList: MedicationMgmt.CReqMsgGetAdminHistoryList =
      new MedicationMgmt.CReqMsgGetAdminHistoryList();
    objReqAdminHisList.MedAdminOIDBC = this.MedsAdminOID;
    objReqAdminHisList.PatientOIDBC = PatientContext.PatientOID;
    objReqAdminHisList.ScheduleOIDBC = this.PresSchOID;
    objReqAdminHisList.oContextInformation = CommonBB.FillContext();
    oServiceProxy.GetAdminHistoryListAsync(objReqAdminHisList);
  }
  public MedicationAdministrationSlotStatus: ObservableCollection<CValuesetTerm>;
  public ActionPerformedname: ObservableCollection<CValuesetTerm>;
  public MedsAdminOID: number = 0;
  public PresSchOID: number = 0;
  public get ActionCode(): string {
    return this.ga;
  }
  public set ActionCode(value: string) {
    this.ga = value;
    //NotifyPropertyChanged("ActionCode");
  }
  public get ActionCodeValue(): string {
    return this.gh;
  }
  public set ActionCodeValue(value: string) {
    this.gh = value;
    //NotifyPropertyChanged("ActionCodeValue");
  }
  public get SlotStatus(): string {
    return this.gb;
  }
  public set SlotStatus(value: string) {
    this.gb = value;
    //NotifyPropertyChanged("SlotStatus");
  }
  public get Status(): string {
    return this._Status;
  }
  public set Status(value: string) {
    this._Status = value;
    //NotifyPropertyChanged("Status");
  }
  public get ActionDTTM(): DateTime {
    return this.gc;
  }
  public set ActionDTTM(value: DateTime) {
    this.gc = value;
    //NotifyPropertyChanged("ActionDTTM");
  }
  public get MedAdminHistoryOID(): number {
    return this.gd;
  }
  public set MedAdminHistoryOID(value: number) {
    this.gd = value;
    //NotifyPropertyChanged("MedAdminHistoryOID");
  }
  public get ActionBySurname(): string {
    return this.ge;
  }
  public set ActionBySurname(value: string) {
    this.ge = value;
    //NotifyPropertyChanged("ActionBySurname");
  }
  public get ActionByForename(): string {
    return this.gf;
  }
  public set ActionByForename(value: string) {
    this.gf = value;
    //NotifyPropertyChanged("ActionByForename");
  }
  public get ActionByTitle(): string {
    return this.gg;
  }
  public set ActionByTitle(value: string) {
    this.gg = value;
    //NotifyPropertyChanged("ActionByTitle");
  }
  private oAdminHistList: ObservableCollection<AdminHistoryList>=new ObservableCollection<AdminHistoryList>();
  public get AdminHistList(): ObservableCollection<AdminHistoryList> {
    return this.oAdminHistList;
  }
  public set AdminHistList(value: ObservableCollection<AdminHistoryList>) {
    if (this.oAdminHistList != value) {
      this.oAdminHistList.CopyFrom(value);
    //  this.oAdminHistList = value;
      //NotifyPropertyChanged("AdminHistList");
    }
  }
  private oAdminHistListDet: ObservableCollection<AdminHistoryListDetails>=new ObservableCollection<AdminHistoryListDetails>();
  public get AdminHistListDet(): ObservableCollection<AdminHistoryListDetails> {
    return this.oAdminHistListDet;
  }
  public set AdminHistListDet(
    value: ObservableCollection<AdminHistoryListDetails>
  ) {
    if (this.oAdminHistListDet != value) {
      this.oAdminHistListDet = value;
      //NotifyPropertyChanged("AdminHistListDet");
    }
  }
  public GetAdminHistoryList(MedAdminOID: number, PresSchOIDs: number): void {
    this.MedsAdminOID = MedAdminOID;
    this.PresSchOID = PresSchOIDs;
    ProcessRTE.GetValuesByDomainCodes(
      ValueDomain.MedicationAdministrationSlotStatus +
      ',' +
      ValueDomain.ActionPerformed +
      ',' +
      ValueDomain.INFUSIONACTIONS +
      ',' +
      ValueDomain.InfStrikeThroughAction,
      (s, e) => {
        this.OnRTEResult(s);
      }
    );
  }
  public objMedicationAdministrationProxy_GetAdminHistoryListCompleted(
    sender: Object,
    e: MedicationMgmt.GetAdminHistoryListCompletedEventArgs
  ): void {
    let _ErrorID: number = 80000124;
    let _ErrorSource: string =
      'LorAppMedicationCommonBB.dll, Class:Prescriptionitemdetailsvm, Method:objMedicationAdministrationProxy_GetAdminHistoryListCompleted()';
    if (e.Error == null && e.Result != null) {
      try {
        let objResAdminHistList: MedicationMgmt.CResMsgGetAdminHistoryList =
          e.Result;
        let objAdminHistory: ObservableCollection<MedicationMgmt.AdminHistory> =
          objResAdminHistList.oAdminHistory;
        let lstTemp: ObservableCollection<AdminHistoryList> =
          new ObservableCollection<AdminHistoryList>();
        if (
          objResAdminHistList != null &&
          objResAdminHistList.oAdminHistory != null &&
          objResAdminHistList.oAdminHistory.Count > 0 &&
          objResAdminHistList.oAdminHistory[0] != null
        ) {
          objAdminHistory.forEach((objAdHistory) => {
            let oAdminHistList: AdminHistoryList = new AdminHistoryList();
            oAdminHistList.ActionByTitle = objAdHistory.ActionByTitle;
            oAdminHistList.ActionCodeValue = objAdHistory.ActionCode;
            oAdminHistList.ActionCode = CommonBB.GetText(
              objAdHistory.ActionCode,
              this.ActionPerformedname
            );
            oAdminHistList.ActionDTTM = objAdHistory.ActionDTTM;
            oAdminHistList.MedAdminHistoryOID = objAdHistory.MedAdminHistoryOID;
            oAdminHistList.SlotStatus = CommonBB.GetText(
              objAdHistory.SlotStatus.ToUpper(),
              this.MedicationAdministrationSlotStatus
            );
            if (
              !String.Equals(
                objAdHistory.SlotStatus,
                CnstSlotStatus.PLANNED,
                StringComparison.InvariantCultureIgnoreCase
              ) &&
              !String.Equals(
                objAdHistory.SlotStatus,
                CnstSlotStatus.HOMELEAVE,
                StringComparison.InvariantCultureIgnoreCase
              ) &&
              objAdHistory.IsDuringHomeLeave
            ) {
              oAdminHistList.Status =
                oAdminHistList.SlotStatus +
                Resource.medsadmindetails.DuringHomeLeave;
            } else {
              oAdminHistList.Status = oAdminHistList.SlotStatus;
            }
            oAdminHistList.IsMedScannedProduct =
              objAdHistory.IsMedScannedProduct;
            lstTemp.Add(oAdminHistList);
          });
          this.AdminHistList = lstTemp;
        } else {
          this.AdminHistList = null;
        }
      } catch (ex: any) {
        let lnReturn: number = AMSHelper.PublicExceptionDetails(
          _ErrorID,
          _ErrorSource,
          ex
        );
      }
    } else {
      let lnReturn: number = AMSHelper.PublicExceptionDetails(
        _ErrorID,
        _ErrorSource,
        e.Error
      );
    }
    this.medadminslotservicedata.emit(true);
  }
  sActionCode: string = String.Empty;
  sSlotStatus: string = String.Empty;
  public GetAdminHistoryListDetails(
    MedAdminHistoryOID: number,
    ActionCode: string,
    SlotStatus: string,
    ActionCodeValue: string,
    PrescriptionItemOID: number,
    MCVersionNo: string
  ): void {
    this.sActionCode = ActionCode;
    this.sSlotStatus = SlotStatus;
    if (
      String.Compare(
        ActionCodeValue,
        'CC_UNDODEFER',
        StringComparison.InvariantCultureIgnoreCase
      ) != 0
    ) {
      let oServiceProxy: MedicationMgmt.MedicationAdministrationWSSoapClient =
        new MedicationMgmt.MedicationAdministrationWSSoapClient();
      oServiceProxy.GetAdminHistoryListDetailsCompleted = (s, e) => {
        this.objMedicationAdministrationProxy_GetAdminHistoryListDetailsCompleted(
          s,
          e
        );
      };
      let objReqAdminHisListDet: MedicationMgmt.CReqMsgGetAdminHistoryListDetails =
        new MedicationMgmt.CReqMsgGetAdminHistoryListDetails();
      objReqAdminHisListDet.MedAdminHistoryOIDBC = MedAdminHistoryOID;
      objReqAdminHisListDet.MCVersionNoBC = !String.IsNullOrEmpty(MCVersionNo)
        ? MCVersionNo
        : AppSessionInfo.AMCV;
      objReqAdminHisListDet.PresHistoryOIDBC = MedAdminHistoryOID;
      objReqAdminHisListDet.ActivityBC = ActionCodeValue;
      objReqAdminHisListDet.oContextInformation = CommonBB.FillContext();
      oServiceProxy.GetAdminHistoryListDetailsAsync(objReqAdminHisListDet);
    } else {
      this.AdminHistListDet = null;
    }
  }
  public objMedicationAdministrationProxy_GetAdminHistoryListDetailsCompleted(
    sender: Object,
    e: MedicationMgmt.GetAdminHistoryListDetailsCompletedEventArgs
  ): void {
    let _ErrorID: number = 80000125;
    let _ErrorSource: string =
      'LorAppMedicationCommonBB.dll, Class:Prescriptionitemdetailsvm, Method:objMedicationAdministrationProxy_GetAdminHistoryListDetailsCompleted()';
    if (e.Error == null && e.Result != null) {
      try {
        let objResAdminHistListDet: MedicationMgmt.CResMsgGetAdminHistoryListDetails =
          e.Result;
        let objAdminHistoryDet: ObservableCollection<MedicationMgmt.AdminHistoryDetails> =
          objResAdminHistListDet.oAdminHistoryDetails;
        let lstTemp: ObservableCollection<AdminHistoryListDetails> =
          new ObservableCollection<AdminHistoryListDetails>();
        if (
          objResAdminHistListDet != null &&
          objResAdminHistListDet.oAdminHistoryDetails != null &&
          objResAdminHistListDet.oAdminHistoryDetails.Count > 0 &&
          objResAdminHistListDet.oAdminHistoryDetails[0] != null
        ) {
          objAdminHistoryDet.forEach((objAdHistory) => {
            let oAdminHistListDet: AdminHistoryListDetails =
              new AdminHistoryListDetails();
            oAdminHistListDet.Modified = CommonBB.GetText(
              objAdHistory.ColumnCode,
              this.ActionPerformedname
            );
            oAdminHistListDet.Modified = this.GetActionName(
              objAdHistory.ColumnCode
            );
            if (
              String.Equals(
                objAdHistory.ColumnCode,
                'EXPIRYDTTM',
                StringComparison.CurrentCultureIgnoreCase
              ) ||
              String.Equals(
                objAdHistory.ColumnCode,
                'ADMINISTEREDDTTM',
                StringComparison.CurrentCultureIgnoreCase
              )
            ) {
              let sDateTimeFormat: string = String.Equals(
                objAdHistory.ColumnCode,
                'EXPIRYDTTM',
                StringComparison.CurrentCultureIgnoreCase
              )
                ? CConstants.ShortDateFormat
                : CConstants.LongDateWithoutSecs;
              if (
                !String.IsNullOrEmpty(objAdHistory.FromValue) &&
                objAdHistory.FromValue != '0' &&
                Convert.ToDateTime(objAdHistory.FromValue).Year > 1753
              ) {
                oAdminHistListDet.From = Convert.ToDateTime(
                  CommonBB.GetText(
                    objAdHistory.FromValue,
                    this.MedicationAdministrationSlotStatus
                  )
                )
                  .ToLocalTime()
                  .ConvertToUser(
                    (o1) => {
                      this.IsDST = o1;
                    },
                    (o2) => {
                      this.IsAmbiguous = o2;
                    },
                    (o3) => {
                      this.IsInvalid = o3;
                    }
                  )
                  .ToDateTimeString(
                    this.IsDST,
                    this.IsAmbiguous,
                    sDateTimeFormat
                  );
              } else {
                oAdminHistListDet.From = String.Empty;
              }
              if(objAdHistory.ToValue.Equals("01/01/0001 00:00:00"))
              objAdHistory.ToValue = null;
              if (
                !String.IsNullOrEmpty(objAdHistory.ToValue) &&
                objAdHistory.ToValue != '0' &&
                Convert.ToDateTime(objAdHistory.ToValue).Year > 1753
              ) {
                oAdminHistListDet.To = Convert.ToDateTime(
                  CommonBB.GetText(
                    objAdHistory.ToValue,
                    this.MedicationAdministrationSlotStatus
                  )
                )
                  .ToLocalTime()
                  .ConvertToUser(
                    (o1) => {
                      this.IsDST = o1;
                    },
                    (o2) => {
                      this.IsAmbiguous = o2;
                    },
                    (o3) => {
                      this.IsInvalid = o3;
                    }
                  )
                  .ToDateTimeString(
                    this.IsDST,
                    this.IsAmbiguous,
                    sDateTimeFormat
                  );
              } else {
                oAdminHistListDet.To = String.Empty;
              }
            } else if (objAdHistory.ColumnCode == 'INFUSIONPERIOD') {
              let oInfPeriodUOM = objAdminHistoryDet
                .Where((x) => x.ColumnCode == 'INFUSIONPERIODUOM')
                .FirstOrDefault();
              if (oInfPeriodUOM == null) {
                oInfPeriodUOM = new AdminHistoryDetails();
              }
              oAdminHistListDet.From =
                (String.IsNullOrEmpty(objAdHistory.FromValue)
                  ? String.Empty
                  : objAdHistory.FromValue) +
                ' ' +
                (String.IsNullOrEmpty(oInfPeriodUOM.FromValue)
                  ? String.Empty
                  : oInfPeriodUOM.FromValue);
              oAdminHistListDet.To =
                (String.IsNullOrEmpty(objAdHistory.ToValue)
                  ? String.Empty
                  : objAdHistory.ToValue) +
                ' ' +
                (String.IsNullOrEmpty(oInfPeriodUOM.ToValue)
                  ? String.Empty
                  : oInfPeriodUOM.ToValue);
            } else if (objAdHistory.ColumnCode == 'ConcentrationStrength') {
              let oConStrengthUOM = objAdminHistoryDet
                .Where((x) => x.ColumnCode == 'ConcentrationStrengthUOM')
                .FirstOrDefault();
              let oConVol = objAdminHistoryDet
                .Where((x) => x.ColumnCode == 'ConcentrationVolume')
                .FirstOrDefault();
              let oConVolUOM = objAdminHistoryDet
                .Where((x) => x.ColumnCode == 'ConcentrationVolumeUOM')
                .FirstOrDefault();
              if (oConStrengthUOM == null)
                oConStrengthUOM = new AdminHistoryDetails();
              if (oConVol == null) oConVol = new AdminHistoryDetails();
              if (oConVolUOM == null) oConVolUOM = new AdminHistoryDetails();
              oAdminHistListDet.From =
                (String.IsNullOrEmpty(objAdHistory.FromValue)
                  ? String.Empty
                  : objAdHistory.FromValue) +
                ' ' +
                (String.IsNullOrEmpty(oConStrengthUOM.FromValue)
                  ? String.Empty
                  : oConStrengthUOM.FromValue) +
                '/' +
                (String.IsNullOrEmpty(oConVol.FromValue)
                  ? String.Empty
                  : oConVol.FromValue) +
                ' ' +
                (String.IsNullOrEmpty(oConVolUOM.FromValue)
                  ? String.Empty
                  : oConVolUOM.FromValue);
              oAdminHistListDet.To =
                (String.IsNullOrEmpty(objAdHistory.ToValue)
                  ? String.Empty
                  : objAdHistory.ToValue) +
                ' ' +
                (String.IsNullOrEmpty(oConStrengthUOM.ToValue)
                  ? String.Empty
                  : oConStrengthUOM.ToValue) +
                '/' +
                (String.IsNullOrEmpty(oConVol.ToValue)
                  ? String.Empty
                  : oConVol.ToValue) +
                ' ' +
                (String.IsNullOrEmpty(oConVolUOM.ToValue)
                  ? String.Empty
                  : oConVolUOM.ToValue);
            } else if (
              objAdHistory.ColumnCode != 'INFUSIONPERIODUOM' &&
              objAdHistory.ColumnCode != 'ConcentrationStrengthUOM' &&
              objAdHistory.ColumnCode != 'ConcentrationVolume' &&
              objAdHistory.ColumnCode != 'ConcentrationVolumeUOM'
            ) {
              oAdminHistListDet.From = CommonBB.GetText(
                objAdHistory.FromValue,
                this.MedicationAdministrationSlotStatus
              );
              let sToText: string = CommonBB.GetText(
                objAdHistory.ToValue,
                this.MedicationAdministrationSlotStatus
              );
              if (
                String.Compare(
                  this.sActionCode,
                  'Strikethrough',
                  StringComparison.CurrentCultureIgnoreCase
                ) == 0 &&
                String.Compare(
                  this.sSlotStatus,
                  'Planned',
                  StringComparison.CurrentCultureIgnoreCase
                ) == 0
              ) {
                oAdminHistListDet.To = String.Empty;
              } else {
                oAdminHistListDet.To = sToText;
              }
            }
            if (
              (!String.IsNullOrEmpty(oAdminHistListDet.To) &&
                oAdminHistListDet.To != '0') ||
              (!String.IsNullOrEmpty(oAdminHistListDet.From) &&
                oAdminHistListDet.From != '0')
            ) {
              lstTemp.Add(oAdminHistListDet);
            }
          });
          this.AdminHistListDet = lstTemp;
        } else {
          this.AdminHistListDet = null;
        }
      } catch (ex: any) {
        let lnReturn: number = AMSHelper.PublicExceptionDetails(
          _ErrorID,
          _ErrorSource,
          ex
        );
      }
    } else {
      let lnReturn: number = AMSHelper.PublicExceptionDetails(
        _ErrorID,
        _ErrorSource,
        e.Error
      );
    }
    this.medadminslotdetailservicedata.emit(true);
  }
  private GetActionName(sActionName: string): string {
    let sFormatActionName: string = String.Empty;
    switch (sActionName.ToUpper()) {
      case 'ROUTEOID':
        sFormatActionName = 'Route';
        break;
      case 'STATSCODE':
        sFormatActionName = 'Medication action';
        break;
      case 'ISNOWITNESSAVAILABLE':
        sFormatActionName = 'No witness available';
        break;
      case 'ADMINISTEREDBYCPOID':
        sFormatActionName = 'Administered by';
        break;
      case 'BATCHNUMBER':
        sFormatActionName = 'Batch no';
        break;
      case 'EXPIRYDTTM':
        sFormatActionName = 'Expiry';
        break;
      case 'DOSE':
        sFormatActionName = 'Dose';
        break;
      case 'WITNESSEDBYCPOID':
        sFormatActionName = 'Witnessed by ';
        break;
      case 'ADMINISTEREDDTTM':
        sFormatActionName = 'Date/Time given';
        break;
      case 'BODYSITEOID':
        sFormatActionName = 'Site';
        break;
      case 'DOSEDISCRESNCODE':
        sFormatActionName = 'Reason for dose discrepancy';
        break;
      case 'COMMENTS':
        sFormatActionName = 'comments';
        break;
      case 'REASONNTGVN':
        sFormatActionName = 'Reason not given';
        break;
      case 'MEDRSNFRMOD':
        sFormatActionName = 'Amend reason';
        break;
      case 'INFUSIONPERIOD':
        sFormatActionName = 'Infusion Period';
        break;
      case 'CONCENTRATIONSTRENGTH':
        sFormatActionName = 'Concentration';
        break;
      case 'RelatedPerson':
        sFormatActionName = 'Relationship';
        break;
      default:
        sFormatActionName = sActionName;
        break;
    }
    return sFormatActionName;
  }
  private _IsStruckout: string;
  public get IsStruckout(): string {
    return this._IsStruckout;
  }
  public set IsStruckout(value: string) {
    this._IsStruckout = value;
    //NotifyPropertyChanged("IsStruckout");
  }
  private _IsMedScannedProduct: string;
  public get IsMedScannedProduct(): string {
    return this._IsMedScannedProduct;
  }
  public set IsMedScannedProduct(value: string) {
    this._IsMedScannedProduct = value;
    //NotifyPropertyChanged("IsMedScannedProduct");
  }
  private _IsViewRecMedLinkExists: Visibility = Visibility.Collapsed;
  public get IsViewRecMedLinkExists(): Visibility {
    return this._IsViewRecMedLinkExists;
  }
  public set IsViewRecMedLinkExists(value: Visibility) {
    this._IsViewRecMedLinkExists = value;
    //NotifyPropertyChanged("IsViewRecMedLinkExists");
  }
}
export class AdminHistoryListDetails extends ViewModelBase {
  private gj: string;
  private gk: string;
  private gl: string;
  public get Modified(): string {
    return this.gj;
  }
  public set Modified(value: string) {
    this.gj = value;
    //NotifyPropertyChanged("Modified");
  }
  public get From(): string {
    return this.gk;
  }
  public set From(value: string) {
    this.gk = value;
    //NotifyPropertyChanged("From");
  }
  public get To(): string {
    return this.gl;
  }
  public set To(value: string) {
    this.gl = value;
    //NotifyPropertyChanged("To");
  }
}
export class SupDispInst extends ViewModelBase {
  private _Componentname: string;
  public get Componentname(): string {
    return this._Componentname;
  }
  public set Componentname(value: string) {
    this._Componentname = value;
    //NotifyPropertyChanged("Componentname");
  }
  private _PresItemChildOID: number = 0;
  public get PresItemChildOID(): number {
    return this._PresItemChildOID;
  }
  public set PresItemChildOID(value: number) {
    this._PresItemChildOID = value;
    //NotifyPropertyChanged("PresItemChildOID");
  }
  private _DispensingInstruction: string;
  public get DispensingInstruction(): string {
    return this._DispensingInstruction;
  }
  public set DispensingInstruction(value: string) {
    this._DispensingInstruction = value;
    //NotifyPropertyChanged("DispensingInstruction");
  }
  private _SupplyInstruction: string;
  public get SupplyInstruction(): string {
    return this._SupplyInstruction;
  }
  public set SupplyInstruction(value: string) {
    this._SupplyInstruction = value;
    //NotifyPropertyChanged("SupplyInstruction");
  }
  private _OtherDispInstruction: string;
  public get OtherDispInstruction(): string {
    return this._OtherDispInstruction;
  }
  public set OtherDispInstruction(value: string) {
    this.OtherDispInstruction = value;
    //NotifyPropertyChanged("OtherDispInstruction");
  }
}
export class SupplyDetails extends ViewModelBase {
  ChildGridExtension = new GridExtension();
  SelectedChildGridIndex: number[] = [];
  public UniqueIdentifier: number = Math.floor(Math.random()*90000) + 10000;
  private DrugnameField: string;
  public get Drugname(): string {
    return this.DrugnameField;
  }
  public set Drugname(value: string) {
    this.DrugnameField = value;
    //NotifyPropertyChanged("Drugname");
  }
  private PrescriptionItemOIDField: number = 0;
  public get PrescriptionItemOID(): number {
    return this.PrescriptionItemOIDField;
  }
  public set PrescriptionItemOID(value: number) {
    this.PrescriptionItemOIDField = value;
    //NotifyPropertyChanged("PrescriptionItemOID");
  }
  private MedSupplyDetailOIDField: number = 0;
  public get MedSupplyDetailOID(): number {
    return this.MedSupplyDetailOIDField;
  }
  public set MedSupplyDetailOID(value: number) {
    this.MedSupplyDetailOIDField = value;
    //NotifyPropertyChanged("MedSupplyDetailOID");
  }
  private IsdosecombinationsdefinedField: string;
  public get IsDoseCombinationsDefined(): string {
    return this.IsdosecombinationsdefinedField;
  }
  public set IsDoseCombinationsDefined(value: string) {
    this.IsdosecombinationsdefinedField = value;
    //NotifyPropertyChanged("IsDoseCombinationsDefined");
  }
  private ServiceNameField: string;
  public get ServiceName(): string {
    return this.ServiceNameField;
  }
  public set ServiceName(value: string) {
    this.ServiceNameField = value;
    //NotifyPropertyChanged("ServiceName");
  }
  private LocationField: string;
  public get LocationName(): string {
    return this.LocationField;
  }
  public set LocationName(value: string) {
    this.LocationField = value;
    //NotifyPropertyChanged("LocationName");
  }
  private NextSupplyDttmField: string;
  public get NextSupplyDttm(): string {
    return this.NextSupplyDttmField;
  }
  public set NextSupplyDttm(value: string) {
    this.NextSupplyDttmField = value;
    //NotifyPropertyChanged("NextSupplyDttm");
  }
  private PrescriptiontypeField: string;
  public get Prescriptiontype(): string {
    return this.PrescriptiontypeField;
  }
  public set Prescriptiontype(value: string) {
    this.PrescriptiontypeField = value;
    //NotifyPropertyChanged("Prescriptiontype");
  }
  private PresItemstatusCodeField: string;
  public get PresItemstatusCode(): string {
    return this.PresItemstatusCodeField;
  }
  public set PresItemstatusCode(value: string) {
    this.PresItemstatusCodeField = value;
    //NotifyPropertyChanged("PresItemstatusCode");
  }
  private SupplieddByField: string;
  public get SupplieddBy(): string {
    return this.SupplieddByField;
  }
  public set SupplieddBy(value: string) {
    this.SupplieddByField = value;
    //NotifyPropertyChanged("SupplieddBy");
  }
  private dispensingdetailField: List<IPPManagePrescSer.PresItemIPPRequestDetails> = new List<IPPManagePrescSer.PresItemIPPRequestDetails>();
  public get DispensingDetail(): List<IPPManagePrescSer.PresItemIPPRequestDetails> {
    return this.dispensingdetailField;
  }
  public set DispensingDetail(
    value: List<IPPManagePrescSer.PresItemIPPRequestDetails>
  ) {
    this.dispensingdetailField = value;
    //NotifyPropertyChanged("DispensingDetail");
  }
  private dtSuppliedDTTM: string;
  public get SuppliedDTTM(): string {
    return this.dtSuppliedDTTM;
  }
  public set SuppliedDTTM(value: string) {
    this.dtSuppliedDTTM = value;
    //NotifyPropertyChanged("SuppliedDTTM");
  }
  private SupplyCommentsField: string;
  public get SupplyComments(): string {
    return this.SupplyCommentsField;
  }
  public set SupplyComments(value: string) {
    this.SupplyCommentsField = value;
    //NotifyPropertyChanged("SupplyComments");
  }
  private SupplyinstructionField: string;
  public get Supplyinstruction(): string {
    return this.SupplyinstructionField;
  }
  public set Supplyinstruction(value: string) {
    this.SupplyinstructionField = value;
    //NotifyPropertyChanged("Supplyinstruction");
  }
  private SupplystatusCodeField: string;
  public get SupplystatusCode(): string {
    return this.SupplystatusCodeField;
  }
  public set SupplystatusCode(value: string) {
     // this.SupplystatusCodeField = value;
      if (value == 'CC_SUPPLY') {
          this.SupplystatusCodeField = 'Supply';
      }
      else if (value == 'CC_MEDDONTSUPPLY') {
          this.SupplystatusCodeField = 'Do not supply';
      }
      else {
          this.SupplystatusCodeField = value;
      }
    //NotifyPropertyChanged("SupplystatusCode");
  }
  private ItemSubTypeField: string;
  public get ItemSubType(): string {
    return this.ItemSubTypeField;
  }
  public set ItemSubType(value: string) {
    this.ItemSubTypeField = value;
  }
  private MCVersionField: string;
  public get MCVersion(): string {
    return this.MCVersionField;
  }
  public set MCVersion(value: string) {
    this.MCVersionField = value;
  }
  private PrescriptionMultiComponentOIDField: number = 0;
  public get PrescriptionMultiComponentOID(): number {
    return this.PrescriptionMultiComponentOIDField;
  }
  public set PrescriptionMultiComponentOID(value: number) {
    this.PrescriptionMultiComponentOIDField = value;
  }
  private FluidPrescribableItemListOIDField: number = 0;
  public get FluidPrescribableItemListOID(): number {
    return this.FluidPrescribableItemListOIDField;
  }
  public set FluidPrescribableItemListOID(value: number) {
    this.FluidPrescribableItemListOIDField = value;
  }
  private oSupplyHistoryMCIChild: ObservableCollection<SupplyDetailsMCIChild>;
  public get SupplyHistoryMCIChild(): ObservableCollection<SupplyDetailsMCIChild> {
    return this.oSupplyHistoryMCIChild;
  }
  public set SupplyHistoryMCIChild(
    value: ObservableCollection<SupplyDetailsMCIChild>
  ) {
    if (this.oSupplyHistoryMCIChild != value) {
      this.oSupplyHistoryMCIChild = value;
      //super.NotifyPropertyChanged("SupplyHistoryMCIChild");
    }
  }
  private SortingDTTMField: DateTime = DateTime.MinValue;
  public get SortingDTTM(): DateTime {
    return this.SortingDTTMField;
  }
  public set SortingDTTM(value: DateTime) {
    this.SortingDTTMField = value;
  }
}
export class SupplyDetailsMCIChild extends ViewModelBase {
  private DrugnameField: string;
  public get Drugname(): string {
    return this.DrugnameField;
  }
  public set Drugname(value: string) {
    this.DrugnameField = value;
    //NotifyPropertyChanged("Drugname");
  }
  private PrescriptionItemOIDField: number = 0;
  public get PrescriptionItemOID(): number {
    return this.PrescriptionItemOIDField;
  }
  public set PrescriptionItemOID(value: number) {
    this.PrescriptionItemOIDField = value;
  }
  private MedSupplyDetailOIDField: number = 0;
  public get MedSupplyDetailOID(): number {
    return this.MedSupplyDetailOIDField;
  }
  public set MedSupplyDetailOID(value: number) {
    this.MedSupplyDetailOIDField = value;
  }
  private IsdosecombinationsdefinedField: string;
  public get IsDoseCombinationsDefined(): string {
    return this.IsdosecombinationsdefinedField;
  }
  public set IsDoseCombinationsDefined(value: string) {
    this.IsdosecombinationsdefinedField = value;
  }
  private ServiceNameField: string;
  public get ServiceName(): string {
    return this.ServiceNameField;
  }
  public set ServiceName(value: string) {
    this.ServiceNameField = value;
  }
  private LocationField: string;
  public get LocationName(): string {
    return this.LocationField;
  }
  public set LocationName(value: string) {
    this.LocationField = value;
    //NotifyPropertyChanged("LocationName");
  }
  private NextSupplyDttmField: string;
  public get NextSupplyDttm(): string {
    return this.NextSupplyDttmField;
  }
  public set NextSupplyDttm(value: string) {
    this.NextSupplyDttmField = value;
    //NotifyPropertyChanged("NextSupplyDttm");
  }
  private PrescriptiontypeField: string;
  public get Prescriptiontype(): string {
    return this.PrescriptiontypeField;
  }
  public set Prescriptiontype(value: string) {
    this.PrescriptiontypeField = value;
    //NotifyPropertyChanged("Prescriptiontype");
  }
  private PresItemstatusCodeField: string;
  public get PresItemstatusCode(): string {
    return this.PresItemstatusCodeField;
  }
  public set PresItemstatusCode(value: string) {
    this.PresItemstatusCodeField = value;
  }
  private SupplieddByField: string;
  public get SupplieddBy(): string {
    return this.SupplieddByField;
  }
  public set SupplieddBy(value: string) {
    this.SupplieddByField = value;
    //NotifyPropertyChanged("SupplieddBy");
  }
  private dtSuppliedDTTM: string;
  public get SuppliedDTTM(): string {
    return this.dtSuppliedDTTM;
  }
  public set SuppliedDTTM(value: string) {
    this.dtSuppliedDTTM = value;
    //NotifyPropertyChanged("SuppliedDTTM");
  }
  private SupplyCommentsField: string;
  public get SupplyComments(): string {
    return this.SupplyCommentsField;
  }
  public set SupplyComments(value: string) {
    this.SupplyCommentsField = value;
  }
  private SupplyinstructionField: string;
  public get Supplyinstruction(): string {
    return this.SupplyinstructionField;
  }
  public set Supplyinstruction(value: string) {
    this.SupplyinstructionField = value;
    //NotifyPropertyChanged("Supplyinstruction");
  }
  private SupplystatusCodeField: string;
  public get SupplystatusCode(): string {
    return this.SupplystatusCodeField;
  }
  public set SupplystatusCode(value: string) {
    this.SupplystatusCodeField = value;
    //NotifyPropertyChanged("SupplystatusCode");
  }
  private ItemSubTypeField: string;
  public get ItemSubType(): string {
    return this.ItemSubTypeField;
  }
  public set ItemSubType(value: string) {
    this.ItemSubTypeField = value;
  }
  private MCVersionField: string;
  public get MCVersion(): string {
    return this.MCVersionField;
  }
  public set MCVersion(value: string) {
    this.MCVersionField = value;
  }
  private PrescriptionMultiComponentOIDField: number = 0;
  public get PrescriptionMultiComponentOID(): number {
    return this.PrescriptionMultiComponentOIDField;
  }
  public set PrescriptionMultiComponentOID(value: number) {
    this.PrescriptionMultiComponentOIDField = value;
  }
  private FluidPrescribableItemListOIDField: number = 0;
  public get FluidPrescribableItemListOID(): number {
    return this.FluidPrescribableItemListOIDField;
  }
  public set FluidPrescribableItemListOID(value: number) {
    this.FluidPrescribableItemListOIDField = value;
  }
  private dispensingdetailField: List<IPPManagePrescSer.PresItemIPPRequestDetails>;
  public get DispensingDetail(): List<IPPManagePrescSer.PresItemIPPRequestDetails> {
    return this.dispensingdetailField;
  }
  public set DispensingDetail(
    value: List<IPPManagePrescSer.PresItemIPPRequestDetails>
  ) {
    this.dispensingdetailField = value;
    //NotifyPropertyChanged("DispensingDetail");
  }
  private SortingDTTMField: DateTime = DateTime.MinValue;
  public get SortingDTTM(): DateTime {
    return this.SortingDTTMField;
  }
  public set SortingDTTM(value: DateTime) {
    this.SortingDTTMField = value;
  }
}
export class ReviewHistoryDetails extends ViewModelBase {
  private _reviewDue: DateTime = DateTime.MinValue;
  public get ReviewDue(): DateTime {
    return this._reviewDue;
  }
  public set ReviewDue(value: DateTime) {
    this._reviewDue = value;
    //NotifyPropertyChanged("ReviewDue");
  }
  private _reviewPeriodUOM: string;
  public get ReviewPeriodUOM(): string {
    return this._reviewPeriodUOM;
  }
  public set ReviewPeriodUOM(value: string) {
    this._reviewPeriodUOM = value;
    //NotifyPropertyChanged("ReviewPeriodUOM");
  }
  private _reviewReqComments: string;
  public get ReviewRequestComments(): string {
    return this._reviewReqComments;
  }
  public set ReviewRequestComments(value: string) {
    this._reviewReqComments = value;
    //NotifyPropertyChanged("ReviewRequestComments");
  }
  private _reviewedOn: DateTime = DateTime.MinValue;
  public get ReviewedOn(): DateTime {
    return this._reviewedOn;
  }
  public set ReviewedOn(value: DateTime) {
    this._reviewedOn = value;
    //NotifyPropertyChanged("ReviewedOn");
  }
  private _reviewedBy: string;
  public get ReviewedBy(): string {
    return this._reviewedBy;
  }
  public set ReviewedBy(value: string) {
    this._reviewedBy = value;
    //NotifyPropertyChanged("ReviewedBy");
  }
  private _reviewType: string;
  public get ReviewType(): string {
    return this._reviewType;
  }
  public set ReviewType(value: string) {
    this._reviewType = value;
    //NotifyPropertyChanged("ReviewType");
  }
  private _reviewOutcome: string;
  public get ReviewOutcome(): string {
    return this._reviewOutcome;
  }
  public set ReviewOutcome(value: string) {
    this._reviewOutcome = value;
    //NotifyPropertyChanged("ReviewOutcome");
  }
  private _reviewOutcomeComments: string;
  public get ReviewOutcomecomments(): string {
    return this._reviewOutcomeComments;
  }
  public set ReviewOutcomecomments(value: string) {
    this._reviewOutcomeComments = value;
    //NotifyPropertyChanged("ReviewOutcomecomments");
  }
  private _reviewReqBy: string;
  public get ReviewRequestedBy(): string {
    return this._reviewReqBy;
  }
  public set ReviewRequestedBy(value: string) {
    this._reviewReqBy = value;
    //NotifyPropertyChanged("ReviewRequestedBy");
  }
  private _reviewReqOn: DateTime = DateTime.MinValue;
  public get ReviewRequestedOn(): DateTime {
    return this._reviewReqOn;
  }
  public set ReviewRequestedOn(value: DateTime) {
    this._reviewReqOn = value;
    //NotifyPropertyChanged("ReviewRequestedOn");
  }
  private _reviewPeriod: string;
  public get ReviewPeriod(): string {
    return this._reviewPeriod;
  }
  public set ReviewPeriod(value: string) {
    this._reviewPeriod = value;
    //NotifyPropertyChanged("ReviewPeriod");
  }
}
export class MultipleDoseDetail extends ViewModelBase {
  public IsDST: boolean = false;
  public IsAmbiguous: boolean = false;
  public IsInvalid: boolean = false;
  public sPresType: string = String.Empty;
  //public delegate void SteppedDoseDelegate();
  public SteppedDoseCompleted: Function;
  public oAdminTimesVM: AdminstrativeTimesVM;
  public sceduledTimelst: List<string>;
  private sTitleSteppedDose: string = String.Empty;
  public PresItemDoseInfoServicedata:EventEmitter<any>= new EventEmitter<any>();
  public get PrescribedDoseTitle(): string {
    return this.sTitleSteppedDose;
  }
  public set PrescribedDoseTitle(value: string) {
    this.sTitleSteppedDose = value;
    //NotifyPropertyChanged("PrescribedDoseTitle");
  }
  private dtPrescribedViewStartDate: DateTime = DateTime.MinValue;
  public get PrescribedViewStartDate(): DateTime {
    return this.dtPrescribedViewStartDate;
  }
  public set PrescribedViewStartDate(value: DateTime) {
    this.dtPrescribedViewStartDate = value;
    //NotifyPropertyChanged("PrescribedViewStartDate");
  }
  private dtPrescribedViewEndDate: DateTime = DateTime.MinValue;
  public get PrescribedViewEndDate(): DateTime {
    return this.dtPrescribedViewEndDate;
  }
  public set PrescribedViewEndDate(value: DateTime) {
    this.dtPrescribedViewEndDate = value;
    //NotifyPropertyChanged("PrescribedViewEndDate");
  }
  private sScheduleGridTitile: string = String.Empty;
  public get ScheduleGridTitile(): string {
    return this.sScheduleGridTitile;
  }
  public set ScheduleGridTitile(value: string) {
    this.sScheduleGridTitile = value;
    //NotifyPropertyChanged("ScheduleGridTitile");
  }
  private bIsSchduleNotExist: Visibility;
  public get IsSchduleNotExist(): Visibility {
    return this.bIsSchduleNotExist;
  }
  public set IsSchduleNotExist(value: Visibility) {
    this.bIsSchduleNotExist = value;
    //NotifyPropertyChanged("IsSchduleNotExist");
  }
  private sScheduleNotExistMessage: string;
  public get ScheduleNotExistMessage(): string {
    return this.sScheduleNotExistMessage;
  }
  public set ScheduleNotExistMessage(value: string) {
    this.sScheduleNotExistMessage = value;
    //NotifyPropertyChanged("ScheduleNotExistMessage");
  }
  private sPrescribedWarningMessage: string;
  public get PrescribedWarningMessage(): string {
    return this.sPrescribedWarningMessage;
  }
  public set PrescribedWarningMessage(value: string) {
    this.sPrescribedWarningMessage = value;
    //NotifyPropertyChanged("PrescribedWarningMessage");
  }
  private sFullPrescriptionLaunchMode: string;
  public get FullPrescriptionLaunchMode(): string {
    return this.sFullPrescriptionLaunchMode;
  }
  public set FullPrescriptionLaunchMode(value: string) {
    this.sFullPrescriptionLaunchMode = value;
  }
  private bShowPresWarningMessage: boolean = false;
  public get ShowPrescribedWarningMessage(): boolean {
    return this.bShowPresWarningMessage;
  }
  public set ShowPrescribedWarningMessage(value: boolean) {
    this.bShowPresWarningMessage = value;
    //NotifyPropertyChanged("ShowPrescribedWarningMessage");
  }
  private _IsSVHavingDrugRoundTimes: boolean = false;
  public get IsSVHavingDrugRoundTimes(): boolean {
    return this._IsSVHavingDrugRoundTimes;
  }
  public set IsSVHavingDrugRoundTimes(value: boolean) {
    this._IsSVHavingDrugRoundTimes = value;
    //NotifyPropertyChanged("IsSVHavingDrugRoundTimes");
  }
  //public delegate void SteppedInfCont(bool isInfContFlag, bool IsNonInfusion);
  public oSteppedInfContCompleted: Function;
  private sysDoseDetail: boolean = false;
  public get SysDoseDetail(): boolean {
    return this.sysDoseDetail;
  }
  public set SysDoseDetail(value: boolean) {
    this.sysDoseDetail = value;
    //NotifyPropertyChanged("SysDoseDetail");
  }
  //public delegate void TitratedDoseDelegate();
  public TitratedDoseCompleted: Function;
  constructor();
  constructor(PrescriptionItemOID?: Object | number);
  constructor(
    PrescriptionItemOID?: Object | number,
    sMcVersion?: string,
    sDoseType?: string,
    IsEPR?: string,
    sPresriptionType?: string
  );
  constructor(
    PrescriptionItemOID?: Object | number,
    sMcVersion?: string,
    sDoseType?: string,
    IsEPR?: string,
    sPresriptionType?: string
  ) {
    super();
    let oVM: Object = null;
    if (PrescriptionItemOID && PrescriptionItemOID instanceof Object) {
      oVM = PrescriptionItemOID;
    }
    switch (arguments.length) {
      case 1:
        let oLineItemVM: PrescriptionLineItemVM =
          ObjectHelper.CreateType<PrescriptionLineItemVM>(
            oVM,
            PrescriptionLineItemVM
          );
        if (
          String.Compare(
            oLineItemVM.FormViewerDetails.BasicDetails.DoseType.Value,
            DoseTypeCode.TITRATED,
            StringComparison.OrdinalIgnoreCase
          ) == 0
        )
          this.FillDataContextTitratedDose(oLineItemVM.oDoseRegime, 'N');
        else if (
          String.Compare(
            oLineItemVM.FormViewerDetails.BasicDetails.DoseType.Value,
            DoseTypeCode.STEPPEDVARIABLE,
            StringComparison.OrdinalIgnoreCase
          ) == 0
        ) {
          let InfType: string = String.Empty;
          if (
            oLineItemVM.FormViewerDetails.BasicDetails != null &&
            oLineItemVM.FormViewerDetails.BasicDetails.InfusionDetails !=
            null &&
            oLineItemVM.FormViewerDetails.BasicDetails.InfusionDetails
              .InfusionType != null &&
            !String.IsNullOrEmpty(
              oLineItemVM.FormViewerDetails.BasicDetails.InfusionDetails
                .InfusionType.Value
            )
          ) {
            InfType =
              oLineItemVM.FormViewerDetails.BasicDetails.InfusionDetails
                .InfusionType.Value;
            this.InfusionType =
              oLineItemVM.FormViewerDetails.BasicDetails.InfusionDetails.InfusionType.Value;
          }
          if (
            !String.IsNullOrEmpty(InfType) &&
            (String.Equals(InfType, InfusionTypeCode.CONTINUOUS) ||
              String.Equals(InfType, InfusionTypeCode.SINGLEDOSEVOLUME) ||
              String.Equals(InfType, InfusionTypeCode.FLUID))
          ) {
            if (this.oSteppedInfContCompleted != null)
              this.oSteppedInfContCompleted(true, false);
          } else if (String.IsNullOrEmpty(InfType)) {
            if (this.oSteppedInfContCompleted != null)
              this.oSteppedInfContCompleted(false, true);
          }
          if (
            oLineItemVM.FormViewerDetails.BasicDetails.EndDTTM !=
            DateTime.MinValue &&
            oLineItemVM.oDoseRegime != null &&
            oLineItemVM.oDoseRegime.Count > 0 &&
            oLineItemVM.oDoseRegime.LastOrDefault().EndDTTM == DateTime.MinValue
          ) {
            oLineItemVM.oDoseRegime.LastOrDefault().EndDTTM =
              oLineItemVM.FormViewerDetails.BasicDetails.EndDTTM;
          }
          this.FillDataContextPresItemDose(
            oLineItemVM.oDoseRegime,
            'N',
            InfType
          );
        }
        break;
      case 5:
        this.sPresType = sPresriptionType;
        if (
          String.Compare(
            sDoseType,
            DoseTypeCode.TITRATED,
            StringComparison.OrdinalIgnoreCase
          ) == 0
        )
          this.GetTitratedDoseInfo(<number>PrescriptionItemOID, sMcVersion);
        else if (IsEPR == 'EPR') {
          this.GetSteppedDoseInfo(<number>PrescriptionItemOID, sMcVersion);
        } else {
          this.GetSteppedDoseInfoSys(<number>PrescriptionItemOID, sMcVersion);
        }
        break;
    }
  }
  private _lowerDose: number = 0;
  private _upperDose: number = 0;
  private _doseUOM: CListItem;
  private _durationUOM: CListItem;
  private _durationValue: number = 0;
  private _frequency: CListItem;
  private _isPRN: boolean = false;
  private _doseInstructions: string;
  private _startDTTM: DateTime = DateTime.MinValue;
  private _endDTTM: DateTime = DateTime.MinValue;
  private _doseValueDisplay: string;
  private _durationValueDisplay: string;
  private _slotTimeMode: string;
  private _adminTimes: string;
  private _adminTimesData: ObservableCollection<GrdAdminstrativeTimesCols>;
  private _daysofweek: string[];
  private _hyperlinkText: string;
  private _isHyperLink: boolean = false;
  private _scheduleDetailsData: ObservableCollection<ScheduleDetailsCols>;
  private _totalCols: number = 0;
  private _isDaywiseView: boolean = false;
  private _changingdoseEnabled: boolean = false;
  private _infusionrate: string;
  private _infusionUpperrate: string;
  private _infratenumeratoruom: CListItem;
  private _infrateDenominatoruom: CListItem;
  private _InfusionType: string;
  private _freqUOMCode: string;
  public get FreqUOMCode(): string {
    return this._freqUOMCode;
  }
  public set FreqUOMCode(value: string) {
    this._freqUOMCode = value;
  }
  public get InfusionType(): string {
    return this._InfusionType;
  }
  public set InfusionType(value: string) {
    this._InfusionType = value;
  }
  private _PresType: string;
  public get PresType(): string {
    return this._PresType;
  }
  public set PresType(value: string) {
    this._PresType = value;
  }
  public get IsDaywiseView(): boolean {
    return this._isDaywiseView;
  }
  public set IsDaywiseView(value: boolean) {
    this._isDaywiseView = value;
    //NotifyPropertyChanged("IsDaywiseView");
  }
  public get DoseValueDisplay(): string {
    return this._doseValueDisplay;
  }
  public set DoseValueDisplay(value: string) {
    this._doseValueDisplay = value;
    //NotifyPropertyChanged("DoseValueDisplay");
  }
  public get DurationValueDisplay(): string {
    return this._durationValueDisplay;
  }
  public set DurationValueDisplay(value: string) {
    this._durationValueDisplay = value;
    //NotifyPropertyChanged("DurationValueDisplay");
  }
  public get LowerDose(): number {
    return this._lowerDose;
  }
  public set LowerDose(value: number) {
    if (!ObjectHelper.ReferenceEquals(this._lowerDose, value)) {
      this._lowerDose = value;
      //NotifyPropertyChanged("LowerDose");
      this.SetDoseValueDisplay();
    }
  }
  private SetDoseValueDisplay(): void {
    let strBuild: StringBuilder = new StringBuilder();
    strBuild.Append(this.LowerDose);
    if (this.UpperDose > 0) {
      strBuild.Append(Convert.ToChar(160));
      strBuild.Append('-');
      strBuild.Append(Convert.ToChar(160));
      strBuild.Append(this.UpperDose);
    }
    this.DoseValueDisplay = strBuild.ToString();
  }
  public get UpperDose(): number {
    return this._upperDose;
  }
  public set UpperDose(value: number) {
    if (!ObjectHelper.ReferenceEquals(this._upperDose, value)) {
      this._upperDose = value;
      //NotifyPropertyChanged("UpperDose");
      this.SetDoseValueDisplay();
    }
  }
  public get DoseUOM(): CListItem {
    return this._doseUOM;
  }
  public set DoseUOM(value: CListItem) {
    if (ObjectHelper.ReferenceEquals(this._doseUOM, value) != true) {
      this._doseUOM = value;
      //super.NotifyPropertyChanged("DoseUOM");
      this.SetDoseValueDisplay();
    }
  }
  public get Duration(): number {
    return this._durationValue;
  }
  public set Duration(value: number) {
    if (!ObjectHelper.ReferenceEquals(this._durationValue, value)) {
      this._durationValue = value;
      //NotifyPropertyChanged("Duration");
      this.SetDurationValueDisplay();
    }
  }
  private SetDurationValueDisplay(): void {
    let strBuild: StringBuilder = new StringBuilder();
    if (this.Duration > 0) {
      strBuild.Append(this.Duration);
    }
    if (
      this.DurationUOM != null &&
      !String.IsNullOrEmpty(this.DurationUOM.DisplayText)
    ) {
      strBuild.Append(Convert.ToChar(160));
      strBuild.Append(this.DurationUOM.DisplayText);
    }
    this.DurationValueDisplay = strBuild.ToString();
  }
  public get DurationUOM(): CListItem {
    return this._durationUOM;
  }
  public set DurationUOM(value: CListItem) {
    if (value != this._durationUOM) {
      this._durationUOM = value;
      //super.NotifyPropertyChanged("DurationUOM");
      this.SetDurationValueDisplay();
    }
  }
  public get Frequency(): CListItem {
    return this._frequency;
  }
  public set Frequency(value: CListItem) {
    this._frequency = value;
    //NotifyPropertyChanged("Frequency");
  }
  private direction: string;
  public get Direction(): string {
    return this.direction;
  }
  public set Direction(value: string) {
    if (this.direction != value) {
      this.direction = value;
      //NotifyPropertyChanged("Direction");
    }
  }
  public get IsPRN(): boolean {
    return this._isPRN;
  }
  public set IsPRN(value: boolean) {
    this._isPRN = value;
    if (this._isPRN) {
      this.Direction = 'As needed';
    } else {
      this.Direction = String.Empty;
    }
    //NotifyPropertyChanged("IsPRN");
  }
  public get StartDTTM(): DateTime {
    return this._startDTTM;
  }
  public set StartDTTM(value: DateTime) {
    if (!ObjectHelper.ReferenceEquals(this._startDTTM, value)) {
      this._startDTTM = value;
      //NotifyPropertyChanged("StartDTTM");
    }
  }
  public get EndDTTM(): DateTime {
    return this._endDTTM;
  }
  public set EndDTTM(value: DateTime) {
    if (!ObjectHelper.ReferenceEquals(this._endDTTM, value)) {
      this._endDTTM = value;
      //NotifyPropertyChanged("EndDTTM");
    }
  }
  public get DoseInstructions(): string {
    return this._doseInstructions;
  }
  public set DoseInstructions(value: string) {
    if (!ObjectHelper.ReferenceEquals(this._doseInstructions, value)) {
      this._doseInstructions = value;
      //NotifyPropertyChanged("DoseInstructions");
    }
  }
  public get AdministrationTimes(): string {
    return this._adminTimes;
  }
  public set AdministrationTimes(value: string) {
    if (!ObjectHelper.ReferenceEquals(this._adminTimes, value)) {
      this._adminTimes = value;
      //NotifyPropertyChanged("AdministrationTimes");
    }
  }
  public get AdminTimesData(): ObservableCollection<GrdAdminstrativeTimesCols> {
    return this._adminTimesData;
  }
  public set AdminTimesData(
    value: ObservableCollection<GrdAdminstrativeTimesCols>
  ) {
    this._adminTimesData = value;
    //NotifyPropertyChanged("AdminTimesData");
  }
  public get ScheduleDetailsData(): ObservableCollection<ScheduleDetailsCols> {
    return this._scheduleDetailsData;
  }
  public set ScheduleDetailsData(
    value: ObservableCollection<ScheduleDetailsCols>
  ) {
    if (!ObjectHelper.ReferenceEquals(this._scheduleDetailsData, value)) {
      this._scheduleDetailsData = value;
      //NotifyPropertyChanged("ScheduleDetailsData");
    }
  }
  public get DaysOfWeek(): string[] {
    return this._daysofweek;
  }
  public set DaysOfWeek(value: string[]) {
    if (!ObjectHelper.ReferenceEquals(this._adminTimes, value)) {
      this._daysofweek = value;
      //NotifyPropertyChanged("DaysOfWeek");
    }
  }
  public get SlotTimeMode(): string {
    return this._slotTimeMode;
  }
  public set SlotTimeMode(value: string) {
    if (!ObjectHelper.ReferenceEquals(this._slotTimeMode, value)) {
      this._slotTimeMode = value;
      //NotifyPropertyChanged("SlotTimeMode");
    }
  }
  public get HyperlinkText(): string {
    return this._hyperlinkText;
  }
  public set HyperlinkText(value: string) {
    if (!ObjectHelper.ReferenceEquals(this._hyperlinkText, value)) {
      this._hyperlinkText = value;
      //NotifyPropertyChanged("HyperlinkText");
    }
  }
  public get IsHyperLink(): boolean {
    return this._isHyperLink;
  }
  public set IsHyperLink(value: boolean) {
    if (!ObjectHelper.ReferenceEquals(this._isHyperLink, value)) {
      this._isHyperLink = value;
      //NotifyPropertyChanged("IsHyperLink");
    }
  }
  public get TotalCols(): number {
    return this._totalCols;
  }
  public set TotalCols(value: number) {
    if (!ObjectHelper.ReferenceEquals(this._totalCols, value)) {
      this._totalCols = value;
      //NotifyPropertyChanged("TotalCols");
    }
  }
  private stepDoseGridColms: ObservableCollection<MultipleDoseDetail>;
  public get StepDoseGridColms(): ObservableCollection<MultipleDoseDetail> {
    return this.stepDoseGridColms;
  }
  public set StepDoseGridColms(
    value: ObservableCollection<MultipleDoseDetail>
  ) {
    if (this.stepDoseGridColms != value) {
      this.stepDoseGridColms = value;
      //super.NotifyPropertyChanged("StepDoseGridColms");
    }
  }
  public get InfusionRate(): string {
    return this._infusionrate;
  }
  public set InfusionRate(value: string) {
    if (!ObjectHelper.ReferenceEquals(this._infusionrate, value)) {
      this._infusionrate = value;
      //NotifyPropertyChanged("InfusionRate");
    }
  }
  public get InfusionUpperrate(): string {
    return this._infusionUpperrate;
  }
  public set InfusionUpperrate(value: string) {
    if (!ObjectHelper.ReferenceEquals(this._infusionUpperrate, value)) {
      this._infusionUpperrate = value;
      //NotifyPropertyChanged("InfusionUpperrate");
    }
  }
  public get InfrateDenominatoruom(): CListItem {
    return this._infrateDenominatoruom;
  }
  public set InfrateDenominatoruom(value: CListItem) {
    if (value != this._infrateDenominatoruom) {
      this._infrateDenominatoruom = value;
      //NotifyPropertyChanged("InfrateDenominatoruom");
      this.SetDoseValueDisplay();
    }
  }
  public get Infratenumeratoruom(): CListItem {
    return this._infratenumeratoruom;
  }
  public set Infratenumeratoruom(value: CListItem) {
    if (value != this._infratenumeratoruom) {
      this._infratenumeratoruom = value;
      //NotifyPropertyChanged("Infratenumeratoruom");
      this.SetDoseValueDisplay();
    }
  }
  private _freqDetails: IPPManagePrescSer.CResMsgGetAdministrationTimes;
  public get FreqDetails(): IPPManagePrescSer.CResMsgGetAdministrationTimes {
    return this._freqDetails;
  }
  public set FreqDetails(
    value: IPPManagePrescSer.CResMsgGetAdministrationTimes
  ) {
    if (this._freqDetails != value) {
      this._freqDetails = value;
    }
  }
  public GetSteppedDoseInfo(
    PrescriptionItemOID: number,
    sMcVersion: string
  ): void {
    if (PrescriptionItemOID > 0 && !String.IsNullOrEmpty(sMcVersion)) {
      let oReqPresItemDoseInfo: IPPManagePrescSer.CReqMsgGetIPPPrescriptionItemDoseInfo =
        new IPPManagePrescSer.CReqMsgGetIPPPrescriptionItemDoseInfo();
      oReqPresItemDoseInfo.PrescriptionItemOIDBC = PrescriptionItemOID;
      oReqPresItemDoseInfo.sMcVersionNoBC = sMcVersion;
      if (PatientContext.EncounterOid > 0) {
        oReqPresItemDoseInfo.lEncounterOIDBC = PatientContext.EncounterOid;
      } else if (
        MedDrugDetailsInputParam.DrugDetailsInputParams != null &&
        !String.IsNullOrEmpty(
          MedDrugDetailsInputParam.DrugDetailsInputParams.ContextEncounterOID
        )
      ) {
        let _EncOID: number = 0;
        Number.TryParse(
          MedDrugDetailsInputParam.DrugDetailsInputParams.ContextEncounterOID,
          (o) => {
            _EncOID = o;
          }
        );
        oReqPresItemDoseInfo.lEncounterOIDBC = _EncOID;
      }
      oReqPresItemDoseInfo.oContextInformation = CommonBB.FillContext();
      let oPresWS: IPPManagePrescSer.IPPMAManagePrescriptionWSSoapClient =
        new IPPManagePrescSer.IPPMAManagePrescriptionWSSoapClient();
      oPresWS.GetIPPPrescriptionItemDoseInfoCompleted = (s, e) => {
        this.oPresWS_GetIPPPrescriptionItemDoseInfoCompleted(s, e);
      };
      oPresWS.GetIPPPrescriptionItemDoseInfoAsync(oReqPresItemDoseInfo);
    }
  }
  public GetSteppedDoseInfoSys(
    PrescribableItemDetailOID: number,
    sMcVersion: string
  ): void {
    if (PrescribableItemDetailOID > 0 && !String.IsNullOrEmpty(sMcVersion)) {
      let oReqPresItemDoseInfo: IPPManagePrescSer.CReqMsgGetIPPPrescribableItemDoseInfo =
        new IPPManagePrescSer.CReqMsgGetIPPPrescribableItemDoseInfo();
      oReqPresItemDoseInfo.PrescribableItemOIDBC = PrescribableItemDetailOID;
      oReqPresItemDoseInfo.sMcVersionNoBC = sMcVersion;
      oReqPresItemDoseInfo.oContextInformation = CommonBB.FillContext();
      let oPresWS: IPPManagePrescSer.IPPMAManagePrescriptionWSSoapClient =
        new IPPManagePrescSer.IPPMAManagePrescriptionWSSoapClient();
      oPresWS.GetIPPPrescribableItemDoseInfoCompleted = (s, e) => {
        this.oPresWS_GetIPPPrescribableItemDoseInfoCompleted(s, e);
      };
      oPresWS.GetIPPPrescribableItemDoseInfoAsync(oReqPresItemDoseInfo);
    }
  }
  oPresWS_GetIPPPrescribableItemDoseInfoCompleted(
    sender: Object,
    e: IPPManagePrescSer.GetIPPPrescribableItemDoseInfoCompletedEventArgs
  ): void {
    let _ErrorID: number = 80000126;
    let _ErrorSource: string =
      'LorAppMedicationCommonBB.dll, Class:Prescriptionitemdetailsvm, Method:oPresWS_GetIPPPrescribableItemDoseInfoCompleted()';
    if (e.Error == null) {
      try {
        let oResPresItemDoseInfo: IPPManagePrescSer.CResMsgGetIPPPrescribableItemDoseInfo =
          e.Result;
        this.FillDataContextPresItemDose(oResPresItemDoseInfo);
      } catch (ex: any) {
        let lnReturn: number = AMSHelper.PublicExceptionDetails(
          _ErrorID,
          _ErrorSource,
          ex
        );
      }
    } else {
      let lnReturn: number = AMSHelper.PublicExceptionDetails(
        _ErrorID,
        _ErrorSource,
        e.Error
      );
    }
    if (this.SteppedDoseCompleted != null) this.SteppedDoseCompleted();
    this.PresItemDoseInfoServicedata.emit();
  }

  private FillDataContextPresItemDose(
    item:
      | IPPManagePrescSer.CResMsgGetIPPPrescribableItemDoseInfo
      | ObservableCollection<IPPManagePrescSer.DoseRegime>,
    OperationMode?: string,
    InfusionType?: string
  ) {
    if (
      item instanceof IPPManagePrescSer.CResMsgGetIPPPrescribableItemDoseInfo
    ) {
      this.FillDataContextPresItemDose1(item);
    } else if (
      item instanceof (ObservableCollection<IPPManagePrescSer.DoseRegime> as typeof ObservableCollection<IPPManagePrescSer.DoseRegime>)
    ) {
      this.FillDataContextPresItemDose2(item, OperationMode, InfusionType);
    }
  }
  private FillDataContextPresItemDose1(
    oResPresItemDoseInfo: IPPManagePrescSer.CResMsgGetIPPPrescribableItemDoseInfo
  ): void {
    if (
      oResPresItemDoseInfo instanceof
      IPPManagePrescSer.CResMsgGetIPPPrescribableItemDoseInfo
    ) {
      let StepDoseGridColms1: ObservableCollection<MultipleDoseDetail> =
        new ObservableCollection<MultipleDoseDetail>();
      if (
        oResPresItemDoseInfo.oDose.DoseRegime != null &&
        oResPresItemDoseInfo.oDose.DoseRegime.Count > 0
      ) {
        (
          oResPresItemDoseInfo.oDose
            .DoseRegime as ObservableCollection<IPPManagePrescSer.IPPDoseRegime>
        ).forEach((oDoseDet) => {
          let oMulDoseDet: MultipleDoseDetail = new MultipleDoseDetail();
          oMulDoseDet.LowerDose = Convert.ToDouble(oDoseDet.LowerDose);
          oMulDoseDet.UpperDose = Convert.ToDouble(oDoseDet.UpperDose);
          if (oDoseDet.DoseUOM instanceof IPPManagePrescSer.UOM) {
            oMulDoseDet.DoseUOM = ObjectHelper.CreateObject(new CListItem(), {
              DisplayText: oDoseDet.DoseUOM.UOMName,
              Value: oDoseDet.DoseUOM.UOMId.ToString(),
            });
          }
          if (oDoseDet.Duration instanceof IPPManagePrescSer.MeasurableObject) {
            oMulDoseDet.Duration = oDoseDet.Duration.Value;
            oMulDoseDet.DurationUOM = ObjectHelper.CreateObject(
              new CListItem(),
              {
                DisplayText: oDoseDet.Duration.UOMName,
                Value: oDoseDet.Duration.UOMCode,
              }
            );
          }
          if (!String.IsNullOrEmpty(oDoseDet.Rate)) {
            oMulDoseDet.InfusionRate = oDoseDet.Rate;
          }
          if (!String.IsNullOrEmpty(oDoseDet.UpperRate)) {
            oMulDoseDet.InfusionUpperrate = oDoseDet.UpperRate;
          }
          if (oDoseDet.RateUOMOID instanceof IPPManagePrescSer.UOM) {
            oMulDoseDet.Infratenumeratoruom = ObjectHelper.CreateObject(
              new CListItem(),
              {
                DisplayText: oDoseDet.RateUOMOID.UOMName,
                Value: oDoseDet.RateUOMOID.ToString(),
              }
            );
          }
          if (oDoseDet.RateDenaminatorUOMOID instanceof IPPManagePrescSer.UOM) {
            oMulDoseDet.InfrateDenominatoruom = ObjectHelper.CreateObject(
              new CListItem(),
              {
                DisplayText: oDoseDet.RateDenaminatorUOMOID.UOMName,
                Value: oDoseDet.RateDenaminatorUOMOID.ToString(),
              }
            );
          }
          if (!String.IsNullOrEmpty(oDoseDet.DurationUOMCode)) {
            if (oMulDoseDet.DurationUOM == null)
              oMulDoseDet.DurationUOM = new CListItem();
            oMulDoseDet.DurationUOM.Value = oDoseDet.DurationUOMCode;
          }
          oMulDoseDet.StartDTTM = oDoseDet.StartDTTM;
          oMulDoseDet.EndDTTM = oDoseDet.EndDTTM;
          oMulDoseDet.DoseInstructions = oDoseDet.DosingInstruction;
          if (
            oDoseDet.FrequencyDetails instanceof
            IPPManagePrescSer.FrequencyDetails &&
            oDoseDet.FrequencyDetails.Frequency instanceof
            IPPManagePrescSer.ObjectInfo
          ) {
            oMulDoseDet.Frequency = ObjectHelper.CreateObject(new CListItem(), {
              DisplayText: oDoseDet.FrequencyDetails.Frequency.Name,
              Value: oDoseDet.FrequencyDetails.Frequency.OID.ToString(),
              Tag: oDoseDet.FrequencyDetails.Frequency.Code,
            });
            let isintervalFreq: boolean = false;
            if (
              oDoseDet.FrequencyDetails.ScheduledTimes != null &&
              oDoseDet.FrequencyDetails.ScheduledTimes.Count > 0
            ) {
              if (
                oDoseDet.LowerDose == 0 &&
                oDoseDet.UpperDose == 0 &&
                oDoseDet.DoseUOM != null
              )
                oMulDoseDet.HyperlinkText = 'Changing dose';
              let oIPPDoseRegime: IPPManagePrescSer.IPPDoseRegime =
                ObjectHelper.CreateType<IPPManagePrescSer.IPPDoseRegime>(
                  oDoseDet,
                  IPPManagePrescSer.IPPDoseRegime
                );
              if (oIPPDoseRegime != null) {
                oMulDoseDet.IsDaywiseView =
                  oIPPDoseRegime.IsDaywise.Equals('1');
              }
              oMulDoseDet.ScheduleDetailsData =
                new ObservableCollection<ScheduleDetailsCols>();
              oMulDoseDet.sceduledTimelst = new List<string>();
              let strHourMinFormat: string = String.Empty;
              let IPPSchdDetails: IPPManagePrescSer.IPPScheduledetails;
              for (
                let i: number = 0;
                i < oDoseDet.FrequencyDetails.ScheduledTimes.Count;
                i++
              ) {
                IPPSchdDetails =
                  ObjectHelper.CreateType<IPPManagePrescSer.IPPScheduledetails>(
                    oDoseDet.FrequencyDetails.ScheduledTimes[i],
                    IPPManagePrescSer.IPPScheduledetails
                  );
                if (IPPSchdDetails == null) continue;
                IPPSchdDetails.ScheduleDate =
                  IPPSchdDetails.ScheduleDate.ConvertToUser(
                    (o1) => {
                      this.IsDST = o1;
                    },
                    (o2) => {
                      this.IsAmbiguous = o2;
                    },
                    (o3) => {
                      this.IsInvalid = o3;
                    }
                  );
                if (IPPSchdDetails.ScheduleDate.Year > 1753) {
                  ObjectHelper.CreateType<IPPManagePrescSer.IPPScheduledetails>(
                    oDoseDet.FrequencyDetails.ScheduledTimes[i],
                    IPPManagePrescSer.IPPScheduledetails
                  ).ScheduleDate =
                    ObjectHelper.CreateType<IPPManagePrescSer.IPPScheduledetails>(
                      oDoseDet.FrequencyDetails.ScheduledTimes[i],
                      IPPManagePrescSer.IPPScheduledetails
                    ).ScheduleDate.ConvertToUser(
                      (o1) => {
                        this.IsDST = o1;
                      },
                      (o2) => {
                        this.IsAmbiguous = o2;
                      },
                      (o3) => {
                        this.IsInvalid = o3;
                      }
                    );
                  strHourMinFormat =
                    ObjectHelper.CreateType<IPPManagePrescSer.IPPScheduledetails>(
                      oDoseDet.FrequencyDetails.ScheduledTimes[i],
                      IPPManagePrescSer.IPPScheduledetails
                    ).ScheduleDate.Hour.ToString() +
                    ':' +
                    ObjectHelper.CreateType<IPPManagePrescSer.IPPScheduledetails>(
                      oDoseDet.FrequencyDetails.ScheduledTimes[i],
                      IPPManagePrescSer.IPPScheduledetails
                    ).ScheduleDate.Minute.ToString('00');
                  if (!oMulDoseDet.sceduledTimelst.Contains(strHourMinFormat)) {
                    oMulDoseDet.sceduledTimelst.Add(strHourMinFormat);
                  }
                } else if (IPPSchdDetails.Event > 0 && IPPSchdDetails.Day > 0) {
                  oMulDoseDet.SysDoseDetail = true;
                  if (!oMulDoseDet.IsDaywiseView && IPPSchdDetails.Day > 1)
                    break;
                  strHourMinFormat =
                    CConstants.Dose +
                    ObjectHelper.CreateType<IPPManagePrescSer.IPPScheduledetails>(
                      oDoseDet.FrequencyDetails.ScheduledTimes[i],
                      IPPManagePrescSer.IPPScheduledetails
                    ).Event.ToString();
                  if (!oMulDoseDet.sceduledTimelst.Contains(strHourMinFormat)) {
                    oMulDoseDet.sceduledTimelst.Add(strHourMinFormat);
                  }
                }
              }
              if (oMulDoseDet.sceduledTimelst.Count > 0) {
                let nDayCount: number = oMulDoseDet.IsDaywiseView
                  ? iMath.Abs(
                    oDoseDet.FrequencyDetails.ScheduledTimes.Count /
                    oMulDoseDet.sceduledTimelst.Count
                  )
                  : 1;
                for (
                  let i: number = 0;
                  i < oMulDoseDet.sceduledTimelst.Count;
                  i++
                ) {
                  let k: number = 0;
                  let oScheduleDetailsCols: ScheduleDetailsCols =
                    new ScheduleDetailsCols();
                  oScheduleDetailsCols.ScheduleTime =
                    oMulDoseDet.sceduledTimelst[i];
                  oScheduleDetailsCols.ScheduleDoseValue = new Array(nDayCount);
                  oScheduleDetailsCols.ScheduleDoseUOMs = new Array(nDayCount);
                  oScheduleDetailsCols.Scheduledoseflag = new Array(nDayCount);
                  for (
                    let j: number = 0;
                    j < oDoseDet.FrequencyDetails.ScheduledTimes.Count;
                    j++
                  ) {
                    if (nDayCount == k) {
                      break;
                    }
                    if (!oMulDoseDet.SysDoseDetail)
                      strHourMinFormat =
                        ObjectHelper.CreateType<IPPManagePrescSer.IPPScheduledetails>(
                          oDoseDet.FrequencyDetails.ScheduledTimes[j],
                          IPPManagePrescSer.IPPScheduledetails
                        ).ScheduleDate.Hour.ToString() +
                        ':' +
                        ObjectHelper.CreateType<IPPManagePrescSer.IPPScheduledetails>(
                          oDoseDet.FrequencyDetails.ScheduledTimes[j],
                          IPPManagePrescSer.IPPScheduledetails
                        ).ScheduleDate.Minute.ToString('00');
                    else {
                      strHourMinFormat =
                        CConstants.Dose +
                        ObjectHelper.CreateType<IPPManagePrescSer.IPPScheduledetails>(
                          oDoseDet.FrequencyDetails.ScheduledTimes[j],
                          IPPManagePrescSer.IPPScheduledetails
                        ).Event.ToString();
                    }
                    if (oMulDoseDet.sceduledTimelst[i] == strHourMinFormat) {
                      oScheduleDetailsCols.ScheduleDoseValue[k] =
                        String.Compare(
                          ObjectHelper.CreateType<IPPManagePrescSer.IPPScheduledetails>(
                            oDoseDet.FrequencyDetails.ScheduledTimes[j],
                            IPPManagePrescSer.IPPScheduledetails
                          ).Dose.ToString(),
                          '0',
                          StringComparison.CurrentCultureIgnoreCase
                        ) == 0
                          ? String.Empty
                          : ObjectHelper.CreateType<IPPManagePrescSer.IPPScheduledetails>(
                            oDoseDet.FrequencyDetails.ScheduledTimes[j],
                            IPPManagePrescSer.IPPScheduledetails
                          ).Dose.ToString();
                      if (
                        String.IsNullOrEmpty(
                          oScheduleDetailsCols.ScheduleDoseValue[k]
                        )
                      ) {
                        oScheduleDetailsCols.ScheduleDoseUOMs[k] = String.Empty;
                        oScheduleDetailsCols.Scheduledoseflag[k] = false;
                      } else {
                        oScheduleDetailsCols.ScheduleDoseUOMs[k] =
                          ' ' + oDoseDet.DoseUOM.UOMName;
                        oScheduleDetailsCols.Scheduledoseflag[k] = true;
                      }
                      oScheduleDetailsCols.ScheduleDoseUOM =
                        oScheduleDetailsCols.ScheduleDoseUOMs[k].Trim();
                      k++;
                    }
                  }
                  oMulDoseDet.ScheduleDetailsData.Add(oScheduleDetailsCols);
                }
                if (
                  oMulDoseDet.sceduledTimelst != null &&
                  oMulDoseDet.sceduledTimelst.Count > 0 &&
                  !oMulDoseDet.SysDoseDetail
                ) {
                  if (
                    String.Compare(
                      oDoseDet.FrequencyDetails.IsFixedAdministration.ToString(),
                      'F'
                    ) == 0
                  ) {
                    oMulDoseDet.AdministrationTimes =
                      'Fixed - ' +
                      String.Join('/', oMulDoseDet.sceduledTimelst.array);
                  } else if (
                    String.Compare(
                      oDoseDet.FrequencyDetails.IsFixedAdministration.ToString(),
                      'D'
                    ) == 0
                  ) {
                    oMulDoseDet.AdministrationTimes =
                      'Druground - ' +
                      String.Join('/', oMulDoseDet.sceduledTimelst.array);
                  } else {
                    isintervalFreq = true;
                  }
                }
              } else oMulDoseDet.ScheduleDetailsData = null;
            }
            if (
              (String.Equals(
                oDoseDet.FrequencyType,
                'CC_INTERVAL',
                StringComparison.CurrentCultureIgnoreCase
              ) ||
                isintervalFreq) &&
              oMulDoseDet.Frequency != null &&
              DateTime.NotEquals(oMulDoseDet.StartDTTM, DateTime.MinValue)
            ) {
              oMulDoseDet.AdministrationTimes =
                oMulDoseDet.StartDTTM.ToUserDateTimeString(
                  'dd-MMM-yyyy HH:mm'
                ) +
                ' repeats ' +
                oMulDoseDet.Frequency.DisplayText;
              oMulDoseDet.FullPrescriptionLaunchMode = 'OLD';
            }
          }
          if (oDoseDet != null && oDoseDet.FrequencyDetails != null) {
            oMulDoseDet.SlotTimeMode =
              oDoseDet.FrequencyDetails.IsFixedAdministration;
          }
          oMulDoseDet.IsPRN =
            !String.IsNullOrEmpty(oDoseDet.Direction.Code) &&
            (String.Compare(oDoseDet.Direction.Code, 'CC_MEDDIRECTION') == 0 ||
              String.Compare(oDoseDet.Direction.Code, 'As needed') == 0);
          if (
            oDoseDet.IsDaywise != '1' &&
            (oMulDoseDet.AdminTimesData == null ||
              oMulDoseDet.FreqDetails == null) &&
            (oDoseDet.Frequency != null ||
              oDoseDet.FixedTimes != null ||
              oDoseDet.DrugroundTimes != null)
          ) {
            if (oMulDoseDet.oAdminTimesVM == null) {
              oMulDoseDet.oAdminTimesVM = new AdminstrativeTimesVM();
              oMulDoseDet.oAdminTimesVM.FreqDetails = ObjectHelper.CreateObject(
                new IPPManagePrescSer.CResMsgGetAdministrationTimes(),
                {
                  oFrequency: oDoseDet.Frequency,
                  oFixedTimes: oDoseDet.FixedTimes,
                  oDrugRoundTimes: oDoseDet.DrugroundTimes,
                }
              );
              if (
                oMulDoseDet.sceduledTimelst != null &&
                oMulDoseDet.sceduledTimelst.Count > 0
              ) {
                oMulDoseDet.oAdminTimesVM.FillAdministrationTimes(
                  oMulDoseDet.sceduledTimelst,
                  oMulDoseDet.SlotTimeMode
                );
              } else {
                oMulDoseDet.oAdminTimesVM.FillAdministrationTimes(
                  oMulDoseDet.oAdminTimesVM.FreqDetails
                );
              }
            }
          }
          oMulDoseDet.FullPrescriptionLaunchMode = 'OLD';
          StepDoseGridColms1.Add(oMulDoseDet);
        });
        this.StepDoseGridColms = new ObservableCollection<MultipleDoseDetail>(
          StepDoseGridColms1
        );
      }
    }
  }
  oPresWS_GetIPPPrescriptionItemDoseInfoCompleted(
    sender: Object,
    e: IPPManagePrescSer.GetIPPPrescriptionItemDoseInfoCompletedEventArgs
  ): void {
    let _ErrorID: number = 80000127;
    let _ErrorSource: string =
      'LorAppMedicationCommonBB.dll, Class:Prescriptionitemdetailsvm, Method:oPresWS_GetIPPPrescriptionItemDoseInfoCompleted()';
    if (e.Error == null) {
      try {
        let oResPresItemDoseInfo: IPPManagePrescSer.CResMsgGetIPPPrescriptionItemDoseInfo =
          e.Result;
        if (
          oResPresItemDoseInfo != null &&
          oResPresItemDoseInfo.oDose != null &&
          oResPresItemDoseInfo.oDose.DoseRegime != null
        ) {
          for(let i=0; i< oResPresItemDoseInfo.oDose.DoseRegime.Count; i++){
            let oDoseDet: IPPManagePrescSer.DoseRegime = oResPresItemDoseInfo.oDose.DoseRegime[i];
            if (
              !String.IsNullOrEmpty(oDoseDet['InfusionRate']) &&
              (String.Equals(
                oDoseDet['InfusionRate'],
                InfusionTypeCode.CONTINUOUS
              ) ||
                String.Equals(
                  oDoseDet['InfusionRate'],
                  InfusionTypeCode.SINGLEDOSEVOLUME
                ) ||
                String.Equals(oDoseDet['InfusionRate'], InfusionTypeCode.FLUID))
            ) {
              if (this.oSteppedInfContCompleted != null)
                this.oSteppedInfContCompleted(true, false);
               break;              
            } else if (String.IsNullOrEmpty(oDoseDet['InfusionRate'])) {
              if (this.oSteppedInfContCompleted != null)
                this.oSteppedInfContCompleted(false, true);
               break;
              
            }
          }
          let _CEncounterOID: number = 0;
          let _CEncounterTypeCode: string = String.Empty;
          if (PatientContext.EncounterOid > 0) {
            _CEncounterOID = PatientContext.EncounterOid;
            _CEncounterTypeCode = PatientContext.EncounterCode;
          }
          if (
            String.IsNullOrEmpty(_CEncounterTypeCode) &&
            MedDrugDetailsInputParam.DrugDetailsInputParams != null &&
            !String.IsNullOrEmpty(
              MedDrugDetailsInputParam.DrugDetailsInputParams
                .ContextEncounterOID
            )
          ) {
            Number.TryParse(
              MedDrugDetailsInputParam.DrugDetailsInputParams
                .ContextEncounterOID,
              (o) => {
                _CEncounterOID = o;
              }
            );
            if (
              !String.IsNullOrEmpty(
                MedDrugDetailsInputParam.DrugDetailsInputParams
                  .ContextEncounterTypeCode
              )
            ) {
              _CEncounterTypeCode =
                MedDrugDetailsInputParam.DrugDetailsInputParams
                  .ContextEncounterTypeCode;
            }
          }
          if (
            oResPresItemDoseInfo.oDose.PresItemEncounter != null &&
            oResPresItemDoseInfo.oDose.PresItemEncounter.OID > 0 &&
            _CEncounterOID > 0 &&
            !String.IsNullOrEmpty(_CEncounterTypeCode) &&
            oResPresItemDoseInfo.oDose.PresItemEncounter.OID !=
            _CEncounterOID &&
            !String.Equals(
              _CEncounterTypeCode,
              oResPresItemDoseInfo.oDose.PresItemEncounter.Code,
              StringComparison.InvariantCultureIgnoreCase
            ) &&
            oResPresItemDoseInfo.oDose.IsClinicalEncounterPresItem
          ) {
            oResPresItemDoseInfo.oDose.DoseRegime.ForEach((ReSetSlotMode) => {
              ReSetSlotMode.FrequencyDetails.IsFixedAdministration = 'F';
            });
          }
          this.FillDataContextPresItemDose(
            oResPresItemDoseInfo.oDose.DoseRegime,
            '',
            String.Empty
          );
          this.PresItemDoseInfoServicedata.emit();
        }
      } catch (ex: any) {
        let lnReturn: number = AMSHelper.PublicExceptionDetails(
          _ErrorID,
          _ErrorSource,
          ex
        );
      }
    } else {
      let lnReturn: number = AMSHelper.PublicExceptionDetails(
        _ErrorID,
        _ErrorSource,
        e.Error
      );
    }
    if (this.SteppedDoseCompleted != null) this.SteppedDoseCompleted();
  }
  private FillDataContextPresItemDose2(
    oDoseRegime: ObservableCollection<IPPManagePrescSer.DoseRegime>,
    OperationMode: string,
    InfusionType: string
  ): void {
    let StepDoseGridColms1: ObservableCollection<MultipleDoseDetail> =
      new ObservableCollection<MultipleDoseDetail>();
    if (oDoseRegime != null && oDoseRegime.Count > 0) {
      (
        oDoseRegime as ObservableCollection<IPPManagePrescSer.IPPDoseRegime>
      ).forEach((oDoseDet) => {
        let IsInfContinFlag: boolean = false;
        let oMulDoseDet: MultipleDoseDetail = new MultipleDoseDetail();
        oMulDoseDet.LowerDose = Convert.ToDouble(oDoseDet.LowerDose);
        oMulDoseDet.UpperDose = Convert.ToDouble(oDoseDet.UpperDose);
        if (oDoseDet.DoseUOM instanceof IPPManagePrescSer.UOM) {
          oMulDoseDet.DoseUOM = ObjectHelper.CreateObject(new CListItem(), {
            DisplayText: oDoseDet.DoseUOM.UOMName,
            Value: oDoseDet.DoseUOM.UOMId.ToString(),
          });
        }
        if (oDoseDet != null) {
          if (!String.IsNullOrEmpty(oDoseDet.Rate)) {
            oMulDoseDet.InfusionRate = oDoseDet.Rate;
          }
          if (!String.IsNullOrEmpty(oDoseDet.UpperRate)) {
            oMulDoseDet.InfusionUpperrate = oDoseDet.UpperRate;
          }
          if (oDoseDet.RateUOMOID instanceof IPPManagePrescSer.UOM) {
            oMulDoseDet.Infratenumeratoruom = ObjectHelper.CreateObject(
              new CListItem(),
              {
                DisplayText: oDoseDet.RateUOMOID.UOMName,
                Value: oDoseDet.RateUOMOID.ToString(),
              }
            );
          }
          if (oDoseDet.RateDenaminatorUOMOID instanceof IPPManagePrescSer.UOM) {
            oMulDoseDet.InfrateDenominatoruom = ObjectHelper.CreateObject(
              new CListItem(),
              {
                DisplayText: oDoseDet.RateDenaminatorUOMOID.UOMName,
                Value: oDoseDet.RateDenaminatorUOMOID.ToString(),
              }
            );
          }
          if (!String.IsNullOrEmpty(oDoseDet.InfusionRate)) {
            oMulDoseDet.InfusionType = oDoseDet.InfusionRate;
          } else if (!String.IsNullOrEmpty(InfusionType)) {
            oMulDoseDet.InfusionType = InfusionType;
          }
          if (
            !String.IsNullOrEmpty(oMulDoseDet.InfusionType) &&
            (String.Equals(
              oMulDoseDet.InfusionType,
              InfusionTypeCode.CONTINUOUS
            ) ||
              String.Equals(
                oMulDoseDet.InfusionType,
                InfusionTypeCode.SINGLEDOSEVOLUME
              ) ||
              String.Equals(oMulDoseDet.InfusionType, InfusionTypeCode.FLUID))
          ) {
            IsInfContinFlag = true;
          }
        }
        if (oDoseDet.Duration instanceof IPPManagePrescSer.MeasurableObject) {
          oMulDoseDet.Duration = oDoseDet.Duration.Value;
          if (OperationMode != 'N') {
            oMulDoseDet.DurationUOM = ObjectHelper.CreateObject(
              new CListItem(),
              {
                DisplayText: oDoseDet.Duration.UOMName,
                Value: oDoseDet.Duration.UOMCode,
              }
            );
          } else {
            oMulDoseDet.DurationUOM = ObjectHelper.CreateObject(
              new CListItem(),
              {
                DisplayText: oDoseDet.Duration.UOMCode,
                Value: oDoseDet.Duration.UOMName,
              }
            );
          }
        }
        if (!String.IsNullOrEmpty(oDoseDet.DurationUOMCode)) {
          if (oMulDoseDet.DurationUOM == null)
            oMulDoseDet.DurationUOM = new CListItem();
          oMulDoseDet.DurationUOM.Value = oDoseDet.DurationUOMCode;
        }
        oMulDoseDet.StartDTTM = oDoseDet.StartDTTM.ConvertToUser(
          (o1) => {
            this.IsDST = o1;
          },
          (o2) => {
            this.IsAmbiguous = o2;
          },
          (o3) => {
            this.IsInvalid = o3;
          }
        );
        if (DateTime.NotEquals(oDoseDet.EndDTTM, DateTime.MinValue)) {
          oMulDoseDet.EndDTTM = oDoseDet.EndDTTM.ConvertToUser(
            (o1) => {
              this.IsDST = o1;
            },
            (o2) => {
              this.IsAmbiguous = o2;
            },
            (o3) => {
              this.IsInvalid = o3;
            }
          );
        } else {
          let TempEndDTTM: DateTime = DateTime.MinValue;
          if (
            oMulDoseDet != null &&
            oMulDoseDet.DurationUOM != null &&
            !String.IsNullOrEmpty(oMulDoseDet.DurationUOM.Value) &&
            oMulDoseDet.Duration > 0
          ) {
            switch (oMulDoseDet.DurationUOM.Value) {
              case 'CC_MINUTES':
                TempEndDTTM = oMulDoseDet.StartDTTM.AddMinutes(
                  oMulDoseDet.Duration
                ).AddMinutes(-1);
                break;
              case 'CC_HOURS':
                TempEndDTTM = oMulDoseDet.StartDTTM.AddHours(
                  oMulDoseDet.Duration
                ).AddMinutes(-1);
                break;
              case 'CC_MEDDRSN1':
                TempEndDTTM = oMulDoseDet.StartDTTM.DateTime.AddDays(
                  oMulDoseDet.Duration
                ).AddMinutes(-1);
                break;
              case 'CC_MEDDRSN2':
                TempEndDTTM = oMulDoseDet.StartDTTM.AddDays(
                  oMulDoseDet.Duration * 7
                ).AddMinutes(-1);
                break;
              case 'CC_MEDRSN3':
                TempEndDTTM = oMulDoseDet.StartDTTM.AddMonths(
                  Convert.ToInt32(oMulDoseDet.Duration)
                ).AddMinutes(-1);
                break;
              case 'CC_MEDRSN4':
                TempEndDTTM = oMulDoseDet.StartDTTM.AddYears(
                  Convert.ToInt32(oMulDoseDet.Duration)
                ).AddMinutes(-1);
                break;
              case 'CC_DOSES':
                TempEndDTTM = oDoseDet.EndDTTM;
                break;
            }
          }
          if (DateTime.NotEquals(TempEndDTTM, DateTime.MinValue))
            oMulDoseDet.EndDTTM = TempEndDTTM.ConvertToUser(
              (o1) => {
                this.IsDST = o1;
              },
              (o2) => {
                this.IsAmbiguous = o2;
              },
              (o3) => {
                this.IsInvalid = o3;
              }
            );
        }
 
        if(typeof oMulDoseDet.EndDTTM  === 'undefined' )
        oMulDoseDet.EndDTTM =  DateTime.MinValue;
	
        oMulDoseDet.DoseInstructions = oDoseDet.DosingInstruction;
        oMulDoseDet.IsDaywiseView = oDoseDet.IsDaywise == '1' ? true : false;
        oMulDoseDet.PresType = oDoseDet.PrescriptionType;
        if (
          oDoseDet.FrequencyDetails instanceof
          IPPManagePrescSer.FrequencyDetails &&
          oDoseDet.FrequencyDetails.Frequency instanceof
          IPPManagePrescSer.ObjectInfo
        ) {
          oMulDoseDet.Frequency = ObjectHelper.CreateObject(new CListItem(), {
            DisplayText: oDoseDet.FrequencyDetails.Frequency.Name,
            Value: oDoseDet.FrequencyDetails.Frequency.OID.ToString(),
            Tag: oDoseDet.FrequencyDetails.Frequency.Code,
          });
          oMulDoseDet.FreqUOMCode =
            oDoseDet != null ? oDoseDet.FreqUOMCode : String.Empty;
          let isIntervalFreq: boolean = false;
          if (
            oDoseDet.FrequencyDetails.ScheduledTimes != null &&
            oDoseDet.FrequencyDetails.ScheduledTimes.Count > 0
          ) {
            if (
              oDoseDet.LowerDose == 0 &&
              oDoseDet.UpperDose == 0 &&
              oDoseDet.DoseUOM != null &&
              !IsInfContinFlag
            )
              oMulDoseDet.HyperlinkText = 'Changing dose';
            let oIPPDoseRegime: IPPManagePrescSer.IPPDoseRegime =
              ObjectHelper.CreateType<IPPManagePrescSer.IPPDoseRegime>(
                oDoseDet,
                IPPManagePrescSer.IPPDoseRegime
              );
            if (oIPPDoseRegime != null) {
              oMulDoseDet.IsDaywiseView = oIPPDoseRegime.IsDaywise.Equals('1');
            }
            oMulDoseDet.ScheduleDetailsData =
              new ObservableCollection<ScheduleDetailsCols>();
            oMulDoseDet.sceduledTimelst = new List<string>();
            let strHourMinFormat: string = String.Empty;
            let IPPSchdDetails: IPPManagePrescSer.IPPScheduledetails;
            let dtmScheduleDate: List<DateTime> = new List<DateTime>();
            for (
              let i: number = 0;
              i < oDoseDet.FrequencyDetails.ScheduledTimes.Count;
              i++
            ) {
              IPPSchdDetails =
                ObjectHelper.CreateType<IPPManagePrescSer.IPPScheduledetails>(
                  oDoseDet.FrequencyDetails.ScheduledTimes[i],
                  IPPManagePrescSer.IPPScheduledetails
                );
              if (IPPSchdDetails == null) continue;
              IPPSchdDetails.ScheduleDate =
                IPPSchdDetails.ScheduleDate.ConvertToUser(
                  (o1) => {
                    this.IsDST = o1;
                  },
                  (o2) => {
                    this.IsAmbiguous = o2;
                  },
                  (o3) => {
                    this.IsInvalid = o3;
                  }
                );
              {
                if (
                  OperationMode != 'N' &&
                  IPPSchdDetails.ScheduleDate.Year > 1753
                ) {
                  strHourMinFormat =
                    IPPSchdDetails.ScheduleDate.Hour.ToString('00') +
                    ':' +
                    IPPSchdDetails.ScheduleDate.Minute.ToString('00');
                } else if (
                  oDoseDet.FrequencyDetails.ScheduledTimes[i].ScheduledTime !=
                  null
                ) {
                  strHourMinFormat = oMulDoseDet.StartDTTM.ConvertToLocal(
                    this.IsDST
                  )
                    .DateTime.AddHours(
                      Convert.ToDouble(
                        oDoseDet.FrequencyDetails.ScheduledTimes[
                          i
                        ].ScheduledTime.Split(':')[0]
                      )
                    )
                    .AddMinutes(
                      Convert.ToDouble(
                        oDoseDet.FrequencyDetails.ScheduledTimes[
                          i
                        ].ScheduledTime.Split(':')[1]
                      )
                    )
                    .ConvertToUser(
                      (o1) => {
                        this.IsDST = o1;
                      },
                      (o2) => {
                        this.IsAmbiguous = o2;
                      },
                      (o3) => {
                        this.IsInvalid = o3;
                      }
                    )
                    .ToString('HH:mm');
                }
                if (!oMulDoseDet.sceduledTimelst.Contains(strHourMinFormat)) {
                  oMulDoseDet.sceduledTimelst.Add(strHourMinFormat);
                }
                if (
                  !dtmScheduleDate.Contains(IPPSchdDetails.ScheduleDate.Date) &&
                  IPPSchdDetails.ScheduleDate.Year > 1753
                ) {
                  dtmScheduleDate.Add(IPPSchdDetails.ScheduleDate.Date);
                }
              }
            }
            if (oMulDoseDet.sceduledTimelst.Count > 0) {
              let oScheduledetails: List<IPPManagePrescSer.Scheduledetails> =
                null;
              let nDayCount: number;
              if (
                DateTime.NotEquals(oMulDoseDet.StartDTTM, DateTime.MinValue) &&
                DateTime.NotEquals(oMulDoseDet.EndDTTM, DateTime.MinValue)
              ) {
                nDayCount =
                  oMulDoseDet.EndDTTM.DateTime.Subtract(
                    oMulDoseDet.StartDTTM.Date
                  ).Days + 1;
              } else nDayCount = dtmScheduleDate.Count;
              let lstActDosageSchedileTimes: List<string> = new List<string>();
              let lstPrevDRTValues: List<string> = new List<string>();
              let _lstAdminTmeMapping: Dictionary<string, string> =
                new Dictionary<string, string>();
              let _nMatchDRTTimesCount: number = 0;
              let _IsMissmathDRTimes: boolean = false;
              let _lstAdmintimesandDoses: Dictionary<string, number> =
                new Dictionary<string, number>();
              let _IsNotDayWiseView: boolean = false;
              if (
                !String.IsNullOrEmpty(PatientContext.IsPatientTranferAct) &&
                PatientContext.IsPatientTranferAct.Equals('1') &&
                oDoseDet != null &&
                oDoseDet.vDosageScheduleTimes != null &&
                oDoseDet.vDosageScheduleTimes.Count > 0 &&
                oMulDoseDet != null &&
                oMulDoseDet.sceduledTimelst != null &&
                oMulDoseDet.sceduledTimelst.Count > 0 &&
                oDoseDet.FrequencyDetails != null &&
                String.Equals(
                  oDoseDet.FrequencyDetails.IsFixedAdministration.ToString(),
                  'D'
                )
              ) {
                _IsNotDayWiseView = oDoseDet.IsDaywise.Equals('\0')
                  ? true
                  : false;
                let iDosageScheduleTimes: List<number> =
                  oDoseDet.vDosageScheduleTimes.OrderBy((x) => x).ToList();
                let VDoseDRTCount: number = iDosageScheduleTimes.Count;
                let _sbAdminTimes: string = String.Empty;
                for (let ij: number = 0; ij < VDoseDRTCount; ij++) {
                  _sbAdminTimes = TimeSpan.FromMinutes(
                    iDosageScheduleTimes[ij]
                  ).ToString('HH:mm'); //kannan parent grid time 24 hrs
                  lstActDosageSchedileTimes.Add(_sbAdminTimes);
                  if (
                    oMulDoseDet.sceduledTimelst
                      .Where((S) => S.Equals(_sbAdminTimes))
                      .Count() > 0
                  ) {
                    _nMatchDRTTimesCount++;
                  }
                }
                if (
                  oDoseDet != null &&
                  oDoseDet.PreviousServiceDRTValues != null
                ) {
                  let PrevSrvcDRT: string[] =
                    oDoseDet.PreviousServiceDRTValues.Split(';');
                  if (PrevSrvcDRT != null && PrevSrvcDRT.length > 0) {
                    let _sbDRTAdminTimes: string = String.Empty;
                    let _DRTValue: number = 0;
                    for (let cnt: number = 0; cnt < PrevSrvcDRT.length; cnt++) {
                      Number.TryParse(PrevSrvcDRT[cnt], (o) => {
                        _DRTValue = o;
                      });
                      _sbDRTAdminTimes =
                        TimeSpan.FromMinutes(_DRTValue).ToString('HH:mm');
                      lstPrevDRTValues.Add(_sbDRTAdminTimes);
                    }
                  }
                }
                if (
                  lstPrevDRTValues != null &&
                  lstPrevDRTValues.Count > 0 &&
                  lstActDosageSchedileTimes != null &&
                  lstActDosageSchedileTimes.Count > 0 &&
                  lstPrevDRTValues.Count == lstActDosageSchedileTimes.Count
                ) {
                  for (
                    let cMap: number = 0;
                    cMap < lstActDosageSchedileTimes.Count;
                    cMap++
                  ) {
                    if (
                      !_lstAdminTmeMapping.ContainsKey(lstPrevDRTValues[cMap])
                    ) {
                      _lstAdminTmeMapping.Add(
                        lstPrevDRTValues[cMap],
                        lstActDosageSchedileTimes[cMap]
                      );
                    }
                  }
                }
                let objMapSchData: Dictionary<string, string> = new Dictionary<
                  string,
                  string
                >();
                if (oMulDoseDet.sceduledTimelst.Count != VDoseDRTCount) {
                  let objSchData: List<string> = new List<string>();
                  let lstSchData: List<string> = oMulDoseDet.sceduledTimelst
                    .Select((s) => s.ToString())
                    .Except(
                      lstActDosageSchedileTimes.Select((c) => c.ToString())
                    )
                    .ToList();
                  if (lstSchData != null && lstSchData.Count > 0) {
                    objSchData = lstSchData.OrderBy((x) => x).ToList();
                    if (
                      objSchData != null &&
                      objSchData.Count > 0 &&
                      lstActDosageSchedileTimes != null &&
                      lstActDosageSchedileTimes.Count > 0
                    ) {
                      let _objSchDataCnt: number = objSchData.Count;
                      for (
                        let sch: number = lstActDosageSchedileTimes.Count - 1;
                        sch >= 0;
                        sch--
                      ) {
                        if (_objSchDataCnt > 0) {
                          objMapSchData.Add(
                            objSchData[_objSchDataCnt - 1],
                            lstActDosageSchedileTimes[sch]
                          );
                        }
                        _objSchDataCnt--;
                      }
                    }
                  }
                }
                if (
                  _nMatchDRTTimesCount != VDoseDRTCount ||
                  oMulDoseDet.sceduledTimelst.Count != VDoseDRTCount
                ) {
                  _IsMissmathDRTimes = true;
                  let ScheduleTime: string = String.Empty;
                  for (
                    let i: number = 0;
                    i < oMulDoseDet.sceduledTimelst.Count;
                    i++
                  ) {
                    ScheduleTime = oMulDoseDet.sceduledTimelst[i];
                    if (OperationMode != 'N') {
                      let oTmp: DateTime;
                      for (
                        let k: number = 0;
                        k < oDoseDet.FrequencyDetails.ScheduledTimes.Count;
                        k++
                      ) {
                        let objScheduledetails: IPPManagePrescSer.Scheduledetails =
                          oDoseDet.FrequencyDetails.ScheduledTimes[k];
                        if (
                          objScheduledetails != null &&
                          ObjectHelper.CreateType<IPPManagePrescSer.IPPScheduledetails>(
                            objScheduledetails,
                            IPPManagePrescSer.IPPScheduledetails
                          ).ScheduleDate.ToString('HH:mm') == ScheduleTime
                        ) {
                          if (
                            oMulDoseDet.sceduledTimelst.Count != VDoseDRTCount
                          ) {
                            let SchTime: string = String.Empty;
                            if (
                              objMapSchData != null &&
                              objMapSchData.Count() > 0 &&
                              objMapSchData.ContainsKey(ScheduleTime)
                            ) {
                              if (
                                _lstAdminTmeMapping != null &&
                                _lstAdminTmeMapping.Count() > 0 &&
                                _lstAdminTmeMapping.ContainsKey(ScheduleTime)
                              ) {
                                SchTime = _lstAdminTmeMapping[ScheduleTime];
                                if (
                                  lstActDosageSchedileTimes != null &&
                                  lstActDosageSchedileTimes.Count > 0
                                ) {
                                  let IndexoVal: number =
                                    lstActDosageSchedileTimes.IndexOf(SchTime);
                                  if (IndexoVal > 0) {
                                    IndexoVal = IndexoVal - 1;
                                  }
                                  if (IndexoVal == 0) {
                                    IndexoVal = 1;
                                  }
                                  if (
                                    lstActDosageSchedileTimes.Count >= IndexoVal
                                  ) {
                                    SchTime =
                                      lstActDosageSchedileTimes[IndexoVal];
                                  }
                                }
                              }
                            }
                            if (!String.IsNullOrEmpty(SchTime)) {
                              oTmp =
                                ObjectHelper.CreateType<IPPManagePrescSer.IPPScheduledetails>(
                                  objScheduledetails,
                                  IPPManagePrescSer.IPPScheduledetails
                                )
                                  .ScheduleDate.DateTime.AddHours(
                                    Convert.ToDouble(SchTime.Split(':')[0])
                                  )
                                  .AddMinutes(
                                    Convert.ToDouble(SchTime.Split(':')[1])
                                  );
                              ObjectHelper.CreateType<IPPManagePrescSer.IPPScheduledetails>(
                                objScheduledetails,
                                IPPManagePrescSer.IPPScheduledetails
                              ).ScheduleDate = oTmp;
                              oDoseDet.FrequencyDetails.ScheduledTimes[k] =
                                objScheduledetails;
                            }
                          } else {
                            oTmp =
                              ObjectHelper.CreateType<IPPManagePrescSer.IPPScheduledetails>(
                                objScheduledetails,
                                IPPManagePrescSer.IPPScheduledetails
                              )
                                .ScheduleDate.DateTime.AddHours(
                                  Convert.ToDouble(
                                    lstActDosageSchedileTimes[i].Split(':')[0]
                                  )
                                )
                                .AddMinutes(
                                  Convert.ToDouble(
                                    lstActDosageSchedileTimes[i].Split(':')[1]
                                  )
                                );
                            ObjectHelper.CreateType<IPPManagePrescSer.IPPScheduledetails>(
                              objScheduledetails,
                              IPPManagePrescSer.IPPScheduledetails
                            ).ScheduleDate = oTmp;
                            oDoseDet.FrequencyDetails.ScheduledTimes[k] =
                              objScheduledetails;
                          }
                        }
                      }
                    }
                  }
                  oMulDoseDet.sceduledTimelst = lstActDosageSchedileTimes;
                  if (
                    _IsNotDayWiseView &&
                    !String.IsNullOrEmpty(PatientContext.IsPatientTranferAct) &&
                    PatientContext.IsPatientTranferAct.Equals('1')
                  ) {
                    if (
                      !String.IsNullOrEmpty(
                        oDoseDet.SVScheduleTimeAndDoseValues
                      )
                    ) {
                      let objTimesAndDoseDetls: Dictionary<string, number> =
                        new Dictionary<string, number>();
                      let _TimesAndDoseValues: string[] =
                        oDoseDet.SVScheduleTimeAndDoseValues.Split(';');
                      if (
                        _TimesAndDoseValues != null &&
                        _TimesAndDoseValues.length > 0
                      ) {
                        let _TimesAndDoseValuesCount: number =
                          _TimesAndDoseValues.length;
                        for (
                          let ij: number = 0;
                          ij < _TimesAndDoseValuesCount;
                          ij++
                        ) {
                          let _TimesAndDose: string = _TimesAndDoseValues[ij];
                          if (!String.IsNullOrEmpty(_TimesAndDose)) {
                            let _SchTimesDoses: string[] =
                              _TimesAndDose.Split(',');
                            if (
                              _SchTimesDoses != null &&
                              _SchTimesDoses.length >= 1
                            ) {
                              let _Dose: number = 0;
                              Number.TryParse(_SchTimesDoses[1], (o) => {
                                _Dose = o;
                              });
                              let _Times: number = 0;
                              Number.TryParse(_SchTimesDoses[0], (o) => {
                                _Times = o;
                              });
                              let _sTimes: string =
                                TimeSpan.FromMinutes(_Times).ToString('HH:mm');
                              if (!objTimesAndDoseDetls.ContainsKey(_sTimes)) {
                                objTimesAndDoseDetls.Add(_sTimes, _Dose);
                              }
                            }
                          }
                        }
                      }
                      if (
                        OperationMode != 'N' &&
                        objTimesAndDoseDetls != null
                      ) {
                        let oTmp: DateTime;
                        for (
                          let k: number = 0;
                          k < oDoseDet.FrequencyDetails.ScheduledTimes.Count;
                          k++
                        ) {
                          let objScheduledetails: IPPManagePrescSer.Scheduledetails =
                            oDoseDet.FrequencyDetails.ScheduledTimes[k];
                          let _ScheduleTime: string = String.Empty;
                          let _DoseValue: number = 0;
                          if (objScheduledetails != null) {
                            _ScheduleTime =
                              ObjectHelper.CreateType<IPPManagePrescSer.IPPScheduledetails>(
                                objScheduledetails,
                                IPPManagePrescSer.IPPScheduledetails
                              ).ScheduleDate.ToString('HH:mm');
                            if (
                              objTimesAndDoseDetls.ContainsKey(_ScheduleTime)
                            ) {
                              _DoseValue = objTimesAndDoseDetls[_ScheduleTime];
                            }
                            if (objScheduledetails != null && _DoseValue > 0) {
                              ObjectHelper.CreateType<IPPManagePrescSer.IPPScheduledetails>(
                                objScheduledetails,
                                IPPManagePrescSer.IPPScheduledetails
                              ).Dose = _DoseValue;
                              oDoseDet.FrequencyDetails.ScheduledTimes[k] =
                                objScheduledetails;
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
              for (
                let i: number = 0;
                i < oMulDoseDet.sceduledTimelst.Count;
                i++
              ) {
                let oScheduleDetailsCols: ScheduleDetailsCols =
                  new ScheduleDetailsCols();
                oScheduleDetailsCols.ScheduleTime =
                  oMulDoseDet.sceduledTimelst[i];
                oScheduleDetailsCols.PresType = oMulDoseDet.PresType;
                if (oMulDoseDet.IsDaywiseView) {
                  oScheduleDetailsCols.ScheduleDoseValue = new Array(nDayCount);
                  oScheduleDetailsCols.Scheduledoseflag = new Array(nDayCount);
                  oScheduleDetailsCols.ScheduleDate = new Array(nDayCount);
                  oScheduleDetailsCols.ScheduleDoseUOMs = new Array(nDayCount);
                  let dtTemp: DateTime =
                    oMulDoseDet.StartDTTM.DateTime.AddHours(
                      Convert.ToDouble(
                        oScheduleDetailsCols.ScheduleTime.Split(':')[0]
                      )
                    ).AddMinutes(
                      Convert.ToDouble(
                        oScheduleDetailsCols.ScheduleTime.Split(':')[1]
                      )
                    );
                  oDoseDet.FrequencyDetails.ScheduledTimes.forEach(
                    (oTmpScheduledetails) => {
                      if (
                        oTmpScheduledetails != null &&
                        oTmpScheduledetails.ScheduledTime != null
                      )
                        oTmpScheduledetails.ScheduledTime =
                          oMulDoseDet.StartDTTM.ConvertToLocal(this.IsDST)
                            .DateTime.AddHours(
                              Convert.ToDouble(
                                oTmpScheduledetails.ScheduledTime.Split(':')[0]
                              )
                            )
                            .AddMinutes(
                              Convert.ToDouble(
                                oTmpScheduledetails.ScheduledTime.Split(':')[1]
                              )
                            )
                            .ConvertToUser(
                              (o1) => {
                                this.IsDST = o1;
                              },
                              (o2) => {
                                this.IsAmbiguous = o2;
                              },
                              (o3) => {
                                this.IsInvalid = o3;
                              }
                            )
                            .ToString('HH:mm');
                    }
                  );
                  if (OperationMode != 'N') {
                    oScheduledetails =
                      oDoseDet.FrequencyDetails.ScheduledTimes.Select((s) => s)
                        .Where(
                          (s) =>
                            ObjectHelper.CreateType<IPPManagePrescSer.IPPScheduledetails>(
                              s,
                              IPPManagePrescSer.IPPScheduledetails
                            ).ScheduleDate.ToString('HH:mm') ==
                            oMulDoseDet.sceduledTimelst[i]
                        )
                        .ToList();
                  } else {
                    oScheduledetails =
                      oDoseDet.FrequencyDetails.ScheduledTimes.Select((s) => s)
                        .Where(
                          (s) =>
                            s.ScheduledTime == oMulDoseDet.sceduledTimelst[i]
                        )
                        .ToList();
                  }
                  let idx: number = 0;
                  for (let j: number = 0; j < nDayCount; j++) {
                    if (idx < oScheduledetails.Count) {
                      let dtSchDate: DateTime = DateTime.MinValue;
                      if (OperationMode != 'N') {
                        dtSchDate =
                          ObjectHelper.CreateType<IPPManagePrescSer.IPPScheduledetails>(
                            oScheduledetails[idx],
                            IPPManagePrescSer.IPPScheduledetails
                          ).ScheduleDate;
                      } else {
                        if (
                          oDoseDet != null &&
                          !String.IsNullOrEmpty(oDoseDet.FreqUOMCode) &&
                          oDoseDet.FreqUOMCode.Equals('CC_MEDDRSN2') &&
                          (<IPPManagePrescSer.IPPFrequencyDetails>(
                            oDoseDet.FrequencyDetails
                          )).DaysOfWeek != null
                        ) {
                          if (
                            (<IPPManagePrescSer.IPPFrequencyDetails>(
                              oDoseDet.FrequencyDetails
                            )).DaysOfWeek != null
                          ) {
                            switch (
                            (<IPPManagePrescSer.IPPScheduledetails>(
                              oScheduledetails[idx]
                            )).ScheduleDate.DayOfWeek
                            ) {
                              case DayOfWeek.Sunday:
                                if (
                                  (<IPPManagePrescSer.IPPFrequencyDetails>(
                                    oDoseDet.FrequencyDetails
                                  )).DaysOfWeek[0] == 'True' ||
                                  (<IPPManagePrescSer.IPPFrequencyDetails>(
                                    oDoseDet.FrequencyDetails
                                  )).DaysOfWeek[0] == 'T'
                                ) {
                                  dtSchDate =
                                    ObjectHelper.CreateType<IPPManagePrescSer.IPPScheduledetails>(
                                      oScheduledetails[idx],
                                      IPPManagePrescSer.IPPScheduledetails
                                    )
                                      .ScheduleDate.DateTime.AddHours(
                                        Convert.ToDouble(
                                          oScheduledetails[
                                            idx
                                          ].ScheduledTime.Split(':')[0]
                                        )
                                      )
                                      .AddMinutes(
                                        Convert.ToDouble(
                                          oScheduledetails[
                                            idx
                                          ].ScheduledTime.Split(':')[1]
                                        )
                                      );
                                }
                                break;
                              case DayOfWeek.Monday:
                                if (
                                  (<IPPManagePrescSer.IPPFrequencyDetails>(
                                    oDoseDet.FrequencyDetails
                                  )).DaysOfWeek[1] == 'True' ||
                                  (<IPPManagePrescSer.IPPFrequencyDetails>(
                                    oDoseDet.FrequencyDetails
                                  )).DaysOfWeek[1] == 'T'
                                ) {
                                  dtSchDate =
                                    ObjectHelper.CreateType<IPPManagePrescSer.IPPScheduledetails>(
                                      oScheduledetails[idx],
                                      IPPManagePrescSer.IPPScheduledetails
                                    )
                                      .ScheduleDate.DateTime.AddHours(
                                        Convert.ToDouble(
                                          oScheduledetails[
                                            idx
                                          ].ScheduledTime.Split(':')[0]
                                        )
                                      )
                                      .AddMinutes(
                                        Convert.ToDouble(
                                          oScheduledetails[
                                            idx
                                          ].ScheduledTime.Split(':')[1]
                                        )
                                      );
                                }
                                break;
                              case DayOfWeek.Tuesday:
                                if (
                                  (<IPPManagePrescSer.IPPFrequencyDetails>(
                                    oDoseDet.FrequencyDetails
                                  )).DaysOfWeek[2] == 'True' ||
                                  (<IPPManagePrescSer.IPPFrequencyDetails>(
                                    oDoseDet.FrequencyDetails
                                  )).DaysOfWeek[2] == 'T'
                                ) {
                                  dtSchDate =
                                    ObjectHelper.CreateType<IPPManagePrescSer.IPPScheduledetails>(
                                      oScheduledetails[idx],
                                      IPPManagePrescSer.IPPScheduledetails
                                    )
                                      .ScheduleDate.DateTime.AddHours(
                                        Convert.ToDouble(
                                          oScheduledetails[
                                            idx
                                          ].ScheduledTime.Split(':')[0]
                                        )
                                      )
                                      .AddMinutes(
                                        Convert.ToDouble(
                                          oScheduledetails[
                                            idx
                                          ].ScheduledTime.Split(':')[1]
                                        )
                                      );
                                }
                                break;
                              case DayOfWeek.Wednesday:
                                if (
                                  (<IPPManagePrescSer.IPPFrequencyDetails>(
                                    oDoseDet.FrequencyDetails
                                  )).DaysOfWeek[3] == 'True' ||
                                  (<IPPManagePrescSer.IPPFrequencyDetails>(
                                    oDoseDet.FrequencyDetails
                                  )).DaysOfWeek[3] == 'T'
                                ) {
                                  dtSchDate =
                                    ObjectHelper.CreateType<IPPManagePrescSer.IPPScheduledetails>(
                                      oScheduledetails[idx],
                                      IPPManagePrescSer.IPPScheduledetails
                                    )
                                      .ScheduleDate.DateTime.AddHours(
                                        Convert.ToDouble(
                                          oScheduledetails[
                                            idx
                                          ].ScheduledTime.Split(':')[0]
                                        )
                                      )
                                      .AddMinutes(
                                        Convert.ToDouble(
                                          oScheduledetails[
                                            idx
                                          ].ScheduledTime.Split(':')[1]
                                        )
                                      );
                                }
                                break;
                              case DayOfWeek.Thursday:
                                if (
                                  (<IPPManagePrescSer.IPPFrequencyDetails>(
                                    oDoseDet.FrequencyDetails
                                  )).DaysOfWeek[4] == 'True' ||
                                  (<IPPManagePrescSer.IPPFrequencyDetails>(
                                    oDoseDet.FrequencyDetails
                                  )).DaysOfWeek[4] == 'T'
                                ) {
                                  dtSchDate =
                                    ObjectHelper.CreateType<IPPManagePrescSer.IPPScheduledetails>(
                                      oScheduledetails[idx],
                                      IPPManagePrescSer.IPPScheduledetails
                                    )
                                      .ScheduleDate.DateTime.AddHours(
                                        Convert.ToDouble(
                                          oScheduledetails[
                                            idx
                                          ].ScheduledTime.Split(':')[0]
                                        )
                                      )
                                      .AddMinutes(
                                        Convert.ToDouble(
                                          oScheduledetails[
                                            idx
                                          ].ScheduledTime.Split(':')[1]
                                        )
                                      );
                                }
                                break;
                              case DayOfWeek.Friday:
                                if (
                                  (<IPPManagePrescSer.IPPFrequencyDetails>(
                                    oDoseDet.FrequencyDetails
                                  )).DaysOfWeek[5] == 'True' ||
                                  (<IPPManagePrescSer.IPPFrequencyDetails>(
                                    oDoseDet.FrequencyDetails
                                  )).DaysOfWeek[5] == 'T'
                                ) {
                                  dtSchDate =
                                    ObjectHelper.CreateType<IPPManagePrescSer.IPPScheduledetails>(
                                      oScheduledetails[idx],
                                      IPPManagePrescSer.IPPScheduledetails
                                    )
                                      .ScheduleDate.DateTime.AddHours(
                                        Convert.ToDouble(
                                          oScheduledetails[
                                            idx
                                          ].ScheduledTime.Split(':')[0]
                                        )
                                      )
                                      .AddMinutes(
                                        Convert.ToDouble(
                                          oScheduledetails[
                                            idx
                                          ].ScheduledTime.Split(':')[1]
                                        )
                                      );
                                }
                                break;
                              case DayOfWeek.Saturday:
                                if (
                                  (<IPPManagePrescSer.IPPFrequencyDetails>(
                                    oDoseDet.FrequencyDetails
                                  )).DaysOfWeek[6] == 'True' ||
                                  (<IPPManagePrescSer.IPPFrequencyDetails>(
                                    oDoseDet.FrequencyDetails
                                  )).DaysOfWeek[6] == 'T'
                                ) {
                                  dtSchDate =
                                    ObjectHelper.CreateType<IPPManagePrescSer.IPPScheduledetails>(
                                      oScheduledetails[idx],
                                      IPPManagePrescSer.IPPScheduledetails
                                    )
                                      .ScheduleDate.DateTime.AddHours(
                                        Convert.ToDouble(
                                          oScheduledetails[
                                            idx
                                          ].ScheduledTime.Split(':')[0]
                                        )
                                      )
                                      .AddMinutes(
                                        Convert.ToDouble(
                                          oScheduledetails[
                                            idx
                                          ].ScheduledTime.Split(':')[1]
                                        )
                                      );
                                }
                                break;
                              default:
                                dtSchDate =
                                  ObjectHelper.CreateType<IPPManagePrescSer.IPPScheduledetails>(
                                    oScheduledetails[idx],
                                    IPPManagePrescSer.IPPScheduledetails
                                  ).ScheduleDate;
                                break;
                            }
                          }
                        } else {
                          dtSchDate =
                            ObjectHelper.CreateType<IPPManagePrescSer.IPPScheduledetails>(
                              oScheduledetails[idx],
                              IPPManagePrescSer.IPPScheduledetails
                            )
                              .ScheduleDate.DateTime.AddHours(
                                Convert.ToDouble(
                                  oScheduledetails[idx].ScheduledTime.Split(
                                    ':'
                                  )[0]
                                )
                              )
                              .AddMinutes(
                                Convert.ToDouble(
                                  oScheduledetails[idx].ScheduledTime.Split(
                                    ':'
                                  )[1]
                                )
                              );
                        }
                      }
                      if (DateTime.GreaterThan(dtTemp, dtSchDate)) {
                        if (OperationMode == 'N') {
                          if (idx < oScheduledetails.Count - 1) {
                            idx++;
                            dtSchDate =
                              ObjectHelper.CreateType<IPPManagePrescSer.IPPScheduledetails>(
                                oScheduledetails[idx],
                                IPPManagePrescSer.IPPScheduledetails
                              )
                                .ScheduleDate.DateTime.AddHours(
                                  Convert.ToDouble(
                                    oScheduledetails[idx].ScheduledTime.Split(
                                      ':'
                                    )[0]
                                  )
                                )
                                .AddMinutes(
                                  Convert.ToDouble(
                                    oScheduledetails[idx].ScheduledTime.Split(
                                      ':'
                                    )[1]
                                  )
                                );
                          }
                        }
                      }
                      if (
                        oScheduledetails[idx] != null &&
                        DateTime.Equals(dtTemp, dtSchDate)
                      ) {
                        if (
                          ObjectHelper.CreateType<IPPManagePrescSer.IPPScheduledetails>(
                            oScheduledetails[idx],
                            IPPManagePrescSer.IPPScheduledetails
                          ).Dose.ToString() != '0'
                        ) {
                          oScheduleDetailsCols.ScheduleDoseValue[j] =
                            ObjectHelper.CreateType<IPPManagePrescSer.IPPScheduledetails>(
                              oScheduledetails[idx],
                              IPPManagePrescSer.IPPScheduledetails
                            ).Dose.ToString();
                          oScheduleDetailsCols.ScheduleDoseUOMs[j] =
                            ' ' + oDoseDet.DoseUOM.UOMName;
                          oScheduleDetailsCols.Scheduledoseflag[j] = true;
                        } else {
                          oScheduleDetailsCols.ScheduleDoseValue[j] =
                            String.Empty;
                          oScheduleDetailsCols.ScheduleDoseUOMs[j] =
                            String.Empty;
                          oScheduleDetailsCols.Scheduledoseflag[j] = false;
                        }
                        idx++;
                      } else {
                        oScheduleDetailsCols.ScheduleDoseValue[j] =
                          String.Empty;
                        oScheduleDetailsCols.ScheduleDoseUOMs[j] = String.Empty;
                        oScheduleDetailsCols.Scheduledoseflag[j] = false;
                      }
                      oScheduleDetailsCols.ScheduleDate[j] = dtTemp;
                      oScheduleDetailsCols.ScheduleDoseUOM =
                        oScheduleDetailsCols.ScheduleDoseUOMs[j].Trim();
                      dtTemp = dtTemp.AddDays(1);
                    }
                  }
                } else {
                  if (OperationMode != 'N') {
                    oScheduledetails =
                      oDoseDet.FrequencyDetails.ScheduledTimes.Select((s) => s)
                        .Where(
                          (s) =>
                            ObjectHelper.CreateType<IPPManagePrescSer.IPPScheduledetails>(
                              s,
                              IPPManagePrescSer.IPPScheduledetails
                            ).ScheduleDate.ToString('HH:mm') ==
                            oMulDoseDet.sceduledTimelst[i]
                        )
                        .ToList();
                  } else {
                    oScheduledetails =
                      oDoseDet.FrequencyDetails.ScheduledTimes.Select((s) => s)
                        .Where(
                          (s) =>
                            DateTime.Parse(s.ScheduledTime).ToString('HH:mm') ==
                            oMulDoseDet.sceduledTimelst[i]
                        )
                        .ToList();
                  }
                  if (oScheduledetails != null && oScheduledetails.Count > 0) {
                    if (OperationMode == 'N') {
                      let oScheduledose: List<IPPManagePrescSer.Scheduledetails> =
                        oScheduledetails
                          .Select((s) => s)
                          .Where(
                            (s) =>
                              ObjectHelper.CreateType<IPPManagePrescSer.IPPScheduledetails>(
                                s,
                                IPPManagePrescSer.IPPScheduledetails
                              ).Dose.ToString() != '0'
                          )
                          .ToList();
                      oScheduleDetailsCols.ScheduleDoseValue = oScheduledose
                        .Select(
                          (s) =>
                            ObjectHelper.CreateType<IPPManagePrescSer.IPPScheduledetails>(
                              s,
                              IPPManagePrescSer.IPPScheduledetails
                            ).Dose.ToString() +
                            ' ' +
                            oDoseDet.DoseUOM.UOMName
                        )
                        .ToArray();
                      oScheduleDetailsCols.Scheduledoseflag = oScheduledose
                        .Select((s) =>
                          ObjectHelper.CreateType<IPPManagePrescSer.IPPScheduledetails>(
                            s,
                            IPPManagePrescSer.IPPScheduledetails
                          ).Dose.ToString().length > 0
                            ? true
                            : false
                        )
                        .ToArray();
                    } else {
                      let oScheduledose: List<IPPManagePrescSer.Scheduledetails> =
                        oScheduledetails
                          .Select((s) => s)
                          .Where(
                            (s) =>
                              s != null &&
                              !String.IsNullOrEmpty(
                                ObjectHelper.CreateType<IPPManagePrescSer.IPPScheduledetails>(
                                  s,
                                  IPPManagePrescSer.IPPScheduledetails
                                ).Dose.ToString()
                              ) &&
                              ObjectHelper.CreateType<IPPManagePrescSer.IPPScheduledetails>(
                                s,
                                IPPManagePrescSer.IPPScheduledetails
                              ).Dose.ToString() != '0'
                          )
                          .ToList();
                      oScheduleDetailsCols.ScheduleDoseValue = oScheduledose
                        .Select(
                          (s) =>
                            ObjectHelper.CreateType<IPPManagePrescSer.IPPScheduledetails>(
                              s,
                              IPPManagePrescSer.IPPScheduledetails
                            ).Dose.ToString() +
                            ' ' +
                            oDoseDet.DoseUOM.UOMName
                        )
                        .ToArray();
                      oScheduleDetailsCols.Scheduledoseflag = oScheduledose
                        .Select((s) =>
                          ObjectHelper.CreateType<IPPManagePrescSer.IPPScheduledetails>(
                            s,
                            IPPManagePrescSer.IPPScheduledetails
                          ).Dose.ToString().length > 0
                            ? true
                            : false
                        )
                        .ToArray();
                    }
                    oScheduleDetailsCols.ScheduleDate = oScheduledetails
                      .Select(
                        (s) =>
                          ObjectHelper.CreateType<IPPManagePrescSer.IPPScheduledetails>(
                            s,
                            IPPManagePrescSer.IPPScheduledetails
                          ).ScheduleDate
                      )
                      .ToArray();
                  }
                }
                if (
                  oScheduleDetailsCols.ScheduleDoseValue != null &&
                  oScheduleDetailsCols.ScheduleDoseValue.length > 0
                ) {
                  oMulDoseDet.ScheduleDetailsData.Add(oScheduleDetailsCols);
                }
              }
              if (
                oMulDoseDet.sceduledTimelst != null &&
                oMulDoseDet.sceduledTimelst.Count > 0 &&
                oDoseDet.vDosageScheduleTimes != null &&
                oDoseDet.vDosageScheduleTimes.Count > 0 &&
                (oMulDoseDet.sceduledTimelst.Count !=
                  oDoseDet.vDosageScheduleTimes.Count ||
                  _IsMissmathDRTimes)
              ) {
                let _sbAdminTimes: StringBuilder = new StringBuilder();
                let iDosageScheduleTimes: List<number> =
                  oDoseDet.vDosageScheduleTimes.OrderBy((x) => x).ToList();
                for (let i: number = 0; i < iDosageScheduleTimes.Count; i++) {
                  _sbAdminTimes.Append(
                    TimeSpan.FromMinutes(iDosageScheduleTimes[i]).ToString(
                      'HH:mm'
                    )
                  );
                  if (i < iDosageScheduleTimes.Count - 1) {
                    _sbAdminTimes.Append('/');
                  }
                }
                if (
                  String.Compare(
                    oDoseDet.FrequencyDetails.IsFixedAdministration.ToString(),
                    'F'
                  ) == 0
                ) {
                  oMulDoseDet.AdministrationTimes =
                    'Fixed - ' + _sbAdminTimes.ToString();
                } else if (
                  String.Compare(
                    oDoseDet.FrequencyDetails.IsFixedAdministration.ToString(),
                    'D'
                  ) == 0
                ) {
                  oMulDoseDet.AdministrationTimes =
                    'Druground - ' + _sbAdminTimes.ToString();
                } else {
                  isIntervalFreq = true;
                }
              } else if (
                oMulDoseDet.sceduledTimelst != null &&
                oMulDoseDet.sceduledTimelst.Count > 0
              ) {
                let iDosageScheduleTimes: List<string> =
                  oMulDoseDet.sceduledTimelst.OrderBy((x) => x).ToList();
                if (
                  String.Compare(
                    oDoseDet.FrequencyDetails.IsFixedAdministration.ToString(),
                    'F'
                  ) == 0
                ) {
                  oMulDoseDet.AdministrationTimes =
                    'Fixed - ' + String.Join('/', iDosageScheduleTimes.array);
                } else if (
                  String.Compare(
                    oDoseDet.FrequencyDetails.IsFixedAdministration.ToString(),
                    'D'
                  ) == 0
                ) {
                  oMulDoseDet.AdministrationTimes =
                    'Druground - ' +
                    String.Join('/', iDosageScheduleTimes.array);
                } else {
                  isIntervalFreq = true;
                }
              }
            } else oMulDoseDet.ScheduleDetailsData = null;
          }
          if (
            (String.Equals(
              oDoseDet.FrequencyType,
              'CC_INTERVAL',
              StringComparison.CurrentCultureIgnoreCase
            ) ||
              isIntervalFreq) &&
            oMulDoseDet.Frequency != null
          ) {
            oMulDoseDet.AdministrationTimes =
              oMulDoseDet.StartDTTM.ToUserDateTimeString('dd-MMM-yyyy HH:mm') +
              ' repeats ' +
              oMulDoseDet.Frequency.DisplayText;
            oMulDoseDet.FullPrescriptionLaunchMode = 'OLD';
          }
        }
        if (oDoseDet != null && oDoseDet.FrequencyDetails != null) {
          oMulDoseDet.SlotTimeMode =
            oDoseDet.FrequencyDetails.IsFixedAdministration;
        }
        if (oDoseDet.Direction != null) {
          oMulDoseDet.IsPRN =
            !String.IsNullOrEmpty(oDoseDet.Direction.Code) &&
            (String.Compare(oDoseDet.Direction.Code, 'CC_MEDDIRECTION') == 0 ||
              String.Compare(oDoseDet.Direction.Code, 'As needed') == 0);
        }
        if (String.IsNullOrEmpty(oMulDoseDet.AdministrationTimes)) {
          oMulDoseDet.AdministrationTimes = oDoseDet.EPRFilterList;
        }
        if (
          oDoseDet.IsDaywise != '1' &&
          (oMulDoseDet.AdminTimesData == null ||
            oMulDoseDet.FreqDetails == null) &&
          (oDoseDet.Frequency != null ||
            oDoseDet.FixedTimes != null ||
            oDoseDet.DrugroundTimes != null)
        ) {
          if (oMulDoseDet.oAdminTimesVM == null) {
            oMulDoseDet.oAdminTimesVM = new AdminstrativeTimesVM();
            oMulDoseDet.oAdminTimesVM.FreqDetails = ObjectHelper.CreateObject(
              new IPPManagePrescSer.CResMsgGetAdministrationTimes(),
              {
                oFrequency: oDoseDet.Frequency,
                oFixedTimes: oDoseDet.FixedTimes,
                oDrugRoundTimes: oDoseDet.DrugroundTimes,
              }
            );
            if (
              oMulDoseDet.sceduledTimelst != null &&
              oMulDoseDet.sceduledTimelst.Count > 0
            ) {
              oMulDoseDet.oAdminTimesVM.FillAdministrationTimes(
                oMulDoseDet.sceduledTimelst,
                oMulDoseDet.SlotTimeMode
              );
            } else {
              oMulDoseDet.oAdminTimesVM.FillAdministrationTimes(
                oMulDoseDet.oAdminTimesVM.FreqDetails
              );
            }
          }
        }
        let objDaysOfWeek: ArrayOfString = (<
          IPPManagePrescSer.IPPFrequencyDetails
          >oDoseDet.FrequencyDetails).DaysOfWeek;
        if (objDaysOfWeek != null) {
          for (
            let iDayOfWeek: number = 0;
            iDayOfWeek < objDaysOfWeek.Count;
            iDayOfWeek++
          ) {
            let IsDaySelected: boolean = false;
            if (
              String.Equals(
                objDaysOfWeek[iDayOfWeek],
                'True',
                StringComparison.InvariantCultureIgnoreCase
              ) ||
              String.Equals(
                objDaysOfWeek[iDayOfWeek],
                'T',
                StringComparison.InvariantCultureIgnoreCase
              )
            ) {
              IsDaySelected = true;
            }
            if (
              oMulDoseDet.FreqDetails != null &&
              oMulDoseDet.FreqDetails.oFrequency != null
            ) {
              switch (iDayOfWeek) {
                case 0:
                  oMulDoseDet.FreqDetails.oFrequency.IsSunday = IsDaySelected;
                  break;
                case 1:
                  oMulDoseDet.FreqDetails.oFrequency.IsMonday = IsDaySelected;
                  break;
                case 2:
                  oMulDoseDet.FreqDetails.oFrequency.IsTuesday = IsDaySelected;
                  break;
                case 3:
                  oMulDoseDet.FreqDetails.oFrequency.IsWednesday =
                    IsDaySelected;
                  break;
                case 4:
                  oMulDoseDet.FreqDetails.oFrequency.IsThursday = IsDaySelected;
                  break;
                case 5:
                  oMulDoseDet.FreqDetails.oFrequency.IsFriday = IsDaySelected;
                  break;
                case 6:
                  oMulDoseDet.FreqDetails.oFrequency.IsSaturday = IsDaySelected;
                  break;
              }
            }
            if (
              oMulDoseDet.oAdminTimesVM != null &&
              oMulDoseDet.oAdminTimesVM.FreqDetails != null &&
              oMulDoseDet.oAdminTimesVM.FreqDetails.oFrequency != null
            ) {
              switch (iDayOfWeek) {
                case 0:
                  oMulDoseDet.oAdminTimesVM.FreqDetails.oFrequency.IsSunday =
                    IsDaySelected;
                  break;
                case 1:
                  oMulDoseDet.oAdminTimesVM.FreqDetails.oFrequency.IsMonday =
                    IsDaySelected;
                  break;
                case 2:
                  oMulDoseDet.oAdminTimesVM.FreqDetails.oFrequency.IsTuesday =
                    IsDaySelected;
                  break;
                case 3:
                  oMulDoseDet.oAdminTimesVM.FreqDetails.oFrequency.IsWednesday =
                    IsDaySelected;
                  break;
                case 4:
                  oMulDoseDet.oAdminTimesVM.FreqDetails.oFrequency.IsThursday =
                    IsDaySelected;
                  break;
                case 5:
                  oMulDoseDet.oAdminTimesVM.FreqDetails.oFrequency.IsFriday =
                    IsDaySelected;
                  break;
                case 6:
                  oMulDoseDet.oAdminTimesVM.FreqDetails.oFrequency.IsSaturday =
                    IsDaySelected;
                  break;
              }
            }
          }
        }
        StepDoseGridColms1.Add(oMulDoseDet);
      });
    }
    this.StepDoseGridColms = new ObservableCollection<MultipleDoseDetail>(
      StepDoseGridColms1
    );
  }
  public GetTitratedDoseInfo(
    PrescriptionItemOID: number,
    sMcVersion: string
  ): void {
    if (PrescriptionItemOID > 0 && !String.IsNullOrEmpty(sMcVersion)) {
      let oReqTitratedDoseInfo: IPPManagePrescSer.CReqMsgGetTitratedDoseInfo =
        new IPPManagePrescSer.CReqMsgGetTitratedDoseInfo();
      oReqTitratedDoseInfo.PrescriptionItemOIDBC = PrescriptionItemOID;
      oReqTitratedDoseInfo.oContextInformation = CommonBB.FillContext();
      let oPresWS: IPPManagePrescSer.IPPMAManagePrescriptionWSSoapClient =
        new IPPManagePrescSer.IPPMAManagePrescriptionWSSoapClient();
      oPresWS.GetTitratedDoseInfoCompleted = (s, e) => {
        this.oPresWS_GetTitratedDoseInfoCompleted(s, e);
      };
      oPresWS.GetTitratedDoseInfoAsync(oReqTitratedDoseInfo);
    }
  }
  oPresWS_GetTitratedDoseInfoCompleted(
    sender: Object,
    e: IPPManagePrescSer.GetTitratedDoseInfoCompletedEventArgs
  ): void {
    let _ErrorID: number = 80000128;
    let _ErrorSource: string =
      'LorAppMedicationCommonBB.dll, Class:Prescriptionitemdetailsvm, Method:oPresWS_GetTitratedDoseInfoCompleted()';
    if (e.Error == null) {
      try {
        let oResTitratedDoseInfo: IPPManagePrescSer.CResMsgGetTitratedDoseInfo =
          e.Result;
        this.FillDataContextTitratedDose(
          oResTitratedDoseInfo.oDose.DoseRegime,
          ''
        );
      } catch (ex: any) {
        let lnReturn: number = AMSHelper.PublicExceptionDetails(
          _ErrorID,
          _ErrorSource,
          ex
        );
      }
    } else {
      let lnReturn: number = AMSHelper.PublicExceptionDetails(
        _ErrorID,
        _ErrorSource,
        e.Error
      );
    }
    if (this.TitratedDoseCompleted != null) this.TitratedDoseCompleted();
  }
  private FillDataContextTitratedDose(
    oDoseRegime: ObservableCollection<IPPManagePrescSer.DoseRegime>,
    OperationMode: string
  ): void {
    this.StepDoseGridColms = new ObservableCollection<MultipleDoseDetail>();
    let oStartDTTM: DateTime;
    let oEndDTTM: DateTime;
    let lstDate: List<DateTime>;
    let lstSchedDayofWeek: List<SchedDayOfWeek> = null;
    let lstSchDTTMForWeekly: List<DateTime> = null;
    if (oDoseRegime != null && oDoseRegime.Count > 0) {
      oDoseRegime.forEach((oDoseDet) => {
        let oMulDoseDet: MultipleDoseDetail = new MultipleDoseDetail();
        if (oDoseDet.DoseUOM instanceof IPPManagePrescSer.UOM) {
          oMulDoseDet.DoseUOM = ObjectHelper.CreateObject(new CListItem(), {
            DisplayText: oDoseDet.DoseUOM.UOMName,
            Value: oDoseDet.DoseUOM.UOMId?.ToString(),
          });
        }
        if (oDoseDet.Duration instanceof IPPManagePrescSer.MeasurableObject) {
          oMulDoseDet.Duration = oDoseDet.Duration.Value;
          oMulDoseDet.DurationUOM = ObjectHelper.CreateObject(new CListItem(), {
            DisplayText: oDoseDet.Duration.UOMName,
            Value: oDoseDet.Duration.UOMCode,
          });
        }
        if (!String.IsNullOrEmpty(oDoseDet.DurationUOMCode)) {
          if (oMulDoseDet.DurationUOM == null)
            oMulDoseDet.DurationUOM = new CListItem();
          oMulDoseDet.DurationUOM.Value = oDoseDet.DurationUOMCode;
        }
        oDoseDet.StartDTTM = oDoseDet.StartDTTM.ConvertToUser(
          (o1) => {
            this.IsDST = o1;
          },
          (o2) => {
            this.IsAmbiguous = o2;
          },
          (o3) => {
            this.IsInvalid = o3;
          }
        );
        oDoseDet.EndDTTM = oDoseDet.EndDTTM.ConvertToUser(
          (o1) => {
            this.IsDST = o1;
          },
          (o2) => {
            this.IsAmbiguous = o2;
          },
          (o3) => {
            this.IsInvalid = o3;
          }
        );
        oMulDoseDet.StartDTTM = oDoseDet.StartDTTM;
        oMulDoseDet.EndDTTM = oDoseDet.EndDTTM;
        if (
          oDoseDet.FrequencyDetails instanceof
          IPPManagePrescSer.FrequencyDetails &&
          String.Compare(
            OperationMode,
            'N',
            StringComparison.OrdinalIgnoreCase
          ) != 0
        ) {
          if (
            oDoseDet.FrequencyDetails.ScheduledTimes != null &&
            oDoseDet.FrequencyDetails.ScheduledTimes.Count > 0
          ) {
            oMulDoseDet.ScheduleDetailsData =
              new ObservableCollection<ScheduleDetailsCols>();
            let dtmTimelst: List<DateTime> = new List<DateTime>();
            let dtmScheduleDate: List<DateTime> = new List<DateTime>();
            let strHourMinFormat: DateTime = new DateTime();
            let TempDate: DateTime = DateTime.MinValue;
            let IPPSchdDetails: IPPManagePrescSer.IPPScheduledetails;
            for (
              let i: number = 0;
              i < oDoseDet.FrequencyDetails.ScheduledTimes.Count;
              i++
            ) {
              IPPSchdDetails =
                ObjectHelper.CreateType<IPPManagePrescSer.IPPScheduledetails>(
                  oDoseDet.FrequencyDetails.ScheduledTimes[i],
                  IPPManagePrescSer.IPPScheduledetails
                );
              if (IPPSchdDetails == null) continue;
              IPPSchdDetails.ScheduleDate =
                IPPSchdDetails.ScheduleDate.ConvertToUser(
                  (o1) => {
                    this.IsDST = o1;
                  },
                  (o2) => {
                    this.IsAmbiguous = o2;
                  },
                  (o3) => {
                    this.IsInvalid = o3;
                  }
                );
              if (IPPSchdDetails.ScheduleDate.Year > 1753) {
                strHourMinFormat = Convert.ToDateTime(
                  ObjectHelper.CreateType<IPPManagePrescSer.IPPScheduledetails>(
                    oDoseDet.FrequencyDetails.ScheduledTimes[i],
                    IPPManagePrescSer.IPPScheduledetails
                  ).ScheduleDate.Hour.ToString() +
                  ':' +
                  ObjectHelper.CreateType<IPPManagePrescSer.IPPScheduledetails>(
                    oDoseDet.FrequencyDetails.ScheduledTimes[i],
                    IPPManagePrescSer.IPPScheduledetails
                  ).ScheduleDate.Minute.ToString('00')
                );
                if (!dtmTimelst.Contains(strHourMinFormat)) {
                  dtmTimelst.Add(strHourMinFormat);
                }
                if (
                  !dtmScheduleDate.Contains(
                    ObjectHelper.CreateType<IPPManagePrescSer.IPPScheduledetails>(
                      oDoseDet.FrequencyDetails.ScheduledTimes[i],
                      IPPManagePrescSer.IPPScheduledetails
                    ).ScheduleDate.Date
                  )
                ) {
                  dtmScheduleDate.Add(
                    ObjectHelper.CreateType<IPPManagePrescSer.IPPScheduledetails>(
                      oDoseDet.FrequencyDetails.ScheduledTimes[i],
                      IPPManagePrescSer.IPPScheduledetails
                    ).ScheduleDate.Date
                  );
                }
                if (
                  !String.IsNullOrEmpty(IPPSchdDetails.DosewithUOM) &&
                  DateTime.GreaterThan(IPPSchdDetails.ScheduleDate, TempDate)
                ) {
                  TempDate = IPPSchdDetails.ScheduleDate;
                }
              }
            }
            if (
              DateTime.Equals(oMulDoseDet.EndDTTM, DateTime.MinValue) &&
              DateTime.GreaterThan(TempDate, oMulDoseDet.StartDTTM)
            ) {
              oMulDoseDet.EndDTTM =
                TempDate.DateTime.AddHours(23).AddMinutes(59);
            }
            let sceduledTimelst = dtmTimelst.OrderBy((dt) => dt);
            if (sceduledTimelst.Count() > 0) {
              let nDayCount: number = 0;
              let nSchCount: number = 0;
              let nNoDurationDayCount: number = 0;
              oStartDTTM = oDoseDet.StartDTTM;
              oEndDTTM = oDoseDet.EndDTTM;
              if (!dtmScheduleDate.Contains(oStartDTTM.Date))
                dtmScheduleDate.Add(oStartDTTM.Date);
              let oScheduleDate = dtmScheduleDate
                .Select((s) => s)
                .OrderBy((s) => s.Date);
              lstDate = new List<DateTime>();
              let bIsCurrentDate: boolean = false;
              oEndDTTM =
                DateTime.Equals(oMulDoseDet.EndDTTM, DateTime.MinValue)
                  ? SLDateUtility.GetServerDateTime()
                    .DateTime.AddHours(23)
                    .AddMinutes(59)
                  : oMulDoseDet.EndDTTM;
              while (DateTime.LessThanOrEqualTo(oStartDTTM.Date, oEndDTTM.Date)) {
                lstDate.Add(oStartDTTM);
                oStartDTTM = oStartDTTM.AddDays(1);
              }
              if (oMulDoseDet.EndDTTM.Equals(DateTime.MinValue))
                oMulDoseDet.EndDTTM = SLDateUtility.GetServerDateTime()
                  .DateTime.AddHours(23)
                  .AddMinutes(59);
              nNoDurationDayCount = lstDate.Count;
              nDayCount = oScheduleDate.Count();
              if (nDayCount < nNoDurationDayCount) {
                nDayCount = nNoDurationDayCount;
                bIsCurrentDate = true;
              }
              let oTempDTTM: DateTime = new DateTime();
              sceduledTimelst.forEach((schList) => {
                let k: number = 0;
                let oScheduleDetailsCols: ScheduleDetailsCols =
                  new ScheduleDetailsCols();
                oScheduleDetailsCols.ScheduleTime = schList.ToString('HH:mm');
                oScheduleDetailsCols.IsSavedData = true;
                oScheduleDetailsCols.ScheduleDate = new Array(nDayCount);
                oScheduleDetailsCols.ScheduleDoseValue = new Array(nDayCount);
                oScheduleDetailsCols.Scheduledoseflag = new Array(nDayCount);
                oScheduleDetailsCols.ScheduleDoseUOMs = new Array(nDayCount);
                nSchCount = oDoseDet.FrequencyDetails.ScheduledTimes.Count;
                let lstTemp: List<DateTime> = bIsCurrentDate
                  ? lstDate
                  : oScheduleDate.ToList();
                let lstScheduleGenereated: List<DateTime> =
                  new List<DateTime>();
                lstTemp.forEach((dtTemp) => {
                  let bSlotGenerated: boolean = false;
                  for (let nSlot: number = 0; nSlot < nSchCount; nSlot++) {
                    console.log("If LHS ", dtTemp.DateTime.Add(schList.TimeOfDay));
                    let objecthelperdate = ObjectHelper.CreateType<IPPManagePrescSer.IPPScheduledetails>(
                      oDoseDet.FrequencyDetails.ScheduledTimes[nSlot],
                      IPPManagePrescSer.IPPScheduledetails
                    ).ScheduleDate;
                    console.log("If RHS ", ObjectHelper.CreateType<IPPManagePrescSer.IPPScheduledetails>(
                      oDoseDet.FrequencyDetails.ScheduledTimes[nSlot],
                      IPPManagePrescSer.IPPScheduledetails
                    ).ScheduleDate);
                    console.log("Result== ", DateTime.Equals(dtTemp.DateTime.Add(schList.TimeOfDay),
                      ObjectHelper.CreateType<IPPManagePrescSer.IPPScheduledetails>(
                        oDoseDet.FrequencyDetails.ScheduledTimes[nSlot],
                        IPPManagePrescSer.IPPScheduledetails
                    ).ScheduleDate));
                    console.log("ResultEquals ", dtTemp.DateTime.Add(schList.TimeOfDay).Equals(
                      ObjectHelper.CreateType<IPPManagePrescSer.IPPScheduledetails>(
                        oDoseDet.FrequencyDetails.ScheduledTimes[nSlot],
                        IPPManagePrescSer.IPPScheduledetails
                      ).ScheduleDate))
                    if (
                      dtTemp.DateTime.Add(schList.TimeOfDay).Equals(
                        ObjectHelper.CreateType<IPPManagePrescSer.IPPScheduledetails>(
                          oDoseDet.FrequencyDetails.ScheduledTimes[nSlot],
                          IPPManagePrescSer.IPPScheduledetails
                        ).ScheduleDate) &&
                      !lstScheduleGenereated.Contains(dtTemp.Date)
                    ) {
                      bSlotGenerated = true;
                      break;
                    }
                  }
                  oTempDTTM.ConvertToUser(
                    (o1) => {
                      this.IsDST = o1;
                    },
                    (o2) => {
                      this.IsAmbiguous = o2;
                    },
                    (o3) => {
                      this.IsInvalid = o3;
                    }
                  );
                  if (
                    !bSlotGenerated &&
                    !lstScheduleGenereated.Contains(dtTemp.Date)
                  ) {
                    lstScheduleGenereated.Add(dtTemp.Date);
                    oScheduleDetailsCols.ScheduleDate[k] = dtTemp.Date;
                    if (
                      DateTime.LessThan(dtTemp.DateTime.Add(schList.TimeOfDay),
                        oMulDoseDet.StartDTTM) ||
                      (DateTime.NotEquals(oMulDoseDet.EndDTTM, DateTime.MinValue) &&
                        DateTime.GreaterThan(dtTemp.DateTime.Add(schList.TimeOfDay),
                          oMulDoseDet.EndDTTM)) ||
                      (!String.IsNullOrEmpty(
                        oDoseDet.FrequencyDetails.FrequencyUOM
                      ) &&
                        String.Equals(
                          oDoseDet.FrequencyDetails.FrequencyUOM,
                          ConstDurationUOM.Weeks,
                          StringComparison.InvariantCultureIgnoreCase
                        ))
                    ) {
                      oScheduleDetailsCols.ScheduleDoseValue[k] = String.Empty;
                      oScheduleDetailsCols.Scheduledoseflag[k] = false;
                    } else if (!this.IsDST) {
                      oScheduleDetailsCols.ScheduleDoseValue[k] =
                        k == 0 ? String.Empty : 'TBD';
                      oScheduleDetailsCols.Scheduledoseflag[k] =
                        k == 0 ? false : true;
                    }
                    k++;
                  } else {
                    for (let j: number = 0; j < nSchCount; j++) {
                      if (nDayCount == k) {
                        break;
                      }
                      oTempDTTM =
                        ObjectHelper.CreateType<IPPManagePrescSer.IPPScheduledetails>(
                          oDoseDet.FrequencyDetails.ScheduledTimes[j],
                          IPPManagePrescSer.IPPScheduledetails
                        ).ScheduleDate;
                      if (j < nSchCount) {
                        let bSlotAvailable: boolean = false;
                        for (
                          let nCount: number = 0;
                          nCount < nSchCount;
                          nCount++
                        ) {
                          if (
                            oTempDTTM.DateTime.Add(schList.TimeOfDay).Equals(
                              ObjectHelper.CreateType<IPPManagePrescSer.IPPScheduledetails>(
                                oDoseDet.FrequencyDetails.ScheduledTimes[nCount],
                                IPPManagePrescSer.IPPScheduledetails
                              ).ScheduleDate)
                          ) {
                            bSlotAvailable = true;
                            break;
                          }
                        }
                        if (
                          bSlotAvailable &&
                          !lstScheduleGenereated.Contains(oTempDTTM.Date)
                        ) {
                          strHourMinFormat = Convert.ToDateTime(
                            oTempDTTM.Hour.ToString() +
                            ':' +
                            oTempDTTM.Minute.ToString('00')
                          );
                          //if (DateTime.Equals(schList.TimeOfDay, strHourMinFormat.TimeOfDay)) {
                          if (schList.TimeOfDay.Equals(strHourMinFormat.TimeOfDay)) {
                            let sDoseValue: string =
                              ObjectHelper.CreateType<IPPManagePrescSer.IPPScheduledetails>(
                                oDoseDet.FrequencyDetails.ScheduledTimes[j],
                                IPPManagePrescSer.IPPScheduledetails
                              ).DosewithUOM;
                            if (
                              DateTime.LessThan(oTempDTTM, oMulDoseDet.StartDTTM) ||
                              (!oMulDoseDet.EndDTTM.Equals(DateTime.MinValue) &&
                                DateTime.GreaterThan(oTempDTTM, oMulDoseDet.EndDTTM))
                            ) {
                              oScheduleDetailsCols.ScheduleDate[k] =
                                oTempDTTM.Date;
                              oScheduleDetailsCols.ScheduleDoseValue[k] = '';
                              oScheduleDetailsCols.Scheduledoseflag[k] = false;
                            } else {
                              oScheduleDetailsCols.ScheduleDate[k] =
                                oTempDTTM.Date;
                              oScheduleDetailsCols.ScheduleDoseValue[k] =
                                String.Compare(sDoseValue, '0') == 0 ||
                                  String.IsNullOrEmpty(sDoseValue)
                                  ? 'TBD'
                                  : ObjectHelper.CreateType<IPPManagePrescSer.IPPScheduledetails>(
                                    oDoseDet.FrequencyDetails.ScheduledTimes[
                                    j
                                    ],
                                    IPPManagePrescSer.IPPScheduledetails
                                  ).DosewithUOM;
                              oScheduleDetailsCols.Scheduledoseflag[k] = true;
                            }
                            lstScheduleGenereated.Add(oTempDTTM.Date);
                            k++;
                          }
                        } else {
                          if (
                            k == 0 &&
                            oScheduleDetailsCols.ScheduleDate[k].Date !=
                            oTempDTTM.Date
                          ) {
                            if (!lstScheduleGenereated.Contains(oTempDTTM.Date))
                              lstScheduleGenereated.Add(oTempDTTM.Date);
                            oScheduleDetailsCols.ScheduleDate[k] =
                              oTempDTTM.Date;
                            oScheduleDetailsCols.ScheduleDoseValue[k] =
                              String.Empty;
                            oScheduleDetailsCols.Scheduledoseflag[k] = false;
                            k++;
                          }
                        }
                      }
                    }
                  }
                });
                oMulDoseDet.ScheduleDetailsData.Add(oScheduleDetailsCols);
              });
            } else oMulDoseDet.ScheduleDetailsData = null;
          }
        } else {
          if (
            oDoseDet.FrequencyDetails.ScheduledTimes != null &&
            oDoseDet.FrequencyDetails.ScheduledTimes.Count > 0
          ) {
            oMulDoseDet.ScheduleDetailsData =
              new ObservableCollection<ScheduleDetailsCols>();
            let sceduledTimelst: List<string> = new List<string>();
            lstDate = new List<DateTime>();
            oStartDTTM = oDoseDet.StartDTTM;
            oEndDTTM = oDoseDet.EndDTTM;
            let strHourMinFormat: string = String.Empty;
            let SchdDetails: IPPManagePrescSer.Scheduledetails;
            for (
              let i: number = 0;
              i < oDoseDet.FrequencyDetails.ScheduledTimes.Count;
              i++
            ) {
              SchdDetails = oDoseDet.FrequencyDetails.ScheduledTimes[i];
              if (SchdDetails == null) continue;
              if (oDoseDet.StartDTTM.Year > 1753) {
                strHourMinFormat = oDoseDet.StartDTTM.ConvertToLocal(this.IsDST)
                  .DateTime.AddHours(
                    Convert.ToDouble(
                      oDoseDet.FrequencyDetails.ScheduledTimes[
                        i
                      ].ScheduledTime.Split(':')[0]
                    )
                  )
                  .AddMinutes(
                    Convert.ToDouble(
                      oDoseDet.FrequencyDetails.ScheduledTimes[
                        i
                      ].ScheduledTime.Split(':')[1]
                    )
                  )
                  .ConvertToUser(
                    (o1) => {
                      this.IsDST = o1;
                    },
                    (o2) => {
                      this.IsAmbiguous = o2;
                    },
                    (o3) => {
                      this.IsInvalid = o3;
                    }
                  )
                  .ToString('HH:mm');
                if (!sceduledTimelst.Contains(strHourMinFormat)) {
                  sceduledTimelst.Add(strHourMinFormat);
                }
              }
            }
            if (
              oDoseDet.FrequencyDetails != null &&
              (<IPPManagePrescSer.IPPFrequencyDetails>oDoseDet.FrequencyDetails)
                .DaysOfWeek != null
            ) {
              let oDaysOfWeek: ArrayOfString = (<
                IPPManagePrescSer.IPPFrequencyDetails
                >oDoseDet.FrequencyDetails).DaysOfWeek;
              let oPrescStartdayofweek: DayOfWeek =
                oDoseDet.StartDTTM.DayOfWeek;
              lstSchedDayofWeek = new List<SchedDayOfWeek>();
              let oSchedDayOfWeek: SchedDayOfWeek;
              if (oDaysOfWeek != null) {
                let nCount: number = oDaysOfWeek.Count;
                for (
                  let iDayOfWeek: number = 0;
                  iDayOfWeek < nCount;
                  iDayOfWeek++
                ) {
                  oSchedDayOfWeek = new SchedDayOfWeek();
                  switch (iDayOfWeek) {
                    case 0:
                      oSchedDayOfWeek.oDayofweek = DayOfWeek.Sunday;
                      oSchedDayOfWeek.SelectedDay =
                        oDaysOfWeek[iDayOfWeek] == 'True' ||
                          oDaysOfWeek[iDayOfWeek] == 'T'
                          ? true
                          : false;
                      break;
                    case 1:
                      oSchedDayOfWeek.oDayofweek = DayOfWeek.Monday;
                      oSchedDayOfWeek.SelectedDay =
                        oDaysOfWeek[iDayOfWeek] == 'True' ||
                          oDaysOfWeek[iDayOfWeek] == 'T'
                          ? true
                          : false;
                      break;
                    case 2:
                      oSchedDayOfWeek.oDayofweek = DayOfWeek.Tuesday;
                      oSchedDayOfWeek.SelectedDay =
                        oDaysOfWeek[iDayOfWeek] == 'True' ||
                          oDaysOfWeek[iDayOfWeek] == 'T'
                          ? true
                          : false;
                      break;
                    case 3:
                      oSchedDayOfWeek.oDayofweek = DayOfWeek.Wednesday;
                      oSchedDayOfWeek.SelectedDay =
                        oDaysOfWeek[iDayOfWeek] == 'True' ||
                          oDaysOfWeek[iDayOfWeek] == 'T'
                          ? true
                          : false;
                      break;
                    case 4:
                      oSchedDayOfWeek.oDayofweek = DayOfWeek.Thursday;
                      oSchedDayOfWeek.SelectedDay =
                        oDaysOfWeek[iDayOfWeek] == 'True' ||
                          oDaysOfWeek[iDayOfWeek] == 'T'
                          ? true
                          : false;
                      break;
                    case 5:
                      oSchedDayOfWeek.oDayofweek = DayOfWeek.Friday;
                      oSchedDayOfWeek.SelectedDay =
                        oDaysOfWeek[iDayOfWeek] == 'True' ||
                          oDaysOfWeek[iDayOfWeek] == 'T'
                          ? true
                          : false;
                      break;
                    case 6:
                      oSchedDayOfWeek.oDayofweek = DayOfWeek.Saturday;
                      oSchedDayOfWeek.SelectedDay =
                        oDaysOfWeek[iDayOfWeek] == 'True' ||
                          oDaysOfWeek[iDayOfWeek] == 'T'
                          ? true
                          : false;
                      break;
                  }
                  lstSchedDayofWeek.Add(oSchedDayOfWeek);
                }
              }
              if (
                DateTime.NotEquals(oDoseDet.StartDTTM, DateTime.MinValue) &&
                lstSchedDayofWeek != null &&
                lstSchedDayofWeek.Count > 0
              ) {
                lstSchDTTMForWeekly = new List<DateTime>();
                let oTempDTTM: DateTime = new DateTime();
                let J: number = 0;
                let Min: number = 0;
                let time: TimeSpan;
                let oScheduleDTTM: DateTime;
                let ActualScheduleCount = lstSchedDayofWeek
                  .Where((c) => c.SelectedDay)
                  .Select((s) => s)
                  .ToList();
                oTempDTTM = oDoseDet.StartDTTM;
                if (sceduledTimelst != null && sceduledTimelst.Count > 0) {
                  Min = DateTime.Parse(sceduledTimelst[0]).TimeOfDay
                    .TotalMinutes;
                }
                time = TimeSpan.FromMinutes(Min);
                oScheduleDTTM = oTempDTTM.DateTime.Add(time);
                for (let i: number = 0; i < 13; i++) {
                  oScheduleDTTM = oTempDTTM.DateTime.Add(time);
                  if (
                    (ActualScheduleCount[J].oDayofweek == oTempDTTM.DayOfWeek) &&
                    DateTime.GreaterThanOrEqualTo(oScheduleDTTM, SLDateUtility.GetServerDateTime())
                  ) {
                    J = J + 1;
                    lstSchDTTMForWeekly.Add(oTempDTTM);
                  }
                  oTempDTTM = oTempDTTM.AddDays(1);
                  if (ActualScheduleCount.Count == J) {
                    break;
                  }
                }
                oEndDTTM = lstSchDTTMForWeekly.LastOrDefault();
                oMulDoseDet.EndDTTM = oEndDTTM;
              }
            }
            if (DateTime.Equals(oEndDTTM, DateTime.MinValue)) oEndDTTM = oStartDTTM;
            while (DateTime.LessThanOrEqualTo(oStartDTTM, oEndDTTM)) {
              lstDate.Add(oStartDTTM);
              oStartDTTM = oStartDTTM.AddDays(1);
            }
            if (sceduledTimelst != null && sceduledTimelst.Count > 0) {
              let nDayCount: number = iMath.Abs(
                (oDoseDet.FrequencyDetails.ScheduledTimes.Count *
                  lstDate.Count) /
                sceduledTimelst.Count
              );
              let IsFirstSlot: Boolean = true;
              for (let i: number = 0; i < sceduledTimelst.Count; i++) {
                let k: number = 0;
                let oScheduleDetailsCols: ScheduleDetailsCols =
                  new ScheduleDetailsCols();
                oScheduleDetailsCols.IsSavedData = false;
                oScheduleDetailsCols.ScheduleTime = sceduledTimelst[i];
                oScheduleDetailsCols.ScheduleDate = new Array(nDayCount);
                oScheduleDetailsCols.ScheduleDoseValue = new Array(nDayCount);
                oScheduleDetailsCols.Scheduledoseflag = new Array(nDayCount);
                oScheduleDetailsCols.ScheduleDoseUOMs = new Array(nDayCount);
                if (DateTime.Equals(oMulDoseDet.EndDTTM, DateTime.MinValue))
                  oMulDoseDet.EndDTTM = oMulDoseDet.StartDTTM;
                for (
                  let j: number = 0;
                  j < oDoseDet.FrequencyDetails.ScheduledTimes.Count;
                  j++
                ) {
                  if (nDayCount == k) {
                    break;
                  }
                  strHourMinFormat = oDoseDet.StartDTTM.ConvertToLocal(
                    this.IsDST
                  )
                    .DateTime.AddHours(
                      Convert.ToDouble(
                        oDoseDet.FrequencyDetails.ScheduledTimes[
                          j
                        ].ScheduledTime.Split(':')[0]
                      )
                    )
                    .AddMinutes(
                      Convert.ToDouble(
                        oDoseDet.FrequencyDetails.ScheduledTimes[
                          j
                        ].ScheduledTime.Split(':')[1]
                      )
                    )
                    .ConvertToUser(
                      (o1) => {
                        this.IsDST = o1;
                      },
                      (o2) => {
                        this.IsAmbiguous = o2;
                      },
                      (o3) => {
                        this.IsInvalid = o3;
                      }
                    )
                    .ToString('HH:mm');
                  if (sceduledTimelst[i] == strHourMinFormat) {
                    for (let m: number = 0; m < lstDate.Count; m++) {
                      let sDoseValue: string = oDoseDet.LowerDose.ToString();
                      if (!IsFirstSlot) {
                        sDoseValue = '0';
                      }
                      let oDttm: DateTime = lstDate[m].DateTime.AddHours(
                        Convert.ToDouble(strHourMinFormat.Split(':')[0])
                      ).AddMinutes(
                        Convert.ToDouble(strHourMinFormat.Split(':')[1])
                      );
                      if (
                        lstSchDTTMForWeekly != null &&
                        lstSchDTTMForWeekly.Count > 0
                      ) {
                        let nCount: number = lstSchDTTMForWeekly.Count;
                        for (let indx: number = 0; indx < nCount; indx++) {
                          oScheduleDetailsCols.ScheduleDate[k] =
                            lstDate[m].Date;
                          if (
                            DateTime.Equals(lstSchDTTMForWeekly[indx].Date, lstDate[m].Date) &&
                            DateTime.GreaterThan(oDttm, oMulDoseDet.StartDTTM)
                          ) {
                            if (IsFirstSlot && oDoseDet.LowerDose > 0) {
                              oScheduleDetailsCols.ScheduleDoseValue[k] =
                                oDoseDet.LowerDose.ToString();
                              oScheduleDetailsCols.ScheduleDoseUOMs[k] =
                                ' ' + oDoseDet.DoseUOM.UOMName;
                              IsFirstSlot = false;
                            } else {
                              oScheduleDetailsCols.ScheduleDoseValue[k] = 'TBD';
                              oScheduleDetailsCols.ScheduleDoseUOMs[k] =
                                String.Empty;
                            }
                            oScheduleDetailsCols.Scheduledoseflag[k] = true;
                            break;
                          } else {
                            oScheduleDetailsCols.ScheduleDoseValue[k] = '';
                            oScheduleDetailsCols.ScheduleDoseUOMs[k] = '';
                            oScheduleDetailsCols.Scheduledoseflag[k] = false;
                          }
                        }
                      } else {
                        if (
                          DateTime.Equals(lstDate[m].Date, oMulDoseDet.StartDTTM.Date) &&
                          DateTime.LessThan(oDttm, oMulDoseDet.StartDTTM)
                        ) {
                          oScheduleDetailsCols.ScheduleDate[k] =
                            lstDate[m].Date;
                          oScheduleDetailsCols.ScheduleDoseValue[k] = '';
                          oScheduleDetailsCols.ScheduleDoseUOMs[k] = '';
                          oScheduleDetailsCols.Scheduledoseflag[k] = false;
                        } else if (
                          DateTime.Equals(lstDate[m].Date, oMulDoseDet.StartDTTM.Date)
                        ) {
                          oScheduleDetailsCols.ScheduleDate[k] =
                            lstDate[m].Date;
                          oScheduleDetailsCols.ScheduleDoseValue[k] =
                            String.Compare(sDoseValue, '0') == 0
                              ? 'TBD'
                              : oDoseDet.LowerDose.ToString();
                          oScheduleDetailsCols.ScheduleDoseUOMs[k] =
                            String.Compare(sDoseValue, '0') == 0
                              ? String.Empty
                              : ' ' + oDoseDet.DoseUOM.UOMName;
                          oScheduleDetailsCols.Scheduledoseflag[k] = true;
                          IsFirstSlot = false;
                        } else {
                          oScheduleDetailsCols.ScheduleDate[k] =
                            lstDate[m].Date;
                          oScheduleDetailsCols.ScheduleDoseValue[k] = 'TBD';
                          oScheduleDetailsCols.Scheduledoseflag[k] = true;
                          oScheduleDetailsCols.ScheduleDoseUOMs[k] =
                            String.Empty;
                        }
                      }
                      oScheduleDetailsCols.ScheduleDoseUOM =
                        oScheduleDetailsCols.ScheduleDoseUOMs[k].Trim();
                      k++;
                    }
                  }
                }
                oMulDoseDet.ScheduleDetailsData.Add(oScheduleDetailsCols);
              }
            } else oMulDoseDet.ScheduleDetailsData = null;
          }
        }
        this.StepDoseGridColms.Add(oMulDoseDet);
      });
    }
  }
  public IsfixedTime: boolean = false;
}
export class GrdAdminstrativeTimesCols extends ClonableViewModelBase {
  private isFixedEnabled: boolean = false;
  public get IsFixedEnabled(): boolean {
    return this.isFixedEnabled;
  }
  public set IsFixedEnabled(value: boolean) {
    if (!ObjectHelper.ReferenceEquals(this.isFixedEnabled, value)) {
      this.isFixedEnabled = value;
      //NotifyPropertyChanged("IsFixedEnabled");
    }
  }
  public LowPreiodInMinitus: number = 0;
  private isDrugRoundEnabled: boolean = false;
  public get IsDrugRoundEnabled(): boolean {
    return this.isDrugRoundEnabled;
  }
  public set IsDrugRoundEnabled(value: boolean) {
    if (!ObjectHelper.ReferenceEquals(this.isDrugRoundEnabled, value)) {
      this.isDrugRoundEnabled = value;
      //NotifyPropertyChanged("IsDrugRoundEnabled");
    }
  }
  private isFixedMandatory: boolean = false;
  public get IsFixedMandatory(): boolean {
    return this.isFixedMandatory;
  }
  public set IsFixedMandatory(value: boolean) {
    if (!ObjectHelper.ReferenceEquals(this.isFixedMandatory, value)) {
      this.isFixedMandatory = value;
      //NotifyPropertyChanged("IsFixedMandatory");
    }
  }
  private isDrugRoundMandatory: boolean = false;
  public get IsDrugRoundMandatory(): boolean {
    return this.isDrugRoundMandatory;
  }
  public set IsDrugRoundMandatory(value: boolean) {
    if (!ObjectHelper.ReferenceEquals(this.isDrugRoundMandatory, value)) {
      this.isDrugRoundMandatory = value;
      //NotifyPropertyChanged("IsDrugRoundMandatory");
    }
  }
  private frequencyType: string;
  public get FrequencyType(): string {
    return this.frequencyType;
  }
  public set FrequencyType(value: string) {
    this.frequencyType = value;
  }
  private frequencyUOM: string;
  public get FrequencyUOM(): string {
    return this.frequencyUOM;
  }
  public set FrequencyUOM(value: string) {
    this.frequencyUOM = value;
  }
  public _fixedtimeProperty: TimeSpan = new TimeSpan(0,0,0,0,0);
  private fixedTimes: string;
  public get FixedTimes(): string {
    if (
      String.Compare(
        this.frequencyType,
        'CC_PERIOD',
        StringComparison.CurrentCultureIgnoreCase
      ) == 0
    ) {
      if (!String.IsNullOrEmpty(this.fixedTimes)) {
        return this.fixedTimes;
      } else {
        return (
          this._fixedtimeProperty.Hours.ToString('00') +
          ':' +
          this._fixedtimeProperty.Minutes.ToString('00')
        );
      }
    } else {
      return this.fixedTimes;
    }
  }

  public get FixedTimesDateTime(): DateTime {
    return this._FixedTimesDateTime;
  }

  public set FixedTimesDateTime(value: DateTime) {
    if (
      String.Compare(
        this.frequencyType,
        'CC_PERIOD',
        StringComparison.CurrentCultureIgnoreCase
      ) == 0
    ) {
    this._FixedTimesDateTime = value;
    this.FixedTimes = value.ToString("HH:mm");
    }
  }

  private _FixedTimesDateTime:DateTime; 
  public set FixedTimes(value: string) {
    if (
      String.Compare(
        this.frequencyType,
        'CC_PERIOD',
        StringComparison.CurrentCultureIgnoreCase
      ) == 0
    ) {
      if (!String.IsNullOrEmpty(value)) {
        let d: DateTime = DateTime.MinValue;
        try {
          d = DateTime.Parse(value);
        } catch (frmtex) {
          d = DateTime.Parse(value, CultureInfo.InvariantCulture);
        }

        if (d.TimeOfDay != this._fixedtimeProperty) {
          this._FixedTimesDateTime = d;
          this._fixedtimeProperty = d.TimeOfDay;
          this.fixedTimes = String.Empty;
          //NotifyPropertyChanged("FixedTimes");
        }
      }
    } else {
      if (!ObjectHelper.ReferenceEquals(this.fixedTimes, value)) {
        this._FixedTimesDateTime = null;
        this.fixedTimes = value;
        //NotifyPropertyChanged("FixedTimes");
      }
    }
  }
  private druRoundTimes: string;
  public get DruRoundTimes(): string {
    return this.druRoundTimes;
  }
  public set DruRoundTimes(value: string) {
    this.druRoundTimes = value;
  }
  public oFrequency: IPPManagePrescSer.IPPFrequency;
  private _FreqLowEvent: number = 0;
  public get FreqLowEvent(): number {
    return this._FreqLowEvent;
  }
  public set FreqLowEvent(value: number) {
    this._FreqLowEvent = value;
  }
}
export class ScheduleDetailsCols extends ClonableViewModelBase {
  public GetCloneObject(): ScheduleDetailsCols {
    let _Clone: ScheduleDetailsCols = new ScheduleDetailsCols();
    if (this != null) {
      _Clone.PresType = this.PresType;
      _Clone.IsIgnore = this.IsIgnore;
      _Clone.ScheduleDoseUOMs = this.ScheduleDoseUOMs;
      _Clone.ScheduleDoseUOM = this.ScheduleDoseUOM;
      _Clone.ScheduleDTTM = this.ScheduleDTTM;
      _Clone.ScheduleTime = this.ScheduleTime;
      _Clone.ScheduleDate = this.ScheduleDate;
      if (this.ScheduleDoseValue != null) {
        _Clone.ScheduleDoseValue = new Array(this.ScheduleDoseValue.length);
        for (let i: number = 0; i < this.ScheduleDoseValue.length; i++) {
          _Clone.ScheduleDoseValue[i] = this.ScheduleDoseValue[i];
        }
      }
      if (this.Scheduledoseflag != null) {
        _Clone.Scheduledoseflag = new Array(this.Scheduledoseflag.length);
        for (let i: number = 0; i < this.Scheduledoseflag.length; i++) {
          _Clone.Scheduledoseflag[i] = this.Scheduledoseflag[i];
        }
      }
      if (this.ScheduleDate != null) {
        _Clone.ScheduleDate = new Array(this.ScheduleDate.length);
        for (let i: number = 0; i < this.ScheduleDate.length; i++) {
          _Clone.ScheduleDate[i] = this.ScheduleDate[i];
        }
      }
      if (this.ScheduleDoseUOMs != null) {
        _Clone.ScheduleDoseUOMs = new Array(this.ScheduleDoseUOMs.length);
        for (let i: number = 0; i < this.ScheduleDoseUOMs.length; i++) {
          _Clone.ScheduleDoseUOMs[i] = this.ScheduleDoseUOMs[i];
        }
      }
    }
    return _Clone;
  }
  private IsIgnore: boolean = false;
  private _scheduleTime: string;
  public get ScheduleTime(): string {
    return this._scheduleTime;
  }
  public set ScheduleTime(value: string) {
    this._scheduleTime = value;
    {
      this.IsIgnore = true;
      let _hour: number = 0;
      let _minute: number = 0;
      let _time: string[] = null;
      if (this._scheduleTime != null) {
        _time = this._scheduleTime.Split(':');
      }
      let bParseResult1: boolean = false;
      let bParseResult2: boolean = false;
      if (_time != null) {
        if (_time.length >= 1) {
          bParseResult1 = Number.TryParse(_time[0], (o) => {
            _hour = o;
          });
        }
        if (_time.length >= 2) {
          bParseResult2 = Number.TryParse(_time[1], (o) => {
            _minute = o;
          });
        }
      }
      if (bParseResult1 && bParseResult2) {
        this.ScheduleDTTM = new DateTime(
          DateTime.Now.Year,
          DateTime.Now.Month,
          DateTime.Now.Day,
          _hour,
          _minute,
          0,
          DateTimeKind.Unspecified
        );
      }
      this.IsIgnore = false;
    }
    //NotifyPropertyChanged("ScheduleTime");
  }
  private _scheduleDoseValue: string[];
  public get ScheduleDoseValue(): string[] {
    return this._scheduleDoseValue;
  }
  public set ScheduleDoseValue(value: string[]) {
    if (!ObjectHelper.ReferenceEquals(this._scheduleDoseValue, value)) {
      this._scheduleDoseValue = value;
      //NotifyPropertyChanged("ScheduleDoseValue");
    }
  }
  private _scheduledoseflag: boolean[];
  public get Scheduledoseflag(): boolean[] {
    return this._scheduledoseflag;
  }
  public set Scheduledoseflag(value: boolean[]) {
    this._scheduledoseflag = value;
  }
  private _scheduleDoseUOMs: string[];
  public get ScheduleDoseUOMs(): string[] {
    return this._scheduleDoseUOMs;
  }
  public set ScheduleDoseUOMs(value: string[]) {
    this._scheduleDoseUOMs = value;
  }
  private _scheduleDoseUOM: string;
  public get ScheduleDoseUOM(): string {
    return this._scheduleDoseUOM;
  }
  public set ScheduleDoseUOM(value: string) {
    this._scheduleDoseUOM = ' ' + value;
  }
  private _PresType: string;
  public get PresType(): string {
    return this._PresType;
  }
  public set PresType(value: string) {
    this._PresType = value;
  }
  private _scheduleDate: DateTime[];
  public get ScheduleDate(): DateTime[] {
    return this._scheduleDate;
  }
  public set ScheduleDate(value: DateTime[]) {
    this._scheduleDate = value;
  }
  private _ScheduleDTTM: DateTime = DateTime.MinValue;
  public get ScheduleDTTM(): DateTime {
    return this._ScheduleDTTM;
  }
  public set ScheduleDTTM(value: DateTime) {
    this._ScheduleDTTM = value;
    if (!this.IsIgnore) {
      this.ScheduleTime = this._ScheduleDTTM.ToString('HH:mm');
    }
    //NotifyPropertyChanged("ScheduleDTTM");
  }
  public IsSavedData: boolean = false;
}
